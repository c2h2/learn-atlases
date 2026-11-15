If prices are sticky and output is not glued to $F(\bar K, \bar L)$, then the real interest rate cannot be the only variable that equates saving and investment. Income itself must adjust. That is the Keynesian short run, and the **IS–LM model** is its workhorse: a goods market in which $Y$ and $r$ together make $Y=C+I+G$, and a money market in which the same two variables make $M/P=L(Y,i)$. Hicks (1937) drew the two schedules; generations of intermediate courses have used them to organise fiscal and monetary policy, the multiplier, and the liquidity trap.

This chapter is that organisation. It starts from the Keynesian cross, with $r$ fixed; lets $I$ depend on $r$ to produce the IS curve; puts the money market of [[macroeconomics/money-and-inflation]] into $(Y,r)$ space to produce the LM curve; and reads fiscal and monetary policy as shifts. Competing views are built in: the Keynesian reading takes the diagram as a description of the next few years; the monetarist reading emphasises LM and the quantity of money; the new classical reading denies that $P$ is sticky enough for the diagram to last; the New Keynesian reading keeps IS, replaces LM with an interest-rate rule, and derives both from optimisation. The chapter is for education only. Shifting $G$ or $M$ in a figure is not a recommendation of a budget or of a monetary programme.

Notation: $Y$ real output, $r$ the real interest rate, $i$ the nominal rate, $P$ the (temporarily fixed) price level, $M$ the money stock. With $\pi^e$ given, $i$ and $r$ move together; we write the LM curve in $r$ and treat $\pi^e=0$ unless a liquidity trap is at issue. The MPC is $c$; $\beta$ does not appear.

## The Keynesian cross and the multiplier

Hold $r$ fixed, so that $I=\bar I$ is a number, and take $P$ as given, so that $Y$ can sit below (or, uncomfortably, above) its classical level. Planned expenditure is

$$
E = C(Y-T) + \bar I + G,
$$

and equilibrium in the goods market is $Y=E$. With a linear consumption function $C=C_0 + c(Y-T)$,

$$
Y = \frac{1}{1-c}\bigl(C_0 - c T + \bar I + G\bigr).
$$ {#eq-cross}

::: definition The Keynesian multiplier {#def-mult}
The **government-purchases multiplier** is $\partial Y/\partial G = 1/(1-c)$. The **tax multiplier** is $\partial Y/\partial T = -c/(1-c)$. The **balanced-budget multiplier**, for a simultaneous rise in $G$ and $T$, is $1$. These derivatives hold $r$ (and $P$) fixed; they are the multipliers of the Keynesian cross, not yet those of IS–LM.
:::

The $G$-multiplier is a geometric series. A unit of extra $G$ is a unit of extra $Y$, of which $c$ is consumed, of which $c^2$ is consumed, and so on: $1+c+c^2+\cdots=1/(1-c)$, provided $0<c<1$. The tax multiplier is smaller in absolute value because a unit tax cut is not a unit of extra demand: $c$ of it is spent, then $c^2$, and the sum is $c/(1-c)$. A balanced-budget rise in $G$ and $T$ therefore raises $Y$ one-for-one: the two multipliers add to $1$. Haavelmo (1945) emphasised that last result; it is a theorem about this linear model, not a rule of thumb for a finance ministry.

::: example A Keynesian-cross equilibrium {#ex-cross}
$C=100+0.8(Y-T)$, $\bar I=150$, $G=150$, $T=100$. Find $Y$. Then raise $G$ by $50$ and recompute. Confirm that $\Delta Y = 5\times 50$.
::: solution
[[#eq-cross]] gives $Y = \frac{1}{0.2}(100 - 80 + 150 + 150) = 5\times 320 = 1600$. After $\Delta G=50$, autonomous spending is $370$ and $Y=1850$. The change is $250=5\times 50$, and $1/(1-0.8)=5$. The extra $50$ of $G$ induces $200$ of extra consumption; extra saving $S_{\text{private}}+S_{\text{public}}$ rises by $50$ and matches extra $G$ in the identity $S=I$ only because $I$ is here exogenous — a warning that the cross is not yet a complete model of the interest rate.
:::
:::

::: widget sequence
a: 50*(0.8)^(n-1)
N: 20
mode: sums
limit: 250
start: 1
caption: Rounds of spending after $\Delta G=50$ with $c=0.8$. Term $n$ is $50\times 0.8^{n-1}$; the partial sums approach the multiplier times $\Delta G$, namely $250$. The first bar is the government purchase itself; the rest is induced consumption. Raise $N$ to see the geometric series fill in. If $c$ were $0.5$, the same $\Delta G$ would sum toward $100$.
:::

::: warning The multiplier is not a constant of nature
Three things the cross treats as fixed will not stay fixed. First, $r$: extra $Y$ raises money demand, raises $r$ if $M/P$ is given, and crowds out $I$ — the IS–LM correction below, which makes the effective multiplier smaller than $1/(1-c)$. Second, $P$: extra $Y$ may raise prices, which lowers $M/P$ and raises $r$ further (the AD–AS correction of the next-but-one chapter). Third, $c$ itself is a reduced-form MPC, not a preference parameter ([[macroeconomics/consumption-and-saving]]); a Ricardian or a constrained household does not have the same $c$. Estimated multipliers in the data range from near zero to above one, depending on the identification, the monetary regime, and whether the economy is at the zero lower bound (Ramey 2011, *Journal of Economic Literature*; IMF *World Economic Outlook*, October 2012, Chapter 1, on multipliers in downturns). The geometric series is the algebra of [[#eq-cross]], not an estimate.
:::

## The IS curve

Now let $I=I(r)$ with $I'<0$, as derived in [[macroeconomics/investment]]. Goods-market equilibrium is $Y=C(Y-T)+I(r)+G$. That locus in $(Y,r)$ space is the IS curve.

::: definition IS curve {#def-is}
The **IS curve** is the set of $(Y,r)$ such that the goods market clears:

$$
Y = C(Y-T) + I(r) + G.
$$ {#eq-is}

It slopes down: a higher $r$ lowers $I$ and, through the multiplier, lowers $Y$. Algebraically, with $C=C_0+c(Y-T)$ and $I=I_0 - b r$,

$$
Y = \frac{C_0 - c T + I_0 + G}{1-c} - \frac{b}{1-c}\, r.
$$ {#eq-is-lin}

A rise in $G$ or a fall in $T$ shifts IS to the right by the Keynesian-cross multiplier. A fall in $I_0$ (animal spirits, a credit crunch) shifts it to the left.
:::

::: proposition The slope of IS {#prop-is-slope}
Along [[#eq-is-lin]], $\mathrm{d}r/\mathrm{d}Y = -(1-c)/b < 0$. The curve is flatter (in $(Y,r)$ space, $r$ on the vertical axis) when $c$ is large or $b$ is large: a given fall in $r$ then produces a large rise in $Y$.
:::

::: proof
Differentiate [[#eq-is-lin]] or, equivalently, differentiate $Y=C_0+c(Y-T)+I_0-br+G$ to get $(1-c)\,\mathrm{d}Y = -b\,\mathrm{d}r$.
:::

The IS curve is the loanable-funds diagram of [[macroeconomics/national-income]], redrawn with $Y$ endogenous. In the classical chapter, $Y$ was given and $r$ adjusted; here $P$ is given, $Y$ can adjust, and a whole curve of $(Y,r)$ pairs is consistent with goods-market clearing. Which pair occurs is the money market’s business.

::: example Deriving an IS schedule {#ex-is}
$C=200+0.75(Y-T)$, $I=200-25r$, $G=T=100$, with $r$ in per cent. Derive the IS equation. What is $Y$ if $r=8$?
::: solution
$Y=200+0.75(Y-100)+200-25r+100=500-75+0.75Y-25r$, so $0.25Y=425-25r$ and $Y=1700-100r$. At $r=8$, $Y=900$. The Keynesian-cross multiplier is $1/(1-0.75)=4$; a rise in $G$ of $1$ would raise the intercept of $Y$ by $4$ and the intercept of $r$, at a given $Y$, by $4/100=0.04$ percentage points.
:::
:::

## The LM curve

The money market, with $P$ fixed, is $M/P = L(Y,i)$. Money demand $L$ increases in $Y$ (transactions) and decreases in $i$ (the opportunity cost of holding money rather than a bond). With $\pi^e$ fixed, $i=r+\pi^e$ and we may write $L(Y,r)$.

::: definition LM curve {#def-lm}
The **LM curve** is the set of $(Y,r)$ such that the money market clears at a given $M/P$:

$$
\frac{M}{P} = L(Y,r).
$$ {#eq-lm}

It slopes up: a higher $Y$ raises money demand, and $r$ must rise to keep demand equal to a given real supply. A rise in $M$ or a fall in $P$ shifts LM to the right. In the linear case $L=kY - h r$,

$$
r = \frac{k}{h}\, Y - \frac{1}{h}\,\frac{M}{P}.
$$ {#eq-lm-lin}
:::

Two limiting cases are part of the furniture. If money demand is infinitely interest-elastic ($h\to\infty$) — Keynes’s **liquidity trap**, in which bonds and money are perfect substitutes at a sufficiently low $i$ — LM is horizontal. If money demand is interest-inelastic ($h\to 0$) — the strict quantity-theory case $M/P=kY$ — LM is vertical. IS–LM interpolates between those two classical-versus-Keynesian poles, and that is why the diagram became the organising picture of the post-war “neoclassical synthesis” (Samuelson’s phrase).

::: example Deriving an LM schedule {#ex-lm}
$M/P=500$ and $L=Y-50r$, with $r$ in per cent. Derive LM. Combine with the IS curve of [[#ex-is]] to find $(Y,r)$.
::: solution
$Y-50r=500$, so $Y=500+50r$, or $r=(Y-500)/50$. Set $1700-100r=500+50r$: $1200=150r$, $r=8$, $Y=900$. This is the same point we read off IS at $r=8$, as it had to be.
:::
:::

::: widget plot
f: 13+0.04*g-0.01*x; 0.02*x-m/50
x: 400, 1600
y: 0, 20
sliders: g=100:50:160:5; m=500:300:800:25
labels: \text{IS}; \text{LM}
caption: Output $Y$ on the horizontal axis, the real interest rate $r$ on the vertical, for the linear economy of [[#ex-is]] and [[#ex-lm]]. The IS intercept depends on government purchases $g$; the LM intercept depends on real money $m=M/P$. At $g=100$, $m=500$ the crossing is $(Y,r)=(900,8)$. Raise $g$: IS shifts right, $Y$ and $r$ both rise (partial crowding-out). Raise $m$: LM shifts right, $Y$ rises and $r$ falls. Push $m$ up until $r$ is near zero: further monetary expansion does little — a liquidity-trap parable.
:::

## Policy in IS–LM

::: proposition Fiscal and monetary policy {#prop-policy}
In the linear IS–LM model with an upward-sloping LM and a downward-sloping IS:

1. A rise in $G$ (or a fall in $T$) raises $Y$ and raises $r$. The rise in $Y$ is smaller than the Keynesian-cross multiplier (partial crowding-out of $I$).
2. A rise in $M$ (or a fall in $P$) raises $Y$ and lowers $r$.
3. If LM is vertical, fiscal policy does not change $Y$ (complete crowding-out) and monetary policy changes $Y$ one-for-one with $M$ through the quantity theory, given $P$.
4. If LM is horizontal, fiscal policy attains the Keynesian-cross multiplier and monetary policy does not change $Y$ (the liquidity trap).
:::

::: proof
Solve [[#eq-is-lin]] and [[#eq-lm-lin]] for $Y$:

$$
Y = \frac{\frac{A}{1-c} + \frac{b}{h(1-c)}\frac{M}{P}}{1 + \frac{bk}{h(1-c)}},
$$

where $A=C_0-cT+I_0+G$. Then $\partial Y/\partial G = \bigl(1/(1-c)\bigr) / \bigl(1+bk/(h(1-c))\bigr) \in \bigl(0,\, 1/(1-c)\bigr)$, and $\partial Y/\partial (M/P) > 0$. As $h\to 0$, the fiscal derivative tends to $0$ and $Y\to (1/k)M/P$. As $h\to\infty$, the fiscal derivative tends to $1/(1-c)$ and the monetary derivative tends to $0$. The interest-rate signs follow from substituting $Y$ back into either schedule.
:::

::: example A fiscal expansion {#ex-fiscal}
In the economy of [[#ex-is]]–[[#ex-lm]], raise $G$ from $100$ to $150$, holding $T$ and $M/P$ fixed. Compute the new $(Y,r)$ and the implied crowding-out of $I$. Compare with the Keynesian-cross prediction.
::: solution
IS becomes $Y=1300+4\times 150-100r=1900-100r$. Set $1900-100r=500+50r$: $1400=150r$, $r=28/3\approx 9.333$, $Y=500+50\times 28/3=2900/3\approx 966.67$. Output has risen by about $67$, not by the cross’s $4\times 50=200$. Investment: originally $I=200-25\times 8=0$; after, $I=200-25\times 28/3=200-700/3=-33.33$. The fall in $I$ of $33$ is the crowding-out; extra $G$ of $50$ plus extra $C=0.75\times 67\approx 50$ minus extra $I$ of $-33$ accounts for $\Delta Y\approx 67$. (Original $I=0$ is an artefact of the numbers, not a claim about any economy.)
:::
:::

::: example A monetary expansion {#ex-monetary}
In the same economy, keep $G=100$ and raise $M/P$ from $500$ to $650$. Compute $(Y,r)$.
::: solution
LM becomes $Y-50r=650$, $Y=650+50r$. Set $1700-100r=650+50r$: $1050=150r$, $r=7$, $Y=650+350=1000$. Output has risen by $100$ and $r$ has fallen by a point. Investment has risen from $0$ to $200-175=25$. The transmission mechanism is: extra $M$ would, at the old $(Y,r)$, create excess real balances; $r$ falls to induce the public to hold them; lower $r$ raises $I$ and, through the multiplier, $Y$; higher $Y$ soaks up some of the extra balances, so $r$ need not fall as far as it would at a fixed $Y$.
:::
:::

::: quiz
In IS–LM with an upward-sloping LM, a rise in $G$ will
- [ ] raise $Y$ and lower $r$
- [x] raise $Y$ and raise $r$, with $\Delta Y$ smaller than $1/(1-c)$ times $\Delta G$
- [ ] leave $Y$ unchanged, because of complete crowding-out
- [ ] raise $Y$ by $1/(1-c)$ times $\Delta G$, because $r$ is determined in the money market
::: solution
IS shifts right along an upward-sloping LM: $Y$ and $r$ both rise. The rise in $r$ crowds out some $I$, so the $Y$ gain is smaller than the Keynesian-cross multiplier. Complete crowding-out is the vertical-LM case; the cross multiplier is the horizontal-LM case.
:::
:::

## The liquidity trap and the policy mix

When $i$ is at (or near) its effective lower bound, LM is locally horizontal. Monetary policy that merely expands $M$ — a purchase of short-term government paper that the public already treats as money — does not lower $r$ and does not raise $Y$. Fiscal policy, by contrast, attains the full cross multiplier, because there is no crowding-out through $r$. That is the IS–LM reading of Japan in the late 1990s and of the United States and the euro area in 2009–15, when policy rates sat at or near zero (Bank of Japan, Federal Reserve, ECB historical policy rates; FRED, FEDFUNDS and ECB deposit facility, accessed 2026). Whether *unconventional* monetary policy — quantitative easing, forward guidance — can still shift the analogue of LM is a later question ([[business-cycles/zero-lower-bound]]); in the present diagram, $M$ is the short-term monetary aggregate and the trap is real.

The **policy mix** is the joint choice of $G$ (or $T$) and $M$. A fiscal expansion plus a monetary expansion can raise $Y$ with $r$ unchanged; a fiscal expansion plus a monetary contraction can raise $r$ with $Y$ unchanged. The composition of $Y$ between $C$, $I$ and $G$ then differs. That is a positive statement about the diagram. Which mix a government “should” choose depends on the value placed on public versus private capital, on the starting public debt ([[macroeconomics/fiscal-policy-and-debt]]), and on the inflation outlook — value judgements this course does not make.

A classical objection, the **Pigou (real-balance) effect**, is that even in a trap a fall in $P$ raises $M/P$ and raises wealth, which raises $C$ and shifts IS. Whether that channel is strong enough to restore full employment without a policy shift was the 1930s debate between Pigou and Keynes, and it is not settled by a figure. Empirically, deflation in a debt-ridden economy can also *lower* demand, via Fisher’s debt-deflation: the real burden of nominal debts rises. The two effects have opposite signs; the IS–LM diagram with a fixed IS is silently picking the case where neither is large.

## Competing views

**Keynesians** (Hicks, Modigliani, Tobin; later, fiscal-multiplier researchers) read IS–LM as the right short-run model: $P$ is sticky, $Y$ is demand-determined, and both $G$ and $M$ can move it. They disagree among themselves about the slope of LM and about the size of $c$.

**Monetarists** (Friedman, Brunner and Meltzer) argued that LM is steep, that $V$ is more stable than the Keynesian $C$ and $I$ schedules, and that monetary policy is the reliable demand instrument. Friedman’s 1968 address accepted a short-run IS–LM effect of $M$ on $Y$ and denied it in the long run, once $P$ and $\pi^e$ adjust. That is the bridge to the next chapter.

**New classicals** (Lucas, Sargent, Wallace) treated the sticky-$P$ assumption as an ad hoc restriction inconsistent with rational expectations: only surprise $M$ would move $Y$, and a systematic fiscal or monetary rule would be incorporated into $\pi^e$ and into $C$ and $I$. The Lucas critique of the next-but-one chapter is this objection, aimed at the multipliers of [[#prop-policy]].

**New Keynesians** kept sticky prices, derived an IS curve from the Euler equation of [[macroeconomics/consumption-and-saving]] (the dynamic IS curve), and replaced LM with a Taylor rule for $i$. The three-equation New Keynesian model of [[business-cycles/new-keynesian-model]] is IS–LM–AS with those microfoundations. The qualitative policy experiments of this chapter survive; the dynamics and the role of $\pi^e$ are new.

IS–LM is also a closed-economy model. In an open economy with capital mobility, $r$ may be pinned by the world rate and the extra diagram is Mundell–Fleming ([[international-finance/mundell-fleming]]): fiscal and monetary policy then work differently under fixed and floating exchange rates.

## Evidence

**Multipliers.** Ramey (2011) surveys U.S. estimates of the $G$-multiplier clustered between $0.5$ and $2$, with larger values when monetary policy does not raise $r$ — which is the IS–LM prediction. The IMF (WEO, October 2012) reported that multipliers in the 2009–11 consolidation were larger than the pre-crisis vintages used in forecasts, especially in economies at the lower bound. Ilzetzki, Mendoza and Végh (2013, *Journal of Monetary Economics*) found smaller multipliers in open economies and under flexible exchange rates, and larger ones in developing countries with spare capacity. None of these papers is a licence to pick a favourite number and treat it as a constant.

**Monetary transmission.** Christiano, Eichenbaum and Evans (1999) and a large VAR literature find that a rise in the policy rate lowers $Y$ and $I$ with a lag of a few quarters, and lowers $\pi$ later still. That is the IS–LM-plus-lag picture. The 2022–23 tightening cycle — the Federal Reserve raising the funds rate from near zero in March 2022 to a range of 5.25–5.50 per cent by July 2023 (FRED, FEDFUNDS) — was followed by a slowing of U.S. inflation from a CPI peak of 9.1 per cent year-on-year in June 2022 (BLS) without a 2008-scale recession. Competing readings (a well-anchored $\pi^e$, a supply-shock reversal, a lucky lag) belong to the next chapters; IS–LM alone predicted a fall in $Y$ relative to a no-tightening baseline, not a particular unemployment number.

**The trap.** Japan’s overnight rate was at or below 50 basis points for most of 1995–2024 (Bank of Japan). Broad money growth in that period did not produce a proportional rise in $PY$ (IMF IFS). That is a liquidity-trap / falling-$V$ fact, and it is why the IS–LM special case in clause 4 of [[#prop-policy]] is more than a curiosity.

## Where this leads

[[macroeconomics/aggregate-supply]] lets $P$ (and $\pi$) adjust and builds the Phillips curve; the IS–LM equilibrium at a given $P$ becomes one point on an AD curve. [[macroeconomics/ad-as-and-stabilisation]] uses that AD curve. Open-economy IS–LM is [[international-finance/mundell-fleming]]. The New Keynesian replacement of LM by a Taylor rule is [[business-cycles/monetary-policy-rules]].

::: history
**1936, John Maynard Keynes.** The *General Theory* argued, in chapters 10–15, that $Y$ is determined by aggregate demand when $w$ or $P$ is sticky, that the MPC produces a multiplier, and that $i$ is determined in the money market (liquidity preference). **1937, John Hicks.** “Mr. Keynes and the Classics: A Suggested Interpretation” (*Econometrica*) drew IS and LM (his SI and LL) and classified the classical and Keynesian cases by their slopes. **1944, Franco Modigliani.** “Liquidity Preference and the Theory of Interest and Money” (*Econometrica*) put sticky wages into the diagram and made the full-employment classical case the flex-wage limit. **1956, James Tobin.** “Liquidity Preference as Behavior Towards Risk” gave LM a portfolio-theory foundation.
:::

::: summary
- The Keynesian cross, with $r$ fixed, gives $Y=A/(1-c)$ and a $G$-multiplier of $1/(1-c)$. The tax multiplier is $-c/(1-c)$; the balanced-budget multiplier is $1$.
- IS is goods-market equilibrium in $(Y,r)$ space and slopes down. LM is money-market equilibrium at a given $M/P$ and slopes up.
- Fiscal expansion raises $Y$ and $r$ (partial crowding-out). Monetary expansion raises $Y$ and lowers $r$. Vertical LM: monetary policy does all the work. Horizontal LM (liquidity trap): fiscal policy does all the work.
- The diagram is a short-run, sticky-$P$, closed-economy model. Multipliers estimated in the data vary with the monetary regime, the exchange-rate regime and the gap to $Y_n$.
- Keynesian, monetarist, new classical and New Keynesian readings disagree about the slope of LM, the stickiness of $P$, and whether the multipliers survive a change of policy rule.
:::

## Exercises

::: exercise A cross multiplier {level=1 check="4"}
The MPC is $0.75$ and $r$ is fixed. What is the government-purchases multiplier? (Enter the multiplier.)
::: solution
$1/(1-0.75)=4$.
:::
:::

::: exercise A tax cut in the cross {level=1 check="160"}
In the economy of [[#ex-cross]], with $r$ still fixed, $T$ falls by $40$. What is the change in $Y$? (Enter $\Delta Y$.)
::: solution
The tax multiplier is $-c/(1-c)=-0.8/0.2=-4$. Then $\Delta Y=-4\times(-40)=160$. Equivalently, disposable income rises by $40$ at the old $Y$, consumption rises by $32$ in the first round, and the demand multiplier $1/(1-0.8)=5$ applied to that autonomous consumption gives $160$.
:::
:::

::: exercise An IS intercept {level=1}
Using [[#eq-is-lin]] with $C_0=200$, $c=0.75$, $T=100$, $I_0=200$, $G=100$, $b=25$, write $Y$ as a function of $r$. What $Y$ corresponds to $r=4$?
::: solution
$Y=(200-75+200+100)/0.25 - (25/0.25)r = 1700-100r$, as in [[#ex-is]]. At $r=4$, $Y=1300$.
:::
:::

::: exercise Solving IS–LM {level=2 check="8"}
IS is $Y=1700-100r$ and LM is $Y=500+50r$. Find $r$. (Enter $r$.)
::: solution
$1700-100r=500+50r$, $1200=150r$, $r=8$.
:::
:::

::: exercise A rise in $G$ {level=2}
IS becomes $Y=1900-100r$, LM is still $Y=500+50r$. Find $(Y,r)$. How much of the Keynesian-cross $\Delta Y=200$ (from $\Delta G=50$, $c=0.75$) survives?
::: solution
$1900-100r=500+50r$, $1400=150r$, $r=28/3\approx 9.33$, $Y=2900/3\approx 966.7$. $\Delta Y\approx 66.7$, about one-third of the cross’s $200$. Two-thirds is crowded out through $r$.
:::
:::

::: exercise A vertical LM {level=2}
Suppose $L=0.5 Y$ (no interest elasticity) and $M/P=450$, with the original IS $Y=1700-100r$. Find $(Y,r)$. What does a rise in $G$ that shifts IS to $Y=1900-100r$ do to $Y$ and to $r$?
::: solution
LM is $0.5Y=450$, so $Y=900$ regardless of $r$. On the original IS, $900=1700-100r$, $r=8$. After the fiscal shift, $900=1900-100r$, $r=10$. Output is unchanged; $r$ rises by two points; crowding-out is complete. That is the classical, quantity-theory limit of IS–LM, with $P$ still fixed: $Y$ is determined by $M/P$, and $r$ does all the goods-market adjusting.
:::
:::

::: exercise The policy mix {level=3}
Starting from [[#ex-is]]–[[#ex-lm]], the government wants $Y=1000$ and $r=8$. What combination of $\Delta G$ and $\Delta(M/P)$ achieves that? Interpret the mix.
::: hint
At $r=8$, IS must deliver $Y=1000$, so the IS intercept must rise. LM must still pass through $(1000,8)$.
:::
::: solution
Original IS: $Y=1700-100r$. We need $1000=A-100\times 8$, so $A=1800$. Originally $A=1700$, so the intercept must rise by $100$. Because the intercept of $Y$ is $4G+\text{const}$, $\Delta G=25$. Original LM: $Y=500+50r$. We need $1000=m+50\times 8$, so $m=600$, $\Delta(M/P)=100$. Fiscal expansion of $25$ plus monetary expansion of $100$ raises $Y$ by $100$ and holds $r$ at $8$, so $I$ is uncrowded-out. Compared with a pure monetary expansion to $Y=1000$ (which was [[#ex-monetary]], with $r=7$), this mix has higher $G$ and higher $r$. Compared with a pure fiscal expansion, it has lower $r$ and higher $I$.
:::
:::

::: exercise A liquidity trap {level=3}
LM is $r=2$ for all $Y$ (a horizontal schedule at $r=2$). IS is $Y=1700-100r$. Find $Y$. What does $\Delta G=50$ do? What does a rise in $M$ do, inside this diagram?
::: hint
The Keynesian-cross multiplier is restored because $r$ does not rise.
:::
::: solution
$Y=1700-200=1500$. After $\Delta G=50$, IS is $Y=1900-100r$, so $Y=1900-200=1700$. $\Delta Y=200$, the full cross multiplier of $4\times 50$. A rise in $M$ does not shift a horizontal LM that is already pinned by the lower bound on $i$; $Y$ is unchanged. That is clause 4 of [[#prop-policy]]. Getting out of the trap, in this diagram, is a job for IS (fiscal policy, or an exogenous rise in $I_0$ or $C_0$), unless the monetary expansion can shift IS directly — which is what a real-balance effect, or a QE effect on $I_0$ via asset prices, would mean, and which the basic diagram does not include.
:::
:::
