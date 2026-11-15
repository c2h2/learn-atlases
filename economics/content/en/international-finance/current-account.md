A farmer whose harvest is high this year and will be ordinary next year does not eat the whole extra crop. She stores some, or she sells some and buys a claim. A country is in the same position, with the rest of the world as the store. The **intertemporal approach** to the current account takes that analogy seriously: $CA = S - I$ is not only an identity, from [[international-finance/balance-of-payments]], but the outcome of a choice. The country borrows when income is temporarily low, when investment is temporarily productive, or when it is impatient relative to the world. It lends in the opposite cases. Whether a deficit is a problem is then a question about *which* of those cases we are in, and about whether the implied path of net foreign assets can be paid. This chapter is that question. Numbers are illustrative except where a source is named; they are for education, not a forecast and not advice.

The closed-economy cousin is [[macroeconomics/consumption-and-saving]]: Fisher two-period choice, permanent-income, and the Euler equation. The new objects are a world real interest rate $r^*$ that a small country takes as given, and a current account that need not be zero period by period.

## A two-period small open economy

A small country lives for two periods, $1$ and $2$, then ends. There is one good, tradable, used for consumption and, when we add it, investment. The country takes the world real interest rate $r^*$ as given. Endowment income is $y_1, y_2$ (later, output will be produced). Net foreign assets at the start of period 1 are $B_0$; we often set $B_0 = 0$ to start. There is no uncertainty in the baseline.

::: definition Intertemporal budget {#def-itbc}
The country's **intertemporal budget constraint** is that the present value of consumption equals the present value of output plus initial net foreign assets, with no leftover debt (a **no-Ponzi** condition):

$$
c_1 + \frac{c_2}{1+r^*} = y_1 + \frac{y_2}{1+r^*} + (1+r^*)B_0.
$$ {#eq-itbc}

Period budgets are $c_1 + B_1 = y_1 + (1+r^*)B_0$ and $c_2 = y_2 + (1+r^*)B_1$, with $B_2 = 0$. The current account in period 1 is $CA_1 = y_1 + r^* B_0 - c_1 = B_1 - B_0$ when there is no investment and no government.
:::

The right-hand side of [[#eq-itbc]] is **wealth**. Consumption can be tilted relative to income; it cannot exceed wealth.

::: proposition Permanent-income consumption, log utility {#prop-pi}
Let the representative household maximise $u(c_1)+\beta u(c_2)$ with $u(c)=\ln c$, subject to [[#eq-itbc]], and suppose $\beta(1+r^*)=1$ (the world rate equals the discount rate). Then $c_1 = c_2 = \bar y$, where $\bar y$ is the annuity value of wealth:

$$
\bar y = \frac{1+r^*}{2+r^*}\left(y_1 + \frac{y_2}{1+r^*} + (1+r^*)B_0\right).
$$

The current account in period 1 is $CA_1 = (y_1 + r^* B_0) - \bar y$. A *temporary* rise in $y_1$, with $y_2$ fixed, is mostly saved: $CA_1$ rises by nearly the extra income. A *permanent* rise, $y_1$ and $y_2$ up by the same amount, is consumed and $CA_1$ is (approximately) unchanged.
:::

::: proof
The Euler equation for log utility is $c_2/c_1 = \beta(1+r^*)$. With $\beta(1+r^*)=1$, $c_1=c_2$. Substitute into [[#eq-itbc]]: $c_1\bigl(1+1/(1+r^*)\bigr) = W$, so $c_1 = (1+r^*)W/(2+r^*)$, which is $\bar y$. Then $CA_1 = y_1 + r^*B_0 - c_1$. A temporary extra $dy_1$ raises $W$ by $dy_1$ and $\bar y$ by $\frac{1+r^*}{2+r^*} dy_1 < dy_1$, so $dCA_1 = dy_1\bigl(1-\frac{1+r^*}{2+r^*}\bigr) = \frac{1}{2+r^*} dy_1 > 0$. A permanent extra $dy$ in both periods raises $W$ by $dy\bigl(1+1/(1+r^*)\bigr)$ and $\bar y$ by exactly $dy$ (when $B_0=0$), so $dCA_1 = 0$.
:::

::: example A bumper harvest {#ex-harvest}
Let $B_0 = 0$, $r^* = 0.10$, $\beta(1+r^*)=1$, $y_1 = 120$, $y_2 = 100$, log utility. Compute wealth, $c_1$, $c_2$ and $CA_1$. Compare with the path $y_1=y_2=100$.
::: solution
Wealth is $W = 120 + 100/1.1 = 120 + 90.909 = 210.909$. Then $c_1 = c_2 = 1.1 \times 210.909 / 2.1 = 232/2.1 = 110.476$. (Exactly: $W = 2320/11$, $c_1 = 2320/21 = 110.476\ldots$, $CA_1 = 120 - 2320/21 = 200/21 \approx 9.52$.) Palmia saves about $9.52$ of the extra $20$ of period-1 income. In the flat path $y_1=y_2=100$, $W = 100 + 100/1.1 = 190.909$, $c_1=100$, $CA_1=0$. The bumper harvest is a *temporary* shock; the country runs a surplus and carries $B_1 = 9.52$ into period 2, where it consumes $100 + 1.1\times 9.52 \approx 110.48$, smoothing the extra crop.
:::
:::

::: widget plot
f: 1.1*(a + 100/1.1 - x); 100
sliders: a=120:80:160
x: 80, 160
y: 70, 160
labels: \text{budget } c_2=(1+r^*)(W-c_1); \text{endowment } y_2
caption: The budget is $c_2=1.1(a+100/1.1-c_1)$. Drag period-1 income $a$. The endowment is the point $(a,100)$; with $\beta(1+r^*)=1$ consumption sits on the $45^\circ$ line $c_1=c_2$. A rise in $a$ moves the endowment right and the budget out; consumption rises by less than $a$, so the current account moves into surplus. Invented numbers; $r^*=0.10$.
:::

The widget's second function is a horizontal line at $y_2=100$. The intercept of the budget at $c_2=0$ is wealth $W=a+100/1.1$. Plotting $c_2$ against $c_1$ would want $c_2 = 1.1(W-c_1)$, which is the first function of $x=c_1$.

::: example Impatience {#ex-impatient}
Keep $y_1=y_2=100$, $r^*=0.10$, $B_0=0$, but now $\beta = 1/1.20$, so $\beta(1+r^*) = 1.1/1.2 < 1$. With log utility the Euler equation is $c_2/c_1 = \beta(1+r^*)$. Compute $c_1$ and $CA_1$.
::: solution
$c_2 = (1.1/1.2)\, c_1 = (11/12) c_1$. The budget is $c_1 + c_2/1.1 = 190.909$. Substitute: $c_1 + (11/12)c_1 / 1.1 = 190.909$. Now $(11/12)/1.1 = 11/13.2 = 5/6 \approx 0.833$, so $c_1(1+0.833)=190.909$, $c_1 \approx 104.13$, $CA_1 \approx 100-104.13 = -4.13$. Impatient Palmia borrows. The world is more patient than Palmia; Palmia runs a deficit in period 1 and repays in period 2. A deficit is not, in this example, a failed harvest. It is a preference.
:::
:::

## Investment and the current account

Add a production function. Period-1 output is still an endowment $y_1$ (or a predetermined capital stock). Period-2 output is $y_2 = f(k)$, with $k$ installed in period 1 at price $1$ of the good. Investment is $I = k$ if we start from zero capital and there is no depreciation; more generally $I = k - (1-\delta)k_0$. The country can import capital goods: $I$ need not equal $S$.

::: proposition Investment separates from consumption {#prop-separation}
A small country facing $r^*$, with $f$ strictly concave, chooses $k$ to maximise the present value of output net of investment: $f'(k) = r^*$ in the two-period case with $\delta=1$ and $k$ gone after period 2 (or $f'(k)=r^*+\delta$ with a more durable stock). Consumption then spreads the resulting wealth as in [[#prop-pi]]. A rise in the *productivity* of $k$, or a fall in $r^*$, raises $I$ and moves $CA$ toward deficit, *holding the consumption path's wealth effect separate*. Saving and investment are determined by different conditions; their difference is the current account.
:::

::: proof
Profit-maximising investment: $\max_k \frac{f(k)}{1+r^*} - k$ (the two-period, $\delta=1$ case). The first-order condition is $f'(k)=r^*$. Wealth becomes $W = y_1 - k + f(k)/(1+r^*) + (1+r^*)B_0$, which is larger at the optimal $k$ than at any other $k$. Consumption is then the same problem as [[#prop-pi]] on this $W$. A productivity shift that raises $f'(k)$ at every $k$ raises optimal $k$, so $I$ rises. If $y_1$ is unchanged, $CA_1 = y_1 - c_1 - I$ falls unless $c_1$ falls one-for-one, which it does not: part of the extra wealth is consumed in period 1. So $CA$ moves toward deficit when there is an investment boom at unchanged current output.
:::

This is why a current-account deficit that accompanies a rise in $I$ is a different object from a deficit that accompanies a fall in $S$. Australia and Canada have often been in the first category; a consumption boom on the back of a house-price rally is closer to the second. The identity $CA=S-I$ does not tell you which; the national accounts' split of $S$ and $I$ does.

::: example An investment boom {#ex-invest}
$y_1 = 100$, $r^*=0.10$, $\beta(1+r^*)=1$, $B_0=0$. Without investment, $y_2=100$ and $CA_1=0$, $c_1=100$. Now a project costs $I=20$ in period 1 and returns $33$ in period 2 (a rate of return of $65$ per cent, well above $r^*$). Assume the project is taken, and remaining $y_2$ is still $100$, so $y_2^{\text{total}}=133$. Compute new wealth, $c_1$ and $CA_1$.
::: solution
$W = 100-20 + 133/1.1 = 80 + 120.909 = 200.909$. Then $c_1 = 1.1 \times 200.909 / 2.1 \approx 105.24$. $CA_1 = 100 - 105.24 - 20 = -25.24$. The country borrows for two reasons: it invests $20$, and it consumes $5.24$ of the project's present-value gain ($W$ rose from $190.91$ to $200.91$). A headline deficit of $25$ is "bad" only if one ignores the $33$ that arrives next period. NPV of the project is $-20+33/1.1 = 10$, which is exactly the rise in $W$.
:::
:::

::: warning A deficit is not a verdict
Calling a current-account deficit "unsustainable" without naming $I$, $y_2$, $r^*$ and $B_0$ is naming a number, not a constraint. [[#def-itbc]] is the constraint. A deficit that finances consumption when $y_2$ will be *lower* than $y_1$ can be smoothing, and a deficit that finances consumption when $y_2$ will be *lower still* because the country is shrinking can violate [[#eq-itbc]] at any reasonable $r^*$. The word "unsustainable" should mean "the implied $B$ path is inconsistent with the no-Ponzi condition at the interest rates the country actually faces", not "CA is negative".
:::

## Government, twin deficits, and Ricardian equivalence

Put government back. $S_g = T - G$ in each period, and the government also faces an intertemporal budget: the present value of taxes equals the present value of spending plus initial public debt. If households are Ricardian — they see through the government's budget, as in [[macroeconomics/consumption-and-saving]] — a tax cut financed by public borrowing raises $S_p$ one-for-one and leaves $CA$ unchanged. If households are not Ricardian, or are liquidity constrained, the tax cut raises $c_1$ and $CA$ moves toward deficit. [[international-finance/balance-of-payments#eq-twin]] is the identity; this paragraph is the behaviour.

Empirically, the twin-deficits hypothesis — that $G-T$ and $CA$ move together — is mixed. For the United States, the 1980s and the 2000s saw both deficits together; the late 1990s saw a budget surplus and a current-account deficit (BEA NIPA and ITA). Cross-country panels find a positive but less-than-one-for-one association (Chinn and Prasad, *Journal of International Money and Finance*, 2003; Blanchard and Giavazzi on Europe, *Brookings*, 2002). The identity requires that $S_p-I$ not offset $G-T$ fully; the data say it often offsets some of it.

## Sustainability of net foreign assets

Infinite horizon, still no uncertainty. Let $B_t$ be NIIP at the end of $t$. The no-Ponzi condition is that the present value of $B$ does not explode: $\lim_{T\to\infty} B_T / (1+r^*)^T = 0$. Iterating the flow constraint $B_t = (1+r^*)B_{t-1} + NX_t$ (here $NX$ includes net transfers, and primary income is $r^* B_{t-1}$) gives

$$
-(1+r^*)B_0 = \sum_{t=1}^{\infty} \frac{NX_t}{(1+r^*)^{t-1}},
$$ {#eq-pv-nx}

or: a net debtor must run *trade* surpluses in present value. Current-account deficits can continue forever if they are not too large relative to growth, as [[international-finance/balance-of-payments#prop-stable-b]] already showed for the ratio $b=B/Y$. The two statements are consistent: a stable negative $b$ with $g>0$ is a growing *level* of debt whose ratio is constant, and the trade *surpluses* that service it are the $r^*-g$ term in the standard debt-dynamics formula.

::: proposition Stabilising $b$ with growth {#prop-dyn}
Let $y$ grow at $g < r^*$, and let $tb = NX/Y$ be the trade-balance ratio (excluding interest). Then

$$
b_t = \frac{1+r^*}{1+g} b_{t-1} + tb_t,
$$

and a constant $b$ requires $tb = -\frac{r^*-g}{1+g} b$. A net debtor ($b<0$) must run a trade *surplus* of that size. The current-account ratio is $CA/Y = tb + \frac{r^*}{1+g}b$ (interest on last period's stock, relative to this period's $Y$), which reduces to $\frac{g}{1+g} b$ at a stable $b$, recovering [[international-finance/balance-of-payments#eq-stable-ca]].
:::

::: proof
$B_t = (1+r^*)B_{t-1} + NX_t$. Divide by $Y_t = (1+g)Y_{t-1}$: $b_t = (1+r^*)b_{t-1}/(1+g) + tb_t$. Set $b_t=b_{t-1}=b$ and solve for $tb$. Then $CA_t = NX_t + r^* B_{t-1}$, so $CA_t/Y_t = tb + r^* b_{t-1}/(1+g)$. At $b$ constant this is $tb + r^* b/(1+g) = -\frac{r^*-g}{1+g}b + \frac{r^*}{1+g}b = \frac{g}{1+g}b$.
:::

::: example The US ratio, mechanically {#ex-us-b}
Take $b = -0.88$, $g = 0.04$, $r^* = 0.06$ as round numbers, not forecasts. (a) What trade-balance ratio stabilises $b$? (b) What current-account ratio stabilises $b$? Compare (b) with the 2025 US current-account deficit of $3.6$ per cent of GDP (IMF ESR 2026).
::: solution
(a) $tb = -\frac{0.06-0.04}{1.04}\times(-0.88) = \frac{0.02}{1.04}\times 0.88 \approx 0.0169$, a trade *surplus* of about $1.7$ per cent of GDP. (b) $CA/Y = \frac{0.04}{1.04}\times(-0.88) \approx -0.0338$, a current-account *deficit* of about $3.4$ per cent of GDP. The 2025 deficit of $3.6$ per cent is near this mechanical benchmark *if* $g=0.04$ and valuation is ignored. The US has in fact often run a *trade* deficit, not a surplus, and has relied on valuation (the exorbitant privilege of [[international-finance/balance-of-payments]]) to keep $b$ from tracking cumulative $CA$. Whether that valuation continues is a different question from the identity. The example is arithmetic on published ratios, not a judgment that the US position is safe or unsafe.
:::
:::

## Global imbalances

Add up every country's $CA$ and, in a closed world, the sum is zero (up to the statistical discrepancy, which has been awkwardly large: the world sometimes appears to be running a surplus with itself). A US deficit is someone else's surplus. In the mid-2000s the pairing was the United States against China, Japan, Germany and oil exporters (IMF WEO historical series). Bernanke's 2005 "saving glut" speech put the surplus countries' extra saving first; another account puts US fiscal and housing-credit behaviour first. Both can be true at once: desired saving rose in Asia after 1997, and desired investment (housing) rose in the United States. The interest rate that clears the *world* market for funds is no longer $r^*$ taken as given; it is an endogenous world $r$ in a two-country model (Obstfeld and Rogoff, *Brookings*, 2005; Caballero, Farhi and Gourinchas, *AER*, 2008, on safe-asset demand).

After 2008, China's surplus/GDP fell; Germany's stayed high; oil balances followed the oil price; the United States deficit shrank and then widened again (IMF WEO, accessed 2026). The IMF *External Sector Report* labels some of these "stronger" or "weaker" than a staff norm. The norm is a regression plus judgment. This course uses the *Report* for the 2025 ratios and does not treat the staff gaps as facts of nature.

::: quiz
A small country with $\beta(1+r^*)=1$ and log utility has a purely temporary rise in $y_1$. What happens to $CA_1$?
- [ ] It is unchanged, because consumption smoothing is complete
- [x] It moves toward surplus: most of the extra $y_1$ is saved
- [ ] It moves toward deficit: the country invests the extra
- [ ] It moves one-for-one with $y_1$ into consumption, so $CA_1$ is unchanged
::: solution
[[#prop-pi]]: $dCA_1 = dy_1/(2+r^*)>0$. Consumption rises by only a fraction of the extra income. There was no investment in that proposition. A permanent rise would have left $CA_1$ unchanged.
:::
:::

::: intuition The current account is a shock absorber
In a closed economy a temporary harvest must be stored as physical capital or eaten. In an open economy it can be stored as a foreign bond. That is why capital mobility is valuable even when average $CA$ is near zero: it is the *variance* of $CA$, the absorber, that does the work. Feldstein–Horioka, from the previous chapter, says the absorber is used less than a frictionless model predicts. The intertemporal approach is the benchmark against which that puzzle is measured.
:::

## Evidence

**Consumption-tilting and smoothing.** Obstfeld and Rogoff (*Foundations*, 1996, ch. 1–3) and the tests that followed (Ghosh 1995; Nason and Rogers 2006) find that current accounts do move with temporary income and with fiscal shocks, but by less than the simple two-period model predicts. Excess sensitivity of consumption, habit, and limited access to foreign funds all cut the $CA$ response.

**Investment-driven deficits.** Blanchard and Giavazzi (2002) documented current-account deficits in Greece and Portugal in the 1990s–2000s that looked like catching-up investment inside a newly integrating Europe; the same deficits look, after 2010, like a capital-flow boom that reversed. Both readings use this chapter's split; they disagree about $y_2$.

**Sudden stops.** When $FA^{\mathrm{in}}$ reverses, $CA$ must jump toward surplus at whatever $r$ and $Y$ will bear. Calvo (1998, *Journal of Applied Economics*) named the event. Emerging-market episodes — Mexico 1994, East Asia 1997, Argentina 2001, and the 2008 reversal — are [[international-finance/crises]]. The intertemporal budget still holds; it holds at a worse $r^*$ and a lower $Y$.

**Low- and middle-income patterns.** Kenya and Ghana have typically run current-account deficits with a large $I$ component and official plus FDI financing (IMF IFS). Chile's $CA$ moves with copper and with mining investment. The Philippines' surplus, in some years, is remittances ($NUT$) rather than $NX$. The two-period model's $y_1, y_2$ can stand in for a commodity price, a remittance, or a harvest; the algebra does not care. The financing mix cares, because FDI, portfolio debt and official loans do not reverse at the same speed.

::: widget plot
f: 100+8*x; 180-12*x
sliders: a=180:140:220
x: 0, 12
y: 40, 220
labels: \text{saving } S(r); \text{investment } I(r)
caption: Saving $S=100+8r$ and investment $I=a-12r$, with $r$ on the horizontal axis in per cent. Drag $a$ to shift investment. At the world $r^*=5$ (look at $x=5$) the vertical gap $S-I$ is the current account. An investment boom (higher $a$) opens a deficit at unchanged $r^*$. Invented schedules.
:::

(The usual textbook picture has $r$ on the *vertical* axis. The widget's convention is the plotter's: $x$ is the interest rate. Read the gap at $x=5$.)

## Where this leads

The two-period model takes $r^*$ and $Y$ as given in the small-country case. In the short run $Y$ is demand-determined and $E$ (hence $Q$) moves, so $NX$ and $CA$ move with policy: [[international-finance/mundell-fleming]]. A peg plus open capital forces $r$ to $r^*$ and makes the absorber work through $Y$ and reserves: [[international-finance/exchange-rate-regimes]]. When the absorber is shut — when $FA^{\mathrm{in}}$ cannot be the counterpart of $CA$ at the old $r^*$ — the economy is in [[international-finance/crises]]. Cross-country patterns of who lends to whom are also a fact about the international monetary system: [[international-finance/international-monetary-system]].

::: history
The intertemporal approach is a 1980s consolidation of older ideas. Fisher's *The Theory of Interest* (1930) is the two-period closed-economy skeleton. Sachs (1981, *Journal of Development Economics*; 1982, *Carnegie-Rochester*) and Obstfeld (1982) wrote the small-open-economy current account as a consumption-smoothing problem. Svensson and Razin (1983, *JPE*) and Obstfeld and Rogoff's 1996 *Foundations* made it the graduate standard. The twin-deficits debate is older (the US 1980s) and still unsettled as a causal claim; the identity is not.
:::

::: summary
- The intertemporal budget says the present value of consumption equals wealth. No-Ponzi rules out rolling debt forever without running trade surpluses in present value.
- With $\beta(1+r^*)=1$ and log utility, consumption is the annuity value of wealth. Temporary income is smoothed through $CA$; permanent income is consumed; impatience produces a deficit.
- Investment is set by $f'(k)=r^*$ (or $r^*+\delta$). An investment boom moves $CA$ toward deficit even if consumption smoothing is perfect. $S$ and $I$ have different first-order conditions.
- A stable $b=B/Y$ needs $CA/Y = \frac{g}{1+g}b$ and a trade surplus of $\frac{r^*-g}{1+g}|b|$ if $b<0$. US 2025 figures are near the mechanical $CA$ benchmark *if* valuation is ignored.
- Twin deficits are an identity at given $S_p-I$ and a mixed empirical regularity. Ricardian households would break the comovement.
- The world's current accounts sum to zero. "Global imbalances" are a joint fact about several countries' $S$ and $I$, not a US fact alone.
:::

## Exercises

::: exercise Bumper-crop current account {level=1 check="9.52"}
In [[#ex-harvest]], $CA_1 = 200/21$. Enter the value to two decimals.
::: solution
$200/21 \approx 9.52$. The country saves $9.52$ of a $20$ temporary extra harvest.
:::
:::

::: exercise Flat path {level=1 check="0"}
$y_1=y_2=100$, $B_0=0$, $\beta(1+r^*)=1$, log utility. Enter $CA_1$.
::: solution
Consumption equals income in each period, $CA_1=0$.
:::
:::

::: exercise Annuity factor {level=1 check="110.476"}
$W=210.909$, $r^*=0.10$, $\beta(1+r^*)=1$. Enter $c_1 = (1+r^*)W/(2+r^*)$ to three decimals.
::: solution
$1.1 \times 210.909 / 2.1 \approx 110.476$, as in [[#ex-harvest]].
:::
:::

::: exercise Temporary-shock MPC {level=2 check="0.524"}
From [[#prop-pi]], the period-1 MPC out of a temporary $dy_1$ is $(1+r^*)/(2+r^*)$. For $r^*=0.10$, enter it to three decimals.
::: solution
$(1+r^*)/(2+r^*) = 1.1/2.1 \approx 0.524$. The rest, $1/(2+r^*)\approx 0.476$, is the rise in $CA_1$ per unit of temporary income.
:::
:::

::: exercise Investment-boom CA {level=2 check="-25.24"}
In [[#ex-invest]], enter $CA_1$ to two decimals.
::: solution
$c_1 \approx 105.24$ and $I=20$ on $y_1=100$ give $CA_1 = 100-105.24-20 = -25.24$.
:::
:::

::: exercise Stabilising trade balance {level=2 check="1.69"}
Using [[#ex-us-b]], $b=-0.88$, $r^*=0.06$, $g=0.04$. Enter the stabilising trade-balance ratio in *per cent* of GDP, to two decimals (a surplus of $1.69$ per cent is entered as $1.69$).
::: solution
$tb = -\frac{r^*-g}{1+g}b = -\frac{0.02}{1.04}\times(-0.88) = 0.016923$, or $1.69$ per cent of GDP. A net debtor needs a trade surplus to hold $b$ still when $r^*>g$.
:::
:::

::: exercise Euler and impatience {level=3}
$y_1=y_2=100$, $r^*=0.10$, $B_0=0$, $u=\ln$. Now $\beta = 1/1.20$. (a) Write the Euler equation and the budget. (b) Solve for $c_1$ and $CA_1$. (c) Interpret the deficit without using the word "unsustainable".
::: hint
$c_2/c_1 = \beta(1+r^*)=1.1/1.2$. Then $c_1 + c_2/(1.1) = 100+100/1.1$.
:::
::: solution
(a) $c_2 = (1.1/1.2)c_1$. Budget: $c_1 + c_2/1.1 = 190.909$. (b) $c_1 + \frac{1.1}{1.2}\frac{c_1}{1.1} = 190.909$, so $c_1 + c_1/1.2 = 190.909$, $c_1(1+5/6)=190.909$, $c_1(11/6)=190.909$, $c_1 \approx 104.13$. $CA_1 \approx -4.13$. (c) Palmia is less patient than the world. It consumes earlier, borrows at $r^*$, and repays in period 2 out of the same $y_2=100$. The path satisfies [[#eq-itbc]] by construction. The deficit is a preference, not a failed harvest and not a violation of the intertemporal budget.
:::
:::

::: exercise Present-value trade surpluses {level=3}
A country starts with $B_0 = -100$. The world rate is $r^*=0.05$. There is no growth. (a) Using [[#eq-pv-nx]], what constant trade balance $NX$ (level, not ratio) satisfies the intertemporal budget? (b) What is the associated current account? (c) Why is $CA$ not equal to $NX$?
::: hint
With constant $NX$ and no growth, the sum in [[#eq-pv-nx]] is a perpetuity. $CA = NX + r^* B$ along a constant-$B$ path.
:::
::: solution
(a) $-(1.05)(-100) = NX \times (1+1/1.05+1/1.05^2+\cdots) = NX \times 1.05/0.05$, so $105 = NX \times 21$, $NX = 5$. A perpetuity of $5$ starting immediately has present value $5\times 1.05/0.05 = 105$, which covers the opening debt plus one period of interest. Equivalently, to hold $B$ at $-100$, $NX + r^* B = 0$, so $NX = 0.05 \times 100 = 5$. (b) $CA = NX + r^* B = 5 - 5 = 0$. (c) The country pays $5$ of interest and runs a trade surplus of $5$, so it is not *adding* to net debt: $CA=0$ and $B$ is constant. The trade surplus services the debt; the current account is the change in $B$ (here zero). Calling for a current-account surplus to "pay down" the debt is a different, stricter goal than sustainability of the *level*.
:::
:::

