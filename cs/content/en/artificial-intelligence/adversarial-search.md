In the search problems of [[artificial-intelligence/search]] the agent alone decides what happens. In a game it does not: after each of our moves an opponent replies, choosing whatever is worst for us. A "solution" can no longer be a sequence of moves, because we do not know what the opponent will do; it has to be a **strategy** that says what to do in every position the opponent might lead us into. Games have been a laboratory for AI since its beginnings — Turing and Shannon both wrote chess programs on paper around 1950 — because they are easy to state, hard to play well, and come with an unarguable performance measure.

This chapter treats two-player, turn-taking, **zero-sum** games of **perfect information**, such as chess, draughts, Go, tic-tac-toe and Connect Four. We define the **minimax value** of a game, prove that it is what each player can guarantee, and compute it by depth-first search. **Alpha–beta pruning** computes the same value while skipping branches that cannot matter; we prove it correct and show, following Knuth and Moore, that with perfect move ordering it examines only about the square root of the leaves, so that it searches twice as deep in the same time. Real programs cut the search off at a fixed depth and apply an **evaluation function**. Finally, **Monte Carlo tree search** replaces evaluation functions by random playouts and guides its search with the UCB1 rule from the theory of bandits — the method that, combined with learned evaluations, transformed computer Go.

## Games and minimax

::: definition Two-player zero-sum game {#def-game}
A **game** (two-player, deterministic, turn-taking, perfect information) consists of a set of states with an initial state $s_0$; a function $\mathrm{ToMove}(s) \in \{\mathrm{MAX}, \mathrm{MIN}\}$ naming the player to move; actions $\mathrm{Actions}(s)$ and a transition model $\mathrm{Result}(s, a)$; a **terminal test** $\mathrm{IsTerminal}(s)$; and a **utility function** $\mathrm{Utility}(s)$ giving the payoff to MAX at a terminal state $s$. The game is **zero-sum**: MIN's payoff is $-\mathrm{Utility}(s)$, so MIN wants the utility to be as small as possible. We assume every play reaches a terminal state after finitely many moves.
:::

For chess, utilities are $+1$, $0$ and $-1$ for a win, draw and loss of White (MAX). The **game tree** has a node for every sequence of moves from $s_0$; its leaves are terminal states. Tic-tac-toe's game tree has $549{,}946$ nodes (counted below). For chess, Shannon (1950) estimated about $10^{120}$ possible games and about $10^{43}$ positions.

::: definition Minimax value {#def-minimax}
The **minimax value** of a state $s$ is defined recursively:
$$
\mathrm{Minimax}(s) = \begin{cases}
\mathrm{Utility}(s) & \text{if } s \text{ is terminal,}\\
\max_{a \in \mathrm{Actions}(s)} \mathrm{Minimax}(\mathrm{Result}(s, a)) & \text{if } \mathrm{ToMove}(s) = \mathrm{MAX},\\
\min_{a \in \mathrm{Actions}(s)} \mathrm{Minimax}(\mathrm{Result}(s, a)) & \text{if } \mathrm{ToMove}(s) = \mathrm{MIN}.
\end{cases}
$$
:::

The recursion is well defined because every play is finite: define it bottom-up by the height of the node in the game tree. A **strategy** for MAX chooses an action at every MAX node; a **minimax strategy** chooses an action attaining the maximum.

::: theorem Minimax value is the value of the game {#thm-minimax}
For every state $s$ with minimax value $v$: (1) MAX has a strategy that guarantees a utility of at least $v$ from $s$, whatever MIN does; (2) MIN has a strategy that guarantees a utility of at most $v$, whatever MAX does. Both are achieved by minimax strategies. Consequently, against a MIN who plays a minimax strategy, no MAX strategy obtains more than $v$.
:::

::: proof
By induction on the height $h$ of $s$ (the length of the longest play from $s$). If $h = 0$, $s$ is terminal and the utility is $v$ whatever anyone does. Suppose $h > 0$ and that the claims hold for all states of smaller height; every successor $\mathrm{Result}(s, a)$ has smaller height. If MAX is to move, let $a^*$ attain the maximum, so $\mathrm{Minimax}(\mathrm{Result}(s, a^*)) = v$. MAX plays $a^*$ and then, by the induction hypothesis (1), has a strategy guaranteeing at least $v$ from there; this proves (1). For (2), whatever action $a$ MAX plays, $\mathrm{Minimax}(\mathrm{Result}(s, a)) \le v$, and by the induction hypothesis (2) MIN has a strategy from $\mathrm{Result}(s, a)$ that holds MAX to at most that value; combining these strategies (one for each $a$) gives a MIN strategy from $s$ that guarantees at most $v$. The case where MIN is to move is symmetric. The last sentence follows from (2).
:::

So the minimax value is the outcome of **optimal play** by both sides. For tic-tac-toe it is $0$ — a draw — and for chess it is unknown. In 1913 Ernst Zermelo proved, in essence, this theorem for chess: either White can force a win, or Black can, or both can force at least a draw.

Minimax is optimal against an optimal opponent. Against a fallible opponent another strategy may do better in expectation — for instance by setting traps that a minimax strategy, indifferent between equally valued moves, would not prefer — but no strategy does better in the worst case.

### The minimax algorithm

The definition is a depth-first recursion:

::: algorithm Minimax search {#alg-minimax}
```text
MINIMAX(s)
1  if IS-TERMINAL(s): return UTILITY(s)
2  if TO-MOVE(s) = MAX: return max over a in ACTIONS(s) of MINIMAX(RESULT(s, a))
3  else:                return min over a in ACTIONS(s) of MINIMAX(RESULT(s, a))
```
At the root, MAX plays an action $a$ whose child has the largest value.
:::

It visits the whole game tree: with branching factor $b$ and maximum depth $m$, time $O(b^m)$ and space $O(bm)$ (or $O(m)$ if actions are generated one at a time).

::: example Solving tic-tac-toe {#ex-tictactoe}
Compute the minimax value of tic-tac-toe and count the nodes the algorithm visits.
::: solution
A board is a string of nine characters, `X`, `O` or `.`, in reading order; X (MAX) moves first.

```python
import math
LINES = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]

def utility(b):           # +1 if X has three in a row, -1 if O has, 0 for a full board
    for i, j, k in LINES:
        if b[i] != "." and b[i] == b[j] == b[k]:
            return 1 if b[i] == "X" else -1
    return 0 if "." not in b else None        # None: not terminal

def children(b):
    p = "X" if b.count("X") == b.count("O") else "O"
    return [b[:i] + p + b[i+1:] for i in range(9) if b[i] == "."]

nodes = 0
def minimax(b):
    global nodes; nodes += 1
    u = utility(b)
    if u is not None: return u
    vals = [minimax(c) for c in children(b)]
    return max(vals) if b.count("X") == b.count("O") else min(vals)

print("minimax value", minimax("." * 9), "nodes", nodes)
```

```console
$ python3 ttt.py
minimax value 0 nodes 549946
alpha-beta value 0 nodes 18297
```

(The second line comes from the alpha–beta function of the next section, added to the same file.) The value is $0$: with best play tic-tac-toe is a draw. The game tree has $549{,}946$ nodes, of which $255{,}168$ are terminal — the number of distinct complete games. There are only $5478$ distinct legal *positions*, so a search that remembered positions it had already evaluated (a **transposition table**) would do roughly a hundred times less work.
:::
:::

## Alpha–beta pruning

Minimax examines every leaf. Yet often a leaf cannot affect the value at the root. Consider a MAX root with three MIN children whose leaves are $(5, 9, 6)$, $(3, 8, 7)$ and $(9, 4, 6)$. The first MIN node has value $5$. At the second, the first leaf is $3$: this MIN node's value is at most $3$, so MAX, who can already get $5$, will never choose it — its remaining leaves $8$ and $7$ are irrelevant. At the third, after the leaves $9$ and $4$ the value is at most $4 < 5$, and the leaf $6$ is irrelevant. The root's value is $5$, found from $6$ of the $9$ leaves.

Alpha–beta search makes this systematic by passing down two bounds:
- $\alpha$, the best value MAX is already assured of on the path to the current node (initially $-\infty$);
- $\beta$, the best value (lowest) MIN is already assured of on that path (initially $+\infty$).

A node whose value is known to fall outside the window $(\alpha, \beta)$ cannot influence the root, and its remaining children are skipped.

::: algorithm Alpha–beta search {#alg-alphabeta}
```text
ALPHA-BETA(s, α, β)
1  if IS-TERMINAL(s): return UTILITY(s)
2  if TO-MOVE(s) = MAX
3      v ← −∞
4      for each a in ACTIONS(s)
5          v ← max(v, ALPHA-BETA(RESULT(s, a), α, β))
6          if v ≥ β: return v                ▷ β cut-off: MIN will avoid s
7          α ← max(α, v)
8      return v
9  else                                       ▷ MIN to move, symmetric
10     v ← +∞
11     for each a in ACTIONS(s)
12         v ← min(v, ALPHA-BETA(RESULT(s, a), α, β))
13         if v ≤ α: return v                ▷ α cut-off: MAX will avoid s
14         β ← min(β, v)
15     return v
```
The root call is $\mathrm{ALPHA\text{-}BETA}(s_0, -\infty, +\infty)$.
:::

What does alpha–beta return at an interior node, where it may stop early? Not always the minimax value — but always enough to decide whether that value matters.

::: theorem Correctness of alpha–beta {#thm-alphabeta}
Let $\alpha < \beta$ and $v = \mathrm{ALPHA\text{-}BETA}(s, \alpha, \beta)$, $m = \mathrm{Minimax}(s)$. Then
1. if $\alpha < m < \beta$, then $v = m$;
2. if $m \le \alpha$, then $m \le v \le \alpha$;
3. if $m \ge \beta$, then $\beta \le v \le m$.

In particular $\mathrm{ALPHA\text{-}BETA}(s_0, -\infty, +\infty) = \mathrm{Minimax}(s_0)$.
:::

::: proof
By induction on the height of $s$. For a terminal $s$, $v = m$ and all three statements hold.

Let MAX be to move at $s$, with children $c_1, \dots, c_k$ in the order examined, minimax values $m_1, \dots, m_k$ (so $m = \max_i m_i$) and returned values $v_1, v_2, \dots$. While no cut-off has occurred, child $c_i$ is searched with window $(\alpha_i, \beta)$ where $\alpha_1 = \alpha$ and $\alpha_{i+1} = \max(\alpha_i, v_i)$, by lines 5 and 7. The induction hypothesis for $c_i$ gives:

- (a) if $m_i < \beta$, then $v_i < \beta$ and $\max(v_i, \alpha_i) = \max(m_i, \alpha_i)$, and moreover $v_i \ge m_i$ (if $\alpha_i < m_i$ then $v_i = m_i$; if $m_i \le \alpha_i$ then $m_i \le v_i \le \alpha_i$);
- (b) if $m_i \ge \beta$, then $\beta \le v_i \le m_i$.

*Case $m < \beta$.* Every $m_i < \beta$, so by (a) no $v_i$ reaches $\beta$, no cut-off occurs, and the node returns $v = \max_i v_i$. Using (a) repeatedly, $\alpha_{i+1} = \max(\alpha_i, v_i) = \max(\alpha_i, m_i)$, so $\alpha_{k+1} = \max(\alpha, m)$; on the other hand $\alpha_{k+1} = \max(\alpha, v_1, \dots, v_k) = \max(\alpha, v)$. Hence $\max(\alpha, v) = \max(\alpha, m)$. If $\alpha < m$, this forces $v = m$: statement 1. If $m \le \alpha$, it gives $v \le \alpha$, and $v = \max_i v_i \ge \max_i m_i = m$ by (a): statement 2.

*Case $m \ge \beta$.* Let $j$ be the first child with $m_j \ge \beta$. Children before it return values below $\beta$ by (a), so no cut-off occurs before $c_j$; by (b), $v_j \ge \beta$, so line 6 fires and the node returns $\max(v_1, \dots, v_j) = v_j$ (the earlier values are below $\beta \le v_j$). By (b), $\beta \le v_j \le m_j \le m$: statement 3.

The MIN case is symmetric (exchange the roles of $\max$ and $\min$, $\alpha$ and $\beta$). At the root, $\alpha = -\infty < m < +\infty = \beta$, so statement 1 applies.
:::

The theorem has a practical reading: if we only need to know whether the value exceeds some threshold $t$, call alpha–beta with the **null window** $(t - 1, t)$ (for integer utilities); the result tells us which side of $t$ the value is on, and such searches prune far more. Programs such as those using **principal variation search** or **MTD(f)** are built from null-window searches.

```python
def alphabeta(b, alpha=-math.inf, beta=math.inf):     # same board functions as above
    global nodes; nodes += 1
    u = utility(b)
    if u is not None: return u
    if b.count("X") == b.count("O"):                   # MAX to move
        v = -math.inf
        for c in children(b):
            v = max(v, alphabeta(c, alpha, beta))
            if v >= beta: return v                     # beta cut-off
            alpha = max(alpha, v)
    else:                                              # MIN to move
        v = math.inf
        for c in children(b):
            v = min(v, alphabeta(c, alpha, beta))
            if v <= alpha: return v                    # alpha cut-off
            beta = min(beta, v)
    return v
```

On tic-tac-toe it visits $18{,}297$ nodes instead of $549{,}946$ — a factor of thirty — and returns the same value, $0$, as the output in [[#ex-tictactoe]] shows.

::: example Tracing alpha–beta {#ex-alphabeta-trace}
Trace alpha–beta on the tree with MAX root and MIN children $A = (5, 9, 6)$, $B = (3, 8, 7)$, $C = (9, 4, 6)$, showing the window at each MIN node and the leaves pruned. Then reorder the children to minimise the number of leaves examined.
::: solution
| step | node | window $(\alpha, \beta)$ | leaves seen | returned | effect at root |
|---|---|---|---|---|---|
| 1 | $A$ | $(-\infty, \infty)$ | $5, 9, 6$ | $5$ | $\alpha \gets 5$ |
| 2 | $B$ | $(5, \infty)$ | $3$ — then $3 \le \alpha$: cut-off | $3$ | none |
| 3 | $C$ | $(5, \infty)$ | $9, 4$ — then $4 \le \alpha$: cut-off | $4$ | none |

The root returns $\max(5, 3, 4) = 5$. Six leaves are examined. Note that the values returned for $B$ and $C$ are not their minimax values ($3$ and $4$): by [[#thm-alphabeta]] (statement 2) they are only upper bounds that are at most $\alpha = 5$, which is all the root needs.

With the best ordering, the best move comes first at every node: at the root the child with the highest value ($A$, value $5$), and in each MIN node the lowest leaf first. Ordering $A = (5, 6, 9)$, then $C = (4, 6, 9)$, then $B = (3, 7, 8)$: $A$ needs all three leaves (its value must be established exactly), but $C$ and $B$ are each refuted by their first leaf. Five leaves — which is $b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1 = 3 + 3 - 1$ for $b = 3$, $d = 2$, the minimum of [[#thm-knuth-moore]].
:::
:::

::: quiz
In alpha–beta search, a MIN node is searched with window $(\alpha, \beta) = (4, 10)$ and returns $2$. What can you conclude about its minimax value $m$?

- [ ] $m = 2$.
- [x] $m \le 2$.
- [ ] $2 \le m \le 4$.
- [ ] Nothing, because the search was cut off.
::: solution
Since $2 \le \alpha = 4$, statement 2 of [[#thm-alphabeta]] applies: $m \le v \le \alpha$, so $m \le 2$. (A MIN node's running value only decreases as children are examined, so the cut-off value $2$ is an upper bound on its minimax value.) The exact value might be smaller — some of its children were never examined — but it does not matter to MAX, who already has $4$.
:::
:::

### How much does alpha–beta save?

The saving depends entirely on the order in which moves are examined. If the best move is always tried first, every other move is refuted as quickly as possible.

::: theorem Knuth–Moore: the minimal tree {#thm-knuth-moore}
In a uniform game tree of branching factor $b$ and depth $d$, any algorithm that determines the minimax value of the root for all assignments of leaf values must, on some assignment, examine at least
$$
L(b, d) = b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1
$$
leaves; more precisely, for every assignment it must examine a set of leaves containing a "proof" of the value, of which the smallest have exactly $L(b, d)$ leaves. Alpha–beta with perfect move ordering examines exactly $L(b, d)$ leaves.
:::

::: proof
*Proofs of bounds.* To be sure that $\mathrm{Minimax}(s_0) \ge v$, it is enough to know a MAX **strategy subtree**: the subtree that contains, at each MAX node, one chosen child and, at each MIN node, *all* children, with every leaf in it at least $v$. Conversely, if the examined leaves contain no such subtree with leaves $\ge v$, an adversary can lower the unexamined leaves to make the value less than $v$ (if for every MAX strategy some leaf of its subtree is unexamined or $< v$, set the unexamined leaves to $-\infty$; then every MAX strategy is held below $v$ by some MIN reply, and by [[#thm-minimax]] the value is below $v$). So any algorithm that knows the value $v$ has examined all leaves of a MAX strategy subtree with leaves $\ge v$, and similarly all leaves of a MIN strategy subtree (one child at MIN nodes, all at MAX nodes) with leaves $\le v$.

*Sizes.* Along a root-to-leaf path in a MAX strategy subtree, the MAX levels contribute a factor $1$ and the MIN levels a factor $b$. The root is a MAX level, so of the $d$ levels above the leaves, $\lceil d/2\rceil$ are MAX levels and $\lfloor d/2\rfloor$ are MIN levels: the subtree has $b^{\lfloor d/2\rfloor}$ leaves. A MIN strategy subtree has $b^{\lceil d/2\rceil}$ leaves. A MAX strategy subtree and a MIN strategy subtree share exactly one leaf: starting at the root, the common part must follow MAX's single choice at MAX nodes and MIN's single choice at MIN nodes, which defines a unique path. So the examined set has at least $b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1$ leaves.

*Alpha–beta attains it.* With perfect ordering, call a node of **type 1** if it is the root or the first child of a type-1 node; **type 2** if it is a non-first child of a type-1 node or any child of a type-3 node; **type 3** if it is the first child of a type-2 node. Knuth and Moore show by induction that alpha–beta searches all children of type-1 and type-3 nodes and only the first child of type-2 nodes (the first child refutes the move — it already reaches the bound that causes a cut-off). This is exactly the union of the principal variation's MAX strategy subtree and MIN strategy subtree, with $L(b, d)$ leaves. We check the count experimentally below rather than reproduce the induction.
:::

For $b = 35$ and $d = 10$ (a rough model of chess), $L \approx 2 \cdot 35^5 \approx 1.05 \times 10^{8}$ against $35^{10} \approx 2.8 \times 10^{15}$: alpha–beta with good ordering can search about **twice as deep** as minimax in the same time, since $L(b, d) \approx 2b^{d/2}$, the effective branching factor drops from $b$ to $\sqrt b$.

::: example Move ordering on random trees {#ex-ordering}
Generate uniform trees with random leaf values (fixed seed, $20$ trees per row) and count the leaves examined by alpha–beta with worst-first, random and best-first ordering. Compare with $L(b, d)$.
::: solution
```python
import math, random

def make_tree(b, d, rng):            # nested lists; leaves are distinct random values
    return rng.random() if d == 0 else [make_tree(b, d - 1, rng) for _ in range(b)]

def minimax(t, maxing):
    if not isinstance(t, list): return t
    vals = [minimax(c, not maxing) for c in t]
    return max(vals) if maxing else min(vals)

def reorder(t, maxing, best_first):  # put the best (or worst) move for the mover first
    if not isinstance(t, list): return t
    kids = [reorder(c, not maxing, best_first) for c in t]
    kids.sort(key=lambda c: minimax(c, not maxing), reverse=(maxing == best_first))
    return kids
```

With the `alphabeta` of the algorithm above (counting leaves), the program prints:

```console
$ python3 ordering.py
 b  d   b^d    worst   random    best   b^ceil(d/2)+b^floor(d/2)-1
 2  6     64       62       40      15       15
 3  5    243      230      115      35       35
 4  6   4096     3554      891     127      127
 5  6  15625    13228     2506     249      249
 8  4   4096     3896     1014     127      127
10  4  10000     9511     1837     199      199
```

Best-first ordering attains $L(b, d)$ exactly in every case, confirming [[#thm-knuth-moore]]; worst-first ordering prunes almost nothing. Random ordering lies in between: for $b = 4$, $d = 6$ it examines $891 \approx 3.1^6$ leaves, an effective branching factor of about $b^{0.8}$. (For independent continuous leaf values and $d \to \infty$, Pearl proved in 1982 that the effective branching factor of alpha–beta tends to $\xi_b/(1 - \xi_b)$, where $\xi_b$ is the positive root of $x^b + x - 1 = 0$: $2.63$ for $b = 4$ and $5.06$ for $b = 10$ — somewhat below $b^{3/4}$, the figure often quoted for moderate $b$.)
:::
:::

::: widget plot
f: x*log10(b); (x/2)*log10(b) + log10(2); (3*x/4)*log10(b)
x: 1, 20
sliders: b=2:1:40
labels: \log_{10} b^d \text{ (minimax)}; \log_{10} 2b^{d/2} \text{ (best ordering)}; \log_{10} b^{3d/4}
caption: The number of leaves searched, on a logarithmic scale, against the depth $d$, for minimax, alpha–beta with perfect ordering, and the rough rule $b^{3d/4}$ for random ordering. Move the slider to $b = 35$ (chess-like): with a budget of $10^{8}$ leaves minimax reaches depth $5$, perfectly ordered alpha–beta depth $10$. Good move ordering is worth as much as a thousandfold faster computer.
:::

In practice programs get close to perfect ordering with cheap tricks: they search with **iterative deepening** ([[artificial-intelligence/search#thm-ids]]) and try first the move that was best at the previous depth; they try captures first; they remember **killer moves** that caused cut-offs at the same depth elsewhere; and they keep a **history** score for each move. A **transposition table** — a hash table of positions already searched, with their values and bounds — avoids re-searching positions reached by different move orders.

::: warning Pruned values are bounds, not values
A common bug when implementing alpha–beta is to store the value returned from a cut-off node in a transposition table, or report it to the user, as if it were the minimax value of that node. By [[#thm-alphabeta]] it is only an upper bound (after an $\alpha$ cut-off) or a lower bound (after a $\beta$ cut-off). Transposition tables must record which kind of value they hold — exact, lower bound or upper bound — and use it only when it is valid for the new window. Similarly, alpha–beta is guaranteed to choose a *best* root move, but the values of the *other* root moves it reports are bounds; to rank all moves you must search each with a full window.
:::

## Imperfect real-time decisions

Even with perfect pruning, chess cannot be searched to the end. Following Shannon (1950), programs cut the search off at some depth and estimate the value of the positions there.

- An **evaluation function** $\mathrm{Eval}(s)$ estimates the utility of a non-terminal state. Classically it is a **weighted linear function** of **features**, $\mathrm{Eval}(s) = w_1 f_1(s) + \dots + w_n f_n(s)$, such as material (pawn $1$, knight and bishop $3$, rook $5$, queen $9$), mobility, king safety and pawn structure. It should agree with the utility on terminal states, be fast, and be strongly correlated with the actual chances of winning.
- A **cutoff test** $\mathrm{IsCutoff}(s, \text{depth})$ replaces the terminal test: return $\mathrm{Eval}(s)$ when the depth limit is reached. Iterative deepening lets the program stop when its time is up, playing the best move from the deepest completed search.
- **Quiescence search** continues beyond the depth limit along "noisy" moves (captures, checks) until the position is quiet, because evaluating in the middle of an exchange of pieces is meaningless.
- The **horizon effect** is the tendency to push an unavoidable loss beyond the depth limit with delaying moves, so that the search does not see it. Quiescence search and **singular extensions** (searching deeper when one move is much better than the others) mitigate it.
- **Forward pruning** discards moves that look bad without searching them fully — beam search, late-move reductions, null-move pruning. It is not guaranteed to preserve the minimax value, but in practice it lets programs search much deeper.

Only the *order* of the evaluation values matters for deterministic minimax: any strictly increasing transformation of $\mathrm{Eval}$ gives the same choices.

### Games of chance

In backgammon, dice rolls add **chance nodes** to the tree. The **expectiminimax** value of a chance node is the probability-weighted average of its children's values:
$$
\mathrm{ExpectiMinimax}(s) = \sum_{r} P(r)\, \mathrm{ExpectiMinimax}(\mathrm{Result}(s, r))
$$
for a chance node $s$ with outcomes $r$, and $\max$ or $\min$ at player nodes, as before. Now the *scale* of the evaluation function matters, not just its order: a monotone transformation can change which move has the highest expectation. Alpha–beta-style pruning is still possible at chance nodes if the utilities are bounded, but it is far less effective, and the extra branching (21 distinct rolls of two dice in backgammon) limits search depth; strong backgammon programs rely on shallow search with very good learned evaluation functions.

## Monte Carlo tree search

For Go, the evaluation-function approach failed for decades: the branching factor is about $250$, and no simple combination of features predicts who will win. **Monte Carlo tree search** (MCTS) estimates the value of a position by **playouts**: play the game to the end many times with fast, usually random, moves, and average the results. Played naively, this wastes playouts on hopeless moves. MCTS grows a search tree asymmetrically, spending its playouts where they matter.

::: algorithm Monte Carlo tree search {#alg-mcts}
Repeat until the time is up, then play the root action that was visited most often:
1. **Selection.** Starting at the root, repeatedly move to a child chosen by a **tree policy** that balances exploitation and exploration, until reaching a node that has an untried action (or is terminal).
2. **Expansion.** Add a child for one untried action.
3. **Simulation.** From the new node, play the game to the end with a fast **playout policy** (for example uniformly random moves).
4. **Back-propagation.** Update the statistics of every node on the path: increment its visit count $N$, and add the outcome (from the point of view of the player who made the move into that node) to its total reward $W$.
:::

The tree policy is the crux. MCTS treats the choice at each node as a **multi-armed bandit**: a gambler facing $k$ slot machines with unknown payout rates wants to maximise winnings, trading off playing the machine that has paid best so far (exploitation) against trying others whose rates are uncertain (exploration). The **UCB1** rule (Auer, Cesa-Bianchi and Fischer, 2002) plays the arm maximising an **upper confidence bound**
$$
\mathrm{UCB1}(i) = \frac{W_i}{N_i} + c\sqrt{\frac{\ln N}{N_i}},
$$ {#eq-ucb1}
where $W_i/N_i$ is arm $i$'s mean reward so far, $N_i$ its number of plays, $N = \sum_i N_i$, and $c$ a constant ($\sqrt 2$ in the original analysis, for rewards in $[0, 1]$). The second term is large for rarely tried arms and shrinks as an arm is played; it grows slowly with $N$, so every arm is tried infinitely often, but suboptimal arms only logarithmically often.

::: theorem UCB1 and UCT (stated without proof) {#thm-uct}
1. *(Auer, Cesa-Bianchi and Fischer, 2002.)* For a $k$-armed bandit with rewards in $[0, 1]$, UCB1 with $c = \sqrt 2$ plays each suboptimal arm $i$ an expected $O(\ln n / \Delta_i^2)$ times in the first $n$ plays, where $\Delta_i$ is the gap between the best mean and arm $i$'s mean. Its expected **regret** — the reward lost compared with always playing the best arm — is $O(\log n)$, which is optimal up to a constant factor.
2. *(Kocsis and Szepesvári, 2006.)* MCTS with UCB1 as its tree policy, called **UCT** (upper confidence bounds applied to trees), with a suitable exploration constant, on a finite game tree: the probability that the most visited root action is suboptimal converges to $0$ as the number of iterations grows, and the estimated value at the root converges to the minimax value.
:::

A first intuition for part 1: after $n$ plays, the true mean of an arm played $N_i$ times differs from its sample mean by more than $\sqrt{2\ln n/N_i}$ with probability at most about $n^{-4}$ (Hoeffding's inequality), so the UCB is an optimistic estimate with high probability, and an arm is played only while its optimistic estimate can beat the best arm's — about $8\ln n/\Delta_i^2$ times. The analysis of UCT is harder because the payoffs at inner nodes drift as the tree below them changes.

::: quiz
After many iterations of MCTS, which root move should the agent play?

- [ ] The move with the highest UCB1 value.
- [x] The move with the most visits.
- [ ] The move whose last playout was a win.
- [ ] The move with the fewest visits, since it is the most uncertain.
::: solution
The UCB1 value includes an exploration bonus, which is there to gather information, not to pick the final move; a rarely tried move can have a high UCB1 value just because it is uncertain. The visit count is a robust choice: UCB1 sends most visits to the move whose estimated value is highest, so the most visited move is the one that has looked best for longest, and by [[#thm-uct]] it is the minimax choice in the limit. (Choosing the highest *mean* reward is also common, but means of rarely visited moves are noisy.)
:::
:::

::: example UCT on a tic-tac-toe position {#ex-uct}
X is to move in the position `XOX / ... / ..O` (squares numbered $0$–$8$ in reading order, so X is on $0$ and $2$, O on $1$ and $8$). Run UCT with $c = \sqrt 2$ and random playouts, and compare its preferences with the minimax values of the five moves.
::: solution
```python
import math, random
from ttt import utility, children, minimax

def to_move(b): return "X" if b.count("X") == b.count("O") else "O"

class Node:
    def __init__(self, board, parent=None):
        self.board, self.parent = board, parent
        self.kids = []; self.untried = children(board) if utility(board) is None else []
        self.n = 0; self.w = 0.0            # visits, total reward for the player who moved INTO this node

def uct(root_board, iterations, c=math.sqrt(2), seed=0):
    rng = random.Random(seed); root = Node(root_board)
    for _ in range(iterations):
        node = root
        while not node.untried and node.kids:                          # 1. selection (UCB1)
            node = max(node.kids, key=lambda k: k.w / k.n + c * math.sqrt(math.log(node.n) / k.n))
        if node.untried:                                               # 2. expansion
            b = node.untried.pop(rng.randrange(len(node.untried)))
            node.kids.append(Node(b, node)); node = node.kids[-1]
        b = node.board                                                 # 3. simulation (random playout)
        while utility(b) is None:
            b = rng.choice(children(b))
        u = utility(b)                                                 # +1 X wins, -1 O wins, 0 draw
        while node:                                                    # 4. back-propagation
            mover = "O" if to_move(node.board) == "X" else "X"         # who made the move into node
            node.n += 1; node.w += (1 + (u if mover == "X" else -u)) / 2   # reward in [0, 1]
            node = node.parent
    return root
```

Printing, for each root move, its visit count and mean reward (seed $1$):

```console
$ python3 mcts.py
minimax value of each move: {3: 0, 4: 0, 5: -1, 6: 1, 7: 0}
100 iterations: (square, visits, mean reward) [(3, 16, 0.59), (4, 20, 0.65), (5, 12, 0.46), (6, 33, 0.83), (7, 19, 0.66)]
1000 iterations: (square, visits, mean reward) [(3, 50, 0.54), (4, 56, 0.56), (5, 32, 0.41), (6, 798, 0.94), (7, 64, 0.6)]
10000 iterations: (square, visits, mean reward) [(3, 75, 0.53), (4, 80, 0.55), (5, 42, 0.37), (6, 9699, 0.99), (7, 104, 0.61)]
```

The only winning move is square $6$ (the bottom-left corner), which creates two threats at once (the column $0, 3, 6$ and the diagonal $2, 4, 6$); square $5$ loses. After $100$ iterations UCT already visits square $6$ most; after $10{,}000$ it spends $97\%$ of its effort there, and that move's mean reward approaches $1$, its minimax value, as the tree below it grows and the opponent's replies become near-optimal. The other moves keep receiving a slowly growing number of visits — the logarithmic exploration of [[#eq-ucb1]]. Their means, around $0.55$–$0.6$, are *not* their minimax values ($0$, i.e. reward $0.5$, for a draw): they are still partly estimated by random playouts, which overrate positions against a random opponent. MCTS's estimates of moves it has not explored deeply are biased; only the choice of the most visited move is reliable.
:::
:::

::: widget plot
f: c*sqrt(ln(1000)/x); c*sqrt(ln(10000)/x)
x: 1, 200
y: 0, 3
sliders: c=0.2:0.1:3
labels: N = 1000; N = 10000
caption: The exploration bonus $c\sqrt{\ln N/N_i}$ of UCB1 as a function of an arm's visit count $N_i$, for two values of the total count $N$. A rarely visited move gets a large bonus, so it is eventually retried; multiplying $N$ by ten raises the bonus only slightly. Change $c$: a small $c$ exploits greedily and risks never discovering a good move; a large $c$ spreads the visits almost evenly.
:::

MCTS needs no evaluation function — only the rules, to play out games — which made it a general method for game playing, planning and any setting with a simulator. Its weakness is that random playouts can be badly misleading in "tactical" positions where only a precise sequence works. Modern programs replace the random playouts and the uniform exploration by **learned** networks: a value network estimating who will win and a policy network giving prior probabilities to moves. That combination is reinforcement learning ([[artificial-intelligence/reinforcement-learning]]); the neural networks are taught in the [LLM Atlas](/learn/llm/course.php?c=neural-networks).

::: history
Ernst Zermelo's 1913 paper on chess contains the first theorem of game theory, and John von Neumann proved the minimax theorem for zero-sum games in 1928. Claude Shannon's "Programming a computer for playing chess" (1950) proposed depth-limited minimax with an evaluation function, and Alan Turing simulated a chess program by hand around the same time. Arthur Samuel's draughts program (1959) learned its evaluation function by self-play. Alpha–beta pruning was discovered several times in the late 1950s (it is credited to John McCarthy, among others), and Donald Knuth and Ronald Moore's "An analysis of alpha–beta pruning" (*Artificial Intelligence*, 1975) proved its correctness and the minimal-tree bound; Judea Pearl determined its branching factor on random trees in 1982. IBM's Deep Blue defeated the world chess champion Garry Kasparov in a six-game match in 1997. Jonathan Schaeffer's team proved in 2007 that draughts (checkers) is a draw with perfect play. Rémi Coulom coined "Monte Carlo tree search" in 2006, and Levente Kocsis and Csaba Szepesvári's "Bandit based Monte-Carlo planning" (2006) introduced UCT, building on the UCB1 analysis of Peter Auer, Nicolò Cesa-Bianchi and Paul Fischer (2002). DeepMind's AlphaGo, combining MCTS with deep networks, defeated Lee Sedol 4–1 at Go in March 2016; AlphaZero (2017–18) learned chess, shogi and Go by self-play alone.
:::

## In practice

As of 2026 the strongest chess engines combine alpha–beta search, with aggressive forward pruning and huge transposition tables, and evaluation functions computed by small neural networks; others use MCTS-style search guided by large networks in the manner of AlphaZero. Both reach far beyond human strength, and their evaluations are used routinely to analyse human games. Small games are **solved** outright: Connect Four (a first-player win, 1988) and draughts (a draw, 2007), by search combined with endgame databases computed by retrograde analysis. For general game playing, planning and many sequential decision problems with a simulator, MCTS is a standard baseline. The theory of games with hidden information (poker) needs different tools — equilibrium computation by counterfactual regret minimisation — which are beyond this course.

## Where this leads

The minimax recursion is a Bellman equation for a two-player problem; with one player and chance instead of an adversary it becomes the expectimax recursion of Markov decision processes ([[artificial-intelligence/decision-making]]). UCB1's balance of exploration and exploitation returns in [[artificial-intelligence/reinforcement-learning]], where learned value functions take the place of evaluation functions. Deciding the winner of generalised games is often $\mathsf{PSPACE}$-complete — quantifier alternation, as in $\mathit{TQBF}$ ([[complexity/space-complexity#thm-tqbf]]), mirrors move alternation — which is why exact solutions exist only for small games.

::: summary
- A two-player zero-sum game with perfect information ([[#def-game]]) has a **minimax value** ([[#def-minimax]]) that each player can guarantee against any opponent ([[#thm-minimax]]); minimax search computes it in $O(b^m)$ time.
- **Alpha–beta** passes a window $(\alpha, \beta)$ down the tree and stops searching a node as soon as its value is known to lie outside it; it returns the exact minimax value at the root, and bounds elsewhere ([[#thm-alphabeta]]).
- With perfect move ordering alpha–beta examines $b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1$ leaves, the minimum possible ([[#thm-knuth-moore]]) — so it searches twice as deep; random ordering gives roughly $b^{3d/4}$, and iterative deepening, killer moves and transposition tables approach the best case.
- Real programs cut off the search and apply an **evaluation function**, with quiescence search against the horizon effect; with chance nodes, **expectiminimax** averages, and the scale of the evaluation matters.
- **MCTS** builds an asymmetric tree from random playouts, choosing children by **UCB1** ([[#eq-ucb1]]); UCT converges to the minimax choice ([[#thm-uct]]) and needs no evaluation function.
:::

## Exercises

::: exercise Minimax by hand {level=1 check="6"}
A MAX root has three MIN children, with leaves $(7, 6, 9)$, $(8, 2, 4)$ and $(6, 10, 11)$. What is the minimax value of the root? (Enter the value.)
::: solution
The MIN children have values $\min(7, 6, 9) = 6$, $\min(8, 2, 4) = 2$ and $\min(6, 10, 11) = 6$. The root's value is $\max(6, 2, 6) = 6$; MAX may play either the first or the third move.
:::
:::

::: exercise Pruned leaves {level=1 check="3"}
Run alpha–beta, examining children from left to right, on the tree of the previous exercise (leaves $(7, 6, 9)$, $(8, 2, 4)$, $(6, 10, 11)$). How many leaves are *not* examined? (Enter the number of pruned leaves.)
::: solution
First child: all three leaves, value $6$, so $\alpha = 6$. Second child: leaf $8$ ($v = 8$, not $\le 6$), leaf $2$ ($v = 2 \le 6$: cut-off), so leaf $4$ is pruned. Third child: leaf $6$ gives $v = 6 \le \alpha = 6$: cut-off, so $10$ and $11$ are pruned. Three leaves are pruned (six examined). Note the cut-off with equality: a value equal to $\alpha$ cannot improve MAX's choice.
:::
:::

::: exercise The minimal tree {level=1 check="1999"}
How many leaves does alpha–beta with perfect move ordering examine in a uniform tree with $b = 10$ and $d = 6$? (Enter the number of leaves.)
::: solution
$L(10, 6) = 10^{3} + 10^{3} - 1 = 1999$, against $10^6$ for minimax. For odd depth, e.g. $d = 5$, $L = 10^3 + 10^2 - 1 = 1099$.
:::
:::

::: exercise Expectiminimax and scale {level=2}
MAX chooses between two moves. Move $L$ leads to a chance node with outcomes of value $2$ and $3$, each with probability $1/2$; move $R$ leads to a chance node with outcomes $0$ and $4$, each with probability $1/2$. (a) Which move does expectiminimax choose? (b) Apply the order-preserving transformation $x \mapsto x^2$ to the leaf values. Which move is chosen now? (c) Why does this not happen in deterministic games?
::: solution
(a) $L$ has value $(2 + 3)/2 = 2.5$ and $R$ has $(0 + 4)/2 = 2$, so expectiminimax chooses $L$. (b) Squared: $L$ gives $(4 + 9)/2 = 6.5$ and $R$ gives $(0 + 16)/2 = 8$: now $R$ is chosen, although the transformation preserved the order of every pair of leaves. So the choice depends on the scale of the evaluation, not only its order. (c) Minimax uses only $\max$ and $\min$, which commute with every strictly increasing function $\phi$: $\max(\phi(x), \phi(y)) = \phi(\max(x, y))$. So the chosen move is the same for every monotone transformation of the leaves. Averages do not commute with nonlinear $\phi$. In games of chance the evaluation function must therefore be a positive *linear* transformation of the expected utility (for instance, the probability of winning).
:::
:::

::: exercise UCB1 by hand {level=2 check="2"}
A bandit has three arms with statistics after $N = 20$ plays: arm 1 played $10$ times with total reward $6$; arm 2 played $4$ times with total reward $2$; arm 3 played $6$ times with total reward $4$. Which arm does UCB1 with $c = \sqrt 2$ play next? (Enter the arm's number.)
::: solution
$\ln 20 \approx 2.996$, so the bonus is $\sqrt{2 \cdot 2.996/N_i} = \sqrt{5.991/N_i}$. Arm 1: $0.6 + \sqrt{0.599} = 0.6 + 0.774 = 1.374$. Arm 2: $0.5 + \sqrt{1.498} = 0.5 + 1.224 = 1.724$. Arm 3: $0.667 + \sqrt{0.999} = 0.667 + 0.999 = 1.666$. Arm 2 has the highest upper confidence bound, although its mean reward is the lowest: it has been tried least.
:::
:::

::: exercise Alpha–beta for negamax {level=2}
In a zero-sum game, $\min(x, y) = -\max(-x, -y)$, so both players can be treated alike if values are always taken from the point of view of the player to move. Write alpha–beta in this **negamax** form, and explain what happens to the window when the recursion passes to a child.
::: solution
Let $\mathrm{Utility}_p(s)$ be the utility for the player to move at $s$.

```python
def negamax(s, alpha, beta):
    """Value of s for the player to move; alpha < beta is the window for that player."""
    if is_terminal(s):
        return utility_for_player_to_move(s)
    v = -math.inf
    for c in successors(s):
        v = max(v, -negamax(c, -beta, -alpha))   # the child's value is minus ours
        if v >= beta:
            return v                              # cut-off: the opponent avoids s
        alpha = max(alpha, v)
    return v
```

A child's value for its mover is the negative of its value for us, so our window $(\alpha, \beta)$ becomes $(-\beta, -\alpha)$ for the child: what we are already assured of ($\alpha$) becomes the opponent's upper limit, and vice versa. The single cut-off test $v \ge \beta$ plays the role of both cut-offs of [[#alg-alphabeta]]. Nearly all game programs are written this way.
:::
:::

::: exercise Best case at odd depth {level=3}
(a) Verify [[#thm-knuth-moore]] by hand for $b = 2$, $d = 3$: draw a tree with perfect ordering and mark the $L(2, 3) = 2^2 + 2^1 - 1 = 5$ leaves examined. (b) Show that a MAX strategy subtree and a MIN strategy subtree of a uniform tree always intersect in exactly one leaf, and deduce that no algorithm can certify the root value with fewer than $L(b, d)$ leaves.
::: solution
(a) Take MAX root $r$ with MIN children $u_1, u_2$; each $u_i$ has MAX children $w_{i1}, w_{i2}$; each $w_{ij}$ has two leaves. Perfect ordering means that $u_1$ is the better child of $r$, that at each MIN node the child with the lower value comes first, and that at each MAX node $w$ the larger leaf comes first. At $w_{11}$, searched with window $(-\infty, \infty)$, both leaves are examined (a node on the principal variation must establish its exact value): $2$ leaves. At $u_1$, the second child $w_{12}$ is searched with window $(-\infty, \beta)$, $\beta = \mathrm{val}(w_{11})$; its first leaf is its value, which is at least $\beta$ because $w_{11}$ was $u_1$'s better (lower) child, so it causes a cut-off: $1$ leaf. So $u_1$ costs $3$ leaves and sets $\alpha = \mathrm{val}(u_1)$ at the root. At $u_2$, searched with window $(\alpha, \infty)$, the first child $w_{21}$ has value $\mathrm{val}(u_2) \le \alpha$; as a MAX node with $\beta = \infty$ it cannot cut off, so both of its leaves are examined, after which $u_2$'s running value is $\le \alpha$ and $u_2$ is cut off without looking at $w_{22}$: $2$ leaves. Total $2 + 1 + 2 = 5$.

(b) In a MAX strategy subtree each MAX node has one child and each MIN node all children; in a MIN strategy subtree the reverse. A leaf in both lies on a root path that at every MAX node follows the MAX subtree's unique child (it is in the MAX subtree, which has only that child) and at every MIN node follows the MIN subtree's unique child. This determines the path uniquely, and the path does exist in both subtrees (each contains all children at the nodes where the other has one). So the intersection is exactly one leaf. By the adversary argument in the proof of [[#thm-knuth-moore]], a certifying algorithm must examine all leaves of some MAX strategy subtree and of some MIN strategy subtree; the union has $b^{\lfloor d/2\rfloor} + b^{\lceil d/2\rceil} - 1$ leaves.
:::
:::

::: exercise A playout-based evaluation {level=3}
(a) In [[#ex-uct]] the mean reward of the drawing moves stayed near $0.55$–$0.6$, above the value $0.5$ of a draw. Explain why random playouts overestimate X's chances in those positions, and why the estimate for the winning move nevertheless converges to $1$. (b) Modify the program to count, for each root move, the fraction of *pure* random playouts (no tree) that X wins, with $10{,}000$ playouts per move and a fixed seed. Would "pick the move with the best random-playout average" choose the right move here?
::: solution
(a) In the drawing positions, O can hold the draw only by finding particular defensive moves; a random O often fails to, so random playouts from those positions are won by X more often than optimal play allows. Inside the UCT tree, however, the nodes near the root are expanded and O's replies there are chosen by UCB1 from O's point of view, so for the move UCT explores deeply, the tree policy approximates minimax play and the estimate approaches the true value. Moves that are rarely visited keep shallow trees whose estimates are dominated by the random playouts.

(b) One way:

```python
import random
from ttt import utility, children

def playout_mean(board, n, rng):
    total = 0
    for _ in range(n):
        b = board
        while utility(b) is None:
            b = rng.choice(children(b))
        total += (1 + utility(b)) / 2        # reward for X in [0, 1]
    return total / n

rng = random.Random(0)
start = "XOX" "..." "..O"
for b in children(start):
    square = next(i for i in range(9) if b[i] != start[i])
    print(square, round(playout_mean(b, 10_000, rng), 3))
```

```console
$ python3 flat.py
3 0.59
4 0.668
5 0.419
6 0.83
7 0.666
```

Here flat Monte Carlo does rank the winning square $6$ first. But note that the drawing moves $4$ and $7$ score $0.67$, well above the drawing move $3$ ($0.59$), and that this ranking is a property of random opponents: in positions where the only good move requires precise follow-up, flat Monte Carlo can prefer a move that wins against random play and loses against a good opponent. UCT corrects this because its tree policy becomes minimax-like where it searches deeply.
:::
:::
