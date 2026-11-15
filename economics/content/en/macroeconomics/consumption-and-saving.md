A worker whose pay is higher this month than last will, on average, spend more this month — but not one-for-one, and not regardless of whether the extra pay is a bonus that will not recur or a promotion that will. That distinction is the difference between a **Keynesian consumption function**, in which current disposable income is the sufficient statistic for $C$, and an **intertemporal** theory, in which $C$ is a function of lifetime resources. Most of the last seventy years of research on consumption is the working-out of the second view, and of the ways in which the data refuse to conform to it completely.

This chapter starts with Keynes’s function because it is the schedule the demand-side models will use, then derives consumption from two-period choice, states the permanent-income and life-cycle hypotheses, and asks when a tax cut is a net addition to wealth (**Ricardian equivalence**). The discount factor in this chapter is $\beta$; the real interest rate is $r$. Inflation does not appear: consumption is a real decision. The chapter is for education only. It is not advice to save, to borrow, or to time a tax change, and the numerical households are illustrative.

## The Keynesian consumption function

::: definition Keynesian consumption function {#def-keynes-c}
The **Keynesian consumption function** is

$$
C = C_0 + c(Y - T), \qquad C_0 > 0, \quad 0 < c < 1,
$$ {#eq-keynes-c}

where $c$ is the **marginal propensity to consume** (MPC) out of current disposable income and $C_0$ is autonomous consumption. The **average propensity to consume** is $\mathrm{APC} = C/(Y-T)$, which falls with $Y$ when $C_0 > 0$.
:::

Keynes (*General Theory*, Ch. 8–10) treated [[#eq-keynes-c]] as a psychological law: people consume part of an extra unit of disposable income and save the rest. The **marginal propensity to save** is $1-c$. In the closed economy of [[macroeconomics/national-income]], $c$ is what determines how much a tax cut crowds out investment; in [[macroeconomics/is-lm]] it will determine the multiplier $1/(1-c)$.

Early post-war evidence sat uncomfortably with a stable [[#eq-keynes-c]]. Cross-section household budgets showed APC falling with income, as the equation predicts. Long-run time series, from Kuznets’s national accounts, showed APC roughly constant as income grew. A function that is right in the cross-section and wrong over decades is not yet a theory. The reconciliation is that the cross-section mixes households with different *permanent* incomes and different transitory shocks, while the time series is dominated by the growth of permanent income. That is Friedman’s 1957 insight, derived below. Until then, treat [[#eq-keynes-c]] as a useful short-run schedule, with $c$ estimated around $0.5$ to $0.9$ depending on the horizon and the country, not as a structural preference parameter.

::: example A Keynesian calculation {#ex-keynes-c}
$C = 100 + 0.75(Y-T)$, $Y = 1200$, $T = 200$. Compute $C$, the APC, and the effect on $C$ of a $40$ tax cut. What happens to private saving?
::: solution
Disposable income is $1000$, so $C = 100 + 750 = 850$ and $\mathrm{APC} = 0.85$. A tax cut of $40$ raises disposable income to $1040$ and $C$ to $100 + 780 = 880$, an increase of $30$. Private saving $Y-T-C$ rises from $150$ to $160$: the MPC of $0.75$ means that a quarter of the tax cut is saved. National saving falls, because public saving falls by $40$ and private saving rises by only $10$.
:::
:::

::: quiz
In [[#eq-keynes-c]] with $C_0>0$, as disposable income rises the average propensity to consume
- [x] falls, while the MPC stays constant
- [ ] rises, because richer households consume more
- [ ] equals the MPC at every income
- [ ] is undefined
::: solution
$\mathrm{APC} = C_0/(Y-T) + c$, which falls toward $c$ as disposable income rises. The MPC is the constant $c$. Kuznets’s fact that APC is trendless over decades is what this function fails to deliver, and what the permanent-income hypothesis restores.
:::
:::

## Two-period consumption

A household lives for two periods, receives labour income $y_1, y_2$, and can save or borrow at a given real interest rate $r$. There is no uncertainty yet. Lifetime utility is $u(c_1)+\beta u(c_2)$, with $u$ strictly increasing and strictly concave, and $\beta \in (0,1]$ the discount factor. The **lifetime budget constraint** is

$$
c_1 + \frac{c_2}{1+r} = y_1 + \frac{y_2}{1+r} \equiv w,
$$ {#eq-ltbc}

the present value of consumption equal to **wealth** $w$ (add initial assets $a_0$ to the right if they exist). Second-period consumption is residual: $c_2 = (1+r)(w-c_1)$.

::: proposition The Euler equation {#prop-euler-c}
At an interior optimum,

$$
u'(c_1) = \beta (1+r)\, u'(c_2).
$$ {#eq-euler}

If $u(c) = \ln c$, then $c_2 / c_1 = \beta(1+r)$. If in addition $\beta(1+r)=1$, consumption is perfectly smoothed: $c_1=c_2=w(1+r)/(2+r)$.
:::

::: proof
Substitute $c_2=(1+r)(w-c_1)$ into lifetime utility and differentiate with respect to $c_1$: $u'(c_1) - \beta u'(c_2)(1+r) = 0$, which is [[#eq-euler]]. For log utility, $1/c_1 = \beta(1+r)/c_2$. If $\beta(1+r)=1$, $c_1=c_2$, and [[#eq-ltbc]] gives $c_1\bigl(1+1/(1+r)\bigr)=w$, hence $c_1=w(1+r)/(2+r)$.
:::

The Euler equation is the statement that a unit of consumption moved from today to tomorrow, earning $r$ and discounted by $\beta$, cannot raise utility at the margin. It is also the first-order condition of the dynamic programme in [[mathematical-economics/dynamic-optimisation]]; the two-period problem is that programme with a finite horizon of two.

A rise in $r$ has a substitution effect (future consumption is cheaper, so $c_1$ tends to fall) and an income effect (a net saver can afford more in both periods; a net borrower can afford less). For log utility with $\beta=1$, $c_2/c_1=1+r$, hence $c_1 + c_1 = w$ and $c_1=w/2$ regardless of $r$: the two effects on $c_1$ cancel. The interest rate still changes $c_2$. Saving $y_1-c_1$ then depends on $r$ only through $w$, that is only through the present value of $y_2$.

::: example Smoothing a bonus {#ex-two-period}
$u=\ln c_1 + \ln c_2$ (so $\beta=1$), $r=0.10$, $y_1=80$, $y_2=154$. Compute wealth, $c_1$ and $c_2$, and saving in period 1. Then add a period-1 bonus of $22$ that does not recur. How much of the bonus is consumed in period 1?
::: solution
Wealth is $w = 80 + 154/1.1 = 80+140 = 220$. With $\beta=1$ and log utility, $c_2 = (1+r)c_1 = 1.1\, c_1$, so $c_1 + c_1 = 220$ and $c_1=110$, $c_2=121$. Period-1 saving is $80-110 = -30$: the household borrows. After the bonus, $y_1=102$, $w=102+140=242$, $c_1=121$, $c_2=133.1$. Of the $22$ bonus, $11$ is consumed in period 1 and $11$ is, in present value, saved for period 2. The MPC out of a transitory bonus is $1/2$ in this two-period log economy, not $c$ from [[#eq-keynes-c]].
:::
:::

::: widget contour
f: ln(x)+ln(y)
constraint: x + y/1.1 - 220
x: 20, 200
y: 20, 240
point: 110, 121
gradient: true
caption: Two-period log utility $u=\ln c_1+\ln c_2$ (level curves) and the lifetime budget line $c_1 + c_2/1.1 = 220$ from [[#ex-two-period]]. The marked point $(110, 121)$ is the optimum: the gradient of $u$ is orthogonal to the budget line, which is the Euler equation. Drag the point along the constraint and watch the gradient fail to line up, except at the optimum. A transitory bonus shifts the constraint out in parallel; a rise in $r$ pivots it about the endowment.
:::

::: remark Borrowing constraints
If the household cannot set $c_1 > y_1$ (no borrowing), the Euler equation may fail as an equality: $u'(c_1) \ge \beta(1+r)u'(c_2)$, with strict inequality when the constraint binds. Then $c_1 = y_1$ and the MPC out of current income is one. A fraction of households for whom this is true — the young, the poor, those without collateral — restores a Keynesian consumption function *for them*, even though unconstrained households obey the permanent-income logic. Campbell and Mankiw (1989, *NBER Macroeconomics Annual*) estimated that a substantial fraction of U.S. consumption tracked current income in this rule-of-thumb way. The right model of aggregate $C$ is then a weighted average, not a choice between [[#eq-keynes-c]] and [[#eq-euler]].
:::

## Permanent income and the life cycle

::: definition Permanent-income hypothesis {#def-pih}
Friedman’s **permanent-income hypothesis** (1957) states that planned consumption is proportional to **permanent income** $Y^P$, the annuity value of wealth:

$$
C = \kappa Y^P, \qquad Y^P = \frac{r}{1+r}\, W
$$ {#eq-pih}

in an infinite-horizon discrete-time setting with $r$ constant and $\beta(1+r)=1$, where $W$ is the present value of current assets plus current and expected future labour income. Transitory income $Y - Y^P$ is saved (or dissaved) and does not affect $C$, except insofar as it revises $Y^P$.
:::

The infinite-horizon derivation is the Euler equation $c_{t+1}=c_t$ (when $\beta(1+r)=1$) together with the lifetime budget: the household consumes the annuity that can be sustained for ever. A one-off bonus raises $W$ by the bonus and $C$ by $r/(1+r)$ times the bonus — a small MPC at a small $r$. A permanent rise in labour income raises $Y^P$ one-for-one and $C$ by $\kappa$ times that, a large MPC. The Keynesian function is then the reduced form when most income variation is believed to be permanent, or when households are constrained.

::: definition Life-cycle hypothesis {#def-lch}
The **life-cycle hypothesis** of Modigliani and Brumberg (1954) and Ando and Modigliani (1963) is the finite-horizon version: households save during working years to finance a planned retirement, so that consumption tracks lifetime resources rather than current income, and aggregate saving depends on the age structure of the population.
:::

A stripped-down life-cycle arithmetic: $R$ working years at income $y$, $T-R$ retirement years at income $0$, $r=0$, no bequest. Then $C = (R/T) y$ in every year of life, saving is $(1-R/T)y$ while working, and dissaving is $C$ in retirement. The **wealth–income ratio** peaks at retirement at $(T-R)C/y = R(T-R)/T$ years of income. Aggregate saving is positive in a growing or a young population, even with no bequests, because savers are richer (or more numerous) than dissavers. That is Modigliani’s explanation of Kuznets’s constant APC, and of why fast-growing economies save more.

::: example A working life {#ex-lch}
A worker earns 50 (thousand units) a year for 40 years and is retired for 10 years, with $r=0$ and no bequest. Compute annual consumption, annual saving while working, and wealth at retirement.
::: solution
Lifetime resources are $40\times 50 = 2000$. Spread over $50$ years, $C=40$ each year. Saving while working is $50-40=10$ a year. Wealth at retirement is $40\times 10 = 400$, which finances $10$ years of $C=40$. The APC out of current labour income is $40/50=0.8$ during work and is undefined (or infinite) in retirement; the APC out of permanent income is one. A Keynesian function fitted to working-age households would recover an MPC below one and miss the dissaving of retirees.
:::
:::

Hall (1978, *Journal of Political Economy*) took the Euler equation to the data under rational expectations: if $\beta(1+r)=1$ and $u$ is quadratic, $c_{t+1}=c_t + \varepsilon_{t+1}$ with $\E_t\varepsilon_{t+1}=0$ — consumption is a **random walk**. Only news about lifetime resources should move $C$. The hypothesis is a sharp null, and it is rejected: consumption is **excessively sensitive** to predicted current income (Flavin 1981) and **excessively smooth** relative to the news in current income (Campbell and Deaton 1989). Habit formation, durables, incomplete markets and the borrowing constraints already mentioned are the leading repairs. The random-walk null remains the right thing to test, because it is what [[#eq-euler]] says when it is taken literally.

::: widget plot
f: 40+0.8*x; 120
x: 0, 200
y: 0, 220
labels: \text{Keynesian }C=40+0.8 Y; \text{permanent-income }C=120
caption: Current income $Y$ on the horizontal axis. The sloped line is a Keynesian function; the horizontal line is consumption out of a fixed permanent income of $120$. A transitory movement along the horizontal axis moves Keynesian $C$ a lot and PIH $C$ not at all. A permanent rise in income would shift the horizontal line up. The data lie between the two pictures: some tracking of current $Y$, less than a large MPC would imply.
:::

::: example A retirement-age shift {#ex-lch-age}
In the arithmetic of [[#ex-lch]], retirement lengthens from $10$ years to $15$ years, with working life still $40$ years at $50$ a year and $r=0$. Compute the new $C$, saving while working, and wealth at retirement.
::: solution
Lifetime resources are still $2000$, now spread over $55$ years, so $C=2000/55 \approx 36.36$. Saving while working is $50-36.36=13.64$ a year. Wealth at retirement is $40\times 13.64 \approx 546$. Longer retirement, with no extra working years, requires a higher saving rate and a larger nest egg. An ageing population, on this logic, raises the desired wealth–income ratio; whether it raises *aggregate* saving depends on how many people are still in the saving phase. That is a life-cycle prediction, not a forecast of any country’s household saving rate.
:::
:::

## Ricardian equivalence

A tax cut, holding $G$ fixed, raises current disposable income. In [[#eq-keynes-c]] it raises $C$. In the two-period model it raises $C$ only if it raises wealth. Whether it does depends on whether the household capitalises the future taxes that will service the resulting debt.

::: proposition Ricardian equivalence {#prop-ricardo}
Consider a two-period economy with lump-sum taxes, a given path of $G_1, G_2$, and a household that is unconstrained, takes $r$ as given, and values its descendants’ utility (or is itself the second period). A cut in $T_1$, financed by government borrowing and repaid by $T_2 = (1+r)(G_1-T_1+B_0)+G_2$ in the appropriate present-value sense, leaves the household’s lifetime budget [[#eq-ltbc]] unchanged and therefore leaves $(c_1,c_2)$ unchanged. Private saving rises one-for-one with the public deficit.
:::

::: proof
The government’s present-value budget is $T_1 + T_2/(1+r) = G_1 + G_2/(1+r) + (1+r)B_0/(1+r)$, up to the dating of initial debt. The household’s wealth is $y_1-T_1+(y_2-T_2)/(1+r)+a_0$. Substituting the government’s constraint, $T_1 + T_2/(1+r)$ drops out and wealth equals the present value of output minus government purchases plus net claims on the private sector. That object does not involve the timing of taxes. Hence a pure recoding of $T_1$ against $T_2$ does not change $w$ or $(c_1,c_2)$. From the identities, $S_{\text{private}}$ rises by the fall in $T_1$.
:::

The result is Ricardo’s, revived by Barro (1974, *Journal of Political Economy*, “Are Government Bonds Net Wealth?”). It is a theorem with a long list of assumptions, each of which is a reason the theorem might fail: binding borrowing constraints; finite lives without operative bequests (Diamond’s overlapping-generations model, in [[economic-growth/overlapping-generations]]); distortionary taxes, so that the *timing* of $T$ changes deadweight loss; myopia or present bias ([[behavioural-economics]], when that course is in view); a world rate that the country can affect. Empirical tests — looking at whether private saving offsets public deficits — go both ways. Seater (1993, *Journal of Economic Literature*) read the evidence as roughly Ricardian; a later literature on 2008–11 tax rebates (Parker, Souleles, Johnson and McClelland 2013, *American Economic Review*) found MPCs out of rebates of $0.5$ or more in the quarter, which is not Ricardian. The honest summary is that Ricardian equivalence is a useful null, closer to true for a temporary deficit announced as such to unconstrained households, and closer to false for a rebate sent to households near their borrowing limit.

::: warning A tax cut is not always a rise in wealth
Treating a deficit-financed tax cut as extra income, dollar for dollar, is the Keynesian calculation of [[#ex-keynes-c]]. Treating it as zero extra wealth is the Ricardian calculation. The data sit in between, and *which* household you have in mind matters more than which school you belong to. A student with no credit card spare capacity and a household with a large taxable estate are not the same agent. Macroeconomic MPCs are averages over those agents, and averages move with the distribution of debt and of liquid assets (Kaplan and Violante 2014, *Econometrica*, “hand-to-mouth” households).
:::

## Competing views and the aggregate function

**Keynesians** use [[#eq-keynes-c]] because they are interested in the short run, in which many households look constrained and in which the multiplier is the object. They need not deny the Euler equation as a description of a patient, unconstrained household.

**Monetarists**, following Friedman, treat the PIH as the right structural model and the Keynesian function as a misleading short-run correlation. A tax cut that does not change $Y^P$ does not change $C$; a change in $M$ that changes $Y$ transitorily does not change $C$ much.

**New classicals** take the Euler equation under rational expectations as the consumption block of a real-business-cycle model. **New Keynesians** keep that Euler equation (it becomes the dynamic IS curve of [[business-cycles/new-keynesian-model]]) and add sticky prices, so that $r$ is a policy variable in the short run and $C$ responds to it through [[#eq-euler]].

**Behavioural** accounts (present bias, mental accounts, habits) relax the preference side of [[#prop-euler-c]] rather than the budget. They can generate a high MPC out of a rebate without borrowing constraints. They are an alternative explanation of the same facts, not a licence to ignore the budget.

For the rest of this course, the operational compromise is: use a Keynesian $C=C(Y-T)$ when building IS–LM, remember that $c$ is an empirical reduced form, and remember that a tax change announced as future-tax-neutral may have a smaller $c$ than a transfer to constrained households.

## Evidence

**The MPC.** Estimated MPCs out of transitory income in high-income countries cluster between $0.2$ and $0.6$ at a quarterly horizon for the average household, and higher in the lower tail of liquid wealth (Jappelli and Pistaferri 2010, *Annual Review of Economics*; Fagereng, Holm and Natvik 2021, *American Economic Review*, using Norwegian lottery data, find MPCs declining in liquidity). MPCs out of permanent income are much closer to one. That pattern is the PIH plus constraints, not a pure Keynesian function and not a pure random walk.

**Saving rates.** Gross national saving as a share of GDP differs enormously: in 2023, China saved on the order of 40 per cent of GDP, the United States about 17 per cent, and several sub-Saharan African countries far less (World Bank WDI, gross domestic savings, accessed 2026). Life-cycle theory points at growth and demography; a precautionary-saving theory points at incomplete insurance; a financial-development theory points at whether households *can* borrow. China’s high saving in the 2000s has been attributed to all three, plus the one-child policy’s effect on old-age support (Modigliani and Cao 2004, *Journal of Economic Literature*). The atlas records the disagreement.

**Ricardian tests.** The 2001 and 2008 U.S. tax rebates, designed to be salient and one-off, produced a detectable rise in spending in the following months (Johnson, Parker and Souleles 2006, *American Economic Review*; Parker et al. 2013). That is a rejection of Ricardian equivalence for those rebates. It is not a rejection of Barro’s theorem, which did not claim to describe a borrowing-constrained recipient of a surprise cheque.

## Where this leads

[[macroeconomics/investment]] is the firm’s analogue of this chapter: an intertemporal decision, a user cost in place of $r$ on the household side, and a reduced form $I(r)$ for IS–LM. [[macroeconomics/is-lm]] puts $C=C(Y-T)$ into the goods market and generates a multiplier. [[macroeconomics/fiscal-policy-and-debt]] returns to Ricardian equivalence as one view of whether public debt is a burden. The Euler equation reappears as the dynamic IS curve in [[business-cycles/new-keynesian-model]], and as the Ramsey consumption path in [[economic-growth/ramsey-model]].

::: history
**1936, John Maynard Keynes.** Chapters 8–10 of the *General Theory* stated the consumption function as a psychological law relating $C$ to current income, with $0<\mathrm{MPC}<1$. **1954, Franco Modigliani and Richard Brumberg.** “Utility Analysis and the Consumption Function” derived life-cycle consumption from finite-horizon optimisation; Ando and Modigliani (1963) took it to aggregate data. **1957, Milton Friedman.** *A Theory of the Consumption Function* introduced permanent income and reconciled the cross-section APC with Kuznets’s time series. **1974, Robert Barro.** “Are Government Bonds Net Wealth?” gave Ricardian equivalence its modern form. **1978, Robert Hall.** “Stochastic Implications of the Life Cycle–Permanent Income Hypothesis” showed that the Euler equation implies a random walk for consumption under rational expectations and quadratic utility.
:::

::: summary
- The Keynesian function $C=C_0+c(Y-T)$ is a short-run schedule; $c$ is the MPC, and it pins down crowding-out and the multiplier.
- Two-period choice gives the Euler equation $u'(c_1)=\beta(1+r)u'(c_2)$ and consumption as a function of lifetime wealth, not of current $y_1$ alone.
- The permanent-income and life-cycle hypotheses are the infinite- and finite-horizon versions. The MPC out of transitory income is small for unconstrained households; the MPC out of permanent income is large.
- Ricardian equivalence is the theorem that a lump-sum tax change, with $G$ fixed, does not change wealth. It fails under borrowing constraints, distortionary taxes, or non-operative bequests.
- Aggregate $C$ is a mix: unconstrained Euler households, hand-to-mouth households, and (on some evidence) behavioural departures. IS–LM uses the reduced form; it does not require one to forget the mix.
:::

## Exercises

::: exercise A Keynesian MPC {level=1 check="24"}
$C=50+0.8(Y-T)$. Taxes fall by $30$. By how much does consumption rise? (Enter the rise in $C$.)
::: solution
$\Delta C = 0.8\times 30 = 24$.
:::
:::

::: exercise Two-period smoothing {level=1 check="90"}
Log utility, $\beta=1$, $r=0$, $y_1=60$, $y_2=120$. Compute $c_1$. (Enter $c_1$.)
::: solution
$w=60+120=180$. With $r=0$ and $\beta=1$, $c_1=c_2=90$.
:::
:::

::: exercise Saving in the same problem {level=1}
In the previous exercise, is the household saving or borrowing in period 1, and by how much?
::: solution
$y_1-c_1=60-90=-30$: borrowing $30$. Period-2 income covers the repayment (which, at $r=0$, is $30$) and $c_2=90$.
:::
:::

::: exercise A real-interest-rate rise {level=2}
Log utility, $\beta=1$, $y_1=100$, $y_2=0$, and $r$ rises from $0$ to $1$ (from 0 per cent to 100 per cent — a two-period parable, not a market quote). Compute $c_1$ at each $r$. What happened to the substitution and income effects?
::: solution
Wealth is $w=y_1=100$ at both rates, because $y_2=0$. With log and $\beta=1$, $c_1=w/2=50$ at both $r$. The substitution effect (tilt toward $c_2$) and the income effect (the household is a saver, so a higher $r$ makes it richer) cancel for $c_1$. Consumption in period 2 rises: $c_2=(1+r)(100-50)$ goes from $50$ to $100$. Saving in period 1 is $50$ at both rates. The large $r$ is there so the arithmetic is visible; the cancellation is a log-utility property, not a general one.
:::
:::

::: exercise Permanent versus transitory {level=2}
An infinite-horizon household has $\beta(1+r)=1$, $r=0.05$, and consumes the annuity $\frac{r}{1+r}W$. Assets are currently zero. Labour income is $100$ this period. Compute the MPC out of a one-off bonus of $21$ (this period only) and out of a permanent rise of $21$ in labour income, assuming the permanent rise is an annuity that lasts for ever.
::: solution
The bonus raises $W$ by $21$, so $\Delta C = (0.05/1.05)\times 21 = 1$. The MPC out of transitory income is $1/21 \approx 0.048$. A permanent rise of $21$ raises the present value of labour income by $21 + 21/1.05 + 21/1.05^2+\cdots = 21 \times (1.05)/0.05 = 441$, and $\Delta C = (0.05/1.05)\times 441 = 21$. The MPC out of permanent income is $1$. (That is the PIH in its starkest form.)
:::
:::

::: exercise Life-cycle wealth {level=2 check="360"}
A worker earns $30$ a year for $30$ years and retires for $20$ years, $r=0$, no bequest. What is wealth at retirement? (Enter that wealth.)
::: solution
Lifetime resources are $30\times 30=900$. Spread over $50$ years, $C=18$ a year. Saving while working is $30-18=12$ a year. Wealth at retirement is $30\times 12=360$, which finances $20$ years of consumption at $18$.
:::
:::

::: exercise Ricardian arithmetic {level=3}
A two-period household has $y_1=100$, $y_2=100$, $r=0$, $\beta=1$, log utility, $G_1=G_2=20$, and initially $T_1=T_2=20$. Compute $(c_1,c_2)$. Now set $T_1=0$ and $T_2=40$, with $G$ unchanged. Recompute. What happens to private saving?
::: hint
First confirm that the government’s present-value budget still holds. Then use $w = (y_1-T_1)+(y_2-T_2)$.
:::
::: solution
Originally $w=(80)+(80)=160$, $c_1=c_2=80$. Private saving is $y_1-T_1-c_1=0$. After the tax shift, $w=(100-0)+(100-40)=160$ still, so $c_1=c_2=80$ still. Private saving is $100-0-80=20$, which is exactly the public deficit of $20$ in period 1. Consumption does not move. A Keynesian function with $c=0.8$ would have predicted $\Delta C=0.8\times 20=16$; that prediction is the size of the Ricardian failure if the household were instead hand-to-mouth.
:::
:::

::: exercise A borrowing constraint {level=3}
Take the household of [[#ex-two-period]] ($y_1=80$, $y_2=154$, $r=0.1$, $\beta=1$, log) but forbid borrowing: $c_1 \le y_1$. What is the constrained optimum? What is the MPC out of a small increase in $y_1$? Out of a small increase in $y_2$?
::: hint
The unconstrained $c_1$ was $110>80$, so the constraint binds. At a bound, the Euler inequality is strict.
:::
::: solution
The unconstrained optimum had $c_1=110>80$, so $c_1=80$ and $c_2=154$. (The household would like to borrow against $y_2$ and cannot.) A small increase in $y_1$ raises $c_1$ one-for-one: the MPC out of current income is $1$. A small increase in $y_2$ raises $c_2$ one-for-one and does not raise $c_1$ at all: the MPC out of future income is $0$, until the constraint stops binding. That is the microfoundation of a Keynesian consumption function for this household, and of a failure of Ricardian equivalence: a tax cut that raises $y_1-T_1$ is spent, even if $T_2$ rises by $(1+r)$ times as much.
:::
:::
