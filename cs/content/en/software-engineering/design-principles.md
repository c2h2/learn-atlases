A reporting module computes monthly sales by running SQL queries against a PostgreSQL database. It works. Then three things happen in one year: the finance team wants the same report from archived data in files, the developers want to test the report without starting a database, and the operations team moves the live data to a different database product. Each request means editing the report — and the web pages that call it, because they pass it a database connection, and the order module, which shares its query helpers. None of these changes was unreasonable or unforeseeable. The code was simply arranged so that a decision likely to change (where the data lives) was known to many modules, and a module that should have been stable (the business logic of the report) depended on one that was not.

**Design principles** are rules of thumb, distilled from such experiences, for arranging code so that likely changes stay local. They are not theorems: each is a heuristic with costs, and applying one blindly produces its own kind of mess. But several of them can be made precise enough to measure, and the reasoning behind them is the same reasoning about dependencies that [[program-design/modules-patterns]] introduced with information hiding, coupling and cohesion. This chapter builds on that: we measure dependencies and their consequences, study the five **SOLID** principles and the Law of Demeter with small runnable examples, and end with how to design for change without designing for every imaginable change.

## Dependencies and the ripple effect

Recall from [[program-design/modules-patterns#def-coupling]] that **coupling** is how much modules depend on each other and **cohesion** how well the parts of one module belong together. Larry Constantine introduced both ideas in the late 1960s, and Stevens, Myers and Constantine's "Structured design" (*IBM Systems Journal*, 1974) made them standard. Why is low coupling good? Because changes propagate along dependencies.

::: definition Dependents and impact set {#def-impact}
In a dependency graph whose edge $A \to B$ means "module $A$ uses module $B$", the **dependents** of $B$ are the modules with an edge into $B$, and the **impact set** of $B$ is the set of modules other than $B$ from which there is a directed path to $B$ — the modules that may have to change, be retested or be redeployed when $B$'s interface or behaviour changes.
:::

The impact set is a worst case: a change that preserves $B$'s specification ([[program-design/abstraction-specifications]]) affects no client, while a change to its interface may ripple all the way up. It is computed by graph search on the reversed graph. Robert Martin proposed simple measures of each module's position in the graph.

::: definition Afferent and efferent coupling, instability {#def-instability}
For a module $M$, the **afferent coupling** $C_a(M)$ is the number of modules that depend on $M$ (its fan-in), and the **efferent coupling** $C_e(M)$ the number of modules $M$ depends on (its fan-out). Its **instability** is
$$
I(M) = \frac{C_e(M)}{C_a(M) + C_e(M)} \in [0, 1],
$$
(taken as $0$ for an isolated module). A module with $I = 0$ is **stable** — many depend on it and it depends on nothing, so it is hard to change; a module with $I = 1$ is **unstable** — nothing depends on it, so it is free to change.
:::

"Stable" here means *costly to change*, not *unlikely to change*. The danger is a mismatch: a module that is costly to change but is in fact likely to change. Martin's **stable dependencies principle** says: depend in the direction of stability. The database module in the introduction violates it — it is concrete, full of details likely to change, yet the business logic depends on it.

::: example Measuring the report {#ex-instability}
Compute the instability of each module and the impact set of `postgres` for the shop's report code, before and after the report and the orders are made to depend on an interface `store` that the PostgreSQL adapter implements.
::: solution
```python
from collections import deque

def dependents(deps):
    """Reverse the graph: module -> set of modules that import it."""
    rev = {m: set() for m in deps}
    for m, used in deps.items():
        for u in used:
            rev[u].add(m)
    return rev

def instability(deps):
    rev = dependents(deps)
    out = {}
    for m in deps:
        ce, ca = len(deps[m]), len(rev[m])      # efferent (out), afferent (in)
        out[m] = (ca, ce, ce / (ca + ce) if ca + ce else 0.0)
    return out

def impact(deps, changed):
    """Modules that may need to change when `changed` does: those with a path to it."""
    rev, seen, queue = dependents(deps), {changed}, deque([changed])
    while queue:
        for m in rev[queue.popleft()]:
            if m not in seen:
                seen.add(m)
                queue.append(m)
    return sorted(seen - {changed})

before = {"web": {"reports", "orders"}, "reports": {"postgres"},
          "orders": {"postgres", "pricing"}, "pricing": set(), "postgres": set(),
          "main": {"web"}}
after = {"web": {"reports", "orders"}, "reports": {"store"},
         "orders": {"store", "pricing"}, "pricing": set(), "store": set(),
         "postgres": {"store"},               # the database adapter implements `store`
         "main": {"web", "postgres"}}         # composition root: plugs postgres in

for name, deps in (("before", before), ("after", after)):
    print(name)
    for m, (ca, ce, i) in instability(deps).items():
        print(f"  {m:9} Ca={ca} Ce={ce} I={i:.2f}")
    print("  impact of changing postgres:", impact(deps, "postgres"))
```

```console
$ python3 metrics.py
before
  web       Ca=1 Ce=2 I=0.67
  reports   Ca=1 Ce=1 I=0.50
  orders    Ca=1 Ce=2 I=0.67
  pricing   Ca=1 Ce=0 I=0.00
  postgres  Ca=2 Ce=0 I=0.00
  main      Ca=0 Ce=1 I=1.00
  impact of changing postgres: ['main', 'orders', 'reports', 'web']
after
  web       Ca=1 Ce=2 I=0.67
  reports   Ca=1 Ce=1 I=0.50
  orders    Ca=1 Ce=2 I=0.67
  pricing   Ca=1 Ce=0 I=0.00
  store     Ca=3 Ce=0 I=0.00
  postgres  Ca=1 Ce=1 I=0.50
  main      Ca=0 Ce=2 I=1.00
  impact of changing postgres: ['main']
```

Before, `postgres` is maximally stable ($I = 0$) — two modules depend on it and, transitively, everything does — although it is the module most likely to change. After, the stable position is taken by `store`, an interface that contains no details, and `postgres` has moved to $I = 0.5$ with only the composition root `main`, which creates the objects and plugs them together, depending on it. Replacing PostgreSQL now affects one line in `main`. The `impact` function is breadth-first search ([[algorithms/graph-search]]) on the reversed graph.
:::
:::

::: widget graph
nodes: main@0,0; web@1,0; reports@1,1; orders@2,1; pricing@3,2; postgres@1.5,2.2
edges: postgres>orders; postgres>reports; reports>web; orders>web; web>main; pricing>orders
algorithm: bfs
start: postgres
caption: The "before" design of [[#ex-instability]] with every arrow *reversed*: an arrow from $B$ to $A$ means "$A$ depends on $B$", so a change flows along it. Breadth-first search from `postgres` visits its impact set — every module except `pricing`. Start the search at `pricing` instead: only `orders`, `web` and `main` are reached. A concrete, volatile module should have a small impact set; the "after" design reduces that of `postgres` to `main` alone.
:::

Martin also measures the **abstractness** $A$ of a package — the fraction of its types that are abstract (interfaces, protocols, abstract classes) — and argues that stable packages should be abstract and unstable ones concrete, so that well-designed packages lie near the "main sequence" $A + I = 1$. A package with $A = 0$, $I = 0$ (concrete and heavily depended on) is in the "zone of pain": every change hurts; one with $A = 1$, $I = 1$ (abstract and unused) is in the "zone of uselessness".

::: widget plot
f: 1 - x
x: 0, 1
y: 0, 1
points: 0, 1; 0.5, 0; 0, 0; 1, 1; 0.67, 0.1
labels: \text{main sequence } A + I = 1
caption: Martin's abstractness–instability diagram: instability $I$ across, abstractness $A$ up. The interface `store` of [[#ex-instability]] sits at $(0, 1)$, on the main sequence; the PostgreSQL adapter at $(0.5, 0)$; a concrete utility module that everything uses at $(0, 0)$, in the zone of pain; an unused abstraction at $(1, 1)$; and a mostly concrete application module at $(0.67, 0.1)$. Distance from the line, $\lvert A + I - 1\rvert$, is a crude warning sign, not a quality score: standard-library modules such as `math` sit at $(0, 0)$ harmlessly, because they almost never change.
:::

How good is the evidence that such metrics predict quality? Mixed. Basili, Briand and Melo ("A validation of object-oriented design metrics as quality indicators", *IEEE TSE*, 1996) found that several of Chidamber and Kemerer's class metrics, including coupling between objects, were associated with fault-prone classes in a set of student-built systems. But El Emam and colleagues ("The confounding effect of class size on the validity of object-oriented metrics", *IEEE TSE*, 2001) showed that much of such association disappears once class size is controlled for: big classes have more coupling *and* more faults. Treat metrics as a way to find places worth a closer look, not as targets.

## The SOLID principles

Robert Martin collected five principles of object-oriented design in the late 1990s and his 2000 essay "Design principles and design patterns"; Michael Feathers later arranged their initials into the acronym **SOLID**. They are stated for classes but apply to modules and services as well.

::: definition The SOLID principles {#def-solid}
- **Single responsibility** (SRP): a module should be responsible to one, and only one, *actor* — one group of people whose requests may change it. Equivalently, it should have one reason to change.
- **Open–closed** (OCP; Bertrand Meyer, 1988): software entities should be open for extension but closed for modification — new behaviour is added by adding code, not by editing working code.
- **Liskov substitution** (LSP; Barbara Liskov, 1987): objects of a subtype must be usable wherever objects of the supertype are expected, without breaking any client's correctness ([[program-design/inheritance-polymorphism#def-lsp]]).
- **Interface segregation** (ISP): clients should not be forced to depend on operations they do not use; prefer several small interfaces to one large one.
- **Dependency inversion** (DIP): high-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.
:::

### Single responsibility

The word "responsibility" invites endless argument about what counts as *one thing*. Martin's later formulation, in terms of actors, is more useful: ask *who* would ask for this code to change. An `Invoice` class that computes totals (changed when the finance department changes tax rules), renders itself as HTML (changed when designers restyle the site) and saves itself to a database (changed when the operations team migrates storage) serves three actors. Every change requested by one risks breaking the others, and the three teams will collide in the same file. Split it into an invoice calculation, a renderer and a repository, and each team edits its own module. SRP is cohesion ([[program-design/modules-patterns#def-coupling]]) defined by the sources of change.

### Open–closed

Code that chooses behaviour with a chain of `if kind == ...` tests must be edited for every new kind. The open–closed principle asks for a structure where a new kind is added by writing new code that plugs in.

::: example Discount rules that plug in {#ex-ocp}
The shop's pricing supports several discount rules, and marketing invents new ones every quarter. Arrange the code so that adding a rule does not modify `total` or any existing rule.
::: solution
Each rule is a function from a cart to the discount it gives, and rules are registered in a dictionary by a decorator ([[program-design/higher-order-functions]]):

```python
from typing import Callable

Cart = list[float]                       # item prices
Rule = Callable[[Cart], float]           # a rule returns the discount it gives
RULES: dict[str, Rule] = {}

def rule(name: str) -> Callable[[Rule], Rule]:
    """Decorator: register a discount rule under a name."""
    def register(f: Rule) -> Rule:
        RULES[name] = f
        return f
    return register

@rule("none")
def no_discount(cart: Cart) -> float:
    return 0.0

@rule("ten_percent")
def ten_percent(cart: Cart) -> float:
    return 0.1 * sum(cart)

def total(cart: Cart, rule_name: str) -> float:   # closed: never edited for new rules
    return round(sum(cart) - RULES[rule_name](cart), 2)

# Months later, in a new module: extension without modification.
@rule("cheapest_half_price")
def cheapest_half_price(cart: Cart) -> float:
    return min(cart) / 2 if len(cart) >= 2 else 0.0

cart = [12.0, 6.0, 8.0]
for name in RULES:
    print(f"{name:20} {total(cart, name)}")
```

```console
$ python3 discounts.py
none                 26.0
ten_percent          23.4
cheapest_half_price  23.0
$ mypy --strict discounts.py
Success: no issues found in 1 source file
```

The new rule touched no existing line; `total` and the existing rules need not be retested for it (though the new rule must be). The design is the Strategy pattern ([[program-design/modules-patterns#ex-strategy]]) with a registry. Its cost: to see every rule you now search for `@rule` instead of reading one `if` chain, and an error in a rule's name is found at run time (`KeyError`) rather than by reading the chain.
:::
:::

No code is closed against *every* change. This design is open to new rules of the form "cart → discount", and closed to them; a rule that needs the customer's purchase history does not fit the `Rule` type, and adding it means modifying the abstraction. OCP is a decision about *which* changes to make cheap, and it should be made for changes that are likely, typically after the second or third time a change of that kind has been requested.

### Liskov substitution

The substitution principle was treated in depth in [[program-design/inheritance-polymorphism]], where [[program-design/inheritance-polymorphism#thm-lsp]] proved that a subclass whose methods have weaker preconditions and stronger postconditions can be substituted safely, and the square–rectangle example showed a subclass that cannot. Its role among the design principles is to make OCP and DIP safe: both rely on clients working with any implementation of an abstraction, which is only true if every implementation honours the abstraction's specification.

### Interface segregation

A large interface couples each client to all of it. If a reporting module depends on a `Database` interface with forty methods but uses two, then any change to the other thirty-eight may force it to be recompiled, retested or at least re-read, and any fake used in its tests must implement all forty.

::: definition Role interface {#def-role-interface}
A **role interface** is an interface defined by what one client, or one kind of client, needs from a collaborator, rather than by everything the collaborator can do. Under ISP a class may implement several role interfaces, and each client depends only on its own.
:::

In Python, role interfaces are naturally written as **protocols** — structural types that any class with the right methods satisfies, without inheriting from them ([[program-design/types-interfaces#def-subtyping]]).

### Dependency inversion

The principle's name refers to the direction of the arrow. In the naive design the high-level policy (the report) depends on the low-level detail (the database). Under DIP the policy *owns* an abstraction describing what it needs, and the detail depends on — implements — that abstraction. The source-code dependency now points against the flow of control: the report calls the database at run time, but the database adapter's code imports the report's interface.

::: example Inverting the report's dependency {#ex-dip}
Rewrite the monthly report so that it depends on a role interface it owns, give it an in-memory implementation for tests, and show what a type checker says about an implementation with the wrong method signature.
::: solution
```python
from typing import Protocol

class OrderStore(Protocol):
    """What the report needs from storage -- owned by the report's layer."""
    def orders_between(self, start: str, end: str) -> list[tuple[str, float]]: ...

def monthly_total(store: OrderStore, month: str) -> float:
    rows = store.orders_between(f"{month}-01", f"{month}-31")
    return round(sum(amount for _, amount in rows), 2)

class InMemoryStore:
    """A fake for tests: no database needed."""
    def __init__(self, rows: list[tuple[str, float]]) -> None:
        self.rows = rows
    def orders_between(self, start: str, end: str) -> list[tuple[str, float]]:
        return [(d, a) for d, a in self.rows if start <= d <= end]

class BrokenStore:
    def orders_between(self, start: str) -> list[tuple[str, float]]:   # wrong signature
        return []

store = InMemoryStore([("2026-03-02", 19.5), ("2026-03-30", 5.25), ("2026-04-01", 99.0)])
print(monthly_total(store, "2026-03"))
monthly_total(BrokenStore(), "2026-03")
```

(ISO dates compare correctly as strings, and `"…-31"` is an upper bound for every month.) The checker catches the broken implementation before the program runs:

```console
$ mypy reports.py
reports.py:24: error: Argument 1 to "monthly_total" has incompatible type "BrokenStore"; expected "OrderStore"  [arg-type]
reports.py:24: note: Following member(s) of "BrokenStore" have conflicts:
reports.py:24: note:     Expected:
reports.py:24: note:         def orders_between(self, start: str, end: str) -> list[tuple[str, float]]
reports.py:24: note:     Got:
reports.py:24: note:         def orders_between(self, start: str) -> list[tuple[str, float]]
Found 1 error in 1 file (checked 1 source file)
$ python3 reports.py
24.75
Traceback (most recent call last):
  ...
TypeError: BrokenStore.orders_between() takes 2 positional arguments but 3 were given
```

The report now knows nothing about PostgreSQL. A `PostgresStore` class with the same method lives in the data-access layer, and the composition root passes it in — this passing-in of collaborators is called **dependency injection**. The test uses `InMemoryStore` and runs in microseconds. `OrderStore` is also a role interface in the sense of [[#def-role-interface]]: one method, exactly what the report needs, whatever else the storage layer offers.
:::
:::

::: proposition Inversion confines the impact of details {#prop-dip}
Let a set $H$ of high-level modules use a concrete module $C$ only through an interface module $S$, so that no module of $H$ has a path to $C$, and $C$ depends on $S$. Suppose the only module with an edge to $C$ is a composition root $R$, on which nothing depends. Then the impact set of $C$ is $\{R\}$, and a change to $C$ that preserves $S$'s specification requires no change in $H$.
:::

::: proof
A module is in the impact set of $C$ iff it has a directed path to $C$ ([[#def-impact]]). Any such path ends with an edge into $C$, and the only such edge is from $R$; so the path is $X \to \dots \to R \to C$. Since nothing depends on $R$, there is no edge into $R$, so the path is just $R \to C$ and $X = R$. Hence the impact set is $\{R\}$. For the second claim, modules of $H$ interact with $C$ only through calls to $S$'s operations; if $C$ still meets $S$'s specification, every client reasoning that relied on that specification remains valid ([[program-design/abstraction-specifications#thm-substitute]]).
:::

::: warning Principles are not laws, and indirection is not free
Every principle in this chapter adds indirection: an interface, a registry, a factory. Indirection is what makes change local, but it also makes the code harder to read — to find what `store.orders_between` does, you must find which object was injected — and every abstraction is a guess about which changes will come. Applied to code that will never vary, the principles produce what is sometimes called speculative generality: interfaces with one implementation that will never have a second, factories that create one class, configuration for choices nobody makes. The opposite principle, **YAGNI** ("you aren't gonna need it", from Extreme Programming), is equally valid. A reasonable default is to write the direct version first, and introduce an abstraction when a second variant actually appears or when testing demands it — and then to refactor ([[software-engineering/refactoring-maintenance]]) rather than design in advance.
:::

::: quiz
A `UserService` class has methods `register`, `login`, `export_to_csv` and `send_newsletter`. The newsletter code is maintained by marketing, the CSV export by the data-analysis team, and the rest by the accounts team. Which principle does the design most directly violate?
- [x] Single responsibility
- [ ] Liskov substitution
- [ ] Dependency inversion
- [ ] Law of Demeter
::: solution
Three actors — accounts, data analysis and marketing — request changes to the same class, so it has three reasons to change: a violation of SRP in Martin's actor-based form. Nothing here involves subtyping (LSP), nor the direction of a dependency (DIP), nor reaching through objects (Demeter). A natural fix is three classes, possibly sharing a `UserRepository` role interface.
:::
:::

## Other principles

### The Law of Demeter

The **Law of Demeter**, from the Demeter project at Northeastern University (Lieberherr, Holland and Riel, OOPSLA 1988), limits what a method may know about the structure of other objects.

::: definition Law of Demeter {#def-demeter}
A method $m$ of an object $o$ should call methods only of: $o$ itself; $m$'s parameters; objects that $m$ creates; and $o$'s direct components (its attributes). In particular, it should not call methods of objects *returned* by such calls. Informally: talk only to your immediate friends.
:::

```python
class Address:
    def __init__(self, city):
        self.city = city

class Customer:
    def __init__(self, name, address):
        self.name, self.address = name, address
    def city(self):                       # the customer answers for its own parts
        return self.address.city

class Order:
    def __init__(self, customer):
        self.customer = customer
    def shipping_city(self):
        return self.customer.city()

order = Order(Customer("Ada", Address("Leeds")))
print(order.customer.address.city)        # reaches through two objects: knows their structure
print(order.shipping_city())              # asks its neighbour; structure stays hidden
```

```console
$ python3 demeter.py
Leeds
Leeds
```

Both lines print the same thing, but the first couples its caller to the internal structure of `Order`, `Customer` and `Address`; if customers acquire several addresses, every such chain breaks, while `shipping_city` is changed in one place. The cost is many small forwarding methods, and the law should not be applied to plain data structures and fluent interfaces whose purpose is to expose their structure (`text.strip().lower()` returns new strings, not internals).

### Don't repeat yourself — but don't unify the wrong things

Andrew Hunt and David Thomas's *The Pragmatic Programmer* (1999) stated **DRY**: "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." The tax rate, the format of an order number, the rule for which users may see a report — each should be written once, so that a change cannot be made in one copy and forgotten in another. Note that DRY is about *knowledge*, not text. Two functions with identical code that encode different knowledge (the VAT rate and, by coincidence, the same number as a staff discount) should stay separate, because they will change for different reasons; merging them couples them falsely. Sandi Metz's widely quoted advice, "duplication is far cheaper than the wrong abstraction" (2016), is an opinion from experience rather than a measured result, but it captures the trade-off: wait until you understand what the repetitions have in common before extracting it.

### Composition over inheritance

The *Design Patterns* book (Gamma, Helm, Johnson and Vlissides, 1994) advised "favour object composition over class inheritance". A subclass depends on its superclass's implementation, not only its interface — the fragile base class problem of [[program-design/inheritance-polymorphism#ex-fragile]] — whereas an object that holds a collaborator and calls it through an interface depends only on the interface. Most of the examples in this chapter use composition: the report holds a store, the pricing holds a table of rules.

## Designing for change

All these principles serve one goal that David Parnas stated in two papers: "On the criteria to be used in decomposing systems into modules" (1972) — hide each decision likely to change behind an interface — and "Designing software for ease of extension and contraction" (1979), which argued that software should be designed as a **family** of programs, so that useful subsets and extensions can be produced by adding or removing modules rather than rewriting. Practically:

1. **List the likely changes.** Different data sources, new discount rules, a second user interface, regulatory changes, scale. Requirements ([[software-engineering/requirements]]) and the history of similar systems are the best guides.
2. **Give each likely change a module** that hides it, and make the rest of the system depend on that module's interface, not its implementation (information hiding, DIP).
3. **Keep the uses relation acyclic and in the direction of stability**, so that the impact set of every volatile module is small ([[#def-impact]]).
4. **Leave unlikely changes unabstracted**, and accept that some unforeseen change will need a refactoring.

::: example Which principle? {#ex-diagnose}
For each symptom, name the principle that is being violated and a fix. (a) To add a payment method, a developer edits a 400-line `process_payment` function with a branch per method. (b) Unit tests of the shipping calculator need a running SMTP mail server. (c) A class `Bird` has a method `fly`, and a subclass `Penguin` overrides it to raise `NotImplementedError`. (d) A `Printer` interface requires `print`, `scan`, `fax` and `staple`, and the simple printer class implements three of them as `pass`.
::: solution
(a) **Open–closed**: each payment method should be a separate implementation of a `PaymentMethod` interface, registered or injected, so that a new method is new code. (b) **Dependency inversion** (and single responsibility): the calculator should not send mail at all, or should depend on a `Notifier` role interface that tests replace with a fake. (c) **Liskov substitution**: clients of `Bird` that call `fly` break on penguins; `fly` belongs in a `FlyingBird` abstraction, or flight is a capability object composed into birds that have it. (d) **Interface segregation**: split into `Printer`, `Scanner`, `Fax` and `Stapler` roles, and let each device implement the roles it really supports. Note that the `pass` implementations also violate LSP: a client that calls `fax` expecting a fax to be sent is silently deceived.
:::
:::

::: history
Larry Constantine developed coupling and cohesion in the 1960s, and Stevens, Myers and Constantine's 1974 paper "Structured design" brought them to a wide audience. Parnas's papers on information hiding (1972) and program families (1979) supplied the deeper criterion. Bertrand Meyer stated the open–closed principle in *Object-Oriented Software Construction* (1988), the same year Lieberherr, Holland and Riel published the Law of Demeter; Barbara Liskov's 1987 keynote "Data abstraction and hierarchy" introduced the substitution idea, made precise by Liskov and Wing in 1994. The *Design Patterns* book appeared in 1994 and *The Pragmatic Programmer*, with DRY, in 1999. Robert Martin assembled the five SOLID principles around 2000, and the package metrics of instability and abstractness in his *Agile Software Development: Principles, Patterns, and Practices* (2002).
:::

## Where this leads

Principles are applied mostly to code that already exists: the next chapters on version control and testing provide the safety net, and [[software-engineering/refactoring-maintenance]] shows how to move existing code towards these principles in small, behaviour-preserving steps. Dependency inversion is what makes the test doubles of [[software-engineering/testing]] possible. Type systems that check interfaces, as `mypy` did here, are studied in [[programming-languages/type-systems]], and the same principles reappear, at a larger scale, in service boundaries ([[software-engineering/software-architecture]]) and security boundaries ([[security/security-principles]]).

::: summary
- Changes ripple along dependencies; the **impact set** of a module is everything with a path to it ([[#def-impact]]). Keep the impact sets of volatile modules small.
- **Instability** $I = C_e/(C_a + C_e)$ measures how free a module is to change ([[#def-instability]]); depend in the direction of stability, and make stable modules abstract. Metrics point at places to look, not at quality.
- **SOLID** ([[#def-solid]]): one actor per module; extend by adding code; subtypes must be substitutable; small role interfaces ([[#def-role-interface]]); high-level policy owns the abstractions that details implement.
- **Dependency inversion** with a composition root confines the impact of a concrete module to the root ([[#prop-dip]]), and makes code testable with fakes.
- The **Law of Demeter** ([[#def-demeter]]) hides object structure; **DRY** is about knowledge, not text; prefer **composition** to inheritance.
- Every abstraction costs indirection; apply principles to likely changes, and refactor when a change actually arrives (YAGNI).
:::

## Exercises

::: exercise Instability {level=1 check="0.75"}
Module $M$ is imported by 2 modules and imports 6. What is its instability? (Enter the number.)
::: solution
By [[#def-instability]], $I = C_e/(C_a + C_e) = 6/(2 + 6) = 0.75$: fairly unstable, which is fine if $M$ is a concrete, application-level module and a warning sign if it is meant to be a shared foundation.
:::
:::

::: exercise Impact set size {level=1 check="3"}
Modules and their imports: `app` imports `ui` and `core`; `ui` imports `core` and `widgets`; `core` imports `util`; `widgets` imports `util`; `cli` imports `core`. How many modules are in the impact set of `core`? (Enter the number.)
::: solution
The modules with a path to `core` are `app` (directly, and via `ui`), `ui` (directly) and `cli` (directly): three. `widgets` and `util` do not depend on `core`. The impact set of `util`, by contrast, is every other module: `core`, `widgets`, `ui`, `app`, `cli` — five — which is why `util` must be either very stable in fact or hidden behind an interface.
:::
:::

::: exercise Spot the Demeter violation {level=1}
Which of these calls, inside a method of class `Checkout` that has an attribute `self.cart` and a parameter `payment`, violate the Law of Demeter ([[#def-demeter]])? (a) `self.cart.total()` (b) `payment.authorise(amount)` (c) `self.cart.items[0].product.supplier.email()` (d) `Receipt(self.cart).render()`
::: solution
(a) is allowed: `cart` is a direct component. (b) is allowed: `payment` is a parameter. (c) violates the law: it calls a method of an object (the supplier) reached through three intermediate objects, coupling `Checkout` to the structure of carts, items and products. (d) is allowed: `Receipt(...)` is an object the method creates.
:::
:::

::: exercise Splitting by actor {level=2}
A `Payslip` class has methods `gross_pay()` (rules from the payroll department), `tax()` (rules from the tax authority, implemented by the finance team), `to_pdf()` (layout from the communications team) and `save()` (storage by the operations team). Propose a design that satisfies SRP, and say which classes would change when (i) a new tax band is introduced and (ii) the company logo changes.
::: solution
Four modules, one per actor: `PayCalculator` (gross pay), `TaxCalculator`, `PayslipRenderer` and `PayslipRepository`, with a plain data class `Payslip` holding the figures that pass between them. The calculators are pure functions of an employee record and the rules ([[program-design/functional-style]]); the renderer takes a `Payslip` and produces a PDF; the repository saves one. (i) A new tax band changes only `TaxCalculator` (and its tests). (ii) A new logo changes only `PayslipRenderer`. Before the split, both changes would have edited the same class, and a mistake in the layout change could break tax computation.
:::
:::

::: exercise A segregated interface {level=2}
A `Storage` protocol has methods `read(key)`, `write(key, value)`, `delete(key)` and `list_keys()`. A cache-warming job only reads; a nightly clean-up job only lists and deletes. Write role interfaces for the two jobs as `typing.Protocol` classes, show a single `FileStorage` class that satisfies both, and explain what changes for the jobs' tests.
::: solution
```python
from typing import Protocol

class Reader(Protocol):
    def read(self, key: str) -> bytes: ...

class Cleaner(Protocol):
    def list_keys(self) -> list[str]: ...
    def delete(self, key: str) -> None: ...

class FileStorage:                       # satisfies Reader and Cleaner (and more)
    def __init__(self) -> None:
        self.data: dict[str, bytes] = {}
    def read(self, key: str) -> bytes:
        return self.data[key]
    def write(self, key: str, value: bytes) -> None:
        self.data[key] = value
    def delete(self, key: str) -> None:
        del self.data[key]
    def list_keys(self) -> list[str]:
        return sorted(self.data)

def warm_cache(src: Reader, keys: list[str]) -> int:
    return sum(len(src.read(k)) for k in keys)

def clean_up(store: Cleaner, prefix: str) -> None:
    for k in store.list_keys():
        if k.startswith(prefix):
            store.delete(k)

fs = FileStorage()
fs.write("tmp/a", b"xyz"); fs.write("img/b", b"12")
print(warm_cache(fs, ["tmp/a", "img/b"]))
clean_up(fs, "tmp/")
print(fs.list_keys())
```

```console
$ python3 roles.py
5
['img/b']
$ mypy --strict roles.py
Success: no issues found in 1 source file
```

`FileStorage` never mentions `Reader` or `Cleaner`; it satisfies them structurally. Each job's test fake now needs one or two methods instead of four, and a change to `write` — a new parameter for expiry times, say — cannot affect either job or its tests.
:::
:::

::: exercise Knowledge or coincidence? {level=2}
A program contains `price * 1.2` in the checkout (adding 20% VAT) and `salary * 1.2` in the payroll module (a 20% bonus for overtime). A colleague proposes replacing both with a shared function `add_twenty_percent(x)`. Evaluate the proposal using DRY correctly understood.
::: solution
The two expressions share text but not knowledge: one encodes the VAT rate, set by the government, and the other a pay rule, set by the company. They will change for different reasons and at different times. A shared function would couple them falsely: when VAT changes to 22%, either the bonus changes by accident or someone must notice and split the function again. DRY instead asks that *each* piece of knowledge be represented once: a single `VAT_RATE` constant used by every place that computes VAT, and a single `OVERTIME_BONUS` in payroll. The proposal removes duplication of text while introducing a wrong abstraction.
:::
:::

::: exercise Impact sets and cycles {level=3}
Prove that if modules $X$ and $Y$ lie on a common directed cycle of the dependency graph, then they have the same impact set apart from themselves: $\mathrm{impact}(X) \cup \{X\} = \mathrm{impact}(Y) \cup \{Y\}$. Conclude that in a graph where one large cycle passes through all $n$ modules, every module's impact set has $n - 1$ elements, and explain what this means for maintenance.
::: solution
Since $X$ and $Y$ lie on a common cycle, there are paths $X \leadsto Y$ and $Y \leadsto X$. Let $Z \in \mathrm{impact}(X) \cup \{X\}$, so there is a path $Z \leadsto X$ (of length zero if $Z = X$). Appending $X \leadsto Y$ gives a path $Z \leadsto Y$, so $Z \in \mathrm{impact}(Y) \cup \{Y\}$ — if $Z \ne Y$ the path has positive length and $Z \in \mathrm{impact}(Y)$. By symmetry the two sets are equal. If one cycle passes through all $n$ modules, every pair lies on it, so every module's set $\mathrm{impact}(M) \cup \{M\}$ equals the set of all $n$ modules, and $\mathrm{impact}(M)$ has $n - 1$ elements. For maintenance this is the worst case: a change to the interface of *any* module may affect *every* other, nothing can be tested or reused in isolation, and no build or initialisation order exists ([[program-design/modules-patterns#thm-dependency-order]]). This is why cycles in the uses relation are the first thing to remove, typically by dependency inversion: introduce an interface owned by one side and implemented by the other, which reverses one edge of the cycle.
:::
:::

::: exercise Breaking a cycle {level=3}
In a module graph, `orders` imports `customers` (to look up a customer's discount tier) and `customers` imports `orders` (to compute a customer's lifetime spending). Use dependency inversion to break the cycle, write the result in Python with a protocol, and run it.
::: solution
Let `customers` own a role interface describing what it needs from orders, and let `orders` implement it; then `orders → customers` remains, and the old edge `customers → orders` is replaced by `orders` implementing an interface defined in `customers`:

```python
from typing import Protocol

# --- module customers: owns the abstraction it needs
class SpendingSource(Protocol):
    def spending_of(self, customer_id: int) -> float: ...

class Customers:
    def __init__(self, spending: SpendingSource) -> None:
        self.spending = spending
    def tier(self, customer_id: int) -> str:
        return "gold" if self.spending.spending_of(customer_id) >= 1000 else "standard"

# --- module orders: depends on customers, implements SpendingSource
class Orders:
    def __init__(self) -> None:
        self.history: dict[int, list[float]] = {}
    def add(self, customer_id: int, amount: float) -> None:
        self.history.setdefault(customer_id, []).append(amount)
    def spending_of(self, customer_id: int) -> float:
        return sum(self.history.get(customer_id, []))
    def discount(self, customers: Customers, customer_id: int) -> float:
        return 0.1 if customers.tier(customer_id) == "gold" else 0.0

# --- composition root
orders = Orders()
customers = Customers(orders)
orders.add(7, 800.0); orders.add(7, 300.0); orders.add(8, 50.0)
print(customers.tier(7), orders.discount(customers, 7))
print(customers.tier(8), orders.discount(customers, 8))
```

```console
$ python3 cycle.py
gold 0.1
standard 0.0
$ mypy --strict cycle.py
Success: no issues found in 1 source file
```

In the source code, `customers` now refers only to `SpendingSource`, which it defines; `orders` refers to `Customers`; and only the composition root knows both concrete classes. The run-time calls still go both ways — that is the point of inversion: the flow of control is unchanged, but the dependency graph is acyclic, so each module can be tested on its own with a fake for the other.
:::
:::
