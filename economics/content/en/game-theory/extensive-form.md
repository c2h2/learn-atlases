An incumbent firm occupies a market. A potential entrant decides whether to enter. If the entrant stays out, the incumbent keeps a monopoly profit of $5$ and the entrant gets $0$. If the entrant comes in, the incumbent can Fight, in which case both earn $-1$, or Accommodate, in which case they split the market at $2$ each. The incumbent would rather accommodate than fight *if entry has already happened*. But if the entrant *believes* the incumbent will fight, staying out looks wise. Is the threat to fight credible?

In the strategic form of this game there are two Nash equilibria: (Out, Fight) and (In, Accommodate). The first relies on a threat that the incumbent would not wish to carry out. **Subgame-perfect equilibrium** (Selten 1965) discards it, by requiring Nash equilibrium in every **subgame**, including the one that starts after entry. The tool for finite games of perfect information is **backward induction**: start at the end of the tree, and fold the optimal choices back to the root.

This chapter introduces game trees, the distinction between an action and a strategy, backward induction, and subgame perfection. Stackelberg leadership — Cournot with one firm moving first — is the leading industrial application. The chain-store paradox, at the end, shows that backward induction can be implausible when the tree is long, which is one reason repeated games and reputation models exist.

## Game trees

::: definition Extensive-form game of perfect information {#def-extensive}
A finite **extensive-form game of perfect information** consists of

1. a finite rooted tree, whose nodes are histories of play;
2. a partition of the non-terminal nodes among the players (who moves where), with a possible player $0$ for chance;
3. at each of player $i$'s nodes, a finite set of actions, each labelling an outgoing edge;
4. at each terminal node, a payoff vector $(u_1, \dots, u_n)$;
5. a specification of what is known: **perfect information** means that every information set is a singleton — the player to move knows the entire history.

A **strategy** for player $i$ is a function assigning an action to *every* node at which $i$ moves, including nodes that the strategy itself makes unreachable. An **outcome** is the terminal node reached when all strategies (and chance) are realised.
:::

The extra requirement — that a strategy specify actions at unused nodes — is the whole difference between "what I do" and "what I would do". Nash equilibrium in the strategic form can hang on those unused instructions. Subgame perfection disciplines them.

::: example The entry game as a tree {#ex-entry-tree}
Draw the entry game. The entrant moves first, choosing In or Out. If Out, payoffs are $(0, 5)$ for (entrant, incumbent). If In, the incumbent chooses Fight or Accommodate, with payoffs $(-1, -1)$ and $(2, 2)$ respectively. List the entrant's strategies and the incumbent's strategies.
::: solution
The tree has a root (entrant's node), a terminal node Out, and an incumbent's node after In, with two terminal nodes Fight and Accommodate.

The **entrant** has one node, hence two strategies: In and Out. The **incumbent** has one node (reached only after In), hence two strategies: Fight and Accommodate. (If the incumbent also moved at some other node, a strategy would have to specify an action there too.) The four strategy profiles and their outcomes:

|  | Fight | Accommodate |
|---|---|---|
| In | $-1, -1$ | $2, 2$ |
| Out | $0, 5$ | $0, 5$ |

The two columns of the Out row are equal: if the entrant stays out, the incumbent's plan is never used, but it is still part of the strategy profile. That is why (Out, Fight) and (Out, Accommodate) look the same in the outcome and different in the strategic form.
:::
:::

::: widget graph
nodes: Root@0,2; Out@-2,0; Inc@2,0; Fight@1,-2; Acc@3,-2
edges: Root>Out; Root>Inc; Inc>Fight; Inc>Acc
algorithm: none
caption: The entry tree. Root is the entrant's move; Inc is the incumbent's. Terminal nodes are Out, Fight and Acc. Drag the nodes if they overlap. The figure is a graph of the tree, not a solver: you still compute the equilibrium by hand.
:::

## Backward induction

::: algorithm Backward induction {#alg-backward}
In a finite game of perfect information without ties (or with a stated tie-breaking rule):

1. At every node whose children are all terminal, let the player to move choose an action that maximises that player's payoff, and replace the node by the resulting payoff vector.
2. Repeat on the reduced tree until the root is replaced.
3. The actions selected at each node constitute a strategy profile; the root's payoff vector is the backward-induction outcome.
:::

Zermelo (1913) used the idea to argue that chess has a determined outcome; the algorithm under another name is dynamic programming.

::: proposition Backward induction yields a subgame-perfect equilibrium {#prop-bi-spe}
In a finite game of perfect information, backward induction produces a Nash equilibrium of every subgame, hence a subgame-perfect equilibrium of the whole game. If there are no payoff ties at any node, the backward-induction profile is unique.
:::
::: proof
Sketch, by induction on the depth of the tree. A subgame of depth $1$ is a one-player decision; backward induction picks a maximiser, which is a Nash equilibrium of that subgame. Suppose every proper subgame has been replaced by a Nash-equilibrium payoff. The root player then chooses a maximiser given those continuation payoffs, which is a Nash equilibrium of the reduced game, and hence — together with the already-specified continuation strategies — a Nash equilibrium of every subgame, including the whole game.
:::

::: example Entry, solved backwards {#ex-entry-bi}
Apply backward induction to [[#ex-entry-tree]]. What is the unique backward-induction outcome? Which strategic-form Nash equilibrium is discarded?
::: solution
At the incumbent's node, Fight pays $-1$ and Accommodate pays $2$, so the incumbent accommodates. The root then offers the entrant a choice between Out, paying $0$, and In, paying $2$ given accommodation. The entrant enters. The backward-induction profile is (In, Accommodate) with payoffs $(2, 2)$. The strategic-form Nash equilibrium (Out, Fight) is discarded: Fight is not a best response *at the node where it would be used*.
:::
:::

::: warning A strategy must specify unused actions
Writing "the incumbent accommodates if entry occurs, and the entrant enters" is a complete backward-induction description in this game, because each player has only one node. In a longer tree it is not enough to report the *path*. A strategy that says "I will fight if anyone has ever entered" is a different object from a strategy that says "I will accommodate at every node", even if, on the equilibrium path, nobody enters and the two strategies look the same. Subgame perfection is a restriction on the unused instructions.
:::

## Subgame-perfect equilibrium

::: definition Subgame and SPE {#def-spe}
A **subgame** of an extensive-form game is a restriction of the game to a node $x$ and all its descendants, together with the information sets, actions and payoffs inherited from the original game, such that every information set of the original game is either entirely in the subgame or entirely out of it. (In perfect-information games, every node starts a subgame.) A **subgame-perfect equilibrium** is a strategy profile that induces a Nash equilibrium in every subgame.
:::

Every SPE is a Nash equilibrium of the strategic form (the whole game is a subgame). The converse is false, as the entry game shows. SPE is the standard solution concept for sequential games in applied economics. It is not the last word: with imperfect information, **perfect Bayesian equilibrium** ([[game-theory/signalling]]) further restricts beliefs at information sets that are not singletons.

::: example Stackelberg leadership {#ex-stackelberg}
Firm 1 chooses $q_1 \ge 0$ first; firm 2 observes $q_1$ and then chooses $q_2$. Inverse demand $P = 12 - (q_1+q_2)$, costs zero. Compute the SPE. Compare quantities, price and profits with Cournot ([[game-theory/continuous-games#ex-cournot-numbers]]).
::: solution
Firm 2's subgame, after $q_1$, is a one-player problem: $b_2(q_1) = (12-q_1)/2$, the Cournot best response. Firm 1, anticipating this, maximises

$$
\pi_1 = q_1 \bigl(12 - q_1 - (12-q_1)/2\bigr) = q_1 (12-q_1)/2 = 6q_1 - q_1^2/2.
$$

The first-order condition is $6 - q_1 = 0$, so $q_1^S = 6$. Then $q_2^S = (12-6)/2 = 3$. Price $P^S = 3$. Profits: $\pi_1^S = 18$, $\pi_2^S = 9$. Cournot was $q_i = 4$, $P = 4$, $\pi_i = 16$. The leader produces more than Cournot, the follower less; the leader earns more than Cournot ($18 > 16$), the follower less ($9 < 16$); price is lower and total quantity higher ($9 > 8$). The first-mover advantage here is an advantage. (It is not always: in a differentiated-price game, moving first can be a disadvantage.)

The SPE strategies are: firm 1 plays $6$; firm 2 plays $b_2(q_1) = (12-q_1)/2$ at *every* $q_1$, not only at $q_1 = 6$. A profile in which firm 2 "threatens" to flood the market unless $q_1 = 4$, say, can be a Nash equilibrium of a suitably discretised strategic form, but it is not subgame-perfect: after $q_1 = 6$, flooding is not a best response.
:::
:::

::: widget plot
f: (12-x)/2; 12 - 2*x
x: 0, 12
y: 0, 8
labels: \text{follower BR}; \text{Cournot BR of leader}
points: 6,3; 4,4
caption: Stackelberg versus Cournot. Horizontal axis $q_1$, vertical $q_2$. The flatter line is the follower's best response; the steeper line is the leader's Cournot best response. Their crossing $(4,4)$ is Cournot. The SPE is $(6,3)$ on the follower's line. The leader does not play a Cournot best response: commitment changes the problem.
:::

The second line is the leader's *Cournot* best response, drawn for comparison: the SPE does not sit on it. Commitment to $q_1 = 6$ is valuable precisely because the leader is not playing a simultaneous-move best response.

## Take-it-or-leave-it offers

A proposer and a responder split a pie of size $1$. The proposer offers $x \in [0, 1]$ to the responder and keeps $1-x$. The responder accepts or rejects; rejection yields $(0, 0)$.

::: example Ultimatum SPE {#ex-ultimatum}
Find the SPE when both players maximise their own share and, when indifferent, the responder accepts. What changes if the pie is $100$ indivisible cents and the responder rejects $0$?
::: solution
After any $x > 0$ the responder strictly prefers to accept. After $x = 0$ the responder is indifferent and, by the tie-break, accepts. The proposer therefore offers $0$ and keeps $1$. The SPE outcome gives the whole pie to the proposer.

If the pie is $100$ cents and the responder rejects $0$, every offer of $1$ cent or more is accepted, and the proposer's best offer is $1$ cent. The first mover still takes $99$ cents. Laboratory ultimatum games, from Güth, Schmittberger and Schwarze (1982) onwards, look nothing like this: modal offers are near $40$–$50$ per cent, and offers below about $20$ per cent are frequently rejected. The SPE of the money-maximising game is a poor description of play. Whether that is because responders have fairness preferences, or because people treat the one-shot game as part of a repeated relationship, is a live dispute; the finding itself is not.
:::
:::

The ultimatum game is the one-period special case of Rubinstein bargaining ([[game-theory/bargaining]]). The logic to keep: a threat to reject a strictly positive offer, when the alternative is zero, is not credible in the model, and the first mover therefore captures the surplus.

## Imperfect information

If a player cannot observe a previous move, several nodes belong to one **information set**. A strategy assigns an action to each information set, not to each node. Subgames must not split information sets ([[#def-spe]]), so a simultaneous-move game written as a tree has only one subgame — itself — and SPE adds nothing to Nash equilibrium. Perfect Bayesian equilibrium, which attaches beliefs to non-singleton information sets, is the subject of [[game-theory/signalling]].

::: quiz
In the entry game, (Out, Fight) is a Nash equilibrium of the strategic form. Why is it not subgame-perfect?
- [ ] Because the entrant would prefer to enter even if the incumbent fights
- [x] Because in the subgame after entry, Fight is not a best response for the incumbent
- [ ] Because SPE requires mixed strategies
- [ ] Because the incumbent's payoff of $5$ when the entrant stays out is not a Nash payoff
::: solution
After In, the incumbent chooses between $-1$ and $2$, so Accommodate is the unique best response. Fight is not a Nash strategy of that subgame. The entrant, given Accommodate, prefers In. SPE does not require mixing. The payoff $5$ *is* a Nash payoff of the strategic form — that is what makes (Out, Fight) a Nash equilibrium, and what SPE discards.
:::
:::

## The chain-store paradox

Selten's **chain-store paradox** (1978) is the entry game played against a sequence of $N$ potential entrants. Backward induction unravels. In the last market the incumbent accommodates, so the last entrant enters; the penultimate market then has no future to invest in, so the incumbent accommodates there too; and so on back to the first market. The unique SPE is entry and accommodation everywhere. The incumbent never fights, even when $N$ is large and a fight in market $1$ looks like a worthwhile investment in reputation.

The prediction is uncomfortable. Kreps, Milgrom, Roberts and Wilson (1982) showed that a small prior probability that the incumbent is a "fighting type" can sustain fighting in early markets as an SPE of the incomplete-information game. That construction needs [[game-theory/bayesian-games]] and [[game-theory/repeated-games]]. The paradox is why those chapters exist: under complete information, a tiny doubt about the last period unravels the whole path.

The **centipede game** (Rosenthal 1981) makes the same point with two players. A pot grows along a path of many nodes; at each node a player can Stop, taking most of the current pot, or Continue. Backward induction says Stop at the first node. Laboratory play typically continues for many nodes (McKelvey and Palfrey 1992, *Econometrica*). As with the ultimatum game, one can doubt the payoffs, the common-knowledge assumption, or the extensive form as a model of the situation. One cannot doubt the *algorithm*: given the tree and the payoffs, [[#alg-backward]] is correctly computed.

## Evidence

**Stackelberg in the laboratory.** Huck, Müller and Normann (2001, *Journal of Economic Behavior & Organization*) compare Cournot and Stackelberg duopolies. Leaders produce more than followers, as SPE predicts, but less than the full Stackelberg quantity; followers produce more than the SPE best response. The qualitative first-mover advantage is there; the exact $(6, 3)$ split, in our numbers, is not.

**Ultimatum games across societies.** Henrich et al. (2005, *Behavioral and Brain Sciences*) ran ultimatum games in fifteen small-scale societies. Mean offers ranged from about $25$ per cent to over $50$ per cent; rejection rates varied with market integration. The money-maximising SPE was rejected everywhere. The experiment is evidence about social preferences and institutions, not about whether subjects can fold a two-node tree.

**Chess.** Chess is a finite game of perfect information, so Zermelo's theorem says that White has a winning strategy, or Black does, or both can force a draw. The tree is too large to fold by hand; engines use truncated search. The theorem is a possibility result.

## Where this leads

Subgame perfection is the solution concept for the sequential half of the course. [[game-theory/bargaining]] uses it in Rubinstein's infinite-horizon alternating-offer model. [[game-theory/repeated-games]] uses it for trigger strategies, and explains when the finite-horizon unravelling of the chain store does *not* occur. [[game-theory/signalling]] extends SPE to imperfect information. Applications to entry deterrence continue in [[industrial-organisation/entry-and-deterrence]].

::: history
Ernst Zermelo's 1913 paper on chess is the ancestor of backward induction. Reinhard Selten, in a 1965 oligopoly paper with demand inertia, required equilibrium in every subgame and so defined subgame-perfect equilibrium; his 1975 trembling-hand paper is a further refinement. Heinrich von Stackelberg's *Marktform und Gleichgewicht* (1934) introduced leadership in quantity competition. The chain-store paradox is Selten (1978); the reputation resolution is Kreps, Milgrom, Roberts and Wilson (1982). Rosenthal's centipede (1981) and Güth, Schmittberger and Schwarze's ultimatum experiment (1982) opened the empirical debate on backward induction.
:::

::: summary
- A finite extensive-form game of perfect information is a tree with payoffs at terminals. A strategy specifies an action at every node of the player, including unused nodes ([[#def-extensive]]).
- Backward induction ([[#alg-backward]]) folds optimal choices from the terminals to the root and yields a subgame-perfect equilibrium ([[#prop-bi-spe]]).
- SPE requires Nash equilibrium in every subgame ([[#def-spe]]). It discards Nash equilibria that rely on incredible threats, such as (Out, Fight) in the entry game.
- Stackelberg leadership is Cournot with a first mover: the leader produces more, the follower less, and the leader's profit rises ([[#ex-stackelberg]]).
- The ultimatum SPE gives almost the whole pie to the proposer; laboratory play does not. The chain-store paradox and the centipede game show that long backward induction can be a fragile prediction under complete information.
:::

## Exercises

::: exercise A tiny tree {level=1}
Player 1 chooses $A$ or $B$. If $A$, payoffs are $(1, 1)$ and the game ends. If $B$, player 2 chooses $C$ or $D$, with payoffs $(0, 2)$ for $C$ and $(3, 0)$ for $D$. Find the unique SPE.
::: solution
Player 2, after $B$, prefers $C$ ($2 > 0$). Player 1 then compares $A$, paying $1$, with $B$ then $C$, paying $0$, and chooses $A$. The SPE is $(A, C)$ with payoffs $(1, 1)$. In the strategic form, against $A$ player 2 is indifferent, but given $D$ player 1 would deviate to $B$ ($3 > 1$). The unique Nash equilibrium is also $(A, C)$; this tree is too small for SPE and Nash to part company. The entry game is the example where they do.
:::
:::

::: exercise Entry, the SPE payoff {level=1 check="2"}
In [[#ex-entry-tree]], what is the entrant's SPE payoff? (Enter an integer.)
::: solution
The incumbent accommodates after entry, the entrant enters, and the entrant's payoff is $2$.
:::
:::

::: exercise A fight that would be carried out {level=1}
Modify the entry game so that Fight pays the incumbent $3$ and the entrant $-1$, while Accommodate still pays $(2, 2)$ and Out pays $(0, 5)$. Find the SPE.
::: solution
After entry the incumbent prefers Fight ($3 > 2$). The entrant, anticipating Fight, prefers Out ($0 > -1$). The SPE is (Out, Fight) with payoffs $(0, 5)$. Now the threat is credible: Fight *is* a best response after entry. Predation, in this cartoon, deters entry only if it is the incumbent's myopic best response, not merely a plan.
:::
:::

::: exercise Stackelberg with costs {level=2 check="7"}
Inverse demand $P = 12 - Q$, leader's cost $c_1 = 0$, follower's cost $c_2 = 2$. Find the SPE quantity of the leader. (Enter an integer.)
::: hint
Follower's BR is $q_2 = (12 - 2 - q_1)/2 = 5 - q_1/2$. Substitute into the leader's profit.
:::
::: solution
$q_2 = (10 - q_1)/2 = 5 - q_1/2$. Leader profit: $q_1 \bigl(12 - q_1 - (5 - q_1/2)\bigr) = q_1(7 - q_1/2) = 7q_1 - q_1^2/2$. FOC: $7 - q_1 = 0$, so $q_1 = 7$. Then $q_2 = 5 - 3.5 = 1.5$, price $3.5$, $\pi_1 = 24.5$, $\pi_2 = 2.25$. The low-cost leader expands even further than in [[#ex-stackelberg]].
:::
:::

::: exercise Three-player line {level=2}
Player 1 chooses In or Out. If Out, payoffs are $(1, 0, 0)$ for players $(1,2,3)$. If In, player 2 chooses Left or Right. If Left, payoffs $(0, 3, 0)$. If Right, player 3 chooses Up or Down, with payoffs $(2, 2, 2)$ for Up and $(4, 1, 0)$ for Down. Find the unique SPE.
::: solution
Player 3, if reached, prefers Down ($0 = 0$ for player 3? Up pays player 3 a payoff of $2$, Down pays $0$, so player 3 prefers **Up**). Payoffs at that node: Up $(2, 2, 2)$, Down $(4, 1, 0)$. Player 3 maximises the third component: $2 > 0$, so Up.

Player 2 then compares Left $(0, 3, 0)$ with Right-then-Up $(2, 2, 2)$. Player 2's payoffs: $3 > 2$, so Left.

Player 1 compares Out $(1, 0, 0)$ with In-then-Left $(0, 3, 0)$. Player 1 prefers Out ($1 > 0$).

SPE: player 1 Out, player 2 Left, player 3 Up. Outcome $(1, 0, 0)$. The path never reaches players 2 and 3, but their strategies are still part of the SPE, and they pin down player 1's comparison.
:::
:::

::: exercise Nash but not SPE {level=2}
In the entry game of [[#ex-entry-tree]], write the strategic-form bimatrix and find all pure-strategy Nash equilibria. Which of them are subgame-perfect?
::: solution
As in [[#ex-entry-tree]]:

|  | Fight | Accommodate |
|---|---|---|
| In | $-1, -1$ | $2, 2$ |
| Out | $0, 5$ | $0, 5$ |

Against Fight, the entrant prefers Out ($0 > -1$); against Accommodate, In ($2 > 0$). Against In, the incumbent prefers Accommodate ($2 > -1$); against Out, the incumbent is indifferent. So the pure Nash equilibria are (In, Accommodate) and (Out, Fight). (Out, Accommodate) is not Nash: given Accommodate, the entrant would deviate to In. Only (In, Accommodate) is SPE, by [[#ex-entry-bi]].
:::
:::

::: exercise Stackelberg versus a committed follower {level=3}
In [[#ex-stackelberg]], suppose the *follower* could commit, before the leader moves, to a quantity $q_2$. What $q_2$ would the follower commit to, and what would the leader then do? Compare the follower's profit with the SPE profit of $9$. Interpret.
::: hint
If $q_2$ is committed, the leader best-responds with $q_1 = (12-q_2)/2$. The follower is then a Stackelberg *leader*.
:::
::: solution
The follower, by committing first, becomes the Stackelberg leader: $q_2 = 6$, $q_1 = 3$, $\pi_2 = 18 > 9$. Commitment is valuable. In the original game the follower cannot commit, and earns $9$. This is why the *order of moves* is part of the rules of the game, not a detail: the same payoff functions and action sets, with a different tree, produce a different SPE. Devices that change the order — capacity, contracts, irreversible investment — are the subject of [[industrial-organisation/entry-and-deterrence]].
:::
:::

::: exercise A centipede of length four {level=3}
Players 1 and 2 alternate at four nodes. Stop at node $1$ pays $(1, 0)$; at node $2$ pays $(0, 3)$; at node $3$ pays $(4, 2)$; at node $4$ pays $(3, 6)$. If player 2 Continues at node $4$, payoffs are $(8, 5)$. Compute the backward-induction outcome. What would player 1 need to believe about later play in order to Continue at node $1$?
::: solution
Node $4$ (player 2): Stop pays $6$, Continue pays $5$, so player 2 Stops. Node $3$ (player 1): Stop pays $4$, Continue (then Stop at $4$) pays $3$, so player 1 Stops. Node $2$ (player 2): Stop pays $3$, Continue (then Stop at $3$) pays $2$, so player 2 Stops. Node $1$ (player 1): Stop pays $1$, Continue (then Stop at $2$) pays $0$, so player 1 Stops. The backward-induction outcome is Stop at node $1$, payoffs $(1, 0)$. For player 1 to Continue at node $1$, player 1 must expect a payoff above $1$, which requires that player 2 Continue at node $2$. That belief contradicts SPE. A small probability that player 2 is not a money-maximiser can make Continue rational at the first node.

:::
:::
