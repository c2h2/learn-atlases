In December 2008 the Federal Reserve's target federal funds rate reached $0$–$0.25$ percent, and it stayed there until December 2015. The Bank of Japan had already spent most of the years since 1999 at or near zero. The ECB's deposit rate went negative in June 2014; Sweden, Denmark and Switzerland followed. In each case a Taylor-type rule of the kind in [[business-cycles/monetary-policy-rules]], fed with a negative output gap and inflation below target, wanted a *negative* policy rate. The **zero lower bound** (ZLB) — more accurately an **effective lower bound** once banks and cash are allowed for — is the constraint $i_t \ge \underline{i}$ that makes that prescription infeasible.

This chapter puts the constraint into the three-equation model, reads the liquidity trap that results, and studies the three leading unconventional tools: **forward guidance**, **quantitative easing** (QE), and **negative rates**. The discussion is positive: what the tools do inside stated models, and what the 1999–2022 evidence found. It is not a ranking of what a central bank ought to do next, and it is not investment advice. Historical balance-sheet numbers illustrate a mechanism; they are not a forecast of bond returns.

Notation: $\underline{i}$ is the effective lower bound (zero in the textbook, slightly negative in several 2010s implementations). $r_t^n$ is still the natural real rate. $\pi^*$ is the inflation target. Long yields are $i_t^L$.

## The liquidity trap

Keynes (*General Theory*, 1936, ch. 15) described a situation in which money and bonds become close substitutes at a very low short rate, so that open-market operations in short paper cease to ease financial conditions. Krugman (*Brookings Papers*, 1998), writing about Japan, restated the problem in a modern two-period model: if the natural real rate is negative and $\pi^e$ is low, the market-clearing nominal rate is negative, cash dominates bonds, and the economy is short of demand at $i=0$. Eggertsson and Woodford (*Brookings Papers*, 2003) put the same logic into the New Keynesian IS–NKPC block.

::: definition Zero lower bound and liquidity trap {#def-zlb}
The **zero lower bound** is the constraint $i_t \ge 0$ on the policy rate (or $i_t \ge \underline{i}$ at an effective bound). A **liquidity trap** is an equilibrium in which the constraint binds, the IS curve at $i=\underline{i}$ still wants a lower real rate, and extra current-period base money is absorbed as a substitute for short bonds without easing the real rate. Equivalently, $r_t^n + \pi^e_t < \underline{i}$: the Fisher equation cannot deliver the natural real rate.
:::

::: proposition Output gap at a binding ZLB {#prop-zlb-gap}
In the textbook IS curve [[business-cycles/new-keynesian-model#def-dis]] with $\sigma=1$ and a binding $i_t=0$,

$$
\tilde y_t = \E_t\tilde y_{t+1} + \E_t\pi_{t+1} + r_t^n.
$$ {#eq-zlb-is}

A more negative natural rate, or lower expected inflation, or a worse expected future gap, *lowers* current $\tilde y_t$. Expected inflation is expansionary: it is the remaining instrument for the real rate.
:::
::: proof
Set $i_t=0$ in $\tilde y_t = \E_t\tilde y_{t+1} -(i_t-\E_t\pi_{t+1}-r_t^n)$ with $\sigma=1$. Rearrangement is [[#eq-zlb-is]]. Each term on the right enters with a positive sign, so a decline in any of them reduces the current gap.
:::

Equation [[#eq-zlb-is]] is the source of several ZLB paradoxes. **Paradox of toil** (Eggertsson, *NBER Macroeconomics Annual* 2010): a supply-side reform that *lowers* marginal cost and current inflation, at the ZLB, can *raise* the real rate and deepen the slump. **Paradox of flexibility** (Eggertsson and Krugman, *Quarterly Journal of Economics* 2012): making prices *more* flexible can worsen a demand-driven ZLB slump, because it produces more deflation and a higher real rate. Both paradoxes are properties of a binding constraint plus a forward-looking Phillips curve; they reverse once $i$ is free.

::: example A Taylor rule that wants a negative rate {#ex-negative-rule}
Take $r^*=-1$, $\pi^*=2$, $\phi_\pi=1.5$, $\phi_y=0.5$, $\pi=0.5$ and $\tilde y=-4$ (annual percent). What unconstrained Taylor rate does [[business-cycles/monetary-policy-rules#def-taylor]] prescribe? If $\underline{i}=0$, how large is the shortfall?
::: solution
$i = r^*+\pi^*+1.5(\pi-\pi^*)+0.5\tilde y = -1+2+1.5(0.5-2)+0.5(-4) = 1 - 2.25 - 2 = -3.25$. The unconstrained rule wants $-3.25$ percent; the bound at zero leaves a $3.25$ point shortfall. That shortfall is a real-rate gap of the same order if expected inflation is stuck near $0.5$ percent, and IS then delivers a large negative $\tilde y$ — which was the input, so a consistent ZLB equilibrium has to solve for $\tilde y$ and $\pi$ jointly, not take them as given. The arithmetic only shows that a 2009-like configuration *wants* a negative rate.
:::
:::

::: warning The bound is on the nominal rate, not on the real rate
A negative *real* rate is common and unconstrained: $i=0$ and $\pi^e=2$ already deliver $r=-2$. The ZLB is a problem only when the *natural* real rate lies below what $i=\underline{i}$ and available $\pi^e$ can produce. Raising $\pi^e$ (a higher target, or a credible promise of future inflation) is, in the model, a substitute for a negative $i$. Whether a central bank can actually raise $\pi^e$ at the bound is the forward-guidance question below, not a theorem.
:::

::: widget plot
f: 1.5*x + 0.5*g
sliders: g=0:-4:4
x: -4, 6
y: -4, 8
hlines: 0
labels: \text{unconstrained Taylor}
caption: Horizontal axis is inflation, vertical axis is the prescribed policy rate $i=1.5\pi+0.5\tilde y$ (intercept omitted). The horizontal line is the ZLB $i=0$. Move the gap $g$ down and watch the unconstrained rule cross below zero: that is the region where the linear Taylor rule is not feasible. The actual instrument would sit on the horizontal line instead of on the sloping one.
:::

The widget has no useful slider; it is a picture of the kink. The next one puts the kink into a dynamic path.

::: widget odesolver
f: -0.15*y
y0: 1.2
t: 0, 30
exact: 1.2*exp(-0.15*t)
h: 1
caption: Inflation (or a gap) mean-reverting while $i$ is *unconstrained*: $\dot\pi=-0.15\pi$. At the ZLB the same economy has a coefficient that can change sign — expected deflation raising the real rate — and the path need not return to target. Compare, conceptually, with a rule that is free to cut $i$. The figure itself is the unconstrained decay; the text is the contrast.
:::

## Forward guidance

If today's $i$ cannot fall, tomorrow's $i$ might still be promised. **Forward guidance** is a statement about the future path of the policy rate, or about the conditions (inflation, unemployment) that will govern that path. Eggertsson and Woodford (2003) showed that the optimal commitment at the ZLB is to keep $i=\underline{i}$ *after* the natural rate has recovered, generating a boom and inflation that, expected from inside the trap, ease the current real rate through [[#eq-zlb-is]]. Werning (*NBER*, 2011) derived the continuous-time version: the optimal path is a delayed lift-off with inflation overshooting $\pi^*$.

::: definition Forward guidance {#def-fg}
**Delphic** forward guidance is a forecast of the bank's likely instrument, given its reaction function and the outlook. **Odyssean** forward guidance is a commitment to a reaction function that the bank would, under discretion, later wish to abandon — typically, a promise to stay at $\underline{i}$ longer than a Taylor rule would. The Eggertsson–Woodford prescription is Odyssean.
:::

The **forward-guidance puzzle** (Del Negro, Giannoni and Patterson, FRBNY 2012; Carlstrom, Fuerst and Paustian, *Journal of Monetary Economics* 2015; McKay, Nakamura and Steinsson, *American Economic Review* 2016) is that in a textbook NK model a promise of a lower $i$ several years hence has an implausibly large effect on current $\tilde y$ and $\pi$, because the Euler equation discounts only at $\beta\approx 0.99$. Incomplete markets, finite lives and sticky information all damp the puzzle; they also damp the power of the tool. Evidence from the Fed's 2011–14 date-based and threshold-based guidance, the ECB's 2013 "lower for longer", and the Bank of England's 2013 unemployment threshold is that yields moved on announcement, but by tens of basis points, not by the several points a naive NK Euler equation can produce (Campbell, Evans, Fisher, Justiniano, *Brookings* 2012, on Delphic versus Odyssean in FOMC language).

::: example A two-period promise {#ex-fg}
A two-period economy is at the ZLB in period $1$ and unconstrained in period $2$. IS in period $1$ is $\tilde y_1 = \tilde y_2 - (0 - \pi_2 - r_1^n)$ with $\sigma=1$. Suppose $r_1^n=-0.02$, $\tilde y_2=0$ under discretion (lift-off as soon as possible, $\pi_2=0$). What is $\tilde y_1$? If commitment sets $\pi_2=0.02$ and $\tilde y_2=0.02$, what is $\tilde y_1$?
::: solution
Discretion: $\tilde y_1 = 0 - (0-0-(-0.02)) = -0.02$. The gap is $-2$ percent. Commitment: $\tilde y_1 = 0.02 - (0-0.02-(-0.02)) = 0.02 - (0.00) = 0.02$. The same IS, with a promised boom and inflation, turns a $-2$ percent gap into a $+2$ percent gap. The numbers are a classroom scaling of Eggertsson–Woodford, not an estimate for 2011. The incentive to renege in period $2$ — when $r_2^n$ is back and the Taylor rule wants a positive $i$ — is the time-inconsistency of [[business-cycles/monetary-policy-rules#def-discretion]], now in a ZLB costume.
:::
:::

## Quantitative easing

Once short rates are at $\underline{i}$, buying short government paper in exchange for reserves does little: that is the definition of the trap. Buying *long* government paper, or private paper, can still matter if those assets are not perfect substitutes for reserves — a preferred-habitat or segmented-market failure (Vayanos and Vila, *Review of Financial Studies* 2021, building on a 2009 working paper; Tobin's 1960s portfolio balance). **Quantitative easing** is the purchase of such assets, paid for by creating reserves, with the aim of lowering long yields $i^L$ or credit spreads and thereby easing IS even at $i=\underline{i}$.

::: definition Quantitative easing {#def-qe}
**Quantitative easing** is a large-scale, announced purchase of longer-duration or private securities by the central bank, financed by reserve creation, undertaken when the short policy rate is at or near $\underline{i}$. The channels in the literature are (i) **signalling** of a longer spell at $\underline{i}$ (so QE is a complement to forward guidance), (ii) **portfolio balance** through duration or credit-risk extraction, and (iii) **liquidity** in the market being purchased. Which channel dominates is an empirical dispute.
:::

Dated programmes, for orientation, not as a menu of trades:

- **Federal Reserve.** QE1 announced November 2008 (agency MBS and debt, later Treasuries); QE2 November 2010 (Treasuries); QE3 September 2012 (open-ended MBS and Treasuries). The Fed's securities holdings rose from about USD $0.5$ trillion before the crisis to about USD $4.5$ trillion by 2015, and again to about USD $8.5$ trillion in 2022 after the 2020 facilities (Federal Reserve H.4.1). Those stocks were later reduced by runoff; the path is not a recommendation.
- **Bank of England.** Asset Purchase Facility from March 2009; several expansions through 2020 (Bank of England).
- **Bank of Japan.** Quantitative and Qualitative Easing from April 2013, later yield-curve control (2016) targeting the 10-year JGB yield (Bank of Japan statements).
- **ECB.** Public Sector Purchase Programme from 2015; Pandemic Emergency Purchase Programme from 2020 (ECB).

Event-study estimates of QE1 on 10-year Treasury yields are on the order of $-50$ to $-100$ basis points around the 2008–09 announcements (Gagnon, Raskin, Remache, Sack, *International Journal of Central Banking* 2011; Krishnamurthy and Vissing-Jorgensen, *Brookings* 2011). Later rounds, when yields were already low, produced smaller estimates. Krishnamurthy and Vissing-Jorgensen emphasised *which* asset is bought: MBS purchases compressed MBS spreads more than duration-matched Treasury purchases would. Greenlaw, Hamilton, Harris and West (*Brookings* 2018) argued that the stock effects are smaller and less reliable than the early event studies claimed. The range is the state of the evidence; this course does not pick a point in it.

Duration arithmetic makes the portfolio-balance channel thinkable.

::: example Duration and a yield move {#ex-duration}
A 10-year par bond has modified duration $8$. If its yield falls by $25$ basis points, by about what percent does its price rise? If a central-bank purchase is estimated to have caused that yield move, is the $2$ percent a household trading profit the reader should try to capture?
::: solution
The first-order (modified-duration) approximation is $\Delta P/P \approx -D\,\Delta y = -8\times(-0.0025)=0.02$, a $2$ percent price rise. That is an accounting identity about a bond already held, given a yield change. It is not a forecast of the next $25$ basis points, not a recommendation to buy the bond, and not a statement that QE will repeat. Event-study estimates of QE are about past announcement windows; they are not a trading rule.
:::
:::

Whether a given purchase *causes* those $25$ basis points is the identification problem the event studies are trying to solve.

::: quiz
At a binding ZLB, creating more current-period reserves by buying *short* government bills
- [x] does little to the real rate if bills and reserves are already perfect substitutes
- [ ] automatically lowers long yields one-for-one by arbitrage
- [ ] violates the Taylor principle
- [ ] is the definition of Odyssean forward guidance
::: solution
That is Krugman's and Keynes's trap: extra money is a substitute for short paper. Long yields move only if the purchase changes expected future short rates (signalling) or if markets are segmented (portfolio balance). Neither is automatic. Forward guidance is a statement about future $i$, not a bill purchase. The Taylor principle is about the slope of the rule when $i$ is free.
:::
:::

## Negative rates and the effective bound

Several central banks set a policy rate below zero: Denmark (2012, on some deposits), the ECB (2014, deposit facility), Switzerland (2015), Sweden (2015), the Bank of Japan (2016, on a slice of reserves). The lower bound is **effective**, not zero, because cash pays a zero nominal return *minus storage costs*. Once $i$ is more negative than those costs, a flight into cash would undo the policy. In practice, tiered reserve systems and the inconvenience of wholesale cash allowed modestly negative rates without a mass conversion into notes (Eisenschmidt and Smets, ECB working paper 2019; IMF 2017 staff discussion).

The transmission is the same IS real-rate channel, plus a possible compression of bank net interest margins that could *tighten* credit supply (Brunnermeier and Koby's "reversal rate", 2018 working paper). Evidence from the euro area and Nordic banks is mixed: some compression of margins, no collapse of lending in the 2014–19 sample (Rostagno et al., ECB 2019). The tool is therefore not free, and it is not unbounded. By 2022 every one of those central banks was raising rates again as inflation returned (national and ECB announcements); the 2010s experiment was a spell, not a regime.

::: example Cash and the effective bound {#ex-cash}
A note in a vault pays a nominal return of zero minus a storage cost of $0.6$ percent a year. A reserve balance at the central bank pays $i$. For which $i$ does a large wholesale depositor prefer vault cash to reserves, ignoring insurance and convenience? What does that say about $\underline{i}$?
::: solution
Cash dominates when $0-0.6 > i$, i.e. when $i < -0.6$ percent. The effective lower bound is then around $-0.6$, not $0$, for that depositor. Smaller storage costs (or easier conversion) raise $\underline{i}$ toward zero; tiering that exempts a slice of reserves from the negative rate raises the volume of reserves that can be charged a negative rate before cash looks attractive. The calculation is an arbitrage bound, not a forecast of the next policy-rate decision.
:::
:::

## Evidence from three regions

**Japan, 1999–2012.** Overnight rates near zero, a shrinking (then slowly growing) nominal GDP, and inflation that was on average slightly negative in the 2000s (Cabinet Office; Bank of Japan). Krugman 1998 and Eggertsson–Woodford 2003 were written for this episode. Whether the trap was primarily a low $r^n$ from demographics and a post-bubble balance-sheet repair, or a sequence of insufficiently aggressive commitments on $\pi$, is still argued (Ito and Mishkin in NBER *Monetary Policy under Very Low Inflation*, 2006; Ueda, *Journal of the Japanese and International Economies* 2012). QQE from 2013 and the 2 percent target raised inflation into positive territory without a sustained overshoot (Bank of Japan CPI series).

**United States and United Kingdom, 2008–15.** NBER recession December 2007–June 2009; UK recession 2008–09 (ONS). Policy rates at the bound, QE, and (from 2011–12) increasingly explicit forward guidance. Unemployment peaked at 10.0 percent in the United States (October 2009, BLS) and 8.5 percent in the United Kingdom (late 2011, ONS). Inflation did not spiral into deflation; that is the "missing disinflation" of the NK evidence section, and it is also a reason the ZLB was less explosive than a 1930s analogy.

**Euro area, 2014–22.** Deposit rate negative, PSPP then PEPP, and a second recession in 2011–13 that the United States did not have (CEPR dating). Periphery sovereign spreads, not only the policy rate, were the IS shifter — a financial-friction overlay that [[business-cycles/financial-frictions]] takes up. Negative rates and QE coexisted with a slow return of inflation to 2 percent, then a 2022 overshoot (Eurostat HICP).

None of these paragraphs is a verdict on "did QE work?". Event studies say announced purchases moved yields. Macro multipliers from those yield moves to $\tilde y$ require a model, usually an NK model with a long-rate term in IS. Alternative models (a real business cycle with a binding credit constraint and no nominal rigidity) can also produce a role for asset purchases if they relax the constraint. The data have not forced a single reading.

## Where this leads

Financial frictions make the ZLB more dangerous: a spread can push the *effective* borrowing rate up while the policy rate is stuck, which is 2008 in one sentence. Fiscal policy, in [[business-cycles/fiscal-stabilisation]], has a larger NK multiplier when $i$ is stuck, because there is no Taylor-rule crowding-out of the extra $G$. That is a model result (Christiano, Eichenbaum and Rebelo, *Journal of Political Economy* 2011) and a live empirical dispute. Exit from the bound — 2015 in the United States, 2022 almost everywhere — raises the time-inconsistency of Odyssean promises in reverse: a bank that promised to overshoot $\pi^*$ and then does not, because inflation has already returned, is the period-$2$ reneging of [[#ex-fg]].

::: history
**1936, John Maynard Keynes.** The *General Theory*'s liquidity trap is a money-demand schedule that becomes perfectly elastic at a low short rate. **1998, Paul R. Krugman.** "It's Baaack" (*Brookings*) restated the trap for Japan as a negative natural rate plus a zero bound. **2003, Gauti B. Eggertsson and Michael Woodford.** Optimal commitment at the ZLB is a delayed lift-off and an inflation overshoot — the theoretical case for Odyssean forward guidance. **2008–09, Federal Reserve and Bank of England.** The first large-scale QE programmes of the modern era were announced as the policy rate hit the bound.
:::

::: summary
- The ZLB (or effective lower bound) is $i_t\ge\underline{i}$. A liquidity trap is an equilibrium in which that constraint prevents the real rate from matching $r_t^n$.
- At a binding bound, expected inflation and expected future gaps are expansionary. Deflation and a worse outlook are contractionary — the opposite of some unconstrained comparative statics.
- Odyssean forward guidance promises a later boom; Delphic guidance is a forecast. Textbook NK effects are large (the forward-guidance puzzle); estimated announcement effects are smaller.
- QE is a purchase of imperfect substitutes for reserves. Event studies of 2008–09 find tens of basis points on long yields; later rounds and alternative identifications find less. Channels (signalling, portfolio balance, liquidity) are not settled.
- Negative policy rates in 2014–19 showed that $\underline{i}$ can be slightly below zero. They are bounded by cash and by bank margins.
:::

## Exercises

::: exercise Unconstrained Taylor at the bound {level=1 check="-2"}
With $r^*=0$, $\pi^*=2$, $\phi_\pi=1.5$, $\phi_y=0.5$, $\pi=0$ and $\tilde y=-2$, what unconstrained $i$ does the Taylor rule prescribe? (Enter the signed rate.)
::: solution
$i=0+2+1.5(0-2)+0.5(-2)=2-3-1=-2$.
:::
:::

::: exercise ZLB IS {level=1}
From [[#eq-zlb-is]], if $\E\tilde y_{t+1}=0$, $\E\pi_{t+1}=0$ and $r_t^n=-0.03$, what is $\tilde y_t$? Interpret.
::: solution
$\tilde y_t=-0.03$, a $3$ percent negative gap. With $i=0$ and no expected inflation, the real rate is zero, three points above a natural rate of $-3$ percent, and IS (with $\sigma=1$ and no expected future gap) maps that real-rate gap one-for-one into $\tilde y$.
:::
:::

::: exercise Duration {level=1 check="4"}
Modified duration is $8$. A yield *rise* of $50$ basis points changes the price by about how many percent, with a minus sign for a fall? (Enter the signed percent change, e.g. -4.)
::: solution
$\Delta P/P \approx -8\times 0.005 = -0.04$, a $4$ percent fall, so $-4$.
:::
:::

::: exercise Delphic versus Odyssean {level=2}
The FOMC states that it "expects to keep the funds rate at the bound until unemployment has fallen below $6.5$ percent, provided inflation remains below $2.5$ percent" (the 2012 threshold language, paraphrased). Is this Delphic, Odyssean, or a mixture, and why does the distinction matter for [[#eq-zlb-is]]?
::: solution
It is a mixture. As a description of a reaction function the public already believed, it is Delphic: it updates $\E\tilde y$ and $\E\pi$ by clarifying the outlook, not by changing the rule. As a threshold that may keep $i$ at zero *even after* a Taylor rule would have lifted off, it is Odyssean. Only the Odyssean piece changes the mapping from current $r^n$ to future $i$ and therefore, through [[#eq-zlb-is]], the current gap. Campbell et al. (2012) read a good deal of FOMC language as Delphic; Eggertsson–Woodford want Odyssean. The same sentence can be both, which is why announcement dummies do not measure the Eggertsson–Woodford multiplier.
:::
:::

::: exercise Paradox of toil {level=2}
A reform raises potential output and, at a given $Y$, lowers marginal cost and current inflation. Using [[#eq-zlb-is]] and a Phillips curve, explain why this can *reduce* $\tilde y_t$ at a binding ZLB, and why the same reform is expansionary when $i$ is free.
::: solution
Lower current inflation, if it also lowers $\E\pi$, *raises* the real rate at $i=0$, which lowers $\tilde y$ through IS. If the reform is anticipated, $\E\tilde y_{t+1}$ may also fall. When $i$ is free, the Taylor rule *cuts* $i$ with inflation, the real rate falls or stays put, and the extra $y^n$ is allowed to pass into $Y$. The sign of a supply reform therefore depends on whether the bound is binding. That is Eggertsson's paradox of toil, not a reason to oppose reforms outside the trap.
:::
:::

::: exercise Expected inflation as an instrument {level=2}
At $i=0$, $\sigma=1$, $\E\tilde y_{t+1}=0$, $r_t^n=-0.02$. What $\E\pi_{t+1}$ would deliver $\tilde y_t=0$? Relate the answer to a higher inflation *target*.
::: solution
$0 = 0 + \E\pi_{t+1} - 0.02$, so $\E\pi_{t+1}=0.02$. A two-percent expected inflation makes the real rate $-2$ percent, matching $r^n$. A credible rise in $\pi^*$ that raises $\E\pi$ is, in this arithmetic, a substitute for a negative policy rate. Credibility is the whole problem: the bank is at the bound *because* $\pi$ is already too low, so promising a higher $\pi^*$ is Odyssean.
:::
:::

::: exercise QE identification {level=3}
Gagnon et al. (2011) and Greenlaw et al. (2018) disagree on the size of QE's effect on long yields. State one reason an announcement-window event study might *overstate* the persistent effect of a purchase, and one reason it might *understate* it.
::: hint
Think about signalling versus stock, about leaks before the window, and about the difference between a surprise and a stock that remains.
:::
::: solution
Overstatement: the window captures a signalling channel (the purchase tells the public that lift-off is further off) that a later, fully anticipated purchase of the same stock would not repeat; it also captures other news in the same window (risk-off, fiscal announcements). Understatement: if the programme was leaked or priced ahead of the official window, the yield move has already happened; if markets are slow, some of the portfolio-balance effect arrives after the window. Neither bias is a reason to ignore event studies; it is a reason the range from $20$ to $100$ basis points for QE1 is the honest summary.
:::
:::

::: exercise Optimal delay {level=3}
Eggertsson and Woodford (2003) and Werning (2011) want the bank to keep $i=\underline{i}$ after $r^n$ has recovered. Using time inconsistency, explain why a purely discretionary bank will lift off too soon, and how a price-level target (rather than an inflation target) can implement the delay without a period-by-period promise.
::: hint
A price-level target makes up for past misses; an inflation target lets bygones be bygones.
:::
::: solution
Once $r^n$ has recovered, discretion wants $\tilde y=\pi=0$ immediately (the FOC of [[business-cycles/monetary-policy-rules#prop-bias]] with $k=0$ and $u=0$). The optimal commitment wanted a boom and extra inflation *then*, in order to ease the real rate *during* the trap. A price-level target that was missed on the downside during the trap requires extra inflation afterwards to return $p_t$ to the path — the history dependence of Woodford's timeless perspective, implemented as a target rather than as a speech. An inflation target that resets every period lets the miss stand and therefore cannot commit to the overshoot. Whether any central bank has operationalised this is a separate, institutional question; the logic is the same as [[business-cycles/monetary-policy-rules#def-discretion]].
:::
:::
