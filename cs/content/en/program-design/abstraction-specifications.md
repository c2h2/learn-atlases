You call `sorted` almost every day, and you have probably never read its source. In CPython it is Timsort (since version 3.11 with a refined "powersort" rule for choosing merges), a hybrid of merge sort and insertion sort that takes on the order of a thousand lines of C, with special cases for runs that are already ordered, a "galloping" mode and careful memory management. None of that matters to you. What you rely on is a short description: *`sorted(xs)` returns a new list containing the elements of `xs` in non-decreasing order, and equal elements keep their original relative order.* If the CPython developers replaced it tomorrow by something faster that kept that promise, not one of your programs would need to change.

That separation — a short, exact statement of *what* a piece of code does, standing between the people who use it and the people who implement it — is the subject of this chapter and, in a sense, of the whole course. Programs of a few dozen lines can be understood by reading them. Programs of a few hundred thousand lines cannot: nobody can hold them in their head. They can only be built and maintained if each part can be used, checked and replaced on the strength of a description much smaller than the part itself. We start with procedural abstraction and the anatomy of a specification, then learn to compare specifications, decide who is responsible for checking what, and finally reason about code against its specification with Hoare's logic of assertions.

## Abstraction: forgetting the right details

In [[programming-1/functions]] you met the specification of a single function: a precondition the caller must establish and a postcondition the function guarantees. Here we look at why that idea is so powerful and how to use it deliberately.

::: definition Abstraction {#def-abstraction}
An **abstraction** is a description of a thing that deliberately omits some of its details, so that many different things fit the same description and can be treated alike. A **procedural abstraction** is a named computation — a function — used through a description of its effect rather than through its code. Two mechanisms produce procedural abstractions:

- **abstraction by parameterisation** replaces particular data by parameters, so that one function describes a whole family of computations (`hypotenuse(a, b)` instead of "the hypotenuse of the 3–4 triangle");
- **abstraction by specification** replaces the body of the function by a specification, so that every implementation that meets the specification is interchangeable.
:::

Abstraction by parameterisation is what you do whenever you turn repeated code into a function. Abstraction by specification is subtler and more important: it says that, from the point of view of a caller, a function *is* its specification. The caller may assume everything the specification promises and nothing more. In return, the implementer may change anything the specification does not mention.

Barbara Liskov and John Guttag, whose textbooks shaped how this material is taught, name two benefits of this arrangement.

- **Locality.** A part of the program can be read, written and checked without examining the code of the parts it uses — only their specifications. To convince yourself that a function using `sorted` is correct, you need the paragraph that specifies `sorted`, not the thousand lines that implement it.
- **Modifiability.** A part can be reimplemented without changing the parts that use it, as long as the new implementation meets the same specification.

Both benefits fail the moment a caller depends on something that is true of the current implementation but not promised by the specification. A program that relies on the order in which an implementation happens to return equal elements, or on the time it happens to take, or on an error message's exact wording, has quietly widened the interface; the next correct change to the implementation will break it.

::: intuition The specification is a wall with a window
Picture each function as a box behind a wall. The specification is a window in the wall: callers see exactly what it shows, and the implementer is free to rearrange everything behind it. Good design is largely the art of choosing windows — big enough that callers can do their job, small enough that implementers keep their freedom.
:::

## Writing specifications

A precondition and a postcondition are enough for a function that only computes a value. Real functions also change things — they modify their arguments, write files, raise exceptions — and a specification has to say so. We use a three-part form that goes back to Liskov and Guttag.

::: definition Specification {#def-spec}
A **specification** of a function has three clauses.

- **Requires** (the precondition): the conditions on the arguments and on the state of the program under which the function may be called. Omitting the clause means "requires nothing".
- **Modifies**: the arguments and other objects that the function may change. Everything not listed must be left as it was. Omitting the clause means the function changes nothing.
- **Effects** (the postcondition): the result, the final state of everything listed under *modifies*, and any exceptions raised, described in terms of the arguments' values *on entry*.

A function **satisfies** a specification if every call made in a state satisfying the requires clause terminates, changes nothing outside the modifies clause, and produces the effects. A call that violates the requires clause is outside the specification: whatever happens, the function cannot be blamed.
:::

In Python the specification lives in the docstring. There is no special syntax; what matters is that the three clauses are there and are precise.

::: example Specifying an integer square root {#ex-isqrt}
Write a specification and an implementation for a function that returns the integer square root of a natural number, and test the implementation against the specification.
::: solution
"The integer square root" is vague: is the root of $10$ equal to $3$ or to $3.16$, and is the root of $8$ rounded up or down? The specification removes the vagueness by stating a property of the result rather than a method for computing it.

```python
def isqrt(n):
    """Integer square root.

    Requires: n is an int and n >= 0.
    Effects:  returns the int r with r * r <= n < (r + 1) * (r + 1).
    """
    r = 0
    while (r + 1) * (r + 1) <= n:
        r += 1
    return r

def meets_spec(n, r):
    """True if r is an acceptable result of isqrt(n)."""
    return isinstance(r, int) and r * r <= n < (r + 1) * (r + 1)

print([isqrt(n) for n in range(10)])
print(all(meets_spec(n, isqrt(n)) for n in range(10_000)))
```

```console
$ python3 isqrt.py
[0, 1, 1, 1, 2, 2, 2, 2, 2, 3]
True
```

Three things are worth noticing. First, the effects clause determines the answer uniquely: for each $n \ge 0$ there is exactly one natural number $r$ with $r^2 \le n < (r+1)^2$, namely $\lfloor\sqrt n\rfloor$. Second, the specification says nothing about *how* to find $r$; this implementation counts upwards, which takes about $\sqrt n$ iterations, and [[#exr-isqrt-fast]] replaces it by a much faster one without changing a single caller. Third, because the effects clause is a checkable property, it can be turned directly into a test oracle, `meets_spec`, which accepts any correct result — the basis of the random testing in [[programming-1/testing-debugging]].
:::
:::

### Operational and declarative specifications

The specification of `isqrt` is **declarative**: it states a relationship between input and output. An **operational** specification would describe a procedure instead ("start with $r = 0$ and increase $r$ while…"). Operational specifications are tempting because they are easy to write once the code exists, but they are poor windows: they reveal the implementation and forbid every other one. As a rule, specify the *what*, and describe the *how* in comments inside the body, where only implementers look.

### Determined and underdetermined specifications

A specification need not pin down a unique result. Consider searching for a value in a list that may contain it more than once.

```python
def index_of(xs, x):
    """Requires: x occurs in xs.
    Effects:  returns some i with xs[i] == x."""
    for i in range(len(xs)):
        if xs[i] == x:
            return i

def index_of_from_end(xs, x):
    """Same specification as index_of."""
    for i in range(len(xs) - 1, -1, -1):
        if xs[i] == x:
            return i

xs = [5, 7, 5, 2]
print(index_of(xs, 5), index_of_from_end(xs, 5))
print(index_of(xs, 2), index_of_from_end(xs, 2))
```

```console
$ python3 indexof.py
0 2
3 3
```

The specification is **underdetermined**: for some inputs it allows more than one result. Both functions satisfy it, although they disagree on `[5, 7, 5, 2]`. Underdetermination is not sloppiness; it is a deliberate gift of freedom to the implementer — a hash-based implementation, for example, might find *some* occurrence fastest. The price is paid by callers and testers: a caller must work with whichever index comes back, and a test that asserts `index_of([5, 7, 5, 2], 5) == 0` is wrong, because it checks a property that the specification does not promise. The correct test is `xs[index_of(xs, 5)] == 5`.

### Specifying change

When a function mutates an argument, the modifies clause says so, and the effects clause must describe the final state in terms of the initial one. A convenient notation, borrowed from Liskov and Guttag, writes $xs_{\text{pre}}$ for the value on entry and $xs_{\text{post}}$ for the value on exit.

```python
def remove_all(xs, x):
    """Modifies: xs.
    Effects:  xs_post is xs_pre with every element equal to x removed,
              the other elements kept in their original order."""
    xs[:] = [y for y in xs if y != x]   # slice assignment: change xs itself

def without(xs, x):
    """Effects: returns a new list: xs with every element equal to x removed."""
    return [y for y in xs if y != x]

a = [1, 2, 1, 3]
b = a                     # b and a name the same list
print(without(a, 1), a)
remove_all(a, 1)
print(a, b)
```

```console
$ python3 removeall.py
[2, 3] [1, 2, 1, 3]
[2, 3] [2, 3]
```

The two specifications describe the same filtering but completely different contracts. `without` modifies nothing, so a caller may rely on `a` being unchanged afterwards; `remove_all` modifies its argument, so *every* name bound to that list — here also `b` — sees the change, as aliasing does in [[programming-1/sequences]]. A modifies clause is therefore part of the window that callers most need to see: a function that changes an object the caller thought was safe is one of the commonest sources of baffling bugs.

::: warning A missing clause is a promise
Leaving out the modifies clause is not neutral: it promises that nothing is changed. A function that sorts its argument in place "as a side effect" while its docstring only describes the returned value breaks its specification, even if the returned value is right. Equally, if a function can raise an exception that callers should handle — `ValueError` for malformed input, `KeyError` for a missing key — the effects clause must say when.
:::

::: quiz
`def largest(xs)` has the specification "Requires: `xs` is a non-empty list of numbers. Effects: returns an element of `xs` that is $\ge$ every element of `xs`." Which of the following is true?
- [ ] An implementation may return `None` for the empty list, so callers can test for it.
- [ ] An implementation may sort `xs` in place and return its last element.
- [x] `largest([3, 3])` must return `3`.
- [ ] A test `assert largest([2, 9, 4]) is not None` is enough to show the implementation meets the specification.
::: solution
The specification has no modifies clause, so it promises that `xs` is unchanged: sorting in place violates it, even though the returned value would be right. Since the precondition excludes the empty list, the specification says nothing about `largest([])`; returning `None` there is *allowed* but callers may not rely on it, because another correct implementation might raise an exception instead. For `[3, 3]` the only element that is $\ge$ every element is `3`, so the result is determined. The last test checks almost nothing: an implementation returning `xs[0]` would pass it.
:::
:::

## Comparing specifications

When is one specification "better" than another, and when may an implementation of one be used where the other is expected? The answer is a precise ordering that we will use again for subclasses in [[program-design/inheritance-polymorphism]] and for types in [[program-design/types-interfaces]].

Treat a specification $S$ as a pair $(P_S, Q_S)$: a precondition $P_S(x)$ about the input $x$ and a postcondition $Q_S(x, y)$ relating input $x$ to result $y$ (for functions with effects, $y$ includes the final state).

::: definition Stronger and weaker specifications {#def-stronger}
A specification $S_2$ is **stronger than** (or **refines**) $S_1$, written $S_2 \sqsupseteq S_1$, if

1. its precondition is no stronger: for every $x$, $P_{S_1}(x) \implies P_{S_2}(x)$; and
2. its postcondition is no weaker on the inputs $S_1$ allows: for every $x$ with $P_{S_1}(x)$ and every $y$, $Q_{S_2}(x, y) \implies Q_{S_1}(x, y)$.

In words: $S_2$ *demands no more* from callers and *promises at least as much* to them.
:::

The direction of the first condition surprises people. A stronger specification has a *weaker* precondition, because accepting more inputs is a stronger promise to callers.

::: theorem Stronger specifications can be substituted {#thm-substitute}
If $S_2 \sqsupseteq S_1$, then every implementation that satisfies $S_2$ also satisfies $S_1$. Consequently a caller written against $S_1$ remains correct when the function it calls is replaced by any implementation of $S_2$.
:::

::: proof
Let $f$ satisfy $S_2$, and consider a call $f(x)$ with $P_{S_1}(x)$. By condition 1, $P_{S_2}(x)$ holds, so — because $f$ satisfies $S_2$ — the call terminates with some result $y$ such that $Q_{S_2}(x, y)$. By condition 2, applied to this $x$ (which satisfies $P_{S_1}$) and this $y$, we get $Q_{S_1}(x, y)$. So every call satisfying $P_{S_1}$ terminates with a result satisfying $Q_{S_1}$: $f$ satisfies $S_1$.

For the second sentence, a caller written against $S_1$ only makes calls satisfying $P_{S_1}$ and only relies on $Q_{S_1}$ holding afterwards; we have just shown that any implementation of $S_2$ delivers that.
:::

Notice that condition 2 only quantifies over inputs allowed by $S_1$. Outside them, $S_2$ may promise anything at all, because a caller of $S_1$ never goes there.

::: example Four specifications of search {#ex-compare-specs}
Compare these specifications of `find(xs, x)`, where `xs` is a list:

- $A$: requires `x` occurs in `xs`; returns some `i` with `xs[i] == x`.
- $B$: requires `x` occurs in `xs`; returns the smallest `i` with `xs[i] == x`.
- $C$: requires nothing; returns some `i` with `xs[i] == x` if `x` occurs in `xs`, and `-1` otherwise.
- $D$: requires nothing; returns the smallest `i` with `xs[i] == x` if `x` occurs in `xs`, and `-1` otherwise.
::: solution
Check the two conditions of [[#def-stronger]] for each pair.

- $B \sqsupseteq A$: the preconditions are equal, and "the smallest index with `xs[i] == x`" is in particular "some index with `xs[i] == x`".
- $C \sqsupseteq A$: $C$ requires nothing, which is implied by anything; on inputs where `x` occurs (those $A$ allows), $C$'s postcondition is exactly $A$'s.
- $D \sqsupseteq B$, $D \sqsupseteq C$ and $D \sqsupseteq A$ by the same reasoning: $D$ has the weakest precondition and the strongest postcondition.
- $B$ and $C$ are **incomparable**: $C$ accepts inputs $B$ rejects, so $B \not\sqsupseteq C$; and $C$ may return a non-smallest index where $B$ must not, so $C \not\sqsupseteq B$.

The four specifications form a diamond with $A$ at the bottom and $D$ at the top:

| | weaker pre ↑ | stronger post ↑ |
|---|---|---|
| $D$ | nothing | smallest index or $-1$ |
| $B$ | `x` in `xs` | smallest index |
| $C$ | nothing | any index or $-1$ |
| $A$ | `x` in `xs` | any index |

By [[#thm-substitute]], Python's built-in `xs.index(x)` — which returns the smallest index and raises `ValueError` when `x` is absent — satisfies both $A$ and $B$, but it does not satisfy $C$ or $D$, which demand `-1` rather than an exception.
:::
:::

Condition 1 is an inclusion of sets: the set of inputs allowed by $S_1$ must lie inside the set allowed by $S_2$.

::: widget venn
sets: 2
labels: P; R
expr: P - R
caption: Let $P$ be the inputs allowed by the precondition of $S_1$ and $R$ those allowed by the precondition of $S_2$. The shaded region, $P \setminus R$, holds inputs that callers of $S_1$ may pass but that $S_2$ forbids. $S_2$ can only be substituted for $S_1$ if that region is *empty* — if $P \subseteq R$. Type `R - P` to see the inputs that $S_2$ accepts beyond what $S_1$ needs: there $S_2$ is free to promise anything.
:::

Stronger is not always better. A stronger specification is more useful to callers but harder to implement and harder to keep: every extra promise is a constraint on all future versions. Designers therefore aim for the weakest specification that serves the callers they actually have. Python's documentation, for example, promises that `sorted` is stable — a strengthening that rules out many fast sorting algorithms, adopted because stability is often needed — but it carefully promises nothing about the order in which a `set` is iterated.

## Who checks the precondition?

A function whose specification requires nothing is **total**: it must do something specified for every input. One with a non-trivial precondition is **partial**. Every partial function raises a design question: what should happen when the precondition is violated?

There are three sensible answers, and the choice is part of the design.

1. **Strengthen the specification** to make the function total, by specifying what happens on every input — typically raising an exception. `math.sqrt(-1)` raises `ValueError: math domain error`; that behaviour is documented and callers may rely on it.
2. **Check and fail fast** without changing the specification: keep the precondition, but test it with an `assert` and stop at once if it fails. The check is a debugging aid, not a promise; callers must still establish the precondition.
3. **Trust the caller**: neither check nor promise. This is the right choice when checking would be too expensive.

The third case is more common than it sounds, because checking a precondition can cost more than doing the work.

::: example The cost of checking {#ex-check-cost}
Binary search finds a value in a sorted list by repeatedly halving the range in which it can lie. Write it against an explicit precondition, and compare the cost of the search with the cost of checking the precondition.
::: solution
```python
def search(xs, x):
    """Requires: xs is sorted in non-decreasing order.
    Effects:  returns some i with xs[i] == x, or -1 if x does not occur."""
    lo, hi = 0, len(xs) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if xs[mid] < x:
            lo = mid + 1          # x, if present, is right of mid
        elif xs[mid] > x:
            hi = mid - 1          # x, if present, is left of mid
        else:
            return mid
    return -1

print(search([1, 3, 4, 7, 9], 7), search([1, 3, 4, 7, 9], 5))
print(search([9, 1, 7, 3], 9))    # precondition violated
```

```console
$ python3 search.py
3 -1
-1
```

On a sorted list of $n$ elements the loop runs at most $\lfloor \log_2 n\rfloor + 1$ times, as [[data-structures/asymptotic-analysis]] shows; for $n = 2^{20} \approx 10^6$ that is $21$ iterations. Checking sortedness, `all(xs[i] <= xs[i + 1] for i in range(len(xs) - 1))`, needs $n - 1 = 1{,}048{,}575$ comparisons — fifty thousand times more work than the search. A binary search that checked its precondition would be slower than a linear scan, which needs no precondition at all.

The last line shows the price of trusting the caller. On the unsorted list `[9, 1, 7, 3]` the search compares $9$ with $1$, $7$ and $3$, concludes each time that $9$ must lie further right, and reports `-1` although $9$ is at index $0$. A violated precondition does not necessarily crash; it can quietly produce a plausible wrong answer, which is the worst kind of failure. That is why the precondition must be written down where every caller will see it.
:::
:::

The discipline of making these decisions explicit — the caller guarantees the precondition, the callee guarantees the postcondition, and neither re-checks the other's obligations — was named **design by contract** by Bertrand Meyer, who built it into the Eiffel language in the mid-1980s with `require` and `ensure` clauses that can be checked at run time during testing and switched off in production. Python has no such clauses, but `assert` plays the same role (with the same switch: `python3 -O` removes assertions, see [[programming-1/testing-debugging]]).

::: warning Defensive programming is not a substitute for a specification
"Check everything everywhere" sounds safe but goes wrong in two ways. Checks duplicated in caller and callee drift apart as the code changes, until one rejects what the other accepts. And a function that silently "repairs" bad input — returning `0` for the square root of a negative number, say — turns a caller's bug into a wrong answer far from its cause. Decide, per function, whether a condition is a precondition (the caller's job; at most `assert` it) or part of the specified behaviour (raise a documented exception), and write the decision in the specification.
:::

### Specifications that run

Examples are an excellent supplement to a specification: they make it concrete and catch misreadings. Python's standard `doctest` module goes one step further: it finds examples written as interactive sessions in docstrings, runs them and compares the output.

```python
def clamp(x, lo, hi):
    """Requires: lo <= hi.
    Effects:  returns the element of [lo, hi] nearest to x.

    >>> clamp(5, 0, 10)
    5
    >>> clamp(-3, 0, 10)
    0
    >>> clamp(12, 0, 10)
    10
    """
    return max(lo, min(x, hi))

if __name__ == "__main__":
    import doctest
    print(doctest.testmod())
```

```console
$ python3 clamp.py
TestResults(failed=0, attempted=3)
```

The examples cannot replace the effects clause — three examples do not say what happens for `x = 7.5` — but because they are checked automatically, they cannot silently go out of date. (The test `if __name__ == "__main__"` runs the examples only when the file is executed directly, not when it is imported; [[program-design/modules-patterns]] explains it.)

## Reasoning with contracts: Hoare triples

Specifications let us reason about callers without reading callees. To check that a function's *body* meets its own specification, we need a way to reason about statements. In 1969 C. A. R. Hoare proposed a notation and a small set of rules for exactly this.

::: definition Hoare triple {#def-hoare}
A **Hoare triple** $\{P\}\ S\ \{Q\}$, where $S$ is a statement and $P$ and $Q$ are assertions about the program's variables, means: *if $S$ is executed in a state satisfying $P$, and if $S$ terminates, then the final state satisfies $Q$.* $P$ is the **precondition** and $Q$ the **postcondition** of the triple. This is **partial correctness**; **total correctness** adds the requirement that $S$ terminates whenever it starts in a state satisfying $P$.
:::

A function's specification is a triple for its body. The rules below let us establish triples piece by piece. Write $Q[e/x]$ for the assertion $Q$ with every free occurrence of the variable $x$ replaced by the expression $e$.

::: definition Rules of Hoare logic {#def-hoare-rules}
For a language with assignment, sequencing, `if` and `while` (with expressions free of side effects):

- **Assignment:** $\{Q[e/x]\}\ x = e\ \{Q\}$.
- **Sequence:** from $\{P\}\ S_1\ \{R\}$ and $\{R\}\ S_2\ \{Q\}$ infer $\{P\}\ S_1;\,S_2\ \{Q\}$.
- **Conditional:** from $\{P \land b\}\ S_1\ \{Q\}$ and $\{P \land \lnot b\}\ S_2\ \{Q\}$ infer $\{P\}$ `if b: S1 else: S2` $\{Q\}$.
- **While:** from $\{I \land b\}\ S\ \{I\}$ infer $\{I\}$ `while b: S` $\{I \land \lnot b\}$. The assertion $I$ is the **loop invariant**.
- **Consequence:** from $P' \implies P$, $\{P\}\ S\ \{Q\}$ and $Q \implies Q'$ infer $\{P'\}\ S\ \{Q'\}$.
:::

The assignment rule looks backwards at first: to know what is true *after* `x = e`, you need to have known the same thing about `e` *before*. It is correct because after the assignment, $x$ has exactly the value $e$ had. For example, $\{y + 1 > 0\}\ x = y + 1\ \{x > 0\}$. This suggests working backwards from the postcondition, computing at each statement what must be true before it.

The consequence rule is [[#def-stronger]] again: a triple stays valid if we strengthen its precondition or weaken its postcondition. Its propositional core is a tautology you can check.

::: widget truthtable
formula: ((r -> p) & (p -> q) & (q -> s)) -> (r -> s)
caption: The logic behind the rule of consequence. Read $p$ and $q$ as the pre- and postcondition of a valid triple, $r$ as a stronger precondition ($r \to p$) and $s$ as a weaker postcondition ($q \to s$). The final column is true in all sixteen rows: whenever the three premises hold, so does $r \to s$. Replace `(q -> s)` by `(s -> q)` — a *stronger* postcondition — and some rows become false: you may not promise more than the statement guarantees.
:::

::: example Swapping two variables {#ex-swap}
Prove $\{x = a \land y = b\}$ `t = x; x = y; y = t` $\{x = b \land y = a\}$, where $a$ and $b$ are fixed values (logical variables that the program does not mention).
::: solution
Work backwards from the postcondition $Q \equiv x = b \land y = a$, applying the assignment rule to each statement from the last to the first.

1. Before `y = t`, we need $Q[t/y] \equiv x = b \land t = a$.
2. Before `x = y`, we need $(x = b \land t = a)[y/x] \equiv y = b \land t = a$.
3. Before `t = x`, we need $(y = b \land t = a)[x/t] \equiv y = b \land x = a$.

By the sequence rule, $\{y = b \land x = a\}$ `t = x; x = y; y = t` $\{x = b \land y = a\}$, and the computed precondition is exactly the given one (with the conjuncts in the other order). Python's `x, y = y, x` does the same in one step: it evaluates the tuple `(y, x)` first and then assigns both names, which the multiple-assignment rule $\{Q[e_1/x, e_2/y]\}$ `x, y = e1, e2` $\{Q\}$, with simultaneous substitution, captures.
:::
:::

::: example The integer square root is correct {#ex-isqrt-proof}
Prove that the body of `isqrt` in [[#ex-isqrt]] meets its specification.
::: solution
The body is `r = 0; while (r + 1) * (r + 1) <= n: r += 1; return r`. Take as loop invariant

$$
I \equiv r \ge 0 \land r^2 \le n.
$$

*Initialisation.* By the assignment rule, $\{0 \ge 0 \land 0^2 \le n\}$ `r = 0` $\{I\}$, and $0 \ge 0 \land 0 \le n$ follows from the precondition $n \ge 0$. By consequence, $\{n \ge 0\}$ `r = 0` $\{I\}$.

*Preservation.* We need $\{I \land (r+1)^2 \le n\}$ `r += 1` $\{I\}$. By the assignment rule (`r += 1` is `r = r + 1`) the weakest precondition is $I[r+1/r] \equiv r + 1 \ge 0 \land (r+1)^2 \le n$, and this is implied by $I \land (r+1)^2 \le n$ (since $r \ge 0$ gives $r + 1 \ge 0$). So the triple holds by consequence.

*Exit.* By the while rule, after the loop $I \land \lnot\bigl((r+1)^2 \le n\bigr)$ holds, that is $r \ge 0 \land r^2 \le n < (r+1)^2$ — exactly the effects clause.

*Termination.* Hoare logic as stated gives only partial correctness, so we argue termination separately with a **variant**: the quantity $n - r^2$ is a natural number while the invariant holds, and each iteration increases $r$, so it strictly decreases $n - r^2$. A natural number cannot decrease for ever, so the loop stops, after exactly $\lfloor\sqrt n\rfloor$ iterations. This is the method of [[programming-1/control-flow]] written in Hoare's notation.
:::
:::

Hoare logic is rarely written out in full for everyday code, but its ideas are used constantly: thinking of a loop in terms of its invariant, working backwards from what you need, and recognising that a stronger precondition makes a triple easier to prove. Tools such as Dafny, Why3 and Frama-C automate the logic for real languages, a topic of [[software-engineering]] and [[programming-languages]].

::: quiz
Which precondition $P$ makes $\{P\}$ `x = 2 * x + 1` $\{x > 7\}$ valid and is as weak as possible?
- [ ] $x > 7$
- [x] $x > 3$
- [ ] $x > 4$
- [ ] $2x + 1 > 7$ is not allowed, because it mentions $x$ twice
::: solution
The assignment rule gives the weakest precondition $(x > 7)[2x+1/x] \equiv 2x + 1 > 7 \equiv x > 3$ (for integers and reals alike). The precondition $x > 7$ also works, by the consequence rule, but it is stronger than necessary; $x > 4$ likewise. There is nothing wrong with mentioning $x$ twice.
:::
:::

::: history
Programmers wrote correctness arguments for subroutines from the start: Alan Turing's three-page note "Checking a large routine" (1949) already annotates a program with assertions about its state. Robert Floyd's "Assigning meanings to programs" (1967) attached assertions to the edges of flowcharts, and C. A. R. Hoare's "An axiomatic basis for computer programming" (*Communications of the ACM*, 1969) turned them into the triples and rules used here. The year before, Edsger Dijkstra's letter "Go To Statement Considered Harmful" (*CACM*, 1968) had argued that unrestricted jumps make such reasoning impractical, which helped push languages towards the structured `if` and `while` that Hoare's rules describe; Dijkstra's weakest preconditions (1975) made "work backwards from the postcondition" a calculus. David Parnas's "A technique for software module specification with examples" (*CACM*, 1972) applied specifications to whole modules, Barbara Liskov and John Guttag's *Abstraction and Specification in Program Development* (1986) made requires/modifies/effects a teaching standard, and Bertrand Meyer named design by contract and built it into Eiffel (described in his *Object-Oriented Software Construction*, 1988).
:::

## Where this leads

Specifications are the thread through this course. [[program-design/abstract-data-types]] specifies whole types rather than single functions, with a representation invariant playing the role of a loop invariant for data. [[program-design/classes-objects]] packages those types as classes, [[program-design/inheritance-polymorphism]] applies [[#thm-substitute]] to subclasses (the Liskov substitution principle), and [[program-design/types-interfaces]] lets a type checker verify the simplest part of every specification — the types — before the program runs. In [[software-engineering]] specifications scale up to requirements and interfaces between teams, and formal verification mechanises the Hoare logic of the last section.

::: summary
- **Abstraction by specification** lets callers use a function through its specification alone, giving **locality** (check one part at a time) and **modifiability** (reimplement without breaking callers) ([[#def-abstraction]]).
- A specification has **requires**, **modifies** and **effects** clauses; a missing modifies clause promises that nothing changes ([[#def-spec]]).
- Prefer **declarative** specifications (properties of the result) to operational ones; **underdetermined** specifications leave implementers freedom, and tests must not assume more than is promised.
- $S_2$ is **stronger** than $S_1$ if it requires no more and promises no less; implementations of a stronger specification can replace those of a weaker one ([[#def-stronger]], [[#thm-substitute]]).
- Violated preconditions may produce plausible wrong answers; decide per condition whether to document an exception, `assert` it, or trust the caller when checking costs too much (binary search).
- A **Hoare triple** $\{P\}\,S\,\{Q\}$ states partial correctness; the assignment rule works backwards by substitution, the while rule needs a loop invariant, and termination needs a separate variant ([[#def-hoare-rules]]).
:::

## Exercises

::: exercise Write the specification {level=1}
Write requires, modifies and effects clauses for (a) a function `average(xs)` returning the arithmetic mean of a list of numbers; (b) a method-like function `push_all(stack, items)` that appends every element of `items` to the list `stack`; (c) a function `parse_int(s)` that converts a string of decimal digits to an integer and raises `ValueError` for anything else.
::: solution
(a) Requires: `xs` is a non-empty list of numbers. Effects: returns `sum(xs) / len(xs)`. (Alternatively, require nothing and specify that `ValueError` is raised for an empty list — a stronger, total specification.)

(b) Modifies: `stack`. Effects: $stack_{\text{post}}$ is $stack_{\text{pre}}$ followed by the elements of `items` in order; `items` is unchanged (it is not in the modifies clause, so this is implied, but saying it helps readers).

(c) Requires: nothing. Effects: if `s` is a non-empty string consisting only of the characters `0`–`9`, returns the integer it denotes in base 10; otherwise raises `ValueError`. (Specifying behaviour on every string makes the function total.)
:::
:::

::: exercise Which are stronger? {level=1 check="2"}
Let $S$ be: requires `n > 0`; returns an integer `k` with `k >= n`. Consider: (i) requires `n > 0`, returns `n`; (ii) requires `n > 10`, returns `n + 1`; (iii) requires nothing, returns `abs(n) + 1`; (iv) requires `n > 0`, returns an integer `k` with `k >= n - 1`. How many of (i)–(iv) are stronger than $S$? (Enter the number.)
::: solution
(i) Same precondition; returning `n` satisfies `k >= n`. Stronger.
(ii) Its precondition `n > 10` is *stronger* than `n > 0` (it rejects `n = 5`, which $S$ allows), so condition 1 fails. Not stronger.
(iii) Requires nothing, which every precondition implies; for `n > 0`, `abs(n) + 1 = n + 1 >= n`. Stronger.
(iv) Same precondition, but `k = n - 1` is allowed by (iv) and not by $S$, so condition 2 fails. Not stronger.
Two of the four, (i) and (iii).
:::
:::

::: exercise Working backwards {level=1 check="7"}
Use the assignment and sequence rules to compute the weakest precondition of `x = x + 3; y = 2 * x` for the postcondition $y = 20$. For which value of $x$ does it hold? (Enter that value.)
::: solution
Before `y = 2 * x` we need $(y = 20)[2x/y] \equiv 2x = 20 \equiv x = 10$. Before `x = x + 3` we need $(x = 10)[x+3/x] \equiv x + 3 = 10 \equiv x = 7$. So the weakest precondition is $x = 7$.
:::
:::

::: exercise A swap without a temporary {level=2}
Prove with Hoare's rules that, for integers, $\{x = a \land y = b\}$ `x = x + y; y = x - y; x = x - y` $\{x = b \land y = a\}$. Why does the same argument fail for Python floats?
::: solution
Work backwards from $Q \equiv x = b \land y = a$.
Before `x = x - y`: $x - y = b \land y = a$.
Before `y = x - y`: $x - (x - y) = b \land x - y = a$, i.e. $y = b \land x - y = a$.
Before `x = x + y`: $y = b \land (x + y) - y = a$, i.e. $y = b \land x = a$.
This is the given precondition, so the triple holds by the sequence rule. The algebra used $(x + y) - y = x$ and $x - (x - y) = y$, which hold for Python's unbounded integers. For floats, addition rounds: with `x = 1e16` and `y = 1.0`, `x + y` is `1e16` again, so the program ends with `y == 1e16` and `x == 0.0`, not the swap ([[computer-systems/floating-point]]). Rules of Hoare logic are only as good as the algebra of the data they reason about.
:::
:::

::: exercise Tests that say too much {level=2}
For the underdetermined specification of `index_of` above, a colleague writes the tests `assert index_of([4, 4], 4) == 0` and `assert index_of([1, 2, 3], 3) == 2`. Which test is legitimate? Rewrite the other so that it checks exactly what the specification promises, and explain what would happen to the original if `index_of` were replaced by `index_of_from_end`.
::: solution
The second test is legitimate: `3` occurs only at index `2`, so the specification determines the result. The first over-specifies, since both `0` and `1` are acceptable. A correct version is

```python
i = index_of([4, 4], 4)
assert i in (0, 1)
```

or, more generally, `xs = [4, 4]; assert xs[index_of(xs, 4)] == 4`. With `index_of_from_end` the original first test fails although the new function meets the specification — a false alarm that would push developers to "fix" a correct function or, worse, to strengthen the specification without anyone deciding to.
:::
:::

::: exercise What does checking cost? {level=2 check="1048575"}
A binary search on a sorted list of $n = 2^{20}$ elements, as in [[#ex-check-cost]], is guarded by `assert all(xs[i] <= xs[i + 1] for i in range(len(xs) - 1))`. How many comparisons of elements does the assertion make when the list is in fact sorted? (Enter the number.) Is it reasonable to leave this assertion in a test build? In a production build?
::: solution
The generator compares each of the $n - 1$ adjacent pairs once; `all` stops early only on a failure, so for a sorted list it makes $n - 1 = 2^{20} - 1 = 1{,}048{,}575$ comparisons, against at most $21$ for the search itself. In a test build, where catching misuse matters more than speed, it can be acceptable (some projects check expensive invariants on a sample of calls). In production it destroys the point of binary search; run with `python3 -O`, which removes it, or delete it and document the precondition.
:::
:::

::: exercise Refinement is a preorder {level=3}
Prove that the relation $\sqsupseteq$ of [[#def-stronger]] is reflexive ($S \sqsupseteq S$) and transitive (if $S_3 \sqsupseteq S_2$ and $S_2 \sqsupseteq S_1$ then $S_3 \sqsupseteq S_1$). Give two different specifications $S \ne T$ with $S \sqsupseteq T$ and $T \sqsupseteq S$, showing that it is not antisymmetric.
::: solution
*Reflexive.* $P_S(x) \implies P_S(x)$ for all $x$, and $Q_S(x,y) \implies Q_S(x,y)$ for all $x$ and $y$.

*Transitive.* Condition 1: $P_{S_1}(x) \implies P_{S_2}(x) \implies P_{S_3}(x)$. Condition 2: let $x$ satisfy $P_{S_1}$ and suppose $Q_{S_3}(x, y)$. By condition 1 for $S_2 \sqsupseteq S_1$, $x$ satisfies $P_{S_2}$, so $S_3 \sqsupseteq S_2$ (condition 2) gives $Q_{S_2}(x, y)$, and then $S_2 \sqsupseteq S_1$ gives $Q_{S_1}(x, y)$. Note that we needed $P_{S_2}(x)$ to apply the second step: condition 2 of $S_3 \sqsupseteq S_2$ only speaks about inputs allowed by $S_2$.

*Not antisymmetric.* Let $S$ be "requires $n \ge 0$; returns $n$" and $T$ be "requires $n \ge 0$; returns $n$, and returns $0$ if $n < 0$". They are different as pairs (their postconditions differ for negative $n$), yet each refines the other, because the difference lies entirely outside the common precondition. Refinement compares specifications only on the inputs that matter, so it is a preorder, and two specifications are *equivalent* when each refines the other.
:::
:::

::: exercise A faster square root {#exr-isqrt-fast level=3}
Reimplement `isqrt` from [[#ex-isqrt]] so that it takes $O(\log n)$ iterations, by binary search for $r$ in the range $[0, n+1)$. State the loop invariant, and check your function with `meets_spec` on every $n < 10^5$ and on $n = 10^{40}$.
::: hint
Maintain $lo^2 \le n < hi^2$ and halve $hi - lo$ until $hi = lo + 1$.
:::
::: solution
```python
def isqrt(n):
    """Requires: n is an int and n >= 0.
    Effects:  returns the int r with r * r <= n < (r + 1) * (r + 1)."""
    lo, hi = 0, n + 1                  # invariant: lo*lo <= n < hi*hi
    while hi - lo > 1:
        mid = (lo + hi) // 2           # lo < mid < hi
        if mid * mid <= n:
            lo = mid
        else:
            hi = mid
    return lo

def meets_spec(n, r):
    return isinstance(r, int) and r * r <= n < (r + 1) * (r + 1)

print(all(meets_spec(n, isqrt(n)) for n in range(100_000)))
print(isqrt(10**40), meets_spec(10**40, isqrt(10**40)))
```

```console
$ python3 isqrt2.py
True
100000000000000000000 True
```

*Invariant* $I \equiv 0 \le lo < hi \land lo^2 \le n < hi^2$. It holds initially, since $0 \le n < (n+1)^2$. If $hi - lo > 1$ then $lo < mid < hi$; the branch keeps $I$ by setting whichever endpoint the test on $mid^2 \le n$ allows. On exit $hi = lo + 1$, so $I$ becomes $lo^2 \le n < (lo + 1)^2$, the effects clause. The variant $hi - lo$ roughly halves each time, so there are about $\log_2(n+1)$ iterations: $133$ for $n = 10^{40}$, compared with $10^{20}$ for the counting version. Callers of `isqrt` cannot tell the difference except by speed — modifiability at work. (Python's standard library has this function as `math.isqrt`.)
:::
:::
