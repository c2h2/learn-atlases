If the stochastic discount factor is the marginal rate of substitution of a representative consumer, asset prices are pinned down by consumption. That is the **consumption CAPM** (CCAPM), and it is the most natural identification of $m$ the theory has. Confronted with US consumption and return moments, it fails in two well-known ways: the **equity-premium puzzle** and the **risk-free-rate puzzle**. This chapter derives the Euler equation, reproduces the puzzles with power utility, and states the habit and long-run-risk responses without treating either as a settled resolution. The consumption and return figures are sourced historical samples. They are not expected values, and they are not a reason to hold or avoid equities.

The SDF is [[asset-pricing/stochastic-discount-factor]]. Dynamic optimisation is [[mathematical-economics/dynamic-optimisation]]. The equity-premium numbers were introduced as history in [[asset-pricing/returns-and-risk]].

## The Euler equation

A representative agent maximises $\E\sum_{t=0}^{\infty} \beta^t u(C_t)$, with $\beta \in (0,1)$ the discount factor and $u$ strictly increasing and strictly concave, subject to a budget that permits trading a complete set of claims. The payoff $x_{t+1}$ of an asset with price $p_t$ can be bought by sacrificing $p_t$ units of consumption at $t$ and adding $x_{t+1}$ units at $t+1$. At an interior optimum the two sides must match in expected marginal utility.

::: theorem Consumption Euler equation {#thm-euler}
Under the stated preferences, an interior optimum, and complete frictionless markets,

$$
p_t = \E_t\bigl[ \beta \tfrac{u'(C_{t+1})}{u'(C_t)}\, x_{t+1}\bigr].
$$

The stochastic discount factor is therefore $m_{t+1} = \beta u'(C_{t+1})/u'(C_t)$. For a gross return, $\E_t[m_{t+1} R_{t+1}] = 1$. Assumptions: time-separable expected utility, a representative agent (or complete markets, so that marginal rates of substitution are equalised), an interior consumption path, and no transaction costs, taxes or borrowing constraints.
:::

::: proof
The envelope argument is one line. Raising $C_t$ by $p_t$ units costs $u'(C_t) p_t$ in current utility. The extra payoff $x_{t+1}$ is worth $\beta u'(C_{t+1}) x_{t+1}$ in discounted future utility. Taking $\E_t$ and equating at an optimum gives the claim. A Lagrangian treatment of the sequence problem, or a Bellman equation with the asset as a choice, produces the same first-order condition; see [[mathematical-economics/dynamic-optimisation]]. Completeness is used to identify this $m$ as *the* SDF; without it, $m$ prices the traded assets but need not price an arbitrary new payoff.
:::

With power utility $u(C) = C^{1-\gamma}/(1-\gamma)$, the SDF is $m_{t+1} = \beta (C_{t+1}/C_t)^{-\gamma}$. High consumption growth lowers $m$: a unit of payoff is less precious when the agent is already well fed. Assets that pay off in high-growth states — equities, in the sample — then have $\Cov(m, R) < 0$ and earn a premium, by the covariance form in [[asset-pricing/stochastic-discount-factor#def-sdf]]. The size of the premium is governed by $\gamma$ and by how much consumption actually co-moves with the asset.

::: definition Consumption beta {#def-cbeta}
The **consumption beta** of a return $R$ is $\beta_{c} = \Cov(R, \Delta\ln C)/\Var(\Delta\ln C)$, or, in a regression, the slope of $R$ on consumption growth. The linear CCAPM, which is the first-order approximation of [[#thm-euler]] with power utility, says that expected excess returns line up with consumption betas, with slope $\gamma\Var(\Delta\ln C)$ (up to a discretisation).
:::

Breeden (1979, *Journal of Financial Economics*) derived the continuous-time version: instantaneous expected excess returns are proportional to the instantaneous covariance with consumption. Lucas (1978, *Econometrica*) is the discrete-time exchange-economy ancestor, with the endowment equal to consumption.

::: proposition Log-linear power-utility SDF {#prop-loglin}
If $u(C) = C^{1-\gamma}/(1-\gamma)$ and $\Delta\ln C$ is small, then $m_{t+1} = \beta (C_{t+1}/C_t)^{-\gamma} \approx \beta\bigl(1 - \gamma\Delta\ln C_{t+1}\bigr)$. If, further, a risk-free asset is traded and $\beta$ is close to one, expected excess returns satisfy $\E[R^e] \approx \gamma\Cov(R, \Delta\ln C)$. Assumptions: power utility, an interior representative-agent optimum, and a first-order Taylor expansion of $e^{-\gamma\Delta\ln C}$; the approximation is not the Euler equation itself.
:::

::: proof
$(C_{t+1}/C_t)^{-\gamma} = \exp(-\gamma\Delta\ln C) = 1 - \gamma\Delta\ln C + O((\Delta\ln C)^2)$. Multiply by $\beta$. The covariance form $\E[R] - R_f = -R_f\Cov(m,R)$ with $R_f \approx 1$ and $m \approx \beta(1-\gamma\Delta\ln C)$ then gives $\E[R^e] \approx \gamma\Cov(R, \Delta\ln C)$, because $\Cov(m,R) \approx -\beta\gamma\Cov(\Delta\ln C, R)$.
:::

## The equity-premium puzzle

Mehra and Prescott (1985, *Journal of Monetary Economics*) take the Euler equation seriously as a quantitative restriction. On US annual data for $1889$–$1978$, the average real return on the Standard and Poor's composite is $6.98$ per cent, the average real return on short-term debt is $0.80$ per cent, and the equity premium is $6.18$ percentage points, with a standard deviation of real equity returns of $16.54$ per cent. Real consumption-growth has a standard deviation of $3.57$ per cent. A calibrated exchange economy with power utility and $\gamma$ no larger than $10$ generates an equity premium of at most a few tenths of a percentage point. That gap is the **equity-premium puzzle**.

A back-of-the-envelope version, using the covariance form and a log-linear SDF, is enough to see the arithmetic. With $m \approx \beta\bigl(1 - \gamma\Delta\ln C\bigr)$,

$$
\E[R^e] \approx \gamma \Cov(R, \Delta\ln C) \approx \gamma\, \sigma(R)\, \sigma(\Delta\ln C)\, \rho_{R,c}.
$$

Even granting a correlation $\rho_{R,c} = 0.40$ (which is generous; sample correlations of annual US equity returns with consumption growth are often closer to $0.2$),

$$
\E[R^e] \approx \gamma \times 0.1654 \times 0.0357 \times 0.40 \approx \gamma \times 0.00236.
$$

Matching a premium of $0.0618$ then requires $\gamma \approx 26$. Mehra and Prescott's own bound, inside a two-state Markov chain fitted to consumption, is that $\gamma \le 10$ cannot produce more than about $0.4$ percentage points of premium. Either $\gamma$ is far above any number that laboratory and micro evidence finds comfortable, or the covariance of equity with consumption is too small to be the risk that the premium is paying for — or the representative-agent, time-separable, complete-market model is the wrong $m$.

::: example A consumption beta on invented numbers {#ex-cbeta}
An invented annual excess return has $\Cov(R^e, \Delta\ln C) = 0.0020$ and $\Var(\Delta\ln C) = 0.001275$ (a $3.57$ per cent standard deviation, squared). Compute the consumption beta. Using $\gamma = 10$ and [[#prop-loglin]], compute the approximate expected excess return, and compare it with a sample mean excess return of $0.0618$.
::: solution
$\beta_c = 0.0020 / 0.001275 \approx 1.57$. The envelope premium is $\gamma \Cov(R, \Delta\ln C) = 10\times 0.0020 = 0.020$, against a sample mean of $0.0618$. The consumption beta is not small, and $\gamma = 10$ is already large by laboratory standards; the premium is still only a third of the Mehra–Prescott sample mean. That is the puzzle in one asset's arithmetic. The covariance $0.0020$ was chosen to be generous; a smaller covariance makes the gap worse.
:::
:::

::: example A $\gamma$ that meets the Hansen–Jagannathan bound {#ex-hj-gamma}
The Hansen–Jagannathan bound of the previous chapter, on the same Mehra–Prescott Sharpe ratio of about $0.374$, requires $\sigma(m) \gtrsim 0.37$. Using the approximation $\sigma(m) \approx \gamma \sigma(\Delta\ln C)$ and $\sigma(\Delta\ln C) = 0.0357$, what $\gamma$ meets the bound? Why is meeting the bound not the same as matching the premium?
::: solution
$\gamma \approx 0.37/0.0357 \approx 10.4$. Meeting the bound means $m$ is *volatile enough* to be capable of pricing a Sharpe ratio of $0.374$. Matching the premium also requires that $m$ be *correlated* with equity in the right amount. Power utility ties the correlation of $m$ with equity to the correlation of consumption growth with equity. If that correlation is $0.2$ rather than $1$, a $\gamma$ of $10$ meets the bound and still produces only about two-fifths of the premium. The bound is necessary; it is not sufficient. This is 1889–1978 US arithmetic, not a required $\gamma$ for any person.
:::
:::

::: widget plot
f: 0.00236*g
x: 0, 40
y: 0, 0.12
labels: \text{approx premium}
caption: The back-of-the-envelope premium $\gamma\times 0.00236$, using $\sigma(R)=0.1654$, $\sigma(\Delta\ln C)=0.0357$ and $\rho=0.40$. A horizontal reading at $0.0618$ (the Mehra–Prescott sample premium) hits the curve near $\gamma = 26$. Lower $\rho$ to $0.20$ in your head and the required $\gamma$ doubles. The inputs are 1889–1978 US sample moments (Mehra and Prescott 1985). The curve is not a forecast of the premium, and $\gamma$ is not a recommended preference.
:::

## The risk-free-rate puzzle

Weil (1989, *Journal of Monetary Economics*) pointed out a second clash. The Euler equation for the risk-free asset is $1 = R_f \E[m]$, or, with power utility and log-normal consumption growth,

$$
r_f \approx -\ln\beta + \gamma g - \tfrac12\gamma(\gamma+1)\sigma_c^2,
$$

where $g = \E[\Delta\ln C]$ and $\sigma_c = \sigma(\Delta\ln C)$, and $r_f$ is the log risk-free rate. Raising $\gamma$ to meet the equity premium *raises* the risk-free rate through the $\gamma g$ term (the agent is eager to borrow against future growth) unless $\beta$ is raised above one (the agent is patient enough to offset that eagerness) or the precautionary term $\tfrac12\gamma(\gamma+1)\sigma_c^2$ is large. With $g \approx 0.018$, $\sigma_c = 0.0357$, $\beta = 0.99$ and $\gamma = 2$, the approximation gives $r_f \approx 0.042$; with $\gamma = 10$ it gives $r_f \approx 0.120$. The sample real risk-free rate is $0.8$ per cent. That is the **risk-free-rate puzzle**: the $\gamma$ that helps on the premium ruins the level of $r_f$, and the $\beta$ that rescues $r_f$ is hard to swallow (patience, or a negative rate of time preference).

::: example The log-normal approximation at two values of $\gamma$ {#ex-rf}
Using $\beta = 0.99$, $g = 0.018$ and $\sigma_c = 0.0357$, compute the approximate $r_f$ at $\gamma = 2$ and at $\gamma = 10$. Compare both to Mehra and Prescott's $0.80$ per cent sample mean.
::: solution
At $\gamma = 2$: $-\ln 0.99 + 2\times 0.018 - 0.5\times 2\times 3\times (0.0357)^2 \approx 0.01005 + 0.036 - 0.00382 \approx 0.0422$, or about $4.2$ per cent. At $\gamma = 10$: $-\ln 0.99 + 0.18 - 0.5\times 10\times 11\times (0.0357)^2 \approx 0.01005 + 0.18 - 0.0701 \approx 0.120$, or about $12$ per cent. Both exceed $0.80$ per cent. Raising $\gamma$ from $2$ to $10$ *raises* $r_f$ here, because the growth term $\gamma g$ dominates the precautionary term at this $\sigma_c$. A much larger $\sigma_c$, or a $\beta > 1$, would be needed to push $r_f$ down. Neither is a comfortable extra assumption. The calculation is the approximation on these inputs, not a prediction of next year's real bill return.
:::
:::

The two puzzles are twins. A representative agent with power utility, facing smooth consumption, does not fear equities enough to demand a six-point premium, and does not save enough, at moderate $\gamma$, to drive the risk-free rate down to less than one per cent. Something in the chain — the preferences, the completeness, the identification of consumption with the endowment, the measurement of consumption, or the reading of the sample premium as $\E[R^e]$ — has to give.

## Habit, long-run risk, and what is not settled

Two research programmes have tried to keep a representative agent and still match the moments. Both are active; neither has a consensus that the puzzle is closed.

**Habit.** Campbell and Cochrane (1999, *Journal of Political Economy*) replace $u(C)$ by $u(C-X)$, where $X$ is a slow-moving habit, a subsistence level that rises with past consumption. Surplus consumption $C-X$ is much more volatile than $C$, and more so in recessions, when $C$ is close to $X$. Effective risk aversion is then high and countercyclical, $m$ is volatile and more correlated with equities in bad times, and the risk-free rate can be kept stable by offsetting income and substitution effects. The model matches a high, volatile, countercyclical equity premium and a smooth $r_f$ with a modest $\gamma$ on *surplus* consumption. The cost is a preference for a subsistence level that is not observed directly, and a sensitivity of the fit to how habit is specified (external versus internal, the speed of adjustment).

**Long-run risk.** Bansal and Yaron (2004, *Journal of Finance*) keep power utility but change the consumption process: consumption growth has a small, persistent component, and volatility is itself persistent. With Epstein–Zin preferences (which separate risk aversion from the intertemporal elasticity of substitution), news about consumption growth many years ahead is priced, and equities, which are long-duration claims, covary with that news. A modest $\gamma$ then produces a large premium, and a high elasticity of substitution keeps $r_f$ low. The cost is the persistence: the long-run component is hard to see in consumption data, and the model's implications for the term structure and for the cross-section are extra restrictions that later papers have tested with mixed results.

::: example Disaster in the envelope {#ex-disaster}
Suppose that, once a century, consumption falls by $30$ per cent and the equity payoff is wiped out in that state, and that this state is not in the 1889–1978 sample. In a one-period two-state cartoon with $\gamma = 4$ and $\beta = 0.99$, the rare state has physical probability $0.01$ and the normal state has consumption growth of $+2$ per cent. Without computing a full calibration, say *why* a disaster state raises $\sigma(m)$ and the equity premium at a given $\gamma$, and name one reason the mechanism is hard to test on a century of data.
::: solution
In the disaster state $m = \beta (0.70)^{-4} \approx 0.99\times 4.16 \approx 4.12$, against $m \approx 0.99\times (1.02)^{-4} \approx 0.91$ in the normal state. That one state, with probability $0.01$, already contributes a large amount to $\sigma(m)$ and, if equities pay zero there, a large amount to $-\Cov(m,R)$. A moderate $\gamma$ then produces a large *unconditional* premium, most of which is compensation for a state the sample may not contain (a Peso problem). The mechanism is hard to test because a century is one or two draws of a once-a-century event; matching the sample premium by adding a disaster that did not occur is, by construction, not a matching of the sample path. Barro (2006) and related work pursue the idea with international disaster lists. The cartoon here is not that calibration, and it is not a forecast of a crash.
:::
:::

Other responses drop the representative agent (incomplete markets, idiosyncratic risk that is correlated with returns — Constantinides and Duffie 1996), drop time-separability in a different way (recursive utility without long-run risk), drop rational expectations (learning, ambiguity), or drop the reading of the sample premium as a puzzle (Peso problems, survivor bias, a one-time rise in valuations; see Mehra and Prescott's later surveys, and McGrattan and Prescott 2003, who argue that the puzzle shrinks once taxes, diversification costs and long-term debt are treated carefully). Dimson, Marsh and Staunton's world geometric premium of $4.6$ per cent versus bills over $1900$–$2022$ is smaller than the US $1889$–$1978$ arithmetic $6.18$ per cent, which is a reminder that the size of the target depends on the sample. A smaller target is easier to hit, and it is still large relative to $\gamma\times 0.002$.

This course does not adjudicate. The Euler equation is a clean first-order condition. The puzzles are a quantitative fact about a class of calibrations. Habit and long-run risk are two ways of making $m$ more volatile, or more correlated with equities, without raising $\gamma$ on the level of consumption. Whether either is the mechanism that actually priced US (or world) equities over a century is an empirical question that is not closed.

::: warning Reading $\gamma \approx 26$ as a person's risk aversion
The $\gamma$ that matches the sample premium, in the back-of-the-envelope CCAPM, is a property of that calculation. It is not an estimate of anyone's relative risk aversion. Laboratory and survey evidence typically finds single-digit $\gamma$; the finance calculation finds a double-digit $\gamma$ *if* one insists on power utility, a representative agent, and this consumption series. The clash is the puzzle. Resolving it by announcing that people are more risk averse than they say, or by announcing that the premium is not there, is a choice of which evidence to discard. A model that keeps both pieces of evidence has to change $m$.
:::

::: quiz
Power utility with $\gamma = 2$ and Mehra–Prescott consumption moments produces a small equity premium and a risk-free rate of about four per cent. Raising $\gamma$ to $10$, in the same approximation, does what to the two puzzles?
- [ ] Closes both
- [ ] Closes the premium and leaves $r_f$ untouched
- [x] Helps the premium (without closing it, unless $\rho_{R,c}$ is large) and makes the risk-free-rate puzzle worse
- [ ] Closes the risk-free-rate puzzle and makes the premium puzzle worse
::: solution
In [[#ex-rf]], $r_f$ *rises* with $\gamma$ at these $\sigma_c$. The premium rises with $\gamma$ too, linearly in the envelope calculation, but not enough at $\gamma = 10$ unless the correlation with consumption is near one. Weil's point is exactly this tension.
:::
:::

## Where this leads

[[asset-pricing/fixed-income]] takes the same Euler equation to default-free bonds of many maturities: the term structure is the market's collection of $p_t = \E_t[m_{t,t+n}]$. [[asset-pricing/behavioural-finance]] drops the representative-agent identification of $m$ and asks whether some of the premium, and some of the anomalies, are the price of noise-trader risk or of limited arbitrage. The derivatives course will price options by changing measure, which is valid whether or not $m$ comes from consumption; the consumption identification is a *restriction*, not a prerequisite, for using an SDF.

::: history
Robert Lucas's 'Asset Prices in an Exchange Economy' (*Econometrica*, 1978) priced claims to a stochastic fruit tree and obtained [[#thm-euler]] in a complete-market representative-agent setting. Douglas Breeden's 'An Intertemporal Asset Pricing Model with Stochastic Consumption and Investment Opportunities' (*Journal of Financial Economics*, 1979) derived the continuous-time consumption CAPM. Rajnish Mehra and Edward Prescott's 'The Equity Premium: A Puzzle' (*Journal of Monetary Economics*, 1985) showed that the Euler equation, with moderate $\gamma$, cannot match 1889–1978 US moments; they report a maximum premium of about $0.4$ percentage points against a sample premium of $6.18$. Philippe Weil (1989, *Journal of Monetary Economics*) named the risk-free-rate puzzle. John Campbell and John Cochrane (1999, *Journal of Political Economy*) developed external habit. Ravi Bansal and Amir Yaron (2004, *Journal of Finance*) developed long-run risk. The literature since has not produced a consensus calibration that closes both puzzles on a pre-specified preference and a pre-specified consumption process.
:::

::: summary
- The consumption Euler equation is $p_t = \E_t[\beta u'(C_{t+1})/u'(C_t)\, x_{t+1}]$. With power utility, $m_{t+1} = \beta (C_{t+1}/C_t)^{-\gamma}$.
- A log-linear approximation gives $\E[R^e] \approx \gamma\,\sigma(R)\,\sigma(\Delta\ln C)\,\rho_{R,c}$. On Mehra and Prescott's 1889–1978 US moments, matching a $6.18$-point premium at $\rho = 0.40$ wants $\gamma \approx 26$. Their own calibration, with $\gamma \le 10$, produces at most about $0.4$ points. That is the equity-premium puzzle.
- The same power utility, with $\beta = 0.99$ and $g = 0.018$, produces $r_f \approx 4.2$ per cent at $\gamma = 2$ and $\approx 12$ per cent at $\gamma = 10$, against a sample real bill return of $0.80$ per cent. That is the risk-free-rate puzzle (Weil 1989).
- Habit (Campbell and Cochrane 1999) makes effective risk aversion high and countercyclical. Long-run risk (Bansal and Yaron 2004) prices persistent consumption-growth news with Epstein–Zin preferences. Both raise the premium without a huge $\gamma$ on the *level* of $C$. Neither is a consensus resolution.
- Dimson, Marsh and Staunton (2023) report a world geometric real equity premium versus bills of $4.6$ per cent over $1900$–$2022$, smaller than the US arithmetic $6.18$ per cent of 1889–1978, and still large relative to $\gamma\times 0.002$.
:::

## Exercises

::: exercise Envelope premium at $\gamma = 2$ {level=1 check="0.0047"}
Using $\E[R^e] \approx \gamma\times 0.00236$, enter the approximate premium at $\gamma = 2$ to four decimals.
::: solution
$2\times 0.00236 = 0.00472$, which rounds to $0.0047$. Mehra and Prescott's sample premium is $0.0618$, about thirteen times larger.
:::
:::

::: exercise The $\gamma$ that matches $0.0618$ {level=1 check="26"}
At $\rho_{R,c} = 0.40$, enter the $\gamma$ that matches a premium of $0.0618$ in the envelope formula, as an integer.
::: solution
$0.0618/0.00236 \approx 26.2$, which rounds to $26$. At $\rho = 0.20$ the same premium would want $\gamma \approx 52$.
:::
:::

::: exercise Risk-free rate at $\gamma = 2$ {level=1 check="0.042"}
From [[#ex-rf]], enter the approximate $r_f$ at $\gamma = 2$ to three decimals.
::: solution
$0.0422$ rounds to $0.042$. The sample real bill return in Mehra and Prescott is $0.008$.
:::
:::

::: exercise Euler on a one-period bond {level=2}
Write the Euler equation for a one-period default-free bond that pays $1$. Show that $R_f = 1/\E[m]$, and interpret a high $m$ in a recession as a low $R_f$.
::: solution
The payoff is $x_{t+1} = 1$ and the price is $p_t = 1/R_f$ (if $R_f$ is known at $t$), so [[#thm-euler]] says $1/R_f = \E_t[m_{t+1}]$, or $R_f = 1/\E_t[m_{t+1}]$. In a recession, $C_{t+1}$ is low, $u'(C_{t+1})$ is high, and $m_{t+1}$ is high. A high conditional mean of $m$ is a low $R_f$: the agent would like to save into the recession, bidding up the bond price and bidding down its return. That is the precautionary and consumption-smoothing content of the Euler equation. It is also why matching a *low* sample $r_f$ is hard when $m$ is not volatile enough: $\E[m]$ then sits too close to $\beta$, and $R_f$ sits too close to $1/\beta$.
:::
:::

::: exercise Why $\rho_{R,c}$ is the villain {level=2}
Keep $\gamma = 10$, $\sigma(R) = 0.1654$ and $\sigma(\Delta\ln C) = 0.0357$. Compute the envelope premium at $\rho_{R,c} = 1$ and at $\rho_{R,c} = 0.2$. What does the comparison say about whether the puzzle is “consumption is too smooth” or “equities do not co-move with consumption”?
::: solution
The product $\gamma\sigma(R)\sigma(\Delta\ln C) = 10\times 0.1654\times 0.0357 \approx 0.0590$. At $\rho = 1$ the premium is $0.059$, close to the sample $0.0618$. At $\rho = 0.2$ it is $0.0118$, about one-fifth of the sample. So *if* equities were perfectly correlated with consumption growth, $\gamma = 10$ and the observed $\sigma(\Delta\ln C)$ would be in the right neighbourhood. The puzzle, at this $\gamma$, is as much a correlation puzzle as a smoothness puzzle. Sample correlations well below $1$ are why Mehra and Prescott's Markov-chain calibration, which does not assume $\rho = 1$, cannot get above a few tenths of a point. Raising $\sigma(\Delta\ln C)$ (rarer disasters, measurement of consumption) and raising $\rho$ (a different consumption series, long-run news) are two corresponding research directions.
:::
:::

::: exercise Habit in one paragraph {level=2}
In the Campbell–Cochrane model, surplus consumption $S = (C-X)/C$ is small and more volatile than $C$. Explain, using $m = \beta (S_{t+1}/S_t)^{-\gamma}(C_{t+1}/C_t)^{-\gamma}$ (external habit with power utility on $C-X$), why effective risk aversion is high when $S$ is low, and why that helps the premium without a huge $\gamma$ on $C$ itself.
::: solution
Utility is $u(C-X) = (CS)^{1-\gamma}/(1-\gamma)$. The curvature with respect to $C$ is larger when $S$ is small, because a given percentage shock to $C$ is a larger percentage shock to $C-X$. Local relative risk aversion is $\gamma/S$ (up to the dynamics of $X$), which is a large number when $S$ is a few per cent. Recessions are low-$S$ states; $m$ is then very high, and assets that do badly in recessions are priced cheaply. The $\gamma$ on surplus can stay moderate; the $1/S$ factor does the work. The risk-free rate is stabilised by making habit move with consumption in a way that offsets the usual $\gamma g$ term. The mechanism is a preference, not a recommendation about anyone's subsistence.
:::
:::

::: exercise Long-run risk and duration {level=3}
Bansal and Yaron (2004) make a small persistent component of consumption growth priced under Epstein–Zin preferences. Why are equities, rather than one-period bonds, the claims that carry a large premium in that setting? Relate the answer to duration.
::: hint
A persistent shock to $g$ changes the whole path of future $C$, hence the whole path of future dividends if dividends share the shock.
:::
::: solution
A one-period bond pays a known amount next period; it is exposed only to the one-period $m_{t+1}$, not to a revision of the whole future path of $m$. An equity is a claim to a stream. A persistent rise in consumption growth raises future dividends (if they share the trend) and lowers future $m$ (if the agent is better fed along the path). Epstein–Zin preferences with a preference for early resolution of uncertainty make news about that long-run component a priced shock *today*. Equities have high duration with respect to that news; one-period bills have duration one. The premium is therefore a duration premium for long-run consumption risk, not a one-period covariance with $\Delta\ln C_t$. That is why the model can produce a large equity premium while leaving $r_f$ moderate. Whether consumption growth actually contains such a component, at the persistence the calibration needs, is the empirical sticking point.
:::
:::

::: exercise Dimson–Marsh–Staunton and the target {level=3}
Dimson, Marsh and Staunton (2023) report a world geometric real equity return of $5.0$ per cent and a bill return of $0.4$ per cent over $1900$–$2022$, hence a $4.6$-point geometric premium versus bills. Mehra and Prescott's US arithmetic premium over $1889$–$1978$ is $6.18$ points. Give two reasons the two numbers differ, and say whether replacing $6.18$ by $4.6$ in the envelope formula closes the puzzle at $\gamma = 10$, $\rho = 0.40$.
::: hint
Arithmetic versus geometric, US versus world, sample window. Then compute $10\times 0.00236$ against $0.046$.
:::
::: solution
Reasons: (i) arithmetic means exceed geometric means by about half the variance; a $16$ per cent standard deviation contributes about $1.3$ points of that gap; (ii) the US sample is one country, and one of the better-performing ones in the DMS table (US real USD return $6.38$ per cent, against a world $5.0$ per cent); (iii) the windows differ, and 1889–1978 excludes the late-twentieth-century valuation rise in a different way from 1900–2022. Replacing the target by $0.046$ at $\gamma = 10$ and $\rho = 0.40$ gives an envelope premium of $0.0236$, still about half the $4.6$-point geometric target, and a smaller fraction of an arithmetic world target. The puzzle shrinks and does not close. Using a world geometric premium as the target is a legitimate, and more representative, choice; it is still large relative to the covariance of consumption with returns.
:::
:::
