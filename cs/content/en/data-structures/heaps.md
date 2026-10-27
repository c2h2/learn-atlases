An emergency department does not treat patients in order of arrival: whoever is most urgent goes next, and a new arrival with chest pain jumps ahead of everyone with a sprained ankle. An operating system picks the highest-priority runnable process; a network router may forward voice packets before bulk downloads; a simulation processes the event with the earliest timestamp; Dijkstra's shortest-path algorithm repeatedly settles the closest unsettled vertex. Each needs a collection from which we can repeatedly **remove the item of highest priority**, while new items keep arriving. That collection is a **priority queue**.

A sorted list answers "what is the most urgent?" instantly but makes every insertion cost $\Theta(n)$; an unsorted list inserts instantly but must scan everything to find the most urgent. The **binary heap** strikes a balance that makes *both* operations $O(\log n)$, with a structure so simple it is stored in a plain array with no references at all. This chapter develops heaps carefully: the heap property, the two repair operations sift-up and sift-down, the surprising fact that a heap can be built from $n$ items in linear time, and **heapsort**, an in-place sorting algorithm with an $O(n\log n)$ worst-case guarantee. We finish with the priority queues in Python's library and their applications.

## Priority queues

::: definition Priority queue {#def-pq}
A **(min-)priority queue** holds items with **keys** (priorities) from a totally ordered set and supports:

- `insert(x)`: add item $x$;
- `find_min()`: return an item with the smallest key;
- `extract_min()`: remove and return an item with the smallest key;

and often `decrease_key(x, k)` (lower the key of an item already present), `size()` and building a queue from $n$ items at once. A **max-priority queue** is the same with "smallest" replaced by "largest".
:::

The ADT says nothing about the order among items that are not the minimum, and that freedom is what a heap exploits. Compare the obvious implementations:

| implementation | `insert` | `find_min` | `extract_min` |
|---|---|---|---|
| unsorted dynamic array | $O(1)$ amortised | $\Theta(n)$ | $\Theta(n)$ |
| sorted array (minimum at the end) | $\Theta(n)$ | $O(1)$ | $O(1)$ |
| balanced search tree | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| binary heap | $O(\log n)$ | $O(1)$ | $O(\log n)$ |

A balanced tree ([[data-structures/balanced-trees]]) already achieves $O(\log n)$, but it maintains a full ordering that a priority queue never uses. A heap maintains only enough order to find the minimum, and it is simpler, smaller and faster as a result.

## Binary heaps

::: definition Binary heap {#def-heap}
A **binary min-heap** is a complete binary tree ([[data-structures/trees]]) in which every node's key is less than or equal to the keys of its children — the **heap property**. It is stored in an array $a[0..n-1]$ in level order: the root is $a[0]$, and the children of $a[i]$ are $a[2i+1]$ and $a[2i+2]$, its parent $a[\lfloor (i-1)/2\rfloor]$. In array terms the heap property reads

$$
a[\lfloor (i-1)/2 \rfloor] \le a[i] \qquad \text{for all } 1 \le i < n.
$$ {#eq-heap}

A **max-heap** reverses the inequality.
:::

By induction along the path to the root, every node's key is at most every key in its subtree; in particular the root $a[0]$ holds a minimum, so `find_min` is $O(1)$. But siblings, cousins and different branches are not ordered at all: a heap is far from sorted. Because the tree is complete, the array has no gaps and the index arithmetic of [[data-structures/trees#ex-implicit]] applies; and by [[data-structures/trees#thm-height-size]] its height is $\lfloor\log_2 n\rfloor$, the smallest possible.

For example, `[1, 3, 2, 5, 9, 8]` is a min-heap: $1 \le 3, 2$; $3 \le 5, 9$; $2 \le 8$. Drawn as a tree:

```text
          1
        /   \
       3     2
      / \   /
     5   9 8
```

### Insertion: sift up

To insert $x$, put it in the only place that keeps the tree complete: the first free position, $a[n]$, a new leaf at the end of the last level. The heap property can now fail only between $x$ and its parent. If $x$ is smaller than its parent, swap them; repeat with $x$'s new parent until $x$ is not smaller or has become the root.

::: algorithm Sift up {#alg-sift-up}
**Input:** an array $a[0..i]$ that satisfies [[#eq-heap]] except possibly between $a[i]$ and its ancestors.

While $i > 0$ and $a[i] < a[p]$, where $p = \lfloor (i-1)/2\rfloor$: swap $a[i]$ and $a[p]$ and set $i \gets p$.
:::

### Extracting the minimum: sift down

The minimum is at the root, but removing the root would leave a hole at the top. Instead, move the *last* leaf $a[n-1]$ into the root (the array shrinks by one and stays complete) and repair downwards: if the moved key is larger than one of its children, swap it with the **smaller** child — the only choice that makes the new parent no larger than both children — and continue from that child.

::: algorithm Sift down {#alg-sift-down}
**Input:** an array $a[0..n-1]$ in which the subtrees of both children of $i$ are heaps.

Repeat: let $c$ be the child of $i$ with the smaller key ($2i+1$, or $2i+2$ if it exists and is smaller); if $i$ has no children or $a[i] \le a[c]$, stop; otherwise swap $a[i]$ and $a[c]$ and set $i \gets c$.
:::

::: theorem Heap operations {#thm-heap-ops}
Sift-up and sift-down restore the heap property. Hence `insert` and `extract_min` on a binary heap of $n$ items take $O(\log n)$ time, using at most $\lfloor\log_2 n\rfloor$ swaps and, for sift-down, at most $2\lfloor\log_2 n\rfloor$ key comparisons.
:::

::: proof
*Sift-up.* Invariant: [[#eq-heap]] holds for every parent–child pair except possibly the pair formed by position $i$ and its parent $p$; moreover, if $i$ has a parent, then $a[p]$ is no larger than the children of $i$. Initially $i$ is a new leaf, so the second part holds vacuously. Suppose $a[i] < a[p]$ and we swap. The old $a[p]$ moves to position $i$; it is no larger than $i$'s children by the second part of the invariant, so those pairs are fine. The key $x$ moves to position $p$; it is smaller than the old $a[p]$, which was no larger than $p$'s other child, so the pairs below $p$ are fine. If $p$ has a parent $q$, then $a[q] \le$ old $a[p]$ (that pair was not the violating one), and old $a[p] \le$ $p$'s other child, so $a[q]$ is no larger than either child of $p$: the invariant holds with $i \gets p$. When the loop stops, either $i = 0$ or $a[i] \ge a[p]$, and there is no violation left.

*Sift-down.* Invariant: [[#eq-heap]] holds everywhere except possibly between position $i$ and its children. If $a[i]$ is larger than the smaller child $a[c]$, swap them: now $a[c]$ (the old child) is at $i$ and is no larger than the other child, by the choice of $c$, and no smaller than $i$'s parent (it was in the subtree of $i$, whose keys were all at least the parent's, since the moved key $a[i]$ was the only intruder). The only possible violation moves down to $c$ and its children. The loop stops at a leaf or when $a[i] \le$ both children.

*Cost.* Each iteration moves one level, up or down a tree of height $\lfloor\log_2 n\rfloor$, with one comparison (sift-up) or two (sift-down) per level.
:::

The whole data structure fits in a few lines of Python:

```python
class MinHeap:
    """Binary min-heap in a Python list: children of i are 2i+1 and 2i+2."""
    def __init__(self, items=()):
        self.a = list(items)
        for i in range(len(self.a) // 2 - 1, -1, -1):   # build-heap: bottom-up
            self._sift_down(i)

    def push(self, x):
        self.a.append(x)                  # new leaf at the end of the last level
        self._sift_up(len(self.a) - 1)

    def pop(self):                        # remove and return the minimum
        a = self.a
        a[0], a[-1] = a[-1], a[0]         # move the last leaf to the root
        smallest = a.pop()
        if a:
            self._sift_down(0)
        return smallest

    def _sift_up(self, i):
        a = self.a
        while i > 0 and a[i] < a[(i - 1) // 2]:
            parent = (i - 1) // 2
            a[i], a[parent] = a[parent], a[i]
            i = parent

    def _sift_down(self, i):
        a, n = self.a, len(self.a)
        while True:
            child = 2 * i + 1
            if child >= n:
                return                    # i is a leaf
            if child + 1 < n and a[child + 1] < a[child]:
                child += 1                # the smaller of the two children
            if a[i] <= a[child]:
                return                    # heap order holds here
            a[i], a[child] = a[child], a[i]
            i = child
```

(The constructor's loop is the linear-time build of [[#alg-build-heap]] below.)

::: example Insertions and extractions {#ex-heap-trace}
Push $5, 3, 8, 1, 9, 2$ in that order into an empty `MinHeap`, showing the array after each push, and then pop all six items.
::: solution
```python
h = MinHeap()
for x in [5, 3, 8, 1, 9, 2]:
    h.push(x)
    print("push", x, h.a)
print([h.pop() for _ in range(6)])
```

```console
$ python3 heap.py
push 5 [5]
push 3 [3, 5]
push 8 [3, 5, 8]
push 1 [1, 3, 8, 5]
push 9 [1, 3, 8, 5, 9]
push 2 [1, 3, 2, 5, 9, 8]
[1, 2, 3, 5, 8, 9]
```

Pushing $3$: it lands at index $1$, below $5$, and is swapped up to the root. Pushing $1$: it lands at index $3$, whose parent (index $1$) holds $5$ — swap, giving `[3, 1, 8, 5]` — then its parent is the root $3$ — swap again: `[1, 3, 8, 5]`, two levels up. Pushing $2$: index $5$, parent index $2$ holds $8$ — swap; parent is now the root $1 < 2$ — stop.

The first pop moves the last leaf $8$ to the root: `[8, 3, 2, 5, 9]`. The children of the root are $3$ and $2$; the smaller is $2$, so swap: `[2, 3, 8, 5, 9]`; $8$ is now at index $2$, a leaf, and the pop returns $1$. Continuing, the pops return the keys in increasing order — a first glimpse of heapsort.
:::
:::

::: quiz
Which of these arrays are min-heaps? (Choose all that apply.)
- [x] `[1, 2, 3, 4, 5, 6]`
- [x] `[1, 5, 2, 6, 7, 3]`
- [ ] `[2, 1, 3]`
- [ ] `[1, 3, 2, 4, 5, 1]`
::: solution
Check $a[\lfloor (i-1)/2 \rfloor] \le a[i]$ for each $i \ge 1$. A sorted array is always a heap. In `[1, 5, 2, 6, 7, 3]`: $1 \le 5, 2$; $5 \le 6, 7$; $2 \le 3$ — a heap, although far from sorted. `[2, 1, 3]` fails at the root ($2 > 1$). In `[1, 3, 2, 4, 5, 1]`, the last element $1$ (index $5$) has parent index $2$ holding $2 > 1$.
:::
:::

## Building a heap in linear time

Given $n$ items at once, we could push them one by one: $n$ insertions of $O(\log n)$ each, $O(n\log n)$ in total. But there is a better way. Put the items into the array in any order. The leaves — positions $\lfloor n/2\rfloor$ to $n - 1$ — are already one-element heaps. Now sift down each internal node, *from the last one up to the root*: when we reach node $i$, both its children's subtrees are already heaps, which is exactly the precondition of [[#alg-sift-down]].

::: algorithm Build-heap (Floyd) {#alg-build-heap}
For $i = \lfloor n/2\rfloor - 1, \lfloor n/2\rfloor - 2, \dots, 0$: sift down position $i$.
:::

Correctness follows from the invariant "*every position $j > i$ is the root of a heap*", true at the start because the positions $j \ge \lfloor n/2\rfloor$ are leaves, and maintained by each sift-down. At the end, position $0$ is the root of a heap.

The surprise is the cost. Most nodes are near the bottom, where sift-down is cheap: half the nodes are leaves and cost nothing, a quarter have height $1$ and cost at most one swap, and only the root can cost $\log_2 n$.

::: theorem Build-heap takes linear time {#thm-build-heap}
[[#alg-build-heap]] makes at most $2n$ key comparisons and at most $n$ swaps on an array of $n$ items. Hence a heap can be built in $\Theta(n)$ time.
:::

::: proof
Sifting down a node of height $h$ (in the tree) takes at most $h$ iterations, each with at most $2$ comparisons and $1$ swap. So the total number of swaps is at most the sum of the heights of all nodes, $S = \sum_v \mathrm{height}(v)$, and the number of comparisons at most $2S$.

Count $S$ by levels of height. A node $v$ has height $\ge h$ exactly when it has a descendant $h$ levels below it, and in a complete tree stored by level order this happens for node $i$ exactly when its leftmost such descendant, at index $2^h(i+1) - 1$, exists: $2^h(i+1) - 1 \le n - 1$, that is $i + 1 \le n/2^h$. So exactly $\lfloor n/2^h\rfloor$ nodes have height $\ge h$. Since a node of height $k$ is counted once for each $h = 1, \dots, k$,

$$
S = \sum_{h \ge 1} \#\set{v : \mathrm{height}(v) \ge h} = \sum_{h\ge1}\Bigl\lfloor\frac{n}{2^h}\Bigr\rfloor < \sum_{h \ge 1}\frac{n}{2^h} = n.
$$

So $S < n$, giving fewer than $n$ swaps and $2n$ comparisons. The lower bound $\Omega(n)$ holds because every item must be examined.
:::

The bound is tight in practice: counting comparisons with a key type that counts its own comparisons, on decreasing input (the worst case for a min-heap, since every new item is the smallest so far):

```python
class Counter:
    """A number that counts how often it is compared."""
    count = 0
    def __init__(self, v): self.v = v
    def __lt__(self, other):
        Counter.count += 1
        return self.v < other.v
    def __le__(self, other):
        Counter.count += 1
        return self.v <= other.v

for n in [1000, 10_000, 100_000]:
    xs = [Counter(v) for v in range(n, 0, -1)]   # decreasing: worst case for push
    Counter.count = 0
    MinHeap(xs)                              # bottom-up build
    bottom_up = Counter.count
    Counter.count = 0
    h = MinHeap()
    for x in xs:                             # n separate pushes
        h.push(x)
    print(f"n = {n:6d}: build-heap {bottom_up / n:.2f} n, repeated push {Counter.count / n:.2f} n")
```

```console
$ python3 buildheap.py
n =   1000: build-heap 1.98 n, repeated push 7.99 n
n =  10000: build-heap 2.00 n, repeated push 11.36 n
n = 100000: build-heap 2.00 n, repeated push 14.69 n
```

Bottom-up building stays at $2n$ comparisons (just under the bound of [[#thm-build-heap]], which the rounding to two decimals hides); repeated pushes grow like $n\log_2 n$ — each new item travels all the way to the root. (On *random* input, repeated pushing is also linear on average, because a random new item rarely rises more than a couple of levels; the difference is in the worst case.)

::: example Building a heap {#ex-build-heap}
Apply [[#alg-build-heap]] to `[9, 4, 7, 1, 8, 2, 6, 3, 5]` and show the array after each sift-down.
::: solution
Here $n = 9$, so we sift down $i = 3, 2, 1, 0$.

| $i$ (key) | action | array after |
|---|---|---|
| start | | `[9, 4, 7, 1, 8, 2, 6, 3, 5]` |
| 3 (1) | children $3, 5$: $1$ is smaller, stop | `[9, 4, 7, 1, 8, 2, 6, 3, 5]` |
| 2 (7) | children $2, 6$: swap with $2$; now a leaf | `[9, 4, 2, 1, 8, 7, 6, 3, 5]` |
| 1 (4) | children $1, 8$: swap with $1$; at index 3, children $3, 5$: swap with $3$ | `[9, 1, 2, 3, 8, 7, 6, 4, 5]` |
| 0 (9) | swap with $1$ (index 1); then with $3$ (index 3); then with $4$ (index 7) | `[1, 3, 2, 4, 8, 7, 6, 9, 5]` |

`MinHeap([9, 4, 7, 1, 8, 2, 6, 3, 5]).a` returns `[1, 3, 2, 4, 8, 7, 6, 9, 5]`. In total there were $6$ swaps, below the bound $S = \lfloor 9/2\rfloor + \lfloor 9/4\rfloor + \lfloor 9/8\rfloor = 4 + 2 + 1 = 7$.
:::
:::

::: widget plot
f: 2*x; x*log2(x); 2*x*log2(x)
labels: 2n\ \text{(build-heap)}; n\log_2 n\ \text{(repeated insertion)}; 2n\log_2 n\ \text{(heapsort)}
x: 1, 1000
y: 0, 20000
caption: Worst-case comparison counts. Building a heap bottom-up costs at most $2n$ ([[#thm-build-heap]]), against about $n\log_2 n$ for inserting the items one by one; heapsort's second phase, $n$ extractions, costs up to $2n\log_2 n$. The gap between the first two curves is the reward for sifting *down* from the bottom, where most nodes are, instead of *up* to the top.
:::

## Heapsort

A heap gives a sorting algorithm almost for free: build a heap, then extract the minimum $n$ times. With a separate output list this needs $\Theta(n)$ extra space, but a neat trick sorts **in place**. Use a *max*-heap. After building it, the largest item is at $a[0]$; swap it with the last item $a[n-1]$, which is its final sorted position, shrink the heap by one, and sift the new root down. The heap occupies a shrinking prefix of the array and the sorted items a growing suffix.

::: algorithm Heapsort {#alg-heapsort}
1. Build a max-heap in $a[0..n-1]$ with [[#alg-build-heap]] (using the max-heap version of sift-down).
2. For $\mathit{end} = n-1, n-2, \dots, 1$: swap $a[0]$ and $a[\mathit{end}]$; sift down position $0$ within the heap $a[0..\mathit{end}-1]$.
:::

```python
def sift_down(a, i, n):
    """Restore max-heap order in a[0:n] below position i."""
    while 2 * i + 1 < n:
        child = 2 * i + 1
        if child + 1 < n and a[child + 1] > a[child]:
            child += 1                        # the larger child
        if a[i] >= a[child]:
            return
        a[i], a[child] = a[child], a[i]
        i = child

def heapsort(a):
    n = len(a)
    for i in range(n // 2 - 1, -1, -1):       # phase 1: build a max-heap
        sift_down(a, i, n)
    print("heap  ", a)
    for end in range(n - 1, 0, -1):           # phase 2: move the max to the end
        a[0], a[end] = a[end], a[0]
        sift_down(a, 0, end)                  # the heap is now a[0:end]
        print(f"end={end}", a[:end], "|", a[end:])

data = [6, 2, 9, 4, 1, 7]
heapsort(data)
print(data)
```

::: example Tracing heapsort {#ex-heapsort}
Run heapsort on `[6, 2, 9, 4, 1, 7]`, showing the heap and the sorted suffix after each step.
::: solution
```console
$ python3 heapsort.py
heap   [9, 4, 7, 2, 1, 6]
end=5 [7, 4, 6, 2, 1] | [9]
end=4 [6, 4, 1, 2] | [7, 9]
end=3 [4, 2, 1] | [6, 7, 9]
end=2 [2, 1] | [4, 6, 7, 9]
end=1 [1] | [2, 4, 6, 7, 9]
[1, 2, 4, 6, 7, 9]
```

Building the max-heap sifts down index $2$ ($9$ is already larger than its child $7$), index $1$ ($2$ swaps with its larger child $4$) and index $0$ ($6$ swaps with $9$, then with $7$), giving `[9, 4, 7, 2, 1, 6]`. In the first step of phase 2, $9$ is swapped with the last item $6$ and is now in place; $6$ is sifted down from the root (swapping with $7$), giving the heap `[7, 4, 6, 2, 1]`. The loop invariant is: *$a[0..\mathit{end}]$ is a max-heap of the $\mathit{end}+1$ smallest items, and $a[\mathit{end}+1..n-1]$ holds the largest items in sorted order.*
:::
:::

::: theorem Heapsort {#thm-heapsort}
Heapsort sorts $n$ items in place (with $O(1)$ extra space) using $O(n\log n)$ comparisons in the worst case — at most $2n + 2n\lfloor\log_2 n\rfloor$.
:::

::: proof
Correctness follows from the loop invariant stated in [[#ex-heapsort]]: initially (before the first swap, with $\mathit{end} = n - 1$) the whole array is a max-heap and the suffix is empty. The root of the heap $a[0..\mathit{end}]$ is the largest of the $\mathit{end} + 1$ smallest items; swapping it to position $\mathit{end}$ places it immediately before the larger items already sorted, and sifting down restores the heap on $a[0..\mathit{end}-1]$ (the root's children are roots of heaps, so [[#alg-sift-down]] applies). When $\mathit{end} = 0$ the single remaining item is the smallest.

Cost: phase 1 makes at most $2n$ comparisons ([[#thm-build-heap]]); each of the $n - 1$ sift-downs in phase 2 is on a heap of fewer than $n$ items and makes at most $2\lfloor\log_2 n\rfloor$ comparisons ([[#thm-heap-ops]]). Only a few index variables are used besides the array.
:::

Heapsort matches merge sort's $O(n\log n)$ worst case while using no extra array, and beats quicksort's $\Theta(n^2)$ worst case. In practice it is usually slower than both, because its memory accesses jump around the array (poor cache locality), and it is **not stable**: equal keys may change their relative order. Library sorts therefore use it as a safety net — **introsort**, used by many C++ standard libraries, runs quicksort and switches to heapsort if the recursion becomes too deep. Comparison sorting is treated fully in [[algorithms]], including the proof that $\Omega(n\log n)$ comparisons are necessary.

::: warning A heap is not a sorted array
Only the root is guaranteed to be the minimum. The second smallest item is one of the root's two children, but the largest could be any leaf, and searching for an arbitrary key takes $\Theta(n)$ time — a heap has no search-tree property to guide the search. Printing a heap's array does not print the items in order (`[1, 3, 2, 5, 9, 8]` above), and iterating over a `heapq` list in Python gives the internal order, not the sorted order. If you need sorted order or fast search, pop repeatedly or use a search tree.
:::

## Priority queues in practice

### Python's heapq

Python's `heapq` module implements a binary min-heap on an ordinary `list`, with functions rather than a class: `heappush(h, x)`, `heappop(h)`, `heapify(h)` (Floyd's linear-time build), `heapreplace`, `nsmallest`, `nlargest` and `merge`. There is no max-heap interface; the usual trick is to store negated keys. Items are compared directly, so to give priorities to objects that cannot (or should not) be compared, push tuples `(priority, tie_breaker, item)`, where an increasing counter as tie-breaker keeps items with equal priorities in arrival order and prevents Python from ever comparing the items themselves:

```python
import heapq
from itertools import count

tasks = []                                  # a min-heap of (priority, tie, task)
tie = count()                               # breaks ties in arrival order
for priority, task in [(2, "write report"), (1, "fix bug"), (3, "lunch"), (1, "reply")]:
    heapq.heappush(tasks, (priority, next(tie), task))
while tasks:
    priority, _, task = heapq.heappop(tasks)
    print(priority, task)

scores = [72, 95, 61, 88, 99, 47, 83]
print(heapq.nlargest(3, scores))            # O(n log k) with a heap of size k
print(list(heapq.merge([1, 4, 9], [2, 3, 10], [5])))   # k-way merge of sorted inputs
```

```console
$ python3 tasks.py
1 fix bug
1 reply
2 write report
3 lunch
[99, 95, 88]
[1, 2, 3, 4, 5, 9, 10]
```

`nlargest(k, …)` keeps a min-heap of the $k$ largest items seen so far, replacing its root whenever a larger item arrives: $O(n\log k)$ time and $O(k)$ space, much better than sorting when $k \ll n$. `merge` keeps a heap of the current first items of the $k$ inputs, producing $N$ output items in $O(N\log k)$ — the heart of external sorting, where sorted runs on disk are merged.

### Decrease-key and Dijkstra's algorithm

Some algorithms need to *lower* the key of an item already in the queue. In a binary heap this is a sift-up from the item's position — $O(\log n)$ — provided we know where the item is, which requires an auxiliary map from items to array indices, updated on every swap. Dijkstra's shortest-path algorithm is the classic user: it keeps unsettled vertices in a priority queue keyed by their tentative distance, extracts the closest, and decreases the keys of its neighbours.

::: widget graph
nodes: A; B; C; D; E
edges: A-B:4; A-C:1; C-B:2; B-D:1; C-D:5; D-E:3
algorithm: dijkstra
start: A
caption: Dijkstra's algorithm from A. Step through it and watch which vertex is settled next: always the unsettled vertex with the smallest tentative distance — exactly an `extract_min` on a priority queue keyed by distance. When C is settled, B's distance drops from 4 to 3: a `decrease_key`. With a binary heap, $n$ extractions and up to $m$ decreases cost $O((n + m)\log n)$.
:::

Since `heapq` has no decrease-key, Python code usually uses **lazy deletion** instead: push a new entry `(new_distance, vertex)` and, when popping, skip entries whose distance is out of date. The heap may then hold up to $m$ entries, but $\log m \le 2\log n$, so the bound $O((n + m)\log n)$ is unchanged.

::: example Dijkstra's algorithm with lazy deletion {#ex-lazy-dijkstra}
Implement Dijkstra's algorithm with `heapq` and lazy deletion, and run it on the graph of the figure, printing each settled vertex and each skipped entry.
::: solution
```python
import heapq

graph = {"A": {"B": 4, "C": 1}, "B": {"A": 4, "C": 2, "D": 1},
         "C": {"A": 1, "B": 2, "D": 5}, "D": {"B": 1, "C": 5, "E": 3},
         "E": {"D": 3}}

def dijkstra(graph, source):
    dist = {source: 0}
    heap = [(0, source)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            print(f"  skip stale entry ({d}, {u})")
            continue                          # lazy deletion: u was improved later
        print(f"settle {u} at distance {d}")
        for v, w in graph[u].items():
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(heap, (d + w, v))   # instead of decrease_key
    return dist

print(dijkstra(graph, "A"))
```

```console
$ python3 dijkstra.py
settle A at distance 0
settle C at distance 1
settle B at distance 3
  skip stale entry (4, B)
settle D at distance 4
  skip stale entry (6, D)
settle E at distance 7
{'A': 0, 'B': 3, 'C': 1, 'D': 4, 'E': 7}
```

Settling $A$ pushes $(4, B)$ and $(1, C)$. Settling $C$ finds a shorter route to $B$ ($1 + 2 = 3 < 4$) and pushes $(3, B)$ *without* removing $(4, B)$, and also pushes $(6, D)$. The heap now holds the stale entry $(4, B)$, which is popped later and skipped because $4 > \mathit{dist}[B] = 3$. Similarly $(6, D)$ is superseded by $(4, D)$ pushed when $B$ is settled. Every vertex is settled once, at its correct distance; the heap held at most $m$ live and stale entries, costing $O(\log m) = O(\log n)$ per operation.
:::
:::

Dijkstra's algorithm and its analysis are in [[algorithms]]; the graph representations it runs on are in [[data-structures/graph-representations]].

### Beyond binary heaps

A **$d$-ary heap** gives each node $d$ children (children of $i$ at $di + 1, \dots, di + d$): its height is $\log_d n$, so insertion and decrease-key become cheaper, while extract-min must compare $d$ children per level and becomes dearer — a good trade when decreases are frequent, and friendlier to caches. **Binomial heaps** and **pairing heaps** support merging two heaps quickly. **Fibonacci heaps** (Fredman and Tarjan) do decrease-key in $O(1)$ amortised time and extract-min in $O(\log n)$ amortised, which improves Dijkstra's algorithm to $O(m + n\log n)$ in theory, though their constant factors make binary or pairing heaps faster in most practical settings.

::: quiz
A max-heap is stored in an array of length $n = 31$ (a perfect tree of height $4$). Where can the smallest item be?
- [ ] Only at index $30$, the last position
- [x] At any of the leaves, indices $15$ to $30$
- [ ] At any index from $1$ to $30$
- [ ] Only in the bottom-left leaf, index $15$
::: solution
In a max-heap every internal node is at least as large as its children, so an internal node can hold the minimum only if all keys in its subtree are equal to it; with distinct keys, the minimum must be a leaf. Any leaf is possible — the heap property says nothing about the order among leaves. In a complete tree of $31$ nodes the leaves are indices $\lfloor 31/2\rfloor = 15$ to $30$, so finding the minimum of a max-heap takes $\Theta(n)$ time.
:::
:::

::: history
The binary heap and heapsort were published by J. W. J. Williams as "Algorithm 232: Heapsort" in *Communications of the ACM* in 1964, the same year that Robert Floyd published "Algorithm 245: Treesort 3", which introduced the bottom-up linear-time construction of [[#alg-build-heap]]. The word "heap" for this structure comes from Williams' paper (it is unrelated to the "heap" of dynamically allocated memory). David Musser's introsort (1997) made heapsort the worst-case safeguard of practical library sorts. Michael Fredman and Robert Tarjan introduced Fibonacci heaps in 1984 (journal version 1987), and pairing heaps followed in 1986 (Fredman, Sedgewick, Sleator and Tarjan).
:::

## Where this leads

Heaps power the greedy and graph algorithms of [[algorithms]]: Dijkstra's shortest paths, Prim's minimum spanning trees, Huffman coding (repeatedly merging the two least frequent symbols), event-driven simulation and $k$-way merging. Operating systems use priority queues to schedule processes and timers ([[operating-systems]]), and network devices to schedule packets ([[networks]]). The array representation of complete trees introduced here is one instance of a general theme: an implicit structure that trades flexibility for compactness and speed. The last chapter, [[data-structures/graph-representations]], turns to the structures on which these graph algorithms run.

::: summary
- A **priority queue** ([[#def-pq]]) supports insert and extract-min; a binary heap gives $O(\log n)$ for both and $O(1)$ find-min.
- A **binary heap** ([[#def-heap]]) is a complete binary tree with the heap property, stored in an array with children of $i$ at $2i+1$, $2i+2$; its height is $\lfloor\log_2 n\rfloor$.
- Insertion adds a leaf and **sifts up**; extract-min moves the last leaf to the root and **sifts down** towards the smaller child ([[#thm-heap-ops]]).
- **Build-heap** sifts down internal nodes from the bottom up in at most $2n$ comparisons ([[#thm-build-heap]]), because the sum of node heights is less than $n$.
- **Heapsort** ([[#alg-heapsort]]) sorts in place in $O(n\log n)$ worst-case time but is not stable and has poor locality ([[#thm-heapsort]]).
- A heap is not sorted: search is $\Theta(n)$. Python's `heapq` is a min-heap on a list; use `(priority, counter, item)` tuples and lazy deletion in place of decrease-key.
:::

## Exercises

::: exercise Index arithmetic {level=1 check="20"}
In a heap stored in an array from index $0$, what is the index of the right child of the left child of the node at index $4$? (Enter the index.)
::: solution
The left child of $4$ is $2\cdot4+1 = 9$, and the right child of $9$ is $2\cdot 9 + 2 = 20$. Going back up, the parent of $20$ is $\lfloor 19/2\rfloor = 9$ and the parent of $9$ is $\lfloor 8/2\rfloor = 4$, as it should be.
:::
:::

::: exercise Pushing into a heap {level=1}
Push $4$ into the min-heap `[1, 3, 2, 5, 9, 8]`. Show the swaps and the resulting array.
::: solution
$4$ goes to index $6$, whose parent is index $\lfloor 5/2\rfloor = 2$ holding $2$. Since $4 \ge 2$, no swap is needed: `[1, 3, 2, 5, 9, 8, 4]`. (Pushing $0$ instead would swap with $2$ and then with $1$, ending at the root.)
:::
:::

::: exercise Sum of heights {level=1 check="26"}
Compute $S = \sum_{h \ge 1}\lfloor n/2^h\rfloor$, the sum of the node heights of a heap, for $n = 30$. (Enter the number.)
::: solution
$\lfloor 30/2\rfloor + \lfloor 30/4\rfloor + \lfloor 30/8\rfloor + \lfloor 30/16\rfloor = 15 + 7 + 3 + 1 = 26$. By [[#thm-build-heap]], building a heap of $30$ items makes at most $26$ swaps and $52$ comparisons.
:::
:::

::: exercise Pop trace {level=2}
Pop the minimum from the heap `[1, 3, 2, 4, 8, 7, 6, 9, 5]` built in [[#ex-build-heap]], showing each swap.
::: solution
Move the last item $5$ to the root: `[5, 3, 2, 4, 8, 7, 6, 9]`. Children of the root: $3$ and $2$; smaller is $2$ (index $2$); $5 > 2$, swap: `[2, 3, 5, 4, 8, 7, 6, 9]`. Children of index $2$: $7$ and $6$; smaller $6$; $5 < 6$, stop. The pop returns $1$ and the heap is `[2, 3, 5, 4, 8, 7, 6, 9]`.
:::
:::

::: exercise k-th smallest {level=2}
Give an algorithm that finds the $k$th smallest of $n$ items in $O(n + k\log n)$ time using a heap, and another that uses $O(n\log k)$ time and only $O(k)$ extra space. Which is better when $k = \sqrt n$?
::: solution
(1) Build a min-heap of all $n$ items in $O(n)$ ([[#thm-build-heap]]) and pop $k$ times, $O(k\log n)$; the last item popped is the $k$th smallest.

(2) Scan the items keeping a *max*-heap of the $k$ smallest seen so far: push the first $k$; for each later item, if it is smaller than the heap's maximum, replace the maximum with it and sift down ($O(\log k)$). At the end the heap's maximum is the $k$th smallest. Time $O(n\log k)$, space $O(k)$.

With $k = \sqrt n$, (1) costs $O(n + \sqrt n\log n) = O(n)$ and (2) costs $O(n\log\sqrt n) = O(n\log n)$; (1) is faster but needs to modify or copy the whole input, (2) works on a stream. (Linear-time selection without heaps is in [[algorithms]].)
:::
:::

::: exercise Heapsort is not stable {level=2}
Give a small input showing that heapsort ([[#alg-heapsort]]) is not stable. Use pairs compared by their first component only, such as `(1, 'a'), (1, 'b')`.
::: solution
Sort `[(1, 'a'), (1, 'b')]` by first component. Build-heap: the root $(1, a)$ is not smaller than its child $(1, b)$, so nothing moves. Phase 2 swaps $a[0]$ and $a[1]$, giving `[(1, 'b'), (1, 'a')]`: the two equal keys have exchanged their order. Stable sorts (merge sort, insertion sort, Python's `sorted`) never do that.
:::
:::

::: exercise Decrease-key with a position map {level=3}
Extend `MinHeap` to store `(key, item)` pairs together with a dictionary `pos` mapping each item to its index, so that `decrease_key(item, new_key)` runs in $O(\log n)$. Which methods must update `pos`, and what invariant should they maintain? Implement it and test it on a small example.
::: solution
Invariant: for every item $x$ in the heap, `self.a[self.pos[x]]` is the pair holding $x$. Every operation that moves pairs — the swaps in `_sift_up` and `_sift_down`, the swap of root and last leaf in `pop`, and `append` in `push` — must update `pos`; `pop` must also delete the removed item.

```python
class IndexedMinHeap:
    def __init__(self):
        self.a, self.pos = [], {}            # a holds [key, item] pairs

    def _swap(self, i, j):
        a = self.a
        a[i], a[j] = a[j], a[i]
        self.pos[a[i][1]], self.pos[a[j][1]] = i, j

    def _up(self, i):
        while i > 0 and self.a[i][0] < self.a[(i - 1) // 2][0]:
            self._swap(i, (i - 1) // 2)
            i = (i - 1) // 2

    def _down(self, i):
        n = len(self.a)
        while 2 * i + 1 < n:
            c = 2 * i + 1
            if c + 1 < n and self.a[c + 1][0] < self.a[c][0]:
                c += 1
            if self.a[i][0] <= self.a[c][0]:
                return
            self._swap(i, c)
            i = c

    def push(self, item, key):
        self.a.append([key, item])
        self.pos[item] = len(self.a) - 1
        self._up(len(self.a) - 1)

    def pop(self):
        self._swap(0, len(self.a) - 1)
        key, item = self.a.pop()
        del self.pos[item]
        if self.a:
            self._down(0)
        return item, key

    def decrease_key(self, item, key):
        i = self.pos[item]
        assert key <= self.a[i][0], "keys may only decrease"
        self.a[i][0] = key
        self._up(i)                          # a smaller key can only move up

h = IndexedMinHeap()
for item, key in [("A", 0), ("B", 4), ("C", 1), ("D", 7)]:
    h.push(item, key)
print(h.pop())                               # ('A', 0)
h.decrease_key("D", 2)
print([h.pop() for _ in range(3)])           # C, D, B
```

```console
$ python3 indexed.py
('A', 0)
[('C', 1), ('D', 2), ('B', 4)]
```

Each operation does $O(1)$ dictionary work per swap, so all remain $O(\log n)$.
:::
:::

::: exercise A lower bound for building by insertion {level=3}
Show that inserting the keys $n, n-1, \dots, 1$ one at a time into an initially empty binary min-heap performs $\sum_{i=1}^{n-1}\lfloor\log_2(i+1)\rfloor = \Theta(n\log n)$ swaps, so the linear bound of [[#thm-build-heap]] really depends on building bottom-up.
::: solution
When key $n - i$ is inserted (for $i = 1, \dots, n-1$), the heap holds $i$ keys, all larger than it. The new leaf is at index $i$, at depth $\lfloor\log_2(i+1)\rfloor$; since it is smaller than every ancestor, sift-up swaps it all the way to the root: $\lfloor\log_2(i+1)\rfloor$ swaps. The total is $\sum_{i=1}^{n-1}\lfloor\log_2(i+1)\rfloor$. At least half of the terms (those with $i \ge n/2$) are at least $\lfloor\log_2(n/2)\rfloor \ge \log_2 n - 2$, so the sum is at least $\tfrac n2(\log_2 n - 2) = \Omega(n\log n)$; and every term is at most $\log_2 n$, so it is $O(n\log n)$. The measurement above (about $14.7n$ comparisons for $n = 10^5$) shows the same growth.
:::
:::
