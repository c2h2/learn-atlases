A number is **perfect** if it equals the sum of its divisors smaller than itself: $6 = 1 + 2 + 3$ and $28 = 1 + 2 + 4 + 7 + 14$ are perfect. Which numbers below $10{,}000$ are perfect? With the loops of the last chapter you could write a single block of code that answers this — an outer loop over candidates, an inner loop over possible divisors, a running sum, a comparison, a print — and it would work. But it would be hard to read, hard to test, and impossible to reuse when the next question ("which pairs of numbers are *amicable*?") needs the same divisor sum again.

The remedy is to give the parts of the computation names. "The sum of the proper divisors of $n$" is a meaningful idea in its own right; write it once, as a **function** called `divisor_sum`, check that it is right, and from then on use it as if it were built into the language. Functions are the main tool for managing complexity in programs: they let you think about *what* a piece of code does without thinking about *how* it does it. This chapter covers defining and calling functions, parameters and return values, the rules for which names a function can see (**scope**), how to write a function's contract, and functions as values that can be passed to other functions.

## Defining and calling functions

::: definition Function definition {#def-function}
A **function definition**

```text
def name(parameter_1, ..., parameter_k):
    body
```

creates a function object and binds it to `name`. The **parameters** are names local to the function. A **return statement** `return expression` inside the body ends the function's execution and makes the value of the expression the result of the call; reaching the end of the body, or `return` with no expression, returns `None`.
:::

Defining a function does not run its body; it only records it. The body runs each time the function is **called**, with an expression such as `name(argument_1, ..., argument_k)`. The values supplied in a call are the **arguments**; the names in the definition are the **parameters**. Python's rule for a call is precise, and it is worth stating, because almost every surprise involving functions is explained by it.

::: definition Function call {#def-call}
To evaluate a call `f(e_1, ..., e_k)`:

1. evaluate `f` and the argument expressions `e_1`, …, `e_k`, from left to right;
2. create a new **frame** — a fresh, empty table of local names for this call;
3. in the new frame, bind each parameter to the corresponding argument value;
4. execute the body of `f`, looking up and assigning names in the new frame;
5. when the body executes `return v` (or ends, giving `v = None`), discard the frame and make `v` the value of the call expression, continuing the caller where it left off.
:::

```python
import math

def square(x):
    return x * x

def hypotenuse(a, b):
    """Length of the hypotenuse of a right triangle with legs a and b."""
    return math.sqrt(square(a) + square(b))

print(hypotenuse(3, 4))
print(hypotenuse(5, 12))
```

```console
$ python3 hyp.py
5.0
13.0
```

The line `import math` makes the standard library module `math` available, and `math.sqrt` is its square-root function. The string on the first line of `hypotenuse` is a **docstring**: it documents what the function does, and Python's `help(hypotenuse)` displays it.

::: example Tracing frames {#ex-frames}
Trace the evaluation of `hypotenuse(3, 4)` frame by frame.
::: solution
1. The arguments `3` and `4` are evaluated. A frame for `hypotenuse` is created with `a = 3`, `b = 4`.
2. The body evaluates `square(a) + square(b)`, left operand first. The call `square(a)` evaluates its argument, `3`, and creates a frame for `square` with `x = 3`. That body returns `9`, and the frame is discarded.
3. The call `square(b)` creates a *new* frame for `square`, this time with `x = 4`; it returns `16` and is discarded.
4. Back in the `hypotenuse` frame, `9 + 16` is `25`, and `math.sqrt(25)` is `5.0` (a float). `hypotenuse` returns `5.0`; its frame is discarded and `print` displays the value.

At the deepest point, three frames existed at once: the top-level frame of the program (holding `math`, `square` and `hypotenuse`), the frame of `hypotenuse`, and a frame of `square`. They form a **call stack**: each call pushes a frame, and each return pops it. [[programming-1/recursion]] studies the call stack in detail.
:::
:::

### Returning versus printing

A function that prints its result and a function that returns it look the same when you try them in the REPL, but they are very different.

::: example Print or return? {#ex-print-return}
What does this program print?

```python
def double_print(x):
    print(2 * x)

def double_return(x):
    return 2 * x

a = double_print(5)
b = double_return(5)
print("a =", a)
print("b =", b)
print(double_return(double_return(5)))
```
::: solution
```console
$ python3 printret.py
10
a = None
b = 10
20
```

The first line, `10`, is printed *during* the call `double_print(5)`. That function has no `return`, so it returns `None`, which is what `a` refers to. `double_return(5)` prints nothing, but its value `10` is available to the caller: `b` is `10`, and the value can be passed straight into another call, giving `20`. A function whose result is printed rather than returned can be looked at but not *used*.
:::
:::

::: warning `print` is not `return`
Beginners often write functions that print their answer, and then wonder why `total = add(2, 3)` makes `total` equal to `None`. As a rule, a function that computes something should `return` it and leave the decision about displaying it to its caller. Keep printing at the outer edge of a program — in a top-level loop or a `main` function — and computation in functions that return values. Such functions can be combined, reused and tested automatically ([[programming-1/testing-debugging]]).
:::

### Parameters with defaults and keywords

A parameter may be given a **default value**, used when the caller does not supply that argument, and arguments may be passed **by keyword**, naming the parameter, in which case their order does not matter:

```python
def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

print(greet("Ada"))
print(greet("Alan", "Good morning"))
print(greet("Grace", punctuation="."))
print(greet(greeting="Hi", name="Edsger"))
```

```console
$ python3 defaults.py
Hello, Ada!
Good morning, Alan!
Hello, Grace.
Hi, Edsger!
```

Positional arguments are matched to parameters from the left; keyword arguments are matched by name; every parameter without a default must receive exactly one value, otherwise the call raises `TypeError`. Keyword arguments make calls with many options readable: `round(x, ndigits=2)`, `print(a, b, sep=", ")`, `sorted(words, reverse=True)`.

::: warning A default value is evaluated once
The default value is computed once, when the `def` statement runs — not at every call. For numbers and strings this never matters. For a value that can be changed in place, such as a list, it does:

```python
def add_item(item, basket=[]):     # the default list is created once, at definition time
    basket.append(item)
    return basket

print(add_item("apple"))
print(add_item("pear"))            # surprise: the same list again
```

prints `['apple']` and then `['apple', 'pear']`, because both calls share the one default list. The standard fix is to use `None` as the default and create a fresh list inside the function: `if basket is None: basket = []`. Lists and changing them in place are the subject of [[programming-1/sequences]].
:::

## Scope: which names a function can see

Each call has its own frame, so names assigned inside a function do not interfere with names outside it. The rules that decide which binding a name refers to are called **scope** rules.

::: definition Local and global scope {#def-scope}
A name that is assigned anywhere in a function's body (including its parameters) is **local** to that function: every use of it in the body refers to the binding in the current call's frame. A name used in a function but not assigned there is looked up in the enclosing scopes: first in any enclosing function, then in the module's **global** scope (the top level of the file), and finally among Python's **built-in** names such as `print` and `len`. This order is often abbreviated **LEGB**: local, enclosing, global, built-in.
:::

The rule is decided by the *text* of the function, before it runs: if a name is assigned anywhere in the body, it is local throughout the body.

```python
x = "global"

def show():
    print("inside show:", x)       # no assignment to x here, so this x is the global one

def shadow():
    x = "local"                    # assignment makes x local to shadow
    print("inside shadow:", x)

show()
shadow()
print("outside:", x)
```

```console
$ python3 scope2.py
inside show: global
inside shadow: local
outside: global
```

::: example An unbound local {#ex-unbound}
Explain the error produced by this program.

```python
count = 0

def increment():
    count = count + 1
    return count

print(increment())
```
::: solution
```console
$ python3 scope.py
Traceback (most recent call last):
  File ".../scope.py", line 7, in <module>
    print(increment())
          ~~~~~~~~~^^
  File ".../scope.py", line 4, in increment
    count = count + 1
            ^^^^^
UnboundLocalError: cannot access local variable 'count' where it is not associated with a value
```

Because `count` is assigned in the body of `increment`, it is local to `increment` throughout the body ([[#def-scope]]). The right-hand side `count + 1` therefore refers to the *local* `count`, which has not yet been given a value in this frame — the global `count` is never consulted. The traceback shows two frames, the top-level call on line 7 and the failing line 4 inside `increment`: tracebacks are printouts of the call stack.

Python allows `global count` at the start of the function to make the assignment affect the global name, but the better fix is to pass the value in and return the new one: `def increment(count): return count + 1`, called as `count = increment(count)`. A function that communicates only through its parameters and return value is far easier to understand and test.
:::
:::

The same reasoning explains why a function cannot rebind its caller's variables. After `x = 10`, a call `f(x)` to `def f(x): x = x + 1; return x` returns `11` but leaves the caller's `x` equal to `10`: the parameter `x` is a separate name in a separate frame, bound to the same value, and the assignment rebinds only the local name.

::: quiz
In the program below, what is printed?

```python
total = 5

def add(n):
    total = n + 1
    return total

result = add(10)
print(total, result)
```
- [ ] `11 11`
- [x] `5 11`
- [ ] `5 6`
- [ ] It raises `UnboundLocalError`.
::: solution
`total` is assigned in `add`, so inside `add` it is a local name, unrelated to the global `total`. The call binds the local `total` to `11` and returns it, so `result` is `11`; the global `total` is still `5`. There is no `UnboundLocalError` because the local `total` is assigned *before* it is read.
:::
:::

## Contracts: specifying what a function does

To use a function without reading its body, you need to know exactly what it promises. Writing that promise down is a large part of good programming.

::: definition Specification {#def-spec}
A **specification** (or **contract**) of a function consists of

- a **precondition**: what must be true of the arguments (and any other state) when the function is called; and
- a **postcondition**: what the function guarantees about its return value (and any effects) when the precondition holds.

A function is **correct** with respect to a specification if every call that satisfies the precondition terminates and satisfies the postcondition. If the precondition is violated, the specification promises nothing.
:::

The docstring is the natural place to state the contract, in plain language: "Return the largest integer $r$ with $r^2 \le n$. Requires $n \ge 0$." The precondition is the caller's responsibility and the postcondition the function's. That division of labour is what makes it possible to build large programs: when a result is wrong, the contract tells you whether to look at the caller (who broke the precondition) or the function (which broke the postcondition). Functions often *check* the most important preconditions and raise an exception if they fail, which turns a silent wrong answer into an immediate, visible error.

Contracts also guide how a problem is divided. **Stepwise refinement** (or top-down design) starts with a function for the whole task, writes its body in terms of helper functions that do not exist yet but whose contracts are clear, and then writes each helper the same way, until every function is small enough to get right at a glance.

::: example Perfect numbers by stepwise refinement {#ex-perfect}
Find the perfect numbers below $10{,}000$.
::: solution
At the top level we need "print every perfect number below a limit", which is a loop over candidates using a test `is_perfect(n)`; that test needs "the sum of the proper divisors of $n$". Each piece gets its own function and contract.

```python
def divisor_sum(n):
    """Sum of the divisors of n that are smaller than n, for n >= 1."""
    total = 1 if n > 1 else 0          # 1 divides every n > 1
    d = 2
    while d * d <= n:
        if n % d == 0:
            total += d
            if d != n // d:            # add the partner divisor, once
                total += n // d
        d += 1
    return total

def is_perfect(n):
    """True if n equals the sum of its proper divisors."""
    return divisor_sum(n) == n

def perfect_numbers(limit):
    """Print every perfect number below limit."""
    for n in range(1, limit):
        if is_perfect(n):
            print(n, end=" ")
    print()

perfect_numbers(10_000)
print(divisor_sum(220), divisor_sum(284))
```

```console
$ python3 perfect.py
6 28 496 8128 
284 220
```

`divisor_sum` uses the observation from [[programming-1/control-flow#ex-divisor]]: divisors come in pairs $d$ and $n/d$ with $d \le \sqrt n$, so it only tries $d$ up to $\sqrt n$, adds both members of each pair, and takes care not to add $\sqrt n$ twice when $n$ is a perfect square. Because that cleverness is hidden inside one small function, it can be checked in isolation: comparing it with the slow, obviously correct `sum(d for d in range(1, n) if n % d == 0)` for every $n$ below $3000$ finds no difference. `is_perfect` and `perfect_numbers` are then short enough to be evidently right. The last line shows that $220$ and $284$ form an **amicable pair**: each is the sum of the other's proper divisors.
:::
:::

## Functions as values

In Python a function is a value like any other: it can be bound to another name, stored in a list, passed as an argument and returned as a result. A function that takes or returns functions is called a **higher-order function**. You have already used one: `sorted(words, key=len)` passes the function `len` to `sorted`, which calls it on every element to decide the order. `sorted(["pear", "Fig", "apple", "kiwi"], key=len)` gives `['Fig', 'pear', 'kiwi', 'apple']`, ordered by length ("pear" and "kiwi", both of length 4, keep their original order).

A small function needed only once can be written inline as a **lambda expression**: `lambda x: x * x - 2` is a function of `x` whose value is `x * x - 2`. A lambda's body must be a single expression; anything longer deserves a `def` and a name.

Passing functions as arguments lets one algorithm work for a whole family of problems. The classic numerical example is root-finding by **bisection**: if a continuous function changes sign on an interval, it has a root there, and halving the interval repeatedly closes in on it. (The theorem behind this, the intermediate value theorem, is proved in [Maths Atlas: continuity](/learn/maths/lesson.php?c=calculus-1&l=continuity).)

::: algorithm Bisection {#alg-bisection}
**Input:** a continuous function $f$, numbers $lo < hi$ with $f(lo)\,f(hi) \le 0$, a tolerance $\tau > 0$. **Output:** a number within $\tau$ of a root of $f$ in $[lo, hi]$.

1. While $hi - lo > 2\tau$:
   1. Let $mid \gets (lo + hi)/2$.
   2. If $f(lo)\,f(mid) \le 0$, set $hi \gets mid$; otherwise set $lo \gets mid$.
2. Return $(lo + hi)/2$.
:::

```python
def bisect(f, lo, hi, tol=1e-9):
    """Return x in [lo, hi] within tol of a root of f.

    Requires: f continuous on [lo, hi] and f(lo), f(hi) of opposite signs (or zero).
    """
    if f(lo) * f(hi) > 0:
        raise ValueError("f(lo) and f(hi) must have opposite signs")
    while hi - lo > 2 * tol:
        mid = (lo + hi) / 2
        if f(lo) * f(mid) <= 0:      # a root lies in [lo, mid]
            hi = mid
        else:                        # otherwise it lies in [mid, hi]
            lo = mid
    return (lo + hi) / 2

def g(x):
    return x * x - 2

print(bisect(g, 0, 2))
print(bisect(lambda x: x ** 3 - x - 2, 1, 2))
```

```console
$ python3 bisect.py
1.4142135614529252
1.5213797064498067
```

`bisect` knows nothing about $x^2 - 2$; it only calls whatever function it is given. The first call finds $\sqrt 2 \approx 1.41421356237$ to within $10^{-9}$, and the second finds the real root of $x^3 - x - 2$. The `raise` statement checks the precondition and stops with a clear error if it fails, as discussed in [[programming-1/files-exceptions]].

::: theorem Bisection is correct {#thm-bisection}
Under its precondition, [[#alg-bisection]] terminates after $k = \max\bigl(0, \lceil \log_2 \frac{hi_0 - lo_0}{2\tau} \rceil\bigr)$ iterations, where $lo_0, hi_0$ are the initial endpoints, and returns a number within $\tau$ of a root of $f$.
:::

::: proof
*Invariant:* $lo_0 \le lo < hi \le hi_0$, $f(lo)\,f(hi) \le 0$, and $hi - lo = (hi_0 - lo_0)/2^j$ after $j$ iterations. It holds initially. In an iteration, if $f(lo) f(mid) \le 0$ we keep $lo$ and set $hi \gets mid$, so the new pair satisfies the sign condition. Otherwise $f(lo) f(mid) > 0$, so $f(lo)$ and $f(mid)$ are non-zero with the same sign; since $f(lo) f(hi) \le 0$, $f(hi)$ is zero or of the opposite sign to $f(lo)$, hence to $f(mid)$, so $f(mid) f(hi) \le 0$ and the new pair $(mid, hi)$ satisfies the condition. Either way the length halves.

*Termination:* the loop runs while $(hi_0 - lo_0)/2^j > 2\tau$, i.e. while $2^j < (hi_0 - lo_0)/(2\tau)$; so it stops at the least $j$ with $2^j \ge (hi_0 - lo_0)/(2\tau)$, which is the stated $k$.

*Result:* at the end $f(lo) f(hi) \le 0$ with $f$ continuous, so by the intermediate value theorem $f$ has a root $r$ in $[lo, hi]$. The returned midpoint is at distance at most $(hi - lo)/2 \le \tau$ from every point of $[lo, hi]$, in particular from $r$. (This is an argument about exact real arithmetic; with floats, the computed midpoints are rounded, which matters only when $\tau$ approaches the spacing of floating-point numbers near the root.)
:::

::: widget plot
f: x^2 - 2
x: 0, 2
y: -2.5, 2.5
vlines: 1; 1.5; 1.25; 1.375; 1.4375
points: 1.41421356, 0
hlines: 0
caption: The first five midpoints of bisection on $f(x) = x^2 - 2$ over $[0, 2]$: $1$ (where $f < 0$, so the root is to the right), $1.5$ ($f > 0$, root to the left), $1.25$, $1.375$ and $1.4375$, closing in on $\sqrt 2 \approx 1.4142$ (the marked point). After five steps the root is known to lie in $[1.375, 1.4375]$, an interval of length $2/2^5 = 0.0625$. Each step gains one binary digit of accuracy, whatever the function — slow but completely reliable.
:::

Functions can also *return* functions. The inner function remembers the names of the enclosing call in which it was created — such a function is called a **closure**:

```python
def compose(f, g):
    """Return the function x -> f(g(x))."""
    def h(x):
        return f(g(x))
    return h

inc = lambda x: x + 1
dbl = lambda x: 2 * x
print(compose(inc, dbl)(5), compose(dbl, inc)(5))
```

prints `11 12`: $(\text{inc} \circ \text{dbl})(5) = 2\cdot5 + 1 = 11$, whereas $(\text{dbl}\circ\text{inc})(5) = 2(5 + 1) = 12$. Composition of functions, in programming as in mathematics, is not commutative.

::: widget mapping
domain: -2; -1; 0; 1; 2
codomain: 0; 1; 4
map: -2>4; -1>1; 0>0; 1>1; 2>4
then: 0>even; 1>odd; 4>even
target: even; odd
caption: A Python function computes a mathematical function: `square` sends each integer to its square, and `parity` sends a number to `"even"` or `"odd"`. The figure draws both and their composition `parity(square(x))`. Notice that `square` is not injective ($-2$ and $2$ both go to $4$), so no function can recover $x$ from `square(x)`. Drag an arrow to a new image to change the maps, and watch the composition and its properties update. (Functions in programs can do more than mathematical functions — print, read files, depend on global state — and a function that does none of these, whose result depends only on its arguments, is called **pure**.)
:::

::: history
The **subroutine** is as old as the stored-program computer. For the EDSAC at Cambridge, which ran its first program in 1949, David Wheeler devised the "Wheeler jump", a way of calling a subroutine and returning to the caller; Maurice Wilkes, Wheeler and Stanley Gill's *The Preparation of Programs for an Electronic Digital Computer* (1951) was the first book on programming and described a library of such subroutines. ALGOL 60 introduced procedures with parameters and properly nested local scopes. Niklaus Wirth's paper "Program development by stepwise refinement" (*Communications of the ACM*, 1971) made decomposition into small, specified pieces a method, and David Parnas's "On the criteria to be used in decomposing systems into modules" (1972) argued that each module should hide a design decision behind its interface — the idea behind every contract in this chapter. Lambda expressions come from Church's λ-calculus of the 1930s, by way of John McCarthy's LISP (1958–1960).
:::

## Where this leads

Functions are the unit from which the rest of the course builds. [[programming-1/recursion]] lets a function call itself, which gives elegant solutions to problems that are themselves defined in terms of smaller instances; [[programming-1/testing-debugging]] tests functions against their contracts; and [[programming-1/files-exceptions]] shows how a function signals that its precondition was violated. In [[program-design]] functions grow into modules and classes, and in [[programming-languages]] the scope rules and closures met here are studied as language design decisions.

::: summary
- A function definition binds a name to a function; a call evaluates the arguments, creates a new **frame**, binds parameters to argument values, runs the body and returns a value (`None` if there is no `return`) ([[#def-call]]).
- Return results rather than printing them; printing belongs at the outer edge of a program.
- Default values are evaluated once, at definition time; keyword arguments match parameters by name.
- A name assigned anywhere in a function is **local** throughout it; other names are looked up in enclosing, global and built-in scopes (LEGB) ([[#def-scope]]). A function cannot rebind its caller's variables.
- A **specification** gives a precondition (the caller's duty) and a postcondition (the function's promise) ([[#def-spec]]); stepwise refinement decomposes a task into functions with clear contracts.
- Functions are values: they can be passed (`sorted(key=…)`, `bisect(f, …)`), returned (closures) and written inline as `lambda`. Bisection finds a root to within $\tau$ in about $\log_2((hi - lo)/2\tau)$ steps ([[#thm-bisection]]).
:::

## Exercises

::: exercise Nested calls {level=1 check="31"}
What does this program print? (Enter the number.)

```python
def f(x):
    return 3 * x - 1

def g(y):
    return f(y) + f(y + 1)

print(g(f(2)))
```
::: solution
The argument is evaluated first: `f(2)` is $3 \cdot 2 - 1 = 5$. Then `g(5)` evaluates `f(5) + f(6)` $= 14 + 17 = 31$. The program prints `31`.
:::
:::

::: exercise Parameters are local {level=1}
What does this program print? Explain using frames.

```python
x = 10

def f(x):
    x = x + 1
    return x

y = f(x)
print(x, y)
```
::: solution
It prints `10 11`. The call `f(x)` evaluates the argument to $10$ and creates a frame in which the *parameter* `x` is bound to $10$. The assignment `x = x + 1` rebinds the local `x` to $11$ and the function returns $11$. The global `x` is a different name in a different frame and still refers to $10$.
:::
:::

::: exercise A function with a contract {level=1}
Write a function `fahrenheit(celsius)` with a docstring stating its contract, and a function `describe(celsius)` that uses it and returns a string such as `'21.5 °C = 70.7 °F'`. Which of the two should call `print`?
::: solution
```python
def fahrenheit(celsius):
    """Return the Fahrenheit equivalent of a temperature in degrees Celsius.

    Requires: celsius is a number (int or float).
    """
    return celsius * 9 / 5 + 32

def describe(celsius):
    """Return a one-line description such as '21.5 °C = 70.7 °F'."""
    return f"{celsius} °C = {fahrenheit(celsius)} °F"

print(describe(21.5))
```

This prints `21.5 °C = 70.7 °F`. Neither function should print: both compute and return values, and the single `print` at the top level displays the result. That way `fahrenheit` can be reused in calculations and both can be tested by comparing return values ($100\,°\text{C}$ should give $212.0$, $-40$ should give $-40.0$).
:::
:::

::: exercise Amicable numbers {level=2 check="284"}
Using `divisor_sum` from [[#ex-perfect]], compute `divisor_sum(220)`. Then write a function `is_amicable(a)` that returns `True` if `b = divisor_sum(a)` differs from `a` and `divisor_sum(b) == a`. (Enter `divisor_sum(220)`.)
::: solution
The proper divisors of $220 = 2^2 \cdot 5 \cdot 11$ are $1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110$, whose sum is $284$. And $284 = 2^2 \cdot 71$ has proper divisors $1, 2, 4, 71, 142$, whose sum is $220$.

```python
def is_amicable(a):
    """True if a is a member of an amicable pair (a != b, d(a) == b, d(b) == a)."""
    b = divisor_sum(a)
    return b != a and divisor_sum(b) == a
```

The condition `b != a` excludes perfect numbers, for which $d(a) = a$. Looping `is_amicable` over $1 \le a < 10{,}000$ finds $220, 284, 1184, 1210, 2620, 2924, 5020, 5564, 6232, 6368$ — five pairs.
:::
:::

::: exercise How many bisection steps? {level=2 check="20"}
Bisection ([[#alg-bisection]]) starts on an interval of length $2$ with tolerance $\tau = 10^{-6}$. How many iterations does it perform? (Enter the number.)
::: solution
By [[#thm-bisection]], the number of iterations is the least $k$ with $2^k \ge \dfrac{hi_0 - lo_0}{2\tau} = \dfrac{2}{2\times10^{-6}} = 10^6$. Since $2^{19} = 524{,}288 < 10^6 \le 1{,}048{,}576 = 2^{20}$, $k = 20$. Each further factor of $10$ in accuracy costs about $\log_2 10 \approx 3.3$ more iterations.
:::
:::

::: exercise The shared default {level=2}
Explain the output of the program in the warning about default values. Then predict the output of

```python
def counter(n, seen=[]):
    seen.append(n)
    return len(seen)

print(counter(1), counter(2), counter(3))
```
::: solution
The `def` statement evaluates `[]` once and stores that list as the default value of `seen`. Every call that does not pass `seen` uses that same list, so values appended in one call are still there in the next. Here the three calls append to the same list, and the program prints `1 2 3`. (With `seen=None` and `if seen is None: seen = []`, each call would get a fresh list and the program would print `1 1 1`.)
:::
:::

::: exercise Applying a function n times {level=3}
Write a function `repeat(f, n)` that returns a new function which applies `f` to its argument $n$ times (for $n = 0$, the identity). Use it to compute $2^{10}$ starting from $1$. Then explain why the following attempt is wrong:

```python
def repeat_bad(f, n):
    for _ in range(n):
        f = compose(f, f)
    return f
```
::: solution
```python
def repeat(f, n):
    """Return the function that applies f n times (n >= 0)."""
    def h(x):
        for _ in range(n):
            x = f(x)
        return x
    return h

dbl = lambda x: 2 * x
print(repeat(dbl, 10)(1))    # 1024
```

`h` is a closure: it remembers `f` and `n` from the call to `repeat` that created it. (The name `_` is conventional for a loop variable whose value is not used.)

`repeat_bad` doubles the number of applications at every step instead of adding one: after the first iteration `f` applies the original function $2$ times, after the second $4$ times, and after $n$ iterations $2^n$ times. So `repeat_bad(dbl, 3)(1)` is $2^{8} = 256$, not $8$. (For $n = 0$ both versions return a function equivalent to the identity — `repeat_bad` returns `f` itself, which is wrong too.)
:::
:::

::: exercise A precondition and a proof {level=3}
The function below is meant to return the number of times the digit `d` ($0 \le d \le 9$) appears in the decimal representation of the integer `n`. State a precondition under which it is correct, prove it correct under that precondition, and give an input satisfying `n >= 0` for which it is wrong.

```python
def count_digit(n, d):
    count = 0
    while n > 0:
        if n % 10 == d:
            count += 1
        n = n // 10
    return count
```
::: solution
*Counterexample:* `count_digit(0, 0)` returns $0$, but the decimal representation of $0$ is `0`, which contains one zero. Negative `n` are also wrong: the loop does not run, so `count_digit(-55, 5)` gives $0$.

*Precondition:* `n >= 1` and `0 <= d <= 9`. *Postcondition:* the result is the number of occurrences of `d` among the decimal digits of `n`.

*Proof.* Write $n_0$ for the original value. *Invariant:* `count` equals the number of occurrences of $d$ among the digits of $n_0$ that have been removed from the right so far, and `n` is the number formed by the remaining digits ($0$ if none remain). Initially nothing has been removed and $n = n_0$. In an iteration with $n > 0$, `n % 10` is the last remaining digit; `count` is incremented exactly when it equals $d$, and `n // 10` removes it, so the invariant is maintained. *Variant:* $n$ itself, a non-negative integer that strictly decreases while $n > 0$. At the end $n = 0$, so every digit of $n_0$ has been removed and `count` is the total number of occurrences. Because $n_0 \ge 1$ has no leading zeros, "the digits removed" are exactly the decimal digits of $n_0$. (To handle $0$ as well, special-case it: `if n == 0: return 1 if d == 0 else 0`.)
:::
:::
