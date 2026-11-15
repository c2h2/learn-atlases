A hospital offers a nurse extra weekend shifts at time-and-a-half. Taking them raises her monthly pay, but it uses the hours she would otherwise spend with her children. A second person, currently out of the labour force, is offered a similar contract: the question for her is not how many hours, but whether to take any paid work at all. Those two decisions — hours, and participation — are the subject of labour supply. They look like ordinary consumer theory, and they are, once we treat leisure as a good and the wage as its relative price. The economics becomes interesting because the wage is both a price and an income, because many people are at a corner with zero hours, and because the elasticities that come out of the model are among the most disputed numbers in public finance.

In 2023 the global unemployment rate was 5.1 per cent (ILO, *World Employment and Social Outlook: Trends 2024*). That figure describes people who want work and do not have it. Labour supply is the other side of the same accounting: how many people want work, and for how many hours, at the wages on offer. Female labour-force participation among 15–64 year-olds was about 53 per cent globally in 2023 against 80 per cent for men (ILO modelled estimates, World Bank WDI, accessed 2026); in Sweden the female rate exceeded 80 per cent, in Italy it was near 57 per cent, in India near 33 per cent (OECD and World Bank, 2023). Those gaps are not a footnote. They are the extensive margin of labour supply, and in many countries they have moved more, over decades, than hours among those already employed.

This chapter takes the labour–leisure model of [[microeconomics/labour-and-intertemporal-choice]] as given and puts it to work: income and substitution effects of a wage change, the reservation wage that governs participation, the distinction between hours and participation elasticities, and the life-cycle version of the same problem. The last section reports what the estimates actually are, and why they disagree.

## The labour–leisure model

A person has a period of time $T$ (say 16 waking hours in a day, or 5,840 hours in a year) to split between **hours of work** $h$ and **leisure** $\ell$, with $h + \ell = T$. Leisure is any time not sold on the labour market: rest, unpaid care, study, commuting that is not paid. Consumption of goods $c$ is the numeraire. Preferences are represented by a utility function $u(c, \ell)$ that is strictly increasing and strictly quasiconcave in both arguments. Non-labour income $y$ (a partner’s earnings, asset income, a transfer) is taken as given. The real wage per hour is $w$. There is no saving in this static model, so the budget is

$$
c = w h + y = w(T - \ell) + y,
$$ {#eq-budget}

or, equivalently, $c + w\ell = wT + y$. The right-hand side is **full income**: what the person could spend if she sold every available hour at $w$ and added $y$.

::: definition Full income and the price of leisure {#def-full-income}
**Full income** is $m = wT + y$. Leisure has relative price $w$: each extra hour of leisure costs one hour of earnings. The budget set in $(c, \ell)$-space is the line $c + w\ell = m$ with $\ell \le T$ (one cannot sell more hours than one has) and $c \ge 0$. The intercepts are $c = m$ (all time at work) and $\ell = T + y/w$ if $y$ can buy leisure, truncated at $\ell = T$ when $y \ge 0$ because time cannot exceed $T$.
:::

The truncation at $\ell = T$ is the **non-participation** corner: the person takes $h = 0$, consumes $c = y$, and enjoys $\ell = T$. We return to it below. For an interior choice, the usual tangency applies.

::: proposition Interior labour supply {#prop-interior}
If $u$ is differentiable and strictly quasiconcave and the solution is interior ($0 < h < T$), hours satisfy

$$
\frac{u_\ell(c, \ell)}{u_c(c, \ell)} = w, \qquad c = w h + y, \qquad h + \ell = T.
$$ {#eq-mrs}

That is, the marginal rate of substitution between leisure and consumption equals the real wage. Assumptions: a single period, a linear budget (no overtime premia, no hours constraints, no taxes), and no disutility of work other than the forgone leisure.
:::

::: proof
Substitute $c = w(T - \ell) + y$ into $u$ and differentiate with respect to $\ell$:

$$
\frac{\mathrm{d}u}{\mathrm{d}\ell} = -w\, u_c + u_\ell.
$$

An interior optimum requires this derivative to be zero, which is [[#eq-mrs]]. The second-order condition is the usual quasiconcavity restriction, equivalent to a diminishing MRS.
:::

The same first-order condition can be written as $u_c \cdot w = u_\ell$: the utility of the consumption bought with an extra hour of work equals the utility of that hour as leisure. If a tax $\tau$ is levied on labour earnings, the slope of the budget becomes $w(1 - \tau)$ and the condition is $\mathrm{MRS} = w(1 - \tau)$. Overtime premia, means-tested transfers that are withdrawn with earnings, and childcare costs all kink or shift the budget; the first-order condition then holds only on the differentiable segments, and the person may bunch at a kink.

::: example Cobb–Douglas hours {#ex-cd}
Let $u(c, \ell) = c^{\alpha}\ell^{1-\alpha}$ with $\alpha = 0.6$, $T = 16$ hours, $y = 20$ and $w = 10$ (units of money per hour). Find interior hours, leisure and consumption, and verify [[#eq-mrs]].
::: solution
For Cobb–Douglas the consumer spends a share $\alpha$ of full income on consumption and $1-\alpha$ on leisure. Full income is $m = 10 \times 16 + 20 = 180$, so $c = 0.6 \times 180 = 108$ and $w\ell = 0.4 \times 180 = 72$, hence $\ell = 7.2$ and $h = 16 - 7.2 = 8.8$. Directly from the share rule,

$$
h = \alpha T - (1-\alpha)\frac{y}{w} = 0.6\times 16 - 0.4\times\frac{20}{10} = 9.6 - 0.8 = 8.8.
$$ {#eq-cd-hours}

The MRS is $\dfrac{1-\alpha}{\alpha}\cdot\dfrac{c}{\ell} = \dfrac{0.4}{0.6}\cdot\dfrac{108}{7.2} = 10$, which equals $w$.
:::
:::

When $y = 0$, [[#eq-cd-hours]] collapses to $h = \alpha T$, independent of $w$. A wage increase makes leisure more expensive (the substitution effect, which raises hours) and makes the person richer (the income effect, which raises leisure if leisure is normal). For Cobb–Douglas with no non-labour income the two effects cancel for hours. That is a special case, not a prediction about the world.

The figure draws the budget and two indifference curves in (leisure, consumption) space. Raise the wage with the slider: the budget pivots around the endowment point $(T, y)$. Raise non-labour income: the budget shifts up in a parallel way.

::: widget plot
f: w*(16-x)+y; 36/x; 64/x
x: 0.5, 16
y: 0, 80
sliders: w=4:1:12:0.5; y=8:0:40:1
labels: \text{budget}; u=6; u=8
caption: Horizontal axis is leisure (hours), vertical axis is consumption. The budget is $c = w(16-\ell)+y$. Indifference curves $c = \bar u^2/\ell$ belong to $u=\sqrt{c\ell}$. Raise $w$: the budget pivots through $(16, y)$ and becomes steeper. Raise $y$: it shifts up, parallel. The tangency moves; hours are $16$ minus the leisure at the tangency (or at the corner $\ell=16$ if that is best).
:::

::: intuition The wage is a price and an income
In ordinary consumer theory a price change has an income effect, but the income effect of a 1 per cent rise in the price of apples is tiny because apples are a small share of the budget. Leisure is not a small share: its implicit expenditure $w\ell$ is a large fraction of full income. That is why labour-supply income effects are first-order, and why the slope of the labour-supply curve is an empirical question rather than a theoretical one.
:::

## Income and substitution effects

Start from an interior bundle $(c, \ell)$ at wage $w$ and non-labour income $y$. A small increase $\mathrm{d}w$ has two consequences. Leisure becomes dearer relative to consumption, so the person substitutes away from leisure (the **substitution effect**, which raises $h$). Full income rises by $T\,\mathrm{d}w$ plus the extra earnings on the hours already supplied, so the person is richer; if leisure is a normal good she takes more of it (the **income effect**, which lowers $h$). The Slutsky equation for labour supply records the split. It is the ordinary Slutsky equation of [[microeconomics/slutsky-and-welfare]], rewritten for a good that the consumer *sells*.

::: proposition Slutsky equation for hours {#prop-slutsky}
Let $h(w, y)$ be Marshallian hours and $h^c(w, u)$ the Hicksian (compensated) hours that deliver utility $u$ at wage $w$. Then

$$
\frac{\partial h}{\partial w} = \frac{\partial h^c}{\partial w} + h\,\frac{\partial h}{\partial y}.
$$ {#eq-slutsky}

The first term on the right is the substitution effect and is positive. The second is the income effect; it is negative if leisure is normal ($\partial h/\partial y < 0$). The uncompensated (Marshallian) slope $\partial h/\partial w$ has ambiguous sign.
:::

::: proof
Full income is $m = wT + y$, and Marshallian leisure $\ell(w, m)$ obeys the ordinary Slutsky equation $\partial \ell/\partial w = \partial \ell^c/\partial w - \ell\,\partial \ell/\partial m$. Because $h = T - \ell$ and $\partial/\partial y = \partial/\partial m$, we have $\partial h/\partial w = -\partial \ell/\partial w$ only if $m$ is held fixed — but a change in $w$ also changes $m$ by $T$. Accounting for that, and using $h = T - \ell$ together with the identity that compensated leisure satisfies $\partial \ell^c/\partial w = \partial \ell/\partial w + \ell\,\partial \ell/\partial m$, one obtains [[#eq-slutsky]]. (The same algebra is done at length in [[microeconomics/labour-and-intertemporal-choice]].) The substitution term $\partial h^c/\partial w > 0$ because a compensated rise in the price of leisure reduces leisure.
:::

If the substitution effect dominates, a higher wage raises hours: the labour-supply curve slopes up. If the income effect dominates, hours fall: the curve **bends backwards**. Both shapes are compatible with the theory. A textbook picture often draws a curve that slopes up at low wages, when subsistence pressure makes the substitution effect large, and bends back at high wages, when people take productivity gains as leisure. Individual data give mixed support for a backward bend; much of what looks like one in a cross-section is the sorting of high-wage people into occupations with different hours norms.

::: example A wage rise, compensated and not {#ex-effects}
Continue [[#ex-cd]]: $\alpha = 0.6$, $T = 16$, $y = 20$, $w = 10$, so $h = 8.8$ and $u = 108^{0.6}\,7.2^{0.4} \approx 36.56$. Now raise the wage to $w' = 11$. Compute the uncompensated change in hours, and the compensated change that holds utility at $36.56$.
::: solution
Uncompensated: $h(11, 20) = 0.6\times 16 - 0.4\times 20/11 \approx 9.600 - 0.727 = 8.873$. Hours rise by about $0.073$. The hours elasticity is

$$
\frac{\Delta h / h}{\Delta w / w} \approx \frac{0.073/8.8}{0.1} \approx 0.083.
$$

Compensated. For Cobb–Douglas, $u = \kappa\, m / w^{1-\alpha}$ with $\kappa = \alpha^{\alpha}(1-\alpha)^{1-\alpha} \approx 0.5102$. Holding $u$ fixed at $w' = 11$ requires full income $m^c = u\, (11)^{0.4}/\kappa \approx 186.99$, against uncompensated full income $11\times 16 + 20 = 196$. Compensated hours are $h^c = T - (1-\alpha)m^c/w' \approx 16 - 0.4\times 186.99/11 \approx 9.200$. The substitution effect is $9.200 - 8.8 = 0.400$ hours. The income effect is $8.873 - 9.200 = -0.327$ hours. They sum to the uncompensated change $0.073$. Leisure is strongly normal, but not normal enough here to reverse the substitution effect.
:::
:::

::: warning A higher wage is not a parallel shift of labour supply
Students sometimes draw a wage rise as a shift of the labour-supply curve. The labour-supply curve already *is* the plot of $h$ against $w$. A change in $w$ is a movement along the curve. What shifts the curve is a change in $y$, in preferences, in taxes, or in the price of goods that complement leisure (childcare is the leading example). Confusing a movement along the curve with a shift of it is the same error as in [[principles/supply-and-demand]], and it is equally costly when the topic is a tax reform or an EITC expansion.
:::

Taxes and transfers rewrite the budget rather than the preferences. A linear earnings tax at rate $\tau$ replaces $w$ by $w(1-\tau)$ in [[#eq-mrs]]; the substitution effect of the tax reduces hours, the income effect (the person is poorer) raises them if leisure is normal. A lump-sum transfer raises $y$ and, with leisure normal, reduces hours. A means-tested transfer that is withdrawn at rate $t$ as earnings rise is a combination: it adds to $y$ at $h = 0$ and imposes an effective tax $t$ on the first hours. The result can be a budget with several kinks, and a participation decision that is much more elastic than hours among participants — which is the next topic.

## Participation and the reservation wage

Many people supply zero hours. In the model that is a corner: the MRS at $(c, \ell) = (y, T)$ exceeds the wage, so even the first hour of work is not worth taking.

::: definition Reservation wage {#def-reservation}
The **reservation wage** $w_R$ is the lowest wage at which the person is willing to supply a positive number of hours. It is defined by indifference between the best interior bundle at $w_R$ and the non-participation bundle $(y, T)$:

$$
u\bigl(w_R h(w_R, y) + y,\, T - h(w_R, y)\bigr) = u(y, T).
$$

If the interior formula for hours would give $h \le 0$, then $w_R$ is at least as large as the wage that sets that formula to zero. For the Cobb–Douglas case [[#eq-cd-hours]], $w_R = (1-\alpha)y/(\alpha T)$.
:::

At any $w < w_R$ the person does not participate; at $w > w_R$ she does, and hours jump from $0$ to the interior $h(w, y)$. That jump is the **extensive margin**. Fixed costs of working — commuting, work clothes, lost eligibility for a benefit, paid childcare — raise $w_R$, because they must be covered by the first hours of earnings. A fixed cost $F$ in money replaces $y$ by $y - F$ whenever $h > 0$, which both lowers the interior budget and makes non-participation more attractive.

::: example A corner, then participation {#ex-corner}
Keep $u = c^{0.6}\ell^{0.4}$, $T = 16$, $y = 20$. (a) At $w = 0.5$, does the person work? (b) What is $w_R$? (c) A childcare cost of $F = 12$ is incurred if and only if $h > 0$. What happens to $w_R$?
::: solution
(a) The interior formula gives $h = 9.6 - 0.4\times 20/0.5 = 9.6 - 16 = -6.4 < 0$. The person does not work: $h = 0$, $c = 20$, $\ell = 16$. Utility is $20^{0.6}\,16^{0.4} \approx 18.4$.
(b) From [[#def-reservation]], $w_R = 0.4\times 20/(0.6\times 16) = 8/9.6 \approx 0.833$. At $w = 0.833$, interior hours are exactly zero, and the person is indifferent between that degenerate interior point and non-participation.
(c) With the fixed cost, participation requires $u(w h + y - 12, T - h) \ge u(y, T)$. Using the interior formula with effective non-labour income $y - F = 8$, hours are $h = 9.6 - 0.4\times 8/w = 9.6 - 3.2/w$, and this must both be positive and beat non-participation. A direct calculation: at the wage that sets $h = 0$ we would have $w = 3.2/9.6 \approx 0.333$, but that ignores the utility comparison with $(20, 16)$. Because $F$ is paid only when working, $w_R$ rises. Numerically, $w_R$ solves $0.5102\cdot(16w + 8)/w^{0.4} = 20^{0.6}16^{0.4} \approx 18.38$, or $m / w^{0.4} \approx 36.03$. Trying $w = 1.2$ gives $m = 27.2$ and $m/w^{0.4} \approx 25.3$, too low; $w = 2.0$ gives $m = 40$ and $40/2^{0.4} \approx 30.3$; $w = 2.8$ gives $m = 52.8$ and $52.8/2.8^{0.4} \approx 35.0$; $w \approx 3.0$ gives $m = 56$ and $56/3^{0.4} \approx 36.6$. So $w_R$ is a little under $3$, far above $0.833$. Fixed costs of work are a first-order reason that participation elasticities exceed hours elasticities.
:::
:::

::: quiz
In the labour–leisure model with leisure a normal good, an increase in non-labour income $y$, holding $w$ fixed,
- [ ] raises hours, because the person can now afford to work more
- [x] reduces hours (and may push a participant into non-participation)
- [ ] has no effect on hours, only on consumption
- [ ] raises the reservation wage and also raises hours among participants
::: solution
Leisure normal means $\partial \ell/\partial y > 0$, so $\partial h/\partial y < 0$. The extra $y$ also raises $w_R$, so some people at the margin of participation drop out. The reservation wage rises; hours among those who remain fall, they do not rise.
:::
:::

The participation decision is where labour supply meets social policy. An in-work benefit such as the US Earned Income Tax Credit or the UK Universal Credit (in-work element) raises the return to the first hours and so lowers $w_R$; a means-tested out-of-work benefit raises $y$ at $h = 0$ and so raises $w_R$. The two can be combined, as they are in most OECD tax-and-benefit systems, producing a budget whose slope changes several times between $h = 0$ and full-time hours. Bunching of reported hours at kinks, and participation responses to benefit reforms, are the empirical counterparts of this geometry.

## Elasticities: hours versus participation

::: definition Hours, participation and the total elasticity {#def-elasticities}
The **intensive-margin** (hours) elasticity is $\eta_h = \partial \ln h / \partial \ln w$ among those with $h > 0$. The **extensive-margin** (participation) elasticity is $\eta_p = \partial \ln P / \partial \ln w$, where $P$ is the participation rate. Aggregate hours are $H = P \cdot \bar h$, so the **total hours elasticity** is $\eta_H = \eta_p + \eta_h$ (approximately, if $\bar h$ is mean hours among participants). A **Frisch elasticity** holds the marginal utility of wealth constant and is the right object for a short-lived wage change; a **Marshallian** elasticity holds non-labour income constant; a **Hicksian** elasticity holds utility constant.
:::

These three Marshallian / Hicksian / Frisch objects are related by income effects and by the intertemporal budget, and they are easy to confuse. For a tax reform that lasts a lifetime, the Hicksian elasticity (plus income effects from the extra revenue, if it is rebated) is the relevant one. For a temporary bonus or a short-lived tax holiday, the Frisch elasticity is the relevant one, and it is larger because the person can move work across time. Chetty (2012, *Econometrica*) showed that, once one accounts for optimisation frictions — people do not re-optimise hours after every small tax change — the intensive-margin Hicksian elasticity implied by a range of quasi-experiments clusters around $0.3$, smaller than many calibration targets in macroeconomics and larger than some micro OLS estimates near zero.

::: example From a wage table to an elasticity {#ex-elasticity}
A small survey reports mean weekly hours of $36$ at a wage of $12$ and $37.5$ at a wage of $13.2$, among people who work in both periods. Non-labour income is unchanged. Estimate $\eta_h$. If, in addition, the participation rate in the same population rises from $0.72$ to $0.74$, estimate $\eta_p$ and $\eta_H$.
::: solution
$\Delta \ln h \approx (37.5 - 36)/36 = 0.0417$ and $\Delta \ln w = (13.2 - 12)/12 = 0.10$, so $\eta_h \approx 0.42$. Participation: $\Delta \ln P \approx (0.74 - 0.72)/0.72 \approx 0.0278$, so $\eta_p \approx 0.28$. The total elasticity is about $0.70$. These are discrete Marshallian elasticities, not identified causal effects: if the wage rise was the result of a boom that also shifted $y$ and preferences, the numbers overstate labour-supply responses. Identification is the subject of the evidence section.
:::
:::

A second distinction matters for policy. The elasticity of *taxable income* (hours times reported wage, plus other reportable income) is what a tax authority cares about, and it includes avoidance and evasion as well as hours. The elasticity of *hours* is what the labour–leisure model is about. They coincide only if the wage is observed and there is no sheltering. Saez, Slemrod and Giertz (2012, *Journal of Economic Literature*) survey the taxable-income literature; the hours literature is narrower and, on the intensive margin, usually finds smaller responses.

## Life-cycle labour supply

People live many periods, wages rise with experience and then fall, and they can save. The static model is then the within-period slice of a life-cycle problem. Let $u(c_t, \ell_t)$ be period utility, $\beta$ the discount factor, and $r$ the real interest rate. The person maximises $\sum_t \beta^t u(c_t, \ell_t)$ subject to an intertemporal budget. At an interior optimum the within-period condition [[#eq-mrs]] still holds, now with the current wage $w_t$, and consumption is smoothed according to an Euler equation. A **temporary** wage rise (this year only) is mostly a substitution effect: work more now, enjoy leisure later. A **permanent** wage rise is both a substitution effect and a large income effect. That is why Frisch elasticities (temporary) exceed Marshallian elasticities (permanent).

MaCurdy (1981, *Journal of Political Economy*) estimated a Frisch elasticity for US men of about $0.15$–$0.45$ from the Panel Study of Income Dynamics, using wage variation over the life cycle. The same life-cycle logic predicts that hours should be high when wages are high — in middle age, and in booms — and that people should retire when the wage (or the return to staying in work, net of pensions) falls below the reservation level. Retirement is participation at the end of the life cycle, and it is highly sensitive to the structure of pensions: Gruber and Wise (the NBER volumes, 1999 and after) documented that implicit taxes on working past a statutory age explain a large share of the cross-country variation in employment at ages 55–65.

::: application The added-worker and discouraged-worker effects
In a household, one person’s job loss changes the other’s $y$ and may change the other’s $w_R$. The **added-worker effect** is the rise in a spouse’s labour supply when the primary earner becomes unemployed (a negative income shock). The **discouraged-worker effect** is the fall in participation when a recession lowers offered wages or raises the cost of finding a job. Both are labour-supply responses, they go in opposite directions, and which dominates in a downturn is an empirical question. In the US Great Recession, the participation rate of prime-age men fell and stayed low for years (BLS, employment–population ratio for men 25–54: 88.2 per cent in 2007, 80.6 per cent in 2011, still 86.3 per cent in 2023), a change too large and too persistent to be only a discouraged-worker effect in the static sense; scarring, disability claims and opioid-related health are among the additional mechanisms that have been studied.
:::

## Evidence

Labour-supply elasticities are not a single number. They differ by sex, age, marital status, the margin (hours versus participation), the time horizon, and the country. A fair summary of the micro evidence, with all the usual caveats about identification, is as follows.

Hours of prime-age men in rich countries respond very little to wages on the intensive margin. Bargain, Orsini and Peichl (2014, *Journal of Human Resources*), estimating discrete-choice labour-supply models on 17 European countries and the US, find male hours elasticities typically between $0$ and $0.2$. Female hours elasticities are larger, often $0.1$–$0.5$, and female participation elasticities are larger still, often $0.2$–$0.6$, especially among mothers of young children. Blundell, Duncan and Meghir (1998, *Econometrica*) used UK tax reforms of the 1980s as variation and found a female hours elasticity around $0.1$–$0.3$ depending on age of children. Eissa and Liebman (1996, *Quarterly Journal of Economics*) found that the 1986 expansion of the US EITC raised the participation of single mothers by about 2.8 percentage points relative to a comparison group, with little change in hours among those already working — a textbook extensive-margin response.

At the other end of the life cycle, pension and disability rules move participation a lot. The Gruber–Wise implicit-tax calculations, and the subsequent quasi-experimental work on pension reforms in Italy, France, Germany and the UK, routinely find participation elasticities for older workers well above those of prime-age men.

Macro calibrations used to need a large Frisch elasticity (near $1$ or above) to match employment fluctuations over the business cycle. The micro estimates are smaller. Chetty, Guren, Manoli and Weber (2011, *American Economic Review*, Papers and Proceedings) argued that the extensive margin, plus optimisation frictions, can reconcile the two: a modest micro elasticity on hours, a larger one on participation, and a macro elasticity that is a weighted average. Keane and Rogerson (2012, *Journal of Economic Literature*) survey the same dispute from the calibration side. There is no consensus number; there is a consensus that the margin, the horizon and the population have to be specified before a number is quoted.

Two further regularities are worth carrying forward. First, labour supply is more elastic among those whose reservation wage is near the offered wage: second earners, older workers, and low-wage parents. Second, hours among full-time prime-age men are in part a social convention (the eight-hour day, the five-day week), so the intensive-margin elasticity can be near zero even if the underlying preference elasticity is not. When the constraint binds, a small wage change does not move hours; a large one, or a change in the constraint, does.

::: history
Lionel Robbins, in “On the Elasticity of Demand for Income in Terms of Effort” (*Economica*, 1930), drew the income and substitution effects of a wage change and noted that hours could fall when wages rose. Jacob Mincer, “Labor Force Participation of Married Women” (in *Aspects of Labor Economics*, 1962), treated participation as a choice driven by the shadow wage at home, and opened the empirical study of female labour supply. James Heckman’s 1974 paper on shadow prices and the 1979 selection correction made the corner at zero hours statistically tractable. The modern quasi-experimental literature on in-work benefits begins with Eissa and Liebman (1996) on the EITC and with the IFS work of Richard Blundell and co-authors on UK tax credits.
:::

## Where this leads

Labour supply is one blade of the scissors. The next chapter derives labour demand from the firm ([[labour-economics/labour-demand]]), and the two are combined in [[labour-economics/labour-market-equilibrium]], where a minimum wage, a payroll tax or a union can be studied. Human-capital decisions ([[labour-economics/human-capital]]) change the wage a person can command, and so shift labour supply in wage–skill space. Search theory ([[labour-economics/search-and-unemployment]]) replaces the spot wage with a distribution of offers and a reservation wage that looks like $w_R$ but arises from waiting rather than from leisure. The same participation logic, with different labels, is used in [[public-economics/social-insurance]] to study unemployment insurance and disability benefits.

::: summary
- Hours and leisure are a standard consumer problem: the wage is the relative price of leisure, and full income is $wT + y$ ([[#def-full-income]], [[#prop-interior]]).
- A wage change splits into a positive substitution effect on hours and an income effect that goes the other way if leisure is normal ([[#prop-slutsky]]). The labour-supply curve may slope up or bend backwards.
- Participation is a corner. The reservation wage $w_R$ is the lowest wage at which hours are positive; fixed costs of work raise it ([[#def-reservation]]).
- The total hours elasticity is the sum of an intensive (hours) and an extensive (participation) elasticity ([[#def-elasticities]]). For many groups the extensive margin is the larger of the two.
- Temporary wage changes (Frisch) produce larger hours responses than permanent ones (Marshallian), because people can reallocate work over time.
- Micro estimates: male hours elasticities near $0$–$0.2$; female participation elasticities often $0.2$–$0.6$; older-worker participation highly sensitive to pensions. Quote the margin, the group and the horizon.
:::

## Exercises

::: exercise Cobb–Douglas hours {level=1 check="7"}
Let $u(c, \ell) = c^{0.5}\ell^{0.5}$, $T = 16$, $y = 8$ and $w = 4$. Find hours of work $h$. (Enter $h$.)
::: solution
$h = 0.5\times 16 - 0.5\times 8/4 = 8 - 1 = 7$. Equivalently, $m = 4\times 16 + 8 = 72$, $w\ell = 36$, $\ell = 9$, $h = 7$.
:::
:::

::: exercise Reservation wage {level=1 check="1"}
In the same preference family as [[#ex-cd]], $u = c^{0.6}\ell^{0.4}$, $T = 16$, $y = 24$. What is the reservation wage $w_R$? (Enter $w_R$.)
::: solution
$w_R = (1-\alpha)y/(\alpha T) = 0.4\times 24/(0.6\times 16) = 9.6/9.6 = 1$.
:::
:::

::: exercise A parallel shift {level=1}
Non-labour income in [[#ex-cd]] rises from $20$ to $40$ at $w = 10$. What happens to hours? Is this a movement along the labour-supply curve or a shift of it?
::: solution
New hours: $h = 9.6 - 0.4\times 40/10 = 9.6 - 1.6 = 8$. Hours fall by $0.8$. The wage is unchanged, so this is a shift of the labour-supply curve (to the left), caused by a rise in $y$.
:::
:::

::: exercise A linear tax {level=2 check="8.6"}
Take $u = c^{0.6}\ell^{0.4}$, $T = 16$, $y = 20$, $w = 10$, as in [[#ex-cd]], and now levy a tax of $20$ per cent on labour earnings (non-labour income is not taxed). Find the new hours. (Enter hours.)
::: solution
The net wage is $8$. Then $h = \alpha T - (1-\alpha)y/w_{\text{net}} = 9.6 - 0.4\times 20/8 = 9.6 - 1 = 8.6$. Relative to the no-tax hours of $8.8$, the substitution effect of the lower net wage reduces hours and the income effect (the person is poorer) raises them; here the substitution effect is slightly larger.
:::
:::

::: exercise Compensated versus uncompensated {level=2}
Using the numbers in [[#ex-effects]], state whether leisure is normal, and whether the uncompensated labour-supply curve slopes up or down between $w = 10$ and $w = 11$. What would have to be true of the income effect for the curve to bend backwards on this interval?
::: hint
Compare the signs of $\partial h/\partial y$ and $\partial h/\partial w$, or read the decomposition already computed in the example.
:::
::: solution
In [[#ex-effects]] a rise in $w$ with $y$ held fixed raised hours ($8.8$ to $8.873$), so the uncompensated curve slopes up. The income effect was negative ($-0.327$ hours), so leisure is normal. For a backward bend one would need that negative income effect to exceed the substitution effect of $+0.400$ hours in absolute value — for example a larger $h$ (so that the extra full income is larger) or a stronger income elasticity of leisure.
:::
:::

::: exercise Extensive versus intensive {level=2}
A tax credit is paid only to people who work at least one hour, and does not depend on how many hours they work beyond that. In the labour–leisure diagram, how does the budget change? Which margin of labour supply does the credit target, and what happens to hours among people who would have worked anyway?
::: solution
The credit is a lump-sum $C$ conditional on $h > 0$. The non-participation point stays at $(c, \ell) = (y, T)$. Every interior budget line shifts up by $C$. That lowers $w_R$ and pulls some non-participants into work (extensive margin). Among people who would have worked anyway, $C$ is an increase in $y$, so if leisure is normal they reduce hours (intensive margin). The two effects on aggregate hours go in opposite directions.
:::
:::

::: exercise Quasi-linear preferences {level=3}
Suppose $u(c, \ell) = c + v(\ell)$ with $v' > 0$, $v'' < 0$. Show that the income effect on hours is zero, and that interior labour supply is determined by $v'(T - h) = w$. Why is this specification popular in public-finance models of labour taxation?
::: hint
The MRS is $v'(\ell)$, which does not depend on $c$.
:::
::: solution
The first-order condition is $\mathrm{MRS} = v'(\ell)/1 = w$, so $v'(T - h) = w$, which does not involve $y$. Differentiating, $-v''(T-h)\,\partial h/\partial y = 0$, hence $\partial h/\partial y = 0$: no income effect. Then [[#eq-slutsky]] says that Marshallian and Hicksian hours responses coincide. Public-finance models often want to isolate the substitution (efficiency) cost of a labour tax without tracking income effects that, in a representative-agent setting, would be offset by the rebate of the tax revenue. Quasi-linearity delivers that isolation, at the cost of ruling out income effects that are first-order in the data for some groups.
:::
:::

::: exercise A two-period Frisch response {level=3}
A person lives two periods with $u = \ln c_t + \psi \ln \ell_t$ each period, $\beta(1+r) = 1$, and no non-labour income. Wages are $w_1$ and $w_2$. Show that $h_1/h_2 = w_1/w_2$ if $\psi$ is such that the interior solution exists, or more generally that relative hours track relative wages. Interpret the Frisch elasticity in this example.
::: hint
The Euler equation equalises $1/c_t$, and the within-period condition is $\psi c_t / \ell_t = w_t$. Combine these with the intertemporal budget.
:::
::: solution
$\beta(1+r) = 1$ and $u_c = 1/c_t$ imply $c_1 = c_2$. The within-period condition $\psi c_t/\ell_t = w_t$ then gives $\ell_t = \psi c_t / w_t$, so $\ell_1/\ell_2 = w_2/w_1$: leisure is high when the wage is low. Hours $h_t = T - \ell_t$ therefore move with $w_t$. If non-labour income is zero and the person works in both periods, a first-order approximation around a steady wage gives a positive Frisch elasticity of hours with respect to $w_t$, holding the marginal utility of wealth (here $1/c_t$) fixed. A purely temporary rise in $w_1$ raises $h_1$ and, through a small wealth effect, slightly raises leisure in both periods; the Frisch object shuts down that wealth channel and keeps only the reallocation of hours toward the high-wage period.
:::
:::

::: exercise Adding-up of elasticities {level=3 check="6.3"}
Aggregate hours in a population are $H = P \bar h$, where $P$ is the participation rate and $\bar h$ is mean hours among participants. Show that $\mathrm{d}\ln H = \mathrm{d}\ln P + \mathrm{d}\ln \bar h$. A reform raises $P$ from $0.60$ to $0.63$ and raises $\bar h$ from $32$ to $32.4$. Compute the percentage rise in $H$ and the two contributions. (Enter the percentage rise in $H$ to one decimal place, so $6.3$ means $6.3$ per cent.)
::: hint
Take logs of $H = P \bar h$.
:::
::: solution
$\mathrm{d}\ln H = \mathrm{d}\ln P + \mathrm{d}\ln \bar h$ is the differential of $\ln(P\bar h)$. Here $\Delta P/P = 0.03/0.60 = 0.05$ ($5$ per cent) and $\Delta \bar h/\bar h = 0.4/32 = 0.0125$ ($1.25$ per cent). The percentage rise in $H$ is approximately $6.25$ per cent; exactly, $H$ goes from $0.60\times 32 = 19.2$ to $0.63\times 32.4 = 20.412$, a rise of $1.212/19.2 = 0.063125$, or $6.3$ per cent to one decimal place. Most of the aggregate response is extensive.
:::
:::
