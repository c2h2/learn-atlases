A miller has agreed to grind wheat in six months and does not yet own the grain. A farmer will harvest wheat in six months and does not yet know the harvest-time spot. Each can wait and take the spot that realises. Each can also enter a contract today that names a price, in units of money per unit of wheat, at which they will exchange in six months. That contract is a **forward**. Neither party has to like the other's business; they only have to like a locked price more than an unlocked one. The same logic, with a clearing house, daily settlement and a standardised size, is a **futures** contract.

This chapter prices those contracts by **cash-and-carry**: a replicating portfolio that holds the underlying, finances it, and delivers it into the contract. The price that falls out is the **cost-of-carry** forward price. It is a relative price. It says what the forward must be, given the spot, the interest rate and the income or storage on the underlying. It does not say what the spot itself should be. Numbers throughout are illustrative: a spot $S = 100$, a continuously compounded rate $r = 0.05$, a maturity $T$ of a year or a quarter. They are not quotes, and they are not a recommendation to lock a price, leave it unlocked, or take a view.

The chapter sits on [[corporate-finance/time-value-of-money]] for discounting and on [[asset-pricing/stochastic-discount-factor]] for the meaning of no-arbitrage. Rates are continuously compounded unless a worked example says otherwise.

## Forwards and futures

:::definition Forward contract {#def-forward}
A **forward contract** is an over-the-counter agreement to buy or sell an underlying at a specified **delivery date** $T$, at a **delivery price** $K$ agreed at inception. The party that agrees to buy is **long**; the party that agrees to sell is **short**. At $T$ the long pays $K$ and receives the underlying, or the two sides settle the difference in cash. No payment is exchanged at inception when $K$ is set so that the contract has value zero. That $K$ is the **forward price** $F_{0,T}$.
:::

The payoff of a long forward, settled in cash at $T$, is $S_T - K$. The short's payoff is $K - S_T$. Both are linear in $S_T$. There is no optionality: the long is obliged to buy even if $S_T < K$. That is the whole distinction from a call, which we meet in [[derivatives/options]].

A forward is a bilateral contract. Each side bears the other's **counterparty risk**: the risk that the loser of $S_T - K$ does not pay. Collateral, netting and a credit support annex are the usual legal answers; they are not in the pricing formula below, and leaving them out is a modelling choice, not a description of every desk.

:::definition Futures contract {#def-futures}
A **futures contract** is a standardised forward traded on an exchange, with a specified underlying, size, delivery month and delivery procedure, **marked to market** daily through a **margin account** at a **clearing house**. The clearing house is the counterparty to every long and every short. The **futures price** $G_{t,T}$ is the delivery price at which a newly entered futures has value zero after that day's settlement.
:::

Standardisation is what makes the two contracts different as market objects. A Chicago wheat future names a grade, a delivery location and a multiplier; a firm that wants a slightly different grade still uses the future as a hedge and lives with **basis** risk, treated later in the chapter. Daily settlement replaces a single payoff $S_T - K$ with a stream of daily gains and losses that sum, in accounting, to the same total, but with cash paid along the way.

:::example A cash-settled forward {#ex-cash-forward}
An illustrative forward is struck at $K = 102$ on an underlying that will be worth $S_T$ at $T$. The long's cash settlement at $T$ is $S_T - 102$. Compute that settlement if $S_T = 110$ and if $S_T = 95$. Who pays whom?
:::solution
If $S_T = 110$, the long receives $110 - 102 = 8$ units of money from the short. If $S_T = 95$, the long pays $102 - 95 = 7$ to the short. The contract does not let either side walk away. The eight units and the seven units are payoffs of a contract, not profits of a trading rule, and they are not a forecast of $S_T$.
:::
:::

:::widget plot
f: x - 102; 102 - x
x: 70, 140
y: -50, 50
labels: \text{long forward}; \text{short forward}
hlines: 0
vlines: 102
caption: The long-forward payoff $S_T - 102$ and the short-forward payoff $102 - S_T$. Move along the horizontal axis: the two lines always sum to zero. The picture is a contract identity, not a forecast of the spot.
:::

The widget is a pair of straight lines. That geometry is the reason forwards are the first derivative in the course: once you can price a linear claim, the rest of the course is about claims that are not linear.

## Cash-and-carry pricing

Suppose the underlying is an **investment asset**: it is held for investment, it can be sold short, and it pays no income. Gold in a vault and a non-dividend share are the usual textbook cases. (A share that *does* pay a dividend is the next section.) The interest rate $r$ is constant and the same for borrowing and lending. There are no transaction costs and no restrictions on short sales. Those are the assumptions of the next result, and they are strong.

:::proposition Forward price of an investment asset with no income {#prop-carry}
In a market with a constant continuously compounded risk-free rate $r$, no transaction costs and unrestricted long and short positions in the underlying, the forward price of a non-income-paying investment asset with spot $S_0$ and maturity $T$ is

$$
F_{0,T} = S_0 e^{rT}.
$$ {#eq-carry}

If a quoted forward price $F$ differs from $S_0 e^{rT}$, an arbitrage portfolio of the underlying, cash and the forward has a positive payoff in every state and a non-positive cost today.
:::

:::proof
Two ways of owning the asset at $T$ must cost the same today.

*Cash-and-carry.* Borrow $S_0$, buy the asset, and hold it to $T$. At $T$ you owe $S_0 e^{rT}$ and you own the asset. Entering a short forward at $F_{0,T}$ sells the asset at $T$ for $F_{0,T}$. The locked proceeds are $F_{0,T} - S_0 e^{rT}$. For this not to be an arbitrage when it is positive, we need $F_{0,T} \le S_0 e^{rT}$.

*Reverse cash-and-carry.* Short the asset, lend the proceeds $S_0$, and take a long forward. At $T$ the loan has grown to $S_0 e^{rT}$, the long forward delivers the asset for $F_{0,T}$, and you return the asset to close the short. The locked proceeds are $S_0 e^{rT} - F_{0,T}$. For this not to be an arbitrage when it is positive, we need $F_{0,T} \ge S_0 e^{rT}$.

The two inequalities give [[#eq-carry]]. If a quoted $F$ lies strictly above $S_0 e^{rT}$, the first portfolio (buy asset, short forward, borrow $S_0$) costs nothing today and pays $F - S_0 e^{rT} > 0$ at $T$. If a quoted $F$ lies strictly below, the reverse portfolio does the same with the opposite sign. Assumptions used: the asset can be sold short and stored at no extra cost, cash can be borrowed and lent at $r$, and the forward can be entered at $F$ in the size of one unit of the asset.
:::

The argument never used a probability. The forward price is not an expected spot. Under the risk-neutral measure of [[asset-pricing/stochastic-discount-factor]] one does have $\E^Q[S_T] = S_0 e^{rT}$, so $F_{0,T} = \E^Q[S_T]$, but that is a restatement of no-arbitrage, not a forecast of $S_T$ under the physical measure. A risk premium on the spot lives in the physical drift; it is already in $S_0$ and does not appear a second time in $F_{0,T}$.

:::example The house numbers {#ex-house-forward}
Take $S_0 = 100$, $r = 0.05$ continuous, $T = 1$. Compute $F_{0,1}$. Repeat for $T = 0.25$ and $T = 0.5$.
:::solution
For $T = 1$,

$$
F_{0,1} = 100\, e^{0.05} = 105.127
$$

to three decimals. For a quarter-year, $F_{0,0.25} = 100\, e^{0.05 \times 0.25} = 101.258$. For a half-year, $F_{0,0.5} = 100\, e^{0.05 \times 0.5} = 102.532$. Each figure is the amount of cash you would owe at $T$ if you financed a purchase of the asset today by borrowing $100$. It is not a prediction of the future spot.
:::
:::

:::example A quoted forward that is too high {#ex-arb-high}
The spot is $100$, $r = 0.05$, $T = 1$, so $S_0 e^{rT} = 105.127$. A dealer quotes a one-year forward at $108$. Describe the cash-and-carry trades and the locked cash at $T$.
:::solution
The quoted forward is $2.873$ above the replicating cost. Borrow $100$, buy the asset, and short the forward at $108$. At $T$ deliver the asset, receive $108$, and repay $105.127$. The locked cash is $108 - 105.127 = 2.873$, with no net position left. The $2.873$ is an arbitrage profit in the model of [[#prop-carry]]. In a market it would have to survive bid–ask spreads, haircuts on the borrow, and the possibility that the short forward does not pay. Those frictions are why a quote can sit off the formula for a while without a machine printing money.
:::
:::

:::intuition The forward is a prepaid loan against the asset
Buying the asset on a forward is buying it on credit. The credit charge is $S_0(e^{rT} - 1)$. Adding that charge to the spot produces $F_{0,T}$. If the asset pays you income while you wait, the credit charge shrinks; if it costs you storage, the charge grows. That is the whole of the next section, in one sentence.
:::

:::quiz
In the market of [[#prop-carry]], the one-year forward price of a non-dividend share with $S_0 = 100$ and $r = 0.05$ is $105.127$. A commentator says “the market expects the share to be at $105.127$ in a year”. What is the precise statement?
- [ ] $S_1 = 105.127$ with probability one
- [ ] The physical forecast $\E^P[S_1]$ equals $105.127$
- [x] The no-arbitrage forward equals $S_0 e^{rT}$; equivalently $\E^Q[S_1] = 105.127$
- [ ] The share is overpriced because $105.127 > 100$
:::solution
[[#eq-carry]] is a relative-pricing identity. It does not pin down $S_1$, and it does not equal the physical expectation unless the risk premium happens to be zero. The risk-neutral expectation $\E^Q[S_1]$ does equal $105.127$, by construction of $Q$. The last option confuses a financed future purchase with a statement about today's spot.
:::
:::

## Income, storage and foreign interest

Three adjustments of [[#eq-carry]] cover most underlyings that appear on a term sheet.

:::proposition Cost-of-carry with yield, discrete dividends and storage {#prop-carry-q}
Assume the market of [[#prop-carry]].

1. If the asset pays a continuous dividend yield $q$, then $F_{0,T} = S_0 e^{(r-q)T}$.
2. If the asset pays discrete dividends whose present value is $I$, then $F_{0,T} = (S_0 - I) e^{rT}$.
3. If holding the asset costs a continuous storage proportion $u$ and the asset is an investment asset (it can be sold short), then $F_{0,T} = S_0 e^{(r+u)T}$.

If the asset is a **consumption commodity** that cannot be sold short freely, cash-and-carry still gives $F_{0,T} \le S_0 e^{(r+u)T}$. Reverse cash-and-carry need not be available, so a **convenience yield** $y \ge 0$ is defined by $F_{0,T} = S_0 e^{(r+u-y)T}$ and is a residual, not a separately observed cashflow.
:::

:::proof
(1) A long position in $e^{-qT}$ units of the asset, with dividends reinvested, grows to one unit at $T$. Its cost today is $S_0 e^{-qT}$. Financing that cost produces $S_0 e^{(r-q)T}$ at $T$, which must equal $F_{0,T}$.

(2) Subtracting the present value of known dividends from the spot produces a non-income-paying claim worth $S_0 - I$. [[#prop-carry]] applied to that claim gives the formula.

(3) Storage is a negative dividend. Replacing $q$ by $-u$ in (1) gives $F_{0,T} = S_0 e^{(r+u)T}$ when reverse cash-and-carry is feasible. When it is not — you cannot borrow the commodity from a holder who wants it in inventory — only the cash-and-carry inequality survives. The convenience yield is the $y$ that restores equality; it measures the benefit of physical inventory that the futures market does not replicate.
:::

:::example A discrete dividend {#ex-discrete-div}
A share trades at $S_0 = 100$ and will pay a dividend of $2$ in a quarter of a year. The continuous rate is $r = 0.05$. Compute the one-year forward price.
:::solution
The present value of the dividend is $I = 2\, e^{-0.05 \times 0.25} = 1.975$. The prepaid forward on the share-ex-dividend is $100 - 1.975 = 98.025$, and

$$
F_{0,1} = 98.025\, e^{0.05} = 103.051
$$

to three decimals. Omitting the dividend and using $100\, e^{0.05} = 105.127$ would overstate the forward: the long forward does not receive the $2$.
:::
:::

:::example Storage on an investment commodity {#ex-storage}
An illustrative commodity trades at $S_0 = 80$, can be sold short, and costs a continuous storage proportion $u = 0.03$. With $r = 0.05$ and $T = 0.5$, compute the forward price.
:::solution
$$
F_{0,0.5} = 80\, e^{(0.05+0.03)\times 0.5} = 80\, e^{0.04} = 83.265
$$

to three decimals. The extra $0.03$ in the exponent is the storage. If the commodity were a consumption good that holders would not lend, this number would be an *upper* bound, not a price.
:::
:::

A foreign currency is an asset that pays a yield: the foreign risk-free rate $r_f$. The domestic rate is $r$. If $S_0$ is the domestic-per-foreign spot (for example dollars per euro), the forward is the **interest-rate parity** price

$$
F_{0,T} = S_0 e^{(r - r_f)T}.
$$ {#eq-irp}

The replicating portfolio is: borrow foreign, convert to domestic, lend domestic, and use the forward to buy the foreign back. It is the cash-and-carry argument with $q = r_f$. Covered interest parity in [[international-finance/exchange-rates]] is this identity with bills in both currencies; a currency forward is the derivative that completes it.

:::example A dollar–euro forward {#ex-fx-forward}
The spot is $S_0 = 1.10$ dollars per euro, the dollar continuous rate is $r = 0.05$, the euro continuous rate is $r_f = 0.03$, and $T = 1$. Compute the one-year forward in dollars per euro.
:::solution
$$
F_{0,1} = 1.10\, e^{(0.05-0.03)\times 1} = 1.10\, e^{0.02} = 1.1222
$$

to four decimals. The dollar interest is higher, so the dollar is at a forward discount: one euro costs more dollars for future delivery than for spot delivery. The $1.1222$ is a no-arbitrage conversion rate, not a forecast of next year's spot.
:::
:::

:::warning Using the physical forecast as a forward
A common confusion is to set $F_{0,T} = \E^P[S_T]$, the physical expected spot. That would be right only if the risk premium on the underlying were zero, or if one were quoting a futures under risk-neutrality without noticing. Cash-and-carry does not ask what you think $S_T$ will be. It asks what it costs to manufacture $S_T$ with the asset and the bank account. A grain analyst's harvest forecast can be $90$ while the cost-of-carry forward is $105$; both numbers can be internally consistent, because they answer different questions.
:::

:::widget plot
f: s*exp((r-q)*x)
sliders: s=100:50:150:1; r=0.05:0:0.12:0.005; q=0:0:0.08:0.005
x: 0, 2
y: 40, 180
labels: \text{forward price}
caption: The formula $F = S e^{(r-q)T}$ against maturity $T$ on the horizontal axis, with sliders for the spot, the rate and the yield. Raise $q$ toward $r$ and the curve flattens; raise $r$ with $q$ fixed and it steepens. The curve is the cost of manufacturing delivery, not a path of the spot.
:::

The value of an *existing* long forward, struck at $K$ when the current forward is $F_{t,T}$, is the present value of the difference:

$$
V_t = e^{-r(T-t)}\bigl(F_{t,T} - K\bigr) = S_t e^{-q(T-t)} - K e^{-r(T-t)}.
$$ {#eq-fwd-value}

At inception one chooses $K = F_{0,T}$ so that $V_0 = 0$. Afterwards $V$ moves one-for-one with the discounted forward. A futures, by contrast, is reset every day so that its value is brought back to zero; the gains and losses live in the margin account.

## Marking to market

A futures is marked to market daily. Let $G_{t,T}$ be the futures price at $t$ for maturity $T$. A long who entered yesterday at $G_{t-\Delta,T}$ receives $G_{t,T} - G_{t-\Delta,T}$ (per unit of the underlying) in the margin account today, and is then in a contract at the new price $G_{t,T}$. Over the life of the contract the sum of those daily amounts is $G_{T,T} - G_{0,T}$. At maturity $G_{T,T} = S_T$ (or the agreed settlement index), so the cumulative cash is $S_T - G_{0,T}$, the same total as a forward struck at $G_{0,T}$. The *timing* of the cash is not the same.

That timing matters when interest rates move with the futures price. If daily gains can be reinvested at high rates precisely when the futures is high, a long futures is more valuable than a long forward with the same delivery price. When interest rates are deterministic, the two prices coincide: $G_{0,T} = F_{0,T}$. When rates are stochastic and positively correlated with the futures, the futures price sits a little above the forward price (the **marking-to-market** or **convexity** adjustment). For short-dated equity and commodity futures the gap is usually treated as second order; for long-dated interest-rate futures it is a quoted adjustment. This course uses $G = F$ unless a later example says otherwise.

Margin is a performance bond, not a down-payment on the underlying. **Initial margin** is posted at entry; **variation margin** is the daily mark; **maintenance margin** is the floor below which the account must be topped up. The numbers are set by the clearing house and change with volatility. They are a credit-risk control. They are not an input to [[#eq-carry]].

:::application A miller's locked purchase, in two contracts
A miller who will need $100{,}000$ bushels in six months can lock a purchase price with a forward on those $100{,}000$ bushels, bilateral and unstandardised, or with wheat futures of a listed size — say $5{,}000$ bushels a contract, so $20$ contracts — and live with the basis between the listed grade and the miller's grade. The forward has counterparty risk and little liquidity. The futures has daily cashflow and basis risk. Neither contract is “the right hedge”. Each is a different bundle of residual risks. The miller of this paragraph is a model agent in a worked story, not a reader being told what to do.
:::

## Hedging with futures

A linear contract offsets a linear exposure. Let $Q_S$ be a position in the spot (positive for a long holding, negative for a planned purchase) and $Q_F$ the size of one futures contract, in the same units. Holding $N$ long futures (so $N < 0$ is a short) gives a P&amp;L, over a short horizon,

$$
\Delta\Pi = Q_S \Delta S + N Q_F \Delta G.
$$

If $\Delta G \approx \Delta S$, choosing $N = -Q_S / Q_F$ cancels the first-order move. When the futures is on a related but different underlying — a stock-index future against a single share, a heating-oil future against jet fuel — the two changes are imperfectly correlated.

:::definition Minimum-variance hedge ratio {#def-hstar}
Let $\sigma_S$ and $\sigma_F$ be the standard deviations of $\Delta S$ and $\Delta G$ over the hedge horizon, and let $\rho$ be their correlation. The **minimum-variance hedge ratio** is

$$
h^* = \rho\,\frac{\sigma_S}{\sigma_F}.
$$ {#eq-hstar}

The corresponding number of futures contracts, for a spot position of size $Q_S$ and a contract size $Q_F$, is $N^* = - h^* Q_S / Q_F$ for a long spot (short futures) and the opposite sign for a planned purchase. The residual variance is $(1-\rho^2)\sigma_S^2 Q_S^2$.
:::

The formula is the slope in the regression of $\Delta S$ on $\Delta G$. It is an *ex ante* variance calculation in a two-variable model. It is not a guarantee that next month's P&amp;L will be small: $\rho$ can change, $\sigma_F$ can jump, and the hedge is linear while many real exposures are not. The residual $(1-\rho^2)\sigma_S^2$ is **basis risk**. A perfect correlation is the special case $h^* = \sigma_S/\sigma_F$; a perfect one-for-one underlying is the further special case $h^* = 1$.

:::example An illustrative agricultural hedge {#ex-hedge-ratio}
A model farmer will sell $100{,}000$ bushels at harvest. A futures contract is on $5{,}000$ bushels. Over the horizon of the hedge, an illustrative calibration is $\rho = 0.85$, $\sigma_S = 0.25$, $\sigma_F = 0.22$. Compute $h^*$ and $N^*$.
:::solution
$$
h^* = 0.85 \times \frac{0.25}{0.22} = 0.9659,
$$

to four decimals. The farmer is short the spot in the sense of having a future sale, so the hedge is a *short* futures position of size

$$
\lvert N^*\rvert = 0.9659 \times \frac{100{,}000}{5{,}000} = 19.32
$$

contracts. A listed market does not trade $0.32$ of a contract; the nearest whole number is $19$. The residual variance fraction is $1 - \rho^2 = 1 - 0.7225 = 0.2775$, so about $28\%$ of the spot variance remains. These numbers are a worked regression, not a recommendation to sell nineteen contracts.
:::
:::

:::remark The hedge is a model, and the model leaves things out
Transaction costs, margin cashflow, taxes, the chance that the harvest size is itself random, and the chance that the futures expires before the harvest are all outside [[#eq-hstar]]. A hedge that is minimum-variance in $\Delta S$ and $\Delta G$ can still be a large P&amp;L in those extra dimensions. Later chapters on options and on [[derivatives/risk-management]] treat nonlinear and tail exposures; the linear hedge is the first, not the last, word.
:::

:::quiz
A planned purchase of the underlying is to be offset with futures. In the notation of [[#def-hstar]], with $Q_S > 0$ meaning the quantity to be bought, which sign of $N$ offsets a rise in the spot?
- [ ] Short futures ($N < 0$), because one always shorts futures to hedge
- [x] Long futures ($N > 0$), so that a higher spot is offset by a futures gain
- [ ] $N = 0$, because a purchase is not an exposure
- [ ] $N = Q_S / Q_F$ always, regardless of $\rho$
:::solution
A planned purchase loses money when the spot *rises*. A long futures gains when the futures rises. With $\rho > 0$ that is the offsetting sign. The slogan “hedgers short futures” describes a producer, not a consumer. The size $h^* Q_S/Q_F$ is not $Q_S/Q_F$ unless $\rho\,\sigma_S/\sigma_F = 1$.
:::
:::

## Evidence

The cost-of-carry identity is a no-arbitrage statement, not an empirical elasticity, but the *size* of the markets that trade these contracts is a matter of record.

Over-the-counter forwards and swaps dominate listed futures in notional terms. At end-June 2025 the BIS reported USD $846$ trillion of OTC derivatives outstanding by notional amount, of which interest-rate contracts were about $79\%$, and USD $21.8$ trillion of gross market value (BIS OTC derivatives statistics, November 2025 commentary). Foreign-exchange contracts, mostly forwards and FX swaps, stood at USD $155$ trillion notional, of which about USD $100$ trillion matured within a year. Notional amounts count the face of the contract, not the risk: two offsetting forwards add in notional and cancel in market value. Gross market value is the better scale for how much money is actually on the table, and even that is a replacement-cost snapshot, not a stress loss.

Exchange-traded futures — grains at the CBOT from the nineteenth century, currencies on the CME's International Monetary Market from 1972, equity-index and interest-rate futures from the 1980s — are smaller in notional and tighter in credit, because the clearing house nets and margins. The empirical regularity that short-dated FX and equity forwards sit close to interest-rate parity is a statement about liquid G10 pairs in ordinary times; it is not a theorem about every currency, every date, or every stress. Deviations from covered interest parity after 2008, documented in the BIS Quarterly Review and in Du, Tepper and Verdelhan (*Journal of Finance*, 2018), are a reminder that the assumptions of [[#prop-carry]] — unrestricted balance sheets, one rate for borrowing and lending — can fail as a description of banks.

Country examples of commodity forwards run well beyond Chicago. The Dalian Commodity Exchange lists iron ore and soybean meal futures that are a reference for East Asian steel and feed; the Multi Commodity Exchange of India lists bullion and energy contracts; the Johannesburg exchange lists maize. In each case the listed grade is not every producer's grade, so the hedge ratio of [[#def-hstar]] is the object of interest, not a one-for-one identity.

## Where this leads

A strip of forwards is a **swap**: [[derivatives/swaps]] prices a fixed-for-floating interest-rate swap as a portfolio of forward-rate agreements, and a currency swap as a pair of bonds. Once payoffs are allowed to be nonlinear, the same cash-and-carry idea is no longer static, and [[derivatives/options]] begins with calls and puts. The binomial tree of [[derivatives/binomial-model]] will manufacture an option by trading the underlying and a forward-equivalent cash position, rebalanced at each node. Throughout, the forward price $F_{0,T} = S_0 e^{(r-q)T}$ remains the mean of $S_T$ under the risk-neutral measure, and it is the natural numeraire for Black's formula in the next-but-one chapter.

:::history
**1848, Chicago Board of Trade.** The CBOT was organised on 3 April 1848 as a cash market for grain; forward or “to-arrive” contracts began to trade there almost immediately (CFTC, *History of the CFTC*). **1865.** On 13 October 1865 the CBOT adopted formal rules on margin and delivery, the usual marker for standardised futures. **1972.** The Chicago Mercantile Exchange opened the International Monetary Market and listed currency futures, moving the same machinery from grain to exchange rates. The sequence is an institutional history of standardisation and clearing, not a ranking of which contract a firm should use.
:::

:::summary
- A forward is a bilateral obligation to exchange an underlying at a strike $K$ on a date $T$. A futures is a standardised, daily-margined version of the same linear payoff.
- For an investment asset with no income, cash-and-carry gives $F_{0,T} = S_0 e^{rT}$. With a continuous yield $q$, $F_{0,T} = S_0 e^{(r-q)T}$. Discrete dividends subtract their present value from $S_0$ first.
- A foreign currency is an asset with yield $r_f$: $F_{0,T} = S_0 e^{(r-r_f)T}$. Storage on an investment commodity enters as a negative yield.
- The forward is not a physical forecast of $S_T$. It is the cost of manufacturing delivery with the asset and the bank account.
- When rates are deterministic, futures and forward prices coincide. Daily settlement changes the *timing* of cash, not the cumulative total $S_T - G_{0,T}$.
- The minimum-variance hedge ratio $h^* = \rho\,\sigma_S/\sigma_F$ is a regression slope. The residual $1-\rho^2$ is basis risk. The formula is a model with stated inputs, not a recommendation to trade $N^*$ contracts.
:::

## Exercises

:::exercise One-year carry {level=1 check="105.127"}
A non-dividend share has $S_0 = 100$. The continuous rate is $r = 0.05$. Enter the one-year forward price to three decimals. (Enter $F_{0,1}$.)
:::solution
[[#eq-carry]] gives $F_{0,1} = 100 e^{0.05} = 105.127$ to three decimals, as in [[#ex-house-forward]]. The figure is the financed cost of the share, not a forecast of $S_1$.
:::
:::

:::exercise A quarterly forward {level=1 check="101.258"}
With the same $S_0 = 100$ and $r = 0.05$, enter the three-month forward price to three decimals.
:::solution
$F_{0,0.25} = 100 e^{0.05 \times 0.25} = 100 e^{0.0125} = 101.258$ to three decimals.
:::
:::

:::exercise Long-forward settlement {level=1 check="8"}
A cash-settled forward is struck at $K = 102$. At maturity $S_T = 110$. Enter the long's settlement in units of money (positive means the long receives).
:::solution
The long payoff is $S_T - K = 110 - 102 = 8$. The short pays $8$. There is no option to cancel.
:::
:::

:::exercise Dividend adjustment {level=2 check="103.051"}
A share at $100$ pays a dividend of $2$ in a quarter of a year. With $r = 0.05$ continuous, enter the one-year forward price to three decimals.
:::solution
$I = 2 e^{-0.05 \times 0.25} = 1.975$, then $F = (100 - 1.975)e^{0.05} = 103.051$ to three decimals, as in [[#ex-discrete-div]]. Using $105.127$ would ignore the dividend the long forward does not receive.
:::
:::

:::exercise Dollar–euro parity {level=2 check="1.1222"}
Spot $1.10$ dollars per euro, $r = 0.05$, $r_f = 0.03$, $T = 1$. Enter the one-year forward in dollars per euro, to four decimals.
:::solution
$F = 1.10 e^{0.02} = 1.1222$ to four decimals, [[#ex-fx-forward]]. The higher dollar rate produces a dollar at a forward discount.
:::
:::

:::exercise Existing-forward value {level=2 check="4.877"}
A one-year long forward was struck at $K = 100$ when $S_0 = 100$, $r = 0.05$, $q = 0$. Enter its value today, to three decimals. (Enter $V_0$.)
:::solution
[[#eq-fwd-value]] with $t = 0$ gives $V_0 = 100 - 100 e^{-0.05} = 100 - 95.123 = 4.877$ to three decimals. Equivalently $e^{-0.05}(105.127 - 100) = 4.877$. The contract is no longer at-the-money in the forward: $K$ sits below $F_{0,1}$.
:::
:::

:::exercise Reverse cash-and-carry {level=3}
A quoted one-year forward on a non-dividend investment asset is $F = 102$ when $S_0 = 100$ and $r = 0.05$. Show that reverse cash-and-carry locks a positive cash amount at $T$, and compute that amount to three decimals. State the three positions.
:::hint
Short the asset, lend the proceeds, and go long the cheap forward. Compare $S_0 e^{rT}$ with $102$.
:::
:::solution
$S_0 e^{rT} = 105.127 > 102$. Short one unit of the asset, lend $100$, and enter a long forward at $102$. At $T$ the loan is worth $105.127$, the forward buys the asset for $102$, and the asset is returned to close the short. Locked cash is $105.127 - 102 = 3.127$. The three positions are: short asset, long cash (the loan), long forward. If the asset cannot be sold short, this arbitrage is not in the feasible set and the quoted $102$ can persist; that is the consumption-commodity case of [[#prop-carry-q]].
:::
:::

:::exercise Hedge-ratio arithmetic {level=3 check="19.32"}
In [[#ex-hedge-ratio]], $\rho = 0.85$, $\sigma_S = 0.25$, $\sigma_F = 0.22$, $Q_S = 100000$, $Q_F = 5000$. Enter $\lvert N^*\rvert$ to two decimals. Then, in the solution, compute the residual variance fraction $1-\rho^2$.
:::hint
$h^* = \rho\,\sigma_S/\sigma_F$, then $\lvert N^*\rvert = h^* Q_S / Q_F$.
:::
:::solution
$h^* = 0.85 \times 0.25 / 0.22 = 0.965909\ldots$, and $\lvert N^*\rvert = 0.965909 \times 20 = 19.32$ to two decimals. The residual variance fraction is $1 - 0.85^2 = 0.2775$. Rounding to $19$ whole contracts is a market constraint, not part of the formula. The calculation describes a two-variable variance, not a recommended trade.
:::
:::
