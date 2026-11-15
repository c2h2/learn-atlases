A penalty taker can shoot left or right; a goalkeeper can dive left or right. If both choose the same side, the keeper is more likely to save; if they choose opposite sides, the taker is more likely to score. Neither side has a dominant strategy, and — as in matching pennies — no pair of pure actions is a Nash equilibrium: whichever side the keeper commits to, the taker would rather shoot the other way. What is observed, in professional leagues, is not a pure choice but a frequency. Palacios-Huerta (2003, *Review of Economic Studies*) recorded thousands of penalties in European competitions and found kickers and keepers mixing, at frequencies close to the equilibrium of a $2\times 2$ zero-sum game estimated from the scoring rates.

**Mixed strategies** are the device that makes this precise. A mixed strategy is a probability distribution over a player's actions. A mixed-strategy Nash equilibrium is a profile of such distributions in which each player's mixture maximises expected payoff given the others'. The computational engine is the **indifference principle**: if a player randomises over two actions in equilibrium, those two actions must yield the *same* expected payoff, otherwise the player would put probability one on the better of them. This chapter computes mixed equilibria of bimatrix games, including matching pennies, inspection and battle of the sexes; states Nash's existence theorem; and specialises to zero-sum games and von Neumann's minimax theorem.

Payoffs continue to be von Neumann–Morgenstern expected utilities. A player who randomises is not assumed to *like* gambling; the mixture is an equilibrium requirement, not a taste. Whether real players randomise, or merely look as if they do, is an empirical question taken up at the end.

## Mixed strategies and expected payoffs

::: definition Mixed strategy {#def-mixed}
Let player $i$ have a finite strategy set $S_i$. A **mixed strategy** for $i$ is a probability distribution $\sigma_i$ on $S_i$: $\sigma_i(s_i) \ge 0$ for all $s_i$ and $\sum_{s_i \in S_i} \sigma_i(s_i) = 1$. The set of mixed strategies is $\Delta(S_i)$, the simplex on $S_i$. A **pure strategy** $s_i$ is the mixed strategy that puts probability one on $s_i$. The **support** of $\sigma_i$ is $\{s_i : \sigma_i(s_i) > 0\}$. A **mixed-strategy profile** $\sigma = (\sigma_1, \dots, \sigma_n)$ induces a product distribution on $S$; player $i$'s **expected payoff** is

$$
u_i(\sigma) = \sum_{s \in S} \Bigl( \prod_{j=1}^n \sigma_j(s_j) \Bigr) u_i(s).
$$

Players randomise independently.
:::

For two players with two actions each, write $p$ for the probability that player 1 plays the first row, and $q$ for the probability that player 2 plays the first column. Then $u_1(p, q)$ is a bilinear function of $(p, q)$. That bilinearity is what makes the algebra of this chapter work: the expected payoff of a mixture is the mixture of the expected payoffs.

::: example Expected payoffs in matching pennies {#ex-mp-expected}
In matching pennies,

|  | Heads | Tails |
|---|---|---|
| Heads | $1, -1$ | $-1, 1$ |
| Tails | $-1, 1$ | $1, -1$ |

let $p = \Prob(\text{player 1 plays Heads})$ and $q = \Prob(\text{player 2 plays Heads})$. Compute $u_1(p, q)$ and $u_2(p, q)$. For which $q$ is player 1 willing to mix?
::: solution
Player 1's payoff from Heads is $1\cdot q + (-1)(1-q) = 2q - 1$; from Tails, $-1\cdot q + 1\cdot(1-q) = 1 - 2q$. So

$$
u_1(p, q) = p(2q - 1) + (1-p)(1 - 2q) = (2p - 1)(2q - 1) + \text{terms that cancel} = (2q-1)(2p-1).
$$

More directly: $u_1 = p(2q-1) + (1-p)(1-2q)$. Player 1 prefers Heads if $2q-1 > 1-2q$, i.e. $q > 1/2$; prefers Tails if $q < 1/2$; and is indifferent if $q = 1/2$. Only when player 2 mixes fifty-fifty is player 1 willing to mix. By symmetry, player 2 is willing to mix only when $p = 1/2$. The unique candidate for a mixed equilibrium is $p = q = 1/2$, with expected payoffs $u_1 = 0$, $u_2 = 0$. Direct check: against $q = 1/2$, Heads and Tails both pay $0$, so any $p$ is a best response, in particular $p = 1/2$; similarly for player 2. It *is* an equilibrium.
:::
:::

::: widget plot
f: 2*x - 1; 1 - 2*x
x: 0, 1
y: -1.2, 1.2
labels: \text{Heads}; \text{Tails}
hlines: 0
vlines: 0.5
caption: Matching pennies for player 1. Horizontal axis: probability $q$ that player 2 plays Heads. The two lines are expected payoffs of Heads and of Tails. They cross at $q = 1/2$, payoff $0$. Player 1's best response is Heads to the right of the crossing, Tails to the left, and anything at the crossing.
:::

The figure is the whole of mixed-strategy computation in a picture. Find the belief about the opponent that makes the player indifferent; require that the opponent's mixture *be* that belief; repeat for the other player.

## The indifference principle

::: proposition Indifference principle {#prop-indifference}
Let $\sigma^*$ be a mixed-strategy Nash equilibrium. If $s_i$ is in the support of $\sigma_i^*$, then $s_i$ is a best response to $\sigma_{-i}^*$. Consequently every strategy in the support of $\sigma_i^*$ yields the *same* expected payoff against $\sigma_{-i}^*$, and that payoff is at least as large as the expected payoff of any strategy outside the support.
:::
::: proof
Suppose $s_i$ is in the support of $\sigma_i^*$ and $u_i(s_i, \sigma_{-i}^*) < u_i(\sigma_i^*, \sigma_{-i}^*)$. Then $s_i$ is paying less than the mixture. Because $u_i(\sigma_i^*, \sigma_{-i}^*)$ is the $\sigma_i^*$-weighted average of the $u_i(s_i', \sigma_{-i}^*)$, some other $s_i'$ in the support must be paying *more* than the average. Moving probability from $s_i$ onto $s_i'$ would raise expected payoff, contradicting equilibrium. Hence every strategy in the support pays exactly the mixture's payoff, which is maximal.
:::

The principle gives a method. To find an equilibrium in which player 1 mixes over a specified support, choose player 2's mixture so as to make player 1 indifferent on that support; then choose player 1's mixture so as to make player 2 indifferent on *their* support; then check that strategies outside the supports are not profitable.

::: example Inspection {#ex-inspection}
A worker chooses Work or Shirk; an inspector chooses Check or Not. Payoffs:

|  | Check | Not |
|---|---|---|
| Work | $2, 1$ | $2, 3$ |
| Shirk | $0, 2$ | $3, 0$ |

(a) Show that there is no pure-strategy Nash equilibrium. (b) Let $p = \Prob(\text{Work})$ and $q = \Prob(\text{Check})$. Find the mixed-strategy equilibrium. (c) What is each player's expected payoff?
::: solution
(a) Against Check, Work pays $2 > 0$; against Not, Shirk pays $3 > 2$. Against Work, Not pays $3 > 1$; against Shirk, Check pays $2 > 0$. Every cell has a profitable deviation.

(b) Worker indifferent: $u_W(\text{Work}) = 2$ for any $q$ (the worker's payoff when working does not depend on inspection, in this specification). That cannot be right for mixing — if Work pays $2$ against both columns, Work pays $2$ for sure, and Shirk pays $0\cdot q + 3(1-q) = 3-3q$. Indifference: $2 = 3 - 3q$, so $3q = 1$, $q = 1/3$. Inspector indifferent: Check pays $1\cdot p + 2(1-p) = 2 - p$; Not pays $3p + 0\cdot(1-p) = 3p$. Set $2 - p = 3p$, so $2 = 4p$, $p = 1/2$.

Check the supports: against $q = 1/3$, Work and Shirk both pay $2$; against $p = 1/2$, Check and Not both pay $3/2$. Neither player has a third strategy. So $\bigl(\tfrac12, \tfrac12\bigr)$ for the worker and $\bigl(\tfrac13, \tfrac23\bigr)$ for the inspector is a mixed-strategy Nash equilibrium.

(c) Expected payoffs: worker $2$, inspector $3/2$. Notice a feature that surprises: the worker's equilibrium payoff is determined by the inspector's mixture, and the inspector's mixture was chosen to make the *worker* indifferent. Each player's equilibrium mixture polices the *other* player. Changing the worker's payoffs, holding the inspector's fixed, changes $q$, not $p$.
:::
:::

That last observation is worth a warning.

::: warning Your mixture is not chosen to maximise your payoff
In a strictly mixed $2\times 2$ equilibrium, player 1's mixture is the one that makes player 2 indifferent. It is *not* the mixture that maximises player 1's payoff against a given $q$ — against a given $q$ not equal to the indifference value, player 1's best response is pure. Changing player 1's payoffs changes player *2*'s equilibrium mixture. Students who "optimise $p$ against $q$" and "optimise $q$ against $p$" as if both were interior maxima of a calculus problem get the wrong equations (the derivatives of $u_1$ with respect to $p$ do not determine $p$). The right equations are the indifference conditions.
:::

::: example Battle of the sexes, mixed equilibrium {#ex-bos-mixed}
In [[game-theory/nash-equilibrium#ex-bos]],

|  | Opera | Match |
|---|---|---|
| Opera | $2, 1$ | $0, 0$ |
| Match | $0, 0$ | $1, 2$ |

let $p = \Prob(\text{row plays Opera})$ and $q = \Prob(\text{column plays Opera})$. Find the mixed-strategy Nash equilibrium and the expected payoffs. Compare with the two pure equilibria.
::: solution
Row indifferent: $2q = 1\cdot(1-q)$, so $2q = 1-q$, $q = 1/3$. Column indifferent: $1\cdot p = 2(1-p)$, so $p = 2(1-p)$, $3p = 2$, $p = 2/3$.

Against $q = 1/3$, Opera and Match both pay $2\cdot\tfrac13 = \tfrac23$ for the row player. Against $p = 2/3$, Opera and Match both pay $\tfrac23$ for the column player. Expected payoffs are $\bigl(\tfrac23, \tfrac23\bigr)$. Each pure equilibrium pays one player $2$ and the other $1$, which both players rank above $\tfrac23$. The mixed equilibrium is worse for *both* than *either* pure equilibrium. It is nonetheless an equilibrium: given the other's mixture, a player is willing to mix. It is a coordination failure, not a solution to the coordination problem.
:::
:::

A general formula is handy. In a $2\times 2$ game where player 1's payoffs are $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ and player 2's are $\begin{pmatrix} e & f \\ g & h \end{pmatrix}$, if an interior mixed equilibrium exists it is

$$
q^* = \frac{d - b}{a - b - c + d},\qquad p^* = \frac{h - g}{e - f - g + h},
$$ {#eq-2x2-mix}

provided the denominators are non-zero and the ratios lie in $(0, 1)$. The formula is just the indifference condition $aq + b(1-q) = cq + d(1-q)$ solved for $q$, and the analogous condition for player 2 solved for $p$. Always derive it from indifference rather than memorising the arrangement of letters.

## Existence

::: theorem Nash's existence theorem {#thm-nash-existence}
Every finite strategic-form game — finitely many players, each with a finite strategy set — has at least one Nash equilibrium in mixed strategies.
:::
::: proof
Sketch. The mixed-strategy set $\Delta(S_1) \times \cdots \times \Delta(S_n)$ is a compact convex subset of a Euclidean space. The best-response correspondence $\sigma \mapsto BR(\sigma)$, with $BR(\sigma) = \prod_i BR_i(\sigma_{-i})$, maps this set into itself. Each $BR_i$ is non-empty (a continuous function on a simplex attains its maximum), convex-valued (a maximiser set of a linear function is a convex subset of the simplex), and upper hemicontinuous (Berge's maximum theorem). Kakutani's fixed-point theorem supplies a $\sigma^*$ with $\sigma^* \in BR(\sigma^*)$, which is a mixed-strategy Nash equilibrium. Nash's 1950 note used this argument; his 1951 paper used the Brouwer fixed-point theorem on a suitably smoothed best-response function instead.
:::

The theorem does not say the equilibrium is unique, or pure, or efficient, or easy to compute. It says the solution concept is not empty. Matching pennies is covered; so is every bimatrix in this course. Computing an equilibrium of a large finite game is another matter: 2-player zero-sum games reduce to linear programming; general 2-player games are PPAD-complete (Chen and Deng 2006), which is a precise way of saying that no fast algorithm is known and none is expected.

::: quiz
A $2\times 2$ game has two distinct pure-strategy Nash equilibria. Which statement is correct?
- [ ] It cannot have a mixed-strategy equilibrium, because existence is an "at least one" result and we already have two
- [x] It has at least one mixed-strategy equilibrium, and in the generic $2\times 2$ case with two pure equilibria there is a third, mixed, equilibrium
- [ ] Every mixed-strategy profile is an equilibrium
- [ ] The mixed equilibrium pays both players more than both pure equilibria
::: solution
[[#thm-nash-existence]] guarantees at least one mixed-strategy equilibrium, but pure strategies *are* mixed strategies (degenerate ones), so the two pure equilibria already fulfil the theorem. In a generic $2\times 2$ game with two pure equilibria — stag hunt, chicken, battle of the sexes — there is in addition an interior mixed equilibrium, found by [[#prop-indifference]]. It need not be better: in battle of the sexes it is worse for both ([[#ex-bos-mixed]]).
:::
:::

## Zero-sum games and minimax

A two-player game is **zero-sum** if $u_2(s) = -u_1(s)$ for every profile $s$ (or, equivalently after an affine transformation, constant-sum). Matching pennies is zero-sum; the prisoner's dilemma is not; inspection as specified above is not. In a zero-sum game one number describes both payoffs, and the equilibrium has a value.

::: theorem von Neumann's minimax theorem {#thm-minimax}
Let $A$ be an $m \times n$ matrix of payoffs to player 1 in a two-player zero-sum game. Then

$$
\max_{\sigma_1 \in \Delta^m} \min_{\sigma_2 \in \Delta^n} \sigma_1\T A \sigma_2 = \min_{\sigma_2 \in \Delta^n} \max_{\sigma_1 \in \Delta^m} \sigma_1\T A \sigma_2.
$$

The common number $v$ is the **value** of the game. A pair $(\sigma_1^*, \sigma_2^*)$ attaining the maximin and minimax is a Nash equilibrium, and every Nash equilibrium yields expected payoff $v$ to player 1.
:::
::: proof
Sketch of the easy direction, and the link to Nash. For any function $f(\sigma_1, \sigma_2)$, $\max_{\sigma_1} \min_{\sigma_2} f \le \min_{\sigma_2} \max_{\sigma_1} f$ always holds (the "maximin $\le$ minimax" inequality). The content of the theorem is the reverse inequality. One proof exhibits a mixed-strategy Nash equilibrium $(\sigma_1^*, \sigma_2^*)$ by [[#thm-nash-existence]] (or, as von Neumann did in 1928, by a separating-hyperplane argument that predates Nash), notes that in a zero-sum game Nash equilibrium is equivalent to each player securing at least $v$ against any deviation, and reads off equality of maximin and minimax. Player 1's equilibrium payoff cannot depend on which equilibrium is selected, because it equals both the maximin and the minimax.
:::

The operational meaning: player 1 has a mixture that **guarantees** at least $v$ no matter what player 2 does, and player 2 has a mixture that **holds** player 1 to at most $v$. In matching pennies, $v = 0$. Security strategies and equilibrium strategies coincide.

::: example A non-symmetric zero-sum game {#ex-zero-sum}
Player 1 chooses rows, player 2 columns, and the entries are player 1's payoffs (player 2 gets the negative):

|  | $L$ | $R$ |
|---|---|---|
| $T$ | $2$ | $-1$ |
| $B$ | $-1$ | $1$ |

Find the mixed-strategy equilibrium and the value.
::: solution
Let $p = \Prob(T)$ and $q = \Prob(L)$. Player 1 indifferent: $2q + (-1)(1-q) = -1\cdot q + 1\cdot(1-q)$, i.e. $3q - 1 = 1 - 2q$, so $5q = 2$, $q = 2/5$. Player 2 indifferent (equivalently, player 1's two columns equalise when $p$ is chosen to make player 2's expected losses equal): player 2's payoff from $L$ is $-2p + 1(1-p) = 1 - 3p$; from $R$, $1\cdot p + (-1)(1-p) = 2p - 1$. Set $1 - 3p = 2p - 1$, so $2 = 5p$, $p = 2/5$.

Value: against $q = 2/5$, row $T$ pays $2\cdot\tfrac25 - 1\cdot\tfrac35 = \tfrac15$. So $v = 1/5$. Check: $p = 2/5$, $q = 2/5$,

$$
u_1 = \frac25\cdot\frac25\cdot 2 + \frac25\cdot\frac35\cdot(-1) + \frac35\cdot\frac25\cdot(-1) + \frac35\cdot\frac35\cdot 1 = \frac{8}{25} - \frac{6}{25} - \frac{6}{25} + \frac{9}{25} = \frac{5}{25} = \frac15.
$$

Player 1, mixing $(2/5, 3/5)$, guarantees $1/5$; player 2, mixing $(2/5, 3/5)$, holds player 1 to $1/5$.
:::
:::

Penalty kicks are a zero-sum game in the scoring rate. Let the kicker be player 1, choosing Left or Right, and let the entries be probabilities of scoring (illustrative numbers, in the range of Palacios-Huerta's estimates, not a forecast):

|  | Keeper Left | Keeper Right |
|---|---|---|
| Kick Left | $0.65$ | $0.95$ |
| Kick Right | $0.90$ | $0.60$ |

Indifference for the kicker: $0.65 q + 0.95(1-q) = 0.90 q + 0.60(1-q)$, i.e. $0.95 - 0.30 q = 0.60 + 0.30 q$, so $0.35 = 0.60 q$, $q = 7/12 \approx 0.583$. Indifference for the keeper (who minimises the scoring rate): $0.65 p + 0.90(1-p) = 0.95 p + 0.60(1-p)$, i.e. $0.90 - 0.25 p = 0.60 + 0.35 p$, so $0.30 = 0.60 p$, $p = 1/2$. The value — the equilibrium scoring rate — is $0.65\cdot\tfrac12 + 0.90\cdot\tfrac12 = 0.775$ when the keeper dives left with probability $7/12$. Palacios-Huerta (2003) reports scoring rates and mixing frequencies in this neighbourhood for professional penalties; Chiappori, Levitt and Groseclose (2002, *American Economic Review*) reach a similar conclusion on a different sample. The fit is not perfect — kickers shoot somewhat too often to their natural side — but it is one of the cleaner field tests of mixed-strategy equilibrium.

## Interpretation and evidence

Three readings of a mixed-strategy equilibrium are in circulation, and they are not equivalent.

**Deliberate randomisation.** The player uses a randomising device. This is the literal reading, and it is plausible for a penalty taker or a poker player. It is less plausible for a firm choosing a price.

**Purification** (Harsanyi 1973). Each player has a small private payoff perturbation, unobserved by the other. In the incomplete-information game, players use *pure* strategies that depend on their perturbation, and the *observed* frequency matches the mixed equilibrium of the unperturbed game. Mixed-strategy equilibrium is then a reduced form of a Bayesian game ([[game-theory/bayesian-games]]). This is the preferred theoretical reading in industrial organisation.

**Population frequencies.** In a large population of players, each using a pure strategy, the *share* using each action equals the mixture. Evolutionary game theory takes this reading; it is natural for driving conventions and some biological contests (Maynard Smith, *Evolution and the Theory of Games*, 1982).

Laboratory evidence is mixed, in both senses. In matching pennies and other zero-sum games with unique mixed equilibria, frequencies often sit near equilibrium, but serial independence usually fails: subjects under-randomise, producing too many alternations or too many runs (a finding that goes back to the 1950s and is surveyed in Camerer 2003, ch. 3). In battle of the sexes, the mixed equilibrium is a poor description of play; pairs often coordinate on a pure equilibrium, sometimes by using labels as a focal point. Walker and Wooders (2001, *American Economic Review*) studied tennis serves at Wimbledon and found that the *direction* of serves was consistent with minimax, with serial dependence weaker than in the laboratory. The field, where the stakes are high and the players are expert, is kinder to the theory than the lab.

O'Neill's 1987 card-game experiment, designed as a clean test of minimax, found aggregate frequencies close to equilibrium and individual play that was noisier. Subsequent reanalyses (Brown and Rosenthal 1990) were less favourable on independence. The honest summary is that mixed-strategy equilibrium is a good first approximation of *average* frequencies in competitive, approximately zero-sum settings, and a poor description of the process that generates those frequencies.

## Where this leads

Mixed strategies close the existence gap for finite games. Two further directions matter for economics. First, many applied models have *continuous* action spaces — quantities, prices, locations, effort — and then a pure-strategy equilibrium often exists without mixing; [[game-theory/continuous-games]] develops that case, with Cournot as the leading example. Second, once players have **types** that others do not observe, a mixed strategy in the reduced form is typically a pure strategy in the type-contingent game: that is Harsanyi's purification, and it is the language of [[game-theory/bayesian-games]] and of auctions in [[market-design/auction-formats]]. Zero-sum thinking also returns in mechanism design, where the designer's problem can sometimes be written as a maximin.

::: history
Émile Borel discussed randomised strategies for symmetric two-player games in notes of 1921–27, without a complete existence proof. John von Neumann's 1928 paper *Zur Theorie der Gesellschaftsspiele* proved the minimax theorem for finite zero-sum games. The extension to non-zero-sum games is Nash's: the 1950 PNAS note and the 1951 *Annals* paper. Harsanyi's 1973 purification theorem, in the *International Journal of Game Theory*, gave mixed equilibria an incomplete-information interpretation that applied theory still uses. The computational complexity of finding a Nash equilibrium of a general finite game was settled, negatively for fast algorithms, by Daskalakis, Goldberg and Papadimitriou (2009) and Chen and Deng (2006).
:::

::: summary
- A mixed strategy is a probability distribution over a finite action set. Expected payoffs are bilinear in the mixtures ([[#def-mixed]]).
- In any mixed-strategy Nash equilibrium, every action in the support of a player's mixture is a best response to the others, and those actions are indifferent ([[#prop-indifference]]). A player's equilibrium mixture is chosen to make the *opponents* indifferent.
- Every finite game has at least one mixed-strategy Nash equilibrium ([[#thm-nash-existence]]). The equilibrium need not be pure, unique or efficient.
- In a $2\times 2$ game an interior mixed equilibrium is computed by solving two indifference equations, one for each player ([[#eq-2x2-mix]]).
- In a finite two-player zero-sum game, maximin equals minimax, the game has a value $v$, and every Nash equilibrium pays $v$ to player 1 ([[#thm-minimax]]). Penalty kicks are the leading field application.
- Changing a player's own payoffs changes the *opponent's* equilibrium mixture in a strictly mixed $2\times 2$ game.
:::

## Exercises

::: exercise Matching pennies, a biased coin {level=1 check="2/5"}
Modify matching pennies so that player 1 wins $2$ (and player 2 loses $2$) if both play Heads, and wins $1$ if both play Tails; mismatches still pay $-1$ to player 1 (and $+1$ to player 2). Find the probability $q$ that player 2 plays Heads in the mixed-strategy equilibrium. (Enter a fraction.)
::: solution
Player 1's payoff from Heads is $2q + (-1)(1-q) = 3q - 1$; from Tails, $-q + 1\cdot(1-q) = 1 - 2q$. Indifference: $3q - 1 = 1 - 2q$, so $5q = 2$ and $q = 2/5$. (Player 1's mixture, which makes player 2 indifferent, is also $p = 2/5$, but that is not asked.) The value is $3\cdot\tfrac25 - 1 = 1/5$.
:::
:::

::: exercise Chicken, mixed {level=1}
In [[game-theory/nash-equilibrium#ex-chicken]], let $p$ be the probability that the row player Swerves. Find the mixed-strategy Nash equilibrium and the expected payoffs.
::: solution
Row player's payoff from Swerve: $2q + 1(1-q) = 1 + q$; from Straight: $3q + 0(1-q) = 3q$, where $q = \Prob(\text{column Swerves})$. Indifference: $1 + q = 3q$, so $q = 1/2$. By symmetry $p = 1/2$. Expected payoff: $3\cdot\tfrac12 = 3/2$ (or $1 + 1/2 = 3/2$). Each pure equilibrium pays $3$ to one player and $1$ to the other; the mixed equilibrium pays $1.5$ each, which is worse for a player than being the one who goes Straight in a pure equilibrium, and better than being the one who Swerves.
:::
:::

::: exercise Inspection, a cost change {level=1 check="3/4"}
In [[#ex-inspection]], suppose checking becomes cheaper for the inspector: the inspector's payoffs in the Check column become $2$ against Work and $3$ against Shirk (the Not column is unchanged at $3$ against Work and $0$ against Shirk). The worker's payoffs are unchanged. Find the new equilibrium probability that the worker Works. (Enter a fraction.)
::: solution
The worker's payoffs are unchanged, so the inspector's mixture still makes the worker indifferent: $q = 1/3$ as before. The worker's mixture makes the *inspector* indifferent, and the inspector's payoffs have changed. Check now pays $2p + 3(1-p) = 3 - p$; Not still pays $3p$. Set $3 - p = 3p$, so $3 = 4p$ and $p = 3/4$. The worker Works with probability $3/4$. Cheaper inspection leads the *worker* to work more often: changing the inspector's payoffs changes $p$, not $q$, which is the comparative-static content of [[#prop-indifference]].
:::
:::

::: exercise Stag hunt mixed {level=2}
In [[game-theory/nash-equilibrium#ex-stag]], find the mixed-strategy Nash equilibrium. For which beliefs $p = \Prob(\text{other plays Stag})$ is Stag a best response? How does the mixed equilibrium relate to risk dominance?
::: solution
Row payoff of Stag: $5q$; of Hare: $3$. Indifference: $5q = 3$, $q = 3/5$. By symmetry $p = 3/5$. Expected payoffs: $3$ each, the same as the inefficient pure equilibrium. Stag is a best response if $5p \ge 3$, i.e. $p \ge 3/5$. The mixed equilibrium sits at the threshold: it is the belief at which both actions are best responses. Risk dominance selects Hare because the basin $p < 3/5$ is larger than the basin $p > 3/5$ ([[game-theory/nash-equilibrium]]).
:::
:::

::: exercise A $2\times 2$ by the formula {level=2 check="1/2"}
Player 1's payoffs are $\begin{pmatrix} 3 & 0 \\ 1 & 2 \end{pmatrix}$ and player 2's are $\begin{pmatrix} 2 & 3 \\ 4 & 1 \end{pmatrix}$. Confirm that there is no pure-strategy Nash equilibrium. Then, using indifference or [[#eq-2x2-mix]], find the equilibrium probability that player 2 plays the first column. (Enter a fraction.)
::: solution
Against column 1, row 1 pays $3 > 1$; against column 2, row 2 pays $2 > 0$. Against row 1, column 2 pays $3 > 2$; against row 2, column 1 pays $4 > 1$. No cell is a mutual best response.

Player 1 is indifferent when $3q + 0(1-q) = 1\cdot q + 2(1-q)$, i.e. $3q = 2 - q$, so $4q = 2$ and $q = 1/2$. (The formula $q^* = (d-b)/(a-b-c+d)$ gives $(2-0)/(3-0-1+2) = 2/4 = 1/2$.) Player 1's mixture, not asked, is $p^* = (h-g)/(e-f-g+h) = (1-4)/(2-3-4+1) = (-3)/(-4) = 3/4$. Against $q = 1/2$, both rows pay $3/2$.
:::
:::

::: exercise Penalty-kick value {level=2 check="0.775"}
Using the scoring-rate matrix in the text (kicker Left/Right, keeper Left/Right; entries $0.65, 0.95; 0.90, 0.60$), compute the equilibrium scoring rate to three decimals. (Enter the rate, for example 0.775.)
::: solution
The keeper dives left with probability $q = 7/12$. The kicker's Left expected scoring rate is $0.65\cdot\tfrac{7}{12} + 0.95\cdot\tfrac{5}{12} = (4.55 + 4.75)/12 = 9.3/12 = 0.775$. The same number is $0.90\cdot\tfrac12 + 0.60\cdot\tfrac12$ wait — that would be the rate if the kicker mixed $1/2$ and the keeper always... Directly: with $p = 1/2$ and $q = 7/12$,

$$
0.5\cdot 0.65\cdot\tfrac{7}{12} + 0.5\cdot 0.95\cdot\tfrac{5}{12} + 0.5\cdot 0.90\cdot\tfrac{7}{12} + 0.5\cdot 0.60\cdot\tfrac{5}{12} = 0.775,
$$

matching the kicker's indifferent payoff. The equilibrium scoring rate is $0.775$.
:::
:::

::: exercise Security versus equilibrium {level=3}
In the zero-sum game of [[#ex-zero-sum]], compute player 1's **maximin in pure strategies** (the best guaranteed payoff when both players are restricted to pure strategies) and compare it with the value $v = 1/5$. Interpret the gap.
::: hint
For each of player 1's rows, find the minimum over columns; then maximise over rows. That is $\max_i \min_j A_{ij}$.
:::
::: solution
Row $T$ has minimum $-1$; row $B$ has minimum $-1$. Pure maximin is $-1$. Pure minimax: column $L$ has maximum $2$; column $R$ has maximum $1$; so $\min_j \max_i A_{ij} = 1$. Pure maximin $-1$ is strictly less than pure minimax $1$, which is strictly larger than the mixed value $v = 1/5$. Mixing closes the gap: player 1 can guarantee $1/5 > -1$ by randomising, and player 2 can hold player 1 to $1/5 < 1$ by randomising. The minimax theorem is a theorem about *mixed* strategies; it can fail in pure strategies, which is why matching pennies has no pure value either.
:::
:::

::: exercise A three-strategy mixture {level=3}
Rock–paper–scissors has payoffs $1$ for a win, $-1$ for a loss, $0$ for a draw, with Rock beating Scissors, Scissors beating Paper, Paper beating Rock. Argue that the unique mixed-strategy Nash equilibrium is uniform, $(1/3, 1/3, 1/3)$ for each player, and that the value is $0$. Why can there be no equilibrium in which a player puts probability zero on one action?
::: hint
If player 2 puts probability zero on Rock, player 1's unique best response is Scissors (which never loses and sometimes beats Paper). Then player 2 would want to play Rock.
:::
::: solution
The game is symmetric and zero-sum, so $v = 0$ if an equilibrium exists, and a symmetric equilibrium exists by [[#thm-nash-existence]] plus symmetry. Uniform mixing yields expected payoff $0$ against every pure strategy (each action wins, loses and draws with probability $1/3$), so it is a best response to itself.

Suppose, for a contradiction, that player 2 puts probability zero on Rock and positive probability on Paper and Scissors. Then player 1's payoff from Scissors is $0\cdot\sigma_2(R) + 1\cdot\sigma_2(P) + 0\cdot\sigma_2(S) = \sigma_2(P) > 0$; from Paper, $0\cdot\sigma_2(R) + 0\cdot\sigma_2(P) + (-1)\sigma_2(S) = -\sigma_2(S) < 0$; from Rock, $0\cdot\sigma_2(R) + (-1)\sigma_2(P) + 1\cdot\sigma_2(S) = \sigma_2(S) - \sigma_2(P)$. Scissors uniquely maximises if $\sigma_2(P) > 0$, which it is. Player 1 then plays Scissors for sure, against which player 2's unique best response is Rock — contradicting that Rock was unused. Any hole in the support unravels. Hence both players use all three actions, and indifference forces equal probabilities.
:::
:::

::: exercise Comparative statics of mixing {level=2}
In the inspection game of [[#ex-inspection]], the worker's payoff from Shirk against Not rises from $3$ to $3+\alpha$ with $\alpha > 0$ (a more tempting shirk). Inspector payoffs are unchanged. Show that in the mixed equilibrium the inspector Checks *more* often, while the worker's mixture is unchanged. What happens to each player's expected payoff?
::: solution
Worker indifference: Work still pays $2$; Shirk pays $0\cdot q + (3+\alpha)(1-q) = (3+\alpha)(1-q)$. Set $2 = (3+\alpha)(1-q)$, so $1-q = 2/(3+\alpha)$ and $q = 1 - 2/(3+\alpha) = (1+\alpha)/(3+\alpha)$, which is larger than $1/3$ for $\alpha > 0$. Inspector indifference uses inspector payoffs, which have not changed, so $p = 1/2$ as before. The worker's expected payoff equals Work's payoff, which is $2$ still. The inspector's expected payoff equals $2 - p = 2 - 1/2 = 3/2$, also unchanged. A more tempting shirk is fully offset, in equilibrium, by more frequent inspection; neither expected payoff moves. That is typical of strictly mixed $2\times 2$ games: each player's payoff is pinned down by the *other* player's indifference, hence by the *other* player's payoff matrix.
:::
:::

