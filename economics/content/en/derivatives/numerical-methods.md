The Black–Scholes formula prices a European call on a lognormal underlying. An American put, a barrier that knocks out if $S$ touches $H$, an Asian that pays on the average of $S$, a call on a tree that is already the model — none of these has that formula. Three numerical methods cover the rest of a first course: **trees**, already used by hand in [[derivatives/binomial-model]]; **Monte Carlo**, which samples $S_T$ (or a path) under the risk-neutral measure and averages the discounted payoff; and **finite differences**, which replace the Black–Scholes PDE by a grid. Each method has a stated error. None of them removes the assumptions of the model it is discretising.

The house-number European call, whose closed form is $10.4506$, is the test piece. A Monte Carlo of $100{,}000$ draws with seed $42$ gives $10.421$ with a standard error of $0.047$. A central-difference delta from bumping $S$ by $1$ gives $0.6367$ against $0.6368$. The numbers check the implementations. They are not quotes, and they are not a reason to prefer one method as a trading rule.

## Monte Carlo under $Q$

:::definition Risk-neutral Monte Carlo {#def-mc}
To price a European claim paying $g(S_T)$ in the Black–Scholes world, draw $Z_1,\dots,Z_M$ independent standard normals and set

$$
S_T^{(m)} = S_0 \exp\bigl((r-q-\tfrac12\sigma^2)T + \sigma\sqrt{T}\, Z_m\bigr),\qquad
\hat V = e^{-rT}\,\frac1M \sum_{m=1}^M g\bigl(S_T^{(m)}\bigr).
$$ {#eq-mc}

The estimator is unbiased for $e^{-rT}\E^Q[g(S_T)]$ and has standard error $e^{-rT} s / \sqrt{M}$, where $s$ is the sample standard deviation of $g(S_T)$. For a path-dependent payoff $g(S_{t_1},\dots,S_{t_n})$, one draws a path of increments instead of a single $Z$.
:::

The strong law sends $\hat V$ to the true price as $M \to \infty$. The error is random and shrinks like $1/\sqrt{M}$: four times the draws cut the standard error in half. That is slower than a well-built tree or grid on a low-dimensional Markov claim, and it is often the only workable method in high dimension (several underlyings, or a path functional that does not Markovianise cheaply).

:::proposition Monte Carlo error {#prop-mc-error}
If $\Var^Q\bigl(g(S_T)\bigr) < \infty$, then $\sqrt{M}\,(\hat V - V)$ converges in distribution to a centred normal with variance $e^{-2rT}\Var^Q(g(S_T))$. A $95\%$ interval is $\hat V \pm 1.96$ standard errors. Assumptions: i.i.d. draws from the correct $Q$-distribution of the inputs to $g$; no discretisation bias in $S_T$ (exact sampling, as in [[#eq-mc]] for geometric Brownian motion).
:::

:::proof
$\hat V$ is an average of i.i.d. random variables with finite variance, times the constant $e^{-rT}$. The ordinary central limit theorem applies. If the path of $S$ is itself approximated (Euler on a local-vol SDE, for example), a discretisation bias of order $\Delta t$ or $\sqrt{\Delta t}$ sits *beside* the $1/\sqrt{M}$ error and does not shrink with $M$ unless $\Delta t$ is refined.
:::

:::example House-number Monte Carlo {#ex-mc}
$S = 100$, $K = 100$, $r = 0.05$, $q = 0$, $\sigma = 0.20$, $T = 1$, $g = \max(S_T-K,0)$, $M = 100{,}000$ draws from a fixed generator with seed $42$. Report $\hat C$ and its standard error, and compare with Black–Scholes $10.4506$.
:::solution
The sampled estimator is $\hat C = 10.421$ with standard error $0.047$. The gap to $10.4506$ is $0.030$, well inside one standard error. A $95\%$ interval is $10.421 \pm 1.96\times 0.047 = (10.329, 10.513)$, which contains the closed form. A different seed produces a different $\hat C$; that is the method. Reporting $10.421$ as “the” price without the $0.047$ is a compression the standard error exists to prevent.
:::
:::

:::example A cash-or-nothing by simulation {#ex-mc-digital}
On the same draws, the payoff $1_{\{S_T > 100\}}$ has discounted Monte Carlo price close to $e^{-rT} N(d_2) = 0.5323$. With $M = 100{,}000$ the standard error is of order $e^{-rT}\sqrt{p(1-p)/M} \approx 0.0015$. Why is the relative error smaller than for the vanilla call?
:::solution
The cash-or-nothing is bounded in $\{0,1\}$, so its variance is at most $1/4$. The vanilla call's payoff has a long right tail under the lognormal, and $s$ is of order $15$ rather than $0.5$. The $1/\sqrt{M}$ law is the same; the constant in front is not. Variance-reduction techniques (antithetic $Z$, control variates using the closed-form call as a control, importance sampling on $d_2$) exist to cut that constant. They do not change the model.
:::
:::

:::widget montecarlo
mode: integral
f: exp(-0.05)*max(100*exp(0.03+0.2*x)-100,0)*exp(-x^2/2)/sqrt(2*pi)
a: -4
b: 4
n: 1000
caption: Monte Carlo as an integral: the integrand is $e^{-rT}\max(S_T(z)-K,0)\, n(z)$, with $S_T(z) = 100\exp(0.03+0.2 z)$ the house-number map from a standard normal. Raise $n$. The estimate wanders toward the Black–Scholes value $10.45$, with error of order $1/\sqrt{n}$. The picture is a quadrature of a model payoff, not a forecast of $S_T$.
:::

The widget samples the same integral that [[#eq-mc]] samples, on a finite interval $[-4,4]$ that holds almost all of the Gaussian mass. It is a teaching picture of $1/\sqrt{n}$. A production Monte Carlo draws $Z$ directly rather than sampling $x$ uniformly and reweighting by $n(x)$, but the integral is the same object.

:::warning Forgetting the discount, or simulating under $P$
Two implementation errors. First, averaging $\max(S_T-K,0)$ and forgetting $e^{-rT}$. On the house numbers that overstates the call by a factor $e^{0.05} \approx 1.051$, about $0.52$ too high. Second, simulating with the *physical* drift $\mu$ in place of $r-q$. That produces a number which is not the replicating cost. It is an expected payoff under $P$, still needing a risk-adjusted discount. The tree chapter's warning about $p$ versus $p^*$ is this warning, for a continuous-state simulation.
:::

## Finite differences for the PDE

The Black–Scholes PDE [[derivatives/black-scholes#eq-pde]] lives on $(S,t) \in (0,\infty)\times [0,T)$. A **finite-difference** scheme replaces $S$ by a grid $S_j = j\Delta S$, $j = 0,\dots,J$, and $t$ by $t_n = n\Delta t$, and replaces derivatives by difference quotients.

:::algorithm Explicit finite difference for a European call {#alg-fd}
1. Choose $S_{\max}$ (for example $3K$), $J$ and $N$, set $\Delta S = S_{\max}/J$, $\Delta t = T/N$. Terminal layer: $V_{J,N} = \max(j\Delta S - K, 0)$. Boundary: $V_{0,n} = 0$, $V_{J,n} = S_{\max} - K e^{-r(T-t_n)}$ (or a Neumann condition).
2. Interior points, stepping *backward* in time, with $\Delta = (V_{j+1}-V_{j-1})/(2\Delta S)$ and $\Gamma = (V_{j+1}-2V_j+V_{j-1})/(\Delta S)^2$ evaluated at layer $n+1$:
   $$
   \frac{V_j^{n} - V_j^{n+1}}{\Delta t} = (r-q) S_j \Delta + \tfrac12 \sigma^2 S_j^2 \Gamma - r V_j^{n+1}
   $$
   in the explicit scheme (right-hand side at $n+1$). An implicit or Crank–Nicolson scheme evaluates some or all of the $S$-derivatives at the *unknown* layer $n$ and solves a tridiagonal system.
3. Read $V$ off the grid at $S_0$, interpolating if needed. Delta and gamma are the same difference quotients at that node.
:::

The explicit scheme is simple and conditionally stable: $\Delta t$ must be small enough relative to $(\Delta S)^2$, the usual diffusion restriction. Crank–Nicolson is unconditionally stable for the heat equation and is the classroom default. American exercise is a comparison against intrinsic at each node, as on the tree: $V_j^n \leftarrow \max(V_j^{n,\mathrm{cont}}, \text{intrinsic})$. That comparison is why grids, like trees, handle American puts, and why a Monte Carlo needs extra work (Longstaff–Schwartz regression, for example) to do the same.

:::example Three-point delta on the closed form {#ex-fd-delta}
The closed-form call at $S = 99, 100, 101$ is $9.8232$, $10.4506$, $11.0967$. Compute the central delta and the second-difference gamma. These *are* the finite-difference Greeks on a grid that happens to have $\Delta S = 1$ and no time error, because the input values are exact.
:::solution
$\Delta = (11.0967-9.8232)/2 = 0.6367$, $\Gamma = 11.0967 - 2\times 10.4506 + 9.8232 = 0.0188$ to four decimals. Closed forms: $0.6368$ and $0.01876$. On a real grid the input values $V_{j\pm 1}$ carry their own truncation error, so the Greek inherits both the difference-quotient bias and the PDE-discretisation bias. Refining $\Delta S$ and $\Delta t$ together is the convergence check.
:::
:::

:::remark Transforming to heat-equation coordinates
The change of variables $x = \ln S$, $\tau = T-t$, and a further affine transformation of $V$, turns the Black–Scholes PDE into the heat equation $u_\tau = u_{xx}$. Finite differences, and the stability theory, are then the standard numerical-analysis item. Trees are a particular explicit scheme on a trinomial or binomial $x$-grid. The three methods of this chapter are not three theories. They are three discretisations of the same expectation, or of the same PDE.
:::

## Exotic options

A claim is **path-dependent** if $g$ uses more than $S_T$.

:::definition Barrier, Asian, lookback {#def-exotic}
A **down-and-out call** with barrier $H < S_0$ pays the European call payoff if $\min_{t\le T} S_t > H$ and $0$ otherwise. An **arithmetic Asian call** pays $\max(\bar S - K, 0)$ where $\bar S$ is the average of $S$ at specified dates (or the integral average). A **lookback call** pays $S_T - \min_{t\le T} S_t$ (or a fixed-strike version on the max or min). Each has a **European** or **American** exercise convention for any optional early stop.
:::

Barriers on geometric Brownian motion have closed forms (reflection principle). Arithmetic Asians do not, in Black–Scholes; geometric Asians do, and are a control variate for the arithmetic case. Lookbacks on GBM have closed forms. In every case the closed form dies as soon as $\sigma$ is local or stochastic, and Monte Carlo on a path becomes the default.

A discretely monitored barrier — knocked out only if $S$ is below $H$ *on a fixing date* — is a different contract from the continuous barrier, and it is the usual listed one. A Monte Carlo that samples daily closes prices the discrete contract; a closed form for the continuous contract is then a biased estimator of the discrete one. The bias can be tens of percent of the value for a barrier close to $S_0$ with sparse fixings.

:::example A down-and-out, qualitatively {#ex-dao}
$S_0 = 100$, $K = 100$, $H = 80$, house-number $r, \sigma, T$. The European call is worth $10.451$. The down-and-out call is worth *less*, because some paths that would have paid $\max(S_T-K,0)$ are set to zero. The down-and-in call, which pays only if the barrier *is* touched, makes up the difference: in + out = vanilla, for a European claim in a model with continuous paths. If $H \to 0$, the out-call tends to the vanilla; if $H \to S_0$, it tends to $0$.
:::solution
The identity “in + out = vanilla” is a partition of the path space, not a pricing model. It fails if the in and out contracts have different rebates, or if a jump can skip over $H$ without a hitting time. On GBM it holds, and it is the usual check on a barrier implementation: the two numerical prices must add to $10.451$ on the house numbers, within combined error. A quoted vanilla of $10.45$ and a quoted out-call of $11$ would not be a model failure; it would be an arbitrage against the identity, or a difference in the contracts (discrete versus continuous monitoring, or a rebate).
:::
:::

:::quiz
A Monte Carlo of $M = 10{,}000$ draws has standard error $0.15$ for a claim. To bring the standard error down to $0.015$, about how many draws are needed, other things equal?
- [ ] $20{,}000$, because the error is linear in $M$
- [x] $1{,}000{,}000$, because the error shrinks as $1/\sqrt{M}$
- [ ] $10{,}000$ still, because the closed form is $10.45$
- [ ] $M$ does not affect the error once $M > 1{,}000$
:::solution
A factor-of-$10$ cut in the standard error needs a factor-of-$100$ rise in $M$, by [[#prop-mc-error]]. $10{,}000 \times 100 = 1{,}000{,}000$. The closed form is a check, not a substitute for $M$ when the closed form does not exist. There is no $M$ at which the error “stops”.
:::
:::

## Choosing a method

| Claim | Natural method | Typical extra issue |
|---|---|---|
| European vanilla, GBM | Formula | None; use as a control |
| American put, one $S$ | Tree or FD grid | Early-exercise comparison |
| Barrier, continuous GBM | Formula or FD | Discrete monitoring bias |
| Asian, arithmetic | Monte Carlo | Control variate (geometric) |
| Several underlyings | Monte Carlo | Dimension; correlation draws |
| Local vol, one $S$ | FD or tree | Calibration of $\sigma(S,t)$ |
| Stochastic vol | Monte Carlo or 2d FD | Extra Greek (vega as a bump of the vol-of-vol) |

The table is a starting map, not a ranking of methods for a desk. Production systems mix them: a PDE grid for the vanilla book, Monte Carlo for the exotics, a tree for a quick American, and the formula as a control variate and as the quoting unit.

What every method leaves out is whatever the *model* left out. A Monte Carlo of GBM still has no jumps. A fine grid of the Black–Scholes PDE still has constant $\sigma$. Refining $M$, $n$, or $\Delta S$ drives discretisation error to zero inside the model. It does not drive model error to zero.

## Where this leads

Greeks by bumping — recompute $\hat V$ at $S+\varepsilon$ and $S-\varepsilon$ — are the finite-difference Greeks of the previous chapter, and they are the production default for Monte Carlo books. Likelihood-ratio and pathwise derivatives cut the variance of those Greeks; they are a second course. Credit claims in [[derivatives/credit-derivatives]] add a default time to the path, which is one more Poisson draw in a Monte Carlo. Risk statistics in [[derivatives/risk-management]] are themselves Monte Carlo functionals of a loss, with the same $1/\sqrt{M}$ law and the same duty to report a standard error.

:::history
**1977, Boyle.** Phelim Boyle, “Options: A Monte Carlo Approach”, *Journal of Financial Economics* 4 (1977), pages 323–338, priced a European claim by sampling the lognormal $S_T$. The paper is the starting citation for Monte Carlo in derivatives. **1977–79, Brennan–Schwartz and others** applied finite differences to the American put. **2001, Longstaff–Schwartz**, “Valuing American Options by Simulation: A Simple Least-Squares Approach”, *Review of Financial Studies* 14, extended Monte Carlo to American exercise by regressing continuation on basis functions of the state. The three citations are three discretisations, not three markets.
:::

:::summary
- Monte Carlo prices $e^{-rT}\E^Q[g]$ by sampling. The error shrinks as $1/\sqrt{M}$ and should be reported. House-number check: $M = 100{,}000$, seed $42$, $\hat C = 10.421$, s.e. $0.047$, against $10.451$.
- Simulate under $Q$ (drift $r-q$), not under $P$, and do not forget the discount.
- Finite differences discretise the PDE on a grid. Explicit schemes are easy and conditionally stable; Crank–Nicolson is the classroom default. American exercise is a comparison at each node.
- Path-dependent claims (barriers, Asians, lookbacks) are Monte Carlo's home ground. Continuous-barrier identities such as in + out = vanilla are checks, and they fail if a jump can skip the barrier.
- Refining the method kills discretisation error inside the model. It does not kill model error.
:::

## Exercises

:::exercise Standard error scaling {level=1 check="1000000"}
A Monte Carlo with $M = 10000$ has s.e. $0.15$. Enter the $M$ needed to bring the s.e. to $0.015$, other things equal.
:::solution
A factor-of-$10$ cut needs a factor-of-$100$ rise in $M$: $1{,}000{,}000$, by [[#prop-mc-error]].
:::
:::

:::exercise Discounting {level=1 check="10.451"}
A simulation averages the payoff $\max(S_T-K,0)$ and obtains $10.986$ as the *undiscounted* mean on the house numbers. Enter the discounted price to three decimals, using $r = 0.05$, $T = 1$.
:::solution
$e^{-0.05}\times 10.986 = 0.951229 \times 10.986 = 10.451$ to three decimals. Forgetting the discount would have left $10.986$, about $0.54$ too high. (The $10.986$ was chosen to be $e^{0.05}\times 10.4506$, the exact risk-neutral expected payoff.)
:::
:::

:::exercise Central delta {level=1 check="0.6367"}
$C(101) = 11.0967$, $C(99) = 9.8232$. Enter the central-difference delta to four decimals.
:::solution
$(11.0967-9.8232)/2 = 0.63675$, which is $0.6367$ to four decimals, [[#ex-fd-delta]].
:::
:::

:::exercise Monte Carlo interval {level=2 check="10.329"}
$\hat C = 10.421$, s.e. $= 0.047$. Enter the lower end of the $95\%$ interval $\hat C - 1.96\,\mathrm{s.e.}$, to three decimals.
:::solution
$10.421 - 1.96\times 0.047 = 10.421 - 0.092 = 10.329$. The upper end is $10.513$. The closed form $10.451$ sits inside.
:::
:::

:::exercise In plus out {level=2 check="10.451"}
A down-and-out call is computed at $7.200$ and the corresponding down-and-in call at $3.251$, on the house-number vanilla. Enter the sum, to three decimals, and state in the solution whether the identity holds.
:::solution
$7.200 + 3.251 = 10.451$, which matches the vanilla. On GBM with continuous monitoring and no rebates, in + out = vanilla. If the numbers had added to $9.80$, the implementation would be wrong, or the contracts would not be a partition (a rebate, or discrete versus continuous).
:::
:::

:::exercise Path of an Asian {level=2}
A two-date arithmetic Asian call pays $\max((S_{T/2}+S_T)/2 - K, 0)$. Describe, in steps, a Monte Carlo estimator under GBM, including how the two dates are drawn from a single pair of normals (or from one Brownian path). Do not compute a number.
:::solution
Draw $Z_1, Z_2$ i.i.d. standard normal. Set $S_{T/2} = S_0 \exp\bigl((r-q-\sigma^2/2)(T/2) + \sigma\sqrt{T/2}\, Z_1\bigr)$ and $S_T = S_{T/2} \exp\bigl((r-q-\sigma^2/2)(T/2) + \sigma\sqrt{T/2}\, Z_2\bigr)$. Average $\bar S = (S_{T/2}+S_T)/2$, take $\max(\bar S - K, 0)$, discount by $e^{-rT}$, and average over $M$ independent pairs $(Z_1,Z_2)$. (Equivalently, draw a Brownian path at the two dates with the correct covariance.) Sampling $S_T$ only, and pretending $\bar S = S_T$, prices a different claim.
:::
:::

:::exercise Explicit-scheme stability, in words {level=3}
The explicit finite-difference scheme for the heat equation $u_\tau = u_{xx}$ is stable in $L^2$ when $\Delta\tau / (\Delta x)^2 \le 1/2$. Translate this restriction into a statement about $\Delta t$ and $\Delta S$ for the Black–Scholes PDE, qualitatively (the exact transformed constant is not required). What goes wrong, in one sentence, if the restriction is ignored?
:::hint
$x = \ln S$ turns $\Delta x$ into a relative step in $S$. Time in the heat equation runs backward from $T$.
:::
:::solution
After $x = \ln S$ and $\tau = T-t$, a bound $\Delta\tau/(\Delta x)^2 \le 1/2$ is a bound on $\Delta t / (\Delta \ln S)^2$. On a uniform $S$-grid, $\Delta \ln S \approx \Delta S/S$ is smallest at the right-hand end of the grid, so the tightest restriction is at large $S$: $\Delta t$ must be $O\bigl((\Delta S/S_{\max})^2\bigr)$. If the restriction is ignored, high-frequency modes on the grid grow from layer to layer and the computed $V$ oscillates with an amplitude that explodes as one steps toward $t = 0$. Implicit and Crank–Nicolson schemes remove the restriction at the cost of a linear solve per layer. The restriction is a property of the discretisation, not of the option.
:::
:::

:::exercise Control variate, in numbers {level=3 check="6.860"}
A Monte Carlo of an arithmetic Asian is run together with a geometric Asian whose closed form is $6.000$. The two estimators, on the same draws, come out $6.800$ (arithmetic) and $5.940$ (geometric). The control-variate estimator with coefficient $1$ is $\hat V_{\mathrm{arith}} - (\hat V_{\mathrm{geo}} - 6.000)$. Enter it to three decimals. Explain in the solution why the coefficient $1$ is a reasonable first choice and not always optimal.
:::hint
The two payoffs are positively correlated; subtracting the geometric error removes part of the arithmetic error.
:::
:::solution
$6.800 - (5.940 - 6.000) = 6.800 + 0.060 = 6.860$. Coefficient $1$ is reasonable because the two claims are similar (the geometric mean tracks the arithmetic mean). The optimal coefficient is $\beta = \Cov(\hat V_a, \hat V_g)/\Var(\hat V_g)$, estimated on the same draws; it equals $1$ only if the errors match one-for-one. Using $\beta = 1$ is a control variate still, just not the minimum-variance one. The $6.860$ is a variance-reduced estimate of the arithmetic Asian, not a vanilla call, and not a quote.
:::
:::
