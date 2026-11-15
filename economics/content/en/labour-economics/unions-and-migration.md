A union is a cartel on the supply side of a labour market: it bargains over the wage, and sometimes over employment, on behalf of a group of workers. A migrant is a shift of that supply, from one market to another. The two topics share a diagram — labour demand, an alternative wage, and a wedge — and they share an empirical difficulty: unions are not randomly assigned to firms, and migrants are not randomly assigned to cities. This chapter treats them in turn. The union half is about wage setting when bargaining power is on the worker side; the migration half is about what happens to native wages and employment when labour supply moves, with the Borjas and Card–Peri evidence presented as competing readings of the same question rather than as a settled number.

Union density has fallen in most rich countries. In the US, union membership was about 10 per cent of wage and salary workers in 2023, against about 20 per cent in 1983 (BLS, *Union Members 2023*). In the UK, density was about 22 per cent in 2023 (Department for Business and Trade, *Trade Union Statistics*). In Sweden it remains above 60 per cent; in France density is low but coverage of collective agreements is high (OECD, *Trade Union Dataset*, accessed 2026). Immigration as a share of the population has risen: foreign-born residents were about 14 per cent of the US population in 2022 (Census Bureau, ACS), about 17 per cent of Germany’s, 14 per cent of the UK’s, and 30 per cent of Australia’s (OECD *International Migration Outlook*). These are the stocks the models below have to speak to.

## Monopoly unions and efficient bargains

The simplest union model takes labour demand as given and lets the union pick a wage.

::: definition Monopoly union {#def-monopoly-union}
A **monopoly union** sets $w$ to maximise members’ objective $U(w, L)$ subject to $L = L^d(w)$. A common objective is $(w - w_a)L$, where $w_a$ is the alternative wage (the competitive wage, or a benefit). Employment is then read off demand: the union is a monopolist on the labour-supply side, and the firm retains the **right to manage**.
:::

::: proposition Monopoly-union wage {#prop-monopoly-union}
If $U = (w - w_a)L^d(w)$ and labour demand has elasticity $\eta_D < 0$, the union’s interior wage satisfies

$$
\frac{w - w_a}{w} = \frac{1}{\lvert\eta_D\rvert}.
$$ {#eq-union-markup}

The union’s markup over the alternative wage is the inverse elasticity of demand, as in monopoly pricing. Assumptions: a single wage, no bargaining over $L$, a rent-maximising objective, and an interior solution.
:::

::: proof
Maximise $\ln U = \ln(w - w_a) + \ln L^d(w)$. The first-order condition is $1/(w - w_a) + L^{d\prime}(w)/L^d(w) = 0$. Multiplying by $w$ and using $\eta_D = w L^{d\prime}/L^d$ gives [[#eq-union-markup]].
:::

The more elastic is labour demand, the smaller is the union wage gap — a Hicks–Marshall result from [[labour-economics/labour-demand]]. A union covering a whole industry, facing inelastic product demand, can push harder than a union covering one firm among many.

The monopoly-union outcome is inefficient: there are pairs $(w, L)$ that both the union and the firm prefer, because the firm’s isoprofit curves are not tangent to the union’s indifference curves at a point on the demand curve. The **efficient-bargain** model lets the two bargain over $w$ and $L$ together.

::: definition Efficient bargain {#def-efficient-bargain}
An **efficient bargain** is a pair $(w, L)$ that maximises the union’s objective subject to a given profit for the firm, or vice versa. The set of such pairs is the **contract curve**. With $U = (w - w_a)L$ and profit $\pi = R(L) - wL$, the contract curve satisfies $R'(L) = w_a$: employment is at the competitive level given $w_a$, and the wage splits the surplus according to bargaining power.
:::

Strong unions, on this view, raise wages and need not reduce employment; they tax rents. The empirical distinction between right-to-manage and efficient bargains is not clean, because employment can also be a target of bargaining over manning rules, and because $w_a$ is hard to measure. Brown and Ashenfelter (1986, *Journal of Political Economy*) is the classic test; later work is mixed.

::: example A linear monopoly union {#ex-union}
Labour demand is $L = 40 - 2w$ and $w_a = 8$. Find the monopoly-union wage and employment. Compare with the competitive outcome $w = w_a$.
::: solution
$U = (w-8)(40-2w)$. Expanding, $56w - 2w^2 - 320$. The derivative $56 - 4w = 0$ gives $w = 14$ and $L = 12$. The markup is $(14-8)/14 = 6/14 \approx 0.43$. At this point $\lvert\eta_D\rvert = 2w/L = 28/12 \approx 2.33$, whose inverse is $0.43$, matching [[#eq-union-markup]]. Competitive employment would be $L = 24$ at $w = 8$. The union halves employment in this linear example — an illustration of the model, not a typical estimate.
:::
:::

::: widget plot
f: 20-0.5*x; 8; u
x: 0, 40
y: 0, 22
sliders: u=14:8:20:0.5
labels: \text{demand}; w_a; \text{union wage}
caption: Inverse labour demand $w = 20 - L/2$ (that is $L = 40 - 2w$) and the alternative wage $w_a = 8$. Move the union wage. Employment is the quantity demanded at that wage. At $u = 14$ you recover [[#ex-union]]: $L = 12$.
:::

## Union wage effects in the data

Lewis (*Unionism and Relative Wages in the United States*, 1963, and the 1986 survey) put the US union wage gap — the ceteris-paribus log-wage difference between union and non-union workers — at about 10–20 per cent. Later estimates using better ability controls, worker fixed effects, and the decline of density, often come in toward the lower end of that range, with a larger gap for low-skill workers (Card, Lemieux and Riddell 2004, *Journal of Labor Research*). The gap is a relative wage, not a welfare number: part of it may be a compensating differential for the kind of jobs that are unionised, part a rent, and part the threat effect that raises non-union wages too.

Unions also compress the wage distribution inside the covered sector, which is why their decline is a candidate explanation for the rise in lower-tail inequality in [[labour-economics/wage-inequality]]. They reduce quits, raise the use of formal grievance procedures, and in some settings raise productivity — Freeman and Medoff’s *What Do Unions Do?* (1984) “voice” face — while the monopoly face reduces employment along a downward-sloping demand curve. Which face dominates is an empirical question at the industry and country level, not a theorem.

::: example A close-election thought experiment {#ex-election}
In 100 firms, a union wins a certification election by one vote in 50 and loses by one vote in 50. Mean log wages later are $2.80$ in the winners and $2.72$ in the losers. Interpret the $0.08$ gap. Why is it closer to a causal union effect than the OLS gap between all union and non-union workers?
::: solution
Near a 50 per cent vote share, winning is as good as randomly assigned if there is no manipulation of the count (the DiNardo–Lee design). The $0.08$ is then an estimate of the effect of certification on wages at that margin, about 8 per cent. The OLS gap compares workplaces that differ in size, industry, and worker skill, not only in union status. The close-election estimate can still fail if winners and losers differ in unobservables that also affect wages, or if the election itself changes wages through threat effects on both sides.
:::
:::

::: warning The union gap is not the effect of unionising a workplace
OLS comparisons of union and non-union workers mix the causal effect of the union with the selection of which workplaces organise and which workers join. Instrumenting with an organising-drive victory in a close election (DiNardo and Lee 2004, *Quarterly Journal of Economics*) has often found smaller effects on wages than the OLS gap, though subsequent work on elections has found clearer wage effects in some designs (Frandsen 2021, *Journal of Labor Economics*). Quote the design, not only the 15 per cent figure from Lewis.
:::

## Migration as a labour-supply shift

A one-time inflow of $M$ workers into a market with native labour $N$ is a shift of labour supply. If natives and immigrants are perfect substitutes, the competitive model of [[labour-economics/labour-market-equilibrium]] says that the wage falls and native employment (along the native supply curve) may fall. The size of the wage fall is $1/\lvert\eta_D\rvert$ times the proportional supply shift if native supply is inelastic, and less if natives leave the market or the region.

::: definition Skill-cell and spatial approaches {#def-approaches}
The **skill-cell** approach (Borjas 2003, *Quarterly Journal of Economics*) partitions the national labour market by education and experience, treats immigrants as adding supply in their cell, and estimates the wage effect from the cross-cell variation. The **spatial** approach (Card 1990 on Miami; Altonji and Card 1991) compares cities or regions that received more and fewer immigrants. The two need not agree: natives can move, capital can adjust, and immigrants are not randomly assigned to cells or to cities.
:::

If immigrants are *imperfect* substitutes for natives — because of language, legal status, or task specialisation — the relevant $\sigma$ is between immigrant and native labour, not between labour and capital, and native wages can rise in the complementary cells even as they fall in the substitute cells. Peri and Sparber (2009, *American Economic Journal: Applied Economics*) argue that less-educated immigrants in the US specialise in manual tasks and natives in communication-intensive tasks, which is a complementarity. Dustmann, Schönberg and Stuhler (2016, *Journal of Economic Perspectives*) review why the spatial and national estimates differ: the spatial estimate is a *total* effect, including native out-migration and demand adjustment; the skill-cell estimate is closer to a partial effect holding the native distribution fixed.

::: proposition A competitive wage effect {#prop-migration-wage}
In a closed, competitive market with inelastic native supply and perfect substitution, a $1$ per cent rise in labour supply lowers the wage by $1/\lvert\eta_D\rvert$ per cent. If $\lvert\eta_D\rvert = 0.5$, a $10$ per cent inflow lowers wages by $20$ per cent. Capital adjustment, elastic native supply, and imperfect substitution all make the native-wage effect smaller (and possibly positive for some natives). Assumptions: a single type of labour in the first sentence; the qualifications are the content of the rest of the literature.
:::

The $20$ per cent number is a benchmark, not an estimate. Empirical papers almost always find smaller effects than this closed-economy, inelastic-capital calculation, which is a reason to take the qualifications seriously rather than to discard the competitive diagram.

::: example A back-of-the-envelope inflow {#ex-inflow}
A city has $N = 1{,}000{,}000$ native workers. An inflow of $M = 50{,}000$ immigrants arrives, all in the same skill group. Native supply is inelastic, $\lvert\eta_D\rvert = 0.4$, and substitution is perfect. Compute the predicted competitive wage change. What happens to the prediction if $\sigma$ between natives and immigrants is $5$ rather than infinity?
::: solution
The supply shift is $5$ per cent. The wage falls by $5 / 0.4 = 12.5$ per cent if substitution is perfect and capital is fixed. If $\sigma = 5$, natives and immigrants are good but not perfect substitutes: the wage of natives falls by less than $12.5$ per cent, and the wage of immigrants (the own-group wage) falls by more. A CES formula analogous to [[labour-economics/wage-inequality#eq-sbtc]] gives the split; the qualitative point is that perfect substitution is the worst case for native wages.
:::
:::

## The Mariel boatlift, Borjas, Card and Peri

In 1980 about 125,000 Cubans left from Mariel to Miami, raising Miami’s labour force by roughly 7 per cent, with a larger proportional increase among high-school dropouts. Card (1990, *Industrial and Labor Relations Review*) compared Miami with a group of other cities and found little effect on native wages or unemployment, including among the less skilled. The paper is the spatial approach’s canonical exhibit.

Borjas (2017, *ILR Review*) revisited Mariel, focusing on high-school dropouts and on a different comparison, and found large negative wage effects for that group. Peri and Yasenov (2019, *ILR Review*) and others replied that the result is sensitive to the choice of comparison cities and to a small, noisy dropout sample in the CPS. The exchange is a reminder that a single episode, however famous, is not a literature.

Borjas (2003) used national skill cells for 1960–2000 and estimated that a 10 per cent rise in immigrant supply in a cell lowered that cell’s weekly earnings by 3–4 per cent. Ottaviano and Peri (2012, *Journal of the European Economic Association*) used a related CES structure but allowed imperfect substitution between natives and immigrants *within* a cell, and found small, sometimes positive, effects on native wages, with the negative effect concentrated on previous immigrants. The disagreement is in large part a disagreement about $\sigma$ between natives and immigrants, about how to measure the alternative wage of dropouts, and about whether the right market is the nation or the city.

A fair reading as of 2026 is this. Sudden, large, low-skill inflows into a local market can reduce wages for natives in the most substitutable jobs, especially in the short run before capital and output mix adjust. Many spatial studies, including those that instrument immigrant inflows with historical settlement patterns (Card 2001, *Journal of Labor Economics*), find small average effects on native wages and larger effects on the wages of previous immigrants. National skill-cell studies in the Borjas tradition find more adverse effects for natives in the same education–experience cell. Both can be true if natives move out of cells and cities, if immigrants and natives specialise in different tasks, and if capital adjusts. There is no consensus number for “the” wage effect of immigration, and there should not be: the effect is a function of the mix of immigrants, the horizon, and the substitutes.

Complementary evidence from Europe is consistent with that spread. Dustmann, Frattini and Preston (2013, *Review of Economic Studies*) find that immigration to the UK lowered wages below the 10th percentile and raised them further up — a distributional effect, not a zero. Foged and Peri (2016, *American Economic Journal: Applied Economics*) find that the inflow of refugees into Danish municipalities pushed less-educated natives into more complex jobs and raised their wages, a task-specialisation response. In Israel, the 1990s arrival of Jews from the former Soviet Union is a large supply shock whose estimated wage effects depend, again, on the substitutes and the horizon (Friedberg 2001, *Quarterly Journal of Economics*; Cohen-Goldner and Paserman 2011, *Journal of the European Economic Association*).

::: example Spatial versus cell arithmetic {#ex-spatial-cell}
A city receives immigrants equal to 6 per cent of its labour force, all dropouts. Dropouts are 20 per cent of the city’s natives. Nationally, the same inflow is 1 per cent of the dropout cell. If $\lvert\eta_D\rvert = 0.5$ and substitution is perfect, compare the closed-economy wage predictions for city dropouts (spatial, no mobility) and for the national dropout cell.
::: solution
In the city, dropout labour supply rises by $6/20 = 30$ per cent if only dropouts are affected, so the local dropout wage falls by $30/0.5 = 60$ per cent — an enormous, and empirically implausible, number, which is why native out-migration, demand adjustment and imperfect substitution have to be in the model. Nationally, a 1 per cent cell inflow predicts a $1/0.5 = 2$ per cent wage fall. The spatial closed-economy number is larger because the same people are a bigger shock to a smaller market. Card’s small spatial estimates say those closed-economy assumptions fail locally; Borjas’s cell estimates of 3–4 per cent per 10 per cent inflow are closer to a $\lvert\eta_D\rvert$ of 2.5–3, not 0.5, once the national market is the unit.
:::
:::

::: quiz
In the competitive model with perfect substitution, inelastic native supply and fixed capital, the native wage effect of an immigrant inflow is
- [ ] zero, because demand is derived
- [x] negative, in proportion to $1/\lvert\eta_D\rvert$ times the supply shift
- [ ] positive, because immigrants raise product demand
- [ ] equal to the union wage gap
::: solution
[[#prop-migration-wage]]: a supply shift along a downward-sloping demand curve lowers the wage. Product-demand effects (immigrants also consume) and capital adjustment qualify the result, which is why the empirical estimates are smaller than the closed-economy benchmark. They do not make the benchmark positive.
:::
:::

::: intuition Why Card and Borjas can both be looking at the data
Card’s Miami comparison asks: did the city that received the people have lower native wages than cities that did not? Borjas’s skill-cell comparison asks: did the education–experience groups that received more immigrants have lower wages than groups that did not? If natives in Miami’s dropout group left Miami, or left the dropout cell by acquiring a credential, the spatial estimate shrinks and the national cell estimate does not. If immigrants take different tasks from natives, both estimates shrink for natives. The disagreement is about which adjustment is allowed to load into the estimate, not about whether a supply curve exists.
:::

## Other margins: fiscal, product demand, and innovation

Wages are not the only outcome. Immigrants pay taxes and receive public services; the net fiscal effect depends on age, education and the host country’s welfare state, and it is not the same in Germany, the Gulf, and the US (National Academies of Sciences, *The Economic and Fiscal Consequences of Immigration*, 2017, for the US). Immigrants also buy goods, which shifts labour *demand* out, a channel that the pure supply diagram omits. A small literature on innovation finds that high-skill immigrants raise patenting in US cities (Hunt and Gauthier-Loiselle 2010, *American Economic Journal: Macroeconomics*); that is a shift of $A$ in the production function, not a movement along it. None of these margins cancels the distributional question for the closest substitutes, and none of them is a ranking of immigration policies.

::: history
John Hicks’s *Theory of Wages* (1932) already treated unions as monopolies on the labour-supply side. Dunlop and Leontief in the 1940s discussed efficient bargains; McDonald and Solow (1981, *American Economic Review*) wrote the modern contract-curve model. Lewis (1963, 1986) is the empirical union-wage tradition. On immigration, Card’s Mariel study (1990) and Borjas’s *Friends or Strangers* (1990) and “The Economics of Immigration” (*Journal of Economic Literature*, 1994) set the two empirical styles. Borjas (2003) and Ottaviano and Peri (2012) are the skill-cell clash; Dustmann, Schönberg and Stuhler (2016) is the best short guide to why the numbers differ.
:::

## Where this leads

Union wage compression is part of the institutional account of [[labour-economics/wage-inequality]]. Immigration is a relative-supply shifter in the same CES machinery. Search and matching ([[labour-economics/search-and-unemployment]]) give both unions and immigrants a labour market in which jobs are rationed by vacancies rather than by a spot wage, which changes the short-run incidence of a supply shock. Development economics studies the sending-country side: remittances, brain drain and the selection of who leaves.

::: summary
- A monopoly union sets a markup $(w-w_a)/w = 1/\lvert\eta_D\rvert$ and employment is on the demand curve ([[#def-monopoly-union]], [[#prop-monopoly-union]]). An efficient bargain can keep employment at the competitive level and split rents ([[#def-efficient-bargain]]).
- US union wage gaps in OLS are often 10–20 per cent; causal estimates from close elections are often smaller. Unions compress the covered distribution.
- Immigration is a labour-supply shift. The competitive benchmark with perfect substitution is a wage fall of $1/\lvert\eta_D\rvert$ times the inflow ([[#prop-migration-wage]]). Capital adjustment and imperfect substitution reduce the native-wage effect.
- Card’s spatial evidence (Mariel, city inflows) finds small average native-wage effects; Borjas’s skill-cell evidence finds larger adverse effects in the same education–experience cell. Both can be true once mobility and $\sigma$ are allowed for. There is no single “wage effect of immigration”.
:::

## Exercises

::: exercise Monopoly markup {level=1 check="14"}
Demand is $L = 40 - 2w$ and $w_a = 8$, as in [[#ex-union]]. What wage does the monopoly union set? (Enter $w$.)
::: solution
$w = 14$, as derived in the example.
:::
:::

::: exercise Employment at that wage {level=1 check="12"}
In the previous exercise, what is employment? (Enter $L$.)
::: solution
$L = 40 - 2\times 14 = 12$.
:::
:::

::: exercise Inverse elasticity {level=1}
Verify [[#eq-union-markup]] at the solution of [[#ex-union]].
::: solution
$(w-w_a)/w = 6/14 \approx 0.429$. Demand $L = 40-2w$ has $\lvert\eta_D\rvert = 2w/L = 28/12 \approx 2.333$, and $1/2.333 \approx 0.429$.
:::
:::

::: exercise Efficient versus monopoly {level=2}
In the efficient-bargain model with $U = (w-w_a)L$ and $R'(L) = w_a$, what is employment compared with the competitive market at $w_a$? Who is better off than under the monopoly union, the firm, the union, or both?
::: solution
Employment is at the competitive level $L^d(w_a)$, larger than monopoly-union employment. Both can be better off: the extra employment raises the surplus, and any split that gives the union at least $U_{\text{monopoly}}$ and the firm at least $\pi_{\text{monopoly}}$ is an improvement. That is why the monopoly-union point is not on the contract curve.
:::
:::

::: exercise A supply shift {level=2 check="-10"}
Native supply is inelastic, substitution is perfect, $\lvert\eta_D\rvert = 0.5$, and immigration raises labour supply by $5$ per cent. Compute the competitive percentage change in the wage. (Enter the percentage change, so $-10$ means a $10$ per cent fall.)
::: solution
$5 / 0.5 = 10$ per cent fall, so $-10$.
:::
:::

::: exercise Substitutes and complements {level=2}
Explain, in one paragraph, why less-educated natives might *gain* from an inflow of less-educated immigrants if the two groups specialise in different tasks.
::: solution
If immigrants take manual tasks and natives take communication-intensive tasks, the two labours are complements in production: extra immigrant labour raises the marginal product of native labour in the communication task. Native wages in that task rise even though both groups have the same measured education. Peri and Sparber (2009) is the empirical case for this specialisation in the US. Perfect substitution in [[#prop-migration-wage]] shuts the channel down.
:::
:::

::: exercise Mariel {level=3}
State Card’s (1990) design and headline result, then Borjas’s (2017) objection, in a short paragraph each. What would you need in order to treat either paper as a general estimate of “the” effect of immigration?
::: solution
Card compared Miami with a small group of control cities around the 1980 boatlift and found no material decline in native wages or employment, including among the less skilled. Borjas restricted attention to high-school dropouts, chose different comparisons, and found large negative wage effects for that group; subsequent papers showed sensitivity to the comparison and to sample size. To generalise either result one would need replication across inflows that differ in skill mix, legal status and horizon, plus a view on native mobility. A single city’s episode is an important data point, not a parameter of [[#prop-migration-wage]].
:::
:::

::: exercise Skill cells versus cities {level=3}
Why might the skill-cell estimate of the native wage effect be more negative than the spatial estimate, even if both are well identified? Refer to [[#def-approaches]].
::: hint
Think about who is allowed to adjust in each design.
:::
::: solution
The spatial estimate lets natives leave the city, lets capital and product demand adjust locally, and averages over cells. The skill-cell estimate holds the national native distribution across education and experience (approximately) fixed and so captures the partial effect on the cell that received the supply. If natives move out of the exposed cell or city, the spatial estimate shrinks relative to the cell estimate. Dustmann, Schönberg and Stuhler (2016) is the map of these differences.
:::
:::

::: exercise Threat effects {level=2}
A non-union firm raises wages when a union organising drive begins in its industry. In which box of this chapter does that belong, and how does it bias the OLS union wage gap as a measure of the union’s effect on *covered* workers?
::: solution
It is a threat effect: the union changes the alternative for the non-union firm. OLS compares union wages with non-union wages that have already been pushed up, so the *gap* understates the union’s effect on the level of wages in the industry. The gap can at the same time *overstate* the causal effect of covering one more workplace, if high-wage workplaces are more likely to organise. The two biases need not cancel; they are reasons to prefer designs that use organising events rather than union status as a regressor.
:::
:::
