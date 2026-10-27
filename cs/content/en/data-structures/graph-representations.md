A navigation app must find a route through a road network of tens of millions of junctions. A social network suggests "people you may know" from the friends of your friends. A build system decides which files to recompile after a change, a compiler allocates registers by colouring a graph of variables that are live at the same time, and a search engine ranks pages by following hyperlinks. All of these work on **graphs** — sets of objects joined by pairwise connections — and the first decision in every one of them is how to store the graph in memory. That decision, between an **adjacency matrix** and **adjacency lists** (and a few variants), determines how much memory the program needs and how fast it can answer the two basic questions every graph algorithm asks: *is there an edge from $u$ to $v$?* and *what are the neighbours of $u$?*

This chapter introduces the vocabulary of graphs that the rest of computer science uses, presents the standard representations with the exact cost of each basic operation, and shows why, for the sparse graphs that occur in practice, adjacency lists let graph search run in time linear in the size of the graph. The algorithms themselves — breadth-first and depth-first search, shortest paths, spanning trees, flows — belong to [[algorithms]]; here we lay the ground they run on. The mathematics of graphs is developed in [Maths Atlas: graphs](/learn/maths/lesson.php?c=discrete&l=graphs).

## Graph terminology

::: definition Graph {#def-graph}
A **graph** $G = (V, E)$ consists of a finite set $V$ of **vertices** (or nodes) and a set $E$ of **edges**. In an **undirected** graph each edge is an unordered pair $\set{u, v}$ of distinct vertices; in a **directed graph** (digraph) each edge is an ordered pair $(u, v)$, an **arc** from $u$ to $v$ (and $u = v$, a **self-loop**, may be allowed). We write $n = \lvert V\rvert$ and $m = \lvert E\rvert$. A **weighted** graph also has a function $w\colon E \to \R$ giving each edge a weight (a length, cost or capacity).
:::

The vocabulary:

- In an undirected graph, $u$ and $v$ are **adjacent** (neighbours) if $\set{u, v} \in E$; the **degree** $\deg(v)$ is the number of neighbours of $v$. In a digraph, the **out-degree** of $v$ is the number of arcs leaving it and the **in-degree** the number entering it.
- A **path** is a sequence of vertices $v_0, v_1, \dots, v_k$ in which consecutive vertices are joined by edges (arcs, in a digraph, all in the forward direction); its **length** is $k$, the number of edges. It is **simple** if no vertex repeats. A **cycle** is a path of length at least $1$ (at least $3$ in an undirected graph) that returns to its start, with no other repetition. A sequence with possible repetitions is a **walk**.
- An undirected graph is **connected** if every pair of vertices is joined by a path; its maximal connected subgraphs are its **connected components**. A connected graph without cycles is a **tree** ([[data-structures/trees]]); a digraph without directed cycles is a **directed acyclic graph** (DAG).

Graphs in this chapter are **simple** — no self-loops (unless stated, in digraphs) and no repeated edges — so an undirected graph has at most $\binom n2 = n(n-1)/2$ edges and a digraph at most $n(n-1)$ arcs (or $n^2$ with self-loops). A graph is called **dense** if $m$ is close to that maximum, $\Theta(n^2)$, and **sparse** if $m$ is much smaller, typically $O(n)$ or $O(n\log n)$. Most graphs met in practice are sparse: a road junction has a handful of roads, a person a few hundred friends out of billions of people, a web page dozens of links.

::: proposition Handshaking lemma {#prop-handshake}
In an undirected graph, $\sum_{v \in V}\deg(v) = 2m$. In a directed graph, $\sum_{v}\text{out-degree}(v) = \sum_v \text{in-degree}(v) = m$.
:::

::: proof
Each undirected edge $\set{u, v}$ contributes exactly $1$ to $\deg(u)$ and $1$ to $\deg(v)$, so it is counted exactly twice in the sum. Each arc $(u, v)$ contributes $1$ to the out-degree of $u$ and $1$ to the in-degree of $v$.
:::

This little identity is behind every linear-time bound in graph algorithms: an algorithm that does $O(1 + \deg(v))$ work at each vertex $v$ does $O(n + m)$ work in total. (A consequence worth knowing: the number of vertices of odd degree is always even.)

## The adjacency matrix

::: definition Adjacency matrix {#def-adj-matrix}
Number the vertices $0, \dots, n-1$. The **adjacency matrix** of $G$ is the $n \times n$ matrix $A$ with $A[u][v] = 1$ if there is an edge from $u$ to $v$ and $A[u][v] = 0$ otherwise. For an undirected graph $A$ is symmetric with zero diagonal. For a weighted graph one stores $w(u, v)$ in place of $1$, and a sentinel such as $\infty$ (or `None`) where there is no edge.
:::

Testing whether $u$ and $v$ are adjacent is a single array access, $O(1)$; adding or removing an edge is $O(1)$. But listing the neighbours of $u$ means scanning the whole row, $\Theta(n)$ time *however few neighbours $u$ has*, and the matrix occupies $\Theta(n^2)$ space whatever $m$ is. A matrix of bits, packed $64$ to a word, uses $n^2/8$ bytes.

::: widget relation
set: 0; 1; 2; 3; 4
pairs: 0,1; 1,0; 0,2; 2,0; 1,2; 2,1; 1,3; 3,1; 3,4; 4,3
view: properties
name: E
caption: The graph of [[#ex-two-reps]] as a relation $E$ on $\set{0,1,2,3,4}$: the 0–1 matrix *is* its adjacency matrix, and the diagram is the graph, with each undirected edge drawn as a pair of arcs. The relation is symmetric (an undirected graph) and irreflexive (no self-loops). Click an entry to add or remove an arc and watch symmetry fail: you have made a directed graph. Row $u$ lists the neighbours of $u$; a row sum is a degree.
:::

The matrix view also connects graphs to linear algebra. Powers of $A$ count walks:

::: theorem Powers of the adjacency matrix count walks {#thm-walks}
For every $k \ge 1$, the entry $(A^k)[u][v]$ is the number of walks of length $k$ from $u$ to $v$.
:::

::: proof
By induction on $k$. For $k = 1$, $A[u][v]$ is $1$ exactly when there is a walk of length $1$ (an edge) from $u$ to $v$. For $k \ge 1$, every walk of length $k+1$ from $u$ to $v$ consists of a walk of length $k$ from $u$ to some vertex $x$ followed by an edge from $x$ to $v$, and different choices of $x$ or of the first part give different walks. So the number of such walks is

$$
\sum_{x} (A^k)[u][x]\cdot A[x][v] = (A^k A)[u][v] = (A^{k+1})[u][v],
$$

using the induction hypothesis for the first factor and the definition of matrix multiplication.
:::

In particular, for an undirected graph, $(A^2)[v][v] = \deg(v)$ (walks out along an edge and back), and the trace of $A^3$ is $6$ times the number of triangles, since each triangle gives a closed walk of length $3$ from each of its $3$ vertices in each of $2$ directions. Computing $A^k$ costs matrix multiplications, $\Theta(n^3)$ each by the obvious method — fine for small dense graphs, hopeless for a road network. Linear algebra on graphs (spectral methods, PageRank) is developed in [Maths Atlas: linear algebra](/learn/maths/lesson.php?c=linear-algebra&l=matrices) and [[information-retrieval]].

## Adjacency lists

::: definition Adjacency lists {#def-adj-list}
The **adjacency-list** representation of $G$ stores, for each vertex $u$, a list $\mathit{adj}[u]$ of the vertices $v$ such that there is an edge from $u$ to $v$ (with the weight $w(u, v)$ alongside $v$ in a weighted graph). In an undirected graph each edge $\set{u, v}$ appears twice, as $v$ in $\mathit{adj}[u]$ and as $u$ in $\mathit{adj}[v]$. The lists are held in an array indexed by vertex (or a hash map keyed by vertex name).
:::

By [[#prop-handshake]], the lists contain $2m$ entries in an undirected graph and $m$ in a digraph, so the representation takes $\Theta(n + m)$ space — one slot per vertex plus one per edge end. Listing the neighbours of $u$ takes $\Theta(\deg(u))$ time, the best possible. The price is the edge test: deciding whether $v \in \mathit{adj}[u]$ means scanning the list, $O(\deg(u))$.

::: example Two representations of one graph {#ex-two-reps}
Build both representations of the undirected graph with vertices $0, \dots, 4$ and edges $\set{0,1}, \set{0,2}, \set{1,2}, \set{1,3}, \set{3,4}$, and check the handshaking lemma.
::: solution
```python
edges = [(0, 1), (0, 2), (1, 2), (1, 3), (3, 4)]   # an undirected graph
n = 5

# adjacency matrix: n x n, entry 1 where there is an edge
matrix = [[0] * n for _ in range(n)]       # n separate rows (see the warning below)
for u, v in edges:
    matrix[u][v] = matrix[v][u] = 1

# adjacency lists: one list of neighbours per vertex
adj = [[] for _ in range(n)]
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)

for row in matrix:
    print(row)
print(adj)
print("degrees:", [len(nbrs) for nbrs in adj], "sum =", sum(map(len, adj)))
```

```console
$ python3 reps.py
[0, 1, 1, 0, 0]
[1, 0, 1, 1, 0]
[1, 1, 0, 0, 0]
[0, 1, 0, 0, 1]
[0, 0, 0, 1, 0]
[[1, 2], [0, 2, 3], [0, 1], [1, 4], [3]]
degrees: [2, 3, 2, 2, 1] sum = 10
```

The matrix has $25$ entries of which $10$ are $1$; the lists hold exactly those $10$ entries, two per edge. The degrees sum to $10 = 2m$, as [[#prop-handshake]] says. Vertex $1$'s row in the matrix and its list `[0, 2, 3]` carry the same information; the list omits the zeros.
:::
:::

::: warning Building a matrix with `[[0] * n] * n`
In Python, `[[0] * n] * n` does **not** create $n$ rows: it creates *one* row and a list of $n$ references to it. Setting `m[0][1] = 1` then sets column $1$ of every row:

```python
m = [[0] * 3] * 3
m[0][1] = 1
print(m)
```

```console
[[0, 1, 0], [0, 1, 0], [0, 1, 0]]
```

Use `[[0] * n for _ in range(n)]`, which evaluates `[0] * n` afresh for each row. (The inner `[0] * n` is safe because integers are immutable.) The same trap catches `[[]] * n` for adjacency lists.
:::

### Variations

**Adjacency sets.** Replacing each list by a hash set ([[data-structures/hash-tables]]) makes the edge test $O(1)$ expected while keeping $\Theta(n + m)$ space and $\Theta(\deg(u))$ neighbour iteration, at the cost of a larger constant per entry and losing a fixed neighbour order. In Python, a `dict` mapping each vertex to a `set` of neighbours is a flexible general-purpose representation that also allows vertices with arbitrary names and fast deletion of edges.

**Edge lists.** Simply a list of the $m$ edges, as in the `edges` variable above. It is the natural input format and suits algorithms that process edges in some order — Kruskal's minimum spanning tree algorithm sorts the edges by weight — but it answers neither basic question quickly.

**Compressed sparse row (CSR).** For large graphs that do not change, the adjacency lists can be packed into two arrays: `targets`, holding all the lists one after another, and `offsets`, where `offsets[u]` is the position at which $u$'s list starts, so that the neighbours of $u$ are `targets[offsets[u]:offsets[u+1]]`. This uses $n + 1 + m$ integers with no per-list overhead and perfect locality, which is why scientific computing, graph-analytics libraries and sparse matrix codes use it.

::: example Building CSR and reversing a digraph {#ex-csr}
Convert the digraph with arcs $(0,1), (0,2), (1,2), (2,0), (2,3), (3,3)$ on vertices $0..3$ to CSR form, then compute its **transpose** (all arcs reversed) in $O(n + m)$ time.
::: solution
Counting out-degrees gives $2, 1, 2, 1$; prefix sums give `offsets = [0, 2, 3, 5, 6]`; then each arc is written into the next free slot of its row.

```python
def to_csr(n, arcs):
    """Compressed sparse row form of a directed graph with vertices 0..n-1."""
    offsets = [0] * (n + 1)
    for u, _ in arcs:
        offsets[u + 1] += 1               # count the out-degree of each vertex
    for u in range(n):
        offsets[u + 1] += offsets[u]      # prefix sums: where each row starts
    targets = [None] * len(arcs)
    fill = offsets[:]                     # next free slot in each row
    for u, v in arcs:
        targets[fill[u]] = v
        fill[u] += 1
    return offsets, targets

def reverse(n, offsets, targets):         # the transpose graph, in O(n + m)
    arcs = [(targets[i], u) for u in range(n)
            for i in range(offsets[u], offsets[u + 1])]
    return to_csr(n, arcs)

arcs = [(0, 1), (0, 2), (1, 2), (2, 0), (2, 3), (3, 3)]
off, tgt = to_csr(4, arcs)
print(off, tgt)
print("out-neighbours of 2:", tgt[off[2]:off[3]])
print(reverse(4, off, tgt))
```

```console
$ python3 csr.py
[0, 2, 3, 5, 6] [1, 2, 2, 0, 3, 3]
out-neighbours of 2: [0, 3]
([0, 1, 2, 4, 6], [2, 0, 0, 1, 2, 3])
```

In the transpose, vertex $2$'s in-neighbours $0$ and $1$ become its out-neighbours (`targets[2:4] = [0, 1]`), and the self-loop at $3$ stays. Each function makes a constant number of passes over the $n$ vertices and $m$ arcs, so both run in $\Theta(n + m)$. With an adjacency matrix the transpose is the matrix transpose, $\Theta(n^2)$. The transpose is needed, for instance, by the strongly-connected-components algorithm in [[algorithms]].
:::
:::

## Costs compared

For a graph with $n$ vertices and $m$ edges (in-degree and out-degree are the same as degree for undirected graphs):

| operation | adjacency matrix | adjacency lists | adjacency sets (hashing) |
|---|---|---|---|
| space | $\Theta(n^2)$ | $\Theta(n + m)$ | $\Theta(n + m)$ |
| is $(u, v)$ an edge? | $O(1)$ | $O(\deg(u))$ | $O(1)$ expected |
| list neighbours of $u$ | $\Theta(n)$ | $\Theta(\deg(u))$ | $\Theta(\deg(u))$ |
| add an edge | $O(1)$ | $O(1)$ amortised | $O(1)$ expected amortised |
| remove an edge | $O(1)$ | $O(\deg(u) + \deg(v))$ | $O(1)$ expected |
| add a vertex | $\Theta(n^2)$ (rebuild) or $\Theta(n)$ amortised with spare capacity | $O(1)$ amortised | $O(1)$ amortised |
| visit every edge | $\Theta(n^2)$ | $\Theta(n + m)$ | $\Theta(n + m)$ |

The last row is the important one. Graph search algorithms process each vertex once and examine all its neighbours, so their running time is set by the cost of neighbour iteration.

::: theorem Graph search in linear time {#thm-search-cost}
Breadth-first search from a vertex $s$, implemented with a queue and an array of distances, runs in $\Theta(n + m)$ time with adjacency lists and in $\Theta(n^2)$ time with an adjacency matrix, in the worst case (when every vertex is reachable from $s$).
:::

::: proof
Each vertex is enqueued at most once — when it is first discovered, at which point its distance is set and it is never enqueued again — and so dequeued at most once. When a vertex $u$ is dequeued, the algorithm examines its neighbours. With adjacency lists this costs $\Theta(1 + \deg(u))$ (out-degree, for a digraph); summing over all vertices and using [[#prop-handshake]], at most $\sum_u (1 + \deg(u)) = n + 2m$ (or $n + m$), plus $\Theta(n)$ to initialise the distance array: $\Theta(n + m)$ when all vertices are reachable. With a matrix, examining the neighbours of $u$ means scanning its row, $\Theta(n)$ regardless of its degree, so the $n$ dequeued vertices cost $\Theta(n^2)$.
:::

Since $m \le n^2$, $\Theta(n + m)$ is never worse than $\Theta(n^2)$ asymptotically, and for sparse graphs it is far better. Here are the two versions side by side (BFS itself is explained in [[data-structures/stacks-queues]], where the figure animated it, and analysed fully in [[algorithms]]):

```python
from collections import deque

def bfs_distances(adj, s):
    """Edge-count distances from s; adj[u] lists the neighbours of u."""
    dist = [None] * len(adj)
    dist[s] = 0
    q = deque([s])
    while q:
        u = q.popleft()
        for v in adj[u]:              # examined once per edge end: deg(u) steps
            if dist[v] is None:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist

def bfs_distances_matrix(matrix, s):
    n = len(matrix)
    dist = [None] * n
    dist[s] = 0
    q = deque([s])
    while q:
        u = q.popleft()
        for v in range(n):            # scans a whole row: n steps per vertex
            if matrix[u][v] and dist[v] is None:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist

adj = [[1, 2], [0, 2, 3], [0, 1], [1, 4], [3]]
matrix = [[1 if v in adj[u] else 0 for v in range(5)] for u in range(5)]
print(bfs_distances(adj, 0), bfs_distances_matrix(matrix, 0))
```

```console
$ python3 bfs.py
[0, 1, 1, 2, 3] [0, 1, 1, 2, 3]
```

To see the difference, time both on a random sparse graph with $n = 4000$ vertices and $m = 8000$ edges (using the two functions above):

```python
import random, time

random.seed(9)
n, m = 4000, 8000
adj = [[] for _ in range(n)]
for _ in range(m):                        # a random sparse graph
    u, v = random.randrange(n), random.randrange(n)
    adj[u].append(v)
    adj[v].append(u)
matrix = [[0] * n for _ in range(n)]
for u in range(n):
    for v in adj[u]:
        matrix[u][v] = 1

for name, f, g in [("lists", bfs_distances, adj), ("matrix", bfs_distances_matrix, matrix)]:
    t = time.perf_counter()
    d = f(g, 0)
    print(f"{name:6}: {time.perf_counter() - t:.4f} s, reached {sum(x is not None for x in d)} vertices")
```

One run on the author's machine (2026; an observation, your times will differ) printed

```console
lists : 0.0012 s, reached 3918 vertices
matrix: 0.5107 s, reached 3918 vertices
```

The list version examined about $n + 2m = 20\,000$ entries, the matrix version about $3918 \times 4000 \approx 1.6\times10^7$, a ratio of about $800$; the measured ratio, about $400$, is smaller because scanning a row of a matrix is a simpler inner loop than following a list. (The random graph happens to leave $82$ vertices unreachable from $0$.)

::: widget graph
nodes: 0@0,1; 1@1,1; 2@0.5,0; 3@2,1; 4@3,1
edges: 0-1; 0-2; 1-2; 1-3; 3-4
algorithm: bfs
start: 0
caption: Breadth-first search on the graph of [[#ex-two-reps]]. Each time a vertex is taken from the queue, the algorithm looks at its neighbours: with adjacency lists that is $\deg(u)$ entries — $2$, $3$, $2$, $2$, $1$, ten in all — while a matrix would scan all $5$ entries of each row, $25$ in all. The distances found, $0, 1, 1, 2, 3$, match the program above.
:::

::: example Choosing a representation {#ex-choose}
A road network has $n = 2\times10^7$ junctions and $m = 5\times 10^7$ road segments. Estimate the memory needed by (a) an adjacency matrix of bits and (b) adjacency lists in CSR form with 4-byte vertex numbers and 4-byte weights. Which would you use for a route planner?
::: solution
(a) $n^2 = 4\times10^{14}$ bits $= 5\times10^{13}$ bytes $= 50$ TB, and with weights (4 bytes each) $1.6$ PB — far beyond any single machine as of 2026, and almost all of it zeros: the fraction of non-zero entries is $2m/n^2 = 2.5\times10^{-7}$.

(b) Each undirected segment is stored twice, so there are $2m = 10^8$ list entries of $8$ bytes (target and weight): $800$ MB, plus $n + 1$ offsets of $4$ bytes, $80$ MB. In all about $880$ MB, which fits in the memory of an ordinary computer.

Adjacency lists (in CSR form, since roads change rarely) are the only sensible choice. The edge test "is there a road from $u$ to $v$?" is not what a route planner asks anyway: Dijkstra's algorithm ([[data-structures/heaps]]) only ever iterates over neighbours.
:::
:::

::: example Counting walks and triangles {#ex-walks}
For the graph of [[#ex-two-reps]], compute $A^2$ and $A^3$. How many walks of length $3$ go from $0$ to $3$, and how many triangles does the graph have?
::: solution
```python
def mat_mult(X, Y):
    n = len(X)
    return [[sum(X[i][k] * Y[k][j] for k in range(n)) for j in range(n)]
            for i in range(n)]

A = [[0, 1, 1, 0, 0],
     [1, 0, 1, 1, 0],
     [1, 1, 0, 0, 0],
     [0, 1, 0, 0, 1],
     [0, 0, 0, 1, 0]]
A2 = mat_mult(A, A)
A3 = mat_mult(A2, A)
for row in A2:
    print(row)
print("walks of length 3 from 0 to 3:", A3[0][3])
print("triangles:", sum(A3[i][i] for i in range(5)) // 6)
```

```console
$ python3 walks.py
[2, 1, 1, 1, 0]
[1, 3, 1, 0, 1]
[1, 1, 2, 1, 0]
[1, 0, 1, 2, 0]
[0, 1, 0, 0, 1]
walks of length 3 from 0 to 3: 1
triangles: 1
```

The diagonal of $A^2$ is the degree sequence $2, 3, 2, 2, 1$. $(A^2)[0][3] = 1$ counts the single walk $0, 1, 3$. By [[#thm-walks]] there is exactly one walk of length $3$ from $0$ to $3$; it is $0, 2, 1, 3$ (the walk $0, 1, x, 3$ would need a common neighbour $x$ of $1$ and $3$, and there is none). The trace of $A^3$ is $6$, so there is $6/6 = 1$ triangle, namely $\set{0, 1, 2}$.
:::
:::

::: quiz
A graph has $n = 10^4$ vertices and $m = 3\times10^4$ edges, and your algorithm asks "are $u$ and $v$ adjacent?" for $10^6$ arbitrary pairs and never lists neighbours. Which representation is best?
- [ ] Adjacency lists, because the graph is sparse
- [x] Adjacency sets (or a hash set of edges), or a bit matrix if $n^2$ bits fit
- [ ] An edge list
- [ ] It does not matter
::: solution
Adjacency tests are $O(\deg(u))$ with lists and $O(m)$ with an edge list. A hash set gives $O(1)$ expected time in $\Theta(n + m)$ space. Here a bit matrix is also feasible — $10^8$ bits is $12.5$ MB — and gives $O(1)$ worst-case tests with excellent constants. The right representation depends on the questions the algorithm asks, not only on sparsity.
:::
:::

::: quiz
In an undirected graph with $n = 7$ vertices, the degrees are $3, 3, 2, 2, 2, 1, 1$. How many edges are there?
- [ ] $14$
- [x] $7$
- [ ] $12$
- [ ] Such a graph cannot exist.
::: solution
The degrees sum to $14 = 2m$, so $m = 7$ ([[#prop-handshake]]). The sum is even, as it must be; a degree sequence with an odd sum (such as $3, 2, 2$) is impossible.
:::
:::

::: history
Graph theory began with Leonhard Euler's solution of the Königsberg bridges problem, presented in 1735 and published in 1741, which showed that no walk crosses each of the city's seven bridges exactly once. The word "graph" was introduced by James Joseph Sylvester in 1878, by analogy with the graphical notation of chemistry, and Dénes Kőnig's *Theorie der endlichen und unendlichen Graphen* (1936) was the first textbook. In computing, adjacency matrices were the natural representation of the early days, and many early graph algorithms ran in $\Theta(n^2)$ or worse. John Hopcroft and Robert Tarjan's work of the early 1970s — Tarjan's "Depth-first search and linear graph algorithms" (*SIAM Journal on Computing*, 1972) and their "Efficient algorithms for graph manipulation" (*Communications of the ACM*, 1973) — made adjacency lists the standard, by showing that with them depth-first search solves problems such as connectivity, biconnectivity and planarity in $O(n + m)$ time; Hopcroft and Tarjan received the 1986 Turing Award partly for this work.
:::

## Where this leads

With graphs stored as adjacency lists, the algorithms of [[algorithms]] run in times such as $O(n + m)$ for breadth-first and depth-first search, topological sorting and strongly connected components, $O((n + m)\log n)$ for Dijkstra's shortest paths with a binary heap ([[data-structures/heaps]]), and $O(m\log n)$ for minimum spanning trees. Graph databases and network analysis ([[databases]], [[information-retrieval]]) use CSR-like layouts for graphs with billions of edges, and distributed graph processing partitions them across machines ([[distributed-systems]]). In [[networks]] the routers themselves form a graph whose shortest paths the routing protocols compute. This chapter completes the course: every structure in it — arrays, lists, stacks, queues, hash tables, trees, heaps — appears inside the graph algorithms that follow.

::: summary
- A **graph** $G = (V, E)$ ([[#def-graph]]) has $n$ vertices and $m$ edges, directed or undirected, possibly weighted; simple graphs have $m \le n(n-1)/2$ (undirected). Most real graphs are sparse.
- The degrees of an undirected graph sum to $2m$ ([[#prop-handshake]]), which turns "$O(1 + \deg(v))$ per vertex" into $O(n + m)$ in total.
- An **adjacency matrix** ([[#def-adj-matrix]]) uses $\Theta(n^2)$ space, tests edges in $O(1)$ and lists neighbours in $\Theta(n)$; its powers count walks ([[#thm-walks]]).
- **Adjacency lists** ([[#def-adj-list]]) use $\Theta(n + m)$ space and list neighbours in $\Theta(\deg(u))$, but test edges in $O(\deg(u))$; adjacency sets add $O(1)$ expected edge tests.
- Graph search takes $\Theta(n + m)$ with lists and $\Theta(n^2)$ with a matrix ([[#thm-search-cost]]); lists are the default for sparse graphs.
- **CSR** packs adjacency lists into two arrays for large static graphs; edge lists suit edge-ordered algorithms such as Kruskal's.
- Choose the representation by the operations your algorithm performs and by the density of the graph.
:::

## Exercises

::: exercise Maximum number of edges {level=1 check="190"}
What is the largest number of edges in a simple undirected graph with $20$ vertices? (Enter the number.)
::: solution
$\binom{20}{2} = 20\cdot19/2 = 190$. A simple digraph without self-loops could have twice as many arcs, $380$.
:::
:::

::: exercise From lists to matrix {level=1}
A digraph on vertices $0..3$ has adjacency lists `[[1, 3], [2], [0, 3], []]`. Write its adjacency matrix, its in-degrees and out-degrees, and check the directed handshaking lemma.
::: solution
$$
A = \begin{pmatrix} 0 & 1 & 0 & 1 \\ 0 & 0 & 1 & 0 \\ 1 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix}.
$$
Out-degrees (row sums): $2, 1, 2, 0$. In-degrees (column sums): $1, 1, 1, 2$. Both sum to $5 = m$.
:::
:::

::: exercise Matrix memory {level=1 check="1250000000"}
How many bytes does an adjacency matrix of bits need for a graph with $n = 10^5$ vertices? (Enter the number of bytes.)
::: solution
$n^2 = (10^5)^2 = 10^{10}$ bits, and $10^{10}/8 = 1.25\times10^9$ bytes, about $1.25$ GB (or $1.16$ GiB) — already a lot for a graph that, if it has a few edges per vertex, needs only a few megabytes as adjacency lists.
:::
:::

::: exercise Degree from each representation {level=2}
How long does it take to compute the degree of every vertex of an undirected graph (a) from adjacency lists stored as Python lists, (b) from an adjacency matrix, (c) from an edge list? Give the algorithms.
::: solution
(a) `[len(adj[u]) for u in range(n)]`: Python lists store their length, so $\Theta(n)$. (Without stored lengths, walking the lists costs $\Theta(n + m)$.) (b) Sum each row: $\Theta(n^2)$. (c) Start with an array of $n$ zeros and add $1$ to both endpoints of each edge: $\Theta(n + m)$.
:::
:::

::: exercise Common neighbours {level=2}
Write a function that, given adjacency sets (a `dict` from vertex to `set` of neighbours), returns the number of common neighbours of $u$ and $v$, and state its expected running time. How would you find, for one vertex $u$, the vertex $v \ne u$ not adjacent to $u$ with the most common neighbours ("people you may know")?
::: solution
```python
def common(adj, u, v):
    small, large = sorted((adj[u], adj[v]), key=len)
    return sum(1 for x in small if x in large)     # O(min(deg u, deg v)) expected
```

Iterating over the smaller set and testing membership in the larger costs $O(\min(\deg u, \deg v))$ expected time (Python's `len(adj[u] & adj[v])` does the same). For recommendations, walk the friends-of-friends: for each neighbour $x$ of $u$ and each neighbour $y$ of $x$ with $y \ne u$ and $y \notin \mathit{adj}[u]$, increment a counter for $y$ in a dictionary; return the $y$ with the largest count. This takes $O(\sum_{x \in \mathit{adj}[u]} \deg x)$ expected time, which can be large for very popular $x$ — real systems sample or cap such contributions.
:::
:::

::: exercise Triangles {level=2 check="4"}
How many triangles does the complete graph $K_4$ have? Verify by computing the trace of $A^3$ for its adjacency matrix. (Enter the number of triangles.)
::: solution
Each choice of $3$ of the $4$ vertices is a triangle: $\binom43 = 4$. For $K_4$, $A = J - I$ (all ones minus the identity), and $A^3$ has diagonal entries equal to the number of closed walks of length $3$ from a vertex: choose the second vertex ($3$ ways) and the third ($2$ ways, distinct from the first two, then return): $6$. The trace is $4 \cdot 6 = 24$, and $24/6 = 4$ triangles.
:::
:::

::: exercise Counting walks is not counting paths {level=3}
(a) Show that $(A^k)[u][v] > 0$ if and only if there is a walk of length exactly $k$ from $u$ to $v$, and deduce an $O(n^4)$ algorithm deciding whether $v$ is reachable from $u$ using matrix powers. (b) Explain why $A^k$ cannot directly count *simple paths* of length $k$, with an example in a small graph. (c) Why is BFS ([[#thm-search-cost]]) a much better way to decide reachability?
::: solution
(a) Immediate from [[#thm-walks]]: the entry counts such walks. If $v$ is reachable from $u$ (with $u \ne v$), a shortest path is a simple path of length at most $n - 1$, so $v$ is reachable iff $(A + A^2 + \dots + A^{n-1})[u][v] > 0$. Computing the $n - 1$ powers with $\Theta(n^3)$ multiplications costs $\Theta(n^4)$ (or $O(n^3\log n)$ with repeated squaring of $I + A$ using Boolean arithmetic).

(b) Walks may repeat vertices. In the graph of [[#ex-two-reps]], $(A^2)[0][0] = 2$ counts the walks $0, 1, 0$ and $0, 2, 0$, neither of which is a path; and $(A^3)[0][1] = 4$ counts $0,1,0,1$; $0,2,0,1$; $0,1,2,1$ and $0,1,3,1$, although there is no simple path of length $3$ from $0$ to $1$ at all. Counting simple paths of length $k$ is in general a hard problem (for $k = n - 1$ it includes deciding whether a Hamiltonian path exists, which is NP-complete — see [[complexity]]).

(c) BFS decides reachability from $u$ to *all* vertices in $\Theta(n + m) = O(n^2)$ time, against $\Theta(n^4)$, and it needs only $\Theta(n + m)$ memory.
:::
:::

::: exercise Implementing an undirected graph class {level=3}
Implement a class `Graph` storing an undirected graph as a `dict` of `set`s, with methods `add_vertex`, `add_edge`, `remove_edge`, `remove_vertex`, `has_edge`, `neighbours`, `degree`, and `components()` returning the connected components as a list of sets. State the cost of each method and test `components` on a small graph with several components.
::: solution
```python
from collections import deque

class Graph:
    def __init__(self):
        self.adj = {}                             # vertex -> set of neighbours

    def add_vertex(self, v):                      # O(1) expected
        self.adj.setdefault(v, set())

    def add_edge(self, u, v):                     # O(1) expected
        self.add_vertex(u); self.add_vertex(v)
        self.adj[u].add(v); self.adj[v].add(u)

    def remove_edge(self, u, v):                  # O(1) expected
        self.adj[u].discard(v); self.adj[v].discard(u)

    def remove_vertex(self, v):                   # O(deg v) expected
        for u in self.adj.pop(v):
            self.adj[u].discard(v)

    def has_edge(self, u, v):                     # O(1) expected
        return v in self.adj.get(u, ())

    def neighbours(self, v):                      # O(1) to return; O(deg v) to iterate
        return self.adj[v]

    def degree(self, v):                          # O(1)
        return len(self.adj[v])

    def components(self):                         # O(n + m) expected: BFS from each new vertex
        seen, result = set(), []
        for s in self.adj:
            if s in seen:
                continue
            comp, q = {s}, deque([s])
            seen.add(s)
            while q:
                u = q.popleft()
                for w in self.adj[u]:
                    if w not in seen:
                        seen.add(w); comp.add(w); q.append(w)
            result.append(comp)
        return result

g = Graph()
for u, v in [(1, 2), (2, 3), (4, 5), (6, 7), (7, 8), (8, 6)]:
    g.add_edge(u, v)
g.add_vertex(9)
print(sorted(sorted(c) for c in g.components()), g.has_edge(3, 1), g.degree(7))
g.remove_vertex(7)
print(sorted(sorted(c) for c in g.components()))
```

```console
$ python3 graph.py
[[1, 2, 3], [4, 5], [6, 7, 8], [9]] False 2
[[1, 2, 3], [4, 5], [6, 8], [9]]
```

(With the isolated vertex $9$ there are four components; without it, three.) `components` visits each vertex once and each edge twice: $O(n + m)$ expected.
:::
:::
