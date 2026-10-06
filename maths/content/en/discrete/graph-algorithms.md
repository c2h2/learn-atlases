Type two addresses into a map application and within a second it proposes the fastest route — chosen from an astronomical number of possible routes through a road network with millions of junctions. Nobody checks all the routes. The program runs an **algorithm**, a precise step-by-step procedure, and the reason we can trust its answer is that the algorithm has been *proved* correct.

This chapter studies the basic graph algorithms: searching a graph, ordering tasks that depend on one another, finding shortest paths and cheapest connecting networks, and tracing a graph in one stroke. For each we prove correctness and estimate the work done. We also meet a striking contrast: deciding whether a graph has a closed walk using every *edge* once is easy, but nobody knows an efficient way to decide whether it has a cycle through every *vertex* once. We use the vocabulary of [[discrete/graphs]] throughout.

## Representing a graph

A computer can store a graph in two standard ways. The **adjacency matrix** ([[discrete/graphs#thm-walks]]) has $n^2$ entries and answers "is $uv$ an edge?" in one step. **Adjacency lists** record the neighbours of each vertex; by the handshake lemma ([[discrete/graphs#thm-handshake]]) their total length is $2m$, so they need storage proportional to $n + m$. Road and social networks are *sparse* ($m$ a small multiple of $n$, far below $\binom n2$), and for them lists are far smaller and faster to scan. All the algorithms below use adjacency lists.

We measure cost by counting basic steps (examining an edge, comparing numbers) as a function of $n$ and $m$, writing $O(f)$ for "at most a constant multiple of $f$". Time $O(n + m)$ means each vertex and edge is handled a bounded number of times — the best one can hope for.

## Breadth-first search

The simplest systematic way to explore a graph is to spread out from a start vertex in layers: first its neighbours, then their unvisited neighbours, and so on. The vertices waiting to be processed are kept in a **queue**, a list from which we remove at the front and to which we add at the back.

::: algorithm Breadth-first search (BFS) {#alg-bfs}
*Input:* a graph $G$ and a start vertex $s$.

1. Mark $s$, set $\mathrm{dist}(s) = 0$, and let the queue $Q$ contain only $s$.
2. While $Q$ is not empty: remove the vertex $u$ at the front of $Q$; for each neighbour $w$ of $u$ that is not yet marked, mark $w$, set $\mathrm{dist}(w) = \mathrm{dist}(u) + 1$ and $\mathrm{parent}(w) = u$, and add $w$ to the back of $Q$.
:::

::: theorem Correctness of breadth-first search {#thm-bfs}
BFS from $s$ marks exactly the vertices of the component of $s$, and for each of them $\mathrm{dist}(v) = d(s,v)$; following parent pointers from $v$ gives a shortest path back to $s$. With adjacency lists it runs in time $O(n + m)$.
:::

::: proof
*(a) $\mathrm{dist}(v) \ge d(s,v)$.* By induction on the order of marking, following parents from a marked vertex $v$ gives a walk $v, \mathrm{parent}(v), \dots, s$ of length exactly $\mathrm{dist}(v)$. So $v$ is in the component of $s$ and $d(s,v) \le \mathrm{dist}(v)$.

*(b) The queue is sorted.* We claim that whenever $Q = (u_1, \dots, u_r)$ from front to back,

$$
\mathrm{dist}(u_1) \le \mathrm{dist}(u_2) \le \dots \le \mathrm{dist}(u_r) \le \mathrm{dist}(u_1) + 1 .
$$

This holds at the start, and it is preserved by a step: removing $u_1$ and appending vertices with $\mathrm{dist} = \mathrm{dist}(u_1) + 1$ gives a queue whose values still increase and whose last value is at most $\mathrm{dist}(u_1) + 1 \le \mathrm{dist}(u_2) + 1$. In particular, vertices leave the queue in non-decreasing order of $\mathrm{dist}$.

*(c) $\mathrm{dist}(v) \le d(s,v)$.* We show by induction on $k$ that every $v$ with $d(s,v) = k$ is marked with $\mathrm{dist}(v) \le k$. For $k = 0$, $v = s$. Let $d(s,v) = k + 1$ and let $u$ be the vertex before $v$ on a shortest $s$–$v$ path, so $d(s,u) = k$; by hypothesis $u$ is marked with $\mathrm{dist}(u) \le k$, and every marked vertex is eventually removed from the queue. When $u$ is removed, $v$ is examined. If $v$ is unmarked it gets $\mathrm{dist}(v) = \mathrm{dist}(u) + 1 \le k+1$. Otherwise $v$ was marked earlier as a neighbour of some $x$ removed no later than $u$, so by (b) $\mathrm{dist}(v) = \mathrm{dist}(x) + 1 \le \mathrm{dist}(u) + 1 \le k + 1$.

Together, (a) and (c) show that the marked vertices are exactly those of the component of $s$ and that $\mathrm{dist}(v) = d(s,v)$; the parent walk from (a) has length $d(s,v)$, so it is a shortest path. Finally, each vertex enters the queue at most once (it is marked when it enters), and when it leaves, its adjacency list is scanned once. The total work is proportional to $n + \sum_v \deg(v) = n + 2m$.
:::

::: example Breadth-first search by hand {#ex-bfs}
Run BFS from $A$ on the graph in the figure below (ignore the weights), examining neighbours in alphabetical order.
::: solution
We record the queue after each vertex is removed.

| removed | newly marked (dist) | queue afterwards |
|---|---|---|
| — | $A\ (0)$ | $A$ |
| $A$ | $B\ (1)$, $C\ (1)$ | $B, C$ |
| $B$ | $D\ (2)$ | $C, D$ |
| $C$ | $F\ (2)$ | $D, F$ |
| $D$ | $E\ (3)$ | $F, E$ |
| $F$ | $G\ (3)$ | $E, G$ |
| $E$, then $G$ | — | empty |

So $d(A,\cdot)$ is $0, 1, 1, 2, 3, 2, 3$ for $A, B, C, D, E, F, G$. The parent pointers $B, C \leftarrow A$, $D \leftarrow B$, $F \leftarrow C$, $E \leftarrow D$, $G \leftarrow F$ form a spanning tree in which every path to $A$ is a shortest path — a **BFS tree**. For instance $G, F, C, A$ is a shortest path from $G$ to $A$.
:::
:::

::: widget graph
nodes: A@0,1; B@1,2; C@1,0; D@2,1; E@3,2; F@3,0; G@4,1
edges: A-B:4; A-C:2; B-C:1; B-D:5; C-D:8; C-F:10; D-E:3; D-F:6; E-F:9; E-G:7; F-G:11
algorithm: bfs
start: A
caption: The running example of this chapter. Step through breadth-first search from $A$ and compare with [[#ex-bfs]]: the queue always holds at most two layers, and each vertex is labelled with its distance in edges. BFS ignores the weights; Dijkstra's algorithm, later in the chapter, uses them — and finds quite different shortest routes.
:::

## Depth-first search and topological sorting

Depth-first search explores like a person in a maze with a ball of thread: go forward as far as possible, and when stuck, backtrack to the most recent junction with an unexplored corridor.

::: algorithm Depth-first search (DFS) {#alg-dfs}
To *visit* a vertex $u$: mark $u$; then for each neighbour $w$ of $u$ in turn, if $w$ is unmarked, set $\mathrm{parent}(w) = u$ and visit $w$. Depth-first search from $s$ is the call "visit $s$".
:::

As with BFS, DFS from $s$ marks exactly the component of $s$, the parent edges form a spanning tree of that component (the **DFS tree**), and the running time is $O(n + m)$. The shape of the tree is different, and it has a useful property: a vertex $v$ is a **descendant** of $u$ if $u$ lies on the tree path from $v$ to $s$.

::: lemma Edges join ancestors and descendants {#lem-dfs}
If $uv$ is an edge and DFS marks $u$ before $v$, then $v$ is a descendant of $u$ in the DFS tree.
:::

::: proof
The vertices marked while the call "visit $u$" is running are exactly $u$ and its descendants, since they are reached through calls made from it. When "visit $u$" begins, $v$ is unmarked, and before the call ends it examines every neighbour of $u$, including $v$. At that moment either $v$ is still unmarked — then "visit $v$" is called from $u$ and $v$ is a child of $u$ — or $v$ has been marked in the meantime, during the call. Either way $v$ is a descendant of $u$.
:::

Consequently every edge that is not a tree edge joins a vertex to one of its ancestors, and together with the tree path between them it closes a cycle. Conversely, if every edge is a tree edge, the graph is a forest. So DFS, restarted from each unmarked vertex until all are marked, detects cycles: **a graph is acyclic if and only if DFS finds no non-tree edge.**

### Ordering tasks

In a **directed graph** each edge, now called an **arc**, has a direction, $u \to v$. Directed graphs model dependencies: an arc $u \to v$ might mean that module $u$ must be taken before module $v$, or that file $u$ must be compiled before file $v$. A **directed cycle** is a sequence of distinct vertices $v_0 \to v_1 \to \dots \to v_{k-1} \to v_0$ along arcs, and a directed graph without one is a **directed acyclic graph** (DAG).

::: definition Topological ordering {#def-topological}
A **topological ordering** of a directed graph is a listing $v_1, v_2, \dots, v_n$ of its vertices such that every arc goes forwards: $v_i \to v_j$ implies $i < j$.
:::

::: theorem Topological orderings and cycles {#thm-topo}
A directed graph has a topological ordering if and only if it has no directed cycle.
:::

::: proof
($\Rightarrow$) In a topological ordering each arc increases the position, so going round a directed cycle $v_0 \to \dots \to v_0$ would make the position of $v_0$ larger than itself.

($\Leftarrow$) First, a DAG has a **source**, a vertex with no incoming arc. Otherwise start anywhere and keep stepping backwards along incoming arcs; after $n$ steps we have visited $n + 1$ vertices, so by the pigeonhole principle ([[discrete/advanced-counting#thm-pigeonhole]]) some vertex repeats, and at the first repetition the arcs between the two visits to that vertex form a directed cycle. Now we use induction on $n$; one vertex is trivially ordered. Given a DAG with $n \ge 2$ vertices, list a source $v$ first. Deleting $v$ leaves a DAG with $n - 1$ vertices, which by the induction hypothesis has a topological ordering; appending it after $v$ gives a topological ordering, since arcs at $v$ only leave $v$.
:::

The proof is an algorithm, due to Arthur Kahn (1962): repeatedly output a source and delete it. If at some point no source remains, the remaining graph contains a directed cycle and no ordering exists.

::: example Planning modules {#ex-topo}
A student must respect the prerequisites Logic → Sets, Sets → Functions, Sets → Relations, Functions → Counting, Relations → Graphs, Counting → Probability, Counting → Algorithms and Graphs → Algorithms. Find an order in which to take the eight modules.
::: solution
Repeatedly remove a source. First Logic, then Sets; now Functions and Relations are both sources. Choosing Relations makes Graphs a source; continue with Graphs, Functions and Counting, after which Probability and Algorithms are both available. One valid order is

$$
\text{Logic},\ \text{Sets},\ \text{Relations},\ \text{Graphs},\ \text{Functions},\ \text{Counting},\ \text{Probability},\ \text{Algorithms}.
$$

Every arc goes forwards. The choices along the way show that the ordering is not unique; this DAG has $16$ topological orderings.
:::
:::

::: widget graph
nodes: Probability@4,2.5; Algorithms@4,0.5; Graphs@3,0; Counting@3,2; Relations@2,0; Functions@2,2; Sets@1,1; Logic@0,1
edges: Logic>Sets; Sets>Functions; Sets>Relations; Functions>Counting; Relations>Graphs; Counting>Probability; Counting>Algorithms; Graphs>Algorithms
algorithm: topo
caption: Kahn's algorithm on the module plan of [[#ex-topo]]. At each step the current sources are the modules whose prerequisites are all done; watch the set of sources grow and shrink. Which choices could have been made differently? Every arc in the final order points forwards.
:::

## Shortest paths: Dijkstra's algorithm

In a **weighted graph** every edge $e$ has a weight $w(e) \ge 0$ — a length, a travel time, a cost. The length of a path is the sum of its edge weights, and $d(s,v)$ is now the smallest length of an $s$–$v$ path. With all weights equal to $1$ this is the old distance, and BFS finds it; with general weights the path with fewest edges may be far from the shortest.

::: algorithm Dijkstra's algorithm {#alg-dijkstra}
*Input:* a weighted graph with non-negative weights and a start vertex $s$.

1. Set $\mathrm{dist}(s) = 0$ and $\mathrm{dist}(v) = \infty$ for $v \ne s$. No vertex is *settled* yet.
2. While some unsettled vertex has finite $\mathrm{dist}$: choose an unsettled vertex $u$ with $\mathrm{dist}(u)$ as small as possible and settle it; then for each unsettled neighbour $v$ of $u$, if $\mathrm{dist}(u) + w(uv) < \mathrm{dist}(v)$, set $\mathrm{dist}(v) = \mathrm{dist}(u) + w(uv)$ and $\mathrm{parent}(v) = u$.
:::

The value $\mathrm{dist}(v)$ is a *tentative* distance, the best found so far; the key claim is that it is exact once $v$ is settled.

::: theorem Correctness of Dijkstra's algorithm {#thm-dijkstra}
If all weights are non-negative, then every vertex $u$ satisfies $\mathrm{dist}(u) = d(s,u)$ at the moment it is settled. When the algorithm stops, $\mathrm{dist}(v) = d(s,v)$ for every vertex $v$, and parent pointers give shortest paths.
:::

::: proof
At every moment, a vertex with finite $\mathrm{dist}(v)$ can be reached from $s$ by a walk of length $\mathrm{dist}(v)$: follow parent pointers (the parent was settled when the value was set, and settled values never change). Hence always $\mathrm{dist}(v) \ge d(s,v)$.

We prove the main claim by induction on the number of settled vertices. The first vertex settled is $s$, with $\mathrm{dist}(s) = 0 = d(s,s)$. Suppose every vertex settled before $u$ was settled with its true distance, and suppose for a contradiction that $\mathrm{dist}(u) > d(s,u)$ when $u$ is chosen. Then $d(s,u)$ is finite; let $P$ be a shortest $s$–$u$ path. It starts at the settled vertex $s$ and ends at the unsettled vertex $u$, so let $y$ be the first unsettled vertex on $P$ and $x$ the vertex just before it. When $x$ was settled, $\mathrm{dist}(x) = d(s,x)$ and the edge $xy$ was examined, so

$$
\mathrm{dist}(y) \le d(s,x) + w(xy) = d(s,y) \le d(s,u) < \mathrm{dist}(u).
$$

Here $d(s,x) + w(xy) = d(s,y)$ because the part of $P$ up to $y$ is a shortest route to $y$ (a shorter one could replace it and shorten $P$), and $d(s,y) \le d(s,u)$ because the rest of $P$ has non-negative length. But $y$ is unsettled, so the algorithm would have chosen $y$ rather than $u$ — a contradiction.

When the algorithm stops, any vertex $v$ reachable from $s$ has been settled: otherwise, on a path from $s$ to $v$ the first unsettled vertex $y$ follows a settled vertex $x$, and then $\mathrm{dist}(y) \le \mathrm{dist}(x) + w(xy) < \infty$, so the loop would not have stopped. Unreachable vertices keep $\mathrm{dist} = \infty = d(s,v)$.
:::

::: example Dijkstra by hand {#ex-dijkstra}
Find the shortest distances from $A$ in the weighted running example.
::: solution
Each row shows the vertex settled and the tentative distances (with parents) of the unsettled vertices afterwards.

| settled | $B$ | $C$ | $D$ | $E$ | $F$ | $G$ |
|---|---|---|---|---|---|---|
| $A\ (0)$ | $4\ (A)$ | $2\ (A)$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ |
| $C\ (2)$ | $3\ (C)$ | — | $10\ (C)$ | $\infty$ | $12\ (C)$ | $\infty$ |
| $B\ (3)$ | — | — | $8\ (B)$ | $\infty$ | $12\ (C)$ | $\infty$ |
| $D\ (8)$ | — | — | — | $11\ (D)$ | $12\ (C)$ | $\infty$ |
| $E\ (11)$ | — | — | — | — | $12\ (C)$ | $18\ (E)$ |
| $F\ (12)$ | — | — | — | — | — | $18\ (E)$ |
| $G\ (18)$ | — | — | — | — | — | — |

Two updates are worth noticing. The direct edge $AB$ of weight $4$ is beaten by $A, C, B$ of length $2 + 1 = 3$, and $D$ improves from $10$ (via $C$) to $8$ (via $B$). The shortest route to $G$ is $A, C, B, D, E, G$, of length $2 + 1 + 5 + 3 + 7 = 18$ — five edges, whereas BFS found a route with only three ($A, C, F, G$, of length $23$).
:::
:::

::: widget graph
nodes: A@0,1; B@1,2; C@1,0; D@2,1; E@3,2; F@3,0; G@4,1
edges: A-B:4; A-C:2; B-C:1; B-D:5; C-D:8; C-F:10; D-E:3; D-F:6; E-F:9; E-G:7; F-G:11
algorithm: dijkstra
start: A
caption: Step through Dijkstra's algorithm from $A$ and compare with the table in [[#ex-dijkstra]]. Vertices are settled in increasing order of distance; tentative distances only ever decrease. When it has finished, click a vertex to see its shortest path. Then choose another start vertex: the settled order changes, but the same rule applies.
:::

::: warning Negative weights break Dijkstra
The proof used $d(s,y) \le d(s,u)$, which needs non-negative weights. In the directed graph with arcs $s \to a$ of weight $2$, $s \to b$ of weight $3$ and $b \to a$ of weight $-2$, Dijkstra settles $a$ with distance $2$, but the route $s \to b \to a$ has length $1$. Negative weights need other methods, such as the Bellman–Ford algorithm.
:::

Choosing the next vertex by scanning a list gives running time $O(n^2)$; keeping the tentative distances in a *priority queue* (a heap) gives $O((n + m)\log n)$, fast enough for continental road networks.

::: quiz
In Dijkstra's algorithm with non-negative weights, which statement is true?
- [ ] A vertex's tentative distance can increase when a neighbour is settled.
- [x] Vertices are settled in non-decreasing order of their distance from $s$.
- [ ] The first neighbour of $s$ to be settled is the one joined to $s$ by the heaviest edge.
- [ ] The shortest path to a vertex always uses as few edges as possible.
::: solution
Tentative distances only decrease, and by [[#thm-dijkstra]] each newly settled vertex is at least as far from $s$ as all earlier ones. After $s$, the first vertex settled is a neighbour joined to $s$ by a *lightest* edge, not the heaviest. The last option fails in [[#ex-dijkstra]]: the shortest route to $G$ uses five edges although three suffice to reach it.
:::
:::

## Minimum spanning trees

A company wants to link $n$ towns by cable, where a link $uv$ costs $w(uv) > 0$, so that every town can reach every other. The cheapest network has no cycle — deleting an edge of a cycle keeps it connected ([[discrete/graphs#lem-bridge]]) and saves money — so it is a spanning tree. A **minimum spanning tree** (MST) of a connected weighted graph is a spanning tree $T$ whose total weight $w(T) = \sum_{e \in T} w(e)$ is as small as possible. One exists, since a connected graph has at least one spanning tree ([[discrete/graphs#cor-spanning-tree]]) and only finitely many.

Trying all spanning trees is hopeless ($K_n$ has $n^{n-2}$ of them), so we need a way to recognise good edges. For a set $S$ of vertices with $\varnothing \ne S \ne V$, an edge **crosses** the cut $(S, V \setminus S)$ if it has one endpoint in $S$ and one outside.

::: theorem Cut property {#thm-cut-property}
Let $F$ be a set of edges contained in some minimum spanning tree, and let $S$ be a set of vertices such that no edge of $F$ crosses the cut $(S, V\setminus S)$. If $e$ has the smallest weight among all edges crossing the cut, then $F \cup \{e\}$ is contained in some minimum spanning tree.
:::

::: proof
Let $T$ be a minimum spanning tree containing $F$. If $e \in T$ we are done, so suppose not, and let $e = xy$ with $x \in S$, $y \notin S$. By [[discrete/graphs#thm-trees]] there is a unique $x$–$y$ path $P$ in $T$. It starts in $S$ and ends outside $S$, so some edge $f$ of $P$ crosses the cut. Then $f \notin F$ (no edge of $F$ crosses) and $f \ne e$ (as $e \notin T$).

Let $T' = T - f + e$. It has $n - 1$ edges, and it is connected: the endpoints of $f$ are still joined, by going along $P$ to $x$, across $e$ to $y$, and along $P$ again. So $T'$ is a spanning tree by [[discrete/graphs#thm-trees]], and

$$
w(T') = w(T) - w(f) + w(e) \le w(T),
$$

because $f$ also crosses the cut, so $w(e) \le w(f)$. Hence $T'$ is a minimum spanning tree, and it contains $F \cup \{e\}$.
:::

Two classical algorithms grow a minimum spanning tree edge by edge, in different orders.

::: algorithm Prim's and Kruskal's algorithms {#alg-mst}
**Prim.** Start with $S = \{s\}$ and $F = \varnothing$. Repeat $n - 1$ times: choose a cheapest edge crossing $(S, V \setminus S)$, add it to $F$, and add its endpoint outside $S$ to $S$.

**Kruskal.** Sort the edges by weight, cheapest first, and start with $F = \varnothing$. Go through the edges in order, adding an edge to $F$ whenever its endpoints lie in different components of the forest $(V, F)$, that is, whenever it does not create a cycle.
:::

::: corollary {#cor-mst}
Prim's and Kruskal's algorithms both produce a minimum spanning tree of a connected weighted graph.
:::

::: proof
For both we show that $F$ is always contained in some minimum spanning tree; this holds at the start, when $F = \varnothing$.

*Prim.* The edges of $F$ join vertices of $S$, so none crosses $(S, V \setminus S)$, and the edge added is a cheapest crossing edge (one exists while $S \ne V$, as $G$ is connected). The cut property applies.

*Kruskal.* When an edge $e = uv$ is added, let $S$ be the vertex set of the component of $(V, F)$ containing $u$, so $v \notin S$, and no edge of $F$ crosses $(S, V \setminus S)$. An edge examined before $e$ was either added to $F$, or rejected because its endpoints were in one component of the forest; components only grow, so in both cases its endpoints now lie in a single component, and it does not cross the cut. Thus every crossing edge comes at or after $e$ in the sorted order, so $e$ is a cheapest crossing edge, and the cut property applies.

At the end, $F$ is a spanning tree: for Prim, it has $n - 1$ edges joining all of $S = V$ to $s$; for Kruskal, $F$ is acyclic, and if it had two components, an edge of $G$ joining them would have been added when it was examined. A spanning tree contained in a minimum spanning tree $T$ has as many edges as $T$, so it *is* $T$.
:::

::: example Prim and Kruskal by hand {#ex-mst}
Find a minimum spanning tree of the running example.
::: solution
*Kruskal.* In order of weight the edges are $BC\,(1)$, $AC\,(2)$, $DE\,(3)$, $AB\,(4)$, $BD\,(5)$, $DF\,(6)$, $EG\,(7)$, $CD\,(8)$, $EF\,(9)$, $CF\,(10)$, $FG\,(11)$. We add $BC$, $AC$ and $DE$; reject $AB$ (it would close the triangle $ABC$); add $BD$, $DF$ and $EG$. Now we have $6 = n - 1$ edges, and the remaining edges would all close cycles. The tree has weight $1 + 2 + 3 + 5 + 6 + 7 = 24$.

*Prim from $A$.* The cheapest edge leaving $\{A\}$ is $AC\,(2)$; then $BC\,(1)$; from $\{A, B, C\}$ the cheapest crossing edge is $BD\,(5)$; then $DE\,(3)$, $DF\,(6)$ and finally $EG\,(7)$. The same six edges, in a different order.

As the weights are distinct, this is the only minimum spanning tree ([[#exr-unique-mst]]).
:::
:::

::: widget graph
nodes: A@0,1; B@1,2; C@1,0; D@2,1; E@3,2; F@3,0; G@4,1
edges: A-B:4; A-C:2; B-C:1; B-D:5; C-D:8; C-F:10; D-E:3; D-F:6; E-F:9; E-G:7; F-G:11
algorithm: kruskal
caption: Kruskal's algorithm on the running example: edges are examined from cheapest to dearest, and an edge is rejected exactly when its endpoints already lie in the same tree of the growing forest. Then choose Prim from the menu: it grows one tree from the start vertex instead of a forest, yet ends with the same edges and total weight $24$.
:::

::: quiz
All edge weights of a connected graph with at least three edges are distinct. Which edges are certainly in its minimum spanning tree? (More than one answer may be correct.)
- [x] The lightest edge
- [x] The second-lightest edge
- [ ] The third-lightest edge
- [ ] Never the heaviest edge
::: solution
Kruskal's algorithm accepts the first two edges, since two edges cannot form a cycle. The third-lightest may close a triangle with them and be rejected. The heaviest edge *is* in the tree if it is a bridge — every spanning tree must contain every bridge.
:::
:::

## Euler tours

The city of Königsberg (now Kaliningrad) was built on both banks of the river Pregel and on two islands, with seven bridges joining the four land masses. Could a citizen take a walk crossing every bridge exactly once? In a multigraph with a vertex for each land mass and an edge for each bridge, the island Kneiphof has degree $5$ and the other three land masses degree $3$.

::: definition Euler trails and circuits {#def-euler}
An **Euler trail** in a multigraph is a trail that uses every edge exactly once; an **Euler circuit** is a closed Euler trail.
:::

In multigraphs a loop contributes $2$ to the degree of its vertex, so the handshake lemma still holds.

::: theorem Euler's theorem {#thm-euler-circuit}
A connected multigraph with at least one edge has an Euler circuit if and only if every vertex has even degree.
:::

::: proof
($\Rightarrow$) Follow the circuit. Each time it passes through a vertex it uses two edges there, one in and one out, and the start and end at the first vertex pair up in the same way. Since every edge is used once, each degree is even.

($\Leftarrow$) Suppose all degrees are even. First a claim: *if all degrees of a multigraph $H$ are even and $u$ has positive degree, then a trail started at $u$ and continued along unused edges for as long as possible ends at $u$.* Indeed, whenever the trail enters a vertex $w \ne u$, it has used an odd number of the edges at $w$ (two for each earlier visit, plus one), so as $\deg_H(w)$ is even an unused edge remains and the trail can continue. As there are finitely many edges the trail stops, so it stops at $u$: it is a closed trail.

Now let $C$ be a closed trail in $G$ of maximum length (one exists by the claim). Suppose $C$ misses some edge. Some unused edge is incident with a vertex of $C$: if an unused edge has no endpoint on $C$, a path from a vertex of $C$ to it, which exists by connectivity, contains a first edge leaving the vertices of $C$, and that edge is unused. Let $u$ be a vertex of $C$ with an unused edge. In the multigraph $H$ of unused edges every degree is even, because $C$ uses an even number of edges at each vertex. By the claim there is a closed trail $C'$ in $H$ starting at $u$. Inserting $C'$ into $C$ at a visit to $u$ gives a closed trail longer than $C$, a contradiction. So $C$ uses every edge: it is an Euler circuit.
:::

The proof is an efficient algorithm (Hierholzer's): walk until stuck, then splice in detours at vertices that still have unused edges. It runs in time $O(m)$.

::: corollary Euler trails {#cor-euler-trail}
A connected multigraph has an Euler trail that is not closed if and only if exactly two vertices have odd degree; the trail then starts at one of them and ends at the other.
:::

::: proof
If such a trail runs from $u$ to $v \ne u$, every visit to an inner vertex uses two edges, while $u$ and $v$ each have one extra edge; so exactly $u$ and $v$ have odd degree. Conversely, if exactly $u$ and $v$ have odd degree, add a new edge $uv$ (a parallel edge if necessary). Now every degree is even and [[#thm-euler-circuit]] gives an Euler circuit; deleting the new edge from it leaves an Euler trail from $u$ to $v$.
:::

::: example Königsberg and the house of Nikolaus {#ex-euler}
(a) Is there a walk crossing each bridge of Königsberg exactly once? (b) Can the "house of Nikolaus" — a square $BL, BR, TR, TL$ (bottom left, bottom right, top right, top left) with both diagonals and a roof $TL, R, TR$ — be drawn in one stroke without lifting the pen?
::: solution
(a) The four land masses have degrees $5, 3, 3, 3$: four odd vertices. By [[#thm-euler-circuit]] and [[#cor-euler-trail]] there is no Euler circuit and no Euler trail, so no such walk exists.

(b) The degrees are $\deg(BL) = \deg(BR) = 3$, $\deg(TL) = \deg(TR) = 4$ and $\deg(R) = 2$. Exactly two vertices are odd, so an Euler trail exists, and it must start at one bottom corner and end at the other. For example

$$
BL,\ BR,\ TL,\ TR,\ R,\ TL,\ BL,\ TR,\ BR
$$

uses all eight edges once each.
:::
:::

::: widget graph
nodes: 1@0,2; 2@-1.73,-1; 3@1.73,-1; 4@0,-0.45; 5@0.39,0.23; 6@-0.39,0.23
edges: 1-2; 2-3; 3-1; 4-5; 5-6; 6-4; 4-2; 4-3; 5-3; 5-1; 6-1; 6-2
algorithm: euler
start: 1
caption: The octahedron: every vertex has degree $4$, so an Euler circuit exists. Step through Hierholzer's method — the walk starts at $1$, closes up, and detours are spliced in where unused edges remain. Each visit to a vertex uses two of its four edges, so every vertex is visited twice.
:::

::: application Covering every street
A snowplough must cover every street; if the street graph has odd vertices some streets must be repeated, and choosing which at least cost is the *Chinese postman problem*. Euler trails also appear in genome assembly, where a DNA sequence is rebuilt as an Euler trail through a graph of overlapping fragments.
:::

## Hamilton cycles

::: definition Hamilton cycles {#def-hamilton}
A **Hamilton cycle** in a graph is a cycle that passes through every vertex; a **Hamilton path** is a path through every vertex. A graph with a Hamilton cycle is **Hamiltonian**.
:::

The name recalls William Rowan Hamilton's 1857 puzzle asking for a round trip through the twenty vertices of a dodecahedron. $K_n$ ($n \ge 3$) is Hamiltonian, and so is $Q_d$ ($d \ge 2$): a *Gray code* such as $000, 001, 011, 010, 110, 111, 101, 100$ lists the strings so that consecutive ones, and also the last and the first, differ in one bit. Unlike Euler's problem there is no simple test, but there is a simple obstruction.

::: proposition A necessary condition {#prop-ham-necessary}
If $G$ is Hamiltonian, then for every non-empty set $S$ of vertices the graph $G - S$ has at most $\abs{S}$ components.
:::

::: proof
Let $C$ be a Hamilton cycle. Deleting one vertex from a cycle leaves a path, and deleting each further vertex splits at most one piece into two, so deleting the vertices of $S$ from $C$ leaves at most $\abs{S}$ paths. These paths contain every vertex of $G - S$, and each lies inside one component of $G - S$, so $G - S$ has at most $\abs{S}$ components.
:::

For example, $K_{2,3}$ is not Hamiltonian: deleting the two vertices of the smaller side leaves three isolated vertices. The condition is not sufficient: the Petersen graph satisfies it for every $S$, yet has no Hamilton cycle (a fact checked by a case analysis or by computer). Sufficient conditions demand many edges at every vertex.

::: theorem Dirac's theorem {#thm-dirac}
If $G$ has $n \ge 3$ vertices and every vertex has degree at least $n/2$, then $G$ has a Hamilton cycle.
:::

::: proof
*$G$ is connected:* two non-adjacent vertices $u, v$ have their neighbours among the other $n - 2$ vertices, and $\abs{N(u)} + \abs{N(v)} \ge n > n - 2$, so they have a common neighbour.

Let $P = v_1, v_2, \dots, v_k$ be a longest path in $G$. Every neighbour of $v_1$ lies on $P$, since otherwise $P$ could be extended at that end; similarly for $v_k$. As $\deg(v_1) \ge 2$, we have $k \ge 3$.

*There is a cycle through $v_1, \dots, v_k$.* Consider the sets of indices

$$
I = \set{i : v_1v_{i+1} \in E}, \qquad J = \set{i : v_iv_k \in E},
$$

both subsets of $\{1, \dots, k-1\}$, with $\abs{I} = \deg(v_1) \ge n/2$ and $\abs{J} = \deg(v_k) \ge n/2$. Since $\abs{I} + \abs{J} \ge n > k - 1$, some index $i$ lies in both. Then

$$
v_1, v_2, \dots, v_i, v_k, v_{k-1}, \dots, v_{i+1}, v_1
$$

is a cycle through all $k$ vertices of $P$: it runs along $P$ to $v_i$, jumps to $v_k$, runs back along $P$ to $v_{i+1}$ and returns to $v_1$.

*This cycle is Hamiltonian.* If $k < n$, some vertex $w$ off the cycle is adjacent to a vertex $v_j$ on it, by connectivity. Starting at $w$, stepping to $v_j$ and going once round the cycle gives a path with $k + 1$ vertices, contradicting the maximality of $P$. So $k = n$.
:::

Apart from connectivity and $k \ge 3$, the proof only used $\deg(v_1) + \deg(v_k) \ge n$ for the ends of a longest path when they are non-adjacent (if they are adjacent, $P$ closes up at once); and the condition below also forces connectivity, since non-adjacent vertices in different components have degree sum at most $n - 2$. This gives **Ore's theorem** (1960): if $\deg(u) + \deg(v) \ge n \ge 3$ for every pair of non-adjacent vertices $u, v$, then $G$ is Hamiltonian. The bound $n/2$ in Dirac's theorem cannot be lowered ([[#exr-dirac-sharp]]).

::: quiz
Which graph has an Euler circuit but no Hamilton cycle?
- [x] Two triangles sharing one vertex
- [ ] $K_4$
- [ ] $C_5$
- [ ] $K_{2,3}$
::: solution
Two triangles sharing a vertex have degrees $4, 2, 2, 2, 2$, so an Euler circuit exists; but deleting the shared vertex leaves two components, so by [[#prop-ham-necessary]] there is no Hamilton cycle. $K_4$ is Hamiltonian but has odd degrees; $C_5$ has both; $K_{2,3}$ has neither (it has two odd vertices, and fails the condition of [[#prop-ham-necessary]]).
:::
:::

::: remark Easy and hard problems
Every algorithm in this chapter runs in time polynomial in $n$ and $m$. No such algorithm is known for deciding whether a graph is Hamiltonian, or for the *travelling salesman problem* of finding a cheapest Hamilton cycle. The first is **NP-complete** and the second at least as hard: a polynomial-time algorithm for either would give one for thousands of other problems and settle the question "P = NP?", one of the Clay Mathematics Institute's Millennium Prize Problems. In practice such problems are attacked with clever exact methods and with heuristics that find good, if not optimal, tours.
:::

::: history
Leonhard Euler's paper on the Königsberg bridges (presented to the St Petersburg Academy in 1735, published in 1741) showed that such a walk needs at most two land masses with an odd number of bridges. He stated the converse without proof; Carl Hierholzer's proof appeared in 1873, after his death. Minimum spanning trees were first studied by Otakar Borůvka in 1926, for an electricity network in Moravia. Vojtěch Jarník found "Prim's" algorithm in 1930; Joseph Kruskal published his in 1956, Robert Prim rediscovered Jarník's in 1957, and Edsger Dijkstra's 1959 paper gave it again together with his shortest-path algorithm. Gabriel Dirac proved his theorem in 1952, and in 1972 Richard Karp put the Hamilton cycle problem on his list of twenty-one NP-complete problems.
:::

## Where this leads

In [[discrete/colouring-planarity]], matching turns out to have fast algorithms built on augmenting paths, while colouring with three colours is NP-complete. Network flows, sending as much as possible from a source to a sink through edges of limited capacity, lead to the max-flow min-cut theorem, and random walks on graphs are the Markov chains of [[probability/markov-chains]].

::: summary
- Store sparse graphs as adjacency lists (size $O(n + m)$); BFS and DFS explore a component in time $O(n + m)$.
- BFS processes vertices in layers using a queue and computes distances in unweighted graphs ([[#thm-bfs]]); DFS goes deep first, and every non-tree edge joins a vertex to an ancestor ([[#lem-dfs]]).
- A directed graph has a topological ordering exactly when it has no directed cycle; repeatedly removing a source finds one ([[#thm-topo]]).
- Dijkstra's algorithm settles vertices in order of distance and is correct for non-negative weights ([[#thm-dijkstra]]); negative weights break it.
- The cut property — a cheapest edge across a cut can always be added — proves both Prim's and Kruskal's minimum spanning tree algorithms correct ([[#thm-cut-property]]).
- A connected multigraph has an Euler circuit if and only if all degrees are even, and an Euler trail if and only if at most two degrees are odd ([[#thm-euler-circuit]]).
- Hamilton cycles have no known efficient test; Dirac's theorem ($\delta(G) \ge n/2$) is a sufficient condition, and deleting $k$ vertices into more than $k$ pieces is an obstruction.
:::

## Exercises

::: exercise Distances in the Petersen graph {level=1 check="6"}
In the Petersen graph (vertices the $2$-element subsets of $\{1, \dots, 5\}$, adjacent when disjoint), run BFS from $\{1,2\}$. How many vertices are at distance $2$?
::: solution
The neighbours of $\{1,2\}$ are the three pairs inside $\{3,4,5\}$. The other six vertices are the pairs meeting $\{1,2\}$ in one element, such as $\{1,3\}$; each is at distance $2$, because a pair inside $\{3,4,5\} \setminus \{3\}$, here $\{4,5\}$, is disjoint from both. So the layers have sizes $1, 3, 6$: there are $6$ vertices at distance $2$, and the graph has diameter $2$.
:::
:::

::: exercise A shortest path {level=1 check="8"}
A weighted graph has vertices $S, A, B, C, D, T$ and edges $SA\,(3)$, $SB\,(1)$, $AB\,(1)$, $AC\,(4)$, $BC\,(6)$, $BD\,(5)$, $CD\,(1)$, $CT\,(2)$, $DT\,(6)$. Use Dijkstra's algorithm to find $d(S, T)$.
::: solution
Settle $S\,(0)$: $A = 3$, $B = 1$. Settle $B\,(1)$: $A = \min(3, 2) = 2$, $C = 7$, $D = 6$. Settle $A\,(2)$: $C = \min(7, 6) = 6$. Settle $C\,(6)$ (tied with $D$; either may go first): $D$ stays $\min(6, 7) = 6$, $T = 8$. Settle $D\,(6)$: $T$ stays $\min(8, 12) = 8$. Settle $T\,(8)$. So $d(S,T) = 8$, along $S, B, A, C, T$.
:::
:::

::: exercise A minimum spanning tree {level=1 check="9"}
Find the weight of a minimum spanning tree of the graph in the previous exercise.
::: solution
Kruskal: the three edges of weight $1$ ($SB$, $AB$, $CD$) create no cycle; add $CT\,(2)$; reject $SA\,(3)$ (cycle $S, A, B$); add $AC\,(4)$, which joins $\{S, A, B\}$ to $\{C, D, T\}$. That is $5 = n - 1$ edges, of total weight $1 + 1 + 1 + 2 + 4 = 9$.
:::
:::

::: exercise Euler circuits in complete graphs {level=1}
For which $n \ge 2$ does $K_n$ have an Euler circuit? For which $r, s \ge 1$ does $K_{r,s}$?
::: solution
Both graphs are connected, so by [[#thm-euler-circuit]] we only need all degrees even. $K_n$ is $(n-1)$-regular, so it has an Euler circuit exactly when $n$ is odd. In $K_{r,s}$ the vertices on one side have degree $s$ and those on the other side degree $r$, so we need $r$ and $s$ both even.
:::
:::

::: exercise A ring of dominoes {level=2}
A standard set has $28$ dominoes, one for each pair $\{i, j\}$ with $0 \le i \le j \le 6$ (including the doubles $\{i, i\}$). Can all of them be laid in a closed ring in which touching ends show the same number?
::: solution
Make a multigraph with vertices $0, 1, \dots, 6$ and an edge $ij$ for each domino (a loop for each double). A ring is exactly an Euler circuit: consecutive dominoes share a number, as consecutive edges of a trail share a vertex. The multigraph is connected, and each vertex $i$ has six edges to the other numbers plus a loop counting $2$, so degree $8$. All degrees are even, so an Euler circuit — and hence a ring — exists.
:::
:::

::: exercise Hamiltonian complete bipartite graphs {level=2}
Prove that $K_{r,s}$ has a Hamilton cycle if and only if $r = s \ge 2$.
::: solution
A cycle in a bipartite graph alternates between the two sides, so a Hamilton cycle contains equally many vertices from each side: $r = s$. Also a cycle has at least $3$ vertices, which rules out $r = s = 1$. Conversely, if $r = s \ge 2$ with sides $\{x_1, \dots, x_r\}$ and $\{y_1, \dots, y_r\}$, then $x_1, y_1, x_2, y_2, \dots, x_r, y_r, x_1$ is a Hamilton cycle, since every $x_i$ is adjacent to every $y_j$.
:::
:::

::: exercise Dirac's bound is sharp {#exr-dirac-sharp level=2}
For each odd $n = 2k + 1 \ge 3$, give a graph with $n$ vertices and minimum degree $(n - 1)/2$ that has no Hamilton cycle.
::: solution
Take $K_{k,k+1}$. It has $2k + 1 = n$ vertices; the vertices on the larger side have degree $k$ and those on the smaller side degree $k + 1$, so $\delta = k = (n-1)/2$. Deleting the $k$ vertices of the smaller side leaves $k + 1$ isolated vertices, so by [[#prop-ham-necessary]] there is no Hamilton cycle (alternatively, use the previous exercise).
:::
:::

::: exercise Distinct weights give a unique tree {#exr-unique-mst level=3}
Prove that if all edge weights of a connected graph are distinct, it has exactly one minimum spanning tree.
::: hint
Suppose $T \ne T'$ are both minimum. Look at the lightest edge that belongs to exactly one of them.
:::
::: solution
Suppose $T \ne T'$ are minimum spanning trees. Since the weights are distinct, there is a unique lightest edge $e$ among the edges lying in exactly one of $T$, $T'$; say $e \in T \setminus T'$. Adding $e$ to $T'$ creates a cycle $C$ (the path in $T'$ between the endpoints of $e$, plus $e$). Not all edges of $C$ lie in $T$, because $T$ is acyclic; let $f \in C$ be an edge not in $T$. Then $f \in T' \setminus T$ and $f \ne e$, so by the choice of $e$, $w(f) > w(e)$. The graph $T' + e - f$ is connected (deleting $f$, which lies on the cycle $C$, does not disconnect $T' + e$) and has $n - 1$ edges, so it is a spanning tree, of weight $w(T') + w(e) - w(f) < w(T')$. This contradicts the minimality of $T'$.
:::
:::

::: exercise Unique topological orderings {level=3}
Prove that a directed acyclic graph has exactly one topological ordering if and only if it has a directed Hamilton path.
::: hint
If $v_1, \dots, v_n$ is the unique ordering, what happens when you swap $v_i$ and $v_{i+1}$?
:::
::: solution
($\Leftarrow$) Let $v_1 \to v_2 \to \dots \to v_n$ be a directed Hamilton path. In any topological ordering each $v_i$ precedes $v_{i+1}$, so the ordering must be $v_1, \dots, v_n$; and a DAG has at least one ordering ([[#thm-topo]]), so there is exactly one.

($\Rightarrow$) Let $v_1, \dots, v_n$ be the unique topological ordering, and suppose that for some $i$ there is no arc $v_i \to v_{i+1}$. There is no arc $v_{i+1} \to v_i$ either, since it would go backwards. Swapping $v_i$ and $v_{i+1}$ changes the relative order of this pair only, so every arc still goes forwards and we get a second topological ordering — a contradiction. Hence $v_i \to v_{i+1}$ is an arc for every $i$, and $v_1 \to \dots \to v_n$ is a directed Hamilton path.
:::
:::
