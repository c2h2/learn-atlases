Two pedestrians approach a narrow doorway from opposite sides. Each prefers to walk through rather than wait, but a collision is worse than waiting. If both wait, they look foolish and still delay. There is no dominant strategy: waiting is best if the other walks, and walking is best if the other waits. Dominance, the tool of [[game-theory/strategic-games]], is silent. What can we say?

**Nash equilibrium** answers with a consistency requirement. A profile is a Nash equilibrium when each player's strategy is a **best response** to the others': nobody would wish to change their own choice, given what the others are doing. In the doorway, there are two such profiles — one pedestrian walks and the other waits — and a third in mixed strategies, postponed to the next chapter. The definition does not pick among them. It only discards profiles in which somebody is playing a non-best response.

The same logic organises coordination (which side of the road to drive on, which technical standard to adopt), conflict (the doorway, or two firms that can fight or share a market), and the voluntary provision of a public good when contributing is *not* dominated. This chapter stays with **pure strategies**: each player chooses one action for sure. Mixed strategies, in which players randomise, come next.

## Best responses

Fix the others at $s_{-i}$. Player $i$ then has an ordinary decision problem.

::: definition Best response {#def-best-response}
A strategy $s_i \in S_i$ is a **best response** to $s_{-i}$ if

$$
u_i(s_i, s_{-i}) \ge u_i(s_i', s_{-i}) \qquad \text{for every } s_i' \in S_i.
$$

The **best-response correspondence** $BR_i(s_{-i})$ is the set of all such $s_i$. In a finite game $BR_i(s_{-i})$ is non-empty: it is the set of maximisers of a function on a finite set.
:::

In a bimatrix, best responses are easy to mark by hand. For each column, underline player 1's highest payoff in that column; for each row, underline player 2's highest payoff in that row. A cell in which *both* payoffs are underlined is a mutual best response.

::: example Underlining in a $2\times 2$ game {#ex-underline}
The doorway game, with Walk and Wait:

|  | Walk | Wait |
|---|---|---|
| Walk | $0, 0$ | $3, 1$ |
| Wait | $1, 3$ | $1, 1$ |

A collision pays $0$ each; walking through while the other waits pays $3$ to the walker and $1$ to the waiter (who is delayed but unhurt); both waiting pays $1$ each. Find every best response and every cell in which both payoffs are best responses.
::: solution
Against Walk, the row player's payoffs are $0$ (Walk) and $1$ (Wait), so $BR_1(\text{Walk}) = \{\text{Wait}\}$. Against Wait, they are $3$ and $1$, so $BR_1(\text{Wait}) = \{\text{Walk}\}$. By symmetry, $BR_2(\text{Walk}) = \{\text{Wait}\}$ and $BR_2(\text{Wait}) = \{\text{Walk}\}$. The cells in which both strategies are best responses are $(\text{Walk}, \text{Wait})$ with payoffs $(3, 1)$ and $(\text{Wait}, \text{Walk})$ with $(1, 3)$. The cells $(\text{Walk}, \text{Walk})$ and $(\text{Wait}, \text{Wait})$ each contain a player who would strictly prefer to switch.
:::
:::

The correspondence $BR_i$ is a *set*-valued map because of ties. In [[#ex-underline]] it happens to be single-valued. In a coordination game with equal payoffs on the diagonal it will not be.

## Nash equilibrium

::: definition Pure-strategy Nash equilibrium {#def-nash}
A strategy profile $s^* \in S$ is a **pure-strategy Nash equilibrium** if $s_i^* \in BR_i(s_{-i}^*)$ for every player $i$. Equivalently,

$$
u_i(s_i^*, s_{-i}^*) \ge u_i(s_i, s_{-i}^*) \qquad \text{for every } i \text{ and every } s_i \in S_i.
$$

No player has a profitable **unilateral** deviation.
:::

The word *unilateral* matters. The definition does not say that the players could not *jointly* do better. In the prisoner's dilemma of [[game-theory/strategic-games#ex-pd]], $(\text{Defect}, \text{Defect})$ is the unique Nash equilibrium, and both players prefer $(\text{Cooperate}, \text{Cooperate})$. An equilibrium can be Pareto-dominated. What it cannot be is a profile from which one player, acting alone, would wish to leave.

::: proposition Dominant-strategy profiles are Nash equilibria {#prop-ds-ne}
If $s_i^*$ is strictly dominant for every $i$, then $s^*$ is the unique pure-strategy Nash equilibrium. If $s_i^*$ is only weakly dominant for every $i$, then $s^*$ is a Nash equilibrium, but there may be others.
:::
::: proof
If $s_i^*$ is strictly dominant, then $BR_i(s_{-i}) = \{s_i^*\}$ for every $s_{-i}$, so in particular $s_i^* \in BR_i(s_{-i}^*)$, and no other profile can have this property for player $i$. If $s_i^*$ is only weakly dominant, it is still a best response to $s_{-i}^*$, so $s^*$ is a Nash equilibrium; another strategy that ties with $s_i^*$ against $s_{-i}^*$ may form a second equilibrium with some configuration of the others.
:::

So every dominant-strategy prediction from the previous chapter is inherited. Nash equilibrium is the more general concept: it applies when best responses *depend* on what the others do.

::: example Stag hunt {#ex-stag}
Two hunters can hunt a **Stag** or a **Hare**. A stag is caught only if both hunt it, and then each gets $5$. A hare is caught alone and pays $3$, regardless of the other. A hunter who hunts stag while the other hunts hare gets $0$. The bimatrix is

|  | Stag | Hare |
|---|---|---|
| Stag | $5, 5$ | $0, 3$ |
| Hare | $3, 0$ | $3, 3$ |

Find all pure-strategy Nash equilibria. Which is Pareto efficient? Which is the maxmin profile (each player maximises the worst-case payoff)?
::: solution
Against Stag, Stag pays $5 > 3$, so $BR_1(\text{Stag}) = \{\text{Stag}\}$. Against Hare, Hare pays $3 > 0$, so $BR_1(\text{Hare}) = \{\text{Hare}\}$. The game is symmetric. Mutual best responses: $(\text{Stag}, \text{Stag})$ and $(\text{Hare}, \text{Hare})$. Both are Nash equilibria. The profile $(5, 5)$ Pareto-dominates $(3, 3)$: both hunters strictly prefer it. It is the unique Pareto-efficient profile among the four (the off-diagonal profiles give someone $0$).

The worst-case payoff of Stag is $0$; of Hare, $3$. Maxmin therefore selects Hare, and $(\text{Hare}, \text{Hare})$ is the maxmin profile. Risk, in the sense of the worst possible payoff, points to the inefficient equilibrium. This is Rousseau's stag hunt (*Discourse on Inequality*, 1755) as a game: the social contract pays only if it is expected to be honoured.
:::
:::

::: widget plot
f: 5*x; 3
x: 0, 1
y: 0, 6
labels: \text{Stag}; \text{Hare}
caption: Horizontal axis: probability that the other hunter hunts stag. Vertical axis: expected payoff. Stag is the unique best response when the probability exceeds $3/5$; Hare is unique below $3/5$; both are best responses at $3/5$. The two pure equilibria sit at the endpoints. Drag along the axis and watch the ranking switch.
:::

The figure is the best-response picture for a $2\times 2$ game with no dominant strategy. The threshold $3/5$ is where the two expected payoffs meet: $5x = 3$. Beliefs above the threshold support the efficient equilibrium; beliefs below it support the inefficient one. Nash equilibrium does not say how those beliefs form. That is a genuine gap, not an oversight, and it is why refinements, evolutionary arguments and experiments all have something to add.

::: warning Equilibrium is not "the best cell"
Students sometimes pick the cell with the largest payoffs and call it the equilibrium. In [[#ex-stag]] that happens to work. In the prisoner's dilemma it fails: the best cell is not an equilibrium, and the equilibrium is not the best cell. Always check the best-response definition. A related error is to look for a cell that is "best for both" *row by row and column by column at once* without fixing the other's strategy. Best response fixes $s_{-i}$ first.
:::

## Coordination and conflict

Two families of $2\times 2$ games organise a large part of applied work.

**Pure coordination.** Payoffs are high when the players match and low when they mismatch. Driving on the left or the right is the stock example: $(\text{Left}, \text{Left})$ and $(\text{Right}, \text{Right})$ are both equilibria, and they are equally good. **Battle of the sexes** (a dated name, kept because it is the standard label) is coordination with a conflict of interest over *which* equilibrium: two people wish to meet, one prefers the opera and the other a football match, and both prefer meeting to missing each other.

::: example Battle of the sexes {#ex-bos}
|  | Opera | Match |
|---|---|---|
| Opera | $2, 1$ | $0, 0$ |
| Match | $0, 0$ | $1, 2$ |

Find the pure-strategy Nash equilibria. Compute each player's payoff in each. Is there a profile that both prefer to both equilibria?
::: solution
Against Opera, Opera pays $2 > 0$; against Match, Match pays $1 > 0$. So $BR_1(\text{Opera}) = \{\text{Opera}\}$ and $BR_1(\text{Match}) = \{\text{Match}\}$. For player 2, $BR_2(\text{Opera}) = \{\text{Opera}\}$ and $BR_2(\text{Match}) = \{\text{Match}\}$. The pure equilibria are $(\text{Opera}, \text{Opera})$ with payoffs $(2, 1)$ and $(\text{Match}, \text{Match})$ with $(1, 2)$. Player 1 prefers the first, player 2 the second. Both prefer either equilibrium to mismatching at $(0, 0)$. There is no profile that *both* prefer to *both* equilibria: that would require a cell beating $2$ for player 1 and $2$ for player 2, and no cell has $(2, 2)$. The players have a common interest in coordinating and a conflicting interest in which way to coordinate.
:::
:::

Standards and network goods look like battle of the sexes when each firm has a preferred standard but both prefer a single standard to a split market. The QWERTY keyboard, the gauge of railway tracks, and the contest between VHS and Betamax are the usual stories; the historical record on each is more complicated than the $2\times 2$ game (David 1985 on QWERTY is the classic, and Liebowitz and Margolis 1990 the sceptical reply). The game is useful as a structure, not as a verdict on those cases.

**Conflict: chicken.** Two players can Swerve or Straight. The best outcome is that the other swerves while you go straight; the worst is that both go straight. This is the doorway game of [[#ex-underline]], or two firms that can enter a market that profitably holds only one of them.

::: example Chicken {#ex-chicken}
|  | Swerve | Straight |
|---|---|---|
| Swerve | $2, 2$ | $1, 3$ |
| Straight | $3, 1$ | $0, 0$ |

Find the pure-strategy Nash equilibria. Contrast them with the equilibria of [[#ex-stag]].
::: solution
Against Swerve, Straight pays $3 > 2$; against Straight, Swerve pays $1 > 0$. So $BR_1(\text{Swerve}) = \{\text{Straight}\}$ and $BR_1(\text{Straight}) = \{\text{Swerve}\}$. The pure equilibria are the off-diagonal cells $(\text{Straight}, \text{Swerve})$ and $(\text{Swerve}, \text{Straight})$, with payoffs $(3, 1)$ and $(1, 3)$. Unlike the stag hunt, the *matched* profiles are not equilibria, and the two equilibria disagree about who gets the large payoff. Chicken is a game of anti-coordination: the players must choose *different* actions. The doorway, a one-lane bridge, and the game of chicken that gave the name (two cars driving at each other) all have this structure.
:::
:::

::: quiz
A country can Keep or Scrap a weapons programme; its neighbour has the same choice. Payoffs: both Keep pays $1$ each (an expensive standoff); both Scrap pays $3$ each (a peace dividend); one Keeps while the other Scraps pays $2$ to the keeper and $0$ to the scrap-er. What is this game?
- [ ] A prisoner's dilemma, because Keep strictly dominates
- [x] A stag hunt: $(\text{Keep}, \text{Keep})$ and $(\text{Scrap}, \text{Scrap})$ are both Nash equilibria, and both prefer the latter
- [ ] Chicken, because the equilibria are the mismatched cells
- [ ] A game with no pure-strategy Nash equilibrium
::: solution
Against Keep, Keep pays $1 > 0$, so Keep is the unique best response to Keep. Against Scrap, Scrap pays $3 > 2$, so Scrap is the unique best response to Scrap. The pure Nash equilibria are therefore the two matched profiles. Both countries prefer $(3, 3)$ to $(1, 1)$, so $(\text{Scrap}, \text{Scrap})$ Pareto-dominates the other equilibrium. That is a stag hunt (an assurance game). Keep does *not* dominate: it is worse than Scrap when the neighbour scraps. The mismatched cells are not equilibria, so it is not chicken. If the keeper's payoff against Scrap were $4$ rather than $2$, Keep would dominate and the game would become a prisoner's dilemma.
:::
:::

## Public goods and the volunteer's dilemma

Not every public-good game is a prisoner's dilemma. If a *single* contribution is enough to provide the good — a bridge built, a whistle blown, a night-watchman hired — the game is a **volunteer's dilemma**, which is chicken with more players.

::: example Volunteer's dilemma, two players {#ex-volunteer}
A village well will be repaired if at least one household pays a cost of $4$. The repaired well is worth $6$ to each household. If nobody pays, payoffs are $0$. A household that pays while the other also pays still enjoys the well but has wasted a duplicate cost. Payoffs:

|  | Repair | Not |
|---|---|---|
| Repair | $2, 2$ | $2, 6$ |
| Not | $6, 2$ | $0, 0$ |

Find the pure-strategy Nash equilibria. Is $(\text{Repair}, \text{Repair})$ an equilibrium? What total surplus does each equilibrium produce?
::: solution
Against Repair, Not pays $6 > 2$, so the unique best response to Repair is Not. Against Not, Repair pays $2 > 0$, so the unique best response to Not is Repair. The pure equilibria are $(\text{Repair}, \text{Not})$ and $(\text{Not}, \text{Repair})$, each with total surplus $8$. The profile $(\text{Repair}, \text{Repair})$ totals $4$ and is not an equilibrium: each household would prefer to free-ride. The profile $(\text{Not}, \text{Not})$ totals $0$ and is not an equilibrium: each would prefer to repair alone. Exactly one household repairs. The game is chicken, and the "good" that both repair is wasteful rather than, as in the stag hunt, efficient.
:::
:::

With $n$ households the same logic gives $n$ pure equilibria, in each of which exactly one household repairs. There is also a symmetric mixed equilibrium in which each repairs with a small probability, and the probability that the well goes unrepaired is then strictly positive. Diekmann (1985) introduced the volunteer's dilemma; laboratory play shows more volunteering than the mixed equilibrium predicts, and less than would maximise the group's payoff.

A **threshold public good** — the good is provided if and only if at least $k$ of $n$ players contribute — interpolates. If $k = n$, the game is a stag hunt: contributing is a best response only if everyone else contributes. If $k = 1$, it is a volunteer's dilemma. If the good is *additive* in contributions and $b < c < n b$, we are back in the prisoner's dilemma of the previous chapter. The Nash equilibria change with that technology, even though the story is "a public good" in every case. Writing the bimatrix, or the payoff function, is not optional.

## Existence, multiplicity and selection

Does a pure-strategy Nash equilibrium always exist? No.

::: example Matching pennies has no pure equilibrium {#ex-matching-pennies}
Two players each show Heads or Tails. Player 1 wins $1$ from player 2 if they match; player 2 wins $1$ from player 1 if they differ:

|  | Heads | Tails |
|---|---|---|
| Heads | $1, -1$ | $-1, 1$ |
| Tails | $-1, 1$ | $1, -1$ |

Show that no cell is a Nash equilibrium.
::: solution
Against Heads, player 1 wants Heads ($1 > -1$); against Tails, Tails. Against Heads, player 2 wants Tails ($1 > -1$); against Tails, Heads. In every cell, exactly one player is not playing a best response. There is no pure-strategy Nash equilibrium. The mixed-strategy equilibrium — each player randomises $1/2, 1/2$ — is the subject of [[game-theory/mixed-strategies]].
:::
:::

Finite games *do* always have a Nash equilibrium in mixed strategies (Nash 1950, 1951). Games with continuous strategy sets have a pure-strategy equilibrium under conditions — compactness, continuity, quasiconcavity — that [[game-theory/continuous-games]] will state. The matching-pennies example is the reason mixed strategies are not a refinement; they are needed for existence.

When several equilibria exist, the definition is silent. Three selection ideas are used in applications, none of them part of the definition.

- **Pareto dominance.** In the stag hunt, $(5, 5)$ Pareto-dominates $(3, 3)$. Selecting the Pareto-dominant equilibrium is a convention, and it fails in chicken, where the two equilibria are not ranked by Pareto.
- **Risk dominance** (Harsanyi and Selten 1988). In a symmetric $2\times 2$ game, the risk-dominant equilibrium is the one whose basin of attraction — the set of beliefs for which it is a best response — is larger. In [[#ex-stag]] Hare is risk-dominant, because the threshold $3/5$ lies above $1/2$: more than half of the beliefs support Hare. Experiments on stag-hunt games (a survey is in Devetag and Ortmann, *Experimental Economics*, 2007) often settle on the risk-dominant, inefficient equilibrium, especially in large groups.
- **Focal points** (Schelling, *The Strategy of Conflict*, 1960). If the strategies have labels in ordinary language — "meet at the station", "drive on the right" — players may coordinate on a salient equilibrium without communicating. Schelling's informal experiments with New York meeting places remain the illustration; there is no theorem.

::: intuition Equilibrium as a consistent prediction
A useful way to read [[#def-nash]] is as a requirement on the *analyst*. If you predict $s^*$, and the players are maximising and know the prediction, then the prediction had better satisfy $s_i^* \in BR_i(s_{-i}^*)$. Otherwise a player would not go along. The definition does not explain *how* the prediction becomes known. In a game played every day, with public outcomes, one can tell a learning story. In a one-shot game among strangers, one cannot. That limitation is why we still compute equilibria: they are the predictions that would not immediately collapse if believed.
:::

## Evidence

**Coordination in the laboratory.** Van Huyck, Battalio and Beil (1990, *American Economic Review*) ran a "minimum-effort" game: $n$ players choose effort in $\{1, \dots, 7\}$, and each player's payoff rises with the *minimum* effort in the group and falls with own effort. The game is a stag hunt with seven equilibria, ranked by Pareto. Groups of 14–16 quickly collapsed to the lowest-effort equilibrium; pairs often coordinated on higher equilibria. The result is one of the most replicated in experimental game theory: group size and the risk of being the sole high-effort player destroy the Pareto-dominant equilibrium.

**Chicken and entry.** Two firms considering entry into a natural monopoly — a local broadband network, a single licensed casino — play chicken. Field outcomes are mixed: sometimes one firm enters and the other stays out (an equilibrium), sometimes both enter and lose money (not an equilibrium, but a possible mistake or a fight for later markets), sometimes neither enters. The pure-strategy theory predicts the first; mixed strategies and repeated-game reputation predict a richer pattern.

**Driving conventions.** Which side of the road a country drives on is a pure coordination equilibrium. Sweden's switch from left to right on 3 September 1967 (Dagen H) is a rare controlled change of equilibrium, ordered by the state. Accidents fell in the following months (Swedish official statistics from the period), consistent with a coordinated jump rather than a slow drift. The example shows that a public coordinating device can select among equilibria; it is not evidence that players always find one.

None of these studies claims that Nash equilibrium describes every choice. They claim that the *structure* — best responses, multiple equilibria, risk versus payoff dominance — organises the data better than dominance alone.

## Where this leads

Pure-strategy Nash equilibrium is the workhorse, and it is incomplete in two directions. Matching pennies has no pure equilibrium; [[game-theory/mixed-strategies]] supplies one, and with it the indifference principle used in inspection games and penalty kicks. Cournot duopoly, Hotelling location and the tragedy of the commons have *continuous* actions; [[game-theory/continuous-games]] computes best-response *functions* and applies a fixed-point theorem. Sequential moves make some Nash equilibria incredible: a chain-store's threat to fight every entrant is a Nash equilibrium of the strategic form and fails backward induction ([[game-theory/extensive-form]]). Applications to oligopoly continue in [[industrial-organisation/cournot-bertrand]]; public goods and the commons return, with instruments, in [[public-economics]] and [[environmental-economics]].

::: history
Antoine Cournot's 1838 duopoly is a Nash equilibrium in all but name: each producer's quantity maximises profit given the other's quantity. John Nash's 1950 PNAS note, "Equilibrium points in $n$-person games", defined the concept for finite games and announced an existence proof via the Kakutani fixed-point theorem; the full argument is in *Annals of Mathematics* (1951). Nash wrote as a mathematician; the uptake in economics ran through the 1970s and 1980s, as applied theory in industrial organisation and mechanism design started to need a solution concept that could handle oligopoly, auctions and contracts. Reinhard Selten's 1994 Nobel lecture emphasises how much of that applied work uses *refinements* of Nash equilibrium, not the raw definition — a theme of the extensive-form chapters below. Harsanyi and Selten's *A General Theory of Equilibrium Selection in Games* (1988) is the systematic attempt to pick one equilibrium when there are many; it is not a consensus.
:::

::: summary
- A best response to $s_{-i}$ maximises $u_i(\cdot, s_{-i})$. In a bimatrix, underline column maxima for the row player and row maxima for the column player ([[#def-best-response]]).
- A pure-strategy Nash equilibrium is a profile of mutual best responses: no unilateral deviation pays ([[#def-nash]]). A dominant-strategy equilibrium is always Nash; the converse is false ([[#prop-ds-ne]]).
- The prisoner's dilemma has a unique, inefficient Nash equilibrium. The stag hunt has two pure equilibria, ranked by Pareto. Chicken (and the volunteer's dilemma) has two pure equilibria in which the players choose *different* actions. Battle of the sexes has two pure equilibria that the players rank differently.
- Matching pennies has no pure-strategy Nash equilibrium. Finite games always have a mixed-strategy equilibrium; that is the next chapter.
- Multiplicity is the rule, not the exception. Pareto dominance, risk dominance and focal points are selection devices, not part of the definition. Laboratory minimum-effort games often select the risk-dominant equilibrium as groups grow.
:::

## Exercises

::: exercise Underline the equilibria {level=1}
Find all pure-strategy Nash equilibria of

|  | $L$ | $C$ | $R$ |
|---|---|---|---|
| $T$ | $2, 2$ | $1, 1$ | $0, 3$ |
| $M$ | $3, 0$ | $1, 2$ | $2, 1$ |
| $B$ | $1, 1$ | $0, 0$ | $1, 1$ |

::: solution
Player 1's column maxima: against $L$, $M$ pays $3$; against $C$, $T$ and $M$ pay $1$; against $R$, $M$ pays $2$. So $BR_1(L) = \{M\}$, $BR_1(C) = \{T, M\}$, $BR_1(R) = \{M\}$. Player 2's row maxima: against $T$, $R$ pays $3$; against $M$, $C$ pays $2$; against $B$, $L$ and $R$ pay $1$. So $BR_2(T) = \{R\}$, $BR_2(M) = \{C\}$, $BR_2(B) = \{L, R\}$. Mutual best responses: $(M, C)$ is the only cell in both lists ($M \in BR_1(C)$ and $C \in BR_2(M)$). Check: $(T, R)$ fails because $T \notin BR_1(R)$; $(M, L)$ fails because $L \notin BR_2(M)$. Unique pure-strategy Nash equilibrium: $(M, C)$ with payoffs $(1, 2)$.
:::
:::

::: exercise Prisoner's dilemma, restated {level=1 check="1"}
In the advertising game of [[game-theory/strategic-games#ex-advertising]], how many pure-strategy Nash equilibria are there? (Enter an integer.)
::: solution
Advertise strictly dominates Quiet for each firm, so the unique best response to anything is Advertise. The unique Nash equilibrium is $(\text{Advertise}, \text{Advertise})$. There is **one** pure-strategy Nash equilibrium.
:::
:::

::: exercise A coordination game with a safe option {level=1}
Two firms independently adopt technology $A$ or $B$, or a compatible adapter $S$. Payoffs:

|  | $A$ | $B$ | $S$ |
|---|---|---|---|
| $A$ | $3, 3$ | $0, 0$ | $1, 1$ |
| $B$ | $0, 0$ | $3, 3$ | $1, 1$ |
| $S$ | $1, 1$ | $1, 1$ | $1, 1$ |

Find all pure-strategy Nash equilibria. Which are Pareto efficient?
::: solution
Against $A$, $A$ pays $3 > 1 > 0$, so $BR_1(A) = \{A\}$. Against $B$, $BR_1(B) = \{B\}$. Against $S$, all three strategies pay $1$, so $BR_1(S) = \{A, B, S\}$. By symmetry the same holds for player 2. Mutual best responses: $(A, A)$, $(B, B)$, and $(S, S)$. (The profile $(A, S)$ is not: against $S$, $A$ is a best response for player 1, but against $A$, player 2's unique best response is $A$, not $S$.) Pareto efficiency: $(A, A)$ and $(B, B)$ both give $(3, 3)$ and dominate $(S, S)$. So the two technology equilibria are Pareto efficient; the adapter equilibrium is not.
:::
:::

::: exercise Battle of the sexes, a third option {level=2}
Add a strategy Stay Home to [[#ex-bos]], paying $0.5$ to a player who stays home whatever the other does, and $0$ to a player who goes out while the other stays home. Find all pure-strategy Nash equilibria of the $3\times 3$ game.
::: hint
The new bimatrix has a third row and column of $0.5$ on the diagonal cell $(\text{Home}, \text{Home})$ and zeros off that diagonal in the new row and column, except the $(0.5, 0.5)$ cell.
:::
::: solution
The bimatrix is

|  | Opera | Match | Home |
|---|---|---|---|
| Opera | $2, 1$ | $0, 0$ | $0, 0.5$ |
| Match | $0, 0$ | $1, 2$ | $0, 0.5$ |
| Home | $0.5, 0$ | $0.5, 0$ | $0.5, 0.5$ |

Against Opera, player 1's payoffs are $2, 0, 0.5$, so Opera is unique BR. Against Match, Match is unique BR ($1 > 0.5$). Against Home, Home pays $0.5 > 0$. Player 2: against Opera, Opera is unique BR; against Match, Match; against Home, Home. The pure equilibria are therefore $(\text{Opera}, \text{Opera})$, $(\text{Match}, \text{Match})$ and $(\text{Home}, \text{Home})$. The new equilibrium is a safe, inefficient fallback. It does not destroy the two coordinating equilibria.
:::
:::

::: exercise Chicken with a third payoff {level=2 check="2"}
In [[#ex-chicken]], replace the collision payoff $(0, 0)$ by $(-2, -2)$ and the mutual-swerve payoff $(2, 2)$ by $(1, 1)$. How many pure-strategy Nash equilibria does the new game have? (Enter an integer.)
::: solution
The new bimatrix is

|  | Swerve | Straight |
|---|---|---|
| Swerve | $1, 1$ | $1, 3$ |
| Straight | $3, 1$ | $-2, -2$ |

Against Swerve, Straight pays $3 > 1$. Against Straight, Swerve pays $1 > -2$. Best responses are unchanged, so the two off-diagonal cells remain the only pure equilibria. There are **two** pure-strategy Nash equilibria. (Making a collision worse does not create a dominant strategy: Straight is still best against Swerve.)
:::
:::

::: exercise A discrete public good {level=2}
Three players each choose Contribute or Not. The public good is provided if and only if at least two contribute. A contribution costs $3$; the good is worth $4$ to each player (whether or not that player contributed) when provided, and $0$ otherwise. Find all pure-strategy Nash equilibria. (Names the contributing sets.)
::: hint
A profile is an equilibrium if and only if no contributor wants to stop and no non-contributor wants to start, given the others.
:::
::: solution
Write $C$ for Contribute and $N$ for Not.

- All three contribute: each gets $4 - 3 = 1$. A unilateral stop leaves two contributors, so the good is still provided and the deviant gets $4 > 1$. Not an equilibrium.
- Exactly two contribute, say players $1, 2$. Each contributor gets $1$; the non-contributor gets $4$. A contributor who stops leaves only one contributor, the good fails, and the deviant gets $0 < 1$. The non-contributor who starts gets $4 - 3 = 1 < 4$. So neither type of deviation pays. Every profile with exactly two contributors is a Nash equilibrium.
- Exactly one contributes: the contributor gets $-3$; the others get $0$. The contributor prefers to stop ($0 > -3$). Not an equilibrium.
- Nobody contributes: each gets $0$. A unilateral contribution still leaves $k = 1$, so the good fails and the deviant gets $-3 < 0$. This *is* an equilibrium.

The pure-strategy Nash equilibria are: the three profiles in which a given pair contributes, and the profile in which nobody contributes. The first three are efficient (surplus $4\cdot 3 - 3\cdot 2 = 6$); the last is not (surplus $0$). A threshold of two turns the game into a hybrid of stag hunt (the all-out equilibrium) and coordination on who contributes.
:::
:::

::: exercise No pure equilibrium {level=3}
Player 1 has rows $T, B$; player 2 has columns $L, C, R$:

|  | $L$ | $C$ | $R$ |
|---|---|---|---|
| $T$ | $0, 3$ | $3, 0$ | $1, 1$ |
| $B$ | $2, 2$ | $0, 3$ | $2, 0$ |

Show that there is no pure-strategy Nash equilibrium. For each cell, name a player who has a profitable deviation.
::: solution
$(T, L)$: player 1 gets $0$, but $B$ against $L$ pays $2$. Player 1 deviates.
$(T, C)$: player 2 gets $0$, but $L$ against $T$ pays $3$. Player 2 deviates.
$(T, R)$: player 1 gets $1$, but $B$ against $R$ pays $2$. Player 1 deviates.
$(B, L)$: player 2 gets $2$, but $C$ against $B$ pays $3$. Player 2 deviates.
$(B, C)$: player 1 gets $0$, but $T$ against $C$ pays $3$. Player 1 deviates.
$(B, R)$: player 2 gets $0$, but $C$ against $B$ pays $3$. Player 2 deviates.

Every cell has a profitable unilateral deviation, so there is no pure-strategy Nash equilibrium. (There is a mixed equilibrium, which you can compute after the next chapter: player 1's mixture will make player 2 indifferent among the columns in its support.)
:::
:::

::: exercise Risk dominance in the stag hunt {level=3}
In [[#ex-stag]], let $p$ be the probability that the other hunter hunts stag. Find the threshold $p^*$ above which Stag is the unique best response. Harsanyi and Selten's risk-dominance criterion, for a symmetric $2\times 2$ game with equilibria $(A, A)$ and $(B, B)$, selects $A$ if the product of deviation losses at $(B, B)$ exceeds the product of deviation losses at $(A, A)$. Compute those products and say which equilibrium is risk-dominant.
::: hint
The deviation loss at $(\text{Stag}, \text{Stag})$ is the payoff drop if the other switches to Hare. At $(\text{Hare}, \text{Hare})$ it is the drop if the other switches to Stag — which is zero or negative? Compute $u_i(H, H) - u_i(S, H)$ and $u_i(S, S) - u_i(H, S)$.
:::
::: solution
Expected payoff of Stag is $5p + 0(1-p) = 5p$; of Hare, $3$. So Stag is uniquely best if $5p > 3$, i.e. $p > p^* = 3/5$. Hare is uniquely best if $p < 3/5$.

Deviation loss at $(\text{Stag}, \text{Stag})$: $u_i(S, S) - u_i(H, S) = 5 - 3 = 2$. (If the *other* player is the one who deviates, the remaining stag-hunter gets $0$ rather than $5$, a loss of $5$; the Harsanyi–Selten product uses each player's loss from a unilateral own deviation, which is $2$ at the stag equilibrium.) Deviation loss at $(\text{Hare}, \text{Hare})$: $u_i(H, H) - u_i(S, H) = 3 - 0 = 3$. The product of own-deviation losses is $2 \times 2 = 4$ at $(\text{Stag}, \text{Stag})$ and $3 \times 3 = 9$ at $(\text{Hare}, \text{Hare})$. Risk dominance selects the equilibrium with the *larger* product of deviation losses — the one that is more expensive to leave, equivalently the one with the larger basin. Here $9 > 4$, so $(\text{Hare}, \text{Hare})$ is risk-dominant. That matches $p^* = 3/5 > 1/2$: the basin of Hare is larger.
:::
:::

::: exercise Best responses with three players {level=2}
Three firms, $1, 2, 3$, each choose In or Out. A firm that stays Out earns $0$. A firm that goes In earns $6/k - 2$, where $k$ is the number of firms that go In (a market profit of $6$ split equally, minus an entry cost of $2$). Find all pure-strategy Nash equilibria.
::: solution
Payoff of In, given $k$ including oneself: $6/k - 2$, which is $4$ if $k=1$, $1$ if $k=2$, and $0$ if $k=3$. Payoff of Out is $0$.

- All Out: a unilateral In earns $4 > 0$. Not an equilibrium.
- Exactly one In: that firm earns $4 > 0$ so does not want to leave; each Out firm, entering, would make $k=2$ and earn $1 > 0$, so *would* enter. Not an equilibrium.
- Exactly two In: each In firm earns $1 > 0$ so stays; the Out firm, entering, would make $k=3$ and earn $0$, so is indifferent. If we allow a best response to include the tie, the Out firm is willing to stay Out. Then every profile with exactly two firms In is a Nash equilibrium. (If ties are broken in favour of entry, these fail; the usual definition includes the weak inequality, so they are equilibria.)
- All three In: each earns $0$, equal to Out, so each is willing to stay. This is also a Nash equilibrium under the weak definition.

The pure-strategy Nash equilibria are: the three profiles with exactly two firms in, and the profile with all three in. The two-firm profiles are strictly better for the insiders ($1 > 0$) and no worse for the outsider. This is a three-player chicken (a war of attrition for a market that holds two firms profitably).
:::
:::
