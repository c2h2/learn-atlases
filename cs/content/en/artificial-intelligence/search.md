Slide the tiles of the 8-puzzle — eight numbered tiles and a blank in a $3 \times 3$ frame — from a scrambled position to the order $1, 2, \dots, 8$. Plan a route for a delivery van. Find a sequence of moves that solves a Rubik's cube, or an order of operations that assembles a product. Each of these is a **search problem**: the agent knows exactly how its actions change the world, the world is fully observable and deterministic, and it must find a *sequence* of actions that leads from where it is to a state where its goal holds — before acting at all. This is the simplest kind of goal-based agent from [[artificial-intelligence/intelligent-agents]], and the algorithms it needs are graph search algorithms, run on graphs so large that they are never written down.

The breadth-first search and Dijkstra's algorithm of [[algorithms/graph-search]] and [[algorithms/shortest-paths]] solve such problems in principle. The difficulty is size: the 8-puzzle has $181{,}440$ reachable states, the 15-puzzle about $10^{13}$, and Rubik's cube about $4.3 \times 10^{19}$. This chapter is about searching such spaces *without* visiting most of them. We first recast the familiar algorithms as **uninformed** strategies and compare them, adding iterative deepening, which combines the low memory of depth-first search with the optimality of breadth-first search. Then we add **heuristics** — estimates of the distance to the goal — and prove that A* search, guided by an admissible heuristic, still finds optimal solutions while expanding only the states that a heuristic cannot rule out. Better heuristics expand provably fewer states, and we will see how to invent them.

## Search problems

::: definition Search problem {#def-search-problem}
A **search problem** consists of
- a set $S$ of **states** and an **initial state** $s_0 \in S$;
- for each state $s$, a finite set $\mathrm{Actions}(s)$ of applicable actions;
- a **transition model** $\mathrm{Result}(s, a) \in S$, the state reached by doing $a$ in $s$;
- a **goal test**: a set $S_G \subseteq S$ of goal states (often given by a predicate);
- an **action cost** $c(s, a, s') > 0$ for each transition.

A **solution** is a sequence of actions $a_1, \dots, a_k$ whose states $s_i = \mathrm{Result}(s_{i-1}, a_i)$ end in a goal state $s_k \in S_G$; its **cost** is the sum of the action costs. An **optimal** solution has the least cost among all solutions; we write $C^*$ for that cost.
:::

The states and transitions form a directed graph, the **state space**. It is given *implicitly*: we can compute the successors of a state, but we cannot list all states. Two quantities describe its size for the analysis of algorithms: the **branching factor** $b$, the maximum number of successors of a state, and the **depth** $d$ of the shallowest goal (the number of actions in a shortest solution). We also write $m$ for the maximum length of any path in the space, which may be infinite. We assume throughout that every action costs at least some $\varepsilon > 0$; otherwise a search can wander for ever along paths of ever smaller total cost.

::: example Formulating the 8-puzzle {#ex-8puzzle}
Formulate the 8-puzzle as a search problem, and count its states.
::: solution
A *state* is an arrangement of the eight tiles and the blank on the nine squares, which we write as a tuple of nine entries in reading order, with $0$ for the blank: the goal is $(1, 2, 3, 4, 5, 6, 7, 8, 0)$. It is simplest to think of the *actions* as moving the blank *Up*, *Down*, *Left* or *Right* (sliding the neighbouring tile into it); an action is applicable when the blank is not on the corresponding edge, so a state has $2$, $3$ or $4$ successors and $b = 4$. The *transition model* swaps the blank with the neighbouring tile. Every action costs $1$, so an optimal solution is a shortest one.

There are $9! = 362{,}880$ arrangements, but only half of them are reachable from any given one. Read the eight tiles in reading order, ignoring the blank. A horizontal move does not change this sequence; a vertical move carries one tile past exactly two others, which changes the number of **inversions** (pairs of tiles out of order) by $-2$, $0$ or $+2$. So the parity of the number of inversions never changes, and the arrangements with odd parity — the goal has none — are unreachable from the goal. That all $9!/2 = 181{,}440$ arrangements of the right parity are reachable is a classical theorem. A breadth-first search from the goal in Python visits exactly $181{,}440$ states and finds that the farthest are $31$ moves away. The **average** branching factor is about $2.67$, smaller than $b = 4$, and lower still if we forbid undoing the last move.
:::
:::

### Searching the state space

All the algorithms in this chapter grow a **search tree** whose root is the initial state and whose nodes correspond to paths from it. A **node** $n$ records a state $n.\mathit{state}$, a parent, the action that led to it and the **path cost** $g(n)$ from the root. To **expand** a node is to generate its children, one for each applicable action. The set of generated but not yet expanded nodes is the **frontier**. Since many paths reach the same state, a search on a graph also remembers which states it has **reached** and the best path cost to each — exactly the $v.d$ estimates of [[algorithms/shortest-paths]].

::: algorithm Best-first search {#alg-best-first}
```text
BEST-FIRST-SEARCH(problem, f)
1  node ← NODE(state = s0, g = 0)
2  frontier ← priority queue ordered by f, containing node
3  reached ← table {s0: node}
4  while frontier is not empty
5      node ← POP(frontier)                    ▷ the node with the least f
6      if node.state is a goal: return node    ▷ goal test on expansion
7      for each child of EXPAND(node)
8          s ← child.state
9          if s not in reached or child.g < reached[s].g
10             reached[s] ← child
11             add child to frontier
12 return failure
```
:::

Different evaluation functions $f$ give different algorithms. With $f(n) = g(n)$ this is **uniform-cost search**, which is Dijkstra's algorithm run on the implicit graph and stopped at the first goal; its correctness for positive costs is [[algorithms/shortest-paths#thm-dijkstra]]. With $f(n) = \text{depth}(n)$ and a FIFO queue in place of the priority queue it is breadth-first search ([[algorithms/graph-search#thm-bfs]]), which may test for the goal when a node is *generated* rather than expanded, saving a whole layer. The goal test on expansion in line 6 matters for uniform-cost search: the first path to reach a goal state need not be the cheapest one, and only when the goal is popped is its cost minimal.

::: widget graph
nodes: S@0,1; A@1,2; B@1,0; C@2,2; D@2,0; G@3,1
edges: S-A:2; S-B:1; A-C:2; B-C:4; B-D:6; C-D:1; C-G:5; D-G:3
algorithm: dijkstra
start: S
caption: Uniform-cost search is Dijkstra's algorithm. Step through it from $S$: the goal $G$ is first reached with cost $9$ (via $C$, when $C$ is settled) but is settled only with cost $8$, via $D$. A search that stopped as soon as $G$ was generated would return the worse path. Notice also how many vertices are settled before $G$ — every one with distance less than $8$. A* (below) uses a heuristic to avoid some of them.
:::

## Uninformed search

**Uninformed** (or **blind**) strategies use only the problem definition: they cannot tell whether one non-goal state is "closer" to the goal than another. We judge them by four criteria: **completeness** (is a solution found whenever one exists?), **cost optimality** (is the solution found optimal?), **time** and **space**, measured in nodes generated and stored, as functions of $b$, $d$, $m$ and $C^*/\varepsilon$.

- **Breadth-first search** (BFS) is complete when $b$ is finite and optimal when all actions have the same cost. It generates $1 + b + b^2 + \dots + b^d = O(b^d)$ nodes and must keep them all, so its space is $O(b^d)$ — the decisive weakness. At $b = 10$ and a million nodes per second, depth $10$ needs $10^{10}$ nodes: under three hours of time, but (at 100 bytes per node) a terabyte of memory.
- **Uniform-cost search** is complete and optimal for costs $\ge \varepsilon > 0$. It expands every node with $g(n) < C^*$; in the worst case these lie up to depth $\lfloor C^*/\varepsilon\rfloor$, giving time and space $O(b^{1 + \lfloor C^*/\varepsilon\rfloor})$, which can be much more than $b^d$ when there are many cheap actions.
- **Depth-first search** (DFS) always expands the deepest node. It needs only $O(bm)$ space — the current path and the unexpanded siblings along it — but it is not optimal, and it is incomplete on infinite spaces (or finite ones with cycles, unless it checks for repeated states on the current path). Its time is $O(b^m)$, terrible when $m \gg d$.
- **Depth-limited search** is DFS that treats nodes at depth $\ell$ as leaves. It is complete if $\ell \ge d$.

**Iterative deepening** runs depth-limited search with limits $0, 1, 2, \dots$ until a solution is found.

::: algorithm Iterative deepening search {#alg-ids}
```text
ITERATIVE-DEEPENING-SEARCH(problem)
1  for ℓ ← 0, 1, 2, …
2      result ← DEPTH-LIMITED-SEARCH(problem, ℓ)
3      if result ≠ cutoff: return result        ▷ a solution, or failure

DEPTH-LIMITED-SEARCH(problem, ℓ)              ▷ DFS that does not go below depth ℓ
1  return DLS(NODE(s0), ℓ)
DLS(node, ℓ)
1  if node.state is a goal: return node
2  if depth(node) = ℓ: return cutoff
3  cutoff_occurred ← false
4  for each child of EXPAND(node), not repeating a state on the current path
5      result ← DLS(child, ℓ)
6      if result = cutoff: cutoff_occurred ← true
7      else if result ≠ failure: return result
8  return cutoff if cutoff_occurred else failure
```
:::

Iterative deepening looks wasteful: the top levels of the tree are regenerated in every iteration. The next theorem shows that the waste is a constant factor, because in a tree with branching factor $b \ge 2$ most of the nodes are at the bottom.

::: theorem Cost of iterative deepening {#thm-ids}
In a uniform tree with branching factor $b \ge 2$ and the shallowest goal at depth $d$, iterative deepening generates, in the worst case,
$$
N_{\mathrm{IDS}} = \sum_{i=1}^{d} (d + 1 - i)\, b^i \;\le\; b^d \left(\frac{b}{b-1}\right)^{2}
$$
nodes (not counting the root), while breadth-first search generates $N_{\mathrm{BFS}} = \sum_{i=1}^d b^i \ge b^d$. Iterative deepening uses $O(bd)$ space, and it is complete, and optimal when all actions have the same cost.
:::

::: proof
The iteration with limit $\ell$ generates every node at depths $1, \dots, \ell$ (in the worst case, when the goal is the last node at depth $d$ to be generated, this holds for the final iteration $\ell = d$ too). A node at depth $i$ is therefore generated once in each of the iterations $\ell = i, i + 1, \dots, d$, that is $d + 1 - i$ times, which gives the sum. To bound it, substitute $j = d - i$:
$$
N_{\mathrm{IDS}} = \sum_{j=0}^{d-1} (j + 1)\, b^{d - j} \le b^d \sum_{j=0}^{\infty} (j + 1)\, x^j = \frac{b^d}{(1 - x)^2}, \qquad x = \frac{1}{b},
$$
using $\sum_{j \ge 0} (j + 1)x^j = 1/(1-x)^2$ for $\lvert x\rvert < 1$ (differentiate the geometric series). And $1/(1 - 1/b)^2 = (b/(b-1))^2$.

Space: each iteration is a depth-first search to depth at most $d$, which stores the current path and the unexpanded children of the nodes on it, at most $bd$ nodes. Completeness: if a goal exists at depth $d$, the iteration $\ell = d$ finds one (depth-limited search explores every path of length at most $\ell$). Optimality for unit costs: no iteration $\ell < d$ finds a goal, since there is none at depth below $d$, so the solution returned has length exactly $d$.
:::

::: example How much does iterative deepening repeat? {#ex-ids}
Compare $N_{\mathrm{IDS}}$ and $N_{\mathrm{BFS}}$ for $b = 10$, $d = 5$.
::: solution
$N_{\mathrm{IDS}} = 5 \cdot 10 + 4 \cdot 100 + 3 \cdot 1000 + 2 \cdot 10^4 + 1 \cdot 10^5 = 50 + 400 + 3000 + 20{,}000 + 100{,}000 = 123{,}450$, and $N_{\mathrm{BFS}} = 10 + 100 + 1000 + 10^4 + 10^5 = 111{,}110$. Iterative deepening does about $11\%$ more work, close to the asymptotic overhead $N_{\mathrm{IDS}}/N_{\mathrm{BFS}} \to b/(b-1) = 1.11$ (the bound of [[#thm-ids]] is against $b^d$, hence the square). In exchange it stores at most $bd = 50$ nodes rather than $10^5$. If BFS tests for the goal on generation and IDS cannot avoid generating the last level, the comparison is even closer. For large unknown depths, iterative deepening is the preferred uninformed method.
:::
:::

::: widget plot
f: x/(x-1); (x/(x-1))^2
x: 2, 12
y: 0.8, 4.2
labels: N_{\mathrm{IDS}}/N_{\mathrm{BFS}} \text{ (asymptotic)}; \text{bound of the theorem against } b^d
caption: The overhead of iterative deepening as a function of the branching factor $b$. Asymptotically iterative deepening generates $b/(b-1)$ times as many nodes as breadth-first search; the theorem's bound $(b/(b-1))^2$ is against the bottom level $b^d$ alone. Even for $b = 2$ the overhead is a factor of $2$, and for $b \ge 10$ it is about $11\%$ — a small price for reducing memory from $O(b^d)$ to $O(bd)$.
:::

**Bidirectional search** runs two searches, forward from the start and backward from the goal, and stops when they meet; with BFS in both directions it generates $O(b^{d/2})$ nodes rather than $O(b^d)$. It needs a way to compute predecessors, a single explicit goal state (or a small set), and a careful stopping rule if costs are not uniform — the first meeting point need not lie on an optimal path.

| strategy | complete? | optimal? | time | space |
|---|---|---|---|---|
| breadth-first | yes (finite $b$) | unit costs | $O(b^d)$ | $O(b^d)$ |
| uniform-cost | yes (costs $\ge \varepsilon$) | yes | $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$ | $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$ |
| depth-first | no (infinite spaces) | no | $O(b^m)$ | $O(bm)$ |
| depth-limited ($\ell$) | if $\ell \ge d$ | no | $O(b^\ell)$ | $O(b\ell)$ |
| iterative deepening | yes (finite $b$) | unit costs | $O(b^d)$ | $O(bd)$ |
| bidirectional (BFS) | yes | unit costs | $O(b^{d/2})$ | $O(b^{d/2})$ |

::: quiz
Which uninformed strategy would you choose for a problem with branching factor about $5$, unit action costs, an unknown solution depth thought to be around $20$, and limited memory?

- [ ] Breadth-first search, because it is optimal for unit costs.
- [ ] Depth-first search, because it uses little memory.
- [x] Iterative deepening search.
- [ ] Uniform-cost search, because it is optimal for any costs.
::: solution
At depth $20$ breadth-first and uniform-cost search would store on the order of $5^{20} \approx 10^{14}$ nodes. Depth-first search is cheap in memory but may plunge far below depth $20$ and returns no guarantee of a shortest solution. Iterative deepening stores only $O(bd) \approx 100$ nodes, is complete, finds a shortest solution for unit costs, and by [[#thm-ids]] costs only about $b/(b-1) = 1.25$ times as much time as breadth-first search.
:::
:::

## Heuristic search and A*

An **informed** strategy uses a **heuristic function** $h(n)$: an estimate, computed from the state of $n$, of the cost of the cheapest path from $n$'s state to a goal. For route finding, $h$ might be the straight-line distance to the destination; for the 8-puzzle, the number of misplaced tiles. We require $h(n) \ge 0$ and $h(n) = 0$ at goal states.

**Greedy best-first search** expands the node that appears closest to the goal, $f(n) = h(n)$. It is often fast, but it ignores the cost already incurred, so it is not optimal, and on infinite spaces it may be led astray for ever. **A\* search** combines both:
$$
f(n) = g(n) + h(n),
$$ {#eq-astar-f}
the estimated cost of the cheapest solution *through* $n$. A* is [[#alg-best-first]] with this $f$. Whether it is optimal depends on the heuristic.

::: definition Admissible and consistent heuristics {#def-admissible}
Let $h^*(s)$ be the cost of an optimal path from $s$ to a goal ($\infty$ if there is none). A heuristic $h$ is **admissible** if it never overestimates: $h(s) \le h^*(s)$ for every state $s$. It is **consistent** (or **monotone**) if $h(s) = 0$ for goal states and, for every state $s$, action $a$ and successor $s' = \mathrm{Result}(s, a)$,
$$
h(s) \le c(s, a, s') + h(s').
$$ {#eq-consistent}
:::

Consistency is a triangle inequality: the estimate from $s$ is no more than the cost of a step plus the estimate from where the step leads. It is the same condition as [[algorithms/shortest-paths#eq-triangle]], with $h$ playing the role of a distance to the goal.

::: lemma Consistent heuristics are admissible {#lem-consistent-admissible}
Every consistent heuristic is admissible.
:::

::: proof
Let $s = s_0, s_1, \dots, s_k$ be an optimal path from $s$ to a goal $s_k$, with step costs $c_1, \dots, c_k$. Applying [[#eq-consistent]] along it, $h(s_0) \le c_1 + h(s_1) \le c_1 + c_2 + h(s_2) \le \dots \le c_1 + \dots + c_k + h(s_k) = h^*(s) + 0$. If no goal is reachable from $s$, then $h^*(s) = \infty$ and there is nothing to prove.
:::

The converse fails, but admissible heuristics that occur naturally are almost always consistent. Admissibility is what is needed when A* searches a *tree*, where every node is a distinct path.

::: theorem A* tree search is optimal with an admissible heuristic {#thm-astar-tree}
Suppose the branching factor is finite, every action costs at least $\varepsilon > 0$, a solution exists, and $h$ is admissible. Then A* search without duplicate detection (every generated node is added to the frontier) returns an optimal solution.
:::

::: proof
First, A* returns some solution. Every node on the frontier has $f(n) \ge g(n)$, and only finitely many nodes have $g(n) \le C^*$ (paths of length at most $C^*/\varepsilon$, each with finitely many choices). At any time before the algorithm stops, the frontier contains a node $n'$ on an optimal path (initially the root; when such a node is expanded, its child on the optimal path is added). For it, $f(n') = g(n') + h(n') \le g(n') + h^*(n') = C^*$, using admissibility and the fact that the rest of the optimal path from $n'$ costs exactly $h^*(n')$. So every node popped has $f \le C^*$, hence $g \le C^*$; only finitely many such nodes exist, so the search ends, and since $n'$ is still on the frontier until the goal at the end of its path is popped, it ends by returning a goal.

Now suppose A* returned a goal node $n_G$ with $g(n_G) > C^*$. At the moment $n_G$ was popped, the frontier contained a node $n'$ on an optimal path, as above, with $f(n') \le C^*$. But $f(n_G) = g(n_G) + 0 > C^* \ge f(n')$, so A* would have popped $n'$ rather than $n_G$ — a contradiction.
:::

On a graph, [[#alg-best-first]] discards a new path to a state already reached unless it is cheaper (line 9), and in a common simpler variant it never re-expands a state at all. With a merely admissible heuristic the second variant can return a suboptimal solution ([[#ex-inconsistent]]). Consistency removes the problem, because it makes $f$ grow along every path.

::: theorem A* graph search with a consistent heuristic {#thm-astar-graph}
Let $h$ be consistent, with the assumptions of [[#thm-astar-tree]]. Then:
1. along any path, the values $f(n) = g(n) + h(n)$ are non-decreasing;
2. A* expands nodes in non-decreasing order of $f$, and when a node is expanded for the first time with state $s$, its path cost is optimal: $g(n) = g^*(s)$, the least cost of a path from $s_0$ to $s$;
3. consequently no state is ever expanded twice, and the first goal expanded is reached by an optimal path, with $f = C^*$.
:::

::: proof
1. If $n'$ is a child of $n$ via action $a$, then $f(n') = g(n) + c(s, a, s') + h(s') \ge g(n) + h(s) = f(n)$ by [[#eq-consistent]].

2. *Non-decreasing order.* Suppose $n$ is popped, with value $f(n)$, and its children are pushed. By part 1 each child has $f \ge f(n)$, and every other node on the frontier had $f \ge f(n)$ already, since $n$ was a minimum. So the minimum of the frontier never decreases, and the sequence of popped $f$-values is non-decreasing.

*Optimal paths.* Suppose a node $n$ with state $s$ is expanded with $g(n) > g^*(s)$. Let $P = s_0, \dots, s$ be an optimal path to $s$. Some node on $P$ is on the frontier at this moment (the root was expanded; follow $P$ to the first state whose optimal-path node has not been expanded — its node was pushed when its predecessor on $P$ was expanded, or a node with the same state and equal cost was). Call it $n'$, with $g(n') = g^*(s')$. By part 1 applied to the remainder of $P$, $f(n') \le g^*(s) + h(s) < g(n) + h(s) = f(n)$. So $n'$ has a strictly smaller $f$ and would have been popped before $n$ — a contradiction.

3. When a state is first expanded its cost is already optimal, so no later path is cheaper, and line 9 never re-adds it. A goal node $n_G$ expanded first has $g(n_G) = g^*(s_G)$, and $f(n_G) = g(n_G)$. If some cheaper goal existed, its node on an optimal path would have $f \le C^* < f(n_G)$ and would have been expanded first.
:::

So with a consistent heuristic, A* graph search is uniform-cost search on modified costs $c'(s, a, s') = c(s, a, s') - h(s) + h(s')$, which are non-negative exactly when $h$ is consistent — the same reweighting trick as Johnson's algorithm in [[algorithms/shortest-paths]]. The search proceeds in **contours** of increasing $f$, like the rings of uniform-cost search but stretched towards the goal.

::: theorem Which nodes A* expands {#thm-astar-contours}
Let $h$ be consistent and the assumptions of [[#thm-astar-tree]] hold. Then A* expands every state $s$ with $g^*(s) + h(s) < C^*$, and no state with $g^*(s) + h(s) > C^*$. (States with $f = C^*$ may or may not be expanded, depending on tie-breaking.)
:::

::: proof
By [[#thm-astar-graph]] A* expands states in non-decreasing order of $f$, each with its optimal $g$, and stops when it expands the first goal, at $f = C^*$. Every expanded state therefore has $g^*(s) + h(s) \le C^*$. Conversely, let $g^*(s) + h(s) < C^*$, and let $s_0, s_1, \dots, s_j = s$ be an optimal path to $s$. By part 1 of [[#thm-astar-graph]] every state on it has $g^*(s_i) + h(s_i) \le g^*(s) + h(s) < C^*$. While the search runs, the first unexpanded state on this path has a frontier node with $f < C^*$ (as in the previous proof), so the search cannot pop a goal (with $f = C^*$) before expanding it. Induction along the path shows that $s$ itself is expanded.
:::

This theorem explains both the strength and the limitation of A*. A good heuristic **prunes** every state with $g^* + h > C^*$ without looking at it. But every state with $g^* + h < C^*$ *must* be expanded, and in hard problems the number of such states grows exponentially with the solution depth unless the heuristic error is tiny. Indeed among all algorithms that are guaranteed to find optimal solutions using the same consistent heuristic and extend paths from the root, none can skip a state with $g^* + h < C^*$ on every problem — A* is **optimally efficient** in this sense (Dechter and Pearl, 1985), up to tie-breaking among nodes with $f = C^*$.

::: example Tracing A* {#ex-astar-trace}
Run A* graph search from $S$ to $G$ on the graph of the uniform-cost figure, with heuristic $h(S) = 6$, $h(A) = 5$, $h(B) = 6$, $h(C) = 4$, $h(D) = 3$, $h(G) = 0$. Check that $h$ is consistent, and compare the number of expansions with uniform-cost search.
::: solution
*Consistency.* Check [[#eq-consistent]] in both directions of each edge ($\lvert h(u) - h(v)\rvert \le c(u, v)$): $S$–$A$: $1 \le 2$; $S$–$B$: $0 \le 1$; $A$–$C$: $1 \le 2$; $B$–$C$: $2 \le 4$; $B$–$D$: $3 \le 6$; $C$–$D$: $1 \le 1$; $C$–$G$: $4 \le 5$; $D$–$G$: $3 \le 3$. The true distances to $G$ are $h^*(D) = 3$, $h^*(C) = 4$, $h^*(A) = 6$, $h^*(B) = 8$, $h^*(S) = 8$, so $h$ is also admissible (as [[#lem-consistent-admissible]] promises) and exact at $C$, $D$, $G$.

```python
import heapq

def astar(graph, h, start, goal, reopen=True, trace=False):
    """A* graph search. graph: {u: {v: cost}}. Returns (cost, path)."""
    g = {start: 0}; parent = {start: None}; closed = set()
    frontier = [(h[start], start)]
    while frontier:
        f, u = heapq.heappop(frontier)
        if u in closed or f > g[u] + h[u]: continue      # stale entry
        if u == goal:
            path = []
            while u: path.append(u); u = parent[u]
            return g[goal], path[::-1]
        closed.add(u)
        for v, c in graph[u].items():
            if g[u] + c < g.get(v, float("inf")):
                if v in closed and not reopen: continue   # never revisit a closed node
                closed.discard(v)
                g[v] = g[u] + c; parent[v] = u
                heapq.heappush(frontier, (g[v] + h[v], v))
        if trace:
            live = sorted({(f, v) for f, v in frontier if v not in closed and f == g[v] + h[v]})
            print(f"expand {u} (g={g[u]}, f={f})  frontier:", " ".join(f"{v}:{f}" for f, v in live))
```

```console
expand S (g=0, f=6)  frontier: A:7 B:7
expand A (g=2, f=7)  frontier: B:7 C:8
expand B (g=1, f=7)  frontier: C:8 D:10
expand C (g=4, f=8)  frontier: D:8 G:9
expand D (g=5, f=8)  frontier: G:8
(8, ['S', 'A', 'C', 'D', 'G'])
```

The popped $f$-values are $6, 7, 7, 8, 8, 8$ — non-decreasing, as [[#thm-astar-graph]] says. Expanding $B$ (an $f = 7$ tie, broken alphabetically) was useless, but unavoidable: $f(B) = 7 < C^* = 8$, so by [[#thm-astar-contours]] *every* algorithm of this kind must look at $B$. The node $D$ first enters the frontier with $f = 10$ via $B$ and is improved to $f = 8$ via $C$. The solution $S, A, C, D, G$ costs $8$, the same as uniform-cost search found. Here the graph is so small that A* expands as many states as uniform-cost search; on the 8-puzzle ([[#ex-8puzzle-heuristics]]) the saving is a factor of about forty at depth $26$.
:::
:::

::: example An admissible but inconsistent heuristic {#ex-inconsistent}
On the directed graph $S \to A$ ($1$), $S \to B$ ($1$), $A \to C$ ($1$), $B \to C$ ($2$), $C \to G$ ($3$), use $h(S) = 0$, $h(A) = 3$, $h(B) = 1$, $h(C) = 0$, $h(G) = 0$. Show that $h$ is admissible but not consistent, and run A* graph search with and without re-opening closed states.
::: solution
The true costs to the goal are $h^*(C) = 3$, $h^*(A) = 4$, $h^*(B) = 5$, $h^*(S) = 5$, so $h \le h^*$ everywhere: admissible. But $h(A) = 3 > c(A, C) + h(C) = 1$: inconsistent. Running the listing of [[#ex-astar-trace]] with `reopen=False`:

```console
expand S (g=0, f=0)  frontier: B:2 A:4
expand B (g=1, f=2)  frontier: C:3 A:4
expand C (g=3, f=3)  frontier: A:4 G:6
expand A (g=1, f=4)  frontier: G:6
no reopening: (6, ['S', 'B', 'C', 'G'])
reopening:    (5, ['S', 'A', 'C', 'G'])
```

The overestimate-looking value $h(A) = 3$ delays $A$, so $C$ is expanded first via the worse path through $B$ ($g = 3$). When $A$ is finally expanded it finds $C$ with $g = 2$, but $C$ is closed and, without re-opening, that discovery is thrown away: A* returns cost $6$ instead of $5$. With re-opening (as in [[#alg-best-first]], line 9) the cheaper path to $C$ is pushed again, $C$ is re-expanded and the optimal path is found — at the price of expanding a state twice, which on bad examples can happen exponentially often (Martelli, 1977).
:::
:::

::: warning "A* always finds the shortest path"
A* is optimal only under conditions: an admissible heuristic for tree search ([[#thm-astar-tree]]), and a consistent one — or re-opening of closed states — for graph search ([[#thm-astar-graph]], [[#ex-inconsistent]]). An inadmissible heuristic that sometimes overestimates can make A* return a worse solution; this is sometimes done on purpose (**weighted A\***, $f = g + w\,h$ with $w > 1$, finds solutions of cost at most $w \cdot C^*$ much faster), but then the result is not optimal. Also, A* is not cheap: by [[#thm-astar-contours]] it stores every state with $g^* + h < C^*$, and on hard problems it runs out of memory long before it runs out of time.
:::

## Designing heuristics

For the 8-puzzle, two classical admissible heuristics are
- $h_1$ = the number of **misplaced tiles** (not counting the blank), and
- $h_2$ = the **Manhattan distance**: the sum, over tiles, of the horizontal plus vertical distance from each tile's square to its goal square.

Both are admissible: every misplaced tile must be moved at least once, and each move shifts one tile one square, reducing the Manhattan distance by at most one. Clearly $h_2 \ge h_1$ — each misplaced tile contributes at least $1$ to $h_2$. Is a larger heuristic better?

::: theorem Dominance {#thm-dominance}
Let $h_1$ and $h_2$ be consistent heuristics with $h_2(s) \ge h_1(s)$ for every state ($h_2$ **dominates** $h_1$). Then every state expanded by A* with $h_2$ with $g^*(s) + h_2(s) < C^*$ is also expanded by A* with $h_1$.
:::

::: proof
By [[#thm-astar-contours]], A* with $h_1$ expands every state with $g^*(s) + h_1(s) < C^*$. If $g^*(s) + h_2(s) < C^*$, then $g^*(s) + h_1(s) \le g^*(s) + h_2(s) < C^*$, so $s$ is expanded by A* with $h_1$. (Only states with $f = C^*$ escape the comparison, because of tie-breaking.)
:::

So with consistent heuristics, bigger is better, as long as the heuristic stays admissible and is cheap to compute. Given several admissible heuristics none of which dominates, $h(s) = \max(h_1(s), \dots, h_k(s))$ is admissible, consistent if they all are, and dominates each.

Where do heuristics come from? A good source is a **relaxed problem**: the original problem with some restrictions on actions removed. If in the 8-puzzle a tile may move to *any* square, the optimal cost is the number of misplaced tiles, $h_1$. If a tile may move to any *adjacent* square, even an occupied one, the optimal cost is the Manhattan distance, $h_2$.

::: theorem Relaxations give consistent heuristics {#thm-relaxation}
Let a relaxed problem have the same states and goal states as the original and a superset of its transitions, with the same costs on the original transitions. Then the optimal cost-to-goal $h_R(s)$ of the relaxed problem is a consistent (hence admissible) heuristic for the original.
:::

::: proof
*Consistency.* If $s' = \mathrm{Result}(s, a)$ in the original problem, the same transition exists in the relaxed problem with the same cost, so one way to reach a goal from $s$ in the relaxed problem is to take it and then continue optimally from $s'$: $h_R(s) \le c(s, a, s') + h_R(s')$. Also $h_R = 0$ at goal states. Admissibility follows from [[#lem-consistent-admissible]] (or directly: every original solution is also a relaxed solution, so the relaxed optimum is no larger).
:::

Relaxations must be *easy* to solve to be useful — the relaxed problem is solved at every node. Other sources of heuristics are **pattern databases**, which store the exact cost of solving a sub-problem (say, tiles $1$–$4$ of the 15-puzzle, ignoring the others) for every configuration of its pieces, computed once by a backward breadth-first search; and *learning* heuristics from solved instances, which gives no admissibility guarantee.

A heuristic's quality is often summarised by the **effective branching factor** $b^*$: if A* expands $N$ nodes to find a solution at depth $d$, then $b^*$ is the branching factor of a uniform tree of depth $d$ with $N + 1$ nodes, that is $N + 1 = 1 + b^* + (b^*)^2 + \dots + (b^*)^d$. A heuristic whose $b^*$ is close to $1$ lets the search go very deep.

::: example Two heuristics on the 8-puzzle {#ex-8puzzle-heuristics}
Compare breadth-first search, A* with $h_1$, A* with $h_2$ and IDA* with $h_2$ (below) on random 8-puzzle instances whose optimal solutions have $6, 10, \dots, 26$ moves.
::: solution
A breadth-first search from the goal computes the exact distance of all $181{,}440$ reachable states; for each depth we draw $20$ states at that distance with a fixed seed and average the number of expanded nodes. The heuristics are

```python
GOAL = (1, 2, 3, 4, 5, 6, 7, 8, 0)          # 0 is the blank

def h1(s):   # misplaced tiles
    return sum(1 for i, x in enumerate(s) if x and x != GOAL[i])

def h2(s):   # Manhattan distance
    return sum(abs(i // 3 - (x - 1) // 3) + abs(i % 3 - (x - 1) % 3)
               for i, x in enumerate(s) if x)
```

and the searches are breadth-first search and A* as in [[#ex-astar-trace]] (with goal tests on expansion), plus the IDA* listing below. Each search's solution length was checked against the exact distance.

```console
$ python3 puzzle.py
181440 reachable states, the farthest at depth 31
 d      BFS   A*(h1)    b*  A*(h2)    b*  IDA*(h2)
 6       78        8  1.08       6  1.00         6
10      638       39  1.24      18  1.10        17
14     3865      223  1.33      57  1.17        56
18    22720     1409  1.39     249  1.24       297
22    85770     8018  1.42     901  1.27      1087
26   165145    39596  1.44    3803  1.30      5216
```

At depth $26$, BFS expands $165{,}145$ of the $181{,}440$ states, A* with misplaced tiles about $40{,}000$, and A* with Manhattan distance about $3800$ — ten times fewer than $h_1$, as [[#thm-dominance]] leads us to expect. In terms of the effective branching factor, $h_2$ keeps $b^*$ near $1.3$ where $h_1$ lets it climb towards $1.45$; the difference compounds exponentially with depth. IDA* expands somewhat more nodes than A* with the same heuristic (it repeats the shallow contours) but stores only the current path.
:::
:::

::: quiz
Let $h_1$ and $h_2$ be admissible heuristics. Which of the following are guaranteed to be admissible?

- [x] $\max(h_1, h_2)$
- [x] $\tfrac12 (h_1 + h_2)$
- [ ] $h_1 + h_2$
- [x] $\min(h_1, h_2)$
::: solution
If $h_1 \le h^*$ and $h_2 \le h^*$, then $\max(h_1, h_2)$, $\min(h_1, h_2)$ and any average are all $\le h^*$. The sum can be up to $2h^*$: for the 8-puzzle, $h_1 + h_2$ overestimates on a state one move from the goal ($h_1 = 1$, $h_2 = 1$, $h^* = 1$, sum $2$). Of the admissible ones, $\max$ dominates the others and is the best choice for A*.
:::
:::

## Saving memory: IDA*

A*'s weakness is memory. **Iterative-deepening A\*** (IDA\*) does to A* what iterative deepening does to breadth-first search: it runs depth-first searches, each cut off when $f = g + h$ exceeds a **bound**, starting with the bound $f(\text{root}) = h(s_0)$ and raising it in each iteration to the smallest $f$-value that exceeded the previous bound.

::: algorithm IDA* {#alg-ida-star}
```python
def ida_star(start, h, successors, is_goal):
    """Returns the cost of an optimal solution (unit or positive costs)."""
    def dfs(s, g, bound, path):
        f = g + h(s)
        if f > bound: return f                  # report the f that broke the bound
        if is_goal(s): return "FOUND"
        smallest = float("inf")
        for t, cost in successors(s):
            if t in path: continue              # avoid cycles on the current path
            path.add(t)
            r = dfs(t, g + cost, bound, path)
            path.discard(t)
            if r == "FOUND": return r
            smallest = min(smallest, r)
        return smallest
    bound = h(start)
    while True:
        r = dfs(start, 0, bound, {start})
        if r == "FOUND": return bound
        if r == float("inf"): return None       # no solution
        bound = r                               # next contour
```
:::

The 8-puzzle program of [[#ex-8puzzle-heuristics]] uses the same scheme, with the cycle check replaced by "do not undo the last move".

::: theorem IDA* is optimal {#thm-ida-star}
With an admissible heuristic, positive action costs and finite branching, IDA* returns the cost of an optimal solution whenever one exists. Its space is $O(bd^*)$ where $d^*$ is the length of the longest path it explores, which is at most the number of actions in a path of cost $C^*$.
:::

::: proof
*Invariant:* at the start of each iteration, $\text{bound} \le C^*$. Initially $\text{bound} = h(s_0) \le h^*(s_0) = C^*$ by admissibility. In an iteration with bound $\beta \le C^*$, consider an optimal solution path. Every node $n$ on it has $f(n) = g(n) + h(n) \le g(n) + h^*(n) = C^*$. If $C^* \le \beta$, i.e. $\beta = C^*$, no node of the optimal path is cut off, so the depth-first search reaches its goal (or another goal) and reports "found"; the goal found has $g = f \le \beta = C^*$, so its cost is optimal. If $\beta < C^*$, no goal is found (any goal reached would have cost $g = f \le \beta < C^*$, impossible), and the new bound is the smallest $f$-value that exceeded $\beta$. Some node on the optimal path was cut off with $f \le C^*$, so the new bound is at most $C^*$, and it is strictly larger than $\beta$: the invariant is maintained.

*Termination:* the bounds strictly increase and are all $f$-values of paths with $f \le C^*$, hence with $g \le C^*$; with costs $\ge \varepsilon$ and finite branching there are only finitely many such paths, so finitely many distinct bounds, and the iteration with bound $C^*$ is reached. Space: each iteration is a depth-first search that stores the current path (and, if it generates children eagerly, the siblings along it).
:::

IDA* works well when $f$ takes few distinct values, as with unit costs and integer heuristics on the 8- and 15-puzzles; it was the first algorithm to solve random 15-puzzle instances optimally (Korf, 1985). If every node has a different $f$-value, each iteration adds only one new node, and IDA* expands $O(N^2)$ nodes where A* expands $N$. Other memory-bounded variants are **recursive best-first search**, which remembers the best alternative $f$-value at each level of its path, and **SMA\***, which runs A* until memory is full and then drops the worst leaf, backing its $f$-value up to the parent.

::: history
The 15-puzzle was a craze of 1880; its parity theorem had been published by William Johnson and William Story in the *American Journal of Mathematics* in 1879. Allen Newell and Herbert Simon's General Problem Solver (1959) searched by means–ends analysis. Peter Hart, Nils Nilsson and Bertram Raphael introduced A* for the robot Shakey at SRI in "A formal basis for the heuristic determination of minimum cost paths" (*IEEE Transactions on Systems Science and Cybernetics*, 1968), proving its optimality for admissible heuristics; a correction to one of their proofs appeared in 1972. Ira Pohl studied bidirectional and weighted search (1969–70). Alberto Martelli (1977) showed that A* with inconsistent heuristics can re-expand exponentially many times. Judea Pearl's *Heuristics* (1984) systematised the theory, and Rina Dechter and Pearl proved the optimal efficiency of A* in 1985. Richard Korf introduced iterative-deepening search and IDA* in "Depth-first iterative-deepening: an optimal admissible tree search" (*Artificial Intelligence*, 1985). Joseph Culberson and Jonathan Schaeffer introduced pattern databases (1996, journal version 1998), with which Korf solved random instances of Rubik's cube optimally in 1997.
:::

## In practice

Heuristic search remains the engine of much of classical AI. As of 2026, route planners combine A* with precomputed lower bounds from **landmarks** (the triangle inequality with respect to a few chosen vertices gives an admissible, consistent heuristic) and with hierarchical preprocessing; video-game path finding runs A* on grids and navigation meshes, often with weighted heuristics; and automated planners ([[artificial-intelligence/planning]]) use greedy best-first search and A* with heuristics computed automatically from relaxed problems — exactly [[#thm-relaxation]]. Optimal solvers for puzzles such as Rubik's cube use IDA* with large pattern databases. Learned heuristics and value functions are an active research area; by themselves they carry no admissibility guarantee, so when optimality matters they are combined with admissible bounds.

## Where this leads

When another agent chooses half the moves, the search tree has alternating levels, and A*'s best-first idea gives way to minimax and alpha–beta pruning ([[artificial-intelligence/adversarial-search]]). When states are factored into variables, search can exploit their structure: constraint propagation prunes the space before it is searched ([[artificial-intelligence/constraint-satisfaction]]), and planners derive heuristics from the structure of actions ([[artificial-intelligence/planning]]). When actions have uncertain outcomes, the "solution" is no longer a sequence but a policy ([[artificial-intelligence/decision-making]]). The hardness of search in general — finding short solutions to the $(n^2 - 1)$-puzzle is $\mathsf{NP}$-hard, and plan existence in compact representations is $\mathsf{PSPACE}$-complete — is studied in [[complexity]].

::: summary
- A **search problem** ([[#def-search-problem]]) is a state space given implicitly by actions, a transition model, a goal test and costs; search algorithms grow a tree of paths, keeping a **frontier** and a table of **reached** states ([[#alg-best-first]]).
- Uninformed strategies: BFS and uniform-cost search are complete and optimal but need $O(b^d)$ memory; DFS needs $O(bm)$ memory but is neither; **iterative deepening** has the best of both at a constant-factor overhead ([[#thm-ids]]).
- **A\*** expands nodes in order of $f = g + h$. It is optimal with an **admissible** heuristic for tree search ([[#thm-astar-tree]]) and with a **consistent** one for graph search ([[#thm-astar-graph]]); consistency implies admissibility ([[#lem-consistent-admissible]]), and an inconsistent heuristic can mislead graph search without re-opening ([[#ex-inconsistent]]).
- A* expands every state with $g^* + h < C^*$ and none with $g^* + h > C^*$ ([[#thm-astar-contours]]); hence dominant heuristics are better ([[#thm-dominance]]), and the Manhattan distance beats misplaced tiles by a factor of ten on the 8-puzzle at depth 26.
- Heuristics come from **relaxed problems**, whose optimal costs are consistent ([[#thm-relaxation]]), and from pattern databases; the **effective branching factor** measures their quality.
- **IDA\*** finds optimal solutions in linear memory ([[#thm-ida-star]]) by depth-first search within increasing $f$-bounds.
:::

## Exercises

::: exercise Iterative deepening by hand {level=1 check="1230"}
How many nodes (not counting the root) does iterative deepening generate in the worst case in a uniform tree with $b = 10$ and the shallowest goal at depth $d = 3$? How many does breadth-first search generate? (Enter the number for iterative deepening.)
::: solution
By [[#thm-ids]], $N_{\mathrm{IDS}} = 3 \cdot 10 + 2 \cdot 100 + 1 \cdot 1000 = 30 + 200 + 1000 = 1230$, against $N_{\mathrm{BFS}} = 10 + 100 + 1000 = 1110$ for breadth-first search — about $11\%$ more. (Counting the root as well, which is generated once in each of the four iterations $\ell = 0, 1, 2, 3$, adds $4$.)
:::
:::

::: exercise Is it consistent? {level=1}
On the undirected graph with edges $S$–$A$ ($1$), $A$–$G$ ($4$), $S$–$B$ ($2$), $B$–$G$ ($2$), decide whether each heuristic is admissible and whether it is consistent: (a) $h = (S{:}\,3, A{:}\,4, B{:}\,2, G{:}\,0)$; (b) $h = (S{:}\,4, A{:}\,1, B{:}\,2, G{:}\,0)$; (c) $h = (S{:}\,3, A{:}\,3, B{:}\,1, G{:}\,0)$.
::: solution
True costs: $h^*(G) = 0$, $h^*(B) = 2$, $h^*(A) = \min(4, 1 + 4) = 4$ (via $S$, $1 + 2 + 2 = 5$), $h^*(S) = 4$. Consistency on an undirected graph means $\lvert h(u) - h(v)\rvert \le c(u, v)$ for every edge (plus $h(G) = 0$).
(a) Admissible ($3 \le 4$, $4 \le 4$, $2 \le 2$). Consistent: $S$–$A$: $1 \le 1$; $A$–$G$: $4 \le 4$; $S$–$B$: $1 \le 2$; $B$–$G$: $2 \le 2$. Yes.
(b) Admissible ($4, 1, 2 \le 4, 4, 2$). Not consistent: $S$–$A$ has $\lvert 4 - 1\rvert = 3 > 1$.
(c) Admissible. Consistent: $0 \le 1$, $3 \le 4$, $2 \le 2$, $1 \le 2$. Yes.
:::
:::

::: exercise Effective branching factor {level=1 check="2"}
A* finds a solution at depth $3$ after expanding $14$ nodes. What is the effective branching factor $b^*$? (Enter $b^*$.)
::: solution
Solve $N + 1 = 1 + b^* + (b^*)^2 + (b^*)^3$ with $N = 14$: $b + b^2 + b^3 = 14$. Try $b = 2$: $2 + 4 + 8 = 14$. So $b^* = 2$.
:::
:::

::: exercise Uniform-cost search can be slow {level=2}
Construct a family of search problems, with branching factor $2$ and a solution at depth $1$, on which uniform-cost search expands exponentially many nodes in a parameter $k$ before finding the optimal solution, while BFS expands only one. What does this say about the bound $O(b^{1 + \lfloor C^*/\varepsilon\rfloor})$?
::: solution
From $s_0$, let one action lead directly to the goal with cost $1$, and let a second action lead to the root of a complete binary tree in which every action costs $\varepsilon = 1/k$ and no state is a goal. Uniform-cost search expands all nodes with $g < C^* = 1$, which includes every tree node whose path cost is below $1$ — all nodes in roughly the first $k - 1$ levels of the tree, on the order of $2^{k}$ nodes. BFS goes to depth $1$ and finds the goal immediately (its solution happens to be optimal here). The bound $O(b^{1 + \lfloor C^*/\varepsilon\rfloor}) = O(2^{1 + k})$ is attained: when costs vary widely, the relevant depth for uniform-cost search is $C^*/\varepsilon$, not $d$.
:::
:::

::: exercise Straight-line distance is consistent {level=2}
In route finding on a road map, the cost of a road is its length and $h(s)$ is the straight-line (Euclidean) distance from $s$ to the destination. Prove that $h$ is consistent. Is it still consistent if road costs are travel *times*, with $h$ the straight-line distance divided by the speed limit of the fastest road on the map?
::: solution
For a road from $s$ to $s'$ of length $c(s, s') \ge \lVert s - s'\rVert$ (a road is at least as long as the straight segment between its ends), the triangle inequality in the plane gives $h(s) = \lVert s - t\rVert \le \lVert s - s'\rVert + \lVert s' - t\rVert \le c(s, s') + h(s')$, where $t$ is the destination; and $h(t) = 0$. So $h$ is consistent. With times: a road from $s$ to $s'$ takes at least $\lVert s - s'\rVert / v_{\max}$, where $v_{\max}$ is the largest speed limit, so the same argument divided by $v_{\max}$ gives $h(s) = \lVert s - t\rVert/v_{\max} \le c(s, s') + h(s')$: still consistent. Dividing by a smaller speed would give a larger heuristic that can overestimate on fast roads.
:::
:::

::: exercise A* must expand these states {level=2 check="3"}
In the A* trace of [[#ex-astar-trace]], how many states have $g^*(s) + h(s) < C^*$? (These are exactly the states that A* is forced to expand by [[#thm-astar-contours]]; enter their number.)
::: solution
$C^* = 8$. The optimal costs from $S$ are $g^*(S) = 0$, $g^*(A) = 2$, $g^*(B) = 1$, $g^*(C) = 4$, $g^*(D) = 5$, $g^*(G) = 8$, so $g^* + h$ is $6, 7, 7, 8, 8, 8$ for $S, A, B, C, D, G$. Exactly three states, $S$, $A$ and $B$, have $g^* + h < 8$. The trace also expanded $C$ and $D$, which have $f = C^*$: [[#thm-astar-contours]] leaves such states to tie-breaking, and here they had to be expanded because they lie on the only optimal path.
:::
:::

::: exercise IDA* versus A* {level=3}
(a) Show that if all $f$-values are distinct, IDA* can expand $\Theta(N^2)$ nodes on a problem where A* expands $N$. (b) Explain why the 8-puzzle with unit costs and the Manhattan heuristic is a favourable case: how many iterations does IDA* need for a solution at depth $d$ starting from $h(s_0)$? (c) Implement IDA* for the 8-puzzle and check its solution lengths against breadth-first search on 100 random instances.
::: solution
(a) Take a path $s_0, s_1, \dots, s_N$ to the goal with $f(s_i) = i$ (strictly increasing, for example by costs and heuristic chosen so), and no other states. Iteration $k$ has bound $f(s_{k}) = k$ and expands $s_0, \dots, s_{k-1}$ (and cuts off at $s_k$), then raises the bound by one step. The total is $\sum_{k=1}^{N} k = \Theta(N^2)$, while A* expands each state once. With branching, the same happens contour by contour.

(b) Each move changes $g$ by $1$ and the Manhattan distance by exactly $\pm 1$ (one tile moves one square), so $f = g + h$ changes by $0$ or $2$ along every edge: all $f$-values along paths from $s_0$ have the same parity as $h(s_0)$. The bounds therefore go $h(s_0), h(s_0) + 2, \dots, C^* = d$: at most $(d - h(s_0))/2 + 1$ iterations, and each new iteration expands substantially more nodes than all earlier ones together, so the repeated work is a constant factor.

(c) The listing in the chapter, specialised as in [[#ex-8puzzle-heuristics]], does this; the program used for that example asserts that the IDA* cost equals the BFS distance on every instance, $120$ instances in total. On the instances at depth $26$ it expanded on average $5216$ nodes against A*'s $3803$, about $1.4$ times as many, while storing at most $26$ states on its path.
:::
:::

::: exercise Bidirectional search and its stopping rule {level=3}
Bidirectional uniform-cost search alternates expansions of a forward search from $s_0$ and a backward search from the goal $t$, with $g_F$ and $g_B$ the forward and backward path costs. Show by an example that stopping as soon as some state has been *expanded* by both searches can return a suboptimal path. Then prove that the following rule is correct: keep $\mu = $ the least $g_F(v) + c(v, w) + g_B(w)$ over all edges $(v, w)$ seen so far with $v$ reached forward and $w$ reached backward, and stop when $\mathrm{top}_F + \mathrm{top}_B \ge \mu$, where $\mathrm{top}_F$, $\mathrm{top}_B$ are the smallest $g$-values on the two frontiers.
::: solution
*Example.* Take edges $s_0 \to a$ ($3$), $a \to t$ ($3$), $s_0 \to x$ ($1$), $x \to y$ ($3$), $y \to t$ ($1$). The optimal path $s_0, x, y, t$ costs $5$; the path through $a$ costs $6$. Alternate expansions, forward first. Forward: $s_0$ ($g_F = 0$; reaches $a$ at $3$ and $x$ at $1$). Backward: $t$ ($g_B = 0$; reaches $a$ at $3$ and $y$ at $1$). Forward: $x$ ($1$; reaches $y$ at $4$). Backward: $y$ ($1$; reaches $x$ at $4$). Forward: $a$ ($3$). Backward: $a$ ($3$). Now $a$ has been expanded by both searches, and the naive rule returns $s_0, a, t$ with cost $6$ — although no state of the optimal path has been expanded by both. (The rule below has already found $\mu = g_F(x) + c(x, y) + g_B(y) = 1 + 3 + 1 = 5$ at the third expansion.)

*Correctness of the rule.* Update $\mu$ whenever either search examines an edge whose far end has been reached by the other search. Every candidate is the cost of a real path, so $\mu \ge C^*$ always. Suppose the rule fires with $\mathrm{top}_F + \mathrm{top}_B \ge \mu$, and suppose for a contradiction that an optimal path $P$ has cost $C^* < \mu$. For every state $u$ on $P$, $\delta(s_0, u) + \delta(u, t) = C^* < \mathrm{top}_F + \mathrm{top}_B$, so $\delta(s_0, u) < \mathrm{top}_F$ or $\delta(u, t) < \mathrm{top}_B$. As in Dijkstra's algorithm, every state with $\delta(s_0, u) < \mathrm{top}_F$ has been expanded forward with $g_F(u) = \delta(s_0, u)$, and similarly backward. Let $v$ be the last state on $P$ with $\delta(s_0, v) < \mathrm{top}_F$ ($v$ exists since $s_0$ qualifies). If $v = t$, the edge of $P$ into $t$ was examined when its tail was expanded forward, with $t$ already reached backward ($g_B(t) = 0$), so $\mu \le C^*$. Otherwise the next state $w$ on $P$ has $\delta(s_0, w) \ge \mathrm{top}_F$, hence $\delta(w, t) < \mathrm{top}_B$, so $w$ was expanded backward with $g_B(w) = \delta(w, t)$. Whichever of the two expansions of $v$ (forward) and $w$ (backward) came later examined the edge $(v, w)$ while the other end was already reached by the other search with its final value, so $\mu \le g_F(v) + c(v, w) + g_B(w) = C^*$. Either way $\mu \le C^*$, contradicting $C^* < \mu$. Hence $\mu = C^*$ when the rule fires.
:::
:::
