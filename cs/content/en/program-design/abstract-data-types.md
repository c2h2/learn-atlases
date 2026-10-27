Suppose a program works with fractions — exact rational arithmetic for a spreadsheet, say, or probabilities that must not suffer from rounding. The first version stores a fraction as a pair `(n, d)` and every part of the program that needs a fraction manipulates the pair directly: `(a[0] * b[1] + b[0] * a[1], a[1] * b[1])` here, `a[0] * b[1] == b[0] * a[1]` there. It works. Then someone notices that the numbers in long computations grow without bound, because nothing ever reduces $2/4$ to $1/2$, and that printing $\tfrac{-1}{-2}$ looks silly. Fixing it means finding every line of the program that builds or inspects a pair — and every one of them is now a place where the fix can be forgotten.

The program went wrong long before the bug: it let every part of itself know how fractions are *represented*. This chapter is about the alternative, the **abstract data type**: a type known to its users only through a set of operations and their specifications, with the representation hidden behind them. We build rationals and integer sets that way, learn the two tools for reasoning about an implementation — the **representation invariant** and the **abstraction function** — and see how a type can be specified without mentioning any representation at all, by equations between its operations.

## Interface and representation

[[data-structures/stacks-queues]] introduced the idea: an **abstract data type** is a collection of values with operations specified only by their behaviour, and a **data structure** is one way of representing it. Here we make the two sides of that boundary precise.

::: definition Abstract data type, interface, representation {#def-adt}
An **abstract data type** (ADT) consists of a set of **abstract values** and a set of **operations**, each with a specification ([[program-design/abstraction-specifications#def-spec]]) written entirely in terms of abstract values. The operations and their specifications form the type's **interface**. An **implementation** chooses a **representation** — concrete values of existing types, called **reps** — and writes each operation as code on reps. **Clients** of the type use only the interface.
:::

For rational numbers, the abstract values are the mathematical rationals $\mathbb{Q}$, and the interface might be:

- `make_rat(n, d)`: requires integers `n`, `d` with `d != 0`; returns the rational $n/d$;
- `numer(r)`, `denom(r)`: return integers $p, q$ with $q > 0$, $\gcd(p, q) = 1$ and $p/q = r$ (the lowest-terms form);
- `add_rat(x, y)`, `mul_rat(x, y)`: return $x + y$ and $xy$;
- `equal_rat(x, y)`: returns whether $x = y$; `str_rat(r)`: returns `"p/q"` for the lowest-terms form.

Note that the specifications talk about rationals, not pairs. The implementation below is the classic one from Abelson and Sussman's *Structure and Interpretation of Computer Programs*: a rational is a tuple in lowest terms with a positive denominator.

```python
from math import gcd

def make_rat(n, d):
    """Requires: ints n, d with d != 0.  Effects: returns the rational n/d."""
    if d < 0:                      # keep the sign in the numerator
        n, d = -n, -d
    g = gcd(n, d)                  # gcd(0, d) == d, so 0/d becomes 0/1
    return (n // g, d // g)

def numer(r): return r[0]
def denom(r): return r[1]

# ---- clients below this line use only make_rat, numer and denom ----
def add_rat(x, y):
    return make_rat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y))

def mul_rat(x, y):
    return make_rat(numer(x) * numer(y), denom(x) * denom(y))

def equal_rat(x, y):
    return numer(x) == numer(y) and denom(x) == denom(y)

def str_rat(r):
    return f"{numer(r)}/{denom(r)}"

half, third = make_rat(1, 2), make_rat(1, 3)
print(str_rat(add_rat(half, third)), str_rat(mul_rat(half, third)))
print(str_rat(add_rat(make_rat(1, 6), make_rat(1, 3))))
print(equal_rat(make_rat(2, 4), make_rat(-3, -6)), str_rat(make_rat(3, -9)))
```

```console
$ python3 rat.py
5/6 1/6
1/2
True -1/3
```

The comment line in the middle marks an **abstraction barrier**. Above it, three functions know that a rational is a tuple; below it, nothing does. `add_rat` computes $\frac{a}{b} + \frac{c}{d} = \frac{ad + cb}{bd}$ using only the interface, and leaves the reduction of $\frac{9}{18}$ to $\frac12$ to `make_rat`.

The payoff comes when the representation changes. Suppose profiling shows that most rationals are built and combined many times but printed rarely, so reducing at every `make_rat` is wasteful. We can store the pair unreduced and reduce in the selectors instead:

```python
from math import gcd

def make_rat(n, d):
    return (n, d)                  # store as given; reduce on demand

def numer(r):
    n, d = r
    g = gcd(n, d)
    return (n // g) if d > 0 else (-n // g)

def denom(r):
    n, d = r
    return abs(d) // gcd(n, d)

print(numer(make_rat(6, -9)), denom(make_rat(6, -9)))
```

```console
$ python3 rat2.py
-2 3
```

`add_rat`, `mul_rat`, `equal_rat` and `str_rat` — and every client that uses them — work unchanged, because they never looked inside the tuple. Whether this version is actually faster is an empirical question (the numbers inside unreduced pairs grow, making every multiplication slower); the point is that the question can be settled by trying, without touching a single client.

### Kinds of operation

Liskov and Guttag classify the operations of an ADT by what they take and return, writing $T$ for the abstract type:

- **creators** make values of $T$ from other types: `make_rat(n, d)`, `set()`, `int("42")`;
- **producers** make new values of $T$ from existing ones: `add_rat`, `str.upper`, `a + b` on lists;
- **observers** take values of $T$ and return values of other types: `numer`, `len`, `x in s`;
- **mutators** change a value of $T$ in place: `list.append`, `set.add`, `dict.pop`.

A type with no mutators is **immutable**: once created, a value never changes, and operations that seem to change it (like `str.replace`) produce a new value. Rationals as written above are immutable; Python's `int`, `str`, `tuple` and `frozenset` are immutable, and `list`, `dict` and `set` are mutable. An interface needs enough creators and producers to build every abstract value clients need, and enough observers to tell any two different values apart; a type with no observers would be useless, since nothing could ever be learned from its values.

## Representation invariants and abstraction functions

How do we know that an implementation is correct? Its operations are specified in terms of abstract values, but its code computes on reps. Two definitions, introduced by C. A. R. Hoare in 1972, connect the two worlds.

::: definition Representation invariant and abstraction function {#def-ri-af}
For an implementation of an ADT with rep type $R$ and abstract values $A$:

- the **representation invariant** $RI$ is a predicate on $R$ that is true of exactly the reps the implementation considers well formed;
- the **abstraction function** $AF$ maps each rep $r$ with $RI(r)$ to the abstract value $AF(r) \in A$ that it represents.

An operation is **correct** if, whenever its rep arguments satisfy $RI$, its results satisfy $RI$ and the abstract values $AF(\cdot)$ of its arguments and results are related as the operation's specification requires.
:::

For the first rational implementation,

$$
RI(n, d) \equiv d > 0 \land \gcd(n, d) = 1, \qquad AF(n, d) = \frac{n}{d}.
$$

For the second, the invariant is weaker — just $d \neq 0$ — and $AF$ is the same formula. Writing both down in a comment at the top of the implementation is the single most useful piece of documentation an ADT can have: the invariant tells a maintainer what every function may assume and must preserve, and the abstraction function tells them what the bits *mean*.

The abstraction function is usually **not injective**: several reps represent the same abstract value. In the second implementation $(1, 2)$, $(2, 4)$ and $(-3, -6)$ all represent $\tfrac12$. The first implementation's invariant excludes all but one rep per value, which is why its `equal_rat` may compare components.

::: widget mapping
domain: (1,2); (2,4); (-3,-6); (3,1); (6,2); (0,5); (0,1)
codomain: 1/2; 3; 0
map: (1,2)>1/2; (2,4)>1/2; (-3,-6)>1/2; (3,1)>3; (6,2)>3; (0,5)>0; (0,1)>0
editable: false
caption: The abstraction function of the unreduced representation of rationals, from reps (pairs) to abstract values. It is surjective — every rational has a rep — but not injective: three pairs represent $\tfrac12$. The invariant of the reduced representation, $d > 0 \land \gcd(n, d) = 1$, keeps only $(1,2)$, $(3,1)$ and $(0,1)$; restricted to those, $AF$ becomes a bijection, and equality of abstract values becomes equality of reps.
:::

::: warning Equality of reps is not equality of values
If $AF$ is not injective on valid reps, comparing reps component by component gives wrong answers: with the unreduced representation, `make_rat(1, 2) == make_rat(2, 4)` is `False` although both are $\tfrac12$. Every ADT needs an equality operation defined on abstract values — here $n_1 d_2 = n_2 d_1$ — and, as [[program-design/classes-objects]] shows, Python's `==` must be made to use it.
:::

::: example Equality without a canonical form {#ex-cross-equal}
Write `equal_rat` for the unreduced representation, and show that the relation it computes on reps is an equivalence relation whose classes are exactly the sets of reps with the same abstract value.
::: solution
Two reps $(a, b)$ and $(c, d)$ (with $b, d \neq 0$) represent the same rational exactly when $a/b = c/d$, that is when $ad = cb$ — a test that needs no division and no gcd:

```python
def equal_rat(x, y):
    (a, b), (c, d) = x, y
    return a * d == c * b

print(equal_rat((1, 2), (-3, -6)), equal_rat((1, 2), (2, 3)), equal_rat((0, 5), (0, -1)))
```

```console
$ python3 crosseq.py
True False True
```

Define $x \sim y$ if `equal_rat(x, y)`. Then $x \sim y \iff AF(x) = AF(y)$, and any relation of the form "$f(x) = f(y)$" is an equivalence relation: reflexive, symmetric and transitive because equality is. Its equivalence classes are the **fibres** $AF^{-1}(q)$ — all the reps of one rational $q$. So abstract values correspond one-to-one to equivalence classes of reps, which is the general way to think about a non-injective abstraction function: the implementation works on reps, but only up to $\sim$, and every observer must give equal results on equivalent reps. (`str_rat` that printed the stored pair would fail this test; that is why the unreduced version reduces in the selectors.)
:::
:::

::: widget relation
set: 1/2; 2/4; -1/-2; 1/3; 2/6; 3/1
pairs: 1/2,1/2; 2/4,2/4; -1/-2,-1/-2; 1/3,1/3; 2/6,2/6; 3/1,3/1; 1/2,2/4; 2/4,1/2; 1/2,-1/-2; -1/-2,1/2; 2/4,-1/-2; -1/-2,2/4; 1/3,2/6; 2/6,1/3
view: properties
editable: true
name: ~
caption: The relation "represents the same rational" on six unreduced reps, written $n/d$. It is reflexive, symmetric and transitive, and its three equivalence classes are the three abstract values $\tfrac12$, $\tfrac13$ and $3$. Click a matrix entry to remove a pair such as $(2/4, -1/-2)$ and watch transitivity fail: a hand-written equality that is not an equivalence relation cannot be the equality of any abstract type.
:::

### Why the invariant can be trusted

Every operation of the reduced rationals *assumes* $RI$ of its arguments — `equal_rat` is only correct for reduced reps — and *establishes* it for its results. Why should the assumption ever hold? Because clients cannot make reps any other way.

::: theorem Invariants are preserved by encapsulation {#thm-ri-preserved}
Suppose that (1) every creator returns reps satisfying $RI$; (2) every producer and mutator, given arguments satisfying $RI$, leaves all reps it returns or modifies satisfying $RI$; and (3) clients obtain and change reps only through the operations of the interface. Then every rep a client ever holds satisfies $RI$.
:::

::: proof
By induction on the number $k$ of operations of the type executed so far. When $k = 0$ the client holds no reps. Suppose every rep that exists after $k$ operations satisfies $RI$, and consider operation $k + 1$. By (3), it is an operation of the interface (clients cannot construct or change reps otherwise). If it is a creator, the new rep satisfies $RI$ by (1). If it is a producer or mutator, its arguments are reps that exist after $k$ operations, so they satisfy $RI$ by the induction hypothesis, and by (2) every rep it returns or modifies satisfies $RI$. An observer changes no rep. Reps not touched by the operation are unchanged. Hence every rep satisfies $RI$ after $k + 1$ operations.
:::

The proof shows what each operation's author must check: establish $RI$ in creators, preserve it in producers and mutators — a local check, one function at a time, in exactly the way a loop invariant is checked one iteration at a time. Hypothesis (3) is the one that can be broken from outside, and it is the reason for encapsulation.

::: example Checking an operation {#ex-addrat-correct}
Show that `add_rat` of the reduced implementation is correct in the sense of [[#def-ri-af]].
::: solution
Let $x = (a, b)$ and $y = (c, d)$ satisfy $RI$, so $b, d > 0$. `add_rat` calls `make_rat(a*d + c*b, b*d)`, and $bd > 0$, so the precondition of `make_rat` holds.

*$RI$ of the result.* `make_rat(n, e)` with $e > 0$ skips the sign change and returns $(n/g, e/g)$ with $g = \gcd(n, e) > 0$. Then $e/g > 0$, and $\gcd(n/g, e/g) = 1$ because dividing two integers by their greatest common divisor leaves coprime integers. (If $n = 0$, then $g = e$ and the result is $(0, 1)$, which also satisfies $RI$.)

*$AF$ of the result.* $AF(n/g, e/g) = \dfrac{n/g}{e/g} = \dfrac{n}{e} = \dfrac{ad + cb}{bd} = \dfrac{a}{b} + \dfrac{c}{d} = AF(x) + AF(y)$, which is what the specification of `add_rat` requires.

Notice that we never had to consider reps violating $RI$: [[#thm-ri-preserved]] guarantees that no client can pass one.
:::
:::

In code, the invariant can also be checked at run time. A function `rep_ok` that tests $RI$, called at the end of every creator, producer and mutator while testing, catches a broken operation at the moment it produces a bad rep, instead of much later when some other operation misbehaves.

```python
from math import gcd

def rep_ok(r):
    """The representation invariant of reduced rationals."""
    n, d = r
    return type(n) is int and type(d) is int and d > 0 and gcd(n, d) == 1

print(rep_ok((1, 2)), rep_ok((2, 4)), rep_ok((1, -2)), rep_ok((0, 1)), rep_ok((0, 3)))
```

```console
$ python3 repok.py
True False False True False
```

### Representation exposure

Hypothesis (3) of [[#thm-ri-preserved]] fails whenever a client gets hold of a mutable part of a rep. Here is a set of integers represented by a Python list without duplicates — an invariant that makes `remove` and `size` simple.

```python
def intset_new():      return []            # RI: no duplicates; AF: set of the elements
def intset_insert(s, x):
    if x not in s:
        s.append(x)
def intset_remove(s, x):
    if x in s:
        s.remove(x)                         # removes the first occurrence: enough, by RI
def intset_size(s):    return len(s)        # correct only because of RI
def intset_elements(s): return s            # BUG: hands out the rep itself

s = intset_new()
for x in [3, 1, 3, 2]:
    intset_insert(s, x)
print(intset_size(s))
view = intset_elements(s)
view.append(1)                              # the client "just adds" an element
print(intset_size(s))
intset_remove(s, 1)
print(intset_size(s), 1 in intset_elements(s))
```

```console
$ python3 exposure.py
3
4
3 True
```

`intset_elements` returns the very list that is the rep. The client's innocent `append` creates a duplicate, breaking $RI$; from then on `intset_size` overcounts and `intset_remove` fails to remove. The bug is in `intset_elements`, but it shows up in two other functions, after a delay — the typical signature of **representation exposure**. The fix is to return something the client cannot use to change the rep: a copy (`return list(s)`), or an immutable value (`return tuple(s)` or `frozenset(s)`). Python cannot stop a determined client from reaching inside a rep, but it is the implementer's job never to *hand* the rep out, and never to keep a mutable object that a client passed in and might still change.

::: quiz
A rep invariant for a time of day represented as an integer `m` (minutes since midnight) is $0 \le m < 1440$. Which operation is **not** correct with respect to this invariant?
- [ ] `make_time(h, mi)` that requires $0 \le h < 24$, $0 \le mi < 60$ and returns `60 * h + mi`
- [x] `add_minutes(t, k)` that returns `t + k`
- [ ] `add_minutes(t, k)` that returns `(t + k) % 1440`
- [ ] `hour(t)` that returns `t // 60`
::: solution
`t + k` can be $1440$ or more (or negative for negative `k`), violating the invariant; every later operation that assumes $0 \le m < 1440$ — `hour`, for instance, which could return $24$ — may then misbehave. Taking the result modulo $1440$ restores the invariant (Python's `%` returns a value in $[0, 1440)$ even for negative left operands). `make_time` establishes the invariant: $0 \le 60h + mi \le 60\cdot 23 + 59 = 1439$. `hour` is an observer and cannot break it.
:::
:::

## One interface, several representations

The same ADT can have implementations with very different invariants and costs. For a set of integers with operations `insert`, `contains`, `remove` and `size`, here are three, with $n$ the number of distinct elements and $m$ the length of the list:

| representation | $RI$ | `insert` | `contains` | `remove` | `size` |
|---|---|---|---|---|---|
| list, no duplicates | no element repeated | $O(n)$ (check first) | $O(n)$ | $O(n)$, first occurrence | $O(1)$ |
| list, duplicates allowed | none | $O(1)$ (just append) | $O(m)$ | $O(m)$, *every* occurrence | $O(m)$, count distinct |
| sorted list, no duplicates | strictly increasing | $O(n)$ (shift) | $O(\log n)$ (binary search) | $O(n)$ | $O(1)$ |

All three share the abstraction function "the set of elements of the list". They differ in what each operation may assume and must do. The weaker the invariant, the less the mutators must do to keep it and the more the observers must do to cope without it: with duplicates allowed, `insert` is trivial but `size` must count distinct elements and `remove` must remove every copy. The table is the reason ADTs matter in practice: a program written against the interface can switch rows when its workload changes — or switch to the hash table of [[data-structures/hash-tables]], with expected $O(1)$ for everything — without any change outside the implementation.

::: example A bug that depends on the invariant {#ex-invariant-bug}
A programmer converts the "no duplicates" implementation to "duplicates allowed" to make `insert` faster, changing only `intset_insert` to `s.append(x)`. Which other operations are now wrong, and why?
::: solution
List each operation's reliance on the old invariant.

- `intset_remove` used `s.remove(x)`, which removes only the first occurrence. With duplicates allowed, after `insert(s, 5)` twice, `remove(s, 5)` leaves a `5` behind: the abstract set still contains $5$, violating the specification. It must become `while x in s: s.remove(x)` or, better, `s[:] = [y for y in s if y != x]`.
- `intset_size` returned `len(s)`, which counts duplicates. It must become `len(set(s))` or an equivalent count of distinct elements.
- `contains` (`x in s`) is still correct: membership does not care about repeats.

The lesson is that an invariant is a contract *among the operations of the implementation*. Changing it means re-checking every operation, which is easy only if the invariant is written down.
:::
:::

## Specifying a type by equations

The specifications so far describe operations in terms of a mathematical model — rationals, sets. For some types it is more natural to say how the operations relate to *each other*. Barbara Liskov and Stephen Zilles in 1974, and John Guttag in a series of papers from 1975, proposed **algebraic specifications**: a list of the operations' signatures together with equations (axioms) that they satisfy.

::: definition Algebraic specification of a stack {#def-stack-axioms}
The immutable stack type has operations `empty()`, `push(s, x)`, `pop(s)`, `top(s)` and `is_empty(s)`, satisfying, for every stack $s$ and item $x$:

$$
\begin{aligned}
\mathit{is\_empty}(\mathit{empty}()) &= \mathit{True}, & \mathit{is\_empty}(\mathit{push}(s, x)) &= \mathit{False},\\
\mathit{top}(\mathit{push}(s, x)) &= x, & \mathit{pop}(\mathit{push}(s, x)) &= s.
\end{aligned}
$$

`top` and `pop` of `empty()` are errors: no axiom defines them, so they are outside the specification.
:::

Every stack a client can build is `empty()` followed by some pushes and pops, and the axioms are enough to evaluate any observation of it, by rewriting from the inside out. They say nothing about arrays, links or memory — exactly the information hiding we want. An implementation is correct if it satisfies all four equations.

::: example Evaluating with the axioms {#ex-stack-rewrite}
Use the axioms to find $\mathit{top}(\mathit{pop}(\mathit{push}(\mathit{push}(\mathit{empty}(), 1), 2)))$, then check an implementation by nested tuples against the axioms on random stacks.
::: solution
Let $s_1 = \mathit{push}(\mathit{empty}(), 1)$. Then $\mathit{pop}(\mathit{push}(s_1, 2)) = s_1$ by the fourth axiom, and $\mathit{top}(s_1) = \mathit{top}(\mathit{push}(\mathit{empty}(), 1)) = 1$ by the third. So the value is $1$.

An immutable implementation represents the empty stack by `None` and $\mathit{push}(s, x)$ by the pair `(x, s)`:

```python
import random

def empty():        return None
def push(s, x):     return (x, s)       # a new stack; s itself is unchanged
def is_empty(s):    return s is None
def top(s):         return s[0]
def pop(s):         return s[1]

print(top(pop(push(push(empty(), 1), 2))))

rng = random.Random(1)
def random_stack(k):
    s = empty()
    for _ in range(k):
        s = push(s, rng.randint(0, 9))
    return s

ok = True
for trial in range(1000):
    s, x = random_stack(rng.randint(0, 6)), rng.randint(0, 9)
    ok = ok and top(push(s, x)) == x and pop(push(s, x)) == s
    ok = ok and is_empty(push(s, x)) is False
print(ok and is_empty(empty()))
```

```console
$ python3 stack.py
1
True
```

The axiom $\mathit{pop}(\mathit{push}(s, x)) = s$ is satisfied in the strongest possible sense: `pop(push(s, x))` *is* the object `s`, because pushing shares the old stack instead of copying it. This sharing is safe only because no operation mutates a stack — the theme of persistent data in [[program-design/functional-style]]. A random test of the axioms is no proof, but here the proof is short: each axiom follows in one step from the definitions of the five functions.
:::
:::

::: application Axioms as tests
Algebraic laws make excellent automated tests, because they need no expected outputs: "decoding an encoding gives back the original", "sorting a sorted list changes nothing", "`pop(push(s, x)) == s`". Testing a program against such laws on many random inputs is called **property-based testing**; the Haskell library QuickCheck (Claessen and Hughes, 2000) popularised it, and Python's Hypothesis library brings it to Python. Each law is checked on hundreds of generated values, and a failure is automatically shrunk to a small counterexample.
:::

::: history
Several ideas met in the early 1970s. Simula 67, designed by Ole-Johan Dahl and Kristen Nygaard, already bundled data with the procedures that act on it in its `class` construct. In 1972 David Parnas argued in "On the criteria to be used in decomposing systems into modules" (*CACM*) that each module should hide one design decision, such as a data representation, and in the same year C. A. R. Hoare's "Proof of correctness of data representations" (*Acta Informatica*) introduced the abstraction function and the invariant used in this chapter. Barbara Liskov and Stephen Zilles's "Programming with abstract data types" (1974) named the concept and proposed language support, which Liskov's group built into the language CLU (described in 1977); John Guttag developed algebraic specifications in the same period ("Abstract data types and the development of data structures", *CACM*, 1977). Liskov received the 2008 Turing Award for this work and its consequences.
:::

## Where this leads

Writing ADTs as loose functions over tuples and lists works, but nothing stops a client from calling `r[0]` instead of `numer(r)`, and every function must be passed the rep explicitly. [[program-design/classes-objects]] packages an ADT's rep and operations together as a class, with `__init__` as the creator, methods as operations and Python's special methods making `==`, `+` and `print` use the abstract meaning. Representation invariants come back in every data structure of [[data-structures]] — the ordering of a binary search tree, the shape of a heap — and abstraction functions are the basis of the refinement proofs of [[software-engineering]].

::: summary
- An **abstract data type** is known to clients only through its interface — operations with specifications in terms of abstract values; the **representation** is hidden behind an **abstraction barrier**, so it can change without changing clients ([[#def-adt]]).
- Operations are **creators**, **producers**, **observers** and **mutators**; a type without mutators is **immutable**.
- The **representation invariant** says which reps are well formed; the **abstraction function** says which abstract value each represents. It is often not injective, so rep equality is not value equality ([[#def-ri-af]]).
- If creators establish the invariant, producers and mutators preserve it, and clients cannot touch reps, then every rep satisfies it ([[#thm-ri-preserved]]); check it at run time with `rep_ok` while testing.
- **Representation exposure** — handing out or keeping a mutable part of a rep — breaks the invariant from outside; return copies or immutable views.
- One interface can have several representations with different invariants and costs; the weaker the invariant, the more work the observers do.
- **Algebraic specifications** describe a type by equations between its operations, such as $\mathit{pop}(\mathit{push}(s, x)) = s$; such laws make good property-based tests.
:::

## Exercises

::: exercise Classify the operations {level=1}
Classify each operation as creator, producer, observer or mutator of the type named: (a) `str.upper` for `str`; (b) `len` for `list`; (c) `list.sort` for `list`; (d) `sorted` for `list` (its argument may be any iterable; its result is a list); (e) `frozenset.union` for `frozenset`; (f) `int(s)` for `int`, where `s` is a string; (g) `dict.get` for `dict`.
::: solution
(a) Producer: a new string from a string. (b) Observer: returns an `int`. (c) Mutator: sorts the list in place (and returns `None`). (d) Creator when given a non-list iterable, producer when given a list — the classification depends on the argument type; for `list` arguments it is a producer, since the original is unchanged. (e) Producer: returns a new frozenset. (f) Creator: makes an `int` from a `str`. (g) Observer: returns a stored value (of whatever type) without changing the dictionary.
:::
:::

::: exercise Many reps, one value {level=1 check="6"}
In the unreduced representation of rationals, reps are pairs $(n, d)$ of integers with $d \neq 0$. How many reps with $\abs{n} \le 6$ and $\abs{d} \le 6$ represent $\tfrac12$? (Enter the number.)
::: solution
We need $n/d = 1/2$, i.e. $d = 2n$ with $n \neq 0$. Since $\abs{d} \le 6$, $\abs{n} \le 3$, giving $n \in \{-3, -2, -1, 1, 2, 3\}$: the reps $(1,2), (2,4), (3,6), (-1,-2), (-2,-4), (-3,-6)$. Six reps. Exactly one of them, $(1, 2)$, satisfies the reduced invariant.
:::
:::

::: exercise Rewriting with the stack axioms {level=1 check="5"}
Use the axioms of [[#def-stack-axioms]] to evaluate $\mathit{top}(\mathit{pop}(\mathit{push}(\mathit{push}(\mathit{push}(\mathit{empty}(), 3), 5), 7)))$. (Enter the value.)
::: solution
Let $s = \mathit{push}(\mathit{push}(\mathit{empty}(), 3), 5)$. By $\mathit{pop}(\mathit{push}(s, x)) = s$, the argument of $\mathit{top}$ is $s$, and by $\mathit{top}(\mathit{push}(s', x)) = x$ with $s' = \mathit{push}(\mathit{empty}(), 3)$ and $x = 5$, the value is $5$.
:::
:::

::: exercise Polynomials {level=2}
A polynomial $c_0 + c_1 x + \dots + c_k x^k$ with integer coefficients is represented by the list `[c0, c1, ..., ck]`. (a) Write the abstraction function. (b) Propose a representation invariant that makes the representation of each polynomial unique, and say how the zero polynomial is represented. (c) Write `degree(p)` (with degree $-1$ for the zero polynomial, by convention) and `add(p, q)`, and explain where `add` must work to preserve the invariant.
::: solution
(a) $AF([c_0, \dots, c_k]) = \sum_{i=0}^{k} c_i x^i$, and $AF([\,]) = 0$.

(b) $RI$: the list is empty or its last element is non-zero. Without it, `[1, 2]` and `[1, 2, 0, 0]` represent the same polynomial. The zero polynomial is the empty list.

(c)

```python
def degree(p):
    return len(p) - 1            # relies on RI: no trailing zeros

def add(p, q):
    n = max(len(p), len(q))
    r = [(p[i] if i < len(p) else 0) + (q[i] if i < len(q) else 0) for i in range(n)]
    while r and r[-1] == 0:      # restore RI: x^2 + (-x^2) must not leave a 0 behind
        r.pop()
    return r

print(add([1, 2, 3], [0, 0, -3]), degree(add([1, 2, 3], [0, 0, -3])), add([5], [-5]))
```

```console
$ python3 poly.py
[1, 2] 1 []
```

The sum of two polynomials of degree $2$ can have lower degree when the leading coefficients cancel; without the trimming loop, `add` would return `[1, 2, 0]`, and `degree` — which relies on the invariant — would report $2$.
:::
:::

::: exercise Find the exposure {level=2}
This implementation of a bounded counter (an integer between `0` and a maximum) stores its rep as a list `[value, maximum]`, with invariant $0 \le value \le maximum$.

```python
def counter_new(maximum):  return [0, maximum]
def counter_inc(c):
    if c[0] < c[1]:
        c[0] += 1
def counter_state(c):      return c
```

Explain how a client can break the invariant without accessing `c` directly, and fix the implementation.
::: solution
`counter_state` returns the rep list itself, so `st = counter_state(c); st[0] = 99` sets the value above the maximum (or `st[1] = -1` makes the maximum negative) using only an interface operation. Fix it by returning immutable data: `return (c[0], c[1])`, or better, provide separate observers `counter_value(c)` and `counter_max(c)` returning the integers. (Integers are immutable, so returning them cannot expose anything.)
:::
:::

::: exercise A set with a sorted list {level=2}
Implement `intset_new`, `intset_insert`, `intset_contains` and `intset_size` for the sorted-list representation in the table above (invariant: strictly increasing), using binary search for `contains` and for finding the insertion position (Python's `bisect` module provides `bisect_left`). Explain why `intset_size` may return `len(s)`.
::: solution
```python
from bisect import bisect_left

def intset_new():
    return []                        # RI: strictly increasing; AF: set of elements

def intset_contains(s, x):
    i = bisect_left(s, x)            # first position with s[i] >= x
    return i < len(s) and s[i] == x

def intset_insert(s, x):
    i = bisect_left(s, x)
    if i == len(s) or s[i] != x:     # absent: insert at its sorted position
        s.insert(i, x)

def intset_size(s):
    return len(s)

s = intset_new()
for x in [5, 1, 4, 1, 5, 9, 2, 6]:
    intset_insert(s, x)
print(s, intset_size(s), intset_contains(s, 4), intset_contains(s, 3))
```

```console
$ python3 sortedset.py
[1, 2, 4, 5, 6, 9] 6 True False
```

`bisect_left` relies on the list being sorted, which the invariant guarantees. A strictly increasing list has no repeated element, so its length is the number of distinct elements, which is the size of the abstract set. Insertion keeps the list strictly increasing because `x` goes immediately before the first element $\ge x$ and only when that element is not $x$. `contains` costs $O(\log n)$ comparisons, while `insert` is $O(n)$ because `list.insert` shifts the later elements.
:::
:::

::: exercise Proving multiplication correct {level=3}
Prove that `mul_rat` of the reduced implementation is correct in the sense of [[#def-ri-af]]: for reps satisfying $RI$, the result satisfies $RI$ and $AF(\mathit{mul\_rat}(x, y)) = AF(x) \cdot AF(y)$. Where does your proof use the invariant of the *arguments*?
::: solution
Let $x = (a, b)$ and $y = (c, d)$ with $b, d > 0$. `mul_rat` returns `make_rat(a*c, b*d)`. Since $b > 0$ and $d > 0$, $bd > 0$: the precondition of `make_rat` ($bd \ne 0$) holds and no sign change happens. As in [[#ex-addrat-correct]], `make_rat(n, e)` with $e > 0$ returns $(n/g, e/g)$ with $g = \gcd(n, e)$, which has positive denominator and coprime components, so $RI$ holds; and $AF = \frac{n}{e} = \frac{ac}{bd} = \frac{a}{b}\cdot\frac{c}{d} = AF(x)\,AF(y)$.

The argument invariant is used only through $b, d > 0$, which guarantees $bd \neq 0$. Coprimality of the arguments is not needed, because `make_rat` reduces anyway. That observation is useful: it shows `mul_rat` would remain correct under the weaker invariant $d > 0$, which might matter if the implementation were changed to reduce lazily.
:::
:::

::: exercise Unique reps make equality easy {level=3}
Prove that, for reps satisfying the reduced invariant $RI(n, d) \equiv d > 0 \land \gcd(n, d) = 1$, the abstraction function is injective: if $n_1/d_1 = n_2/d_2$ then $n_1 = n_2$ and $d_1 = d_2$. Conclude that `equal_rat` is correct.
::: hint
From $n_1 d_2 = n_2 d_1$ deduce that $d_1$ divides $d_2$, using the fact that if $p$ divides $qr$ and $\gcd(p, q) = 1$ then $p$ divides $r$.
:::
::: solution
Suppose $n_1/d_1 = n_2/d_2$, so $n_1 d_2 = n_2 d_1$. Then $d_1$ divides $n_1 d_2$, and $\gcd(d_1, n_1) = 1$, so $d_1$ divides $d_2$ (the general form of Euclid's lemma, proved in [Maths Atlas: number theory](/learn/maths/lesson.php?c=number-theory&l=divisibility)). Symmetrically $d_2$ divides $d_1$. Two positive integers that divide each other are equal, so $d_1 = d_2$, and cancelling the non-zero $d_1$ from $n_1 d_2 = n_2 d_1$ gives $n_1 = n_2$.

`equal_rat(x, y)` returns whether the components are equal. If they are, $AF(x) = AF(y)$ trivially; if $AF(x) = AF(y)$, injectivity gives equal components. So `equal_rat` returns `True` exactly when the rationals are equal, as specified — but only for reps satisfying $RI$, which [[#thm-ri-preserved]] guarantees.
:::
:::
