A nightly job reads a price list from a spreadsheet export and computes the average price. It has run correctly for months. Then someone edits the spreadsheet, a column is formatted as text, and the job fails at three in the morning with `TypeError: unsupported operand type(s) for +: 'int' and 'str'` — deep inside `sum`, far from the line that read the file. The bug was there all along, in the sense that nothing in the program said that the prices had to be numbers; it simply had never been triggered.

A **type** describes what kind of value a name may hold, and a **type checker** examines a program *before* it runs to find operations applied to the wrong kind of value. Python checks types while the program runs; with **type annotations** and a separate checker it can also check them in advance. This chapter is about what types are, the difference between checking them statically and dynamically, how to annotate Python programs, and the three ideas that make types expressive enough for real designs: **generics**, which let one definition work for many types; **interfaces**, nominal and structural, which describe what an object must be able to do; and **variance**, which decides when a container or function of one type may stand in for another. Types are the part of a specification ([[program-design/abstraction-specifications]]) that a machine can check completely.

## Types and type errors

::: definition Type, type error {#def-type}
A **type** is a set of values together with the operations defined on them: `int` is the integers with `+`, `*`, `//` and so on; `str` is the strings with concatenation, indexing and `.upper()`. A **type error** is an attempt to apply an operation to a value outside the set for which it is defined, such as adding an integer to a string or calling `.upper()` on `None`.
:::

Languages differ in *when* they detect type errors and in *how strictly* they treat them.

- **Dynamic typing:** types belong to values, and each operation checks the types of its operands when it executes. Python, JavaScript, Ruby and Lisp are dynamically typed. A type error is detected only if the faulty line actually runs.
- **Static typing:** types also belong to names and expressions in the program text, and a **type checker** (usually part of the compiler) verifies before execution that every operation will receive operands of suitable types. Java, C, C++, Rust, Haskell and OCaml are statically typed.

Independently, a language is **strongly typed** if operations never silently reinterpret values of the wrong type, and **weakly typed** if they convert or reinterpret them implicitly. Python is dynamically but strongly typed: `"3" + 4` raises `TypeError`. JavaScript is dynamically and more weakly typed: `"3" * 2` is `6` and `"3" + 4` is `"34"`, by implicit conversions in opposite directions. C is statically typed, but casts and unions let a program reinterpret the bytes of a value as another type ([[computer-systems/c-programming]]). The terms "strong" and "weak" are informal, and it is more precise to ask which conversions a language performs implicitly.

Static checking has a cost as well as a benefit: it must reject some programs that would never actually fail.

::: proposition No perfect type checker {#prop-no-perfect-checker}
No algorithm can decide, for every Python program, whether running it will ever raise a `TypeError`. Consequently any static type checker either rejects some programs that would never raise one, or accepts some programs that would.
:::

::: proof
Suppose an algorithm $D$ decided it. Given any program $P$ (without input), construct the program $Q$:

```text
try:
    P                      # run P, swallowing any exception it raises
except BaseException:
    pass
1 + "a"                    # reached exactly when P terminates
```

$Q$ raises a `TypeError` at its last line if $P$ terminates (normally or by an exception), and otherwise runs for ever without reaching that line; no other line of $Q$ can let a `TypeError` escape. So $D(Q)$ would tell us whether $P$ halts, deciding the halting problem, which is impossible ([[theory-of-computation]]). The second sentence follows: a checker that accepted exactly the programs that never raise a `TypeError` would be such an algorithm.
:::

So every static type system is **conservative**: it accepts the programs it can prove safe by simple, local rules, and rejects the rest, including some correct ones. A **sound** type system guarantees that accepted programs never commit the type errors it rules out — Robin Milner's slogan for ML was "well-typed programs cannot go wrong" — and a well-designed one rejects few programs that a programmer would want to write.

## Type annotations in Python

Since Python 3.5 (PEP 484, 2014) a program can state the types it expects with **annotations**: `name: T` for a variable or parameter and `-> T` for a function's result. The language itself ignores them at run time; separate tools such as mypy, Pyright and Pyre read them and check the program statically. The common forms are:

| annotation | meaning |
|---|---|
| `int`, `float`, `str`, `bool`, `None` | the built-in types (for the result type, `None` means "returns nothing") |
| `list[int]`, `dict[str, float]`, `set[str]`, `tuple[int, str]` | containers with element types; `tuple[int, ...]` is a tuple of any length |
| `int \| None`, `int \| str` | a **union**: either type |
| `Callable[[int, str], bool]` | a function from an `int` and a `str` to a `bool` (from `collections.abc`) |
| `Iterable[T]`, `Iterator[T]`, `Sequence[T]`, `Mapping[K, V]` | interfaces from `collections.abc` |
| `Any` | the unknown type: anything goes, nothing is checked |

::: example Checking the price program {#ex-mypy-prices}
Annotate an `average` function and run mypy on a program with two bugs: a list of strings passed as numbers, and a possibly missing dictionary value used in arithmetic.
::: solution
```python
def average(xs: list[float]) -> float:
    return sum(xs) / len(xs)

prices = {"tea": 2.5, "scone": 3.0}
print(average(list(prices.values())))
print(average(["2.5", "3.0"]))
discount = prices.get("cake")
print(discount * 2)
```

```console
$ mypy prices.py
prices.py:6: error: List item 0 has incompatible type "str"; expected "float"  [list-item]
prices.py:6: error: List item 1 has incompatible type "str"; expected "float"  [list-item]
prices.py:8: error: Unsupported operand types for * ("None" and "int")  [operator]
prices.py:8: note: Left operand is of type "float | None"
Found 3 errors in 1 file (checked 1 source file)
```

```console
$ python3 prices.py
2.75
Traceback (most recent call last):
  File ".../prices.py", line 6, in <module>
    print(average(["2.5", "3.0"]))
          ~~~~~~~^^^^^^^^^^^^^^^^
  File ".../prices.py", line 2, in average
    return sum(xs) / len(xs)
           ~~~^^^^
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

mypy (version 2.4, as of 2026; messages vary slightly between versions) reports both bugs without running anything, at the line where the mistake is made. Running the program finds only the first, inside `sum`, after printing one correct result. The second bug is subtle: `dict.get` returns `None` for a missing key, so its type is `float | None`; mypy *infers* that type for `discount` without any annotation and then sees that `None * 2` is not defined. Python would have found that bug only on a run in which the cake was missing.
:::
:::

A union like `str | None` must be **narrowed** before the operations of `str` can be used. Type checkers understand the usual tests — `if x is None:`, `isinstance(x, str)`, an early `return` — and treat `x` as `str` in the code they guard:

```python
def describe(name: str | None) -> str:
    if name is None:
        return "anonymous"
    return name.upper()              # here name: str

def shout(name: str | None) -> str:
    return name.upper()              # name may still be None
```

```console
$ mypy narrowing.py
narrowing.py:7: error: Item "None" of "str | None" has no attribute "upper"  [union-attr]
Found 1 error in 1 file (checked 1 source file)
```

The famous "null reference" error — `AttributeError: 'NoneType' object has no attribute ...` in Python, `NullPointerException` in Java — is a type error that type systems without explicit optional types cannot catch, because they let every reference be null. Making "might be missing" part of the type, as `str | None` does, moves that class of bug from run time to checking time.

::: warning Annotations are not checked at run time
Python does not enforce annotations. With `def double(n: int) -> int: return n * 2`, the call `double("ab")` runs and returns `"abab"`; only a static checker reports it. Annotations are also not conversions: `n: int = input()` leaves `n` a string. Data that crosses the boundary of a program — user input, files, network messages, JSON — has whatever type it has, and must be validated at run time (`int(s)`, schema validation) before it is trusted. Static types describe the program's own code, not the world it reads.
:::

::: quiz
Which of these lines does mypy reject, given `def f(x: float) -> str: ...`?
- [ ] `f(3)` — an `int` argument
- [x] `y: int = f(2.0)`
- [ ] `f(True)`
- [x] `f(None)`
::: solution
The result of `f` is a `str`, so assigning it to an `int` variable is an error, and `None` is not a `float`. By a special rule of PEP 484, an `int` is accepted where a `float` is expected (although `int` is not a subclass of `float` at run time), and `bool` is a subclass of `int`, so `f(3)` and `f(True)` are accepted.
:::
:::

## Generics

A function that returns the first element of a list works for lists of anything. Annotating it as `def first(xs: list[Any]) -> Any` would throw away information: the checker could no longer tell that `first(["a", "b"])` is a string. What we want to say is "for every type $T$, `first` takes a `list[T]` and returns a `T`".

::: definition Generic function and generic class {#def-generic}
A **generic** definition has **type parameters** — variables that stand for types — and can be used at every type obtained by substituting actual types for them. In Python (3.12 and later) the parameters are written in square brackets after the name: `def first[T](xs: list[T]) -> T` and `class Stack[T]: ...`. Using a generic at particular types is **instantiation**: `Stack[int]` is a stack of integers, and a call `first(["a", "b"])` instantiates `T` to `str`, a choice the checker **infers** from the arguments.
:::

This is the **parametric polymorphism** mentioned in [[program-design/inheritance-polymorphism]]: one definition, uniformly valid for all types.

::: example A generic stack {#ex-generic-stack}
Write a stack class generic in its element type and a generic function returning the first element of a list, and see which misuses mypy reports.
::: solution
```python
class Stack[T]:
    """A LIFO stack of elements of type T."""
    def __init__(self) -> None:
        self._items: list[T] = []
    def push(self, x: T) -> None:
        self._items.append(x)
    def pop(self) -> T:
        return self._items.pop()

def first[T](xs: list[T]) -> T:
    return xs[0]

s = Stack[int]()
s.push(1)
s.push("two")
n: int = s.pop()
w: str = first(["a", "b"])
z: int = first(["a", "b"])
```

```console
$ mypy generic.py
generic.py:15: error: Argument 1 to "push" of "Stack" has incompatible type "str"; expected "int"  [arg-type]
generic.py:18: error: Incompatible types in assignment (expression has type "str", variable has type "int")  [assignment]
Found 2 errors in 1 file (checked 1 source file)
```

The checker knows that `s.pop()` returns an `int` because `s` is a `Stack[int]`, and that `first(["a", "b"])` is a `str` because `T` was instantiated to `str`. Neither error would be noticed by Python when the program runs: `s.push("two")` succeeds and the stack simply holds a string. (Before Python 3.12, type parameters were declared with `T = TypeVar("T")` and generic classes derived from `Generic[T]`; you will see both styles.)
:::
:::

A type parameter can be **bounded**, restricting it to types that support some operation: `def largest[T: SupportsRichComparison](xs: list[T]) -> T` would accept lists of anything that can be compared with `<`. Generic code may only use the operations that every permitted type supports — for an unbounded `T`, only those of `object`. That restriction is what makes the definition valid at every instantiation.

::: warning Generic types are erased at run time
The type arguments exist only for the checker. At run time, `Stack[int]()` and `Stack[str]()` create objects of the same class, and `isinstance(x, list[int])` raises `TypeError: isinstance() argument 2 cannot be a parameterized generic` — the list object does not record its element type, and checking it would mean inspecting every element. Java makes the same choice (type erasure, since Java 5 in 2004); C++ templates and Rust generics instead compile a separate copy of the code for each instantiation.
:::

## Interfaces: nominal and structural

An **interface** is a named collection of operations, with their types, that a value must provide. A function annotated to take an interface accepts any value that provides those operations. Type systems decide *which* values provide an interface in one of two ways.

::: definition Nominal and structural subtyping {#def-subtyping}
A type $S$ is a **subtype** of a type $T$, written $S <: T$, if a value of type $S$ may be used wherever a value of type $T$ is expected. In **nominal** subtyping, $S <: T$ holds only if it has been *declared*, for instance by `class S(T)`. In **structural** subtyping, $S <: T$ holds whenever $S$ *has* all the operations of $T$ with compatible types, whether or not anyone declared it.
:::

Java and C# interfaces, and Python's abstract base classes, are nominal: a class implements an interface by saying so. Go interfaces and TypeScript object types are structural. Python offers both: ordinary classes and ABCs are nominal, while a **protocol** (PEP 544, Python 3.8) is a structural interface — the static form of duck typing.

::: example A structural interface {#ex-protocol}
Define a protocol for "has an area", and check a function that totals areas against classes that do and do not satisfy it, none of which inherits from the protocol.
::: solution
```python
from collections.abc import Sequence
from typing import Protocol
import math

class HasArea(Protocol):
    def area(self) -> float: ...

class Circle:                        # no base class mentions HasArea
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return math.pi * self.r ** 2

class Square:
    def __init__(self, side: float) -> None:
        self.side = side
    def area(self) -> float:
        return self.side ** 2

class Label:
    def __init__(self, text: str) -> None:
        self.text = text

def total_area(shapes: Sequence[HasArea]) -> float:
    return sum(s.area() for s in shapes)

print(round(total_area([Circle(1), Square(2)]), 4))
print(total_area([Square(1), Label("hi")]))
```

```console
$ mypy protocol.py
protocol.py:28: error: List item 1 has incompatible type "Label"; expected "HasArea"  [list-item]
Found 1 error in 1 file (checked 1 source file)
```

`Circle` and `Square` satisfy `HasArea` because they have an `area` method returning a `float`; `Label` does not, and mypy says so before the program runs (run anyway, it prints `7.1416` and then fails with `AttributeError: 'Label' object has no attribute 'area'`).
:::
:::

Structural typing suits Python, where code has always been written against "anything with an `area` method": the protocol documents that expectation and makes it checkable, without forcing every class to inherit from a common base. Nominal typing has its own advantage: a declaration records an *intention*, so a class that happens to have a method called `area` measuring something else (the field of [[program-design/inheritance-polymorphism]], in square metres) is not accidentally accepted.

The subtype relation is a **preorder** — every type is a subtype of itself, and subtyping is transitive — and between distinct named classes it is a **partial order**, since two different classes cannot each inherit from the other.

::: widget relation
set: bool; int; str; object
pairs: bool,bool; int,int; str,str; object,object; bool,int; bool,object; int,object; str,object
view: properties
name: <:
caption: The subtype relation $S <: T$ on four Python types: `bool` is a subclass of `int`, and every class is a subclass of `object`. The relation is reflexive, antisymmetric and transitive — a partial order. Remove the pair $(bool, object)$ and transitivity fails, since $bool <: int <: object$; a checker never needs to be told that pair, because it is implied.
:::

## Variance

If `Circle <: Shape`, is `list[Circle] <: list[Shape]`? It seems obvious that a list of circles is a list of shapes, but it is not.

::: example Why lists are invariant {#ex-invariant}
Show a program that would put a rectangle into a list of circles if `list[Circle]` were a subtype of `list[Shape]`, and see what mypy says. Then show that a read-only `Sequence[Circle]` can safely be used as a `Sequence[Shape]`.
::: solution
```python
from collections.abc import Sequence

class Shape:
    def area(self) -> float:
        return 0.0

class Circle(Shape):
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return 3.14159 * self.r ** 2

class Rect(Shape):
    def __init__(self, w: float, h: float) -> None:
        self.w, self.h = w, h
    def area(self) -> float:
        return self.w * self.h

def add_unit_square(shapes: list[Shape]) -> None:
    shapes.append(Rect(1, 1))        # fine for a list of shapes

def total(shapes: Sequence[Shape]) -> float:
    return sum(s.area() for s in shapes)

circles: list[Circle] = [Circle(1), Circle(2)]
print(total(circles))
add_unit_square(circles)
print([c.r for c in circles])
```

```console
$ mypy variance.py
variance.py:27: error: Argument 1 to "add_unit_square" has incompatible type "list[Circle]"; expected "list[Shape]"  [arg-type]
variance.py:27: note: "list" is invariant -- see https://mypy.readthedocs.io/en/stable/common_issues.html#variance
variance.py:27: note: Consider using "Sequence" instead, which is covariant
Found 1 error in 1 file (checked 1 source file)
```

`add_unit_square` is correct for a `list[Shape]`: appending a rectangle to a list of shapes keeps it a list of shapes. If a `list[Circle]` were accepted, the call would put a `Rect` into `circles`, and the next line — correct for a list of circles — would fail with `AttributeError: 'Rect' object has no attribute 'r'`, which is what happens if you run the program anyway. A list can be both read and written, and writing a `Shape` is safe only into a list whose element type is at least `Shape`. `total`, which only reads, is accepted with `Sequence[Shape]`: every element read from a sequence of circles is a circle and hence a shape.
:::
:::

::: definition Variance {#def-variance}
Let $C[T]$ be a generic type and $S <: T$. Then $C$ is

- **covariant** if $C[S] <: C[T]$ (it varies in the same direction): read-only containers such as `Sequence`, `Iterable`, `Iterator`, `tuple` and `frozenset`, and function results;
- **contravariant** if $C[T] <: C[S]$ (the opposite direction): function arguments;
- **invariant** if neither holds in general: mutable containers such as `list`, `dict` and `set`.
:::

The rule for functions is the same reasoning applied to a single call. `Callable[[Shape], float] <: Callable[[Circle], float]`: a function that can measure *any* shape can certainly be used where a function measuring circles is expected — a function demanding less of its argument is more widely usable. The converse fails:

```python
from collections.abc import Callable

class Shape:
    def area(self) -> float:
        return 0.0

class Circle(Shape):
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return 3.0 * self.r ** 2

def apply_to_circles(f: Callable[[Circle], float], cs: list[Circle]) -> list[float]:
    return [f(c) for c in cs]

def apply_to_shapes(f: Callable[[Shape], float], ss: list[Shape]) -> list[float]:
    return [f(s) for s in ss]

def any_area(s: Shape) -> float:
    return s.area()

def radius(c: Circle) -> float:
    return c.r

print(apply_to_circles(any_area, [Circle(1)]))
print(apply_to_shapes(radius, [Shape()]))
```

```console
$ mypy callables.py
callables.py:26: error: Argument 1 to "apply_to_shapes" has incompatible type "Callable[[Circle], float]"; expected "Callable[[Shape], float]"  [arg-type]
Found 1 error in 1 file (checked 1 source file)
```

`radius` requires a circle; `apply_to_shapes` would pass it a plain `Shape`, which has no radius. This is exactly the rule for specifications from [[program-design/abstraction-specifications#def-stronger]] and the substitution principle of [[program-design/inheritance-polymorphism#def-lsp]], restated for types: a substitute may *weaken* what it requires (contravariant arguments) and *strengthen* what it guarantees (covariant results).

::: theorem Variance of function types {#thm-function-variance}
If $A' <: A$ and $R <: R'$, then $\mathrm{Callable}[[A], R] <: \mathrm{Callable}[[A'], R']$. In words: function types are contravariant in their argument type and covariant in their result type.
:::

::: proof
Let $f$ have type $\mathrm{Callable}[[A], R]$ and consider any context that expects a function $g$ of type $\mathrm{Callable}[[A'], R']$. Such a context can do only one thing with $g$: call it with an argument $a$ of type $A'$ and use the result as a value of type $R'$. Substitute $f$ for $g$. The argument $a$ has type $A'$, and $A' <: A$, so $a$ may be used where an $A$ is expected; hence the call $f(a)$ is type-correct. Its result has type $R$, and $R <: R'$, so it may be used where an $R'$ is expected. Every use the context makes of $g$ is therefore valid for $f$, which is the definition of $\mathrm{Callable}[[A], R] <: \mathrm{Callable}[[A'], R']$.
:::

A mutable container behaves like a pair of functions: a getter `get: () -> T`, covariant in $T$, and a setter `set: T -> None`, contravariant in $T$. A type that must be both covariant and contravariant in $T$ can only be invariant — which is why `list` is invariant and `Sequence`, which has only the getter, is covariant.

::: application Java's covariant arrays
Java made arrays covariant in its first version (1995): a `Circle[]` can be passed where a `Shape[]` is expected. To keep the language sound, every store into an array is checked at run time, and storing a `Rect` into an array whose actual type is `Circle[]` throws `ArrayStoreException`. The generic collections added in Java 5 (2004) are invariant, like Python's `list`, with explicit "wildcards" (`List<? extends Shape>`) for the covariant, read-only use — an illustration that variance is a design decision with run-time costs when it is made unsoundly.
:::

## Gradual typing in practice

Python's annotations are **gradual**: annotated and unannotated code can be mixed freely, and the type `Any` is compatible with every type in both directions, so the checker simply stops checking where it appears. An unannotated function is treated as taking and returning `Any`. This lets a large program acquire types one module at a time, starting with the most important interfaces, and is the reason static typing could be added to Python at all. The price is that guarantees are only as strong as the annotations: a value of type `Any` flowing into annotated code can carry any type with it, unnoticed.

Some guidelines for designing with types:

- Annotate **interfaces** first: function signatures, especially of public functions and class methods. Types of local variables are usually inferred.
- Accept the most general type that works (`Iterable[T]` rather than `list[T]` for a function that only loops; a protocol rather than a concrete class) and return the most specific type that is true (`list[int]` rather than `Iterable[int]`, so callers can index it). This is covariance and contravariance put to work.
- Make the absence of a value explicit (`T | None`) and narrow it once, near where it arises.
- Prefer types that make illegal states unrepresentable: a frozen data class with fields of definite types, or a union of node classes as in the expression trees of [[program-design/functional-style]], rather than a dictionary of anything.

::: history
FORTRAN (1957) distinguished integer and floating-point variables by their initial letter, and ALGOL 60 declared types explicitly. Roger Hindley (1969) and Robin Milner ("A theory of type polymorphism in programming", 1978) showed how to infer the most general polymorphic type of a program automatically, the basis of ML and Haskell; independently Jean-Yves Girard (1972) and John Reynolds (1974) formulated System F, the theory of explicit type parameters. Luca Cardelli and Peter Wegner's survey "On understanding types, data abstraction, and polymorphism" (*Computing Surveys*, 1985) classified the kinds of polymorphism used in this course. Java gained generics in 2004. Jeremy Siek and Walid Taha named and formalised **gradual typing** in 2006; Jukka Lehtosalo began mypy around 2012, and PEP 484 (2014) brought type hints to Python 3.5, followed by protocols (PEP 544, Python 3.8) and the bracket syntax for type parameters (PEP 695, Python 3.12, 2023).
:::

## Where this leads

[[program-design/modules-patterns]] uses protocols and generics to describe the interfaces between modules. In [[programming-languages]], type systems are defined formally, with typing rules and a proof of soundness (progress and preservation), and type inference is studied as an algorithm; [[compilers]] implements a type checker as one pass of a compiler. The undecidability argument in [[#prop-no-perfect-checker]] is an instance of Rice's theorem in [[theory-of-computation]], and in [[software-engineering]] type checking joins testing and code review as a routine quality gate.

::: summary
- A **type** is a set of values with their operations; a **type error** applies an operation outside it ([[#def-type]]). Python checks types **dynamically** and **strongly**; static checkers such as mypy check annotated Python before it runs.
- No checker can decide exactly which programs raise type errors ([[#prop-no-perfect-checker]]); sound static type systems are conservative.
- Annotations (`list[int]`, `str | None`, `Callable[[int], bool]`) are ignored at run time; unions must be **narrowed** before use, which moves "null" errors to checking time.
- **Generics** (`def first[T](xs: list[T]) -> T`, `class Stack[T]`) give parametric polymorphism; type arguments are erased at run time ([[#def-generic]]).
- **Nominal** subtyping is declared, **structural** subtyping (protocols) follows from the operations a type has ([[#def-subtyping]]).
- **Variance**: read-only containers and results are covariant, arguments contravariant, mutable containers invariant ([[#def-variance]], [[#thm-function-variance]]) — the substitution principle for types.
- Typing in Python is **gradual**: annotate interfaces, accept general types, return specific ones, and validate external data at run time.
:::

## Exercises

::: exercise Which raise TypeError? {level=1 check="2"}
How many of these Python expressions raise `TypeError`: `"3" + 4`, `"3" * 2`, `[1] * 3`, `1 + True`, `None + 1`, `(1, 2) + (3,)`? (Enter the number.)
::: solution
`"3" + 4` raises (no addition of `str` and `int`). `"3" * 2` is `"33"` (repetition) and `[1] * 3` is `[1, 1, 1]`. `1 + True` is `2`, since `bool` is a subclass of `int`. `None + 1` raises. `(1, 2) + (3,)` concatenates tuples, giving `(1, 2, 3)`. Two expressions raise.
:::
:::

::: exercise Annotate {level=1}
Add annotations to: (a) `def mean(xs): return sum(xs) / len(xs)`; (b) `def lookup(d, k): return d.get(k)` for a dictionary from strings to integers; (c) `def apply_twice(f, x): return f(f(x))`, as generally as possible.
::: solution
(a) `def mean(xs: Sequence[float]) -> float` (a `Sequence` because `len` is needed; `list[float]` would also do, less generally). (b) `def lookup(d: dict[str, int], k: str) -> int | None` — `get` returns `None` for a missing key, and the result type must say so. (c) `def apply_twice[T](f: Callable[[T], T], x: T) -> T`: `f` must accept its own result, so its argument and result types are the same type parameter.
:::
:::

::: exercise What does the checker infer? {level=1}
For `def first[T](xs: list[T]) -> T`, what type does mypy infer for `first([1, 2])`, `first([[1], [2, 3]])` and `first([1, "a"])`?
::: solution
`int`; `list[int]`; and for the mixed list, the element type is inferred as the join of `int` and `str`, which mypy reports as `object` (Pyright reports `int | str`). In the last case, almost nothing can be done with the result without narrowing, which is the checker's way of saying that a list of mixed types gives the reader little to rely on.
:::
:::

::: exercise Variance by example {level=2 check="3"}
With `bool <: int`, how many of these assignments are accepted by a sound checker? (a) a `list[bool]` value to a variable of type `list[int]`; (b) a `Sequence[bool]` value to `Sequence[int]`; (c) a `Callable[[int], bool]` value to `Callable[[bool], int]`; (d) a `Callable[[bool], bool]` value to `Callable[[int], int]`; (e) a `tuple[bool, bool]` value to `tuple[int, int]`. (Enter the number.)
::: solution
(a) No: `list` is invariant, and through the `list[int]` alias one could append `2` to a list of Booleans. (b) Yes: `Sequence` is covariant. (c) Yes: the argument type goes from `int` to `bool` (contravariance needs $bool <: int$ ✓) and the result from `bool` to `int` (covariance needs $bool <: int$ ✓). (d) No: the function only accepts Booleans, but the variable's type promises it can be called with any integer. (e) Yes: tuples are immutable, hence covariant. Three are accepted: (b), (c) and (e).
:::
:::

::: exercise A generic pairing function and a protocol {level=2}
(a) Write a generic function `pairs(xs, ys)` with two type parameters that returns the list of pairs `(x, y)` of corresponding elements, annotated so that `pairs([1, 2], ["a", "b"])` has type `list[tuple[int, str]]`. (b) Write a protocol `SupportsClose` with a method `close(self) -> None`, and a function `close_all` that closes every object in an iterable of such objects. Which standard objects satisfy it?
::: solution
```python
from collections.abc import Iterable
from typing import Protocol

def pairs[T, U](xs: list[T], ys: list[U]) -> list[tuple[T, U]]:
    return list(zip(xs, ys))

class SupportsClose(Protocol):
    def close(self) -> None: ...

def close_all(things: Iterable[SupportsClose]) -> None:
    for t in things:
        t.close()

print(pairs([1, 2], ["a", "b"]))
```

```console
$ python3 pairs.py
[(1, 'a'), (2, 'b')]
```

(The standard library already has `typing.SupportsAbs`, `SupportsInt` and similar protocols, and `contextlib.closing` relies on the same structural idea at run time.) File objects, sockets and generators all have a `close()` method returning `None`, so all satisfy `SupportsClose` structurally, although they share no base class that declares it.
:::
:::

::: exercise Runtime checks of generic types {level=2}
A colleague writes `if isinstance(data, list[int]): ...` to validate data loaded from a JSON file. Explain why this fails, and write a function `is_int_list(x: object) -> bool` that performs the intended check. Why can a static checker use your function's result to narrow `x` only if it is declared with `TypeGuard[list[int]]` (or `TypeIs`) as its return type?
::: solution
Generic type arguments are erased: a list object does not record an element type, so Python refuses `isinstance` with a parameterised generic (`TypeError: isinstance() argument 2 cannot be a parameterized generic`). The check must examine the elements:

```python
def is_int_list(x: object) -> bool:
    return isinstance(x, list) and all(type(e) is int for e in x)

print(is_int_list([1, 2]), is_int_list([1, "2"]), is_int_list([True]), is_int_list((1,)))
```

```console
$ python3 isintlist.py
True False False False
```

(`type(e) is int` excludes `True`, which `isinstance(e, int)` would accept.) A checker treats a function returning `bool` as opaque: it cannot know that `True` means "`x` is a `list[int]`". Declaring the return type as `TypeGuard[list[int]]` (PEP 647) or `TypeIs[list[int]]` (PEP 742) is a promise, made by the programmer and not verified, that it does; the checker then narrows `x` in the `if` branch. This is a small, explicit hole in soundness, placed where a run-time check fills it.
:::
:::

::: exercise Mutable containers must be invariant {level=3}
Model a mutable cell of type $\mathrm{Cell}[T]$ by its two operations $\mathit{get}\colon () \to T$ and $\mathit{set}\colon T \to \mathrm{None}$. Using [[#thm-function-variance]], prove that if $S <: T$ and $S \ne T$, then neither $\mathrm{Cell}[S] <: \mathrm{Cell}[T]$ nor $\mathrm{Cell}[T] <: \mathrm{Cell}[S]$ can be justified, and give for each direction a two-line program that would go wrong. Assume that subtyping of records of operations requires subtyping of each operation.
::: solution
$\mathrm{Cell}[S] <: \mathrm{Cell}[T]$ would need $\mathit{get}_S <: \mathit{get}_T$, i.e. $\mathrm{Callable}[[], S] <: \mathrm{Callable}[[], T]$, which holds by covariance of results since $S <: T$; and $\mathit{set}_S <: \mathit{set}_T$, i.e. $\mathrm{Callable}[[S], \mathrm{None}] <: \mathrm{Callable}[[T], \mathrm{None}]$, which by contravariance needs $T <: S$ — false, since $S <: T$, $S \ne T$ and subtyping between distinct types is antisymmetric. Program: given `c: Cell[bool]`, view it as `d: Cell[int]` and `d.set(2)`; then `c.get()` returns `2`, not a `bool`.

$\mathrm{Cell}[T] <: \mathrm{Cell}[S]$ would need $\mathit{get}_T <: \mathit{get}_S$, i.e. $T <: S$ — false again. Program: given `c: Cell[int]` holding `2`, view it as `d: Cell[bool]`; then `d.get()` claims to return a `bool` and returns `2`.

Each operation alone is fine in one direction; together they force invariance. Read-only views (only `get`) are covariant and write-only views (only `set`) contravariant — which is how Java's `? extends T` and `? super T` wildcards split a list into its two halves.
:::
:::

::: exercise Specifications and function subtyping {level=3}
A function type $\mathrm{Callable}[[A], R]$ can be read as a specification: requires "the argument is in $A$", effects "the result is in $R$". Show that [[#thm-function-variance]] is a special case of the refinement relation of [[program-design/abstraction-specifications#def-stronger]], by checking its two conditions. What does the comparison suggest about how much a type can say about a function compared with a full specification?
::: solution
Let $S_1$ be the specification of $\mathrm{Callable}[[A'], R']$: $P_1(x) \equiv x \in A'$ and $Q_1(x, y) \equiv y \in R'$; and $S_2$ that of $\mathrm{Callable}[[A], R]$: $P_2(x) \equiv x \in A$, $Q_2(x, y) \equiv y \in R$. Reading types as sets of values and $<:$ as $\subseteq$: condition 1 of refinement, $P_1 \Rightarrow P_2$, says $A' \subseteq A$, i.e. $A' <: A$; condition 2, $Q_2 \Rightarrow Q_1$ on inputs satisfying $P_1$, says $R \subseteq R'$, i.e. $R <: R'$. These are exactly the hypotheses of the theorem, and its conclusion, that $f$ may replace $g$, is the substitution theorem of [[program-design/abstraction-specifications]].

A type is thus a specification whose pre- and postconditions are restricted to membership in sets that the checker understands. It can say "returns an `int`" but not "returns the integer square root", "the list is sorted" or "the result is non-negative". That restriction is what makes type checking decidable for each program in a conservative way, and it is why types complement, rather than replace, specifications and tests. Richer type systems (refinement types, dependent types in languages such as Agda, Idris and Lean) push more of the specification into the type, at the cost of harder checking.
:::
:::
