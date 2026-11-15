A seller values a house at $40$ (in thousands of units of money) and a buyer values it at $70$. If they trade at a price $p$, the seller's gain is $p - 40$ and the buyer's is $70 - p$. Any $p$ in $[40, 70]$ is mutually beneficial; the **surplus** of $30$ must be split. Who gets how much?

Two traditions answer. The **Nash bargaining solution** (Nash 1950) picks a split from axioms — Pareto efficiency, symmetry, invariance to affine payoff transformations, and independence of irrelevant alternatives — without specifying a protocol. **Rubinstein's alternating-offer model** (1982) specifies a protocol: the parties take turns proposing, delay is costly, and the unique subgame-perfect equilibrium splits the surplus according to impatience and the first-mover advantage. When the time between offers is short, the Rubinstein split approaches the Nash solution. The two traditions are cousins, not rivals.

This chapter is for education. The numbers are illustrative; they are not a forecast of house prices and not advice on how to bargain. Real bargaining involves incomplete information, outside options, deadlines and lawyers, all of which change the game.

## The Nash demand game

Two players simultaneously demand shares $x_1, x_2 \ge 0$ of a pie of size $1$. If $x_1 + x_2 \le 1$, each gets their demand; if $x_1 + x_2 > 1$, each gets $0$ (disagreement).

::: proposition Nash demand equilibria {#prop-nash-demand}
Every pair $(x_1, x_2)$ with $x_1 + x_2 = 1$ and $x_i \ge 0$ is a pure-strategy Nash equilibrium of the Nash demand game. The pair $(1, 1)$, which yields $(0, 0)$, is also a Nash equilibrium. No profile with $x_1 + x_2 < 1$ is an equilibrium: at least one player could demand more and still be compatible.
:::
::: proof
If $x_1 + x_2 = 1$ and player 1 unilaterally raises the demand, the sum exceeds $1$ and player 1 gets $0$ rather than $x_1 \ge 0$. Lowering the demand yields a strictly smaller payoff. So no profitable deviation exists. If $x_1 = x_2 = 1$, any unilateral change still sums to more than $1$ (or, if a player demands less than $0$, that is not feasible), so both still get $0$; nobody can profitably deviate. If $x_1 + x_2 < 1$, player 1 can demand $1 - x_2 > x_1$ and get it. Hence every efficient split, and the disastrous $(1, 1)$, are equilibria, and nothing in between is.
:::

The demand game has a continuum of equilibria, including a terrible one. Nash equilibrium, on its own, does not pick a split. That is why Nash offered a *cooperative* solution concept, and why Rubinstein offered a protocol whose SPE does pick one.

::: example A house, demanded {#ex-house-demand}
The seller demands a gain $s \ge 0$ and the buyer a gain $b \ge 0$, compatible if $s + b \le 30$. Find two Nash equilibria with trade and one without. What is the seller's price in the equilibrium $(s, b) = (10, 20)$?
::: solution
Any $(s, b)$ with $s + b = 30$ is an equilibrium with trade: $(0, 30)$, $(15, 15)$, $(30, 0)$, $(10, 20)$. The profile $(30, 30)$ (each demanding the whole surplus) is an equilibrium without trade. At $(10, 20)$ the seller's gain is $10$, so $p - 40 = 10$ and $p = 50$. The buyer pays $50$ for a house worth $70$.
:::
:::

## The Nash bargaining solution

Let the feasible payoff set $F \subset \R^2$ be compact and convex, and let $d = (d_1, d_2) \in F$ be the **disagreement point**. The players can agree on any $u \in F$ with $u \ge d$ (componentwise), or disagree and get $d$.

::: definition Nash bargaining solution {#def-nash-bargaining}
The **Nash bargaining solution** of $(F, d)$ is

$$
u^N = \arg\max_{u \in F,\, u \ge d} \ (u_1 - d_1)(u_2 - d_2),
$$

the maximiser of the **Nash product**. If $F$ is convex and there exists $u \in F$ with $u > d$, the maximiser is unique.
:::

::: theorem Nash's axioms {#thm-nash-axioms}
The Nash bargaining solution is the unique map from bargaining problems $(F, d)$ to outcomes in $F$ that satisfies

1. **Pareto efficiency:** $u^N$ is weakly Pareto efficient in $F$.
2. **Symmetry:** if $F$ is symmetric and $d_1 = d_2$, then $u_1^N = u_2^N$.
3. **Invariance to affine transformations:** applying $u_i \mapsto \alpha_i u_i + \beta_i$ with $\alpha_i > 0$ to payoffs, $d$ and $F$ applies the same transformation to $u^N$.
4. **Independence of irrelevant alternatives (IIA):** if $u^N$ solves $(F, d)$ and $u^N \in F' \subset F$ with $d \in F'$, then $u^N$ solves $(F', d)$.

Assumptions: $F$ compact, convex, and comprehensive in the usual sense; $d \in F$.
:::
::: proof
Sketch of uniqueness. Affine invariance lets us normalise $d = (0, 0)$ and $u^N = (1, 1)$ for a given problem. IIA and efficiency then imply that $F$ cannot contain a point with Nash product above $1$, so $u^N$ maximises the product. Symmetry pins down the equal-split when the problem is symmetric. Existence of a maximiser is compactness. Convexity gives uniqueness of the maximiser (the Nash product is strictly quasiconcave on $u > d$).
:::

Kalai and Smorodinsky (1975) replaced IIA with a monotonicity axiom and obtained a different solution, which equalises the players' *fractions of their utopia payoffs*. The Nash solution remains the default in applications, in part because it is the limit of the non-cooperative Rubinstein model.

::: example Splitting a pie {#ex-nash-pie}
$F = \{(u_1, u_2) : u_1 \ge 0,\ u_2 \ge 0,\ u_1 + u_2 \le 1\}$, $d = (0, 0)$. Find $u^N$. If instead $d = (0.2, 0)$, what is $u^N$?
::: solution
Maximise $u_1 u_2$ subject to $u_1 + u_2 = 1$ (efficiency). Then $u_1(1-u_1)$ is maximised at $u_1 = 1/2$. So $u^N = (1/2, 1/2)$.

With $d = (0.2, 0)$, maximise $(u_1 - 0.2) u_2$ on $u_1 + u_2 = 1$, $u_1 \ge 0.2$. Let $u_2 = 1 - u_1$, $f(u_1) = (u_1 - 0.2)(1 - u_1)$. FOC: $1 - u_1 - (u_1 - 0.2) = 0$, so $1.2 = 2u_1$, $u_1 = 0.6$, $u_2 = 0.4$. The seller (player 1) with a better outside option gets more than half. In general, with a linear frontier $u_1 + u_2 = 1$, the Nash solution is

$$
u_i^N = d_i + \tfrac12 \bigl(1 - d_1 - d_2\bigr):
$$

the disagreement payoffs are paid first, and the remaining surplus is split equally.
:::
:::

::: widget contour
f: (x - 0.2)*y
x: 0, 1
y: 0, 1
constraint: x + y - 1
point: 0.6, 0.4
levels: 10
gradient: true
caption: Nash product $(u_1-0.2)u_2$ with disagreement $d = (0.2, 0)$ and frontier $u_1 + u_2 = 1$. The constraint curve is the pie. Drag the point along the frontier: the Nash solution $(0.6, 0.4)$ is where a level curve of the product is tangent to the frontier. The gradient of the product is then normal to $u_1 + u_2 = 1$.
:::

::: example Unequal bargaining weights {#ex-asymmetric-nash}
The **asymmetric Nash solution** maximises $(u_1 - d_1)^{\alpha} (u_2 - d_2)^{1-\alpha}$ for a weight $\alpha \in (0, 1)$. With $F$ the unit pie and $d = (0, 0)$, show that $u_1^N = \alpha$. Interpret $\alpha$.
::: solution
Maximise $u_1^{\alpha} (1-u_1)^{1-\alpha}$. Logarithmic derivative: $\alpha/u_1 - (1-\alpha)/(1-u_1) = 0$, so $\alpha(1-u_1) = (1-\alpha) u_1$, hence $u_1 = \alpha$. The weight $\alpha$ is player 1's share. It will equal player 1's share of *patience* in the Rubinstein model, which is the non-cooperative foundation of $\alpha$.
:::
:::

## Rubinstein's alternating offers

Time is $t = 0, 1, 2, \dots$. In even periods player 1 proposes a split $(x, 1-x)$ of a pie of size $1$; player 2 accepts or rejects. In odd periods the roles reverse. After a rejection the pie shrinks by delay: payoffs are discounted by $\delta_i \in (0, 1)$ per period for player $i$. If an offer $x$ (player 1's share) is accepted at date $t$, payoffs are $(\delta_1^t x,\ \delta_2^t (1-x))$. Perpetual disagreement pays $0$.

::: theorem Rubinstein SPE {#thm-rubinstein}
The alternating-offer game has a unique subgame-perfect equilibrium. Player 1 offers, and player 2 accepts,

$$
x^* = \frac{1 - \delta_2}{1 - \delta_1 \delta_2},
$$ {#eq-rubinstein}

and player 2 offers, and player 1 accepts, $y^* = \delta_1 x^*$ (player 1's share when player 2 proposes). On the equilibrium path, player 1's first offer is accepted immediately. If $\delta_1 = \delta_2 = \delta$, then $x^* = 1/(1+\delta)$ and player 2 receives $\delta/(1+\delta)$.
:::
::: proof
Sketch. In any SPE, a player who is indifferent between accepting and rejecting an offer accepts (otherwise the proposer would have to offer strictly more). Let $v_i$ be player $i$'s SPE payoff in a subgame where $i$ proposes, and $w_i$ the payoff in a subgame where the other proposes. Stationarity of the infinite horizon, plus uniqueness arguments that rule out delay, give

$$
1 - x^* = \delta_2 v_2,\qquad 1 - y^* = \delta_1 v_1,
$$

with $v_1 = x^*$ and $v_2 = 1 - y^*$ (the proposer takes the rest). Solving, $1 - x^* = \delta_2 (1 - y^*) = \delta_2 \delta_1 x^*$, so $x^* = (1-\delta_2)/(1-\delta_1\delta_2)$. Uniqueness uses the fact that the highest and lowest SPE payoffs for a proposer must coincide, by the same indifference. Immediate acceptance: offering $x^*$ leaves the responder indifferent, and offering less is rejected, which cannot help the proposer.
:::

The formula is worth sitting with.

- **Impatience hurts.** If $\delta_2$ falls, $x^*$ rises: a more impatient player 2 accepts a worse offer. If $\delta_1$ falls, $x^*$ falls.
- **First-mover advantage.** With equal discounting, $x^* = 1/(1+\delta) > 1/2$ because $\delta < 1$. Player 1 proposes now; player 2 must wait a period to counter.
- **The advantage vanishes as offers become frequent.** Let $\delta = e^{-r\Delta}$ with period length $\Delta \to 0$ and interest rate $r$. Then $x^* \to 1/2$. The asymmetric-weight Nash solution with $\alpha = r_2 / (r_1 + r_2)$ is the same limit when discount rates differ (Binmore, Rubinstein and Wolinsky 1986).

::: example Equal patience {#ex-rubinstein-equal}
$\delta_1 = \delta_2 = 0.9$. Compute the SPE shares. How long would player 2 wait, in periods, to get as much as player 1 gets today, if delay were the only difference? Why is that the wrong comparison?
::: solution
$x^* = 1/1.9 \approx 0.526$, so player 1 gets $0.526$ and player 2 gets $0.474$, immediately. The first-mover advantage is $0.026$, about one-twentieth of the pie. Player 2's discounted value of receiving $0.526$ *next* period is $0.9 \times 0.526 = 0.474$, which is exactly player 2's SPE payoff: the responder is indifferent between accepting $0.474$ now and rejecting, becoming the proposer next period, and getting $0.526$ then. That indifference *is* the comparison; waiting to "get as much as player 1" is already priced into $x^*$.
:::
:::

::: example Asymmetric patience {#ex-rubinstein-asymm}
$\delta_1 = 0.8$, $\delta_2 = 0.9$. Compute $x^*$ and player 2's share. Who is more patient, and who gets more?
::: solution
$x^* = (1-0.9)/(1-0.8\cdot 0.9) = 0.1 / (1-0.72) = 0.1/0.28 = 5/14 \approx 0.357$. Player 2's share is $9/14 \approx 0.643$. Player 2 is more patient ($\delta_2 > \delta_1$) and gets more, *despite* moving second. Patience outweighs the first-mover advantage at these numbers. Check: $y^* = \delta_1 x^* = 0.8 \times 5/14 = 4/14 \approx 0.286$ is player 1's share when player 2 proposes, so player 2 then offers $0.286$ to player 1 and keeps $0.714$, and player 1 is indifferent because $\delta_1 x^* = 0.286$.
:::
:::

::: widget plot
f: 1/(1+x); x/(1+x)
x: 0.5, 0.99
y: 0.4, 0.7
labels: \text{player 1 share } 1/(1+\delta); \text{player 2 share } \delta/(1+\delta)
caption: Rubinstein SPE shares when $\delta_1 = \delta_2 = \delta$. Horizontal axis: $\delta$. As $\delta$ rises toward $1$, the two shares meet at $1/2$: frequent offers kill the first-mover advantage. At $\delta = 0.9$ the split is about $0.526 : 0.474$. Hover to read values.
:::

::: warning Discounting is not a preference for fairness
The Rubinstein split $1:(1+\delta)$ is not a fairness norm. It is the unique SPE of a particular protocol with a particular cost of delay. Change the protocol — simultaneous offers, a deadline, a risk of breakdown rather than discounting — and the split changes. The Nash product, by contrast, does not name a protocol; it names axioms. Connecting them requires a limit argument (Binmore–Rubinstein–Wolinsky), not a claim that people "should" split fifty-fifty.
:::

::: quiz
In Rubinstein's model with $\delta_1 = \delta_2 = \delta \to 1$, the first-mover's share
- [ ] tends to $1$, because a patient proposer can wait the opponent out
- [x] tends to $1/2$, because the first-mover advantage is one period, which becomes short
- [ ] remains $1/(1+\delta)$ with $\delta$ fixed at $1$, which is undefined
- [ ] tends to $0$, because the responder can always reject
::: solution
$x^* = 1/(1+\delta) \to 1/2$ as $\delta \to 1$. Patience on *both* sides shrinks the cost of a one-period delay, which is the source of the first-mover advantage. A proposer who is patient while the responder is not ($\delta_1 \to 1$, $\delta_2$ fixed) *does* capture almost the whole pie: $x^* = (1-\delta_2)/(1-\delta_1\delta_2) \to 1$. Both must be patient for the split to even out.
:::
:::

## Outside options and breakdown

If a player can take an outside option $d_i$ *instead of* continuing to bargain, two cases arise (Binmore, Shaked and Sutton 1989). If $d_i$ is less than the Rubinstein share without the option, the option is irrelevant: the SPE is unchanged. If $d_i$ exceeds that share, the SPE share jumps to $d_i$ (plus a vanishing first-mover crumb). Outside options act as a *constraint*, not as a disagreement point inside the Nash product — unless the option is what happens when bargaining *breaks down* (a random termination), in which case $d$ *is* the Nash disagreement point. The distinction between "I can walk away to a job" and "the pie disappears with probability $1-\delta$" is the difference between an outside option and a disagreement point. Applications that plug a wage elsewhere into $d$ without stating the protocol are mixing the two.

## Evidence

**Laboratory alternating offers.** Binmore, Shaked and Sutton (1985, *American Economic Review*) found second-period play close to the SPE of a two-period shrinking-pie game, after subjects had gained experience; first-period offers were more generous than SPE, consistent with fairness residuals from the ultimatum game. Subsequent work (a survey is in Roth, *Handbook of Experimental Economics*, 1995) finds that finite-horizon shrinking-pie games move toward SPE with experience and with a larger pie, but never all the way in short sessions.

**Field bargaining.** Wages, house prices and legal settlements are not clean tests: information is incomplete, the protocol is not Rubinstein's, and disagreement payoffs are hard to measure. The qualitative comparative statics — more patient parties, and parties with better outside options, get more — are consistent with a wide range of evidence, and also with many other models. The theory organises the comparative statics; it does not estimate a house price.

## Where this leads

Bargaining with incomplete information — a seller who does not know the buyer's value — produces delay in equilibrium and is a leading application of [[game-theory/signalling]] and [[information-economics]]. Mechanism design asks whether a designer can do better than bilateral bargaining (Myerson and Satterthwaite 1983: not, if both sides have hidden values and trade is voluntary). Repeated interaction, in which today's split affects tomorrow's, is [[game-theory/repeated-games]]. Applied wage bargaining and Nash-in-Nash models of intermediaries are taken up in labour and industrial organisation.

::: history
John Nash's "The Bargaining Problem" (*Econometrica*, 1950) introduced the axioms and the Nash product; the Nash demand game is in his 1953 *Econometrica* paper. Ariel Rubinstein's "Perfect equilibrium in a bargaining model" (*Econometrica*, 1982) gave the unique SPE of alternating offers. Ken Binmore, Ariel Rubinstein and Asher Wolinsky (1986, *Rand Journal of Economics*) connected the two as the period length goes to zero. Binmore, Shaked and Sutton (1989) clarified outside options versus disagreement points. The Kalai–Smorodinsky solution (1975) is the best-known axiomatic alternative. Stahl (1972) had solved the *finite*-horizon alternating-offer game; Rubinstein's contribution was the infinite horizon, where unravelling does not pick the last mover.
:::

::: summary
- The Nash demand game has a continuum of equilibria, one for every split of the pie, plus a disagreement equilibrium ([[#prop-nash-demand]]). Nash equilibrium does not select a split.
- The Nash bargaining solution maximises the product of gains over disagreement ([[#def-nash-bargaining]]). It is the unique solution satisfying efficiency, symmetry, affine invariance and IIA ([[#thm-nash-axioms]]). With a linear frontier, remaining surplus is split equally after paying $d$.
- Rubinstein's alternating-offer game has a unique SPE: the proposer offers $x^* = (1-\delta_2)/(1-\delta_1\delta_2)$, which is accepted immediately ([[#thm-rubinstein]]). Impatience hurts; the first-mover advantage vanishes as $\delta \to 1$.
- The Rubinstein split converges to an (asymmetric) Nash solution as offers become frequent.
- Outside options bind only when they exceed the Rubinstein share; they are not automatically the disagreement point $d$.
:::

## Exercises

::: exercise Equal split {level=1 check="1/2"}
Pie of size $1$, $d = (0, 0)$, Nash solution. What is player 1's share? (Enter a fraction.)
::: solution
$u_1^N = 1/2$, by symmetry or by maximising $u_1(1-u_1)$.
:::
:::

::: exercise A disagreement point {level=1 check="0.7"}
Pie of size $1$, $d = (0.4, 0)$. Find player 1's Nash share. (Enter a decimal, for example 0.7.)
::: solution
Remaining surplus $0.6$, split equally, so player 1 gets $0.4 + 0.3 = 0.7$. FOC: maximise $(u_1-0.4)(1-u_1)$; $1-u_1 - (u_1-0.4) = 0$, $1.4 = 2u_1$, $u_1 = 0.7$.
:::
:::

::: exercise Rubinstein, equal $\delta$ {level=1 check="0.625"}
$\delta = 0.6$ for both. Find player 1's SPE share to three decimals. (Enter 0.625 if that is the value.)
::: solution
$x^* = 1/(1+0.6) = 1/1.6 = 0.625$. Player 2 gets $0.375$. First-mover advantage is larger than at $\delta = 0.9$ because delay is more costly.
:::
:::

::: exercise House surplus {level=2}
Seller values at $40$, buyer at $70$, disagreement is no trade (gains of $0$). Using the Nash solution on *gains*, find the price. If the seller has an outside offer of $46$ (a gain of $6$ relative to $40$), what is the new Nash price?
::: solution
Gains sum to $30$, $d = (0, 0)$, equal split of $15$ each. Price $p = 40 + 15 = 55$. With an outside option treated as disagreement $d_s = 6$, $d_b = 0$, remaining surplus $24$, split $12$ each: seller's gain $18$, price $p = 58$. (Whether the outside offer *should* enter as $d$ depends on the protocol, as the text warns.)
:::
:::

::: exercise Asymmetric Nash {level=2 check="2/3"}
Maximise $u_1^{2} u_2$ on $u_1 + u_2 = 1$, $u_i \ge 0$. What is $u_1$? (Enter a fraction.)
::: solution
This is $\alpha = 2/3$ in [[#ex-asymmetric-nash]], because $(u_1-d_1)^{\alpha}(u_2-d_2)^{1-\alpha}$ with $\alpha = 2/3$ is $u_1^{2/3} u_2^{1/3}$, which is *not* $u_1^2 u_2$. For $u_1^2 u_2 = u_1^2 (1-u_1)$, take log derivative $2/u_1 - 1/(1-u_1) = 0$, so $2(1-u_1) = u_1$, $2 = 3u_1$, $u_1 = 2/3$. Yes: the exponents $2$ and $1$ sum to $3$, and the share is $2/3$. The general rule: maximising $u_1^{a} u_2^{b}$ on the unit pie gives $u_1 = a/(a+b)$.
:::
:::

::: exercise Rubinstein comparative statics {level=2}
In [[#eq-rubinstein]], show that $\partial x^*/\partial \delta_2 < 0$ and $\partial x^*/\partial \delta_1 > 0$. Interpret in a sentence each.
::: solution
$x^* = (1-\delta_2)/(1-\delta_1\delta_2)$. Let $N = 1-\delta_2$, $D = 1-\delta_1\delta_2$. Then $\partial x^*/\partial \delta_2 = \bigl(-D - N(-\delta_1)\bigr)/D^2 = (-\,D + N\delta_1)/D^2 = \bigl(-(1-\delta_1\delta_2) + (1-\delta_2)\delta_1\bigr)/D^2 = (-1 + \delta_1\delta_2 + \delta_1 - \delta_1\delta_2)/D^2 = (\delta_1 - 1)/D^2 < 0$. And $\partial x^*/\partial \delta_1 = N \cdot \delta_2 / D^2 > 0$. More patient responders (higher $\delta_2$) capture more of the pie; more patient proposers (higher $\delta_1$) capture more.
:::
:::

::: exercise Two-period shrinking pie {level=3}
A pie of size $1$ is offered by player 1 in period $0$. If rejected, player 2 offers in period $1$ to split a pie of size $\delta < 1$, and if that is rejected both get $0$. Find the unique SPE. Compare player 1's share with $1/(1+\delta)$.
::: hint
Start in period $1$: player 2 offers player 1 zero (or $\eps$), which player 1 accepts. Fold back.
:::
::: solution
Period $1$: player 2 proposes, player 1 accepts any $x \ge 0$, so player 2 offers $0$ to player 1 and keeps $\delta$ (in period-1 units), worth $\delta$ to player 2 in period-0 units and $0$ to player 1. Period $0$: player 1 must offer player 2 at least $\delta$ (player 2's continuation), so player 1 offers $x = 1-\delta$ to *self* and $\delta$ to player 2, which is accepted. SPE shares: $(1-\delta,\ \delta)$. Compare with infinite-horizon $1/(1+\delta)$: $1-\delta$ versus $1/(1+\delta)$. For $\delta = 0.9$, $1-\delta = 0.1$ and $1/(1+\delta) \approx 0.526$. The finite-horizon last-mover (player 2) has enormous power when $\delta$ is close to $1$; the infinite horizon removes that last-mover advantage and replaces it with a small first-mover advantage. Stahl (1972) versus Rubinstein (1982) is this comparison.
:::
:::

::: exercise Demand game, two-point mixture {level=3}
In the Nash demand game on a pie of size $1$, suppose each player randomises over $\{1/3, 2/3\}$. Find the probability $p$ of playing $1/3$ that makes the other player indifferent, and the expected payoff. Why does this not solve the selection problem that the Nash *solution* addresses?
::: hint
Demands $1/3$ and $1/3$ are compatible; $1/3$ and $2/3$ are compatible; $2/3$ and $2/3$ are not.
:::
::: solution
Payoff of demanding $1/3$: always compatible, payoff $1/3$. Payoff of demanding $2/3$: compatible only if the opponent plays $1/3$, hence $p \cdot (2/3)$. Indifference: $1/3 = (2/3)p$, so $p = 1/2$. Expected payoff $1/3$. Any $a \in (0, 1/2)$ supports a similar equilibrium on $\{a, 1-a\}$ with $p = a/(1-a)$. The demand game therefore has a continuum of mixed equilibria as well as a continuum of pure ones. Multiplicity is the problem; computing one more equilibrium does not select the split. The Nash product and the Rubinstein SPE are selection devices, not additional equilibria of the demand game.
:::
:::
