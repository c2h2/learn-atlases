A shipping-fee function has a test suite that executes 87% of its branches and passes. Then a customer is charged £6.00 for a parcel of exactly 2 kg, which the price list says costs £3.50. The tests tried 1 kg, 5 kg and 20 kg — sensible, typical values — and none of them sat on a boundary. Worse, a deliberate experiment shows that the suite would still pass if *every* comparison in the function were changed from `<=` to `<` or vice versa: it executes the code but checks almost nothing about it.

[[programming-1/testing-debugging]] introduced testing for single functions: test cases, assertions, unit tests, equivalence classes, statement and branch coverage, random tests against an oracle and bisection. This chapter treats testing as an engineering discipline for whole systems. We distinguish the **levels** at which tests run, make test design systematic — boundaries, combinatorial coverage, the MC/DC criterion required for flight software — and measure the strength of a suite by **mutation testing**, which, unlike coverage, asks whether tests would notice a bug. We isolate units with **test doubles**, generate inputs with **property-based testing**, and look at what test-driven development is and what the evidence says about it. Tests below use pytest 9 and Hypothesis 6, third-party packages installed in a virtual environment.

## Levels of testing

::: definition Test levels {#def-test-levels}
A **unit test** checks one unit — a function, class or module — in isolation from the rest of the system. An **integration test** checks that several units, or a unit and real external resources (a database, a file system, another service), work together through their interfaces. A **system test** checks the complete, deployed system against its requirements, through its external interfaces. An **acceptance test** checks, usually with or on behalf of the customer, that the system meets the users' needs — often the executable acceptance criteria of [[software-engineering/requirements#ex-acceptance]]. Tests at any level that are rerun after every change to detect unintended effects are **regression tests**.
:::

The levels catch different defects. Unit tests find mistakes of logic quickly and point to their location; integration tests find mismatched assumptions between units (one passes pence, the other expects pounds; one closes a connection the other still uses), which unit tests with simulated collaborators cannot see; system tests find what only appears in the assembled whole — configuration errors, performance under load, security holes. **Non-functional** tests check quality requirements: **load tests** measure behaviour under expected traffic, **stress tests** beyond it, **security tests** probe for vulnerabilities ([[security/secure-development]]), **usability tests** observe real users ([[hci/usability-evaluation]]).

Mike Cohn's **test pyramid** (*Succeeding with Agile*, 2009) recommends many fast unit tests at the base, fewer integration tests, and few slow end-to-end tests at the top, because tests higher up are slower, more fragile and harder to diagnose when they fail. It is a heuristic about cost, not a law: a system that is mostly glue between services may need more integration tests than unit tests.

Every test needs an **oracle** — a way to decide whether the output is right. Sometimes the specification gives it directly; often it does not ("is this route the shortest?", "is this image rendered correctly?"). Partial oracles help: properties every correct output has, a slower reference implementation, or the previous version's output for regression (a **golden** or **snapshot** test). The oracle problem is one reason why testing is hard to automate completely.

## Designing test cases

### Partitions and boundaries

**Partition testing** divides the input domain into classes that the specification treats alike and tests each; **boundary-value analysis** adds the values at and next to each class boundary, where off-by-one errors and wrong comparison operators live. These were introduced in [[programming-1/testing-debugging]]; here we apply them systematically and let the test framework generate one test per case.

::: example Boundaries for the shipping fee {#ex-boundaries}
The fee is £3.50 up to 2 kg, £6.00 over 2 kg up to 10 kg, £12.00 over 10 kg up to 30 kg; heavier or non-positive weights are refused; express doubles the fee. Write boundary tests with pytest's `parametrize`.
::: solution
```python
def shipping_fee(weight_kg: float, express: bool) -> float:
    """Fee in pounds. Up to 2 kg: 3.50; over 2 kg up to 10 kg: 6.00;
    over 10 kg up to 30 kg: 12.00; heavier parcels are refused.
    Express doubles the fee."""
    if weight_kg <= 0 or weight_kg > 30:
        raise ValueError("weight must be in (0, 30] kg")
    if weight_kg <= 2:
        fee = 3.50
    elif weight_kg <= 10:
        fee = 6.00
    else:
        fee = 12.00
    return fee * 2 if express else fee
```

The partitions are: invalid low ($\le 0$), class 1 $(0, 2]$, class 2 $(2, 10]$, class 3 $(10, 30]$, invalid high ($> 30$). Their boundaries are $0$, $2$, $10$ and $30$, and for each we test the boundary itself and a value just across it, using 0.01 kg as the step (the precision the business uses):

```python
import pytest
from shipping import shipping_fee

@pytest.mark.parametrize("weight, expected", [
    (0.01, 3.50), (2.0, 3.50),        # lowest class: smallest value, upper boundary
    (2.01, 6.00), (10.0, 6.00),       # just above 2, upper boundary 10
    (10.01, 12.00), (30.0, 12.00),    # just above 10, the maximum allowed
])
def test_standard_fee_at_boundaries(weight, expected):
    assert shipping_fee(weight, express=False) == expected

def test_express_doubles():
    assert shipping_fee(5, express=True) == 12.00

@pytest.mark.parametrize("weight", [0, -1, 30.01])
def test_invalid_weights_are_refused(weight):
    with pytest.raises(ValueError):
        shipping_fee(weight, express=False)
```

```console
$ pytest -v test_shipping.py
...
test_shipping.py::test_standard_fee_at_boundaries[0.01-3.5] PASSED       [ 10%]
test_shipping.py::test_standard_fee_at_boundaries[2.0-3.5] PASSED        [ 20%]
test_shipping.py::test_standard_fee_at_boundaries[2.01-6.0] PASSED       [ 30%]
test_shipping.py::test_standard_fee_at_boundaries[10.0-6.0] PASSED       [ 40%]
test_shipping.py::test_standard_fee_at_boundaries[10.01-12.0] PASSED     [ 50%]
test_shipping.py::test_standard_fee_at_boundaries[30.0-12.0] PASSED      [ 60%]
test_shipping.py::test_express_doubles PASSED                            [ 70%]
test_shipping.py::test_invalid_weights_are_refused[0] PASSED             [ 80%]
test_shipping.py::test_invalid_weights_are_refused[-1] PASSED            [ 90%]
test_shipping.py::test_invalid_weights_are_refused[30.01] PASSED         [100%]
```

`parametrize` turns one test function into one test per row, each reported separately, so a failure names the exact input. Comparing floats with `==` is safe here because the expected values are exactly representable ($3.5$, $6$, $12$ and their doubles); for computed values use `pytest.approx` ([[programming-1/values-types]]).
:::
:::

### Combinations of parameters

Many failures appear only for particular *combinations* of inputs or configuration: the payment page fails only in Safari on macOS with the language set to Chinese. Testing every combination is usually impossible — ten settings with four values each give $4^{10} \approx 10^6$ configurations — but most such failures involve only a few parameters at once. Kuhn, Wallace and Gallo ("Software fault interactions and implications for software testing", *IEEE TSE*, 2004) examined fault reports for several kinds of systems (medical devices, a browser, a server, a database) and found that most faults were triggered by a single parameter or an interaction of two, and all those they studied by interactions of at most six. That observation, which concerns the systems studied and need not hold elsewhere, motivates covering all small combinations rather than all combinations.

::: definition $t$-way coverage {#def-t-way}
Let a system have parameters $p_1, \dots, p_k$, parameter $p_i$ taking values in a finite domain $D_i$. A **test** assigns a value to every parameter. A set of tests achieves **$t$-way** (for $t = 2$, **pairwise**) **coverage** if for every choice of $t$ distinct parameters and every combination of values for them, some test assigns those values to those parameters. Such a test set is a **covering array**.
:::

::: proposition Size of a pairwise test set {#prop-pairwise-bound}
Any pairwise test set has at least $\lvert D_i\rvert \cdot \lvert D_j\rvert$ tests for every pair $i \ne j$, so at least the product of the two largest domain sizes. In contrast, exhaustive testing needs $\prod_i \lvert D_i\rvert$ tests.
:::

::: proof
Fix $i \ne j$. There are $\lvert D_i\rvert \cdot \lvert D_j\rvert$ value pairs for $(p_i, p_j)$, each must appear in some test, and each test contains exactly one value pair for $(p_i, p_j)$. So at least that many tests are needed. Exhaustive testing contains each full assignment once, and there are $\prod_i \lvert D_i\rvert$ of them.
:::

The lower bound is often nearly achievable, and a simple greedy algorithm comes close in practice; Cohen, Dalal, Fredman and Patton's AETG system ("The AETG system", *IEEE TSE*, 1997) showed that a greedy strategy produces pairwise test sets whose size grows only *logarithmically* with the number of parameters $k$.

::: algorithm Greedy pairwise test generation {#alg-pairwise}
**Input:** domains $D_1, \dots, D_k$. **Output:** a pairwise test set.

1. Let $U$ be the set of all value pairs $((i, a), (j, b))$ with $i < j$, $a \in D_i$, $b \in D_j$ (the uncovered pairs), and $T \gets \emptyset$.
2. While $U \ne \emptyset$:
   1. Choose a full assignment $x$ that covers the largest number of pairs in $U$.
   2. Add $x$ to $T$ and remove the pairs it covers from $U$.
3. Return $T$.
:::

Each iteration covers at least one new pair (any uncovered pair can be completed to a full assignment), so the loop terminates, and on termination every pair is covered. Searching all full assignments in step 2.1 is exponential in $k$; real tools build $x$ one parameter at a time instead.

::: example Pairwise configurations {#ex-pairwise}
A web shop must work in three browsers, on three operating systems, in two languages and with two payment methods. Generate a pairwise test set.
::: solution
```python
from itertools import combinations, product

def pairs_of(test):
    """The set of ((param i, value), (param j, value)) pairs a test covers."""
    return {((i, test[i]), (j, test[j])) for i, j in combinations(range(len(test)), 2)}

def pairwise(domains):
    """Greedy: repeatedly add the full combination covering most uncovered pairs."""
    candidates = list(product(*domains))
    uncovered = set().union(*(pairs_of(t) for t in candidates))
    tests = []
    while uncovered:
        best = max(candidates, key=lambda t: len(pairs_of(t) & uncovered))
        tests.append(best)
        uncovered -= pairs_of(best)
    return tests

domains = [["Chrome", "Firefox", "Safari"], ["Windows", "macOS", "Linux"],
           ["en", "zh"], ["card", "paypal"]]
tests = pairwise(domains)
for t in tests:
    print(*t)
print(len(tests), "tests instead of", len(list(product(*domains))))
```

```console
$ python3 pairwise.py
Chrome Windows en card
Chrome macOS zh paypal
Firefox Linux en paypal
Safari Linux zh card
Firefox Windows zh card
Safari Windows en paypal
Firefox macOS en card
Chrome Linux en card
Safari macOS en card
9 tests instead of 36
```

By [[#prop-pairwise-bound]] at least $3 \times 3 = 9$ tests are needed, so this set is optimal. (Safari on Windows is not a real configuration as of 2026; real tools accept **constraints** excluding impossible combinations.) Every pair of values appears — for instance (Safari, zh) in test 4 and (macOS, paypal) in test 2 — but not every triple: Safari, macOS and Chinese never appear together, so a fault needing all three would be missed.
:::
:::

::: widget plot
f: v^x; v^2
x: 1, 10
y: 0, 400
sliders: v=2:1:6:3
labels: \text{exhaustive: } v^k; \text{pairwise lower bound: } v^2
caption: For $k$ parameters (horizontal axis) with $v$ values each, exhaustive testing needs $v^k$ tests, while [[#prop-pairwise-bound]] only forces $v^2$ for pairwise coverage, and greedy algorithms achieve roughly $v^2$ times a logarithm of $k$. With $v = 3$ and $k = 10$, exhaustive testing needs $59{,}049$ configurations (far above the plot); pairwise needs around 15. Increase $v$: the gap opens even faster.
:::

## Coverage that means something

Statement and branch coverage ([[programming-1/testing-debugging#def-coverage]]) measure which code ran. For a decision such as `if a and (b or c):`, branch coverage needs only two tests, one making the whole decision true and one false — it does not ask whether each condition actually influences the outcome. Avionics standards ask for more.

::: definition Modified condition/decision coverage {#def-mcdc}
Let a **decision** be a Boolean expression built from **conditions** $c_1, \dots, c_n$ (Boolean sub-expressions containing no Boolean operators). A test set achieves **modified condition/decision coverage** (MC/DC) if every decision takes both outcomes, every condition takes both values, and every condition $c_i$ is shown to **independently affect** the outcome: there are two tests in the set that differ only in the value of $c_i$ and give different outcomes (an **independence pair** for $c_i$).
:::

MC/DC is required for the most critical (Level A) airborne software by DO-178B (1992) and its successor DO-178C (2011) ([[software-engineering/verification]]). It is attractive because its cost grows linearly with the number of conditions, whereas testing all combinations grows exponentially.

::: proposition MC/DC needs at least $n + 1$ tests {#prop-mcdc}
Any MC/DC test set for a decision with $n$ conditions has at least $n + 1$ tests (when $n \ge 1$), and $2n$ tests always suffice if every condition can independently affect the outcome.
:::

::: proof
*Lower bound.* Pick one independence pair for each condition, and form a graph whose vertices are the tests and whose edges are the chosen pairs. The edge for $c_i$ joins two assignments that differ exactly in coordinate $i$. Suppose the $n$ edges contained a cycle. Walking round a cycle and returning to the starting assignment, every coordinate must be flipped an even number of times; but each edge flips a different coordinate, so each coordinate on the cycle is flipped exactly once — a contradiction. So the edges form a forest, and a forest with $n$ edges has at least $n + 1$ vertices. *Upper bound.* Taking one independence pair for each condition gives at most $2n$ distinct tests, and these already make every condition take both values and, since each pair has different outcomes, the decision take both outcomes.
:::

::: example MC/DC for a guard {#ex-mcdc}
Find a minimum MC/DC test set for `a and (b or c)`.
::: solution
Enumerate the independence pairs, writing assignments as strings such as `TFT` for $a = $ true, $b = $ false, $c = $ true, and search for the smallest set of rows containing a pair for each condition:

```python
from itertools import product, combinations

def decision(a, b, c):
    return a and (b or c)

names = "abc"
rows = list(product([False, True], repeat=3))
# For each condition, the pairs of rows that differ only in it and change the outcome.
pairs = {k: [(r, s) for r, s in combinations(rows, 2)
             if [i for i in range(3) if r[i] != s[i]] == [k]
             and decision(*r) != decision(*s)]
         for k in range(3)}
for k in range(3):
    print(names[k], [("".join("TF"[not v] for v in r), "".join("TF"[not v] for v in s))
                     for r, s in pairs[k]])
# Smallest set of rows containing an independence pair for every condition.
for size in range(1, len(rows) + 1):
    for chosen in combinations(rows, size):
        if all(any(r in chosen and s in chosen for r, s in pairs[k]) for k in range(3)):
            print("minimal MC/DC set:", ["".join("TF"[not v] for v in r) for r in chosen])
            break
    else:
        continue
    break
```

```console
$ python3 mcdc.py
a [('FFT', 'TFT'), ('FTF', 'TTF'), ('FTT', 'TTT')]
b [('TFF', 'TTF')]
c [('TFF', 'TFT')]
minimal MC/DC set: ['FFT', 'TFF', 'TFT', 'TTF']
```

Four tests, matching the lower bound $n + 1 = 4$ of [[#prop-mcdc]]. Conditions $b$ and $c$ each have only one independence pair, and both need `TFF` (with $a$ true and the other of $b, c$ false, so that the condition in question decides the outcome). The test set is: `TFF` (false), `TTF` (true: shows $b$), `TFT` (true: shows $c$), and `FFT` (false), which pairs with `TFT` to show $a$. Branch coverage would be satisfied by `TTF` and `FFF` alone — and would not notice if `or` had been mistyped as `and`, a fault the MC/DC set detects (`TTF` would become false).
:::
:::

::: widget truthtable
formula: a & (b | c)
compare: a & (b & c)
caption: The decision of [[#ex-mcdc]] and a faulty version with `or` mistyped as `and`. The two differ in the rows `TTF` and `TFT` — exactly the rows that the MC/DC set uses to show that $b$ and $c$ independently affect the outcome, so the MC/DC set catches the mistake. A test set of `TTT` and `FFF`, which gives full branch coverage, gives the same answers for both formulas.
:::

### Mutation testing

Coverage asks whether the tests *executed* the code; it does not ask whether they would *notice* if the code were wrong. **Mutation testing** asks exactly that, by making the code wrong on purpose.

::: definition Mutant and mutation score {#def-mutation}
A **mutant** of a program is a copy with one small syntactic change made by a **mutation operator** — replacing `<` by `<=`, `+` by `-`, `and` by `or`, a constant by another, deleting a statement. A test suite **kills** a mutant if at least one test fails on it. A mutant that behaves identically to the original on every input is **equivalent** and cannot be killed. The **mutation score** of a suite is the fraction of non-equivalent mutants it kills.
:::

The method rests on two hypotheses stated by DeMillo, Lipton and Sayward ("Hints on test data selection", *IEEE Computer*, 1978): the **competent programmer hypothesis** — real programs are usually close to correct, so real faults resemble small mutations — and the **coupling effect** — tests that detect simple faults tend to detect complex ones too. Empirical support is substantial though not unconditional: Just and colleagues ("Are mutants a valid substitute for real faults in software testing?", FSE 2014), using 357 real faults from five open-source Java programs, found that a test suite's mutation score was correlated with its ability to detect the real faults, even after controlling for coverage.

::: example Mutation testing the shipping fee {#ex-mutation}
Write a small mutation tool that swaps comparison operators, and apply it to the shipping fee with the boundary suite of [[#ex-boundaries]] and with the three "typical value" tests of the introduction.
::: solution
The tool uses Python's `ast` module: it parses the source, changes one comparison operator, turns the tree back into source with `ast.unparse`, writes it over the module, runs pytest, and finally restores the original.

```python
import ast, subprocess, sys

SWAPS = {ast.Lt: ast.LtE, ast.LtE: ast.Lt, ast.Gt: ast.GtE, ast.GtE: ast.Gt,
         ast.Eq: ast.NotEq, ast.NotEq: ast.Eq}

def mutants(source):
    """Yield (description, mutated source), one comparison operator changed each time."""
    n_compares = sum(isinstance(n, ast.Compare) for n in ast.walk(ast.parse(source)))
    for k in range(n_compares):
        tree = ast.parse(source)
        node = [n for n in ast.walk(tree) if isinstance(n, ast.Compare)][k]
        old = type(node.ops[0])
        if old in SWAPS:
            node.ops[0] = SWAPS[old]()
            yield (f"line {node.lineno}: {old.__name__} -> {SWAPS[old].__name__}",
                   ast.unparse(tree))

def run_tests():
    return subprocess.run([sys.executable, "-m", "pytest", "-q", "-x", sys.argv[2]],
                          capture_output=True).returncode == 0

target = sys.argv[1]
original = open(target).read()
killed = total = 0
try:
    for desc, src in mutants(original):
        open(target, "w").write(src)
        total += 1
        survived = run_tests()
        killed += not survived
        print(("SURVIVED " if survived else "killed   ") + desc)
finally:
    open(target, "w").write(original)      # always restore the real code
print(f"mutation score: {killed}/{total}")
```

The weak suite tests 1 kg, 5 kg and 20 kg (express):

```python
from shipping import shipping_fee
def test_typical_values():
    assert shipping_fee(1, False) == 3.50
    assert shipping_fee(5, False) == 6.00
    assert shipping_fee(20, True) == 24.00
```

```console
$ python3 mutate.py shipping.py test_shipping.py
killed   line 7: LtE -> Lt
killed   line 5: LtE -> Lt
killed   line 5: Gt -> GtE
killed   line 9: LtE -> Lt
mutation score: 4/4
$ python3 mutate.py shipping.py test_weak.py
SURVIVED line 7: LtE -> Lt
SURVIVED line 5: LtE -> Lt
SURVIVED line 5: Gt -> GtE
SURVIVED line 9: LtE -> Lt
mutation score: 0/4
$ coverage run --branch -m pytest -q test_weak.py
$ coverage report -m --include=shipping.py
Name          Stmts   Miss Branch BrPart  Cover   Missing
---------------------------------------------------------
shipping.py       9      1      6      1    87%   6
---------------------------------------------------------
TOTAL             9      1      6      1    87%
```

The weak suite has 87% branch coverage (it misses only the `raise` on line 6) and kills *none* of the four mutants: every boundary could be wrong and it would pass. The boundary suite kills all four, because each mutant changes the answer at exactly one boundary value, and the suite tests every boundary. That is the real argument for boundary-value analysis. (Mutation tools for Python, such as mutmut, work the same way with many more operators; they are slow, since the suite runs once per mutant, so they are used on critical modules or run overnight.)
:::
:::

::: quiz
A mutation tool changes `if n > 0:` to `if n >= 0:` in a function whose precondition is that `n` is a positive integer. The mutant survives every test. What should you conclude?
- [ ] The test suite is too weak and needs a test with `n = 0`.
- [x] The mutant may be equivalent with respect to the specification: no valid input distinguishes it.
- [ ] The mutation tool is broken.
- [ ] The original code has a bug at `n = 0`.
::: solution
The two conditions differ only at `n = 0`, which the precondition excludes, so no *valid* test can kill the mutant: it is equivalent for all inputs the function promises to handle. Adding a test with `n = 0` would test behaviour outside the specification. Recognising equivalent mutants is undecidable in general (it is program equivalence, [[theory-of-computation/decidability]]), which is why mutation scores are reported against the mutants that are not judged equivalent.
:::
:::

## Isolating what you test

A unit test of a checkout function should not charge a real credit card or send real e-mail. The unit's collaborators are replaced by **test doubles**. Gerard Meszaros's *xUnit Test Patterns* (2007) gave the standard vocabulary.

::: definition Test doubles {#def-doubles}
A **test double** is an object that stands in for a real collaborator in a test. A **dummy** is passed but never used. A **stub** returns canned answers to calls. A **spy** is a stub that also records how it was called. A **mock** is pre-programmed with expectations about the calls it should receive, and the test fails if they are not met. A **fake** is a working but simplified implementation, such as an in-memory database or the fake clock of [[software-engineering/requirements#ex-acceptance]].
:::

Doubles can only be substituted if the unit receives its collaborators rather than creating them — the dependency inversion of [[software-engineering/design-principles#ex-dip]]. Python's standard `unittest.mock.Mock` object can play the roles of stub, spy and mock.

::: example Checking interactions {#ex-mocks}
A `checkout` function charges a payment gateway and e-mails a receipt, but must not e-mail anything if the payment is declined. Test both behaviours with doubles, then show the test catching a bug in which the receipt is sent before the charge.
::: solution
```python
class PaymentDeclined(Exception):
    pass

def checkout(cart, gateway, mailer):
    """Charge the cart's total and e-mail a receipt; no e-mail if payment fails."""
    total = round(sum(cart["prices"]), 2)
    if not gateway.charge(cart["card"], total):
        raise PaymentDeclined(total)
    mailer.send(cart["email"], f"Receipt: {total:.2f}")
    return total
```

```python
from unittest.mock import Mock
import pytest
from checkout import checkout, PaymentDeclined

CART = {"prices": [12.5, 7.25], "card": "tok_123", "email": "ada@example.org"}

def test_successful_checkout_charges_once_and_sends_receipt():
    gateway = Mock()
    gateway.charge.return_value = True          # a stub: canned answer
    mailer = Mock()                             # a mock: records its calls
    assert checkout(CART, gateway, mailer) == 19.75
    gateway.charge.assert_called_once_with("tok_123", 19.75)
    mailer.send.assert_called_once_with("ada@example.org", "Receipt: 19.75")

def test_declined_payment_sends_no_receipt():
    gateway = Mock()
    gateway.charge.return_value = False
    mailer = Mock()
    with pytest.raises(PaymentDeclined):
        checkout(CART, gateway, mailer)
    mailer.send.assert_not_called()
```

```console
$ pytest -q test_checkout.py
..                                                                       [100%]
2 passed in 0.16s
```

Now move the `mailer.send` line above the charge — a plausible refactoring mistake — and rerun:

```console
$ pytest -q test_checkout.py
...
E           AssertionError: Expected 'send' to not have been called. Called 1 times.
E           Calls: [call('ada@example.org', 'Receipt: 19.75')].
...
FAILED test_checkout.py::test_declined_payment_sends_no_receipt - AssertionEr...
1 failed, 1 passed in 0.23s
```

The second test failed and its message shows the offending call. Note what these tests do *not* check: that the real gateway accepts `"tok_123"` and an amount in pounds, or that the real mailer can reach a server. Those are integration tests' business.
:::
:::

::: warning Mock everything, test nothing
Doubles are powerful and easy to overuse. A test that mocks every collaborator and asserts the exact sequence of calls tests the *implementation*, not the behaviour: it fails whenever the code is restructured, even correctly, and it passes when the real collaborators would have rejected the calls, because the mocks accept whatever they are told to. Prefer real objects when they are fast and deterministic (pure functions, in-memory data structures), fakes for slow resources, and mocks mainly at the boundaries of the system — payment, e-mail, the clock, randomness. A suite built only from mocked unit tests can pass completely while the assembled system does not work at all.
:::

### Flaky tests

A **flaky** test passes and fails on the same code. Luo, Hariri, Eloussi and Marinov ("An empirical analysis of flaky tests", FSE 2014) studied 201 fixes of flaky tests in open-source projects and found the commonest causes to be asynchronous waiting (a test that sleeps for a fixed time hoping an operation has finished), concurrency, and dependence on the order in which tests run. Other sources are real clocks, random numbers without a fixed seed, and network access. The remedies follow: wait for conditions rather than for time, inject clocks and seeded random generators, give each test its own fresh state (pytest **fixtures** create it per test), and keep the network out of unit tests. Because a flaky test trains people to ignore failures, it should be fixed or quarantined at once ([[software-engineering/version-control#def-ci]]).

## Generating tests from properties

Hand-picked tests reflect the tester's imagination. **Property-based testing**, introduced in [[programming-1/testing-debugging]], states a property that must hold for all inputs and lets a library generate hundreds of inputs, then **shrinks** any failing input to a minimal one.

::: example A round trip that fails {#ex-hypothesis}
Run-length encoding turns `"aaab"` into `"3a1b"`. Test the property that decoding an encoding gives back the original, for all strings.
::: solution
```python
import re

def encode(s: str) -> str:
    """Run-length encoding: 'aaab' -> '3a1b'."""
    return "".join(f"{len(m.group(0))}{m.group(1)}" for m in re.finditer(r"(.)\1*", s))

def decode(code: str) -> str:
    return "".join(int(n) * ch for n, ch in re.findall(r"(\d+)(\D)", code))
```

```python
from hypothesis import given, strategies as st
from rle import encode, decode

def test_examples():
    assert encode("aaab") == "3a1b"
    assert decode("3a1b") == "aaab"
    assert decode(encode("x" * 12)) == "x" * 12

@given(st.text())
def test_decode_inverts_encode(s):
    assert decode(encode(s)) == s
```

```console
$ pytest -q test_rle.py
.F                                                                       [100%]
...
s = '0'

    @given(st.text())
    def test_decode_inverts_encode(s):
>       assert decode(encode(s)) == s
E       AssertionError: assert '' == '0'
E         
E         - 0
E       Failing test case: test_decode_inverts_encode(
E           s='0',
E       )
...
FAILED test_rle.py::test_decode_inverts_encode - AssertionError: assert '' ==...
1 failed, 1 passed in 2.05s
```

The example tests pass, including the multi-digit count. Hypothesis generated strings until one failed and then shrank it to the simplest failing input, the one-character string `"0"`: its encoding `"10"` contains no non-digit, so `decode` returns the empty string. The format is ambiguous whenever the text contains digits. A tester thinking of "strings" pictures letters; the generator does not share that bias. [[#ex-rle-fix]] repairs the format.
:::
:::

## Test-driven development

::: definition Test-driven development {#def-tdd}
**Test-driven development** (TDD) is a way of writing code in very short cycles of three steps: **red** — write a small test for behaviour that does not yet exist, and see it fail; **green** — write the simplest code that makes all tests pass; **refactor** — improve the structure of the code and tests while keeping all tests passing ([[software-engineering/refactoring-maintenance]]). Each cycle takes minutes.
:::

Kent Beck, who developed the practice within Extreme Programming, described it in *Test-Driven Development: By Example* (2002). Seeing each test fail first checks that the test can fail — a test that passes before the code exists is testing nothing — and writing the test first forces the interface to be designed from the caller's side.

::: example Three cycles {#ex-tdd}
Develop `seconds(text)`, which converts durations such as `"45s"`, `"2m"` and `"1h30m"` to seconds, by TDD.
::: solution
*Cycle 1, red.* Test `seconds("45s") == 45` against a stub `def seconds(text): pass`:

```console
$ pytest -q test_duration.py
E       AssertionError: assert None == 45
E        +  where None = seconds('45s')
1 failed in 0.15s
```

*Green.* The simplest code that passes is `return int(text[:-1])` — deliberately naive: `1 passed`. *Refactor:* nothing yet.

*Cycle 2, red.* Add tests `seconds("2m") == 120` and `seconds("1h30m") == 5400`:

```console
$ pytest -q test_duration.py
E       AssertionError: assert 2 == 120
E        +  where 2 = seconds('2m')
1 failed, 1 passed in 0.13s
```

*Green.* Now a real parser is needed:

```python
import re

UNITS = {"h": 3600, "m": 60, "s": 1}

def seconds(text):
    """'1h30m' -> 5400. Units h, m, s, each at most once, in that order."""
    m = re.fullmatch(r"(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?", text)
    if not m or not text:
        raise ValueError(f"not a duration: {text!r}")
    return sum(int(v) * UNITS[u] for v, u in zip(m.groups(), "hms") if v)
```

`2 passed`. *Cycle 3, red–green.* The docstring makes a promise the tests do not check, so add a parametrised test that `""`, `"90"`, `"1m1h"` and `"5x"` raise `ValueError`; it passes at once (`6 passed`), which is acceptable here because the behaviour was written in cycle 2 — but a test that has never failed deserves a moment's suspicion, and you can check it by temporarily breaking the code. *Refactor:* the `UNITS` table and the docstring are already the clean-up. The tests now document the function's behaviour, including its rejections.
:::
:::

Does TDD work? The evidence is weaker than its advocates suggest and more positive than its critics do. Nagappan, Maximilien, Bhat and Williams ("Realizing quality improvement through test driven development", *Empirical Software Engineering*, 2008) reported that four industrial teams at Microsoft and IBM that adopted TDD had pre-release defect densities 40–90% lower than similar projects without it, with 15–35% more initial development time — but the comparison projects were not controlled, and the teams chose to use TDD. Rafique and Mišić's meta-analysis (*IEEE TSE*, 2013) of 27 studies found a small positive effect on external quality and no clear effect on productivity, with large variation between studies. Fucci and colleagues ("A dissection of the test-driven development process", *IEEE TSE*, 2017) analysed fine-grained logs of professional developers and found that working in small, steady cycles was associated with better outcomes, whereas whether the test was written *before* or *after* the code made no detectable difference. A cautious reading: small increments with immediate testing help; the ordering may matter less than the rhythm.

::: history
Glenford Myers's *The Art of Software Testing* (1979) systematised black-box and white-box test design; a year earlier, DeMillo, Lipton and Sayward proposed mutation testing in 1978. Boris Beizer's *Software Testing Techniques* (1983, 2nd edition 1990) developed path and domain testing. Combinatorial testing grew from experimental design; Cohen and colleagues' AETG system was published in 1997. MC/DC entered the avionics standard DO-178B in 1992. Kent Beck's SUnit and, with Erich Gamma, JUnit (1997) created the xUnit family of frameworks; Beck's *Test-Driven Development* appeared in 2002, Meszaros's catalogue of test doubles in 2007. Koen Claessen and John Hughes's QuickCheck (2000) started property-based testing; David MacIver's Hypothesis brought it to Python in 2013.
:::

## Where this leads

Tests sample behaviour; [[software-engineering/verification]] covers techniques that reason about all behaviours — static analysis, formal specification, model checking — and the standards for safety-critical systems that require MC/DC. Tests are the safety net that makes [[software-engineering/refactoring-maintenance]] possible, and continuous integration ([[software-engineering/version-control]]) runs them on every change. Security testing, including fuzzing — random testing aimed at crashes — is treated in [[security/secure-development]], and experiments with users in [[hci/usability-evaluation]].

::: summary
- Tests run at several **levels** — unit, integration, system, acceptance — that catch different defects ([[#def-test-levels]]); keep most tests fast and low in the pyramid, but not all.
- Design tests from **partitions and boundaries**; every boundary deserves a test on each side.
- **Pairwise** coverage ([[#def-t-way]]) tests all value pairs with as few as $\lvert D_i\rvert\lvert D_j\rvert$ tests ([[#prop-pairwise-bound]]) instead of all combinations; greedy generation ([[#alg-pairwise]]) comes close.
- **MC/DC** ([[#def-mcdc]]) shows that each condition independently affects a decision; it needs at least $n + 1$ and at most $2n$ tests ([[#prop-mcdc]]).
- **Mutation testing** ([[#def-mutation]]) measures whether tests notice faults; high coverage with a low mutation score means tests that run code without checking it.
- **Test doubles** ([[#def-doubles]]) isolate units, but over-mocking tests the implementation; fix flaky tests at once.
- **Property-based testing** finds inputs nobody imagined and shrinks them; **TDD** ([[#def-tdd]]) works in red–green–refactor cycles, with modest, mixed evidence of benefit.
:::

## Exercises

::: exercise Boundary inputs {level=1 check="8"}
A function accepts ages from 18 to 65 inclusive, in three classes: 18–25, 26–40 and 41–65; other ages are rejected. Listing, for each boundary between adjacent classes (including the valid/invalid boundaries), the value on each side of it, how many distinct integer test inputs do you get? (Enter the number.)
::: solution
The boundaries lie between 17 | 18, 25 | 26, 40 | 41 and 65 | 66, giving the inputs 17, 18, 25, 26, 40, 41, 65, 66: eight values. The expected results are reject, class 1, class 1, class 2, class 2, class 3, class 3, reject.
:::
:::

::: exercise Pairwise lower bound {level=1 check="12"}
A system has four parameters with 4, 3, 3 and 2 values. What is the lower bound of [[#prop-pairwise-bound]] on the size of a pairwise test set? (Enter the number.)
::: solution
The product of the two largest domain sizes, $4 \times 3 = 12$, against $4 \times 3 \times 3 \times 2 = 72$ for exhaustive testing.
:::
:::

::: exercise Name the double {level=1}
Classify each by [[#def-doubles]]: (a) an object whose `now()` method returns the time the test sets; (b) a `logger` argument required by a constructor but never called in the test; (c) an in-memory dictionary implementing the same interface as the production key–value store; (d) an object that fails the test unless `send` is called exactly once with given arguments.
::: solution
(a) A stub (it returns canned answers; with a method to advance time, as in the requirements chapter, it is also a simple fake). (b) A dummy. (c) A fake. (d) A mock — its expectations are part of the test.
:::
:::

::: exercise MC/DC for a disjunction {level=2 check="4"}
What is the minimum number of tests for MC/DC of `a or b or c`? Give such a set. (Enter the number.)
::: solution
By [[#prop-mcdc]], at least $n + 1 = 4$. For a disjunction, condition $x$ independently affects the outcome only when the others are false, so the independence pairs are `FFF`–`TFF`, `FFF`–`FTF` and `FFF`–`FFT`. The set {`FFF`, `TFF`, `FTF`, `FFT`} contains all three pairs, so $4$ tests suffice. (For `a and b and c` the mirror image works: `TTT` and the three assignments with one condition false.)
:::
:::

::: exercise Equivalent or not? {level=2}
For `def clamp(x, lo, hi): return max(lo, min(x, hi))` (with precondition `lo <= hi`), decide whether each mutant is equivalent: (a) `min` and `max` swapped, giving `min(lo, max(x, hi))`; (b) `max(lo, min(x, hi))` replaced by `min(hi, max(x, lo))`; (c) `min(x, hi)` replaced by `min(hi, x)`.
::: solution
(a) Not equivalent: for $lo = 0$, $hi = 10$, $x = 5$ it gives $\min(0, \max(5, 10)) = 0$ instead of $5$. (b) Equivalent under the precondition: both compute the value of $x$ clamped to $[lo, hi]$ — if $x < lo$ both give $lo$, if $x > hi$ both give $hi$, otherwise both give $x$ — so no valid test can kill it. Without the precondition they differ ($lo = 10$, $hi = 0$, $x = 5$ gives $10$ and $0$). (c) Equivalent for numbers, since `min` is symmetric. It differs only when `x` and `hi` compare equal but are distinguishable — `min(1, 1.0)` returns `1` and `min(1.0, 1)` returns `1.0` — which a strict test of the result's type could detect: the boundary between "equivalent" and "not" depends on what the specification promises.
:::
:::

::: exercise Repairing the encoding {level=2 #ex-rle-fix}
Repair the run-length encoding of [[#ex-hypothesis]] by writing a separator between the count and the character (`"aaab"` becomes `"3:a1:b"`), and run the property test again. If it fails, find out why and fix it.
::: solution
A first attempt:

```python
import re

def encode(s: str) -> str:
    return "".join(f"{len(m.group(0))}:{m.group(1)}" for m in re.finditer(r"(.)\1*", s))

def decode(code: str) -> str:
    return "".join(int(n) * ch for n, ch in re.findall(r"(\d+):(.)", code))
```

Now digits are safe, since exactly one character follows each colon. But Hypothesis reports a new minimal failure:

```console
$ pytest -q test_rle.py
...
E           s='\n',
...
1 failed in 0.37s
```

In Python's regular expressions `.` does not match a newline, so `encode("\n")` is empty. Adding the flag `re.DOTALL` to both `re.finditer` and `re.findall` makes `.` match every character:

```python
import re

def encode(s: str) -> str:
    """Run-length encoding with a separator: 'aaab' -> '3:a1:b'."""
    return "".join(f"{len(m.group(0))}:{m.group(1)}"
                   for m in re.finditer(r"(.)\1*", s, re.DOTALL))

def decode(code: str) -> str:
    return "".join(int(n) * ch for n, ch in re.findall(r"(\d+):(.)", code, re.DOTALL))
```

```console
$ pytest -q test_rle.py
.                                                                        [100%]
1 passed in 2.05s
```

The property test found two different bugs, each shrunk to a one-character input; the hand-written examples would have found neither.
:::
:::

::: exercise MC/DC for conjunctions {level=3}
Prove that for the decision $c_1 \wedge c_2 \wedge \dots \wedge c_n$ the minimum MC/DC test set has exactly $n + 1$ tests, and that the independence pairs are forced: each consists of the all-true assignment and an assignment with exactly one condition false.
::: solution
*Forced pairs.* Let two assignments differ only in $c_i$ and give different outcomes. One of them makes the conjunction true, so all its conditions are true: it is the all-true assignment $\mathbf{T}$. The other differs from it only in $c_i$, so it is $\mathbf{T}$ with $c_i$ false, written $\mathbf{T}_{\bar i}$; its outcome is false, as required. So the only independence pair for $c_i$ is $\{\mathbf{T}, \mathbf{T}_{\bar i}\}$.

*Exactly $n + 1$.* Any MC/DC set must therefore contain $\mathbf{T}$ and all $n$ assignments $\mathbf{T}_{\bar 1}, \dots, \mathbf{T}_{\bar n}$, which are distinct: $n + 1$ tests. Conversely, these $n + 1$ tests contain every independence pair, make every condition both true and false, and give both outcomes, so they form an MC/DC set. This matches the general lower bound of [[#prop-mcdc]] and shows it is tight; the corresponding graph of the proof is a star centred at $\mathbf{T}$. Compare exhaustive testing, $2^n$ tests: for $n = 10$, 11 tests instead of 1024.
:::
:::

::: exercise More mutation operators {level=3}
Extend the mutation tool of [[#ex-mutation]] with operators that swap `+`/`-`, `*`/`/` and `and`/`or`, and run it on the shipping fee with the boundary suite. Is every new mutant killed, and why?
::: solution
The extension collects every node carrying a mutable operator — comparisons, binary operations and Boolean operations — in a fixed order, mutates one per run and records the outcome:

```python
import ast, subprocess, sys

SWAPS = {ast.Lt: ast.LtE, ast.LtE: ast.Lt, ast.Gt: ast.GtE, ast.GtE: ast.Gt,
         ast.Eq: ast.NotEq, ast.NotEq: ast.Eq,
         ast.Add: ast.Sub, ast.Sub: ast.Add, ast.Mult: ast.Div, ast.Div: ast.Mult,
         ast.And: ast.Or, ast.Or: ast.And}

def sites(tree):
    """Every node carrying an operator we know how to mutate, in a fixed order."""
    out = []
    for n in ast.walk(tree):
        if isinstance(n, ast.Compare) and type(n.ops[0]) in SWAPS:
            out.append((n, "ops"))
        elif isinstance(n, (ast.BinOp, ast.BoolOp)) and type(n.op) in SWAPS:
            out.append((n, "op"))
    return out

def mutants(source):
    for k in range(len(sites(ast.parse(source)))):
        tree = ast.parse(source)
        node, field = sites(tree)[k]
        old = type(node.ops[0]) if field == "ops" else type(node.op)
        if field == "ops":
            node.ops[0] = SWAPS[old]()
        else:
            node.op = SWAPS[old]()
        yield f"line {node.lineno}: {old.__name__} -> {SWAPS[old].__name__}", ast.unparse(tree)

def killed(target, src, tests):
    open(target, "w").write(src)
    return subprocess.run([sys.executable, "-m", "pytest", "-q", "-x", tests],
                          capture_output=True).returncode != 0

target, tests = sys.argv[1], sys.argv[2]
original = open(target).read()
try:
    results = [(desc, killed(target, src, tests)) for desc, src in mutants(original)]
finally:
    open(target, "w").write(original)
for desc, k in results:
    print(("killed   " if k else "SURVIVED ") + desc)
print(f"mutation score: {sum(k for _, k in results)}/{len(results)}")
```

```console
$ python3 mutate2.py shipping.py test_shipping.py
killed   line 5: Or -> And
killed   line 7: LtE -> Lt
killed   line 5: LtE -> Lt
killed   line 5: Gt -> GtE
killed   line 9: LtE -> Lt
killed   line 13: Mult -> Div
mutation score: 6/6
```

Two new mutants appear. Changing `or` to `and` on line 5 makes the validity check `weight_kg <= 0 and weight_kg > 30`, which is never true, so invalid weights are accepted: the invalid-weight tests kill it. Changing `fee * 2` to `fee / 2` halves express fees, killed by `test_express_doubles`. There is no `+` or `-` in the function, so those operators produce no mutants. The suite's design shows in the score: each test exists to pin down one part of the specification, and each mutant violates one part. (The order of the lines follows `ast.walk`, which visits outer nodes before inner ones.)
:::
:::
