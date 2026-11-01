A test that another person cannot rebuild is only a story about a test. The rebuild usually fails on a blank that looked harmless in prose: which window, which prices count as known, which return the signal is allowed to earn, what a tie does, what a cost does, and whether anyone tried other windows before keeping this one. Filling those blanks after the wealth path has been seen, and not writing the fill down, is how a calculation becomes impossible to criticise.

This chapter turns the blanks into a form. The form is filled twice for one toy rule on one invented path. The two forms share a signal sentence and disagree about the clock. They are different experiments. The note is called Example Book A. It is a teaching specification on invented prices. It is not a product, not a fund, and not a holding.

Path A, shared with the rest of the atlas, is the price series $P = (100, 102, 101, 104, 103, 107, 106, 110)$. Simple returns, rounded to six decimal places in the atlas table, are $0.020000$, $-0.009804$, $0.029703$, $-0.009615$, $0.038835$, $-0.009346$, $0.037736$. Where a wealth ratio telescopes, the arithmetic below uses exact fractions rather than those rounded returns, so that rounding cannot accumulate. The sample mean, the sample standard deviation and the ratio $0.6097$ are properties of the seven simple returns; they are not properties of Example Book A until the book’s own net returns are the series inside the statistic.

## The fields that have to be fixed

A sentence such as “hold the asset when it is above its moving average” names a family of rules. It does not name one rule. Two careful readers can implement it with different windows, different tie breaks, and different clocks, and both can claim to have followed the sentence. [[#def-spec]] is the list that stops that claim.

:::definition Research specification {#def-spec}
A **research specification** is a written record that fixes all of the following, with no field left for the reader to invent.

1. The **universe**, and the point-in-time rule that puts an asset into it or takes it out. A universe chosen because it survived to the end of the sample is a different rule from a universe fixed at each date from information then available.
2. The **decision clock**: the information a feature dated $t$ may use, and the return it is allowed to earn.
3. The **signal formula**, including every window, every threshold, and the tie.
4. The **map** from the signal to target weights, or the order types and their prices. A signal is not a weight until the map is stated. This chapter’s toy uses a weight map and does not submit orders.
5. The **rebalance policy**: when the weight is allowed to change, and whether the sample ends with a forced liquidation.
6. The **cost model**, including the number zero if that is the model, and the moment the cost multiplies wealth.
7. The **benchmark**, named as a strategy with its own clock, not as a vague adjective.
8. The **statistic**, including the divisor of any sample variance and whether anything is annualised.
9. The **search** that was run before the reported specification was kept, including the search that did not happen.
10. The **software version** and the **data version**, so that a later run can be the same function on the same inputs.

If a field is blank, a second implementation is a second experiment, even when both authors describe the blank with the same sentence.
:::

The open library’s one-line rules, as catalogued in the atlas notes on quants.md, are shorter than this list on purpose: they are labels on source files. Reading a label is not the same as holding the specification. Example Book A is written to the full list so that the later comparison and monitoring chapters have something frozen to point at. The link from a published page back to this form is the work of [[research-craft/comparing-implementations]] and of [[backtesting/reading-published-tests]].

Point-in-time is a restriction on the universe and on the price, not a slogan. A split that is adjusted only because the later series is convenient, a name that enters the file because it still exists on the download date, or a close that is revised after $t$ and then treated as if it had been known at $t$, each changes the information set. [[markets/adjustment-universes-and-rolls]] is where those mechanisms are defined. The specification either names the adjustment rule or it is not yet a specification.

:::warning A blank filled in after the fact
The usual slip is to treat the form as paperwork around a result you already like. If the window was chosen because it produced the largest compound return among three windows, the search field is “three windows, keep the maximum”, not “none”. Writing “none” would make the specification false. The statistic of a selected window is not the statistic of a pre-committed window. [[validation/parameter-search]] is where that distinction is tested; the specification is where it is disclosed.
:::

## The clock is part of the experiment

:::definition Legal clock {#def-clock}
Let $P_t$ be the price used by the specification at decision time $t$, and let the simple return $R_t = P_t/P_{t-1} - 1$ be the return over the interval that ends at $t$. A feature dated $t$ may use prices up to $t$. The **legal product** for a close-to-close book is $s_t R_{t+1}$: the feature earns the return that begins when the feature becomes known. The **same-bar product** $s_t R_t$ multiplies the feature by a return that ends at the same time. Cash, when the weight is zero, earns $0$ in this chapter.
:::

[[#def-clock]] is the atlas rule already used for signals and weights. It becomes a specification field the moment two books share a formula for $s_t$ and disagree about which return multiplies it. The disagreement is not a matter of taste in presentation. [[#prop-clock]] records the consequence for wealth.

:::proposition Different clocks, different experiments {#prop-clock}
Let $s_t \in \{0,1\}$ depend only on prices through time $t$, and set $s_t = 0$ when the signal’s window is not yet defined. Define wealth multiples, with no costs,

$$
W^{\mathrm{legal}} = \prod_{t=1}^{T} \bigl(1 + s_{t-1} R_t\bigr), \qquad W^{\mathrm{same}} = \prod_{t=1}^{T} \bigl(1 + s_t R_t\bigr),
$$

with $s_0 = 0$. If there exists an index $t$ at which $s_t \neq s_{t-1}$ and $R_t \neq 0$, and the weights agree at every other index, then $W^{\mathrm{legal}} \neq W^{\mathrm{same}}$. The two clocks are therefore different experiments: they are different functions of the price path.
:::

:::proof
The products differ by the single factor at that index. If the legal weight is $0$ and the same-bar weight is $1$, the ratio of the multiples is $1+R_t \neq 1$. If the legal weight is $1$ and the same-bar weight is $0$, the ratio is $1/(1+R_t) \neq 1$. In either case the multiples differ. On Path A the first disagreement, for the signal defined in the next section, is at the step from $101$ to $104$, where $R_t \neq 0$. The later weights of the two clocks agree. Hence the wealth multiples on Path A differ, by the factor $104/101$.
:::

The hypothesis is deliberately narrow. Equal wealth on one path does not prove the clocks are the same function. A tie rule below will produce, on this particular series, the same multiple as the same-bar clock, while still using an earlier information set. [[#prop-clock]] forbids the converse mistake: a shared formula for $s_t$ plus a visible gap in wealth is already enough to refuse the sentence “these are the same test”.

:::intuition One timestamp, two questions
At the close of day $t$ you know $P_t$. You do not know $P_{t+1}$. A rule that is allowed to collect $P_t - P_{t-1}$ as its profit for a decision that used $P_t$ has answered a different question: not “what happened after the decision?” but “what move coincided with the decision?”. Both questions can be written down. Only one of them is the question in [[#def-clock]].
:::

## Example Book A

Example Book A is the fictional specification we will freeze and then abuse on purpose. The asset is invented. The prices are Path A. Nothing in the note is an instruction to hold a traded instrument.

The fields, in the order of [[#def-spec]], are these.

- Universe: one fictional cash asset, name “Asset A”, present on every date of the sample. No corporate action occurs. The price is the close in the Path A list, known at that date and not revised.
- Clock: the legal clock of [[#def-clock]]. A decision at $t$ earns $R_{t+1}$.
- Signal: for $t \ge 2$, $s_t = 1$ if $P_t > \mathrm{SMA}_3(t)$, and $s_t = 0$ otherwise, where $\mathrm{SMA}_3(t) = (P_t + P_{t-1} + P_{t-2})/3$. For $t < 2$, $s_t = 0$ because the window is undefined. The tie is strict: equality is not a long position.
- Map: the target weight is $w_t = s_t$. The weight is a fraction of wealth. There is no leverage and no short leg. The signal becomes a weight only through this sentence.
- Rebalance: the weight may change at each close. The sample does not liquidate a terminal long position; no exit cost is charged after the last earned return.
- Cost: a proportional one-way cost $c = 0.001$ multiplies wealth at the rebalance instant, before the next return is earned. If the weight changes by $|\Delta w|$, wealth is multiplied by $(1 - c|\Delta w|)$ and then by $(1 + w R)$. Cash earns $0$. The gross book is the same map with $c = 0$, and it is reported as a different statistic, not as a substitute for the net book.
- Benchmark: buy and hold of Asset A over the whole sample, weight $1$ on every return, cost $0$. The benchmark’s compound simple return is $110/100 - 1 = 0.10$.
- Statistic: the compound simple return $W - 1$ of the wealth multiple defined by the cost rule. No annualisation. A sample Sharpe ratio is not claimed for seven points.
- Search: none. The window $3$, the strict tie, and the cost were written before the wealth in the examples below was used to keep or reject them. Both the window-$2$ variant and the same-bar variant are separate specifications, not discarded trials of this one.
- Versions: data version `path-A-invented-1`; software label `example-notebook 0.1`, meaning the arithmetic in this chapter. There is no broker, no account, and no order route in the version line.

The three-point averages on Path A, from the third close onward, are $101$, $102.3333$, $102.6667$, $104.6667$, $105.3333$, $107.6667$, rounded to four decimal places. Exactly, they are $101$, $307/3$, $308/3$, $314/3$, $316/3$, $323/3$. The strict signal is $0$ at the third close, because $101 = 101$, and $1$ at every later close. The legal weights on the seven returns are therefore $(0,0,0,1,1,1,1)$: the book is flat until the close $104$, then long through the move from $104$ to $110$.

:::example Legal gross wealth on Path A {#ex-legal}
Compute the compound simple return of Example Book A with $c = 0$.
:::solution
The book is long only from the close $104$ to the close $110$. The gross wealth multiple telescopes,

$$
\frac{103}{104} \cdot \frac{107}{103} \cdot \frac{106}{107} \cdot \frac{110}{106} = \frac{110}{104} = \frac{55}{52}.
$$

The compound simple return is $110/104 - 1 = 6/104 = 0.057692$ to six decimal places. The intermediate closes cancel. That cancellation is a fact about being continuously long, not a fact about the moving average being “right”.
:::
:::

Buy and hold compounds to $0.10$ on the same prices. The gap $0.10 - 0.057692 = 0.042308$ at six decimal places is the compound return the book did not earn while it was flat, on this path, ignoring the cross-term that appears when one subtracts compound returns rather than comparing multiples. It is a description of two strategies in the specification. It is not a reason to prefer the benchmark as something to own, and it is not an alpha until the statistic’s definition says it is. Example Book A’s statistic is the book’s own compound return, not the gap.

:::example The same signal, the other clock {#ex-same}
Keep every field of Example Book A except the clock: let $s_t$ multiply $R_t$, still with $c = 0$. Compute the compound simple return.
:::solution
The same-bar weights on the seven returns are $(0,0,1,1,1,1,1)$. The extra invested step is the move from $101$ to $104$, which is the step that pushed the close above the average. Wealth telescopes from $101$ to $110$:

$$
W^{\mathrm{same}} = \frac{110}{101}, \qquad W^{\mathrm{same}} - 1 = \frac{9}{101} = 0.089109
$$

to six decimal places. The legal multiple was $110/104$. The ratio of the multiples is $104/101$, as [[#prop-clock]] predicted, because the weight sequences differ only on that one step and the step’s return is not zero. The larger number uses information dated at the end of the step it earns. It is not a better estimate of the legal book. It is an answer to a different question, and the specification that omits the clock has invited it.
:::
:::

:::example One entry cost {#ex-cost}
Apply $c = 0.001$ to the legal book. There is one weight change, from $0$ to $1$, and no terminal liquidation.
:::solution
Proportional costs commute with later gross returns when every charge is a fraction of wealth at the charge and no fixed fee is added. One entry therefore multiplies the gross multiple by $1 - c$:

$$
W^{\mathrm{net}} = 0.999 \times \frac{110}{104} = 1.056635
$$

to six decimal places, and the compound simple return is $0.056635$ on the same rounding. The cost is small beside the clock gap of the previous example. Smallness is not a reason to leave $c$ unnamed. A specification with a blank cost and a specification with $c = 0.001$ are different experiments whenever a rebalance happens.
:::
:::

:::example A missing window is a different book {#ex-window}
Replace $\mathrm{SMA}_3$ by $\mathrm{SMA}_2$, keep the strict tie, the legal clock, and $c = 0$. Compute the compound simple return.
:::solution
The two-point averages from the second close are $101$, $101.5$, $102.5$, $103.5$, $105$, $106.5$, $108$. The strict signal is $1,0,1,0,1,0,1$ on those seven dates. The legal weight earns the next return, so the weights on the seven returns are $(0,1,0,1,0,1,0)$. The invested steps are $102 \to 101$, $104 \to 103$, and $107 \to 106$, three down steps. The wealth multiple is

$$
\frac{101}{102} \cdot \frac{103}{104} \cdot \frac{106}{107} = 0.971510
$$

to six decimal places, and the compound simple return is $-0.028490$ to six decimal places. Window $3$ gave $+0.057692$ on the gross legal clock. The English sentence “long when price is above its moving average” covers both calculations. [[#def-spec]] is what makes them two specifications rather than one result with a quarrel about rounding.
:::
:::

:::quiz
Example Book A and the same-bar calculation use the same inequality, the same window, and the same path. Which statement is fair?
- [ ] They are one experiment, because the signal formula matches.
- [x] They are different experiments, because the return each signal is allowed to earn is part of the specification.
- [ ] The same-bar wealth is the one to keep, because $0.089109 > 0.057692$.
- [ ] The gap will have the same sign on every other price path.
:::solution
[[#prop-clock]] only needs one path on which the weight sequences differ and the disputed return is not zero. Path A is such a path. A larger same-bar multiple is evidence that the clocks differ, not evidence that the illegal clock is the legal book’s true value, and not a prediction about other paths.
:::
:::

The tie is a field, not a courtesy. At the third close, $P = \mathrm{SMA}_3 = 101$. The strict rule sets $s = 0$. The weak rule $P_t \ge \mathrm{SMA}_3(t)$ sets $s = 1$ there, and the legal book then earns the step from $101$ to $104$ as well. Its gross multiple becomes $110/101$, the same number as the same-bar multiple on this path. The information sets are still different: the weak legal rule decides at the close $101$, before that step; the same-bar rule decides at the close $104$, using the step itself. Equal output on one series is not equal mechanism. A specification that says “above the average” and does not say whether equality counts has left this choice to the implementer.

:::remark What the version line is for
`example-notebook 0.1` does not need to be impressive. It needs to be specific enough that a change in the tie, the rounding of the average, or the order of multiplying the cost is a new version. Two wealth numbers that disagree by one unit in the sixth decimal can be a version change or a clock change. Without the version and the clock both written down, the disagreement has no diagnosis. That diagnosis is the subject of [[research-craft/paper-records-and-monitoring]].
:::

## What the search field protects

Suppose the gross legal compound returns for windows $2$ and $3$ are both computed, and window $3$ is the one placed in the abstract because $0.057692 > -0.028490$. The specification of that abstract is not Example Book A. Example Book A says the search was empty. The abstract’s specification says: two windows were tried; the reported window is the one with the larger compound return on Path A; the other result was $-0.028490$. Both documents can be honest. They cannot honestly share the line “search: none”.

This path is eight closes long. A maximum over two windows on eight closes is a classroom picture of a search, not a performance claim. The picture is still the right shape. A reader who is shown only the winner cannot reconstruct the search, and a search that cannot be reconstructed cannot be discounted. David Aronson’s *Evidence-Based Technical Analysis* (2007) pressed this point as a rule of method: a trading rule is a hypothesis, and the search that produced it is part of the hypothesis. Marcos López de Prado’s *Advances in Financial Machine Learning* (2018) made the matching demand on the software side: labels, splits, and the absence of leakage have to be specific enough to repeat. [[#def-spec]] is those two demands written as fields. Neither book is a mandate to trade the hypothesis once it has been written down.

:::application Reading a library label
A one-line library label often names a signal family, a pair of windows, and either orders or weights. It rarely, in the table this atlas is allowed to quote, names the tie, the cost, the benchmark, the search, and the build. Those omissions are not faults you repair by guessing. They are fields marked “not reported”, and a comparison that invents them has left the source. The next chapter does that comparison for two pairs of labels without filling the blanks.
:::

:::quiz
Window $3$ has the higher gross legal compound return on Path A. What may the search field say if that comparison is why window $3$ appears in the note?
- [ ] “None”, because only one window was published.
- [ ] “None”, because both windows use moving averages.
- [x] A description of the two windows and of the rule that kept the larger compound return.
- [ ] The Sharpe ratio $0.6097$ from the seven raw simple returns, which already accounts for the search.
:::solution
Publishing one window does not erase the windows that were computed and set aside. The ratio $0.6097$ is the mean of Path A’s simple returns divided by their sample standard deviation. It is not a correction for a search over moving-average windows, and Example Book A does not use it as the book’s statistic.
:::
:::

:::widget plot
f: 100+4*sin(x); 100+2*sin(x)
x: 0, 12
labels: wavy sketch; slower sketch
caption: Two sketches, not Path A and not an SMA. The slower curve lags the faster one. A specification has to name the window that produces the lag; a picture of a smooth line does not name it.
:::

:::history
In 2007 David Aronson’s *Evidence-Based Technical Analysis* argued that a trading rule should be tested as a hypothesis and that the search behind the rule belongs in the test. In 2018 Marcos López de Prado’s *Advances in Financial Machine Learning* treated reproducible labels, splits, and the exclusion of leakage as a minimum standard for a published financial result of that kind. Example Book A is those standards copied onto a toy path, not a summary of either book, and not a claim that the toy meets a regulatory filing rule.
:::

## Where this leads

[[research-craft/comparing-implementations]] puts two published labels side by side and refuses to invent the fields their pages do not state. [[validation/what-a-fold-does-not-prove]] is the reminder that a specification can be complete and still describe only one historical path. [[backtesting/weights-versus-orders]] separates the weight map used here from an order map, which Example Book A deliberately does not contain.

:::summary
- A research specification fixes universe, clock, signal, weight or order map, rebalance, cost, benchmark, statistic, search, and versions.
- A blank field is an invitation to run a second experiment under the same sentence.
- The legal close-to-close product is $s_t R_{t+1}$. The same-bar product $s_t R_t$ is a different experiment whenever the two wealth functions differ.
- On Path A, Example Book A’s gross legal compound return is $0.057692$ to six decimal places; the same-bar figure is $0.089109$; the window-$2$ legal figure is $-0.028490$.
- One proportional entry cost of $0.001$ changes the legal compound return to $0.056635$ on the same rounding. Naming $c$ is part of the experiment.
- Equal wealth on one path, as with the weak tie and the same-bar clock, does not make two information sets the same.
- A window kept because it won a comparison is a search, and the search field has to say so.
- Example Book A is fictional teaching arithmetic. It recommends no asset, no weight, and no order.
:::

## Exercises

:::exercise The average at the close 107 {level=1 check="104.6667"}
On Path A, compute $\mathrm{SMA}_3$ at the close $107$, rounded to four decimal places. (Enter the number.)
:::solution
The three closes are $104$, $103$, and $107$. Their sum is $314$, and $314/3 = 104.6666\ldots$, which rounds to $104.6667$. The close $107$ is strictly above that average, so Example Book A’s signal at that date is $1$. The weight that earns the next return is this signal, not the signal at the next date.
:::
:::

:::exercise Gross legal compound return {level=1 check="0.057692"}
For Example Book A with $c = 0$, enter the compound simple return rounded to six decimal places.
:::solution
The invested stretch runs from $104$ to $110$. The multiple is $110/104$ and the compound return is $6/104 = 0.057692307\ldots$, which is $0.057692$ to six decimal places. Do not add the rounded simple returns $-0.009615 + 0.038835 - 0.009346 + 0.037736$; that sum is a different statistic and is not the compound return.
:::
:::

:::exercise How many charged rebalances? {level=1 check="1"}
Under Example Book A’s legal weights and its rule of no terminal liquidation, how many rebalances does $c$ actually charge on Path A? (Enter the count.)
:::solution
The weight on successive returns is $(0,0,0,1,1,1,1)$, starting from a flat book. It changes once, from $0$ to $1$, and then stays at $1$. The sample does not charge an exit after the last return. The count is $1$.
:::
:::

:::exercise Same-bar compound return {level=2 check="0.089109"}
Enter the same-bar compound simple return on Path A, $c = 0$, rounded to six decimal places.
:::solution
Wealth runs from $101$ to $110$ because the same-bar rule is invested on the step that ends at $104$ and on every later step. The compound return is $9/101 = 0.08910891\ldots = 0.089109$ to six decimal places. [[#prop-clock]] identifies this gap with the legal book as a change of experiment, not as an improvement.
:::
:::

:::exercise Net compound return {level=2 check="0.056635"}
Enter Example Book A’s compound simple return with $c = 0.001$, rounded to six decimal places.
:::solution
One proportional entry multiplies the gross multiple by $0.999$. Then $0.999 \times 110/104 - 1 = 0.056634615\ldots$, which rounds to $0.056635$. The rounding is half up on the seventh decimal, which is $6$. Leaving the cost unnamed would report $0.057692$ for a different specification.
:::
:::

:::exercise Benchmark gap, as a number only {level=2 check="0.042308"}
Subtract the gross legal compound return, already rounded to six decimal places, from the buy-and-hold compound return $0.10$. (Enter the difference.)
:::solution
$0.10 - 0.057692 = 0.042308$. The specification’s benchmark is buy and hold with cost $0$. The difference of the two rounded compound returns is a comparison of those two statistics on this path. It is not a forecast, and subtracting it from a traded account is not something this chapter describes how to do, because there is no traded account in the specification.
:::
:::

:::exercise The weak tie {level=3}
Replace the strict inequality by $P_t \ge \mathrm{SMA}_3(t)$, keep the legal clock, and set $c = 0$. Compute the compound simple return. Then say why matching the same-bar number does not make the weak tie a same-bar rule.
:::hint
Only the third close is a tie. List the legal weights. The invested stretch will start one close earlier than in [[#ex-legal]].
:::
:::solution
At the third close the price equals the average, so the weak signal is $1$ there and remains $1$ afterwards. The legal weights on the seven returns become $(0,0,1,1,1,1,1)$. Wealth telescopes from $101$ to $110$, and the compound return is $9/101 = 0.089109$ to six decimal places, the same rounded figure as [[#ex-same]]. The decision that puts the weight on the step $101 \to 104$ is taken at the close $101$, when that future close is not an input. The same-bar rule puts a weight on that same step using the close $104$. Same product, different information set. A specification must say which one it means. On another path the two wealth multiples need not match.
:::
:::

:::exercise Window 2, legal and gross {level=3 check="-0.028490"}
Enter the compound simple return of the $\mathrm{SMA}_2$ legal book with $c = 0$, rounded to six decimal places, as in [[#ex-window]].
:::hint
Signal $1$ when the close strictly exceeds the average of itself and the previous close. The legal weight then multiplies the following return, not the return that just occurred. Three of those following returns are negative on Path A.
:::
:::solution
The legal weights are $(0,1,0,1,0,1,0)$. The multiple is $(101/102)\cdot(103/104)\cdot(106/107) = 0.971509775\ldots$. The compound return is $-0.028490$ to six decimal places. If this window was computed in order to choose between $2$ and $3$, the search field of the note that publishes only window $3$ has to mention both.
:::
:::
