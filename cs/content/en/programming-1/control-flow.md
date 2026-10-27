The programs of the last two chapters ran straight through, one statement after another, apart from a loop or two used on trust. Real programs must make decisions — charge the reduced fare *if* the passenger is under 16, retry the download *while* it keeps failing, process *each* line of a file in turn. The statements that make these decisions are called **control flow**, because they control which statement runs next.

There are only a few control-flow constructs in Python — `if`, `while`, `for`, and the modifiers `break` and `continue` — and they are easy to learn. What takes longer to learn is to *reason* about them: to be sure that a loop computes the right thing, that it handles the first and last cases correctly, and that it stops at all. This chapter teaches both. Alongside the syntax it introduces the two tools that professional programmers use, often without writing them down, to convince themselves that a loop is correct: the **loop invariant**, which says what the loop has achieved so far, and the **variant**, which shows it must finish.

## Making decisions: `if`, `elif` and `else`

The `if` statement runs a block of code only when a condition is true.

::: definition Conditional statement {#def-if}
The **conditional statement** has the form

```text
if condition_1:
    block_1
elif condition_2:
    block_2
...
else:
    block_else
```

with zero or more `elif` ("else if") clauses and an optional `else` clause. Python evaluates the conditions in order, from the top, until one is truthy; it then runs the corresponding block and skips the rest of the statement. If no condition is truthy, it runs `block_else` (if there is one). Exactly one block runs if there is an `else`; at most one otherwise. A **block** is one or more statements indented by the same amount under the line that ends in `:`.
:::

Because the conditions are tried in order, each later condition is tested only when all earlier ones were false. Good code uses this to keep conditions simple.

::: example Classifying marks {#ex-grade}
A university classifies degree marks: 70 and above is a first, 60–69 an upper second, 50–59 a lower second, 40–49 a third, and below 40 a fail. Write a function that returns the class.
::: solution
```python
def grade(mark):
    if mark >= 70:
        return "first"
    elif mark >= 60:
        return "upper second"
    elif mark >= 50:
        return "lower second"
    elif mark >= 40:
        return "third"
    else:
        return "fail"

for m in [85, 70, 69, 55, 40, 12]:
    print(m, grade(m))
```

```console
$ python3 grade.py
85 first
70 first
69 upper second
55 lower second
40 third
12 fail
```

The second condition is `mark >= 60`, not `60 <= mark < 70`: by the time it is tested we already know that `mark >= 70` was false. The test cases are chosen deliberately — the boundaries $70$, $69$ and $40$ are where an error such as `>` instead of `>=` would show. If the conditions were written in the reverse order, starting with `mark >= 40`, every passing mark would be classified as a third: with `elif`, the order of the tests is part of the meaning.
:::
:::

Python also has a **conditional expression**, which chooses between two *values* rather than two blocks: `"odd" if x % 2 == 1 else "even"` evaluates to `'odd'` or `'even'`. Use it for short choices inside a larger expression; use the statement form for anything with side effects or more than two cases.

### Writing conditions

Conditions combine comparisons with `and`, `or` and `not`. Two equivalences of propositional logic, **De Morgan's laws**, are used all the time to simplify them:

$$
\texttt{not}\,(p \;\texttt{and}\; q) \equiv (\texttt{not}\,p)\;\texttt{or}\;(\texttt{not}\,q), \qquad
\texttt{not}\,(p \;\texttt{or}\; q) \equiv (\texttt{not}\,p)\;\texttt{and}\;(\texttt{not}\,q).
$$ {#eq-de-morgan}

So "not between 0 and 9", `not (0 <= x and x <= 9)`, is the same as `x < 0 or x > 9`. (The proof is a truth table: see [Maths Atlas: propositional logic](/learn/maths/lesson.php?c=proofs&l=propositional-logic).)

::: widget truthtable
formula: ~(p & q)
compare: ~p | ~q
caption: De Morgan's first law as a truth table: the two formulas agree on all four rows, so they are logically equivalent and either can replace the other in a condition. Change the second formula to `~p & ~q` — a very common mistake when negating a condition by hand — and see the two rows where it differs.
:::

::: example Leap years {#ex-leap}
In the Gregorian calendar a year is a leap year if it is divisible by 4, except that years divisible by 100 are not, except that years divisible by 400 are. Write this as a single Boolean expression.
::: solution
```python
def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

for y in [1900, 2000, 2023, 2024]:
    print(y, is_leap(y))
```

```console
$ python3 leap.py
1900 False
2000 True
2023 False
2024 True
```

Read the expression as "divisible by 4, and either not a century or a multiple of 400". The parentheses are essential: without them, `and` would bind first and `year % 4 == 0 and year % 100 != 0 or year % 400 == 0` would still happen to work, but only because every multiple of 400 is a multiple of 4 — correctness by luck is worth avoiding. $1900$ is divisible by $100$ but not $400$, so it is not a leap year; $2000$ is.
:::
:::

## Repetition with `while`

::: definition While loop {#def-while}
The **while loop**

```text
while condition:
    body
```

evaluates the condition; if it is truthy, it runs the body and then evaluates the condition again, repeating until the condition is falsy, at which point execution continues after the loop. Each execution of the body is an **iteration**. If the condition is false the first time, the body runs zero times.
:::

The shape of a while loop is easiest to see as a **control-flow graph**: a diagram whose nodes are pieces of code and whose arrows show which piece can run next.

::: widget graph
nodes: Before@0,1; Test@1,1; Body@1,0; After@2,1
edges: Before>Test; Test>Body; Body>Test; Test>After
caption: The control-flow graph of a `while` loop. Execution arrives at the test; a true condition leads to the body and back to the test, a false condition leads out. Every iteration passes through the test, which is why the condition is the natural place to reason about the loop: whatever we know just before the test holds at the start of every iteration and also when the loop ends.
:::

A while loop is the right tool when we do not know in advance how many iterations are needed — when we repeat *until something happens*. The doubling program of [[programming-1/computation-and-programs]] is an example; so is the following famous loop.

::: example The Collatz process {#ex-collatz}
Starting from a positive integer $n$, repeatedly halve it if it is even and replace it by $3n + 1$ if it is odd, until it reaches $1$. Trace the loop for $n = 6$.
::: solution
```python
n = 6
steps = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps += 1
    print(n, end=" ")
print()
print("steps:", steps)
```

```console
$ python3 collatz.py
3 10 5 16 8 4 2 1 
steps: 8
```

($6$ is even, so it becomes $3$; $3$ is odd, so $10$; then $5$, $16$, $8$, $4$, $2$, $1$.) The keyword argument `end=" "` makes `print` finish with a space instead of a newline, so the values appear on one line.

Does this loop stop for *every* starting value? Nobody knows. The **Collatz conjecture**, posed by Lothar Collatz in 1937, says it always reaches $1$; it has been checked by computer for every starting value below $2^{68} \approx 2.95 \times 10^{20}$ (David Barina, 2020), but no proof is known. From $n = 27$ the process takes $111$ steps and climbs as high as $9232$ before falling to $1$. This tiny loop is a warning: that a loop terminates is a claim that needs an argument, and for some loops the argument is beyond present-day mathematics.
:::
:::

## Reasoning about loops

A loop is correct when two things hold: it stops, and when it stops the state is the one we wanted. Each needs its own argument.

### Termination: the variant

::: theorem Termination by a variant {#thm-variant}
Suppose that for a loop `while C: body` there is an integer-valued expression $V$ of the program state — a **variant** — such that

1. whenever the condition $C$ is true, $V \ge 0$; and
2. every iteration of the body strictly decreases $V$.

Then the loop terminates after at most $V_0 + 1$ iterations, where $V_0$ is the value of $V$ when the loop starts (or immediately, if $C$ is false at the start).
:::

::: proof
Let $V_k$ be the value of $V$ after $k$ iterations. Each iteration decreases $V$ by at least $1$ (it is an integer and decreases strictly), so $V_k \le V_0 - k$. If the loop performed $V_0 + 2$ iterations, then the condition was true before iteration $V_0 + 2$, so by hypothesis 1, $V_{V_0+1} \ge 0$; but $V_{V_0+1} \le V_0 - (V_0+1) = -1$. This contradiction shows the loop performs at most $V_0 + 1$ iterations.
:::

For Euclid's algorithm in [[programming-1/computation-and-programs#thm-euclid]] the variant was $b$; for a loop `while i < n: ... i += 1` it is $n - i$. For the Collatz loop no variant is known — $n$ itself goes up as well as down.

### Correctness: the invariant

::: definition Loop invariant {#def-invariant}
A **loop invariant** for `while C: body` is a statement $P$ about the program state such that

1. **(initialisation)** $P$ is true just before the loop starts; and
2. **(maintenance)** if $P$ and $C$ are both true at the start of an iteration, then $P$ is true at the end of that iteration.
:::

::: theorem The invariant principle {#thm-invariant}
If $P$ is a loop invariant for `while C: body` and the loop terminates, then when it terminates both $P$ and "not $C$" are true.
:::

::: proof
We show by induction on $k$ that $P$ holds after $k$ iterations, for every $k$ up to the number of iterations performed. For $k = 0$ this is initialisation. If $P$ holds after $k$ iterations and an iteration $k+1$ is performed, then $C$ was true at its start (that is why it was performed), so by maintenance $P$ holds after $k + 1$ iterations. When the loop terminates after some number $N$ of iterations, $P$ holds after iteration $N$, and the loop stopped because $C$ was false. (Induction is reviewed in [Maths Atlas: induction](/learn/maths/lesson.php?c=proofs&l=induction).)
:::

The invariant principle turns a question about an unknown number of iterations into two small questions about one iteration. The art is in choosing $P$: it should describe *the progress made so far*, so that "$P$ and not $C$" says that the job is done. Here is the simplest possible illustration.

```python
n = 5
total = 0
i = 0
while i < n:
    i = i + 1
    total = total + i    # invariant: total == 1 + 2 + ... + i
print(total, n * (n + 1) // 2)
```

```console
$ python3 sumloop.py
15 15
```

The invariant is $P$: "$\texttt{total} = 1 + 2 + \dots + \texttt{i}$ and $\texttt{i} \le n$". Before the loop, $\texttt{i} = 0$ and the sum is empty, equal to $0$. If $P$ holds and $\texttt{i} < n$, the body increases `i` by one and adds the new `i` to the total, so $P$ holds again (and still $\texttt{i} \le n$). The variant $n - \texttt{i}$ shows termination. When the loop stops, $P$ holds and $\texttt{i} \ge n$, so $\texttt{i} = n$ and `total` is $1 + \dots + n$, which equals $n(n+1)/2$.

Now a loop where the invariant is the whole idea.

::: algorithm Exponentiation by repeated squaring {#alg-power}
**Input:** a number $x$ and an integer $n \ge 0$. **Output:** $x^n$.

1. Set $r \gets 1$, $b \gets x$, $e \gets n$.
2. While $e > 0$:
   1. If $e$ is odd, set $r \gets r \cdot b$.
   2. Set $b \gets b \cdot b$ and $e \gets \lfloor e/2 \rfloor$.
3. Return $r$.
:::

```python
def power(x, n):
    """Return x ** n for an integer n >= 0, by repeated squaring."""
    result, base, e = 1, x, n
    while e > 0:
        # invariant: result * base ** e == x ** n
        if e % 2 == 1:
            result = result * base
        base = base * base
        e = e // 2
    return result

print(power(3, 13), 3 ** 13)
print(power(2, 100) == 2 ** 100)
```

```console
$ python3 power.py
1594323 1594323
True
```

::: theorem Repeated squaring is correct and fast {#thm-power}
[[#alg-power]] returns $x^n$, and for $n \ge 1$ it performs exactly $\lfloor \log_2 n \rfloor + 1$ iterations — the number of binary digits of $n$.
:::

::: proof
*Invariant:* $r \cdot b^{e} = x^n$. Initially $r = 1$, $b = x$, $e = n$, so it holds. For maintenance, suppose $r b^e = x^n$ and $e > 0$. If $e$ is even, $e = 2k$, then the new values are $r' = r$, $b' = b^2$, $e' = k$ and $r' b'^{e'} = r b^{2k} = r b^e = x^n$. If $e$ is odd, $e = 2k + 1$, then $r' = rb$, $b' = b^2$, $e' = k$, and $r' b'^{e'} = r b \cdot b^{2k} = r b^{e} = x^n$.

*Termination:* $e$ is a non-negative integer when the condition holds, and $\lfloor e/2\rfloor < e$ for $e > 0$, so $e$ is a variant ([[#thm-variant]]).

*Result:* by [[#thm-invariant]], at the end $r b^e = x^n$ and $e \le 0$; since $e$ never becomes negative, $e = 0$, so $r = x^n$.

*Count:* halving with rounding down deletes the last binary digit of $e$. Starting from $n$, which has $\lfloor \log_2 n\rfloor + 1$ binary digits, $e$ reaches $0$ after exactly that many iterations.
:::

::: example Tracing repeated squaring {#ex-power-trace}
Trace [[#alg-power]] for $x = 3$, $n = 13$ and check the invariant at each step.
::: solution
$13 = (1101)_2$, so we expect four iterations.

| after iteration | $r$ | $b$ | $e$ | $r \cdot b^{e}$ |
|---|---|---|---|---|
| start | $1$ | $3$ | $13$ | $3^{13}$ |
| 1 ($e = 13$ odd) | $3$ | $9$ | $6$ | $3 \cdot 9^6 = 3^{13}$ |
| 2 ($e = 6$ even) | $3$ | $81$ | $3$ | $3 \cdot 81^3 = 3^{13}$ |
| 3 ($e = 3$ odd) | $243$ | $6561$ | $1$ | $243 \cdot 6561 = 3^{13}$ |
| 4 ($e = 1$ odd) | $1594323$ | $43046721$ | $0$ | $1594323 = 3^{13}$ |

The final $r = 1594323 = 3^{13}$, after $4$ iterations and $4 + 3 = 7$ multiplications, against $12$ multiplications for the naive method. The odd values of $e$ correspond to the $1$ bits of $13$, and those are exactly the iterations that multiply $b$ into $r$: $3^{13} = 3^{8} \cdot 3^{4} \cdot 3^{1}$.
:::
:::

::: widget plot
f: x; floor(log2(x)) + 1
x: 1, 64
y: 0, 64
labels: \text{multiply } n \text{ times}; \text{repeated squaring}
caption: Number of loop iterations needed to compute $x^n$ by multiplying $n$ times (a straight line) and by repeated squaring ($\lfloor\log_2 n\rfloor + 1$, a staircase that rises by one step each time $n$ passes a power of two). At $n = 64$ the counts are $64$ and $7$; at $n = 10^{18}$ they would be $10^{18}$ and $60$. The same algorithm, with every product reduced modulo $m$, is how cryptographic software computes $x^n \bmod m$ for numbers hundreds of digits long.
:::

::: quiz
Which of these is a loop invariant for `i = 0; s = 0; while i < len(xs): s = s + xs[i]; i = i + 1`, where `xs` is a list of numbers?
- [ ] `s == sum(xs)`
- [x] `s == sum(xs[:i])` (the sum of the first `i` elements)
- [ ] `i < len(xs)`
- [x] `0 <= i <= len(xs)`
::: solution
Before the loop, `s` is $0$, which is the sum of the first $0$ elements, and each iteration adds element `i` and then increases `i`, so "`s` is the sum of the first `i` elements" is maintained; at the end `i == len(xs)` and it says `s == sum(xs)`. The bounds `0 <= i <= len(xs)` are also an invariant (true at the start, and an iteration starting with `i < len(xs)` ends with `i <= len(xs)`). `s == sum(xs)` is false at the start for a non-empty list, and `i < len(xs)` is the loop condition, which is false at the end.
:::
:::

## Repetition with `for`

Very often we know exactly what to iterate over: each item of a list, each character of a string, each integer from $1$ to $100$. Python's `for` loop expresses this directly.

::: definition For loop and range {#def-for}
The **for loop** `for name in iterable: body` binds `name` to each item of the iterable in turn and runs the body once for each. An **iterable** is anything that can produce a sequence of items: a list, a string, a `range`, a file, and more. The built-in `range(start, stop, step)` produces the integers

$$
\texttt{start},\ \texttt{start} + \texttt{step},\ \texttt{start} + 2\,\texttt{step},\ \dots
$$

continuing while they are less than `stop` (for `step > 0`) or greater than `stop` (for `step < 0`). `range(stop)` means `range(0, stop, 1)`, and `range(start, stop)` means `range(start, stop, 1)`.
:::

The interval of a `range` is **half-open**: it includes `start` and excludes `stop`. Thus `range(5)` is $0, 1, 2, 3, 4$ — five numbers — and `range(a, b)` contains exactly $b - a$ numbers when $b \ge a$. Half-open intervals look odd at first but avoid many off-by-one errors: `range(0, n)` has $n$ elements, `range(a, b)` and `range(b, c)` join to give `range(a, c)` with no overlap and no gap, and an empty range is simply `range(a, a)`. Some examples: `list(range(2, 20, 3))` is `[2, 5, 8, 11, 14, 17]`, `list(range(10, 0, -3))` is `[10, 7, 4, 1]`, and `list(range(5, 5))` is `[]`.

A `for` loop over a `range` terminates automatically, because a range is finite, and its iteration count is visible in the code. That makes it preferable to a `while` loop whenever the number of iterations is known in advance. The loop `for i in range(1, n + 1): total += i` does the same job as the `while` loop for $1 + \dots + n$ above, with no counter to update and nothing to forget.

::: example Nested loops {#ex-nested}
Print a $4 \times 4$ multiplication table, and count how many times the inner body runs.
::: solution
```python
for i in range(1, 5):
    for j in range(1, 5):
        print(f"{i * j:3d}", end="")   # width 3, stay on the same line
    print()                            # end the row
```

```console
$ python3 table.py
  1  2  3  4
  2  4  6  8
  3  6  9 12
  4  8 12 16
```

For each of the $4$ values of `i`, the inner loop runs through all $4$ values of `j`, so the inner body runs $4 \times 4 = 16$ times and the outer `print()` runs $4$ times. In general a loop over $m$ items containing a loop over $n$ items runs its inner body $mn$ times; if the inner range depends on the outer variable, as in `for j in range(i)`, add up the inner counts instead ([[#exr-triangle]]). Counting iterations like this is the beginning of the analysis of algorithms.
:::
:::

### `break`, `continue` and `else`

Two statements change the flow inside a loop. `break` leaves the innermost enclosing loop immediately; `continue` skips the rest of the current iteration and goes on to the next. For example `for k in range(1, 11): if k % 3 == 0: continue; print(k)` (written on separate lines) prints the numbers from $1$ to $10$ that are not multiples of $3$.

A loop may also have an `else` clause, which runs if the loop finished normally — that is, *not* by `break`. This makes "search, and report failure if not found" easy to write.

::: example Searching for a divisor {#ex-divisor}
Find the smallest divisor $d \ge 2$ of $n = 91$, or report that $n$ is prime. Why is it enough to try $d$ with $d^2 \le n$?
::: solution
```python
n = 91
d = 2
while d * d <= n:
    if n % d == 0:
        print(n, "=", d, "*", n // d)
        break
    d += 1
else:
    print(n, "is prime")
```

```console
$ python3 divisor.py
91 = 7 * 13
```

With `n = 97` the program prints `97 is prime`: no $d$ from $2$ to $9$ divides $97$, the loop ends because $10^2 > 97$, and the `else` clause runs. When a divisor is found, `break` skips the `else`.

Why stop at $\sqrt n$? If $n = de$ with $2 \le d \le e$, then $d^2 \le de = n$. So if $n$ has any factorisation into two factors at least $2$, the smaller factor satisfies $d^2 \le n$ and the loop finds it. If no $d$ with $d^2 \le n$ divides $n$ (and $n \ge 2$), then $n$ is prime. This cuts the work for $n$ around a million from about a million trial divisions to about a thousand.
:::
:::

::: warning Off-by-one errors
The most common bug in loops is doing one iteration too many or too few, usually at a boundary: `range(1, n)` when `range(1, n + 1)` was meant, `<` where `<=` was needed, a counter incremented before rather than after its use. Two habits catch most of them. First, test with the smallest cases — $n = 0$, $n = 1$, an empty list — where a mistake by one is a large fraction of the answer. Second, state what is true at the start and end of each iteration (the invariant) and check that the loop condition stops exactly when the invariant says the job is done.
:::

::: warning Infinite loops
A `while` loop whose condition never becomes false runs for ever, and the program appears to "hang". The usual causes are forgetting to update the loop variable (`while i < n:` with no `i += 1`), updating the wrong variable, or a condition that can step over its target, such as `while x != 1.0:` with `x` a float that never exactly equals $1.0$. If a program hangs, interrupt it with Ctrl-C: Python raises `KeyboardInterrupt` and the traceback shows which line was running. A variant ([[#thm-variant]]) rules infinite loops out before you run anything.
:::

::: quiz
How many times does the body of `for k in range(3, 30, 4)` run?
- [ ] 6
- [x] 7
- [ ] 8
- [ ] 27
::: solution
The values are $3, 7, 11, 15, 19, 23, 27$; the next one, $31$, is not less than $30$. That is $7$ values. In general `range(a, b, s)` with $s > 0$ and $b > a$ has $\lceil (b - a)/s \rceil$ elements: here $\lceil 27/4\rceil = 7$.
:::
:::

::: history
The flowcharts of Herman Goldstine and John von Neumann (1947) described programs as boxes joined by arrows, with the flow of control made explicit by jumps. Early languages such as FORTRAN (1957) followed suit with `GO TO`, and large programs became tangled webs of jumps. ALGOL 60 introduced nested blocks with `if … then … else` and `for` loops; Corrado Böhm and Giuseppe Jacopini showed in 1966 that sequencing, selection and iteration suffice for any flowchart program; and Edsger Dijkstra's letter "Go To Statement Considered Harmful" (*Communications of the ACM*, 1968) launched the movement for **structured programming**, whose loop and conditional constructs every modern language now uses. Robert Floyd ("Assigning meanings to programs", 1967) and C. A. R. Hoare ("An axiomatic basis for computer programming", 1969) introduced the invariant-based reasoning about loops used in this chapter.
:::

## Where this leads

With conditionals and loops you can, in principle, write any program; the rest of the course is about writing them well. [[programming-1/functions]] packages a loop like `power` into a reusable function with a clear contract; [[programming-1/recursion]] offers an alternative to loops that is often closer to the mathematics; and [[programming-1/sequences]] applies loops to lists and strings. The invariants and variants of this chapter reappear as the standard method for proving algorithms correct in [[algorithms]], and as the assertions of [[programming-1/testing-debugging]].

::: summary
- `if`/`elif`/`else` tries conditions in order and runs exactly the first block whose condition is truthy; order matters, and later conditions may assume earlier ones failed.
- De Morgan's laws ([[#eq-de-morgan]]) turn `not (p and q)` into `not p or not q` and `not (p or q)` into `not p and not q`.
- A `while` loop repeats while its condition holds; use it when the number of iterations is not known in advance. A `for` loop runs once per item of an iterable; `range(a, b)` is half-open and has $b - a$ elements.
- A **variant** — an integer quantity that is $\ge 0$ while the loop runs and strictly decreases each iteration — proves termination ([[#thm-variant]]).
- A **loop invariant** is true before the loop and preserved by each iteration; on exit, invariant and negated condition together give the result ([[#thm-invariant]]).
- Repeated squaring computes $x^n$ in $\lfloor\log_2 n\rfloor + 1$ iterations instead of $n$ ([[#thm-power]]).
- `break` leaves a loop, `continue` skips to the next iteration, and a loop's `else` runs only if no `break` occurred. Test boundaries to catch off-by-one errors.
:::

## Exercises

::: exercise Counting a range {level=1 check="6"}
List the values produced by `range(2, 20, 3)`. How many are there? (Enter the count.)
::: solution
$2, 5, 8, 11, 14, 17$; the next value, $20$, is not less than `stop` $= 20$, so it is excluded. There are $6$ values, matching $\lceil (20 - 2)/3\rceil = 6$.
:::
:::

::: exercise Order of tests {level=1}
What is wrong with the following version of the classification in [[#ex-grade]]? Give a mark for which it returns the wrong class.

```python
if mark >= 40:
    result = "third"
elif mark >= 50:
    result = "lower second"
elif mark >= 60:
    result = "upper second"
elif mark >= 70:
    result = "first"
else:
    result = "fail"
```
::: solution
The conditions are tried in order and the first true one wins. Every mark of $40$ or more satisfies the first test, so the other three branches can never be reached: a mark of $85$ is classified as a `"third"`. The tests must go from the most restrictive (`mark >= 70`) to the least, or each must state both bounds (`50 <= mark < 60`).
:::
:::

::: exercise A triangular loop {#exr-triangle level=1 check="6"}
How many times does `print` run in the following code? (Enter the number.)

```python
for i in range(4):
    for j in range(i):
        print(i, j)
```
::: solution
For $i = 0, 1, 2, 3$ the inner loop runs $0, 1, 2, 3$ times, so `print` runs $0 + 1 + 2 + 3 = 6$ times, printing `1 0`, `2 0`, `2 1`, `3 0`, `3 1`, `3 2`. In general `for i in range(n): for j in range(i)` runs its body $0 + 1 + \dots + (n-1) = n(n-1)/2$ times.
:::
:::

::: exercise Negating a condition {level=2}
Use De Morgan's laws to simplify `not (x > 0 and x < 10)` and `not (name == "" or age < 18)` so that no `not` remains. Check the first with $x = 0$, $x = 5$ and $x = 10$.
::: solution
`not (x > 0 and x < 10)` becomes `not (x > 0) or not (x < 10)`, that is `x <= 0 or x >= 10`. For $x = 0$ both forms are `True`; for $x = 5$ both are `False`; for $x = 10$ both are `True`.

`not (name == "" or age < 18)` becomes `name != "" and age >= 18`. Note that negating a comparison flips it *and* changes strictness: the negation of `<` is `>=`, not `>`.
:::
:::

::: exercise Collatz from 27 {level=2 check="111"}
Write a program that counts the steps the Collatz process ([[#ex-collatz]]) takes to reach $1$ from $n = 27$, and also reports the largest value reached. (Enter the number of steps.)
::: solution
```python
n = 27
steps = 0
highest = n
while n != 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    steps += 1
    highest = max(highest, n)
print(steps, highest)
```

This prints `111 9232`: $111$ steps, with a highest value of $9232$. The conditional expression keeps the update on one line. No variant is known for this loop, so we cannot prove in advance that it stops for every $n$ — only observe that it does for every $n$ anyone has tried.
:::
:::

::: exercise Integer square root by linear search {level=2}
The following loop is meant to compute $\lfloor\sqrt{n}\rfloor$, the largest integer $r$ with $r^2 \le n$, for an integer $n \ge 0$.

```python
r = 0
while (r + 1) * (r + 1) <= n:
    r = r + 1
```

Give an invariant and a variant, and prove the loop correct. How many iterations does it perform?
::: solution
*Invariant:* $r \ge 0$ and $r^2 \le n$. Initially $r = 0$ and $0 \le n$. If $r^2 \le n$ and the condition $(r+1)^2 \le n$ holds, then after `r = r + 1` the new $r$ satisfies $r^2 \le n$.

*Variant:* $n - r$. While the condition holds, $r + 1 \le (r+1)^2 \le n$, so $n - r \ge 1 \ge 0$, and each iteration decreases $n - r$ by $1$. So the loop terminates.

*Result:* at the end the invariant gives $r^2 \le n$ and the negated condition gives $(r+1)^2 > n$, so $r$ is the largest integer whose square is at most $n$, that is $r = \lfloor\sqrt n\rfloor$. The loop performs exactly $\lfloor \sqrt{n}\rfloor$ iterations — about a million for $n = 10^{12}$. The next exercise does much better.
:::
:::

::: exercise Integer square root by bisection {level=3}
Prove that this function returns $\lfloor\sqrt{n}\rfloor$ for every integer $n \ge 0$, and show that it performs at most $\lceil \log_2(n+1) \rceil$ iterations.

```python
def isqrt(n):
    """Largest integer r with r * r <= n, for an integer n >= 0."""
    lo, hi = 0, n + 1            # invariant: lo * lo <= n < hi * hi
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if mid * mid <= n:
            lo = mid
        else:
            hi = mid
    return lo
```
::: hint
Use the invariant $lo^2 \le n < hi^2$ and the variant $hi - lo$. For the bound, show that the length $hi - lo$ is at most halved, rounded up, by each iteration.
:::
::: solution
*Invariant* $P$: $lo^2 \le n < hi^2$ (with $lo, hi$ integers). Initially $0 \le n$ and $n < (n+1)^2$. In an iteration, $hi - lo > 1$ gives $lo < mid < hi$. If $mid^2 \le n$ we set $lo \gets mid$, and $P$ still holds; otherwise $mid^2 > n$ and we set $hi \gets mid$, and again $P$ holds.

*Variant* $hi - lo$: it is at least $2$ while the loop runs and becomes either $hi - mid$ or $mid - lo$, both strictly smaller since $lo < mid < hi$. So the loop terminates.

*Result:* at the end $hi - lo \le 1$, and $P$ gives $lo^2 \le n < hi^2$, which forces $lo < hi$, so $hi = lo + 1$. Then $lo^2 \le n < (lo+1)^2$, which says exactly that $lo = \lfloor\sqrt n\rfloor$.

*Bound:* if the length is $L = hi - lo \ge 2$, then $mid = lo + \lfloor L/2\rfloor$ and the new length is $\lfloor L/2 \rfloor$ or $\lceil L/2\rceil$, so at most $\lceil L/2\rceil$. Starting from $L = n + 1$, after $k$ iterations the length is at most $\lceil (n+1)/2^k\rceil$, which is $1$ once $2^k \ge n + 1$, so at most $\lceil\log_2(n+1)\rceil$ iterations are needed. For $n = 10^{12}$ that is $40$ iterations instead of a million. The function agrees with the standard library's `math.isqrt` for every $n$ below $10{,}000$, and `isqrt(10**20 + 7)` returns `10000000000`.
:::
:::

::: exercise Bits and squarings {level=3 check="10"}
How many iterations does [[#alg-power]] perform for $n = 1000$, and how many multiplications in total (counting both $r \gets r b$ and $b \gets b^2$)? (Enter the number of iterations.)
::: solution
$1000 = (1111101000)_2$ has $10$ binary digits, so by [[#thm-power]] there are $\lfloor\log_2 1000\rfloor + 1 = 9 + 1 = 10$ iterations (Python: `(1000).bit_length()` is `10`). Each iteration squares $b$ once ($10$ multiplications), and multiplies $r$ by $b$ once for each $1$ bit, of which $1000$ has six, giving $16$ multiplications in all — against $999$ for the naive method. (The very first multiplication $r \gets 1 \cdot b$ and the last squaring are wasted and could be avoided, giving $14$, but that does not change the logarithmic growth.)
:::
:::

::: exercise Counting primes {level=3 check="25"}
Using the divisor search of [[#ex-divisor]] inside a `for` loop, write a program that counts the primes less than $100$. (Enter the count.)
::: solution
```python
count = 0
for n in range(2, 100):
    d = 2
    while d * d <= n:
        if n % d == 0:
            break
        d += 1
    else:
        count += 1      # no divisor found: n is prime
print(count)
```

This prints `25`: the primes below $100$ are $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97$. The `else` belongs to the `while` loop, so it runs exactly when no `break` happened. For $n = 2$ and $n = 3$ the `while` condition is false at once, the body never runs, and the `else` correctly counts them as prime.
:::
:::
