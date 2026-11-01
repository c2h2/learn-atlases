A raw close is a printing convention as much as a price. A split can cut it in half without cutting the holder's wealth, a dividend can leave the close lower while the holder is paid in cash, and a name that no longer exists can vanish from a list assembled at the end of the sample. A futures chart can jump because one expiry was swapped for another. In each case the close-to-close ratio from [[markets/prices-and-bars]] is still a ratio of two numbers. It is no longer the simple return of a holding unless the series was built to be that return.

This chapter writes the bookkeeping. The objects are a split, a cash dividend, a point-in-time universe, and a roll between futures contracts. The worked figures are integers so the arithmetic can be checked by hand. None of them is a corporate action from a named company, and none of them is a position to take. The aim is to stop a later backtest from measuring a printing convention and calling the measurement a result.

Path A's eight closes have no split, no dividend and no roll, which is why their compound return equals $110/100 - 1 = 0.10$. The moment a series leaves that tidy state, the equality has to be earned by an adjustment, not assumed.

## Splits

:::definition Split adjustment {#def-split}
In an $s$-for-$1$ **split**, with $s > 1$, each old share is replaced by $s$ new shares and the market price is divided by $s$, up to a rounding the venue's tick grid may impose. A **backward split adjustment** of a series with a single split between dates $k-1$ and $k$ sets $A_t = P_t / s$ for $t < k$ and $A_t = P_t$ for $t \ge k$. The adjusted close is a constructed level. It is not, before the split, a price anyone traded.
:::

The share count moves the other way from the price. That is the whole economic content of a pure split: more shares, lower price, same value. A raw chart that shows a cliff has drawn the price and forgotten the share count. A backtest that feeds the raw cliff to a return formula records a loss the holder did not experience. The next proposition isolates that failure.

:::proposition A pure split is not a return {#prop-split}
Assume an $s$-for-$1$ split between $t-1$ and $t$, with no dividend and no other price change: the pre-split close is $P$, the post-split close is $P/s$, and a holder of $q$ shares becomes a holder of $qs$ shares. Then the holder's wealth is unchanged, so the economic simple return is $0$. The raw close-to-close return is $1/s - 1$, which equals $0$ only if $s = 1$.

If the backward adjustment of [[#def-split]] is applied, the adjusted closes on the two dates are both $P/s$, so the adjusted simple return is also $0$.
:::

:::proof
Pre-split wealth is $qP$. Post-split wealth is $(qs) \times (P/s) = qP$. The change in wealth is $0$, so the economic simple return is $0$. The raw price ratio is $(P/s)/P = 1/s$, and the raw simple return is $1/s - 1$. For a $2$-for-$1$ split this is $-1/2$. It records the price cut and not the doubling of the share count.

Under backward adjustment the pre-split adjusted close is $P/s$ and the post-split adjusted close is $P/s$. Their ratio is $1$, and the adjusted simple return is $0$, matching wealth. On dates that do not cross the split the share count is constant, and both the raw and the adjusted series are scaled by the same constant on each side of any earlier step (the constant is $1/s$ before the split and $1$ after it). Ratios on those steps are unchanged by the adjustment. The only raw ratio that misstates wealth, in this pure case, is the ratio across the split itself.
:::

:::example Eighty, one hundred, fifty, fifty-five {#ex-split-series}
An invented share prints the closes $80$, $100$, $50$, $55$. The step from $100$ to $50$ is a $2$-for-$1$ split and nothing else. No dividend is paid. Start with one share. Compute the raw compound return from $80$ to $55$, the path of wealth, and the compound return of the backward-adjusted series.
:::solution
The raw gross ratios are $100/80 = 1.25$, $50/100 = 0.5$ and $55/50 = 1.1$. Their product is $55/80 = 0.6875$, so the raw compound simple return is $0.6875 - 1 = -0.3125 = -5/16$. A chart-only reader sees a loss of five sixteenths.

Wealth does not follow the raw price through the split. One share is worth $80$, then $100$. The split replaces it with two shares at $50$, still worth $100$. The last print is $55$, so two shares are worth $110$. The economic simple return is $110/80 - 1 = 30/80 = 0.375 = 3/8$.

Backward adjustment divides every pre-split price by $2$: the series becomes $40$, $50$, $50$, $55$. The adjusted ratios are $50/40 = 1.25$, $50/50 = 1$ and $55/50 = 1.1$. The product is $55/40 = 1.375$, and the compound simple return is $0.375$, matching wealth. [[#prop-split]] is the middle step, where the raw return is $-0.5$ and the adjusted return is $0$. The other two steps were genuine price changes and are left alone by the ratio.

The adjusted print $40$ at the start was not a market price. The market price was $80$. Using $40$ as a historical level — "it traded at $40$" — is a second mistake, different from using the raw cliff as a return. The adjusted series is for returns and for signals that are functions of those returns. It is not a reconstruction of the quote a buyer would have seen.
:::
:::

:::widget plot
f: (80+4*x)*(1-0.5*heaviside(x-10)); 0.5*(80+4*x)
x: 0, 20
labels: raw close; split-adjusted close
caption: The raw curve follows 80 + 4x and is then cut in half after x = 10, as a 2-for-1 split cuts a price. The adjusted curve is half of 80 + 4x everywhere, so the jump is gone and the two curves meet after the split. The step function is one half at the single point x = 10, so that one point sits between the two levels; read the curve on either side. Adjusted levels before the split are not prices anyone traded. The figure is a construction, not a forecast.
:::

The picture is [[#ex-split-series]] drawn with a straight trend instead of four prints. Before the split the adjusted curve is half the raw curve. After the split they agree. A signal computed on the raw curve sees a crash at the split date. A signal computed on the adjusted curve sees the trend. They are not two opinions about one event. They are two series, and only the adjusted one matches the holder's wealth in the pure-split case.

## Dividends and a total-return index

A dividend does what a split does not: it moves cash. If the price falls by about the dividend on the ex-dividend date, a raw close-to-close return treats the fall as a loss and ignores the cash. A total-return index puts the cash back.

:::definition Total-return index {#def-tr}
Let $P_t$ be a price in consistent units (already split-adjusted, if a split and a dividend would otherwise collide) and let $D_t$ be the cash dividend per share whose ex-date falls at $t$, with $D_t = 0$ when none falls. A **total-return index** reinvests that cash into the same share:

$$
P^{\mathrm{tr}}_t = (P_t + D_t)\, \frac{P^{\mathrm{tr}}_{t-1}}{P_{t-1}},
$$

provided $P_{t-1} \neq 0$. The index tracks wealth under reinvestment. It is not the ex-dividend close, and it is not a traded price.
:::

Reinvestment means the holder spends $D_t$ on extra shares at the ex-dividend price $P_t$, receiving $D_t/P_t$ new shares per old share. The share count becomes $(P_t + D_t)/P_t$, and wealth per old share of starting value becomes proportional to $P_t + D_t$. The formula is that statement written as a recursion. It assumes the dividend and the price are in the same share units. Our examples keep splits and dividends on different dates so the assumption is free.

:::proposition One-period total return {#prop-tr}
Under [[#def-tr]], the simple return of the total-return index is

$$
\frac{P^{\mathrm{tr}}_t}{P^{\mathrm{tr}}_{t-1}} - 1 = \frac{P_t + D_t}{P_{t-1}} - 1.
$$

When $D_t = 0$ this equals the price return $P_t/P_{t-1} - 1$.
:::

:::proof
Substitute the recursion:

$$
\frac{P^{\mathrm{tr}}_t}{P^{\mathrm{tr}}_{t-1}} = \frac{(P_t + D_t)\, P^{\mathrm{tr}}_{t-1} / P_{t-1}}{P^{\mathrm{tr}}_{t-1}} = \frac{P_t + D_t}{P_{t-1}}.
$$

The previous index level cancels, which is why the level of the index is a numeraire and the return is a function of the price and the dividend alone. Subtract $1$. If $D_t = 0$, the right-hand side reduces to the close-to-close price return. A series with no dividends does not need a total-return index. Path A is such a series. A series with dividends, studied through raw closes, is a price-return experiment and must be labelled as one.
:::

:::example A dividend of one on a price of fifty {#ex-dividend}
The price is $50$ and the total-return index is $50$. A cash dividend of $1$ is paid.

1. The ex-dividend price stays $50$. Compute the new index level and both simple returns.
2. The ex-dividend price falls to $49$. Compute the same three numbers: index level, total return, price return.
3. After case 2, the next close is $51$ with no further dividend. Compute the index and the compound total return from the original $50$, and compare it with the compound price return from $50$ to $51$.
:::solution
Case 1 uses [[#prop-tr]] with $P_t = 50$, $D_t = 1$ and $P_{t-1} = 50$. The new index level is $(50 + 1) \times 50/50 = 51$. The total simple return is $51/50 - 1 = 0.02 = 1/50$. The price return is $50/50 - 1 = 0$. The entire $0.02$ is the dividend yield $1/50$. A price-only backtest records a flat market and has missed the cash.

Case 2 sets $P_t = 49$. The index level is $(49 + 1) \times 50/50 = 50$. The total simple return is $0$. The price return is $49/50 - 1 = -0.02$. The raw close looks like a loss of two percent. Wealth, with the dividend reinvested, did not move. This is the split's cousin: a printing change in the close, offset by something the close does not show. The offset here is cash rather than extra shares.

Case 3 starts from index $50$ and price $49$, then applies $P = 51$ and $D = 0$. The index becomes $51 \times 50/49 = 2550/49 \approx 52.040816$. The compound total return from the original $50$ is

$$
\frac{51}{49} - 1 = \frac{2}{49} \approx 0.040816.
$$

The compound price return from $50$ to $51$ is $51/50 - 1 = 0.02$. Reinvestment produces the larger figure because the second day's price return is earned on a share count that the dividend has already increased, and because the first day's cash was not a loss. The gap between $2/49$ and $1/50$ is $51/2450 \approx 0.020816$. It is not exactly the first day's yield, and it does not need to be: [[#prop-tr]] applies one date at a time, and the compound is the product of the gross factors. A dashboard that says "up $2$ percent" has to say whether it means the price or the total-return index. On these integers the two answers are $0.02$ and about $0.040816$.
:::
:::

:::warning Raw closes across a distribution
The failure mode is always the same shape. Wealth changed by something the raw ratio ignores: extra shares in a split, cash in a dividend. The raw return $-0.5$ in [[#ex-split-series]] and the raw return $-0.02$ in case 2 of [[#ex-dividend]] are both true statements about prints and false statements about the holder. Adjust, or label the experiment as a price-return test. Do not do neither.
:::

## Who was in the universe

A return series can be honest, share by share, and still answer the wrong question if the list of shares was chosen at the end. The list is an input. It has a clock, just as a signal does.

:::definition Point-in-time membership and survivorship {#def-universe}
A **point-in-time universe** at date $t$ contains only names that the stated rule could have included using information in $\mathcal{F}_t$: listed then, and satisfying then whatever membership test you wrote down. **Survivorship** is the special failure in which the universe is fixed at the end of the sample, so names that delisted, merged or otherwise left before the end are absent. An average over a survivor list is not the average over the list a researcher could have formed at the start.
:::

Point-in-time membership is the universe analogue of the legal product $s_t R_{t+1}$. You may use what was known at $t$. You may not use the fact that a name will still exist at the end of the file, because that fact was not known at $t$. Survivorship is what you get when the file itself was built by looking at the end.

A delisting is not always a total loss. Some names leave in a cash merger at a premium; some leave as a residual claim worth nothing. The next example sets the missing name's terminal value to $0$ so the arithmetic is visible. That is a stated modelling choice for a toy, not a description of every exit, and not a distress scenario to trade against. If a dataset replaces delists with a blank instead of a terminal value, the blank is a decision, and the decision biases the average upward whenever the omitted terminal value is worse than the survivors.

:::example Four names, one of them gone {#ex-survivors}
Four invented names start at $100$. At the end of the sample three are still listed, with prices $150$, $120$ and $90$. The fourth delisted and, in this toy, finished at $0$. Compute the average terminal price of the three survivors and of all four names, and the corresponding average simple returns from $100$.
:::solution
The survivors average $(150 + 120 + 90)/3 = 360/3 = 120$, an average simple return of $120/100 - 1 = 0.20$. All four names average $(150 + 120 + 90 + 0)/4 = 90$, an average simple return of $90/100 - 1 = -0.10$. The survivor average is higher by $0.30$ in simple-return units.

A universe chosen at the end keeps the first three names and reports $+0.20$. A universe chosen at the start, which included the fourth name because it was listed then, reports $-0.10$ under the total-loss convention of the toy. Both averages are correctly computed. They answer different questions. [[#def-universe]] says only the second is a candidate for a rule that had to choose at the start. The first has looked at who survived.

The gap of $0.30$ is not a universal estimate of survivorship bias. It is this toy: one name out of four set to zero, three specific terminals. A different residual value for the delisted name would move the full average and would not move the survivor average at all, which is the diagnostic. Survivor statistics are invariant to the fate of the names they dropped. That invariance is the smell of the bias. It is not a parameter to estimate from these four integers and then reuse on a market.
:::
:::

:::quiz
A researcher downloads, in the last year of the sample, every equity that still has a price, and runs a twenty-year backtest on that list. What has the list used that a point-in-time universe at the start would not have known?
- [ ] The opening prices of the names, which are in $\mathcal{F}_t$ for later $t$
- [x] Which names would still be listed at the end of the twenty years
- [ ] The split adjustment of a name that stayed listed
- [ ] The multiplier of a futures contract, which is a contract term
:::solution
The end-of-sample list encodes survival. [[#def-universe]] calls that survivorship. Split adjustment of a survivor is a separate bookkeeping step, and a futures multiplier is not what selected these equities. Opening prices of names you were allowed to hold are legitimate inputs; the knowledge that they would survive is not an opening price.
:::
:::

## Rolls and continuous futures

A futures contract expires. A chart that looks like one price across many years is a construction. The construction chooses how to join the expiry you left to the expiry you entered. The choice changes the level, and it can change the point P&L, even when it is trying to be harmless.

:::definition Difference and ratio rolls {#def-roll}
Suppose a position is marked on an old futures price $F$ and is rolled to a new contract marked at $G$ on the same date. The **gap** is $G - F$. A **difference-adjusted** continuous series adds $G - F$ to every constructed price before the roll and then appends the new contract's later prices unshifted. A **ratio-adjusted** continuous series multiplies every constructed price before the roll by $G/F$, when $F \neq 0$, and then appends the new contract's later prices. Neither series is the price path of a single contract held through expiry.
:::

The definitions are back-adjustments: history is rewritten so the splice does not jump, and the latest contract keeps its own price. Forward adjustments, which rewrite the newer prices instead, are a different convention and will not be used here. The direction of the rewrite must be stated, because "the adjusted level" depends on it.

:::proposition What the two splices preserve {#prop-roll}
Assume one roll, no costs, and a position that is marked on the old contract up through $F$ and on the new contract afterwards. Let the old contract's earlier mark be $F_{\mathrm{prev}}$, so the point P&L on the old contract over that step is $F - F_{\mathrm{prev}}$. Let the new contract's next mark be $G_{\mathrm{next}}$, so the point P&L on the new contract is $G_{\mathrm{next}} - G$.

The held point P&L across the two steps is $(F - F_{\mathrm{prev}}) + (G_{\mathrm{next}} - G)$. Difference adjustment produces a continuous series whose successive differences equal $F - F_{\mathrm{prev}}$, then $0$ at the splice, then $G_{\mathrm{next}} - G$. The sum of those differences equals the held point P&L. Ratio adjustment preserves the percentage changes of each held contract, and the percentage change across the splice is $0$. It does not preserve point P&L unless $G = F$.

Neither sum equals the point P&L of holding the old contract through expiry and stopping, which is $F - F_{\mathrm{prev}}$ and does not include $G_{\mathrm{next}} - G$. A raw concatenation that jumps from $F$ to $G_{\mathrm{next}}$ records a difference $G_{\mathrm{next}} - F = (G - F) + (G_{\mathrm{next}} - G)$, which adds the gap into the path.
:::

:::proof
Difference adjustment adds the constant $G - F$ to pre-roll levels. Differences of pre-roll levels are unchanged, so the old step remains $F - F_{\mathrm{prev}}$. The adjusted old mark at the roll is $F + (G - F) = G$, and the new contract is appended at $G$, so the splice difference is $0$. The next difference is $G_{\mathrm{next}} - G$ because the new prices are unshifted. Adding these three differences gives $(F - F_{\mathrm{prev}}) + 0 + (G_{\mathrm{next}} - G)$, which is the held point P&L.

Ratio adjustment multiplies pre-roll levels by $G/F$. A pre-roll ratio $(F / F_{\mathrm{prev}})$ is unchanged because the constant cancels, so the percentage change on the old contract is preserved. The adjusted old mark becomes $G$, the new series starts at $G$, and the splice ratio is $1$. The next percentage change is $G_{\mathrm{next}}/G - 1$, the new contract's own. The point change on the old step becomes $G - F_{\mathrm{prev}} \cdot G/F = (G/F)(F - F_{\mathrm{prev}})$, which equals $F - F_{\mathrm{prev}}$ if and only if $G/F = 1$, that is $G = F$. Otherwise the point P&L is scaled.

Holding to expiry and stopping never holds the new contract, so its point P&L does not include $G_{\mathrm{next}} - G$. The raw jump $G_{\mathrm{next}} - F$ expands as $(G_{\mathrm{next}} - G) + (G - F)$, the genuine new-contract move plus the gap. The gap is a difference between two contracts at one time, not a mark-to-market of a position that was held across that difference. Adding it counts a basis as a profit or a loss.
:::

:::example A six-point gap {#ex-roll}
The old contract is marked at $100$, then at $104$. On that second date the new contract is marked at $110$, and the position is rolled. The new contract's next mark is $112$. One contract is held, with multiplier $50$. Compute the held point P&L, the currency P&L, the difference-adjusted levels, the ratio-adjusted level of the first mark, the point change that ratio adjustment assigns to the first step, and the raw jump from $104$ to $112$.
:::solution
The old contract contributes $104 - 100 = 4$ points. The new contract contributes $112 - 110 = 2$ points. Held point P&L is $4 + 2 = 6$. With multiplier $50$, the currency P&L is $50 \times 6 = 300$, by the futures definition in [[markets/instruments]]. Stopping at expiry of the old contract, and not rolling, would have earned only the $4$ points, or $200$ currency units. The extra $2$ points are the life of the new contract, not a bonus attached to the old one.

The gap is $110 - 104 = 6$. Difference adjustment adds $6$ to the old marks: $106$, then $110$, then the new marks $110$, $112$. The differences are $4$, $0$ and $2$, summing to $6$, as [[#prop-roll]] promised. The level $106$ was never the old contract's price (that was $100$) and need not have been the new contract's price either. It is a constructed level.

Ratio adjustment multiplies the old marks by $110/104$. The first adjusted level is $100 \times 110/104 = 1375/13 \approx 105.769231$. The second is $104 \times 110/104 = 110$. The point change on the first step becomes $110 - 1375/13 = 55/13 \approx 4.230769$, not $4$. The percentage change is still $110/(1375/13) - 1 = 104/100 - 1 = 0.04$. Percentage in, points out. A rule sized in contracts, whose P&L is multiplier times points, does not want its history rewritten in percentages unless the researcher meant to change the P&L.

The raw concatenation $100$, $104$, $112$ jumps by $112 - 104 = 8$ points on the second step. Those $8$ points are the gap of $6$ plus the genuine move of $2$. Booking $8$ as a mark-to-market invents $6$ points, which is $300$ currency units at multiplier $50$, a phantom equal to the entire true currency P&L of the rolled position. The continuous series exists so that this phantom can be removed. Removing it does not turn the series into the contract you would have held by doing nothing at expiry.
:::
:::

:::intuition Three different "sixes"
In [[#ex-roll]] the number $6$ appears as a gap, as a held point P&L, and as a quantity one must not confuse with either. The gap is $6$ because $110 - 104 = 6$. The held point P&L is $6$ because $4 + 2 = 6$. They match only because the old move happened to be $4$ and the new move $2$. Change the old move and the held total moves while the gap, which is a same-day difference between contracts, does not. A continuous series that preserves held points is copying the sum $4 + 2$. It is not discovering that the gap was a profit.
:::

:::history
The Chicago Board of Trade was founded in 1848 and became the home of standardised grain futures, the template for later financial futures. A grain contract of that kind was a dated delivery. It was not a stitched curve running for years under one symbol. Difference adjustment and ratio adjustment are later bookkeeping laid on top of a sequence of dated contracts, so that a researcher can ask a question about "the" price. [[#prop-roll]] is the reason the question has to name the splice. The 1848 template does not answer it, and it does not suggest a grain position or any other futures position.
:::

:::remark Price return, total return, continuous return
Three phrases a dashboard may shorten to "the return" have been separated here. A price return uses raw or split-adjusted closes and ignores cash dividends. A total return uses [[#def-tr]]. A futures result uses a stated roll, or refuses the roll and stays in one expiry. Path A needed none of the three distinctions. A library page computed on fund prices has the fund's own corporate-action processing already inside the print, which is not the same as a total-return index you built yourself, and a library page computed on a vendor's continuous future has that vendor's splice already inside the print. Reading the page without knowing which series it used is the next chapter's problem. Building the series honestly is this one.
:::

## Where this leads

[[markets/reading-a-dashboard]] reads total return, compound growth, a reported Sharpe ratio, a drawdown, a win rate and a profit factor off a published page. Each of those cells inherits the series. A total-return cell and a price-return cell are different experiments, as [[#ex-dividend]] showed with $0.02$ against about $0.040816$. A continuous future and a single expiry are different experiments, as [[#ex-roll]] showed with $6$ held points against $4$. The dashboard cannot repair a series that mixed them. [[markets/prices-and-bars]] is the close those adjustments sit on: if the unadjusted print was already the wrong close, adjusting it preserves the wrong object more smoothly.

:::summary
- An $s$-for-$1$ split divides the price by $s$ and multiplies the share count by $s$. Wealth is unchanged. The raw return $1/s - 1$ is not the economic return.
- Backward adjustment divides pre-split prices by $s$. On the series $80, 100, 50, 55$ the raw compound return is $-0.3125$ and the adjusted, matching wealth, is $0.375$. The adjusted level is not a historical quote.
- A total-return index reinvests a dividend $D_t$ by $P^{\mathrm{tr}}_t = (P_t + D_t) P^{\mathrm{tr}}_{t-1} / P_{t-1}$. Its simple return is $(P_t + D_t)/P_{t-1} - 1$.
- A dividend of $1$ on a price of $50$ is a total return of $0.02$ if the price does not fall, and a total return of $0$ if the price falls to $49$. The raw close reports $0$ and $-0.02$ respectively.
- A universe fixed at the end of the sample drops names that did not survive. In the toy, survivor average return is $+0.20$ and the full average, with a delist at $0$, is $-0.10$.
- Difference adjustment preserves held futures point P&L. Ratio adjustment preserves percentage changes and scales points unless the gap is zero. Neither is the P&L of holding one expiry to the end.
- In the roll example the held book makes $6$ points, or $300$ currency units at multiplier $50$; the raw jump from $104$ to $112$ books $8$ points and invents the gap.
:::

## Exercises

:::exercise Raw return of a two-for-one split {level=1 check="-0.5"}
A share goes from $100$ to $50$ solely because of a $2$-for-$1$ split. Enter the raw close-to-close simple return.
:::solution
The raw return is $50/100 - 1 = -0.5$, which is $1/s - 1$ for $s = 2$. [[#prop-split]] says the economic return is $0$, because the holder now has two shares at $50$. The answer asked for is the raw print's return, the false one, so that it is not confused with the wealth return. Entering $0$ answers a better question than the one that was posed.
:::
:::

:::exercise Economic return of that split {level=1 check="0"}
For the same pure $2$-for-$1$ split, enter the simple return of the holder's wealth.
:::solution
Pre-split, one share is worth $100$. Post-split, two shares at $50$ are worth $100$. The wealth ratio is $1$ and the simple return is $0$. This is the other half of [[#prop-split]]. The backward-adjusted closes are $50$ and $50$, and their return is also $0$. The raw return $-0.5$ is what you get if you forget to adjust.
:::
:::

:::exercise Dividend, price unchanged {level=1 check="0.02"}
The total-return index and the price are both $50$. A dividend of $1$ is paid and the ex-dividend price stays $50$. Enter the simple return of the total-return index.
:::solution
[[#prop-tr]] gives $(50 + 1)/50 - 1 = 0.02$. The new index level is $51$. The price return is $0$. The exercise asks for the total-return figure, which is the dividend yield on these numbers. It is not a forecast of a yield, and the dividend of $1$ is invented.
:::
:::

:::exercise Adjusted compound on the four prints {level=2 check="0.375"}
Using the series $80$, $100$, $50$, $55$ with a pure $2$-for-$1$ split on the step from $100$ to $50$, enter the compound simple return of wealth for a holder who starts with one share.
:::solution
Wealth goes $80$, $100$, $100$ (two shares at $50$), $110$ (two shares at $55$). The compound simple return is $110/80 - 1 = 0.375$. The backward-adjusted price series $40$, $50$, $50$, $55$ compounds to the same $0.375$. The raw series compounds to $-0.3125$. [[#ex-split-series]] is this arithmetic in full. The adjusted starting level $40$ must not be described as the price the share traded at.
:::
:::

:::exercise The full-universe average {level=2 check="-0.1"}
Four names start at $100$. Terminals are $150$, $120$, $90$ and $0$, the last being a toy delist. Enter the average simple return if all four are kept.
:::solution
The average terminal price is $(150 + 120 + 90 + 0)/4 = 90$. The average simple return is $90/100 - 1 = -0.1$. The survivor average, dropping the $0$, is $+0.2$. [[#def-universe]] identifies the $-0.1$ figure as the one that does not require knowledge of who would survive, under the toy's total-loss convention. Changing the delist's terminal value from $0$ to $100$ would change this answer and would leave the survivor average untouched.
:::
:::

:::exercise Held points across the roll {level=2 check="6"}
Old futures marks $100$ then $104$. The new contract is $110$ at the roll and $112$ next. The position rolls at $104$ against $110$. Enter the held point P&L of the two steps.
:::solution
Old-contract points: $104 - 100 = 4$. New-contract points: $112 - 110 = 2$. The sum is $6$. [[#prop-roll]] says difference adjustment reproduces this $6$ and that a raw jump from $104$ to $112$ produces $8$, which is $6$ plus a gap that is not a held mark-to-market. The currency P&L at multiplier $50$ would be $300$, a different question. Stopping without the roll would leave $4$ points. The answer $6$ is the rolled book only.
:::
:::

:::exercise The ratio splice scales the points {level=3}
On the roll of [[#ex-roll]], compute the ratio-adjusted first level and the point change it assigns to the step from $100$ to $104$. Show that the percentage change is still $0.04$, and explain which of the two quantities a contract-sized P&L cares about.
:::hint
Multiply $100$ by $110/104$. Subtract the result from $110$. Then form the ratio of those two adjusted levels and compare it with $104/100$.
:::
:::solution
The factor is $G/F = 110/104$. The adjusted first level is $100 \times 110/104 = 1375/13 \approx 105.769231$. The adjusted second level is $110$. The point change is $110 - 1375/13 = 55/13 \approx 4.230769$, whereas the contract actually moved $4$ points. The ratio of the adjusted levels is $110 / (1375/13) = 104/100 = 1.04$, so the percentage change is $0.04$, the old contract's own percentage change.

A P&L of $n \times m \times \Delta F$ is linear in the point change. It uses $4$, not $0.04$, on this step. Ratio adjustment replaces $4$ by $55/13$ and would replace a currency P&L of $50 \times 4 = 200$ by $50 \times 55/13 \approx 211.538$. The percentage was preserved and the currency was not. Difference adjustment keeps the $4$ points and is the splice that matches the contract P&L. Neither splice is a reason to roll, and neither is the $4$-point result of not rolling. The researcher who wants held points has to say "difference adjustment" and then still not describe the adjusted level $106$ as a price that traded.
:::
:::

:::exercise Three point totals, three experiments {level=3}
Using only the integers of [[#ex-roll]], list the point total of holding the old contract and stopping, the point total of the rolled book, and the second-step point change of the raw concatenation from $104$ to $112$. Explain why a continuous series that correctly removes the gap is still not the first of those three experiments.
:::hint
The three totals are $4$, $6$ and $8$. Match each to a position, then ask whether the continuous series includes the new contract's move of $2$ points.
:::
:::solution
Stopping at the old contract earns $104 - 100 = 4$ points and never holds the move from $110$ to $112$. The rolled book earns $4 + 2 = 6$ points. The raw concatenation's second step is $112 - 104 = 8$ points, which is the new contract's $2$ plus the gap of $6$, a gap the holder does not earn by marking one contract through time.

Difference adjustment removes the gap and keeps the $2$, so it reports the rolled book's $6$, not the stopper's $4$. It is the right bookkeeping for a researcher who did roll, and the wrong bookkeeping for a researcher who held one expiry and stopped. [[#def-roll]] says the continuous series is not the path of a single contract held through expiry. The numerical content of that sentence, on this example, is $6 \neq 4$. Ratio adjustment does not even keep the $6$ in points. A vendor file that is silent about which splice it used is silent about which of these experiments the dashboard will later summarise. The silence is a data problem, not a detail to repair after the growth rate has been quoted.
:::
:::
