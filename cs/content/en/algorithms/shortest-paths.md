A route planner must find the quickest way from your door to a station across a road network with millions of junctions. A network router must forward each packet along the cheapest path to its destination. A currency trader looks for a sequence of exchanges that turns one pound into more than one pound. All three are **shortest-path problems** on a weighted graph: each edge has a **weight** — a length, a travel time, a cost, or (for the trader) the negative logarithm of an exchange rate — and we want a path whose total weight is as small as possible.

Breadth-first search solves the problem when every edge has weight one ([[algorithms/graph-search#thm-bfs]]). With general weights the fewest edges is no longer the shortest: a detour along three short roads may beat one long one. This chapter presents the main algorithms. **Dijkstra's algorithm** grows a set of vertices whose distances are known, always adding the nearest one; with a priority queue it runs in $O((n + m)\log n)$ time, but it is correct only for **non-negative** weights. The **Bellman–Ford algorithm** handles negative weights, and detects **negative cycles** (the trader's dream), in $O(nm)$ time. On a DAG one pass in topological order suffices. For distances between *all* pairs of vertices, the **Floyd–Warshall algorithm** uses dynamic programming in $\Theta(n^3)$ time. All of them rest on one operation, **relaxation**, and on one structural fact, that pieces of shortest paths are shortest paths.

## Shortest paths and their structure

Let $G = (V, E)$ be a directed graph with a weight function $w\colon E \to \mathbb R$. (An undirected graph is treated as a directed one with both $(u, v)$ and $(v, u)$, each of weight $w(u, v)$.)

::: definition Path weight and shortest-path weight {#def-delta}
The **weight** of a path $p = \langle v_0, v_1, \dots, v_k\rangle$ is $w(p) = \sum_{i=1}^k w(v_{i-1}, v_i)$. The **shortest-path weight** from $u$ to $v$ is
$$
\delta(u, v) = \begin{cases}\inf\{w(p) : p \text{ a path from } u \text{ to } v\} & \text{if there is such a path,}\\ \infty & \text{otherwise.}\end{cases}
$$
A **shortest path** from $u$ to $v$ is a path $p$ with $w(p) = \delta(u, v)$. Paths may repeat vertices; a path without repeated vertices is **simple**.
:::

In the **single-source** problem we are given a source $s$ and want $\delta(s, v)$ for every $v$, together with a shortest path to each.

**Negative cycles.** If some cycle $c$ reachable from $s$ has $w(c) < 0$, then going round it again and again makes paths to the vertices after it arbitrarily light: $\delta(s, v) = -\infty$ for every $v$ reachable from the cycle, and no shortest path exists. If there is no negative cycle reachable from $s$, every $\delta(s, v)$ is finite or $+\infty$ and is attained by a simple path: removing a cycle of non-negative weight from a path does not increase its weight. A simple path has at most $n - 1$ edges.

::: lemma Subpaths of shortest paths are shortest {#lem-subpath}
If $p = \langle v_0, \dots, v_k\rangle$ is a shortest path from $v_0$ to $v_k$, then for all $0 \le i \le j \le k$ the subpath $p_{ij} = \langle v_i, \dots, v_j\rangle$ is a shortest path from $v_i$ to $v_j$.
:::

::: proof
Write $p$ as $p_{0i}$, then $p_{ij}$, then $p_{jk}$, so $w(p) = w(p_{0i}) + w(p_{ij}) + w(p_{jk})$. If some path $q$ from $v_i$ to $v_j$ had $w(q) < w(p_{ij})$, then $p_{0i}$, $q$, $p_{jk}$ would be a path from $v_0$ to $v_k$ (paths may repeat vertices) of weight less than $w(p) = \delta(v_0, v_k)$, contradicting the definition of $\delta$.
:::

This is **optimal substructure**, the property that makes greedy algorithms and dynamic programming possible ([[algorithms/dynamic-programming]]). It gives the **triangle inequality**: for every edge $(u, v)$,
$$
\delta(s, v) \le \delta(s, u) + w(u, v),
$$ {#eq-triangle}
since a shortest path to $u$ followed by the edge is a path to $v$.

### Relaxation

All the single-source algorithms maintain for each vertex $v$ an estimate $v.d$, an upper bound on $\delta(s, v)$, and a predecessor $v.\pi$. They start with $s.d = 0$ and $v.d = \infty$ for $v \ne s$, and improve the estimates by relaxing edges.

::: definition Relaxation {#def-relax}
To **relax** the edge $(u, v)$ is to test whether going through $u$ improves the estimate for $v$, and if so to update it:
$$
\textbf{if } u.d + w(u, v) < v.d \textbf{ then } v.d \gets u.d + w(u, v),\; v.\pi \gets u.
$$
:::

::: lemma Properties of relaxation {#lem-relax}
Initialise as above and then relax edges in any order. Then:

1. *(Upper bound)* $v.d \ge \delta(s, v)$ for every $v$ at all times, and once $v.d = \delta(s, v)$ it never changes.
2. *(Convergence)* If $\langle s, \dots, u, v\rangle$ is a shortest path and $u.d = \delta(s, u)$ before $(u, v)$ is relaxed, then $v.d = \delta(s, v)$ afterwards.
3. *(Path relaxation)* If $p = \langle v_0 = s, v_1, \dots, v_k\rangle$ is a shortest path and its edges $(v_0, v_1), (v_1, v_2), \dots, (v_{k-1}, v_k)$ are relaxed in this order — with any other relaxations interleaved — then afterwards $v_k.d = \delta(s, v_k)$.
:::

::: proof
1. By induction on the number of relaxations: initially $s.d = 0 \ge \delta(s, s)$ (which is $0$, or $-\infty$ if $s$ is on a negative cycle) and the other estimates are $\infty$. A relaxation that changes $v.d$ sets it to $u.d + w(u, v) \ge \delta(s, u) + w(u, v) \ge \delta(s, v)$ by the hypothesis and [[#eq-triangle]]. Estimates never increase, so once equal to the lower bound $\delta(s, v)$ they stay equal.
2. After relaxing, $v.d \le u.d + w(u, v) = \delta(s, u) + w(u, v) = \delta(s, v)$, the last step by [[#lem-subpath]]. With part 1, $v.d = \delta(s, v)$.
3. By induction on $i$: $v_0.d = s.d = 0 = \delta(s, s)$ (there is no negative cycle on $s$, since a shortest path from $s$ exists), and if $v_{i-1}.d = \delta(s, v_{i-1})$ when $(v_{i-1}, v_i)$ is relaxed, then by part 2 $v_i.d = \delta(s, v_i)$ afterwards, and it stays so by part 1. The subpath to $v_i$ is shortest by [[#lem-subpath]].
:::

The algorithms differ only in *which edges they relax, and in what order*.

## The Bellman–Ford algorithm

The simplest strategy relaxes every edge, $n - 1$ times over.

::: algorithm Bellman–Ford {#alg-bellman-ford}
```text
BELLMAN-FORD(G, w, s)
1  initialise: s.d ← 0; v.d ← ∞ and v.π ← NIL for v ≠ s
2  for i ← 1 to n − 1
3      for each edge (u, v) in E
4          RELAX(u, v, w)
5  for each edge (u, v) in E
6      if u.d + w(u, v) < v.d
7          return FALSE              ▷ a negative cycle is reachable from s
8  return TRUE
```
:::

::: theorem Correctness of Bellman–Ford {#thm-bellman-ford}
If $G$ has no negative cycle reachable from $s$, Bellman–Ford returns TRUE and $v.d = \delta(s, v)$ for every vertex $v$. If $G$ has a negative cycle reachable from $s$, it returns FALSE. It runs in $\Theta(nm)$ time.
:::

::: proof
*No negative cycle.* Let $v$ be reachable from $s$. Then $\delta(s, v)$ is attained by a simple path $\langle s = v_0, \dots, v_k = v\rangle$ with $k \le n - 1$. Round $i$ of the loop relaxes all edges, in particular $(v_{i-1}, v_i)$; so the path's edges are relaxed in order, in rounds $1, \dots, k$, and by path relaxation ([[#lem-relax]]) $v.d = \delta(s, v)$ after round $k \le n - 1$. Unreachable vertices keep $v.d = \infty = \delta(s, v)$ (an estimate becomes finite only through a path from $s$). At the end, $v.d = \delta(s, v) \le \delta(s, u) + w(u, v) = u.d + w(u, v)$ for every edge by [[#eq-triangle]], so the test in line 6 never succeeds and the algorithm returns TRUE.

*A negative cycle.* Let $c = \langle v_0, v_1, \dots, v_k = v_0\rangle$ be reachable from $s$ with $\sum_{i=1}^k w(v_{i-1}, v_i) < 0$, and suppose for a contradiction that the algorithm returns TRUE, so $v_i.d \le v_{i-1}.d + w(v_{i-1}, v_i)$ for $i = 1, \dots, k$. All these estimates are finite (the cycle is reachable, and after $n - 1$ rounds every vertex reachable by a path of at most $n - 1$ edges has a finite estimate). Summing round the cycle, $\sum_i v_i.d \le \sum_i v_{i-1}.d + \sum_i w(v_{i-1}, v_i)$; the two sums of estimates are equal (each vertex of the cycle appears once in each), so $0 \le w(c) < 0$, a contradiction.

*Time.* $n - 1$ rounds of $m$ relaxations plus a final pass: $\Theta(nm)$.
:::

```python
from math import inf

def bellman_ford(vertices, edges, s, trace=False):
    """Return shortest-path weights from s, or None if a negative cycle is reachable."""
    dist = {v: inf for v in vertices}
    dist[s] = 0
    for i in range(len(vertices) - 1):          # n - 1 rounds
        for u, v, w in edges:
            if dist[u] + w < dist[v]:           # relax
                dist[v] = dist[u] + w
        if trace:
            print(i + 1, dist)
    for u, v, w in edges:                       # one more round: any change?
        if dist[u] + w < dist[v]:
            return None
    return dist

V = ['s', 't', 'x', 'y', 'z']
E = [('t', 'x', 5), ('t', 'y', 8), ('t', 'z', -4), ('x', 't', -2),
     ('y', 'x', -3), ('y', 'z', 9), ('z', 'x', 7), ('z', 's', 2),
     ('s', 't', 6), ('s', 'y', 7)]
print(bellman_ford(V, E, 's', trace=True))
print(bellman_ford(V, E + [('x', 'y', 1)], 's') is None)
```

```console
$ python3 bf.py
1 {'s': 0, 't': 6, 'x': inf, 'y': 7, 'z': inf}
2 {'s': 0, 't': 6, 'x': 4, 'y': 7, 'z': 2}
3 {'s': 0, 't': 2, 'x': 4, 'y': 7, 'z': 2}
4 {'s': 0, 't': 2, 'x': 4, 'y': 7, 'z': -2}
{'s': 0, 't': 2, 'x': 4, 'y': 7, 'z': -2}
True
```

::: example Tracing Bellman–Ford {#ex-bellman-ford}
Explain the four rounds printed above, and why adding the edge $(x, y)$ of weight $1$ creates a negative cycle.
::: solution
The edges are relaxed in the listed order, which starts with the edges out of $t$, $x$, $y$, $z$ and relaxes the edges out of $s$ last. *Round 1:* only the edges out of $s$ find a finite $u.d$, giving $t.d = 6$ and $y.d = 7$. *Round 2:* from $t$: $x \gets 6 + 5 = 11$, then $z \gets 6 - 4 = 2$; from $y$: $x \gets 7 - 3 = 4$. *Round 3:* from $x$: $t \gets 4 - 2 = 2$. *Round 4:* from $t$: $z \gets 2 - 4 = -2$. The shortest paths are $s \to y \to x \to t \to z$ with weights $7, 4, 2, -2$: the path to $z$ has four edges, which is why it took all $n - 1 = 4$ rounds (in this edge order). With the edge $x \to y$ of weight $1$, the cycle $y \to x \to y$ has weight $-3 + 1 = -2 < 0$; it is reachable from $s$, so the final check finds an edge that can still be relaxed and the function returns `None`.
:::
:::

Bellman–Ford's $\Theta(nm)$ is much slower than graph search, but it is general, simple, and easy to distribute: in **distance-vector routing** (RIP, an early Internet routing protocol), every router repeatedly relaxes the links to its neighbours using their advertised estimates, which is Bellman–Ford run in parallel.

::: quiz
Bellman–Ford returns FALSE on a graph. What can you conclude?

- [ ] Some edge has negative weight, and Dijkstra's algorithm must be used instead.
- [x] Some cycle of negative total weight is reachable from $s$, so some shortest-path weights from $s$ are $-\infty$.
- [ ] Every vertex has $\delta(s, v) = -\infty$.
- [ ] The graph has a cycle.
::: solution
By [[#thm-bellman-ford]], FALSE means exactly that a negative cycle is reachable from $s$. Then every vertex reachable *from the cycle* has $\delta(s, v) = -\infty$, but vertices not reachable from it keep finite distances, so not every $\delta$ is $-\infty$. Negative edges alone do not cause FALSE, and Dijkstra's algorithm would be wrong here, not a remedy. A graph with cycles of non-negative weight makes Bellman–Ford return TRUE.
:::
:::

### Shortest paths in a DAG

If $G$ is acyclic, there are no cycles at all, and one round suffices — provided the edges are relaxed in the right order. Topologically sort the vertices ([[algorithms/graph-search#thm-topo]]) and relax the edges out of each vertex in that order. Every path visits its vertices in topological order, so its edges are relaxed in order, and by path relaxation every estimate is correct after one pass: the algorithm runs in $\Theta(n + m)$ time, with arbitrary (even negative) weights. Negating the weights finds *longest* paths in a DAG — the **critical path** of a project whose tasks are vertices and whose edges are precedence constraints, which determines the shortest possible completion time. (In general graphs, longest simple paths are $\mathsf{NP}$-hard; see [[complexity]].)

```python
from math import inf

def dag_shortest_paths(order, adj, s):
    """order: a topological order; adj[u] = [(v, w), ...]; any weights."""
    dist = {u: inf for u in order}
    dist[s] = 0
    for u in order:                      # every path is relaxed in order
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    return dist

adj = {'r': [('s', 5), ('t', 3)], 's': [('t', 2), ('x', 6)],
       't': [('x', 7), ('y', 4), ('z', 2)], 'x': [('y', -1), ('z', 1)],
       'y': [('z', -2)], 'z': []}
print(dag_shortest_paths(['r', 's', 't', 'x', 'y', 'z'], adj, 's'))
```

```console
$ python3 dag.py
{'r': inf, 's': 0, 't': 2, 'x': 6, 'y': 5, 'z': 3}
```

::: example One pass over a DAG {#ex-dag}
Explain each distance printed by the listing, and why one pass suffices even though the weights $x \to y$ and $y \to z$ are negative.
::: solution
In topological order $r, s, t, x, y, z$: $r$ is not reachable from $s$ (there is no edge into $r$), so its estimate stays $\infty$ and relaxing its edges changes nothing. From $s$: $t \gets 2$, $x \gets 6$. From $t$: $x$: $2 + 7 = 9 > 6$, no change; $y \gets 6$; $z \gets 4$. From $x$: $y \gets 6 - 1 = 5$; $z$: $6 + 1 = 7 > 4$. From $y$: $z \gets 5 - 2 = 3$. So $\delta(s, z) = 3$ along $s \to x \to y \to z$. When a vertex's outgoing edges are relaxed, every edge *into* it has already been relaxed (its tail comes earlier in the order), so its estimate is final — negative weights do no harm, because there are no cycles to exploit.
:::
:::

::: widget graph
nodes: r@0,1; s@1,1; t@2,1; x@3,1; y@4,1; z@5,1
edges: r>s:5; r>t:3; s>t:2; s>x:6; t>x:7; t>y:4; t>z:2; x>y:-1; x>z:1; y>z:-2
algorithm: topo
caption: The DAG of the listing. Step through the topological sort to obtain the order in which the one-pass algorithm relaxes the vertices' outgoing edges ($r, s, t, x, y, z$ here, since all edges point right). Any topological order gives the same distances.
:::

## Dijkstra's algorithm

When all weights are non-negative we can do much better than Bellman–Ford, by relaxing the edges out of each vertex only once, at the right moment. Dijkstra's algorithm is BFS with a priority queue in place of the queue: it maintains a set $S$ of vertices whose distances are final and repeatedly moves into $S$ the vertex outside $S$ with the smallest estimate.

::: algorithm Dijkstra's algorithm {#alg-dijkstra}
```text
DIJKSTRA(G, w, s)                    ▷ requires w(u, v) ≥ 0 for every edge
1  initialise: s.d ← 0; v.d ← ∞ and v.π ← NIL for v ≠ s
2  S ← ∅
3  Q ← a min-priority queue of all vertices, keyed by d
4  while Q is not empty
5      u ← EXTRACT-MIN(Q)
6      S ← S ∪ {u}
7      for each v in Adj[u]
8          RELAX(u, v, w)            ▷ a DECREASE-KEY in Q if v.d changes
```
:::

::: theorem Correctness of Dijkstra's algorithm {#thm-dijkstra}
If $w(u, v) \ge 0$ for every edge, then Dijkstra's algorithm terminates with $u.d = \delta(s, u)$ for every vertex $u$; moreover $u.d = \delta(s, u)$ already at the moment $u$ is added to $S$.
:::

::: proof
It suffices to prove the second claim, since estimates never change once they equal $\delta$ ([[#lem-relax]]). Suppose not, and let $u$ be the first vertex added to $S$ with $u.d \ne \delta(s, u)$. Then $u \ne s$ (since $s$ is added first with $s.d = 0 = \delta(s, s)$, there being no negative cycles), so $S \ne \emptyset$ just before $u$ is added. There is a path from $s$ to $u$, for otherwise $u.d = \infty = \delta(s, u)$; let $p$ be a shortest path. It starts in $S$ and ends outside $S$, so let $y$ be the first vertex of $p$ not in $S$ and $x \in S$ its predecessor on $p$. Since $x$ was added to $S$ correctly ($u$ is the first exception), $x.d = \delta(s, x)$ when $x$ was added, and the edge $(x, y)$ was relaxed at that time; by convergence ([[#lem-relax]]), $y.d = \delta(s, y)$ from then on.

Now $y$ comes before $u$ on the shortest path $p$, and the remaining edges from $y$ to $u$ have **non-negative weights**, so $\delta(s, y) \le \delta(s, u)$. Hence
$$
y.d = \delta(s, y) \le \delta(s, u) \le u.d.
$$
But both $y$ and $u$ are outside $S$ when $u$ is chosen, and $u$ is chosen because it has the minimum estimate, so $u.d \le y.d$. All the inequalities are therefore equalities, and $u.d = \delta(s, u)$ — a contradiction.
:::

The only use of the non-negative weights is the step $\delta(s, y) \le \delta(s, u)$: the part of the path after $y$ cannot make it lighter. That one step is exactly what fails with negative weights.

```python
import heapq
from math import inf

def dijkstra(adj, s):
    """Shortest-path weights from s; adj[u] = [(v, w), ...] with w >= 0."""
    dist = {u: inf for u in adj}
    parent = {u: None for u in adj}
    dist[s] = 0
    heap = [(0, s)]                      # (tentative distance, vertex)
    done = set()
    while heap:
        d, u = heapq.heappop(heap)
        if u in done:                    # stale entry: u was already settled
            continue
        done.add(u)
        for v, w in adj[u]:
            if d + w < dist[v]:          # relax the edge (u, v)
                dist[v] = d + w
                parent[v] = u
                heapq.heappush(heap, (dist[v], v))
        print(u, d)
    return dist, parent

adj = {'s': [('t', 10), ('y', 5)], 't': [('x', 1), ('y', 2)],
       'x': [('z', 4)], 'y': [('t', 3), ('x', 9), ('z', 2)],
       'z': [('s', 7), ('x', 6)]}
dist, parent = dijkstra(adj, 's')
print(dist)
```

```console
$ python3 dijkstra.py
s 0
y 5
z 7
t 8
x 9
{'s': 0, 't': 8, 'x': 9, 'y': 5, 'z': 7}
```

Python's `heapq` has no decrease-key operation, so this version pushes a new entry whenever an estimate improves and skips **stale** entries when they are popped — a standard technique called *lazy deletion*.

::: theorem Running time of Dijkstra's algorithm {#thm-dijkstra-time}
With a binary heap, Dijkstra's algorithm runs in $O((n + m)\log n)$ time. With a Fibonacci heap (amortised $O(1)$ decrease-key) it runs in $O(m + n\log n)$.
:::

::: proof
Each vertex is extracted (settled) once and each edge is relaxed once, when its tail is settled. With a binary heap keyed by $d$ ([[data-structures/heaps]]), each of the $n$ extract-min operations and each of the at most $m$ decrease-keys costs $O(\log n)$. With lazy deletion instead, at most $m + 1$ entries are ever pushed, so the heap never holds more than $m + 1 \le n^2$ entries and each push or pop costs $O(\log m) = O(\log n)$; there are at most $m + 1$ pops. Either way the total is $O((n + m)\log n)$. A Fibonacci heap supports insert and decrease-key in $O(1)$ amortised time and extract-min in $O(\log n)$ amortised time, giving $O(m + n\log n)$.
:::

::: example Tracing Dijkstra's algorithm {#ex-dijkstra}
Trace the listing on its graph, giving $S$ and the estimates after each extraction.
::: solution
| extracted | $d$ | estimates afterwards ($t, x, y, z$) | reason |
|---|---|---|---|
| $s$ | 0 | $10, \infty, 5, \infty$ | relax $s\to t$ (10), $s \to y$ (5) |
| $y$ | 5 | $8, 14, 5, 7$ | $y\to t$: $5 + 3 = 8 < 10$; $y \to x$: $14$; $y \to z$: $7$ |
| $z$ | 7 | $8, 13, 5, 7$ | $z \to x$: $7 + 6 = 13 < 14$; $z \to s$: no change |
| $t$ | 8 | $8, 9, 5, 7$ | $t \to x$: $8 + 1 = 9 < 13$; $t \to y$: no change |
| $x$ | 9 | $8, 9, 5, 7$ | $x \to z$: no change |

The vertices are settled in increasing order of distance, $0, 5, 7, 8, 9$ — the property that makes the algorithm work. The shortest-path tree, from the parents, is $s \to y \to t \to x$ and $y \to z$.
:::
:::

::: widget graph
nodes: s@0,1; t@1.5,2; x@3,2; y@1.5,0; z@3,0
edges: s>t:10; s>y:5; t>x:1; t>y:2; y>t:3; y>x:9; y>z:2; x>z:4; z>s:7; z>x:6
algorithm: dijkstra
start: s
caption: Dijkstra's algorithm on the graph of the listing. Step through it: at each step the unsettled vertex with the smallest tentative distance is settled and its outgoing edges are relaxed. Check that the settled distances never decrease ($0, 5, 7, 8, 9$), and that the final tree matches the table in the example. Try changing a weight — for instance $y \to t$ from $3$ to $6$ — and predict the new tree before stepping.
:::

::: warning Dijkstra's algorithm needs non-negative weights
With a single negative edge, Dijkstra's algorithm can return wrong distances, without any warning. On the graph $s \to a$ (weight $1$), $a \to c$ ($1$), $s \to b$ ($3$), $b \to a$ ($-3$), it settles $a$ with distance $1$ and $c$ with distance $2$ before it settles $b$; the true distances are $\delta(s, a) = 0$ and $\delta(s, c) = 1$ via $s \to b \to a \to c$. Running the listing's `dijkstra` on it prints `{'s': 0, 'a': 0, 'b': 3, 'c': 2}`: the late relaxation of $b \to a$ even corrects $a$, but $c$, settled earlier on the strength of $a$'s old estimate, stays wrong. Adding a constant to every weight to make them non-negative does not fix this either: it penalises paths with many edges, changing which path is shortest. Use Bellman–Ford, or Johnson's reweighting (below), which changes the weights in a way that preserves shortest paths.
:::

::: quiz
Dijkstra's algorithm is run on an undirected graph with positive weights. Which statement is true when vertex $u$ is extracted from the priority queue?

- [x] Every vertex $v$ with $\delta(s, v) < \delta(s, u)$ has already been extracted.
- [ ] Every neighbour of $u$ has already been extracted.
- [ ] $u.\pi$ was the vertex extracted just before $u$.
- [ ] No estimate of an unextracted vertex will change any more.
::: solution
Vertices are extracted in non-decreasing order of $\delta$: by [[#thm-dijkstra]], each is extracted with $u.d = \delta(s, u)$, and a vertex $v$ with a smaller $\delta(s, v)$ that was still in the queue would have $v.d$ correct once its predecessor on a shortest path is settled — by induction on $\delta$, all such $v$ are extracted earlier. The other statements fail: neighbours may be farther away; the parent can have been extracted much earlier (in the example, $y$ is the parent of $z$ but $z$ is extracted right after $y$, while $t$'s parent $y$ was extracted two steps before $t$); and extracting $u$ relaxes its edges, which may change estimates.
:::
:::

## All-pairs shortest paths

To compute $\delta(u, v)$ for every pair, we could run a single-source algorithm from each vertex: $n$ runs of Dijkstra cost $O(n(n + m)\log n)$, and $n$ runs of Bellman–Ford $O(n^2m)$, which is $O(n^4)$ for dense graphs. The **Floyd–Warshall algorithm** does better for dense graphs, with negative weights allowed, by dynamic programming on the set of vertices that paths may pass through.

Number the vertices $1, \dots, n$. For $0 \le k \le n$, let $d^{(k)}_{ij}$ be the smallest weight of a path from $i$ to $j$ all of whose **intermediate** vertices (those other than the end points) lie in $\{1, \dots, k\}$. Then $d^{(0)}_{ij}$ is $w(i, j)$ if there is an edge, $0$ if $i = j$, and $\infty$ otherwise, and $d^{(n)}_{ij} = \delta(i, j)$.

::: lemma The Floyd–Warshall recurrence {#lem-fw}
If $G$ has no negative cycle, then for $k \ge 1$
$$
d^{(k)}_{ij} = \min\big(d^{(k-1)}_{ij},\; d^{(k-1)}_{ik} + d^{(k-1)}_{kj}\big).
$$ {#eq-fw}
:::

::: proof
Consider a lightest path $p$ from $i$ to $j$ with intermediate vertices in $\{1, \dots, k\}$, chosen simple (possible without negative cycles). If $k$ is not an intermediate vertex of $p$, its intermediates lie in $\{1, \dots, k-1\}$ and $w(p) = d^{(k-1)}_{ij}$. If $k$ is intermediate, it occurs once, splitting $p$ into a path from $i$ to $k$ and a path from $k$ to $j$, each with intermediates in $\{1, \dots, k - 1\}$ and each lightest such by the subpath argument of [[#lem-subpath]]: $w(p) = d^{(k-1)}_{ik} + d^{(k-1)}_{kj}$. So $d^{(k)}_{ij}$ is one of the two values in [[#eq-fw]]; and it is at most each of them, since each is the weight of a walk from $i$ to $j$ with intermediates in $\{1, \dots, k\}$ (a walk through $k$ with repeated vertices contains a simple path no heavier, as cycles are non-negative).
:::

::: algorithm Floyd–Warshall {#alg-floyd-warshall}
Start with the matrix $D = (d^{(0)}_{ij})$. For $k = 1, \dots, n$, for every $i$ and $j$, set $D[i][j] \gets \min(D[i][j], D[i][k] + D[k][j])$. Return $D$.
:::

Updating $D$ in place is safe: during round $k$ the entries $D[i][k]$ and $D[k][j]$ do not change, since $d^{(k)}_{ik} = d^{(k-1)}_{ik}$ (a path to $k$ gains nothing by having $k$ as an intermediate, as cycles are non-negative). So the algorithm computes all $\delta(i, j)$ in $\Theta(n^3)$ time and $\Theta(n^2)$ space. If $G$ has a negative cycle, some diagonal entry ends negative, which is the standard test.

```python
from math import inf

def floyd_warshall(n, edges):
    """All-pairs shortest-path weights for vertices 0..n-1."""
    D = [[0 if i == j else inf for j in range(n)] for i in range(n)]
    for u, v, w in edges:
        D[u][v] = min(D[u][v], w)
    for k in range(n):                  # allow k as an intermediate vertex
        for i in range(n):
            for j in range(n):
                if D[i][k] + D[k][j] < D[i][j]:
                    D[i][j] = D[i][k] + D[k][j]
    return D

edges = [(0, 1, 3), (0, 2, 8), (0, 4, -4), (1, 3, 1), (1, 4, 7),
         (2, 1, 4), (3, 0, 2), (3, 2, -5), (4, 3, 6)]
for row in floyd_warshall(5, edges):
    print(row)
```

```console
$ python3 fw.py
[0, 1, -3, 2, -4]
[3, 0, -4, 1, -1]
[7, 4, 0, 5, 3]
[2, -1, -5, 0, -2]
[8, 5, 1, 6, 0]
```

::: example Reading the matrix {#ex-fw}
From the output, what is the shortest path from $0$ to $2$, and how could the algorithm also report the path, not just its weight?
::: solution
$D[0][2] = -3$. A path achieving it: $0 \to 4$ ($-4$), $4 \to 3$ ($6$), $3 \to 2$ ($-5$), total $-3$; compare the direct edge of weight $8$. To recover paths, keep a matrix $\mathit{next}[i][j]$, the vertex after $i$ on the best known path to $j$: initially $\mathit{next}[i][j] = j$ for each edge, and whenever $D[i][j]$ improves through $k$, set $\mathit{next}[i][j] \gets \mathit{next}[i][k]$. Then follow $i, \mathit{next}[i][j], \mathit{next}[\mathit{next}[i][j]][j], \dots$ until $j$. Here $\mathit{next}[0][2] = 4$, $\mathit{next}[4][2] = 3$, $\mathit{next}[3][2] = 2$.
:::
:::

For sparse graphs with negative weights (but no negative cycles), **Johnson's algorithm** is faster. Add a new vertex $q$ with zero-weight edges to every vertex, run Bellman–Ford from $q$ to get $h(v) = \delta(q, v)$, and reweight each edge by
$$
\hat w(u, v) = w(u, v) + h(u) - h(v) \ge 0,
$$
non-negative by the triangle inequality $h(v) \le h(u) + w(u, v)$. Every path $p$ from $a$ to $b$ has $\hat w(p) = w(p) + h(a) - h(b)$ — the $h$ terms telescope — so the reweighting changes all paths between the same end points by the same amount and preserves which are shortest. Then $n$ runs of Dijkstra give all pairs in $O(nm\log n)$ time.

::: history
Shortest paths became a research topic in the 1950s, driven by telephone routing and operations research. Lester Ford Jr. described the relaxation method in a 1956 RAND report, Richard Bellman gave the dynamic-programming formulation in "On a routing problem" (1958), and Edward F. Moore published an equivalent method in 1959; the algorithm is named after Bellman and Ford. Edsger Dijkstra designed his algorithm in 1956 — in about twenty minutes, he later said, sitting at a café in Amsterdam — to demonstrate the ARMAC computer, and published it in "A note on two problems in connexion with graphs" (*Numerische Mathematik*, 1959), together with an algorithm for minimum spanning trees. Robert Floyd's all-pairs algorithm ("Algorithm 97: Shortest path", 1962) built on Stephen Warshall's transitive-closure algorithm of the same year (and Bernard Roy's of 1959). Donald Johnson's reweighting appeared in 1977, and Michael Fredman and Robert Tarjan's Fibonacci heaps (1984, journal version 1987) gave Dijkstra's algorithm its $O(m + n\log n)$ bound.
:::

## In practice

Road-network route planners do not run plain Dijkstra on a continental graph for every query. As of 2026 they rely on preprocessing techniques — A* search with landmark-based lower bounds, *contraction hierarchies* and related methods — that answer queries thousands of times faster, after hours of preprocessing; all of them are proved correct by the same relaxation arguments, and all assume non-negative weights. Internet routing uses both families: distance-vector protocols are distributed Bellman–Ford, and link-state protocols such as OSPF have every router run Dijkstra on a map of the network.

## Where this leads

Dijkstra's algorithm is a **greedy** algorithm — it commits to the nearest vertex and never reconsiders — and its proof is an instance of the exchange arguments of [[algorithms/greedy-algorithms]], where Prim's minimum-spanning-tree algorithm has almost the same code. Bellman–Ford and Floyd–Warshall are **dynamic programming**, the subject of [[algorithms/dynamic-programming]]; their subproblems are "shortest paths with at most $i$ edges" and "shortest paths through the first $k$ vertices". Shortest augmenting paths reappear in [[algorithms/network-flow]], and heuristic search (A*) in [[artificial-intelligence]].

::: summary
- $\delta(s, v)$ is the least weight of a path from $s$ to $v$; it is $-\infty$ if a negative cycle is reachable on the way. Subpaths of shortest paths are shortest ([[#lem-subpath]]).
- All single-source algorithms **relax** edges; estimates are upper bounds, and relaxing the edges of a shortest path in order makes the estimate exact ([[#lem-relax]]).
- **Bellman–Ford** relaxes every edge $n - 1$ times, handles negative weights, and detects reachable negative cycles, in $\Theta(nm)$ ([[#thm-bellman-ford]]). On a DAG, one pass in topological order suffices: $\Theta(n + m)$.
- **Dijkstra** settles vertices in order of distance; it is correct only for **non-negative weights** ([[#thm-dijkstra]]) and runs in $O((n + m)\log n)$ with a binary heap ([[#thm-dijkstra-time]]).
- **Floyd–Warshall** computes all pairs in $\Theta(n^3)$ from $d^{(k)}_{ij} = \min(d^{(k-1)}_{ij}, d^{(k-1)}_{ik} + d^{(k-1)}_{kj})$ ([[#lem-fw]]); **Johnson** reweights with potentials to run Dijkstra from every vertex.
:::

## Exercises

::: exercise A shortest path by hand {level=1 check="7"}
Run Dijkstra's algorithm from $A$ on the undirected graph with edges $A$–$B$ ($4$), $A$–$C$ ($1$), $C$–$B$ ($2$), $B$–$D$ ($1$), $C$–$D$ ($5$), $D$–$E$ ($3$). In which order are the vertices settled, and what is $\delta(A, E)$? (Enter $\delta(A, E)$.)
::: solution
Settle $A$ ($0$): $B = 4$, $C = 1$. Settle $C$ ($1$): $B = \min(4, 1 + 2) = 3$, $D = 6$. Settle $B$ ($3$): $D = \min(6, 3 + 1) = 4$. Settle $D$ ($4$): $E = 7$. Settle $E$ ($7$). Order $A, C, B, D, E$; $\delta(A, E) = 7$ along $A, C, B, D, E$.
:::
:::

::: exercise How many rounds? {level=1 check="1"}
Bellman–Ford is run on the path graph $s \to v_1 \to v_2 \to \dots \to v_{9}$ (positive weights), with the edges listed in the order $(s, v_1), (v_1, v_2), \dots, (v_8, v_9)$. After how many rounds are all estimates correct? (Enter the number of rounds.)
::: solution
In round 1 the edges are relaxed in path order, so each $v_i.d$ becomes correct immediately after $v_{i-1}.d$: one round suffices, by path relaxation. If the edges were listed in the *reverse* order, each round would fix only one more vertex and all $9$ rounds would be needed. Bellman–Ford's $n - 1$ rounds cover the worst order; a common optimisation stops as soon as a round changes nothing.
:::
:::

::: exercise The trader's cycle {level=2}
The exchange rates are: 1 GBP buys 1.20 EUR, 1 EUR buys 1.10 USD, and 1 USD buys 0.78 GBP. Show how to detect such an arbitrage opportunity with a shortest-path algorithm, and decide whether this one is profitable.
::: solution
An exchange sequence multiplies the rates $r_1 r_2 \cdots r_k$; it is profitable round a cycle if the product exceeds $1$, i.e. if $\sum\log r_i > 0$, i.e. if $\sum(-\log r_i) < 0$. So give each edge the weight $-\log r$ and look for a negative cycle with Bellman–Ford. Here $1.20 \times 1.10 \times 0.78 = 1.0296 > 1$: one pound becomes about $1.03$ pounds, and the cycle has weight $-\ln 1.0296 \approx -0.029 < 0$. (Real markets close such gaps quickly, and transaction costs usually exceed them.)
:::
:::

::: exercise Floyd–Warshall by hand {level=2 check="5"}
For the graph with vertices $1, 2, 3$ and edges $1 \to 2$ ($8$), $1 \to 3$ ($3$), $3 \to 2$ ($2$), $2 \to 1$ ($4$), compute $D^{(1)}, D^{(2)}, D^{(3)}$ and give $\delta(1, 2)$. (Enter $\delta(1, 2)$.)
::: solution
$D^{(0)}$ has rows $(0, 8, 3)$, $(4, 0, \infty)$, $(\infty, 2, 0)$. $k = 1$: $D[2][3] = \min(\infty, 4 + 3) = 7$; others unchanged: rows $(0, 8, 3)$, $(4, 0, 7)$, $(\infty, 2, 0)$. $k = 2$: $D[3][1] = \min(\infty, 2 + 4) = 6$; $D[1][3]$: $8 + 7 > 3$, unchanged: rows $(0, 8, 3)$, $(4, 0, 7)$, $(6, 2, 0)$. $k = 3$: $D[1][2] = \min(8, 3 + 2) = 5$; $D[2][1]$: $7 + 6 > 4$: rows $(0, 5, 3)$, $(4, 0, 7)$, $(6, 2, 0)$. So $\delta(1, 2) = 5$, via $3$.
:::
:::

::: exercise Counting with lazy deletion {level=2}
In the listing's `dijkstra`, how many entries are pushed onto the heap for the example graph, and how many popped entries are stale? Explain why the number of pushes is at most $m + 1$ in general.
::: solution
Pushes: the initial $(0, s)$, then one per successful relaxation: $s\to t$, $s \to y$; $y \to t$, $y \to x$, $y \to z$; $z \to x$; $t \to x$ — that is $1 + 7 = 8$ pushes. Pops: $8$, of which $5$ settle a vertex and $3$ are stale: $(10, t)$, $(14, x)$ and $(13, x)$. In general each edge $(u, v)$ is relaxed only once — when $u$ is settled — so it can cause at most one push; with the initial entry, at most $m + 1$ pushes.
:::
:::

::: exercise Most reliable path {level=2}
Each link of a network fails independently, link $(u, v)$ working with probability $r(u, v) \in (0, 1]$. Show how to find the path from $s$ to $t$ most likely to work using Dijkstra's algorithm, and why its correctness condition holds.
::: solution
A path works with probability $\prod r(u, v)$, which is maximised when $\sum(-\log r(u, v))$ is minimised. Since $0 < r \le 1$, each weight $-\log r(u, v) \ge 0$, so Dijkstra's condition holds, and its shortest path is the most reliable path. (Equivalently, run Dijkstra directly with products and "largest first"; the proof of [[#thm-dijkstra]] goes through because multiplying by a number $\le 1$ never increases the probability — the analogue of non-negative weights.)
:::
:::

::: exercise Dijkstra with negative edges out of the source {level=3}
Suppose the only negative-weight edges leave the source $s$, and there are no edges into $s$. Prove that Dijkstra's algorithm still computes correct distances.
::: solution
Let $c = \min$ of the weights on edges out of $s$, possibly negative, and consider the proof of [[#thm-dijkstra]]. Every path from $s$ to $v \ne s$ is $s$, then an edge $(s, x)$, then a path from $x$ using only non-negative edges (no edge returns to $s$). Suppose $u$ is the first vertex settled with the wrong estimate; choose $x, y$ as in the proof, with $y$ the first vertex of a shortest path $p$ to $u$ not in $S$. Since $s \in S$ is settled first, $y \ne s$, and the part of $p$ after $y$ uses only edges not leaving $s$ — all non-negative. So $\delta(s, y) \le \delta(s, u)$ still holds and the rest of the proof is unchanged. (Equivalently, add $-c$ to every edge out of $s$: every path from $s$ uses exactly one such edge, so all path weights change by the same amount and shortest paths are preserved.)
:::
:::

::: exercise Shortest paths with at most k edges {level=3}
Let $d_i(v)$ be the least weight of a path from $s$ to $v$ with at most $i$ edges. Prove that after $i$ rounds of a variant of Bellman–Ford that uses the previous round's estimates in each round ($d_i(v) = \min(d_{i-1}(v), \min_{(u,v)\in E} d_{i-1}(u) + w(u, v))$), the estimates are exactly $d_i(v)$, and explain why the in-place version of [[#alg-bellman-ford]] may be *ahead* of $d_i$.
::: solution
By induction on $i$. $d_0(s) = 0$ and $d_0(v) = \infty$ otherwise, matching the initialisation. A path to $v$ with at most $i$ edges either has at most $i - 1$ edges (weight $\ge d_{i-1}(v)$, with equality possible), or exactly $i \ge 1$ edges, ending with an edge $(u, v)$ after a path to $u$ with $i - 1$ edges (weight $\ge d_{i-1}(u) + w(u, v)$, equality possible). So $d_i(v)$ is the minimum of these, which is the recurrence; the round computes exactly that from the previous round's values. In the in-place version, an estimate updated earlier in the same round is used immediately, so a single round can propagate along several edges (as in the path example of the second exercise): after round $i$ the estimates are at most $d_i(v)$, and still at least $\delta(s, v)$. This makes the in-place version no slower, but the "exactly $i$ edges" interpretation — needed, for example, for cheapest flights with at most $k$ stops — requires the two-array version.
:::
:::
