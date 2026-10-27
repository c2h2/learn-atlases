Suppose you must sort a million exam scripts by candidate number, and you have a hundred helpers. You would not hand the whole pile to one person: you would split it into a hundred piles, have each helper sort a pile, and then merge the sorted piles. The same idea works with one person, recursively: to sort a pile, split it in two, sort each half (by the same method), and merge the two sorted halves. Merging two sorted piles is easy — repeatedly take the smaller of the two top scripts — and it takes time proportional to the size of the piles. The result is an algorithm that sorts $n$ items in time $\Theta(n\log n)$, enormously faster than the $\Theta(n^2)$ of insertion sort: for a million items, about twenty million steps instead of half a trillion.

This is **divide and conquer**: *divide* the problem into smaller subproblems of the same kind, *conquer* them recursively (solving tiny ones directly), and *combine* their solutions into a solution of the whole. Correctness is proved by induction ([[algorithms/correctness-recurrences#prop-binary-search]] was a first example), and the running time is a recurrence, typically solved by the master theorem ([[algorithms/correctness-recurrences#thm-master]]). This chapter develops four classic divide-and-conquer algorithms — mergesort, quicksort, Karatsuba's fast multiplication of integers and the closest pair of points — each illustrating a different lesson: how the cost of combining determines the total, how an unlucky split can ruin an algorithm and how randomness rescues it, how saving one recursive call changes the exponent, and how geometry can make the combine step cheap.

## Mergesort

::: algorithm Merge {#alg-merge}
Given two sorted lists $L$ and $R$, produce a sorted list containing all their elements:

1. Set $i \gets 0$, $j \gets 0$ and let $out$ be empty.
2. While $i < \lvert L\rvert$ and $j < \lvert R\rvert$:
   1. if $L[i] \le R[j]$, append $L[i]$ to $out$ and set $i \gets i + 1$;
   2. otherwise append $R[j]$ to $out$ and set $j \gets j + 1$.
3. Append the remaining elements $L[i..]$ and $R[j..]$ (one of them is empty) and return $out$.
:::

::: lemma Merge is correct and linear {#lem-merge}
If $L$ and $R$ are sorted, [[#alg-merge]] returns a sorted permutation of $L + R$ using at most $\lvert L\rvert + \lvert R\rvert - 1$ comparisons and $\Theta(\lvert L\rvert + \lvert R\rvert)$ time.
:::

::: proof
*Invariant:* at the start of each iteration of step 2, $out$ is sorted and consists of $L[0..i-1]$ and $R[0..j-1]$, and every element of $out$ is $\le$ every element of $L[i..]$ and of $R[j..]$. It holds initially, as $out$ is empty. *Maintenance:* suppose $L[i] \le R[j]$ (the other case is symmetric). Since $L$ is sorted, $L[i] \le L[k]$ for $k > i$, and since $R$ is sorted, $L[i] \le R[j] \le R[k]$ for $k \ge j$. So $L[i]$ is a minimum of the remaining elements; by the invariant it is also $\ge$ everything in $out$, so appending it keeps $out$ sorted, and the third clause holds for the new $i + 1$. *Termination:* the loop ends when one list is exhausted; the other list's remainder is sorted and, by the invariant, $\ge$ everything in $out$, so appending it gives a sorted list containing every element exactly once.

Each comparison appends one element, and the last element is always appended without a comparison, so there are at most $\lvert L\rvert + \lvert R\rvert - 1$ comparisons; all other work is constant per appended element.
:::

::: algorithm Mergesort {#alg-mergesort}
To sort a list $A$ of length $n$: if $n \le 1$, return $A$. Otherwise let $m = \lfloor n/2\rfloor$, sort $A[0..m-1]$ and $A[m..n-1]$ recursively, and return their merge ([[#alg-merge]]).
:::

```python
def merge(left, right):
    """Merge two sorted lists into one sorted list."""
    out, i, j = [], 0, 0
    # invariant: out is the len(out) smallest of left + right, sorted
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:          # <= keeps the sort stable
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]    # one of these is empty

def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
```

```console
$ python3 merge.py
[3, 9, 10, 27, 38, 43, 82]
```

::: theorem Mergesort {#thm-mergesort}
Mergesort returns a sorted permutation of its input, and its worst-case running time is $\Theta(n\log n)$.
:::

::: proof
*Correctness*, by strong induction on $n$. Lists of length $0$ or $1$ are sorted. For $n \ge 2$, both halves have length $\lfloor n/2\rfloor$ and $\lceil n/2\rceil$, both less than $n$, so by the hypothesis the recursive calls return sorted permutations of the halves, and by [[#lem-merge]] their merge is a sorted permutation of the whole.

*Cost.* Splitting (copying the halves) and merging take $\Theta(n)$ time, so for some constants $c_1, c_2 > 0$ and $n \ge 2$,
$$
T(\lfloor n/2\rfloor) + T(\lceil n/2\rceil) + c_1n \le T(n) \le T(\lfloor n/2\rfloor) + T(\lceil n/2\rceil) + c_2n.
$$
This is the master recurrence with $a = 2$, $b = 2$ and $f(n) = \Theta(n) = \Theta(n^{\log_2 2})$: case 2 with $k = 0$ gives $T(n) = \Theta(n\log n)$, on every input of size $n$ — mergesort's best and worst cases are the same order.
:::

::: example Tracing mergesort {#ex-mergesort}
Trace mergesort on $\langle 38, 27, 43, 3, 9, 82, 10\rangle$, showing the merges in the order they happen and counting comparisons.
::: solution
The list splits into $\langle 38, 27, 43\rangle$ and $\langle 3, 9, 82, 10\rangle$; the first into $\langle 38\rangle$ and $\langle 27, 43\rangle$, the second into $\langle 3, 9\rangle$ and $\langle 82, 10\rangle$. The merges, in the order the recursion performs them:

| merge | result | comparisons |
|---|---|---|
| $\langle 27\rangle + \langle 43\rangle$ | $\langle 27, 43\rangle$ | 1 |
| $\langle 38\rangle + \langle 27, 43\rangle$ | $\langle 27, 38, 43\rangle$ | 2 |
| $\langle 3\rangle + \langle 9\rangle$ | $\langle 3, 9\rangle$ | 1 |
| $\langle 82\rangle + \langle 10\rangle$ | $\langle 10, 82\rangle$ | 1 |
| $\langle 3, 9\rangle + \langle 10, 82\rangle$ | $\langle 3, 9, 10, 82\rangle$ | 2 |
| $\langle 27, 38, 43\rangle + \langle 3, 9, 10, 82\rangle$ | $\langle 3, 9, 10, 27, 38, 43, 82\rangle$ | 6 |

The total is $13$ comparisons. In the last merge $3, 9, 10$ are taken from the right (comparing each with $27$), then $27, 38, 43$ from the left (comparing each with $82$), and $82$ is appended without a comparison. The worst case for $n = 7$ is $14$, by [[#ex-mergesort-worst]].
:::
:::

Mergesort is **stable**: equal keys keep their relative order, because `merge` takes from the left list on ties. Its weakness is memory: merging needs an output buffer, so array mergesort uses $\Theta(n)$ extra space. It is the algorithm of choice for linked lists, for external sorting (data on disk, merged in passes), and — as the run-merging core of Timsort — for Python's `sorted`.

## Quicksort

Mergesort does trivial dividing and careful combining. **Quicksort** does the reverse: it *partitions* the array around a **pivot** so that everything smaller comes before it and everything larger after it; then the two parts are sorted recursively *in place*, and there is nothing left to combine.

::: algorithm Lomuto partition {#alg-partition}
```text
PARTITION(A, lo, hi)          ▷ pivot is A[hi]; returns its final index
1  x ← A[hi]
2  i ← lo − 1
3  for j ← lo to hi − 1
4      if A[j] ≤ x
5          i ← i + 1
6          exchange A[i] with A[j]
7  exchange A[i + 1] with A[hi]
8  return i + 1
```
:::

::: lemma Partition {#lem-partition}
`PARTITION(A, lo, hi)` permutes $A[lo..hi]$ and returns an index $q$ with $A[k] \le A[q]$ for $lo \le k < q$ and $A[k] > A[q]$ for $q < k \le hi$, where $A[q]$ is the original $A[hi]$. It makes exactly $hi - lo$ comparisons.
:::

::: proof
*Invariant:* at the start of each iteration with index $j$, the subarray splits into four regions: $A[lo..i] \le x$, $A[i+1..j-1] > x$, $A[j..hi-1]$ not yet examined, and $A[hi] = x$. Initially $i = lo - 1$ and $j = lo$, so the first two regions are empty. *Maintenance:* if $A[j] > x$, incrementing $j$ extends the "$> x$" region. If $A[j] \le x$, then $i$ is incremented and $A[i]$ (the first element of the "$> x$" region, or $A[j]$ itself if that region is empty) is exchanged with $A[j]$: the "$\le x$" region grows by one and the "$> x$" region shifts one place right. *Termination:* at $j = hi$ every element is in one of the first two regions; line 7 puts the pivot between them. Only exchanges are made, so the result is a permutation. Line 4 runs once for each $j$ from $lo$ to $hi - 1$.
:::

::: example Partitioning by hand {#ex-partition}
Partition $\langle 2, 8, 7, 1, 3, 5, 6, 4\rangle$ (pivot $4$), showing $i$ and the array after each value of $j$ (indices from $0$).
::: solution
| $j$ | $A[j]$ | action | $i$ | array |
|---|---|---|---|---|
| 0 | 2 | $\le 4$: $i \gets 0$, swap $A[0]$ with itself | 0 | 2 8 7 1 3 5 6 4 |
| 1 | 8 | $> 4$ | 0 | 2 8 7 1 3 5 6 4 |
| 2 | 7 | $> 4$ | 0 | 2 8 7 1 3 5 6 4 |
| 3 | 1 | $\le 4$: $i \gets 1$, swap $A[1], A[3]$ | 1 | 2 1 7 8 3 5 6 4 |
| 4 | 3 | $\le 4$: $i \gets 2$, swap $A[2], A[4]$ | 2 | 2 1 3 8 7 5 6 4 |
| 5 | 5 | $> 4$ | 2 | 2 1 3 8 7 5 6 4 |
| 6 | 6 | $> 4$ | 2 | 2 1 3 8 7 5 6 4 |

Finally the pivot is swapped into position $i + 1 = 3$: $\langle 2, 1, 3, \mathbf{4}, 7, 5, 6, 8\rangle$, and `PARTITION` returns $3$. The Python version below prints the same result.
:::
:::

```python
import random

def partition(a, lo, hi):
    """Lomuto partition of a[lo..hi] around the pivot a[hi]."""
    pivot, i = a[hi], lo - 1
    for j in range(lo, hi):
        # invariant: a[lo..i] <= pivot < a[i+1..j-1]
        if a[j] <= pivot:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[hi] = a[hi], a[i + 1]
    return i + 1

def quicksort(a, lo=0, hi=None):
    if hi is None:
        hi = len(a) - 1
    if lo < hi:
        r = random.randint(lo, hi)          # random pivot
        a[r], a[hi] = a[hi], a[r]
        p = partition(a, lo, hi)
        quicksort(a, lo, p - 1)
        quicksort(a, p + 1, hi)

a = [2, 8, 7, 1, 3, 5, 6, 4]
print(partition(a, 0, 7), a)
random.seed(1)
b = random.sample(range(1000), 20)
quicksort(b)
print(b == sorted(b))
```

```console
$ python3 quick.py
3 [2, 1, 3, 4, 7, 5, 6, 8]
True
```

Quicksort is correct by strong induction exactly as mergesort is: after partitioning, the pivot is in its final position, everything before it is $\le$ it and everything after is $>$ it, so sorting the two parts (each shorter, by the hypothesis correct) sorts the whole.

### Good splits and bad splits

Quicksort's cost depends on where the pivot lands. If the pivot is always the largest element — which is what happens with the deterministic rule "pivot $= A[hi]$" on an *already sorted* array — then one part is empty and the other has $n - 1$ elements, so

$$
T(n) = T(n - 1) + \Theta(n) \quad\Rightarrow\quad T(n) = \Theta(n^2).
$$

That is the worst case: for any split, $T(n) = \max_{0 \le q \le n-1}\big(T(q) + T(n - 1 - q)\big) + \Theta(n)$, and the substitution $T(m) \le cm^2$ gives $T(n) \le c\max_q\big(q^2 + (n-1-q)^2\big) + dn \le c(n-1)^2 + dn \le cn^2$ for $c \ge d$ (and $n \ge 1$), because $q^2 + (n-1-q)^2$ is a convex function of $q$, maximised at an end point. If instead the pivot always splits evenly, $T(n) = 2T(n/2) + \Theta(n) = \Theta(n\log n)$. Even a lopsided but *proportional* split is fine: if each partition puts at least a tenth of the elements on each side, the recursion tree has depth at most $\log_{10/9}n$ and each level costs at most $cn$, so $T(n) = O(n\log n)$.

The fix for bad inputs is to make the pivot *random*: choose it uniformly among the elements of the subarray, as the code above does. Now no input is bad; only bad luck is, and bad luck is unlikely.

::: theorem Expected comparisons of randomised quicksort {#thm-quicksort}
On any input of $n$ distinct keys, randomised quicksort makes in expectation exactly
$$
\E[C_n] = \sum_{1 \le i < j \le n}\frac{2}{j - i + 1} = 2(n+1)H_n - 4n \;<\; 2n\ln n + 2n
$$
comparisons, where $H_n = \sum_{k=1}^n 1/k$; hence its expected running time is $O(n\log n)$.
:::

::: proof
Name the keys in sorted order $z_1 < z_2 < \dots < z_n$, and let $X_{ij}$ be $1$ if $z_i$ and $z_j$ are ever compared and $0$ otherwise. Every comparison is between a pivot and another element of its subarray, and after partitioning the pivot is never compared again, so each pair is compared at most once and $C_n = \sum_{i<j}X_{ij}$. By linearity of expectation, $\E[C_n] = \sum_{i<j}\Prob(z_i \text{ and } z_j \text{ are compared})$.

Consider the set $Z_{ij} = \{z_i, z_{i+1}, \dots, z_j\}$. As long as no element of $Z_{ij}$ has been a pivot, all of $Z_{ij}$ lies in the same subarray (a pivot outside $Z_{ij}$ is either smaller or larger than all of it). Look at the first moment a pivot is chosen from $Z_{ij}$. If it is $z_i$ or $z_j$, the two are compared at that moment. If it is some $z_k$ with $i < k < j$, then $z_i$ and $z_j$ go to different sides and are never compared. At that moment the pivot is uniform over the current subarray, which contains all of $Z_{ij}$, so conditioned on it lying in $Z_{ij}$ it is uniform over the $j - i + 1$ elements of $Z_{ij}$. Hence $\Prob(X_{ij} = 1) = 2/(j - i + 1)$.

Grouping pairs by $k = j - i + 1$, of which there are $n - k + 1$ for each $k = 2, \dots, n$,
$$
\E[C_n] = \sum_{k=2}^{n}\frac{2(n-k+1)}{k} = 2(n+1)\sum_{k=2}^n\frac1k - 2(n-1) = 2(n+1)(H_n - 1) - 2(n-1) = 2(n+1)H_n - 4n.
$$
Since $H_n \le \ln n + 1$, this is at most $2(n+1)(\ln n + 1) - 4n < 2n\ln n + 2\ln n + 2 - 2n$, which is less than $2n\ln n + 2n$. The running time is proportional to the number of comparisons plus $O(n)$ for the calls, so it is $O(n\log n)$ in expectation.
:::

Here $2n\ln n \approx 1.39\,n\log n$: on average randomised quicksort makes only about $39\%$ more comparisons than the information-theoretic minimum of about $n\log n$ (see [[algorithms/sorting-selection]]), and its inner loop is very fast. An experiment agrees with the formula:

```python
import random

def quicksort_count(a):
    """Randomised quicksort on distinct keys; return the comparisons made."""
    if len(a) <= 1:
        return 0
    pivot = random.choice(a)
    smaller = [x for x in a if x < pivot]
    larger = [x for x in a if x > pivot]
    # each of the other len(a) - 1 elements is compared with the pivot once
    return len(a) - 1 + quicksort_count(smaller) + quicksort_count(larger)

def expected(n):
    H = sum(1 / k for k in range(1, n + 1))
    return 2 * (n + 1) * H - 4 * n

random.seed(2026)
for n in [10, 100, 1000, 10000]:
    trials = 200
    avg = sum(quicksort_count(list(range(n))) for _ in range(trials)) / trials
    print(n, round(avg, 1), round(expected(n), 1))
```

```console
$ python3 qcount.py
10 24.6 24.4
100 644.4 647.9
1000 11054.2 10985.9
10000 156585.0 155771.7
```

The averages over $200$ runs (second column) match the exact expectation (third column) to within a fraction of a per cent. Note that the input here is the *sorted* list `range(n)`, the worst case of deterministic quicksort.

::: widget plot
f: 2*(x + 1)*(log(x) + 0.5772) - 4*x; x*log(x)/log(2); x^2/2
x: 2, 1000
y: 0, 25000
labels: \text{randomised quicksort, expected} \approx 2(n+1)(\ln n + \gamma) - 4n; n\log n; \text{worst case} \approx n^2/2
points: 100,644; 1000,11054
caption: Comparisons made by quicksort. The lowest curve is $n\log n$, roughly what any comparison sort needs; the middle one is the expected count of randomised quicksort (using $H_n \approx \ln n + \gamma$, $\gamma \approx 0.5772$), and the dots are the averages measured above. The steep curve is the worst case $n(n-1)/2$, reached by a deterministic last-element pivot on sorted input. Notice how far below the worst case the expectation lies already for $n$ in the hundreds.
:::

::: warning Expected time is not worst-case time
"Randomised quicksort runs in $O(n\log n)$" is a statement about the *expectation over the algorithm's own random choices*, for every fixed input. It is not an average over inputs, and it is not a worst-case guarantee: with tiny probability an execution makes $\Theta(n^2)$ comparisons. (Large deviations are very unlikely; [[algorithms/randomised-algorithms]] shows how to bound such probabilities.) Deterministic quicksort with a fixed pivot rule has a $\Theta(n^2)$ worst case that is triggered by realistic inputs — sorted or nearly sorted data, or many equal keys with a partition that puts all equal keys on one side. Library implementations defend with random or median-of-three pivots, three-way partitioning for duplicates, and *introsort*, which switches to heapsort if the recursion gets too deep.
:::

::: quiz
Deterministic quicksort with pivot $A[hi]$ and Lomuto partition is run on an array of $n$ *equal* keys. How many comparisons does it make?

- [ ] $\Theta(n)$, since nothing needs to move
- [ ] $\Theta(n\log n)$, since the splits are even
- [x] $\Theta(n^2)$, since every partition puts all elements on one side
- [ ] It does not terminate
::: solution
Every element satisfies $A[j] \le x$, so `PARTITION` returns $q = hi$: the left part has $n - 1$ elements and the right part none. The recurrence is $C(n) = C(n-1) + (n - 1)$, so $C(n) = n(n-1)/2$. Randomising the pivot does not help here, since all pivots are equal; a three-way partition (into $<$, $=$, $>$) does.
:::
:::

## Multiplying large integers

The school method multiplies two $n$-digit numbers with $n^2$ digit-by-digit products. In 1960 Andrey Kolmogorov conjectured that $\Theta(n^2)$ digit operations are necessary; within a week of hearing the conjecture, the student Anatoly Karatsuba found a faster method.

Split each $n$-digit number into high and low halves of $m = \lfloor n/2\rfloor$ digits: $x = x_1 10^m + x_0$ and $y = y_1 10^m + y_0$. Then

$$
xy = x_1y_1\,10^{2m} + (x_1y_0 + x_0y_1)\,10^m + x_0y_0.
$$ {#eq-split}

Computing the four products $x_1y_1, x_1y_0, x_0y_1, x_0y_0$ recursively gives $T(n) = 4T(n/2) + \Theta(n)$ (the additions and shifts are linear), which by the master theorem is $\Theta(n^{\log_2 4}) = \Theta(n^2)$ — no gain. Karatsuba's observation is that the middle coefficient needs only *one* extra product:

$$
x_1y_0 + x_0y_1 = (x_1 + x_0)(y_1 + y_0) - x_1y_1 - x_0y_0.
$$ {#eq-karatsuba}

::: algorithm Karatsuba multiplication {#alg-karatsuba}
To multiply non-negative integers $x$ and $y$ of at most $n$ digits: if $n = 1$, multiply directly. Otherwise split as in [[#eq-split]], compute recursively $z_2 = x_1y_1$, $z_0 = x_0y_0$ and $z_1 = (x_1 + x_0)(y_1 + y_0) - z_2 - z_0$, and return $z_2\,10^{2m} + z_1 10^m + z_0$.
:::

::: theorem Karatsuba's bound {#thm-karatsuba}
[[#alg-karatsuba]] multiplies two $n$-digit integers in $\Theta(n^{\log_2 3}) = O(n^{1.585})$ digit operations.
:::

::: proof
Correctness is [[#eq-split]] and [[#eq-karatsuba]], by induction on $n$. Each call makes three recursive multiplications of numbers with at most $\lceil n/2\rceil + 1$ digits (the sums $x_1 + x_0$ may have one extra digit) and $\Theta(n)$ work for additions, subtractions and shifts. So $T(n) = 3T(n/2 + O(1)) + \Theta(n)$. The $+O(1)$ does not change the solution (it is absorbed by the floors-and-ceilings argument of CLRS §4.6, or by substituting $S(n) = T(n + 2)$), and the master theorem with $a = 3$, $b = 2$, $f(n) = \Theta(n) = O(n^{\log_2 3 - \varepsilon})$ gives case 1: $T(n) = \Theta(n^{\log_2 3})$.
:::

::: example Karatsuba by hand {#ex-karatsuba}
Multiply $1234 \times 5678$ by [[#alg-karatsuba]].
::: solution
Here $n = 4$, $m = 2$: $x_1 = 12$, $x_0 = 34$, $y_1 = 56$, $y_0 = 78$.

- $z_2 = 12 \times 56 = 672$ (recursively: $1\cdot5 = 5$, $2\cdot6 = 12$, $(1+2)(5+6) - 5 - 12 = 16$, so $500 + 160 + 12 = 672$);
- $z_0 = 34 \times 78 = 2652$;
- $z_1 = (12 + 34)(56 + 78) - 672 - 2652 = 46 \times 134 - 3324 = 6164 - 3324 = 2840$.

So $xy = 672 \cdot 10^4 + 2840 \cdot 10^2 + 2652 = 6\,720\,000 + 284\,000 + 2\,652 = 7\,006\,652$. Three multiplications of two-digit numbers replaced four. In Python:

```python
def karatsuba(x, y):
    """Multiply non-negative integers with three half-size products."""
    if x < 10 or y < 10:
        return x * y                         # one-digit base case
    m = max(len(str(x)), len(str(y))) // 2
    p = 10 ** m
    x1, x0 = divmod(x, p)                    # x = x1*10^m + x0
    y1, y0 = divmod(y, p)
    z2 = karatsuba(x1, y1)
    z0 = karatsuba(x0, y0)
    z1 = karatsuba(x1 + x0, y1 + y0) - z2 - z0   # = x1*y0 + x0*y1
    return z2 * p * p + z1 * p + z0

print(karatsuba(1234, 5678), 1234 * 5678)
import random
random.seed(7)
x, y = random.getrandbits(2000), random.getrandbits(2000)
print(karatsuba(x, y) == x * y)
```

```console
$ python3 kara.py
7006652 7006652
True
```

(This version splits by decimal digits for readability; real implementations split by machine words and switch to the school method below a cut-off of a few dozen words, where its lower overhead wins.)
:::
:::

The gap between $n^2$ and $n^{1.585}$ is large: for $n = 10^6$ digits it is a factor of about $300$. The same trick — trading multiplications for additions — gives Strassen's matrix multiplication (1969), with $T(n) = 7T(n/2) + \Theta(n^2) = \Theta(n^{\log_2 7}) \approx \Theta(n^{2.81})$.

::: widget plot
f: x^2; x^(log(3)/log(2))
x: 1, 100
labels: \text{school method } n^2; \text{Karatsuba } n^{\log_2 3}
caption: Digit multiplications for two $n$-digit numbers: $n^2$ for the school method and $3^{\log_2 n} = n^{\log_2 3}$ for Karatsuba (for $n$ a power of $2$, with one-digit base cases). At $n = 64$ the counts are $4096$ and $729$. Only the exponent of the leaves changed — from $\log_2 4 = 2$ to $\log_2 3 \approx 1.585$ — because one of four recursive calls was saved at every level.
:::

## The closest pair of points

Given $n \ge 2$ points in the plane, find the smallest distance between two of them. Comparing all pairs takes $\Theta(n^2)$ time. Divide and conquer does better, and the interesting part is the combine step.

Sort the points by $x$-coordinate and split them by a vertical line $x = x_m$ into a left half $L$ and a right half $R$ of $\lceil n/2\rceil$ and $\lfloor n/2\rfloor$ points. Recursively find the smallest distances $d_L$ and $d_R$ within each half, and let $d = \min(d_L, d_R)$. The closest pair overall is either within a half — then its distance is $d$ — or it has one point in each half, with distance less than $d$. Any such pair lies in the **strip** of points with $\lvert x - x_m\rvert < d$. The strip may contain almost every point, but a packing argument shows that each point needs to be compared with only a few others.

::: lemma The strip {#lem-strip}
Let $S$ be the points of the strip sorted by $y$-coordinate. If two points $p, q \in S$ have distance less than $d$, then fewer than $8$ positions separate them in $S$: at most $7$ points follow $p$ in $S$ before $q$ is reached (inclusive).
:::

::: proof
Suppose $p$ comes before $q$ in $S$, so $0 \le q_y - p_y < d$. Every point of $S$ from $p$ to $q$ in the sorted order lies in the rectangle $[x_m - d, x_m + d] \times [p_y, p_y + d]$. Divide this rectangle into $8$ squares of side $d/2$: four on the left of the line, four on the right (points on the line belong to the side of the half they came from). Two points in the same square are at distance at most $(d/2)\sqrt2 < d$; but two points of the same half are at distance at least $d$. So each square holds at most one point, and the rectangle at most $8$ points, $p$ included. Hence $q$ is among the $7$ points after $p$ in $S$.
:::

::: algorithm Closest pair {#alg-closest}
Presort the points by $x$ (list $P_x$) and by $y$ (list $P_y$). Then, recursively on $(P_x, P_y)$:

1. If $n \le 3$, compare all pairs.
2. Otherwise split $P_x$ at its middle point $x_m$ into $L$ and $R$, and split $P_y$ into $L_y$ and $R_y$ (the points of each half in $y$-order) by one scan.
3. Recurse on both halves; let $d$ be the smaller result.
4. Scan $P_y$ to form the strip $S$ of points with $\lvert x - x_m\rvert < d$, in $y$-order; compare each point of $S$ with the next $7$ and return the smallest distance found (or $d$).
:::

::: theorem Closest pair in O(n log n) {#thm-closest}
[[#alg-closest]] returns the smallest distance between two of $n$ distinct points in $O(n\log n)$ time.
:::

::: proof
Correctness is by induction on $n$: the halves are solved correctly by hypothesis, and by [[#lem-strip]] every cross pair at distance less than $d$ is examined in step 4. Presorting takes $O(n\log n)$. Each call does $O(n)$ work besides recursion — splitting $P_y$, building the strip and at most $7\lvert S\rvert$ distance computations — so $T(n) = 2T(n/2) + O(n) = O(n\log n)$ by the master theorem.
:::

Without the presorted $P_y$, sorting the strip inside every call would give $T(n) = 2T(n/2) + O(n\log n) = O(n\log^2n)$ (case 2 with $k = 1$) — still good, but keeping lists sorted *through* the recursion is a recurring trick.

```python
from math import dist, inf

def closest_pair(points):
    """Smallest distance between two of the points (at least two, distinct)."""
    px = sorted(points)                          # by x, then y
    py = sorted(points, key=lambda p: p[1])      # by y
    return _closest(px, py)

def _closest(px, py):
    n = len(px)
    if n <= 3:                                   # brute force small cases
        return min(dist(p, q) for i, p in enumerate(px) for q in px[i + 1:])
    mid = n // 2
    xm = px[mid][0]
    left = set(px[:mid])
    ly = [p for p in py if p in left]            # keep each half sorted by y
    ry = [p for p in py if p not in left]
    d = min(_closest(px[:mid], ly), _closest(px[mid:], ry))
    strip = [p for p in py if abs(p[0] - xm) < d]
    for i, p in enumerate(strip):                # compare with the next 7 only
        for q in strip[i + 1:i + 8]:
            d = min(d, dist(p, q))
    return d

pts = [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4)]
print(round(closest_pair(pts), 4))
```

```console
$ python3 closest.py
1.4142
```

::: example Closest pair on six points {#ex-closest}
Follow the algorithm on the six points of the listing above.
::: solution
Sorted by $x$: $(2,3), (3,4), (5,1), (12,10), (12,30), (40,50)$. The split is at index $3$, $x_m = 12$: $L = \{(2,3), (3,4), (5,1)\}$ and $R = \{(12,10), (12,30), (40,50)\}$. Both halves have three points and are solved by brute force: in $L$, $d((2,3),(3,4)) = \sqrt2 \approx 1.414$, $d((2,3),(5,1)) = \sqrt{13}$, $d((3,4),(5,1)) = \sqrt{13}$, so $d_L = \sqrt2$; in $R$, $d_R = 20$ (between $(12,10)$ and $(12,30)$). So $d = \sqrt 2$. The strip $\lvert x - 12\rvert < \sqrt2$ contains only $(12,10)$ and $(12,30)$, at distance $20$; no improvement, and the answer is $\sqrt2 \approx 1.4142$.
:::
:::

## Designing divide-and-conquer algorithms

The four algorithms share a pattern and teach four lessons about it.

- **The combine step decides the cost.** With two halves, a linear combine gives $\Theta(n\log n)$ and a quadratic one $\Theta(n^2)$; the master theorem tells you how cheap combining must be. Closest pair is fast because geometry makes the combine linear.
- **Balance matters.** Splitting into pieces of a constant *fraction* of $n$ gives logarithmic depth; splitting off a constant number of elements gives linear depth. Quicksort is fast only when its splits are proportional, which randomness makes likely.
- **The number of subproblems sets the exponent.** For $T(n) = aT(n/2) + \Theta(n)$ the answer is $\Theta(n^{\log_2 a})$ when $a > 2$; saving one recursive call, as Karatsuba and Strassen do, lowers the exponent.
- **Small cases should use simple methods.** Recursion has overhead, so practical implementations stop at a cut-off (around $16$ to $64$ elements for sorting) and use insertion sort or brute force there. This changes the constant, not the order.

::: quiz
A divide-and-conquer algorithm splits a problem of size $n$ into $5$ subproblems of size $n/3$ and spends $\Theta(n^2)$ time combining. What is its running time?

- [ ] $\Theta(n^{\log_3 5})$
- [x] $\Theta(n^2)$
- [ ] $\Theta(n^2\log n)$
- [ ] $\Theta(n^{5/3})$
::: solution
$n^{\log_3 5} \approx n^{1.465}$, and $f(n) = n^2$ is polynomially larger. Regularity: $5(n/3)^2 = \frac59 n^2$, so $c = 5/9 < 1$. Case 3 gives $\Theta(n^2)$: the combining at the root dominates.
:::
:::

::: history
John von Neumann described mergesort in 1945, as a test program for the stored-program EDVAC design; it was one of the first programs written for a stored-program computer. C. A. R. Hoare invented quicksort in 1959–60 while working on machine translation in Moscow and at Elliott Brothers; it was published as Algorithms 63 (PARTITION) and 64 (QUICKSORT) in *Communications of the ACM* in 1961, with a full analysis in "Quicksort" in *The Computer Journal* (1962). The partition scheme used above is due to Nico Lomuto and was popularised by Jon Bentley's *Programming Pearls* (1986). Anatoly Karatsuba found his multiplication algorithm in 1960; it was published with Yuri Ofman in 1962. Volker Strassen's $O(n^{2.81})$ matrix multiplication appeared in 1969, and the $O(n\log n)$ closest-pair algorithm in Michael Shamos and Dan Hoey's "Closest-point problems" (1975), a founding paper of computational geometry. Integer multiplication has since been brought down to $O(n\log n)$ bit operations by David Harvey and Joris van der Hoeven (published 2021) — a theoretical result whose constant makes it impractical.
:::

## Where this leads

[[algorithms/sorting-selection]] shows that mergesort's $\Theta(n\log n)$ cannot be beaten by any comparison sort, and adapts quicksort's partition into linear-time selection. [[algorithms/randomised-algorithms]] develops the probabilistic reasoning of [[#thm-quicksort]] into a general method. [[algorithms/dynamic-programming]] handles recursions whose subproblems *overlap*, where plain divide and conquer would repeat work exponentially. Fast Fourier transforms, the basis of fast polynomial and integer multiplication and of signal processing, are a divide-and-conquer algorithm on the same pattern.

::: summary
- **Divide and conquer**: divide into subproblems of the same kind, solve them recursively, combine. Prove correctness by induction; solve the cost recurrence with the master theorem.
- **Mergesort** merges sorted halves in linear time ([[#lem-merge]]) and sorts in $\Theta(n\log n)$ in every case ([[#thm-mergesort]]); it is stable but needs $\Theta(n)$ extra space.
- **Quicksort** partitions in place around a pivot ([[#lem-partition]]). Its worst case is $\Theta(n^2)$, but with a random pivot the expected number of comparisons is $2(n+1)H_n - 4n \approx 1.39\,n\log n$ on every input ([[#thm-quicksort]]).
- **Karatsuba** multiplies $n$-digit integers with three half-size products, in $\Theta(n^{\log_2 3})$ ([[#thm-karatsuba]]).
- **Closest pair** is solved in $O(n\log n)$ because only $7$ neighbours in the strip need checking ([[#lem-strip]]).
- The cost of combining, the balance of the split and the number of subproblems determine the running time.
:::

## Exercises

::: exercise Merge comparisons {level=1 check="7"}
How many comparisons does [[#alg-merge]] make when merging $\langle 1, 4, 6, 9\rangle$ and $\langle 2, 3, 7, 8\rangle$? (Enter the number of comparisons.)
::: solution
The output is built as $1$ ($1$ vs $2$), $2$ ($4$ vs $2$), $3$ ($4$ vs $3$), $4$ ($4$ vs $7$), $6$ ($6$ vs $7$), $7$ ($9$ vs $7$), $8$ ($9$ vs $8$); then the right list is exhausted and $9$ is appended without a comparison. That is $7 = 4 + 4 - 1$ comparisons, the maximum.
:::
:::

::: exercise Mergesort's worst case {#ex-mergesort-worst level=2 check="17"}
Let $M(n)$ be the maximum number of comparisons made by mergesort on $n$ elements, so $M(1) = 0$ and $M(n) = M(\lfloor n/2\rfloor) + M(\lceil n/2\rceil) + n - 1$. Compute $M(8)$, and check that $M(n) = n\lceil\log n\rceil - 2^{\lceil\log n\rceil} + 1$ for $n = 7$ and $n = 8$. (Enter $M(8)$.)
::: solution
$M(2) = 0 + 0 + 1 = 1$, $M(4) = 1 + 1 + 3 = 5$, $M(8) = 5 + 5 + 7 = 17$. Also $M(3) = M(1) + M(2) + 2 = 3$ and $M(7) = M(3) + M(4) + 6 = 14$. The formula gives $8 \cdot 3 - 8 + 1 = 17$ and $7 \cdot 3 - 8 + 1 = 14$. The worst case is attained when every merge interleaves its inputs completely.
:::
:::

::: exercise Quicksort on sorted input {level=1}
Show that deterministic quicksort with pivot $A[hi]$ makes exactly $n(n-1)/2$ comparisons on the sorted array $\langle 1, 2, \dots, n\rangle$, and that a pivot taken from the *middle* position, $A[\lfloor(lo + hi)/2\rfloor]$, makes $\Theta(n\log n)$ comparisons on it.
::: solution
With pivot $A[hi] = n$, every element is smaller, so the left part is $\langle 1, \dots, n-1\rangle$ — sorted again — and the right part empty. Partitioning $m$ elements makes $m - 1$ comparisons, so the total is $\sum_{m=1}^n (m-1) = n(n-1)/2$. With the middle pivot of a sorted subarray, the pivot is its median, so the parts have sizes $\lfloor (m-1)/2\rfloor$ and $\lceil (m-1)/2\rceil$ and are themselves sorted; the recurrence is $C(m) = C(\lfloor(m-1)/2\rfloor) + C(\lceil(m-1)/2\rceil) + m - 1 = \Theta(m\log m)$ by the master theorem. (Moving the middle element to $A[hi]$ before partitioning keeps the left part sorted, so the argument repeats.)
:::
:::

::: exercise Expected comparisons for small n {level=2 check="29/6"}
Compute the exact expected number of comparisons made by randomised quicksort on $4$ distinct keys, both from [[#thm-quicksort]] and directly. (Enter the expectation as a fraction.)
::: solution
From the formula: $H_4 = 25/12$, so $\E[C_4] = 2 \cdot 5 \cdot 25/12 - 16 = 125/6 - 96/6 = 29/6 \approx 4.83$. Directly: the first partition makes $3$ comparisons; the pivot has rank $1, 2, 3$ or $4$ with probability $1/4$ each, leaving subproblems of sizes $(0,3), (1,2), (2,1), (3,0)$. With $\E[C_0] = \E[C_1] = 0$, $\E[C_2] = 1$ and $\E[C_3] = 2 + \frac13(\E[C_2] + 0 + \E[C_2]) = 2 + \frac23 = \frac83$, we get $\E[C_4] = 3 + \frac14\big(\frac83 + 1 + 1 + \frac83\big) = 3 + \frac14 \cdot \frac{22}{3} = 3 + \frac{11}6 = \frac{29}6$.
:::
:::

::: exercise Ternary Karatsuba {level=2}
Splitting each number into three parts, the product of two degree-2 polynomials can be computed with $5$ multiplications instead of $9$ (Toom–Cook). What is the running time of the resulting recursive algorithm, and is it better than Karatsuba's?
::: solution
$T(n) = 5T(n/3) + \Theta(n)$, which by case 1 is $\Theta(n^{\log_3 5}) \approx \Theta(n^{1.465})$. Since $\log_3 5 \approx 1.465 < \log_2 3 \approx 1.585$, it is asymptotically better, though the additions and the extra bookkeeping (divisions by small constants in the interpolation) give it a larger constant; libraries use it for numbers of intermediate size above Karatsuba's range.
:::
:::

::: exercise Counting inversions {level=2}
An inversion of $\langle a_0, \dots, a_{n-1}\rangle$ is a pair $i < j$ with $a_i > a_j$. Modify mergesort to count inversions in $O(n\log n)$ time, and test it on $\langle 5, 2, 4, 6, 1, 3\rangle$ (which has $9$ inversions).
::: solution
Every inversion either lies within a half or crosses the split. Crossing inversions are counted during the merge: when an element of the right half is output, it is smaller than all elements still waiting in the left half, so it forms an inversion with each of them.

```python
def sort_count(a):
    """Return (sorted copy of a, number of inversions in a)."""
    if len(a) <= 1:
        return a, 0
    mid = len(a) // 2
    left, x = sort_count(a[:mid])
    right, y = sort_count(a[mid:])
    out, i, j, cross = [], 0, 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
            cross += len(left) - i       # right[j] beats all remaining left
    return out + left[i:] + right[j:], x + y + cross

print(sort_count([5, 2, 4, 6, 1, 3]))
```

```console
$ python3 inv.py
([1, 2, 3, 4, 5, 6], 9)
```

The recurrence is mergesort's, so the time is $\Theta(n\log n)$. Ties are not inversions, which is why equal elements are taken from the left.
:::
:::

::: exercise Maximum subarray {level=3}
Given a list of integers (possibly negative), find the largest sum of a contiguous non-empty sublist. Design a divide-and-conquer algorithm running in $O(n\log n)$, prove it correct, and then explain how the combine step can be made $O(1)$ by returning more information from each call, giving $O(n)$.
::: solution
Split at the middle. The best sublist lies in the left half, in the right half, or crosses the middle. A crossing sublist is a suffix of the left half followed by a prefix of the right half, and its sum is maximised by taking the best suffix sum of the left (computed by one scan leftwards from the middle) plus the best prefix sum of the right (one scan rightwards). Correctness: every sublist is of one of the three kinds, and each kind's best is found (two by induction, one by the scans). The combine takes $O(n)$, so $T(n) = 2T(n/2) + O(n) = O(n\log n)$.

For $O(n)$, let each call return four numbers for its segment: the total $t$, the best prefix sum $p$, the best suffix sum $s$ and the best sublist sum $b$. For a segment made of $A$ followed by $B$: $t = t_A + t_B$, $p = \max(p_A, t_A + p_B)$, $s = \max(s_B, t_B + s_A)$, $b = \max(b_A, b_B, s_A + p_B)$ — each case analysis is exhaustive, as above. Now the combine is $O(1)$, $T(n) = 2T(n/2) + O(1) = O(n)$ by case 1. (Kadane's one-pass algorithm also solves it in $O(n)$.)
:::
:::

::: exercise Closest pair on a line {level=3}
(a) In [[#lem-strip]], why do the squares have side $d/2$ rather than $d$? (b) For $n$ points on a *line* (real numbers), show that the closest pair is adjacent in sorted order, giving an $O(n\log n)$ algorithm. In the one-dimensional version of [[#alg-closest]], how many points of the "strip" $\lvert x - x_m\rvert < d$ can there be?
::: solution
(a) The argument needs each square to contain at most one point of a half. Two points in a square of side $s$ are at distance at most $s\sqrt2$, which is less than $d$ for $s = d/2$ but not for $s = d$; a square of side $d$ could hold two points of the same half at distance exactly $d$ (or up to $d\sqrt2$), so no bound on the number of points would follow.

(b) Let $x_1 \le x_2 \le \dots \le x_n$ be the sorted points. For $i < j$, $x_j - x_i = \sum_{k=i}^{j-1}(x_{k+1} - x_k) \ge x_{i+1} - x_i$, so some adjacent pair is at least as close as any pair. Sorting and one scan of the $n - 1$ gaps take $O(n\log n)$. In the divide-and-conquer version the left half's points are $\le x_m$ and pairwise at least $d$ apart, so at most one of them lies in $(x_m - d, x_m]$; similarly at most one right-half point lies in $[x_m, x_m + d)$. The strip holds at most $2$ points — the one-dimensional analogue of the $8$ squares.
:::
:::

::: exercise Recursion depth of quicksort {level=3}
(a) What is the probability that a uniformly random pivot splits $n$ distinct keys so that both sides have at least $n/4$ elements? Use it to explain why the recursion depth of randomised quicksort is typically $O(\log n)$. (b) Show that if each call recurses on the *smaller* part and handles the larger part by a loop, at most $\lfloor\log n\rfloor + 1$ stack frames are ever active, *whatever* the pivots.
::: solution
(a) A pivot gives both sides at least $n/4$ elements when its rank lies in the middle half, which happens with probability about $1/2$ (the pivot ranks $r$ with $n/4 + 1 \le r \le 3n/4$ — the left side has $r - 1$ elements and the right side $n - r$ — about $n/2$ of the $n$ ranks). Along any root-to-leaf path, each such "good" split multiplies the size by at most $3/4$, so after $\log_{4/3}n$ good splits the subproblem has size $1$; since about half the splits are good, a path has length about $2\log_{4/3}n = O(\log n)$ in typical runs (making "with high probability" precise uses a Chernoff bound, as in [[algorithms/randomised-algorithms]]). (b) If each call recurses only on the smaller part and handles the larger part by updating $lo$ or $hi$ and looping, then each stack frame is for a subarray at most half the size of its parent's, so the $k$-th active frame has a subarray of at most $n/2^{k-1}$ elements; since a call on fewer than $2$ elements does not recurse, at most $\lfloor\log n\rfloor + 1$ frames are ever active, whatever the pivots. The running time is unchanged.
:::
:::
