A call is the right to buy. A put is the right to sell. Unlike a forward, the holder of an option may walk away, so the payoff is a kink rather than a line: $\max(S_T - K, 0)$ for a call, $\max(K - S_T, 0)$ for a put. The kink is why a static cash-and-carry portfolio cannot replicate an option, and why the next two chapters need trees and a hedging argument. This chapter stays with what can be said *without* a model of $S$: payoff diagrams, spreads and combinations, **put–call parity**, and the model-free bounds that any no-arbitrage price must respect.

The numbers are the house set: $S = 100$, $K = 100$ or $95$ and $105$, $r = 0.05$ continuous, $T = 1$, no dividends unless named. Premiums that appear as “$10.45$” are Black–Scholes values from [[derivatives/black-scholes]], used here only so that a combination has a number; nothing in the parity identity needs that model. Nothing in the chapter is a recommendation to buy a call, sell a put, or assemble a spread.

## Calls, puts and European versus American

:::definition Call, put, strike and maturity {#def-call-put}
A **European call** with strike $K$ and maturity $T$ pays $\max(S_T - K, 0)$ at $T$. A **European put** pays $\max(K - S_T, 0)$ at $T$. An **American** call or put may be exercised at any time $t \le T$ for the intrinsic value $\max(S_t - K, 0)$ or $\max(K - S_t, 0)$. The **premium** is the price of the option today. The holder is **long** the option; the writer is **short**.
:::

Moneyness is a description of $S$ against $K$, not a prediction. A call is **in the money** if $S > K$, **at the money** if $S = K$, **out of the money** if $S < K$; for a put the inequalities reverse. **At the money forward** means $K = F_{0,T}$. Writers of calls who also hold the underlying have a **covered** call; writers who do not have a **naked** short. Those adjectives describe a position. They are not a ranking of which position to take.

The long call's payoff is never negative; the long put's payoff is never negative. Each premium is paid up front (or, on a futures-style option, through margin). The *net* P&amp;L of a long call is $\max(S_T - K, 0) - C e^{rT}$ if we future-value the premium, or $e^{-rT}\max(S_T - K, 0) - C$ if we present-value the payoff. Diagrams usually plot the future-valued version against $S_T$, so the kink sits on the horizontal axis at $K$ and the horizontal segment sits at minus the future-valued premium.

:::example Two realised payoffs {#ex-two-payoffs}
A European call and a European put, both with $K = 100$, face $S_T = 120$ in one scenario and $S_T = 85$ in another. Compute the four payoffs.
:::solution
At $S_T = 120$ the call pays $\max(120-100,0) = 20$ and the put pays $\max(100-120,0) = 0$. At $S_T = 85$ the call pays $0$ and the put pays $15$. The sum of call and put payoffs is $\lvert S_T - 100\rvert$: $20$ in the first scenario and $15$ in the second. That sum is the **straddle** payoff, recorded below.
:::
:::

:::widget plot
f: max(x-k,0); max(k-x,0)
sliders: k=100:60:140:1
x: 40, 160
y: 0, 80
labels: \text{call payoff}; \text{put payoff}
caption: European call and put payoffs against $S_T$, with a slider for the strike. Raise $K$ and the call's kink moves right while the put's kink moves with it. The two payoffs never go negative. The picture is a contract identity, not a forecast of $S_T$.
:::

:::widget plot
f: max(x-100,0) - 10.45*exp(0.05); max(100-x,0) - 5.57*exp(0.05)
x: 40, 160
y: -20, 50
labels: \text{long call net}; \text{long put net}
hlines: 0
caption: Net P&amp;L of a long European call and a long European put, both struck at $100$, with illustrative premiums $10.45$ and $5.57$ future-valued at $r = 0.05$. The call breaks even near $111$; the put near $94$. The premiums are Black–Scholes values from the house numbers, used only to place the lines, not as quotes or as a recommendation.
:::

## Combinations

Adding and subtracting the kinks produces the standard diagrams.

A **bull call spread** is long a call at $K_1$ and short a call at $K_2 > K_1$. Payoff is $0$ below $K_1$, then rises one-for-one to $K_2 - K_1$, then is capped. A **bear put spread** is long a put at $K_2$ and short a put at $K_1 < K_2$. A **straddle** is long a call and a put at the same $K$; payoff $\lvert S_T - K\rvert$. A **strangle** uses two strikes. A **butterfly** is long a call at $K-\Delta$, short two calls at $K$, long a call at $K+\Delta$; payoff is a triangular tent of height $\Delta$. A **collar** is long a put at $K_1$ and short a call at $K_2 > K_1$, often held against the underlying.

Each combination is a portfolio of the contracts in [[#def-call-put]]. None of them needs a pricing model to *draw*. Pricing them does: without a model one can still bound the combination by parity and by the inequalities of the next sections.

:::example A $95$–$105$ bull call spread {#ex-bull}
European calls with $T = 1$, $r = 0.05$, $S_0 = 100$ have illustrative Black–Scholes premiums $C(95) = 13.346$ and $C(105) = 8.021$. Compute the net debit of a bull call spread (long $K=95$, short $K=105$), and the payoff at $S_T = 90$, $100$ and $110$.
:::solution
The net debit is $13.346 - 8.021 = 5.325$. Payoffs: at $90$, both calls expire worthless, payoff $0$; at $100$, the $95$-call pays $5$ and the $105$-call pays $0$, payoff $5$; at $110$, the $95$-call pays $15$ and the $105$-call pays $5$, payoff $10$, which is the cap $K_2-K_1$. The largest payoff is $10$ for a debit of $5.325$; whether that ratio is attractive is a preference question the diagram does not answer. The premiums are model values on the house numbers, not quotes.
:::
:::

:::quiz
A long straddle at $K = 100$ pays $\lvert S_T - 100\rvert$. Which statement is correct?
- [ ] The straddle pays a positive amount in every state
- [x] The straddle pays zero at $S_T = 100$ and a positive amount on either side
- [ ] The straddle is the same contract as a long forward
- [ ] The straddle's premium is zero by put–call parity
:::solution
At $S_T = K$ both options expire worthless. Away from $K$ one of them pays. A forward pays $S_T - K$, which is negative for $S_T < K$. Parity relates a call, a put and a forward; it does not make a straddle free.
:::
:::

## Put–call parity

The call kink plus the put kink is a V. The call kink minus the put kink is a straight line: it is a forward. That is put–call parity, and it is an identity of payoffs before it is an identity of prices.

:::theorem Put–call parity {#thm-parity}
In a market with a constant continuous rate $r$, no transaction costs, and a European call and put with the same strike $K$ and maturity $T$ on an asset that pays a continuous yield $q$,

$$
C - P = S_0 e^{-qT} - K e^{-rT} = e^{-rT}\bigl(F_{0,T} - K\bigr).
$$ {#eq-parity}

Equivalently, a long European call and a short European put replicate a long forward with delivery price $K$. If the quoted $C-P$ differs from the right-hand side, an arbitrage portfolio of the two options, the asset and cash has a positive payoff in every state.
:::

:::proof
At $T$ the call-minus-put payoff is

$$
\max(S_T-K,0) - \max(K-S_T,0) = S_T - K.
$$

The identity is algebraic: if $S_T \ge K$ it reads $(S_T-K) - 0 = S_T-K$; if $S_T < K$ it reads $0 - (K-S_T) = S_T-K$. The right-hand side is the payoff of a long forward with delivery price $K$. The value of that forward today is $S_0 e^{-qT} - K e^{-rT}$ by [[derivatives/forwards-and-futures#eq-fwd-value]]. Therefore $C-P$ equals that value.

If a quoted $C-P$ exceeds $S_0 e^{-qT} - K e^{-rT}$, sell the call, buy the put, buy $e^{-qT}$ units of the asset (financed, with yield reinvested to one unit at $T$), and borrow $K e^{-rT}$. At $T$ the options deliver $K-S_T$ in cash, the asset is worth $S_T$, and one owes $K$; everything cancels and the positive initial proceeds have been locked. If a quoted $C-P$ is too small, reverse every sign. Assumptions: European exercise (so that the identity at $T$ cannot be interrupted), the same $K$ and $T$ on both options, and frictionless trading in the asset and cash.
:::

The proof never used a distribution for $S_T$. Parity is **model-free**. It survives every later model in the course: binomial, Black–Scholes, stochastic volatility, jumps. What it does *not* survive is American exercise, because the identity $\max(S_t-K,0) - \max(K-S_t,0) = S_t - K$ would then be available at a date when the forward's value is not yet $S_t - K$ in cash. American parity becomes an inequality, recorded as a bound below.

:::example House-number parity {#ex-parity-numbers}
$S_0 = 100$, $K = 100$, $r = 0.05$, $q = 0$, $T = 1$. Compute the right-hand side of [[#eq-parity]]. Confirm that the Black–Scholes values $C = 10.4506$ and $P = 5.5735$ (from [[derivatives/black-scholes]], $\sigma = 0.20$) satisfy it.
:::solution
$$
C - P = 100 - 100 e^{-0.05} = 100 - 95.1229 = 4.8771
$$

to four decimals. The Black–Scholes pair gives $10.4506 - 5.5735 = 4.8771$. The match is a check that the formula in the next-but-one chapter respects a model-free identity, not independent evidence for that formula. A one-step binomial tree in [[derivatives/binomial-model]] will produce a different $C$ and $P$ whose difference is again $4.8771$.
:::
:::

:::example Recovering a put {#ex-recover-put}
A European call with $K = 105$, $T = 1$, $S_0 = 100$, $r = 0.05$, $q = 0$ has illustrative price $C = 8.0214$. Compute the European put with the same $K$ and $T$ from parity.
:::solution
$C - P = 100 - 105 e^{-0.05} = 100 - 99.8791 = 0.1209$, so $P = C - 0.1209 = 7.9005$. Direct Black–Scholes for that put is $7.9004$; the one-tick gap is rounding. Parity is the faster route whenever one of $C$ or $P$ is known.
:::
:::

:::intuition The call is a put plus a forward
If you already have a put, you can manufacture a call by adding a long forward struck at $K$: the forward supplies $S_T - K$, the put knocks out the negative part, and what remains is $\max(S_T-K,0)$. The price identity is that sentence with present values. Students who memorise $C - P = S - K$ without the discounts are dropping the bank account; with $r > 0$ that is a different, wrong, line.
:::

:::warning Dropping the discount, or applying parity to American options {#warn-american}
Two routine errors. First, writing $C - P = S_0 - K$ instead of $S_0 e^{-qT} - K e^{-rT}$. With the house numbers the right-hand side is $4.877$, not $0$; using $0$ would mis-price the put by the whole present-value gap. Second, applying [[#eq-parity]] as an equality to American options. An American put may be exercised early, so the payoff identity at $T$ is not forced. The American version is $S_0 e^{-qT} - K \le C_{\mathrm{Am}} - P_{\mathrm{Am}} \le S_0 e^{-qT} - K e^{-rT}$ for $q = 0$ the usual tighter statement is $S_0 - K \le C_{\mathrm{Am}} - P_{\mathrm{Am}} \le S_0 - K e^{-rT}$. Equality is restored only at expiry or in the European case.
:::

## Model-free bounds

Even without parity, no-arbitrage pins an option between its intrinsic value and a trivial upper bound.

:::proposition European option bounds {#prop-bounds}
In the market of [[#thm-parity]], with $C$ and $P$ the European call and put prices,

$$
\max\bigl(S_0 e^{-qT} - K e^{-rT},\, 0\bigr) \le C \le S_0 e^{-qT},
$$ {#eq-call-bound}

$$
\max\bigl(K e^{-rT} - S_0 e^{-qT},\, 0\bigr) \le P \le K e^{-rT}.
$$ {#eq-put-bound}

For $q = 0$, a European call on a non-dividend asset is never exercised early if the corresponding American right is granted: $C_{\mathrm{Am}} = C_{\mathrm{Eu}}$. An American put may be exercised early: $P_{\mathrm{Am}} \ge P_{\mathrm{Eu}}$, and the inequality can be strict.
:::

:::proof
$C \ge 0$ because a call payoff is non-negative. $C \ge S_0 e^{-qT} - K e^{-rT}$ because $C = P + S_0 e^{-qT} - K e^{-rT}$ and $P \ge 0$. $C \le S_0 e^{-qT}$ because a call is worth no more than the prepaid forward on the asset (the strike is a non-negative payment). The put bounds are the same argument with parity rearranged, or directly: a put is worth no more than the prepaid strike, and no less than the corresponding in-the-money forward.

For the American call with $q = 0$: exercising at $t < T$ yields $S_t - K$. Selling the option and selling the asset short yields at least $C_{\mathrm{Eu}} - S_t \ge -K e^{-r(T-t)} > -K$ in present value by the European bound, so the live option dominates exercise. With $q > 0$ that comparison can fail and early exercise of a call can be optimal. For the American put, exercising yields $K - S_t$ in cash, which can be lent; the European put cannot be exercised, so a deep in-the-money American put is a claim to $K$ now rather than $K$ at $T$, and the interest on $K$ can outweigh the remaining optionality.
:::

:::example House-number bounds {#ex-bounds}
$S_0 = 100$, $K = 100$, $r = 0.05$, $q = 0$, $T = 1$. Compute the four bounds in [[#prop-bounds]]. Place the Black–Scholes values $C = 10.4506$, $P = 5.5735$ inside them.
:::solution
The call lower bound is $\max(100 - 95.1229, 0) = 4.8771$; the call upper bound is $100$. The put lower bound is $\max(95.1229 - 100, 0) = 0$; the put upper bound is $95.1229$. Then $4.8771 \le 10.4506 \le 100$ and $0 \le 5.5735 \le 95.1229$. The Black–Scholes call sits $5.57$ above its lower bound; that $5.57$ *is* the put, by parity. A quoted call below $4.877$ would be an arbitrage against the forward, with no model required.
:::
:::

Convexity in the strike is another model-free restriction. For $K_1 < K_2 < K_3$, the call prices must satisfy

$$
\frac{C(K_2) - C(K_1)}{K_2 - K_1} \le \frac{C(K_3) - C(K_2)}{K_3 - K_2}
$$

in the sense that a butterfly with those strikes cannot have a negative price (its payoff is non-negative). Breeden and Litzenberger (1978) turned the second difference of $C$ with respect to $K$ into the risk-neutral density of $S_T$. That is the farthest model-free pricing goes: it recovers a distribution from a *continuum* of quoted strikes, and it still does not say how to hedge between today and $T$.

:::remark Dividends and early exercise, in one paragraph
A call on a non-dividend share is never exercised early because the insurance — the right to wait — is worth more than the interest on the strike. A put can be exercised early because the strike is cash you could be earning interest on. A large discrete dividend can reverse the call conclusion for a short window around the ex-dividend date: the share drops by about the dividend, and a deep in-the-money call may be worth more exercised just before that drop. The binomial tree of the next chapter will make the comparison numerical: at each node, continuation versus intrinsic.
:::

## Where this leads

Parity reduces the number of prices one has to produce: a model that prices calls prices puts. The bounds are the first check on any number a tree or a formula emits. What neither parity nor the bounds give is a *unique* price inside the interval. Filling the interval is the job of a dynamic hedge. [[derivatives/binomial-model]] builds that hedge on a tree, by hand. [[derivatives/black-scholes]] takes the same hedge to continuous time, under extra assumptions that must be named. Combinations such as the bull spread will reappear as the finite-difference second derivative of the call, which is the risk-neutral density.

:::history
**1973, Chicago Board Options Exchange.** The CBOE opened on 26 April 1973 in a converted smoking lounge of the Chicago Board of Trade, listing call options on sixteen shares; $911$ contracts traded the first day (CBOE; Options Clearing Corporation). Puts followed in 1977. Standardisation — listed strikes, listed maturities, a clearing house — is what turned an OTC warrant market into an exchange. Put–call parity itself is older as an identity of payoffs; the textbook derivation from no-arbitrage on European options is the argument of [[#thm-parity]], and it does not depend on the 1973 formula of Black, Scholes and Merton. That formula is the next-but-one chapter. The CBOE's opening and the *Journal of Political Economy* paper of May–June 1973 happened in the same season; they were not a coordinated project.
:::

:::summary
- A European call pays $\max(S_T-K,0)$; a European put pays $\max(K-S_T,0)$. American options add the right to take intrinsic value early.
- Combinations (spreads, straddles, butterflies, collars) are portfolios of those kinks. Their payoff diagrams do not need a pricing model; their premiums do.
- Put–call parity: $C - P = S_0 e^{-qT} - K e^{-rT}$. The proof is an identity of payoffs at $T$. It is model-free and fails as an equality for American options.
- With the house numbers $S = K = 100$, $r = 0.05$, $T = 1$, $q = 0$, the parity gap is $4.877$. Any honest model of $C$ and $P$ must reproduce it.
- European bounds: $C$ lies between $\max(S_0 e^{-qT} - K e^{-rT}, 0)$ and $S_0 e^{-qT}$. A European call on a non-dividend asset is not exercised early.
- Nothing in a payoff diagram or in parity is a recommendation to hold the position the diagram describes.
:::

## Exercises

:::exercise Call payoff {level=1 check="20"}
A European call with $K = 100$ expires with $S_T = 120$. Enter the payoff.
:::solution
$\max(120-100,0) = 20$. The put on the same strike pays $0$.
:::
:::

:::exercise Put payoff {level=1 check="15"}
A European put with $K = 100$ expires with $S_T = 85$. Enter the payoff.
:::solution
$\max(100-85,0) = 15$. The call pays $0$.
:::
:::

:::exercise Parity gap {level=1 check="4.877"}
$S_0 = 100$, $K = 100$, $r = 0.05$, $q = 0$, $T = 1$. Enter $C-P$ to three decimals.
:::solution
$100 - 100 e^{-0.05} = 4.877$ to three decimals, [[#ex-parity-numbers]].
:::
:::

:::exercise Recover the put {level=2 check="7.900"}
A European call with $K = 105$, $T = 1$, $S_0 = 100$, $r = 0.05$, $q = 0$ is worth $8.021$. Enter the European put, to three decimals.
:::solution
$C-P = 100 - 105 e^{-0.05} = 0.121$ to three decimals, so $P = 8.021 - 0.121 = 7.900$, [[#ex-recover-put]].
:::
:::

:::exercise Call lower bound {level=2 check="4.877"}
With $S_0 = 100$, $K = 100$, $r = 0.05$, $q = 0$, $T = 1$, enter the lower bound on a European call, to three decimals.
:::solution
$\max(S_0 - K e^{-rT}, 0) = 4.877$, [[#ex-bounds]]. A quoted call of $3$ would be an arbitrage against the forward.
:::
:::

:::exercise Bull-spread debit {level=2 check="5.325"}
$C(95) = 13.346$, $C(105) = 8.021$. Enter the net debit of the long-$95$ short-$105$ bull call spread, to three decimals.
:::solution
$13.346 - 8.021 = 5.325$, [[#ex-bull]]. The cap on the payoff is $10$.
:::
:::

:::exercise Prove the payoff identity {level=3}
Prove, by splitting into $S_T \ge K$ and $S_T < K$, that $\max(S_T-K,0) - \max(K-S_T,0) = S_T - K$. Then state why this identity prices a *European* call-minus-put as a forward, and why the same identity does not force American put–call equality.
:::hint
The forward's value today is $S_0 e^{-qT} - K e^{-rT}$ only as a claim to $S_T-K$ *at $T$*.
:::
:::solution
If $S_T \ge K$, then $\max(S_T-K,0) = S_T-K$ and $\max(K-S_T,0) = 0$, so the difference is $S_T-K$. If $S_T < K$, then $\max(S_T-K,0) = 0$ and $\max(K-S_T,0) = K-S_T$, so the difference is $-(K-S_T) = S_T-K$. In both regions the identity holds. A European call and put cannot be exercised before $T$, so the portfolio is a claim to $S_T-K$ at $T$, which is a forward, valued at $S_0 e^{-qT} - K e^{-rT}$. An American holder can exercise at some $t < T$, turning the identity into a claim to $S_t - K$ in cash *at $t$*, which is not the forward. Hence American parity is an inequality, as in [[#warn-american]].
:::
:::

:::exercise A butterfly cannot be worth less than zero {level=3}
Let $K_1 = 95$, $K_2 = 100$, $K_3 = 105$, equally spaced. Write the payoff of a butterfly that is long one call at $K_1$, short two calls at $K_2$, and long one call at $K_3$. Show it is non-negative for every $S_T$, and deduce that $C(95) - 2C(100) + C(105) \ge 0$ in the absence of arbitrage (ignore discounting of the premium, or equivalently work with forward prices of the options). With the illustrative values $C(95) = 13.346$, $C(100) = 10.451$, $C(105) = 8.021$, check the inequality numerically.
:::hint
Split the real line at $95$, $100$ and $105$. The payoff is a tent of height $5$ between $95$ and $105$.
:::
:::solution
For $S_T \le 95$ every call is out of the money and the payoff is $0$. For $95 \le S_T \le 100$ only the $95$-call is in the money, payoff $S_T-95 \ge 0$. For $100 \le S_T \le 105$ the payoff is $(S_T-95) - 2(S_T-100) = 105 - S_T \ge 0$. For $S_T \ge 105$ it is $(S_T-95) - 2(S_T-100) + (S_T-105) = 0$. So the payoff is a tent of height $5$ and is never negative. A negative price for a non-negative payoff is an arbitrage: buy the butterfly, pocket the cash, and have a non-negative future payoff. Therefore $C(95)-2C(100)+C(105) \ge 0$ (in forward value, strictly; with undiscounted premiums the same inequality holds up to a discount factor that does not change the sign). Numerically $13.346 - 2\times 10.451 + 8.021 = 0.465 > 0$. The positive butterfly price is consistent with no-arbitrage; a quoted butterfly of $-0.10$ would not be.
:::
:::
