The Black–Scholes formula is a function of five inputs, $S, K, r, \sigma, T$, and of calendar time $t$ through the residual maturity. Its partial derivatives are the **Greeks**. Delta is the slope in $S$, and it is the $\Delta$ that the hedging argument of the previous chapter cancelled. Gamma is the curvature in $S$, vega the slope in $\sigma$, theta the slope in time, rho the slope in $r$. A desk that holds options holds a vector of these numbers. A discrete hedge that matches delta, and maybe gamma and vega, is a statement about which first-order moves have been cancelled. It is not a statement that the position cannot lose money.

This chapter computes the Greeks on the house-number call $S = K = 100$, $r = 0.05$, $q = 0$, $\sigma = 0.20$, $T = 1$, whose value is $C = 10.4506$. Delta comes out $0.6368$, gamma $0.01876$, vega $0.375$ per volatility point, theta $-6.414$ per year. The Black–Scholes PDE is the identity that binds them. A one-day, one-rebalance story then shows what a discrete delta-hedge leaves behind. None of the numbers is a recommendation to hedge, to leave a Greek unmatched, or to take a view on $S$ or $\sigma$.

## The five first names

:::definition The Greeks {#def-greeks}
For a European claim $V(S,t; K, r, \sigma, q)$ in the Black–Scholes model of [[derivatives/black-scholes#thm-bs]],

- **Delta** $\Delta = \partial V / \partial S$,
- **Gamma** $\Gamma = \partial^2 V / \partial S^2$,
- **Vega** $\nu = \partial V / \partial \sigma$ (per unit of $\sigma$; a “vega per percent” is $\nu/100$),
- **Theta** $\Theta = \partial V / \partial t$ (per year of calendar time; a “theta per day” is $\Theta/365$),
- **Rho** $\rho = \partial V / \partial r$ (per unit of $r$; a “rho per basis point” is $\rho/10{,}000$).

The same names are used for binomial deltas (a difference quotient on the tree) and for finite-difference Greeks (a bump of the input). Those are approximations to these partials when the model is Black–Scholes, and they are *definitions* of the Greek when the model is a tree or a simulation.
:::

For the European call and put with $q = 0$, differentiation of [[derivatives/black-scholes#eq-call]] produces closed forms.

:::proposition Black–Scholes Greeks for a European call, $q = 0$ {#prop-greeks}
With $d_1, d_2$ as in [[derivatives/black-scholes#eq-d1d2]] and $n(x) = e^{-x^2/2}/\sqrt{2\pi}$,

$$
\begin{aligned}
\Delta_{\mathrm{call}} &= N(d_1), &
\Delta_{\mathrm{put}} &= N(d_1) - 1, \\
\Gamma &= \frac{n(d_1)}{S\sigma\sqrt{T}} \quad\text{(call and put)}, &
\nu &= S n(d_1)\sqrt{T} \quad\text{(call and put)}, \\
\Theta_{\mathrm{call}} &= -\frac{S n(d_1)\sigma}{2\sqrt{T}} - r K e^{-rT} N(d_2), &
\rho_{\mathrm{call}} &= K T e^{-rT} N(d_2).
\end{aligned}
$$ {#eq-greeks}

Theta of the put replaces the second term by $+ r K e^{-rT} N(-d_2)$. Rho of the put is $-K T e^{-rT} N(-d_2)$. Assumptions: the Black–Scholes world of [[derivatives/black-scholes#thm-bs]], with $q = 0$.
:::

:::proof
Differentiate [[derivatives/black-scholes#eq-call]] with respect to $S$. The terms that come from $\partial d_1/\partial S$ and $\partial d_2/\partial S$ cancel, because $S n(d_1) = K e^{-rT} n(d_2)$ (a direct check from the definitions of $d_1$ and $d_2$). What remains is $N(d_1)$. Differentiating again in $S$ produces $\Gamma = n(d_1)/(S\sigma\sqrt{T})$. Differentiating in $\sigma$ produces $S n(d_1)\sqrt{T}$ after the same cancellation. Differentiating in $t$ (through $T = T_{\mathrm{cal}} - t$) and in $r$ gives theta and rho. The put Greeks follow from parity $P = C - S + K e^{-rT}$: $\Delta_{\mathrm{put}} = \Delta_{\mathrm{call}} - 1$, and $\Gamma$ and vega, which differentiate a quantity that parity says is independent of $\sigma$ and of $S$ in the second derivative, agree for call and put.
:::

The cancellation $S n(d_1) = K e^{-rT} n(d_2)$ is the reason the formulas are short. It is also the reason a finite-difference bump in $S$ of size $1$ already recovers delta to three decimals on the house numbers, as the next chapter checks.

:::example House-number Greeks {#ex-house-greeks}
$S = K = 100$, $r = 0.05$, $q = 0$, $\sigma = 0.20$, $T = 1$, so $d_1 = 0.35$, $d_2 = 0.15$, $C = 10.4506$. Compute $\Delta$, $\Gamma$, vega per percent, theta per year and per day, and rho per percent, for the call. Then $\Delta$ of the corresponding put.
:::solution
$N(0.35) = 0.63683$, so $\Delta_{\mathrm{call}} = 0.6368$ to four decimals. $n(0.35) = 0.37524$, so

$$
\Gamma = \frac{0.37524}{100 \times 0.20 \times 1} = 0.01876,\qquad
\nu = 100 \times 0.37524 \times 1 = 37.524
$$

per unit of $\sigma$, or $0.3752$ per volatility point. Theta:

$$
\Theta_{\mathrm{call}} = -\frac{100 \times 0.37524 \times 0.20}{2} - 0.05 \times 100 e^{-0.05} \times 0.55962 = -3.752 - 2.662 = -6.414
$$

per year, or $-0.0176$ per calendar day. Rho $= 100 \times 1 \times e^{-0.05} \times 0.55962 = 53.232$ per unit of $r$, or $0.532$ per percentage point of $r$. The put's delta is $0.6368 - 1 = -0.3632$. A one-point rise in $S$ raises the call by about $0.64$ and the put by about $-0.36$, to first order. These are partials of a formula, not a forecast of those rises.
:::
:::

:::example A one-point bump {#ex-bump}
The same call, recomputed at $S = 101$ and $S = 99$ by the Black–Scholes formula, is worth $11.0967$ and $9.8232$. Recover delta and gamma from the three-point stencil, and compare with [[#ex-house-greeks]].
:::solution
$$
\Delta_{\mathrm{fd}} = \frac{11.0967 - 9.8232}{2} = 0.63675,\qquad
\Gamma_{\mathrm{fd}} = 11.0967 - 2\times 10.4506 + 9.8232 = 0.01876.
$$

The closed forms were $0.63683$ and $0.01876$. A one-dollar bump on a $100$ underlying is already a fine approximation here because the fourth derivative is not large. The stencil is the definition of the Greek on a tree or a Monte Carlo, where no closed form exists.
:::
:::

:::widget plot
f: 0.5*(1+erf(((ln(x/100)+(0.05+0.5*0.04)*1)/(0.2))/sqrt(2))); 20*exp(-((ln(x/100)+0.07)/0.2)^2/2)/sqrt(2*pi)/(x*0.2)
x: 40, 160
y: -0.1, 1.1
labels: \text{call delta}; \text{20 times gamma}
caption: Black–Scholes call delta $N(d_1)$ and $20$ times gamma against $S$, for the house numbers. Delta climbs from $0$ to $1$; gamma peaks near the strike (the factor $20$ is only for scale). A hedge that matched delta at $S = 100$ is already unmatched at $S = 110$, by about $0.13$. The curves are partials of a formula, not a path.
:::

:::definition Delta-neutral and gamma-neutral {#def-neutral}
A book is **delta-neutral** if $\sum_i n_i \Delta_i = 0$ and **gamma-neutral** if $\sum_i n_i \Gamma_i = 0$, with $n_i$ the signed number of contracts of type $i$. Shares have $\Gamma = 0$, so gamma-neutrality requires a second option. Each neutrality is a statement in a named model: a book that is delta-neutral in Black–Scholes need not be delta-neutral in a jump model, because the two models do not share a $\Delta$.
:::

## The PDE as a Greek identity

The Black–Scholes PDE of [[derivatives/black-scholes#eq-pde]], with $q = 0$, is

$$
\Theta + r S \Delta + \tfrac12 \sigma^2 S^2 \Gamma = r V.
$$ {#eq-pde-greeks}

Every European claim in the model satisfies it. The left-hand side is the drift of a delta-hedged portfolio; the right-hand side says that drift must be $r$ times the portfolio's value. Rearranged, theta is whatever it has to be to make the identity hold:

$$
\Theta = r V - r S \Delta - \tfrac12 \sigma^2 S^2 \Gamma.
$$

A long call has $\Gamma > 0$, so the last term is a drag on theta: the call loses time value, and it loses more of it when gamma is large (near the strike, near expiry). A short call has the opposite sign: positive theta, negative gamma. There is no free lunch in the identity. You cannot be long gamma and long theta in this model at the same time, for a single vanilla.

:::example The identity on the house call {#ex-pde-check}
Insert the house-number Greeks into the left-hand side of [[#eq-pde-greeks]] and compare with $r C$.
:::solution
$\Theta = -6.414$, $r S \Delta = 0.05 \times 100 \times 0.63683 = 3.184$, $\tfrac12 \sigma^2 S^2 \Gamma = 0.5 \times 0.04 \times 10000 \times 0.018762 = 3.752$. Sum: $-6.414 + 3.184 + 3.752 = 0.522$. And $r C = 0.05 \times 10.4506 = 0.5225$. The two sides match to the rounding of theta. The identity is a check on a set of Greeks, and it is the reason a quoted set that fails it cannot have come from this formula.
:::
:::

:::intuition Delta is a probability, gamma is a density
With $q = 0$, $\Delta_{\mathrm{call}} = N(d_1)$ is the share-numeraire probability that the call finishes in the money, and $\Gamma = n(d_1)/(S\sigma\sqrt{T})$ is that density, converted from $d_1$ to $S$. A hedge that is long one call and short $N(d_1)$ shares is, to first order, the difference between a digital-in-the-share-measure and a holding of the share. Gamma is large where that probability is moving fastest, which is near the strike when $T$ is small. That is why a short-dated at-the-money option is the usual source of gamma, and why a discrete hedge of it is most at risk on a large move.
:::

:::quiz
A European call and a European put with the same $K$ and $T$ in the Black–Scholes model have
- [ ] the same delta and the same gamma
- [x] the same gamma and the same vega, but deltas that differ by $1$
- [ ] the same theta
- [ ] Greeks that cannot be compared because puts and calls are different contracts
:::solution
Parity $P = C - S + K e^{-rT}$ (for $q = 0$) differentiates to $\Delta_P = \Delta_C - 1$, $\Gamma_P = \Gamma_C$, $\nu_P = \nu_C$. Thetas differ by the theta of the forward, $-r K e^{-rT}$. The contracts are different; their second $S$-derivatives and their $\sigma$-derivatives are not.
:::
:::

## Discrete delta-hedging

In the model, the writer of a call holds $\Delta$ shares and borrows, and rebalances continuously. In a market, rebalancing is discrete. Between rebalances the writer's P&amp;L is, to second order,

$$
\Delta\Pi \approx \tfrac12 \Gamma\, (\Delta S)^2 + \Theta\, \Delta t
$$ {#eq-gamma-theta}

plus the financing of the hedge at $r$. The Black–Scholes identity says that if $(\Delta S)^2$ realises at $\sigma^2 S^2 \Delta t$, the two terms cancel against $r V \Delta t$ and the hedge breaks even. If the realised move is *larger* than $\sigma\sqrt{\Delta t}\, S$, the $(\Delta S)^2$ term wins: a long-gamma position profits, a short-gamma position loses. If the realised move is smaller, theta wins. That is the whole of “selling options is collecting theta and paying gamma”, as a second-order story in this model.

It is a story about one step. A jump, a moving $\sigma$, a bid–ask on the rebalance, and a $\Delta$ computed from the wrong $\sigma$ each add a term that [[#eq-gamma-theta]] does not contain. The 1987 crash, the 1998 LTCM book, and several desks in 2008 were, among other things, short-gamma positions on moves that the $\sigma$ in the formula had not funded.

:::example One day, two realised moves {#ex-one-day}
The house-number call, $\Delta = 0.6368$, $\Gamma = 0.01876$, $\Theta = -6.414$ per year. A writer is short one call and long $0.6368$ shares, rebalanced at the start of the day. Ignore financing. Compare the second-order P&amp;L [[#eq-gamma-theta]] of the *writer* (so signs flip) on a day when $S$ moves by $+1$ and on a day when $S$ moves by $+4$. Take $\Delta t = 1/365$.
:::solution
Theta's contribution for the writer is $+6.414/365 = +0.0176$. Gamma's contribution for the writer is $-\tfrac12 \times 0.01876 \times (\Delta S)^2$. For $\Delta S = 1$, that is $-0.0094$, and the net second-order P&amp;L is $0.0176 - 0.0094 = +0.0082$. For $\Delta S = 4$, gamma is $-0.0094 \times 16 = -0.150$, and the net is $0.0176 - 0.150 = -0.132$. A one-dollar day is a quiet day relative to $\sigma\sqrt{\Delta t}\, S \approx 1.05$, and the writer collects a little theta. A four-dollar day is not, and the writer pays gamma. The two numbers are a Taylor expansion, not a realised P&amp;L, and they are not a recommendation to write the call.
:::
:::

:::warning Matching delta and calling the position hedged
A position with $\Delta = 0$ still has gamma, vega, theta and rho, and it still has jump risk that no Greek of this list names. “Delta-hedged” is a statement about the first $S$-derivative. It is not a synonym for “riskless”. In the Black–Scholes argument the rest of the risk is cancelled by *continuous* rebalancing plus the assumption of no jumps and constant $\sigma$. Drop any of those, and a zero-delta book is a book of residual risks. Reporting only delta, which some internal dashboards still do, is a compression that [[derivatives/risk-management]] will refuse to treat as a safety certificate.
:::

:::application A book of two options
A model book is long one house-number call and short two calls with $K = 105$, $T = 1$, on the same $S$. The $105$-call has $\Delta = N(0.1060) = 0.5422$ and a smaller gamma. Net delta is $0.6368 - 2\times 0.5422 = -0.4476$. A hedge of the book's delta is a long holding of $0.45$ shares, to first order. Net gamma is not zero: the $100$-strike contributes more gamma per option than the $105$-strike, but there are two of the latter. Computing the net gamma, and then the one-day story of [[#ex-one-day]] for the *book*, is the exercise at the end of the chapter. The book is a numerical object, not a recommended structure.
:::

## Portfolio Greeks

Greeks add, in the model, because differentiation is linear. A book with $n_i$ contracts of type $i$ has $\Delta = \sum n_i \Delta_i$, and similarly for the others. A **delta-neutral** book has $\sum n_i \Delta_i = 0$; a **gamma-neutral** book has $\sum n_i \Gamma_i = 0$. Making a book gamma-neutral typically uses a second option, because shares have $\Gamma = 0$. Making it vega-neutral uses an option on a different maturity or strike, because vega's peak is not at the same place as gamma's. Each extra neutrality is an extra constraint, and each constraint is only as good as the model in which the Greek was computed.

Spot-vol correlation, which stochastic-volatility models name, is outside this addition. A book that is delta-neutral in Black–Scholes can still move when $S$ and $\sigma_{\mathrm{imp}}$ jump together, as index books did in 2008. The repair is a model with two Brownian motions, or a stress that moves $S$ and the smile at once. The five names in [[#def-greeks]] are the first layer, not the last. A desk that matches delta and gamma still has vega, and a desk that matches all five still has jump risk, discrete-hedging error and whatever the $\sigma$ in the formula left out. Adding a Greek is cheap; adding the missing assumption is not.

A numerical check is always available. Recompute $C$ at $S+\varepsilon$ and $S-\varepsilon$ and recover $\Delta$ and $\Gamma$ as in [[#ex-bump]]. Recompute at $\sigma+\varepsilon$ and recover vega. If those difference quotients disagree with [[#eq-greeks]] by more than rounding, the implementation of the formula is wrong, or the bump is too large. The closed forms of this chapter are the test piece for those bumps, which become the *definition* of the Greek once the claim is a barrier or an American put.

## Where this leads

A Greek computed by a bump on a tree or a Monte Carlo is the same object when the closed form is missing: [[derivatives/numerical-methods]]. A book whose Greeks have been matched still has a loss distribution, and that distribution is the input to [[derivatives/risk-management]]. Credit valuation adjustment in [[derivatives/credit-derivatives]] is a derivative of the same $V$ with respect to a hazard rate, which is a Greek the five names do not list. The PDE identity remains the check that a set of Black–Scholes Greeks is internally consistent.

:::history
**1973, and the names that came later.** The partial $\partial C/\partial S$ is already in Black and Scholes (1973) and in Merton (1973): it is the hedge ratio. The shop-floor names “gamma, vega, theta, rho” accumulated in option desks through the 1980s; “vega” is not a Greek letter (nu is the usual mathematical name). Taleb's *Dynamic Hedging* (1997) is a practitioner's account of discrete rebalancing and of the gap between a Greek and a P&amp;L. The identity [[#eq-pde-greeks]] is the 1973 PDE, rewritten in desk vocabulary. The vocabulary did not add a new theorem; it gave the theorem names one can shout across a floor.
:::

:::summary
- Delta $\Delta = N(d_1)$ for a $q = 0$ call; gamma $\Gamma = n(d_1)/(S\sigma\sqrt{T})$; vega $\nu = S n(d_1)\sqrt{T}$; theta and rho as in [[#eq-greeks]].
- House-number call: $\Delta = 0.6368$, $\Gamma = 0.01876$, vega $= 0.375$ per percent, $\Theta = -6.414$ per year, rho $= 0.532$ per percent of $r$.
- The PDE is $\Theta + r S \Delta + \tfrac12 \sigma^2 S^2 \Gamma = r V$. Long gamma is short theta in this model.
- A discrete delta-hedge leaves a P&amp;L $\tfrac12 \Gamma (\Delta S)^2 + \Theta \Delta t$. Quiet days pay the long-gamma holder negative theta; large days reverse the sign.
- “Delta-hedged” is a first-order statement. Jumps, a moving $\sigma$, costs and a wrong $\sigma$ in the formula are outside it.
:::

## Exercises

:::exercise Call delta {level=1 check="0.6368"}
House numbers, $d_1 = 0.35$. Enter the call delta to four decimals.
:::solution
$N(0.35) = 0.6368$ to four decimals, [[#ex-house-greeks]].
:::
:::

:::exercise Put delta {level=1 check="-0.3632"}
Enter the corresponding put delta to four decimals.
:::solution
$N(d_1) - 1 = 0.6368 - 1 = -0.3632$.
:::
:::

:::exercise Gamma {level=1 check="0.01876"}
$n(0.35) = 0.37524$, $S = 100$, $\sigma = 0.20$, $T = 1$. Enter gamma to five decimals.
:::solution
$\Gamma = 0.37524 / (100 \times 0.20) = 0.01876$, [[#ex-house-greeks]].
:::
:::

:::exercise Vega per percent {level=2 check="0.3752"}
Enter vega per volatility point (per $0.01$ of $\sigma$) to four decimals.
:::solution
$S n(d_1)\sqrt{T} / 100 = 37.524 / 100 = 0.3752$, [[#ex-house-greeks]]. A one-point rise in $\sigma$, from $0.20$ to $0.21$, raises $C$ by about $0.375$.
:::
:::

:::exercise PDE check {level=2 check="0.522"}
Using $\Theta = -6.414$, $r S \Delta = 3.184$, $\tfrac12 \sigma^2 S^2 \Gamma = 3.752$, enter the left-hand side of [[#eq-pde-greeks]] to three decimals.
:::solution
$-6.414 + 3.184 + 3.752 = 0.522$, matching $r C$, [[#ex-pde-check]].
:::
:::

:::exercise Quiet versus loud day {level=2 check="-0.132"}
From [[#ex-one-day]], enter the writer's second-order P&amp;L on the $\Delta S = 4$ day, to three decimals (include the minus sign).
:::solution
$+0.0176 - \tfrac12 \times 0.01876 \times 16 = 0.0176 - 0.1501 = -0.132$. The quiet $\Delta S = 1$ day was $+0.008$.
:::
:::

:::exercise Finite-difference delta {level=3}
Using $C(101) = 11.0967$, $C(99) = 9.8232$, compute the central-difference delta and its error against $N(0.35) = 0.636831$. Then, using also $C(100) = 10.4506$, compute the second-difference gamma and its error against $0.018762$.
:::hint
Central delta is $(C(S+h)-C(S-h))/(2h)$ with $h = 1$. Gamma is $(C(S+h) - 2C(S) + C(S-h))/h^2$.
:::
:::solution
$\Delta_{\mathrm{fd}} = (11.0967-9.8232)/2 = 0.63675$, error $0.63675 - 0.636831 = -0.00008$. $\Gamma_{\mathrm{fd}} = 11.0967 - 2\times 10.4506 + 9.8232 = 0.0187$, or more precisely $11.0967 + 9.8232 - 20.9012 = 0.0187$; with the unrounded values of [[#ex-bump]], $\Gamma_{\mathrm{fd}} = 0.01876$ and the error is in the sixth decimal. A one-dollar bump is a small $h$ relative to $S = 100$. On a tree with a $10\%$ move per step, $h$ is no longer small and the difference quotient is a different object, still called delta, with a larger bias.
:::
:::

:::exercise Net gamma of the two-option book {level=3}
The $K = 105$ call of [[derivatives/black-scholes#ex-bs-105]] has $d_1 = 0.10605$, so $n(d_1) = n(0.10605) = 0.3967$. Compute its gamma, then the net gamma of a book that is long one $K = 100$ call ($\Gamma = 0.01876$) and short two $K = 105$ calls, on $S = 100$, $\sigma = 0.20$, $T = 1$. Interpret the sign for the one-day story.
:::hint
$\Gamma = n(d_1)/(S\sigma\sqrt{T})$ for each call. Net $\Gamma = 1 \times \Gamma_{100} - 2 \times \Gamma_{105}$.
:::
:::solution
$\Gamma_{105} = 0.3967 / (100 \times 0.20 \times 1) = 0.019835$. Net gamma $= 0.01876 - 2\times 0.019835 = 0.01876 - 0.03967 = -0.02091$. The book is *short* gamma, even though it is long one option and short two of a different strike: the two $105$-calls contribute more gamma in total than the one $100$-call. On a loud day the second-order story of [[#eq-gamma-theta]] has the same sign as a short call. On a quiet day the book collects theta (the two short options contribute more positive theta than the long option contributes negative, typically, though that comparison needs the two thetas and is not forced by the gamma sign alone — except through the PDE, once deltas are hedged). The book is a numerical illustration of adding Greeks, not a structure to put on.
:::
:::
