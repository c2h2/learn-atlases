A government that spends more than it collects in taxes must cover the difference by issuing debt, by printing money, or by defaulting. That accounting identity is the **government budget constraint**, and it is the one piece of fiscal macroeconomics that does not depend on a school of thought. What *does* depend on a school is whether the resulting public debt is a burden on future generations, whether a deficit stimulates $Y$ in the short run, and whether a high debt-to-GDP ratio is a crisis in waiting or a harmless counterpart of private saving.

This chapter writes the budget constraint in levels and in ratios, studies the dynamics of $d=D/Y$, and sets out the competing views of the burden of debt — Ricardian equivalence, overlapping-generations crowding-out, and the fiscal theory of the price level — on their own terms. It is for education only. Nothing here is a recommendation to run a surplus or a deficit, to buy or to sell a government bond, or to restructure a debt. Illustrative ratios are not forecasts, and dated cross-country figures are not a ranking of treasuries.

Notation: $G$ is real government purchases, $T$ real net taxes (taxes minus transfers), $D$ the real stock of public debt, $i$ the nominal interest rate on that debt, $r$ the real rate, $\pi$ inflation, $Y$ real output, $g_Y$ the growth rate of $Y$, and $d=D/Y$ the **debt ratio**. The primary deficit is $G-T$; the total deficit includes interest.

## The government budget constraint

::: definition Government budget constraint {#def-gbc}
In discrete time, with real variables and a real interest rate $r_t$ on outstanding debt,

$$
D_t = (1+r_t) D_{t-1} + G_t - T_t.
$$ {#eq-gbc}

The **primary deficit** is $G_t-T_t$; the **total deficit** (the amount of new borrowing) is $G_t-T_t+r_t D_{t-1}$. Iterating forward and imposing a no-Ponzi (transversality) condition gives the **present-value budget constraint**

$$
D_{t-1} = \sum_{s=0}^{\infty} \frac{T_{t+s}-G_{t+s}}{\prod_{j=0}^{s}(1+r_{t+j})}:
$$ {#eq-pvbc}

outstanding debt equals the present value of expected future primary *surpluses*.
:::

Three financing items have been netted or postponed. Seigniorage, the inflation tax of [[macroeconomics/money-and-inflation]], can be added on the right of [[#eq-pvbc]] as a stream of $\pi m$. Default is a cut in $D$ that violates the original contract. Foreign-currency debt adds an exchange-rate term, which is why a depreciation can blow up $d$ in an emerging market overnight ([[international-finance/crises]]). For a closed-economy, local-currency, no-default benchmark, [[#eq-gbc]] is the whole constraint.

The present-value form is the one that bites. A government can run primary deficits for a long time if it runs primary surpluses later, or if $r$ is below the growth rate of the tax base. It cannot, in this accounting, run primary deficits for ever *and* have $r$ above growth *and* have debt accepted as a claim on future surpluses. Something in that list has to give: future $T-G$, $r$, inflation, or default.

::: example A two-period government {#ex-two-g}
A government has $D_0=100$, $r=0.05$, $G_1=50$, $G_2=50$, and $T_1=40$. What primary surplus must it run in period 2 to satisfy [[#eq-pvbc]] with no further debt outstanding after period 2?
::: solution
Debt at the end of period 1 is $D_1=1.05\times 100 + 50-40=115$. Then $D_2=1.05\times 115 + 50 - T_2=0$ requires $T_2=50+120.75=170.75$, a primary surplus of $T_2-G_2=120.75$. The present value of the two primary balances is $-10 + 120.75/1.05=105$, which equals $(1+r)D_0=105$ as of the end of period 1, or $D_0=100$ as of the start — the two-period form of [[#eq-pvbc]]. A tax cut in period 1 that is not matched by a cut in $G$ is a tax rise in period 2, of $(1+r)$ times as much. That is the budget-constraint half of Ricardian equivalence; the other half is whether households capitalise it.
:::
:::

## The debt ratio and $r$ versus $g$

Levels of $D$ grow in a growing economy even when the ratio $d=D/Y$ is stable. The useful state variable is the ratio.

::: proposition Dynamics of the debt ratio {#prop-d}
Let $g_Y$ be the growth rate of real output, $r$ the real interest rate, and $pd_t=(G_t-T_t)/Y_t$ the primary deficit as a share of GDP. Then

$$
d_t = \frac{1+r}{1+g_Y}\, d_{t-1} + pd_t.
$$ {#eq-d}

If $r$, $g_Y$ and $pd$ are constant, $d$ converges to a finite steady state $d^*=pd\big/\bigl(1-\frac{1+r}{1+g_Y}\bigr) = pd\,(1+g_Y)/(g_Y-r)$ if and only if $r<g_Y$ (and $pd$ can then be positive), or if $pd$ has the opposite sign to $g_Y-r$. If $r>g_Y$, a positive primary deficit makes $d$ explode; a primary *surplus* of $(r-g_Y)d/(1+g_Y)$ holds $d$ constant.
:::

::: proof
$D_t=(1+r)D_{t-1}+(G_t-T_t)$. Divide by $Y_t=(1+g_Y)Y_{t-1}$: $d_t=(1+r)D_{t-1}/((1+g_Y)Y_{t-1}) + pd_t$, which is [[#eq-d]]. The linear iteration $d_t=\rho d_{t-1}+pd$ with $\rho=(1+r)/(1+g_Y)$ converges iff $\lvert\rho\rvert<1$. For positive rates, that is $r<g_Y$. The steady state is $d^*=pd/(1-\rho)$. Holding $d$ constant at a given level requires $pd=(1-\rho)d=\bigl((g_Y-r)/(1+g_Y)\bigr)d$, a primary surplus when $r>g_Y$.
:::

The comparison of $r$ and $g_Y$ is the most important single piece of arithmetic in this chapter. When $r<g_Y$, the debt ratio shrinks on its own if the primary deficit is zero: the economy grows faster than the debt accumulates interest. When $r>g_Y$, a zero primary deficit is not enough: $d$ rises, and a surplus is needed to stabilise it. Blanchard (2019, *American Economic Review*, presidential address) documented that the U.S. safe $r$ had sat below $g_Y$ for much of the past few decades, which, he argued, relaxes the fiscal arithmetic. That is a statement about a sample, not a theorem that $r<g_Y$ will last, and it is not a recommendation to expand $d$.

::: example Iterating a debt ratio {#ex-d}
Let $d_{0}=1$ (debt equal to a year’s GDP), $r=0.03$, $g_Y=0.01$, $pd=0.02$. Compute $d_1$. What primary surplus would have held $d$ at $1$?
::: solution
$\rho=1.03/1.01\approx 1.0198$, so $d_1\approx 1.0198+0.02=1.0398$. The debt ratio rises by about four points in a year: two from the primary deficit, two from $r>g_Y$. The stabilising primary *surplus* is $((0.03-0.01)/1.01)\times 1 \approx 0.0198$, about 2 per cent of GDP. Running $pd=0$ would still have raised $d$ by two points.
:::
:::

::: widget cobweb
g: ((1+r)/(1+n))*x + p
x0: 0.8
steps: 25
x: 0, 2.5
y: 0, 2.5
sliders: r=0.03:0:0.08:0.005; n=0.02:0:0.07:0.005; p=0.01:-0.05:0.05:0.005
caption: The map $d \mapsto \frac{1+r}{1+n}d + p$ of [[#eq-d]], with $n$ standing for $g_Y$ and $p$ for the primary deficit ratio. The $45^\circ$ line is the cobweb’s usual companion. Start at $d=0.8$. Raise $r$ above $n$ with $p\ge 0$: the path runs away. Lower $r$ below $n$: the path converges, and a positive $p$ is consistent with a finite $d^*$. A sign change in $p$ to a surplus can stop an explosive path — the arithmetic of a consolidation, not a ranking of any particular consolidation.
:::

::: warning $r-g$ is not a free lunch even when it is negative
A period of $r<g_Y$ makes a given $d$ cheaper to service, and it makes a given primary deficit consistent with a stable $d$. It does not make the present-value constraint go away: if $r<g_Y$ *for ever*, the usual transversality argument has to be handled with care (there is a large theory literature on this), but a reversal of $r-g_Y$ — a return of the safe rate to above growth — would turn a comfortable $d$ into an explosive one unless $pd$ adjusts. Treating a decade of $r<g_Y$ as a permanent regime is a forecast, and this chapter does not make it.
:::

::: definition Sustainable debt {#def-sustain}
A path of $\{d_t\}$ is **sustainable**, in the accounting sense used here, if it satisfies [[#eq-d]] at every date and $d_t$ remains bounded (or, more strictly, if the present-value constraint [[#eq-pvbc]] holds at the prevailing $\{r_t\}$). Sustainability is not optimality: a bounded $d$ can still crowd out $K$, and an unbounded $d$ can still be rolled over for a long time when $r<g_Y$.
:::

::: example Two ratios, two stories {#ex-jp-gr}
Economy J has $d=2.4$, $r=0$, $g_Y=0.01$, and $pd=0.01$, with debt held mostly at home in local currency. Economy G has $d=1.3$, $r=0.06$, $g_Y=0.00$, $pd=0.03$, with a large foreign-held share in a currency G cannot print. Compute $\rho=(1+r)/(1+g_Y)$ and $d_1$ in each. Which ratio is on a tighter path, in the sense of [[#eq-d]]?
::: solution
J: $\rho=1/1.01\approx 0.990$, $d_1\approx 0.990\times 2.4 + 0.01\approx 2.386$ — the ratio is *falling* despite a primary deficit, because $r<g_Y$. G: $\rho=1.06/1=1.06$, $d_1=1.06\times 1.3+0.03=1.408$ — the ratio is *rising* fast from a lower base. The arithmetic of [[#eq-d]] is tighter for G. Whether J’s path is comfortable still depends on a reversal of $r$ and on the political economy of $pd$; the example is a schematic of a high-$d$ local-currency borrower versus a lower-$d$ foreign-currency borrower, not a score of any two actual countries.
:::
:::

## Is public debt a burden?

The question is older than Keynes, and it has at least three precise meanings.

**Ricardian (Barro 1974).** If households are unconstrained, have operative bequests, and face lump-sum taxes, a deficit-financed tax cut does not change wealth, does not change $C$, and does not change $r$ or $I$. Public debt is not net wealth. Future taxes are capitalised. The “burden” is zero in the sense of crowding-out, and the intergenerational transfer is undone by bequests. The assumptions were listed in [[macroeconomics/consumption-and-saving#prop-ricardo]]; they fail for hand-to-mouth households, for distortionary taxes, and in Diamond’s overlapping-generations model without bequests.

**Overlapping generations (Diamond 1965).** Finite-lived households who do not care about unborn taxpayers treat the tax cut as net wealth, raise $C$, reduce national saving, and — in a closed economy — raise $r$ and crowd out $K$. Future generations inherit a smaller capital stock and a tax bill. That is a burden in the precise sense of a lower $k$ in the Solow or Diamond steady state ([[economic-growth/overlapping-generations]]). In an open economy the crowding-out can fall on the net foreign asset position instead: the country as a whole owes more to foreigners.

**Fiscal theory of the price level (Leeper 1991; Cochrane).** If primary surpluses are determined by a fiscal rule that does *not* adjust to $D$, then [[#eq-pvbc]] determines $P$ (because nominal debt divided by $P$ is $D$). An unsustainable real path inflates until the real debt equals the present value of the surpluses the fiscal rule *will* deliver. Sargent and Wallace (1981, “Unpleasant Monetarist Arithmetic”) is the ancestor: tight money today, with the deficit unchanged, means looser money later, and can raise inflation today if it is anticipated. On this view the burden of an unbacked debt is inflation, not a smaller $K$.

A fourth, cruder, meaning is “the interest bill uses up tax revenue that could have paid for schools”. That is a statement about the *composition* of $G$ and $T$, and it is true as arithmetic whenever $rD>0$. It is not a statement about whether those taxes would otherwise have been collected, nor about whether the schools would otherwise have been built. Distinguishing the four meanings is most of the debate.

::: intuition Who holds the debt
In a closed economy, public debt is a liability of the treasury and an asset of the households, pension funds and banks that hold it. Aggregating, it nets out except for the incentive and crowding-out effects above. In an open economy, the part held by foreigners is a liability of the country as a whole, and servicing it is a transfer across the border. Japan’s general-government gross debt exceeded 200 per cent of GDP in the 2010s and 2020s (IMF WEO, general government gross debt), with a large share held domestically; Greece’s crisis in 2010–12 was a debt held in large part abroad, in a currency the Greek government could not print (Eurostat / IMF WEO). The same $d$ is not the same object in those two configurations. Gross versus net debt, and the central bank’s holdings, add further caveats: a central bank that holds government paper has, consolidating the public sector, monetised it.
:::

::: example A tax cut in two models {#ex-taxcut-d}
A government with $d=1$, $r=g_Y=0.02$ and $pd=0$ cuts taxes by 2 per cent of GDP for one year, then restores the old $T$. Compute $d$ at the end of the tax-cut year. In a Ricardian model, what happens to $C$ that year? In a hand-to-mouth Keynesian cross with $c=0.8$ and $r$ fixed, what happens to $Y$?
::: solution
With $r=g_Y$, $\rho=1$, so $d$ rises one-for-one with $pd$: $d_1=1+0.02=1.02$. Thereafter $pd=0$ and $d$ stays at $1.02$ until a surplus pays it down. Ricardian households save the tax cut to pay the future surplus (or the extra future interest), so $C$ is unchanged. Hand-to-mouth households spend $0.8$ of the cut; the cross multiplier $1/(1-0.8)=5$ applied to an autonomous $0.016 Y$ (if the cut is 2 per cent of the old $Y$) raises $Y$ by 8 per cent at a fixed $r$ — a Keynesian-cross upper bound, not an IS–LM forecast. The extra $d$ of two points of GDP is the same in both models; the $Y$ effect is not.
:::
:::

::: quiz
If $r>g_Y$ and the primary deficit is zero, the debt ratio $d$
- [ ] converges to zero
- [x] rises without bound
- [ ] stays constant
- [ ] is independent of $r$, because $d=D/Y$ and $Y$ grows
::: solution
[[#eq-d]] with $pd=0$ is $d_t=\rho d_{t-1}$ with $\rho=(1+r)/(1+g_Y)>1$, so $d$ grows at rate $\rho-1\approx r-g_Y$. Growth of $Y$ is already in the formula; it is not enough, when $r$ exceeds it, to stop $d$ from rising. A primary surplus of about $(r-g_Y)d$ is what would hold $d$ still.
:::
:::

## Short-run fiscal policy, again

The budget constraint is a long-run object. In the short run of IS–LM and AD–AS, a rise in $G$ or a cut in $T$ shifts AD and can raise $Y$ when $Y<Y_n$, with the multipliers of [[macroeconomics/is-lm]] and the caveats of the Lucas critique. The constraint still holds: the extra $D$ must be consistent with future surpluses, seigniorage, or default. At the zero lower bound, the IS–LM multiplier is large and crowding-out through $r$ is small, which is why a 2009-style argument for a fiscal expansion and a 2010-style argument for consolidation can both be internally consistent *and* apply to different dates. They differ in the assumed gap $Y-Y_n$, in the assumed $r$, and in the assumed present-value path of $T-G$. This course does not pick a winner for any particular year.

**Automatic stabilisers** (the cyclical response of $T$ and of transfers) move $pd$ with $Y$ without a new vote. They make $d$ rise in a recession even if the *structural* primary balance is unchanged. Cyclically adjusted balances, as published by the OECD and the IMF, are an attempt to strip that out; they depend on an estimate of $Y_n$ and should be read as such.

## Evidence

**Levels of $d$.** IMF *World Economic Outlook* (October 2025 and earlier vintages, general government gross debt, per cent of GDP) put Japan in a class of its own, above 200 per cent; the United States around 120 per cent in the mid-2020s; Italy above 130 per cent; Germany much lower; China lower on the official general-government definition but higher once local-government financing vehicles are brought in (IMF Article IV discussions have emphasised the broader perimeter). Several low-income countries have $d$ that look modest as ratios and still face high rollover risk because $r$ is high, debt is in foreign currency, and tax bases are thin (IMF *Debt Sustainability Analysis* for low-income countries, various). South Africa’s unemployment chapter already noted a 32 per cent unemployment rate; its debt ratio has risen substantially since 2008 (National Treasury / IMF WEO), a reminder that $d$ and $u$ can both be high.

**The $r-g_Y$ gap.** U.S. ten-year real rates, measured for example by TIPS yields, ran below estimates of potential growth for much of 2012–21 (FRED, DFII10; CBO potential-growth notes) and rose with the 2022–23 inflation (the same TIPS series). The sign of $r-g_Y$ is a dated fact, not a constant. Emerging-market local-currency $r$ is often above $g_Y$ even when U.S. $r$ is not.

**Multipliers and consolidations.** The IMF WEO of October 2012 argued that fiscal multipliers in the 2010–11 consolidations were larger than the pre-crisis vintages had assumed. Alesina, Favero and Giavazzi (*Austerity*, 2019) argued that expenditure-based consolidations were less costly for $Y$ than tax-based ones in their sample. The two findings can coexist: multipliers can be large at the lower bound, and the composition of a consolidation can still matter. Reinhart and Rogoff (2010, *American Economic Review*, Papers and Proceedings) reported a threshold near 90 per cent of GDP beyond which median growth was lower; Herndon, Ash and Pollin (2014, *Cambridge Journal of Economics*) identified a spreadsheet error and a sample-weighting issue that changed the U.S. post-war mean, while leaving a weaker negative association. The episode is a warning about thresholds, not a licence to ignore $d$. High $d$ is associated, in many samples, with lower subsequent growth; causality runs both ways, because low growth raises $d$ by the arithmetic of [[#eq-d]].

**Inflation and default.** The European hyperinflations, Zimbabwe, and Venezuela were chapters in [[macroeconomics/money-and-inflation]]: inflation as the residual financing item. Sovereign default is a different residual: Russia 1998, Argentina 2001 and 2020, Greece 2012 (a restructuring inside a monetary union). The budget constraint is satisfied, in each case, by a combination of $T-G$, $\pi$, and a haircut. Which combination occurs is politics and institutions, not a diagram.

## Competing views, collected

**Keynesian.** When $Y<Y_n$ and $r$ is at the floor, a deficit-financed rise in $G$ raises $Y$ by more than it raises $d$ in the short run, because the denominator $Y$ grows; a consolidation can be self-defeating. The long-run constraint is acknowledged and postponed.

**Monetarist / Ricardian.** Deficits do not raise $Y$ in the long run (classical dichotomy) and need not raise $C$ in the short run (Ricardian equivalence). The quantity of money, not $G$, is the demand instrument. Unbacked deficits show up as $\pi$.

**New classical.** Anticipated fiscal policy does not change $Y$; unanticipated policy might. The present-value constraint is imposed, and $d$ is not an independent cause of anything once that constraint is in the model.

**New Keynesian.** Short-run multipliers are real when prices are sticky; they are larger at the lower bound (Christiano, Eichenbaum and Rebelo 2011, *Journal of Political Economy*). The long-run constraint is imposed as a terminal condition, so a deficit today is a surplus path tomorrow, which feeds back into $\pi^e$ and into the multiplier.

The four views share [[#eq-gbc]]. They disagree about the short-run $\partial Y/\partial G$, about whether households capitalise $T_{t+s}$, and about whether the residual financing item, when the constraint is stressed, is $\pi$ or default or a future surplus. This course leaves the disagreement in place.

## Where this leads

[[economic-growth/overlapping-generations]] is the model in which public debt crowds out $K$. [[business-cycles/fiscal-stabilisation]] returns to multipliers over the cycle. [[international-finance/crises]] treats sudden stops and sovereign default. [[public-economics]] treats the composition of $G$ and $T$ as public-finance questions rather than as macro shocks. [[money-banking/central-banking]] consolidates the central bank with the treasury and makes seigniorage explicit.

::: history
**1920s, the German and other European inflations.** Unbacked fiscal paths were closed by $\pi$, a lesson Sargent (1982) later formalised. **1944, Evsey Domar.** “The ‘Burden of the Debt’ and the National Income” (*American Economic Review*) wrote the $d$ arithmetic and stressed $g_Y$ relative to $r$. **1965, Peter Diamond.** “National Debt in a Neoclassical Growth Model” (*American Economic Review*) showed crowding-out of $K$ in overlapping generations. **1974, Robert Barro.** “Are Government Bonds Net Wealth?” stated Ricardian equivalence. **1981, Thomas Sargent and Neil Wallace.** “Some Unpleasant Monetarist Arithmetic” (*Federal Reserve Bank of Minneapolis Quarterly Review*) showed that tight money today can mean higher inflation today if the fiscal path is unchanged. **2019, Olivier Blanchard.** The AEA presidential address on $r-g_Y$ reopened the arithmetic for a low-rate era.
:::

::: summary
- The government budget constraint is $D_t=(1+r)D_{t-1}+G_t-T_t$. In present value, debt equals future primary surpluses (plus seigniorage, net of default).
- The debt ratio obeys $d_t=\frac{1+r}{1+g_Y}d_{t-1}+pd_t$. The sign of $r-g_Y$ decides whether a zero primary deficit stabilises $d$.
- Whether debt is a “burden” depends on the model: Ricardian (no), overlapping generations (yes, via $K$), fiscal theory (via $P$). Who holds the debt, and in which currency, changes the object.
- Short-run fiscal multipliers are the IS–LM/AD–AS object, constrained by this chapter’s arithmetic. They are not a constant, and they are not a recommendation.
- Keynesian, monetarist, new classical and New Keynesian views share the constraint and disagree about $\partial Y/\partial G$, about capitalisation of future taxes, and about whether stress is resolved by $\pi$, by default, or by a future surplus.
:::

## Exercises

::: exercise A primary surplus {level=1 check="30"}
$D_{t-1}=200$, $r=0.05$, $G_t=80$, $T_t=110$. What is the primary surplus? (Enter $T-G$.)
::: solution
$T-G=30$. The total surplus is $30-rD_{t-1}=30-10=20$, and $D_t=1.05\times 200-20=190$.
:::
:::

::: exercise Next year’s debt {level=1 check="180"}
In the previous exercise, what is $D_t$? (Enter $D_t$.)
::: solution
$D_t=(1+r)D_{t-1}+G_t-T_t=1.05\times 200+80-110=180$. Equivalently, the total surplus is $30-10=20$, so debt falls from $200$ to $180$.
:::
:::

::: exercise A debt ratio {level=1}
$D=600$, $Y=500$. What is $d$? If $Y$ grows 4 per cent and $D$ is unchanged, what is the new $d$?
::: solution
$d=1.2$. New $d=600/520\approx 1.154$. Growth alone, with no new borrowing and no interest, shrinks the ratio.
:::
:::

::: exercise Stabilising $d$ {level=2 check="2"}
$r=0.04$, $g_Y=0.02$, $d=1$. What primary surplus, as a *per cent* of GDP, holds $d$ constant? (Enter the percentage, without the per cent sign; round to the nearest integer.)
::: solution
$pd_{\text{surplus}} = ((r-g_Y)/(1+g_Y))d = (0.02/1.02)\times 1 \approx 0.0196$, or about 2 per cent of GDP.
:::
:::

::: exercise An $r<g_Y$ path {level=2}
$r=0.01$, $g_Y=0.03$, $d_0=1$, $pd=0.01$ (a primary *deficit* of 1 per cent of GDP). Compute $d_1$ and the steady-state $d^*$ if these rates persist. Is this path exploding?
::: solution
$\rho=1.01/1.03\approx 0.9806$, $d_1\approx 0.9806+0.01=0.9906$. Steady state $d^*=0.01/(1-0.9806)\approx 0.01/0.0194\approx 0.515$. The ratio *falls* toward about 52 per cent of GDP despite a positive primary deficit, because $r<g_Y$. The path is not exploding. It is also not a proof that the same $pd$ would be safe if $r$ rose to $0.04$.
:::
:::

::: exercise Ricardian or not {level=2}
A two-period unconstrained household faces a tax cut of $20$ in period 1, with $G$ unchanged and $T_2$ to rise by $20(1+r)$. Using [[macroeconomics/consumption-and-saving#prop-ricardo]], does $c_1$ change? Now suppose the household is borrowing-constrained, with $c_1=y_1-T_1$. What happens to $c_1$?
::: solution
Unconstrained: wealth is unchanged, $c_1$ is unchanged, private saving rises by $20$. Constrained: $c_1$ rises by $20$, the MPC is one, and Ricardian equivalence fails. Aggregate $C$ is a weighted average of the two types. A deficit’s short-run demand effect is, on this view, a statement about how many households are constrained, not about whether [[#eq-gbc]] holds.
:::
:::

::: exercise Unpleasant arithmetic {level=3}
A government must finance a primary deficit of 2 per cent of GDP. Real money demand is $m/Y=0.10$, seigniorage is $\pi m/Y$ in continuous time, and $r>g_Y$ so that debt cannot absorb the deficit for ever. What inflation rate finances the deficit with seigniorage alone? If the central bank holds $\pi=0$ for two years and the deficit continues, what must eventually happen, according to Sargent and Wallace?
::: hint
Seigniorage as a share of GDP is $\pi\times 0.10$. The “eventually” is the present-value constraint.
:::
::: solution
$0.10\pi=0.02$ gives $\pi=0.20$, or 20 per cent inflation. If $\pi=0$ for two years, the deficit is financed by $d$ rising. With $r>g_Y$, $d$ does not converge. Eventually either $pd$ must switch sign, or $\pi$ must rise — and if the public anticipates the later $\pi$, money demand can fall *now*, so $\pi$ can rise now. That is unpleasant monetarist arithmetic: tight money today, with an unchanged fiscal path, is not a well-defined monetary policy. The numbers are a parable; actual seigniorage in high-income countries is far smaller, because $pd$ is not permanently 2 per cent *and* financed only by $\pi$.
:::
:::

::: exercise Open-economy burden {level=3}
A small open economy faces a world real rate $r^*$ and has $I=I(r^*)$, so $I$ does not fall when the government borrows. National saving falls by the primary deficit (assume no Ricardian offset). Using $NX=S-I$, what happens to the current account? Where is the burden?
::: hint
$S$ falls, $I$ is unchanged, $NX$ falls. The extra debt is, in the aggregate, owed abroad.
:::
::: solution
$NX$ falls one-for-one with national saving: the deficit is matched by a current-account deficit, i.e. by foreign lending. Crowding-out of domestic $K$ is absent, because $r^*$ is given. The burden is a smaller net foreign asset position: future residents (or the future taxpayers who must service the external public debt) will send more net income abroad. If foreigners later refuse to roll over, the adjustment is a sudden stop, not a rise in domestic $r$ — the open-economy stress scenario of [[international-finance/crises]]. The closed-economy Diamond burden and the open-economy external burden are substitutes, not independent extras.
:::
:::
