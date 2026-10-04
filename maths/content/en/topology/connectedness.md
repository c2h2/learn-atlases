Why is the intermediate value theorem true? If a continuous function on $[a, b]$ is negative at $a$ and positive at $b$, it must vanish somewhere in between — because the interval is "all in one piece", and a continuous function cannot jump over $0$ without leaving a gap in its domain. The same function defined on $[0,1]\cup[2,3]$ could perfectly well be $-1$ on the first piece and $+1$ on the second. The real content of the theorem is a property of the domain, not of the function: the interval cannot be split into two separated parts.

This property is called **connectedness**. In this chapter we define it for arbitrary topological spaces, prove that the connected subsets of $\R$ are exactly the intervals, and show that connectedness is preserved by continuous maps — which gives the intermediate value theorem in a general and transparent form. We then meet the more intuitive notion of **path-connectedness**, see by a famous example that the two notions differ, and split spaces into **components**. Finally we use connectedness as a topological invariant: it proves, for example, that the line is not homeomorphic to the plane, and that no two of the letters X, Y and O are homeomorphic.

## Connected spaces

::: definition Connected space {#def-connected}
A **separation** of a topological space $X$ is a pair $U, V$ of disjoint non-empty open subsets with $X = U\cup V$. The space $X$ is **connected** if it has no separation. A subset of a space is connected if it is connected in the subspace topology.
:::

If $U, V$ is a separation, then $U = X\setminus V$ is also closed. So $X$ is connected exactly when its only **clopen** (closed and open) subsets are $\emptyset$ and $X$. A third formulation is often the most convenient in proofs.

::: proposition Three forms of connectedness {#prop-connected}
For a topological space $X$, the following are equivalent:

1. $X$ is connected;
2. the only subsets of $X$ that are both open and closed are $\emptyset$ and $X$;
3. every continuous map $f\colon X\to\set{0, 1}$, where $\set{0,1}$ has the discrete topology, is constant.
:::

::: proof
(1) ⇔ (2): a separation $U, V$ yields the clopen set $U\neq\emptyset, X$; conversely a clopen $U\neq\emptyset, X$ yields the separation $U, X\setminus U$. (2) ⇔ (3): a continuous $f\colon X\to\set{0,1}$ gives the clopen set $f^{-1}(\set1)$, which is $\emptyset$ or $X$ exactly when $f$ is constant; conversely a clopen $U$ gives the continuous indicator function of $U$, which is non-constant when $U\neq\emptyset, X$.
:::

The following observation is used in nearly every proof about connected sets.

::: lemma Connected subsets lie on one side {#lem-one-side}
Let $U, V$ be disjoint open subsets of $X$ and let $A\subseteq U\cup V$ be connected. Then $A\subseteq U$ or $A\subseteq V$.
:::

::: proof
$A\cap U$ and $A\cap V$ are disjoint, open in $A$, and cover $A$. Since $A$ is connected, one of them is empty.
:::

::: example Connected and disconnected spaces {#ex-connected-examples}
Decide which spaces are connected: (a) an indiscrete space; (b) a discrete space with at least two points; (c) $\Q\subseteq\R$; (d) an infinite set with the cofinite topology; (e) the Sorgenfrey line $\R_\ell$.
::: solution
(a) Connected: the only open sets are $\emptyset$ and $X$, so there is no separation. (b) Disconnected: $\set x$ and $X\setminus\set x$ form a separation. (c) Disconnected, and badly so. For any two rationals $p < q$, choose an irrational $r$ between them; then $(-\infty, r)\cap\Q$ and $(r,\infty)\cap\Q$ separate $\Q$ with $p$ and $q$ on different sides. So the only connected subsets of $\Q$ are single points: $\Q$ is **totally disconnected**. (d) Connected: two non-empty open sets have finite complements, so they intersect (their intersection has finite complement in an infinite set), and no two disjoint non-empty open sets exist. (e) Disconnected: $[0,\infty)$ is open (a union of $[0, n)$) and closed (its complement $(-\infty, 0) = \bigcup[-n, 0)$ is open) in $\R_\ell$.
:::
:::

The fundamental example is the real line. Recall that a subset $I\subseteq\R$ is an **interval** if whenever $a, b\in I$ and $a < c < b$, also $c\in I$.

::: theorem Connected subsets of the line {#thm-intervals}
A subset of $\R$ is connected if and only if it is an interval. In particular $\R$ itself is connected.
:::

::: proof
*Connected sets are intervals.* If $A\subseteq\R$ is not an interval, there are $a, b\in A$ and $c\notin A$ with $a < c < b$. Then $A\cap(-\infty, c)$ and $A\cap(c, \infty)$ are disjoint, open in $A$, cover $A$ and are non-empty (containing $a$ and $b$): a separation.

*Intervals are connected.* Suppose an interval $I$ has a separation $I = U\cup V$ with $U, V$ open in $I$, disjoint and non-empty. Pick $a\in U$ and $b\in V$, and suppose $a < b$ (otherwise exchange the names). Then $[a, b]\subseteq I$. Let

$$
s = \sup\big(U\cap[a, b]\big),
$$

which exists since the set contains $a$ and is bounded by $b$, and $s\in[a, b]\subseteq I$, so $s$ lies in $U$ or in $V$.

If $s\in U$: then $s\neq b$ (as $b\in V$), so $s < b$. Since $U$ is open in $I$ and $[a,b]\subseteq I$, there is $\delta > 0$ with $[s, s + \delta)\subseteq U$ and $s + \delta\le b$. Then points of $U\cap[a,b]$ larger than $s$ exist, contradicting the definition of $s$.

If $s\in V$: then $s\neq a$, so $s > a$. Since $V$ is open in $I$, there is $\delta > 0$ with $(s - \delta, s]\subseteq V$ and $s - \delta\ge a$. These points are not in $U$, so every element of $U\cap[a,b]$ is at most $s - \delta$, and $s$ is not the least upper bound — again a contradiction.

So no separation exists, and $I$ is connected.
:::

The proof uses the least upper bound property of $\R$ in an essential way, and so it must: in $\Q$, which lacks that property, "intervals" are disconnected.

::: quiz
Which of the following subsets of $\R$ are connected? (Several may be correct.)
- [x] $[0, 1)$
- [ ] $[0,1]\cup[2, 3]$
- [x] $\set{5}$
- [ ] $\R\setminus\set0$
- [x] $(0, \infty)$
::: solution
By [[#thm-intervals]] the connected subsets of $\R$ are the intervals: $[0, 1)$, the single point $\set5$ (a degenerate interval) and $(0,\infty)$. The union $[0,1]\cup[2,3]$ and $\R\setminus\set0$ are not intervals (they omit $1.5$ and $0$ respectively), so they are disconnected.
:::
:::

## Continuous images and the intermediate value theorem

::: theorem Continuous images of connected spaces {#thm-image}
If $X$ is connected and $f\colon X\to Y$ is continuous, then $f(X)$ is connected.
:::

::: proof
Let $g\colon f(X)\to\set{0,1}$ be continuous. Then $g\circ f\colon X\to\set{0,1}$ is continuous (regard $f$ as a map into the subspace $f(X)$, by [[topology/continuous-maps#thm-subspace]]), so it is constant by [[#prop-connected]]. As $f\colon X\to f(X)$ is surjective, $g$ is constant. By [[#prop-connected]] again, $f(X)$ is connected.
:::

In particular connectedness is a topological property: a space homeomorphic to a connected space is connected.

::: corollary Intermediate value theorem {#cor-ivt}
Let $X$ be connected and $f\colon X\to\R$ continuous. If $f$ takes the values $a$ and $b$ with $a < b$, then it takes every value $c\in(a, b)$.
:::

::: proof
$f(X)$ is a connected subset of $\R$ by [[#thm-image]], hence an interval by [[#thm-intervals]], and it contains $a$ and $b$, so it contains $c$.
:::

With $X = [a, b]$ this is the intermediate value theorem of [[calculus-1/continuity]]; but now it holds equally for functions on a disc, a sphere, a torus or any connected space.

::: example Fixed points and antipodal points {#ex-ivt-applications}
(a) Prove that every continuous map $f\colon[0, 1]\to[0,1]$ has a **fixed point**, a point with $f(x) = x$. (b) Prove that at every moment there are two diametrically opposite points on the equator with exactly the same temperature (assuming temperature varies continuously).
::: solution
(a) Let $g(x) = f(x) - x$, continuous on the connected space $[0,1]$. Since $0\le f(x)\le1$, we have $g(0) = f(0)\ge0$ and $g(1) = f(1) - 1\le0$. If either is $0$ we have a fixed point; otherwise $g(0) > 0 > g(1)$ and [[#cor-ivt]] gives $x$ with $g(x) = 0$.

(b) Parametrise the equator by the angle $\theta$ and let $T(\theta)$ be the temperature, a continuous $2\pi$-periodic function, so a continuous function on the circle $S^1$. Put $g(\theta) = T(\theta) - T(\theta + \pi)$, which is continuous on $S^1$, a connected space (the continuous image of $[0, 2\pi]$). Then $g(\theta + \pi) = T(\theta + \pi) - T(\theta + 2\pi) = -g(\theta)$. So $g$ takes the values $g(0)$ and $-g(0)$, which have opposite signs or are both zero; by [[#cor-ivt]] it vanishes somewhere, at a point $\theta_0$ with $T(\theta_0) = T(\theta_0 + \pi)$. This is the one-dimensional case of the Borsuk–Ulam theorem; the two-dimensional case (two antipodal points on the Earth's surface with the same temperature *and* the same pressure) needs the methods of [[topology/fundamental-group]].
:::
:::

::: widget plot
f: cos(x); x
x: 0, 1
y: 0, 1.05
labels: \cos x; y = x
points: 0.739085, 0.739085
caption: A continuous map $f$ of $[0, 1]$ into itself, here $f(x) = \cos x$, must cross the diagonal $y = x$: at $x = 0$ the graph is on or above the diagonal and at $x = 1$ on or below it, and a connected domain leaves no gap through which to slip past. The marked fixed point is $x\approx0.7391$. On a disconnected domain such as $[0, \tfrac13]\cup[\tfrac23, 1]$ the map swapping the two pieces has no fixed point.
:::

## Building connected spaces

::: theorem Unions, closures and products {#thm-building}
1. If $\set{A_\alpha}$ is a collection of connected subsets of $X$ with a point in common, then $\bigcup_\alpha A_\alpha$ is connected.
2. If $A\subseteq X$ is connected and $A\subseteq B\subseteq\overline A$, then $B$ is connected; in particular $\overline A$ is connected.
3. If $X$ and $Y$ are connected, so is $X\times Y$.
:::

::: proof
(1) Let $p$ be a common point and $f\colon\bigcup A_\alpha\to\set{0,1}$ continuous. Its restriction to each $A_\alpha$ is constant, equal to $f(p)$ because $p\in A_\alpha$. So $f$ is constant, and the union is connected by [[#prop-connected]].

(2) Let $f\colon B\to\set{0,1}$ be continuous. It is constant on the connected set $A$, say equal to $0$. The set $f^{-1}(\set0)$ is closed in $B$ and contains $A$, so it contains $\overline A\cap B = B$ (the closure of $A$ in the subspace $B$ is $\overline A\cap B$). So $f\equiv0$ on $B$.

(3) Fix $(x_0, y_0)\in X\times Y$. For each $x\in X$, the "cross" $C_x = (\set x\times Y)\cup(X\times\set{y_0})$ is connected by (1): $\set x\times Y\cong Y$ and $X\times\set{y_0}\cong X$ are connected (the homeomorphisms are $y\mapsto(x, y)$ and $x\mapsto(x, y_0)$, continuous by [[topology/continuous-maps#thm-product]] with continuous inverses the projections), and they share the point $(x, y_0)$. All the crosses contain $(x_0, y_0)$, and their union is $X\times Y$, so $X\times Y$ is connected by (1) again.
:::

By (3) and induction, $\R^n$ is connected; by [[#thm-image]] the circle $S^1$ (the image of $[0, 2\pi]$), the torus $S^1\times S^1$ and every sphere $S^n$ with $n\ge1$ are connected (for spheres, see [[#ex-path-connected]] below).

## Path-connectedness

The intuitive meaning of "in one piece" is that any two points can be joined by a curve. This is a different, stronger notion.

::: definition Path-connected space {#def-path-connected}
A **path** in $X$ from $x$ to $y$ is a continuous map $\gamma\colon[0, 1]\to X$ with $\gamma(0) = x$ and $\gamma(1) = y$. The space $X$ is **path-connected** if any two of its points can be joined by a path.
:::

::: theorem Path-connected spaces are connected {#thm-path-connected}
Every path-connected space is connected.
:::

::: proof
Let $X$ be path-connected and fix $x_0\in X$. For each $x\in X$ choose a path $\gamma_x$ from $x_0$ to $x$. Its image $\gamma_x([0,1])$ is connected by [[#thm-intervals]] and [[#thm-image]], and contains $x_0$ and $x$. The union of all these images is $X$, and they share the point $x_0$, so $X$ is connected by [[#thm-building]](1).
:::

::: example Path-connected spaces {#ex-path-connected}
Show that (a) every convex subset of $\R^n$ is path-connected; (b) $\R^n\setminus\set0$ is path-connected for $n\ge2$; (c) the sphere $S^n = \set{x\in\R^{n+1} : \norm x = 1}$ is path-connected for $n\ge1$.
::: solution
(a) If $C$ is convex and $x, y\in C$, the straight path $\gamma(t) = (1 - t)x + ty$ stays in $C$.

(b) Let $x, y\neq0$. If the segment from $x$ to $y$ avoids $0$, use it. Otherwise $y = -\lambda x$ for some $\lambda > 0$; since $n\ge2$ there is a point $z\neq0$ not on the line through $x$ (e.g. a vector not parallel to $x$), and the segments from $x$ to $z$ and from $z$ to $y$ avoid $0$. Concatenating them (by the pasting lemma, [[topology/continuous-maps#lem-pasting]]) gives a path.

(c) The map $r(x) = x/\norm x$ is continuous from $\R^{n+1}\setminus\set0$ onto $S^n$, and $\R^{n+1}\setminus\set0$ is path-connected by (b) since $n + 1\ge2$; the image of a path under a continuous map is a path, so $S^n$ is path-connected.
:::
:::

For open subsets of Euclidean space the two notions coincide.

::: proposition Open connected sets are path-connected {#prop-open-path}
Every connected open subset $U$ of $\R^n$ is path-connected.
:::

::: proof
If $U = \emptyset$ there is nothing to prove. Otherwise fix $x_0\in U$ and let $P$ be the set of points of $U$ that can be joined to $x_0$ by a path in $U$; $x_0 \in P$. *$P$ is open:* if $x\in P$, choose a ball $B(x, r)\subseteq U$; every point of the ball is joined to $x$ by a segment inside the ball, and following a path from $x_0$ to $x$ and then this segment joins it to $x_0$. *$U\setminus P$ is open:* if $y\in U\setminus P$ and $B(y, r)\subseteq U$, then no point of $B(y, r)$ is in $P$, for otherwise $y$ could be reached through it. Since $U$ is connected and $P\neq\emptyset$, $P = U$.
:::

Without openness, connectedness does not imply path-connectedness. The standard counterexample is worth studying carefully.

::: example The topologist's sine curve {#ex-sine-curve}
Let $G = \set{(x, \sin(1/x)) : 0 < x\le1}$ and $S = G\cup\big(\set0\times[-1, 1]\big)$. Show that $S$ is connected but not path-connected.
::: solution
*Connected.* $G$ is the image of the connected interval $(0, 1]$ under the continuous map $x\mapsto(x, \sin(1/x))$, so it is connected. Every point $(0, y)$ with $\abs y\le1$ is a limit of points of $G$: choose $x_n\to0^+$ with $\sin(1/x_n) = y$ (for instance $1/x_n = \arcsin y + 2\pi n$). So $G\subseteq S\subseteq\overline G$, and $S$ is connected by [[#thm-building]](2).

*Not path-connected.* Suppose $\gamma = (\gamma_1, \gamma_2)\colon[0, 1]\to S$ is a path from $(0, 0)$ to a point of $G$. The set $\set{t : \gamma_1(t) = 0}$ is closed and contains $0$; let $t_0$ be its largest element. Then $t_0 < 1$, $\gamma_1(t_0) = 0$ and $\gamma_1(t) > 0$ for $t > t_0$. By continuity there is $\delta > 0$ with $\abs{\gamma_2(t) - \gamma_2(t_0)} < \frac12$ for $t_0\le t\le t_0 + \delta$. Now $\gamma_1$ maps $[t_0, t_0 + \delta]$ onto an interval $[0, c]$ with $c > 0$ (by connectedness). This interval contains points $x = \frac{1}{\pi/2 + 2\pi n}$ and $x' = \frac{1}{3\pi/2 + 2\pi n}$ for all large $n$, at which $\sin(1/x) = 1$ and $\sin(1/x') = -1$. So $\gamma_2$ takes both values $1$ and $-1$ on $[t_0, t_0 + \delta]$, which is impossible since all its values there lie within $\frac12$ of $\gamma_2(t_0)$. Hence no path joins $(0, 0)$ to $G$.
:::
:::

::: widget plot
f: sin(1/x)
x: 0, 1
y: -1.3, 1.3
vlines: 0
caption: The graph of $\sin(1/x)$ for $0 < x\le1$ together with the segment $\set0\times[-1,1]$ (the vertical line at $0$). Zoom towards $x = 0$: the graph oscillates ever faster and accumulates on the whole segment, so the union is connected. But a path trying to travel from the segment into the graph would have to make infinitely many full oscillations in a finite time, which continuity forbids.
:::

::: warning Connected does not mean path-connected
Many arguments silently assume that a connected space is path-connected, for example "join the two points by a path inside the set". This is valid for open subsets of $\R^n$ ([[#prop-open-path]]) and for most spaces built from nice pieces, but it fails for the topologist's sine curve. When in doubt, prove path-connectedness directly — it is the stronger property — or argue with separations.
:::

## Components

Every space splits into maximal connected pieces.

::: definition Components {#def-components}
For $x, y\in X$ write $x\sim y$ if some connected subset of $X$ contains both. This is an equivalence relation, and its equivalence classes are the **components** (connected components) of $X$. Replacing "connected subset" by "path", one obtains the **path components**.
:::

Reflexivity and symmetry of $\sim$ are clear (single points are connected), and transitivity follows from [[#thm-building]](1): if $A\ni x, y$ and $B\ni y, z$ are connected, so is $A\cup B$. The component $C$ containing $x$ is the union of all connected sets containing $x$, so it is connected (again by [[#thm-building]](1)) and is the largest connected set containing $x$; it is closed because $\overline C$ is connected and contains $x$, so $\overline C\subseteq C$. Components need not be open: the components of $\Q$ are its single points, none of which is open in $\Q$.

Path components are contained in components (by [[#thm-path-connected]]) and may be smaller: the topologist's sine curve has one component but two path components, $G$ and the segment.

::: widget graph
nodes: A; B; C; D; E; F; G; H
edges: A-B; B-C; C-A; D-E; E-F; G-H
algorithm: bfs
start: A
caption: A graph is a topological space in its own right (vertices joined by edge segments), and its path components are the connected components of graph theory. Breadth-first search from $A$ visits exactly the path component of $A$; start it from $D$ or $G$ to see the other two. This graph has three components.
:::

## Telling spaces apart

Connectedness and components are topological invariants, and so are the components of a space with a point removed. A homeomorphism $h\colon X\to Y$ restricts to a homeomorphism $X\setminus\set x\to Y\setminus\set{h(x)}$, so *the number of components of $X\setminus\set x$, as $x$ varies, is preserved*. A point $x$ of a connected space $X$ with $X\setminus\set x$ disconnected is a **cut point**.

::: theorem The line is not the plane {#thm-line-plane}
$\R$ is not homeomorphic to $\R^n$ for any $n\ge2$. Similarly, no two of $(0, 1)$, $[0, 1)$, $[0,1]$ and $S^1$ are homeomorphic.
:::

::: proof
Suppose $h\colon\R\to\R^n$ is a homeomorphism. Then $\R\setminus\set0$ would be homeomorphic to $\R^n\setminus\set{h(0)}$. The first is disconnected (it is not an interval), the second is path-connected, hence connected ([[#ex-path-connected]](b), translated). This contradicts [[#thm-image]].

For the second statement count the non-cut points: in $(0, 1)$ every point is a cut point; in $[0, 1)$ exactly one point ($0$) is not; in $[0, 1]$ exactly two ($0$ and $1$) are not; and removing any point from $S^1$ leaves a space homeomorphic to $\R$ ([[topology/continuous-maps#ex-homeo]]), which is connected, so $S^1$ has no cut points at all. A homeomorphism maps cut points to cut points and non-cut points to non-cut points, so these four numbers ($0$, $1$, $2$ and "every point") must agree for homeomorphic spaces.
:::

::: example Letters of the alphabet {#ex-letters}
Regard the capital letters X, Y, T, O and L, drawn with straight strokes and arcs of a fixed width zero, as subspaces of the plane. Which of them are homeomorphic?
::: solution
Count, for each point, the number of components left when it is removed. In **X**, removing the crossing point leaves $4$ components; no point of Y, T, O or L does this. In **Y** and **T**, removing the junction leaves $3$ components; Y and T are in fact homeomorphic (bend the arms of the T). In **O** (a circle), removing any point leaves $1$ component. In **L** (a bent segment, homeomorphic to $[0, 1]$), removing an interior point leaves $2$ components and removing an endpoint leaves $1$. Since these counts are preserved by homeomorphisms, the classes are $\set{X}$, $\set{Y, T}$, $\set{O}$ and $\set{L}$; in particular O is not homeomorphic to L, because L has cut points and O has none.
:::
:::

::: quiz
How many components does the letter X have after its crossing point is removed, and what does this prove?
- [ ] $2$; it proves that X is not connected
- [x] $4$; no point of Y has this property, so X and Y are not homeomorphic
- [ ] $4$; it proves that X is homeomorphic to two crossing lines in $\R^2$, which is not connected
- [ ] $3$; X and Y are therefore homeomorphic
::: solution
Removing the centre of X leaves four disjoint open arms, each an interval: $4$ components. Removing any point from Y leaves $1$, $2$ or $3$ components. A homeomorphism $X\to Y$ would map the centre of X to a point of Y whose removal leaves $4$ components, which does not exist. (X itself is connected, being a union of two segments with a common point.)
:::
:::

::: remark The Jordan curve theorem
A far deeper fact about components is the **Jordan curve theorem**: if $C\subseteq\R^2$ is homeomorphic to a circle, then $\R^2\setminus C$ has exactly two components, one bounded (the inside) and one unbounded, and $C$ is the boundary of each. It sounds obvious, but curves can be fractal and nowhere smooth, and the proof requires the tools of algebraic topology. We used a version of it, for contours, when stating the residue theorem in [[complex-analysis/residues]].
:::

::: application Motion planning
For a robot, two configurations can be connected by a motion exactly when they lie in the same path component of the robot's *free* configuration space (the configurations that avoid obstacles). Motion-planning algorithms such as probabilistic roadmaps sample this space and build a graph whose connected components approximate its path components; if the start and goal fall in different components, no motion exists, however clever the controller. Counting and computing components of spaces given by inequalities is a basic task in computational topology.
:::

::: history
Bernard Bolzano proved the intermediate value theorem in 1817, one of the first theorems of analysis given a proof by purely arithmetical means. Georg Cantor (1883) proposed a notion of a connected set of points in terms of chains of arbitrarily small steps, which agrees with the modern notion only for compact sets. The definition by separations used today was formulated by N. J. Lennes in 1911 and by Felix Hausdorff in his 1914 book. Polish topologists of the 1920s, notably Bronisław Knaster and Kazimierz Kuratowski, explored the many strange connected spaces that exist, of which the topologist's sine curve is the simplest. Camille Jordan stated his curve theorem in 1887; the first proof accepted as complete was given by Oswald Veblen in 1905.
:::

## Where this leads

Connectedness is the first and simplest topological invariant. Its companion, compactness, is the subject of [[topology/compactness]], which generalises the extreme value theorem as connectedness generalises the intermediate value theorem. Path components are the starting point of algebraic topology: the fundamental group of [[topology/fundamental-group]] is built from paths, and asks not only whether two points can be joined but in how many essentially different ways. Cut points distinguish only one-dimensional pictures; to show that $\R^2\not\cong\R^3$ one removes a point from each and compares fundamental groups.

::: summary
- A space is connected if it has no separation into two disjoint non-empty open sets; equivalently, no clopen sets other than $\emptyset$ and $X$, or every continuous map to $\set{0,1}$ is constant.
- The connected subsets of $\R$ are exactly the intervals ([[#thm-intervals]]); the proof uses the least upper bound property, and $\Q$ is totally disconnected.
- Continuous images of connected spaces are connected, which gives the intermediate value theorem for real functions on any connected space.
- Unions of connected sets with a common point, closures of connected sets and products of connected spaces are connected.
- Path-connected spaces are connected; open connected subsets of $\R^n$ are path-connected; the topologist's sine curve is connected but not path-connected.
- Components (maximal connected subsets) partition a space and are closed; numbers of components after removing points distinguish $\R$ from $\R^2$, and $[0,1]$ from $S^1$.
:::

## Exercises

::: exercise Components of a subset of the line {level=1 check="3"}
How many components does $A = \set{x\in\R : x^2\neq1}$ have? Describe them.
::: solution
$A = \R\setminus\set{-1, 1} = (-\infty, -1)\cup(-1, 1)\cup(1, \infty)$. Each piece is an interval, hence connected, and each is clopen in $A$ (open in $A$, and its complement in $A$ is a union of the other two open pieces). So each piece is a component: $3$ components.
:::
:::

::: exercise Removing the centre of X {level=1 check="4"}
Let X be the union of the segments from $(-1, -1)$ to $(1, 1)$ and from $(-1, 1)$ to $(1, -1)$ in $\R^2$. How many components does X minus the origin have?
::: solution
Removing the origin leaves four half-open segments ("arms"), each homeomorphic to an interval and hence connected. Each arm is open in X minus the origin (it is the intersection with an open quadrant) and they are disjoint, so they are the components: $4$.
:::
:::

::: exercise Discrete and cofinite {level=1}
Show that a discrete space is connected if and only if it has at most one point. Is $\R$ with the cofinite topology path-connected?
::: hint
For path-connectedness, consider the path $\gamma\colon[0,1]\to\R_{\text{cof}}$ given by any injective function, for example $\gamma(t) = t$, and ask whether it is continuous.
:::
::: solution
In a discrete space with two points $x\neq y$, $\set x$ is clopen and not $\emptyset$ or $X$; with at most one point there is no separation. For the cofinite topology on $\R$: it is connected by [[#ex-connected-examples]](d). It is also path-connected: given $x\neq y$, let $\gamma\colon[0,1]\to\R$ be any injective map with $\gamma(0) = x$, $\gamma(1) = y$ (for instance $\gamma(t) = x + t(y - x)$). A closed set of the cofinite topology is $\R$ or finite; the preimage of a finite set under an injective map is finite, hence closed in $[0,1]$. So $\gamma$ is continuous into $\R_{\text{cof}}$ by [[topology/continuous-maps#thm-continuity]], and the space is path-connected. (Surprising spaces need checking, not guessing!)
:::
:::

::: exercise The circle is not an interval {#exr-circle-interval level=2}
Prove that $S^1$ is not homeomorphic to any subset of $\R$.
::: solution
Suppose $h\colon S^1\to A\subseteq\R$ is a homeomorphism. $A$ is connected, hence an interval, and it has more than one point, so it contains an interior point $h(p)$, i.e. a point that is not the largest or smallest. Then $A\setminus\set{h(p)}$ is not an interval and hence disconnected, while $S^1\setminus\set p\cong\R$ is connected — a contradiction.
:::
:::

::: exercise The general linear group {level=2}
Show that the group $GL_n(\R)$ of invertible $n\times n$ real matrices, regarded as a subspace of $\R^{n^2}$, is not connected. Show that the rotation group $SO(2)$ is connected.
::: solution
$\det\colon GL_n(\R)\to\R\setminus\set0$ is continuous (a polynomial in the entries) and surjective (consider $\diag(t, 1, \dots, 1)$). If $GL_n(\R)$ were connected, its image $\R\setminus\set0$ would be connected by [[#thm-image]], which is false. (In fact $GL_n(\R)$ has exactly two components, distinguished by the sign of the determinant.) $SO(2)$ consists of the matrices $\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$, the image of the connected space $\R$ under a continuous map, so it is connected.
:::
:::

::: exercise Gluing connected sets {level=2}
Let $A, B\subseteq X$ be connected with $A\cap\overline B\neq\emptyset$. Prove that $A\cup B$ is connected. Deduce again that the topologist's sine curve is connected.
::: solution
Let $f\colon A\cup B\to\set{0,1}$ be continuous. It is constant on the connected set $A$, say equal to $c$, and constant on $B$, say equal to $d$. The set $f^{-1}(d)$ is closed in $A\cup B$ and contains $B$, so it contains the closure of $B$ in the subspace $A\cup B$, which is $\overline B\cap(A\cup B)$. Choose $p\in A\cap\overline B$; then $f(p) = d$ and also $f(p) = c$, so $c = d$ and $f$ is constant. For the sine curve take $A$ to be the segment $\set0\times[-1,1]$ and $B = G$; every point of $A$ is in $\overline G$.
:::
:::

::: exercise Antipodal temperatures {level=2}
Let $f\colon S^1\to\R$ be continuous. Prove that $f$ is not injective. (In other words, there is no continuous injection from the circle into the line.)
::: solution
By [[#ex-ivt-applications]](b), applied to $T = f$ (with $f$ regarded as a function of the angle), there is a point $\theta_0$ with $f(\theta_0) = f(\theta_0 + \pi)$, and these are two different points of the circle. Hence $f$ is not injective. (Alternatively: [[#exr-circle-interval]] shows $S^1$ is not homeomorphic to its image; but a continuous injection from the compact space $S^1$ into $\R$ would be a homeomorphism onto its image by [[topology/compactness]].)
:::
:::

::: exercise Punctured planes are path-connected {level=3}
Prove that $\R^2\setminus C$ is path-connected for every countable set $C\subseteq\R^2$.
::: hint
Given $x\neq y$ outside $C$, consider the uncountably many paths from $x$ to $y$ consisting of two segments through a point $z$ on the perpendicular bisector of $[x, y]$.
:::
::: solution
Let $x, y\in\R^2\setminus C$ with $x\neq y$, and let $L$ be the perpendicular bisector of the segment $[x, y]$. For each $z\in L$ let $\gamma_z$ be the path from $x$ to $z$ to $y$ along the two segments $[x, z]$ and $[z, y]$. The points $x$ and $y$ lie strictly on opposite sides of $L$, so $[x, z]\setminus\set z$ lies in the open half-plane $H_x$ containing $x$, and $[z, y]\setminus\set z$ in the half-plane $H_y$ containing $y$; the path meets $L$ only at $z$. For $z\neq z'$ the rays from $x$ through $z$ and through $z'$ are different (a ray from $x$ meets the line $L$ at most once), so $[x, z]\cap[x, z'] = \set x$; similarly $[z, y]\cap[z', y] = \set y$. Hence $\gamma_z\cap\gamma_{z'} = \set{x, y}$. Each point of $C$ is different from $x$ and $y$, so it lies on at most one of the paths $\gamma_z$. Since $C$ is countable and $L$ is uncountable, some $\gamma_z$ misses $C$ entirely, and it is a path in $\R^2\setminus C$ from $x$ to $y$.
:::
:::

::: exercise Connected metric spaces are big {level=3}
Let $(X, d)$ be a connected metric space with at least two points. Prove that $X$ is uncountable.
::: solution
Choose $x_0\neq x_1$ in $X$ and put $r = d(x_0, x_1) > 0$. The function $f(x) = d(x_0, x)$ is continuous on $X$ (by the triangle inequality, $\abs{f(x) - f(y)}\le d(x, y)$). By [[#thm-image]] and [[#thm-intervals]], $f(X)$ is an interval; it contains $f(x_0) = 0$ and $f(x_1) = r$, so it contains $[0, r]$, which is uncountable. A countable set has a countable image, so $X$ is uncountable. (In particular, every countable metric space with more than one point is disconnected, and so is $\Q$, again.)
:::
:::
