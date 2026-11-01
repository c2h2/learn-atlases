Once a specification is frozen, later bars are not a licence to edit it. They are a sample the writing did not see. A paper record applies the frozen rule to those bars and stores a hypothetical net-asset path. No order is sent to a market. The record can catch a feed that no longer matches the specification, a corporate-action rule that changed underneath the code, or a signal whose window or clock has drifted. It cannot catch the future. Agreement between the record and a recomputation says the implementation followed the specification on the bars in hand. It does not say the specification will keep producing the wealth it produced in research.

The toy in this chapter is the frozen form of Example Book A from [[research-craft/writing-a-specification]], pointed at a new five-close path that is not Path A. The point of the arithmetic is the disagreement a bug creates, not a preference for the larger multiple.

## What is being stored

:::definition Paper record {#def-paper}
A **paper record** for a frozen specification is a hypothetical wealth path computed on bars that arrive after the specification’s fields were fixed. It stores, at least, the inputs the clock allows, the signal the formula returns, the weight or the order *type* the map would have produced, the cost the model charges, and the wealth multiple that follows. It sends nothing to a market, opens no account, and does not become a live order by lasting for many days. A **match** is equality, under the specification’s arithmetic, between that stored wealth and an independent recomputation from the same frozen fields and the same bars. A **mismatch** is the negation.
:::

The italic on “type” is deliberate. The record may say “the map’s weight was $1$” or “the specification’s order type would have been a market order with this limit”. It does not transmit either object. Describing an order type, so that a mismatch in order type is detectable, stays inside research. Connecting the record to a broker is a different project, and this chapter does not describe it.

The first Global Investment Performance Standards, issued in 1999 by what is now CFA Institute, treated a presented track record as something that needs a written method. That is the instinct worth borrowing. A paper record is not a GIPS track record. GIPS, as a compliance regime, concerns composites that were actually managed, with rules this chapter does not teach and is not qualified to apply. The paper path below was not managed. Calling it a track record would steal a word from a protocol that requires a portfolio the paper path does not have.

:::proposition What a match can decide {#prop-match}
Assume the specification is complete enough to recompute, the paper record and the recomputation use the same bars, and the arithmetic is the specification’s arithmetic. If the stored wealth $N$ and the recomputed wealth $M$ satisfy $N \neq M$, the claim “this record implements the specification on these bars” is false. If $N = M$, that claim is true of these bars. In either case, no claim about a return after the last bar is settled: such a return is not a function of the pair $(N, M)$.
:::

:::proof
The implementation claim, as restricted in the assumptions, is the equality $N = M$. Its truth value is the truth value of that equality, so a mismatch refutes it and a match confirms it on these bars. Let $R_{\star}$ be a simple return on a later interval that has not arrived. $R_{\star}$ is not determined by $N$ and $M$. Any sentence whose truth depends on the value of $R_{\star}$ — that it will be positive, that it will repeat a research average, that the wealth multiple will stay above $1$ — can be true or false with $(N, M)$ held fixed. Observing the pair therefore does not decide the sentence.
:::

The proposition is narrow on purpose. A match does not show that the cost model is realistic, only that the record used the cost model that was written. If the frozen cost is zero, a matching record confirms a zero cost. It does not measure a spread the specification forgot. Monitoring detects disagreement with the specification. It does not silently upgrade the specification. Adding a spread after seeing a painful paper path, and not writing the addition as a new specification, is the blank-field failure of the previous chapter, moved one step later.

:::warning A paper path is not a broker path
The slip is to treat a long matching record as evidence that “the same orders would have filled”. Fills depend on a book, a queue, and a fee schedule the paper record does not contain unless the specification built them in. Example Book A does not contain them. A match confirms the arithmetic of weights and costs on the stored bars. It does not confirm an execution. Nothing in this chapter is a procedure for obtaining one.
:::

## A frozen rule on five new closes

The monitoring week is invented: closes $30$, $33$, $32$, $36$, $34$. It is not a continuation that the research sample forces, and it is not Path A. The specification is applied with a self-contained warm-up: until three closes exist, $\mathrm{SMA}_3$ is undefined and the signal is $0$. The other fields stay as in Example Book A. The legal clock earns the next return. The tie is strict. The proportional cost is $c = 0.001$, charged on the absolute weight change before the next return, with no terminal liquidation. Cash earns $0$. No order leaves the page.

The simple returns on the four steps are $33/30 - 1 = 0.10$, $32/33 - 1 = -1/33$, $36/32 - 1 = 0.125$, and $34/36 - 1 = -1/18$. The three-point averages, once defined, are $(30+33+32)/3 = 95/3$ at the close $32$, $(33+32+36)/3 = 101/3$ at the close $36$, and $(32+36+34)/3 = 34$ at the close $34$. The strict signals at those three closes are $1$, $1$, and $0$, because $32 > 95/3$, $36 > 101/3$, and $34 = 34$.

:::example The record the specification actually implies {#ex-week}
Compute the gross and the net compound simple returns of the frozen legal rule on the monitoring week.
:::solution
Signals at the five closes are $(0,0,1,1,0)$. Legal weights on the four returns are $(0,0,1,1)$: flat, then long from $32$ to $34$. The gross multiple telescopes,

$$
\frac{36}{32} \cdot \frac{34}{36} = \frac{34}{32} = 1.0625,
$$

so the gross compound return is $0.0625$. There is one weight change, from $0$ to $1$. Because the cost is proportional to wealth, the net multiple is $0.999 \times 1.0625 = 1.0614375$, and the net compound return is $0.0614375$. Both numbers are hypothetical. They were not sent anywhere. A paper record that stores a different multiple, on these same closes and this same specification, is a mismatch in the sense of [[#prop-match]].
:::
:::

:::example The wrong window {#ex-bug}
The code uses $\mathrm{SMA}_2$ instead of $\mathrm{SMA}_3$ and is otherwise faithful: strict tie, legal clock, $c = 0.001$, no terminal liquidation. Compute the gross compound return and the net compound return.
:::solution
Two-point averages from the second close are $31.5$, $32.5$, $34$, and $35$. The strict signals on the five closes are $(0,1,0,1,0)$. Legal weights on the four returns are $(0,1,0,1)$. The gross multiple is

$$
\frac{32}{33} \cdot \frac{34}{36} = \frac{272}{297} = 0.9158249158\ldots,
$$

and the gross compound return is $-25/297 = -0.084175$ to six decimal places. The weight changes three times: $0 \to 1$, $1 \to 0$, $0 \to 1$. Proportional charges contribute a factor $(0.999)^3$ in front of the gross multiple, so the net multiple is $0.9130801876\ldots$ and the net compound return is $-0.086920$ to six decimal places. This is not the frozen rule. [[#prop-match]] says the implementation claim is false as soon as a record stores the window-$3$ wealth and the code produces the window-$2$ wealth, or the reverse. The more pleasant of the two numbers is not the repair. The repair is to make the code use the window the specification named, or to freeze a new specification that honestly says $\mathrm{SMA}_2$.
:::
:::

The bug is detectable without any view of the future. Both wealth paths are functions of the five closes. That is the useful half of [[#prop-match]]. The useless half, if one expected prophecy, is that neither path contains the sixth close.

:::example A split the feed forgot {#ex-split}
The specification says closes are split-adjusted. A 2-for-1 split occurs between two closes. The adjusted closes are $50$ then $52$. The raw feed shows $50$ then $26$. Which simple return does the specification imply, which return does the raw feed imply, and what does a mismatch decide?
:::solution
The specification’s simple return is $52/50 - 1 = 0.04$. The raw feed’s simple return is $26/50 - 1 = -0.48$. If the paper record compounds $-0.48$ while a recomputation from the frozen adjustment rule compounds $0.04$, then $N \neq M$ and the implementation claim is false. The match, if the feed is corrected and the two sides both show $0.04$, confirms the adjustment on this step. It does not confirm that the next split will be handled, except by running the same check when that split arrives, and it says nothing about whether $0.04$ will be typical. [[markets/adjustment-universes-and-rolls]] defines the adjustment; the paper record only checks that the frozen choice is the one in the file.
:::
:::

:::example A clock bug on the same five closes {#ex-clockbug}
Keep $\mathrm{SMA}_3$, the strict tie, and $c = 0$, but multiply $s_t$ by $R_t$. Compute the compound simple return, and compare it with the gross legal figure $0.0625$.
:::solution
Same-bar weights on the four returns are the signals at the ends of those returns: $(0,1,1,0)$. The multiple is

$$
\frac{32}{33} \cdot \frac{36}{32} = \frac{36}{33} = \frac{12}{11} = 1.090909\ldots,
$$

and the compound return is $1/11 = 0.090909$ to six decimal places. The legal gross compound return is $0.0625$. The gap is a mismatch with the frozen clock. The same-bar number is larger on this week. [[#prop-match]] does not prefer it. A monitoring log that quietly switches to the larger number has changed the specification and, unless the search and the clock are rewritten, has falsified the record rather than saved it.
:::
:::

:::quiz
A paper record matches the recomputation for sixty new sessions. Which conclusion is justified by [[#prop-match]]?
- [ ] The next session’s return will be close to the research average.
- [ ] The cost model has been shown to include every fee a broker would charge.
- [x] On those sixty sessions the stored path implements the frozen specification, and the next session is still undecided.
- [ ] The match is a GIPS track record because the method was written down.
:::solution
A match confirms the implementation claim on the bars that entered the equality. The next return is not a function of that equality. A written method is the instinct shared with the 1999 standards; it does not turn a hypothetical path into a managed composite. Fees that were never in the specification are not confirmed by a match against that specification.
:::
:::

## What the log can be built to see

[[#alg-recompute]] is a checklist for the comparison [[#prop-match]] uses. It is not a deployment recipe. Every step reads or writes a research file.

:::algorithm Recompute and compare {#alg-recompute}
Given a frozen specification and a batch of new bars, do the following and stop.

1. Record the data version of the batch, including the corporate-action rule the feed claims to apply.
2. Recompute the signal from the formula, the window, and the tie, using only information the clock allows at each $t$.
3. Apply the weight map or the named order type. Do not transmit it.
4. Apply the cost model, including a written zero, in the order the specification states.
5. Compare the resulting wealth, signal, and cost with the paper record’s stored values.
6. If they differ, write “mismatch” and the field that differs. Do not replace the stored path with the path you prefer.
7. If they agree, write “match on this batch”. Do not write a sentence about bars that are not in the batch.
:::

A broken feed often fails step 2 or step 5 in a way the wealth number only summarises. A duplicated close, a stale close carried forward, or a missing session changes $\mathrm{SMA}_3$ and can change a strict inequality. The right log stores the closes and the signal, not only the compound return. Two different bugs can share a wealth multiple by accident, just as the weak tie and the same-bar clock shared a multiple on Path A. Wealth equality with signal inequality is still a mismatch if the specification named the signal.

Regime language does not enlarge the proposition. A week that “looks like” the research sample and a week that does not are both inside $(N, M)$ once they have arrived, and both are outside it before they arrive. Monitoring is allowed to describe the week — the rule was long, the compound return was $0.0625$ gross, one rebalance was charged. Description is not a timing signal. [[research-craft/combination-and-decay]] will treat a shrinking paper result as an observation that still does not say to enter or leave a market.

:::intuition The record is a unit test on fresh inputs
Think of the specification as a function and of the paper record as a second implementation of that function, run when new inputs appear. Unit tests catch disagreements between implementations. They do not prove that the function’s output will please anyone next time. The pleasure was never the test.
:::

:::remark What a zero cost confirms
Suppose the monitoring week is recomputed with the frozen $c = 0.001$ and the record matches $0.0614375$. The match confirms that charge. If, later, someone observes that a traded spread would have been larger than $0.001$, the observation is a criticism of the specification’s realism, not a mismatch inside [[#prop-match]]. The honest response is a new specification with a new cost field, clearly marked, and a new record. Editing the old record in place would destroy the only evidence that the old specification was implemented.
:::

:::application A feed check without a forecast
The split example is the pattern for dividends and rolls as well. The specification names an adjustment. The feed either applies it or it does not. The paper record is the place the disagreement becomes a number, $0.04$ against $-0.48$ in the toy, rather than a suspicion. [[backtesting/timing-costs-and-biases]] catalogues the research versions of these failures. Monitoring is the same catalogue pointed forward in time, still without a claim that the next number will match the last one.
:::

:::quiz
The window-$2$ bug loses money on the monitoring week and the frozen window-$3$ rule does not. What should the log say?
- [ ] Switch the specification to window $2$, because the bug has revealed the true window.
- [ ] Switch the specification to window $3$ only because it made a profit.
- [x] Mismatch: the code’s window is not the frozen window. Keep the specification, or replace it openly. Do not choose by the sign of the profit.
- [ ] Send the window-$3$ weights, because they matched the research idea.
:::solution
The sign of the hypothetical profit is not evidence about which window was frozen. The frozen window was already written. A mismatch refutes the implementation claim and does nothing else. Sending weights would leave the definition of a paper record.
:::
:::

:::widget sequence
a: (1.001)^n
mode: terms
N: 20
caption: Twenty terms of a constant gross factor $1.001$. A paper wealth path can be plotted as a sequence. This one is constant on purpose, sends no order, and is not the monitoring week. A smooth sequence is not evidence about the next term.
:::

:::history
The 1999 Global Investment Performance Standards, issued by what is now CFA Institute, required a presented performance record to follow a written method rather than an improvised one. Research records in this course borrow that instinct only. The hypothetical week above is not a GIPS composite, and the chapter is not a compliance manual. The written method, for us, is the frozen specification; the check is [[#alg-recompute]].
:::

## Where this leads

Several paper paths, each tied to its own frozen specification, have a covariance. [[research-craft/combination-and-decay]] does that arithmetic and separates it from a decision to fund the books. [[research-craft/the-boundary]] is the line that keeps a matching record from being narrated as a promise. [[backtesting/the-backtest-as-an-experiment]] is the matching idea one step earlier: a backtest was already an experiment, not a broker.

:::summary
- A paper record is a hypothetical wealth path computed after the specification is frozen. It sends nothing to a market.
- A match confirms that the record implements the specification on the bars in hand. A mismatch refutes that claim.
- Neither result says anything about a return after the last bar, and a match does not upgrade a cost model that was written as zero or as $0.001$.
- On the invented week $30,33,32,36,34$, the frozen $\mathrm{SMA}_3$ rule compounds to $0.0625$ gross and $0.0614375$ net.
- The $\mathrm{SMA}_2$ bug compounds to $-0.084175$ gross, to six decimal places. The gap is a failed implementation, not a research finding about windows.
- A forgotten 2-for-1 adjustment that turns $0.04$ into $-0.48$ is the same kind of failure, visible without a forecast.
- A same-bar clock on the week compounds to $1/11$, which is larger than $0.0625$ and still the wrong clock.
- The 1999 performance standards supply the instinct that a record needs a written method. They do not turn this hypothetical path into a track record.
:::

## Exercises

:::exercise Gross compound return of the week {level=1 check="0.0625"}
Enter the gross compound simple return of the frozen $\mathrm{SMA}_3$ rule on closes $30, 33, 32, 36, 34$.
:::solution
Legal weights are long only from $32$ to $34$. The multiple is $34/32 = 1.0625$, so the compound return is $0.0625$. The path is hypothetical and was not submitted anywhere.
:::
:::

:::exercise Raw return after a missed split {level=1 check="-0.48"}
Adjusted closes $50$ then $52$ are replaced in the feed by raw closes $50$ then $26$. Enter the simple return the raw feed implies.
:::solution
$26/50 - 1 = -0.48$. The specification’s return is $0.04$. The gap is a mismatch if the specification required the adjustment. It is not a forecast of the next close.
:::
:::

:::exercise Closes needed before the signal can be long {level=1 check="3"}
Under the frozen rule, how many closes are required before $\mathrm{SMA}_3$ is defined? (Enter the count.)
:::solution
The average uses the close and the two preceding closes, so it is defined on the third close. Before that the signal is $0$ by the warm-up rule. The count is $3$.
:::
:::

:::exercise Gross compound return of the bug {level=2 check="-0.084175"}
Enter the gross compound simple return of the $\mathrm{SMA}_2$ legal bug on the monitoring week, rounded to six decimal places.
:::solution
Weights $(0,1,0,1)$ give the multiple $(32/33)\cdot(34/36) = 272/297$. The compound return is $-25/297 = -0.084175084\ldots$, which is $-0.084175$ to six decimal places. This is the number a mismatched record would be storing if the code’s only fault were the window.
:::
:::

:::exercise Net compound return of the frozen week {level=2 check="0.0614375"}
Enter the net compound simple return of the frozen rule with $c = 0.001$ on the monitoring week.
:::solution
One proportional entry multiplies $1.0625$ by $0.999$. The net multiple is $1.0614375$ and the compound return is $0.0614375$ exactly, in this decimal. A record that stores the gross $0.0625$ against a specification that names $c = 0.001$ is already a mismatch, even though both numbers are positive.
:::
:::

:::exercise Same-bar compound return on the week {level=2 check="0.090909"}
Enter the compound simple return of the same-bar $\mathrm{SMA}_3$ calculation on the monitoring week with $c = 0$, rounded to six decimal places.
:::solution
The multiple is $36/33 = 12/11$, and $12/11 - 1 = 1/11 = 0.09090909\ldots$, which is $0.090909$ to six decimal places. It exceeds the legal gross return $0.0625$. The inequality is not a reason to adopt the same-bar clock. The frozen clock is the legal one, and [[#prop-match]] scores agreement with what was frozen.
:::
:::

:::exercise A return that arrives too late {level=3}
The gross legal multiple on the week is $1.0625$. Suppose a later simple return of $-0.20$ occurs on a step the frozen rule, given some later closes, happens to be long. Compute the wealth multiple after that extra step. Why could the paper record of the week not have contained it?
:::hint
Multiply $1.0625$ by $1 + (-0.20)$. Then use [[#prop-match]]: the extra return is not a function of the week’s $(N, M)$.
:::
:::solution
$1.0625 \times 0.80 = 0.85$. The paper record of the five closes ends at $1.0625$ gross. The later return was not an input to that number, so neither a match nor a mismatch on the week decides it. The figure $0.85$ is what the multiple would become if that later return arrived and the rule were long. It is not a prediction that the return will be $-0.20$, and it is not stored in the week’s record.
:::
:::

:::exercise Three charges {level=3}
Show why the net multiple of the $\mathrm{SMA}_2$ bug equals $(0.999)^3$ times its gross multiple, and enter the net compound return rounded to six decimal places.
:::hint
List the three weight changes. Each multiplies wealth by $0.999$ at the change, and the flat step multiplies wealth by $1$. Proportional factors commute with the gross returns.
:::
:::solution
Weights on the four returns are $(0,1,0,1)$, starting from $0$. The changes are an entry, an exit, and an entry: three charges. The gross multiple is $272/297$. The flat step contributes a factor $1$, so it does not disturb the product. The net multiple is $(0.999)^3 \times 272/297 = 0.9130801876\ldots$. The net compound return is $-0.086919812\ldots$, which rounds to $-0.086920$. If the cost had been a fixed fee rather than a fraction of wealth, the factor would not come out of the product so cleanly, and the specification would have had to say so.
:::
:::
