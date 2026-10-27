A spelling checker sees the word *sitting* typed where the dictionary has *kitten*, and must decide how close they are. A geneticist compares two DNA sequences of a million letters to see how they evolved from a common ancestor. A thief with a knapsack that holds 7 kg chooses among items of different weights and values. A conference organiser, unlike the one in [[algorithms/greedy-algorithms]], now has talks of different *value* and wants the most valuable compatible set. None of these yields to a greedy rule: the best first step depends on what comes later. And trying every possibility is hopeless — there are exponentially many alignments, subsets and schedules.

**Dynamic programming** solves such problems by organising the search. It expresses the optimal value for a problem in terms of optimal values for smaller **subproblems** — a recurrence — and then computes each subproblem *once*, storing its answer in a table. It works when two conditions hold: **optimal substructure** (an optimal solution is built from optimal solutions of subproblems) and **overlapping subproblems** (the naive recursion would solve the same subproblems many times). The second condition is what distinguishes dynamic programming from divide and conquer, whose subproblems are disjoint. You have already met the idea twice: memoised Fibonacci in [[programming-1/recursion]], and the Bellman–Ford and Floyd–Warshall algorithms of [[algorithms/shortest-paths]], which are dynamic programs over "paths with at most $i$ edges" and "paths through the first $k$ vertices".

This chapter develops the method through four problems — weighted interval scheduling, edit distance, the knapsack problem and shortest paths — and distils a recipe from them.

## Weighted interval scheduling

Requests $1, \dots, n$ have intervals $[s_j, f_j)$ and values $v_j > 0$; find a set of compatible requests of maximum total value. With all values equal this is interval scheduling, solved greedily by earliest finish time. With values, greed fails: a single valuable long talk may be worth more than three short ones, or not.

Sort the requests by finish time, $f_1 \le \dots \le f_n$, and let $p(j)$ be the largest index $i < j$ such that request $i$ is compatible with $j$ (that is, $f_i \le s_j$), or $0$ if there is none. Because of the sorting, the requests compatible with $j$ *that finish before it* are exactly $1, \dots, p(j)$.

Let $\mathrm{OPT}(j)$ be the maximum value of a compatible subset of the first $j$ requests, with $\mathrm{OPT}(0) = 0$. Consider an optimal solution $O_j$ for requests $1..j$. Either it does not contain $j$ — then it is an optimal solution for $1..j-1$ — or it does contain $j$, and then the rest of it is compatible with $j$, so it lies among $1..p(j)$, and it must be an optimal solution there (otherwise replacing it by a better one would improve $O_j$). Hence:

::: theorem Recurrence for weighted interval scheduling {#thm-wis}
For $j \ge 1$,
$$
\mathrm{OPT}(j) = \max\big(\mathrm{OPT}(j-1),\; v_j + \mathrm{OPT}(p(j))\big).
$$ {#eq-wis}
:::

::: proof
*$\ge$:* both expressions are values of compatible subsets of $1..j$ — an optimal subset of $1..j-1$, or an optimal subset of $1..p(j)$ together with $j$, which is compatible with all of $1..p(j)$. *$\le$:* let $O$ be an optimal subset of $1..j$. If $j \notin O$, then $O \subseteq \{1..j-1\}$ and its value is at most $\mathrm{OPT}(j-1)$. If $j \in O$, every other request $i \in O$ has $f_i \le f_j$ and is compatible with $j$, hence $f_i \le s_j$ and $i \le p(j)$; so $O \setminus \{j\}$ is a compatible subset of $1..p(j)$, of value at most $\mathrm{OPT}(p(j))$, and $O$ has value at most $v_j + \mathrm{OPT}(p(j))$.
:::

The naive recursive implementation of [[#eq-wis]] can take exponential time: if $p(j) = j - 2$ for every $j$, the calls form the Fibonacci recursion tree. But there are only $n + 1$ distinct subproblems, $\mathrm{OPT}(0), \dots, \mathrm{OPT}(n)$. Computing them in increasing order of $j$ — **tabulation**, or **bottom-up** dynamic programming — takes $O(1)$ per entry once the $p(j)$ are known, and the $p(j)$ can be found by binary search over the finish times. The total is $O(n\log n)$, dominated by sorting.

```python
from bisect import bisect_right

def weighted_interval(jobs):
    """jobs: (start, finish, value). Return (best value, chosen jobs)."""
    jobs = sorted(jobs, key=lambda j: j[1])          # by finish time
    finishes = [f for _, f, _ in jobs]
    # p[j] = number of jobs (in sorted order) that finish by the start of job j
    p = [bisect_right(finishes, s) for s, _, _ in jobs]
    opt = [0] * (len(jobs) + 1)                      # opt[j]: best of first j
    for j in range(1, len(jobs) + 1):
        s, f, v = jobs[j - 1]
        opt[j] = max(opt[j - 1], v + opt[p[j - 1]])
    chosen, j = [], len(jobs)                        # trace back the choices
    while j > 0:
        s, f, v = jobs[j - 1]
        if v + opt[p[j - 1]] >= opt[j - 1]:
            chosen.append(jobs[j - 1]); j = p[j - 1]
        else:
            j -= 1
    return opt[-1], chosen[::-1]

jobs = [(0, 3, 2), (1, 5, 4), (4, 6, 4), (2, 8, 7), (6, 9, 2), (7, 10, 1)]
print(weighted_interval(jobs))
```

```console
$ python3 wis.py
(8, [(0, 3, 2), (4, 6, 4), (6, 9, 2)])
```

::: example Filling the table {#ex-wis}
Compute $p(j)$ and $\mathrm{OPT}(j)$ for the six jobs of the listing, and trace back the optimal set.
::: solution
In order of finish time (numbering from $1$): $1 = [0,3)$, value $2$; $2 = [1,5)$, $4$; $3 = [4,6)$, $4$; $4 = [2,8)$, $7$; $5 = [6,9)$, $2$; $6 = [7,10)$, $1$.

| $j$ | interval | $v_j$ | $p(j)$ | $\mathrm{OPT}(j-1)$ | $v_j + \mathrm{OPT}(p(j))$ | $\mathrm{OPT}(j)$ |
|---|---|---|---|---|---|---|
| 1 | $[0,3)$ | 2 | 0 | 0 | 2 | 2 |
| 2 | $[1,5)$ | 4 | 0 | 2 | 4 | 4 |
| 3 | $[4,6)$ | 4 | 1 | 4 | $4 + 2 = 6$ | 6 |
| 4 | $[2,8)$ | 7 | 0 | 6 | 7 | 7 |
| 5 | $[6,9)$ | 2 | 3 | 7 | $2 + 6 = 8$ | 8 |
| 6 | $[7,10)$ | 1 | 3 | 8 | $1 + 6 = 7$ | 8 |

The optimum is $8$. Tracing back: at $j = 6$ the second option ($7$) is worse, so $6$ is not used; at $j = 5$ it wins ($8 \ge 7$), so take job $5$ and jump to $p(5) = 3$; at $j = 3$, $6 \ge 4$, take job $3$ and jump to $p(3) = 1$; at $j = 1$, take job $1$. The set is $\{[0,3), [4,6), [6,9)\}$ with value $2 + 4 + 2 = 8$. Note that the most valuable single job, $[2,8)$ with value $7$, is not used.
:::
:::

**Reconstruction** is a general pattern: the table stores only optimal *values*, and an optimal *solution* is recovered by retracing which option achieved each maximum, in time proportional to the solution's size. Storing the choices in a second table while filling the first is an alternative.

**Memoisation** — keeping the recursion but caching results, the **top-down** approach — computes the same table. It is often easier to write, since the recurrence is transcribed literally, and it solves only the subproblems actually reached; tabulation avoids recursion overhead and Python's recursion limit, and makes the order of evaluation, and hence the space needed, explicit.

::: example The cost of forgetting {#ex-memo}
Take $n = 25$ requests of value $1$ in which each request overlaps only its predecessor, so $p(j) = j - 2$. Count the calls made by the plain recursion of [[#eq-wis]] and by the memoised version.
::: solution
```python
from functools import cache

calls = 0

def opt_naive(j, p, v):
    """OPT(j) by the recurrence, without storing anything."""
    global calls
    calls += 1
    if j == 0:
        return 0
    return max(opt_naive(j - 1, p, v), v[j] + opt_naive(p[j], p, v))

n = 25
p = [0] + [max(j - 2, 0) for j in range(1, n + 1)]   # each job overlaps one other
v = [0] + [1] * n
print(opt_naive(n, p, v), calls)

@cache
def opt_memo(j):
    global calls
    calls += 1
    if j == 0:
        return 0
    return max(opt_memo(j - 1), v[j] + opt_memo(p[j]))

calls = 0
print(opt_memo(n), calls)
```

```console
$ python3 memo.py
13 392835
13 26
```

Both find the optimum $13$ (every other request). The naive recursion makes $C(j) = 1 + C(j-1) + C(j-2)$ calls (with $C(0) = 1$, $C(1) = 3$), which solves to $C(n) = 2F_{n+2} - 1$; for $n = 25$, $2 \cdot 196\,418 - 1 = 392\,835$. The memoised version evaluates each of the $26$ subproblems $\mathrm{OPT}(0..25)$ once (a repeated call returns the cached value without running the body, so it is not counted). Adding one request multiplies the naive work by about $\varphi \approx 1.618$; it adds one call to the memoised work.
:::
:::

::: widget plot
f: 2*((1 + sqrt(5))/2)^(x + 2)/sqrt(5) - 1; x + 1
x: 0, 30
y: 0, 100000
points: 10,287; 15,3193; 20,35421
labels: \text{plain recursion} \approx 2F_{n+2} - 1; \text{memoised: } n + 1
caption: Calls needed to evaluate $\mathrm{OPT}(n)$ for the instance of the example. The dots are exact counts $2F_{n+2} - 1$ for $n = 10, 15, 20$; the curve is the approximation $2\varphi^{n+2}/\sqrt5 - 1$. The memoised (or tabulated) version is the line $n + 1$, which hugs the axis. Overlapping subproblems are what make the difference: there are only $n + 1$ distinct ones.
:::

## Edit distance and sequence alignment

The **edit distance** (Levenshtein distance) between strings $x = x_1 \cdots x_m$ and $y = y_1 \cdots y_n$ is the least number of single-character **insertions**, **deletions** and **substitutions** that turn $x$ into $y$. For *kitten* and *sitting* it is $3$: substitute $k \to s$, substitute $e \to i$, insert $g$.

Edits can be drawn as an **alignment**: write $x$ above $y$, with gaps, so that each column is a match, a substitution, a deletion (letter above a gap) or an insertion (gap above a letter).

```text
k i t t e n -        cost: k/s substitution 1, e/i substitution 1,
s i t t i n g              -/g insertion 1           total 3
```

Look at the **last column** of an optimal alignment of $x_1..x_i$ with $y_1..y_j$. It is one of: $x_i$ above a gap (delete $x_i$), a gap above $y_j$ (insert $y_j$), or $x_i$ above $y_j$ (match if equal, else substitute). Removing the last column leaves an alignment of the corresponding prefixes, which must be optimal for them (cut and paste). So with $D(i, j)$ the edit distance between the prefixes $x_1..x_i$ and $y_1..y_j$:

::: theorem Edit-distance recurrence {#thm-edit}
$D(i, 0) = i$, $D(0, j) = j$, and for $i, j \ge 1$
$$
D(i, j) = \min\begin{cases} D(i-1, j) + 1 & \text{(delete } x_i\text{)}\\ D(i, j-1) + 1 & \text{(insert } y_j\text{)}\\ D(i-1, j-1) + [x_i \ne y_j] & \text{(match or substitute)}\end{cases}
$$ {#eq-edit}
where $[x_i \ne y_j]$ is $1$ if the characters differ and $0$ if they are equal.
:::

::: proof
Turning $i$ characters into none takes $i$ deletions and no fewer (each operation removes at most one character); similarly $D(0, j) = j$. For $i, j \ge 1$, each of the three expressions is the cost of some way of editing: edit $x_1..x_{i-1}$ into $y_1..y_j$ optimally and delete $x_i$; or edit $x_1..x_i$ into $y_1..y_{j-1}$ and insert $y_j$; or edit $x_1..x_{i-1}$ into $y_1..y_{j-1}$ and then fix the last character. So $D(i, j)$ is at most the minimum. Conversely, an optimal sequence of edits corresponds to an alignment of cost $D(i, j)$ (operations on different positions can be reordered, and an operation that touches a position twice can be merged into at most one, without increasing the count), and the last column of this alignment is one of the three kinds; the remaining columns align the corresponding prefixes, with cost at least $D$ of those prefixes. So $D(i, j)$ is at least the minimum.
:::

The table has $(m + 1)(n + 1)$ entries, each computed in $O(1)$ from its neighbours above, to the left and diagonally above-left; filling it row by row takes $\Theta(mn)$ time and space.

```python
def edit_distance(x, y):
    """Levenshtein distance: insertions, deletions, substitutions cost 1."""
    m, n = len(x), len(y)
    D = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        D[i][0] = i                          # delete all of x[:i]
    for j in range(n + 1):
        D[0][j] = j                          # insert all of y[:j]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            sub = 0 if x[i - 1] == y[j - 1] else 1
            D[i][j] = min(D[i - 1][j] + 1,       # delete x[i-1]
                          D[i][j - 1] + 1,       # insert y[j-1]
                          D[i - 1][j - 1] + sub) # match or substitute
    return D

D = edit_distance("kitten", "sitting")
for row in D:
    print(row)
print(D[-1][-1])
```

```console
$ python3 edit.py
[0, 1, 2, 3, 4, 5, 6, 7]
[1, 1, 2, 3, 4, 5, 6, 7]
[2, 2, 1, 2, 3, 4, 5, 6]
[3, 3, 2, 1, 2, 3, 4, 5]
[4, 4, 3, 2, 1, 2, 3, 4]
[5, 5, 4, 3, 2, 2, 3, 4]
[6, 6, 5, 4, 3, 3, 2, 3]
3
```

::: example Reading an alignment from the table {#ex-edit}
Use the printed table (rows $i = 0..6$ for *kitten*, columns $j = 0..7$ for *sitting*) to recover an optimal alignment.
::: solution
Start at $D(6, 7) = 3$ and step back to a neighbour that achieves the minimum in [[#eq-edit]]:

- $(6, 7)$: $D(6, 6) + 1 = 2 + 1 = 3$ — insert $g$; go to $(6, 6)$.
- $(6, 6)$: $x_6 = n = y_6$, $D(5, 5) + 0 = 2$ — match $n$; go to $(5, 5)$.
- $(5, 5)$: $x_5 = e \ne i = y_5$, $D(4, 4) + 1 = 1 + 1 = 2$ — substitute; go to $(4, 4)$.
- $(4, 4), (3, 3), (2, 2)$: matches $t, t, i$ with $D = 1, 1, 1$; reach $(1, 1)$.
- $(1, 1)$: $k \ne s$, $D(0, 0) + 1 = 1$ — substitute.

Reading forwards: substitute $k \to s$, match $i, t, t$, substitute $e \to i$, match $n$, insert $g$ — the alignment shown earlier. The traceback takes $O(m + n)$ steps.
:::
:::

Edit distance is a shortest path. Make a grid graph with a vertex $(i, j)$ for each table entry, an edge $(i-1, j) \to (i, j)$ of weight $1$ (delete), an edge $(i, j-1) \to (i, j)$ of weight $1$ (insert) and an edge $(i-1, j-1) \to (i, j)$ of weight $[x_i \ne y_j]$. Paths from $(0, 0)$ to $(m, n)$ are exactly alignments, and [[#eq-edit]] is the shortest-path recurrence on this DAG, evaluated in a topological order (row by row).

::: widget graph
nodes: 00@0,3; 01@1,3; 02@2,3; 03@3,3; 04@4,3; 10@0,2; 11@1,2; 12@2,2; 13@3,2; 14@4,2; 20@0,1; 21@1,1; 22@2,1; 23@3,1; 24@4,1; 30@0,0; 31@1,0; 32@2,0; 33@3,0; 34@4,0
edges: 00>01:1; 00>10:1; 00>11:0; 01>02:1; 01>11:1; 01>12:1; 02>03:1; 02>12:1; 02>13:1; 03>04:1; 03>13:1; 03>14:1; 04>14:1; 10>11:1; 10>20:1; 10>21:1; 11>12:1; 11>21:1; 11>22:1; 12>13:1; 12>22:1; 12>23:1; 13>14:1; 13>23:1; 13>24:1; 14>24:1; 20>21:1; 20>30:1; 20>31:1; 21>22:1; 21>31:1; 21>32:0; 22>23:1; 22>32:1; 22>33:1; 23>24:1; 23>33:1; 23>34:1; 24>34:1; 30>31:1; 31>32:1; 32>33:1; 33>34:1
algorithm: dijkstra
start: 00
caption: The edit-distance DAG for $x = $ SUN (rows $i = 0..3$, top to bottom) and $y = $ SNOW (columns $j = 0..4$): vertex $ij$ is the subproblem $D(i, j)$. Rightward edges insert a letter of SNOW, downward edges delete a letter of SUN, and diagonal edges match (weight $0$: S/S and N/N) or substitute (weight $1$). Step through Dijkstra's algorithm from $00$: the distance it settles at each vertex is the table entry $D(i, j)$, and the distance $3$ at $34$ is the edit distance (delete U, insert O, insert W).
:::

In computational biology the same recurrence with general scores — rewards for matches, penalties depending on the pair of letters, and gap penalties — is the **Needleman–Wunsch** algorithm for global alignment; the variant that finds the best-matching *substrings* is **Smith–Waterman**. Since row $i$ of the table depends only on row $i - 1$, the *distance* can be computed in $O(\min(m, n))$ space; Hirschberg's divide-and-conquer trick (1975) recovers an optimal alignment in linear space too, in the same $O(mn)$ time.

::: quiz
What is the edit distance between *abc* and *bca*?

- [ ] $1$
- [x] $2$
- [ ] $3$
- [ ] $0$, since they have the same letters
::: solution
Delete $a$ at the front and insert $a$ at the end: two operations, $abc \to bc \to bca$. One operation cannot do it: a single substitution keeps the length but changes one position, and $abc$ and $bca$ differ in all three positions; a single insertion or deletion changes the length. So the distance is $2$. (Equivalently, $D(3, 3) = 2$ in the table for these strings.)
:::
:::

## The knapsack problem

**0/1 knapsack.** Items $1, \dots, n$ have positive integer weights $w_i$ and values $v_i$; the knapsack holds total weight at most $W$. Choose a subset of items of total weight at most $W$ and maximum total value. (Each item is taken whole or not at all — hence "0/1".)

A subproblem must remember how much capacity is left, so we add a second parameter: let $K(i, c)$ be the best value achievable with items $1..i$ and capacity $c$.

::: theorem Knapsack recurrence {#thm-knapsack}
$K(0, c) = 0$ for all $c$, and for $i \ge 1$
$$
K(i, c) = \begin{cases} K(i-1, c) & \text{if } w_i > c,\\ \max\big(K(i-1, c),\; v_i + K(i-1, c - w_i)\big) & \text{if } w_i \le c.\end{cases}
$$ {#eq-knapsack}
:::

::: proof
An optimal subset for $(i, c)$ either omits item $i$ — then it is a feasible subset of items $1..i-1$ for capacity $c$, of value at most $K(i - 1, c)$ — or includes it, which requires $w_i \le c$, and then the rest is a feasible subset of items $1..i-1$ for capacity $c - w_i$, of value at most $K(i-1, c - w_i)$. Conversely both options are achievable: an optimal subset for $(i-1, c)$, or one for $(i - 1, c - w_i)$ plus item $i$, of total weight at most $c$.
:::

```python
def knapsack(items, W):
    """0/1 knapsack: items are (weight, value) with integer weights."""
    n = len(items)
    K = [[0] * (W + 1) for _ in range(n + 1)]   # K[i][c]: first i items, capacity c
    for i in range(1, n + 1):
        w, v = items[i - 1]
        for c in range(W + 1):
            K[i][c] = K[i - 1][c]                # leave item i out
            if w <= c:
                K[i][c] = max(K[i][c], K[i - 1][c - w] + v)   # or take it
    chosen, c = [], W
    for i in range(n, 0, -1):                    # trace back
        if K[i][c] != K[i - 1][c]:
            chosen.append(i - 1); c -= items[i - 1][0]
    return K[n][W], chosen[::-1]

print(knapsack([(10, 60), (20, 100), (30, 120)], 50))
print(knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7))
```

```console
$ python3 knap.py
(220, [1, 2])
(9, [1, 2])
```

The first instance is the one on which the greedy "best value per weight" rule fails ([[algorithms/greedy-algorithms]]): dynamic programming finds the optimum $220$ (items of weight $20$ and $30$). The table has $(n + 1)(W + 1)$ entries, each $O(1)$, so the running time is $\Theta(nW)$.

::: example A small knapsack table {#ex-knapsack}
Fill in the table $K(i, c)$ for the second instance of the listing: items $(w, v) = (1, 1), (3, 4), (4, 5), (5, 7)$ and $W = 7$.
::: solution
| $i$ \\ $c$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1: $(1, 1)$ | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 2: $(3, 4)$ | 0 | 1 | 1 | 4 | 5 | 5 | 5 | 5 |
| 3: $(4, 5)$ | 0 | 1 | 1 | 4 | 5 | 6 | 6 | 9 |
| 4: $(5, 7)$ | 0 | 1 | 1 | 4 | 5 | 7 | 8 | 9 |

For example $K(3, 7) = \max(K(2, 7), 5 + K(2, 3)) = \max(5, 5 + 4) = 9$ and $K(4, 7) = \max(K(3, 7), 7 + K(3, 2)) = \max(9, 7 + 1) = 9$. The optimum is $9$, from items $2$ and $3$ (weights $3 + 4 = 7$). Tracing back: $K(4, 7) = K(3, 7)$, so item $4$ is out; $K(3, 7) \ne K(2, 7)$, so item $3$ is in, leaving capacity $3$; $K(2, 3) \ne K(1, 3)$, item $2$ in, capacity $0$. The greedy ratio rule would take item $4$ (ratio $1.4$) first, then item $1$, for value $8$.
:::
:::

::: warning Pseudo-polynomial is not polynomial
$\Theta(nW)$ looks polynomial, but the input encodes $W$ in about $\log_2 W$ bits. Doubling the number of bits of $W$ *squares* the table size, so the running time is exponential in the length of the input; such an algorithm is called **pseudo-polynomial**. With weights up to $10^{18}$ the table is useless. This is no accident: the knapsack problem is $\mathsf{NP}$-hard ([[complexity]]), and no polynomial-time algorithm is known. The dynamic program is excellent when $W$ is small, and it is the basis of approximation schemes that round the values; but "dynamic programming solves knapsack" does not mean "knapsack is easy".
:::

## A recipe, and shortest paths again

The problems above share a recipe.

1. **Characterise the structure** of an optimal solution: what is its last decision (the last request, the last column of the alignment, the last item)?
2. **Define subproblems** — usually prefixes, or prefixes plus a resource such as remaining capacity — so that removing the last decision leaves an optimal solution of a subproblem (**optimal substructure**, proved by cut and paste: if the remaining part were not optimal, replacing it with a better one would improve the whole).
3. **Write the recurrence**, with base cases; prove it by showing "$\ge$" (each option is achievable) and "$\le$" (an optimal solution falls under one of the options).
4. **Order the evaluation** so that every subproblem is computed after those it depends on — a topological order of the **subproblem DAG** — or memoise the recursion.
5. **Reconstruct** an optimal solution by tracing back the choices.

The running time is (number of subproblems) $\times$ (time per subproblem), here $n \times O(1)$, $mn \times O(1)$ and $nW \times O(1)$.

::: algorithm Generic dynamic programming {#alg-dp}
Given a recurrence $\mathrm{OPT}(x) = \mathrm{combine}\{\,\mathrm{OPT}(y) : y \in \mathrm{sub}(x)\,\}$ over a finite set of subproblems whose dependency graph is acyclic:

1. Topologically sort the subproblems so that each comes after all $y \in \mathrm{sub}(x)$ (often just increasing size).
2. For each subproblem $x$ in that order, compute $\mathrm{OPT}(x)$ from the stored values, and store it together with the choice that attained it.
3. Return the value of the original problem, and follow the stored choices to recover a solution.
:::

Shortest paths fit the recipe. In a DAG, the subproblems are $\delta(s, v)$, the last decision is the last edge $(u, v)$, and $\delta(s, v) = \min_{(u, v)} \delta(s, u) + w(u, v)$ — the one-pass DAG algorithm of [[algorithms/shortest-paths]]. In a general graph this recurrence is *cyclic* ($\delta(s, u)$ may depend on $\delta(s, v)$), so we add a parameter that breaks the cycles: $d_i(v)$, the shortest path using at most $i$ edges, satisfies $d_i(v) = \min\big(d_{i-1}(v), \min_{(u,v)} d_{i-1}(u) + w(u, v)\big)$ — Bellman–Ford, with $n \cdot m$ work. Floyd–Warshall uses the parameter "intermediate vertices among the first $k$". Choosing the right extra parameter is often the creative step.

::: definition Optimal substructure and overlapping subproblems {#def-dp}
A problem has **optimal substructure** with respect to a family of subproblems if an optimal solution of every subproblem can be assembled from optimal solutions of smaller subproblems of the family, by one of finitely many choices, so that its value satisfies a recurrence. The subproblems **overlap** if the recursion tree of that recurrence contains the same subproblem many times — that is, if the number of *distinct* subproblems is much smaller than the number of recursive calls.
:::

### When optimal substructure fails

Optimal substructure is a property of a problem *together with* a choice of subproblems, and it can fail in instructive ways. Shortest paths have it ([[algorithms/shortest-paths#lem-subpath]]). **Longest simple paths** do not. Take the undirected square with edges $q$–$r$, $r$–$t$, $t$–$s$, $s$–$q$. A longest simple path from $q$ to $t$ is $q, r, t$ (or $q, s, t$), of length $2$. Its subpath from $q$ to $r$ is the single edge $q, r$, of length $1$ — but the longest simple path from $q$ to $r$ is $q, s, t, r$, of length $3$. The pieces of an optimal solution are not optimal for their own subproblems, because the subproblems are **not independent**: the longest path from $q$ to $r$ uses $s$ and $t$, which the rest of the path also needs. When pieces of a solution compete for the same resource (here, vertices that may be used only once), a recurrence over the obvious subproblems is wrong, and adding the resource to the state — "longest path from $q$ to $r$ avoiding the set $X$" — makes the number of subproblems exponential. That is the usual signature of an $\mathsf{NP}$-hard problem.

The knapsack problem shows the other remedy: the items compete for capacity, and adding the remaining capacity $c$ to the state restores independence at the price of $W + 1$ times as many subproblems.

### In practice

In Python, `functools.cache` turns a recursive function of hashable arguments into a memoised one in a single line, which makes top-down dynamic programming very quick to write. Two cautions: the recursion may exceed the default recursion limit of about $1000$ frames (the edit-distance recursion on two $2000$-character strings has depth up to $4000$), and the cache keeps every result until it is cleared, so its memory is the number of distinct subproblems. Bottom-up tables avoid both problems and allow space to be saved by keeping only the rows still needed: the edit-distance *value* needs two rows, the knapsack value one array (see the exercises). Production tools such as `diff` and the aligners used in genomics combine such space savings with problem-specific pruning — for instance, computing only a band of the table around the diagonal when the two inputs are known to be similar.

### Why "dynamic programming" works where greed fails

Greedy algorithms commit to one choice by an exchange argument; dynamic programming tries **every** choice for the last decision and keeps the best, relying on optimal substructure for the rest. It is therefore more general, but slower, and it depends on the number of distinct subproblems being small. When the natural subproblems are all *subsets* — as in the travelling salesman problem, where the state is (set of cities visited, current city) — dynamic programming still helps (Held and Karp's $O(n^2 2^n)$ beats $n!$), but it is exponential.

::: quiz
A recursive function `f(i, j)` for $0 \le i \le m$, $0 \le j \le n$ calls `f(i - 1, j)`, `f(i, j - 1)` and `f(i - 1, j - 1)`, and does $O(1)$ other work. What is the running time with memoisation, and roughly without it?

- [x] $\Theta(mn)$ with memoisation; exponential in $\min(m, n)$ without
- [ ] $\Theta(mn)$ either way
- [ ] $\Theta(m + n)$ with memoisation
- [ ] $\Theta(3^{m+n})$ either way
::: solution
With memoisation each of the $(m+1)(n+1)$ subproblems is computed once in $O(1)$ time (plus cache look-ups), so $\Theta(mn)$. Without it, the number of calls $C(i, j) = 1 + C(i-1, j) + C(i, j-1) + C(i-1, j-1)$ is at least the number of monotone lattice paths, $\binom{i+j}{i}$, which is exponential in $\min(m, n)$ (for $m = n$ it is about $4^n/\sqrt{\pi n}$). The upper bound $3^{m+n}$ is not tight, and the problem's *distinct* subproblems are only $mn$ — the defining situation for dynamic programming.
:::
:::

::: history
Richard Bellman developed dynamic programming at the RAND Corporation in the early 1950s for multistage decision processes, and set it out in the book *Dynamic Programming* (1957). He later explained that he chose the name partly to sound impressive and to shield mathematical research from a Secretary of Defense who disliked the word "research"; "programming" meant planning, as in "linear programming". Bellman's "principle of optimality" is optimal substructure. Vladimir Levenshtein defined his distance in 1965 (English translation 1966). Saul Needleman and Christian Wunsch published their alignment algorithm for protein sequences in 1970, and Temple Smith and Michael Waterman the local version in 1981; Robert Wagner and Michael Fischer gave the edit-distance algorithm for strings in 1974. The $O(n^2 2^n)$ travelling-salesman algorithm is due to Bellman and, independently, to Michael Held and Richard Karp (1962).
:::

## Where this leads

Dynamic programming is everywhere: parsing context-free languages (the CYK algorithm, [[compilers]]), optimal binary search trees, the Viterbi algorithm for hidden Markov models, `diff` and version control, reinforcement learning (Bellman's equation for value functions, [[artificial-intelligence]]), and many algorithms on trees and graphs of bounded tree-width. Its limits — exponentially many subproblems for $\mathsf{NP}$-hard problems, and pseudo-polynomial time — are studied in [[complexity]]. [[algorithms/network-flow]] takes up a different general technique, reducing problems to a single powerful one.

::: summary
- **Dynamic programming** = a recurrence over subproblems with **optimal substructure** + computing each of the **overlapping** subproblems once, by tabulation (bottom-up) or memoisation (top-down).
- Prove a recurrence by "$\ge$" (each option is feasible) and "$\le$" (an optimal solution falls under some option); cut and paste shows the sub-solution is optimal.
- **Weighted interval scheduling**: $\mathrm{OPT}(j) = \max(\mathrm{OPT}(j-1), v_j + \mathrm{OPT}(p(j)))$, $O(n\log n)$ ([[#thm-wis]]).
- **Edit distance**: $D(i, j)$ from three neighbours, $\Theta(mn)$ time ([[#thm-edit]]); it is a shortest path in a grid DAG.
- **0/1 knapsack**: $K(i, c)$ in $\Theta(nW)$ ([[#thm-knapsack]]) — **pseudo-polynomial**, not polynomial.
- Running time = number of subproblems × time per subproblem; reconstruct solutions by tracing back choices. Bellman–Ford and Floyd–Warshall are dynamic programs with an extra parameter that makes the recurrence acyclic.
:::

## Exercises

::: exercise Edit distance by hand {level=1 check="3"}
Compute the edit distance between *sunday* and *saturday*. (Enter the distance.)
::: solution
*saturday* has two more letters than *sunday*, so at least two insertions are needed. Exactly two operations would both be insertions, which would make *sunday* a subsequence of *saturday* — impossible, since *saturday* contains no $n$. So the distance is at least $3$, and three suffice: match $s$, insert $a$, insert $t$, match $u$, substitute $n \to r$, match $d, a, y$. The table confirms $D(6, 8) = 3$.
:::
:::

::: exercise Counting subproblems {level=1 check="56"}
How many entries does the edit-distance table for strings of lengths $6$ and $7$ have? (Enter the number.)
::: solution
$(m + 1)(n + 1) = 7 \times 8 = 56$, as in the *kitten*/*sitting* table printed above (7 rows of 8).
:::
:::

::: exercise Longest common subsequence {level=2}
A **subsequence** of $x$ is obtained by deleting some characters. Give a recurrence for the length $L(i, j)$ of a longest common subsequence of $x_1..x_i$ and $y_1..y_j$, prove it, and compute an LCS of *ABCBDAB* and *BDCABA*.
::: solution
$L(i, 0) = L(0, j) = 0$; if $x_i = y_j$ then $L(i, j) = L(i-1, j-1) + 1$; otherwise $L(i, j) = \max(L(i-1, j), L(i, j-1))$. *Proof:* each option is achievable, so $L(i, j)$ is at least the right-hand side. Conversely, let $z$ be a common subsequence of $x_1..x_i$ and $y_1..y_j$ of length $L(i, j) \ge 1$, and let its last character be matched to positions $p \le i$ in $x$ and $q \le j$ in $y$; the rest of $z$ is matched to earlier positions. If $x_i = y_j$, removing the last character of $z$ leaves a common subsequence of $x_1..x_{i-1}$ and $y_1..y_{j-1}$, so $L(i, j) - 1 \le L(i-1, j-1)$. If $x_i \ne y_j$, then $p = i$ and $q = j$ cannot both hold, so $z$ is a common subsequence of $x_1..x_{i-1}$ and $y_1..y_j$ (if $p < i$) or of $x_1..x_i$ and $y_1..y_{j-1}$ (if $q < j$). The table for the example gives $L(7, 6) = 4$, with LCS *BCBA* (another is *BDAB*).

```python
def lcs(x, y):
    m, n = len(x), len(y)
    L = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if x[i - 1] == y[j - 1]:
                L[i][j] = L[i - 1][j - 1] + 1
            else:
                L[i][j] = max(L[i - 1][j], L[i][j - 1])
    out, i, j = [], m, n                    # trace back
    while i and j:
        if x[i - 1] == y[j - 1]:
            out.append(x[i - 1]); i -= 1; j -= 1
        elif L[i - 1][j] >= L[i][j - 1]:
            i -= 1
        else:
            j -= 1
    return ''.join(reversed(out))

print(lcs("ABCBDAB", "BDCABA"))
```

```console
$ python3 lcs.py
BCBA
```
:::
:::

::: exercise Making change {level=2 check="2"}
Coins have denominations $1, 3, 4$. Write a recurrence for the least number of coins $C(a)$ summing to $a$, compute $C(6)$, and explain why greedy fails here. (Enter $C(6)$.)
::: solution
$C(0) = 0$ and $C(a) = 1 + \min\{C(a - d) : d \in \{1, 3, 4\}, d \le a\}$ — the last coin is some $d$, and the rest is an optimal way to pay $a - d$. Values: $C(1) = 1$, $C(2) = 2$, $C(3) = 1$, $C(4) = 1$, $C(5) = 2$ ($4 + 1$), $C(6) = 1 + \min(C(5), C(3), C(2)) = 1 + 1 = 2$ ($3 + 3$). Greedy takes $4$ first and then needs $1 + 1$, three coins. The table takes $O(a \cdot k)$ time for $k$ denominations — pseudo-polynomial in $a$.
:::
:::

::: exercise Space for knapsack {level=2}
Show that the knapsack *value* $K(n, W)$ can be computed with a single array of $W + 1$ entries, by iterating the capacity *downwards* for each item. Why must the loop run downwards, and what goes wrong if it runs upwards?
::: solution
Row $i$ of the table depends only on row $i - 1$, at the same capacity and at smaller capacities $c - w_i$. Keep one array $A$; for item $i$, for $c = W, W - 1, \dots, w_i$, set $A[c] \gets \max(A[c], v_i + A[c - w_i])$. Running downwards, $A[c - w_i]$ has not yet been updated for item $i$, so it still holds $K(i-1, c - w_i)$, and the update computes $K(i, c)$ correctly. Running upwards, $A[c - w_i]$ may already include item $i$, so the item could be taken several times: that computes the *unbounded* knapsack (unlimited copies of each item), a different problem.
:::
:::

::: exercise Matrix-chain order {level=3 check="4500"}
Multiplying a $p \times q$ matrix by a $q \times r$ matrix takes $pqr$ scalar multiplications. Give a dynamic program for the cheapest way to parenthesise a product $A_1 A_2 \cdots A_n$, where $A_i$ is $d_{i-1} \times d_i$, and find the minimum cost for dimensions $d = (10, 30, 5, 60)$. (Enter the minimum number of multiplications.)
::: solution
Let $M(i, j)$ be the least cost of computing $A_i \cdots A_j$. The last multiplication splits the product as $(A_i \cdots A_k)(A_{k+1} \cdots A_j)$ for some $i \le k < j$, and both parts must be computed optimally, so $M(i, i) = 0$ and $M(i, j) = \min_{i \le k < j}\big(M(i, k) + M(k+1, j) + d_{i-1}d_kd_j\big)$. There are $O(n^2)$ subproblems, each taking $O(n)$, so $O(n^3)$ time, evaluating by increasing $j - i$. For $d = (10, 30, 5, 60)$: $M(1,2) = 10 \cdot 30 \cdot 5 = 1500$, $M(2,3) = 30 \cdot 5 \cdot 60 = 9000$, and $M(1,3) = \min(M(2,3) + 10\cdot30\cdot60,\; M(1,2) + 10\cdot5\cdot60) = \min(9000 + 18000, 1500 + 3000) = 4500$, by $(A_1A_2)A_3$.
:::
:::

::: exercise Longest increasing subsequence {level=3}
Give an $O(n^2)$ dynamic program for the length of a longest strictly increasing subsequence of $a_1, \dots, a_n$, and then improve it to $O(n\log n)$ by keeping, for each length $\ell$, the smallest possible last element $T[\ell]$ of an increasing subsequence of length $\ell$.
::: solution
*$O(n^2)$:* let $E(j)$ be the length of a longest increasing subsequence *ending at* $a_j$. Then $E(j) = 1 + \max\{E(i) : i < j, a_i < a_j\}$ (with $\max\emptyset = 0$), since the element before $a_j$ in such a subsequence is some smaller $a_i$ and the part up to it must be a longest one ending there. The answer is $\max_j E(j)$. *$O(n\log n)$:* $T$ is strictly increasing (from an increasing subsequence of length $\ell + 1$ ending in $T[\ell + 1]$, dropping the last element gives one of length $\ell$ ending in something smaller). Process $a_j$: find by binary search the first $\ell$ with $T[\ell] \ge a_j$ and set $T[\ell] \gets a_j$ (or append if none) — $a_j$ extends the best subsequence of length $\ell - 1$, whose last element is $< a_j$, and becomes the new smallest end for length $\ell$. The length of $T$ at the end is the answer; each step is $O(\log n)$.
:::
:::

::: exercise Independent sets in a tree {level=3}
An **independent set** in a graph is a set of vertices no two of which are adjacent. Given a tree with vertex weights $w(v) > 0$, give an $O(n)$ dynamic program for an independent set of maximum weight, and prove its recurrence.
::: solution
Root the tree. For each vertex $v$, let $\mathrm{in}(v)$ be the best weight of an independent set in the subtree of $v$ that contains $v$, and $\mathrm{out}(v)$ the best that does not. Then
$$
\mathrm{in}(v) = w(v) + \sum_{c \text{ child of } v}\mathrm{out}(c), \qquad \mathrm{out}(v) = \sum_{c}\max(\mathrm{in}(c), \mathrm{out}(c)).
$$
*Proof:* the subtrees of the children are disjoint and joined only through $v$. If $v$ is in the set, no child may be, and the parts in the children's subtrees are otherwise unconstrained and independent of each other, so each should be an optimal set avoiding its root. If $v$ is out, each child's subtree may contribute its best set, with or without the child. Both directions ($\ge$ and $\le$) follow as in the other recurrences. Evaluate in post-order (children before parents), $O(1)$ per edge, so $O(n)$ in total; the answer is $\max(\mathrm{in}(r), \mathrm{out}(r))$. (On general graphs the problem is $\mathsf{NP}$-hard; trees have no cycles to make the subproblems interact.)
:::
:::
