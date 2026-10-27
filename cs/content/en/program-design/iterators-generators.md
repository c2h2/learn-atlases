A web server writes one line to its access log for every request, and after a busy month the log is 50 GB. You want the number of requests that ended in an error. The program from [[programming-1/files-exceptions]] that reads the whole file with `f.readlines()` and then loops over the list would try to hold 50 GB of strings in memory at once, and fail. The loop `for line in f:` over the open file works: it holds one line at a time, however large the file.

Both loops look the same — `for x in something` — and that is the point. `for` works on lists, strings, ranges, dictionaries, sets, files, `map` and `filter` objects, and on your own classes, because all of them implement one small interface, the **iteration protocol**. Some of them produce their elements from memory, some from a disk, some by computing them only when asked. This chapter explains the protocol; **generators**, which make writing iterators as easy as writing a loop; **lazy** and even **infinite** sequences, whose elements exist only once they are needed; and **pipelines** of transformations through which data streams one element at a time. The design idea throughout is the separation of *producing* a sequence from *consuming* it.

## The iteration protocol

::: definition Iterable and iterator {#def-iterator}
An **iterator** is an object with a method `__next__()` that returns the next element of a sequence each time it is called, and raises the exception `StopIteration` when there are no more; by convention it also has a method `__iter__()` that returns the iterator itself. An **iterable** is an object with a method `__iter__()` that returns an iterator over its elements. The built-in functions `iter(x)` and `next(it)` call `x.__iter__()` and `it.__next__()`.
:::

The distinction matters. A list is iterable but is not itself an iterator: each call `iter(xs)` returns a *new* iterator, positioned at the start, so a list can be iterated many times, by several loops at once. An iterator is a cursor into a sequence: it remembers how far it has got, and once it is exhausted it stays exhausted.

```python
xs = [10, 20]
it = iter(xs)                    # a list_iterator, positioned before 10
print(next(it), next(it))
try:
    next(it)
except StopIteration:
    print("StopIteration")
print(iter(xs) is iter(xs), iter(it) is it)
```

```console
$ python3 protocol.py
10 20
StopIteration
False True
```

The `for` statement is defined in terms of this protocol.

::: definition Meaning of the for statement {#def-for}
The statement `for x in e: body` is executed as

```text
it = iter(e)                     # once, before the loop
while True:
    try:
        x = next(it)
    except StopIteration:
        break                    # the sequence is finished
    body
```

(with `it` a hidden variable, and with the loop's `else` clause, if any, run when `StopIteration` ends the loop rather than a `break` in the body).
:::

Everything else that consumes a sequence — `list(e)`, `sum(e)`, `max(e)`, `sorted(e)`, `"".join(e)`, `x in e` for objects without `__contains__`, tuple unpacking `a, b = e`, comprehensions — uses the same two calls. So does any function you write with `for`. That is a large payoff for a small interface: any object that implements the protocol can be used everywhere.

### Writing an iterator by hand

To make a class iterable, give it an `__iter__` method returning an iterator. Here is a countdown, with the iterator as a separate class so that the iterable can be iterated more than once.

```python
class Countdown:
    """An iterable over n, n-1, ..., 1."""
    def __init__(self, n):
        self.n = n
    def __iter__(self):
        return CountdownIterator(self.n)      # a fresh cursor each time

class CountdownIterator:
    """Iterator state: the next value to return is self.current (if > 0)."""
    def __init__(self, n):
        self.current = n
    def __iter__(self):
        return self
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

c = Countdown(3)
print(list(c), list(c), sum(c))
it = iter(c)
print(next(it), list(it), list(it))
```

```console
$ python3 countdown.py
[3, 2, 1] [3, 2, 1] 6
3 [2, 1] []
```

The iterable `c` can be traversed repeatedly; the iterator `it` is used up — after `next(it)` took the `3`, `list(it)` took the rest, and the second `list(it)` found nothing.

::: warning An iterator can only be used once
`map`, `filter`, `zip`, `enumerate`, `reversed`, file objects and generators are iterators, not reusable collections. After `squares = map(lambda x: x * x, [1, 2, 3])`, the first `sum(squares)` gives `14` and a following `max(squares)` raises `ValueError: max() iterable argument is empty`, because the first consumer exhausted it. If you need the elements twice, make a list (`squares = list(...)`), or recompute the iterator. A function that loops over its argument twice should say in its specification that it requires a re-iterable collection, not merely an iterable.
:::

::: quiz
What does `it = iter([1, 2, 3, 4, 5]); print(list(zip(it, it)))` print?
- [ ] `[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]`
- [x] `[(1, 2), (3, 4)]`
- [ ] `[(1, 2), (3, 4), (5, None)]`
- [ ] `[]`
::: solution
Both arguments of `zip` are the *same* iterator. To build each pair, `zip` calls `next` on its first argument and then on its second, so the first pair takes `1` and `2`, the second `3` and `4`. For the third pair, the first `next` gives `5` and the second raises `StopIteration`, which ends `zip`; the incomplete pair is dropped. (This is a well-known idiom for grouping an iterator into pairs.)
:::
:::

## Generators

Writing iterator classes is tedious: the loop that produces the elements has to be turned inside out, with its state stored in attributes (`self.current`) and its control flow chopped into calls of `__next__`. A **generator** lets the loop be written straightforwardly.

::: definition Generator {#def-generator}
A function whose body contains a `yield` expression is a **generator function**. Calling it does not run the body; it returns a **generator**, an iterator whose `__next__` runs the body until the next `yield v`, *suspends* the function there — keeping its frame, with all local variables and the point of execution — and returns `v`. The next call of `__next__` resumes the body just after that `yield`. When the body returns, the generator raises `StopIteration`.
:::

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)), sum(countdown(100)))
```

```console
$ python3 gencount.py
[3, 2, 1] 5050
```

Four lines replace the two classes of the previous section; the local variable `n` *is* the iterator's state. To get a re-iterable class, make its `__iter__` a generator function: `def __iter__(self): k = self.n` followed by the same loop.

::: example The interleaving of producer and consumer {#ex-interleave}
Predict the output of this program, which prints inside a generator.

```python
def numbers():
    print("  start")
    yield 1
    print("  after 1")
    yield 2
    print("  end")

g = numbers()
print("created")
print(next(g))
for x in g:
    print("loop got", x)
print("done")
```
::: solution
```console
$ python3 interleave.py
created
  start
1
  after 1
loop got 2
  end
done
```

1. `numbers()` creates the generator without running any of the body, so `created` comes first.
2. `next(g)` runs the body from the start, printing `start`, up to `yield 1`, where the generator suspends and `next` returns `1`.
3. The `for` loop calls `iter(g)`, which is `g` itself, then `next(g)`: the body resumes after `yield 1`, prints `after 1`, and suspends at `yield 2`; the loop body prints `loop got 2`.
4. The next `next(g)` resumes after `yield 2`, prints `end` and falls off the end of the body, raising `StopIteration`, which ends the loop.

Control passes back and forth between the consumer (the loop) and the producer (the generator), one element at a time. Neither runs ahead of the other: the generator computes each element only when the consumer asks for it.
:::
:::

**Generator expressions** are to generators what list comprehensions are to lists: `(x * x for x in xs if x > 0)` is a generator producing the squares on demand, and inside a call the extra parentheses may be dropped, as in `sum(x * x for x in xs)`. The difference in memory is dramatic. As an observation with CPython 3.14 on a 64-bit machine (sizes vary by version), `sys.getsizeof([x * x for x in range(10**6)])` is $8{,}448{,}728$ bytes — just for the list's array of pointers, not counting the integers — while the generator expression `(x * x for x in range(10**6))` occupies $208$ bytes whatever the range.

### Delegating with `yield from`

A generator can hand over to another iterable with `yield from it`, which yields every element of `it` in turn. This makes recursive generators natural, for example an in-order traversal of the binary search trees of [[program-design/functional-style]]:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Node:
    left: "Node | None"
    key: int
    right: "Node | None"

def inorder(t):
    """Yield the keys of the BST t in increasing order."""
    if t is not None:
        yield from inorder(t.left)
        yield t.key
        yield from inorder(t.right)

t = Node(Node(None, 1, None), 3, Node(Node(None, 4, None), 6, None))
print(list(inorder(t)))
print(next(k for k in inorder(t) if k > 3))
```

```console
$ python3 inorder.py
[1, 3, 4, 6]
4
```

The second line asks for the first key greater than $3$ and stops there: the traversal never visits the node $6$. A function that returned a list of all the keys would have had to visit every node first.

## Lazy and infinite sequences

Because a generator computes elements only on demand, nothing requires it ever to stop. An **infinite iterator** is a perfectly good object, as long as its consumer takes only finitely many elements. The standard module `itertools` provides the building blocks: `count(start)` yields `start, start + 1, …` for ever; `islice(it, n)` takes the first `n` elements (and `islice(it, a, b)` those at positions $a$ to $b - 1$); `takewhile(p, it)` stops at the first element failing `p`.

A good example is the sequence of prime numbers. The sieve of Eratosthenes crosses out multiples of each prime up to a fixed bound $N$; an **incremental** sieve needs no bound. It keeps, for each prime $p$ found so far, the next multiple of $p$ that still has to be crossed out, in a dictionary from multiples to primes.

```python
from itertools import count, islice

def primes():
    """Yield 2, 3, 5, 7, ... for ever (an incremental sieve of Eratosthenes)."""
    composites = {}                    # next multiple to cross out -> its prime
    for n in count(2):
        if n not in composites:
            yield n                    # no smaller prime divides n
            composites[n * n] = n      # smaller multiples are crossed out by smaller primes
        else:
            p = composites.pop(n)      # n is composite: move p's marker on
            m = n + p
            while m in composites:     # each key belongs to one prime
                m += p
            composites[m] = p

print(list(islice(primes(), 15)))
print(next(p for p in primes() if p > 1000))
```

```console
$ python3 primes.py
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
1009
```

The generator has no idea how many primes anyone will want; the consumer decides. The dictionary holds one entry per prime found so far, so producing the primes up to $n$ needs memory proportional to the number of primes below $n$, roughly $n / \ln n$, rather than to $n$ as a sieve with a fixed array would. (Why the marker for a new prime $p$ can start at $p^2$, and why no composite is missed, is [[#exr-sieve]].)

::: widget sieve
mode: sieve
n: 120
caption: The classical, bounded sieve of Eratosthenes on $2, \dots, 120$. Each prime crosses out its multiples, starting from its square. The incremental generator above performs the same crossings-out, but lazily: instead of crossing out all multiples of $p$ at once, it remembers only the *next* one, and moves the marker on when the count reaches it.
:::

The theorem behind laziness is a statement about *how much work* a pipeline of lazy stages performs.

::: theorem Demand-driven evaluation {#thm-demand}
Let a pipeline be built from a source iterator $S$ by a sequence of stages, each a lazy `map` (applying a function to each element) or a lazy `filter` (passing the elements that satisfy a predicate), and let a consumer take $k$ elements from the end of the pipeline. Suppose the $k$-th output element is derived from the source element at position $N$ (counting from $1$). Then exactly $N$ elements are taken from $S$; each map stage's function is applied exactly once to each element that reaches that stage among the first $N$, and each predicate is tested exactly once on each such element.
:::

::: proof
Call the stages $T_1, \dots, T_r$, with $T_1$ reading from $S$. One call of `next` on $T_j$ calls `next` on $T_{j-1}$ (or on $S$, if $j = 1$) until it obtains an element it can return: a map stage needs exactly one input element and applies its function once; a filter stage takes input elements one at a time, testing each once, until one passes. No stage ever requests an element except to answer a request, and no stage requests more than it needs to answer the current request, nor stores elements for later. Hence each source element is requested only when every earlier one has been either passed to the consumer or rejected by a filter, and each element is processed by each stage it reaches exactly once. The $k$ answers given to the consumer therefore require exactly the source elements $1, \dots, N$, where $N$ is the position of the source element from which the $k$-th answer derives; after that answer no further request is made.
:::

::: example Counting the work {#ex-count-work}
Take the first five squares of the numbers $n \ge 1$ with $n \bmod 7 = 3$, lazily from an infinite source, and count the calls of the predicate and of the squaring function. Compare with an eager version on the numbers below a million.
::: solution
```python
from itertools import count, islice

calls = {"p": 0, "f": 0}
def p(n):
    calls["p"] += 1
    return n % 7 == 3
def f(n):
    calls["f"] += 1
    return n * n

print(list(islice(map(f, filter(p, count(1))), 5)), calls)

calls = {"p": 0, "f": 0}
eager = [f(n) for n in [n for n in range(1, 10**6) if p(n)]][:5]
print(eager, calls)
```

```console
$ python3 lazywork.py
[9, 100, 289, 576, 961] {'p': 31, 'f': 5}
[9, 100, 289, 576, 961] {'p': 999999, 'f': 142857}
```

The fifth number with $n \bmod 7 = 3$ is $31$ (the sequence is $3, 10, 17, 24, 31$), so, as [[#thm-demand]] predicts, the lazy pipeline takes $N = 31$ source elements, tests the predicate $31$ times and squares $5$ times. The eager version had to choose an arbitrary bound, tested every number below it and squared all $142{,}857$ that passed, only to keep five. Laziness is not faster per element — it has the small overhead of suspending and resuming generators — but it does only the work that is demanded.
:::
:::

## Pipelines

Generators compose into **pipelines**: each stage takes an iterator, transforms it lazily, and returns an iterator, so the stages can be plugged together like the commands of a Unix shell pipeline (`cat access.log | grep " 404 " | wc -l`). Each stage is small, independently testable and reusable; the whole pipeline holds only a few elements in memory at any time, however long the input.

::: example Analysing a log file {#ex-log}
Build a pipeline that reads an access log, skips malformed lines, parses each line into a record, and reports the paths of failed requests and the total number of bytes sent. Use an in-memory file (`io.StringIO`) so that the example runs anywhere.
::: solution
```python
import io

LOG = """\
2026-10-01 12:00:01 GET /index.html 200 5120
2026-10-01 12:00:02 GET /missing 404 312
2026-10-01 12:00:05 POST /login 200 845
2026-10-01 12:00:09 GET /index.html 200 5120
malformed line
2026-10-01 12:00:11 GET /img/logo.png 304 0
2026-10-01 12:00:12 GET /about 500 128
"""

def lines(f):
    for line in f:                   # a file is an iterator over its lines
        yield line.rstrip("\n")

def records(lines):
    for line in lines:
        parts = line.split()
        if len(parts) == 6:          # skip malformed lines
            date, time, method, path, status, size = parts
            yield {"path": path, "status": int(status), "bytes": int(size)}

def failures(recs):
    return (r for r in recs if r["status"] >= 400)

print([r["path"] for r in failures(records(lines(io.StringIO(LOG))))])
print(sum(r["bytes"] for r in records(lines(io.StringIO(LOG)))))
```

```console
$ python3 logpipe.py
['/missing', '/about']
11525
```

The same functions work unchanged on `open("access.log")` for a 50 GB file, because a file object is an iterator over its lines and every stage is lazy: memory use stays at a few lines, independent of the file's size. Note that the pipeline is built twice — once for each question — because the first consumer exhausts it; reading a huge file twice can be avoided by computing both answers in one pass, with an explicit loop that updates two accumulators.
:::
:::

The `itertools` module supplies many standard stages, all lazy:

- `chain(a, b, …)` concatenates iterables; `zip` and `enumerate` pair elements up; `accumulate(xs)` yields running totals ($1, 3, 6, 10, \dots$ for $1, 2, 3, 4$);
- `groupby(xs, key)` yields groups of *consecutive* elements with equal keys;
- `tee(it, n)` splits one iterator into $n$ independent ones (buffering elements that one copy has seen and another has not);
- `islice`, `takewhile`, `dropwhile`, `filterfalse`, `pairwise`, `product`, `permutations`, `combinations` and more.

::: warning `groupby` groups runs, not equal keys
`[(k, len(list(g))) for k, g in groupby("aabbbac")]` is `[('a', 2), ('b', 3), ('a', 1), ('c', 1)]`: the two runs of `a` form two groups. `groupby` is lazy and remembers only the current group, so it cannot know about later equal elements. To group all equal keys, sort by the same key first (`groupby(sorted(xs, key=k), key=k)`), or accumulate into a dictionary as in [[programming-1/dictionaries-sets]].
:::

A stage can also keep a bounded amount of state, as long as it does not keep the whole input.

::: example A moving average {#ex-movavg}
Write a pipeline stage that yields the mean of each window of $k$ consecutive elements of a stream, in $O(1)$ time per element and $O(k)$ memory, and trace it on $2, 4, 6, 8, 10, 12$ with $k = 3$.
::: solution
Keep the last $k$ elements in a `collections.deque` with `maxlen=k`, which discards the oldest element automatically when a new one is appended, together with their running total:

```python
from collections import deque

def moving_average(xs, k):
    """Yield the mean of each window of k consecutive elements of xs."""
    window, total = deque(maxlen=k), 0
    for x in xs:
        if len(window) == k:
            total -= window[0]       # the element about to fall out
        window.append(x)
        total += x
        if len(window) == k:
            yield total / k

print(list(moving_average([2, 4, 6, 8, 10, 12], 3)))
```

```console
$ python3 movavg.py
[4.0, 6.0, 8.0, 10.0]
```

The trace: after $2, 4, 6$ the window is full with total $12$, giving $4.0$; then $8$ arrives, $2$ is subtracted and $8$ added (total $18$, mean $6.0$); then $10$ (total $24$, mean $8.0$) and $12$ (total $30$, mean $10.0$). Each element costs $O(1)$ time — one subtraction, one addition, one append — and the stage uses $O(k)$ memory, independent of the length of the stream: the shape of most stream-processing algorithms. Recomputing `sum(window)` for each output would cost $O(k)$ per element instead.
:::
:::

### Generators and resources

A generator suspended in the middle of its body may be holding a resource — an open file, a network connection. If the consumer stops early, the rest of the body never runs. Python handles this through the generator's `close()` method, which raises a `GeneratorExit` exception at the suspended `yield`, so that `finally` clauses and `with` blocks inside the generator run their clean-up:

```python
def guarded():
    try:
        yield "a"
        yield "b"
    finally:
        print("cleanup")

g = guarded()
print(next(g))
g.close()                            # run the finally clause now
print("after close")
```

```console
$ python3 closegen.py
a
cleanup
after close
```

CPython also closes a generator when the last reference to it disappears, but relying on that timing is fragile (other Python implementations collect garbage later). When a generator opens a file, either let it be consumed to the end, or close it explicitly — `contextlib.closing(gen)` does this in a `with` statement.

::: history
CLU, designed by Barbara Liskov's group at MIT in the mid-1970s, introduced **iterators** as procedures that `yield` elements to a `for` loop, suspending between elements — the direct ancestor of Python's generators; the idea grew out of the abstract data types of [[program-design/abstract-data-types]], where a type needs a way to give clients its elements without exposing its representation. The coroutines from which generators are a special case go back to Melvin Conway's 1963 paper "Design of a separable transition-diagram compiler". Doug McIlroy's Unix pipes (1973) made streaming pipelines a way of working. Python's iteration protocol arrived in Python 2.2 (2001, PEP 234), generators in the same release (PEP 255, by Neil Schemenauer, Tim Peters and Magnus Lie Hetland), generator expressions in 2.4 (PEP 289) and `yield from` in 3.3 (PEP 380). *Design Patterns* (1994) catalogued the Iterator as one of its patterns.
:::

## Where this leads

[[program-design/types-interfaces]] gives iterables and iterators types — `Iterable[int]`, `Iterator[str]`, `Generator[...]` — so that a checker can tell a re-iterable collection from a one-shot stream. [[program-design/modules-patterns]] treats Iterator as a design pattern alongside others. Generators are also **coroutines** — functions that can be suspended and resumed — and in Python that idea grew into `async` and `await`, which [[operating-systems]] and [[distributed-systems]] use for concurrency without threads. Stream processing of unbounded data is a central theme of [[databases]] and [[distributed-systems]], and lazy evaluation is the default in Haskell, discussed in [[programming-languages]].

::: summary
- An **iterable** has `__iter__` returning an **iterator**; an iterator has `__next__`, returning elements until it raises `StopIteration` ([[#def-iterator]]). `for`, `list`, `sum`, comprehensions and unpacking all use this protocol ([[#def-for]]).
- Iterators are one-shot cursors: `map`, `filter`, `zip`, files and generators are exhausted after one pass.
- A **generator function** contains `yield`; calling it returns a generator that runs the body lazily, suspending at each `yield` with its frame intact ([[#def-generator]]). `yield from` delegates to another iterable.
- Generators can be **infinite** (`count`, `primes()`); the consumer decides how much is computed (`islice`, `next`, `takewhile`).
- In a lazy pipeline, each source element is fetched and each stage's work is done only on demand ([[#thm-demand]]): memory is independent of the input's length.
- Pipelines of small generator stages, with `itertools` and bounded state (a `deque` window), process streams of any size; `groupby` groups only consecutive runs.
- Close generators that hold resources (`close()`, `finally`, `contextlib.closing`).
:::

## Exercises

::: exercise How many calls? {level=1 check="6"}
With `f` a squaring function that counts its calls, how many times is `f` called by `next(x for x in map(f, range(10)) if x > 20)`? (Enter the number.)
::: solution
The squares are produced lazily: $0, 1, 4, 9, 16, 25$. The first one greater than $20$ is $25 = f(5)$, the sixth call, after which `next` returns and nothing more is computed. So `f` is called $6$ times.
:::
:::

::: exercise Iterating twice {level=1}
Predict the output: `g = (c.upper() for c in "abc")`, then `print("b".upper() in g, list(g))`. Explain.
::: solution
It prints `True ['C']`. The membership test `"B" in g` consumes the generator until it finds `"B"`: it takes `"A"` (no match) and `"B"` (match) and stops. The generator is now positioned after `"B"`, so `list(g)` gets only `"C"`. With a list instead of a generator, the result would be `True ['A', 'B', 'C']`.
:::
:::

::: exercise A generator of evens {level=1}
Write a generator function `evens(limit)` that yields the even numbers $0, 2, 4, \dots$ below `limit`, and an infinite version `all_evens()`. Use the second with `islice` to get the first five.
::: solution
```python
from itertools import islice, count

def evens(limit):
    n = 0
    while n < limit:
        yield n
        n += 2

def all_evens():
    for n in count():
        yield 2 * n

print(list(evens(9)), list(islice(all_evens(), 5)))
```

```console
$ python3 evens.py
[0, 2, 4, 6, 8] [0, 2, 4, 6, 8]
```

(`range(0, limit, 2)` and `count(0, 2)` do the same with built-in iterators.)
:::
:::

::: exercise Chunks {level=2}
Write a generator `chunks(iterable, k)` that yields lists of $k$ consecutive elements (the last list may be shorter), working on any iterable, including infinite ones and one-shot iterators. Test it on `range(7)` with $k = 3$ and on `primes()` (first three chunks of four).
::: solution
```python
from itertools import islice

def chunks(iterable, k):
    it = iter(iterable)             # one iterator, shared by every islice
    while True:
        chunk = list(islice(it, k))
        if not chunk:
            return
        yield chunk

print(list(chunks(range(7), 3)))
```

```console
$ python3 chunks.py
[[0, 1, 2], [3, 4, 5], [6]]
```

With the `primes` generator from the chapter, `list(islice(chunks(primes(), 4), 3))` gives `[[2, 3, 5, 7], [11, 13, 17, 19], [23, 29, 31, 37]]`. The call `iter(iterable)` is essential: on a list, `islice(iterable, k)` would start from the beginning each time and loop for ever; on a single shared iterator each `islice` continues where the previous one stopped. (Python 3.12 added this function to the standard library as `itertools.batched`, yielding tuples.)
:::
:::

::: exercise The hundredth prime {level=2 check="541"}
Use `primes()` and `islice` to find the $100$th prime. (Enter it.) How many integers $n$ does the generator examine to produce it?
::: solution
`next(islice(primes(), 99, None))` is $541$: the element at position $99$, counting from $0$. The generator's loop runs for $n = 2, 3, \dots, 541$, examining $540$ integers, and stops suspended at the `yield` of $541$.
:::
:::

::: exercise Fibonacci digits {level=2 check="476"}
Write a generator `fib()` yielding $F_0 = 0, F_1 = 1, F_2 = 1, \dots$ and find the index of the first Fibonacci number with at least $100$ decimal digits, using `enumerate` and a generator expression. (Enter the index.)
::: solution
```python
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print(next(i for i, f in enumerate(fib()) if len(str(f)) >= 100))
```

```console
$ python3 fibdigits.py
476
```

The answer is $476$. A quick estimate agrees: $F_n \approx \varphi^n/\sqrt 5$ with $\varphi \approx 1.618$, so $F_n \ge 10^{99}$ when $n \log_{10}\varphi - \log_{10}\sqrt5 \ge 99$, i.e. $n \ge (99 + 0.349)/0.20899 \approx 475.4$.
:::
:::

::: exercise The incremental sieve is correct {#exr-sieve level=3}
Prove that `primes()` yields exactly the primes, in increasing order. Use the invariant: at the start of the iteration for $n$, (i) the keys of `composites` are distinct multiples $m \ge n$ of the primes $p < n$ found so far, each prime owning exactly one key $m_p \ge \max(n, p^2)$; and (ii) every multiple of $p$ in the range $[\,p^2, m_p)$ that is $\ge n$ is the key of some other prime.
::: solution
*Initially* ($n = 2$) there are no primes below $n$ and the dictionary is empty, so (i) and (ii) hold.

*$n$ is yielded exactly when it is prime.* If $n$ is composite, let $p$ be its smallest prime factor; then $p < n$ and $p^2 \le n$, and $n$ is a multiple of $p$ in $[p^2, \infty)$ with $n \ge n$. If $n < m_p$, (ii) says $n$ is a key; if $n = m_p$ it is $p$'s key; $n > m_p$ is impossible since $m_p \ge n$. So composite $n$ is always a key and is not yielded. If $n$ is prime, every key is a multiple of some prime $p < n$ and is at least $p^2 > p$, so it is a proper multiple of $p$ and cannot be the prime $n$; hence $n$ is not a key and is yielded.

*Preservation.* If $n$ is prime, the new entry $n^2 \mapsto n$ is not already a key: a key equal to $n^2$ would be a multiple of a prime $p < n$, but $n^2$'s only prime factor is $n$. The new prime has $m_n = n^2 \ge \max(n+1, n^2)$ and nothing to cover in (ii). If $n$ is composite, the prime $p$ owning key $n$ moves to the first multiple $m > n$ of $p$ that is not already a key; the multiples skipped are keys of other primes, which is exactly (ii) for the new $m_p$, and $n$ itself drops below the new lower bound $n + 1$. Other primes' keys are unchanged and are $> n$ (they differ from $n$, the one key equal to $n$ having been removed), so they are $\ge n + 1$. Since the yielded numbers are the primes among $2, 3, 4, \dots$ in turn, they are yielded in increasing order.
:::
:::

::: exercise A lazy merge {level=3}
Write a generator `merge(a, b)` that merges two iterables, each sorted in non-decreasing order, into one sorted stream, holding at most one pending element from each input at any time. Test it on two infinite inputs — the multiples of $3$ and of $5$ — taking the first ten elements. State the loop invariant that makes it correct.
::: solution
```python
from itertools import count, islice

def merge(a, b):
    """Requires: a and b sorted (non-decreasing). Yields their elements, sorted."""
    a, b = iter(a), iter(b)
    done = object()                       # a sentinel no input can contain
    x, y = next(a, done), next(b, done)   # one pending element from each side
    while x is not done and y is not done:
        if x <= y:
            yield x
            x = next(a, done)
        else:
            yield y
            y = next(b, done)
    while x is not done:                  # one side is finished: drain the other
        yield x
        x = next(a, done)
    while y is not done:
        yield y
        y = next(b, done)

print(list(islice(merge(count(3, 3), count(5, 5)), 10)))
print(list(merge([1, 4, 9], [2, 3, 10, 11])))
```

```console
$ python3 merge.py
[3, 5, 6, 9, 10, 12, 15, 15, 18, 20]
[1, 2, 3, 4, 9, 10, 11]
```

*Invariant* of the first loop: every element yielded so far is $\le$ both pending elements $x$ and $y$, the yielded elements are in non-decreasing order, and the pending elements together with the unread parts of `a` and `b` are exactly the elements not yet yielded. Yielding the smaller of $x, y$ keeps all three: it is $\ge$ everything yielded before (by the first clause), and the element that replaces it is $\ge$ it because its input is sorted. The two draining loops continue with one input, which is sorted. `next(it, done)` returns the default `done` instead of raising `StopIteration`, which keeps the loop simple; `15` appears twice because it is a multiple of both. (`heapq.merge` in the standard library generalises this to any number of inputs.)
:::
:::
