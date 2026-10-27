Here are three small functions. The first adds the integers from $a$ to $b$, the second adds their cubes, and the third adds the terms $\frac{1}{1\cdot 3} + \frac{1}{5\cdot 7} + \frac{1}{9 \cdot 11} + \cdots$ of a series that converges, very slowly, to $\pi/8$.

```text
def sum_ints(a, b):          def sum_cubes(a, b):            def pi_sum(a, b):
    total = 0                    total = 0                       total = 0
    while a <= b:                while a <= b:                   while a <= b:
        total += a                   total += a ** 3                 total += 1 / (a * (a + 2))
        a = a + 1                    a = a + 1                       a = a + 4
    return total                 return total                    return total
```

They are the same function three times. Only two things differ: the *term* added for each value, and the *step* from one value to the next. In mathematics we would write all three with a single notation, $\sum_{n=a}^{b} f(n)$, in which the term $f$ is a parameter. A programming language that lets functions be passed as arguments lets us do the same: write the pattern once, and supply the term and the step as functions.

This is abstraction by parameterisation ([[program-design/abstraction-specifications]]) applied to *behaviour* rather than data, and it turns out to be one of the most productive ideas in programming. This chapter covers functions as values, the three workhorses `map`, `filter` and `reduce` with the laws they obey, lambda expressions and closures, and functions that build other functions — composition, partial application and decorators. [[programming-1/functions]] gave a first look at these ideas; here they become a design tool.

## Functions as values

::: definition First-class function, higher-order function {#def-hof}
A language has **first-class functions** if functions are values like any other: they can be bound to names, stored in data structures, passed as arguments and returned as results. A **higher-order function** is one that takes a function as an argument or returns one as its result.
:::

In Python, `def` creates a function object and binds it to a name, exactly as an assignment would. The name can be rebound and the object passed around:

```python
def sum_series(term, a, next, b):
    """Requires: next(x) > x for all x.
    Effects:  returns term(a) + term(next(a)) + term(next(next(a))) + ...
              over all those values that are <= b."""
    total = 0
    while a <= b:
        total += term(a)
        a = next(a)
    return total

def inc(n):  return n + 1
def cube(n): return n ** 3

print(sum_series(cube, 1, inc, 10))
print(sum_series(lambda n: n, 1, inc, 100))
pi8 = sum_series(lambda k: 1 / (k * (k + 2)), 1, lambda k: k + 4, 10_000)
print(8 * pi8)
```

```console
$ python3 series.py
3025
5050
3.141392653591789
```

`sum_series` names the general idea, $\sum f(n)$ over a sequence of $n$, and the three original functions become one-line calls. The precondition `next(x) > x` guarantees termination: the values increase, and since they are integers here, they eventually exceed `b`. (After $2500$ terms the $\pi$ series is still wrong in the fourth decimal place, an instance of the slow convergence of alternating-type series.)

### Functions that return functions

A higher-order function can also *make* functions. The derivative of $f$ is a function, and so it is natural to compute it with a function that returns a function. The central difference $\frac{f(x+h) - f(x-h)}{2h}$ approximates $f'(x)$ with an error proportional to $h^2$ for smooth $f$, as long as $h$ is not so small that rounding errors dominate. Newton's method, used below, is analysed in [Maths Atlas: root finding](/learn/maths/lesson.php?c=numerical-analysis&l=root-finding).

```python
def deriv(f, h=1e-6):
    """Effects: returns a function approximating the derivative of f."""
    return lambda x: (f(x + h) - f(x - h)) / (2 * h)

def newton(f, x, tol=1e-12, max_steps=50):
    """Newton's method from the starting point x.
    Effects: returns (r, steps) with abs(f(r)) < tol, or raises ArithmeticError."""
    df = deriv(f)
    for step in range(max_steps):
        fx = f(x)
        if abs(fx) < tol:
            return x, step
        x = x - fx / df(x)           # the tangent at x crosses zero here
    raise ArithmeticError("Newton's method did not converge")

cube = lambda x: x ** 3
print(deriv(cube)(5))
print(newton(lambda x: x * x - 2, 1.0))
print(newton(lambda x: x ** 3 - 2 * x - 5, 2.0))
```

```console
$ python3 newton.py
75.0000000167006
(1.4142135623730951, 5)
(2.0945514815423265, 4)
```

`deriv(cube)` is a new function, and `deriv(cube)(5)` applies it, giving $3 \cdot 5^2 = 75$ up to an error of about $2 \times 10^{-8}$. `newton` uses `deriv` internally, so it needs only $f$ itself: it finds $\sqrt 2$ in five steps and the root of $x^3 - 2x - 5$, the cubic on which Newton himself demonstrated the method, in four. Neither function knows anything about the functions it is given; each implements one mathematical idea, once.

::: widget plot
f: x^3 - 2*x - 5
x: 0.5, 3.5
y: -10, 25
tangent: 3
hlines: 0
points: 2.0945515, 0
caption: Newton's method on $f(x) = x^3 - 2x - 5$. Drag the point of tangency: the tangent line crosses the $x$-axis at $x - f(x)/f'(x)$, the next iterate. From $x = 3$ the tangent lands near $2.36$; drag the point there and the next tangent lands near $2.13$, closing in fast on the root $2.0946$ (marked). Move the point near $x \approx 0.82$, where $f'(x) = 3x^2 - 2 = 0$, and the tangent becomes horizontal — the step `fx / df(x)` divides by almost zero, and the method can be thrown far away.
:::

::: example Tracing a returned function {#ex-deriv-trace}
Trace `d = deriv(cube); d(5)`. Where do the names `f` and `h` used inside the lambda come from when `d(5)` runs, long after `deriv` has returned?
::: solution
1. `deriv(cube)` creates a frame with `f` bound to the cube function and `h = 1e-6`. Its body evaluates the `lambda` expression, which creates a function object. That object records not only its code, `(f(x + h) - f(x - h)) / (2 * h)`, but also a reference to the frame in which it was created.
2. `deriv` returns the function object, and `d` names it. Normally a returned call's frame is discarded; this one survives, because the function object still refers to it.
3. `d(5)` creates a new frame for the lambda with `x = 5`. Evaluating the body, `x` is found in that frame, while `f` and `h` are not, so Python looks in the enclosing frame — the surviving frame of `deriv` — and finds the cube function and `1e-6`.
4. The result is $(125.000075\ldots - 124.999925\ldots) / (2\times10^{-6}) \approx 75$.

A function together with the environment it was created in is a **closure**, and this is the "enclosing" level of the LEGB rule from [[programming-1/functions]].
:::
:::

## Map, filter and reduce

Three higher-order functions capture most loops over sequences. Each replaces a familiar loop pattern by a single call that names the pattern.

::: definition Map, filter and fold {#def-map-filter-reduce}
For a sequence $xs = [x_1, \dots, x_n]$:

- $\mathrm{map}(f, xs) = [f(x_1), \dots, f(x_n)]$ applies $f$ to every element;
- $\mathrm{filter}(p, xs)$ is the subsequence of the $x_i$ with $p(x_i)$ true, in their original order;
- the **left fold** $\mathrm{foldl}(\oplus, e, xs) = (\cdots((e \oplus x_1) \oplus x_2) \oplus \cdots) \oplus x_n$ combines the elements with a binary function $\oplus$, starting from $e$; the **right fold** $\mathrm{foldr}(\oplus, e, xs) = x_1 \oplus (x_2 \oplus (\cdots \oplus (x_n \oplus e)\cdots))$ groups from the right. For the empty sequence both are $e$.
:::

Python provides `map(f, xs)` and `filter(p, xs)` as built-ins — both return lazy iterators, so wrap them in `list(...)` to see the elements (the reason is the subject of [[program-design/iterators-generators]]) — and the left fold as `functools.reduce(op, xs, e)`.

```python
from functools import reduce
import operator

xs = [3, 1, 4, 1, 5, 9, 2, 6]
print(list(map(lambda x: x * x, xs)))
print(list(filter(lambda x: x % 2 == 0, xs)))
print(reduce(operator.add, xs, 0), reduce(operator.mul, xs, 1), reduce(max, xs))
print(reduce(lambda acc, d: 10 * acc + d, [2, 0, 2, 6], 0))
print(reduce(lambda acc, w: acc + len(w), ["map", "filter", "reduce"], 0))
words = ["kiwi", "Fig", "apple", "pear"]
print([w.upper() for w in words if len(w) == 4])
print(list(map(str.upper, filter(lambda w: len(w) == 4, words))))
```

```console
$ python3 mfr.py
[9, 1, 16, 1, 25, 81, 4, 36]
[4, 2, 6]
31 6480 9
2026
15
['KIWI', 'PEAR']
['KIWI', 'PEAR']
```

The operator module provides named functions for Python's operators (`operator.add` is `lambda a, b: a + b`). `reduce(max, xs)` without an initial value starts from the first element; for an empty list it would raise `TypeError`, so give an initial value whenever the sequence might be empty. The fold with `10 * acc + d` is Horner's rule, turning a list of digits into a number.

The last two lines compute the same thing: a list comprehension `[f(x) for x in xs if p(x)]` is a combination of map and filter with friendlier syntax, and in Python it is usually preferred when the function is written inline. `map` and `filter` read better when the function already has a name, as with `str.upper`.

::: algorithm Left fold {#alg-foldl}
**Input:** a binary function $\oplus$, an initial value $e$, a sequence $x_1, \dots, x_n$. **Output:** $\mathrm{foldl}(\oplus, e, xs)$.

1. $acc \gets e$.
2. For $i = 1, \dots, n$: $acc \gets acc \oplus x_i$.
3. Return $acc$.
:::

The loop invariant is "$acc = \mathrm{foldl}(\oplus, e, [x_1, \dots, x_i])$", and the fold costs $n$ applications of $\oplus$. Every accumulation loop you have written — sums, counts, maxima, building strings — is an instance of this algorithm with a particular $\oplus$.

::: example When the order of folding matters {#ex-fold-order}
Compute $\mathrm{foldl}(-, 0, [1, 2, 3])$ and $\mathrm{foldr}(-, 0, [1, 2, 3])$, and explain why they differ while the two folds of $+$ agree.
::: solution
$\mathrm{foldl}(-, 0, [1, 2, 3]) = ((0 - 1) - 2) - 3 = -6$ and $\mathrm{foldr}(-, 0, [1, 2, 3]) = 1 - (2 - (3 - 0)) = 1 - (2 - 3) = 2$. In code:

```python
from functools import reduce

def foldr(op, xs, e):
    acc = e
    for x in reversed(xs):           # combine from the right end
        acc = op(x, acc)
    return acc

print(reduce(lambda a, x: a - x, [1, 2, 3], 0), foldr(lambda x, a: x - a, [1, 2, 3], 0))
print(reduce(lambda a, x: a + x, [1, 2, 3], 0), foldr(lambda x, a: x + a, [1, 2, 3], 0))
```

```console
$ python3 folds.py
-6 2
6 6
```

Subtraction is not associative, $(a - b) - c \neq a - (b - c)$, so the grouping changes the result. Addition is associative and $0$ is an identity for it, and then, as the next theorem proves, the grouping does not matter.
:::
:::

::: theorem Folds of a monoid agree {#thm-monoid-fold}
If $\oplus$ is associative and $e$ is an identity for it ($e \oplus x = x \oplus e = x$ for all $x$), then $\mathrm{foldl}(\oplus, e, xs) = \mathrm{foldr}(\oplus, e, xs)$ for every finite sequence $xs$.
:::

::: proof
Write $L(xs)$ and $R(xs)$ for the two folds. We first show, by induction on the length of $xs$, that for every value $a$,

$$
\mathrm{foldl}(\oplus, a, xs) = a \oplus L(xs). \qquad (*)
$$

For the empty sequence both sides are $a$ (since $a \oplus e = a$). For $xs = [x] + ys$, the definition gives $\mathrm{foldl}(\oplus, a, xs) = \mathrm{foldl}(\oplus, a \oplus x, ys)$, which by the induction hypothesis is $(a \oplus x) \oplus L(ys)$. On the other side, $L(xs) = \mathrm{foldl}(\oplus, e \oplus x, ys) = \mathrm{foldl}(\oplus, x, ys) = x \oplus L(ys)$, again by the hypothesis, so $a \oplus L(xs) = a \oplus (x \oplus L(ys))$, which equals $(a \oplus x) \oplus L(ys)$ by associativity.

Now prove $L(xs) = R(xs)$ by induction on the length. Both are $e$ for the empty sequence. For $xs = [x] + ys$, $R(xs) = x \oplus R(ys) = x \oplus L(ys)$ by the induction hypothesis, and $L(xs) = \mathrm{foldl}(\oplus, e \oplus x, ys) = \mathrm{foldl}(\oplus, x, ys) = x \oplus L(ys)$ by $(*)$. So $L(xs) = R(xs)$.
:::

A set with an associative operation and an identity is a **monoid**: numbers with $+$ and $0$, or with $\times$ and $1$, strings with concatenation and `""`, lists with `+` and `[]`, Booleans with `and` and `True`, functions with composition and the identity function. The theorem has a consequence far beyond tidiness: a fold over a monoid can be computed in *any* grouping, for instance by splitting the sequence into pieces, folding each piece on a different processor, and folding the results. That observation is the basis of the parallel "reduce" step in MapReduce-style systems ([[parallel-computing]], [[distributed-systems]]).

::: warning Floating-point addition is not associative
`sum` of floats, as a fold, depends on the order: `(0.1 + 0.2) + 0.3` is `0.6000000000000001` while `0.1 + (0.2 + 0.3)` is `0.6`. The theorem above applies only to truly associative operations, so a parallel sum of floats can differ in the last bits from a sequential one, and from run to run if the grouping varies. [[computer-systems/floating-point]] explains why, and `math.fsum` computes a correctly rounded sum regardless of order.
:::

### Laws of map and filter

Higher-order functions obey simple algebraic laws, which justify transforming programs.

::: theorem Map fusion {#thm-map-fusion}
For all functions $f$, $g$ and finite sequences $xs$: $\mathrm{map}(f, \mathrm{map}(g, xs)) = \mathrm{map}(f \circ g, xs)$, where $(f\circ g)(x) = f(g(x))$.
:::

::: proof
By induction on the length of $xs$. If $xs$ is empty, both sides are empty. Otherwise $xs = [x] + ys$ and, by the definition of map,

$$
\mathrm{map}(f, \mathrm{map}(g, [x] + ys)) = \mathrm{map}(f, [g(x)] + \mathrm{map}(g, ys)) = [f(g(x))] + \mathrm{map}(f, \mathrm{map}(g, ys)).
$$

By the induction hypothesis the last term equals $[(f\circ g)(x)] + \mathrm{map}(f \circ g, ys) = \mathrm{map}(f\circ g, [x] + ys)$.
:::

Read from left to right, the law turns two passes over the data into one, saving the intermediate list; compilers for functional languages apply it automatically. The proof assumes that $f$ and $g$ are *pure* — that calling them has no side effects — because otherwise the order in which the calls happen (all $g$'s first, or interleaved) could matter. [[program-design/functional-style]] makes that assumption the centre of a programming style.

::: quiz
Which expression always equals `list(filter(p, map(f, xs)))` for pure `f` and `p`?
- [ ] `list(map(f, filter(p, xs)))`
- [x] `[y for y in (f(x) for x in xs) if p(y)]`
- [ ] `[f(x) for x in xs if p(x)]`
- [ ] `list(filter(lambda x: p(f(x)), xs))`
::: solution
The original applies `f` first and tests `p` on the *results*. The second option does the same, written as nested comprehensions. The first and third test `p` on the original elements, which is a different computation (take `f = lambda x: -x`, `p = lambda y: y > 0`, `xs = [1]`: the original gives `[]`, they give `[-1]`). The last tests the right condition, `p(f(x))`, but returns the original elements `x` rather than `f(x)`.
:::
:::

## Lambda expressions and closures

A `lambda` expression creates an anonymous function whose body is a single expression: `lambda x, y: x * y + 1`. It is exactly equivalent to a `def` with a `return`, except that it has no name and cannot contain statements. Lambdas suit short functions used once, as arguments; anything that needs a name, a docstring or more than one line deserves a `def`.

Every function, whether made by `def` or `lambda`, remembers the environment in which it was created.

::: definition Closure {#def-closure}
A **closure** is a function value together with the environment — the bindings of the names that it uses but does not define (its **free variables**) — that was current when the function was created. When the function is later called, its free variables are looked up in that environment, not in the environment of the caller. Python implements this for nested functions: the enclosing function's local variables that an inner function refers to stay alive as long as the inner function does.
:::

```python
def make_counter():
    count = 0
    def counter():
        nonlocal count            # assign to the enclosing variable, not a new local
        count += 1
        return count
    return counter

c1, c2 = make_counter(), make_counter()
print(c1(), c1(), c1(), c2())
print(c1.__closure__[0].cell_contents)
```

```console
$ python3 counter.py
1 2 3 1
3
```

Each call of `make_counter` creates a new frame with its own `count`, so `c1` and `c2` are independent. The `nonlocal` declaration is needed because `count += 1` is an assignment, which would otherwise make `count` local to `counter` (and raise `UnboundLocalError`, as in [[programming-1/functions]]). Python stores the captured variables in **cells**, visible through the function's `__closure__` attribute.

A closure with private mutable state is an object with one method; an object is a bundle of closures over shared state. The counter could equally be a class with a `count` attribute and a `__call__` method. Which to use is a matter of clarity: a closure is lighter for a single behaviour, a class is clearer when there are several operations or when the state should be inspectable.

::: example Late binding in a loop {#ex-late-binding}
What does this program print, and how can it be made to print `0 10 20`?

```python
multipliers = []
for k in range(3):
    multipliers.append(lambda x: k * x)
print(*[m(10) for m in multipliers])
```
::: solution
It prints `20 20 20`. Each lambda's free variable `k` refers to the *variable* `k` of the enclosing scope, not to its value at the moment the lambda was created. All three lambdas share that one variable, and by the time they are called the loop has finished with `k = 2`.

Two fixes:

```python
by_default = [lambda x, k=k: k * x for k in range(3)]   # default evaluated at creation

def times(k):                                            # a new scope per closure
    return lambda x: k * x
by_factory = [times(k) for k in range(3)]

print(*[m(10) for m in by_default], *[m(10) for m in by_factory])
```

```console
$ python3 late.py
0 10 20 0 10 20
```

The first uses the fact that default values are evaluated once, when the function is defined (the behaviour that is a trap for mutable defaults is a tool here). The second calls a factory function, so each closure captures the `k` of a separate frame. The factory is the clearer of the two.
:::
:::

::: warning Closures capture variables, not values
A closure sees the *current* value of each captured variable when it runs. This is what makes `make_counter` work, and what makes [[#ex-late-binding]] surprising. Whenever you create functions in a loop, ask which variable each function will see when it is called.
:::

## Building functions from functions

Once functions are values, operations *on functions* become natural.

**Composition.** `compose(f, g)` returns $f \circ g$. Folding composition over a list of functions — composition is associative, with the identity function as identity, so [[#thm-monoid-fold]] applies — gives a pipeline:

```python
from functools import reduce, partial

def compose(f, g):
    return lambda x: f(g(x))

def pipeline(*fs):
    """Effects: returns the function applying fs[0], then fs[1], ..., in order."""
    return reduce(lambda acc, f: compose(f, acc), fs, lambda x: x)

clean = pipeline(str.strip, str.lower, lambda s: s.replace(" ", "_"))
print(clean("  Higher Order Functions "))

def power(base, exp):
    return base ** exp
square, two_to = partial(power, exp=2), partial(power, 2)
print(square(7), two_to(10), sorted(["pear", "Fig", "apple"], key=str.lower))
```

```console
$ python3 compose.py
higher_order_functions
49 1024 ['apple', 'Fig', 'pear']
```

**Partial application.** `functools.partial(f, a)` fixes some arguments of `f` and returns a function of the rest: `partial(power, 2)` is $e \mapsto 2^e$, and `partial(power, exp=2)` is $b \mapsto b^2$. A function of several arguments that returns a function of the next, `lambda a: lambda b: f(a, b)`, is said to be **curried** (after the logician Haskell Curry); in languages like Haskell every function is curried and partial application is just calling with fewer arguments.

**Key functions.** Many library functions take a function that says *what to compare*: `sorted(xs, key=str.lower)`, `max(people, key=lambda p: p.age)`, `min(points, key=abs)`. The `operator` module provides `itemgetter(1)` (equivalent to `lambda t: t[1]`) and `attrgetter("age")` for the common cases.

### Decorators

A **decorator** is a higher-order function that takes a function and returns a modified version of it. Python's syntax `@d` above a `def` means "define the function, then replace it by `d` applied to it".

::: example A counting, memoising decorator {#ex-memo}
Write a decorator `memo` that caches a function's results, and use a counter to compare the number of times the body of `fib` runs with and without it, for `fib(25)`.
::: solution
```python
import functools

def counted(f):
    """Decorator: count how many times f's body is entered."""
    @functools.wraps(f)              # keep f's name and docstring
    def wrapper(*args):
        wrapper.calls += 1
        return f(*args)
    wrapper.calls = 0
    return wrapper

def memo(f):
    """Decorator: remember f's result for each argument tuple."""
    cache = {}
    @functools.wraps(f)
    def wrapper(*args):
        if args not in cache:
            cache[args] = f(*args)
        return cache[args]
    return wrapper

@counted
def slow_fib(n):
    return n if n < 2 else slow_fib(n - 1) + slow_fib(n - 2)

@memo
@counted
def fast_fib(n):
    return n if n < 2 else fast_fib(n - 1) + fast_fib(n - 2)

print(slow_fib(25), slow_fib.calls)
print(fast_fib(25), fast_fib.__wrapped__.calls, fast_fib.__name__)
```

```console
$ python3 memo.py
75025 242785
75025 26 fast_fib
```

Without memoisation the body runs $242{,}785$ times, the count $2F_{26} - 1$ found for naive Fibonacci in [[programming-1/recursion]]. With it, the body runs once for each distinct argument $0, 1, \dots, 25$: $26$ times. Decorators stack from the bottom up — `fast_fib = memo(counted(fast_fib))` — and the recursive calls inside the body look up the name `fast_fib` in the global scope, where they find the memoised version, which is why the cache helps the recursion and not just repeated top-level calls. `functools.wraps` copies the name and docstring to the wrapper and records the original in `__wrapped__`. The standard library provides this decorator as `functools.cache` (and `functools.lru_cache` with a size limit).
:::
:::

Decorators let a cross-cutting concern — caching, counting, timing, logging, checking preconditions, registering a function in a table — be written once and attached to any function with one line, without editing the function's body. They work because functions are values, and `@` is nothing more than an assignment.

::: history
Higher-order functions are older than computers. Alonzo Church's λ-calculus (developed from 1932 and used in his 1936 paper on undecidability) is a theory of nothing but functions, in which numbers, pairs and Booleans are themselves encoded as functions. John McCarthy's LISP ("Recursive functions of symbolic expressions and their computation by machine, Part I", *CACM*, 1960) borrowed Church's `lambda` notation and included `maplist`, an early map. Peter Landin coined the term "closure" in "The mechanical evaluation of expressions" (1964), and Gerald Sussman and Guy Steele's Scheme (1975) made lexically scoped closures the default. John Backus's Turing Award lecture "Can programming be liberated from the von Neumann style?" (1978) argued for programming by combining functions. Python has had `lambda`, `map`, `filter` and `reduce` since version 1.0 (1994); in Python 3.0 (2008) `reduce` moved to `functools`. Jeffrey Dean and Sanjay Ghemawat's MapReduce (2004) carried the two names into large-scale data processing.
:::

## Where this leads

[[program-design/functional-style]] takes the next step: if functions have no side effects and data never changes, programs can be reasoned about by substitution, as in algebra, and laws like map fusion hold without qualification. [[program-design/iterators-generators]] explains why `map` and `filter` return lazy iterators, and builds pipelines that process unbounded streams one element at a time. The strategy and observer patterns of [[program-design/modules-patterns]] are, in Python, mostly functions passed as values. In [[programming-languages]], closures and higher-order functions are studied through the λ-calculus and through how interpreters represent environments, and in [[parallel-computing]] the monoid law becomes parallel reduction.

::: summary
- Functions are **first-class** values; a **higher-order function** takes or returns functions, abstracting over behaviour as parameters abstract over data ([[#def-hof]]).
- Functions can build functions: `deriv(f)` returns an approximate derivative, and `newton` uses it without knowing anything about `f`.
- `map`, `filter` and the folds capture the common loop patterns ([[#def-map-filter-reduce]]); a left fold is an accumulation loop ([[#alg-foldl]]). In Python, comprehensions are often clearer than `map`/`filter` with a lambda.
- For an associative operation with an identity (a **monoid**), left and right folds agree and any grouping gives the same result ([[#thm-monoid-fold]]) — the basis of parallel reduction; floating-point addition is not associative.
- Map fusion $\mathrm{map}(f, \mathrm{map}(g, xs)) = \mathrm{map}(f\circ g, xs)$ holds for pure functions ([[#thm-map-fusion]]).
- A **closure** captures the *variables* of its defining environment, not their values; use `nonlocal` to assign to them, and beware of closures created in loops ([[#def-closure]]).
- Composition, `functools.partial`, key functions and **decorators** build new functions from old; `@d` simply rebinds a function to `d(function)`.
:::

## Exercises

::: exercise Horner by fold {level=1 check="314"}
What is `reduce(lambda acc, d: 10 * acc + d, [3, 1, 4], 0)`? (Enter the value.)
::: solution
By [[#alg-foldl]]: $acc = 0$, then $10\cdot 0 + 3 = 3$, then $10\cdot 3 + 1 = 31$, then $10\cdot 31 + 4 = 314$.
:::
:::

::: exercise From loops to map and filter {level=1}
Rewrite each loop as a single expression using a comprehension, and again using `map`/`filter`/`reduce`:

```python
out = []
for w in words:
    if w.isalpha():
        out.append(len(w))

best = None
for p in prices:
    if best is None or p < best:
        best = p
```
::: solution
The first: `[len(w) for w in words if w.isalpha()]`, or `list(map(len, filter(str.isalpha, words)))`. The second computes the minimum, with `None` for an empty list: `min(prices, default=None)`, or `reduce(lambda best, p: p if best is None or p < best else best, prices, None)`. The library function `min` is the best choice: it names the intent directly.
:::
:::

::: exercise Late binding again {level=1 check="16"}
What does `fs = [lambda x: x + i for i in range(4)]; print(sum(f(1) for f in fs))` print? (Enter the number.)
::: solution
All four lambdas capture the same variable `i` of the comprehension's scope, whose value is $3$ once the comprehension has finished. Each `f(1)` is $1 + 3 = 4$, and the sum is $16$. (With `lambda x, i=i: x + i` the values would be $1, 2, 3, 4$, summing to $10$.)
:::
:::

::: exercise Map and filter from a fold {level=2}
Implement `my_map(f, xs)` and `my_filter(p, xs)`, returning lists, using only `functools.reduce` and list operations. What is the running time of your versions on a list of length $n$, and why?
::: solution
```python
from functools import reduce

def my_map(f, xs):
    return reduce(lambda acc, x: acc + [f(x)], xs, [])

def my_filter(p, xs):
    return reduce(lambda acc, x: acc + [x] if p(x) else acc, xs, [])

print(my_map(lambda x: x * x, [1, 2, 3]), my_filter(lambda x: x > 1, [3, 1, 2]))
```

```console
$ python3 myfold.py
[1, 4, 9] [3, 2]
```

Each step `acc + [f(x)]` builds a new list, copying the whole accumulator, so step $i$ costs $\Theta(i)$ and the total is $\Theta(n^2)$. Mutating the accumulator instead (`acc.append(f(x)); return acc`, written with a helper `def`) gives $\Theta(n)$ — an example of the tension between purely functional style and efficiency that persistent data structures address in [[program-design/functional-style]].
:::
:::

::: exercise A sum of cubes {level=2 check="3025"}
Use `sum_series` to compute $\sum_{k=1}^{10} k^3$ and check it against the formula $\left(\frac{n(n+1)}{2}\right)^2$. (Enter the value.)
::: solution
`sum_series(lambda k: k ** 3, 1, lambda k: k + 1, 10)` gives $3025$ (the first line of `series.py`), and $\left(\frac{10\cdot 11}{2}\right)^2 = 55^2 = 3025$.
:::
:::

::: exercise Composing a list of functions {level=2}
`pipeline` in this chapter starts its fold from the identity function. Explain why the identity is the right starting value, what `pipeline()` with no arguments returns, and in which order `pipeline(f, g, h)` applies the functions. Then write `compose_all(*fs)` returning $f_1 \circ f_2 \circ \cdots \circ f_k$ (so $f_k$ is applied first).
::: solution
The identity $\mathrm{id}$ satisfies $f \circ \mathrm{id} = \mathrm{id} \circ f = f$, so it is the identity element of the composition monoid; folding from it adds nothing, and `pipeline()` returns the identity itself — the correct "do nothing" pipeline. `pipeline(f, g, h)` builds `compose(h, compose(g, compose(f, id)))`, which applies `f` first, then `g`, then `h`. For the mathematical order:

```python
from functools import reduce

def compose_all(*fs):
    return reduce(lambda acc, f: (lambda x, acc=acc, f=f: acc(f(x))), fs, lambda x: x)

inc, dbl = (lambda x: x + 1), (lambda x: 2 * x)
print(compose_all(inc, dbl)(5), compose_all(dbl, inc)(5), compose_all()(7))
```

```console
$ python3 composeall.py
11 12 7
```

`compose_all(inc, dbl)(5)` is $\mathrm{inc}(\mathrm{dbl}(5)) = 11$. The default arguments `acc=acc, f=f` are not strictly necessary here, because each call of the outer lambda creates a fresh scope, but they make the capture explicit.
:::
:::

::: exercise Filter fusion {level=3}
Prove by induction that for pure predicates $p$ and $q$ and every finite sequence $xs$, $\mathrm{filter}(p, \mathrm{filter}(q, xs)) = \mathrm{filter}(r, xs)$ where $r(x) = q(x) \land p(x)$. Where would the proof break if $q$ could raise an exception and $p$ were tested first?
::: solution
If $xs$ is empty, both sides are empty. Let $xs = [x] + ys$, and assume the claim for $ys$. *Case $q(x)$ false:* the inner filter drops $x$, so the left side is $\mathrm{filter}(p, \mathrm{filter}(q, ys))$; and $r(x)$ is false, so the right side is $\mathrm{filter}(r, ys)$; these are equal by hypothesis. *Case $q(x)$ true and $p(x)$ false:* the inner filter keeps $x$ and the outer drops it, giving $\mathrm{filter}(p, \mathrm{filter}(q, ys))$; $r(x)$ is false, giving $\mathrm{filter}(r, ys)$; equal. *Case both true:* the left side is $[x] + \mathrm{filter}(p, \mathrm{filter}(q, ys))$ and the right side $[x] + \mathrm{filter}(r, ys)$; equal by hypothesis.

The proof treats $q(x) \land p(x)$ as a mathematical conjunction. Python's `and` evaluates $q$ first, as the left side does, so the order of evaluation matches. If instead $r(x) = p(x) \land q(x)$ were evaluated with $p$ first, then for an $x$ on which $q$ raises an exception and $p$ is false, the right side would skip $q$ and succeed, while the left side would call $q(x)$ and raise. The equation holds as stated only for total, pure predicates — or for the version that preserves the order of evaluation.
:::
:::

::: exercise Memoised path counting {level=3 check="184756"}
The number of monotone lattice paths from $(0, 0)$ to $(m, n)$, moving one step right or up at a time, satisfies $P(m, 0) = P(0, n) = 1$ and $P(m, n) = P(m-1, n) + P(m, n-1)$. Implement it recursively with the `memo` decorator of [[#ex-memo]] and compute $P(10, 10)$. How many times does the body run, and how many would run without memoisation? (Enter $P(10, 10)$.)
::: solution
```python
import functools

def memo(f):
    cache = {}
    @functools.wraps(f)
    def wrapper(*args):
        if args not in cache:
            cache[args] = f(*args)
        return cache[args]
    return wrapper

runs = 0

@memo
def paths(m, n):
    global runs
    runs += 1
    if m == 0 or n == 0:
        return 1
    return paths(m - 1, n) + paths(m, n - 1)

print(paths(10, 10), runs)
```

```console
$ python3 paths.py
184756 120
```

$P(10, 10) = \binom{20}{10} = 184{,}756$. The body runs once for each distinct argument pair reached: all $(m, n)$ with $0 \le m, n \le 10$ except $(0, 0)$, which is never needed, since the recursion stops at the edges. That is $121 - 1 = 120$. Without memoisation every call with $m, n > 0$ makes two more, and the number of calls equals the number of nodes of the recursion tree, $2\binom{20}{10} - 1 = 369{,}511$ — because each leaf contributes $1$ to the result and a binary tree with $L$ leaves has $2L - 1$ nodes.
:::
:::
