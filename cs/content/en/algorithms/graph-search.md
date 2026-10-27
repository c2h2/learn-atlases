A maze, a social network, the web, the dependencies between the modules of a program, the moves of a puzzle: each is a set of things connected in pairs, a **graph**. Many questions about them are questions of *reachability*. Can I get out of the maze from here, and what is the shortest way? How many handshakes separate two people? In what order can the modules be compiled so that each comes after everything it depends on — and is there any such order, or is there a cycle of dependencies? Which web pages can all reach each other? Can the guests at a party be split into two tables so that no two enemies sit together?

All of these are answered by **graph search**: a systematic way of visiting every vertex reachable from a start, following edges, without visiting any vertex twice. There are two fundamental orders of exploration. **Breadth-first search** (BFS) explores in rings of increasing distance, like ripples on a pond, and finds shortest paths when every edge has length one. **Depth-first search** (DFS) plunges as deep as it can and backtracks only when stuck, like a person exploring a maze with a ball of string; the times at which it enters and leaves vertices reveal the structure of the graph — cycles, topological orders, strongly connected components. Both run in **linear time**, $O(n + m)$ for a graph with $n$ vertices and $m$ edges, which is as fast as one can hope: just reading the graph takes that long.

We use the notation $G = (V, E)$, $n = \lvert V\rvert$, $m = \lvert E\rvert$, and represent graphs by **adjacency lists**: for each vertex $u$, a list $\mathrm{Adj}[u]$ of the vertices $v$ with an edge $(u, v)$. The total length of the lists is $m$ for a directed graph and $2m$ for an undirected one, so the representation takes $\Theta(n + m)$ space ([[data-structures/graph-representations]] compares it with adjacency matrices). In Python a dictionary mapping each vertex to a list does the job. The mathematics of graphs — paths, cycles, trees, connectivity — is in [Maths Atlas: graphs](/learn/maths/lesson.php?c=discrete&l=graphs).

## Breadth-first search

::: algorithm Breadth-first search {#alg-bfs}
```text
BFS(G, s)
1  for each vertex u: u.d ← ∞, u.π ← NIL
2  s.d ← 0
3  Q ← a queue containing only s
4  while Q is not empty
5      u ← DEQUEUE(Q)
6      for each v in Adj[u]
7          if v.d = ∞                    ▷ v discovered for the first time
8              v.d ← u.d + 1
9              v.π ← u
10             ENQUEUE(Q, v)
```
:::

Each vertex reached is **discovered** once (when its distance becomes finite) and enters the queue once; the edge $(v.\pi, v)$ by which it was discovered is a **tree edge**, and the tree edges form the **breadth-first tree** rooted at $s$. Following the parent pointers $\pi$ from $v$ back to $s$ gives a path.

```python
from collections import deque

def bfs(adj, s):
    """Distances (in edges) and BFS-tree parents from s."""
    dist, parent = {s: 0}, {s: None}
    queue = deque([s])
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if v not in dist:            # v is discovered for the first time
                dist[v] = dist[u] + 1
                parent[v] = u
                queue.append(v)
    return dist, parent

adj = {'s': ['a', 'b'], 'a': ['s', 'c'], 'b': ['s', 'c', 'd'],
       'c': ['a', 'b', 'e'], 'd': ['b', 'e'], 'e': ['c', 'd', 'f'], 'f': ['e']}
dist, parent = bfs(adj, 's')
print(dist)
path, v = [], 'f'
while v is not None:                     # follow parents back to s
    path.append(v); v = parent[v]
print(path[::-1])
```

```console
$ python3 bfs.py
{'s': 0, 'a': 1, 'b': 1, 'c': 2, 'd': 2, 'e': 3, 'f': 4}
['s', 'a', 'c', 'e', 'f']
```

::: widget graph
nodes: s@0,1; a@1,2; b@1,0; c@2,1.5; d@2,0; e@3,1; f@4,1
edges: s-a; s-b; a-c; b-c; b-d; c-e; d-e; e-f
algorithm: bfs
start: s
caption: Breadth-first search from $s$ on the graph of the listing. Step through it and watch the queue: every vertex at distance $1$ ($a$, $b$) leaves the queue before any vertex at distance $2$ ($c$, $d$), and so on. The highlighted tree edges form the breadth-first tree; the path in it from $s$ to $f$ has $4$ edges, the distance. Drag the vertices to untangle the picture; try starting from another vertex.
:::

### Correctness

Write $\delta(s, v)$ for the **distance** from $s$ to $v$: the smallest number of edges on a path from $s$ to $v$, or $\infty$ if there is none. The goal is to show that BFS sets $v.d = \delta(s, v)$ for every $v$. Two facts about the queue are the heart of the proof.

::: lemma The queue holds at most two consecutive distances {#lem-bfs-queue}
At every moment during BFS, if the queue holds $v_1, v_2, \dots, v_r$ from head to tail, then $v_1.d \le v_2.d \le \dots \le v_r.d \le v_1.d + 1$.
:::

::: proof
By induction on queue operations. Initially the queue is $\langle s\rangle$. A dequeue removes $v_1$; the remaining sequence still satisfies the inequalities, since $v_r.d \le v_1.d + 1 \le v_2.d + 1$. An enqueue of $v$ happens while scanning $\mathrm{Adj}[u]$ for the vertex $u$ just dequeued, and sets $v.d = u.d + 1$. Before $u$ was removed it was the head, so by the hypothesis every vertex in the queue has $d \le u.d + 1 = v.d$, and the new head $v_1$ (if any) has $v_1.d \ge u.d$, so $v.d = u.d + 1 \le v_1.d + 1$. Both inequalities hold after the enqueue.

In particular the head of the queue always has the smallest $d$ in the queue, and every vertex enqueued later has $d$ at least that of the current head; so vertices are *dequeued* in non-decreasing order of $d$.
:::

::: theorem BFS computes distances {#thm-bfs}
Let BFS run from $s$ on a directed or undirected graph. Then it terminates; every vertex $v$ reachable from $s$ is discovered, with $v.d = \delta(s, v)$; and for $v \ne s$ reachable, a shortest path from $s$ to $v$ is a shortest path from $s$ to $v.\pi$ followed by the edge $(v.\pi, v)$. Unreachable vertices keep $v.d = \infty$. The running time is $O(n + m)$.
:::

::: proof
*Upper bound.* If $v.d$ is finite then there is a path of $v.d$ edges from $s$ to $v$ (the tree path, by induction on the order of discovery), so $v.d \ge \delta(s, v)$; unreachable vertices are never discovered.

*Equality.* Suppose, for a contradiction, that some vertex receives the wrong value, and among such vertices let $v$ be one with the smallest $\delta(s, v)$. Then $v \ne s$, and $\delta(s, v) < \infty$ (by the upper-bound argument, vertices at infinite distance are correct). Let $u$ be the vertex before $v$ on a shortest path from $s$ to $v$, so $\delta(s, u) = \delta(s, v) - 1$ and, by the choice of $v$, $u.d = \delta(s, u)$. So $v.d > \delta(s, v) = u.d + 1$. Consider the moment when $u$ is dequeued (it is reachable and correct, so it was discovered and enqueued). Then $v$ is white, grey or black:

- if $v$ was not yet discovered ($v.d = \infty$ at that moment), the scan of $\mathrm{Adj}[u]$ sets $v.d = u.d + 1$, a contradiction;
- if $v$ had already been dequeued, it left the queue before $u$, so $v.d \le u.d$ by [[#lem-bfs-queue]] (distances leave the queue in non-decreasing order), a contradiction;
- if $v$ was in the queue, it was enqueued while some $w$ was being scanned, with $v.d = w.d + 1$, and $w$ was dequeued before $u$, so $w.d \le u.d$ and $v.d \le u.d + 1$, a contradiction.

So every vertex is correct. The statement about $v.\pi$ follows because $v.d = v.\pi.d + 1$.

*Time.* Each vertex is enqueued at most once (only when $v.d$ changes from $\infty$), so it is dequeued at most once and its adjacency list scanned at most once. Initialisation is $O(n)$ and the scans total $O(m)$.
:::

::: example Tracing BFS {#ex-bfs}
Give the queue after each dequeue of [[#alg-bfs]] on the graph of the listing, from $s$.
::: solution
| dequeued $u$ | newly discovered (with $d$) | queue afterwards |
|---|---|---|
| — | $s$ (0) | $s$ |
| $s$ | $a$ (1), $b$ (1) | $a, b$ |
| $a$ | $c$ (2) | $b, c$ |
| $b$ | $d$ (2) | $c, d$ |
| $c$ | $e$ (3) | $d, e$ |
| $d$ | — ($e$ already discovered) | $e$ |
| $e$ | $f$ (4) | $f$ |
| $f$ | — | empty |

The distances match the output. When $b$ is scanned, $c$ is already discovered (by $a$), so the tree edge into $c$ is $(a, c)$, not $(b, c)$; this is why the path printed goes through $a$. Both $s, a, c, e, f$ and $s, b, d, e, f$ are shortest paths; BFS returns one of them, decided by the order of the adjacency lists.
:::
:::

BFS is the algorithm for unweighted shortest paths, for finding the connected components of an undirected graph (run it from each undiscovered vertex), for crawling the web in rings around a seed page, and for solving puzzles in the fewest moves. If edges have *lengths*, BFS no longer finds shortest paths; that is the subject of [[algorithms/shortest-paths]], whose Dijkstra's algorithm generalises BFS by replacing the queue with a priority queue.

::: quiz
BFS from $s$ is run on an undirected graph, and the edge $\{u, v\}$ has $u.d = 3$. Which values of $v.d$ are possible?

- [ ] Any value $\ge 3$
- [x] $2$, $3$ or $4$
- [ ] Only $4$
- [ ] Only $2$ or $4$
::: solution
In an undirected graph, $\delta(s, v) \le \delta(s, u) + 1$ and $\delta(s, u) \le \delta(s, v) + 1$, because the edge extends a shortest path to either end. So $v.d \in \{2, 3, 4\}$. Edges between vertices at equal distance ($v.d = 3$) are exactly what makes a graph non-bipartite in [[#thm-bipartite]]. In a *directed* graph an edge $(u, v)$ can also go back to any smaller distance, since it does not give a path from $v$ to $u$.
:::
:::

## Depth-first search

DFS uses a stack instead of a queue — most naturally the call stack of a recursive procedure. It records two **timestamps** for each vertex: $u.d$, the time when $u$ is discovered, and $u.f$, the time when it is **finished**, that is, when all its neighbours have been explored. Vertices are **white** before discovery, **grey** between discovery and finishing, and **black** afterwards.

::: algorithm Depth-first search {#alg-dfs}
```text
DFS(G)
1  for each vertex u: u.colour ← WHITE, u.π ← NIL
2  time ← 0
3  for each vertex u
4      if u.colour = WHITE
5          DFS-VISIT(G, u)

DFS-VISIT(G, u)
1  time ← time + 1;  u.d ← time;  u.colour ← GREY
2  for each v in Adj[u]
3      if v.colour = WHITE
4          v.π ← u
5          DFS-VISIT(G, v)
6  time ← time + 1;  u.f ← time;  u.colour ← BLACK
```
:::

The outer loop restarts the search from every vertex not yet reached, so DFS visits the whole graph, producing a **depth-first forest** of tree edges $(u.\pi, u)$. It runs in $\Theta(n + m)$ time: `DFS-VISIT` is called exactly once per vertex (only on white vertices, which it turns grey) and scans each adjacency list once. In Python:

```python
def dfs(adj):
    """Discovery and finish times of a depth-first search of every vertex."""
    time, d, f = 0, {}, {}
    def visit(u):
        nonlocal time
        time += 1; d[u] = time           # u turns grey
        for v in adj[u]:
            if v not in d:               # v is white: tree edge (u, v)
                visit(v)
        time += 1; f[u] = time           # u turns black
    for u in adj:
        if u not in d:
            visit(u)
    return d, f

def topological_order(adj):
    d, f = dfs(adj)
    return sorted(adj, key=lambda u: -f[u])   # decreasing finish time

dag = {'shorts': ['trousers', 'shoes'], 'trousers': ['belt', 'shoes'],
       'belt': ['jacket'], 'shirt': ['belt', 'tie'], 'tie': ['jacket'],
       'jacket': [], 'socks': ['shoes'], 'shoes': [], 'watch': []}
d, f = dfs(dag)
print({u: (d[u], f[u]) for u in dag})
print(topological_order(dag))
```

```console
$ python3 dfs.py
{'shorts': (1, 10), 'trousers': (2, 9), 'belt': (3, 6), 'shirt': (11, 14), 'tie': (12, 13), 'jacket': (4, 5), 'socks': (15, 16), 'shoes': (7, 8), 'watch': (17, 18)}
['watch', 'socks', 'shirt', 'tie', 'shorts', 'trousers', 'shoes', 'belt', 'jacket']
```

(Python's default recursion limit of about $1000$ frames makes this recursive version fail on long paths; for large graphs use an explicit stack, as in [[#ex-iterative-dfs]].)

### The structure of the timestamps

The timestamps nest like brackets: write "$(u$" when $u$ is discovered and "$u)$" when it finishes, and the result is a well-formed expression. For the clothes graph it is $(\text{shorts}\ (\text{trousers}\ (\text{belt}\ (\text{jacket}\ \text{jacket})\ \text{belt})\ (\text{shoes}\ \text{shoes})\ \text{trousers})\ \text{shorts})\ (\text{shirt}\ (\text{tie}\ \text{tie})\ \text{shirt}) \dots$

::: theorem Parenthesis theorem {#thm-parenthesis}
In any depth-first search, for any two vertices $u$ and $v$, exactly one of the following holds:

1. the intervals $[u.d, u.f]$ and $[v.d, v.f]$ are disjoint, and neither vertex is a descendant of the other in the depth-first forest;
2. $[u.d, u.f]$ contains $[v.d, v.f]$, and $v$ is a descendant of $u$;
3. $[v.d, v.f]$ contains $[u.d, u.f]$, and $u$ is a descendant of $v$.
:::

::: proof
Suppose $u.d < v.d$ (the other case is symmetric). If $v.d < u.f$, then $v$ was discovered while $u$ was grey, that is, while `DFS-VISIT(u)` was on the call stack; so the call for $v$ was made, directly or indirectly, from the call for $u$, and $v$ is a descendant of $u$. That inner call returns before the outer one, so $v.f < u.f$: case 2. If instead $v.d > u.f$, then $u.d < u.f < v.d < v.f$, the intervals are disjoint, and since $v$ was discovered after `DFS-VISIT(u)` returned it is not a descendant of $u$ (descendants of $u$ are discovered during that call); nor is $u$ a descendant of $v$, which was discovered later. That is case 1.
:::

::: theorem White-path theorem {#thm-white-path}
In a depth-first forest, $v$ is a descendant of $u$ if and only if, at the time $u.d$ when $u$ is discovered, there is a path from $u$ to $v$ consisting entirely of white vertices.
:::

::: proof
($\Rightarrow$) If $v$ is a descendant of $u$, every vertex $w$ on the tree path from $u$ to $v$ is a descendant of $u$, so $u.d \le w.d$ by [[#thm-parenthesis]], and all of them except $u$ are white at time $u.d$.

($\Leftarrow$) Suppose at time $u.d$ there is a white path $u = w_0, w_1, \dots, w_k = v$, but $v$ does not become a descendant of $u$. Choose the first vertex $w_i$ on the path that does not; $i \ge 1$, and $w_{i-1}$ is a descendant of $u$ (or $u$ itself), so $w_{i-1}.f \le u.f$. Since $w_i$ is white at time $u.d$, $w_i.d > u.d$. Since $(w_{i-1}, w_i)$ is an edge, $w_i$ must be discovered before $w_{i-1}$ finishes (`DFS-VISIT(w_{i-1})` scans it and visits it if it is still white), so $u.d < w_i.d < w_{i-1}.f \le u.f$. By [[#thm-parenthesis]], $[w_i.d, w_i.f]$ then lies inside $[u.d, u.f]$, so $w_i$ is a descendant of $u$ — a contradiction.
:::

### Classifying edges

DFS sorts the edges of a directed graph into four kinds, according to the colour of $v$ when the edge $(u, v)$ is first explored from $u$:

- **tree edges**: $v$ is white — the edge is in the depth-first forest;
- **back edges**: $v$ is grey — $v$ is an ancestor of $u$ (or $u$ itself, for a self-loop);
- **forward edges**: $v$ is black and $u.d < v.d$ — $v$ is a non-tree descendant of $u$;
- **cross edges**: $v$ is black and $v.d < u.d$ — $v$ is in an earlier subtree or tree; neither is a descendant of the other.

In an *undirected* graph every edge is a tree edge or a back edge, the first time it is examined: an edge to a black vertex $v$ would mean that $v$ finished without exploring its edge to $u$, which is impossible.

::: theorem Cycles and back edges {#thm-back-edge}
A directed graph has a cycle if and only if a depth-first search of it finds a back edge.
:::

::: proof
($\Leftarrow$) A back edge $(u, v)$ goes from $u$ to its ancestor $v$; the tree path from $v$ to $u$ followed by the edge is a cycle. ($\Rightarrow$) Let $C$ be a cycle, and let $v$ be the first vertex of $C$ discovered, and $u$ its predecessor on $C$, so $(u, v)$ is an edge. At time $v.d$ the rest of $C$ is white, so there is a white path from $v$ to $u$ along $C$, and by [[#thm-white-path]] $u$ becomes a descendant of $v$. When $(u, v)$ is explored from $u$, $v$ is still grey ($u$ is discovered and finishes during `DFS-VISIT(v)`), so it is a back edge.
:::

::: quiz
In a DFS of a directed graph, the edge $(u, v)$ is explored and $v$ is black with $v.d < u.d$. Which kind of edge is it, and what does it imply?

- [ ] A back edge, so the graph has a cycle.
- [ ] A forward edge: $v$ is a descendant of $u$.
- [x] A cross edge: $v$ finished before $u$ was discovered, and neither is a descendant of the other.
- [ ] A tree edge.
::: solution
$v$ is black, so it has finished; since $v.d < u.d$ and $u$ is grey at this moment, $u$ is not a descendant of $v$ (if it were, $v$ would still be grey). By [[#thm-parenthesis]] the intervals are disjoint, with $v.f < u.d$. Cross edges exist only in directed graphs and never close a cycle on their own. Note that $v.f < u.f$ — the fact used in topological sorting below.
:::
:::

## Topological sorting

A **directed acyclic graph** (DAG) models dependencies: an edge $(u, v)$ says that $u$ must come before $v$ — a course before the course that requires it, a module before one that imports it, a task before one that needs its result.

::: definition Topological order {#def-topo}
A **topological order** of a directed graph is a linear order of its vertices in which, for every edge $(u, v)$, $u$ comes before $v$.
:::

A graph with a cycle has no topological order (the first vertex of the cycle in the order would have its predecessor on the cycle after it). Conversely every DAG has one, and DFS finds it.

::: theorem Topological sort by DFS {#thm-topo}
If $G$ is a DAG, listing its vertices in decreasing order of DFS finish time gives a topological order. With finish times appended to a list as vertices finish, this takes $\Theta(n + m)$ time.
:::

::: proof
Let $(u, v)$ be an edge; we show $v.f < u.f$. When the edge is explored from $u$, $v$ is not grey, because a grey $v$ would make $(u, v)$ a back edge and $G$ would have a cycle ([[#thm-back-edge]]). If $v$ is white, it becomes a descendant of $u$, so $v.f < u.f$ by [[#thm-parenthesis]]. If $v$ is black, it has already finished, while $u$ has not: $v.f < u.f$.
:::

::: example Getting dressed {#ex-topo}
Use the timestamps printed above to check the topological order of the clothes graph, and find a second valid order.
::: solution
Finish times: watch $18$, socks $16$, shirt $14$, tie $13$, shorts $10$, trousers $9$, shoes $8$, belt $6$, jacket $5$. Sorting by decreasing finish time gives the printed order. Every edge goes from a larger to a smaller finish time: shorts ($10$) $\to$ trousers ($9$) and shoes ($8$); trousers ($9$) $\to$ belt ($6$), shoes ($8$); belt ($6$) $\to$ jacket ($5$); shirt ($14$) $\to$ belt, tie ($13$); tie $\to$ jacket; socks ($16$) $\to$ shoes. Topological orders are rarely unique: shirt, tie, socks, shorts, trousers, belt, jacket, shoes, watch is another one, since it also puts every edge forwards.
:::
:::

::: widget graph
nodes: shorts@0,2; trousers@1,2; belt@2,2; jacket@3,2; shirt@1,3; tie@2,3; socks@0,1; shoes@1.5,1; watch@3,1
edges: shorts>trousers; shorts>shoes; trousers>belt; trousers>shoes; belt>jacket; shirt>belt; shirt>tie; tie>jacket; socks>shoes
algorithm: topo
caption: The clothes DAG. Step through the topological sort: it produces an order in which every arrow points forwards. Then add an edge from jacket to shirt (edit the edge list, or imagine it): the graph now has a cycle (shirt → belt → jacket → shirt), and no topological order exists.
:::

An alternative, **Kahn's algorithm** (1962), repeatedly outputs a vertex with no incoming edges from the remaining graph and deletes it; keeping in-degree counts and a queue of zero-in-degree vertices makes it $\Theta(n + m)$ too, and if it stops before outputting every vertex the remaining graph contains a cycle ([[#ex-kahn]]).

## Strongly connected components

In a directed graph, vertices $u$ and $v$ are **strongly connected** if there are paths from $u$ to $v$ and from $v$ to $u$. This is an equivalence relation, and its classes are the **strongly connected components** (SCCs). Contracting each SCC to a single vertex gives the **component graph** $G^{\mathrm{SCC}}$, which is always a DAG: a cycle through two components would make them one component. So every directed graph is a DAG of strongly connected pieces.

Kosaraju's algorithm finds the SCCs with two depth-first searches. Let $G^{\mathsf T}$ be the **transpose** of $G$, with every edge reversed; it has the same SCCs as $G$.

::: algorithm Kosaraju's algorithm {#alg-kosaraju}
1. Run DFS on $G$ to compute finish times $u.f$.
2. Compute $G^{\mathsf T}$.
3. Run DFS on $G^{\mathsf T}$, taking the vertices in the main loop in *decreasing* order of $u.f$. Each tree of this second depth-first forest is one SCC.
:::

For a set $C$ of vertices, write $f(C) = \max_{u\in C} u.f$, the last finish time in $C$ during the first search.

::: lemma Finish times across components {#lem-scc}
Let $C$ and $C'$ be distinct SCCs of $G$, and suppose there is an edge $(u, v)$ with $u \in C$ and $v \in C'$. Then $f(C) > f(C')$.
:::

::: proof
Let $x$ be the first vertex of $C \cup C'$ discovered in the first search. If $x \in C$, then at time $x.d$ all of $C \cup C'$ is white, and every vertex of $C \cup C'$ is reachable from $x$ by a white path (within $C$ to $u$, across the edge, then within $C'$). By [[#thm-white-path]] all of them become descendants of $x$, so they finish before $x$: $f(C) = x.f > f(C')$. If $x \in C'$, all of $C'$ becomes a descendant of $x$ and finishes by $x.f$, so $f(C') = x.f$. No vertex of $C$ is reachable from $x$ — that would give a path from $C'$ to $C$, which together with the edge $(u, v)$ would merge $C$ and $C'$ into one SCC. So at time $x.f$ every vertex of $C$ is still white; they are discovered later, and $f(C) > x.f = f(C')$.
:::

::: theorem Kosaraju's algorithm is correct {#thm-kosaraju}
[[#alg-kosaraju]] outputs exactly the strongly connected components of $G$, in $\Theta(n + m)$ time.
:::

::: proof
We show by induction on $k$ that the first $k$ trees of the second search are SCCs. Suppose the first $k$ trees are SCCs, and the $(k+1)$-st tree starts at the vertex $x$ with the largest finish time among the vertices not yet visited; let $C$ be its SCC. All of $C$ is unvisited (no earlier tree contained part of $C$, since earlier trees are whole SCCs), and $f(C) = x.f$. In $G^{\mathsf T}$, every vertex of $C$ is reachable from $x$, so the tree contains all of $C$. Could it contain a vertex of another SCC $C'$? Only if $G^{\mathsf T}$ has an edge from $C$ to some unvisited $C'$, i.e. $G$ has an edge from $C'$ to $C$; by [[#lem-scc]] that implies $f(C') > f(C) = x.f$, contradicting the choice of $x$ as the unvisited vertex with the largest finish time. Edges into already visited components lead to black vertices and add nothing. So the tree is exactly $C$. Each of the two searches and the transposition take $\Theta(n + m)$ time.
:::

```python
def finish_order(adj):
    """Vertices in increasing order of DFS finish time."""
    seen, order = set(), []
    def visit(u):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                visit(v)
        order.append(u)                  # u finishes
    for u in adj:
        if u not in seen:
            visit(u)
    return order

def strongly_connected_components(adj):
    """Kosaraju: DFS on G, then DFS on the reverse graph by decreasing finish."""
    rev = {u: [] for u in adj}
    for u in adj:
        for v in adj[u]:
            rev[v].append(u)
    comp = {}
    def collect(u, root):
        comp[u] = root
        for v in rev[u]:
            if v not in comp:
                collect(v, root)
    for u in reversed(finish_order(adj)):
        if u not in comp:
            collect(u, u)                # a new component, named by its root
    groups = {}
    for u, r in comp.items():
        groups.setdefault(r, []).append(u)
    return list(groups.values())

g = {'a': ['b'], 'b': ['c', 'e', 'f'], 'c': ['d', 'g'], 'd': ['c', 'h'],
     'e': ['a', 'f'], 'f': ['g'], 'g': ['f', 'h'], 'h': ['h']}
print(finish_order(g))
print(strongly_connected_components(g))
```

```console
$ python3 scc.py
['h', 'd', 'f', 'g', 'c', 'e', 'b', 'a']
[['a', 'e', 'b'], ['c', 'd'], ['g', 'f'], ['h']]
```

::: example Two passes {#ex-scc}
Explain the output of the listing: why does the second search start at $a$, and why does it stop after $\{a, e, b\}$?
::: solution
The first search starts at $a$, goes $a \to b \to c \to d \to h$, and so finishes $h$ first; $a$, the root, finishes last. In decreasing finish order the second search starts at $a$ in $G^{\mathsf T}$. The reversed edges into $a$ come from $e$, and into $e$ from $b$, and into $b$ from $a$: the tree is $\{a, e, b\}$. It cannot leave this set, because in $G^{\mathsf T}$ the only edges out of $\{a, b, e\}$ would correspond to edges of $G$ *into* $\{a, b, e\}$ from outside, and there are none — $\{a, b, e\}$ is a source of the component graph, which has the largest finish time, as [[#lem-scc]] predicts. The next unvisited vertex in decreasing finish order is $c$, giving $\{c, d\}$ (its reversed edges to $b$ lead to an already visited vertex); then $g$, giving $\{g, f\}$; then $h$. The component graph has the edges $\{a,b,e\} \to \{c,d\}$, $\{a,b,e\} \to \{f,g\}$, $\{c,d\} \to \{f,g\}$, $\{c,d\} \to \{h\}$ and $\{f,g\} \to \{h\}$; the second search met the components in a topological order of it.
:::
:::

Tarjan's algorithm (1972) finds the SCCs in a single depth-first search using "low-link" values and a stack; it is the one usually implemented, but Kosaraju's is easier to prove.

## Bipartite graphs

An undirected graph is **bipartite** if its vertices can be split into two sets so that every edge has one end in each — equivalently, if it can be coloured with two colours so that adjacent vertices differ. Scheduling exams in two sessions so that no student has a clash, and matching applicants to jobs ([[algorithms/network-flow]]), are problems on bipartite graphs.

::: theorem Bipartite graphs and odd cycles {#thm-bipartite}
An undirected graph is bipartite if and only if it has no cycle of odd length. BFS decides which, in $O(n + m)$ time, producing either a 2-colouring or an odd cycle.
:::

::: proof
($\Rightarrow$) Colours alternate along any cycle in a 2-coloured graph, so a cycle returns to its starting colour only after an even number of edges.

($\Leftarrow$, and the algorithm.) Work in each connected component separately; run BFS from some $s$ and colour each vertex by the parity of its distance, $\delta(s, v) \bmod 2$. Every edge $(u, v)$ joins vertices whose distances differ by at most one (if $\delta(s, v) > \delta(s, u) + 1$, the path through $u$ would be shorter). If every edge joins distances of different parity, the colouring is proper and the graph is bipartite. Otherwise some edge $(u, v)$ has $\delta(s, u) = \delta(s, v) = k$. Let $z$ be the lowest common ancestor of $u$ and $v$ in the BFS tree, at depth $j < k$. The tree paths from $z$ to $u$ and to $v$ share only $z$, and together with the edge $(u, v)$ they form a cycle of length $(k - j) + (k - j) + 1$, which is odd. So a graph with no odd cycle is bipartite, and the algorithm finds an odd cycle whenever it is not.
:::

```python
from collections import deque

def two_colour(adj):
    """Return a 2-colouring dict, or an odd cycle as a list of vertices."""
    colour, parent = {}, {}
    for s in adj:
        if s in colour:
            continue
        colour[s], parent[s] = 0, None
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if v not in colour:
                    colour[v], parent[v] = 1 - colour[u], u
                    queue.append(v)
                elif colour[v] == colour[u]:     # edge inside one layer
                    return odd_cycle(parent, u, v)
    return colour

def odd_cycle(parent, u, v):
    """Join the BFS-tree paths from u and v at their lowest common ancestor."""
    pu, pv = [u], [v]
    while pu[-1] is not None:
        pu.append(parent[pu[-1]])
    while pv[-1] is not None:
        pv.append(parent[pv[-1]])
    pu, pv = pu[:-1], pv[:-1]
    while len(pu) > 1 and len(pv) > 1 and pu[-2] == pv[-2]:
        pu.pop(); pv.pop()               # drop the common part above the LCA
    return pu + pv[-2::-1]               # u ... lca ... v

square = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [3, 1]}
pentagon = {1: [2, 5], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 1]}
print(two_colour(square))
print(two_colour(pentagon))
```

```console
$ python3 bip.py
{1: 0, 2: 1, 4: 1, 3: 0}
[3, 2, 1, 5, 4]
```

The square is bipartite ($\{1, 3\}$ against $\{2, 4\}$); for the pentagon the function returns the odd cycle $3, 2, 1, 5, 4$ (closed by the edge $4$–$3$). Here `u, v` are $3$ and $4$, both at distance $2$ from vertex $1$, which is their lowest common ancestor.

::: example Exam sessions {#ex-exams}
Five exams $A, \dots, E$ must be held in two sessions, and two exams clash if some student takes both. The clashes are $A$–$B$, $A$–$D$, $B$–$C$, $C$–$D$, $C$–$E$ and $D$–$E$. Is a two-session timetable possible?
::: solution
Build the clash graph and run the 2-colouring BFS from $A$: $A$ gets colour $0$; its neighbours $B$ and $D$ get colour $1$; scanning $B$ gives $C$ colour $0$; scanning $D$ finds $C$ (colour $0 \ne 1$, fine) and gives $E$ colour $0$; scanning $C$ finds $E$ with the same colour $0$ — a clash inside a layer. The odd cycle is found from the tree paths: $C$ and $E$ are both at distance $2$, with parents $B$ and $D$, whose lowest common ancestor is $A$, giving the cycle $C, B, A, D, E$ closed by the edge $E$–$C$ — five exams, an odd cycle, so by [[#thm-bipartite]] two sessions are impossible. (The shorter odd cycle $C, D, E$ also shows it.) With three sessions, $\{A, C\}$, $\{B, D\}$, $\{E\}$ works.
:::
:::

::: warning DFS does not find shortest paths
It is tempting to use DFS for everything, because the recursive version is so short. But the depth-first tree path from $s$ to $v$ can be far longer than the shortest path: on a cycle of $n$ vertices, DFS from one vertex may reach its neighbour by going all the way round, a path of $n - 1$ edges. Distances need BFS (or, with weights, [[algorithms/shortest-paths]]). Conversely, BFS finish order means nothing, so topological sorting and SCCs need DFS (or Kahn's in-degree method). And a vertex being *discovered* is not the same as it being *finished*: confusing $u.d$ with $u.f$ in a topological sort produces wrong orders on graphs like $a \to b$, $c \to a$ when the search starts at $a$.
:::

::: history
Systematic exploration of mazes goes back to the nineteenth century: Charles Pierre Trémaux's method of marking passages (described by Édouard Lucas in 1882) is depth-first search. Breadth-first search was published by Edward F. Moore in 1959 ("The shortest path through a maze"), and independently by C. Y. Lee in 1961 for routing wires on circuit boards. Arthur Kahn gave the in-degree algorithm for topological sorting in 1962, in a paper on scheduling large projects. The modern theory of depth-first search — timestamps, edge classification and linear-time algorithms for biconnectivity, strongly connected components and planarity — was created by Robert Tarjan and John Hopcroft around 1971–1974; Tarjan's "Depth-first search and linear graph algorithms" (1972) gave the one-pass SCC algorithm. S. Rao Kosaraju found the two-pass algorithm in 1978 (unpublished), and Micha Sharir published it independently in 1981. Hopcroft and Tarjan received the 1986 Turing Award, partly for this work.
:::

## Where this leads

BFS generalises to [[algorithms/shortest-paths]] with Dijkstra's algorithm and to the searches for augmenting paths in [[algorithms/network-flow]], whose Edmonds–Karp variant uses BFS precisely because it finds shortest paths. DFS-based topological sorting is the backbone of [[algorithms/dynamic-programming]] on DAGs, of build systems and of spreadsheet recalculation. The connected components found by graph search are the starting point of [[algorithms/greedy-algorithms]], where Kruskal's algorithm maintains components with union–find. In [[artificial-intelligence]], BFS and DFS become the uninformed search strategies, refined by heuristics into A*.

::: summary
- Graph search visits every vertex reachable from a start exactly once; with adjacency lists it runs in $\Theta(n + m)$.
- **BFS** uses a queue; its queue holds at most two consecutive distances ([[#lem-bfs-queue]]), and it computes shortest-path distances in unweighted graphs, with a tree of shortest paths ([[#thm-bfs]]).
- **DFS** records discovery and finish times that nest like parentheses ([[#thm-parenthesis]]); the **white-path theorem** says which vertices become descendants ([[#thm-white-path]]).
- A directed graph is acyclic iff DFS finds no **back edge** ([[#thm-back-edge]]); in a DAG, decreasing finish time is a **topological order** ([[#thm-topo]]).
- Kosaraju's algorithm finds **strongly connected components** with DFS on $G$ and then on $G^{\mathsf T}$ in decreasing finish order ([[#thm-kosaraju]]).
- A graph is **bipartite** iff it has no odd cycle; BFS layers give a 2-colouring or an odd cycle ([[#thm-bipartite]]).
:::

## Exercises

::: exercise BFS distances {level=1 check="3"}
In the graph with edges $1$–$2$, $1$–$3$, $2$–$4$, $3$–$4$, $4$–$5$, $5$–$6$, $3$–$6$, what is the BFS distance from $1$ to $5$? (Enter the distance.)
::: solution
From $1$: distance $1$ for $2$ and $3$; distance $2$ for $4$ (via $2$ or $3$) and $6$ (via $3$); distance $3$ for $5$ (via $4$ or $6$). So $\delta(1, 5) = 3$.
:::
:::

::: exercise Counting timestamps {level=1 check="18"}
A depth-first search is run on a directed graph with $9$ vertices. What is the largest timestamp assigned? (Enter the number.)
::: solution
Each vertex receives two timestamps, a discovery time and a finish time, and `time` increases by one for each, so the timestamps are exactly $1, 2, \dots, 2n$. With $n = 9$ the largest is $18$ — as in the clothes example, where the watch finishes at $18$.
:::
:::

::: exercise Edge kinds {level=1}
Run DFS on the directed graph with edges $a \to b$, $b \to c$, $c \to a$, $a \to c$, $d \to c$, starting at $a$ and then at $d$, taking adjacency lists in alphabetical order. Classify every edge.
::: solution
$a$ ($d = 1$) explores $b$ (2), which explores $c$ (3); $c$'s edge to $a$ finds $a$ grey: **back** edge, so there is a cycle $a \to b \to c \to a$. $c$ finishes (4), $b$ finishes (5). Back at $a$, the edge $a \to c$ finds $c$ black with $c.d = 3 > a.d = 1$: **forward** edge. $a$ finishes (6). Then $d$ (7) explores $c$, black with $c.d < d.d$: **cross** edge; $d$ finishes (8). Tree edges: $a \to b$, $b \to c$.
:::
:::

::: exercise Iterative DFS {#ex-iterative-dfs level=2}
Write a non-recursive DFS in Python that computes discovery and finish times using an explicit stack, and check that it gives the same timestamps as the recursive version on the clothes graph.
::: solution
The stack holds pairs (vertex, iterator over its neighbours), so a vertex is finished exactly when its iterator is exhausted — mirroring the recursive calls.

```python
def dfs_iterative(adj):
    time, d, f = 0, {}, {}
    for s in adj:
        if s in d:
            continue
        time += 1; d[s] = time
        stack = [(s, iter(adj[s]))]
        while stack:
            u, it = stack[-1]
            for v in it:                       # resume u's neighbour list
                if v not in d:
                    time += 1; d[v] = time
                    stack.append((v, iter(adj[v])))
                    break
            else:                              # no white neighbour left
                stack.pop()
                time += 1; f[u] = time
    return d, f

dag = {'shorts': ['trousers', 'shoes'], 'trousers': ['belt', 'shoes'],
       'belt': ['jacket'], 'shirt': ['belt', 'tie'], 'tie': ['jacket'],
       'jacket': [], 'socks': ['shoes'], 'shoes': [], 'watch': []}
d, f = dfs_iterative(dag)
print({u: (d[u], f[u]) for u in dag})
```

```console
$ python3 dfsit.py
{'shorts': (1, 10), 'trousers': (2, 9), 'belt': (3, 6), 'shirt': (11, 14), 'tie': (12, 13), 'jacket': (4, 5), 'socks': (15, 16), 'shoes': (7, 8), 'watch': (17, 18)}
```

The timestamps match. (Pushing all neighbours of a vertex onto a stack at once, a common shortcut, visits vertices in a depth-first-like order but does not produce correct finish times.)
:::
:::

::: exercise Kahn's algorithm {#ex-kahn level=2}
Prove that Kahn's algorithm — repeatedly remove a vertex of in-degree $0$ and output it — outputs a topological order if $G$ is a DAG, and gets stuck with vertices left over if $G$ has a cycle.
::: solution
*A DAG always has a vertex of in-degree $0$:* otherwise, walking backwards along incoming edges from any vertex never stops, and after $n + 1$ steps some vertex repeats, giving a cycle. Removing a vertex from a DAG leaves a DAG, so the algorithm can always continue until all vertices are output. *Order:* when $v$ is output its in-degree in the remaining graph is $0$, so every $u$ with an edge $(u, v)$ was already output: every edge goes forwards. *Cycles:* no vertex of a cycle can be output before its predecessor on the cycle, so no vertex of the cycle is ever output; the algorithm stops with them left.
:::
:::

::: exercise The component graph {level=2 check="3"}
How many strongly connected components does the graph with edges $1\to2$, $2\to3$, $3\to1$, $3\to4$, $4\to5$, $5\to6$, $6\to4$, $6\to7$ have? Draw its component graph. (Enter the number of components.)
::: solution
$1 \to 2 \to 3 \to 1$ is a cycle, so $\{1, 2, 3\}$ lies in one component, and likewise $\{4, 5, 6\}$ (cycle $4 \to 5 \to 6 \to 4$). No vertex of $\{4, \dots, 7\}$ reaches $\{1, 2, 3\}$ (no edge leads back), and $7$ has no outgoing edges, so it is alone. There are $3$ components, and the component graph is the path $\{1,2,3\} \to \{4,5,6\} \to \{7\}$, a DAG as it must be.
:::
:::

::: exercise Is it bipartite? {level=1}
Decide whether the cube graph (vertices the $8$ binary strings of length $3$, edges between strings that differ in one bit) and the Petersen graph are bipartite.
::: solution
The cube is bipartite: colour a string by the parity of its number of $1$s; flipping one bit changes the parity, so every edge joins different colours. The Petersen graph is not: its outer $5$-cycle is an odd cycle, so by [[#thm-bipartite]] no 2-colouring exists.
:::
:::

::: exercise Semi-connectedness {level=3}
A directed graph is **semi-connected** if for every pair $u, v$ there is a path from $u$ to $v$ or from $v$ to $u$. Give an $O(n + m)$ algorithm to decide semi-connectedness and prove it correct.
::: solution
Compute the SCCs and the component graph $H$ (a DAG) in $O(n + m)$, then topologically sort $H$ into $C_1, \dots, C_k$, and answer yes iff $H$ has an edge $(C_i, C_{i+1})$ for every $i < k$. *Correct:* within an SCC all pairs are mutually reachable, so $G$ is semi-connected iff every two components are comparable by reachability in $H$. If all edges $C_i \to C_{i+1}$ exist, $H$ contains a path through all components in order, so every $C_i$ reaches every $C_j$ with $j > i$. Conversely, if some edge $C_i \to C_{i+1}$ is missing, then $C_{i+1}$ cannot reach $C_i$ (edges in $H$ go forward in the topological order), and $C_i$ cannot reach $C_{i+1}$ either: a path from $C_i$ to $C_{i+1}$ would have to pass through some component strictly between them in the order, but there is none, and a direct edge is missing.
:::
:::

::: exercise Counting shortest paths {level=3}
Modify BFS so that it also computes, for every vertex $v$, the number $N(v)$ of distinct shortest paths from $s$ to $v$, still in $O(n + m)$ time (count arithmetic as constant time). Prove it correct, and find $N(f)$ for the graph of [[#ex-bfs]].
::: solution
Set $N(s) = 1$ and $N(v) = 0$ otherwise. When scanning an edge $(u, v)$ from the dequeued vertex $u$: if $v$ is undiscovered, discover it as usual (with $v.d = u.d + 1$) and set $N(v) \gets N(u)$; if $v$ is already discovered and $v.d = u.d + 1$, add $N(v) \gets N(v) + N(u)$.

*Correctness.* A shortest path to $v \ne s$ consists of a shortest path to some $u$ with $\delta(s, u) = \delta(s, v) - 1$ and the edge $(u, v)$, and different $u$ or different paths to $u$ give different paths, so $N(v) = \sum N(u)$ over the edges $(u, v)$ with $\delta(s, u) = \delta(s, v) - 1$. The algorithm adds exactly these terms, since by [[#thm-bfs]] $u.d = \delta(s, u)$, and each edge into $v$ is scanned once, when its tail is dequeued. It remains to see that $N(u)$ is final when $u$ is dequeued: all contributions to $N(u)$ come from vertices at distance $\delta(s, u) - 1$, which are dequeued before $u$ because vertices leave the queue in non-decreasing order of distance ([[#lem-bfs-queue]]). So by induction on the distance, every $N(u)$ is correct when used. The extra work is constant per edge.

*Example.* $N(s) = 1$; $N(a) = N(b) = 1$; $N(c) = N(a) + N(b) = 2$ (edges from $a$ and $b$); $N(d) = N(b) = 1$; $N(e) = N(c) + N(d) = 3$; $N(f) = N(e) = 3$. The three shortest paths to $f$ are $s\,a\,c\,e\,f$, $s\,b\,c\,e\,f$ and $s\,b\,d\,e\,f$.
:::
:::
