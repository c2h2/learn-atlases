The binomial table of the previous chapter approached $10.451$ as the number of steps grew. That limit has a closed form, the **Black–Scholes–Merton formula**, obtained in 1973 by a hedging argument rather than by counting trees. This chapter writes the formula, names the assumptions that produce it, derives it in outline from the tree and from a PDE, and introduces **implied volatility**: the $\sigma$ that makes the formula match a quote. The house numbers $S = 100$, $K = 100$, $r = 0.05$, $\sigma = 0.20$, $T = 1$ give a call of $10.4506$ and a put of $5.5735$. Those are model values. They are not quotes, and they are not a forecast of $S_T$.

The formula is a model. Lognormal prices, a constant $\sigma$, no jumps, continuous frictionless hedging, a constant $r$, and European exercise are assumptions, not properties of every market. Implied volatility is the number that absorbs the failure of those assumptions into a single residual. Treating that residual as a promised $\sigma$ for the next year is the usual over-reading.

Throughout, $N(x)$ is the standard normal cumulative distribution function and $n(x) = N'(x)$ is its density. Rates are continuously compounded. The asset pays a continuous yield $q$, often zero.

## Lognormal prices

:::definition Geometric Brownian motion {#def-gbm}
The underlying is said to follow **geometric Brownian motion** if

$$
\frac{\mathrm{d}S}{S} = \mu\,\mathrm{d}t + \sigma\,\mathrm{d}W
$$ {#eq-gbm}

in the physical measure, with constant drift $\mu$, constant volatility $\sigma > 0$, and $W$ a Brownian motion. Equivalently, $\ln S_T$ is normal with mean $\ln S_0 + (\mu - \tfrac12\sigma^2)T$ and variance $\sigma^2 T$. Under the risk-neutral measure the same $S$ has $\mu$ replaced by $r-q$.
:::

The $-\tfrac12\sigma^2$ in the mean of $\ln S$ is Itô's correction: the median of $S_T$ is $S_0 e^{(\mu-\sigma^2/2)T}$, below the mean $S_0 e^{\mu T}$. With the house numbers under $Q$ (so $\mu = r = 0.05$), the mean of $S_1$ is $100 e^{0.05} = 105.127$ and the median is $100 e^{0.05-0.02} = 103.045$. A symmetric fan on a log scale is a right-skewed fan on the price scale. There are no jumps: in any finite time the path of $S$ is continuous. That is an assumption. Equity index paths around 19 October 1987, and many single-name paths around earnings, are not continuous in the sense the model needs.

:::example Mean, median and a probability {#ex-lognormal}
Under $Q$, $S_0 = 100$, $r = 0.05$, $q = 0$, $\sigma = 0.20$, $T = 1$. Compute $\E^Q[S_1]$, the median of $S_1$, and $Q(S_1 > 100)$.
:::solution
$\E^Q[S_1] = 100 e^{0.05} = 105.127$. The median is $100 e^{0.03} = 103.045$. For the probability,

$$
Q(S_1 > 100) = Q\bigl(\ln S_1 > \ln 100\bigr) = N(d_2),
$$

where $d_2$ is defined in [[#thm-bs]] below and equals $0.15$ on these numbers, so $N(0.15) = 0.5596$. More than half the risk-neutral mass sits above $100$, because the mean is $105.127$. This $0.56$ is a risk-neutral probability, not a physical forecast of how often the share will close above $100$.
:::
:::

## The formula

:::theorem Black–Scholes–Merton formula {#thm-bs}
Assume: $S$ follows [[#eq-gbm]] with constant $\sigma$; the continuous rate $r$ and yield $q$ are constant; there are no transaction costs, no restrictions on short sales, and trading is continuous; the claim is European. Then the call and put prices are

$$
C = S e^{-qT} N(d_1) - K e^{-rT} N(d_2),
$$ {#eq-call}

$$
P = K e^{-rT} N(-d_2) - S e^{-qT} N(-d_1),
$$ {#eq-put}

with

$$
d_1 = \frac{\ln(S/K) + (r-q+\tfrac12\sigma^2)T}{\sigma\sqrt{T}},\qquad d_2 = d_1 - \sigma\sqrt{T}.
$$ {#eq-d1d2}

The pair satisfies put–call parity [[derivatives/options#thm-parity]].
:::

:::proof
*From the tree.* [[derivatives/binomial-model#prop-limit]] sends the CRR discounted expectation to $\E^Q\bigl[e^{-rT}\max(S_T-K,0)\bigr]$. Under $Q$, $\ln S_T$ is normal with mean $\ln S + (r-q-\sigma^2/2)T$ and variance $\sigma^2 T$. Split the expectation into $S_T N(\,\cdot\,)$ and $K N(\,\cdot\,)$ pieces by completing the indicator $S_T > K$; the two thresholds are $d_1$ and $d_2$, and the $S_T$ piece picks up the extra $\sigma\sqrt{T}$ in the mean, which is the change of measure from $Q$ to the share-numeraire measure. The algebra is the same as evaluating a lognormal integral and is omitted; the result is [[#eq-call]]. The put is then parity, or the same integral on $\max(K-S_T,0)$.

*From the hedge.* Let $V(S,t)$ be the option value. A portfolio long the option and short $\Delta = \partial V/\partial S$ units of the asset (financed at $r$, with the yield $q$ paid on the short) is instantaneously riskless if $\Delta$ is the partial, because the $\mathrm{d}W$ terms cancel by Itô's formula. A riskless portfolio must earn $r$, and that identity rearranges to the **Black–Scholes PDE**

$$
\frac{\partial V}{\partial t} + (r-q)S \frac{\partial V}{\partial S} + \tfrac12 \sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} = r V,
$$ {#eq-pde}

for $0 < S < \infty$ and $t < T$, with $V(S,T) = \max(S-K,0)$ for a call. The function [[#eq-call]] solves the PDE (direct differentiation, recorded as an exercise) and the terminal condition. Uniqueness for reasonable growth follows from the Feynman–Kac representation, which is the discounted risk-neutral expectation we started with.

Assumptions used in the hedging argument: Itô paths (no jumps), constant $\sigma$, continuous rebalancing at the current $\Delta$ with no costs, and a constant $r$. If any of those fails, the portfolio that the PDE treats as riskless is not riskless.
:::

:::example House-number call and put {#ex-bs-atm}
$S = 100$, $K = 100$, $r = 0.05$, $q = 0$, $\sigma = 0.20$, $T = 1$. Compute $d_1$, $d_2$, $N(d_1)$, $N(d_2)$, $C$ and $P$.
:::solution
$$
d_1 = \frac{\ln 1 + (0.05 + 0.5 \times 0.04)\times 1}{0.20} = \frac{0.07}{0.20} = 0.35,\qquad d_2 = 0.15.
$$

Then $N(0.35) = 0.63683$, $N(0.15) = 0.55962$, and

$$
C = 100 \times 0.63683 - 100 e^{-0.05} \times 0.55962 = 63.683 - 53.232 = 10.451
$$

to three decimals ($10.4506$ unrounded). The put is

$$
P = 100 e^{-0.05} N(-0.15) - 100 N(-0.35) = 95.123 \times 0.44038 - 36.317 = 5.574.
$$

Parity: $C-P = 4.877 = 100 - 95.123$. The one-step tree gave $C = 12.162$; the two-step tree $9.541$; one hundred steps $10.431$. The formula is the limit those trees were climbing toward.
:::
:::

:::example A $105$ strike {#ex-bs-105}
The same $S, r, \sigma, T$, with $K = 105$. Compute $d_1$, $d_2$ and $C$.
:::solution
$d_1 = (\ln(100/105) + 0.07)/0.20 = (-0.04879 + 0.07)/0.20 = 0.10605$, $d_2 = -0.09395$. Then $N(d_1) = 0.54223$, $N(d_2) = 0.46257$, and

$$
C = 100\times 0.54223 - 105 e^{-0.05}\times 0.46257 = 54.223 - 46.202 = 8.021.
$$

The corresponding put, by parity, is $7.900$. Raising the strike by $5$ cut the call by about $2.43$ and raised the put by about $2.33$; the two changes differ by the change in $K e^{-rT}$, as parity says they must.
:::
:::

:::example A quarter-year call {#ex-bs-quarter}
$S = K = 100$, $r = 0.05$, $q = 0$, $\sigma = 0.20$, $T = 0.25$. Compute $C$.
:::solution
$d_1 = (0.05 + 0.02)\times 0.25 / (0.20 \times 0.5) = 0.0175 / 0.10 = 0.175$, $d_2 = 0.075$. Then $N(0.175) = 0.56946$, $N(0.075) = 0.52989$, and

$$
C = 100\times 0.56946 - 100 e^{-0.0125}\times 0.52989 = 56.946 - 52.331 = 4.615.
$$

A shorter maturity on an at-the-money-spot call, with these numbers, more than halves the premium, but not by the factor $\sqrt{1/4} = 1/2$ exactly, because of the drift terms in $d_1$.
:::
:::

:::widget plot
f: x*0.5*(1+erf(((ln(x/k)+(r+0.5*sig^2)*t)/(sig*sqrt(t)))/sqrt(2))) - k*exp(-r*t)*0.5*(1+erf(((ln(x/k)+(r-0.5*sig^2)*t)/(sig*sqrt(t)))/sqrt(2))); max(x-k,0)
sliders: k=100:70:130:1; sig=0.2:0.05:0.6:0.01; r=0.05:0:0.1:0.005; t=1:0.05:2:0.05
x: 40, 160
y: 0, 80
labels: \text{Black--Scholes call}; \text{intrinsic}
caption: The Black–Scholes call against $S$, with sliders for $K$, $\sigma$, $r$ and $T$. Raise $\sigma$ and the curve lifts, especially near the strike; lower $T$ and it falls toward $\max(S-K,0)$. The curve is a model value under the assumptions of [[#thm-bs]], not a quoted smile and not a forecast of $S$.
:::

The widget is the map $S \mapsto C(S)$ at a fixed $t$. Intrinsic $\max(S-K,0)$ is the terminal condition; the model value lies above it by the remaining time value. At $\sigma \to 0$ the curve collapses toward a discounted forward payoff; at $\sigma \to \infty$ it collapses toward $S e^{-qT}$. Both limits are visible, roughly, by pushing the $\sigma$ slider.

## What the assumptions rule out

Four failures, each enough to break the hedge that the PDE treats as instantaneously riskless.

**Jumps.** A discontinuous move in $S$ is a $\mathrm{d}W$ that the Itô table does not contain. The $\Delta$-hedged portfolio that cancelled the Brownian piece does not cancel a jump. Merton (1976) added Poisson jumps and obtained a mix of Black–Scholes formulas; the mix is no longer a complete-market price, because jump risk cannot be hedged with $S$ and cash alone.

**Stochastic volatility.** If $\sigma$ is itself a process, a hedge in $S$ and cash does not cancel the $\mathrm{d}W$ that drives $\sigma$. One extra traded option, or an assumption that volatility risk is not priced, is needed. The market's way of announcing this failure is a **volatility smile**: implied $\sigma$ that varies with $K$ and $T$.

**Discrete hedging and costs.** The PDE's hedge is rebalanced continuously. A desk that rebalances daily, or that pays a bid–ask on each rebalance, holds a residual gamma P&amp;L, treated in [[derivatives/greeks-and-hedging]]. Leland (1985) and others have adjusted $\sigma$ for proportional costs; the adjustment is a different model, not a footnote.

**Rates and dividends.** A stochastic $r$ makes the numeraire itself random; Black's (1976) futures-options formula is the usual repair when a futures is the underlying. A discrete dividend, as in [[derivatives/forwards-and-futures#ex-discrete-div]], is subtracted from $S$ before the formula is applied to the prepaid forward, with care around American exercise.

:::quiz
On the house numbers, $d_2 = 0.15$ and $N(d_2) = 0.5596$. This number is
- [ ] the physical probability that $S_1 > 100$
- [x] the risk-neutral probability $Q(S_1 > 100)$, and the cash-or-nothing factor in the call
- [ ] the call's delta
- [ ] a forecast that the share will close above $100$ on $56\%$ of days
:::solution
$N(d_2) = Q(S_T > K)$. The call's delta, with $q = 0$, is $N(d_1) = 0.6368$, a different number (the share-numeraire probability). Neither is $P(S_T > K)$, and neither is a forecast.
:::
:::

:::warning Reading $N(d_2)$ as a physical probability
$N(d_2)$ is $Q(S_T > K)$, the risk-neutral chance the call finishes in the money. $N(d_1)$ is the share-numeraire probability of the same event, and it is also the call's delta when $q = 0$. Neither number is the physical probability $P(S_T > K)$. Replacing $N(d_2)$ by a historical frequency of in-the-money closes, and calling the result a Black–Scholes price, is the same error as replacing $p^*$ by a historical $p$ on the tree. The formula is a replicating cost, not a forecast.
:::

:::intuition Two terms, two numéraires
The call is $e^{-qT} S\, N(d_1)$ minus $e^{-rT} K\, N(d_2)$. The first term is the share-numeraire value of receiving the share when it finishes in the money; the second is the cash-numeraire value of paying the strike in that event. Digital (cash-or-nothing) calls isolate the second term: a contract that pays $1$ if $S_T > K$ is worth $e^{-rT} N(d_2)$. Asset-or-nothing calls isolate the first. The vanilla call is the difference, which is why $d_1$ and $d_2$ both appear.
:::

## Implied volatility

:::definition Implied volatility {#def-iv}
Given a quoted European call (or put) price $C^{\mathrm{mkt}}$, and given $S, K, r, q, T$, the **implied volatility** is the number $\sigma_{\mathrm{imp}} > 0$ that solves $C_{\mathrm{BS}}(S,K,r,q,T,\sigma_{\mathrm{imp}}) = C^{\mathrm{mkt}}$, when a solution exists. It is unique when it exists, because $C_{\mathrm{BS}}$ is strictly increasing in $\sigma$ (the vega, computed in the next chapter, is positive).
:::

Implied volatility is a *change of units*: from a price to the $\sigma$ that the formula would have needed. If the assumptions of [[#thm-bs]] held, $\sigma_{\mathrm{imp}}$ would be the same for every $K$ and $T$ and equal to the $\sigma$ in [[#eq-gbm]]. In listed equity-index options it is not the same: it smiles, and the smile moves. Reporting a single “the” implied volatility of an index is already a compression.

Newton's method finds $\sigma_{\mathrm{imp}}$ from a starting guess $\sigma_0$ by

$$
\sigma_{n+1} = \sigma_n - \frac{C_{\mathrm{BS}}(\sigma_n) - C^{\mathrm{mkt}}}{\partial C_{\mathrm{BS}} / \partial \sigma}.
$$

The denominator is vega. With a sensible starting guess (for example $0.20$) the iteration is typically finished in a handful of steps.

:::example Implied volatility of an $11$ call {#ex-iv}
$S = K = 100$, $r = 0.05$, $q = 0$, $T = 1$, and an illustrative quoted call of $11.00$. Starting from $\sigma_0 = 0.20$, run two Newton steps. Report $\sigma_{\mathrm{imp}}$ to four decimals.
:::solution
At $\sigma = 0.20$, $C = 10.4506$ and vega $= \partial C/\partial\sigma = 37.524$ (per unit of $\sigma$, not per percent). The first step is

$$
\sigma_1 = 0.20 - \frac{10.4506 - 11.00}{37.524} = 0.20 + \frac{0.5494}{37.524} = 0.21464.
$$

At $\sigma = 0.21464$, $C = 11.0010$ and vega $= 37.650$. The second step moves $\sigma$ by $-0.0010/37.650 \approx -0.00003$, to $0.21462$. The implied volatility is $0.2146$ to four decimals, or $21.46\%$. The quoted $11.00$ is $0.55$ above the $\sigma = 0.20$ model value; vega converts that gap into $1.46$ volatility points. The $11.00$ is an illustrative quote, not a market, and $21.46\%$ is not a forecast of realised $\sigma$.
:::
:::

:::widget newton
f: 100*0.5*(1+erf(((0.05+0.5*x^2)/x)/sqrt(2))) - 100*exp(-0.05)*0.5*(1+erf(((0.05-0.5*x^2)/x)/sqrt(2))) - 11
x0: 0.2
x: 0.05, 0.5
y: -6, 8
caption: Newton for implied volatility: the function is $C_{\mathrm{BS}}(\sigma) - 11$ on the house numbers, with $x = \sigma$. Start at $0.20$ and step. The root is $0.2146$, matching [[#ex-iv]]. The picture solves a model equation for an illustrative quote; it is not a forecast.
:::

## Evidence

The formula became a quoting convention as much as a pricing theory. Listed option markets report implied volatilities, and dealers communicate a smile, not a single $\sigma$. Two empirical regularities, both incompatible with a constant-$\sigma$ geometric Brownian motion, are standard.

The **volatility smile** (equity indices: a skew, with higher $\sigma_{\mathrm{imp}}$ at low $K$) has been a standing feature of index options since 1987. Rubinstein (1994) and subsequent option-implied density papers document it; the post-crash demand for out-of-the-money puts is the usual narrative, and a jumps-and-stochastic-vol model is the usual repair. The **term structure** of $\sigma_{\mathrm{imp}}$ is not flat either. Neither regularity is a theorem; both are descriptions of quotes, dated to the market and the day.

Realised volatility of equity indices is itself a process — clustered, mean-reverting, with jumps in $\sigma$ as well as in $S$ — which is why [[time-series]] courses teach GARCH and why the next-but-one chapter's vega exists. Black–Scholes remains the first formula one computes, and implied volatility remains the first number one quotes, because a common unit of account is useful even when the unit's model is false.

Exchange-traded option volume is concentrated in a handful of venues: the CBOE for US-listed equity options (from 26 April 1973, as in [[derivatives/options]]), Eurex for European index options, the National Stock Exchange of India for Nifty and single-name options, and the Korea Exchange, which for years led the world in listed option volume on the KOSPI 200. OTC FX and interest-rate options sit in the BIS statistics already cited. The formula is used on all of these underlyings, with the repairs (Black 76, Garman–Kohlhagen, swaption Black) that the underlying demands.

## Where this leads

The partial derivatives of [[#eq-call]] are the **Greeks**, and they are the recipe for the hedge that the PDE assumed could be run continuously: [[derivatives/greeks-and-hedging]]. When the formula does not apply — American puts, barriers, Asians — [[derivatives/numerical-methods]] returns to trees, grids and simulation. Implied volatility as a surface is the input to those methods as often as $\sigma$ is. The formula itself is not retired by its failures; it is the unit in which the failures are quoted.

:::history
**1973, Black, Scholes and Merton.** Fischer Black and Myron Scholes, “The Pricing of Options and Corporate Liabilities”, *Journal of Political Economy* 81(3), May–June 1973, pages 637–654. Robert C. Merton, “Theory of Rational Option Pricing”, *Bell Journal of Economics and Management Science* 4(1), Spring 1973, pages 141–183. The CBOE had opened on 26 April 1973; the two events were contemporaneous, not a joint project. The 1997 Nobel citation named Merton and Scholes; Black had died in 1995. The hedging argument, the PDE, and the formula are the 1973 contribution. The binomial proof that the formula is a tree limit is the 1979 contribution of Cox, Ross and Rubinstein.
:::

:::summary
- Geometric Brownian motion makes $\ln S_T$ normal. Under $Q$, $\E[S_T] = S e^{(r-q)T}$ and the median is $S e^{(r-q-\sigma^2/2)T}$. There are no jumps in the model.
- The Black–Scholes–Merton call is $S e^{-qT} N(d_1) - K e^{-rT} N(d_2)$, with $d_1, d_2$ as in [[#eq-d1d2]]. The put follows by parity.
- House numbers $S = K = 100$, $r = 0.05$, $\sigma = 0.20$, $T = 1$: $d_1 = 0.35$, $d_2 = 0.15$, $C = 10.451$, $P = 5.574$.
- Assumptions: constant $\sigma$, lognormal (no jumps), continuous frictionless hedging, constant $r$, European exercise. Each has a documented failure in markets.
- Implied volatility is the $\sigma$ that matches a quote. An illustrative $11.00$ call implies $\sigma_{\mathrm{imp}} = 0.2146$ on the house numbers. A smile is evidence against a single $\sigma$, not a forecast of realised vol.
:::

## Exercises

:::exercise Compute $d_1$ {level=1 check="0.35"}
$S = K = 100$, $r = 0.05$, $q = 0$, $\sigma = 0.20$, $T = 1$. Enter $d_1$.
:::solution
$d_1 = (0.05 + 0.5\times 0.04)/0.20 = 0.07/0.20 = 0.35$, [[#ex-bs-atm]].
:::
:::

:::exercise Compute $d_2$ {level=1 check="0.15"}
On the same numbers, enter $d_2$.
:::solution
$d_2 = d_1 - \sigma\sqrt{T} = 0.35 - 0.20 = 0.15$.
:::
:::

:::exercise The call {level=1 check="10.451"}
Enter the house-number Black–Scholes call to three decimals.
:::solution
$C = 100 N(0.35) - 100 e^{-0.05} N(0.15) = 10.451$ to three decimals, [[#ex-bs-atm]].
:::
:::

:::exercise The put via parity {level=2 check="5.574"}
Using $C = 10.4506$ and $S - K e^{-rT} = 4.8771$, enter $P$ to three decimals.
:::solution
$P = C - (S - Ke^{-rT}) = 10.4506 - 4.8771 = 5.5735$, which is $5.574$ to three decimals.
:::
:::

:::exercise Quarter-year call {level=2 check="4.615"}
$S = K = 100$, $r = 0.05$, $\sigma = 0.20$, $T = 0.25$. Enter $C$ to three decimals.
:::solution
$d_1 = 0.175$, $d_2 = 0.075$, $C = 4.615$, [[#ex-bs-quarter]].
:::
:::

:::exercise One Newton step {level=2 check="0.2146"}
From $\sigma_0 = 0.20$, $C = 10.4506$, vega $= 37.524$, $C^{\mathrm{mkt}} = 11.00$, enter $\sigma_1$ to four decimals.
:::solution
$\sigma_1 = 0.20 - (10.4506-11)/37.524 = 0.2146$ to four decimals, [[#ex-iv]]. A second step does not change the four-decimal figure.
:::
:::

:::exercise Cash-or-nothing {level=3 check="0.5323"}
A cash-or-nothing call pays $1$ at $T$ if $S_T > K$ and $0$ otherwise. Under the assumptions of [[#thm-bs]], with $q = 0$, write its price in terms of $d_2$, and with the house numbers enter that price to four decimals.
:::hint
The vanilla call is $S N(d_1) - K e^{-rT} N(d_2)$. The second term is $K$ cash-or-nothings.
:::
:::solution
The price is $e^{-rT} N(d_2)$. With the house numbers, $e^{-0.05} N(0.15) = 0.951229 \times 0.559618 = 0.5323$ to four decimals. ($K$ cash-or-nothings are worth $K e^{-rT} N(d_2) = 53.232$, which is the second term of the vanilla call.) A physical frequency of in-the-money closes is not a substitute for $N(d_2)$.
:::
:::

:::exercise Which assumption failed {level=3}
A $\Delta$-hedged written call, rebalanced once a day, loses money on a day when $S$ jumps $8\%$ at the open and then drifts. The implied volatility smile on the same underlying is downward sloping in $K$. For each of the four assumptions listed after [[#thm-bs]] (no jumps; constant $\sigma$; continuous hedging; constant $r$), say whether the day's P&amp;L, the smile, both, or neither, is evidence against it.
:::hint
A smile is a cross-section of quotes. A jump is a path.
:::
:::solution
No jumps: the $8\%$ open is a jump (or a move too fast for daily $\Delta$ to track). Evidence against the assumption, from the path. Constant $\sigma$: a downward-sloping smile is a cross-section of $\sigma_{\mathrm{imp}}(K)$ and is evidence against a single $\sigma$; the day's P&amp;L is not, by itself, evidence about the smile. Continuous hedging: daily rebalancing is a discrete hedge; the residual on a quiet Brownian day would already be a gamma error, and a jump makes it larger. The smile does not speak to the rebalancing clock. Constant $r$: neither the jump nor an equity-index smile is, by itself, evidence about $r$; a bond-option smile would be more relevant. The four assumptions fail in different ways, and a single bad day plus a smile does not convict all four equally. The formula can still be the quoting unit on that underlying the next morning.
:::
:::
