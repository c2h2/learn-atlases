Take Path A and multiply each simple return by its own sign. The compound, over the six steps that have a neighbour, is $+0.142295$. Take the same closes and multiply each simple return by the sign of the previous return. The compound is $-0.128145$. The prices did not change. The clock did. The flattering number is the one a trader could not have held, because the sign was not known until the return it multiplies had already printed. That is the whole offence. Costs, added afterwards, do not acquit it.

The closes are Path A,

$$
P_0,\ldots,P_7 = 100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110,
$$

and the simple returns $R_t = P_t/P_{t-1} - 1$ for $t = 1,\ldots,7$ are, to six decimal places,

$$
0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ 0.038835,\ -0.009346,\ 0.037736.
$$

The signs alternate, starting with $+1$. No return is zero. The same-close, zero-cost calculation in [[backtesting/the-backtest-as-an-experiment]] is the second of the two compounds above, the legal one. This chapter computes the illegal one beside it, then subtracts a cost, then names the other ways a curve flatters itself.

## The product the clock allows

:::definition Legal product {#def-legal}
A feature dated $t$ may use prices up to and including $P_t$, and no later price. The simple return it is allowed to earn is the return *after* $t$,

$$
R_{t+1} = \frac{P_{t+1}}{P_t} - 1.
$$

The **legal product** of a signal $s_t$ with the path is $s_t R_{t+1}$. Equivalently, the weight held across the interval of $R_t$ is $w_t = s_{t-1}$, and the period contribution is $w_t R_t$. A signal is not a weight until a map is stated. In this chapter the map is the identity: the signal is already a weight in $\{-1,0,+1\}$. That permission to be short is a sentence of the classroom protocol. It is not advice to short any security.
:::

On Path A the legal momentum signal is $s_t = \sgn(R_t)$, and the products that exist are $s_t R_{t+1}$ for $t = 1,\ldots,6$, six of them. There is no $R_8$, and there is no $s_0$ inside this rule. The first return $R_1$ is a feature. It is not, under this signal, a profit.

:::definition Look-ahead {#def-lookahead}
**Look-ahead** is any input to the decision dated $t$ that was not available at $t$. The **same-bar product** $s_t R_t$, when $s_t$ is computed from $P_t$ or from $R_t$ itself, is look-ahead: the return $R_t$ ends at the timestamp the signal consumes. Other forms, not interchangeable with it, include a revised print that was published only later, a rank computed on the evaluation window, a parameter chosen on the same path that is then scored, and a limit filled with a low that the decision was not supposed to see. A backtest has look-ahead if any one of these is present, even when the equity curve is modest.
:::

:::intuition The sign arrives with the close
You cannot know $\sgn(R_t)$ until $P_t$ is known. By then the move from $P_{t-1}$ to $P_t$ is over. Multiplying those two numbers is multiplication. It is not a holding period. The anger appropriate to a same-bar backtest is the anger appropriate to a proof that uses the theorem it claims to prove.

The legal weight across $R_t$ is allowed to depend on $R_{t-1}$, because that return ended at $P_{t-1}$, which is the start of the interval. "Previous" is not a stylistic lag. It is the difference between a number you could have written in a log and a number you can write only afterwards.
:::

## Why the illegal product is larger

Define, for $t = 2,\ldots,7$, the illegal period return and the legal period return by

$$
u_t^{\mathrm{ill}} = \sgn(R_t)\, R_t = |R_t|, \qquad u_t^{\mathrm{leg}} = \sgn(R_{t-1})\, R_t.
$$

The illegal signal is the same-bar sign. The legal signal is the previous sign. Both are multiplied by the same $R_t$, on the same dates, so the window is not the cheat. The information set is the cheat.

:::proposition Same-bar sign dominates a lagged sign {#prop-samebar}
Let $R_2,\ldots,R_n$ be simple returns with $|R_t| < 1$ and $R_t \neq 0$ for each $t$. Then $u_t^{\mathrm{ill}} \ge u_t^{\mathrm{leg}}$ at every $t$, and

$$
\prod_{t=2}^{n} \bigl(1 + u_t^{\mathrm{ill}}\bigr) \ge \prod_{t=2}^{n} \bigl(1 + u_t^{\mathrm{leg}}\bigr).
$$

The two products are equal if and only if $\sgn(R_t) = \sgn(R_{t-1})$ for every $t = 2,\ldots,n$.
:::

:::proof
The lagged sign is either $+1$ or $-1$, so $u_t^{\mathrm{leg}}$ equals either $R_t$ or $-R_t$. In both cases $u_t^{\mathrm{leg}} \le |R_t| = u_t^{\mathrm{ill}}$. Equality holds at that date if and only if $\sgn(R_{t-1}) = \sgn(R_t)$.

The hypothesis $|R_t| < 1$ makes every gross factor positive: $1 + u_t^{\mathrm{leg}} = 1 - |R_t|$ or $1 + |R_t|$, and both exceed zero, while $1 + u_t^{\mathrm{ill}} = 1 + |R_t| > 0$. If $a_t \ge b_t > 0$ at each $t$, then the products satisfy $\prod a_t \ge \prod b_t$, because the ratio of the products is a product of ratios $a_t/b_t \ge 1$. If any single ratio exceeds $1$ and the rest are at least $1$, the product of the ratios exceeds $1$. Therefore the compounds, each product minus one, stand in the same order, and they agree if and only if every date has $\sgn(R_t) = \sgn(R_{t-1})$.
:::

The proposition does not mention Path A. It says that a same-bar sign rule, gross of costs, cannot lose to the lagged sign rule on any path whose returns are non-zero and smaller than $100\%$ in absolute value. When the illegal curve looks better, you have not discovered an edge. You have verified an inequality. Path A is the illustration on which the inequality is strict, because the signs never persist.

:::example The two compounds on Path A {#ex-compounds}
Compute $u_t^{\mathrm{ill}}$ and $u_t^{\mathrm{leg}}$ for $t = 2,\ldots,7$, and both compound simple returns.
:::solution
The absolute returns are $1/102$, $3/101$, $1/104$, $4/103$, $1/107$ and $2/53$. To six decimal places,

$$
0.009804,\ 0.029703,\ 0.009615,\ 0.038835,\ 0.009346,\ 0.037736.
$$

Those are the illegal period returns. The legal period returns are their negatives, because each consecutive pair of signs differs, so $\sgn(R_{t-1}) = -\sgn(R_t)$ and $u_t^{\mathrm{leg}} = -|R_t|$.

The illegal gross factors multiply as

$$
\frac{103}{102} \cdot \frac{104}{101} \cdot \frac{105}{104} \cdot \frac{107}{103} \cdot \frac{108}{107} \cdot \frac{110}{106} = \frac{105 \cdot 108 \cdot 110}{102 \cdot 101 \cdot 106} = \frac{12949}{91001}.
$$

The compound is $12949/91001 - 1 = 0.142295$ to six decimal places. The legal product of factors was already reduced in [[backtesting/the-backtest-as-an-experiment]] to $4851/5564$, and the compound is $-713/5564 = -0.128145$ to six decimal places.

The illegal equity index ends at $1.142295$. It rises at every mark, so the maximum drawdown on those marks is $0$. A drawdown of zero is what always receiving $|R_t|$ looks like. It is a symptom of the clock, not a measure of safety. The legal index ends at $0.871855$, and its drawdown on this falling path is $-0.128145$.

Of the six consecutive pairs $(R_{t-1}, R_t)$, the number that share a sign is zero. [[#prop-samebar]] then says the inequality of compounds is strict. It is. The gap between $+0.142295$ and $-0.128145$ is $0.270440$ at six decimal places. That gap is not a performance result.
:::
:::

:::quiz
Which product is the legal one, for a signal dated $t$?
- [ ] $s_t R_t$, because the signal and the return share an index
- [x] $s_t R_{t+1}$, with $s_t$ computed from prices up to $t$ only
- [ ] $s_{t+1} R_t$, because the future sign is a useful feature
- [ ] $|R_t|$, because a backtest should report the opportunity
:::solution
[[#def-legal]] earns the return after the dating of the signal. The same-bar product $s_t R_t$ uses the close that ends $R_t$. The absolute return is what that illegal product becomes when $s_t = \sgn(R_t)$, which is the inequality in [[#prop-samebar]], not a definition of profit.
:::
:::

## Subtract the cost anyway

A reader who has been scolded about costs will now want the cost to be the hero. It is not. Define turnover of the weight as $\tau_t = |w_t - w_{t-1}|$, with $w_1 = 0$ before the first position at $t = 2$. A change from $0$ to $+1$ has turnover $1$. A change from $+1$ to $-1$ has turnover $2$, because the book sells out of the long and sells again to become short. The cost model in this chapter, a sentence of the protocol and not a market's spread, subtracts

$$
c\, \tau_t, \qquad c = 0.001,
$$

from the period's simple strategy return. One thousandth of a unit of turnover is ten basis points of traded notional, charged inside the simple return. There is no separate fee schedule, and there is no final exit: the account is marked while still holding the last weight. Adding an exit would be another sentence.

On Path A both weight paths alternate at every step. The illegal weights $w_t = \sgn(R_t)$ for $t = 2,\ldots,7$ are $-1,+1,-1,+1,-1,+1$. The legal weights are $+1,-1,+1,-1,+1,-1$. Starting from flat, both turnover series are

$$
1,\ 2,\ 2,\ 2,\ 2,\ 2,
$$

and the sum is $11$. The cost series is therefore the same list of numbers. A common cost cannot be why one compound is larger.

:::corollary A common subtractive cost preserves the order {#cor-cost}
Under the assumptions of [[#prop-samebar]], let $c_t \ge 0$ and suppose $1 + u_t^{\mathrm{leg}} - c_t > 0$ at each $t$. Then

$$
\prod_{t=2}^{n} \bigl(1 + u_t^{\mathrm{ill}} - c_t\bigr) \ge \prod_{t=2}^{n} \bigl(1 + u_t^{\mathrm{leg}} - c_t\bigr),
$$

with equality if and only if the gross period returns were already equal at every date.
:::

:::proof
Subtracting the same $c_t$ from both period returns preserves $u_t^{\mathrm{ill}} - c_t \ge u_t^{\mathrm{leg}} - c_t$. The hypothesis keeps every legal net factor positive, and the illegal net factor is at least as large, hence also positive. The product argument in [[#prop-samebar]] applies to the net factors unchanged. Equality of products still requires equality at every date, which does not involve $c_t$.
:::

:::example Net of ten basis points {#ex-cost}
Subtract $0.001$ times the turnover series above from each gross period return, and compound.
:::solution
At $t = 2$ the turnover is $1$. The illegal net return is $1/102 - 0.001 = 449/51000$, or $0.008804$ to six decimal places. The legal net return is $-1/102 - 0.001 = -551/51000$, or $-0.010804$ to six decimal places. The later steps subtract $0.002$, because the turnover is $2$. Compounding the six exact net returns gives $0.130073$ for the illegal path and $-0.137924$ for the legal path, both to six decimal places. Every net factor is positive; the most negative legal net return on the path is about $-0.041$, so [[#cor-cost]] applies.

The illegal compound is still the larger one. Charging a cost was the right habit and the wrong repair. The gross illegal compound $0.142295$ and the net illegal compound $0.130073$ differ by $0.012222$, while the sum of the six cost terms is $0.011$. You may not subtract $0.011$ from the gross compound and call it the net compound. Each cost sits inside a growth factor, and factors do not add.

The legal gross compound $-0.128145$ becomes $-0.137924$ after the same cost. Costs made the legal path worse, as they should when turnover is charged, and they did not make the illegal path honest.
:::
:::

:::warning Costs are not a clock
A same-bar backtest that "includes commissions" is still a same-bar backtest. On this path the commission series is identical for the two rules, so it cancels in the comparison and leaves the inequality standing. If your illegal rule traded more often than your legal rule, costs would narrow the gap and might, on some other path, reverse a compound. They would still not move the illegal signal into the legal information set. The repair is to multiply $s_t$ by $R_{t+1}$.
:::

## The coincidence that does not rescue it

There is a legal rule whose Path A numbers match the illegal ones. It should be stated, because otherwise it becomes a rumour that excuses the clock.

The lagged reversal weight $- \sgn(R_{t-1})$ is legal: it uses only the previous return. On Path A the signs alternate, so $-\sgn(R_{t-1}) = \sgn(R_t)$ at every $t = 2,\ldots,7$. The legal reversal's period returns are therefore exactly $|R_t|$, the illegal momentum returns. The compounds match, $+0.142295$ gross of costs, on this path and only because every consecutive pair flips.

That match is not a backtest of reversal you have earned. You can see the alternation only by looking at the returns you are scoring. Choosing reversal because the path alternates is in-sample selection, which [[#def-lookahead]] already lists in another form: a parameter, here the choice of sign, picked on the evaluation window. On any path that repeats a sign even once, $\sgn(R_t)$ and $-\sgn(R_{t-1})$ disagree at that date, and the illegal momentum product and the legal reversal product split. The illegal experiment remains illegal regardless, because its signal consumed $R_t$. Two experiments can print the same six numbers without being the same experiment. Path A is a coincidence of outputs, not a permission.

Nothing in that paragraph says to trade a reversal. A historical average sign-reversal, on some other dataset, would be a hypothesis with a clock. It is not established by noticing that eight invented closes alternate.

:::example Count the persistent signs {#ex-persist}
How many of the six pairs $(R_{t-1}, R_t)$ for $t = 2,\ldots,7$ satisfy $\sgn(R_t) = \sgn(R_{t-1})$?
:::solution
The signs of $R_1,\ldots,R_7$ are $+,-,+,-,+,-,+$. Each consecutive pair differs. The count is zero. [[#prop-samebar]] then forces the illegal compound to be strictly larger, and it forces the legal lagged-reversal weight to agree with the illegal same-bar weight at every date. The count is a property of this list. It is not a market fact.
:::
:::

## Three further ways the curve lies

Look-ahead is the clock. Two neighbours do not need a broken timestamp and still make a careful-looking path meaningless. They get definitions so they can be checked, rather than felt.

:::definition Survivorship and omitted cost {#def-other}
**Survivorship bias** is the exclusion, from the whole history, of names that died, merged, or left the dataset before the end of the sample. The decision dated $t$ may use only the universe that was eligible at $t$. A universe defined as "names that have a price on the last day of the file" is look-ahead about membership, even when each price series, taken alone, is lagged correctly.

An **omitted cost** is a cost the strategy's turnover would have paid that the reported path does not subtract. A zero cost model is allowed only when the protocol says the cost is zero. Silence is not zero. The model in [[#ex-cost]] is not silence: it states $c = 0.001$ per unit of turnover.
:::

:::example A universe that kept only the survivors {#ex-surv}
Three invented names have one-period simple returns $+0.20$, $+0.10$ and $-0.80$. The third name delists at the end of the period. An equal-weight mean that includes the delisting, and an equal-weight mean of the two survivors only, are different experiments. Compute both.
:::solution
The full cross-section has mean $(0.20 + 0.10 - 0.80)/3 = -0.50/3 = -1/6$, or $-0.166667$ to six decimal places. The survivor study has mean $(0.20 + 0.10)/2 = 0.15$. The survivor number is positive. The number that includes the name that died is negative. No price was shifted in time. The bias is the membership rule. This is not a study of any exchange, and it is not a reason to avoid or to prefer the names that survived. It is a reason to date the universe.
:::
:::

A checklist, short enough to apply to a page you did not write, is then:

- the timestamp inside every feature, against the timestamp of the return it multiplies;
- the date on which each name becomes eligible, and the date on which a delisted name stops contributing;
- the cost model, including the number $c$ and the definition of turnover, or an explicit zero;
- the window the metric uses, matched to the window of any benchmark;
- the number of configurations touched before the reported one was chosen.

The last item is not computed on Path A, where the rule was stated before the compounds. It is the reason a pretty same-bar curve and a searched curve can look alike. Searching is taken up in [[backtesting/reading-published-tests]]. A finer bar makes the same-bar mistake easier to commit, because the signal and the return share a clock that feels too precise to be wrong. That is [[backtesting/intraday-samples]].

:::widget hypothesis
test: z
tail: right
alpha: 0.05
effect: 0.3
n: 60
caption: Power of a one-sided test of a mean excess return, under the widget's normal model. The same-bar Path A compound is not a sample from this curve: its edge was manufactured by the clock. Raise n only after the product is s times the return after the signal. The figure is not a market.
:::

The widget assumes a genuine mean shift and independent draws. Path A's illegal mean is positive because each summand was replaced by its absolute value. No sample size repairs that substitution. The legal six-step mean is $-0.022506$, and six points would be a poor place to read power even if the clock were clean. The figure is here so that the urge to "test the edge" has somewhere to wait until the product is legal.

:::quiz
On Path A, after subtracting $0.001$ times the common turnover series, which statement is true?
- [ ] The legal compound becomes the larger one, because costs punish the illegal rule more
- [ ] The two net compounds agree, because the costs agree
- [x] The illegal net compound is still larger, and it is still not a legal backtest
- [ ] Both net compounds are positive
:::solution
The turnover series match, so [[#cor-cost]] keeps the illegal net compound above the legal one. The computed values are $+0.130073$ and $-0.137924$. The legal net compound is negative. Including a cost did not move $\sgn(R_t)$ out of the return it multiplies.
:::
:::

:::history
Campbell, Lo and MacKinlay, *The Econometrics of Financial Markets* (1997), is this course's reference for the demand that an event study date the information set and name the return that comes after the event. A product of a signal with the return that ends on the signal's own timestamp fails that demand. The six-step arithmetic above is the small version of the failure. It uses invented closes, not their data, and it does not estimate a market.
:::

## Where this leads

A one-minute bar does not make the legal product optional. [[backtesting/intraday-samples]] is what a short, fine sample can illustrate and what it cannot annualise. Reading someone else's curve, including a curve that has already included a cost, is [[backtesting/reading-published-tests]]. The same-close legal compound used here was first obtained, gross of costs, in [[backtesting/the-backtest-as-an-experiment]].

:::summary
- The legal product is a signal dated $t$, built only from prices up to $t$, times the simple return after $t$.
- The same-bar product $\sgn(R_t)\, R_t$ equals $|R_t|$. On any path with non-zero returns smaller than $100\%$ in absolute value, its compound is at least the compound of the lagged sign, gross of a common cost.
- On Path A the illegal compound is $+0.142295$ and the legal compound is $-0.128145$, over $t = 2,\ldots,7$. The signs never persist, so the gap is strict.
- Subtracting $0.001$ times turnover, with the same turnover series $1,2,2,2,2,2$, leaves net compounds $+0.130073$ and $-0.137924$. The illegal path still looks better. The cost was not the bug.
- A legal reversal matches the illegal numbers on this alternating path only. Choosing it for that reason is selection on the evaluation window, not a repair of the clock.
- Survivorship is a membership clock. An omitted cost is a missing sentence. Silence is not a zero cost.
- None of these figures is a forecast or an instruction to trade.
:::

## Exercises

:::exercise The illegal step from 102 to 101 {level=1 check="0.009804"}
Enter the illegal period return $\sgn(R_2)\, R_2$ to six decimal places. $R_2$ is the simple return from $102$ to $101$.
:::solution
$R_2 = -1/102$, and the sign of $R_2$ is $-1$, so the product is $+1/102 = 0.00980392\ldots$, which is $0.009804$ to six decimal places. The position has collected the absolute return. It could not have known the sign until the close that created it.
:::
:::

:::exercise The legal step on the same close {level=1 check="-0.009804"}
The legal weight across $R_2$ is $\sgn(R_1)$. $R_1 = 0.02$. Enter the legal period return to six decimal places.
:::solution
$\sgn(R_1) = +1$, so the legal product is $+1 \cdot (-1/102) = -0.009804$ to six decimal places. The long weight was known at the close of $102$, and the next close was $101$.
:::
:::

:::exercise How often the sign persists {level=1 check="0"}
Enter the number of dates $t = 2,\ldots,7$ at which $\sgn(R_t) = \sgn(R_{t-1})$ on Path A.
:::solution
The signs alternate at every step. The number of persistent pairs is $0$. [[#prop-samebar]] then says the illegal compound is strictly larger than the legal compound, which [[#ex-compounds]] confirms.
:::
:::

:::exercise The illegal compound {level=2 check="0.142295"}
Enter the compound simple return of the six illegal period returns $|R_t|$ for $t = 2,\ldots,7$, to six decimal places.
:::solution
The gross factors reduce to $12949/91001$, as cancelled in [[#ex-compounds]]. The compound is $12949/91001 - 1 = 0.142295139\ldots$, which is $0.142295$ to six decimal places. The figure is $|R_t|$ compounded. It is not an edge.
:::
:::

:::exercise The legal compound {level=2 check="-0.128145"}
Enter the compound simple return of the six legal period returns $\sgn(R_{t-1})\, R_t$, to six decimal places.
:::solution
Each legal return equals $-|R_t|$ on this path. The product of the gross factors is $4851/5564$, and the compound is $-713/5564 = -0.128145$ to six decimal places.
:::
:::

:::exercise Turnover from flat through six weights {level=2 check="11"}
Legal weights for $t = 2,\ldots,7$ are $+1,-1,+1,-1,+1,-1$, starting from weight $0$ at $t = 1$. Enter the sum of turnover $\tau_t = |w_t - w_{t-1}|$ over the six steps. Do not add a final exit.
:::solution
The first change is $|1 - 0| = 1$. Each later change is $|{-1} - {+1}| = 2$ or the reverse, also $2$. There are five such changes. The sum is $1 + 5 \cdot 2 = 11$. The illegal weights are the negatives of these weights, so they have the same absolute changes and the same sum.
:::
:::

:::exercise Why each illegal step wins {level=3}
Prove that $|R_t| \ge \sgn(R_{t-1})\, R_t$ whenever $R_{t-1} \neq 0$, and say when equality holds. Do not assume that the signs alternate.
:::hint
The lagged sign is $+1$ or $-1$. Compare $R_t$ and $-R_t$ with the absolute value.
:::
:::solution
If $\sgn(R_{t-1}) = 1$, the right-hand side is $R_t$, and $|R_t| \ge R_t$ always, with equality exactly when $R_t \ge 0$, that is when the two signs agree or $R_t = 0$. If $\sgn(R_{t-1}) = -1$, the right-hand side is $-R_t$, and $|R_t| \ge -R_t$ always, with equality exactly when $R_t \le 0$. In both cases equality holds if and only if $\sgn(R_t) = \sgn(R_{t-1})$ or $R_t = 0$. Alternation is not used. Alternation is what makes the inequality strict on every Path A date.
:::
:::

:::exercise A legal rule that copies the illegal numbers {level=3 check="0"}
The lagged reversal weight is $-\sgn(R_{t-1})$. Enter the number of dates $t = 2,\ldots,7$ on Path A at which this legal weight differs from the illegal weight $\sgn(R_t)$.
:::hint
Write the seven signs in a row. A lagged reversal equals the next sign precisely when the signs flip.
:::
:::solution
The signs are $+,-,+,-,+,-,+$. At each $t = 2,\ldots,7$ the previous sign is the opposite of the current sign, so $-\sgn(R_{t-1}) = \sgn(R_t)$. The number of disagreements is $0$. The period returns therefore match, and both gross compounds equal $+0.142295$. The match does not make the same-bar product legal. The reversal weight uses $R_{t-1}$ only; the same-bar weight uses $R_t$. They agree here because the path alternates, which is visible only on the sample being scored. Selecting reversal for that reason is a choice made on the evaluation window. It is not a trading instruction, and it would fail on the first pair of consecutive returns that shared a sign.
:::
:::
