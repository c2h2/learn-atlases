You have written a function that sorts a list, and it has passed every test you tried. Two questions remain. Does it sort *every* list, including the ones you did not think of — the empty list, a list with repeated values, a list that is already sorted backwards? And how long will it take on a list of a million items, which you cannot afford to try many times? Testing samples a handful of inputs out of infinitely many; it can show the presence of bugs but not their absence. To answer the two questions for all inputs at once we need arguments, not experiments.

This course is about designing algorithms and about the two arguments that accompany every one of them: a **proof of correctness**, showing that the algorithm meets its specification on every valid input, and an **analysis of cost**, showing how its running time (or memory) grows with the size of the input. This first chapter supplies the tools for both. For iterative algorithms the correctness tool is the **loop invariant**, a statement that stays true each time round a loop; for recursive algorithms it is **induction**. For cost, iterative algorithms lead to sums, and recursive ones lead to **recurrences** — equations such as $T(n) = 2T(n/2) + n$ that describe the cost on input size $n$ in terms of the cost on smaller inputs. We solve recurrences by substitution, by recursion trees and by the **master theorem**, which every later chapter uses.

We assume the asymptotic notation $O$, $\Omega$, $\Theta$ and the RAM cost model from [[data-structures/asymptotic-analysis]], induction from [Maths Atlas: induction](/learn/maths/lesson.php?c=proofs&l=induction), and Python as in [[programming-1]]. Pseudocode in this course is in the CLRS style: arrays are indexed from $1$ unless said otherwise, `←` is assignment, and indentation shows structure; the Python versions index from $0$.

## Specifications and loop invariants

An algorithm solves a **problem**, and a problem is described by what its inputs may be and what output is required for each.

::: definition Computational problem and correctness {#def-problem}
A **computational problem** is given by a set of valid **inputs** (its *instances*) and, for each instance, a set of acceptable **outputs**. It is often written as a **precondition**, a property the input must satisfy, and a **postcondition**, a relation between the input and the output. An algorithm is **correct** for the problem if, for every instance, it **terminates** and its output satisfies the postcondition. (A program that satisfies the postcondition *whenever* it terminates is called *partially correct*; correctness = partial correctness + termination.)
:::

The **sorting problem**: the input is a sequence $\langle a_1, \dots, a_n\rangle$ of $n \ge 0$ keys from a totally ordered set; the output is a permutation $\langle a'_1, \dots, a'_n\rangle$ of the input with $a'_1 \le a'_2 \le \dots \le a'_n$. Both halves of the postcondition matter: returning $\langle 1, 2, 3\rangle$ for every input is "sorted" but not a permutation of the input.

### Insertion sort

Insertion sort is the way most people sort a hand of cards: take the cards one at a time and insert each into its place among those already held.

::: algorithm Insertion sort {#alg-insertion}
```text
INSERTION-SORT(A[1..n])
1  for j ← 2 to n
2      key ← A[j]
3      i ← j − 1
4      while i ≥ 1 and A[i] > key        ▷ shift larger elements right
5          A[i + 1] ← A[i]
6          i ← i − 1
7      A[i + 1] ← key
```
:::

How do we know this works? The insight is to describe what is true *at the start of every iteration* of the outer loop.

::: definition Loop invariant {#def-invariant}
A **loop invariant** is a statement about the variables of a loop that satisfies three conditions:

1. **Initialisation:** it is true before the first iteration;
2. **Maintenance:** if it is true before an iteration, it is true before the next one;
3. **Termination:** when the loop ends, the invariant, together with the reason the loop ended, implies the property we want.
:::

The first two conditions are an induction on the number of iterations: they show that the invariant holds before every iteration and after the last. The third is where the invariant earns its keep. The loop must also *end*; for a `for` loop that is automatic, and for a `while` loop we exhibit a **variant**, a non-negative integer that strictly decreases each iteration (the same idea as in [[programming-1/control-flow]]).

::: theorem Insertion sort is correct {#thm-insertion}
For every input array $A[1..n]$, [[#alg-insertion]] terminates and leaves $A$ holding a sorted permutation of its original contents.
:::

::: proof
**Invariant.** At the start of each iteration of the `for` loop with index $j$, the subarray $A[1..j-1]$ consists of the elements originally in $A[1..j-1]$, in sorted order, and $A[j..n]$ is unchanged.

*Initialisation.* Before the first iteration $j = 2$, and $A[1..1]$ is the single original element $A[1]$, which is sorted.

*Maintenance.* Suppose the invariant holds at the start of the iteration for $j$. Line 2 saves $x = A[j]$. The `while` loop moves $A[j-1], A[j-2], \dots$ one place right for as long as they exceed $x$; it ends with the index $i$ ($0 \le i \le j - 1$) such that either $i = 0$ or $A[i] \le x$, and every original element of positions $i+1..j-1$ was greater than $x$ and now sits one place to the right. (The `while` loop ends because $i$ decreases by one each iteration and the loop stops at $i = 0$ at the latest: $i$ is a variant.) Line 7 puts $x$ into position $i+1$. Now $A[1..i]$ is unchanged and sorted, with $A[i] \le x$ (if $i \ge 1$); position $i+1$ holds $x$; and $A[i+2..j]$ holds the old $A[i+1..j-1]$, still sorted and all $> x$. So $A[1..j]$ is sorted and contains exactly the original $A[1..j]$; $A[j+1..n]$ is untouched. That is the invariant for $j + 1$.

*Termination.* The `for` loop ends with $j = n + 1$. The invariant then says that $A[1..n]$ holds the original elements in sorted order — the postcondition. (For $n \le 1$ the loop body never runs and the claim holds trivially.)
:::

Notice where the conditions of the problem were used: "$A[i] \le x$ or $i = 0$" is exactly what is needed to place $x$ correctly, and the elements are only ever moved, never overwritten without being saved, which gives the permutation half. Notice also that the invariant mentions what has *not* changed ($A[j..n]$); invariants that forget the untouched part are a common reason a maintenance step cannot be proved.

::: example Tracing insertion sort {#ex-insertion-trace}
Run insertion sort on $\langle 5, 2, 4, 6, 1, 3\rangle$, showing the array after each iteration of the outer loop and counting key comparisons ($A[i] > key$).
::: solution
The Python version indexes from 0 and counts comparisons:

```python
def insertion_sort(a):
    """Sort the list a in place; return the number of key comparisons."""
    comparisons = 0
    for j in range(1, len(a)):
        key = a[j]
        i = j - 1
        # invariant: a[0..j-1] holds the original a[0..j-1], sorted
        while i >= 0:
            comparisons += 1
            if a[i] <= key:
                break
            a[i + 1] = a[i]          # shift the larger element right
            i -= 1
        a[i + 1] = key
        print(j, a)
    return comparisons

a = [5, 2, 4, 6, 1, 3]
print("comparisons:", insertion_sort(a))
```

```console
$ python3 ins.py
1 [2, 5, 4, 6, 1, 3]
2 [2, 4, 5, 6, 1, 3]
3 [2, 4, 5, 6, 1, 3]
4 [1, 2, 4, 5, 6, 3]
5 [1, 2, 3, 4, 5, 6]
comparisons: 12
```

After the iteration with (0-based) index $j$ the first $j + 1$ elements are sorted, as the invariant promises. The comparisons per iteration are $1, 2, 1, 4, 4$: inserting $2$ compares only with $5$ and runs off the left end; inserting $6$ stops at once because $5 \le 6$; inserting $1$ passes all four sorted elements.
:::
:::

### Counting the cost

We measure running time in the RAM model: each primitive operation (arithmetic, comparison, assignment, array access) takes constant time, so the running time is proportional to the number of primitive steps. For sorting it is convenient to count **key comparisons**, because every other step of insertion sort is charged to a comparison or to an outer iteration.

When inserting $A[j]$, the `while` loop makes at most $j - 1$ comparisons (one with each of the elements to its left) and at least one. Let $t_j$ be the number it makes. Then

$$
n - 1 \;\le\; C(n) = \sum_{j=2}^{n} t_j \;\le\; \sum_{j=2}^{n} (j-1) = \frac{n(n-1)}{2}.
$$

The lower bound is reached on an already sorted array (every insertion stops at once) and the upper bound on a reverse-sorted array (every insertion goes to the front, making $j - 1$ comparisons). So insertion sort takes $\Theta(n)$ time in the **best case** and $\Theta(n^2)$ in the **worst case**. More precisely, $t_j - 1$ is the number of elements that $A[j]$ jumps over, which is the number of earlier elements greater than it, so $C(n)$ lies between $I$ and $I + n - 1$, where $I$ is the number of **inversions** — pairs $i < j$ with $a_i > a_j$. In our example there are $9$ inversions and $12 = 9 + 3$ comparisons: three insertions (of $4$, $6$ and $3$) stopped at a smaller element, and the insertions of $2$ and $1$ ran off the left end.

::: definition Worst-case, best-case and average-case running time {#def-cases}
For an algorithm whose cost on an input $x$ is $c(x)$, the **worst-case running time** is $T(n) = \max\{c(x) : \lvert x\rvert = n\}$ and the **best-case running time** is the minimum over inputs of size $n$. Given a probability distribution on inputs of each size, the **average-case running time** is the expected value $\E[c(X)]$ for a random input $X$ of size $n$.
:::

Unless we say otherwise, "running time" means worst-case running time: it is a guarantee for every input, and for many algorithms the worst case occurs often. If all $n!$ orders of distinct keys are equally likely, each of the $\binom n2$ pairs is inverted with probability $1/2$, so the expected number of inversions is $n(n-1)/4$ (by linearity of expectation, [Maths Atlas: expectation](/learn/maths/lesson.php?c=probability&l=expectation)): insertion sort is $\Theta(n^2)$ on average too, about half its worst case.

::: quiz
Which of the following is a loop invariant for this loop, which finds the largest element of a non-empty list `a`, and is strong enough to prove that it returns $\max(a)$?

```python
best = a[0]
for k in range(1, len(a)):
    if a[k] > best:
        best = a[k]
```

- [ ] `best` is an element of `a`.
- [x] At the start of the iteration with index `k`, `best` equals the maximum of `a[0..k-1]`.
- [ ] At the start of the iteration with index `k`, `best >= a[k]`.
- [ ] `best` never decreases.
::: solution
The second statement holds initially (`k = 1`, `best = a[0]`), is maintained (after comparing with `a[k]`, `best` is the maximum of `a[0..k]`), and at termination (`k = len(a)`, or no iterations if the list has one element) gives exactly the maximum of the whole list. The first and fourth are true but too weak to conclude anything about the maximum. The third is not even true: `a[k]` may exceed `best`, which is why the `if` is there.
:::
:::

## Recursive algorithms and induction

A recursive algorithm is proved correct by induction on the size of its input: assume that the recursive calls, which are on smaller inputs, return correct answers, and show that the algorithm combines them into a correct answer. This is exactly how one writes recursive functions ([[programming-1/recursion]]); the proof makes the "trust the recursion" step rigorous.

::: algorithm Binary search {#alg-binary-search}
```text
BINARY-SEARCH(A, lo, hi, x)       ▷ A[lo..hi] sorted; is x in it?
1  if lo > hi
2      return NIL                 ▷ empty range
3  mid ← ⌊(lo + hi)/2⌋
4  if A[mid] = x
5      return mid
6  elseif A[mid] < x
7      return BINARY-SEARCH(A, mid + 1, hi, x)
8  else return BINARY-SEARCH(A, lo, mid − 1, x)
```
:::

::: proposition Binary search is correct {#prop-binary-search}
If $A[lo..hi]$ is sorted, `BINARY-SEARCH(A, lo, hi, x)` terminates and returns an index $k$ with $A[k] = x$ if $x$ occurs in $A[lo..hi]$, and NIL otherwise.
:::

::: proof
By strong induction on the length $m = hi - lo + 1$ of the range (with $m \le 0$ meaning empty). If $m \le 0$, line 2 returns NIL, which is correct since the range is empty. Let $m \ge 1$ and assume the claim for all shorter ranges. Then $lo \le mid \le hi$. If $A[mid] = x$ the answer $mid$ is correct. If $A[mid] < x$, then since $A$ is sorted every $A[k]$ with $k \le mid$ is $\le A[mid] < x$, so $x$ occurs in $A[lo..hi]$ if and only if it occurs in $A[mid+1..hi]$. That range is sorted and has length $hi - mid < m$, so by the induction hypothesis the recursive call terminates with the correct answer, which is returned. The case $A[mid] > x$ is symmetric with $A[lo..mid-1]$, of length $mid - lo < m$.
:::

The cost of binary search depends only on the length of the range. Each call does a constant amount of work, $c$, plus at most one call on a range of length at most $\lfloor m/2\rfloor$ (if $m$ is odd both halves have length $(m-1)/2$; if $m$ is even the halves have lengths $m/2 - 1$ and $m/2$). So the worst-case cost satisfies

$$
T(0) = c, \qquad T(m) \le T(\lfloor m/2\rfloor) + c \quad (m \ge 1).
$$

This is our first **recurrence**, and the rest of the chapter is about solving such equations. Unrolling it, $T(m) \le T(\lfloor m/2^k \rfloor) + kc$, and $\lfloor m/2^k\rfloor = 0$ once $2^k > m$, that is for $k = \lfloor\log m\rfloor + 1$. So $T(m) \le c(\lfloor\log m\rfloor + 2) = O(\log m)$.

## Recurrences and the substitution method

::: definition Recurrence {#def-recurrence}
A **recurrence** for a function $T$ on the natural numbers is an equation or inequality that expresses $T(n)$ in terms of values $T(k)$ for $k < n$, together with **base cases** fixing $T$ for small $n$. To **solve** a recurrence in algorithm analysis means to find a closed-form function $g$ with $T(n) = \Theta(g(n))$ (or $O$, $\Omega$ bounds).
:::

Two conventions make algorithmic recurrences manageable. First, base cases are almost always "$T(n) = \Theta(1)$ for $n \le n_0$", because any algorithm takes constant time on inputs of constant size; changing the constant changes $T$ only by a constant factor in the cases we meet. Second, we usually drop floors and ceilings, writing $T(n) = 2T(n/2) + n$ for mergesort instead of $T(n) = T(\lceil n/2\rceil) + T(\lfloor n/2\rfloor) + n$; for the recurrences of this course this does not change the asymptotic solution (CLRS, 4th ed., §4.6, proves this for the master-theorem family). When in doubt, check the solution with the exact recurrence, as we do next.

The **substitution method** has two steps: guess the form of the solution, then prove it by induction, finding the constants on the way. The guess may come from a recursion tree (next section), from a similar recurrence, or from computing values.

::: example A substitution proof {#ex-substitution}
Let $T(1) = 1$ and $T(n) = 2T(\lfloor n/2\rfloor) + n$ for $n \ge 2$. Show that $T(n) \le 2n\log n$ for all $n \ge 2$, so $T(n) = O(n \log n)$.
::: solution
First compute a few values to make the guess plausible:

```python
from functools import cache
from math import log2

@cache
def T(n):
    """T(1) = 1, T(n) = 2 T(floor(n/2)) + n."""
    if n == 1:
        return 1
    return 2 * T(n // 2) + n

for n in [2**4, 2**10, 1000, 10**6]:
    print(n, T(n), round(T(n) / (n * log2(n)), 3))
```

```console
$ python3 rec.py
16 80 1.25
1024 11264 1.1
1000 9120 0.915
1000000 19191232 0.963
```

The ratio $T(n)/(n \log n)$ stays near $1$, so $n\log n$ is the right order. Now the proof, by strong induction on $n \ge 2$.

*Base cases.* The induction step for $n$ uses $\lfloor n/2\rfloor$, which must itself be $\ge 2$ for the hypothesis to apply, so $n \in \{2, 3\}$ (where $\lfloor n/2\rfloor = 1$) are base cases: $T(2) = 2T(1) + 2 = 4 \le 2\cdot 2 \log 2 = 4$ and $T(3) = 2T(1) + 3 = 5 \le 2 \cdot 3\log 3 \approx 9.5$.

*Inductive step.* Let $n \ge 4$, so $m = \lfloor n/2\rfloor \ge 2$, and assume $T(m) \le 2m\log m$. Then, using $m \le n/2$ and $\log(n/2) = \log n - 1$,

$$
T(n) = 2T(m) + n \le 4m\log m + n \le 4\cdot\frac n2 \log\frac n2 + n = 2n\log n - 2n + n \le 2n \log n.
$$
:::
:::

The constant $2$ was chosen so that the base cases worked; the inductive step works for any constant $c \ge 1$ in $T(n) \le cn\log n$, because the step needs $-cn + n \le 0$.

::: warning Do not prove O by changing the constant
A tempting "proof" that the same $T$ is $O(n)$: assume $T(m) \le cm$; then $T(n) \le 2c\lfloor n/2\rfloor + n \le cn + n = O(n)$. This is wrong. The induction hypothesis was the *exact* statement $T(m) \le cm$ with a fixed $c$, and the step must prove the same statement $T(n) \le cn$ with the same $c$; $cn + n$ is not $\le cn$. Writing "$= O(n)$" inside an induction hides that the constant grows at every level of the recursion — here by $1$ per halving, which is where the $\log n$ comes from. In a substitution proof never use $O$ in the inductive hypothesis; state explicit constants.
:::

Sometimes the right guess fails for a fixable reason: the bound is correct but the hypothesis is too weak to carry the induction. For $T(n) = 2T(\lfloor n/2\rfloor) + 1$ the guess $T(n) \le cn$ gives $T(n) \le cn + 1$, which is not $\le cn$; but the stronger guess $T(n) \le cn - 1$ gives $T(n) \le 2(c\lfloor n/2\rfloor - 1) + 1 \le cn - 1$, and the induction goes through. **Subtracting a lower-order term** strengthens the hypothesis; it is the standard repair.

## Recursion trees

A **recursion tree** draws the work of a recurrence: the root is the top-level call, labelled with the non-recursive work $f(n)$ done there, and its children are the recursive calls, each labelled in the same way. The total cost is the sum of all labels, and it is usually easiest to sum **level by level**.

For $T(n) = 2T(n/2) + n$ (with $n$ a power of $2$), level $j$ of the tree has $2^j$ nodes, each for a subproblem of size $n/2^j$, so each level costs $2^j \cdot n/2^j = n$. There are $\log n$ levels of internal nodes above the $n$ leaves, each leaf costing $T(1)$. The total is $n\log n + nT(1) = \Theta(n\log n)$: the levels all cost the same, and there are logarithmically many.

The figure below draws the tree of mergesort on eight elements; step through it with depth-first search to see the order in which the recursive calls are made.

::: widget graph
nodes: n8@4,3; a4@2,2; b4@6,2; a2@1,1; b2@3,1; c2@5,1; d2@7,1; l1@0.5,0; l2@1.5,0; l3@2.5,0; l4@3.5,0; l5@4.5,0; l6@5.5,0; l7@6.5,0; l8@7.5,0
edges: n8>a4; n8>b4; a4>a2; a4>b2; b4>c2; b4>d2; a2>l1; a2>l2; b2>l3; b2>l4; c2>l5; c2>l6; d2>l7; d2>l8
algorithm: dfs
start: n8
caption: The recursion tree of $T(n) = 2T(n/2) + n$ for $n = 8$. The root costs $8$, the two nodes of size $4$ cost $4$ each, the four of size $2$ cost $2$ each, and the eight leaves cost $T(1)$ each: every level costs $8$, and there are $\log 8 = 3$ levels above the leaves. Step through depth-first search: the order of visits is the order of the recursive calls, and the path from the root to the current node is the call stack.
:::

### Unbalanced trees

Recursion trees shine when the subproblems differ in size. Take

$$
T(n) = T(n/3) + T(2n/3) + n.
$$

The root costs $n$; its children cost $n/3$ and $2n/3$, a total of $n$; their four children cost $n/9 + 2n/9 + 2n/9 + 4n/9 = n$; and so on — every *full* level costs $n$. The shortest root-to-leaf path follows the $n/3$ branch and has $\log_3 n$ levels; the longest follows the $2n/3$ branch and has $\log_{3/2} n$ levels. Below depth $\log_3 n$ some branches have ended, so levels cost *at most* $n$. Hence

$$
n\log_3 n \;\le\; T(n) \;\le\; n\log_{3/2} n + (\text{cost of the leaves}).
$$

The number of leaves is not obvious here (it is $\Theta(n)$ when $T(1)$ is the cost of a leaf of size about $1$, but making that precise takes care), which is why one uses the tree for a guess, $T(n) = \Theta(n\log n)$, and then confirms it by substitution: assuming $T(m) \le dm\log m$ for smaller $m$,

$$
T(n) \le d\frac n3\log\frac n3 + d\frac{2n}3\log\frac{2n}{3} + n = dn\log n - dn\Big(\log 3 - \frac23\Big) + n \le dn\log n
$$

as soon as $d \ge 1/(\log 3 - 2/3) \approx 1.09$. The lower bound $T(n) \ge d'n\log n$ is proved the same way.

### Three shapes

Level-by-level sums are often geometric series, and a geometric series is dominated by its largest term. That gives three typical shapes of recursion tree:

- **Root-dominated**: the level costs *decrease* geometrically going down. The total is $\Theta(\text{root}) = \Theta(f(n))$. Example: $T(n) = 3T(n/4) + n^2$, whose level $j$ costs $(3/16)^j n^2$, so $T(n) = \Theta(n^2)$.
- **Balanced**: every level costs about the same; the total is (cost of one level) $\times$ (number of levels). Example: $T(n) = 2T(n/2) + n$, total $\Theta(n\log n)$.
- **Leaf-dominated**: the level costs *increase* geometrically; the total is $\Theta(\text{number of leaves})$. Example: $T(n) = 4T(n/2) + n$, whose level $j$ costs $2^j n$ and which has $4^{\log n} = n^2$ leaves, so $T(n) = \Theta(n^2)$.

::: example A root-dominated tree {#ex-tree}
Use a recursion tree to solve $T(n) = 3T(n/4) + n^2$ for $n$ a power of $4$ with $T(1) = 1$, and check the answer at $n = 16$.
::: solution
Level $j$ has $3^j$ nodes of size $n/4^j$, each costing $(n/4^j)^2$, so level $j$ costs $3^j n^2/16^j = (3/16)^jn^2$. There are $L = \log_4 n$ internal levels and $3^L = n^{\log_4 3}$ leaves costing $1$ each. Hence
$$
T(n) = n^2\sum_{j=0}^{L-1}\Big(\frac{3}{16}\Big)^j + n^{\log_4 3} \le \frac{n^2}{1 - 3/16} + n^{\log_4 3} = \frac{16}{13}n^2 + n^{\log_4 3},
$$
and $T(n) \ge n^2$ from the root alone, so $T(n) = \Theta(n^2)$: the root does a constant fraction of all the work. At $n = 16$: $T(4) = 3T(1) + 16 = 19$ and $T(16) = 3 \cdot 19 + 256 = 313$; the formula gives $n^2(1 + 3/16) + 3^2 = 256 + 48 + 9 = 313$ exactly.
:::
:::

The master theorem turns these three shapes into a rule.

## The master theorem

Divide-and-conquer algorithms that split a problem of size $n$ into $a$ subproblems of size $n/b$ and spend $f(n)$ on dividing and combining have running times

$$
T(n) = aT(n/b) + f(n).
$$ {#eq-master}

The recursion tree has depth $\log_b n$ and $a^{\log_b n} = n^{\log_b a}$ leaves. The **watershed function** $n^{\log_b a}$ — the cost of the leaves — is what $f(n)$ must be compared with.

::: theorem Master theorem {#thm-master}
Let $a \ge 1$ and $b > 1$ be constants, let $f(n)$ be a function that is non-negative for all sufficiently large $n$, and let $T(n)$ be defined on the natural numbers by [[#eq-master]], where $n/b$ may be read as $\lfloor n/b\rfloor$ or $\lceil n/b\rceil$, with $T(n) = \Theta(1)$ for $n$ below some constant. Then:

1. If $f(n) = O(n^{\log_b a - \varepsilon})$ for some constant $\varepsilon > 0$, then $T(n) = \Theta(n^{\log_b a})$.
2. If $f(n) = \Theta(n^{\log_b a}\log^k n)$ for some constant $k \ge 0$, then $T(n) = \Theta(n^{\log_b a}\log^{k+1} n)$.
3. If $f(n) = \Omega(n^{\log_b a + \varepsilon})$ for some constant $\varepsilon > 0$, and $f$ satisfies the **regularity condition** $af(n/b) \le cf(n)$ for some constant $c < 1$ and all sufficiently large $n$, then $T(n) = \Theta(f(n))$.
:::

This is the form proved in CLRS (4th ed., §4.5–4.6). We prove it in the case that shows the idea: $n$ is an exact power of $b$, $T(1) = \Theta(1)$, and the bound on $f$ in each case holds for every argument $n/b^j \ge 1$ (rather than only for large ones). The full proof shows that floors, ceilings and finitely many small arguments change only constant factors.

::: lemma The level sum {#lem-level-sum}
If $n = b^L$ and $T(1) = \Theta(1)$, then
$$
T(n) = \Theta(n^{\log_b a}) + \sum_{j=0}^{L-1} a^j f(n/b^j).
$$ {#eq-level-sum}
:::

::: proof
Level $j$ of the recursion tree ($0 \le j \le L - 1$) has $a^j$ nodes, each of size $n/b^j$ and cost $f(n/b^j)$; level $L$ consists of $a^L$ leaves of size $1$, each costing $T(1) = \Theta(1)$. Since $a^L = a^{\log_b n} = n^{\log_b a}$ (take $\log_b$ of both sides), the leaves cost $\Theta(n^{\log_b a})$. Formally, unrolling [[#eq-master]] $L$ times gives $T(n) = a^L T(1) + \sum_{j<L} a^jf(n/b^j)$, by induction on $L$.
:::

::: proof Proof of the master theorem (exact powers of b)
Write $d = \log_b a$, so $a = b^d$ and $a^j/(b^j)^d = 1$. Let $S = \sum_{j=0}^{L-1}a^jf(n/b^j)$.

*Case 1.* With $f(m) \le Cm^{d - \varepsilon}$,
$$
S \le C\sum_{j=0}^{L-1} a^j\Big(\frac{n}{b^j}\Big)^{d-\varepsilon} = Cn^{d-\varepsilon}\sum_{j=0}^{L-1}(b^{\varepsilon})^j = Cn^{d-\varepsilon}\,\frac{b^{\varepsilon L} - 1}{b^\varepsilon - 1} \le \frac{C}{b^\varepsilon - 1}\,n^{d},
$$
since $b^{\varepsilon L} = n^\varepsilon$. So $S = O(n^d)$, and with [[#lem-level-sum]] $T(n) = \Theta(n^d)$.

*Case 2.* With $c_1 m^d\log^k m \le f(m) \le c_2 m^d\log^k m$ and $\log(n/b^j) = (L - j)\log b$,
$$
S = \Theta\Big(\sum_{j=0}^{L-1} a^j\frac{n^d}{a^j}\big((L-j)\log b\big)^k\Big) = \Theta\Big(n^d \sum_{i=1}^{L} i^k\Big) = \Theta(n^d L^{k+1}) = \Theta(n^d\log^{k+1}n),
$$
using $\sum_{i=1}^L i^k = \Theta(L^{k+1})$ (it lies between $(L/2)^{k}\cdot L/2$ and $L^{k}\cdot L$) and $L = \log_b n = \Theta(\log n)$. The leaves contribute $\Theta(n^d)$, which is smaller.

*Case 3.* Applying the regularity condition $j$ times gives $a^jf(n/b^j) \le c^jf(n)$, so
$$
f(n) \le S \le f(n)\sum_{j=0}^{\infty}c^j = \frac{f(n)}{1 - c}.
$$
So $S = \Theta(f(n))$, and since $f(n) = \Omega(n^{d+\varepsilon})$ dominates the leaves' $\Theta(n^d)$, $T(n) = \Theta(f(n))$.
:::

In words: in case 1 the tree is leaf-dominated, in case 2 balanced (each of the $\log_b n$ levels costs about the same, up to the $\log^k$ factor), and in case 3 root-dominated. The $\varepsilon$ in cases 1 and 3 demands that $f$ be *polynomially* smaller or larger than $n^{\log_b a}$; that is what makes the level costs a geometric series.

::: example Applying the master theorem {#ex-master}
Solve: (a) $T(n) = 9T(n/3) + n$; (b) $T(n) = T(2n/3) + 1$; (c) $T(n) = 3T(n/4) + n\log n$; (d) $T(n) = 2T(n/2) + n\log n$; (e) $T(n) = 7T(n/2) + n^2$.
::: solution
(a) $a = 9$, $b = 3$, $n^{\log_3 9} = n^2$, and $f(n) = n = O(n^{2-\varepsilon})$ with $\varepsilon = 1$. Case 1: $T(n) = \Theta(n^2)$.

(b) $a = 1$, $b = 3/2$, $n^{\log_{3/2}1} = n^0 = 1$, and $f(n) = 1 = \Theta(n^0\log^0 n)$. Case 2 with $k = 0$: $T(n) = \Theta(\log n)$ — binary search on a two-thirds split.

(c) $a = 3$, $b = 4$, $n^{\log_4 3} \approx n^{0.793}$, and $f(n) = n\log n = \Omega(n^{0.793 + \varepsilon})$ with $\varepsilon = 0.2$. Regularity: $3f(n/4) = \frac34 n\log(n/4) \le \frac34 n\log n$, so $c = 3/4$ works. Case 3: $T(n) = \Theta(n\log n)$.

(d) $a = b = 2$, $n^{\log_2 2} = n$, and $f(n) = n\log n = \Theta(n\log^1 n)$. Case 2 with $k = 1$: $T(n) = \Theta(n\log^2 n)$. (Note that case 3 does *not* apply: $n\log n$ is larger than $n$, but not by a polynomial factor $n^\varepsilon$.)

(e) $a = 7$, $b = 2$, $n^{\log_2 7} \approx n^{2.807}$, and $f(n) = n^2 = O(n^{2.807 - \varepsilon})$. Case 1: $T(n) = \Theta(n^{\log_2 7})$. This is Strassen's matrix multiplication, which makes $7$ recursive half-size products instead of $8$.
:::
:::

The figure compares the solutions of three recurrences with $a = 2$, $b = 2$, and different $f$, normalised so that they are equal at $n = 1$: changing $f$ from $1$ to $n$ to $n^2$ moves the recurrence through the three cases.

::: widget plot
f: 2*x - 1; x*log(x)/log(2) + x; 2*x^2 - x
x: 1, 64
y: 0, 1000
labels: T = 2T(n/2) + 1 \;\Rightarrow\; 2n - 1; T = 2T(n/2) + n \;\Rightarrow\; n\log n + n; T = 2T(n/2) + n^2 \;\Rightarrow\; 2n^2 - n
points: 8,15; 16,31; 8,32; 16,80; 8,120; 16,496
caption: Exact solutions for $n$ a power of $2$ and $T(1) = 1$ of three recurrences with the same split ($a = b = 2$, watershed $n^{\log_2 2} = n$). With $f = 1$ the leaves dominate (case 1, $\Theta(n)$); with $f = n$ all levels are equal (case 2, $\Theta(n\log n)$); with $f = n^2$ the root dominates (case 3, $\Theta(n^2)$). The dots are values computed from the recurrences at $n = 8$ and $16$. Hover to compare the curves at larger $n$.
:::

::: warning The master theorem has gaps
The three cases do not cover every $f$. For $T(n) = 2T(n/2) + n/\log n$, the function $f(n) = n/\log n$ is smaller than $n^{\log_2 2} = n$, but not polynomially smaller, so case 1 does not apply; nor do cases 2 (it would need $k = -1$) or 3. (The answer is $\Theta(n\log\log n)$, by summing the recursion tree: level $j$ costs $n/(\log n - j)$, and $\sum_{i=1}^{\log n} n/i = \Theta(n\log\log n)$.) Recurrences with subproblems of different sizes, like $T(n/3) + T(2n/3) + n$, or with subtractive steps, like $T(n) = T(n-1) + n$, are not of the form [[#eq-master]] at all. Check the conditions before quoting the theorem; when they fail, draw the recursion tree.
:::

For recurrences with unequal splits there is a generalisation. The **Akra–Bazzi theorem** (1998, with a refinement by Leighton) applies to $T(x) = g(x) + \sum_{i=1}^k a_iT(b_ix + h_i(x))$ for real $x$ above some threshold, where $a_i > 0$ and $0 < b_i < 1$ are constants, $g$ is non-negative and satisfies a *polynomial-growth condition* (roughly: $g$ changes by at most a constant factor when $x$ changes by a constant factor, as every polynomial and polylogarithmic function does), and the perturbations satisfy $\lvert h_i(x)\rvert = O(x/\log^2 x)$. Let $p$ be the unique real number with $\sum_i a_ib_i^p = 1$. Then
$$
T(x) = \Theta\Big(x^p\Big(1 + \int_1^x \frac{g(u)}{u^{p+1}}\,du\Big)\Big).
$$
For $T(n) = T(n/3) + T(2n/3) + n$ we get $(1/3)^p + (2/3)^p = 1$, so $p = 1$, and $\int_1^n u/u^2\,du = \ln n$, giving $\Theta(n\log n)$ as found above. You will rarely need more than the master theorem, recursion trees and substitution.

::: quiz
Which recurrence does case 3 of the master theorem solve?

- [ ] $T(n) = 4T(n/2) + n^2$
- [ ] $T(n) = 2T(n/2) + n\log n$
- [x] $T(n) = 2T(n/2) + n^2$
- [ ] $T(n) = T(n - 1) + n$
::: solution
For $2T(n/2) + n^2$ the watershed is $n$ and $f(n) = n^2 = \Omega(n^{1+1})$; regularity holds with $c = 1/2$ since $2(n/2)^2 = n^2/2$; so $T(n) = \Theta(n^2)$. $4T(n/2) + n^2$ has watershed $n^2$, so it is case 2: $\Theta(n^2\log n)$. $2T(n/2) + n\log n$ is case 2 with $k = 1$. $T(n-1) + n$ is not of the master form; it sums to $n(n+1)/2 = \Theta(n^2)$ (with $T(0) = 0$).
:::
:::

### Subtract-and-conquer and changes of variable

Two more techniques complete the toolkit.

**Linear recurrences** such as $T(n) = T(n-1) + f(n)$ unroll into sums: $T(n) = T(0) + \sum_{k=1}^n f(k)$. Insertion sort's worst case is $T(n) = T(n-1) + (n-1)$, which sums to $n(n-1)/2$. Recurrences with two or more subtractive calls, like $T(n) = T(n-1) + T(n-2) + 1$ for naive Fibonacci, have exponential solutions and are solved with the characteristic equation ([Maths Atlas: recurrences](/learn/maths/lesson.php?c=discrete&l=recurrences)).

**Changing variables** turns some unusual recurrences into familiar ones. For $T(n) = 2T(\sqrt n) + \log n$, put $n = 2^m$ and $S(m) = T(2^m)$. Then $S(m) = 2S(m/2) + m$, so $S(m) = \Theta(m\log m)$ and $T(n) = \Theta(\log n \log\log n)$.

## In practice

Proofs and asymptotic bounds are not a substitute for testing; they complement it. A loop invariant can be checked at run time with an `assert` during development, turning a proof idea into a test that fails at the first iteration where it breaks. Running time analysis predicts *growth*, and the constants it hides matter on real machines: insertion sort's tight inner loop beats mergesort on small arrays, which is why library sorts such as Python's Timsort use insertion sort for short runs (of up to 64 elements, as of Python 3.12). Measuring the time for $n$ and $2n$ and checking the ratio — about $2$ for $\Theta(n)$, about $4$ for $\Theta(n^2)$ — is a quick empirical check of an analysis, as long as it is labelled as an observation and not a proof.

::: history
Alan Turing's 1949 talk "Checking a large routine" already annotated a program with assertions about its state. Robert Floyd's "Assigning meanings to programs" (1967) and C. A. R. Hoare's "An axiomatic basis for computer programming" (1969) turned the idea into a method: an invariant attached to each loop, proved by induction. Donald Knuth's *The Art of Computer Programming* (from 1968) made the precise analysis of algorithms — counting operations exactly, often with generating functions and recurrences — into a discipline; Knuth popularised the $O$, $\Omega$ and $\Theta$ notation for algorithms in a 1976 article. The general master theorem was given by Jon Bentley, Dorothea Haken and James Saxe in 1980 ("A general method for solving divide-and-conquer recurrences") and named and popularised by the first edition of Cormen, Leiserson and Rivest's *Introduction to Algorithms* (1990). Mohamad Akra and Louay Bazzi published their generalisation in 1998.
:::

## Where this leads

Every algorithm in this course comes with the two arguments practised here. [[algorithms/divide-and-conquer]] applies the master theorem to mergesort, quicksort, Karatsuba multiplication and closest pair; [[algorithms/sorting-selection]] proves a *lower* bound, showing that no comparison sort beats $\Theta(n\log n)$; the graph algorithms of [[algorithms/graph-search]] and [[algorithms/shortest-paths]] are proved correct with invariants about what has been discovered so far; and [[algorithms/dynamic-programming]] replaces exponential recursions by polynomial tables.

::: summary
- An algorithm is **correct** if it terminates on every valid input with an output satisfying the postcondition ([[#def-problem]]).
- A **loop invariant** is proved by initialisation and maintenance (an induction on iterations) and used at termination ([[#def-invariant]]); a decreasing **variant** proves that a `while` loop ends. Insertion sort's invariant is "the prefix holds the original prefix, sorted" ([[#thm-insertion]]).
- Recursive algorithms are proved correct by **strong induction** on the input size ([[#prop-binary-search]]).
- Unless stated, running time means **worst case**; insertion sort is $\Theta(n^2)$ worst and average case and $\Theta(n)$ best case.
- **Substitution**: guess, then prove with explicit constants — never with $O$ inside the induction; strengthen by subtracting a lower-order term.
- **Recursion trees** sum the work level by level; geometric level sums are root-dominated, balanced or leaf-dominated.
- The **master theorem** compares $f(n)$ with $n^{\log_b a}$ ([[#thm-master]]); check its polynomial-gap and regularity conditions.
:::

## Exercises

::: exercise Counting comparisons {level=1 check="15"}
How many key comparisons does insertion sort (as in [[#ex-insertion-trace]]) make on the reverse-sorted list $\langle 6, 5, 4, 3, 2, 1\rangle$? (Enter the number of comparisons.)
::: solution
Each element is smaller than all elements before it, so inserting the element at position $j$ (1-based) compares it with all $j - 1$ earlier elements and it moves to the front. The total is $1 + 2 + 3 + 4 + 5 = 15 = 6 \cdot 5/2$, the worst case. Every one of the $15$ pairs is an inversion.
:::
:::

::: exercise An invariant for summation {level=1}
State and prove a loop invariant showing that this function returns $\sum_{k=0}^{n-1} a_k$ for a list $a$ of length $n$.

```python
def total(a):
    s = 0
    for k in range(len(a)):
        s = s + a[k]
    return s
```
::: solution
*Invariant:* at the start of the iteration with index $k$, $s = \sum_{i=0}^{k-1} a_i$. *Initialisation:* for $k = 0$, $s = 0$, the empty sum. *Maintenance:* if $s = \sum_{i<k}a_i$ before the iteration, then afterwards $s = \sum_{i<k}a_i + a_k = \sum_{i<k+1}a_i$, the invariant for $k + 1$. *Termination:* the loop ends after the iteration with $k = n - 1$, when the invariant for "$k = n$" holds: $s = \sum_{i<n}a_i$. (For $n = 0$ there are no iterations and $s = 0$ is correct.) The `for` loop terminates because it runs over a finite range.
:::
:::

::: exercise Three master-theorem recurrences {level=1}
Solve with the master theorem, saying which case applies: (a) $T(n) = 8T(n/2) + n^2$; (b) $T(n) = 2T(n/4) + \sqrt n$; (c) $T(n) = 2T(n/4) + n$.
::: solution
(a) $n^{\log_2 8} = n^3$, $f(n) = n^2 = O(n^{3-1})$: case 1, $\Theta(n^3)$. (b) $n^{\log_4 2} = n^{1/2}$, $f(n) = \sqrt n = \Theta(n^{1/2}\log^0 n)$: case 2, $\Theta(\sqrt n\log n)$. (c) $n^{1/2}$ again, $f(n) = n = \Omega(n^{1/2 + 1/2})$, and $2f(n/4) = n/2 \le \frac12 f(n)$: case 3, $\Theta(n)$.
:::
:::

::: exercise Exact solution by unrolling {level=2 check="1023"}
Let $T(1) = 1$ and $T(n) = 2T(n/2) + 1$ for $n$ a power of $2$. Find $T(n)$ exactly, prove your formula by induction, and give $T(512)$. (Enter $T(512)$.)
::: solution
Unrolling, $T(n) = 2T(n/2) + 1 = 4T(n/4) + 2 + 1 = \dots = 2^kT(n/2^k) + (2^k - 1)$. With $2^k = n$ this gives $T(n) = n + n - 1 = 2n - 1$. *Proof by induction on $k$ with $n = 2^k$:* $T(1) = 1 = 2 \cdot 1 - 1$; if $T(n/2) = n - 1$ then $T(n) = 2(n - 1) + 1 = 2n - 1$. So $T(512) = 1023$. (This is the number of nodes in a complete binary recursion tree with $512$ leaves.)
:::
:::

::: exercise Where the master theorem fails {level=2}
Explain why the master theorem does not apply to $T(n) = 4T(n/2) + n^2/\log n$ and find the order of $T(n)$ for $n$ a power of $2$ using the level sum [[#eq-level-sum]].
::: solution
The watershed is $n^{\log_2 4} = n^2$, and $f(n) = n^2/\log n$ is smaller, but not by a factor $n^\varepsilon$ (for every $\varepsilon > 0$, $\log n = o(n^\varepsilon)$, so $n^2/\log n$ is not $O(n^{2-\varepsilon})$); case 2 needs $k \ge 0$. With $n = 2^L$, level $j$ costs $4^j(n/2^j)^2/\log(n/2^j) = n^2/(L - j)$, so $S = n^2\sum_{i=1}^{L}1/i = n^2 H_L = \Theta(n^2\log L)$. The leaves cost $\Theta(n^2)$. Hence $T(n) = \Theta(n^2\log\log n)$.
:::
:::

::: exercise A strengthened hypothesis {level=2}
Let $T(1) = 1$ and $T(n) = 2T(\lfloor n/2\rfloor) + 1$. Prove that $T(n) \le 2n - 1$ for all $n \ge 1$, and explain why the hypothesis $T(n) \le cn$ alone does not carry the induction.
::: solution
*Base:* $T(1) = 1 = 2 - 1$. *Step:* for $n \ge 2$, $m = \lfloor n/2\rfloor \ge 1$ and $m < n$; assuming $T(m) \le 2m - 1$, $T(n) \le 2(2m - 1) + 1 = 4m - 1 \le 2n - 1$, since $2m \le n$. With only $T(m) \le cm$ the step gives $T(n) \le 2cm + 1 \le cn + 1$, which exceeds $cn$; the "$+1$" accumulates. Subtracting $1$ in the hypothesis absorbs it.
:::
:::

::: exercise Bubble sort {level=2}
In bubble sort, pass $i = 1, 2, \dots, n-1$ runs $j$ from $1$ to $n - i$ and swaps $A[j]$ and $A[j+1]$ if $A[j] > A[j+1]$. State an invariant for the outer loop, prove that bubble sort is correct, and find its number of comparisons.
::: solution
*Invariant:* before pass $i$, the last $i - 1$ positions $A[n-i+2..n]$ hold the $i - 1$ largest elements in sorted order, and $A$ is a permutation of the input. *Initialisation:* for $i = 1$ the suffix is empty. *Maintenance:* pass $i$ scans $A[1..n-i+1]$; an inner invariant "before the comparison at $j$, $A[j]$ is a maximum of $A[1..j]$" holds initially and is preserved by the compare-and-swap, so after the pass $A[n-i+1]$ is a maximum of $A[1..n-i+1]$, i.e. the $i$-th largest element overall (all larger ones are already in the suffix). It is $\le$ the elements after it, so the suffix of length $i$ is sorted. Swaps preserve the permutation property. *Termination:* after pass $n - 1$ the last $n - 1$ positions hold the $n - 1$ largest elements in order, and the remaining $A[1]$ is the smallest, so $A$ is sorted. Comparisons: $\sum_{i=1}^{n-1}(n - i) = n(n-1)/2$ on every input.
:::
:::

::: exercise A change of variable {level=3}
Solve $T(n) = \sqrt n\,T(\sqrt n) + n$ for $n = 2^{2^k}$ with $T(2) = 1$.
::: hint
Divide by $n$.
:::
::: solution
Let $U(n) = T(n)/n$. Dividing the recurrence by $n$ gives $U(n) = U(\sqrt n) + 1$. Each square root halves $\log n$, so starting from $n = 2^{2^k}$ we reach $n = 2$ after $k$ steps: $U(n) = U(2) + k = \tfrac12 + \log\log n$. Hence $T(n) = n(\log\log n + \tfrac12) = \Theta(n\log\log n)$. Check with $k = 1$: $T(4) = 2T(2) + 4 = 6$ and $4(\log\log 4 + \frac12) = 4 \cdot 1.5 = 6$.
:::
:::

::: exercise The recursion tree for an unequal split {level=3}
Let $T(n) = T(n/4) + T(3n/4) + n$. Use a recursion tree to guess the order of $T$, then prove the upper bound by substitution, and identify the Akra–Bazzi exponent $p$.
::: solution
Every full level costs $n/4 + 3n/4 = n$ times the level's total fraction, which is $1$; the depth lies between $\log_4 n$ and $\log_{4/3}n$, so the guess is $\Theta(n\log n)$. Substitution: assume $T(m) \le dm\log m$ for $m < n$. Then
$$
T(n) \le d\tfrac n4\log\tfrac n4 + d\tfrac{3n}4\log\tfrac{3n}{4} + n = dn\log n - dn\Big(\tfrac14\cdot 2 + \tfrac34\log\tfrac43\Big) + n.
$$
The bracket is $0.5 + 0.75 \cdot 0.415 \approx 0.811$, so the bound holds once $d \ge 1/0.811 \approx 1.23$ (and $d$ is large enough for the base cases). For Akra–Bazzi, $(1/4)^p + (3/4)^p = 1$ gives $p = 1$, and $\int_1^n u/u^2\,du = \ln n$, so $T(n) = \Theta(n\log n)$.
:::
:::

::: exercise Implement and test an invariant {level=2}
Write a Python function `is_sorted_prefix(a, j)` and use it in an `assert` inside the loop of `insertion_sort` to check the invariant of [[#thm-insertion]] at the start of every iteration. Run it on a few hundred random lists. What does the assertion check, and what does it not check?
::: solution
```python
import random

def is_sorted_prefix(a, j):
    return all(a[i] <= a[i + 1] for i in range(j - 1))

def insertion_sort_checked(a):
    original = list(a)
    for j in range(1, len(a)):
        assert is_sorted_prefix(a, j) and sorted(a[:j]) == sorted(original[:j])
        key, i = a[j], j - 1
        while i >= 0 and a[i] > key:
            a[i + 1] = a[i]
            i -= 1
        a[i + 1] = key
    return a

for _ in range(500):
    xs = [random.randint(0, 9) for _ in range(random.randint(0, 12))]
    assert insertion_sort_checked(list(xs)) == sorted(xs)
print("ok")
```

```console
$ python3 checked.py
ok
```

The assertion checks both halves of the invariant (the prefix is sorted, and it holds the same multiset of values as the original prefix) at the start of every iteration, on the inputs tried. It does not prove anything about inputs that were not tried; the proof in [[#thm-insertion]] does. Assertions like this cost time ($\Theta(j\log j)$ per check here) and are for development and testing, not production.
:::
:::
