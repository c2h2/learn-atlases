In 2024, GDP per capita at purchasing-power parity was about \$86,400 in the United States, \$27,100 in China, \$11,200 in India, \$9,100 in Nigeria and \$3,300 in Ethiopia (World Bank World Development Indicators, current international dollars, accessed 2026). Those five numbers already pose the central question of this course: why is output per person so different, and is output even the right thing to compare? A newborn in Japan can expect about 85 years of life; a newborn in Nigeria, about 54 (UN DESA, *World Population Prospects 2024*). Mean years of schooling among adults range from more than 13 in parts of northern Europe to under 2 in several Sahelian countries (UNDP, *Human Development Report 2025*, 2023 data). Development is many-dimensional. This chapter builds the measuring rods — income at purchasing-power parity, the Human Development Index, capabilities and multidimensional poverty — and states what each includes, what it leaves out, and how the published numbers are actually made.

The national-income accounts themselves are developed in [[macroeconomics/national-income]]. Here we ask a different question: how should those accounts be compared *across* countries and *over* long stretches of time, and what should be added once we admit that a long life and a school place are goods in their own right?

## Income, output and purchasing power

Gross domestic product is the market value of final goods and services produced in a territory in a period. Gross national income is GDP plus net primary income from abroad. For comparing living standards, **GNI per capita** is usually the better income concept, because it tracks the resources residents can command; for comparing productivity on the territory, **GDP per capita** is the better one. In a country with large remittances (the Philippines, Nepal) or a large foreign-owned resource sector (Equatorial Guinea, some Gulf states), the two diverge.

A more stubborn problem is the *numeraire*. Market exchange rates convert rupees, naira and birr into dollars, but they are set in markets for internationally traded goods, assets and official intervention. Haircuts, housing, street food and primary schooling are produced and consumed locally. In poor countries those non-tradables are cheap in dollars, because wages are low. Using the market exchange rate therefore understates real consumption in poor countries and overstates the income gap.

::: definition Purchasing-power parity {#def-ppp}
A **purchasing-power-parity (PPP) exchange rate** is the relative cost of a comparable basket of goods and services in two countries, each valued at local prices. If the basket costs $P_i$ units of $i$'s currency and $P_j$ units of $j$'s, the PPP rate is $P_i/P_j$ units of $i$ per unit of $j$. **Real income** (or GDP) at PPP is nominal income divided by this rate, and is reported in **international dollars** of a stated benchmark year.
:::

The International Comparison Program (ICP), housed at the World Bank, prices a common basket in participating economies and constructs PPPs. The 2021 ICP round is the one underlying the World Bank's current poverty lines and the UNDP's 2025 Human Development Report. A 2021 international dollar is the amount of goods that one US dollar bought in the United States in 2021; it is *not* a US dollar converted at the market rate.

::: example A haircut and a phone {#ex-ppp-basket}
A comparable consumption basket costs 2,000 rupees in India and 100 dollars in the United States. The market exchange rate is 83 rupees per dollar. India's GNI per capita is 200,000 rupees. Compute (a) the PPP exchange rate in rupees per international dollar; (b) GNI per capita at the market rate; (c) GNI per capita at PPP.
::: solution
(a) The PPP rate is $2{,}000/100 = 20$ rupees per international dollar. (b) At the market rate, GNI per capita is $200{,}000/83 \approx 2{,}410$ dollars. (c) At PPP it is $200{,}000/20 = 10{,}000$ international dollars. The market-rate figure understates Indian real income by a factor of about four, because the basket — which includes non-tradables — is cheap in dollars. A mobile phone, which is traded, would not produce so large a gap; a haircut would produce a larger one.
:::
:::

The pattern in [[#ex-ppp-basket]] is the **Penn effect** (or Balassa–Samuelson pattern): the price level, measured as the ratio of the market exchange rate to the PPP rate, rises with real income. Poor countries look cheaper, in dollars, than rich ones. That is why GDP per capita at PPP compresses the world income distribution relative to GDP at market rates. For 2024, sub-Saharan Africa's GDP per capita was about \$5,500 at PPP and far lower at market rates; East Asia and the Pacific excluding high-income economies was about \$23,200 at PPP (World Bank WDI, accessed 2026).

::: warning Market dollars are not PPP dollars
News stories and some policy documents mix the two. A loan or an export invoice is a market-dollar quantity; a poverty line or a comparison of living standards is a PPP quantity. The World Bank's extreme-poverty line of \$3.00 a day is in *2021 international dollars*, not in the dollars a tourist changes at the airport. Converting that line at the market rate, or inflating it with a rich-country CPI, produces a different number with a different meaning. Always state the benchmark year and whether the figure is PPP or market.
:::

Over time, two further distinctions matter. **Real** GDP uses a country's own prices of a base year (or a chain of adjacent years) and tracks growth of the domestic basket. **International-dollar** series use PPPs and are designed for *cross-section* comparison; splicing them into a time series requires care, because each ICP round revises relative prices. The Penn World Table (currently PWT 10.x) and the Maddison Project are the standard sources for long-run real GDP per capita; the World Bank WDI is the standard source for the recent cross-section. They do not always agree, and the disagreement is largest where data are thinnest.

::: intuition Why PPPs are not unique
No two countries consume the same basket. Rice has a larger weight in Bangladesh than in Switzerland; health care has a larger weight in Switzerland. The ICP must choose weights (a Fisher index, averaging Laspeyres and Paasche, is the usual compromise) and must decide when a "service" in Lagos is the same as a "service" in Lyon. Different index formulae and different quality adjustments shift relative incomes by tens of percent for some countries. PPP is the right conceptual conversion. It is not a physical constant.
:::

## The Human Development Index

Income is a means. People want to live long, to know things, and to have the resources to choose a life they value. In 1990 the UNDP, under Mahbub ul Haq and with Amartya Sen as the principal intellectual influence, published the first Human Development Report and with it the **Human Development Index (HDI)**. The current construction (UNDP, *Human Development Report 2025*, technical note) is as follows.

::: definition Human Development Index {#def-hdi}
The **Human Development Index** is the geometric mean of three dimension indices, each scaled to $[0, 1]$:

$$
\mathrm{HDI} = \bigl(I_{\text{health}}\cdot I_{\text{education}}\cdot I_{\text{income}}\bigr)^{1/3}.
$$

$I_{\text{health}} = (L - 20)/(85 - 20)$, where $L$ is life expectancy at birth in years. $I_{\text{education}}$ is the arithmetic mean of mean years of schooling among adults aged 25 and over, divided by 15, and expected years of schooling for a child of school-entering age, divided by 18. $I_{\text{income}} = \bigl(\ln y - \ln 100\bigr)/\bigl(\ln 75{,}000 - \ln 100\bigr)$, where $y$ is GNI per capita in 2021 international dollars, capped at \$75,000. Goalposts (20 and 85 years; 0 and 15; 0 and 18; \$100 and \$75,000) are fixed by the UNDP.
:::

Three design choices are doing a lot of work. First, income enters in *logarithms*: a given percentage increase in GNI raises the income index by the same amount at every level, so a rise from \$1,000 to \$2,000 counts for as much as a rise from \$20,000 to \$40,000. That is a stance on declining marginal well-being of income, not a fact about the world. Second, the three dimensions are combined by a *geometric* mean, so a country cannot fully compensate for a very low score on one dimension by a high score on another. Third, income is capped: above \$75,000 of GNI per capita the income index is 1, and further riches do not raise the HDI.

::: proposition Geometric mean and the inability to substitute {#prop-hdi-geom}
Let $I_1, I_2, I_3 \in (0, 1]$. The geometric mean $G = (I_1 I_2 I_3)^{1/3}$ is strictly increasing in each argument, homogeneous of degree one, and satisfies $G \le A$, where $A = (I_1+I_2+I_3)/3$ is the arithmetic mean, with equality if and only if $I_1 = I_2 = I_3$. If any dimension index tends to 0, so does $G$, regardless of the other two.
:::
::: proof
The AM–GM inequality gives $A \ge G$, with equality iff the arguments are equal. Homogeneity: scaling every $I_j$ by $\lambda > 0$ scales $G$ by $\lambda$. If $I_1 \to 0^+$ with $I_2, I_3$ bounded, then $G \to 0$. That last property is what the UNDP wanted: a country with life expectancy near the lower goalpost cannot post a high HDI by being rich.
:::

::: example Computing an HDI {#ex-hdi-calc}
Country A has life expectancy 65 years, mean years of schooling 6, expected years of schooling 10, and GNI per capita 4,000 international dollars (2021 PPP). Compute the three dimension indices and the HDI.
::: solution
$I_{\text{health}} = (65-20)/(85-20) = 45/65 \approx 0.692$. Mean-schooling index $= 6/15 = 0.400$; expected-schooling index $= 10/18 \approx 0.556$; so $I_{\text{education}} = (0.400 + 0.556)/2 \approx 0.478$. $I_{\text{income}} = \ln(4000/100)/\ln(75000/100) = \ln 40 / \ln 750 \approx 3.689/6.620 \approx 0.557$. Then

$$
\mathrm{HDI} = (0.692 \times 0.478 \times 0.557)^{1/3} \approx 0.569.
$$

That is in the UNDP's "medium human development" band (0.550–0.699). Raising GNI from 4,000 to 8,000, other things equal, lifts $I_{\text{income}}$ to $\ln 80 / \ln 750 \approx 0.662$ and the HDI to about $0.602$ — a smaller proportional gain than the doubling of income, because of the logarithm.
:::
:::

::: widget plot
f: (ln(clamp(x,100,b)) - ln(100))/(ln(b) - ln(100)); min(1, x/b)
sliders: b=75000:20000:100000:5000
x: 100, 110000
y: 0, 1.15
labels: I_{\text{income}}; y/b
caption: The UNDP income index (blue) against a linear index that treats an extra dollar as equally valuable at every income (orange). The slider is the income goalpost $b$ (the UNDP uses \$75,000). Notice how most of the blue curve's rise is at low incomes, and how both series flatten once $y$ reaches $b$.
:::

In the 2025 Human Development Report (2023 data, 193 countries), the world HDI was 0.756. Iceland ranked first at 0.972; Norway and Switzerland tied at 0.970. South Sudan ranked last at 0.388, with Somalia, the Central African Republic, Chad, Niger and Mali next. Sub-Saharan Africa's regional HDI was 0.568; South Asia's 0.672; Latin America and the Caribbean's 0.783; East Asia and the Pacific's 0.775 (UNDP HDR 2025, statistical annex). Nine of the bottom ten countries were in sub-Saharan Africa. The gap between the very-high and low human-development groups has not been closing as it did in the 1990s and 2000s: the pandemic produced the first global decline in the HDI on record, and recovery has been uneven.

The HDI is an average. The **inequality-adjusted HDI** (IHDI) discounts each dimension by its inequality, using Atkinson's equally-distributed-equivalent formula, and the loss from inequality was about 22 percent of world HDI in 2023 (UNDP HDR 2025). The **Gender Development Index** is the ratio of female to male HDI; the **Gender Inequality Index** combines reproductive health, empowerment and labour-force participation. Each is a different cut through the same underlying idea: means hide distributions.

::: quiz
Country B is richer than Country C at PPP, but C has a higher HDI. Which explanation is consistent with [[#def-hdi]]?
- [ ] It is impossible: the HDI is an increasing function of income, so B must rank higher.
- [x] C may have substantially higher life expectancy or schooling, which the geometric mean will not let B's income fully offset.
- [ ] The HDI uses market exchange rates, which can reverse PPP rankings.
- [ ] The HDI caps life expectancy, so extra years in C do not count.
::: solution
The HDI *is* increasing in income, but only through $I_{\text{income}}$, and the geometric mean penalises imbalance. A country can outrank a richer neighbour if it is healthier or better schooled. The HDI uses GNI at PPP, not market rates, and the cap at 85 years is a goalpost for scaling, not a claim that extra years have no value.
:::
:::

## Capabilities and multidimensional poverty

Sen's argument, developed from the 1980s and stated at length in *Development as Freedom* (1999), is that the right object of development is the set of **capabilities** — the real freedoms people have to live lives they have reason to value — not the bundle of goods they happen to consume and not the utility they happen to enjoy. Functionings are the beings and doings (being well-nourished, being literate, taking part in the life of the community); capabilities are the sets of functionings a person can choose. A fasting saint and a starving child may consume the same calories; their capabilities differ.

The HDI is a crude operationalisation of that idea: three functionings, averaged. A more disaggregated descendant is the **global Multidimensional Poverty Index (MPI)**, published by the UNDP and the Oxford Poverty and Human Development Initiative (OPHI). The MPI, following Alkire and Foster (2011), counts a person as poor if they are deprived in at least a third of a weighted list of ten indicators (nutrition, child mortality, years of schooling, school attendance, cooking fuel, sanitation, drinking water, electricity, housing, assets). The headline MPI is

$$
M_0 = H \times A,
$$

the product of the **headcount** $H$ (the share of people who are multidimensionally poor) and **intensity** $A$ (the average share of weighted deprivations among the poor). In 2024 OPHI and the UNDP reported 1.1 billion people in acute multidimensional poverty across 112 countries, with the largest numbers in South Asia and sub-Saharan Africa (UNDP/OPHI, *Global Multidimensional Poverty Index 2024*). A person can be MPI-poor and above the World Bank's \$3.00 line, or the reverse: money and functionings are correlated, not identical.

::: definition Alkire–Foster identification {#def-af}
Each person $i$ has deprivation scores $d_{ij} \in \{0,1\}$ on indicators $j = 1, \dots, J$ with weights $w_j > 0$, $\sum_j w_j = 1$. The **weighted deprivation count** is $c_i = \sum_j w_j d_{ij}$. Given a cutoff $k \in (0, 1]$, person $i$ is **poor** if $c_i \ge k$. The **censored** count is $c_i(k) = c_i$ if $i$ is poor and $0$ otherwise. Then $H = n^{-1}\#\{i : c_i \ge k\}$ and $A = H^{-1} n^{-1}\sum_i c_i(k)$ (with $A = 0$ if $H = 0$), so $M_0 = n^{-1}\sum_i c_i(k)$.
:::

The cutoff $k$ is a value judgement. The global MPI uses $k = 1/3$. Raising $k$ concentrates the measure on the more severely deprived; lowering it brings in people with a few deprivations. Because $M_0$ is a mean of censored counts, it **decomposes** by region and by indicator: the contribution of, say, sanitation in rural Bihar can be read off the same table as the national headline. That is the practical reason the MPI has been taken up by statistical offices from Mexico to Nepal.

::: example A four-person village {#ex-mpi}
Four people, three indicators (health, schooling, living standards) with equal weights $1/3$, cutoff $k = 1/3$. Deprivation vectors: $(1,1,0)$, $(1,0,0)$, $(0,0,1)$, $(0,0,0)$. Compute $H$, $A$ and $M_0$.
::: solution
Weighted counts: $c = (2/3,\ 1/3,\ 1/3,\ 0)$. The first three people meet $c_i \ge 1/3$, so $H = 3/4$. Intensity $A = \bigl((2/3)+(1/3)+(1/3)\bigr)/3 = (4/3)/3 = 4/9$. Then $M_0 = (3/4)\times(4/9) = 1/3$, which is also the mean of the *censored* counts $(2/3, 1/3, 1/3, 0)$. Person 4 contributes nothing, even though a union-of-deprivations ("anyone deprived in anything") would have counted three-quarters of the village as poor and ignored intensity.
:::
:::

::: quiz
In the Alkire–Foster index $M_0 = H \times A$, what happens if a poor person is relieved of one deprivation but remains poor?
- [ ] $H$ falls and $A$ is unchanged, so $M_0$ falls in proportion to $H$.
- [x] $H$ is unchanged and $A$ falls, so $M_0$ falls.
- [ ] Neither $H$ nor $A$ changes, because the person is still poor.
- [ ] $M_0$ cannot change unless someone crosses the cutoff $k$.
::: solution
Identification ($H$) cares only about whether $c_i \ge k$. Intensity $A$ is the mean of $c_i$ among the poor, so reducing a poor person's deprivations without taking them across $k$ lowers $A$ and therefore $M_0$. That is the point of using $M_0$ rather than the headcount alone: it is sensitive to the depth of overlapping deprivations, not only to crossings of $k$.
:::
:::

Sen would not treat the MPI as a complete capability measure. It is still a list of deprivations chosen by researchers, with weights that are not those of the people concerned, and it is silent on political freedom, on the ability to appear in public without shame, and on agency. It is, however, a disciplined way to say "poverty is more than low consumption" without giving up on numbers.

## What the numbers miss, and how they are made

Every published development statistic is the end of a long production chain: household surveys, censuses, price collections, demographic surveillance, and a set of imputations where the chain breaks.

**Surveys versus national accounts.** Consumption in a household survey and consumption in the national accounts are different objects, collected by different agencies, and they have diverged in several large countries (notably India and China). Poverty counts that scale survey means to the national accounts look lower, in a growing economy, than counts that take the survey as it is. The World Bank's Poverty and Inequality Platform generally uses the survey distribution and the survey mean, not a national-accounts mean. That is a choice, and it is contested.

**Consumption versus income.** In most of Africa and much of Asia, the welfare aggregate is *consumption* (a diary or a recall of purchases and home production). In most of Latin America and in rich countries, it is *income*. Consumption is smoother and easier to collect from farmers with lumpy harvests; it misses saving and is sensitive to the recall period. Cross-country Gini coefficients that mix the two are not comparable without a flag. India's published consumption Gini (25.5 in 2022, World Bank PIP) is not the same object as Brazil's income Gini (51.6 in 2023).

**Missing people.** The poorest — remote, nomadic, in institutions, in camps, in households that decline to be interviewed — are under-represented in surveys. Conflict countries have thin coverage: the World Bank's 2022 global poverty estimate had survey coverage of only 49 percent of the population of sub-Saharan Africa, against 94 percent in East Asia and the Pacific (World Bank, June 2025 PIP vintage). Global totals are therefore weighted imputations, not sums of equally reliable country figures.

**PPP revisions.** When the ICP released 2021 PPPs, the World Bank moved the international poverty line from \$2.15 (2017 PPP) to \$3.00 (2021 PPP) and the higher lines from \$3.65 to \$4.20 and from \$6.85 to \$8.30 (June 2025 update). The 2022 global extreme-poverty count under the new line was about 838 million (10.5 percent), against 713 million (9.0 percent) under the old line. Most of the increase is a change of measuring rod, not a sudden impoverishment. The September 2026 PIP vintage put 2024 extreme poverty at 10.1 percent, or 824 million people, with a nowcast of about 811 million for 2026.

::: example GDP, GNI and remittances {#ex-gni-remit}
In a given year, Country R produces GDP of 80 billion international dollars. Residents receive remittances of 12 billion from workers abroad and pay 2 billion of profits to foreign owners of domestic mines. Population is 20 million. Compute GDP per capita and GNI per capita, and say which is the better living-standard indicator here.
::: solution
Net primary income from abroad is $12 - 2 = 10$ billion, so GNI $= 80 + 10 = 90$ billion. Per capita, GDP is $80/20 = 4{,}000$ international dollars and GNI is $90/20 = 4{,}500$. For living standards, GNI per capita is the better indicator: it counts the remittances residents can spend and nets out the profits that leave the country. GDP per capita remains the right measure of output on the territory — relevant for productivity and for the tax base attached to domestic production.
:::
:::

::: application Reading a WDI country page
Take Ethiopia. In 2024, GDP per capita at PPP was about \$3,290 (World Bank WDI). Agriculture still accounted for about 35 percent of GDP in 2023 and for around 60 percent of employment (World Bank WDI / ILO modelled estimates). The HDI was 0.492 in 2023, in the low human-development group, with life expectancy 68.6 years and GNI per capita \$2,900 at 2021 PPP (UNDP HDR 2025). Extreme poverty is much higher than in Vietnam, which had GDP per capita at PPP of about \$16,400 in 2024 and an HDI of 0.766. The comparison is the starting point of a development question — why two low-income countries in the 1980s diverged — not the answer. Measurement tells you what has to be explained. The rest of this course is the attempt to explain it.
:::

::: widget distribution
dist: lognormal
params: mu=1.2, sigma=0.8
a: 0
b: 3
caption: A lognormal stand-in for the distribution of daily consumption in international dollars. The shaded area is the fraction below a poverty line of 3. Raise $\sigma$ (spread) and watch the mass below the line grow — inequality, not just the mean, feeds the headcount. This is a cartoon of a household-survey distribution, not a fitted model of any country.
:::

## Evidence

A handful of well-dated facts organise the rest of the course.

From 1990 to about 2013, global extreme poverty fell rapidly, driven overwhelmingly by East Asia and then South Asia. China's growth took several hundred million people over successive international lines; India followed more slowly. Sub-Saharan Africa's *rate* fell more modestly, and because population grew, the *number* of extremely poor people in the region stayed high. Since the mid-2010s the global headcount has stagnated: the World Bank's *Poverty, Prosperity and Planet Report 2026* puts 2026 extreme poverty at about 811 million, "a rate unchanged since 2019", and notes that had the 2000–13 pace continued, some 240 million fewer people would be poor.

The same decades produced a narrowing of *between-country* inequality in PPP incomes — China and India moving toward the middle of the world distribution — and, in many countries, a rise in *within-country* inequality, especially in China and in several African economies. Latin America, from a very high base, compressed income Ginis in the 2000s (the Brazilian Gini fell from the high 50s toward the low 50s) before stalling. Southern Africa remains the most unequal region on household-survey Ginis: South Africa's was 63.0 in 2014, the latest World Bank PIP figure.

Health and schooling moved even when incomes did not. Global life expectancy rose from about 64 years in 1990 to about 73 in 2023 (UN DESA), with large gains in Bangladesh, Ethiopia and several other poor countries, and with a visible dent from HIV/AIDS in southern Africa and from COVID-19 everywhere. Mean years of schooling rose almost everywhere, but **learning** — what children can do with those years — has lagged, a theme of [[development-economics/human-capital]].

None of these facts is a theorem. They are the output of surveys, censuses, vital registration and the ICP, revised whenever a new PPP round or a new Indian consumption survey arrives. Treat a published "the number of poor is $X$" as an estimate with a vintage, a welfare aggregate, a line and a coverage rate attached.

::: history
The League of Nations and then the UN Statistical Commission standardised national accounts after the Second World War; Colin Clark's *Conditions of Economic Progress* (1940) and Simon Kuznets's work on US accounts had already made cross-country comparison conceivable. Irving Kravis, Alan Heston and Robert Summers built the first systematic PPPs at the University of Pennsylvania, giving rise to the Penn World Table (first published 1978). Mahbub ul Haq, who had been Pakistan's planning minister, persuaded the UNDP to put people rather than GDP on the cover of a flagship report; the 1990 Human Development Report launched the HDI, with Sen's capability approach as its stated philosophy. Martin Ravallion and colleagues at the World Bank constructed the original "dollar-a-day" line from the national poverty lines of very poor countries (1990–91); the line has been re-based with each ICP round, to \$1.25 (2005 PPP), \$1.90 (2011 PPP), \$2.15 (2017 PPP) and \$3.00 (2021 PPP). Sabina Alkire and James Foster's counting method (2011) is the backbone of the global MPI. Each of these was a choice about what to count, not a discovery of a unique number.
:::

## Where this leads

Poverty *measures* — the headcount, the gap, the Foster–Greer–Thorbecke family, the Lorenz curve and the Gini — are the subject of [[development-economics/poverty-and-inequality]]. How an economy's *structure* changes as income rises, and whether manufacturing is a ladder that some countries are now missing, is [[development-economics/structural-change]]. Long-run levels of income, as opposed to the measurement of a given year's cross-section, are the terrain of [[economic-growth/growth-facts]] and [[economic-growth/institutions-and-growth]]. The rest of this course takes the measuring rods of the present chapter as given and asks what, in markets and in the state, produces the numbers.

::: summary
- Cross-country income comparisons should use **purchasing-power parities**, not market exchange rates; PPPs raise measured real income in poor countries because non-tradables are cheap there ([[#def-ppp]]).
- State the benchmark year, the welfare aggregate (GDP or GNI, income or consumption), and whether a figure is real, PPP or at market rates. Mixing them is the most common error in applied work.
- The **HDI** is the geometric mean of scaled health, education and log-income indices ([[#def-hdi]]). The geometric mean prevents full substitution across dimensions ([[#prop-hdi-geom]]).
- Sen's **capabilities** are the real freedoms to achieve functionings. The **MPI** is a counting measure $M_0 = H \times A$ of overlapping deprivations ([[#def-af]]), complementary to a consumption poverty line.
- Global extreme poverty is about one person in ten at \$3.00 a day (2021 PPP): 824 million in 2024, concentrated in sub-Saharan Africa, with progress largely stalled since the mid-2010s (World Bank PIP, 2026).
- Every published number has a vintage, a coverage rate and a method. ICP revisions and new surveys move headlines without any change in the world.
:::

## Exercises

::: exercise A PPP conversion {level=1 check="7500"}
A comparable basket costs 12,000 naira in Nigeria and 80 dollars in the United States. Nigeria's GNI per capita is 1,125,000 naira. What is GNI per capita in international dollars? (Enter that number.)
::: solution
The PPP exchange rate is $12{,}000/80 = 150$ naira per international dollar. GNI per capita at PPP is $1{,}125{,}000/150 = 7{,}500$ international dollars.
:::
:::

::: exercise The income index {level=1 check="0.557"}
Using the UNDP formula in [[#def-hdi]], compute $I_{\text{income}}$ for GNI per capita of 4,000 international dollars. Report the result to three decimal places. (Enter $I_{\text{income}}$.)
::: hint
$I_{\text{income}} = \ln(y/100)/\ln(75000/100)$.
:::
::: solution
$I_{\text{income}} = \ln(4000/100)/\ln(75000/100) = \ln 40 / \ln 750$. Now $\ln 40 \approx 3.6889$ and $\ln 750 \approx 6.6201$, so $I_{\text{income}} \approx 0.557$.
:::
:::

::: exercise Health index {level=1 check="0.692"}
Life expectancy is 65 years. Using the goalposts in [[#def-hdi]], what is $I_{\text{health}}$, to three decimal places? (Enter the index.)
::: solution
$I_{\text{health}} = (65-20)/(85-20) = 45/65 \approx 0.692$.
:::
:::

::: exercise GDP versus GNI {level=2 check="4500"}
A country produces GDP of 40 billion international dollars, receives remittances of 6 billion, and pays 1 billion of profits to foreign owners. Population is 10 million. What is GNI per capita? (Enter international dollars per person.)
::: solution
Net primary income from abroad is $6-1 = 5$ billion, so GNI $= 45$ billion and GNI per capita is $45/10 = 4{,}500$.
:::
:::

::: exercise Why a geometric mean {level=2}
Country D has dimension indices $(0.9, 0.9, 0.1)$ and country E has $(0.6, 0.6, 0.6)$. Compute the arithmetic-mean composite and the HDI-style geometric mean for each. Which country ranks higher under each rule, and why did the UNDP prefer the geometric mean?
::: solution
Arithmetic means: D has $1.9/3 \approx 0.633$, E has $0.600$, so D ranks higher. Geometric means: D has $(0.9 \times 0.9 \times 0.1)^{1/3} = (0.081)^{1/3} \approx 0.433$; E has $0.6$. E now ranks higher. The geometric mean penalises D for the near-zero dimension: extra income (or extra schooling) cannot fully offset a very short life. That is the UNDP's stated reason for abandoning the arithmetic mean in 2010.
:::
:::

::: exercise An MPI in a six-person hamlet {level=2}
Six people, three equally weighted indicators, $k = 1/3$. Deprivation vectors: $(1,1,1)$, $(1,1,0)$, $(1,0,0)$, $(0,1,0)$, $(0,0,0)$, $(0,0,0)$. Compute $H$, $A$ and $M_0$.
::: hint
Censor counts below $k$ to zero before averaging.
:::
::: solution
Weighted counts: $1$, $2/3$, $1/3$, $1/3$, $0$, $0$. Four people are poor, so $H = 4/6 = 2/3$. Sum of censored counts $= 1 + 2/3 + 1/3 + 1/3 = 7/3$, so $M_0 = (7/3)/6 = 7/18$ and $A = M_0/H = (7/18)/(2/3) = 7/12$.
:::
:::

::: exercise Penn effect {level=2}
Explain, in a Balassa–Samuelson sketch, why the dollar price of a haircut is lower in Addis Ababa than in Amsterdam, while the dollar price of a USB stick is similar. What does this imply for GDP per capita at market exchange rates versus at PPP?
::: solution
Traded goods (the USB stick) are arbitraged, so the law of one price is a reasonable first approximation and market exchange rates convert their prices. Non-tradables (the haircut) are produced with local labour. Wages are lower in Ethiopia because labour productivity in the *traded* sector is lower; those low wages also cheapen haircuts. The market exchange rate, set by traded goods and capital flows, therefore understates the real consumption of Ethiopian residents. Dividing by a PPP rate, which includes the cheap haircut, raises measured Ethiopian real income relative to the market-rate figure.
:::
:::

::: exercise Capping income in the HDI {level=3}
Show that once $y \ge 75{,}000$, further growth of GNI per capita cannot raise the HDI. Then discuss, as a normative question rather than a computational one, what is gained and what is lost by the cap. (No single number is required.)
::: hint
Look at the definition of $I_{\text{income}}$ in [[#def-hdi]].
:::
::: solution
By definition $y$ is replaced by $\min(y, 75{,}000)$ before taking logs, so $I_{\text{income}} = 1$ for all $y \ge 75{,}000$. The HDI is then $(\,I_{\text{health}}\cdot I_{\text{education}}\cdot 1\,)^{1/3}$ and does not depend on $y$. What is gained: the index does not let Gulf-state or Irish GNI, inflated by oil or by the booking of multinational profits, dominate the ranking, and it embodies a view that extra income at that level is not human development in the UNDP's sense. What is lost: two countries with identical health and schooling but very different high incomes are treated as equal, and the cap is a sharp, somewhat arbitrary, cutoff rather than a smooth declining weight. The logarithm already builds in declining marginal contribution; the cap is an extra, discontinuous, judgement.
:::
:::

::: exercise Survey mean versus national accounts {level=3}
Suppose a household survey reports mean consumption of 4 international dollars a day and a headcount of 30 percent below a line of 3 dollars. National accounts imply mean consumption of 6 dollars a day. An analyst scales every survey observation by $6/4$ and recomputes the headcount. What happens to the headcount if the *shape* of the distribution is unchanged? Why might the World Bank's PIP refuse to do this, and why might a national statistical office insist on it?
::: hint
Scaling every $y_i$ by $3/2$ is a proportional shift. The new headcount is the old share of people with $y_i < 3 \times 4/6 = 2$.
:::
::: solution
If every observation is scaled by $3/2$, the headcount below 3 becomes the original share below $3 \times 4/6 = 2$. That is a lower line on the original distribution, so the headcount falls (strictly, unless nobody lives between 2 and 3). PIP generally trusts the survey mean because the national-accounts consumption aggregate includes items (financial intermediation, imputed rents, government consumption) that are not in the household welfare aggregate, and because the gap between the two series has grown in several large countries in ways that look like measurement rather than missing household consumption. A statistical office that has already published a GDP figure may prefer consistency with that figure. The disagreement is about *which mean* belongs with the survey's *distribution*; it is not a disagreement about the Lorenz curve of the survey itself. Ravallion (2003, and later papers) documents how large the discrepancy can be for India and China.
:::
:::

::: exercise Constructing a small HDI {level=3 check="0.569"}
Using [[#def-hdi]], compute the HDI of a country with life expectancy 65, mean years of schooling 6, expected years of schooling 10, and GNI per capita 4,000. Report to three decimal places. (Enter the HDI.)
::: hint
This is the country of [[#ex-hdi-calc]].
:::
::: solution
As in [[#ex-hdi-calc]]: $I_{\text{health}} \approx 0.692$, $I_{\text{education}} \approx 0.478$, $I_{\text{income}} \approx 0.557$, and $\mathrm{HDI} \approx 0.569$.
:::
:::

