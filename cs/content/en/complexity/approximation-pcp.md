Most $\mathsf{NP}$-complete problems are really **optimisation** problems in disguise: we do not just want to know whether a vertex cover of size $k$ exists, we want the smallest one; not whether a tour of length $B$ exists, but the shortest tour. If $\mathsf{P} \ne \mathsf{NP}$ we cannot find optimal solutions efficiently in the worst case. But a cover twice the optimal size, or a tour $1.5$ times the shortest, may be perfectly good — provided we can *prove* that our algorithm is never worse than that.

This chapter studies such **approximation algorithms**. We prove guarantees for three classic ones — vertex cover within a factor of $2$, set cover within $\ln n + 1$, metric $\mathit{TSP}$ within $2$ — and for random assignments to $\mathit{MAX\text{-}3SAT}$, and show that general $\mathit{TSP}$ cannot be approximated within *any* factor unless $\mathsf{P} = \mathsf{NP}$. Then we turn to limits. For a long time it was unclear why some problems approximate so much better than others. The answer came from an unexpected direction: a new characterisation of $\mathsf{NP}$, the **PCP theorem**, which says that every $\mathsf{NP}$ statement has a proof that can be checked by reading only a constant number of its bits. We state the theorem (its proof is beyond this course), prove that it is equivalent to the hardness of approximating $\mathit{MAX\text{-}3SAT}$, and survey the precise inapproximability results that followed.

## Approximation ratios

::: definition Optimisation problem and approximation ratio {#def-approx}
An **optimisation problem** assigns to each instance $x$ a set of feasible solutions, each with a positive **cost** (to minimise) or **value** (to maximise); $\mathrm{OPT}(x)$ is the best achievable. A polynomial-time algorithm $A$ is a **$\rho$-approximation**, for $\rho \ge 1$ (possibly depending on the input size), if for every instance $x$ it returns a feasible solution with
$$
\mathrm{cost}(A(x)) \le \rho\cdot\mathrm{OPT}(x) \ \ \text{(minimisation)}, \qquad \mathrm{value}(A(x)) \ge \mathrm{OPT}(x)/\rho \ \ \text{(maximisation)}.
$$
:::

The ratio is a **worst-case** guarantee over all instances. The difficulty in proving one is that we do not know $\mathrm{OPT}(x)$ — computing it is $\mathsf{NP}$-hard. Every proof below therefore compares the algorithm's solution with a **lower bound** on $\mathrm{OPT}$ (for minimisation) that *can* be computed: a matching, a spanning tree, a fractional count.

## Vertex cover: a factor of two

::: algorithm Matching-based vertex cover {#alg-vc-approx}
Start with $C = \emptyset$. For each edge $\{u, v\}$ in turn: if neither $u$ nor $v$ is in $C$, add both. Output $C$.
:::

::: theorem The matching algorithm is a 2-approximation {#thm-vc-approx}
[[#alg-vc-approx]] runs in linear time and outputs a vertex cover $C$ with $\lvert C\rvert \le 2\,\mathrm{OPT}$.
:::

::: proof
*Cover:* after the scan, every edge has an endpoint in $C$ — either it was already covered when examined, or both endpoints were added then. *Ratio:* let $M$ be the set of edges whose endpoints were added. No two edges of $M$ share a vertex (when an edge is added to $M$, neither endpoint is in $C$, so it shares no vertex with earlier edges of $M$), so $M$ is a **matching** and $\lvert C\rvert = 2\lvert M\rvert$. Any vertex cover must contain an endpoint of every edge of $M$, and these endpoints are distinct, so $\mathrm{OPT} \ge \lvert M\rvert$. Hence $\lvert C\rvert = 2\lvert M\rvert \le 2\,\mathrm{OPT}$.
:::

::: example The matching algorithm on a small graph {#ex-vc-approx}
Run [[#alg-vc-approx]] on the graph with edges $12, 13, 23, 24, 34, 45, 46, 56$ (in this order) and compare with the optimum.
::: solution
Edge $12$: both uncovered, $C = \{1, 2\}$. Edges $13$, $23$, $24$ are now covered. Edge $34$: both uncovered, $C = \{1, 2, 3, 4\}$. Edges $45$, $46$ covered. Edge $56$: both uncovered, $C = \{1, \dots, 6\}$. The matching is $\{12, 34, 56\}$, so $\lvert C\rvert = 6$ and the proof guarantees $\mathrm{OPT} \ge 3$. In fact $\mathrm{OPT} = 4$, for example $\{2, 3, 4, 5\}$, so the ratio achieved is $1.5$.

```python
from itertools import combinations

def matching_cover(edges):
    """Take both endpoints of every edge of a greedily built maximal matching."""
    cover = set()
    for u, v in edges:
        if u not in cover and v not in cover:       # edge still uncovered: add it to the matching
            cover |= {u, v}
    return cover

def min_cover_size(vertices, edges):                # brute force, for comparison
    return next(k for k in range(len(vertices) + 1)
                for C in combinations(vertices, k)
                if all(u in C or v in C for u, v in edges))

E = [(1, 2), (1, 3), (2, 3), (2, 4), (3, 4), (4, 5), (4, 6), (5, 6)]
print(sorted(matching_cover(E)), min_cover_size(range(1, 7), E))
```

```console
$ python3 vc2.py
[1, 2, 3, 4, 5, 6] 4
```
:::
:::

::: widget graph
nodes: 1@0,1; 2@1,2; 3@1,0; 4@2,1; 5@3,2; 6@3,0
edges: 1-2; 1-3; 2-3; 2-4; 3-4; 4-5; 4-6; 5-6
algorithm: none
caption: The graph of [[#ex-vc-approx]]. The matching $\{12, 34, 56\}$ found by the algorithm forces any cover to contain three distinct vertices, one from each matched edge — the lower bound $\mathrm{OPT} \ge 3$. The true optimum $\{2, 3, 4, 5\}$ has four vertices; check that every edge touches it. The triangle $\{1, 2, 3\}$ alone already needs two cover vertices, which is why $\mathrm{OPT} > 3$ here.
:::

The factor $2$ is tight for this algorithm: on the complete bipartite graph $K_{n,n}$ it may pick a perfect matching and output all $2n$ vertices, while one side ($n$ vertices) is a cover. Despite decades of effort, no polynomial-time algorithm with ratio $2 - \varepsilon$ for a constant $\varepsilon > 0$ is known, and there is evidence that none exists ([[#sec-inapprox]]).

::: warning Approximation does not survive the reductions of NP-completeness
$\mathit{IS}$, $\mathit{VC}$ and $\mathit{CLIQUE}$ are equivalent as decision problems ([[complexity/np-complete-problems#thm-clique-vc]]), but their approximability is completely different. A vertex cover $C$ gives the independent set $V \setminus C$, and a cover within a factor $2$ of optimal can still give a useless independent set: if $\mathrm{OPT}_{\mathit{VC}} = n/2$, a cover of size $n$ is a $2$-approximation, and its complement is empty. Indeed independent set (equivalently clique) cannot be approximated within $n^{1 - \varepsilon}$ unless $\mathsf{P} = \mathsf{NP}$. Polynomial-time reductions preserve *exact* solvability, not the quality of approximate solutions; transferring approximability needs special **approximation-preserving reductions**.
:::

## Set cover: a logarithmic factor

$\mathit{SETCOVER}$: given a universe $U$ of $n$ elements and sets $S_1, \dots, S_r \subseteq U$ whose union is $U$, choose as few sets as possible whose union is $U$. (Vertex cover is the special case where the elements are the edges and the sets are the vertices' edge sets.)

::: algorithm Greedy set cover {#alg-greedy-set-cover}
While some element is uncovered, choose a set that covers the largest number of uncovered elements.
:::

::: theorem Greedy set cover is an $H_n$-approximation {#thm-set-cover}
[[#alg-greedy-set-cover]] chooses at most $H_n\,\mathrm{OPT}$ sets, where $H_n = 1 + \frac12 + \dots + \frac1n \le \ln n + 1$.
:::

::: proof
When the greedy algorithm chooses a set that covers $k$ new elements, charge each of these elements a **price** $1/k$. The total price of all elements equals the number of sets chosen. Order the elements $e_1, \dots, e_n$ in the order in which they are covered (ties in any order). Just before $e_j$ is covered, at least $n - j + 1$ elements are uncovered, and they are all covered by the $\mathrm{OPT}$ sets of an optimal solution, so one of those sets covers at least $(n - j + 1)/\mathrm{OPT}$ of them. The greedy choice covers at least as many new elements, so the price of $e_j$ is at most $\mathrm{OPT}/(n - j + 1)$. Summing,
$$
\#\text{sets chosen} = \sum_{j=1}^{n} \mathrm{price}(e_j) \le \mathrm{OPT}\sum_{j=1}^{n}\frac{1}{n - j + 1} = H_n\,\mathrm{OPT}.
$$
Finally $H_n \le 1 + \int_1^n dx/x = 1 + \ln n$.
:::

::: example Greedy is fooled by a logarithmic factor {#ex-set-cover}
Construct instances on which greedy uses about $\tfrac12\log_2 n$ times as many sets as necessary.
::: solution
Arrange $2(2^k - 1)$ elements in two rows of $2^k - 1$ columns. The optimal cover uses the two sets $\mathrm{TOP}$ and $\mathrm{BOTTOM}$ (one per row). Add sets $S_{k-1}, S_{k-2}, \dots, S_0$, where $S_j$ consists of both rows of a block of $2^j$ consecutive columns (blocks of $2^{k-1}, 2^{k-2}, \dots, 1$ columns side by side). At the start $S_{k-1}$ covers $2^k$ elements, more than the $2^k - 1$ of either row, so greedy takes it; then $S_{k-2}$ covers $2^{k-1}$ elements against $2^{k-1} - 1$ remaining in each row; and so on. Greedy takes all $k$ blocks.

```python
def greedy_set_cover(universe, sets):
    """Repeatedly pick the set covering the most uncovered elements."""
    uncovered, chosen = set(universe), []
    while uncovered:
        name = max(sets, key=lambda s: len(sets[s] & uncovered))
        if not sets[name] & uncovered:
            raise ValueError("the sets do not cover the universe")
        chosen.append(name); uncovered -= sets[name]
    return chosen

def bad_instance(k):
    """Two rows of 2^k - 1 elements; OPT = 2 (the rows), but greedy takes the k blocks."""
    top = [("t", i) for i in range(2 ** k - 1)]
    bottom = [("b", i) for i in range(2 ** k - 1)]
    sets = {"TOP": set(top), "BOTTOM": set(bottom)}
    start = 0
    for j in range(k - 1, -1, -1):              # blocks of 2^j columns, largest first
        cols = range(start, start + 2 ** j)
        sets[f"S{j}"] = {(r, i) for r in "tb" for i in cols}
        start += 2 ** j
    return top + bottom, sets

for k in (2, 3, 4, 5):
    U, S = bad_instance(k)
    print(k, len(U), greedy_set_cover(U, S))
```

```console
$ python3 setcover.py
2 6 ['S1', 'S0']
3 14 ['S2', 'S1', 'S0']
4 30 ['S3', 'S2', 'S1', 'S0']
5 62 ['S4', 'S3', 'S2', 'S1', 'S0']
```

With $n = 2^{k+1} - 2$ elements greedy uses $k = \log_2(n + 2) - 1$ sets against $\mathrm{OPT} = 2$: a ratio of about $\tfrac12\log_2 n$, which is within a constant factor of the $\ln n + 1$ guarantee. (More elaborate instances show that $H_n$ itself is essentially tight for greedy.)
:::
:::

::: widget plot
f: 1 + ln(x); ln(x); log(x)/log(2)/2
x: 1, 1000
labels: \ln n + 1 \text{ (greedy guarantee)}; \ln n \text{ (hardness threshold)}; \tfrac12\log_2 n \text{ (bad instances)}
caption: Three logarithms for set cover with $n$ elements. Greedy never uses more than $H_n \le \ln n + 1$ times the optimum; the instances of [[#ex-set-cover]] force about $\tfrac12\log_2 n \approx 0.72\ln n$; and no polynomial-time algorithm achieves $(1 - \varepsilon)\ln n$ unless $\mathsf{P} = \mathsf{NP}$ (Dinur and Steurer, 2014). So the simple greedy algorithm is, up to lower-order terms, the best possible.
:::

## The travelling salesman problem

For $\mathit{TSP}$ the answer depends on the distances.

::: theorem General TSP is inapproximable {#thm-tsp-inapprox}
If $\mathsf{P} \ne \mathsf{NP}$, then for no polynomial-time computable $\rho(n) \ge 1$ is there a polynomial-time $\rho(n)$-approximation for $\mathit{TSP}$ with arbitrary positive integer distances.
:::

::: proof
Suppose $A$ were such an algorithm. Given a graph $G$ with $n$ vertices, an instance of $\mathit{HAMCYCLE}$ ($\mathsf{NP}$-complete by [[complexity/np-complete-problems#thm-uhampath]]), build the complete graph on the same vertices with $d(u, v) = 1$ if $\{u, v\}$ is an edge of $G$ and $d(u, v) = \rho(n)\,n + 1$ otherwise. If $G$ has a Hamiltonian cycle, the optimal tour has length $n$, so $A$ returns a tour of length at most $\rho(n)\,n$ — which cannot use any non-edge, since one non-edge alone costs $\rho(n)\,n + 1$. So $A$'s tour is a Hamiltonian cycle of $G$. If $G$ has none, every tour uses a non-edge and has length more than $\rho(n)\,n$. Checking whether $A$'s tour has length $n$ therefore decides $\mathit{HAMCYCLE}$ in polynomial time. (The large distances have $O(\log(\rho(n)\,n))$ bits, so the instance has polynomial size.)
:::

The reduction uses distances that violate the **triangle inequality** $d(u, w) \le d(u, v) + d(v, w)$. Distances that satisfy it — road distances, Euclidean distances — make the problem approximable.

::: algorithm Double-tree algorithm for metric TSP {#alg-double-tree}
Compute a minimum spanning tree $T$ ([[algorithms/greedy-algorithms#alg-kruskal]]). List the vertices in the order in which a depth-first traversal of $T$ first visits them, and output the tour that visits them in this order and returns to the start.
:::

::: theorem The double-tree algorithm is a 2-approximation for metric TSP {#thm-double-tree}
If $d$ satisfies the triangle inequality, [[#alg-double-tree]] outputs a tour of length at most $2\,\mathrm{OPT}$.
:::

::: proof
*Lower bound:* deleting one edge from an optimal tour leaves a spanning path, which is a spanning tree, so $w(T) \le \mathrm{OPT}$. *Upper bound:* a full depth-first walk around $T$, which goes down and back up every edge, is a closed walk of length $2w(T)$ visiting every vertex. The output tour visits the vertices in the order of their first appearance in this walk, jumping directly from each vertex to the next new one. By the triangle inequality (applied repeatedly), each jump is no longer than the part of the walk it skips. So the tour has length at most $2w(T) \le 2\,\mathrm{OPT}$.
:::

Christofides's algorithm (1976; independently Serdyukov, 1978) improves the ratio to $3/2$ by adding to the tree a minimum-weight perfect matching on its odd-degree vertices instead of doubling it. For over four decades nothing better was known; in 2021 Anna Karlin, Nathan Klein and Shayan Oveis Gharan gave a randomised algorithm with ratio $3/2 - 10^{-36}$, a tiny but real improvement. On the other side, metric $\mathit{TSP}$ cannot be approximated within $123/122$ unless $\mathsf{P} = \mathsf{NP}$ (Karpinski, Lampis and Schmied, 2015). For points in the Euclidean plane there is a **polynomial-time approximation scheme** (PTAS): for every fixed $\varepsilon > 0$ a $(1 + \varepsilon)$-approximation running in polynomial time (Arora, 1998; Mitchell, 1999).

::: definition Approximation schemes {#def-ptas}
A **PTAS** for an optimisation problem is a family of algorithms, one for each $\varepsilon > 0$, that achieve ratio $1 + \varepsilon$ in time polynomial in $n$ for each fixed $\varepsilon$ (for example $n^{1/\varepsilon}$). An **FPTAS** runs in time polynomial in both $n$ and $1/\varepsilon$.
:::

Knapsack has an FPTAS (Ibarra and Kim, 1975): round each value down to a multiple of $\varepsilon\,v_{\max}/n$ and solve the rounded instance exactly by dynamic programming over values, in time $O(n^3/\varepsilon)$. This is possible because knapsack is only weakly $\mathsf{NP}$-complete ([[complexity/np-complete-problems#def-strong-npc]]): an FPTAS for a strongly $\mathsf{NP}$-complete problem with integer objective values bounded by a polynomial would solve it exactly (take $\varepsilon$ below $1/\mathrm{OPT}$), so none exists unless $\mathsf{P} = \mathsf{NP}$.

## MAX-3SAT and the method of conditional expectations

$\mathit{MAX\text{-}3SAT}$: given a 3CNF formula with $m$ clauses, each with three distinct variables, find an assignment satisfying as many clauses as possible.

::: theorem A random assignment satisfies 7/8 of the clauses {#thm-max3sat}
A uniformly random assignment satisfies $7m/8$ clauses in expectation. Hence every such formula has an assignment satisfying at least $7m/8$ clauses, and one can be found deterministically in polynomial time; this is a $8/7$-approximation.
:::

::: proof
A clause with three distinct variables is false only if all three literals are false, which happens with probability $(1/2)^3 = 1/8$. By linearity of expectation the expected number of satisfied clauses is $\frac78 m$. Some assignment does at least as well as the expectation.

*Derandomisation by conditional expectations.* Let $E(\text{partial assignment})$ be the expected number of satisfied clauses when the unassigned variables are random. It is computable in polynomial time: a clause already satisfied contributes $1$, and otherwise a clause with $f$ unassigned literals contributes $1 - 2^{-f}$ (so $0$ if $f = 0$). For each variable in turn, $E$ with the variable unassigned is the average of $E$ with $x_i = 0$ and $E$ with $x_i = 1$, so one of the two choices does not decrease $E$; take it. At the end all variables are assigned and $E$ is the actual number of satisfied clauses, which is at least the initial $7m/8$. Since $\mathrm{OPT} \le m$, the ratio is at most $8/7$.
:::

::: example Fixing variables without losing ground {#ex-conditional}
Apply the method of conditional expectations to the seven clauses $(x_1 \lor x_2 \lor x_3)$, $(\overline{x_1} \lor x_2 \lor \overline{x_4})$, $(x_1 \lor \overline{x_3} \lor x_4)$, $(\overline{x_2} \lor \overline{x_3} \lor \overline{x_4})$, $(\overline{x_1} \lor \overline{x_2} \lor x_3)$, $(x_2 \lor x_3 \lor x_4)$, $(\overline{x_1} \lor x_3 \lor \overline{x_4})$.
::: solution
```python
from fractions import Fraction
from itertools import product

def expected_satisfied(clauses, fixed):
    """E[# satisfied clauses] when variables in `fixed` are set and the rest are random."""
    total = Fraction(0)
    for c in clauses:
        if any(fixed.get(abs(l)) == (l > 0) for l in c):
            total += 1                                    # already satisfied
        else:
            free = len({abs(l) for l in c if abs(l) not in fixed})
            total += 1 - Fraction(1, 2 ** free)           # fails only if all free literals fail
    return total

def conditional_expectations(clauses, n):
    fixed = {}
    for v in range(1, n + 1):                             # keep the expectation from dropping
        fixed[v] = max((True, False), key=lambda b: expected_satisfied(clauses, {**fixed, v: b}))
    return fixed

phi = [[1, 2, 3], [-1, 2, -4], [1, -3, 4], [-2, -3, -4], [-1, -2, 3], [2, 3, 4], [-1, 3, -4]]
a = conditional_expectations(phi, 4)
best = max(sum(any((l > 0) == bits[abs(l) - 1] for l in c) for c in phi)
           for bits in product([False, True], repeat=4))
print(expected_satisfied(phi, {}), a, expected_satisfied(phi, a), best)
```

```console
$ python3 maxsat.py
49/8 {1: False, 2: True, 3: False, 4: True} 7 7
```

The initial expectation is $7 \cdot \frac78 = \frac{49}{8} = 6.125$. Fixing $x_1 = 0$, $x_2 = 1$, $x_3 = 0$, $x_4 = 1$ one at a time never lowers it, and the final assignment satisfies all $7$ clauses — here the optimum, found by brute force; the guarantee was at least $6.125$ satisfied clauses, hence at least $7$ since the count is an integer.
:::
:::

Remarkably, $7/8$ is the end of the road: for every $\varepsilon > 0$, achieving $7/8 + \varepsilon$ of the optimum for satisfiable instances of $\mathit{MAX\text{-}3SAT}$ is $\mathsf{NP}$-hard (Håstad, 2001). The tool behind this result is the PCP theorem.

::: quiz
Which approximation guarantees are known to be achievable in polynomial time?
- [x] Vertex cover within a factor of $2$.
- [x] Set cover within a factor of $\ln n + 1$.
- [ ] $\mathit{TSP}$ with arbitrary distances within a factor of $1000$.
- [x] $\mathit{MAX\text{-}3SAT}$ within a factor of $8/7$.
::: solution
Vertex cover ([[#thm-vc-approx]]), set cover ([[#thm-set-cover]]) and $\mathit{MAX\text{-}3SAT}$ ([[#thm-max3sat]]) have these guarantees. General $\mathit{TSP}$ has no constant-factor approximation unless $\mathsf{P} = \mathsf{NP}$ ([[#thm-tsp-inapprox]]); only metric $\mathit{TSP}$ is approximable.
:::
:::

## Probabilistically checkable proofs

An $\mathsf{NP}$ verifier reads its whole certificate. What if it could read only a few bits, chosen at random?

::: definition PCP verifier {#def-pcp}
Let $r, q\colon \N \to \N$. A language $L$ is in $\mathsf{PCP}(r(n), q(n))$ if there is a polynomial-time probabilistic machine $V$, the **verifier**, with random access to a **proof** string $\pi$, such that on input $x$ of length $n$, $V$ uses $O(r(n))$ random bits, reads $O(q(n))$ bits of $\pi$ (at positions it computes from $x$ and its random bits), and

- **completeness**: if $x \in L$, there is a proof $\pi$ with $\Prob[V^\pi(x) \text{ accepts}] = 1$;
- **soundness**: if $x \notin L$, then for every $\pi$, $\Prob[V^\pi(x) \text{ accepts}] \le 1/2$.
:::

Two easy cases fix the extremes. $\mathsf{PCP}(0, \mathrm{poly}(n)) = \mathsf{NP}$: without randomness the verifier is an ordinary $\mathsf{NP}$ verifier. And $\mathsf{PCP}(\log n, 1) \subseteq \mathsf{NP}$: with $O(\log n)$ random bits there are only polynomially many random strings, each causing $O(1)$ queries, so the verifier looks at only polynomially many positions of $\pi$ in total; an $\mathsf{NP}$ machine can guess those bits and run the verifier on *every* random string, accepting iff all runs accept ([[#ex-pcp-np]]).

::: theorem PCP theorem {#thm-pcp}
$\mathsf{NP} = \mathsf{PCP}(\log n, 1)$.
:::

We do not prove the inclusion $\mathsf{NP} \subseteq \mathsf{PCP}(\log n, 1)$: the original proofs (Arora and Safra; Arora, Lund, Motwani, Sudan and Szegedy, both 1998, from conference papers of 1992) use algebraic encodings of proofs by low-degree polynomials and a sequence of composed verifiers, and Irit Dinur's combinatorial proof (2007) uses repeated "gap amplification" on constraint graphs; each fills a substantial chapter of Arora–Barak. The statement is startling enough on its own: every mathematical proof (of a statement in $\mathsf{NP}$ form, with a proof of polynomial length) can be rewritten, with polynomial blow-up, into a form in which a verifier who reads, say, $30$ randomly chosen bits catches any error in the original with probability at least $1/2$ — and repeating with $k$ independent samples drives that error below $2^{-k}$. Errors in such a proof cannot hide: they are spread all over it.

### PCPs and hardness of approximation

The connection with approximation is through **gap problems**. For $0 < \varepsilon < 1$, let $\mathit{GAP\text{-}3SAT}_\varepsilon$ be the promise problem of distinguishing satisfiable 3CNF formulas from those in which *every* assignment leaves more than an $\varepsilon$ fraction of the clauses unsatisfied.

::: theorem The PCP theorem as hardness of approximation {#thm-pcp-gap}
The PCP theorem implies that there is a constant $\varepsilon > 0$ such that $\mathit{GAP\text{-}3SAT}_\varepsilon$ is $\mathsf{NP}$-hard: there is a polynomial-time reduction mapping each $\mathit{3SAT}$ instance $\varphi$ to a 3CNF formula $\psi$ such that if $\varphi$ is satisfiable then so is $\psi$, and if $\varphi$ is unsatisfiable then every assignment violates more than an $\varepsilon$ fraction of the clauses of $\psi$. Consequently, if $\mathsf{P} \ne \mathsf{NP}$, $\mathit{MAX\text{-}3SAT}$ has no polynomial-time $\rho$-approximation for $\rho < 1/(1 - \varepsilon)$.
:::

::: proof
By the PCP theorem, $\mathit{3SAT}$ has a verifier $V$ using $c\log n$ random bits and $q$ queries, for constants $c, q$. Given $\varphi$ of size $n$, consider each of the $R = 2^{c\log n} = n^c$ random strings $\rho$. For each, $V$ computes in polynomial time $q$ positions $i_1, \dots, i_q$ of the proof and a Boolean function $f_\rho\colon \{0, 1\}^q \to \{0, 1\}$ saying whether it accepts given the bits found there. Treat the proof bits as Boolean variables $y_1, y_2, \dots$. Write $f_\rho(y_{i_1}, \dots, y_{i_q})$ as a CNF formula with at most $2^q$ clauses of $q$ literals (one clause excluding each rejecting combination of the $q$ bits), and convert each clause to at most $q$ clauses of three literals with fresh variables ([[complexity/np-completeness#lem-clause-split]]). Let $\psi$ be the conjunction over all $\rho$: at most $K = q\,2^q$ clauses per random string, $R \cdot K$ in all — polynomial, since $q$ is a constant.

If $\varphi$ is satisfiable, some proof $\pi$ makes $V$ accept for every $\rho$; setting $y = \pi$ satisfies every $f_\rho$, and the fresh variables can be set to satisfy every split clause. If $\varphi$ is unsatisfiable, then for any assignment, read its $y$-part as a proof $\pi$: $V$ rejects for at least half of the random strings, and for each rejecting $\rho$ the CNF of $f_\rho$ has a false clause, so at least one of the $\le K$ 3-clauses coming from $\rho$ is false, whatever the fresh variables. So at least $R/2$ of the at most $RK$ clauses are unsatisfied: a fraction of at least $\varepsilon = 1/(2K) = 1/(q\,2^{q+1})$. (Strictly, "more than" holds for any smaller positive $\varepsilon$.)

Finally, a $\rho$-approximation $A$ with $\rho < 1/(1 - \varepsilon)$ would decide $\mathit{3SAT}$: on $\psi$ from a satisfiable $\varphi$ it satisfies at least $m/\rho > (1 - \varepsilon)m$ clauses, while for unsatisfiable $\varphi$ no assignment satisfies more than $(1 - \varepsilon)m$. Comparing $A$'s count with $(1 - \varepsilon)m$ separates the two cases.
:::

The converse holds too: from a reduction to $\mathit{GAP\text{-}3SAT}_\varepsilon$ one builds a PCP verifier that picks $O(1/\varepsilon)$ random clauses of $\psi$ and reads the three variables of each in a proof listing a satisfying assignment. So the PCP theorem and the constant-factor hardness of approximating $\mathit{MAX\text{-}3SAT}$ are the same statement in two languages — "local checkability of proofs" and "hardness of approximation".

::: example The size of the gap {#ex-gap}
A PCP verifier for $\mathit{3SAT}$ uses $c\log n$ random bits and reads $q = 3$ proof bits. How many 3-clauses does the construction of [[#thm-pcp-gap]] produce per random string, and what fraction $\varepsilon$ of unsatisfied clauses does it guarantee for unsatisfiable inputs?
::: solution
With $q = 3$ the acceptance predicate on three bits is already a 3CNF formula with at most $2^3 = 8$ clauses (no splitting needed), so $K = 8$ and $\varepsilon = 1/(2 \cdot 8) = 1/16$: if $\varphi$ is unsatisfiable, every assignment violates at least $1/16$ of the clauses of $\psi$. Håstad's optimal 3-query PCP (2001) has a much finer structure — the verifier checks a single linear equation $y_i \oplus y_j \oplus y_k = b$, accepting correct proofs with probability $1 - \delta$ and incorrect ones with probability at most $1/2 + \delta$ — and this is what pushes the hardness threshold for $\mathit{MAX\text{-}3SAT}$ all the way to $7/8 + \varepsilon$.
:::
:::

## The landscape of inapproximability {#sec-inapprox}

Building on the PCP theorem, much of the approximability of classic problems is now known precisely. The table summarises the state of knowledge as of 2026; "$\mathsf{NP}$-hard" means that a polynomial-time algorithm achieving that ratio would imply $\mathsf{P} = \mathsf{NP}$ unless stated otherwise.

| problem | best ratio known in polynomial time | hardness |
|---|---|---|
| $\mathit{MAX\text{-}3SAT}$ | $8/7$ (random assignment) | $8/7 - \varepsilon$ is $\mathsf{NP}$-hard (Håstad, 2001) |
| vertex cover | $2$ | $\sqrt2 - \varepsilon$ $\mathsf{NP}$-hard (Khot, Minzer and Safra, 2018); $2 - \varepsilon$ hard under the Unique Games Conjecture (Khot and Regev, 2008) |
| set cover | $\ln n + 1$ (greedy) | $(1 - \varepsilon)\ln n$ $\mathsf{NP}$-hard (Dinur and Steurer, 2014; earlier Feige, 1998, under a stronger assumption) |
| clique, independent set | $O(n(\log\log n)^2/\log^3 n)$ (Feige, 2004) | $n^{1 - \varepsilon}$ $\mathsf{NP}$-hard (Håstad, 1999, assuming $\mathsf{NP} \ne \mathsf{ZPP}$; Zuckerman, 2007, assuming $\mathsf{P} \ne \mathsf{NP}$) |
| metric $\mathit{TSP}$ | $3/2 - 10^{-36}$ (Karlin, Klein and Oveis Gharan, 2021) | $123/122$ $\mathsf{NP}$-hard (Karpinski, Lampis and Schmied, 2015) |
| $\mathit{MAX\text{-}CUT}$ | $\approx 1/0.878$ (Goemans and Williamson, 1995) | optimal under the Unique Games Conjecture (Khot, Kindler, Mossel and O'Donnell, 2007); $17/16 - \varepsilon$ $\mathsf{NP}$-hard (Håstad, 2001) |
| knapsack, Euclidean $\mathit{TSP}$ | $1 + \varepsilon$ (FPTAS, PTAS) | — |

The **Unique Games Conjecture** (Khot, 2002) asserts that a particular gap problem for constraint satisfaction over a large alphabet, with constraints that are permutations, is $\mathsf{NP}$-hard. As of 2026 it is **open**. It would imply that the simple algorithms in several rows of the table are exactly optimal; the proof of the related 2-to-2 Games Theorem (Khot, Minzer and Safra, 2018) is partial evidence for it.

::: history
David Johnson's "Approximation algorithms for combinatorial problems" (1974) analysed the greedy set cover algorithm (with the $H_n$ bound, also proved by Lovász in 1975 and extended to weights by Chvátal in 1979) and random assignments for $\mathit{MAX\text{-}SAT}$. Sartaj Sahni and Teofilo Gonzalez proved the inapproximability of general $\mathit{TSP}$ in 1976, the year of Nicos Christofides's $3/2$ algorithm; Oscar Ibarra and Chul Kim gave the knapsack FPTAS in 1975. The PCP theorem grew out of work on interactive proofs: Feige, Goldwasser, Lovász, Safra and Szegedy connected multi-prover proofs with the hardness of approximating clique (1991), and Sanjeev Arora and Shmuel Safra, and Arora, Carsten Lund, Rajeev Motwani, Madhu Sudan and Mario Szegedy, proved the theorem in 1992 (journal versions 1998). The nine authors of these papers shared the Gödel Prize in 2001; Johan Håstad received it in 2011 for his optimal inapproximability results, and Irit Dinur in 2019 for her combinatorial proof of the PCP theorem (2007). Subhash Khot proposed the Unique Games Conjecture in 2002 and received the Nevanlinna Prize in 2014.
:::

## Where this leads

Approximation algorithms are a field of their own, with powerful general techniques — linear-programming relaxation and rounding, primal–dual methods, semidefinite programming (as in Goemans–Williamson), local search with guarantees — covered in texts such as Williamson and Shmoys's *The Design of Approximation Algorithms*. The PCP theorem belongs to a larger story of proof systems: interactive proofs ($\mathsf{IP} = \mathsf{PSPACE}$, [[complexity/randomised-complexity]]), zero-knowledge proofs ([[cryptography]]), and succinct arguments, which are PCP-based protocols used, as of 2026, in deployed cryptographic systems to verify large computations quickly. [[quantum-computing]] asks which of these problems quantum computers can solve or approximate faster.

::: summary
- A **$\rho$-approximation** returns, in polynomial time, a solution within a factor $\rho$ of optimal on every instance ([[#def-approx]]); proofs compare with a computable bound on $\mathrm{OPT}$.
- **Vertex cover**: both endpoints of a maximal matching give a $2$-approximation ([[#thm-vc-approx]]). **Set cover**: greedy achieves $H_n \le \ln n + 1$ ([[#thm-set-cover]]), essentially optimal.
- **TSP**: inapproximable within any factor with arbitrary distances ([[#thm-tsp-inapprox]]); with the triangle inequality, doubling a minimum spanning tree gives $2$ ([[#thm-double-tree]]) and Christofides $3/2$.
- **MAX-3SAT**: a random assignment satisfies $7/8$ of the clauses in expectation, derandomised by conditional expectations ([[#thm-max3sat]]); $7/8 + \varepsilon$ is $\mathsf{NP}$-hard.
- **PCP theorem**: $\mathsf{NP} = \mathsf{PCP}(\log n, 1)$ ([[#thm-pcp]], stated without proof): proofs can be checked by reading a constant number of random bits. It is equivalent to the $\mathsf{NP}$-hardness of a constant gap for $\mathit{MAX\text{-}3SAT}$ ([[#thm-pcp-gap]]).
- Approximability varies enormously between problems that are equivalent as decision problems; the Unique Games Conjecture, open as of 2026, would settle several remaining gaps.
:::

## Exercises

::: exercise Reading the matching bound {level=1 check="10"}
On some graph, [[#alg-vc-approx]] builds a maximal matching of $5$ edges. How many vertices are in its cover, and what can you conclude about $\mathrm{OPT}$? (Enter the size of the cover.)
::: solution
The cover has $2 \cdot 5 = 10$ vertices. Every cover must contain an endpoint of each of the $5$ disjoint matched edges, so $\mathrm{OPT} \ge 5$, and therefore the cover is within a factor $10/5 = 2$ of optimal (and $5 \le \mathrm{OPT} \le 10$).
:::
:::

::: exercise A harmonic number {level=1 check="25/12"}
Compute $H_4$, the guarantee of [[#thm-set-cover]] for a universe of $4$ elements. (Enter a fraction.)
::: solution
$H_4 = 1 + \frac12 + \frac13 + \frac14 = \frac{12 + 6 + 4 + 3}{12} = \frac{25}{12} \approx 2.083$, slightly less than $\ln 4 + 1 \approx 2.386$.
:::
:::

::: exercise Expected satisfied clauses {level=1 check="35"}
A 3CNF formula has $40$ clauses, each with three distinct variables. How many clauses does a uniformly random assignment satisfy in expectation? (Enter the number.)
::: solution
$\frac78 \cdot 40 = 35$. So some assignment satisfies at least $35$ clauses.
:::
:::

::: exercise The factor 2 is tight {level=2}
Show that [[#alg-vc-approx]] can output a cover of size exactly $2\,\mathrm{OPT}$, and that the lower bound "$\mathrm{OPT} \ge$ size of a maximal matching" can be off by almost a factor of $2$ in the other direction, using complete graphs.
::: solution
On $K_{n,n}$ (with any edge order) the algorithm finds a maximal matching; in $K_{n,n}$ every maximal matching is perfect, of $n$ edges, so the output has $2n$ vertices while one side of the bipartition, $n$ vertices, is a cover: ratio exactly $2$. On the complete graph $K_{2n}$, a perfect matching has $n$ edges, but $\mathrm{OPT} = 2n - 1$ (leaving out two vertices would leave their edge uncovered), so the matching bound $n$ is about half of $\mathrm{OPT}$, and here the algorithm's $2n$ vertices are almost optimal.
:::
:::

::: exercise Shortcutting a tree walk {level=2}
Cities $A, B, C, D, E$ lie at the points $(0,0)$, $(2,0)$, $(4,0)$, $(2,2)$, $(2,-2)$ with Euclidean distances. Find a minimum spanning tree, the double-tree tour starting at $A$, its length, and compare with the bound $2\,w(T)$.
::: solution
Distances: $AB = BC = BD = BE = 2$; $AD = AE = CD = CE = 2\sqrt2 \approx 2.83$; $AC = DE = 4$. The star at $B$ (edges $BA, BC, BD, BE$) has weight $8$ and is a minimum spanning tree (every spanning tree has $4$ edges and none is shorter than $2$). A depth-first traversal from $A$ goes $A, B$, then $B$'s other children in some order, say $C, D, E$: the tour $A, B, C, D, E, A$ has length $2 + 2 + 2\sqrt2 + 4 + 2\sqrt2 = 8 + 4\sqrt2 \approx 13.66 \le 2w(T) = 16$. A better order of the children, $D, C, E$, gives $A, B, D, C, E, A$ of length $2 + 2 + 2\sqrt2 + 2\sqrt2 + 2\sqrt2 = 4 + 6\sqrt2 \approx 12.49$, which a brute-force search over all $24$ tours from $A$ confirms is optimal. Since $\mathrm{OPT} \ge w(T) = 8$, both double-tree tours are guaranteed to be within the factor $2$; here they are within $1.1$ of optimal.
:::
:::

::: exercise Derandomising by hand {level=2}
Apply the method of conditional expectations to the formula consisting of the two clauses $(x_1 \lor x_2 \lor x_3)$ and $(\overline{x_1} \lor \overline{x_2} \lor \overline{x_3})$, fixing $x_1, x_2, x_3$ in order and preferring "true" on ties. Show the conditional expectation after each step.
::: solution
Initially $E = 2 \cdot \frac78 = 1.75$. Fix $x_1$: with $x_1 = 1$ the first clause is satisfied ($1$) and the second has two free literals ($1 - \frac14 = 0.75$), $E = 1.75$; with $x_1 = 0$, symmetrically $E = 1.75$. Tie: take $x_1 = 1$. Fix $x_2$: $x_2 = 1$ gives $1 + (1 - \frac12) = 1.5$; $x_2 = 0$ gives $1 + 1 = 2$. Take $x_2 = 0$, $E = 2$. Fix $x_3$: both choices keep both clauses satisfied, $E = 2$; take $x_3 = 1$. Final assignment $(1, 0, 1)$ satisfies both clauses. The expectation never decreased: $1.75 \to 1.75 \to 2 \to 2$.
:::
:::

::: exercise No constant factor for clique {level=3}
For graphs $G$, $H$ let $G \times H$ be the graph on pairs $(g, h)$ with $(g, h)$ adjacent to $(g', h')$ iff ($g = g'$ or $g g'$ is an edge) and ($h = h'$ or $h h'$ is an edge), and the pairs are different. (a) Prove that $\omega(G \times G) = \omega(G)^2$, where $\omega$ is the clique number. (b) Deduce that if clique has a polynomial-time $\rho$-approximation for some constant $\rho$, then it has one for every constant $\rho' > 1$. (c) Combined with the fact that, by the PCP theorem, some constant $\rho_0 > 1$ is $\mathsf{NP}$-hard for clique, conclude that no constant factor is achievable unless $\mathsf{P} = \mathsf{NP}$.
::: solution
(a) If $K$ is a clique of $G$, then $K \times K$ is a clique of $G \times G$ (any two distinct pairs agree or are adjacent in each coordinate), so $\omega(G \times G) \ge \omega(G)^2$. Conversely, if $Q$ is a clique of $G \times G$, its projections $Q_1, Q_2$ onto the two coordinates are cliques of $G$ (two distinct first coordinates of pairs in $Q$ must be adjacent), and $Q \subseteq Q_1 \times Q_2$, so $\lvert Q\rvert \le \omega(G)^2$.
(b) Given a clique $Q$ of $G^{\times k}$ (the $k$-fold product, $k$ a constant power of $2$, of size $n^k$), the argument of (a) extracts from its projections a clique of $G$ of size at least $\lvert Q\rvert^{1/k}$. If $A$ finds a clique of size at least $\omega(G^{\times k})/\rho = \omega(G)^k/\rho$, we obtain a clique of $G$ of size at least $\omega(G)/\rho^{1/k}$. Choosing $k$ with $\rho^{1/k} \le \rho'$ gives a $\rho'$-approximation running in time polynomial in $n^k$, which is polynomial for constant $k$.
(c) If some constant $\rho$ were achievable, (b) would give $\rho' < \rho_0$, which is $\mathsf{NP}$-hard; so $\mathsf{P} = \mathsf{NP}$. (A more careful use of the same idea, with better PCPs, gives the $n^{1 - \varepsilon}$ hardness in the table.)
:::
:::

::: exercise The easy direction of the PCP theorem {#ex-pcp-np level=3}
Prove that $\mathsf{PCP}(\log n, 1) \subseteq \mathsf{NP}$ and that $\mathsf{PCP}(0, \log n) \subseteq \mathsf{P}$.
::: solution
*First claim.* Let $V$ use at most $c\log n$ random bits and $q$ queries. There are at most $n^c$ random strings, and for each, $V$ (which is adaptive at most in a bounded way) reads at most $q$ positions; since $V$ runs in polynomial time, the queried positions have polynomially bounded indices, and over all random strings and all possible answers to earlier queries at most $n^c \cdot 2^q \cdot q$ positions can ever be read. An $\mathsf{NP}$ certificate is the list of proof bits at these positions (padded with zeros elsewhere). The $\mathsf{NP}$ verifier runs $V$ on every random string with this proof and accepts iff every run accepts. If $x \in L$, the proof that makes $V$ accept with probability $1$ works. If $x \notin L$, every proof makes at least half the runs reject, so the $\mathsf{NP}$ verifier rejects every certificate.
*Second claim.* With no randomness, $V$ is deterministic and reads $q = O(\log n)$ bits — adaptively, so the bits it reads may depend on earlier answers, but there are only $2^q = \mathrm{poly}(n)$ possible answer sequences. A deterministic polynomial-time algorithm simulates $V$ for every answer sequence and accepts iff some sequence leads to acceptance (that sequence corresponds to a proof, setting the queried positions accordingly; distinct queries in one run are distinct positions, so the assignment is consistent). By soundness, if $x \notin L$ no proof — hence no answer sequence realised by a proof — makes $V$ accept.
:::
:::
