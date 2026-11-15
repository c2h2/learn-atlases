Three linear equations, three variables — the output gap $\tilde y_t$, inflation $\pi_t$, and the nominal interest rate $i_t$ — are the workhorse of applied monetary economics. They are not a small IS–LM. The **dynamic IS curve** is the household Euler equation of [[business-cycles/real-business-cycles]], rewritten in gaps. The **New Keynesian Phillips curve** is the Calvo aggregation of [[business-cycles/nominal-rigidities]]. The third equation is an **interest-rate rule**, standing in for a central bank that sets $i_t$ rather than a money stock. Together they are the **New Keynesian (NK) model**, in the three-equation form popularised by Clarida, Galí and Gertler (*Journal of Economic Literature*, 1999) and taught in Galí's *Monetary Policy, Inflation, and the Business Cycle* (2nd ed., 2015) and Woodford's *Interest and Prices* (2003).

This chapter derives the three equations, solves the special case of iid shocks, and reads the impulse responses. It presents the model on its own terms: a well-defined dynamic general equilibrium with monopolistic competition and sticky prices, not a revival of 1960s hydraulics. It also reports where the evidence bites — the slope of the Phillips curve, the role of cost-push shocks, estimated DSGE systems such as Smets and Wouters (*American Economic Review*, 2007) — and where RBC and NK readings of the same facts still compete.

Notation, used from here to the end of the course. Lower-case letters are logs. $\tilde y_t = y_t - y_t^n$ is the gap between actual output and the **natural** (flexible-price) level. $\pi_t = p_t - p_{t-1}$ is inflation. $i_t$ is the one-period nominal interest rate. $r_t^n$ is the **natural real rate**, the real rate that would clear the goods market at $y_t^n$. $\beta$ is the discount factor; $\sigma>0$ is the coefficient of relative risk aversion, so $1/\sigma$ is the intertemporal elasticity of substitution (Galí's convention). $\kappa$ is the Phillips slope in gap form. Hats on other variables remain log deviations from a deterministic steady state.

## The dynamic IS curve

A representative household with period utility $(C_t^{1-\sigma}-1)/(1-\sigma) - \chi N_t^{1+\varphi}/(1+\varphi)$ and access to a one-period nominal bond obeys the Euler equation

$$
C_t^{-\sigma} = \beta\,\E_t\Bigl[ C_{t+1}^{-\sigma} (1+i_t)\frac{P_t}{P_{t+1}}\Bigr].
$$ {#eq-euler}

Log-linearising around a zero-inflation steady state with $1+i=1/\beta$ gives

$$
\hat c_t = \E_t\hat c_{t+1} - \frac{1}{\sigma}\bigl(i_t - \E_t\pi_{t+1} - \rho\bigr),
$$

where $\rho=-\ln\beta$ is the discount rate, equal to the steady-state real rate. In the textbook closed economy without capital, goods-market clearing is $c_t=y_t$ in logs (up to a government-spending term). Subtracting the same Euler equation written at the flexible-price allocation defines the gap.

::: definition Dynamic IS curve {#def-dis}
The **dynamic IS curve** is

$$
\tilde y_t = \E_t\tilde y_{t+1} - \frac{1}{\sigma}\bigl(i_t - \E_t\pi_{t+1} - r_t^n\bigr).
$$ {#eq-dis}

A real rate above the natural rate, $i_t-\E_t\pi_{t+1}>r_t^n$, makes the gap fall relative to its expected future value: households want a rising consumption path, and with $\tilde y_{t+1}$ expected to return toward zero that means a low $\tilde y_t$ today. The natural rate $r_t^n$ absorbs technology, government spending and preference shocks — anything that would move the real rate in the flexible-price economy.
:::

Equation [[#eq-dis]] is an *expectational* IS, not a static $Y=C(Y)+I(i)+G$. There is no LM curve: the central bank sets $i_t$, and any money-demand equation then pins the money stock residually (the cashless limit of Woodford 2003). Government spending enters as a shifter of $r_t^n$ and of the relation between $\tilde y$ and $\hat c$; it does not add a Keynesian multiplier by itself. Multipliers belong to [[business-cycles/fiscal-stabilisation]].

::: example A one-period real-rate gap {#ex-dis}
Suppose $\sigma=1$, $\E_t\tilde y_{t+1}=0$, $\E_t\pi_{t+1}=0$ and $r_t^n=0$. If the central bank sets $i_t=0.01$ (one percentage point above the natural rate, for one period), what is $\tilde y_t$?
::: solution
[[#eq-dis]] collapses to $\tilde y_t=-(1/\sigma)i_t=-0.01$. A one-point real-rate gap for one quarter, fully expected to vanish tomorrow, produces a $1$ percent negative output gap when $\sigma=1$. If $\sigma=2$ (less willing substitution), the same rate gap produces only a $0.5$ percent output gap. The IS curve is steeper in $(\tilde y,r)$ space when $1/\sigma$ is small.
:::
:::

## The New Keynesian Phillips curve

Chapter [[business-cycles/nominal-rigidities]] derived inflation as a present value of real marginal cost under Calvo pricing,

$$
\pi_t = \beta\E_t\pi_{t+1} + \lambda\,\widehat{\mathrm{mc}}_t,
\qquad \lambda=\frac{(1-\theta)(1-\beta\theta)}{\theta}.
$$

With the labour-market structure of the RBC chapter — production $Y=N$ in the textbook special case without capital — real marginal cost tracks the gap between the marginal rate of substitution and the marginal product of labour. Log-linearising,

$$
\widehat{\mathrm{mc}}_t = (\sigma+\varphi)\tilde y_t
$$

in the no-capital, constant-desired-mark-up case (Galí 2015, ch. 3). Diminishing returns change the coefficient but not the sign.

::: definition New Keynesian Phillips curve {#def-nkpc}
The **New Keynesian Phillips curve (NKPC)** in gap form is

$$
\pi_t = \beta\E_t\pi_{t+1} + \kappa\,\tilde y_t + u_t,
\qquad \kappa = \lambda(\sigma+\varphi),
$$ {#eq-nkpc}

where $u_t$ is a **cost-push** (or mark-up) shock — a disturbance to the desired mark-up, to wage-setting, or to anything that moves inflation given the gap. When $u_t\equiv 0$, inflation is a present value of current and future gaps:

$$
\pi_t = \kappa\sum_{k=0}^{\infty}\beta^k \E_t\tilde y_{t+k}.
$$ {#eq-nkpc-pv}
:::

The discounting at $\beta$ is inherited from the firm's present-value problem: tomorrow's reset, if it happens, takes care of tomorrow's cost, so today's inflation cares about tomorrow's inflation only to the extent that today's price may still be in force. There is no lagged $\pi_{t-1}$ in the pure NKPC. Inflation persistence is the persistence of $\tilde y$ and of $u$.

::: proposition Divine coincidence {#prop-divine}
If $u_t\equiv 0$ for all $t$ and the central bank can set $\tilde y_t=0$ in every period, then $\pi_t=0$ is consistent with [[#eq-nkpc]] and with the IS curve at $i_t=r_t^n$. Stabilising the output gap and stabilising inflation are the same problem. Blanchard and Galí (*Journal of the European Economic Association*, 2007) called this the **divine coincidence**.
:::
::: proof
Set $\tilde y_t=0$ and $u_t=0$ in [[#eq-nkpc]]: $\pi_t=\beta\E_t\pi_{t+1}$. The unique bounded solution is $\pi_t=0$. The IS curve then requires $i_t=r_t^n$. Conversely, $\pi_t=0$ for all $t$ and $u=0$ imply $\tilde y_t=0$ from [[#eq-nkpc-pv]].
:::

Cost-push shocks break the coincidence: $u_t>0$ forces a choice between $\pi$ and $\tilde y$. Sticky wages as well as sticky prices (Erceg, Henderson and Levin, *Journal of Monetary Economics* 2000) break it even without $u_t$, because wage inflation and price inflation cannot both be stabilised unless the gap takes a particular value that need not be zero. Divine coincidence is a property of the three-equation textbook, not of the world.

::: example Calvo slope in gap units {#ex-kappa}
With $\theta=0.75$, $\beta=0.99$, $\sigma=1$, $\varphi=1$, compute $\lambda$ and $\kappa$. If $\E_t\pi_{t+1}=0$ and $u_t=0$, how much quarterly inflation does a $1$ percent output gap produce this quarter?
::: solution
$\lambda=(1-0.75)(1-0.99\times 0.75)/0.75=0.08583$ as in the previous chapter. Then $\kappa=\lambda(\sigma+\varphi)=0.1717$. A $1$ percent gap produces $0.17$ percentage points of quarterly inflation, about $0.7$ percent at an annual rate if one multiplies by four. That is a flat NKPC relative to 1960s textbook Phillips curves, and it is why estimated three-equation models often need either a smaller $\theta$ or extra real rigidities (which shrink the mapping from $\tilde y$ to $\widehat{\mathrm{mc}}$) to match inflation volatility.
:::
:::

## Closing the model with a rule

A bounded rational-expectations solution for $(\tilde y_t,\pi_t)$ does not exist for arbitrary $i_t$. If the interest rate is pegged, the system typically has a continuum of bounded paths or none — Sargent and Wallace (1975), revived as the **Taylor principle** in [[business-cycles/monetary-policy-rules]]. The standard close is a **Taylor-type rule**. Two intercepts must be distinguished.

::: definition Three-equation New Keynesian model {#def-three}
The **three-equation NK model** is [[#eq-dis]], [[#eq-nkpc]], and an interest-rate rule. The **full-information rule**

$$
i_t = r_t^n + \phi_\pi\pi_t + \phi_y\tilde y_t
$$ {#eq-taylor-full}

tracks the natural rate. The **operational rule**

$$
i_t = \bar r + \phi_\pi\pi_t + \phi_y\tilde y_t
$$ {#eq-taylor-op}

replaces $r_t^n$ by a constant $\bar r$ (equal to $\E r^n$ in a linearisation around the mean). Under $\phi_\pi$ large enough, each rule delivers a unique bounded rational-expectations solution. In the textbook, $\phi_\pi>1$ and $\phi_y\ge 0$.
:::

If the bank could run [[#eq-taylor-full]] and if $u_t\equiv 0$, divine coincidence plus the intercept would give $\tilde y_t=\pi_t=0$ every period: demand shocks would be fully offset. The operational rule is the realistic one. The bank does not observe $r_t^n$ (nor $\tilde y_t$ in real time, a point Orphanides stressed). Demand shocks then survive into $\tilde y$ and $\pi$.

::: proposition Unique solution under iid demand shocks {#prop-iid}
Let $u_t\equiv 0$, $\sigma=1$, $\bar r=0$, and let $r_t^n$ be iid with mean zero. On the unique bounded solution, $\E_t\tilde y_{t+1}=\E_t\pi_{t+1}=0$. Under the operational rule [[#eq-taylor-op]],

$$
\tilde y_t = \frac{1}{1+\phi_\pi\kappa+\phi_y}\, r_t^n,
\qquad
\pi_t = \frac{\kappa}{1+\phi_\pi\kappa+\phi_y}\, r_t^n.
$$ {#eq-iid}

A positive natural-rate shock raises the gap and inflation, but less so the more aggressively the rule responds. Under the full-information rule [[#eq-taylor-full]], $\tilde y_t=\pi_t=0$.
:::
::: proof
With future expectations at zero and $\sigma=1$, the IS curve is $\tilde y_t = -(i_t-r_t^n)$ and the NKPC is $\pi_t=\kappa\tilde y_t$. The operational rule gives $i_t=\phi_\pi\pi_t+\phi_y\tilde y_t$, so $i_t-r_t^n = \phi_\pi\kappa\tilde y_t+\phi_y\tilde y_t-r_t^n$. Substitute into IS:

$$
\tilde y_t = -(\phi_\pi\kappa+\phi_y)\tilde y_t + r_t^n \implies \tilde y_t\bigl(1+\phi_\pi\kappa+\phi_y\bigr)=r_t^n,
$$

which is [[#eq-iid]]. Under [[#eq-taylor-full]], $i_t-r_t^n=\phi_\pi\pi_t+\phi_y\tilde y_t$, so the same algebra yields $\tilde y_t(1+\phi_\pi\kappa+\phi_y)=0$, hence $\tilde y_t=\pi_t=0$.
:::

::: example Numbers for a demand shock {#ex-iid}
Take $\kappa=0.172$, $\phi_\pi=1.5$, $\phi_y=0.5$, $\sigma=1$, and an iid natural-rate shock $r_t^n=0.01$. Compute $\tilde y_t$, $\pi_t$ and $i_t$ under the operational rule.
::: solution
The denominator is $1+1.5\times 0.172+0.5=1+0.258+0.5=1.758$. Then $\tilde y_t=0.01/1.758=0.00569$ ($0.57$ percent) and $\pi_t=0.172\times 0.00569=0.00098$ ($0.10$ percentage points of quarterly inflation). The operational rule sets $i_t=1.5\times 0.00098+0.5\times 0.00569=0.00432$, so the real-rate gap $i_t-r_t^n=-0.00568$ is about minus the output gap, as IS requires when $\sigma=1$ and $\E\pi=0$. A more aggressive $\phi_\pi$ would shrink both $\tilde y$ and $\pi$ further.
:::
:::

Cost-push is different. With $r_t^n=0$ and an iid $u_t$, the same algebra gives

$$
\tilde y_t = -\frac{\phi_\pi}{1+\phi_\pi\kappa+\phi_y}\, u_t,
\qquad
\pi_t = \frac{1+\phi_y}{1+\phi_\pi\kappa+\phi_y}\, u_t.
$$ {#eq-costpush}

Inflation rises and the gap *falls*: the bank leans against the inflation, which requires a real-rate increase and a slump. That is the textbook supply-shock trade-off, and it is why oil-price episodes (1973–74, 1979–80, 2022) are not a test of the IS curve.

::: example Cost-push arithmetic {#ex-cp}
Using [[#eq-costpush]] with $\kappa=0.2$, $\phi_\pi=1.5$, $\phi_y=0.5$ and $u_t=0.01$, compute $\tilde y_t$ and $\pi_t$.
::: solution
The denominator is $1+1.5\times 0.2+0.5=1.8$. Then $\tilde y_t=-(1.5/1.8)\times 0.01=-0.0083$ and $\pi_t=(1.5/1.8)\times 0.01=0.0083$. Inflation rises $0.83$ percentage points of the quarterly rate; the gap falls $0.83$ percent. Equal magnitudes here are a coincidence of $1+\phi_y=\phi_\pi$.
:::
:::

::: quiz
In the three-equation model with $u_t=0$ and an operational Taylor rule, a positive iid $r_t^n$ shock
- [ ] lowers inflation, because the bank raises $i_t$ more than one-for-one
- [x] raises the output gap and inflation, but by less than it would under an interest-rate peg
- [ ] raises inflation and lowers the output gap, like a cost-push shock
- [ ] has no effect, because of the divine coincidence
::: solution
Divine coincidence would kill the shock only if the rule tracked $r_t^n$. Under the operational rule the shock leaks into $\tilde y$ and $\pi$ with the same sign, damped by $\phi_\pi$ and $\phi_y$. A peg ($\phi_\pi=\phi_y=0$) would pass $r_t^n$ one-for-one into $\tilde y$. Cost-push moves $\pi$ and $\tilde y$ in opposite directions.
:::
:::

## Impulse responses and a phase diagram

Persistent shocks are the empirically relevant ones. If $r_t^n=\rho_r r_{t-1}^n+\varepsilon_t$ with $\rho_r$ close to one, expected future gaps are not zero and the impact coefficients in [[#eq-iid]] are scaled up: a persistent high $r^n$ is a persistent demand boom, and forward-looking firms raise prices more today. The same logic, with the opposite sign, is why a persistent cost-push is costlier to look through than a one-off.

A useful continuous-time picture, used for intuition rather than as a separate model, treats output as adjusting sluggishly toward IS and inflation as accelerationist:

$$
\dot y = -a y - b(\phi_\pi-1)\pi,
\qquad
\dot\pi = \kappa y.
$$ {#eq-phase}

Here $y$ stands for the gap, $a>0$ is inertia, and the Taylor principle $\phi_\pi>1$ makes the origin a sink. If $\phi_\pi<1$ the origin is a source: inflation and the gap explode (or, in the rational-expectations reading, the equilibrium is indeterminate). The next chapter makes that precise in discrete time.

::: widget phaseplane
f: -0.35*x - 0.8*(p-1)*y
g: 0.4*x
sliders: p=1.5:0.4:2.5
x: -3, 3
y: -3, 3
points: 1.5, 0.8; -1.2, -0.5
caption: Phase plane of [[#eq-phase]] with $x=\tilde y$ and $y=\pi$. The slider $p$ is $\phi_\pi$. At $p=1.5$ trajectories spiral (or run) into the origin: the Taylor principle is satisfied. Drag $p$ below $1$ and watch the origin lose stability. Click to add further starting gaps and inflation rates.
:::

::: widget plot
f: k*x; -(1+s*0.5)/(s*(p-1)+0.001)*x
sliders: k=0.4:0.1:1; p=1.5:1.05:2.5; s=1:0.2:2
x: -4, 4
y: -4, 4
labels: \text{NKPC}; \text{IS-MP}
caption: Static snapshot of the NKPC $\pi=\kappa\tilde y$ and the IS–MP schedule obtained by substituting the operational rule into IS (with $\E\pi=\E\tilde y=0$). Horizontal axis is the gap, vertical axis is inflation. Raise $\kappa$ to steepen the Phillips curve; raise $\phi_\pi$ ($p$) to flatten IS–MP and shrink the equilibrium gap for a given shock (a parallel shift of IS–MP, which you can picture by moving $s$). The intersection is the iid equilibrium of [[#prop-iid]] when the curves are shifted by a shock.
:::

::: warning The gap is not HP-filtered GDP
$\tilde y_t$ is the deviation from *flexible-price* output $y_t^n$, which itself moves with technology and with $r_t^n$. An HP filter of GDP, as in [[business-cycles/business-cycle-facts]], is a different object. A technology boom can raise $y_t$ and $y_t^n$ together, leaving $\tilde y_t$ small, while the HP cycle looks large. Conversely, a demand slump can open a large $\tilde y$ while the HP cycle is modest if the filter treats the slump as a trend. Estimated DSGE models (Smets and Wouters 2007) recover a model-consistent gap that does not coincide with the CBO or OECD statistical gaps. Mixing them in a Taylor rule is a specification choice, not a measurement.
:::

## Evidence, on both sides

The NK model is a laboratory, not a summary of the data. Several empirical claims are genuinely contested.

**The Phillips curve.** Galí and Gertler (*Journal of Monetary Economics*, 1999) estimated a hybrid NKPC on U.S. data with labour's share as a proxy for $\widehat{\mathrm{mc}}$ and found a dominant forward-looking weight. Rudd and Whelan (*Journal of Monetary Economics*, 2005) argued that the reduced-form evidence for expected inflation is weak once lags of inflation are allowed to speak. After 2008, inflation in the United States and the euro area fell less than a 1960s Phillips curve would have predicted given the unemployment gap (the "missing disinflation"; Hall, *American Economic Review* 2011; IMF WEO, April 2013). After 2021, inflation rose more, and more persistently, than many NK calibrations with a flat $\kappa$ predicted. Both episodes can be read as cost-push and as a warning about $\kappa$. They cannot both be read as a reason to drop the NKPC without a replacement: a purely real model has $\pi$ determined residually by money or by a unit of account, and has nothing to say about a 2022 inflation spike at given $Z_t$.

**Identified monetary shocks.** Christiano, Eichenbaum and Evans (2005) and Romer and Romer (2004) remain the benchmark: after a contractionary shock, output and hours fall for several quarters, inflation falls more slowly (the "price puzzle" in some VARs is a warning about identification). That pattern is what the three-equation model is built to match, and what the RBC model matches only by correlating the monetary shock with a real one. High-frequency surprises around policy announcements (Gürkaynak, Sack and Swanson 2005; a large post-2010 literature) have confirmed a real effect of monetary news on bond yields, exchange rates and, with more noise, on output.

**Estimated DSGE.** Smets and Wouters (2007) for the United States and the European Central Bank's New Area-Wide Model for the euro area are NK models with capital, habits, wage stickiness and several shocks, estimated by Bayesian methods. They attribute a large share of inflation variance to price- and wage-mark-up shocks ($u_t$ and its wage analogue) and a large share of output variance to demand and wage-mark-up shocks. Technology shocks are present and look more like Gali (1999) than like Kydland and Prescott (1982): hours can fall. Chari, Kehoe and McGrattan (*Journal of Economic Perspectives*, 2009) argued that mark-up shocks are "wedges" without a clear micro foundation and that the estimated models are therefore not yet a theory of those wedges. That criticism is fair and does not erase the monetary VARs.

**RBC remaining claims.** A technology shock still moves $y_t^n$. Financial shocks, in [[business-cycles/financial-frictions]], can be written as shocks to $r_t^n$ or to a spread that enters IS. Nothing in the three-equation model forbids real shocks; it forbids *only* real shocks as a complete description of $\pi$ and $\tilde y$. King and Rebelo (in the *Handbook of Macroeconomics*, 1999) already presented RBC as a benchmark, not as a claim that money is a veil at every horizon.

::: application A 2022-style cost-push, in the laboratory
Take [[#eq-costpush]] with $\kappa=0.17$, $\phi_\pi=1.5$, $\phi_y=0.5$ and $u_t=0.01$ (one percentage point of extra quarterly inflation at a given gap). The denominator is $1+1.5\times 0.17+0.5=1.755$. Then $\tilde y_t=-(1.5/1.755)\times 0.01=-0.0085$ and $\pi_t=(1.5/1.755)\times 0.01=0.0085$. Inflation still rises; the gap falls by $0.85$ percent. A bank that put no weight on inflation would have $\phi_\pi=0$, $\tilde y_t=0$ and $\pi_t=u_t=0.01$: more inflation, no slump. A bank that put no weight on the gap and a very large $\phi_\pi$ would crush $\pi$ at the cost of a large negative $\tilde y$. The model exhibits the trade-off; it does not pick a point on it. That choice is a loss function, taken up in [[business-cycles/monetary-policy-rules]].
:::

## Where this leads

[[business-cycles/monetary-policy-rules]] studies $\phi_\pi$, inflation targeting and the time-inconsistency problem that the three-equation model, with a quadratic loss in $\pi$ and $\tilde y$, makes precise. [[business-cycles/zero-lower-bound]] asks what happens when the rule wants $i_t<0$ and cannot have it. [[business-cycles/financial-frictions]] adds a spread between the policy rate and the rate in the IS curve. [[business-cycles/fiscal-stabilisation]] puts $G_t$ back into IS and asks when the multiplier is large. All of those chapters reuse [[#def-three]]. If the Calvo slope is wrong, the *signs* of the impulse responses in this chapter typically survive and the *sizes* do not.

::: history
**1999, Richard Clarida, Jordi Galí and Mark Gertler.** "The Science of Monetary Policy" (*Journal of Economic Literature*) wrote down the three-equation laboratory and the case for a Taylor-type rule with $\phi_\pi>1$. **2003, Michael Woodford.** *Interest and Prices* derived the same block from a complete general equilibrium and showed that a quadratic loss in $\pi$ and $\tilde y$ is a correct welfare approximation when prices are Calvo and shocks are small. **2007, Frank Smets and Rafael Wouters.** Their estimated DSGE became the template for central-bank projection models, and the template for the critique that mark-up shocks are still reduced-form wedges.
:::

::: summary
- The dynamic IS curve is an Euler equation in gaps: a real rate above $r_t^n$ lowers $\tilde y_t$ relative to $\E_t\tilde y_{t+1}$.
- The NKPC is Calvo inflation as a present value of gaps, plus a cost-push $u_t$. Without $u_t$, the divine coincidence holds: $\tilde y=0$ and $\pi=0$ are the same target.
- An operational Taylor rule that does not track $r_t^n$ lets demand shocks move $\tilde y$ and $\pi$ in the same direction; cost-push moves them in opposite directions.
- Identified monetary shocks support several quarters of real effects. The slope $\kappa$, the weight on expected inflation, and the interpretation of mark-up shocks in estimated DSGE models remain live disputes, not settled theorems.
- $\tilde y$ is a model-consistent gap, not an HP cycle.
:::

## Exercises

::: exercise IS arithmetic {level=1 check="-0.5"}
In [[#eq-dis]] with $\sigma=2$, $\E\tilde y_{t+1}=0$, $\E\pi_{t+1}=0$, $r^n=0$ and $i=0.01$, what is $\tilde y$ in percent? (Enter the signed number, e.g. -0.5.)
::: solution
$\tilde y=-(1/2)\times 0.01=-0.005$, which is $-0.5$ percent.
:::
:::

::: exercise Divine coincidence {level=1}
State [[#prop-divine]] in one sentence, and name the shock that breaks it in the three-equation model.
::: solution
When there is no cost-push, setting the output gap to zero in every period also delivers zero inflation. A cost-push (mark-up) shock $u_t$ breaks the coincidence, as do sticky wages.
:::
:::

::: exercise Full-information intercept {level=1}
If the bank could run [[#eq-taylor-full]] and $u_t=0$, what are $\tilde y_t$ and $\pi_t$ after a demand shock? Why is this not an available policy in real time?
::: solution
Both are zero: the intercept tracks $r_t^n$ and offsets the shock. The natural rate is not observed, and even the gap is estimated with large real-time error (Orphanides). The operational rule is what a feasible instrument looks like.
:::
:::

::: exercise Demand-shock arithmetic {level=2 check="0.5"}
In [[#eq-iid]] take $\kappa=0.2$, $\phi_\pi=2$, $\phi_y=0.6$ and $r_t^n=1$ (one percent). What is $\tilde y_t$ in percent? (Enter the number.)
::: solution
The denominator is $1+2\times 0.2+0.6=2$. Then $\tilde y_t=1/2=0.5$.
:::
:::

::: exercise Cost-push sign {level=2}
Using [[#eq-costpush]], explain why a positive mark-up shock raises inflation and *lowers* the output gap under $\phi_\pi>0$. What would happen if $\phi_\pi=0$ and $\phi_y=0$?
::: solution
The bank raises $i_t$ in response to the inflation that $u_t$ produces. A higher real rate reduces $\tilde y$ through IS, which in turn *damps* the inflation (the NKPC) but does not reverse its sign when $\phi_\pi$ is finite. If $\phi_\pi=\phi_y=0$ (a peg at $\bar r$), then $i_t=0$, so IS with $r^n=0$ and $\E=0$ gives $\tilde y_t=0$, and the NKPC gives $\pi_t=u_t$: the gap is insulated and inflation absorbs the whole shock.
:::
:::

::: exercise Model gap versus HP {level=2}
A technology boom raises $y_t$ and $y_t^n$ by the same $2$ percent, while demand is unchanged at the natural rate. What is $\tilde y_t$? What might an HP filter of $y_t$ report, and why would putting that HP cycle into a Taylor rule be a mistake in this episode?
::: solution
$\tilde y_t=0$ by construction. An HP filter, which does not know $y_t^n$, will treat part of the $2$ percent as a cycle if the boom is not extremely persistent, so the HP gap is positive. A Taylor rule that raises $i_t$ in response to that HP gap would tighten in a flexible-price boom — the opposite of tracking $r_t^n$. This is Orphanides's real-time gap problem in a pure form.
:::
:::

::: exercise Persistent demand {level=3}
Suppose $r_t^n$ is AR(1) with root $\rho_r=0.9$ rather than iid, and expectations are rational. Argue why $\pi_t$ responds *more*, per unit of current $r_t^n$, than in [[#eq-iid]].
::: hint
The NKPC is a present value of current *and future* gaps. A persistent $r^n$ means future gaps are expected to be positive too.
:::
::: solution
Under iid, $\E_t\tilde y_{t+1}=0$ so $\pi_t=\kappa\tilde y_t$. Under AR(1), a high $r_t^n$ today forecasts a high $r_{t+k}^n$ and therefore a high $\tilde y_{t+k}$. From [[#eq-nkpc-pv]], $\pi_t=\kappa\sum\beta^k\E_t\tilde y_{t+k}$ is then larger relative to current $\tilde y_t$ — the Phillips curve looks steeper in a plot of $\pi_t$ against current $\tilde y_t$. IS also has $\E_t\tilde y_{t+1}>0$, which *raises* current $\tilde y_t$ for a given real-rate gap. Both channels amplify the inflation response. That is why a central bank that "looks through" a one-off demand blip will not look through a persistent one.
:::
:::

::: exercise From Calvo to $\kappa$ {level=3}
Derive $\kappa=\lambda(\sigma+\varphi)$ in the no-capital case, starting from $\widehat{\mathrm{mc}}_t$ as the gap between the MRS and the marginal product of labour, and state two reasons a smaller $\kappa$ might be estimated in the data even if $\theta=0.75$.
::: hint
MRS $= \chi N^{\varphi} C^{\sigma}$; with $Y=N$ and $C=Y$, log-linearise. Real rigidities and a hybrid NKPC both flatten the reduced form.
:::
::: solution
With $Y=N$ and $C=Y$, the MRS is $\chi Y^{\varphi} Y^{\sigma}=\chi Y^{\sigma+\varphi}$ and the marginal product is $1$. Flexible-price hours (and output) satisfy $\chi (Y^n)^{\sigma+\varphi}$ equal to the inverse desired mark-up. The real-marginal-cost gap is therefore $(\sigma+\varphi)(\hat y-\hat y^n)=(\sigma+\varphi)\tilde y$. The Calvo block maps $\widehat{\mathrm{mc}}$ into inflation with slope $\lambda$, hence $\kappa=\lambda(\sigma+\varphi)$. A smaller reduced-form $\kappa$ can come from (i) real rigidities — intermediate inputs, firm-specific labour — that put a coefficient less than one in front of $(\sigma+\varphi)\tilde y$ in the $\widehat{\mathrm{mc}}$ equation, and (ii) a hybrid NKPC in which lagged inflation takes some of the weight, so that a given $\tilde y$ produces less *new* inflation. Measurement of $\tilde y$ (HP versus model-consistent) is a third reason estimated $\kappa$ is fragile.
:::
:::
