A drought that ruins a harvest, a crash in export demand, a central bank that raises its policy rate, a finance ministry that cuts $G$: each of these is a shock, and the **AD–AS model** is the picture that classifies them. Aggregate demand, inherited from IS–LM, slopes down in $(Y,P)$ space. Short-run aggregate supply, inherited from the previous chapter, slopes up. Long-run aggregate supply is vertical at $Y_n$. Demand shocks move $Y$ and $P$ in the same direction in the short run; supply shocks move them in opposite directions. In the long run $Y$ returns to $Y_n$ and $P$ absorbs the shock.

That classification is the easy part. The hard part is **stabilisation policy**: whether, and how, a government or a central bank should shift AD in response. Lags, the distinction between rules and discretion, the inflationary bias of time-inconsistent policy, and the Lucas critique are the standard objections to treating the AD–AS diagram as a joystick. This chapter sets those objections out as positive arguments. It does not conclude that a country “should” adopt a particular rule, a particular target, or a particular discretionary path. The material is for education only — not a recommendation of any monetary or fiscal programme, and not a forecast.

## Aggregate demand from IS–LM

At a given $P$, IS–LM determines $Y$. A higher $P$ lowers real balances $M/P$, shifts LM left, raises $r$ and lowers $Y$. The locus of those pairs is the AD curve.

::: definition Aggregate demand {#def-ad}
The **aggregate-demand (AD) curve** is the set of $(Y,P)$ such that the goods and money markets both clear in IS–LM. It slopes down. A rise in $M$, a rise in $G$, a fall in $T$, or a rise in $C_0$ or $I_0$ shifts AD to the right. In the liquidity trap (horizontal LM) a rise in $M$ does not shift AD; a rise in $G$ does.
:::

::: proposition The slope of AD {#prop-ad-slope}
In the linear IS–LM model of [[macroeconomics/is-lm]],

$$
Y = \frac{\frac{A}{1-c} + \frac{b}{h(1-c)}\frac{M}{P}}{1 + \frac{bk}{h(1-c)}},
$$ {#eq-ad}

with $A=C_0-cT+I_0+G$. Hence $\partial Y/\partial P < 0$ whenever $b,h>0$. As $h\to\infty$ (liquidity trap), $Y$ becomes independent of $M/P$ and AD is vertical in $(Y,P)$ at the Keynesian-cross output. As $h\to 0$ (quantity theory), $Y=(1/k)M/P$ and AD is a rectangular hyperbola, the same shape as the classical $MV=PY$ schedule with $V=1/k$.
:::

::: proof
The displayed formula is the IS–LM solution of [[macroeconomics/is-lm#prop-policy]]. Differentiating in $P$ gives a negative sign from $M/P$. The two limits are the same as in that proposition, rewritten in $(Y,P)$ space.
:::

AD is *not* a sum of $C+I+G$ plotted against $P$ from a micro demand curve. It is an equilibrium locus, and it already has the Keynesian multiplier and the money-market crowding-out inside it. Shifting $G$ shifts AD by the IS–LM fiscal multiplier, not by the Keynesian-cross multiplier, except in the trap.

## Demand shocks, supply shocks and the transition

::: definition Demand and supply shocks {#def-shocks}
A **demand shock** is a shift of AD: a change in $M$, $G$, $T$, $C_0$, $I_0$, or (in an open economy) in net exports at a given $P$. A **supply shock** is a shift of SRAS, and possibly of LRAS: a change in $P^e$, in $v$ on the Phillips curve, in $A$, or in $u_n$.
:::

A positive demand shock raises $Y$ and $P$ in the short run (a move along SRAS). As $P^e$ adjusts, SRAS shifts up, $Y$ returns to $Y_n$, and $P$ rises further. In the long run the shock is in $P$ only, unless it also changed $Y_n$ (a productive public investment, a labour-supply shift). A negative supply shock (an oil-price jump) raises $P$ and lowers $Y$ in the short run — stagflation. If the shock is transitory and $Y_n$ is unchanged, SRAS eventually returns; if it is a permanent fall in $A$, LRAS shifts left as well.

::: example A monetary expansion in AD–AS {#ex-mon-adas}
$Y_n=1000$. Initially $P=P^e=10$ and $Y=1000$. AD shifts right because $M$ doubles. In the short run, with $P^e$ fixed, the new crossing is $Y=1040$, $P=12$. What is the long-run $(Y,P)$ if money is neutral? Sketch the path of $P^e$.
::: solution
Neutrality says that doubling $M$ doubles $P$ once $Y$ is back at $Y_n$, so the long-run point is $(Y,P)=(1000,20)$. $P^e$ must rise from $10$ to $20$; each step of that rise shifts SRAS up, $Y$ falls back from $1040$ toward $1000$, and $P$ rises from $12$ toward $20$. Under adaptive expectations the path is drawn out; under rational expectations and flexible prices it is a jump. Under rational expectations and sticky prices it is a jump in $\pi^e$ plus a grind of unreset prices, the New Keynesian mix.
:::
:::

::: widget plot
f: 14-0.01*(x-200); pe+(x-1000)/25
x: 600, 1400
y: 4, 24
sliders: pe=10:6:20:0.5
vlines: 1000
labels: \text{AD}; \text{SRAS}
caption: $Y$ on the horizontal axis, $P$ on the vertical. The vertical line is LRAS at $Y_n=1000$. AD is downward-sloping; SRAS is drawn for the slider $P^e$. Start at $pe=10$ and imagine AD having just shifted right (the drawn AD already reflects a boom). Raise $pe$: the economy slides up along AD, $Y$ falls toward $1000$, $P$ rises. That is the stabilisation the classical dichotomy predicts, once expectations catch up. A supply shock would be a jump in $pe$ *without* a prior AD shift: $Y$ and $P$ then move in opposite directions.
:::

::: quiz
A one-time rise in oil prices, with $Y_n$ eventually unchanged, will in the short run
- [ ] raise $Y$ and raise $P$
- [x] lower $Y$ and raise $P$
- [ ] lower $Y$ and lower $P$
- [ ] leave $Y$ and $P$ unchanged, because oil is not in the production function of [[macroeconomics/national-income]]
::: solution
Oil as a cost shock shifts SRAS up (a positive $v$ on the Phillips curve). The short-run crossing has higher $P$ and lower $Y$. In the long run, if $Y_n$ is unchanged, SRAS returns as $v$ dies out and as $P^e$ adjusts to whatever AD dictates. Oil *can* also lower $Y_n$ if it is a scarce input that has become permanently dearer; that is an LRAS shift, and it is a different experiment.
:::
:::

::: example A negative demand shock {#ex-demand}
Starting from $Y=Y_n=1000$, $P=P^e=10$, AD shifts left. The short-run crossing is $Y=960$, $P=9$. Describe the long-run point if the shock is a fall in $M$ of 10 per cent, and if instead it is a fall in $I_0$ with $M$ unchanged.
::: solution
A 10 per cent fall in $M$, with neutrality, gives long-run $(Y,P)=(1000,9)$. $P^e$ falls from $10$ toward $9$, SRAS shifts down, $Y$ recovers, $P$ falls a little further from $9$ toward $9$ — here the short-run $P$ already *is* the long-run $P$, which is a coincidence of the numbers, not a general fact; typically short-run $P$ undershoots the long-run $P$ on the way down. A fall in $I_0$ with $M$ fixed: long-run $Y=1000$ still, but $r$ is lower (investment demand has fallen) and $P$ must fall until $M/P$ has risen enough to clear the money market at that lower $r$. The long-run $P$ is then below $9$ if the short-run crossing already used some of the real-balance channel. In both cases $u$ returns to $u_n$; the composition of $Y$ differs.
:::
:::

::: example A supply shock with a policy response {#ex-supply-pol}
A transitory oil shock moves the economy to $Y=960$, $P=12$, with $Y_n=1000$ still. If the central bank shifts AD right to restore $Y=1000$ immediately, what happens to $P$ in the short run? If it shifts AD left to restore $P=10$, what happens to $Y$?
::: solution
Restoring $Y=1000$ along the new SRAS requires a still higher $P$ — accommodation, extra inflation. Restoring $P=10$ requires a still lower $Y$ — a deeper recession. The diagram classifies the trade-off; it does not pick a point on it. A purely transitory $v$ that will reverse next period makes accommodation more attractive on a loss function that weights $Y$ gaps, and makes holding $P$ more attractive on one that weights $\pi$ — provided $\pi^e$ does not jump. If $\pi^e$ does jump, SRAS stays up and the “transitory” shock has a longer tail. That is the credibility channel of the previous chapter, read in $(Y,P)$ space.
:::
:::

## Policy lags and the case for and against leaning against the wind

Stabilisation policy is the attempt to shift AD so as to offset a shock that would otherwise open a gap $Y-Y_n$. Three lags, named by Friedman, stand in the way.

The **inside lag** is the time to recognise the shock and to decide. Monetary-policy committees now meet on a published schedule, which shortens this lag relative to a mid-twentieth-century fiscal budget. The **outside lag** is the time from the decision to the effect on $Y$ and $\pi$. VARs put the peak effect of a policy-rate change on $Y$ several quarters out, and the effect on $\pi$ later still (Christiano, Eichenbaum and Evans 1999). Fiscal outside lags depend on the instrument: a transfer can arrive in weeks; an infrastructure project in years. The **recognition** of $Y_n$ itself is a lag of a sort: $u_n$ and $Y_n$ are estimated with error, and they move (CBO revisions to U.S. potential output after 2008 were large).

Friedman (1953, “The Effects of a Full-Employment Policy on Economic Stability”) argued that with long and variable lags, a policy that tries to offset shocks can end up adding noise — hitting AD after the shock has already reversed. Automatic **stabilisers** (unemployment insurance, a progressive tax, in some countries a short-time work scheme) have no inside lag, which is their attraction; they also have no discretion, which is an attraction or a defect depending on the shock. The 2020 fiscal response in high-income countries was discretionary and fast, because the shock was obvious; the 2008–09 response was slower in some countries than in others (IMF Fiscal Monitor, various issues). Those are facts about lags, not a ranking of the programmes.

::: remark Fine-tuning versus regime
The AD–AS diagram invites **fine-tuning**: see a gap, shift AD. A **regime** view (a Taylor rule, an inflation target, a fiscal rule) instead specifies a reaction function in advance. The two can coincide — a Taylor rule *is* a systematic shift of AD — and they come apart when the policymaker improvises. The rest of this chapter is about why a regime and a sequence of improvisations are not the same object, even if they describe the same $(Y,\pi)$ path *ex post*.
:::

## Rules versus discretion and time inconsistency

::: definition Discretion, rules and time inconsistency {#def-rules}
**Discretion** is period-by-period optimisation by the policymaker, taking the current state (including $\pi^e$) as given. A **rule** is a commitment to a reaction function, including in states that have not yet arrived. A plan is **time-inconsistent** if the action it prescribes for a future date is not what the policymaker will want to do when that date arrives (Kydland and Prescott 1977, *Journal of Political Economy*).
:::

The monetary illustration is Barro and Gordon (1983, *Journal of Monetary Economics*). Society dislikes $\pi$ and dislikes $u-u_n$. The Phillips curve is [[macroeconomics/aggregate-supply#eq-pc]]. Under discretion, the policymaker takes $\pi^e$ as given and chooses $\pi$ (via AD) to buy a little less unemployment. Rational private agents set $\pi^e$ equal to the $\pi$ they know the policymaker will choose, so in equilibrium $u=u_n$ and $\pi$ is *higher* than the policymaker’s preferred rate — an **inflationary bias**. Under a committed rule of $\pi=0$ (or $\pi$ at a chosen target), $u=u_n$ still, but $\pi$ is lower, which is better on the policymaker’s own objective. The committed rule is not time-consistent: once $\pi^e=0$, the policymaker would like to renege and inflate. Institutions that make reneging costly — an independent central bank, a published target, a reputation — are, on this argument, devices for commitment.

The argument is positive: it explains why a central bank that “just optimises” every period may deliver more inflation than one that is bound, and why announcing a target is not the same as being expected to hit it. It is not a proof that any particular numerical target is the right one, nor that independence always delivers the committed optimum (a bank can be independent and still have an inflationary objective, or a disinflationary one that a fiscal authority does not share).

::: example An inflationary-bias parable {#ex-bias}
Let the output gap be $y=\alpha(\pi-\pi^e)$ with $y_n=0$, and let the policymaker’s period loss be $\tfrac12\pi^2+\tfrac12\lambda(y-k)^2$ with $k>0$ (a temptation to push output above potential). Under discretion $\pi^e$ is taken as given. Show that the rational-expectations equilibrium has $y=0$ and $\pi=\lambda\alpha k$. Compare the loss with a committed rule $\pi=0$.
::: solution
Differentiate the loss in $\pi$, holding $\pi^e$ fixed: $\pi+\lambda(y-k)\alpha=0$. Under rational expectations, $y=0$, so $\pi=\lambda\alpha k$. Loss is $\tfrac12(\lambda\alpha k)^2+\tfrac12\lambda k^2$. Under commitment to $\pi=0$ (hence $\pi^e=0$ and $y=0$), loss is $\tfrac12\lambda k^2$, which is smaller by the inflation-bias term $\tfrac12(\lambda\alpha k)^2$. If $k=0$, the temptation vanishes and so does the bias — the Rogoff (1985) conservative-central-banker argument is to appoint someone with a smaller $k$ or a larger weight on $\pi$.
:::
:::

::: warning Discretion is not chaos, and a rule is not a law of nature
Kydland–Prescott “rules” are commitments, not mechanical formulae immune to new information. A Taylor rule with a shock term is still a rule in their sense if the shock term is a commitment to how new information will be used. Discretion is not the same as “looking at the data”. The distinction is whether the reaction to the data is the one that was optimal to announce, or the one that is optimal taking $\pi^e$ as water under the bridge. Confusing the two makes the 1977 paper look like a plea for rigidity; it is a plea for consistency.
:::

## The Lucas critique

::: definition The Lucas critique {#def-lucas}
Lucas (1976, “Econometric Policy Evaluation: A Critique”) observed that estimated reduced-form relations — consumption functions, Phillips curves, money-demand equations — depend on the policy *rule* that was in force in the sample. A multiplier estimated under one rule is not invariant to a change of rule, because private agents’ expectations, and therefore their decision rules, change.
:::

The Keynesian-cross multiplier $1/(1-c)$ is a reduced form. If a new fiscal rule causes households to revise $Y^P$, $c$ changes ([[macroeconomics/consumption-and-saving]]). The Phillips slope $\beta$ estimated under a Goldilocks inflation-targeting regime is not the $\beta$ that will appear if the regime is abandoned. IS–LM policy experiments that treat the schedules as structural commit the critique. The New Keynesian programme is, in large part, an attempt to write down the structural Euler equation, Phillips curve and policy rule so that a change of rule can be analysed without re-estimating the private-sector block.

The critique is sometimes over-read. It does not say that all econometrics is useless, and it does not say that no reduced form is ever stable. It says that invariance has to be argued, not assumed, when the policy experiment is a change of rule. Sargent’s account of the ends of hyperinflations is a dramatic illustration: money demand appeared to “shift” at the reform, because $\pi^e$ jumped.

::: application The Volcker disinflation, again
A backward-looking Phillips curve estimated on 1960s–70s U.S. data, with adaptive $\pi^e$, predicted a very large sacrifice ratio for the disinflation that began in 1979. Inflation fell faster, and the recession, though sharp, was shorter than some of those predictions (Ball 1994). One reading is luck and a negative $v$. Another is the Lucas critique: the rule changed, $\pi^e$ changed by more than $\pi_{t-1}$ would have, and the reduced-form $\beta$ was not invariant. Both readings are live. The episode is why this chapter treats [[#def-lucas]] as a working constraint on the use of AD–AS, not as a footnote.
:::

## Evidence

**Shocks.** Blanchard and Quah (1989, *American Economic Review*) and a large SVAR literature identify demand shocks as the ones that move $Y$ and $P$ in the same direction and die out in $Y$, and supply shocks as the ones that move them in opposite directions. The classification matches [[#def-shocks]]. How much of a particular recession was which is always disputed: 1974–75 was mostly supply; 2008–09 was mostly demand plus a financial shock that also shifted SRAS if $u_n$ rose; 2020 was both, in sequence.

**Rules in practice.** Taylor (1993) showed that U.S. federal funds rate behaviour from 1987 to 1992 was close to $i = 2 + \pi + 0.5(\pi-2)+0.5\hat y$. Inflation-targeting central banks (the Bank of England from 1992, the ECB from 1999, many emerging-market banks in the 2000s) publish a target and a reaction. Whether this delivered the Barro–Gordon committed equilibrium, or merely a better discretionary equilibrium with smaller $k$, is not identified from the fall in $\pi$ alone. What is identified is the fall: advanced-economy inflation averaged about 9 per cent in the 1970s and about 2 per cent in the 2000s (IMF WEO historical series). The IMF’s October 2025 WEO put advanced-economy inflation at 2.6 per cent in 2024, with a projected 2.5 per cent in 2025 — near, not below, most targets, after the 2021–23 spike.

**Lags.** The 2022–23 tightening (Federal Reserve, ECB, Bank of England) was followed by a fall in inflation with a lag of several quarters and, in the United States, without a large rise in $u$ (BLS). That combination is consistent with a well-anchored $\pi^e$ (a New Keynesian reading), with a reversing $v$ shock, or with both. It is not consistent with a 1960s-style stable non-augmented Phillips menu, and it is not a proof that lags have vanished.

## Where this leads

[[macroeconomics/fiscal-policy-and-debt]] treats the government budget constraint that any fiscal shift of AD must eventually obey. [[business-cycles/monetary-policy-rules]] studies Taylor rules, the Taylor principle and inflation targeting in a dynamic model. [[business-cycles/new-keynesian-model]] is AD–AS with microfoundations. Open-economy AD is [[international-finance/mundell-fleming]].

::: history
**1953, Milton Friedman.** “The Effects of a Full-Employment Policy on Economic Stability” (in *Essays in Positive Economics*) argued that long and variable lags can make discretionary stabilisation destabilising. **1976, Robert Lucas.** “Econometric Policy Evaluation: A Critique” (Carnegie–Rochester Conference Series) stated the non-invariance of reduced-form multipliers. **1977, Finn Kydland and Edward Prescott.** “Rules Rather than Discretion: The Inconsistency of Optimal Plans” (*Journal of Political Economy*) derived time inconsistency for policy. **1983, Robert Barro and David Gordon.** “A Positive Theory of Monetary Policy in a Natural Rate Model” applied that logic to inflationary bias. **1993, John Taylor.** “Discretion versus Policy Rules in Practice” proposed the interest-rate rule that now bears his name.
:::

::: summary
- AD is the IS–LM equilibrium locus in $(Y,P)$ space and slopes down. SRAS slopes up; LRAS is vertical at $Y_n$.
- Demand shocks move $Y$ and $P$ in the same direction in the short run; supply shocks move them in opposite directions. In the long run $Y$ returns to $Y_n$ unless $Y_n$ itself has changed.
- Inside and outside lags, and uncertainty about $Y_n$, are the practical case against fine-tuning. Automatic stabilisers skip the inside lag.
- Discretionary optimisation, taking $\pi^e$ as given, produces an inflationary bias. A committed rule can deliver the same $u=u_n$ at a lower $\pi$. The distinction is time consistency, not rigidity.
- The Lucas critique: reduced-form multipliers are not invariant to the policy rule. Treat IS–LM and Phillips-curve multipliers as conditional on a regime.
:::

## Exercises

::: exercise Classifying a shock {level=1}
In the short run, $Y$ falls and $P$ falls. Is this a demand shock or a supply shock, and of which sign?
::: solution
Both $Y$ and $P$ down: a negative demand shock (AD left). A negative supply shock would have $Y$ down and $P$ up.
:::
:::

::: exercise Neutrality in the long run {level=1 check="20"}
$M$ doubles, $Y_n$ is unchanged, and the original $P$ was $10$. What is the long-run $P$ if money is neutral? (Enter $P$.)
::: solution
$P$ doubles to $20$.
:::
:::

::: exercise A liquidity-trap AD {level=1}
If LM is horizontal, does a rise in $M$ shift AD? Does a rise in $G$?
::: solution
No, and yes. Horizontal LM means $Y$ is determined by IS alone, independent of $M/P$, so AD is vertical at that $Y$ and does not move with $M$. A rise in $G$ shifts IS and that vertical AD to the right.
:::
:::

::: exercise Short run and long run {level=2}
A positive demand shock raises $Y$ above $Y_n$ and $P$ above the old $P^e$. Describe the adjustment of $P^e$, SRAS, $Y$ and $P$ under adaptive expectations. What is unchanged in the long run besides $Y_n$?
::: solution
$P^e$ rises toward the new $P$, SRAS shifts up, $Y$ falls toward $Y_n$, and $P$ rises further. In the long run $Y=Y_n$ and $u=u_n$ in either case. If the shock was monetary, $P$ scales with $M$, real balances return to their original level, $r$ returns to the loanable-funds rate, and the composition of $Y$ is unchanged. If the shock was fiscal ($G$), $r$ is permanently higher and $I$ is crowded out, as in the classical model of [[macroeconomics/national-income]]: $Y$ is back, but its composition is not.
:::
:::

::: exercise Inflationary bias {level=2}
In the Barro–Gordon parable, the loss is $\tfrac12\pi^2+\tfrac12\lambda(y-k)^2$ with $y=\alpha(\pi-\pi^e)$ and $y_n=0$. Under discretion and rational expectations, show that $\pi=\lambda\alpha k$ and $y=0$. Compare the loss with commitment to $\pi=0$.
::: solution
The FOC in $\pi$, taking $\pi^e$ as given, is $\pi+\lambda(y-k)\alpha=0$. Rational expectations give $y=0$, so $\pi=\lambda\alpha k$. Loss $=\tfrac12(\lambda\alpha k)^2+\tfrac12\lambda k^2$. Under commitment, $\pi=0$, $\pi^e=0$, $y=0$, loss $=\tfrac12\lambda k^2$, which is smaller by $\tfrac12(\lambda\alpha k)^2$. The extra term is the inflationary bias, squared.
:::
:::

::: exercise Lags {level=2}
A shock lowers $Y$ below $Y_n$ for two quarters and then vanishes on its own. The inside lag of a discretionary fiscal package is two quarters and the outside lag is two quarters. Does the package stabilise $Y$ or not, in this parable? What would an automatic stabiliser have done?
::: solution
The package is decided as the shock ends and hits as the economy is already back at $Y_n$ (or expanding). It is then itself a demand shock, destablising in this timing. An automatic stabiliser would have moved with $Y$ in the two shock quarters and unwound when $Y$ recovered — the attraction of the inside-lag argument. If the shock had lasted eight quarters, the same discretionary package could have been stabilising. Friedman’s claim is about *variable* lags, not about a lag that is always too long.
:::
:::

::: exercise The Lucas critique, in a consumption function {level=3}
Suppose $C=0.5 Y$ has been estimated in a sample where $Y$ fluctuations were mostly permanent (so the PIH MPC is about $0.5$ at the observed horizon — a parable). A new fiscal rule produces only transitory $Y$ fluctuations. What happens to the estimated MPC if the PIH is true? What happens to a multiplier computed from the old $0.5$?
::: hint
Transitory income has a small PIH MPC.
:::
::: solution
The PIH MPC out of transitory income is small (near $r/(1+r)$ in the infinite-horizon case). The estimated $C=\hat c Y$ will now deliver a small $\hat c$. A multiplier $1/(1-\hat c)$ computed from the old $0.5$ is too large for the new rule. That is the Lucas critique applied to [[macroeconomics/is-lm#def-mult]]. The structural object is the Euler equation, not $\hat c$.
:::
:::

::: exercise A supply shock and the policy mix {level=3}
A transitory oil shock shifts SRAS up. A policymaker who cares equally about $Y-Y_n$ and $\pi$ can shift AD. Describe the trade-off. Why does a demand-shock recession not present the same trade-off?
::: hint
Offsetting the $Y$ fall with AD requires a further rise in $P$; offsetting the $P$ rise with AD requires a further fall in $Y$.
:::
::: solution
To keep $Y$ at $Y_n$, AD must shift right, which raises $P$ (and $\pi$) further. To keep $P$ at the old level, AD must shift left, which lowers $Y$ further. The policymaker must split the shock between a $Y$ gap and extra inflation; the AD–AS diagram does not pick the split. A negative *demand* shock lowers $Y$ and $P$ together, so a rightward AD shift can restore both. That is why “lean against demand shocks, accommodate less (or not at all) on supply shocks” is the standard prescription in this framework — a positive description of inflation-targeting practice, not a ranking of 1974 or 2022 decisions.
:::
:::
