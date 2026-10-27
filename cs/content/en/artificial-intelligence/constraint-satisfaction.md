Colour a map so that neighbouring regions differ. Place eight queens on a chessboard so that none attacks another. Fill in a Sudoku. Timetable a university's exams so that no student has two at once, or schedule the jobs of a factory so that each machine does one thing at a time and every deadline is met. In each of these problems a solution is not a *path* but an *assignment*: a value for each of a set of variables, subject to constraints between them. Treating such a problem as an ordinary search problem ([[artificial-intelligence/search]]) throws its structure away — the search would not know that once two neighbouring regions have the same colour, nothing done to the other regions can repair the mistake.

A **constraint satisfaction problem** (CSP) exposes that structure. States are *factored* into variables, the goal test is a conjunction of constraints on small groups of variables, and general-purpose algorithms can use the constraints to prune the search before it begins. This chapter develops the three main ideas. **Backtracking search** assigns variables one at a time and undoes assignments that violate a constraint; good **variable and value ordering** heuristics shrink it dramatically. **Constraint propagation** removes values that cannot be part of any solution; we prove that the classic algorithm AC-3 does this correctly in $O(cd^3)$ time and that on tree-structured problems propagation alone yields a solution in linear time. Finally, **local search** — min-conflicts, hill climbing and simulated annealing — repairs a complete but flawed assignment step by step, which turns out to solve the million-queens problem in seconds.

## Constraint satisfaction problems

::: definition Constraint satisfaction problem {#def-csp}
A **constraint satisfaction problem** consists of a finite set of **variables** $X_1, \dots, X_n$; for each variable a finite **domain** $D_i$ of possible values; and a set of **constraints**. Each constraint has a **scope**, a tuple of variables $(X_{i_1}, \dots, X_{i_k})$, and a **relation** $R \subseteq D_{i_1} \times \dots \times D_{i_k}$ listing the allowed combinations of values. An **assignment** gives values to some of the variables; it is **consistent** if it violates no constraint whose scope it fully assigns, and **complete** if it assigns every variable. A **solution** is a complete, consistent assignment.
:::

A constraint with one variable is **unary**, with two **binary**; any CSP can be converted into one with only binary constraints (by introducing auxiliary variables), so algorithms are usually described for binary CSPs. A binary CSP has a **constraint graph** with a vertex per variable and an edge between two variables that share a constraint. We write $n$ for the number of variables, $d$ for the largest domain size and $c$ for the number of binary constraints.

Deciding whether a CSP has a solution is $\mathsf{NP}$-complete even for binary constraints and domains of size $3$ — graph 3-colouring is a special case ([[complexity/np-complete-problems#thm-3col]]) — so we cannot hope for algorithms that are fast in the worst case. But the worst case is rarely the typical case, and the algorithms of this chapter routinely solve CSPs with thousands of variables.

::: example Three CSP formulations {#ex-csp-formulations}
Formulate as CSPs: (a) colouring the map of mainland Australia and Tasmania with three colours; (b) the $n$-queens problem; (c) a Sudoku.
::: solution
(a) Variables $\mathit{WA}, \mathit{NT}, \mathit{SA}, \mathit{Q}, \mathit{NSW}, \mathit{V}, \mathit{T}$ (the states and territories); each domain is $\{\text{red}, \text{green}, \text{blue}\}$; one binary constraint $X \ne Y$ for each pair of regions sharing a border: $\mathit{WA}$–$\mathit{NT}$, $\mathit{WA}$–$\mathit{SA}$, $\mathit{NT}$–$\mathit{SA}$, $\mathit{NT}$–$\mathit{Q}$, $\mathit{SA}$–$\mathit{Q}$, $\mathit{SA}$–$\mathit{NSW}$, $\mathit{SA}$–$\mathit{V}$, $\mathit{Q}$–$\mathit{NSW}$, $\mathit{NSW}$–$\mathit{V}$. Tasmania ($\mathit{T}$) borders nothing. There are $3^7 = 2187$ complete assignments.

(b) One variable $Q_j$ per column $j = 1, \dots, n$, whose value is the row of the queen in that column (so no two queens share a column by construction); domains $\{1, \dots, n\}$; for each pair $j < k$ the constraint $Q_j \ne Q_k$ and $\lvert Q_j - Q_k\rvert \ne k - j$ (no shared row or diagonal). Choosing this formulation instead of "a Boolean variable per square" already reduces the space from $2^{64}$ to $8^8 \approx 1.7 \times 10^7$ for $n = 8$.

(c) $81$ variables, one per cell, with domain $\{1, \dots, 9\}$ (singleton domains for the given cells), and $27$ **global constraints** $\mathrm{AllDiff}$, one per row, column and box, each equivalent to $\binom92 = 36$ binary $\ne$ constraints.
:::
:::

::: widget graph
nodes: WA@0,1; NT@1,2; SA@1.4,0.9; Q@2.4,2; NSW@2.6,0.9; V@2,0; T@2.6,-0.8
edges: WA-NT; WA-SA; NT-SA; NT-Q; SA-Q; SA-NSW; SA-V; Q-NSW; NSW-V
algorithm: colour
caption: The constraint graph of the Australian map-colouring CSP, coloured greedily. Step through: each vertex takes the first colour not used by its already-coloured neighbours. Three colours suffice; South Australia ($\mathit{SA}$), adjacent to five regions, is the most constrained. Tasmania is a separate component — an independent subproblem that can be solved on its own. Drag vertices to see the structure; try removing the edge $\mathit{SA}$–$\mathit{V}$ and predict whether the colouring changes.
:::

Constraints may be **hard** (must hold) or **soft** (preferences, with a cost for violating them); timetabling usually has both. CSPs with soft constraints are **constrained optimisation** problems, solved by branch-and-bound versions of the methods below or by integer programming. We consider hard constraints only.

## Backtracking search

A CSP can be solved by search: states are partial assignments, an action assigns a value to an unassigned variable, and the goal is a complete consistent assignment. Two observations make this efficient. First, assignments are **commutative**: the order in which variables are assigned does not matter, so we may fix one variable to branch on at each node, giving a tree with $d^n$ leaves instead of $n!\,d^n$. Second, an inconsistent partial assignment can never be extended to a solution, so the search can back up as soon as a constraint is violated.

::: algorithm Backtracking search {#alg-backtracking}
```text
BACKTRACK(assignment, csp)
1  if assignment is complete: return assignment
2  X ← SELECT-UNASSIGNED-VARIABLE(csp, assignment)
3  for each value v in ORDER-DOMAIN-VALUES(X, assignment, csp)
4      if v is consistent with assignment
5          add X = v to assignment
6          inferences ← INFERENCE(csp, X, v)       ▷ e.g. forward checking or AC-3
7          if inferences ≠ failure
8              add inferences to the CSP (shrink domains)
9              result ← BACKTRACK(assignment, csp)
10             if result ≠ failure: return result
11         remove X = v and the inferences
12 return failure
```
The initial call is $\mathrm{BACKTRACK}(\emptyset, \mathit{csp})$.
:::

Backtracking is a depth-first search of the tree of consistent partial assignments, which is finite (depth $n$, branching at most $d$), so it is **complete**: it returns a solution if there is one and failure otherwise, provided the inference step removes only values that belong to no solution extending the current assignment. Its efficiency depends on three choices.

**Which variable next?** The **minimum-remaining-values** (MRV) heuristic picks the variable with the fewest legal values left — the "most constrained" or "fail-first" choice. If some variable has no legal values, MRV picks it at once and the search backtracks immediately instead of discovering the dead end many levels later. Ties are broken by the **degree heuristic**: prefer the variable involved in the most constraints with unassigned variables ($\mathit{SA}$ in the map).

**Which value first?** The **least-constraining-value** heuristic prefers the value that rules out the fewest choices for the neighbouring variables — "fail-last" for values. The asymmetry is deliberate: every variable must eventually be assigned, so we want to find failures early; but only one value needs to succeed, so we try the most promising first. (If we want *all* solutions, value ordering does not matter.)

**What inference?** **Forward checking**: after assigning $X = v$, delete from the domain of each unassigned neighbour $Y$ every value inconsistent with $X = v$; if a domain becomes empty, fail at once. It makes MRV effective, because domain sizes are kept up to date. Stronger inference — maintaining arc consistency, below — detects more failures earlier.

::: example Ordering heuristics on $n$ queens {#ex-queens-backtracking}
Count the assignments that backtracking tries before finding the first solution of the $n$-queens problem, with columns assigned left to right and rows tried in increasing order (plain), and with MRV plus forward checking.
::: solution
```python
def attacks(c1, r1, c2, r2):
    return r1 == r2 or abs(r1 - r2) == abs(c1 - c2)

def backtrack(n, mrv_fc):
    """Return (solution, number of assignments tried). Variables are columns, values rows."""
    domains = {c: list(range(n)) for c in range(n)}
    assignment = {}; count = 0
    def search():
        nonlocal count
        if len(assignment) == n: return True
        if mrv_fc:   # minimum remaining values, ties broken by column index
            col = min((c for c in range(n) if c not in assignment), key=lambda c: len(domains[c]))
        else:
            col = len(assignment)
        for row in domains[col]:
            if not mrv_fc and any(attacks(col, row, c, r) for c, r in assignment.items()):
                continue
            count += 1; assignment[col] = row
            saved = None
            if mrv_fc:   # forward checking: prune the domains of unassigned columns
                saved = {c: domains[c] for c in range(n) if c not in assignment}
                for c in saved:
                    domains[c] = [r for r in domains[c] if not attacks(col, row, c, r)]
                if any(not domains[c] for c in saved):
                    domains.update(saved); del assignment[col]; continue
            if search(): return True
            if saved: domains.update(saved)
            del assignment[col]
        return False
    search()
    return assignment, count
```

```console
$ python3 queens.py
 n   plain   MRV+FC
 8      113      75
12      261     153
16    10052      44
20   199635     145
24   411608      43
```

Plain backtracking's effort is erratic and grows steeply — the first solution in row order happens to lie far into the tree for $n = 16$ to $24$. With MRV and forward checking the counts stay small and barely grow: forward checking notices immediately when a column has run out of rows, and MRV then moves to the column with fewest options, so most dead ends are cut off within one or two levels. (The counts depend on tie-breaking; the *trend* is the point.)
:::
:::

### Intelligent backtracking

When a branch fails, plain backtracking undoes the *most recent* assignment, even if that assignment had nothing to do with the failure — **chronological backtracking**. Suppose we assigned $\mathit{Q} = \text{red}$, $\mathit{NSW} = \text{green}$, $\mathit{V} = \text{blue}$, $\mathit{T} = \text{red}$ and now find that $\mathit{SA}$ has no consistent value. Changing $\mathit{T}$ cannot help; the **conflict set** of $\mathit{SA}$ is $\{\mathit{Q}, \mathit{NSW}, \mathit{V}\}$. **Conflict-directed backjumping** jumps back to the most recent variable in the conflict set and merges conflict sets as it goes. **Constraint learning** records the conflicting combination as a new constraint (a **nogood**) so that it is never tried again — the same idea as clause learning in SAT solvers ([[complexity/coping-with-hardness#alg-dpll]] and the CDCL discussion after it).

::: quiz
Backtracking with MRV is solving a map-colouring CSP. After a few assignments, variable $X$ has $2$ legal values, $Y$ has $0$ and $Z$ has $1$. Which variable does MRV choose, and what happens?

- [ ] $X$, because it has the most choices and is least likely to fail.
- [ ] $Z$, because its value is forced.
- [x] $Y$, and the search backtracks immediately.
- [ ] The degree heuristic must be used instead, because there is a tie.
::: solution
MRV picks the variable with the fewest remaining legal values, here $Y$ with none. The loop over $Y$'s values is empty, so the call fails at once and the search backtracks — the failure was detected without assigning $X$ or $Z$. Without MRV the search might assign $X$ and $Z$ first and explore their whole subtree before discovering that $Y$ is impossible.
:::
:::

## Constraint propagation

Forward checking removes values that conflict with an *assignment*. We can go further and remove values that conflict with the remaining *domains*, before anything is assigned.

::: definition Arc consistency {#def-arc-consistency}
For a binary constraint between $X$ and $Y$, the **arc** $(X, Y)$ is **consistent** if for every value $a \in D_X$ there is some value $b \in D_Y$ (a **support** for $a$) such that $(a, b)$ satisfies the constraint. A CSP is **arc-consistent** if every arc, in both directions, is consistent. To **revise** the arc $(X, Y)$ is to delete from $D_X$ every value with no support in $D_Y$.
:::

A value with no support can belong to no solution, so deleting it is safe. But a deletion from $D_X$ may remove the last support of some value of a neighbour $Z$, so revisions must be repeated until nothing changes.

::: algorithm AC-3 {#alg-ac3}
```python
from collections import deque

def ac3(domains, neighbours, ok, trace=False):
    """Make every arc (X, Y) consistent; domains are modified in place. False if a domain empties."""
    queue = deque((x, y) for x in domains for y in neighbours[x])
    while queue:
        x, y = queue.popleft()
        removed = [a for a in domains[x] if not any(ok(x, a, y, b) for b in domains[y])]
        if removed:                                   # revise(x, y) changed D(x)
            domains[x] = [a for a in domains[x] if a not in removed]
            if trace: print(f"revise({x},{y}) removes {removed} -> D({x}) = {domains[x]}")
            if not domains[x]: return False
            queue.extend((z, x) for z in neighbours[x] if z != y)
    return True
```
Here `ok(x, a, y, b)` tests whether $X = a$, $Y = b$ satisfies the constraint between $X$ and $Y$. (The arc $(Y, X)$ is not re-queued after revising $(X, Y)$: deleting unsupported values of $X$ cannot remove a support that some value of $Y$ uses — a deleted value supported nothing.)
:::

::: theorem Correctness and cost of AC-3 {#thm-ac3}
For a binary CSP with $c$ constraints and domains of size at most $d$:
1. AC-3 deletes only values that belong to no solution; hence if it returns False, the CSP has no solution.
2. If it returns True, the resulting CSP is arc-consistent; in fact the result is the unique largest arc-consistent set of subdomains of the original domains, whatever the order in which arcs are processed.
3. It runs in $O(cd^3)$ time.
:::

::: proof
1. By induction on the deletions: a value $a$ is deleted from $D_X$ only when no $b$ in the *current* $D_Y$ supports it. By the induction hypothesis every value already deleted from $D_Y$ belongs to no solution, so in any solution $Y$ takes a value in the current $D_Y$, and none of these is compatible with $X = a$. So $X = a$ is in no solution.

2. *Arc consistency at the end.* Claim: at all times, every arc $(X, Y)$ that is not in the queue is consistent. Initially all arcs are queued. When $(X, Y)$ is popped and revised, it becomes consistent. Its consistency can be destroyed later only by a deletion from $D_Y$, and every deletion from $D_Y$ (when revising some $(Y, W)$) re-queues all arcs $(Z, Y)$ with $Z \ne W$; the arc $(W, Y)$ itself stays consistent, because the values deleted from $D_Y$ had no support in $D_W$ and so supported no value of $D_W$. When the queue is empty, every arc is consistent. *Largest.* Let $D'$ be any arc-consistent family of subdomains $D'_X \subseteq D_X$. By induction, no value of $D'$ is ever deleted: a value $a \in D'_X$ has a support in $D'_Y$, which (induction hypothesis) is still in the current $D_Y$, so revise does not delete $a$. So the result contains every arc-consistent family, and it is itself arc-consistent: it is the unique largest one, independent of the processing order.

3. Each constraint gives two arcs, so $2c$ arcs are queued initially. An arc $(Z, X)$ is re-queued only when $D_X$ loses a value, which happens at most $d$ times; so each arc is queued at most $d + 1$ times, and there are at most $2c(d + 1)$ revisions. A revision of $(X, Y)$ checks each of at most $d$ values of $X$ against at most $d$ values of $Y$: $O(d^2)$. Total $O(cd \cdot d^2) = O(cd^3)$.
:::

Algorithms such as AC-4 and AC-2001 reach the optimal $O(cd^2)$ by remembering supports, but AC-3 is simple and usually fast. Running arc consistency after every assignment during backtracking is called **maintaining arc consistency** (MAC); it subsumes forward checking.

::: example AC-3 colours most of Australia {#ex-ac3}
Start the map-colouring CSP with $\mathit{WA} = \text{red}$ and $\mathit{NT} = \text{green}$ (singleton domains) and the other domains $\{\text{red}, \text{green}, \text{blue}\}$. Run AC-3.
::: solution
Using the listing with `ok = lambda x, a, y, b: a != b` and the nine borders:

```console
$ python3 ac3.py
revise(SA,WA) removes ['red'] -> D(SA) = ['green', 'blue']
revise(SA,NT) removes ['green'] -> D(SA) = ['blue']
revise(Q,NT) removes ['green'] -> D(Q) = ['red', 'blue']
revise(Q,SA) removes ['blue'] -> D(Q) = ['red']
revise(NSW,SA) removes ['blue'] -> D(NSW) = ['red', 'green']
revise(NSW,Q) removes ['red'] -> D(NSW) = ['green']
revise(V,SA) removes ['blue'] -> D(V) = ['red', 'green']
revise(V,NSW) removes ['green'] -> D(V) = ['red']
True
{'WA': ['red'], 'NT': ['green'], 'SA': ['blue'], 'Q': ['red'], 'NSW': ['green'], 'V': ['red'], 'T': ['red', 'green', 'blue']}
```

$\mathit{SA}$ must differ from red and green, so it is blue; then $\mathit{Q}$ (adjacent to green $\mathit{NT}$ and blue $\mathit{SA}$) is red, $\mathit{NSW}$ green and $\mathit{V}$ red. Propagation alone has solved the mainland; Tasmania keeps all three values, any of which completes a solution. Eight revisions removed values; by [[#thm-ac3]] the result does not depend on the order of the queue.
:::
:::

::: warning Arc consistency does not mean solvable
An arc-consistent CSP can have no solution. Colour the triangle $\mathit{WA}$, $\mathit{NT}$, $\mathit{SA}$ with only two colours $\{\text{red}, \text{green}\}$: every arc is consistent (each colour of one region is supported by the other colour in each neighbour), yet three mutually adjacent regions cannot be coloured with two colours. Arc consistency is a *local* property — it looks at one constraint at a time — and global inconsistencies escape it. Stronger notions exist: **path consistency** looks at triples of variables, and **strong $k$-consistency** for $k = n$ guarantees backtrack-free search, but enforcing $k$-consistency costs time exponential in $k$. In general propagation is a filter that makes search cheaper, not a replacement for search — except on special structures such as trees.
:::

### Tree-structured CSPs

If the constraint graph has no cycles, propagation in one direction suffices.

::: theorem Tree-structured CSPs are easy {#thm-tree-csp}
A binary CSP whose constraint graph is a tree (or forest) can be solved in $O(nd^2)$ time: order the variables $X_1, \dots, X_n$ so that each variable's parent in the tree comes before it; for $j = n, n - 1, \dots, 2$ revise the arc $(\mathrm{parent}(X_j), X_j)$; if no domain is empty, assign the variables in order $X_1, X_2, \dots$, giving each a value in its domain consistent with its parent's value.
:::

::: proof
After the backward pass, every arc $(\mathrm{parent}(X_j), X_j)$ is consistent. Revising it deletes values only from the parent, which comes earlier in the order. When it is revised, $D_{X_j}$ is already final: values are deleted from $X_j$ only by revising arcs from $X_j$ to its children, which come later in the order and were processed earlier. Later revisions delete values only from variables that are parents of earlier variables; if one of them is $\mathrm{parent}(X_j)$, deleting values of the parent keeps the arc $(\mathrm{parent}(X_j), X_j)$ consistent (the remaining parent values keep their supports). In the forward pass, $X_1$ takes any value left in its domain. When $X_j$ is reached, its parent has a value in its (revised) domain, which by arc consistency of $(\mathrm{parent}(X_j), X_j)$ has a support in $D_{X_j}$; give $X_j$ that value. The only constraint between $X_j$ and earlier variables is the one with its parent (the graph is a tree), so the assignment stays consistent. If some domain becomes empty, by [[#thm-ac3]] (part 1) there is no solution. Cost: $n - 1$ revisions of $O(d^2)$ each, plus $O(nd)$ for the forward pass.
:::

Almost-trees can be reduced to trees. **Cutset conditioning**: choose a set $S$ of variables whose removal leaves a tree (a **cycle cutset**), try every consistent assignment to $S$, and solve the remaining tree for each, in $O(d^{\lvert S\rvert} (n - \lvert S\rvert) d^2)$ time. In the map, removing $\mathit{SA}$ leaves a forest, so at most $3$ tree problems need to be solved. **Tree decomposition** groups variables into overlapping clusters arranged in a tree; its cost is exponential only in the **tree width**, the size of the largest cluster minus one. Both ideas reappear in probabilistic inference ([[artificial-intelligence/probabilistic-reasoning]]), where variable elimination is efficient on graphs of small tree width.

::: example Solving a tree without backtracking {#ex-tree-csp}
Variables $A, B, C, D$ have domains $\{1, 2, 3\}$ and constraints $A < B$, $B > C$, $B < D$ (a tree rooted at $A$ with $B$ its child and $C$, $D$ children of $B$). Solve it by [[#thm-tree-csp]].
::: solution
Order $A, B, C, D$. Backward pass: revise $(B, D)$: $B < D$ needs $D > B$; $B = 3$ has no support, so $D_B = \{1, 2\}$. Revise $(B, C)$: $B > C$; $B = 1$ has no support ($C$ would have to be $0$), so $D_B = \{2\}$. Revise $(A, B)$: $A < 2$, so $D_A = \{1\}$. Forward pass: $A = 1$; $B = 2$ (consistent with $A$); $C = 1$ (the only value below $2$); $D = 3$. Solution $A = 1$, $B = 2$, $C = 1$, $D = 3$, found with three revisions and no backtracking.
:::
:::

## Local search for CSPs

Backtracking builds solutions incrementally. **Local search** instead starts with a complete assignment — usually violating many constraints — and repeatedly changes the value of one variable to reduce the number of violations. It keeps only the current state, so it uses almost no memory, and it works on problems far too large for systematic search. The price is that it is **incomplete**: it can fail to find a solution that exists, and it can never prove that none exists.

::: algorithm Min-conflicts {#alg-min-conflicts}
1. Start from a complete assignment (random, or built greedily).
2. Repeat up to a maximum number of steps: if the assignment is a solution, return it. Otherwise choose a variable involved in a violated constraint (a **conflicted** variable) uniformly at random, and give it the value that minimises the number of violated constraints, breaking ties at random.
3. Return failure.
:::

::: example A thousand queens {#ex-min-conflicts}
Run min-conflicts on the $n$-queens problem from random initial assignments, with a fixed seed, for $n = 8$, $100$ and $1000$, allowing at most $100{,}000$ steps.
::: solution
Counting the queens on each row and each diagonal makes the number of conflicts of a square an $O(1)$ computation:

```python
def min_conflicts(n, max_steps, rng):
    """Local search; rows[c] is the row of the queen in column c. Returns steps used, or None."""
    rows = [rng.randrange(n) for _ in range(n)]
    on_row = [0] * n; on_d1 = [0] * (2 * n); on_d2 = [0] * (2 * n)     # queens per line
    def place(c, r, k):
        on_row[r] += k; on_d1[r + c] += k; on_d2[r - c + n] += k
    for c, r in enumerate(rows): place(c, r, 1)
    def conflicts(c, r):            # queens attacking square (c, r), other than the one in column c
        return on_row[r] + on_d1[r + c] + on_d2[r - c + n] - 3 * (rows[c] == r)
    for step in range(max_steps):
        bad = [c for c in range(n) if conflicts(c, rows[c]) > 0]
        if not bad: return step
        c = rng.choice(bad)                                  # a conflicted variable
        costs = [conflicts(c, r) for r in range(n)]
        best = min(costs)
        place(c, rows[c], -1)
        rows[c] = rng.choice([r for r in range(n) if costs[r] == best])   # min-conflicts value
        place(c, rows[c], 1)
    return None
```

Five runs for each $n$ (seed $42$):

```console
min-conflicts n=8: steps [111, 63, 54, None, 688]
min-conflicts n=100: steps [158, 111, 98, 121, 146]
min-conflicts n=1000: steps [777, 725, 726, 675, 656]
```

For $n = 1000$ about $700$ steps suffice — fewer than one change per queen — because a random placement of many queens is close to a solution and nearly every repair helps. Strikingly, $n = 8$ is *harder* for local search: one of the five runs (`None`) never found a solution in $100{,}000$ steps, cycling among assignments with one or two conflicts. Small, tightly constrained problems have local minima and plateaus from which greedy repair cannot escape; random restarts, or the randomness of simulated annealing, are the remedy.
:::
:::

### Hill climbing and simulated annealing

Min-conflicts is an instance of **hill climbing** (here, descending): view the number of violated constraints as an **energy** $E(x)$ of the assignment $x$ and move to a neighbour of lower energy. Hill climbing gets stuck in **local minima** (no neighbour is better), on **plateaus** (all neighbours are equal) and on **ridges**. The standard escapes are **random restarts** (if each run succeeds with probability $p$, the expected number of runs is $1/p$), **sideways moves** on plateaus, **tabu lists** that forbid recently visited states, and occasional random moves.

**Simulated annealing** makes the random moves systematic. It proposes a random neighbour $x'$ and accepts it with the **Metropolis rule**: always if $\Delta E = E(x') - E(x) \le 0$, and with probability $e^{-\Delta E/T}$ otherwise, where the **temperature** $T > 0$ is lowered gradually. At high temperature the search wanders almost randomly; as $T \to 0$ it becomes hill climbing.

::: theorem The Metropolis chain samples the Boltzmann distribution {#thm-metropolis}
Let the state space be finite, and let proposals be symmetric: from $x$, each neighbour $x'$ is proposed with probability $q(x, x') = q(x', x)$, and the neighbourhood graph is connected. With the Metropolis rule at a fixed temperature $T$, the Markov chain of current states has the stationary distribution
$$
\pi_T(x) = \frac{e^{-E(x)/T}}{Z_T}, \qquad Z_T = \sum_y e^{-E(y)/T}.
$$
As $T \to 0$, $\pi_T$ concentrates on the states of minimum energy.
:::

::: proof
For $x \ne x'$ the transition probability is $P(x, x') = q(x, x') \min(1, e^{-(E(x') - E(x))/T})$. We check **detailed balance**, $\pi_T(x) P(x, x') = \pi_T(x') P(x', x)$. Suppose $E(x') \ge E(x)$ (the other case is symmetric). Then $P(x, x') = q(x, x') e^{-(E(x') - E(x))/T}$ and $P(x', x) = q(x', x)$, so
$$
\pi_T(x) P(x, x') = \frac{e^{-E(x)/T}}{Z_T}\, q(x, x')\, e^{-(E(x') - E(x))/T} = \frac{e^{-E(x')/T}}{Z_T}\, q(x', x) = \pi_T(x') P(x', x).
$$
Summing detailed balance over $x$ gives $\sum_x \pi_T(x) P(x, x') = \pi_T(x') \sum_x P(x', x) = \pi_T(x')$, so $\pi_T$ is stationary. (Connectivity of the proposals makes the chain irreducible, so this stationary distribution is unique; see [Maths Atlas: Markov chains](/learn/maths/lesson.php?c=probability&l=markov-chains).) Finally, let $E_{\min}$ be the minimum energy and $M$ the set of minimisers. For $x \notin M$, $\pi_T(x)/\pi_T(m) = e^{-(E(x) - E_{\min})/T} \to 0$ as $T \to 0$ for any $m \in M$, so $\pi_T(M) \to 1$.
:::

The theorem explains annealing's design: at each temperature the search spends time in states in proportion to $e^{-E/T}$, which at low $T$ is dominated by the best states; cooling slowly lets the chain track the changing distribution. If the temperature is lowered slowly enough — logarithmically, $T_k \ge C/\ln(k + 1)$ for a constant $C$ depending on the problem (Geman and Geman, 1984; Hajek, 1988) — the probability of being in a global minimum tends to $1$. Such schedules are far too slow to be practical; real implementations cool geometrically ($T \gets 0.99\,T$, say) and give up the guarantee.

::: widget plot
f: exp(-1/T); exp(-2/T); exp(-4/T)
x: 0, 1
y: 0, 1
sliders: T=0.05:0.05:5
labels: \Delta E = 1; \Delta E = 2; \Delta E = 4
caption: The Metropolis acceptance probability $e^{-\Delta E/T}$ for uphill moves of size $\Delta E = 1, 2, 4$, drawn as horizontal lines at the current temperature $T$ (they do not depend on $x$). Lower $T$ with the slider: at $T = 5$ even a move that adds four conflicts is accepted almost half the time; at $T = 0.25$ a move adding one conflict is accepted only $2\%$ of the time, and larger ones essentially never.
:::

::: example Hill climbing against simulated annealing {#ex-annealing}
On the 8-queens problem with energy = number of attacking pairs, compare steepest-descent hill climbing (move the single queen, within its column, that lowers the energy most; stop when no move helps) from $1000$ random starts with simulated annealing ($T_0 = 2$, $T \gets 0.999\,T$ per step, at most $20{,}000$ steps) from $200$ of the same starts.
::: solution
```python
import math, random

def energy(rows):          # number of attacking pairs of queens
    n = len(rows)
    return sum(rows[i] == rows[j] or abs(rows[i] - rows[j]) == j - i
               for i in range(n) for j in range(i + 1, n))

def anneal(rows, rng, T0=2.0, cooling=0.999, steps=20000):
    e = energy(rows); T = T0
    for _ in range(steps):
        if e == 0: break
        c, r = rng.randrange(len(rows)), rng.randrange(len(rows))
        new = rows[:c] + [r] + rows[c+1:]; e2 = energy(new)
        if e2 <= e or rng.random() < math.exp(-(e2 - e) / T):   # Metropolis rule
            rows, e = new, e2
        T *= cooling
    return rows, e
```

With a hill-climbing function that tries all $8 \times 7 = 56$ single-queen moves and takes the best, and seed $7$:

```console
$ python3 anneal.py
hill climbing solves 165 of 1000; simulated annealing solves 197 of 200
```

Steepest descent reaches a solution from only $16.5\%$ of the starts; the rest end in local minima, typically with one attacking pair left. With random restarts, about $1/0.165 \approx 6$ runs would be needed on average. Simulated annealing, which accepts occasional uphill moves early on and becomes greedy only as the temperature falls, solved $98.5\%$ of the instances in a single run.
:::
:::

::: quiz
Simulated annealing is run at a fixed, very high temperature $T$ for a long time. What is the distribution of its current state?

- [ ] Concentrated on the solutions.
- [x] Close to the stationary distribution of the proposal chain alone, which is uniform when the proposal is symmetric.
- [ ] Concentrated on local minima.
- [ ] It does not converge.
::: solution
By [[#thm-metropolis]] the stationary distribution is proportional to $e^{-E(x)/T}$. As $T \to \infty$, every factor tends to $1$, so the distribution tends to uniform: almost every proposal is accepted and the search is a random walk. Only as $T$ decreases does the distribution favour low energies. This is why annealing must cool.
:::
:::

Other local-search methods share the same trade-offs: **local beam search** keeps $k$ states and selects the best $k$ of all their successors; **genetic algorithms** combine pairs of states by crossover. For continuous variables, the analogue of hill climbing is gradient descent, the workhorse of machine learning ([LLM Atlas: optimisers](/learn/llm/lesson.php?c=neural-networks&l=optimisers)).

::: history
David Waltz's 1975 program for labelling line drawings of polyhedral scenes propagated constraints between junctions. Ugo Montanari (1974) introduced constraint networks and path consistency, and Alan Mackworth's "Consistency in networks of relations" (*Artificial Intelligence*, 1977) gave the AC-1 to AC-3 algorithms; Mackworth and Eugene Freuder analysed AC-3's complexity in 1985, and Roger Mohr and Thomas Henderson gave the optimal AC-4 in 1986. Robert Haralick and Gordon Elliott studied forward checking and the fail-first principle in 1980. Freuder (1982) related backtrack-free search to tree structure and consistency, and Rina Dechter and Judea Pearl developed tree decompositions and cutset conditioning in the late 1980s. Steven Minton, Mark Johnston, Andrew Philips and Philip Laird's min-conflicts heuristic (1992) grew out of scheduling observations for the Hubble Space Telescope. Simulated annealing was introduced by Scott Kirkpatrick, Daniel Gelatt and Mario Vecchi (*Science*, 1983) and independently by Vladimír Černý (1985), building on the Metropolis algorithm of 1953.
:::

## In practice

Constraint programming systems (as of 2026, open-source solvers such as Gecode, Choco and Google's OR-Tools CP-SAT among others) combine backtracking, propagation with specialised algorithms for global constraints — $\mathrm{AllDiff}$ is propagated by bipartite matching, scheduling constraints by "edge finding" — and, increasingly, clause learning borrowed from SAT solvers. They are used for timetabling, rostering, production scheduling, configuration and vehicle routing. Many CSPs are also solved by translation into SAT ([[artificial-intelligence/logical-agents]]) or into integer linear programs. Local search remains the method of choice for very large problems where a good assignment matters more than a proof of optimality.

## Where this leads

A CSP over Boolean variables with clauses as constraints is the satisfiability problem, the subject of propositional reasoning in [[artificial-intelligence/logical-agents]], where DPLL is backtracking with unit propagation — forward checking for clauses. Planning problems can be compiled into CSPs or SAT instances by fixing the plan length ([[artificial-intelligence/planning]]). The structural ideas of this chapter — the constraint graph, elimination orderings, tree width — reappear in Bayesian networks ([[artificial-intelligence/probabilistic-reasoning]]), where the constraints become probability tables and "is there a solution?" becomes "what is the probability?".

::: summary
- A **CSP** ([[#def-csp]]) has variables, finite domains and constraints; its solutions are complete consistent assignments. Deciding solvability is $\mathsf{NP}$-complete, but structure helps.
- **Backtracking** ([[#alg-backtracking]]) assigns one variable per level and backs up at the first violation; **MRV** (fail first), the degree heuristic, **least-constraining value** and **forward checking** shrink the search enormously ([[#ex-queens-backtracking]]); backjumping and nogood learning avoid repeated failures.
- **Arc consistency** ([[#def-arc-consistency]]) deletes unsupported values; **AC-3** is correct, order-independent and runs in $O(cd^3)$ ([[#thm-ac3]]), but arc consistency does not imply solvability.
- **Tree-structured** CSPs are solved in $O(nd^2)$ by one directional pass of arc consistency and a backtrack-free assignment ([[#thm-tree-csp]]); cutset conditioning and tree decomposition extend this to near-trees.
- **Local search**: min-conflicts solves huge $n$-queens problems in about $n$ steps ([[#ex-min-conflicts]]) but is incomplete; **simulated annealing** escapes local minima by accepting uphill moves with probability $e^{-\Delta E/T}$, and at fixed $T$ samples the Boltzmann distribution ([[#thm-metropolis]]).
:::

## Exercises

::: exercise Counting assignments {level=1 check="2187"}
How many complete assignments does the Australian map-colouring CSP with three colours have, consistent or not? (Enter the number.)
::: solution
Seven variables, three values each: $3^7 = 2187$. Of these, $18$ are solutions: the mainland can be coloured in $6$ ways (once $\mathit{SA}$ and $\mathit{NT}$ are chosen, $3 \cdot 2 = 6$ ways, everything else is forced: $\mathit{WA}$ and $\mathit{Q}$ take the third colour, $\mathit{NSW}$ the colour of $\mathit{NT}$, $\mathit{V}$ the third colour), and Tasmania in $3$.
:::
:::

::: exercise Revising one arc {level=1 check="2"}
$X$ and $Y$ have domains $D_X = \{1, 2, 3, 4\}$ and $D_Y = \{1, 2, 3\}$, with constraint $X > Y + 1$. How many values remain in $D_X$ after revising the arc $(X, Y)$? (Enter the number of values.)
::: solution
$X = a$ needs some $b \in \{1, 2, 3\}$ with $a > b + 1$, i.e. $a \ge 3$ (take $b = 1$). So $1$ and $2$ are deleted and $D_X = \{3, 4\}$: two values remain. Revising $(Y, X)$ would then remove $Y = 3$ (it needs $X > 4$).
:::
:::

::: exercise Which heuristic? {level=1}
In the map-colouring CSP, before any variable is assigned, which variable does MRV choose? Which does the degree heuristic choose? After $\mathit{SA} = \text{blue}$ and with forward checking, which variable would MRV with degree tie-breaking choose next?
::: solution
Before any assignment all domains have size $3$, so MRV ties among all seven variables; the degree heuristic breaks the tie in favour of $\mathit{SA}$, which has five neighbours. After $\mathit{SA} = \text{blue}$, forward checking leaves $\{\text{red}, \text{green}\}$ for $\mathit{WA}, \mathit{NT}, \mathit{Q}, \mathit{NSW}, \mathit{V}$ and three values for $\mathit{T}$. MRV ties among the five mainland regions; counting constraints with *unassigned* variables, $\mathit{NT}$ and $\mathit{NSW}$ have two each ($\mathit{NT}$: $\mathit{WA}$, $\mathit{Q}$; $\mathit{NSW}$: $\mathit{Q}$, $\mathit{V}$) and $\mathit{Q}$ has two ($\mathit{NT}$, $\mathit{NSW}$), $\mathit{WA}$ and $\mathit{V}$ one. So one of $\mathit{NT}$, $\mathit{Q}$, $\mathit{NSW}$, depending on the final tie-break.
:::
:::

::: exercise The cost of AC-3 {level=2}
(a) Give a family of binary CSPs on which AC-3 deletes $\Theta(cd)$ values in total. (b) Show that AC-3 can be made to run in $O(cd^2)$ time by remembering, for each value $a$ of $X$ and each neighbour $Y$, the support found last time and resuming the search for a new support from there (assume each domain is ordered and values are only deleted). This is the idea of AC-2001.
::: solution
(a) Take a chain $X_1 - X_2 - \dots - X_n$ with domains $\{1, \dots, n\}$ (so $d = n$) and constraints $X_i < X_{i+1}$. The arc-consistent domains are $D_{X_i} = \{i\}$: $X_i$ needs $i - 1$ smaller values to its left and $n - i$ larger ones to its right. So AC-3 deletes $n(n - 1) = cd$ values ($c = n - 1$ constraints); the listing confirms $30$ deletions for $n = 6$. So the bound of $O(cd)$ on the number of deletions used in the proof of [[#thm-ac3]] is attained. (Here propagation alone solves the problem.)

(b) For each pair $(a, Y)$ keep a pointer to the last support $b$ of $a$ in $D_Y$. When $(X, Y)$ is revised, check whether that $b$ is still in $D_Y$; if so, $a$ is still supported (cost $O(1)$). If not, search for the next support starting *after* $b$ in the order of $D_Y$ — earlier values were either not supports or have been deleted. Over the whole run, the pointer for $(a, Y)$ moves forward through $D_Y$ at most once: $O(d)$ total work per pair $(a, Y)$, of which there are $O(cd)$ (each arc, each value of its tail). Plus $O(1)$ per check per revision: there are $O(cd)$ revisions with $O(d)$ checks each. Total $O(cd^2)$, optimal since just reading the constraint relations can take that long.
:::
:::

::: exercise A tree CSP {level=2 check="2"}
Variables $A, B, C$ with domains $\{1, 2, 3, 4\}$ form a path $A - B - C$ with constraints $A = B + 2$ and $C = 2B$. Apply [[#thm-tree-csp]] with order $A, B, C$. How many solutions are there? (Enter the number of solutions.)
::: solution
Backward pass. Revise $(B, C)$: $B$ needs some $C \in \{1, \dots, 4\}$ with $C = 2B$, so $D_B = \{1, 2\}$. Revise $(A, B)$: $A = B + 2$ with $B \in \{1, 2\}$, so $D_A = \{3, 4\}$. Forward pass: $A = 3$ forces $B = 1$ and $C = 2$; $A = 4$ forces $B = 2$ and $C = 4$. Both satisfy the constraints ($3 = 1 + 2$, $2 = 2 \cdot 1$; $4 = 2 + 2$, $4 = 2 \cdot 2$), and every solution arises this way, so there are $2$ solutions.
:::
:::

::: exercise Stationary distribution by hand {level=2 check="1/(1+2*exp(-1))"}
A state space has three states $x_0$, $x_1$, $x_2$ with energies $0, 1, 1$; proposals pick one of the other two states uniformly. With the Metropolis rule at temperature $T = 1$, what is the stationary probability of $x_0$? (Enter $\pi(x_0)$.)
::: solution
The proposal is symmetric ($q = 1/2$ between any two distinct states) and connected, so by [[#thm-metropolis]] $\pi(x) \propto e^{-E(x)}$: weights $1, e^{-1}, e^{-1}$. Hence $\pi(x_0) = 1/(1 + 2e^{-1}) \approx 0.576$. Check detailed balance directly: $\pi(x_0) P(x_0, x_1) = \pi(x_0) \cdot \tfrac12 e^{-1}$ and $\pi(x_1) P(x_1, x_0) = \pi(x_0) e^{-1} \cdot \tfrac12$. Equal.
:::
:::

::: exercise Sudoku by propagation {level=3}
Implement a Sudoku solver: AC-3 with $\ne$ constraints between cells sharing a row, column or box, inside backtracking with MRV (maintaining arc consistency). Test it on a puzzle of your choice and report the number of backtracks. Why do many newspaper puzzles need *no* backtracking at all with this solver?
::: solution
```python
from itertools import product

def peers(cell):
    r, c = cell
    box = {(r // 3 * 3 + i, c // 3 * 3 + j) for i in range(3) for j in range(3)}
    return ({(r, k) for k in range(9)} | {(k, c) for k in range(9)} | box) - {cell}

CELLS = list(product(range(9), range(9)))
NEIGH = {x: peers(x) for x in CELLS}

def ac3(D):
    queue = [(x, y) for x in CELLS for y in NEIGH[x]]
    while queue:
        x, y = queue.pop()
        if len(D[y]) == 1 and D[y] <= D[x]:          # x must differ from y's only value
            D[x] = D[x] - D[y]
            if not D[x]: return False
            queue.extend((z, x) for z in NEIGH[x] if z != y)
    return True

def solve(D, stats):
    if not ac3(D): return None
    if all(len(D[x]) == 1 for x in CELLS): return D
    x = min((x for x in CELLS if len(D[x]) > 1), key=lambda x: len(D[x]))   # MRV
    for v in sorted(D[x]):
        E = {k: set(s) for k, s in D.items()}; E[x] = {v}
        result = solve(E, stats)
        if result: return result
        stats["backtracks"] += 1
    return None

grid = ("53..7...." "6..195..." ".98....6." "8...6...3" "4..8.3..1"
        "7...2...6" ".6....28." "...419..5" "....8..79")
D = {x: {int(ch)} if ch != "." else set(range(1, 10)) for x, ch in zip(CELLS, grid)}
stats = {"backtracks": 0}
S = solve(D, stats)
print("".join(str(min(S[(r, c)])) for r in range(9) for c in range(9))[:18], stats)
```

```console
$ python3 sudoku.py
534678912672195348 {'backtracks': 0}
```

For the $\ne$ constraint, revising $(X, Y)$ deletes a value from $X$ only when $Y$'s domain is a singleton containing it, which is what the shortcut tests. This puzzle is solved by propagation and MRV choices that are always right on the first try: zero backtracks. Puzzles designed for people are usually solvable by "naked single"-style deductions, which arc consistency performs; harder puzzles need search or stronger propagation (for instance $\mathrm{AllDiff}$ reasoning, which finds "hidden singles": a digit that has only one possible cell in a unit).
:::
:::

::: exercise Random restarts {level=3 check="4"}
(a) A local-search run succeeds with probability $p$ independently of other runs. Show that the expected number of runs until the first success is $1/p$. (b) For hill climbing on 8-queens with success rate $p = 0.165$ ([[#ex-annealing]]), what is the smallest number of independent restarts $k$ such that the probability that all $k$ runs fail is below $0.5$? (Enter $k$.)
::: solution
(a) The number of runs $R$ until the first success is geometric: $\Pr(R = k) = (1 - p)^{k-1} p$, so $\E[R] = \sum_{k \ge 1} k (1 - p)^{k-1} p = p / (1 - (1 - p))^2 = 1/p$, using $\sum_k k x^{k-1} = 1/(1-x)^2$.

(b) All $k$ runs fail with probability $(1 - p)^k = 0.835^k$. $0.835^3 \approx 0.582$ and $0.835^4 \approx 0.486 < 0.5$, so $k = 4$. (For a $99\%$ chance of success, $k = \lceil \ln 0.01 / \ln 0.835\rceil = 26$.)
:::
:::
