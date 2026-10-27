Three pegs stand on a board; on the first is a tower of $n$ discs of decreasing size. You must move the whole tower to the third peg, one disc at a time, never placing a disc on a smaller one. With three discs a little trial and error finds a solution. With eight, trial and error is hopeless — yet there is a solution that fits in one sentence: *to move $n$ discs, move the top $n - 1$ out of the way onto the spare peg, move the largest disc, and then move the $n - 1$ discs back on top of it.* The sentence describes how to move $n$ discs in terms of how to move $n - 1$, and moving $0$ discs needs nothing at all. That is enough to solve the puzzle for every $n$.

A function that is defined in terms of itself is called **recursive**. Recursion is the programming counterpart of mathematical induction, and it is the natural way to write programs about anything that is itself defined in terms of smaller instances: factorials and Fibonacci numbers, the digits of a number, nested lists and folders, trees, grammars, and the divide-and-conquer algorithms at the heart of [[algorithms]]. This chapter shows how to write recursive functions, how Python runs them using the call stack, how to prove them correct by induction, and when an iterative loop is the better choice.

## Recursive definitions

Many mathematical functions are defined recursively. The **factorial** of a non-negative integer is

$$
0! = 1, \qquad n! = n \cdot (n-1)! \quad\text{for } n \ge 1,
$$ {#eq-factorial}

so $4! = 4 \cdot 3! = 4 \cdot 3 \cdot 2! = \dots = 4\cdot3\cdot2\cdot1\cdot1 = 24$. The definition translates into Python line for line:

```python
def factorial(n):
    """Return n! for an integer n >= 0."""
    if n == 0:
        return 1                      # base case
    return n * factorial(n - 1)       # recursive case

print(factorial(4), factorial(20))
```

```console
$ python3 fact.py
24 2432902008176640000
```

::: definition Recursive function {#def-recursive}
A function is **recursive** if its body contains a call to itself (directly, or indirectly through other functions). A well-formed recursive function has

1. one or more **base cases**, inputs for which it returns a result without recursing; and
2. one or more **recursive cases**, which call the function on inputs that are *smaller* — closer to a base case — according to some measure that cannot decrease for ever.
:::

The second condition is what makes the recursion stop. For `factorial` the measure is $n$ itself: each recursive call is on $n - 1$, and $n$ cannot decrease below $0$ without reaching the base case. It is the same idea as a loop variant ([[programming-1/control-flow#thm-variant]]).

A useful way to write a recursive function is to **trust the recursion**. Suppose the function already works for all smaller inputs; how would you use that to handle the current input? For the sum of the decimal digits of $n$: if $n < 10$ the answer is $n$; otherwise the digits of $n$ are the digits of $n /\!/ 10$ followed by the last digit $n \mathbin{\%} 10$, so the answer is `digit_sum(n // 10) + n % 10`.

```python
def digit_sum(n):
    """Sum of the decimal digits of an integer n >= 0."""
    if n < 10:
        return n
    return digit_sum(n // 10) + n % 10

print(digit_sum(4096), digit_sum(7), digit_sum(999999))
```

```console
$ python3 sumdigits.py
19 7 54
```

You never need to follow the recursion all the way down in your head to see that this is right; you need only check the base case and check that the recursive case is correct *assuming* the smaller call is. That is exactly the structure of a proof by induction.

## How recursion runs: the call stack

There is nothing special about a function calling itself. The rules of [[programming-1/functions#def-call]] apply unchanged: each call gets its own frame with its own parameter `n`, and the caller waits until the call returns. Since a recursive call is made before the caller has finished, frames pile up: the most recent call is on top, and it is the first to finish. This pile is the **call stack**.

::: example Watching the stack {#ex-stack}
Add printing to `factorial` to show when each call starts and finishes, indented by its depth, and run it for $n = 3$.
::: solution
```python
def factorial(n, depth=0):
    print("  " * depth + f"factorial({n}) called")
    if n == 0:
        result = 1
    else:
        result = n * factorial(n - 1, depth + 1)
    print("  " * depth + f"factorial({n}) returns {result}")
    return result

factorial(3)
```

```console
$ python3 trace.py
factorial(3) called
  factorial(2) called
    factorial(1) called
      factorial(0) called
      factorial(0) returns 1
    factorial(1) returns 1
  factorial(2) returns 2
factorial(3) returns 6
```

The calls go down to the base case — at that moment four frames of `factorial` exist, each with its own `n` — and the multiplications happen on the way back up: $1 \cdot 1 = 1$, then $2 \cdot 1 = 2$, then $3 \cdot 2 = 6$. Each frame must remember where it was (in the middle of computing `n * ...`) while its callee runs, which is precisely what the frame on the stack stores.
:::
:::

Every frame occupies memory, so the depth of recursion is limited. CPython sets a **recursion limit**, by default $1000$ frames (`sys.getrecursionlimit()` reports it), and raises `RecursionError` when a program goes deeper:

```python
def countdown(n):
    if n == 0:
        return "lift-off"
    return countdown(n - 1)

print(countdown(500))
print(countdown(5000))
```

```console
$ python3 deep.py
lift-off
Traceback (most recent call last):
  File ".../deep.py", line 7, in <module>
    print(countdown(5000))
          ~~~~~~~~~^^^^^^
  File ".../deep.py", line 4, in countdown
    return countdown(n - 1)
  File ".../deep.py", line 4, in countdown
    return countdown(n - 1)
  File ".../deep.py", line 4, in countdown
    return countdown(n - 1)
  [Previous line repeated 996 more times]
RecursionError: maximum recursion depth exceeded
```

The same error, after a long pause, is what you get from a recursive function with a missing or unreachable base case: the recursion never stops, and the limit is the only thing that ends it.

::: warning Python does not optimise tail calls
In `countdown` the recursive call is the very last thing the function does — a **tail call** — so in principle the caller's frame is no longer needed. Some languages (Scheme, and many compilers for functional languages) reuse the frame, so tail recursion runs in constant space like a loop. CPython deliberately does not, so that tracebacks show every frame; a recursion $10^5$ deep fails in Python however it is written. Use recursion in Python when the depth grows slowly — like $\log n$ for divide and conquer, or the depth of a nested structure — and use a loop when the depth would be proportional to a large input.
:::

::: quiz
What happens when you call this function with `n = 3`?

```python
def f(n):
    if n == 0:
        return 0
    return n + f(n - 2)
```
- [ ] It returns `4`.
- [ ] It returns `3`.
- [x] It raises `RecursionError`.
- [ ] It returns `0`.
::: solution
The calls are `f(3)`, `f(1)`, `f(-1)`, `f(-3)`, …: an odd argument skips the base case `n == 0` and the arguments decrease for ever, so the recursion stops only when the limit is hit. The function satisfies [[#def-recursive]] only for even `n >= 0`. A safer base case is `if n <= 0`, which also covers the odd case; then `f(3)` returns $3 + 1 + 0 = 4$.
:::
:::

## Proving recursive functions correct

The argument "check the base case, and check the recursive case assuming the smaller calls work" is a proof by induction, and it is worth writing out once in full.

::: proposition Factorial is correct {#prop-factorial}
For every integer $n \ge 0$, `factorial(n)` terminates and returns $n!$.
:::

::: proof
By induction on $n$. *Base case:* `factorial(0)` returns $1 = 0!$ without recursing. *Inductive step:* let $n \ge 1$ and assume that `factorial(n - 1)` terminates and returns $(n-1)!$. Then `factorial(n)` makes that one call, multiplies its result by $n$ and returns $n \cdot (n - 1)! = n!$ by [[#eq-factorial]]; it terminates because the call it makes terminates. By induction the claim holds for all $n \ge 0$. (See [Maths Atlas: induction](/learn/maths/lesson.php?c=proofs&l=induction).)
:::

For a function such as `digit_sum`, whose recursive call is on $n /\!/ 10$ rather than $n - 1$, the same argument uses **strong induction**: assume the function is correct for *all* inputs smaller than $n$, and deduce it for $n$. The pattern is always: identify a measure (here the value $n$) that every recursive call decreases; prove the base cases; prove each recursive case assuming every call on a smaller measure is correct.

The puzzle from the start of the chapter shows how naturally recursion expresses an algorithm.

::: algorithm Towers of Hanoi {#alg-hanoi}
**Input:** $n \ge 0$ and three distinct pegs `source`, `target`, `spare`, with the $n$ smallest discs stacked on `source`. **Effect:** moves those $n$ discs to `target`, never putting a disc on a smaller one.

1. If $n = 0$, do nothing.
2. Otherwise: move $n - 1$ discs from `source` to `spare` (recursively, using `target` as the spare); move disc $n$ from `source` to `target`; move $n - 1$ discs from `spare` to `target` (recursively, using `source` as the spare).
:::

::: example Three discs {#ex-hanoi}
Implement [[#alg-hanoi]] as a function that prints its moves, and run it for three discs. Why are the moves legal?
::: solution
```python
def hanoi(n, source, target, spare):
    """Print the moves that transfer n discs from source to target."""
    if n == 0:
        return                                 # nothing to move
    hanoi(n - 1, source, spare, target)        # clear the n-1 smaller discs out of the way
    print(f"move disc {n} from {source} to {target}")
    hanoi(n - 1, spare, target, source)        # put them back on top of disc n

hanoi(3, "A", "C", "B")
```

```console
$ python3 hanoi.py
move disc 1 from A to C
move disc 2 from A to B
move disc 1 from C to B
move disc 3 from A to C
move disc 1 from B to A
move disc 2 from B to C
move disc 1 from A to C
```

The moves are legal because while discs $1, \dots, n-1$ are being moved, disc $n$ and any larger discs are below them on some peg, so no disc is ever placed on a smaller one (this is the induction hypothesis applied to $n - 1$ discs, whose moves are legal regardless of what larger discs lie underneath).
:::
:::

::: theorem The cost of Hanoi {#thm-hanoi}
[[#alg-hanoi]] makes exactly $2^n - 1$ moves, and no solution uses fewer.
:::

::: proof
*Count.* Let $M(n)$ be the number of moves. Then $M(0) = 0$ and $M(n) = 2M(n-1) + 1$. By induction $M(n) = 2^n - 1$: it holds for $n = 0$, and if $M(n-1) = 2^{n-1} - 1$ then $M(n) = 2(2^{n-1} - 1) + 1 = 2^n - 1$.

*Lower bound.* Let $L(n)$ be the least number of moves of any solution for $n$ discs; clearly $L(0) = 0$. Consider any solution for $n \ge 1$ discs. The largest disc must move at least once. Look at its first move: at that moment it is the only disc on its source peg and the target peg is empty, so all $n-1$ other discs are on the third peg; getting them there from the starting position took at least $L(n-1)$ moves. At the moment of its *last* move the same reasoning shows that the other $n - 1$ discs are all on the third peg, and the largest disc then lands on the final peg, where it stays; bringing the $n - 1$ discs onto it takes at least $L(n - 1)$ further moves. So $L(n) \ge 2L(n-1) + 1$, and by induction $L(n) \ge 2^n - 1$. Since the algorithm achieves $2^n - 1$, it is optimal.
:::

For $n = 64$ — the number of discs in the legend of a temple that is traditionally told with the puzzle — the minimum is $2^{64} - 1 \approx 1.8 \times 10^{19}$ moves: at one move per second, about $585$ billion years.

## When recursion is expensive

The **Fibonacci numbers** are defined by $F_0 = 0$, $F_1 = 1$ and $F_n = F_{n-1} + F_{n-2}$ for $n \ge 2$. The definition is recursive, and the recursive program is the obvious one. To see what it costs, we count the calls.

```python
calls = 0

def fib(n):
    """Return the n-th Fibonacci number (fib(0) = 0, fib(1) = 1)."""
    global calls
    calls += 1                     # count every call, for the experiment
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

for n in [5, 10, 20, 25]:
    calls = 0
    value = fib(n)
    print(n, value, calls)
```

```console
$ python3 fib.py
5 5 15
10 55 177
20 6765 21891
25 75025 242785
```

(The `global` statement makes the assignment in `fib` update the module-level counter; it is used here only for the experiment.) Increasing $n$ by $5$ multiplies the work by about $11$, and `fib(40)` would make over 300 million calls. The reason is visible in the **recursion tree**, which has one node for every call:

::: widget graph
nodes: F4@4,3; F3@2,2; F2b@6,2; F2a@1,1; F1b@3,1; F1c@5,1; F0b@7,1; F1a@0.5,0; F0a@1.5,0
edges: F4>F3; F4>F2b; F3>F2a; F3>F1b; F2a>F1a; F2a>F0a; F2b>F1c; F2b>F0b
algorithm: dfs
start: F4
caption: The recursion tree of `fib(4)`: each node is one call, and its children are the calls it makes ($F_2$ is computed twice, as `F2a` and `F2b`, and $F_1$ three times). Step through depth-first search from `F4`: the order in which it visits the nodes is exactly the order in which Python makes the calls, and the path from the root to the current node is the call stack at that moment. There are $9 = 2F_5 - 1$ nodes.
:::

::: theorem Calls made by naive Fibonacci {#thm-fib-calls}
Let $C(n)$ be the number of calls made by `fib(n)`, including the first. Then $C(n) = 2F_{n+1} - 1$.
:::

::: proof
For $n = 0$ and $n = 1$ there is one call and no recursion, and $2F_1 - 1 = 2F_2 - 1 = 1$. For $n \ge 2$ the call `fib(n)` makes the calls of `fib(n - 1)` and of `fib(n - 2)` plus itself, so $C(n) = C(n-1) + C(n-2) + 1$. Assuming the formula for $n - 1$ and $n - 2$ (strong induction),

$$
C(n) = (2F_n - 1) + (2F_{n-1} - 1) + 1 = 2(F_n + F_{n-1}) - 1 = 2F_{n+1} - 1. \qquad
$$
:::

Since $F_n$ grows like $\varphi^n/\sqrt 5$ with $\varphi = (1 + \sqrt5)/2 \approx 1.618$, the naive program takes time exponential in $n$ — not because recursion is slow, but because it recomputes the same values over and over. (The closed form for $F_n$ is derived in [Maths Atlas: recurrences](/learn/maths/lesson.php?c=discrete&l=recurrences).)

::: widget plot
f: 2*((1 + sqrt(5))/2)^(x + 1)/sqrt(5) - 1; x + 1
x: 0, 22
y: 0, 60000
points: 5,15; 10,177; 15,1973; 20,21891
labels: \text{calls of naive } \texttt{fib}(n) \approx 2\varphi^{n+1}/\sqrt5 - 1; \text{loop iterations of } \texttt{fib\_iter}(n)
caption: Work done to compute $F_n$. The marked points are the measured call counts $2F_{n+1} - 1$ of the recursive program; the curve through them is the approximation $2\varphi^{n+1}/\sqrt5 - 1$. The iterative version (the almost flat line) needs only $n$ loop iterations. Each increase of $n$ by one multiplies the recursive work by about $\varphi \approx 1.618$.
:::

There are two standard remedies. **Memoisation** stores each result the first time it is computed and looks it up afterwards; the standard library provides it as `functools.cache`, which, written as `@cache` on the line before `def`, wraps the function so that repeated calls with the same argument return the stored result. With memoisation `fib(n)` computes each $F_k$ once, so it does $O(n)$ work. Alternatively, an **iterative** version builds the values from the bottom up:

```python
def fib_iter(n):
    a, b = 0, 1                    # invariant: a, b == fib(i), fib(i + 1)
    for _ in range(n):
        a, b = b, a + b
    return a

from functools import cache

@cache                             # remember every result already computed
def fib_memo(n):
    if n < 2:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

print(fib_iter(100))
print(fib_memo(100))
```

```console
$ python3 fibiter.py
354224848179261915075
354224848179261915075
```

Both compute $F_{100}$ instantly; the naive version would need about $1.1 \times 10^{21}$ calls. (`fib_memo(1000)` would still fail, by exceeding the recursion limit — the warning above applies.) Building a table of answers to subproblems from the smallest up is the idea of **dynamic programming**, a central technique in [[algorithms]].

::: warning Exponential recursion
A recursive function that makes two or more recursive calls on inputs only slightly smaller — `f(n - 1)` and `f(n - 2)` — usually takes exponential time, because the same subproblems are solved many times. Before writing one, ask whether the subproblems overlap. If they do, memoise or compute bottom-up. If they do not, as in Hanoi (where the exponential cost is unavoidable, by [[#thm-hanoi]]) or in divide and conquer on disjoint halves, the recursion is fine.
:::

## Recursion and iteration

Any loop can be written as a recursion and any recursion as a loop (with an explicit stack if necessary), so the choice is about clarity and cost.

Recursion is the better choice when the problem is **self-similar**: when the natural description of the solution refers to solutions of smaller instances, as in Hanoi, or when the data are recursive — a folder contains files and folders, an arithmetic expression contains sub-expressions, a tree's children are trees. It is also the natural expression of **divide and conquer**, which splits a problem into parts of a constant fraction of the size. Here is exponentiation by squaring, from [[programming-1/control-flow#alg-power]], written recursively from the identities $x^{2k} = (x^k)^2$ and $x^{2k+1} = (x^k)^2 x$:

```python
def power(x, n):
    """x ** n for an integer n >= 0, by recursive squaring."""
    if n == 0:
        return 1
    half = power(x, n // 2)          # one recursive call, on n // 2
    if n % 2 == 0:
        return half * half
    return half * half * x

print(power(3, 13), power(2, 100) == 2 ** 100)
```

prints `1594323 True`. Each call halves $n$, so the depth of recursion is only $\lfloor\log_2 n\rfloor + 2$ frames (counting the base case): about $1000$ frames would be needed only for $n$ near $2^{1000}$. The correctness proof is a direct strong induction on $n$, with no invariant to invent — often the main attraction of the recursive form.

Iteration is the better choice when the recursion would be a simple chain of depth proportional to the input, as in `countdown` or summing $1 + \dots + n$: the loop is just as clear, uses constant memory and has no depth limit.

::: example A recursive palindrome test {#ex-palindrome}
A string is a **palindrome** if it reads the same forwards and backwards. Write a recursive test. (Use `s[0]` for the first character, `s[-1]` for the last and `s[1:-1]` for the string without them; these are explained in [[programming-1/sequences]].)
::: solution
A string of length $0$ or $1$ is a palindrome. A longer string is a palindrome exactly when its first and last characters are equal *and* the middle part is a palindrome.

```python
def is_palindrome(s):
    """True if the string s reads the same forwards and backwards."""
    if len(s) <= 1:
        return True
    return s[0] == s[-1] and is_palindrome(s[1:-1])

for w in ["racecar", "level", "abca", "", "x", "noon"]:
    print(repr(w), is_palindrome(w))
```

```console
$ python3 pal.py
'racecar' True
'level' True
'abca' False
'' True
'x' True
'noon' True
```

The measure is `len(s)`, which decreases by $2$ on each call, so the recursion terminates; there are two base lengths ($0$ and $1$) because subtracting $2$ from an even length reaches $0$ and from an odd length reaches $1$. Because `and` short-circuits, the recursion stops as soon as a mismatch is found: for `'abca'` the first comparison succeeds and the second (`'b'` against `'c'`) fails. The built-in `repr` shows a value as it would be written in code, which makes the empty string visible as `''`.
:::
:::

::: example Converting to binary {#ex-binary}
Write a recursive function that returns the binary representation of $n \ge 0$ as a string.
::: solution
The binary digits of $n \ge 2$ are the binary digits of $n /\!/ 2$ followed by the last bit, $n \mathbin{\%} 2$ — the same "all but the last digit" decomposition as `digit_sum`, in base $2$.

```python
def to_binary(n):
    """Binary digits of an integer n >= 0, as a string."""
    if n < 2:
        return str(n)
    return to_binary(n // 2) + str(n % 2)

print(to_binary(0), to_binary(5), to_binary(13), to_binary(1000))
print(bin(1000))
```

```console
$ python3 binary.py
0 101 1101 1111101000
0b1111101000
```

The result agrees with the built-in `bin`, which adds the prefix `0b`. The recursion produces the digits in the right order without any reversal: the recursive call builds the leading digits, and the last digit is appended on the way back up.
:::
:::

::: quiz
For which of these tasks is a straightforward recursive function in Python a poor choice?
- [ ] Printing every file in a folder and all its sub-folders.
- [x] Adding up the numbers $1, 2, \dots, 10^6$ by `total(n) = n + total(n - 1)`.
- [ ] Computing $x^n$ by `power(x, n // 2)`, squared.
- [x] Computing $F_{50}$ by `fib(n - 1) + fib(n - 2)` without memoisation.
::: solution
Summing to $10^6$ by a chain of calls needs a million frames and hits the recursion limit; a loop (or the formula $n(n+1)/2$) is right. Naive Fibonacci for $n = 50$ needs about $4 \times 10^{10}$ calls. Folder trees are recursive data whose depth is small, and recursive squaring has logarithmic depth, so recursion is natural for both.
:::
:::

::: history
Recursive definitions are older than computers: Richard Dedekind (1888) and Giuseppe Peano (1889) defined the arithmetic of the natural numbers recursively, and in the 1930s Kurt Gödel, Jacques Herbrand, Stephen Kleene and Rózsa Péter developed the theory of recursive functions, which became one of the equivalent definitions of computability. Wilhelm Ackermann's 1928 function showed that some computable functions grow too fast to be defined by simple (primitive) recursion. In programming, John McCarthy's LISP (described in "Recursive functions of symbolic expressions and their computation by machine", 1960) and ALGOL 60 were the first widely known languages to allow procedures to call themselves; the inclusion of recursion in ALGOL 60 was controversial at the time because it required a run-time stack. The Tower of Hanoi puzzle was published by the French mathematician Édouard Lucas in 1883 under the pseudonym "N. Claus de Siam".
:::

## Where this leads

Recursion returns throughout computer science. In [[data-structures]] trees and their algorithms are recursive by nature; in [[algorithms]] divide-and-conquer methods such as merge sort and quicksort are analysed by recurrences like $M(n) = 2M(n-1) + 1$, and dynamic programming turns exponential recursions like `fib` into polynomial ones. Parsers in [[compilers]] follow the recursive structure of grammars, and [[theory-of-computation]] defines computability itself through recursive functions. Closer to hand, [[programming-1/sequences]] gives recursion lists and strings to work on.

::: summary
- A **recursive function** calls itself; it needs base cases and recursive cases on inputs that are smaller by a measure that cannot decrease for ever ([[#def-recursive]]).
- Write recursion by *trusting* it: assume the smaller calls are correct and combine their results. Prove it correct by (strong) induction on the measure ([[#prop-factorial]]).
- Each call has its own frame on the **call stack**; CPython limits the depth (by default $1000$) and does not optimise tail calls, so deep linear recursion should be a loop.
- Towers of Hanoi takes exactly $2^n - 1$ moves, which is optimal ([[#thm-hanoi]]).
- Naive recursive Fibonacci makes $2F_{n+1} - 1$ calls ([[#thm-fib-calls]]) — exponential, because subproblems overlap. Memoisation or bottom-up iteration makes it linear.
- Prefer recursion for self-similar problems, recursive data and divide and conquer (logarithmic depth); prefer loops for long simple chains.
:::

## Exercises

::: exercise Tracing a recursion {level=1 check="19"}
Trace the calls made by `digit_sum(4096)`, showing the value returned by each. (Enter the final result.)
::: solution
`digit_sum(4096)` calls `digit_sum(409)`, which calls `digit_sum(40)`, which calls `digit_sum(4)`. The base case returns $4$; then `digit_sum(40)` returns $4 + 0 = 4$, `digit_sum(409)` returns $4 + 9 = 13$, and `digit_sum(4096)` returns $13 + 6 = 19$.
:::
:::

::: exercise Six discs {level=1 check="63"}
How many moves does [[#alg-hanoi]] make for $6$ discs, and how many of them move the smallest disc? (Enter the total number of moves.)
::: solution
By [[#thm-hanoi]], $2^6 - 1 = 63$ moves. Disc $k$ moves $2^{n-k}$ times (disc $n$ once, each smaller disc twice as often as the next larger), so the smallest disc moves $2^5 = 32$ times — every other move. Check: $32 + 16 + 8 + 4 + 2 + 1 = 63$.
:::
:::

::: exercise Find the bug {level=1}
This function is meant to return $1 + 2 + \dots + n$ for $n \ge 0$. What goes wrong, and how would you fix it?

```python
def total(n):
    return n + total(n - 1)
```
::: solution
There is no base case, so every call makes another call — `total(3)` calls `total(2)`, `total(1)`, `total(0)`, `total(-1)`, … — until Python raises `RecursionError`. Add `if n == 0: return 0` (or `if n <= 0`) before the recursive case. Even then, `total(10**5)` would exceed the recursion limit; for long chains like this a loop or the formula $n(n+1)/2$ is better.
:::
:::

::: exercise Counting calls {level=2 check="177"}
Without running it, how many calls does the naive `fib(10)` make in total? (Enter the number of calls.)
::: solution
By [[#thm-fib-calls]], $C(10) = 2F_{11} - 1$. The Fibonacci numbers are $0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, \dots$, so $F_{11} = 89$ and $C(10) = 177$, matching the experiment.
:::
:::

::: exercise Recursive multiplications {level=2}
Show that the recursive `power(x, n)` makes exactly $\lfloor \log_2 n\rfloor + 2$ calls for $n \ge 1$, and that it performs at most $2(\lfloor\log_2 n\rfloor + 1)$ multiplications.
::: solution
Each call with $n \ge 1$ makes one call on $n /\!/ 2$, and the call with $n = 0$ makes none. Starting from $n \ge 1$, which has $b = \lfloor\log_2 n\rfloor + 1$ binary digits, halving with rounding down removes one digit per call, so after $b$ calls the argument is $0$: there are $b$ calls with $n \ge 1$ plus one base-case call, $b + 1 = \lfloor\log_2 n\rfloor + 2$ calls. Each of the $b$ non-base calls does one multiplication `half * half` and one more if $n$ is odd, so there are at most $2b$ multiplications. (For $n = 13$, $b = 4$: five calls, and $4 + 3 = 7$ multiplications.)
:::
:::

::: exercise Climbing stairs {level=2 check="89"}
You climb a staircase of $n$ steps, taking one or two steps at a time. Write a recursive function `ways(n)` counting the different ways to reach the top, and compute `ways(10)`. (Enter the number.)
::: solution
The first move is either one step, leaving $n - 1$ steps, or two, leaving $n - 2$; the two kinds of route are different, so `ways(n) = ways(n - 1) + ways(n - 2)` for $n \ge 2$, with `ways(0) = ways(1) = 1` (one way: do nothing, or one single step).

```python
def ways(n):
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)

print(ways(10))   # 89
```

This is the Fibonacci recurrence shifted by one: `ways(n)` $= F_{n+1}$, so `ways(10)` $= F_{11} = 89$. For large $n$ it has the same exponential cost as naive `fib` and should be memoised or written as a loop.
:::
:::

::: exercise McCarthy's 91 function {level=3 check="91"}
John McCarthy's 91 function is defined for integers $n$ by

$$
M(n) = \begin{cases} n - 10 & \text{if } n > 100,\\ M(M(n + 11)) & \text{if } n \le 100. \end{cases}
$$

Prove that $M(n) = 91$ for every integer $n \le 100$. (Enter $M(50)$.)
::: hint
First handle $90 \le n \le 100$, starting from $n = 100$ and working down; then use strong induction "upwards from $101$" for $n < 90$, by induction on $101 - n$.
:::
::: solution
For $n > 100$, $M(n) = n - 10$; in particular $M(101) = 91$.

*Case $90 \le n \le 100$.* Then $101 \le n + 11 \le 111$, so $M(n + 11) = n + 1$ and $M(n) = M(n + 1)$. Hence $M(100) = M(101) = 91$, and by induction downwards $M(99) = M(100) = 91$, and so on down to $M(90) = 91$.

*Case $n < 90$.* We use strong induction on $k = 101 - n$ (which is larger the smaller $n$ is), assuming $M(m) = 91$ for all $m$ with $n < m \le 100$. Then $n + 11 \le 100$ and $n + 11 > n$, so by hypothesis $M(n+11) = 91$, and $M(n) = M(91) = 91$ (as $91$ is in the first case).

So $M(n) = 91$ for all $n \le 100$; in particular $M(50) = 91$. A Python version, `def M(n): return n - 10 if n > 100 else M(M(n + 11))`, returns $91$ for every $n$ from $-50$ to $100$. The termination of this nested recursion is not obvious from its form — the argument of the outer call is the *result* of an inner call — which is why McCarthy and his colleagues used it as a test case for formal verification.
:::
:::

::: exercise Palindromes, proved {level=3}
Prove that `is_palindrome(s)` from [[#ex-palindrome]] returns `True` if and only if $s$ is a palindrome, that is, $s_i = s_{n-1-i}$ for all $0 \le i < n$, where $n$ is the length of $s$.
::: solution
By strong induction on $n$. If $n \le 1$ the condition is vacuous or says $s_0 = s_0$, so $s$ is a palindrome, and the function returns `True`.

Let $n \ge 2$ and assume the claim for all shorter strings. The function returns `True` exactly when $s_0 = s_{n-1}$ and `is_palindrome(t)` is `True`, where $t = s_1 s_2 \cdots s_{n-2}$ has length $n - 2$ and $t_j = s_{j+1}$. By the hypothesis, the latter holds exactly when $t_j = t_{n-3-j}$ for all $0 \le j < n - 2$, that is, $s_{j+1} = s_{n-2-j}$, or with $i = j + 1$: $s_i = s_{n-1-i}$ for $1 \le i \le n-2$. Together with $s_0 = s_{n-1}$ (the case $i = 0$, which also gives $i = n-1$ by symmetry), this is exactly the condition for all $0 \le i < n$. So the function returns `True` if and only if $s$ is a palindrome. Termination follows because the length decreases by $2$ at each call.
:::
:::
