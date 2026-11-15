A yen–dollar rate of $150$ means that one US dollar buys $150$ Japanese yen. Tomorrow the number may be $148$ or $153$. That change is a relative price of two monies, and it is also a relative price of two interest-bearing assets. This chapter treats the exchange rate as an asset price: it is determined, in the first instance, by the demand for deposits and bonds denominated in different currencies, given expected future rates. Goods prices come in [[international-finance/ppp]]; output and policy come in [[international-finance/mundell-fleming]]. The foreign-exchange market is large enough that the accounting of [[international-finance/balance-of-payments]] is a rounding error on a day's turnover. In April 2025, OTC foreign-exchange turnover averaged \$9.6 trillion *per day* (BIS Triennial Central Bank Survey, preliminary results of 30 September 2025, net-net basis). The US dollar was on one side of $89.2$ per cent of those trades; the euro $28.9$ per cent, the yen $16.8$ per cent, sterling $10.2$ per cent, the Chinese renminbi $8.5$ per cent. The numbers in the worked examples are invented and are for education only — they are not investment or financial advice, and they are not a forecast of any rate.

## Nominal and real exchange rates

Two conventions are in use, and they reverse the meaning of a rise.

::: definition Nominal exchange rate {#def-nominal-e}
The **nominal exchange rate** $E$ in this course is the **home-currency price of one unit of foreign currency** — for Palmia, palms per rest-of-world unit. A *rise* in $E$ is a **depreciation** of the home currency: more palms per foreign unit. A *fall* is an **appreciation**. A **devaluation** is a depreciation of a *pegged* rate, announced by the authorities; a **revaluation** is the opposite. Under a float, the market depreciates or appreciates the currency; the central bank does not "devalue".
:::

The US newspaper convention is often the other way round for the dollar against the euro or sterling (dollars per euro is the same convention as ours if the United States is home; euros per dollar is the opposite). The yen is commonly quoted as yen per dollar. Always state which currency is in the numerator. A 2 per cent rise in $E$ is a 2 per cent depreciation of home only in [[#def-nominal-e]].

The price that matters for trade is not $E$ but $E$ adjusted for price levels.

::: definition Real exchange rate {#def-real-e}
Let $P$ be the home price level and $P^*$ the foreign price level, both measured as the money price of a comparable basket. The **real exchange rate** is

$$
Q = \frac{E P^*}{P}.
$$ {#eq-q}

A rise in $Q$ is a **real depreciation** of home: foreign goods become more expensive relative to home goods, so home producers become more competitive, other things equal. $Q$ is a relative price of *baskets*, not of monies. If $P$ and $P^*$ are consumer-price indices, $Q$ is the CPI-based real exchange rate. If they are unit labour costs, it is a competitiveness index. The two need not move together.
:::

If absolute purchasing power parity held, $Q$ would be constant (equal to $1$ after a choice of units). It is not; that is [[international-finance/ppp]]. For this chapter $Q$ is just a definition. Bilateral $Q$ against one partner is not the same as a **trade-weighted** or **effective** real exchange rate, which is a geometric average of bilateral $Q$s with trade weights. The BIS publishes narrow and broad effective exchange-rate indices; the IMF IFS publishes another set. When a paper says "the real exchange rate depreciated", it must name the index.

::: example Palms, dollars and a basket {#ex-e-q}
Palmia quotes $E = 2.00$ palms per dollar. Palmia's CPI is $P = 120$ and the US CPI is $P^* = 240$, on a common base. (a) Compute $Q$. (b) If $E$ rises to $2.20$ and the CPIs are unchanged, what is the percentage nominal and real depreciation of the palm? (c) If instead $P$ rises to $132$ with $E$ and $P^*$ unchanged, what happens to $Q$?
::: solution
(a) $Q = 2.00 \times 240 / 120 = 4.00$. One Palmia basket costs $120$ palms; one US basket costs $240$ dollars, which is $480$ palms, so the US basket is four Palmia baskets — that is $Q$. (b) $E$ rises $10$ per cent, so the palm depreciates $10$ per cent nominally. $Q' = 2.20 \times 240 / 120 = 4.40$, also a $10$ per cent real depreciation, because prices did not move. (c) $Q'' = 2.00 \times 240 / 132 \approx 3.636$, a real *appreciation* of about $9.1$ per cent: Palmia's goods became more expensive at a fixed $E$. Inflation with a peg is a real appreciation, a fact that will matter for crises and for the euro-area periphery.
:::
:::

::: warning Depreciation is not devaluation, and a fall in $E$ is not a fall in value in every quote
If a table quotes the palm as dollars per palm, a *fall* in the table is a depreciation of the palm. If the table quotes palms per dollar, a *rise* is a depreciation of the palm. Mixing the two is the most common arithmetic error in the subject. And a 10 per cent devaluation of a peg is a policy act; a 10 per cent depreciation under a float is a market outcome. The words are not interchangeable in print, even though both lower the foreign-currency value of home money.
:::

## The foreign-exchange market

The market is over-the-counter: dealers at banks and other financial firms quote bid and ask prices to each other and to customers. The BIS survey's \$9.6 trillion a day in April 2025 is turnover, not "the amount of trade that needs financing". Spot transactions were 31 per cent of the total; FX swaps 42 per cent; outright forwards 19 per cent; options and currency swaps the rest (BIS Triennial Survey 2025). Most of the swap and forward volume is hedging, market-making and the rolling of positions, not a one-for-one counterpart of the current account. London, New York, Singapore, Hong Kong SAR and Tokyo dominate the geography of dealing; the currency of invoice and the location of the dealer are different facts.

A **spot** deal is for delivery in two business days (T+2) in most pairs, T+1 in some. A **forward** deal locks in $E$ today for a settlement date $T$ in the future. The **forward exchange rate** $F$ is quoted today, in the same units as $E$. An **FX swap** is a spot sale plus a forward repurchase, the workhorse of short-term dollar funding. None of these contracts is a recommendation to transact; they are the objects whose prices the parity conditions relate.

::: definition Covered interest parity {#def-cip}
Let $i$ be the home nominal interest rate and $i^*$ the foreign rate, both for the same horizon as the forward, with no default risk. **Covered interest parity** (CIP) says that a covered foreign deposit and a home deposit must pay the same:

$$
1 + i = (1 + i^*)\frac{F}{E},
$$ {#eq-cip}

or, in the linear approximation $i \approx i^* + (F-E)/E$. The ratio $(F-E)/E$ is the **forward premium** on the foreign currency (the forward discount on the home currency, when it is negative). Assumptions: the two deposits are default-free, capital can move at the quoted rates, and there is no unpriced balance-sheet or regulatory cost of the forward book.
:::

::: proof
One home currency unit placed at home returns $1+i$. Converted at $E$ into foreign currency, placed abroad, and sold forward at $F$, it returns $(1/E)\times(1+i^*)\times F$ home units. If the two returns differed, an arbitrageur could borrow the cheap currency, invest in the dear, and cover with the forward, locking in a sure profit at zero net funds. With free capital and no frictions that profit cannot survive. Equality is [[#eq-cip]]. The argument is symmetric: it does not matter which currency is home.
:::

Before 2008, CIP held to a few basis points in the major pairs among Libor deposits. After 2008, and again after 2015, a CIP *basis* opened: dollar funding via the FX swap became systematically more expensive than direct dollar funding, of the order of tens of basis points for longer tenors (Du, Tepper and Verdelhan, *Journal of Finance*, 2018). The basis is a fact about dealer balance-sheet costs and regulation, not a free lunch sitting on the screen. CIP as [[#def-cip]] remains the right starting point; the basis is a measured deviation with a named friction.

::: example A yen–dollar forward {#ex-cip}
Take $E = 150$ yen per dollar, so Japan is home in [[#def-nominal-e]]. The one-year yen interest rate is $i = 0.5$ per cent and the one-year dollar rate is $i^* = 4.5$ per cent, both illustrative. Compute the one-year forward rate $F$ implied by [[#eq-cip]], and the forward premium on the dollar.
::: solution
$F = E \times (1+i)/(1+i^*) = 150 \times 1.005 / 1.045 \approx 144.26$ yen per dollar. The dollar is cheaper forward than spot: $(F-E)/E \approx -3.83$ per cent. That is the forward *discount* on the dollar, equal (approximately) to $i - i^* = -4.0$ per cent, the linearisation error being about $0.17$ percentage points. The yen, the low-interest currency, trades at a forward *premium*. CIP does not say the yen will appreciate; it says that covering a dollar deposit in the forward market eats the dollar's interest advantage. Whether the yen *does* appreciate is uncovered parity, next.
:::
:::

::: widget plot
f: 100*(1+r)/(1+0.045)-150; 0
sliders: r=0.005:0:0.08:0.001
x: 0, 1
y: -20, 10
labels: \text{F-E at this } i; \text{zero}
caption: Illustrative CIP. $E=150$ yen per dollar and $i^*=4.5$ per cent are fixed; drag the yen rate $r$. The curve is the implied $F-E$. At $r=0.005$ the dollar is at a forward discount of about $5.7$ yen. The rates are invented.
:::

The widget's horizontal axis is a dummy (the functions do not use $x$); read the intercept. Raising the yen rate toward $4.5$ per cent shrinks the forward discount on the dollar toward zero, which is [[#eq-cip]].

## Uncovered interest parity and the asset approach

Covering with the forward removes exchange-rate risk. Not covering leaves it.

::: definition Uncovered interest parity {#def-uip}
Let $E^e$ be the expected future spot rate for the same horizon as $i$ and $i^*$. **Uncovered interest parity** (UIP) says

$$
1 + i = (1 + i^*)\frac{E^e}{E},
$$ {#eq-uip}

or $i \approx i^* + (E^e - E)/E$. The term $(E^e - E)/E$ is the expected depreciation of home. Assumptions: risk-neutral investors (or a zero FX risk premium), rational expectations, and the same default-free, frictionless market as CIP. If CIP and UIP both hold, $F = E^e$: the forward rate is the expected spot.
:::

UIP is a behavioural parity, not an arbitrage. A deviation is not a sure profit; it is a risky expected profit. The **Fama regression** of realised depreciation on the forward discount typically finds a slope *less than one*, often negative, in major pairs at horizons of months to a few years (Fama, *Journal of Monetary Economics*, 1984; the subsequent "Fama puzzle" or "forward-premium puzzle" literature). Competing accounts: a time-varying risk premium; peso problems and rare disasters; slow adjustment of expectations; CIP itself failing. This course treats UIP as the benchmark in the models of later chapters and reports the puzzle as evidence, not as a trading rule. A negative Fama slope has been a sample fact in many dollar pairs; it is not a theorem, and it is not advice to "go long the high-interest currency".

::: proposition The asset-approach jump {#prop-asset}
Assume UIP, a foreign interest rate $i^*$ taken as given, and an expected future rate $E^e$ that does not jump when today's news arrives (the news is about *today's* $i$, not about the long-run). Then, to a linear approximation,

$$
\frac{dE}{E} = \frac{di - di^*}{1+\text{elasticity of }E^e\text{ in }E} \approx di - di^*
$$

when $E^e$ is held fixed: a fall in the home interest rate depreciates the home currency today, one-for-one in the simplest case. If the same news *also* raises $E^e$ (the currency is expected to be weaker in the future too), today's $E$ jumps *more* than one-for-one. If the news lowers $E^e$, today's jump is damped.
:::

::: proof
Log-linearise [[#eq-uip]]: $i = i^* + e^e - e$ in logs, with $e = \ln E$. Differentiate, holding $i^*$ fixed: $di = de^e - de$. If $de^e = 0$, then $de = -di$: a lower home rate requires a higher $E$ today, so that expected *appreciation* ($e^e - e < 0$) makes home deposits acceptable. If $de^e = \rho\, de$ with $\rho < 1$ (regressive expectations toward a long-run rate that itself may move), then $di = (\rho-1)\, de$ and $de = di/(\rho-1)$, which is a larger jump because $\rho-1 < -1$ is false — $\rho-1$ is between $-1$ and $0$, so $\lvert de\rvert > \lvert di\rvert$. That extra jump is the seed of Dornbusch overshooting in [[international-finance/mundell-fleming]].
:::

::: example An interest-rate cut with a fixed $E^e$ {#ex-uip-jump}
Palmia's rate is $i = 5$ per cent, the foreign rate is $i^* = 5$ per cent, and $E = E^e = 2.00$. UIP holds. Palmia cuts $i$ to $3$ per cent; $i^*$ and $E^e$ are unchanged. What is the new $E$ from [[#eq-uip]]? Interpret the expected change.
::: solution
$1.03 = 1.05 \times E^e / E$, so $E = 1.05 \times 2.00 / 1.03 \approx 2.039$. The palm depreciates about $1.94$ per cent on the announcement. Expected *subsequent* change is $(2.00-2.039)/2.039 \approx -1.91$ per cent: the palm is now expected to *appreciate* back toward $2.00$, and that expected appreciation of about $1.91$ per cent plus $i = 3$ per cent matches $i^* = 5$ per cent, up to the linearisation. The jump is the whole adjustment of $E$ today; the path afterward is an expected appreciation. If $E^e$ had risen with the cut — because the cut signalled a permanently weaker palm — $E$ would have jumped further.
:::
:::

::: intuition $E$ is a jump variable
Goods prices are sticky in the short run; the exchange rate is not. UIP is an equilibrium in a market that can reprice between two quotes. That is why monetary news shows up in $E$ within minutes and in the CPI over months, and why [[#prop-asset]] is the right first model of a floating rate even before we specify goods-market equilibrium. The money market determines $i$; UIP then determines $E$ given $E^e$; $E^e$ is pinned down by the long run in later chapters.
:::

::: quiz
CIP holds with $E = 100$, $i = 2$ per cent, $i^* = 5$ per cent, one-year horizon. What is $F$?
- [ ] $103.00$
- [x] $97.14$ (approximately)
- [ ] $102.94$
- [ ] $105.00$
::: solution
$F = 100 \times 1.02/1.05 \approx 97.14$. The home currency, with the lower interest rate, is at a forward *premium* ($F < E$ means fewer home units per foreign unit in the future, an appreciation of home in the forward market). $105$ would have the ratio upside down.
:::
:::

## The money market and a first look at $E^e$

UIP needs $i$ and $E^e$. In the closed-economy IS–LM model of [[macroeconomics/is-lm]], $i$ clears the money market: $M/P = L(Y, i)$, with $L$ increasing in $Y$ and decreasing in $i$. That relation survives in the open economy. For given $Y$ and $P$, a higher $M$ lowers $i$. [[#prop-asset]] then depreciates $E$ today. Permanence matters because $E^e$ depends on the future path of $M$. A *temporary* rise in $M$ lowers $i$ and depreciates $E$, but $E^e$ barely moves, so the jump in $E$ is about the interest differential. A *permanent* rise in $M$ also raises the long-run price level and, by purchasing power parity, the long-run $E$; $E^e$ jumps, and today's $E$ jumps more. That is the monetary approach, completed in [[international-finance/ppp]], and the overshooting model of [[international-finance/mundell-fleming]].

Under a **peg**, $E$ is an exogenous policy number and $E^e = E$ if the peg is credible. UIP then forces $i = i^*$. The money market can no longer set $i$; $M$ becomes endogenous, as the central bank buys or sells foreign exchange to hold $E$. That is the trilemma of [[international-finance/exchange-rate-regimes]] in one paragraph.

::: example Peg versus float, same UIP {#ex-peg-float}
Palmia and the rest of the world start at $i = i^* = 5$ per cent, $E = 2$. Palmia's central bank wants $i = 3$ per cent. (a) Under a credible peg, what must happen? (b) Under a float, with $E^e$ still $2$, what happens to $E$?
::: solution
(a) UIP with $E^e = E$ requires $i = i^*$. The bank cannot have $i = 3$ per cent unless it lets the peg go, imposes capital controls (so that UIP need not hold), or persuades the foreign central bank to cut $i^*$ too. With open capital and a peg, $M$ will leak until $i$ is back at $5$ per cent. (b) From [[#ex-uip-jump]], $E$ jumps to about $2.039$. The bank gets the rate it wanted; the currency depreciates. Those are the two corners of the trilemma. Intermediate regimes try to have a bit of both, and are the subject of a later chapter.
:::
:::

::: widget cobweb
g: 2.04 + 0.5*(x-2.04)
x0: 2.20
steps: 16
x: 1.8, 2.4
y: 1.8, 2.4
caption: A toy regressive-expectation map $E_{t+1}^e = \bar E + 0.5(E_t - \bar E)$ with $\bar E = 2.04$. Start away from $2.04$ and watch the cobweb spiral in. This is not a market forecast; it is the algebra of [[#prop-asset]] when expected rates are dragged toward a long-run level. Try a starting value of $2.00$.
:::

## Evidence

**Turnover and the dollar.** The BIS triennial survey is the standard source. April 2022 turnover was \$7.5 trillion a day; April 2025 was \$9.6 trillion (BIS, 30 September 2025). The dollar's share on one side of trades has been near 85–90 per cent in every survey since the 1990s. That is the operational meaning of a vehicle currency: pairs such as BRL/KRW are still often dealt via the dollar. The renminbi's share rose to $8.5$ per cent in 2025 from smaller figures a decade earlier; it remains far below the dollar.

**CIP after 2008.** Du, Tepper and Verdelhan (2018) document a persistent CIP basis between FX-implied dollar rates and Libor (later SOFR) dollar rates, larger at quarter-ends when dealer balance sheets are reported. The basis is a laboratory for limits to arbitrage, not a contradiction of the no-arbitrage *idea*: the missing price is the shadow cost of bank capital.

**UIP and the Fama puzzle.** Surveys of UIP tests (Engel, *Handbook of International Economics*, 2014) report that the Fama slope is typically below one and often negative for major floating pairs at 1–12 month horizons. At longer horizons, and for some emerging-market pairs, results are more mixed. Carry-trade returns in sample are a restatement of the same fact; they are not a recommended strategy, they have crash risk, and they can vanish in a subsample.

**High-frequency jumps.** Intraday studies around scheduled monetary announcements (Andersen, Bollerslev, Diebold and Vega, *American Economic Review*, 2003, and the later high-frequency identification literature) find that a surprise tightening appreciates the currency within minutes. That is [[#prop-asset]] on a clock the goods market cannot match.

Country examples outside the G10 belong here too. The Central Bank of Kenya's shilling, the Reserve Bank of India's rupee, and the Central Bank of Brazil's real are all quoted against the dollar as the primary pair; their onshore forward and NDF markets price CIP-like relations with an onshore–offshore basis that can be large when capital controls bind (IMF AREAER and IFS, various years). The parity conditions are the same; the frictions are not.

::: remark Risk premia in one line
A convenient generalisation of UIP is $i = i^* + (E^e-E)/E + \rho$, where $\rho$ is an FX **risk premium** paid to holders of home currency. A positive $\rho$ means home deposits pay more than UIP. Models of $\rho$ (portfolio balance, crash risk, convenience yields on dollar safe assets) are a research field. In the undergraduate models of this course $\rho = 0$ unless a chapter says otherwise. Setting $\rho = 0$ is a modelling choice, not a finding that $\rho$ is zero in the data.
:::

## Where this leads

Relative prices of goods, and the long-run anchor for $E^e$, are [[international-finance/ppp]]. The current account as an intertemporal choice, with $Q$ in the budget, is [[international-finance/current-account]]. Output, sticky prices and overshooting are [[international-finance/mundell-fleming]]. The choice to peg $E$ and give up $i$, or to float $E$ and keep $i$, is [[international-finance/exchange-rate-regimes]]. When $E^e$ jumps because the peg is no longer believed, UIP becomes a crisis condition: [[international-finance/crises]].

::: history
Covered interest parity is as old as organised forward markets. Keynes discussed the forward premium as an interest differential in *A Tract on Monetary Reform* (1923), in the chapter on the forward market. Einzig's *The Theory of Forward Exchange* (1937) is the interwar reference. The modern asset approach — the exchange rate as the relative price of monies and of bonds, jumping with news — is a 1970s construction: Frenkel (1976, *Scandinavian Journal of Economics*), Mussa (1976, *Scandinavian Journal of Economics*), and Dornbusch (1976, *JPE*) are the canonical papers. Fama's 1984 regression made the failure of UIP as a statistical model impossible to ignore. The post-2008 CIP basis reopened a parity that textbooks had treated as an identity.
:::

::: summary
- $E$ is home currency per foreign unit; a rise is a depreciation of home. $Q = E P^*/P$ is the real exchange rate; a rise is a real depreciation of home.
- CIP is an arbitrage: $1+i = (1+i^*)F/E$. It held tightly in major pairs before 2008 and has held only up to a balance-sheet basis since.
- UIP is a risk-neutral expectations condition: $1+i = (1+i^*)E^e/E$. The Fama puzzle is that realised depreciation has not matched the forward discount one-for-one.
- The asset approach: for given $E^e$, a fall in $i-i^*$ depreciates $E$ today so that expected appreciation restores equality. If $E^e$ rises too, $E$ jumps more.
- Under a credible peg, UIP forces $i=i^*$ and $M$ is endogenous. Under a float, $M$ sets $i$ and $E$ jumps.
- BIS April 2025 turnover was \$9.6 trillion a day; the dollar was on one side of 89.2 per cent of trades. Those are market-structure facts, not forecasts.
:::

## Exercises

::: exercise Quote arithmetic {level=1 check="2.06"}
$E = 2.00$ palms per dollar. The palm depreciates $3$ per cent. Enter the new $E$.
::: solution
A depreciation of home is a rise in $E$: $2.00 \times 1.03 = 2.06$.
:::
:::

::: exercise Real rate {level=1 check="4"}
$E = 2$, $P^* = 240$, $P = 120$. Enter $Q$.
::: solution
$Q = 2 \times 240 / 120 = 4$, as in [[#ex-e-q]].
:::
:::

::: exercise CIP forward {level=1 check="144.26"}
$E = 150$ yen per dollar, $i = 0.5$ per cent, $i^* = 4.5$ per cent, one year. Enter $F$ to two decimals.
::: solution
$F = 150 \times 1.005/1.045 \approx 144.26$, as in [[#ex-cip]].
:::
:::

::: exercise Linear CIP {level=2 check="-0.04"}
In the linear approximation, $i = 0.005$, $i^* = 0.045$. Enter $(F-E)/E$.
::: solution
$(F-E)/E \approx i - i^* = -0.04$. The exact CIP figure in [[#ex-cip]] is about $-0.0383$; the exercise asks for the linearisation.
:::
:::

::: exercise UIP jump {level=2 check="2.039"}
$i$ falls from $5$ per cent to $3$ per cent, $i^* = 5$ per cent, $E^e = 2.00$ fixed. Enter the new $E$ to three decimals.
::: solution
$E = 1.05 \times 2.00 / 1.03 \approx 2.039$, as in [[#ex-uip-jump]].
:::
:::

::: exercise Real appreciation under a peg {level=2 check="3.636"}
$E = 2$ is pegged, $P^*$ stays $240$, $P$ rises from $120$ to $132$. Enter the new $Q$ to three decimals.
::: solution
$Q = 2 \times 240 / 132 \approx 3.636$. The real exchange rate *fell*: a real appreciation of home.
:::
:::

::: exercise CIP with a basis {level=3}
A dollar deposit pays $i^* = 4.50$ per cent. A yen deposit pays $i = 0.50$ per cent. Spot $E = 150$ yen per dollar. The one-year forward is $F = 145.00$, not the CIP value. (a) Compute the CIP-implied $F$. (b) Compute the CIP basis as the extra yen return on a covered dollar deposit relative to the yen deposit, in percentage points. (c) Why is this not an arbitrage in the sense of [[#def-cip]]'s proof if dealer balance-sheet costs are 15 basis points?
::: hint
Covered dollar return in yen is $(F/E)(1+i^*)-1$. Compare with $i$.
:::
::: solution
(a) CIP $F = 150 \times 1.005/1.045 \approx 144.26$. (b) Covered dollar return is $(145/150)\times 1.045 - 1 = (0.96667)\times 1.045 - 1 \approx 0.01017$, or $1.017$ per cent. The yen deposit pays $0.50$ per cent. The gap is about $0.517$ percentage points: the covered dollar pays *more* in yen than the yen deposit, so the basis is a cheaper yen (dearer dollar) in the swap than CIP. Equivalently, FX-implied dollar rate from $F=145$ is $i^*_{\text{impl}} = (E/F)(1+i)-1 = (150/145)\times 1.005 - 1 \approx 0.03966$, about $3.97$ per cent, 53 basis points below $4.50$ per cent. (c) An arbitrageur who tries to harvest the $0.52$ percentage points must warehouse the forward, post capital, and fund in the wholesale market. If those costs are $0.15$ percentage points the residual is smaller; if they are $0.52$ or more the basis is a price of the constraint, not a free lunch. Du, Tepper and Verdelhan (2018) is the measurement of that price. The exercise is arithmetic on invented quotes, not a recommendation to put the trade on.
:::
:::

::: exercise Asset-approach news {level=3}
Home and foreign start at $i = i^* = 4$ per cent, $E = E^e = 1$. Consider two news items, each holding $i^*$ fixed. (a) A *temporary* cut of $i$ to $2$ per cent, with $E^e$ still $1$. Find $E$. (b) A *permanent* cut that also raises $E^e$ to $1.02$. Find $E$. (c) In one sentence, why the jump is larger in (b). Use [[#eq-uip]].
::: hint
Solve $1+i = (1+i^*)E^e/E$ for $E$ in each case.
:::
::: solution
(a) $1.02 = 1.04 \times 1 / E$, so $E = 1.04/1.02 \approx 1.0196$. (b) $1.02 = 1.04 \times 1.02 / E$, so $E = 1.04 \times 1.02 / 1.02 = 1.04$. (c) In (b) the long-run rate has itself depreciated, so today's $E$ must jump further to preserve the expected-*appreciation* gap that UIP needs at the lower $i$. That is [[#prop-asset]] with a moving $E^e$, and it is why permanent monetary shocks move $E$ more than transitory ones of the same size.
:::
:::
