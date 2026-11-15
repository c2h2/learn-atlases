Put the labour-supply curve of the first chapter against the labour-demand curve of the second and you have a market. In a competitive market the wage equalises the hours people want to sell with the hours firms want to buy. A payroll tax, a union wage or a **minimum wage** then has effects that can be read off the same diagram — provided the competitive assumption holds. If it does not, if firms have to raise wages to attract more workers, the diagram changes and some of the predictions reverse. That is why the minimum wage is not a solved problem. The competitive model says a binding floor reduces employment; a monopsony model says a modest floor can raise it; the evidence, from Card and Krueger (1994) onwards, has been a thirty-year argument about magnitudes, not a single number.

In 2023 about 5.1 per cent of the world’s labour force was unemployed (ILO, *WESO Trends 2024*), while the OECD employment-to-population ratio for ages 15–64 was 69.0 per cent (OECD, accessed 2026). Those stocks are the outcome of the flows this course studies. This chapter is about the wage that, in a spot market, would equate supply and demand, and about what happens when the law or a large employer prevents that wage from obtaining. Search and matching, which drop the spot-market assumption altogether, wait until [[labour-economics/search-and-unemployment]].

## Competitive equilibrium

::: definition Competitive labour-market equilibrium {#def-competitive}
A **competitive labour-market equilibrium** is a wage $w^*$ and employment $L^*$ such that $L^s(w^*) = L^d(w^*) = L^*$, where $L^s$ is aggregate labour supply ([[labour-economics/labour-supply]]) and $L^d$ is aggregate labour demand ([[labour-economics/labour-demand]]). Every firm takes $w^*$ as given; every worker takes $w^*$ as given. If a legal floor $\underline{w} > w^*$ is imposed, employment is the short side $L^d(\underline{w})$ and the excess supply $L^s(\underline{w}) - L^d(\underline{w})$ is involuntary unemployment in this model.
:::

With an upward-sloping supply curve and a downward-sloping demand curve there is at most one such $w^*$. Efficiency follows from the usual surplus argument: every hour that is worked has $\mathrm{VMP}_L \ge w^*$ and a reservation wage $\le w^*$, so its social surplus is non-negative, and every hour that is not worked has the inequalities reversed.

::: proposition Efficiency of competitive employment {#prop-efficiency}
If there are no externalities, no taxes, no monopsony and no matching frictions, competitive employment $L^*$ maximises the sum of workers’ surplus and firms’ surplus. A binding minimum wage $\underline{w} > w^*$ cuts employment to $L^d(\underline{w}) < L^*$ and creates a deadweight loss equal to the surplus on the lost hours.
:::

::: proof
Workers’ surplus is the area between $w^*$ and the supply curve; firms’ surplus is the area between the demand curve and $w^*$. Their sum is the area between demand and supply up to $L^*$. Moving $L$ away from $L^*$ loses a slice of that area. A floor $\underline{w} > w^*$ rations jobs by demand, so $L = L^d(\underline{w}) < L^*$ and the lost slice is the triangle (or curvilinear triangle) between demand and supply from $L^d(\underline{w})$ to $L^*$.
:::

::: example Linear supply and demand {#ex-linear}
Let inverse demand be $w = 20 - L$ and inverse supply $w = 4 + \tfrac12 L$ (with $L$ in thousands of hours). Find the competitive equilibrium. If a minimum wage of $14$ is imposed, find employment, excess supply, and the deadweight loss.
::: solution
Equate $20 - L = 4 + \tfrac12 L$: $16 = \tfrac32 L$, so $L^* = 32/3 \approx 10.67$ and $w^* = 20 - 32/3 = 28/3 \approx 9.33$. At $\underline{w} = 14$, demand is $20 - 14 = 6$ and supply is $(14 - 4)/(1/2) = 20$. Employment is $6$ (the short side), excess supply is $14$ thousand hours, and the lost hours run from $6$ to $10.67$. Demand minus supply on that interval is $(20 - L) - (4 + L/2) = 16 - \tfrac32 L$. The deadweight loss is $\int_6^{32/3} (16 - \tfrac32 L)\,\mathrm{d}L = \bigl[16L - \tfrac34 L^2\bigr]_6^{32/3} = \bigl(16\cdot 32/3 - \tfrac34 \cdot 1024/9\bigr) - \bigl(96 - 27\bigr) = \bigl(512/3 - 256/3\bigr) - 69 = 256/3 - 69 = \tfrac{256 - 207}{3} = 49/3 \approx 16.33$.
:::
:::

The figure draws the same linear market. Move the wage floor with the slider; employment is the quantity demanded once the floor is above equilibrium.

::: widget plot
f: 20-x; 4+0.5*x; m
x: 0, 24
y: 0, 22
sliders: m=9:0:18:0.5
labels: \text{demand}; \text{supply}; \text{wage floor}
caption: Inverse labour demand $w = 20 - L$ and inverse supply $w = 4 + L/2$, as in [[#ex-linear]]. The slider is a wage floor. Below equilibrium ($w^* \approx 9.33$) the floor does not bind. Above it, employment is the demand quantity and the gap to supply is excess labour. Try $m = 14$ to match the example.
:::

::: warning Excess supply is not the unemployment rate {#warn-excess}
In the competitive diagram, $L^s(\underline{w}) - L^d(\underline{w})$ is the number of hours people would like to sell at $\underline{w}$ and cannot. The official unemployment rate counts people who are without a job, available, and looking. Some of the excess supply is hours among the already employed; some of the unemployed are people whose reservation wage is above $\underline{w}$ and who would not be on $L^s(\underline{w})$ at all; and many unemployed are people in the middle of a search that the spot-market model does not describe. Do not read a minimum-wage gap off the diagram as a prediction for the ILO unemployment rate.
:::

## Payroll taxes and incidence

A tax of $t$ per hour on the employer shifts inverse demand down by $t$: the firm cares about the wage it *pays*, $w + t$. A tax of $t$ on the worker shifts inverse supply up by $t$: the worker cares about the wage she *receives*. In a competitive market the two are equivalent, and the split of $t$ between a lower net wage and a higher cost to the firm is determined by elasticities.

::: proposition Tax incidence in a competitive labour market {#prop-incidence}
Let $\eta_S > 0$ be the elasticity of labour supply and $\lvert\eta_D\rvert$ the absolute elasticity of labour demand, both evaluated at the no-tax equilibrium. A small tax $t$, levied on either side, reduces the net wage by approximately $\lvert\eta_D\rvert / (\eta_S + \lvert\eta_D\rvert)$ of $t$ and raises the wage paid by firms by $\eta_S / (\eta_S + \lvert\eta_D\rvert)$ of $t$. Employment falls by approximately $\bigl(\eta_S \lvert\eta_D\rvert / (\eta_S + \lvert\eta_D\rvert)\bigr) (t/w)$.
:::

::: proof
At the new equilibrium $L^d(w_{\text{firm}}) = L^s(w_{\text{net}})$ with $w_{\text{firm}} = w_{\text{net}} + t$. Differentiating and converting to elasticities gives $\mathrm{d}w_{\text{net}} / \mathrm{d}t = -\lvert\eta_D\rvert / (\eta_S + \lvert\eta_D\rvert)$ and $\mathrm{d}w_{\text{firm}} / \mathrm{d}t = \eta_S / (\eta_S + \lvert\eta_D\rvert)$. The employment effect follows from either schedule. The statutory side of the tax does not enter.
:::

If labour supply is very inelastic (prime-age men, short run), workers bear most of a payroll tax as a lower net wage and employment barely moves. If labour demand is very inelastic, firms bear most of it. Cross-country evidence on payroll-tax reforms — Gruber (1997) on Chile’s privatisation of social security, Saez, Matsaganis and Tsakloglou (2012) on a Greek reform, and several Nordic youth-payroll-tax cuts — often finds substantial pass-through into wages, consistent with inelastic supply, with modest employment effects except for groups whose supply is more elastic.

::: example Incidence with the linear market {#ex-tax}
Take the market of [[#ex-linear]] and put a tax of $t = 3$ on firms. Find the wage workers receive, the wage firms pay, and employment.
::: solution
Demand becomes $w + 3 = 20 - L$, or $w = 17 - L$. Set $17 - L = 4 + L/2$: $13 = \tfrac32 L$, $L = 26/3 \approx 8.67$, net wage $w = 4 + 13/3 = 25/3 \approx 8.33$, wage paid $11.33$. Of the $3$ tax, about $1$ comes off the net wage ($9.33$ to $8.33$) and $2$ is paid by firms ($9.33$ to $11.33$). Supply is less elastic than demand at the original equilibrium (slopes $1/2$ versus $1$), so workers bear less than half — wait, the *slope* of inverse supply is $1/2$, which means supply is *more* elastic in quantity-for-wage terms than demand. Yes: $\mathrm{d}L/\mathrm{d}w = 2$ on supply and $1$ on demand, so $\eta_S$ is larger at the same $(w, L)$ than $\lvert\eta_D\rvert$, and firms bear more of the tax, which matches $2$ versus $1$.
:::
:::

## Monopsony

A **monopsonist** is the sole buyer of labour in a market. More usefully, a firm has monopsony power whenever the labour supply it faces is upward-sloping rather than infinitely elastic: to hire more, it must raise the wage, and the higher wage applies to the workers it already employs. Manning (*Monopsony in Motion*, 2003) argued that search frictions make this the normal case, even when many firms are in the same city. The textbook diagram is the static version.

Let $w(L)$ be the inverse labour supply facing the firm, with $w'(L) > 0$. The cost of an extra worker is not $w$ but the **marginal cost of labour**

$$
\mathrm{MC}_L = w(L) + L w'(L) = w\Bigl(1 + \frac{1}{\varepsilon}\Bigr),
$$ {#eq-mcl}

where $\varepsilon = w/(L w')$ is the elasticity of labour supply *to the firm*. Profit maximisation sets $\mathrm{MRP}_L = \mathrm{MC}_L$, and the wage is then read off the supply curve, so $w < \mathrm{MRP}_L$. Employment is below the competitive level.

::: definition Monopsony equilibrium {#def-monopsony}
A monopsonist facing inverse supply $w(L)$ and revenue product $\mathrm{MRP}(L)$ hires $L_m$ defined by $\mathrm{MRP}(L_m) = \mathrm{MC}_L(L_m)$ and pays $w_m = w(L_m)$. The gap $\mathrm{MRP}(L_m) - w_m$ is the **markdown**. Under [[#eq-mcl]] the markdown as a share of the wage is $1/\varepsilon$.
:::

::: proposition A modest minimum wage can raise monopsony employment {#prop-min-monopsony}
If $w_m < \underline{w} \le w^*$, a minimum wage $\underline{w}$ makes the firm’s effective $\mathrm{MC}_L$ equal to $\underline{w}$ up to the hours supplied at $\underline{w}$. The firm then hires $\min\{L^s(\underline{w}), L^{\mathrm{MRP}}(\underline{w})\}$, which is larger than $L_m$ for $\underline{w}$ in this interval. Employment and the wage both rise. A floor above $w^*$ reduces employment below $L^*$, as in the competitive case.
:::

::: proof
Without a floor, $\mathrm{MC}_L$ lies above $w(L)$ and cuts $\mathrm{MRP}$ at $L_m$. A floor $\underline{w}$ in $(w_m, w^*]$ replaces $\mathrm{MC}_L$ by the horizontal line at $\underline{w}$ until it hits supply; that horizontal line cuts $\mathrm{MRP}$ further right than $L_m$. Once $\underline{w} > w^*$, the floor is above the competitive wage and the MRP–floor intersection is left of $L^*$.
:::

::: example The linear monopsonist {#ex-monopsony}
Take inverse supply $w = 4 + \tfrac12 L$ and $\mathrm{MRP} = 20 - L$, as in [[#ex-linear]] but now with a single buyer. Find $L_m$ and $w_m$. What does a minimum wage of $9$ do to employment?
::: solution
Total labour cost is $wL = 4L + \tfrac12 L^2$, so $\mathrm{MC}_L = 4 + L$. Set $4 + L = 20 - L$: $L_m = 8$, $w_m = 4 + 4 = 8$. Competitive employment was $L^* \approx 10.67$, $w^* \approx 9.33$. A floor of $9$ lies between $8$ and $9.33$. Supply at $w = 9$ is $L = (9-4)/(1/2) = 10$. MRP at $L = 10$ is $10 > 9$, so the firm wants at least those $10$ hours and is constrained by supply: employment rises from $8$ to $10$. (A floor of $14$, as in [[#ex-linear]], would cut employment to $6$, below even the monopsony level.)
:::
:::

::: example A Card–Krueger increment {#ex-ck-numbers}
New Jersey’s 1992 rise took the minimum from \$4.25 to \$5.05, about 19 per cent. Using a competitive teenage employment elasticity of $-0.2$ from the pre-1990 time-series literature, what percentage employment change would the competitive model have predicted for a group whose wages all moved with the floor? Card and Krueger found a *rise* of about 2.5 workers per restaurant, on a base of roughly 20 full-time-equivalent workers. Contrast the two numbers.
::: solution
A 19 per cent wage rise with elasticity $-0.2$ predicts a $3.8$ per cent employment *fall*. On 20 workers that is about $0.8$ jobs lost per store. A rise of 2.5 workers is a 12.5 per cent *gain*. The gap between $-0.8$ and $+2.5$ is what the paper put on the table; it is a statement about this increment in this market, not a new law of labour demand.
:::
:::

How much monopsony power is there? A modern literature using job-level separations as a function of the wage — the idea that $\varepsilon$ can be recovered from how fast workers leave when the wage is low — finds supply elasticities to the firm of perhaps $3$ to $5$ in US data (Bassier, Dube and Naidu 2022, *Review of Economic Studies*, among others), implying markdowns of $20$–$30$ per cent. Card, Cardoso, Heining and Kline (2018, *Journal of Labor Economics*) and the subsequent AKM-style work find that the same worker is paid differently at different firms, which is also a rejection of the law of one wage. The estimates are not yet a consensus, and they vary by occupation and local concentration. They are large enough that [[#prop-min-monopsony]] is a live possibility, not a curiosity.

::: quiz
A firm is a monopsonist paying $w_m$ and hiring $L_m$. A minimum wage is set *exactly* at the competitive wage $w^*$. Employment
- [ ] falls, as it would in a competitive market
- [x] rises relative to $L_m$, up to the competitive level $L^*$
- [ ] is unchanged, because $w^*$ was already available
- [ ] becomes infinite, because supply is now horizontal
::: solution
$w^*$ is the upper end of the interval in [[#prop-min-monopsony]]. The floor makes $\mathrm{MC}_L = w^*$ up to $L^*$, and $\mathrm{MRP}(L^*) = w^*$, so the firm hires $L^*$. Employment rises from $L_m$ to $L^*$. A floor *above* $w^*$ would start to cut employment.
:::
:::

## Minimum wages: theory in one place

The two models disagree about a *modest* binding floor:

| | Competitive market | Monopsony |
|---|---|---|
| Employment | falls | rises if $\underline{w} \in (w_m, w^*]$ |
| Hours of the still-employed | may fall | rise (along supply) |
| Who loses | workers who had jobs at $w^*$ and do not at $\underline{w}$ | nobody, for a small enough floor |
| Who gains | workers who keep jobs and are paid more | the same, and some extra hires |
| Prices of the product | rise (scale effect) | ambiguous |

A third class of models — efficiency wages, in which a higher wage raises productivity by reducing shirking or turnover — can also produce small employment losses or small gains. They share with monopsony the idea that the wage is not merely a price that rations a homogeneous hours market.

All of the models agree that a *large* enough floor reduces employment: even a monopsonist will not hire hours whose $\mathrm{MRP}$ lies below $\underline{w}$. The empirical question is where “modest” ends, for which workers, and in which markets.

## Evidence on minimum wages

The pre-1990 US time-series literature, summarised by Brown, Gilroy and Kohen (1982, *Journal of Economic Literature*), typically found that a 10 per cent rise in the federal minimum wage reduced teenage employment by 1–3 per cent, an elasticity of $-0.1$ to $-0.3$. That was the textbook number. It was identified from national time series, in which the federal minimum moves rarely and other things (recessions, cohort size, school enrolment) move at the same time.

**Card and Krueger (1994).** On 1 April 1992 New Jersey raised its minimum wage from \$4.25 to \$5.05 an hour; Pennsylvania’s stayed at \$4.25. Card and Krueger surveyed 410 fast-food restaurants in New Jersey and eastern Pennsylvania before and after the rise (*American Economic Review*, 84(4), 772–793). Full-time-equivalent employment *rose* in New Jersey relative to Pennsylvania, by about 2.5 workers per restaurant in their preferred specification. A second comparison, of New Jersey stores already paying \$5.00 or more with New Jersey stores that had to raise pay, went the same way. The paper did not claim that minimum wages never cost jobs; it claimed that, in this market, at this increment, the competitive prediction of a 4–6 per cent job loss (using the old elasticities) did not happen.

**The critics.** Neumark and Wascher (2000, *American Economic Review*) used payroll records from a sample of the same restaurants, collected by a lobby group, and found a *negative* employment effect. Card and Krueger (2000, *AER*) replied with Bureau of Labor Statistics data on the same industry and again found a small positive or zero effect. The dispute was about measurement (telephone surveys versus payroll records versus administrative data) as much as about economics. Neumark and Wascher’s later book (*Minimum Wages*, 2008) restated a negative elasticity for teenagers in the US, around $-0.1$ to $-0.2$, from a panel of state minimum wages.

**The subsequent literature** has mostly used the state-panel variation that Neumark and Wascher emphasised, with better comparison groups. Dube, Lester and Reich (2010, *Review of Economics and Statistics*) compared contiguous counties across state borders, the Card–Krueger design repeated many times, and found employment elasticities in restaurants close to zero, with clear wage effects. Cengiz, Dube, Lindner and Zipperer (2019, *Quarterly Journal of Economics*) tracked the number of jobs just below and just above the new minimum in a bunching design: jobs below the new floor disappear, jobs at and just above it appear, and there is little net loss out to a few years, for the US state increases they study (typically 10–20 per cent rises, affecting the bottom tenth of the wage distribution). Meer and West (2016, *ILR Review*) argued that employment *growth*, not the level, is where the effect shows up, and found negative effects on growth. Harasztosi and Lindner (2019, *American Economic Review*) studied a large Hungarian minimum-wage rise (about 60 per cent) and found a modest employment elasticity around $-0.2$, with substantial pass-through into prices — closer to the competitive prediction, for a much larger shock.

A fair reading, as of 2026, is this. For modest minimum-wage rises in rich countries, affecting a small share of hours, the employment elasticity for the directly affected jobs is often close to zero and rarely more negative than about $-0.2$, which is smaller than the competitive labour-demand elasticities of the previous chapter would suggest if the whole market were competitive and the floor bound a large share of hours. That does not license arbitrarily large floors. The Hungarian evidence, and the textbook logic once $\underline{w}$ is far above $w^*$, say that large rises cost jobs. Monopsony, turnover, and the fact that many estimates are of total restaurant employment rather than of hours of the lowest-paid, are the leading explanations of the small US elasticities. There is no consensus on how far a floor can be pushed before the competitive logic reasserts itself; that is a genuine, not a rhetorical, disagreement.

Outside the United States the evidence is also mixed and context-dependent. Britain’s National Minimum Wage, introduced in 1999 at a level designed to bind a small share of workers, was found by the Low Pay Commission’s early research (Stewart 2004, *Economic Journal*, among others) to have had no detectable employment loss. Subsequent rises, and the National Living Wage from 2016, have been studied with similar designs; employment effects remain small in most specifications, with some negative effects for young workers in some papers. In Indonesia, a large and binding provincial minimum wage has been associated with employment losses in the small-firm sector and not in the large-firm sector (Harrison and Scorse 2010, *American Economic Review*, on anti-sweatshop pressure, is a related design). In South Africa, Bhorat, Kanbur and Stanwix (2014, *World Bank Economic Review* and later work) find negative hours and employment effects in some covered sectors and not others. The same theory does not have to produce the same elasticity in New Jersey fast food, Hungarian manufacturing and South African domestic work.

::: remark What a small elasticity does not mean
A small employment elasticity of a minimum wage is not a proof that labour demand is inelastic, nor a proof that monopsony is everywhere. It is a statement about a particular policy increment, in a particular part of the wage distribution, over a particular horizon. Firms can adjust on other margins: prices, profits, non-wage amenities, hiring standards, and (over a longer horizon) capital and location. Allegretto, Dube, Reich and Zipperer (2017, *ILR Review*) discuss these margins; Harasztosi and Lindner (2019) document price pass-through. A complete welfare judgement also requires a view on who receives the extra wage and who pays the extra prices — a distributional question that the employment elasticity alone does not answer.
:::

::: history
The US federal minimum wage dates from the Fair Labor Standards Act of 1938. Stigler (1946, *American Economic Review*) gave the competitive and monopsony predictions a modern textbook form and was sceptical of the floor as an anti-poverty device. The Card–Krueger New Jersey study (1994) and the Neumark–Wascher reply (2000) recast the empirical method: the question became a quasi-experiment, not a national time-series regression. Alan Manning’s *Monopsony in Motion* (2003) gave the imperfect-competition account a search-theoretic foundation. The 2010s literature — Dube–Lester–Reich, Meer–West, Cengiz–Dube–Lindner–Zipperer, Harasztosi–Lindner — is a debate about identification and about how large a floor can be, not a debate about whether the competitive diagram is a useful starting point.
:::

## Where this leads

Human-capital decisions ([[labour-economics/human-capital]]) and compensating differentials ([[labour-economics/compensating-differentials]]) explain why there are many labour markets, not one, and why a single national floor binds very differently across them. Discrimination ([[labour-economics/discrimination]]) is another reason the law of one wage fails. Unions ([[labour-economics/unions-and-migration]]) set a wage floor by bargaining rather than by statute, and the same competitive-versus-monopsony diagrams apply. Search theory ([[labour-economics/search-and-unemployment]]) replaces the spot market with vacancies, applications and a bargained wage, and is the right next model once one takes Manning’s point that labour supply to the firm is not infinitely elastic.

::: summary
- Competitive equilibrium equates labour supply and labour demand ([[#def-competitive]]) and maximises surplus ([[#prop-efficiency]]). A binding floor cuts employment and creates a deadweight loss in this model.
- Payroll-tax incidence is split by elasticities, independently of which side the tax is levied on ([[#prop-incidence]]).
- A monopsonist sets $\mathrm{MRP} = \mathrm{MC}_L > w$ and hires too few people ([[#def-monopsony]]). A modest minimum wage can raise both the wage and employment ([[#prop-min-monopsony]]).
- Card and Krueger (1994) found no employment loss, and a possible gain, after New Jersey’s 1992 rise. Neumark and Wascher and others found losses, especially for teenagers. Modern border-county and bunching studies often find elasticities close to zero for modest US rises; large rises (Hungary) show clearer job loss.
- Quote the size of the increment, the group, and the country. A small elasticity for a modest floor is not a licence for an arbitrarily large one.
:::

## Exercises

::: exercise Competitive equilibrium {level=1 check="12"}
Inverse demand is $w = 24 - L$ and inverse supply is $w = L$. Find the competitive wage. (Enter $w^*$.)
::: solution
$24 - L = L$ gives $L^* = 12$ and $w^* = 12$.
:::
:::

::: exercise A binding floor {level=1 check="8"}
In the market of the previous exercise, a minimum wage of $16$ is imposed. Find employment. (Enter $L$.)
::: solution
Demand at $w = 16$ is $L = 24 - 16 = 8$. Supply is $16$. The short side is demand, so employment is $8$.
:::
:::

::: exercise Who is unemployed? {level=1}
Using the previous exercise, how large is excess supply at the floor of $16$? Why is that number not the unemployment rate?
::: solution
Supply is $16$ and demand is $8$, so excess supply is $8$. As [[#warn-excess]] notes, the official unemployment rate counts people, not hours, requires active search, and includes people whose reservation wage may lie above $16$; some of the excess supply is also desired extra hours of people already employed. The diagram’s gap is not the ILO unemployment rate.
:::
:::

::: exercise Payroll tax {level=2 check="10"}
Inverse demand is $w = 24 - L$ (this is the wage *paid* by firms) and inverse supply is $w = L$. A tax of $4$ is levied on firms, so they pay $w + 4$ while workers receive $w$. Find the wage workers receive. (Enter the net wage.)
::: solution
Firms’ inverse demand for the net wage is $w = 20 - L$. Set $20 - L = L$: $L = 10$, net wage $10$, wage paid $14$. Of the tax of $4$, $2$ falls on workers ($12$ to $10$) and $2$ on firms ($12$ to $14$), as the linear schedules have equal slopes.
:::
:::

::: exercise Monopsony markdown {level=2 check="8"}
A monopsonist faces $w = L$ and $\mathrm{MRP} = 24 - L$. Find the wage it pays. (Enter $w_m$.)
::: solution
$\mathrm{MC}_L = 2L$ (because $wL = L^2$). Set $2L = 24 - L$: $3L = 24$, $L_m = 8$, $w_m = 8$. The competitive wage was $12$, so the markdown is $4$.
:::
:::

::: exercise A floor under monopsony {level=2}
In the previous exercise, a minimum wage of $10$ is imposed. What happens to employment, and why does this not contradict [[#prop-efficiency]]?
::: solution
$w_m = 8 < 10 < 12 = w^*$, so [[#prop-min-monopsony]] applies. Supply at $10$ is $L = 10$. MRP at $L = 10$ is $14 > 10$, so the firm hires the $10$ hours supplied. Employment rises from $8$ to $10$. [[#prop-efficiency]] assumed a competitive market; under monopsony the unregulated outcome is already inefficient, and a well-chosen floor can move employment toward $L^*$.
:::
:::

::: exercise Card and Krueger {level=3}
State the Card–Krueger (1994) design in one paragraph: the policy change, the treatment and comparison groups, the outcome, and the headline result. Then give one reason a critic (for example Neumark and Wascher) might not accept the result as a general finding about minimum wages.
::: solution
New Jersey raised its minimum from \$4.25 to \$5.05 on 1 April 1992; Pennsylvania did not. Card and Krueger surveyed fast-food restaurants on both sides of the border before and after, and compared the change in full-time-equivalent employment. They found a relative *rise* in New Jersey of about $2.5$ workers per store, not the fall the old elasticities predicted. A critic can argue that the telephone survey measured employment noisily (payroll records in Neumark and Wascher 2000 went the other way); that fast food in two north-eastern states in a recession is not the US labour market; that the horizon (about eight months) is too short for capital to adjust; or that later state-panel work finds negative effects for teenagers. Any one of these is enough to refuse a generalisation; none of them makes the New Jersey finding disappear as a finding about that market at that increment.
:::
:::

::: exercise Deadweight loss {level=3 check="16"}
Inverse demand is $w = 24 - L$ and inverse supply is $w = L$. A floor of $16$ is imposed. Compute the deadweight loss. (Enter the DWL.)
::: hint
Competitive $L^*$ is $12$; employment under the floor is $8$. Integrate demand minus supply from $8$ to $12$.
:::
::: solution
Demand minus supply is $(24 - L) - L = 24 - 2L$. Then

$$
\int_8^{12} (24 - 2L)\,\mathrm{d}L = \bigl[24L - L^2\bigr]_8^{12} = (288 - 144) - (192 - 64) = 16.
$$

Geometrically this is a triangle of base $4$ and height $8$ (the demand–supply gap at $L = 8$).
:::
:::

::: exercise Reading a study {level=3}
Harasztosi and Lindner (2019) study a Hungarian minimum-wage rise of about $60$ per cent and find an employment elasticity around $-0.2$ with substantial price pass-through. In two or three sentences, place this finding relative to Card–Krueger (1994) and to [[#prop-efficiency]]. Does it decide the US debate?
::: solution
A $60$ per cent rise is far larger than New Jersey’s $19$ per cent, and it bound a much larger share of Hungarian jobs. A negative elasticity of $-0.2$ is the competitive qualitative prediction ([[#prop-efficiency]]) at a modest quantitative size; the price pass-through is the scale effect of [[labour-economics/labour-demand]]. It does not decide the US debate about *modest* state increases, because the increment, the bite and the market structure differ. It does support the claim, which Card and Krueger never denied, that a large enough floor costs jobs.
:::
:::
