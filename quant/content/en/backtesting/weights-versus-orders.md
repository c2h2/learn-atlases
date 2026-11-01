"Moving-average trend, equity exchange-traded funds, about a quarter of a century" is a story, not a protocol. The open library contains two pages that a careless summary would call the same story. Their reported compound annual growth rates differ by $4.05$ percentage points. The pages do not differ by one ingredient, so the gap does not have one cause. This chapter says what the two modes actually compute, then puts the two reported rows in one place and refuses the single-cause reading.

A weight is a target fraction of net asset value. An order is a message. The message may be filled, filled in part, or not filled. A backtest that writes down the fraction and assumes the fraction was obtained has answered a different question from a backtest that sends the message and keeps the fill. Neither answer is a broker, and neither is advice to hold a fund, a sector or a moving average.

## Two ways to finish the pipeline

Recall the pipeline in [[backtesting/the-backtest-as-an-experiment]]: after a signal comes a map, then a fill, then a position, then net asset value. Weight mode and order mode are two maps, with two fill stories attached.

:::definition Weight mode {#def-weight}
**Weight mode** replaces the book with a vector of target weights at a stated rebalance time. In the examples of this chapter, unless a sentence says otherwise, fractional holdings are allowed, the account is marked at the fill price, there is no fee, and a rebalance to the target is assumed to trade in full at that price. The position after the rebalance is whatever share count the target weight implies. A weight-mode report that does not state the rebalance policy — every bar, a calendar, or a drift band — is an incomplete protocol.
:::

:::definition Order mode {#def-order}
**Order mode** submits messages. A market order, in the examples below, demands an immediate fill at a stated price for a stated quantity. A limit order demands a fill only at the limit price or better, and it may receive nothing. Cash is updated by the fill price times the filled quantity, not by the target weight. If the protocol forbids borrowing, an order larger than the cash is not a silent full fill. Partial fills are allowed when the example says so. The position is the cumulative filled quantity, which need not match the quantity the signal asked for.
:::

The library's own description of the split, as recorded for the QuantJourney engine (Apache-2.0) and read in 2026, is that weight mode sets target weights and order mode submits explicit orders. This atlas has not re-run those examples. The definitions above are the classroom versions used for the arithmetic that follows. They are not a claim that every line of that engine matches the simplifications stated here, and they are not instructions to send either kind of message.

:::intuition A target is a wish until something trades
Net asset value can be written $V = C + q P$, cash plus shares times a mark. A target weight $w^\star$ is a wish about $q P / V$. Weight mode, under [[#def-weight]], grants the wish by assumption. Order mode grants it only to the extent the message comes back filled. The interesting failures are the ones in which the assumption is false and the report still prints $w^\star$.
:::

## When the printed weight is the real one

:::proposition Full fill, missed limit {#prop-fillweight}
Let net asset value be $V > 0$, the mark be $P > 0$, cash be $C$ and the share count be $q$, with $V = C + q P$. Suppose no other position changes, fractional shares are allowed, and there is no fee.

If a market order of $\Delta$ shares fills in full at the mark $P$, the new share count is $q' = q + \Delta$, cash becomes $C - \Delta P$, and net asset value is unchanged. The choice

$$
\Delta = \frac{w^\star V}{P} - q
$$

produces the new weight $q' P / V = w^\star$.

If instead a limit order does not trade, then $\Delta = 0$, the weight stays at $q P / V$, and this equals $w^\star$ only when the account was already there.
:::

:::proof
After a full fill at the mark, cash plus inventory is

$$
(C - \Delta P) + (q + \Delta) P = C + q P = V.
$$

The new weight is $(q + \Delta) P / V$. Set this equal to $w^\star$ and solve: $q + \Delta = w^\star V / P$, so $\Delta = w^\star V / P - q$. That quantity is admissible under the fractional-share sentence in the proposition.

If the limit does not trade, $\Delta = 0$ and the identity $V = C + q P$ is untouched, so the weight is the pre-trade weight. Equality with $w^\star$ is then a statement about the past, not about the order.
:::

The proposition is an accounting identity under stated assumptions. It does not say that market orders are preferable to limits, or that a target of one half is a portfolio to hold. It says that a report which prints the target after a limit that did not trade has skipped the second paragraph.

:::example A market order that meets the target {#ex-market}
Net asset value is $1000$ units of account, all of it cash, and the mark is $100$. The target weight is $0.5$. Fractional shares are allowed, and a market order fills at $100$. What quantity is sent, and what weight results?
:::solution
The formula in [[#prop-fillweight]] gives $\Delta = 0.5 \cdot 1000 / 100 - 0 = 5$. Cash becomes $1000 - 500 = 500$. Inventory is marked at $5 \cdot 100 = 500$. Net asset value stays $1000$. The weight is $500/1000 = 0.5$. The target is met because the protocol assumed a full fill at the mark. That assumption is the result as much as $0.5$ is.
:::
:::

:::example A limit that never trades {#ex-miss}
The same account sends a buy limit at $99$ for the five shares of [[#ex-market]]. The protocol says the limit fills only if the price trades at $99$ or better for the buyer, and in this bar the low is $100$. What is the filled quantity, and what is the weight?
:::solution
The low never reaches the limit, so the filled quantity is $0$ and $\Delta = 0$. Cash stays $1000$, the share count stays $0$, and the weight stays $0$, not $0.5$. A weight-mode line that writes $0.5$ for this bar, under a rule whose implementation was this limit, is a different experiment. It has replaced [[#def-order]] with [[#def-weight]]. The missed fill is not a reason to prefer market orders. It is a reason to name the order type before reading the weight.
:::
:::

:::example A partial fill, marked away from the fill {#ex-partial}
Start again from $1000$ units of cash. A buy limit at $99$ is filled for $2$ shares only. The bar then closes at $100$, and the account is marked at the close. What is the weight?
:::solution
Cash out is $2 \cdot 99 = 198$, so cash is $802$. The mark on the inventory is $2 \cdot 100 = 200$, not $198$. Net asset value is $802 + 200 = 1002$, higher than $1000$ by the two units of mark-to-market from the fill price to the close. The weight is $200/1002 = 100/501$, which equals $0.199601$ to six decimal places. It is not $0.5$, and it is not $198/1000$. The mark and the fill were different prices. Leaving that sentence out would produce a third weight.
:::
:::

Two further constraints are easy to omit because weight mode, as defined for a single target, never sees them.

A whole-share rule is a change of protocol. Target notional $500$ at a price of $30$ is $500/30 = 16.\overline{6}$ shares. If the rule rounds down to a whole share and refuses to exceed the target notional, the account buys $16$ shares, notional $480$, weight $480/1000 = 0.48$. Rounding to the nearest share would buy $17$ and spend $510$, a weight of $0.51$, which breaks the "do not exceed" sentence. The weight $0.48$ is what this rule did. It is not a rounding error in the report. It is the report.

A cash constraint is another change. Let net asset value be $1000$, of which $700$ is an inventory you are not allowed to sell in this protocol and $300$ is cash. The new asset is marked at $50$, borrowing is forbidden, and no other sale is permitted. The most you can spend is $300$, which is $6$ shares and a weight of $0.3$. A weight-mode instruction that sets the new weight to $0.5$ without saying which other weight falls is an incomplete protocol. If the financing is a sale of the existing inventory, that sale is a second order, or a second target, and it belongs in the write-up. Order mode makes the missing cash visible because the message cannot spend what the cash line does not hold.

:::remark Financing is part of the map
The identity map from a signal to a weight, used on Path A in [[backtesting/the-backtest-as-an-experiment]], never had to raise cash: the weight was a number in a return formula, $w_t R_t$, not a share count against a balance sheet. That was a legitimate protocol only because it said so. The moment the experiment claims to be an order in a single account, [[#prop-fillweight]] and the cash check apply. Mixing the two languages in one paragraph is how a target of $0.5$ survives a limit that bought nothing.
:::

:::quiz
After a limit that does not trade, the weight of the account is which of the following?
- [ ] The target weight, because the order expressed the target
- [x] The pre-trade weight
- [ ] Zero, because an unfilled order cancels the position
- [ ] One half, if the target was one half
:::solution
[[#prop-fillweight]] with $\Delta = 0$ leaves $q$ and $C$ unchanged, so the weight stays where it was. Printing the target anyway is weight mode, not a description of this limit.
:::
:::

:::widget regression
points: 0,0.001; 1,0.004; 2,-0.002; 3,0.006; 4,0.003
degree: 1
residuals: true
caption: Drag a point. The line is a least-squares fit of an invented later return on an invented earlier signal. A missed limit removes a trade rather than moving the account onto the target weight. The points are not a market and not a forecast.
:::

## Two library rows, and a gap with no single author

The comparison this chapter owes you is between two catalogue rows. Both figures below are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run either backtest. Neither row is a forecast, and neither is a fund to buy.

O01, "Market SMA Cross", buys when a 20-day simple moving average crosses above a 50-day average and sells on the reverse, with market orders, on equity exchange-traded funds, daily bars, over 25 years. The reported total return is $+126.66\%$, the reported compound annual growth rate is $+3.33\%$, the reported Sharpe ratio is $0.21$, the reported maximum drawdown is $-16.35\%$, the reported win rate is $51.9\%$ and the reported profit factor is $2.18$.

W01, "Daily SMA Trend", holds each sector exchange-traded fund while a 50-day average is above a 200-day average, and rebalances daily, on daily bars, over 26 years. The reported total return is $+537\%$, the reported compound annual growth rate is $+7.38\%$, the reported Sharpe ratio is $0.45$, the reported maximum drawdown is $-34.7\%$, the reported win rate is $72.6\%$ and the reported profit factor is $2.48$.

The reported compound annual growth rates differ by $7.38 - 3.33 = 4.05$ percentage points. The reported drawdowns differ too: W01's reported hole is deeper. A higher reported growth rate sitting next to a deeper reported drawdown is already enough to stop a one-word ranking. There is more, because the protocols differ in at least four places at once.

- The windows are $20/50$ against $50/200$. A short pair and a long pair are different features, not two spellings of "trend".
- The implementation is market orders on a cross, against daily target weights while a slow average is above a slower one. That is [[#def-order]] against [[#def-weight]], and it is a cross against a holding rule.
- The spans are 25 years against 26 years. A compound annual growth rate does not cancel a different window; it only rescales the path the page actually had.
- The book is a cross on equity exchange-traded funds, against a sector book held name by name. The catalogue line for O01 does not say "one ticker", and this atlas will not invent a universe the line does not state. It will say that a sector book rebalanced daily is not the same design as a cross traded with market orders.

This atlas refuses to attribute the $4.05$ percentage-point gap to weight mode, or to the longer averages, or to the extra year, or to the sector book. Four doors are open. Closing three of them would be a new experiment, and this atlas has not run it. Calling W01 "what O01 would have been in weight mode" is precisely the sentence [[#prop-fillweight]] forbids: it prints a target the protocol did not isolate. The same refusal applies in the other direction. O01's shallower reported drawdown is not a prize for market orders.

The reported Sharpe ratios, $0.21$ and $0.45$, are their reported Sharpe ratios. This atlas has not verified the annualisation convention or the risk-free rate inside those columns, and it does not convert them into the per-step ratio used on classroom paths. The win rates are not comparable until a win is defined on the same unit. A win on a trade in an order log is not a win on a day in a weight log. Profit factors of $2.18$ and $2.48$ inherit that ambiguity.

:::warning The adjective is not a control
"Both are moving-average trend tests" is a label, not a matched pair. A matched pair would share the universe, the window, the span, the cost model and the clock, and would change one stage. These two pages share a family resemblance. Family resemblance does not identify a cause. If you need a place to write the two specifications side by side as documents, that exercise is [[research-craft/comparing-implementations]]. The arithmetic of target weights, as opposed to the order that fails to reach them, continues in [[portfolio/from-signal-to-weight]].
:::

:::example What would count as one cause {#ex-cause}
Suppose, purely as a design and not as a report, that a third experiment repeated O01's universe, span, windows and clock, and changed only the sentence "market orders on the cross" into "daily weights equal to the same cross signal". Would the catalogue gap of $4.05$ percentage points be attributable to that sentence?
:::solution
No, not from the two rows above. Those rows also change the windows, the span and the book. The imaginary third experiment is the right shape of question, and its result is not a number this atlas has. Until it is run, the gap between the published $+3.33\%$ and the published $+7.38\%$ remains a gap between two protocols. Quoting either figure as "the" moving-average result is the error this chapter exists to name.
:::
:::

:::quiz
The reported compound annual growth rates of O01 and W01 differ by $4.05$ percentage points. Which conclusion is justified by the two catalogue rows?
- [ ] Weight mode added $4.05$ percentage points
- [ ] The $50/200$ window added $4.05$ percentage points
- [ ] The extra year added $4.05$ percentage points
- [x] The rows are different experiments, and the gap is not attributed to one cause
:::solution
Windows, implementation, span and book all differ. [[#ex-cause]] is the shape of a one-cause comparison, and it has not been run. The figures remain the reported ones, unread as advice.
:::
:::

:::history
In 1992 William Brock, Josef Lakonishok and Blake LeBaron published one of the first widely cited computer tests of simple trading rules on a long daily index. The arguments that followed were about costs, data mining and out-of-sample behaviour, which is why a reported mean is not yet a result. This chapter asks a prior question those arguments already need: whether two implementations that can be summarised with the same adjective are the same test. A moving-average story with a weight, and a moving-average story with a market order, are not the same test until a protocol says they are.
:::

## Where this leads

The clock those weights and orders are allowed to use is [[backtesting/timing-costs-and-biases]]. A market order and a limit that might miss are specified, as messages rather than as modes, in [[orders/market-and-limit-orders]]. Writing the two library rows as full specifications, rather than as a warning against a single cause, is [[research-craft/comparing-implementations]].

:::summary
- Weight mode sets target fractions under a stated rebalance policy. In this chapter's main proposition, fractional holdings are allowed and a full fill at the mark is assumed.
- Order mode submits messages. A limit that does not trade leaves the pre-trade weight in place.
- With net asset value $1000$ and a mark of $100$, a full market buy of five shares meets a target weight of $0.5$. The same target sent as a limit at $99$, with a low of $100$, meets nothing and the weight stays $0$.
- A two-share partial fill at $99$, marked at $100$, has weight $100/501$, not $0.5$.
- Rounding down to whole shares turned a target of $0.5$ into $0.48$. A cash cap of $300$ in a book of $1000$ turned a wish of $0.5$ into a maximum of $0.3$.
- O01 reports a compound annual growth rate of $+3.33\%$ over 25 years; W01 reports $+7.38\%$ over 26 years. The $4.05$ percentage-point gap is not attributed to one cause.
- The pages also differ in windows ($20/50$ against $50/200$), in orders against weights, and in a cross against a sector book. Reported Sharpe ratios are left as reported Sharpe ratios.
:::

## Exercises

:::exercise The full fill {level=1 check="0.5"}
Net asset value is $1000$ units of account, all cash, and the mark is $100$. A market order buys $5$ shares at $100$ and fills in full. Enter the resulting weight.
:::solution
Inventory is $500$ and cash is $500$, so the weight is $500/1000 = 0.5$. This is the conclusion of [[#prop-fillweight]] for $w^\star = 0.5$, not a suggestion to hold half of any asset.
:::
:::

:::exercise The missed limit {level=1 check="0"}
The account in the previous exercise instead sends a buy limit at $99$. The bar's low is $100$, and the protocol fills the limit only at $99$ or better. Enter the weight after the bar.
:::solution
Nothing trades. The share count stays $0$ and the weight stays $0$.
:::
:::

:::exercise Whole shares, rounded down {level=1 check="0.48"}
Target notional is $500$ units of account in a book of $1000$. The price is $30$. The rule buys the greatest whole number of shares whose notional does not exceed $500$. Enter the weight.
:::solution
$500/30 = 16.\overline{6}$, and the greatest whole number not exceeding that is $16$. Notional is $480$. The weight is $480/1000 = 0.48$. Buying $17$ would spend $510$ and break the rule you were given.
:::
:::

:::exercise A cash cap {level=2 check="0.3"}
Net asset value is $1000$, cash is $300$, and the rest is an inventory this protocol is not allowed to sell. Borrowing is forbidden. The new asset is marked at $50$. Enter the largest weight the cash can buy.
:::solution
The account can spend $300$, which buys $300/50 = 6$ shares. The position marks at $300$, and the weight is $300/1000 = 0.3$. A target of $0.5$ is not achievable under the constraints as written. Reaching it would require a sale, a loan, or a different protocol.
:::
:::

:::exercise The partial fill as a fraction {level=2 check="100/501"}
An account starts with $1000$ units of cash, buys $2$ shares at $99$, and marks them at $100$. Enter the weight as a reduced fraction.
:::solution
Cash is $1000 - 198 = 802$. Inventory marks at $200$. Net asset value is $1002$. The weight is $200/1002 = 100/501$.
:::
:::

:::exercise The gap in the catalogue {level=2 check="4.05"}
O01's reported compound annual growth rate is $+3.33\%$. W01's is $+7.38\%$. Enter the difference in percentage points. The solution must not assign that difference to one cause.
:::solution
$7.38 - 3.33 = 4.05$. The windows, the mode, the span and the book differ together, so this atlas does not attribute $4.05$ to any one of them. The figure to enter is $4.05$.
:::
:::

:::exercise Solving for the market quantity {level=3}
Derive the share quantity $\Delta$ in [[#prop-fillweight]]. State every assumption you use, and say where a limit that misses leaves the argument.
:::hint
A fill at the mark moves cash and inventory by equal and opposite amounts, so net asset value does not change. Set the new inventory's mark equal to $w^\star V$.
:::
:::solution
Assume $V = C + q P$ with $P > 0$ and $V > 0$, fractional shares allowed, no fee, no other position changing, and a full fill at the same price $P$ used as the mark. Then new cash is $C - \Delta P$ and the new share count is $q + \Delta$, and the two $\Delta P$ terms cancel, so net asset value remains $V$. The new weight is $(q + \Delta) P / V$. Setting that equal to $w^\star$ and rearranging gives $\Delta = w^\star V / P - q$. If the order is a limit that does not trade, the derivation stops at the first step: $\Delta$ is not yours to choose, it is $0$, and the weight remains $q P / V$.
:::
:::

:::exercise Four differences, no cause {level=3}
List four protocol differences between the O01 row and the W01 row, using only facts stated in this chapter, and finish with a sentence that refuses to attribute the reported growth-rate gap to one of them.
:::hint
Compare the average lengths, the way a position is expressed, the number of years, and what the holding rule is applied to.
:::
:::solution
First, the feature windows are a $20/50$ cross against a $50/200$ comparison. Second, O01 submits market orders, whereas W01 sets daily target weights. Third, the spans are 25 years against 26 years. Fourth, O01 trades a cross on equity exchange-traded funds, whereas W01 holds each sector fund while its slow average is above its slower one. The reported compound annual growth rates are $+3.33\%$ and $+7.38\%$. This atlas refuses to attribute the gap of $4.05$ percentage points to any one of those four differences, because the catalogue does not contain the matched experiment that would isolate it, and this atlas has not re-run the pages.
:::
:::
