Here is a function to compute the median of a list of numbers — the middle value — that a hurried programmer might write:

```python
def median(xs):
    """Return the median of a non-empty list of numbers."""
    n = len(xs)
    return xs[n // 2]
```

Try it on `[1, 3, 8]` and it returns `3`, which is right. Try `[7]`: `7`, right again. It would be easy to stop here. Yet the function is wrong for every list of even length (the median of `[1, 2, 3, 4]` is $2.5$, not `3`), wrong for every unsorted list (the median of `[8, 1, 3]` is `3`, not `1`), and its response to an empty list is an unhelpful `IndexError`. Nothing about the two successful tries hinted at any of this. The tries were simply badly chosen.

Every programmer writes bugs; what distinguishes good programmers is how quickly and reliably they find them. This chapter is about the two activities that do the finding. **Testing** checks a program against its specification on carefully chosen inputs, systematically and automatically, so that errors show up early and stay fixed. **Debugging** is what happens when a test (or a user) reveals a failure: reproducing it, locating the defect and repairing it, by a method closer to experimental science than to guesswork. Along the way we meet assertions, Python's `unittest` framework, how to choose test cases, random testing against a reference implementation, and debugging by bisection.

## Specifications, tests and assertions

A test only makes sense relative to a specification ([[programming-1/functions#def-spec]]): you cannot say that `median` gave the wrong answer without saying what the right answer is. Writing the specification first — in the docstring, in words and examples — is therefore the first step of testing.

::: definition Test case and test suite {#def-test}
A **test case** consists of an input satisfying the precondition, together with the **expected result** required by the postcondition (a value, or an exception that must be raised). The test **passes** if the program produces the expected result on that input, and **fails** otherwise. A **test suite** is a collection of test cases that can be run automatically; a **regression test** is one added to a suite after a bug has been fixed, so that the bug cannot silently return.
:::

Tests cannot establish correctness in general. A function on 64-bit integers has $2^{64}$ possible inputs; no suite can try them all. As Edsger Dijkstra put it in his *Notes on Structured Programming* (1970), testing can show the presence of bugs but never their absence. Proofs, like those for loops in [[programming-1/control-flow]] and for recursion in [[programming-1/recursion]], can show absence, but they are about an idealised program and are themselves written by fallible people. In practice the two complement each other: reasoning guides the design and the choice of tests, and tests catch the mistakes that reasoning missed.

### Assertions

The simplest check is an **assertion** inside the program itself.

::: definition Assertion {#def-assert}
The statement `assert condition, message` evaluates the condition; if it is falsy, it raises `AssertionError` with the message, and otherwise does nothing. An assertion states a fact that the programmer believes must hold at that point — a precondition, a postcondition, a loop invariant — so that a violation is detected at once, close to its cause, instead of producing a wrong result later.
:::

```python
def mean(xs):
    assert len(xs) > 0, "mean of an empty list"
    return sum(xs) / len(xs)

print(mean([2, 4, 9]))
print(mean([]))
```

```console
$ python3 assertdemo.py
5.0
Traceback (most recent call last):
  File ".../assertdemo.py", line 6, in <module>
    print(mean([]))
          ~~~~^^^^
  File ".../assertdemo.py", line 2, in mean
    assert len(xs) > 0, "mean of an empty list"
           ^^^^^^^^^^^
AssertionError: mean of an empty list
```

Assertions are cheap documentation that checks itself. A loop invariant written as an `assert` at the top of the loop body turns the proof idea of [[programming-1/control-flow#thm-invariant]] into a run-time check that fires on the first iteration where the invariant is broken.

::: warning Assertions can be switched off
Running Python with the `-O` (optimise) option removes every `assert` statement. With `python3 -O assertdemo.py` the program above no longer raises `AssertionError`; it reaches the division and fails with `ZeroDivisionError` instead. So assertions must only check things that *should never happen if the program is correct*. Never use them to validate user input, file contents or anything else that can legitimately be wrong — for those, test the condition with `if` and `raise ValueError(...)`, as in [[programming-1/files-exceptions]]. And never put an assertion's condition on something with a side effect, such as `assert xs.pop() > 0`, because with `-O` the side effect disappears too.
:::

## Unit tests

A **unit test** tests one small unit of a program — usually one function — in isolation. Python's standard library includes the `unittest` framework: tests are methods whose names begin with `test` in a class derived from `unittest.TestCase`, and they check results with methods such as `assertEqual(actual, expected)`, `assertTrue(x)`, `assertAlmostEqual(a, b)` for floats and `assertRaises(SomeError)` for expected exceptions. (Classes are explained in [[program-design]]; here the pattern can be copied as it stands.) Many projects use the third-party framework pytest instead, in which tests are plain functions using ordinary `assert` statements; the ideas are the same.

::: example Testing the median {#ex-median-tests}
Write tests for `median` covering a single element, an odd-length sorted list, an odd-length unsorted list, an even-length list and the empty list. Run them against the hurried version, then fix the function.
::: solution
The tests go in their own file, `test_stats.py`, and import the function from `stats.py`:

```python
import unittest
from stats import median

class TestMedian(unittest.TestCase):
    def test_single(self):
        self.assertEqual(median([7]), 7)

    def test_odd_sorted(self):
        self.assertEqual(median([1, 3, 8]), 3)

    def test_odd_unsorted(self):
        self.assertEqual(median([8, 1, 3]), 3)

    def test_even(self):
        self.assertEqual(median([1, 2, 3, 4]), 2.5)

    def test_empty(self):
        with self.assertRaises(ValueError):
            median([])

if __name__ == "__main__":
    unittest.main()
```

Against the hurried `median` (run with `python3 -m unittest test_stats`; the output is abridged here, keeping each failure's last lines):

```console
$ python3 -m unittest test_stats
EF.F.
======================================================================
ERROR: test_empty (test_stats.TestMedian.test_empty)
----------------------------------------------------------------------
...
IndexError: list index out of range

======================================================================
FAIL: test_even (test_stats.TestMedian.test_even)
----------------------------------------------------------------------
...
AssertionError: 3 != 2.5

======================================================================
FAIL: test_odd_unsorted (test_stats.TestMedian.test_odd_unsorted)
----------------------------------------------------------------------
...
AssertionError: 1 != 3

----------------------------------------------------------------------
Ran 5 tests in 0.002s

FAILED (failures=2, errors=1)
```

The first line has one character per test, in alphabetical order of the test names: `.` passed, `F` failed (an assertion was false), `E` error (an unexpected exception). Each report names the test, shows the traceback and the mismatch. Three of the five tests reveal three different defects. The corrected function sorts a copy (leaving the caller's list alone), handles both parities, and raises the specified exception:

```python
def median(xs):
    """Return the median of a non-empty list of numbers; xs is not changed.

    Raises ValueError if xs is empty.
    """
    if not xs:
        raise ValueError("median of an empty list")
    ys = sorted(xs)                      # a sorted copy
    n = len(ys)
    mid = n // 2
    if n % 2 == 1:
        return ys[mid]
    return (ys[mid - 1] + ys[mid]) / 2
```

```console
$ python3 -m unittest test_stats
.....
----------------------------------------------------------------------
Ran 5 tests in 0.000s

OK
```

The suite stays with the code. Any later change that breaks one of these cases is caught the next time the tests run.
:::
:::

Small examples can also live in the docstring itself, written as a REPL session. The standard module `doctest` finds them, runs them and checks the output:

```python
def digit_sum(n):
    """Sum of the decimal digits of an integer n >= 0.

    >>> digit_sum(4096)
    19
    >>> digit_sum(0)
    0
    >>> digit_sum(10**20)
    1
    """
    if n < 10:
        return n
    return digit_sum(n // 10) + n % 10
```

`python3 -m doctest -v digits.py` ends with `3 tests in 2 items.`, `3 passed.` and `Test passed.` (the two items are the module and the function). Doctests double as documentation that cannot go out of date without someone noticing.

## Choosing test cases

The art of testing is choosing a small number of inputs that are likely to expose the defects a program might have. Several principles help.

- **Equivalence classes.** Divide the possible inputs into classes that the specification treats alike — for `median`: odd length, even length; sorted, unsorted; with duplicates — and test at least one input from each.
- **Boundary values.** Errors cluster at the edges of classes: the smallest and largest allowed inputs, and the values on either side of every threshold in the specification. For the degree classification in [[programming-1/control-flow#ex-grade]], test $39$, $40$, $49$, $50$, $59$, $60$, $69$, $70$ and the extremes $0$ and $100$.
- **Special cases.** Empty collections, a single element, all elements equal, zero, negative numbers, very large numbers, the empty string, characters outside ASCII.
- **Invalid inputs.** If the specification says what happens when the precondition is violated (an exception is raised), test that too.
- **Known answers.** Compare with values computed independently: by hand, by a formula, by a slower but obviously correct program.

Tests chosen from the specification alone, without looking at the code, are **black-box** tests. **White-box** tests are chosen by looking at the code, to make sure that every part of it is exercised.

::: definition Statement and branch coverage {#def-coverage}
A test suite achieves **statement coverage** of a function if every statement in it is executed by at least one test, and **branch coverage** if, in addition, every condition in an `if` or loop is evaluated both to true and to false by some test — so that every edge of the control-flow graph is followed.
:::

::: example Covered but not tested {#ex-coverage}
The function below has a defect. Find a single test that executes every statement yet passes, then a test that fails. Which kind of coverage would have forced you to find it?

```python
def safe_reciprocal_ratio(a, b):
    """Return b / a, or 0 if b is 0. Requires a != 0."""
    r = 0
    if b != 0:
        r = a / b
    return 1 / r
```
::: solution
The test `safe_reciprocal_ratio(1, 2)` runs all four statements: `r = 0`, the test, `r = a / b` (giving $0.5$) and the return, which gives $2.0 = 2/1$ as specified. So one passing test achieves 100% statement coverage. But `safe_reciprocal_ratio(1, 0)` skips the body of the `if`, leaves `r = 0` and raises `ZeroDivisionError` instead of returning $0$. Branch coverage requires the condition `b != 0` to be false in some test, which forces exactly this input. (The fix is to compute the specified value directly: `return b / a if b != 0 else 0`.)
:::
:::

::: widget graph
nodes: Entry@0,1; Test@1,1; Body@2,2; Return@3,1
edges: Entry>Test; Test>Body; Body>Return; Test>Return
caption: The control-flow graph of `safe_reciprocal_ratio`. A test with `b != 0` travels Entry → Test → Body → Return and executes every node (statement coverage), but never follows the direct edge Test → Return, which is where the bug lives. Branch coverage asks for every *edge* to be followed. Even branch coverage is no guarantee: a function with $k$ independent `if` statements has up to $2^k$ paths, and a defect may lurk on just one of them.
:::

Coverage is measured by tools (for Python, the third-party package `coverage.py`), and a report of lines never executed by the suite is a good guide to missing tests. But coverage measures what the tests *ran*, not what they *checked*: a test that calls a function and ignores its result covers the function without testing it.

::: quiz
Which set of inputs is the best choice for testing a function `is_leap(year)` for Gregorian leap years?
- [ ] `2020, 2021, 2022, 2023, 2024`
- [x] `2023, 2024, 1900, 2000`
- [ ] `2000` and `2024`
- [ ] Every year from 1 to 3000
::: solution
The specification ([[programming-1/control-flow#ex-leap]]) has four classes: not divisible by 4 (`2023`), divisible by 4 but not 100 (`2024`), divisible by 100 but not 400 (`1900`), and divisible by 400 (`2000`). One year from each class tests every rule. Five consecutive years test only the first two classes, however many there are, and miss the classic century bug. The exhaustive test is possible here but proves little more, needs an independent oracle for 3000 answers, and does not generalise to functions with large input spaces.
:::
:::

### Random testing against a reference

When there is a simple but slow way to compute the right answer, it can serve as an **oracle** for a fast, clever version: generate many random inputs and check that the two agree. This finds the bugs you did not think to test for.

::: example A bug that random tests find {#ex-random-test}
A fast proper-divisor sum, adapted carelessly from [[programming-1/functions#ex-perfect]], adds `d + n // d` for every divisor $d \le \sqrt n$. Compare it with a slow reference on 1000 random inputs.
::: solution
```python
import random

def divisor_sum_fast(n):
    """Sum of the proper divisors of n >= 2 (buggy version)."""
    total = 1
    d = 2
    while d * d <= n:
        if n % d == 0:
            total += d + n // d          # bug: counts d twice when d * d == n
        d += 1
    return total

def divisor_sum_slow(n):
    """Obviously correct, but slow, reference version."""
    return sum(d for d in range(1, n) if n % d == 0)

rng = random.Random(2026)                # fixed seed: the same "random" tests every run
failures = []
for _ in range(1000):
    n = rng.randint(2, 10_000)
    if divisor_sum_fast(n) != divisor_sum_slow(n):
        failures.append(n)
print(len(failures), sorted(failures)[:5])
print(divisor_sum_fast(36), divisor_sum_slow(36))
```

```console
$ python3 randomtest.py
5 [121, 361, 1296, 3136, 9801]
61 55
```

Every failing input is a perfect square ($11^2$, $19^2$, $36^2$, $56^2$, $99^2$), which points straight at the defect: when $d^2 = n$, the divisor $d$ is added twice ($36$ gets $6$ counted twice, $61 = 55 + 6$). The random number generator is created with a fixed **seed**, so the same inputs are generated on every run and any failure can be reproduced. Only about $1\%$ of the numbers from $2$ to $10{,}000$ are perfect squares, so hand-picked tests such as $6$, $28$ and $220$ could easily miss the bug, whereas $1000$ random tests miss it only with probability about $(0.99)^{1000} \approx 4 \times 10^{-5}$.
:::
:::

::: widget plot
f: 1 - (1 - p)^x
x: 0, 3000
y: 0, 1
sliders: p=0.001:0.0001:0.01:0.0001
hlines: 0.95
labels: P(\text{at least one of } n \text{ random tests fails})
caption: If a bug is triggered by a fraction $p$ of the inputs and each random test picks an input independently, the probability that $n$ tests find it is $1 - (1-p)^n$. With $p = 0.001$ (the default) about $3000$ tests are needed for a $95\%$ chance. Move $p$ down: bugs triggered by one input in a million are almost never found by random testing, which is why boundary values and special cases must still be chosen by hand.
:::

The same idea scales up as **property-based testing**: instead of an oracle, state a property every correct output must have (the output of `sorted` is in order and is a rearrangement of the input; `decode(encode(s)) == s`), and check it on many generated inputs. Libraries such as Hypothesis for Python automate the generation and, when a test fails, shrink the failing input to a minimal one.

## Debugging

A failing test tells you *that* something is wrong. Debugging finds out *what*. The temptation is to stare at the code and make changes until the symptom goes away; the reliable method is to treat the failure as a phenomenon to be explained, by the scientific method.

1. **Reproduce** the failure, ideally as an automated test. A bug you cannot reproduce at will is a bug you cannot know you have fixed.
2. **Read the evidence.** The traceback says what exception, on what line, in what chain of calls. Read it from the bottom up.
3. **Form a hypothesis** about the cause, specific enough to test: "the loop index reaches `len(xs) - 1`, and `xs[i + 1]` is then out of range".
4. **Test the hypothesis** with an experiment: print the values involved, inspect them in a debugger, or simplify the input. If the experiment refutes the hypothesis, form a new one.
5. **Fix** the cause, not the symptom; then rerun the whole test suite, and add the failing case as a regression test.

::: example An off-by-one error {#ex-gap}
The function below should return the largest difference between consecutive elements of a sorted list. Debug it.

```python
def largest_gap(xs):
    """Largest difference between consecutive elements of a sorted list (len >= 2)."""
    best = 0
    for i in range(len(xs)):
        gap = xs[i + 1] - xs[i]
        if gap > best:
            best = gap
    return best

print(largest_gap([1, 4, 6, 13, 15]))
```
::: solution
*Reproduce and read.*

```console
$ python3 gaps.py
Traceback (most recent call last):
  File ".../gaps.py", line 10, in <module>
    print(largest_gap([1, 4, 6, 13, 15]))
          ~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^
  File ".../gaps.py", line 5, in largest_gap
    gap = xs[i + 1] - xs[i]
          ~~^^^^^^^
IndexError: list index out of range
```

The markers under the line show that the failing operation is `xs[i + 1]`, not `xs[i]`. *Hypothesis:* `i + 1` reaches `len(xs)` on the last iteration. *Experiment:* a temporary `print(f"i={i} len={len(xs)}")` at the top of the loop body shows `i=0 len=5` up to `i=4 len=5`, and then the traceback: on the last iteration $i = 4$ and $i + 1 = 5$ is out of range. *Fix:* there are only `len(xs) - 1` consecutive pairs, so the loop should be `for i in range(len(xs) - 1):`. The corrected function prints `7` (the gap from $6$ to $13$), and `largest_gap([5, 5])` and `largest_gap([-10, -3])` give `0` and `7`, testing the boundary of two elements and negative values. The temporary `print` is then removed.
:::
:::

Adding `print` calls is the oldest debugging technique and often the quickest. For a closer look, Python includes a **debugger**, `pdb`. Calling the built-in `breakpoint()` stops the program at that line and gives a `(Pdb)` prompt at which you can print any expression (`p expr`), step to the next line (`n`), step into a call (`s`), continue to the next breakpoint (`c`), show the call stack (`w`) or quit (`q`). Here is a short session on the buggy `largest_gap` with `breakpoint()` placed at the top of the loop body and the list `[1, 4, 6]`:

```console
$ python3 pdbdemo.py
> .../pdbdemo.py(4)largest_gap()
-> breakpoint()                        # stop here and open the debugger
(Pdb) p i, xs[i]
(0, 1)
(Pdb) c
> .../pdbdemo.py(4)largest_gap()
-> breakpoint()                        # stop here and open the debugger
(Pdb) p i, best
(1, 3)
(Pdb) c
> .../pdbdemo.py(4)largest_gap()
-> breakpoint()                        # stop here and open the debugger
(Pdb) p i, len(xs)
(2, 3)
(Pdb) q
Quitting pdb will kill the process. Quit anyway? [y/n] y
```

At the third stop $i = 2$ with a list of length $3$, so `xs[i + 1]` is about to fail — the hypothesis confirmed without editing the code. (This session is from Python 3.14, whose `pdb` asks for confirmation before quitting.) Graphical editors offer the same facilities with clickable breakpoints.

### Debugging by bisection

Sometimes the evidence does not point to a line: a test that passed last month fails today, and a hundred changes have been made since; or a program fails on a 10,000-line input file but you cannot see which part of the file matters. Then bisection — the method of [[programming-1/functions#alg-bisection]] applied to versions or inputs instead of numbers — finds the culprit with remarkably few experiments.

::: algorithm Bisection over versions {#alg-bisect-versions}
**Input:** versions $v_0, v_1, \dots, v_n$ of a program, where $v_0$ is known to pass a test and $v_n$ to fail it. **Output:** an index $k$ with $v_{k-1}$ passing and $v_k$ failing.

1. Set $lo \gets 0$ and $hi \gets n$.
2. While $hi - lo > 1$:
   1. Let $mid \gets \lfloor (lo + hi)/2\rfloor$ and run the test on $v_{mid}$.
   2. If $v_{mid}$ passes, set $lo \gets mid$; otherwise set $hi \gets mid$.
3. Return $hi$.
:::

::: theorem Bisection finds a breaking change {#thm-bisect-versions}
[[#alg-bisect-versions]] returns an index $k$ such that $v_{k-1}$ passes and $v_k$ fails, after at most $\lceil \log_2 n\rceil$ test runs.
:::

::: proof
*Invariant:* $v_{lo}$ passes, $v_{hi}$ fails, and $lo < hi$. It holds initially. When $hi - lo > 1$, $lo < mid < hi$, and whichever way the test on $v_{mid}$ turns out, the update keeps a passing version at $lo$ and a failing one at $hi$ with $lo < hi$. *Termination and count:* the length $hi - lo$ becomes $\lfloor L/2\rfloor$ or $\lceil L/2\rceil$ from $L$, so as in [[programming-1/control-flow#thm-variant]] it is a variant, and after $j$ tests it is at most $\lceil n/2^j\rceil$, which is $1$ once $2^j \ge n$. *Result:* at the end $hi = lo + 1$, $v_{lo} = v_{hi - 1}$ passes and $v_{hi}$ fails.
:::

Note what the theorem does *not* assume: the versions need not change from passing to failing only once. If they flip several times, bisection still finds *some* adjacent pair where a passing version is followed by a failing one, which is a change that breaks the test. Version-control systems automate this: `git bisect` runs exactly this search over a project's history, and with a thousand commits between the good and the bad version it needs at most ten test runs. The same halving works on inputs: delete half of a failing input file; if the program still fails, keep the smaller file, otherwise try the other half. Andreas Zeller's **delta debugging** algorithm generalises this to find a minimal failing input automatically.

::: warning Changing code at random
When a bug is hard to find, it is tempting to make small changes — add `+ 1` here, swap `<` for `<=` there — until the test passes. A change that makes a symptom disappear without being understood usually hides the defect rather than removing it, and often introduces a new one for inputs the tests do not cover. If you cannot explain *why* the fix is correct, in terms of the specification and the code, you have not finished debugging. Explaining the code line by line to someone else, or to an inanimate object ("rubber duck debugging"), is surprisingly effective, because it forces you to state what each line actually does rather than what you meant it to do.
:::

::: history
Alan Turing's short paper "Checking a large routine", given at a Cambridge conference in June 1949, already proposed that the programmer annotate a program with assertions about its state and check them, anticipating the invariants of Floyd and Hoare. The word "bug" for a defect is older than computing — Thomas Edison used it in the 1870s — but the Harvard Mark II logbook entry of 9 September 1947, with a moth taped beside the words "First actual case of bug being found", made it part of computing folklore. Glenford Myers's *The Art of Software Testing* (1979) systematised test-case design. Kent Beck's SUnit framework for Smalltalk and JUnit, which he wrote with Erich Gamma in 1997, popularised the automated unit-test frameworks of which Python's `unittest` (in the standard library since Python 2.1, 2001) is a descendant. Koen Claessen and John Hughes introduced property-based testing with QuickCheck for Haskell (2000), and Andreas Zeller published delta debugging in 1999.
:::

## Where this leads

Testing and debugging are skills you will use in every later course. In [[program-design]] tests drive the design of larger programs, and in [[software-engineering]] testing is studied at scale — integration and system tests, continuous integration, test strategies for systems no single person understands. The proofs of correctness met in this course grow into formal verification in [[programming-languages]], where Hoare's logic of assertions becomes a calculus, and the arguments about what random tests can find reappear in the analysis of randomised algorithms in [[algorithms]].

::: summary
- Tests check a program against its **specification** on chosen inputs ([[#def-test]]); they can reveal bugs but not prove their absence. Proofs and tests complement each other.
- `assert condition, message` checks a belief about the program's state ([[#def-assert]]). Assertions disappear under `python3 -O`, so never use them to validate input.
- Unit tests check one function at a time and run automatically (`unittest`, `doctest`, or pytest); keep every fixed bug as a regression test.
- Choose tests by equivalence classes, boundary values, special cases and invalid inputs. Statement coverage is weaker than branch coverage ([[#def-coverage]]), and neither guarantees correctness.
- Random tests against a slow but obviously correct oracle find bugs nobody thought of; seed the random generator so that failures are reproducible. A bug hit by a fraction $p$ of inputs survives $n$ random tests with probability $(1-p)^n$.
- Debug scientifically: reproduce, read the traceback, hypothesise, experiment (with `print` or `pdb`), fix the cause, rerun all tests.
- Bisection over versions or inputs locates a breaking change in at most $\lceil\log_2 n\rceil$ experiments ([[#thm-bisect-versions]]).
:::

## Exercises

::: exercise Boundary values {level=1 check="10"}
For `grade(mark)` from [[programming-1/control-flow#ex-grade]], with marks from $0$ to $100$, list the boundary-value test inputs: the two extremes and the values on either side of each of the four thresholds $40$, $50$, $60$, $70$. (Enter how many inputs that is.)
::: solution
The extremes $0$ and $100$, and $39, 40$; $49, 50$; $59, 60$; $69, 70$: ten inputs, with expected results `fail`, `first`, `fail`, `third`, `third`, `lower second`, `lower second`, `upper second`, `upper second`, `first`. Together they detect any threshold written with `>` instead of `>=` (or vice versa), any off-by-one threshold, and any wrong order of the tests.
:::
:::

::: exercise What do these assertions do? {level=1}
For each statement, say whether it raises `AssertionError`, and what changes if the program is run with `python3 -O`: `assert 1 + 1 == 2`, `assert []`, `assert [0]`, `assert len("abc") == 3, "length"`, `assert (False, "message")`.
::: solution
`assert 1 + 1 == 2` passes. `assert []` raises `AssertionError`, because the empty list is falsy. `assert [0]` passes: a non-empty list is truthy, whatever it contains. `assert len("abc") == 3, "length"` passes. `assert (False, "message")` *passes*: the parentheses make a two-element tuple, which is truthy — a classic mistake, about which Python warns with `SyntaxWarning: assertion is always true, perhaps remove parentheses?`. The intended statement is `assert False, "message"`. Under `-O` none of them is executed, so none raises.
:::
:::

::: exercise Bisecting a history {level=1 check="10"}
A test passed on a version of a project and fails on a version $1000$ commits later. How many test runs does [[#alg-bisect-versions]] need, at most, to find a commit that breaks the test? (Enter the number.)
::: solution
By [[#thm-bisect-versions]], at most $\lceil \log_2 1000\rceil = 10$ runs, since $2^9 = 512 < 1000 \le 1024 = 2^{10}$. Testing every commit in order would need up to $1000$.
:::
:::

::: exercise How many random tests? {level=2 check="2995"}
A bug is triggered by one input in a thousand ($p = 0.001$). What is the smallest number $n$ of independent random tests for which the probability of finding the bug is at least $0.95$? (Enter $n$.)
::: solution
We need $1 - (1 - p)^n \ge 0.95$, that is $(0.999)^n \le 0.05$, so $n \ge \dfrac{\ln 0.05}{\ln 0.999} = \dfrac{-2.99573}{-0.0010005} \approx 2994.2$. The smallest integer is $n = 2995$. A useful approximation is $n \approx 3/p$, since $\ln 0.05 \approx -3$ and $\ln(1 - p) \approx -p$. With $n = 1000$ tests the probability is only $1 - 0.999^{1000} \approx 0.63$.
:::
:::

::: exercise Unit tests for rotation {level=2}
Write a `unittest` test class for `rotate(xs, k)` from the exercises of [[programming-1/sequences]], with at least five tests chosen by the principles of this chapter. Say which class or boundary each test covers.
::: solution
```python
import unittest
from rotation import rotate

class TestRotate(unittest.TestCase):
    def test_typical(self):                       # an ordinary case
        self.assertEqual(rotate([1, 2, 3, 4, 5], 2), [3, 4, 5, 1, 2])

    def test_zero_and_full(self):                 # boundaries k = 0 and k = n
        self.assertEqual(rotate([1, 2, 3], 0), [1, 2, 3])
        self.assertEqual(rotate([1, 2, 3], 3), [1, 2, 3])

    def test_large_and_negative(self):            # k > n and k < 0
        self.assertEqual(rotate([1, 2, 3], 7), [2, 3, 1])
        self.assertEqual(rotate([1, 2, 3, 4, 5], -1), [5, 1, 2, 3, 4])

    def test_empty_and_single(self):              # special cases
        self.assertEqual(rotate([], 4), [])
        self.assertEqual(rotate(["x"], 9), ["x"])

    def test_input_unchanged(self):               # the specification says "a new list"
        data = [1, 2, 3]
        rotate(data, 1)
        self.assertEqual(data, [1, 2, 3])

if __name__ == "__main__":
    unittest.main()
```

With `rotate` saved in `rotation.py`, `python3 -m unittest test_rotation` runs the five tests and reports `OK`. The empty-list test is the one most likely to catch a defect: an implementation that computes `k % len(xs)` without first checking for an empty list raises `ZeroDivisionError`.
:::
:::

::: exercise Find the bug {level=2}
This function should return the average of the non-negative numbers in a list (and `None` if there are none). Design tests that reveal the bug, then fix it.

```python
def mean_non_negative(xs):
    total = 0
    for x in xs:
        if x >= 0:
            total += x
    if total == 0:
        return None
    return total / len(xs)
```
::: solution
Two defects. First, the division is by `len(xs)`, the number of *all* elements: `mean_non_negative([2, -5, 4])` returns $6/3 = 2.0$ instead of $3.0$. Second, `total == 0` is the wrong test for "there are none": `mean_non_negative([0, 0])` returns `None` instead of `0.0`. A test with a negative element and a test whose non-negative elements are all zero reveal them; a test like `[2, 4]` would pass and hide both. The fix counts the selected elements:

```python
def mean_non_negative(xs):
    """Mean of the elements of xs that are >= 0, or None if there are none."""
    chosen = [x for x in xs if x >= 0]
    if not chosen:
        return None
    return sum(chosen) / len(chosen)
```

Now `[2, -5, 4]` gives `3.0`, `[0, 0]` gives `0.0`, and `[-1]` and `[]` give `None`.
:::
:::

::: exercise Statement coverage is not enough {level=3}
Give a function of two `if` statements and two tests that together achieve branch coverage (every condition both true and false), and yet miss a defect that appears only when both conditions are true. How many tests would be needed to cover every *path* through a function with $k$ independent `if` statements?
::: solution
```python
def price(base, member, sale):
    """Price after a 10% member discount and a 20% sale discount (both may apply)."""
    discount = 0
    if member:
        discount = 0.1
    if sale:
        discount = 0.2          # bug: should be discount += 0.2 (or combine multiplicatively)
    return base * (1 - discount)
```

The tests `price(100, True, False)` (expected $90$) and `price(100, False, True)` (expected $80$) both pass, and between them each condition is true once and false once: full branch coverage. But for a member during a sale the function returns $80$ instead of the specified price ($70$ if the discounts add, $72$ if they multiply — the specification has to say which, and writing the test forces that decision). The defect is on the path where both conditions are true, which neither test follows. With $k$ independent `if` statements there are $2^k$ paths, so path coverage needs $2^k$ tests — $1024$ for ten conditions — which is why testers rely on equivalence classes and on the interactions most likely to matter rather than on exhaustive path coverage.
:::
:::

::: exercise A property test for merging {level=3}
Write a random test for `merge(xs, ys)` from the exercises of [[programming-1/sequences]] that, for 500 pairs of random sorted lists, checks the two properties that characterise a correct result: it is sorted, and it contains exactly the elements of `xs` and `ys` together. Use a seeded random generator. Explain why checking `merge(xs, ys) == sorted(xs + ys)` is an equivalent test here.
::: solution
```python
import random
from merging import merge

def is_sorted(zs):
    return all(zs[i] <= zs[i + 1] for i in range(len(zs) - 1))

rng = random.Random(1)
for trial in range(500):
    xs = sorted(rng.randint(-20, 20) for _ in range(rng.randint(0, 8)))
    ys = sorted(rng.randint(-20, 20) for _ in range(rng.randint(0, 8)))
    out = merge(xs, ys)
    assert is_sorted(out), (xs, ys, out)
    assert sorted(out) == sorted(xs + ys), (xs, ys, out)   # same elements, same multiplicities
print("all 500 trials passed")
```

With the correct `merge` this prints `all 500 trials passed`; with a defective one (for example, one that forgets the final `extend` calls) the first failing assertion shows the offending lists, because the assertion message is the tuple `(xs, ys, out)`. Lengths from $0$ to $8$ and a small range of values make empty lists and duplicates frequent, which is where merging bugs live. Comparing with `sorted(xs + ys)` is equivalent because a list of numbers that is sorted and is a rearrangement of a given multiset is unique — there is exactly one sorted arrangement of any multiset — so the two properties hold exactly when `out == sorted(xs + ys)`.
:::
:::
