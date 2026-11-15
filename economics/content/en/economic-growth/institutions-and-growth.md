The last seven chapters decomposed income into capital, labour, human capital and a residual, and then gave the residual a name — technology, ideas, misallocation. Those are **proximate** causes. They answer "through what accounting identity is this country poor?" They do not answer "why did this country accumulate less, adopt later, or misallocate more?" **Fundamental** (or deep) causes are the candidates for that second question: institutions, geography, culture, and luck, including the luck of a colonial history.

This chapter is an empirical debate, not a theorem. Acemoglu, Johnson and Robinson (2001, *AER*; 2002, *QJE*) argued that property-rights institutions, instrumented by colonial settler mortality, explain a large share of today's income differences. Sachs and others argued that geography — disease, transport, tropical soils — does more, and does it directly. Glaeser, La Porta, López-de-Silanes and Shleifer (2004, *Journal of Economic Growth*) argued that human capital comes first and that "institutions" as measured are often the outcome of growth, not the cause. A culture literature (Weber; Tabellini 2010; Guiso, Sapienza and Zingales) treats trust and time preference as primitives. None of these views is a straw man, and none is a settled finding. The chapter states the claims, the identification strategies, the magnitudes, and the leading critiques.

For education only. Cross-country income gaps are not a ranking of people, and nothing here is a policy prescription for any named government.

## Proximate and fundamental

::: definition Proximate and fundamental causes {#def-proximate}
**Proximate causes** of income differences are the terms in the production function and the accumulation identities: $K$, $H$, $L$, $A$, $s$, $n$, $s_R$. **Fundamental causes** are the features of the physical and social environment that make those terms differ and persist: institutions, geography, culture, and historical accidents. The distinction is due in this form to Acemoglu, Johnson and Robinson (2005, *Handbook of Economic Growth*) and, earlier, to North and Thomas (*The Rise of the Western World*, 1973).
:::

A complete proximate account can be a complete *description* and still be a shallow *explanation*. South Korea's $s$, $s_h$ and $A$ rose after 1960; Ghana's did not, from a higher starting point ([[economic-growth/growth-facts]]). Saying "Korea invested and Ghana did not" is the proximate statement. The fundamental question is why.

Three research programmes have dominated the last twenty-five years. They are not mutually exclusive, and treating them as a single horse race is one of the ways the literature over-claims.

## Institutions

::: definition Economic institutions {#def-institutions}
**Economic institutions**, in the sense of North (1990, *Institutions, Institutional Change and Economic Performance*), are the humanly devised constraints that shape social interaction: property rights, contract enforcement, the state's capacity to tax and to refrain from predation, and the political rules that allocate those powers. **Inclusive** economic institutions, in Acemoglu and Robinson's (*Why Nations Fail*, 2012) vocabulary, permit broad participation in the market and secure private returns to investment; **extractive** ones concentrate surplus in a narrow elite. The vocabulary is a hypothesis about which constraints matter, not a measurement.
:::

The idea is old. Smith on "peace, easy taxes, and a tolerable administration of justice"; North and Weingast (1989, *Journal of Economic History*) on the Glorious Revolution as a credible commitment not to expropriate. The modern cross-country literature needed an identification strategy, because institutions are endogenous: rich countries can afford better courts, and growth itself creates demand for them.

::: proposition The colonial-origins argument {#prop-ajr}
Acemoglu, Johnson and Robinson (2001, "The Colonial Origins of Comparative Development", *AER*) claim: (i) where European settlers faced high mortality, they built extractive institutions; where mortality was low, they settled and built inclusive ones; (ii) those institutions persist; (iii) current institutions, instrumented by log settler mortality, have a large positive effect on log GDP per person. In their baseline 2SLS, a one-point rise in a 1–10 protection-against-expropriation index raises log income by about 0.94, a factor of $e^{0.94}\approx 2.6$. The corresponding OLS coefficient is smaller, consistent with attenuation or with reverse causality that 2SLS is meant to purge.
:::

The first stage — settler mortality predicting current expropriation risk — is the empirical heart. The exclusion restriction is that mortality of *settlers* in the 19th century (and earlier) affects income today only through institutions, not through the disease environment facing *today's* population, not through human capital of the settlers, and not through subsequent legal origin. That restriction is the target of the critiques.

**Albouy (2012, *AER*)** argued that the mortality data mix soldiers, bishops and labourers, that some observations are assigned from other countries, and that the 2SLS coefficient is fragile once these are treated conservatively. AJR (2012, reply) disagreed on the construction of the series. The debate is about a particular instrument, not about whether property rights matter at all.

**Glaeser et al. (2004)** argued that settlers brought *themselves* — human capital — and that years of schooling in 1900 predict income better than the AJR institution measure, which they read as a *outcome* of growth (constraints on the executive often improve after countries become rich). AJR's counter is the **reversal of fortune** (2002, *QJE*): among former colonies, places that were urbanised and densely populated in 1500 are *poorer* today, which is the opposite of what a geography-or-culture invariant would produce, and which they attribute to extractive institutions being more profitable where there was more to extract.

**Legal origin** (La Porta, López-de-Silanes, Shleifer and Vishny 1998, *JPE*; subsequent QJE and JEL papers) is a related but distinct claim: British common law versus French civil law as a colonial transplant, with effects on finance, regulation and, more contentiously, growth. The identification is the colonial assignment of legal systems. The critique is that legal origin is correlated with other British-colonial packages (language, education, the Commonwealth) and that within-Europe variation does not look the same.

::: example A 2SLS magnitude {#ex-ajr-magnitude}
AJR's baseline 2SLS coefficient of $0.94$ on the expropriation-risk index (higher = more protection) is a statement about log GDP per person. If two countries differ by 2 points on that index, by what factor does the estimate predict their incomes to differ, other things in the specification held constant? How should that factor be read?
::: solution
$e^{0.94\times 2} = e^{1.88} \approx 6.5$. A two-point institutional gap — well within the sample range of the 1–10 index — is associated, in the IV, with a six-and-a-half-fold income gap. That is a *large* number: it can account for a substantial piece of the 90-fold Maddison gap between the United States and the Central African Republic, but not the whole of it, and only under the exclusion restriction. OLS, with a coefficient nearer $0.5$ in some of their tables, would predict a factor of $e^{1}\approx 2.7$ instead. The gap between OLS and 2SLS is itself a finding (or a warning about weak instruments, depending on the first-stage $F$).
:::
:::

::: example Persistence, not destiny {#ex-persistence}
Nunn (2008, *QJE*) reports that African countries whose ancestors were more heavily enslaved have lower GDP per person in the late twentieth century, after controlling for a range of geographic covariates. In later work with Wantchekon (2011, *AER*), a trust channel appears in Afrobarometer surveys. What is the claim, and what is it *not*?
::: solution
The claim is a persistent effect of a historical extractive episode on current income, with a measured cultural intermediate (trust). It is not a claim that slave trades explain the US–CAR gap, nor that geography is irrelevant (the paper controls for it, which is a statement that geography is a confounder, not that it is zero), nor that current policy cannot move trust or income. A centuries-long lag is evidence of persistence. Persistence is the opposite of a forecast that the ranking is immutable.
:::
:::

Micro studies complement the cross-country IV. Dell (2010, *Econometrica*) on the Peruvian *mita*; Nunn (2008, *QJE*) on Africa's slave trades; Banerjee and Iyer (2005, *AER*) on colonial land-tenure in India; Michalopoulos and Papaioannou (2013, *QJE*; 2014, *Econometrica*) on pre-colonial centralisation and the irrelevance of some national borders in Africa, as seen from night lights. These papers do not share a coefficient. They share a claim that *some* historical institutions have effects that last.

## Geography

Geography is the oldest fundamental cause: Montesquieu on climate; Diamond (*Guns, Germs and Steel*, 1997) on domesticable animals, axis-orientation of continents, and the resulting head start of Eurasia; Sachs, Gallup and Mellinger on tropical disease, coastal access and the penalty of being landlocked.

::: definition The geography hypothesis {#def-geography}
The **geography hypothesis**, in the form used in this debate, is that physical features — latitude, disease ecology, soil, isolation from navigable water, ruggedness — have a *direct* effect on income, not only an indirect effect via the institutions that they once shaped. Direct channels include agricultural productivity, the disease burden on labour (malaria, trypanosomiasis), and transport costs.
:::

Gallup, Sachs and Mellinger (1999, *International Regional Science Review*) documented large income gaps between tropical and temperate zones, and between landlocked and coastal regions, in late-twentieth-century data. Sachs (2003) argued that the AJR instrument is itself a geography variable (mosquitoes, climate) and that malaria ecology belongs in the second stage. AJR's reply is the reversal of fortune: the tropics were not poor in 1500, so a time-invariant geography penalty cannot be the whole story of *today's* ranking. Easterly and Levine (2003, *Journal of Monetary Economics*) found that tropic and germs predict income *through* institutions, with little residual direct effect, in a horse race they ran.

The honest residual is not zero. Landlocked countries face transport costs that institutions do not repeal. Malaria still kills and still reduces adult productivity in ways a title registry does not fix. Bloom and Sachs (1998) put a large number on the malaria penalty; subsequent RCTs and eradication campaigns (see the development-economics evidence) have produced smaller, still positive, effects of disease reduction on income. Geography is not a dummy variable that "does not matter because reversal of fortune". It is a set of constraints whose *relative* weight against institutions is what the horse races try, and only partly succeed, to measure.

::: example Landlocked, in the accounts {#ex-landlocked}
Compare, as a descriptive fact rather than an estimate, Maddison 2023 GDP per person in 2019 for Switzerland (landlocked, 62,400), Botswana (landlocked, 15,700), Ethiopia (landlocked, 2,030), and Nigeria (coastal, 5,200). What does the comparison not settle?
::: solution
Switzerland is rich and landlocked; Botswana is upper-middle-income and landlocked; Ethiopia is poor and landlocked; Nigeria is coastal and, in 2019, several times poorer than Botswana. Geography in the landlocked-versus-coastal sense does not sort these four. What the comparison does *not* settle is whether, *conditional* on institutions and human capital, landlockedness has a penalty (the gravity literature on trade says transport costs do), or whether Botswana's institutions-and-diamonds path would have been steeper with a port. Descriptive four-country tables are not horse races. They are a warning against reading "landlocked" as destiny, and against reading "not destiny" as "not a cost".
:::
:::

## Culture

Culture, in this literature, means values and beliefs that pass across generations and that affect economic choices: trust, the worth of work, the status of commerce, time preference, kin versus general morality. Weber's Protestant ethic is the ancestor. Putnam on Italian civicness, Banfield on amoral familism, and, among economists, Guiso, Sapienza and Zingales (2006, *JEP*), Tabellini (2010, *JEEA*), and Gorodnichenko and Roland (2011, 2017) on individualism are the descendants.

The identification problem is the same as for institutions, only harder. Culture is slower to measure, slower to change, and correlated with both geography and institutions. Tabellini (2010) uses historical literacy and political institutions in European regions as instruments for current values, and finds that trust and respect for others predict income *within* countries, which holds some national institutions fixed. Alesina and Giuliano (2015, *JEL*) survey the two-way causation: culture shapes institutions, institutions shape culture. Treating either as a primitive is a modelling choice.

This course does not adjudicate Weber. It records that a growth model whose only free parameters are $s$, $n$ and $\eta$ will attribute to those parameters whatever culture does through them — thrift, fertility, the status of science — and that "culture" is then not an alternative to Solow, it is a name for why Solow's parameters differ.

## Accumulation, technology, institutions: three readings of the same residual

Return to the 90-fold gap. Three readings, all present in the literature, all incomplete.

**Accumulation first.** MRW (1992) and the augmented Solow model: differences in $s_k$, $s_h$ and $n$ plus a modest residual. The difficulty, from [[economic-growth/technology-and-growth-accounting]], is that the residual is not modest at $\alpha=1/3$, and that $s$ and $s_h$ are themselves endogenous.

**Technology first.** Parente and Prescott; Romer; Jones; Comin and Hobijn on diffusion lags. Poor countries are poor because $A$ is low: missing ideas, or delayed copies of existing ones. The difficulty is why non-rival ideas have not already gone everywhere, which pushes the question back to barriers — and barriers are institutions, geography, or both.

**Institutions first.** North; AJR; *Why Nations Fail*. $s$, $s_h$ and $A$ are low because investment and innovation are not safe, or because elites block them. The difficulty is identification (Albouy; Glaeser et al.), the remaining role of geography, and the cases that do not fit a simple inclusive/extractive binary (China after 1978: growth under a political regime that the binary would not have predicted; the binary's authors have a reply, about *partially* inclusive economic institutions, which is itself a move toward a continuum).

::: intuition The residual is allowed to have more than one name
Development accounting produces a large $A$. Endogenous-growth theory names $A$ as ideas. Misallocation names $A$ as wedges. Institutions name the wedges and the missing ideas as the outcome of political equilibrium. Geography names the disease and distance that shape that equilibrium, or that skip it and hit $y$ directly. A serious view can hold several of these at once. A slogan that picks one and scores the rest as error is not a serious view.
:::

::: quiz
The AJR (2001) exclusion restriction is that settler mortality affects current income only through
- [ ] geography (malaria ecology)
- [x] institutions that persist from the colonial period
- [ ] the human capital of current populations
- [ ] legal origin, independently of other institutions
::: solution
The instrument is supposed to be shut off except via institutions. Geography (Sachs), human capital of settlers (Glaeser et al.), and legal origin are the leading alleged leaks in the exclusion restriction. Whether they leak enough to explain the 2SLS coefficient is the empirical dispute; the *statement* of the restriction is the institutions channel.
:::
:::

## Evidence, dated, and what it does not say

- **AJR 2001**: 2SLS coefficient $\approx 0.94$ on expropriation protection; first stage on log settler mortality. Sample: former colonies. Critiques: Albouy 2012 (data); Glaeser et al. 2004 (human capital); Sachs 2003 (malaria in the second stage).
- **AJR 2002**: reversal of fortune among former colonies, urbanisation in 1500 versus income in 1995. A geography-invariant story of tropical poverty has to explain why the tropics were not poor then.
- **Easterly and Levine 2003**: tropic and germs operate through institutions in their specifications.
- **Dell 2010**: the *mita* boundary in Peru, a regression discontinuity, persistent effects on consumption and roads. A local, well-identified institutional effect; not a world $R^2$.
- **Nunn 2008**: slave-trade intensity predicts lower current income in African countries, with a trust channel in later work (Nunn and Wantchekon 2011, *AER*).
- **China 1978–2019**: GDP per person from 1,744 to 16,880 (Maddison 2023), under a political regime that did not become a liberal democracy. Any institutions-first view has to say what changed (decollectivisation, township-village enterprises, FDI regimes, a *de facto* expansion of economic, not political, inclusion) and what that does to the binary. The growth is not in dispute; the label is.
- **Botswana**: from 564 to 15,747 over 1960–2019 (Maddison 2023), diamonds plus, in the standard political-economy account, relatively inclusive pre-colonial institutions and a post-independence elite that did not loot the mines in the manner of some neighbours (Acemoglu, Johnson and Robinson 2003, *African Success Story*). Diamonds in Sierra Leone did not produce the same path. Resource endowments are not a sufficient statistic.

::: example Human capital as a rival channel {#ex-glaeser}
Glaeser et al. (2004) note that constraints on the executive often *follow* rises in income and schooling, and that 1900 years of schooling predict 2000 income in a cross-section of former colonies. How would one distinguish this view from AJR's, in principle, using the reversal of fortune?
::: solution
If 1500 urbanisation (a proxy for then-income and, loosely, for then-human-capital) *positively* predicted 1995 income, a persistent-human-capital story would be at home. AJR (2002) find a *negative* reduced form among former colonies: the then-richer places are the now-poorer ones. A pure "settlers brought skills, skills persist" story has to explain a reversal of the ranking, not a persistence of it. An institutions story does so by saying extractive institutions were more profitable where there was more to extract, and that those institutions destroyed the old ranking. Distinguishing "settlers' skills" from "settlers' institutions" at the *settler* margin (the US, Australia, New Zealand) is harder, which is why Glaeser et al. still have a point about that subsample.
:::
:::

::: warning From a significant coefficient to a national strategy
A 2SLS coefficient on an index is not a recipe for "import these institutions". Institutions are bundles, they interact with politics, and the same legal text produces different outcomes (the transplant effect; Berkowitz, Pistor and Richard 2003, *European Economic Review*). This chapter is a map of claims about *causes of past income differences*. It is not a ranking of present governments, and it is not a transition path.
:::

::: widget plot
f: a + 0.94*x; a + 0.5*x
sliders: a=6:4:8:0.5
x: 4, 10
y: 6, 18
labels: \text{IV slope }0.94; \text{OLS-like slope }0.5
caption: Illustrative lines with the AJR baseline 2SLS slope $0.94$ and a smaller OLS-like slope $0.5$, against a 1–10 expropriation-protection index. The intercept $a$ is fictional — no country is a point on these lines. Six index points at slope $0.94$ are $5.6$ log points, a factor of $270$, which is why a linear IV cannot be extrapolated over the whole range as a causal law. The magnitudes AJR discuss are 1- or 2-point shifts in the interior of the sample (factors of about $2.6$ and $6.5$).
:::

## Where this leads

This course's proximate apparatus — Solow, accounting, convergence, Ramsey, Diamond, ideas — is the set of channels through which any fundamental cause has to work. A change in property rights that does not move $s$, $s_h$, $n$, $\eta$ or the wedges in $A$ does not move $y$. Development economics ([[development-economics/institutions-and-governance]], [[development-economics/measuring-development]]) takes the same questions to micro data, field experiments and state capacity. Economic history ([[economic-history/great-divergence]], [[economic-history/industrial-revolution]]) is the long-run laboratory in which reversal of fortune, the Industrial Revolution, and the colonial episode are the events rather than the instruments.

The open questions are the ones the horse races have not closed. How much of the residual is ideas versus wedges versus mismeasured inputs? How much of the settler-mortality coefficient is institutions versus human capital versus germs? Why did China grow? Why did Argentina stop being rich? A course that ends with a single word — "institutions", "geography", "culture", "thrift" — has stopped being a course.

For education only — not investment or financial advice. Nothing in this chapter is a recommendation to invest in, divest from, or rank any country.

::: history
**1990–2012, North to Why Nations Fail.** Douglass North’s 1990 book made institutions a working vocabulary for economists. Acemoglu, Johnson and Robinson’s 2001 *AER* paper, and their 2012 book with Robinson, *Why Nations Fail*, made a particular identification strategy and a particular inclusive/extractive binary the default citation. The geography push-back (Sachs, Diamond) and the human-capital push-back (Glaeser, La Porta, López-de-Silanes, Shleifer) arrived in parallel, not in sequence. The debate is the state of the art, not a prelude to a consensus that has since arrived.
:::

::: summary
- Proximate causes ($K$, $H$, $A$, $s$, $n$) describe gaps; fundamental causes (institutions, geography, culture, luck) are candidates for why the proximate terms differ.
- AJR (2001): settler mortality as an instrument for institutions; 2SLS coefficient $\approx 0.94$ on a 1–10 expropriation index (a factor of $\approx 2.6$ per point). Critiques target the data, the exclusion restriction, and reverse causation from human capital.
- Reversal of fortune (AJR 2002) is the leading argument against a time-invariant geography ranking of today's incomes. Direct geographic costs (disease, distance) remain.
- Culture can be a name for why $s$, $n$ and $\eta$ differ. It is not, on present evidence, a substitute for the rest of the course.
- China after 1978 and Botswana after 1960 are first-order facts that any institutions-first, geography-first or accumulation-first view has to interpret, not exceptions to be footnoted.
- A significant coefficient is not a policy programme.
:::

## Exercises

::: exercise Proximate or fundamental? {level=1}
Classify each as proximate or fundamental, in the sense of [[#def-proximate]]: (a) a low investment rate $s$; (b) tropical malaria ecology; (c) a small TFP residual; (d) a colonial legal origin.
::: solution
(a) proximate (an accumulation parameter); (b) fundamental (geography); (c) proximate (the $A$ term); (d) fundamental (an institutional/historical claim). A complete story of (a) or (c) will typically invoke (b) or (d), which is the point of the distinction.
:::
:::

::: exercise IV arithmetic {level=1 check="2.56"}
Using AJR's baseline 2SLS coefficient of $0.94$, a one-point rise in the protection index multiplies income by approximately what factor? (Enter the factor to two decimals, $e^{0.94}$.)
::: solution
$e^{0.94} \approx 2.56$.
:::
:::

::: exercise Reversal of fortune {level=1}
In one or two sentences, why is a negative correlation, among former colonies, between urbanisation in 1500 and income in 1995 a problem for a pure, time-invariant geography theory of today's poverty?
::: solution
If tropical location (or other fixed geography) were a sufficient statistic for poverty, places that geography had made rich in 1500 should still be rich, or at least not systematically poorer. A reversal says the ranking *changed*, which a time-invariant penalty cannot do by itself. AJR attribute the change to extractive institutions being imposed where there was more to extract.
:::
:::

::: exercise Exclusion restriction {level=2}
State, in one sentence each, (i) AJR's exclusion restriction, (ii) Sachs's alleged leak, (iii) Glaeser et al.'s alleged leak.
::: solution
(i) Settler mortality affects current income only through institutions that persist from colonial times. (ii) Mortality is a proxy for a disease environment that still affects income directly (malaria ecology belongs in the second stage). (iii) Settlers brought human capital, and it is schooling and skills — not the institutions they wrote down — that persist and raise income.
:::
:::

::: exercise China as a test {level=2}
China's GDP per person (Maddison 2023) rose from 1,744 in 1978 to 16,880 in 2019. Why is this episode used both as a challenge to a simple inclusive/extractive binary and as a case *for* an institutions-first view? Two short paragraphs.
::: solution
Challenge: political institutions did not become those of a liberal democracy, and the binary, read naively, would not have predicted a 5.7 per cent annual rise. If "inclusive" means "Westminster plus independent courts", China is a counterexample.

Case for: the *economic* rules changed — decollectivisation of agriculture, a growing private sector, FDI regimes, local-government competition for investment — in the direction of making private returns to investment safer than they had been in 1960–78. An institutions-first view that talks about *economic* constraints, and allows partial and reversible inclusion, reads 1978 as an institutional reform. The disagreement is then about labels and about how far the reform has gone, not about whether 1978–2019 happened.
:::
:::

::: exercise A horse race, with omitted variables {level=2}
A researcher runs $\ln y = a + b\,\text{institutions} + c\,\text{latitude} + u$ by OLS on a cross-section of countries. Give two distinct reasons $\hat b$ may not be the causal effect of institutions.
::: solution
Reverse causation: $y$ buys better courts, so $\hat b$ is partly the effect of income on measured institutions. Omitted variables: human capital, legal origin, trust, or oil may raise both the institution index and $y$. Latitude itself is a crude geography control and does not absorb disease ecology or being landlocked. OLS on a cross-section of countries is almost never the AJR experiment; the AJR experiment is the 2SLS with settler mortality, which has different problems (exclusion, data) rather than none.
:::
:::

::: exercise Dell's *mita* {level=3}
Dell (2010) compares districts inside and just outside the historical *mita* boundary in the Andes. (a) Why is a boundary discontinuity a different (and, for its purpose, stronger) design than AJR's cross-country 2SLS? (b) Why can a large local effect of the *mita* not be added up to "institutions explain 80 per cent of world income differences"?
::: hint
Think about internal versus external validity, and about what is being identified.
:::
::: solution
(a) On either side of the boundary, geography, ethnicity and many national institutions are similar; the *mita* is the thing that jumps. That is a local comparison, not a comparison of Australia with the DRC. It does not need settler mortality to be a valid instrument for a 1–10 world index. (b) The estimand is the effect of *this* forced-labour institution, in *this* region, on *these* outcomes (consumption, roads, education). It is not the coefficient on a global index, and it is not a share of the world $R^2$. Adding it up would require the same treatment everywhere, no general-equilibrium spillovers, and a metric that converts Andean consumption gaps into US–CAR GDP gaps. None of those is free. Local well-identified effects and global IV magnitudes answer different questions; both can be true at once, and neither substitutes for the other.
:::
:::

::: exercise Write the debate, not the verdict {level=3}
In 400–500 words, set out the institutions, geography and human-capital views of the Korea–Ghana divergence of [[economic-growth/growth-facts]], attributing claims, and end without picking a winner. Use at least one magnitude from this chapter and one date from Maddison 2023.
::: solution
A satisfactory answer (indicative). In 1960, Ghana's GDP per person was 2,197 (Maddison 2023, 2011 international dollars) and South Korea's was 1,548; in 2019 the figures were 4,143 and 38,936. The proximate account is not in doubt: Korea's investment rate, years of schooling and TFP rose; Ghana's income merely doubled in six decades.

An institutions-first reading (AJR; *Why Nations Fail*) points to land reform, a state that eventually enforced contracts for exporters, and, after 1961, a political equilibrium in which growth was compatible with the elite's survival — versus Ghana's post-independence oscillations of expropriation risk and a weaker constraint on the executive. The AJR 2SLS magnitude, a factor of about 2.6 per point on the expropriation index, is large enough, if taken literally and if Korea gained a couple of points relative to Ghana, to generate a several-fold gap. The critique (Glaeser et al.) is that Korea's primary cause was a schooling push and an imported technical culture, with "institutions" improving after growth, not before; Ghana's schooling did not stay that far behind for the whole period, which this view has to wrestle with.

A geography reading has a harder time with this *pair*: both countries are in the tropics, neither is landlocked, and Korea's 1950s starting point was war-ruined rather than geographically blessed. Geography might still enter as disease burden and agricultural productivity, but it is not a candidate for the *divergence after 1960*. A culture reading (thrift, a Confucian exam tradition versus, in some older accounts, a different attitude to commerce in West Africa) is hard to separate from the institutions that encode it, and it has to explain why the same Korean culture did not produce 5.6 per cent growth under Japanese colonial rule or in the 1950s.

None of the three readings is forced by the two time series. A serious treatment keeps the proximate decomposition (Solow, accounting), states the identification strategy of each fundamental claim, and leaves the Korea–Ghana pair as a constraint that all three must meet rather than as a trophy for one of them.
:::
:::
