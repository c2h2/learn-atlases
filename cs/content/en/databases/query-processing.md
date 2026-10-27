A query such as "the names of students with an A in some course" is, to the database, an expression of the relational algebra: a join of Student and Enrolled, a selection on the grade and a projection. Each operator of that expression must be carried out by an actual algorithm reading actual pages. For selection there are a handful of choices; for joins there are many, and their costs on the same input can differ by a factor of ten thousand. A join of a table of a thousand pages with one of five hundred pages costs fifty million page reads with the naive nested loop and four and a half thousand with a hash join — about eight hours against three seconds at a few milliseconds per random read.

This chapter is the **physical** layer of query evaluation. It describes how a plan is executed (the iterator model), then gives the main algorithms for selection, sorting, joins and aggregation, and analyses each in the I/O cost model of [[databases/storage-indexing#def-io-model]] — with proofs of correctness and of the cost formulas, and a running numerical example. The next chapter ([[databases/query-optimisation]]) uses these formulas to choose among plans.

**Notation.** For a relation $R$: $B(R)$ pages, $T(R)$ tuples; $M$ is the number of buffer frames available to the operator. Costs count page reads and writes but, as is customary, *not* the cost of writing the final result, which is the same for every algorithm. Our running example joins Enrolled ($E$: $B(E) = 1000$ pages, $T(E) = 100\,000$ tuples) with Student ($S$: $B(S) = 500$ pages, $T(S) = 40\,000$ tuples) on sid, with $M = 52$ frames.

## From query to plan

A query passes through several stages. The **parser** checks the SQL and builds a syntax tree; the **rewriter** expands views and normalises the query; the **optimiser** produces a **physical plan** — a tree whose nodes are algorithms such as "hash join" or "index scan" rather than algebra operators; and the **executor** runs it.

::: definition Iterator (Volcano) model {#def-iterator}
In the **iterator model** every physical operator implements three methods: `open()` prepares it (and opens its children), `next()` returns its next output tuple or an end marker, and `close()` releases its resources. An operator obtains input by calling `next()` on its children. An operator is **pipelined** if it produces output while still reading input, and **blocking** if it must consume an entire input before producing any output.
:::

Selection and projection are pipelined: each `next()` pulls from the child until a tuple qualifies. Sorting is blocking: the smallest tuple may be the last one read. Execution is driven from the root, by demand: if the client wants only ten rows (`LIMIT 10`), the plan stops after producing ten, and the scans below stop reading. Python generators express the model directly:

```python
from collections import defaultdict
calls = defaultdict(int)                         # how many rows each operator produced

def scan(table, name):
    for row in table:
        calls[name] += 1
        yield row

def select(child, pred, name):
    for row in child:
        if pred(row):
            calls[name] += 1
            yield row

def hash_join(build, probe, bkey, pkey, name):
    table = defaultdict(list)
    for b in build:                              # blocking: consume all of build first
        table[b[bkey]].append(b)
    for p in probe:                              # pipelined: stream the probe side
        for b in table.get(p[pkey], []):
            calls[name] += 1
            yield p + b

def limit(child, n):
    for i, row in enumerate(child, start=1):
        yield row
        if i == n:
            return                               # stop pulling: upstream work stops too
```

With `Enrolled` and `Student` the ten- and five-row tables of [[databases/relational-model]], the plan "first two A-grade enrolments with names" runs as

```python
plan = limit(hash_join(scan(Student, "scan S"),
                       select(scan(Enrolled, "scan E"), lambda e: e[2] == "A", "select"),
                       0, 0, "join"), 2)
for row in plan:
    print(row[4], row[1])
print(dict(calls))
```

```console
$ python3 volcano.py
Ada CS101
Ada MA101
{'scan S': 5, 'scan E': 3, 'select': 2, 'join': 2}
```

The build side (Student) was read completely — the hash join's build phase is blocking — but only three of the ten Enrolled rows were ever read, because the limit stopped pulling after two results. When an operator's output must be stored and re-read (for example the inner input of a nested-loop join that is itself a join), it is **materialised** in a temporary file, at the cost of writing and reading it. Modern engines often process a batch of tuples per call (**vectorised execution**) or compile the plan into machine code, but the logical structure is the same.

## Selection

For a selection $\sigma_\theta(R)$ the options depend on $\theta$ and on the available access paths ([[databases/storage-indexing]]).

- **File scan**: read all $B(R)$ pages and test each tuple. Always possible.
- **Binary search** on a file sorted by $A$, for $A = c$ or a range on $A$: $\lceil\log_2 B(R)\rceil$ plus the pages holding matches.
- **Index scan** with a B+-tree on $A$: about $h + 1$ I/Os to reach the first matching leaf, plus the matching leaves, plus the data pages — about $s \cdot B(R)$ for a clustered index and up to $s \cdot T(R)$ for an unclustered one, where $s$ is the fraction of tuples selected ([[databases/storage-indexing#ex-unclustered]]).
- **Hash index** on $A$, for equality only: about $1$–$2$ I/Os to the bucket plus the matching records.

A conjunction $\theta_1 \wedge \theta_2$ can use an index for the most selective conjunct and test the rest on the fetched tuples, or use two indexes, intersect their rid sets in memory, and fetch only the tuples in the intersection. A disjunction $\theta_1 \vee \theta_2$ can use indexes only if *every* disjunct has one (union of rid sets); otherwise a scan is needed anyway, since the tuples satisfying an unindexed disjunct could be anywhere.

::: example Access paths for a conjunction and a disjunction {#ex-access-path}
Enrolled has $T = 100\,000$ tuples in $B = 1000$ pages, a clustered B+-tree on code and an unclustered B+-tree on grade, each of height $2$. The condition `code = 'CS202'` matches $200$ tuples (on $2$ pages) and `grade = 'A'` matches $25\%$ of the tuples. Choose a plan for (a) `code = 'CS202' AND grade = 'A'` and (b) `code = 'CS202' OR grade = 'A'`.
::: solution
(a) Candidates: a file scan, $1000$ I/Os; the code index, $h + 1 = 3$ I/Os to the first leaf plus $2$ data pages, then test the grade on the $200$ fetched tuples, about $5$ I/Os; the grade index, $3$ plus up to $25\,000$ random data-page reads, then test the code. The clustered code index wins by a factor of $200$ over the scan. Intersecting the rid sets of both indexes would not help: reading the grade index's $25\,000$ entries costs more leaf pages than the code index plan costs in total.

(b) A tuple qualifies if it satisfies either condition, so a plan must find all `grade = 'A'` tuples, $25\%$ of the table. Through the unclustered grade index that is up to $25\,000$ I/Os (or about $1000$ with rids sorted by page), so a single file scan, $1000$ I/Os, testing both conditions, is the plan. The cost of a disjunction is governed by its *least* selective disjunct.
:::
:::

## External sorting

Sorting is needed for `ORDER BY`, for building B+-trees by bulk loading, for duplicate elimination and grouping, and for the sort-merge join. When $B(R)$ exceeds $M$, the data cannot be sorted in memory and we use **external merge sort**.

::: algorithm External merge sort {#alg-external-sort}
Input: a file of $B$ pages, $M \ge 3$ buffer frames.
1. **Pass 0 (run formation).** Repeatedly read $M$ pages, sort their tuples in memory, and write them out as a sorted **run**. This produces $\lceil B/M \rceil$ runs of $M$ pages (the last may be shorter).
2. **Merge passes.** While more than one run remains: group the runs into sets of $M - 1$, and merge each set into one run, using one input frame per run and one output frame. Each merge repeatedly moves the smallest of the $M - 1$ current front tuples to the output frame, writing the output frame when it fills and reading the next page of a run when its frame empties.
:::

::: theorem Cost of external merge sort {#thm-sort-cost}
[[#alg-external-sort]] sorts the file in

$$
P(B, M) = 1 + \Bigl\lceil \log_{M-1} \lceil B/M \rceil \Bigr\rceil
$$ {#eq-sort-passes}

passes, each reading and writing every page once, for a total cost of $2B \cdot P(B, M)$ I/Os.
:::

::: proof
*Correctness.* Each run produced by pass 0 is sorted. A merge of sorted runs outputs, at each step, the smallest remaining tuple among all its inputs, because the smallest remaining tuple of each run is at its front; so the output run is sorted and contains exactly the tuples of its inputs. When one run remains it contains every tuple, in order.

*Passes.* Pass 0 leaves $r_0 = \lceil B/M\rceil$ runs. A merge pass turns $r$ runs into $\lceil r/(M-1)\rceil$, and by induction after $k$ merge passes there are $\lceil r_0/(M-1)^k\rceil$ runs (using $\lceil\lceil x\rceil/n\rceil = \lceil x/n\rceil$ for integers $n$). This is $1$ exactly when $(M-1)^k \ge r_0$, i.e. $k \ge \log_{M-1} r_0$; so $\lceil \log_{M-1} r_0 \rceil$ merge passes are needed, plus pass 0.

*Cost.* Every pass reads each of the $B$ pages once and writes each once, so the cost is $2B$ per pass.
:::

::: example Sorting 108 pages with 5 frames {#ex-sort}
Sort a file of $B = 108$ pages with $M = 5$ frames. Then estimate the cost of sorting a $10^6$-page file with $M = 101$ and with $M = 1001$.
::: solution
Pass 0 reads $5$ pages at a time: $\lceil 108/5\rceil = 22$ runs ($21$ of $5$ pages and one of $3$). Each merge pass merges $M - 1 = 4$ runs at a time: $22 \to 6 \to 2 \to 1$. That is $1 + 3 = 4$ passes, matching $1 + \lceil \log_4 22 \rceil = 1 + 3$, at a cost of $2 \cdot 108 \cdot 4 = 864$ I/Os. A simulation that sorts $108$ pages of $4$ random keys and counts page transfers agrees:

```python
import heapq, random

def external_sort(pages, M):
    """Sort a list of pages (lists of keys) with M buffer frames; count page I/Os."""
    io = 0
    runs = []                                         # pass 0: sorted runs of M pages
    for i in range(0, len(pages), M):
        chunk = sorted(k for p in pages[i:i + M] for k in p)
        io += 2 * len(pages[i:i + M])                  # read and write each page
        runs.append(chunk)
    passes = 1
    while len(runs) > 1:                              # merge M - 1 runs at a time
        runs = [list(heapq.merge(*runs[i:i + M - 1])) for i in range(0, len(runs), M - 1)]
        io += 2 * len(pages)
        passes += 1
    return runs[0], passes, io

random.seed(3)
keys = random.sample(range(10**6), 108 * 4)            # 108 pages of 4 keys
pages = [keys[i:i + 4] for i in range(0, len(keys), 4)]
out, passes, io = external_sort(pages, M=5)
print(out == sorted(keys), passes, io)
```

```console
$ python3 extsort.py
True 4 864
```

For $B = 10^6$: with $M = 101$, pass 0 makes $9901$ runs and $100$-way merging needs $\lceil\log_{100} 9901\rceil = 2$ further passes, $3$ in all, costing $6 \times 10^6$ I/Os. With $M = 1001$, pass 0 makes $1000$ runs, which a single $1000$-way merge combines: $2$ passes, $4 \times 10^6$ I/Os. The cost falls only logarithmically with memory.
:::
:::

The case of two passes deserves a name: a file can be sorted in two passes — pass 0 and a single merge — exactly when $\lceil B/M \rceil \le M - 1$, which holds roughly when $B \le M^2$. So memory equal to the *square root* of the file suffices: $M = 1000$ frames of 8 KiB (8 MiB) sorts about $10^6$ pages (8 GB) in two passes. Two refinements are standard. **Replacement selection** produces runs that average $2M$ pages on random input (Knuth's analysis), halving the number of runs. **Double buffering** reserves two frames per run so that the next page is read while the current one is processed, overlapping I/O with computation at the cost of a smaller merge fan-in.

::: widget plot
f: 1 + ceil(log(ceil(1000000/x))/log(x - 1))
x: 3, 2000
y: 0, 20
labels: \text{passes } P(10^6, M)
points: 101,3; 1001,2
caption: The number of passes [[#eq-sort-passes]] needed to sort a file of $10^6$ pages, against the number of buffer frames $M$. It drops very steeply at first and then in long steps: from about $10$ passes with $M = 5$, to $3$ at $M = 101$ and $2$ at $M = 1001$ (the dots; [[#ex-sort]]). Beyond $M \approx \sqrt{10^6}$ more memory does not help until the whole file fits. Hover to read the number of passes for other memory sizes.
:::

## Join algorithms

Joins are the most expensive and most frequent operators, and there are four families of algorithms. We consider the equijoin $R \bowtie_{R.a = S.b} S$; only nested loops handle arbitrary conditions.

### Nested loops

The simplest algorithm compares every tuple of the **outer** relation $R$ with every tuple of the **inner** relation $S$. Done tuple by tuple, it reads $S$ once per tuple of $R$: $B(R) + T(R)\,B(S)$ I/Os. Done page by page, $S$ is read once per page of $R$: $B(R) + B(R)\,B(S)$. The real improvement is to use the memory.

::: algorithm Block nested-loop join {#alg-bnl}
1. Repeat until $R$ is exhausted: read the next $M - 2$ pages of $R$ into memory (a **block**), and build an in-memory hash table on their join attribute.
2. For each such block, scan $S$ page by page using one frame; for each tuple $s$, probe the hash table and output each join result through the remaining output frame.
:::

::: proposition Cost of block nested-loop join {#prop-bnl}
[[#alg-bnl]] costs $B(R) + \lceil B(R)/(M-2) \rceil \cdot B(S)$ I/Os. It is cheapest with the smaller relation as the outer, and if $B(R) \le M - 2$ it costs $B(R) + B(S)$, one read of each input.
:::

::: proof
$R$ is read once, in $\lceil B(R)/(M-2)\rceil$ blocks, and $S$ is read once per block. The output is correct because each pair $(r, s)$ is examined exactly once: when the block containing $r$ is in memory and $s$ is scanned. With $b_R = B(R)$, $b_S = B(S)$ and $m = M - 2$, the cost with $R$ outer is $b_R + \lceil b_R/m\rceil b_S \approx b_R + b_R b_S/m$, and with $S$ outer $\approx b_S + b_S b_R/m$; the product term is the same, so the smaller relation should be the outer, saving $b_R - b_S$ (up to the effect of rounding).
:::

### Index nested loops

If $S$ has an index on the join attribute $b$, then for each tuple $r$ of $R$ we can look up the matching tuples of $S$ directly instead of scanning $S$: the cost is $B(R) + T(R) \cdot c$, where $c$ is the cost of one index lookup plus fetching the matches — about $2$–$4$ I/Os for a B+-tree, $1$–$2$ for a hash index, plus one I/O per matching tuple for an unclustered index. Index nested loops is excellent when $R$ is small (for instance after a selective selection) and poor when $R$ is large, because it performs $T(R)$ random lookups.

### Sort-merge join

::: algorithm Sort-merge join {#alg-smj}
1. Sort $R$ on $a$ and $S$ on $b$ ([[#alg-external-sort]]).
2. Scan both sorted inputs in step. If the current $R$ key is smaller, advance in $R$; if the current $S$ key is smaller, advance in $S$. If they are equal to $v$, output every pair of an $R$ tuple with key $v$ and an $S$ tuple with key $v$ (the two **groups** with key $v$), and advance past both groups.
:::

The merge phase is correct because, with both inputs sorted, all tuples with join value $v$ are contiguous in each input; when the merge reaches $v$ in both, all of them are present in the two groups, and every matching pair has the same value $v$. Its cost is $B(R) + B(S)$ if each group of $S$ fits in memory, which is the normal case (a join on a key of $S$ has groups of one tuple); in the worst case — every tuple with the same key — the merge degenerates into a nested loop. If the inputs are already sorted (for instance read through a clustered B+-tree) the sorting step is free, and an output sorted on the join key is a bonus for a later `ORDER BY` or `GROUP BY`. When $B(R)$ and $B(S)$ are both at most about $M^2$, the final merge pass of the two sorts can be combined with the join, for a total of $3\bigl(B(R) + B(S)\bigr)$: pass 0 reads and writes both inputs, and one merge pass reads all runs of both, provided their total number is at most $M - 1$.

### Hash join

::: algorithm Grace hash join {#alg-hash-join}
1. **Partition.** Choose a hash function $h$ with $M - 1$ values. Scan $S$, writing each tuple into partition $S_i$ with $i = h(s.b)$, using one output frame per partition. Partition $R$ in the same way into $R_1, \dots, R_{M-1}$ by $h(r.a)$.
2. **Probe.** For each $i$: read $S_i$ into memory and build an in-memory hash table on $b$ with a *different* hash function $h'$; then scan $R_i$, probing the table with each $r.a$ and outputting the matches.
:::

::: theorem Correctness and cost of the hash join {#thm-hash-join}
[[#alg-hash-join]] computes $R \bowtie_{a = b} S$. If every partition $S_i$ fits in $M - 2$ frames (with one frame for reading $R_i$ and one for output), it costs $3\bigl(B(R) + B(S)\bigr)$ I/Os. This is possible, with uniform partitions, when $B(S) \le (M - 1)(M - 2)$, roughly $B(S) \le M^2$.
:::

::: proof
*Correctness.* If $r.a = s.b$ then $h(r.a) = h(s.b)$, so $r \in R_i$ and $s \in S_i$ for the same $i$, and the pair is found when partition $i$ is probed. Conversely, every output pair is checked to satisfy $r.a = s.b$. Each tuple of $R$ is in exactly one partition and is probed once, so no pair is output twice.

*Cost.* Partitioning reads both relations and writes them back as partitions: $2(B(R) + B(S))$. Probing reads every partition once: $B(R) + B(S)$. Total $3(B(R) + B(S))$. Each $S_i$ has about $B(S)/(M-1)$ pages; for it to fit in $M - 2$ frames we need $B(S) \le (M-1)(M-2)$.

A second hash function $h'$ is needed in the probe phase because all tuples of $S_i$ have the same value of $h$, so a table hashed by $h$ would put them all in one bucket.
:::

If a partition is too large — because $S$ is much bigger than $M^2$ or because the hash values are skewed — it is partitioned again recursively. **Hybrid hash join** keeps the first partition of $S$ in memory during partitioning, so that the corresponding tuples of $R$ are joined immediately without being written out; when $S$ fits in memory entirely, the hash join reads each input exactly once. Only the *smaller* input (the **build** input) needs to fit by partitions; the larger one (the **probe** input) can be any size.

::: example Costing the running example {#ex-join-costs}
Compute the cost of each join algorithm for $E \bowtie S$ on sid, with $B(E) = 1000$, $T(E) = 100\,000$, $B(S) = 500$, $T(S) = 40\,000$ and $M = 52$. For index nested loops, assume a clustered B+-tree on Student.sid costing $3$ I/Os per lookup.
::: solution
| algorithm | formula | I/Os |
|---|---|---|
| tuple nested loop, $E$ outer | $1000 + 100\,000 \cdot 500$ | $50\,001\,000$ |
| page nested loop, $S$ outer | $500 + 500 \cdot 1000$ | $500\,500$ |
| block nested loop, $E$ outer | $1000 + \lceil 1000/50 \rceil \cdot 500$ | $11\,000$ |
| block nested loop, $S$ outer | $500 + \lceil 500/50 \rceil \cdot 1000$ | $10\,500$ |
| index nested loop, $E$ outer | $1000 + 100\,000 \cdot 3$ | $301\,000$ |
| sort-merge, separate sorts | $2\cdot 1000\cdot 2 + 2\cdot 500 \cdot 2 + 1500$ | $7\,500$ |
| sort-merge, merged final pass | $3 \cdot (1000 + 500)$ | $4\,500$ |
| Grace hash join | $3 \cdot (1000 + 500)$ | $4\,500$ |

Details: each sort takes $2$ passes by [[#eq-sort-passes]] ($\lceil 1000/52\rceil = 20$ runs and $\lceil 500/52 \rceil = 10$ runs, each merged in one pass); in the combined version the $30$ runs fit in $M - 1 = 51$ frames and are merged directly into the join. For the hash join, the $51$ partitions of Student have about $10$ pages each, far below $M - 2 = 50$. At $5$ ms per I/O, the hash join takes about $22$ seconds and the tuple nested loop nearly three days. Index nested loops loses here because it does $100\,000$ random lookups; it would win if a selection first reduced Enrolled to a few hundred tuples ([[#ex-inl]]).
:::
:::

::: widget plot
f: 500 + 1000*ceil(500/(x - 2)); 4500 + 0*x; 1000 + 500*ceil(1000/(x - 2))
x: 3, 120
y: 0, 60000
labels: \text{block nested loop, } S \text{ outer}; \text{hash join (when } B(S) \le (M-1)(M-2)\text{)}; \text{block nested loop, } E \text{ outer}
points: 52,10500; 52,4500
caption: Cost of joining $E$ ($1000$ pages) and $S$ ($500$ pages) against the number of buffer frames $M$. Block nested loop falls like $1/M$ in steps, with the smaller relation outside slightly better. The Grace hash join costs $3(B(E)+B(S)) = 4500$ as soon as $M$ is above about $\sqrt{500} \approx 24$, and wins clearly for small memories; but from $M = 127$ block nested loop with $S$ outer is just as cheap, from $M = 252$ it scans $E$ only twice ($2500$), and at $M = 502$ all of Student fits and it reads each relation once ($1500$) — which a hybrid hash join, not drawn here, also achieves. The dots mark $M = 52$, the case of [[#ex-join-costs]].
:::

The four algorithms are easy to state in Python for in-memory lists, and comparing them on the running example is a good check that they agree:

```python
from collections import defaultdict

def nested_loop_join(R, S, r_key, s_key):
    return [r + s for r in R for s in S if r[r_key] == s[s_key]]

def hash_join(R, S, r_key, s_key):
    table = defaultdict(list)
    for s in S:                                  # build on the smaller input
        table[s[s_key]].append(s)
    return [r + s for r in R for s in table.get(r[r_key], [])]   # probe

def sort_merge_join(R, S, r_key, s_key):
    R = sorted(R, key=lambda t: t[r_key]); S = sorted(S, key=lambda t: t[s_key])
    out, i, j = [], 0, 0
    while i < len(R) and j < len(S):
        a, b = R[i][r_key], S[j][s_key]
        if a < b: i += 1
        elif a > b: j += 1
        else:                                    # equal keys: join the two groups
            j2 = j
            while j2 < len(S) and S[j2][s_key] == a: j2 += 1
            while i < len(R) and R[i][r_key] == a:
                out += [R[i] + s for s in S[j:j2]]
                i += 1
            j = j2
    return out
```

On the ten enrolments and five students all three return the same $10$ tuples ([[databases/relational-model#prop-join-size]]: one per enrolment, since sid is a foreign key).

::: quiz
Which join algorithms can evaluate $R \bowtie_{R.a < S.b} S$, a join on an inequality?
- [x] Block nested-loop join
- [ ] Grace hash join
- [x] Sort-merge-style algorithms adapted to ranges (a band join), or index nested loops with a B+-tree on $S.b$
- [ ] None of them: inequality joins cannot be computed
::: solution
Nested loops evaluate any condition. Hashing requires equality: tuples with $a < b$ are in unrelated buckets. With $S$ sorted on $b$ (or a B+-tree on $b$), for each $r$ the matching $s$ form a contiguous range $b > r.a$, so an index range scan or a merge-like sweep finds them. Of course the output of an inequality join can be close to $T(R)\,T(S)$ tuples, so no algorithm is cheap on large inputs.
:::
:::

::: warning "Hash join is always fastest" — not quite
Each algorithm has a regime where it wins. Index nested loops is best when the outer input is small and the inner has an index: a few lookups instead of reading the whole inner relation. Sort-merge wins when the inputs are already sorted, or when the output must be sorted anyway, and degrades more gracefully under skew. Block nested loops is best when the smaller relation fits in memory and is the only option for arbitrary conditions. Hash joins are excellent for large unsorted equijoins, but they need memory for the build side and suffer when one join value is very frequent (all its tuples land in one partition, which no amount of re-partitioning splits). The optimiser chooses using estimates of sizes and selectivities; when those estimates are wrong, so is the choice ([[databases/query-optimisation]]).
:::

## Other operators

**Projection with duplicate elimination** (`SELECT DISTINCT`) and **grouping** (`GROUP BY`) both require bringing equal values together, and both are done by sorting or by hashing — the same two techniques as for joins.

- *Sorting*: sort on the projected or grouping attributes; duplicates and groups are then adjacent, and one scan removes duplicates or computes each group's aggregates. Duplicates can already be removed during run formation and merging, so the cost is at most that of the sort.
- *Hashing*: partition on the attributes as in the hash join, then process each partition in memory with a hash table holding one entry per distinct value or group. For aggregation the in-memory table holds just the running aggregate per group — a count, a sum, a minimum — so if the number of *groups* fits in memory, a single scan suffices, however large the input.

Aggregates such as `COUNT`, `SUM`, `MIN` and `MAX` can be maintained incrementally; `AVG` is maintained as a sum and a count. Set operations reduce to the same patterns: $R \cap S$ and $R - S$ are joins on all attributes followed by a test, computed by sorting or hashing both inputs. Outer joins modify the join algorithms to remember which tuples found a partner — for a hash join with the preserved side as the build input, a flag per hash-table entry.

::: example Index nested loops after a selection {#ex-inl}
Change the query of [[#ex-join-costs]] to $\sigma_{\text{code} = \text{'CS202'}}(E) \bowtie S$, and suppose $200$ enrolments match, found through a clustered index on Enrolled.code at a cost of $3 + 2$ I/Os ($2$ pages of matching tuples). Compare index nested loops with the hash join.
::: solution
Index nested loops: $5$ I/Os to find the $200$ enrolments, then $200$ lookups in Student's index at $3$ I/Os each: $5 + 600 = 605$ I/Os. The selection is pipelined into the join, so the $200$ tuples are never written.

Hash join: the build side should be the selected enrolments, which fit in memory ($2$ pages), so the hash join reads them once and then scans all of Student, $500$ pages: $5 + 500 = 505$ I/Os.

Both beat the $4500$ of the unselected join by an order of magnitude — selecting first is the most important optimisation of all. Here they are close; with $20$ matching enrolments, index nested loops ($5 + 60$) would win clearly, and with $2000$ ($5 + 6000$ against about $520$) the hash join would. The crossover depends on the number of matches, which is exactly what the optimiser must estimate.
:::
:::

::: history
The iterator model was formulated by Goetz Graefe for the Volcano system ("Volcano — an extensible and parallel query evaluation system", 1994, after a 1990 paper), and his survey "Query evaluation techniques for large databases" (*ACM Computing Surveys*, 1993) remains a standard reference. System R (1970s) used nested-loop and sort-merge joins, as described by Blasgen and Eswaran (1977). Hash joins came from the Japanese Grace database machine project (Kitsuregawa, Tanaka and Moto-oka, 1983) and DeWitt and colleagues' "Implementation techniques for main memory database systems" (1984), which introduced hybrid hash join; Shapiro's 1986 analysis compared them. External merge sorting is older than databases: Knuth's *The Art of Computer Programming*, volume 3 (1973), analyses replacement selection and polyphase merging developed for tape drives in the 1950s. The vectorised execution model was introduced by MonetDB/X100 (Boncz, Zukowski and Nes, 2005).
:::

## Where this leads

The cost formulas of this chapter are the raw material of the optimiser ([[databases/query-optimisation]]), which must also estimate the sizes $T$ and $B$ of intermediate results — the inputs of the formulas — and choose join orders. Parallel and distributed databases partition data across machines with exactly the hash partitioning of [[#alg-hash-join]], and MapReduce-style systems are sort-merge and hash algorithms at scale ([[parallel-computing]], [[distributed-systems]]). The divide-and-conquer structure of merge sort and the analysis of merging come from [[algorithms/divide-and-conquer]], and hashing from [[data-structures/hash-tables]].

::: summary
- Plans are trees of physical operators executed by the **iterator model**: `open`, `next`, `close`; pipelined operators stream, blocking ones (sort, hash build) consume an input first.
- **Selection** uses a scan, binary search, or an index; conjunctions can intersect rid sets, disjunctions need an index on every disjunct.
- **External merge sort** makes $\lceil B/M\rceil$ runs and merges $M - 1$ at a time: $2B\,(1 + \lceil\log_{M-1}\lceil B/M\rceil\rceil)$ I/Os; two passes suffice when $B \lesssim M^2$.
- **Block nested loop** costs $B(R) + \lceil B(R)/(M-2)\rceil B(S)$, smaller relation outside; **index nested loop** costs $B(R) + T(R)\cdot c$ and wins for small outers.
- **Sort-merge** and **Grace hash join** cost about $3(B(R)+B(S))$ when the inputs are at most about $M^2$ pages (hash: only the build side); hashing needs equality, sort-merge handles ordered inputs and outputs.
- Duplicate elimination, grouping and set operations use the same sort or hash techniques; aggregation by hashing needs memory only for the groups.
:::

## Exercises

::: exercise Sorting cost {level=1 check="80000"}
How many passes and I/Os does external merge sort need for a file of $10\,000$ pages with $M = 11$ frames? (Enter the number of I/Os.)
::: solution
Pass 0: $\lceil 10\,000/11\rceil = 910$ runs. Merging $10$ at a time: $910 \to 91 \to 10 \to 1$, three merge passes. So $4$ passes and $2 \cdot 10\,000 \cdot 4 = 80\,000$ I/Os; [[#eq-sort-passes]] gives $1 + \lceil \log_{10} 910 \rceil = 1 + 3 = 4$.
:::
:::

::: exercise Block nested loop {level=1 check="6300"}
$R$ has $2000$ pages and $S$ has $300$ pages, and $M = 102$. What is the cost of block nested-loop join with the better choice of outer relation? (Enter the number of I/Os.)
::: solution
With $S$ outer: $300 + \lceil 300/100\rceil \cdot 2000 = 300 + 6000 = 6300$. With $R$ outer: $2000 + \lceil 2000/100 \rceil \cdot 300 = 2000 + 6000 = 8000$. The smaller relation outside is better, by $B(R) - B(S) = 1700$ I/Os, as [[#prop-bnl]] predicts.
:::
:::

::: exercise Pipelining {level=1}
In the plan $\pi_{\text{name}}(\sigma_{\text{grade} = \text{'A'}}(E) \bowtie_{\text{hash}} S)$ with $S$ as the build input, which operators are pipelined and which are blocking? What changes if $E$ is the build input?
::: solution
The scans, the selection and the projection are pipelined. The hash join is blocking on its build input $S$ (it must read all of $S$ before producing output) and pipelined on its probe input: each selected enrolment is joined and projected as soon as it is read. If $E$ (after selection) were the build input, the join would consume all selected enrolments first and then stream $S$; this is better when the selection leaves few tuples, since the hash table is then small — as in [[#ex-inl]].
:::
:::

::: exercise Memory for a two-pass sort {level=2 check="11586"}
What is the smallest number $M$ of 8 KiB frames that sorts a 1 TiB file ($2^{27}$ pages) in two passes? (Enter $M$.)
::: solution
Two passes need $\lceil B/M\rceil \le M - 1$. With $B = 2^{27} = 134\,217\,728$: for $M = 11\,585$, $\lceil B/M\rceil = 11\,586 > 11\,584$; for $M = 11\,586$, $\lceil B/M \rceil = 11\,585 \le 11\,585$. So $M = 11\,586$ frames, about $90.5$ MiB — under a tenth of a per cent of the file, a striking illustration of the square-root rule.
:::
:::

::: exercise Hash join memory {level=2 check="102"}
The build input of a Grace hash join has $10\,000$ pages. Assuming perfectly uniform partitions, what is the smallest $M$ for which each partition fits in $M - 2$ frames? (Enter $M$.)
::: solution
We need $\lceil 10\,000/(M-1)\rceil \le M - 2$. For $M = 101$: $\lceil 10\,000/100\rceil = 100 > 99$. For $M = 102$: $\lceil 10\,000/101 \rceil = 100 \le 100$. So $M = 102$. In practice one leaves a safety margin (a "fudge factor" of $1.2$ or so for the hash table overhead and skew).
:::
:::

::: exercise Duplicate elimination by hashing {level=2}
Describe how to compute `SELECT DISTINCT dept FROM Course` on a relation of $B$ pages by hashing, and give its cost when the distinct values fit in memory and when they do not.
::: solution
If the set of distinct departments fits in memory (it surely does — there are few), scan the relation once, inserting each dept into an in-memory hash set, and output the set: $B$ I/Os. In general, partition the relation by $h(\text{dept})$ into $M - 1$ partitions ($2B$ I/Os), then read each partition and eliminate duplicates with an in-memory hash table on a second hash function ($B$ I/Os), for $3B$ in total, provided the distinct values of each partition fit in memory. Duplicate copies of a value always fall into the same partition, so each partition can be processed independently.
:::
:::

::: exercise Choosing a join {level=2}
For the running example ($B(E) = 1000$, $B(S) = 500$), at what number $M$ of frames does block nested loop with $S$ outer become as cheap as the hash join's $4500$ I/Os, and why would an optimiser still prefer block nested loop at $M = 502$?
::: solution
Block nested loop with $S$ outer costs $500 + \lceil 500/(M-2)\rceil \cdot 1000$. This is at most $4500$ when $\lceil 500/(M-2)\rceil \le 4$, i.e. $M - 2 \ge 125$, $M \ge 127$: then the cost is $500 + 4000 = 4500$. At $M = 502$ all of $S$ fits ($\lceil 500/500 \rceil = 1$): $1500$ I/Os, a third of the Grace hash join, and equal to a hybrid hash join that keeps all of $S$ in memory. With so much memory both read each input once, and the choice comes down to CPU cost.
:::
:::

::: exercise Sort-merge with duplicates {level=3}
Prove that the merge phase of [[#alg-smj]] outputs exactly the join, and show that its I/O cost is $B(R) + B(S)$ if for every value $v$ the $S$-tuples with $b = v$ fit in $M - 2$ frames. What is its worst-case cost without this assumption?
::: solution
*Correctness.* Invariant: when the merge is at positions $i$ in $R$ and $j$ in $S$, every join pair involving a tuple before $i$ or before $j$ has been output, and no other pair. Initially true. If $R[i].a < S[j].b$, no tuple at or after $j$ can match $R[i]$ (they are $\ge S[j].b$), and those before $j$ have been dealt with, so advancing $i$ keeps the invariant; symmetrically for $>$. If both equal $v$, the groups of $v$ in $R$ and $S$ are contiguous (sortedness), all pairs between them are output, and any other partner of a tuple in these groups would need key $v$ and so lies in the groups; advancing past both keeps the invariant. When one input is exhausted, no remaining tuple of the other has a partner.

*Cost.* If every $S$-group fits in $M - 2$ frames, it is read once into memory while the $R$-group streams past it through one frame, with one frame for output: each page of $R$ and $S$ is read once, $B(R) + B(S)$.

*Worst case.* If all tuples of both relations have the same key, the output is $R \times S$; with groups that do not fit, the $S$-group must be re-read for every block of the $R$-group, which is block nested loop: $B(R) + \lceil B(R)/(M-2)\rceil B(S)$.
:::
:::

::: exercise Implementing block nested loop with I/O counting {level=3}
Implement block nested-loop join over relations given as lists of pages, counting page reads, and confirm [[#prop-bnl]] for $B(R) = 7$, $B(S) = 5$ and $M = 4$ with both choices of outer relation.
::: solution
```python
from collections import defaultdict
from math import ceil

def bnl(Rpages, Spages, rk, sk, M):
    reads, out = 0, []
    block_size = M - 2                         # one frame for S, one for output
    for i in range(0, len(Rpages), block_size):
        block = Rpages[i:i + block_size]
        reads += len(block)
        table = defaultdict(list)
        for page in block:
            for r in page:
                table[r[rk]].append(r)
        for page in Spages:                    # one scan of S per block
            reads += 1
            for s in page:
                out += [r + s for r in table.get(s[sk], [])]
    return out, reads

R = [[(p * 3 + k, "r") for k in range(3)] for p in range(7)]           # keys 0..20
S = [[((p * 3 + k) * 2, "s") for k in range(3)] for p in range(5)]     # even keys 0..28
out1, n1 = bnl(R, S, 0, 0, 4)
out2, n2 = bnl(S, R, 0, 0, 4)
print(len(out1), n1, 7 + ceil(7 / 2) * 5, len(out2), n2, 5 + ceil(5 / 2) * 7)
```

```console
$ python3 bnl.py
11 27 27 11 26 26
```

Both orders find the $11$ matches (the even keys $0$–$20$) and the page counts equal the formula: $7 + 4 \cdot 5 = 27$ with $R$ outer and $5 + 3 \cdot 7 = 26$ with $S$ outer. Rounding matters with tiny blocks: the smaller relation outside saves only one page read here, not $B(R) - B(S) = 2$.
:::
:::
