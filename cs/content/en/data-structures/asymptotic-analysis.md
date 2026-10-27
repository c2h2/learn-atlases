Suppose two programs answer the same question — "does this list of numbers contain two values that add up to zero?" — and on a list of a thousand numbers both reply in a blink. Which is better? Run them on a million numbers and the difference appears: one finishes in under a second, the other takes the better part of an hour. Nothing about the two programs changed; only the size of the input did. What separates them is how their running time *grows* as the input grows.

This chapter develops the language computer scientists use to talk about that growth. We first decide what to count — a **cost model** — and learn to count it for loops and nested loops. Then we throw away the details that depend on the machine and keep only the shape of the growth, using the notations $O$, $\Omega$ and $\Theta$. Finally we separate worst, best and average cases, and see how measured running times relate to the mathematics. Every later chapter of this course states the cost of each operation in this language, so it is worth learning it carefully.

## Counting operations

The running time of a program in seconds depends on the processor, the compiler or interpreter, the memory system, and what else the machine is doing. Those details change every year; we want statements that do not. So instead of measuring seconds we count **elementary operations**, each assumed to take a fixed amount of time.

::: definition The RAM cost model {#def-ram}
In the **random-access machine (RAM) model**, memory is an array of cells, each holding one machine word (an integer of $O(\log n)$ bits, a reference, or a floating-point number), and each of the following takes one unit of time: an arithmetic or logical operation on words, a comparison, reading or writing a memory cell at a given address, assigning to a variable, a jump, and calling or returning from a function. The **cost** of an algorithm on an input is the number of unit operations it performs. The **input size** $n$ is a measure of the input fixed in advance — usually the number of items (list elements, characters, vertices).
:::

Two things in this definition matter more than they look. First, *reading any cell at a given address costs the same*: `a[0]` and `a[999999]` are equally cheap. That is what "random access" means, and it is roughly true of real memory (see the caveat about caches in [[data-structures/arrays-lists]]). Second, words are of bounded size, so adding two 64-bit integers is one step, but adding two numbers with a million digits is not. Python hides this second point — its integers grow without limit — so when a Python program does arithmetic on huge numbers the unit-cost assumption fails and we must count digit operations instead.

In practice we rarely count *every* operation. We pick one operation that is executed at least as often as any other, up to a constant factor — a comparison, an iteration of the inner loop, a probe of a table — and count that. The total cost is then within a constant factor of the count, which (as we shall see) is all the precision we keep.

::: example Counting the comparisons in a double loop {#ex-pairs}
How many times is the test `a[i] + a[j] == 0` evaluated by the following function on a list of length $n$?

```python
def count_pairs(a):
    """Number of pairs i < j with a[i] + a[j] == 0, and the number of comparisons made."""
    n = len(a)
    found = comparisons = 0
    for i in range(n):
        for j in range(i + 1, n):
            comparisons += 1
            if a[i] + a[j] == 0:
                found += 1
    return found, comparisons

for n in [10, 100, 1000]:
    a = list(range(-n // 2, n - n // 2))   # n distinct integers around 0
    print(n, count_pairs(a))
```
::: solution
For a fixed $i$ the inner loop runs over $j = i+1, \dots, n-1$, that is $n - 1 - i$ times. Summing over $i = 0, \dots, n-1$,

$$
\sum_{i=0}^{n-1} (n-1-i) = (n-1) + (n-2) + \dots + 1 + 0 = \frac{n(n-1)}{2}.
$$

For $n = 10, 100, 1000$ this is $45$, $4950$ and $499\,500$, which is what the program reports:

```console
$ python3 pairs.py
10 (4, 45)
100 (49, 4950)
1000 (499, 499500)
```

Every other statement in the inner loop runs the same number of times, and the statements outside it run $O(n)$ times, so the total number of unit operations is $c_1 n^2 + c_2 n + c_3$ for some constants that depend on the interpreter — but its *shape* is fixed by the $n(n-1)/2$ comparisons.
:::
:::

The count does not depend on the values in the list, only on its length. That is unusual; most algorithms do different amounts of work on different inputs of the same size, and we return to this in [[#sec-cases]].

### Patterns in loops

A handful of loop shapes cover most programs in this course. Write $T(n)$ for the number of iterations of the innermost body.

| loop shape | iterations of the body | growth |
|---|---|---|
| `for i in range(n)` | $n$ | linear |
| `for i in range(n): for j in range(n)` | $n^2$ | quadratic |
| `for i in range(n): for j in range(i)` | $n(n-1)/2$ | quadratic |
| `i = 1; while i < n: i *= 2` | $\lceil \log_2 n\rceil$ for $n \ge 1$ | logarithmic |
| `for i in range(1, n+1): j = i; while j <= n: j += i` | $\sum_{i=1}^n \lfloor n/i\rfloor$ | $n \log n$ |

The doubling loop deserves a sentence: after $k$ iterations $i = 2^k$, and the loop stops at the first $k$ with $2^k \ge n$, which is $k = \lceil \log_2 n\rceil$. Any loop that multiplies or divides its control variable by a constant factor runs a logarithmic number of times. The last row is analysed in [[#ex-harmonic]].

## Growth rates

Once we have a count such as $n(n-1)/2$ or $3n\log n + 20n$, we want to compare it with others. For small $n$ the comparison can go either way; for large $n$ the term that grows fastest dominates everything else. The figure shows the common growth rates together.

::: widget plot
f: log2(x); x; x*log2(x); x^2; 2^x
labels: \log_2 n; n; n\log_2 n; n^2; 2^n
x: 1, 32
y: 0, 200
caption: The common growth rates for $n$ from $1$ to $32$. Already at $n = 32$, $2^n$ is off the chart (over four billion) while $\log_2 n$ is only $5$. Widen the view in your head: at $n = 10^6$, $n\log_2 n \approx 2\times10^7$ but $n^2 = 10^{12}$ — a million times more work.
:::

A table makes the point in numbers. Suppose a machine performs $10^9$ simple operations per second (the right order of magnitude for a single core as of 2026), and an algorithm performs exactly $f(n)$ of them.

| $f(n)$ | $n = 10^3$ | $n = 10^6$ | $n = 10^9$ |
|---|---|---|---|
| $\log_2 n$ | 10 ns | 20 ns | 30 ns |
| $n$ | 1 µs | 1 ms | 1 s |
| $n \log_2 n$ | 10 µs | 20 ms | 30 s |
| $n^2$ | 1 ms | 17 minutes | 32 years |
| $2^n$ | $3\times10^{284}$ years | — | — |

Two lessons follow. A faster machine buys little against a worse growth rate: a machine $1000$ times faster lets a quadratic algorithm handle inputs only $\sqrt{1000} \approx 32$ times larger in the same time. And exponential algorithms are hopeless beyond tiny inputs, however fast the hardware.

## O, Ω and Θ

We now make "grows at most as fast as" precise. All functions here map positive integers to non-negative reals (eventually positive), as running times do.

::: definition Asymptotic notation {#def-asymptotic}
Let $f, g\colon \N \to \R_{\ge 0}$.

- $f(n) = O(g(n))$ ("$f$ is **big-O** of $g$") if there are constants $c > 0$ and $n_0$ such that $f(n) \le c\,g(n)$ for all $n \ge n_0$.
- $f(n) = \Omega(g(n))$ ("$f$ is **big-Omega** of $g$") if there are constants $c > 0$ and $n_0$ such that $f(n) \ge c\,g(n)$ for all $n \ge n_0$.
- $f(n) = \Theta(g(n))$ ("$f$ is **big-Theta** of $g$") if $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$; that is, there are $c_1, c_2 > 0$ and $n_0$ with $c_1 g(n) \le f(n) \le c_2 g(n)$ for all $n \ge n_0$.
- $f(n) = o(g(n))$ ("little-o") if $f(n)/g(n) \to 0$ as $n \to \infty$.
:::

So $O$ is an asymptotic "$\le$", $\Omega$ an asymptotic "$\ge$", $\Theta$ an asymptotic "$=$" and $o$ an asymptotic "$<$" — each up to a constant factor and ignoring finitely many small $n$. The constant $c$ absorbs the machine-dependent cost of one operation; $n_0$ lets us ignore start-up effects on small inputs.

The "$=$" sign in $f(n) = O(g(n))$ is a traditional abuse of notation: it means "$f$ belongs to the set $O(g)$ of functions bounded above by a multiple of $g$", and it is one-directional. We write $n = O(n^2)$ but never $O(n^2) = n$.

::: example A polynomial from the definition {#ex-poly}
Prove that $f(n) = 3n^2 + 5n + 2$ is $\Theta(n^2)$.
::: solution
*Upper bound.* For $n \ge 1$ we have $n \le n^2$ and $1 \le n^2$, so

$$
3n^2 + 5n + 2 \le 3n^2 + 5n^2 + 2n^2 = 10n^2.
$$

Hence $f(n) \le 10n^2$ for all $n \ge 1$: take $c = 10$, $n_0 = 1$.

*Lower bound.* All terms are non-negative, so $f(n) \ge 3n^2$ for every $n \ge 0$: take $c = 3$, $n_0 = 0$.

Together, $3n^2 \le f(n) \le 10n^2$ for $n \ge 1$, so $f(n) = \Theta(n^2)$. The constants are not unique — $c_2 = 4$ also works once $n \ge 6$, because $5n + 2 \le n^2$ for $n \ge 6$ — and it does not matter which we choose; only their existence counts.
:::
:::

Checking the definition by hand each time is tedious. The following facts do most of the work.

::: theorem Rules for asymptotic notation {#thm-rules}
Let $f, g, h$ be eventually positive functions.

1. (*Constants*) For any constant $a > 0$, $a f(n) = \Theta(f(n))$.
2. (*Sums*) $f(n) + g(n) = \Theta(\max(f(n), g(n)))$.
3. (*Transitivity*) If $f = O(g)$ and $g = O(h)$ then $f = O(h)$; likewise for $\Omega$ and $\Theta$.
4. (*Products*) If $f_1 = O(g_1)$ and $f_2 = O(g_2)$ then $f_1 f_2 = O(g_1 g_2)$.
5. (*Limits*) If $\lim_{n\to\infty} f(n)/g(n) = L$ exists, then $L = 0$ implies $f = o(g)$ and hence $f = O(g)$; $0 < L < \infty$ implies $f = \Theta(g)$; and $L = \infty$ implies $f = \Omega(g)$ but not $f = O(g)$.
:::

::: proof
(1) Take $c_1 = c_2 = a$.

(2) Let $m(n) = \max(f(n), g(n))$. Since both functions are non-negative, $m(n) \le f(n) + g(n) \le 2m(n)$.

(3) If $f(n) \le c\,g(n)$ for $n \ge n_0$ and $g(n) \le c' h(n)$ for $n \ge n_0'$, then $f(n) \le cc'\,h(n)$ for $n \ge \max(n_0, n_0')$. The $\Omega$ case is the same with inequalities reversed, and $\Theta$ combines the two.

(4) Multiply the inequalities $f_1(n) \le c_1 g_1(n)$ and $f_2(n) \le c_2 g_2(n)$, valid for large $n$, whose sides are non-negative.

(5) If $f/g \to L$ with $0 < L < \infty$, then for large $n$ the ratio lies between $L/2$ and $2L$ (take $\eps = L/2$ in the definition of a limit), so $\tfrac{L}{2}g(n) \le f(n) \le 2L\,g(n)$. If $L = 0$ the ratio is eventually below any $c > 0$, so $f = O(g)$. If $L = \infty$ the ratio is eventually above $1$, so $f = \Omega(g)$; and for every $c$ it eventually exceeds $c$, so no $c$ works for $f \le c\,g$.
:::

By rule 2 a sum is dominated by its largest term, and by rule 1 constant factors disappear. So any polynomial $a_k n^k + \dots + a_1 n + a_0$ with $a_k > 0$ is $\Theta(n^k)$, which you can also see from rule 5: the ratio to $n^k$ tends to $a_k$.

The limit rule, together with L'Hôpital's rule or known limits from [calculus](/learn/maths/lesson.php?c=calculus-1&l=limits), places the common functions in a strict hierarchy. For any constants $\eps > 0$, $k \ge 1$ and $b > 1$,

$$
1 \;\prec\; \log n \;\prec\; n^{\eps} \;\prec\; n \;\prec\; n \log n \;\prec\; n^k \;\prec\; b^n \;\prec\; n!,
$$ {#eq-hierarchy}

where $f \prec g$ means $f = o(g)$. In words: every power of $n$, however small, eventually beats every logarithm, and every exponential beats every polynomial.

::: proposition The base of a logarithm does not matter {#prop-logbase}
For constants $a, b > 1$, $\log_a n = \Theta(\log_b n)$.
:::

::: proof
By the change-of-base formula, $\log_a n = \log_b n / \log_b a$, and $1/\log_b a$ is a positive constant. Apply rule 1 of [[#thm-rules]].
:::

That is why we write $O(\log n)$ without a base. The same is *not* true of exponentials: $4^n = (2^n)^2$, and $4^n / 2^n = 2^n \to \infty$, so $4^n$ is not $O(2^n)$. A constant in an exponent matters.

::: warning O is an upper bound, not a description
"Merge sort is $O(n^2)$" is a true statement — its cost is $\Theta(n\log n)$, which is certainly at most a multiple of $n^2$ — but a useless one. When you mean that a cost grows *exactly* like $g$, up to constants, say $\Theta(g)$. Many textbooks and most programmers write $O$ when they mean $\Theta$; read their claims as upper bounds unless the context makes the tightness clear. And remember that a $\Theta$ bound hides constants: an algorithm with cost $1000n$ is $\Theta(n)$ and beats one with cost $n^2$ only for $n > 1000$.
:::

::: quiz
Which of the following statements are true? (Choose all that apply.)
- [x] $2^{n+1} = O(2^n)$
- [ ] $2^{2n} = O(2^n)$
- [x] $\log(n^3) = \Theta(\log n)$
- [x] $n \log n = o(n^{1.5})$
::: solution
$2^{n+1} = 2\cdot 2^n$, a constant multiple, so it is $O(2^n)$. But $2^{2n} = 4^n$ and $4^n/2^n = 2^n \to \infty$, so it is not $O(2^n)$. $\log(n^3) = 3\log n$, a constant multiple of $\log n$. Finally $n\log n / n^{1.5} = \log n / n^{0.5} \to 0$, because every positive power of $n$ outgrows the logarithm ([[#eq-hierarchy]]).
:::
:::

## Worst, best and average case {#sec-cases}

Most algorithms do different amounts of work on different inputs of the same size. Searching a list for a value stops as soon as the value is found, which may be at the first position or the last. We therefore define, for each $n$,

- the **worst-case cost** $T_{\max}(n)$: the maximum cost over all inputs of size $n$;
- the **best-case cost** $T_{\min}(n)$: the minimum;
- the **average-case cost** $T_{\mathrm{avg}}(n)$: the expected cost when inputs of size $n$ are drawn from a stated probability distribution.

The worst case is the default in this course: it is a guarantee that holds for every input, including inputs chosen by an adversary, and it needs no assumption about where the inputs come from. The average case is often more representative, but it is only as good as its distributional assumption, which you must always state. The best case is rarely useful on its own.

Do not confuse these cases with $O$, $\Omega$ and $\Theta$: the cases pick *which function* we are describing, and the notation describes *its growth*. The worst-case cost of a search can have a $\Theta$ bound, and so can its best-case cost.

::: example Linear search {#ex-linear}
Linear search scans `a[0], a[1], …` until it finds `x` or reaches the end. Count the comparisons `a[i] == x` in the best, worst and average case, assuming for the average that `x` is present and equally likely to be at each of the $n$ positions.
::: solution
If `x` is at position $i$ (counting from $0$), the search makes $i + 1$ comparisons. The best case is $i = 0$: one comparison, $T_{\min}(n) = 1 = \Theta(1)$. The worst case is that `x` is at the last position or absent: $n$ comparisons, $T_{\max}(n) = n = \Theta(n)$. Under the uniform assumption each position has probability $1/n$, so

$$
T_{\mathrm{avg}}(n) = \sum_{i=0}^{n-1} \frac1n (i+1) = \frac1n\cdot\frac{n(n+1)}{2} = \frac{n+1}{2} = \Theta(n).
$$

On average we scan about half the list — still linear. If instead `x` were absent with probability $1/2$ (and uniformly placed otherwise), the expected count would be $\tfrac12 n + \tfrac12\cdot\tfrac{n+1}{2} = \tfrac{3n+1}{4}$: a different distribution gives a different average, which is why the assumption must be stated.
:::
:::

When the list is sorted we can do much better, by comparing with the middle element and discarding half of the remaining candidates each time.

::: algorithm Binary search {#alg-binary-search}
**Input:** a list $a[0..n-1]$ sorted in non-decreasing order and a value $x$. **Output:** an index $i$ with $a[i] = x$, or $-1$ if there is none.

1. $lo \gets 0$, $hi \gets n - 1$.
2. While $lo \le hi$:
   1. $mid \gets \lfloor (lo + hi)/2 \rfloor$.
   2. If $a[mid] = x$, return $mid$.
   3. If $a[mid] < x$, set $lo \gets mid + 1$; otherwise set $hi \gets mid - 1$.
3. Return $-1$.
:::

The loop maintains the invariant (see [[programming-1/control-flow]]) "if $x$ occurs in $a$, it occurs in $a[lo..hi]$": initially this is the whole list, and each update discards only elements that are $< x$ (everything up to $mid$, when $a[mid] < x$) or $> x$ (everything from $mid$, when $a[mid] > x$), by sortedness. When $lo > hi$ the range is empty, so $x$ is absent and returning $-1$ is correct. What remains is the cost.

::: theorem Binary search takes logarithmic time {#thm-binary-search}
On a sorted list of $n \ge 1$ elements, binary search performs at most $\lfloor \log_2 n\rfloor + 1$ iterations of its loop. Its worst-case cost is $\Theta(\log n)$.
:::

::: proof
Let $s = hi - lo + 1$ be the number of candidates at the start of an iteration. The element $a[mid]$ splits them into $mid - lo = \lfloor (s-1)/2\rfloor$ elements on the left and $hi - mid = \lceil (s-1)/2 \rceil = \lfloor s/2\rfloor$ on the right. If the iteration does not return, the next range is one of these two parts, so the new size is at most $\lfloor s/2 \rfloor$.

Starting from $s_0 = n$, by induction the size before iteration $k+1$ is $s_k \le \lfloor n/2^k \rfloor$ (using $\lfloor \lfloor m/2\rfloor / 2\rfloor = \lfloor m/4 \rfloor$, and so on). An iteration happens only when $s_k \ge 1$, which requires $n/2^k \ge 1$, that is $k \le \log_2 n$, that is $k \le \lfloor\log_2 n\rfloor$ since $k$ is an integer. So iterations can occur only for $k = 0, 1, \dots, \lfloor \log_2 n\rfloor$: at most $\lfloor \log_2 n\rfloor + 1$ of them. Each iteration costs $O(1)$, giving $O(\log n)$.

For the matching lower bound, search for a value larger than every element. Then every iteration takes the right part, of size exactly $\lfloor s/2\rfloor$, so $s_k = \lfloor n/2^k\rfloor$ exactly and all $\lfloor\log_2 n\rfloor + 1$ iterations happen. Hence the worst case is $\Theta(\log n)$.
:::

The bound is easy to check by running the algorithm with a step counter. For $n \ge 1$, $\lfloor\log_2 n\rfloor + 1$ is the number of binary digits of $n$, which Python gives as `n.bit_length()`.

```python
def binary_search(a, x):
    """Index of x in the sorted list a, or -1; also the number of loop iterations."""
    lo, hi = 0, len(a) - 1
    steps = 0
    while lo <= hi:
        steps += 1
        mid = (lo + hi) // 2
        if a[mid] == x:
            return mid, steps
        elif a[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1, steps

for n in [10, 1000, 10**6]:
    a = list(range(0, 2 * n, 2))        # even numbers 0, 2, ..., 2n - 2
    print(n, binary_search(a, 2 * n), n.bit_length())   # 2n is larger than everything
```

```console
$ python3 bsearch.py
10 (-1, 4) 4
1000 (-1, 10) 10
1000000 (-1, 20) 20
```

Twenty iterations for a million elements, against up to a million comparisons for linear search: this is what a logarithm buys. The price is that the list must be sorted, and keeping data sorted while it changes is the problem that search trees ([[data-structures/binary-search-trees]]) solve.

::: example A loop with a harmonic sum {#ex-harmonic}
How many times does the body of the inner loop run, as a function of $n$?

```python
for i in range(1, n + 1):
    j = i
    while j <= n:       # visits i, 2i, 3i, ... up to n
        j += i
```
::: solution
For a fixed $i$, $j$ takes the values $i, 2i, \dots, \lfloor n/i \rfloor\, i$, so the body runs $\lfloor n/i\rfloor$ times. The total is

$$
T(n) = \sum_{i=1}^{n} \left\lfloor \frac{n}{i} \right\rfloor.
$$

Since $n/i - 1 < \lfloor n/i \rfloor \le n/i$, we have $nH_n - n < T(n) \le nH_n$, where $H_n = 1 + \tfrac12 + \dots + \tfrac1n$ is the $n$th **harmonic number**. Comparing the sum with the integral of $1/x$ gives $\ln(n+1) \le H_n \le 1 + \ln n$. Hence $T(n) = \Theta(n \log n)$. For $n = 10$ the exact count is $10 + 5 + 3 + 2 + 2 + 1 + 1 + 1 + 1 + 1 = 27$.

This loop shape — "for each $i$, do work proportional to $n/i$" — is how the sieve of Eratosthenes and many number-theoretic algorithms reach $n\log n$-type bounds.
:::
:::

::: quiz
An algorithm's worst-case cost is $\Theta(n^2)$ and its best-case cost is $\Theta(n)$. Which statement is correct?
- [ ] Its cost on every input is $\Theta(n^2)$.
- [x] Its cost on every input of size $n$ is $O(n^2)$ and $\Omega(n)$.
- [ ] Its average-case cost is $\Theta(n^{1.5})$.
- [ ] Its cost is $\Theta(n)$ on random inputs.
::: solution
Every input's cost lies between the best and the worst case, so it is at most a constant times $n^2$ and at least a constant times $n$. Nothing more follows: the average case depends on the input distribution and could be anywhere in between (for insertion sort on random permutations it is $\Theta(n^2)$, for example).
:::
:::

## Measuring running times

Asymptotic analysis predicts the *shape* of the running time; it says nothing about the constant. A useful habit is to check a prediction with a **doubling experiment**: run the program for $n$, $2n$, $4n$, … and look at the ratio of successive times. A $\Theta(n)$ program should roughly double its time, a $\Theta(n^2)$ program roughly quadruple it, and a $\Theta(n\log n)$ program a little more than double it.

```python
import time

def quadratic(n):
    total = 0
    for i in range(n):
        for j in range(n):
            total += 1
    return total

prev = None
for n in [500, 1000, 2000, 4000]:
    start = time.perf_counter()
    quadratic(n)
    t = time.perf_counter() - start
    ratio = "" if prev is None else f"  ratio {t / prev:.1f}"
    print(f"n = {n:5d}  time {t:.3f} s{ratio}")
    prev = t
```

One run on the author's machine (CPython 3.14, 2026) printed:

```console
$ python3 doubling.py
n =   500  time 0.008 s
n =  1000  time 0.036 s  ratio 4.5
n =  2000  time 0.145 s  ratio 4.0
n =  4000  time 0.614 s  ratio 4.2
```

This is an observation, not a theorem: your times will differ, and the ratios wobble because of timer resolution, caching and other programs. But the ratio settling near $4$ is what $\Theta(n^2)$ predicts. If $T(n) \approx c\,n^k$ then $T(2n)/T(n) \approx 2^k$, so the exponent can be estimated as $k \approx \log_2(\text{ratio})$.

::: warning Measure, but measure carefully
Timing small inputs mostly measures start-up costs and noise; repeat each measurement several times and take the minimum or median (Python's `timeit` module does this). Make sure the input sizes are large enough for the leading term to dominate. And remember that the hardware is not a RAM machine: on large inputs memory caches can make an algorithm with the better asymptotic bound slower in practice, as we shall see when we compare arrays with linked lists in [[data-structures/arrays-lists]].
:::

## Space

Everything above applies to memory as well as time. The **space cost** of an algorithm is the maximum number of memory cells it uses at once, beyond the input itself (its **auxiliary space**). Linear and binary search use $O(1)$ auxiliary space — a few variables. A function that copies its input uses $\Theta(n)$. A recursive function uses space for each active call on the call stack, so a recursion of depth $d$ uses $\Omega(d)$ space even if each call stores only a few variables — a recursive binary search uses $\Theta(\log n)$ space where the loop above uses $O(1)$. Time and space often trade against each other: storing precomputed answers in a table spends space to save time, a theme that runs through hashing ([[data-structures/hash-tables]]) and dynamic programming ([[algorithms]]).

::: history
The symbol $O$ was introduced by the number theorist Paul Bachmann in *Die analytische Zahlentheorie* (1894) and popularised by Edmund Landau in his 1909 handbook of the distribution of primes, which also introduced $o$; mathematicians still call them the **Landau symbols**. The use of asymptotic growth to classify algorithms came with the founding of complexity theory: Juris Hartmanis and Richard Stearns, "On the computational complexity of algorithms" (1965), measured time as a function of input length, and Donald Knuth made the analysis of algorithms a discipline of its own in *The Art of Computer Programming* (volume 1, 1968). Knuth's letter "Big Omicron and big Omega and big Theta" (*SIGACT News*, 1976) fixed the meanings of $\Omega$ and $\Theta$ used today. The RAM model was formalised by Stephen Cook and Robert Reckhow in "Time bounded random access machines" (1973).
:::

## Where this leads

Every chapter of this course states its costs in this language. [[data-structures/arrays-lists]] adds one more kind of bound — the **amortised** cost, an average over a sequence of operations rather than over random inputs — and [[data-structures/hash-tables]] adds **expected** costs over the random choices of an algorithm. In [[algorithms]] you will meet recurrences such as $T(n) = 2T(n/2) + n$ for recursive algorithms and the master theorem that solves them, and lower bounds that hold for *every* algorithm for a problem, such as the $\Omega(n\log n)$ bound for comparison sorting. The mathematics of sums and recurrences is developed in [Maths Atlas: recurrences](/learn/maths/lesson.php?c=discrete&l=recurrences).

::: summary
- We measure an algorithm by counting unit operations in the RAM model ([[#def-ram]]), usually by counting one dominant operation, as a function of the input size $n$.
- $O$, $\Omega$ and $\Theta$ ([[#def-asymptotic]]) are asymptotic $\le$, $\ge$ and $=$, up to constant factors and for large $n$; $o$ is a strict $<$.
- Constant factors and lower-order terms disappear: a polynomial of degree $k$ is $\Theta(n^k)$, and the base of a logarithm does not matter ([[#thm-rules]], [[#prop-logbase]]).
- Logarithms grow slower than any power, and powers slower than any exponential ([[#eq-hierarchy]]); a better growth rate beats a faster machine.
- Worst-case cost is a guarantee for every input; average-case cost depends on a stated input distribution.
- Binary search makes at most $\lfloor\log_2 n\rfloor + 1$ iterations ([[#thm-binary-search]]); loops that halve or double run $\Theta(\log n)$ times, and harmonic loops give $\Theta(n\log n)$.
- Doubling experiments check predictions empirically: the time ratio $T(2n)/T(n)$ approaches $2^k$ for $\Theta(n^k)$.
:::

## Exercises

::: exercise Counting a triple loop {level=1 check="120"}
How many times does the innermost statement run for $n = 10$? (Enter the number.)

```python
for i in range(n):
    for j in range(i + 1, n):
        for k in range(j + 1, n):
            count += 1
```
::: solution
The body runs once for each triple $i < j < k$ chosen from $\{0, \dots, n-1\}$, so the count is $\binom{n}{3} = n(n-1)(n-2)/6$. For $n = 10$ that is $10\cdot9\cdot8/6 = 120$. Asymptotically it is $\Theta(n^3)$, with leading constant $1/6$.
:::
:::

::: exercise Ordering growth rates {level=1}
Arrange in increasing order of growth: $n^2$, $2^{\log_2 n}$, $\sqrt n$, $n\log n$, $(\log n)^3$, $1.01^n$, $n^{100}$. Which two are $\Theta$ of each other, if any?
::: solution
$2^{\log_2 n} = n$. The order is

$$
(\log n)^3 \prec \sqrt n \prec n = 2^{\log_2 n} \prec n\log n \prec n^2 \prec n^{100} \prec 1.01^n.
$$

$(\log n)^3 = o(\sqrt n)$ because any power of a logarithm is beaten by any positive power of $n$; $n^{100} = o(1.01^n)$ because any exponential with base $> 1$ beats any polynomial — although $1.01^n$ only overtakes $n^{100}$ when $n$ is about $1.2\times10^5$, a reminder that "eventually" can be a long way off. No two of the listed functions are $\Theta$ of each other.
:::
:::

::: exercise A doubling loop {level=1 check="7"}
How many times does the body of `i = 1; while i < 100: i *= 2` run? (Enter the number.)
::: solution
After $k$ iterations $i = 2^k$. The loop runs while $2^k < 100$, i.e. for $k = 0, \dots, 6$, and stops when $i = 128$. That is $7 = \lceil\log_2 100\rceil$ iterations.
:::
:::

::: exercise Constants from the definition {level=2}
Prove from [[#def-asymptotic]] that $\tfrac12 n^2 - 3n = \Theta(n^2)$, giving explicit constants $c_1, c_2, n_0$.
::: solution
Upper bound: $\tfrac12 n^2 - 3n \le \tfrac12 n^2$ for all $n \ge 0$, so $c_2 = \tfrac12$.

Lower bound: we want $\tfrac12 n^2 - 3n \ge c_1 n^2$. For $n \ge 12$ we have $3n \le \tfrac14 n^2$, so $\tfrac12 n^2 - 3n \ge \tfrac14 n^2$. Take $c_1 = \tfrac14$, $n_0 = 12$. (For $n < 6$ the function is negative, which is why an $n_0$ is needed.)
:::
:::

::: exercise Average search with absent keys {level=2 check="13/4"}
Linear search on a list of $n = 4$ distinct elements: with probability $1/2$ the key is absent, and otherwise it is at each position with equal probability. What is the expected number of comparisons? (Enter the exact value.)
::: solution
If absent, the search makes $n = 4$ comparisons. If present at position $i \in \{0,1,2,3\}$, it makes $i+1$, with average $(1+2+3+4)/4 = 5/2$. So the expectation is $\tfrac12\cdot 4 + \tfrac12\cdot\tfrac52 = 2 + \tfrac54 = \tfrac{13}{4}$, which matches the general formula $\tfrac{3n+1}{4}$ of [[#ex-linear]].
:::
:::

::: exercise Is it in O? {level=2}
For each pair decide whether $f = O(g)$, $f = \Omega(g)$, or both, and justify: (a) $f = n\log n$, $g = n^{1.01}$; (b) $f = 2^n$, $g = 2^{n/2}$; (c) $f = \log(n!)$, $g = n\log n$.
::: solution
(a) $f/g = \log n / n^{0.01} \to 0$, so $f = o(g)$: $f = O(g)$ but not $\Omega(g)$.

(b) $f/g = 2^{n/2} \to\infty$, so $f = \Omega(g)$ and not $O(g)$.

(c) $\log(n!) = \sum_{i=1}^n \log i \le n\log n$, so $f = O(g)$. For the lower bound, the largest $\lceil n/2\rceil$ terms are each at least $\log(n/2)$, so $\log(n!) \ge \tfrac n2 \log\tfrac n2 = \tfrac n2(\log n - 1) \ge \tfrac14 n\log n$ for $n \ge 4$. Hence $f = \Theta(g)$: both.
:::
:::

::: exercise Estimating an exponent {level=3}
A program takes $0.40$ s for $n = 10^5$ and $3.2$ s for $n = 4\times10^5$. Assuming $T(n) \approx c\,n^k$, estimate $k$ and predict the time for $n = 1.6\times10^6$. Are the measurements consistent with $T(n) \approx c\,n\log n$ instead? What further measurements would distinguish $n^{1.5}$ from $n\log n$ in general?
::: solution
Quadrupling $n$ multiplied the time by $3.2/0.40 = 8 = 4^k$, so $k = \log_4 8 = 1.5$. Another quadrupling predicts another factor of $8$: about $25.6$ s.

For $T = cn\log_2 n$ the ratio for $n = 10^5 \to 4\times10^5$ would be $4\cdot\log_2(4\times10^5)/\log_2(10^5) \approx 4 \cdot 18.6/16.6 \approx 4.5$, much less than $8$; so these measurements point to $n^{1.5}$, not $n\log n$. In general, a local ratio can always be fitted by some power; to distinguish models measure over a wide range of $n$ (several doublings) and check whether the estimated exponent stays constant ($n^{1.5}$) or drifts slowly towards $1$ ($n\log n$, whose local exponent is $1 + 1/\ln n$).
:::
:::

::: exercise Little-o is strictly smaller {level=3}
Prove that if $f = o(g)$ then $f = O(g)$ but $f \neq \Omega(g)$ (assuming $g(n) > 0$ for large $n$). Then give functions $f, g$ with $f = O(g)$, $f \ne \Theta(g)$, and yet $f \neq o(g)$.
::: solution
If $f/g \to 0$, then for $\eps = 1$ there is $n_0$ with $f(n) < g(n)$ for $n \ge n_0$, so $f = O(g)$ with $c = 1$. Suppose also $f \ge c\,g$ for $n \ge n_1$, with $c > 0$; then $f/g \ge c$ for large $n$, contradicting $f/g \to 0$. So $f \neq \Omega(g)$.

For the second part take $g(n) = n$ and $f(n) = n$ for even $n$, $f(n) = 1$ for odd $n$. Then $f \le g$, so $f = O(g)$. The ratio $f/g$ is $1$ on even $n$, so it does not tend to $0$: $f \neq o(g)$. It is $1/n$ on odd $n$, so no $c > 0$ has $f \ge c\,g$ for all large $n$: $f \neq \Omega(g)$, hence $f \neq \Theta(g)$. Asymptotic notation is not a total order — two functions need not be comparable.
:::
:::

::: exercise Counting binary-search probes {level=2 check="17"}
What is the maximum number of loop iterations binary search ([[#alg-binary-search]]) can make on a sorted list of $n = 100\,000$ elements? (Enter the number.)
::: solution
By [[#thm-binary-search]] it is $\lfloor\log_2 100\,000\rfloor + 1$. Since $2^{16} = 65\,536 \le 100\,000 < 131\,072 = 2^{17}$, $\lfloor\log_2 100\,000\rfloor = 16$, and the maximum is $17$. (In Python, `(100000).bit_length()` returns `17`.)
:::
:::
