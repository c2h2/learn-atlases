“Trade the moving average” is not the name of one experiment. “Buy when RSI is below $35$ and sell when it is above $60$” is not the name of one experiment either. Each sentence leaves the fields in [[research-craft/writing-a-specification]] partly blank, and the open library fills those blanks in more than one way. This chapter puts two pairs of fills side by side: a moving-average order book beside a moving-average weight book, and an RSI order book beside an RSI weight book. The method is a protocol table next to a metric table, and then a refusal. The refusal is the result. No single cause is named for either gap, and neither pair is sorted into a winner to trade.

Every library figure below is as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. Where the catalogue cell is silent, the protocol row says “not reported”. Silence is not an invitation to borrow a cost, a universe, or a Sharpe convention from the neighbouring row.

## Two tables, and what a gap cannot say

:::definition Protocol comparison {#def-protocol}
A **protocol comparison** of two published tests is a pair of tables built only from the source in hand. One table lists specification fields: signal formula, windows, clock or rebalance wording, order mode or weight mode, universe wording, bar size, sample span, cost, benchmark, statistic, and search. A field the source does not state is written “not reported”, not guessed. The other table lists the reported metrics the source does state, each labelled as reported. A sentence that explains the numerical gap by naming one of the protocol rows as *the* cause is not part of the comparison unless a further experiment changes that row alone.
:::

The definition is strict because a scalar gap is a weak piece of evidence. [[#prop-gap]] says how weak.

:::proposition An unidentified gap {#prop-gap}
Suppose two experiments differ in $k \ge 2$ recorded protocol fields, and the only quantitative comparison available is one real number $\delta$, the difference of a single reported statistic. Assume no controlled re-run that changes one field and holds the others fixed is being used. Then $\delta$ does not determine a unique single-field cause.
:::

:::proof
Any tuple of real numbers $(d_1,\ldots,d_k)$ with $d_1 + \cdots + d_k = \delta$ is a conceivable decomposition of the gap into field contributions, interactions included inside the $d_i$. When $k \ge 2$ there is more than one such tuple. In particular $(\delta, 0, \ldots, 0)$ and $(0, \delta, 0, \ldots, 0)$ both sum to $\delta$. The two reported statistics supply the value of $\delta$ and no second equation. Therefore they do not pick out one of those tuples. Naming a single field as the cause would be an extra assumption, and [[#def-protocol]] does not add it.
:::

The proposition does not say causes are unknowable in principle. It says they are not known from the pair of headline numbers. A later specification that changes the clock and nothing else, as Example Book A does on Path A in the previous chapter, can support a narrower sentence: on that path the wealth ratio was the disputed return. The library pairs in this chapter are not that later specification. Their windows, universes, spans, and implementation families move together.

:::corollary Rankings need not agree {#cor-rank}
If, under [[#def-protocol]], statistic $A$ ranks experiment $1$ above experiment $2$ and statistic $B$ ranks experiment $2$ above experiment $1$, then the pair of reports does not determine which experiment is “better” until a preference between $A$ and $B$ is added. This atlas adds no such preference, and a preference would still not be a decision to trade.
:::

:::proof
A single ordering cannot match both rankings. Any declaration that experiment $1$ is the better of the two has chosen $A$ over $B$, or the reverse. The metrics alone do not contain that choice. The RSI pair below is a witness: the reported win rate and the milder reported drawdown rank one page above the other, while the reported CAGR, the reported Sharpe, and the reported profit factor rank them the other way. Both rankings are arithmetic on the reported cells. Neither ranking selects a book.
:::

:::intuition Subtraction is not a mechanism
$7.38 - 3.33 = 4.05$ is true as arithmetic on two reported CAGR percentages. The same numeral is $4.05 + 0$ and $0 + 4.05$ and $2 + 2.05$. Arithmetic cannot tell those stories apart. A mechanism sentence has to come from a contrast that turns one story off, not from the subtraction itself.
:::

## O01 beside W01

O01, “Market SMA Cross”, is the order-mode label: buy when SMA($20$) crosses above SMA($50$); sell on the reverse; market orders; the rule cell says equity ETFs, trend. The reported span is $25$ years of daily bars. The reported figures are total return $+126.66\%$, CAGR $+3.33\%$, Sharpe $0.21$, maximum drawdown $-16.35\%$, win rate $51.9\%$, profit factor $2.18$.

W01, “Daily SMA Trend”, is the weight-mode label: hold each sector ETF while SMA($50$) is above SMA($200$); daily rebalance. The reported span is $26$ years of daily bars. The reported figures are total return $+537\%$, CAGR $+7.38\%$, Sharpe $0.45$, maximum drawdown $-34.7\%$, win rate $72.6\%$, profit factor $2.48$.

Call $0.21$ and $0.45$ **reported Sharpes**. The atlas definition of a Sharpe ratio, mean excess return over the sample standard deviation of excess return, is not claimed to be the convention behind those cells. Maximum drawdown is quoted as the catalogue quotes it, in per cent, not re-derived from a path we do not have.

| Field | O01 | W01 |
|---|---|---|
| Family | Market orders on a cross | Target weights, daily rebalance |
| Windows | $20$ and $50$ | $50$ and $200$ |
| Rule shape | Trade the cross and the reverse | Hold while the fast average is above the slow |
| Universe wording | Equity ETFs, trend | Each sector ETF |
| Bars | Daily | Daily |
| Span | $25$ years | $26$ years |
| Cost model | Not reported in the table used here | Not reported in the table used here |
| Benchmark | Not reported in the table used here | Not reported in the table used here |
| Win unit | Not defined in the table used here | Not defined in the table used here |
| Search | Not reported in the table used here | Not reported in the table used here |

The CAGR cells differ by $7.38 - 3.33 = 4.05$ percentage points. By [[#prop-gap]] that difference does not name a cause. At least the windows, the rule shape, the family (orders versus weights), the universe wording, and the span differ, so $k \ge 2$ easily. A reader who says “weights beat orders by $4.05$ points” has attributed the gap to one row and set the others to zero. A reader who says “the longer averages did it” has made the other attribution. Both are compatible with the same $\delta$. This chapter endorses neither.

The drawdown cells differ in the other direction. W01’s reported maximum drawdown is $-34.7\%$ and O01’s is $-16.35\%$. The page with the higher reported CAGR has the deeper reported drawdown. Choosing the higher CAGR and choosing the milder drawdown are different preferences. [[#cor-rank]] says the tables do not settle the preference. They also do not say that the milder drawdown is safer in any future sample: both numbers are descriptions of their own reported paths.

The win rates are $51.9\%$ and $72.6\%$, and the profit factors are $2.18$ and $2.48$. A win rate in an order backtest and a win rate in a weight backtest are counts of events the table does not define. Until the unit is shared — a trade, a day, a week — the two percentages are not frequencies of the same thing. [[performance/win-rate-and-profit-factor]] keeps that distinction. Nothing here converts either profit factor into a probability of profit.

:::example A difference you may compute and may not explain {#ex-cagr-gap}
Compute the gap between the reported CAGRs of W01 and O01. State one decomposition [[#prop-gap]] allows and one sentence the decomposition forbids.
:::solution
The gap is $7.38 - 3.33 = 4.05$ percentage points. One allowed decomposition assigns all $4.05$ points to the change from order mode to weight mode and $0$ to the windows, the span, the universe wording, and the rule shape. Another assigns all $4.05$ points to the change from $(20,50)$ to $(50,200)$ and $0$ to the family. Both sum to the same reported gap. The forbidden sentence is any of those assignments presented as what the two pages have shown. They have shown the two CAGRs and a list of differences. The moving-average mechanism itself is discussed in [[trend/moving-averages]]; it does not identify which implementation produced $\delta$.
:::
:::

:::example A gap that one changed field can identify {#ex-path-gap}
On Path A, Example Book A’s gross legal compound return is $0.057692$ to six decimal places, and the same-bar compound return is $0.089109$ to six decimal places. Only the clock changes. Compute the gap.
:::solution
The gap is $0.089109 - 0.057692 = 0.031417$ at six-decimal rounding of each term, and exactly $110/101 - 110/104 = 165/5252 = 0.03141660\ldots$. Here $k = 1$ for the contrast that was actually run: the signal, the window, the tie, the cost, and the path were held fixed. [[#prop-gap]] does not block an attribution in that case. The attribution is still only about Path A. It does not migrate to O01 versus W01, where the clock is not the only field that moves and the path is not this toy.
:::
:::

Compounding the rounded CAGRs is a further trap. $(1.0333)^{25} - 1 = 1.268092$ to six decimal places, while O01’s reported total return is $+126.66\%$, that is $1.2666$ as a pure number. The discrepancy is about $0.0015$. $(1.0738)^{26} - 1 = 5.368078$ to six decimal places, beside W01’s reported $+537\%$. Close is not identity. A smooth curve drawn from a rounded CAGR is not the published equity path, and it is not a forecast. The figure in this chapter is that kind of sketch on purpose.

:::widget plot
f: (1.0333)^x; (1.0738)^x
x: 0, 25
labels: O01 reported CAGR, smoothed; W01 reported CAGR, smoothed
caption: Smooth compound growth at the two reported CAGRs, drawn on a common $25$-year axis so the picture is readable. W01’s page reports $26$ years, not $25$. These curves are not the published equity paths, not a re-run, and not a forecast. The vertical gap is not a cause.
:::

## O02 beside W03

The thresholds match, and that is why the pair is easy to misread. O02, “Market RSI Reversion”, buys when RSI($14$) is below $35$ and sells when RSI is above $60$, with market orders. The reported span is $25$ years of daily bars. The reported figures are total return $+29.08\%$, CAGR $+1.03\%$, Sharpe $-0.17$, maximum drawdown $-16.01\%$, win rate $71.6\%$, profit factor $1.81$. The one-line rule does not name a universe.

W03, “Weekly RSI Reversion”, enters when RSI($14$) is below $35$ and exits when RSI is above $60$, weekly on Friday. The bars are daily and the reported span is $26$ years. The reported figures are total return $+373\%$, CAGR $+6.16\%$, Sharpe $0.34$, maximum drawdown $-49.2\%$, win rate $62.1\%$, profit factor $2.15$. The one-line rule does not name a universe either. Saying the two pages “trade the same ETFs” would invent a field. [[reversion/rsi-and-bands]] owns the indicator’s construction; this section owns only the comparison of the two reported protocols.

Shared wording: RSI($14$), entry below $35$, exit above $60$. Unshared wording: market orders versus weekly weights, $25$ years versus $26$ years, and a Friday schedule that O02’s line does not state. Cost, benchmark, win unit, and the precise RSI smoother are not reported in the table used here. The reported Sharpes $-0.17$ and $0.34$ again carry no verified annualisation.

:::example Two rankings {#ex-rank}
Using only the reported cells, rank O02 and W03 by CAGR, by reported Sharpe, by win rate, and by the depth of the maximum drawdown (milder means smaller absolute value).
:::solution
CAGR: W03 ($+6.16\%$) above O02 ($+1.03\%$). Reported Sharpe: W03 ($0.34$) above O02 ($-0.17$). Win rate: O02 ($71.6\%$) above W03 ($62.1\%$). Drawdown depth: O02 ($-16.01\%$) is milder than W03 ($-49.2\%$). Profit factor, if added as a fifth column, agrees with CAGR and Sharpe: $2.15 > 1.81$. [[#cor-rank]] applies. O02’s reported CAGR is positive while its reported Sharpe is negative, so even a single page does not point the same way in every column. No column is a recommendation. The gap in reported CAGRs is $6.16 - 1.03 = 5.13$ percentage points, and [[#prop-gap]] blocks any one-line cause for that $5.13$ as firmly as it blocks a cause for the $4.05$ above.
:::
:::

A high reported win rate with a negative reported Sharpe is a useful warning against reading the win-rate cell as quality. It is still only a warning about how to read a table. It is not a suggestion to fade O02, and not a suggestion to copy W03’s Friday weights. A library loss, where one occurs, stays a reported loss. O02’s reported total return is positive; its reported Sharpe is negative. Neither fact is an instruction to take the other side of those market orders.

:::warning Do not crown a column
The slip is to sort the catalogue by one column and narrate the sort as a discovery about markets. The sort is a property of the column. A different column, on this pair, sorts the other way. Adding the phrase “so one should trade the top row” leaves the protocol comparison entirely and enters advice, which [[research-craft/the-boundary]] excludes.
:::

## A grid winner is not a fold

WF04 is a search page, not a twin of the two strategy pages above. The catalogue describes $9$ combinations: SMA fast window in $\{20, 50, 80\}$, slow window in $\{100, 150, 200\}$, each scored by a backtest’s Sharpe, over $26$ years. The table this atlas uses does not report which cell won, and it does not report the winning Sharpe. Those numbers are not invented here.

WF01 is $48$ folds: sliding fixed-length train and test windows with a pre-OOS purge, also over $26$ years. The catalogue says the walk-forward pages are slice diagnostics, not independent out-of-sample evidence. A fold that the source itself does not call independent confirmation cannot be upgraded by being placed next to a search winner.

:::example What you are not allowed to write {#ex-wf}
A note says: “WF04’s best cell and a typical WF01 fold are both out of sample, so they confirm the same moving-average rule.” What is wrong with that sentence, using only the catalogue descriptions?
:::solution
Three things, and any one of them is enough. First, the catalogue does not report WF04’s best cell, so the sentence points at a number the source, as used here, does not give. Second, WF01’s own description refuses the status “independent out-of-sample evidence”; calling a fold out-of-sample confirmation contradicts the page. Third, a cell kept because it scored best among $9$ combinations has a selection step that a pre-declared fold does not. Even if both objects were diagnostics, they would not be peers. [[validation/parameter-search]] and [[validation/walk-forward]] separate those designs. The comparison method of [[#def-protocol]] marks the missing winner as “not reported” and stops.
:::
:::

The count $9 = 3 \times 3$ is a fact about the grid that was declared, not a significance level. It becomes a probability only under extra assumptions this chapter does not grant to the catalogue. The boundary chapter computes one such toy probability and labels it as a toy, precisely so that it cannot be slid under WF04’s unreported winner.

:::quiz
O01 and W01 both mention moving averages of closes, on daily bars. Which conclusion follows from the protocol table?
- [ ] The $4.05$ percentage-point CAGR gap is caused by daily rebalancing.
- [ ] The $4.05$ point gap is caused by the longer windows in W01.
- [x] The gap is real as arithmetic and unidentified as a cause, because several protocol fields differ and no single-field re-run is in the source.
- [ ] W01 is the implementation to copy, because $7.38 > 3.33$.
:::solution
[[#prop-gap]] applies as soon as $k \ge 2$ and the only evidence is $\delta$. The table lists more than two differences. Copying the larger CAGR would be advice, and it would also ignore the deeper reported drawdown on that same page.
:::
:::

:::quiz
The RSI thresholds $35$ and $60$ appear in both O02 and W03. What else has to match before the two pages are one experiment?
- [ ] Nothing else, if the indicator and the thresholds match.
- [x] The fields in [[#def-protocol]]: family, schedule, span, and every field that is in fact different or unreported.
- [ ] Only the win rate, because $71.6\%$ and $62.1\%$ are close.
- [ ] Only the sign of the reported CAGR.
:::solution
Shared thresholds are one field. O02 is market orders over $25$ years; W03 is a Friday weight rule over $26$ years. Unreported costs and an undefined win unit are further reasons not to merge the rows. Closeness of win rates is not identity of experiments.
:::
:::

:::remark Reported total returns are worse to mix than CAGRs
O01’s $+126.66\%$ and W01’s $+537\%$ are growth over $25$ and $26$ years respectively. Their ratio is not a relative skill, and their difference is not a per-year gap. The CAGR cells at least quote a common unit, a percentage per year, and even those cells remain unidentified as causes. Mixing the total-return cells skips that partial protection. Neither cell is a prediction of the next $25$ years.
:::

:::application Where a controlled contrast would live
If someone re-ran one specification twice, changing only “market orders” versus “daily weights” and publishing both full paths, [[#prop-gap]] would no longer describe that pair. The re-run would be a new source, with its own clock, cost, and version. This atlas has not performed it and does not describe how to route either version to a broker. Until that source exists, the honest summary of O01 and W01 is the two tables.
:::

:::history
Eugene Fama’s 1970 review treated a market hypothesis as something with a stated scope: what information, and what claim of reflection into prices. Later arguments in that line succeed or fail by narrowing the scope, not by adding adjectives. A protocol table is the same instinct applied to a backtest label. Two moving-average pages with different windows and different order conventions are two scopes. Calling both “the trend result” deletes the scope Fama’s style of claim would have kept in the first sentence.
:::

## Where this leads

A protocol comparison can be frozen and then watched. [[research-craft/paper-records-and-monitoring]] is that watch: a hypothetical record on later bars, still with no order sent. [[backtesting/weights-versus-orders]] is the engine split, weight mode against order mode, that O01 and W01 illustrate and do not decide. [[research-craft/combination-and-decay]] is what not to do with two CAGRs once they have been refused as a ranking: do not add them into a blend.

:::summary
- Compare implementations by a protocol table beside a metric table, and write “not reported” rather than guess.
- A gap $\delta$ between two statistics does not name a single cause when two or more protocol fields differ and no one-field re-run is available.
- O01 and W01 are both moving-average labels and not one experiment: windows $20/50$ against $50/200$, market orders against daily weights, $25$ years against $26$, reported CAGR $+3.33\%$ against $+7.38\%$, reported maximum drawdown $-16.35\%$ against $-34.7\%$.
- The $4.05$ percentage-point CAGR gap is arithmetic. It is not an identified effect of weights, of windows, or of the extra year.
- O02 and W03 share RSI($14$) thresholds $35$ and $60$ and share almost nothing else that the table states. Their column rankings disagree.
- WF04’s winning cell is not reported in the table used here, and it would not be a peer of a WF01 fold even if it were. WF01’s folds are slice diagnostics, not independent out-of-sample evidence.
- No ranking in this chapter is a decision to trade, to reverse, or to prefer a broker’s implementation of either label.
- Smooth curves at the reported CAGRs are illustrations of two numbers, not equity paths and not forecasts.
:::

## Exercises

:::exercise CAGR gap {level=1 check="4.05"}
Enter the difference, in percentage points, between the reported CAGRs of W01 and O01.
:::solution
$7.38 - 3.33 = 4.05$. The unit is percentage points of reported CAGR, not a probability and not a cause. [[#prop-gap]] is the reason the sentence stops there.
:::
:::

:::exercise Reported Sharpe gap {level=1 check="0.51"}
Enter $0.34 - (-0.17)$, the difference of the reported Sharpes of W03 and O02.
:::solution
$0.34 + 0.17 = 0.51$. These are reported Sharpes. The atlas has not verified the annualisation, so $0.51$ is not a difference of two Sharpe ratios in the atlas convention. It is still the right arithmetic on the cells, and it still has no single-field cause.
:::
:::

:::exercise Drawdown gap in percentage points {level=1 check="18.35"}
Subtract O01’s reported maximum drawdown of $-16.35$ from W01’s reported maximum drawdown of $-34.7$, working in the percentage numbers as printed, and enter the absolute gap.
:::solution
The printed magnitudes differ by $34.7 - 16.35 = 18.35$ percentage points. W01’s reported drawdown is the deeper of the two. That fact reverses the CAGR ranking and is still not a reason to adopt O01.
:::
:::

:::exercise Win-rate gap on the RSI pair {level=2 check="9.5"}
Enter the reported win rate of O02 minus the reported win rate of W03, in percentage points.
:::solution
$71.6 - 62.1 = 9.5$. O02 ranks higher on this column and lower on reported CAGR and reported Sharpe. The win unit is not defined in the table, so $9.5$ is a gap of reported percentages, not a proven gap in the frequency of a shared event.
:::
:::

:::exercise Clock gap on the toy path {level=2 check="0.031417"}
Using the six-decimal compound returns $0.089109$ and $0.057692$ from the Path A clock contrast, enter the difference.
:::solution
$0.089109 - 0.057692 = 0.031417$. This gap has a named cause inside its own specification, the clock, because the other fields were held fixed. Do not copy the sentence “the cause is the clock” onto O01 and W01.
:::
:::

:::exercise Size of the declared grid {level=2 check="9"}
WF04 scores every pair with fast window in $\{20, 50, 80\}$ and slow window in $\{100, 150, 200\}$, with the fast window shorter than the slow window in every pair. How many combinations is that? (Enter the count.)
:::solution
Each of $3$ fast windows pairs with each of $3$ slow windows, and every fast value in the set is below every slow value, so the constraint removes none of them. The count is $9$, matching the catalogue. The count is not a report of the winning Sharpe, which the table used here does not give.
:::
:::

:::exercise Two decompositions {level=3}
Write two different real decompositions of the $4.05$ percentage-point CAGR gap into a “family” contribution and a “windows” contribution. Explain why the protocol table cannot choose between them.
:::hint
Any pair of real numbers that sums to $4.05$ is a decomposition. Pick two pairs that disagree about which component is zero. Then count how many equations the two CAGR cells actually give you.
:::
:::solution
One decomposition is family $4.05$, windows $0$. Another is family $0$, windows $4.05$. A third, equally allowed by the arithmetic, is family $2$ and windows $2.05$. The two CAGR cells determine only the sum. Span, universe wording, rule shape, and unreported costs are further components [[#prop-gap]] would also leave free. Choosing one decomposition is an assumption the source does not contain. Therefore the comparison records $\delta = 4.05$ and does not name a cause.
:::
:::

:::exercise Rounded CAGR against reported total return {level=3}
Compute $(1.0333)^{25} - 1$ and subtract O01’s reported total return written as the pure number $1.2666$. Round the difference to six decimal places.
:::hint
The smooth compound of a CAGR that has been rounded to four decimal places need not recover a total return that was rounded separately. Use $1.0333$, not a reconstructed rate.
:::
:::solution
$(1.0333)^{25} - 1 = 1.268092355\ldots$. Subtract $1.2666$ to get $0.001492355\ldots$, which is $0.001492$ to six decimal places. The discrepancy is a reason to keep the reported total return and the reported CAGR as two reported cells, and a reason not to treat the widget’s smooth curve as O01’s equity path. It is not evidence that the catalogue is “wrong”, and it is not a reason to re-trade the test.
:::
:::
