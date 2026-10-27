The forwarding tables of [[networks/network-layer]] tell each router where to send each packet. Someone has to fill them in. In a small network an administrator could type the entries by hand, but the internet has tens of thousands of independently run networks, millions of routers and about a million IPv4 prefixes, links fail and recover every minute somewhere, and no one is in charge of the whole. The tables must be computed by the routers themselves, by exchanging messages with their neighbours, and they must adapt within seconds when something breaks.

That is the **routing** problem, and the internet solves it at two levels. Within one network — a university, a company, an ISP — routers find least-cost paths with a routing algorithm such as Dijkstra's or Bellman–Ford, run as a distributed protocol: **link-state** routing, in which every router learns the whole map and computes paths itself, or **distance-vector** routing, in which routers exchange only their current distances. Between networks, where each network has its own commercial interests and will not reveal its internal map, routing follows **policy**, and the protocol is BGP. This chapter studies both levels, with proofs of the algorithms' correctness, the strange failure of distance-vector routing known as count-to-infinity, and the ways BGP can go wrong and be protected. Shortest-path algorithms themselves are developed in [[algorithms/shortest-paths]]; here we focus on running them in a network.

## The routing problem

::: definition Routing as a graph problem {#def-routing}
Model a network as a graph $G = (V, E)$ whose vertices are routers and whose edges are links, each with a positive **cost** $c(x, y)$ set by the administrator — often inversely proportional to the link's rate, or reflecting its distance or price. The cost of a path is the sum of the costs of its links. **Routing** computes, for every router $x$ and destination $y$, a **least-cost path** from $x$ to $y$; $x$'s forwarding table then records the first link of that path, the **next hop**. A routing algorithm is **centralised** (global) if each router computes paths from a complete map of the network, and **decentralised** if routers compute them iteratively from information exchanged with their neighbours.
:::

Two facts about least-cost paths underlie every routing algorithm. First, subpaths of least-cost paths are least-cost: if the best path from $x$ to $y$ passes through $v$, its part from $v$ to $y$ is a best path from $v$ to $y$. So the next-hop tables are consistent — if $x$ sends a packet to $v$, $v$'s own table continues it along the rest of $x$'s best path, and the hop-by-hop forwarding of IP delivers it along a least-cost path. Second, the least costs $D_x(y)$ satisfy the **Bellman–Ford equation**

$$
D_x(y) = \min_{v \text{ a neighbour of } x} \bigl( c(x, v) + D_v(y) \bigr), \qquad D_y(y) = 0,
$$ {#eq-bellman-ford}

since a path from $x$ must begin with a link to some neighbour $v$ and then go on from $v$ as cheaply as possible.

## Link-state routing

In a **link-state** protocol, each router tells every other router about its own links, so that every router assembles the same complete map and computes least-cost paths on its own.

1. Each router discovers its neighbours and the costs of its links (by exchanging *hello* messages on each link).
2. It packages them in a **link-state advertisement** (LSA) — "I am $x$, my links are to $v_1$ at cost $c_1$, …" — with a sequence number that increases with each new version.
3. It **floods** the LSA: it sends it on all its links, and every router that receives an LSA newer than the one it has stores it and forwards it on all its other links. Older or duplicate LSAs are discarded, so flooding stops.
4. When anything changes, the router floods a new LSA. Each router runs Dijkstra's algorithm on its map whenever the map changes.

::: algorithm Dijkstra's algorithm {#alg-dijkstra}
Input: a graph with positive link costs and a source $s$. Output: $D(v)$, the least cost from $s$ to every $v$, and $p(v)$, the predecessor of $v$ on a least-cost path.

1. $N \gets \set{}$; $D(s) \gets 0$; $D(v) \gets \infty$ for every $v \ne s$.
2. While some vertex is not in $N$:
   1. Choose $u \notin N$ with $D(u)$ minimal, and add $u$ to $N$ (**settle** $u$).
   2. For each neighbour $v \notin N$ of $u$: if $D(u) + c(u, v) < D(v)$, set $D(v) \gets D(u) + c(u, v)$ and $p(v) \gets u$.
:::

::: theorem Correctness of Dijkstra's algorithm {#thm-dijkstra}
With positive link costs, when a vertex $u$ is settled, $D(u)$ equals the least cost from $s$ to $u$, and following predecessors from $u$ gives a least-cost path.
:::

::: proof
We prove by induction on the number of settled vertices that every settled vertex has $D$ equal to its least cost $\delta$, and that for every unsettled vertex $v$, $D(v)$ is the least cost of a path from $s$ to $v$ whose vertices, apart from $v$, are all settled. Both hold after $s$ is settled. Suppose they hold and $u$ is the next vertex settled. Take any path $P$ from $s$ to $u$, and let $y$ be its first vertex not in $N$ (it exists, as $u \notin N$). The part of $P$ up to $y$ uses only settled vertices before $y$, so it costs at least $D(y)$ by the second hypothesis, and the rest of $P$ costs at least $0$; hence $\text{cost}(P) \ge D(y) \ge D(u)$, since $u$ was chosen with minimal $D$. So no path beats $D(u)$, which is itself the cost of a path (through settled vertices), and $D(u) = \delta(u)$. After settling $u$, step 2.2 considers exactly the new paths whose last settled vertex is $u$, which restores the second hypothesis. The predecessors record the paths achieving each $D$.
:::

::: example Dijkstra on a small network {#ex-dijkstra}
Compute router A's least-cost paths and forwarding table in the network of the figure below: links A–B 4, A–C 1, B–C 2, B–D 5, C–D 8, C–E 10, D–E 2, D–F 6, E–F 3.
::: solution
Each row shows the settled set after one step, and the tentative cost and predecessor of each unsettled router:

| settled $N$ | B | C | D | E | F |
|---|---|---|---|---|---|
| A | $4$, A | $1$, A | $\infty$ | $\infty$ | $\infty$ |
| A C | $3$, C | | $9$, C | $11$, C | $\infty$ |
| A C B | | | $8$, B | $11$, C | $\infty$ |
| A C B D | | | | $10$, D | $14$, D |
| A C B D E | | | | | $13$, E |
| A C B D E F | | | | | |

The same computation in Python, with a priority queue (the standard implementation, costing $O((n + m)\log n)$ for $n$ routers and $m$ links):

```python
# dijkstra.py: least-cost paths from one router, as computed by a link-state protocol
import heapq

def dijkstra(graph, source):
    dist, prev = {source: 0}, {source: None}
    done, heap = set(), [(0, source)]
    while heap:
        d, u = heapq.heappop(heap)
        if u in done:
            continue                             # a stale entry: u was settled earlier
        done.add(u)
        print(f"settle {u} at distance {d}")
        for v, w in graph[u].items():
            if v not in done and d + w < dist.get(v, float("inf")):
                dist[v], prev[v] = d + w, u
                heapq.heappush(heap, (d + w, v))
    return dist, prev

def first_hop(prev, source, dest):               # the forwarding-table entry for dest
    while prev[dest] != source:
        dest = prev[dest]
    return dest

edges = {("A", "B"): 4, ("A", "C"): 1, ("B", "C"): 2, ("B", "D"): 5, ("C", "D"): 8,
         ("C", "E"): 10, ("D", "E"): 2, ("D", "F"): 6, ("E", "F"): 3}
graph = {}
for (u, v), w in edges.items():                  # links are bidirectional
    graph.setdefault(u, {})[v] = w
    graph.setdefault(v, {})[u] = w
dist, prev = dijkstra(graph, "A")
for d in sorted(dist):
    if d != "A":
        print(f"{d}: cost {dist[d]}, next hop {first_hop(prev, 'A', d)}")
```

```console
$ python3 dijkstra.py
settle A at distance 0
settle C at distance 1
settle B at distance 3
settle D at distance 8
settle E at distance 10
settle F at distance 13
B: cost 3, next hop C
C: cost 1, next hop C
D: cost 8, next hop C
E: cost 10, next hop C
F: cost 13, next hop C
```

Notice that A's best path to its direct neighbour B goes through C ($1 + 2 = 3 < 4$), and that every destination is reached through C, so A's forwarding table has a single next hop. Each other router computes its own table from the same map.
:::
:::

::: widget graph
nodes: A@0,2; B@2,4; C@2,0; D@4,4; E@4,0; F@6,2
edges: A-B:4; A-C:1; B-C:2; B-D:5; C-D:8; C-E:10; D-E:2; D-F:6; E-F:3
algorithm: dijkstra
start: A
caption: The network of [[#ex-dijkstra]]. Step through Dijkstra's algorithm from A and compare each step with the table in the example: the settled set grows by the closest unsettled router each time. Then change the start to another router, or drag a router and edit a cost in your head — say, A–B becomes 1 — and predict which next hops change. A link-state protocol reruns exactly this computation in every router whenever a new link-state advertisement arrives.
:::

Flooding costs messages: each LSA crosses each link about once in each direction, so a single change costs $O(m)$ messages, and the computation costs $O((n + m) \log n)$ per router. In exchange, convergence is fast — as soon as the new LSA has reached a router, its paths are right — and every router can check its map. One pitfall: if link costs depend on the load, routes can **oscillate** — traffic moves to the cheap path, which becomes expensive, so it moves back — which is why costs in practice are static, set by administrators.

## Distance-vector routing

In a **distance-vector** protocol, a router never learns the whole map. Each router $x$ keeps only its **distance vector** $D_x = (D_x(y) : y \in V)$, its current estimate of its least cost to each destination, and the vectors last received from its neighbours, and it applies [[#eq-bellman-ford]] locally.

::: algorithm Distance-vector routing {#alg-dv}
At each router $x$:

1. Initially, $D_x(x) = 0$, $D_x(y) = c(x, y)$ for neighbours $y$ and $\infty$ for all other $y$; send $D_x$ to every neighbour.
2. Whenever a link cost $c(x, v)$ changes or a new vector $D_v$ arrives from a neighbour $v$:
   1. For each destination $y$: $D_x(y) \gets \min_v \bigl(c(x, v) + D_v(y)\bigr)$, and record the minimising $v$ as the next hop for $y$.
   2. If $D_x$ changed, send it to every neighbour.
:::

The algorithm is **iterative** (it continues until no vector changes), **asynchronous** (routers need not act in lockstep) and **distributed** (each router uses only its neighbours' information). The basic correctness result is easiest to state for synchronous rounds.

::: theorem Convergence of synchronous distance-vector routing {#thm-dv}
Suppose all routers start with $D_x(y) = 0$ for $x = y$ and $\infty$ otherwise, and in each round every router replaces its vector using its neighbours' vectors from the previous round. Then after round $k$, $D_x(y)$ is the least cost of a path from $x$ to $y$ with at most $k$ links. Consequently all vectors equal the true least costs after at most $n - 1$ rounds, and do not change afterwards.
:::

::: proof
By induction on $k$. For $k = 0$ the only path with no links is the empty path from $y$ to itself, of cost $0$, matching the initial vectors. Suppose the claim holds after round $k$. A path from $x \ne y$ to $y$ with at most $k + 1$ links consists of a first link $(x, v)$ followed by a path from $v$ with at most $k$ links; the cheapest such path costs $\min_v (c(x, v) + D^{(k)}_v(y))$, which is exactly what round $k + 1$ computes, by the induction hypothesis. (For $x = y$ the value stays $0$, as costs are positive.) Since link costs are positive, a least-cost path never repeats a vertex, so it has at most $n - 1$ links; after round $n - 1$ every $D_x(y)$ is the true least cost, and further rounds compute the same values.
:::

::: example Distance vectors converging {#ex-dv}
Three routers X, Y, Z are joined by links X–Y of cost 3, Y–Z of cost 1 and X–Z of cost 6. Starting from vectors that know only the direct links (step 1 of [[#alg-dv]]), compute the vectors after each synchronous round.
::: solution
Write each vector as (distance to X, to Y, to Z).

| round | $D_X$ | $D_Y$ | $D_Z$ |
|---|---|---|---|
| start | $(0, 3, 6)$ | $(3, 0, 1)$ | $(6, 1, 0)$ |
| 1 | $(0, 3, 4)$ | $(3, 0, 1)$ | $(4, 1, 0)$ |
| 2 | $(0, 3, 4)$ | $(3, 0, 1)$ | $(4, 1, 0)$ |

In round 1, X computes $D_X(Z) = \min(c(X, Y) + D_Y(Z),\ c(X, Z) + D_Z(Z)) = \min(3 + 1, 6 + 0) = 4$ via Y, and Z symmetrically finds $D_Z(X) = 4$ via Y; Y's vector is already correct. In round 2 nothing changes, so no router sends a new vector and the protocol is quiet. (Starting from the direct-link vectors is one round ahead of the all-$\infty$ start of [[#thm-dv]].) The link X–Z is never used, because the two-hop path through Y is cheaper.
:::
:::

Asynchronous versions also converge to the correct costs from any starting state, provided updates keep happening and costs are positive and fixed (Bertsekas and Gallager prove this). But "any starting state" includes states that are badly wrong, and convergence from them can be very slow.

### Good news travels fast, bad news slowly

When a link's cost *decreases*, the new information spreads one hop per exchange, as in [[#thm-dv]]. When a link *fails* or its cost increases, something worse can happen.

::: example Count to infinity {#ex-count-to-infinity}
Three routers form a line, A — B — C, with link costs 1. In the converged state $D_A(C) = 2$ (via B) and $D_B(C) = 1$. Then the link B–C fails. Using synchronous updates, with $16$ standing for infinity (as in RIP), trace $D_A(C)$ and $D_B(C)$.
::: solution
B no longer has a link to C, but it still has A's last vector, which says $D_A(C) = 2$. B does not know that A's route goes through B itself, so it concludes that it can reach C via A at cost $1 + 2 = 3$. A then hears $D_B(C) = 3$ and sets $D_A(C) = 1 + 3 = 4$; B hears 4 and sets 5; and so on, two steps up every two rounds:

```python
# dv.py: distance-vector routing to destination C, before and after link B-C fails
INF = 16                                         # RIP's "infinity"

def run(cost, dist, via, rounds, poison=False):
    """Synchronous rounds of the Bellman-Ford update at every node except C."""
    history = [dict(dist)]
    for _ in range(rounds):
        # what each node advertises to each neighbour (poisoned reverse: INF
        # to the neighbour through which it routes)
        adv = {(u, v): (INF if poison and via.get(u) == v else dist[u])
               for (u, v) in cost}
        new, newvia = dict(dist), dict(via)
        for x in dist:
            if x == "C":
                continue
            options = [(min(INF, c + adv[(v, x)]), v) for (u, v), c in cost.items() if u == x]
            new[x], newvia[x] = min(options) if options else (INF, None)
        if new == dist:
            break
        dist, via = new, newvia
        history.append(dict(dist))
    return history

def links(pairs):                                # undirected links as directed pairs
    return {**{(u, v): c for (u, v), c in pairs.items()}, **{(v, u): c for (u, v), c in pairs.items()}}

after = links({("A", "B"): 1})                   # B-C has failed
start = {"A": 2, "B": 1, "C": 0}
for poison in (False, True):
    h = run(after, start, {"A": "B", "B": "C"}, rounds=30, poison=poison)
    print("poisoned reverse" if poison else "plain", "-> rounds:", len(h) - 1)
    print("  A:", [d["A"] for d in h])
    print("  B:", [d["B"] for d in h])
```

```console
$ python3 dv.py
plain -> rounds: 15
  A: [2, 2, 4, 4, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 16, 16]
  B: [1, 3, 3, 5, 5, 7, 7, 9, 9, 11, 11, 13, 13, 15, 15, 16]
poisoned reverse -> rounds: 2
  A: [2, 2, 16]
  B: [1, 16, 16]
```

Without a cap the costs would rise for ever; with RIP's infinity of 16 the routers take 15 rounds to agree that C is unreachable, and meanwhile packets for C bounce between A and B until their TTL expires. With **poisoned reverse** — A, whose route to C goes through B, tells B that its distance to C is infinite — B learns immediately that it has no route, and both routers agree within two rounds.
:::
:::

::: widget plot
f: min(16, 2*floor(x/2) + 2); min(16, 2*floor((x + 1)/2) + 1)
x: 0, 16
y: 0, 17
labels: D_A(C); D_B(C)
points: 0,2; 1,2; 2,4; 3,4; 4,6; 5,6; 6,8; 7,8; 8,10; 9,10; 10,12; 11,12; 12,14; 13,14; 14,16; 15,16; 0,1; 1,3; 2,3; 3,5; 4,5; 5,7; 6,7; 7,9; 8,9; 9,11; 10,11; 11,13; 12,13; 13,15; 14,15; 15,16
caption: Count to infinity in [[#ex-count-to-infinity]]: the distances to C believed by A and by B in each synchronous round after the link B–C fails, as printed by `dv.py` (the dots), with the staircases that fit them. The two routers take turns raising their estimates by two, each relying on the other's stale route, until they reach RIP's infinity of 16 after 15 rounds. With poisoned reverse the same failure is recognised in two rounds. With a larger "infinity", the count would take longer: the bound trades convergence time against the largest network diameter the protocol can serve.
:::

The underlying problem is that a distance vector says *how far* but not *which way*, so a router cannot tell that a neighbour's route runs back through itself. **Split horizon** (do not advertise a route back to the neighbour it came from) and **poisoned reverse** (advertise it back as infinite) fix loops between two routers, but not longer loops: with three routers in a triangle, each can still learn a stale route from another that came from the third ([[#exr-triangle]]). Path-vector protocols, below, fix the problem properly by advertising the path.

| | link state | distance vector |
|---|---|---|
| information exchanged | every router's links, flooded to all | distance vectors, to neighbours only |
| computation | Dijkstra on the full map, in each router | Bellman–Ford update, distributed |
| messages per change | $O(m)$ (one flood) | varies; can be many rounds |
| convergence | fast | can be slow; count to infinity |
| robustness | a router miscomputes only its own table | a wrong vector spreads to everyone |

::: quiz
Router X has links to neighbours Y (cost 2) and Z (cost 7). Y reports a distance of 5 to destination W, and Z reports 1. What does X set as its distance to W and its next hop, according to the Bellman–Ford equation?
- [ ] 1, via Z
- [x] 7, via Y
- [ ] 8, via Z
- [ ] 5, via Y
::: solution
$D_X(W) = \min(c(X, Y) + D_Y(W),\ c(X, Z) + D_Z(W)) = \min(2 + 5, 7 + 1) = \min(7, 8) = 7$, via Y. The neighbour with the smaller advertised distance is not necessarily the better next hop: the cost of the link to it counts too.
:::
:::

## Routing inside a network: OSPF and IS-IS

The internet is a network of **autonomous systems** (ASes): networks under a single administration, each identified by an AS number. Inside an AS, an **intra-domain** routing protocol, or **interior gateway protocol** (IGP), computes least-cost paths. The early ARPANET used distance-vector routing, and RIP (the Routing Information Protocol, RFC 2453) is a distance-vector protocol still found in small networks. Larger networks use link-state protocols: **OSPF** (Open Shortest Path First; OSPFv2, RFC 2328, for IPv4, and OSPFv3, RFC 5340, for IPv6) or **IS-IS** (from the OSI suite, now widely used by ISPs).

OSPF routers flood link-state advertisements reliably (with acknowledgements and periodic refreshes) and run Dijkstra's algorithm. Administrators set the link costs ("weights"), which is how they engineer where traffic flows. Several features matter at scale: when several paths have equal cost, traffic can be split among them (**equal-cost multipath**); messages can be **authenticated**, so an attacker on a link cannot inject false advertisements; and a large AS can be divided into **areas**, each flooding its own detailed map, with **area border routers** summarising each area's prefixes to a **backbone** area, so that no router needs the map of the whole AS.

## Routing between networks: BGP

Between ASes, least cost is not the goal, and a shared map is not possible. Each AS has its own interests — it carries traffic for its paying customers, avoids carrying traffic for free, prefers cheaper links — and will not reveal its internal structure to competitors. The **Border Gateway Protocol** (BGP-4, RFC 4271) is the internet's single inter-domain routing protocol, and every AS that connects to more than one other AS runs it.

::: definition BGP routes and path vectors {#def-bgp}
Neighbouring ASes connect their **border routers** with **BGP sessions** over TCP (port 179): **external BGP** (eBGP) between ASes, **internal BGP** (iBGP) to distribute what was learned among an AS's own routers. A BGP **route** is an announcement of a prefix together with **attributes**, including:

- **AS-PATH**: the sequence of ASes the announcement has passed through, most recent first;
- **NEXT-HOP**: the address of the border router to which traffic for the prefix should be sent;
- **LOCAL-PREF**: a preference set within an AS by its own policy.

An AS that **announces** a prefix to a neighbour offers to carry traffic for it. A router that receives a route whose AS-PATH already contains its own AS number rejects it. Because routes carry the whole path rather than only a distance, BGP is a **path-vector** protocol.
:::

::: proposition No loops in AS paths {#prop-no-loops}
If every AS rejects announcements whose AS-PATH contains its own number, and prepends its own number when it passes an announcement on, then every AS-PATH that an AS accepts consists of distinct ASes. In a stable state — every AS using a route that its next AS on the path is itself using and announcing — traffic for the prefix follows the AS-PATH of the route and therefore visits no AS twice.
:::

::: proof
An announcement starts at the origin AS $o$ with AS-PATH $(o)$. An AS $X$ that accepts an announcement has checked that $X$ is not in its path, and announces it onwards with $X$ prepended; by induction on the number of hops, every accepted path consists of distinct ASes. In a stable state, if $X$ uses the route $(Y, Z, \dots, o)$ learned from $Y$, then $Y$ uses the route $(Z, \dots, o)$ it announced, $Z$ uses $(\dots, o)$, and so on. Traffic forwarded AS by AS from $X$ therefore passes through $Y, Z, \dots, o$ in order: exactly the AS-PATH, which has no repetitions. (During convergence, when announcements and withdrawals are still in flight, transient loops are possible; they disappear as the state stabilises.)
:::

When a router has several routes to the same prefix, it chooses one with a series of tie-breaking rules (RFC 4271, §9.1, plus common vendor practice): highest LOCAL-PREF first, then shortest AS-PATH, then lowest origin type and multi-exit discriminator, then routes learned over eBGP rather than iBGP, then the route whose NEXT-HOP is closest according to the IGP — **hot-potato routing**, which hands traffic to another AS as soon as possible — and finally the lowest router identifier. The decisive first rule is policy, set by the AS's operators; path length only breaks ties.

### Policy: who carries whose traffic

Relationships between ASes are mostly of two kinds. In a **customer–provider** relationship the customer pays the provider to carry its traffic to and from the rest of the internet. In a **peering** relationship two ASes exchange traffic between their own customers without payment. These relationships determine BGP policy.

::: definition Gao–Rexford policies {#def-gao-rexford}
An AS following the **Gao–Rexford** guidelines:

1. **Prefers** routes learned from customers over routes from peers, and routes from peers over routes from providers (customers pay; providers must be paid).
2. **Exports** routes learned from its customers (and its own prefixes) to all its neighbours; but routes learned from a peer or a provider only to its customers.
:::

Rule 2 means that an AS never carries traffic between two of its peers or providers for free: it provides **transit** only to those who pay for it. The resulting AS paths are **valley-free**: they climb from customers to providers, cross at most one peering link, and then descend to customers. Gao and Rexford proved (2001) that if every AS follows these rules and the customer–provider relationships contain no cycle, BGP is guaranteed to converge to a stable set of routes; without such restrictions, policies can interact so that BGP oscillates for ever — routing stability depends on economics.

::: example Exporting a route {#ex-export}
AS 64500 is a provider for customers AS 64510 and AS 64511, and peers with AS 64501, another provider; AS 64496 is a provider for both 64500 and 64501. Customer 64510 announces the prefix `192.0.2.0/24`. Which of 64500's neighbours does 64500 tell about it, and what path does 64501's network use to reach it? (The AS numbers are from the range reserved for documentation, RFC 5398.)
::: solution
The route comes from a customer, so 64500 exports it to everyone: its other customer 64511, its peer 64501 and its provider 64496, each with AS-PATH $(64500, 64510)$. AS 64501 learns the prefix both from its peer 64500, path $(64500, 64510)$, and from its provider 64496, path $(64496, 64500, 64510)$. By rule 1 it prefers the peer route — free, and also shorter — so traffic from 64501's customers crosses the peering link to 64500 and then down to 64510. Now suppose 64500 also learned, from its peer 64501, a route to one of 64501's customers. Rule 2 forbids 64500 to export that to its provider 64496 or to other peers: doing so would invite 64496 to send traffic through 64500 to 64501, with 64500 paying its provider for traffic that earns it nothing.
:::
:::

### When BGP goes wrong

BGP trusts its neighbours: an AS accepts the prefixes its neighbours announce, and by default nothing checks that the announcing AS is entitled to them. Longest-prefix matching ([[networks/network-layer#def-forwarding]]) then makes a wrongly announced *more specific* prefix attract traffic from everyone who hears it. In February 2008, an ISP's attempt to block a video site within its own country — by announcing a more specific prefix of the site's addresses internally — leaked to its provider and from there to the whole internet, and for about two hours most of the world's traffic for that site went to the wrong network. Such **prefix hijacks** happen by mistake and on purpose; **route leaks**, in which an AS re-announces routes in violation of the Gao–Rexford export rules (often a customer passing one provider's routes to another), can draw large amounts of traffic through networks unable to carry it.

The defences come in layers. Providers **filter** what their customers may announce, using registries of which prefixes each customer holds. The **Resource Public Key Infrastructure** (RPKI, RFC 6480) lets the holder of a block publish a signed **route origin authorisation** saying which AS may originate it, and routers performing **route origin validation** (RFC 6811) reject announcements whose origin AS contradicts it. Origin validation does not stop an attacker who forges a path that *ends* in the right AS; **BGPsec** (RFC 8205) signs each hop of the path but has seen little deployment, and lighter checks on the plausibility of paths are being standardised. Operating these defences, not inventing new attacks, is what network operators do: the security of the routing system is a collective effort.

::: warning The shortest path is not the BGP path
It is natural to assume that internet traffic follows the shortest or fastest route. Between ASes it follows *policy*: LOCAL-PREF overrides path length, an AS may refuse to carry transit traffic, and hot-potato routing hands traffic off at the nearest exit rather than the best one. Paths are often asymmetric — the route from A to B differs from the route back — and a path that is shortest in AS hops can be much longer in kilometres. Only inside an AS, where an IGP runs, do packets follow least-cost paths, and even then the costs are whatever the administrator chose.
:::

::: application Anycast
Because BGP lets several ASes or sites announce the same prefix, a service can be placed at many locations with one address: each client's traffic goes to the location that its own network's BGP choices consider best, which is usually a nearby one. This **anycast** technique is how the DNS root servers ([[networks/application-layer#def-dns]]) and many content distribution networks serve the whole world from hundreds of sites under a handful of addresses, and why a denial-of-service flood against them is spread across all the sites.
:::

::: history
Edsger Dijkstra published his shortest-path algorithm in 1959, and the Bellman–Ford recurrence comes from Richard Bellman (1958) and Lester Ford Jr. (1956). The ARPANET's first routing algorithm (1969) was a distributed Bellman–Ford, exchanging distance vectors every two-thirds of a second; its slow convergence and loops led John McQuillan, Ira Richer and Eric Rosen to replace it in 1979–80 with a link-state algorithm that flooded measured delays and ran Dijkstra's algorithm in every node — the ancestor of OSPF (RFC 1131, 1989; OSPFv2, RFC 2328, by John Moy, 1998). The Exterior Gateway Protocol of 1984 assumed a tree-shaped internet; when that stopped being true, Kirk Lougheed and Yakov Rekhter sketched BGP — famously on napkins, at an IETF meeting in 1989 — and published it as RFC 1105 the same year. BGP-4, with support for CIDR, followed in 1995 (RFC 1771, revised as RFC 4271 in 2006). Lixin Gao and Jennifer Rexford's analysis of policy and stability appeared in 2001.
:::

## Where this leads

Shortest-path algorithms and their proofs in full generality — negative costs, all-pairs algorithms, priority queues — are in [[algorithms/shortest-paths]]. The next chapter, [[networks/link-layer]], goes below routing to the individual links and switched local networks, where a different protocol (the spanning tree protocol) prevents loops. Consensus and the problems of agreeing on state despite failures, of which routing convergence is a cousin, belong to [[distributed-systems]]; routing security is studied further in [[security]].

::: summary
- Routing computes least-cost paths in a graph of routers and links; forwarding tables record the next hop. Least costs satisfy the **Bellman–Ford equation** [[#eq-bellman-ford]].
- **Link-state** protocols flood each router's links to all and run **Dijkstra's algorithm** ([[#alg-dijkstra]], correct by [[#thm-dijkstra]]) in every router: fast convergence, $O(m)$ messages per change.
- **Distance-vector** protocols exchange only distance vectors with neighbours ([[#alg-dv]]); synchronous rounds compute least costs of paths with at most $k$ links after $k$ rounds ([[#thm-dv]]).
- After a failure, distance vectors can **count to infinity** ([[#ex-count-to-infinity]]); poisoned reverse fixes two-router loops only.
- Inside an AS, **OSPF** or IS-IS (link state) is used, with areas for scale. Between ASes, **BGP** is a **path-vector** protocol whose AS-PATH prevents loops ([[#prop-no-loops]]) and whose route choice follows **policy** first.
- **Gao–Rexford** policies — prefer customer over peer over provider routes; export peer and provider routes only to customers — produce valley-free paths and guarantee stability ([[#def-gao-rexford]]).
- BGP trusts announcements; prefix hijacks and route leaks are countered by filtering, RPKI and route origin validation.
:::

## Exercises

::: exercise A least-cost path {level=1 check="10"}
In the network of [[#ex-dijkstra]], what is the least cost from A to E, and what is the path? (Enter the cost.)
::: solution
From the table, $D(E) = 10$ with predecessor D; D's predecessor is B, whose predecessor is C, whose is A. The path is A → C → B → D → E, of cost $1 + 2 + 5 + 2 = 10$. The direct-looking alternative A → C → E costs $1 + 10 = 11$.
:::
:::

::: exercise One Bellman–Ford update {level=1 check="6"}
Router X has neighbours P, Q and R with link costs $c(X, P) = 1$, $c(X, Q) = 4$, $c(X, R) = 2$. Their latest vectors give distances to destination Z of $D_P(Z) = 7$, $D_Q(Z) = 2$, $D_R(Z) = 5$. What is $D_X(Z)$, and which neighbour is the next hop? (Enter $D_X(Z)$.)
::: solution
$\min(1 + 7, 4 + 2, 2 + 5) = \min(8, 6, 7) = 6$, via Q.
:::
:::

::: exercise BGP route selection {level=1}
A border router has three routes to `198.51.100.0/24`: route 1 with LOCAL-PREF 100 and AS-PATH (64510, 64520); route 2 with LOCAL-PREF 200 and AS-PATH (64511, 64530, 64540, 64520); route 3 with LOCAL-PREF 200 and AS-PATH (64512, 64520). Which does it choose, and why might the AS's operators have set the preferences this way?
::: solution
Highest LOCAL-PREF comes first, eliminating route 1 despite its short path. Between routes 2 and 3 (both 200), the shorter AS-PATH wins: route 3, with two ASes. Route 1 was probably learned from a provider (costly) and routes 2 and 3 from customers or peers, which Gao–Rexford policy prefers; the AS sets LOCAL-PREF to express that.
:::
:::

::: exercise Counting to infinity with a larger infinity {level=2 check="31"}
Repeat [[#ex-count-to-infinity]] with "infinity" set to 32 instead of 16 (change `INF` in `dv.py`, and raise `rounds=30` to 50). After how many rounds do both routers report C as unreachable? Explain the pattern. (Enter the number of rounds.)
::: solution
The estimates rise by two every two rounds, alternately at A and B: after round $r$, $D_B(C) = 2\lfloor (r+1)/2 \rfloor + 1$ and $D_A(C) = 2\lfloor r/2 \rfloor + 2$ (the staircases of the figure), capped at the infinity value. With infinity $32$, $D_A$ reaches $32$ at round $30$, and $D_B$ is $31$ after rounds $29$ and $30$ and reaches $32$ in round $31$; running `dv.py` with `INF = 32` and the higher round limit reports `rounds: 31`. In general, with infinity $I$ the plain protocol takes $I - 1$ rounds here: the convergence time grows linearly with the value chosen for infinity, which is why RIP chose a small one and is limited to networks at most 15 hops across.
:::
:::

::: exercise The cost of flooding {level=2 check="13"}
A network has $n = 6$ routers and $m = 9$ links (the network of [[#ex-dijkstra]]). One router floods a new LSA. Every router forwards the LSA, the first time it receives it, on all its links except the one it arrived on, and discards later copies; the originator sends it on all its links. How many LSA transmissions take place? (Enter the number.)
::: solution
Each router transmits the LSA exactly once on each of its links, except that every router other than the originator skips the link on which the LSA first arrived. Summing over routers, the total is $\sum_x \deg(x) - (n - 1) = 2m - (n - 1) = 18 - 5 = 13$, whatever the timing (if two copies cross on one link, each still counts once for its sender). A flood therefore costs $\Theta(m)$ transmissions, and each router receives a copy on every one of its links, which it uses as an implicit acknowledgement in OSPF's reliable flooding.
:::
:::

::: exercise Valley-free paths {level=2}
Four ASes: P1 and P2 are peers; C1 is a customer of P1; C2 is a customer of P2; C3 is a customer of both P1 and P2. Under Gao–Rexford policies, (a) what path does C1 use to reach C2? (b) Will P1 carry traffic from P2's network to C3? (c) Could traffic from C1 reach C2 through C3 (C1 → P1 → C3 → P2 → C2)? Why not?
::: solution
(a) C2 announces its prefix to its provider P2, which exports a customer route to everyone, including its peer P1; P1 exports it to its customers, including C1. Path: C1 → P1 → P2 → C2 (up, across the peering link, down). (b) Yes: C3 is P1's customer, so P1 exports C3's routes to its peer P2, and carries traffic from P2 to C3 — it is paid by C3 to do so. (P2 itself also has a direct customer route to C3, which it would prefer.) (c) No. C3 would have to export the route to C2, learned from its provider P2, to its other provider P1, which rule 2 forbids: a customer does not provide transit between its providers, since it would pay both for the privilege. Such a path would contain a "valley" (down to C3, then up again).
:::
:::

::: exercise Poisoned reverse in a triangle {#exr-triangle level=3}
Routers A, B and C are connected in a triangle (all three links of cost 1), and C also has a link of cost 1 to D. In the converged state $D_A(D) = D_B(D) = 2$ (both via C) and $D_C(D) = 1$. The link C–D fails. With poisoned reverse and synchronous rounds (infinity 16), trace the three routers' distances to D and explain why poisoned reverse does not prevent counting to infinity here.
::: solution
Adapting `dv.py` (destination D, links A–B, A–C, B–C) and running it gives, round by round, $(D_A, D_B, D_C)$:

```text
(2, 2, 1) → (2, 2, 16) → (3, 3, 16) → (16, 16, 4) → (16, 5, 16) → (6, 16, 16) → (16, 16, 7) → … → (16, 16, 16)
```

reaching all-infinite after 15 rounds. In round 1, C hears poisoned distances from A and B (both route via C) and correctly sets $16$. But A also hears B's distance $2$ — B routes via C, not via A, so B does not poison its advertisement to A — and in round 2 A sets $1 + 2 = 3$ via B, while B symmetrically sets $3$ via A. Their routes now point at each other, so in round 3 they poison each other; but C has heard their $3$s from round 2, which are not poisoned towards C (neither routes via C any more), and sets $1 + 3 = 4$. The stale information circulates round the triangle, one router at a time, gaining 1 per step. Poisoned reverse only stops a router from believing a route that goes straight back through itself; it cannot see loops of three or more routers, because a distance vector does not reveal the path. Path-vector protocols such as BGP, which advertise the whole path, detect such loops directly ([[#prop-no-loops]]).
:::
:::

::: exercise Bellman–Ford with negative costs {level=3}
[[#thm-dv]] assumes positive link costs. (a) Where does the proof use positivity? (b) Show that if one directed link has a negative cost but there is no cycle of negative total cost, the synchronous algorithm still computes least costs after $n - 1$ rounds. (c) What happens if there is a negative-cost cycle, and why can a routing protocol never allow one?
::: solution
(a) In two places: for $x = y$, keeping $D_y(y) = 0$ needs every cycle through $y$ to have non-negative cost; and the bound of $n - 1$ links uses the fact that a least-cost path never repeats a vertex. (b) Without negative cycles, removing a cycle from a walk never increases its cost, so a least-cost walk can be taken to be a simple path, with at most $n - 1$ links; and $D_y(y) = 0$ is still correct (every cycle costs at least $0$). The induction of [[#thm-dv]] — after round $k$, $D_x(y)$ is the least cost over walks of at most $k$ links — does not use positivity at all, so after $n - 1$ rounds the values are the least costs. (c) With a negative cycle reachable from $x$ and reaching $y$, walks around it get ever cheaper, there is no least cost, and the estimates decrease for ever (round $n$ still changes something, which is how the Bellman–Ford algorithm detects such cycles: [[algorithms/shortest-paths]]). In a network a negative cost has no physical meaning, and a routing protocol that allowed it would loop packets round the cycle; protocols require positive costs, which also guarantees that the next-hop graph for each destination is a tree.
:::
:::
