A worker would like to start a task next week and enjoy the weekend now. When next week arrives, she would like to start the week after. A farmer in western Kenya, in Duflo, Kremer and Robinson’s (2011) study, plans to buy fertiliser after harvest, when cash is on hand, and often does not; a small, time-limited discount right after harvest raises take-up. A laboratory subject prefers $100$ now to $110$ in a month, and prefers $110$ in thirteen months to $100$ in twelve. The three observations are the same phenomenon: **present bias**. Payoffs that arrive immediately get extra weight relative to payoffs that arrive later, and the extra weight is not a constant discount rate. Exponential discounting, the workhorse of [[microeconomics/labour-and-intertemporal-choice]], cannot produce a preference reversal of that kind. Quasi-hyperbolic, or $\beta$–$\delta$, discounting can, and it is the model this chapter develops.

The chapter is about model agents, not about the reader’s money. Nothing here is a recommendation to save, to borrow, to buy commitment products, or to choose a pension. Illustrative numbers describe a fictional consumer $i$ and a finite horizon $T$. Field studies are cited with their samples and effect sizes, as evidence about those populations, not as advice.

## Exponential discounting and time consistency

A discounted-utility agent ranks streams $(c_0, c_1, \dots, c_T)$ by

$$
U(c_0, \dots, c_T) = \sum_{t=0}^{T} D(t)\, u(c_t),
$$

where $u$ is a period utility and $D(t)$ is a **discount function** with $D(0) = 1$ and $D$ decreasing. The standard specification is **exponential**: $D(t) = \delta^t$ for a discount factor $\delta \in (0, 1]$. Samuelson (1937) introduced it as a convenient formula, not as a psychological law. Its distinctive property is **time consistency**: a plan that is optimal today remains optimal when tomorrow becomes today.

::: definition Exponential discounting {#def-exp}
An agent is an **exponential discounter** with factor $\delta \in (0, 1]$ if she ranks consumption streams by $\sum_{t=0}^{T} \delta^t u(c_t)$. The implied discount *rate* is $\rho = 1/\delta - 1$. From date $s$, the remaining stream $(c_s, \dots, c_T)$ is ranked by $\sum_{k=0}^{T-s} \delta^k u(c_{s+k})$, i.e. by the same $\delta$.
:::

::: proposition Time consistency of exponential discounting {#prop-tcons}
Let $c^*$ maximise $\sum_{t=0}^{T} \delta^t u(c_t)$ on a constraint set that is consistent over time (the date-$0$ plan’s continuation is feasible at date $s$). Then for every $s$, the continuation $(c_s^*, \dots, c_T^*)$ maximises $\sum_{k=0}^{T-s} \delta^k u(c_{s+k})$ on the continuation set.
:::
::: proof
Suppose not: some feasible continuation $\tilde c$ from $s$ has $\sum_{k=0}^{T-s} \delta^k u(\tilde c_{s+k}) > \sum_{k=0}^{T-s} \delta^k u(c_{s+k}^*)$. Concatenating $(c_0^*, \dots, c_{s-1}^*)$ with $\tilde c$ is feasible at date $0$ by consistency of the constraint, and it raises date-$0$ utility by $\delta^s$ times a positive number, contradicting optimality of $c^*$ at date $0$.
:::

The proof uses one algebraic fact: $\delta^{s+k} = \delta^s \cdot \delta^k$, so the ranking of continuations from date $0$, looking through $\delta^s$, is the same as the ranking from date $s$. Any discount function that does *not* satisfy $D(s+k)/D(s) = D(k)$ will generally fail the argument, and the agent will disagree with her future self.

Strotz (1955–56) saw this clearly: non-exponential discounting produces a **conflict between selves**. Phelps and Pollak (1968) wrote a $\beta$–$\delta$ function for intergenerational altruism. Laibson (1997) imported that function into personal consumption as **quasi-hyperbolic discounting**, and it has been the workhorse since.

## Quasi-hyperbolic discounting

::: definition Quasi-hyperbolic ($\beta$–$\delta$) discounting {#def-bd}
A **quasi-hyperbolic**, or $\boldsymbol{\beta}$–$\boldsymbol{\delta}$, agent ranks streams from date $0$ by

$$
U_0 = u(c_0) + \beta \sum_{t=1}^{T} \delta^t u(c_t),
$$ {#eq-bd}

with present-bias parameter $\beta \in (0, 1]$ and long-run factor $\delta \in (0, 1]$. From date $s$ the ranking is $u(c_s) + \beta \sum_{k=1}^{T-s} \delta^k u(c_{s+k})$: the current period is never discounted, and every later period is discounted by an extra $\beta$. Exponential discounting is the special case $\beta = 1$.
:::

The discount function is $D(0) = 1$ and $D(t) = \beta \delta^t$ for $t \ge 1$. The short-run discount factor, between today and tomorrow, is $\beta\delta$; the long-run factor, between any two adjacent future dates, is $\delta$. With $\beta = 0.7$ and $\delta = 0.95$, the short-run discount *rate* is $1/(0.7 \times 0.95) - 1 \approx 50\%$, and the long-run rate is $1/0.95 - 1 \approx 5\%$. That is a model of a person who is patient with future trade-offs and impatient when one side of the trade-off is now.

True **hyperbolic** discounting, $D(t) = 1/(1 + k t)$, associated with Ainslie and with Loewenstein and Prelec (1992), has a smoothly declining discount rate and is a better description of some animal and human timing data. Quasi-hyperbolic discounting is the discrete-time cousin that can be dropped into a finite-horizon maximisation without pain, and it is what we compute with.

::: widget plot
f: d^x; if(x < 0.05, 1, b*d^x); 1/(1 + k*x)
sliders: d=0.96:0.85:0.99:0.01; b=0.7:0.4:1:0.05; k=0.2:0.05:0.8:0.05
x: 0, 16
y: 0, 1.05
labels: \text{exponential }\delta^t; \text{quasi-hyperbolic}; \text{hyperbolic }1/(1+kt)
caption: Three discount functions of time $t$. Start at $\delta = 0.96$, $\beta = 0.7$, $k = 0.2$. The quasi-hyperbolic curve drops from $1$ to $\beta\delta$ between $t = 0$ and $t = 1$, then decays at rate $\delta$. Slide $\beta$ to $1$ to recover the exponential. The hyperbolic curve declines more steeply at first and more slowly later.
:::

::: example A preference reversal {#ex-reversal}
Let $u(c) = c$, $\beta = 0.7$, $\delta = 0.95$, and consider two dated rewards: $100$ at date $t$ and $110$ at date $t+1$. From date $0$, with $t = 0$ (so $100$ is now), which is preferred? From date $0$, with $t = 5$ (both rewards in the future), which is preferred? Confirm that an exponential agent with the same $\delta$ and $\beta = 1$ does not reverse.
::: solution
Now versus in one period: $U(100 \text{ now}) = 100$, $U(110 \text{ in one period}) = \beta\delta \cdot 110 = 0.7 \times 0.95 \times 110 = 73.15$. The $100$ now is preferred. Both in the future, $t = 5$ versus $t = 6$: $U(100 \text{ at } 5) = \beta \delta^5 \cdot 100 \approx 0.7 \times 0.7738 \times 100 \approx 54.16$, $U(110 \text{ at } 6) = \beta \delta^6 \cdot 110 \approx 0.7 \times 0.7351 \times 110 \approx 56.60$. The $110$ is preferred. The ranking reverses as the pair is delayed. With $\beta = 1$, now versus later is $100$ against $0.95 \times 110 = 104.5$, so the $110$ wins; at $t = 5$ it is $0.95^5 \times 100 \approx 77.38$ against $0.95^6 \times 110 \approx 80.86$, and the $110$ still wins. Exponential discounting does not reverse; $\beta < 1$ does.
:::
:::

The general test is simple. A $\beta$–$\delta$ agent prefers a smaller-sooner reward $x$ at $t$ to a larger-later $y$ at $t+1$ *from date $t$* when $x > \beta\delta y$, and prefers $y$ *from any earlier date* when $\delta y > x$ (the $\beta$ cancels). A reversal of this kind, **present-biased preference reversal**, occurs whenever $\beta\delta y < x < \delta y$. That interval is non-empty precisely when $\beta < 1$.

::: proposition Present-biased reversals {#prop-reversal}
Fix $x < y$ and a delay of one period. A $\beta$–$\delta$ agent with $u(c) = c$ prefers $x$ now to $y$ tomorrow and prefers $y$ at $t+1$ to $x$ at $t$, for every $t \ge 1$, if and only if $\beta\delta y < x < \delta y$. An exponential agent never satisfies both rankings.
:::
::: proof
From date $0$ with the small reward now: $x \gtrless \beta\delta y$. From date $0$ with both rewards at $t \ge 1$ and $t+1$: $\beta\delta^t x \gtrless \beta\delta^{t+1} y$, which cancels to $x \gtrless \delta y$. Both rankings (small-sooner when immediate, large-later when delayed) hold together if and only if $\beta\delta y < x < \delta y$. If $\beta = 1$ the interval is empty.
:::

::: quiz
An agent prefers $100$ today to $110$ in $30$ days, and prefers $110$ in $120$ days to $100$ in $90$ days. This pattern
- [ ] is consistent with exponential discounting at a high enough rate
- [x] is a present-biased reversal, consistent with $\beta$–$\delta$ for $\beta < 1$ and not with any exponential $\delta$
- [ ] requires the agent to be naive
- [ ] is a violation of completeness
::: solution
Exponential discounting applies the same factor to every $30$-day step, so the ranking of $100$ versus $110$ one step later cannot depend on how far the pair is. The observed pair of rankings is exactly [[#prop-reversal]]. Naivety is about whether the agent *forecasts* the reversal, not about whether the reversal occurs; completeness is not at issue.
:::
:::

## Naivety, sophistication and commitment

A $\beta$–$\delta$ agent at date $0$ who looks at date $1$ sees a future self whose discount function, from date $1$, will again put extra weight on *that* present. If she understands this, she is **sophisticated**. If she believes, wrongly, that future selves will apply $\beta = 1$ (or will apply the date-$0$ ranking), she is **naive**. O’Donoghue and Rabin (1999, 2001) made the distinction operational, and it changes predictions for procrastination, for preproperation (doing an unpleasant thing too soon, or a pleasant thing too late), and for the demand for commitment.

::: definition Naive and sophisticated $\beta$–$\delta$ agents {#def-naive}
A **naive** $\beta$–$\delta$ agent chooses at each date as if future selves would maximise $\sum_{k=0}^{T-s} \delta^k u(c_{s+k})$ (no present bias from tomorrow on). A **sophisticated** $\beta$–$\delta$ agent chooses at each date knowing that every future self is also $\beta$–$\delta$, and plays the subgame-perfect equilibrium of the resulting game among selves. A **commitment device** is a date-$0$ constraint that removes options from a future self.
:::

Sophisticates may demand commitment: they will pay to close a tempting option, or to open a costly one, because they do not trust tomorrow’s $\beta$. Naifs will not pay for commitment they think they do not need, and they will make plans they will not keep. The two types can be separated, in principle, by offering a commitment contract and seeing who takes it — with the caveat that taking commitment is also consistent with other models (signalling, a taste for constraints, confusion).

::: example Three-period consumption, square-root utility {#ex-three}
A consumer has wealth $90$ to split over $t = 0, 1, 2$, with $u(c) = \sqrt{c}$, $\beta = 1/2$, $\delta = 1$, and no borrowing constraint other than $c_0 + c_1 + c_2 = 90$, $c_t \ge 0$. Compute (a) the long-run (exponential, $\beta = 1$) plan; (b) the naive agent’s date-$0$ *plan* and her *actual* path; (c) the sophisticate’s path. Who consumes most at $t = 0$?
::: solution
Marginal utility $u'(c) = 1/(2\sqrt{c})$.

(a) Long-run: $u'(c_t)$ equalised, so $c_0 = c_1 = c_2 = 30$.

(b) Naive plan at date $0$: she maximises $\sqrt{c_0} + \beta \sqrt{c_1} + \beta \sqrt{c_2}$ believing $c_1$ and $c_2$ will be chosen as she now wishes. FOCs: $1/(2\sqrt{c_0}) = \beta /(2\sqrt{c_1}) = \beta /(2\sqrt{c_2})$, so $\sqrt{c_1} = \beta \sqrt{c_0}$ and $c_1 = c_2 = \beta^2 c_0 = 0.25\, c_0$. Then $c_0 + 2 \times 0.25\, c_0 = 90$, $c_0 = 60$, $c_1 = c_2 = 15$. That is the plan. At date $1$ she has $30$ left and re-optimises: $\sqrt{c_1} + \beta \sqrt{c_2}$ on $c_1 + c_2 = 30$ gives $c_2 = \beta^2 c_1$, so $c_1(1+\beta^2) = 30$, $c_1 = 30/1.25 = 24$, $c_2 = 6$. Actual naive path: $(60, 24, 6)$.

(c) Sophisticate knows that at date $1$ the remaining wealth $R = 90 - c_0$ will be split as in the naive’s date-$1$ problem: $c_1 = R/(1+\beta^2)$, $c_2 = \beta^2 R/(1+\beta^2)$. She maximises $\sqrt{c_0} + \beta \sqrt{c_1} + \beta \sqrt{c_2}$ subject to that. Substituting, $\sqrt{c_1} + \sqrt{c_2} = \sqrt{R}\,\sqrt{1+\beta^2}$, so the objective is $\sqrt{c_0} + \beta \sqrt{1+\beta^2}\,\sqrt{R}$. FOC: $1/(2\sqrt{c_0}) = \beta \sqrt{1+\beta^2} /(2\sqrt{R})$, hence $R/c_0 = \beta^2 (1+\beta^2) = 0.25 \times 1.25 = 0.3125$. Then $90 - c_0 = 0.3125\, c_0$, $c_0 = 90/1.3125 = 68.571$, $R = 21.429$, $c_1 = 17.143$, $c_2 = 4.286$.

The sophisticate consumes *more* at $t = 0$ than the naif ($68.6$ against $60$), because she knows that residual wealth will be misspent by her date-$1$ self and so she grabs more now — O’Donoghue and Rabin’s “pessimism” effect. Both consume more at $t = 0$ than the long-run plan of $30$. A commitment device that locked $c_0 = c_1 = c_2 = 30$ would be valued by the sophisticate (evaluated from date $0$ with $\beta$–$\delta$ preferences, the equal path beats $(68.6, 17.1, 4.3)$) and would not be demanded by the naif, who thinks she will follow $(60, 15, 15)$ anyway.
:::
:::

The example is worth sitting with. Sophistication does not automatically undo present bias. It can make front-loading *worse*, when the only instrument is current consumption. Sophistication plus a commitment technology is a different matter: the sophisticate will use a lock, a deadline, or a penalty to implement something closer to the long-run plan. The naif will buy the gym membership and not the lock.

::: example A costly task and a pleasant reward {#ex-task}
A task has cost $6$ if done today and yields a reward of $10$ tomorrow. Linear utility, $\beta = 0.7$, $\delta = 1$. Does a $\beta$–$\delta$ agent do the task today? Does her long-run ranking ($\beta = 1$) want it done? If the cost and reward are both shifted one period into the future, what does she plan, and what does a naif do when that future date arrives?
::: solution
Today: $U(\text{do}) = -6 + \beta \cdot 10 = 1 > 0 = U(\text{skip})$, so she does it — barely. Long-run: $-6 + 10 = 4 > 0$, so the long-run ranking agrees. Shifted one period: from today, $U(\text{do tomorrow}) = \beta(-6+10) = 2.8 > 0$, so she *plans* to do it. When tomorrow arrives the comparison is again $-6 + \beta \cdot 10 = 1 > 0$, so in this calibration she still does it. To get procrastination, raise the cost to $8$: then today $-8 + 7 = -1 < 0$ (she skips), long-run $-8+10 > 0$ (she wants it), and from today looking at tomorrow $\beta(-8+10) = 1.4 > 0$ (she plans to do it). The naif therefore plans to do the $c = 8$ task tomorrow and skips again when tomorrow comes. That is O’Donoghue and Rabin’s procrastination: $\beta \Delta < c < \Delta$ with the cost now and the reward later.
:::
:::

::: example Demand for a lock {#ex-lock}
A sophisticate will have wealth $10$ tomorrow and will be tempted to spend it all; $u(c) = \sqrt{c}$, $\beta = 0.5$, $\delta = 1$, and there is a second period after tomorrow with no income. A lock can force equal splitting of the $10$ across those two future dates, at a fee of $F$ paid from the $10$. Using the date-$0$ $\beta$–$\delta$ ranking, what is the most $F$ she will pay? Would a naif pay a positive $F$?
::: solution
Without the lock, tomorrow’s self (present-biased) maximises $\sqrt{c_1} + \beta \sqrt{c_2}$ on $c_1+c_2 = 10$, so $c_2 = \beta^2 c_1 = 0.25 c_1$, $c_1 = 8$, $c_2 = 2$. Date-$0$ value: $\beta \sqrt{8} + \beta \sqrt{2} \approx 0.5 \times 2.828 + 0.5 \times 1.414 \approx 2.121$. With the lock, $c_1 = c_2 = (10-F)/2$, date-$0$ value $\beta \cdot 2 \cdot \sqrt{(10-F)/2} = \sqrt{2}\,\beta\,\sqrt{10-F} \approx 0.707 \sqrt{10-F}$. Indifference: $0.707 \sqrt{10-F} = 2.121$, $\sqrt{10-F} = 3.00$, $10-F = 9$, $F = 1$. She will pay up to $1$ of the $10$ to lock equal splitting. A naif believes tomorrow’s self will already split equally (she thinks $\beta = 1$ from tomorrow on), so the lock has no value and she will not pay $F > 0$. Commitment take-up is a sophistication test, with the caveats of the Ashraf–Karlan–Yin discussion below.
:::
:::

::: warning Sophistication is not a free lunch
A common mistake is to treat “sophisticated” as “exponential”. Sophisticates have the same $\beta < 1$ as naifs; they differ only in their forecast of future $\beta$. In a consumption problem without commitment, sophistication can raise $c_0$ (as in [[#ex-three]]). In a procrastination problem, sophistication can make the agent do the task *sooner* than a naif, because she sees that “tomorrow” will not do it either. The sign of the naivety–sophistication gap is a property of the problem, not a general law. Compute it.
:::

## Evidence

**Preference reversals and declining discount rates.** Thaler (1981) asked for the amount of money in $t$ months that would be as good as a stated amount now, and found implicit annual discount rates that fell with $t$: hundreds of per cent over days, tens of per cent over years. Frederick, Loewenstein and O’Donoghue (2002) reviewed a large laboratory literature with the same qualitative pattern and a depressing quantitative scatter — elicited annual rates from negative to several hundred per cent, sensitive to magnitude, to gain versus loss, and to the wording of the question. The reversal in [[#ex-reversal]] is robust as a *direction*; $\beta = 0.7$ is a calibration, not a constant of nature. Cohen, Ericson, Laibson and White (2020) review identification: choices among dated *money* payments are contaminated by arbitrage (a subject who can borrow at $20\%$ a year should not reveal a $100\%$ discount rate on cash), whereas choices among dated *effort* or consumption are cleaner. Augenblick, Niederle and Sprenger (2015) find present bias for effort and little for money, which is what the arbitrage critique predicts.

**Commitment in the field.** Ashraf, Karlan and Yin (2006) offered a commitment savings product, SEED, to clients of a Philippine bank: a lock-box or an account that could not be withdrawn until a goal was met. About $28\%$ of those offered the product took it, and take-up was higher among those who had shown present bias on a time-preference survey. Average savings balances rose for the treatment group. The result is a demand for commitment, which naifs in the pure O’Donoghue–Rabin sense should not have, and which sophisticates (or people with a direct taste for constraints) should. Dupas and Robinson (2013) found that simple lock-boxes raised health savings in Kenya. These are facts about the samples studied, not a recommendation to buy a lock-box.

**Fertiliser, deadlines and small transaction costs.** Duflo, Kremer and Robinson (2011) documented that many Kenyan farmers plan to buy fertiliser and do not, that a small, time-limited discount and free delivery right after harvest raises take-up substantially, and that the pattern fits present bias plus a small fixed cost better than a model of farmers who do not know that fertiliser is profitable. The intervention is a commitment-like change in the *timing* of the cost, not a lecture.

**Gym visits.** DellaVigna and Malmendier (2006) studied health-club contracts in the United States. Many members chose a monthly contract whose implied price per visit, given their actual attendance, exceeded the pay-per-visit price; they attended less than they had planned, and they delayed cancellation. A $\beta$–$\delta$ naif who overestimates future visits will overpay for a membership that she thinks she will use. The paper is about the contract choices of those members, not about whether anyone should join a gym.

**Retirement saving, as a positive fact.** Madrian and Shea (2001) and the literature that followed (Choi, Laibson, Madrian and Metrick; Carroll, Choi, Laibson, Madrian and Metrick 2009; Chetty, Friedman, Leth-Petersen, Nielsen and Olsen 2014 on Danish administrative data) find that default enrolment and default contribution rates shift saving, and that many people stay at the default. Present bias plus a small cost of opting out is *one* model that produces that pattern; inattention, in [[behavioural-economics/limited-attention]], is another; the two are not identified from the default effect alone. The numbers are described further in [[behavioural-economics/behavioural-policy]]. They are not advice about pensions.

**What is contested.** Estimates of $\beta$ from structural consumption models are sensitive to the rest of the specification (liquidity, return, $u$). Some “present bias” in money questions is survey noise, or a magnitude effect, or a lack of trust that the delayed payment will arrive (a confound that effort experiments reduce). Sophistication is hard to measure: taking a commitment product is only a noisy proxy. Laibson, Maxted and Shaw (ongoing structural work) and Augenblick and Rabin (2019) are attempts to identify $\beta$ and naivety jointly; the literature has not converged on a single $\beta$.

::: application Costly self-control as an alternative
Gul and Pesendorfer (2001) axiomatised **temptation** as a preference over *menus*: a menu that contains a tempting option is worse, even if the option is not taken, because resisting it is costly. Their agent is time-consistent in the Strotz sense and still pays to remove the temptation. The predictions overlap with sophisticated $\beta$–$\delta$ (demand for commitment) and part company with it on menus that will not be chosen from until later (a Gul–Pesendorfer agent dislikes having the temptation on the menu *now*; a $\beta$–$\delta$ sophisticate dislikes it because of what her future self will do). Both models are used; this chapter computes $\beta$–$\delta$ because it is the one that produces preference reversals of the dated-reward kind.
:::

::: history
Samuelson’s 1937 exponential formula, Strotz’s 1955–56 paper on inconsistency, and Phelps and Pollak’s 1968 intergenerational $\beta$–$\delta$ function are the prehistory. Ainslie’s work on hyperbolic discounting in animals and people, and Loewenstein and Prelec (1992), supplied the psychology. Laibson (1997) is the paper that made $\beta$–$\delta$ an equilibrium model of consumption and illiquid assets (“golden eggs”). O’Donoghue and Rabin (1999, 2001) named naifs and sophisticates and derived the comparative statics of procrastination. Thaler and Shefrin (1981) had already written a planner–doer model in the same spirit. The field evidence cited above is from the 2000s and 2010s; the identification critique on money versus effort is more recent (Cohen et al. 2020).
:::

## Where this leads

Present bias is one reason defaults work, and one reason people pay for commitment; the policy chapter ([[behavioural-economics/behavioural-policy]]) takes both up, including the ethics of using them. It is not the only reason: limited attention ([[behavioural-economics/limited-attention]]) produces similar inertia with a different welfare analysis, because an inattentive agent who would have been happy with either option is not a present-biased agent who disagrees with her future self. Social preferences ([[behavioural-economics/social-preferences]]) are a different departure, about whose payoff enters $u$, not about $D(t)$. In games, a present-biased player who is naive about her own future play is a cousin of a level-$k$ player who is naive about the opponent’s sophistication ([[behavioural-economics/behavioural-game-theory]]). The exponential model of [[microeconomics/labour-and-intertemporal-choice]] remains the right benchmark, and the right model when $\beta = 1$.

::: summary
- Exponential discounting ([[#def-exp]]) is time-consistent ([[#prop-tcons]]). Non-exponential $D(t)$ generally is not.
- Quasi-hyperbolic $\beta$–$\delta$ discounting ([[#def-bd]], [[#eq-bd]]) overweights the current period. It produces present-biased preference reversals if and only if $\beta < 1$ ([[#prop-reversal]]).
- Naifs ([[#def-naive]]) misforecast future $\beta$ and make plans they do not keep. Sophisticates forecast correctly, play a game against future selves, and may demand commitment — or may front-load even more when commitment is unavailable ([[#ex-three]]).
- Laboratory reversals are qualitatively robust and quantitatively noisy. Effort experiments identify present bias more cleanly than money experiments. Field demand for commitment, fertiliser timing, gym contracts and default enrolment are the leading applied facts.
- $\beta = 1$ recovers the standard model. $\beta$ is a parameter to be estimated, not a universal constant, and sophistication is a separate parameter.
- This chapter describes model agents and published studies. It is not personal financial advice.
:::

## Exercises

::: exercise Short-run and long-run rates {level=1 check="0.5038"}
With $\beta = 0.7$ and $\delta = 0.95$, enter the short-run discount rate $1/(\beta\delta) - 1$ to four decimal places.
::: solution
$\beta\delta = 0.665$, $1/0.665 - 1 \approx 0.5038$.
:::
:::

::: exercise No reversal at $\beta = 1$ {level=1}
With $\beta = 1$, $\delta = 0.95$ and $u(c) = c$, does $100$ now beat $110$ in one period? Does $100$ in five periods beat $110$ in six? What does [[#prop-reversal]] say about the interval $(\beta\delta \cdot 110,\, \delta \cdot 110)$?
::: solution
$0.95 \times 110 = 104.5 > 100$, so the larger-later reward wins now; it also wins when delayed, because the comparison is the same. The interval $(104.5,\, 104.5)$ is empty, so no reversal.
:::
:::

::: exercise A reversal window {level=1 check="104.5"}
With $\beta = 0.7$, $\delta = 0.95$, the upper end of the reversal window for a one-period delay against $y = 110$ is $\delta y$. Enter that number to one decimal place.
::: solution
$0.95 \times 110 = 104.5$. Combined with the lower end $\beta\delta y = 73.15$, any $x$ in $(73.15, 104.5)$ is preferred now and not preferred when delayed.
:::
:::

::: exercise Naive plan, log utility {level=2}
Wealth $90$, three periods, $u = \ln$, $\beta = 0.5$, $\delta = 1$. Compute the naive date-$0$ plan $(c_0, c_1, c_2)$ and the actual naive path. (Use $c > 0$.)
::: hint
The FOC for $\ln$ is $1/c_0 = \beta/c_1 = \beta/c_2$ at the plan; at date $1$, $1/c_1 = \beta/c_2$ on the remaining wealth.
:::
::: solution
Plan: $c_1 = c_2 = \beta c_0 = 0.5\, c_0$, so $c_0(1+1) = 90$, $c_0 = 45$, $c_1 = c_2 = 22.5$. Actual: remaining wealth $45$, $c_2 = \beta c_1$, $c_1(1+\beta) = 45$, $c_1 = 30$, $c_2 = 15$. Path $(45, 30, 15)$. (For log utility the sophisticate’s $c_0$ happens to equal the naive plan’s $c_0$, unlike the square-root case of [[#ex-three]]; the actual paths of naif and sophisticate then coincide. That is a coincidence of $u''/u'$, not a general fact.)
:::
:::

::: exercise Who front-loads more? {level=2}
In [[#ex-three]], enter the sophisticate’s $c_0$ to one decimal place, and say whether it is larger or smaller than the naif’s $c_0 = 60$.
::: solution
$90/1.3125 = 68.571\ldots$, so $68.6$ to one decimal place, larger than $60$. The sophisticate front-loads more because residual wealth will be misspent.
:::
:::

::: exercise A deadline as commitment {level=2}
A sophisticate must complete a task of cost $c = 6$ in one of the dates $t = 0, 1, 2$, and receives a reward $R = 10$ at $t = 3$ if the task is done. Period utility is linear, $\beta = 0.7$, $\delta = 1$. Doing the task at $t$ has current cost $6$ and does not affect other dates. Show that from date $0$ she would like the task done at $t = 1$ or $t = 2$ rather than at $t = 0$, and that at date $1$ she will postpone to date $2$ if allowed. What is a deadline that implements the date-$0$ ranking?
::: hint
From date $0$, cost $6$ at $t = 0$ is undiscounted; cost $6$ at $t = 1$ is weighted by $\beta$. The reward is always at $t = 3$, weighted by $\beta$.
:::
::: solution
From date $0$, $U(\text{do at } 0) = -6 + \beta \cdot 10 = -6 + 7 = 1$; $U(\text{do at } 1) = \beta(-6 + 10) = 0.7 \times 4 = 2.8$; $U(\text{do at } 2) = \beta(-6 + 10) = 2.8$. She prefers to do it later, not now. At date $1$ the comparison of “do now” versus “do at $2$” is $-6 + \beta \cdot 10 = 1$ versus $\beta(-6 + 10) = 2.8$, so she postpones. At date $2$ she does it, because $-6 + \beta \cdot 10 = 1 > 0$ (the alternative is $0$). A deadline that removes date $2$ forces her, at date $1$, to choose between doing it then ($U = 1$) and not doing it ($U = 0$); she does it at $1$, which is what date $0$ wanted among feasible non-immediate dates. A deadline that removes dates $1$ and $2$ forces her to do it at $0$, which date $0$ likes less. The useful deadline is the one that shuts the last period, not the one that shuts everything except now.
:::
:::

::: exercise Identifying $\beta$ from two choices {level=3}
An agent with $u(c) = c$ and known $\delta = 1$ prefers $10$ now to $12$ in one period, and prefers $12$ in two periods to $10$ in one period. Give the interval in which $\beta$ must lie. If in addition she is indifferent between $10$ now and $14$ in one period, what is $\beta$?
::: hint
The now-versus-later ranking is $10 \ge 12\beta$. With $\delta = 1$, the delayed ranking is $12 \ge 10$.
:::
::: solution
Now versus one period: $10 > 12\beta$ so $\beta < 10/12 \approx 0.833$. Delayed (both future, $\delta = 1$): $12 > 10$, which holds independently of $\beta$ and so does not restrict $\beta$. The second ranking in the question is $12$ at $t = 2$ versus $10$ at $t = 1$, both future, so $\beta \delta^2 \cdot 12$ versus $\beta \delta \cdot 10$, i.e. $12 > 10$ given $\delta = 1$. It confirms present-bias *directionally* (the ranking flips) but with $\delta = 1$ the delayed ranking is just $y > x$, always true. The interval is $\beta \in (0, 10/12)$. Indifference of $10$ now and $14$ in one period: $10 = 14\beta$, $\beta = 10/14 \approx 0.714$, which lies in the interval. (If $\delta$ were unknown as well, two indifferences would be needed to separate $\beta$ and $\delta$.)
:::
:::

::: exercise Money versus effort {level=3}
Explain, in a short paragraph, why a subject who discounts *cash* at $100\%$ a year between today and tomorrow, while a bank in her town offers a $20\%$ overdraft, is hard to interpret as $\beta$–$\delta$ on consumption, and why replacing the cash with a dated effort task (Augenblick, Niederle and Sprenger 2015) addresses the problem. Then say what confound remains.
::: solution
If cash can be moved across time at $20\%$ by borrowing or saving, a $100\%$ revealed discount rate on cash is not a consumption preference: the subject could take the later cash, borrow against it, and pocket the spread, or is revealing mistrust, transaction costs, or confusion rather than $\beta$. Dated effort cannot be arbitraged with a bank: an hour of work tomorrow is not payable by overdraft. Present bias on effort is therefore closer to $\beta$ on $u(c)$ (here $c$ is leisure or avoided effort). The remaining confound is that effort at different dates may not be the same good (fatigue, calendar shocks), so a preference for delaying effort can be a prediction about the *state* tomorrow rather than about $\beta$. Randomising the date of the experimental session and using real-effort tasks with a known, short duration are the usual responses; they reduce the confound, they do not eliminate it.
:::
:::

::: exercise Commitment take-up {level=2}
In a stylised Ashraf–Karlan–Yin design, $28\%$ of those offered a locked account take it. Under a strict O’Donoghue–Rabin classification, which type takes the lock, which type does not, and what else must be true of the type that takes it? Why is $28\%$ not an estimate of the population share of sophisticates?
::: solution
Sophisticates who expect a future self to overspend, *and* who value the lock enough to cover any cost or stigma of taking it, take the lock. Naifs, who expect future selves to behave, do not. Exponential agents ($\beta = 1$) have no demand for the lock either, unless they have some other motive. The $28\%$ is take-up, not a type share: some sophisticates may find the lock too costly or the overspending problem small; some naifs may take the lock for other reasons (a taste for constraints, a gift to a spouse, confusion); some exponential agents may take it as a household-bargaining tool. Take-up is evidence that *some* demand for commitment exists, which is what the paper claims, not a census of $\beta$ and naivety.
:::
:::
