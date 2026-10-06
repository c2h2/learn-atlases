Count the vertices, edges and faces of a cube: $8 - 12 + 6 = 2$. For a tetrahedron, $4 - 6 + 4 = 2$; for an octahedron, $6 - 12 + 8 = 2$; for a soccer ball, $60 - 90 + 32 = 2$. Leonhard Euler noticed in 1750 that $V - E + F = 2$ for every convex polyhedron. But for a "picture frame" polyhedron with a square tunnel through it, the same count gives $0$. The number $V - E + F$ does not care about the shape or the number of faces; it detects how many holes the surface has. It is our first example of a **topological invariant computed by counting** — the **Euler characteristic**.

This chapter brings together everything in the course. We define surfaces, compute their Euler characteristics from triangulations and from the polygon presentations of [[topology/quotient-spaces]], introduce **orientability** (the property the Möbius band lacks), and build new surfaces by **connected sum**. The climax is the **classification of closed surfaces**: every compact connected surface is a sphere, a connected sum of tori, or a connected sum of projective planes, and it is determined by just two pieces of data, its orientability and its Euler characteristic. We close with Euler's formula for planar graphs and its classical consequence, the five Platonic solids.

## Surfaces

::: definition Surface {#def-surface}
A **surface** is a Hausdorff, second countable topological space in which every point has an open neighbourhood homeomorphic to an open disc in $\R^2$. A **closed surface** is a compact, connected surface.
:::

The local condition says that a small creature living on the surface sees, around each point, a piece of a plane. The Hausdorff condition excludes examples like the line with two origins ([[topology/quotient-spaces#ex-two-origins]]), and second countability excludes some exotic, "too large" spaces. Examples of closed surfaces are the sphere $S^2$, the torus $T = S^1\times S^1$, the Klein bottle $K$ and the projective plane $\R P^2$ from [[topology/quotient-spaces]]. The plane, an open disc and the open Möbius band are surfaces but not closed (they are not compact). The closed disc and the closed Möbius band are **surfaces with boundary**: points on the boundary circle have neighbourhoods like a half-disc instead.

::: example Not a surface {#ex-double-cone}
Show that the double cone $C = \set{(x, y, z)\in\R^3 : x^2 + y^2 = z^2}$ is not a surface.
::: solution
Away from the origin, $C$ is locally a smooth surface. Suppose the apex $0$ had an open neighbourhood $W\subseteq C$ homeomorphic to an open disc $D$, say $h\colon W\to D$. Choose a small ball $B$ around $0$ with $B\cap C\subseteq W$; then $h(B\cap C)$ is an open set containing $h(0)$, so it contains a small open disc $D'$ around $h(0)$, and $V = h^{-1}(D')$ is an open neighbourhood of $0$ homeomorphic to a disc. Now $D'\setminus\set{h(0)}$ is connected (a punctured disc is path-connected), but $V\setminus\set0$ is not: it lies in $C\setminus\set0$, which is the union of the two disjoint open pieces $z > 0$ and $z < 0$, and $V$ meets both (it contains points of $C$ arbitrarily close to $0$ on either side). This contradicts the homeomorphism between $V\setminus\set0$ and $D'\setminus\set{h(0)}$. So the apex has no disc neighbourhood, and $C$ is not a surface. (The single cone $z = \sqrt{x^2 + y^2}$, by contrast, *is* a surface: projection to the $xy$-plane is a homeomorphism.)
:::
:::

## Triangulations and the Euler characteristic

To count vertices, edges and faces on a surface we cut it into triangles.

::: definition Triangulation and Euler characteristic {#def-euler}
A **triangulation** of a compact surface $S$ is a finite collection of closed subsets of $S$, the **triangles**, each equipped with a homeomorphism from a triangle in the plane (which determines its three **vertices** and three **edges**), such that the triangles cover $S$ and any two distinct triangles are either disjoint, or meet in a single common vertex, or meet in a single common edge. If the triangulation has $V$ vertices, $E$ edges and $F$ triangles, the **Euler characteristic** of $S$ is

$$
\chi(S) = V - E + F .
$$ {#eq-euler}
:::

Two foundational theorems make this a good definition. We state them without proof; the proofs are genuinely hard: (1) is proved in Moise, *Geometric Topology in Dimensions 2 and 3*, and (2) in Armstrong, *Basic Topology*, Chapter 9, using the homology groups of Chapter 8.

::: theorem Existence and invariance {#thm-invariance}
1. (Radó, 1925) Every compact surface has a triangulation.
2. The number $V - E + F$ is the same for all triangulations of a given compact surface, and homeomorphic compact surfaces have the same Euler characteristic.
:::

Part (2) is usually proved by showing that $V - E + F$ equals an alternating sum of ranks of homology groups, which are topological invariants. Part (1) is surprisingly delicate (the analogous statement fails for some four-dimensional manifolds).

In practice we do not need *triangles*. Suppose a compact surface is cut into finitely many polygons, glued along edges, each polygon being a closed disc whose boundary is a cycle of edges. Then $V - E + F$ (with $F$ the number of polygons) still equals $\chi$. The reason is that the subdivision moves that turn such a decomposition into a triangulation never change $V - E + F$:

- adding a new vertex in the middle of an edge: $V$ and $E$ both increase by $1$;
- adding a diagonal across a polygon face: $E$ and $F$ both increase by $1$;
- adding a vertex inside a face and joining it to the $k$ vertices of the face: $V$ increases by $1$, $E$ by $k$, and $F$ by $k - 1$ (one face is replaced by $k$ triangles), for a net change $1 - k + (k - 1) = 0$.

::: example Euler characteristics by counting {#ex-chi}
Compute the Euler characteristic of (a) the sphere, (b) the torus, (c) the Klein bottle and (d) the projective plane.
::: solution
(a) The surface of a cube is homeomorphic to the sphere (by radial projection from the centre), with $V - E + F = 8 - 12 + 6 = 2$. So $\chi(S^2) = 2$. The tetrahedron, octahedron, icosahedron ($12 - 30 + 20$) and dodecahedron ($20 - 30 + 12$) all give $2$ as well, as the invariance theorem predicts.

(b) Use the square with boundary word $aba^{-1}b^{-1}$ as a decomposition with one face. Its two edges are $a$ and $b$, and all four corners of the square are identified to a single vertex ([[topology/quotient-spaces]]): $V = 1$, $E = 2$, $F = 1$, so $\chi(T) = 0$. (A single square with identified edges is not a legitimate triangulation, but subdividing it into a $3\times3$ grid of squares and then into triangles leads, by the moves above, to a triangulation with the same value $0$.)

(c) The Klein bottle $aba^{-1}b$: label the corners of the square $v_0, v_1, v_2, v_3$ in order around the boundary. The two edges labelled $a$ run $v_0\to v_1$ and (being traversed backwards) $v_3\to v_2$, so $v_0\sim v_3$ and $v_1\sim v_2$; the edges labelled $b$ run $v_1\to v_2$ and $v_3\to v_0$, so $v_1\sim v_3$ and $v_2\sim v_0$. All four corners are one vertex, and $\chi(K) = 1 - 2 + 1 = 0$.

(d) $\R P^2$ is $abab$: the $a$-edges run $v_0\to v_1$ and $v_2\to v_3$, the $b$-edges $v_1\to v_2$ and $v_3\to v_0$, giving $v_0\sim v_2$ and $v_1\sim v_3$ — two vertices. So $\chi(\R P^2) = 2 - 2 + 1 = 1$.
:::
:::

::: example A genuine triangulation of the torus {#ex-torus-triangulation}
Divide the square into a $3\times3$ grid of small squares and cut each small square into two triangles by the diagonal from its lower left to its upper right corner. With the identifications of the torus, show that this is a triangulation and compute $V - E + F$.
::: solution
The grid has $4\times4$ points, but the identifications $(0, y)\sim(1, y)$ and $(x, 0)\sim(x, 1)$ glue the last column of points to the first and the top row to the bottom, leaving $3\times3 = 9$ vertices. The edges: in each of the $3$ rows of vertices there are $3$ horizontal edges, so $9$ horizontal edges; likewise $9$ vertical edges; and $9$ diagonals, one per small square. So $E = 27$, and there are $F = 2\cdot9 = 18$ triangles. Each triangle has three distinct vertices, each pair of vertices is joined by at most one edge, and two triangles that share two vertices share the edge between them (this is why a $3\times3$ grid is needed: on a $2\times2$ grid, different edges would join the same pair of vertices, and some pairs of distinct triangles would even have the same three vertices). So we have a triangulation, and

$$
V - E + F = 9 - 27 + 18 = 0,
$$

in agreement with the one-square count $1 - 2 + 1 = 0$ of [[#ex-chi]](b).
:::
:::

::: widget graph
nodes: A@0,0; B@4,0; C@4,4; D@0,4; E@1,1; F@3,1; G@3,3; H@1,3
edges: A-B; B-C; C-D; D-A; E-F; F-G; G-H; H-E; A-E; B-F; C-G; D-H
algorithm: none
caption: The cube flattened onto the plane: look through the top face and stretch it. There are $8$ vertices and $12$ edges, and the plane is divided into $6$ regions — five bounded ones and the unbounded outside region, which is the face of the cube nearest to you. So $V - E + F = 2$. Drag the vertices around: as long as no edges cross, the count never changes.
:::

## Orientability

The torus and the Klein bottle have the same Euler characteristic, $0$, yet they are not homeomorphic (the torus sits in $\R^3$ with two sides; the Klein bottle has one). A second invariant is needed.

::: definition Orientability {#def-orientable}
A surface is **non-orientable** if it contains a subspace homeomorphic to the Möbius band, and **orientable** otherwise.
:::

Intuitively, an orientable surface allows a consistent choice of "clockwise" at every point. On a Möbius band, carrying a small clockwise circle once around the central loop brings it back anticlockwise. For a triangulated surface, orientability is equivalent to the possibility of orienting all triangles so that every edge is traversed in opposite directions by the two triangles containing it.

For a surface given by a polygon word there is a simple test: **the surface is non-orientable if and only if some letter occurs twice with the same exponent** (both $x$, or both $x^{-1}$). Indeed, if the two edges labelled $x$ are glued "the same way round", a thin strip across the polygon joining them is glued into a Möbius band, exactly as in the definition of the Möbius band as the square with $(0, y)\sim(1, 1 - y)$. Conversely, if every letter occurs once as $x$ and once as $x^{-1}$, all edges are glued with opposite orientations and the orientation of the polygon passes consistently across every edge. So the sphere $aa^{-1}$ and the torus $aba^{-1}b^{-1}$ are orientable, while the projective plane $abab$ and the Klein bottle $aba^{-1}b$ (whose $b$ edges have the same exponent) are not.

::: quiz
Which surfaces with the following polygon words are orientable? (Several may be correct.)
- [x] $aba^{-1}b^{-1}cdc^{-1}d^{-1}$
- [ ] $abab^{-1}$
- [x] $abca^{-1}b^{-1}c^{-1}$
- [ ] $aabb$
::: solution
By the test above, a word gives an orientable surface iff each letter appears once with exponent $+1$ and once with $-1$. That holds for the first and third words. In $abab^{-1}$ the letter $a$ appears twice with exponent $+1$, and in $aabb$ both letters do. (The first word is the genus-two surface, the third is a hexagonal presentation of the torus.)
:::
:::

## Connected sums

::: definition Connected sum {#def-connected-sum}
Let $M$ and $N$ be closed surfaces. Remove from each the interior of a small closed disc, and glue the two resulting boundary circles together by a homeomorphism. The resulting closed surface is the **connected sum** $M\# N$.
:::

One can show that the result does not depend, up to homeomorphism, on the choices of discs and gluing map (this uses the fact that any two embedded discs can be moved onto each other by a homeomorphism of the surface, which can moreover be chosen to reverse the orientation of the disc: by a reflection if the surface is orientable, by sliding the disc once around a Möbius band if it is not). The sphere is a neutral element: $M\# S^2\cong M$, since removing a disc from $S^2$ leaves a disc, which simply fills the hole again.

::: proposition Euler characteristic of a connected sum {#prop-connected-sum}
For closed surfaces $M$ and $N$, $\chi(M\# N) = \chi(M) + \chi(N) - 2$.
:::

::: proof
Choose triangulations of $M$ and $N$ and take the removed discs to be the interiors of one triangle in each. Removing the interior of a triangle lowers $F$ by $1$ and leaves $V$ and $E$ unchanged, so the two punctured surfaces have $V - E + F$ equal to $\chi(M) - 1$ and $\chi(N) - 1$. Glue the two boundary triangles together by matching their vertices and edges: in the result, $3$ pairs of vertices and $3$ pairs of edges have been identified, so $V$ and $E$ each drop by $3$ compared with the disjoint union, and the alternating sum is unchanged by the gluing. (If the glued triangulation is not yet a legitimate triangulation, because two triangles now share two edges, subdivide; by the invariance of $\chi$ under subdivision this does not change the count.) Hence $\chi(M\# N) = (\chi(M) - 1) + (\chi(N) - 1) - 3 + 3 = \chi(M) + \chi(N) - 2$.
:::

Iterating the connected sum produces two infinite families. The **orientable surface of genus $g$** is $\Sigma_g = T\# T\#\cdots\# T$ ($g$ tori), a "doughnut with $g$ holes", and the **non-orientable surface of genus $k$** is $N_k = \R P^2\#\cdots\#\R P^2$ ($k$ projective planes). By [[#prop-connected-sum]] and induction,

$$
\chi(\Sigma_g) = 2 - 2g, \qquad \chi(N_k) = 2 - k .
$$ {#eq-chi-families}

Their standard polygon words are $a_1b_1a_1^{-1}b_1^{-1}\cdots a_gb_ga_g^{-1}b_g^{-1}$ (a $4g$-gon) and $a_1a_1a_2a_2\cdots a_ka_k$ (a $2k$-gon); in each, all corners are identified to one vertex (for $g, k\ge1$), so the counts $1 - 2g + 1$ and $1 - k + 1$ confirm [[#eq-chi-families]].

::: widget surface
fx: (2 + cos(v))*cos(u)
fy: (2 + cos(v))*sin(u)
fz: sin(v)
u: 0, 2pi
v: 0, 2pi
color: gauss
caption: The torus coloured by its Gaussian curvature: positive on the outer half (where it is curved like a sphere), negative on the inner half (curved like a saddle), and zero on the top and bottom circles. The positive and negative parts cancel exactly: the total curvature is $0 = 2\pi\chi(T)$. For any closed surface in $\R^3$, the Gauss–Bonnet theorem says that the total Gaussian curvature equals $2\pi\chi$, linking geometry to this purely combinatorial count.
:::

## The classification theorem

::: theorem Classification of closed surfaces {#thm-classification}
Every closed surface is homeomorphic to exactly one of the following:

1. the sphere $S^2$;
2. the connected sum $\Sigma_g$ of $g\ge1$ tori;
3. the connected sum $N_k$ of $k\ge1$ projective planes.

Consequently two closed surfaces are homeomorphic if and only if they have the same Euler characteristic and are both orientable or both non-orientable.
:::

::: proof
We give a detailed sketch; complete proofs are in Armstrong, *Basic Topology*, Chapter 7, and Lee, *Introduction to Topological Manifolds*, Chapters 6 and 10.

*Step 1: a polygon.* By Radó's theorem the surface $S$ has a triangulation. Because $S$ is connected, the triangles can be listed so that each shares an edge with an earlier one. Gluing them one at a time along such edges produces a single polygon, whose boundary edges are identified in pairs (every edge of a triangulated closed surface lies in exactly two triangles). So $S$ is the quotient of a polygon by a word in which each letter appears exactly twice.

*Step 2: normal form.* The word is simplified by cutting the polygon along a diagonal and regluing along a matching pair of edges, which changes the word but not the surface. In order: (a) adjacent pairs $xx^{-1}$ can be cancelled (fold the polygon), unless the word is just $xx^{-1}$, which is the sphere; (b) by cutting and pasting, all vertices can be brought into a single equivalence class; (c) every pair of letters with the same exponent can be brought together as a **cross-cap** $xx$; (d) the remaining letters, which occur with opposite exponents, come in interlocked pairs that can be brought together as **handles** $xyx^{-1}y^{-1}$. The result is a word of the form $x_1x_1\cdots x_kx_k\,a_1b_1a_1^{-1}b_1^{-1}\cdots a_gb_ga_g^{-1}b_g^{-1}$, which presents $N_k\#\Sigma_g$.

*Step 3: Dyck's theorem.* If both handles and cross-caps occur, use the homeomorphism $T\#\R P^2\cong\R P^2\#\R P^2\#\R P^2$ (proved by cutting and pasting the corresponding words) to convert each handle into two cross-caps. So $S$ is a sphere, some $\Sigma_g$, or some $N_k$.

*Step 4: uniqueness.* Euler characteristic and orientability are topological invariants ([[#thm-invariance]]; orientability is defined topologically). Within the list, the sphere and the $\Sigma_g$ are orientable with $\chi = 2, 0, -2, -4,\dots$, and the $N_k$ are non-orientable with $\chi = 1, 0, -1,\dots$ — all different. So no two surfaces in the list are homeomorphic, and the pair (orientability, $\chi$) determines the surface.
:::

| surface | word | $\chi$ | orientable |
|---|---|---|---|
| sphere $S^2$ | $aa^{-1}$ | $2$ | yes |
| torus $T = \Sigma_1$ | $aba^{-1}b^{-1}$ | $0$ | yes |
| genus $g$, $\Sigma_g$ | $\prod_{i=1}^g a_ib_ia_i^{-1}b_i^{-1}$ | $2 - 2g$ | yes |
| projective plane $\R P^2 = N_1$ | $aa$ or $abab$ | $1$ | no |
| Klein bottle $K = N_2$ | $aabb$ or $aba^{-1}b$ | $0$ | no |
| $N_k$ | $a_1a_1\cdots a_ka_k$ | $2 - k$ | no |

::: quiz
A closed surface is orientable and has Euler characteristic $-6$. Which surface is it?
- [ ] $\Sigma_3$, the orientable surface of genus $3$
- [x] $\Sigma_4$, the orientable surface of genus $4$
- [ ] $N_8$, the connected sum of eight projective planes
- [ ] It cannot be determined from these data
::: solution
For orientable closed surfaces $\chi = 2 - 2g$, so $2 - 2g = -6$ gives $g = 4$. By the classification theorem orientability and $\chi$ determine the surface. $N_8$ also has $\chi = 2 - 8 = -6$ but is non-orientable.
:::
:::

In particular the Klein bottle is $\R P^2\#\R P^2$: both are non-orientable with $\chi = 0$. To identify a surface given by any polygon word, it suffices to count vertex classes, compute $\chi = V - E + 1$ and apply the orientability test.

::: example Identifying surfaces from words {#ex-identify}
Identify the closed surfaces given by the hexagon words (a) $abca^{-1}b^{-1}c^{-1}$ and (b) $abacb^{-1}c^{-1}$.
::: solution
Label the corners $v_0,\dots,v_5$, with the $i$-th edge running from $v_i$ to $v_{i+1}$ (indices mod $6$); an edge with exponent $-1$ is traversed against its arrow, so its arrow points from $v_{i+1}$ to $v_i$.

(a) The arrows are: $a\colon v_0\to v_1$ and $v_4\to v_3$; $b\colon v_1\to v_2$ and $v_5\to v_4$; $c\colon v_2\to v_3$ and $v_0\to v_5$. Matching initial points and final points: $v_0\sim v_4$, $v_1\sim v_3$, $v_1\sim v_5$, $v_2\sim v_4$, $v_2\sim v_0$, $v_3\sim v_5$. The classes are $\set{v_0, v_2, v_4}$ and $\set{v_1, v_3, v_5}$, so $V = 2$, $E = 3$, $F = 1$ and $\chi = 0$. Every letter occurs with both exponents, so the surface is orientable: it is the **torus**. (This is the hexagonal picture of the torus familiar from tilings: opposite sides of a hexagon glued by translations.)

(b) The arrows are: $a\colon v_0\to v_1$ and $v_2\to v_3$; $b\colon v_1\to v_2$ and $v_5\to v_4$; $c\colon v_3\to v_4$ and $v_0\to v_5$. This gives $v_0\sim v_2$, $v_1\sim v_3$, $v_1\sim v_5$, $v_2\sim v_4$, $v_3\sim v_0$, $v_4\sim v_5$, and all six corners fall into one class: $V = 1$, so $\chi = 1 - 3 + 1 = -1$. The letter $a$ occurs twice with exponent $+1$, so the surface is non-orientable. By the classification it is $N_3 = \R P^2\#\R P^2\#\R P^2$ (equivalently, by Dyck's theorem, $T\#\R P^2$).
:::
:::

::: warning The Euler characteristic alone is not enough
The torus and the Klein bottle both have $\chi = 0$, and the sphere with three cross-caps $N_3$ and the "torus plus a cross-cap" $T\#\R P^2$ both have $\chi = -1$ (and in this case they *are* homeomorphic, by Dyck's theorem). Always determine orientability as well. Conversely, do not forget that the classification is about *closed* surfaces: the open disc and the plane, or the annulus and the Möbius band, are not covered by it, and a surface with boundary needs the number of boundary circles as a third invariant.
:::

## Euler's formula and the Platonic solids

For graphs drawn in the plane, Euler's formula can be proved directly.

::: theorem Euler's formula for plane graphs {#thm-euler-planar}
Let $G$ be a connected graph drawn in the plane with straight or polygonal edges that meet only at their endpoints, with $V$ vertices and $E$ edges, and let $F$ be the number of regions into which it divides the plane (including the unbounded one). Then $V - E + F = 2$.
:::

::: proof
Induction on the number of edges that lie on cycles. If $G$ has no cycle, it is a tree, so $E = V - 1$, and a tree does not separate the plane, so $F = 1$; then $V - E + F = V - (V - 1) + 1 = 2$. Otherwise choose an edge $e$ lying on a cycle $Z$ of $G$. The cycle is a closed polygon, which by the (polygonal) Jordan curve theorem divides the plane into an inside and an outside, and $e$ lies on the common boundary of a region inside $Z$ and a region outside $Z$. These two regions are different, and deleting $e$ merges them into one, while the graph remains connected (the rest of the cycle still joins the ends of $e$). So deleting $e$ lowers $E$ and $F$ by $1$ each and leaves $V - E + F$ unchanged, and the new graph has fewer edges on cycles. By induction $V - E + F = 2$.
:::

A convex polyhedron, projected from a point just outside one face onto the plane of that face, becomes such a plane graph (the projecting face becomes the unbounded region), so Euler's polyhedron formula $V - E + F = 2$ follows. In the language of this chapter, it says $\chi(S^2) = 2$. The formula is also a basic tool for planar graphs in [[discrete/colouring-planarity]].

::: theorem The five Platonic solids {#thm-platonic}
Suppose a decomposition of the sphere into polygons has all faces $p$-gons and all vertices of degree $q$, with $p, q\ge3$. Then $(p, q)$ is one of $(3,3)$, $(3,4)$, $(4,3)$, $(3,5)$, $(5,3)$, realised by the tetrahedron, octahedron, cube, icosahedron and dodecahedron.
:::

::: proof
Counting edge–face incidences and edge–vertex incidences, $pF = 2E$ and $qV = 2E$. Substituting $V = 2E/q$ and $F = 2E/p$ into $V - E + F = 2$ and dividing by $2E$,

$$
\frac1q + \frac1p = \frac12 + \frac1E > \frac12 .
$$

If $p, q\ge4$ the left side is at most $\frac12$; if $p = 3$, then $\frac1q > \frac16$ forces $q < 6$, i.e. $q\in\set{3, 4, 5}$; similarly if $q = 3$ then $p\in\set{3,4,5}$. This leaves the five pairs listed, with $\frac1E = \frac1p + \frac1q - \frac12$ giving $E = 6, 12, 12, 30, 30$, and then $V = 2E/q$, $F = 2E/p$: $(4, 6, 4)$, $(6, 12, 8)$, $(8, 12, 6)$, $(12, 30, 20)$, $(20, 30, 12)$ for $(V, E, F)$. Each is realised by the corresponding regular solid.
:::

::: application Soccer balls, fullerenes and curvature
A soccer ball is stitched from pentagons and hexagons with three faces at every vertex. Euler's formula forces the number of pentagons: with $P$ pentagons and $H$ hexagons, $2E = 5P + 6H = 3V$, and $V - E + F = 2$ becomes $\frac{2E}{3} - E + P + H = 2$, i.e. $-\frac{5P + 6H}{6} + P + H = 2$, so $P = 12$ — whatever the number of hexagons. The same count governs the carbon molecules called fullerenes (the buckminsterfullerene $C_{60}$ has $12$ pentagons and $20$ hexagons) and explains why a sheet of hexagons cannot close up into a ball without defects. The deeper reason is the Gauss–Bonnet theorem of [[differential-geometry/geodesics-gauss-bonnet]]: the total curvature of a closed surface is $2\pi\chi$, and on a polyhedron all the curvature is concentrated at the vertices.
:::

::: history
Euler stated the polyhedron formula in a letter to Christian Goldbach in 1750 and published proofs in papers that appeared in 1758; René Descartes had found an equivalent relation about angles around 1630, though it was not published until 1860. Augustin-Louis Cauchy gave a proof in 1813, and in the same year Simon Lhuilier pointed out that the formula fails for polyhedra with tunnels, the first hint of the Euler characteristic of surfaces of higher genus. August Ferdinand Möbius (around 1863) and Camille Jordan (1866) classified orientable surfaces, Walther von Dyck treated non-orientable ones in 1888, and the first rigorous proof of the classification, for triangulated surfaces, was given by Max Dehn and Poul Heegaard in 1907; Henry Brahana's 1921 proof via normal forms of polygon words is the one sketched above. Tibor Radó proved in 1925 that every surface can be triangulated, completing the theorem.
:::

## Where this leads

The classification of surfaces is a model for much of modern topology: one looks for invariants (here orientability and the Euler characteristic) that are computable and that distinguish everything. In higher dimensions this programme becomes much harder; for three-dimensional manifolds it was completed only with Perelman's proof of Thurston's geometrisation conjecture in 2002–2003, and in dimension four a full classification is impossible. The Euler characteristic generalises to the alternating sum of the ranks of homology groups in any dimension, and the fundamental groups of the surfaces (computed from their polygon words by the Seifert–van Kampen theorem) extend the calculations of [[topology/fundamental-group]]. In [[differential-geometry/geodesics-gauss-bonnet]] the Euler characteristic reappears as total curvature, and in complex analysis the Riemann surfaces of algebraic functions are exactly the orientable closed surfaces $\Sigma_g$, their genus playing a central role.

::: summary
- A surface is a Hausdorff, second countable space locally homeomorphic to the plane; closed surfaces are compact and connected (sphere, torus, Klein bottle, projective plane).
- The Euler characteristic $\chi = V - E + F$ of a triangulation, or of any decomposition into polygons, is a topological invariant: $\chi(S^2) = 2$, $\chi(T) = \chi(K) = 0$, $\chi(\R P^2) = 1$.
- A surface is non-orientable iff it contains a Möbius band; for a polygon word, iff some letter appears twice with the same exponent.
- Connected sum: $\chi(M\# N) = \chi(M) + \chi(N) - 2$, so $\chi(\Sigma_g) = 2 - 2g$ and $\chi(N_k) = 2 - k$.
- Classification: every closed surface is $S^2$, some $\Sigma_g$ or some $N_k$, determined by orientability and $\chi$ (proof: triangulate, glue into a polygon, reduce the word to normal form, use Dyck's theorem $T\#\R P^2\cong N_3$).
- For connected plane graphs and convex polyhedra $V - E + F = 2$; consequently there are exactly five Platonic solids, and a ball of pentagons and hexagons has exactly $12$ pentagons.
:::

## Exercises

::: exercise The icosahedron {level=1 check="2"}
The regular icosahedron has $20$ triangular faces, with $5$ meeting at each vertex. Compute $V$ and $E$ from these data, and then $V - E + F$. (Enter $V - E + F$.)
::: solution
Each face has $3$ edges and each edge lies on $2$ faces: $E = \frac{3\cdot20}{2} = 30$. Each face has $3$ vertices and each vertex lies on $5$ faces: $V = \frac{3\cdot20}{5} = 12$. So $V - E + F = 12 - 30 + 20 = 2$.
:::
:::

::: exercise A surface of genus three {level=1 check="-4"}
What is the Euler characteristic of the orientable closed surface of genus $3$? Check your answer by counting vertices, edges and faces in its standard polygon presentation.
::: solution
By [[#eq-chi-families]], $\chi(\Sigma_3) = 2 - 2\cdot3 = -4$. The standard word $a_1b_1a_1^{-1}b_1^{-1}a_2b_2a_2^{-1}b_2^{-1}a_3b_3a_3^{-1}b_3^{-1}$ has $12$ letters, so the polygon is a $12$-gon (with one vertex class, $6$ edges and one face: $1 - 6 + 1 = -4$).
:::
:::

::: exercise The Klein bottle {level=1 check="0"}
Compute the Euler characteristic of the surface with word $aabb$, and explain why it is the Klein bottle.
::: solution
In the square with word $aabb$, the corners: first $a$ runs $v_0\to v_1$, second $a$ runs $v_1\to v_2$, so $v_0\sim v_1\sim v_2$; first $b$ runs $v_2\to v_3$, second $b$ runs $v_3\to v_0$, so $v_2\sim v_3\sim v_0$. One vertex, two edges, one face: $\chi = 1 - 2 + 1 = 0$. Both letters appear with the same exponent twice, so the surface is non-orientable. By the classification, the non-orientable closed surface with $\chi = 0$ is $N_2$, the Klein bottle; the word $aabb$ is the normal form $\R P^2\#\R P^2$.
:::
:::

::: exercise Identify the surface {level=2 check="1"}
Identify the closed surface with hexagon word $abcabc$. What is its Euler characteristic?
::: solution
Label the corners $v_0,\dots,v_5$. The arrows: $a\colon v_0\to v_1$ and $v_3\to v_4$; $b\colon v_1\to v_2$ and $v_4\to v_5$; $c\colon v_2\to v_3$ and $v_5\to v_0$. So $v_0\sim v_3$, $v_1\sim v_4$, $v_2\sim v_5$ from the initial and final points of the $a$, $b$, $c$ pairs, and these are all the identifications: three vertex classes $\set{v_0, v_3}$, $\set{v_1, v_4}$, $\set{v_2, v_5}$. Hence $\chi = 3 - 3 + 1 = 1$. Every letter occurs twice with exponent $+1$, so the surface is non-orientable: it is the projective plane. (Indeed, $abcabc$ is the hexagon with each boundary point glued to its antipode, i.e. the disc with antipodal boundary points identified.)
:::
:::

::: exercise Twelve pentagons {level=2 check="12"}
A closed polyhedral surface homeomorphic to a sphere has only pentagonal and hexagonal faces, and exactly three faces meet at each vertex. How many pentagons does it have?
::: solution
As in the application above: with $P$ pentagons and $H$ hexagons, counting edge–face incidences gives $2E = 5P + 6H$, and counting edge–vertex incidences gives $2E = 3V$. Euler's formula $V - E + F = 2$ with $F = P + H$ becomes $\frac{2E}{3} - E + P + H = 2$, i.e. $P + H - \frac{5P + 6H}{6} = 2$, so $\frac{P}{6} = 2$ and $P = 12$, independently of $H$.
:::
:::

::: exercise K₅ is not planar {level=2}
Use Euler's formula to show that a simple connected plane graph with $V\ge3$ vertices has at most $3V - 6$ edges, and deduce that the complete graph $K_5$ cannot be drawn in the plane without crossings.
::: solution
Walk once around the boundary of each region and count the edges met, an edge with the region on both sides counting twice: every edge is counted exactly twice in total. Since the graph is simple and has at least two edges (it is connected with $V\ge3$), each region meets at least $3$ edges in this count (a count of $1$ or $2$ would need a loop, two parallel edges, or a graph consisting of a single edge), so $3F\le2E$. Then $2 = V - E + F\le V - E + \frac{2E}{3}$, i.e. $E\le3V - 6$. For $K_5$, $V = 5$ and $E = 10 > 3\cdot5 - 6 = 9$, so it is not planar. (The same argument with $4F\le2E$ shows that $K_{3,3}$, which has no triangles, is not planar: $9 > 2\cdot6 - 4$.)
:::
:::

::: exercise Orientability and the Euler characteristic {level=2}
Show that the Euler characteristic of a closed orientable surface is even. Which values of $\chi$ occur for non-orientable closed surfaces? Is there a closed surface with $\chi = 3$?
::: solution
By the classification an orientable closed surface is $S^2$ or $\Sigma_g$, with $\chi = 2 - 2g$ ($g\ge0$), always even. Non-orientable ones are $N_k$, with $\chi = 2 - k$ for $k\ge1$, giving every integer $\le1$. No closed surface has $\chi\ge3$: the largest value is $\chi(S^2) = 2$.
:::
:::

::: exercise No polyhedron with seven edges {level=3}
Prove that there is no decomposition of the sphere into polygons (each face with at least $3$ edges and each vertex of degree at least $3$) with exactly $7$ edges, although there are such decompositions with $6$ and $8$ edges.
::: solution
Counting incidences, $3F\le2E$ and $3V\le2E$. With $E = 7$: $F\le\frac{14}{3}$, so $F\le4$, and likewise $V\le4$. Then $V - E + F\le4 - 7 + 4 = 1 < 2$, contradicting Euler's formula. Examples with $6$ and $8$ edges: the tetrahedron ($V = 4$, $E = 6$, $F = 4$) and the square pyramid ($V = 5$, $E = 8$, $F = 5$). (For every $E\ge6$ except $7$ such polyhedra exist.)
:::
:::

::: exercise Triangulations of the torus need seven vertices {level=3 check="7"}
Prove that every triangulation of the torus has at least $7$ vertices. (A triangulation with exactly $7$ exists, so $7$ is the minimum.)
::: hint
In a triangulation each edge lies in exactly two triangles, and two vertices are joined by at most one edge.
:::
::: solution
Each triangle has $3$ edges and each edge lies in exactly $2$ triangles, so $3F = 2E$. Since $\chi(T) = 0$, $V - E + \frac{2E}{3} = 0$, i.e. $E = 3V$. In a triangulation (as defined in [[#def-euler]]) two distinct vertices are joined by at most one edge, so $E\le\binom V2 = \frac{V(V-1)}{2}$. Hence $3V\le\frac{V(V - 1)}{2}$, i.e. $V - 1\ge6$, so $V\ge7$. The minimal $7$-vertex triangulation has $V = 7$, $E = 21$, $F = 14$, and every pair of vertices is joined by an edge: the complete graph $K_7$ is drawn on the torus without crossings.
:::
:::

::: exercise The connected sum and orientability {level=3}
Using the classification, determine the surfaces $T\#K$ and $\R P^2\#K$, where $K$ is the Klein bottle. Then show that $\Sigma_g\#N_k\cong N_{2g+k}$ for $g\ge0$, $k\ge1$.
::: solution
$\chi(T\# K) = 0 + 0 - 2 = -2$ and $T\# K$ contains a Möbius band (inside $K$), so it is non-orientable with $\chi = -2$: it is $N_4$. Similarly $\chi(\R P^2\# K) = 1 + 0 - 2 = -1$, non-orientable: $N_3$. In general $\Sigma_g\# N_k$ is non-orientable (it contains the Möbius bands of $N_k$, since the removed disc can be chosen away from one of them) and $\chi(\Sigma_g\# N_k) = (2 - 2g) + (2 - k) - 2 = 2 - (2g + k)$. By the classification it is homeomorphic to $N_{2g+k}$. (For $g = 1$, $k = 1$ this is Dyck's theorem $T\#\R P^2\cong N_3$.)
:::
:::
