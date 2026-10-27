Mergesort sorts $n$ items with about $n\log n$ comparisons, and randomised quicksort with about $1.39\,n\log n$ on average. Decades of effort have produced cleverer sorting algorithms, but none that sorts by comparisons in $o(n\log n)$ time. That is not for want of trying: it is a theorem. Any algorithm that learns about its input only by comparing pairs of elements must, in the worst case, make at least $\log_2(n!) \approx n\log n - 1.44n$ comparisons. And yet a post office sorts millions of letters by postcode in linear time, and so can a computer sorting integers: by looking *inside* the keys rather than comparing them, counting sort and radix sort escape the lower bound.

This chapter has three parts. First we prove the **comparison lower bound** using decision trees — one of the few places in computer science where we can show that a problem cannot be solved faster, by any algorithm at all. Then we study the **non-comparison sorts**, counting sort and radix sort, and see exactly which assumption of the lower bound they break. Finally we turn to **selection**: finding the $k$-th smallest element, such as the median, which can be done in linear time — by a simple randomised algorithm in expectation, and by the ingenious "median of medians" deterministically. We use the partition of [[algorithms/divide-and-conquer#lem-partition]] and the recurrences of [[algorithms/correctness-recurrences]].

## The comparison model and decision trees

::: definition Comparison sort {#def-comparison-sort}
A **comparison sort** is a sorting algorithm that gains information about the input keys only by comparing pairs of them: tests $a_i \le a_j$ (or $<$, $=$, $\ge$, $>$) whose outcomes determine what it does next. It may move keys around freely, but it may not inspect their values — their digits, their bits, or their use as array indices.
:::

Insertion sort, mergesort, quicksort and heapsort are comparison sorts; they work unchanged for any totally ordered type, from integers to strings to dates. To reason about all comparison sorts at once, we model one as a tree.

::: definition Decision tree {#def-decision-tree}
Fix $n$. The **decision tree** of a comparison sort on inputs of size $n$ is a binary tree in which each internal node is labelled by a comparison $i:j$ (meaning "is $a_i \le a_j$?"), with the left subtree followed when the answer is yes and the right subtree when it is no, and each leaf is labelled by a permutation $\pi$ of $\{1, \dots, n\}$, meaning that the algorithm outputs $\langle a_{\pi(1)}, \dots, a_{\pi(n)}\rangle$. An execution on an input is a path from the root to a leaf; the number of comparisons it makes is the length of the path.
:::

The tree exists because a comparison sort is deterministic: on inputs of size $n$, its first comparison is always the same, its second depends only on the first answer, and so on. Other work — moving elements, updating indices — is invisible in the tree; we are counting comparisons only, which is a lower bound on running time.

::: widget graph
nodes: 1?2@4,3; 2?3@2,2; 1?3@6,2; 123@1,1; 1?3'@3,1; 213@5,1; 2?3'@7,1; 132@2.5,0; 312@3.5,0; 231@6.5,0; 321@7.5,0
edges: 1?2>2?3; 1?2>1?3; 2?3>123; 2?3>1?3'; 1?3>213; 1?3>2?3'; 1?3'>132; 1?3'>312; 2?3'>231; 2?3'>321
algorithm: bfs
start: 1?2
caption: The decision tree of insertion sort on three keys $a_1, a_2, a_3$. Each internal node $i?j$ compares $a_i$ with $a_j$ (left branch: $a_i \le a_j$); each leaf lists the input positions in sorted order, so leaf $312$ means $a_3 \le a_1 \le a_2$. There are $3! = 6$ leaves, one per order, and the longest path makes $3$ comparisons. Step through breadth-first search to visit the tree level by level: no binary tree of height $2$ has room for $6$ leaves.
:::

## The lower bound

::: lemma Leaves and height {#lem-leaves}
A binary tree of height $h$ (the number of edges on its longest root-to-leaf path) has at most $2^h$ leaves.
:::

::: proof
By induction on $h$. A tree of height $0$ is a single leaf. A tree of height $h \ge 1$ has a root with at most two subtrees, each of height at most $h - 1$, so by the hypothesis each has at most $2^{h-1}$ leaves, and the tree at most $2 \cdot 2^{h-1} = 2^h$.
:::

::: theorem The comparison lower bound {#thm-sort-lower}
Every comparison sort makes at least $\lceil\log_2(n!)\rceil$ comparisons in the worst case on inputs of size $n$, and $\log_2(n!) = n\log n - n\log e + O(\log n) = \Theta(n\log n)$. Hence every comparison sort has worst-case running time $\Omega(n\log n)$.
:::

::: proof
Consider inputs that are the $n!$ permutations of $\langle 1, 2, \dots, n\rangle$. A correct algorithm must produce a different output permutation $\pi$ for each of them (the $\pi$ that sorts one input sorts no other, since the keys are distinct). So the decision tree has at least $n!$ *reachable* leaves. If its height is $h$, then $n! \le 2^h$ by [[#lem-leaves]], so $h \ge \log_2(n!)$, and since $h$ is an integer, $h \ge \lceil\log_2(n!)\rceil$. The height is the worst-case number of comparisons.

For the size of $\log_2(n!)$: the upper bound $n! \le n^n$ gives $\log_2(n!) \le n\log n$. For a lower bound, the largest $n/2$ factors of $n!$ are each at least $n/2$, so $n! \ge (n/2)^{n/2}$ and $\log_2(n!) \ge \frac n2\log\frac n2 = \frac12 n\log n - \frac n2$, which is $\Omega(n\log n)$. The sharper form follows from Stirling's formula $n! = \sqrt{2\pi n}\,(n/e)^n(1 + O(1/n))$.
:::

::: widget plot
f: log(gamma(x + 1))/log(2); x*log(x)/log(2); x*log(x)/log(2) - 1.4427*x
x: 1, 64
labels: \log_2 n!; n\log_2 n; n\log_2 n - n\log_2 e
points: 5,6.91; 12,28.84; 32,117.66; 64,296.0
caption: The information-theoretic lower bound $\log_2 n!$ (dots: exact values) against $n\log_2 n$ and Stirling's approximation $n\log_2 n - n\log_2 e$. The approximation is excellent already for small $n$ (the missing term is $\frac12\log_2(2\pi n)$), and the bound grows like $n\log n$: a comparison sort cannot do better than mergesort by more than a lower-order term.
:::

The argument counts *information*: each comparison has two outcomes and so can at best halve the set of orders still consistent with what the algorithm has seen; starting from $n!$ possibilities, at least $\log_2(n!)$ halvings are needed to reach one. Mergesort's worst case, $n\lceil\log n\rceil - 2^{\lceil\log n\rceil} + 1$ comparisons, exceeds this bound by less than $0.53\,n$ for every $n$, so mergesort is **asymptotically optimal** among comparison sorts — as is heapsort.

::: example Lower bounds for small n {#ex-small-n}
Compute the lower bound $\lceil\log_2 n!\rceil$ for $n = 3, 4, 5, 10, 12$ and compare it with mergesort's worst case.
::: solution
```python
import math
for n in [3, 4, 5, 10, 12]:
    bound = math.ceil(math.log2(math.factorial(n)))
    k = math.ceil(math.log2(n))
    print(n, bound, n * k - 2**k + 1)     # lower bound, mergesort worst case
```

```console
$ python3 lower.py
3 3 3
4 5 5
5 7 8
10 22 25
12 29 33
```

For $n = 3$ and $4$ mergesort meets the bound. For $n = 5$, $\lceil\log_2 120\rceil = 7$, and mergesort needs $8$ in the worst case; a cleverer method, *merge insertion* (Ford and Johnson, 1959), sorts $5$ elements in $7$ comparisons and meets the bound for all $n \le 11$. For $n = 12$ the bound is $29$, but an exhaustive computer search (Wells, 1965) showed that $30$ comparisons are needed: the information-theoretic bound is not always achievable.
:::
:::

The same counting gives a lower bound for the *average* case. With all $n!$ inputs equally likely, the average number of comparisons is the average depth of the $n!$ leaves, and a binary tree with $N$ leaves has average leaf depth at least $\log_2 N$ (a balanced tree minimises total depth; see [[#ex-average-lower]]). So even on average, comparison sorts need $\log_2(n!)$ comparisons, and randomised algorithms cannot beat the bound either: a randomised algorithm is a probability distribution over decision trees, each of which has average depth at least $\log_2(n!)$.

::: warning What the lower bound does not say
The bound is about the **comparison model**. It does not say that sorting always takes $\Omega(n\log n)$ time: integers in a known range can be sorted in linear time, as the next section shows, because their values can be used as array indices. It also does not say that every comparison sort is $\Theta(n\log n)$ (insertion sort is not), or that a comparison sort cannot be faster on *particular* inputs (insertion sort is linear on sorted input). And it bounds comparisons, not other costs such as moves or cache misses. Claims of "a sort faster than $n\log n$" are usually either non-comparison sorts or best-case statements.
:::

The decision-tree method gives other lower bounds too. Searching a sorted array for one of $n$ keys has $n + 1$ possible outcomes (one of $n$ positions, or "absent"), so needs $\lceil\log_2(n+1)\rceil$ comparisons: binary search is optimal. Merging two sorted lists of length $n$ has $\binom{2n}{n}$ possible interleavings, and $\log_2\binom{2n}{n} = 2n - O(\log n)$. For *finding the maximum*, though, the tree bound $\log_2 n$ is far too weak; an **adversary argument**, [[#ex-max-lower]], gives the correct $n - 1$.

::: quiz
A sorting algorithm claims to sort any $n$ distinct numbers using at most $n\log_2 n - 2n$ comparisons for large $n$, and uses only comparisons. Is this possible?

- [x] No: $\log_2(n!) \approx n\log_2 n - 1.44n$ exceeds $n\log_2 n - 2n$.
- [ ] Yes: the lower bound is only $\Omega(n\log n)$, and this is $\Theta(n\log n)$.
- [ ] Yes, if the algorithm is randomised.
- [ ] Only if the numbers are integers.
::: solution
The bound is not just asymptotic: every comparison sort needs at least $\log_2(n!) = n\log_2 n - n\log_2 e + O(\log n)$ comparisons in the worst case, and $\log_2 e \approx 1.443 < 2$. For large $n$, $n\log_2 n - 2n$ is smaller, so no comparison sort can achieve it — randomised or not, and whatever the keys are, as long as it only compares them.
:::
:::

## Sorting in linear time

If keys are integers in a small range, we can avoid comparisons altogether.

### Counting sort

::: algorithm Counting sort {#alg-counting-sort}
Input: a list $A$ of $n$ items whose keys are integers in $\{0, 1, \dots, k-1\}$.

1. Let $C[0..k-1]$ be zero, and for each item increment $C[\mathrm{key}]$: now $C[v]$ is the number of items with key $v$.
2. Replace $C$ by its **exclusive prefix sums**: $C[v] \gets \sum_{u<v}(\text{number of items with key } u)$, the index of the first output position for key $v$.
3. For each item $x$ of $A$, *from left to right*: put $x$ in $B[C[\mathrm{key}(x)]]$ and increment $C[\mathrm{key}(x)]$.
4. Return $B$.
:::

```python
def counting_sort(a, k, key=lambda x: x):
    """Stable sort of a by integer keys in range(k)."""
    count = [0] * k
    for x in a:                        # count each key
        count[key(x)] += 1
    total = 0
    for v in range(k):                 # count[v] = first output slot for key v
        count[v], total = total, total + count[v]
    out = [None] * len(a)
    for x in a:                        # left to right keeps equal keys in order
        out[count[key(x)]] = x
        count[key(x)] += 1
    return out

def radix_sort(a, digits, base=10):
    """LSD radix sort of non-negative integers with at most `digits` digits."""
    for d in range(digits):
        a = counting_sort(a, base, key=lambda x: (x // base**d) % base)
        print(d, a)
    return a

print(counting_sort([2, 5, 3, 0, 2, 3, 0, 3], 6))
radix_sort([329, 457, 657, 839, 436, 720, 355], 3)
```

```console
$ python3 count.py
[0, 0, 2, 2, 3, 3, 3, 5]
0 [720, 355, 436, 457, 657, 329, 839]
1 [720, 329, 436, 839, 355, 457, 657]
2 [329, 355, 436, 457, 657, 720, 839]
```

::: definition Stable sort {#def-stable}
A sorting algorithm is **stable** if items with equal keys appear in the output in the same relative order as in the input.
:::

::: theorem Counting sort {#thm-counting-sort}
[[#alg-counting-sort]] is a stable sort and runs in $\Theta(n + k)$ time and space.
:::

::: proof
After step 2, the positions $C[v], C[v] + 1, \dots, C[v] + c_v - 1$ (where $c_v$ is the number of items with key $v$) form a block, the blocks are in increasing order of $v$, and together they fill $0..n-1$ exactly. In step 3, the $j$-th item with key $v$ encountered (counting from the left, $j = 0, 1, \dots$) is placed in position $C[v] + j$ of its block, because $C[v]$ has been incremented once for each earlier item with key $v$. So the output lists all keys in increasing order (sorted), and within a key in input order (stable). Steps 1 and 3 take $\Theta(n)$ time, step 2 $\Theta(k)$, and the arrays use $\Theta(n + k)$ space.
:::

Counting sort is linear when $k = O(n)$. It breaks the lower bound because step 3 uses a key as an *array index*: a single operation that, in effect, chooses among $k$ outcomes rather than two.

### Radix sort

Counting sort alone is useless for 64-bit keys ($k = 2^{64}$). **Radix sort** sorts by one digit at a time, using a stable sort for each digit — and it starts with the *least significant* digit, which is the counter-intuitive part.

::: algorithm LSD radix sort {#alg-radix}
To sort $n$ integers of $d$ digits in base $r$: for $i = 0, 1, \dots, d - 1$ (least significant digit first), sort the list stably by digit $i$, using counting sort with $k = r$.
:::

::: theorem Radix sort {#thm-radix}
LSD radix sort correctly sorts $n$ non-negative integers of at most $d$ base-$r$ digits in $\Theta(d(n + r))$ time.
:::

::: proof
*Invariant:* after the pass for digit $i$, the list is sorted by the number formed by the digits $0..i$ (the key modulo $r^{i+1}$). After pass $0$ it is sorted by digit $0$. Suppose it is sorted by digits $0..i-1$ and we sort stably by digit $i$. Take two items $x, y$ with $x \bmod r^{i+1} < y \bmod r^{i+1}$. If their digits $i$ differ, the digit-$i$ sort puts $x$ first. If their digits $i$ are equal, then $x \bmod r^{i} < y \bmod r^{i}$, so $x$ was before $y$ before the pass, and stability keeps it there. So after the pass the list is sorted by digits $0..i$. After the last pass it is sorted by all $d$ digits, which is the value. Each pass is a counting sort with $k = r$, costing $\Theta(n + r)$.
:::

Without stability the argument breaks at "stability keeps it there", and the passes would undo each other.

::: example Tracing radix sort {#ex-radix-trace}
Follow LSD radix sort on $\langle 329, 457, 657, 839, 436, 720, 355\rangle$ in base $10$ (the second listing above), and check the invariant after each pass.
::: solution
| after pass | list | sorted by |
|---|---|---|
| digit 0 (units) | 720, 355, 436, 457, 657, 329, 839 | last digit: 0, 5, 6, 7, 7, 9, 9 |
| digit 1 (tens) | 720, 329, 436, 839, 355, 457, 657 | last two digits: 20, 29, 36, 39, 55, 57, 57 |
| digit 2 (hundreds) | 329, 355, 436, 457, 657, 720, 839 | all three digits |

Look at $457$ and $657$: after pass $0$ they are in input order (both end in $7$). Pass $1$ keeps them in that order because both have tens digit $5$ and counting sort is stable. In pass $2$ their hundreds digits differ ($4 < 6$), so that pass alone decides their order. In pass $1$, $329$ jumps ahead of $436$ because $2 < 3$, even though it came after $436$ in the previous order — the earlier order only matters for ties.
:::
:::


::: example Choosing the radix {#ex-radix}
How should one sort $n = 10^6$ unsigned 32-bit integers with radix sort, and how does that compare with $n\log_2 n$ comparisons?
::: solution
With digits of $b$ bits, $r = 2^b$ and $d = \lceil 32/b\rceil$, and the cost is about $d(n + r)$ basic steps:

| $b$ | $r$ | passes $d$ | $d(n + r)$ |
|---|---|---|---|
| 1 | 2 | 32 | $3.2 \times 10^7$ |
| 8 | 256 | 4 | $4.0 \times 10^6$ |
| 16 | 65 536 | 2 | $2.13 \times 10^6$ |
| 32 | $4.3 \times 10^9$ | 1 | $4.3 \times 10^9$ |

In general $b \approx \log_2 n$ minimises $\lceil 32/b\rceil(n + 2^b)$, giving $\Theta(32n/\log n)$; here $b = 16$ (two passes) is best in this count, and $b = 8$ (four passes over a table of $256$ counters that fits in the cache) is a common practical choice. A comparison sort needs about $n\log_2 n \approx 2 \times 10^7$ comparisons — five to ten times as many steps, though each pass of radix sort also moves all the data, so measured speed-ups are smaller and depend on the machine.
:::
:::

**Bucket sort** is a third linear-time method, for keys spread uniformly over an interval: split the interval into $n$ equal buckets, drop each key into its bucket, sort each bucket by insertion sort and concatenate. If the keys are independent and uniform, the expected cost is $\Theta(n)$ (the expected sum of squared bucket sizes is $2n - 1$; see [[algorithms/randomised-algorithms]]), but adversarial inputs that land in one bucket cost $\Theta(n^2)$.

## Selection

The **selection problem**: given $n$ keys and an integer $1 \le k \le n$, find the $k$-th smallest, the key of **rank** $k$. The minimum is rank $1$, the maximum rank $n$, and the **median** rank $\lceil n/2\rceil$ (the lower median). Sorting solves selection in $O(n\log n)$, but sorting does far more than needed. Can we select in linear time?

### Randomised selection

Partition around a random pivot, as in quicksort, but recurse into only *one* side: the side that contains rank $k$.

::: algorithm Quickselect {#alg-quickselect}
To find the element of rank $k$ in a list $A$:

1. Choose a pivot $x$ uniformly at random from $A$.
2. Split $A$ into $S = \{a < x\}$, $E = \{a = x\}$ and $G = \{a > x\}$.
3. If $k \le \lvert S\rvert$, return the element of rank $k$ in $S$; if $k \le \lvert S\rvert + \lvert E\rvert$, return $x$; otherwise return the element of rank $k - \lvert S\rvert - \lvert E\rvert$ in $G$.
:::

Correctness is by strong induction on $n$: every element of $S$ is smaller than every element of $E$, which is smaller than every element of $G$, so ranks $1..\lvert S\rvert$ are in $S$, the next $\lvert E\rvert$ ranks are $x$, and the rest are in $G$ with their ranks shifted; the recursive calls are on strictly shorter lists because $x \in E$.

::: theorem Quickselect runs in expected linear time {#thm-quickselect}
On any input of $n$ keys and any $k$, quickselect makes at most $8n$ comparisons in expectation (counting one comparison of each element with the pivot per call; a sharper analysis gives $4n$); its expected running time is $O(n)$.
:::

::: proof
Call a pivot **good** for a list of $m$ elements if at least $m/4$ elements of the list are $\le$ it and at least $m/4$ are $\ge$ it; at least half the elements in sorted order (the middle half) are good, so a random pivot is good with probability at least $1/2$. After a good pivot, the recursive call — on $S$ or on $G$ — is on at most $3m/4$ elements.

Say the algorithm is in **phase** $j$ while the current list has size $m$ with $(3/4)^{j+1}n < m \le (3/4)^jn$. A call in phase $j$ costs at most $(3/4)^jn$ comparisons, and a good pivot ends the phase. Each call has a good pivot with probability at least $1/2$, independently of the past, so the number of calls $N_j$ made in phase $j$ satisfies $\Prob(N_j \ge t) \le (1/2)^{t-1}$, giving $\E[N_j] \le \sum_{t\ge1}(1/2)^{t-1} = 2$. Hence the expected number of comparisons is at most
$$
\sum_{j\ge0}\E[N_j]\Big(\frac34\Big)^jn \le 2n\sum_{j \ge 0}\Big(\frac34\Big)^j = 2n \cdot 4 = 8n.
$$
That is an expected $O(n)$ bound with constant $8$. A sharper bound, $4n$, comes from analysing the recurrence directly: with $\E[C(m)] \le m + \frac1m\sum_{i=1}^m\E[C(\max(i - 1, m - i))]$ (the worst side for every pivot rank $i$), substitution with $\E[C(m)] \le 4m$ goes through because $\frac1m\sum_{i}\max(i-1, m-i) \le \frac{3m}{4}$, giving $m + 4 \cdot \frac{3m}4 = 4m$.
:::

The constant $8$ from the phase argument is loose but the argument is robust and reusable; the substitution gives $4n$, and the exact expectation for the median is about $3.39n$ (Knuth). Like quicksort, quickselect has a $\Theta(n^2)$ worst case, with probability tiny for large $n$.

### Deterministic selection: the median of medians

Can we guarantee a good pivot without randomness? Blum, Floyd, Pratt, Rivest and Tarjan (1973) showed how: choose as the pivot a *median of medians of small groups*, found by recursion.

::: algorithm Median-of-medians select {#alg-mom}
To find the element of rank $k$ in a list $A$ of $n$ elements:

1. If $n \le 5$, sort $A$ and return its $k$-th element.
2. Divide $A$ into $\lceil n/5\rceil$ groups of $5$ (the last possibly smaller) and find the median of each group by sorting it.
3. Recursively find the median $x$ of the $\lceil n/5\rceil$ group medians.
4. Partition $A$ around $x$ into $S$, $E$, $G$ as in [[#alg-quickselect]] and continue in the one part that contains rank $k$, recursively.
:::

::: lemma The pivot is good {#lem-mom-pivot}
In [[#alg-mom]], at least $\frac{3n}{10} - 6$ elements of $A$ are $\ge x$, and at least $\frac{3n}{10} - 6$ are $\le x$. Hence the recursive call in step 4 is on at most $\frac{7n}{10} + 6$ elements.
:::

::: proof
At least half of the $g = \lceil n/5\rceil$ group medians are $\ge x$, since $x$ is their median: at least $\lceil g/2\rceil$ groups have median $\ge x$. Each such group, except possibly the last (short) group and the group of $x$ itself, contains at least $3$ elements $\ge x$: its median and the two larger elements. So at least
$$
3\Big(\Big\lceil\frac g2\Big\rceil - 2\Big) \ge \frac{3n}{10} - 6
$$
elements are $\ge x$. The same holds for $\le x$. The part $S$ consists of elements $< x$, so it excludes the at least $\frac{3n}{10} - 6$ elements $\ge x$: $\lvert S\rvert \le \frac{7n}{10} + 6$, and similarly for $G$.
:::

::: theorem Linear-time selection {#thm-mom}
[[#alg-mom]] runs in $O(n)$ time in the worst case.
:::

::: proof
Steps 1, 2 and the partition in step 4 take $O(n)$ time: at most $an$ for some constant $a$ (sorting a group of $5$ takes constant time). Step 3 recurses on $\lceil n/5\rceil$ elements and step 4 on at most $7n/10 + 6$. So, for $n$ above some threshold,
$$
T(n) \le T(\lceil n/5\rceil) + T(7n/10 + 6) + an,
$$
with $T$ non-decreasing. We show $T(n) \le cn$ by substitution. For $n \ge 140$, using $\lceil n/5\rceil \le n/5 + 1$,
$$
T(n) \le c\Big(\frac n5 + 1\Big) + c\Big(\frac{7n}{10} + 6\Big) + an = cn + \Big(-\frac{cn}{10} + 7c + an\Big),
$$
and the bracket is $\le 0$ when $c(n/10 - 7) \ge an$. For $n \ge 140$, $n/10 - 7 \ge n/20$, so $c \ge 20a$ suffices; choose $c$ also large enough that $T(n) \le cn$ for all $n < 140$. The induction is valid because both recursive arguments are smaller than $n$ when $n \ge 140$.
:::

The key is that the two subproblem sizes add up to less than $n$: $\frac15 + \frac7{10} = \frac9{10} < 1$, so the level costs of the recursion tree shrink geometrically. With groups of $3$ the fractions would be $\frac13 + \frac23 = 1$, giving $\Theta(n\log n)$; with groups of $7$ the algorithm is also linear. The constant is large (the algorithm makes up to about $24n$ comparisons), so in practice quickselect, or **introselect** (quickselect that falls back to median of medians if it makes too little progress), is used. C++'s `std::nth_element` is typically implemented as introselect.

```python
import random

def quickselect(a, k):
    """Return the k-th smallest element of a (k = 1 is the minimum)."""
    pivot = random.choice(a)
    smaller = [x for x in a if x < pivot]
    equal = [x for x in a if x == pivot]
    if k <= len(smaller):
        return quickselect(smaller, k)
    if k <= len(smaller) + len(equal):
        return pivot
    larger = [x for x in a if x > pivot]
    return quickselect(larger, k - len(smaller) - len(equal))

def mom_select(a, k):
    """Deterministic selection by the median of medians (Blum et al.)."""
    if len(a) <= 5:
        return sorted(a)[k - 1]
    groups = [sorted(a[i:i + 5]) for i in range(0, len(a), 5)]
    medians = [g[(len(g) - 1) // 2] for g in groups]
    pivot = mom_select(medians, (len(medians) + 1) // 2)
    smaller = [x for x in a if x < pivot]
    equal = [x for x in a if x == pivot]
    if k <= len(smaller):
        return mom_select(smaller, k)
    if k <= len(smaller) + len(equal):
        return pivot
    larger = [x for x in a if x > pivot]
    return mom_select(larger, k - len(smaller) - len(equal))

random.seed(5)
data = [random.randint(0, 999) for _ in range(1001)]
print(quickselect(data, 501), mom_select(data, 501), sorted(data)[500])
```

```console
$ python3 select.py
488 488 488
```

Both functions use a three-way split, so they are correct with repeated keys; the median of $1001$ random integers agrees with sorting.

::: example Median of medians by hand {#ex-mom}
Find the pivot that [[#alg-mom]] chooses for the $15$ numbers $\langle 12, 3, 17, 8, 34, 25, 1, 9, 30, 22, 5, 14, 19, 27, 2\rangle$, and how many elements it is guaranteed to discard.
::: solution
The groups and their sorted forms are $\langle 3, 8, \mathbf{12}, 17, 34\rangle$, $\langle 1, 9, \mathbf{22}, 25, 30\rangle$ and $\langle 2, 5, \mathbf{14}, 19, 27\rangle$, with medians $12$, $22$, $14$. Their median is $x = 14$. Elements $\ge 14$ include $14, 19, 27$ (its own group), $22, 25, 30$ (the group with median $22 \ge 14$) and $17, 34$: indeed $17, 19, 22, 25, 27, 30, 34$ and $14$, eight elements. Elements $\le 14$: $1, 2, 3, 5, 8, 9, 12, 14$, also eight. In sorted order $14$ has rank $8$ — it is the exact median here. The lemma's guarantee, $3n/10 - 6 = -1.5$, is useless for such small $n$; it is an asymptotic statement, and for small lists the algorithm sorts.
:::
:::

::: quiz
Why does [[#alg-mom]] use groups of $5$ rather than groups of $3$?

- [ ] Groups of $3$ do not have a median.
- [x] With groups of $3$ the two recursive calls have sizes about $n/3$ and $2n/3$, which sum to $n$, so the recursion costs $\Theta(n\log n)$.
- [ ] Groups of $3$ make the pivot worse than a random one.
- [ ] Sorting groups of $3$ takes more comparisons per element.
::: solution
With groups of $3$, at least about $2 \cdot \frac12 \cdot \frac n3 = \frac n3$ elements are guaranteed on each side, so the recursive selection is on up to $\frac{2n}3$ elements, while finding the median of medians recurses on $\frac n3$. The recurrence $T(n) = T(n/3) + T(2n/3) + \Theta(n)$ has every recursion-tree level costing $\Theta(n)$ and solves to $\Theta(n\log n)$ (as in [[algorithms/correctness-recurrences]]). Groups of $5$ make the fractions sum to $9/10$.
:::
:::

::: history
The decision-tree lower bound for sorting is folklore of the 1950s; Lester Ford and Selmer Johnson's 1959 paper on merge insertion already discussed the information-theoretic bound $\lceil\log_2 n!\rceil$, and Knuth's *The Art of Computer Programming*, volume 3, *Sorting and Searching* (1973), set out the theory of minimum-comparison sorting. Radix sorting is older than computers: Herman Hollerith's tabulating machines for the 1890 United States census sorted punched cards one column at a time, and card sorters were operated least-significant-digit first, exactly as in [[#alg-radix]]; Harold Seward described counting sort and radix sort for electronic computers in a 1954 MIT thesis. Hoare's 1961 *FIND* (Algorithm 65 in *Communications of the ACM*) is quickselect. Linear-time deterministic selection was published by Manuel Blum, Robert Floyd, Vaughan Pratt, Ronald Rivest and Robert Tarjan in "Time bounds for selection" (1973) — four of the five authors later received the Turing Award.
:::

## Where this leads

Lower-bound arguments return in [[algorithms/randomised-algorithms]] and are the subject of [[complexity]], which asks which problems need exponential time. Radix-style tricks underlie hashing ([[algorithms/randomised-algorithms]]) and integer data structures. Selection is a building block: quicksort with a median pivot has a guaranteed $O(n\log n)$ worst case, and many geometric and statistical algorithms need medians or quantiles. The heap, which gives heapsort and the priority queues of [[algorithms/shortest-paths]] and [[algorithms/greedy-algorithms]], is a comparison-based structure subject to the same lower bound: a priority queue cannot support both insertion and extract-min in $o(\log n)$ comparisons each, or it would sort faster than $n\log n$.

::: summary
- In the **comparison model** an algorithm is a **decision tree**; it needs at least $n!$ leaves to sort, so its height — the worst-case number of comparisons — is at least $\lceil\log_2(n!)\rceil = n\log n - 1.44n + O(\log n)$ ([[#thm-sort-lower]]). Mergesort and heapsort are asymptotically optimal.
- The bound also holds on average and for randomised comparison sorts, but not outside the comparison model.
- **Counting sort** sorts integer keys in $\{0, \dots, k-1\}$ stably in $\Theta(n + k)$ ([[#thm-counting-sort]]); **radix sort** applies a stable sort digit by digit, least significant first, in $\Theta(d(n + r))$ ([[#thm-radix]]).
- **Quickselect** finds the $k$-th smallest element in expected $O(n)$ time ([[#thm-quickselect]]).
- The **median of medians** guarantees a pivot with $\ge 3n/10 - 6$ elements on each side ([[#lem-mom-pivot]]), giving worst-case linear selection ([[#thm-mom]]) because $\frac15 + \frac7{10} < 1$.
:::

## Exercises

::: exercise The bound for six keys {level=1 check="10"}
What is the lower bound $\lceil\log_2 n!\rceil$ on the worst-case number of comparisons to sort $n = 6$ keys? (Enter the number.)
::: solution
$6! = 720$, and $2^9 = 512 < 720 \le 1024 = 2^{10}$, so $\lceil\log_2 720\rceil = 10$. Merge insertion sorts $6$ keys in $10$ comparisons, so the bound is achieved; mergesort needs $6 \cdot 3 - 8 + 1 = 11$.
:::
:::

::: exercise Counting sort by hand {level=1}
Run counting sort on the keys $\langle 1, 0, 3, 1, 3, 1\rangle$ with $k = 4$, showing $C$ after steps 1 and 2 and the final output. Label the three $1$s as $1_a, 1_b, 1_c$ and check stability.
::: solution
After step 1, $C = [1, 3, 0, 2]$. After step 2 (exclusive prefix sums), $C = [0, 1, 4, 4]$. Step 3: $1_a \to B[1]$ ($C[1] = 2$), $0 \to B[0]$, $3 \to B[4]$, $1_b \to B[2]$, $3 \to B[5]$, $1_c \to B[3]$. Output: $\langle 0, 1_a, 1_b, 1_c, 3, 3\rangle$ — the $1$s keep their input order, so the sort is stable.
:::
:::

::: exercise Is it stable? {level=1}
Which of insertion sort, mergesort (with `<=` in the merge), Lomuto quicksort and selection sort (swap the minimum of the unsorted part into place) are stable? Give a two- or three-element counterexample for each that is not.
::: solution
Insertion sort is stable: an element only moves past *strictly* larger elements. Mergesort is stable because ties are taken from the left. Lomuto quicksort is not: on $\langle 2_a, 2_b, 1\rangle$ the pivot $1$ is swapped with $2_a$, giving $\langle 1, 2_b, 2_a\rangle$ after the first partition, and the recursive call on $\langle 2_b, 2_a\rangle$ keeps that order (it swaps each element with itself, then the pivot with itself). Selection sort is not: on $\langle 2_a, 2_b, 1\rangle$ the first step swaps $2_a$ with $1$, giving $\langle 1, 2_b, 2_a\rangle$.
:::
:::

::: exercise Finding the maximum {#ex-max-lower level=2 check="99"}
Show that every comparison-based algorithm that finds the maximum of $n$ distinct keys makes at least $n - 1$ comparisons in the worst case, and that $n - 1$ suffice. How many are needed for $n = 100$? (Enter the number.)
::: solution
*Sufficiency:* scan the list keeping the largest so far — one comparison per element after the first. *Necessity:* each comparison has one loser (the smaller key). Suppose the algorithm stops after fewer than $n - 1$ comparisons and announces $m$. Then some key $y \ne m$ has never lost a comparison. Change the input by making $y$ larger than every other key, keeping the relative order of all the other keys; every comparison involving $y$ was won by $y$ and still is, and every other comparison is unchanged, so the algorithm behaves identically and announces $m$ — but now $y$ is the maximum. So every key other than the maximum must lose at least once: at least $n - 1$ comparisons, $99$ for $n = 100$.
:::
:::

::: exercise Minimum and maximum together {level=2 check="148"}
Show how to find both the minimum and the maximum of $n$ keys with $\lceil 3n/2\rceil - 2$ comparisons, and compute this for $n = 100$. (Enter the number.)
::: solution
Process the keys in pairs: compare the two keys of a pair with each other ($1$ comparison), then the smaller with the current minimum and the larger with the current maximum ($2$ more). For even $n$, the first pair initialises both ($1$ comparison) and the other $n/2 - 1$ pairs cost $3$ each: $1 + 3(n/2 - 1) = 3n/2 - 2$. For odd $n$, the first key initialises both and $(n-1)/2$ pairs cost $3$ each: $3(n-1)/2 = \lceil 3n/2\rceil - 2$. For $n = 100$: $150 - 2 = 148$, compared with $2(n - 1) = 198$ for two separate scans. (An adversary argument shows $\lceil 3n/2\rceil - 2$ is optimal.)
:::
:::

::: exercise Average-case lower bound {#ex-average-lower level=2}
Prove that a binary tree with $N \ge 1$ leaves, in which every internal node has two children, has total leaf depth at least $N\log_2 N$. Deduce that every comparison sort makes at least $\log_2(n!)$ comparisons on average over the $n!$ orders of distinct keys.
::: solution
By strong induction on $N$. For $N = 1$ the total is $0 = 1 \cdot \log_2 1$. For $N \ge 2$ the root has subtrees with $i$ and $N - i$ leaves, $1 \le i \le N - 1$, and every leaf is one deeper than in its subtree, so the total depth is $D(N) \ge i\log_2 i + (N-i)\log_2(N-i) + N$. The function $g(t) = t\log_2 t$ is convex, so $g(i) + g(N - i) \ge 2g(N/2) = N\log_2 N - N$; hence $D(N) \ge N\log_2 N$. A decision tree for sorting can be assumed to have every internal node with two reachable children (a comparison whose answer is forced can be removed, which only lowers depths), and at least $n!$ leaves; restricting to the $n!$ leaves reached by the inputs (and pruning) leaves a full binary tree with $N = n!$ leaves, whose average depth is at least $\log_2(n!)$.
:::
:::

::: exercise Sorting strings with radix sort {level=2}
Explain how to sort $n$ strings, each of exactly $\ell$ lowercase letters, in $\Theta(\ell(n + 26))$ time. Then explain why LSD radix sort is awkward for strings of *different* lengths, and how padding fixes it.
::: solution
Treat each string as an $\ell$-digit number in base $26$, the first letter most significant, and apply LSD radix sort: $\ell$ stable counting-sort passes with $k = 26$, from the last position to the first. By [[#thm-radix]] the result is in lexicographic order, in $\Theta(\ell(n + 26))$ time. For different lengths, "position $i$ from the end" does not line up across strings. Pad every string on the right with a special symbol that sorts *before* every letter (counting sort with $k = 27$) to the maximum length $L$; then lexicographic order of the padded strings equals that of the originals (a proper prefix comes first), and the cost is $\Theta(L(n + 27))$, which can be wasteful if one string is much longer than the rest. MSD (most-significant-first) radix sort, which recursively sorts each bucket, avoids the padding.
:::
:::

::: exercise A sharper quickselect bound {level=3}
Prove the bound $\E[C(n)] \le 4n$ for quickselect sketched after [[#thm-quickselect]]: show that if $\E[C(m)] \le 4m$ for $m < n$ then $\E[C(n)] \le (n - 1) + \frac4n\sum_{i=1}^n\max(i - 1, n - i) \le 4n$.
::: solution
A partition of $n$ elements makes $n - 1$ comparisons. If the pivot has rank $i$ (probability $1/n$ for distinct keys), the recursion is on $i - 1$ or $n - i$ elements, at most $\max(i - 1, n - i)$, and $\E[C]$ is non-decreasing in the size. So $\E[C(n)] \le (n - 1) + \frac1n\sum_{i=1}^n 4\max(i-1, n-i)$. The values $\max(i - 1, n - i)$ for $i = 1..n$ run through $n-1, n-2, \dots, \lceil n/2\rceil$ twice (once from each end; for odd $n$ the middle value $(n-1)/2$ appears once), so $\sum_i \max(i-1, n-i) \le 2\sum_{j=\lfloor n/2\rfloor}^{n-1} j \le \frac{3n^2}{4}$: for even $n$ the sum is $2\big(\binom n2 - \binom{n/2}{2}\big) = \frac{3n^2}{4} - \frac n2$, and for odd $n$ it is $\frac{3n^2 - 2n - 1}{4}$. Therefore $\E[C(n)] \le n - 1 + \frac4n\cdot\frac{3n^2}4 = n - 1 + 3n < 4n$.
:::
:::

::: exercise Groups of seven {level=3}
Analyse [[#alg-mom]] with groups of $7$: how many elements are guaranteed on each side of the pivot, what recurrence results, and is it linear?
::: solution
With $g = \lceil n/7\rceil$ groups, at least $\lceil g/2\rceil$ have median $\ge x$, and each, except the pivot's own group and the possibly short last one, has at least $4$ elements $\ge x$ (its median and three larger). So at least $4(\lceil g/2\rceil - 2) \ge \frac{2n}{7} - 8$ elements are $\ge x$, and similarly $\le x$; the recursive call is on at most $\frac{5n}7 + 8$ elements. The recurrence is $T(n) \le T(\lceil n/7\rceil) + T(5n/7 + 8) + an$, and $\frac17 + \frac57 = \frac67 < 1$, so substitution with $T(n) \le cn$ works for large $n$: $c(n/7 + 1) + c(5n/7 + 8) + an = cn - c(n/7 - 9) + an \le cn$ once $n \ge 126$ and $c \ge 14a$ (then $n/7 - 9 \ge n/14$). It is linear.
:::
:::

::: exercise Nuts and bolts {level=3}
You have $n$ nuts and $n$ bolts of distinct sizes, each nut fitting exactly one bolt. You can compare a nut with a bolt (too big, too small, fits) but not two nuts or two bolts. Give a randomised algorithm that matches them all in expected $O(n\log n)$ comparisons, and show that $\Omega(n\log n)$ comparisons are necessary in the worst case.
::: solution
*Algorithm:* pick a random bolt; compare it with every nut, splitting the nuts into smaller, larger and the matching nut; compare that nut with every bolt, splitting the bolts likewise. Now the small nuts match the small bolts and the large the large; recurse on both pairs. This is quicksort with the pivot used twice, so the analysis of [[algorithms/divide-and-conquer#thm-quicksort]] applies: about $2 \times 2n\ln n$ comparisons in expectation. *Lower bound:* the algorithm must determine which of the $n!$ bijections between nuts and bolts is the true matching. Each comparison has $3$ outcomes, so a decision tree with $n!$ leaves and branching $3$ has height at least $\log_3(n!) = \Omega(n\log n)$.
:::
:::
