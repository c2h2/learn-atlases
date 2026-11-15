A government auctions a timber concession. Each bidder knows how much the tract is worth *to them*, from their own survey, and does not know the others' surveys. A bid that would be optimal against a known rival bid is not optimal against a rival whose bid depends on a hidden value. The right object is a **bidding function**: a bid for each possible own value.

Harsanyi (1967–68) showed how to write this as a game. Nature draws a **type** for each player from a commonly known distribution; each player observes only their own type; then they choose actions. A **Bayesian Nash equilibrium** (BNE) is a Nash equilibrium of this expanded game: each type of each player maximises expected payoff, given the others' type-contingent strategies and the prior. This chapter defines the framework, computes BNE in a simple $2\times 2$ example and in a first-price auction with independent private values, and looks at a public-good contribution with hidden values. Mechanism design and optimal auctions are [[market-design]]; here the auction format is given.

The numbers are illustrative. They are not a forecast of auction revenue and not advice on how to bid.

## Types, beliefs and the Harsanyi transformation

::: definition Bayesian game {#def-bayesian}
A **Bayesian game** consists of

1. a set of players $N$;
2. for each $i$, a set of **types** $\Theta_i$, a set of actions $A_i$, and a payoff $u_i(a, \theta)$ that may depend on the whole type profile $\theta = (\theta_i, \theta_{-i})$;
3. a **common prior** $P$ on $\Theta = \prod_i \Theta_i$.

Player $i$ observes $\theta_i$ and holds the conditional belief $P(\theta_{-i} \mid \theta_i)$. A **strategy** is a map $\sigma_i \colon \Theta_i \to \Delta(A_i)$: an action (or mixture) for each type. Payoffs are expected utilities given $P$ and the others' strategies.
:::

The common-prior assumption is substantive: players may disagree because they have different information, not because they started with different world-views. Without it, existence and the connection to complete-information games both suffer. Harsanyi's *doctrine* is that any residual disagreement should be written as different types, with a prior over those types.

::: definition Bayesian Nash equilibrium {#def-bne}
A strategy profile $\sigma^*$ is a **Bayesian Nash equilibrium** if for every player $i$ and every type $\theta_i$ that has positive probability,

$$
\sigma_i^*(\theta_i) \in \arg\max_{a_i \in A_i} \ \E\bigl[ u_i\bigl(a_i, \sigma_{-i}^*(\theta_{-i}), \theta\bigr) \bigm| \theta_i \bigr].
$$

Each type of each player best-responds to the others' *strategies*, not to a realised action. Equivalently, $\sigma^*$ is a Nash equilibrium of the strategic-form game in which a player is a type, with payoffs weighted by $P$.
:::

If $\Theta$ is a singleton, BNE is Nash equilibrium. Mixed-strategy Nash equilibrium of a complete-information game can be read as a degenerate Bayesian game in which each player has a tiny payoff perturbation — Harsanyi's **purification**, mentioned in [[game-theory/mixed-strategies]].

::: example A meeting game with a hidden preference {#ex-bayes-meeting}
Player 1 (row) may be type Opera or type Match, each with probability $1/2$, and the type is 1's private information. Player 2 has only one type. Payoffs, with player 1's type written as the first matrix then the second:

Type Opera:

|  | Opera | Match |
|---|---|---|
| Opera | $2, 1$ | $0, 0$ |
| Match | $0, 0$ | $1, 2$ |

Type Match: swap player 1's payoffs — meeting at Match pays player 1 a $2$, meeting at Opera a $1$. Player 2's payoffs are unchanged: $1$ for Opera, $2$ for Match, $0$ for mismatch. (So player 2 always prefers Match if they meet.) Find a BNE in which player 1 plays their preferred venue for sure.
::: solution
Player 1 of type Opera has a dominant action Opera if we look only at matching payoffs... not dominant, but in the proposed BNE player 1 plays Opera when type Opera and Match when type Match. Player 2 then faces Opera with probability $1/2$ and Match with probability $1/2$. Expected payoff of Opera: $\tfrac12 \cdot 1 + \tfrac12 \cdot 0 = 1/2$. Of Match: $\tfrac12 \cdot 0 + \tfrac12 \cdot 2 = 1$. So player 2's unique best response is Match.

Given that player 2 plays Match, player 1 of type Opera gets $0$ from Opera and $1$ from Match, so *deviates* to Match. The proposed profile is not a BNE: player 1 of type Opera would match player 2 at Match rather than go to Opera alone.

A BNE: player 1 of *both* types plays Match, and player 2 plays Match. Type Opera gets $1$ (the worse meeting) rather than $0$; type Match gets $2$; player 2 gets $2$. No type wants to deviate to Opera, which would mismatch. This is the inefficient pooling equilibrium: the Opera type gives up their preferred venue because player 2, not observing the type, goes to Match. There is no equilibrium in which player 2 plays Opera, because player 2 prefers Match whenever the probability of type Match is at least $1/3$. With prior $1/2$, player 2 always plays Match in a pure BNE.
:::
:::

The example is a warning: incomplete information can destroy a complete-information equilibrium (Opera, Opera) that would have been Nash if player 1's type were known to be Opera.

## Cournot with unknown cost

::: example One-sided cost uncertainty {#ex-bayes-cournot}
Inverse demand $P = 12 - Q$. Firm 1 has $c_1 = 0$, observed. Firm 2 has $c_2 = 0$ or $c_2 = 6$ with equal probability, observed only by firm 2. Simultaneous quantities. Find a BNE in linear strategies: firm 2 of each type chooses a quantity, firm 1 chooses a single quantity.
::: solution
Firm 2 of type $c$, facing $q_1$, best-responds with $q_2(c) = (12 - c - q_1)/2$, as in Cournot, provided this is positive. Firm 1 maximises expected profit:

$$
\pi_1 = q_1 \bigl(12 - q_1 - \E[q_2] \bigr),
$$

so $q_1 = \bigl(12 - \E[q_2]\bigr)/2$. Let $q_L = (12 - q_1)/2$ for the low-cost type and $q_H = (6 - q_1)/2$ for the high-cost type. Then $\E[q_2] = (q_L + q_H)/2 = (18 - 2q_1)/4 = (9 - q_1)/2$. Hence $q_1 = \bigl(12 - (9-q_1)/2\bigr)/2$. Multiply: $2q_1 = 12 - 4.5 + q_1/2$, so $(3/2)q_1 = 7.5$, $q_1 = 5$. Then $q_L = (12-5)/2 = 3.5$, $q_H = (6-5)/2 = 0.5$. Expected $q_2 = 2$. Price is $12 - 5 - 3.5 = 3.5$ if firm 2 is low-cost, and $12-5-0.5 = 6.5$ if high-cost.

Check firm 1's FOC: $\E[q_2] = 2$, $q_1 = (12-2)/2 = 5$. Check both types of firm 2 are interior. The BNE is $q_1 = 5$, $q_2(0) = 3.5$, $q_2(6) = 0.5$. Firm 1 produces more than Cournot-with-$c_2=0$ would have firm 1 produce against a known low-cost rival (that would be the asymmetric Cournot with $c_2=0$, $q_1 = 4$), and less than against a known high-cost rival. Incomplete information *averages* the two complete-information Cournot games, but not in quantities linearly in a naive way: firm 1 plays a best response to the *average* $q_2$, while each type of firm 2 best-responds to that single $q_1$.
:::
:::

::: widget plot
f: (12-x)/2; (6-x)/2; 12-2*x
x: 0, 12
y: 0, 8
labels: \text{low-cost BR of firm 2}; \text{high-cost BR of firm 2}; \text{firm 1 Cournot BR vs a known } q_2
points: 5,3.5; 5,0.5
caption: Firm 2's two best-response lines (low cost flatter-intercept $6$, high cost intercept $3$). Firm 1 chooses one $q_1$ (here $5$), and the two types of firm 2 sit on their own BR lines at that $q_1$: the marked points $(5, 3.5)$ and $(5, 0.5)$. Firm 1 is responding to the average of those two $q_2$ values, not to either one.
:::

The third function 12-2*x is firm 1's BR written as q2 in terms of q1? Firm 1 BR: q1 = (12-q2)/2 so q2 = 12-2 q1. Yes. At q1=5, that would say q2=2, which is exactly E[q2]. Nice - the third line through (5,2) isn't marked but the idea is there. Maybe add point 5,2. Optional.

## First-price auctions

$n$ bidders. Bidder $i$'s value $v_i$ is drawn independently from a distribution $F$ on $[0, 1]$, observed only by $i$. The highest bidder wins and pays their own bid; ties are broken uniformly. Payoff is $v_i - b_i$ if $i$ wins and $0$ otherwise. This is a Bayesian game with types $v_i$ and actions $b_i \ge 0$.

::: proposition Symmetric IPV first-price equilibrium {#prop-fp}
If $F$ is uniform on $[0, 1]$ and $n = 2$, there is a symmetric BNE in which a bidder of value $v$ bids

$$
b(v) = \frac{v}{2}.
$$ {#eq-fp}

For general $n$ and uniform $[0, 1]$, $b(v) = \dfrac{n-1}{n} v$. Assumptions: independent private values, risk neutrality, no reserve price, symmetric priors, payment equal to own bid.
:::
::: proof
Guess a symmetric increasing differentiable equilibrium $b(\cdot)$, with inverse $v(\cdot)$. A bidder of value $v$ who bids as if their value were $z$ wins with probability $F(z)^{n-1} = z^{n-1}$ (uniform, $n-1$ rivals) and pays $b(z)$. Expected payoff $(v - b(z)) z^{n-1}$. First-order condition at $z = v$:

$$
- b'(v)\, v^{n-1} + (v - b(v)) (n-1) v^{n-2} = 0,
$$

so $b'(v) v = (n-1)(v - b(v))$, or $\bigl(v^{n-1} b(v)\bigr)' = (n-1) v^{n-1}$. Integrate from $0$, using $b(0) = 0$: $v^{n-1} b(v) = v^n (n-1)/n$, hence $b(v) = \frac{n-1}{n} v$. For $n=2$, $b(v) = v/2$. The second-order condition holds because the objective is quasiconcave under these assumptions (standard envelope argument).
:::

Shading — bidding below value — is equilibrium behaviour, not a failure of rationality. Bidding $v$ would win more often but pay more when it wins; the optimum balances the two. In a **second-price** (Vickrey) auction, bidding $v$ is a weakly dominant strategy, and the seller's expected revenue, with IPV and symmetry, is the same: **revenue equivalence**. That theorem, and reserve prices, belong to [[market-design/revenue-equivalence]].

::: example A value of $0.8$ {#ex-fp-bid}
Two bidders, uniform $[0, 1]$. What does a bidder with $v = 0.8$ bid in the BNE of [[#prop-fp]]? What is their probability of winning, and their expected payoff? What would their expected payoff be if they bid $0.8$ instead, given the other uses $b(w) = w/2$?
::: solution
$b(0.8) = 0.4$. Wins if the rival's value is below $0.8$, probability $0.8$. Expected payoff $(0.8 - 0.4)\cdot 0.8 = 0.32$. If they bid $0.8$ against a rival who bids $w/2$, they win when $w/2 < 0.8$, i.e. $w < 1.6$, which is always, and pay $0.8$, so expected payoff $(0.8-0.8)\cdot 1 = 0$. Overbidding to value is disastrous against an equilibrium rival: you always win and you pay your whole value. (Bidding slightly above $0.4$ is a smaller mistake; the FOC says $0.4$ is the peak.)
:::
:::

::: warning The winner's curse is a different model
Shading in [[#eq-fp]] is *not* the winner's curse. The winner's curse arises in **common-value** auctions, where $v$ is the same for everyone and bidders have noisy estimates: winning is bad news about the estimates. IPV shading is a strategic response to paying your own bid. Treating a timber auction (partly common value) as IPV, or an art auction (partly private) as common value, is a modelling choice that changes the prediction. Capen, Clapp and Campbell (1971) on oil-tract bidding is the classic winner's-curse paper; it is not a test of [[#prop-fp]].
:::

## Public goods with private values

Each of two players can contribute or not. The public good is provided if at least one contributes. A contribution costs $c_i$, privately observed, drawn independently from Uniform$[0, 3]$. The good is worth $2$ to each player. This is a volunteer's dilemma with hidden costs.

::: example Bayesian volunteer's dilemma {#ex-bayes-volunteer}
Look for a symmetric BNE in which a player contributes if and only if $c_i \le c^*$. Find $c^*$. What is the probability the good is provided?
::: solution
A player with cost $c$ who contributes pays $c$ and gets $2$ for sure (the good is provided). Who does not contribute gets $2$ if the other contributes, $0$ otherwise. The other contributes with probability $p = \Prob(c_j \le c^*) = c^*/3$. So not contributing is worth $2p$. Contribute iff $2 - c \ge 2p$, i.e. $c \le 2(1-p)$. The threshold type is indifferent: $c^* = 2(1-p) = 2(1 - c^*/3)$. Then $c^* = 2 - (2/3)c^*$, so $(5/3)c^* = 2$, $c^* = 6/5 = 1.2$. Then $p = 1.2/3 = 0.4$. Probability the good is provided: $1 - (1-p)^2 = 1 - 0.36 = 0.64$. Compared with complete information (contribute iff $c_i < 2$ when the other is known not to, which is chicken), incomplete information produces a threshold below $2$: you contribute only if you are cheap enough to be willing even when the other might also contribute.
:::
:::

## Evidence

**Auctions.** Kagel and Levin (*Common Value Auctions and the Winner's Curse*, 2002) survey laboratory IPV first-price auctions: subjects shade, but typically bid *higher* than $v/2$ in the two-player uniform case (overbidding relative to BNE). Risk aversion and "joy of winning" are the usual explanations. Field tests of revenue equivalence (e.g. Lucking-Reiley 1999 on internet auctions of collectible cards) find mixed support; format details and entry matter.

**Spectrum.** The US FCC auctions from 1994 onwards were designed with game theory in the room (McAfee and McMillan 1996, *Journal of Economic Perspectives*). That is a success of the *framework* — types, strategies, incentive compatibility — not a confirmation of the uniform IPV formula. Real bidders have budget constraints, common-value components and aftermarkets.

## Where this leads

Auctions as a design problem — reserve prices, the revelation principle, revenue equivalence and its failures — are [[market-design]]. Signalling games, in which the informed player moves *first* and the uninformed updates, need beliefs off the equilibrium path and are the next chapter. Adverse selection in markets (Akerlof) is [[information-economics/asymmetric-information]].

::: history
John Harsanyi's three papers "Games with incomplete information played by 'Bayesian' players" (*Management Science*, 1967–68) introduced types and the common prior. William Vickrey's "Counterspeculation, auctions, and competitive sealed tenders" (*Journal of Finance*, 1961) solved the second-price auction and the uniform IPV first-price auction, before the language of BNE existed. Riley and Samuelson (1981) and Myerson (1981) proved revenue equivalence and characterised optimal auctions. Wilson (1977) and Milgrom and Weber (1982) developed common-value and affiliated-value models. Harsanyi's purification theorem (1973) connected mixed and Bayesian equilibria.
:::

::: summary
- A Bayesian game has types, a common prior, and type-contingent strategies ([[#def-bayesian]]). BNE requires every type to best-respond to the others' strategies ([[#def-bne]]).
- Incomplete information can destroy a complete-information Nash equilibrium: an unobserved preference may be pooled away.
- Cournot with an unknown cost has a BNE in which the uninformed firm best-responds to the *average* informed quantity, and each informed type best-responds to that single quantity.
- In a two-bidder uniform IPV first-price auction, $b(v) = v/2$ ([[#prop-fp]]). Shading is strategic, not a winner's curse.
- Public-good contribution with hidden costs yields a threshold BNE: only low-cost types contribute.
:::

## Exercises

::: exercise Uniform first-price, $n=3$ {level=1 check="0.6"}
Uniform $[0, 1]$, three bidders. What does a bidder with $v = 0.9$ bid in the symmetric BNE? (Enter a decimal.)
::: solution
$b(v) = \tfrac23 v = 0.6$.
:::
:::

::: exercise Second-price dominance {level=1}
In a second-price IPV auction, argue that bidding $v$ weakly dominates bidding $b \neq v$. (Two cases: $b < v$ and $b > v$.)
::: solution
Let $p$ be the highest rival bid. If you bid $v$: you win and get $v-p$ when $p < v$, lose when $p > v$. If you bid $b < v$: you lose some cases $b < p < v$ in which winning would have paid $v-p > 0$; you never gain. If you bid $b > v$: you win some cases $v < p < b$ in which you pay $p > v$ and lose money; you never gain. Ties have probability zero under continuous $F$. So $b = v$ weakly dominates.
:::
:::

::: exercise Meeting game, another prior {level=2}
In [[#ex-bayes-meeting]], change the prior to $\Prob(\text{type Opera}) = 0.9$. Is there a BNE in which player 2 plays Opera and player 1 of type Opera plays Opera?
::: solution
If player 1 of type Opera plays Opera and type Match plays Match, player 2's expected payoff of Opera is $0.9 \cdot 1 + 0.1 \cdot 0 = 0.9$; of Match, $0.9 \cdot 0 + 0.1 \cdot 2 = 0.2$. Player 2 plays Opera. Given Opera, type Opera of player 1 prefers Opera ($2 > 0$); type Match prefers Opera too? Type Match gets $1$ from meeting at Opera and $2$ from meeting at Match, but player 2 is at Opera, so Match mismatches and pays $0 < 1$. Type Match also plays Opera. Then player 2 faces Opera for sure, and Opera vs Match: $1 < 2$, so player 2 would *deviate* to Match. Inconsistency.

A BNE: both types of player 1 play Opera, player 2 plays Opera? Given Opera, type Match gets $1$ from Opera and $0$ from Match, so yes type Match plays Opera. Player 2, facing Opera for sure, prefers Match ($2 > 1$). Player 2 deviates. Both-Opera is not a BNE.

The BNE at this prior is the pooling-on-Match equilibrium of the text, still, wait: player 2 given both types play Match prefers Match. Type Opera given Match prefers Match ($1>0$). Yes pooling on Match remains a BNE even at $0.9$. There is also a mixed BNE, not asked. A high probability of the Opera type is not enough to get player 2 to Opera if player 1's Match type would then deviate... actually we just found pooling on Opera fails because player 2 prefers Match when sure of Opera — *because player 2's payoffs always rank Match above Opera when they meet*. Player 2 never plays Opera in a pure BNE, at any prior. The example's player 2 is a Match-lover. To get a separating BNE one would need player 2 to prefer Opera when the type is likely Opera, which requires player 2's own payoffs to rank Opera above Match.
:::
:::

::: exercise Cournot numbers {level=2 check="5"}
In [[#ex-bayes-cournot]], firm 1's BNE quantity is what integer?
::: solution
$q_1 = 5$, as derived.
:::
:::

::: exercise First-price expected payoff {level=2}
Uniform $[0, 1]$, $n=2$, $b(v) = v/2$. Show that a bidder of type $v$ has expected payoff $v^2/2$ in equilibrium. What is a bidder's *ex ante* expected payoff (before $v$ is drawn)?
::: solution
Wins with probability $v$, margin $v - v/2 = v/2$, so $v \cdot (v/2) = v^2/2$. Ex ante: $\E[v^2/2] = \tfrac12 \int_0^1 v^2\,\mathrm{d}v = 1/6$.
:::
:::

::: exercise Reserve price, a first look {level=3}
Two bidders, uniform $[0, 1]$, first-price. The seller sets a reserve $r = 1/2$: bids below $r$ lose. Guess that types $v \ge 1/2$ bid $b(v) = (v+1/2)/2$ (the two-bidder formula shifted to the interval $[1/2, 1]$). Check that a type $v = 3/4$ does not want to bid as if they were type $1$. What is the probability the object goes unsold?
::: hint
If you bid as type $z \ge 1/2$, you win with probability $z$ (the other value is below $z$) wait — rivals may be below $1/2$ and not bid. Winning probability is $F(z) = z$ still, for $z \ge 1/2$, because a rival with $w < 1/2$ bids below $r$ if they bid at all.
:::
::: solution
The suggested $b(v) = (v + r)/2$ with $r = 1/2$ is the standard formula on $[r, 1]$ for uniform IPV, $n=2$. Type $v = 3/4$ bidding as type $1$ bids $b(1) = (1+1/2)/2 = 3/4$, wins with probability $1$, payoff $(3/4 - 3/4)\cdot 1 = 0$. Bidding as self: $b(3/4) = (3/4+1/2)/2 = 5/8 = 0.625$, wins with probability $3/4$, payoff $(0.75-0.625)\cdot 0.75 = 0.09375 > 0$. So no, type $3/4$ does not mimic type $1$. Unsold probability: both values below $1/2$, which is $(1/2)^2 = 1/4$.
:::
:::

::: exercise Contribute or not {level=2}
In [[#ex-bayes-volunteer]], if the good were worth $3$ to each player rather than $2$, with costs still Uniform$[0, 3]$, find the new threshold $c^*$. Does the probability of provision rise?
::: solution
Contribute iff $3 - c \ge 3p$, i.e. $c \le 3(1-p)$, so $c^* = 3(1-c^*/3) = 3 - c^*$, hence $2c^* = 3$, $c^* = 1.5$. Then $p = 1.5/3 = 0.5$. Provision probability $1 - 0.25 = 0.75 > 0.64$. A more valuable good lowers the bar in payoff terms but the uniform support also matters; here $c^*$ rose from $1.2$ to $1.5$ and provision rose.
:::
:::

::: exercise Purification in matching pennies {level=3}
Each player in matching pennies has a private payoff shock $\eps_i$ added to their payoff of Heads, with $\eps_i$ independent, uniform on $[-\eta, \eta]$, observed only by $i$. For small $\eta$, describe a pure-strategy BNE in which player $i$ plays Heads iff $\eps_i$ exceeds a threshold, and argue that as $\eta \to 0$ the *ex ante* frequency of Heads tends to $1/2$.
::: hint
This is Harsanyi purification. The threshold will be $0$ by symmetry.
:::
::: solution
By symmetry, each player plays Heads iff $\eps_i \ge 0$, for any $\eta$: the opponent then plays Heads with probability $1/2$ (half the shock distribution is positive), which is exactly the mixed-strategy equilibrium mixture of matching pennies, so the player is willing to play Heads when the shock makes Heads better, i.e. when $\eps_i > 0$. (A fully correct FOC accounts for the opponent's threshold feeding back into the mixture; symmetry pins the threshold at $0$.) The *ex ante* frequency of Heads is $1/2$ for every $\eta$. As $\eta \to 0$ the shocks vanish and the observable play converges to the mixed Nash of the unperturbed game, while each type is using a pure strategy. That is purification.
:::
:::
