Computing the running totals of an array — the **prefix sums** $y_i = x_0 + x_1 + \dots + x_i$ — looks like the most sequential computation imaginable: each total is the previous one plus one element. Yet the following OpenMP function computes the prefix sums of $4 \times 10^8$ numbers in parallel, and gets exactly the same answers as the obvious loop:

```c
/* Inclusive prefix sums of x[0..n) in place, in three phases. */
static void scan(long *x, long n) {
    int p = omp_get_max_threads();
    long *block = calloc(p + 1, sizeof *block);   /* block[t+1]: sum of block t */
    #pragma omp parallel
    {
        int t = omp_get_thread_num();
        long lo = n * t / p, hi = n * (t + 1) / p, s = 0;
        for (long i = lo; i < hi; i++) s += x[i];      /* 1: sum each block */
        block[t + 1] = s;
        #pragma omp barrier
        #pragma omp single
        for (int u = 1; u <= p; u++) block[u] += block[u - 1];  /* 2: scan p sums */
        s = block[t];                                   /* (implicit barrier above) */
        for (long i = lo; i < hi; i++) x[i] = s += x[i];   /* 3: rescan with offset */
    }
    free(block);
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -fopenmp -o scan scan.c
$ ./scanseq                                    # the obvious sequential loop
sequential 0.447 s (1199999997)
$ for p in 1 2 4 8 16 32; do OMP_NUM_THREADS=$p ./scan; done
p= 1  0.948 s  correct
p= 2  0.628 s  correct
p= 4  0.255 s  correct
p= 8  0.152 s  correct
p=16  0.116 s  correct
p=32  0.112 s  correct
```

(Observations on the $36$-core machine of this course, as of 2026.) Two things stand out. The parallel algorithm does about twice the work of the sequential one — it reads the array twice — so on one thread it is twice as slow, and on $32$ threads it is $8.5$ times faster than on one but only $4$ times faster than the sequential loop. And it stops improving at about $16$ threads because, like the array sum of [[parallel-computing/parallel-architectures]], it is limited by memory bandwidth. The trick that makes it parallel at all is associativity: the sum of the first $i$ elements can be grouped in any way ([[parallel-computing/shared-memory#thm-reduction]]).

This chapter designs parallel algorithms in the **work–span model** of [[parallel-computing/performance-laws]], where the aim is to keep the work close to that of the best sequential algorithm while making the span — the critical path — small, ideally polylogarithmic. We meet the classical **PRAM** model, and the two most important parallel primitives, **reduction** and **scan** (prefix sums), with proofs of correctness and cost; uses of scan to filter, partition and sort; parallel merging and merge sort; **sorting networks**, with Batcher's bitonic sorter proved correct by the **0-1 principle** and checked by exhaustive enumeration; and parallel breadth-first search. The algorithms are those of the classic texts — Cormen, Leiserson, Rivest and Stein; JáJá; Blelloch — and are the building blocks used by GPU libraries and parallel runtimes.

## Models of parallel computation

The work–span model describes an algorithm by its computation DAG, independent of the number of processors. An older model with the same spirit describes a synchronous machine.

::: definition The PRAM {#def-pram}
A **parallel random-access machine** (PRAM) has $p$ processors, each with private registers, sharing an unbounded memory. Computation proceeds in synchronous **steps**: in each step every processor reads one memory cell, performs one operation on its registers and writes one cell. PRAMs differ in how they handle simultaneous access to one cell:

- **EREW** (exclusive read, exclusive write): no two processors access the same cell in the same step;
- **CREW** (concurrent read, exclusive write): simultaneous reads allowed, writes exclusive;
- **CRCW** (concurrent read, concurrent write): simultaneous writes allowed, resolved by a rule — *common* (all writers must write the same value), *arbitrary* (one unspecified writer succeeds) or *priority* (the lowest-numbered writer succeeds).

The cost of a PRAM algorithm is its number of steps $T$ and its **work**, the total number of operations performed; it is **work-efficient** if its work is within a constant factor of the best sequential algorithm.
:::

The PRAM ignores communication, synchronisation and caches, which is its weakness as a model of real machines and its strength as a model of *parallelism*: if an algorithm has no parallelism on a PRAM, it has none anywhere. The models are interchangeable for our purposes. A PRAM algorithm that takes $T$ steps with work $W$ is a DAG with span $T$ and work $W$, and by Brent's theorem ([[parallel-computing/performance-laws#thm-brent]]) it runs on $p$ processors in time $O(W/p + T)$. Conversely, a fork–join algorithm can be executed level by level on a PRAM. From now on we analyse algorithms by work $W(n)$ and span $S(n)$, and call an algorithm efficient if $W(n)$ matches the sequential cost and $S(n)$ is polylogarithmic — a parallelism of $W/S$ that grows almost linearly with $n$.

The concurrent-write rules matter for the fastest algorithms. With $n^2$ processors and common CRCW writes, the maximum of $n$ numbers takes $O(1)$ steps: processor $(i, j)$ compares $x_i$ with $x_j$ and, if $x_i < x_j$, writes "not the maximum" into a flag for $i$; all writers write the same value. On an EREW PRAM the same problem needs $\Omega(\log n)$ steps. Real hardware supports concurrent writes only through atomic operations, whose cost under contention [[parallel-computing/memory-consistency]] measured.

## Reduction

::: algorithm Tree reduction {#alg-reduce}
To combine $x_0, \dots, x_{n-1}$ with an associative operator $\oplus$ (with $n$ a power of $2$, padding with the identity otherwise):

- **for** $d = 1, 2, 4, \dots, n/2$: **for all** $i$ that are multiples of $2d$ **in parallel**: $x_i \gets x_i \oplus x_{i+d}$.
- Return $x_0$.

In fork–join form: `reduce(a, lo, hi)` returns $a_{lo}$ if $hi = lo + 1$; otherwise it spawns `reduce` on the two halves and combines the results.
:::

::: proposition Cost of reduction {#prop-reduce}
Tree reduction performs $n - 1$ applications of $\oplus$ in $\log n$ rounds: work $\Theta(n)$ and span $\Theta(\log n)$. On $p$ processors it takes $O(n/p + \log p)$ time if each processor first reduces a block of $n/p$ elements sequentially.
:::

::: proof
Round $d$ performs $n/(2d)$ operations, and $\sum_{k=0}^{\log n - 1} n/2^{k+1} = n - 1$. The rounds depend on each other, but the operations within a round are independent, so the span is the number of rounds, $\log n$. Correctness: after the round with distance $d$, $x_i$ for each multiple $i$ of $2d$ holds $x_i \oplus \dots \oplus x_{i + 2d - 1}$ (by induction on the rounds, using associativity), so after the last round $x_0$ holds the whole combination. For $p$ processors: $n/p$ sequential steps per block, then a tree of $p$ partial results in $\log p$ rounds.
:::

Reduction is the parallel `fold`, and the reason OpenMP's `reduction` clause, MPI's `MPI_Reduce` and GPU reductions all exist. The span $\log n$ is optimal for any algorithm that combines $n$ inputs with a binary operator, because a binary tree with $n$ leaves has depth at least $\log n$.

## Scan

::: definition Scan {#def-scan}
For an associative operator $\oplus$ with identity $e$ and a sequence $x_0, \dots, x_{n-1}$, the **inclusive scan** is the sequence $y_i = x_0 \oplus \dots \oplus x_i$, and the **exclusive scan** (or **prescan**) is $z_0 = e$, $z_i = x_0 \oplus \dots \oplus x_{i-1}$ for $i \ge 1$. With $\oplus = +$ these are the prefix sums.
:::

The sequential scan does $n - 1$ operations with span $n - 1$. The first parallel algorithm is simple but does too much work.

::: algorithm Hillis–Steele scan {#alg-hillis-steele}
**for** $d = 1, 2, 4, \dots, < n$: **for all** $i \ge d$ **in parallel**: $x_i \gets x_{i-d} \oplus x_i$ (all reads of a round happen before its writes, which needs a second buffer).
:::

::: proposition Hillis–Steele computes the inclusive scan {#prop-hillis-steele}
After the round with distance $d$, $x_i = x^{(0)}_{\max(0, i - 2d + 1)} \oplus \dots \oplus x^{(0)}_i$, where $x^{(0)}$ is the input. Hence after $\lceil \log n \rceil$ rounds $x_i$ is the inclusive scan; the work is $\Theta(n \log n)$ and the span $\Theta(\log n)$.
:::

::: proof
By induction. Before the first round each $x_i$ is the sum of the window of length $1$ ending at $i$. Suppose before the round with distance $d$ each $x_i$ is the sum of the window of length $d$ ending at $i$ (truncated at $0$). For $i \ge d$, the new $x_i = x_{i - d} \oplus x_i$ combines the window of length $d$ ending at $i - d$ with the window of length $d$ ending at $i$, which are adjacent; by associativity the result is the window of length $2d$ ending at $i$, truncated at $0$. For $i < d$, $x_i$ already covers $x_0, \dots, x_i$ and is unchanged. After the round with $d \ge n/2$ the windows have length $\ge n$, so every $x_i$ covers $x_0, \dots, x_i$. Round $d$ does $n - d$ operations, so the work is $\sum_d (n - d) = n\lceil \log n \rceil - (n - 1)$ for $n$ a power of $2$: $\Theta(n \log n)$.
:::

The extra $\log n$ factor in work is fatal for large $n$ on few processors (Brent's bound becomes $n \log n / p$, slower than sequential once $\log n > p$). Guy Blelloch's work-efficient scan (1989, following Ladner and Fischer, 1980) builds a tree of partial sums and then sweeps prefixes down it.

::: algorithm Blelloch's work-efficient scan {#alg-blelloch}
For $n$ a power of $2$, computing the exclusive scan in place:

1. **Up-sweep** (a reduction that keeps its partial results): **for** $d = 1, 2, \dots, n/2$: **for all** $i = 2d - 1, 4d - 1, \dots$ **in parallel**: $x_i \gets x_{i - d} \oplus x_i$.
2. Set $x_{n-1} \gets e$.
3. **Down-sweep**: **for** $d = n/2, n/4, \dots, 1$: **for all** $i = 2d - 1, 4d - 1, \dots$ **in parallel**: $t \gets x_{i-d}$; $x_{i-d} \gets x_i$; $x_i \gets t \oplus x_i$.
:::

Think of the array as a complete binary tree whose leaves are the elements. After the up-sweep, for every $d$, position $2dk + 2d - 1$ holds the sum of the block of $2d$ leaves ending there, and position $2dk + d - 1$ the sum of that block's left half. The down-sweep sends to each node the sum of all leaves *to the left of its subtree*: a node passes its own value to its left child (whose left context is the same) and its value plus the left child's sum to its right child.

::: example Tracing Blelloch's scan {#ex-blelloch}
Compute the exclusive prefix sums of $3, 1, 7, 0, 4, 1, 6, 3$, showing the array after every round.
::: solution
```python
def blelloch_scan(a):
    """Exclusive prefix sums of a (length a power of 2), as rounds of parallel steps."""
    x, n = list(a), len(a)
    d = 1
    while d < n:                                  # up-sweep: partial sums in a tree
        for i in range(2 * d - 1, n, 2 * d):      # all i in one round run in parallel
            x[i] += x[i - d]
        print("up   d=%d:" % d, x)
        d *= 2
    x[n - 1] = 0                                  # the identity at the root
    d = n // 2
    while d >= 1:                                 # down-sweep: push prefixes down
        for i in range(2 * d - 1, n, 2 * d):
            x[i - d], x[i] = x[i], x[i] + x[i - d]   # left gets parent; right gets parent + left
        print("down d=%d:" % d, x)
        d //= 2
    return x

print(blelloch_scan([3, 1, 7, 0, 4, 1, 6, 3]))
```

```console
$ python3 blelloch.py
up   d=1: [3, 4, 7, 7, 4, 5, 6, 9]
up   d=2: [3, 4, 7, 11, 4, 5, 6, 14]
up   d=4: [3, 4, 7, 11, 4, 5, 6, 25]
down d=4: [3, 4, 7, 0, 4, 5, 6, 11]
down d=2: [3, 0, 7, 4, 4, 11, 6, 16]
down d=1: [0, 3, 4, 11, 11, 15, 16, 22]
[0, 3, 4, 11, 11, 15, 16, 22]
```

After the up-sweep, position $7$ holds the total $25$, position $3$ the sum of the first half ($11$) and position $5$ the sum of $x_4, x_5$ ($5$). At the root the left context is $0$. In the round $d = 4$, the left child (position $3$) receives the root's context $0$ and the right child (position $7$) receives $0 + 11 = 11$, the sum of everything left of the second half. The last round delivers each leaf its exclusive prefix. A loop in the same file checked the function against `sum(v[:i])` on $1200$ random arrays of lengths $1$ to $64$. Each round's iterations touch disjoint positions, so they can run in parallel without races, on an EREW PRAM.
:::
:::

::: theorem Blelloch's scan is correct and work-efficient {#thm-blelloch}
[[#alg-blelloch]] computes the exclusive scan with $2(n - 1)$ applications of $\oplus$ in $2\log n$ rounds: work $\Theta(n)$ and span $\Theta(\log n)$.
:::

::: proof
Index the nodes of the complete binary tree over the leaves $0, \dots, n - 1$: a node at height $h$ covers the block $B = [2^h k, 2^h(k + 1))$ and is stored at position $r(B) = 2^h(k+1) - 1$, the block's last index; its left child covers the first half of $B$ and is stored at $r(B) - 2^{h-1}$, its right child at $r(B)$ itself.

*Up-sweep.* By induction on the rounds, after the round with distance $d = 2^{h-1}$, position $r(B)$ of every block of height $h$ holds $\Sigma(B)$, the $\oplus$-combination of the input elements in $B$, and positions not of the form $r(B')$ for some higher block are unchanged since they were last written. (The round computes $x_{r(B)} \gets x_{r(B) - d} \oplus x_{r(B)}$, combining the sums of the two halves.)

*Down-sweep.* Let $\lambda(B)$ be the combination of all input elements to the left of $B$ (the exclusive prefix at $B$'s first leaf). Claim: after the down-sweep round that processes height $h$ (the round with distance $2^{h-1}$, for $h \ge 1$), and also immediately before the first round for $h = \log n$, every block $B$ of height $h - 1$ has $x_{r(B)} = \lambda(B)$. Initially (step 2) the root block has $x_{n-1} = e = \lambda(\text{root})$. In the round for a block $B$ of height $h$ with $x_{r(B)} = \lambda(B)$, and with its left child's position $r(B) - d$ still holding $\Sigma(\text{left half})$ from the up-sweep, the round sets the left child to $\lambda(B)$ — correct, since nothing lies between $B$'s left edge and its left half — and the right child to $\lambda(B) \oplus \Sigma(\text{left half})$, which is the combination of everything left of the right half. After the last round, every leaf $i$ holds $\lambda(\{i\}) = x_0 \oplus \dots \oplus x_{i-1}$.

*Cost.* Each sweep performs $n/2 + n/4 + \dots + 1 = n - 1$ operations in $\log n$ rounds.
:::

On $p$ processors the blocked version of the opening program is better still: each processor scans its block sequentially, a scan of the $p$ block totals provides each block's offset, and each processor adds its offset — work $2n + O(p)$ and time $O(n/p + p)$, or $O(n/p + \log p)$ if the middle phase uses a tree. The opening experiment is that algorithm, with a sequential middle phase.

::: widget plot
f: x*log2(x)/p + log2(x); 2*x/p + 2*log2(x); x
x: 2, 4096
y: 0, 4096
sliders: p=8:1:64:1
labels: \text{Hillis–Steele } n\log n/p + \log n; \text{Blelloch } 2n/p + 2\log n; \text{sequential } n
caption: Estimated time on $p$ processors, by Brent's bound $W/p + S$, for a scan of $n$ elements: Hillis–Steele (work $n\log n$), Blelloch (work $2n$) and the sequential loop (work $n$, span $n$). With $p = 8$, Hillis–Steele beats the sequential loop only while $\log n < 8$, and loses badly beyond; Blelloch is about $p/2$ times faster than sequential for all large $n$. Increase $p$ to $64$: the extra factor $\log n$ now matters less, which is why GPUs, with thousands of lanes, sometimes use Hillis–Steele for short scans within a block.
:::

### What scan is good for

Scan is the most useful parallel primitive after map and reduce, because it turns many apparently sequential loops into parallel ones. A few examples, each with work $O(n)$ and span $O(\log n)$:

- **Pack (filter)**: to keep the elements of $x$ for which a predicate holds, compute the flags $f_i \in \{0, 1\}$, take their exclusive scan $z$, and in parallel write $x_i$ to output position $z_i$ whenever $f_i = 1$. The scan assigns each kept element its index in the output.
- **Split (partition)**: to move all elements with flag $0$ before those with flag $1$, preserving order within each group, pack the $0$s and pack the $1$s after them. A split on each bit, from least significant to most, is a parallel **radix sort** ([[#ex-split]]).
- **Segmented scan**: scan independently within segments marked by flags, by scanning pairs (flag, value) under an associative operator that resets at segment boundaries. It parallelises nested loops of irregular sizes, such as sparse matrix–vector products.
- **Recurrences**: $x_i = a_i x_{i-1} + b_i$ is a scan over the composition of affine maps $x \mapsto a x + b$, which is associative — the same idea as the generator jump-ahead of [[parallel-computing/performance-laws#ex-lcg-jump]]. **Carry-lookahead addition** is a scan of carry-propagation states, which is why adders in hardware take $O(\log n)$ gate delays rather than $O(n)$ ([Electrical Engineering Atlas](/learn/ee/)).

::: example Partitioning with a scan {#ex-split}
Split the keys $5, 2, 7, 4, 1, 6, 3, 0$ by their lowest bit, putting even keys first, using exclusive scans.
::: solution
Flags $f_i = $ lowest bit: $1, 0, 1, 0, 1, 0, 1, 0$. For the even keys use $g_i = 1 - f_i$: $0, 1, 0, 1, 0, 1, 0, 1$, with exclusive scan $0, 0, 1, 1, 2, 2, 3, 3$ and total $4$. The odd keys' exclusive scan of $f$ is $0, 1, 1, 2, 2, 3, 3, 4$; they go after the $4$ even keys. So key $x_i$ goes to position $\text{scan}(g)_i$ if it is even and $4 + \text{scan}(f)_i$ if it is odd:

| $i$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
|---|---|---|---|---|---|---|---|---|
| $x_i$ | $5$ | $2$ | $7$ | $4$ | $1$ | $6$ | $3$ | $0$ |
| destination | $4$ | $0$ | $5$ | $1$ | $6$ | $2$ | $7$ | $3$ |

The result is $2, 4, 6, 0, 5, 7, 1, 3$: evens then odds, each group in its original order (the split is **stable**). Splitting again on bit $1$ and then bit $2$ sorts the keys — three passes for $3$-bit keys, $b$ passes for $b$-bit keys, each of work $O(n)$ and span $O(\log n)$. GPU sorting libraries use exactly this, with several bits per pass.
:::
:::

::: quiz
Which of the following can be computed by one scan with an associative operator, in $O(\log n)$ span?
- [x] The running maximum $\max(x_0, \dots, x_i)$ for every $i$.
- [x] For a string of parentheses, the nesting depth at every position.
- [x] The values $x_i = 2x_{i-1} + c_i$ for all $i$, given $x_{-1}$.
- [ ] The values $x_i = x_{i-1}^2 + c_i \pmod m$ for all $i$, given $x_{-1}$.
::: solution
$\max$ is associative. Nesting depth is the prefix sum of $+1$ for `(` and $-1$ for `)`. The affine recurrence is a scan over the composition of maps $x \mapsto 2x + c_i$: the composition of two affine maps is affine, so each partial result is a pair $(a, b)$ of constant size. The quadratic recurrence is also a composition of maps, but compositions of quadratics have growing degree, so the partial results do not have constant size and no constant-cost associative combination is known — that is why such generators are sequential.
:::
:::

## Sorting

### Parallel merge sort

Merge sort is the natural divide-and-conquer sort, and its two recursive calls can run in parallel. As [[parallel-computing/shared-memory]] measured, that is not enough: with a sequential merge, the span satisfies $S(n) = S(n/2) + \Theta(n) = \Theta(n)$ and the parallelism is only $\Theta(\log n)$. The merge must be parallel too.

::: algorithm Parallel merge {#alg-pmerge}
To merge sorted arrays $A$ and $B$ into $C$ (with $\lvert A\rvert \ge \lvert B\rvert$; swap them otherwise):

1. If $A$ is empty, return. Let $m = \lfloor \lvert A\rvert / 2 \rfloor$ and $x = A[m]$.
2. Find by binary search the position $q$ in $B$ such that $B[0..q) < x \le B[q..)$.
3. Place $x$ at $C[m + q]$.
4. **In parallel**, merge $A[0..m)$ with $B[0..q)$ into $C[0..m+q)$, and $A[m+1..)$ with $B[q..)$ into $C[m+q+1..)$.
:::

::: example A parallel merge, call by call {#ex-pmerge}
Merge $A = (1, 4, 6, 9, 12)$ and $B = (2, 3, 10)$ with [[#alg-pmerge]], listing every call.
::: solution
Each row is one call; the depth is its level of recursion, and calls at the same depth run in parallel. "Place" gives the value $x$ and its output position $m + q$ (offset by the start of the call's output range).

| depth | larger array | smaller array | $x$ | $q$ | place at |
|---|---|---|---|---|---|
| $0$ | $(1, 4, 6, 9, 12)$ | $(2, 3, 10)$ | $6$ | $2$ | $C[4]$ |
| $1$ | $(1, 4)$ | $(2, 3)$ | $4$ | $2$ | $C[3]$ |
| $1$ | $(9, 12)$ | $(10)$ | $12$ | $1$ | $C[7]$ |
| $2$ | $(2, 3)$ | $(1)$ | $3$ | $1$ | $C[2]$ |
| $2$ | $(9)$ | $(10)$ | $9$ | $0$ | $C[5]$ |
| $3$ | $(2)$ | $(1)$ | $2$ | $1$ | $C[1]$ |
| $3$ | $(10)$ | $()$ | $10$ | $0$ | $C[6]$ |
| $4$ | $(1)$ | $()$ | $1$ | $0$ | $C[0]$ |

The result is $C = (1, 2, 3, 4, 6, 9, 10, 12)$, as a Python implementation (with `bisect_left` for the binary search) confirms. A call whose second array is longer first swaps the two: the left call at depth $2$ received $(1)$ and $(2, 3)$, and the call at depth $4$ received $(\,)$ and $(1)$; with equal lengths the first array counts as the larger. There are $5$ levels for $8$ elements, and each call does one binary search: the $O(\log n)$ levels of $O(\log n)$ work each are the $O(\log^2 n)$ span of [[#thm-pmerge]].
:::
:::

::: theorem Cost of parallel merge and merge sort {#thm-pmerge}
Parallel merge of $n$ elements in total has span $\Theta(\log^2 n)$ and work $\Theta(n)$. Merge sort with parallel merge has work $\Theta(n \log n)$ and span $\Theta(\log^3 n)$, so its parallelism is $\Theta(n/\log^2 n)$.
:::

::: proof
*Correctness.* Every element of $A[0..m)$ and $B[0..q)$ is at most $x$ (the former because $A$ is sorted, the latter by the choice of $q$), and every element of $A[m+1..)$ and $B[q..)$ is at least $x$; and exactly $m + q$ elements precede $x$. So placing $x$ at $m + q$ and merging the two pairs independently produces the sorted merge, by induction on $n$.

*Span.* Since $\lvert A\rvert \ge \lvert B\rvert$, $\lvert A\rvert \ge n/2$. Each recursive call receives at most half of $A$ plus all of $B$: at most $\lvert A\rvert/2 + \lvert B\rvert = n - \lvert A\rvert/2 \le n - n/4 = 3n/4$ elements. The binary search costs $O(\log n)$, so $S(n) \le S(3n/4) + O(\log n)$, which unrolls over $O(\log n)$ levels of $O(\log n)$ each: $S(n) = O(\log^2 n)$. (It is $\Theta(\log^2 n)$ in the worst case.)

*Work.* The work satisfies $W(n) = W(\alpha n) + W((1 - \alpha)n) + O(\log n)$ with $1/4 \le \alpha \le 3/4$, plus the placement of one element per call. There are at most $n$ calls that place an element, each doing $O(\log n)$ work, which gives $O(n \log n)$ immediately; the sharper bound $\Theta(n)$ follows by the substitution $W(n) \le cn - d\log n$ (Cormen et al., §27.3).

*Merge sort.* Work $W(n) = 2W(n/2) + \Theta(n) = \Theta(n \log n)$. Span $S(n) = S(n/2) + \Theta(\log^2 n)$, and $\sum_{k=0}^{\log n} (\log n - k)^2 = \Theta(\log^3 n)$.
:::

Richard Cole (1988) gave a merge sort with span $O(\log n)$ on an EREW PRAM and work $O(n \log n)$ — optimal on both counts, but with constants too large for practice. Practical parallel sorts on multicores use sample sort: choose $p - 1$ splitters from a random sample, route each element to its bucket (a split, computed with scans), and sort the buckets independently.

### Sorting networks

A **comparator** takes two keys on wires $i < j$ and outputs the smaller on wire $i$ and the larger on wire $j$. A **comparator network** is a fixed sequence of comparators, grouped into **rounds** in which no wire is used twice; its **depth** is the number of rounds and its **size** the number of comparators. Because the sequence of comparisons does not depend on the data, a sorting network is ideal for SIMD units, GPUs and hardware: every round is one vector operation, with no branches.

How can we know that a network sorts? Testing all $n!$ orderings is hopeless beyond tiny $n$. Donald Knuth's **0-1 principle** reduces the question to $2^n$ binary inputs.

::: lemma Comparator networks commute with monotone functions {#lem-monotone}
If $f$ is a non-decreasing function and a comparator network maps the input $a = (a_1, \dots, a_n)$ to $b$, then it maps $f(a) = (f(a_1), \dots, f(a_n))$ to $f(b)$.
:::

::: proof
For one comparator: since $f$ is non-decreasing, $\min(f(x), f(y)) = f(\min(x, y))$ and $\max(f(x), f(y)) = f(\max(x, y))$. A network is a composition of comparators, so the claim follows by induction on the number of comparators.
:::

::: theorem The 0-1 principle {#thm-zero-one}
If a comparator network sorts every input sequence of $0$s and $1$s, it sorts every input sequence of keys from any totally ordered set.
:::

::: proof
Suppose the network fails to sort some input $a$: the output $b$ has positions $i < j$ with $b_i > b_j$. Define $f(x) = 1$ if $x \ge b_i$ and $f(x) = 0$ otherwise; $f$ is non-decreasing. By [[#lem-monotone]], on the 0-1 input $f(a)$ the network outputs $f(b)$, which has $f(b_i) = 1$ at position $i$ and $f(b_j) = 0$ at position $j > i$ (because $b_j < b_i$). So the network fails to sort the 0-1 input $f(a)$, contradicting the hypothesis.
:::

Kenneth Batcher's **bitonic sorter** (1968) is built from one simple network.

::: definition Bitonic sequences and the half-cleaner {#def-bitonic}
A sequence is **bitonic** if it first increases and then decreases, or is a cyclic rotation of such a sequence; a 0-1 sequence is bitonic exactly when it has the form $0^a 1^b 0^c$ or $1^a 0^b 1^c$. The **half-cleaner** on $n = 2m$ wires compares wire $i$ with wire $i + m$ for $i = 0, \dots, m - 1$, in one round.
:::

::: lemma The half-cleaner halves a bitonic sequence {#lem-half-cleaner}
If the input to a half-cleaner is a bitonic 0-1 sequence, then both halves of the output are bitonic, every element of the lower half is at most every element of the upper half, and at least one half is **clean** (all $0$s or all $1$s).
:::

::: proof
Let the output be $L_i = \min(s_i, s_{i+m})$ and $H_i = \max(s_i, s_{i+m})$. Take first the form $s = 0^a 1^b 0^c$, whose $1$s occupy an interval of length $b$.

If $b \le m$, positions $i$ and $i + m$ are $m$ apart, so they cannot both lie in an interval of length $b \le m$: at most one of $s_i, s_{i+m}$ is $1$. Hence $L$ is all $0$s — clean — and $H_i = s_i \lor s_{i+m}$. The map $i \mapsto i \bmod m$ folds the interval of $1$s, of length at most $m$, onto a cyclic interval of positions modulo $m$, so $H$ is a cyclic interval of $1$s: bitonic. Every element of $L$ ($0$) is at most every element of $H$.

If $b > m$, the $0$s number $a + c < m$, and the same argument applied to the complement (swapping the roles of $0$ and $1$, and of $\min$ and $\max$) shows that $H$ is all $1$s and $L$ is bitonic; again $L \le H$ elementwise across halves.

The form $1^a 0^b 1^c$ is the complement of the first form, and complementing exchanges $L$ and $H$ and the two values, so the same conclusions hold.
:::

::: algorithm Bitonic sort (Batcher, 1968) {#alg-bitonic}
For $n = 2^k$:

- **Bitonic merge** of a bitonic sequence of length $n$: apply a half-cleaner, then bitonic-merge each half recursively (in parallel). Depth $\log n$.
- **Bitonic sort** of an arbitrary sequence of length $n$: bitonic-sort the first half ascending and the second half descending (in parallel), so that their concatenation is bitonic, then bitonic-merge it.
:::

::: theorem Bitonic sort is a sorting network {#thm-bitonic}
Bitonic sort of $n = 2^k$ keys sorts every input, with depth $\frac{1}{2}\log n\,(\log n + 1)$ and $\frac{n}{4}\log n\,(\log n + 1)$ comparators.
:::

::: proof
By [[#thm-zero-one]] it suffices to consider 0-1 inputs. *The merger sorts bitonic 0-1 sequences*, by induction on $n$: for $n = 1$ there is nothing to do; for $n \ge 2$, by [[#lem-half-cleaner]] the half-cleaner leaves two bitonic halves, with the lower half elementwise at most the upper; the recursive mergers sort each half; and since one half is clean and every lower element is at most every upper element, the concatenation is sorted. *The sorter sorts*, by induction: the two halves are sorted in opposite directions, so the concatenation of an ascending and a descending 0-1 sequence is of the form $0^a 1^b 0^c$ — bitonic — and the merger sorts it. (The descending sorter is the ascending one with every comparator reversed.)

*Depth.* The merger of size $n$ has depth $\log n$, so the sorter satisfies $D(n) = D(n/2) + \log n$ with $D(1) = 0$, giving $D(n) = \sum_{j=1}^{\log n} j = \frac{1}{2}\log n(\log n + 1)$. Every round has $n/2$ comparators, so the size is $\frac{n}{2} D(n)$.
:::

::: example Checking the bitonic network by exhaustive search {#ex-bitonic-check}
Build bitonic sorting networks for $n = 2, 4, 8, 16$, count their depth and size, and verify them on all $2^n$ 0-1 inputs and on $10^4$ random real inputs. Then remove one comparator from the $n = 8$ network and let the 0-1 principle find an input it fails on.
::: solution
In the standard in-place formulation, the comparator between wires $i$ and $i \oplus j$ (bitwise exclusive or) in the merge of blocks of size $k$ sorts ascending if bit $k$ of $i$ is $0$ and descending otherwise:

```python
from itertools import product
import random

def bitonic_network(n):
    """Comparators (i, j) with i < j, in rounds, that sort n = 2^k keys ascending."""
    rounds, k = [], 2
    while k <= n:                       # merge bitonic blocks of size k
        j = k // 2
        while j >= 1:                   # half-cleaners of span j
            rnd = []
            for i in range(n):
                partner = i ^ j
                if partner > i:
                    up = (i & k) == 0       # direction of this block
                    rnd.append((i, partner) if up else (partner, i))  # (min goes to, max goes to)
            rounds.append(rnd)
            j //= 2
        k *= 2
    return rounds

def apply(rounds, a):
    a = list(a)
    for rnd in rounds:
        for lo, hi in rnd:              # put the smaller key at position lo
            if a[lo] > a[hi]:
                a[lo], a[hi] = a[hi], a[lo]
    return a

for n in (2, 4, 8, 16):
    net = bitonic_network(n)
    size = sum(len(r) for r in net)
    ok01 = all(apply(net, v) == sorted(v) for v in product((0, 1), repeat=n))
    okrand = all(apply(net, v) == sorted(v)
                 for v in ([random.random() for _ in range(n)] for _ in range(10000)))
    print(f"n={n:2}  depth {len(net):2}  comparators {size:3}  all 0-1 inputs: {ok01}  random: {okrand}")

broken = bitonic_network(8)
broken[-1] = broken[-1][1:]             # remove one comparator of the last round
bad = [v for v in product((0, 1), repeat=8) if apply(broken, v) != sorted(v)]
print(len(bad), "of 256 0-1 inputs fail, e.g.", bad[0], "->", apply(broken, bad[0]))
```

```console
$ python3 bitonic.py
n= 2  depth  1  comparators   1  all 0-1 inputs: True  random: True
n= 4  depth  3  comparators   6  all 0-1 inputs: True  random: True
n= 8  depth  6  comparators  24  all 0-1 inputs: True  random: True
n=16  depth 10  comparators  80  all 0-1 inputs: True  random: True
4 of 256 0-1 inputs fail, e.g. (1, 1, 1, 1, 0, 1, 1, 1) -> [1, 0, 1, 1, 1, 1, 1, 1]
```

Depths $1, 3, 6, 10$ and sizes $1, 6, 24, 80$ agree with [[#thm-bitonic]]: $\frac{1}{2} \cdot 4 \cdot 5 = 10$ and $\frac{16}{4} \cdot 4 \cdot 5 = 80$ for $n = 16$. By the 0-1 principle, the $65{,}536$ binary tests for $n = 16$ *prove* that this network sorts all inputs, whereas the $10^4$ random tests are only evidence (there are $16! \approx 2 \times 10^{13}$ orderings). The damaged network fails on just $4$ of $256$ binary inputs, which the exhaustive check finds at once and random testing might miss.
:::
:::

Bitonic sort does $\Theta(n \log^2 n)$ comparisons, more than the $\Theta(n \log n)$ of merge sort, but its regularity makes it a favourite for small sorts in SIMD registers and GPU thread blocks. The **AKS network** (Ajtai, Komlós and Szemerédi, 1983) has depth $O(\log n)$, but with constants so large that it is of theoretical interest only.

## Graph algorithms

Graph algorithms are harder to parallelise because their structure depends on the data. The basic method is **level-synchronous breadth-first search**: process the whole frontier of the search at once.

::: algorithm Level-synchronous BFS {#alg-pbfs}
Given $G = (V, E)$ and a source $s$: set $\text{dist}(s) = 0$ and $F = \{s\}$. **While** $F \ne \emptyset$, for the current level $\ell$:

1. **For all** $u \in F$ and all edges $(u, v)$ **in parallel**: if $v$ is unvisited, try to claim it — atomically set $\text{parent}(v) \gets u$ if it is still unset (a CAS, or an arbitrary-CRCW write).
2. Let $F'$ be the set of vertices claimed in this level (computed by a pack, with scans), set their distance to $\ell + 1$, and set $F \gets F'$.
:::

Each vertex enters the frontier once and each edge is examined at most twice, so the work is $O(n + m)$, as for sequential BFS ([[algorithms]]); each level costs $O(\log n)$ span for the pack, so the span is $O(D \log n)$, where $D$ is the graph's diameter (the number of levels). The parallelism is high for graphs with small diameter — social networks and web graphs, whose diameter is often below $20$ — and low for long, thin graphs such as road networks, where other methods (such as $\Delta$-stepping for shortest paths) are used. The **direction-optimising** BFS of Beamer, Asanović and Patterson (2012) switches, when the frontier is large, to having each *unvisited* vertex look for a parent in the frontier, which examines far fewer edges.

::: widget graph
nodes: S@0,2; A@1,3; B@1,2; C@1,1; D@2,3.5; E@2,2.5; F@2,1.5; G@2,0.5; H@3,3; I@3,1
edges: S-A; S-B; S-C; A-D; A-E; B-E; B-F; C-F; C-G; D-H; E-H; F-I; G-I
algorithm: bfs
start: S
caption: Breadth-first search from $S$, which a level-synchronous algorithm runs one level per parallel round. Step through and notice the levels: $\{S\}$, then $\{A, B, C\}$, then $\{D, E, F, G\}$, then $\{H, I\}$ — four rounds for ten vertices. In round $2$, vertex $E$ is reachable from both $A$ and $B$ and $F$ from both $B$ and $C$: in parallel, both would try to claim it, and an atomic compare-and-swap decides which becomes the parent. Any choice gives a correct BFS tree.
:::

Other classical parallel graph techniques include **pointer jumping** for computing the depth of every node in a forest or the rank of every element of a linked list in $O(\log n)$ rounds ([[#ex-pointer-jumping]]), **tree contraction** for evaluating expression trees, and connected components by **label propagation** or by the hooking-and-shortcutting algorithm of Shiloach and Vishkin (1982).

::: warning Polylogarithmic span is not the whole story
An algorithm with span $O(\log n)$ but work $\Theta(n \log n)$, where the sequential algorithm does $\Theta(n)$, will lose to the sequential algorithm on any realistic number of processors once $n$ is large — the Hillis–Steele scan is the standard example. Conversely, the opening scan has span $\Theta(n/p + p)$, not polylogarithmic at all, and is the best choice on a multicore. Judge a parallel algorithm first by its work (is it within a small constant of the best sequential algorithm?), then by whether its parallelism $W/S$ comfortably exceeds the number of processors you have, and finally by what the model ignores: memory traffic (the opening scan is bandwidth-bound), synchronisation per round (each PRAM step is a barrier on a real machine) and load balance.
:::

::: history
Parallel prefix computation was studied for adder circuits in the 1960s; Richard Ladner and Michael Fischer's "Parallel prefix computation" (1980) gave the general construction, and Peter Kogge and Harold Stone (1973) the recurrence-solving version. Steven Fortune and James Wyllie defined the PRAM in 1978, and Wyllie's thesis (1979) introduced pointer jumping. Daniel Hillis and Guy Steele's "Data parallel algorithms" (1986) popularised scan on the Connection Machine, and Guy Blelloch's "Scans as primitive parallel operations" (1989) and *Vector Models for Data-Parallel Computing* (1990) made it a programming primitive. Kenneth Batcher described the odd–even merge and bitonic sorting networks at the 1968 AFIPS Spring Joint Computer Conference; Donald Knuth stated the 0-1 principle in *The Art of Computer Programming*, volume 3 (1973). Miklós Ajtai, János Komlós and Endre Szemerédi's $O(\log n)$-depth sorting network appeared in 1983, and Richard Cole's optimal parallel merge sort in 1988. Joseph JáJá's *An Introduction to Parallel Algorithms* (1992) is the standard PRAM text.
:::

## Where this leads

[[parallel-computing/gpu-programming]] implements reduction and scan on a GPU, where thousands of threads execute the rounds of this chapter almost literally, in lock-step, and where sorting networks sort within a thread block. [[parallel-computing/message-passing]] implements reduction, broadcast and all-to-all exchange between the nodes of a cluster, where each round costs a message and the cost model must include communication. [[parallel-computing/performance-engineering]] returns to the bandwidth limit that stopped the opening scan. Parallel complexity classes — $\mathsf{NC}$, the problems with polylogarithmic span and polynomial work, and the $\mathsf{P}$-complete problems believed to be inherently sequential — are part of [[complexity]].

::: summary
- The **PRAM** ([[#def-pram]]) and the work–span model are interchangeable for analysing parallelism; aim for **work-efficient** algorithms (work as sequential) with polylogarithmic span, and use Brent's theorem to get $O(W/p + S)$ on $p$ processors.
- **Reduction** has work $n - 1$ and span $\log n$ ([[#prop-reduce]]). **Scan**: Hillis–Steele has span $\log n$ but work $\Theta(n \log n)$ ([[#prop-hillis-steele]]); Blelloch's up-sweep/down-sweep is work-efficient, $2(n-1)$ operations in $2\log n$ rounds ([[#thm-blelloch]], [[#ex-blelloch]]). On a multicore, the blocked three-phase scan reached a speed-up of $4$ over the sequential loop, limited by memory bandwidth.
- Scan implements pack, split, radix sort ([[#ex-split]]), segmented operations and linear recurrences.
- **Parallel merge** has span $\Theta(\log^2 n)$, giving merge sort span $\Theta(\log^3 n)$ and parallelism $\Theta(n/\log^2 n)$ ([[#thm-pmerge]]).
- The **0-1 principle** ([[#thm-zero-one]]) reduces verifying a sorting network to $2^n$ binary inputs; **bitonic sort** has depth $\frac12\log n(\log n+1)$ and $\frac{n}{4}\log n(\log n+1)$ comparators ([[#thm-bitonic]]), verified exhaustively for $n = 16$ ([[#ex-bitonic-check]]).
- **Level-synchronous BFS** has work $O(n + m)$ and span $O(D \log n)$ ([[#alg-pbfs]]); it parallelises well on graphs of small diameter.
:::

## Exercises

::: exercise Work of Hillis–Steele {level=1 check="49"}
How many applications of $\oplus$ does the Hillis–Steele scan ([[#alg-hillis-steele]]) perform on $n = 16$ elements? (Enter the number.)
::: solution
The rounds have $d = 1, 2, 4, 8$ and perform $n - d$ operations each: $15 + 14 + 12 + 8 = 49$, against $15$ for the sequential scan and $2 \times 15 = 30$ for Blelloch's. The formula $n\log n - (n - 1) = 64 - 15 = 49$ agrees.
:::
:::

::: exercise Work of Blelloch's scan {level=1 check="30"}
How many applications of $\oplus$ does Blelloch's scan perform on $n = 16$ elements? (Enter the number.) How many rounds?
::: solution
The up-sweep performs $8 + 4 + 2 + 1 = 15$ operations and the down-sweep the same $15$, for a total of $2(n - 1) = 30$, in $2\log n = 8$ rounds (the step setting the root to $e$ is not an application of $\oplus$).
:::
:::

::: exercise Size of a bitonic sorter {level=1 check="240"}
How many comparators does the bitonic sorter for $n = 32$ keys have? (Enter the number.) What is its depth?
::: solution
By [[#thm-bitonic]], depth $\frac{1}{2}\cdot 5 \cdot 6 = 15$ and size $\frac{32}{2} \times 15 = 240$. An optimal-size network for $32$ keys is not known; the best known have about $185$ comparators, but bitonic's regular structure is what makes it attractive for hardware.
:::
:::

::: exercise Pack with a scan {level=2}
Use an exclusive scan to pack the positive elements of $x = (-2, 5, 0, 3, -1, 8, 4, -7)$ into a new array, preserving their order. Give the flags, the scan, the destination of each kept element and the result, and state the work and span for $n$ elements.
::: solution
Flags $f = (0, 1, 0, 1, 0, 1, 1, 0)$; exclusive scan $z = (0, 0, 1, 1, 2, 2, 3, 4)$, with total $4$ (the output length, $z_7 + f_7$). Each $x_i$ with $f_i = 1$ goes to position $z_i$: $5 \to 0$, $3 \to 1$, $8 \to 2$, $4 \to 3$. Result $(5, 3, 8, 4)$. The flags and the writes are maps (work $n$, span $1$); the scan has work $O(n)$ and span $O(\log n)$; so the pack has work $O(n)$ and span $O(\log n)$, with no race since the destinations are distinct.
:::
:::

::: exercise Scanning a recurrence {level=2 check="29"}
The recurrence $x_i = a_i x_{i-1} + b_i$ can be computed by a scan over pairs $(a, b)$, representing the map $x \mapsto ax + b$. Give the associative operator that composes two such maps (first $(a_1, b_1)$, then $(a_2, b_2)$), prove that it is associative, and use it to compute $x_3$ from $x_{-1} = 1$ with $(a_i, b_i) = (2, 1), (3, 0), (1, 4), (2, 3)$ for $i = 0, 1, 2, 3$. (Enter $x_3$.)
::: solution
Applying $(a_1, b_1)$ and then $(a_2, b_2)$ gives $x \mapsto a_2(a_1 x + b_1) + b_2 = (a_2 a_1)x + (a_2 b_1 + b_2)$, so define $(a_1, b_1) \otimes (a_2, b_2) = (a_2 a_1,\ a_2 b_1 + b_2)$. It is associative because it is composition of functions, which is associative: $((f \otimes g) \otimes h)$ and $(f \otimes (g \otimes h))$ both represent "apply $f$, then $g$, then $h$". (Checking algebraically: both sides equal $(a_3a_2a_1,\ a_3a_2b_1 + a_3b_2 + b_3)$.) The identity is $(1, 0)$. Combining the four maps in order: $(2, 1) \otimes (3, 0) = (6, 3)$; $\otimes (1, 4) = (6, 7)$; $\otimes (2, 3) = (12, 17)$. So $x_3 = 12 \cdot 1 + 17 = 29$.

Check by direct evaluation: $x_0 = 2 \cdot 1 + 1 = 3$, $x_1 = 3 \cdot 3 + 0 = 9$, $x_2 = 9 + 4 = 13$, $x_3 = 2 \cdot 13 + 3 = 29$. Both give $29$.
:::
:::

::: exercise Brent's bound for a scan {level=2 check="2*(2^20 - 1)/64 + 40"}
Using Brent's bound $W/p + S$ with Blelloch's scan ([[#thm-blelloch]]), estimate the number of steps to scan $n = 2^{20}$ elements on $p = 64$ processors. (Enter the bound.) Compare with the sequential $n - 1$ steps and with the blocked three-phase scan.
::: solution
$W = 2(n - 1) = 2(2^{20} - 1)$ and $S = 2\log n = 40$, so the bound is $2(2^{20} - 1)/64 + 40 \approx 32{,}808$ steps, a speed-up of about $32$ over the sequential $1{,}048{,}575$ — half of $p$, because the algorithm does twice the work. The blocked scan does about $2n/p$ steps in its two parallel phases plus $p$ (or $\log p$) for the middle one: about $32{,}768 + 64$, essentially the same, with far fewer synchronisation rounds (two barriers instead of $40$), which is why it is preferred on a multicore.
:::
:::

::: exercise Pointer jumping {#ex-pointer-jumping level=3}
A linked list of $n$ nodes is stored in an array: `next[i]` is the successor of node $i$ (the last node points to itself). **List ranking** asks for each node's distance from the end. Wyllie's algorithm sets `rank[i]` $= 0$ for the last node and $1$ otherwise, and then, $\lceil \log n \rceil$ times, **for all** $i$ **in parallel**: `rank[i]` $\gets$ `rank[i]` $+$ `rank[next[i]]`; `next[i]` $\gets$ `next[next[i]]` (each round reading the old values). Prove that it computes the ranks, give its work and span, and trace it on the list $3 \to 0 \to 4 \to 1 \to 2$.
::: solution
*Invariant.* After round $r$, `next[i]` is the node $2^r$ steps after $i$ (or the last node, if fewer remain), and `rank[i]` is the number of links from $i$ to `next[i]`. Initially ($r = 0$) `next[i]` is one step on and `rank[i]` is $1$, or $0$ for the last node, which points to itself. In a round, the new `next[i]` $=$ `next[next[i]]` is $2^r + 2^r = 2^{r+1}$ steps on (capped at the end, since the last node points to itself), and the new rank adds the links from `next[i]` to `next[next[i]]`, which is exactly `rank[next[i]]`. After $\lceil \log n \rceil$ rounds, $2^r \ge n$, so every `next[i]` is the last node and `rank[i]` is the distance to it. Each round does $\Theta(n)$ work with span $O(1)$, so the work is $\Theta(n \log n)$ and the span $\Theta(\log n)$ — not work-efficient; randomised and deterministic work-efficient list ranking algorithms (by sparse ruling sets or independent-set removal) do $O(n)$ work.

*Trace.* Nodes in list order $3, 0, 4, 1, 2$: `next` $= [4, 2, 2, 0, 1]$ for nodes $0..4$, and `rank` $= [1, 1, 0, 1, 1]$.

| round | `rank` (nodes $0..4$) | `next` (nodes $0..4$) |
|---|---|---|
| $0$ | $1, 1, 0, 1, 1$ | $4, 2, 2, 0, 1$ |
| $1$ | $2, 1, 0, 2, 2$ | $1, 2, 2, 4, 2$ |
| $2$ | $3, 1, 0, 4, 2$ | $2, 2, 2, 2, 2$ |
| $3$ | $3, 1, 0, 4, 2$ | $2, 2, 2, 2, 2$ |

Node $3$ is $4$ links from the end, node $0$ is $3$, node $4$ is $2$, node $1$ is $1$ and node $2$ is $0$: correct. ($\lceil \log 5 \rceil = 3$ rounds are performed; the last changes nothing here.)
:::
:::

::: exercise Odd–even transposition sort {level=3}
**Odd–even transposition sort** on $n$ wires alternates two kinds of rounds: in odd rounds, compare wires $(0, 1), (2, 3), \dots$; in even rounds, $(1, 2), (3, 4), \dots$. Prove with the 0-1 principle that $n$ rounds sort any input. (Hint: follow the rightmost $1$s.)
::: solution
By [[#thm-zero-one]] consider a 0-1 input with $k$ ones, numbered $1, \dots, k$ from the right; the $j$-th one belongs at position $n - j$. Two observations. (i) If a one moves right in some round, from position $q$ to $q + 1$, then in the next round the pair $(q + 1, q + 2)$ is compared, because consecutive rounds use pairs of opposite parity; so it is again compared with its right neighbour. (ii) A one never moves left past another one, so the ones keep their order.

*Claim:* from round $j + 1$ on, the $j$-th one moves right in every round until it reaches position $n - j$. For $j = 1$: everything to the right of the rightmost one is $0$, and it is compared with its right neighbour in round $1$ or round $2$, so it starts moving by round $2$, and by (i) it then moves every round until it reaches the last position. For $j > 1$, assume the claim for $j - 1$. The $j$-th one is compared with its right neighbour in round $j$ or $j + 1$ (rounds alternate); it fails to move only if that neighbour is the $(j-1)$-th one. But from round $j$ on, the $(j-1)$-th one moves right every round until it is home, so once the $j$-th one has been compared with a $0$ on its right it is never again directly behind it, except when the $(j-1)$-th one has reached position $n - j + 1$, which means the $j$-th one is home. Hence the $j$-th one moves every round from round $j + 1$ (at the latest) until it reaches $n - j$.

It starts at a position $\ge k - j$ (there are $k - j$ ones to its left), so it has at most $n - j - (k - j) \le n - j$ steps to make and is home by round $j + (n - j) = n$. After $n$ rounds every one is home, so the input is sorted. An exhaustive check of all 0-1 inputs for $n \le 12$ confirms it. The network has depth $n$ and about $n^2/2$ comparators: inefficient, but it needs only neighbour communication, so it is the natural sort on a linear array of processors and the basis of the parallel sorts in [[parallel-computing/message-passing]].
:::
:::
