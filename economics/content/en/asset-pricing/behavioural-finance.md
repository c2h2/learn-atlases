If some traders are not the rational mean–variance agents of the earlier chapters, why does their behaviour survive in prices? The efficient-market answer is that arbitrageurs trade against them and restore $p = \E[mx]$. The **limits-to-arbitrage** answer is that the trade is risky, capital-intensive and sometimes impossible, so noise can affect prices for a long time. This chapter states that argument, connects it to **noise traders**, **closed-end funds** and **bubbles**, and records the behavioural hypotheses — prospect theory, overreaction, underreaction — that have been offered as descriptions of the leftover anomalies. The hypotheses are descriptions of samples and of laboratory behaviour. They are not a recommendation to take the other side of any named pattern, and a past bubble is not a forecast of the next one.

Market efficiency is [[asset-pricing/market-efficiency]]. The anomalies that this chapter returns to are those of [[asset-pricing/factor-models]].

## Noise traders and the limits to arbitrage

Friedman (1953) argued that irrational traders lose money to rational ones and disappear. De Long, Shleifer, Summers and Waldmann (1990, *Journal of Political Economy*) built a model in which that need not happen. **Noise traders** misperceive next-period prices; **arbitrageurs** are risk averse, short-lived, and cannot wait the misperception out. The noise traders' future misperception is a risk that the arbitrageurs cannot hedge. Bearing it requires a premium, so the asset is cheap (or dear) in equilibrium, and noise traders can earn a higher expected return than the arbitrageurs by the luck of holding more of the risky asset. They are not driven out.

::: definition Noise-trader risk {#def-noise}
**Noise-trader risk** is the risk that a mispricing widens, in the horizon over which an arbitrageur must mark to market, because noise traders become more optimistic or more pessimistic. It is a risk even when the arbitrageur knows the fundamental value, and even when the mispricing is expected to close *eventually*. It is priced, in DSSW (1990), because the arbitrageurs are risk averse and the risk is common.
:::

Shleifer and Vishny (1997, *Journal of Finance*) add the market for the arbitrageurs' own capital. An arbitrageur who manages other people's money is evaluated on short-horizon returns. A widening mispricing produces a loss, redemptions, and a forced unwind *into* the mispricing, which widens it further. The agency constraint is most severe on the most mispriced assets, which is where the capital is most needed. **Limits to arbitrage** are then three related frictions, not one:

- **Fundamental risk.** The substitute for the mispriced asset is imperfect, so a long–short position still has a residual. Residual variance is not a free lunch, as [[asset-pricing/capm]] already said about idiosyncratic risk that is not, in fact, idiosyncratic.
- **Noise-trader risk.** The mispricing can widen before it closes. DSSW's risk.
- **Implementation costs and constraints.** Short-sale bans, stock-loan fees, tracking error, and the agency of delegated capital. Shleifer and Vishny's risk.

None of these is a claim that prices are “whatever noise wants”. It is a claim that the correction is not instantaneous, not riskless, and not scalable at a constant marginal cost. An anomaly can then survive as a risky, costly, limited-capacity spread. Whether any particular anomaly *is* such a spread is an empirical question, and a different one from whether the anomaly exists in a paper's table.

::: proposition DSSW two-date intuition {#prop-dssw}
In a two-period mean–variance market with a risk-free asset in elastic supply, a risky asset in unit supply, risk-averse arbitrageurs, and noise traders whose demand is a random $\rho$ independent of the asset's cash, the equilibrium price of the risky asset is decreasing in the *variance* of $\rho$ and in the arbitrageurs' risk aversion. Noise traders as a group can earn a higher expected return than arbitrageurs if they are, on average, more bullish and therefore hold more of the risky asset. Assumptions: the two-date structure of DSSW (1990), overlapping generations of short-lived arbitrageurs, no close substitute for the risky asset, and a misperception that is not perfectly mean-reverting inside the arbitrageurs' lives.
:::

::: proof
Sketch. Arbitrageurs' demand is $(\mu - r_f - \E[\rho\text{-effect}]) / (A \sigma^2_{\text{total}})$, where $\sigma^2_{\text{total}}$ includes the variance of next-period noise-trader demand. Market clearing against unit supply plus noise demand gives a price that embeds a discount for $\Var(\rho)$. That discount is compensation for noise-trader risk. If noise traders are bullish on average they hold a larger share of the unit supply, and so they earn a larger share of the (now higher) premium. They can therefore show a higher average return without being right about the cash flow. The full overlapping-generations algebra is in DSSW (1990, §§II–III).
:::

The model is a possibility result: it shows that Friedman's selection argument is not a theorem once the arbitrageurs are risk averse and short-lived. It does not show that any named market is dominated by noise. That would require identifying $\rho$ in the data.

## Closed-end funds, twins and index events

The cleanest relative-value facts are those in which two claims to (almost) the same cash trade at different prices.

**Closed-end funds.** A closed-end fund is a listed vehicle that holds a portfolio of traded securities. Its share price can, and typically does, differ from the net asset value (NAV) of that portfolio. Lee, Shleifer and Thaler (1991, *Journal of Finance*) document that US closed-end funds have, on average, traded at a *discount* to NAV, that the discount varies over time and co-moves across funds, and that the discount is correlated with direct measures of individual-investor sentiment (the holdings of small stocks, the performance of IPOs). At a $20$ per cent discount, a fund with NAV of $10$ trades at $8$. Buying the fund and shorting the holdings is the arbitrage; it is limited by the difficulty of shorting the exact holdings, by the fact that the discount can widen, and by the cost of waiting for open-ending. Pontiff (1996) finds that funds that are harder to arbitrage (less liquid holdings, higher residual variance) trade at more extreme discounts. The discount is a relative-price fact. It is not a recommendation to buy every discounted fund: many stay discounted, and some are discounted because of fees, taxes or illiquid holdings that NAV does not capture.

**Twin shares and dual listings.** Royal Dutch and Shell, for many years, were claims to the same cash-flow stream in a fixed ratio, and traded at prices that departed from that ratio by more than $10$ per cent for long stretches (Froot and Dabora 1999, *Journal of Financial Economics*). The departure co-moved with the markets on which the two names were most heavily traded. An arbitrageur who is long the cheap twin and short the dear one still bears noise-trader risk in each market, and still posts capital on the short.

**Index inclusion.** Shares added to a major index tend to rise on the announcement and around the inclusion date, and shares deleted tend to fall, even though the cash flows have not changed (Shleifer 1986; Wurgler and Zhuravskaya 2002). Demand from index-tracking funds is a downward-sloping demand curve for the individual name, which a frictionless efficient market with perfect substitutes would not have. The event is a quantity shock. The price response is a limit-to-arbitrage fact if substitutes are imperfect; it is also a fact about how much capital is sitting in mandates that must hold the index.

::: example A twenty per cent closed-end discount {#ex-cef}
A closed-end fund has NAV of $10$ per share and a market price of $8$. Compute the discount. An arbitrageur buys $100$ fund shares and shorts the holdings, which have residual daily standard deviation $0.8$ per cent of NAV relative to the fund. Sketch, without numbers for profit, why a further move of the discount from $20$ per cent to $30$ per cent is a problem for a levered, mark-to-market arbitrageur.
::: solution
The discount is $1 - 8/10 = 0.20$, or $20$ per cent. The long–short position is long $800$ of the fund and short $1000$ of the holdings, a net credit of $200$ that is the “cheapness”. If the discount widens to $30$ per cent and NAV is unchanged, the fund falls to $7$ and the long loses $100$, while the short on the holdings is flat; the mark-to-market is a $100$ loss on a position that was supposed to be a convergence trade. A levered book that has to post extra margin, or a fund that is redeemed after a loss, unwinds *before* convergence. That unwind is Shleifer and Vishny (1997). Residual daily noise of $0.8$ per cent of NAV is the path on which such a widening can happen without any change in the holdings' cash flows. The example is arithmetic on invented numbers. It is not a recommendation to put the trade on, and it is not a claim that every $20$ per cent discount will close.
:::
:::

::: widget plot
f: 8
f: 10
x: 0, 12
y: 6, 12
labels: \text{fund price}; \text{NAV}
caption: A cartoon of a closed-end fund whose NAV sits at $10$ and whose share price sits at $8$, a $20$ per cent discount. The two lines are parallel in this sketch; in the data the discount *moves*, which is the noise-trader risk of [[#ex-cef]]. The figure is a relative-price picture, not a forecast that the gap will close.
:::

## Prospect theory and the cross-section

Limits to arbitrage say why a mispricing can last. They do not say where it comes from. **Prospect theory** (Kahneman and Tversky 1979, *Econometrica*; Tversky and Kahneman 1992) is the most developed laboratory alternative to expected utility as a description of choice under risk, and it has been used as a source of demand for particular payoffs.

::: definition Prospect-theory value {#def-prospect}
In the Tversky–Kahneman (1992) parameterisation, outcomes are evaluated as *gains and losses relative to a reference point*, not as final wealth, by

$$
v(x) = \begin{cases}
x^{\alpha} & x \ge 0,\\
-\lambda (-x)^{\alpha} & x < 0,
\end{cases}
$$

with $\alpha \approx 0.88$ (diminishing sensitivity) and $\lambda \approx 2.25$ (**loss aversion**). Probabilities are weighted by a non-linear $\pi(p)$ that overweights small probabilities. The ranking of a lottery is $\sum \pi(p_s) v(x_s)$, not $\E[u(W)]$.
:::

Three features matter for prices.

**Loss aversion.** Losses are weighted more than same-sized gains. A one-period investor who marks to market frequently treats each down month as a loss, and requires a higher premium to hold equities — Benartzi and Thaler's (1995) **myopic loss aversion** reading of the equity premium. The reading uses laboratory $\lambda$ and a monthly evaluation horizon; it is a hypothesis about why the premium is large, not a measurement of anyone's horizon.

**Diminishing sensitivity and the disposition effect.** The concavity of $v$ over gains and convexity over losses produces a tendency to sell winners and hold losers (Shefrin and Statman 1985; Odean 1998 documents the pattern in a sample of brokerage accounts). The disposition effect is a demand-side fact about *some* investors. Whether it moves prices depends on whether those investors are the marginal holders and on whether arbitrageurs offset them.

**Probability weighting.** Overweighting of small probabilities produces demand for positively skewed payoffs — lottery tickets, out-of-the-money calls, volatile growth names — and can, in a limits-to-arbitrage world, raise their prices and lower their expected returns (Barberis and Huang 2008; Bali, Cakici and Whitelaw 2011 document a lottery-like effect in the cross-section of US shares). The same weighting can produce insurance-like demand for hedges against crashes.

::: example Index inclusion as a quantity shock {#ex-index}
An invented share has $20$ million shares outstanding and a float of $15$ million. Inclusion in an index is expected to produce $3$ million shares of extra demand from trackers who must hold it, with no change in cash-flow news. If the short-run demand curve of the remaining holders has elasticity $-1$ (a one per cent rise in price frees one per cent of their holdings), sketch the order of magnitude of the inclusion return, and say what would make the return vanish.
::: solution
Trackers need $3/15 = 20$ per cent of the free float. With elasticity $-1$, a $20$ per cent extra demand at the old price requires a $20$ per cent price rise to induce existing holders to sell that amount. That is an order-of-magnitude cartoon, not a prediction: elasticities are not $-1$, some demand is anticipated, and some is temporary. The return vanishes if substitutes are perfect (elasticity $-\infty$), which is the frictionless efficient-market case, or if arbitrageurs supply the $3$ million shares by shorting without cost. Imperfect substitutes and costly shorting are the limits to arbitrage in this event. Shleifer (1986) and Wurgler and Zhuravskaya (2002) are the empirical papers; this paragraph is the arithmetic of a quantity shock, not a recommended trade in inclusion candidates.
:::
:::

::: example The value of a $100$ gain and a $100$ loss {#ex-v}
Using $\alpha = 0.88$ and $\lambda = 2.25$, compute $v(100)$ and $v(-100)$. What ratio of loss-to-gain weighting does $\lambda$ impose at this size, and what does the comparison not say?
::: solution
$v(100) = 100^{0.88} \approx 57.54$. $v(-100) = -2.25\times 100^{0.88} \approx -129.47$. The ratio of the two absolute values is exactly $\lambda = 2.25$: at a common $|x|$, loss aversion is the factor $\lambda$, and diminishing sensitivity is the shared $0.88$ exponent. The numbers are the 1992 parameterisation of a laboratory value function. They are not a person's utility of wealth, they are not a market price of a $100$ claim, and they are not a reason to avoid losses in any particular security.
:::
:::

::: widget plot
f: if(x>=0, x^0.88, -2.25*(-x)^0.88)
x: -100, 100
y: -150, 80
labels: v(x)
caption: The Tversky–Kahneman (1992) value function, $\alpha = 0.88$, $\lambda = 2.25$. Steeper through losses than through gains (loss aversion); flattening away from the origin (diminishing sensitivity). The kink is at a reference point of zero. The curve is a laboratory parameterisation, not a market and not a prescription.
:::

::: example Myopic loss aversion, as arithmetic {#ex-mla}
A one-period equity premium of $6$ per cent a year, evaluated once a year, is a $50$–$50$ lottery of about $+22$ per cent or $-10$ per cent if volatility is $16$ per cent. Using $v$ from [[#def-prospect]] with $\alpha = 1$ for a linear sketch and $\lambda = 2.25$, compare $0.5\, v(0.22) + 0.5\, v(-0.10)$ with the same lottery evaluated as twelve independent monthly $50$–$50$ gambles of $+4.6$ per cent or $-3.5$ per cent. What does the comparison illustrate, and what does it not?
::: solution
Annual: $0.5\times 0.22 + 0.5\times(-2.25)\times 0.10 = 0.110 - 0.1125 = -0.0025$, just negative. Monthly: $0.5\times 0.046 + 0.5\times(-2.25)\times 0.035 = 0.023 - 0.0394 = -0.0164$, more negative, and twelve such independent evaluations compound the pain. Loss aversion plus frequent evaluation makes a given premium look worse, which is Benartzi and Thaler's (1995) mechanism for why a large premium might be required. The arithmetic is a sketch with $\alpha = 1$ and invented two-point months; it is not a calibration of the 1889–1978 premium, not a measurement of anyone's evaluation horizon, and not a recommendation to look at prices less often.
:::
:::

De Bondt and Thaler (1985, *Journal of Finance*) sort US shares on three-year past returns and find that past *losers* outperform past *winners* over the subsequent three years, by a cumulative amount they put at about $25$ per cent in their sample. They read the pattern as overreaction. Jegadeesh and Titman (1993) find the *opposite* pattern at $3$–$12$ month horizons: momentum. A behavioural account that wants both has to have underreaction at intermediate horizons and overreaction at long horizons (Daniel, Hirshleifer and Subrahmanyam 1998; Barberis, Shleifer and Vishny 1998). A risk account that wants both has to have a factor that reverses sign with the horizon. Neither account is a theorem, and both patterns have been challenged on costs, on microstructure, and on post-sample performance. This course records them as the two horizon-dependent cross-sectional facts that the behavioural literature was built to organise.

## Bubbles, and what the word does not settle

A **bubble**, in the sense used in this literature, is a price that exceeds the present value of expected future cash, as assessed by a stated $m$, because buyers expect to resell to someone more optimistic. Tirole (1982) showed that rational bubbles are hard to sustain with finitely many rational agents and a finite horizon. Blanchard and Watson (1982) and Tirole (1985) constructed rational bubbles in infinite-horizon models; they require the bubble to grow at the discount rate, which is a tight, and testable, restriction. Abreu and Brunnermeier (2003, *Econometrica*) and De Long et al. (1990b) construct *rational* delay by arbitrageurs who know a bubble will burst but do not know when, and who ride it in the meantime. The South Sea episode of 1720, the Tokyo land and equity boom of the late 1980s, and the technology-share boom of the late 1990s are the historical cases most often named. Each has a cash-flow story and a resale-expectation story, and the split between the two is not a fact that a single price series can settle.

Shiller's excess-volatility evidence, already in [[asset-pricing/market-efficiency]], is sometimes read as a bubble fact. It is a fact about prices moving more than subsequent dividends, at a constant discount rate. Time-varying required returns, inside an efficient market, are the competing reading. This chapter does not pick a winner. It notes that limits to arbitrage make the bubble reading *possible*, and that possibility is not identification.

::: warning Treating a behavioural pattern as a recommended trade
Momentum, long-horizon reversal, closed-end discounts, lottery demand and a laboratory value function are research objects. A paper that documents a spread is a paper about a sample. Trading the spread requires costs, capacity, a horizon that matches the agency of the capital, and a reason to believe the sample will repeat. Limits to arbitrage cut both ways: they explain why a spread can last, and they explain why a reader who is not a specialised, well-capitalised arbitrageur may be the noise rather than the correction. This course does not recommend taking either side.
:::

::: quiz
An arbitrageur knows that a closed-end fund is worth its NAV and that the discount is $20$ per cent. Why, in the Shleifer–Vishny (1997) argument, might the arbitrageur still not scale the trade without limit?
- [ ] Because the CAPM says residual variance is not priced, so there is no premium
- [x] Because the discount can widen, producing mark-to-market losses, redemptions and a forced unwind into the mispricing
- [ ] Because noise traders always lose money and will disappear next period
- [ ] Because NAV is not observable
::: solution
[[#def-noise]] and the agency of delegated capital are the argument. Residual variance *is* a problem here, which is why the CAPM's claim that it is unpriced is not a claim that this trade is safe. Noise traders do not disappear next period in DSSW. NAV is observable; that is what makes the example clean.
:::
:::

## Where this leads

This is the last chapter of the course. The models of chapters 1–8 remain the benchmark: they say what $p = \E[mx]$ looks like when $m$ is a marginal rate of substitution, a market return, or a vector of factors. Behavioural finance and the limits to arbitrage say what can happen when some traders' $m$ is a prospect-theory value function, or when the traders who have the “right” $m$ cannot hold the position. [[derivatives]] will price non-linear payoffs under no arbitrage, which is a restriction that survives a great deal of noise on the underlying if the derivative can be hedged; the hedge is itself an arbitrage, and it has the limits this chapter named. A later course on institutions and delegated management is where the Shleifer–Vishny capital constraint becomes a model of the asset-management industry rather than a paragraph.

::: history
Daniel Kahneman and Amos Tversky's 'Prospect Theory: An Analysis of Decision under Risk' appeared in *Econometrica* in March 1979; the cumulative version, with the $\alpha \approx 0.88$, $\lambda \approx 2.25$ parameterisation used above, is Tversky and Kahneman (1992, *Journal of Risk and Uncertainty*). Werner De Bondt and Richard Thaler (1985, *Journal of Finance*) documented long-horizon reversal and read it as overreaction. De Long, Shleifer, Summers and Waldmann (1990, *Journal of Political Economy*) constructed noise-trader risk. Andrei Shleifer and Robert Vishny (1997, *Journal of Finance*) put the arbitrageur's own capital on the table. Lee, Shleifer and Thaler (1991) is the classic closed-end-fund paper. Kahneman received the 2002 Nobel Memorial Prize; Thaler received it in 2017. Tversky died in 1996.
:::

::: summary
- Noise-trader risk (DSSW 1990) is the risk that a mispricing widens inside the arbitrageur's horizon. Limits to arbitrage (Shleifer and Vishny 1997) add fundamental risk, implementation costs, and the agency of delegated capital. Friedman's selection argument is not a theorem once those are present.
- Closed-end funds have, on average, traded at a discount to NAV (Lee, Shleifer and Thaler 1991). Twin shares have traded away from parity (Froot and Dabora 1999). Index inclusions move prices (Shleifer 1986). These are relative-price facts, not recommended trades.
- Prospect theory evaluates gains and losses relative to a reference, with loss aversion $\lambda \approx 2.25$ and diminishing sensitivity $\alpha \approx 0.88$ in the 1992 parameterisation. Myopic loss aversion, the disposition effect and lottery demand are the three pricing hypotheses most often drawn from it.
- De Bondt and Thaler (1985) document long-horizon reversal; Jegadeesh and Titman (1993) document intermediate-horizon momentum. A behavioural account wants underreaction then overreaction; a risk account wants a factor that changes sign with the horizon. Neither is settled.
- Rational bubbles are tightly restricted (Tirole 1982, 1985). Delayed arbitrage (Abreu and Brunnermeier 2003) can produce a ride. Excess volatility has an efficient-market reading (time-varying $m$) as well as a bubble reading. Possibility is not identification.
:::

## Exercises

::: exercise A closed-end discount {level=1 check="0.2"}
A fund has NAV $10$ and price $8$. Enter the discount as a decimal.
::: solution
$1 - 8/10 = 0.2$. A $30$ per cent discount would be a price of $7$ at the same NAV, which is the widening in [[#ex-cef]].
:::
:::

::: exercise Loss-aversion ratio {level=1 check="2.25"}
Using [[#ex-v]], enter the ratio $\lvert v(-100)\rvert / v(100)$ in the 1992 parameterisation.
::: solution
The ratio is $\lambda = 2.25$ exactly, because the $x^{0.88}$ terms cancel. Diminishing sensitivity is the $0.88$; loss aversion is the $2.25$.
:::
:::

::: exercise $v(100)$ {level=1 check="57.54"}
Enter $v(100) = 100^{0.88}$ to two decimals.
::: solution
$100^{0.88} \approx 57.54399$, which rounds to $57.54$. Then $v(-100) \approx -129.47$.
:::
:::

::: exercise Why residual variance matters here {level=2}
The CAPM says residual variance is not priced. A closed-end-fund arbitrage has residual variance relative to NAV. Why is that not a contradiction, and why is it a limit to the trade?
::: solution
The CAPM's claim is an *equilibrium* statement about assets that are held in the market portfolio: residual variance is diversified for a mean–variance agent who holds the market. A long–short closed-end-fund trade is *not* the market; it is a concentrated residual. That residual is noise-trader risk plus tracking error, it is not held by everyone, and it can force an unwind. There is no contradiction: the CAPM does not say that a concentrated residual is harmless for a levered specialist. It says that the representative mean–variance agent, holding the market, does not require a premium for a residual that has been diversified. The specialist has not diversified it. That is why [[#def-noise]] can be priced for the arbitrageur even if it is not priced in the SML.
:::
:::

::: exercise Disposition and momentum {level=2}
The disposition effect is a tendency to sell winners and hold losers. Sketch how that demand, if it is not offset, can *help* produce intermediate-horizon momentum, and name the friction that has to be present for the demand to move prices.
::: hint
Selling winners slows the rise of winners; holding losers slows the fall of losers. Underreaction is a delayed adjustment.
:::
::: solution
If some holders sell winners too soon, their selling is extra supply that *slows* the incorporation of good news, so prices of recent winners remain too low and subsequent returns remain high. If they hold losers too long, extra supply of losers is withheld, so prices of recent losers remain too high and subsequent returns remain low. That is underreaction, and it is a momentum pattern. For this demand to move prices, someone has to be the marginal holder — limits to arbitrage, inattentive arbitrageurs, or a large retail share of the name. In a frictionless CAPM the disposition traders would be offset by the tangency-portfolio holders and prices would not move. Grinblatt and Han (2005) develop this link. The sketch is a hypothesis about a sample pattern, not a rule for following winners.
:::
:::

::: exercise DSSW versus Friedman {level=2}
State Friedman's (1953) selection argument, and state the DSSW (1990) ingredient that blocks it. Does DSSW imply that noise traders dominate every market?
::: solution
Friedman: traders who are systematically wrong lose money to traders who are right, so they shrink and disappear, and prices come to reflect the right $m$. DSSW: if the wrongness is a *common*, *persistent* demand shock, the arbitrageurs who trade against it bear undiversifiable noise-trader risk; the risky asset then offers a premium; noise traders who happen to hold more of it can earn *higher* average returns than the arbitrageurs, and need not shrink. The ingredient that blocks selection is the combination of risk aversion and a misperception that does not wash out inside the arbitrageurs' lives. DSSW does not imply that noise traders dominate every market: it is a possibility result for a market with no close substitute and short-lived arbitrageurs. A market with good substitutes, long-horizon capital and low costs is closer to Friedman's world. Which description fits which market is empirical.
:::
:::

::: exercise Riding a bubble {level=3}
Abreu and Brunnermeier (2003) have arbitrageurs who know that a price exceeds fundamental value but do not know when other arbitrageurs will attack. Why can it be equilibrium to *buy* the bubble for a while? What limit to arbitrage is doing the work, and what would destroy the ride?
::: hint
The attack is a coordination problem. Being early is costly; being late is costly.
:::
::: solution
Each arbitrageur prefers to sell at the top, which is just before the others sell. Selling too early forgoes the remaining rise; selling too late is being caught in the crash. With sequential awareness of the mispricing, there is an equilibrium in which each waits, the bubble grows, and an attack is triggered only when a critical mass has become aware. The limit to arbitrage is *synchronisation*: capital that would correct the price is not applied at the same time, and noise-trader (or inertial) demand keeps the price high in the meantime. A publicly observed, commonly known end date, or a single large arbitrageur who can move the price alone, would destroy the ride — which is why Tirole's finite-horizon, finite-agent result is so strong, and why the Abreu–Brunnermeier ride needs dispersed awareness. The model is a possibility result for delayed correction. It is not a diagnosis of any named historical episode, and it is not a recommendation to ride anything.
:::
:::

::: exercise Joint hypothesis, one last time {level=3}
A three-factor alpha of a momentum portfolio is positive and significant in a sample. Give an efficient-market reading, a behavioural reading, and a limits-to-arbitrage reading of the same alpha, and say what extra evidence would help you tell them apart. Do not convert the alpha into a recommended position.
::: hint
The three readings are: a missing factor; underreaction; a spread that is costly to hold.
:::
::: solution
Efficient-market: the three-factor $m$ is incomplete; momentum is a proxy for a priced risk (crash risk, liquidity risk, a missing state variable) and $\alpha$ is a premium, not a mispricing. Behavioural: prices underreact at the $3$–$12$ month horizon, as in Barberis–Shleifer–Vishny or Daniel–Hirshleifer–Subrahmanyam, and $\alpha$ is the correction. Limits-to-arbitrage: even if the behavioural story is the source, the alpha survives because momentum crashes (Daniel and Moskowitz 2016), shorting losers is costly, and delegated capital is evaluated on the crashes. Extra evidence: a named risk factor that absorbs the alpha, especially in the states where momentum loses, favours the efficient-market reading; a link from a measured behavioural demand (disposition, inattention) to the alpha favours the behavioural reading; a link from measured costs, short-sale constraints and fund flows to the size of the alpha favours limits to arbitrage as the *persistence* mechanism (and is compatible with either source). The three readings can be true together: a behavioural demand, not fully offset because of limits to arbitrage, that looks like a factor in a misspecified $m$. None of them is a recommendation to hold the momentum portfolio. The joint hypothesis of [[asset-pricing/market-efficiency]] has not gone away; it has acquired two extra clauses.
:::
:::
