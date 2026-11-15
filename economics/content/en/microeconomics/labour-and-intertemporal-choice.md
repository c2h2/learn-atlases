So far the consumer has arrived at the shop with cash $m$. Many of the interesting budgets in economics are not cash. A worker owns time, sells some of it as labour, and buys consumption with the proceeds plus any non-labour income. A household owns goods, or a claim on future income, and trades at market prices. In both cases the budget is $\mathbf{p}\cdot\mathbf{x} = \mathbf{p}\cdot\boldsymbol\omega$, an **endowment** $\boldsymbol\omega$ valued at $\mathbf{p}$, and a price change revalues the endowment as well as pivoting the line. The extra term is a **wealth effect**, and it is why a wage rise can reduce hours and why an interest-rate rise can reduce saving.

This chapter takes the UMP of [[microeconomics/consumer-choice]] and replaces cash income with an endowment. The first section writes the general endowment problem and the modified Slutsky equation. The second specialises to **labour–leisure** choice. The third specialises to **two-period consumption**, borrowing and lending. Nothing here is advice about hours, saving, a pension or a mortgage: the numbers are illustrative, the agents are fictional, and the models omit taxes, credit constraints and risk. Those belong to [[labour-economics/labour-supply]] and to finance courses; the job here is the budget geometry.

## Choice with an endowment

::: definition Endowment budget {#def-endowment}
The consumer owns a bundle $\boldsymbol\omega \in \R_+^n$ and can trade at prices $\mathbf{p} \gg \mathbf{0}$. Her budget set is

$$
B(\mathbf{p}, \boldsymbol\omega) = \set{\mathbf{x} \ge \mathbf{0} : \mathbf{p}\cdot\mathbf{x} \le \mathbf{p}\cdot\boldsymbol\omega}.
$$ {#eq-endowment-budget}

**Gross demand** is the chosen bundle $x(\mathbf{p}, \boldsymbol\omega)$; **net demand** (excess demand) is $z(\mathbf{p}, \boldsymbol\omega) = x(\mathbf{p}, \boldsymbol\omega) - \boldsymbol\omega$. She is a net buyer of good $i$ if $z_i > 0$ and a net seller if $z_i < 0$.
:::

This is the UMP with $m = \mathbf{p}\cdot\boldsymbol\omega$. Everything in the previous two chapters still applies, with one change: $m$ is no longer a parameter independent of $\mathbf{p}$. A rise in $p_i$ makes the consumer poorer if she is a net buyer of $i$, and richer if she is a net seller. The ordinary income effect of [[microeconomics/slutsky-and-welfare]] is joined by this **endowment (wealth) effect**.

::: proposition Slutsky equation with endowments {#prop-slutsky-endowment}
If $x(\mathbf{p}, m)$ is the cash-income Marshallian demand of the previous chapters, endowment demand is $x(\mathbf{p}, \mathbf{p}\cdot\boldsymbol\omega)$. Differentiating good $i$ with respect to $p_j$,

$$
\frac{\partial x_i}{\partial p_j}\Big|_{\boldsymbol\omega} = \frac{\partial h_i}{\partial p_j} - (x_j - \omega_j)\,\frac{\partial x_i}{\partial m}.
$$ {#eq-slutsky-endowment}

The income-effect term is weighted by *net* demand $x_j - \omega_j$, not by gross demand $x_j$.
:::

::: proof
Chain rule: $\mathrm{d}x_i/\mathrm{d}p_j = \partial x_i/\partial p_j + (\partial x_i/\partial m)\, \omega_j$, where the first partial holds $m$ fixed. Substitute the ordinary Slutsky equation $\partial x_i/\partial p_j = \partial h_i/\partial p_j - x_j \partial x_i/\partial m$ and collect the income terms: $-x_j \partial x_i/\partial m + \omega_j \partial x_i/\partial m = -(x_j - \omega_j)\partial x_i/\partial m$.
:::

If the consumer is a net seller of $j$ and $j$ is normal, a rise in $p_j$ has a *positive* income effect on $x_i$ that can overturn substitution. That is the mechanism behind a backward-bending labour supply and behind a saver who consumes more today when the interest rate rises.

::: example A farmer who eats her own crop {#ex-farmer}
A farmer is endowed with $\boldsymbol\omega = (10, 0)$ of (grain, meat). Preferences are Cobb–Douglas $u = x_1^{1/2} x_2^{1/2}$. Prices are $p_1 = 1$, $p_2 = 1$. (a) Find the chosen bundle and net trades. (b) What happens to grain *consumption* if $p_1$ rises to $4$, meat still at $1$? Decompose using [[#eq-slutsky-endowment]] in discrete form.
::: solution
(a) Wealth $m = 10$. Cobb–Douglas equal shares: $x_1 = 5$, $x_2 = 5$. She sells 5 of grain and buys 5 of meat.

(b) New wealth $m' = 4\cdot 10 = 40$. New consumption $x_1' = 20$, $x_2' = 20$. Grain consumption *rises* from 5 to 20, even though grain is more expensive relative to meat. Substitution, holding utility constant, would cut grain: original $u = 5$, $h_1(4, 1, 5) = 5\sqrt{1/4} = 2.5$. The substitution effect is $2.5 - 5 = -2.5$. The wealth effect is enormous: she is a net seller of grain, the price rise makes her richer, and grain is normal. Net: $-2.5 + 17.5 = +15$. Marshallian-with-cash at the old wealth would have gone from 5 to $10/(2\cdot 4) = 1.25$; the endowment revaluation is the whole difference between $1.25$ and $20$.
:::
:::

::: warning Gross demand is not net demand
Exam questions that ask "does she buy more grain?" after a price rise are ambiguous. Gross consumption $x_1$ can rise while net sales $10 - x_1$ also rise, or the reverse. Always state which. Labour economics has the same trap: hours *worked* and leisure *consumed* move in opposite directions by identity, and a wage change that raises consumption can still reduce hours.
:::

## Labour and leisure

Time is the endowment. Let $T$ be the time endowment (hours in the period), $\ell$ leisure, $L = T - \ell$ hours worked, $w$ the real wage, $c$ consumption with price 1, and $y$ non-labour income (a dividend, a transfer — illustrative, not a recommended claim on any real scheme). The budget is

$$
c + w\ell = wT + y \equiv M,
$$ {#eq-full-income}

**full income** $M$ on the right, leisure priced at its opportunity cost $w$ on the left. This is [[#eq-endowment-budget]] with $\boldsymbol\omega = (y, T)$ and $\mathbf{p} = (1, w)$, goods $(c, \ell)$.

::: definition Labour supply {#def-labour-supply}
Given preferences $u(c, \ell)$ over consumption and leisure, **labour supply** is $L(w, y) = T - \ell(w, y)$, where $\ell(w, y)$ is the leisure demand from the UMP with budget [[#eq-full-income]]. The **reservation wage** is the lowest $w$ at which $L > 0$; below it the consumer takes $\ell = T$ and $c = y$.
:::

Interior first-order condition: $\mathrm{MRS}_{c\ell} = u_c / u_\ell = 1/w$, or $u_\ell / u_c = w$: the marginal rate of substitution between leisure and consumption equals the wage. A corner $L = 0$ occurs when $u_\ell / u_c > w$ at $\ell = T$.

::: proposition Wage effects on labour supply {#prop-wage-labour}
By [[#eq-slutsky-endowment]] with $j$ the leisure good,

$$
\frac{\partial \ell}{\partial w} = \frac{\partial h_\ell}{\partial w} - (\ell - T)\,\frac{\partial \ell}{\partial M}.
$$

Since $\ell - T = -L \le 0$, the endowment effect on leisure of a wage rise is positive whenever leisure is normal: the worker is a net seller of time. Substitution makes leisure more expensive and cuts $\ell$ (raises $L$). The two effects oppose. Labour supply $L(w, y)$ can therefore slope up or down, and can bend backwards at high wages.
:::

If $y = 0$ and preferences are homothetic, income and substitution on *leisure* need not cancel for *hours*: Cobb–Douglas with $y = 0$ produces *constant* hours, the two effects on $L$ exactly offset. A positive $y$ makes hours increasing in $w$ for Cobb–Douglas, because the substitution effect is then relatively stronger at low wages.

::: example Cobb–Douglas labour supply {#ex-cd-labour}
Let $u = c^{1/2} \ell^{1/2}$, $T = 16$, $y = 8$. (a) Find $L(w, 8)$ for a general $w > 0$. (b) Compute hours at $w = 2$, $w = 4$ and $w = 8$. (c) What happens if $y = 0$?
::: solution
(a) Full income $M = 16w + 8$. Equal exponents: $c = M/2$, $\ell = (M/2)/w = 8 + 4/w$. Then

$$
L = 16 - \ell = 8 - \frac{4}{w}.
$$

Hours are positive for $w > 1/2$. The reservation wage is $1/2$: at $w = 1/2$, $L = 0$, $c = y = 8$, $\ell = 16$, and $\mathrm{MRS} = c/\ell = 8/16 = 1/2 = w$, so the FOC holds at the corner.

(b) $w = 2$: $L = 8 - 2 = 6$, $c = 20$, $\ell = 10$. $w = 4$: $L = 7$, $c = 36$, $\ell = 9$. $w = 8$: $L = 7.5$, $c = 68$, $\ell = 8.5$. Hours rise with $w$, but at a decreasing rate, approaching 8.

(c) If $y = 0$, $\ell = 8$ and $L = 8$ for every $w > 0$. The consumer always takes half her time as leisure. A wage-proportional tax that scaled $w$ down would not change hours in this special case — only consumption — which is why the Cobb–Douglas-with-no-nonlabour-income model is a poor guide to tax debate. (This is a property of the example, not a finding about any real tax.)
:::
:::

::: widget plot
f: 8 - 4/x; 8
x: 0.6, 16
y: 0, 12
labels: L(w, y=8)=8-4/w; L(w, y=0)=8
caption: Labour supply from [[#ex-cd-labour]]. With non-labour income $y=8$, hours rise with the wage from a reservation wage of $1/2$ towards an asymptote of 8. With $y=0$, hours are 8 at every wage (the two effects cancel). The backward bend that textbooks draw for high wages needs a stronger income effect than this Cobb–Douglas specification delivers. Move along the solid curve: doubling $w$ does not double $L$.
:::

The backward-bending case needs leisure to be normal *and* the income effect to dominate at high $w$, where $L$ is already large so the wealth term $L \partial\ell/\partial M$ is large. A Stone–Geary or CES specification with subsistence consumption can produce it; so can a utility function in which the marginal utility of consumption falls fast. The empirical labour-supply literature, surveyed in [[labour-economics/labour-supply]], typically finds small positive Hicksian elasticities for men, larger ones for women on the participation margin, and income effects that are real but not large enough, in most modern samples, to bend the male hours curve backwards. Historical samples of high-wage professionals are the usual textbook illustration of a bend.

::: quiz
A wage rises. The worker is a net seller of time, and leisure is a normal good. Which effect *raises* leisure (lowers hours)?
- [ ] The substitution effect
- [x] The endowment (wealth) effect
- [ ] Both effects
- [ ] Neither effect; hours must rise
::: solution
Substitution: leisure is more expensive, so compensated leisure falls and hours rise. Wealth: the worker is richer, and normal leisure rises, cutting hours. The net effect on $L$ is ambiguous, which is the whole point of [[#prop-wage-labour]].
:::
:::

## Two-period consumption

The same budget with different labels is saving. Consumption today $c_1$ and tomorrow $c_2$, prices $1$ and $1/(1+r)$ in present-value units, endowment $(m_1, m_2)$ of current and future income, real interest rate $r > -1$. The **intertemporal budget** is

$$
c_1 + \frac{c_2}{1+r} = m_1 + \frac{m_2}{1+r} \equiv W,
$$ {#eq-pv-budget}

**wealth** $W$ being the present value of the income stream. Equivalently, saving $s = m_1 - c_1$ earns $r$, and $c_2 = m_2 + (1+r)s$, which rearranges to the same line. A **saver** has $s > 0$; a **borrower** has $s < 0$.

Preferences $u(c_1, c_2)$, often time-separable $u(c_1) + \beta u(c_2)$ with discount factor $0 < \beta \le 1$. (Here $\beta$ is a discount factor, not a regression coefficient or a CAPM beta; it will not mean anything else in this chapter.) Interior FOC:

$$
\frac{u_1(c_1, c_2)}{u_2(c_1, c_2)} = 1+r,
$$ {#eq-euler}

or, when $u = v(c_1) + \beta v(c_2)$, the **Euler equation** $v'(c_1) = \beta(1+r) v'(c_2)$. Consumption grows if $\beta(1+r) > 1$ and $v'$ is decreasing: patience and a high interest rate tilt consumption towards the future.

::: definition Saving function {#def-saving}
**Saving** is $s(r, m_1, m_2) = m_1 - c_1(r, m_1, m_2)$, where $c_1$ is the first-period demand from [[#eq-pv-budget]]. The consumer is a saver at $r$ if $s > 0$ and a borrower if $s < 0$. The **discount rate** $\rho$ defined by $\beta = 1/(1+\rho)$ is the interest rate at which a consumer with $m_1 = m_2$ and separable log (or any symmetric) preferences would neither save nor borrow.
:::

::: example Log utility, two periods {#ex-two-period}
Let $u = \ln c_1 + \beta \ln c_2$, $m_1 = 100$, $m_2 = 50$, $r = 0.25$. (a) Find $W$, $c_1$, $c_2$ and saving when $\beta = 1$. (b) Repeat with $\beta = 0.8$. (c) With $\beta = 1$, raise $r$ to $1$ and decompose the change in $c_1$.
::: solution
(a) $W = 100 + 50/1.25 = 100 + 40 = 140$. The FOC is $c_2 = \beta(1+r)c_1 = 1.25 c_1$. Substitute: $c_1 + 1.25 c_1 / 1.25 = 140$, so $2c_1 = 140$, $c_1 = 70$, $c_2 = 87.5$, $s = 30$. The consumer saves 30 and consumes a constant present-value amount each period (because $\beta = 1$).

(b) $c_1 = W/(1+\beta) = 140/1.8 \approx 77.78$, $c_2 = 0.8\cdot 1.25\cdot 77.78 \approx 77.78$, $s \approx 22.22$. Impatience cuts saving. (And $c_2 = c_1$ here because $\beta(1+r) = 1$.)

(c) At $r = 1$, $W' = 100 + 50/2 = 125$, $c_1' = 62.5$, $c_2' = 125$, $s' = 37.5$. Current consumption falls from 70 to 62.5. Substitution: the future is cheaper, so compensated $c_1$ falls. Wealth: the consumer was a saver, so a higher $r$ makes her richer, which *raises* $c_1$ (normal). The substitution effect dominates in this log example — $c_1 = W/2$ and $W$ *falls* with $r$ for a saver who has positive $m_2$, because future income is discounted more heavily. For a pure endowment of current income ($m_2 = 0$), $W = m_1$ is independent of $r$, the wealth effect on $W$ vanishes, and $c_1$ still falls because relative prices moved. The endowment-Slutsky term is more subtle than "savers get richer": it has to be taken through $W(r)$.
:::
:::

::: example A pure current endowment {#ex-pure-current}
Keep $u = \ln c_1 + \ln c_2$ and $r = 0.25$, but set $m_1 = 140$, $m_2 = 0$. Compute $W$, $c_1$, $c_2$ and $s$. Then raise $r$ to $1$ and recompute. Why is the change in $c_1$ a pure substitution effect?
::: solution
$W = 140$ at every $r$, because there is no future income to discount. At $r = 0.25$, $c_1 = 70$, $c_2 = 87.5$, $s = 70$. At $r = 1$, $c_1 = 70$ still? No: $c_1 = W/2 = 70$ for log with $\beta = 1$, *independent of $r$*. Then $c_2 = (1+r)c_1 = 140$, $s = 70$. Current consumption does not move; all of the relative-price change shows up as more future consumption from the same saving. Log with $\beta = 1$ has income and substitution effects on $c_1$ that cancel when $W$ is independent of $r$. (The substitution effect alone would cut $c_1$; the wealth effect of being a saver raises $c_1$ by the same amount.) Compare with [[#ex-two-period]], where $W$ itself fell with $r$ because $m_2 > 0$, so $c_1$ fell. The two examples together are the endowment Slutsky equation in intertemporal clothing.
:::
:::

::: widget plot
f: m1 - (m1 + 50/1.25)/(1+x)
x: 0.4, 1.6
y: -20, 60
sliders: m1=100:40:140:5
labels: s(\beta)
caption: Saving $s = m_1 - W/(1+\beta)$ from [[#ex-two-period]] with $r=0.25$ and $m_2=50$, so $W = m_1 + 40$. The horizontal axis is the discount factor $\beta$. Raise $\beta$ (more patient) and saving rises; at $m_1=100$ and $\beta=1$, $s=30$. Raise $m_1$ and the consumer, richer today, saves more. These are illustrative paths for a fictional household, not a forecast of anyone's saving.
:::

For borrowers versus savers: if the consumer is a borrower ($s<0$), a rise in $r$ makes her poorer, so the wealth effect *cuts* $c_1$ further. Both effects reduce current consumption; saving (which is negative) rises (becomes less negative) from substitution but the income effect on a borrower reduces $c_1$ hence increases s (makes it less negative)? Let's be careful.

s = m1 - c1. Rise in r:
- Substitution: c1 falls, s rises
- If saver: wealth up, c1 up, s down. Ambiguous net saving.
- If borrower: wealth down, c1 down, s up (less borrowing). Both effects raise s.

So borrowers unambiguously borrow less when r rises; savers may save more or less. That's the standard result.

::: application Fisher separation, in one paragraph
If the consumer is also a firm, owning a production plan that transforms $m_1$ into $m_2$, Irving Fisher's separation theorem (1930, *The Theory of Interest*) says: with a perfect capital market at rate $r$, the production plan is chosen to maximise $W$, independently of $\beta$, and the consumption plan is then chosen as above given that $W$. Preferences do not affect the production decision; the interest rate does. The theorem fails as soon as the consumer cannot borrow freely, which is why development economics and corporate finance spend so much time on credit constraints. It is a benchmark, not a description of every household.
:::

## Evidence

**Hours.** Male hours in rich countries fell over the twentieth century as wages rose, which is the long-run backward bend; in late-twentieth-century micro data the intensive-margin (hours | working) elasticity for men is often near zero and the extensive-margin (participation) elasticity for married women is larger (Heckman and MaCurdy 1980; Blundell and MaCurdy 1999). Keane (2011) surveys Hicksian elasticities from structural models that are larger than the OLS numbers. The debate is live, and it is the subject of [[labour-economics/labour-supply]], not a settled input to this chapter. What the theory insists on is the split: a tax-compensated wage change is a substitution effect; an uncompensated one is substitution plus wealth.

**Saving.** Aggregate saving rates vary widely: in 2023 gross domestic saving was about 44 per cent of GDP in China, about 18 per cent in the United States, and about 15 per cent in the United Kingdom (World Bank WDI, accessed 2026). The two-period model with a single $\beta$ is not an explanation of those gaps; it is a budget identity plus a first-order condition. Life-cycle and precautionary motives, credit constraints and pension systems — all omitted here — dominate the empirical literature. The Euler equation [[#eq-euler]] is tested by asking whether consumption growth tracks $\beta(1+r)$; Hall (1978) showed that under quadratic utility and rational expectations consumption is a martingale, a claim subsequent work has qualified rather than buried.

::: history
**1930, Irving Fisher.** *The Theory of Interest* drew the two-period diagram, stated the FOC $u_1/u_2 = 1+r$, and proved the separation of investment from consumption preferences under perfect capital markets.

**1938, Paul Samuelson.** *A note on the measurement of utility* connected discounted utility over many periods with the two-period picture; Koopmans (1960) later axiomatised time-separable discounting.

**1962, Lionel McKenzie and others.** The endowment-Slutsky equation was standard in general-equilibrium treatments by the 1950s; the labour-supply application (the backward-bending curve) is already in Robbins (1930) and in the appendices of Hicks's *Value and Capital*.

**1978, Robert Hall.** *Stochastic implications of the life cycle–permanent income hypothesis* took the Euler equation to consumption data, opening the modern empirical literature on intertemporal choice.
:::

## Where this leads

Labour supply at a given wage is one side of the labour market; the other is the firm's demand for labour, which is a marginal-product schedule once we have production functions ([[microeconomics/production-and-cost]], [[labour-economics/labour-demand]]). Saving at a given $r$ is one side of the capital market; general equilibrium will determine $r$ together with wages ([[microeconomics/general-equilibrium]]). Adding uncertainty over $m_2$ produces precautionary saving and the demand for insurance ([[microeconomics/uncertainty]]). Adding many periods and a no-Ponzi condition produces the permanent-income hypothesis, taught in [[macroeconomics]] and in [[mathematical-economics/dynamic-optimisation]]. Credit constraints, mortgages and pensions are finance and public-economics topics; they are not solved by picking a point on [[#eq-pv-budget]].

::: summary
- With an endowment $\boldsymbol\omega$, the budget is $\mathbf{p}\cdot\mathbf{x} \le \mathbf{p}\cdot\boldsymbol\omega$. A price change revalues wealth. The Slutsky equation weights the income effect by *net* demand $x_j - \omega_j$.
- Labour–leisure: $c + w\ell = wT + y$. A wage rise makes leisure dearer (hours up) and the worker richer (hours down if leisure is normal). Labour supply can bend backwards.
- Cobb–Douglas with $y = 0$ gives constant hours; with $y > 0$ hours rise with $w$ towards an asymptote. The reservation wage is where the FOC holds at $\ell = T$.
- Two-period consumption: $c_1 + c_2/(1+r) = W$. The Euler equation $v'(c_1) = \beta(1+r)v'(c_2)$ governs the tilt. Savers: $r$ has opposing effects on $c_1$. Borrowers: both effects cut $c_1$.
- These are models of fictional agents with illustrative numbers. They are not advice about hours, saving, borrowing, pensions or mortgages.
:::

## Exercises

::: exercise Net trades {level=1 check="5"}
A consumer with $u = x_1^{1/2} x_2^{1/2}$ is endowed with $(10, 0)$ and faces $p = (1, 1)$. How many units of good 1 does she *sell*? (Enter the amount sold.)
::: solution
From [[#ex-farmer]], $x_1 = 5$, so she sells $10-5 = 5$.
:::
:::

::: exercise Full income {level=1 check="72"}
In [[#ex-cd-labour]], $T = 16$, $y = 8$, $w = 4$. What is full income $M$? (Enter $M$.)
::: solution
$M = wT + y = 64 + 8 = 72$.
:::
:::

::: exercise Hours at a wage {level=1 check="7"}
With the labour supply $L = 8 - 4/w$ of [[#ex-cd-labour]], how many hours are supplied at $w = 4$? (Enter hours.)
::: solution
$L = 8 - 4/4 = 7$.
:::
:::

::: exercise Reservation wage {level=2}
For $u = c^{1/2}\ell^{1/2}$, $T = 16$, $y = 8$, show that the reservation wage is $1/2$ by checking the FOC at $\ell = T$.
::: solution
At $L = 0$, $c = y = 8$, $\ell = 16$. $\mathrm{MRS}_{\ell c} = u_\ell/u_c = c/\ell = 8/16 = 1/2$. She is willing to work the first hour when $w \ge 1/2$. At $w = 1/2$, $L = 8 - 4/(1/2) = 8-8 = 0$, consistent.
:::
:::

::: exercise A borrower {level=2}
Using $u = \ln c_1 + \ln c_2$, $r = 0.25$, $m_1 = 40$, $m_2 = 100$, compute $W$, $c_1$, $c_2$ and $s$. Is the consumer a saver or a borrower?
::: solution
$W = 40 + 100/1.25 = 40+80 = 120$. Then $c_1 = 60$, $c_2 = 75$, $s = 40-60 = -20$. A borrower of 20.
:::
:::

::: exercise Interest and a borrower {level=2}
Continue the previous exercise: raise $r$ to $1$. Compute the new $c_1$ and $s$. Do both substitution and wealth effects cut $c_1$?
::: solution
$W' = 40 + 100/2 = 90$, $c_1' = 45$, $s' = 40-45 = -5$. Current consumption falls from 60 to 45; borrowing shrinks from 20 to 5. Substitution: future consumption is dearer to skip, so $c_1$ falls. Wealth: a borrower is poorer when $r$ rises, and $c_1$ is normal, so $c_1$ falls further. Both effects cut $c_1$ and cut borrowing.
:::
:::

::: exercise Endowment Slutsky, two goods {level=3}
A consumer with cash-income demands $x_1 = m/(2p_1)$, $x_2 = m/(2p_2)$ has endowment $\boldsymbol\omega = (6, 2)$. At $p = (1, 1)$, compute gross and net demands. Then, using [[#eq-slutsky-endowment]], find $\partial x_1/\partial p_1$ at this point (holding $\boldsymbol\omega$ fixed). Compare with the cash-income derivative at the same $m$.
::: hint
$m = 8$, $x_1 = 4$. Cash-income $\partial x_1/\partial p_1 = -m/(2p_1^2) = -4$. Net demand $x_1-\omega_1 = -2$. $\partial x_1/\partial m = 1/2$.
:::
::: solution
Wealth $m = 6+2 = 8$, $x = (4, 4)$, net $z = (-2, 2)$: she sells 2 of good 1. Cash-income own-price derivative $-m/(2p_1^2) = -4$. Endowment formula:

$$
\frac{\partial x_1}{\partial p_1}\Big|_{\boldsymbol\omega} = \frac{\partial h_1}{\partial p_1} - (x_1-\omega_1)\frac{\partial x_1}{\partial m}.
$$

Ordinary Slutsky: $\partial h_1/\partial p_1 = \partial x_1/\partial p_1 + x_1 \partial x_1/\partial m = -4 + 4\cdot 1/2 = -2$. Then endowment derivative $-2 - (-2)\cdot(1/2) = -2 + 1 = -1$. Directly: $x_1 = (p_1\cdot 6 + p_2\cdot 2)/(2p_1) = 3 + 1/p_1$ at $p_2=1$, so $\partial x_1/\partial p_1 = -1/p_1^2 = -1$ at $p_1=1$. The cash-income derivative was $-4$; selling the good has flattened the slope from $-4$ to $-1$ because the wealth effect now works against substitution.
:::
:::

::: exercise Derive Cobb–Douglas hours {level=3}
From $u = c^a \ell^{1-a}$ and budget $c + w\ell = wT + y$, derive $L(w, y) = aT - (1-a)y/w$. Check that this matches [[#ex-cd-labour]] when $a = 1/2$, $T = 16$, $y = 8$.
::: solution
Expenditure shares: $c = a M$, $w\ell = (1-a)M$, with $M = wT+y$. Then $\ell = (1-a)M/w = (1-a)T + (1-a)y/w$, so $L = T-\ell = aT - (1-a)y/w$. For $a = 1/2$, $T = 16$, $y = 8$: $L = 8 - 4/w$, as in the example. If $y = 0$, $L = aT$, constant.
:::
:::

::: exercise Euler equation with CRRA {level=3}
Let $v(c) = c^{1-\gamma}/(1-\gamma)$ for $\gamma > 0$, $\gamma \neq 1$ (log is the $\gamma \to 1$ limit). From $v'(c_1) = \beta(1+r) v'(c_2)$ derive the consumption-growth formula $c_2/c_1 = \bigl(\beta(1+r)\bigr)^{1/\gamma}$. Interpret $\gamma$.
::: hint
$v'(c) = c^{-\gamma}$.
:::
::: solution
$c_1^{-\gamma} = \beta(1+r)\, c_2^{-\gamma}$, so $(c_2/c_1)^\gamma = \beta(1+r)$, hence $c_2/c_1 = \bigl(\beta(1+r)\bigr)^{1/\gamma}$. The parameter $\gamma$ is the coefficient of relative risk aversion and the inverse of the elasticity of intertemporal substitution. A larger $\gamma$ makes consumption growth less sensitive to $\beta(1+r)$: the consumer is less willing to tilt the path. For $\gamma = 1$ the formula becomes $c_2/c_1 = \beta(1+r)$, matching log utility.
:::
:::
