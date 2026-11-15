A bond promises coupons and a principal. Sometimes the promise is not kept. **Credit risk** is the risk of that failure: default, a missed payment, a restructuring that the contract names as a credit event. A **credit derivative** is a contract whose payoff is written on that event, or on a spread that moves with the market's view of it. The vanilla instrument is the **credit default swap** (CDS): one side pays a running spread, the other pays a loss-given-default if a named credit event occurs on a named name.

This chapter prices that swap in a reduced-form model with a constant **hazard rate**, relates the hazard to a credit spread on a zero bond, and then describes, without pricing every tranche, how securitisation stacked those risks and how they travelled in 2008. The house numbers are a hazard $\lambda = 0.02$, recovery $R = 0.40$, $r = 0.05$, a five-year CDS. They produce a spread of about $124$ basis points. They are a worked intensity, not a quoted CDS on a particular name, and not a recommendation to buy or sell protection.

## Default as a stopping time

:::definition Hazard rate and recovery {#def-hazard}
A **default time** $\tau$ is a positive random variable. In a **reduced-form** model with a constant **hazard rate** $\lambda > 0$, $\tau$ is exponential: $\Prob(\tau > t) = e^{-\lambda t}$, and $\Prob(t < \tau \le t+\mathrm{d}t \mid \tau > t) = \lambda\,\mathrm{d}t$. **Recovery** $R \in [0,1]$ is the fraction of notional paid at default (or at a stated settlement date) to the holder of the defaulted claim. **Loss given default** is $1-R$.
:::

The structural alternative, Merton (1974), treats default as the first time a firm's asset value falls below a debt barrier. It is a model of *why* $\tau$ occurs. The reduced-form model of this chapter treats $\tau$ as an intensity, calibrated to a spread, and does not explain the firm's balance sheet. Both are models. A constant $\lambda$ is the first reduced-form; a deterministic $\lambda(t)$ and a stochastic intensity are the next ones.

Survival through a date $t$ is $e^{-\lambda t}$. The density of default in a small interval is $\lambda e^{-\lambda t}$. Under risk-neutral pricing, with a constant $r$ independent of $\tau$, a zero-recovery zero-coupon bond of maturity $T$ is worth $e^{-(r+\lambda)T}$: the credit-risky discount is the default-free discount times survival. With recovery $R$ paid at $T$ if default has occurred (a simplifying convention; market CDS assume recovery paid near $\tau$), the zero is worth

$$
e^{-rT}\bigl(e^{-\lambda T} + R(1-e^{-\lambda T})\bigr).
$$ {#eq-risky-zero}

:::proposition Credit spread of a zero {#prop-spread}
Let $P$ be the price of a $T$-year risky zero of face $100$ as in [[#eq-risky-zero]], and let $y = -\frac1T \ln(P/100)$ be its continuous yield. The **credit spread** $s = y - r$ satisfies, for small $\lambda T$ and a recovery paid at $T$,

$$
s \approx \lambda(1-R).
$$ {#eq-spread-approx}

The approximation is exact in the zero-recovery case: $s = \lambda$. Assumptions: constant $r$ and $\lambda$, recovery paid at $T$ rather than at $\tau$, no third state (no restructuring distinct from default).
:::

:::proof
$P/100 = e^{-rT}\bigl(e^{-\lambda T}(1-R) + R\bigr) = e^{-rT}\bigl(1 - (1-R)(1-e^{-\lambda T})\bigr)$. Then $y = r - \frac1T \ln\bigl(1 - (1-R)(1-e^{-\lambda T})\bigr)$. For small $x = (1-R)(1-e^{-\lambda T})$, $-\ln(1-x) \approx x$, and $1-e^{-\lambda T} \approx \lambda T$, so $y - r \approx (1-R)\lambda$. With $R = 0$, $P/100 = e^{-(r+\lambda)T}$ and $s = \lambda$ exactly.
:::

The approximation $s \approx \lambda(1-R)$ is the market's back-of-envelope: a $100$ basis-point spread at $40\%$ recovery is a $1.67\%$ hazard. It is an intensity identity, not a physical default forecast. The $\lambda$ that matches a CDS is a *risk-neutral* hazard; physical default frequencies, from rating-agency tables, are a different number.

:::example A one-year risky zero {#ex-risky-zero}
Face $100$, $r = 0.05$, $\lambda = 0.02$, $R = 0.40$, $T = 1$, recovery paid at $T$. Compute the survival probability, the price, the continuous yield and the spread.
:::solution
Survival $e^{-0.02} = 0.98020$. The price is

$$
e^{-0.05}\bigl(0.98020 \times 100 + (1-0.98020)\times 40\bigr) = 0.951229 \times (98.020 + 0.792) = 93.993.
$$

The continuous yield is $y = -\ln(0.93993) = 0.06195$, and the spread is $y - r = 0.01195$, or about $120$ basis points. The approximation $\lambda(1-R) = 0.02 \times 0.60 = 0.01200$ is $12$ basis points in a thousand, on a one-year zero. The $93.993$ is a model price, not a quoted bond.
:::
:::

:::example Reading a hazard from a spread {#ex-read-lambda}
A one-year credit spread is quoted at $s = 0.018$ (180 basis points) and recovery is taken as $R = 0.40$. Using $s \approx \lambda(1-R)$, compute $\lambda$ and the one-year risk-neutral default probability $1-e^{-\lambda}$.
:::solution
$\lambda \approx 0.018 / 0.60 = 0.030$. Then $1-e^{-0.030} = 0.0296$, about $3.0\%$. The quoted $180$ basis points is not a $1.8\%$ chance of default. With zero recovery the same spread would have meant $\lambda \approx 0.018$ and a $1.8\%$ risk-neutral default probability. Recovery is an input; changing it rescales $\lambda$.
:::
:::

:::quiz
A commentator says: “The name trades at a $120$ basis-point spread, so it has a $1.2\%$ chance of defaulting this year.” What is the precise statement in the model of [[#prop-spread]], with $R = 0.40$?
- [ ] Physical default probability this year is $1.2\%$
- [x] The risk-neutral hazard satisfies $\lambda \approx s/(1-R) = 0.020$, so the one-year risk-neutral default probability is about $1 - e^{-0.02} = 0.0198$
- [ ] Recovery must be zero
- [ ] The name cannot default, because $120$ basis points is small
:::solution
The spread approximates $\lambda(1-R)$, not $\lambda$ and not a physical probability. With $R = 0.40$, $\lambda \approx 0.020$ and the one-year risk-neutral default probability is $1-e^{-0.02} = 0.0198$, about $2\%$, not $1.2\%$. Physical frequencies from rating tables are typically lower than risk-neutral hazards; the difference is a credit-risk premium. The size of $120$ basis points does not make default impossible.
:::
:::

## Credit default swaps

:::definition Credit default swap {#def-cds}
A **credit default swap** of maturity $T$ and notional $N$ has two legs. The **protection buyer** pays a running **spread** $s$ on $N$, at agreed dates, until $\min(\tau, T)$. The **protection seller** pays $N(1-R)$ at $\tau$ if $\tau \le T$, and nothing otherwise. The **par CDS spread** is the $s$ that makes the contract worth zero at inception. A **credit event** is the legal trigger (failure to pay, bankruptcy, and, in some contracts, restructuring) defined in the ISDA definitions.
:::

On a constant-hazard, constant-$r$ strip with annual payments and a mid-period default convention, the two present values are elementary sums.

:::proposition Par CDS spread, constant hazard {#prop-cds}
With annual dates $t_i = i$, $i = 1,\dots,n$, $n = T$, survival $Q_i = e^{-\lambda t_i}$, $Q_0 = 1$, default mass $\delta_i = Q_{i-1}-Q_i$ on $(t_{i-1}, t_i]$, discount $D(t) = e^{-rt}$, and recovery paid at the mid-point of the default interval, the par spread on unit notional is

$$
s = \frac{(1-R)\sum_{i=1}^{n} D(t_i-\tfrac12)\, \delta_i}{\sum_{i=1}^{n} D(t_i)\, Q_i}.
$$ {#eq-cds}

Assumptions: constant $\lambda$ and $r$, no counterparty default, no accrued-premium subtlety beyond the mid-point convention, annual payments, unit notional.
:::

:::proof
The protection leg is the discounted expected loss: each interval contributes $(1-R)$ times the discounted default mass, with discounting at the mid-point as a stand-in for the random $\tau$ inside the year. The premium leg, per unit of spread, is the discounted expected survival at each payment date times the year-fraction $1$. Setting the two legs equal and solving for $s$ gives [[#eq-cds]]. Accrued premium on default, quarterly payments, and a day-count fraction change the sums, not the idea.
:::

:::example Five-year CDS, house numbers {#ex-cds}
$\lambda = 0.02$, $R = 0.40$, $r = 0.05$, $T = 5$, annual payments. Compute the five survival probabilities, the protection-leg value, the premium-leg annuity, and $s$ in basis points.
:::solution
Survivals: $e^{-0.02 i}$ for $i = 1,\dots,5$ equal $0.98020$, $0.96079$, $0.94176$, $0.92312$, $0.90484$. Default masses: $0.01980$, $0.01941$, $0.01902$, $0.01865$, $0.01828$. Discounted protection, with $1-R = 0.60$ and mid-year discounts $e^{-0.05(i-0.5)}$, sums to $0.05062$. The premium annuity $\sum D(t_i) Q_i$ sums to $4.0728$. Then

$$
s = \frac{0.05062}{4.0728} = 0.01243,
$$

or $124$ basis points. The approximation $\lambda(1-R) = 120$ basis points is the zero-bond spread of [[#ex-risky-zero]]; the CDS is a few basis points higher on this strip because of the timing of protection versus premium. The $124$ is a model par spread, not a quoted five-year CDS.
:::
:::

:::widget plot
f: 0.02*(1-x)
x: 0, 0.8
y: 0, 0.03
labels: \text{approx spread}
caption: The back-of-envelope $s \approx \lambda(1-R)$ against recovery $R$, at $\lambda = 0.02$. Raise $R$ along the axis and the implied spread falls. At $R = 0.40$ the line is at $0.012$. The five-year CDS of [[#ex-cds]] sat at $0.01243$. The line is an intensity identity, not a quoted recovery or a forecast of default.
:::

A second widget is the rating-transition picture: default is one absorbing state among several ratings.

:::widget markov
matrix: 0.90,0.08,0.02; 0.05,0.90,0.05; 0,0,1
states: A; B; D
start: 0
steps: 20
caption: A toy three-state chain: ratings A and B, and absorbing default D. Step the chain. The mass in D accumulates; that accumulation is a discrete hazard. The numbers are a teaching matrix, not a rating-agency one-year table (those tables, published by Moody's and S&P, are physical frequencies, dated, and not $Q$-hazards).
:::

:::example Accrued premium, in one number {#ex-accrued}
On the five-year house CDS, suppose default occurs at $t = 0.5$, just before the first annual premium date, with $s = 0.01243$ and unit notional. If the contract pays accrued premium, the protection buyer owes $\tfrac12 s = 0.006215$ at default, which is subtracted from the $(1-R) = 0.60$ protection payment. Compute the net payment from seller to buyer at $t = 0.5$.
:::solution
Net payment is $0.60 - 0.006215 = 0.5938$ per unit of notional. Accrued premium is a few basis points of notional; it is not a reason to ignore the $0.60$. Quarterly payments, the usual market convention, make the typical accrual even smaller (a quarter of $s$). [[#eq-cds]] used a mid-year discount as a stand-in for this timing; it did not subtract the accrual from $1-R$. A full ISDA pricing adds that subtraction and a day-count fraction.
:::
:::

:::warning Treating a CDS as insurance without the legal definition
A CDS is not a property-insurance contract. The protection buyer need not hold the bond (a **naked** CDS). The credit event is a defined legal list, not “the name had a bad year”. Restructuring as a credit event, auction settlement after 2009 ISDA protocols, and cheapest-to-deliver options in physical settlement are all part of the payoff, and they are not in [[#eq-cds]]. Pricing a CDS off $\lambda$ and $R$ and then being surprised by a restructuring event is a gap between the model and the term sheet.
:::

## Securitisation, in outline

A bank, or a special-purpose vehicle, can pool loans or bonds and sell **tranches** of the pool's loss: a junior (equity) tranche takes the first losses, a mezzanine the next, a senior the rest. A **collateralised debt obligation** (CDO) is that stacking, applied to corporate bonds, loans, or — in the 2000s — mortgage-backed securities, including **CDO-squared** structures that re-tranched the mezzanine of other CDOs. A CDS can be the instrument that transfers a name's credit without transferring the bond; a **synthetic** CDO is a stack of CDS.

The pricing of a tranche is a pricing of a slice of the pool's loss distribution. Gaussian copulas, with a single factor and a quoted **base correlation**, became the quoting convention in the 2000s (Li, 2000, is the usual citation). The convention is a model. It does not make the junior tranche safe, and it does not make the senior tranche riskless. Correlation, like implied volatility, is the residual that makes the model match a quote. A rise in correlation, holding marginal default probabilities fixed, *hurts* senior tranches and *helps* (in relative-value terms) junior ones: more of the mass of loss piles into the all-or-nothing states. That comparative static is the one fact this course needs. A full copula implementation is a second course.

:::application AIG and the dealer network, 2008
AIG wrote protection, in large notional, on super-senior tranches of structured credit, treating the positions as remote-loss insurance. When spreads and correlations moved in 2007–08, the marks moved, collateral calls arrived, and the firm's liquidity did not. Lehman Brothers filed for Chapter 11 on 15 September 2008; CDS on Lehman, and the un-cleared dealer web around them, transmitted the credit event through counterparties who had treated each other as default-free. The episode is the leading case for: (i) counterparty risk on a credit derivative is itself a credit derivative; (ii) a AAA label on a senior tranche is a rating, not a hedge; (iii) notional is not risk, but a large notional on a “remote” tail is still a tail. Official support of AIG and the subsequent push to central clearing of CDS are institutional facts (Treasury, Federal Reserve, 2008–09; G20 Pittsburgh, 2009). They are not a verdict on any particular name today.
:::

## Evidence

CDS notional is far below its pre-2008 peak. The BIS reported about USD $11$ trillion of CDS notional outstanding at end-June 2025, against levels of several tens of trillions before 2008 (BIS OTC derivatives statistics; the pre-crisis peak is commonly placed near end-2007). Compression, central clearing, and the shrinking of the structured-credit machine all contributed. Single-name and index CDS (CDX in North America, iTraxx in Europe) remain the liquid quoting instruments for corporate and sovereign credit.

Physical default studies — Moody's and S&P annual default tables, covering US and international corporates, with histories that now include 2008–09 and 2020 — report default frequencies by rating that are *lower*, in ordinary years, than the hazards implied by CDS spreads. The gap is a credit-risk premium plus a liquidity premium plus a jump-to-default premium, and the decomposition is a live empirical literature (Berndt, Douglas, Duffie, Ferguson and Schranz, 2005, and successors). This course records the gap; it does not close it.

Sovereign CDS on emerging-market names, and on some euro-area names after 2010, are a second market. Argentina, Greece, Ukraine, and several others have triggered contracts; the legal arguments over whether a particular restructuring was a credit event are part of the instrument, not an aberration.

## Where this leads

A CDS is a swap whose floating leg is a default; the premium leg is the annuity of [[derivatives/swaps]], with survival in the weights. Counterparty risk on *any* derivative is a credit claim, and CVA is a Greek with respect to a hazard. Portfolio credit, and the copula that binds names, is the input to a credit VaR in [[derivatives/risk-management]]. The reduced-form $\lambda$ of this chapter is the simplest intensity. It is already enough to see that a spread is not a physical probability, and that a senior tranche is not a risk-free bond.

:::history
**1974, Merton.** Robert C. Merton, “On the Pricing of Corporate Debt: The Risk Structure of Interest Rates”, *Journal of Finance* 29(2), 1974, priced default as the exercise of a put on the firm's assets — the structural model. **1990s, reduced form.** Jarrow–Turnbull (1995) and Duffie–Singleton (1999) treated default as an intensity, which is the framework of [[#def-hazard]]. **1990s–2000s, CDS.** ISDA definitions standardised the credit event; dealer CDS became a market. **2008.** Lehman, AIG, and the structured-credit chain made counterparty risk and tranche correlation first-order. The 2009 ISDA Big Bang protocols and the G20 clearing mandate are the institutional sequel.
:::

:::summary
- A constant hazard $\lambda$ gives survival $e^{-\lambda t}$. With recovery $R$, a risky zero's spread satisfies $s \approx \lambda(1-R)$. House numbers $\lambda = 0.02$, $R = 0.40$ give $s \approx 120$ bp and a one-year risky zero at $93.99$.
- A CDS exchanges a running spread for a payment of $1-R$ at default. The par spread is protection over premium annuity. Five-year house numbers: $124$ bp.
- The $\lambda$ in a CDS is risk-neutral. Physical default frequencies from rating tables are a different series.
- Securitisation slices a pool's loss. Correlation, in a copula, is a quoting residual. Senior is not risk-free; junior is not a lottery ticket with a known odds.
- 2008 is the case study for counterparty risk on credit derivatives and for labels (AAA, remote, super-senior) that were not hedges.
:::

## Exercises

:::exercise Survival {level=1 check="0.9802"}
$\lambda = 0.02$, $t = 1$. Enter $e^{-\lambda t}$ to four decimals.
:::solution
$e^{-0.02} = 0.9802$ to four decimals. The one-year risk-neutral default probability is $0.0198$.
:::
:::

:::exercise Spread approximation {level=1 check="0.012"}
$\lambda = 0.02$, $R = 0.40$. Enter $\lambda(1-R)$ to three decimals.
:::solution
$0.02 \times 0.60 = 0.012$, or $120$ basis points, [[#prop-spread]].
:::
:::

:::exercise Risky-zero price {level=1 check="93.993"}
From [[#ex-risky-zero]], enter the one-year risky-zero price to three decimals.
:::solution
$e^{-0.05}(98.020 + 0.792) = 93.993$.
:::
:::

:::exercise Implied hazard {level=2 check="0.02"}
A one-year spread is $s = 0.012$ and $R = 0.40$. Using $s \approx \lambda(1-R)$, enter $\lambda$.
:::solution
$\lambda \approx 0.012 / 0.60 = 0.02$. The physical default probability is not $0.02$, and it is not $0.012$.
:::
:::

:::exercise CDS spread in basis points {level=2 check="124"}
From [[#ex-cds]], enter the five-year par CDS spread in basis points, to the nearest basis point.
:::solution
$s = 0.01243$, which is $124$ bp. The approximation $\lambda(1-R)$ was $120$ bp.
:::
:::

:::exercise Protection versus premium {level=2 check="0.05062"}
From [[#ex-cds]], enter the protection-leg present value on unit notional, to five decimals.
:::solution
$(1-R)$ times the sum of mid-year-discounted default masses is $0.05062$. Divided by the annuity $4.0728$, this is the spread.
:::
:::

:::exercise In plus out of default {level=3}
A name has a one-year CDS at par spread $s$ and a one-year default-free zero at $e^{-r}$. Using the constant-hazard, $R$-recovery model, show that a long default-free zero, a short risky zero of the same face, and a long protection of notional $1$ (settled at $T$) is approximately a claim to the CDS premium, and identify the residual that the mid-year-versus-end-year convention leaves. Then, with $r = 0.05$, $\lambda = 0.02$, $R = 0.40$, compute the difference between $e^{-r} - P/100$ and $e^{-r}(1-R)(1-e^{-\lambda})$, the end-year protection value.
:::hint
The risky zero plus protection of notional $1$ with recovery at $T$ reconstructs the default-free zero, up to timing.
:::
:::solution
At $T$, the default-free zero pays $1$. The risky zero pays $1$ on survival and $R$ on default. End-year protection pays $1-R$ on default. So risky zero plus end-year protection pays $1$ in both states, matching the default-free zero. Therefore $e^{-r} = P/100 + e^{-r}(1-R)(1-e^{-\lambda})$, and the difference in the exercise is zero in that convention. Numerically: $e^{-0.05} = 0.951229$, $P/100 = 0.939928$, difference $0.011301$. End-year protection: $e^{-0.05}\times 0.60 \times (1-e^{-0.02}) = 0.951229 \times 0.60 \times 0.019801 = 0.011301$. Residual $0$. The CDS of [[#prop-cds]] discounts protection at mid-year rather than at $T$, which is why its spread ($124$ bp) is not exactly the zero spread ($120$ bp). That timing residual is the whole of the “approximately” in the first sentence.
:::
:::

:::exercise Senior versus junior, in a two-name copula {level=3}
Two names, each with risk-neutral default probability $p = 0.05$ over a year, notional $1$ each, recovery $0$. A junior claim pays the first default's loss; a senior claim pays only if both default. Under independence, compute $\Prob(\text{both default})$ and the expected senior loss. Under perfect correlation (they default together or not at all), recompute both. Which correlation regime is worse for the senior claim?
:::hint
Independence: $p^2$. Perfect correlation: both default with probability $p$.
:::
:::solution
Independence: $\Prob(\text{both}) = 0.05^2 = 0.0025$, expected senior loss $0.0025$. Perfect correlation: the two names are the same Bernoulli, so $\Prob(\text{both}) = 0.05$, expected senior loss $0.05$. Perfect correlation is twenty times worse for the senior claim on these numbers. Junior, by contrast, expects $1-(1-p)^2 = 0.0975$ under independence (loss on the first default, of which there are two chances) and $0.05$ under perfect correlation: junior *prefers* correlation, senior does not. The two-name calculation is the copula comparative static in miniature. It is not a pricing model of a 2006 mezzanine CDO, and it is not a recommendation to hold either tranche.
:::
:::
