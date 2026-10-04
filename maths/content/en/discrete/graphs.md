Seven people meet at a party, and each of them shakes hands with exactly three of the others. Is that possible? You could try to draw it — seven dots, a line for each handshake, three lines at every dot — and after a few failed attempts you would suspect that it cannot be done. But failed attempts prove nothing; perhaps you were unlucky. We want a *reason*, and the reason turns out to be one line long: it is the first theorem of this chapter.

The dots-and-lines picture is a **graph**. Graphs model anything made of objects and connections between pairs of them: friendships, road networks, chemical bonds, links between web pages, exams that must not clash. Because the definition keeps only *which pairs are connected*, one theorem about graphs applies to all of these at once. This chapter builds the vocabulary — degrees, paths, connectivity, isomorphism — and proves the two basic structure theorems, on bipartite graphs and on trees. The next two chapters use it for algorithms ([[discrete/graph-algorithms]]) and for drawing and colouring ([[discrete/colouring-planarity]]).

## Graphs and degrees

::: definition Graph {#def-graph}
A **graph** $G = (V, E)$ consists of a finite non-empty set $V$ of **vertices** and a set $E$ of **edges**, where each edge is a set $\{u, v\}$ of two distinct vertices. We write the edge $\{u,v\}$ as $uv$ (or $vu$), say that $u$ and $v$ are **adjacent** or **neighbours**, and that the edge is **incident** with its **endpoints** $u$ and $v$. The **neighbourhood** of $v$ is $N(v) = \set{u \in V : uv \in E}$.
:::

We write $V(G)$ and $E(G)$ when several graphs are around, and always use $n = \abs{V}$ for the number of vertices and $m = \abs{E}$ for the number of edges. The definition excludes **loops** (edges from a vertex to itself) and **multiple edges** (several edges joining the same pair); graphs without them are called **simple**, and when they are allowed we speak of a **multigraph** — we will need one for the bridges of Königsberg in [[discrete/graph-algorithms]]. In a **directed graph** the edges are ordered pairs $(u,v)$, drawn as arrows. Unless we say otherwise, "graph" means a finite simple undirected graph.

A graph is the abstract pair $(V, E)$, not a picture of it. Positions, lengths and crossings belong to a *drawing*: a square with both diagonals and a triangle with a vertex in the middle are two drawings of the same graph $K_4$, in which every two of the four vertices are adjacent. Learning to look past the drawing is one of the main skills of the subject.

::: definition Degree {#def-degree}
The **degree** $\deg(v)$ of a vertex $v$ is the number of edges incident with it, so $\deg(v) = \abs{N(v)}$. We write $\delta(G)$ and $\Delta(G)$ for the minimum and maximum degree. A vertex of degree $0$ is **isolated**, a vertex of degree $1$ is a **leaf**, and $G$ is **$k$-regular** if every vertex has degree $k$.
:::

Here is the promised one-line reason.

::: theorem Handshake lemma {#thm-handshake}
In every graph,

$$
\sum_{v \in V} \deg(v) = 2m.
$$ {#eq-handshake}
:::

::: proof
We count the pairs $(v, e)$ in which $e$ is an edge and $v$ is one of its endpoints, in two ways (*double counting*, see [[discrete/counting]]). Grouped by vertex, $v$ occurs in exactly $\deg(v)$ pairs, giving $\sum_v \deg(v)$ pairs. Grouped by edge, every edge has exactly two endpoints, giving $2m$ pairs. The two counts are equal.
:::

::: corollary {#cor-odd}
In every graph the number of vertices of odd degree is even.
:::

::: proof
Splitting [[#eq-handshake]] into even and odd degrees, $\sum_{\deg(v)\text{ odd}} \deg(v) = 2m - \sum_{\deg(v)\text{ even}} \deg(v)$ is even. A sum of odd numbers is even exactly when it has an even number of terms.
:::

Back to the party: seven guests with three handshakes each would give the odd degree sum $7 \cdot 3 = 21$, so no such party exists. More generally a $k$-regular graph on $n$ vertices has $nk/2$ edges, so if $k$ is odd then $n$ is even.

The degrees of a graph listed in non-increasing order form its **degree sequence**, and a sequence that is the degree sequence of some graph is **graphic**. By the handshake lemma a graphic sequence has even sum — a necessary condition, but not a sufficient one.

::: example Which sequences are graphic? {#ex-graphic}
Is there a graph with degree sequence (a) $(3, 3, 3, 1)$; (b) $(3, 3, 2, 2, 2)$?
::: solution
(a) The sum $10$ is even, so the handshake lemma does not rule it out. But such a graph has only four vertices, so each vertex of degree $3$ is adjacent to *all* three others — in particular to the fourth vertex $d$. Then $\deg(d) \ge 3$, contradicting $\deg(d) = 1$. The sequence is not graphic.

(b) The sum is $12$, so we need $6$ edges. Call the vertices $a, b$ (degree $3$) and $c, d, e$ (degree $2$), and try

$$
ab,\quad ac,\quad ad,\quad bc,\quad be,\quad de .
$$

Then $N(a) = \{b, c, d\}$, $N(b) = \{a, c, e\}$, $N(c) = \{a, b\}$, $N(d) = \{a, e\}$, $N(e) = \{b, d\}$, with degrees $3, 3, 2, 2, 2$. Notice the asymmetry: one example shows that a sequence *is* graphic, but showing that it is not needs a proof that *no* graph works.
:::
:::

::: quiz
Which of these are degree sequences of graphs? (More than one answer may be correct.)
- [ ] $(3, 3, 3, 3, 3)$
- [x] $(4, 4, 4, 4, 4)$
- [x] $(4, 3, 3, 2, 2)$
- [ ] $(3, 3, 3, 1)$
::: solution
$(3,3,3,3,3)$ has odd sum $15$. $(4,4,4,4,4)$ is the degree sequence of $K_5$. For $(4,3,3,2,2)$, join a vertex $a$ to the four others and add the path $d, b, c, e$. And $(3,3,3,1)$ was ruled out in [[#ex-graphic]] although its sum is even.
:::
:::

## A gallery of graphs

Some families of graphs occur so often that they have standard names.

- The **complete graph** $K_n$: $n$ vertices, every two adjacent; it has $\binom{n}{2} = \frac{n(n-1)}{2}$ edges.
- The **path** $P_n$: vertices $v_1, \dots, v_n$ and the $n - 1$ edges $v_1v_2, \dots, v_{n-1}v_n$. The **cycle** $C_n$ ($n \ge 3$) is $P_n$ plus the edge $v_nv_1$.
- The **complete bipartite graph** $K_{r,s}$: vertex set $X \cup Y$ with $\abs{X} = r$, $\abs{Y} = s$, and all $rs$ edges between $X$ and $Y$ (none inside $X$ or $Y$). $K_{1,s}$ is a **star**.
- The **cube** $Q_d$: the $2^d$ binary strings of length $d$, two being adjacent when they differ in exactly one position. Each string has $d$ neighbours, so $Q_d$ is $d$-regular with $d\,2^{d-1}$ edges by the handshake lemma; $Q_2$ is a $4$-cycle and $Q_3$ is the skeleton of a cube.
- The **Petersen graph**: the ten $2$-element subsets of $\{1, \dots, 5\}$, adjacent when disjoint. A pair is disjoint from exactly $\binom32 = 3$ others, so the graph is $3$-regular with $15$ edges. It is the standard counterexample to plausible conjectures in graph theory.

The **complement** $\overline{G}$ has the same vertices as $G$, with $uv$ an edge of $\overline{G}$ exactly when it is not an edge of $G$.

::: widget graph
nodes: 12@0,2; 34@1.9,0.62; 15@1.18,-1.62; 23@-1.18,-1.62; 45@-1.9,0.62; 35@0,1; 25@0.95,0.31; 24@0.59,-0.81; 14@-0.59,-0.81; 13@-0.95,0.31
edges: 12-34; 34-15; 15-23; 23-45; 45-12; 12-35; 34-25; 15-24; 23-14; 45-13; 35-24; 25-14; 24-13; 14-35; 13-25
algorithm: none
caption: The Petersen graph, each vertex labelled by a 2-element subset of $\{1,\dots,5\}$: adjacent vertices have disjoint labels. Check a few edges against this rule, confirm that every vertex has degree $3$, and hunt for the shortest cycle — you will not find one shorter than $5$ ([[#exr-petersen-girth]]). Then drag vertices to look for a drawing without crossings: however hard you try, some edges cross, and [[discrete/colouring-planarity]] explains why.
:::

A graph $H$ is a **subgraph** of $G$ if $V(H) \subseteq V(G)$ and $E(H) \subseteq E(G)$, and a **spanning** subgraph if moreover $V(H) = V(G)$. For $S \subseteq V$ the **induced subgraph** $G[S]$ has vertex set $S$ and all edges of $G$ with both endpoints in $S$. We write $G - v$ for $G$ with the vertex $v$ and its incident edges deleted, and $G - e$, $G + e$ for $G$ with the edge $e$ deleted or added.

## Walks, paths and connectivity

::: definition Walks, trails, paths and cycles {#def-walk}
A **walk** of length $k$ from $u$ to $v$ is a sequence of vertices $u = v_0, v_1, \dots, v_k = v$ with $v_{i-1}v_i \in E$ for $i = 1, \dots, k$; it is **closed** if $u = v$. A **trail** is a walk that uses no edge twice, and a **path** is a walk that visits no vertex twice. A **cycle** is a closed walk $v_0, v_1, \dots, v_k = v_0$ of length $k \ge 3$ whose vertices $v_0, \dots, v_{k-1}$ are distinct.
:::

Lengths count edges, not vertices: a path with $k+1$ vertices has length $k$. Every path is a trail and every trail is a walk, but not conversely: in $K_4$ on $\{1,2,3,4\}$ the walk $1,2,1,3$ repeats an edge, and the trail $1, 2, 3, 1, 4$ repeats a vertex.

::: lemma Every walk contains a path {#lem-walk-path}
If there is a walk from $u$ to $v$, then there is a path from $u$ to $v$ using only edges of that walk.
:::

::: proof
Among the $u$–$v$ walks using only edges of the given walk, choose one, $W = (v_0, \dots, v_k)$, of smallest length (by the well-ordering principle, [[proofs/induction#thm-well-ordering]]). If $W$ repeated a vertex, $v_i = v_j$ with $i < j$, then cutting out the closed piece between them would give $v_0, \dots, v_i, v_{j+1}, \dots, v_k$ — still a $u$–$v$ walk, since $v_i = v_j$ is adjacent to $v_{j+1}$, but of length $k - (j - i) < k$. This contradicts minimality, so $W$ is a path.
:::

::: definition Connectivity and distance {#def-connected}
A vertex $u$ is **connected to** $v$ if there is a $u$–$v$ walk (equivalently, by [[#lem-walk-path]], a $u$–$v$ path). The graph $G$ is **connected** if every two of its vertices are connected. The **distance** $d(u,v)$ is the length of a shortest $u$–$v$ path, or $\infty$ if there is none.
:::

::: theorem Components {#thm-components}
"$u$ is connected to $v$" is an equivalence relation on $V$. If $V_1, \dots, V_c$ are its classes, then each induced subgraph $G[V_i]$ is connected and no edge joins two different classes. These subgraphs are the **components** of $G$; $G$ is connected exactly when $c = 1$.
:::

::: proof
The relation is reflexive (the walk $(u)$ has length $0$), symmetric (reverse the walk) and transitive (follow a $u$–$v$ walk by a $v$–$w$ walk). So it is an equivalence relation ([[proofs/relations#def-equivalence-relation]]) and its classes partition $V$ ([[proofs/relations#thm-partition]]). If $u, v \in V_i$, every vertex of a $u$–$v$ walk is connected to $u$ and so lies in $V_i$; thus the walk lies in $G[V_i]$, which is therefore connected. Finally, the endpoints of an edge are connected to each other, so lie in the same class.
:::

::: widget graph
nodes: A@0,2; B@1,3; C@1,1; D@2,2; E@3,2; F@4.5,3; G@5.5,3; H@5,1.8; I@4.5,0.6; J@5.5,0.6
edges: A-B; A-C; B-D; C-D; D-E; F-G; G-H; F-H; I-J
algorithm: bfs
start: A
caption: Breadth-first search from $A$ spreads along edges one layer at a time. Step through it: the layers are the distances $d(A,v)$, and the vertices reached are exactly the component of $A$. The other two components are never reached; to find all components a search must be restarted inside each one, which is how algorithms count components ([[discrete/graph-algorithms]] proves that the search is correct).
:::

Some edges hold a graph together more than others. An edge $e$ is a **bridge** if $G - e$ has more components than $G$.

::: lemma Bridges and cycles {#lem-bridge}
For an edge $e = xy$ of $G$ the following are equivalent: (i) $e$ is not a bridge; (ii) $x$ and $y$ are connected in $G - e$; (iii) $e$ lies on a cycle of $G$.
:::

::: proof
(i) ⇒ (ii). If $x$ and $y$ were in different components of $G - e$, adding $e$ back would merge these two components and leave the others alone, so $G$ would have fewer components than $G - e$, and $e$ would be a bridge.

(ii) ⇒ (iii). By [[#lem-walk-path]] there is an $x$–$y$ path in $G - e$. It has length at least $2$, since the only $x$–$y$ path of length $1$ is $e$ itself, so following it from $x$ to $y$ and returning along $e$ gives a cycle through $e$.

(iii) ⇒ (i). If $e$ lies on a cycle $C$, then $C$ minus $e$ is an $x$–$y$ path in $G - e$. Any walk that uses $e$ can be rerouted along this path, so vertices connected in $G$ remain connected in $G - e$, and $e$ is not a bridge.
:::

::: quiz
Which statement is true for **every** graph?
- [ ] If $G$ is connected, then $G - e$ is connected for every edge $e$.
- [x] Deleting an edge that lies on a cycle does not increase the number of components.
- [ ] Every closed walk of positive length contains a cycle.
- [ ] A walk that repeats no edge repeats no vertex.
::: solution
The second statement is [[#lem-bridge]]. The first fails for every edge of a path. The third fails for the closed walk $u, v, u$ along a single edge. The fourth fails for two triangles sharing a vertex $w$, which can be traversed by a trail passing through $w$ twice.
:::
:::

## Isomorphism

When are two graphs "the same"? Relabelling the vertices or redrawing the picture should not matter.

::: definition Isomorphism {#def-isomorphism}
Graphs $G$ and $H$ are **isomorphic**, written $G \cong H$, if there is a bijection $\varphi\colon V(G) \to V(H)$ ([[proofs/functions#def-bijective]]) such that for all $u, v \in V(G)$,

$$
uv \in E(G) \iff \varphi(u)\varphi(v) \in E(H).
$$

Such a bijection is called an **isomorphism**.
:::

An isomorphism renames the vertices so that edges go to edges and non-edges to non-edges. Any quantity defined purely from vertices and adjacency is therefore the same for isomorphic graphs; such a quantity is called an **invariant**.

::: proposition Invariants {#prop-invariants}
If $\varphi\colon V(G)\to V(H)$ is an isomorphism, then $G$ and $H$ have the same numbers of vertices and edges, $\deg(\varphi(v)) = \deg(v)$ for every $v$ (so the degree sequences agree), and $\varphi$ carries paths and cycles of $G$ to paths and cycles of $H$ of the same length. In particular $G$ and $H$ have the same number of cycles of each length, and $G$ is connected if and only if $H$ is.
:::

::: proof
The defining property says $u \in N(v) \iff \varphi(u) \in N(\varphi(v))$, and $\varphi$ is a bijection, so $\varphi$ maps $N(v)$ bijectively onto $N(\varphi(v))$; hence degrees agree, and by the handshake lemma so do the numbers of edges. If $v_0, \dots, v_k$ is a walk in $G$, then $\varphi(v_0), \dots, \varphi(v_k)$ is a walk in $H$ with repeated vertices in exactly the same places (as $\varphi$ is injective), so paths go to paths and cycles to cycles. Since $\varphi^{-1}$ is an isomorphism from $H$ to $G$, everything holds in the reverse direction too.
:::

::: example Proving non-isomorphism {#ex-noniso}
Show that the graphs in each pair are not isomorphic, although their degree sequences agree: (a) $C_6$ and two disjoint triangles; (b) the triangular prism (triangles $a_1a_2a_3$ and $b_1b_2b_3$ plus the edges $a_1b_1, a_2b_2, a_3b_3$) and $K_{3,3}$.
::: solution
(a) Both have six vertices of degree $2$ and six edges. But $C_6$ is connected and the two triangles are not, and connectedness is an invariant ([[#prop-invariants]]).

(b) Both are connected and $3$-regular with six vertices and nine edges. The prism contains the triangle $a_1a_2a_3$. In $K_{3,3}$, with parts $X$ and $Y$, every edge joins $X$ to $Y$, so a walk can return to its starting side only after an even number of steps, and there is no cycle of length $3$. The number of triangles is an invariant, so the graphs are not isomorphic.
:::
:::

::: example A graph isomorphic to its complement {#ex-self-complementary}
Show that $C_5 \cong \overline{C_5}$.
::: solution
Label the vertices $0, 1, 2, 3, 4$, so that $ij$ is an edge of $C_5$ exactly when $j - i \equiv \pm 1 \pmod 5$. The other five of the ten pairs, those with $j - i \equiv \pm 2 \pmod 5$, are the edges of $\overline{C_5}$; they form the cycle $0, 2, 4, 1, 3, 0$ — the pentagram inside the pentagon.

Define $\varphi(i) = 2i \bmod 5$, which sends $0, 1, 2, 3, 4$ to $0, 2, 4, 1, 3$, a bijection. Since $\varphi(j) - \varphi(i) \equiv 2(j - i) \pmod 5$, we have $j - i \equiv \pm 1$ if and only if $\varphi(j) - \varphi(i) \equiv \pm 2$ (multiply by $2$; for the converse multiply by $3$, as $2 \cdot 3 \equiv 1$). So $ij \in E(C_5) \iff \varphi(i)\varphi(j) \in E(\overline{C_5})$, and $\varphi$ is an isomorphism.
:::
:::

::: widget graph
nodes: 1@0,2; 2@0,-2; 3@-2,0; 4@2,0; 5@-1.41,1.41; 6@1.41,-1.41; 7@1.41,1.41; 8@-1.41,-1.41
edges: 1-2; 2-3; 3-4; 4-1; 5-6; 6-7; 7-8; 8-5; 1-5; 2-6; 3-7; 4-8
algorithm: none
caption: This tangle is the cube $Q_3$ in disguise. Drag the vertices until it looks like a cube: $1, 2, 3, 4$ around an outer square, $5, 6, 7, 8$ around an inner square, each outer vertex $i$ joined to the inner vertex $i + 4$. The dots move but the edges never change — dragging alters the drawing, never the graph.
:::

::: warning Invariants only prove non-isomorphism
Equal invariants do **not** show that two graphs are isomorphic — $C_6$ and two disjoint triangles share their numbers of vertices and edges and their degree sequence. To prove $G \cong H$ you must exhibit a bijection and check that it preserves adjacency. To prove $G \not\cong H$, find one invariant on which they differ.
:::

::: quiz
Graphs $G$ and $H$ both have $8$ vertices and $12$ edges, and every vertex of each has degree $3$. What can you conclude?
- [ ] $G \cong H$, because the degree sequences agree.
- [x] Nothing yet: they may or may not be isomorphic.
- [ ] $G \not\cong H$, because different graphs are never isomorphic.
- [ ] $G \cong H$ provided both are connected.
::: solution
The cube $Q_3$ and two disjoint copies of $K_4$ both fit the description, but only the first is connected. Even connected examples can differ: $Q_3$ has no triangles, while there are connected $3$-regular graphs on $8$ vertices that do (try to build one).
:::
:::

::: remark How many graphs are there?
On the vertex set $[n] = \{1, \dots, n\}$ each of the $\binom n2$ pairs is an edge or not, so there are $2^{\binom n2}$ labelled graphs; up to isomorphism there are far fewer — $64$ labelled graphs on four vertices fall into just $11$ isomorphism classes. Deciding quickly whether two large graphs are isomorphic is a famous problem: in 2015 László Babai announced an algorithm far faster than trying all $n!$ bijections, but whether a polynomial-time algorithm exists is unknown.
:::

## Bipartite graphs

::: definition Bipartite graph {#def-bipartite}
A graph is **bipartite** if its vertex set can be split into two disjoint sets $X$ and $Y$ (a **bipartition**) such that every edge has one endpoint in $X$ and the other in $Y$.
:::

Examples are $K_{r,s}$; the even cycles, whose vertices alternate between the sides; and $Q_d$, with $X$ the strings with an even number of $1$s, since changing one bit changes this parity. An odd cycle is *not* bipartite: going round it the sides alternate, so after an odd number of steps we should be on the opposite side — yet we are back where we started. Remarkably, odd cycles are the *only* obstruction.

::: lemma Odd closed walks {#lem-odd-walk}
Every closed walk of odd length contains a cycle of odd length (using only vertices and edges of the walk).
:::

::: proof
Strong induction on the length $k$ of the walk ([[proofs/induction#thm-strong-induction]]). Let $W = (v_0, v_1, \dots, v_k = v_0)$ with $k$ odd; as there are no loops, $k \ge 3$. If $v_0, \dots, v_{k-1}$ are distinct, $W$ is an odd cycle. Otherwise $v_i = v_j$ for some $0 \le i < j \le k-1$, and $W$ splits into the closed walks

$$
(v_i, v_{i+1}, \dots, v_j) \quad\text{and}\quad (v_0, \dots, v_i, v_{j+1}, \dots, v_k)
$$

of lengths $j - i$ and $k - (j - i)$, both between $1$ and $k - 1$. These lengths add up to the odd number $k$, so one of the walks has odd length; it is shorter than $W$, so by the induction hypothesis it contains an odd cycle.
:::

::: theorem Characterisation of bipartite graphs {#thm-bipartite}
A graph is bipartite if and only if it contains no cycle of odd length.
:::

::: proof
($\Rightarrow$) Let $(X, Y)$ be a bipartition and $v_0, v_1, \dots, v_k = v_0$ a cycle. Consecutive vertices lie on opposite sides, so $v_i$ is on the side of $v_0$ exactly when $i$ is even. As $v_k = v_0$, $k$ is even.

($\Leftarrow$) Suppose $G$ has no odd cycle. In each component choose a root $r$, and put a vertex $v$ of that component into $X$ if $d(r,v)$ is even and into $Y$ if it is odd. Edges never join different components ([[#thm-components]]), so consider an edge $uv$ in the component with root $r$. A shortest path to $u$ followed by the edge $uv$ shows $d(r,v) \le d(r,u) + 1$, and similarly $d(r,u) \le d(r,v) + 1$. If $u$ and $v$ were on the same side, $d(r,u)$ and $d(r,v)$ would have the same parity and differ by at most $1$, hence be equal, say to $d$. Then a shortest path from $r$ to $u$, the edge $uv$, and a shortest path from $v$ back to $r$ would form a closed walk of odd length $2d + 1$, which by [[#lem-odd-walk]] contains an odd cycle — a contradiction. So every edge joins $X$ to $Y$.
:::

The proof is an algorithm: colour the breadth-first layers from a root alternately; either every edge joins the two colours, or some edge joins two vertices of the same layer and an odd cycle can be read off.

::: example Testing for bipartiteness {#ex-bipartite-test}
Let $G$ be the $6$-cycle $1, 2, 3, 4, 5, 6, 1$ plus the three long diagonals $14$, $25$, $36$, and let $G'$ be the $6$-cycle plus the single chord $13$. Which is bipartite? Is the Petersen graph bipartite?
::: solution
In $G$, from root $1$ the neighbours $2, 6, 4$ are at distance $1$, and $3, 5$ (both adjacent to $2$) at distance $2$. So $X = \{1, 3, 5\}$, $Y = \{2, 4, 6\}$, and every edge — cycle edges and diagonals alike — joins an odd label to an even one: $G$ is bipartite (indeed $G \cong K_{3,3}$).

In $G'$, from root $1$ the vertices $2$, $6$ and $3$ are at distance $1$, and the edge $23$ joins two of them. The closed walk of the proof is $1, 2, 3, 1$, a triangle, so $G'$ is not bipartite.

The Petersen graph contains the $5$-cycle $12, 34, 15, 23, 45$ (the outer pentagon of the figure), so by [[#thm-bipartite]] it is not bipartite.
:::
:::

## Trees

::: definition Forests and trees {#def-tree}
A graph with no cycles is **acyclic**, or a **forest**. A connected forest is a **tree**.
:::

Family trees, folders on a computer and the carbon skeletons of alkane molecules are trees, and so are paths and stars; the components of a forest are trees.

::: lemma Leaves {#lem-leaves}
Every tree $T$ with at least two vertices has at least two leaves, and if $v$ is a leaf then $T - v$ is a tree.
:::

::: proof
$T$ is connected with at least two vertices, so it has an edge. Choose a path $v_0, v_1, \dots, v_k$ of maximum length, so $k \ge 1$. If $v_0$ had a neighbour $w \ne v_1$, then either $w$ is off the path and $w, v_0, \dots, v_k$ is a longer path, or $w = v_i$ with $i \ge 2$ and $v_0, v_1, \dots, v_i, v_0$ is a cycle — both impossible. So $v_0$ is a leaf. Likewise $v_k$ is a leaf, and $v_k \ne v_0$ because $k \ge 1$.

If $v$ is a leaf, $T - v$ is acyclic because $T$ is. It is connected because an inner vertex of a path has two neighbours on the path, while $v$ has only one; so a path between two vertices other than $v$ avoids $v$ and survives in $T - v$.
:::

::: theorem Characterisations of trees {#thm-trees}
For a graph $G$ with $n$ vertices the following are equivalent:

1. $G$ is a tree (connected and acyclic);
2. $G$ is connected and has exactly $n - 1$ edges;
3. $G$ is acyclic and has exactly $n - 1$ edges;
4. any two vertices of $G$ are joined by exactly one path.
:::

::: proof
**Step 1: a tree with $n$ vertices has $n - 1$ edges.** Induction on $n$ ([[proofs/induction#thm-induction]]): a one-vertex tree has no edges, and for $n \ge 2$ removing a leaf ([[#lem-leaves]]) leaves a tree with $n - 1$ vertices, hence $n - 2$ edges, so $T$ has $n - 1$. This gives (1) ⇒ (2) and (1) ⇒ (3).

**(2) ⇒ (1).** Let $G$ be connected with $n - 1$ edges, and suppose it has a cycle. Deleting an edge of a cycle keeps $G$ connected ([[#lem-bridge]]); repeat until no cycle is left. We end with a tree on $n$ vertices having fewer than $n - 1$ edges, contradicting Step 1.

**(3) ⇒ (1).** Let $G$ be acyclic with $n - 1$ edges and components of sizes $n_1, \dots, n_c$. Each component is a tree, so by Step 1 $G$ has $\sum_i (n_i - 1) = n - c$ edges. Hence $c = 1$.

**(1) ⇒ (4).** Connectedness gives at least one path. Suppose $P \ne Q$ are two $u$–$v$ paths. Some edge of $P$ is not on $Q$ — a path from $u$ using only edges of $Q$ is forced to follow $Q$ step by step, and would equal $Q$. Let $e = xy$ be such an edge, with $x$ before $y$ on $P$. Going from $x$ back along $P$ to $u$, along $Q$ to $v$, and back along $P$ to $y$ avoids $e$, so $x$ and $y$ are connected in $G - e$, and $e$ lies on a cycle by [[#lem-bridge]] — impossible in a tree.

**(4) ⇒ (1).** $G$ is connected. If it had a cycle through consecutive vertices $x, y$, the edge $xy$ and the rest of the cycle would be two different $x$–$y$ paths.
:::

::: corollary Spanning trees {#cor-spanning-tree}
Every connected graph has a spanning tree, so a connected graph with $n$ vertices has at least $n - 1$ edges. A forest with $n$ vertices and $c$ components has exactly $n - c$ edges.
:::

::: proof
Delete edges lying on cycles one at a time; each deletion keeps the graph connected ([[#lem-bridge]]), and at the end we have a connected acyclic spanning subgraph, with $n - 1$ edges by [[#thm-trees]]. The count for forests was shown in the proof of (3) ⇒ (1).
:::

::: example Counting leaves {#ex-leaves}
A tree has two vertices of degree $4$, one of degree $3$, and all its other vertices are leaves. How many leaves are there?
::: solution
With $L$ leaves, $n = 3 + L$ and $m = n - 1 = 2 + L$ by [[#thm-trees]]. The handshake lemma gives

$$
4 + 4 + 3 + L = 2m = 4 + 2L,
$$

so $L = 7$. Such a tree exists: join $a$ to $b$, attach three leaves to $a$, two leaves and a vertex $c$ to $b$, and two leaves to $c$; this has $10$ vertices and the right degrees.
:::
:::

::: quiz
A forest has $20$ vertices and $3$ components. How many edges does it have?
- [ ] $19$
- [x] $17$
- [ ] $20$
- [ ] It depends on the shapes of the components.
::: solution
Each component is a tree with one edge fewer than vertices, so the forest has $20 - 3 = 17$ edges whatever the components look like ([[#cor-spanning-tree]]).
:::
:::

### Counting labelled trees

How many trees have vertex set $[n]$? For $n = 3$ there are three (choose the middle vertex of the path); for $n = 4$ there are sixteen, namely $4$ stars and $4!/2 = 12$ paths.

::: theorem Cayley's formula {#thm-cayley}
For $n \ge 2$ there are exactly $n^{n-2}$ trees with vertex set $[n]$.
:::

::: proof {collapsed}
*Sketch (Prüfer's bijection).* Given a tree on $[n]$, repeat $n - 2$ times: delete the leaf with the smallest label and record the label of its neighbour. The resulting **Prüfer code** lies in $[n]^{n-2}$, and each vertex $v$ occurs in it exactly $\deg(v) - 1$ times. Conversely, from any sequence in $[n]^{n-2}$ the tree can be rebuilt: at each step the deleted leaf must be the smallest label not yet deleted that does not occur in the remaining part of the sequence, and the last two vertices are joined at the end. So the code is a bijection between trees and sequences, and there are $n^{n-2}$ trees. Full details, and three further proofs, are in Aigner and Ziegler, *Proofs from THE BOOK*.
:::

For example, the tree on $[7]$ with edges $13, 23, 35, 45, 56, 67$ loses the leaves $1, 2, 3, 4, 5$ in that order (each becomes the smallest leaf in turn), recording the code $(3, 3, 5, 5, 6)$: the degree-$3$ vertices $3$ and $5$ occur twice, the degree-$2$ vertex $6$ once, and the leaves not at all.

## The adjacency matrix

If $V = \{v_1, \dots, v_n\}$, the **adjacency matrix** of $G$ is the $n \times n$ matrix $A$ with $A_{ij} = 1$ if $v_iv_j \in E$ and $A_{ij} = 0$ otherwise. It is symmetric with zero diagonal, and its row sums are the degrees. Matrix multiplication counts walks.

::: theorem Walks and powers of the adjacency matrix {#thm-walks}
For every $k \ge 1$, the entry $(A^k)_{ij}$ is the number of walks of length $k$ from $v_i$ to $v_j$.
:::

::: proof
Induction on $k$. A walk of length $1$ is an edge, so the case $k = 1$ is the definition of $A$. A walk of length $k+1$ from $v_i$ to $v_j$ is a walk of length $k$ from $v_i$ to some $v_l$ followed by an edge $v_lv_j$. For each $l$ there are $(A^k)_{il}$ choices for the first part (by the induction hypothesis) and $A_{lj} \in \{0, 1\}$ for the last step, so the number of walks is $\sum_{l} (A^k)_{il}\,A_{lj} = (A^{k+1})_{ij}$.
:::

A triangle $xyz$ gives exactly six closed walks of length $3$ (three starting points, two directions), and every closed walk of length $3$ comes from a triangle, so

$$
\text{number of triangles in } G = \frac{\operatorname{tr}(A^3)}{6}.
$$ {#eq-triangles}

::: example Walks in the paw {#ex-paw}
The *paw* has vertices $1, 2, 3, 4$ and edges $12, 13, 23, 34$. Compute $A^2$ and $A^3$ and interpret some entries.
::: solution
$$
A = \begin{pmatrix} 0&1&1&0\\ 1&0&1&0\\ 1&1&0&1\\ 0&0&1&0 \end{pmatrix},\qquad
A^2 = \begin{pmatrix} 2&1&1&1\\ 1&2&1&1\\ 1&1&3&0\\ 1&1&0&1 \end{pmatrix},\qquad
A^3 = \begin{pmatrix} 2&3&4&1\\ 3&2&4&1\\ 4&4&2&3\\ 1&1&3&0 \end{pmatrix}.
$$

The diagonal of $A^2$ lists the degrees $2, 2, 3, 1$, since a closed walk of length $2$ goes along an edge and back. $(A^2)_{14} = 1$ counts the walk $1, 3, 4$, and $(A^2)_{34} = 0$ as $3$ and $4$ have no common neighbour. $(A^3)_{12} = 3$ counts $1,2,1,2$ and $1,3,1,2$ and $1,2,3,2$. Finally $\operatorname{tr}(A^3) = 6$, so by [[#eq-triangles]] the paw has exactly one triangle, $123$.
:::
:::

::: application Spectra and random walks
The eigenvalues of $A$, the *spectrum* of the graph, carry structural information: for instance, a connected graph is bipartite exactly when the negative of its largest eigenvalue is also an eigenvalue. They also govern random walks on the graph, the Markov chains of [[probability/markov-chains]] — the idea behind ranking web pages by where a random surfer spends most time.
:::

::: history
Graph theory is usually dated to Leonhard Euler's solution of the Königsberg bridge problem in the 1730s ([[discrete/graph-algorithms]]). Trees arrived a century later: Gustav Kirchhoff used spanning trees to analyse electrical networks in 1847, and Arthur Cayley counted rooted trees in 1857 and in the 1870s used trees to count the isomers of alkanes $\mathrm{C}_k\mathrm{H}_{2k+2}$. The word *graph* was introduced by James Joseph Sylvester in an 1878 note in *Nature* comparing chemical diagrams with algebra. Cayley published the formula $n^{n-2}$ in 1889, though Carl Wilhelm Borchardt had an equivalent result in 1860; Heinz Prüfer's bijective proof dates from 1918. The first textbook of the subject, Dénes Kőnig's *Theorie der endlichen und unendlichen Graphen*, appeared in 1936.
:::

## Where this leads

Breadth-first search, correctness proof included, opens [[discrete/graph-algorithms]], where spanning trees of minimum weight and Euler's theorem on walks using every edge also appear. Bipartite graphs return in [[discrete/colouring-planarity]] as the graphs that can be coloured with two colours, and as the setting of Hall's matching theorem. The adjacency matrix leads to spectral graph theory via [[linear-algebra/eigenvalues]], and counting graphs up to isomorphism is a question about symmetry, the subject of [[abstract-algebra/group-actions]].

::: summary
- A graph is a vertex set with a set of $2$-element subsets (edges); a drawing is just one picture of it. The handshake lemma $\sum_v \deg(v) = 2m$ forces an even number of odd-degree vertices ([[#thm-handshake]]).
- Walks may repeat anything, trails no edge, paths no vertex; every walk contains a path. "Connected to" is an equivalence relation whose classes are the components ([[#thm-components]]).
- An edge is a bridge exactly when it lies on no cycle ([[#lem-bridge]]).
- Isomorphism is relabelling that preserves adjacency. Invariants can prove two graphs different; proving them isomorphic needs an explicit bijection.
- A graph is bipartite if and only if it has no odd cycle, and breadth-first layers give the bipartition ([[#thm-bipartite]]).
- Trees are characterised as connected and acyclic, connected with $n - 1$ edges, acyclic with $n - 1$ edges, or by unique paths ([[#thm-trees]]); every connected graph has a spanning tree, and there are $n^{n-2}$ labelled trees on $[n]$.
- $(A^k)_{ij}$ counts the walks of length $k$ from $v_i$ to $v_j$.
:::

## Exercises

::: exercise Edges of a cube {level=1 check="32"}
How many edges does the $4$-dimensional cube $Q_4$ have?
::: solution
$Q_4$ has $2^4 = 16$ vertices, each of degree $4$. By the handshake lemma $2m = 64$, so $m = 32$.
:::
:::

::: exercise Edges from degrees {level=1 check="9"}
A graph has degree sequence $(4, 3, 3, 2, 2, 2, 1, 1)$. How many edges does it have?
::: solution
The degrees add up to $18 = 2m$, so $m = 9$.
:::
:::

::: exercise How many leaves? {level=1 check="5"}
A tree has three vertices of degree $3$, two vertices of degree $2$, and all its other vertices are leaves. How many leaves does it have?
::: solution
With $L$ leaves, $n = 5 + L$ and $m = 4 + L$. The handshake lemma gives $9 + 4 + L = 2(4 + L)$, so $L = 5$. (Example: a path $a, b, c$ of the degree-$3$ vertices, two leaves on each of $a$ and $c$, and the path $b, d, e, f$ with $d, e$ of degree $2$ and $f$ a leaf.)
:::
:::

::: exercise A graph or its complement {level=2}
Prove that for every graph $G$, at least one of $G$ and $\overline{G}$ is connected.
::: hint
Assume $G$ is disconnected and take two vertices $u, v$. Are they in the same component of $G$?
:::
::: solution
Suppose $G$ is disconnected, and let $u \ne v$. If they lie in different components of $G$, then $uv \notin E(G)$, so $uv$ is an edge of $\overline{G}$. If they lie in the same component, pick $w$ in another component; then $uw, vw \notin E(G)$, so $u, w, v$ is a path in $\overline{G}$. Either way $u$ and $v$ are connected in $\overline{G}$, so $\overline{G}$ is connected.
:::
:::

::: exercise Two vertices with the same degree {level=2}
Prove that every graph with at least two vertices has two vertices of the same degree.
::: hint
The possible degrees are $0, 1, \dots, n-1$. Can $0$ and $n-1$ both occur? Then use the pigeonhole principle ([[discrete/advanced-counting#thm-pigeonhole]]).
:::
::: solution
Each degree lies in $\{0, 1, \dots, n-1\}$. The values $0$ and $n-1$ cannot both occur: a vertex of degree $n-1$ is adjacent to every other vertex, so no vertex is isolated. Hence the $n$ degrees take at most $n-1$ values, and by the pigeonhole principle two of them are equal.
:::
:::

::: exercise Trees in which vertex 1 is a leaf {level=2 check="625"}
How many trees with vertex set $[6]$ have vertex $1$ as a leaf?
::: hint
In the Prüfer code a vertex $v$ occurs exactly $\deg(v) - 1$ times.
:::
::: solution
Vertex $1$ is a leaf exactly when it does not occur in the Prüfer code. The code is a bijection between trees on $[6]$ and $[6]^4$, so these trees correspond to the sequences in $\{2, \dots, 6\}^4$: there are $5^4 = 625$ of them, out of $6^4 = 1296$ trees.
:::
:::

::: exercise Triangles by matrix {level=2 check="7"}
How many triangles does $K_5$ with one edge removed contain? Check your answer with [[#eq-triangles]].
::: solution
$K_5$ has $\binom53 = 10$ triangles, of which $3$ contain the removed edge $uv$ (one for each third vertex), leaving $7$. With the adjacency matrix one finds $\operatorname{tr}(A^3) = 42 = 6 \cdot 7$.
:::
:::

::: exercise Many edges force connectivity {level=3}
Prove that a graph with $n$ vertices and more than $\binom{n-1}{2}$ edges is connected, and that the bound cannot be lowered.
::: hint
If $G$ is disconnected, let $C$ be one component and count the pairs between $C$ and the rest, none of which can be edges.
:::
::: solution
Suppose $G$ is disconnected, and let $C$ be the vertex set of a component, $\abs{C} = k$ with $1 \le k \le n-1$. None of the $k(n-k)$ pairs between $C$ and $V \setminus C$ is an edge, so $m \le \binom{n}{2} - k(n-k)$. Since

$$
k(n-k) - (n-1) = (k-1)(n-1-k) \ge 0,
$$

we get $m \le \binom n2 - (n - 1) = \binom{n-1}{2}$. So more than $\binom{n-1}2$ edges force connectivity. The bound is sharp: $K_{n-1}$ plus an isolated vertex has $\binom{n-1}{2}$ edges and is disconnected.
:::
:::

::: exercise The Petersen graph has no short cycles {#exr-petersen-girth level=3}
Using the description by $2$-element subsets of $\{1, \dots, 5\}$, prove that the Petersen graph has no cycles of length $3$ or $4$.
::: solution
*Triangles.* Three pairwise adjacent vertices would be three pairwise disjoint $2$-element subsets of a $5$-element set, containing $6$ distinct elements — impossible.

*$4$-cycles.* Suppose $A, B, C, D, A$ is a $4$-cycle, so $A, B, C, D$ are distinct and $A \cap B$, $B \cap C$, $C \cap D$, $D \cap A$ are empty. Both $A$ and $C$ are disjoint from $B$, so they are distinct $2$-element subsets of the $3$-element set $\{1, \dots, 5\} \setminus B$; they share one element and $\abs{A \cup C} = 3$. Now $B$ and $D$ are both disjoint from $A \cup C$, so both equal the $2$-element set $\{1, \dots, 5\} \setminus (A \cup C)$. Thus $B = D$, a contradiction.
:::
:::

::: exercise High degree forces many leaves {level=3}
Let $T$ be a tree with a vertex of degree $k \ge 2$. Prove that $T$ has at least $k$ leaves.
::: hint
Let $n_i$ be the number of vertices of degree $i$. Combine $\sum_i i\,n_i = 2(n-1)$ with $n = \sum_i n_i$.
:::
::: solution
$T$ has no isolated vertices, so $n = \sum_{i \ge 1} n_i$, and by the handshake lemma and [[#thm-trees]], $\sum_{i\ge1} i\,n_i = 2n - 2 = \sum_{i \ge 1} 2n_i - 2$. Rearranging,

$$
n_1 = 2 + \sum_{i \ge 3} (i - 2)\,n_i .
$$

All terms of the sum are non-negative. If $k \ge 3$ the sum contains $(k-2)n_k \ge k - 2$, so $n_1 \ge k$; if $k = 2$, then $n_1 \ge 2 = k$ directly.
:::
:::
