Two households, the same competitive prices, two very different consumption bundles: that is a distribution of income, and it can be Pareto efficient. Whether it is *acceptable* is a question the first welfare theorem does not ask. Every high-income country, and most middle-income countries, runs a tax-and-transfer system that moves purchasing power from richer to poorer households, in cash or in kind. This chapter is about how to measure the starting inequality, how cash and in-kind transfers differ, and how means tests create implicit taxes on work and on saving. The numbers are illustrative unless a source is given; nothing here is personal financial advice.

The link to [[public-economics/social-insurance]] is close. A transfer that you receive if you are poor is insurance against the risk of being poor, viewed from behind a veil of ignorance. Once types are known, the same transfer is redistribution, and the incentive constraints are the Mirrlees constraints of [[public-economics/optimal-taxation]]. We treat measurement and the structure of programmes here; we leave the full optimal-tax calculus for that later chapter.

## Measuring inequality and poverty

::: definition Lorenz curve and Gini coefficient {#def-gini}
Order $n$ households by income $y_1 \le \cdots \le y_n$. The **Lorenz curve** $L(p)$ is the share of total income held by the poorest fraction $p$ of households. The **Gini coefficient** is $G = 1 - 2\int_0^1 L(p)\,dp$, twice the area between the diagonal of equality and the Lorenz curve. $G=0$ is complete equality; $G=1$ is complete concentration of income in one household (in the large-$n$ limit).
:::

For a discrete sample an equivalent formula is

$$
G = \frac{2\sum_{i=1}^n i\, y_i}{n\sum_{i=1}^n y_i} - \frac{n+1}{n},
$$

with the $y_i$ already sorted ascending. The Gini is a relative measure: doubling every income leaves $G$ unchanged. It is more sensitive to the middle of the distribution than to the tails, which is why top-income shares (Piketty, Atkinson, Saez and the World Inequality Database) and percentile ratios ($p90/p10$) are reported alongside it.

::: example Four incomes {#ex-gini-four}
Incomes $10, 20, 30, 40$. Compute Lorenz points and the Gini.
::: solution
Total $100$. Cumulative shares: $0.10$, $0.30$, $0.60$, $1.00$ at population shares $0.25$, $0.50$, $0.75$, $1$. Trapezoid area under Lorenz:

$$
0.25\times\bigl(\tfrac{0+0.10}{2} + \tfrac{0.10+0.30}{2} + \tfrac{0.30+0.60}{2} + \tfrac{0.60+1}{2}\bigr) = 0.25\times(0.05+0.20+0.45+0.80)=0.375.
$$

$G=1-2\times 0.375=0.25$. The summation formula: $2(1\cdot 10+2\cdot 20+3\cdot 30+4\cdot 40)/(4\cdot 100) - 5/4 = 2\cdot 300/400 - 1.25 = 1.5-1.25=0.25$.
:::
:::

::: widget plot
f: x; x^2; x^0.7
x: 0, 1
y: 0, 1
labels: \text{equality}; \text{more unequal Lorenz}; \text{less unequal Lorenz}
caption: Illustrative Lorenz curves. The diagonal is equality. The bowed curve $y=x^2$ has Gini $1-2\int_0^1 x^2\,dx = 1-2/3=1/3$. The curve $y=x^{0.7}$ is closer to the diagonal (Gini $1-2/1.7\approx 0.176$). These are parametric illustrations, not fitted country data.
:::

Poverty is a different object: a count or a gap below a **poverty line**. The World Bank's extreme-poverty line was USD 2.15 a day in 2017 purchasing-power-parity dollars (World Bank, *Poverty and Shared Prosperity 2022*); national lines are higher in richer countries. The **headcount** $P_0$ is the share below the line; the **poverty gap** $P_1$ is the mean shortfall as a share of the line, counting zeros above the line. A transfer that lifts people from just below to just above the line can cut $P_0$ a lot and $P_1$ a little; a transfer to the very poorest does the reverse. Sen's (1976) poverty index and the Foster–Greer–Thorbecke (1984) family $P_\alpha$ make that sensitivity explicit.

::: example Poverty gap {#ex-poverty-gap}
Poverty line $10$. Incomes $3, 8, 12, 20$. Compute the headcount $P_0$ and the poverty gap $P_1$.
::: solution
Two of four are poor, so $P_0=1/2$. Shortfalls $7$ and $2$; $P_1=(7+2+0+0)/(4\times 10)=9/40=0.225$. A transfer of $2$ to the person at $8$ would cut $P_0$ to $1/4$ and $P_1$ to $7/40$. A transfer of $2$ to the person at $3$ would leave $P_0$ unchanged and cut $P_1$ to $7/40$ as well — same gap, different headcount. That is why $P_0$ alone is a poor target.
:::
:::

::: warning Inequality is not poverty, and market income is not disposable income
A country can have high Gini of *market* income (before taxes and transfers) and a much lower Gini of *disposable* income. OECD data routinely show that the tax-and-transfer system in France or Germany cuts the working-age Gini by more than in the United States (OECD Income Distribution Database, various years). Comparing "inequality" across countries without specifying the income concept is the most common measurement error in this field. Wealth inequality is another object again, and is typically higher than income inequality (World Inequality Database).
:::

Stylised facts, with sources rather than as theorems. The World Inequality Database (WID.world, accessed 2026) reports that the global top 1 per cent income share, after falling through the mid-twentieth century in many Western countries, rose from the 1980s in the United States, the United Kingdom and several others, with a smaller rise in continental Europe. Within-country inequality in China and India rose during their growth accelerations (WID and national statistical offices). Latin American Ginis remain high by OECD standards but fell in several countries in the 2000s (World Bank WDI; Lustig, Lopez-Calva and Ortiz-Juarez 2013). Sub-Saharan African poverty headcounts remain far above East Asian ones at the World Bank extreme line (World Bank PSPR 2022). None of these sentences is a claim about what $W$ says should happen next.

## Why redistribute? Motives that are not the same

Three motives are routinely mixed and should not be.

**Insurance.** Behind the veil, inequality of realised income is a risk. Redistribution is the claim on the pool. This is the Vickrey–Harsanyi–Mirrlees argument, and it needs no interpersonal comparison beyond expected utility with a concave $u$.

**Equity.** Even with no risk, a concave social welfare function $W=\sum_i u(c_i)$ values a dollar more in a poorer person's hands ([[public-economics/role-of-government#prop-utilitarian]]). This *does* need interpersonal comparison. Rawlsian maximin is the extreme: only the worst-off utility counts.

**Externalities of poverty.** Crime, political instability, and some public-health spillovers are sometimes cited as efficiency reasons for transfers. They are technological externalities if they are real; they are not a licence to skip the evidence. They also do not, by themselves, tell you whether cash, police or vaccines are the right instrument.

A fourth, paternalistic motive — that the planner values the recipient's food more than the recipient does — is the traditional argument for **in-kind** transfers. It is a restriction on the recipient's sovereignty and should be labelled.

::: definition Cash versus in-kind {#def-cash-kind}
A **cash transfer** adds a lump sum (or a schedule $T(y)$) to the budget and leaves relative prices unchanged, except through income effects. An **in-kind transfer** gives a quantity of a good (food, housing, health care, schooling), sometimes with a ban on resale. Under standard preferences, cash weakly dominates in-kind for the *recipient's* utility: the in-kind bundle is in the choice set of a cash transfer of equal cost, and is the unique choice only if the recipient would have bought at least that quantity anyway (the transfer is inframarginal).
:::

::: proposition Cash dominates in-kind for the recipient {#prop-cash}
If the recipient has locally non-satiated preferences, resale is impossible, and the in-kind quantity of good 1 exceeds what they would buy given an equivalent cash grant, then the recipient is strictly worse off with in-kind than with cash of the same budgetary cost. If the quantity is inframarginal, the two are equivalent.
:::
::: proof
Let $m$ be income and $p$ prices. Cash $G$ yields the ordinary Marshallian bundle $x(p, m+G)$. In-kind $q_1$ of good 1, with the remaining cash $m$ and no resale, constrains $x_1 \ge q_1$. If $x_1(p,m+G) \ge q_1$ and $p_1 q_1 = G$, the constraint does not bind and the choices coincide. If $x_1(p,m+G) < q_1$, the in-kind bundle is not the Marshallian choice, so by revealed preference it is strictly worse.
:::

Why, then, in-kind programmes? Paternalism (the planner's $W$ puts extra weight on food or children's consumption); targeting (a school meal is taken up by families with children, a disability aid by the disabled — tagging, as in [[public-economics/social-insurance]]); political economy (voters support "food for children" more than cash; in-kind benefits are harder for the recipient to divert); and market failures in the good itself (health insurance as in the previous chapter; education with credit constraints and externalities). Each reason is specific. The "cash is best" theorem is a theorem about the recipient's own $u$, not about $W$ and not about politics.

::: example A food stamp that binds {#ex-food-stamp}
A household has $u=x_1 x_2$, prices $p=(1,1)$ and cash income $m=10$. Compare a cash grant of $16$ with an in-kind grant of $16$ units of good 1 (no resale). The household keeps its original $m=10$ in both cases.
::: solution
Cash: total resources $26$, so $x_1=x_2=13$ and $u=169$. In-kind: $x_1 \ge 16$ and $x_1+x_2=26$, hence the constrained choice is $(16,10)$ with $u=160$. The Marshallian quantity of good 1 is $13<16$, so the constraint binds. The gap $169-160$ is the loss to the recipient of being forced off the unconstrained bundle. An in-kind grant of only $8$ units would not bind, because $13\ge 8$, and would then be equivalent to cash of $8$.
:::
:::

## Means tests, notches and implicit tax rates

A transfer that falls as earnings rise is a **means-tested** transfer. It targets the poor — a fiscal saving relative to a universal payment — and it puts a wedge on labour supply.

::: definition Implicit marginal tax rate {#def-imtr}
If a household with earnings $y$ receives net transfer $B(y)$ and pays tax $T(y)$, disposable income is $c=y-T(y)+B(y)$. The **implicit marginal tax rate** (IMTR, or effective marginal tax rate) is

$$
\tau(y) = 1 - \frac{\mathrm{d}c}{\mathrm{d}y} = T'(y) - B'(y).
$$

When $B$ falls with $y$, $-B'>0$ *adds* to the statutory income-tax rate. A **notch** is a discrete drop in $B$ at a threshold; a **kink** is a jump in $\tau(y)$ without a jump in $B$.
:::

A 100 per cent IMTR — every extra unit of earnings is lost in withdrawn benefit — is a **poverty trap** in the old language: work does not raise $c$. Modern systems rarely have true 100 per cent rates over long ranges, but stacking of programmes (income tax, national insurance, housing benefit, child benefit, local taxes) can push combined IMTRs above 50 per cent for some household types in the United Kingdom, the United States and France (OECD *Taxing Wages*; national treasuries' IMTR charts, dated by year). High IMTRs are a positive fact about the schedule; whether they are too high is a $W$-and-elasticity question for [[public-economics/optimal-taxation]].

::: widget plot
f: 10 + 0.4*x; x
x: 0, 30
y: 0, 32
labels: \text{illustrative disposable income with a 0.6 IMTR}; \text{no tax or transfer}
caption: Schematic taper: a benefit of $10$ is withdrawn at rate $0.6$ against earnings (equivalently, disposable income has slope $0.4=1-\tau$). The two lines meet at $x=25$, where the benefit is exhausted. Compare the slopes. A notch would be a vertical drop in the upper line; a kink would be a change of slope without a drop. Numbers are illustrative, not a national tax code.
:::

::: example A taper {#ex-taper}
A benefit of $12$ is withdrawn at $0.4$ per extra unit of earnings; statutory income tax is a flat $0.2$. Compute the IMTR while the benefit is positive, and the earnings at which the benefit hits zero.
::: solution
$B'(y)=-0.4$, $T'(y)=0.2$, so $\tau=0.2-(-0.4)=0.6$. $B=12-0.4y=0$ at $y=30$. Over $y\in[0,30]$ an extra unit of work raises consumption by $0.4$, not by $0.8$ (the after-statutory-tax amount).
:::
:::

Labour-supply responses to transfers are the same object as labour-supply responses to taxes: an income effect (being richer, you "buy" leisure if leisure is normal) and a substitution effect (the IMTR lowers the price of leisure). For a means-tested benefit, both effects can reduce work. For a **universal basic income** (a lump-sum $B$ with $B'=0$), only the income effect remains; the substitution effect is that of the taxes that finance it. Empirical magnitudes belong with the EITC and labour-supply literature: Eissa and Liebman (1996), Meyer and Rosenbaum (2001), Chetty, Friedman and Saez (2013) on the US Earned Income Tax Credit, which is a *negative* IMTR (a subsidy) on the phase-in range and a positive IMTR on the phase-out. The EITC increased single mothers' labour-force participation in the 1990s expansions; intensive-margin bunching at kinks is smaller than a frictionless model predicts (Chetty, Friedman, Olsen and Pistaferri 2011).

::: quiz
A universal lump-sum transfer financed by a proportional tax on earnings, in a world of identical households,
- [ ] has no efficiency cost, because everyone gets the money back
- [x] has an efficiency cost equal to the deadweight loss of the tax, because the transfer is lump-sum but the tax is not
- [ ] has an IMTR of zero
- [ ] is in-kind, hence dominated by cash
::: solution
Identical households get back what they pay on average, but at the *margin* the tax still wedges labour supply: $T'>0=B'$, so $\tau=T'$. The first welfare theorem is broken by the distorting tax, not restored by recycling the revenue as a lump sum — that recycling is already in the model of [[public-economics/efficiency-costs-of-taxation]]. The IMTR is the tax rate, not zero. The transfer is cash.
:::
:::

## Universal versus targeted, and in-kind in practice

Targeting saves money per unit of poverty reduction if the administrative cost of identifying the poor is small and if IMTRs do not destroy too much of the pie. Universal benefits (a child benefit paid for every child, a basic pension) have the opposite profile: higher fiscal cost, lower IMTR, lower stigma, higher take-up. Take-up of means-tested benefits is often far from 100 per cent: UK estimates for some housing and council-tax benefits have been in the 70–90 per cent range depending on the year and programme (UK DWP take-up statistics); US SNAP take-up among eligibles has been around 80 per cent in recent USDA reports, lower for some subgroups. Stigma, complexity and transaction costs are the usual explanations (Currie 2006).

In-kind programmes that are large in the data include SNAP (food) and Medicaid (health) in the United States, school meals in India (the Midday Meal Scheme), Bolsa Família / Auxílio Brasil (mostly cash, with conditionalities) in Brazil, and housing subsidies in many European countries. Conditional cash transfers (Progresa/Oportunidades/Prospera in Mexico, evaluated by Schultz 2004 and Behrman, Sengupta and Todd; Bolsa Família) pay cash but condition on school attendance and health-clinic visits — a hybrid that uses cash for the recipient's $u$ and a condition for the planner's extra weight on children. The Mexican Progresa randomised evaluation found substantial increases in schooling; that is evidence for the conditionality-plus-cash package, not a theorem that conditions always dominate unconditional cash. Haushofer and Shapiro (2016, 2018) on GiveDirectly in Kenya found large short-run consumption effects of unconditional cash, with debate about spillovers and durability.

::: application South Africa's grants and Brazil's Bolsa
South Africa's system of old-age pensions and child-support grants is unusually large for an upper-middle-income country (National Treasury budget data; Case and Deaton 1998 on the pension). Brazil's Bolsa Família, launched in 2003, reached tens of millions of people at a cost of a fraction of a per cent of GDP (Ministry of Social Development; Soares, Ribas and Osório 2010). Both are mostly cash; both are targeted; both have been studied for labour-supply and poverty effects. The positive finding across a number of studies is that poverty gaps fell and that average labour-supply effects were small relative to the fears of a 1970s "poverty trap" debate. Small average effects are compatible with large effects at particular IMTRs and household types.
:::

## Evidence

- **Ginis and income concepts.** OECD Income Distribution Database: disposable-income Ginis in the late 2010s were around $0.29$–$0.32$ in France and Germany, around $0.39$ in the United States, around $0.33$ in the United Kingdom, and higher in some Latin American OECD members (Chile, Mexico), with dates and exact figures varying by wave. Always check whether the series is household-equivalised disposable income.
- **Top shares.** WID.world: US pre-tax top 1 per cent income share around 19 per cent in the 2010s, against around 10–12 per cent in the 1970s (Piketty, Saez and Zucman 2018, *Quarterly Journal of Economics*, and updates). France's top 1 per cent rose less. These are estimates with methodological disputes (including how to allocate untaxed capital income).
- **EITC and labour supply.** Survey: Nichols and Rothstein (2015, *Handbook of Labor Economics*). Extensive-margin responses of single mothers are the most robust positive finding.
- **CCTs.** Fiszbein and Schady (2009, World Bank) summarise first-generation CCT evaluations: higher school attendance, mixed learning-outcome effects, lower poverty.
- **Unconditional cash.** GiveDirectly (Haushofer and Shapiro 2016, *QJE*): large consumption response in rural Kenya; later work debates village-level price and spillover effects (e.g. Egger, Haushofer, Miguel, Niehaus and Walker 2022, *Econometrica*).

::: history
Pigou's *Economics of Welfare* (1920) already treated transfers as a distribution-branch instrument limited by incentive and information. James Tobin (1970) and Milton Friedman (1962, *Capitalism and Freedom*) advocated a negative income tax — a cash, means-tested transfer with a single taper — as a replacement for a patchwork of in-kind programmes; the US negative-income-tax experiments of the 1960s–70s (New Jersey, Seattle–Denver) were the first large randomised evaluations in public economics and found labour-supply reductions, with debate over magnitudes (Robins 1985). Anthony Atkinson spent a career on the measurement of inequality (Atkinson 1970: the Atkinson index). The modern empirical literature on the EITC, CCTs and cash grants is a product of the 1990s–2010s identification revolution.
:::

## Where this leads

The incentive effects of $T'(y)-B'(y)$ are quantified as deadweight loss in [[public-economics/efficiency-costs-of-taxation]] and optimised in [[public-economics/optimal-taxation]]. Incidence of the taxes that finance transfers is [[public-economics/tax-incidence]]. Public choice ([[public-economics/public-choice]]) asks why in-kind programmes and tax expenditures survive when a textbook planner would cash them out. Labour economics ([[labour-economics/labour-supply]], [[labour-economics/wage-inequality]]) is the other half of the labour-supply evidence.

::: summary
- The Lorenz curve and Gini ([[#def-gini]]) measure relative inequality of a specified income concept. Poverty indexes measure shortfalls below a line. Market versus disposable income is the first specification question.
- Motives for redistribution — insurance, equity, externalities, paternalism — are not interchangeable and imply different instruments.
- Cash weakly dominates in-kind for the recipient's own utility ([[#prop-cash]]). In-kind survives because of paternalism, tagging, politics and market failure in the good.
- Means tests raise implicit marginal tax rates ([[#def-imtr]]); notches can make disposable income fall as earnings rise. Universal benefits reverse the targeting–incentive trade-off.
- Evidence: tax-and-transfer systems cut Ginis by different amounts across OECD countries; the EITC raises participation; CCTs raise attendance; unconditional cash raises consumption in the studied Kenyan villages.
:::

## Exercises

::: exercise Gini of five {level=1 check="0.4"}
Incomes $1,2,3,4,10$. Compute the Gini using the summation formula. (Enter $G$ as a decimal, e.g. 0.4.)
::: solution
$n=5$, $\sum y=20$, $\sum i y_i = 1\cdot1+2\cdot2+3\cdot3+4\cdot4+5\cdot10=1+4+9+16+50=80$. $G=2\cdot 80/(5\cdot 20) - 6/5 = 160/100 - 1.2 = 1.6-1.2=0.4$.
:::
:::

::: exercise Lorenz reading {level=1}
On a Lorenz curve, $L(0.8)=0.5$. What does that sentence say, and is this distribution more or less equal than one with $L(0.8)=0.7$?
::: solution
The poorest 80 per cent of households receive 50 per cent of income (so the top 20 per cent receive the other 50 per cent). $L(0.8)=0.7$ is closer to the diagonal $L(p)=p$, hence less unequal on this particular ordinate. (A full ranking needs the whole curve or a Gini; Lorenz curves can cross.)
:::
:::

::: exercise Headcount versus gap {level=1}
A poverty line of $10$. Three incomes: $4, 9, 20$. Compute $P_0$ and $P_1$.
::: solution
Two of three are poor, $P_0=2/3$. Shortfalls $6$ and $1$, mean shortfall relative to the line $(6+1+0)/(3\cdot 10)=7/30$. So $P_1=7/30$. Moving the $9$ to $11$ would cut $P_0$ to $1/3$ and $P_1$ to $6/30=1/5$.
:::
:::

::: exercise Cash versus stamps {level=2}
$u=x_1 x_2$, $p=(1,1)$, $m=8$. Compare $u$ under cash of $8$ with $u$ under $8$ units of good 1 and no extra cash (original $m=8$ remains as cash). Does the constraint bind?
::: solution
Total resources $16$ in both cases. Cash: $(8,8)$, $u=64$. In-kind: $x_1\ge 8$ and $x_1+x_2=16$; Marshallian is $(8,8)$, so the constraint does not bind. Equivalent. (It would bind if the in-kind quantity exceeded $8$.)
:::
:::

::: exercise IMTR arithmetic {level=2 check="0.7"}
Statutory tax rate $0.25$, benefit withdrawal $0.45$ per extra unit of earnings. What is the IMTR? (Enter the rate as a decimal.)
::: solution
$\tau=0.25-(-0.45)=0.70$.
:::
:::

::: exercise A notch {level=2}
A benefit of $6$ is paid if and only if earnings $y\le 10$, and there is no statutory tax. For which $y>10$ is the household worse off than at $y=10$? Sketch the implication for bunching.
::: solution
At $y=10$, $c=16$. For $y>10$, $c=y$. So $c<16$ whenever $10<y<16$. Households who would have earned in $(10,16)$ in a frictionless model have an incentive to reduce earnings to $10$ (bunching from the right). Above $16$ the notch is inframarginal. Kleven and Waseem (2013) document such bunching at notches in Pakistani tax data; frictions reduce the bunch relative to the frictionless prediction.
:::
:::

::: exercise Income and substitution {level=3}
A universal basic income of $B$, financed by a proportional tax $\tau$ on earnings, is introduced in an economy of heterogeneous households. For a household whose earnings are unchanged in equilibrium, decompose the change in labour supply into income and substitution effects. Who is "financing" the UBI in this household's accounts?
::: hint
The budget is $c=(1-\tau)wh + B$. Compare with the slope and intercept before the reform.
:::
::: solution
The substitution effect of $\tau$ (a lower net wage) reduces labour supply if leisure is a normal good in the usual two-good model. The income effect of $B- \tau \cdot (wh)$ depends on whether the household is a net recipient. If earnings are unchanged *and* $B=\tau wh$, the household is a net zero in cash terms: the income effect is zero at that point and only substitution remains, which reduces hours. Households with $wh < B/\tau$ are net recipients (positive income effect, further reducing hours if leisure is normal); those with $wh > B/\tau$ are net payers (negative income effect, which raises hours and offsets substitution). Financing is by the net payers. Identical households would all be net zero and all would reduce hours through substitution only.
:::
:::

::: exercise Why in-kind health care {level=3}
Using [[#prop-cash]] and the previous chapter, give two reasons a planner might still provide health *insurance* rather than the cash equivalent of the expected claims.
::: solution
(1) Adverse selection and moral hazard: a cash grant does not complete the insurance market; the good being provided is the *contract*, which private markets may not offer efficiently ([[public-economics/social-insurance#prop-rs]]). (2) Paternalism or externalities: the planner may value treatment of contagious disease, or of children, above the adult recipient's $u$. Tagging is a third: insurance take-up screens for people who expect to use care. None of these reasons is a general dominance of in-kind over cash for food in a well-functioning food market.
:::
:::

::: exercise Atkinson index {level=3}
The Atkinson index with inequality aversion $\varepsilon$ is $A_\varepsilon = 1 - y_{\mathrm{ede}}/\bar y$, where the equally-distributed equivalent $y_{\mathrm{ede}}$ satisfies $n\, u(y_{\mathrm{ede}})=\sum u(y_i)$ and $u(y)=y^{1-\varepsilon}/(1-\varepsilon)$ for $\varepsilon\neq 1$. For $\varepsilon=0$, what is $A_0$? For $\varepsilon\to\infty$, what does $y_{\mathrm{ede}}$ approach?
::: solution
$\varepsilon=0$ makes $u$ linear, so $y_{\mathrm{ede}}=\bar y$ and $A_0=0$: the criterion is utilitarian in incomes and ignores inequality. As $\varepsilon\to\infty$, $u$ becomes Rawlsian and $y_{\mathrm{ede}}\to \min_i y_i$, so $A_\infty = 1-(\min y)/\bar y$. The Atkinson family makes the ethical parameter explicit; the Gini does not.
:::
:::

::: exercise Targeting and take-up {level=2}
A means-tested benefit has 70 per cent take-up among eligibles and zero leakage to ineligibles. A universal benefit has 100 per cent take-up and pays the same amount to everyone, including the rich. In one paragraph, state the trade-off a planner with a fixed budget faces, including IMTRs.
::: solution
For a fixed budget, means-testing concentrates payments on the poor (good for poverty reduction per dollar) but loses 30 per cent of eligibles (take-up) and imposes IMTRs as $B$ is withdrawn (incentive cost). Universality wastes some of the budget on the rich, has no withdrawal IMTR on the benefit itself (the IMTR is only the tax that finances it), and reaches everyone. The planner's ranking depends on $W$, on the labour-supply elasticity, on the cost of raising take-up, and on political support. There is no theorem that targeting always dominates.
:::
:::
