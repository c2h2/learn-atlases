Do prices already reflect available information? If they do, a forecast constructed from that information cannot, after costs and after a model of required returns, earn a reliable extra return. If they do not, the extra return is there to be discussed, and the discussion has to say why it has not been competed away. That is the **efficient-market** question. This chapter states Fama's taxonomy, shows how an event study is built, and surveys predictability and the anomalies literature without treating either the hypothesis or its rejection as settled. Efficiency is a joint hypothesis with a model of expected returns. A past anomaly is not a strategy, and nothing here is a recommendation to trade on any of the patterns named.

The expected-return models that sit inside the joint hypothesis are [[asset-pricing/capm]] and [[asset-pricing/factor-models]]. The reasons a genuine mispricing might survive are [[asset-pricing/behavioural-finance]].

## Weak, semi-strong and strong forms

::: definition Informational efficiency {#def-emh}
A market is **informationally efficient** with respect to an information set $\mathcal{F}$ if prices at date $t$ equal the expected discounted value of future payoffs, conditional on $\mathcal{F}_t$, for the stochastic discount factor of the agents who can trade. Operationally, in Fama's (1970) taxonomy:

- **Weak form:** $\mathcal{F}$ contains past prices and returns. Technical rules based on the history of the price itself do not earn extra return.
- **Semi-strong form:** $\mathcal{F}$ contains all publicly available information (prices, accounts, announced news). Event studies and public-information forecasts do not earn extra return.
- **Strong form:** $\mathcal{F}$ contains all information, public or private. Even insiders cannot earn extra return.

“Extra return” means return in excess of the equilibrium required return given $\mathcal{F}$. The definition is therefore a joint statement about information and about the model of that required return.
:::

Fama (1970, *Journal of Finance*) organised two decades of empirical work under this heading. Samuelson (1965, *Industrial Management Review*) had already proved that properly anticipated prices fluctuate randomly: if $P_t = \E[P_{t+1}\mid\mathcal{F}_t]$ (up to a constant required return), then the increment $P_{t+1}-P_t$ is uncorrelated with every element of $\mathcal{F}_t$. The martingale property is a *consequence* of efficiency plus a constant required return. It is not a definition of efficiency on its own, because required returns can vary, and because a martingale can fail when discount rates move even if information is incorporated.

::: proposition Returns and information {#prop-fair-game}
Suppose $p_t = \E[m_{t+1} x_{t+1}\mid \mathcal{F}_t]$ and the one-period gross return is $R_{t+1} = x_{t+1}/p_t$. Then $\E[m_{t+1} R_{t+1}\mid \mathcal{F}_t] = 1$. If $m_{t+1}$ is constant and equal to $1/R_f$, this specialises to $\E[R_{t+1}\mid \mathcal{F}_t] = R_f$: the simple return is a fair game relative to $\mathcal{F}_t$. If $m_{t+1}$ varies, $\E[R_{t+1}\mid \mathcal{F}_t]$ can vary with $\mathcal{F}_t$ even though prices are efficient. Assumptions: the pricing equation holds, $p_t \neq 0$, and $m_{t+1}$ is the agents' stochastic discount factor.
:::

::: proof
Substitute $x_{t+1} = R_{t+1} p_t$ into the pricing equation and divide by $p_t$. The constant-$m$ case is immediate. If $m$ varies, take the covariance form $\E[R_{t+1}\mid\mathcal{F}_t] = R_f - R_f\Cov(m_{t+1}, R_{t+1}\mid\mathcal{F}_t)$ (derived in [[asset-pricing/stochastic-discount-factor]]); any variable in $\mathcal{F}_t$ that forecasts that covariance forecasts the return, without violating efficiency.
:::

[[#prop-fair-game]] is the precise version of a slogan that is often stated too loosely. “You cannot predict returns” is true of *excess* returns, after the required return, under constant $m$. It is false of raw returns if the interest rate moves, and it is false of excess returns if risk premia move. Tests of weak-form efficiency that look for serial correlation in raw returns are therefore tests of a much tighter model than [[#def-emh]].

::: warning Confusing a random walk with efficiency
A random walk is a special case: constant expected returns, constant variance, independent increments. Efficiency plus a constant required return gives a martingale, which still allows heteroskedasticity. Efficiency plus a *time-varying* required return does not even give a martingale for the price itself. Finding that returns are serially correlated at long horizons is evidence against a constant-expected-return model. It is evidence against efficiency only if one insists that required returns cannot move. Shiller (1981) and Fama (1991) disagree about how much of the correlation is discount rates; both are discussing the same serial correlation.
:::

## Event studies

The cleanest semi-strong tests are **event studies**: does the price move, at the announcement, by the amount the news justifies, and does it move *before* or *after* in a way public information cannot explain?

::: definition Abnormal return {#def-ar}
Given a model of expected returns $\E[R_{it}\mid \mathcal{F}_{t-1}]$, the **abnormal return** of asset $i$ on date $t$ is $AR_{it} = R_{it} - \E[R_{it}\mid \mathcal{F}_{t-1}]$. The **cumulative abnormal return** from date $t_1$ to $t_2$ is $\mathrm{CAR}_i(t_1,t_2) = \sum_{t=t_1}^{t_2} AR_{it}$. An event study averages $AR$ or $\mathrm{CAR}$ across $N$ events, aligned at an event date $0$, and asks whether the average is zero outside a narrow window around $0$.
:::

The expected-return model is usually the market model $R_{it} = \alpha_i + \beta_i R_{mt} + \varepsilon_{it}$, estimated on a pre-event window, or a Fama–French factor model. Campbell, Lo and MacKinlay (1997, ch. 4) is the standard reference for standard errors: events clustered in calendar time share residual variance, and naive $t$-statistics then over-reject.

Fama, Fisher, Jensen and Roll (1969, *International Economic Review*) studied stock splits. Splits themselves are a cosmetic change in the number of shares; they are, however, often announced alongside dividend increases. FFJR found that the cumulative residual of splitting shares rose in the months *before* the split, consistent with the market incorporating the information that typically accompanies a split, and was roughly flat *after* the split. The paper is the template: a well-specified event, a market-model residual, a picture of CAR against event time, and a joint hypothesis that is easier to live with because the post-event CAR is the object that efficiency most directly constrains.

Subsequent event studies — earnings announcements (Ball and Brown 1968), takeovers, macroeconomic releases — typically find a jump at the announcement and some **post-earnings-announcement drift** (PEAD): the CAR continues in the direction of the surprise for weeks or months (Bernard and Thomas 1989). PEAD is one of the more robust anomalies. It is smaller than it was in the original samples, it is concentrated in smaller names, and it is not zero. Whether it is delayed reaction, compensation for liquidity, or a cost of processing many announcements at once is disputed. It is a public-information pattern, so it is a challenge to semi-strong efficiency *plus* the expected-return model used to define $AR$.

::: example A two-day event window {#ex-event}
An invented firm announces earnings at the close of day $0$. Daily returns on days $-1, 0, +1, +2$ are $0.4\%$, $2.1\%$, $0.3\%$, $-0.1\%$. The market-model expected return, using $\hat\beta = 1$ and a market that returned $0.1\%$ each day, is $0.1\%$ per day. Compute $AR$ on each day and the CAR over $[0,+1]$.
::: solution
$AR_t = R_t - 0.1\%$, so the four abnormal returns are $0.3\%$, $2.0\%$, $0.2\%$, $-0.2\%$. The CAR over $[0,+1]$ is $2.0 + 0.2 = 2.2$ per cent. Most of the move is on the announcement day, which is what semi-strong efficiency plus a well-measured surprise looks like. The $+0.2$ per cent on day $+1$ is a tiny drift in one firm; it would become PEAD only as an average over many events, with a standard error. These four numbers are a calculation, not a finding about earnings.
:::
:::

::: widget plot
f: 0.5 + 2.0*(1/(1+exp(-4*(x))))
f: 0.5 + 2.0*(1/(1+exp(-4*(x)))) + 0.15*x*(x>0)
x: -5, 8
y: 0, 4
labels: \text{jump at } 0; \text{jump plus drift}
caption: Two cartoons of cumulative abnormal return against event time. The first curve jumps around date $0$ and then flattens: the shape FFJR found after splits, and the shape semi-strong efficiency plus a constant required return predicts. The second continues to rise after date $0$: the shape of post-earnings-announcement drift. Read the picture as a sketch of two hypotheses, not as a plot of any index.
:::

## Return predictability

Weak-form tests look at the history of returns themselves. Short-horizon serial correlation of daily and weekly index returns is small, positive in some early samples, and not a living for anyone who pays a bid–ask spread (Fama 1970's reading of the evidence; Lo and MacKinlay 1988 find more positive autocorrelation in weekly indices, consistent with stale prices in the small-share component).

Long-horizon tests are more interesting, and more disputed. Fama and French (1988, *Journal of Political Economy*) and Poterba and Summers (1988, *Journal of Financial Economics*) find that multi-year US returns mean-revert: a negative autocorrelation at three-to-five-year horizons. Shiller (1981, *American Economic Review*) argues that stock prices move too much to be justified by subsequent dividends, if discount rates are constant: the variance of $P_t$ should not exceed the variance of the *ex post* rational present value $P_t^*$, and in his 1871–1979 S&P sample it does, by a large factor. LeRoy and Porter (1981) reach a similar conclusion on a different dataset. The constant-discount-rate efficient-market model is rejected by these variance-bound tests. Whether *time-varying* discount rates, in an efficient market, can generate the volatility is the question Campbell and Shiller (1988a,b) take up with a log-linear present-value identity: the dividend–price ratio forecasts returns, or dividend growth, or both. In US post-war data it has mostly forecast returns.

::: example Weak-form serial correlation {#ex-serial}
An invented weekly index has first-order autocorrelation $0.08$ in simple returns. Under a constant expected weekly return of $0.002$ and a residual standard deviation of $0.02$, what extra expected return does a rule that is long only after a positive week earn, before costs, if it captures the whole autocorrelation? Why is $0.08$ not, by itself, a living?
::: solution
A simple AR(1), $R_{t+1} - 0.002 = 0.08(R_t - 0.002) + u_{t+1}$, gives a forecastable extra of $0.08$ times last week's surprise. A typical surprise is of order $0.02$, so the extra is of order $0.0016$ a week, about $8$ per cent a year *if* one could trade the index at the close used to compute the correlation, with no spread. On a weekly index that extra is of the same order as a bid–ask bounce and as stale prices in the small-share component (Lo and MacKinlay 1988). After a delay and a spread the $0.08$ is not a living. The calculation is the arithmetic of an invented autocorrelation, not a finding about any index, and not a recommended filter.
:::
:::

::: example A dividend–price regression, as arithmetic {#ex-dp}
A simplified identity says that a high log dividend–price ratio must be followed, in expectation, by higher returns, lower dividend growth, or both. Suppose dividend growth is unforecastable. What does a coefficient of $0.2$, in a regression of next-year's log return on this year's log dividend–price ratio, mean, and what does it not mean?
::: solution
It means that, in the sample, years with a one-unit higher log dividend–price ratio were followed by log returns about $0.2$ higher. Under the identity and unforecastable dividend growth, that is exactly what a time-varying discount rate looks like. It does not mean that a reader should buy when the ratio is high: the coefficient is a sample moment, the identity is an approximation, dividend growth is not literally unforecastable, and a high ratio can stay high. Cochrane (2008, 2011) reads the evidence as return predictability; Goyal and Welch (2008) show that many return-forecasting regressions fail out of sample. Both papers are about the same family of regressions. This example is the arithmetic of one coefficient, not a verdict.
:::
:::

::: example Size of a long-horizon $R^2$ {#ex-r2}
A regression of the five-year overlapping log return on the log dividend–price ratio has $R^2 = 0.25$ in a sample of $70$ annual observations (about $14$ independent five-year windows). Why is $0.25$ compatible both with a real discount-rate effect and with a small-sample illusion, and what extra check would you want?
::: solution
Overlapping five-year returns on $70$ years are highly dependent; the effective sample is closer to $14$ than to $70$, and a few episodes (the Depression, the 1970s, 2008) can dominate $R^2$. Stambaugh (1999) shows that persistent regressors with innovations correlated with returns bias the coefficient upward in small samples. So $0.25$ can be a genuine forecast of discount rates, or a small-sample artefact, or both. The extra check is an out-of-sample forecast (Goyal and Welch 2008), a different country, or a bias-corrected standard error that respects the overlap. A large in-sample $R^2$ is not, on its own, a rejection of efficiency, and it is not a recommended market-timing rule.
:::
:::

Cross-sectional predictability is the anomalies literature. Size (Banz 1981), value (Stattman 1980; Fama and French 1992), momentum (Jegadeesh and Titman 1993), profitability, investment, short-term reversal, post-earnings-announcement drift, and a long list of accounting and microstructure sorts have all, in some sample, lined up with average returns after market beta was controlled. [[asset-pricing/factor-models]] turned several of these into named factors. McLean and Pontiff (2016, *Journal of Finance*) find that the average out-of-sample return of published anomalies falls by a few tenths after publication, and more after the paper appears, consistent with some combination of statistical bias and of capital flowing toward the pattern. Some anomalies (momentum, in many markets; value, in many markets) have been more persistent than others (the January size effect, for instance, is much weaker than it was in Banz's sample).

## The case for, the case against, and the joint hypothesis

The case for efficiency, as Fama (1970, 1991) states it, is that prices react quickly to public news, that professional managers as a group do not outperform after fees (Jensen 1968; subsequent studies of mutual funds and of institutional portfolios have not overturned the qualitative finding), and that many apparent anomalies shrink once a reasonable multi-factor benchmark and a reasonable cost are applied. The case is strongest at the daily and weekly horizon, for large liquid names, and for the direction of the announcement-day move.

The case against, as Shiller (1981), De Bondt and Thaler (1985), Jegadeesh and Titman (1993), and the behavioural literature of [[asset-pricing/behavioural-finance]] state it, is that prices move too much relative to subsequent cash flows, that long-horizon returns are predictable from scaled-price ratios, that momentum and reversal are hard to reconcile with any risk model that has been written down, and that closed-end funds, dual-listed shares and index inclusions produce relative prices that a frictionless efficient market would not. The case is strongest at multi-year horizons, in small and illiquid names, and in relative-value comparisons where the discount-rate story has less room.

Both cases run into the **joint-hypothesis problem**. A test of efficiency is a test of efficiency *and* of the model of expected returns used to define extra return. Rejecting $\alpha = 0$ in a CAPM regression can mean the market is inefficient, or that the CAPM is the wrong model, or that the proxy is wrong, or that betas moved. Accepting $\alpha = 0$ in a five-factor model can mean the market is efficient, or that the five factors have absorbed the inefficiency by putting it into $\boldsymbol\lambda$. There is no statistical manoeuvre that separates the two parts of the joint hypothesis without extra assumptions. Fama (1991) treats this as a reason to be cautious about rejections of efficiency. Shiller treats the same fact as a reason to be cautious about *defences* of efficiency that consist of adding factors until the intercept vanishes. This course records both cautions.

A related, more statistical, caution is data-snooping. Lo and MacKinlay (1990) and Harvey, Liu and Zhu (2016) quantify how many sorts, on one sample, it takes to produce a $t$-statistic of two. Out-of-sample and international replication is the check, not a larger $t$ on the discovery sample.

::: quiz
A researcher finds that a variable known at $t$ forecasts the excess return of the market from $t$ to $t+1$, with an out-of-sample $R^2$ of $0.02$. Which conclusion is licensed?
- [ ] Markets are inefficient, because returns were forecastable
- [ ] Markets are efficient, because $R^2 = 0.02$ is small
- [x] A constant-expected-return model is strained; whether efficiency is strained depends on whether a time-varying risk premium, inside an efficient market, can generate that $R^2$
- [ ] The variable is a recommended signal
::: solution
[[#prop-fair-game]] says that forecastable *excess* returns reject efficiency only given a model in which the risk premium cannot move with the variable. A small $R^2$ can still be economically large when applied to the market, and it can still be sampling noise. The finding is a fact about a sample and a variable. It is not a trading recommendation.
:::
:::

::: widget montecarlo
mode: pi
n: 2000
caption: Monte Carlo estimation of $\pi$ by random points, as a picture of sampling variation. The error shrinks like $1/\sqrt{n}$. Event-study average CARs and sample autocorrelations obey the same arithmetic: a pattern that looks decisive in a short window can be noise, and a pattern that looks small can be precise if $n$ is large. Raise $n$ and watch the estimate settle. The figure is a sampling lesson, not a market.
:::

## Where this leads

[[asset-pricing/stochastic-discount-factor]] supplies the $m$ that [[#prop-fair-game]] used, and makes precise what a time-varying risk premium is. [[asset-pricing/consumption-based-pricing]] is the attempt to identify $m$ with consumption, which is how one would *want* to separate discount-rate variation from inefficiency. [[asset-pricing/behavioural-finance]] takes the anomalies as possibly real and asks why capital does not correct them. The right attitude to this chapter's evidence is the one Fama and Shiller both, in different tones, ask for: look at the test, name the joint hypothesis, and do not promote a sample pattern into a rule.

::: history
Louis Bachelier's *Théorie de la spéculation* (1900) modelled the French *rente* as a martingale and derived the mathematics of Brownian motion five years before Einstein. Samuelson (1965) proved that properly anticipated prices fluctuate randomly. Fama's 1970 *Journal of Finance* review defined the weak, semi-strong and strong forms and read the early evidence as supportive, with the strong form already an overstatement (specialists and insiders do earn extra return). Fama, Fisher, Jensen and Roll (1969) is the classic event study of splits. Shiller (1981, *American Economic Review*) and LeRoy and Porter (1981) opened the excess-volatility debate. Fama (1991) restated the joint-hypothesis problem and moved the taxonomy toward tests of time-varying expected returns. Shiller shared the 2013 Nobel Memorial Prize with Fama and Hansen; the citation named the empirical work on asset prices, including the disagreement this chapter has tried to state evenly.
:::

::: summary
- Informational efficiency is always with respect to an information set, and always joint with a model of required returns. Fama (1970): weak (past prices), semi-strong (public information), strong (all information).
- With a constant stochastic discount factor, efficiency implies that returns are a fair game. With a varying $m$, expected returns can move with public information without violating efficiency.
- Event studies measure abnormal returns around a dated news item. FFJR (1969) found a pre-split run-up and a flat post-split CAR. Post-earnings-announcement drift (Bernard and Thomas 1989) is a public-information pattern that has not gone to zero.
- Short-horizon serial correlation is small. Long-horizon mean reversion, excess volatility (Shiller 1981) and dividend–price forecasts of returns are evidence against constant expected returns, and evidence against efficiency only given a stand on discount rates.
- Size, value, momentum and a long list of other sorts predict the cross-section in some samples. Some shrink after publication (McLean and Pontiff 2016). None is a recommended trade.
- Roll's critique and Fama's joint hypothesis apply to every test in this chapter. Adding factors until alpha vanishes does not, by itself, establish efficiency.
:::

## Exercises

::: exercise Abnormal return on day 0 {level=1 check="2"}
In [[#ex-event]], enter the announcement-day abnormal return in per cent, as an integer.
::: solution
$AR_0 = 2.1 - 0.1 = 2$ per cent. The CAR over $[0,+1]$ is $2.2$ per cent, a different window.
:::
:::

::: exercise CAR over two days {level=1 check="2.2"}
In [[#ex-event]], enter the CAR over $[0,+1]$ in per cent.
::: solution
$2.0 + 0.2 = 2.2$. Day $-1$ is outside the window, and day $+2$ is outside it too.
:::
:::

::: exercise Fair-game implication {level=1}
If $m$ is constant, what does [[#prop-fair-game]] say about $\E[R_{t+1}\mid \mathcal{F}_t]$? If $m$ varies, why can a public variable forecast $R_{t+1}$ in an efficient market?
::: solution
With constant $m = 1/R_f$, $\E[R_{t+1}\mid\mathcal{F}_t] = R_f$: the best forecast of the return is the required return, which does not move with $\mathcal{F}_t$. With varying $m$, $\E[R_{t+1}\mid\mathcal{F}_t] = R_f - R_f\Cov(m_{t+1}, R_{t+1}\mid\mathcal{F}_t)$. Any public variable that forecasts that covariance — a recession indicator, a scaled-price ratio — forecasts the return. The forecast is a forecast of the *premium*, not a free lunch, if the covariance with $m$ is the right one.
:::
:::

::: exercise Which form? {level=2}
Classify each finding as a challenge primarily to weak, semi-strong, or strong form efficiency (always joint with an expected-return model): (a) a moving-average rule earns extra return after costs; (b) post-earnings-announcement drift; (c) corporate insiders earn extra return on their own-company trades.
::: solution
(a) Weak form: the rule uses only past prices. (b) Semi-strong: earnings are public, and the drift is after the announcement. (c) Strong form: insider information is not public; Fama (1970) already treated the strong form as a straw man, and insider-trading profits are well documented. In each case a risk model could, in principle, absorb the extra return; the classification is about the *information set*, not about whether the extra return is a premium.
:::
:::

::: exercise Shiller's inequality {level=2}
Let $P_t^*$ be the *ex post* rational price, the present value of realised subsequent dividends discounted at a constant rate, and let $P_t = \E[P_t^*\mid\mathcal{F}_t] + u_t$ with $u_t$ uncorrelated with $P_t$ under the constant-discount-rate model (because $P_t$ is the conditional expectation of $P_t^*$). Show that $\Var(P_t) \le \Var(P_t^*)$. What did Shiller (1981) find?
::: hint
Write $P_t^* = P_t + u_t$ and expand $\Var(P_t^*)$.
:::
::: solution
$P_t^* = P_t + u_t$ with $\Cov(P_t, u_t) = 0$, so $\Var(P_t^*) = \Var(P_t) + \Var(u_t) \ge \Var(P_t)$. Shiller found the inequality reversed, by a large factor, on US stock-price and dividend data from 1871 to 1979, using a constant real discount rate. The finding rejects the *constant-discount-rate* present-value model. It rejects efficiency only if one refuses to let discount rates move. Later work (Campbell and Shiller 1988) attributes a large share of the volatility of the dividend–price ratio to news about returns rather than to news about dividends, which is the time-varying-discount-rate reading of the same excess volatility.
:::
:::

::: exercise Joint hypothesis in an event study {level=2}
An event study of takeovers finds a target CAR of $20$ per cent in a three-day window around the announcement, and a further $4$ per cent in the subsequent three months. Which of these two numbers is the more direct challenge to semi-strong efficiency, and why does even the second number still involve a joint hypothesis?
::: solution
The three-day jump is what one *expects* if the announcement is news and prices incorporate it: it is evidence *for* semi-strong efficiency as regards the direction and speed of the reaction (and evidence about the size of the takeover premium, which is a different question). The subsequent $4$ per cent is a drift *after* public information has arrived, so it is the more direct challenge. It is still a joint test: the CAR is computed from some expected-return model, and a three-month required return that the model missed would look like drift. Takeover targets also change beta, leverage and liquidity, so the expected-return model is particularly strained after the event. The challenge is real; it is not a proof, on its own, that a reader should buy leftover targets.
:::
:::

::: exercise Out-of-sample decay {level=3}
McLean and Pontiff (2016) find that the average return of a published anomaly is lower after the paper's sample ends, and lower still after publication. Give two interpretations, one statistical and one economic, and say what extra evidence would help you tell them apart.
::: hint
Statistical: selection on $t$-statistics. Economic: capital flows toward the pattern.
:::
::: solution
Statistical: anomalies are selected, in part, because they did well in-sample. Mean reversion of a lucky sample mean, plus publication bias, produces decay after the sample ends even if nobody trades on the paper. Economic: once the paper exists, capital flows into the long leg and out of the short leg, shrinking the return; costs and impact then eat what is left. Extra evidence: decay that starts at the *end of the sample*, before publication, favours the statistical reading; decay that starts at publication, and is larger in names that institutions can hold, favours the economic reading. McLean and Pontiff report some of both. Neither reading converts the original in-sample mean into a recommended return.
:::
:::

::: exercise Constructing a fair test of a technical rule {level=3}
A moving-average rule is said to earn $8$ per cent a year extra return on an index, before costs, over $1960$–$2020$. List four design choices that could manufacture that number without any genuine weak-form inefficiency, and the corresponding check.
::: hint
Look at costs, look-ahead in the average, overlapping, and the expected-return model.
:::
::: solution
(1) **Costs and the bid–ask.** The rule trades often. Using close-to-close returns without a spread, especially on older data, credits the rule with prices it could not have dealt at. Check: apply a conservative spread and a one-day delay. (2) **Look-ahead in the moving average.** An “average of the last $200$ closes including today”, used to trade at today's close, uses information that was not available at the decision time. Check: form the signal on $t-1$ and apply it to the return from $t-1$ to $t$. (3) **Snooping the window.** $50$-, $100$-, $150$- and $200$-day averages were all tried; the $200$-day one was reported. Check: a pre-specified window, or a haircut for search. (4) **A constant expected-return benchmark.** The rule is long in high-premium states and out in low-premium states; its extra return is a risk premium. Check: a factor regression of the rule's returns, and a statement of the joint hypothesis. Passing all four checks would make the $8$ per cent a serious weak-form fact. It would still not be a recommendation to run the rule: capacity, taxes and the possibility that the sample will not repeat remain.
:::
:::
