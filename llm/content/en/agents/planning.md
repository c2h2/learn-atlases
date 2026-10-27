The agent loop of [[agents/agent-loops]] decides one step at a time. That is enough for short tasks, and for tasks where every observation changes what should happen next. It is not enough for tasks with many interdependent parts — migrate a code base to a new library, organise a conference trip for twelve people, reproduce the analysis of a paper — where a step taken without regard to the whole can make later steps impossible, and where an agent that has lost track of the overall goal wanders. For such tasks agents **plan**: they produce, before or during execution, an explicit structure of steps and subgoals, execute against it, and revise it when reality disagrees.

Planning is one of the oldest subjects of artificial intelligence, and the classical theory gives precise answers to questions that language-model agents face informally: what a plan is, when a plan is correct, why finding one is hard, and why subgoals cannot always be pursued one at a time. This chapter starts there, with the STRIPS representation (Fikes and Nilsson, 1971), its successor PDDL, and planning as search, with a small planner in plain Python. It then turns to how language-model agents plan — plan-and-execute loops with replanning, hierarchical decomposition, and the division of labour in LLM+P (Liu et al., 2023), where a model translates a problem into a formal language and a classical planner solves it. It ends with the evidence on how well language models plan by themselves (Valmeekam et al., 2023 and later work), which is more contested than most topics in this course and is presented with the arguments on both sides.

## Classical planning {#sec-classical}

Classical planning studies the simplest setting in which planning is still hard: a fully observed world, deterministic actions, a known initial state and a goal. The CS Atlas treats it in depth ([Planning](/learn/cs/lesson.php?c=artificial-intelligence&l=planning), with search algorithms in [Search](/learn/cs/lesson.php?c=artificial-intelligence&l=search)); here we need only the core.

::: definition STRIPS planning problem {#def-strips}
A **STRIPS problem** is a tuple $(F, A, s_0, G)$: a finite set $F$ of ground **atoms** (facts such as `on(A,B)`), a set $A$ of **actions**, an **initial state** $s_0\subseteq F$ and a **goal** $G\subseteq F$. A **state** is a set of atoms, those currently true. Each action $a$ has a **precondition** $\operatorname{pre}(a)$, an **add list** $\operatorname{add}(a)$ and a **delete list** $\operatorname{del}(a)$, all subsets of $F$. Action $a$ is **applicable** in $s$ if $\operatorname{pre}(a)\subseteq s$, and then its result is
$$
\gamma(s, a) = \big(s\setminus\operatorname{del}(a)\big)\cup\operatorname{add}(a).
$$ {#eq-progression}
A **plan** is a sequence $a_1, \dots, a_n$ such that each $a_i$ is applicable in $s_{i-1} = \gamma(s_{i-2}, a_{i-1})$, and it **solves** the problem if $G\subseteq s_n$. Its length is $n$.
:::

STRIPS — the Stanford Research Institute Problem Solver — was built by Fikes and Nilsson (1971) to plan the actions of Shakey, a mobile robot. Its representation outlived its algorithm. The **Planning Domain Definition Language** (PDDL), introduced by McDermott and colleagues in 1998 for the first International Planning Competition, writes STRIPS-style problems in a standard syntax with typed variables, separating a **domain file** (predicates and action schemas with parameters) from a **problem file** (objects, initial state, goal); later versions added numeric quantities, durations and preferences. An action schema such as `move(?b ?x ?y)` stands for all its ground instances.

The standard toy domain is the **blocks world**: blocks on a table, at most one block directly on another, and an action that moves a clear block (one with nothing on it) onto the table or onto another clear block.

::: example Ground actions of the blocks world {#ex-ground}
Using the action schema $\textsf{move}(b, x, y)$ — move block $b$ from $x$ to $y$, where $x$ and $y$ are blocks or the table — write the precondition, add and delete lists, and count the ground actions for $3$ blocks.
::: solution
$\operatorname{pre} = \{\textsf{on}(b, x), \textsf{clear}(b), \textsf{clear}(y)\}$, where $\textsf{clear}(y)$ is omitted when $y$ is the table (the table always has room). $\operatorname{add} = \{\textsf{on}(b, y), \textsf{clear}(x)\}$ ($\textsf{clear}(x)$ omitted if $x$ is the table) and $\operatorname{del} = \{\textsf{on}(b, x), \textsf{clear}(y)\}$ ($\textsf{clear}(y)$ omitted if $y$ is the table). With blocks $\{A, B, C\}$, $b$ has $3$ choices, and $x$ and $y$ are two distinct elements of the three remaining places (the other two blocks and the table), $3\cdot2 = 6$ ordered pairs. Total $3\cdot6 = 18$ ground actions— the number the listing below prints.
:::
:::

### Planning as search

A STRIPS problem defines a directed graph: vertices are states, and there is an edge $s\to\gamma(s, a)$ for every applicable action. A plan is a path from $s_0$ to a state containing $G$, and a shortest plan is a shortest path, so every graph-search algorithm is a planner. Breadth-first search finds a shortest plan; A* with an admissible heuristic does too, expanding fewer states when the heuristic is informative.

::: widget graph
nodes: A|B|C@0,0; AB|C@1.50,0.00; ABC@3.00,0.00; A|CB@0.75,1.30; CBA@1.50,2.60; AC|B@-0.75,1.30; ACB@-1.50,2.60; A|BC@-1.50,0.00; BCA@-3.00,0.00; BA|C@-0.75,-1.30; BAC@-1.50,-2.60; B|CA@0.75,-1.30; CAB@1.50,-2.60
edges: ABC-AB|C; AB|C-A|B|C; AB|C-A|CB; ACB-AC|B; AC|B-A|BC; AC|B-A|B|C; A|BC-A|B|C; A|BC-BCA; A|B|C-A|CB; A|B|C-BA|C; A|B|C-B|CA; A|CB-CBA; BAC-BA|C; BA|C-B|CA; B|CA-CAB
algorithm: bfs
start: AC|B
caption: The whole state space of the three-block world: $13$ states and $15$ reversible moves. Each name lists towers bottom to top, separated by bars, so AC|B means C on A and B on the table, and CBA is the single tower with C at the bottom and A on top. Step through breadth-first search from AC|B, the start of the Sussman anomaly ([[#ex-sussman]]); the goal CBA is first reached at depth $3$, by C to the table, B onto C, A onto B. With $n$ blocks the number of states grows faster than $n!$: $73$ for four blocks, $501$ for five and $4{,}051$ for six.
:::

The size of that graph is the difficulty. Deciding whether a STRIPS problem has a solution is PSPACE-complete in general (Bylander, 1994), and the state space is exponential in the number of atoms. Practical planners succeed through heuristics computed from the problem description itself — most famously from the **delete relaxation**, which ignores delete lists to obtain an easier problem whose solution cost estimates the real one — and through decades of engineering, collected in systems such as Fast Downward (Helmert, 2006).

### A planner in plain Python

The listing grounds the blocks-world actions, implements progression [[#eq-progression]], and searches with breadth-first search and with A* — first with $h = 0$, which makes A* uniform-cost search, then with the **goal-count heuristic**, the number of goal atoms not yet true. It solves the three-block Sussman anomaly and the reversal of a six-block tower.

```python
import heapq
from collections import deque

def blocks_actions(blocks):
    """Ground STRIPS actions move(b, x, y): move block b from x onto y (x, y a block or 'table')."""
    acts = []
    places = list(blocks) + ["table"]
    for b in blocks:
        for x in places:
            for y in places:
                if len({b, x, y}) < 3 or (x == "table" and y == "table"):
                    continue
                pre = {f"on({b},{x})", f"clear({b})"} | ({f"clear({y})"} if y != "table" else set())
                add = {f"on({b},{y})"} | ({f"clear({x})"} if x != "table" else set())
                dele = {f"on({b},{x})"} | ({f"clear({y})"} if y != "table" else set())
                acts.append((f"move({b},{x},{y})", frozenset(pre), frozenset(add), frozenset(dele)))
    return acts

def successors(state, acts):
    for name, pre, add, dele in acts:
        if pre <= state:                         # applicable: preconditions hold
            yield name, (state - dele) | add     # STRIPS progression

def bfs(init, goal, acts):
    frontier, parent, expanded = deque([init]), {init: None}, 0
    while frontier:
        s = frontier.popleft(); expanded += 1
        if goal <= s:
            return extract(parent, s), expanded, len(parent)
        for name, t in successors(s, acts):
            if t not in parent:
                parent[t] = (s, name); frontier.append(t)

def astar(init, goal, acts, h):
    g, parent, expanded, tie = {init: 0}, {init: None}, 0, 0
    heap = [(h(init, goal), 0, init)]
    while heap:
        f, _, s = heapq.heappop(heap)
        if f > g[s] + h(s, goal): continue       # stale entry
        expanded += 1
        if goal <= s:
            return extract(parent, s), expanded, len(parent)
        for name, t in successors(s, acts):
            if t not in g or g[s] + 1 < g[t]:
                g[t], parent[t] = g[s] + 1, (s, name)
                tie += 1; heapq.heappush(heap, (g[t] + h(t, goal), tie, t))

def extract(parent, s):
    plan = []
    while parent[s]:
        s, name = parent[s]; plan.append(name)
    return plan[::-1]

goal_count = lambda s, goal: len(goal - s)       # unsatisfied goal atoms (not admissible in general)
zero = lambda s, goal: 0                         # A* with h = 0 is uniform-cost search

# Sussman anomaly: C on A; A, B on the table. Goal: A on B, B on C.
B3 = "ABC"
init = frozenset({"on(C,A)", "on(A,table)", "on(B,table)", "clear(C)", "clear(B)"})
goal = frozenset({"on(A,B)", "on(B,C)"})
acts = blocks_actions(B3)
print(len(acts), "ground actions")
for name, search in [("BFS", lambda: bfs(init, goal, acts)),
                     ("A*, h=0", lambda: astar(init, goal, acts, zero)),
                     ("A*, goal count", lambda: astar(init, goal, acts, goal_count))]:
    plan, expanded, generated = search()
    print(f"{name:15s} plan {plan}  expanded {expanded}  generated {generated}")

# A larger problem: reverse a tower of 6 blocks.
B6 = "ABCDEF"
tower = [f"on({B6[0]},table)"] + [f"on({B6[i]},{B6[i-1]})" for i in range(1, 6)]
init6 = frozenset(tower + [f"clear({B6[-1]})"])
goal6 = frozenset([f"on({B6[i-1]},{B6[i]})" for i in range(1, 6)])
acts6 = blocks_actions(B6)
for name, search in [("BFS", lambda: bfs(init6, goal6, acts6)),
                     ("A*, goal count", lambda: astar(init6, goal6, acts6, goal_count))]:
    plan, expanded, generated = search()
    print(f"6 blocks {name:15s} length {len(plan)}  expanded {expanded}  generated {generated}")
```

```text
18 ground actions
BFS             plan ['move(C,A,table)', 'move(B,table,C)', 'move(A,table,B)']  expanded 13  generated 13
A*, h=0         plan ['move(C,A,table)', 'move(B,table,C)', 'move(A,table,B)']  expanded 13  generated 13
A*, goal count  plan ['move(C,A,table)', 'move(B,table,C)', 'move(A,table,B)']  expanded 7  generated 11
6 blocks BFS             length 6  expanded 143  generated 565
6 blocks A*, goal count  length 6  expanded 7  generated 11
```

On three blocks the uninformed searches expand the entire space of $13$ states before reaching the goal; goal counting halves that. On six blocks the difference is a factor of twenty in expansions, and it would grow quickly with more blocks. The goal-count heuristic is not admissible in general (one action can achieve several goal atoms, in some domains), so A* with it is not guaranteed to find shortest plans, though here it does. The real point is the shape of the code: a few dozen lines that, given a correct domain model, return plans that are *guaranteed valid* — every precondition checked, every effect applied.

### Why subgoals interact

The obvious way to plan for a conjunctive goal is to achieve its parts one at a time. The blocks world contains the classic counterexample.

::: example The Sussman anomaly {#ex-sussman}
Start: C on A; A and B on the table. Goal: $\textsf{on}(A, B)\wedge\textsf{on}(B, C)$. Show that achieving either subgoal first, by its own shortest plan, and then the other without undoing it, fails.
::: solution
*$\textsf{on}(A, B)$ first:* move C to the table, then A onto B. Now B is under A, so B cannot be moved onto C without first removing A, which undoes the first subgoal. *$\textsf{on}(B, C)$ first:* move B onto C. Now C, still on A, is under B, so A is buried beneath C and B and cannot be moved onto B without dismantling the tower. Either order forces the planner to undo achieved goals. The optimal plan, found by search above, interleaves: C to the table (progress towards neither goal on its face), B onto C, A onto B. Sussman (1975) used the example to show that planners that treat subgoals as independent — "linear" planners — are incomplete.
:::
:::

The anomaly is not a curiosity of toy blocks. Every real task with shared resources has it: a refactoring that must change an interface and all its callers in a particular order, a schedule in which booking the first flight determines which hotels remain. It is the reason why decomposing a task into subgoals, the main technique of language-model planning, needs a fallback when subgoals turn out not to be independent.

## How language-model agents plan {#sec-llm-planning}

A language-model agent rarely has a formal domain model. It has a task in natural language, tools whose effects it knows only from their descriptions, and an environment that may be partly unknown. Its plans are therefore text — numbered lists of steps, a task tree, a to-do file — produced by the model and interpreted by the model. Three patterns are common.

### Plan, execute, replan

::: definition Plan-and-execute with replanning {#def-plan-execute}
A **planner** call produces a plan $\pi = (\sigma_1, \dots, \sigma_n)$ of natural-language steps from the task and the current context. An **executor** — an agent loop ([[agents/agent-loops#def-loop]]), often with a cheaper model or a narrower tool set — carries out the steps in order, each until it reports success or failure. After each step, or only after a failure, a **replanner** call receives the task, the original plan and the results so far, and returns either a revised plan for the remaining work or a final answer.
:::

Separating planning from execution has three advantages. The plan is a commitment that keeps a long run on course, and it is written into the context where every later step can see it. The executor's context can be limited to one step and its inputs, which keeps it short ([[agents/memory-context]]). And the plan is a natural point of human oversight: a person can read and correct it before anything irreversible happens. The disadvantage is that a plan written before the first observation is often wrong, which is why replanning is part of the definition. Wang et al. (2023) showed that even in a single response, asking a model to "devise a plan and then carry it out" (plan-and-solve prompting) improved accuracy on reasoning problems over plain chain-of-thought; agent frameworks generalised the idea to tool use with an explicit replanning step.

::: example How often will it replan? {#ex-replan}
A plan has $8$ steps. Each execution of a step fails with probability $0.15$, independently; after each failure the agent replans the remaining work (at a cost of one planner call) and retries the step. What is the expected number of replanning calls? What if, instead of replanning only on failure, the agent replans after every step?
::: solution
Each step needs a geometric number of attempts with success probability $0.85$, mean $1/0.85 = 1.176$, so $0.176$ failures — and replans — per step on average, and $8\cdot0.15/0.85 = 1.41$ replans in total. Replanning after every step costs $8$ planner calls (plus those after failures, if a failed step is followed by both), more than five times as many. Replanning on every step adapts faster to new information; replanning on failure is cheaper. Many agents do the latter, with an option for the executor to request a replan when it learns something that invalidates the plan.
:::
:::

### Hierarchical decomposition

Long tasks are decomposed recursively: a goal into subgoals, each subgoal into steps, until each piece is small enough to execute directly. Least-to-most prompting (Zhou et al., 2023) decomposed problems into simpler subproblems solved in sequence, each answer feeding the next; HuggingGPT (Shen et al., 2023) had a model split a request into subtasks and assign each to a specialised model; and orchestrator–worker systems ([[agents/multi-agent-systems]]) hand subgoals to separate agents. Hierarchical task networks (HTN) are the classical counterpart: a library of methods says how each compound task decomposes. The arithmetic of why decomposition helps, when it is valid, is simple.

::: proposition Decomposition shrinks search {#prop-decompose}
Suppose a planning problem with branching factor $b\ge2$ has a shortest solution of length $d$, and that breadth-first search expands on the order of $b^d$ states. If the problem splits into $k$ subproblems, solved one after another, each with a solution of length $d/k$ and the same branching factor, and if the solutions of the subproblems concatenate into a solution of the whole, then solving the subproblems costs on the order of $k\,b^{d/k}$ expansions. The saving is the factor $b^{d(1 - 1/k)}/k$, which for $k\ge2$ is at least $b^{d/2}/k$.
:::

::: proof
Each subproblem costs about $b^{d/k}$ expansions and there are $k$ of them, so the total is $k\,b^{d/k}$. The ratio is $b^d/(k\,b^{d/k}) = b^{d(1 - 1/k)}/k$, and for $k\ge2$ the exponent satisfies $d(1 - 1/k)\ge d/2$, so the ratio is at least $b^{d/2}/k$.
:::

::: widget plot
f: x*log(b)/log(10); log(k)/log(10) + (x/k)*log(b)/log(10)
x: 1, 30
y: 0, 30
sliders: b=10:2:20:1; k=4:2:10:1
labels: whole problem, $\log_{10} b^d$; $k$ subproblems, $\log_{10}(k\,b^{d/k})$
points: 12,12; 12,3.602
caption: The number of states expanded, on a logarithmic scale (powers of ten), against the solution length $d$, for search over the whole problem and over $k$ serialisable subproblems ([[#prop-decompose]]). At $b = 10$, $d = 12$ and $k = 4$ the marked points are $10^{12}$ and $4\cdot10^3$. The gap widens linearly in $d$ on this scale, that is exponentially in reality — provided the subproblems really are independent.
:::

The saving is enormous: with $b = 10$ and $d = 12$, $10^{12}$ against $4\cdot10^3$ for $k = 4$. Everything rests on the condition that the parts concatenate into a whole — that subgoals are **serialisable** — which is exactly what the Sussman anomaly violates. When they are not, a decomposition-based planner must detect the conflict (a later step needs to undo an earlier subgoal), and either reorder the subgoals, merge them, or fall back to planning over the combined problem. For language-model agents, that detection usually happens at execution time, when a step fails, which is one more reason replanning is part of [[#def-plan-execute]].

### Planning with a formal planner: LLM+P

If language models are unreliable planners but good translators, and classical planners are reliable but need formal input, the two can be combined.

::: definition LLM+P {#def-llmp}
In **LLM+P** (Liu et al., 2023), a language model is given a PDDL domain file written by a person, an example of a natural-language problem with its PDDL problem file, and a new problem in natural language. It writes a PDDL problem file for the new problem; a classical planner (Fast Downward in the paper) searches for a plan; and the model translates the plan back into natural language.
:::

Liu et al. reported that on a set of standard planning domains LLM+P produced correct plans for most problems, while the same language model planning directly in natural language failed on most of them. The method's strength and weakness are the same thing: the planner guarantees that a returned plan is valid *for the PDDL model*. If the model mistranslates the problem — a missing atom in the initial state, a wrong goal — the plan is valid for the wrong problem. And it requires a domain file, which exists for logistics and robotics benchmarks but not for "migrate this code base". Later work asked models to write the domain files as well (Guan et al., 2023), with people correcting them, and more generally to use external verifiers rather than solvers: the **LLM-Modulo** framework (Kambhampati et al., 2024) proposes that models generate candidate plans and a bank of external critics — validators, simulators, people — accept or reject them, with rejections fed back to the model.

::: example Verifying a proposed plan {#ex-validate}
A model proposes, for the Sussman anomaly, the plan $\textsf{move}(B, \text{table}, C)$, $\textsf{move}(C, A, \text{table})$, $\textsf{move}(A, \text{table}, B)$. Validate it by progression and report the first failure as a plan validator would.
::: solution
State $s_0$: $\textsf{on}(C, A)$, $\textsf{on}(A, \text{table})$, $\textsf{on}(B, \text{table})$, $\textsf{clear}(C)$, $\textsf{clear}(B)$. Step 1, $\textsf{move}(B, \text{table}, C)$: preconditions $\textsf{on}(B, \text{table})$, $\textsf{clear}(B)$, $\textsf{clear}(C)$ hold; result adds $\textsf{on}(B, C)$, deletes $\textsf{on}(B, \text{table})$ and $\textsf{clear}(C)$. Step 2, $\textsf{move}(C, A, \text{table})$: precondition $\textsf{clear}(C)$ fails — B is now on C. The validator reports: "step 2: precondition clear(C) false (B is on C)". That message, returned to the model, is precisely the kind of detection signal that [[agents/agent-loops#prop-retry]] shows to be decisive. The model's plan contained the right three moves in the wrong order, a typical error.
:::
:::

## How well do language models plan? {#sec-evidence}

Whether language models can plan is a question on which careful researchers have disagreed, and the honest summary is that the answer depends on what is meant by planning, on which models, and on when the measurement was made.

**The sceptical evidence.** Valmeekam et al. (2023) built PlanBench, a set of problems in International Planning Competition domains including the blocks world, given to models in natural language, with plans checked by an automatic validator. They reported that models of the time, used autonomously, rarely produced valid plans: the best model (GPT-4) averaged about $12\%$ success across their domains. Two controls made the result sharper. In "Mystery Blocksworld", the same problems were given with action and predicate names replaced by unrelated words, preserving the logical structure exactly; success collapsed further, suggesting that performance relied on familiarity with the standard domain rather than on reasoning over the stated rules. And when a model's plan was checked by an external validator and the errors fed back ("backprompting"), success improved substantially — the result that motivated LLM-Modulo. The authors' interpretation is that language models retrieve and adapt plan-like text rather than plan, and are best used as generators of candidates for sound verifiers.

**The more optimistic evidence.** Models improved. When Valmeekam and colleagues evaluated an early reasoning model, OpenAI's o1-preview, on the same benchmark in 2024, they reported a large jump on the standard blocks-world problems, with near-perfect accuracy on the original test set, alongside much weaker performance on obfuscated domains and on longer problems, and high cost per problem. Agents in practice also plan in settings very different from PlanBench: with tools, partial observability and the ability to try, observe and replan, in which an imperfect plan that is corrected by feedback can succeed where a one-shot plan fails. Benchmarks of real agent tasks ([[agents/code-agents]], [[agents/computer-use]]) measure this combination, and success on them rose steadily through 2024 and 2025.

**What both sides agree on.** One-shot plans produced by a model and executed blindly are unreliable for problems with many interacting steps; plans checked by a sound validator, a simulator or the environment are much better; and obfuscation tests are a useful control against mistaking familiarity for reasoning. As of 2026 the question of how much genuine search and constraint tracking reasoning models perform internally ([[reasoning/search]]) is open. The practical conclusion does not depend on how it is resolved: plan with feedback, and verify wherever a verifier exists.

::: warning A plausible plan is not a valid plan
Text plans read well. A numbered list of eight sensible-looking steps can contain an action whose precondition is never established, two steps in an impossible order (as in [[#ex-validate]]), or a step that silently undoes an earlier one. Fluency is not evidence of validity. Where the domain can be checked — a dependency graph, a schedule, a test suite, a dry run — check the plan before executing it, and treat each failed step as information about the plan, not only about the step.
:::

::: quiz
An agent must produce a weekly rota for $12$ staff satisfying $30$ hard constraints (availability, maximum hours, required skills per shift). Which design is most likely to produce valid rotas?
- [ ] Ask the model for a rota in one response, with the constraints listed in the prompt.
- [ ] Ask the model for a rota, then ask it whether all constraints are satisfied, and accept the rota if it says yes.
- [x] Have the model translate the requirements into a formal constraint model that a solver checks and solves, and show the person the model's translation of each constraint.
- [ ] Generate ten rotas and choose the one the model rates most highly.
::: solution
Thirty interacting hard constraints are a classical constraint-satisfaction problem, which solvers handle exactly; the model's strength is translation, as in LLM+P ([[#def-llmp]]). The person reviews the translation, the failure mode that the solver cannot catch. Self-assessment without an external check is unreliable ([[agents/agent-loops#sec-reflexion]]), and model ratings do not verify constraints.
:::
:::

::: history
Planning as a subject begins with Newell and Simon's General Problem Solver (1959), whose means–ends analysis reduced differences between the current state and the goal. Fikes and Nilsson's STRIPS (1971) introduced the representation of actions by preconditions, add lists and delete lists for the Shakey robot; Sussman's thesis (1975) exhibited the anomaly that defeated linear planners; Sacerdoti's NOAH (1975) and later systems planned with partially ordered steps and hierarchical decomposition, the ancestry of hierarchical task networks. Bylander (1994) proved that STRIPS plan existence is PSPACE-complete. McDermott and colleagues defined PDDL for the 1998 International Planning Competition; Blum and Furst's Graphplan (1995), Kautz and Selman's planning as satisfiability (1992, 1996), and heuristic search planners such as HSP (Bonet and Geffner, 2001), FF (Hoffmann and Nebel, 2001) and Fast Downward (Helmert, 2006) made classical planning practical for large problems. With language models, Huang et al. (2022) prompted models for step-by-step household plans, Zhou et al. (2023) introduced least-to-most decomposition, Wang et al. (2023) plan-and-solve prompting, Yao et al. (2023) tree-of-thoughts search over intermediate steps, and Liu et al. (2023) LLM+P. Valmeekam et al. (2023) and Kambhampati et al. (2024) argued, with PlanBench and LLM-Modulo, that models should generate candidates for external verifiers; their 2024 follow-up measured the gains, and remaining limits, of reasoning models.
:::

::: summary
- A STRIPS problem has atoms, actions with preconditions, add and delete lists, an initial state and a goal; a plan is a sequence of applicable actions whose final state satisfies the goal. PDDL writes such problems in a standard syntax.
- Planning is search over an exponentially large state graph (PSPACE-complete in general); heuristics such as goal counting or the delete relaxation make it practical, and a planner given a correct model returns only valid plans.
- Subgoals can interact: the Sussman anomaly shows that achieving conjunctive goals one at a time can fail, so decomposition needs a fallback.
- Language-model agents plan in text: plan-and-execute with replanning, hierarchical decomposition, and hybrids such as LLM+P that translate problems for a classical planner.
- Decomposition into $k$ serialisable subproblems reduces search from about $b^d$ to $k\,b^{d/k}$ — when the subproblems really are independent.
- Evidence: models of 2023 rarely produced valid one-shot plans on formal benchmarks, especially with obfuscated names; feedback from validators helped greatly; reasoning models improved results in 2024 without closing the gap on harder variants. Plan with feedback and verify wherever possible.
:::

## Exercises

::: exercise Applying an action {level=1}
In the state $\{\textsf{on}(A, \text{table}), \textsf{on}(B, A), \textsf{on}(C, \text{table}), \textsf{clear}(B), \textsf{clear}(C)\}$, is $\textsf{move}(B, A, C)$ applicable? If so, compute the resulting state by [[#eq-progression]].
::: solution
Preconditions $\textsf{on}(B, A)$, $\textsf{clear}(B)$, $\textsf{clear}(C)$ all hold, so it is applicable. Delete $\textsf{on}(B, A)$ and $\textsf{clear}(C)$; add $\textsf{on}(B, C)$ and $\textsf{clear}(A)$. Result: $\{\textsf{on}(A, \text{table}), \textsf{on}(C, \text{table}), \textsf{on}(B, C), \textsf{clear}(A), \textsf{clear}(B)\}$.
:::
:::

::: exercise Ground actions for four blocks {level=1 check="48"}
How many ground $\textsf{move}(b, x, y)$ actions does the blocks world with $4$ blocks have?
::: solution
For each block $b$ (four choices), $x$ and $y$ are distinct elements of the other three blocks and the table, four places: $4\cdot3 = 12$ ordered pairs. Total $4\cdot12 = 48$. With $n$ blocks the count is $n\cdot n(n - 1) = n^2(n - 1)$; for $n = 3$, $18$, as in the listing.
:::
:::

::: exercise Expected replans {level=1 check="1.41"}
In [[#ex-replan]], compute the expected number of replanning calls for an $8$-step plan with per-step failure probability $0.15$. Give two decimal places.
::: solution
$8\cdot0.15/0.85 = 1.4118$, so $1.41$.
:::
:::

::: exercise Counting states {level=2 check="73"}
Count the states of the four-block world. (Hint: a state is a set of non-empty towers, each an ordered sequence of blocks. Count the ways to arrange $n$ labelled blocks into $k$ ordered towers, regardless of the order of the towers.)
::: solution
The number of ways to partition $n$ labelled items into $k$ non-empty ordered lists, the lists unordered among themselves, is the Lah number $L(n, k) = \binom{n-1}{k-1}\frac{n!}{k!}$. For $n = 4$: $L(4, 1) = 24$, $L(4, 2) = 3\cdot12 = 36$, $L(4, 3) = 3\cdot4 = 12$, $L(4, 4) = 1$. Total $24 + 36 + 12 + 1 = 73$. For $n = 3$: $6 + 6 + 1 = 13$, as in the figure.
:::
:::

::: exercise Inadmissible goal count {level=2}
Construct a STRIPS domain (not the blocks world) and a state in which the goal-count heuristic overestimates the true cost to the goal, and explain the consequence for A*.
::: solution
Take atoms $p, q$, initial state $\varnothing$, goal $\{p, q\}$ and a single action $a$ with empty precondition, $\operatorname{add}(a) = \{p, q\}$. The goal count of the initial state is $2$, but one action reaches the goal: an overestimate, so the heuristic is not admissible. With inadmissible heuristics A* may return a longer plan than optimal, because it can pop the goal from the queue through a costlier path before exploring a cheaper path whose $f$-value was overestimated. In the blocks world a single move achieves at most one $\textsf{on}$ atom, so on goals that consist of $\textsf{on}$ atoms the goal count is admissible there, which is why the listing found optimal plans.
:::
:::

::: exercise The saving from decomposition {level=2 check="250000000"}
With branching factor $b = 10$ and solution length $d = 12$, by what factor does splitting into $k = 4$ serialisable subproblems of length $3$ reduce the number of expansions, in the model of [[#prop-decompose]]?
::: solution
$b^d/(k\,b^{d/k}) = 10^{12}/(4\cdot10^3) = 2.5\cdot10^{8}$, a factor of $250{,}000{,}000$.
:::
:::

::: exercise Mystery domains {level=3}
Explain what an obfuscated domain such as Mystery Blocksworld controls for, what it does not, and why a drop in accuracy on it is consistent with two different hypotheses. Design an experiment that would distinguish them.
::: solution
Renaming actions and predicates preserves the problem's logical structure, so a system that plans purely from the stated rules should be unaffected; a drop in accuracy shows that performance depended on the names — on knowledge about blocks and stacking brought from pretraining. That is consistent with (1) the model not reasoning from the rules at all, only retrieving familiar plan patterns, and (2) the model reasoning from the rules but less reliably when it cannot use world knowledge to check itself, as people also do worse on abstract versions of logic problems than on familiar ones (the Wason selection task). To distinguish them, vary problem size and structure within the obfuscated domain: under (1) accuracy should be near chance even on very short problems, while under (2) it should be high on short problems and degrade with length, and providing a validator's feedback should help much more under (2). One could also test transfer: teach a new rule in the obfuscated domain and check whether plans respect it.
:::
:::

::: exercise A plan validator {level=3}
Write a function `validate(plan, init, goal, acts)` for the STRIPS representation of the listing that returns either "valid" or the index and missing preconditions of the first inapplicable step (or the missing goal atoms). Apply it to the plan of [[#ex-validate]] and to the plan found by search.
::: solution
```python
def validate(plan, init, goal, acts):
    table = {name: (pre, add, dele) for name, pre, add, dele in acts}
    s = init
    for i, name in enumerate(plan, 1):
        if name not in table:
            return f"step {i}: unknown action {name}"
        pre, add, dele = table[name]
        if not pre <= s:
            return f"step {i}: {name} has false preconditions {sorted(pre - s)}"
        s = (s - dele) | add
    if not goal <= s:
        return f"goal atoms not reached: {sorted(goal - s)}"
    return "valid"

bad = ["move(B,table,C)", "move(C,A,table)", "move(A,table,B)"]
good = ["move(C,A,table)", "move(B,table,C)", "move(A,table,B)"]
print(validate(bad, init, goal, acts))
print(validate(good, init, goal, acts))
```

```text
step 2: move(C,A,table) has false preconditions ['clear(C)']
valid
```

The message names the step and the failed atom, which is what a model needs in order to repair the plan. A validator like this is the cheapest and most reliable component of a hybrid planner: it is a few lines long, it is exact, and its output is a detection signal in the sense of [[agents/agent-loops#prop-retry]].
:::
:::
