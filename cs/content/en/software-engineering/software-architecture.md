Two teams build the same online shop from the same requirements. The first writes one program that serves web pages, computes prices and talks to a database; the second splits the work into six services that communicate over the network. Both shops show the same pages and take the same orders. Yet they behave very differently under stress. When the database is slow, the first shop slows down everywhere and the second shows its catalogue but cannot take payments. When a developer wants to change how discounts are computed, the first team edits one function and redeploys everything; the second edits one service and redeploys only that — after checking that the five others still understand its messages. Neither is better in general. They made different **architectural** decisions, and those decisions, far more than any individual line of code, determine how the system performs, fails and changes.

This chapter is about those decisions. We define software architecture and the **quality attributes** that drive it, study the main **architectural styles** — layered, client–server, pipe-and-filter, event-driven and service-based — with the trade-offs each makes, compute what composing components does to availability and latency, and see how organisations shape architectures (Conway's law) and how teams record the reasons for their decisions. The module-level ideas of [[program-design/modules-patterns]] — information hiding, coupling, dependency graphs — are the foundation; architecture applies them to whole systems.

## What architecture is

::: definition Software architecture {#def-architecture}
The **software architecture** of a system is the set of structures needed to reason about it: its **elements** (modules, components, processes, services, data stores), the **relations** among them (uses, calls, sends messages to, runs on), and the externally visible **properties** of both (interfaces, protocols, performance, failure behaviour). **Architectural decisions** are the design decisions that fix these structures; they are typically the ones that are costly to change later and that affect many quality attributes at once.
:::

The definition, close to that of Bass, Clements and Kazman's *Software Architecture in Practice*, says "structures", plural, because no single diagram captures a system. Three kinds of **view** are standard. A **module view** shows units of code and their dependencies — what imports what — and matters for building, testing and changing the system. A **component-and-connector view** shows the running system: processes, services and data stores, and the connectors (calls, message queues, shared databases) through which they interact; it matters for performance and failure. An **allocation view** maps software onto hardware, networks and teams. Philippe Kruchten's "4+1" model (1995) is a well-known version: logical, development, process and physical views, tied together by scenarios.

### Quality attributes drive architecture

If architecture is not mainly about functionality — any of several architectures can provide the same functions — what is it about? The **quality attributes**, the non-functional requirements of [[software-engineering/requirements]]: performance, availability, security, modifiability, testability, deployability, usability. Each style promotes some and hurts others, so the architect's job is to know which qualities matter most for *this* system, and to make them precise enough to evaluate designs against.

::: definition Quality-attribute scenario {#def-qa-scenario}
A **quality-attribute scenario** makes a quality requirement precise in six parts: the **source** of a stimulus (a user, an attacker, a developer, a failing disk), the **stimulus** itself (a request, an attack, a change request, a crash), the **environment** (normal operation, peak load, during deployment), the **artefact** stimulated (the whole system, one service, the database), the **response** the system must make, and the **response measure** by which the response is judged (latency, time to recover, effort in person-days, fraction of data lost).
:::

::: example Scenarios for the shop {#ex-qa-scenarios}
Write quality-attribute scenarios for availability, modifiability and performance of the online shop, and say what each suggests about the architecture.
::: solution
*Availability.* Source: hardware. Stimulus: the server running the payment component crashes. Environment: normal operation. Artefact: payment processing. Response: the failure is detected and requests are routed to a standby; customers whose payment was in progress are told to retry, and no payment is taken twice. Measure: payments available again within 30 seconds; zero duplicate charges. *Suggests:* redundant instances of the payment component, health checks, and idempotent payment requests.

*Modifiability.* Source: the marketing team. Stimulus: a request for a new kind of discount ("buy two, get the cheaper half price"). Environment: development time. Artefact: pricing. Response: the change is made, tested and deployed without changes outside pricing. Measure: at most 3 person-days; no other component redeployed. *Suggests:* pricing behind a narrow interface that hides the discount rules — information hiding ([[program-design/modules-patterns#def-information-hiding]]) at the architectural scale.

*Performance.* Source: customers. Stimulus: 500 catalogue page requests per second. Environment: peak sales day. Artefact: the whole system. Response: pages are served. Measure: 99% within 400 ms. *Suggests:* caching of catalogue pages, which change rarely, and keeping slow components (recommendations, say) off the critical path of a page request.

The three scenarios pull in different directions: replication and caching add moving parts, which makes the system harder to modify and test. Making them explicit is what lets the trade-off be discussed rather than discovered.
:::
:::

## Architectural styles

An **architectural style** (or **pattern**) is a named, reusable combination of element types, connector types and constraints on how they may be combined, together with the qualities it is known to promote. Mary Shaw and David Garlan catalogued the classical styles in *Software Architecture: Perspectives on an Emerging Discipline* (1996). Knowing them lets you recognise the shape of a system, borrow known solutions and anticipate known problems.

### Layers

::: definition Layered architecture {#def-layered}
In a **layered architecture** the modules are partitioned into ordered layers $1, 2, \dots, h$, and a module in layer $i$ may use modules only in layers $j \le i$. In **strict** layering it may use only its own layer and layer $i - 1$; in **relaxed** layering any lower layer. Each layer provides a **virtual machine** — a set of services — to the layers above.
:::

The typical business application has a presentation layer (web pages or a user interface), an application or domain layer (the business rules), and a data-access layer (the database). Operating systems ([[operating-systems/os-structure]]) and network protocol stacks ([[networks/network-principles]]) are layered too: TCP uses IP, which uses the link layer, and none of them use anything above.

::: proposition What layering buys {#prop-layers}
(a) The dependency graph of a layered system has no cycle that passes through two different layers; if, in addition, modules within each layer do not depend on each other cyclically, the whole graph is acyclic and the modules can be built, tested and initialised bottom-up. (b) In a strictly layered system, a change to the interface of layer $i$ can require changes only in layers $i$ and $i + 1$.
:::

::: proof
(a) Along any dependency path the layer number never increases, because each edge goes from layer $i$ to some layer $j \le i$. A cycle returns to its starting module, hence to its starting layer, so the layer number must stay constant all the way round: the cycle lies within one layer. If no layer has an internal cycle, there is no cycle at all, and by [[program-design/modules-patterns#thm-dependency-order]] a dependency order exists. (b) Under strict layering, only modules in layers $i$ and $i + 1$ may use layer $i$'s interface, so only they can be affected by a change to it.
:::

Part (b) is why the layering of network protocols has been so durable: a new link technology (Wi-Fi, then 5G) required changes only at the bottom of the stack, and everything above IP was unaffected. The costs of layering are performance (a request may cross several layers, each adding work, and strictness forbids shortcuts) and the difficulty of deciding which layer some function belongs in: error handling and security, for instance, cut across all of them.

A layering rule is worthless unless it is enforced, and in a large code base it erodes one convenient shortcut at a time. Enforcing it is a simple static analysis.

::: example Checking the layers {#ex-layer-check}
The shop's package `shop` has modules `web` (layer 3), `orders` and `pricing` (layer 2) and `db` (layer 1). Write a checker that reports every import that goes *up* the layers, and run it.
::: solution
Python's standard `ast` module parses a source file into a syntax tree, in which every `import` statement is a node; we walk the tree, collect the modules of `shop` that each file imports, and compare layers.

```python
import ast, pathlib

LAYERS = {"web": 3, "orders": 2, "pricing": 2, "db": 1}   # higher may use lower

def imports(path):
    """Names of the modules of package `shop` imported by a source file."""
    tree = ast.parse(path.read_text())
    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom) and node.module == "shop":
            yield from (alias.name for alias in node.names)
        elif isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name.startswith("shop."):
                    yield alias.name.split(".")[1]

def violations(package_dir):
    for path in sorted(pathlib.Path(package_dir).glob("*.py")):
        user = path.stem
        if user not in LAYERS:
            continue
        for used in imports(path):
            if LAYERS[used] > LAYERS[user]:          # an upward dependency
                yield f"{user} (layer {LAYERS[user]}) imports {used} (layer {LAYERS[used]})"

if __name__ == "__main__":
    found = list(violations("shop"))
    for v in found:
        print("violation:", v)
    raise SystemExit(1 if found else 0)       # non-zero exit status fails a CI build
```

The package has `web` importing `orders`, `orders` importing `db` and `pricing`, `pricing` importing `db`, and one line in `db.py` that reads `from shop import web  # a shortcut someone took to reuse a formatting helper`.

```console
$ python3 layers.py
violation: db (layer 1) imports web (layer 3)
```

The shortcut creates the cycle `web → orders → db → web`, which by [[#prop-layers]] cannot exist in a layered system, and which would make Python's import of `shop.web` fail or half-initialise ([[program-design/modules-patterns]]). The fix is to move the formatting helper down into a utility module in layer 1, or up into `web` where it belongs. Run in continuous integration ([[software-engineering/version-control]]), a check like this stops the erosion at the first violating commit. (Dedicated tools exist for many languages; the twenty lines above show there is no magic in them.)
:::
:::

::: widget graph
nodes: web@1,0; orders@0,1; pricing@2,1; db@1,2
edges: web>orders; orders>pricing; orders>db; pricing>db; db>web
algorithm: topo
caption: The module view of the shop, with an arrow from each module to each module it imports, including the forbidden `db → web`. Step through the topological sort: it gets stuck, because every module lies on a cycle (`web → orders → db → web`) or depends on one. Delete the edge in your mind — the layered graph that remains has the order `web, orders, pricing, db`, and its reverse is a valid build and test order.
:::

### Clients and servers

In the **client–server** style, **servers** provide services over a network and **clients** request them; the server does not know its clients in advance and serves many at once. The style centralises data and control, which simplifies security, consistency and updates (change the server, and every client benefits), at the cost of making the server a performance bottleneck and a single point of failure unless it is replicated. A **three-tier** architecture combines it with layering: browser, application server, database server. The web is built on this style, and Roy Fielding's 2000 doctoral thesis defined **REST** (representational state transfer) as a refinement of it — stateless requests, uniform interfaces on named resources, cacheable responses — to explain why the web scaled; the protocols are in [[networks/application-layer]].

### Pipes and filters

In the **pipe-and-filter** style, each component (a **filter**) reads a stream of data, transforms it and writes a stream; **pipes** connect the output of one filter to the input of the next. Filters share no state and do not know their neighbours, so they can be developed, tested and reused separately, and run concurrently. The Unix shell is the classic example:

```console
$ cat access.log
GET /index.html 200
GET /cart 200
POST /cart 500
GET /index.html 200
GET /missing 404
POST /cart 500
GET /cart 200
POST /checkout 500
$ grep ' 500$' access.log | cut -d' ' -f2 | sort | uniq -c | sort -rn
      2 /cart
      1 /checkout
```

Five general-purpose programs, none written for this task, answer the question "which pages fail most?". Compilers are pipelines too (lexing, parsing, checking, optimising, generating code — [[compilers/compiler-structure]]), as are data-processing systems, and within a Python program generators express the same style ([[program-design/iterators-generators]]). The style suits batch transformation of data and fits poorly with interactive systems, where components need to respond to each other rather than to a stream.

### Events

In an **event-driven** (or **publish–subscribe**) architecture, components announce that something has happened by **publishing an event**, and other components **subscribe** to the kinds of events they care about. The publisher does not know who, if anyone, is listening. It is the Observer pattern ([[program-design/modules-patterns]]) at the scale of a system, usually with a message broker between processes.

::: example An event bus {#ex-event-bus}
When an order is placed, stock must be reserved and a receipt e-mailed. Implement this so that the order component knows nothing about stock or e-mail.
::: solution
```python
from collections import defaultdict

class EventBus:
    """Publishers and subscribers know the bus and the event names, not each other."""
    def __init__(self):
        self._handlers = defaultdict(list)
    def subscribe(self, event, handler):
        self._handlers[event].append(handler)
    def publish(self, event, **data):
        for handler in self._handlers[event]:
            handler(**data)

bus = EventBus()
stock = {"tea": 10}

def reserve_stock(order_id, items):
    for item in items:
        stock[item] -= 1
    print(f"stock: reserved {items} for order {order_id}")

def send_receipt(order_id, items):
    print(f"email: receipt for order {order_id}")

def place_order(order_id, items):          # the publisher
    print(f"orders: placed {order_id}")
    bus.publish("order_placed", order_id=order_id, items=items)

bus.subscribe("order_placed", reserve_stock)
bus.subscribe("order_placed", send_receipt)
place_order(17, ["tea", "tea"])
print("stock left:", stock)
```

```console
$ python3 events.py
orders: placed 17
stock: reserved ['tea', 'tea'] for order 17
email: receipt for order 17
stock left: {'tea': 8}
```

Adding loyalty points later means one new subscriber and no change to `place_order`: the style promotes modifiability. But look at what has been lost. Reading `place_order` no longer tells you what happens when an order is placed; you must find every subscriber. If `reserve_stock` raises an exception, should the receipt still be sent? Here, it would not be — an accident of subscription order. In a distributed version, events travel through a broker and are processed asynchronously, so subscribers may see them late, twice or in a different order, and the stock count is **eventually** consistent with the orders rather than always ([[distributed-systems/replication-consistency]]). Event-driven systems trade traceability and simple consistency for decoupling.
:::
:::

### Monoliths and services

A **monolith** is deployed as one unit (it may be well modularised inside); a **service-based** architecture — in its fine-grained form, **microservices**, named in an influential 2014 article by James Lewis and Martin Fowler — deploys each part as a separate process that owns its data and communicates through network interfaces. Services can be deployed, scaled and rewritten independently, by separate teams, in different languages. But every call between them is now a network call, which can be slow, can fail, and can fail *partially* (the request arrived, the reply was lost). The next two results quantify the cost.

::: proposition Availability of composed components {#prop-availability}
Assume components fail independently, and component $i$ is available (working) with probability $a_i$. (a) If serving a request needs **all** of components $1, \dots, n$ (a serial chain), the request succeeds with probability $\prod_{i=1}^{n} a_i$. (b) If it needs **any one** of $k$ replicas, each available with probability $a$, it succeeds with probability $1 - (1 - a)^k$.
:::

::: proof
(a) The request succeeds iff every component is available; by independence the probability of the intersection is the product. (b) It fails iff all $k$ replicas are unavailable, which by independence has probability $(1 - a)^k$; it succeeds with the complementary probability.
:::

Five services in a chain, each available 99.9% of the time, give $0.999^5 \approx 99.5\%$ — the unavailability has risen from about 43 minutes a month to about 3.6 hours. Two replicas of a 99% component give $1 - 0.01^2 = 99.99\%$. Splitting a system into services lowers availability unless each is replicated, and replication only helps if failures really are independent: two replicas in the same data centre, running the same buggy version, tend to fail together. (Availability arithmetic and its limits continue in [[distributed-systems/fault-tolerance]].)

::: proposition Fan-out amplifies tail latency {#prop-tail}
Suppose a request is answered only after $n$ independent back-end calls all reply, and each call is slow (exceeds some threshold) with probability $p$. Then the request is slow with probability $1 - (1 - p)^n$.
:::

::: proof
The request is fast iff all $n$ calls are fast; by independence this has probability $(1 - p)^n$.
:::

This is the example of Jeffrey Dean and Luiz Barroso's "The tail at scale" (*Communications of the ACM*, 2013): if one server in a hundred responds slowly ($p = 0.01$), a request that fans out to 100 servers is slow $1 - 0.99^{100} \approx 63\%$ of the time. Rare slowness of the parts becomes common slowness of the whole. Designs respond with timeouts and hedged requests (send a second copy if the first is slow), or by keeping fan-out off the critical path.

::: widget plot
f: a^x; 1 - (1 - a)^x
x: 1, 20
y: 0, 1
sliders: a=0.9:0.005:0.999:0.99
labels: \text{all } n \text{ needed: } a^n; \text{any of } n \text{ replicas: } 1-(1-a)^n
caption: [[#prop-availability]] with $n$ components (horizontal axis), each available with probability $a$. The falling curve is a serial chain, the rising one a set of replicas. Set $a = 0.99$: twenty services in a chain are available only about 82% of the time, while two replicas already give 99.99%. The same falling curve, read as $1 - (1-p)^n$ with $p = 1 - a$, is the probability in [[#prop-tail]] that a fan-out of $n$ calls hits at least one slow one. Both rest on independence, which real failures often violate.
:::

::: quiz
A page needs a reply from each of 4 services, each available 99% of the time independently. Which change improves the page's availability most?
- [ ] Making one of the four services 99.9% available
- [x] Running two independent replicas of every service
- [ ] Adding a fifth service that caches results
- [ ] Merging two of the services into one process that is 99% available
::: solution
Now the page is available $0.99^4 \approx 96.1\%$ of the time. Improving one service to 99.9% gives $0.99^3 \times 0.999 \approx 96.9\%$. Two replicas of each give $(1 - 0.01^2)^4 \approx 99.96\%$. A fifth service in the chain *lowers* availability unless it can answer when another service is down. Merging two services into one 99% component gives $0.99^3 \approx 97.0\%$ — better than four separate ones, which is a real argument for fewer, larger services when the parts cannot be replicated.
:::
:::

::: warning Microservices are not modularity
It is easy to believe that splitting a system into services makes it well designed. Network boundaries enforce *separation* — one service cannot reach into another's variables — but not *good* separation. If the boundaries are drawn badly, every feature needs coordinated changes to several services, which must then be deployed in lockstep: a "distributed monolith", with all the coupling of a monolith plus network latency, partial failure and distributed data. Good boundaries come from information hiding — each service hides a decision likely to change — and that can be achieved inside a well-structured monolith too, more cheaply. Many teams sensibly start with a modular monolith and extract services only where independent deployment or scaling is actually needed.
:::

## Architecture and organisation

In 1968 Melvin Conway published "How do committees invent?" in *Datamation*, arguing that the structure of a system mirrors the communication structure of the organisation that designs it. A compiler built by four teams tends to be a four-pass compiler; two teams that rarely talk produce two components with a thin, rigid interface between them. Fred Brooks named the observation **Conway's law** in *The Mythical Man-Month*.

The law is better supported than most folklore. MacCormack, Rusnak and Baldwin ("Exploring the duality between product and organizational architectures", *Research Policy*, 2012) compared pairs of products with similar functions built by tightly integrated companies and by loosely coupled open-source communities, and found the distributed organisations' products markedly more modular, as the "mirroring hypothesis" predicts. Nagappan, Murphy and Basili ("The influence of organizational structure on software quality", ICSE 2008) found that organisational measures — how many engineers and teams touched a component, how much ownership was spread — predicted the failure-proneness of Windows Vista components better than code metrics did. Both are observational studies of particular organisations, so they show association, not a universal law. The practical consequence is called the **inverse Conway manoeuvre**: if you want a particular architecture, organise the teams to match it, giving each team ownership of a component with a clear interface, so that the communication the architecture requires is the communication the organisation has.

## Recording and evaluating decisions

Architectures are rarely documented as a whole, and diagrams go out of date. What newcomers most need, and most often lack, is the *reasons*: why the team chose a message queue, why the reports read from a replica. Michael Nygard proposed recording each significant decision in a short text file kept with the code.

::: definition Architecture decision record {#def-adr}
An **architecture decision record** (ADR) is a short document recording one architectural decision: a **title**; a **status** (proposed, accepted, deprecated, superseded by another ADR); the **context** — the forces, requirements and constraints that make a decision necessary; the **decision** itself, stated actively ("We will …"); and its **consequences**, good and bad. ADRs are numbered, never edited after acceptance except to change status, and kept in version control, so that the sequence of records is a history of the architecture.
:::

::: example An ADR {#ex-adr}
Write an ADR for the shop's decision to send receipts asynchronously.
::: solution
**ADR 7: Send order receipts through a message queue.** *Status:* accepted.

*Context.* Placing an order currently sends the receipt e-mail synchronously. The external mail service has had outages of up to 20 minutes twice this quarter, during which orders failed although stock and payment were fine. The availability scenario requires order placement to keep working when non-essential services fail. Customers tolerate receipts arriving minutes late. We already run a message broker for stock updates.

*Decision.* We will publish an `order_placed` event to the broker after the order is committed, and a separate receipt worker will consume it and send the e-mail, retrying with back-off.

*Consequences.* Order placement no longer depends on the mail service. Receipts may be delayed, and may be sent twice if the worker crashes after sending but before acknowledging, so the worker must record sent receipts and skip duplicates. Debugging a missing receipt now requires looking at the broker and the worker's logs, and the broker itself needs monitoring. Supersedes the part of ADR 2 that required synchronous notifications.
:::
:::

Decisions can also be evaluated before they are made. The **Architecture Tradeoff Analysis Method** (ATAM), developed at the Software Engineering Institute around 2000 by Rick Kazman, Mark Klein and Paul Clements, brings stakeholders together to rank quality-attribute scenarios ([[#def-qa-scenario]]) and walks the most important ones through the proposed architecture to find **sensitivity points** (decisions a quality depends on), **trade-off points** (decisions that affect several qualities in opposite directions) and risks. Lighter versions — walking the top five scenarios through a whiteboard diagram with the team — catch many of the same problems in an afternoon.

::: history
Edsger Dijkstra's description of the THE multiprogramming system (*Communications of the ACM*, 1968) organised an operating system as a hierarchy of layers, each relying only on those below, and argued that this made it possible to test it convincingly. Melvin Conway's paper on organisations and designs appeared the same year. Dewayne Perry and Alexander Wolf's "Foundations for the study of software architecture" (1992) and Mary Shaw and David Garlan's book (1996) established architecture as a field of study, with styles as its vocabulary; Philippe Kruchten's 4+1 view model followed in 1995 and Roy Fielding's thesis defining REST in 2000. Michael Nygard's 2011 essay "Documenting architecture decisions" introduced ADRs, and Lewis and Fowler's 2014 article named the microservices style.
:::

## Where this leads

The next chapter, [[software-engineering/design-principles]], moves down from systems to classes and modules: coupling and cohesion measured, the SOLID principles, and dependency inversion, which is how a layered architecture lets its lower layers be replaced. The architectures of real systems are studied in depth elsewhere in the atlas: layered kernels in [[operating-systems/os-structure]], protocol stacks in [[networks/network-principles]], replicated services and their consistency in [[distributed-systems]], and the security consequences of architectural boundaries in [[security/security-principles]].

::: summary
- **Architecture** is the set of structures needed to reason about a system — elements, relations, properties — and the decisions that fix them ([[#def-architecture]]); describe it in several views.
- Architecture is driven by **quality attributes**, made precise as six-part scenarios ([[#def-qa-scenario]]), which pull in different directions.
- **Layers** ([[#def-layered]]) make the dependency graph acyclic across layers and confine interface changes ([[#prop-layers]]); enforce the rule mechanically, or it erodes.
- **Client–server** centralises data and control; **pipes and filters** compose independent stream transformers; **event-driven** systems decouple publishers from subscribers at the cost of traceability and simple consistency.
- Composing services multiplies availabilities and fans out latency: $\prod a_i$ for a chain, $1 - (1-a)^k$ for replicas, $1 - (1-p)^n$ for slow fan-out ([[#prop-availability]], [[#prop-tail]]) — all under independence.
- **Conway's law**: systems mirror the communication structure of the organisations that build them; there is supporting evidence, and teams can be organised to match the architecture they want.
- Record the *reasons* for decisions in **ADRs** ([[#def-adr]]) and evaluate decisions against scenarios before committing.
:::

## Exercises

::: exercise A chain of services {level=1 check="0.97"}
A request passes through three independent services with availabilities $0.99$, $0.995$ and $0.985$. What is the probability, to two decimal places, that it succeeds? (Enter the probability.)
::: solution
By [[#prop-availability]](a), $0.99 \times 0.995 \times 0.985 = 0.97027\ldots \approx 0.97$. The unavailability, about 3%, is close to the *sum* of the three unavailabilities ($1\% + 0.5\% + 1.5\%$), as it is whenever they are small.
:::
:::

::: exercise Name the style {level=1}
Name the main architectural style of each: (a) a compiler that lexes, parses, type-checks and generates code, each stage consuming the previous stage's output; (b) a spreadsheet in which changing one cell updates every cell that depends on it; (c) an e-mail client and an IMAP mail server; (d) an operating system kernel with a hardware-abstraction layer, a scheduler and memory manager above it, and system calls on top.
::: solution
(a) Pipe-and-filter (in practice, with a shared symbol table, so not pure). (b) Event-driven: a change publishes an event to which dependent cells are subscribed — the Observer pattern; the dependency graph must be acyclic for the update to terminate. (c) Client–server. (d) Layered.
:::
:::

::: exercise Replicas needed {level=1 check="4"}
A component is available 95% of the time, and failures of replicas are independent. What is the smallest number of replicas for which at least one is available with probability at least $0.9999$? (Enter the number.)
::: solution
By [[#prop-availability]](b) we need $1 - 0.05^k \ge 0.9999$, that is $0.05^k \le 10^{-4}$. Now $0.05^3 = 1.25 \times 10^{-4}$, giving availability $0.999875$, just short; $0.05^4 = 6.25 \times 10^{-6}$ suffices. So $k = 4$.
:::
:::

::: exercise How much fan-out? {level=2 check="69"}
Each back-end call is slow with probability $0.01$, independently. What is the smallest fan-out $n$ for which at least half of all requests are slow, in the sense of [[#prop-tail]]? (Enter $n$.)
::: solution
We need $1 - 0.99^n \ge 0.5$, i.e. $n \ge \ln 0.5 / \ln 0.99 \approx 68.97$, so $n = 69$. Check: $1 - 0.99^{68} \approx 0.495$ and $1 - 0.99^{69} \approx 0.5002$. A request touching 69 servers is slow more often than not, although each server is slow only 1% of the time.
:::
:::

::: exercise A scenario for testability {level=2}
Write a six-part quality-attribute scenario ([[#def-qa-scenario]]) for the *testability* of the shop's pricing component, and name two architectural decisions that would help meet it.
::: solution
Source: a developer. Stimulus: completes a change to the discount rules and wants to know whether pricing is still correct. Environment: on the developer's laptop, without network access. Artefact: the pricing component. Response: the component's whole test suite runs and reports. Measure: under 30 seconds, with no database, mail server or other service running, and with every pricing rule covered by at least one test. Decisions that help: (1) pricing is a pure function of the cart and a table of rules — no reads from the database inside it — so tests can call it directly ([[program-design/functional-style]]); (2) where pricing needs data (current prices), it receives it through an interface that tests can replace with an in-memory fake — dependency inversion, the subject of [[software-engineering/design-principles]].
:::
:::

::: exercise Enforcing strict layering {level=2}
Extend the checker of [[#ex-layer-check]] to enforce *strict* layering ([[#def-layered]]), reporting upward imports and imports that skip a layer separately. Test it after adding a module `admin` in layer 3 that imports `db` directly.
::: solution
The new checker reuses `imports` and `LAYERS` from `layers.py` (whose report and exit only run under `if __name__ == "__main__":`, so importing it does nothing):

```python
from layers import imports, LAYERS
import pathlib
LAYERS["admin"] = 3

def strict_violations(package_dir):
    for path in sorted(pathlib.Path(package_dir).glob("*.py")):
        user = path.stem
        if user not in LAYERS:
            continue
        for used in imports(path):
            gap = LAYERS[user] - LAYERS[used]
            if gap < 0:
                yield f"upward:   {user} -> {used}"
            elif gap > 1:
                yield f"skipping: {user} -> {used} (skips {gap - 1} layer)"

for v in strict_violations("shop"):
    print(v)
```

With `shop/admin.py` containing `from shop import db`:

```console
$ python3 strict.py
skipping: admin -> db (skips 1 layer)
upward:   db -> web
```

Whether `admin → db` is acceptable is a design decision: strict layering would route it through `orders` or a new layer-2 `inventory` module, gaining the guarantee of [[#prop-layers]](b) at the cost of an extra pass-through function. Many teams use relaxed layering and forbid only upward dependencies.
:::
:::

::: exercise Conway's law in reverse {level=2}
A company has three teams — web front end, mobile app, back-end database — and wants to add a recommendations feature that must be developed and changed quickly by people who understand both the user interface and the data. Predict what architecture will result if the existing teams share the work, and suggest an organisational change that would favour a better one.
::: solution
With the existing teams, recommendation logic is likely to be split along team lines: part in the web front end, part duplicated in the mobile app, part in database queries, with every change needing three teams to coordinate and the interfaces between them frozen by the cost of that coordination — the system mirrors the organisation. The inverse Conway manoeuvre is to form a small team that owns recommendations end to end, with its own service (or well-defined module) behind an interface that the web and mobile clients call. The team's boundary and the component's boundary then coincide, and changes inside recommendations need no cross-team negotiation.
:::
:::

::: exercise Common-cause failures {level=3}
Replicas rarely fail independently. In the **beta-factor model**, each replica is unavailable with probability $u$, but a fraction $\beta$ of that is due to a common cause (a bad deployment, a shared power supply) that takes down all replicas at once: with probability $\beta u$ all $k$ replicas fail together, and otherwise each replica fails independently with probability $(1-\beta)u$. Show that the availability of $k$ replicas is $A_k = 1 - \bigl(\beta u + (1 - \beta u)((1 - \beta)u)^k\bigr)$, and deduce that no number of replicas can make availability exceed $1 - \beta u$. Evaluate $A_1, A_2, A_{10}$ for $u = 0.01$, $\beta = 0.1$.
::: solution
The service is unavailable iff all replicas are down. Either the common cause occurs (probability $\beta u$), in which case all are down; or it does not (probability $1 - \beta u$), in which case, by independence of the remaining failures, all $k$ are down with probability $((1-\beta)u)^k$. By the law of total probability the unavailability is $\beta u + (1 - \beta u)((1-\beta)u)^k$, which gives the formula. Since $((1-\beta)u)^k \to 0$ as $k \to \infty$ and is positive for every $k$, the unavailability decreases to, but never goes below, $\beta u$: so $A_k < 1 - \beta u$ for all $k$.

With $u = 0.01$, $\beta = 0.1$: $A_1 = 1 - (0.001 + 0.999 \times 0.009) = 0.990009$; $A_2 = 1 - (0.001 + 0.999 \times 0.000081) \approx 0.998919$; $A_{10} \approx 0.999000$. Independent replicas would give $A_2 = 0.9999$; with only 10% common cause, two replicas give about $0.9989$ and ten replicas cannot reach $0.999$. Beyond two or three replicas, effort is better spent removing common causes — staggered deployments, separate power and network, diverse implementations — than adding copies.
:::
:::

::: exercise Isolating subscribers {level=3}
In [[#ex-event-bus]] an exception in one subscriber prevents later subscribers from running. Change `publish` so that every subscriber is called even if some fail, and the failures are returned. Run it with one unit of stock and an order for two. Does isolating failures make the system correct?
::: solution
```python
from collections import defaultdict

class EventBus:
    def __init__(self):
        self._handlers = defaultdict(list)
    def subscribe(self, event, handler):
        self._handlers[event].append(handler)
    def publish(self, event, **data):
        """Call every handler, even if some fail; return the failures."""
        errors = []
        for handler in self._handlers[event]:
            try:
                handler(**data)
            except Exception as exc:          # isolate one subscriber's failure
                errors.append((handler.__name__, exc))
        return errors

bus = EventBus()
stock = {"tea": 1}

def reserve_stock(order_id, items):
    for item in items:
        if stock[item] == 0:
            raise ValueError(f"out of {item}")
        stock[item] -= 1

def send_receipt(order_id, items):
    print(f"email: receipt for order {order_id}")

bus.subscribe("order_placed", reserve_stock)
bus.subscribe("order_placed", send_receipt)
print(bus.publish("order_placed", order_id=18, items=["tea", "tea"]))
print("stock left:", stock)
```

```console
$ python3 bus2.py
email: receipt for order 18
[('reserve_stock', ValueError('out of tea'))]
stock left: {'tea': 0}
```

The bus is now robust, but the *system* is wrong in two ways the run makes visible. The customer receives a receipt for an order that cannot be fulfilled, and `reserve_stock` failed halfway, leaving one unit reserved for an order that will not ship. Isolation keeps one subscriber's failure from silencing the others; it does not make the reaction to an event atomic. Real designs make each handler all-or-nothing (check all items before changing any), publish a compensating event (`order_failed`, to which the receipt sender also reacts), or check stock *before* the order is accepted — a requirements question about which component is responsible for the decision ([[distributed-systems/distributed-transactions]]).
:::
:::
