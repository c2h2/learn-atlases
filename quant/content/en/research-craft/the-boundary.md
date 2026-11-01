There is a line this atlas does not cross, and the line is part of the subject. The earlier chapters specified a rule, compared two implementations without crowning one, kept a hypothetical record that sends nothing, and combined book results with a covariance. None of those acts recommends a security, a weight, a broker, or a leverage, none of them submits a live order, and none of them says that a curve reported on quants.md will happen again. This chapter writes the line so that it can be used as a standard for every other chapter. Explaining a mechanism, including how an order works, stays inside the line. Telling a reader to send the order does not.

Law and regulation depend on the jurisdiction. Nothing here states what a reader may legally do where they live. This is not legal advice. A reader who wants a trading system has to leave this text and accept responsibilities the text will not take.

## What the atlas will not do

The refusals are concrete. The atlas will not recommend a security, a fund, an asset class, or a strategy. It will not recommend a weight. It will not recommend a broker. It will not recommend a leverage. It will not give, or walk through the sending of, a live order. It will not claim that a quants.md curve, or any backtest drawn in these lessons, will recur. Published figures are quoted so that a protocol can be read. They are not forecasts, and a loss in the library is not flipped into a suggestion to take the other side.

The atlas will explain mechanisms. A market order, a limit, a stop, a weight, a cost, a clock, a walk-forward fold, and a selected window are objects a reader should be able to recognise. Recognition includes recognising a same-bar backtest, a missing cost, a search that was not disclosed, and a smooth curve that only illustrates a reported CAGR. [[markets/systematic-question]] starts from that descriptive stance: a rule is a function of information available at $t$, and it earns what happens after $t$. The stance is incomplete without the list of acts the function does not justify.

:::definition Advice sentence {#def-advice}
In this atlas, an **advice sentence** does at least one of the following: it names a security, fund, asset class, or strategy as something the reader ought to buy, sell, or hold; it states a weight the reader ought to use; it names a broker the reader ought to use; it states a leverage the reader ought to take; it instructs the reader to submit a live order; or it asserts that a reported backtest curve will recur. A **mechanism sentence** describes an object, a protocol, or a calculation, including its assumptions and its failures, and does none of those things. Educational framing does not move a sentence from the first class to the second.
:::

:::proposition A mechanism sentence is not advice in disguise {#prop-mech}
Take an advice sentence that contains a genuine description of an order, a weight, or a reported number. Replace each directive in [[#def-advice]] by a definition, an assumption, or a deletion, without introducing a new directive and without attaching a forecast. The result is a mechanism sentence. It preserves the description and does not preserve the recommendation. There is no third category, “advice, but for education”, inside this definition.
:::

:::proof
Each clause of [[#def-advice]] is a directive or a forecast. A definition does not entail a directive: saying what a limit order is eligible to do, if the market trades at the limit, does not entail that anyone ought to submit one. Saying that a modelled multiplier scales a modelled return does not entail that anyone ought to borrow. Quoting a reported CAGR as reported does not entail that the CAGR will recur; recurrence is a separate sentence and is deleted rather than rewritten into a softer promise. Because the clauses are removed and not replaced, the recommendation is not preserved. Because the definition admits no educational exception, prefixing the original sentence with “for learning” or “in a hypothetical fund” does not constitute the rewrite.
:::

The three examples that follow are negative examples. The first sentence in each pair is outside the atlas. The second is the kind of sentence the atlas may contain. The prices and the weights in the rewrites are there to be calculated, not to be used.

:::example A limit is not a dip to buy {#ex-limit}
Rewrite “You should buy the dip with a limit.”
:::solution
The original is an advice sentence: it tells the reader to buy, and it treats a dip as the occasion. A mechanism sentence is: a buy-limit is an order type that is eligible to trade only at its limit price or better; if the market never trades there, it does not fill; the fill, when it exists, is not evidence that the limit was a good forecast. That is a description of an object defined in [[orders/market-and-limit-orders]]. It names no security, states no limit the reader ought to type, and does not say that a fall in price is attractive. The original cannot be kept beside the rewrite as motivation. Motivation of that form is the directive itself.
:::
:::

:::example A multiplier is not a suggestion to borrow {#ex-lev}
Rewrite “Put $60\%$ in the trend book and lever it twice.”
:::solution
The original names a weight and a leverage the reader ought to use. A mechanism sentence keeps the numbers as algebra and drops the directive. A research weight of $0.60$ means six tenths of modelled wealth. A leverage multiplier of $2$, if a model assumes one and ignores financing, scales that weight to $1.20$ in the model and scales a simple return $r$ to $2r$. If $r = 0.01$ under those assumptions, the scaled simple return is $0.02$. Financing, margin, and a borrow fee are further fields; ignoring them is an assumption, not a detail. The sentence does not say to borrow, does not name a broker who would lend, and does not say that $0.60$ or $2$ is appropriate for anyone. Example Book A’s map was $w_t \in \{0,1\}$ with a named cost and no leverage, which is a different specification, not a milder version of this advice.
:::
:::

:::example A reported CAGR is not a promise {#ex-recur}
Rewrite “W01 made $7.38\%$ a year, so that curve will recur if you trade it.”
:::solution
W01’s reported CAGR is $+7.38\%$, as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. The mechanism sentence stops there, or adds the protocol facts already used in [[research-craft/comparing-implementations]]: daily sector weights, SMA($50$) against SMA($200$), $26$ years, reported Sharpe $0.45$, reported maximum drawdown $-34.7\%$. The clause “so that curve will recur if you trade it” is a forecast plus a directive. Both are deleted. Nothing in the reported cell entails them. A paper record of a later batch can check an implementation; by [[research-craft/paper-records-and-monitoring]] it cannot settle the next return.
:::
:::

O02’s reported Sharpe is $-0.17$ and its reported CAGR is $+1.03\%$, on the same attribution and the same refusal to re-run. “O02 lost, so take the other side” misreads the page and then advises. The total return cell is positive. The reported Sharpe is negative. “The other side” is not a strategy the page defines. A negative cell stays a negative cell. Reversing the orders would be a new specification, and even the honest specification would not be something this atlas tells the reader to run.

:::warning The educational prefix does not help
“For learning, you should buy the dip with a limit” is still an advice sentence under [[#def-advice]]. So is “imagine your broker, and send this order”, and so is “the toy says the curve will recur, but only hypothetically”. Fiction that names a real product as the thing the protagonist ought to hold is the same failure. Invented prices, named as invented, and library figures, quoted as reported and not recommended, are the forms this atlas uses instead. A hypothetical paper wealth path is not a loophole: it remains hypothetical only while no order is sent and no recurrence is claimed.
:::

## Searches reject true nulls more often than one test does

A second way a chapter can cross the line is to treat an impressive in-sample curve as if the search that produced it had not happened. The specification chapter asked for the search field. The comparison chapter refused to invent WF04’s winning Sharpe. The probability below is the classroom reason those refusals exist. It is not a p-value for the catalogue.

:::theorem At least one rejection {#thm-fwer}
Suppose $m$ tests are independent, each has exact level $\alpha \in (0,1)$, and each null is true. Let the discovery rule reject if at least one test rejects. The probability of a discovery is $1 - (1-\alpha)^m$.
:::

:::proof
The probability that one given test does not reject is $1-\alpha$, because the level is exact and the null is true. Independence multiplies these probabilities, so the probability that none of the $m$ tests rejects is $(1-\alpha)^m$. The discovery event is the complement, and its probability is $1 - (1-\alpha)^m$. The proof uses independence and a true null for every test. It does not use a market model. Drop independence and the product formula can fail in either direction; the qualitative warning, that a search has more chances to reject than one pre-declared test, needs a separate argument under dependence.
:::

:::example Nine cells, as a count only {#ex-nine}
Set $\alpha = 0.05$ and $m = 9$. Compute the probability in [[#thm-fwer]]. Say what this does and does not say about WF04.
:::solution
$(0.95)^2 = 0.9025$. $(0.95)^4 = 0.9025^2 = 0.81450625$. $(0.95)^8 = 0.81450625^2 = 0.6634204313$. Times $0.95$ again, $(0.95)^9 = 0.6302494097$. The complement is $0.3697505903$, which is $0.3698$ to four decimal places. A rule that keeps any rejection among nine independent level-$0.05$ tests of true nulls discovers something about $37\%$ of the time, against $5\%$ for one test. WF04 is a grid of $9$ SMA pairs scored by a backtest Sharpe over $26$ years. The catalogue does not report a p-value, the nine Sharpes are not independent tests of a true null in any sense established here, and the winning Sharpe is not reported in the table this atlas uses. The figure $0.3698$ explains why a search can look decisive when every cell is noise. It is not WF04’s false-discovery rate, and it is not a reason to trade, or to avoid, any cell.
:::
:::

:::widget hypothesis
test: z
tail: right
alpha: 0.05
effect: 0
n: 60
caption: With a true effect of zero the alternative sits on the null, and one one-sided test at level $0.05$ rejects with probability alpha. A search that keeps the best of many tests rejects a true null more often than this single picture. The figure is one test. It is not a verdict on any quants.md page.
:::

Bailey, Borwein, López de Prado and Zhu, in the 2014 *Notices of the American Mathematical Society* paper on backtest overfitting, aimed the warning at readers outside finance as well as inside it: an impressive in-sample curve can be the residue of a search, and the curve’s impressiveness is not evidence that it will recur out of sample. [[#thm-fwer]] is the small independent case of that warning, not a summary of their theorems. The boundary of this atlas is where the warning is enforced rather than applauded. Quoting a library CAGR and then saying it will recur would be the failure they described, in atlas clothes.

:::quiz
Which sentence is a mechanism sentence under [[#def-advice]]?
- [ ] You should buy the dip with a limit, but only as a teaching example.
- [ ] Use this broker, because the worked order is clearer there.
- [x] A buy-limit is eligible to trade only at the limit price or better, and it does not fill if the market never trades there.
- [ ] W01’s reported CAGR of $+7.38\%$ will recur, approximately, in the next $26$ years.
:::solution
The third sentence defines a fill condition and stops. The first keeps a directive under an educational label. The second names a broker. The fourth asserts recurrence. [[#prop-mech]] allows the third and excludes the others.
:::
:::

:::quiz
A paper record matches the frozen specification on a new batch, and the batch’s compound return is positive. What may the write-up claim?
- [ ] The positive return will recur, because the record matched.
- [ ] The match shows which broker would have filled the weights.
- [x] The implementation agreed with the specification on that batch, and the next return is not decided by the match.
- [ ] The reader ought to hold the same weight the paper book held.
:::solution
A match decides the implementation claim on the bars in the batch. It does not decide the next return, does not create a fill at a broker the specification never named, and does not turn the paper weight into a recommended weight.
:::
:::

## How to read a sentence before it is published

:::algorithm Classify the verb {#alg-classify}
Before a sentence is added to a lesson, a note, or a caption, do the following.

1. Mark the verb. If it tells the reader to buy, sell, hold, allocate, lever, choose a broker, send an order, or expect a curve to recur, the sentence is advice. Stop and rewrite, or delete it.
2. If the verb is define, compute, compare, report, or assume, the sentence is only a candidate. Check every clause of [[#def-advice]] again. “Compute your order in this fund” uses a safe verb and is still advice.
3. If a library number appears, attach the attribution: as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, and not re-run. Do not attach “therefore”.
4. If a toy number appears, say that it is invented or assumed. Do not give it a ticker and then tell the reader to hold the ticker.
5. If the sentence fails, do not keep it as a rhetorical opening. The opening is part of the chapter.
:::

Step 5 is how several tempting first lines of this course were kept out. A chapter may open by saying what question a clock answers. It may not open by saying which answer the reader ought to trade. The same test applies to captions. The smooth CAGR sketch in the comparison chapter is labelled as a sketch of two reported numbers, not as a path to expect. The hypothesis figure above is labelled as one test under a true null, not as a verdict on a product.

Jurisdiction sits outside the algorithm on purpose. Classifying a sentence as mechanism rather than advice is a writing rule for this text. It is not a statement that the mechanism is lawful to deploy, and not a statement that it is unlawful. Those statements would be legal advice about a place and a person this book does not know. The algorithm therefore has no step that says “now send it” and no step that says “here is the statute that forbids it”.

:::application The standard, applied backwards
Read a finished chapter against [[#alg-classify]]. Example Book A names a fictional asset and a weight in $\{0,1\}$ and says the note is not a holding. The O01–W01 comparison computes $4.05$ percentage points and refuses a cause and a winner. The paper week stores $0.0625$ and sends nothing. The equal-weight variance at correlation $0.9$ is $0.0095$ under stated assumptions, and W01’s CAGR is not added to W18’s. Each of those sentences can fail if a later edit adds “so the reader ought to”. The standard is re-applied at the edit, not only at the first draft. [[validation/the-deflated-sharpe]] is the statistical relative of [[#thm-fwer]]: a Sharpe ratio that survived a search is not the Sharpe ratio of a single pre-declared test. That chapter, too, is a mechanism for reading a number, not a permission to trade the number that survives.
:::

:::remark What “recognise an order” does not include
A reader who has finished the orders course can say what a bracket, a trailing stop, or a stop-limit is eligible to do, and what a backtest assumes when it pretends the order filled at the stop. That knowledge is the point of the mechanism. It does not include a named broker’s application programming interface, a key, a deployment checklist, or a fragment of code whose job is to place the order. Those omissions are the boundary, not unfinished lessons. A paper record may store the words “market order” as the type the specification would have named. Storing the words is not sending the order.
:::

:::intuition The line is a writing constraint you can check
[[#def-advice]] is checkable the way a clock is checkable. Either the sentence tells someone what to hold, what weight to use, which broker to call, how much to lever, which order to send, or which curve to expect again, or it does not. Grey enthusiasm (“this result is exciting”) is already close to a recurrence claim if the excitement is about the future. Prefer a sentence about what was computed, under which assumptions, and what would falsify the implementation.
:::

:::history
In 2014 David H. Bailey, Jonathan M. Borwein, Marcos López de Prado and Qiji Jim Zhu published their account of backtest overfitting in the *Notices of the American Mathematical Society*, for an audience that was not only a finance audience. The boundary of this atlas inherits that audience: a curve that is impressive inside the sample that was searched is not, by that impressiveness, a curve that will recur. The 2018 reproducibility standard associated with López de Prado is the matching positive demand, already used as the field list of a specification. Neither reference is quoted here beyond what those descriptions support, and neither is a trading mandate.
:::

## Where this leads

The line applies backwards, to [[markets/systematic-question]], and forwards through every course that quotes a library page. [[research-craft/writing-a-specification]] is how a mechanism stays specific enough to criticise. [[research-craft/paper-records-and-monitoring]] is how a frozen mechanism is checked without becoming an order. [[backtesting/reading-published-tests]] is the same line read off someone else’s page: a reported number is a reported number, with a protocol or with a blank, and not an instruction.

:::summary
- The atlas explains mechanisms. It does not recommend a security, a fund, an asset class, or a strategy.
- It does not recommend a weight, a leverage, or a broker, and it does not give or transmit a live order.
- It does not claim that a quants.md curve, or any lesson’s backtest, will recur. Figures are reported, attributed, and not re-run.
- An advice sentence cannot be rescued by the words “for education”, “hypothetically”, or “as a toy” if the directive remains.
- A buy-limit has a fill condition. Stating the condition is not advice to buy a dip. A multiplier of $2$ scales a modelled return. Stating the scaling is not advice to borrow.
- W01’s reported CAGR of $+7.38\%$ is a historical cell. The clause that says the cell will recur is outside the atlas.
- Under independence and true nulls, $m$ tests at level $\alpha$ produce at least one rejection with probability $1-(1-\alpha)^m$. For $\alpha = 0.05$ and $m = 9$ that probability is about $0.3698$. This is not a p-value for WF04.
- A library loss is not an instruction to take the other side. Jurisdiction-specific law is not taught here as legal advice.
:::

## Exercises

:::exercise Count the advice sentences {level=1 check="3"}
How many of the following are advice sentences under [[#def-advice]]? (1) “Buy the dip with a limit.” (2) “A limit order does not fill if the market never trades at the limit.” (3) “Use this broker for the example.” (4) “The reported CAGR will recur.” (Enter the count.)
:::solution
Sentences (1), (3), and (4) each meet a clause of the definition: a directive to buy, a named broker, and a recurrence claim. Sentence (2) states a fill condition and stops. The count is $3$.
:::
:::

:::exercise Nine independent true nulls {level=1 check="0.3698"}
Enter $1 - (0.95)^9$ rounded to four decimal places.
:::solution
$(0.95)^9 = 0.6302494097\ldots$ and the complement is $0.3697505903\ldots$, which rounds to $0.3698$. The assumptions are independence, exact level $0.05$, and a true null in every cell. WF04 is not claimed to meet them.
:::
:::

:::exercise A modelled gross weight {level=1 check="1.2"}
A model weight of $0.60$ is multiplied by a leverage factor of $2$, with financing ignored. Enter the scaled weight in the model.
:::solution
$0.60 \times 2 = 1.2$. The number is an algebraic image of the advice sentence in [[#ex-lev]], kept only as algebra. It is not a weight anyone is told to hold, and the ignored financing is part of the assumption, not a market quote.
:::
:::

:::exercise Scaled simple return {level=2 check="0.02"}
Under the same ignored-financing assumption, a model simple return of $0.01$ is scaled by the multiplier $2$. Enter the scaled simple return.
:::solution
$2 \times 0.01 = 0.02$. [[#prop-mech]] allows this as a statement about the model. It does not allow the further sentence that the reader ought to lever a real book so as to obtain $0.02$. If financing is not ignored, the specification has to name the financing return before any scaled figure is reported.
:::
:::

:::exercise Two tests {level=2 check="0.0975"}
Enter $1 - (0.95)^2$, the discovery probability for $m = 2$ independent level-$0.05$ tests of true nulls.
:::solution
$(0.95)^2 = 0.9025$, and $1 - 0.9025 = 0.0975$. Two independent chances already almost double the single-test level, without reaching the $0.3698$ of nine chances. The formula is [[#thm-fwer]]. It is not a pair of library p-values.
:::
:::

:::exercise Quote a drawdown without recommending the book {level=2 check="-34.7"}
Enter W01’s reported maximum drawdown as printed in the catalogue extract, in per cent, including the sign.
:::solution
The reported maximum drawdown is $-34.7$. Quoting it, with the attribution that it is as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, and not re-run, is a mechanism sentence. Adding “therefore hold the sector book” or “therefore avoid it” would be advice. The cell is not a promise about the next drawdown.
:::
:::

:::exercise Prove the complement {level=3}
Prove that $m$ independent exact level-$\alpha$ tests of true nulls produce at least one rejection with probability $1-(1-\alpha)^m$.
:::hint
Write the probability that a single test does not reject. Independence turns the joint non-rejection into a product. The discovery rule is the complement of joint non-rejection.
:::
:::solution
Each test fails to reject with probability $1-\alpha$, because the null is true and the level is exact. Independence gives $(1-\alpha)^m$ for the event that every test fails to reject. The discovery rule fires on the complement, whose probability is $1-(1-\alpha)^m$. The product step is where dependence would require a different proof. The result does not say that any catalogue grid is a set of independent tests, and it does not recommend a response to a rejection.
:::
:::

:::exercise The other side of a negative cell {level=3}
O02 reports CAGR $+1.03\%$ and Sharpe $-0.17$, as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026; this atlas has not re-run it. Explain why “the Sharpe is negative, so take the other side of the market orders” is outside the atlas, even though it mentions a library loss-like cell.
:::hint
Separate what the page reports from the verbs the sentence adds. Check whether “lost” is even a fair reading of every column, and whether “the other side” is a strategy the page defines.
:::
:::solution
The page reports a positive CAGR and a negative Sharpe, plus a win rate and a profit factor, under a market-order RSI rule. “Lost” already collapses those columns into one judgement the cells do not share. “Take the other side” is a directive to trade a strategy the page does not define: the other side of a conditional market-order rule is not determined by the sign of a reported Sharpe. [[#def-advice]] excludes the directive. [[#prop-mech]] would allow a sentence that reports $-0.17$ as the reported Sharpe and stops. Reversing the rule would be a new specification, with its own clock, cost, and search field, and even that specification would not be an order this atlas tells anyone to send. A negative reported number is not flipped into a trade.
:::
:::
