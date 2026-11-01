A curve is not an experiment. The experiment is the list of choices that produced the curve: which prices were eligible, what a signal was allowed to see, whether a target weight was assumed to have traded, and which return that weight was allowed to earn. Change one sentence in that list and you have a different experiment, even when the English description of the rule has not changed at all.

The closes used in this chapter are Path A,

$$
P_0,\ldots,P_7 = 100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110.
$$

The simple return $R_t = P_t/P_{t-1} - 1$, for $t = 1,\ldots,7$, equals, to six decimal places,

$$
0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ 0.038835,\ -0.009346,\ 0.037736.
$$

Those seven numbers are a fixed dataset. They become a backtest only when a protocol says what may multiply them. The asset itself, held from $P_0$ to $P_7$, has compound simple return $0.10$. That figure is a property of the closes. It is not yet a strategy, and it is not a suggestion to hold anything.

## The object being measured

A **backtest** is a calculation that turns a frozen dataset and a frozen rule into a net-asset-value path, and then into one or more summary numbers. The calculation is useful only to the extent that someone else, given the same sentences, would obtain the same path. A screenshot of a broker's blotter is not that calculation. A backtest does not route an order, does not custody an account, and does not tell you to buy, sell or hold any security. The library this course reads says the same of its own engine: the software is not a broker, not a live trading system and not investment advice.

:::definition Backtest protocol {#def-protocol}
A **protocol** is the written list of stages from data to a reported metric. In this course the stages are: dataset and its version; features; signals; the map from signals to target weights or to orders; the fill rule; the position accounting; the net-asset-value path; the cost model; the metric, including the sample window it uses. Two protocols that differ in any stage are different experiments. A **signal** $s_t$ is not a weight until the map is stated. In the numerical work below the map is the identity on $\{-1,+1\}$, and that sentence is part of the protocol, not a default of nature.
:::

The temptation is to treat the metric as the protocol. "The compound return was $-0.13$" does not say whether the position was entered at a close or at the next open, whether a cost was charged, or whether the first return in the file was eligible. Those are not details for an appendix. They are the difference between two numbers you are about to see.

:::intuition What a sceptical colleague can point at
If a colleague cannot point at one stage and name its input and its output, the curve is an anecdote. The pipeline is dull on purpose. Dullness is what makes the argument inspectable. An attractive equity curve is cheap to produce, by a broken clock or by a search over rules. The protocol is the part that can be wrong in a way you can write down before you look at the curve.
:::

## The pipeline, one stage at a time

Each stage has an information set. Later stages may see earlier outputs. No stage may see a price that the protocol has not yet released.

:::algorithm From data to a metric {#alg-pipeline}
1. Freeze the dataset. Record the version. Path A's version, in this chapter, is the eight closes above. Opens, if a fill rule needs them, are a further versioned series, not a silent assumption.
2. Compute features from prices the decision is allowed to see. A feature dated $t$ may use $P_0,\ldots,P_t$ and nothing after $t$.
3. Map features to a signal $s_t$. Record the formula, including every window.
4. Map the signal to a target weight or to an order. State whether fractional holdings are allowed. The identity map $w_t = s_t$ is a choice.
5. Apply the fill rule. A market fill at a named price is not a limit that might miss. The fill price is a number in the protocol, not a mood.
6. Update the position from the fill. Cash and inventory have to add up to net asset value under the accounting you stated.
7. Mark the position to the next eligible price and append the gross growth factor. If the cost model is not identically zero, put the cost inside this step and say so.
8. Compute the metric on a stated window. A compound return over six steps is not a compound return over seven, and neither is an annualised Sharpe ratio.
:::

Reproducibility is three labels plus the sentences in [[#alg-pipeline]]. The **data version** names the file or the table. The **code version** names the formulae actually evaluated, not the intention in a notebook comment. The **seed** names the random draws. If the rule is deterministic, the honest label is "seed unused", not a blank. A blank is how a later reader invents a different rule and thinks it is yours.

Our Path A calculations are deterministic, so the seed is unused. The code version is the signal and the fill sentence in the next section. The data version is the eight closes, plus an open series when and only when the fill sentence mentions opens.

## One sentence about the fill

The signal in both protocols below is the sign of the previous return. For $t = 2,\ldots,7$ the weight held across the interval that produces $R_t$ is

$$
w_t = \sgn(R_{t-1}) \in \{-1,+1\},
$$

with $\sgn(u) = 1$ if $u > 0$, $\sgn(u) = -1$ if $u < 0$, and $\sgn(0) = 0$. No Path A return is zero, and the signs of $R_1,\ldots,R_7$ alternate, starting with $+1$. So the weights are

$$
w_2,\ldots,w_7 = +1,\ -1,\ +1,\ -1,\ +1,\ -1.
$$

The weight $w_t$ uses only $R_{t-1}$, which is known at the close $P_{t-1}$. It does not use $P_t$. Costs in this chapter are zero. Costs are a different sentence; they are computed in [[backtesting/timing-costs-and-biases]].

What the two protocols do not share is the price at which $w_t$ is assumed to have been obtained.

:::proposition Fill price in the simple return {#prop-fill}
Let $s$ be a weight known before a fill, and suppose the account obtains that weight at a price $X > 0$ and marks it at a later price $M > 0$, with no cost and no other position. The simple return on the weight is $s(M/X - 1)$. In particular, a same-close fill $X = C > 0$ and a next-open fill $X = O > 0$ produce

$$
s\Bigl(\frac{M}{C} - 1\Bigr) \qquad\text{and}\qquad s\Bigl(\frac{M}{O} - 1\Bigr),
$$

and these are equal if and only if $s = 0$ or $O = C$. The same-close return minus the next-open return equals

$$
s\, M\, \frac{O - C}{C\, O}.
$$
:::

:::proof
The change in the mark, per unit of account of notional at the fill, is $M/X - 1$. Multiplying by the weight $s$ is the definition of the strategy's simple return under this accounting. Subtracting the two expressions gives

$$
s\Bigl(\frac{M}{C} - 1\Bigr) - s\Bigl(\frac{M}{O} - 1\Bigr) = s M \Bigl(\frac{1}{C} - \frac{1}{O}\Bigr) = s M \frac{O - C}{C\, O}.
$$

The prices $M$, $C$ and $O$ are positive by assumption, so the difference vanishes exactly when $s = 0$ or $O = C$.
:::

:::corollary No gap, same gross return {#cor-nogap}
Under the assumptions of [[#prop-fill]], if the open equals the previous close, the same-close protocol and the next-open protocol report the same simple return on every step. A gap of zero is a theorem about the formula, not an empirical claim about any market.
:::

:::proof
Set $O = C$ in the difference of [[#prop-fill]]. The difference is zero for every $s$ and every $M > 0$.
:::

The opens used below are an invented supplement, written down so that the fill price is a number. They are not part of Path A, and they are not a reconstruction of any session's open. The closes remain Path A.

| Step $t$ | Previous close $P_{t-1}$ | Invented open $O_t$ | Close $P_t$ |
|---|---|---|---|
| 2 | 102 | 102.40 | 101 |
| 3 | 101 | 100 | 104 |
| 4 | 104 | 104.50 | 103 |
| 5 | 103 | 103.25 | 107 |
| 6 | 107 | 107.80 | 106 |
| 7 | 106 | 105 | 110 |

:::warning Same close is not same bar
"Fill at the close that has just printed" can mean two incompatible clocks. In this chapter the signal is $\sgn(R_{t-1})$, the fill is at $P_{t-1}$, and the return earned is the *next* move, from $P_{t-1}$ to $P_t$. The close used by the signal is the start of the return, not the end of it. Multiplying a signal by the return that ends at the same timestamp is a different protocol, and an illegal one. It is the subject of [[backtesting/timing-costs-and-biases]], and it is not hiding inside the phrase "same close".
:::

:::example One step, two fill sentences {#ex-one-step}
Take the step $t = 3$. The previous return is $R_2 = 101/102 - 1 = -1/102 < 0$, so $w_3 = -1$. The same-close fill is at $101$ and the mark is $104$. The next-open fill is at the invented open $100$, with the same mark. Compute both strategy returns, and check them against the difference formula in [[#prop-fill]].
:::solution
The asset move from $101$ to $104$ is $104/101 - 1 = 3/101$, which equals $0.029703$ to six decimal places. The weight is $-1$, so the same-close strategy return is $-3/101$, or $-0.029703$.

The asset move from $100$ to $104$ is $104/100 - 1 = 0.04$. The strategy return is $-0.04$.

The difference, same-close minus next-open, is $-3/101 - (-0.04) = 0.010297$ to six decimal places. The formula gives

$$
(-1) \cdot 104 \cdot \frac{100 - 101}{101 \cdot 100} = 104 \cdot \frac{1}{10100} = \frac{26}{2525} = 0.010297
$$

to the same six places. The open was one unit of account below the previous close, and the weight was short, so filling at the open shorted a larger rally. One sentence, the fill price, moved the step from $-0.029703$ to $-0.04$. Neither number is a forecast. Both are arithmetic on stated prices.
:::
:::

:::example The six-step compounds {#ex-six}
Using $w_t = \sgn(R_{t-1})$ and zero costs, compute the compound simple return of the same-close protocol and of the next-open protocol over $t = 2,\ldots,7$.
:::solution
Same-close strategy returns are $w_t R_t$. Because the signs of Path A alternate, $w_t = -\sgn(R_t)$ at every one of these six steps, and each strategy return equals $-|R_t|$:

$$
-0.009804,\ -0.029703,\ -0.009615,\ -0.038835,\ -0.009346,\ -0.037736,
$$

to six decimal places. The gross factors are $1 - |R_t|$. Their product telescopes:

$$
\frac{101}{102} \cdot \frac{98}{101} \cdot \frac{103}{104} \cdot \frac{99}{103} \cdot \frac{106}{107} \cdot \frac{102}{106} = \frac{98 \cdot 99}{104 \cdot 107} = \frac{4851}{5564}.
$$

The compound simple return is $4851/5564 - 1 = -713/5564$, which equals $-0.128145$ to six decimal places.

Next-open strategy returns, from the exact opens and closes, are

$$
-\frac{7}{512},\ -\frac{1}{25},\ -\frac{3}{209},\ -\frac{15}{413},\ -\frac{9}{539},\ -\frac{1}{21},
$$

or, to six decimal places, $-0.013672$, $-0.040000$, $-0.014354$, $-0.036320$, $-0.016698$, $-0.047619$. The product of the exact gross factors, computed in exact arithmetic, is the rational $1 - 102745877/651348082$, so the compound simple return is $-102745877/651348082$, or $-0.157743$ to six decimal places. Multiplying the already rounded six-decimal step returns instead produces $-0.157744$. The figure this chapter reports is the exact one, $-0.157743$.

The two compounds differ by $0.029598$ at six decimal places. The next-open path is the lower one *on these invented opens*. Step $t = 5$ goes the other way: the same-close return is $-0.038835$ and the next-open return is $-0.036320$, because the short was entered at $103.25$ rather than at $103$ and therefore missed part of the rise. A single step's ranking does not determine the compound's ranking. Nothing here says that one fill convention is the one to use in a market. It says that the convention is part of the result.
:::
:::

:::quiz
Under [[#prop-fill]], the same-close and next-open simple returns on a step are equal in which case?
- [ ] Whenever the signal is $\pm 1$, because the weight has the same size
- [x] When the open equals the previous close, or the weight is zero
- [ ] Only when the mark equals the open
- [ ] Never, because an open is a different timestamp
:::solution
The difference derived in [[#prop-fill]] is $s M (O-C)/(C O)$. With positive prices it is zero exactly when $s = 0$ or $O = C$. A non-zero weight and a genuine gap produce different simple returns. Equality is allowed; it is the content of [[#cor-nogap]].
:::
:::

## What the metric is allowed to see

The equity index starts at $1$ before $t = 2$. Each step multiplies it by the gross factor. For the same-close protocol the index ends at $4851/5564$, or $0.871855$ to six decimal places. For the next-open protocol it ends at $0.842257$ to six decimal places. On both paths the index falls at every mark, so the maximum drawdown, the largest peak-to-trough fall, equals the compound return itself: $-0.128145$ and $-0.157743$. That coincidence is special to a falling path. It is not the definition of drawdown. The definition, and a path on which the terminal return hides a deeper hole, belong to [[performance/volatility-and-drawdown]].

Over the same six steps the asset's own compound simple return is $P_7/P_1 - 1 = 110/102 - 1 = 0.078431$ to six decimal places. Over all seven steps it is $0.10$. Comparing either strategy compound with $0.10$ would mix a six-step window with a seven-step window. The benchmark, if you want one, has to use the strategy's window. Even then the comparison is a description of this path under this rule. Path A alternates in sign, so a one-bar momentum weight is on the wrong side of every step. That is a fact about eight numbers. It is not a research conclusion about momentum, and it is not an instruction to take the other side.

:::example A ratio we refuse to annualise {#ex-ratio}
The six same-close strategy returns have sample mean $-0.022506$ and sample standard deviation $0.014499$, using the divisor $n-1 = 5$. The risk-free rate in this example is $0$. Compute the ratio of mean to standard deviation, and say what you will not do with it.
:::solution
The ratio of the unrounded mean to the unrounded sample standard deviation is $-1.5523$ to four decimal places. Dividing the six-decimal displays $0.022506$ and $0.014499$ by each other is a slightly different rounding; the reported ratio uses the returns themselves. The ratio is a per-step number on six observations. Multiplying it by $\sqrt{252}$ would dress a one-week classroom path as an annual Sharpe ratio. This chapter does not do that. The standard error of a Sharpe ratio on a short sample is the subject of [[performance/uncertainty-of-performance]], and six observations are not that subject.
:::
:::

:::example Naming the two experiments {#ex-names}
Write the protocol labels for the two calculations in [[#ex-six]], and say which labels differ.
:::solution
Both use data version "Path A closes". Both use code version "weight equals the sign of the previous simple return; identity map; no cost; compound simple return on $t = 2,\ldots,7$". Both have seed unused. The same-close experiment's fill sentence is "fill at $P_{t-1}$, mark at $P_t$". The next-open experiment's fill sentence is "fill at the versioned open $O_t$ listed in the table, mark at $P_t$", and its data version therefore adds that open table. The metrics are $-0.128145$ and $-0.157743$. A reader who copies the signal formula and changes the fill sentence has not reproduced the experiment. They have started another one.
:::
:::

:::widget plot
f: (1.001)^x; (1.001)^x*(0.998)^x
x: 0, 40
labels: no extra factor; extra factor 0.998
caption: Two invented compound paths. The lower curve multiplies by an extra 0.998 at every step, a stand-in for a fill or cost sentence that the upper curve omits. Move along the axis and watch a small protocol difference compound. These curves are not Path A and not a forecast.
:::

The figure is a cartoon of [[#prop-fill]], not a picture of the six Path A steps. A constant factor is easier to see than six unequal gaps. The lesson of the figure is the same as the lesson of the table: a factor you forgot to write down does not stay small just because it is small once.

:::application Where the library splits the same pipeline
The open library's engine, as that project describes it, has a weight mode that sets target weights and an order mode that submits explicit orders. That split is one stage of [[#alg-pipeline]], the map from a signal to a weight or to an order, and it is the whole of the next chapter. A reported compound annual growth rate is not readable until you know which mode produced it. The pages are QuantJourney examples under Apache-2.0, as catalogued on quants.md and read in 2026. This atlas has not re-run them, and it does not treat them as instructions.
:::

:::quiz
Which label belongs in a protocol even when the calculation never draws a random number?
- [ ] The name of a broker to send the orders to
- [ ] A forecast of next year's compound return
- [x] The seed, recorded as unused
- [ ] The reader's preferred asset class
:::solution
A deterministic rule still has a seed label: "unused". Omitting it lets a later version add a random fill model without anyone noticing that the experiment changed. Naming a broker, or a preferred asset, is not a stage of [[#alg-pipeline]]. This is a research calculation, not an account.
:::
:::

:::history
In 2014 David H. Bailey, Jonathan M. Borwein, Marcos López de Prado and Qiji Jim Zhu published "Pseudo-Mathematics and Financial Charlatanism" in the Notices of the American Mathematical Society. They showed how easily a search over rules produces an attractive in-sample equity curve, and they named that practice backtest overfitting. The paper is a methods warning. It does not offer a security, a market or a forecast. The curves in this chapter are eight closes under two fill sentences, which is a smaller way to make two different numbers, and it is not a search. The point in common is that an attractive path is not, by itself, a measurement.
:::

## Where this leads

The next chapter, [[backtesting/weights-versus-orders]], changes a different sentence: target weights against orders that can miss. Fills, spreads and the reason a backtest can report a trade that a limit would not have got are taken further in [[orders/fills-slippage-and-spread]]. The refusal to annualise six observations is the start of [[performance/uncertainty-of-performance]], not a substitute for it.

:::summary
- A backtest is a protocol plus a frozen dataset. The equity curve is the output, not the definition.
- The stages are data, features, signals, weights or orders, fills, positions, net asset value, costs and a metric on a stated window.
- Record the data version, the code version and the seed, and write "seed unused" when that is the truth.
- A signal is not a weight until the map is stated. Here the map was the identity on the sign of the previous return.
- Same-close and next-open fills on Path A, gross of costs, compound to $-0.128145$ and $-0.157743$ over the six steps $t = 2,\ldots,7$. The opens were invented; the closes were Path A.
- Those two numbers differ because the fill price enters the simple return, unless the open equals the previous close or the weight is zero.
- A backtest is not a broker and not advice. Six steps do not support an annualised Sharpe ratio.
:::

## Exercises

:::exercise The first Path A return {level=1 check="0.02"}
The closes begin $100$, $102$. Enter the simple return $R_1$. (Enter the simple return.)
:::solution
$R_1 = 102/100 - 1 = 0.02$.
:::
:::

:::exercise Sign of the second return {level=1 check="-1"}
Enter $\sgn(R_2)$, where $R_2$ is the simple return from $102$ to $101$. Use $-1$, $0$ or $1$.
:::solution
$101/102 - 1 = -1/102 < 0$, so the sign is $-1$.
:::
:::

:::exercise A short from an invented open {level=1 check="-0.04"}
At step $t = 3$ the weight is $-1$, the invented open is $100$ and the close is $104$. Enter the next-open strategy return.
:::solution
The asset return from $100$ to $104$ is $0.04$. The weight is $-1$, so the strategy return is $-0.04$.
:::
:::

:::exercise The gap at the first strategy step {level=2 check="0.003868"}
At step $t = 2$ the weight is $+1$, the previous close is $102$, the invented open is $102.40$ and the close is $101$. Enter the same-close strategy return minus the next-open strategy return, to six decimal places.
:::solution
Same-close: $101/102 - 1 = -1/102$, or $-0.009804$ to six decimal places. Next-open: $101/102.40 - 1 = -7/512 = -0.013671875$, or $-0.013672$ to six decimal places. The difference of the exact returns is $101/26112$, which equals $0.003868$ to six decimal places. The same figure comes from [[#prop-fill]] with $s = 1$, $M = 101$, $C = 102$ and $O = 102.40$. The long position filled at the higher open, so it suffered a larger loss on the way to $101$.
:::
:::

:::exercise The asset on the strategy's window {level=2 check="0.078431"}
Enter the compound simple return of the Path A closes from $102$ to $110$, to six decimal places. This is the asset's return over the six steps the strategies use, not a recommendation to hold the asset.
:::solution
$110/102 - 1 = 8/102 = 4/51 = 0.078431372\ldots$, which is $0.078431$ to six decimal places. The full path from $100$ to $110$ is $0.10$, a different window.
:::
:::

:::exercise How many strategy steps {level=2 check="6"}
The weight $w_t = \sgn(R_{t-1})$ is defined for every $t$ that has both a previous return and a return to earn. On Path A, with returns indexed $t = 1,\ldots,7$, how many such steps are there? (Enter the number of steps.)
:::solution
$R_{t-1}$ exists for $t \ge 2$, and $R_t$ exists for $t \le 7$. The steps are $t = 2,3,4,5,6,7$, six of them. There is no legal weight for $R_1$ under this signal, because there is no $R_0$.
:::
:::

:::exercise When the fill sentence is idle {level=3}
Prove, from the expressions in [[#prop-fill]] and without quoting the corollary as a reason, that the two simple returns agree if and only if the weight is zero or the open equals the previous close. Assume $M$, $C$ and $O$ are positive.
:::hint
Form the difference and factor it. A product of non-zero terms is not zero.
:::
:::solution
Write the difference as $s M (O - C)/(C O)$. The denominator $C O$ is positive. The mark $M$ is positive. A fraction with positive denominator is zero only when the numerator is zero, so $s(O-C) = 0$, hence $s = 0$ or $O = C$. Conversely, either of those two conditions makes the numerator zero, so the difference is zero and the simple returns agree. The argument does not use Path A and does not say that opens usually equal closes.
:::
:::

:::exercise The same-close compound {level=3 check="-0.128145"}
Using the six same-close strategy returns $-|R_t|$ for $t = 2,\ldots,7$, enter the compound simple return to six decimal places.
:::hint
Each gross factor is one minus the absolute simple return. Write the factors as price ratios and cancel before you subtract $1$.
:::
:::solution
The factors are $101/102$, $98/101$, $103/104$, $99/103$, $106/107$ and $102/106$. Cancelling $101$, $103$, $106$ and then $102$ leaves $98 \cdot 99 / (104 \cdot 107) = 9702/11128 = 4851/5564$. Subtract $1$: $(4851 - 5564)/5564 = -713/5564 = -0.128145219\ldots$, which is $-0.128145$ to six decimal places. The path is negative because every weight had the wrong sign on this alternating series. That is a description of the protocol on Path A, not a trading instruction.
:::
:::
