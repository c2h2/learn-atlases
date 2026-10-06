Three houses each need to be connected to water, gas and electricity. Can the nine pipes and cables be laid in a flat field without any two of them crossing? Try it on paper: you can always get down to a single crossing, but never to none. By the end of the first section you will be able to *prove* that it is impossible. The same circle of ideas settles a question that resisted mathematicians for more than a century: can every map be coloured with four colours so that countries sharing a border get different colours?

This chapter studies three classical properties of graphs. A graph is **planar** if it can be drawn without crossings, and Euler's formula $n - m + f = 2$ strictly limits how many edges such a graph can have. A **colouring** gives adjacent vertices different colours; colourings model scheduling problems, and planarity leads to the five colour theorem. A **matching** pairs up vertices along edges, and Hall's theorem says exactly when everybody in one group can be paired with somebody acceptable in another. We build on [[discrete/graphs]], especially on trees and bipartite graphs.

## Planar graphs

::: definition Planar graphs and faces {#def-planar}
A graph is **planar** if it can be drawn in the plane so that edges meet only at common endpoints. Such a drawing is a **plane graph**. Removing the drawing from the plane leaves connected regions called **faces**; exactly one of them, the **outer face**, is unbounded. The **degree** $\deg(F)$ of a face $F$ is the number of edges on its boundary, an edge being counted twice if $F$ lies on both sides of it.
:::

A cycle $C_n$ drawn as a polygon has two faces, inside and outside, each of degree $n$. A tree has a single face, and since every edge has the face on both sides, its degree is $2m$. In general every edge has two sides, each contributing $1$ to the degree of the face on that side, so

$$
\sum_{F} \deg(F) = 2m,
$$ {#eq-face-handshake}

the face version of the handshake lemma ([[discrete/graphs#thm-handshake]]). A planar graph can have drawings with crossings too: $K_4$ drawn as a square with both diagonals has a crossing, but moving one vertex inside the triangle formed by the other three removes it.

::: remark What we take for granted
That a closed curve without self-intersections separates the plane into an inside and an outside is the *Jordan curve theorem*. It is surprisingly hard to prove in general (see [[topology/connectedness]]), although for the polygonal curves that suffice to draw graphs an elementary proof is possible. We use it, and similar intuitive facts about drawings — for instance, that an edge on a cycle has different faces on its two sides — without proof.
:::

::: widget graph
nodes: 1@0,1; 2@0.87,0.5; 3@0.87,-0.5; 4@0,-1; 5@-0.87,-0.5; 6@-0.87,0.5
edges: 1-2; 2-3; 3-4; 4-5; 5-6; 6-1; 1-3; 3-5; 5-1; 2-4; 4-6; 6-2
algorithm: none
caption: The octahedron, drawn with six crossings. It is planar: drag $2$, $4$ and $6$ towards the centre to make a triangle inside the triangle $1, 3, 5$. In the crossing-free drawing count the faces, outer face included — you should find $f = 8$, and $n - m + f = 6 - 12 + 8 = 2$.
:::

The number $2$ in the caption is no accident.

::: theorem Euler's formula {#thm-euler-formula}
If a connected plane graph has $n$ vertices, $m$ edges and $f$ faces, then

$$
n - m + f = 2 .
$$
:::

::: proof
Induction on $m$, the statement being for all connected plane graphs. If $G$ has no cycle it is a tree, so $m = n - 1$ ([[discrete/graphs#thm-trees]]); a tree encloses no region, so $f = 1$, and $n - m + f = n - (n-1) + 1 = 2$.

Otherwise let $e$ be an edge on a cycle $C$. The cycle is drawn as a closed curve, so the faces on the two sides of $e$ are different — one inside $C$, one outside. Deleting $e$ merges these two faces into one and leaves every other face unchanged, and $G - e$ is still connected ([[discrete/graphs#lem-bridge]]). So $G - e$ is a connected plane graph with $n$ vertices, $m - 1$ edges and $f - 1$ faces, and by the induction hypothesis $n - (m - 1) + (f - 1) = 2$, which is $n - m + f = 2$.
:::

For the cube $Q_3$ drawn as a square inside a square, $8 - 12 + 6 = 2$; for $K_4$, $4 - 6 + 4 = 2$. In particular *every* plane drawing of a connected planar graph has the same number of faces, $f = 2 - n + m$. Combined with [[#eq-face-handshake]], Euler's formula turns into a bound on the number of edges.

::: corollary Planar graphs have few edges {#cor-planar-edges}
If $G$ is a simple planar graph with $n \ge 3$ vertices, then $m \le 3n - 6$. If in addition $G$ has no triangles, then $m \le 2n - 4$.
:::

::: proof
First suppose $G$ is connected and draw it without crossings. The boundary of each face is a closed walk; one of length $1$ or $2$ would need a loop or two parallel edges, or would mean that $G$ is a single edge, which is excluded by $n \ge 3$. So every face has degree at least $3$, and [[#eq-face-handshake]] gives $2m \ge 3f$. Euler's formula then yields

$$
2 = n - m + f \le n - m + \frac{2m}{3} = n - \frac{m}{3}, \qquad\text{so}\qquad m \le 3n - 6.
$$

If there are no triangles, a face of degree $3$ is impossible (a closed walk of length $3$ in a simple graph is a triangle), so every face has degree at least $4$, $2m \ge 4f$, and the same calculation gives $2 \le n - m/2$, that is, $m \le 2n - 4$.

If $G$ is not connected, add edges between different components, one at a time, each drawn inside a face bordered by both components. This keeps the drawing crossing-free and creates no cycles, hence no triangles, and ends with a connected graph satisfying the bound; $G$ has fewer edges, so it satisfies the bound too.
:::

::: corollary {#cor-k5-k33}
$K_5$ and $K_{3,3}$ are not planar.
:::

::: proof
$K_5$ has $n = 5$ and $m = 10 > 9 = 3n - 6$. $K_{3,3}$ is bipartite, so it has no odd cycles and in particular no triangles ([[discrete/graphs#thm-bipartite]]); it has $n = 6$ and $m = 9 > 8 = 2n - 4$. Both contradict [[#cor-planar-edges]].
:::

This settles the three utilities puzzle: houses and utilities form $K_{3,3}$.

::: widget graph
nodes: House1@0,1; House2@1,1; House3@2,1; Water@0,0; Gas@1,0; Power@2,0
edges: House1-Water; House1-Gas; House1-Power; House2-Water; House2-Gas; House2-Power; House3-Water; House3-Gas; House3-Power
algorithm: none
caption: The three utilities puzzle is the graph $K_{3,3}$. Drag the vertices to reduce the number of crossings. You can reach a drawing with exactly one crossing, but [[#cor-k5-k33]] guarantees that you can never reach zero — no matter how long you try.
:::

::: corollary {#cor-degree-five}
Every simple planar graph has a vertex of degree at most $5$.
:::

::: proof
If $n \le 2$ every degree is at most $1$. If $n \ge 3$ and every degree were at least $6$, the handshake lemma would give $2m \ge 6n$, so $m \ge 3n > 3n - 6$, contradicting [[#cor-planar-edges]].
:::

$K_5$ and $K_{3,3}$ are the fundamental non-planar graphs. A **subdivision** of a graph is obtained by inserting new vertices of degree $2$ into its edges, and a subdivision of a non-planar graph is clearly non-planar.

::: theorem Kuratowski's theorem {#thm-kuratowski}
A graph is planar if and only if it contains no subgraph that is a subdivision of $K_5$ or of $K_{3,3}$.
:::

One direction is [[#cor-k5-k33]]; the other — that every non-planar graph contains one of these two obstacles — is a substantial proof, given in Bondy and Murty's *Graph Theory*. Klaus Wagner proved in 1937 an equivalent form in terms of *minors* (graphs obtained by deleting and contracting edges).

::: example The Petersen graph is not planar {#ex-petersen-nonplanar}
Show that the Petersen graph ($n = 10$, $m = 15$) is not planar.
::: solution
The bound $m \le 2n - 4 = 16$ is satisfied, so [[#cor-planar-edges]] is not enough. But the Petersen graph has no cycles of length $3$ or $4$ ([[discrete/graphs#exr-petersen-girth]]). Suppose it had a plane drawing. It is connected and not a tree, and in such a drawing every face is bounded by a closed walk containing a cycle, so every face has degree at least $5$, and [[#eq-face-handshake]] gives $2m \ge 5f$. By Euler's formula $f = 2 - n + m = 7$, so we would need $30 = 2m \ge 5f = 35$, which is false. Hence the Petersen graph is not planar.

The same argument shows that a connected planar graph that is not a tree, and in which every cycle has length at least $g$, satisfies $m \le \frac{g}{g-2}(n-2)$; for $g = 3$ and $g = 4$ this gives [[#cor-planar-edges]] again.
:::
:::

::: example The five Platonic solids {#ex-platonic}
A Platonic solid is a convex polyhedron whose faces are congruent regular $p$-gons, with $q$ faces meeting at every vertex ($p, q \ge 3$). Show that there are only five possible pairs $(p, q)$.
::: solution
Its vertices and edges form a connected planar graph (project the polyhedron onto a plane from a point just outside one face), whose faces correspond to the faces of the solid. Each face has $p$ edges and each edge borders two faces, so $pf = 2m$; each vertex has $q$ edges and each edge has two endpoints, so $qn = 2m$. Substituting $n = 2m/q$ and $f = 2m/p$ into Euler's formula and dividing by $2m$,

$$
\frac{1}{q} - \frac12 + \frac1p = \frac{1}{m}, \qquad\text{so}\qquad \frac1p + \frac1q = \frac12 + \frac1m > \frac12 .
$$

If $p \ge 4$ and $q \ge 4$, then $\frac1p + \frac1q \le \frac12$; so $p = 3$ or $q = 3$, and the other is at most $5$ (since $\frac13 + \frac16 = \frac12$). The possibilities and the resulting values of $m = 1/(\frac1p + \frac1q - \frac12)$, $n = 2m/q$, $f = 2m/p$ are:

| $(p,q)$ | $(3,3)$ | $(4,3)$ | $(3,4)$ | $(5,3)$ | $(3,5)$ |
|---|---|---|---|---|---|
| $(n, m, f)$ | $(4, 6, 4)$ | $(8, 12, 6)$ | $(6, 12, 8)$ | $(20, 30, 12)$ | $(12, 30, 20)$ |
| solid | tetrahedron | cube | octahedron | dodecahedron | icosahedron |

All five exist, and these are the only ones.
:::
:::

::: quiz
Which of these graphs are planar? (More than one answer may be correct.)
- [x] $K_{2,5}$
- [ ] $K_{3,3}$
- [x] the cube $Q_3$
- [ ] the Petersen graph
::: solution
For $K_{2,5}$, put the two special vertices at the top and bottom and the other five in a row between them: no edges cross. $Q_3$ is a square inside a square. $K_{3,3}$ is non-planar by [[#cor-k5-k33]], and the Petersen graph by [[#ex-petersen-nonplanar]].
:::
:::

## Colouring

::: definition Colourings and chromatic number {#def-colouring}
A **(proper) $k$-colouring** of a graph $G$ is a function $c\colon V \to \{1, \dots, k\}$ with $c(u) \ne c(v)$ for every edge $uv$. The **chromatic number** $\chi(G)$ is the smallest $k$ for which a $k$-colouring exists.
:::

Each **colour class** $c^{-1}(i)$ is an **independent set**: no two of its vertices are adjacent. So a $k$-colouring is a partition of $V$ into $k$ independent sets. Some first facts:

- $\chi(K_n) = n$, since all vertices must get different colours. More generally, if $G$ contains a **clique** (a complete subgraph) with $\omega$ vertices, then $\chi(G) \ge \omega$.
- $\chi(G) = 1$ exactly when $G$ has no edges, and $\chi(G) \le 2$ exactly when $G$ is bipartite — a $2$-colouring *is* a bipartition. By [[discrete/graphs#thm-bipartite]], $\chi(C_n) = 2$ for even $n$ and $\chi(C_n) = 3$ for odd $n$.
- If $G$ has $n$ vertices and no independent set with more than $\alpha$ vertices, then $\chi(G) \ge n/\alpha$, as each colour class has at most $\alpha$ vertices.

Lower bounds come from cliques, odd cycles and independent sets; upper bounds come from exhibiting colourings. The simplest way to produce one is to colour greedily.

::: proposition Greedy colouring {#prop-greedy}
For every graph, $\chi(G) \le \Delta(G) + 1$.
:::

::: proof
List the vertices in any order and colour them one at a time, giving each vertex the smallest colour in $\{1, 2, \dots\}$ not used by its already-coloured neighbours. A vertex has at most $\Delta(G)$ neighbours, so at most $\Delta(G)$ colours are forbidden, and one of the colours $1, \dots, \Delta(G) + 1$ is free. The result is a proper colouring with at most $\Delta(G) + 1$ colours.
:::

The bound is attained by complete graphs and odd cycles, and **Brooks' theorem** (1941) says these are the only connected examples: a connected graph that is neither complete nor an odd cycle has $\chi(G) \le \Delta(G)$.

::: warning Greedy colouring depends on the order
The greedy algorithm always produces a proper colouring, but not necessarily an optimal one. On the bipartite graph below it uses four colours, although two suffice. Never conclude $\chi(G) = k$ from one greedy run: you also need a *lower bound*, such as a clique or an odd cycle.
:::

::: widget graph
nodes: u1@0,1; v1@0,0; u2@1,1; v2@1,0; u3@2,1; v3@2,0; u4@3,1; v4@3,0
edges: u1-v2; u1-v3; u1-v4; u2-v1; u2-v3; u2-v4; u3-v1; u3-v2; u3-v4; u4-v1; u4-v2; u4-v3
algorithm: colour
caption: Each $u_i$ is joined to every $v_j$ with $j \ne i$, so the graph is bipartite. Greedy colouring in the listed order $u_1, v_1, u_2, v_2, \dots$ gives $u_i$ and $v_i$ colour $i$: four colours. Colouring all the $u$'s first would use only two. With $k$ vertices on each side the same order uses $k$ colours, so greedy can be arbitrarily bad.
:::

::: example Scheduling examinations {#ex-timetable}
Six examinations $A, \dots, F$ must be timetabled so that no student has two at once. The pairs with a common student are $AB$, $AC$, $AD$, $BC$, $BE$, $CF$, $DE$, $DF$, $EF$. What is the smallest number of sessions?
::: solution
Make a graph with a vertex for each examination and an edge for each clashing pair; sessions are colour classes, so we want $\chi(G)$. The triangle $ABC$ shows $\chi(G) \ge 3$. Greedy colouring in the order $A, B, C, D, E, F$ gives $A \mapsto 1$, $B \mapsto 2$, $C \mapsto 3$, then $D \mapsto 2$ (its only coloured neighbour is $A$) and $E \mapsto 1$ (its coloured neighbours $B, D$ both have colour $2$). Now $F$ is adjacent to $C$, $D$ and $E$, which carry colours $3, 2, 1$, so greedy needs a fourth colour. But a little thought finds a $3$-colouring:

$$
\{A, F\},\quad \{B, D\},\quad \{C, E\},
$$

and none of these pairs is an edge. So three sessions suffice, and by the triangle three are needed: $\chi(G) = 3$. The example illustrates both points of the warning above: greedy may overshoot, and it is a lower bound meeting the upper bound that proves optimality.
:::
:::

::: quiz
What is the chromatic number of the wheel obtained from the cycle $C_5$ by adding a hub vertex adjacent to all five cycle vertices?
- [ ] $3$
- [x] $4$
- [ ] $5$
- [ ] $6$
::: solution
The rim $C_5$ is an odd cycle, so it needs $3$ colours, and the hub is adjacent to every rim vertex, so it needs a fourth: $\chi \ge 4$. Colouring the rim $1, 2, 1, 2, 3$ and the hub $4$ shows $\chi = 4$. (With an even rim the wheel needs only $3$.)
:::
:::

## Colouring planar graphs

To colour a map so that neighbouring countries differ, put a vertex in each country and join two vertices when the countries share a border (not just a point). This graph can be drawn without crossings — draw each edge through the shared border — so map colouring is vertex colouring of planar graphs. Six colours are easy.

::: theorem Six colour theorem {#thm-six-colour}
Every planar graph has $\chi(G) \le 6$.
:::

::: proof
Induction on $n$; graphs with at most $6$ vertices are trivially $6$-colourable. By [[#cor-degree-five]] a planar graph $G$ has a vertex $v$ of degree at most $5$. The graph $G - v$ is planar with $n - 1$ vertices, so it has a $6$-colouring by the induction hypothesis. The neighbours of $v$ use at most $5$ colours, so a sixth is free for $v$.
:::

Getting down to five requires a beautiful idea of Alfred Kempe: recolouring along two-coloured chains.

::: theorem Five colour theorem {#thm-five-colour}
Every planar graph has $\chi(G) \le 5$.
:::

::: proof
Induction on $n$; graphs with at most $5$ vertices are trivial. Fix a plane drawing of $G$ and a vertex $v$ of degree at most $5$ ([[#cor-degree-five]]). By the induction hypothesis $G - v$ has a $5$-colouring. If the neighbours of $v$ use at most four colours, a fifth is free for $v$. Otherwise $v$ has exactly five neighbours $v_1, \dots, v_5$, in clockwise order around $v$, coloured $1, 2, 3, 4, 5$ respectively.

For colours $i \ne j$ let $H_{ij}$ be the subgraph of $G - v$ induced by the vertices coloured $i$ or $j$. In any component of $H_{ij}$ we may swap colours $i$ and $j$ and still have a proper colouring: an edge inside the component joins an $i$ to a $j$, and an edge leaving the component goes to a vertex whose colour is neither $i$ nor $j$ (otherwise that vertex would belong to the component).

*Case 1: $v_1$ and $v_3$ lie in different components of $H_{13}$.* Swap colours $1$ and $3$ in the component containing $v_1$. Now $v_1$ and $v_3$ both have colour $3$, no neighbour of $v$ has colour $1$, and we give $v$ colour $1$.

*Case 2: $v_1$ and $v_3$ lie in the same component of $H_{13}$.* Then a path $P$ from $v_1$ to $v_3$ uses only colours $1$ and $3$, and together with $v$ it forms a cycle $C = v, v_1, P, v_3, v$. In the drawing, $C$ is a closed curve. In the cyclic order around $v$, the vertex $v_2$ lies between $v_1$ and $v_3$ on one side and $v_4$ on the other; hence the edges $vv_2$ and $vv_4$ leave $v$ on opposite sides of $C$, and one of $v_2, v_4$ lies inside $C$ and the other outside. Any path from $v_2$ to $v_4$ in $G - v$ must therefore meet $C$ at a vertex, which is coloured $1$ or $3$. Hence $v_2$ and $v_4$ lie in different components of $H_{24}$. Swap colours $2$ and $4$ in the component containing $v_2$; now no neighbour of $v$ has colour $2$, and we give $v$ colour $2$.
:::

::: remark Four colours
In 1879 Kempe published a "proof" that four colours suffice, using the same chains; in 1890 Percy Heawood found a configuration where Kempe's double swap fails, and salvaged the argument to prove the five colour theorem above. The **four colour theorem** — every planar graph satisfies $\chi(G) \le 4$ — was finally proved in 1976. The bound is attained: $K_4$ is planar and needs four colours. Deciding whether a planar graph can be coloured with *three* colours, however, is NP-complete ([[discrete/graph-algorithms]]).
:::

::: history
Francis Guthrie noticed in 1852 that four colours sufficed for a map of the counties of England, and asked whether this was always so; through his brother Frederick the question reached Augustus De Morgan, who publicised it. Arthur Cayley raised it before the London Mathematical Society in 1878. Alfred Kempe's 1879 proof was accepted for eleven years until Percy Heawood exposed the gap in 1890; Peter Guthrie Tait's proof of 1880 also turned out to be flawed. Kenneth Appel and Wolfgang Haken of the University of Illinois finally proved the theorem in 1976, reducing it to almost two thousand configurations that were checked by computer — the first major theorem whose proof relied essentially on a computer. Neil Robertson, Daniel Sanders, Paul Seymour and Robin Thomas gave a simpler computer-assisted proof in 1997, and in 2005 Georges Gonthier and Benjamin Werner verified a complete proof with the Coq proof assistant.
:::

## Matchings and Hall's theorem

Four workers must be assigned to four jobs, each worker to a job they are qualified for and each job to one worker. Is it possible? The qualifications form a bipartite graph between workers and jobs, and we want a set of edges pairing them up.

::: definition Matchings {#def-matching}
A **matching** in a graph is a set $M$ of edges no two of which share an endpoint. A vertex is **covered** by $M$ if it is an endpoint of an edge of $M$. A matching is **perfect** if it covers every vertex, and **maximum** if no matching has more edges. In a bipartite graph with parts $X$ and $Y$, a matching **covers $X$** if it covers every vertex of $X$; for $S \subseteq X$ we write $N(S) \subseteq Y$ for the set of vertices adjacent to at least one vertex of $S$.
:::

If a matching covers $X$, then the vertices of any $S \subseteq X$ are matched to $\abs{S}$ distinct vertices of $N(S)$, so **Hall's condition**

$$
\abs{N(S)} \ge \abs{S} \qquad \text{for every } S \subseteq X
$$ {#eq-hall}

is necessary. Remarkably, it is also sufficient.

::: theorem Hall's theorem {#thm-hall}
A bipartite graph with parts $X$ and $Y$ has a matching covering $X$ if and only if $\abs{N(S)} \ge \abs{S}$ for every $S \subseteq X$.
:::

::: proof
We have seen that the condition is necessary. For sufficiency we use strong induction on $\abs{X}$. If $\abs{X} = 1$, the condition says the single vertex of $X$ has a neighbour, and one edge is the matching. Let $\abs{X} \ge 2$ and assume the result for smaller $X$.

*Case 1: $\abs{N(S)} \ge \abs{S} + 1$ for every non-empty $S \subsetneq X$.* Choose any $x \in X$ and a neighbour $y$ of $x$ (one exists since $\abs{N(\{x\})} \ge 1$). In $G' = G - x - y$, with parts $X \setminus \{x\}$ and $Y \setminus \{y\}$, every non-empty $S \subseteq X \setminus \{x\}$ has at most one neighbour fewer than before, so $\abs{N_{G'}(S)} \ge \abs{N(S)} - 1 \ge \abs{S}$. By induction $G'$ has a matching covering $X \setminus \{x\}$; adding $xy$ gives a matching covering $X$.

*Case 2: some non-empty $S_0 \subsetneq X$ has $\abs{N(S_0)} = \abs{S_0}$.* The subgraph induced by $S_0 \cup N(S_0)$ satisfies Hall's condition (for $S \subseteq S_0$, all neighbours of $S$ lie in $N(S_0)$), so by induction it has a matching $M_1$ covering $S_0$; it uses all of $N(S_0)$, since $\abs{N(S_0)} = \abs{S_0}$. Now let $G''$ be the subgraph induced by $(X \setminus S_0) \cup (Y \setminus N(S_0))$. For $S \subseteq X \setminus S_0$, the neighbours of $S$ in $G''$ are $N(S) \setminus N(S_0) = N(S \cup S_0) \setminus N(S_0)$, so

$$
\abs{N_{G''}(S)} = \abs{N(S \cup S_0)} - \abs{N(S_0)} \ge \abs{S \cup S_0} - \abs{S_0} = \abs{S}.
$$

By induction $G''$ has a matching $M_2$ covering $X \setminus S_0$. The edges of $M_1$ and $M_2$ have no common endpoints, so $M_1 \cup M_2$ is a matching covering $X$.
:::

::: corollary Regular bipartite graphs {#cor-regular-matching}
Every $k$-regular bipartite graph with $k \ge 1$ has a perfect matching.
:::

::: proof
Let the parts be $X$ and $Y$. Counting edges from each side gives $k\abs{X} = m = k\abs{Y}$, so $\abs{X} = \abs{Y}$, and a matching covering $X$ is perfect. For $S \subseteq X$, the $k\abs{S}$ edges at vertices of $S$ all end in $N(S)$, where there are only $k\abs{N(S)}$ edge-ends in total. So $k\abs{S} \le k\abs{N(S)}$, Hall's condition holds, and [[#thm-hall]] applies.
:::

::: example One card from each pile {#ex-cards}
A pack of $52$ cards ($13$ ranks, four cards of each rank) is dealt into $13$ piles of four cards. Show that one can pick one card from each pile so that the $13$ chosen cards have $13$ different ranks.
::: solution
Form a bipartite graph with the $13$ piles on one side and the $13$ ranks on the other, joining a pile to a rank if the pile contains at least one card of that rank. We want a matching covering the piles, so we check Hall's condition. Any $k$ piles together contain $4k$ cards. There are only four cards of each rank in the pack, so cards of at most $k - 1$ ranks would number at most $4(k-1) < 4k$; hence these piles involve at least $k$ ranks, that is, $\abs{N(S)} \ge \abs{S}$. By [[#thm-hall]] there is a matching covering all $13$ piles, and picking from each pile a card of its matched rank gives $13$ different ranks.
:::
:::

Hall's theorem says *when* a matching exists; to *find* one we improve a matching step by step. Given a matching $M$, an **$M$-augmenting path** is a path whose two end vertices are not covered by $M$ and whose edges alternate between edges not in $M$ and edges in $M$. Swapping the roles along such a path — removing its $M$-edges from $M$ and adding the others — gives a matching with one more edge.

::: theorem Berge's theorem {#thm-berge}
A matching $M$ is maximum if and only if there is no $M$-augmenting path.
:::

::: proof
If an augmenting path exists, swapping along it produces a larger matching, so $M$ is not maximum. Conversely, suppose $M$ is not maximum and let $M'$ be a matching with $\abs{M'} > \abs{M}$. Consider the edges lying in exactly one of $M$ and $M'$. Every vertex meets at most one edge of each matching, so in this set of edges every vertex has degree at most $2$, and its components are paths and cycles whose edges alternate between $M$ and $M'$. An alternating cycle has equally many edges from both. Since $M'$ contributes more edges in total, some component is a path with more $M'$-edges than $M$-edges; it starts and ends with $M'$-edges, its end vertices are not covered by $M$ (an $M$-edge at an end vertex would either continue the path or, if it also lay in $M'$, give that vertex two edges of $M'$), and so it is an $M$-augmenting path.
:::

::: example Assigning jobs {#ex-matching}
Workers $A, B, C, D$ can do the following jobs: $A$: $1, 2$; $B$: $1$; $C$: $2, 3$; $D$: $3, 4$. (a) Find a perfect matching, starting from the matching $\{A1, C2\}$. (b) Show that if $C$ could only do jobs $1$ and $2$, no assignment of all four workers exists.
::: solution
(a) In $M = \{A1, C2\}$ the worker $B$ is uncovered, and the only job $B$ can do, $1$, is taken by $A$. Follow alternating edges: $B$ to $1$ (not in $M$), $1$ to $A$ (in $M$), $A$ to $2$ (not in $M$), $2$ to $C$ (in $M$), $C$ to $3$ (not in $M$), and job $3$ is uncovered. So $B, 1, A, 2, C, 3$ is an augmenting path. Swapping gives $\{B1, A2, C3\}$, and adding $D4$ (both uncovered) gives the perfect matching $\{A2, B1, C3, D4\}$.

(b) Now $S = \{A, B, C\}$ has $N(S) = \{1, 2\}$, so $\abs{N(S)} = 2 < 3 = \abs{S}$. Hall's condition fails: three workers compete for two jobs, and by [[#thm-hall]] no matching covers all the workers.
:::
:::

::: widget graph
nodes: A@0,1; B@1,1; C@2,1; D@3,1; 1@0,0; 2@1,0; 3@2,0; 4@3,0
edges: A-1; A-2; B-1; C-2; C-3; D-3; D-4
algorithm: none
caption: The qualification graph of [[#ex-matching]]. Click a vertex to see its neighbours. Start from the matching $A1, C2$, trace the augmenting path $B, 1, A, 2, C, 3$ and add $D4$: every worker ends up with a job. Hall's condition can be checked by hand here: every set of $k$ workers can do at least $k$ jobs between them.
:::

In a bipartite graph a **vertex cover** is a set of vertices meeting every edge. Each edge of a matching needs its own cover vertex, so a maximum matching is never larger than a minimum vertex cover. **König's theorem** (Dénes Kőnig, 1931; also Jenő Egerváry) says that in bipartite graphs the two are equal; it is equivalent to Hall's theorem and can be proved with augmenting paths.

::: quiz
In a bipartite graph with parts $X$ and $Y$, which condition guarantees a matching covering $X$?
- [ ] Every vertex of $X$ has at least one neighbour.
- [ ] $\abs{Y} \ge \abs{X}$ and every vertex of $Y$ has at least one neighbour.
- [x] Every set of $k$ vertices of $X$ has at least $k$ neighbours altogether, for every $k$.
- [ ] Some vertex of $X$ is adjacent to every vertex of $Y$.
::: solution
The third option is Hall's condition ([[#thm-hall]]). The others can all hold without a matching: take $X = \{x_1, x_2, x_3\}$, $Y = \{y_1, y_2, y_3\}$, with $x_1$ and $x_2$ adjacent only to $y_1$ and $x_3$ adjacent to all of $Y$. Every vertex has a neighbour, $\abs{Y} = \abs{X}$ and $x_3$ sees all of $Y$, but $x_1$ and $x_2$ compete for $y_1$: the set $S = \{x_1, x_2\}$ has $\abs{N(S)} = 1 < 2$.
:::
:::

::: application Assignments and stable marriages
Matching algorithms assign students to projects, doctors to hospitals and kidneys to compatible recipients. When the participants also have *preferences*, one asks for a **stable** matching, in which no two participants would both rather be with each other than with their assigned partners. David Gale and Lloyd Shapley showed in 1962 that a stable matching always exists and gave an algorithm to find it; Shapley and Alvin Roth, who applied these ideas to real markets, shared the 2012 Nobel Memorial Prize in Economic Sciences.
:::

## Where this leads

Euler's formula is the first appearance of the **Euler characteristic**: on a torus a connected graph drawn so that every face is a disc satisfies $n - m + f = 0$, and the analogue of [[#cor-planar-edges]] shows that seven colours always suffice for maps on a torus; seven may be needed, because $K_7$ can be drawn on a torus without crossings, as Heawood showed in 1890. These ideas are developed in [[topology/surfaces]]. Colouring leads to Ramsey theory and to the probabilistic method, and matchings to network flows and linear programming. The algorithmic contrast of [[discrete/graph-algorithms]] reappears: maximum matchings can be found quickly with augmenting paths, while three-colourability is NP-complete.

::: summary
- A planar graph can be drawn without crossings; for a connected plane graph Euler's formula $n - m + f = 2$ holds ([[#thm-euler-formula]]), and $\sum_F \deg(F) = 2m$.
- Consequently a simple planar graph with $n \ge 3$ has $m \le 3n - 6$ (and $m \le 2n - 4$ if triangle-free), so $K_5$ and $K_{3,3}$ are not planar and every planar graph has a vertex of degree at most $5$.
- Kuratowski: a graph is planar exactly when it contains no subdivision of $K_5$ or $K_{3,3}$.
- $\chi(G)$ is the least number of colours in a proper colouring; cliques and odd cycles give lower bounds, colourings give upper bounds, and greedy colouring gives $\chi(G) \le \Delta(G) + 1$ but depends on the order.
- Planar graphs are $5$-colourable by Kempe chains ([[#thm-five-colour]]); four colours suffice by the computer-assisted four colour theorem.
- Hall's theorem: a bipartite graph has a matching covering $X$ if and only if $\abs{N(S)} \ge \abs{S}$ for all $S \subseteq X$ ([[#thm-hall]]); regular bipartite graphs have perfect matchings.
- A matching is maximum exactly when it has no augmenting path (Berge), which is how matchings are found in practice.
:::

## Exercises

::: exercise Counting faces {level=1 check="7"}
A connected plane graph has $10$ vertices and $15$ edges. How many faces does it have?
::: solution
By Euler's formula $f = 2 - n + m = 2 - 10 + 15 = 7$.
:::
:::

::: exercise A maximal planar graph {level=1 check="18"}
What is the largest possible number of edges of a simple planar graph with $8$ vertices?
::: solution
By [[#cor-planar-edges]], $m \le 3 \cdot 8 - 6 = 18$. The bound is attained by any *triangulation*, a plane graph all of whose faces are triangles; for example, take a $6$-cycle with one vertex inside joined to all six cycle vertices and one vertex outside joined to all six: $6 + 6 + 6 = 18$ edges.
:::
:::

::: exercise A wheel {level=1 check="4"}
Find the chromatic number of the wheel formed by a cycle $C_7$ and a hub joined to all seven cycle vertices.
::: solution
The rim is an odd cycle, so it needs $3$ colours, and the hub is adjacent to all rim vertices, so it needs a colour of its own: $\chi \ge 4$. Colouring the rim $1, 2, 1, 2, 1, 2, 3$ and the hub $4$ gives a proper $4$-colouring, so $\chi = 4$.
:::
:::

::: exercise The 4-cube is not planar {level=2}
Prove that the cube $Q_4$ is not planar.
::: solution
$Q_4$ has $n = 16$ vertices and $m = 32$ edges (it is $4$-regular). It is bipartite (split the strings by the parity of their number of $1$s), so it has no triangles. A planar triangle-free graph satisfies $m \le 2n - 4 = 28$ by [[#cor-planar-edges]], but $32 > 28$. So $Q_4$ is not planar.
:::
:::

::: exercise Colouring the Petersen graph {level=2 check="3"}
Find the chromatic number of the Petersen graph.
::: hint
Look for an odd cycle, then colour the outer $5$-cycle and the inner pentagram by hand.
:::
::: solution
The Petersen graph contains a $5$-cycle, so $\chi \ge 3$. Label the vertices by $2$-element subsets of $\{1, \dots, 5\}$, adjacent when disjoint, and use three classes: the four pairs containing $1$; the three pairs containing $2$ but not $1$; and the three pairs inside $\{3, 4, 5\}$. Within each class any two pairs intersect (they share $1$, or share $2$, or are two $2$-subsets of a $3$-set), so each class is independent. This is a proper $3$-colouring, and $\chi = 3$.
:::
:::

::: exercise Assigning projects {level=2 check="4"}
Five students list acceptable projects: $P$: $1, 2$; $Q$: $2, 3$; $R$: $1, 3$; $S$: $1, 2, 3$; $T$: $4, 5$. Show that not every student can get a different acceptable project, and find the largest number who can.
::: solution
The set $\{P, Q, R, S\}$ has only the projects $\{1, 2, 3\}$ as neighbours, and $3 < 4$, so Hall's condition fails and there is no matching covering all five students. At most three of $P, Q, R, S$ can be assigned, so at most $3 + 1 = 4$ students in total; and $P1, Q2, R3, T4$ assigns four. The answer is $4$.
:::
:::

::: exercise Euler's formula for disconnected graphs {level=2}
Prove that a plane graph with $n$ vertices, $m$ edges, $f$ faces and $c$ components satisfies $n - m + f = 1 + c$.
::: hint
Add $c - 1$ edges joining the components without creating crossings, and see how $m$ and $f$ change.
:::
::: solution
Add $c - 1$ new edges, each joining two different components and drawn inside a face bordering both, until the graph is connected. Each new edge is a bridge, so it has the same face on both sides and does not split any face: $f$ is unchanged, while $m$ grows by $c - 1$. Euler's formula for the connected graph gives $n - (m + c - 1) + f = 2$, that is, $n - m + f = 1 + c$.
:::
:::

::: exercise Few edges, few colours {level=3}
Prove that every graph with $m$ edges satisfies $\binom{\chi(G)}{2} \le m$, that is, $\chi(G)(\chi(G) - 1) \le 2m$.
::: hint
In a colouring with $\chi(G)$ colours, what can you say about two colour classes with no edge between them?
:::
::: solution
Take a colouring with $k = \chi(G)$ colours. If two colour classes had no edge between them, we could merge them into one class and obtain a proper colouring with $k - 1$ colours, contradicting minimality. So each of the $\binom{k}{2}$ pairs of classes is joined by at least one edge, and different pairs give different edges. Hence $\binom{k}{2} \le m$.
:::
:::

::: exercise Triangle-free planar graphs {level=3}
Prove that every triangle-free planar graph is $4$-colourable.
::: hint
Show that such a graph has a vertex of degree at most $3$, then imitate the proof of the six colour theorem.
:::
::: solution
First, a triangle-free planar graph $G$ has a vertex of degree at most $3$: if $n \le 4$ every degree is at most $n - 1 \le 3$, and if $n \ge 5$ with all degrees at least $4$, then $2m \ge 4n$, so $m \ge 2n > 2n - 4$, contradicting [[#cor-planar-edges]]. Now use induction on $n$: deleting a vertex $v$ of degree at most $3$ leaves a triangle-free planar graph, which is $4$-colourable by the induction hypothesis; the at most three neighbours of $v$ leave a fourth colour free for $v$. (Grötzsch proved in 1959 that three colours suffice.)
:::
:::

::: exercise Completing Latin rectangles {level=3}
An $r \times n$ **Latin rectangle** ($r < n$) is an array with entries from $\{1, \dots, n\}$ in which each row contains every symbol once and no column contains a symbol twice. Prove that it can be extended by a new row to an $(r+1) \times n$ Latin rectangle. Deduce that every Latin rectangle can be completed to a Latin square.
::: hint
Form a bipartite graph between the columns and the symbols, joining column $j$ to symbol $s$ if $s$ does not yet occur in column $j$. Show that it is regular.
:::
::: solution
Let $X$ be the set of $n$ columns and $Y$ the set of $n$ symbols, and join column $j$ to symbol $s$ when $s$ does not occur in column $j$. Each column contains $r$ different symbols, so it is joined to $n - r$ symbols. Each symbol occurs once in each row, hence $r$ times, in $r$ different columns (no column repeats a symbol), so it is joined to $n - r$ columns. The graph is $(n - r)$-regular with $n - r \ge 1$, so by [[#cor-regular-matching]] it has a perfect matching. Writing in column $j$ the symbol matched to $j$ gives a new row that contains every symbol once (the matching is perfect) and repeats no symbol in any column (by construction). Repeating the argument $n - r$ times completes the rectangle to an $n \times n$ Latin square.
:::
:::
