A closed-economy IS–LM model of [[macroeconomics/is-lm]] has two endogenous variables, $Y$ and $i$, and no exchange rate. An open economy adds $E$ and, through net exports, a second link from $E$ to $Y$. Something has to give. Under a **float**, the money supply stays with the central bank and $E$ adjusts. Under a **peg**, $E$ stays with the central bank and the money supply adjusts. The **Mundell–Fleming model** is IS–LM with those two extra sentences. It is a short-run model: prices are sticky, output is demand-determined, and UIP (or a less-than-perfect capital-flow schedule) prices $E$. It is not a theory of the long-run real exchange rate — that was [[international-finance/ppp]] — and it is not a theory of optimal borrowing — that was [[international-finance/current-account]]. It is the workhorse for "what happens this year if the government spends more, or the central bank eases, and the capital account is open". The numbers below are invented; the policy conclusions are properties of the model, not recommendations.

## The model

Three markets, one of which may be silenced by a peg.

**Goods (IS).** With sticky $P$ the real exchange rate $Q$ moves with $E$. Net exports rise when $E$ rises (home depreciates) and fall when $Y$ rises:

$$
Y = C(Y-T) + I(i) + G + NX(Y, Y^*, E).
$$ {#eq-is}

$C$ increases in disposable income, $I$ decreases in $i$, $NX$ decreases in $Y$ and increases in $E$ and in $Y^*$. Solving for $i$ as a function of $Y$ gives a downward-sloping IS curve that *shifts right* when $G$ rises or $E$ rises.

**Money (LM).** $M/P = L(Y,i)$, $P$ sticky, $M$ exogenous under a float and endogenous under a peg. LM slopes up in $(Y,i)$ space.

**Foreign exchange.** With **perfect capital mobility** and static or UIP expectations of a constant $E^e=E$ in the very short run (no expected depreciation), uncovered interest parity collapses to

$$
i = i^*.
$$ {#eq-i-star}

The BP schedule is horizontal at $i^*$. With **imperfect** mobility, net capital inflows increase in $i-i^*$, and BP slopes up: a higher $Y$ worsens $CA$ and needs a higher $i$ to attract offsetting inflows.

::: definition Mundell–Fleming {#def-mf}
The **Mundell–Fleming model** is the triple ([[#eq-is]], LM, [[#eq-i-star]]) under perfect mobility, or the same with an upward-sloping BP under imperfect mobility, at a given $P$. Under a **float**, $M$ is given and $(Y,i,E)$ are endogenous. Under a **peg**, $E$ is given and $(Y,i,M)$ are endogenous. Assumptions: sticky prices, demand-determined output, a small country taking $i^*$ and $Y^*$ as given, and, in the perfect-mobility version, UIP with no expected depreciation.
:::

The last assumption is the model's knife-edge. If $E$ has just jumped, UIP says it is *expected to change*. The very-short-run Mundell–Fleming experiment treats that expected change as zero, so $i=i^*$. Dornbusch's overshooting model, below, puts the expected change back.

::: example A linear Palmia {#ex-linear}
IS: $Y = 800 - 40 i + 2 E$. LM, at $M/P = 300$: $Y = 600 + 50 i$. Perfect mobility, $i^* = 4$ (per cent). $E$ is palms per foreign unit. (a) Find the floating equilibrium $(Y,i,E)$. (b) Confirm that the goods market, money market and UIP all hold.
::: solution
UIP forces $i=4$. LM then gives $Y = 600 + 50\times 4 = 800$. IS gives $800 = 800 - 40\times 4 + 2 E = 640 + 2E$, so $E=80$. Check: IS $800-160+160=800$; LM $600+200=800$; $i=i^*=4$. Palmia floats at output $800$, the world interest rate, and $E=80$.
:::
:::

::: widget plot
f: (800 + 2*e - x)/40; (x-600)/50; 4
sliders: e=80:40:140
x: 400, 1200
y: 0, 12
labels: \text{IS}; \text{LM}; i^*
caption: Palmia's IS–LM with $i^*=4$ as a horizontal line. $x$ is output, $y$ is the interest rate. Drag the exchange rate $e$ to shift IS: a depreciation (higher $e$) moves IS right. Under a float, $e$ must settle where IS, LM and $i^*$ meet — at $x=800$, $y=4$ when $e=80$. Under a peg you choose $e$ and LM must shift (not shown) to meet IS on $i^*$. Invented schedules.
:::

## Policy under a float

**Fiscal expansion.** Raise $G$. IS wants to shift right. At the old $E$, $Y$ and $i$ would both rise, as in closed-economy IS–LM. But $i$ cannot rise: capital would flood in. The inflow appreciates the currency ( $E$ falls ), $NX$ falls, and IS is pushed back until $i$ is again $i^*$. In the perfect-mobility limit, $Y$ is back where LM and $i=i^*$ put it. Fiscal policy does not raise output under a float with perfect capital mobility. It *crowds out net exports* one-for-one with $G$, at unchanged $Y$.

**Monetary expansion.** Raise $M$. LM shifts right. At the old $E$, $i$ would fall. Capital would flow out, $E$ would rise (depreciation), $NX$ would rise, and IS would follow to the right until $i=i^*$ again, now at a *higher* $Y$. Monetary policy is effective under a float. The transmission is the exchange rate, not the closed-economy cost of capital alone.

::: proposition Fiscal and monetary policy, float, perfect mobility {#prop-float}
In [[#def-mf]] under a float and $i=i^*$: a rise in $G$ leaves $Y$ unchanged and lowers $E$ (appreciation); a rise in $M$ raises $Y$ and raises $E$ (depreciation). LM plus $i=i^*$ already determine $Y$; IS is the residual that determines $E$.
:::

::: proof
From LM and $i=i^*$, $M/P = L(Y,i^*)$. $P$ and $i^*$ given, so $Y$ is determined by $M$ alone. Fiscal variables do not enter. A higher $M$ requires a higher $Y$ to raise money demand. Given that $Y$, IS determines the $E$ that makes goods-market demand equal $Y$. Higher $G$ requires a lower $NX$ and therefore a lower $E$ (appreciation). Higher $M$, by raising $Y$, requires a higher $E$ to raise $NX$ enough to match, unless $I$ and $C$ already do the work — and with $i$ stuck at $i^*$, $I$ does not rise, so $E$ must depreciate.
:::

::: example Palmia floats, two shocks {#ex-float-shocks}
Start from [[#ex-linear]]. (a) $G$ rises so that the IS intercept on $Y$ at given $i,E$ is $820$ rather than $800$: new IS is $Y = 820 - 40 i + 2 E$. Find $(Y,i,E)$. (b) Instead, $M/P$ rises to $350$, so LM becomes $Y = 700 + 50 i$. Find $(Y,i,E)$ at the original IS.
::: solution
(a) $i=4$, $Y=800$ still (LM unchanged). Then $800 = 820 - 160 + 2E$, so $2E=140$, $E=70$. The palm appreciates from $80$ to $70$. Net exports fall by $2\times 10 = 20$, which is exactly the rise in $G$. (b) $i=4$, $Y = 700+200=900$. Then $900 = 800 - 160 + 2E$, so $2E=260$, $E=130$. The palm depreciates from $80$ to $130$, and output rises $100$. Monetary expansion works; fiscal expansion, in this perfect-mobility float, rearranges demand toward the government and away from net exports.
:::
:::

## Policy under a peg

The central bank stands ready to buy and sell foreign exchange at a fixed $E$. UIP still wants $i=i^*$. If the bank tries to set a different $i$ by changing $M$, reserves flow until $M$ is back where $i=i^*$. Monetary policy is ineffective: $M$ is endogenous. Fiscal policy is effective: a rise in $G$ shifts IS right, $Y$ rises along $i=i^*$, and the extra money demand is accommodated by reserve *inflows* (the extra $Y$ would have raised $i$, attracting capital, which the bank converts into $M$).

::: proposition Fiscal and monetary policy, peg, perfect mobility {#prop-peg}
In [[#def-mf]] under a peg and $i=i^*$: a rise in $G$ raises $Y$ and raises $M$ (reserve inflow); a rise in *attempted* $M$ is undone by reserve outflow and leaves $Y$ unchanged. IS plus $i=i^*$ determine $Y$; LM is the residual that determines $M$.
:::

::: proof
$E$ is given, so IS plus $i=i^*$ determine $Y$. Fiscal variables enter IS, monetary ones do not. LM then determines the $M$ that is demanded at that $(Y,i^*)$. A higher $G$ raises $Y$ and required $M$; the bank buys foreign exchange (or is forced to, as capital inflows arrive) and $M$ rises. An open-market purchase of domestic assets, trying to raise $M$, would lower $i$ below $i^*$, provoke an incipient outflow, and force the bank to sell foreign exchange until $M$ is back.
:::

::: example Palmia pegs at $E=80$ {#ex-peg-shocks}
Same schedules as [[#ex-linear]], now with $E$ fixed at $80$. (a) The same fiscal shift as [[#ex-float-shocks]](a): IS becomes $Y=820-40i+2E$. Find $Y$ and the implied $M/P$ from the original LM relation $M/P = 0.5 Y - 25 i$. (b) Why a monetary expansion cannot change $Y$.
::: solution
(a) $i=4$, $E=80$, so $Y = 820 - 160 + 160 = 820$. Output rises by $20$, the full IS shift, because $E$ is not allowed to appreciate. Money demand: $M/P = 0.5\times 820 - 25\times 4 = 410-100=310$, up from $300$. Reserves (and $M$) have risen by $10$ in these units. (b) Any attempt to set $M/P$ above $300$ at the original $Y=800$ would require $i<4$, which is inconsistent with the peg and open capital. Reserves flow out until $M/P=300$ and $Y=800$ again.
:::
:::

::: warning The model is not a ranking of regimes
"Monetary policy works under a float, fiscal policy under a peg" is a statement about [[#def-mf]] with perfect mobility and sticky prices. It is not a finding that countries *should* float in order to use monetary policy, or peg in order to use fiscal policy. Stabilisation may not be desirable; capital mobility may not be perfect; prices may not be sticky; the country may not be small. [[international-finance/exchange-rate-regimes]] treats the choice. This chapter treats the comparative statics of a model.
:::

::: quiz
Perfect capital mobility, sticky prices. A fiscal expansion under a *float* primarily
- [ ] raises $Y$ and depreciates $E$
- [x] leaves $Y$ unchanged and appreciates $E$
- [ ] leaves $Y$ unchanged and depreciates $E$
- [ ] raises $Y$ and leaves $E$ unchanged
::: solution
[[#prop-float]]: $Y$ is pinned by LM and $i=i^*$. The extra $G$ is offset by an appreciation that cuts $NX$. Under a *peg* the first option's "$Y$ rises" would be right and $E$ would be unchanged.
:::
:::

## Imperfect capital mobility

If capital flows respond to $i-i^*$ with a finite elasticity, BP slopes up. A rise in $Y$ that worsens $CA$ must be matched by a higher $i$ to attract inflows (or by a depreciation, under a float, that restores $CA$). Policy results become intermediate. Fiscal expansion under a float now *does* raise $Y$ a little, because $i$ can rise above $i^*$ and the appreciation is smaller. Monetary expansion under a peg now *does* raise $Y$ a little, until reserve loss has gone far enough. The perfect-mobility propositions are the limiting case as the BP slope goes to zero (horizontal). As the slope goes to infinity (no capital mobility), we recover a closed-economy IS–LM with $NX(Y,E)$ and a float that makes $CA=0$ (or a peg that makes $M$ the residual of the trade balance). Fleming (1962) and Mundell (1963) already distinguished these cases; the trilemma of the next chapter is the perfect-mobility corner.

::: intuition Two switches
Think of a peg as switching off $E$ and switching on $M$, and a float as the reverse. Perfect capital mobility switches off $i$ (it is $i^*$). The remaining pair of equations determines the remaining pair of variables. That is why one instrument is powerful and the other is not, and why the ranking *flips* when the exchange-rate switch is flipped. Imperfect mobility puts $i$ back as a third sluggish variable and blurs the ranking.
:::

## Overshooting

Mundell–Fleming with $i=i^*$ has no expected depreciation. That cannot be right on the day $M$ jumps: the long-run $E$ has changed, by PPP, so $E^e$ has changed, so UIP requires $i \neq i^*$ while prices are still sticky.

::: definition Dornbusch overshooting {#def-dornbusch}
The **Dornbusch (1976) model** keeps UIP, $i = i^* + (E^e-E)/E$, a money market $M/P = L(Y,i)$, sticky $P$ in the short run, and a long-run PPP anchor $\bar E = \bar P / P^*$ (foreign variables fixed). $E^e$ is regressive toward $\bar E$, or rational and consistent with the path of $P$. A permanent rise in $M$ raises $\bar E$ in proportion. In the short run $P$ is fixed, so $i$ must *fall* to clear the money market (if $Y$ is fixed in the simplest version). UIP then requires expected *appreciation*, which is possible only if $E$ has jumped *beyond* $\bar E$. That extra jump is **overshooting**.
:::

::: proposition A log-linear jump {#prop-overshoot}
Let lower-case letters be logs, foreign variables zero, long-run $\bar e = \bar p = m$, money demand $m-p = -\eta i$ with $Y$ fixed, UIP $i = \theta(\bar e - e)$ (expected depreciation is proportional to the gap from the long run; $i^*=0$). After a rise in $m$ to a new level, still written $m$, with $p$ not yet moved,

$$
e = \bar e + \frac{1}{\eta\theta}(m-p).
$$

On impact $p$ is the old price, $m-p>0$, so $e > \bar e$: overshooting. The coefficient $1/(\eta\theta)$ is larger the less interest-elastic money demand is (small $\eta$) and the slower expected mean reversion (small $\theta$).
:::

::: proof
UIP: $i = \theta(\bar e - e)$. Money: $m-p = -\eta i = -\eta\theta(\bar e-e)$. Rearrange: $e-\bar e = (m-p)/(\eta\theta)$. Long-run $m=\bar p=\bar e$ (PPP and money-market at $i=0$). On impact $p$ is old, $m$ is new, $m-p = \Delta m > 0$, so $e = \bar e + \Delta m/(\eta\theta) > \bar e$.
:::

::: example A doubling in logs {#ex-overshoot}
Let $\eta=2$, $\theta=0.5$, and start at $m=p=e=0$. Now $m$ jumps to $1$ (a permanent rise in the log money stock). (a) What is the long-run $\bar e$? (b) What is $e$ on impact, with $p$ still $0$? (c) What is $i$ on impact?
::: solution
(a) $\bar e = 1$. (b) $e = 1 + (1-0)/(2\times 0.5) = 1+1 = 2$. The exchange rate jumps twice as far as its long-run rise: overshooting of $100$ per cent of the long-run move. (c) $i = \theta(\bar e-e) = 0.5(1-2) = -0.5$, so the home interest rate is $50$ log-points below $i^*=0$ — a large cut, because $Y$ was held fixed and all of the money-market clearing is on $i$. Expected appreciation of $0.5$ (the gap $e-\bar e=1$ times $\theta=0.5$) matches UIP. Over time $p$ rises toward $1$, $i$ rises toward $0$, and $e$ falls from $2$ toward $1$. The path of $e$ after the jump is an *appreciation*, even though the shock was monetary easing. That is the signature of overshooting, and it is why a depreciation on the announcement can be followed by an appreciation without any reversal of policy.
:::
:::

::: widget cobweb
g: 1 + 0.5*(x-1)
x0: 2.0
steps: 20
x: 0, 2.5
y: 0, 2.5
caption: A toy path of $e$ toward $\bar e=1$ after the overshooting jump to $2$, drawn as $e_{t+1}=\bar e + 0.5(e_t-\bar e)$. The cobweb is not the Dornbusch differential equation; it is a discrete analogue of mean reversion from the impact point. Start at $2$ and watch $e$ fall toward $1$. Invented speed.
:::

The original Dornbusch model is continuous-time, with $\dot p$ proportional to excess demand and a saddle path in $(e,p)$ space. The jump of $e$ onto that saddle path is the overshooting. The cobweb is a picture of the *afterward*, not a substitute for the saddle.

## Evidence

**The ranking of multipliers.** Open-economy VARs and narrative studies tend to find that monetary easing depreciates the currency and raises output under floats, consistent with [[#prop-float]] (Eichenbaum and Evans, *QJE*, 1995; the later high-frequency literature). Fiscal multipliers in open economies are a live dispute: they are smaller in more open economies in some panels (Ilzetzki, Mendoza and Végh, *Journal of Monetary Economics*, 2013) and not in others, and they depend on whether the exchange rate is pegged, as the model says they should. The perfect-mobility zero fiscal multiplier under a float is a limit, not a typical estimate.

**Overshooting.** The impulse response of $E$ to a monetary shock often shows a jump and then a slow return, which is the overshooting shape (the "delayed overshooting" of Eichenbaum and Evans is a *hump*, not an instantaneous jump, and is a puzzle for the original Dornbusch timing). UIP's empirical failures, from [[international-finance/exchange-rates]], infect the quantitative model: if the Fama slope is not one, the UIP-based jump is misspecified. Dornbusch remains the organising short-run theory; it is not a calibrated match to every impulse response.

**Emerging-market versions.** When $E$ depreciates, balance-sheet contractions (foreign-currency debt) can *cut* $Y$, reversing the IS shift. Cespedes, Chang and Velasco (*QJE*, 2004) and the third-generation crisis models of [[international-finance/crises]] are Mundell–Fleming with a balance-sheet IS. For Brazil, Korea, Türkiye and South Africa, the sign of a depreciation on output is then an empirical question, not a theorem of [[#prop-float]] (see the IMF's *World Economic Outlook* chapters on exchange-rate pass-through and contractionary depreciations).

::: application A fiscal expansion in a floating small economy
Palmia floats and is small. It raises $G$ by $20$, as in [[#ex-float-shocks]]. The model predicts appreciation and unchanged $Y$. In a world of imperfect mobility and some price flexibility, one would expect some rise in $Y$ and a smaller appreciation. The prediction to take to the data is the *sign* of $E$ and the *dampening* of the $Y$ multiplier relative to a closed economy, not the literal zero. The same expansion under a peg predicts a larger $Y$ and reserve inflows. European countries on the euro cannot use a national $E$; for them the "peg" column is the relevant one, with the extra twist that monetary accommodation is decided in Frankfurt, not at home — a preview of [[international-finance/monetary-unions]].
:::

## Where this leads

The ranking of policy effectiveness is the comparative-static heart of the **trilemma**: [[international-finance/exchange-rate-regimes]]. A monetary union is a peg with extra commitment and no national $M$ at all: [[international-finance/monetary-unions]]. When the peg is attacked, $E^e$ jumps and [[#eq-i-star]] becomes a crisis condition: [[international-finance/crises]]. The long-run after overshooting is PPP: [[international-finance/ppp]].

::: history
J. Marcus Fleming's 'Domestic Financial Policies under Fixed and under Floating Exchange Rates' (*IMF Staff Papers*, 1962) and Robert Mundell's 'Capital Mobility and Stabilization Policy under Fixed and Flexible Exchange Rates' (*Canadian Journal of Economics and Political Science*, 1963) are the two source papers; Mundell's 1960 and 1961 *Kyklos* and *AER* pieces belong to the same project. The IS–LM skeleton is Hicks (1937). Rudiger Dornbusch's 'Expectations and Exchange Rate Dynamics' (*JPE*, 1976) added rational (or regressive) expectations and sticky prices, and with them overshooting. The model remains the undergraduate open-economy workhorse; the graduate successor is the New Keynesian open-economy model (Obstfeld and Rogoff 1995; Galí and Monacelli 2005), which keeps the ranking of regimes in a setting with microfoundations.
:::

::: summary
- Mundell–Fleming is IS–LM plus $NX(E)$ and either $i=i^*$ (perfect mobility) or an upward-sloping BP. Prices are sticky.
- Under a float with perfect mobility, monetary policy sets $Y$ and fiscal policy sets $E$: extra $G$ appreciates $E$ and crowds out $NX$.
- Under a peg with perfect mobility, fiscal policy sets $Y$ and monetary policy is residual: extra $G$ raises $Y$ and $M$; extra $M$ leaks through reserves.
- Imperfect mobility blurs both rankings. The perfect-mobility propositions are limits.
- Dornbusch overshooting: a monetary expansion cuts $i$, so $E$ must jump beyond its PPP level to create expected appreciation. Afterward $E$ appreciates toward $\bar E$ as $P$ rises.
- The ranking is a model's comparative statics, not a prescription to float or to peg.
:::

## Exercises

::: exercise Float equilibrium {level=1 check="80"}
In [[#ex-linear]], enter the floating $E$.
::: solution
$i=4$, $Y=800$, $800=800-160+2E$ gives $E=80$.
:::
:::

::: exercise Fiscal float {level=1 check="70"}
After the fiscal shift of [[#ex-float-shocks]](a), enter the new $E$.
::: solution
$Y$ stays $800$, $800=820-160+2E$ gives $E=70$. Appreciation of $10$ palms per foreign unit.
:::
:::

::: exercise Monetary float {level=1 check="900"}
After the monetary shift of [[#ex-float-shocks]](b), enter the new $Y$.
::: solution
$i=4$ and $Y=700+50\times 4=900$.
:::
:::

::: exercise Peg fiscal {level=2 check="820"}
Under the peg of [[#ex-peg-shocks]](a), enter the new $Y$.
::: solution
$Y=820-40\times 4+2\times 80=820$. The whole IS shift becomes output.
:::
:::

::: exercise Overshooting impact {level=2 check="2"}
In [[#ex-overshoot]], enter impact $e$ (logs).
::: solution
$e=\bar e+(m-p)/(\eta\theta)=1+1/1=2$.
:::
:::

::: exercise Money demand under the peg {level=2 check="310"}
In [[#ex-peg-shocks]](a), enter the new $M/P$.
::: solution
$M/P=0.5\times 820-25\times 4=310$.
:::
:::

::: exercise Derive the float ranking {level=3}
Using only LM, $i=i^*$, and IS as $Y=A(G)-b i + \nu E$, show that $dY/dG=0$ and $dE/dG<0$ under a float with $M$ fixed. Then show that $dY/dG>0$ under a peg with $E$ fixed.
::: hint
Float: solve LM for $Y$ first. Peg: solve IS for $Y$ first.
:::
::: solution
Float: $M/P=L(Y,i^*)$ pins $Y=\bar Y(M)$. Then $\bar Y = A(G)-b i^* + \nu E$, so $\nu dE = -A'(G)\,dG$ and $dE/dG = -A'/\nu < 0$ if $A'>0$, $\nu>0$. $dY/dG=0$. Peg: $E$ fixed, $i=i^*$, so $dY = A'(G)\,dG > 0$. LM then determines $dM = P L_Y dY > 0$. The two rankings are the same as [[#prop-float]] and [[#prop-peg]]. They inherit every assumption of [[#def-mf]], including the silent expected-depreciation term.
:::
:::

::: exercise Overshooting algebra {level=3}
From $m-p=-\eta i$ and $i=\theta(\bar e-e)$, with $\bar e=m$ in the long run (foreign variables zero, $i^*=0$). (a) Derive impact $e$ when $p$ is predetermined. (b) Show that $\partial e/\partial m > 1$ on impact. (c) What happens to overshooting as $\eta\to\infty$?
::: hint
Part (b): long-run $de/dm=1$, so overshooting is $\partial e/\partial m>1$ on impact.
:::
::: solution
(a) $m-p=-\eta\theta(\bar e-e)$. With $\bar e=m$ (new long run) and $p$ old, $e=m+(m-p)/(\eta\theta)$. If the old steady state was $p=m_{\text{old}}$ and we measure $m$ as the *new* level, $m-p=\Delta m$ and $e=\bar e+\Delta m/(\eta\theta)$. (b) $de/d(\Delta m)=1+1/(\eta\theta)>1$. The extra $1/(\eta\theta)$ is the overshoot. (c) As $\eta\to\infty$, money demand is infinitely interest-elastic (a liquidity trap in $i$), the required $di$ for a given $dm$ goes to $0$, and the overshoot $1/(\eta\theta)\to 0$. $E$ jumps only to $\bar E$. Overshooting is a property of a *finite* $\eta$ and a sticky $P$.
:::
:::
