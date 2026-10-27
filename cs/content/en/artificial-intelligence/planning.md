A logistics company must deliver two hundred parcels with twelve trucks and three aircraft; a space probe must point its instruments, warm up a camera and send data within a window of visibility; a robot in a warehouse must fetch, carry and stack. Each problem is a search for a sequence of actions, as in [[artificial-intelligence/search]], but with two differences that matter. The state space is astronomically large — every combination of parcel locations is a state — and it is described not by a successor function written for the occasion but by a general **action language**: each action is a schema with preconditions and effects, stated once and applied to whatever objects are present. A **planner** takes such a description and a goal and finds a plan, without any problem-specific code.

This structure is what classical planning exploits. Because states are *factored* into atoms such as $\mathit{At}(\mathit{Truck}_1, \mathit{Leeds})$, the planner can look inside actions and goals: it can search backwards from the goal, reason about which goals interact, and — the key to modern planners — compute heuristics automatically by solving a **relaxed** problem in which actions have no negative effects. This chapter introduces the STRIPS representation, forward and backward search, the delete relaxation and its heuristics $h^+$, $h_{\max}$ and $h_{\mathrm{add}}$, and **planning graphs**, which give the GraphPlan algorithm and a stronger admissible heuristic. We also prove that plan existence is decidable but $\mathsf{PSPACE}$-complete, which explains why no planner can be fast on every problem.

## Representing planning problems

::: definition STRIPS planning problem {#def-strips}
A **STRIPS planning problem** consists of a finite set $F$ of ground **atoms** (facts such as $\mathit{On}(A, B)$); an **initial state** $I \subseteq F$; a **goal** $G \subseteq F$; and a finite set of **actions**, each with three subsets of $F$: its **preconditions** $\mathrm{pre}(a)$, its **add list** $\mathrm{add}(a)$ and its **delete list** $\mathrm{del}(a)$. A **state** is a set $s \subseteq F$ of atoms — those that are true; all others are false (the **closed-world assumption**). Action $a$ is **applicable** in $s$ if $\mathrm{pre}(a) \subseteq s$, and then
$$
\mathrm{Result}(s, a) = (s \setminus \mathrm{del}(a)) \cup \mathrm{add}(a).
$$
A **plan** is a sequence of actions $a_1, \dots, a_k$, each applicable in the state produced by its predecessors from $I$, such that the final state $s_k$ satisfies $G \subseteq s_k$. Unless stated otherwise every action costs $1$, and an **optimal** plan is a shortest one.
:::

Actions are written as **schemas** with variables, instantiated with the problem's objects. In the **blocks world**, blocks sit on a table or on each other, and a block can be moved if nothing is on it:

```text
Move(b, x, y)            ▷ move block b from x onto block y
  pre:  On(b, x), Clear(b), Clear(y)
  add:  On(b, y), Clear(x)
  del:  On(b, x), Clear(y)
MoveToTable(b, x)        ▷ move block b from block x onto the table
  pre:  On(b, x), Clear(b)
  add:  On(b, Table), Clear(x)
  del:  On(b, x)
```

(The table is always clear, so it gets no $\mathit{Clear}$ atom; a third schema moves a block from the table onto a block.) This is the core of the **Planning Domain Definition Language** (PDDL), the standard input language of planners, which adds types, negative preconditions, conditional effects, numeric quantities, durations and costs. The STRIPS assumption — that an action changes exactly the atoms in its add and delete lists, and nothing else — solves the **frame problem** of logical formalisms, where one would otherwise need axioms saying what each action does *not* change.

::: example The Sussman anomaly {#ex-sussman}
Three blocks: initially $C$ is on $A$, and $A$ and $B$ are on the table. The goal is $\mathit{On}(A, B) \land \mathit{On}(B, C)$. Formulate the problem in STRIPS and find an optimal plan by breadth-first search over states. Why is it called an anomaly?
::: solution
With blocks $A, B, C$ the ground atoms are $\mathit{On}(b, x)$ for $x$ another block or the table, and $\mathit{Clear}(b)$: $3 \cdot 3 + 3 = 12$ atoms. Grounding the move schemas gives $18$ actions (each block can move from one of three places to one of the other two). The initial state is $I = \{\mathit{On}(C, A), \mathit{On}(A, \mathit{Table}), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(C), \mathit{Clear}(B)\}$ and $G = \{\mathit{On}(A, B), \mathit{On}(B, C)\}$.

```python
import heapq, itertools
from collections import namedtuple

Action = namedtuple("Action", "name pre add delete")

def blocks_world(blocks):
    """STRIPS actions for moving one clear block onto the table or onto another clear block."""
    acts = []
    for b in blocks:
        for x in blocks + ["Table"]:
            if x == b: continue
            for y in blocks + ["Table"]:
                if y in (b, x): continue
                pre = {f"On({b},{x})", f"Clear({b})"} | ({f"Clear({y})"} if y != "Table" else set())
                add = {f"On({b},{y})"} | ({f"Clear({x})"} if x != "Table" else set())
                dele = {f"On({b},{x})"} | ({f"Clear({y})"} if y != "Table" else set())
                acts.append(Action(f"Move({b},{x},{y})", frozenset(pre), frozenset(add), frozenset(dele)))
    return acts

def successors(state, actions):
    for a in actions:
        if a.pre <= state:
            yield a, (state - a.delete) | a.add
```

Breadth-first search (the `search` function below with no heuristic) expands $12$ states and returns

```console
BFS           expanded  12: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
```

— put $C$ on the table, $B$ on $C$, then $A$ on $B$: three moves. The "anomaly", noticed by Gerald Sussman in the early 1970s, is that this short plan cannot be found by achieving the two goals *one after the other*, as early planners did. Achieving $\mathit{On}(A, B)$ first (move $C$ away, put $A$ on $B$) leaves $A$ on top of $B$, and $\mathit{On}(B, C)$ then requires undoing it; achieving $\mathit{On}(B, C)$ first buries $A$ under $C$, $B$. The subgoals **interact**, and a planner must interleave the steps for them.
:::
:::

::: widget graph
nodes: A_B_C@0,0; A_BC@0,1.5; ABC@0,3; BA_C@-1.3,0.75; CBA@-2.6,1.5; AB_C@-1.3,-0.75; CAB@-2.6,-1.5; AC_B@0,-1.5; BAC@0,-3; A_CB@1.3,-0.75; ACB@2.6,-1.5; B_CA@1.3,0.75; BCA@2.6,1.5
edges: ABC-A_BC; AB_C-AC_B; AB_C-A_B_C; AB_C-CAB; ACB-A_CB; AC_B-A_B_C; AC_B-BAC; A_BC-A_B_C; A_BC-BA_C; A_B_C-A_CB; A_B_C-BA_C; A_B_C-B_CA; A_CB-B_CA; BA_C-CBA; BCA-B_CA
algorithm: bfs
start: B_CA
caption: The whole state space of the three-block world: $13$ states, each named by its towers read from top to bottom and separated by underscores ($\mathit{B\_CA}$ is the Sussman start, $B$ alone and $C$ on $A$; $\mathit{ABC}$ is the goal tower). Every move is reversible, so the graph is undirected. Step through breadth-first search from the start and confirm that the goal is at distance $3$. The state space of $n$ blocks grows faster than $n!$ ($501$ states for $5$ blocks, $37{,}633$ for $7$), which is why planners need heuristics.
:::

### How hard is planning?

Planning problems are search problems with $2^{\lvert F\rvert}$ potential states, described in space polynomial in $\lvert F\rvert$ and the number of actions. Plans can be exponentially long: the Towers of Hanoi with $n$ discs, a STRIPS problem with $O(n^2)$ atoms, has a shortest plan of $2^n - 1$ moves.

::: theorem Complexity of STRIPS planning {#thm-planning-pspace}
Deciding whether a STRIPS planning problem has a plan is $\mathsf{PSPACE}$-complete (Bylander, 1994).
:::

::: proof
*Membership.* If a plan exists, one exists that visits no state twice (cut out the loop between two visits), so one of length less than $2^{\lvert F\rvert}$. A nondeterministic algorithm guesses the plan one action at a time, keeping only the current state ($\lvert F\rvert$ bits) and a step counter ($\lvert F\rvert$ bits); it checks applicability, applies the action, and accepts when the goal holds, rejecting if the counter overflows. This uses polynomial space, so plan existence is in $\mathsf{NPSPACE}$, which equals $\mathsf{PSPACE}$ by Savitch's theorem ([[complexity/space-complexity#cor-pspace-npspace]]).

*Hardness* (outline, not proved here). Given a Turing machine $M$ that uses polynomial space $p(n)$ on input $w$, build atoms for "cell $i$ contains symbol $\sigma$", "the head is at cell $i$" and "the machine is in state $q$", one action for each transition and head position, the initial configuration as $I$, and "the machine is in its accepting state" as $G$. A plan exists if and only if $M$ accepts $w$. Bylander's paper also maps out which syntactic restrictions (for instance, actions with one precondition and positive effects only) make the problem easier.
:::

So we cannot expect polynomial-time planners, and even *bounded* plan existence — is there a plan of length at most $k$, for $k$ written in unary — is $\mathsf{NP}$-complete. Practical planners rely on heuristics, which is where the structure of STRIPS pays off.

## State-space search

**Forward (progression) search** is search from $I$ with $\mathrm{Result}$ as the transition function and $G \subseteq s$ as the goal test; any algorithm of [[artificial-intelligence/search]] applies. The branching factor is the number of applicable ground actions, which in real domains can be in the thousands — most of them irrelevant to the goal. Without a heuristic, forward search is hopeless on large problems.

**Backward (regression) search** starts from the goal and works towards the initial state, considering only **relevant** actions — those that achieve part of the current subgoal — which typically gives a much smaller branching factor.

::: definition Regression {#def-regression}
Let $g$ be a set of atoms (a subgoal) and $a$ an action that is **relevant** for $g$ — $\mathrm{add}(a) \cap g \ne \emptyset$ — and **consistent** with it — $\mathrm{del}(a) \cap g = \emptyset$. The **regression** of $g$ through $a$ is
$$
\mathrm{Regress}(g, a) = (g \setminus \mathrm{add}(a)) \cup \mathrm{pre}(a).
$$
Backward search starts from $G$, regresses through relevant consistent actions, and stops at a subgoal $g$ with $g \subseteq I$.
:::

::: theorem Regression is sound and complete {#thm-regression}
(1) If $s \supseteq \mathrm{Regress}(g, a)$, then $a$ is applicable in $s$ and $\mathrm{Result}(s, a) \supseteq g$. (2) Consequently, if backward search finds $G = g_0, g_1, \dots, g_k$ with $g_{i} = \mathrm{Regress}(g_{i-1}, a_i)$ and $g_k \subseteq I$, then $a_k, a_{k-1}, \dots, a_1$ is a plan. (3) Conversely, if $a_1, \dots, a_k$ is a plan in which every action is relevant to the subgoal it is regressed from, backward search can find it.
:::

::: proof
(1) $\mathrm{pre}(a) \subseteq \mathrm{Regress}(g, a) \subseteq s$, so $a$ is applicable. Let $p \in g$. If $p \in \mathrm{add}(a)$, then $p \in \mathrm{Result}(s, a)$. Otherwise $p \in g \setminus \mathrm{add}(a) \subseteq s$, and $p \notin \mathrm{del}(a)$ by consistency, so $p$ survives: $p \in (s \setminus \mathrm{del}(a))$. (2) Let $s_0 = I \supseteq g_k$ and apply $a_k, \dots, a_1$ in turn. By (1) and induction, after applying $a_k, \dots, a_{i}$ the state contains $g_{i-1}$; at the end it contains $g_0 = G$. (3) Let $s_0 = I, s_1, \dots, s_k$ be the states of the plan and regress the goal through $a_k, a_{k-1}, \dots$: the subgoal $g_j$ obtained after regressing through $a_k, \dots, a_{k-j+1}$ satisfies $g_j \subseteq s_{k-j}$, by induction — $\mathrm{pre}(a_i) \subseteq s_{i-1}$, and an atom of $g_{j-1} \subseteq s_{k-j+1}$ not added by $a_{k-j+1}$ was already in $s_{k-j}$. Consistency holds because an atom deleted by $a_i$ is not in $s_i$, whereas the subgoal regressed through $a_i$ is a subset of $s_i$. At the end $g_k \subseteq s_0 = I$.
:::

::: example Backward search on the Sussman anomaly {#ex-regression}
Regress the goal $G = \{\mathit{On}(A, B), \mathit{On}(B, C)\}$ of [[#ex-sussman]] through the last two actions of the optimal plan, and check that the result is satisfied after the first action.
::: solution
The last action is $\mathit{Move}(A, \mathit{Table}, B)$ (pre $\mathit{On}(A, \mathit{Table})$, $\mathit{Clear}(A)$, $\mathit{Clear}(B)$; add $\mathit{On}(A, B)$; delete $\mathit{On}(A, \mathit{Table})$, $\mathit{Clear}(B)$). It is relevant (adds $\mathit{On}(A, B)$) and consistent (deletes nothing in $G$):
$$
g_1 = \{\mathit{On}(B, C), \mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}.
$$
The previous action is $\mathit{Move}(B, \mathit{Table}, C)$ (pre $\mathit{On}(B, \mathit{Table})$, $\mathit{Clear}(B)$, $\mathit{Clear}(C)$; add $\mathit{On}(B, C)$; delete $\mathit{On}(B, \mathit{Table})$, $\mathit{Clear}(C)$), relevant for $\mathit{On}(B, C)$ and consistent with $g_1$:
$$
g_2 = \{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(C)\}.
$$
After the first action $\mathit{Move}(C, A, \mathit{Table})$ the state is $\{\mathit{On}(C, \mathit{Table}), \mathit{On}(A, \mathit{Table}), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B), \mathit{Clear}(C)\}$, which contains $g_2$; regressing once more through $\mathit{Move}(C, A, \mathit{Table})$ gives $\{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(B), \mathit{On}(B, \mathit{Table}), \mathit{On}(C, A), \mathit{Clear}(C)\} \subseteq I$, and backward search stops. Notice that at each step only actions that add a goal atom were considered — two or three of the $18$ — while forward search from $I$ must consider every applicable action.
:::
:::

The drawback of regression is that subgoals are *sets of states*, and many subgoals are impossible — $\{\mathit{On}(A, B), \mathit{On}(B, A)\}$, say — but a backward search cannot easily tell. Heuristics have proved easier to compute for forward search, and most modern planners search forwards.

::: quiz
In the blocks world, regress the subgoal $g = \{\mathit{On}(A, B), \mathit{Clear}(C)\}$ through $\mathit{Move}(A, \mathit{Table}, B)$, which has preconditions $\mathit{On}(A, \mathit{Table})$, $\mathit{Clear}(A)$, $\mathit{Clear}(B)$, adds $\mathit{On}(A, B)$ and deletes $\mathit{On}(A, \mathit{Table})$, $\mathit{Clear}(B)$. What is the result?

- [ ] $\{\mathit{On}(A, B), \mathit{Clear}(C), \mathit{On}(A, \mathit{Table})\}$
- [x] $\{\mathit{Clear}(C), \mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$
- [ ] $\{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$
- [ ] The action is not relevant, so regression is undefined.
::: solution
The action is relevant (it adds $\mathit{On}(A, B) \in g$) and consistent (it deletes neither atom of $g$). By [[#def-regression]], remove what it adds and add its preconditions: $(g \setminus \{\mathit{On}(A, B)\}) \cup \{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$. The atom $\mathit{Clear}(C)$, which the action does not touch, must already hold before it.
:::
:::

## Heuristics from the delete relaxation

The most successful idea in classical planning is to estimate the distance to the goal by solving a simpler planning problem automatically derived from the real one.

::: definition Delete relaxation {#def-delete-relaxation}
The **delete relaxation** of a STRIPS problem replaces each action $a$ by $a^+$ with the same preconditions and add list and an empty delete list. A plan for the relaxed problem is a **relaxed plan**; $h^+(s)$ is the length of a shortest relaxed plan from $s$ ($\infty$ if none exists).
:::

In the relaxed problem, atoms once true stay true: states only grow. Relaxed planning is much easier — whether *some* relaxed plan exists can be decided in polynomial time, by applying all applicable actions until nothing changes — but finding a *shortest* one is still $\mathsf{NP}$-hard (Bylander, 1994). Planners therefore approximate $h^+$. For each atom $p$, define its **cost** from $s$ by the fixed-point equations
$$
\mathrm{cost}_s(p) = \begin{cases} 0 & p \in s,\\ \min_{a : p \in \mathrm{add}(a)} \bigl(1 + \mathrm{cost}_s(\mathrm{pre}(a))\bigr) & \text{otherwise,} \end{cases}
$$ {#eq-atom-cost}
where the cost of a set of atoms is either their maximum (giving $h_{\max}$) or their sum (giving $h_{\mathrm{add}}$), and $h_{\max}(s) = \max_{g \in G} \mathrm{cost}_s(g)$, $h_{\mathrm{add}}(s) = \sum_{g \in G} \mathrm{cost}_s(g)$. Both are computed by a Bellman–Ford-like iteration in polynomial time.

::: theorem Admissibility of relaxation heuristics {#thm-hmax}
For every state $s$, $h_{\max}(s) \le h^+(s) \le h^*(s)$, where $h^*(s)$ is the length of a shortest real plan from $s$. So $h_{\max}$ and $h^+$ are admissible. The heuristic $h_{\mathrm{add}}$ is not admissible in general.
:::

::: proof
*$h^+ \le h^*$.* Let $a_1, \dots, a_k$ be a real plan from $s$ with states $s = s_0, s_1, \dots, s_k$, and let $t_0 = s$, $t_i = t_{i-1} \cup \mathrm{add}(a_i)$ be the states of the same actions in the relaxed problem. By induction $s_i \subseteq t_i$: $s_i = (s_{i-1} \setminus \mathrm{del}(a_i)) \cup \mathrm{add}(a_i) \subseteq t_{i-1} \cup \mathrm{add}(a_i) = t_i$. So each $a_i$ is applicable in $t_{i-1} \supseteq s_{i-1} \supseteq \mathrm{pre}(a_i)$, and $G \subseteq s_k \subseteq t_k$: the real plan is a relaxed plan, and the shortest relaxed plan is no longer.

*$h_{\max} \le h^+$.* Let $a_1, \dots, a_k$ be a shortest relaxed plan from $s$, with relaxed states $t_0 = s \subseteq t_1 \subseteq \dots \subseteq t_k$. We show by induction on $i$ that every atom $p \in t_i$ has $\mathrm{cost}_s(p) \le i$ (with $\max$). For $i = 0$, atoms of $s$ cost $0$. An atom $p \in t_i \setminus t_{i-1}$ was added by $a_i$, whose preconditions lie in $t_{i-1}$ and so cost at most $i - 1$ each; by [[#eq-atom-cost]], $\mathrm{cost}_s(p) \le 1 + (i - 1) = i$. Since $G \subseteq t_k$, $h_{\max}(s) = \max_{g \in G} \mathrm{cost}_s(g) \le k = h^+(s)$.

*$h_{\mathrm{add}}$ can overestimate.* If one action $a$, applicable in $s$, adds both goal atoms $g_1$ and $g_2$, then $h^* = 1$ but $h_{\mathrm{add}}(s) = \mathrm{cost}(g_1) + \mathrm{cost}(g_2) = 2$: the sum counts $a$ twice.
:::

The two heuristics err in opposite directions. $h_{\max}$ is admissible but weak: it looks only at the single hardest goal. $h_{\mathrm{add}}$ assumes the goals are achieved independently, which overcounts shared actions, but it is far more informative, and greedy best-first search with it is fast. The **FF heuristic** (Hoffmann and Nebel, 2001) extracts an actual relaxed plan from the cost computation and counts its actions, avoiding double counting of shared actions; it is not admissible either, but it is the heuristic of many successful satisficing planners.

```python
def h_relaxed(state, goal, actions, combine):
    """Cost of atoms when delete lists are ignored: combine=max gives h_max, combine=sum gives h_add."""
    cost = {p: 0 for p in state}; changed = True
    while changed:
        changed = False
        for a in actions:
            if all(p in cost for p in a.pre):
                c = 1 + combine([cost[p] for p in a.pre] or [0])
                for q in a.add:
                    if c < cost.get(q, float("inf")): cost[q] = c; changed = True
    if not all(g in cost for g in goal): return float("inf")
    return combine([cost[g] for g in goal] or [0])

def search(init, goal, actions, h=None, weight_g=1):
    """A* (weight_g=1) or greedy best-first (weight_g=0) with heuristic h; BFS if h is None."""
    tie = itertools.count(); start = frozenset(init)
    frontier = [(0, next(tie), start, 0, [])]; best = {start: 0}; expanded = 0
    while frontier:
        _, _, s, g, plan = heapq.heappop(frontier)
        if goal <= s: return plan, expanded
        if g > best[s]: continue
        expanded += 1
        for a, t in successors(s, actions):
            if g + 1 < best.get(t, float("inf")):
                best[t] = g + 1
                f = (g + 1) if h is None else weight_g * (g + 1) + h(t)
                heapq.heappush(frontier, (f, next(tie), t, g + 1, plan + [a.name]))
```

::: example Heuristic planning in the blocks world {#ex-heuristic-planning}
Compare breadth-first search, A* with $h_{\max}$ and greedy best-first search with $h_{\mathrm{add}}$ on the Sussman anomaly and on random blocks-world problems with $5$, $6$ and $7$ blocks.
::: solution
On the Sussman anomaly, $h_{\max}(I) = 2$ and $h_{\mathrm{add}}(I) = 3$ (the optimal plan has length $3$):

```console
$ python3 strips.py
18 actions; h_max = 2 h_add = 3
BFS           expanded  12: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
A* h_max      expanded   4: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
greedy h_add  expanded   3: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
```

For random problems we draw initial and goal arrangements with a fixed seed (a random order of the blocks cut into towers); the goal consists of the $\mathit{On}$ atoms of the second arrangement. Each entry gives the plan length and the number of states expanded:

```console
$ python3 strips_rand.py
 n  BFS (len/exp)   A* h_max (len/exp)   greedy h_add (len/exp)
 5   6 /   180    6 /    30    8 /     8
 5   4 /    60    4 /    14    4 /     4
 6   6 /  1512    6 /   137    6 /     6
 6   5 /  1375    5 /   120    5 /     5
 7   8 / 25523    8 /  2515    9 /     9
 7   6 /  4684    6 /   360    7 /     7
```

A* with $h_{\max}$ always finds an optimal plan (it is admissible, and in fact consistent, so [[artificial-intelligence/search#thm-astar-graph]] applies) and expands about ten times fewer states than BFS. Greedy search with $h_{\mathrm{add}}$ expands exactly one state per plan step — it walks straight to a goal — but its plans are sometimes longer than optimal ($8$ instead of $6$, $9$ instead of $8$, $7$ instead of $6$). This is the typical trade-off: informative inadmissible heuristics with greedy search find good plans quickly; admissible heuristics with A* prove optimality at much greater cost.
:::
:::

::: warning Relaxed plans can be badly wrong
The delete relaxation ignores every conflict between actions, so it is blind to some of the very difficulties that make planning hard. In the relaxed blocks world, a block can be "on" two blocks at once once both atoms have been added; in a relaxed logistics problem one truck can be in every city at once. On problems that depend on **resources** — fuel, a single gripper, a one-lane bridge — $h^+$ can underestimate the true cost by an arbitrarily large factor, and $h_{\mathrm{add}}$ can overestimate it on problems with many shared subgoals. A good heuristic value for the initial state says nothing about whether a plan exists at all: a relaxed plan may exist when no real plan does (for example when a needed action deletes something irreplaceable). Planners combine relaxation heuristics with others — landmarks, abstractions, pattern databases — for exactly these reasons.
:::

## Planning graphs and GraphPlan

A **planning graph** organises the relaxed reachability computation into levels, and adds a cheap but powerful approximation of the conflicts that the delete relaxation ignores.

::: definition Planning graph {#def-planning-graph}
A planning graph alternates **atom levels** $P_0, P_1, \dots$ and **action levels** $A_0, A_1, \dots$. $P_0 = I$. $A_i$ contains every action whose preconditions are in $P_i$ and are pairwise non-mutex, plus a **no-op** for each atom of $P_i$ (with that atom as precondition and add effect). $P_{i+1}$ is the set of atoms added by actions of $A_i$. Two actions of $A_i$ are **mutex** (mutually exclusive) if one deletes a precondition or an add effect of the other (**interference**, **inconsistent effects**), or if some precondition of one is mutex at level $P_i$ with some precondition of the other (**competing needs**). Two atoms of $P_{i+1}$ are mutex if every action of $A_i$ that adds one is mutex with every action that adds the other (**inconsistent support**).
:::

::: lemma Mutexes are sound; the graph levels off {#lem-planning-graph}
(1) If a sequence of $i$ actions from $I$ reaches a state $s$, then $s \subseteq P_i$ and no two atoms of $s$ are mutex in $P_i$; in particular, every action applicable after $i$ steps belongs to $A_i$. (2) The atom levels grow, $P_i \subseteq P_{i+1}$, and the mutex relations among atoms present at both levels only shrink. Since everything is finite, after finitely many levels the graph **levels off**: $P_{i+1} = P_i$ with the same mutexes, and all later levels are identical.
:::

::: proof
(1) By induction on $i$. For $i = 0$, the only state reachable in $0$ steps is $I = P_0$, which has no mutexes. Suppose $s$ is reached by $a_1, \dots, a_{i+1}$, with $s'$ the state after $i$ steps. By induction all atoms of $s'$ are in $P_i$ and pairwise non-mutex, so $a_{i+1}$ (whose preconditions are in $s'$) is in $A_i$, and so are the no-ops of the atoms of $s'$ not deleted by $a_{i+1}$. Each atom $p \in s$ is added either by $a_{i+1}$ or by the no-op of $p$, so $p \in P_{i+1}$. For two atoms $p, q \in s$, take these supporting actions $x$ (for $p$) and $y$ (for $q$). If $x = y = a_{i+1}$ they are not mutex (an action is not mutex with itself). Otherwise at least one is a no-op of an atom $r \in s'$ not deleted by $a_{i+1}$; one checks the three conditions: no interference (a no-op of an atom kept by $a_{i+1}$ is not deleted by it, and a no-op deletes nothing), and no competing needs (all preconditions lie in $s'$, which is pairwise non-mutex by induction). So $x$ and $y$ are not mutex, and $p$, $q$ do not have inconsistent support: they are not mutex in $P_{i+1}$.

(2) $P_i \subseteq P_{i+1}$ because of the no-ops. That mutexes only disappear is shown by a similar induction: with more atoms and fewer mutexes at level $i$, $A_{i}$ contains at least the actions of $A_{i-1}$, so every pair of atoms has at least as many possible supporters, and supporters that were not mutex stay non-mutex. Atoms and mutex pairs are finite in number, so both stabilise.
:::

The first level at which all goal atoms appear pairwise non-mutex is therefore a lower bound on the length of any plan — an admissible heuristic, at least as strong as $h_{\max}$ (which is the first level at which all goals appear, ignoring mutexes).

::: example The planning graph of the Sussman anomaly {#ex-planning-graph}
Build the planning graph of [[#ex-sussman]] and find the first level where the goals appear, with and without mutexes.
::: solution
A short program expanding levels with all four mutex rules (and the $18$ ground actions) prints the level at which the goals first appear pairwise non-mutex, with the number of atoms at each level:

```console
$ python3 pgraph.py
(3, [5, 9, 12, 12])
(2, [5, 9, 12])
```

The second line is for the single goal $\mathit{On}(A, B)$. Level $0$ has the $5$ initial atoms; level $1$ adds the atoms reachable in one move (such as $\mathit{On}(C, \mathit{Table})$, $\mathit{Clear}(A)$, $\mathit{On}(B, C)$, $\mathit{On}(C, B)$); level $2$ has all $12$ atoms. Ignoring mutexes, both goals are present at level $2$ — this is $h_{\max} = 2$. But at level $2$, $\mathit{On}(A, B)$ and $\mathit{On}(B, C)$ are mutex: every two-step way of achieving $\mathit{On}(A, B)$ uses the move of $C$ to the table and then $A$ onto $B$, which conflicts with putting $B$ on $C$ (each requires the other to be undone). Only at level $3$ are the goals non-mutex, giving the bound $3$ — which is the optimal plan length. Mutexes capture exactly the goal interaction that defeats naive subgoal-by-subgoal planning.
:::
:::

::: algorithm GraphPlan {#alg-graphplan}
1. Build the planning graph level by level from $P_0 = I$.
2. When a level $P_k$ contains all goals pairwise non-mutex, search backwards for a plan: choose, for the goals at level $k$, a set of pairwise non-mutex actions in $A_{k-1}$ that achieve them; their preconditions become the goals at level $k - 1$; continue to level $0$. The result is a **parallel plan** — a sequence of sets of non-interfering actions — that can be executed in any order within each set.
3. If the backward search fails, record the failed goal set at that level as a **nogood**, extend the graph by one level and try again. Stop with failure when the graph has levelled off and the set of nogoods no longer changes.
:::

GraphPlan's backward search is a constraint satisfaction problem — one variable per goal per level, whose values are achieving actions, with mutexes as constraints — and the planning graph can be converted directly into a SAT formula: **SATPlan** fixes a plan length $k$, encodes "there is a plan of length $k$" with variables for atoms at times $0, \dots, k$ and actions at times $0, \dots, k-1$, and hands it to a SAT solver ([[artificial-intelligence/logical-agents]]), increasing $k$ until the formula is satisfiable.

::: quiz
At level 2 of a planning graph, goals $g_1$ and $g_2$ are both present but mutex. What can you conclude?

- [x] No plan of length $2$ or less achieves both goals.
- [ ] The problem has no solution.
- [ ] There is a plan of length $3$.
- [ ] $h_{\max} \ge 3$.
::: solution
By [[#lem-planning-graph]], if both goals were true after $2$ actions they would be non-mutex at level $2$; so no plan of length $2$ exists (and none shorter, since a shorter plan can be padded with no-ops in a parallel plan). Nothing more follows: a plan may need $3$ steps or many more, or not exist at all. $h_{\max}$ ignores mutexes, and here both goals are present at level $2$, so $h_{\max} \le 2$.
:::
:::

## Other approaches

- **Partial-order planning** searches in the space of *plans* rather than states. A partial plan is a set of actions with ordering constraints and **causal links** ("$a$ achieves $p$ for $b$"); the planner repeatedly picks an unsatisfied precondition, adds an action or a link to achieve it, and resolves **threats** (an action that might delete $p$ between $a$ and $b$) by ordering it before $a$ or after $b$. It commits to orderings only when necessary, which handles the Sussman anomaly naturally, and it produces flexible plans; but heuristic state-space planners outperformed it in the late 1990s.
- **Hierarchical task network (HTN) planning** decomposes high-level tasks ("deliver parcel") into subtasks with methods supplied by the domain designer. It encodes expert knowledge about *how* to solve problems and is widely used in practice (and in video games).
- **Planning under uncertainty**: with nondeterministic actions, plans become **contingent** (branching on observations); with probabilities and rewards, the problem becomes a Markov decision process ([[artificial-intelligence/decision-making]]).

::: history
The Stanford Research Institute Problem Solver, STRIPS, by Richard Fikes and Nils Nilsson ("STRIPS: a new approach to the application of theorem proving to problem solving", *Artificial Intelligence*, 1971), planned for the robot Shakey and introduced the add–delete action representation. John McCarthy and Patrick Hayes had posed the frame problem in 1969. Gerald Sussman's work on the blocks world in the early 1970s exposed goal interaction; Earl Sacerdoti's NOAH (1975) and Austin Tate's NONLIN (1977) began partial-order and hierarchical planning, and David McAllester and David Rosenblitt's SNLP (1991) gave a clean partial-order planner. Tom Bylander proved the $\mathsf{PSPACE}$-completeness of STRIPS planning in 1994. Avrim Blum and Merrick Furst's GraphPlan (1995, journal version 1997) introduced planning graphs, and Henry Kautz and Bart Selman's SATPlan (1992, 1996) planning as satisfiability. Blai Bonet and Héctor Geffner's HSP (1997–2001) and Jörg Hoffmann and Bernhard Nebel's FF (2001) made heuristic forward search with delete-relaxation heuristics the dominant approach. PDDL was defined by Drew McDermott and colleagues for the first International Planning Competition in 1998.
:::

## In practice

As of 2026, the leading classical planners — many built on Malte Helmert's Fast Downward system (2006) — use forward heuristic search with combinations of relaxation, landmark and abstraction heuristics, and the International Planning Competition, held regularly since 1998, tracks their progress on PDDL benchmarks. Planning is used for spacecraft operations, logistics, manufacturing, robotics, and as a component of video-game AI (goal-oriented action planning). Language-model-based agents that "plan" in natural language are a different and evolving approach; their plans carry no guarantee of validity unless checked by a model of the actions, and combining them with classical planners and validators is an active area — see the LLM Atlas on [agent planning](/learn/llm/lesson.php?c=agents&l=planning).

## Where this leads

Classical planning assumes a known, deterministic, fully observable world. When actions have uncertain outcomes, a plan becomes a policy mapping states to actions, computed by the dynamic programming of [[artificial-intelligence/decision-making]]; when the model itself is unknown, the agent must learn it or learn a policy directly ([[artificial-intelligence/reinforcement-learning]]). The heuristics of this chapter are instances of the general relaxation principle of [[artificial-intelligence/search#thm-relaxation]], and SATPlan connects planning to the SAT solvers of [[artificial-intelligence/logical-agents]] and [[complexity/coping-with-hardness]].

::: summary
- A **STRIPS** problem ([[#def-strips]]) describes states as sets of atoms and actions by preconditions, add lists and delete lists; PDDL is its standard extension. Plan existence is $\mathsf{PSPACE}$-complete ([[#thm-planning-pspace]]) and plans can be exponentially long.
- Planners search forwards from the initial state or backwards by **regression** through relevant actions ([[#def-regression]], [[#thm-regression]]); subgoals can **interact**, as the Sussman anomaly shows ([[#ex-sussman]]).
- The **delete relaxation** ([[#def-delete-relaxation]]) yields $h^+$, approximated by $h_{\max}$ (admissible) and $h_{\mathrm{add}}$ (informative, inadmissible): $h_{\max} \le h^+ \le h^*$ ([[#thm-hmax]]).
- A* with $h_{\max}$ finds optimal plans; greedy search with $h_{\mathrm{add}}$ finds good plans much faster ([[#ex-heuristic-planning]]).
- **Planning graphs** add sound mutex relations to relaxed reachability ([[#lem-planning-graph]]); the first level with the goals pairwise non-mutex is an admissible bound, and **GraphPlan** ([[#alg-graphplan]]) extracts parallel plans from the graph. SATPlan encodes bounded planning as satisfiability.
:::

## Exercises

::: exercise Applying an action {level=1}
In the state $s = \{\mathit{On}(A, \mathit{Table}), \mathit{On}(B, A), \mathit{On}(C, \mathit{Table}), \mathit{Clear}(B), \mathit{Clear}(C)\}$, is $\mathit{Move}(B, A, C)$ applicable? If so, compute the resulting state.
::: solution
Its preconditions are $\mathit{On}(B, A)$, $\mathit{Clear}(B)$, $\mathit{Clear}(C)$, all in $s$: applicable. It deletes $\mathit{On}(B, A)$ and $\mathit{Clear}(C)$ and adds $\mathit{On}(B, C)$ and $\mathit{Clear}(A)$, giving $\{\mathit{On}(A, \mathit{Table}), \mathit{On}(C, \mathit{Table}), \mathit{On}(B, C), \mathit{Clear}(B), \mathit{Clear}(A)\}$.
:::
:::

::: exercise Counting ground actions {level=1 check="48"}
How many ground $\mathit{Move}(b, x, y)$ actions does the encoding of [[#ex-sussman]] produce for $n = 4$ blocks? ($b$ is a block, $x$ and $y$ are distinct places — another block or the table — both different from $b$.) (Enter the number of actions.)
::: solution
For each block $b$ there are $n$ places other than $b$ ($n - 1$ blocks and the table) for $x$, and then $n - 1$ choices for $y \ne x$. So there are $n \cdot n \cdot (n - 1)$ actions. For $n = 3$ this gives $3 \cdot 3 \cdot 2 = 18$, matching the program's output; for $n = 4$ it gives $4 \cdot 4 \cdot 3 = 48$.
:::
:::

::: exercise Computing $h_{\max}$ and $h_{\mathrm{add}}$ {#ex-hadd level=1 check="8"}
Actions (all cost $1$): $a_1$: pre $\{\}$, add $\{p\}$; $a_2$: pre $\{p\}$, add $\{q\}$; $a_3$: pre $\{p\}$, add $\{r\}$; $a_4$: pre $\{q, r\}$, add $\{g_1\}$; $a_5$: pre $\{q\}$, add $\{g_2\}$. Starting from the empty state with goal $\{g_1, g_2\}$, compute $h_{\max}$, $h_{\mathrm{add}}$ and $h^+$. (Enter $h_{\mathrm{add}}$.)
::: solution
Costs with $\max$: $p = 1$, $q = 2$, $r = 2$, $g_1 = 1 + \max(2, 2) = 3$, $g_2 = 1 + 2 = 3$, so $h_{\max} = 3$. Costs with sums: $p = 1$, $q = 2$, $r = 2$, $g_1 = 1 + 2 + 2 = 5$, $g_2 = 1 + 2 = 3$, so $h_{\mathrm{add}} = 5 + 3 = 8$. A shortest relaxed plan is $a_1, a_2, a_3, a_4, a_5$: every action adds an atom that some goal needs and is the only way to do so, so $h^+ = 5$. Thus $h_{\max} = 3 \le h^+ = 5 \le h_{\mathrm{add}} = 8$: the sum counts $a_1$ three times and $a_2$ twice.
:::
:::

::: exercise Plans can be long {level=2}
(a) Formulate the Towers of Hanoi with $n$ discs in STRIPS with $O(n^2)$ atoms. (b) Prove that every plan has at least $2^n - 1$ moves. (c) What does this imply for any planner that outputs plans explicitly?
::: solution
(a) Atoms $\mathit{On}(d, x)$ for each disc $d$ and each larger disc or peg $x$, and $\mathit{Clear}(x)$ for discs and pegs; an action $\mathit{Move}(d, x, y)$ for $y$ a larger disc or a peg, with the blocks-world preconditions and effects. That is $O(n^2)$ atoms and $O(n^3)$ actions. (b) Let $T(n)$ be the minimum number of moves to move a tower of $n$ discs to another peg. To move the largest disc, the $n - 1$ smaller discs must all be on the third peg (the largest disc must be clear and its target peg empty), which takes at least $T(n-1)$ moves; after the largest disc moves (at least $1$ move), the smaller discs must be moved on top of it, at least $T(n - 1)$ more. So $T(n) \ge 2T(n-1) + 1$ with $T(1) = 1$, giving $T(n) \ge 2^n - 1$. (c) Since the output has length exponential in the input size, no planner can run in polynomial time on all inputs — whatever the answer to $\mathsf{P}$ versus $\mathsf{PSPACE}$. Plan *existence* is a different question: for Hanoi it is trivial (always yes).
:::
:::

::: exercise $h_{\max}$ is consistent {level=2}
Prove that $h_{\max}$ is consistent: for every action $a$ applicable in $s$, $h_{\max}(s) \le 1 + h_{\max}(\mathrm{Result}(s, a))$.
::: solution
Let $s' = \mathrm{Result}(s, a)$. We show $\mathrm{cost}_s(p) \le 1 + \mathrm{cost}_{s'}(p)$ for every atom $p$ with finite $\mathrm{cost}_{s'}(p)$, by induction on $k = \mathrm{cost}_{s'}(p)$ (costs computed with $\max$). If $k = 0$, then $p \in s'$: either $p \in s$, so $\mathrm{cost}_s(p) = 0$, or $p \in \mathrm{add}(a)$ with $\mathrm{pre}(a) \subseteq s$, so $\mathrm{cost}_s(p) \le 1$. If $k > 0$, then by [[#eq-atom-cost]] some action $b$ adds $p$ and all its preconditions have $\mathrm{cost}_{s'} \le k - 1$; by the induction hypothesis they have $\mathrm{cost}_s \le k$, so $\mathrm{cost}_s(p) \le 1 + k$. Taking the maximum over the goals, $h_{\max}(s) \le 1 + h_{\max}(s')$; and $h_{\max} = 0$ in goal states. With [[artificial-intelligence/search#thm-astar-graph]], A* graph search with $h_{\max}$ is optimal without re-opening.
:::
:::

::: exercise Regression finds impossible subgoals {level=2}
In the three-block world, regress the goal $\{\mathit{On}(A, B), \mathit{On}(B, C)\}$ through $\mathit{Move}(A, \mathit{Table}, B)$ and then the result through $\mathit{Move}(B, \mathit{Table}, C)$. Is the final subgoal satisfiable by any state? What could a backward planner do about such subgoals?
::: solution
First regression: remove $\mathit{On}(A, B)$, add $\mathit{On}(A, \mathit{Table})$, $\mathit{Clear}(A)$, $\mathit{Clear}(B)$: $g_1 = \{\mathit{On}(B, C), \mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$. Is $\mathit{Move}(B, \mathit{Table}, C)$ consistent with $g_1$? It deletes $\mathit{On}(B, \mathit{Table})$ and $\mathit{Clear}(C)$, neither in $g_1$: yes. Regressing: remove $\mathit{On}(B, C)$, add $\mathit{On}(B, \mathit{Table})$, $\mathit{Clear}(B)$, $\mathit{Clear}(C)$: $g_2 = \{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(C)\}$ — all three blocks clear with $A$ and $B$ on the table, which is satisfiable (with $C$ on the table). This sequence is fine. An impossible subgoal arises, for instance, by regressing $\{\mathit{On}(A, B), \mathit{On}(B, C)\}$ through $\mathit{Move}(B, \mathit{Table}, C)$ *first*: it requires $\mathit{Clear}(B)$, giving $\{\mathit{On}(A, B), \mathit{Clear}(B), \dots\}$, which no state satisfies ($A$ on $B$ means $B$ is not clear) — but STRIPS does not know that $\mathit{On}(A, B)$ and $\mathit{Clear}(B)$ exclude each other. A backward planner can prune such subgoals using **state invariants** (for example "$\mathit{On}(x, B)$ excludes $\mathit{Clear}(B)$"), which can be computed automatically, or using planning-graph mutexes computed forwards from $I$: a subgoal containing a pair of atoms that are mutex at every level is unreachable.
:::
:::

::: exercise The size of a SATPlan encoding {level=2 check="102"}
SATPlan encodes "is there a plan with $k$ steps?" with one Boolean variable per atom per time $0, \dots, k$ and one per action per time $0, \dots, k - 1$. How many variables does it use for the three-block world ($12$ atoms, $18$ actions) with $k = 3$? Which clauses are needed? (Enter the number of variables.)
::: solution
Atoms: $12 \cdot (k + 1) = 48$; actions: $18 \cdot k = 54$; in total $102$ variables. The clauses say: the initial state holds at time $0$ (unit clauses for its atoms, and negative unit clauses for the others); the goal atoms hold at time $k$; each action at time $t$ implies its preconditions at time $t$ and its add effects, and the negation of its delete effects, at time $t + 1$; **explanatory frame axioms**: if an atom changes value between $t$ and $t + 1$, some action at $t$ caused it ($\lnot p_t \land p_{t+1} \Rightarrow \bigvee_{a : p \in \mathrm{add}(a)} a_t$, and similarly for deletions); and **exclusion axioms** forbidding two interfering actions at the same time (or, for sequential plans, any two actions). A satisfying assignment, read off at the action variables, is a plan.
:::
:::

::: exercise Implement the FF heuristic {level=3}
Implement $h_{\mathrm{FF}}$: compute $\mathrm{cost}_s$ with $\max$ as in $h_{\max}$, recording for each atom the action that first achieved it; then extract a relaxed plan backwards from the goals (for each goal not in $s$, include its achiever and recursively the achievers of that action's preconditions), and return the number of distinct actions. Compare it with $h_{\max}$ and $h_{\mathrm{add}}$ on the problem of the exercise on $h_{\max}$ and $h_{\mathrm{add}}$, and with greedy best-first search on random blocks-world problems.
::: solution
```python
def h_ff(state, goal, actions):
    cost = {p: 0 for p in state}; achiever = {}; changed = True
    while changed:                                     # h_max costs, remembering achievers
        changed = False
        for a in actions:
            if all(p in cost for p in a.pre):
                c = 1 + max([cost[p] for p in a.pre] or [0])
                for q in a.add:
                    if c < cost.get(q, float("inf")):
                        cost[q] = c; achiever[q] = a; changed = True
    if not all(g in cost for g in goal): return float("inf")
    plan, todo = set(), [g for g in goal if g not in state]
    while todo:                                        # extract a relaxed plan backwards
        p = todo.pop()
        a = achiever[p]
        if a.name in plan: continue
        plan.add(a.name)
        todo.extend(q for q in a.pre if q not in state)
    return len(plan)
```

On the five-action problem of [[#ex-hadd]] the function returns $5$: the relaxed plan $\{a_1, \dots, a_5\}$ with $a_1$ and $a_2$ counted once — exactly $h^+$ here, between $h_{\max} = 3$ and $h_{\mathrm{add}} = 8$. In general $h_{\mathrm{FF}} \ge h^+$ (it counts a valid relaxed plan, not necessarily a shortest one) and it is not admissible, but it avoids $h_{\mathrm{add}}$'s double counting. With `lambda s: h_ff(s, goal, acts)` in the `search` function and `weight_g=0`, on the six random problems of [[#ex-heuristic-planning]] (same seed) greedy search again expands exactly one state per plan step and finds plans of lengths $6, 4, 6, 6, 9, 8$, against the optima $6, 4, 6, 5, 8, 6$ and greedy $h_{\mathrm{add}}$'s $8, 4, 6, 5, 9, 7$: better on one instance, worse on another. Satisficing heuristics are compared on large benchmark sets for this reason.
:::
:::
