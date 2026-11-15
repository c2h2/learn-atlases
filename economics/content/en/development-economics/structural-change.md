In 2023, agriculture, forestry and fishing employed 916 million people, 26 percent of world employment; the share was 46 percent in Africa and 5 percent in Europe (FAOSTAT / ILO modelled estimates, July 2025 update). Agrifood systems more broadly — farms plus processing, trade, food service — employed about 1.4 billion people, 40 percent of the global workforce, down from 52 percent in 2000 (FAO, 2026 update). In Ethiopia, agriculture still accounted for about 36 percent of GDP in 2023 and around 60 percent of employment; in China those figures were about 7 percent of GDP and a much smaller employment share; in the United States, agriculture is under 2 percent of both (World Bank WDI; ILO). Development, in the classical sense of Clark, Kuznets and Chenery, *is* this shift: labour and output moving from agriculture to industry and services, from villages to towns, from self-employment on a plot to wage work.

This chapter studies that transformation with two workhorse models — Lewis's dual economy and Harris–Todaro migration — and with the facts of industrialisation and of **premature deindustrialisation**. The measurement of income is in [[development-economics/measuring-development]]; the agricultural contracts that sit behind the "traditional sector" are in [[development-economics/land-and-agriculture]]. Growth theory's aggregate production function, which this chapter will disaggregate, is in [[economic-growth/solow-model]].

## Two sectors

Kuznets's facts of structural change, restated by later authors (Herrendorf, Rogerson and Valentinyi; Duarte and Restuccia), are robust enough to organise the data:

- The **employment share** of agriculture falls with income per head, from above 70 percent in the poorest countries toward 2–5 percent in the richest.
- The **value-added share** of agriculture falls too, but from a lower starting point, because output per worker is lower on the farm than in the rest of the economy. The gap between the employment share and the GDP share is a measure of the agricultural **productivity gap**.
- Industry's employment and GDP shares first rise and then, in today's rich countries, fall as services take over. In several African and Latin American economies the industrial peak has been lower, and has come at a lower income, than it did in Europe or East Asia — Rodrik's premature deindustrialisation, taken up below.
- Urbanisation tracks the fall in agricultural employment, with a lag and with large slums, because people leave the farm faster than formal industrial jobs appear.

::: definition Dual economy {#def-dual}
A **dual economy** has a **traditional** (or subsistence, or agricultural) sector, in which labour is abundant, capital is scarce, and the wage is not equal to the marginal product of labour, and a **modern** (or capitalist, or industrial) sector, in which firms maximise profit, pay a wage, and use reproducible capital. Labour can move between the sectors, possibly at a cost.
:::

Dualism is a modelling choice, not a claim that every poor country has a sharp legal wall between farm and factory. It is useful when average and marginal products of labour diverge, when a large share of work is family work on a plot, and when a small modern sector can hire at a wage that does not rise with its own employment — at least for a while.

## The Lewis model

W. Arthur Lewis (1954) asked how a small modern sector could grow in an economy full of people whose extra farm work added little to farm output. His answer was **surplus labour**.

::: definition Surplus labour {#def-surplus}
There is **surplus labour** in agriculture if the marginal product of labour is zero (or, more weakly, less than the wage the modern sector must pay) over a range of employment, so that withdrawing workers does not cut farm output (or cuts it by less than the modern-sector wage). The **Lewis turning point** is the employment level at which surplus labour is exhausted and the modern-sector wage begins to rise with modern employment.
:::

Lewis's original story is not a fully specified general equilibrium; later writers (Ranis and Fei 1961; Sen 1966; Harris and Todaro 1970) tightened it. A workable textbook version is as follows.

Agriculture produces food with labour $L_A$ and a fixed amount of land $T$, $Q_A = F(T, L_A)$, with $F_L \ge 0$, $F_{LL} \le 0$. If land is shared among family members and each member eats the **average** product, the rural living standard is $w_A = F(T, L_A)/L_A$. The modern sector produces a manufactured good with capital $K$ and labour $L_M$, $Q_M = G(K, L_M)$, hires at a wage $w_M \ge w_A$ (with a possible premium for urban costs or efficiency wages), and reinvests profits. Total labour $L_A + L_M = \bar L$ is fixed.

::: proposition Lewis wage and the turning point {#prop-lewis}
Suppose $w_M$ is a fixed markup on the rural average product, $w_M = (1+\mu) F(T, L_A)/L_A$, and modern firms hire until $G_L(K, L_M) = w_M$. Then:

1. If $F_L(T, L_A) = 0$ on a range of $L_A$, withdrawals from agriculture do not cut $Q_A$, $w_A$ rises only because $L_A$ in the denominator falls, and a small modern sector faces an almost flat labour-supply curve.
2. Once $F_L$ becomes positive and comparable to $w_M$, further modern hiring raises $w_M$. That is the turning point.
3. Growth of $K$, financed by modern-sector profits, raises labour demand $G_L$ and draws more labour out of agriculture. The surplus, while it lasts, is a source of cheap labour and of profits to reinvest — Lewis's "engine of growth".
:::
::: proof
(Sketch.) With $F_L = 0$, $Q_A$ is independent of $L_A$ on the surplus range, so $w_A = Q_A/L_A$ rises only as $L_A$ falls. For small $L_M = \bar L - L_A$, this rise is second-order in $L_M$, and with a fixed markup so is $w_M$. Profit maximisation $G_L(K, L_M) = w_M$ then traces a demand curve that slides right as $K$ grows, with $w_M$ nearly constant until surplus is exhausted. After that, $F_L > 0$ and falling $L_A$ cuts $Q_A$, so $w_A$ and $w_M$ rise with $L_M$. Profits $\Pi = G(K, L_M) - w_M L_M$ are the residual that, in Lewis, become next period's $K$.
:::

The empirical question is whether $F_L$ is near zero. Early tests (Schultz's "India 1918–19 influenza" argument: farm output *did* fall when labour was withdrawn) suggested not. Later work finds a large **agricultural productivity gap** — output per worker is much lower on farms than in the rest of the economy, even after adjusting for hours and human capital (Gollin, Lagakos and Waugh, *QJE* 2014) — which is consistent with a low *marginal* product, with mismeasurement of farm output, with selection, or with barriers to mobility. The gap is a fact; surplus labour in the strict Lewis sense is a hypothesis about its source.

::: example A linear farm technology {#ex-lewis-linear}
Farm output is $Q_A = \min\{T, a L_A\}$ with $T = 100$ and $a = 1$. There are $\bar L = 150$ workers. The modern sector's labour demand (in units of the farm good) is $L_M = 80 - 10 w_M$, and $w_M = w_A$. Find rural employment, the rural wage, and modern employment (a) in the surplus-labour range, (b) if 40 people leave the farm for a public-works job that does not use farm land.
::: solution
Average product is $w_A = 100/L_A$ as long as $L_A \ge T/a = 100$ (the surplus range: $F_L = 0$ for $L_A > 100$). Then $L_M = 150 - L_A$ and $w_M = 100/L_A$, so $150 - L_A = 80 - 10 \times 100/L_A$. Multiply through by $L_A$: $150 L_A - L_A^2 = 80 L_A - 1{,}000$, or $L_A^2 - 70 L_A - 1{,}000 = 0$. The positive root is $L_A = 35 + \sqrt{2225} \approx 35 + 47.2 = 82.2$, which is *below* 100, so the economy is not in the surplus range in equilibrium: land is binding. Reset on the intensive-cultivation side, $Q_A = L_A$ (since $a = 1$ and $L_A \le 100$), $w_A = 1$, $L_M = 80 - 10 = 70$, $L_A = 80$. That uses $L_A < 100$, consistent. (a) So $w_A = 1$, $L_A = 80$, $L_M = 70$. There *is* surplus land in the sense that 20 units of $T$ are idle if $Q_A = L_A$, but there is not surplus *labour*: $F_L = 1 = w_A$. (b) If 40 workers are withdrawn from the 150, $\bar L = 110$, then $L_M = 70$ still (wage still 1), $L_A = 40$, output $Q_A = 40$. Farm output falls one-for-one. This economy was past the turning point already. Surplus labour would have required $\bar L$ large enough that the solution of the demand-and-average-product system sat at $L_A > 100$.
:::
:::

The algebra of [[#ex-lewis-linear]] is the point of the turning point: whether withdrawing labour cuts output depends on which side of $T/a$ you are on. Lewis's claim about poor countries in 1954 was that many were on the surplus side. Whether Ethiopia or eastern India in the 2020s is on that side is an empirical question, not a deduction.

::: widget plot
f: max(0.4, 3.2 - 0.25*x); 4.5 - 0.45*x; w
sliders: w=1.2:0.6:2.2:0.1
x: 0, 12
y: 0, 5
labels: \text{farm MPL}; \text{modern MPL}; w
caption: A Lewis picture in wage–employment space. Farm MPL falls and then flattens (surplus); modern MPL is the manufacturing demand curve. Slide the wage $w$, a stand-in for average product on the farm. Modern employment is where the orange curve meets $w$. A higher $w$ (the turning point arriving) cuts modern employment; a rightward shift of the orange curve, from capital accumulation, would raise it.
:::

## Harris–Todaro migration

People do leave the farm, but they do not all walk into a factory job. Cities in poor countries have large informal sectors and open unemployment. John Harris and Michael Todaro (1970) asked why a rational rural worker would migrate into urban unemployment.

::: definition Harris–Todaro equilibrium {#def-ht}
Let $w_R$ be the rural wage, $w_U$ the urban *formal* wage (set above market-clearing by a minimum wage, a union, or an efficiency wage), $L_U$ formal urban jobs, and $N_U$ the urban labour force. If each urban job is allocated at random, the expected urban wage is $(L_U/N_U) w_U$. **Harris–Todaro equilibrium** requires

$$
w_R = \frac{L_U}{N_U}\, w_U,
$$ {#eq-ht}

with $N_U \ge L_U$ and the residual $N_U - L_U$ unemployed (or in a zero-earning informal queue).
:::

::: proposition The Todaro paradox {#prop-todaro}
In the basic Harris–Todaro model, an extra formal urban job can *raise* urban unemployment. If $w_U$ and $w_R$ are fixed, [[#eq-ht]] gives $N_U = L_U\, w_U/w_R$, so unemployment $N_U - L_U = L_U (w_U/w_R - 1)$ *increases* one-for-one with $L_U$ scaled by the wage gap. Creating one job induces $w_U/w_R > 1$ migrants.
:::
::: proof
With $w_U, w_R$ fixed, [[#eq-ht]] is linear: $N_U = (w_U/w_R) L_U$. Then $d(N_U - L_U)/d L_U = w_U/w_R - 1 > 0$ whenever the urban wage premium is positive. The extra job is filled, but more than one person leaves the farm to queue for it.
:::

The paradox is a warning about urban job creation as a poverty programme, not a proof that jobs are bad. If the rural wage rises as people leave (the Lewis mechanism), or if the urban informal sector earns a positive living, the multiplier $w_U/w_R$ overstates induced migration. Empirical elasticities of migration to urban wage gaps are positive but not always as large as the simple model (see, among many, the African and South Asian migration studies surveyed by Lucas, and the Mexican data used by Hanson and others).

::: example Induced migration {#ex-ht-numbers}
Rural wage $w_R = 4$, urban formal wage $w_U = 8$, formal jobs $L_U = 100$. Find the Harris–Todaro urban labour force, the unemployment rate, and the effect of 10 extra formal jobs.
::: solution
$N_U = 100 \times 8/4 = 200$. Unemployment is 100, the rate is $1/2$. Ten extra jobs: $N_U' = 110 \times 2 = 220$, unemployment $110$, which has risen by 10. The unemployment *rate* stays $1/2$. Job creation here scales the queue; it does not drain it.
:::
:::

::: quiz
In the basic Harris–Todaro model with a fixed urban wage premium $w_U/w_R = 2$, creating 50 formal jobs induces how many migrants from the countryside?
- [ ] 25
- [ ] 50
- [x] 100
- [ ] 0, because the unemployed fill the jobs first
::: solution
$N_U = 2 L_U$, so $\Delta N_U = 2 \times 50 = 100$. Fifty of the migrants fill the new jobs; fifty join the unemployed. The unemployed who were already in the city are reshuffled by random assignment, but the *size* of the urban labour force is pinned down by expected-wage equalisation, not by who was in the queue yesterday.
:::
:::

## Industrialisation and premature deindustrialisation

Lewis and Harris–Todaro are silent on *what* the modern sector makes. For a century the answer, in countries that became rich, was manufactures. Manufacturing is tradable, has strong productivity growth, and historically absorbed large amounts of moderately skilled labour. The East Asian cases — Japan, then South Korea, Taiwan, later China and Vietnam — combined a falling agricultural employment share with a rising manufacturing share and with manufactured exports.

Dani Rodrik (2016, *Journal of Economic Growth*) documented that, since the 1980s, manufacturing employment *peaks* at a lower share of the labour force, and at a lower GDP per capita, than it did in the early industrialisers. Latin America deindustrialised from the 1980s; much of sub-Saharan Africa never industrialised far. Services, including informal urban services, have taken a larger share of extra jobs. FAO and ILO numbers cited above are the agricultural side of the same fact: people leave the farm, but many of them do not enter factories.

Several forces are in play, and they are not mutually exclusive:

- **Trade and China.** Manufactures are traded. Once China became the workshop of the world, latecomers faced a lower relative price of manufactures and a harder time breaking into the same rungs of the ladder (see [[international-trade]]).
- **Technology.** Manufacturing became more capital- and skill-intensive, so a given output requires fewer moderately skilled workers.
- **Demand.** As incomes rise, Engel's law shifts demand toward services; at low incomes that force is weaker, so it cannot be the whole African story.
- **Policy.** Import-substituting industrialisation, then structural-adjustment devaluations of industrial protection, then a second wave of industrial-policy experiments, all changed relative prices. The merits of those policies are taken up, without a verdict, in [[development-economics/aid-and-policy]].

::: warning Employment shares are not productivity
A falling agricultural *employment* share is consistent with rising agricultural *output*, if productivity on the farm grows fast enough (the East Asian and, in cereals, the Green Revolution pattern). It is also consistent with stagnation on the farm and a push into urban poverty (a Harris–Todaro pattern). Always pair the employment share with output per worker. FAO's 2023 figure of 916 million agricultural workers is compatible with both stories in different countries.
:::

::: example A Harris–Todaro informal sector {#ex-ht-informal}
$w_R = 5$, $w_U = 10$, $w_I = 2$, $L_U = 80$. Using the informal-sector expected-wage equation $N_U = L_U (w_U - w_I)/(w_R - w_I)$, compute $N_U$ and the number of informal workers. Compare with the no-informal-sector case $w_I = 0$.
::: solution
$N_U = 80 \times (10-2)/(5-2) = 80 \times 8/3 \approx 213$. Informal workers $N_U - L_U \approx 133$. With $w_I = 0$, $N_U = 80 \times 10/5 = 160$ and the residual 80 earn nothing. A positive informal wage raises the multiplier from 2 to $8/3$, so *more* people urbanise: the urban lottery is less terrible, and expected urban earnings equal $w_R$ only when the formal job is more crowded. Zero-earning unemployment is replaced by low-earning informal work; urbanisation is larger.
:::
:::

::: example A productivity gap {#ex-gap}
In a two-sector economy, agriculture has 60 percent of employment and 30 percent of GDP; the rest is "non-agriculture". What is the ratio of non-agricultural to agricultural output per worker?
::: solution
Let total employment and GDP be 1. Agricultural output per worker is $0.30/0.60 = 0.50$; non-agricultural is $0.70/0.40 = 1.75$. The ratio is $1.75/0.50 = 3.5$. Gollin, Lagakos and Waugh find gaps of this order, reduced but not eliminated by adjustments for hours, human capital and the relative price of farm goods. A gap of 3.5 is an invitation to ask about mobility costs, about dualism, and about measurement; it is not, by itself, a measure of surplus labour.
:::
:::

::: widget plot
f: A*x^a; A*x
sliders: A=1:0.5:2:0.1; a=0.5:0.2:1:0.05
x: 0, 8
y: 0, 8
labels: A x^{a}; A x
caption: Two production functions in one input (labour, land fixed). The concave curve ($a < 1$) is diminishing returns on a farm of fixed size; the ray is constant returns, a stand-in for a modern sector that can duplicate factories. Slide $a$ up toward 1 and the farm looks more like the factory. Lewis's surplus-labour region is an extreme of diminishing returns: extra labour adds almost nothing.
:::

## Evidence

Chenery and Syrquin's cross-country patterns (1975, and updates) still describe the broad sweep: agriculture's GDP share falls with log income, industry's hump is visible in historical European and East Asian series, and urbanisation rises. The African exception is in the *composition* of the non-farm economy, not in the direction of the agricultural decline. In sub-Saharan Africa the farm employment share fell from about 60 percent in 2000 to about 49 percent in 2022, while off-farm agrifood employment rose from 13 to 19 percent of jobs (World Bank, *Seizing opportunities in African agriculture*, citing ILOSTAT and FAOSTAT). Nigeria had almost as many jobs in off-farm agrifood (33 percent) as in primary agriculture (35 percent); the Democratic Republic of Congo remained heavily on-farm (56 percent primary, 5 percent off-farm agrifood).

Urbanisation without industrialisation has a spatial signature: large primate cities, slums, and a large urban informal sector. UN DESA's *World Urbanization Prospects* puts the urban share of Africa at about 45 percent and of Latin America at about 80 percent, with Lagos, Kinshasa, São Paulo and Mexico City as the familiar mega-cities. Harris–Todaro is a parable of those cities, not a census of them.

China's Lewis turning point has been a research industry of its own. Rural-to-urban migration of several hundred million people, the hukou system as a brake, and rising coastal wages since the late 2000s are the ingredients. Whether the turning point "arrived" around 2010, as some authors claim, or whether interior surplus remains, depends on the province and on the definition. The point for this course is that Lewis's mechanism is used, in applied work, as a template to be tested, not as a decoration.

::: history
Fisher, Clark and Kuznets, in the 1930s–50s, classified output into primary, secondary and tertiary and documented the shift. Lewis's 1954 *Manchester School* paper, which later contributed to his 1979 Nobel Prize (shared with Schultz), put surplus labour and capitalist profits at the centre of development. Ranis and Fei (1961) made the turning point explicit. Harris and Todaro (1970, *AER*) added urban unemployment and induced migration; Fields, Todaro and others developed the informal-sector variant. Chenery and Syrquin (1975) estimated the empirical patterns. Rodrik's 2016 paper on premature deindustrialisation, and the earlier "unconditional convergence in manufacturing" result (Rodrik 2013), reframed the industrialisation question for a world in which China already existed. None of these papers claims that factories are the only path; they claim that the path that was walked, historically, is now steeper.
:::

## Where this leads

The farm side of dualism — sharecropping, land rights, the Green Revolution — is [[development-economics/land-and-agriculture]]. Human capital, which shifts both $F$ and $G$ and which affects who migrates, is [[development-economics/human-capital]]. Whether governments can *force* the modern-sector path by industrial policy is [[development-economics/aid-and-policy]]. Aggregate growth with one sector and a savings rate is [[economic-growth/solow-model]]; structural change is what that aggregation conceals.

::: summary
- Structural transformation is the fall of agriculture's employment and GDP shares, the hump of industry, and the rise of services and of cities. It is visible in FAO, ILO and WDI data for Africa, Asia and Latin America.
- Lewis's dual economy explains modern-sector growth at a nearly constant wage while surplus labour lasts, and a rising wage after the turning point ([[#def-surplus]], [[#prop-lewis]]).
- Harris–Todaro equalises the *expected* urban wage with the rural wage; an urban wage gap then creates a queue, and extra formal jobs can enlarge that queue ([[#def-ht]], [[#prop-todaro]]).
- Premature deindustrialisation is the fact that manufacturing employment now peaks earlier and lower than it did in the historical industrialisers (Rodrik 2016). Trade, technology, demand and policy are competing explanations.
- An agricultural productivity gap of a factor of two or three is a robust stylised fact; strict surplus labour (zero MPL) is a stricter, more fragile, claim.
:::

## Exercises

::: exercise Average versus marginal product {level=1}
Farm output is $Q = 10 L - 0.05 L^2$ for $L \le 100$. Compute the average and marginal products at $L = 80$. Is there surplus labour in Lewis's strict sense?
::: solution
$Q(80) = 800 - 320 = 480$, so $\mathrm{APL} = 480/80 = 6$. $\mathrm{MPL} = 10 - 0.1 L = 10 - 8 = 2$. MPL is positive, so there is no surplus labour in the strict sense. There is still a gap between APL and MPL, which is what a family-farm sharing rule would exploit if the wage were tied to APL.
:::
:::

::: exercise Harris–Todaro queue {level=1 check="150"}
$w_R = 6$, $w_U = 9$, $L_U = 100$. What is the Harris–Todaro urban labour force $N_U$? (Enter $N_U$.)
::: solution
$N_U = 100 \times 9/6 = 150$.
:::
:::

::: exercise Unemployment rate {level=1 check="1/3"}
In the previous exercise, what is the urban unemployment rate $(N_U - L_U)/N_U$? (Enter the rate.)
::: solution
$(150-100)/150 = 1/3$.
:::
:::

::: exercise Induced migration {level=2 check="30"}
Continuing from the previous numbers, 20 new formal jobs are created, with $w_U$ and $w_R$ fixed. How many people leave the countryside? (Enter the increase in $N_U$.)
::: solution
The multiplier is $w_U/w_R = 1.5$, so $\Delta N_U = 1.5 \times 20 = 30$.
:::
:::

::: exercise A productivity gap {level=2 check="4"}
Agriculture has 50 percent of employment and 20 percent of GDP. What is the ratio of non-agricultural to agricultural output per worker? (Enter the ratio.)
::: solution
Agricultural output per worker is $0.2/0.5 = 0.4$; non-agricultural is $0.8/0.5 = 1.6$; ratio $1.6/0.4 = 4$.
:::
:::

::: exercise Turning point {level=2}
Farm output is $Q_A = \min\{200, 2 L_A\}$ and $\bar L = 180$. Modern labour demand is $L_M = 120 - 20 w$, and $w = w_A$. Is the equilibrium in the surplus-labour region? Compute $L_A$, $L_M$ and $w$.
::: hint
Surplus labour requires $L_A > 200/2 = 100$, where $Q_A = 200$ and $w_A = 200/L_A$.
:::
::: solution
On the surplus side, $w = 200/L_A$ and $L_M = 180 - L_A = 120 - 20 \times 200/L_A$. Then $180 - L_A = 120 - 4{,}000/L_A$, so $60 - L_A = -4{,}000/L_A$, or $L_A^2 - 60 L_A - 4{,}000 = 0$. The positive root is $30 + \sqrt{4900} = 30+70 = 100$, which is exactly the kink. At $L_A = 100$, $w = 2$, $L_M = 80$, and $120 - 20\times 2 = 80$, which matches. The economy sits on the turning point.
:::
:::

::: exercise Why factories? {level=3}
State two reasons manufacturing has been thought a "special" modern sector for development, and two reasons those reasons may apply less to a latecomer in the 2020s than to South Korea in the 1970s. Keep the discussion positive: what the arguments claim, not what a government should do.
::: solution
Special, historically: (i) manufactures are tradable, so a small economy can grow without being limited by domestic demand; (ii) manufacturing has had rapid productivity growth and has absorbed moderately educated labour in large numbers, producing unconditional convergence *within* manufacturing (Rodrik 2013). Less special now: (i) China already occupies many of the rungs, and relative prices of manufactures are lower; (ii) production is more capital- and skill-intensive, so employment per unit of output is smaller, and some tradable *services* (tourism, business process outsourcing, in a few cases software) can play a similar role. Neither pair of reasons dictates a policy; they describe a change in the environment in which industrialisation takes place.
:::
:::

::: exercise Informal urban earnings {level=3}
Modify Harris–Todaro so that the $N_U - L_U$ people who do not get a formal job earn $w_I \in (0, w_R)$ in the informal sector, and jobs are still assigned at random. Write the expected-wage equation and show that $N_U$ is smaller, for given $L_U, w_U, w_R$, than in [[#eq-ht]]. What happens to the Todaro paradox as $w_I \to w_R$?
::: hint
Expected urban earnings are $(L_U/N_U) w_U + (1 - L_U/N_U) w_I$.
:::
::: solution
Equalisation: $(L_U/N_U) w_U + (1-L_U/N_U) w_I = w_R$. Rearrange: $(L_U/N_U)(w_U - w_I) = w_R - w_I$, so $N_U = L_U (w_U - w_I)/(w_R - w_I)$. Compared with $L_U w_U/w_R$, this is smaller whenever $w_I > 0$ (the queue is less unattractive, so fewer people need to join it to equate expected earnings). As $w_I \to w_R$, $N_U \to \infty$ would seem to blow up, but the only way to satisfy the equation for $w_I = w_R$ is $w_U = w_R$ or $L_U/N_U = 0$; if $w_U > w_R = w_I$, everyone prefers a lottery over $w_U$ and $w_I$ to the rural wage, and the whole labour force urbanises. The Todaro paradox (extra jobs drawing more than one migrant) still holds for $w_I < w_R$, with multiplier $(w_U - w_I)/(w_R - w_I) > 1$.
:::
:::
