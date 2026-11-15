Two neighbouring dairy processors, Northcream and Southcream, must each decide whether to run a costly television campaign this season. If neither advertises, they share the market quietly and each earns a profit of $3$ (in millions of units of money). If one advertises and the other does not, the advertiser captures most of the demand and earns $5$, while the silent firm is left with $0$. If both advertise, they cancel each other out: demand is unchanged and each pays the campaign cost, leaving a profit of $1$. Each firm chooses without seeing the other's decision. What should Northcream do?

The puzzle is not a standard optimisation problem of the kind in [[mathematical-economics/unconstrained-optimisation]]. Northcream's best action depends on Southcream's action, and Southcream is in the same position. **Game theory** studies such situations of strategic interdependence. This chapter introduces the **strategic form** (also called the normal form): players, strategies and payoffs written in a table. The first solution idea is **dominance** — a strategy that is better no matter what the others do. When a game has a dominant strategy, the recommendation is robust. When it does not, we iterate the same logic, deleting strategies that a player who knows the others are rational would never use.

The advertising numbers are a **prisoner's dilemma**, the most famous game in the social sciences. Both firms have a dominant strategy to advertise, and both then earn $1$ rather than the $3$ they would have earned by staying quiet. Individual rationality and joint rationality come apart. The same structure reappears in cartels, arms races, open-access fisheries and the provision of a public good — which is why the chapter starts here rather than with a coordination problem, where the difficulty is of a different kind.

Throughout the course, payoffs are numbers that the player wants to maximise. They may represent profit, utility, votes, or the negative of years in prison. They are **not** a recommendation about how a real firm, government or person ought to act; they are an ingredient of a model. Illustrative payoffs are invented. When we cite a laboratory or field study, the source and date are given.

## Players, strategies and payoffs

A **game** in the sense of this course is not a recreation. It is a complete description of who is involved, what each can do, what each knows when choosing, and how the combination of choices translates into payoffs. This chapter and the next two restrict attention to games in which players move simultaneously, or at any rate without observing one another's current choice. Sequential moves belong to [[game-theory/extensive-form]]. Hidden information about payoffs belongs to [[game-theory/bayesian-games]].

::: definition Finite strategic-form game {#def-strategic-form}
A **finite strategic-form game** consists of

1. a finite set $N = \{1, \dots, n\}$ of **players**;
2. for each player $i$, a finite set $S_i$ of **strategies** (also called **actions** in a simultaneous-move game);
3. for each player $i$, a **payoff function** $u_i \colon S \to \R$, where $S = S_1 \times \cdots \times S_n$ is the set of **strategy profiles**.

A profile is written $s = (s_i, s_{-i})$, with $s_{-i}$ the list of strategies of all players other than $i$. Player $i$ prefers $s$ to $s'$ if and only if $u_i(s) > u_i(s')$. Players are assumed to **maximise** their own payoffs. The structure of the game — $N$, the sets $S_i$, and the functions $u_i$ — is **common knowledge**: every player knows it, knows that the others know it, and so on.
:::

Two comments on the definition. First, a strategy in a simultaneous-move game is simply an action. Once players move in sequence, or observe signals, a strategy will be a *plan* specifying an action at every contingency; that distinction is postponed until [[game-theory/extensive-form]]. Second, the payoff $u_i$ already includes everything player $i$ cares about. If Northcream's owners dislike Southcream's success for its own sake, that envy belongs in $u_i$, not in a footnote. If they care only about own profit, $u_i$ is profit. The mathematics does not take a view on which is more realistic; the modeller does.

When $n = 2$ and each player has a small number of strategies, the game is a **bimatrix**: a table whose rows are player 1's strategies, whose columns are player 2's, and whose cells contain the pair $(u_1, u_2)$. By convention the first number in each cell is the **row player's** payoff.

::: example The advertising game {#ex-advertising}
Write the Northcream–Southcream game as a bimatrix. Identify the players, the strategy sets and the four possible payoff pairs.
::: solution
Players: Northcream (row) and Southcream (column). Strategy sets: $\{\text{Quiet}, \text{Advertise}\}$ for each. Payoffs, in millions:

|  | Quiet | Advertise |
|---|---|---|
| Quiet | $3, 3$ | $0, 5$ |
| Advertise | $5, 0$ | $1, 1$ |

The four profiles are $(\text{Quiet}, \text{Quiet})$ with payoffs $(3, 3)$, $(\text{Quiet}, \text{Advertise})$ with $(0, 5)$, $(\text{Advertise}, \text{Quiet})$ with $(5, 0)$, and $(\text{Advertise}, \text{Advertise})$ with $(1, 1)$. Each firm wants a larger first (respectively second) number.
:::
:::

The same table describes many other stories. Replace "Quiet" by "Cooperate" and "Advertise" by "Defect", and it is a prisoner's dilemma. Replace the firms by two countries choosing whether to abate carbon emissions, with abatement costly and climate benefits shared, and it is a cartoon of an international environmental agreement. The names change; the strategic structure does not.

::: intuition Payoffs are not moral scores
A payoff of $5$ is not "better for society" than a payoff of $3$. It is better *for that player*. In [[#ex-advertising]] the profile that maximises the *sum* of payoffs is $(\text{Quiet}, \text{Quiet})$, with total $6$, not the profile that will turn out to be played. Distinguishing what a player wants from what a planner might want is the first habit the subject requires. The distinction between positive description and normative evaluation is the same one drawn in [[principles/thinking-like-an-economist]].
:::

A game can have more than two strategies per player, and more than two players. With three players a bimatrix is no longer enough: we need a collection of tables, one for each strategy of the third player. With continuous strategy sets — a quantity in $[0, \infty)$, a price, a location on a line — the table disappears and payoff functions take over; that is [[game-theory/continuous-games]]. The definitions of dominance and best response will survive the change of setting.

## Strict dominance

Fix the others' strategies $s_{-i}$. Player $i$ then faces an ordinary decision problem: choose $s_i$ to maximise $u_i(s_i, s_{-i})$. A strategy that is best against *every* $s_{-i}$ is as robust a recommendation as game theory can offer.

::: definition Strict dominance {#def-strict-dominance}
Let $s_i, s_i' \in S_i$. Strategy $s_i$ **strictly dominates** $s_i'$ if

$$
u_i(s_i, s_{-i}) > u_i(s_i', s_{-i}) \qquad \text{for every } s_{-i} \in S_{-i}.
$$

Strategy $s_i'$ is then **strictly dominated**. A strategy that strictly dominates every other strategy of player $i$ is a **strictly dominant strategy**.
:::

In [[#ex-advertising]], Advertise strictly dominates Quiet for Northcream: $5 > 3$ if Southcream is quiet, and $1 > 0$ if Southcream advertises. The same comparison holds for Southcream. Both players have a strictly dominant strategy.

::: proposition Strictly dominated strategies are never best replies {#prop-never-br}
If $s_i'$ is strictly dominated, then there is no belief of player $i$ about $s_{-i}$ — including a belief that puts probability one on a particular profile — that makes $s_i'$ a payoff-maximising choice. In particular, a player who maximises expected payoff, whatever the belief, never uses a strictly dominated strategy.
:::
::: proof
Suppose $s_i$ strictly dominates $s_i'$. For every $s_{-i}$, $u_i(s_i, s_{-i}) > u_i(s_i', s_{-i})$. Let $\mu$ be any probability distribution on $S_{-i}$. Taking the expectation,

$$
\sum_{s_{-i}} \mu(s_{-i})\, u_i(s_i, s_{-i}) > \sum_{s_{-i}} \mu(s_{-i})\, u_i(s_i', s_{-i}),
$$

because the inequality is strict at every point of the support, or at any rate on a set of $\mu$-positive probability (if $\mu$ put probability zero on every $s_{-i}$, it would not be a probability distribution). The left-hand side is the expected payoff of $s_i$; the right-hand side is that of $s_i'$. So $s_i'$ is not a maximiser.
:::

The argument already uses expected payoffs, which will be the language of mixed strategies in [[game-theory/mixed-strategies]]. For the moment the important consequence is qualitative: if you are convinced that a player maximises, you may delete that player's strictly dominated strategies before predicting play.

::: example The prisoner's dilemma {#ex-pd}
Two people are arrested. If both remain silent (Cooperate), each serves $1$ year. If one confesses (Defect) while the other stays silent, the confessor goes free ($0$ years) and the silent one serves $5$ years. If both confess, each serves $3$ years. They cannot communicate. Taking payoff to be the *negative* of years in prison, write the bimatrix and find each player's dominant strategy.
::: solution
|  | Cooperate | Defect |
|---|---|---|
| Cooperate | $-1, -1$ | $-5, 0$ |
| Defect | $0, -5$ | $-3, -3$ |

For the row player, Defect gives $0 > -1$ against Cooperate and $-3 > -5$ against Defect, so Defect strictly dominates Cooperate. The game is symmetric, so the column player has the same dominant strategy. The unique profile that survives is $(\text{Defect}, \text{Defect})$, with payoffs $(-3, -3)$. Both would prefer $(-1, -1)$, but each prefers to confess given the other's choice.
:::
:::

The advertising game and the prisoner's dilemma are **strategically equivalent** up to an affine transformation of payoffs: the ranking of a player's payoffs across the four cells is the same. Any strictly increasing transformation of *one* player's payoffs leaves dominance (and, later, best responses) unchanged for that player. Adding $3$ to every cell of [[#ex-pd]] and then multiplying by $-1$ is *not* a legal transformation of a single player — it reverses the ranking — which is why we switched to "negative of years" rather than minimising years as such.

::: warning Dominance is not "better for both"
A common confusion is to look at the cell $(3, 3)$ in [[#ex-advertising]], notice that both firms prefer it to $(1, 1)$, and conclude that Quiet "dominates". Dominance is a comparison of *one player's* strategies, holding the other's strategy fixed. Quiet is worse for Northcream if Southcream plays Quiet ($3 < 5$) and worse if Southcream advertises ($0 < 1$). The joint ranking of profiles is a question of **Pareto efficiency**, not of dominance. The profile $(\text{Advertise}, \text{Advertise})$ is Pareto-dominated by $(\text{Quiet}, \text{Quiet})$, and Advertise nevertheless strictly dominates Quiet for each firm.
:::

::: widget plot
f: 3*x; 5*x + 1
x: 0, 1
y: 0, 7
labels: \text{Quiet}; \text{Advertise}
caption: Horizontal axis: probability that Southcream stays quiet. Vertical axis: Northcream's expected payoff. Advertise lies strictly above Quiet for every probability, including the endpoints $0$ and $1$. That is strict dominance. Hover to read the two payoffs at a given belief.
:::

The figure is worth sitting with. Even if Northcream is unsure what Southcream will do, and holds some probability $x$ that Southcream stays quiet, the expected payoff of Advertise is $5x + 1(1-x) = 1 + 4x$ and that of Quiet is $3x$. The difference is $1 + x > 0$ for every $x \in [0, 1]$. Uncertainty about the opponent does not rescue a strictly dominated strategy.

## Iterated elimination of strictly dominated strategies

Many games have no strictly dominant strategy, yet some strategies are strictly dominated. Deleting those shrinks the game. In the smaller game, a strategy that was not dominated before may become dominated, because some of the opponent's replies have disappeared. Repeating the deletion is **iterated elimination of strictly dominated strategies** (IESDS).

::: algorithm Iterated elimination of strictly dominated strategies {#alg-iesds}
Start with $S_i^0 = S_i$ for every player $i$. At round $k = 1, 2, \dots$, for each $i$ delete from $S_i^{k-1}$ every strategy that is strictly dominated in the reduced game with strategy sets $(S_j^{k-1})_{j \in N}$. Stop when no player has a strictly dominated strategy left. The surviving profiles are the **iteratively undominated** strategy profiles.
:::

Two facts make the procedure usable. First, the order in which *strictly* dominated strategies are deleted does not change the final set: if a strategy is iteratively undominated under one order of deletion, it is iteratively undominated under every order. (The corresponding statement for *weak* dominance is false, as we shall see.) Second, in a finite game the procedure stops after finitely many rounds.

::: example A three-by-three game {#ex-iesds}
Players 1 (row) and 2 (column) have strategies $\{T, M, B\}$ and $\{L, C, R\}$ and payoffs

|  | $L$ | $C$ | $R$ |
|---|---|---|---|
| $T$ | $3, 3$ | $2, 1$ | $4, 2$ |
| $M$ | $2, 4$ | $3, 2$ | $1, 3$ |
| $B$ | $1, 0$ | $0, 5$ | $3, 1$ |

Eliminate strictly dominated strategies until none remain. What profile survives? Confirm that it is the unique profile in which each strategy is a best response to the other.
::: solution
Compare player 1's rows. Against $L$, payoffs are $3, 2, 1$; against $C$, $2, 3, 0$; against $R$, $4, 1, 3$. Row $T$ strictly dominates $B$ because $3 > 1$, $2 > 0$ and $4 > 3$. Row $M$ does not dominate or be dominated by $T$: $2 < 3$ against $L$ but $3 > 2$ against $C$. So at the first round we delete $B$ only.

In the reduced game with rows $T, M$ and columns $L, C, R$, look at player 2. Column $L$ gives $3, 4$; $C$ gives $1, 2$; $R$ gives $2, 3$. Now $L$ strictly dominates both $C$ ($3 > 1$ and $4 > 2$) and $R$ ($3 > 2$ and $4 > 3$). (Before $B$ was deleted this was not so: against $B$, column $C$ gave $5 > 0$.) Delete $C$ and $R$.

The remaining game is a single cell: $(T, L)$ with payoffs $(3, 3)$. Against $L$, player 1's best response in the original game is $T$ (payoff $3 > 2 > 1$). Against $T$, player 2's best response is $L$ (payoff $3 > 2 > 1$). So the surviving profile is a mutual best response — a Nash equilibrium, in the language of the next chapter.
:::
:::

The example shows why iteration has bite. Column $C$ is a strong reply to $B$. Once player 2 is convinced that player 1 will not play $B$ — because $B$ is strictly dominated — $C$ loses its only reason for existing. Common knowledge of rationality is doing the work: player 2 must know that player 1 maximises, and player 1 must know that player 2 knows that, in order for the second round of deletion to be justified.

::: proposition Order independence for strict dominance {#prop-order-strict}
In a finite strategic-form game, the set of iteratively undominated strategies of each player does not depend on the order in which strictly dominated strategies are deleted, nor on whether several dominated strategies are deleted at once or one at a time.
:::
::: proof
Sketch. Write $U_i$ for player $i$'s strategies that survive some particular maximal sequence of deletions, and $V_i$ for those that survive another. A strategy in $U_i$ is, by construction, not strictly dominated at any round of the first sequence, hence not strictly dominated in the original game, nor in any game obtained by deleting strategies that themselves fail to survive. One shows by induction on the round of the second sequence that every strategy deleted there is also absent from $U$, so $V_i \subseteq U_i$. The symmetric argument gives $U_i \subseteq V_i$.
:::

::: quiz
In [[#ex-iesds]], why can column $C$ not be deleted in the first round?
- [ ] Because $C$ strictly dominates $L$ for player 2
- [x] Because against $B$, column $C$ gives player 2 a payoff of $5$, which is higher than $L$'s $0$ and $R$'s $1$, so $C$ is not dominated in the full game
- [ ] Because player 1 has a dominant strategy
- [ ] Because IESDS never deletes columns, only rows
::: solution
Dominance for player 2 compares columns *row by row*. Against $T$, $C$ is worse than $L$; against $M$, $C$ is worse than $L$; against $B$, $C$ is *better* than both $L$ and $R$. A strategy is strictly dominated only if it is worse against *every* opposing strategy. Until $B$ is gone, $C$ has a role. IESDS deletes rows *and* columns, for whichever player currently has a dominated strategy.
:::
:::

Dominance by a **mixture** can eliminate a strategy that no pure strategy dominates. Suppose player 1 has three rows with payoffs against two columns

$$
T \mapsto (3, 0),\qquad M \mapsto (0, 3),\qquad B \mapsto (1, 1).
$$

Neither $T$ nor $M$ strictly dominates $B$. But the mixture that plays $T$ and $M$ with probability $1/2$ each yields expected payoffs $(1.5, 1.5)$, which strictly beat $(1, 1)$. So $B$ is strictly dominated in the sense that will matter once mixed strategies are allowed: there is no belief about the column for which $B$ maximises expected payoff. Strictly speaking, [[#alg-iesds]] as stated with pure strategies would retain $B$. The fully rational procedure deletes any strategy that is not a best response to some belief, which includes dominance by mixtures. In two-player games the two procedures — iterated strict dominance by mixed strategies, and iterated deletion of never-best-replies — coincide. With three or more players they can differ, because a mixture by *several* opponents may be correlated in a way that no product of independent mixtures reproduces.

## Weak dominance

Replacing the strict inequality in [[#def-strict-dominance]] by a weak inequality, and requiring a strict inequality for at least one $s_{-i}$, gives **weak dominance**. A weakly dominated strategy is a best response to *some* beliefs (those that put probability zero on the profiles where it is strictly worse) but not to others. Deleting weakly dominated strategies is therefore a stronger, and more controversial, solution idea.

::: definition Weak dominance {#def-weak-dominance}
Strategy $s_i$ **weakly dominates** $s_i'$ if $u_i(s_i, s_{-i}) \ge u_i(s_i', s_{-i})$ for every $s_{-i}$ and $u_i(s_i, s_{-i}) > u_i(s_i', s_{-i})$ for at least one $s_{-i}$.
:::

::: example Order dependence under weak dominance {#ex-weak-order}
Consider the game

|  | $L$ | $R$ |
|---|---|---|
| $U$ | $1, 1$ | $0, 0$ |
| $M$ | $1, 1$ | $2, 0$ |
| $D$ | $0, 2$ | $2, 2$ |

(a) Show that $M$ weakly dominates $U$, and that $L$ weakly dominates $R$. (b) Delete $U$ first and continue with weak deletion; which profiles survive? (c) Delete $R$ first and continue; which profiles survive? (d) Confirm that $(U, L)$ is a mutual best-response profile, so weak deletion can discard a Nash equilibrium.
::: solution
(a) Player 1: $M$ gives $1 = 1$ against $L$ and $2 > 0$ against $R$, so $M$ weakly dominates $U$. (Also $M$ weakly dominates $D$: $1 > 0$ against $L$ and $2 = 2$ against $R$.) Player 2: $L$ gives $1 > 0$ against $U$, $1 > 0$ against $M$, and $2 = 2$ against $D$, so $L$ weakly dominates $R$.

(b) Delete $U$. The reduced game is

|  | $L$ | $R$ |
|---|---|---|
| $M$ | $1, 1$ | $2, 0$ |
| $D$ | $0, 2$ | $2, 2$ |

Now $L$ weakly dominates $R$ ($1 > 0$ against $M$ and $2 = 2$ against $D$). Delete $R$. Against the remaining column $L$, player 1 gets $1$ from $M$ and $0$ from $D$, so $M$ strictly dominates $D$. The only surviving profile is $(M, L)$ with payoffs $(1, 1)$.

(c) Delete $R$ first instead. The reduced game is a single column $L$, against which player 1 gets $1$ from $U$, $1$ from $M$, and $0$ from $D$. Delete $D$. Both $U$ and $M$ survive. The surviving profiles are $(U, L)$ and $(M, L)$.

The two orders produce different sets. That cannot happen with *strict* dominance ([[#prop-order-strict]]).

(d) Against $L$, player 1 is indifferent between $U$ and $M$ (both give $1$), so $U$ is a best response. Against $U$, player 2's unique best response is $L$ ($1 > 0$). Hence $(U, L)$ is a Nash equilibrium, and order (b) discards it.
:::
:::

The moral to keep: **iterated weak dominance depends on order**, and it can eliminate Nash equilibria. This course uses strict dominance as the default deletion procedure, and treats weak dominance as a refinement to be applied with an explicit order.

::: warning Do not delete a weakly dominated strategy and then claim uniqueness
If a textbook or an article reports "the unique outcome after deleting weakly dominated strategies", ask: unique given *which order*? And did a Nash equilibrium get thrown out? In sequential games the same issue returns as the difference between Nash equilibrium and subgame-perfect equilibrium: some Nash equilibria rely on weakly dominated behaviour off the path of play ([[game-theory/extensive-form]]).
:::

## Dominant-strategy equilibrium and the commons

When every player has a strictly dominant strategy, the profile of those strategies is a **dominant-strategy equilibrium**. It is the most demanding, and the most robust, solution concept in the course: the prediction does not depend on beliefs, on common knowledge of rationality beyond one round, or on equilibrium coordination. The prisoner's dilemma has one. So does a simple model of a **common-pool resource**.

::: example A two-player commons {#ex-commons-binary}
Two fishing crews share a lake. Each can fish **Light** or **Heavy**. Light fishing yields a catch worth $4$ to the crew that chooses it, whatever the other does, and leaves the stock healthy. Heavy fishing yields $6$ if the other crew fishes light — a large catch from a still-healthy stock — but only $2$ if both fish heavy, because the stock collapses. Payoffs:

|  | Light | Heavy |
|---|---|---|
| Light | $4, 4$ | $4, 6$ |
| Heavy | $6, 4$ | $2, 2$ |

Find each crew's dominant strategy, if it has one, and the dominant-strategy equilibrium. Compare the total catch with $(\text{Light}, \text{Light})$.
::: solution
For the row crew, Heavy gives $6 > 4$ against Light, but $2 < 4$ against Heavy. There is **no** strictly dominant strategy: the best action depends on what the other crew does. (The game is a relative of **chicken**, studied in [[game-theory/nash-equilibrium]], not a prisoner's dilemma.) Dominant-strategy equilibrium does not apply. The jointly best profile is $(\text{Light}, \text{Light})$ with total $8$; the profile $(\text{Heavy}, \text{Heavy})$ totals $4$. Without a dominant strategy we cannot yet say which profile will be played. That is the next chapter's job.
:::
:::

Changing one number turns the commons into a prisoner's dilemma. If Heavy against Heavy yields $3$ rather than $2$, and Light against Heavy yields $1$ rather than $4$, we obtain

|  | Light | Heavy |
|---|---|---|
| Light | $4, 4$ | $1, 6$ |
| Heavy | $6, 1$ | $3, 3$ |

Now Heavy strictly dominates Light for each crew ($6 > 4$ and $3 > 1$), and the dominant-strategy equilibrium is $(\text{Heavy}, \text{Heavy})$ with total catch $6$ rather than $8$. Overfishing is then the unique prediction of dominance. Elinor Ostrom's field studies of irrigation systems, inshore fisheries and alpine meadows (summarised in *Governing the Commons*, 1990) document communities that *do* sustain the analogue of $(\text{Light}, \text{Light})$, typically by monitoring, sanctions and repeated interaction — ingredients that take us outside a one-shot prisoner's dilemma, and that [[game-theory/repeated-games]] will put back in.

A **public-good** contribution game is the prisoner's dilemma with a different story. Each of $n$ players can Contribute or Not. A contribution costs the contributor $c$ and adds a benefit $b$ to *every* player, including the contributor. If $b < c < n b$, contributing raises the social surplus but is strictly dominated for each individual. The unique dominant-strategy equilibrium is that nobody contributes, and the public good is underprovided. Laboratory voluntary-contribution experiments, from Marwell and Ames (1979) onwards, find contributions well above zero in early rounds, falling toward the dominant strategy with repetition among strangers — a pattern that one-shot dominance does not explain on its own, and that social preferences, confusion and repeated-game incentives have all been invoked to explain. The positive fact is the decay toward free-riding, not the exact level.

## Evidence

Game theory is a theory of *models*, but the models are used because they organise observations.

**Laboratory prisoner's dilemmas.** In the standard one-shot PD with anonymous pairing, a substantial minority cooperate — often $20$–$40$ per cent, depending on payoffs, framing and instructions (a survey is in Camerer, *Behavioral Game Theory*, 2003, ch. 2). Cooperation is higher when the gain from defecting is small, when the game is framed as a joint project rather than a crime, and when players have met before. It is lower among experienced subjects playing for larger stakes. Dominance is a good first approximation of the *direction* of play, and a poor description of every choice.

**Penalty kicks and matching pennies**, which have no dominant strategy, are postponed to [[game-theory/mixed-strategies]]; the data there are more favourable to equilibrium than the PD data are to universal defection.

**Cartels.** The OPEC+ production agreement is a many-player prisoner's dilemma: each member's dominant short-run interest is to produce above quota, given the others' output, while all prefer that quotas be held. Compliance has varied. The International Energy Agency's monthly oil data show large gaps between pledged cuts and realised supply for some members in 2020–2023; other members have cut by more than pledged. Dominance explains the *incentive to cheat*. It does not by itself explain why the agreement sometimes binds — that requires repeated interaction, side-payments and political enforcement, which are later chapters.

**Climate agreements.** Barrett (1994, 2003) modelled international environmental agreements as a PD-like public-good game: the non-excludable benefit of abatement and the private cost produce a dominant strategy to stay outside a treaty or to under-abate inside one. The Kyoto Protocol's experience — the United States never ratified, Canada withdrew in 2011, and several parties missed targets — is often read in that light. The Paris Agreement of 2015 replaced binding allocations with nationally determined contributions, changing the game rather than solving the PD. Whether that change raises abatement is an empirical question, not a theorem.

None of these observations "tests game theory" in the sense of a single hypothesis. They test particular games with particular payoffs. Changing the payoffs — introducing repeated play, incomplete information, or social preferences — changes the prediction. That is a feature of the framework, and it is why the next eight chapters exist.

## Where this leads

Dominance is the right first tool because it asks so little: only that players do not use strategies that are worse no matter what. When it delivers a unique profile, as in the prisoner's dilemma, the argument stops. When it does not, we need a solution concept that allows each player's choice to *depend* on the others'. That concept is Nash equilibrium ([[game-theory/nash-equilibrium]]): a profile in which every strategy is a best response to the rest. Mixed strategies ([[game-theory/mixed-strategies]]) extend best responses to beliefs. Continuous actions ([[game-theory/continuous-games]]) take the same idea to quantities and locations. Sequential moves, bargaining, repetition, hidden types and signalling occupy the rest of the course.

Applications continue in [[industrial-organisation]] (pricing, entry, collusion), [[information-economics]] (contracts, moral hazard) and [[market-design]] (auctions, matching). The public-good and commons structure is taken up with instruments in [[public-economics]] and [[environmental-economics]].

::: history
The prisoner's dilemma was formalised in 1950 by Merrill Flood and Melvin Dresher at the RAND Corporation, in an experiment with two colleagues as subjects; Albert Tucker supplied the anecdote of the two prisoners and the name. Dominance as a solution idea is older: it is implicit in Cournot's 1838 duopoly (each firm's best quantity against the other) and explicit in von Neumann and Morgenstern's 1944 *Theory of Games and Economic Behavior*, which treated domination as a preliminary reduction of a game. The systematic study of iterated dominance and its relation to common knowledge of rationality is due to Bernheim (1984) and Pearce (1984), who defined **rationalisability** — the strategies that survive iterated deletion of never-best-replies. In two-player games, rationalisability coincides with iterated strict dominance by mixed strategies.
:::

::: summary
- A finite strategic-form game specifies players, strategy sets and payoffs; two-player games are written as bimatrices, with the row player's payoff first ([[#def-strategic-form]]).
- Strategy $s_i$ strictly dominates $s_i'$ if it pays strictly more against every opposing profile. A strictly dominated strategy is never a best response to any belief ([[#prop-never-br]]).
- When every player has a strictly dominant strategy, the profile of those strategies is a dominant-strategy equilibrium. The prisoner's dilemma and the linear public-good game are the leading examples: individually rational play is jointly inefficient.
- Iterated elimination of strictly dominated strategies ([[#alg-iesds]]) is order-independent ([[#prop-order-strict]]) and captures common knowledge of rationality. Dominance by a mixture can eliminate a strategy that no pure strategy dominates.
- Weak dominance is order-dependent and can discard Nash equilibria; use it only with an explicit order.
- Dominance is a property of one player's strategies, not of a cell that both players like. Pareto rankings of profiles answer a different question.
:::

## Exercises

::: exercise Advertising payoffs {level=1}
In [[#ex-advertising]], suppose the campaign cost falls, so that simultaneous advertising now yields $2$ each rather than $1$, and a sole advertiser earns $6$ rather than $5$. The quiet-quiet payoffs remain $3, 3$, and a silent firm facing an advertiser still earns $0$. Does Advertise remain strictly dominant? What is the dominant-strategy equilibrium, if any?
::: solution
The new bimatrix is

|  | Quiet | Advertise |
|---|---|---|
| Quiet | $3, 3$ | $0, 6$ |
| Advertise | $6, 0$ | $2, 2$ |

For the row firm, $6 > 3$ and $2 > 0$, so Advertise still strictly dominates Quiet. The same holds for the column firm. The dominant-strategy equilibrium remains $(\text{Advertise}, \text{Advertise})$, now with payoffs $(2, 2)$. Lowering the cost of the campaign does not remove the dilemma; it makes the inefficient outcome slightly less painful.
:::
:::

::: exercise A public-good contribution {level=1 check="0"}
Each of two players can contribute $1$ or $0$ to a public good. Player $i$'s payoff is $u_i = 3(x_1 + x_2) - 4 x_i$, where $x_i \in \{0, 1\}$. Write the bimatrix (row player is player 1). Does either player have a strictly dominant strategy? How many units are contributed in the dominant-strategy equilibrium? (Enter the total number of units contributed in that equilibrium.)
::: solution
Expanding, $u_1 = 3x_2 - x_1$ and $u_2 = 3x_1 - x_2$. The bimatrix, with rows $x_1 = 1, 0$ and columns $x_2 = 1, 0$:

|  | Contribute | Not |
|---|---|---|
| Contribute | $2, 2$ | $-1, 3$ |
| Not | $3, -1$ | $0, 0$ |

For player 1, Not gives $3 > 2$ against Contribute and $0 > -1$ against Not, so Not strictly dominates Contribute. The same holds for player 2. The dominant-strategy equilibrium is $(0, 0)$: **zero** units are contributed. The socially efficient profile is $(1, 1)$, with total surplus $4 > 0$. The gap $c - b = 4 - 3 = 1$ is the private loss on a contribution; the social gain is $2b - c = 2 > 0$.
:::
:::

::: exercise Strict dominance in a $2\times 3$ game {level=1}
Player 1 has rows $T, B$; player 2 has columns $L, C, R$. Payoffs:

|  | $L$ | $C$ | $R$ |
|---|---|---|---|
| $T$ | $4, 1$ | $1, 2$ | $3, 0$ |
| $B$ | $3, 3$ | $2, 1$ | $0, 2$ |

Which of player 2's strategies, if any, are strictly dominated? After deleting them, does player 1 have a strictly dominant strategy in the reduced game?
::: solution
Player 2's payoffs: $L$ gives $1, 3$; $C$ gives $2, 1$; $R$ gives $0, 2$. Compare $L$ and $R$: $1 > 0$ against $T$ but $3 > 2$ against $B$, so $L$ is better in both rows — $L$ strictly dominates $R$. Column $C$ versus $L$: $2 > 1$ against $T$ but $1 < 3$ against $B$, so neither dominates. Column $C$ versus $R$: $2 > 0$ against $T$ but $1 < 2$ against $B$, so neither dominates. Delete $R$.

In the reduced game with columns $L, C$, player 1's payoffs are $4, 1$ in $T$ and $3, 2$ in $B$. Neither row dominates: $4 > 3$ against $L$ but $1 < 2$ against $C$. Player 1 has no strictly dominant strategy in the reduced game.
:::
:::

::: exercise IESDS, three strategies {level=2}
Run IESDS on the game of [[#ex-iesds]], but with player 2's payoff in the cell $(B, C)$ changed from $5$ to $0$. Does the first-round deletion change? What survives?
::: hint
Re-check whether $B$ is still strictly dominated, and whether $C$ is dominated *before* any deletion.
:::
::: solution
The new cell $(B, C)$ is $(0, 0)$. Player 1's payoffs are unchanged, so $T$ still strictly dominates $B$ ($3 > 1$, $2 > 0$, $4 > 3$). First-round deletion of $B$ is unchanged.

Player 2's columns in the *original* game are now $L \mapsto (3, 4, 0)$, $C \mapsto (1, 2, 0)$, $R \mapsto (2, 3, 1)$. Does $L$ dominate $C$? Yes: $3 > 1$, $4 > 2$, $0 = 0$ — this is only *weak* dominance, because of the tie against $B$. Strict dominance requires a strict inequality in every row, so $C$ is **not** strictly dominated in the full game. Does $L$ dominate $R$? $3 > 2$, $4 > 3$, but $0 < 1$ against $B$, so no. Does $C$ dominate $R$? $1 < 2$, $2 < 3$, $0 < 1$ — $R$ is better everywhere, so $R$ strictly dominates $C$. First-round deletion now includes $C$ (by $R$), as well as $B$ (by $T$).

After deleting $B$ and $C$, the game is rows $T, M$ and columns $L, R$:

|  | $L$ | $R$ |
|---|---|---|
| $T$ | $3, 3$ | $4, 2$ |
| $M$ | $2, 4$ | $1, 3$ |

Player 1: $T$ strictly dominates $M$ ($3 > 2$ and $4 > 1$). Delete $M$. Player 2 then faces $L \mapsto 3$ versus $R \mapsto 2$ against $T$, so $L$ strictly dominates $R$. The survivor is again $(T, L)$. The path of deletion changed; the endpoint did not, as [[#prop-order-strict]] requires for *strict* dominance. (We did use a different first-round set, which is allowed.)
:::
:::

::: exercise Dominance by a mixture {level=2}
Player 1 has three strategies with payoffs against player 2's $L$ and $R$:

|  | $L$ | $R$ |
|---|---|---|
| $T$ | $4, 1$ | $0, 2$ |
| $M$ | $0, 2$ | $4, 1$ |
| $B$ | $1, 0$ | $1, 0$ |

Show that no *pure* strategy of player 1 strictly dominates $B$, but that the mixture $\frac12 T + \frac12 M$ does. What is player 1's expected payoff from that mixture, against $L$ and against $R$?
::: solution
Against $L$, $T$ gives $4 > 1$ but against $R$, $T$ gives $0 < 1$, so $T$ does not dominate $B$. Against $L$, $M$ gives $0 < 1$ but against $R$, $M$ gives $4 > 1$, so $M$ does not dominate $B$. The mixture $\sigma_1 = \frac12 T + \frac12 M$ yields expected payoff $\frac12 \cdot 4 + \frac12 \cdot 0 = 2$ against $L$, and $\frac12 \cdot 0 + \frac12 \cdot 4 = 2$ against $R$. In both columns $2 > 1$, so $\sigma_1$ strictly dominates $B$. Player 1, whatever belief is held about the column, gets a strictly higher expected payoff from $\sigma_1$ than from $B$.
:::
:::

::: exercise Affine transformations {level=2}
Take the prisoner's dilemma of [[#ex-pd]] and replace the row player's payoffs $u_1$ by $2u_1 + 7$, leaving the column player's payoffs unchanged. Does the row player still have a strictly dominant strategy? Does the column player? What happens if instead you multiply the row player's payoffs by $-1$?
::: solution
The new row payoffs are: $2(-1)+7 = 5$ in $(\text{C},\text{C})$; $2(-5)+7 = -3$ in $(\text{C},\text{D})$; $2(0)+7 = 7$ in $(\text{D},\text{C})$; $2(-3)+7 = 1$ in $(\text{D},\text{D})$. Comparing Defect with Cooperate: $7 > 5$ against Cooperate, and $1 > -3$ against Defect. Defect remains strictly dominant for the row player. The column player's payoffs are unchanged, so Defect remains strictly dominant for the column player too. An affine transformation $u \mapsto \alpha u + \beta$ with $\alpha > 0$ preserves the ranking of a player's strategies against every opposing profile, hence preserves strict dominance.

If instead the row payoffs are multiplied by $-1$, the ranking *reverses*: Cooperate then strictly dominates Defect for the row player (because $-(-1) > -0$ is false wait — originally Defect was better, so after multiplying by $-1$ Cooperate is better). Explicitly, row payoffs become $1$ in $(\text{C},\text{C})$, $5$ in $(\text{C},\text{D})$, $0$ in $(\text{D},\text{C})$, $3$ in $(\text{D},\text{D})$. Cooperate gives $1 > 0$ against Cooperate and $5 > 3$ against Defect. A decreasing transformation does **not** preserve dominance. This is why one may not treat "years in prison" and "utility" as interchangeable without flipping the objective from minimise to maximise.
:::
:::

::: exercise A three-player public good {level=3}
Three players each choose $x_i \in \{0, 1\}$. Payoffs are $u_i = 2(x_1 + x_2 + x_3) - 3 x_i$. Show that $x_i = 0$ is strictly dominant for each $i$. Compute the payoff of each player at the dominant-strategy equilibrium and at the profile $(1, 1, 1)$. By how much would a player gain from a unilateral deviation from $(1, 1, 1)$?
::: hint
Write $u_i = 2 x_{-i} - x_i$, where $x_{-i}$ is the sum of the others' contributions, and compare $x_i = 1$ with $x_i = 0$ for each possible $x_{-i} \in \{0, 1, 2\}$.
:::
::: solution
The others contribute $x_{-i} \in \{0, 1, 2\}$. Then $u_i(1, x_{-i}) = 2(x_{-i} + 1) - 3 = 2x_{-i} - 1$ and $u_i(0, x_{-i}) = 2x_{-i}$. The difference is $u_i(0) - u_i(1) = 1 > 0$ for every $x_{-i}$. So $x_i = 0$ strictly dominates $x_i = 1$. The dominant-strategy equilibrium is $(0, 0, 0)$, with payoff $0$ each. At $(1, 1, 1)$ each player gets $2\cdot 3 - 3 = 3$. A unilateral deviation to $0$ yields $2\cdot 2 - 0 = 4$, a private gain of $1$, while the other two players fall from $3$ to $2\cdot 2 - 3 = 1$. Total surplus falls from $9$ to $6$. The game is a three-player prisoner's dilemma.
:::
:::

::: exercise Weak dominance and two survivors {level=3}
Consider

|  | $L$ | $R$ |
|---|---|---|
| $T$ | $1, 1$ | $0, 0$ |
| $B$ | $1, 0$ | $1, 1$ |

(a) Show that $B$ weakly dominates $T$, and that $R$ is not weakly dominated. (b) Find all profiles in which each player's strategy is a best response to the other (pure-strategy Nash equilibria). (c) Which of those profiles survive the deletion of weakly dominated strategies of player 1?
::: hint
A strategy is a best response to a particular opposing strategy if it maximises payoff against it, allowing ties.
:::
::: solution
(a) Player 1: $B$ gives $1 = 1$ against $L$ and $1 > 0$ against $R$, so $B$ weakly dominates $T$. Player 2: $L$ gives $1 > 0$ against $T$ and $0 < 1$ against $B$, so neither column weakly dominates the other.

(b) Against $L$, player 1 is indifferent ($1 = 1$), so both $T$ and $B$ are best responses. Against $R$, only $B$ is a best response. Against $T$, player 2's unique best response is $L$ ($1 > 0$). Against $B$, player 2's unique best response is $R$ ($1 > 0$). Therefore the mutual best-response profiles are $(T, L)$ and $(B, R)$.

(c) Deleting the weakly dominated $T$ leaves only row $B$, against which player 2 plays $R$. The survivor is $(B, R)$. The equilibrium $(T, L)$ is discarded. This is the phenomenon of [[#ex-weak-order]]: weak deletion can eliminate a Nash equilibrium.
:::
:::

::: exercise From a story to a bimatrix {level=2}
Two countries, $A$ and $B$, choose whether to **Abate** or **Emit**. Abatement costs a country $5$ and reduces climate damages by $4$ for *each* country (including itself). Damages if both emit are $6$ each; these are the baseline, already netted so that the payoff when both emit is $-6$. Write the payoff bimatrix, taking payoff as $-({\text{own cost}} + {\text{own damage}})$, with own damage equal to $6 - 4 \times ({\text{number of countries that abate}})$. Does Abate strictly dominate, or is it strictly dominated? Interpret.
::: solution
Number of abaters $k \in \{0, 1, 2\}$. Damage to each country is $6 - 4k$. Cost is $5$ if that country abates and $0$ otherwise.

- Both emit: $k = 0$, payoff $-6$ each.
- $A$ abates, $B$ emits: $k = 1$, $A$ gets $-(5 + 6 - 4) = -7$, $B$ gets $-(0 + 6 - 4) = -2$.
- Both abate: $k = 2$, payoff $-(5 + 6 - 8) = -3$ each.

|  | Abate | Emit |
|---|---|---|
| Abate | $-3, -3$ | $-7, -2$ |
| Emit | $-2, -7$ | $-6, -6$ |

For $A$, Emit gives $-2 > -3$ against Abate and $-6 > -7$ against Emit. Emit strictly dominates Abate. The dominant-strategy equilibrium is $(\text{Emit}, \text{Emit})$ with payoffs $(-6, -6)$, which both countries rank below $(-3, -3)$. The private cost of abatement ($5$) exceeds the private damage reduction ($4$), so abatement is strictly dominated even though it is jointly beneficial ($8$ of damage reduction for a total cost of $10$ wait — two countries abating cost $10$ and cut damages by $8$ *each*, i.e. $16$ of damage reduction in total, so the joint surplus rises by $6$). The game is a prisoner's dilemma. International climate policy, in this cartoon, cannot rely on a dominant strategy to abate.
:::
:::
