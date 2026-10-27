Oil flows from a refinery to a port through a network of pipes, each of which can carry only so many barrels an hour. How much can reach the port per hour, and how should it be routed? The same question, with data instead of oil, is asked of computer networks; with trains, of railways — the original motivation, in a 1955 study of the Soviet rail network's capacity to move goods to Eastern Europe. And it has a twin: what is the cheapest set of pipes (or rail lines) whose removal cuts the port off entirely? One of the most beautiful theorems in combinatorial optimisation says that the two answers are always *equal*: the maximum flow equals the capacity of the minimum cut.

The **maximum-flow problem** is also a universal tool. Many problems that do not look like flows at all — assigning students to projects, matching applicants to jobs, scheduling with availability constraints, finding disjoint routes, segmenting images — can be **reduced** to maximum flow: translated into a flow network whose maximum flow encodes the answer. This chapter defines flow networks, develops the **Ford–Fulkerson method** of repeatedly pushing flow along **augmenting paths** in a **residual network**, proves the **max-flow min-cut theorem**, analyses the **Edmonds–Karp** algorithm, which chooses shortest augmenting paths and runs in $O(nm^2)$ time, and then reduces **bipartite matching** to flow. It uses breadth-first search ([[algorithms/graph-search#thm-bfs]]) as its main subroutine.

## Flow networks

::: definition Flow network and flow {#def-flow}
A **flow network** is a directed graph $G = (V, E)$ with a **source** $s$ and a **sink** $t \ne s$, and a **capacity** $c(u, v) \ge 0$ for each edge; we set $c(u, v) = 0$ for pairs that are not edges, and assume for simplicity that $G$ has no pair of antiparallel edges $(u, v), (v, u)$. A **flow** is a function $f\colon V\times V \to \mathbb R$ satisfying

1. **capacity constraints**: $0 \le f(u, v) \le c(u, v)$ for all $u, v$;
2. **flow conservation**: for every $u \ne s, t$, $\sum_{v} f(v, u) = \sum_{v} f(u, v)$ — what flows in flows out.

The **value** of $f$ is the net flow out of the source, $\lvert f\rvert = \sum_v f(s, v) - \sum_v f(v, s)$. The **maximum-flow problem** asks for a flow of maximum value.
:::

The no-antiparallel-edges assumption costs nothing: an edge $(v, u)$ opposite an edge $(u, v)$ can be split into $(v, x)$ and $(x, u)$ with a new vertex $x$ and the same capacity. It keeps the bookkeeping clean.

::: widget graph
nodes: s@0,1; a@1,2; c@1,0; b@2,2; d@2,0; t@3,1
edges: s>a:16; s>c:13; a>b:12; c>a:4; b>c:9; c>d:14; d>b:7; b>t:20; d>t:4
algorithm: bfs
start: s
caption: A flow network with source $s$, sink $t$ and capacities on the edges. Step through breadth-first search from $s$: the BFS tree reaches $t$ along $s \to a \to b \to t$, a shortest path, and its smallest capacity, $12$, is how much flow can be pushed along it first. This is the first step of the Edmonds–Karp algorithm traced below; the maximum flow turns out to be $23$, and the edges $a \to b$, $d \to b$ and $d \to t$ (capacities $12 + 7 + 4 = 23$) form a minimum cut.
:::

### Cuts

::: definition Cut of a flow network {#def-st-cut}
An **$s$–$t$ cut** $(S, T)$ is a partition of $V$ with $s \in S$ and $t \in T$. Its **capacity** is $c(S, T) = \sum_{u\in S, v\in T} c(u, v)$ — only edges from $S$ to $T$ count. The **net flow** across it is $f(S, T) = \sum_{u\in S, v\in T}f(u, v) - \sum_{u\in S, v\in T}f(v, u)$.
:::

::: lemma Flow across a cut {#lem-cut-flow}
For every flow $f$ and every $s$–$t$ cut $(S, T)$, $f(S, T) = \lvert f\rvert \le c(S, T)$.
:::

::: proof
Sum the conservation equations, in the form $\sum_v f(u, v) - \sum_v f(v, u) = 0$, over all $u \in S \setminus \{s\}$, and add the definition of $\lvert f\rvert$ for $u = s$:
$$
\lvert f\rvert = \sum_{u \in S}\Big(\sum_{v\in V}f(u, v) - \sum_{v\in V}f(v, u)\Big).
$$
Split each inner sum over $v \in S$ and $v \in T$. The terms with both $u, v \in S$ cancel in pairs: $f(u, v)$ appears with a plus sign (in $u$'s sum) and a minus sign (in $v$'s sum). What remains is $\sum_{u\in S, v\in T}f(u, v) - \sum_{u \in S, v\in T}f(v, u) = f(S, T)$. Then $f(S, T) \le \sum_{u \in S, v\in T}f(u, v) \le \sum_{u\in S, v\in T}c(u, v) = c(S, T)$, using $f \ge 0$ and the capacity constraints.
:::

So *every* cut's capacity bounds *every* flow's value: the maximum flow is at most the minimum cut. The theorem of this chapter is that equality holds.

::: example A flow and two cuts {#ex-cut}
In the network of the figure, send $11$ units along $s \to a \to b \to t$, $7$ units along $s \to c \to d \to b \to t$ and $4$ units along $s \to c \to d \to t$. Check that this is a flow, find its value, and compute the net flow and the capacity of the cuts $S_1 = \{s\}$ and $S_2 = \{s, a, c, d\}$.
::: solution
The flow is $f(s, a) = 11$, $f(a, b) = 11$, $f(s, c) = 11$, $f(c, d) = 11$, $f(d, b) = 7$, $f(d, t) = 4$, $f(b, t) = 18$, and $0$ on $c \to a$ and $b \to c$. Capacities hold ($11 \le 16, 12, 13, 14$; $7 \le 7$; $4 \le 4$; $18 \le 20$). Conservation: $a$ receives $11$ and sends $11$; $c$ receives $11$, sends $11$; $d$ receives $11$, sends $7 + 4$; $b$ receives $11 + 7 = 18$, sends $18$. The value is $11 + 11 = 22$.

Cut $S_1 = \{s\}$: net flow $11 + 11 = 22$, capacity $16 + 13 = 29$. Cut $S_2 = \{s, a, c, d\}$: the edges leaving it are $a \to b$, $d \to b$, $d \to t$ with flow $11 + 7 + 4 = 22$, and the edge $b \to c$ entering it carries $0$; net flow $22$, as [[#lem-cut-flow]] says it must be. Its capacity is $12 + 7 + 4 = 23$. So this flow is within $1$ of optimal, and no flow can exceed $23$ — the cut $S_2$ certifies it.
:::
:::

## The Ford–Fulkerson method

A natural idea: find a path from $s$ to $t$ with spare capacity on every edge, push as much flow along it as possible, and repeat. This alone fails — an early, badly chosen path can block better ones. The fix is to allow flow to be *pushed back*: sending flow along $v \to u$ can cancel flow previously sent along $u \to v$. The residual network records both possibilities.

::: definition Residual network and augmenting path {#def-residual}
Given a flow $f$, the **residual capacity** of an ordered pair $(u, v)$ is
$$
c_f(u, v) = \begin{cases} c(u, v) - f(u, v) & \text{if } (u, v) \in E,\\ f(v, u) & \text{if } (v, u) \in E,\\ 0 & \text{otherwise.}\end{cases}
$$
The **residual network** $G_f$ has an edge $(u, v)$ for every pair with $c_f(u, v) > 0$: forward edges with spare capacity and backward edges that can cancel flow. An **augmenting path** is a path from $s$ to $t$ in $G_f$; its **bottleneck** $b$ is the smallest residual capacity on it.
:::

::: lemma Augmentation {#lem-augment}
Let $p$ be an augmenting path with bottleneck $b > 0$. Define $f'$ from $f$ by, for each edge $(u, v)$ of $p$: if $(u, v) \in E$, increase $f(u, v)$ by $b$; otherwise decrease $f(v, u)$ by $b$. Then $f'$ is a flow with $\lvert f'\rvert = \lvert f\rvert + b$.
:::

::: proof
*Capacity:* on a forward edge, $f(u, v) + b \le f(u, v) + c_f(u, v) = c(u, v)$; on a backward edge, $f(v, u) - b \ge f(v, u) - c_f(u, v) = 0$. *Conservation:* an internal vertex $x$ of the simple path $p$ has one path edge entering it and one leaving it. Each of the four combinations (forward or backward in, forward or backward out) changes the inflow and the outflow of $x$ by the same amount: for example, forward in and backward out adds $b$ to an incoming flow and subtracts $b$ from another incoming flow. *Value:* the first edge of $p$ leaves $s$; if it is forward it increases the outflow of $s$ by $b$, and if backward it decreases the inflow of $s$ by $b$; either way the net outflow rises by $b$ (and $p$, being simple, does not return to $s$).
:::

::: example Why backward edges are needed {#ex-backward}
The network has edges $s \to a$, $s \to b$, $a \to b$, $a \to t$, $b \to t$, all of capacity $1$. Suppose the first path chosen is $s, a, b, t$. Show that without backward edges we get stuck at value $1$, and that the residual network finds the maximum flow $2$.
::: solution
After pushing $1$ unit along $s, a, b, t$, the edges $s \to a$, $a \to b$ and $b \to t$ are saturated. Looking only for paths of edges with spare capacity, $s$ can reach $b$ but nothing beyond it ($b \to t$ is full), so a naive method stops at $1$. In the residual network, the flow on $a \to b$ creates a backward edge $b \to a$ with residual capacity $1$, and $s \to b \to a \to t$ is an augmenting path. Augmenting along it *cancels* the flow on $a \to b$ and reroutes it: the final flow is $s \to a \to t$ and $s \to b \to t$, of value $2$, which equals the capacity of the cut $\{s\}$.
:::
:::

::: algorithm Ford–Fulkerson method {#alg-ford-fulkerson}
Start with $f = 0$. While the residual network $G_f$ contains a path from $s$ to $t$: choose one, $p$, and augment $f$ along $p$ by its bottleneck ([[#lem-augment]]). Return $f$.
:::

::: theorem Max-flow min-cut theorem {#thm-maxflow-mincut}
For a flow $f$ in a flow network, the following are equivalent:

1. $f$ is a maximum flow;
2. the residual network $G_f$ contains no augmenting path;
3. $\lvert f\rvert = c(S, T)$ for some $s$–$t$ cut $(S, T)$.

Consequently, the value of a maximum flow equals the capacity of a minimum cut.
:::

::: proof
(1 ⇒ 2) If there were an augmenting path, [[#lem-augment]] would give a flow of larger value.

(2 ⇒ 3) Let $S$ be the set of vertices reachable from $s$ in $G_f$, and $T = V \setminus S$. Then $s \in S$, and $t \in T$ because there is no augmenting path, so $(S, T)$ is a cut. For $u \in S$ and $v \in T$: if $(u, v) \in E$ then $f(u, v) = c(u, v)$, since otherwise $c_f(u, v) > 0$ and $v$ would be reachable; if $(v, u) \in E$ then $f(v, u) = 0$, since otherwise $c_f(u, v) = f(v, u) > 0$. So by [[#lem-cut-flow]], $\lvert f\rvert = f(S, T) = \sum_{u\in S, v\in T}c(u, v) - 0 = c(S, T)$.

(3 ⇒ 1) By [[#lem-cut-flow]], every flow $g$ has $\lvert g\rvert \le c(S, T) = \lvert f\rvert$.

Finally, a maximum flow exists (the set of flows is a closed bounded subset of $\mathbb R^E$ and the value is continuous; for integer capacities it also follows from [[#thm-integrality]]). By 1 ⇒ 3 its value is the capacity of some cut, and by [[#lem-cut-flow]] no cut has smaller capacity.
:::

The proof is also an algorithm for the minimum cut: once Ford–Fulkerson stops, the vertices reachable from $s$ in the residual network form the source side of a minimum cut.

::: theorem Integrality and termination {#thm-integrality}
If all capacities are integers, the Ford–Fulkerson method terminates after at most $\lvert f^\ast\rvert$ augmentations, where $\lvert f^\ast\rvert$ is the maximum flow value, and returns a maximum flow in which every $f(u, v)$ is an integer. Each augmentation takes $O(m)$ time (by BFS or DFS in $G_f$), so the running time is $O(m\lvert f^\ast\rvert)$.
:::

::: proof
By induction, the flow stays integral: residual capacities are integers, so bottlenecks are integers, and each augmentation changes flows by an integer. Each augmentation increases $\lvert f\rvert$ by a positive integer, at least $1$, and the value never exceeds $\lvert f^\ast\rvert \le c(\{s\}, V\setminus\{s\})$, so there are at most $\lvert f^\ast\rvert$ augmentations. When the method stops there is no augmenting path, so by [[#thm-maxflow-mincut]] the flow is maximum. (We may assume every vertex lies on a path from $s$, so $m \ge n - 1$ and a search costs $O(m)$.)
:::

The **integrality** property — integer capacities admit an integer maximum flow — is what makes flow useful for combinatorial problems like matching, where "half an edge" means nothing.

::: warning The path choice matters
The bound $O(m\lvert f^\ast\rvert)$ is not polynomial in the input size, because $\lvert f^\ast\rvert$ can be exponential in the number of bits of the capacities. On the network with edges $s \to a$, $s \to b$, $a \to t$, $b \to t$ of capacity $10^9$ and a middle edge $a \to b$ of capacity $1$, a careless choice alternates between $s, a, b, t$ and $s, b, a, t$ (using the residual backward edge $b \to a$), gaining $1$ each time: two billion augmentations, where two would do. With *irrational* capacities, Ford–Fulkerson may not terminate at all, and the flow values may even converge to something less than the maximum (an example with capacities involving the golden ratio is due to Zwick, 1995). Choosing augmenting paths well — shortest paths, as below, or paths of large bottleneck — avoids both problems.
:::

## The Edmonds–Karp algorithm

**Edmonds–Karp** is Ford–Fulkerson with augmenting paths found by breadth-first search in $G_f$, so that each augmenting path is a *shortest* one (fewest edges). Write $\delta_f(s, v)$ for the BFS distance from $s$ to $v$ in $G_f$.

::: lemma Residual distances never decrease {#lem-ek-monotone}
In the Edmonds–Karp algorithm, for every vertex $v$, $\delta_f(s, v)$ is non-decreasing over the augmentations.
:::

::: proof
Suppose an augmentation turns $f$ into $f'$ and some distances decrease. Among the vertices whose distance decreased, let $v$ have the smallest $\delta_{f'}(s, v)$; then $v \ne s$, and $v$ is reachable in $G_{f'}$. Let $u$ be the vertex before $v$ on a shortest path from $s$ to $v$ in $G_{f'}$, so $(u, v) \in E_{f'}$ and $\delta_{f'}(s, u) = \delta_{f'}(s, v) - 1$. By the choice of $v$, the distance of $u$ did not decrease: $\delta_f(s, u) \le \delta_{f'}(s, u)$.

If $(u, v) \in E_f$, then $\delta_f(s, v) \le \delta_f(s, u) + 1 \le \delta_{f'}(s, u) + 1 = \delta_{f'}(s, v)$, so the distance of $v$ did not decrease — a contradiction. If $(u, v) \notin E_f$ but $(u, v) \in E_{f'}$, the augmentation created this residual edge, which happens only if it pushed flow along $(v, u)$; so $(v, u)$ lies on the augmenting path, a shortest path in $G_f$, and $\delta_f(s, u) = \delta_f(s, v) + 1$. Then $\delta_f(s, v) = \delta_f(s, u) - 1 \le \delta_{f'}(s, u) - 1 = \delta_{f'}(s, v) - 2$, again contradicting a decrease.
:::

::: theorem Edmonds–Karp running time {#thm-edmonds-karp}
The Edmonds–Karp algorithm performs $O(nm)$ augmentations and runs in $O(nm^2)$ time, for any non-negative real capacities.
:::

::: proof
Call a residual edge $(u, v)$ **critical** on an augmenting path if its residual capacity equals the bottleneck; every augmentation has at least one critical edge, and the augmentation removes it from the residual network. Suppose $(u, v)$ is critical for the flow $f$. As $p$ is a shortest path, $\delta_f(s, v) = \delta_f(s, u) + 1$. The edge $(u, v)$ can reappear in a residual network only after flow is pushed along $(v, u)$, by some later augmentation from a flow $f'$, for which then $\delta_{f'}(s, u) = \delta_{f'}(s, v) + 1$. By [[#lem-ek-monotone]] $\delta_{f'}(s, v) \ge \delta_f(s, v)$, so
$$
\delta_{f'}(s, u) = \delta_{f'}(s, v) + 1 \ge \delta_f(s, v) + 1 = \delta_f(s, u) + 2.
$$
So between two occasions on which $(u, v)$ is critical, the distance of $u$ grows by at least $2$. Distances of vertices on augmenting paths (other than $t$) are at most $n - 2$, so each of the at most $2m$ possible residual edges is critical at most $n/2$ times, and there are at most $nm$ augmentations. Each costs $O(m)$ for the BFS and the update, giving $O(nm^2)$. The bound does not depend on the capacities, so the algorithm terminates even with irrational capacities.
:::

```python
from collections import deque

def max_flow(cap, s, t):
    """Edmonds-Karp. cap: dict of dicts of capacities. Returns (value, flow)."""
    res = {u: dict(nbrs) for u, nbrs in cap.items()}     # residual capacities
    for u in cap:
        for v in cap[u]:
            res.setdefault(v, {}).setdefault(u, 0)       # reverse residual edges
    value = 0
    while True:
        parent = {s: None}                               # BFS in the residual graph
        queue = deque([s])
        while queue and t not in parent:
            u = queue.popleft()
            for v, c in res[u].items():
                if c > 0 and v not in parent:
                    parent[v] = u
                    queue.append(v)
        if t not in parent:
            break                                        # no augmenting path left
        path, v = [], t
        while parent[v] is not None:
            path.append((parent[v], v)); v = parent[v]
        b = min(res[u][v] for u, v in path)              # bottleneck
        for u, v in path:
            res[u][v] -= b
            res[v][u] += b
        value += b
        print('augment', [u for u, _ in reversed(path)] + [t], 'by', b)
    flow = {(u, v): cap[u][v] - res[u][v] for u in cap for v in cap[u]}
    return value, flow, set(parent)                      # parent = reachable set

if __name__ == '__main__':
    cap = {'s': {'a': 16, 'c': 13}, 'a': {'b': 12}, 'b': {'c': 9, 't': 20},
           'c': {'a': 4, 'd': 14}, 'd': {'b': 7, 't': 4}, 't': {}}
    value, flow, S = max_flow(cap, 's', 't')
    print(value, sorted(S))
```

```console
$ python3 flow.py
augment ['s', 'a', 'b', 't'] by 12
augment ['s', 'c', 'd', 't'] by 4
augment ['s', 'c', 'd', 'b', 't'] by 7
23 ['a', 'c', 'd', 's']
```

(The function returns, besides the value and the flow, the set of vertices reached by the last, unsuccessful BFS — the source side of a minimum cut. It assumes, as in [[#def-flow]], that there are no antiparallel edges.)

::: example Edmonds–Karp step by step {#ex-edmonds-karp}
Explain the three augmentations printed for the network of the figure, and verify the minimum cut.
::: solution
1. BFS finds the shortest path $s, a, b, t$ (three edges), with residual capacities $16, 12, 20$; the bottleneck is $12$. Now $a \to b$ is saturated, and residual edges $b \to a$ (12), $a \to s$ (12) and $t \to b$ (12) appear.
2. The next shortest path is $s, c, d, t$ with capacities $13, 14, 4$: bottleneck $4$, saturating $d \to t$.
3. The paths of three edges are gone; BFS finds $s, c, d, b, t$ (four edges), with residual capacities $13 - 4 = 9$, $14 - 4 = 10$, $7$ and $20 - 12 = 8$: bottleneck $7$, saturating $d \to b$.

The value is $12 + 4 + 7 = 23$. In the final residual network $s$ reaches $c$ (residual $2$), $a$ (residual $4$) and, from $c$, $d$ (residual $3$); from $a$ the only forward edge $a \to b$ is saturated, and from $d$ both $d \to b$ and $d \to t$ are saturated. So $S = \{s, a, c, d\}$ and the cut edges are $a \to b$ ($12$), $d \to b$ ($7$) and $d \to t$ ($4$), of total capacity $23$, equal to the flow — a certificate that both are optimal. The edge $b \to c$ goes from $T$ to $S$ and does not count in the capacity; it carries no flow, as the proof of [[#thm-maxflow-mincut]] requires.
:::
:::

Faster algorithms exist. Dinic's algorithm (1970) augments along all shortest paths at once in $O(n^2m)$; push–relabel methods (Goldberg and Tarjan, 1988) run in $O(n^3)$ or better and are fast in practice; and in 2022 Chen, Kyng, Liu, Peng, Probst Gutenberg and Sachdeva announced an algorithm running in $m^{1+o(1)}$ time (almost linear), a theoretical breakthrough not yet used in practice as of 2026.

::: quiz
After a maximum flow has been found, which edges of the original network can cross a minimum cut $(S, T)$ from $S$ to $T$?

- [x] Only saturated edges ($f = c$)
- [ ] Only edges with zero flow
- [ ] Any edges, as long as their capacities sum to $\lvert f\rvert$
- [ ] Edges in both directions, carrying flow
::: solution
For any maximum flow $f$ and minimum cut, $\lvert f\rvert = f(S, T) \le c(S, T) = \lvert f\rvert$ forces equality in the proof of [[#lem-cut-flow]]: every edge from $S$ to $T$ is saturated and every edge from $T$ to $S$ carries zero flow. This holds for every minimum cut, not only the one found by the residual search, and is a useful check of a computed answer.
:::
:::

## Bipartite matching

A **matching** in an undirected graph is a set of edges no two of which share a vertex. In a bipartite graph with sides $L$ and $R$ — applicants and jobs, students and projects, musicians and instruments — a **maximum matching** pairs up as many vertices as possible, each pair joined by an edge.

::: algorithm Matching by maximum flow {#alg-matching}
Given a bipartite graph $G = (L \cup R, E)$, build a flow network $G'$: add a source $s$ with an edge $s \to u$ of capacity $1$ for each $u \in L$, a sink $t$ with an edge $v \to t$ of capacity $1$ for each $v \in R$, and direct each edge $\{u, v\} \in E$ from $u \in L$ to $v \in R$ with capacity $1$. Compute an integral maximum flow $f$ in $G'$ (by [[#thm-integrality]]) and return $M = \{\{u, v\} \in E : f(u, v) = 1\}$.
:::

::: theorem Matchings are integral flows {#thm-matching}
The maximum size of a matching in $G$ equals the maximum flow value in $G'$, and [[#alg-matching]] returns a maximum matching, in $O(nm)$ time with Ford–Fulkerson.
:::

::: proof
*Matching to flow:* from a matching $M$, send one unit along $s \to u \to v \to t$ for each $\{u, v\} \in M$. Capacities hold because each vertex is in at most one edge of $M$, and conservation holds by construction; the value is $\lvert M\rvert$. *Flow to matching:* let $f$ be an integral flow. Every edge has capacity $1$, so each $f(u, v) \in \{0, 1\}$. A vertex $u \in L$ receives at most $1$ unit (from $s$), so by conservation at most one edge out of $u$ carries flow; likewise each $v \in R$ sends at most $1$ to $t$, so at most one edge into $v$ carries flow. Hence $M = \{\{u, v\} : f(u, v) = 1\}$ is a matching, and $\lvert M\rvert = f(\{s\} \cup L, R \cup \{t\}) = \lvert f\rvert$ by [[#lem-cut-flow]]. So maximum matchings and maximum integral flows have the same size, and integral maximum flows are maximum flows. *Time:* $\lvert f^\ast\rvert \le \lvert L\rvert \le n$ augmentations, each $O(n + m)$.
:::

```python
from flow import max_flow

def max_matching(left, right, edges):
    """Maximum bipartite matching by reduction to maximum flow."""
    cap = {'s': {u: 1 for u in left}, 't': {}}
    for u in left:
        cap[u] = {}
    for v in right:
        cap[v] = {'t': 1}
    for u, v in edges:
        cap[u][v] = 1                    # capacity 1 suffices (any >= 1 works)
    value, flow, _ = max_flow(cap, 's', 't')
    return value, sorted((u, v) for u, v in edges if flow[(u, v)] == 1)

left = ['Ana', 'Ben', 'Cai', 'Dev']
right = ['cello', 'drums', 'flute', 'harp']
edges = [('Ana', 'cello'), ('Ana', 'flute'), ('Ben', 'cello'),
         ('Cai', 'drums'), ('Cai', 'flute'), ('Cai', 'harp'), ('Dev', 'cello')]
print(max_matching(left, right, edges))
```

```console
$ python3 matching.py
augment ['s', 'Ana', 'cello', 't'] by 1
augment ['s', 'Cai', 'drums', 't'] by 1
augment ['s', 'Ben', 'cello', 'Ana', 'flute', 't'] by 1
(3, [('Ana', 'flute'), ('Ben', 'cello'), ('Cai', 'drums')])
```

::: example An alternating path {#ex-matching}
Explain the third augmentation in the output, and why no matching of size $4$ exists.
::: solution
After matching Ana–cello and Cai–drums, BFS finds $s$, Ben, cello, Ana, flute, $t$. The step cello $\to$ Ana uses the *backward* residual edge of the flow on Ana $\to$ cello: it un-assigns the cello from Ana, gives it to Ben, and moves Ana to the flute. In matching terms, the augmenting path alternates between edges not in the matching (Ben–cello, Ana–flute) and edges in it (Ana–cello), and flipping them grows the matching by one — this is an **alternating path**, the basis of all matching algorithms. No matching has size $4$: Ben and Dev can each play only the cello, so they cannot both be matched. In flow terms, the cut with source side $\{s, \text{Ben}, \text{Dev}, \text{cello}\}$ has capacity $c(s, \text{Ana}) + c(s, \text{Cai}) + c(\text{cello}, t) = 3$.
:::
:::

::: widget graph
nodes: Ana@0,3; Ben@0,2; Cai@0,1; Dev@0,0; cello@2,3; drums@2,2; flute@2,1; harp@2,0
edges: Ana-cello; Ana-flute; Ben-cello; Cai-drums; Cai-flute; Cai-harp; Dev-cello
algorithm: colour
caption: The musicians and instruments of the example as a bipartite graph. Greedy colouring confirms that two colours suffice — musicians on one side, instruments on the other. A maximum matching has $3$ edges, for example Ana–flute, Ben–cello, Cai–drums; Ben and Dev compete for the cello, the only instrument either can play, which is Hall's obstruction (see the exercises): a set of $2$ musicians with only $1$ instrument between them.
:::

The specialised **Hopcroft–Karp algorithm** (1973) finds a maximum bipartite matching in $O(m\sqrt n)$ time by augmenting along a maximal set of vertex-disjoint shortest alternating paths in each phase; after $\sqrt n$ phases at most $\sqrt n$ further augmentations remain.

## More reductions

Flow networks model far more than pipes. Each reduction is proved in two directions, as for matching: a solution of the original problem gives a flow of the corresponding value, and an integral flow gives a solution.

- **Edge-disjoint paths.** The maximum number of edge-disjoint paths from $s$ to $t$ in a directed graph equals the maximum flow with all capacities $1$ — and, by the max-flow min-cut theorem, the minimum number of edges whose removal disconnects $t$ from $s$. This is **Menger's theorem** (1927), here obtained as a corollary.
- **Vertex capacities** are handled by splitting each vertex $v$ into $v_{\text{in}} \to v_{\text{out}}$ with an edge of the vertex's capacity.
- **Multiple sources and sinks** are joined to a super-source and a super-sink with edges of infinite capacity.
- **Assignment with capacities** — each project takes up to $k$ students, each student does one project from an approved list — is matching with capacity $k$ on the project-to-sink edges.
- **Image segmentation** into foreground and background, with penalties for separating similar neighbouring pixels, is a minimum cut.

::: quiz
To find the maximum number of paths from $s$ to $t$ in a directed graph that share no *vertices* other than $s$ and $t$, which network do you build?

- [ ] The graph with capacity $1$ on every edge
- [x] Each vertex $v \ne s, t$ split into $v_{\text{in}} \to v_{\text{out}}$ with capacity $1$, edges entering $v$ redirected to $v_{\text{in}}$ and edges leaving it to leave from $v_{\text{out}}$
- [ ] The graph with capacity $1$ on every edge and capacity $\infty$ on edges at $s$ and $t$
- [ ] The undirected version of the graph with unit capacities
::: solution
Unit edge capacities only prevent sharing *edges*: two paths could still pass through the same vertex using different edges. Splitting each vertex puts a capacity of $1$ on the vertex itself, since all flow through $v$ must use the edge $v_{\text{in}} \to v_{\text{out}}$. With integral flows, a maximum flow then decomposes into that many internally vertex-disjoint paths — the vertex version of Menger's theorem.
:::
:::

::: history
The maximum-flow problem was formulated by T. E. Harris and F. S. Ross in a 1955 RAND report, classified until 1999, on the capacity of the Soviet and Eastern European railway network; their minimum cut was the set of lines an air force would need to interdict. Lester Ford Jr. and Delbert Fulkerson proved the max-flow min-cut theorem and gave the augmenting-path method in "Maximal flow through a network" (1956, *Canadian Journal of Mathematics*); Peter Elias, Amiel Feinstein and Claude Shannon proved the theorem independently the same year. Jack Edmonds and Richard Karp published the shortest-augmenting-path algorithm and its polynomial bound in 1972, and Yefim Dinitz (Dinic) had given a related $O(n^2m)$ algorithm in the Soviet Union in 1970. John Hopcroft and Richard Karp's $O(m\sqrt n)$ matching algorithm appeared in 1973. Matching theory is older: Dénes Kőnig (1931) and Jenő Egerváry proved the min-max theorem for bipartite matchings, Philip Hall his marriage theorem (1935), and Harold Kuhn's "Hungarian method" (1955) for weighted assignment was named in their honour.
:::

## Where this leads

Max-flow min-cut is the first example of **duality**: a maximisation problem whose optimum equals that of a related minimisation problem. Linear programming generalises it, and both flows and cuts are linear programs dual to each other. Minimum-cost flow, weighted matching (the Hungarian algorithm) and general (non-bipartite) matching (Edmonds' blossom algorithm, 1965) extend this chapter. [[algorithms/randomised-algorithms]] gives a completely different, randomised approach to *global* minimum cuts, with no source or sink. Reductions between problems — translating one problem into another, as we did for matching — are the central tool of [[complexity]].

::: summary
- A **flow** respects capacities and is conserved at internal vertices; its value is the net outflow of $s$ ([[#def-flow]]). Every cut's capacity bounds every flow's value ([[#lem-cut-flow]]).
- The **residual network** has forward edges with spare capacity and backward edges that cancel flow; augmenting along an $s$–$t$ path in it increases the flow by its bottleneck ([[#lem-augment]]).
- **Max-flow min-cut**: $f$ is maximum ⇔ no augmenting path ⇔ $\lvert f\rvert$ equals some cut's capacity ([[#thm-maxflow-mincut]]). The vertices reachable in the final residual network give a minimum cut.
- With integer capacities, Ford–Fulkerson terminates with an **integral** maximum flow in $O(m\lvert f^\ast\rvert)$ ([[#thm-integrality]]); with careless path choices this can be exponential, and with irrational capacities it may not terminate.
- **Edmonds–Karp** (BFS augmenting paths) runs in $O(nm^2)$: residual distances never decrease ([[#lem-ek-monotone]]), and each edge is critical $O(n)$ times ([[#thm-edmonds-karp]]).
- **Bipartite matching** reduces to flow with unit capacities ([[#thm-matching]]); augmenting paths become alternating paths. Hopcroft–Karp takes $O(m\sqrt n)$.
:::

## Exercises

::: exercise A cut's capacity {level=1 check="42"}
In the network of the figure, what is the capacity of the cut with $S = \{s, a, b\}$? (Enter the capacity.)
::: solution
The edges from $S = \{s, a, b\}$ to $T = \{c, d, t\}$ are $s \to c$ ($13$), $b \to c$ ($9$) and $b \to t$ ($20$); the edges $c \to a$ and $d \to b$ go from $T$ to $S$ and do not count. The edge $a \to b$ lies inside $S$. The capacity is $13 + 9 + 20 = 42$, well above the maximum flow $23$, as [[#lem-cut-flow]] requires.
:::
:::

::: exercise Residual network {level=1}
For the flow $f(s, a) = 2$, $f(a, t) = 2$, $f(s, b) = 0$, $f(b, t) = 0$, $f(a, b) = 0$ in the network with capacities $c(s, a) = 2$, $c(s, b) = 3$, $c(a, t) = 3$, $c(b, t) = 1$, $c(a, b) = 2$, draw the residual network and find an augmenting path.
::: solution
Residual edges: $s \to a$ has $c_f = 0$ (saturated), $a \to s$ has $2$; $s \to b$: $3$; $a \to t$: $1$, $t \to a$: $2$; $b \to t$: $1$; $a \to b$: $2$. An augmenting path is $s \to b \to t$ with bottleneck $1$; afterwards $s$ can still reach $b$ (residual $2$), but $b \to t$ is saturated and $b$ has no other outgoing residual edge (there is no residual edge $b \to a$, since $f(a, b) = 0$). So the maximum flow is $3$, with minimum cut $S = \{s, b\}$: edges $s \to a$ ($2$) and $b \to t$ ($1$).
:::
:::

::: exercise Disjoint paths {level=2 check="2"}
In the directed graph with edges $s \to a$, $s \to b$, $a \to b$, $a \to c$, $b \to c$, $c \to t$, $b \to t$, what is the maximum number of edge-disjoint paths from $s$ to $t$? Give the paths and a matching cut. (Enter the number.)
::: solution
Two: $s \to a \to c \to t$ and $s \to b \to t$. No three exist, because $s$ has only two outgoing edges, $\{s \to a, s \to b\}$, which form a cut of size $2$. By Menger's theorem (max-flow min-cut with unit capacities) the maximum is exactly $2$.
:::
:::

::: exercise Hall's theorem {level=2}
Prove **Hall's theorem**: a bipartite graph with sides $L$ and $R$ has a matching that covers every vertex of $L$ if and only if every set $A \subseteq L$ has at least $\lvert A\rvert$ neighbours in $R$.
::: solution
($\Rightarrow$) The partners of $A$ in such a matching are distinct neighbours of $A$. ($\Leftarrow$) Suppose there is no matching of size $\lvert L\rvert$. Then the maximum flow in $G'$ of [[#alg-matching]] is less than $\lvert L\rvert$, so there is a cut $(S, T)$ with $c(S, T) < \lvert L\rvert$. Give the $L \to R$ edges capacity $\lvert L\rvert + 1$ instead of $1$ (this changes no matching sizes, as the proof of [[#thm-matching]] shows); then a cut of capacity $< \lvert L\rvert$ contains no $L \to R$ edge. Let $A = L \cap S$. Every neighbour of $A$ is in $S$ (else an $L\to R$ edge would cross), so $c(S, T) \ge \lvert L \setminus A\rvert + \lvert N(A)\rvert$, counting the edges $s \to u$ for $u \in L \setminus A$ and $v \to t$ for $v \in N(A)$. From $\lvert L\setminus A\rvert + \lvert N(A)\rvert < \lvert L\rvert$ we get $\lvert N(A)\rvert < \lvert A\rvert$, violating Hall's condition.
:::
:::

::: exercise A slow Ford–Fulkerson run {level=2 check="2000"}
On the network $s \to a$, $s \to b$, $a \to t$, $b \to t$ of capacity $1000$ and $a \to b$ of capacity $1$, how many augmentations does Ford–Fulkerson make if it always alternates between the paths $s, a, b, t$ and $s, b, a, t$? (Enter the number.) How many does Edmonds–Karp make?
::: solution
Each of these paths has bottleneck $1$: the first uses $a \to b$ (capacity $1$), and the second uses the backward residual edge $b \to a$ (residual $1$ after the first). Each augmentation adds $1$, and the maximum flow is $2000$, so $2000$ augmentations. Edmonds–Karp chooses shortest paths, of two edges: $s, a, t$ and $s, b, t$, each with bottleneck $1000$ — two augmentations.
:::
:::

::: exercise Project allocation {level=2}
Each of $n$ students lists acceptable projects; project $j$ can take at most $k_j$ students; each student needs exactly one project. Model the problem as a maximum flow, and prove that every student can be placed if and only if the maximum flow equals $n$.
::: solution
Network: $s \to$ each student (capacity $1$), student $\to$ each acceptable project (capacity $1$), project $j \to t$ (capacity $k_j$). An assignment gives a flow of value $n$ (one unit per student along its project), respecting the capacities $k_j$. Conversely an integral flow of value $n$ ([[#thm-integrality]]) sends one unit out of each student (all $s$-edges are saturated, since the cut $\{s\}$ has capacity $n$), along exactly one student–project edge (integral and capacity $1$), and at most $k_j$ units enter project $j$; reading off these edges gives a valid assignment.
:::
:::

::: exercise Updating a maximum flow {level=3}
A maximum flow $f$ is known in a network with integer capacities. One edge's capacity is increased by $1$. Show how to compute a new maximum flow in $O(n + m)$ time. What if one edge's capacity is *decreased* by $1$?
::: solution
*Increase:* $f$ is still a flow, and the maximum increases by at most $1$ (every cut's capacity increases by at most $1$, and a minimum cut bounds the flow). Search once for an augmenting path in the new residual network ($O(n + m)$); if there is one, augment by $1$ (integer bottleneck $\ge 1$, and the value cannot rise by more), otherwise $f$ is still maximum. *Decrease of $(u, v)$:* if $f(u, v) \le c(u, v) - 1$, $f$ is still feasible and maximum (capacities only shrank). Otherwise $f(u, v) = c(u, v)$ exceeds the new capacity by $1$. Since flow is integral and conserved, there is a path carrying flow from $s$ to $u$ and from $v$ to $t$ (decompose the flow into paths); cancel one unit along $s \leadsto u \to v \leadsto t$, making $f$ feasible with value $\lvert f\rvert - 1$. Then one more augmenting-path search restores maximality, if possible, by $1$. Both steps are $O(n + m)$.
:::
:::

::: exercise König's theorem {level=3}
A **vertex cover** of a graph is a set of vertices touching every edge. Prove **König's theorem**: in a bipartite graph, the maximum size of a matching equals the minimum size of a vertex cover.
::: solution
Every matching edge needs its own cover vertex (matching edges share no vertices), so $\lvert M\rvert \le \lvert C\rvert$ for every matching $M$ and cover $C$. For equality, build $G'$ as in [[#alg-matching]] but with capacity $\infty$ (or $n + 1$) on the $L \to R$ edges; by [[#thm-matching]] its maximum flow is still the maximum matching size $\nu$, so there is a cut $(S, T)$ of capacity $\nu$, which contains no $L \to R$ edge. Let $C = (L \cap T) \cup (R \cap S)$; then $\lvert C\rvert = c(S, T) = \nu$, counting $s \to u$ for $u \in L \cap T$ and $v \to t$ for $v \in R \cap S$. $C$ is a cover: an edge $\{u, v\}$ with $u \in L$, $v \in R$ and neither endpoint in $C$ would have $u \in S$ and $v \in T$, an infinite-capacity edge crossing the cut — impossible.
:::
:::
