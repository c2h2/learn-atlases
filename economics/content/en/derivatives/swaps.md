A firm that has borrowed at a floating rate, and another that has borrowed at a fixed rate, can agree to pay each other's interest. After the agreement, the first firm is a floating-rate borrower who *pays fixed* on a swap; the second is a fixed-rate borrower who *pays floating*. Neither loan is refinanced. The swap is a side contract that exchanges interest, and often notionals in two currencies, without exchanging the original creditors. The 1981 IBM–World Bank currency swap, arranged by Salomon Brothers, is the conventional first of these side contracts at market scale: the World Bank issued dollars and took over IBM's Swiss-franc and Deutsche-mark coupons.

This chapter prices the plain vanilla **interest-rate swap** and the **currency swap** by no-arbitrage, using the forwards of [[derivatives/forwards-and-futures]] and the discount curve of [[asset-pricing/fixed-income]]. A swap is a strip of forwards. Once that is visible, its par rate is a weighted average of forward rates, and an off-market swap is a package of fixed cashflows whose value is read off the same curve. Illustrative zeros — one-year $4\%$, two-year $4.5\%$, three-year $5\%$, annually compounded — are house numbers, not a quoted yield curve and not a recommendation to pay or receive fixed.

## What a swap exchanges

:::definition Interest-rate swap {#def-irs}
A **plain vanilla interest-rate swap** is a contract in which one party, the **payer** of fixed, pays a fixed rate $K$ on a **notional** $N$ at agreed dates $t_1,\dots,t_n$, and receives a floating rate (for textbook purposes, the simply compounded rate that resets at the start of each period and pays at its end) on the same notional. The other party is the **receiver** of fixed. Notionals are not exchanged. The swap is usually initiated at a **par swap rate** $R$ that makes the contract worth zero.
:::

A one-period swap is a **forward-rate agreement** (FRA): the two sides agree today on the rate that will apply to a future loan period $[T, T+\tau]$. Cash-settled, the FRA payoff at the *start* of the loan period is the discounted difference

$$
N\,\tau\,\frac{L - K}{1 + L\tau},
$$ {#eq-fra}

where $L$ is the simply compounded floating rate realised for that period and $K$ is the agreed rate. The discount in the denominator is there because the interest difference is paid at the start rather than the end of the period. A multi-period swap is a strip of such FRAs, with a single $K$ for every period.

:::definition Currency swap {#def-ccy-swap}
A **currency swap** exchanges interest in two currencies, and typically the notionals as well, at an agreed exchange rate. One standard structure is: initial exchange of $N_d$ domestic against $N_f$ foreign; running coupons in each currency; re-exchange of the same notionals at maturity. Economically it is a package of a domestic bond and a foreign bond.
:::

The comparative-advantage story that still appears in some term-sheet folklore — firm A borrows cheaply in dollars, firm B borrows cheaply in euros, they swap — is a *motivation*, not a pricing formula. If both firms can access both markets, any advantage is already in the two yield curves, and the swap is priced off those curves. If one firm is rationed in one market, the swap can be a way around the rationing; that is a constraint, not an arbitrage.

:::example An FRA cash settlement {#ex-fra}
Notional $N = 1{,}000{,}000$, period length $\tau = 0.5$ years, agreed rate $K = 0.04$, realised simply compounded rate $L = 0.05$. Compute the FRA payoff of the party that receives floating, paid at the start of the period as in [[#eq-fra]].
:::solution
$$
1{,}000{,}000 \times 0.5 \times \frac{0.05 - 0.04}{1 + 0.05\times 0.5} = 500{,}000 \times \frac{0.01}{1.025} = 4{,}878.05
$$

to two decimals. The $4{,}878$ is paid by the party that is short the floating rate. It is the discounted half-year interest difference on one million, not a forecast of $L$.
:::
:::

## Discount factors and the par swap rate

Let $Z(0,t)$ be the price today of one unit of cash at $t$ — the **discount factor**. With annually compounded zeros $y_t$, $Z(0,t) = (1+y_t)^{-t}$. With continuous zeros $r_t$, $Z(0,t) = e^{-r_t t}$. A floating-rate note that pays the simply compounded rate and the notional at the last date is worth par at a reset date: the floating leg of a vanilla swap, plus the notional, is a floating-rate note.

:::proposition Par swap rate {#prop-swap-rate}
On a reset date, a vanilla swap with unit notional, annual payments at $t_i = i$ for $i = 1,\dots,n$, and discount factors $Z_i = Z(0,t_i)$, has par fixed rate

$$
R = \frac{1 - Z_n}{\sum_{i=1}^{n} Z_i}.
$$ {#eq-swap-rate}

The value of a swap that *receives* fixed at an off-market rate $K$, with notional $N$, is

$$
V_{\mathrm{rec}} = N\bigl(K - R\bigr)\sum_{i=1}^{n} Z_i = N\Bigl(K \sum_{i=1}^{n} Z_i - (1 - Z_n)\Bigr).
$$ {#eq-swap-value}

The payer-fixed value is the negative of this. Assumptions: the floating leg is a standard simply compounded rate matching the payment dates, there is no default, and the discount curve is the curve used to value both legs (a single-curve world).
:::

:::proof
At a reset date the floating leg plus notional is worth par, so the present value of floating plus $N$ is $N$. The present value of the notional at $t_n$ is $N Z_n$. Therefore the present value of the floating coupons is $N(1 - Z_n)$. The present value of the fixed coupons $N K$ is $N K \sum_i Z_i$. Setting them equal gives $K = R$ as in [[#eq-swap-rate]]. For an off-market $K$, the difference of the two present values is [[#eq-swap-value]]. The same algebra is: a receiver swap equals a long fixed-rate bond struck at $K$ minus a long floating-rate bond, both of notional $N$; the floating bond is worth $N$ and the fixed bond is worth $N K \sum Z_i + N Z_n$.
:::

The denominator $\sum Z_i$ is the **annuity** or **level** of the swap, sometimes written $A$. Then $R = (1-Z_n)/A$ and $V_{\mathrm{rec}} = N(K-R)A$. In a multi-curve world after 2008 one discounts on an overnight-index-swap curve and projects the floating rate from a different curve (LIBOR, then SOFR or another overnight rate). The single-curve formula remains the right first picture; the extra curve is a second input, not a different idea.

:::example Three annual zeros {#ex-par-swap}
Annually compounded zero yields are $y_1 = 0.04$, $y_2 = 0.045$, $y_3 = 0.05$. Compute $Z_1, Z_2, Z_3$ and the three-year par swap rate $R$ for annual payments.
:::solution
$$
Z_1 = \frac{1}{1.04} = 0.961538,\qquad
Z_2 = \frac{1}{1.045^2} = 0.915730,\qquad
Z_3 = \frac{1}{1.05^3} = 0.863838,
$$

to six decimals. The annuity is $A = 0.961538 + 0.915730 + 0.863838 = 2.741106$, and

$$
R = \frac{1 - 0.863838}{2.741106} = \frac{0.136162}{2.741106} = 0.049674,
$$

or $4.9674\%$. The par rate lies between the one-year and three-year zeros, as a weighted average of forwards must.
:::
:::

:::example Off-market value {#ex-off-market}
On the curve of [[#ex-par-swap]], a three-year swap with notional $N = 1{,}000{,}000$ receives fixed at $K = 0.04$. Compute the value to the receiver.
:::solution
$R = 0.049674$ and $A = 2.741106$, so

$$
V_{\mathrm{rec}} = 1{,}000{,}000 \times (0.04 - 0.049674) \times 2.741106 = -26{,}518
$$

to the nearest unit of money. The receiver of $4\%$ is below par on a curve that sets par at $4.967\%$, and the swap is worth about $-26{,}518$ to that side. The payer of $4\%$ holds the opposite value, $+26{,}518$. These are model values on an illustrative curve, not quotes.
:::
:::

:::widget plot
f: 1000000*(x - 0.049674)*2.741106
x: 0.02, 0.08
y: -80000, 80000
labels: \text{receiver value}
hlines: 0
vlines: 0.049674
caption: Receiver-swap value $N(K-R)A$ on the three-year illustrative curve, against the fixed rate $K$ on the horizontal axis. The line crosses zero at the par rate $R = 0.049674$. The slope is the annuity times notional, about $2.74$ million per unit of $K$. The picture is the linear identity [[#eq-swap-value]], not a forecast of rates.
:::

The widget is a straight line in $K$: on a fixed curve, $V$ is linear in $K$. Each basis point of $K$ is worth $N \times 0.0001 \times A \approx 274$ units of money on this curve. That $274$ is the **PV01** of the swap.

A forward rate is the rate implied by two discounts. The simply compounded forward for $(t_{i-1}, t_i)$ is

$$
F_i = \frac{1}{\tau_i}\left(\frac{Z_{i-1}}{Z_i} - 1\right),
$$

with $Z_0 = 1$. The par swap rate is the annuity-weighted average of the forwards,

$$
R = \frac{\sum_i \tau_i Z_i F_i}{\sum_i \tau_i Z_i},
$$

which is [[#eq-swap-rate]] rewritten. Pricing a swap by taking present values of expected floating coupons under $Q$ is the same calculation, because the risk-neutral expected floating rate is the forward.

:::example The one-year forward into year three {#ex-fwd-23}
On the continuous-zero curve $r_1 = 0.04$, $r_2 = 0.045$, $r_3 = 0.05$, compute $Z_2$, $Z_3$, the simply compounded one-year forward from year two to year three, and the continuously compounded forward for the same period.
:::solution
$Z_2 = e^{-0.045\times 2} = 0.913931$, $Z_3 = e^{-0.05\times 3} = 0.860708$. The simply compounded forward is

$$
F_{2,3} = \frac{Z_2}{Z_3} - 1 = \frac{0.913931}{0.860708} - 1 = 0.06184,
$$

about $6.184\%$. The continuously compounded forward is $(3\times 0.05 - 2\times 0.045)/1 = 0.06$. The two compounding conventions differ; a term sheet names one.
:::
:::

:::quiz
A vanilla three-year swap has par rate $R = 0.049674$ on the curve of [[#ex-par-swap]]. A commentator says the swap “locks in $4.9674\%$ for three years, so the three-year zero must be $4.9674\%$”. What is wrong?
- [ ] Nothing: $R$ is the three-year zero
- [x] $R$ is an annuity-weighted average of forwards, not the zero yield $y_3$
- [ ] $R$ is always above every zero yield on the curve
- [ ] $R$ is a physical forecast of the future policy rate
:::solution
Here $y_3 = 0.05$ and $R = 0.049674$. They are close on a short, fairly flat curve and they are not equal. [[#eq-swap-rate]] divides $1-Z_n$ by the sum of the discounts, not by $n Z_n$. The swap rate is not a forecast of a future central-bank rate.
:::
:::

## Currency swaps as two bonds

A currency swap that exchanges notionals $N_d$ and $N_f$ at the spot $S_0$ (domestic per foreign) and re-exchanges them at $T$, with running coupons $c_d$ and $c_f$, is worth, to the party that pays foreign and receives domestic,

$$
V = B_d - S_0 B_f,
$$ {#eq-ccy-swap}

where $B_d$ is the domestic bond with coupons $c_d$ and principal $N_d$, and $B_f$ is the foreign bond with coupons $c_f$ and principal $N_f$, each discounted on its own curve. At inception one chooses notionals so that $N_d = S_0 N_f$ and coupons so that $V = 0$. Afterwards each bond is marked on its curve and the spot FX moves $V$ through the $S_0 B_f$ term.

The IBM–World Bank swap of August 1981 was of this type: IBM had outstanding Swiss-franc and Deutsche-mark liabilities and wanted dollar liabilities; the World Bank could issue dollars and wanted the European currencies. Salomon Brothers matched the coupons and the initial exchange. The complete schedule was never published in full; textbook reconstructions (for example the University of Houston case based on Rotberg's account) treat it as a pair of bonds plus a short-dated FX hedge of the settlement gap. The pricing identity is [[#eq-ccy-swap]], not the folklore of comparative advantage.

:::example Two-bond valuation {#ex-two-bonds}
Domestic notional $N_d = 100$, foreign notional $N_f = 80$, spot $S_0 = 1.25$ domestic per foreign. The domestic bond (coupons plus principal, discounted) is worth $B_d = 102$; the foreign bond is worth $B_f = 79$. Compute $V$ for the party that receives domestic and pays foreign.
:::solution
$V = 102 - 1.25 \times 79 = 102 - 98.75 = 3.25$. The package is in-the-money to the domestic receiver by $3.25$ units of domestic money. If the spot jumped to $1.30$ with bond prices unchanged, $V$ would become $102 - 1.30\times 79 = -0.70$. The FX exposure of a currency swap is the foreign bond, not the notional alone.
:::
:::

:::warning Treating the notional as notional-only
Because a vanilla *interest-rate* swap does not exchange notionals, students sometimes drop the notionals from a *currency* swap as well. That erases the principal exchange at $T$, which is the largest cashflow in the contract. [[#eq-ccy-swap]] counts it: $B_d$ and $B_f$ include principals. A related error is to discount both legs on the domestic curve. The foreign coupons are foreign cash and must be discounted at foreign rates, then converted at the *spot*, not at a historical rate.
:::

## Uses, and what the model leaves out

A swap can change the interest-rate exposure of a floating-rate loan into that of a fixed-rate loan, or the reverse, without calling the loan. A currency swap can change the currency of a liability. In both cases the swap is a derivative on top of a balance-sheet position; it does not retire the original creditor. Comparative-advantage stories, tax stories and regulatory-arbitrage stories have all been used to explain why two names would swap. Some of those stories have been true of particular trades. None of them is a pricing input once the two discount curves and the spot FX are given.

What the single-curve, no-default model leaves out is now first-order in markets. **Counterparty risk** is the risk that the loser of $V$ defaults; **credit valuation adjustment** (CVA) is the market price of that risk, treated with credit derivatives in [[derivatives/credit-derivatives]]. **Collateral** and **initial margin** change the discounting (OIS discounting, then a funding valuation adjustment). **Multi-curve** projection of the floating rate, after the LIBOR–OIS spread became a standing feature rather than a crisis spike, means $R$ is no longer exactly $(1-Z_n)/A$ on a single $Z$. **Compression and clearing** through central counterparties, pushed by the G20 after 2009, replace a web of bilateral $V$s with a cleared stream of variation margin. The algebra of [[#prop-swap-rate]] remains the skeleton. The flesh is those adjustments.

:::intuition A swap is a strip of forwards with one strike
Each period of a vanilla IRS is an FRA. Forcing every FRA to share the same $K$ is what makes a swap a swap rather than a strip of separately struck forwards. The par $K$ is the level at which the strip, taken together, is worth zero. Off-market, the whole strip is worth the annuity times $K-R$. If you can price one forward, you can price a swap; the extra work is adding.
:::

:::application A firm with a floating loan
A model firm has a three-year floating-rate loan of notional $1{,}000{,}000$ on the curve of [[#ex-par-swap]]. Entering a payer swap at the par rate $R = 0.049674$ replaces the floating coupons, on a no-default single-curve view, with a fixed $4.9674\%$. The loan's creditor is unchanged. The swap's value starts at zero and then moves as in [[#ex-off-market]] when the curve moves. Whether the firm prefers floating, prefers fixed, or prefers to do nothing is a risk-preference question outside the pricing formula. The paragraph is a description of cashflows, not a recommendation to the firm or to a reader.
:::

## Evidence

Interest-rate contracts are the bulk of OTC derivatives. At end-June 2025 the BIS reported about USD $666$ trillion of OTC interest-rate notional, of which swaps were the dominant instrument, and USD $155$ trillion of FX notional, of which outright forwards and FX swaps were about USD $85$ trillion and currency swaps about USD $45$ trillion (BIS OTC derivatives statistics). Gross market values are an order of magnitude smaller: USD $15.0$ trillion for interest-rate contracts and USD $5.4$ trillion for FX at the same date. Clearing at central counterparties now covers most of the interest-rate notional among reporting dealers; the BIS tables split counterparties into reporting dealers, other financial institutions, central counterparties and non-financial customers.

The post-2008 gap between LIBOR (then its replacements) and overnight index swaps is a measured spread, not a footnote. Du, Tepper and Verdelhan (*Journal of Finance*, 2018) documented persistent deviations from covered interest parity in G10 forwards, of several tens of basis points, after 2008; the deviations line up with bank balance-sheet costs rather than with a failure of arithmetic. A single-curve textbook swap rate is still the right thing to compute by hand. It is not, unadjusted, a 2020s dealer quote.

Swap markets exist in many currencies besides USD and EUR. Onshore CNY interest-rate swaps, Indian MIBOR and Mumbai overnight swaps, Brazilian CDI swaps, and South African JIBAR swaps are standard local instruments. Each has a local day-count, a local fixing and, often, a local clearing house. The identity $R = (1-Z_n)/A$ survives the translation; the curve-building conventions do not.

## Where this leads

Options on swaps — **swaptions** — belong with the option chapters; a European swaption is an option on $V_{\mathrm{rec}}$ at a future date, and Black's formula with a lognormal swap rate is the market quoting convention. Credit default swaps in [[derivatives/credit-derivatives]] are swaps whose floating leg is a default. The discount curve that prices a swap is also the $r$ that enters binomial trees and Black–Scholes. First, though, the course turns to contracts whose payoff is not linear: [[derivatives/options]].

:::history
**1981, IBM and the World Bank.** In August 1981 Salomon Brothers arranged a currency swap between IBM and the World Bank. The Bank issued a dollar bond (issue date 11 August, settlement 25 August) and took on IBM's Swiss-franc and Deutsche-mark coupon obligations; IBM took on dollar coupons. World Bank treasurer Eugene Rotberg and Salomon's John Rosenstreich are the names attached to the matching of the two balance sheets. Earlier back-to-back loans in the 1970s, used in part to work around UK exchange controls, were the legal ancestors. The 1981 trade is the usual marker for the swap as a standardised OTC product. Subsequent ISDA master agreements (from 1985, with the 1992 and 2002 books still in use) turned that product into a market.
:::

:::summary
- A vanilla interest-rate swap exchanges fixed coupons $K$ for floating coupons on a notional that is not itself exchanged. A one-period swap is an FRA; a multi-period swap is a strip of FRAs with a common $K$.
- On a reset date the par swap rate is $R = (1-Z_n)/\sum Z_i$. Off-market, $V_{\mathrm{rec}} = N(K-R)A$.
- The par rate is an annuity-weighted average of forward rates, not the $n$-year zero and not a forecast of a policy rate.
- A currency swap is a domestic bond minus the spot times a foreign bond. Notionals *are* exchanged; dropping them is a mistake.
- Single-curve, no-default valuation is the skeleton. CVA, collateral, multi-curve projection and clearing are the flesh of a 2020s quote.
- Illustrative zeros $4\%$, $4.5\%$, $5\%$ produce $R = 4.967\%$ and an off-market value of about $-26{,}518$ on a one-million $4\%$ receiver. Those numbers are a worked curve, not a market.
:::

## Exercises

:::exercise Discount factors {level=1 check="0.961538"}
The one-year annually compounded zero is $4\%$. Enter $Z(0,1)$ to six decimals.
:::solution
$Z(0,1) = 1/1.04 = 0.961538$ to six decimals. This is $Z_1$ in [[#ex-par-swap]].
:::
:::

:::exercise FRA settlement {level=1 check="4878"}
Using [[#eq-fra]] with $N = 1000000$, $\tau = 0.5$, $L = 0.05$, $K = 0.04$, enter the payoff of the floating receiver to the nearest unit of money.
:::solution
$500000 \times 0.01 / 1.025 = 4878.05$, which rounds to $4878$. See [[#ex-fra]].
:::
:::

:::exercise Par swap rate {level=1 check="0.049674"}
On the annually compounded curve $y_1 = 0.04$, $y_2 = 0.045$, $y_3 = 0.05$, enter the three-year annual par swap rate to six decimals.
:::solution
$R = (1 - 1/1.05^3)/(1/1.04 + 1/1.045^2 + 1/1.05^3) = 0.049674$ to six decimals, [[#ex-par-swap]].
:::
:::

:::exercise Annuity {level=2 check="2.741"}
On the same curve, enter the three-year swap annuity $A = \sum_{i=1}^{3} Z_i$ to three decimals.
:::solution
$A = 0.961538 + 0.915730 + 0.863838 = 2.741$ to three decimals.
:::
:::

:::exercise Receiver value {level=2 check="-26518"}
Notional $1{,}000{,}000$, $K = 0.04$, $R = 0.049674$, $A = 2.741106$. Enter the value to the receiver, to the nearest unit of money (include the minus sign).
:::solution
$V_{\mathrm{rec}} = 1000000 \times (0.04-0.049674)\times 2.741106 = -26518$ to the nearest unit, [[#ex-off-market]].
:::
:::

:::exercise Simply compounded forward {level=2 check="0.06184"}
Continuous zeros $r_2 = 0.045$, $r_3 = 0.05$. Enter the simply compounded one-year forward from year two to year three, to five decimals.
:::solution
$Z_2/Z_3 - 1 = e^{-0.09}/e^{-0.15} - 1 = e^{0.06} - 1 = 0.06184$ to five decimals, [[#ex-fwd-23]].
:::
:::

:::exercise Two-bond currency swap {level=3}
Prove [[#eq-ccy-swap]] by writing the domestic and foreign cashflows of a notional-exchanging currency swap, discounting each on its own curve, and converting the foreign present value at the spot. Then, with $B_d = 102$, $B_f = 79$, $S_0 = 1.25$, compute $V$ and state which party is in-the-money.
:::hint
Initial exchanges cancel at inception if $N_d = S_0 N_f$ and both bonds are then at the values $B_d$, $B_f$ you are given; afterwards they need not cancel.
:::
:::solution
The party that receives domestic and pays foreign receives the domestic coupons and $N_d$ at $T$, and pays the foreign coupons and $N_f$ at $T$. (The initial exchange, if it still has to be booked, is $N_d$ against $S_0 N_f$.) Discounting the domestic stream on the domestic curve produces $B_d$. Discounting the foreign stream on the foreign curve produces $B_f$ units of foreign money, worth $S_0 B_f$ domestic. Subtracting gives $V = B_d - S_0 B_f$. With the given numbers, $V = 102 - 1.25\times 79 = 3.25$, in-the-money to the domestic receiver. If notionals had been omitted, the principals at $T$ would be missing from $B_d$ and $B_f$ and the $3.25$ would be a different, wrong, object.
:::
:::

:::exercise PV01 and a parallel shift {level=3 check="274"}
On the illustrative three-year curve, $A = 2.741106$ and $N = 1{,}000{,}000$. Enter the change in receiver value for a one-basis-point increase in $K$, to the nearest unit of money. Then explain, in the solution, why a one-basis-point *parallel* increase in every forward rate moves $V_{\mathrm{rec}}$ by approximately the opposite amount.
:::hint
$\partial V_{\mathrm{rec}} / \partial K = N A$. A parallel rise in forwards raises $R$ by about one basis point.
:::
:::solution
$N A \times 0.0001 = 1000000 \times 2.741106 \times 0.0001 = 274.11$, which rounds to $274$. That is the PV01 with respect to $K$. Because $V_{\mathrm{rec}} = N(K-R)A$ and a parallel one-basis-point rise in every simply compounded forward raises $R$ by one basis point (exactly, for this weighting), the same $274$ appears with the opposite sign as the DV01 with respect to the curve. The two numbers coincide only for a parallel move of this particular curve; a twist that raises the three-year forward and cuts the one-year forward moves $R$ by a weighted amount that need not be one basis point. The $274$ is a derivative of a model value, not a quoted bid.
:::
:::
