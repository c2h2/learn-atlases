A rule that cannot be written down cannot be wrong, and a rule that cannot be wrong is not research. Systematic trading research asks for something narrower than a story about markets. At a stated time $t$, the rule may read only what was already available, and it may be scored only on what happens afterwards. Everything later in this atlas — a moving average, a volatility target, a stop, a walk-forward fold — is a choice about that rule and about the experiment used to criticise it.

The economic hope behind a rule is not the rule. "Buy strength" names a hope. It does not say which prices count as strength, when the decision is taken, what is held, or which return is allowed to count as the result. Two people can share the hope and run two different experiments. Published numbers that look similar can come from experiments that do not share a clock. This chapter fixes the objects so that later chapters can disagree precisely.

The open library used throughout the atlas is the public catalogue at quants.md, built from the Apache-2.0 QuantJourney examples, as read in 2026. The library sorts its cases into three families. This atlas has not re-run those backtests. They are illustrations of protocols, not forecasts, and not suggestions to hold anything. The project itself describes the software as not a broker, not a live trading system and not investment advice. That boundary is the boundary of this course as well.

## What a decision is allowed to know

Prices will be written $P_t$ for the decision time $t$. In this chapter $t$ is the close of a bar, and $P_t$ is that close. The simple return that ends at $t$ is

$$
R_t = \frac{P_t}{P_{t-1}} - 1,
$$

defined whenever $P_{t-1} \neq 0$. The return that begins at $t$ and ends at the next close is $R_{t+1}$. Those two numbers use different prices. Mixing them up is the mistake this chapter exists to make expensive on the page, before it becomes expensive in a piece of research.

:::definition Information set and signal {#def-information}
The **information set** $\mathcal{F}_t$ is the collection of numbers the rule is allowed to read at time $t$. A number is in $\mathcal{F}_t$ only if it was fixed by time $t$ under the data convention you have stated. A **signal** $s_t$ is a value computed from $\mathcal{F}_t$ alone. We write $s_t \in \mathcal{F}_t$ as shorthand for that restriction. In particular, under the close convention, $P_t$ may enter $s_t$, and $P_{t+1}$ may not.
:::

This is a research convention, not a course in measure theory. We do not need a sigma-algebra to use it. We need a list. If the list says "daily closes up to $t$", then an intraday high from inside the bar is not on the list, even if some vendor could have printed it. If the list says "the close is known at $t$", then $P_t$ is allowed. The list is part of the rule. Changing the list changes the experiment.

A signal can be a bit, a rank, a real number, or a vector with one entry per name. None of those objects is yet a position. The sentence "the signal was positive" does not say how much capital was exposed, whether the exposure was long or short, or what instruction, if any, was sent to a market. Those are further maps, and each map has to be written down.

:::definition Weight {#def-weight}
A **weight** $w_t$ is a target fraction of net asset value, dated at a decision time. It is in $\mathcal{F}_t$: the target may depend on the signal and on other numbers already known, and not on later prices. A signal becomes a weight only under a stated map. Until that map is written, $s_t$ is not a holding.
:::

The same signal can be mapped in more than one way. One map sends a positive bit to $w_t = 1$ and a non-positive bit to $w_t = 0$, with cash earning a rate you also state (often $0$ in a short example). Another map sends $s_t \in \{-1,+1\}$ to a fully invested long or short book, $w_t = s_t$. Those are different experiments. Both are weights. Neither is an order, because a fraction of net asset value does not say whether the trade is a market order or a limit, or what happens if the desired trade does not occur.

:::definition Order {#def-order}
An **order** is an instruction with a side, a quantity and a type: a request that a market, or a model of a market, may fill, cancel or miss. An order may be a function of $\mathcal{F}_t$, but it is not a weight. A weight names a target fraction. An order names a message. The message is not itself a fill.
:::

Keeping the three words apart is the whole discipline. A signal is something you can compute from the past. A weight is a target fraction you have agreed to score. An order is a message whose result depends on a path you have not yet seen. Walk-forward work, the third family in the library, is not a fourth object of this kind. It is a way of repeating an experiment on later slices of one history. The catalogue describes those pages as slice diagnostics, not as independent out-of-sample evidence. We will use that description as written, and we will not promote a fold into a forecast.

:::quiz
A twenty-day average of closes up to date $t$ is which object?
- [ ] A weight, because an average is a fraction
- [ ] An order, because it tells a broker what to do
- [x] A signal, if it is computed only from $\mathcal{F}_t$, and not yet a weight or an order
- [ ] A fill, because the average uses traded prices
:::solution
The average is a number computed from closes the rule is allowed to have read. That makes it a signal once the window is stated. It becomes a weight only when a map from the average to a fraction of net asset value is stated, and it becomes an order only when a message is stated. Using traded prices in the average does not make the average a fill.
:::
:::

## The legal product

The scored result has a clock of its own. Under a close-to-close convention, a decision taken when $P_t$ is known cannot earn the move from $P_{t-1}$ to $P_t$. That move is already in the past. The next move, from $P_t$ to $P_{t+1}$, is the first return the decision has not already observed.

:::proposition Legal close-to-close product {#prop-legal}
Assume four things. The decision time is the close of bar $t$. The simple return $R_t = P_t/P_{t-1} - 1$ is a function of $(P_{t-1}, P_t)$, so it is fixed at $t$ and is not, in general, fixed at $t-1$. The signal $s_t$ is in $\mathcal{F}_t$ and may therefore depend on $P_t$. A position chosen at the close of bar $t$ earns none of the price change that has already occurred between $t-1$ and $t$.

Then the product $s_t R_t$ scores a return whose right-hand price, $P_t$, is a price the signal was allowed to see. The return that starts only after the decision is $R_{t+1}$. The legal close-to-close product is $s_t R_{t+1}$.
:::

:::proof
By the second assumption, $R_t$ depends on $P_t$. A decision that earns $R_t$ must have been taken using only what was known before $P_t$ arrived, which under this clock means $\mathcal{F}_{t-1}$. The signal in the product $s_t R_t$ is dated $t$, so the third assumption lets it depend on $P_t$. The same price is then inside the signal and at the endpoint of the return being scored. The fourth assumption says a decision at $t$ has not earned that endpoint: the endpoint was already known when the signal was formed.

Replace the scored return by $R_{t+1} = P_{t+1}/P_t - 1$. The signal may still use $P_t$, which is allowed. The new endpoint is $P_{t+1}$, which is not in $\mathcal{F}_t$. The product $s_t R_{t+1}$ is therefore the close-to-close score consistent with the four assumptions. Any other pairing either uses a future price inside the signal or pays the signal with a return it has already seen.
:::

The proposition does not say that close-to-close fills are realistic. It says that if you have chosen that convention, the algebra has to match it. A convention that fills at the next open earns a different increment, from that open to a later price, and the legal product changes with the convention. What does not change is the order of time. The fill price is not an input to the signal that requested the fill.

:::warning Scoring the same bar you used to decide
The usual slip is to form $s_t$ from $P_t$, or from $R_t$, and then to multiply by $R_t$. On a sign rule with no zero return this product equals $\abs{R_t}$, so every bar looks like a gain. The gain is the absolute value of a return the rule has already observed. It is not the result of a decision. [[#prop-legal]] is the repair: keep the signal, and multiply by the next return.
:::

:::intuition A locked filing cabinet
Treat $\mathcal{F}_t$ as a cabinet that locks at time $t$. You may build $s_t$ and $w_t$ from the papers already inside. The return $R_{t+1}$ is a paper that arrives after the lock. A legal score pairs the papers inside with the paper that arrives next. An illegal score photocopies a paper that is already inside and calls the photocopy a profit.
:::

:::algorithm Scoring a close-to-close rule {#alg-score}
Start from a stated series of closes, a stated formula for $s_t$, and a stated map from $s_t$ to a weight $w_t$. Cash, if the weight is not fully invested, earns a stated rate, taken to be $0$ unless you say otherwise.

1. Compute each simple return $R_{t+1}$ from consecutive closes. Do not use a high, a low or a later revision.
2. Compute $s_t$ from $\mathcal{F}_t$ only. If the formula refers to $P_{t+1}$, stop: the clock is illegal.
3. Apply the map to get $w_t$. If you have no map, stop: you have a signal, not a result.
4. Form the one-period result $w_t R_{t+1}$ (plus the cash rate on any uninvested fraction, if that rate is not zero).
5. Compound the gross factors $\prod (1 + w_t R_{t+1})$ over the dates that possess a next return. A signal on the last date of the sample has nothing left to earn inside the sample. Leave it unscored.
:::

The algorithm is the proposition turned into a checklist. Step 5 is easy to miss on a short series. The last signal is not a missing profit. There is no next close.

## Four sentences

Plain language hides which object a person has specified. The next example sorts four sentences that a reader might think were one strategy.

:::example Four sentences, four objects {#ex-four}
Classify each sentence as a signal, a weight, an order, or an illegal clock. Do not add a map the sentence does not contain.

1. "The twenty-day average of closes is above the fifty-day average."
2. "When that comparison is true, the target fraction of net asset value is $1$; otherwise it is $0$. The weight earns the next close-to-close return. Cash earns $0$."
3. "When the twenty-day average crosses above the fifty-day average, submit a market buy for $100$ shares."
4. "Today's close rose, so book today's rise as the profit of a long position decided today."
:::solution
The first sentence names a comparison of two averages. Once the windows and the date are fixed, the comparison is a bit in $\mathcal{F}_t$. It is a signal. It is not a weight: nothing says what fraction of net asset value follows from the bit. It is not an order: nothing is submitted.

The second sentence takes a signal of that kind and states the map, the clock and the cash rate. The target fractions $1$ and $0$ are weights under [[#def-weight]]. The phrase "earns the next close-to-close return" is the legal product from [[#prop-legal]], with $w_t$ in place of a bare signal. It is still not an order. A weight of $1$ does not say market or limit, and it does not say what is held if the trade fails.

The third sentence asks for a message: buy, market, $100$ shares, triggered by a cross. That is an order under [[#def-order]]. The cross is the signal that fires the message. The quantity is in shares, not in a fraction of net asset value, so the sentence is not yet a weight rule. Whether the market order fills, and at which price, is not in the sentence. A later course treats fills. Here it is enough that the message and the fill are different.

The fourth sentence decides with today's close and scores today's return. Both sides use $P_t$. That is the illegal product $s_t R_t$ forbidden by [[#prop-legal]]. The legal rewrite would score the next return, which this sentence does not do. Classifying it as "a long strategy" would launder the clock.
:::
:::

The four sentences can share the words "moving average" and still be four experiments. Later, when two library pages both mention a moving average and print two different compound growth rates, the first question is which of these objects each page varied. It is not which page "won".

## A path with two clocks

The running numerical example of the atlas is Path A, eight invented closes

$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110),
$$

at dates $t = 0, 1, \ldots, 7$. Nothing here is a market. The simple returns, rounded to six decimals as in the path statement, are

$$
0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ 0.038835,\ -0.009346,\ 0.037736.
$$

There are seven returns and eight prices. The compound simple return from $100$ to $110$ is $0.10$. We will use the integer prices as the inputs and report compound results to six decimals. Compounding the six-decimal returns above produces the same six decimals on the figures in this chapter; the arithmetic was checked in Python before it was written down.

:::example The same signs, two scores {#ex-clock}
Define $s_t = +1$ when $R_t > 0$ and $s_t = -1$ when $R_t < 0$, for $t = 1, \ldots, 7$. No return on this path is zero, so the signal is always defined. Take the map $w_t = s_t$, a fully invested long or short book, with no borrow fee and no financing. That short side is an arithmetic device so the map is explicit. It is not a suggestion to sell anything short.

Compute the illegal products $s_t R_t$ and the legal products $s_t R_{t+1}$. Compound each series. The last signal has no $R_8$; leave it out of the legal compound.
:::solution
The seven returns alternate in sign: positive, negative, positive, negative, positive, negative, positive. Therefore $s_t = \operatorname{sign}(R_t)$ and, on this path only, $\operatorname{sign}(R_{t+1}) = -s_t$ whenever both exist. This alternation is a fact about these eight numbers. It is not a result about markets.

The illegal product is $s_t R_t = \abs{R_t}$ on every date. The seven absolute returns compound to a simple return of $0.165141$. Every step is a gain because the rule is being paid the absolute value of a return it used to build the signal. [[#prop-legal]] says that number is not a backtest under the close-to-close clock.

The legal products, for $t = 1, \ldots, 6$, are the negatives of the following returns:

$$
-0.009804,\ -0.029703,\ -0.009615,\ -0.038835,\ -0.009346,\ -0.037736.
$$

Each one is negative because of the alternation just noted. Their compound simple return is $-0.128145$. The terminal gross factor is $0.871855$. The signal at $t = 7$ is $+1$ and is unscored: the sample has no eighth return.

For comparison, a weight of $+1$ on every date from the first close to the last earns the Path A total, $0.10$. The legal signed rule earns less than that flat long position on this toy. The illegal signed rule earns more than the flat long position. Only the legal figure is a score under [[#alg-score]], and even that figure is eight invented prices, not evidence.
:::
:::

Read the comparison in that order. A larger number is not a better rule when the larger number was produced by reading the endpoint of the return. On this particular path the legal rule loses money in every scored period. That loss is the toy behaving as its signs force it to behave. It is not a reason to prefer the opposite signal, and it is not a reason to discard the clock. A clock that only keeps rules which made money on the sample you have in front of you is a second form of the same cheat.

:::example A different map on the same signal {#ex-weight}
Keep $s_t$ from [[#ex-clock]]. Change the map. Set $w_t = 1$ when $s_t = +1$ and $w_t = 0$ when $s_t = -1$. Cash earns $0$. Score $w_t R_{t+1}$ for $t = 1, \ldots, 6$ and compound.
:::solution
The weights on $t = 1, \ldots, 6$ are $1, 0, 1, 0, 1, 0$. The signed signal at the down dates has been replaced by a flat book. The six one-period results are

$$
-0.009804,\ 0,\ -0.009615,\ 0,\ -0.009346,\ 0.
$$

The zeros are the cash periods, not missing data. The compound simple return is $-0.028490$, a terminal gross factor of $0.971510$.

The signal did not change between this example and [[#ex-clock]]. The map did. The legal signed book lost $0.128145$; the legal long-or-cash book lost $0.028490$; the unscored illegal book gained $0.165141$; the always-long book gained $0.10$. Four numbers, one path, one signal formula. Quoting any one of them as "what the sign rule did" deletes the map and the clock. Both are part of the result.

The weight $w_t = 0$ is a decision. It earns the cash rate, here zero, rather than earning nothing in the sense of a blank cell. If cash earned a non-zero rate, each flat period would contribute that rate, and the compound would move. Stating the rate as zero is a modelling choice, and it is binding.
:::
:::

:::quiz
On Path A, the signal $s_3$ is built from the close $104$ and the previous close $101$. Which return is it allowed to earn under [[#prop-legal]]?
- [ ] The return from $101$ to $104$, because that is the return which set the signal
- [x] The return from $104$ to $103$, because that return begins at the decision close
- [ ] The return from $103$ to $107$, because a signal should skip a day
- [ ] The compound return from $100$ to $110$, because the whole path is the result
:::solution
The signal dated at the close $104$ may use that close. The next close is $103$, and $R$ on that step is $-0.009615$. The return from $101$ to $104$ is how the signal was built, so scoring it would be the illegal product. The later step from $103$ to $107$ is $R$ after the next decision, not the return attached to this one.
:::
:::

## Compounding is not a strategy

A gross factor can be plotted without any rule at all. The plot is then a picture of arithmetic. It becomes a backtest only when the steps are the outputs of [[#alg-score]].

:::example A constant gross return {#ex-compound}
A constant simple return of $0.001$ per step has gross factor $1.001$. Over $40$ steps the compound simple return is $(1.001)^{40} - 1$. Compute it. Separately, find the constant simple return per step which compounds to Path A's terminal multiple $1.10$ in seven steps.
:::solution
Python gives $(1.001)^{40} - 1 = 0.040790$ to six decimals. That is a description of multiplying $1.001$ by itself. No information set was stated, no signal was computed, and no weight was chosen. Calling the curve a strategy would invent all three.

Path A ends at $110/100 = 1.10$ after seven returns. The constant simple rate $g$ with $(1+g)^7 = 1.10$ is

$$
g = 1.10^{1/7} - 1 = 0.013709
$$

to six decimals. A path that rose by $0.013709$ at every step would share Path A's terminal wealth and would not share Path A's intermediate closes. The terminal multiple is a summary. It does not restore the decisions, because there were no decisions in the constant path, and the decisions in a real rule are not identified by the terminal multiple alone. The dashboard chapter returns to this point when a compound annual rate is read off a page.
:::
:::

:::widget sequence
a: (1.001)^n
mode: terms
N: 40
caption: Forty terms of a constant gross return of 1.001. The curve is arithmetic, not a strategy. Nothing was decided at step n, and no information set was stated. Compounding describes a path; it does not justify one.
:::

The widget draws $1.001$, $1.001^2$, and so on. Dragging your eye along it is not a research result. The same shape will appear later when someone plots $(1 + g)^x$ from a published compound growth rate. That later curve is still a smooth summary of one reported rate. It is not the equity path, and it is not a reason to adopt the rule that was being summarised.

:::remark What the three families count
As read in 2026, the open library contains $25$ weight-mode examples, numbered W01 to W25, $20$ order-mode examples, numbered O01 to O20, and $5$ walk-forward examples, numbered WF01 to WF05. Weight mode sets target weights. Order mode submits explicit orders. Walk-forward pages ask whether a result holds up across slices, and the library describes those pages as slice diagnostics rather than as independent out-of-sample evidence. The counts are counts of published examples. They are not a menu, and they are not sample sizes you may add together.
:::

:::example Sorting three library cases {#ex-families}
Using only the one-line descriptions in the library, place O01, W01 and WF01 into the three families. Do not treat the placement as a ranking.
:::solution
O01 is "Market SMA Cross": buy when a twenty-day average crosses above a fifty-day average, and sell on the reverse, with market orders. The object being varied is the order. It belongs to the order family. The averages are the signal that fires the message. We do not need the reported growth rate to see that.

W01 is "Daily SMA Trend": hold each sector exchange-traded fund while a fifty-day average is above a two-hundred-day average, and rebalance daily. The object being set is a holding rule in weights, not a market-order message. It belongs to the weight family. The two pages both mention averages of prices. They do not mention the same windows, the same rebalance, or the same object. "The moving-average strategy" is not a well-defined experiment.

WF01 is "Rolling Walk-Forward Validation": $48$ folds, sliding train and test windows, with a pre-test exclusion, over a span the catalogue gives as $26$ years. The library's own framing, read with the catalogue in 2026, is that these are slice diagnostics, not independent out-of-sample evidence. The family is walk-forward. A fold count is not a count of independent trials. This atlas has not re-run the page.

None of the three placements says that a reader should trade the average, the fund, or the fold. Placement answers "what object did the page claim to compute?" It does not answer "what should be held?"
:::
:::

:::history
In 1602 the Vereenigde Oostindische Compagnie issued transferable shares, and a secondary market in those shares grew in Amsterdam. That episode is the usual starting point for the modern joint-stock share. Transferability is what makes a later price series possible: a claim that cannot change hands has no secondary price for a rule to read. The systematic question in this chapter is asked of those prices only after the claim exists. The date does not make any modern market a descendant you are invited to trade; it fixes the object the price is a price of.
:::

## Where this leads

The next chapter, [[markets/instruments]], says what the weight is a weight in: a cash share, a fund share, a dollar price of a currency, or a futures contract with a multiplier. The return $R_t$ used here is unpacked in [[performance/simple-and-log-returns]], including the log return and the reason you may not add simple returns and call the sum a result. The published rows for the families named in [[#ex-families]] are read as a dashboard in [[markets/reading-a-dashboard]], after the series itself has been adjusted honestly.

:::summary
- A systematic rule is a function of an information set $\mathcal{F}_t$. It is not a story, and it is not a terminal wealth.
- A signal $s_t$ is computed from $\mathcal{F}_t$. A weight $w_t$ is a target fraction under a stated map. An order is a message. The three are different objects.
- Under a close-to-close clock the legal product is $s_t R_{t+1}$, or $w_t R_{t+1}$ once a map is stated. The product $s_t R_t$ has looked at the endpoint of the return it scores.
- On Path A, the signed map $w_t = \operatorname{sign}(R_t)$ compounds to $-0.128145$ when scored legally and to $0.165141$ when scored illegally. The gap is the clock, not a market fact.
- Changing the map, and not the signal, changed that legal result to $-0.028490$. Quote the map with the number.
- A constant compound curve such as $(1.001)^n$ is arithmetic. It becomes a backtest only when the steps are outputs of a stated rule.
- The open library, as read in 2026, holds $25$ weight examples, $20$ order examples and $5$ walk-forward examples. This atlas has not re-run them. They are not advice, and the walk-forward pages are slice diagnostics in the library's own words.
:::

## Exercises

:::exercise The first step of Path A {level=1 check="0.02"}
The Path A closes begin $100$, $102$. Enter the simple return on that step as a decimal.
:::solution
$R = 102/100 - 1 = 0.02$. The same figure is the first of the seven path returns, $0.020000$ at six decimals. It uses both closes and nothing else. A signal dated at the close $102$ may use this return as an input. It may not book this return as its own profit: that would be the illegal product in [[#prop-legal]].
:::
:::

:::exercise Latest close a signal may use {level=1 check="104"}
A signal dated at $t = 3$ on Path A uses the close convention of [[#def-information]]. Enter the latest price it is allowed to read.
:::solution
The dates run $t = 0, \ldots, 7$ with prices $100, 102, 101, 104, 103, 107, 106, 110$. At $t = 3$ the close is $104$. Prices after that date, starting at $103$, are not in $\mathcal{F}_3$. The previous closes $100$, $102$ and $101$ are allowed if the formula asks for them. The latest allowed price is $104$.
:::
:::

:::exercise One legal product {level=1 check="-0.009615"}
Take $s_3 = +1$ on Path A, from the rise $101$ to $104$. Enter the legal product $s_3 R_4$ to six decimals, using the path's rounded return on the step from $104$ to $103$.
:::solution
The next return is the path's fourth simple return, $-0.009615$, which equals $103/104 - 1$ at the printed precision (the exact value is $-1/104$). The signal is $+1$, so the product is $-0.009615$. The illegal product on the same date would have been the positive return from $101$ to $104$, that is $0.029703$. That positive number is how the signal was formed. It is not the score.
:::
:::

:::exercise Two gross factors {level=2 check="-0.039216"}
In [[#ex-clock]] the first two legal one-period results are $-0.009804$ and $-0.029703$ at the path's six-decimal returns. Enter the compound simple return of those two steps alone, to six decimals. Use the exact price ratios if you prefer; they agree at this precision.
:::solution
The gross factors are $1 - 0.009804 = 0.990196$ and $1 - 0.029703 = 0.970297$ at six decimals. From the integer prices the same two factors are $101/102$ and $104/101$ with the signs of the legal products already applied, and their product is $0.960784$. Subtracting $1$ gives $-0.039216$ to six decimals. The full six-step legal compound, $-0.128145$, is a longer product. Stopping after two steps is a different window, and it must be labelled as such. A positive reading of a short window is not hiding inside these two steps: both factors are below $1$.
:::
:::

:::exercise Half the next return {level=2 check="0.01"}
A signal $s_t = +1$ is mapped to the weight $w_t = 1/2$, and the next simple return is $0.02$. Cash earns $0$ on the uninvested half. Enter the one-period portfolio simple return.
:::solution
The invested half contributes $(1/2) \times 0.02 = 0.01$. The cash half contributes $0$. The portfolio simple return is $0.01$. The signal was $+1$ and the weight was $1/2$; reporting $0.02$ would silently replace the map by a fully invested book. [[#def-weight]] is what blocks that replacement. If the cash rate had been $0.001$ on the same step, the cash half would have added $0.0005$ and the portfolio return would have been $0.0105$. The rate has to be in the sentence.
:::
:::

:::exercise How many legal losses {level=2 check="6"}
On Path A, with $w_t = \operatorname{sign}(R_t)$ scored on the next return, how many of the six legal products are strictly negative? Enter that count.
:::solution
The signs of $R_1, \ldots, R_7$ are $+,-,+,-,+,-,+$. Adjacent signs disagree on every pair, so each of the six products $s_t R_{t+1}$ equals $-\abs{R_{t+1}}$ and is strictly negative. The count is $6$. This is a property of the alternation in these seven returns. A path whose signs did not alternate would produce a different count. Nothing in the count is a forecast, and the illegal products, which are all positive, are not the repaired version of the same count.
:::
:::

:::exercise Why the illegal book cannot lose a step {level=3}
Assume $R_t \neq 0$ and $s_t = \operatorname{sign}(R_t)$. Show that $s_t R_t = \abs{R_t} > 0$, so a same-bar sign rule has no losing step. Then explain why the compound of those absolute returns is still not a backtest under [[#prop-legal]].
:::hint
Write $\operatorname{sign}(R_t)\, R_t$ from the definition of sign, and then look at which price both factors share.
:::
:::solution
If $R_t > 0$, then $\operatorname{sign}(R_t) = +1$ and the product is $R_t = \abs{R_t}$. If $R_t < 0$, then $\operatorname{sign}(R_t) = -1$ and the product is $-R_t = \abs{R_t}$. The hypothesis $R_t \neq 0$ keeps the absolute value strictly positive. Every same-bar step is a gain, and the compound of gains is a gain. On Path A that compound is $0.165141$.

The algebra is not in dispute. The clock is. The signal uses $R_t$, hence uses $P_t$, and the return being scored also ends at $P_t$. [[#prop-legal]] says a close-to-close decision at $t$ has not earned $R_t$. The compound of absolute returns is the compound of returns the rule has already observed. [[#alg-score]] refuses it at step 2 if the signal reaches into the return it scores, and it refuses the pairing even when the signal formula is otherwise simple. A rule with no losing step on the sample, produced this way, is a description of the absolute value, not a test of a decision.
:::
:::

:::exercise What an average of the library would not mean {level=3}
The library contains $25$ weight-mode examples, $20$ order-mode examples and $5$ walk-forward examples, as read in 2026. Suppose a reader averaged the $25$ weight-mode compound growth rates and called the average "the performance of weight mode". Explain why that sentence would still be empty of the systematic question, even if every rate were known and this atlas had re-run every page. Do not invent an average.
:::hint
A mean is a function of numbers. Ask what those numbers would have failed to hold fixed: the information set, the map, the horizon, and the library's own description of what a page is.
:::
:::solution
The $25$ pages are $25$ experiments. They do not share a universe, a window, a span, a cost, a cash convention or a definition of the statistic being averaged. W01, for example, is a daily weight rule on sector funds with averages of length $50$ and $200$; other weight pages in the same count use different rules and different horizons, including intraday pages whose spans are measured in days or weeks. An average mixes those protocols into one number and then attaches the name of a software mode. The mode is not an information set.

Re-running the pages, which this atlas has not done, would not repair the sentence. Twenty-five honest replications of twenty-five different functions are still twenty-five functions. [[#def-weight]] says a weight is a target fraction under a stated map. There is no single map called "weight mode" sitting underneath the average. Walk-forward pages are excluded from the count of $25$, and the library does not present even those pages as independent out-of-sample evidence. Treating the average as a reason to prefer weights over orders, or as a reason to trade, adds a recommendation the inputs cannot support. The systematic question is asked of one stated function at one stated clock. An average that deletes the function has not asked it.
:::
:::
