A drawing program handles circles, rectangles and triangles. A first design stores a "kind" tag in every shape and writes each operation as a chain of tests:

```text
def area(s):
    if s.kind == "circle":      return pi * s.r ** 2
    elif s.kind == "rectangle": return s.w * s.h
    elif s.kind == "triangle":  return ...
```

Then `perimeter` needs the same chain, and `draw`, and `scale`, and `contains_point`. When the program gains ellipses, someone must find every chain in the program and add a branch to each; the chain they forget becomes a bug that appears only when an ellipse reaches that function. The knowledge "what a circle is" is spread across every operation instead of being in one place.

Object-oriented programming inverts the arrangement. Each kind of shape becomes a class that carries its own `area`, `perimeter` and `draw`; code that handles shapes calls `s.area()` and lets the object decide what that means. Adding ellipses means adding one class, and no existing code changes. This chapter explains the two mechanisms behind that inversion — **inheritance**, which defines a class by extending another, and **dynamic dispatch**, which selects a method by the class of the object at run time — and the principle that decides when inheritance is correct: a subclass must be usable wherever its superclass is expected. We finish with the case against overusing inheritance, and its alternative, composition.

## Subclasses and overriding

::: definition Subclass, inheritance, overriding {#def-subclass}
A class `D` defined as `class D(B):` is a **subclass** (or **derived class**) of the **base class** (or **superclass**) `B`. `D` **inherits** every attribute of `B` that it does not define itself; a method that `D` does define with the same name as a method of `B` **overrides** it. Inside a method of `D`, `super().m(...)` calls the version of `m` that would have been used if `D` had not overridden it. Every class is ultimately a subclass of the built-in class `object`.
:::

Here is the shape hierarchy. The base class `Shape` holds what all shapes share: a name, and a `describe` method written in terms of `area` and `perimeter`, which the base class cannot compute.

```python
import math

class Shape:
    """A plane figure.  Subclasses must override area() and perimeter()."""
    def __init__(self, name):
        self.name = name
    def area(self):
        raise NotImplementedError
    def perimeter(self):
        raise NotImplementedError
    def describe(self):
        return f"{self.name}: area {self.area():.2f}, perimeter {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, r):
        super().__init__("circle")        # let Shape initialise its part
        self.r = r
    def area(self):
        return math.pi * self.r ** 2
    def perimeter(self):
        return 2 * math.pi * self.r

class Rectangle(Shape):
    def __init__(self, w, h):
        super().__init__("rectangle")
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h
    def perimeter(self):
        return 2 * (self.w + self.h)

shapes = [Circle(1), Rectangle(3, 4), Circle(0.5)]
for s in shapes:
    print(s.describe())
print(round(sum(s.area() for s in shapes), 4))
print(isinstance(shapes[1], Shape), issubclass(Circle, Rectangle))
```

```console
$ python3 shapes.py
circle: area 3.14, perimeter 6.28
rectangle: area 12.00, perimeter 14.00
circle: area 0.79, perimeter 3.14
15.927
True False
```

`describe` is defined once, in `Shape`, yet it prints the right area for each shape. That is the crucial point, and it follows from the lookup rule of [[program-design/classes-objects#def-lookup]] extended to base classes.

## Dynamic dispatch

::: definition Dynamic dispatch {#def-dispatch}
In a method call `obj.m(args)`, the method that runs is found by searching for `m` in the class of `obj` at the moment of the call — first the class itself, then its base classes in a fixed order (the **method resolution order**, below) — not in the class named in the source code where the call appears. This run-time selection is **dynamic dispatch**.
:::

::: example Tracing a dispatched call {#ex-dispatch}
Trace `Rectangle(3, 4).describe()` from the program above.
::: solution
1. `Rectangle(3, 4)` runs `Rectangle.__init__`, which calls `super().__init__("rectangle")` — `Shape.__init__` — setting `self.name`, and then sets `self.w = 3`, `self.h = 4`.
2. `describe` is not defined in `Rectangle`; the search continues in `Shape`, finds it, and calls `Shape.describe(self)` with `self` the rectangle.
3. Inside `describe`, `self.area()` is a new lookup, starting again from the class of `self` — `Rectangle` — not from `Shape`, where the code of `describe` is written. It finds `Rectangle.area`, which returns `12`. Likewise `self.perimeter()` finds `Rectangle.perimeter` and returns `14`.
4. The f-string formats the two numbers with two decimals.

If step 3 searched from `Shape`, every shape would raise `NotImplementedError`. The method that "calls down" into its subclasses is a **template method**: the base class fixes the outline of an algorithm and subclasses fill in the steps.
:::
:::

Dynamic dispatch is what makes **polymorphism** — one piece of code working on values of many types — possible for objects. The loop `for s in shapes: print(s.describe())` does not know, and does not need to know, how many kinds of shape exist. This is often summarised as the **open–closed principle** (Bertrand Meyer, 1988): a module should be *open for extension* (new shapes can be added) but *closed for modification* (adding them requires no change to the existing code).

There are several kinds of polymorphism, and Python has all of them in some form:

- **subtype polymorphism**: code written for a class works for its subclasses, by dispatch — this chapter;
- **ad hoc polymorphism** (overloading): one name with unrelated implementations for different types, such as `+` on numbers, strings and lists, chosen through special methods;
- **parametric polymorphism**: code that works uniformly for every type, such as `len` or a function that reverses any list — made explicit by the generics of [[program-design/types-interfaces]].

### Duck typing

Python does not require a common base class for polymorphism. Dispatch looks for a method by *name*, so any object that has an `area` method can be passed to code that calls `s.area()`:

```python
class Square:                     # not a subclass of Shape
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Field:                      # an unrelated class with an area
    def __init__(self, hectares):
        self.hectares = hectares
    def area(self):
        return self.hectares * 10_000

print(sum(x.area() for x in [Square(3), Field(0.5), Square(1)]))
```

```console
$ python3 duck.py
5010.0
```

This is **duck typing** ("if it walks like a duck and quacks like a duck…"): what matters is the operations an object supports, not its declared class. It is how most of Python works — `len` accepts anything with `__len__`, `for` anything with `__iter__` — and it makes code very reusable. Its risk is the converse: nothing checks in advance that the object has the method, or that its `area` means what the caller thinks (here a field's area is in square metres, the squares' in whatever unit the sides were). [[program-design/types-interfaces]] shows how **protocols** let a type checker verify duck typing statically.

### Abstract base classes

`Shape` above signals "subclasses must override this" by raising `NotImplementedError`, which is only discovered when the missing method is called. The standard module `abc` lets a class declare **abstract methods**; a class with abstract methods that have not been overridden cannot be instantiated at all.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): ...

class Blob(Shape):               # forgot to define area
    pass

for cls in (Shape, Blob):
    try:
        cls()
    except TypeError as e:
        print(e)
```

```console
$ python3 abstract.py
Can't instantiate abstract class Shape without an implementation for abstract method 'area'
Can't instantiate abstract class Blob without an implementation for abstract method 'area'
```

The error now appears when the incomplete object is created, not later when some unlucky caller reaches the missing method — an earlier and clearer failure. An abstract base class is the closest Python comes to an **interface** in the sense of Java: a named set of operations that subclasses promise to provide. The standard library's `collections.abc` defines many, such as `Sequence`, `Mapping` and `Iterable`; deriving from `collections.abc.Sequence` and defining `__getitem__` and `__len__` gives a class `__contains__`, `__iter__`, `index` and `count` for free, as inherited template methods.

::: quiz
With the classes of `shapes.py`, a programmer adds `class Unit(Circle): def area(self): return 1`. What does `Unit(5).describe()` return?
- [ ] `circle: area 78.54, perimeter 31.42`
- [x] `circle: area 1.00, perimeter 31.42`
- [ ] `unit: area 1.00, perimeter 31.42`
- [ ] It raises `NotImplementedError`.
::: solution
`Unit` inherits `__init__` from `Circle`, so `name` is `"circle"` and `r = 5`. `describe` comes from `Shape`; inside it `self.area()` dispatches on the class of `self`, `Unit`, giving `1`, while `self.perimeter()` finds no `perimeter` in `Unit` and uses `Circle.perimeter`, $2\pi\cdot 5 \approx 31.42$. (That `Unit` is a circle whose area disagrees with its radius is itself a design smell — the subject of the substitution principle below.)
:::
:::

## The method resolution order

A class may have several base classes: `class D(B, C):` is **multiple inheritance**. Then the order in which bases are searched matters, especially in a **diamond**, where two bases share a common ancestor.

```python
class Base:
    def hello(self):  return ["Base"]
class Left(Base):
    def hello(self):  return ["Left"] + super().hello()
class Right(Base):
    def hello(self):  return ["Right"] + super().hello()
class Both(Left, Right):
    def hello(self):  return ["Both"] + super().hello()

print(Both().hello())
print([c.__name__ for c in Both.__mro__])
print(Left().hello())
```

```console
$ python3 diamond.py
['Both', 'Left', 'Right', 'Base']
['Both', 'Left', 'Right', 'Base', 'object']
['Left', 'Base']
```

Two facts stand out. Each class's method runs exactly once, even though `Base` is reachable along two paths. And `super()` in `Left` does not always mean `Base`: for an instance of `Both` it means `Right`, while for an instance of `Left` it means `Base`. `super()` means "the next class *after this one* in the method resolution order of the object's class", which is what lets the classes of a diamond **cooperate**.

::: definition Method resolution order {#def-mro}
The **method resolution order** (MRO) of a class $C$ is a list $L[C]$ of $C$ and all its ancestors, each exactly once, in which attributes are searched. A satisfactory MRO must have two properties: it is **monotonic with respect to inheritance** — every class appears before its own bases — and it respects **local precedence order** — if a `class` statement lists $B_1$ before $B_2$, then $B_1$ appears before $B_2$.
:::

The first property says $L[C]$ is a topological order of the inheritance graph (directed from each class to its bases; topological sorting is treated in [[data-structures/graph-representations]]). Python computes it with the **C3 linearisation**, devised for the language Dylan in 1996 and used by Python since version 2.3.

::: algorithm C3 linearisation {#alg-c3}
**Input:** a class $C$ with bases $B_1, \dots, B_k$ (in the order written), whose linearisations $L[B_i]$ are known. **Output:** $L[C]$.

1. Form the lists $L[B_1], \dots, L[B_k]$ and the list $B_1 \dots B_k$ of bases itself.
2. Set $L[C] \gets [C]$. While some list is non-empty:
   1. Choose the first list, in the order above, whose head (first element) $h$ appears in the *tail* (any position but the first) of no list. If there is none, fail: no consistent MRO exists.
   2. Append $h$ to $L[C]$ and remove $h$ from every list in which it occurs.
3. Return $L[C]$.
:::

::: example Computing an MRO {#ex-c3}
Compute the MRO of `F` for the hierarchy `class A(O)`, `class B(O)`, `class C(O)`, `class D(A, B)`, `class E(B, C)`, `class F(D, E)`, and check it with Python.
::: solution
For a class with the single base $O$, $L[A] = A\,O$, and similarly $L[B] = B\,O$, $L[C] = C\,O$.

$L[D] = D + \text{merge}(A\,O,\ B\,O,\ A\,B)$: $A$ is in no tail, take it; then the lists are $O$, $B\,O$, $B$, and $O$ is in the tail of $B\,O$, so skip to $B$; then $O$. So $L[D] = D\,A\,B\,O$. Similarly $L[E] = E\,B\,C\,O$.

$L[F] = F + \text{merge}(D\,A\,B\,O,\ E\,B\,C\,O,\ D\,E)$:

| step | lists | candidates tried | chosen |
|---|---|---|---|
| 1 | $DABO$, $EBCO$, $DE$ | $D$ — in no tail | $D$ |
| 2 | $ABO$, $EBCO$, $E$ | $A$ — in no tail | $A$ |
| 3 | $BO$, $EBCO$, $E$ | $B$ — in the tail of $EBCO$; $E$ — in no tail | $E$ |
| 4 | $BO$, $BCO$ | $B$ — in no tail | $B$ |
| 5 | $O$, $CO$ | $O$ — in the tail of $CO$; $C$ | $C$ |
| 6 | $O$, $O$ | $O$ | $O$ |

So $L[F] = F\,D\,A\,E\,B\,C\,O$. In Python, with `O` an ordinary class, `[c.__name__ for c in F.__mro__]` gives `['F', 'D', 'A', 'E', 'B', 'C', 'O', 'object']`. Note step 3: $B$ must wait until $E$, its subclass, has been placed — that is monotonicity at work.
:::
:::

::: widget graph
nodes: F@2,4; D@1,3; E@3,3; A@0,2; B@2,2; C@4,2; O@2,0
edges: F>D; F>E; D>A; D>B; E>B; E>C; A>O; B>O; C>O
algorithm: topo
caption: The inheritance graph of [[#ex-c3]], with an arrow from each class to each of its bases. Step through a topological sort: it lists every class before its bases, which is the first requirement on an MRO. Many topological orders exist; C3 chooses the one that also keeps each `class` statement's bases in their written order ($D$ before $E$, $A$ before $B$, $B$ before $C$), giving $F, D, A, E, B, C, O$. Drag the nodes to untangle the picture.
:::

When the two requirements conflict, C3 fails. With `class X(A, B)` and `class Y(B, A)`, a class `class Z(X, Y)` would need $A$ before $B$ (for $X$) and $B$ before $A$ (for $Y$); Python refuses with `TypeError: Cannot create a consistent method resolution order (MRO) for bases A, B`. In practice multiple inheritance is best kept to **mixins**: small classes that add one capability (comparison methods, serialisation, logging) and are designed to be combined, with `super()` calls throughout.

## The substitution principle

Inheritance in Python does two things at once: it *reuses code* (the subclass gets the base class's methods) and it *declares a relationship* (`isinstance(c, Shape)` is true for every circle, so code expecting a `Shape` will accept a circle). The second is a promise to every client of the base class, and it can be broken.

::: definition Behavioural subtype {#def-lsp}
A class $T'$ is a **behavioural subtype** of a class $T$ if, for every method $m$ of $T$ (with $T$'s specification) and the version of $m$ in $T'$:

1. **preconditions are no stronger:** $\mathit{pre}_T(m) \implies \mathit{pre}_{T'}(m)$;
2. **postconditions are no weaker:** on inputs satisfying $\mathit{pre}_T(m)$, $\mathit{post}_{T'}(m) \implies \mathit{post}_T(m)$ — including the exceptions it may raise;
3. **invariants are preserved:** every object of $T'$ satisfies $T$'s invariant, viewed through $T$'s abstraction function;
4. **history is preserved:** the methods of $T'$, including new ones, change an object's abstract state only in ways the methods of $T$ could.

The **Liskov substitution principle** states that a subclass should be a behavioural subtype of its base class.
:::

Conditions 1 and 2 say exactly that the subclass's specification of each method refines the base class's, in the sense of [[program-design/abstraction-specifications#def-stronger]]. The payoff is therefore the same.

::: theorem Substitution {#thm-lsp}
Let $T'$ be a behavioural subtype of $T$. Then any client that is correct when given objects of class $T$ — that is, whose correctness argument uses only the specifications of $T$'s methods and $T$'s invariant — remains correct when given objects of class $T'$.
:::

::: proof
The client's argument consists of steps of two kinds. *Method calls:* at each call `x.m(args)` the argument establishes $\mathit{pre}_T(m)$ and afterwards uses $\mathit{post}_T(m)$. If `x` is a $T'$, dynamic dispatch runs $T'$'s version of `m`; by conditions 1 and 2 its specification refines $T$'s, so by the substitution theorem of [[program-design/abstraction-specifications]] it satisfies $T$'s specification, and the step remains valid. *Facts about state between calls:* the argument may use $T$'s invariant, valid by condition 3, and may assume that the object's abstract state changes only through calls it can see described by $T$'s specifications — for instance that an immutable value stays the same. Condition 4 guarantees that no method of $T'$ changes the state in any other way. Since every step of the argument remains valid, so does its conclusion.
:::

The classic violation looks entirely natural.

::: example A square is not a rectangle {#ex-square}
A mutable `Rect` has methods `set_width(w)` and `set_height(h)`, specified as "sets the width (height) to the given value; the other dimension is unchanged". A programmer derives `Square(Rect)` and, so that squares stay square, overrides both setters to change both sides. Show a client that is correct for `Rect` and wrong for `Square`.
::: solution
```python
class Rect:
    def __init__(self, w, h):
        self.w, self.h = w, h
    def set_width(self, w):            # Effects: width = w; height unchanged
        self.w = w
    def set_height(self, h):           # Effects: height = h; width unchanged
        self.h = h
    def area(self):
        return self.w * self.h

class Square(Rect):
    def __init__(self, side):
        super().__init__(side, side)
    def set_width(self, w):            # keeps the square square ...
        self.w = self.h = w
    def set_height(self, h):           # ... but breaks Rect's postcondition
        self.w = self.h = h

def widen(r):
    """Requires: a Rect.  Effects: doubles r's width; returns the factor by which the area grew."""
    before = r.area()
    r.set_width(2 * r.w)
    return r.area() / before

print(widen(Rect(2, 3)), widen(Square(2)))
```

```console
$ python3 square.py
2.0 4.0
```

`widen` is correct for `Rect`: by the postcondition of `set_width`, the height is unchanged, so doubling the width doubles the area. For `Square`, the overridden `set_width` also changes the height, violating condition 2 of [[#def-lsp]] — "height unchanged" was part of the base postcondition — and the client's reasoning collapses: the area grows four-fold. The alternatives are all better than the subclass: make `Rect` and `Square` immutable (an immutable square *is* a behavioural subtype of an immutable rectangle, since there are no setters to disagree about), give them a common base `Shape` without setters, or make "is square" a property of a rectangle rather than a class.
:::
:::

::: warning "Is a" in English is not "is a subtype"
"A square is a rectangle", "a penguin is a bird", "a bounded stack is a stack" are true in English, and each tempts a subclass that breaks the base class's specification: `Square.set_width`, `Penguin.fly()` raising an exception, `BoundedStack.push` refusing items when full where `Stack.push` always succeeds. The question to ask is not whether the words fit but whether **every client** of the base class would stay correct. If a subclass must strengthen a precondition, weaken a postcondition or throw away an operation, it should not be a subclass.
:::

Python's own types mostly respect the principle. `bool` is a subclass of `int`, and indeed `True + True == 2`: every integer operation works on booleans as on $0$ and $1$. A more instructive case is a subclass of a built-in container, which leads to the second big topic of the chapter.

## Composition over inheritance

Inheritance couples a subclass to the *implementation* of its base class, not just to its specification. The subclass's overrides are called by the base class's other methods only if those methods happen to call them — a detail the base class rarely documents.

::: example A dictionary that counts its writes {#ex-fragile}
Write a dictionary that counts how many items have been stored in it, first as a subclass of `dict` that overrides `__setitem__`, then by composition.
::: solution
```python
class CountingDict(dict):
    def __init__(self, *args, **kwargs):
        self.writes = 0
        super().__init__(*args, **kwargs)
    def __setitem__(self, key, value):
        self.writes += 1
        super().__setitem__(key, value)

d = CountingDict(a=1)                # stores 'a'
d["b"] = 2                           # stores 'b'
d.update({"c": 3, "d": 4})           # stores 'c' and 'd'
d.setdefault("e", 5)                 # stores 'e'
print(d.writes, len(d))
```

```console
$ python3 countingdict.py
1 5
```

Five items were stored, but only one write was counted. In CPython, `dict.__init__`, `dict.update` and `dict.setdefault` are written in C and insert directly into the table without calling `__setitem__`, so the override is bypassed. The subclass is correct or wrong depending on an implementation detail of its base class — the **fragile base class problem**. Worse, a future version could change which methods route through `__setitem__`.

The composition version *has* a dictionary instead of *being* one, and defines exactly the operations it supports:

```python
class CountingStore:
    """A mapping that counts stores.  Rep: dict self._d, int self.writes."""
    def __init__(self, items=()):
        self._d = {}
        self.writes = 0
        for k, v in dict(items).items():
            self[k] = v
    def __setitem__(self, key, value):
        self.writes += 1
        self._d[key] = value
    def __getitem__(self, key):
        return self._d[key]
    def __len__(self):
        return len(self._d)
    def update(self, other):
        for k, v in dict(other).items():
            self[k] = v

s = CountingStore({"a": 1})
s["b"] = 2
s.update({"c": 3, "d": 4})
print(s.writes, len(s), s["c"])
```

```console
$ python3 countingstore.py
4 4 3
```

Every store passes through one method that the class controls, so the count is right by construction, whatever `dict` does internally. The price is having to write the forwarding methods. (The standard library offers a middle way: `collections.UserDict` is a dictionary class written in Python whose other methods do call `__setitem__`, precisely so that it can be subclassed safely.)
:::
:::

**Composition** — building an object from other objects that it holds as attributes and delegates to — avoids both problems of inheritance seen in this chapter. It depends only on the *interface* of the component, so the component's implementation can change freely; and it makes no promise of substitutability, so it cannot violate the substitution principle. Gamma, Helm, Johnson and Vlissides put it as the second principle of their *Design Patterns* (1994): "Favor object composition over class inheritance." Inheritance remains the right tool when the subclass genuinely is a behavioural subtype and the base class was *designed* to be extended — abstract base classes with template methods, exception hierarchies, mixins — and composition is the default otherwise.

::: quiz
Which of these subclasses is a behavioural subtype of its base class (with the base specification given in brackets)?
- [ ] `ReadOnlyList(list)` whose `append` raises `TypeError` [`append(x)`: adds `x` at the end]
- [x] `SortedBag(Bag)` whose `items()` returns the elements in increasing order [`items()`: returns the elements in some order]
- [ ] `PositiveAccount(Account)` whose `deposit` requires amounts below £1000 [`deposit(a)`: requires `a > 0`]
- [ ] `Penguin(Bird)` whose `fly()` raises `CannotFly` [`fly()`: moves the bird into the air]
::: solution
`SortedBag.items` has the same precondition and a *stronger* postcondition (a particular order is one of the allowed orders), so it refines the base specification. `ReadOnlyList.append` and `Penguin.fly` weaken the postcondition (raising instead of doing the work), and `PositiveAccount.deposit` strengthens the precondition. Code written for the base classes would break on each of those three.
:::
:::

::: history
Simula 67 introduced subclasses ("prefixed classes") and **virtual** procedures, which subclasses could redefine — dynamic dispatch — in 1967. Smalltalk-80 made every call a dynamically dispatched message. Barbara Liskov formulated the substitution requirement informally in her keynote "Data abstraction and hierarchy" at the OOPSLA conference in 1987, and with Jeannette Wing gave the precise definition, including the history rule, in "A behavioral notion of subtyping" (*ACM TOPLAS*, 1994). Bertrand Meyer's *Object-Oriented Software Construction* (1988) stated the open–closed principle and the rule that subclasses may weaken preconditions and strengthen postconditions. The C3 linearisation was published by Kim Barrett and co-authors in "A monotonic superclass linearization for Dylan" (OOPSLA 1996) and adopted by Python 2.3 in 2003. Gamma, Helm, Johnson and Vlissides's *Design Patterns* (1994) argued for composition over inheritance.
:::

## Where this leads

[[program-design/types-interfaces]] makes the subtype relation visible to a type checker, with nominal subtyping (declared base classes), structural subtyping (protocols, the static form of duck typing) and the variance rules that decide when a container of subtypes is a subtype of a container. [[program-design/modules-patterns]] collects designs built from dispatch and composition — strategy, observer, adapter. In [[programming-languages]], dispatch, subtyping and the three kinds of polymorphism are studied as features of type systems, and [[compilers]] shows how dispatch is implemented with tables of method pointers.

::: summary
- A subclass inherits its base class's attributes and may **override** methods; `super()` calls the next class's version ([[#def-subclass]]).
- **Dynamic dispatch** chooses a method by the run-time class of the object, starting the search afresh at every call — so a base-class **template method** can call subclass steps ([[#def-dispatch]]).
- Polymorphism lets one piece of code work for many types; Python adds **duck typing** (any object with the right methods), and abstract base classes catch missing methods at instantiation.
- With multiple inheritance, the **MRO** lists each class before its bases and respects the written order of bases; Python computes it by **C3** ([[#alg-c3]]), and `super()` follows it.
- The **Liskov substitution principle**: a subclass must weaken no precondition's acceptance, weaken no postcondition, keep the invariant and the history ([[#def-lsp]]); then clients of the base class stay correct ([[#thm-lsp]]). A mutable square is not a rectangle.
- Inheritance couples a subclass to its base's implementation (the **fragile base class** problem); prefer **composition** unless the base class was designed for extension.
:::

## Exercises

::: exercise Which method runs? {level=1 check="31"}
What does this program print? (Enter the number.)

```python
class A:
    def f(self):  return 1 + self.g()
    def g(self):  return 10
class B(A):
    def g(self):  return 20
class C(B):
    def f(self):  return super().f() * 0 + self.g() + 1
print(B().f() + C().f() - A().f())
```
::: solution
```console
$ python3 which.py
31
```

`B().f()` runs `A.f`, whose `self.g()` dispatches on the class of `self`, `B`, to `B.g`: $1 + 20 = 21$. `C().f()` runs `C.f`. Its `super().f()` finds `A.f` (via `B`, which does not define `f`), and inside it `self.g()` again dispatches on the class of `self` — now `C`, which inherits `B.g` — so `super().f()` is $21$, multiplied by $0$; then `self.g() + 1 = 21`. `A().f()` is $1 + 10 = 11$. The total is $21 + 21 - 11 = 31$.
:::
:::

::: exercise Reading an MRO {level=1}
For `class P: pass`, `class Q(P): pass`, `class R(P): pass`, `class S(R, Q): pass`, write down `S.__mro__` and say where Python looks for a method `m` defined only in `P` and `Q` when it is called on an `S`.
::: solution
By C3, $L[S] = S + \text{merge}(R\,P, Q\,P, R\,Q) = S\,R\,Q\,P$, then `object`: `(S, R, Q, P, object)`. The search for `m` goes $S$, $R$ (not found), $Q$ (found): `Q.m` runs, even though $R$ comes first and $P$ also defines `m` — $P$ is placed after both of its subclasses.
:::
:::

::: exercise Total area {level=1 check="30.5664"}
Add a class `Triangle(Shape)` to `shapes.py`, with sides $a, b, c$, computing the area by Heron's formula $\sqrt{s(s-a)(s-b)(s-c)}$ with $s = (a+b+c)/2$. What is the total area of `[Circle(2), Rectangle(3, 4), Triangle(3, 4, 5), Circle(0)]`, rounded to four decimal places? (Enter it.)
::: solution
```python
class Triangle(Shape):
    def __init__(self, a, b, c):
        super().__init__("triangle")
        self.a, self.b, self.c = a, b, c
    def perimeter(self):
        return self.a + self.b + self.c
    def area(self):
        s = self.perimeter() / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))
```

The areas are $4\pi \approx 12.5664$, $12$, $6$ (for the 3–4–5 right triangle, $s = 6$ and $\sqrt{6\cdot3\cdot2\cdot1} = 6$) and $0$, so the total is $12.5664 + 12 + 6 + 0 = 30.5664$ (to four decimal places; $4\pi = 12.56637\ldots$). A radius of zero gives a legitimate, degenerate circle, and the code handles it without special cases.
:::
:::

::: exercise Does the subclass substitute? {level=2}
For each pair, decide whether the subclass method satisfies conditions 1 and 2 of [[#def-lsp]]. (a) Base `sqrt(x)`: requires $x \ge 0$, returns $y \ge 0$ with $\abs{y^2 - x} < 10^{-6}$; subclass: requires nothing, returns `nan` for negative $x$ and otherwise $y \ge 0$ with $\abs{y^2 - x} < 10^{-9}$. (b) Base `pick(xs)`: requires `xs` non-empty, returns some element of `xs`; subclass: requires `xs` non-empty and sorted, returns the median. (c) Base `save(data)`: may raise `IOError`; subclass: may raise `IOError` or `PermissionError`, where `PermissionError` is a subclass of `OSError`, which `IOError` is an alias of.
::: solution
(a) Yes. The precondition is weaker (nothing is implied by anything), and on $x \ge 0$ the postcondition is stronger ($10^{-9} < 10^{-6}$). What happens for $x < 0$ is irrelevant to clients of the base.
(b) No. The precondition is stronger (it demands sorted input), so a client of the base that passes an unsorted list is broken by the subclass, even though "the median" would be an acceptable "some element".
(c) Yes. In Python 3, `IOError` is the same class as `OSError`, and `PermissionError` is a subclass of it, so "may raise `PermissionError`" is included in "may raise `IOError`": a client's `except IOError:` catches both. Had the subclass raised a new exception outside that hierarchy, it would have weakened the postcondition.
:::
:::

::: exercise An impossible MRO {level=2}
Use [[#alg-c3]] to show why `class Z(X, Y)` fails when `class X(A, B)` and `class Y(B, A)`. Then explain in one sentence why no linearisation at all could satisfy both requirements of [[#def-mro]].
::: solution
$L[X] = X\,A\,B\,O$ and $L[Y] = Y\,B\,A\,O$ (with $O$ = `object`). $L[Z] = Z + \text{merge}(X\,A\,B\,O,\ Y\,B\,A\,O,\ X\,Y)$. Take $X$ (in no tail), then the lists are $A\,B\,O$, $Y\,B\,A\,O$, $Y$; $A$ is in the tail of $Y\,B\,A\,O$, so try $Y$: in no tail, take it. Now $A\,B\,O$ and $B\,A\,O$: $A$ is in the tail of the second and $B$ in the tail of the first, and $O$ is not a head. No head is acceptable, so C3 fails. No order can work: local precedence for $X$ requires $A$ before $B$ and for $Y$ requires $B$ before $A$, and both are ancestors of $Z$, so $L[Z]$ would have to contain them in both orders.
:::
:::

::: exercise A bounded stack {level=2}
`Stack.push(x)` is specified as "adds `x` on top; always succeeds". A `BoundedStack(Stack)` with capacity $n$ raises `OverflowError` when full. Explain why it is not a behavioural subtype, and propose two designs that keep a bounded stack while respecting the substitution principle.
::: solution
The subclass weakens the postcondition (or, equivalently, adds a precondition "not full"): a client of `Stack` that pushes $n + 1$ items, relying on "always succeeds", fails. Designs that respect the principle: (1) change the *base* specification to "adds `x` on top, or raises `OverflowError` if the stack is full", so that unbounded stacks are the special case that never raises, and clients must handle the exception; (2) do not relate the classes by inheritance: make `BoundedStack` a separate class that *uses* a list (composition), possibly sharing an abstract base class whose `push` specification allows failure. In both cases clients that need unbounded behaviour are told, by the type they use, that they will get it.
:::
:::

::: exercise Subtyping is transitive {level=3}
Prove that if $T''$ is a behavioural subtype of $T'$ and $T'$ of $T$, then $T''$ is a behavioural subtype of $T$, for conditions 1 and 2 of [[#def-lsp]]. Why is this necessary for class hierarchies deeper than one level to be safe?
::: solution
Fix a method $m$ of $T$; it is also a method of $T'$ and $T''$ (inherited or overridden). Condition 1: $\mathit{pre}_T \Rightarrow \mathit{pre}_{T'} \Rightarrow \mathit{pre}_{T''}$. Condition 2: take an input satisfying $\mathit{pre}_T$ and a result satisfying $\mathit{post}_{T''}$. The input satisfies $\mathit{pre}_{T'}$ (by condition 1 for $T'$ and $T$), so condition 2 for $T''$ and $T'$ gives $\mathit{post}_{T'}$, and then condition 2 for $T'$ and $T$ (on the same input, which satisfies $\mathit{pre}_T$) gives $\mathit{post}_T$. This is the transitivity of refinement proved in the exercises of [[program-design/abstraction-specifications]].

It is necessary because `isinstance` is transitive: an object of class $T''$ is accepted wherever a $T$ is expected, without anyone checking the intermediate class. If substitutability held only between adjacent levels, a client of $T$ could receive an object two levels down whose behaviour it cannot rely on.
:::
:::

::: exercise A safe counting dictionary {level=3}
Subclass `collections.UserDict` to count stores, as in [[#ex-fragile]], and verify that the constructor, item assignment, `update` and `setdefault` are all counted. Then explain why this subclass is safer than the `dict` subclass, and what it still depends on.
::: solution
```python
from collections import UserDict

class CountingDict(UserDict):
    def __init__(self, *args, **kwargs):
        self.writes = 0
        super().__init__(*args, **kwargs)
    def __setitem__(self, key, value):
        self.writes += 1
        super().__setitem__(key, value)

d = CountingDict(a=1)
d["b"] = 2
d.update({"c": 3, "d": 4})
d.setdefault("e", 5)
print(d.writes, len(d), dict(d))
```

```console
$ python3 userdict.py
5 5 {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
```

`UserDict` is written in Python on top of the `MutableMapping` abstract base class, whose `update` and `setdefault` are template methods implemented by calling `self[key] = value`; and `UserDict.__init__` calls `update`. Routing every store through `__setitem__` is a *documented design decision* of these classes, made so that subclasses can override that one method — which is the condition under which inheritance is safe. The subclass still depends on that decision (and on `self.writes` being set before `super().__init__` runs, because the constructor already stores items); it is a dependency on a published contract rather than on an accident of the C implementation.
:::
:::
