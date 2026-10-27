A function to compute the median of a list of exam marks is short and, as far as its result goes, correct:

```python
def median(xs):
    xs.sort()
    n = len(xs)
    return xs[n // 2] if n % 2 else (xs[n // 2 - 1] + xs[n // 2]) / 2
```

Then a report that prints each student's mark next to their name starts listing the marks in the wrong rows. The report built a list of names and a parallel list of marks, called `median(marks)` to print a class summary, and carried on — but `median` had sorted the caller's list in place, so the marks no longer lined up with the names. Nothing in the call `median(marks)` hints that it changes anything; the bug sits in one function and shows up in another, at a distance.

Every chapter so far has met versions of this problem: aliasing in [[programming-1/sequences]], representation exposure in [[program-design/abstract-data-types]], the lost dictionary key in [[program-design/classes-objects]]. They have a common cause — **mutation of shared state** — and this chapter is about a style of programming that removes the cause. In the **functional style**, functions compute results from their arguments and do nothing else, and data, once built, never changes. Programs written this way can be reasoned about by substitution, as in algebra; their parts can be tested, cached and run in parallel without fear; and, with **persistent data structures**, they need not be slower. We also learn to write recursive functions whose shape follows the shape of the data, and to prove things about them by structural induction.

## Pure functions

::: definition Pure function, side effect {#def-pure}
A function is **pure** if (1) its result depends only on the values of its arguments, and (2) calling it has no **side effects** — no observable change to anything outside the function: no mutation of its arguments or of global or shared objects, no input or output, no exceptions other than those determined by its arguments. A function that is not pure is **impure**.
:::

Pure: `len`, `abs`, `sorted`, `math.sqrt`, `str.upper`, `isqrt` from [[program-design/abstraction-specifications]], and the `simplify` function later in this chapter. Impure: `list.sort` (mutates its argument), `print` (output), `input` and `open(...).read()` (input), `random.random()` and `time.time()` (results depend on hidden state), and any function that reads a global variable that might change. The median above is impure because of `xs.sort()`; replacing that line by `xs = sorted(xs)` makes it pure, at the cost of one copy of the list.

Purity is what makes the following property possible.

::: definition Referential transparency {#def-referential-transparency}
An expression is **referentially transparent** if it can be replaced by its value, everywhere it occurs, without changing the behaviour of the program. A program in which every expression is referentially transparent can be reasoned about by **substitution of equals for equals**, as in algebra.
:::

If `f` is pure, then `f(3)` is referentially transparent: `f(3) + f(3)` may be replaced by `2 * f(3)`, or by `y + y` after `y = f(3)`, and the program cannot tell the difference. If `f` is impure, such replacements change the meaning:

```python
counter = [0]

def next_id():                    # impure: reads and changes shared state
    counter[0] += 1
    return counter[0]

print(next_id() + next_id(), 2 * next_id())
```

```console
$ python3 nextid.py
3 6
```

`next_id() + next_id()` is $1 + 2 = 3$, while `2 * next_id()` is $2 \times 3 = 6$ — so an apparently harmless algebraic simplification, or a compiler optimisation, or a refactoring that introduces a variable, would change the output. With impure code, the *order* and *number* of calls matter, and every reader must track them.

### Why purity pays

- **Testing.** A pure function's behaviour is completely described by a table of inputs and outputs. A test needs no setup of hidden state and no clean-up, and it gives the same answer every time.
- **Caching.** The `memo` decorator of [[program-design/higher-order-functions]] is correct only for pure functions: caching `next_id` would return `1` for ever.
- **Parallelism.** Two calls of pure functions cannot interfere with each other, so they may run at the same time on different processors without locks. The hard problems of [[parallel-computing]] and [[operating-systems]] — races, deadlocks — are all problems of shared mutable state.
- **Reasoning.** A pure function's specification has no modifies clause. To understand a call, you need its arguments and its specification, nothing else.

No useful program is entirely pure: it must read input and produce output. The practical discipline, sometimes called "**functional core, imperative shell**", is to put the decisions and computations in pure functions and confine the side effects — reading files, printing, talking to the network, changing a database — to a thin outer layer that calls them. The `print` at the end of each listing in this course is that shell.

::: quiz
Which of these functions is pure?
- [ ] `def f(xs): xs.append(0); return len(xs)`
- [ ] `def g(x): return x + offset`, where `offset` is a global variable that other code changes
- [x] `def h(xs): return sorted(xs)[-1] if xs else None`
- [ ] `def k(n): print(n); return n * n`
::: solution
`h` builds a new sorted list and returns its last element; it changes nothing and depends only on `xs`. `f` mutates its argument; `g` depends on a global that can change, so the same argument can give different results; `k` performs output, a side effect, even though its result depends only on `n`.
:::
:::

## Reasoning by substitution

For pure code, the meaning of a function call can be found by the **substitution model**: replace the call by the function's body with each parameter replaced by the corresponding argument value, and simplify. This is how Abelson and Sussman begin *Structure and Interpretation of Computer Programs*, and it is exactly how one evaluates $f(3)$ for $f(x) = x^2 + 1$ in mathematics.

::: example Evaluating by substitution {#ex-substitution}
With `square(x) = x * x` and `sum_squares(a, b) = square(a) + square(b)`, evaluate `sum_squares(3, 4 + 1)` by substitution, in two different orders.
::: solution
*Arguments first* (Python's order, called **applicative order**):

```text
sum_squares(3, 4 + 1)
= sum_squares(3, 5)                 evaluate the arguments
= square(3) + square(5)             substitute a = 3, b = 5 into the body
= (3 * 3) + (5 * 5)
= 9 + 25
= 34
```

*Substitute first, evaluate later* (**normal order**):

```text
sum_squares(3, 4 + 1)
= square(3) + square(4 + 1)
= (3 * 3) + ((4 + 1) * (4 + 1))
= 9 + (5 * 5)
= 34
```

Both orders give $34$. For pure code that terminates, this is not a coincidence: the order in which subexpressions are evaluated cannot change the value (a consequence of the Church–Rosser theorem of the λ-calculus, [[programming-languages]]). Normal order evaluated `4 + 1` twice, the price of postponing work; languages such as Haskell use **lazy evaluation**, normal order with sharing of results, which keeps the advantage of evaluating an argument only if it is needed. Python generators, in [[program-design/iterators-generators]], bring that laziness to sequences.
:::
:::

Substitution is not only a way of running programs by hand; it is a way of *proving* things about them. Equations such as map fusion ([[program-design/higher-order-functions#thm-map-fusion]]) are proved by unfolding definitions and are valid exactly because the functions involved are pure.

## Immutable data

A pure function must not mutate its arguments, so to "change" a value it builds a new one. In Python this is natural for the built-in immutable types — numbers, strings, tuples, `frozenset` — and for frozen data classes, where `dataclasses.replace` makes a modified copy.

```python
from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Order:
    customer: str
    items: tuple = ()
    paid: bool = False

def add_item(order, item):
    """Effects: returns order with item appended; order itself is unchanged."""
    return replace(order, items=order.items + (item,))

o1 = Order("Ada")
o2 = add_item(add_item(o1, "tea"), "scone")
o3 = replace(o2, paid=True)
print(o1)
print(o2)
print(o3.paid, o2.paid, o2.items is o3.items)
```

```console
$ python3 order.py
Order(customer='Ada', items=(), paid=False)
Order(customer='Ada', items=('tea', 'scone'), paid=False)
True False True
```

Every version of the order still exists and is unchanged: `o1` is still empty and `o2` still unpaid after `o3` was made. Nothing can change behind a caller's back, so values can be shared freely — `o3` and `o2` share the very same tuple of items, which is safe precisely because neither can modify it. There is no aliasing problem when nothing is mutable: aliasing is only dangerous when combined with mutation.

::: warning Immutable is not deeply immutable
A tuple cannot be changed, but its elements can. After `t = (1, [2, 3])`, `t[1].append(4)` makes `t` equal to `(1, [2, 3, 4])`: the tuple still holds the same list object, and the list changed. Such a tuple is also unhashable (`hash(t)` raises `TypeError: unhashable type: 'list'`). Likewise a frozen data class with a list attribute is only *shallowly* immutable. For values that must not change, use immutable types all the way down: tuples of tuples, `frozenset`, frozen data classes of immutable fields.
:::

Copying sounds expensive: does every "update" copy the whole structure? For `add_item` above, yes — `order.items + (item,)` copies the tuple, so building an order of $n$ items one at a time costs $\Theta(n^2)$. The cure is not to give up immutability but to choose data structures designed for it.

## Persistent data structures

::: definition Persistent data structure {#def-persistent}
A data structure is **persistent** if every operation that "modifies" it returns a new version while leaving all previous versions intact and usable. Persistent structures are made efficient by **structural sharing**: a new version reuses, without copying, every part of the old version that the operation did not change.
:::

The simplest persistent structure is the linked list of [[data-structures/arrays-lists]] used immutably. Represent the empty list by `None` and a non-empty list by a pair `(first, rest)`. Then putting an element in front is $O(1)$ and shares the entire old list:

```python
def cons(x, xs):  return (x, xs)          # a new cell; xs is shared, not copied

def to_list(xs):
    out = []
    while xs is not None:
        x, xs = xs
        out.append(x)
    return out

base = cons(2, cons(3, None))
a = cons(1, base)                          # [1, 2, 3]
b = cons(9, base)                          # [9, 2, 3]
print(to_list(a), to_list(b), a[1] is b[1])
```

```console
$ python3 cons.py
[1, 2, 3] [9, 2, 3] True
```

Two lists, five values, but only four cells: the cells holding $2$ and $3$ belong to both lists. This is the stack of [[program-design/abstract-data-types]] again, and the reason $\mathit{pop}(\mathit{push}(s, x))$ was the very same object as $s$.

::: example Undo for free {#ex-undo}
A word processor keeps every version of a document so that the user can undo any number of edits. With a mutable list of words, each saved version must be a full copy. Show how a persistent list makes saving a version cost $O(1)$, and count the cells used.
::: solution
Store the words most recent first, as a cons list, and keep a list of versions:

```python
def cons(x, xs):  return (x, xs)

def words(doc):                            # oldest word first
    out = []
    while doc is not None:
        w, doc = doc
        out.append(w)
    return out[::-1]

history = [None]                           # version 0: the empty document
for w in ["persistence", "makes", "undo", "trivial"]:
    history.append(cons(w, history[-1]))   # one new cell per edit
print(" ".join(words(history[-1])))
history.pop()                              # undo the last edit
history.pop()                              # and the one before
print(" ".join(words(history[-1])), "| versions kept:", len(history))
```

```console
$ python3 undo.py
persistence makes undo trivial
persistence makes | versions kept: 3
```

After four edits there were five versions, of lengths $0, 1, 2, 3, 4$ — ten words in all — but only four cells exist, because version $i$ is version $i - 1$ with one cell in front. Undo is a `pop` of the history, and no version is ever damaged by later edits, since none can be mutated. With copying, $k$ edits of a document of $n$ words would store $\Theta(kn)$ words; with sharing, $\Theta(n + k)$. Real editors use persistent *trees* (ropes, piece tables) rather than lists, so that edits in the middle are cheap too.
:::
:::

Trees share just as well. To insert into an immutable binary search tree, copy only the nodes on the path from the root to the insertion point — **path copying** — and point the copies at the unchanged subtrees.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Node:
    left: "Node | None"
    key: int
    right: "Node | None"

def insert(t, k):
    """Effects: returns a BST with the keys of t and k; t is unchanged."""
    if t is None:
        return Node(None, k, None)
    if k < t.key:
        return Node(insert(t.left, k), t.key, t.right)    # copy this node only
    if k > t.key:
        return Node(t.left, t.key, insert(t.right, k))
    return t                                              # already present

def nodes(t):
    return [] if t is None else nodes(t.left) + [t] + nodes(t.right)

v1 = None
for k in [50, 30, 70, 20, 40, 60, 80]:
    v1 = insert(v1, k)
v2 = insert(v1, 45)
print([n.key for n in nodes(v1)])
print([n.key for n in nodes(v2)])
shared = {id(n) for n in nodes(v1)} & {id(n) for n in nodes(v2)}
print(len(nodes(v1)), len(nodes(v2)), len(shared))
```

```console
$ python3 pbst.py
[20, 30, 40, 50, 60, 70, 80]
[20, 30, 40, 45, 50, 60, 70, 80]
7 8 4
```

::: theorem Cost of path copying {#thm-path-copying}
Let $t$ be a binary search tree and $k$ a key not in $t$, and let $d$ be the number of nodes on the search path for $k$ (the nodes whose keys `insert` compares with $k$). Then `insert(t, k)` creates exactly $d + 1$ new nodes, and every other node of the new tree is a node of $t$. In particular its cost is $O(h)$ for a tree of height $h$, the same as for a mutable insertion.
:::

::: proof
By induction on $d$. If $d = 0$, then $t$ is `None` (the search path is empty), `insert` creates one node, and the new tree has no other node. Suppose $d \ge 1$, so $t$ is a node with key $t.key \ne k$; say $k < t.key$ (the other case is symmetric). The search path for $k$ in $t$ is the root followed by the search path in $t.left$, which has $d - 1$ nodes. By the induction hypothesis, `insert(t.left, k)` creates exactly $(d - 1) + 1 = d$ new nodes, and all other nodes of its result belong to $t.left$. The call then creates one more node, the copy of the root, whose right subtree is $t.right$ itself. So exactly $d + 1$ nodes are new, and every other node of the result belongs to $t.left$ or $t.right$, hence to $t$. Each node created costs $O(1)$ work, and $d \le h$.
:::

In the example, the search path for $45$ is $50, 30, 40$ ($d = 3$), so four nodes are new — copies of $50$, $30$ and $40$, and the leaf $45$ — and the other four nodes of `v2` ($20$, $60$, $70$, $80$) are shared with `v1`.

::: widget graph
nodes: 50@3,4; 30@1.5,3; 70@4.5,3; 20@0.5,2; 40@2.5,2; 60@4,2; 80@5.5,2; 50b@3,5.5; 30b@1.5,4.6; 40b@2.5,3.6; 45@3.2,1
edges: 50>30; 50>70; 30>20; 30>40; 70>60; 70>80; 50b>30b; 50b>70; 30b>20; 30b>40b; 40b>45
algorithm: dfs
start: 50b
caption: Two versions of a persistent binary search tree in one picture. Version 1 has root `50`; inserting $45$ created version 2, with root `50b` and new copies `30b` and `40b` of the nodes on the search path, plus the leaf `45`. Step through a depth-first search from `50b`: it visits exactly the eight nodes of version 2, reaching the old, shared nodes `20`, `70`, `60` and `80` through the new path. Change the start to `50` and the search finds version 1, untouched.
:::

Balanced versions of the same idea (persistent red–black trees, finger trees, hash array mapped tries) give $O(\log n)$ updates for sets, maps and sequences, and are the standard collections of languages such as Clojure, Scala and Haskell. Being able to keep every old version cheaply is useful far beyond functional programming: undo histories in editors, snapshots in databases and file systems, and version control all rely on structural sharing ([[software-engineering]]).

## Recursion over structures

Immutable data is usually built from a few kinds of node, defined recursively. The shape of such a **data definition** tells us the shape of the functions that process it. Felleisen, Findler, Flatt and Krishnamurthi's *How to Design Programs* turns this into a method, the **design recipe**: (1) write the data definition; (2) write the function's signature, purpose statement and examples; (3) derive a **template** from the data definition — one case per kind of node, with a recursive call for each self-referential part; (4) fill in the template; (5) turn the examples into tests.

::: example An expression evaluator and simplifier {#ex-expr}
Arithmetic expressions with integer constants, variables, sums and products are trees. Write a data definition, an evaluator and a simplifier that applies $0 + x = x$, $1 \cdot x = x$ and $0 \cdot x = 0$, using Python's `match` statement.
::: solution
*Data definition.* An expression is one of: `Num(value)` with an integer value; `Var(name)` with a string name; `Add(left, right)` or `Mul(left, right)`, where `left` and `right` are expressions.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Num:  value: int
@dataclass(frozen=True)
class Var:  name: str
@dataclass(frozen=True)
class Add:  left: object; right: object
@dataclass(frozen=True)
class Mul:  left: object; right: object

def evaluate(e, env):
    """Value of expression e, with variables looked up in the dict env."""
    match e:
        case Num(v):    return v
        case Var(name): return env[name]
        case Add(l, r): return evaluate(l, env) + evaluate(r, env)
        case Mul(l, r): return evaluate(l, env) * evaluate(r, env)

def simplify(e):
    """An expression with the same value as e, using 0+x = x, 1*x = x and 0*x = 0."""
    match e:
        case Add(l, r):
            l, r = simplify(l), simplify(r)
            if l == Num(0): return r
            if r == Num(0): return l
            return Add(l, r)
        case Mul(l, r):
            l, r = simplify(l), simplify(r)
            if Num(0) in (l, r): return Num(0)
            if l == Num(1): return r
            if r == Num(1): return l
            return Mul(l, r)
        case _:                       # Num and Var are already simple
            return e

e = Add(Mul(Num(1), Var("x")), Mul(Var("y"), Add(Num(0), Num(0))))
print(simplify(e))
print(evaluate(e, {"x": 7, "y": 3}), evaluate(simplify(e), {"x": 7, "y": 3}))
```

```console
$ python3 expr.py
Var(name='x')
7 7
```

Both functions have the same template: one `case` per kind of node, and a recursive call on each sub-expression of the compound kinds. The `match` statement (Python 3.10 and later) compares the shape of `e` with each pattern in turn; `case Add(l, r)` matches an `Add` node and binds its two fields to `l` and `r`. Frozen data classes give the nodes value equality, which `simplify` uses in `l == Num(0)`, and the simplifier never mutates its input: it builds a new tree, reusing unchanged sub-expressions such as `Var("x")`. Here $(1 \cdot x) + (y \cdot (0 + 0))$ simplifies to $x$: the inner $0 + 0$ becomes $0$, then $y \cdot 0$ becomes $0$, $1 \cdot x$ becomes $x$, and $x + 0$ becomes $x$.
:::
:::

Functions defined by structural recursion are proved correct by the matching principle of proof.

::: theorem Structural induction {#thm-structural-induction}
Let a set of values be defined as the smallest set built from some **base** constructors (with no sub-values of the set) and **recursive** constructors (whose arguments include values of the set). To prove a property $P(v)$ for every value $v$ of the set, it suffices to prove $P(v)$ for each value built by a base constructor, and, for each recursive constructor, that $P$ holds for the constructed value whenever it holds for all of its sub-values of the set.
:::

::: proof
Assign each value its **size**, the number of constructor applications used to build it; sub-values have strictly smaller size. Suppose $P$ failed for some value, and let $v$ be a failing value of least size. If $v$ is built by a base constructor, $P(v)$ holds by the first part of the hypothesis — a contradiction. Otherwise $v$ is built by a recursive constructor from sub-values of smaller size, for which $P$ holds by the minimality of $v$; then the second part of the hypothesis gives $P(v)$ — again a contradiction. So $P$ holds for every value. (This is ordinary strong induction on size, from [Maths Atlas: induction](/learn/maths/lesson.php?c=proofs&l=induction).)
:::

::: example Leaves and operators {#ex-leaves}
Prove that in every expression of [[#ex-expr]], the number of leaves (`Num` and `Var` nodes) is one more than the number of operators (`Add` and `Mul` nodes). Then prove that `simplify` preserves values: `evaluate(simplify(e), env) == evaluate(e, env)` whenever `evaluate(e, env)` succeeds.
::: solution
*Leaves.* Let $\ell(e)$ and $o(e)$ count leaves and operators; we prove $\ell(e) = o(e) + 1$ by [[#thm-structural-induction]]. Base cases: a `Num` or a `Var` has $\ell = 1$, $o = 0$. Recursive cases: for $e = \mathrm{Add}(l, r)$ (and likewise `Mul`), the leaves of $e$ are those of $l$ and $r$, and the operators are those of $l$ and $r$ plus one. Assuming the property for $l$ and $r$, $\ell(e) = \ell(l) + \ell(r) = (o(l) + 1) + (o(r) + 1) = (o(l) + o(r) + 1) + 1 = o(e) + 1$.

*Values.* Write $[\![e]\!]$ for `evaluate(e, env)`. Base cases: `simplify` returns `Num` and `Var` nodes unchanged. Case $e = \mathrm{Add}(l, r)$: let $l' = $ `simplify(l)` and $r' = $ `simplify(r)`; by the induction hypothesis $[\![l']\!] = [\![l]\!]$ and $[\![r']\!] = [\![r]\!]$. If $l' = \mathrm{Num}(0)$ the result is $r'$, with value $[\![r]\!] = 0 + [\![r]\!] = [\![l]\!] + [\![r]\!] = [\![e]\!]$; the case $r' = \mathrm{Num}(0)$ is symmetric; otherwise the result is $\mathrm{Add}(l', r')$ with value $[\![l']\!] + [\![r']\!] = [\![e]\!]$. Case $e = \mathrm{Mul}(l, r)$: the same, using $0 \cdot v = v \cdot 0 = 0$ and $1 \cdot v = v \cdot 1 = v$ for integers.

The proof assumed that `evaluate(e, env)` succeeds. If `env` lacks a variable that is multiplied by zero, `evaluate(e, env)` raises `KeyError` while the simplified expression may evaluate without it — simplification can make an expression *more* defined, never less. Laws like these are what an optimising compiler must respect.
:::
:::

::: warning Python is not built for deep recursion
Python limits the depth of recursion (by default to $1000$ frames, see `sys.getrecursionlimit()`) and does not eliminate tail calls, so a recursive `length` of a 5000-cell linked list raises `RecursionError: maximum recursion depth exceeded`. Structural recursion is ideal for trees, whose depth is usually logarithmic in their size, but for long linear structures write loops — keeping the *interface* pure. Functional languages such as Scheme, OCaml and Haskell guarantee that tail calls do not grow the stack, which is why recursion is their basic looping construct.
:::

::: history
LISP (McCarthy, 1960) was built on recursive functions over immutable lists made of `cons` cells, and Peter Landin's "The next 700 programming languages" (1966) described ISWIM, a design for a language built on expressions and substitution. Rod Burstall's "Proving properties of programs by structural induction" (*The Computer Journal*, 1969) introduced the proof principle of this chapter. Robin Milner's ML (from 1973, for the LCF theorem prover) added static types and pattern matching over data definitions; David Turner's Miranda (1985) and then Haskell (first report 1990) made lazy, purely functional programming practical. James Driscoll, Neil Sarnak, Daniel Sleator and Robert Tarjan's "Making data structures persistent" (1989) gave general techniques for persistence, and Chris Okasaki's *Purely Functional Data Structures* (1998) showed that efficient immutable queues, heaps and trees could match their mutable counterparts.
:::

## Where this leads

[[program-design/iterators-generators]] brings lazy evaluation to Python's sequences. [[program-design/types-interfaces]] gives data definitions a type, so that a checker can confirm that a `match` handles every kind of node. In [[programming-languages]], the substitution model becomes the formal semantics of the λ-calculus and interpreters are written as structural recursions over syntax trees — exactly `evaluate` above, grown up — and [[compilers]] applies value-preserving rewrites like `simplify` as optimisations. Persistent structures reappear in [[databases]] (multi-version concurrency control) and [[distributed-systems]], where immutable logs are easier to replicate than mutable state.

::: summary
- A **pure** function's result depends only on its arguments and it has no side effects ([[#def-pure]]); pure expressions are **referentially transparent** and can be replaced by their values ([[#def-referential-transparency]]).
- Purity makes code easy to test, cache, parallelise and reason about; keep side effects in a thin imperative shell around a functional core.
- The **substitution model** evaluates pure calls by replacing parameters with arguments; for terminating pure code, evaluation order cannot change the result.
- **Immutable** values can be shared without aliasing bugs; "updates" build new values (`dataclasses.replace`). Tuples are only shallowly immutable.
- **Persistent** structures keep all versions and share unchanged parts: `cons` is $O(1)$, and path-copying insertion into a BST creates $d + 1$ nodes for a search path of $d$ nodes ([[#thm-path-copying]]).
- Recursive data definitions give function **templates** (the design recipe) and proofs by **structural induction** ([[#thm-structural-induction]]); Python's `match` and frozen data classes express them directly.
- Python limits recursion depth and has no tail-call elimination: recurse over trees, loop over long lists.
:::

## Exercises

::: exercise Pure or impure? {level=1}
Classify each function as pure or impure, and give the reason: (a) `def f(d, k): return d.get(k, 0)`; (b) `def g(d, k): d.setdefault(k, 0); return d[k]`; (c) `def h(): return random.randint(1, 6)`; (d) `def m(xs): return [x for x in xs if x > 0]`; (e) `def n(path): return open(path).read()`.
::: solution
(a) Pure: it reads `d` without changing it, and the result depends only on `d` and `k`. (Strictly, it depends on the *current contents* of the mutable dictionary — purity of functions on mutable arguments is relative to their value at the time of the call.) (b) Impure: `setdefault` may insert `k` into the caller's dictionary. (c) Impure: the result depends on the hidden state of the random generator, which the call also changes. (d) Pure: it builds a new list. (e) Impure: it performs input, and the result depends on the file system, which can change between calls.
:::
:::

::: exercise New nodes {level=1 check="4"}
A persistent BST built by inserting $8, 4, 12, 2, 6, 10, 14, 1$ (in that order) into an empty tree receives the key $7$. How many new nodes does `insert` create? (Enter the number.)
::: solution
The search path for $7$ is $8$ (go left), $4$ (go right), $6$ (go right, to an empty subtree): $d = 3$. By [[#thm-path-copying]], $d + 1 = 4$ nodes are new — copies of $8$, $4$ and $6$, and the leaf $7$; the other $8 - 3 = 5$ nodes are shared.
:::
:::

::: exercise Substitution by hand {level=1 check="50"}
With `double(x) = x + x` and `f(a, b) = double(a) * b`, evaluate `f(2 + 3, double(2) + 1)` by the substitution model, arguments first. (Enter the value.)
::: solution
Arguments first: `2 + 3 = 5`; `double(2) + 1 = (2 + 2) + 1 = 5`. Then `f(5, 5) = double(5) * 5 = (5 + 5) * 5 = 50`.
:::
:::

::: exercise Mutable insides {level=2}
Predict the output, then explain each line.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Team:
    name: str
    members: list

t = Team("blue", ["ann"])
u = t
t.members.append("bob")
print(u.members, t == Team("blue", ["ann", "bob"]))
try:
    print(hash(t))
except TypeError as e:
    print("TypeError:", e)
```
::: solution
```console
$ python3 team.py
['ann', 'bob'] True
TypeError: unhashable type: 'list'
```

`frozen=True` forbids rebinding the attributes (`t.members = []` would raise `FrozenInstanceError`) but not mutating the list they refer to, so `append` succeeds and is visible through the alias `u`. Equality compares fields, so the team equals a fresh one with the same members. The generated `__hash__` hashes the tuple of fields, which fails because a list is unhashable. Use `members: tuple` to make the class deeply immutable.
:::
:::

::: exercise Functions on cons lists {level=2}
Using the representation `None` / `(first, rest)`, write recursive pure functions `length(xs)`, `append(xs, ys)` and `reverse(xs)` (the last with an accumulator), following the template "one case for `None`, one case for a pair with a recursive call on `rest`". How many new cells does `append(xs, ys)` create, and which cells does the result share?
::: solution
```python
def length(xs):
    return 0 if xs is None else 1 + length(xs[1])

def append(xs, ys):
    return ys if xs is None else (xs[0], append(xs[1], ys))

def reverse(xs, acc=None):
    return acc if xs is None else reverse(xs[1], (xs[0], acc))

def from_list(items):
    out = None
    for x in reversed(items):
        out = (x, out)
    return out

a, b = from_list([1, 2, 3]), from_list([4, 5])
c = append(a, b)
print(c, length(c), reverse(c))
print(c[1][1][1] is b)
```

```console
$ python3 conslist.py
(1, (2, (3, (4, (5, None))))) 5 (5, (4, (3, (2, (1, None)))))
True
```

`append` creates one new cell for each element of `xs` — here $3$ — and shares all of `ys`: the fourth cell of `c` *is* `b`. Its cost is therefore $\Theta(\text{length of } xs)$, independent of `ys`. `xs` cannot be shared, because its last cell points to `None` and would have to point to `ys` instead.
:::
:::

::: exercise Counting leaves {level=2 check="8"}
An expression in the language of [[#ex-expr]] contains $7$ `Add` and `Mul` nodes in total. How many `Num` and `Var` nodes does it contain? (Enter the number.)
::: solution
By [[#ex-leaves]], leaves $=$ operators $+ 1 = 8$, whatever the shape of the tree.
:::
:::

::: exercise Reversing an append {level=3}
For the cons-list functions of the earlier exercise (with `rev` the two-case definition $\mathrm{rev}(\mathrm{None}) = \mathrm{None}$, $\mathrm{rev}((x, xs)) = \mathrm{append}(\mathrm{rev}(xs), (x, \mathrm{None}))$), prove by structural induction that $\mathrm{rev}(\mathrm{append}(xs, ys)) = \mathrm{append}(\mathrm{rev}(ys), \mathrm{rev}(xs))$. You may use, after proving them, the lemmas $\mathrm{append}(xs, \mathrm{None}) = xs$ and $\mathrm{append}(\mathrm{append}(xs, ys), zs) = \mathrm{append}(xs, \mathrm{append}(ys, zs))$.
::: solution
*Lemma 1*, $\mathrm{append}(xs, \mathrm{None}) = xs$, by induction on $xs$: for $\mathrm{None}$ both sides are $\mathrm{None}$; for $(x, xs')$, $\mathrm{append}((x, xs'), \mathrm{None}) = (x, \mathrm{append}(xs', \mathrm{None})) = (x, xs')$ by hypothesis.

*Lemma 2* (associativity), by induction on $xs$: for $\mathrm{None}$ both sides are $\mathrm{append}(ys, zs)$; for $(x, xs')$ the left side is $(x, \mathrm{append}(\mathrm{append}(xs', ys), zs))$ and the right side $(x, \mathrm{append}(xs', \mathrm{append}(ys, zs)))$, equal by hypothesis.

*Main claim*, by induction on $xs$. Base: $\mathrm{rev}(\mathrm{append}(\mathrm{None}, ys)) = \mathrm{rev}(ys) = \mathrm{append}(\mathrm{rev}(ys), \mathrm{None})$ by Lemma 1, and $\mathrm{rev}(\mathrm{None}) = \mathrm{None}$. Step: for $xs = (x, xs')$,

$$
\begin{aligned}
\mathrm{rev}(\mathrm{append}((x, xs'), ys)) &= \mathrm{rev}((x, \mathrm{append}(xs', ys))) = \mathrm{append}(\mathrm{rev}(\mathrm{append}(xs', ys)), [x])\\
&= \mathrm{append}(\mathrm{append}(\mathrm{rev}(ys), \mathrm{rev}(xs')), [x]) \quad\text{(hypothesis)}\\
&= \mathrm{append}(\mathrm{rev}(ys), \mathrm{append}(\mathrm{rev}(xs'), [x])) \quad\text{(Lemma 2)}\\
&= \mathrm{append}(\mathrm{rev}(ys), \mathrm{rev}((x, xs'))),
\end{aligned}
$$

where $[x]$ abbreviates $(x, \mathrm{None})$. Every step is substitution of equals for equals, valid because the functions are pure.
:::
:::

::: exercise Symbolic differentiation {level=3}
Write a pure function `d(e, x)` returning the derivative of an expression of [[#ex-expr]] with respect to the variable named `x`, using $\frac{d}{dx}c = 0$, $\frac{d}{dx}x = 1$, $\frac{d}{dx}y = 0$ for other variables, the sum rule and the product rule $(uv)' = u'v + uv'$. Apply `simplify` to the result, and test the derivative of $x \cdot x + 3 \cdot x$ at $x = 5$ against the value $2x + 3 = 13$.
::: solution
```python
# (Num, Var, Add, Mul, evaluate and simplify as in expr.py)
def d(e, x):
    match e:
        case Num(_):    return Num(0)
        case Var(name): return Num(1) if name == x else Num(0)
        case Add(l, r): return Add(d(l, x), d(r, x))
        case Mul(l, r): return Add(Mul(d(l, x), r), Mul(l, d(r, x)))

e = Add(Mul(Var("x"), Var("x")), Mul(Num(3), Var("x")))
de = simplify(d(e, "x"))
print(de)
print(evaluate(de, {"x": 5}))
```

Run after the definitions of `expr.py`, this prints

```text
Add(left=Add(left=Var(name='x'), right=Var(name='x')), right=Num(value=3))
13
```

The raw derivative is $(1\cdot x + x\cdot 1) + (0 \cdot x + 3 \cdot 1)$; `simplify` removes the ones and the zero product, giving $(x + x) + 3$, which at $x = 5$ is $13$. `d` has exactly the template of `evaluate`: one case per kind of node, recursion on the sub-expressions. A proof that `d` is correct — that its result evaluates to the derivative of the original, as a function of $x$ — is a structural induction using the sum and product rules of calculus.
:::
:::
