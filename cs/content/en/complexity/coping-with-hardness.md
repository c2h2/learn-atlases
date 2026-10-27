Suppose your manager asks for a program that assigns 400 exams to 30 time slots without clashes, and after a week you prove the problem $\mathsf{NP}$-complete. The proof is valuable — it tells you to stop looking for an algorithm that is fast on *every* conceivable input — but it is not an excuse to stop. The exams still have to be scheduled. $\mathsf{NP}$-hardness is a statement about the worst case over all inputs, in the limit of large inputs, for exact answers. Each of those three qualifications opens a way forward: your inputs may have special structure; they may be small enough, or the relevant parameter small enough, for a cleverly organised exponential algorithm; or a good-enough answer may do.

This chapter surveys the main techniques for exact solutions: recognising tractable special cases, such as $\mathit{2SAT}$; exponential algorithms that are much better than brute force, analysed by recurrences; **fixed-parameter tractability**, which confines the exponential explosion to a parameter that is small in practice; the DPLL and CDCL algorithms behind modern **SAT solvers**, which in practice solve industrial instances with millions of variables; and **local search**. The last option — giving up optimality but guaranteeing a quality bound — is the subject of [[complexity/approximation-pcp]].

We write $O^*(c^n)$ for $O(c^n \cdot p(n))$ with $p$ a polynomial: when the exponential is the point, polynomial factors are noise.

## Tractable special cases

An $\mathsf{NP}$-complete problem often has natural restrictions that are in $\mathsf{P}$: $\mathit{IS}$ on trees or bipartite graphs, $\mathit{3COL}$ on graphs of maximum degree $2$, $\mathit{SAT}$ on formulas with two literals per clause. Recognising such a case is usually the cheapest way out.

### 2SAT and implication graphs

A clause $(a \lor b)$ is equivalent to each of the implications $\overline{a} \Rightarrow b$ and $\overline{b} \Rightarrow a$: if one literal is false, the other must be true.

::: definition Implication graph {#def-implication-graph}
The **implication graph** of a 2CNF formula $\varphi$ over $x_1, \dots, x_n$ is the directed graph with the $2n$ literals as vertices and, for each clause $(a \lor b)$, the edges $\overline{a} \to b$ and $\overline{b} \to a$.
:::

A path from $u$ to $v$ means that, in any satisfying assignment, $u$ true forces $v$ true (follow the implications edge by edge). The graph also has a symmetry: there is an edge $u \to v$ iff there is an edge $\overline{v} \to \overline{u}$, so a path $u \leadsto v$ exists iff a path $\overline{v} \leadsto \overline{u}$ does.

::: theorem 2SAT is in P {#thm-2sat}
A 2CNF formula $\varphi$ is satisfiable iff no variable $x$ lies in the same strongly connected component of the implication graph as $\overline{x}$. Hence $\mathit{2SAT} \in \mathsf{P}$, and a satisfying assignment can be found in linear time.
:::

::: proof
*Necessity.* If $x$ and $\overline{x}$ are in one component, there are paths $x \leadsto \overline{x}$ and $\overline{x} \leadsto x$. In a satisfying assignment, $x$ true would force $\overline{x}$ true, and $x$ false ($\overline{x}$ true) would force $x$ true; both are impossible.

*Sufficiency.* Suppose no $x$ shares a component with $\overline{x}$. Compute the components and a topological order of the component graph ([[algorithms/graph-search#thm-kosaraju]]). Set each literal $u$ true iff the component of $u$ comes **after** the component of $\overline{u}$ in that order. This is a consistent assignment: exactly one of $u$, $\overline{u}$ is later. Suppose some clause $(a \lor b)$ were false, so $a$ and $b$ are false: $\mathrm{comp}(a)$ is before $\mathrm{comp}(\overline{a})$ and $\mathrm{comp}(b)$ is before $\mathrm{comp}(\overline{b})$. The edge $\overline{a} \to b$ implies $\mathrm{comp}(\overline{a})$ is not after $\mathrm{comp}(b)$ in the topological order, and the edge $\overline{b} \to a$ implies $\mathrm{comp}(\overline{b})$ is not after $\mathrm{comp}(a)$. Chaining these, writing $\preceq$ for "not after":
$$
\mathrm{comp}(a) \prec \mathrm{comp}(\overline{a}) \preceq \mathrm{comp}(b) \prec \mathrm{comp}(\overline{b}) \preceq \mathrm{comp}(a),
$$
a contradiction. So every clause is true. Building the graph and the components takes $O(n + m)$ time for $m$ clauses.
:::

```python
import sys
sys.setrecursionlimit(10000)

def two_sat(n, clauses):
    """clauses: pairs of signed ints. Returns a satisfying assignment or None."""
    node = lambda l: 2 * (abs(l) - 1) + (l < 0)          # literal -> vertex 0 .. 2n-1
    G = [[] for _ in range(2 * n)]; R = [[] for _ in range(2 * n)]
    for a, b in clauses:                                  # (a v b): ~a -> b and ~b -> a
        for u, v in ((node(-a), node(b)), (node(-b), node(a))):
            G[u].append(v); R[v].append(u)
    order, seen = [], [False] * (2 * n)
    def dfs1(u):
        seen[u] = True
        for v in G[u]:
            if not seen[v]: dfs1(v)
        order.append(u)                                   # finish order
    for u in range(2 * n):
        if not seen[u]: dfs1(u)
    comp = [-1] * (2 * n)
    def dfs2(u, c):
        comp[u] = c
        for v in R[u]:
            if comp[v] < 0: dfs2(v, c)
    c = 0
    for u in reversed(order):                             # Kosaraju: components in topological order
        if comp[u] < 0: dfs2(u, c); c += 1
    if any(comp[2 * i] == comp[2 * i + 1] for i in range(n)):
        return None                                       # x and ~x in one component
    return [comp[2 * i] > comp[2 * i + 1] for i in range(n)]   # x true iff its component is later

print(two_sat(3, [(1, 2), (-1, 3), (-2, -3), (2, 3)]))
print(two_sat(2, [(1, 2), (1, -2), (-1, 2), (-1, -2)]))
```

```console
$ python3 twosat.py
[True, False, True]
None
```

The second formula rules out all four assignments of $x_1, x_2$, and indeed $x_1 \to x_2 \to \overline{x_1} \to \overline{x_2} \to x_1$ is a cycle through both literals of each variable. (The implementation was also checked against brute force on 3000 random 2CNF formulas.)

::: widget graph
nodes: x1@0,2; ¬x1@4,2; x2@2,3.5; ¬x2@2,0.5; x3@6,3.5; ¬x3@6,0.5
edges: ¬x1>x2; ¬x2>x1; x1>x3; ¬x3>¬x1; x2>¬x3; x3>¬x2; ¬x2>x3; ¬x3>x2
algorithm: dfs
start: x1
caption: The implication graph of $(x_1 \lor x_2) \land (\overline{x_1} \lor x_3) \land (\overline{x_2} \lor \overline{x_3}) \land (x_2 \lor x_3)$. Each clause gives two edges. Step through depth-first search from $x_1$: it reaches $x_3$ and $\overline{x_2}$, so $x_1$ forces $x_3$ and $\overline{x_2}$ — consistent with the assignment $(1, 0, 1)$ found by the program. Search from $\overline{x_1}$ by changing `start`: it reaches $x_1$ too, so $x_1$ must be true in every satisfying assignment.
:::

## Exact exponential algorithms

When there is no special structure, an exponential algorithm may still be practical — if its base is small. The difference between $2^n$ and $1.3^n$ is the difference between $n = 40$ and $n = 105$ in the same time.

### Dynamic programming over subsets

Brute force for the travelling salesman problem tries $(n-1)!$ tours. Dynamic programming reduces this to about $2^n$, by remembering only *which* cities a partial tour has visited and where it is, not the order.

::: algorithm Held–Karp {#alg-held-karp}
Cities $0, \dots, n - 1$ with distances $d(i, j)$. For every set $S \subseteq \{1, \dots, n-1\}$ and every $j \in S$, let $C(S, j)$ be the length of a shortest path that starts at $0$, visits exactly the cities of $S$, and ends at $j$.

1. $C(\{j\}, j) = d(0, j)$.
2. For $\lvert S\rvert \ge 2$ and $j \in S$: $C(S, j) = \min_{i \in S \setminus \{j\}} \bigl(C(S \setminus \{j\}, i) + d(i, j)\bigr)$, computing sets in order of size.
3. The optimal tour length is $\min_{j} \bigl(C(\{1, \dots, n-1\}, j) + d(j, 0)\bigr)$.
:::

::: theorem Held–Karp is correct and runs in $O(2^n n^2)$ time {#thm-held-karp}
[[#alg-held-karp]] computes the length of a shortest tour using $O(2^n n^2)$ arithmetic operations and $O(2^n n)$ memory.
:::

::: proof
*Correctness*, by induction on $\lvert S\rvert$. For $\lvert S\rvert = 1$ the only path is the edge $0 \to j$. For larger $S$, a shortest path from $0$ through $S$ ending at $j$ has a last-but-one city $i \in S \setminus \{j\}$, and its part before $j$ is a path from $0$ through $S \setminus \{j\}$ ending at $i$, which must itself be shortest among such paths (otherwise replace it by a shorter one: an exchange argument as in [[algorithms/dynamic-programming#def-dp]]). The recurrence minimises over all choices of $i$. A tour is such a path through all cities followed by the edge back to $0$, which gives step 3.

*Cost.* There are at most $2^{n-1}$ sets and $n$ choices of $j$, so $O(2^n n)$ table entries, each a minimum over at most $n$ values.
:::

::: example Held–Karp on four cities {#ex-held-karp}
Run [[#alg-held-karp]] on the asymmetric distance matrix $d$ below (row $i$, column $j$ gives $d(i, j)$).
$$
d = \begin{pmatrix} 0 & 2 & 9 & 10\\ 1 & 0 & 6 & 4\\ 15 & 7 & 0 & 8\\ 6 & 3 & 12 & 0\end{pmatrix}
$$
::: solution
Singletons: $C(\{1\}, 1) = 2$, $C(\{2\}, 2) = 9$, $C(\{3\}, 3) = 10$. Pairs:

- $C(\{1,2\}, 1) = C(\{2\}, 2) + d(2, 1) = 9 + 7 = 16$; $C(\{1,2\}, 2) = 2 + 6 = 8$;
- $C(\{1,3\}, 1) = 10 + 3 = 13$; $C(\{1,3\}, 3) = 2 + 4 = 6$;
- $C(\{2,3\}, 2) = 10 + 12 = 22$; $C(\{2,3\}, 3) = 9 + 8 = 17$.

The full set:

- $C(\{1,2,3\}, 1) = \min(C(\{2,3\}, 2) + d(2,1),\ C(\{2,3\}, 3) + d(3,1)) = \min(22 + 7, 17 + 3) = 20$;
- $C(\{1,2,3\}, 2) = \min(13 + 6, 6 + 12) = 18$;
- $C(\{1,2,3\}, 3) = \min(16 + 4, 8 + 8) = 16$.

Closing the tour: $\min(20 + 1, 18 + 15, 16 + 6) = 21$, achieved by ending at city $1$, whose best path came from $\{2, 3\}$ ending at $3$, which came from $\{2\}$: the tour $0 \to 2 \to 3 \to 1 \to 0$, of length $9 + 8 + 3 + 1 = 21$.

```python
from itertools import combinations, permutations

def held_karp(d):
    """Length of a shortest tour through cities 0..n-1, starting and ending at 0."""
    n = len(d)
    C = {(1 << j, j): d[0][j] for j in range(1, n)}      # C[S, j]: shortest 0 -> j path through set S
    for size in range(2, n):
        for subset in combinations(range(1, n), size):
            S = sum(1 << j for j in subset)
            for j in subset:
                C[S, j] = min(C[S ^ (1 << j), i] + d[i][j] for i in subset if i != j)
    full = (1 << n) - 2                                   # every city except 0
    return min(C[full, j] + d[j][0] for j in range(1, n))

d = [[0, 2, 9, 10],
     [1, 0, 6, 4],
     [15, 7, 0, 8],
     [6, 3, 12, 0]]
brute = min(sum(d[a][b] for a, b in zip((0,) + p, p + (0,))) for p in permutations(range(1, 4)))
print(held_karp(d), brute)
```

```console
$ python3 heldkarp.py
21 21
```
:::
:::

For $n = 30$ cities, brute force examines $29! \approx 8.8 \times 10^{30}$ tours, while Held–Karp needs about $2^{30} \cdot 30^2 \approx 10^{12}$ operations — slow, but feasible. As of 2026 no algorithm for general $\mathit{TSP}$ is known with running time $O^*(c^n)$ for a constant $c < 2$. In practice, exact $\mathit{TSP}$ solvers use branch and cut on linear programming relaxations and have solved instances with tens of thousands of cities, which is far beyond what any worst-case bound suggests.

### Branching algorithms

A **branching algorithm** splits an instance into smaller instances whose solutions combine into a solution of the whole. Its running time is the size of the search tree, which satisfies a recurrence.

::: example Branching on a 3SAT clause {#ex-branch-3sat}
Analyse the following algorithm for $\mathit{3SAT}$: pick a clause $(\ell_1 \lor \ell_2 \lor \ell_3)$ with three distinct variables and recurse on three formulas: with $\ell_1$ true; with $\ell_1$ false and $\ell_2$ true; with $\ell_1, \ell_2$ false and $\ell_3$ true. (Clauses that have become shorter are handled the same way with fewer branches.)
::: solution
Every satisfying assignment falls into exactly one of the three cases, so the algorithm is correct. The branches fix $1$, $2$ and $3$ variables, so the number of leaves $T(n)$ satisfies $T(n) \le T(n - 1) + T(n - 2) + T(n - 3)$. Trying $T(n) = c^n$ gives $c^3 = c^2 + c + 1$, whose real root is $c \approx 1.8393$ (the "tribonacci constant"). So the algorithm runs in time $O^*(1.8393^n)$ — better than $2^n$, and the trick generalises: branching on a clause of length $k$ gives the root of $c^k = c^{k-1} + \dots + 1$, which is less than $2$.
:::
:::

In general, if a branching rule always reduces the measure $n$ by $t_1, \dots, t_r$ in its $r$ branches, the search tree has $O(c^n)$ leaves where $c$ is the unique root greater than $1$ of $1 = \sum_i c^{-t_i}$. The vector $(t_1, \dots, t_r)$ is the **branching vector**; the larger the reductions, the smaller $c$.

::: theorem A branching algorithm for independent set {#thm-mis-branch}
A maximum independent set of a graph with $n$ vertices can be found in time $O^*(1.3803^n)$.
:::

::: proof
Algorithm $\mathrm{MIS}(G)$: if $G$ has a vertex $v$ of degree at least $3$, return the larger of $\mathrm{MIS}(G - v)$ (solutions avoiding $v$) and $1 + \mathrm{MIS}(G - N[v])$ (solutions containing $v$; $N[v]$ is $v$ with its neighbours, which must then be excluded). Otherwise every vertex has degree at most $2$, so $G$ is a disjoint union of paths and cycles; return $\sum \lceil p/2\rceil$ over paths of $p$ vertices plus $\sum \lfloor c/2\rfloor$ over cycles of $c$ vertices, computed in linear time.

*Correctness:* every independent set either avoids $v$ or contains it and none of its neighbours. The formula for paths and cycles is easily checked (take every other vertex).

*Time:* the first branch removes $1$ vertex and the second at least $4$, so $T(n) \le T(n - 1) + T(n - 4) + O(n^2)$. With $T(n) = c^n$ this needs $c^4 \ge c^3 + 1$, whose root is $c \approx 1.3803$. Formally, $T(n) \le K c^n n^2$ for a suitable constant $K$ by induction, since $c^{n-1} + c^{n-4} = c^n$.
:::

Much more refined branching rules and "measure and conquer" analyses bring maximum independent set to $O^*(1.2202^n)$ (Fomin, Grandoni and Kratsch, 2009), and later work below $O^*(1.2^n)$. For $\mathit{3SAT}$ the best known algorithms as of 2026 are randomised descendants of the PPSZ algorithm (Paturi, Pudlák, Saks and Zane, 2005), with running time about $O^*(1.307^n)$ (Hertli 2011; Hansen, Kaplan, Zamir and Zwick 2019).

Are there limits? The **Exponential Time Hypothesis** (ETH; Impagliazzo and Paturi, 2001) conjectures that $\mathit{3SAT}$ cannot be solved in time $2^{o(n)}$; the **Strong ETH** conjectures that for every $\varepsilon > 0$ there is a $k$ such that $k$-SAT cannot be solved in time $O^*((2 - \varepsilon)^n)$. Both are unproved (they imply $\mathsf{P} \ne \mathsf{NP}$) but widely used: through reductions, ETH implies that, for example, $\mathit{3COL}$ and $\mathit{HAMCYCLE}$ have no $2^{o(n)}$ algorithms either.

::: widget plot
f: 2^x; 1.8393^x; 1.3803^x; (4/3)^x
x: 0, 40
y: 0, 100000
labels: 2^n; 1.8393^n; 1.3803^n; (4/3)^n
caption: The bases of exponential algorithms matter. Brute force over assignments ($2^n$) and clause branching for 3SAT ($1.8393^n$) leave the picture before $n = 20$; the independent-set branching ($1.3803^n$) and Schöning's random walk ($(4/3)^n$) reach $10^5$ only near $n = 36$–$40$. At $n = 40$, $2^n \approx 1.1 \times 10^{12}$ while $(4/3)^n \approx 10^5$.
:::

## Fixed-parameter tractability

Often an instance has a natural parameter much smaller than its size: the size $k$ of the vertex cover we hope for, the number of colours, the treewidth of a road network. An algorithm with running time $2^k n$ is perfectly practical for $k = 30$ and $n = 10^6$, while $n^k$ is not.

::: definition Fixed-parameter tractable {#def-fpt}
A **parameterised problem** is a language of pairs $(x, k)$ with $k \in \N$ the **parameter**. It is **fixed-parameter tractable** (in $\mathsf{FPT}$) if it can be decided in time $f(k) \cdot \lvert x\rvert^{c}$ for some computable function $f$ and constant $c$ independent of $k$.
:::

::: theorem Vertex cover by a bounded search tree {#thm-vc-fpt}
Whether a graph with $n$ vertices and $m$ edges has a vertex cover of size at most $k$ can be decided in time $O(2^k (n + m))$.
:::

::: proof
Take any edge $\{u, v\}$. Every vertex cover contains $u$ or $v$. So $G$ has a cover of size $\le k$ iff $G - u$ has a cover of size $\le k - 1$ or $G - v$ has one. Recurse; stop with "yes" when no edges remain and with "no" when edges remain but $k = 0$. The recursion tree is binary of depth at most $k$, so it has at most $2^{k+1} - 1$ nodes, and each node does $O(n + m)$ work to delete a vertex and find an edge.
:::

Compare $\mathit{CLIQUE}$ with parameter $k$: the obvious algorithm takes time $O(n^k k^2)$, and no $f(k) n^c$ algorithm is known. $k$-clique is complete for the class $\mathsf{W[1]}$ of parameterised complexity, and under ETH it has no $f(k) n^{o(k)}$ algorithm (Chen, Huang, Kanj and Xia, 2006). So the two problems, interreducible as classical problems by [[complexity/np-complete-problems#thm-clique-vc]], behave very differently when parameterised — the reduction $\langle G, k\rangle \mapsto \langle G, n - k\rangle$ does not keep the parameter small.

### Kernels

A second FPT technique is to shrink the instance first.

::: theorem Buss's kernel for vertex cover {#thm-buss}
Given $(G, k)$, one can compute in polynomial time either the answer "no", or an equivalent instance $(G', k')$ with $k' \le k$ and at most $k'^2$ edges.
:::

::: proof
*Rule:* if a vertex $v$ has degree greater than $k$, then $v$ is in every vertex cover of size at most $k$ — otherwise all its more than $k$ neighbours would have to be in it. So replace $(G, k)$ by $(G - v, k - 1)$, and repeat. When no vertex has degree greater than the current $k'$, every vertex covers at most $k'$ edges, so a cover of size $k'$ covers at most $k'^2$ edges; if more than $k'^2$ edges remain, answer "no" (also if $k'$ became negative). Otherwise $(G', k')$ (without isolated vertices) is the kernel, and each step preserved the answer.
:::

Running the search tree of [[#thm-vc-fpt]] on the kernel gives time $O(kn + 2^k k^2)$, with the exponential part independent of $n$. As of 2026 the fastest known algorithm runs in time $O(1.2738^k + kn)$ (Chen, Kanj and Xia, 2010).

::: example Kernelising and branching {#ex-vc-fpt}
Find a vertex cover of size at most $3$ in the graph consisting of a star with centre $0$ and leaves $1, \dots, 6$, together with the path $7 - 8 - 9 - 10$. Is there a cover of size $2$?
::: solution
With $k = 3$, vertex $0$ has degree $6 > 3$, so it is forced: $k' = 2$ and the star's edges disappear. The remaining graph, the path, has maximum degree $2 \le k'$ and $3 \le k'^2 = 4$ edges, so this is the kernel. Branching on edge $\{7, 8\}$: taking $7$ leaves $\{8,9\}, \{9,10\}$ with budget $1$; branching on $\{8, 9\}$, taking $8$ leaves $\{9, 10\}$ with budget $0$ (fail), taking $9$ leaves nothing (success). Cover: $\{0, 7, 9\}$. With $k = 2$, vertex $0$ is forced again and $k' = 1$; the path has $3 > 1^2$ edges, so the answer is "no" without any branching.

```python
def vc_branch(edges, k):
    """Return a vertex cover of size <= k as a set, or None. Bounded search tree."""
    if not edges:
        return set()
    if k == 0:
        return None
    u, v = edges[0]                                   # some endpoint of this edge is in the cover
    for w in (u, v):
        rest = [e for e in edges if w not in e]
        sub = vc_branch(rest, k - 1)
        if sub is not None:
            return sub | {w}
    return None

def buss_kernel(edges, k):
    """Buss's rule: a vertex of degree > k must be in every cover of size <= k."""
    forced = set()
    while True:
        deg = {}
        for e in edges:
            for w in e: deg[w] = deg.get(w, 0) + 1
        high = [w for w, dw in deg.items() if dw > k - len(forced)]
        if not high: break
        forced.add(high[0]); edges = [e for e in edges if high[0] not in e]
    if len(forced) > k or len(edges) > (k - len(forced)) ** 2:
        return None                                   # no cover of size <= k
    return edges, k - len(forced), forced

def vertex_cover(edges, k):
    ker = buss_kernel(edges, k)
    if ker is None: return None
    rest, k2, forced = ker
    sub = vc_branch(rest, k2)
    return None if sub is None else forced | sub

# a star with centre 0 and leaves 1..6, plus a path 7-8-9-10
E = [(0, i) for i in range(1, 7)] + [(7, 8), (8, 9), (9, 10)]
print(buss_kernel(E, 3), vertex_cover(E, 3), vertex_cover(E, 2))
```

```console
$ python3 vc.py
([(7, 8), (8, 9), (9, 10)], 2, {0}) {0, 9, 7} None
```

(Python prints the set $\{0, 7, 9\}$ in its own order.)
:::
:::

Other parameters lead to other FPT results. Many problems that are $\mathsf{NP}$-hard on general graphs, including independent set, 3-colouring and Hamiltonian cycle, can be solved in time $f(w) \cdot n$ on graphs of **treewidth** $w$ — graphs that decompose into pieces glued along at most $w + 1$ vertices — by dynamic programming over the decomposition; Courcelle's theorem (1990) gives such an algorithm for every property expressible in monadic second-order logic. Trees have treewidth $1$, and [[#ex-tree-mis]] is the simplest instance of the idea.

::: quiz
Which of these running times show that a parameterised problem is fixed-parameter tractable?
- [x] $O(2^k \cdot n^3)$
- [ ] $O(n^k)$
- [x] $O(k^{k} + n^2)$
- [ ] $O(n^{\log k})$
::: solution
$\mathsf{FPT}$ requires $f(k) \cdot n^c$ with $c$ independent of $k$. $2^k n^3$ and $k^k + n^2 \le (k^k + 1) n^2$ qualify, however fast $f$ grows. $n^k$ and $n^{\log k}$ have the parameter in the exponent of $n$, so the degree of the polynomial grows with $k$; algorithms like these place a problem in the class $\mathsf{XP}$, not $\mathsf{FPT}$.
:::
:::

## SAT solvers

Cook–Levin says every problem in $\mathsf{NP}$ reduces to $\mathit{SAT}$. Practice turns this around: instead of writing a clever algorithm for each problem, encode it in CNF and hand it to a general-purpose solver. Hardware and software verification, planning, scheduling, cryptanalysis and combinatorics all do this routinely.

::: algorithm DPLL {#alg-dpll}
$\mathrm{DPLL}(\varphi)$, for a CNF formula $\varphi$:

1. **Unit propagation**: while $\varphi$ has a clause with one literal $\ell$, make $\ell$ true (delete clauses containing $\ell$, delete $\overline{\ell}$ from the others).
2. If $\varphi$ contains an empty clause, return "unsatisfiable"; if it has no clauses, return "satisfiable".
3. Choose a literal $\ell$ (a **decision**). Return $\mathrm{DPLL}(\varphi \text{ with } \ell \text{ true})$ if it is satisfiable, else $\mathrm{DPLL}(\varphi \text{ with } \ell \text{ false})$.
:::

DPLL is correct for the same reason as brute force — step 3 tries both values — and unit propagation only makes choices that are forced. Its power comes from propagation: one decision often fixes many variables. Modern **conflict-driven clause learning** (CDCL) solvers add three ideas. When propagation produces an empty clause, they analyse *why*, derive a new clause that rules out the cause of the conflict (a consequence of $\varphi$ by resolution), add it to the formula, and **backjump** to the decision responsible rather than just the last one. They choose decision variables by activity in recent conflicts (the VSIDS heuristic), and they **restart** periodically while keeping the learned clauses. Lazy data structures ("two watched literals") make propagation cheap.

*Observation (as of 2026):* CDCL solvers routinely decide industrial formulas from hardware verification and planning with millions of variables and clauses, and annual SAT competitions track their progress. This is an empirical fact about the instances that arise, not a theorem: the same solvers fail on some formulas with a few hundred variables.

::: theorem Haken's lower bound {#thm-haken}
Every resolution refutation of the pigeonhole formula $\mathit{PHP}_n$ — which says that $n + 1$ pigeons sit in $n$ holes with no two in the same hole — has size $2^{\Omega(n)}$ (Haken, 1985).
:::

We do not prove this. Its consequence is what matters here: the run of a DPLL or CDCL solver on an unsatisfiable formula can be converted into a resolution refutation of size polynomial in its running time, so on $\mathit{PHP}_n$ every such solver takes exponential time, although the formula has only $O(n^3)$ literals and its unsatisfiability is obvious to a person who can count.

::: example DPLL on pigeonhole formulas {#ex-dpll-php}
Implement [[#alg-dpll]] and count its decisions on $\mathit{PHP}_n$ for $n = 2, \dots, 7$.
::: solution
Variable $p_{i,h}$ says that pigeon $i$ sits in hole $h$. The clauses are $(p_{i,1} \lor \cdots \lor p_{i,n})$ for each pigeon (it sits somewhere) and $(\overline{p_{i,h}} \lor \overline{p_{j,h}})$ for each hole and pair of pigeons (no sharing): $n + 1$ clauses of length $n$ and $n\binom{n+1}{2}$ clauses of length $2$.

```python
def simplify(clauses, lit):
    """Make lit true: drop satisfied clauses, remove the opposite literal."""
    return [[l for l in c if l != -lit] for c in clauses if lit not in c]

def dpll(clauses, stats):
    """Return a list of true literals satisfying the clauses, or None."""
    trail = []
    while True:                                       # unit propagation
        if any(len(c) == 0 for c in clauses):
            return None                               # conflict: an empty clause
        unit = next((c[0] for c in clauses if len(c) == 1), None)
        if unit is None: break
        trail.append(unit); clauses = simplify(clauses, unit)
    if not clauses:
        return trail
    lit = clauses[0][0]                               # branch on a literal of the first clause
    for choice in (lit, -lit):
        stats["decisions"] += 1
        result = dpll(simplify(clauses, choice), stats)
        if result is not None:
            return trail + [choice] + result
    return None

def pigeonhole(n):
    """n + 1 pigeons in n holes; variable p*n + h + 1 means pigeon p sits in hole h."""
    x = lambda p, h: p * n + h + 1
    every_pigeon = [[x(p, h) for h in range(n)] for p in range(n + 1)]
    no_sharing = [[-x(p, h), -x(q, h)] for h in range(n)
                  for p in range(n + 1) for q in range(p + 1, n + 1)]
    return every_pigeon + no_sharing

for n in range(2, 8):
    stats = {"decisions": 0}
    print(n, dpll(pigeonhole(n), stats), stats["decisions"])
```

```console
$ python3 dpll.py
2 None 2
3 None 10
4 None 46
5 None 238
6 None 1438
7 None 10078
```

Each formula is (correctly) unsatisfiable, and the number of decisions grows by a factor of about $5$ to $7$ per extra hole, with the factor itself increasing — the search essentially tries all ways of placing pigeons. (The same program was checked against brute force on 2000 random small formulas.) A clause-learning solver does better on small cases but, by [[#thm-haken]], is exponential too.
:::
:::

::: warning NP-complete does not mean "hopeless", and SAT solvers do not mean "easy"
Two opposite mistakes are common. One is to give up as soon as a problem is shown $\mathsf{NP}$-complete, although the instances that arise may be small, structured, or have a small parameter, and a SAT or integer-programming solver may handle them in seconds. The other is to believe that solvers have made $\mathsf{NP}$-completeness irrelevant: their success is empirical and instance-dependent, and some short formulas (pigeonhole principles, random 3CNF formulas near the satisfiability threshold of about $4.27$ clauses per variable, formulas encoding the factoring of large numbers) are out of reach. Measure on realistic instances, and keep a fallback — a time limit and an approximate answer.
:::

## Local search

Local search starts from some candidate solution and repeatedly makes small changes that improve it. For satisfiability, the candidate is an assignment and the change is flipping one variable.

::: algorithm Random walk for satisfiability {#alg-random-walk}
Start with an arbitrary assignment. Repeat up to $t$ times: if every clause is satisfied, stop and output the assignment; otherwise pick any unsatisfied clause and flip a variable chosen uniformly at random among its literals' variables. If no satisfying assignment was found, answer "probably unsatisfiable".
:::

::: theorem Random walk solves 2SAT {#thm-random-walk-2sat}
On a satisfiable 2CNF formula with $n$ variables, [[#alg-random-walk]] with $t = 2n^2$ finds a satisfying assignment with probability at least $1/2$ (Papadimitriou, 1991).
:::

::: proof
Fix a satisfying assignment $A^*$ and let $X$ be the number of variables on which the current assignment agrees with $A^*$. The algorithm stops at the latest when $X = n$. When it flips a variable of an unsatisfied clause $(a \lor b)$, the current assignment makes both $a$ and $b$ false while $A^*$ makes at least one of them true, so at least one of the two variables is set differently from $A^*$. The flipped variable is chosen with probability $1/2$ each, so $X$ increases by $1$ with probability at least $1/2$ and otherwise decreases by $1$.

Compare with a fair random walk on $\{0, 1, \dots, n\}$ that moves up or down with probability $1/2$ each (always up at $0$). Let $h_j$ be its expected time to reach $n$ from $j$. Then $h_n = 0$, $h_0 = 1 + h_1$ and $h_j = 1 + \frac12 h_{j-1} + \frac12 h_{j+1}$ for $0 < j < n$. The function $h_j = n^2 - j^2$ satisfies these equations ($h_0 = n^2 = 1 + (n^2 - 1)$, and $\frac12((n^2 - (j-1)^2) + (n^2 - (j+1)^2)) = n^2 - j^2 - 1$), and the solution is unique, so $h_j \le n^2$. Since our walk moves up with probability *at least* $1/2$, it can be coupled with the fair walk so that it is always at least as high, and its expected time to reach $n$ is at most $n^2$. By Markov's inequality ([[algorithms/randomised-algorithms#thm-markov]]) the probability that it takes more than $2n^2$ steps is at most $1/2$.
:::

Repeating the walk $r$ times with independent coins reduces the failure probability to $2^{-r}$. For $\mathit{3SAT}$ the same argument gives a walk that moves the right way only with probability $1/3$, and then restarts are needed: **Schöning's algorithm** (1999) restarts from a uniformly random assignment and walks $3n$ steps; each restart succeeds with probability at least about $(3/4)^n$ up to a polynomial factor, giving expected time $O^*((4/3)^n)$ on satisfiable 3CNF formulas. (On an unsatisfiable formula it never finds an assignment, so after enough restarts it answers "unsatisfiable" with a small probability of error — a one-sided error of the kind studied in [[complexity/randomised-complexity]].) Practical local-search solvers such as WalkSAT mix random flips with greedy ones that satisfy the most clauses; related metaheuristics — simulated annealing, tabu search, genetic algorithms — come without guarantees and are judged by experiment.

::: history
The Davis–Putnam procedure (Martin Davis and Hilary Putnam, 1960) eliminated variables by resolution; Davis, George Logemann and Donald Loveland replaced elimination by branching in 1962, giving DPLL. Michael Held and Richard Karp (and independently Richard Bellman) published the $O(2^n n^2)$ dynamic program for $\mathit{TSP}$ in 1962. Bengt Aspvall, Michael Plass and Robert Tarjan gave the linear-time 2SAT algorithm via strongly connected components in 1979. Clause learning entered SAT solving with GRASP (João Marques-Silva and Karem Sakallah, 1996), and Chaff (Moskewicz, Madigan, Zhao, Zhang and Malik, 2001) introduced watched literals and the VSIDS heuristic. Armin Haken proved exponential lower bounds for resolution proofs of the pigeonhole principle in 1985. Parameterised complexity was founded by Rodney Downey and Michael Fellows in a series of papers from 1992 and their 1999 monograph; Sam Buss's kernel for vertex cover is reported in a 1993 paper by Buss and Goldsmith. Uwe Schöning's random-walk algorithm appeared in 1999, and Russell Impagliazzo and Ramamohan Paturi formulated the Exponential Time Hypothesis in 2001.
:::

## Where this leads

When exact solutions are out of reach even with these tools, we can ask for solutions that are *provably close* to optimal: [[complexity/approximation-pcp]] gives a factor-$2$ approximation for vertex cover and a $\ln n$ approximation for set cover, and shows that for some problems even approximation is $\mathsf{NP}$-hard. The random walks above are randomised algorithms with one-sided error, which [[complexity/randomised-complexity]] organises into complexity classes. Encodings into SAT and integer programming reappear in verification and planning ([[software-engineering]], [[artificial-intelligence]]).

::: summary
- $\mathsf{NP}$-hardness concerns the worst case over all inputs; special structure, small parameters, small sizes and approximate answers all offer ways out.
- **2SAT** is in $\mathsf{P}$: unsatisfiable iff some $x$ and $\overline{x}$ share a strongly connected component of the implication graph ([[#thm-2sat]]).
- **Exact exponential algorithms**: dynamic programming over subsets solves $\mathit{TSP}$ in $O(2^n n^2)$ ([[#thm-held-karp]]); branching algorithms are analysed by recurrences such as $T(n) \le T(n-1) + T(n-4)$, giving $O^*(1.3803^n)$ for independent set ([[#thm-mis-branch]]). ETH conjectures that $\mathit{3SAT}$ needs $2^{\Omega(n)}$ time.
- **FPT**: time $f(k) \cdot n^c$ ([[#def-fpt]]); vertex cover in $O(2^k(n + m))$ by a bounded search tree ([[#thm-vc-fpt]]) and kernels of $k^2$ edges ([[#thm-buss]]); $k$-clique is believed not to be FPT.
- **SAT solvers** (DPLL, [[#alg-dpll]], and CDCL) solve many huge practical formulas, but resolution-based solvers need exponential time on pigeonhole formulas ([[#thm-haken]]).
- **Local search**: a random walk solves 2SAT in expected $O(n^2)$ flips ([[#thm-random-walk-2sat]]); Schöning's restarts give $O^*((4/3)^n)$ for 3SAT.
:::

## Exercises

::: exercise The Fibonacci branching number {level=1 check="(1+sqrt(5))/2"}
A branching algorithm for vertex cover picks a vertex $v$ of degree at least $2$ and branches: either $v$ is in the cover ($k$ decreases by $1$), or all its neighbours are ($k$ decreases by at least $2$). What is the base $c$ of the resulting $O^*(c^k)$ bound on the number of leaves? (Enter $c$ exactly or to four decimals.)
::: solution
$T(k) \le T(k-1) + T(k-2)$, so $c^2 = c + 1$ and $c = (1 + \sqrt5)/2 \approx 1.6180$, the golden ratio. The rule is correct because a cover that omits $v$ must contain every neighbour of $v$. When every vertex has degree at most $1$ the graph is a matching, and a minimum cover takes one endpoint of each edge, so no branching is needed — an improvement over the $2^k$ of [[#thm-vc-fpt]].
:::
:::

::: exercise Size of the Held–Karp table {level=1 check="2304"}
For $n = 10$ cities, how many entries $C(S, j)$ (with $S \subseteq \{1, \dots, 9\}$ non-empty and $j \in S$) does [[#alg-held-karp]] compute? (Enter the number.)
::: solution
Each of the $9$ cities $j$ belongs to $2^8 = 256$ subsets of $\{1, \dots, 9\}$, so there are $9 \cdot 256 = 2304$ pairs $(S, j)$ with $j \in S$. (Equivalently $\sum_{s=1}^{9} s\binom{9}{s} = 9 \cdot 2^8$.)
:::
:::

::: exercise A 2SAT instance by hand {level=1}
Draw the implication graph of $(x_1 \lor x_2) \land (\overline{x_1} \lor x_2) \land (x_1 \lor \overline{x_2}) \land (\overline{x_2} \lor x_3)$ and decide whether it is satisfiable. If it is, read off an assignment.
::: solution
Edges: $(x_1 \lor x_2)$: $\overline{x_1} \to x_2$, $\overline{x_2} \to x_1$. $(\overline{x_1} \lor x_2)$: $x_1 \to x_2$, $\overline{x_2} \to \overline{x_1}$. $(x_1 \lor \overline{x_2})$: $\overline{x_1} \to \overline{x_2}$, $x_2 \to x_1$. $(\overline{x_2} \lor x_3)$: $x_2 \to x_3$, $\overline{x_3} \to \overline{x_2}$. Now $\overline{x_1} \to x_2 \to x_1$ and $x_1 \to x_2$, so $x_1$ and $x_2$ are in one component; $\overline{x_1} \to \overline{x_2} \to \overline{x_1}$ form another. No $x_i$ shares a component with $\overline{x_i}$, so the formula is satisfiable. From $\overline{x_1} \leadsto x_1$, the component of $x_1$ is later, so $x_1 = x_2 = 1$; then $x_2 \to x_3$ forces $x_3 = 1$. Check: all four clauses are true under $(1, 1, 1)$.
:::
:::

::: exercise The size of a search tree {level=2 check="2047"}
At most how many nodes does the recursion tree of [[#thm-vc-fpt]] have for $k = 10$? (Enter the number.)
::: solution
A binary tree of depth at most $k$ has at most $1 + 2 + \dots + 2^k = 2^{k+1} - 1$ nodes; for $k = 10$ that is $2047$. Each node costs $O(n + m)$, so the total is $O(2^k(n + m))$.
:::
:::

::: exercise Independent sets in trees {#ex-tree-mis level=2}
Give a linear-time algorithm for the maximum independent set in a tree, prove it correct, and implement it.
::: solution
Root the tree. For each vertex $v$ let $\mathrm{in}(v)$ be the largest independent set in the subtree of $v$ that contains $v$, and $\mathrm{out}(v)$ the largest that does not. If $v$ is in the set, its children are not; if $v$ is out, each child may be in or out independently:
$$
\mathrm{in}(v) = 1 + \sum_{c} \mathrm{out}(c), \qquad \mathrm{out}(v) = \sum_{c} \max(\mathrm{in}(c), \mathrm{out}(c)).
$$
Correctness follows by induction on the height, because the subtrees of different children share no vertices or edges, so the choices combine freely. The answer is $\max(\mathrm{in}(r), \mathrm{out}(r))$ at the root $r$; each vertex is processed once.

```python
def tree_mis(children, root):
    def go(v):
        inc, exc = 1, 0
        for c in children.get(v, []):
            ci, co = go(c)
            inc += co; exc += max(ci, co)
        return inc, exc
    return max(go(root))

# path 1-2-3-4-5 rooted at 1, plus leaves 6, 7 under 3
print(tree_mis({1: [2], 2: [3], 3: [4, 6, 7], 4: [5]}, 1))
```

```console
$ python3 treemis.py
4
```

For example $\{1, 5, 6, 7\}$ — or $\{2, 4, 6, 7\}$ — is independent, and no five vertices are.
:::
:::

::: exercise Encoding colouring as SAT {level=2}
Write a CNF formula that is satisfiable iff a graph $G = (V, E)$ is $k$-colourable, count its clauses, and use the DPLL code of [[#ex-dpll-php]] to show that the 5-cycle needs three colours.
::: solution
Variables $c_{v,i}$ ("$v$ has colour $i$"). Clauses: $(c_{v,1} \lor \cdots \lor c_{v,k})$ for each vertex; $(\overline{c_{u,i}} \lor \overline{c_{v,i}})$ for each edge and colour. (At-most-one-colour clauses are unnecessary: from a solution with several colours at a vertex keep any one.) That is $\lvert V\rvert + k\lvert E\rvert$ clauses.

```python
from dpll import dpll                       # the functions of the previous example

def colouring_cnf(n, edges, k):
    x = lambda v, i: v * k + i + 1
    return ([[x(v, i) for i in range(k)] for v in range(n)] +
            [[-x(u, i), -x(v, i)] for u, v in edges for i in range(k)])

C5 = [(i, (i + 1) % 5) for i in range(5)]
for k in (2, 3):
    model = dpll(colouring_cnf(5, C5, k), {"decisions": 0})
    print(k, None if model is None else sorted(l for l in model if l > 0))
```

```console
$ python3 colour_sat.py
2 None
3 [1, 5, 7, 11, 15]
```

With $k = 3$, variable $3v + i + 1$ means vertex $v$ has colour $i$: $1 \mapsto (0, 0)$, $5 \mapsto (1, 1)$, $7 \mapsto (2, 0)$, $11 \mapsto (3, 1)$, $15 \mapsto (4, 2)$. So the colours around the cycle are $0, 1, 0, 1, 2$, and vertex $4$, adjacent to $3$ (colour $1$) and $0$ (colour $0$), needs the third colour: a proper 3-colouring. With two colours the odd cycle is not colourable, as expected. (To run this, keep the definitions of `simplify`, `dpll` and `pigeonhole` in `dpll.py` and guard its test loop with `if __name__ == "__main__":`.)
:::
:::

::: exercise Proving the branching bound {level=3}
Prove carefully that the recursion of [[#thm-mis-branch]] makes $O(c^n)$ calls, where $c \approx 1.3803$ is the real root of $c^4 = c^3 + 1$. Then show that using vertices of degree $\ge 4$ for branching (and a polynomial algorithm for graphs of maximum degree $3$, if one existed) would give the bound for $c^5 = c^4 + 1$, and compute that root. Why can this improvement not be had for free?
::: solution
Let $L(n)$ be the maximum number of leaves of the recursion tree over graphs with at most $n$ vertices. A graph with at most $3$ vertices has maximum degree at most $2$, so it is a leaf: $L(n) = 1$ for $n \le 3$. For $n \ge 4$ a call either is a leaf or branches into graphs with at most $n - 1$ and at most $n - 4$ vertices, so $L(n) \le \max(1, L(n - 1) + L(n - 4))$. Claim: $L(n) \le c^{n}$ for all $n \ge 0$, where $c^4 = c^3 + 1$. For $n \le 3$, $L(n) = 1 \le c^n$. Inductively $L(n) \le c^{n-1} + c^{n-4} = c^{n-4}(c^3 + 1) = c^{n-4}c^4 = c^n$. A binary tree has fewer internal nodes than leaves, so there are $O(c^n)$ calls, each costing polynomial time. Root: $c^4 - c^3 - 1 = 0$ has $c \approx 1.3803$ (bisection: $1.38^4 - 1.38^3 - 1 \approx -0.0013$, $1.381^4 - 1.381^3 - 1 \approx 0.003$).

With degree $\ge 4$ the second branch removes at least $5$ vertices: $c^5 = c^4 + 1$, $c \approx 1.3247$. But maximum independent set is $\mathsf{NP}$-hard already on graphs of maximum degree $3$ (Garey, Johnson and Stockmeyer, 1976), so there is no polynomial base case unless $\mathsf{P} = \mathsf{NP}$; on degree-$3$ graphs one must branch too, with a more careful analysis — which is exactly what the refined algorithms in the literature do.
:::
:::

::: exercise Random walk for 3SAT {level=3}
Explain why the proof of [[#thm-random-walk-2sat]] fails for 3CNF formulas, and show that from distance $j$ (the number of variables on which the current assignment differs from $A^*$) a walk of $j$ consecutive correct flips happens with probability at least $3^{-j}$. Using that a uniformly random starting assignment has distance $j$ with probability $\binom{n}{j}2^{-n}$, show that a single random start followed by $n$ flips finds a satisfying assignment with probability at least $(2/3)^n$, and conclude an expected running time of $O^*(1.5^n)$. (Schöning's sharper analysis allows some wrong steps and gets $(4/3)^n$.)
::: solution
In an unsatisfied 3-clause, $A^*$ makes at least one of three literals true, so a random flip moves towards $A^*$ with probability only at least $1/3$, and the walk drifts away: the expected hitting time is exponential, so the $n^2$ bound fails. From distance $j$, $j$ consecutive flips each move closer with probability at least $1/3$, independently, so all $j$ succeed with probability at least $3^{-j}$ (and then the assignment is $A^*$, or the walk stopped earlier at another satisfying assignment). Averaging over the random start,
$$
\Prob[\text{success}] \ge \sum_{j=0}^{n} \binom{n}{j} 2^{-n} 3^{-j} = 2^{-n}\left(1 + \tfrac13\right)^n = \left(\tfrac{2}{3}\right)^n.
$$
Repeating independently, the expected number of restarts until success is at most $(3/2)^n$, each costing $O(n \cdot \lvert\varphi\rvert)$: expected time $O^*(1.5^n)$, already better than $2^n$.
:::
:::
