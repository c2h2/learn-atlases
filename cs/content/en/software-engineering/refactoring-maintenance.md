The library's fines system was written eight years ago by someone who has since left. It works — mostly — and nobody wants to touch it. Now the library wants a new rule: audiobooks are fined like DVDs but capped at £15. The function that computes fines is twenty lines of nested `if` statements that also format the printed report; there are no tests; and the last person who changed it introduced a bug that charged children double for a month. The change itself is one line. Finding where the line goes, being sure nothing else breaks, and leaving the code no worse for the next person is the real work.

Most of the life of a successful program is spent being changed. This chapter is about doing that well: what **maintenance** consists of and why software decays, **refactoring** — improving the structure of code without changing its behaviour, in small verified steps — the **code smells** that suggest where to refactor, **characterisation tests** and other techniques for **legacy code** that has no tests, measuring complexity and finding **hotspots**, and the metaphor of **technical debt** with its uses and limits. The testing of [[software-engineering/testing]] and the principles of [[software-engineering/design-principles]] are the tools; this chapter is about applying them to code that already exists.

## Maintenance and evolution

::: definition Kinds of maintenance {#def-maintenance}
**Software maintenance** is the modification of a software product after delivery. It is conventionally divided into **corrective** maintenance (fixing faults), **adaptive** maintenance (keeping the software working in a changed environment — a new operating system, library version, regulation or data format), **perfective** maintenance (adding features and improving performance or usability in response to users), and **preventive** maintenance (changes that make future maintenance easier, such as refactoring and adding tests).
:::

E. Burton Swanson proposed the first three categories in 1976; the fourth came later and appears in the international standard for maintenance, ISO/IEC 14764. The surprising fact, repeated in survey after survey since Lientz and Swanson's studies of the late 1970s, is that corrective work is the *smaller* part: most maintenance effort goes into adapting and enhancing systems that users want to do more. Precise percentages vary with how "maintenance" is defined, and the often-quoted claim that maintenance is "60–90% of total cost" has no single solid source, but the direction is consistent: successful software is changed for much longer than it takes to write.

Meir Lehman and László Belady studied the evolution of IBM's OS/360 and other large systems over many releases and formulated **laws of software evolution** (Lehman, "Programs, life cycles, and laws of software evolution", *Proceedings of the IEEE*, 1980). They are empirical generalisations about long-lived systems embedded in the real world, not theorems. The first two are the most quoted. **Continuing change**: such a program must be continually adapted, or it becomes progressively less satisfactory — because the world it models changes. **Increasing complexity**: as it is changed, its complexity increases unless work is done to maintain or reduce it. Later work has confirmed the first law widely and found the others hold for some systems and not for others; open-source projects, for instance, sometimes grow faster than Lehman's models predicted.

The second law describes **software decay**: each change made in a hurry, without regard to the design, adds a special case, a duplicated rule, a dependency in the wrong direction. No single change ruins the design; their accumulation does. Refactoring is the work that counteracts it.

## Refactoring

::: definition Refactoring {#def-refactoring}
A **refactoring** is a change to the internal structure of software that preserves its **observable behaviour**: for every input satisfying the specification's precondition, the outputs and externally visible effects are the same before and after. To **refactor** is to apply a sequence of such changes, each small enough to check, typically by running the tests after every step.
:::

Martin Fowler's catalogue, *Refactoring* (1999; second edition, with examples in JavaScript, 2018), names some sixty refactorings with their mechanics: **Extract Function** (turn a fragment into a named function), **Inline Function** (the reverse), **Rename Variable**, **Move Function** (to the module whose data it uses most), **Introduce Parameter Object** (group parameters that always travel together), **Replace Conditional with Polymorphism**, **Split Phase** (separate a computation into a calculation and a presentation), **Replace Magic Literal** with a named constant. Most are mechanical enough that modern editors perform them automatically.

What "observable" means must be decided. Usually it is the specification's notion: return values, exceptions, output, writes to files and databases. Running time, memory use and the order of log messages are usually *not* observable — if they are part of the specification (a real-time system, say), then a "refactoring" that changes them is a behaviour change.

::: proposition Refactorings compose {#prop-refactor-compose}
If each step of a sequence $P_0 \to P_1 \to \dots \to P_n$ is a refactoring with respect to the same specification, then $P_0 \to P_n$ is a refactoring.
:::

::: proof
Write $P \approx Q$ when $P$ and $Q$ have the same observable behaviour on every input satisfying the precondition. This is an equivalence relation: reflexive and symmetric by definition, and transitive because if $P$ and $Q$ agree on every valid input, and $Q$ and $R$ agree on every valid input, then $P$ and $R$ agree on every valid input. By induction on $n$, $P_0 \approx P_n$.
:::

The proposition is simple, but it is the logic behind the method: a large restructuring that would be impossible to verify as a whole is safe if it is a chain of small steps each of which is verified. The verification is usually by tests, which sample the behaviour rather than prove equivalence; each step is kept small precisely so that the tests have a good chance of catching a mistake, and so that a failing test points to the step that caused it ([[software-engineering/version-control]] makes it cheap to commit after every green step and to go back).

Automated refactorings are safe only when their **preconditions** hold, which William Opdyke's 1992 doctoral thesis, the first systematic study of refactoring, made explicit. Renaming a local variable `total` to `t` is behaviour-preserving only if no other variable named `t` is visible where `total` is used — otherwise references are **captured** and the meaning changes. Extracting a fragment into a function requires that the fragment's assignments to local variables be returned or passed back.

::: warning "Refactoring" is not "rewriting"
The word is often used for any large change to code — "we're refactoring the payment system" meaning "we are rewriting it for three months". That is a redesign, perhaps a good one, but it lacks what makes refactoring safe: small steps that keep the system working and tested at every point. A change that alters behaviour, even to fix a bug you noticed on the way, is not a refactoring; do it as a separate step, with its own test, so that if something breaks you know which kind of change caused it. Kent Beck's image is of two hats: when you are refactoring you do not add function, and when you add function you do not restructure.
:::

### Code smells

Where should one refactor? Kent Beck and Martin Fowler called the symptoms of trouble **code smells** — not bugs, but signs that a design will resist change. A few of the commonest, with typical remedies:

| smell | symptom | typical refactorings |
|---|---|---|
| Long function | a function that needs comments to explain its sections | Extract Function, Split Phase |
| Duplicated code | the same rule written in several places ([[software-engineering/design-principles]]) | Extract Function, Move Function |
| Long parameter list | many parameters, some always passed together | Introduce Parameter Object |
| Divergent change | one module changed for many different reasons | split by responsibility |
| Shotgun surgery | one kind of change touches many modules | Move Function to gather the rule |
| Feature envy | a function that uses another module's data more than its own | Move Function |
| Repeated switches | the same `if`/`elif` chain on a type code in several places | Replace Conditional with Polymorphism or a table |
| Primitive obsession | money as floats, dates as strings, codes as bare ints | introduce small value types |
| Mysterious name | `d`, `f`, `t`, `process`, `data2` | Rename |

## Refactoring in practice

### Pin down the current behaviour first

Code without tests cannot be refactored safely, because there is nothing to tell you whether behaviour has been preserved. Michael Feathers, in *Working Effectively with Legacy Code* (2004), defined **legacy code** as simply code without tests, and gave the standard first move.

::: definition Characterisation test {#def-characterisation}
A **characterisation test** records what a piece of code *actually does*, rather than what a specification says it should do: run the code on chosen inputs, capture its outputs, and make those outputs the test's expected values. Its purpose is to detect *any* change in behaviour during refactoring; where the recorded behaviour looks wrong, it is flagged for a decision but not changed during the refactoring.
:::

::: example A characterisation test {#ex-characterise}
Here is the fines function. Write a characterisation test for it.

```python
def report(loans, today):
    out = "Overdue items\n"
    t = 0
    for l in loans:
        d = today - l["due"]
        if d > 0:
            if l["kind"] == "book":
                f = d * 0.25
                if f > 10:
                    f = 10
            elif l["kind"] == "dvd":
                f = d * 1.0
                if f > 20:
                    f = 20
            else:
                f = d * 0.10
            if l["member"] == "child":
                f = f / 2
            t = t + f
            out += "  " + l["title"] + ": " + str(d) + " days, " + "%.2f" % f + "\n"
    out += "Total: " + "%.2f" % t + "\n"
    return out
```

::: solution
Choose inputs that exercise every branch — a book, a DVD, another kind, a child member, an item not yet due — and include a value that hits a cap. Run the code, check the output against what the librarians say the rules are, and paste it into the test. The test imports whichever version of the module the environment variable `FINES` names, so that the same test can be run against every step of the refactoring:

```python
import importlib, os
fines = importlib.import_module(os.environ.get("FINES", "fines_v0"))

LOANS = [
    {"title": "Dune", "kind": "book", "due": 100, "member": "adult"},
    {"title": "Alien", "kind": "dvd", "due": 95, "member": "adult"},
    {"title": "Gruffalo", "kind": "book", "due": 60, "member": "child"},
    {"title": "Nature", "kind": "magazine", "due": 98, "member": "adult"},
    {"title": "Emma", "kind": "book", "due": 120, "member": "adult"},   # not yet due
]

def test_characterise_report():
    # Characterisation test: the expected text is what the code produced on
    # 2026-03-10, checked by hand against the library's fine rules.
    assert fines.report(LOANS, today=110) == (
        "Overdue items\n"
        "  Dune: 10 days, 2.50\n"
        "  Alien: 15 days, 15.00\n"
        "  Gruffalo: 50 days, 5.00\n"
        "  Nature: 12 days, 1.20\n"
        "Total: 23.70\n")
```

```console
$ FINES=fines_v0 pytest -q test_fines.py
.                                                                        [100%]
1 passed in 0.11s
```

Writing the test surfaced two facts worth asking about. A child's 50-day overdue book is fined £5.00: £12.50 is first capped at £10 and *then* halved; is that the rule, or should the discount be applied first (£6.25, which is under the cap)? And magazines have no cap at all: a magazine a year overdue costs £36.50. The characterisation test preserves both behaviours exactly; whether to change them is a requirements question ([[software-engineering/requirements]]), answered separately.
:::
:::

### Small steps

::: example Refactoring the fines report {#ex-refactor-steps}
Refactor `report` in three steps — extract the fine calculation, replace the conditional with a table, and split calculation from presentation — running the characterisation test after each.
::: solution
*Step 1: Extract Function.* Move the fine computation into `fine(loan, days)`; `report` calls it. Only names change: `l` becomes `loan` inside the new function.

```python
def fine(loan, days):
    if loan["kind"] == "book":
        f = days * 0.25
        if f > 10:
            f = 10
    elif loan["kind"] == "dvd":
        f = days * 1.0
        if f > 20:
            f = 20
    else:
        f = days * 0.10
    if loan["member"] == "child":
        f = f / 2
    return f
```

*Step 2: Replace Conditional with a table, and name the magic numbers.* Each branch has the same shape — a rate per day and a cap — so the rule becomes data:

```python
# kind -> (fine per day, maximum fine); kinds not listed use DEFAULT_RATE
RATES = {"book": (0.25, 10.0), "dvd": (1.0, 20.0)}
DEFAULT_RATE = (0.10, float("inf"))
CHILD_DISCOUNT = 0.5

def fine(loan, days):
    per_day, cap = RATES.get(loan["kind"], DEFAULT_RATE)
    f = min(days * per_day, cap)
    return f * CHILD_DISCOUNT if loan["member"] == "child" else f
```

Is this step really behaviour-preserving? `min(x, 10.0)` equals the old `if f > 10: f = 10` for every float `x`; an infinite cap reproduces "no cap"; and multiplying by $0.5$ gives exactly the same float as dividing by $2$, since both only change the exponent ([[computer-systems/floating-point]]). The test agrees.

*Step 3: Split Phase.* Separate *what is owed* from *how it is printed*:

```python
def overdue(loans, today):
    """Phase 1, calculation: (title, days overdue, fine) for each overdue loan."""
    for loan in loans:
        days = today - loan["due"]
        if days > 0:
            yield loan["title"], days, fine(loan, days)

def report(loans, today):
    """Phase 2, presentation: format the calculated rows as text."""
    rows = list(overdue(loans, today))
    lines = ["Overdue items"]
    lines += [f"  {title}: {days} days, {amount:.2f}" for title, days, amount in rows]
    lines.append(f"Total: {sum(amount for _, _, amount in rows):.2f}")
    return "\n".join(lines) + "\n"
```

The test after each step:

```console
$ for v in v0 v1 v2 v3; do FINES=fines_$v pytest -q test_fines.py | tail -1; done
1 passed in 0.11s
1 passed in 0.14s
1 passed in 0.12s
1 passed in 0.14s
```

Now the requested change — audiobooks at £1 a day capped at £15 — is one line, `"audiobook": (1.0, 15.0)` in `RATES`, and a test for it. The calculation can be tested without parsing text, and a second presentation (an HTML page, an e-mail) can reuse `overdue`. Each step was small enough to check by reading; together, by [[#prop-refactor-compose]], they preserve the behaviour pinned down by the test — to the extent that the test samples it.
:::
:::

## Measuring complexity

Thomas McCabe proposed measuring a function's complexity by the structure of its control-flow graph ("A complexity measure", *IEEE TSE*, 1976).

::: definition Cyclomatic complexity {#def-cyclomatic}
For a control-flow graph with $E$ edges, $N$ nodes and $P$ connected components (one per function), the **cyclomatic complexity** is $V = E - N + 2P$. For a single function, $P = 1$ and $V = E - N + 2$.
:::

$V$ is the number of linearly independent paths through the graph, so it is also the number of tests needed for one form of path coverage (McCabe's **basis-path testing**), and a lower bound on the tests needed for branch coverage of all independent paths. It is easiest to compute from the code.

::: proposition Complexity counts decisions {#prop-cyclomatic}
For a function built from simple statements by sequencing, `if` (with or without `else`) and `while`, with one entry and one exit, $V = d + 1$, where $d$ is the number of binary decisions (the conditions of its `if` and `while` statements).
:::

::: proof
By induction on the structure of the code, building each construct's graph from its parts' graphs, each with a single entry and a single exit node. Write $V(X) = E_X - N_X + 2$.

*Simple statement:* one node, no edges, $V = 0 - 1 + 2 = 1$, and $d = 0$.

*Sequence $X; Y$:* the graphs are joined by one edge from $X$'s exit to $Y$'s entry, so $E = E_X + E_Y + 1$, $N = N_X + N_Y$ and $V = V(X) + V(Y) - 1 = (d_X + 1) + (d_Y + 1) - 1 = d_X + d_Y + 1$.

*`if` $c$ `then` $X$ `else` $Y$:* add a decision node and a join node, with edges decision → $X$, decision → $Y$, $X$ → join, $Y$ → join: $E = E_X + E_Y + 4$, $N = N_X + N_Y + 2$, so $V = V(X) + V(Y) = d_X + d_Y + 2$, which is $d + 1$ with $d = d_X + d_Y + 1$. Without `else`, the edge decision → $Y$ → join is replaced by one edge decision → join: $E = E_X + 3$, $N = N_X + 2$, $V = V(X) + 1 = d_X + 2$.

*`while` $c$ `do` $X$:* add a decision node and an exit node, with edges decision → $X$, $X$ → decision, decision → exit: $E = E_X + 3$, $N = N_X + 2$, $V = V(X) + 1 = d_X + 2$.

In every case $V = d + 1$, completing the induction.
:::

A `for` loop is a `while` loop in disguise and counts as a decision; each `and`/`or` adds a decision too, because short-circuit evaluation ([[programming-1/values-types#def-short-circuit]]) gives it its own branch.

::: example Complexity before and after {#ex-complexity}
Write a tool that computes the cyclomatic complexity of every top-level function in a file, and apply it to the four versions of the fines module from [[#ex-refactor-steps]].
::: solution
Python's `ast` module gives the syntax tree, in which decisions are nodes of known types:

```python
import ast, sys

DECISIONS = (ast.If, ast.For, ast.While, ast.IfExp, ast.comprehension, ast.ExceptHandler)

def cyclomatic(func):
    """McCabe complexity: 1 + number of decision points (each extra and/or counts)."""
    v = 1
    for node in ast.walk(func):
        if isinstance(node, DECISIONS):
            v += 1
        elif isinstance(node, ast.BoolOp):
            v += len(node.values) - 1
    return v

if __name__ == "__main__":
    for path in sys.argv[1:]:
        tree = ast.parse(open(path).read())
        funcs = [n for n in tree.body if isinstance(n, ast.FunctionDef)]
        print(path.ljust(12), ", ".join(f"{f.name}={cyclomatic(f)}" for f in funcs))
```

```console
$ python3 complexity.py fines_v0.py fines_v1.py fines_v2.py fines_v3.py
fines_v0.py  report=8
fines_v1.py  fine=6, report=3
fines_v2.py  fine=2, report=3
fines_v3.py  fine=2, overdue=3, report=3
```

The original `report` has seven decisions — the loop, `d > 0`, the book and DVD tests, two cap tests, the child test — so $V = 8$. Extracting `fine` divides it into pieces of 6 and 3; the table removes four decisions from `fine` altogether, because the variation moved into data. (In the last version, the two comprehensions in `report` count as decisions, as most tools count them.) McCabe suggested splitting functions with $V > 10$; like all such thresholds, it is a convention, not a finding.
:::
:::

::: widget graph
nodes: kind@0,1; book@1,0; cap10@2,0; dvd@1,2; cap20@2,2; set20@3,3; set10@3,0; other@2,3.6; child@4,1; halve@5,0; ret@6,1
edges: kind>book; kind>dvd; book>cap10; cap10>set10; cap10>child; set10>child; dvd>cap20; dvd>other; cap20>set20; cap20>child; set20>child; other>child; child>halve; child>ret; halve>ret
algorithm: dfs
start: kind
caption: The control-flow graph of `fine` after step 1 of [[#ex-refactor-steps]]: decision nodes `kind` (is it a book?), `dvd`, `cap10`, `cap20` and `child`, and statement nodes for the assignments. Count: 11 nodes and 15 edges, so $V = 15 - 11 + 2 = 6$, and there are 5 decisions, as [[#prop-cyclomatic]] says. Step through depth-first search to explore the graph. There are 10 complete paths from `kind` to `ret`, but only 6 *linearly independent* ones: every path is a combination of a basis of 6, which is what $V$ counts. After step 2 the whole graph collapses to a single decision.
:::

### Where to start: hotspots

A large legacy system has more smells than anyone could fix. Adam Tornhill (*Your Code as a Crime Scene*, 2015) popularised combining two measures to choose: complexity, which says how hard code is to change, and **change frequency** from the version history, which says how often people have to. A complex module nobody touches costs little; a simple one changed daily costs little; a complex one changed often — a **hotspot** — is where refactoring pays. Studies of defect prediction have long found that measures of change history, such as the number of recent changes and of distinct authors, are among the stronger predictors of where faults will appear (for example, Nagappan and Ball, "Use of relative code churn measures to predict system defect density", ICSE 2005, on Windows Server 2003), which supports the heuristic, though the strength of such predictions varies between projects.

### Legacy code at scale

Feathers's book is largely about the problem of getting legacy code into a test harness at all: a class that opens a database connection in its constructor cannot be instantiated in a test. His answer is to find **seams** — places where behaviour can be altered without editing the code there, such as a parameter that can be passed a fake, or a function that can be overridden in a test subclass — and, when there are none, to make one with the smallest possible change (dependency inversion again, [[software-engineering/design-principles#ex-dip]]).

::: example Creating a seam {#ex-seam}
A legacy class connects to the production database in its constructor, so it cannot be tested. Make the smallest change that lets a test run it against a throwaway database, and write the test.

```python
import sqlite3

class MemberReport:
    def __init__(self):
        self.conn = sqlite3.connect("/srv/library/members.db")

    def overdue_counts(self):
        rows = self.conn.execute(
            "SELECT member, COUNT(*) FROM loans WHERE returned = 0 GROUP BY member")
        return dict(rows.fetchall())
```
::: solution
Turn the hard-coded path into a parameter whose default is the old value. Every existing caller, which passes nothing, behaves exactly as before — the change is a refactoring — but a test can now pass SQLite's special name `":memory:"` for a fresh, empty database:

```python
import sqlite3

class MemberReport:
    def __init__(self, db_path="/srv/library/members.db"):   # the seam: a parameter
        self.conn = sqlite3.connect(db_path)

    def overdue_counts(self):
        rows = self.conn.execute(
            "SELECT member, COUNT(*) FROM loans WHERE returned = 0 GROUP BY member")
        return dict(rows.fetchall())
```

```python
from members import MemberReport

def test_overdue_counts_ignores_returned_loans():
    report = MemberReport(":memory:")          # an empty in-memory database
    report.conn.executescript("""
        CREATE TABLE loans (member TEXT, title TEXT, returned INTEGER);
        INSERT INTO loans VALUES ('ada', 'Dune', 0), ('ada', 'Emma', 0),
                                 ('bo', 'Alien', 1), ('bo', 'Nature', 0);
    """)
    assert report.overdue_counts() == {"ada": 2, "bo": 1}
```

```console
$ pytest -q test_members.py
.                                                                        [100%]
1 passed in 0.14s
```

The test reaches into `report.conn` to create the table, which couples it to the class's internals; that is acceptable as a first foothold. With the class now under test, later refactorings can pass in a connection or an `OrderStore`-like interface instead of a path, and the test can stop touching internals. (The SQL itself is the subject of [[databases/sql]].)
:::
:::

For new behaviour in untested code he suggests **sprouting**: write the new logic as a new, tested function, and call it from the legacy code with a one-line change.

For replacing a whole legacy system, the safest known strategy is gradual. Martin Fowler named it the **strangler fig** pattern (2004), after a vine that grows around a tree until it can stand alone: put a routing layer in front of the old system, implement one feature at a time in a new system, route that feature's traffic to it, and retire the old code piece by piece. Each step is small, reversible and running in production. The alternative, a "big bang" rewrite that replaces everything at once, has a poor reputation in practitioner literature, because the old system's undocumented behaviour — the special cases accumulated over years — is rediscovered only after the switch.

::: quiz
A team must change a 2,000-line function with no tests. Which first step is the safest?
- [ ] Rewrite the function from the specification, which is probably more correct than the code.
- [ ] Refactor it into smaller functions, reading carefully, and then write tests.
- [x] Write characterisation tests through its existing interface, then refactor in small steps.
- [ ] Make the change and rely on the users to report any problems.
::: solution
Characterisation tests pin down current behaviour, including the undocumented parts users depend on, so that each refactoring step can be checked. Rewriting from the specification discards exactly those parts; refactoring before testing has nothing to check against; and users are an expensive, slow test suite.
:::
:::

## Technical debt

Ward Cunningham introduced the **technical debt** metaphor in an experience report at OOPSLA 1992, about a financial application: shipping code that reflects an incomplete understanding is like borrowing money — it can speed development, provided the debt is repaid promptly by revising the code as understanding improves; the danger is that unrepaid debt accumulates **interest**, in the form of every later change being slower. The metaphor has been stretched to cover any imperfection in code, and Martin Fowler's "technical debt quadrant" (2009) separates debt taken **deliberately** ("we must ship now and will deal with the consequences") from **inadvertently** ("now we know how we should have done it"), and **prudently** from **recklessly** ("we don't have time for design"). Only prudent, deliberate debt is a business decision; the rest is a description of how the code got that way.

A toy model shows why interest matters. Suppose each change costs $c$ units of work plus $k$ units for every unit of accumulated debt $D$, and each change made without cleaning up adds $\delta$ to the debt. After $n$ such changes the debt is $(n - 1)\delta$ before the $n$-th change, and the total cost is
$$
\sum_{j=0}^{n-1} (c + k j \delta) = n c + k \delta \,\frac{n (n-1)}{2},
$$ {#eq-debt}
quadratic in $n$. A team that spends an extra $r$ per change on refactoring, keeping the debt constant at zero, pays $n(c + r)$: linear. The quadratic eventually overtakes the linear, at $n \approx 2r/(k\delta) + 1$; before that, not refactoring is cheaper. The model is a caricature — real debt is not uniform and its interest is paid only where code is changed, which is the argument for hotspots — but it explains both why skipping clean-up looks rational in the short term and why it fails in the long term.

::: widget plot
f: x*c + k*d*x*(x - 1)/2; x*(c + r)
x: 0, 100
y: 0, 600
sliders: c=1:0.5:5:2; k=0:0.01:0.5:0.1; d=0:0.1:2:0.5; r=0:0.1:3:0.5
labels: \text{no clean-up: } nc + k\delta n(n-1)/2; \text{refactor each change: } n(c + r)
caption: The toy debt model [[#eq-debt]]: cumulative cost (vertical) after $n$ changes (horizontal), with base cost $c$ per change, interest $k$ per unit of debt, debt $\delta$ (`d`) added per unclean change, and refactoring overhead $r$. With the defaults the curves cross at $n = 2r/(k\delta) + 1 = 21$. Set $k$ near zero — code that is never touched again — and clean-up never pays; raise $\delta$ and it pays almost immediately. This is an illustration of the metaphor, not a calibrated model of any project.
:::

How large is technical debt in practice? Measurement is hard, because "debt" is defined by comparison with a better design that does not exist. Surveys give an impression rather than a number: Besker, Martini and Bosch (*Journal of Systems and Software*, 2019), combining a survey and developers' own logs, reported that developers estimated they wasted on average about 23% of their working time because of technical debt. Self-reported estimates of wasted time should be read cautiously, but they indicate that the cost is perceived as substantial and continuous rather than occasional.

::: history
E. Burton Swanson's 1976 paper "The dimensions of maintenance" introduced the corrective/adaptive/perfective classification, and Lehman and Belady's studies of OS/360 led to Lehman's laws, collected in his 1980 paper. Thomas McCabe published cyclomatic complexity in 1976. William Opdyke's 1992 thesis at the University of Illinois, supervised by Ralph Johnson, gave the first formal treatment of refactorings and their preconditions, and the Smalltalk Refactoring Browser of John Brant and Don Roberts (1997) automated them. Ward Cunningham coined "technical debt" in 1992. Martin Fowler's *Refactoring* (1999, with Kent Beck's chapter on smells; second edition 2018) and Michael Feathers's *Working Effectively with Legacy Code* (2004) made the practices mainstream, and today automated refactorings are standard in programming editors.
:::

## Where this leads

Refactoring is only as safe as the tests behind it ([[software-engineering/testing]]); when tests are not enough, proofs of equivalence and static analysis ([[software-engineering/verification]]) can help, and compilers perform behaviour-preserving transformations of exactly this kind, with proofs, in [[compilers/dataflow-optimisation]]. The design principles that refactoring moves code towards are in [[software-engineering/design-principles]], and the evolution of whole systems — migrating services one at a time — in [[software-engineering/software-architecture]].

::: summary
- Most effort on successful software goes into changing it after delivery — corrective, adaptive, perfective and preventive **maintenance** ([[#def-maintenance]]). Lehman's laws: real-world software must keep changing, and its complexity grows unless work is done to reduce it.
- A **refactoring** preserves observable behaviour ([[#def-refactoring]]); a chain of small, checked refactorings is a refactoring ([[#prop-refactor-compose]]). Respect each refactoring's preconditions, and never mix refactoring with behaviour change.
- **Code smells** — long functions, duplication, shotgun surgery, repeated switches — suggest where to refactor.
- For **legacy code**, first write **characterisation tests** of what the code actually does ([[#def-characterisation]]), find or create seams, then refactor in steps; replace large systems gradually (strangler fig).
- **Cyclomatic complexity** $V = E - N + 2$ equals decisions $+1$ for structured code ([[#def-cyclomatic]], [[#prop-cyclomatic]]); combine it with change frequency to find **hotspots**.
- **Technical debt** is a metaphor for the extra cost of changing code whose design lags behind understanding; its interest is paid where code changes, so pay it down there ([[#eq-debt]]).
:::

## Exercises

::: exercise Count the decisions {level=1 check="4"}
What is the cyclomatic complexity of this function, by [[#prop-cyclomatic]]? (Enter the number.)

```python
def classify(n):
    if n < 0:
        return "negative"
    while n % 2 == 0 and n > 0:
        n //= 2
    return "odd part " + str(n)
```
::: solution
The decisions are the `if`, the `while`, and the extra branch created by `and` (short-circuit evaluation): $d = 3$, so $V = 4$. Four tests can follow the independent paths: a negative number, an odd number (loop not entered), zero (the `and`'s second operand false), and an even positive number (loop entered).
:::
:::

::: exercise Which kind of maintenance? {level=1}
Classify each change by [[#def-maintenance]]: (a) a fix for a crash when the input file is empty; (b) updating the code to a new major version of a web framework whose old version is no longer supported; (c) adding an export to spreadsheet format requested by users; (d) splitting a 3,000-line module and adding tests, with no change in behaviour; (e) changing VAT calculations after a change in the law.
::: solution
(a) Corrective. (b) Adaptive — the environment changed. (c) Perfective. (d) Preventive. (e) Adaptive: the software's environment, here the law, changed; arguably also perfective if users asked for it, which illustrates that the categories are for thinking, not for precise accounting.
:::
:::

::: exercise Name the smell {level=1}
Name the smell: (a) Adding a new currency requires changes in the price display, the invoice generator, the tax module and the database schema. (b) A function `print_invoice(name, street, city, postcode, country, ...)` with eleven parameters, the first five of which always come from the same customer record. (c) `Order.total()` reads `self.customer.discount_tier`, `self.customer.region` and `self.customer.loyalty_years` and does all its computation with them.
::: solution
(a) Shotgun surgery: one kind of change is spread over many modules; gather currency handling into a `Money` type and a currency module. (b) Long parameter list, specifically a data clump; Introduce Parameter Object (pass an `Address`, or the customer). (c) Feature envy: the computation belongs to the customer — Move Function to `Customer.discount_for(order)`.
:::
:::

::: exercise A graph's complexity {level=2 check="5"}
A control-flow graph of one function has 14 nodes and 17 edges. What is its cyclomatic complexity? If it is a structured function as in [[#prop-cyclomatic]], how many binary decisions does it contain? (Enter the complexity.)
::: solution
$V = E - N + 2 = 17 - 14 + 2 = 5$, so by [[#prop-cyclomatic]] it has $d = V - 1 = 4$ binary decisions.
:::
:::

::: exercise A rename that is not a refactoring {level=2}
In the code below, a developer renames the parameter `rate` to `r` throughout `price` with a text editor's search and replace. Explain why this is not a refactoring and what an automated rename would do.

```python
r = 0.2                      # module-level VAT rate

def price(amount, rate):
    return amount * (1 + rate) * (1 + r)
```
::: solution
After the textual replacement the function reads `return amount * (1 + r) * (1 + r)`: both occurrences now refer to the *parameter*, which **captures** the reference to the module-level `r`. A call `price(100, 0.1)` returned $100 \times 1.1 \times 1.2 = 132$ before and returns $100 \times 1.1 \times 1.1 = 121$ after, so behaviour changed. The rename violates its precondition (the new name must not be visible in the scope already). An automated rename refuses, or warns of the conflict; a careful human chooses another name or first renames the global (`VAT_RATE`, which is the better name anyway).
:::
:::

::: exercise Characterise before you change {level=2}
The function below is used in production and has no tests. Write characterisation tests for it, noting anything suspicious, and then extract the discount rule into its own function without changing behaviour.

```python
def basket_total(items, coupon):
    t = 0
    for name, price, qty in items:
        t += price * qty
    if coupon == "SAVE10" and t > 50:
        t = t * 0.9
    elif coupon == "SAVE5":
        t = t - 5
    return round(t, 2)
```
::: solution
Run it on inputs covering each branch and boundary, and record the results:

```python
from basket import basket_total

def test_characterise():
    items = [("tea", 3.5, 4), ("cake", 12.0, 3)]          # 14 + 36 = 50
    assert basket_total(items, None) == 50.0
    assert basket_total(items, "SAVE10") == 50.0           # exactly 50: no discount
    assert basket_total(items + [("jam", 0.01, 1)], "SAVE10") == 45.01
    assert basket_total(items, "SAVE5") == 45.0
    assert basket_total([("pen", 2.0, 1)], "SAVE5") == -3.0   # suspicious!
    assert basket_total([], "save10") == 0                  # codes are case-sensitive
```

Suspicious behaviours to raise with the business, *not* to fix during the refactoring: `SAVE5` can make the total negative, and coupon codes are case-sensitive. Then extract:

```python
def apply_coupon(total, coupon):
    if coupon == "SAVE10" and total > 50:
        return total * 0.9
    if coupon == "SAVE5":
        return total - 5
    return total

def basket_total(items, coupon):
    t = sum(price * qty for _, price, qty in items)
    return round(apply_coupon(t, coupon), 2)
```

```console
$ pytest -q test_basket.py
.                                                                        [100%]
1 passed in 0.12s
```

Both versions pass. Note that `sum` adds the same values in the same order as the loop, so even floating-point results are identical; reordering the additions would not be guaranteed to be.
:::
:::

::: exercise Finding hotspots {level=3}
Write a program that combines a Git repository's change history with the cyclomatic complexity tool of this chapter to rank Python files by **hotspot score** = (number of commits that changed the file) × (highest complexity of a function in it, or 1 if it has none). Test it on a small repository.
::: solution
```python
import ast, subprocess, sys
from collections import Counter
from complexity import cyclomatic          # the function above

def changes(repo):
    """How many commits touched each file."""
    log = subprocess.run(["git", "-C", repo, "log", "--format=", "--name-only"],
                         capture_output=True, text=True, check=True).stdout
    return Counter(line for line in log.splitlines() if line)

def max_complexity(path):
    funcs = [n for n in ast.walk(ast.parse(open(path).read()))
             if isinstance(n, ast.FunctionDef)]
    return max((cyclomatic(f) for f in funcs), default=1)

repo = sys.argv[1]
rows = [(n * max_complexity(f"{repo}/{name}"), name, n)
        for name, n in changes(repo).items() if name.endswith(".py")]
for score, name, n in sorted(rows, reverse=True):
    print(f"{name:10} changes={n:2}  complexity={score // n:2}  hotspot score={score}")
```

A test repository holds the original `fines.py` (changed in 8 commits), a one-line `config.py` (10 commits) and a small `loans.py` (3 commits):

```console
$ git -C lib log --format= --name-only | sort | uniq -c | sort -rn
     10 config.py
      8 fines.py
      3 loans.py
$ python3 hotspot.py lib
fines.py   changes= 8  complexity= 8  hotspot score=64
config.py  changes=10  complexity= 1  hotspot score=10
loans.py   changes= 3  complexity= 1  hotspot score=3
```

`config.py` changes most often but is trivial; `fines.py` is both complex and frequently changed, so it ranks first. The program assumes every file in the history still exists (deleted or renamed files would make `open` fail; a real tool would skip them or follow renames with `git log --follow`), and it counts all history equally, whereas recent changes are usually more informative.
:::
:::

::: exercise When does clean-up pay? {level=3 check="21"}
In the toy model of [[#eq-debt]], show that the cumulative cost without clean-up exceeds the cost with clean-up exactly when $n > 1 + 2r/(k\delta)$, and find the break-even number of changes for $c = 2$, $r = 0.5$, $k = 0.1$, $\delta = 0.5$. (Enter the break-even $n$.)
::: solution
Without clean-up the cost is $nc + k\delta\, n(n-1)/2$; with it, $n(c + r)$. The first exceeds the second iff $k\delta\, n(n-1)/2 > nr$, and dividing by $n > 0$, iff $k\delta (n - 1)/2 > r$, i.e. $n > 1 + 2r/(k\delta)$. Note that $c$ cancels: the base cost of a change does not matter, only the overhead of refactoring against the interest saved. With the given values, $1 + 2 \times 0.5/(0.1 \times 0.5) = 1 + 20 = 21$: the two strategies cost the same after 21 changes ($21 \times 2.5 = 52.5$ both ways), and after that, clean-up wins by a margin that grows quadratically.
:::
:::
