A team of five is asked how long a new booking system will take. The lead adds up her best guesses for the seven main tasks and answers "seventeen working days". Six weeks later the system ships. Nobody was lazy and no single estimate was wildly wrong: the database took a little longer than hoped, testing found problems that needed a second round, and two tasks that could have run in parallel waited for one person. Every one of these effects pushes in the same direction. A plan built from most-likely values is, as we shall prove, almost always a plan that will be missed.

Programming courses teach how to write a correct program. **Software engineering** is about what changes when a program is written by many people, over months or years, for users who depend on it and will want it changed: someone must decide what to build, divide the work, predict when it will be done, notice when it is going wrong and keep it working afterwards. The term was chosen, deliberately provocatively, as the title of a NATO conference in 1968, at a time when large projects such as IBM's OS/360 were late, over budget and unreliable, and the participants spoke of a "software crisis". This chapter studies the **process** side of the subject: the life-cycle models that organise the work, plan-driven and agile development, and the quantitative tools — critical paths, three-point estimates, simulation, queueing and risk exposure — that make planning less of a guess. Throughout, we separate what can be *proved* about a model from what has been *observed* about real projects, and from what is merely folklore.

## Software processes

Every software project, however informal, performs the same kinds of work. Someone finds out what is wanted, someone designs and writes code, someone checks that it does what was wanted, and the result is changed as needs change. Sommerville's textbook names these four activities, and the rest of this course takes them one at a time.

::: definition Software process {#def-process}
A **software process** is a structured set of activities that leads to the production and evolution of a software system. The fundamental activities are **specification** (deciding what the system should do and the constraints on it), **design and implementation** (deciding how, and building it), **validation** (checking that it does what the customer wants) and **evolution** (changing it as requirements and environments change). A **process model** (or **life-cycle model**) is an abstract description of how these activities are ordered, overlapped and repeated, and of what each produces.
:::

The activities are not phases that must happen once, in order; they are kinds of work. The models below differ precisely in how they arrange them in time. Two broad families are worth distinguishing from the start.

::: definition Plan-driven and incremental development {#def-plan-driven}
In **plan-driven** development all the process activities are planned in advance and progress is measured against the plan; each activity produces documents that are inputs to the next. In **incremental** (or **iterative**) development the system is built as a series of versions (**increments**), each adding functionality to the last and each specified, built and validated in a short cycle, so that the plan for later increments can change in the light of earlier ones.
:::

Neither family is "right". A team building flight-control software for an aircraft, which must be certified against a fixed specification before it flies, needs a plan, documents and traceability that a team building a start-up's web shop does not. Choosing a process is an engineering decision about risk, like choosing a data structure is a decision about cost.

### The sequential model and its misreading

The best-known plan-driven model arranges the activities as a sequence of stages — requirements, design, implementation, testing, operation — with each stage finishing before the next begins, like water flowing down a staircase. It is universally called the **waterfall model** and usually attributed to Winston Royce's 1970 paper "Managing the development of large software systems". The attribution is half right. Royce did draw the sequential diagram, but the paper's next sentence calls that implementation "risky" and says it "invites failure", because testing, the first moment at which the system's real behaviour is seen, comes at the very end. The rest of the paper adds feedback loops, a preliminary design phase, a pilot version built and thrown away ("do it twice"), and customer involvement throughout. The word "waterfall" does not appear in it.

Why, then, did the sequential model become a standard (it was the basis of the US Department of Defense standard DOD-STD-2167 of 1985)? Because it is easy to manage: each stage ends in a document that can be signed off, and progress is visible as stages completed. Its weakness is the one Royce identified. A misunderstanding in the requirements is discovered only when users see the working system, and by then everything has been built on top of it.

The **V-model**, used in many safety-critical industries, keeps the sequence but pairs each specification stage with the test stage that checks it: requirements with acceptance testing, architecture with system testing, detailed design with integration testing, code with unit testing. Its value is that the tests are *planned* when the specification is written; we meet these test levels in [[software-engineering/testing]].

### Iterative, risk-driven development

Barry Boehm's **spiral model** (1988) made risk the organising principle. Each loop of the spiral determines objectives, identifies and resolves the biggest risks (often by building a prototype), develops and verifies the next level of product, and plans the next loop. A project whose main risk is an unknown user interface spends its first loop on UI prototypes; a project whose main risk is performance spends it on a benchmark. The spiral is less a fixed process than a rule for choosing one: do first whatever most reduces the risk of failure.

::: example Choosing a process {#ex-choose-process}
For each project, say whether you would lean towards a plan-driven or an incremental process, and why. (a) Software for a railway signalling interlocking, to be certified by a national safety authority. (b) A mobile app for a new food-delivery company whose business model is still being tested. (c) Replacing a bank's 30-year-old batch accounting system with a new one that must produce identical results.
::: solution
(a) **Plan-driven**, or at least plan-heavy. Certification requires a complete, approved specification, documented design and evidence that every requirement is tested (we meet such standards in [[software-engineering/verification]]). The requirements are stable — the physics of trains does not change — so the main cost of planning, lost flexibility, is small.

(b) **Incremental.** The biggest risk is building something nobody wants. Short increments put working software in front of users quickly, and the plan for the next increment can respond to what they do. Heavy up-front specification would specify the wrong product in detail.

(c) **Mixed.** The required *behaviour* is fixed and testable (the old system is an oracle: run both on the same inputs and compare, as in [[programming-1/testing-debugging#ex-random-test]]), which suits careful planning; but the *risk* lies in the many undocumented rules hidden in the old code, which are best uncovered by migrating and comparing one part at a time, incrementally. Most real projects mix the two families in this way.
:::
:::

## Agile development

By the late 1990s many practitioners had concluded that heavyweight plan-driven processes failed for exactly the projects most common in business: those whose requirements change while the system is built. Several "lightweight" methods had appeared — Scrum (presented by Ken Schwaber and Jeff Sutherland in 1995), Extreme Programming (Kent Beck, *Extreme Programming Explained*, 1999), DSDM, Crystal, Feature-Driven Development — and in February 2001 seventeen of their authors met in Snowbird, Utah, and wrote the **Manifesto for Agile Software Development**. It states four values:

> Individuals and interactions over processes and tools; working software over comprehensive documentation; customer collaboration over contract negotiation; responding to change over following a plan.

and adds that "while there is value in the items on the right, we value the items on the left more". Twelve principles follow, among them delivering working software frequently, "from a couple of weeks to a couple of months", welcoming changing requirements, and measuring progress primarily by working software. The manifesto is a statement of values, not a process; the methods are what teams actually follow.

**Scrum**, the most widely used, is defined in the *Scrum Guide* (Schwaber and Sutherland; the current version is from 2020). Work is done in **sprints** of fixed length, one month or less. A **Product Owner** orders the **Product Backlog** of desired features; the **Developers** choose what they can complete in the sprint at **Sprint Planning**, producing a **Sprint Backlog** with a sprint goal; they coordinate in a 15-minute **Daily Scrum**; at the end they show a usable **Increment** that meets the team's **Definition of Done** at the **Sprint Review**, and reflect on their way of working at the **Sprint Retrospective**. A **Scrum Master** helps the team apply the method. Scrum says nothing about how to write code. **Extreme Programming** (XP) does: it prescribes engineering practices such as test-first development ([[software-engineering/testing]]), pair programming, continuous integration ([[software-engineering/version-control]]), refactoring ([[software-engineering/refactoring-maintenance]]), small releases and collective ownership of the code. **Kanban**, adapted from lean manufacturing to software by David Anderson and others in the late 2000s, does without fixed iterations: work items flow across a board of columns (to do, in progress, review, done), and each column has a **work-in-progress (WIP) limit**.

Why would limiting work in progress make a team faster? A result from queueing theory answers it.

::: proposition Little's law {#prop-little}
Consider a system that work items enter and leave, observed over a long period in which it is stable (the number of items inside does not grow without bound). Let $\lambda$ be the average **throughput** (items completed per unit time), $L$ the average number of items in the system (**work in progress**), and $W$ the average time an item spends in the system (**cycle time** or **lead time**). Then
$$
L = \lambda W .
$$ {#eq-little}
:::

::: proof
We give the argument for a finite observation window $[0, T]$ that starts and ends with the system empty, which captures the idea; John Little's 1961 proof handles the limit $T \to \infty$ in general. Let $N$ items pass through, item $i$ being inside for time $w_i$. Let $n(t)$ be the number of items inside at time $t$. Compute the area $A = \int_0^T n(t)\,dt$ in two ways. Each item contributes $1$ to $n(t)$ for exactly $w_i$ time units, so $A = \sum_{i=1}^{N} w_i$. Hence
$$
L = \frac{A}{T} = \frac{N}{T}\cdot\frac{1}{N}\sum_{i=1}^{N} w_i = \lambda W .
$$
The identity needs no assumption about the distribution of arrivals or of service times, nor about the order in which items are served.
:::

Little's law turns a management slogan into arithmetic. If a team finishes on average $\lambda = 3$ items per week and has $L = 12$ items in progress, an item takes on average $W = 12/3 = 4$ weeks from start to finish. Starting more work without finishing more does not increase $\lambda$; it increases $L$ and so, by [[#eq-little]], the time each item takes. A WIP limit of $6$ at the same throughput halves the average cycle time to $2$ weeks — feedback on each item arrives twice as fast, and less work is stranded when priorities change. (It does not make the team finish *more* work per week; it makes each piece finish *sooner*.)

::: warning Agile is not "no planning" and not "no documentation"
The manifesto values working software *more than* comprehensive documentation; it does not say documentation has no value. Agile teams plan constantly, at three scales — the release, the iteration and the day — and replan when they learn something. What they avoid is planning in detail what cannot yet be known. Equally, adopting the vocabulary of Scrum (sprints, stand-ups, story points) while keeping a fixed scope, fixed date and no feedback from users is not agile development; it is a sequential process with more meetings. Judge a process by what it does — how often working software reaches users and how quickly the team learns from it — not by what its ceremonies are called.
:::

::: quiz
A Kanban team completes on average 5 items per week. Its board shows 20 items in progress, and that number has stayed roughly constant for months. What is the average time an item spends on the board?
- [ ] 1 week
- [x] 4 weeks
- [ ] 5 weeks
- [ ] 100 weeks
::: solution
The system is stable (WIP roughly constant), so Little's law applies: $W = L/\lambda = 20/5 = 4$ weeks. Notice that nothing about the size or variety of items was needed — only the long-run averages.
:::
:::

## Estimating effort and schedule

Every process must answer "how long, and how much?" before the work is done. Estimates are needed to decide whether a project is worth starting, to staff it and to make commitments to customers. They are notoriously poor, for reasons we can partly explain.

### Scheduling a network of tasks

Suppose the work has been divided into tasks with estimated durations and **precedence constraints**: the user interface cannot be built before the API it calls is designed. The tasks and constraints form a directed acyclic graph.

::: definition Task network and critical path {#def-critical-path}
A **task network** is a directed acyclic graph whose vertices are tasks $t$ with durations $d(t) \ge 0$, and whose edge $u \to t$ means that $t$ cannot start until $u$ has finished. A **schedule** assigns each task a start time $s(t) \ge 0$ with $s(t) \ge s(u) + d(u)$ for every edge $u \to t$; its **length** is $\max_t \bigl(s(t) + d(t)\bigr)$. The **length of a path** $t_1 \to \dots \to t_k$ is $\sum_i d(t_i)$, and a **critical path** is a path of maximum length.
:::

::: theorem The critical path determines the shortest schedule {#thm-critical-path}
Assume unlimited people, so that any tasks whose prerequisites are finished can run in parallel. Then the shortest possible schedule of a task network has length equal to the length of a critical path. It is achieved by the **earliest-start schedule**
$$
s(t) = \max_{u \to t} \bigl(s(u) + d(u)\bigr), \qquad s(t) = 0 \text{ if } t \text{ has no prerequisites},
$$ {#eq-earliest-start}
computed in topological order.
:::

::: proof
*Every schedule is at least as long as every path.* Let $t_1 \to \dots \to t_k$ be a path. The constraints give $s(t_{i+1}) \ge s(t_i) + d(t_i)$, and $s(t_1) \ge 0$, so by induction $s(t_k) \ge \sum_{i<k} d(t_i)$, and the schedule's length is at least $s(t_k) + d(t_k) \ge \sum_{i \le k} d(t_i)$.

*The earliest-start schedule achieves the bound.* Because the graph is acyclic it has a topological order ([[algorithms/graph-search]]), and processing tasks in that order every $s(u)$ in [[#eq-earliest-start]] is known when $s(t)$ is computed; the schedule satisfies every constraint by construction. By induction along the topological order, $s(t)$ equals the length of the longest path *ending just before* $t$: true for tasks without prerequisites ($0$), and if true for every prerequisite $u$ then $s(t) = \max_u (s(u) + d(u))$ is the longest path into $t$. So $s(t) + d(t)$ is the longest path ending at $t$, and the schedule's length is the longest path overall.
:::

The **slack** of a task is how far its start can be delayed without lengthening the project: its *latest* start (computed by a backward pass from the end) minus its earliest start. Tasks on a critical path have zero slack. This is the **critical path method** (CPM), developed at DuPont and Remington Rand in 1957–59, together with PERT (below), for large engineering projects. It is the longest-path-in-a-DAG computation of [[algorithms/shortest-paths]], with durations on the vertices.

::: example A booking system {#ex-cpm}
The booking system of the introduction has seven tasks (durations in days): `spec` 3; `db` 5 and `api` 4, both after `spec`; `ui` 6 after `api`; `reports` 2 after `db`; `test` 3 after `db`, `ui` and `reports`; `deploy` 1 after `test`. Find the shortest schedule, the slack of each task and the critical path.
::: solution
The forward pass in topological order gives earliest starts `spec` 0, `db` 3, `api` 3, `ui` $3 + 4 = 7$, `reports` $3 + 5 = 8$, `test` $\max(3 + 5, 7 + 6, 8 + 2) = 13$, `deploy` 16, so the project takes $16 + 1 = 17$ days. The program below does both passes:

```python
from graphlib import TopologicalSorter

def critical_path(tasks):
    """tasks: name -> (duration, set of prerequisite names).
    Returns (project length, earliest starts, slack, zero-slack tasks)."""
    order = list(TopologicalSorter({t: deps for t, (_, deps) in tasks.items()}).static_order())
    es = {}                                   # earliest start of each task
    for t in order:                           # forward pass, prerequisites first
        dur, deps = tasks[t]
        es[t] = max((es[d] + tasks[d][0] for d in deps), default=0)
    length = max(es[t] + tasks[t][0] for t in tasks)
    succ = {t: [u for u in tasks if t in tasks[u][1]] for t in tasks}
    ls = {}                                   # latest start that keeps `length`
    for t in reversed(order):                 # backward pass, successors first
        ls[t] = min((ls[u] for u in succ[t]), default=length) - tasks[t][0]
    slack = {t: ls[t] - es[t] for t in tasks}
    path = [t for t in order if slack[t] == 0]
    return length, es, slack, path

tasks = {
    "spec":    (3, set()),
    "db":      (5, {"spec"}),
    "api":     (4, {"spec"}),
    "ui":      (6, {"api"}),
    "reports": (2, {"db"}),
    "test":    (3, {"db", "ui", "reports"}),
    "deploy":  (1, {"test"}),
}
if __name__ == "__main__":
    length, es, slack, path = critical_path(tasks)
    print("length:", length)
    for t in tasks:
        print(f"{t:8} start {es[t]:2}  slack {slack[t]}")
    print("critical:", " -> ".join(path))
```

```console
$ python3 cpm.py
length: 17
spec     start  0  slack 0
db       start  3  slack 3
api      start  3  slack 0
ui       start  7  slack 0
reports  start  8  slack 3
test     start 13  slack 0
deploy   start 16  slack 0
critical: spec -> api -> ui -> test -> deploy
```

The critical path is `spec → api → ui → test → deploy` ($3 + 4 + 6 + 3 + 1 = 17$). The database and reports can slip by three days without delaying anything; a one-day slip in `ui` delays delivery by a day. A manager who wants the project sooner must shorten the critical path — by splitting `ui`, say — because adding effort to `db` achieves nothing. (Here the zero-slack tasks form a single path; in general they may form several critical paths, and the last line lists all of them in topological order.)
:::
:::

::: widget graph
nodes: spec@0,1; db@1,2; api@1,0; ui@2,0; reports@2,2; test@3,1; deploy@4,1
edges: spec>db; spec>api; api>ui; db>reports; db>test; ui>test; reports>test; test>deploy
algorithm: topo
caption: The task network of [[#ex-cpm]], with an arrow from each task to the tasks that wait for it. Step through the topological sort: it produces an order in which every task comes after its prerequisites, which is the order in which the forward pass computes earliest starts. Try adding, in your head, an edge `test → ui` ("the UI needs test results"): the graph would have a cycle, no topological order would exist, and no schedule could satisfy the constraints.
:::

### Three-point estimates and why plans are optimistic

A single number hides the uncertainty in an estimate. The **Program Evaluation and Review Technique** (PERT), developed for the US Navy's Polaris missile programme in 1958, asks instead for three: an optimistic duration $a$, a most likely duration $m$ and a pessimistic duration $b$. It then approximates the mean and standard deviation of the duration by
$$
\mu \approx \frac{a + 4m + b}{6}, \qquad \sigma \approx \frac{b - a}{6}.
$$ {#eq-pert}
These formulas are a convention (they come from a beta distribution with particular parameters), not a law of nature. Their important feature is shared by every reasonable model: software tasks are **right-skewed**. A task can finish a little earlier than expected but can take far longer — the pessimistic tail is long — so the mean lies above the most likely value. For the user-interface task with $(a, m, b) = (4, 6, 12)$, $\mu \approx (4 + 24 + 12)/6 \approx 6.7$ days, not 6.

There is a second, subtler source of optimism, and it can be proved.

::: proposition Plans from most-likely values are optimistic {#prop-merge-bias}
Let the task durations $D(t)$ be random variables, and let the project length be $\Lambda = \max_P \Lambda_P$, where $\Lambda_P = \sum_{t \in P} D(t)$ is the length of path $P$ and the maximum is over all paths. Then
$$
\E[\Lambda] \;\ge\; \max_P \E[\Lambda_P] \;=\; \max_P \sum_{t \in P} \E[D(t)] .
$$
If, moreover, each $\E[D(t)] \ge m(t)$, the most likely value (right skew), then $\E[\Lambda]$ is at least the length of the critical path computed from the most likely values.
:::

::: proof
For every outcome and every path $P$, $\Lambda \ge \Lambda_P$. Taking expectations, $\E[\Lambda] \ge \E[\Lambda_P]$ for each $P$, hence $\E[\Lambda] \ge \max_P \E[\Lambda_P]$; and $\E[\Lambda_P] = \sum_{t\in P}\E[D(t)]$ by linearity of expectation (no independence is needed). With $\E[D(t)] \ge m(t)$, each $\E[\Lambda_P]$ is at least the path's length under the most likely durations, and so is the maximum over paths.
:::

The inequality $\E[\max] \ge \max \E$ is called **merge bias**: wherever paths join (at `test` in our network), a delay on *any* incoming path delays the join, so near-critical paths that might overtake the critical one add to the expected length. Together with skew, it explains why the most-likely plan of 17 days is a poor bet. Simulation shows how poor.

::: example Simulating the schedule {#ex-monte-carlo}
Give each task of [[#ex-cpm]] a triangular distribution with the three-point estimates below, simulate 20,000 projects, and estimate the probability of finishing within the 17-day plan.
::: solution
```python
import random
from cpm import critical_path            # the function above, saved as cpm.py

# (optimistic, most likely, pessimistic) durations in days, and prerequisites
est = {
    "spec":    ((2, 3, 6),  set()),
    "db":      ((3, 5, 10), {"spec"}),
    "api":     ((3, 4, 8),  {"spec"}),
    "ui":      ((4, 6, 12), {"api"}),
    "reports": ((1, 2, 4),  {"db"}),
    "test":    ((2, 3, 8),  {"db", "ui", "reports"}),
    "deploy":  ((1, 1, 2),  {"test"}),
}
rng = random.Random(1968)
runs = []
for _ in range(20_000):
    sample = {t: (rng.triangular(lo, hi, mode), deps)   # note argument order
              for t, ((lo, mode, hi), deps) in est.items()}
    runs.append(critical_path(sample)[0])
runs.sort()
n = len(runs)
print(f"P(length <= 17) = {sum(r <= 17 for r in runs) / n:.3f}")
print(f"mean = {sum(runs) / n:.1f}, median = {runs[n // 2]:.1f}, "
      f"85th percentile = {runs[int(0.85 * n)]:.1f}")
```

```console
$ python3 montecarlo.py
P(length <= 17) = 0.019
mean = 21.7, median = 21.6, 85th percentile = 24.3
```

Under this model the 17-day plan has about a **2%** chance of being met. The mean of a triangular distribution is $(a + m + b)/3$; summing those along the critical path gives $21.7$, the simulated mean, so here skew does almost all the damage and merge bias adds little (the `db` path is rarely critical). A commitment at the 85th percentile, about 24 days, would be met in roughly five projects out of six. The numbers are only as good as the three-point estimates, but the *direction* of the conclusion does not depend on them: by [[#prop-merge-bias]], any right-skewed model gives an expected length above the most-likely plan.
:::
:::

Simulation also exposes an assumption hidden in both PERT and the proposition's use: that task durations are independent. In reality they are positively correlated — if the team underestimated the database, it probably underestimated the API for the same reason. With independent errors the standard deviation of a sum of $k$ similar tasks grows like $\sqrt{k}$, so relative uncertainty shrinks as projects grow; with correlated errors it does not shrink, and a large plan is as uncertain, proportionally, as a small one.

### Estimating effort

Durations come from estimates of **effort** (person-days of work). The main methods are **expert judgement** (often structured, as in Wideband Delphi or **planning poker**, where estimators reveal estimates simultaneously and discuss the outliers), **analogy** with completed projects, and **parametric models** fitted to historical data. The best known parametric model is Boehm's **COCOMO** (*Software Engineering Economics*, 1981), calibrated on 63 projects at TRW. Its basic form for "organic" projects (small teams, familiar problems) is
$$
E = 2.4\,S^{1.05} \text{ person-months}, \qquad T = 2.5\,E^{0.38} \text{ months},
$$
where $S$ is the size in thousands of delivered source lines (KLOC). For $S = 32$, $E \approx 91$ person-months and $T \approx 13.9$ months, implying an average team of about $6.6$ people. The exponent $1.05 > 1$ encodes a **diseconomy of scale**: doubling the size multiplies the effort by $2^{1.05} \approx 2.07$, because larger systems need more communication and integration. More elaborate versions (intermediate COCOMO, COCOMO II of 2000) multiply by cost drivers such as required reliability and team experience.

Parametric models have two serious limits. They need the size before the code exists, which is itself an estimate; and their constants describe the projects they were fitted to — 1970s projects at one company, in COCOMO's case — so they must be recalibrated on local data before their output means anything. Their lasting value is the *shape* they reveal: effort grows faster than size, and schedule grows much more slowly than effort, so there is a minimum sensible duration for a given amount of work.

## Managing people and risk

### Brooks's law

Frederick Brooks managed the development of IBM's System/360 operating system, OS/360, in the 1960s, and distilled the experience in *The Mythical Man-Month* (1975; anniversary edition 1995). Its title essay argues that people and months are interchangeable only for tasks that can be partitioned with no communication — picking cotton, in his example — and not for software, and concludes with **Brooks's law**: "adding manpower to a late software project makes it later". He gave two mechanisms. New people must be trained by existing ones, who then do less work; and the work of coordination grows with the number of people who must talk to each other.

::: proposition Communication channels {#prop-channels}
In a team of $n$ people in which every pair may need to coordinate, there are $\binom{n}{2} = n(n-1)/2$ communication channels.
:::

::: proof
Each channel is an unordered pair of distinct people, and there are $\binom{n}{2}$ such pairs: $n$ choices for the first and $n - 1$ for the second, divided by $2$ because each pair is counted twice.
:::

Going from 5 people to 10 doubles the workforce but multiplies the channels from 10 to 45. A toy model makes the trade-off explicit. Suppose a project needs $W$ person-months of partitionable work, and each pair of people adds $c$ person-months of coordination effort over the project. With $n$ people the total effort is $W + c\,n(n-1)/2$, shared among $n$ people, so the duration is
$$
T(n) = \frac{W}{n} + \frac{c\,(n - 1)}{2}.
$$ {#eq-brooks-model}
Treating $n$ as continuous, $T'(n) = -W/n^2 + c/2$ vanishes at $n^* = \sqrt{2W/c}$, and $T$ is convex, so this is the minimum: beyond $n^*$, every extra person makes the project *slower*. With $W = 60$ and $c = 0.5$, $n^* = \sqrt{240} \approx 15.5$ and $T(15) = T(16) = 7.5$ months; with $30$ people $T = 2 + 7.25 = 9.25$ months.

::: widget plot
f: w/x + c*(x - 1)/2; w/x
x: 1, 40
y: 0, 30
sliders: w=10:5:200:60; c=0.1:0.05:2:0.5
labels: T(n) = W/n + c(n-1)/2; W/n \text{ (no coordination cost)}
caption: The toy model [[#eq-brooks-model]] of project duration $T$ (months) against team size $n$, with $W$ person-months of work and coordination cost $c$ per pair. Without coordination cost (lower curve) more people always help. With it, there is an optimum near $\sqrt{2W/c}$ and larger teams are slower. Increase $c$ to model work that needs more coordination: the optimum moves left. This is an illustration of Brooks's argument, not a validated model of real teams.
:::

How far is Brooks's law true? It is an argument, not a measured law, and it is about *late* projects specifically: newcomers arriving late must learn a system that is already complex, while the deadline is near. Brooks himself, in the 1995 edition, called it an oversimplification while defending its core. Simulation studies of project dynamics, beginning with Abdel-Hamid and Madnick's *Software Project Dynamics* (1991), found that adding staff late increases cost but does not always lengthen the schedule; it depends on when, how many and how partitionable the remaining work is. The useful lesson is narrower and solid: people are not interchangeable with months, communication is a real cost, and organisations reduce it by giving small teams well-defined interfaces between their parts — an idea we return to with Conway's law in [[software-engineering/software-architecture]].

### Risk management

Boehm's spiral model put risk at the centre of planning, and his 1991 article "Software risk management: principles and practices" gave the standard quantitative tool.

::: definition Risk exposure {#def-risk-exposure}
A **risk** is a possible future event that would cause a loss. Its **risk exposure** is
$$
\mathrm{RE} = P(\text{the event occurs}) \times L, 
$$
where $L$ is the size of the loss if it occurs (in money, days or any common unit). **Risk management** identifies risks, estimates their exposures, ranks them, and plans **mitigations**; a mitigation is worth its cost $C$ if it reduces the exposure by more than $C$ (its **risk reduction leverage** $(\mathrm{RE}_{\text{before}} - \mathrm{RE}_{\text{after}})/C$ exceeds 1).
:::

::: example Ranking risks {#ex-risk}
A project lists three risks. (1) A key developer leaves: probability $0.2$, loss 30 days. (2) A third-party payment API changes its interface: probability $0.5$, loss 6 days. (3) Performance is inadequate at launch: probability $0.3$, loss 40 days. Rank them. A two-day load-testing prototype would reduce the probability of (3) to $0.1$; is it worth doing?
::: solution
Exposures: (1) $0.2 \times 30 = 6$ days; (2) $0.5 \times 6 = 3$ days; (3) $0.3 \times 40 = 12$ days. Ranking: performance, key person, API. The prototype reduces risk (3)'s exposure to $0.1 \times 40 = 4$ days, a reduction of $8$ days for a cost of $2$: leverage $8/2 = 4 > 1$, so it is worth it — exactly the kind of early, risk-reducing work the spiral model recommends. (For risk (1), typical mitigations are pairing and documentation, so that knowledge is not held by one person.)
:::
:::

Estimates of probability and loss are themselves judgements, so the numbers rank risks rather than predict outcomes. Their value is that they force an explicit conversation about what might go wrong while there is still time to act.

### Measuring delivery

What should a team measure to know whether its process works? The most influential recent answer comes from the *State of DevOps* surveys led by Nicole Forsgren, summarised in *Accelerate* (Forsgren, Humble and Kim, 2018). They proposed four measures of software delivery performance: **deployment frequency** (how often changes reach production), **lead time for changes** (from commit to running in production), **change failure rate** (the fraction of deployments that cause a failure needing remediation) and **time to restore service** after a failure (renamed "failed deployment recovery time" in later reports). Their headline finding was that these measures go together: the respondents who deployed most often also had the lowest failure rates and fastest recovery, so in their data speed and stability were not a trade-off.

These results are among the best evidence the field has, and they have clear limits, which the authors discuss. The data are **surveys**: self-reported answers from self-selected respondents, many of them already interested in DevOps. The constructs were validated statistically, but the analysis establishes *association*; the book argues for predictive relationships using structural models, which is stronger than raw correlation but weaker than a controlled experiment. And any metric used as a *target* invites gaming — deploying trivial changes raises deployment frequency without delivering anything (Goodhart's law: a measure that becomes a target ceases to be a good measure). Use such measures to see where the process is slow, not to rank teams.

::: warning Numbers you will hear quoted
Software engineering is full of statistics repeated far beyond their evidence. The *CHAOS* reports of the Standish Group, starting in 1994, claimed that only 16% of projects succeeded; the figure was widely cited, but the method and data were never published, and critiques (Jørgensen and Moløkken-Østvold, 2006; Eveleens and Verhoef, *IEEE Software*, 2010) showed that its definition of success — meeting the *initial* estimate — measures estimation bias as much as project failure. The claim that some programmers are "ten times more productive" traces to a small 1968 experiment by Sackman, Erikson and Grant that compared debugging times on two tasks and mixed programming languages; the variation it found was real, but the 10× figure is folklore. The famous "cone of uncertainty" (Boehm 1981, popularised by McConnell in 2006), in which estimates converge from a range of $0.25\times$–$4\times$ to the actual value as a project proceeds, is a model of the *best* that estimation can achieve, not an observation that estimates do converge; Laurent Bossavit's *The Leprechauns of Software Engineering* (2012–2015) traces this and similar claims back to thin evidence. When you meet a number, ask where it was measured, on what projects and with what definitions.
:::

What *is* well supported about estimation? Reviews of the empirical literature by Magne Jørgensen and colleagues (for example "A review of studies on expert estimation of software development effort", *Journal of Systems and Software*, 2004) find that most projects overrun their effort estimates, that expert estimates are on average no worse than model-based ones, and that estimates are biased by irrelevant information such as a customer's hoped-for figure ("anchoring"). Practical consequences: estimate from data about your own past projects, express estimates as ranges or probabilities, keep estimates separate from targets and commitments, and re-estimate as you learn.

::: history
The NATO Science Committee's conference on software engineering, held in Garmisch, Germany, on 7–11 October 1968 and reported by Peter Naur and Brian Randell, gave the field its name and its sense of crisis; a second conference followed in Rome in 1969. Winston Royce's 1970 paper described — and criticised — the sequential life cycle later called the waterfall. Frederick Brooks published *The Mythical Man-Month* in 1975, from his experience managing OS/360; the 1995 anniversary edition added his 1986 essay "No Silver Bullet", which argued that no single technique would bring an order-of-magnitude productivity gain, because the essential difficulty of software lies in its conceptual complexity rather than its accidents of expression. Barry Boehm's *Software Engineering Economics* (1981) introduced COCOMO, and his spiral model appeared in *IEEE Computer* in 1988. The Agile Manifesto was written in February 2001, and Forsgren, Humble and Kim's *Accelerate* (2018) brought survey-based measurement of delivery performance to a wide audience.
:::

## Where this leads

The remaining chapters take the process activities one at a time: specification in [[software-engineering/requirements]], design in [[software-engineering/software-architecture]] and [[software-engineering/design-principles]], the collaborative mechanics of building in [[software-engineering/version-control]], validation in [[software-engineering/testing]] and [[software-engineering/verification]], evolution in [[software-engineering/refactoring-maintenance]], and the responsibilities that come with all of them in [[software-engineering/professional-ethics]]. The probability used for estimates is developed in [Maths Atlas: expectation](/learn/maths/lesson.php?c=probability&l=expectation); queueing ideas like Little's law return in [[operating-systems]] and [[networks]], where they govern scheduling and buffering; and the longest-path computation behind critical paths is in [[algorithms/shortest-paths]].

::: summary
- A **software process** organises four activities — specification, design and implementation, validation, evolution ([[#def-process]]). Plan-driven processes fix the plan in advance; incremental ones deliver in short cycles and replan ([[#def-plan-driven]]). Choose by risk.
- Royce's 1970 paper presented the sequential "waterfall" and called it risky; the **spiral model** does first whatever most reduces risk; **agile** methods (Scrum, XP, Kanban) deliver working software frequently and adapt.
- **Little's law** $L = \lambda W$ ([[#prop-little]]): with throughput fixed, less work in progress means shorter cycle times.
- The shortest schedule equals the length of a **critical path** in the task network ([[#thm-critical-path]]); only critical-path tasks delay delivery.
- Task durations are right-skewed and paths merge, so $\E[\text{length}] \ge$ the most-likely plan ([[#prop-merge-bias]]); simulate, and commit at a percentile, not at the most likely value.
- Communication channels grow as $n(n-1)/2$ ([[#prop-channels]]), the basis of **Brooks's law** — an argument about late projects, not a measured constant. Rank risks by **exposure** $P \times L$ ([[#def-risk-exposure]]).
- Empirical results (DORA metrics, estimation studies) come with limits: surveys, association, local calibration. Treat famous figures — CHAOS, "10×", the cone of uncertainty — as claims to be checked.
:::

## Exercises

::: exercise Channels {level=1 check="45"}
A team grows from 5 to 10 people, every pair of whom may need to coordinate. How many communication channels does the larger team have? (Enter the number.)
::: solution
By [[#prop-channels]], $10 \cdot 9/2 = 45$, compared with $5 \cdot 4/2 = 10$ for the original team: twice the people, four and a half times the channels.
:::
:::

::: exercise Cycle time {level=1 check="2.5"}
A support team resolves on average 8 tickets per day, and the number of open tickets has hovered around 20 for months. What is the average time, in days, from a ticket's arrival to its resolution? (Enter the number of days.)
::: solution
The system is stable, so Little's law gives $W = L/\lambda = 20/8 = 2.5$ days.
:::
:::

::: exercise A PERT estimate {level=1 check="7"}
A task has optimistic, most likely and pessimistic durations of 3, 6 and 15 days. What is its PERT mean duration? (Enter the number of days.)
::: solution
By [[#eq-pert]], $\mu = (3 + 4 \cdot 6 + 15)/6 = 42/6 = 7$ days, one day more than the most likely value because the pessimistic tail is long. The PERT standard deviation is $(15 - 3)/6 = 2$ days.
:::
:::

::: exercise Ranking two risks {level=1 check="8"}
Risk A has probability $0.4$ and would cost 20 days; risk B has probability $0.1$ and would cost 60 days. What is the larger of the two risk exposures, in days? (Enter the number.)
::: solution
By [[#def-risk-exposure]], $\mathrm{RE}_A = 0.4 \times 20 = 8$ days and $\mathrm{RE}_B = 0.1 \times 60 = 6$ days, so A ranks first with exposure $8$. Note that B, the less likely risk, has the larger potential loss; exposure is a ranking device, and a project that cannot survive a 60-day loss at all might still treat B as the priority.
:::
:::

::: exercise Shortening the project {level=2 check="14"}
In [[#ex-cpm]], the team splits `ui` into two halves that can be built in parallel by different people, each taking 3 days after `api`, and `test` waits for both. What is the new shortest project length, in days? Which tasks are now critical? (Enter the length.)
::: solution
Forward pass: `spec` 0, `db` 3, `api` 3, both `ui` halves 7, `reports` 8, `test` $\max(3 + 5,\ 7 + 3,\ 8 + 2) = 10$, `deploy` 13, so the project ends at $13 + 1 = \mathbf{14}$ days. Two paths now have length 14: `spec → api → ui-half → test → deploy` ($3 + 4 + 3 + 3 + 1$) and `spec → db → reports → test → deploy` ($3 + 5 + 2 + 3 + 1$). The database and reports, which had three days of slack, are now critical. Shortening one critical path often promotes another: further gains now need *both* paths shortened, and by [[#prop-merge-bias]] two critical paths merging at `test` make the expected length worse than either alone suggests.
:::
:::

::: exercise Adding people late {level=2 check="4.5"}
A late project has 24 person-months of partitionable work left and 4 developers. Two more join. In their first month the newcomers produce nothing, and each takes up half of one veteran's time for training; afterwards all six work at full speed. Ignore other coordination costs. How many months will the remaining work take? Compare with not adding anyone, and repeat both calculations for 4 person-months of remaining work. (Enter the months for the 24-person-month case with six people.)
::: solution
Without the newcomers: $24/4 = 6$ months. With them: in month 1 the veterans deliver $4 - 2 \times 0.5 = 3$ person-months, leaving $21$, which six people finish in $21/6 = 3.5$ months; total $\mathbf{4.5}$ months, a gain of 1.5 months. With 4 person-months left: without newcomers, $1$ month; with them, month 1 delivers 3, leaving 1, which takes $1/6$ of a month, so about $1.17$ months — *later*. The break-even is at 6 person-months (1.5 months either way). Brooks's law describes the case where little work remains relative to the ramp-up cost; early, with much partitionable work left, adding people can help. Real ramp-up periods are often longer than a month, and coordination costs ([[#eq-brooks-model]]) shift the break-even further.
:::
:::

::: exercise Optimal team size {level=2 check="20"}
In the toy model [[#eq-brooks-model]] with $W = 200$ person-months and $c = 1$ person-month per pair, which team size minimises the duration, and what is the minimum duration? (Enter the team size.)
::: solution
$n^* = \sqrt{2W/c} = \sqrt{400} = 20$. Then $T(20) = 200/20 + 19/2 = 10 + 9.5 = 19.5$ months. Check the neighbours: $T(19) = 10.53 + 9 = 19.53$ and $T(21) = 9.52 + 10 = 19.52$, both slightly longer. Note how flat the minimum is: anywhere from about 15 to 27 people gives under 20.5 months, so the model's real message is the steep rise of $T$ for very large teams, not the precise optimum.
:::
:::

::: exercise Which measures? {level=2}
A manager proposes to reward teams by the number of deployments per week. Using the four delivery measures of *Accelerate*, explain what is likely to go wrong and propose a better use of the measures.
::: solution
Deployment frequency measures throughput only. Rewarding it alone invites splitting changes artificially or deploying without adequate testing; the second would show up as a higher change failure rate and more time spent restoring service, the two stability measures. This is Goodhart's law: once the measure becomes a target, it stops reflecting what it was meant to measure. A better use is diagnostic: track all four together, over time, within a team, to find bottlenecks (a long lead time might point to slow code review or manual testing), and remember that the evidence behind them is survey-based and shows association between the measures and organisational performance, not that raising one number causes improvement.
:::
:::

::: exercise Slack and critical paths {level=3}
In a task network with project length $L$ (the critical path length), define $\ell^-(t)$ as the length of the longest path ending just before $t$ (excluding $d(t)$) and $\ell^+(t)$ as the length of the longest path starting at $t$ (including $d(t)$). The backward pass computes $ls(t) = L - d(t)$ if $t$ has no successors and $ls(t) = \min_{t \to u} ls(u) - d(t)$ otherwise. Prove that $\mathrm{slack}(t) = ls(t) - s(t) = L - \bigl(\ell^-(t) + \ell^+(t)\bigr)$, and deduce that the slack is non-negative and is zero exactly for tasks on some critical path.
::: solution
*Claim 1: $ls(t) = L - \ell^+(t)$.* By induction in reverse topological order. If $t$ has no successors, the longest path starting at $t$ is $t$ alone, $\ell^+(t) = d(t)$, and $ls(t) = L - d(t)$. Otherwise, assuming the claim for all successors $u$,
$$
ls(t) = \min_u \bigl(L - \ell^+(u)\bigr) - d(t) = L - \Bigl(d(t) + \max_u \ell^+(u)\Bigr) = L - \ell^+(t),
$$
because a longest path starting at $t$ consists of $t$ followed by a longest path starting at one of its successors.

*Claim 2: $s(t) = \ell^-(t)$* for the earliest-start schedule; this was shown in the proof of [[#thm-critical-path]].

Hence $\mathrm{slack}(t) = L - \ell^+(t) - \ell^-(t)$. Now $\ell^-(t) + \ell^+(t)$ is the length of the longest path *through* $t$ (join a longest path into $t$ with a longest path out of it). Every path has length at most $L$, so the slack is $\ge 0$; and it is $0$ exactly when some path through $t$ has length $L$, that is, when $t$ lies on a critical path. This justifies reading the critical tasks off as the zero-slack tasks in [[#ex-cpm]].
:::
:::

::: exercise Correlated estimation errors {level=3}
Modify the simulation of [[#ex-monte-carlo]] so that, in each simulated project, every duration is multiplied by a shared factor $f$ drawn from a triangular distribution on $[0.8, 1.6]$ with mode $1$ — modelling a team that misjudges all its tasks in the same direction. Compare the mean, standard deviation and relative spread (standard deviation divided by mean) of the project length with and without the shared factor, and explain the result.
::: solution
```python
import random, statistics
from cpm import critical_path

# (optimistic, most likely, pessimistic) durations in days, and prerequisites
est = {
    "spec":    ((2, 3, 6),  set()),
    "db":      ((3, 5, 10), {"spec"}),
    "api":     ((3, 4, 8),  {"spec"}),
    "ui":      ((4, 6, 12), {"api"}),
    "reports": ((1, 2, 4),  {"db"}),
    "test":    ((2, 3, 8),  {"db", "ui", "reports"}),
    "deploy":  ((1, 1, 2),  {"test"}),
}

def simulate(correlated, runs=20_000, seed=2001):
    rng = random.Random(seed)
    lengths = []
    for _ in range(runs):
        # one shared factor: the whole team misjudged the work by the same ratio
        f = rng.triangular(0.8, 1.6, 1.0) if correlated else 1.0
        sample = {t: (f * rng.triangular(lo, hi, mode), deps)
                  for t, ((lo, mode, hi), deps) in est.items()}
        lengths.append(critical_path(sample)[0])
    return statistics.mean(lengths), statistics.stdev(lengths)

for c in (False, True):
    m, s = simulate(c)
    print(f"correlated={c!s:5}  mean {m:5.1f}  sd {s:4.1f}  sd/mean {s / m:.2f}")
```

```console
$ python3 correlated.py
correlated=False  mean  21.7  sd  2.5  sd/mean 0.12
correlated=True   mean  24.6  sd  4.7  sd/mean 0.19
```

The shared factor has mean $(0.8 + 1 + 1.6)/3 \approx 1.13$, which raises the mean length by about 13% (from 21.7 to 24.6 days). More importantly, the standard deviation almost doubles. With independent errors, overruns on some tasks are partly cancelled by underruns on others, so the spread of a sum grows only like the square root of the number of tasks. A shared factor moves every task the same way and does not cancel: the uncertainty of the whole is as large, proportionally, as that of its parts. Since real estimation errors are positively correlated — the same people, the same optimism, the same unfamiliar technology — independent-task simulations and PERT's variance formula understate the true risk.
:::
:::
