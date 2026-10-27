A conference has one lecture hall and eleven talk proposals, each with a fixed start and finish time; how many talks can be scheduled without overlaps? A cable company must connect a set of towns with fibre, laying cable only along roads, at the least total cost. A compression program must encode text with as few bits as possible. Each problem has a huge number of candidate solutions — subsets of talks, sets of roads, codes — and yet each is solved by an algorithm that builds a solution one piece at a time, always taking the piece that looks best *right now*, and never reconsidering: the talk that finishes first, the cheapest road that does not close a loop, the two rarest symbols merged into one.

Such algorithms are called **greedy**. They are simple and fast, but most greedy algorithms are wrong: the locally best choice can lead to a globally poor solution. The interesting part of a greedy algorithm is therefore its **proof**. This chapter teaches the two standard proof techniques — *greedy stays ahead*, which compares the greedy solution with an optimal one step by step, and the **exchange argument**, which transforms an optimal solution into the greedy one without making it worse — and applies them to interval scheduling, scheduling with deadlines, Huffman codes and minimum spanning trees. For spanning trees we also meet the **union–find** data structure, whose analysis is one of the gems of the subject. Dijkstra's algorithm ([[algorithms/shortest-paths#thm-dijkstra]]) was already a greedy algorithm; its proof was a stays-ahead argument.

## Interval scheduling: greedy stays ahead

**Interval scheduling.** Given $n$ requests, request $i$ occupying the half-open interval $[s_i, f_i)$, find a largest set of pairwise **compatible** (non-overlapping) requests.

Several greedy rules suggest themselves: take the request that *starts* first, the *shortest* one, the one that *conflicts with fewest* others. All three fail ([[#ex-greedy-rules]]). The rule that works is: **take the request that finishes first**, discard everything that overlaps it, and repeat.

::: algorithm Earliest finish time first {#alg-eft}
Sort the requests by finish time, $f_1 \le f_2 \le \dots \le f_n$. Let $A = \emptyset$ and $\ell = -\infty$. For $i = 1, \dots, n$: if $s_i \ge \ell$, add $i$ to $A$ and set $\ell \gets f_i$. Return $A$.
:::

The test $s_i \ge \ell$ checks compatibility with *all* of $A$: every chosen request finishes by $\ell$. The running time is $O(n\log n)$ for sorting plus $O(n)$ for the scan.

::: theorem Earliest finish time is optimal {#thm-eft}
[[#alg-eft]] returns a maximum-size set of compatible requests.
:::

::: proof
Let $A = \{i_1, \dots, i_k\}$ be the greedy choice in the order chosen, and $O = \{j_1, \dots, j_m\}$ an optimal set, sorted by finish time (and so also by start time, since its intervals do not overlap). $A$ is compatible by construction; we must show $k \ge m$.

*Greedy stays ahead:* for every $r \le k$, $f_{i_r} \le f_{j_r}$. For $r = 1$ this holds because $i_1$ has the smallest finish time of all requests. Suppose it holds for $r - 1$, and $r \le m$. Then $j_r$ starts after $j_{r-1}$ finishes, so $s_{j_r} \ge f_{j_{r-1}} \ge f_{i_{r-1}}$: request $j_r$ is compatible with $i_1, \dots, i_{r-1}$ and was available when greedy chose its $r$-th request. Greedy chose the available request with the smallest finish time, so $f_{i_r} \le f_{j_r}$.

Now suppose $m > k$. By the claim for $r = k$, $f_{i_k} \le f_{j_k} \le s_{j_{k+1}}$, so request $j_{k+1}$ is compatible with all of $A$; but greedy stops only when no remaining request is compatible with $A$ — a contradiction. So $k = m$.
:::

```python
def max_compatible(intervals):
    """Greedy by earliest finish time; intervals are (start, finish) pairs."""
    chosen, last_finish = [], float('-inf')
    for s, f in sorted(intervals, key=lambda iv: iv[1]):
        if s >= last_finish:             # compatible with everything chosen
            chosen.append((s, f))
            last_finish = f
    return chosen

talks = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10),
         (8, 11), (8, 12), (2, 14), (12, 16)]
print(max_compatible(talks))
```

```console
$ python3 intervals.py
[(1, 4), (5, 7), (8, 11), (12, 16)]
```

::: example Scheduling the conference {#ex-talks}
Explain the output for the eleven talks, and show that no five of them are compatible.
::: solution
Sorted by finish time the talks are $[1,4), [3,5), [0,6), [5,7), [3,9), [5,9), [6,10), [8,11), [8,12), [2,14), [12,16)$. Greedy takes $[1,4)$; skips $[3,5)$, $[0,6)$ (they start before $4$); takes $[5,7)$; skips $[3,9)$, $[5,9)$, $[6,10)$; takes $[8,11)$; skips $[8,12)$, $[2,14)$; takes $[12,16)$: four talks. By [[#thm-eft]] four is the maximum. To see it directly, note that the four times $3.5$, $6.5$, $10.5$ and $15$ "stab" every talk: $[1,4)$, $[3,5)$, $[0,6)$, $[3,9)$ and $[2,14)$ contain $3.5$; $[5,7)$, $[5,9)$ and $[6,10)$ contain $6.5$; $[8,11)$ and $[8,12)$ contain $10.5$; and $[12,16)$ contains $15$. Two compatible talks cannot contain the same time, so a compatible set has at most one talk per stabbing point: at most four.
:::
:::

The point set in the example is no accident: the finish times of the greedy talks (just before them) always form such a set of "stabbing points", and the equality of the two numbers is a small instance of the duality that [[algorithms/network-flow]] develops.

## Exchange arguments: scheduling with deadlines

**Minimising maximum lateness.** One machine must process $n$ jobs, one at a time. Job $j$ takes time $t_j > 0$ and has a deadline $d_j$. A schedule starting at time $0$ without idle time gives job $j$ a finish time $f_j$ and a **lateness** $L_j = \max(0, f_j - d_j)$. Minimise the maximum lateness $L = \max_j L_j$.

Greedy by shortest job first fails (a long job with an early deadline goes last), and so does "least slack $d_j - t_j$ first". The rule that works ignores the durations entirely: **earliest deadline first** (EDF).

::: theorem Earliest deadline first is optimal {#thm-edf}
Scheduling the jobs in order of non-decreasing deadline, without idle time, minimises the maximum lateness.
:::

::: proof
An **inversion** of a schedule is a pair of jobs $i, j$ with $d_i < d_j$ but $j$ scheduled before $i$. The EDF schedule has no inversions, and all schedules without inversions and without idle time have the same maximum lateness: they differ only in the order of jobs with *equal* deadlines, and such a group occupies the same time interval in each of them, its last job finishing at the same time and being the latest of the group.

Take an optimal schedule $O$ without idle time (idle time never helps). If $O$ has an inversion, it has an *adjacent* one: walking along $O$, the deadlines cannot always weakly increase, so somewhere a job $j$ is immediately followed by a job $i$ with $d_i < d_j$. **Exchange** them. Only the lateness of $i$ and $j$ changes. Job $i$ now finishes earlier, so its lateness does not increase. Job $j$ now finishes at the time $f$ at which $i$ used to finish, so its new lateness is $\max(0, f - d_j) \le \max(0, f - d_i)$, which was $i$'s old lateness. So the maximum lateness does not increase, and the number of inversions drops by one. Repeating at most $\binom n2$ times turns $O$ into a schedule without inversions that is still optimal; by the first paragraph its maximum lateness equals that of EDF, which is therefore optimal.
:::

This is the pattern of an **exchange argument**: (1) define a measure of how far a solution is from the greedy one (here, inversions); (2) show that any optimal solution that differs from the greedy one can be changed by a local swap to reduce the measure without becoming worse; (3) conclude that the greedy solution is optimal.

::: example Earliest deadline first {#ex-edf}
Jobs: $A$ ($t = 3$, $d = 6$), $B$ ($t = 2$, $d = 8$), $C$ ($t = 1$, $d = 9$), $D$ ($t = 4$, $d = 9$), $E$ ($t = 3$, $d = 14$), $F$ ($t = 2$, $d = 15$). Schedule by EDF and compute the maximum lateness. Compare with shortest-job-first.
::: solution
EDF order $A, B, C, D, E, F$ gives finish times $3, 5, 6, 10, 13, 15$ and latenesses $0, 0, 0, 1, 0, 0$: maximum lateness $1$. (No schedule does better: $A$, $B$, $C$, $D$ have deadlines at most $9$ and total time $10$, so one of them finishes at $10$ or later, with lateness $\ge 1$.) Shortest job first, $C, B, F, A, E, D$ (ties broken alphabetically), finishes $D$ at $15$, lateness $15 - 9 = 6$.
:::
:::

## Huffman codes

A **binary code** assigns a bit string to each symbol of an alphabet $C$. A **prefix code** is one in which no codeword is a prefix of another, so that a concatenation of codewords can be decoded left to right without separators. A prefix code is the same thing as a binary tree whose leaves are the symbols: the codeword of a symbol spells the path from the root, $0$ for left and $1$ for right. Given the frequency $f(c)$ of each symbol $c$, the cost of encoding a text with a code tree $T$ is

$$
B(T) = \sum_{c \in C} f(c)\, d_T(c),
$$

where $d_T(c)$ is the depth of $c$'s leaf, the length of its codeword. We want a tree of minimum cost. An optimal tree is **full** — every internal node has two children — since a node with one child could be replaced by that child, shortening codewords.

::: algorithm Huffman's algorithm {#alg-huffman}
Make each symbol a one-node tree of weight $f(c)$. While more than one tree remains, remove the two trees $x$ and $y$ of smallest weight and add a new tree with a root whose children are $x$ and $y$, of weight $f(x) + f(y)$. Return the last tree. With a min-heap ([[data-structures/heaps]]), this takes $O(n\log n)$ time for $n$ symbols.
:::

```python
import heapq
from itertools import count

def huffman(freq):
    """Return an optimal prefix code {symbol: bit string} for the frequencies."""
    tick = count()                       # tie-breaker so trees are never compared
    heap = [(f, next(tick), sym) for sym, f in freq.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        f1, _, a = heapq.heappop(heap)   # the two least frequent trees
        f2, _, b = heapq.heappop(heap)
        heapq.heappush(heap, (f1 + f2, next(tick), (a, b)))
    code = {}
    def walk(tree, prefix):
        if isinstance(tree, tuple):      # internal node: 0 = left, 1 = right
            walk(tree[0], prefix + '0')
            walk(tree[1], prefix + '1')
        else:
            code[tree] = prefix or '0'
    walk(heap[0][2], '')
    return code

freq = {'a': 45, 'b': 13, 'c': 12, 'd': 16, 'e': 9, 'f': 5}
code = huffman(freq)
print(code)
print(sum(freq[s] * len(code[s]) for s in freq))
```

```console
$ python3 huffman.py
{'a': '0', 'c': '100', 'b': '101', 'f': '1100', 'e': '1101', 'd': '111'}
224
```

::: example Building a Huffman tree {#ex-huffman}
A file of $100\,000$ characters uses six symbols with frequencies (in thousands) $a{:}\,45$, $b{:}\,13$, $c{:}\,12$, $d{:}\,16$, $e{:}\,9$, $f{:}\,5$. Build the Huffman tree and compare its cost with a fixed-length code.
::: solution
The merges, always of the two lightest trees:

1. $f$ (5) + $e$ (9) $\to$ 14;
2. $c$ (12) + $b$ (13) $\to$ 25;
3. $\{f, e\}$ (14) + $d$ (16) $\to$ 30;
4. $\{c, b\}$ (25) + $\{f, e, d\}$ (30) $\to$ 55;
5. $a$ (45) + 55 $\to$ 100.

Depths: $a$ 1; $b, c, d$ 3; $e, f$ 4. Cost $45 \cdot 1 + (13 + 12 + 16)\cdot 3 + (9 + 5) \cdot 4 = 45 + 123 + 56 = 224$ thousand bits, matching the program. A fixed-length code needs $3$ bits per symbol for six symbols, $300$ thousand bits: Huffman saves about $25\%$.
:::
:::

Two lemmas prove Huffman's algorithm optimal: an exchange argument shows that the first merge is safe, and an induction handles the rest.

::: lemma The two rarest symbols can be siblings {#lem-huffman-swap}
Let $x$ and $y$ be two symbols of smallest frequency. Then some optimal code tree has $x$ and $y$ as sibling leaves of maximum depth.
:::

::: proof
Let $T$ be an optimal tree; it is full, so a deepest leaf $a$ has a sibling, and the sibling is a leaf $b$ (anything below it would be deeper). Assume $f(a) \le f(b)$ and $f(x) \le f(y)$, so $f(x) \le f(a)$ and $f(y) \le f(b)$, and $d_T(a) = d_T(b) \ge d_T(x), d_T(y)$. Exchange $x$ with $a$: the cost changes by
$$
f(x)d_T(a) + f(a)d_T(x) - f(x)d_T(x) - f(a)d_T(a) = -\big(f(a) - f(x)\big)\big(d_T(a) - d_T(x)\big) \le 0.
$$
Then exchange $y$ with $b$, which by the same computation does not increase the cost either. The result is a tree that is still optimal, with $x$ and $y$ as sibling leaves at the maximum depth. (If $x = b$ or $y = a$, swap fewer leaves; the computation is the same.)
:::

::: theorem Huffman codes are optimal {#thm-huffman}
[[#alg-huffman]] produces an optimal prefix code.
:::

::: proof
By induction on $n = \lvert C\rvert$. For $n = 2$ the tree with two leaves is optimal (each codeword needs at least one bit). Let $n > 2$, let $x, y$ be the symbols the algorithm merges first, and let $C'$ be $C$ with $x$ and $y$ replaced by a new symbol $z$ of frequency $f(z) = f(x) + f(y)$. The rest of the algorithm is Huffman's algorithm on $C'$, so by the induction hypothesis it builds an optimal tree $T'$ for $C'$, and the final tree $T$ is $T'$ with the leaf $z$ given two children $x$ and $y$. Since $x$ and $y$ are one level deeper than $z$ was,
$$
B(T) = B(T') + f(x) + f(y).
$$
This relation holds for *any* tree for $C'$ and the tree for $C$ obtained from it by splitting $z$ into $x$ and $y$. Now let $S$ be an optimal tree for $C$ in which $x$ and $y$ are siblings ([[#lem-huffman-swap]]). Merging them into a leaf $z$ gives a tree $S'$ for $C'$ with $B(S) = B(S') + f(x) + f(y)$. So $B(T) = B(T') + f(x) + f(y) \le B(S') + f(x) + f(y) = B(S)$, since $T'$ is optimal for $C'$. Hence $T$ is optimal.
:::

::: quiz
For the frequencies $a{:}\,1$, $b{:}\,1$, $c{:}\,2$, $d{:}\,4$, $e{:}\,8$, what are the codeword lengths in a Huffman code?

- [ ] All $3$ bits, except two of $2$
- [x] $4, 4, 3, 2, 1$
- [ ] $3, 3, 2, 2, 2$
- [ ] $5, 4, 3, 2, 1$
::: solution
Merge $a + b \to 2$; then that tree with $c$ ($2 + 2 \to 4$); then with $d$ ($4 + 4 \to 8$); then with $e$ ($8 + 8 \to 16$). The tree is a "caterpillar": $e$ at depth $1$, $d$ at $2$, $c$ at $3$, $a$ and $b$ at $4$. Cost $8 + 8 + 6 + 4 + 4 = 30$, against $3 \cdot 16 = 48$ for a fixed $3$-bit code. Five lengths of $5, 4, 3, 2, 1$ are impossible for a full tree: the deepest leaf must have a sibling leaf at the same depth.
:::
:::

## Minimum spanning trees

Let $G = (V, E)$ be a connected undirected graph with edge weights $w(u, v)$. A **spanning tree** is a set $T \subseteq E$ of edges forming a tree that contains every vertex; it has exactly $n - 1$ edges. A **minimum spanning tree** (MST) is a spanning tree of least total weight $w(T) = \sum_{e\in T}w(e)$. Networks of cables, pipes or roads are the obvious applications; MSTs are also used in clustering and as a building block of approximation algorithms.

Both classic MST algorithms grow a set $A$ of edges that is always a subset of some MST, adding one **safe** edge at a time. Which edges are safe is decided by cuts.

::: definition Cuts {#def-cut}
A **cut** $(S, V \setminus S)$ is a partition of $V$ into two non-empty sets. An edge **crosses** the cut if it has one end in each set. A cut **respects** a set $A$ of edges if no edge of $A$ crosses it. A **light edge** crossing a cut is one of minimum weight among the edges crossing it.
:::

::: theorem The cut property {#thm-cut}
Let $A$ be a subset of some minimum spanning tree, let $(S, V\setminus S)$ be a cut that respects $A$, and let $e = \{u, v\}$ be a light edge crossing it. Then $A \cup \{e\}$ is a subset of some minimum spanning tree.
:::

::: proof
Let $T$ be an MST containing $A$. If $e \in T$ we are done. Otherwise adding $e$ to $T$ creates exactly one cycle, consisting of $e$ and the path in $T$ from $u$ to $v$. Since $u$ and $v$ are on different sides of the cut, that path crosses the cut at least once, along some edge $e' \in T$. The edge $e'$ is not in $A$, since the cut respects $A$. **Exchange**: $T' = T \setminus \{e'\} \cup \{e\}$ is connected (any path that used $e'$ can go round the cycle instead) and has $n - 1$ edges, so it is a spanning tree, and $w(T') = w(T) - w(e') + w(e) \le w(T)$ because $e$ is light. So $T'$ is an MST, and it contains $A \cup \{e\}$.
:::

### Kruskal's algorithm

::: algorithm Kruskal's algorithm {#alg-kruskal}
Sort the edges by weight. Start with $A = \emptyset$, so that each vertex is its own component. For each edge $\{u, v\}$ in order of increasing weight: if $u$ and $v$ are in different components of $(V, A)$, add the edge to $A$ (merging the two components); otherwise skip it. Return $A$.
:::

Kruskal's algorithm is correct by the cut property: when it adds $\{u, v\}$, let $S$ be the component of $u$. The cut $(S, V \setminus S)$ respects $A$, and $\{u, v\}$ is a light edge crossing it, because every lighter edge has already been considered and either added (so it does not cross, as $S$ is a component) or skipped (so its ends were in one component, and it does not cross either). An edge that is skipped would close a cycle, and $A$ stays a forest; at the end it is connected, since $G$ is, so it is a spanning tree — and by induction with [[#thm-cut]], a minimum one.

The work is in testing "different components" quickly. That is the job of a **union–find** (disjoint-set) structure, which maintains a partition of the vertices under the operations `find(x)` (a representative of $x$'s set) and `union(x, y)` (merge the two sets). Represent each set as a rooted tree, each element pointing to its parent and the root being the representative.

- **Union by rank**: give each root a *rank*, initially $0$; on a union, make the root of smaller rank a child of the other, and if the ranks are equal, increase the rank of the new root by one.
- **Path compression**: during `find(x)`, make every node on the path from $x$ to the root point directly to the root.

::: lemma Union by rank keeps trees shallow {#lem-rank}
With union by rank (with or without path compression), a root of rank $r$ has at least $2^r$ elements in its tree, so every rank is at most $\lfloor\log n\rfloor$. Without path compression the height of a tree is at most its root's rank, so `find` takes $O(\log n)$ time.
:::

::: proof
By induction on the number of unions. A new element is a root of rank $0$ with $2^0 = 1$ element. A union that links a root of smaller rank under a root of rank $r$ keeps the rank $r$ and only adds elements. A union of two roots of equal rank $r$ creates a root of rank $r + 1$ with at least $2^r + 2^r = 2^{r+1}$ elements. Path compression changes no ranks and no set sizes. Since a tree has at most $n$ elements, $2^r \le n$. Without compression, a tree's height increases only when two trees of equal rank are linked, by one, exactly when the rank increases; so height $\le$ rank.
:::

With both heuristics, Tarjan (1975) proved that any sequence of $m$ operations on $n$ elements takes $O(m\,\alpha(n))$ time, where $\alpha$ is an inverse of Ackermann's function — at most $4$ for any $n$ that could ever occur in practice. We state this without proof (see CLRS, chapter 19, 4th ed.).

::: theorem Kruskal's running time {#thm-kruskal-time}
Kruskal's algorithm runs in $O(m\log n)$ time.
:::

::: proof
Sorting the edges takes $O(m\log m)$, and $\log m \le \log n^2 = 2\log n$. There are $2m$ `find` operations and $n - 1$ unions, costing $O(m\log n)$ by [[#lem-rank]] (or $O(m\,\alpha(n))$ with path compression). The total is $O(m\log n)$, dominated by sorting.
:::

```python
class UnionFind:
    """Disjoint sets with union by rank and path compression."""
    def __init__(self, items):
        self.parent = {x: x for x in items}
        self.rank = {x: 0 for x in items}

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:    # path compression
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False                 # already in the same set
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx             # attach the shorter tree
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True

def kruskal(vertices, edges):
    uf, tree = UnionFind(vertices), []
    for w, u, v in sorted(edges):        # lightest edge first
        if uf.union(u, v):               # skip edges inside a component
            tree.append((u, v, w))
    return tree

V = 'abcdefghi'
E = [(4, 'a', 'b'), (8, 'a', 'h'), (8, 'b', 'c'), (11, 'b', 'h'),
     (7, 'c', 'd'), (4, 'c', 'f'), (2, 'c', 'i'), (9, 'd', 'e'),
     (14, 'd', 'f'), (10, 'e', 'f'), (2, 'f', 'g'), (1, 'g', 'h'),
     (6, 'g', 'i'), (7, 'h', 'i')]
T = kruskal(V, E)
print(T)
print(sum(w for _, _, w in T))
```

```console
$ python3 kruskal.py
[('g', 'h', 1), ('c', 'i', 2), ('f', 'g', 2), ('a', 'b', 4), ('c', 'f', 4), ('c', 'd', 7), ('a', 'h', 8), ('d', 'e', 9)]
37
```

::: widget graph
nodes: a@0,1; b@1,2; c@2,2; d@3,2; e@4,1; f@3,0; g@2,0; h@1,0; i@2,1
edges: a-b:4; a-h:8; b-c:8; b-h:11; c-d:7; c-f:4; c-i:2; d-e:9; d-f:14; e-f:10; f-g:2; g-h:1; g-i:6; h-i:7
algorithm: kruskal
caption: Kruskal's algorithm on the graph of the listing. Step through it: edges are considered in increasing order of weight, and an edge is rejected exactly when its ends are already in the same component (it would close a cycle — $i$–$g$ of weight $6$ is the first). The final tree has $8$ edges and weight $37$. Switch the algorithm to Prim (starting from $a$) and compare: the same total weight, built in a different order.
:::

### Prim's algorithm

Prim's algorithm grows a single tree from a root $r$: at each step it adds the lightest edge leaving the tree. That edge is light for the cut (tree, rest), which respects the tree's edges, so by [[#thm-cut]] each added edge is safe. The implementation is Dijkstra's algorithm with a different key: a vertex outside the tree is keyed by the weight of its lightest edge *to the tree*, rather than by its distance from the source.

```python
import heapq

def prim(adj, r):
    """Minimum spanning tree of a connected undirected graph, grown from r."""
    in_tree, tree = {r}, []
    heap = [(w, r, v) for v, w in adj[r]]
    heapq.heapify(heap)
    while heap:
        w, u, v = heapq.heappop(heap)    # lightest edge leaving the tree?
        if v in in_tree:
            continue                     # both ends inside: skip
        in_tree.add(v)
        tree.append((u, v, w))
        for x, wx in adj[v]:
            if x not in in_tree:
                heapq.heappush(heap, (wx, v, x))
    return tree

E = [(4, 'a', 'b'), (8, 'a', 'h'), (8, 'b', 'c'), (11, 'b', 'h'),
     (7, 'c', 'd'), (4, 'c', 'f'), (2, 'c', 'i'), (9, 'd', 'e'),
     (14, 'd', 'f'), (10, 'e', 'f'), (2, 'f', 'g'), (1, 'g', 'h'),
     (6, 'g', 'i'), (7, 'h', 'i')]
adj = {v: [] for v in 'abcdefghi'}
for w, u, v in E:
    adj[u].append((v, w)); adj[v].append((u, w))
T = prim(adj, 'a')
print(T)
print(sum(w for _, _, w in T))
```

```console
$ python3 prim.py
[('a', 'b', 4), ('a', 'h', 8), ('h', 'g', 1), ('g', 'f', 2), ('f', 'c', 4), ('c', 'i', 2), ('c', 'd', 7), ('d', 'e', 9)]
37
```

With a binary heap, Prim's algorithm runs in $O(m\log n)$ time (each edge causes at most one push, and each push or pop costs $O(\log m) = O(\log n)$); with a Fibonacci heap and decrease-key, $O(m + n\log n)$, better for dense graphs.

::: example Prim from a {#ex-prim}
Explain the order in which Prim's algorithm adds edges in the listing, and why it takes $a$–$h$ (weight $8$) although Kruskal took it late.
::: solution
From $a$ the candidate edges are $a$–$b$ ($4$) and $a$–$h$ ($8$): take $a$–$b$. Now the edges leaving $\{a, b\}$ are $a$–$h$ ($8$), $b$–$c$ ($8$), $b$–$h$ ($11$); the lightest weight is $8$, and the tie is broken by the heap's tuple order, $(8, a, h) < (8, b, c)$, so $a$–$h$ is taken. From $h$, the edge $h$–$g$ ($1$) is now available and taken at once, then $g$–$f$ ($2$), $f$–$c$ ($4$), $c$–$i$ ($2$), $c$–$d$ ($7$) and $d$–$e$ ($9$). Both $a$–$h$ and $b$–$c$ are light edges for the cut $(\{a, b\}, \text{rest})$, so either is safe; this graph has two MSTs of weight $37$ (one with $a$–$h$, one with $b$–$c$), and the two algorithms happen to find the same one. Kruskal reached $a$–$h$ only when all lighter edges had been processed, but by then $a$ and $h$ were still in different components.
:::
:::

::: warning Greedy is not always right
Greedy algorithms are correct only when a proof says so. Making change with coins of $1$, $3$ and $4$ pence by "largest coin first" pays $6$p as $4 + 1 + 1$ (three coins) instead of $3 + 3$ (two). Packing a knapsack of capacity $50$ with items of (weight, value) $(10, 60)$, $(20, 100)$, $(30, 120)$ by best value per weight takes the first two (value $160$) and then cannot fit the third, while the optimum takes the last two (value $220$). And Dijkstra's algorithm, which is greedy, fails with negative edges. A plausible greedy rule needs a stays-ahead or exchange proof before you rely on it; when no proof exists, [[algorithms/dynamic-programming]] usually solves the problem correctly — the knapsack problem is solved there.
:::

::: quiz
All edge weights of a connected graph are distinct. Which statements are true?

- [x] The minimum spanning tree is unique.
- [x] The lightest edge of the graph is in the MST.
- [ ] The heaviest edge of the graph is never in the MST.
- [x] For every vertex, its lightest incident edge is in the MST.
::: solution
The lightest edge at a vertex $v$ is the unique light edge crossing the cut $(\{v\}, V \setminus \{v\})$, and the lightest edge of the whole graph is the lightest edge at each of its ends. If a unique light edge $e$ of some cut were missing from an MST $T$, the exchange in the proof of [[#thm-cut]] would replace a heavier crossing edge $e'$ of $T$ by $e$ and give a *lighter* tree — impossible; so every MST contains it. Uniqueness follows: if two MSTs $T \ne T'$ existed, take the lightest edge $e$ in one but not the other, say $e \in T \setminus T'$; adding $e$ to $T'$ closes a cycle with some edge $e' \in T' \setminus T$, and $w(e') > w(e)$ (by the choice of $e$ and distinctness), so $T' \cup \{e\} \setminus \{e'\}$ would be lighter than $T'$. The heaviest edge *can* be in the MST: if it is a bridge (the only edge joining two parts of the graph), every spanning tree contains it.
:::
:::

::: history
Otakar Borůvka found the first MST algorithm in 1926, to plan an economical electricity network for southern Moravia. Vojtěch Jarník described the algorithm now called Prim's in 1930; it was rediscovered by Robert Prim in 1957 ("Shortest connection networks and some generalizations", at Bell Labs) and by Dijkstra in 1959. Joseph Kruskal published his algorithm in 1956, as a note in the *Proceedings of the American Mathematical Society*. David Huffman devised his codes in 1951 as a term paper in Robert Fano's information theory class at MIT, beating the method of his teacher and Claude Shannon; the paper "A method for the construction of minimum-redundancy codes" appeared in 1952. The union–find structure with union by rank goes back to Bernard Galler and Michael Fischer (1964); Robert Tarjan proved the inverse-Ackermann bound in 1975. The theory of when greedy algorithms work — **matroids** — was founded by Hassler Whitney in 1935, and Jack Edmonds connected it to the greedy algorithm in 1971.
:::

## Where this leads

Exchange arguments recur throughout algorithm design, and when a greedy choice cannot be justified, [[algorithms/dynamic-programming]] considers every choice instead. Huffman coding is part of practical compressors (DEFLATE, used in gzip and PNG, combines it with LZ77 matching). Union–find reappears in [[algorithms/randomised-algorithms]], where Karger's minimum-cut algorithm is Kruskal's algorithm run on random edge weights. Many $\mathsf{NP}$-hard problems ([[complexity]]) have greedy *approximation* algorithms — for example, the minimum spanning tree gives a tour at most twice the optimal for the metric travelling salesman problem.

::: summary
- A **greedy algorithm** makes the locally best choice and never revises it; it needs a proof, usually **greedy stays ahead** or an **exchange argument**.
- **Interval scheduling**: earliest finish time first is optimal ([[#thm-eft]]), by staying ahead of any optimal schedule.
- **Maximum lateness**: earliest deadline first is optimal ([[#thm-edf]]), by exchanging adjacent inversions.
- **Huffman's algorithm** repeatedly merges the two rarest symbols; the two rarest can always be siblings ([[#lem-huffman-swap]]), and induction gives optimality ([[#thm-huffman]]).
- **Cut property**: a light edge across a cut respecting $A$ is safe ([[#thm-cut]]). Kruskal adds the lightest edge joining two components; Prim the lightest edge leaving its tree. Both run in $O(m\log n)$.
- **Union–find** with union by rank keeps trees of height $O(\log n)$ ([[#lem-rank]]); with path compression the amortised cost is $O(\alpha(n))$.
:::

## Exercises

::: exercise Counting compatible requests {level=1 check="3"}
Apply earliest finish time first to the requests $[0, 3)$, $[2, 5)$, $[4, 7)$, $[1, 8)$, $[6, 9)$, $[8, 10)$. How many requests does it choose? (Enter the number.)
::: solution
By finish time: $[0,3)$, $[2,5)$, $[4,7)$, $[1,8)$, $[6,9)$, $[8,10)$. Take $[0, 3)$; skip $[2, 5)$; take $[4, 7)$; skip $[1, 8)$ and $[6, 9)$; take $[8, 10)$. Three requests.
:::
:::

::: exercise Greedy rules that fail {#ex-greedy-rules level=1}
Give small counterexamples showing that, for interval scheduling, (a) earliest start time first, (b) shortest interval first and (c) fewest conflicts first are not optimal.
::: solution
(a) $[0, 10)$, $[1, 2)$, $[3, 4)$: earliest start takes $[0, 10)$ only; the optimum is $2$. (b) $[0, 5)$, $[4, 6)$, $[5, 10)$: shortest first takes $[4, 6)$, which conflicts with both others; the optimum takes $[0, 5)$ and $[5, 10)$. (c) A standard example: the top row $[0,2), [2,4), [4,6), [6,8)$ is optimal ($4$ intervals). Add three copies of $[1, 3)$ and three copies of $[5, 7)$, which overlap the outer intervals, and one interval $[3, 5)$, which overlaps only $[2, 4)$ and $[4, 6)$. Then $[3, 5)$ has $2$ conflicts — fewer than any top-row interval ($[0,2)$ has $3$, $[2,4)$ has $4$) — so it is chosen first, after which at most $3$ intervals fit: fewest conflicts gives $3 < 4$.
:::
:::

::: exercise Huffman cost {level=1 check="33"}
Compute the cost $B(T)$ of a Huffman code for frequencies $1, 2, 3, 4, 5$. (Enter the cost.)
::: solution
Merges: $1 + 2 = 3$; then the merged $3$ with the leaf $3$, giving $6$; then $4 + 5 = 9$; then $6 + 9 = 15$. The cost is the sum of the merged weights, $3 + 6 + 9 + 15 = 33$ (see the last exercise: each symbol contributes its frequency once per ancestor). Check with depths: $4$ and $5$ have depth $2$, the subtree of weight $6$ is at depth $1$, its leaf $3$ at depth $2$, and $1$, $2$ at depth $3$: $2\cdot(4 + 5) + 2\cdot3 + 3\cdot(1 + 2) = 18 + 6 + 9 = 33$. So $B(T) = 33$.
:::
:::

::: exercise A unique light edge {level=2}
Prove the *cycle property*: if $e$ is the unique heaviest edge on some cycle of $G$, then $e$ is in no minimum spanning tree.
::: solution
Let $T$ be a spanning tree containing $e = \{u, v\}$. Removing $e$ splits $T$ into two components, one containing $u$ and the other $v$, defining a cut. The cycle through $e$ contains a path from $u$ to $v$ avoiding $e$, which must cross the cut along some edge $e' \ne e$, and $w(e') < w(e)$ by assumption. Then $T \setminus \{e\} \cup \{e'\}$ is a spanning tree (it reconnects the two components) of smaller weight, so $T$ was not minimum.
:::
:::

::: exercise Union–find by hand {level=2 check="3"}
Starting from singletons $1, \dots, 8$, perform union by rank (without path compression, the root of the first argument winning ties): $\mathrm{union}(1, 2)$, $\mathrm{union}(3, 4)$, $\mathrm{union}(1, 3)$, $\mathrm{union}(5, 6)$, $\mathrm{union}(7, 8)$, $\mathrm{union}(5, 7)$, $\mathrm{union}(1, 5)$. What is the rank of the final root, and what is the height of the final tree? (Enter the height.)
::: solution
$\mathrm{union}(1, 2)$: $2$ under $1$, rank$(1) = 1$. $\mathrm{union}(3, 4)$: rank$(3) = 1$. $\mathrm{union}(1, 3)$: equal ranks, $3$ under $1$, rank$(1) = 2$. Similarly $5$ becomes a root of rank $2$ over $\{5, 6, 7, 8\}$. $\mathrm{union}(1, 5)$: equal ranks $2$, $5$ under $1$, rank$(1) = 3$. The tree has $8 = 2^3$ elements, the minimum allowed by [[#lem-rank]] for rank $3$, and its height is $3$ (for example $1 \to 5 \to 7 \to 8$) — equal to the rank, as the lemma predicts without compression.
:::
:::

::: exercise Maximum spanning trees and widest paths {level=3}
(a) Explain why Kruskal's algorithm with the edges taken in order of *decreasing* weight finds a spanning tree of maximum weight. (b) The **width** of a path is the smallest weight of an edge on it (think of bandwidths, or bridge weight limits). Prove that for every pair of vertices $u, v$, the path between them in a maximum spanning tree $T$ has the largest width of all paths from $u$ to $v$ in $G$.
::: solution
(a) A maximum spanning tree for $w$ is a minimum spanning tree for $-w$, and none of the proofs in this chapter used the sign of the weights. Kruskal on $-w$ in increasing order is Kruskal on $w$ in decreasing order.

(b) Let $P$ be the tree path from $u$ to $v$ and $e$ an edge of $P$ of smallest weight, so $P$ has width $w(e)$. Suppose some path $Q$ from $u$ to $v$ has larger width: every edge of $Q$ weighs more than $w(e)$. Removing $e$ from $T$ splits it into two components, with $u$ on one side and $v$ on the other (since $e$ lies on the unique tree path between them). The path $Q$ goes from one side to the other, so it has an edge $f$ crossing this cut, with $w(f) > w(e)$, and $f \notin T$ (the only tree edge crossing the cut is $e$). Then $T \setminus \{e\} \cup \{f\}$ is a spanning tree heavier than $T$, contradicting maximality. So no path is wider than $P$.
:::
:::

::: exercise Implement Borůvka's algorithm {level=3}
Borůvka's algorithm works in rounds: in each round, every component of the current forest selects its lightest outgoing edge, and all selected edges are added. Assuming distinct weights, prove that every selected edge belongs to the MST, that each round at least halves the number of components, and that the algorithm runs in $O(m\log n)$. Implement it with the `UnionFind` class above and check it on the graph of the listing (whose weights are not distinct — break ties by comparing $(w, u, v)$ tuples).
::: solution
*Safety:* the lightest edge leaving a component $C$ is a light edge for the cut $(C, V \setminus C)$, which respects the current forest; with distinct weights it is the unique light edge, and every MST contains it (exchange argument as in [[#thm-cut]]). So all selected edges lie in the unique MST, and adding them together cannot create a cycle. *Halving:* each component selects an edge to another component, so each new component merges at least two old ones. *Time:* at most $\log n$ rounds, each scanning all edges in $O(m\,\alpha(n))$.

```python
# appended to kruskal.py: uses UnionFind, V and E from that listing
def boruvka(vertices, edges):
    uf, tree = UnionFind(vertices), set()
    edges = [(w, min(u, v), max(u, v)) for w, u, v in edges]
    while len(tree) < len(vertices) - 1:
        best = {}                                  # component root -> edge
        for e in edges:
            w, u, v = e
            ru, rv = uf.find(u), uf.find(v)
            if ru != rv:
                for r in (ru, rv):
                    if r not in best or e < best[r]:
                        best[r] = e
        for w, u, v in best.values():
            if uf.union(u, v):
                tree.add((u, v, w))
    return sorted(tree, key=lambda e: (e[2], e[0], e[1]))

T = boruvka(V, E)
print(T, sum(w for _, _, w in T))
```

```console
$ python3 boruvka.py
[('g', 'h', 1), ('c', 'i', 2), ('f', 'g', 2), ('a', 'b', 4), ('c', 'f', 4), ('c', 'd', 7), ('a', 'h', 8), ('d', 'e', 9)] 37
```

Breaking ties by the whole tuple makes the order total, so the "distinct weights" argument applies to the tie-broken weights; the result has weight $37$, like Kruskal's.
:::
:::

::: exercise Huffman's merge count {level=2}
Show that the cost of a Huffman tree equals the sum of the weights of all trees created by merges, and use it to give an $O(n)$ algorithm for building Huffman codes when the frequencies are already sorted.
::: solution
Each symbol $c$ lies below exactly $d_T(c)$ internal nodes, and each internal node's weight is the sum of the frequencies of the symbols below it; so the sum of internal-node weights is $\sum_c f(c)d_T(c) = B(T)$. For the $O(n)$ algorithm, use two queues: $Q_1$ holds the sorted leaves and $Q_2$ the merged trees, which are created in non-decreasing order of weight (each merge combines the two smallest available weights, which never decrease). The two smallest trees are always among the fronts of $Q_1$ and $Q_2$, found in $O(1)$; each of the $n - 1$ merges takes constant time.
:::
:::
