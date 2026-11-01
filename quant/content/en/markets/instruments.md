A price is a number attached to a contract. Before a rule can be a function of prices, the contract has to be named, because a cash share, a fund share, a currency quote and a futures price do not change hands in the same units. The previous chapter fixed the clock: a signal in $\mathcal{F}_t$ earns $R_{t+1}$ only after a map to a weight or an order is stated. This chapter says what that weight is a fraction of, and what an order is an order for.

The distinction is not a catalogue of products to prefer. It is a list of denominators. A move of two points means one thing for a share quoted in dollars and another thing for a futures contract whose multiplier turns points into currency. A single published price for a fund is one series, not five hundred. A dollar price of one euro is not a price of one dollar. Mixing those readings produces a P&L that the contract does not pay.

Throughout, illustrative prices are invented unless a date is taken from the history of the market structure itself. Nothing in the arithmetic is an invitation to hold the share, the fund, the currency or the future. The open library's long equity examples are mostly studies of exchange-traded fund prices; that is a fact about those pages, and it is not advice to use a fund.

## Cash equities

:::definition Cash equity {#def-equity}
A **cash equity** is a transferable share in a company, quoted as a currency price per share. A position of $q$ shares, with $q$ constant and with no dividend and no corporate action between the two times, has value $V_t = q P_t$. Its P&L is the change in that value. Its simple return, when $V_{t-1} \neq 0$, is $(V_t - V_{t-1}) / V_{t-1}$.
:::

The share is the claim. The price is what a buyer pays a seller in the secondary market under the rules of a venue, not an official appraisal of the company. Larry Harris's microstructure account, the reference listed for this course, is the right place for why a "price" during the day is a whole book of bids and offers. Here $P_t$ means the close you have agreed to use. Splits and dividends, which break the sentence "value equals $q$ times $P$" if you forget them, are the subject of [[markets/adjustment-universes-and-rolls]]. Until that chapter, every equity example states that no distribution and no split occurred.

Quantity and return come apart. The next proposition is the algebra behind a sentence people say loosely: "the return does not care how many shares you had." The P&L does care. A research report that quotes a return has not quoted a profit in currency until $q$ is stated, and a report that quotes a profit has not quoted a return until a denominator is stated.

:::proposition Quantity scales P&L, not the simple return {#prop-quantity}
Let a cash equity have no dividend and no corporate action on the step from $t-1$ to $t$, and let the share count $q$ be a non-zero constant. Then

$$
V_t - V_{t-1} = q\,(P_t - P_{t-1}),
$$

while

$$
\frac{V_t}{V_{t-1}} - 1 = \frac{P_t}{P_{t-1}} - 1,
$$

so the simple return does not depend on $q$.
:::

:::proof
By [[#def-equity]], $V_t = q P_t$ and $V_{t-1} = q P_{t-1}$. Subtracting gives $V_t - V_{t-1} = q P_t - q P_{t-1} = q(P_t - P_{t-1})$, which is the first identity. For the second, since $q \neq 0$ and $P_{t-1} \neq 0$,

$$
\frac{V_t}{V_{t-1}} = \frac{q P_t}{q P_{t-1}} = \frac{P_t}{P_{t-1}}.
$$

Subtract $1$ from both sides. The $q$ cancels. It does not cancel in the P&L, because the P&L is a difference of values rather than a ratio. If $q$ changed during the step because of a trade, the identity would need a cash term for the shares bought or sold, and the proposition would not apply. The constant-$q$ hypothesis is doing real work.
:::

:::example Ten shares on the first step of Path A {#ex-shares}
Path A begins with closes $100$ and $102$, in dollars per share. No dividend and no split occur. A position holds $q = 10$ shares across the step. Compute the P&L in dollars and the simple return. Then repeat the return for $q = 1$.
:::solution
The price change is $102 - 100 = 2$ dollars per share. By [[#prop-quantity]] the P&L is $10 \times 2 = 20$ dollars. The starting value is $10 \times 100 = 1000$ dollars, and $20/1000 = 0.02$. The simple return is $102/100 - 1 = 0.02$, the same figure as the first Path A return.

For one share the P&L is $2$ dollars and the return is again $0.02$. The return did not notice the change from $10$ shares to $1$. The profit in dollars did. A sentence such as "the position made $0.02$" has not said whether the holder is $2$ dollars richer or $20$ dollars richer. Both readings are consistent with the return. Only $q$ separates them.

This is the legal clock's raw material, not a completed rule. The return $0.02$ is $R$ on that step. A signal dated at the close $102$ is not allowed to book it as the signal's own profit. That prohibition was [[markets/systematic-question]]. Here the new point is the denominator: even a legal score needs a statement of what one unit of the return refers to.
:::
:::

## Exchange-traded funds

:::definition Exchange-traded fund {#def-etf}
An **exchange-traded fund** is a fund whose shares trade on a venue, with a published basket and a fee schedule. The traded price is the price of one fund share. To the extent the market prices the fund's net asset value, the fee is already inside the economics of that price. A rule computed from the fund price is a rule about one series. It is not a rule about each constituent of the basket.
:::

The definition refuses a common inflation of sample size. If a fund holds five hundred shares, a backtest on the fund's daily close is one backtest. It is not five hundred tests of a stock-picking rule, and it is not evidence about any single constituent. The basket, the fee and the fund's own corporate-action processing sit between the constituent prices and the print you stored. A researcher who wants the constituents has to store the constituents, at the membership that was knowable at the time, which is a different dataset.

Nor does the definition say that a fund is a good or a bad thing to hold. "The fee is inside the price" is a warning about double-counting, not a product review. If you subtract a fee you have already assumed the market price incorporates, you will charge the fund twice in the arithmetic. If you ignore a fee that is not in the series you stored, you will not charge it at all. The series has to be identified before either sentence is safe.

:::example One basket price, two constituents {#ex-basket}
Two cash equities are priced at $100$ dollars and $100$ dollars. At the next close they are priced at $110$ and $90$. An invented fund holds them in equal weights, with no fee on this step, and the market prices the fund at the basket value. What is the simple return of each constituent, and what is the simple return of the fund? Then change the example: the gross basket per fund share would have gone from $100$ to $105$, but an invented fee of $0.10$ dollars per fund share is deducted, and the traded net value is $104.90$. What simple return does the fund price show?
:::solution
The constituents' simple returns are $110/100 - 1 = 0.10$ and $90/100 - 1 = -0.10$. The equal-weight basket goes from $100$ to $(110 + 90)/2 = 100$, so the fund's simple return is $0$. A rule that is allowed to see only the fund price sees a flat close. It does not see that both names moved by ten percent in opposite directions. Reconstructing those two moves from the single print is impossible. The cross-section was thrown away by the act of storing one price.

In the fee variant the gross basket rose by $0.05$. The net price $104.90$ shows the simple return $104.90/100 - 1 = 0.049$. The $0.001$ gap is $0.10/100$, the fee divided by the starting price. The fee is invented for the arithmetic; it is not a quote from any real fund, and it is not a reason to prefer a fund with a different fee. The point of the subtraction is narrower. A backtest on the net price $104.90$ has already felt the fee. Subtracting $0.10$ again would report $104.80$ and a return of $0.048$, which is a different experiment, one that charges a cost the net series had already reflected.

[[#def-etf]] is what ties the two halves together. The fund price is one object. Constituent returns are other objects. A fee is inside the net object only to the extent your series is a net series. Saying which series you stored is part of the rule, in the same way that saying the map from signal to weight was part of the rule in the previous chapter.
:::
:::

:::warning A fund price is not five hundred results
Counting every constituent of the basket as if it had been tested separately is a sample-size error. The information set of a fund-price rule contains the fund price, not the private paths of the names inside it. If those names were in $\mathcal{F}_t$, the dataset would say so. Most of the long equity pages in the open library are studies of fund prices of this kind. Read them as studies of those prices. Do not multiply their evidence by the number of shares in the index a fund happens to follow, and do not read the remark as a suggestion to buy the fund.
:::

## Dollar quotes for spot currency

:::definition USD-quoted spot rate {#def-fx}
A **USD-quoted spot rate** is the dollar price of one unit of another currency. If the rate is $Q_t$, one unit of the other currency is worth $Q_t$ dollars in the spot convention you have stated. A rise in $Q$ is a rise in the dollar value of that unit. It is not, by itself, a rise in the dollar.
:::

The quoting convention is the whole definition. Traders also quote some pairs the other way round, as units of foreign currency per dollar. Those are different numbers. Inverting a series changes the simple return, and the new return is not the negative of the old one. A rule written on "the exchange rate" without the direction of the quote is not yet a rule.

A position of $q$ units of the other currency, held across a move from $Q_{t-1}$ to $Q_t$ with no interest credited on either currency, has a dollar P&L of $q(Q_t - Q_{t-1})$. Interest on the two currencies is part of a realistic currency return and is omitted from the examples below on purpose. When it is omitted, the omission is part of the experiment. The orders course will return to lot sizes; a quantity $q$ here is only a quantity, not a recommendation of a standard lot.

:::example A euro price in dollars, and its inverse {#ex-euro}
An invented USD-quoted rate for the euro moves from $1.0850$ to $1.0900$. Compute the dollar P&L of holding one euro, and of holding $10\,000$ euros, with no interest on either currency. Compute the simple return of the USD quote, and the simple return of the inverted series, in euros per dollar.
:::solution
The quote rises by $1.0900 - 1.0850 = 0.0050$ dollars per euro. One euro gains $0.0050$ dollars. Ten thousand euros gain $10\,000 \times 0.0050 = 50$ dollars. Scaling $q$ scales the dollar P&L and does not, by itself, tell you a return until you name a denominator. The simple return of the USD quote uses the quote itself as the denominator:

$$
\frac{1.0900}{1.0850} - 1 = \frac{218}{217} - 1 = \frac{1}{217} \approx 0.004608
$$

to six decimals. The exact value is the fraction $1/217$.

The inverted levels, in euros per dollar, are $1/1.0850$ and $1/1.0900$. Their simple return is

$$
\frac{1.0850}{1.0900} - 1 = \frac{217}{218} - 1 = -\frac{1}{218} \approx -0.004587
$$

to six decimals. The two returns have opposite signs, which is the part intuition gets right, and different magnitudes, which is the part intuition often misses. The positive return is $1/217$; the negative return is $-1/218$. Their sum is not zero. A rule that flips the quote and then multiplies the old return by $-1$ has used a false identity.

Nothing in the $50$ dollars is a suggestion to hold euros, or to hold ten thousand of them. The figure is $q$ times a price change under a stated convention. Change the convention to euros per dollar and both the sign of a "rise" and the simple return change with it.
:::
:::

:::quiz
A USD-quoted rate rises from $1.00$ to $1.25$. Which statement is correct?
- [ ] The dollar has risen, because the printed number rose
- [ ] The simple return of the inverted quote is $-0.25$
- [x] One unit of the other currency now costs $0.25$ dollars more, and the inverted simple return is $1/1.25 - 1 = -0.20$, not $-0.25$
- [ ] The P&L in dollars does not depend on how many units are held
:::solution
By [[#def-fx]] the printed number is dollars per unit of the other currency, so a rise is a rise in the dollar price of that unit. The USD-quoted simple return is $0.25$. The inverted simple return is $(1/1.25)/(1/1.00) - 1 = 0.80 - 1 = -0.20$, which is not $-0.25$. Dollar P&L equals quantity times $0.25$, so it does depend on quantity.
:::
:::

## Futures and the multiplier

A futures contract is a dated exchange-traded agreement. The quoted futures price is not a cash price of the underlying, and a one-point change in the quote is not a one-currency-unit change in wealth. The contract specifies a multiplier that converts points into currency. Leaving the multiplier out does not make the arithmetic conservative. It makes the unit wrong.

:::definition Futures contract {#def-future}
A **futures contract** in this chapter is specified by an underlying, an expiry, a quoted futures price $F$ in points, and a **multiplier** $m$: the currency value of a one-point move in $F$, per contract. A position of $n$ contracts, held across a change $\Delta F$ in the futures price used for marking, with no costs, has currency P&L

$$
n \times m \times \Delta F.
$$

The multiplier is part of the contract, not a view about leverage.
:::

Margin is not in that formula, and the omission is deliberate. Initial margin is collateral posted against the position. It is not the P&L, and it is not a unique denominator that turns the P&L into "the" return. Dividing a currency P&L by a collateral balance produces a ratio that depends on the collateral convention. A smaller collateral balance produces a larger ratio from the same P&L. That arithmetic is why leverage magnifies both gains and losses. This atlas does not suggest a collateral level, a leverage, or a futures position.

The formula also assumes the mark $\Delta F$ is the mark of the contract you hold. A continuous series stitched out of several expiries is a later construction. Holding the front contract through a roll is not the same object as holding one expiry to settlement. [[markets/adjustment-universes-and-rolls]] separates those objects. Until then, $\Delta F$ means a change in one contract's own price.

:::proposition One contract's P&L is the multiplier times the move {#prop-futures-pnl}
Assume one contract, a multiplier $m$, no transaction costs, and a mark-to-market change of $\Delta F$ points in the futures price of that contract. The currency P&L is $m \times \Delta F$. It is not $\Delta F$, unless $m = 1$.
:::

:::proof
By [[#def-future]] with $n = 1$, the currency P&L is $1 \times m \times \Delta F = m\,\Delta F$. The number $\Delta F$ is a change in points. The multiplier is what the contract says a point is worth in currency. Reporting $\Delta F$ as a P&L drops $m$ and changes the unit. The two numbers agree only in the special case $m = 1$, which is a fact about a contract, not a default. For $n$ contracts the same reasoning multiplies by $n$, giving $n\, m\, \Delta F$. The step from one contract to $n$ is the futures analogue of [[#prop-quantity]]: scaling the position scales the currency P&L. It still does not create a unique simple return, because the futures definition supplies a P&L and does not supply a unique denominator.
:::

:::example Multiplier 50, a two-point move {#ex-multiplier}
One equity-index futures contract has multiplier $50$ currency units per point. The futures price rises by $2$ points. Compute the P&L. Then compute the P&L of three contracts on the same move, of one contract on a move of $-2$ points, and of two contracts on a move of $2.5$ points.
:::solution
By [[#prop-futures-pnl]] one contract gains $50 \times 2 = 100$ currency units. The two-point move is not a P&L of $2$. The ratio of the currency P&L to the point move is the multiplier, $50$, which is the contract specification and not a performance ratio.

Three contracts gain $3 \times 50 \times 2 = 300$ currency units. One contract on a two-point fall loses $50 \times (-2) = -100$ currency units. The loss has the same magnitude as the gain on the rise because the formula is linear in $\Delta F$. Two contracts on a move of $2.5$ points gain $2 \times 50 \times 2.5 = 250$ currency units.

If someone divided the $100$ currency units by a collateral balance of $1\,000$, they would print $0.10$. If they divided the same $100$ by a collateral balance of $200$, they would print $0.50$. The contract paid $100$ either way. The denominator moved. Choosing the smaller collateral balance is leverage, and it magnifies a loss of $100$ in the same proportion as it magnifies the gain. No collateral balance is proposed here. The example stops at the currency P&L the contract defines.

A continuous vendor chart that moved two points because a roll gap was left in the series would not justify using $\Delta F = 2$ in this formula either. The formula applies to the contract that was held. A gap between two different expiries is not a mark-to-market of either one by itself. That distinction is enforced properly when rolls are defined; it is flagged here so the multiplier is not applied to a spliced print by reflex.
:::
:::

:::widget plot
f: 50*x; x
x: -4, 4
hlines: 0
labels: P&L of one contract; change in points
caption: The steep line is the currency P&L of one futures contract with multiplier 50, plotted against the change in the futures price. The shallow line is the price change itself. A two-point move sits at a P&L of 100 on the steep line and at 2 on the shallow line. They are not the same number. The figure is a contract specification, not a forecast and not a position to take.
:::

The widget is the proposition drawn as two lines through the origin. The slope of the steep line is the multiplier. Changing the contract changes the slope. Nothing in the picture says that a larger multiplier is desirable. A larger multiplier scales the loss as well as the gain, which is the same linearity that turned $+2$ points into $+100$ and $-2$ points into $-100$.

:::intuition Points are not dollars until the contract says so
An equity close of $100$ dollars and a futures price of $100$ points can sit next to each other on a screen and still be in different units. The equity P&L of one share, if the close moves to $102$ with no dividend and no split, is $2$ dollars. The futures P&L of one contract, if the futures price moves by $2$ points and the multiplier is $50$, is $100$ currency units. Equal printed moves, unequal results. The systematic rule has to name the contract before it names the profit.
:::

:::quiz
A futures price falls by $4$ points. The multiplier is $50$, and one contract is held. What is the currency P&L?
- [ ] $-4$, because the price fell by $4$
- [ ] $+200$, because a fall in the futures price pays the long contract
- [x] $-200$, because one contract's P&L is the multiplier times the move
- [ ] $-4/50$, because the multiplier belongs in the denominator
:::solution
[[#prop-futures-pnl]] gives $50 \times (-4) = -200$. The point move is not the P&L, the sign follows the sign of $\Delta F$ for a long contract, and the multiplier multiplies rather than divides. A short contract would need its own sign in the position count $n$.
:::
:::

:::history
On 16 May 1972 the International Monetary Market of the Chicago Mercantile Exchange listed currency futures, the first widely traded financial futures. Leo Melamed is the name usually attached to that listing. A currency exposure could thereafter be a futures price with a contract multiplier, not only a spot balance at a bank. The dollar P&L of a spot quantity, as in [[#ex-euro]], and the currency P&L of a futures position, as in [[#prop-futures-pnl]], are both well-defined and they are not the same function of "the exchange rate".

On 22 January 1993 the SPDR S&P 500 ETF, ticker SPY, began trading. State Street was the sponsor. Most of the long equity examples in the open library are studies of exchange-traded fund prices of this kind, not of a hand-built stock universe. [[#def-etf]] is the reason that fact matters for reading those pages. Neither date is a reason to trade currencies, nor a reason to trade that fund. Both dates name the objects later rules are computed from.
:::

:::application What a position means
Under the four definitions, "being long one unit" is four different sentences. One share is one share. One fund share is a claim on a basket, net of the fee to the extent the price is a net price. One euro, in a USD quote, is a dollar exposure of size equal to the quote. One futures contract is a point exposure of size equal to the multiplier. A weight $w_t$ from the previous chapter is a fraction of net asset value only after you say which of these values the net asset value is made of. An order for "one" is incomplete until the unit is one of these units.
:::

## Where this leads

[[markets/prices-and-bars]] asks what of the contract's price survives inside a bar: a tick, a high, a low, a close, and the close-to-close return a daily rule actually uses. The multiplier and the share count defined here remain the conversion from that return's price change into a P&L. Adjustments for splits, dividends and futures rolls, which can make a raw price change a fiction, are [[markets/adjustment-universes-and-rolls]].

:::summary
- A cash equity position of $q$ shares, with no dividend and no corporate action, has P&L $q$ times the price change. The simple return does not depend on $q$.
- An exchange-traded fund contributes one traded price. The basket and, to the extent the series is a net series, the fee are already inside that price. One fund backtest is not one backtest per constituent.
- A USD-quoted spot rate is dollars per unit of the other currency. Inverting the quote changes the simple return by more than a sign.
- One futures contract's currency P&L is the multiplier times the change in that contract's futures price. The point move alone is the wrong unit.
- Dividing futures P&L by collateral changes the ratio without changing the P&L. That is leverage, and no collateral level is suggested.
- On the worked numbers: ten shares from $100$ to $102$ make $20$ dollars and a return of $0.02$; a two-point futures move with multiplier $50$ makes $100$ currency units; a euro quote from $1.0850$ to $1.0900$ makes $0.0050$ dollars per euro.
- The 1972 currency-futures listing and the 1993 fund listing name objects. They are not instructions to hold either object.
:::

## Exercises

:::exercise One contract, two points {level=1 check="100"}
A futures contract has multiplier $50$. The futures price of that contract rises by $2$ points. One contract is held, and there are no costs. Enter the currency P&L.
:::solution
[[#prop-futures-pnl]] gives $50 \times 2 = 100$. The answer is not $2$. The multiplier is the contract's conversion from points to currency, and dropping it changes the unit of the result.
:::
:::

:::exercise Same return, different profit {level=1 check="0.02"}
A cash share goes from $100$ dollars to $102$ dollars with no dividend and no split. Enter the simple return. It does not depend on whether the position is one share or ten.
:::solution
By [[#prop-quantity]] the simple return is $102/100 - 1 = 0.02$. Ten shares have P&L $20$ dollars; one share has P&L $2$ dollars. The question asks for the return, so the share count cancels. If the question had asked for the P&L, the two positions would have been different answers, and a single check value would have been the wrong design.
:::
:::

:::exercise Dollar P&L of a euro quantity {level=1 check="50"}
The USD-quoted euro rate rises by $0.0050$ dollars per euro. No interest is credited. Enter the dollar P&L of holding $10\,000$ euros.
:::solution
Dollar P&L is quantity times the change in the quote: $10\,000 \times 0.0050 = 50$ dollars. The simple return of the quote is not $50$. It is the change divided by the starting quote, which this exercise does not give a reason to recompute; [[#ex-euro]] did that for a quote that started at $1.0850$ and got $1/217$. The $50$ dollars scale with the quantity you were told to use. They are not a suggested holding.
:::
:::

:::exercise Three contracts the other way {level=2 check="-300"}
The same multiplier is $50$. Three contracts are held, and the futures price falls by $2$ points. Enter the currency P&L.
:::solution
[[#def-future]] gives $n \times m \times \Delta F = 3 \times 50 \times (-2) = -300$. The sign is the sign of the price change for a long position. A positive $300$ would be the P&L of the opposite price change, which was the three-contract case in [[#ex-multiplier]]. Linearity makes the two figures mirror images. It does not make a loss into a gain.
:::
:::

:::exercise The basket that hides both moves {level=2 check="0"}
Two names go from $100$ and $100$ dollars to $110$ and $90$. An equal-weight fund, with no fee, is priced at the basket value. Enter the fund's simple return.
:::solution
The basket value per fund share goes from $(100+100)/2 = 100$ to $(110+90)/2 = 100$. The simple return is $100/100 - 1 = 0$. Each constituent moved by $0.10$ in absolute value, in opposite directions. [[#def-etf]] says those constituent returns are not in the fund-price information set. Entering $0.10$, or $0.20$, would be answering a different question, about the names, with a series that does not contain them.
:::
:::

:::exercise Inverting a one-dollar move {level=2 check="-1/218"}
Keep the euro quotes $1.0850$ and $1.0900$. Enter the simple return of the inverted series, in exact arithmetic the exercise already permits: the fraction this chapter derived.
:::solution
The inverted simple return is $1.0850/1.0900 - 1 = -1/218$. The USD-quoted simple return is $+1/217$, not the negative of a rounded decimal you paste back in. A student who answers $-0.004608$ has flipped the sign of the USD return and kept its magnitude. That magnitude is $1/217$, and $-1/217$ is not $-1/218$. The exact fraction is the answer the derivation produces. To six decimals $-1/218$ is $-0.004587$, which matches the worked example.
:::
:::

:::exercise Why the share count cancels {level=3}
Prove [[#prop-quantity]] in your own order, starting from $V = qP$, and then give a one-line counterexample in which the simple return does depend on a quantity because the hypothesis fails. Use a trade, a dividend, or a split as the failed hypothesis. You need not use a real corporate-action timetable.
:::hint
Cancel $q$ in the ratio $qP_t / qP_{t-1}$. Then change $q$ in the middle of the step, or add cash from a dividend, and watch the cancellation fail.
:::
:::solution
With $q$ constant and non-zero, $V_t / V_{t-1} = (q P_t)/(q P_{t-1}) = P_t/P_{t-1}$, so the simple returns of value and of price agree. The P&L $q(P_t - P_{t-1})$ keeps $q$. That is the proposition.

A small counterexample is enough. Suppose the price stays at $100$, so the price return is $0$, but a dividend of $1$ dollar per share is paid and the position is one share. Wealth goes from $100$ to $101$ if the dividend is kept as cash and the share price does not fall. The simple return of wealth is $0.01$, not $0$. The "no dividend" hypothesis failed, and the price return is no longer the wealth return. A split supplies another failure: a $2$-for-$1$ split that sends the price from $100$ to $50$ and the share count from $1$ to $2$ leaves wealth at $100$, so the wealth return is $0$ while the raw price return is $-0.5$. In both failures the quantity, or the cash thrown off by the share, enters the wealth ratio. The adjustment chapter builds the bookkeeping that puts those cases back into a clean series. Until it does, the proposition's hypotheses are part of the answer.
:::
:::

:::exercise Where a futures return would have to come from {level=3}
The currency P&L of one contract with multiplier $50$ on a two-point rise is $100$. Explain why the contract specification still does not determine a unique simple return, and why two different collateral balances produce two different ratios without either ratio being "the" result. Do not propose a collateral level.
:::hint
A simple return needs a denominator. List what [[#def-future]] provides, and what it does not. Then divide $100$ by two different positive numbers you label as hypothetical collateral, and say what stayed constant.
:::
:::solution
[[#def-future]] and [[#prop-futures-pnl]] fix a currency P&L, $m \times \Delta F = 100$, and a position of one contract. A simple return is a P&L divided by a starting value. The contract specification used in this chapter does not contain that starting value. Margin posted as collateral is one candidate people reach for, and it is not unique: a clearing house can set it, change it, and differ from another venue. Notional value of the underlying index is another candidate. They are different denominators.

Divide the same $100$ by a hypothetical collateral of $1\,000$ and the ratio is $0.10$. Divide it by a hypothetical collateral of $500$ and the ratio is $0.20$. The futures price, the multiplier, the position and the currency P&L did not change. The ratio did. The smaller denominator is a more leveraged convention, and it would have turned a P&L of $-100$ into $-0.20$ rather than $-0.10$. That magnification is the whole content of the comparison. It is not a collateral level to post, and it is not a return this atlas treats as the result of the contract. Report the currency P&L, or report a return together with the denominator and a statement that the denominator is a convention. Reporting a bare percentage from an unnamed collateral balance does neither.
:::
:::
