OPEC members would rather that everyone keep to a quota, and each member would rather exceed its own quota given the others' output. That is a prisoner's dilemma. In the one-shot game, dominance predicts cheating. In practice the agreement sometimes holds for months and then unravels. The difference is **repetition**. Today's cheat is visible, and tomorrow's quota can be made to depend on it.

This chapter studies the same stage game played over and over. If the horizon is finite and known, backward induction unravels cooperation in a prisoner's dilemma: the last period is one-shot, so the penultimate period has no future to protect, and so on. If the horizon is infinite — or finite but with a constant chance of continuing — **trigger strategies** can sustain cooperation as a subgame-perfect equilibrium, provided players are patient enough. The **folk theorem** says that, under stated assumptions, *every* feasible payoff vector that is better than the minmax can be sustained when patience is high. Cooperation is possible; it is not guaranteed. The theory explains the *incentive* constraint, not why a particular cartel held in a particular year.

Illustrative payoffs are invented. Real cartel data are cited with sources. Nothing here is advice on how to collude; collusion is a matter for competition law, treated as a positive model in [[industrial-organisation/collusion]].

## Finitely repeated games

A **stage game** $G$ is a finite strategic-form game. The **$T$-fold repetition** $G^T$ plays $G$ in periods $t = 1, \dots, T$, with the history of play observed before each period, and with payoffs the undiscounted sum (or the average) of stage payoffs. A strategy in $G^T$ is a complete plan: an action in period $1$, and after every history of length $t-1$ an action in period $t$.

::: proposition Unravelling in the finitely repeated PD {#prop-unravel}
Let $G$ be a prisoner's dilemma with a unique Nash equilibrium (Defect, Defect). In every subgame-perfect equilibrium of $G^T$, for every finite $T$, both players Defect in every period.
:::
::: proof
In period $T$, the continuation is empty, so SPE requires a Nash equilibrium of $G$: both Defect. In period $T-1$, the continuation payoff is then independent of current play (both will Defect tomorrow anyway), so the period-$(T-1)$ game is again $G$, and both Defect. Working backwards, both Defect in every period.
:::

The result extends to any stage game with a *unique* Nash equilibrium: SPE of $G^T$ is $T$-fold play of that equilibrium. If $G$ has several Nash equilibria, finite repetition can use *future* equilibria as rewards and punishments, and a limited amount of non-equilibrium stage play can be sustained in early periods (Benoît and Krishna 1985). The prisoner's dilemma, with its unique Nash, is the stark case.

::: example Two-period PD {#ex-two-period-pd}
Stage payoffs:

|  | $C$ | $D$ |
|---|---|---|
| $C$ | $3, 3$ | $0, 5$ |
| $D$ | $5, 0$ | $1, 1$ |

$T = 2$, no discounting. Confirm that (C, C) in period 1 cannot be part of an SPE.
::: solution
Whatever happens in period 1, period 2 is a one-shot PD, so SPE play is $(D, D)$ with payoffs $(1, 1)$. Period-1 payoffs are then just the PD payoffs, and $D$ strictly dominates $C$. A player who cooperates in period 1 gets at most $3 + 1 = 4$; defecting against a cooperator gives $5 + 1 = 6$. Cooperation in period 1 is not a best response, whatever the opponent does in period 1. Unravelling is already complete at $T = 2$.
:::
:::

Laboratory finitely repeated PDs show cooperation in early rounds, decaying toward defection as $T$ approaches (Selten and Stoecker 1986). The decay matches unravelling; the early cooperation does not. Reputation, as in the chain-store paradox, is the standard explanation: a small probability that the opponent is a cooperative type can sustain cooperation until near the end (Kreps, Milgrom, Roberts, Wilson 1982).

## Infinitely repeated games and discounting

Now $t = 0, 1, 2, \dots$, and player $i$'s payoff is the discounted sum $(1-\delta) \sum_{t=0}^\infty \delta^t u_i(a^t)$, with $\delta \in (0, 1)$ a common discount factor. The factor $(1-\delta)$ normalises so that a constant stream $u$ is worth $u$. A high $\delta$ is patience, or a short period, or a high probability that the interaction continues: if the game ends each period with probability $1-\delta$, independently, expected payoffs have the same form.

::: definition Grim-trigger strategy {#def-grim}
In a repeated PD, the **grim-trigger** strategy is: play $C$ in period $0$; in period $t \ge 1$, play $C$ if all previous play was $(C, C)$, and play $D$ otherwise. The first defection triggers permanent reversion to the stage-game Nash equilibrium.
:::

::: proposition Cooperation under grim trigger {#prop-grim}
Let the PD stage payoffs be $R$ for $(C, C)$, $T$ for a unilateral defection, $P$ for $(D, D)$, $S$ for a sucker's payoff, with $T > R > P > S$. Grim trigger played by both is a subgame-perfect equilibrium of the infinitely repeated game if and only if

$$
\delta \ge \frac{T - R}{T - P}.
$$ {#eq-grim}

On the path, both play $C$ every period and each earns $R$. After any defection, both play $D$ thereafter, which is itself an SPE path (infinite repetition of a static Nash equilibrium).
:::
::: proof
On the path, cooperating yields $R$ forever, worth $R$. Defecting yields $T$ now and $P$ forever after, worth $(1-\delta)T + \delta P$. Cooperate is better iff $R \ge (1-\delta)T + \delta P$, i.e. $\delta(T-P) \ge T-R$, which is [[#eq-grim]]. After a defection, grim trigger prescribes $(D, D)$ forever, which is a Nash equilibrium of every continuation (it is the static Nash, repeated). In a continuation still on the path, the same comparison as at $t=0$ applies. Hence every subgame is in equilibrium when [[#eq-grim]] holds. If the inequality fails, a one-shot deviation to $D$ on the path is profitable, so grim trigger is not even a Nash equilibrium.
:::

::: example Numbers {#ex-grim-numbers}
With $(T, R, P, S) = (5, 3, 1, 0)$, how patient must the players be? If $\delta = 0.6$, is grim trigger an SPE? Compare the on-path value with the value of a one-shot deviation.
::: solution
$(T-R)/(T-P) = (5-3)/(5-1) = 2/4 = 1/2$. So $\delta \ge 1/2$ suffices. At $\delta = 0.6 > 1/2$, grim trigger is an SPE. On-path value $3$. Deviation value $(1-0.6)\cdot 5 + 0.6\cdot 1 = 2 + 0.6 = 2.6 < 3$. The future loss $0.6 \times (3-1) = 1.2$ outweighs the present gain $2$.
:::
:::

::: widget sequence
a: 3*(0.6)^(n-1)
N: 20
mode: both
limit: 7.5
start: 1
caption: Undiscounted-by-$(1-\delta)$ picture: the stream $3, 3\delta, 3\delta^2, \ldots$ with $\delta = 0.6$, and its partial sums. The normalised value is $(1-\delta)$ times the infinite sum $3/(1-\delta) = 7.5$, hence $3$. The figure is the raw geometric series; cooperation is a constant stream, whose present value is easy to compare with a spike of $5$ followed by a stream of $1$.
:::

**Tit-for-tat** — start with $C$, then copy the opponent's previous action — is not generally subgame-perfect in the PD: after a single $D$, tit-for-tat produces a cycle $(D, C), (C, D), \ldots$ unless the opponent also "forgives", and a player who is supposed to play $C$ against a $D$ may prefer to play $D$. With a different stage game, or with noise, tit-for-tat can be an equilibrium. Axelrod's (1984) tournaments made it famous as a *robust* strategy in a computer pool; robustness in a tournament is not the same as SPE in a game.

::: warning Finite $T$ is not "approximately infinite"
A discount factor of $\delta = 0.99$ is not a substitute for an infinite horizon if the game is known to last $T = 100$ periods. Unravelling is a backward-induction argument that does not care how large $T$ is, only that it is finite and known. The right way to get a "long" game in which cooperation survives is an *uncertain* end: each period, play continues with probability $\delta$. That game is infinite, and [[#prop-grim]] applies. Confusing a large known $T$ with a high $\delta$ is the most common modelling mistake in applied repeated-game work.
:::

## The folk theorem

Many payoff vectors besides $(R, R)$ can be sustained. A **feasible** payoff vector is a convex combination of stage-game payoff profiles (public randomisation, or time-averaging, can convexify). A player's **minmax** payoff is

$$
\underline{u}_i = \min_{\sigma_{-i}} \max_{\sigma_i} u_i(\sigma_i, \sigma_{-i}),
$$

the lowest payoff the others can hold $i$ to, when $i$ best-responds. In the PD, the minmax is $P$, the Nash payoff, because $D$ is dominant. In other games the minmax can be harsher than any Nash payoff.

::: theorem Folk theorem with discounting {#thm-folk}
(Fudenberg and Maskin 1986.) Let $G$ be a finite $n$-player stage game. Let $v$ be a feasible payoff vector with $v_i > \underline{u}_i$ for every $i$ (**strict individual rationality**). Assume a **full-dimensionality** condition: the feasible set has dimension $n$ in a neighbourhood of $v$ (automatically true for two players whenever $v$ is in the interior of the feasible set). Then there exists $\underline{\delta} < 1$ such that for all $\delta \ge \underline{\delta}$, $v$ is the discounted-average payoff of some subgame-perfect equilibrium of the infinitely repeated game.
:::
::: proof
Sketch of the two-player idea, without public randomisation. To sustain $v$, play a stage profile that realises $v$ (or a cycle whose average is $v$). If player $i$ deviates, the other holds $i$ to the minmax for enough periods to wipe out the gain, then play returns to a path whose payoff is slightly worse for $i$ than $v$ but still above $\underline{u}_i$. Full dimensionality supplies room to punish $i$ without punishing the punisher so much that the punisher would not carry out the punishment. The original "Nash folk theorem" (Friedman 1971) is simpler: if $v$ Pareto-dominates a Nash payoff of $G$, grim-trigger reversion to that Nash sustains $v$ for high $\delta$, without minmaxing. Fudenberg–Maskin extend the set down to the minmax.
:::

Assumptions to keep visible:

1. **Infinite horizon** (or uncertain end with continuation probability $\delta$).
2. **Observable actions** (perfect monitoring). Imperfect monitoring is a different theorem (Fudenberg, Levine and Maskin 1994), and cooperation becomes harder.
3. **Patience**, $\delta$ above a threshold that depends on $v$ and $G$.
4. **Full dimensionality** for $n \ge 3$, so that punishments can be tailored.
5. **Public randomisation** is convenient but not essential.

The theorem is an *existence* result for a large set of SPE payoffs. It does not select among them. Cartels, climate clubs and relational contracts still have a coordination problem: which SPE, and how is it enforced when monitoring is noisy?

::: example Feasible, IR payoffs in the PD {#ex-folk-pd}
For the PD of [[#ex-grim-numbers]], sketch the feasible set and the individually rational set. Is $(4, 2)$ sustainable for high $\delta$? Is $(0.5, 0.5)$?
::: solution
Stage payoffs: $(3,3)$, $(5,0)$, $(0,5)$, $(1,1)$. The feasible set is the convex hull of these four points, a quadrilateral. Minmax is $1$ for each player (play $D$). Individually rational feasible payoffs are the part of the hull with both coordinates $> 1$ (strict) or $\ge 1$ (weak). The point $(4, 2)$ lies on the line between $(3,3)$ and $(5,0)$: $4 = \tfrac12 \cdot 3 + \tfrac12 \cdot 5$, $2 = \tfrac12 \cdot 3 + \tfrac12 \cdot 0$, so it is feasible, and $4 > 1$, $2 > 1$, so strictly IR. The folk theorem says yes, for high $\delta$. The point $(0.5, 0.5)$ is below minmax: it is not IR, and cannot be an SPE payoff, however patient the players, because each can unilaterally secure $1$ by playing $D$ against any strategy of the other.
:::
:::

::: widget markov
matrix: 0.95,0.05; 0,1
states: Cooperate; Punish
start: 0
steps: 30
caption: A cartoon of grim trigger with noise. State Cooperate persists with probability $0.95$ and slips to Punish with probability $0.05$ (a tremble or a monitoring error). Punish is absorbing. Run the chain: cooperation lasts for a random spell, then ends forever. With noisy monitoring, grim trigger is a poor institution; more forgiving punishments appear in the imperfect-monitoring theory.
:::

::: quiz
A stage game has minmax payoffs $(0, 0)$ and a feasible set that includes $(2, 2)$ and $(1, 1)$. Which statement follows from the folk theorem?
- [ ] $(2, 2)$ is the unique SPE payoff of the repeated game
- [x] For $\delta$ high enough, there is an SPE with payoffs $(2, 2)$, and also (typically) one with payoffs $(1, 1)$
- [ ] $(2, 2)$ can be sustained only if it is a Nash equilibrium of the stage game
- [ ] Finite repetition of $T = 100$ periods will also sustain $(2, 2)$
::: solution
The folk theorem is an existence result for *many* SPE payoffs, not uniqueness. Both $(2, 2)$ and $(1, 1)$ are strictly IR if minmax is $0$, so both are SPE payoffs for high $\delta$ (given dimensionality). The stage game need not have $(2, 2)$ as a Nash — that is the point of repetition. Finite known $T$ does not fall under the theorem; unravelling applies if the stage Nash is unique.
:::
:::

## Evidence

**Cartels.** The lysine cartel of the 1990s (Harrington, *How Do Cartels Operate?*, 2006) used meetings, quotas and a compensation mechanism — a designed repeated game with imperfect monitoring. The OPEC+ cuts of 2020–2023, as recorded in IEA *Oil Market Reports*, show partial compliance: some members overproduced, others underproduced. Repeated-game theory predicts that compliance is an equilibrium for patient members with good monitoring, and that it is not the only equilibrium. The theory does not predict the date a cartel breaks.

**Laboratory.** Dal Bó and Fréchette (2018, *Journal of Economic Literature*) survey infinitely repeated PD experiments (implemented with a continuation probability). Cooperation rises with $\delta$ and with $R$, as [[#eq-grim]] predicts, but is far from universal even when grim trigger is an SPE. History-dependent strategies are used; so are naive ones. The comparative statics of the theory survive; the level of cooperation is a behavioural remainder.

**Relational contracts.** Agricultural marketing, garment supply chains and informal credit often rest on repeated interaction without court enforcement (Greif 1993 on Maghribi traders is the historical classic; McMillan and Woodruff 1999 on Vietnam is a modern field study). The folk theorem says such arrangements *can* work; the case studies say when they *do* — typically with small groups, good information, and a shadow of the future.

## Where this leads

Imperfect monitoring, asymmetric information, and renegotiation-proofness are the next theoretical steps (Fudenberg and Tirole, *Game Theory*, 1991, ch. 5). Applications to collusion are [[industrial-organisation/collusion]]; to climate agreements, [[environmental-economics]]; to employment, the relational-contract chapter of [[labour-economics]]. Reputation, in which one player is a hidden type, mixes this chapter with [[game-theory/bayesian-games]].

::: history
The "folk" theorem was folklore in the 1950s–60s; Friedman (1971, *Review of Economic Studies*) published the Nash-reversion version. Aumann and Shapley (1976, later published) and Rubinstein (1977) treated the undiscounted case. Fudenberg and Maskin (1986, *Econometrica*) proved the discounted folk theorem with minmax payoffs and full dimensionality. Axelrod's *The Evolution of Cooperation* (1984) popularised tit-for-tat, from a tournament rather than an equilibrium derivation. Green and Porter (1984) and Rotemberg and Saloner (1986) brought imperfect monitoring and demand shocks into cartel theory. Kreps, Milgrom, Roberts and Wilson (1982) showed how a little incomplete information undoes finite-horizon unravelling.
:::

::: summary
- Finite known repetition of a PD unravels: SPE is defection every period ([[#prop-unravel]]).
- In the infinitely repeated PD, grim trigger sustains $(C, C)$ as an SPE iff $\delta \ge (T-R)/(T-P)$ ([[#prop-grim]], [[#def-grim]]).
- A large known $T$ is not a high $\delta$. Uncertain continuation is the right model of a "long" relationship.
- The folk theorem (Fudenberg–Maskin): every feasible, strictly individually rational payoff is an SPE payoff for high $\delta$, under a dimensionality condition and perfect monitoring ([[#thm-folk]]).
- The theorem is existence, not selection. Monitoring noise, patience and group size determine whether a particular institution actually cooperates.
:::

## Exercises

::: exercise The grim threshold {level=1 check="1/2"}
For $(T, R, P, S) = (5, 3, 1, 0)$, the critical $\delta$ is what fraction? (Enter a fraction.)
::: solution
$(5-3)/(5-1) = 1/2$.
:::
:::

::: exercise A harsher temptation {level=1 check="2/3"}
Now $T = 7$, $R = 3$, $P = 1$. Find the critical $\delta$ for grim trigger. (Enter a fraction.)
::: solution
$(7-3)/(7-1) = 4/6 = 2/3$. A larger temptation requires more patience.
:::
:::

::: exercise One-shot deviation {level=1}
In [[#ex-grim-numbers]] with $\delta = 0.4$, compute the on-path value of grim trigger and the value of a one-shot deviation. Which is larger?
::: solution
On-path: $3$. Deviation: $(1-0.4)\cdot 5 + 0.4\cdot 1 = 3 + 0.4 = 3.4 > 3$. (Equivalently $0.4 < 1/2$.) Grim trigger is not an SPE at $\delta = 0.4$.
:::
:::

::: exercise Minmax in chicken {level=2}
Chicken with payoffs as in [[game-theory/nash-equilibrium#ex-chicken]]: $(2,2)$ for (Swerve, Swerve), $(1,3)$ and $(3,1)$ off-diagonal, $(0,0)$ for (Straight, Straight). What is player 1's minmax payoff? Is it equal to the worst Nash payoff of the stage game?
::: hint
Player 2 wants to minimise player 1's best-response payoff. Pure minmax: if player 2 plays Straight, player 1's best response Swerve pays $1$; if player 2 plays Swerve, player 1's best response Straight pays $3$. Mixed minmax can go lower.
:::
::: solution
If player 2 mixes with $\Prob(\text{Swerve}) = q$, player 1's best-response payoff is $\max(1+q,\ 3q)$ in the notation of the mixed-strategy chapter, where Swerve pays $1+q$ and Straight pays $3q$. These meet at $q = 1/2$, payoff $1.5$. For $q < 1/2$ the max is $1+q > 1$; for $q > 1/2$ it is $3q > 1.5$. So the minmax is $1.5$, achieved by the mixed equilibrium strategy of player 2. The worst *pure Nash* payoff for player 1 is $1$ (the equilibrium in which player 1 Swerves). Minmax $1.5$ is *higher* than $1$ because player 2, to minmax, must mix, and that mix gives player 1 more than the worse pure Nash. In chicken, Nash-reversion (Friedman) can punish down to $1$ by playing the bad-for-$i$ pure Nash; minmax punishment is weaker. Folk-theorem statements must name which punishment is used.
:::
:::

::: exercise Average versus sum {level=2}
Two-period PD, $\delta = 1$ (no discounting), payoffs as in [[#ex-two-period-pd]]. A pair of strategies says: play $C$ in period 1; play $C$ in period 2 if $(C,C)$ occurred, else $D$. Show this is not SPE. What period-2 incentive fails?
::: solution
Period 2, after $(C, C)$: the prescribed action $C$ is not a best response in the one-shot PD (the continuation is empty). A player defects and gets $5$ rather than $3$ in period 2. The period-1 carrot cannot be paid, because it would have to be a Nash equilibrium of the stage game. That is unravelling in one paragraph.
:::
:::

::: exercise Feasible set {level=2}
In the PD of [[#ex-grim-numbers]], represent $(4, 2)$ as a public lottery over two stage profiles. For $\delta$ close to $1$, sketch the SPE that uses public randomisation to sustain $(4, 2)$.
::: solution
$(4, 2) = \tfrac12(3, 3) + \tfrac12(5, 0)$. Each period, a public coin flip: heads, play $(C, C)$; tails, play $(D, C)$ (row defects, column cooperates). After a deviation, revert to $(D, D)$ forever. For $\delta$ high enough that neither player wants to deviate from either realisation (column is the constrained player, earning $0$ half the time), this is an SPE with average $(4, 2)$. Without public randomisation, a two-period cycle $(C,C), (D,C), (C,C), (D,C), \ldots$ has the same average and is an SPE for high $\delta$ under perfect monitoring.
:::
:::

::: exercise Uncertain end {level=3}
Each period the PD of [[#ex-grim-numbers]] is played, then with probability $p$ the game continues and with probability $1-p$ it ends (payoffs stop). No additional discounting. For which $p$ is grim trigger an SPE?
::: hint
This is the infinite-horizon game with $\delta = p$.
:::
::: solution
The expected payoff from a stream is $\sum_{t=0}^\infty p^t u^t$, or normalised $(1-p) \sum p^t u^t$. The grim-trigger comparison is identical to [[#prop-grim]] with $\delta = p$. So grim trigger is an SPE iff $p \ge 1/2$. A relationship that ends with probability $2/3$ each "period" cannot sustain this PD's cooperation by grim trigger, however often the parties meet, unless the period is redefined. That is why the continuation probability, not the calendar, is the primitive.
:::
:::

::: exercise Three-player folk {level=3}
Three players. Each period, each chooses a number in $\{1, 2, 3\}$. Payoff to $i$ is $1$ if all choose the same number, $0$ otherwise. Minmax is $0$ (the others can mismatch $i$). The feasible set includes $(1,1,1)$ and also, by public randomisation, any $(p, p, p)$ with $p \in [0, 1]$. Explain why full dimensionality *fails*, and why $(1,1,1)$ is nevertheless an SPE payoff for any $\delta > 0$. Why might a nearby vector such as $(0.9, 0.9, 0.5)$ be harder to sustain?
::: solution
All feasible payoff vectors that are strictly positive are on the ray $(p, p, p)$: the three payoffs cannot be varied independently, because a match pays everyone $1$ and a mismatch pays everyone $0$. The feasible set is one-dimensional, not three-dimensional, so Fudenberg–Maskin's condition fails. Nonetheless $(1,1,1)$ is an SPE payoff: play $1$ every period, and after any deviation play so as to mismatch forever (e.g. player 1 plays $1$, player 2 plays $2$, player 3 plays $3$). No one-shot deviation pays, even at $\delta = 0$, because the stage profile $(1,1,1)$ is itself a Nash equilibrium of the stage game (any matched number is Nash; any mismatch is not). The folk theorem's extra work is for payoffs that are *not* static Nash. A vector $(0.9, 0.9, 0.5)$ is not feasible here at all; in a game where it was feasible, punishing player 3 down toward minmax would tend to punish $1$ and $2$ as well, and without dimensionality there may be no way to reward the punishers. That is what the condition is for.
:::
:::
