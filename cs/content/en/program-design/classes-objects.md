The rationals of [[program-design/abstract-data-types]] were a working abstract data type, but an uncomfortable one. Nothing in the language connected `make_rat`, `numer`, `add_rat` and `str_rat` to each other: they were four functions that happened to agree about tuples. A client could write `r[0]` instead of `numer(r)` and nothing would complain until the representation changed. Every operation needed a prefix (`intset_insert`, `intset_remove`) to avoid colliding with the operations of other types. And `make_rat(1, 2) == make_rat(1, 2)` worked only by accident of the tuple representation, while `print(r)` showed the raw pair and `r + s` concatenated tuples.

A **class** solves all of these at once. It bundles a representation with the operations on it into a single named unit, gives each operation a short name local to the type, and lets the type take part in Python's own syntax — `==`, `+`, `<`, `print`, `in`, `for` — on its own terms. This chapter shows how classes and objects work in Python: defining classes, constructors and methods; special methods that make a class behave like a built-in type; encapsulation, properties and invariants; and the difference between an object's identity, its value and its state.

## Classes, instances and methods

::: definition Class, instance, attribute, method {#def-class}
A **class** is a named template for objects; executing a `class` statement creates a class object and binds it to the name. Calling the class, `C(args)`, creates a new object, called an **instance** of `C`, and runs the class's **constructor** method `__init__(self, args)` to initialise it. Each instance has its own **attributes** — names bound to values, accessed as `obj.name` — which record its state. A **method** is a function defined in the class body; called as `obj.m(args)`, it receives the instance itself as its first parameter, conventionally named `self`.
:::

Here are the rationals again, as a class. The representation invariant and abstraction function go in the class docstring, where every maintainer will see them.

```python
from math import gcd

class Rational:
    """An immutable rational number.

    Rep: ints self._n, self._d.
    RI:  self._d > 0 and gcd(self._n, self._d) == 1.
    AF:  the rational number self._n / self._d.
    """

    def __init__(self, n, d=1):
        if d == 0:
            raise ZeroDivisionError("denominator is zero")
        if d < 0:
            n, d = -n, -d
        g = gcd(n, d)
        self._n, self._d = n // g, d // g     # establishes RI

    def numer(self):
        return self._n

    def denom(self):
        return self._d

    def add(self, other):
        return Rational(self._n * other._d + other._n * self._d,
                        self._d * other._d)

    def __repr__(self):
        return f"Rational({self._n}, {self._d})"

half = Rational(1, 2)
x = half.add(Rational(1, 3))
print(x, x.numer(), Rational.add(half, half))
print(type(half).__name__, isinstance(half, Rational), vars(half))
```

```console
$ python3 rational1.py
Rational(5, 6) 5 Rational(1, 1)
Rational True {'_n': 1, '_d': 2}
```

Every piece of the ADT has found a place. The constructor `__init__` is the creator: it establishes the invariant. `numer` and `denom` are observers, `add` a producer. The rep — the attributes `_n` and `_d` — lives inside each instance, and `vars(half)` shows it as the instance's attribute dictionary.

### What a method call does

Python has no special machinery for methods beyond one rule of attribute lookup. A method is an ordinary function stored in the class, and

$$
\texttt{obj.m(a, b)} \quad\text{means}\quad \texttt{type(obj).m(obj, a, b)}.
$$

That is why `Rational.add(half, half)` above works and gives the same result as `half.add(half)`: the instance is simply passed as the first argument. The name `self` is a convention, not a keyword.

::: definition Attribute lookup {#def-lookup}
To evaluate `obj.name` for an ordinary attribute:

1. if `name` is in the instance's own attribute dictionary, the result is that value;
2. otherwise, if `name` is defined in the class of `obj` (or, as [[program-design/inheritance-polymorphism]] shows, in one of its base classes), the result is that value — and if it is a function, it is first wrapped as a **bound method** that will supply `obj` as its first argument;
3. otherwise the lookup raises `AttributeError`.

Assignment `obj.name = value` always binds `name` in the instance's own dictionary.
:::

(Properties, introduced below, are an exception to the first rule: a property in the class takes precedence over the instance dictionary. The full rule involves *descriptors*; the simplified version above is enough for this course.)

::: example Tracing construction and a call {#ex-trace-init}
Trace what happens when Python executes `r = Rational(6, -9)` and then `r.add(r)`.
::: solution
1. `Rational(6, -9)` first creates a new, empty instance of `Rational` (by the inherited method `__new__`), then calls `Rational.__init__(instance, 6, -9)`. In that call's frame, `self` is the new instance, `n = 6`, `d = -9`.
2. Since `d < 0`, the frame's `n` and `d` become `-6` and `9`. `gcd(-6, 9)` is `3` (`math.gcd` always returns a non-negative result), so `self._n, self._d = -2, 3` binds two attributes in the instance's dictionary. `__init__` returns `None`; the value of the call expression is the instance, which is bound to `r`.
3. `r.add` is looked up: `add` is not in `vars(r)`, which holds only `_n` and `_d`, so it is found in the class and bound to `r`. The call `r.add(r)` becomes `Rational.add(r, r)`, with both `self` and `other` naming the same object.
4. The body computes `Rational(-2 * 3 + -2 * 3, 3 * 3)`, i.e. `Rational(-12, 9)`, whose `__init__` reduces it to `_n = -4`, `_d = 3`. The result is a *new* instance; `r` is unchanged, as an immutable type requires.
:::
:::

### Class attributes and instance attributes

Names bound directly in the class body, outside any method, are **class attributes**, shared by all instances. Methods are class attributes; so are constants that belong to the type.

```python
class Circle:
    pi = 3.14159                 # class attribute, shared
    count = 0                    # number of circles created

    def __init__(self, r):
        self.r = r               # instance attribute
        Circle.count += 1        # update the shared counter through the class

    def area(self):
        return self.pi * self.r ** 2

a, b = Circle(1), Circle(2)
b.pi = 3                         # creates an instance attribute on b only
print(a.area(), b.area(), Circle.count, a.count)
print(vars(a), vars(b))
```

```console
$ python3 circle.py
3.14159 12 2 2
{'r': 1} {'r': 2, 'pi': 3}
```

By [[#def-lookup]], `a.pi` finds the class attribute, while `b.pi = 3` creates a new instance attribute that *shadows* it for `b` alone. Writing `self.count += 1` inside `__init__` would have done the same: read the class value, then bind an instance attribute, leaving `Circle.count` at zero — which is why the counter is updated through `Circle`.

::: warning A mutable class attribute is shared by every instance
Writing `items = []` in a class body and then `self.items.append(x)` in a method does not give each instance its own list. There is one list, belonging to the class, and every instance appends to it — the same mistake as the shared mutable default argument of [[programming-1/functions]]. Initialise per-instance state in `__init__` (`self.items = []`). Class attributes should be constants or deliberately shared data.
:::

## Making a class behave like a built-in type

Python's syntax is defined in terms of **special methods** (also called *dunder* methods, for the double underscores). The expression `a + b` calls `a.__add__(b)`; `a == b` calls `a.__eq__(b)`; `str(a)` and `print(a)` call `a.__str__()`; `len(a)` calls `a.__len__()`; `x in a` calls `a.__contains__(x)`. Defining these methods lets an ADT use the language's notation with the ADT's own meaning.

```python
from math import gcd

class Rational:
    """Immutable rational. RI: _d > 0, gcd(_n, _d) == 1. AF: _n / _d."""
    def __init__(self, n, d=1):
        if d == 0:
            raise ZeroDivisionError("denominator is zero")
        if d < 0:
            n, d = -n, -d
        g = gcd(n, d)
        self._n, self._d = n // g, d // g

    @staticmethod
    def _coerce(x):                      # accept ints where a Rational is expected
        return Rational(x) if isinstance(x, int) else x

    def __add__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented        # let Python try other.__radd__ or fail
        return Rational(self._n * other._d + other._n * self._d, self._d * other._d)
    __radd__ = __add__                   # 1 + r: addition is commutative

    def __mul__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented
        return Rational(self._n * other._n, self._d * other._d)
    __rmul__ = __mul__

    def __eq__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented
        return self._n == other._n and self._d == other._d   # valid by RI

    def __hash__(self):                  # equal values must have equal hashes
        return hash(self._n) if self._d == 1 else hash((self._n, self._d))

    def __repr__(self):
        return f"Rational({self._n}, {self._d})"

    def __str__(self):
        return str(self._n) if self._d == 1 else f"{self._n}/{self._d}"
```

```python
h = Rational(1, 2)
print(h + Rational(1, 3), 1 + h, h * 4, h == Rational(2, 4), h == 0.5)
print(sum([Rational(1, n) for n in range(1, 5)], Rational(0)))
print(len({Rational(1, 2), Rational(2, 4), Rational(3, 6), Rational(2), 2}))
print([h, Rational(5, 3)])
```

(Run together with the class above, this prints)

```text
5/6 3/2 2 True False
25/12
2
[Rational(1, 2), Rational(5, 3)]
```

Several design decisions are visible here.

- **Returning `NotImplemented`** (a special constant, not an exception) tells Python that this method does not know how to handle the other operand. For `h == 0.5`, `Rational.__eq__` returns `NotImplemented`, Python then tries `float.__eq__(0.5, h)`, which also declines, and finally falls back to identity comparison, giving `False`. For `1 + h`, `int.__add__(1, h)` declines and Python calls `h.__radd__(1)`.
- **`__repr__` and `__str__`** serve different readers: `repr` is for programmers (unambiguous, ideally valid Python, used inside lists and by the debugger), `str` for end users.
- **`__eq__` uses the invariant.** Because each rational has exactly one rep satisfying $RI$ (proved in the exercises of [[program-design/abstract-data-types]]), comparing attributes is comparing values.
- **`__hash__` agrees with `__eq__`**, including across types: `Rational(2) == 2`, so `hash(Rational(2))` must equal `hash(2)`, which is why integers are hashed specially. The set in the third line therefore has only two elements, $\tfrac12$ and $2$.

The last point is a rule, not a convenience.

::: definition The equality and hashing contract {#def-eq-contract}
For a class to be used correctly by dictionaries, sets and the rest of the language, its `__eq__` must be an **equivalence relation** on the values it accepts — reflexive ($x = x$), symmetric ($x = y \Rightarrow y = x$) and transitive ($x = y \land y = z \Rightarrow x = z$) — and its `__hash__` must satisfy

$$
x == y \implies \texttt{hash}(x) = \texttt{hash}(y).
$$

Moreover, the hash of an object used as a dictionary key or set element must not change while it is stored there. Defining `__eq__` without `__hash__` sets `__hash__` to `None`, making instances **unhashable**: they cannot be set elements or dictionary keys at all.
:::

The hash condition is a direct consequence of how hash tables work ([[data-structures/hash-tables]]): a lookup computes the hash of the key, goes to the corresponding bucket, and only then compares with `==`. If equal objects could have different hashes, a lookup would search the wrong bucket and miss.

::: example Equality that is not an equivalence {#ex-tolerance}
Measurements from a sensor are compared "up to noise": a programmer writes a class `Reading` whose `__eq__` returns `abs(self.v - other.v) < 0.1`. Show that this is not an equivalence relation, and explain what goes wrong if it is used with a set.
::: solution
Take readings $a = 0$, $b = 0.06$, $c = 0.12$. Then $a = b$ (the difference is $0.06 < 0.1$) and $b = c$ (difference $0.06$), but $a \neq c$ (difference $0.12$). Transitivity fails.

No hash function can be consistent with this `__eq__` except one that is constant (or constant on long runs of values): $a = b$ forces $\texttt{hash}(a) = \texttt{hash}(b)$, $b = c$ forces $\texttt{hash}(b) = \texttt{hash}(c)$, and chains of readings $0.06$ apart link every value to every other, so all readings would need the same hash. With such a hash every element lands in one bucket, making the set a slow list, and its contents still depend on insertion order: inserting $a$, $c$, $b$ keeps two elements ($b$ is rejected as "equal" to $a$), while inserting $b$, $a$, $c$ keeps only $b$, because both $a$ and $c$ "equal" $b$. Approximate comparison is a useful *function* (`math.isclose`), but it must not be the type's `==`.
:::
:::

::: widget relation
set: a; b; c
pairs: a,a; b,b; c,c; a,b; b,a; b,c; c,b
view: properties
name: E
caption: The relation "differs by less than $0.1$" on the readings $a = 0$, $b = 0.06$, $c = 0.12$. It is reflexive and symmetric but not transitive: $a\,E\,b$ and $b\,E\,c$, yet not $a\,E\,c$. Click the matrix to add the pairs $(a, c)$ and $(c, a)$ and the relation becomes an equivalence with a single class — the only way to make a "tolerance" equality transitive is to make everything equal.
:::

## Encapsulation and properties

Python has no `private` keyword. Encapsulation is a matter of convention, supported by a little syntax.

- A name starting with one underscore, such as `_n`, is **internal**: part of the representation, not of the interface. Clients *can* read `r._n`, but they are told not to, and tools (linters, documentation generators) respect the convention.
- A name starting with two underscores and not ending with two, such as `__secret`, is **mangled**: inside class `Account`, `self.__secret` is stored as `_Account__secret`. Mangling avoids accidental clashes with names used by subclasses; it is not a security mechanism.

The convention works because Python programmers treat it as part of the contract: code that reaches into `_attributes` of another class is broken by definition when that class changes, exactly as a client that used `r[0]` was. Languages such as Java and C++ enforce the boundary in the compiler; Python trusts the programmer and makes violations visible in the source.

A **property** lets a class present an observer as if it were a plain attribute, while keeping control over it. Decorating a method with `@property` makes `obj.name` call the method; with no setter defined, assignment is refused.

```python
from functools import total_ordering

@total_ordering                       # derives <=, >, >= from __eq__ and __lt__
class Time:
    """A time of day to the minute.  RI: 0 <= _m < 1440.  AF: _m minutes after midnight."""
    def __init__(self, hour, minute):
        if not (0 <= hour < 24 and 0 <= minute < 60):
            raise ValueError(f"invalid time {hour}:{minute}")
        self._m = 60 * hour + minute

    @classmethod
    def from_minutes(cls, m):         # a second creator
        m %= 1440                     # Python's % lands in [0, 1440): restores RI
        return cls(m // 60, m % 60)

    @property
    def hour(self):   return self._m // 60
    @property
    def minute(self): return self._m % 60

    def plus(self, minutes):   return Time.from_minutes(self._m + minutes)
    def __eq__(self, other):   return isinstance(other, Time) and self._m == other._m
    def __lt__(self, other):
        return self._m < other._m if isinstance(other, Time) else NotImplemented
    def __hash__(self):        return hash(self._m)
    def __repr__(self):        return f"Time({self.hour}, {self.minute})"
    def __str__(self):         return f"{self.hour:02d}:{self.minute:02d}"

t = Time(23, 50)
print(t, t.plus(25), t.plus(-24 * 60), t.hour, t.minute)
print(sorted([Time(9, 5), Time(8, 59), Time(12, 0)]), Time(8, 0) >= Time(7, 59))
try:
    t.hour = 3
except AttributeError as e:
    print("AttributeError:", e)
```

```console
$ python3 time_of_day.py
23:50 00:15 23:50 23 50
[Time(8, 59), Time(9, 5), Time(12, 0)] True
AttributeError: property 'hour' of 'Time' object has no setter
```

The class shows the full pattern for a small immutable value type: the invariant in the docstring, a constructor that validates its arguments, an alternative constructor `from_minutes` (a `@classmethod` receives the class as `cls`, so it also works for subclasses), properties for the observers, and special methods for printing, equality, hashing and ordering. Note how `from_minutes` *restores* the invariant with `%`, so `plus` works for any number of minutes, positive or negative.

### Mutable objects and their invariants

Mutable classes need invariants just as much, and their mutators must preserve them on every path, including the paths that raise exceptions.

::: example A bank account {#ex-account}
Design a class for a bank account whose balance, in pence, may never be negative. Withdrawals that would overdraw must fail without changing the balance.
::: solution
```python
class InsufficientFunds(Exception):
    """Raised when a withdrawal exceeds the balance."""

class Account:
    """A bank account.  RI: self._balance is an int >= 0 (pence)."""
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("opening balance must be non-negative")
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self._balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("withdrawal must be positive")
        if amount > self._balance:                    # check before changing anything
            raise InsufficientFunds(f"balance {self._balance}, requested {amount}")
        self._balance -= amount

acct = Account("Ada", 5000)
acct.withdraw(1200)
try:
    acct.withdraw(10_000)
except InsufficientFunds as e:
    print("refused:", e)
print(acct.owner, acct.balance)
```

```console
$ python3 account.py
refused: balance 3800, requested 10000
Ada 3800
```

Each mutator checks *all* of its conditions before changing the state, so a failing call leaves the object exactly as it was — the **strong exception guarantee**. If `withdraw` subtracted first and checked afterwards, a refused withdrawal would leave the invariant broken. `InsufficientFunds` is a new exception type, defined as a class derived from `Exception`; callers can catch it specifically, without also catching unrelated `ValueError`s. (Deriving one class from another is the subject of the next chapter.) Making `balance` a read-only property means clients cannot write `acct.balance = -100`; they can still write `acct._balance = -100`, but then the broken invariant is visibly their fault.
:::
:::

::: quiz
In the `Account` class, which change would let a client break the invariant using only public names?
- [ ] Renaming `_balance` to `__balance`
- [x] Adding a method `history(self)` that returns the internal list `self._transactions`, if the balance is recomputed from that list
- [ ] Adding a method `statement(self)` that returns a string
- [ ] Making `owner` a read-only property
::: solution
Returning an internal mutable list is representation exposure ([[program-design/abstract-data-types]]): a client could append a fake withdrawal to it and, if the balance were derived from the list, drive it negative. A string is immutable and cannot be used to change the account. Name mangling and read-only properties only make access *harder*, so they cannot introduce a way to break the invariant.
:::
:::

## Identity, equality and state

Every object has three things: an **identity** (which object it is; never changes during its lifetime, and `id(obj)` reports it as an integer), a **type** (never changes either), and a **value** or **state** (the contents of its attributes, which may change if the object is mutable). Python has two comparisons to match.

- `x is y` tests identity: are these the same object?
- `x == y` tests equality of value, as defined by `__eq__`. A class that does not define `__eq__` inherits the default, which *is* identity: two distinct `Account` objects with the same owner and balance are not `==`.

```python
a = Account("Ada", 100)
b = a                            # a second name for the same object
c = Account("Ada", 100)          # a different object with the same state
b.deposit(50)
print(a.balance, a is b, a is c, a == c)
```

(With `Account` from [[#ex-account]], this prints `150 True False False`.) The deposit through `b` is visible through `a`, because `a` and `b` are **aliases**: two names, one object. This is exactly the aliasing of lists in [[programming-1/sequences]], and it is usually what you want for objects with identity, like accounts: there is one account, however many variables refer to it.

::: widget mapping
domain: a; b; c
codomain: account 1; account 2
map: a>account 1; b>account 1; c>account 2
editable: true
caption: Names map to objects. `a` and `b` are aliases of one `Account`; `c` names a second account with the same state. The map from names to objects is not injective, and that is aliasing: any change made through `b` is seen through `a`. Drag `c`'s arrow to `account 1` to model `c = a` — now all three names see every deposit. The `is` operator asks whether two names map to the same point on the right.
:::

The distinction between identity and value shapes how a class should define equality.

- **Value objects** — rationals, times, points, money amounts — are defined entirely by their value. They should usually be immutable, define `__eq__` and `__hash__` by value, and may be freely copied and shared, since nobody can change them.
- **Entity objects** — accounts, users, open files, network connections — have an identity that persists while their state changes. They should usually keep the default identity-based `__eq__` and `__hash__`.

Mixing the two causes a classic bug: a mutable object whose hash depends on its state.

::: example A key that disappears {#ex-lost-key}
A `Point` class defines `__eq__` and `__hash__` from its mutable attributes `x` and `y`. What does this program print, and why?

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __eq__(self, other):
        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)
    def __hash__(self):
        return hash((self.x, self.y))

p = Point(1, 2)
s = {p}
p.x = 5                          # mutate an object that is inside a set
print(p in s, Point(1, 2) in s, Point(5, 2) in s, len(s))
print(any(q is p for q in s))
```
::: solution
```console
$ python3 lostkey.py
False False False 1
True
```

When `p` was added, the set stored it in the bucket for `hash((1, 2))`. After `p.x = 5`, the lookup `p in s` computes `hash((5, 2))` and searches a different bucket, so it does not find `p`. `Point(1, 2) in s` searches the right bucket, but the object there now compares unequal to `(1, 2)`. `Point(5, 2)` fails for the same reason as `p`. The point is still in the set — iterating over it finds the very object — but no lookup can reach it. The set's invariant ("every element is in the bucket of its hash") was broken from outside, by the violation of the last clause of [[#def-eq-contract]]. The fix is to make `Point` immutable (for example `@dataclass(frozen=True)`) or to keep identity-based equality.
:::
:::

::: warning `is` is not a faster `==`
`x is y` and `x == y` answer different questions. Use `is` only for identity checks, above all `x is None`. For values, use `==`: two equal strings or integers may or may not be the same object, depending on how they were created and on implementation details such as CPython's caching of small integers, so `x is 1000` may be `False` when `x == 1000` is `True` (Python warns: `SyntaxWarning: "is" with 'int' literal`).
:::

### Data classes

Writing `__init__`, `__repr__` and `__eq__` for every small value type is repetitive. The standard module `dataclasses` (Python 3.7 and later) generates them from annotated class attributes:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def norm(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(p, p.norm(), p == Point(3, 4), len({p, Point(3, 4)}))
try:
    p.x = 0
except AttributeError as e:
    print(type(e).__name__, "-", e)
```

```console
$ python3 dc.py
Point(x=3, y=4) 5.0 True 1
FrozenInstanceError - cannot assign to field 'x'
```

`frozen=True` makes instances immutable and, because equality and hashing are then safe, also generates `__hash__`. The annotations `x: float` are type hints, explained in [[program-design/types-interfaces]]; Python does not check them at run time (`Point(3, 4)` stores integers). A data class is a quick way to make a value type, but it does not write the representation invariant for you: if one is needed, check it in a `__post_init__` method.

::: history
The class and the object come from Simula 67, designed by Ole-Johan Dahl and Kristen Nygaard at the Norwegian Computing Center to write simulations: each simulated entity was an object, an instance of a class that bundled its data with its procedures, and Simula already had subclasses and virtual procedures. Alan Kay, who coined the term "object-oriented programming", developed Smalltalk at Xerox PARC from 1972, with everything an object and computation as messages between objects; Smalltalk-80 was published in Adele Goldberg and David Robson's *Smalltalk-80: The Language and its Implementation* (1983). Bjarne Stroustrup's C++ (first commercial release 1985) brought Simula's classes to C, and Java (1995) made classes the unit of every program. Python has had classes since its first public release by Guido van Rossum in 1991; the `dataclasses` module arrived with Python 3.7 in 2018.
:::

## Where this leads

Classes are the unit of design for the rest of this course. [[program-design/inheritance-polymorphism]] defines classes in terms of other classes and lets one piece of code work on objects of many classes; [[program-design/iterators-generators]] uses the special methods `__iter__` and `__next__` to make objects work with `for`; [[program-design/types-interfaces]] describes classes to a type checker. In [[data-structures]], every structure — linked lists, trees, heaps — is a class with a representation invariant, and in [[software-engineering]] classes are grouped into larger components with the design principles that decide which class should own which responsibility.

::: summary
- A **class** bundles a representation (instance attributes) with operations (methods); `__init__` is the creator and must establish the representation invariant ([[#def-class]]).
- `obj.m(args)` means `type(obj).m(obj, args)`: methods are functions in the class, and attribute lookup searches the instance, then the class ([[#def-lookup]]). Assignment to `obj.name` always binds an instance attribute.
- **Special methods** (`__add__`, `__eq__`, `__hash__`, `__lt__`, `__repr__`, `__str__`, …) let a type use Python's syntax with its own meaning; return `NotImplemented` for operands you do not handle.
- `__eq__` must be an equivalence relation and equal objects must have equal hashes; the hash of a stored key must not change ([[#def-eq-contract]]). Defining `__eq__` alone makes a class unhashable.
- Encapsulation in Python is by convention (`_name`) plus properties for read-only access; mutators should check everything before changing anything.
- Objects have identity (`is`), type and state; **value objects** should be immutable with value equality, **entity objects** keep identity equality. Aliases share one object.
- `@dataclass(frozen=True)` generates the boilerplate of a value type, but not its invariant.
:::

## Exercises

::: exercise Class or instance? {level=1 check="-7"}
What is printed by the last line?

```python
class Counter:
    n = 0
    def tick(self):
        self.n += 1

a, b = Counter(), Counter()
a.tick(); a.tick(); b.tick()
Counter.n = 10
print(a.n + b.n - Counter.n)
```

(Enter the number.)
::: solution
```console
$ python3 counter.py
-7
```

`self.n += 1` means `self.n = self.n + 1`. The first `a.tick()` reads `self.n`, which by [[#def-lookup]] finds the class attribute `0`, and then *binds an instance attribute* `a.n = 1`; the second call reads the instance attribute and sets `a.n = 2`. Likewise `b.n = 1`. Setting `Counter.n = 10` changes only the class attribute, which both instances now shadow. So the line prints $2 + 1 - 10 = -7$.
:::
:::

::: exercise Method calls without dots {level=1}
Rewrite each call without using a bound method, in the form `Class.method(obj, …)`: (a) `"a,b".split(",")`; (b) `xs.append(3)` for a list `xs`; (c) `Rational(1, 2).add(Rational(1, 3))`; (d) `acct.withdraw(100)`.
::: solution
(a) `str.split("a,b", ",")`. (b) `list.append(xs, 3)`. (c) `Rational.add(Rational(1, 2), Rational(1, 3))`. (d) `Account.withdraw(acct, 100)`. In every case the object before the dot becomes the first argument — the `self` of the method.
:::
:::

::: exercise How big is the set? {level=2 check="5"}
With the `Rational` class that defines `__eq__` and `__hash__` (and declines floats), how many elements does the set `{Rational(1, 2), Rational(2, 4), Rational(-1, -2), Rational(1, 3), Rational(3), 3, 3.0, Rational(0, 5), 0}` have? (Enter the number.) What does the answer reveal about the class?
::: solution
```console
$ python3 setsize.py
5
```

A set literal adds its elements from left to right and keeps an element only if no element already present is `==` to it. The three spellings of $\tfrac12$ give one element, and `Rational(1, 3)` a second. `Rational(3)` is added; `3` is equal to it (`Rational.__eq__` coerces ints, and the hashes agree), so it is not. `3.0` has the same hash as `3`, but compared with the stored `Rational(3)` both `float.__eq__` and `Rational.__eq__` return `NotImplemented`, so Python falls back to identity and they are *unequal*: `3.0` is added. Finally `Rational(0, 5)` is added and `0` is equal to it. That leaves $\tfrac12$, $\tfrac13$, `Rational(3)`, `3.0` and $0$: five elements.

The surprise reveals that this `==` is not transitive across types: `Rational(3) == 3` and `3 == 3.0`, yet `Rational(3) != 3.0`, violating [[#def-eq-contract]]. The size of the set now depends on the order of the literal (put `3` first and the set has four elements). The standard library's `fractions.Fraction` avoids this by also comparing exactly with floats.
:::
:::

::: exercise A stack class {level=2}
Write a class `Stack` with methods `push(x)`, `pop()` and `peek()`, a `__len__` method and a `__repr__` showing the items bottom to top, represented by a Python list. `pop` and `peek` on an empty stack must raise `IndexError` with the message `"empty stack"`. Then show that `if stack:` works on your class, and explain why.
::: solution
```python
class Stack:
    """LIFO stack. Rep: list self._items, bottom first. AF: the stack of those items."""
    def __init__(self):
        self._items = []
    def push(self, x):
        self._items.append(x)
    def pop(self):
        if not self._items:
            raise IndexError("empty stack")
        return self._items.pop()
    def peek(self):
        if not self._items:
            raise IndexError("empty stack")
        return self._items[-1]
    def __len__(self):
        return len(self._items)
    def __repr__(self):
        return f"Stack({self._items!r})"

s = Stack()
for x in "abc":
    s.push(x)
print(s, s.pop(), s.peek(), len(s), bool(s), bool(Stack()))
```

```console
$ python3 stackclass.py
Stack(['a', 'b']) c b 2 True False
```

`if stack:` works because, when a class defines no `__bool__`, Python's truth test calls `__len__` and treats a length of $0$ as false. (Notice that the first item printed shows only `a` and `b`: `print` evaluates all its arguments — including `s.pop()` — before it converts any of them to strings, so `s` is displayed after the pop.)
:::
:::

::: exercise The shared list {level=1}
Explain the output of this program and fix the class.

```python
class Playlist:
    songs = []
    def __init__(self, name):
        self.name = name
    def add(self, song):
        self.songs.append(song)

rock, jazz = Playlist("rock"), Playlist("jazz")
rock.add("Paranoid"); jazz.add("So What")
print(rock.songs)
```
::: solution
It prints `['Paranoid', 'So What']`. `songs` is a class attribute, and `self.songs.append(song)` does not *assign* to `self.songs` — it looks the name up (finding the class's list, by [[#def-lookup]]) and mutates that one list. Both playlists share it. Fix: create the list per instance in `__init__`:

```python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []
    def add(self, song):
        self.songs.append(song)
```
:::
:::

::: exercise Ordering rationals {level=2}
Add `__lt__` to the `Rational` class with operators and decorate the class with `functools.total_ordering`. Then sort `[Rational(2, 3), Rational(-1, 2), Rational(5, 8), 1]` and find the maximum of the list. Why is it enough to compare $n_1 d_2$ with $n_2 d_1$?
::: solution
```python
    def __lt__(self, other):
        other = Rational._coerce(other)
        if not isinstance(other, Rational):
            return NotImplemented
        return self._n * other._d < other._n * self._d
```

With this method, `sorted([Rational(2, 3), Rational(-1, 2), Rational(5, 8), 1])` gives `[Rational(-1, 2), Rational(5, 8), Rational(2, 3), 1]` and `max` gives `1`, the int. Comparisons between an int and a `Rational` work in both orders: `int`'s comparison methods return `NotImplemented` for a `Rational`, so Python calls the reflected method of the `Rational` (for `1 < r` that is `r.__gt__(1)`, which `total_ordering` derives). Since the invariant makes both denominators positive, multiplying the inequality $\frac{n_1}{d_1} < \frac{n_2}{d_2}$ by $d_1 d_2 > 0$ preserves its direction, giving $n_1 d_2 < n_2 d_1$ — exact integer arithmetic, no division, no rounding. Without the invariant $d > 0$ the comparison would be wrong for negative denominators.
:::
:::

::: exercise The hash of an integer-valued rational {level=3}
Suppose `__hash__` in the `Rational` class were simply `hash((self._n, self._d))`. Prove that the contract of [[#def-eq-contract]] would then be violated, and give a two-element set literal that would have two elements although its elements are `==`. Then prove that the given `__hash__` satisfies the contract for all pairs of `Rational` and `int` values that `__eq__` accepts.
::: solution
`Rational.__eq__` coerces ints, so `Rational(2) == 2` is `True`. With `hash((2, 1))`, equality would hold but `hash(Rational(2)) == hash(2)` would (almost certainly) fail, since `hash(2) == 2` while tuple hashes are computed by mixing the elements' hashes. Then `{Rational(2), 2}` would usually have two elements: the two objects land in different buckets and are never compared. (Even in an unlucky bucket collision, the rule would be broken; the contract must hold for all values, not just usually.)

With the given definition: take $x == y$ with both accepted by `__eq__`. *Case both Rational:* by the invariant and [[program-design/abstract-data-types]], equal rationals have identical reps $(n, d)$, so both hashes are computed from the same $(n, d)$ by the same branch and are equal. *Case $x$ Rational, $y$ an int $k$:* `__eq__` compares $x$ with `Rational(k)` = $(k, 1)$, so $x$'s rep is $(k, 1)$ and `hash(x)` is `hash(k)` by the first branch, equal to `hash(y)`. *Case both ints:* Python's own `int` hash. So equal values always have equal hashes.
:::
:::

::: exercise A vector type {level=3}
Write an immutable class `Vec` for 2D vectors with `__add__`, `__sub__`, `__mul__` for multiplication by a number (on either side, so `2 * v` and `v * 2` both work), `__eq__`, `__hash__`, `__abs__` (the length) and `__repr__`. Multiplying two vectors with `*` should raise `TypeError`. Explain how Python evaluates `2 * v`.
::: solution
```python
class Vec:
    """Immutable 2D vector. Rep: floats or ints self._x, self._y."""
    def __init__(self, x, y):
        self._x, self._y = x, y
    def __add__(self, o):
        return Vec(self._x + o._x, self._y + o._y) if isinstance(o, Vec) else NotImplemented
    def __sub__(self, o):
        return Vec(self._x - o._x, self._y - o._y) if isinstance(o, Vec) else NotImplemented
    def __mul__(self, k):
        if isinstance(k, (int, float)):
            return Vec(k * self._x, k * self._y)
        return NotImplemented
    __rmul__ = __mul__
    def __eq__(self, o):
        return isinstance(o, Vec) and (self._x, self._y) == (o._x, o._y)
    def __hash__(self):
        return hash((self._x, self._y))
    def __abs__(self):
        return (self._x ** 2 + self._y ** 2) ** 0.5
    def __repr__(self):
        return f"Vec({self._x}, {self._y})"

v, w = Vec(3, 4), Vec(1, -1)
print(v + w, v - w, 2 * v, v * 0.5, abs(v), v == Vec(3, 4))
try:
    v * w
except TypeError as e:
    print("TypeError:", e)
```

```console
$ python3 vec.py
Vec(4, 3) Vec(2, 5) Vec(6, 8) Vec(1.5, 2.0) 5.0 True
TypeError: unsupported operand type(s) for *: 'Vec' and 'Vec'
```

For `2 * v`, Python first calls `int.__mul__(2, v)`, which returns `NotImplemented` because `int` knows nothing about `Vec`; it then tries the reflected method of the right operand, `v.__rmul__(2)`, which here is `__mul__` and returns `Vec(6, 8)`. For `v * w` both `v.__mul__(w)` and `w.__rmul__(v)` return `NotImplemented`, so Python raises `TypeError`.
:::
:::
