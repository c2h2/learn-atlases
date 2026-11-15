In 1993 John B. Taylor proposed a simple description of Federal Reserve behaviour over 1987–92: set the federal funds rate equal to inflation plus $0.5$ times the inflation gap plus $0.5$ times the output gap plus a $2$ percent real-rate intercept. The rule fitted those six years uncomfortably well, and it contained a property that the three-equation model of [[business-cycles/new-keynesian-model]] needs for a unique bounded equilibrium: the nominal rate responds *more than one-for-one* to inflation. That **Taylor principle**, inflation targeting as a framework, and the older problem of time-inconsistent discretion are the subject of this chapter.

The chapter is positive first and normative second. A rule is a description of an instrument as a function of observables. Whether a central bank *should* follow Taylor's coefficients, or any other coefficients, depends on a loss function, on the slope $\kappa$ of the New Keynesian Phillips curve, and on how much $r_t^n$ and $\tilde y_t$ are observed. Those are trade-offs, not slogans. Nothing here is advice to a household, a firm or a trader.

Notation stays that of the three-equation model: $\pi_t$ inflation, $\tilde y_t$ the output gap, $i_t$ the policy rate, $\phi_\pi$ and $\phi_y$ the reaction coefficients. The inflation target is $\pi^*$. The discount factor $\beta$ is the household's; it is not a Taylor coefficient.

## The Taylor rule

::: definition Taylor rule {#def-taylor}
Taylor's 1993 **rule** (annualised, in percent) is

$$
i_t = \pi_t + 0.5\,\tilde y_t + 0.5\,(\pi_t-\pi^*) + r^*,
$$ {#eq-taylor93}

with $\pi^*=2$ and $r^*=2$ in his illustration. Equivalently,

$$
i_t = r^* + \pi^* + \phi_\pi (\pi_t-\pi^*) + \phi_y \tilde y_t,
\qquad \phi_\pi=1.5,\ \phi_y=0.5.
$$ {#eq-taylor-phi}

A **Taylor-type rule** keeps the same arguments and allows other $(\phi_\pi,\phi_y)$, a lag of $i_t$ (interest-rate smoothing), and forecasts of $\pi$ in place of $\pi_t$.
:::

The $2$ percent intercepts were a description of 1987–92, not a law. The natural real rate $r^*$ has been estimated lower in the 2010s in several large economies (Holston, Laubach and Williams, *Journal of International Economics* 2017; New York Fed HLW series). The $2$ percent inflation target has been the Federal Reserve's explicit longer-run goal since January 2012, the ECB's (originally "below but close to $2$ percent", then a symmetric $2$ percent in 2021), the Bank of England's since 2003 (previously $2.5$ percent on RPIX), and the Reserve Bank of New Zealand's midpoint has varied with the Policy Targets Agreement. Using $2$ in a textbook example is a convention.

::: example Taylor's arithmetic {#ex-taylor}
With $r^*=2$, $\pi^*=2$, $\phi_\pi=1.5$, $\phi_y=0.5$, compute $i$ when $(\pi,\tilde y)=(3,1)$ and when $(\pi,\tilde y)=(4,2)$. All numbers are annual percent.
::: solution
$i=2+2+1.5(\pi-2)+0.5\tilde y = 4 + 1.5(\pi-2)+0.5\tilde y$. At $(3,1)$: $i=4+1.5+0.5=6$. At $(4,2)$: $i=4+3+1=8$. The original form [[#eq-taylor93]] gives the same: $i=3+0.5\times 1+0.5\times(3-2)+2=6$, and $i=4+0.5\times 2+0.5\times(4-2)+2=8$. One extra point of inflation raises $i$ by $1.5$ points; one extra point of gap raises it by $0.5$.
:::
:::

Clarida, Galí and Gertler (*Quarterly Journal of Economics*, 2000) estimated a forward-looking Taylor-type rule for the United States and found $\phi_\pi<1$ in 1960–79 and $\phi_\pi>1$ after 1979. They read the Volcker–Greenspan coefficients as the restoration of the Taylor principle. Subsequent work (Orphanides, *American Economic Review* 2001) showed that *real-time* forecasts of $\pi$ and $\tilde y$ produce a less dramatic split: part of the 1970s is a measurement problem, not only a coefficient problem. Both readings can be true: coefficients and information sets both changed.

::: widget plot
f: 2+1.5*x; 2+p*x + 0.5*g
sliders: p=1.5:0.5:2.5; g=0:-4:4
x: -2, 8
y: 0, 16
labels: \text{Fisher } i=r^*+\pi; \text{Taylor rule}
caption: Horizontal axis is inflation $\pi$ (percent), vertical axis is the policy rate $i$. The Fisher line $i=r^*+\pi$ with $r^*=2$ is the real-rate-neutral locus. Taylor's rule is steeper than that line when $\phi_\pi>1$. Raise $p=\phi_\pi$ and watch the rule steepen; move $g=\tilde y$ to shift it. Below the Fisher line the *ex post* real rate is below $r^*$ (if $\pi^e=\pi$).
:::

## The Taylor principle

::: definition Taylor principle {#def-principle}
The **Taylor principle** is the requirement that the long-run response of the nominal policy rate to a permanent rise in inflation be greater than one, so that the real rate rises with inflation. In the three-equation model with a contemporaneous rule $i_t=\phi_\pi\pi_t+\phi_y\tilde y_t$ and $\beta$ close to one, a sufficient condition is $\phi_\pi + \frac{1-\beta}{\kappa}\phi_y > 1$. With $\phi_y=0$ this is simply $\phi_\pi>1$.
:::

::: proposition Determinacy under the Taylor principle {#prop-determ}
In the three-equation NK model of [[business-cycles/new-keynesian-model#def-three]] with $u_t=r_t^n=0$ and the rule $i_t=\phi_\pi\pi_t+\phi_y\tilde y_t$, there is a unique bounded rational-expectations solution (namely $\tilde y_t=\pi_t=0$) if and only if the Taylor principle holds. If $\phi_\pi$ is too small, the system is **indeterminate**: a continuum of bounded sunspot paths exists.
:::
::: proof
(Sketch.) The IS and NKPC, with $i_t$ substituted, form a two-dimensional expectational system in $(\tilde y_t,\pi_t)$. Uniqueness of a bounded solution in such a system requires that the number of eigenvalues outside the unit circle equal the number of jump variables (Blanchard and Kahn, *Econometrica* 1980). Both $\tilde y$ and $\pi$ are jumps. The characteristic polynomial's constant term involves $1-\phi_\pi$ with a sign; $\phi_\pi>1$ (adjusted for $\phi_y$ as in [[#def-principle]]) places both roots outside the unit circle. If $\phi_\pi<1$ and $\phi_y=0$, at least one root is inside and a sunspot $\xi_t$ with $\E_t\xi_{t+1}=0$ can enter $\pi_t$ without violating boundedness.
:::

Indeterminacy is not an academic curiosity. If the public does not have a unique inflation to expect, any shock to inflation expectations can be self-fulfilling through the NKPC. Clarida–Galí–Gertler's pre-1979 estimates, taken at face value, say that the United States may have lived in that region. A peg, $\phi_\pi=\phi_y=0$, is the extreme case: Sargent and Wallace (1975) already showed that an interest-rate peg does not pin down the price level in an expectational IS–LM.

The principle is about the *real* rate. If expected inflation rises and $i$ rises one-for-one, the real rate is unchanged, IS does not pull $\tilde y$ down, and the NKPC does not pull $\pi$ back. Raising $i$ *more* than one-for-one makes the real rate a stabiliser. Raising it less than one-for-one makes the real rate an amplifier.

::: example A peg versus the principle {#ex-peg}
Suppose $\kappa=0.2$, $\phi_y=0$, and a sunspot raises $\E_t\pi_{t+1}$ by $1$ percentage point. Under a peg $i_t=0$ (and $r^n=0$, $\sigma=1$, $\E\tilde y_{t+1}=0$), what happens to $\tilde y_t$ from the IS curve? Under $\phi_\pi=1.5$, if $\pi_t$ rose by the same $1$ point, what would the real-rate gap $i_t-\E_t\pi_{t+1}$ be?
::: solution
IS: $\tilde y_t = -\bigl(i_t-\E_t\pi_{t+1}\bigr)$. Under a peg, $i_t=0$, so $\tilde y_t = +0.01$: *higher* expected inflation *raises* the gap, which from the NKPC raises $\pi_t$ further — the sunspot is reinforced. Under $\phi_\pi=1.5$, $i_t=1.5\times 0.01=0.015$, so $i_t-\E_t\pi_{t+1}=0.005>0$: the real rate rises, the gap falls, and the NKPC pulls inflation back. That is the principle in one period of arithmetic.
:::
:::

::: example Smoothing {#ex-smooth}
A partial-adjustment rule is $i_t = 0.8\, i_{t-1} + 0.2\bigl(r^*+\pi^*+1.5(\pi_t-\pi^*)+0.5\tilde y_t\bigr)$ with $r^*=\pi^*=2$. If last quarter's $i$ was $1$ percent and current $(\pi,\tilde y)=(4,0)$, what is $i_t$? Compare with the unsmoothed Taylor rate from [[#ex-taylor]]'s formula.
::: solution
The unsmoothed Taylor rate is $2+2+1.5(4-2)+0=7$, as in the exercises. The smoothed rate is $0.8\times 1 + 0.2\times 7 = 0.8+1.4=2.2$. Smoothing leaves the funds rate $4.8$ points below the Taylor prescription after a sudden inflation jump — useful for not rattling markets, costly if the jump is persistent. At the ZLB, the same $0.8$ delays lift-off.
:::
:::

::: quiz
The Taylor principle fails when
- [ ] $\phi_y$ is positive
- [x] a permanent rise in inflation lowers the real policy rate
- [ ] $\phi_\pi=1.5$ and $\phi_y=0.5$, Taylor's original coefficients
- [ ] the inflation target is $2$ percent rather than $0$
::: solution
The principle is about the real-rate response to inflation, not about $\phi_y$ or the target. Taylor's original coefficients satisfy it. A positive $\phi_y$ *helps* determinacy. The target $\pi^*$ shifts the intercept, not the slope.
:::
:::

## Inflation targeting

New Zealand's Reserve Bank Act 1989 made price stability the primary statutory objective and required a Policy Targets Agreement between the Minister of Finance and the Governor. The first PTA, signed in March 1990, set a $0$–$2$ percent inflation band. Canada (1991), the United Kingdom (1992, after sterling left the ERM), Sweden (1993) and a long list of emerging-market central banks followed. The ECB (1998/99) and the Federal Reserve (explicit $2$ percent in 2012) are inflation-targeting cousins with different legal forms. As of the mid-2020s, some $40$–$50$ countries use a form of inflation targeting (IMF *Annual Report on Exchange Arrangements*; Hammond, Bank of England handbook, various editions).

::: definition Inflation targeting {#def-it}
**Inflation targeting** is a monetary-policy framework in which (i) a numerical target (a point or a band) for a stated price index is the primary announced objective, (ii) the instrument is typically a short-term interest rate, (iii) the forecast of inflation at a policy horizon of about $1$–$2$ years is an intermediate target, and (iv) the bank publishes a regular *Inflation Report* (or equivalent) and is accountable for misses. **Flexible** inflation targeting, Svensson's term (*Journal of Monetary Economics*, 1997; *International Journal of Central Banking* 2010), allows the horizon and the path of $\tilde y$ to trade off against a fast return of $\pi$ to $\pi^*$.
:::

Inflation targeting is not a Taylor rule. A Taylor rule is a formula for $i_t$. Targeting is a loss function plus an information set plus a communication device. In the three-equation model, *strict* inflation targeting is the limit $\phi_\pi\to\infty$ (or a loss that puts no weight on $\tilde y$); *flexible* targeting is a finite $\phi_\pi$ and a positive weight on $\tilde y$ in the loss. Forecast targeting (Svensson) sets $i_t$ so that the projected paths of $\pi$ and $\tilde y$ look best, which in a linear-quadratic model is equivalent to a rule in those projections.

The 1990s and 2000s were kind to the framework: inflation in targeting countries fell and stayed low, and output volatility fell too (the Great Moderation; Stock and Watson 2002). How much of that was targeting, how much Volcker–disinflation credibility, how much China and cheap goods, and how much luck with shocks is not identified. Ball and Sheridan (in Bernanke and Woodford, eds., *The Inflation-Targeting Debate*, 2005) found little extra disinflation in targeting countries once mean reversion is allowed; subsequent work with later samples is more favourable but not decisive. After 2021, many targeting central banks overshot, some by several percentage points (OECD and national CPI, 2022–23). The framework did not make overshooting impossible; it made the miss visible and, in several cases, the subsequent tightening explicit.

::: warning A target is not a rule, and a rule is not a target
Writing $\pi^*=2$ in a Taylor rule does not make a central bank an inflation targeter: the Fed in Taylor's 1987–92 sample had no announced number. Conversely, an inflation targeter need not obey [[#eq-taylor93]] quarter by quarter; it may smooth $i_t$, react to the exchange rate, or look through a one-off VAT change. Evaluating "did inflation targeting work?" by running [[#eq-taylor93]] on the data answers a different question from evaluating the legal framework.
:::

## Time inconsistency and credibility

Kydland and Prescott (*Journal of Political Economy*, 1977) and Barro and Gordon (*Journal of Monetary Economics*, 1983) posed the problem that inflation targeting was later designed to solve. A central bank that maximises a social loss in $\pi$ and $\tilde y$ *every period*, taking expectations as given, will choose a positive inflation rate even if $\pi^*=0$ is the first-best, because at given $\pi^e$ a surprise inflation can raise $\tilde y$ through the Phillips curve. The public, knowing this, sets $\pi^e$ equal to that discretionary inflation, the surprise disappears, and the economy inherits extra $\pi$ with no extra $\tilde y$. **Discretion is then dominated by a rule** that pins $\pi=\pi^*$.

::: definition Discretion versus commitment {#def-discretion}
Under **discretion** the bank re-optimises each period, taking $\E_t\pi_{t+1}$ (and $\pi^e$ in a static Phillips curve) as given. Under **commitment** it chooses a state-contingent path $\{\,i_t\,\}$ at the beginning of time and does not re-optimise. In the NK model, the timeless-perspective commitment of Woodford (2003) is a history-dependent rule that makes $\pi_t$ depend on past gaps, not only on current shocks.
:::

::: proposition Inflation bias under discretion {#prop-bias}
In the static Barro–Gordon setup the Phillips curve is $\tilde y_t = \alpha(\pi_t-\pi^e_t)$, $\alpha>0$, and the period loss is $\frac12\bigl[\pi_t^2 + \lambda(\tilde y_t-k)^2\bigr]$ with temptation $k>0$ (bliss output above the natural rate, for example because of monopolistic competition). Under discretion the unique rational-expectations equilibrium has $\tilde y=0$ and

$$
\pi = \lambda\alpha k.
$$ {#eq-bias}

Commitment to $\pi=0$ delivers the same mean $\tilde y=0$ with no inflation. The gap $\lambda\alpha k$ is the **inflation bias**.
:::
::: proof
The bank takes $\pi^e$ as given and substitutes $\tilde y=\alpha(\pi-\pi^e)$ into the loss. The first-order condition is

$$
\pi + \lambda\bigl(\alpha(\pi-\pi^e)-k\bigr)\alpha = 0 \implies \pi + \lambda\alpha^2(\pi-\pi^e) = \lambda\alpha k.
$$

Rational expectations impose $\pi=\pi^e$, so $\pi=\lambda\alpha k$. Mean output is at the natural rate because the surprise $\pi-\pi^e$ is zero in equilibrium: the extra inflation buys nothing real, on average. A committed rule $\pi=0$ is credible, so $\pi^e=0$ and $\tilde y=0$ with a strictly smaller loss.
:::

Two comments keep the result in its place. First, $k>0$ is doing the work. If the bliss point is the natural rate ($k=0$), the inflation bias is zero; that is why a Rogoff (*Quarterly Journal of Economics*, 1985) conservative central banker — a banker with a smaller $\lambda$ than society's — reduces the bias, and why an inflation target that makes $k$ politically expensive can substitute for a conservative. Second, the New Keynesian model with $k=0$ still has a **stabilisation bias**: discretion does not make $\pi_t$ depend on past gaps, so it does not inherit the history dependence that commitment uses to smooth a cost-push shock (Clarida, Galí and Gertler 1999; Woodford 2003). Even a bank that does not want $\tilde y>0$ on average will inflate too much, or disinflate too violently, in response to $u_t$ if it re-optimises.

::: example A numerical bias {#ex-bias}
Take $\alpha=1$, $\lambda=0.25$ and $k=2$ (a two-percent temptation, in the same units as $\tilde y$). Compute the discretionary inflation. What $\lambda$ would a Rogoff conservative need to cut that bias in half?
::: solution
$\pi=\lambda\alpha k=0.25\times 1\times 2=0.5$, half a percentage point. Halving the bias at given $\alpha$ and $k$ requires halving $\lambda$ to $0.125$. Conservatism is a smaller weight on the output gap in the bank's loss, not a different Phillips curve.
:::
:::

Independent central banks, announced targets, and published inflation reports are institutional attempts to move from [[#eq-bias]] toward commitment. They work only if the public believes that re-optimisation is costly. The 1970s in the United States, the United Kingdom and several Latin American countries are the usual illustration of the discretionary equilibrium; the 1990s disinflations under targeting are the usual illustration of a shift toward rules. Neither illustration is a controlled experiment. Fiscal dominance — a Treasury that requires seigniorage or a low real rate on public debt — can undo the shift, a theme of [[macroeconomics/fiscal-policy-and-debt]] and of the ZLB chapter's discussion of coordination.

::: application Optimal simple rules
Woodford's quadratic approximation to household welfare, in the textbook NK model, is a loss $\sum\beta^t(\pi_t^2 + \lambda\tilde y_t^2)$ with $\lambda=\kappa/\varepsilon$, $\varepsilon$ the elasticity of demand. Minimising that loss under commitment produces a rule that is not [[#eq-taylor93]]: it is history-dependent. A **simple rule** (Taylor 1999; Schmitt-Grohé and Uribe, *Journal of Monetary Economics* 2007) restricts the instrument to a few observables and optimises $(\phi_\pi,\phi_y)$ inside that class. Typical findings: $\phi_\pi$ well above $1$, a modest $\phi_y$, and a smoothing coefficient on lagged $i_t$ around $0.7$–$0.9$ if smoothing is allowed. Those numbers are properties of a model and a loss, not of the 1987–92 funds rate. They also assume the ZLB does not bind; [[business-cycles/zero-lower-bound]] changes the ranking.
:::

## Evidence and limits

Estimated Taylor-type rules fit some samples and fail others. After 2008 the U.S. funds rate sat at the ZLB while a 1993 Taylor rule with a $2$ percent $r^*$ and a CBO gap often prescribed a *negative* rate (Taylor's own later commentary; the New York Fed's Taylor-rule primer). That is not a rejection of the principle $\phi_\pi>1$; it is a rejection of an unconstrained linear rule. Interest-rate smoothing, which helps match the serial correlation of $i_t$, makes the bank slower to return from the ZLB and slower to tighten (Rudebusch, *Journal of Monetary Economics* 2006, on whether smoothing is optimal or just serially correlated shocks).

Cross-country evidence on targeting, as noted, is mixed. Emerging-market targeters (Chile, Brazil, South Africa, India from 2016, Indonesia) have typically seen inflation fall relative to their own 1980s–90s, but so have some non-targeters, and several targeters have used exchange-rate intervention alongside the interest rate (IMF AREAER). The Taylor principle in an open economy involves the exchange-rate channel; that belongs to open-economy IS and UIP, not a reason to drop $\phi_\pi>1$ at home.

A live dispute is the weight on $\tilde y$. The original $\phi_y=0.5$ is a description. Optimal simple rules sometimes want a smaller weight if $\tilde y$ is mismeasured, and a larger one if wages are sticky (Erceg–Henderson–Levin). The Fed's 2020 framework put more weight on shortfalls of employment; the 2021–23 inflation was then a test of that shift, not a theorem about it. This course reports the trade-off: more $\phi_y$ damps demand shocks and, if the gap is the right gap, helps with sticky wages; more $\phi_y$ also risks reacting to $y^n$ movements that are not $\tilde y$ ([[business-cycles/new-keynesian-model#def-three]]).

## Where this leads

If the rule wants $i_t<0$, the linear Taylor rule is not feasible. That is [[business-cycles/zero-lower-bound]]: forward guidance, quantitative easing and negative rates are attempts to keep the *real* rate on the right side of $r_t^n$ when the *nominal* rate cannot fall. Financial frictions add a spread between $i_t$ and the rate in the IS curve, so the same $\phi_\pi$ delivers less stabilisation. Fiscal policy can substitute for a missing interest-rate cut, with a multiplier that depends on whether the rule is active.

::: history
**1977, Finn E. Kydland and Edward C. Prescott.** "Rules Rather than Discretion" (*Journal of Political Economy*) showed that a benevolent, re-optimising policymaker inflates too much. **1983, Robert J. Barro and David B. Gordon.** Their monetary application produced the inflation-bias formula. **1993, John B. Taylor.** "Discretion versus Policy Rules in Practice" (*Carnegie-Rochester Conference Series*) fitted [[#eq-taylor93]] to the funds rate and stated the principle $\phi_\pi>1$. **1990, Reserve Bank of New Zealand.** The first Policy Targets Agreement made a numerical inflation band the operational target of an independent central bank.
:::

::: summary
- Taylor's 1993 rule is $i=r^*+\pi^*+1.5(\pi-\pi^*)+0.5\tilde y$. The slope $\phi_\pi=1.5$ satisfies the Taylor principle: the real rate rises with inflation.
- The Taylor principle is a determinacy condition in the three-equation NK model. A peg, or $\phi_\pi<1$, leaves room for sunspot inflation.
- Inflation targeting is a framework (a number, a forecast, a report), not a formula for $i_t$. Flexible targeting trades $\pi$ against $\tilde y$ at a finite horizon.
- Discretion with a bliss point above natural output produces an inflation bias $\pi=\lambda\alpha k$. Commitment, conservatism and an announced target are alternative institutional replies. NK models add a stabilisation bias even when $k=0$.
- Estimated rules and targeting outcomes are sample-dependent. Real-time gaps, the ZLB and open-economy channels all change the coefficients one would want.
:::

## Exercises

::: exercise Taylor arithmetic {level=1 check="7"}
Using [[#eq-taylor-phi]] with $r^*=2$, $\pi^*=2$, $\phi_\pi=1.5$, $\phi_y=0.5$, compute $i$ when $\pi=4$ and $\tilde y=0$. (Enter the policy rate.)
::: solution
$i=2+2+1.5(4-2)+0.5\times 0=4+3=7$.
:::
:::

::: exercise One-for-one {level=1}
If $\phi_\pi=1$ and $\phi_y=0$, what happens to the real rate $i-\pi$ when inflation rises by $1$ point and expected inflation equals actual inflation? Does this satisfy [[#def-principle]]?
::: solution
$i$ rises by $1$ point, so $i-\pi$ is unchanged. The real rate does not rise with inflation, so the Taylor principle fails.
:::
:::

::: exercise Target versus intercept {level=1}
Show that raising $\pi^*$ by $1$ point in [[#eq-taylor-phi]], holding $\phi_\pi=1.5$ and the current $\pi$ fixed, *lowers* $i$ by $0.5$ points. Interpret.
::: solution
$i=r^*+\pi^*+1.5(\pi-\pi^*)+\phi_y\tilde y = r^*+\pi^*+1.5\pi-1.5\pi^*+\cdots = r^*+1.5\pi-0.5\pi^*+\cdots$. The coefficient on $\pi^*$ is $-0.5$. A higher target, at given current inflation, is a looser rule: the inflation *gap* $\pi-\pi^*$ has shrunk. That is how a central bank that raises its target eases, even before inflation moves.
:::
:::

::: exercise Inflation bias {level=2 check="1"}
In [[#eq-bias]] take $\alpha=0.5$, $\lambda=1$, $k=2$. What is discretionary inflation? (Enter the number.)
::: solution
$\pi=\lambda\alpha k=1\times 0.5\times 2=1$.
:::
:::

::: exercise Rogoff conservative {level=2}
Using the same $(\alpha,k)$ as the previous exercise, what $\lambda$ produces $\pi=0.4$? Why might society still not want $\lambda=0$?
::: solution
$0.4=\lambda\times 0.5\times 2= \lambda$, so $\lambda=0.4$. Society's loss still contains the output gap. A banker with $\lambda=0$ (pure inflation targeting, no weight on $\tilde y$) drives the bias to zero but stabilises cost-push shocks entirely on $\tilde y$, which is not optimal if $\kappa$ is finite and $u_t$ is real. Rogoff conservatism is a compromise, not a corner.
:::
:::

::: exercise Determinacy intuition {level=2}
Explain, without eigenvalues, why $\phi_\pi>1$ shuts down a sunspot rise in expected inflation in the three-equation model.
::: solution
A sunspot that raises $\E\pi$ lowers the real rate if $i$ does not rise one-for-one, which *raises* $\tilde y$ through IS, which *raises* $\pi$ through the NKPC, validating the sunspot. If $i$ rises more than one-for-one, the real rate rises, $\tilde y$ falls, and the NKPC pulls $\pi$ down, so the sunspot is not an equilibrium. That is [[#prop-determ]] in words.
:::
:::

::: exercise Real-time gaps {level=3}
Orphanides (2001) found that Taylor-type rules estimated on real-time forecasts look less like a 1970s failure of $\phi_\pi>1$ than rules estimated on revised data. Why would data revisions, especially of $\tilde y$, bias an *ex post* estimate of $\phi_\pi$ downward in a high-inflation decade?
::: hint
If the gap was thought to be negative (slack) while inflation was high, a bank that *was* obeying the principle would have been pulling $i$ in two directions.
:::
::: solution
In the 1970s, real-time estimates of potential output were high relative to later vintages: the productivity slowdown was not yet in the trend, so $\tilde y$ looked more negative than it does in revised data (Orphanides and van Norden 2002). A bank that raised $i$ with inflation but cut $i$ with a (mismeasured) negative gap would, *ex post*, look as if it had a small $\phi_\pi$: the missing tightness is attributed to a weak inflation response rather than to a gap that was not really there. Estimating on revised gaps therefore understates the real-time $\phi_\pi$. The lesson is not that the 1970s were optimal; it is that a coefficient on a mismeasured gap is not a preference parameter.
:::
:::

::: exercise Commitment and cost-push {level=3}
In the NK model with $k=0$ and an iid cost-push $u_t$, discretion gives $\pi_t = \frac{\lambda}{\lambda+\kappa^2}u_t$ and $\tilde y_t = -\frac{\kappa}{\lambda+\kappa^2}u_t$ (Clarida–Galí–Gertler). Commitment makes $\pi_t$ depend on past $u$ as well. Explain why history dependence can deliver a better loss, and why it is not time-consistent.
::: hint
A promise to keep $\tilde y$ low *after* $u$ has died raises the cost of raising prices today, which dampens $\pi_t$ on impact.
:::
::: solution
Under commitment the bank promises that a positive $u_t$ will be followed by a period of $\tilde y<0$ even after $u$ is gone. Forward-looking firms, seeing that future, raise $p_t^*$ less today, so $\pi_t$ on impact is smaller than under discretion. The *ex post* incentive, once $u_t$ has died, is to renege and close the gap (the FOC of discretion at $u=0$ wants $\tilde y=\pi=0$). History dependence is therefore useful and not time-consistent. Inflation targeting with a loss in the *forecast* of $\pi$, or a rule that responds to the price *level* rather than to inflation, are operational attempts to build that history in.
:::
:::
