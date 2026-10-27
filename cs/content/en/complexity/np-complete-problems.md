The Cook–Levin theorem gives us one $\mathsf{NP}$-complete problem by a long argument about Turing machines. Every further one is cheaper: by [[complexity/np-completeness#thm-npc]] (3), to prove a problem $X \in \mathsf{NP}$ is $\mathsf{NP}$-complete it is enough to reduce *one* known $\mathsf{NP}$-complete problem to it. Richard Karp did this for 21 problems in 1972; Michael Garey and David Johnson's book of 1979 catalogued over 300; today there are many thousands, from protein folding models to video-game levels.

This chapter builds the core of that catalogue by explicit reductions from $\mathit{3SAT}$ to independent set, clique and vertex cover; to Hamiltonian path and cycle and the travelling salesman problem; to subset sum; and to graph 3-colouring. Each reduction follows the same pattern: build **gadgets** — small pieces of the target instance that imitate variables (a binary choice) and clauses (a constraint that at least one literal is true) — and connect them so that solutions of the new instance correspond to satisfying assignments. For each one we prove both directions, and we also test an implementation against brute force: a cheap safeguard against the off-by-one errors that plague gadget constructions.

## The shape of an NP-completeness proof

::: algorithm Proving that a problem is NP-complete {#alg-npc-recipe}
To show that a language $X$ is $\mathsf{NP}$-complete:

1. Show $X \in \mathsf{NP}$: describe a certificate and a polynomial-time verifier.
2. Choose a known $\mathsf{NP}$-complete problem $A$ (often $\mathit{3SAT}$).
3. Describe a function $f$ mapping each instance $w$ of $A$ to an instance $f(w)$ of $X$, and argue that it is computable in polynomial time (usually: the output has polynomial size and is written by simple loops).
4. Prove **completeness of the reduction**: if $w \in A$ then $f(w) \in X$ (turn a solution of $w$ into one of $f(w)$).
5. Prove **soundness of the reduction**: if $f(w) \in X$ then $w \in A$ (turn a solution of $f(w)$ into one of $w$) — or, equivalently, $w \notin A \Rightarrow f(w) \notin X$.
:::

::: warning Half a reduction is not a reduction
The most common error is to prove only step 4: "a satisfying assignment gives a clique of size $k$". That is easy, and proves nothing — the map $\varphi \mapsto$ "a complete graph" also has that property. The substance of a reduction is step 5: every solution of the constructed instance, including strange ones the designer did not have in mind, must yield a solution of the original. A second common error is to run the reduction backwards, mapping instances of the new problem to $\mathit{3SAT}$; see [[complexity/np-completeness#thm-reduction-p]] for why that shows only membership in $\mathsf{NP}$.
:::

## Independent set, clique and vertex cover

Recall from [[complexity/np-completeness#ex-clique-is]] that $\mathit{IS} = \{\langle G, k\rangle : G$ has an independent set of $k$ vertices$\}$.

::: theorem Independent set is NP-complete {#thm-is}
$\mathit{IS}$ is $\mathsf{NP}$-complete.
:::

::: proof
*In $\mathsf{NP}$:* the certificate is the set; check its size and that no edge joins two of its vertices.

*Reduction from $\mathit{3SAT}$.* Let $\varphi = c_1 \land \cdots \land c_m$ with $c_j = (\ell_{j,1} \lor \ell_{j,2} \lor \ell_{j,3})$. Build $G$ with one vertex $v_{j,p}$ for each literal occurrence $\ell_{j,p}$ — $3m$ vertices — and two kinds of edges:

- **clause triangles**: the three vertices of each clause are joined pairwise;
- **conflict edges**: $v_{j,p}$ and $v_{j',p'}$ are joined whenever $\ell_{j,p}$ and $\ell_{j',p'}$ are complementary literals ($x$ and $\overline{x}$).

Output $\langle G, m\rangle$. This takes $O(m^2)$ time.

*If $\varphi$ is satisfiable,* fix a satisfying assignment and choose from each clause one literal occurrence that is true. The $m$ chosen vertices are in different triangles, and no two of them are complementary (both are true), so they form an independent set of size $m$.

*If $G$ has an independent set $S$ of size $m$,* then $S$ contains at most one vertex of each triangle, hence exactly one. The literals of $S$ contain no complementary pair (no conflict edge inside $S$), so we can set each of them true; give the remaining variables arbitrary values. Every clause contains a literal of $S$, which is true, so $\varphi$ is satisfied.
:::

::: widget graph
nodes: 1.x1@0,0; 1.x2@1,1.6; 1.¬x3@2,0; 2.¬x1@3.5,0; 2.x2@4.5,1.6; 2.x3@5.5,0; 3.¬x1@7,0; 3.¬x2@8,1.6; 3.¬x3@9,0
edges: 1.x1-1.x2; 1.x2-1.¬x3; 1.x1-1.¬x3; 2.¬x1-2.x2; 2.x2-2.x3; 2.¬x1-2.x3; 3.¬x1-3.¬x2; 3.¬x2-3.¬x3; 3.¬x1-3.¬x3; 1.x1-2.¬x1; 1.x1-3.¬x1; 1.x2-3.¬x2; 2.x2-3.¬x2; 1.¬x3-2.x3; 2.x3-3.¬x3
algorithm: none
caption: The graph built by [[#thm-is]] from $\varphi = (x_1 \lor x_2 \lor \overline{x_3}) \land (\overline{x_1} \lor x_2 \lor x_3) \land (\overline{x_1} \lor \overline{x_2} \lor \overline{x_3})$: three clause triangles and six conflict edges (a vertex $j.\ell$ is literal $\ell$ in clause $j$). Find an independent set of size $3$ — one vertex per triangle, no conflict edge — and read off an assignment; for example $\{1.x_2, 2.x_2, 3.\overline{x_1}\}$ gives $x_1 = 0$, $x_2 = 1$. Drag vertices to untangle the picture.
:::

::: example A yes-instance and a no-instance {#ex-is}
(a) For the formula in the figure, list the conflict edges and turn the independent set $\{1.x_2,\ 2.x_3,\ 3.\overline{x_1}\}$ into a satisfying assignment. (b) Build the graph for the unsatisfiable formula $\psi = (x_1 \lor x_1 \lor x_1) \land (\overline{x_1} \lor \overline{x_1} \lor \overline{x_1})$ and check that it has no independent set of size $2$.
::: solution
(a) Conflict edges join complementary literals in different clauses: $1.x_1$–$2.\overline{x_1}$, $1.x_1$–$3.\overline{x_1}$, $1.x_2$–$3.\overline{x_2}$, $2.x_2$–$3.\overline{x_2}$, $1.\overline{x_3}$–$2.x_3$ and $2.x_3$–$3.\overline{x_3}$ — six in all. The set $\{1.x_2, 2.x_3, 3.\overline{x_1}\}$ takes one vertex per triangle, and none of the six edges joins two of its vertices. Setting its literals true gives $x_2 = 1$, $x_3 = 1$, $x_1 = 0$. Check: clause 1 has $x_2$, clause 2 has $x_3$, clause 3 has $\overline{x_1}$, all true.
(b) The graph has two triangles, $\{1.x_1^{(1)}, 1.x_1^{(2)}, 1.x_1^{(3)}\}$ for the three occurrences in the first clause and likewise for the second, and every one of the $3 \cdot 3 = 9$ pairs of an occurrence of $x_1$ with an occurrence of $\overline{x_1}$ is a conflict edge. So every two vertices are adjacent — the graph is the complete graph $K_6$ — and the largest independent set has one vertex, fewer than $m = 2$. This is the soundness direction at work: the conflict edges make it impossible to pick a "true" literal from every clause when no assignment can make them all true.
:::
:::

Clique and vertex cover follow by simple transformations. A **vertex cover** of $G$ is a set $C$ of vertices such that every edge has at least one endpoint in $C$; $\mathit{VC} = \{\langle G, k\rangle : G$ has a vertex cover of size at most $k\}$.

::: theorem Clique and vertex cover are NP-complete {#thm-clique-vc}
$\mathit{CLIQUE}$ and $\mathit{VC}$ are $\mathsf{NP}$-complete.
:::

::: proof
Both are in $\mathsf{NP}$ (certificate: the set). $\mathit{IS} \le_p \mathit{CLIQUE}$ by $\langle G, k\rangle \mapsto \langle\overline{G}, k\rangle$ ([[complexity/np-completeness#ex-clique-is]]). For $\mathit{VC}$: in $G = (V, E)$, a set $S$ is independent iff no edge has both endpoints in $S$ iff every edge has an endpoint in $V \setminus S$ iff $V \setminus S$ is a vertex cover. So $G$ has an independent set of size $k$ iff it has a vertex cover of size $n - k$ (a cover of size less than $n - k$ can be enlarged), and $\langle G, k\rangle \mapsto \langle G, n - k\rangle$ reduces $\mathit{IS}$ to $\mathit{VC}$.
:::

## Hamiltonian paths and cycles

Graph problems with a global constraint — visit *every* vertex — need more elaborate gadgets. We follow the construction in Sipser's textbook, with a complete proof of the hard direction.

::: theorem Hamiltonian path is NP-complete {#thm-hampath}
$\mathit{HAMPATH} = \{\langle G, s, t\rangle : G$ is a directed graph with a Hamiltonian path from $s$ to $t\}$ is $\mathsf{NP}$-complete.
:::

*The construction.* Let $\varphi$ have variables $x_1, \dots, x_n$ and clauses $c_1, \dots, c_m$ (index the clauses $j = 0, \dots, m - 1$ for convenience). For each variable $x_i$ build a **diamond**: a top vertex $a_i$, a bottom vertex $a_{i+1}$ (shared with the next diamond), and a horizontal **row** of $3m + 1$ vertices $u_{i,0}, u_{i,1}, \dots, u_{i,3m}$ with edges in both directions between neighbours $u_{i,t} \leftrightarrow u_{i,t+1}$. Add edges $a_i \to u_{i,0}$, $a_i \to u_{i,3m}$, $u_{i,0} \to a_{i+1}$ and $u_{i,3m} \to a_{i+1}$. In each row the vertices $u_{i,3j+1}, u_{i,3j+2}$ form the **pair** for clause $j$, and the vertices $u_{i,3j}$ (and $u_{i,3m}$) are **separators**. For each clause add one vertex $c_j$, and

- if $x_i$ occurs in $c_j$, edges $u_{i,3j+1} \to c_j \to u_{i,3j+2}$ (a detour from left to right);
- if $\overline{x_i}$ occurs in $c_j$, edges $u_{i,3j+2} \to c_j \to u_{i,3j+1}$ (a detour from right to left).

Finally $s = a_1$ and $t = a_{n+1}$. The graph has $n(3m + 1) + (n + 1) + m$ vertices.

The intended reading: a Hamiltonian path passes through the diamonds from top to bottom and crosses row $i$ either **left to right** ($x_i$ true) or **right to left** ($x_i$ false). A clause vertex can be picked up by a detour from row $i$ only if the row is crossed in the direction that makes the literal true.

::: proof
*In $\mathsf{NP}$:* [[complexity/np#ex-verifiers]].

*If $\varphi$ is satisfiable,* fix a satisfying assignment and choose for each clause $c_j$ one true literal, say of variable $x_i$. Walk $a_1, \text{row } 1, a_2, \text{row } 2, \dots, a_{n+1}$, crossing row $i$ from $u_{i,0}$ to $u_{i,3m}$ if $x_i$ is true and from $u_{i,3m}$ to $u_{i,0}$ if false. For each clause, when the walk crosses the chosen pair $u_{i,3j+1}, u_{i,3j+2}$, replace that step by the detour through $c_j$: the edges $u_{i,3j+1} \to c_j \to u_{i,3j+2}$ exist if $x_i \in c_j$ and the row is crossed left to right, and $u_{i,3j+2} \to c_j \to u_{i,3j+1}$ exist if $\overline{x_i} \in c_j$ and it is crossed right to left. Each clause vertex is visited exactly once, and so is every other vertex.

*If there is a Hamiltonian path $P$ from $s$ to $t$,* we first show that it picks up every clause vertex by a detour within one pair. Every vertex other than $s$ and $t$ has a predecessor and a successor on $P$, and we call these its two **$P$-neighbours**.

1. *Separators are crossed within their row.* An interior separator $u_{i,3j}$ ($1 \le j \le m - 1$) has only $u_{i,3j-1}$ and $u_{i,3j+1}$ as neighbours, so these are its $P$-neighbours. The end separator $u_{i,0}$ has neighbours $a_i$, $a_{i+1}$ and $u_{i,1}$. If its $P$-neighbours were $a_i$ and $a_{i+1}$, then $a_i$'s successor and $a_{i+1}$'s predecessor would both be $u_{i,0}$, and $u_{i,3m}$ — whose neighbours are $a_i$, $a_{i+1}$ and $u_{i,3m-1}$ — would be left with only one possible $P$-neighbour, $u_{i,3m-1}$, though it needs two. So $u_{i,1}$ is a $P$-neighbour of $u_{i,0}$, and symmetrically $u_{i,3m-1}$ is one of $u_{i,3m}$.
2. *Each pair is crossed directly or via its clause vertex.* Let $l = u_{i,3j+1}$ and $r = u_{i,3j+2}$. By step 1, $l$ has its left separator as one $P$-neighbour, and its only other neighbours are $r$ and $c_j$; likewise $r$ has its right separator as a $P$-neighbour, and its other neighbours are $l$ and $c_j$. So either $l$ and $r$ are $P$-neighbours of each other, or neither is a $P$-neighbour of the other and then *both* have $c_j$ as their second $P$-neighbour.
3. *Clause vertices are detours within a pair.* The predecessor $x$ of $c_j$ is a pair vertex of some row $i$. By step 2 applied to that pair, its partner is also a $P$-neighbour of $c_j$; since $c_j$ has only two $P$-neighbours, its successor is the partner.

Now delete each clause vertex from $P$, replacing $x \to c_j \to y$ by the row edge $x \to y$. The result $P'$ is a Hamiltonian path from $s$ to $t$ in the graph without clause vertices. There, row $i$ is entered only from $a_i$ (once, since $a_i$ has one successor) and left only to $a_{i+1}$, so $P'$ visits row $i$ in a single run that starts at an end of the row and covers the whole row: it must run straight from one end to the other. So $P'$ is $a_1$, row $1$, $a_2$, …, $a_{n+1}$, each row crossed in one direction. Set $x_i$ true iff row $i$ is crossed left to right. For each clause $c_j$, the detour $x \to c_j \to y$ of $P$ became a step $x \to y$ of $P'$, in the direction of crossing of its row. If it is $u_{i,3j+1} \to c_j \to u_{i,3j+2}$, row $i$ is crossed left to right, $x_i$ is true, and the edge $u_{i,3j+1} \to c_j$ exists only if $x_i$ occurs in $c_j$: the clause is satisfied. If it is $u_{i,3j+2} \to c_j \to u_{i,3j+1}$, then $x_i$ is false and $\overline{x_i}$ occurs in $c_j$. So every clause is satisfied.

The graph has $O(nm)$ vertices and edges and is built by simple loops: the reduction runs in polynomial time.
:::

The separators are what make step 2 work: without them two clause pairs would be adjacent, and a path could enter a clause vertex from one row and leave it into another.

::: theorem Undirected Hamiltonian path, cycles and TSP {#thm-uhampath}
The following are $\mathsf{NP}$-complete: (1) $\mathit{UHAMPATH}$, Hamiltonian path in undirected graphs; (2) $\mathit{HAMCYCLE}$, whether a graph (directed or undirected) has a cycle through every vertex exactly once; (3) $\mathit{TSP} = \{\langle K, w, B\rangle :$ the complete graph $K$ with edge weights $w$ has a tour of total weight at most $B\}$.
:::

::: proof
All three are in $\mathsf{NP}$ (certificate: the path, cycle or tour).

(1) $\mathit{HAMPATH} \le_p \mathit{UHAMPATH}$. Replace each vertex $v \notin \{s, t\}$ of the directed graph by a path $v_{\text{in}} - v_{\text{mid}} - v_{\text{out}}$; replace $s$ by $s_{\text{out}}$ and $t$ by $t_{\text{in}}$; for each directed edge $u \to v$ add the undirected edge $\{u_{\text{out}}, v_{\text{in}}\}$ (dropping edges into $s$ or out of $t$). A directed Hamiltonian path $s, v_1, \dots, v_k, t$ becomes $s_{\text{out}}, v_{1,\text{in}}, v_{1,\text{mid}}, v_{1,\text{out}}, \dots, t_{\text{in}}$. Conversely, in an undirected Hamiltonian path from $s_{\text{out}}$ to $t_{\text{in}}$, each $v_{\text{mid}}$ has degree $2$, so its $P$-neighbours are $v_{\text{in}}$ and $v_{\text{out}}$. Walk along the path from $s_{\text{out}}$: from some $u_{\text{out}}$ the next vertex is some $v_{\text{in}}$ (the only neighbours of $u_{\text{out}}$ are $u_{\text{mid}}$, already used, and $\text{in}$-vertices); from $v_{\text{in}}$ the next vertex must be $v_{\text{mid}}$, because $v_{\text{mid}}$ needs $v_{\text{in}}$ as a $P$-neighbour and $v_{\text{in}}$ has already used one $P$-neighbour on $u_{\text{out}}$; then comes $v_{\text{out}}$. So the path reads $s_{\text{out}}, (v_{1,\text{in}}, v_{1,\text{mid}}, v_{1,\text{out}}), \dots, t_{\text{in}}$, and the directed edges $s \to v_1 \to \cdots \to t$ exist.

(2) $\mathit{HAMPATH} \le_p \mathit{HAMCYCLE}$: add a new vertex $z$ with edges $t \to z \to s$. A Hamiltonian cycle must pass $t \to z \to s$ (these are $z$'s only edges), and deleting $z$ leaves a Hamiltonian path from $s$ to $t$; the converse is immediate. The undirected version is the same with $\mathit{UHAMPATH}$.

(3) $\mathit{HAMCYCLE} \le_p \mathit{TSP}$ (undirected): given $G$ with $n$ vertices, let $K$ be the complete graph on its vertices with $w(u, v) = 1$ if $\{u, v\}$ is an edge of $G$ and $2$ otherwise, and $B = n$. A tour has $n$ edges, so it has weight $n$ iff it uses only edges of $G$, i.e. iff it is a Hamiltonian cycle of $G$.
:::

In the following listing, `karp.py` collects the reductions of this chapter, each with a brute-force solver for the target problem. The functions for the first two reductions are shown here; the subset-sum and colouring parts follow in their sections.

```python
from itertools import product, combinations

def sat(phi, n):                                  # clauses: lists of signed ints
    return any(all(any((l > 0) == a[abs(l) - 1] for l in c) for c in phi)
               for a in product([False, True], repeat=n))

def to_is(phi, n):                                # 3SAT -> INDEPENDENT SET
    V = [(j, p) for j in range(len(phi)) for p in range(3)]
    lit = {(j, p): phi[j][p] for (j, p) in V}
    E = {frozenset((u, v)) for u, v in combinations(V, 2)
         if u[0] == v[0] or lit[u] == -lit[v]}      # triangles + conflict edges
    return V, E, len(phi)

def has_is(V, E, k):
    return any(all(frozenset(p) not in E for p in combinations(S, 2))
               for S in combinations(V, k))
```

```python
def to_hampath(phi, n):                           # 3SAT -> directed HAMPATH
    m, E = len(phi), set()
    for i in range(1, n + 1):
        a, b, row = ("a", i), ("a", i + 1), [("u", i, t) for t in range(3 * m + 1)]
        E |= {(a, row[0]), (a, row[-1]), (row[0], b), (row[-1], b)}
        E |= {(row[t], row[t + 1]) for t in range(3 * m)} | {(row[t + 1], row[t]) for t in range(3 * m)}
        for j, c in enumerate(phi):
            l, r = row[3 * j + 1], row[3 * j + 2]
            if i in c:  E |= {(l, ("c", j)), (("c", j), r)}
            if -i in c: E |= {(r, ("c", j)), (("c", j), l)}
    V = {v for e in E for v in e} | {("c", j) for j in range(m)}
    return V, E, ("a", 1), ("a", n + 1)

def hampath(V, E, s, t):                          # backtracking search
    out = {}
    for u, v in E: out.setdefault(u, []).append(v)
    seen = {s}
    def go(v):
        if len(seen) == len(V): return v == t
        for w in out.get(v, []):
            if w not in seen and (w != t or len(seen) == len(V) - 1):
                seen.add(w)
                if go(w): return True
                seen.remove(w)
        return False
    return go(s)
```

::: example Counting the Hamiltonian-path gadget {#ex-hampath-size}
How many vertices and edges does the construction of [[#thm-hampath]] produce for a formula with $n = 3$ variables and $m = 4$ clauses, in which every clause has three distinct variables?
::: solution
Vertices: three rows of $3m + 1 = 13$ vertices, the four diamond tips $a_1, \dots, a_4$, and $4$ clause vertices: $39 + 4 + 4 = 47$. Edges: each row has $2 \cdot 12 = 24$ row edges and each diamond $4$ tip edges, $3 \cdot 28 = 84$; each of the $3m = 12$ literal occurrences adds $2$ detour edges, $24$. Total $108$. Compare $\mathit{3SAT}$'s brute force, $2^3 = 8$ assignments, with a naive Hamiltonian-path search over up to $45!$ orders: the reduction says nothing about how hard *these particular* graphs are — only that a fast algorithm for *all* graphs would give a fast algorithm for $\mathit{3SAT}$.
:::
:::

## Subset sum

Numbers can serve as gadgets too, if we write them in a base large enough that adding never carries.

::: theorem Subset sum is NP-complete {#thm-subset-sum}
$\mathit{SUBSET\text{-}SUM} = \{\langle a_1, \dots, a_k, T\rangle :$ some sub-collection of the $a_i$ sums to $T\}$, numbers in binary, is $\mathsf{NP}$-complete.
:::

::: proof
*In $\mathsf{NP}$:* the certificate is the sub-collection.

*Reduction from $\mathit{3SAT}$.* Given $\varphi$ with variables $x_1, \dots, x_n$ and clauses $c_1, \dots, c_m$, write numbers in **decimal** with $n + m$ digits: one digit per variable, then one per clause. Create

- for each variable $x_i$, two numbers $y_i$ and $z_i$, each with a $1$ in digit $x_i$; in addition, the digit of clause $c_j$ in $y_i$ is the number of occurrences of $x_i$ in $c_j$, and in $z_i$ the number of occurrences of $\overline{x_i}$;
- for each clause $c_j$, two "slack" numbers $g_j = h_j$ with a $1$ in digit $c_j$ and $0$ elsewhere;
- the target $T = 1\cdots1\,3\cdots3$: $1$ in every variable digit and $3$ in every clause digit.

In every digit the sum of *all* the numbers is at most $5$ (two in a variable digit; at most $3$ literal occurrences plus two slacks in a clause digit), so no subset sum ever carries, and a subset sums to $T$ iff it gives the right total digit by digit.

*If $\varphi$ is satisfiable,* take $y_i$ if $x_i$ is true and $z_i$ if false. Every variable digit is $1$. In clause digit $c_j$ the chosen numbers contribute the number of true literal occurrences of $c_j$, which is $1$, $2$ or $3$; add $2$, $1$ or $0$ of the slacks $g_j, h_j$ to make it $3$.

*If some subset sums to $T$,* the variable digit $x_i$ forces exactly one of $y_i, z_i$ into the subset; set $x_i$ true iff $y_i$ is chosen. In clause digit $c_j$ the slacks contribute at most $2$, so the chosen $y$'s and $z$'s contribute at least $1$: some chosen number corresponds to a literal occurrence in $c_j$, and by the choice of assignment that literal is true. So every clause is satisfied.

The $2n + 2m + 1$ numbers have $n + m$ decimal digits each, so the output has length $O((n + m)^2)$, written in polynomial time (in binary, $O((n+m)^2)$ bits too).
:::

::: example Subset sum for a two-clause formula {#ex-subset-sum}
Build the instance for $\varphi = (x_1 \lor x_2 \lor \overline{x_3}) \land (\overline{x_1} \lor x_2 \lor x_3)$ and find a subset with sum $T$.
::: solution
Digits in the order $x_1\,x_2\,x_3\,|\,c_1\,c_2$:

| number | $x_1$ | $x_2$ | $x_3$ | $c_1$ | $c_2$ | value |
|---|---|---|---|---|---|---|
| $y_1$ | 1 | 0 | 0 | 1 | 0 | $10010$ |
| $z_1$ | 1 | 0 | 0 | 0 | 1 | $10001$ |
| $y_2$ | 0 | 1 | 0 | 1 | 1 | $1011$ |
| $z_2$ | 0 | 1 | 0 | 0 | 0 | $1000$ |
| $y_3$ | 0 | 0 | 1 | 0 | 1 | $101$ |
| $z_3$ | 0 | 0 | 1 | 1 | 0 | $110$ |
| $g_1 = h_1$ | 0 | 0 | 0 | 1 | 0 | $10$ |
| $g_2 = h_2$ | 0 | 0 | 0 | 0 | 1 | $1$ |
| $T$ | 1 | 1 | 1 | 3 | 3 | $11133$ |

The assignment $x_1 = 1$, $x_2 = 1$, $x_3 = 0$ chooses $y_1 + y_2 + z_3 = 10010 + 1011 + 110 = 11131$. Clause $c_1$ has three true literals (digit $3$) and $c_2$ one (digit $1$), so add $g_2 + h_2 = 2$: the total is $11133 = T$.

```python
def to_subset_sum(phi, n):                        # 3SAT -> SUBSET-SUM (karp.py)
    m = len(phi)
    def num(var, clause_counts):                  # n variable digits, then m clause digits
        d = [0] * (n + m)
        if var is not None: d[var - 1] = 1
        for j, count in clause_counts: d[n + j] += count
        return int("".join(map(str, d)))
    nums = []
    for i in range(1, n + 1):
        nums.append(num(i, [(j, c.count(i)) for j, c in enumerate(phi)]))     # y_i
        nums.append(num(i, [(j, c.count(-i)) for j, c in enumerate(phi)]))    # z_i
    for j in range(m):
        nums += [num(None, [(j, 1)])] * 2                                     # g_j, h_j
    return nums, int("1" * n + "3" * m)

def has_subset_sum(nums, t):                      # set of reachable sums, capped at t
    reach = {0}
    for a in nums:
        reach |= {s + a for s in reach if s + a <= t}
    return t in reach

if __name__ == "__main__":
    print(to_subset_sum([[1, 2, -3], [-1, 2, 3]], 3))
```

```console
$ python3 karp.py
([10010, 10001, 1011, 1000, 101, 110, 10, 10, 1, 1], 11133)
```
:::
:::

### Numbers and strong NP-completeness

The dynamic program of [[complexity/time-complexity]] solves $\mathit{SUBSET\text{-}SUM}$ in $O(kT)$ steps, which is polynomial when the numbers are small. There is no contradiction: the reduction above produces numbers with $n + m$ decimal digits, exponentially large in the formula size. Problems like this, hard only because their numbers can be huge, are called **weakly** $\mathsf{NP}$-complete.

::: definition Strong NP-completeness {#def-strong-npc}
For an instance $w$ of a problem with numbers, let $\mathrm{max}(w)$ be the largest number in it. An algorithm is **pseudo-polynomial** if its running time is polynomial in $\lvert w\rvert$ and $\mathrm{max}(w)$. A problem is **strongly $\mathsf{NP}$-complete** if it remains $\mathsf{NP}$-complete when restricted to instances with $\mathrm{max}(w) \le p(\lvert w\rvert)$ for some polynomial $p$ — equivalently, when its numbers are written in unary.
:::

::: proposition Pseudo-polynomial algorithms for strongly NP-complete problems {#prop-strong}
If a strongly $\mathsf{NP}$-complete problem has a pseudo-polynomial algorithm, then $\mathsf{P} = \mathsf{NP}$.
:::

::: proof
On the restricted instances with $\mathrm{max}(w) \le p(\lvert w\rvert)$, a running time polynomial in $\lvert w\rvert$ and $\mathrm{max}(w)$ is polynomial in $\lvert w\rvert$. So the restricted problem, which is $\mathsf{NP}$-complete, would be in $\mathsf{P}$; apply [[complexity/np-completeness#thm-npc]].
:::

$\mathit{TSP}$ is strongly $\mathsf{NP}$-complete — the reduction from $\mathit{HAMCYCLE}$ uses only weights $1$ and $2$ — and so are bin packing and 3-partition (Garey and Johnson, 1975). $\mathit{SUBSET\text{-}SUM}$, $\mathit{PARTITION}$ and $\mathit{KNAPSACK}$ are not, unless $\mathsf{P} = \mathsf{NP}$, since they have pseudo-polynomial algorithms. This distinction predicts approximability: knapsack has arbitrarily good polynomial-time approximations ([[complexity/approximation-pcp]]), bin packing does not.

## Graph colouring

A **proper $k$-colouring** of a graph assigns one of $k$ colours to each vertex so that adjacent vertices get different colours; $\mathit{3COL} = \{\langle G\rangle : G$ has a proper 3-colouring$\}$. Two-colourability is the same as bipartiteness and is decided by BFS ([[algorithms/graph-search#thm-bipartite]]). Three colours are much harder.

::: lemma The OR gadget {#lem-or-gadget}
Let $x$ and $y$ be vertices whose colours lie in $\{T, F\}$, two of the three colours $T, F, B$. Add a triangle $g_0, g_1, g_2$ with edges $\{x, g_0\}$ and $\{y, g_1\}$. Then (i) if $x$ and $y$ both have colour $F$, every proper colouring gives $g_2$ colour $F$; (ii) if $x$ or $y$ has colour $T$, the gadget has a proper colouring with $g_2$ coloured $T$.
:::

::: proof
(i) $g_0 \ne F$ and $g_1 \ne F$ (neighbours of $x$, $y$), and $g_0 \ne g_1$, so $\{g_0, g_1\} = \{T, B\}$ and $g_2$, adjacent to both, is $F$. (ii) If $x = T$: colour $g_0 = F$, $g_1 = B$, $g_2 = T$; $g_1 = B$ differs from $y \in \{T, F\}$. If $y = T$: colour $g_1 = F$, $g_0 = B$, $g_2 = T$.
:::

So $g_2$ behaves like $x \lor y$: it can be $T$ exactly when $x \lor y$ is true. (In case (ii) the gadget does not *force* $T$; it only permits it, which is all we need.)

::: theorem 3-colouring is NP-complete {#thm-3col}
$\mathit{3COL}$ is $\mathsf{NP}$-complete.
:::

::: proof
*In $\mathsf{NP}$:* the certificate is the colouring.

*Reduction from $\mathit{3SAT}$.* Build $G$ as follows.

- A **palette** triangle with vertices named $T$, $F$, $B$. In any proper 3-colouring they get three different colours; we name the colours after them.
- For each variable $x_i$, vertices $x_i$ and $\overline{x_i}$ forming a triangle with $B$. So each literal vertex is coloured $T$ or $F$, and $x_i$ and $\overline{x_i}$ get opposite colours: a truth assignment.
- For each clause $(\ell_1 \lor \ell_2 \lor \ell_3)$, an OR gadget with inputs $\ell_1, \ell_2$ and output $g_2$, a second OR gadget with inputs $g_2, \ell_3$ and output $g_5$, and edges $\{g_5, F\}$ and $\{g_5, B\}$, which force $g_5$ to have colour $T$.

*If $\varphi$ is satisfiable,* colour the palette, colour each literal vertex $T$ or $F$ by the assignment, and colour each clause's gadgets: by [[#lem-or-gadget]] (ii) the first gadget can output $T$ if $\ell_1 \lor \ell_2$ is true, and otherwise it is coloured with output $F$ (case (i) gives a valid colouring with $g_0, g_1 \in \{T, B\}$); either way $g_2 \in \{T, F\}$, and since the clause is satisfied, $g_2 = T$ or $\ell_3 = T$, so the second gadget can output $g_5 = T$, which is compatible with the edges to $F$ and $B$. Different clauses' gadgets share only literal vertices, so the colourings combine.

*If $G$ is 3-colourable,* read the assignment from the colours of the $x_i$. Suppose a clause had all three literals coloured $F$. By [[#lem-or-gadget]] (i), $g_2 = F$; then both inputs of the second gadget are $F$, so $g_5 = F$ — but $g_5$ is adjacent to the palette vertex $F$. So every clause has a literal coloured $T$, i.e. true.

$G$ has $3 + 2n + 6m$ vertices and $3 + 3n + 12m$ edges.
:::

```python
def to_3col(phi, n):                              # 3SAT -> 3COL (karp.py)
    E = [("T", "F"), ("F", "B"), ("B", "T")]      # palette triangle
    L = lambda l: ("x", l)                        # literal vertices
    for i in range(1, n + 1):
        E += [(L(i), L(-i)), (L(i), "B"), (L(-i), "B")]
    for j, (a, b, c) in enumerate(phi):
        g = [("g", j, t) for t in range(6)]
        E += [(L(a), g[0]), (L(b), g[1]), (g[0], g[1]), (g[0], g[2]), (g[1], g[2])]   # g2 = OR(a, b)
        E += [(g[2], g[3]), (L(c), g[4]), (g[3], g[4]), (g[3], g[5]), (g[4], g[5])]   # g5 = OR(g2, c)
        E += [(g[5], "F"), (g[5], "B")]                                              # force g5 = T
    return (E,)

def colourable(E, k=3):                           # backtracking, high-degree vertices first
    adj = {}
    for u, v in E:
        adj.setdefault(u, set()).add(v); adj.setdefault(v, set()).add(u)
    order, col = sorted(adj, key=lambda v: -len(adj[v])), {}
    def go(i):
        if i == len(order): return True
        for c in range(k):
            if all(col.get(w) != c for w in adj[order[i]]):
                col[order[i]] = c
                if go(i + 1): return True
                del col[order[i]]
        return False
    return go(0)
```

::: example Testing all four reductions {#ex-karp-test}
Check the four reductions of `karp.py` against brute-force satisfiability on random small formulas, making sure that unsatisfiable formulas are included.
::: solution
Random 3CNF formulas with few clauses are almost always satisfiable, so the test uses two or three variables and up to eight clauses, some of the form $(a \lor b \lor a)$ with a repeated literal, which rule out more assignments.

```python
import random
from karp import sat, to_is, has_is, to_hampath, hampath, to_subset_sum, has_subset_sum, to_3col, colourable

def random_clause(n):
    vs = random.sample(range(1, n + 1), min(n, random.choice([2, 3])))
    lits = [v * random.choice([1, -1]) for v in vs]
    return (lits * 2)[:3]                     # (a v b) becomes (a v b v a)

random.seed(2026)
checks = {"IS": (to_is, has_is), "HAMPATH": (to_hampath, hampath),
          "SUBSET-SUM": (to_subset_sum, has_subset_sum), "3COL": (to_3col, colourable)}
wrong = dict.fromkeys(checks, 0); count = [0, 0]
for _ in range(400):
    n = random.choice([2, 3]); m = random.randint(1, 8 if n == 2 else 6)
    phi = [random_clause(n) for _ in range(m)]
    s = sat(phi, n); count[s] += 1
    for name, (reduce, solve) in checks.items():
        wrong[name] += solve(*reduce(phi, n)) != s
print(count[1], "satisfiable and", count[0], "unsatisfiable formulas")
print("disagreements with brute force:", wrong)
```

```console
$ python3 karp_test.py
366 satisfiable and 34 unsatisfiable formulas
disagreements with brute force: {'IS': 0, 'HAMPATH': 0, 'SUBSET-SUM': 0, '3COL': 0}
```

The test takes about 25 seconds, almost all of it in the Hamiltonian-path search on the unsatisfiable instances, where backtracking must exhaust every possibility. A separate test of the undirected construction of [[#thm-uhampath]] on 300 random digraphs with three to five vertices (41 with a Hamiltonian path) also found no disagreement. Agreement on a few hundred instances does not prove a reduction correct, but a wrong gadget almost always fails such a test quickly.
:::
:::

## A wider catalogue

The table pairs problems in $\mathsf{P}$ with superficially similar $\mathsf{NP}$-complete ones; the boundary between them is often a single word.

| in $\mathsf{P}$ | $\mathsf{NP}$-complete |
|---|---|
| $\mathit{2SAT}$ (clauses of two literals) | $\mathit{3SAT}$ |
| 2-colouring (bipartiteness) | 3-colouring, even for planar graphs of maximum degree 4 |
| Euler circuit (every *edge* once) | Hamiltonian cycle (every *vertex* once) |
| shortest simple path | longest simple path |
| minimum cut ([[algorithms/network-flow#thm-maxflow-mincut]]) | maximum cut |
| bipartite (2-dimensional) matching | 3-dimensional matching |
| linear programming | integer linear programming (0–1 programs) |
| minimum spanning tree | Steiner tree (connect only a given subset of vertices, minimum total weight) |
| edge cover | vertex cover |

Other standard members of the catalogue include **set cover** (choose at most $k$ of a family of sets covering a universe), **exact cover**, **bin packing**, **partition** ([[#ex-partition]]), **knapsack**, **graph isomorphism of subgraphs** (does $G$ contain a copy of $H$?), many **scheduling** problems, and generalised puzzles: $n^2 \times n^2$ Sudoku completion (Yato and Seta, 2003) and Minesweeper consistency (Kaye, 2000).

::: widget graph
nodes: SAT@0,2; 3SAT@2,2; IS@4,3.5; CLIQUE@6,4.2; VC@6,2.8; HAMPATH@4,2; UHAMPATH@6,1.4; HAMCYCLE@8,2; TSP@10,2; SUBSETSUM@4,0.6; PARTITION@6,0; 3COL@2,0.2; SETCOVER@8,3.5
edges: SAT>3SAT; 3SAT>IS; IS>CLIQUE; IS>VC; VC>SETCOVER; 3SAT>HAMPATH; HAMPATH>UHAMPATH; HAMPATH>HAMCYCLE; HAMCYCLE>TSP; 3SAT>SUBSETSUM; SUBSETSUM>PARTITION; 3SAT>3COL
algorithm: topo
start: SAT
caption: The reductions of this chapter and its exercises; an arrow $A \to B$ means $A \le_p B$, so $\mathsf{NP}$-hardness flows along the arrows from $\mathit{SAT}$ (Cook–Levin). Step through the topological sort to see an order in which the results can be proved. The undirected cycle and $\mathit{TSP}$ use $\mathit{UHAMPATH}$ in the same way as the directed cycle uses $\mathit{HAMPATH}$.
:::

::: quiz
A student proves "$\mathit{LONGEST\text{-}PATH} = \{\langle G, s, t, k\rangle : G$ has a simple path from $s$ to $t$ with at least $k$ edges$\}$ is $\mathsf{NP}$-complete". Which argument works?
- [x] It is in $\mathsf{NP}$, and $\langle G, s, t\rangle \mapsto \langle G, s, t, n - 1\rangle$ reduces $\mathit{HAMPATH}$ to it.
- [ ] Reduce it to $\mathit{SAT}$.
- [ ] Shortest paths are in $\mathsf{P}$, and longest paths are the "opposite" problem, so they are hard.
- [ ] Negate all edge weights and use Bellman–Ford.
::: solution
A simple path with $n - 1$ edges visits all $n$ vertices, so it is a Hamiltonian path: $\mathit{HAMPATH}$ is the special case $k = n - 1$, a reduction by restriction. Reducing to $\mathit{SAT}$ only shows membership in $\mathsf{NP}$. "Opposite" is not an argument (minimum and maximum spanning trees are both easy). Bellman–Ford with negated weights fails because the graph then has negative cycles, and it computes shortest *walks*, not simple paths.
:::
:::

::: history
Richard Karp's "Reducibility among combinatorial problems" (in *Complexity of Computer Computations*, 1972) proved 21 problems $\mathsf{NP}$-complete, among them clique, vertex cover, set cover, Hamiltonian circuit (directed and undirected), chromatic number, exact cover, 3-dimensional matching, knapsack (in the form we call subset sum), partition, max cut and 0–1 integer programming. In 1976 Michael Garey, David Johnson and Larry Stockmeyer showed that 3-colouring remains $\mathsf{NP}$-complete for planar graphs, and Garey and Johnson introduced strong $\mathsf{NP}$-completeness (1978). Their book *Computers and Intractability: A Guide to the Theory of NP-Completeness* (1979), with its appendix of more than 300 problems, became the standard reference; Johnson's "NP-completeness column" in the *Journal of Algorithms* (1981–1992) kept it up to date. The diamond construction for Hamiltonian path used here follows Sipser's *Introduction to the Theory of Computation*.
:::

## Where this leads

$\mathsf{NP}$-completeness is not the end of the story for a practical problem but the start of a different one. [[complexity/coping-with-hardness]] treats exact algorithms that are exponential but fast on real instances, fixed-parameter algorithms (vertex cover with small $k$ is easy) and SAT solvers, which turn the Cook–Levin direction around: they solve other problems by reducing them *to* $\mathit{SAT}$. [[complexity/approximation-pcp]] asks how close to optimal a polynomial-time algorithm can get for the optimisation versions of these problems — and finds that the answer varies enormously: within a factor of $2$ for vertex cover, $\ln n$ for set cover, and not within any constant factor for general $\mathit{TSP}$ or for clique.

::: summary
- An $\mathsf{NP}$-completeness proof shows membership in $\mathsf{NP}$ and gives a polynomial-time reduction **from** a known $\mathsf{NP}$-complete problem, proving **both** directions ([[#alg-npc-recipe]]).
- $\mathit{3SAT} \le_p \mathit{IS}$ by clause triangles and conflict edges ([[#thm-is]]); $\mathit{CLIQUE}$ (complement graph) and $\mathit{VC}$ (complement set) follow ([[#thm-clique-vc]]).
- $\mathit{3SAT} \le_p \mathit{HAMPATH}$ by diamonds crossed left-to-right or right-to-left, with clause detours and separators ([[#thm-hampath]]); undirected paths, cycles and $\mathit{TSP}$ follow ([[#thm-uhampath]]).
- $\mathit{3SAT} \le_p \mathit{SUBSET\text{-}SUM}$ by decimal numbers with one digit per variable and per clause and no carries ([[#thm-subset-sum]]); it is only **weakly** $\mathsf{NP}$-complete, while $\mathit{TSP}$ and bin packing are **strongly** $\mathsf{NP}$-complete ([[#def-strong-npc]]).
- $\mathit{3SAT} \le_p \mathit{3COL}$ with a palette triangle, literal triangles and OR gadgets ([[#thm-3col]]).
- Implementing a reduction and testing it against brute force on small instances (including "no" instances) catches most errors in gadgets.
:::

## Exercises

::: exercise Size of the independent-set graph {level=1 check="24"}
Build the graph of [[#thm-is]] for $\varphi = (x_1 \lor x_2 \lor x_3) \land (\overline{x_1} \lor \overline{x_2} \lor x_3) \land (x_1 \lor \overline{x_2} \lor \overline{x_3}) \land (\overline{x_1} \lor x_2 \lor \overline{x_3})$. How many vertices and edges does it have, and what is $k$? (Enter the number of edges.)
::: solution
$12$ vertices and $k = m = 4$. Triangle edges: $4 \cdot 3 = 12$. Conflict edges: $x_1$ occurs positively in clauses $1, 3$ and negatively in $2, 4$, giving $2 \cdot 2 = 4$ edges; $x_2$ positively in $1, 4$ and negatively in $2, 3$, $4$ edges; $x_3$ positively in $1, 2$ and negatively in $3, 4$, $4$ edges. Total $12 + 12 = 24$. (The formula is satisfied by $x_1 = x_2 = x_3 = 1$: each clause contains at least one positive literal. So the graph has an independent set of size $4$, for instance the four vertices of the positive literals $x_1, x_3, x_1, x_2$ chosen from clauses $1$–$4$.)
:::
:::

::: exercise From independent set to vertex cover {level=1 check="6"}
A graph has $10$ vertices and its largest independent set has $4$ vertices. What is the size of its smallest vertex cover? (Enter the number.)
::: solution
By the proof of [[#thm-clique-vc]], $S$ is independent iff $V \setminus S$ is a vertex cover, so the minimum vertex cover has size $n - \alpha(G) = 10 - 4 = 6$.
:::
:::

::: exercise The subset-sum target {level=1 check="1111333"}
What is the target $T$ of the reduction of [[#thm-subset-sum]] for a formula with $4$ variables and $3$ clauses? How many numbers does the instance have? (Enter $T$.)
::: solution
$T$ has a $1$ in each of the $4$ variable digits followed by a $3$ in each of the $3$ clause digits: $T = 1111333$. There are $2n + 2m = 8 + 6 = 14$ numbers.
:::
:::

::: exercise Partition {#ex-partition level=2}
$\mathit{PARTITION} = \{\langle a_1, \dots, a_k\rangle :$ the numbers can be split into two groups with equal sums$\}$. Prove that it is $\mathsf{NP}$-complete by a reduction from $\mathit{SUBSET\text{-}SUM}$.
::: solution
In $\mathsf{NP}$: the certificate is one group. Given $\langle a_1, \dots, a_k, T\rangle$, let $S = \sum a_i$. If $T > S$ output a fixed no-instance such as $\langle 1, 2\rangle$. Otherwise output $\langle a_1, \dots, a_k, b, c\rangle$ with $b = S + T$ and $c = 2S - T$. The total is $S + (S + T) + (2S - T) = 4S$, so each group must sum to $2S$. Since $b + c = 3S > 2S$, $b$ and $c$ are in different groups. The group containing $c$ needs $T$ more from the $a_i$, and the other group needs $2S - (S + T) = S - T$, the rest. So a partition exists iff some sub-collection of the $a_i$ sums to $T$. The new numbers have $O(\log S)$ bits: polynomial time.
:::
:::

::: exercise Four colours {level=2}
Prove that $\mathit{4COL}$ is $\mathsf{NP}$-complete. Why does this not contradict the four colour theorem?
::: solution
In $\mathsf{NP}$ by the colouring certificate. Reduce $\mathit{3COL}$: add one new vertex $u$ adjacent to every vertex of $G$. In a 4-colouring of $G + u$, $u$'s colour appears nowhere else, so $G$ uses only three colours; conversely a 3-colouring of $G$ extends by giving $u$ the fourth colour. The four colour theorem says every *planar* graph is 4-colourable, so $\mathit{4COL}$ restricted to planar graphs is trivial; but $G + u$ is in general not planar, so there is no contradiction. (Planar $\mathit{3COL}$ is $\mathsf{NP}$-complete.)
:::
:::

::: exercise Vertex cover to set cover {level=2}
$\mathit{SETCOVER} = \{\langle U, S_1, \dots, S_r, k\rangle :$ some $k$ of the sets have union $U\}$. Show $\mathit{VC} \le_p \mathit{SETCOVER}$.
::: solution
Given $\langle G, k\rangle$ with $G = (V, E)$, let $U = E$ and, for each vertex $v$, $S_v = \{e \in E : v \in e\}$, the edges at $v$. A set $C \subseteq V$ is a vertex cover iff every edge is incident to some $v \in C$ iff $\bigcup_{v \in C} S_v = E$. So $G$ has a vertex cover of size at most $k$ iff some $k$ of the sets cover $U$ (pad a smaller cover with arbitrary sets; if $k > n$, a cover of size $\le n$ exists trivially, and we may cap $k$ at $n$). In $\mathsf{NP}$: the chosen sets are a certificate.
:::
:::

::: exercise Half-size cliques {level=3}
Let $\mathit{HALF\text{-}CLIQUE} = \{\langle G\rangle : G$ has a clique with at least $n/2$ vertices, $n$ the number of vertices$\}$. Prove that it is $\mathsf{NP}$-complete.
::: solution
In $\mathsf{NP}$: the certificate is the clique. Reduce $\mathit{CLIQUE}$: given $\langle G, k\rangle$ with $n$ vertices (assume $k \le n$). If $k = n/2$, output $G$. If $k < n/2$, add $n - 2k$ new vertices adjacent to each other and to every vertex of $G$: the new graph has $2n - 2k$ vertices, and has a clique of size $n - k$ iff $G$ has one of size $k$ (a maximum clique of the new graph contains all the new vertices, which are adjacent to everything, plus a clique of $G$). If $k > n/2$, add $2k - n$ isolated vertices: the new graph has $2k$ vertices and needs a clique of size $k$, which cannot use isolated vertices (for $k \ge 2$), so it must be a $k$-clique of $G$. Each case adds $O(n)$ vertices: polynomial time. This "padding" technique shows that fixing the parameter as a function of $n$ often keeps a problem hard — in contrast, $k$-clique for a *constant* $k$ is in $\mathsf{P}$, by trying all $\binom{n}{k} = O(n^k)$ sets.
:::
:::

::: exercise Checking the undirected construction {level=3}
Implement the reduction $\mathit{HAMPATH} \le_p \mathit{UHAMPATH}$ of [[#thm-uhampath]] and test it on random small digraphs. Then explain why the middle vertices $v_{\text{mid}}$ are needed: give a digraph without a Hamiltonian path from $s$ to $t$ whose "two-vertex" version ($v_{\text{in}} - v_{\text{out}}$ only) has one.
::: solution
```python
import random
from itertools import permutations
def directed_to_undirected(V, E, s, t):
    """HAMPATH <=p UHAMPATH: v -> v_in - v_mid - v_out; s keeps only s_out, t only t_in."""
    nodes = [(s, "out"), (t, "in")] + [(v, p) for v in V if v not in (s, t) for p in ("in", "mid", "out")]
    F = {frozenset(((v, "in"), (v, "mid"))) for v in V if v not in (s, t)}
    F |= {frozenset(((v, "mid"), (v, "out"))) for v in V if v not in (s, t)}
    F |= {frozenset(((u, "out"), (v, "in"))) for u, v in E if u != t and v != s}
    return nodes, F, (s, "out"), (t, "in")

def ham(V, adj, s, t):          # adj(u, v) -> bool; brute force over orders
    mid = [v for v in V if v not in (s, t)]
    return any(all(adj(a, b) for a, b in zip((s,) + p, p + (t,))) for p in permutations(mid))

random.seed(5); wrong = yes = 0
for _ in range(300):
    n = random.randint(3, 5); V = list(range(n))
    E = {(u, v) for u in V for v in V if u != v and random.random() < 0.4}
    d = ham(V, lambda a, b: (a, b) in E, 0, n - 1); yes += d
    N, F, s2, t2 = directed_to_undirected(V, E, 0, n - 1)
    wrong += d != ham(N, lambda a, b: frozenset((a, b)) in F, s2, t2)
print(yes, "of 300 digraphs have a Hamiltonian path; disagreements:", wrong)
```

```console
$ python3 uham.py
41 of 300 digraphs have a Hamiltonian path; disagreements: 0
```

Without the middle vertex, an undirected path can enter a gadget at $v_{\text{in}}$ and leave it at once along another edge into $v_{\text{in}}$, traversing a directed edge backwards. Brute force over all digraphs on four vertices finds the smallest example: vertices $s, a, b, t$ with edges $s \to a$, $a \to b$, $b \to a$, $a \to t$. There is no directed Hamiltonian path from $s$ to $t$: after $s$ comes $a$ (the only edge out of $s$), then $b$, and $b$ has no edge to $t$. But in the two-vertex version

$$
s_{\text{out}} - a_{\text{in}} - b_{\text{out}} - b_{\text{in}} - a_{\text{out}} - t_{\text{in}}
$$

is an undirected Hamiltonian path: it uses $b \to a$ backwards (from $a_{\text{in}}$ to $b_{\text{out}}$) and $a \to b$ backwards (from $b_{\text{in}}$ to $a_{\text{out}}$). With middle vertices this is impossible: $a_{\text{mid}}$ has degree $2$, so any Hamiltonian path must go $a_{\text{in}} - a_{\text{mid}} - a_{\text{out}}$ consecutively. The general lesson is the one in step 2 of [[#thm-hampath]]: a vertex of degree $2$ fixes both of its neighbours on any Hamiltonian path.
:::
:::
