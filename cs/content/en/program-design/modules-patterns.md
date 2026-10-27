In 1972 David Parnas published a short paper about a small program: a "KWIC index" generator, which takes a list of titles and produces every circular shift of every title — "Program Design Course", "Design Course Program", "Course Program Design" — in alphabetical order, so that a reader can find a title by any of its words. He described two ways of dividing it into modules. Both worked; both could be written by a small team in a week or two. They differed in what happened *afterwards*, when someone wanted to change how the titles were stored, or to compute the shifts lazily instead of all at once, or to sort with a different alphabet. In the first design almost every module had to change for each of these; in the second, exactly one did.

The difference was not in the code inside the modules but in where the boundaries were drawn. This final chapter is about drawing them: **modules** and how Python implements them, Parnas's criterion of **information hiding**, the measures of **coupling** and **cohesion**, the **dependency graph** of a program and why it must be acyclic, and **design patterns** — named, reusable solutions to recurring design problems, several of which you have already met in disguise.

## Modules in Python

::: definition Module, interface, implementation {#def-module}
A **module** is a unit of program text with a name, a set of definitions, and a boundary: an **interface** of names that other modules may use, and an **implementation** — everything else — that they may not depend on. In Python a module is a file `name.py`; executing `import name` runs the file once, in a fresh namespace, and binds `name` to the resulting **module object**, whose attributes are the file's top-level names.
:::

Python's import machinery has a few rules worth knowing exactly.

- A module is executed only on its **first** import in a program run. The module object is then cached in the dictionary `sys.modules`, and every later `import name` returns the cached object without running the file again.
- `import name` binds the module; `from name import f` binds `f` to the module's current value of `f`; `import name as n` binds the module under another name.
- Inside a module, the variable `__name__` holds the module's name — or the string `"__main__"` if the file is being run as a program. The idiom `if __name__ == "__main__":` therefore marks code that runs only when the file is executed directly, such as a demonstration or a command-line entry point.
- Names beginning with an underscore are internal by convention, exactly as for class attributes, and an optional list `__all__` names the public interface (it controls `from name import *` and documents the intent).

::: example A module and its client {#ex-module}
Write a module of temperature conversions with a documented interface and a private helper, then a client that imports it in three ways. What is printed when the client runs, and when the module itself is run?
::: solution
```python
# file: temperature.py
"""Conversions between temperature scales."""

__all__ = ["c_to_f", "f_to_c"]

_ABSOLUTE_ZERO_C = -273.15             # internal: not part of the interface

def c_to_f(c):
    """Requires: c >= -273.15.  Effects: returns c in degrees Fahrenheit."""
    _check(c)
    return c * 9 / 5 + 32

def f_to_c(f):
    """Effects: returns f degrees Fahrenheit in degrees Celsius."""
    return (f - 32) * 5 / 9

def _check(c):
    if c < _ABSOLUTE_ZERO_C:
        raise ValueError(f"{c} is below absolute zero")

print("loading temperature, __name__ =", __name__)

if __name__ == "__main__":             # only when run as a program
    print(c_to_f(100))
```

```console
$ python3 temperature.py
loading temperature, __name__ = __main__
212.0
```

```python
# file: report.py
import temperature
from temperature import f_to_c
import temperature as t

print(temperature.c_to_f(37), round(f_to_c(98.6), 2), t is temperature)
```

```console
$ python3 report.py
loading temperature, __name__ = temperature
98.6 37.0 True
```

Run directly, the module sees `__name__ == "__main__"` and runs its demonstration. Imported, it sees its own name, so the demonstration is skipped — and although it is imported three times, it is *loaded* once: the message appears once, and `t` and `temperature` are the same module object. A top-level `print` in a real module would be a bad idea (importing should not have visible effects); it is here only to show when the file runs.
:::
:::

A **package** is a directory of modules, usually with a file `__init__.py` that runs when the package is imported: `import shop.pricing` loads `shop/__init__.py` and then `shop/pricing.py`. Inside a package, **relative imports** such as `from . import pricing` or `from .pricing import price` name sibling modules without repeating the package name. Packages give large programs a hierarchical namespace — the standard library's `collections.abc`, `email.mime.text` and `concurrent.futures` are examples — and are the unit in which Python code is distributed.

## Information hiding

What should a module contain? Parnas's answer is the most influential sentence in software design.

::: definition Information hiding {#def-information-hiding}
**Information hiding** is the criterion of decomposing a system so that each module hides a **design decision** — typically one that is difficult or likely to change — from all the others. Its interface reveals as little as possible about that decision; every other module depends only on the interface.
:::

Decisions that deserve a module of their own include: the representation of a data structure (an ADT is information hiding applied to data, [[program-design/abstract-data-types]]); the format of a file or a network message; the choice of algorithm for a task with several solutions; the interface to hardware, an operating system or an external service; and policies likely to change, such as prices, tax rules or user-interface text.

::: example Two decompositions of KWIC {#ex-kwic}
Parnas's first decomposition followed the steps of the computation: (1) *Input* reads the titles into a shared array of characters; (2) *Circular shift* builds an index of (title, starting word) pairs into that array; (3) *Alphabetise* sorts the index; (4) *Output* prints the shifts; (5) a *Master control* calls them in turn. His second decomposition had modules (1′) *Line storage*, offering "the $j$-th character of word $i$ of line $\ell$" and hiding how lines are stored; (2′) *Input*, which calls line storage to store titles; (3′) *Circular shifter*, offering the same kind of interface for "the shifted lines", hiding whether they are computed in advance or on demand; (4′) *Alphabetiser*, offering "the $i$-th line in alphabetical order", hiding the sorting algorithm and whether sorting happens all at once; (5′) *Output* and (6′) *Master control*. For each of the following changes, which modules must change in each design?

(a) Store titles compactly, four characters per word, instead of one character per array cell. (b) Compute circular shifts on demand instead of storing an index. (c) Sort only when a line is requested, instead of all at once.
::: solution
In the first design, every module that reads the shared array or the shift index depends on their exact formats.

| change | first design (processing steps) | second design (hidden decisions) |
|---|---|---|
| (a) storage format | Input, Circular shift, Alphabetise, Output | Line storage |
| (b) shifts on demand | Circular shift, Alphabetise, Output | Circular shifter |
| (c) lazy sorting | Alphabetise, Output (and Master control, which sequences the steps) | Alphabetiser |

In the second design each change is confined to the one module that hides the decision. The two designs may even consist of the same code at run time; what differs is which code *knows* about each decision. Notice that (b) and (c) are the lazy-versus-eager choices of [[program-design/iterators-generators]]: an interface of the form "give me the $i$-th line" or "give me the next line" leaves the implementer free to choose, while an interface of the form "here is the array" does not.
:::
:::

### Coupling and cohesion

Two complementary measures, introduced by Wayne Stevens, Glenford Myers and Larry Constantine in 1974, judge a decomposition.

::: definition Coupling and cohesion {#def-coupling}
**Coupling** is the degree to which a module depends on other modules: on how many, and on how much of each. **Cohesion** is the degree to which the parts of one module belong together, serving a single purpose. Good designs have **low coupling** between modules and **high cohesion** within each.
:::

Coupling comes in kinds, from mild to severe:

- **data coupling** — modules exchange only simple values through parameters and results (`f_to_c(98.6)`);
- **stamp coupling** — they pass a structure of which the receiver uses only part, so it depends on the structure's layout;
- **control coupling** — one passes a flag that selects what the other does internally (`process(data, mode=3)`), so the caller must know the callee's logic;
- **common coupling** — they share global variables, so any of them can affect all of them;
- **content coupling** — one reaches into the other's internals (`other._cache.clear()`), breaking its invariants.

Cohesion likewise ranges from *functional* (everything in the module serves one well-defined task, like `temperature`) down to *coincidental* (a `utils.py` of unrelated helpers that changes for every reason). Information hiding drives both measures in the right direction: a module that owns one decision is cohesive by construction, and since nobody else knows the decision, nobody else is coupled to it.

### The dependency graph

Say that module $A$ **depends on** module $B$ if $A$ uses any name from $B$'s interface. The **dependency graph** has a vertex for each module and an edge $A \to B$ for each dependency. Its shape matters: modules must be loaded, initialised, compiled and tested in an order in which each module comes after the modules it uses.

::: theorem Dependency orders {#thm-dependency-order}
A finite set of modules can be listed so that every module appears after all modules it depends on if and only if the dependency graph has no directed cycle.
:::

::: proof
*Only if.* Suppose there were such a list and a cycle $M_1 \to M_2 \to \cdots \to M_k \to M_1$. Each module appears after the next one in the cycle, so $M_1$ appears after $M_2$, which appears after $M_3$, …, after $M_1$ — so $M_1$ appears after itself, which is impossible.

*If.* By induction on the number $n$ of modules. For $n = 0$ the empty list works. For $n \ge 1$, first find a module $S$ that depends on no other module: start anywhere and follow dependency edges; since there is no cycle, no module is visited twice, so the walk stops within $n$ steps at a module with no outgoing edges. Put $S$ first. The remaining $n - 1$ modules still have no cycle, so by the induction hypothesis they can be listed in a valid order; appending that list after $S$ gives a valid order for all $n$, since $S$ depends on nothing and no remaining module depends on a module listed after it.
:::

The proof is an algorithm — repeatedly remove a module with no remaining dependencies — and a variant of the **topological sort** of [[data-structures/graph-representations]].

::: widget graph
nodes: app@2,4; ui@0.5,2.5; storage@3.5,2.5; model@1,0.5; config@3,0.5
edges: app>ui; app>storage; ui>model; ui>config; storage>model; storage>config
algorithm: topo
caption: The dependency graph of a small application, with an arrow from each module to each module it imports. Step through the topological sort: it lists every module before the modules it depends on (`app` first). Reading the order backwards gives a valid build and initialisation order, dependencies first — here `model` and `config` before `ui` and `storage`, and `app` last. Drag `config` and add an imagined edge `config → app` in your head: the graph would have a cycle, and by [[#thm-dependency-order]] no valid order would exist.
:::

Python discovers cycles the hard way, at run time. When module $A$ imports $B$ and $B$ imports $A$, the second import finds $A$ in `sys.modules` but only *partially executed*, without the names defined below the import line.

```python
# file: pricing.py
from customers import discount_for

def price(customer, amount):
    return amount * (1 - discount_for(customer))
```

```python
# file: customers.py
from pricing import price             # needed only by preview()

VIP = {"ada"}

def discount_for(customer):
    return 0.1 if customer in VIP else 0.0

def preview(customer):
    return price(customer, 100)
```

```python
# file: main.py
import pricing
print(pricing.price("ada", 50))
```

```console
$ python3 main.py
Traceback (most recent call last):
  File ".../main.py", line 2, in <module>
    import pricing
  File ".../pricing.py", line 2, in <module>
    from customers import discount_for
  File ".../customers.py", line 2, in <module>
    from pricing import price             # needed only by preview()
    ^^^^^^^^^^^^^^^^^^^^^^^^^
ImportError: cannot import name 'price' from 'pricing' (consider renaming '.../pricing.py' if it has the same name as a library you intended to import)
```

`main` starts loading `pricing`, whose first line starts loading `customers`, whose first line asks `pricing` — registered but not yet past its own first line — for `price`, which does not exist yet. (Line 2 of each file is its first line of code, after the `# file:` comment. The hint in Python 3.14's message, about renaming, is a red herring here; older versions say "from partially initialized module 'pricing' (most likely due to a circular import)".) Moving the import inside `preview` would make the program run, but it hides the real problem: the two modules are coupled in both directions. The better fix redraws the boundary so that dependencies point one way: `preview`, which is about prices, belongs in `pricing`, and `customers` then depends on nothing.

::: warning Circular dependencies are a design smell
An import cycle means two modules cannot be understood, tested or reused separately: each needs the other. Python sometimes tolerates cycles (when names are only used inside functions, after both modules have finished loading), so a cycle may lurk unnoticed until someone reorders an import. Treat every cycle as a request to move a definition, to extract the shared part into a third module that both import, or to invert a dependency by passing a function or object as a parameter instead of importing it.
:::

::: quiz
Module `report` calls `stats.mean(xs)` and also reads `stats._cache` to see whether a value was computed before. Module `stats` has a function `summary(xs, mode)` where `mode` is `1` for mean, `2` for median and `3` for both. Which kinds of coupling are present?
- [ ] Only data coupling
- [x] Content coupling and control coupling
- [ ] Common coupling only
- [ ] Stamp coupling only
::: solution
Reading another module's internal `_cache` is content coupling: `report` depends on how `stats` is implemented and breaks if the cache changes. A `mode` flag that selects the callee's internal behaviour is control coupling. The call `stats.mean(xs)` by itself is data coupling, the mildest kind. Removing the worse two would mean giving `stats` a public observer for whatever `report` needs and splitting `summary` into separate functions.
:::
:::

## Design patterns

Some design problems recur in program after program: an algorithm that should be interchangeable; many parties that need to hear about an event; an object with the wrong interface for the code that must use it. Experienced designers solve them in similar ways, and naming those solutions makes them easy to teach, recognise and discuss.

::: definition Design pattern {#def-pattern}
A **design pattern** is a named description of a recurring design problem, the core of a solution to it — the participating objects or functions and how they collaborate — and the consequences and trade-offs of applying it. Gamma, Helm, Johnson and Vlissides's catalogue of 23 patterns (1994) sorts them into **creational** (how objects are made), **structural** (how objects are composed) and **behavioural** (how responsibilities and communication are divided) patterns.
:::

You have already used several patterns: **Iterator** ([[program-design/iterators-generators]]) gives sequential access to a collection without exposing its representation; **Template method** ([[program-design/inheritance-polymorphism]]) fixes an algorithm's outline in a base class and lets subclasses fill in steps; **Factory method** appeared as the alternative constructor `Time.from_minutes` in [[program-design/classes-objects]]; and **Decorator** — wrapping an object to add behaviour while keeping its interface — is what Python's function decorators do to functions ([[program-design/higher-order-functions]]). Three more follow.

### Strategy

*Problem:* a computation has several interchangeable variants — pricing rules, sorting orders, compression methods — and the code using it should not depend on which one is chosen. *Solution:* define an interface for the variant, implement each variant separately, and give the client the variant to use. In Python, where functions are values, a strategy is usually just a function.

::: example Pricing strategies {#ex-strategy}
A shop's checkout must support several pricing rules, chosen per customer or per promotion. Implement the checkout with interchangeable strategies and compute a basket's total under each.
::: solution
```python
from collections.abc import Callable
from dataclasses import dataclass

@dataclass(frozen=True)
class Item:
    name: str
    price: float
    quantity: int

type Pricing = Callable[[list[Item]], float]       # the strategy interface

def full_price(items: list[Item]) -> float:
    return sum(i.price * i.quantity for i in items)

def bulk_discount(items: list[Item]) -> float:     # 10% off lines of 10 or more
    return sum(i.price * i.quantity * (0.9 if i.quantity >= 10 else 1) for i in items)

def three_for_two(items: list[Item]) -> float:     # every third unit free
    return sum(i.price * (i.quantity - i.quantity // 3) for i in items)

class Checkout:
    def __init__(self, pricing: Pricing = full_price) -> None:
        self.items: list[Item] = []
        self.pricing = pricing                      # composition, not inheritance
    def add(self, item: Item) -> None:
        self.items.append(item)
    def total(self) -> float:
        return round(self.pricing(self.items), 2)

basket = [Item("pen", 1.20, 12), Item("pad", 3.50, 3)]
for strategy in (full_price, bulk_discount, three_for_two):
    c = Checkout(strategy)
    for item in basket:
        c.add(item)
    print(f"{strategy.__name__:>14}: {c.total():6.2f}")
```

```console
$ python3 strategy.py
    full_price:  24.90
 bulk_discount:  23.46
 three_for_two:  16.60
```

The checkout knows nothing about any pricing rule; a new promotion is a new function, added without touching `Checkout` (the open–closed principle of [[program-design/inheritance-polymorphism]]). The type alias `Pricing` (written with Python 3.12's `type` statement) documents the interface every strategy must have. In a language without first-class functions, each strategy would be a class implementing a one-method interface; in Python that is only worth it when a strategy needs state or several related operations.
:::
:::

A strategy passed as a parameter is also the cleanest way to break dependencies for testing: a function that needs the current time can take `now: Callable[[], datetime]` as a parameter, defaulting to `datetime.now`, and a test can pass a function returning a fixed time. This is **dependency injection**: the module receives what it depends on rather than importing it, so the dependency edge disappears from the graph.

### Observer

*Problem:* when one object changes, an open-ended set of others must react — the display, a log, an alarm — and the changing object should not depend on any of them. *Solution:* the **subject** keeps a list of **observers** (in Python, usually callables) and notifies each of them of every change; observers **subscribe** and **unsubscribe** at run time.

::: example A thermostat with observers {#ex-observer}
Implement a thermostat that notifies subscribers whenever its temperature changes, with a way to unsubscribe, and attach a log, a display and a fan controller.
::: solution
```python
class Thermostat:
    """Subject: notifies every subscriber of each change of temperature."""
    def __init__(self) -> None:
        self._observers = []
        self._temp = None

    def subscribe(self, callback):
        """Effects: callback(t) will be called on each change; returns an unsubscribe function."""
        self._observers.append(callback)
        return lambda: self._observers.remove(callback)

    def set_temperature(self, t):
        if t != self._temp:
            self._temp = t
            for notify in list(self._observers):   # a copy: observers may unsubscribe
                notify(t)

log = []
th = Thermostat()
th.subscribe(log.append)
cancel_display = th.subscribe(lambda t: print("display:", t))
th.subscribe(lambda t: print("fan on") if t > 25 else None)

th.set_temperature(21)
th.set_temperature(21)         # unchanged: nobody is notified
th.set_temperature(27)
cancel_display()
th.set_temperature(19)
print(log)
```

```console
$ python3 observer.py
display: 21
display: 27
fan on
[21, 27, 19]
```

The thermostat depends on no observer: it calls whatever callables it was given, through the minimal interface "a function of one argument". Dependencies point from the observers to the subject, never back, so new kinds of observer can be added without changing it. Iterating over a *copy* of the list matters: an observer that unsubscribes itself during notification would otherwise change the list being iterated over. The pattern's well-known costs show here too: the order of notification is the order of subscription, an exception in one observer stops the others, and an observer that is never unsubscribed is kept alive by the subject's list (a common source of memory leaks in long-running programs; `weakref` can help).
:::
:::

Observer is the backbone of graphical user interfaces (a button's "on click" handlers), of spreadsheets (cells observing the cells they depend on), and of the publish–subscribe systems of [[distributed-systems]].

### Adapter

*Problem:* an existing class has the right functionality but the wrong interface for the code that must use it, and you cannot change either. *Solution:* write a small **adapter** that holds the existing object and translates calls — composition again.

```python
import math

class LegacyPlot:                       # from a library we cannot change
    def __init__(self, width_m, depth_m):
        self.width_m, self.depth_m = width_m, depth_m
    def get_size_m2(self):
        return self.width_m * self.depth_m

class PlotAdapter:
    """Presents a LegacyPlot through the HasArea interface (area in m^2)."""
    def __init__(self, plot):
        self._plot = plot
    def area(self):
        return self._plot.get_size_m2()

class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return math.pi * self.r ** 2

def total_area(shapes):                 # expects objects with .area()
    return sum(s.area() for s in shapes)

print(round(total_area([Circle(1), PlotAdapter(LegacyPlot(3, 4))]), 4))
```

```console
$ python3 adapter.py
15.1416
```

`total_area` is written against the `HasArea` protocol of [[program-design/types-interfaces]]; the adapter makes the legacy class satisfy it without modifying either side, and keeps the translation — including any unit conversion — in one place.

::: warning Patterns are tools, not goals
A pattern earns its place by solving a problem the program actually has. Introducing a Strategy for a rule that will never vary, or an Observer for a single listener, adds indirection that every reader must see through. Many patterns from the 1994 catalogue, written for C++ and Smalltalk, shrink to a line or disappear in languages with first-class functions and dynamic typing — Peter Norvig observed in 1996 that 16 of the 23 become simpler or "invisible" in Lisp or Dylan, and Python is similar. Learn the patterns as a vocabulary of designs and of the trade-offs they bring, and start from the simplest code that hides the decisions likely to change.
:::

::: history
David Parnas's "On the criteria to be used in decomposing systems into modules" (*Communications of the ACM*, December 1972) introduced information hiding with the KWIC example used in this chapter. Wayne Stevens, Glenford Myers and Larry Constantine's "Structured design" (*IBM Systems Journal*, 1974) introduced coupling and cohesion. Languages built modules in: Modula-2 (Niklaus Wirth, 1978) and Ada (1983) had separately compiled modules with explicit interfaces, and Python's modules and packages followed in the 1990s. The architect Christopher Alexander's *A Pattern Language* (1977) described recurring solutions in buildings and towns; Kent Beck and Ward Cunningham brought the idea to programming at OOPSLA in 1987, and Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides's *Design Patterns: Elements of Reusable Object-Oriented Software* (1994) made it mainstream. Peter Norvig's talk "Design Patterns in Dynamic Languages" (1996) re-examined the catalogue for languages with first-class functions.
:::

## Where this leads

This course has moved from single functions to whole programs: specifications for functions, abstract data types for data, classes and inheritance for implementing them, higher-order functions, immutability and iterators for composing computations, types for checking interfaces, and modules and patterns for dividing a program among its decisions. [[software-engineering]] continues at the scale of systems and teams — architecture, design principles, refactoring, testing and version control — and [[programming-languages]] studies the language mechanisms behind modules, objects, closures and types. The data structures of [[data-structures]] and the algorithms of [[algorithms]] will all be written as the modules and ADTs this course has taught you to design.

::: summary
- A Python **module** is a file, executed once on first import and cached in `sys.modules`; `__name__ == "__main__"` distinguishes running from importing; packages are directories of modules ([[#def-module]]).
- **Information hiding**: give each module one design decision likely to change, and an interface that does not reveal it ([[#def-information-hiding]]). In Parnas's KWIC example, each change touched one module instead of four.
- Aim for **low coupling** and **high cohesion**; coupling ranges from data coupling (fine) through control and common coupling to content coupling (worst) ([[#def-coupling]]).
- A program has a valid dependency order exactly when its **dependency graph** is acyclic ([[#thm-dependency-order]]); Python import cycles fail with partially initialised modules — fix them by redrawing boundaries.
- A **design pattern** names a recurring problem, a solution and its trade-offs ([[#def-pattern]]). **Strategy** (often just a function parameter), **Observer** (subscribe and notify callbacks), **Adapter** (translate an interface by composition), plus Iterator, Template method, Factory method and Decorator met earlier.
- Use patterns where they solve a real problem; in Python many are one-liners.
:::

## Exercises

::: exercise Imported once {level=1 check="1"}
A module `m.py` consists of `print("loading m")` and `x = 1`. How many times is `loading m` printed by a program consisting of `import m`, `import m`, `from m import x`, `import m as mm`? (Enter the number.)
::: solution
Once. The first `import m` executes the file and stores the module in `sys.modules`; every later import, in whatever form, finds it there and does not execute the file again. (`importlib.reload(m)` would execute it a second time.)
:::
:::

::: exercise Name the coupling {level=1}
Classify the coupling between the modules in each case: (a) `invoice.total(lines)` where `lines` is a list of `(price, quantity)` pairs and `total` uses both; (b) `render(doc, fast=True)`, where `fast` switches between two internal algorithms; (c) `config.DEBUG = True` set by one module and read by five others; (d) a test that sets `account._balance = 0` before calling `withdraw`.
::: solution
(a) Data coupling (or, if `total` used only part of each pair, stamp coupling). (b) Control coupling: the caller chooses the callee's internal algorithm; better to expose two functions, or a strategy. (c) Common coupling through a global variable: any module can change behaviour everywhere. (d) Content coupling: the test depends on the account's representation and bypasses its invariant; it should create an account through the constructor (`Account("x", 0)`).
:::
:::

::: exercise Counting build orders {level=1 check="2"}
Modules: `app` imports `ui` and `storage`; `ui` and `storage` both import `model`; `model` imports nothing. How many orders list every module after all modules it depends on? (Enter the number.)
::: solution
`model` must come first (everything depends on it, directly or indirectly) and `app` last (it depends on all the others). `ui` and `storage` do not depend on each other and may come in either order: `model, ui, storage, app` and `model, storage, ui, app`. Two orders.
:::
:::

::: exercise Breaking a cycle {level=2}
Rewrite `pricing.py` and `customers.py` from this chapter so that the dependency graph is acyclic and `main.py` prints the price. Then explain why moving `from pricing import price` inside `preview` would also make the program run, and why it is the weaker fix.
::: solution
Move `preview` into `pricing`, where it belongs (it is about prices), so that `customers` depends on nothing:

```python
# file: customers.py
VIP = {"ada"}

def discount_for(customer):
    return 0.1 if customer in VIP else 0.0
```

```python
# file: pricing.py
from customers import discount_for

def price(customer, amount):
    return amount * (1 - discount_for(customer))

def preview(customer):
    return price(customer, 100)
```

```python
# file: main.py
import pricing
print(pricing.price("ada", 50), pricing.preview("bob"))
```

```console
$ python3 main.py
45.0 100.0
```

An import inside `preview` runs only when `preview` is called, by which time both modules have finished loading, so the names exist. But the modules still depend on each other: neither can be tested or reused without the other, and any future top-level use of `price` in `customers` would bring the error back.
:::
:::

::: exercise Observers that misbehave {level=2}
In the `Thermostat` of [[#ex-observer]], an observer raises an exception. What happens to the observers subscribed after it? Change `set_temperature` so that every observer is notified even if some fail, and the failures are reported afterwards. Discuss whether this is always the right policy.
::: solution
Without changes, the exception propagates out of `set_temperature` at the failing observer, so the later observers are not notified and the temperature has already been updated — the observers now disagree with the subject. A version that isolates failures:

```python
    def set_temperature(self, t):
        if t != self._temp:
            self._temp = t
            errors = []
            for notify in list(self._observers):
                try:
                    notify(t)
                except Exception as e:      # keep notifying the others
                    errors.append(e)
            if errors:
                raise ExceptionGroup("observer failures", errors)
```

`ExceptionGroup` (Python 3.11 and later) carries several exceptions at once. Whether to continue is a policy decision: for independent observers (a log and a display) isolating failures is right; if observers must act together (debit and credit), a failure in one may require undoing the others, and continuing would be wrong. The subject's specification should say which policy it follows.
:::
:::

::: exercise A strategy with state {level=2}
Add a "loyalty" pricing strategy that gives 5% off and counts how many baskets it has priced, without changing `Checkout`. Implement it once as a closure and once as a class with `__call__`, and explain why `Checkout` accepts both.
::: solution
```python
def make_loyalty():
    baskets = 0
    def loyalty(items):
        nonlocal baskets
        baskets += 1
        return 0.95 * sum(i.price * i.quantity for i in items)
    loyalty.count = lambda: baskets
    return loyalty

class Loyalty:
    def __init__(self):
        self.baskets = 0
    def __call__(self, items):
        self.baskets += 1
        return 0.95 * sum(i.price * i.quantity for i in items)
```

`Checkout` calls `self.pricing(self.items)`; anything callable with one argument and returning a number satisfies that interface. A function, a closure and an instance of a class with `__call__` all do — structural typing at work, which the alias `Pricing = Callable[[list[Item]], float]` describes for the type checker. With the basket of [[#ex-strategy]], both compute $0.95 \times 24.90 = 23.655$ in exact arithmetic, but in floating point the product is `23.654999999999998`, so `Checkout.total` reports `23.65` where a shop rounding half-up would charge $23.66$ — one reason money should be computed in integer pence or with `decimal.Decimal` ([[computer-systems/floating-point]]).
:::
:::

::: exercise Import order by Kahn's algorithm {level=3}
Write a function `build_order(deps)` that takes a dictionary mapping each module to the set of modules it imports, and returns a list with every module after its dependencies, or raises `ValueError` naming the modules on a cycle. Use the algorithm in the proof of [[#thm-dependency-order]], keeping a count of each module's unprocessed dependencies so that the whole computation takes $O(n + m)$ time for $n$ modules and $m$ dependencies.
::: solution
```python
from collections import deque

def build_order(deps):
    """deps: module -> set of modules it imports (all keys).  Dependencies first."""
    remaining = {m: len(ds) for m, ds in deps.items()}       # unprocessed dependencies
    users = {m: [] for m in deps}                            # reverse edges
    for m, ds in deps.items():
        for d in ds:
            users[d].append(m)
    ready = deque(sorted(m for m, k in remaining.items() if k == 0))
    order = []
    while ready:
        m = ready.popleft()
        order.append(m)
        for u in users[m]:                  # m is done: one fewer dependency for u
            remaining[u] -= 1
            if remaining[u] == 0:
                ready.append(u)
    if len(order) < len(deps):
        raise ValueError(f"cycle among {sorted(m for m in deps if remaining[m] > 0)}")
    return order

deps = {"app": {"ui", "storage"}, "ui": {"model", "config"},
        "storage": {"model", "config"}, "model": set(), "config": set()}
print(build_order(deps))
try:
    build_order({"pricing": {"customers"}, "customers": {"pricing"}, "main": {"pricing"}})
except ValueError as e:
    print(e)
```

```console
$ python3 kahn.py
['config', 'model', 'ui', 'storage', 'app']
cycle among ['customers', 'main', 'pricing']
```

Each module enters `ready` once, when its count reaches zero, and each dependency edge is examined once when its target is processed, so the time is $O(n + m)$ (the initial `sorted` only makes the output deterministic). If a cycle exists, its modules never reach a count of zero, and neither does anything that depends on them — which is why `main` is reported along with the two modules actually on the cycle. Correctness is the proof of [[#thm-dependency-order]]: a module is appended only when all its dependencies have been appended.
:::
:::

::: exercise Decompose by secrets {level=3}
A small library system lends books to members. It must (1) store books and members, currently in a CSV file but probably in a database later; (2) apply loan rules — loan periods and limits that the library changes every year; (3) send reminders, currently by e-mail but perhaps by text message later; (4) print reports. Propose a decomposition into modules by information hiding: for each module give the decision it hides and a sketch of its interface, and draw the dependency graph. Check your design against the change "loans for children's books last four weeks instead of three".
::: solution
One reasonable design:

- `catalogue` hides the storage format and technology. Interface: `find_book(id)`, `find_member(id)`, `save_loan(loan)`, `loans_due_before(date)`. Nothing else knows about CSV or SQL.
- `rules` hides the loan policy. Interface: `due_date(book, member, today)`, `may_borrow(member, current_loans)`. Pure functions of their arguments, easy to test.
- `notify` hides the delivery channel. Interface: `send_reminder(member, message)`. Swapping e-mail for text messages changes only this module (or passes a different strategy).
- `lending` hides the workflow of borrowing and returning. Interface: `borrow(member_id, book_id, today)`, `give_back(book_id, today)`. It uses `catalogue` and `rules`.
- `reminders` hides when and how often reminders go out: `send_due_reminders(today)`, using `catalogue`, `rules` and `notify`.
- `reports` produces summaries, using `catalogue` only.

Dependencies: `lending → catalogue, rules`; `reminders → catalogue, rules, notify`; `reports → catalogue`; a `main` module depends on `lending`, `reminders` and `reports`. The graph is acyclic, and `rules`, `notify` and `catalogue` depend on nothing in the system. The change to children's loan periods is a policy change, so it touches `rules.due_date` alone; nothing that stores, sends or reports needs to know. A design organised by processing steps instead ("read the CSV, check loans, write the CSV, send e-mails") would spread each of these decisions over several steps — Parnas's first KWIC design again.
:::
:::
