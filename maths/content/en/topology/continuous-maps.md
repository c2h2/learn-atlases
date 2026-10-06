Topology is often called "rubber-sheet geometry": two shapes count as the same if one can be deformed into the other by stretching and bending, without tearing or gluing. The precise notion behind this slogan is a **homeomorphism** — a bijection that is continuous in both directions. A circle and a square are homeomorphic, as are an open interval and the whole real line; a circle and a line segment are not, and neither are a sphere and a torus (proving such negative statements takes the tools of later chapters).

To speak of homeomorphisms we first need continuity for maps between topological spaces. In [[real-analysis/metric-spaces]] continuity was characterised by open sets: $f$ is continuous exactly when preimages of open sets are open. In topology this characterisation becomes the definition. In this chapter we develop it, study homeomorphisms and the properties they preserve, and learn the two basic ways of making new spaces from old: **subspaces** and **products**. Both are characterised by a "universal property" that tells us exactly which maps into them are continuous — the most useful fact about each construction.

## Continuous maps

::: definition Continuity {#def-continuous}
Let $X$ and $Y$ be topological spaces. A map $f\colon X\to Y$ is **continuous** if $f^{-1}(V)$ is open in $X$ for every open set $V\subseteq Y$. It is **continuous at the point $x$** if for every open $V$ containing $f(x)$ there is an open $U$ containing $x$ with $f(U)\subseteq V$.
:::

For metric spaces this agrees with the ε–δ definition, since $f(B(x, \delta))\subseteq B(f(x), \eps)$ is the statement of continuity at $x$ for the open sets $V = B(f(x), \eps)$, and every open $V$ containing $f(x)$ contains such a ball. Notice that continuity is defined by *preimages*, which behave well with unions, intersections and complements: $f^{-1}(\bigcup V_\alpha) = \bigcup f^{-1}(V_\alpha)$, $f^{-1}(V\cap W) = f^{-1}(V)\cap f^{-1}(W)$ and $f^{-1}(Y\setminus V) = X\setminus f^{-1}(V)$. Images commute with unions, $f(\bigcup A_\alpha) = \bigcup f(A_\alpha)$, but not with intersections or complements, as [[proofs/functions]] explains.

::: theorem Characterisations of continuity {#thm-continuity}
For a map $f\colon X\to Y$ between topological spaces, the following are equivalent.

1. $f$ is continuous.
2. $f^{-1}(C)$ is closed in $X$ for every closed $C\subseteq Y$.
3. $f(\overline A)\subseteq\overline{f(A)}$ for every $A\subseteq X$.
4. $f^{-1}(B)$ is open for every element $B$ of some basis of $Y$.
5. $f$ is continuous at every point of $X$.
:::

::: proof
(1) ⇔ (2): $f^{-1}(Y\setminus C) = X\setminus f^{-1}(C)$, so preimages of open sets are open iff preimages of closed sets are closed.

(2) ⇒ (3): $\overline{f(A)}$ is closed, so $f^{-1}\big(\overline{f(A)}\big)$ is a closed set containing $A$, hence containing $\overline A$. Applying $f$: $f(\overline A)\subseteq\overline{f(A)}$.

(3) ⇒ (2): Let $C$ be closed in $Y$ and $A = f^{-1}(C)$. Then $f(\overline A)\subseteq\overline{f(A)}\subseteq\overline C = C$, so $\overline A\subseteq f^{-1}(C) = A$. Thus $A = \overline A$ is closed.

(1) ⇔ (4): basis elements are open, so (1) implies (4). Conversely every open $V$ is a union of basis elements $B_\alpha$, and $f^{-1}(V) = \bigcup f^{-1}(B_\alpha)$ is a union of open sets.

(1) ⇔ (5): if $f$ is continuous and $V$ is an open set containing $f(x)$, then $U = f^{-1}(V)$ works. Conversely, let $V$ be open and $x\in f^{-1}(V)$. By continuity at $x$ there is an open $U_x\ni x$ with $f(U_x)\subseteq V$, i.e. $U_x\subseteq f^{-1}(V)$. So $f^{-1}(V) = \bigcup_x U_x$ is open.
:::

Composition is the simplest consequence of the definition: if $f\colon X\to Y$ and $g\colon Y\to Z$ are continuous, then $(g\circ f)^{-1}(W) = f^{-1}\big(g^{-1}(W)\big)$ is open for every open $W\subseteq Z$, so $g\circ f$ is continuous.

::: example Continuity depends on both topologies {#ex-depends}
Decide which of the following maps are continuous. (a) Any map from a discrete space. (b) Any map into an indiscrete space. (c) The identity map $(X, \tau_1)\to(X, \tau_2)$. (d) The identity maps $\R_\ell\to\R$ and $\R\to\R_\ell$. (e) Maps from a space $X$ to Sierpiński space $S = \set{0, 1}$ (open sets $\emptyset$, $\set1$, $S$).
::: solution
(a) Every preimage is open in a discrete space, so every map is continuous. (b) The only preimages to check are $f^{-1}(\emptyset) = \emptyset$ and $f^{-1}(Y) = X$, which are open: every map is continuous. (c) The preimage of $V$ is $V$ itself, so the identity is continuous iff every $\tau_2$-open set is $\tau_1$-open, that is, iff $\tau_1$ is finer than $\tau_2$. (d) By (c) and [[topology/topological-spaces#ex-bases]], $\R_\ell\to\R$ is continuous and $\R\to\R_\ell$ is not (the preimage of $[0, 1)$ is not open in $\R$). (e) A map $f\colon X\to S$ is continuous iff $f^{-1}(\set1)$ is open. So continuous maps $X\to S$ correspond exactly to open subsets of $X$, via $U\mapsto$ (the function equal to $1$ on $U$ and $0$ elsewhere). Sierpiński space "classifies" open sets, just as $\set{0,1}$ classifies arbitrary subsets.
:::
:::

::: warning Continuous maps need not preserve open or closed sets
Continuity is about preimages, not images. The continuous function $f(x) = x^2$ maps the open interval $(-1, 1)$ onto $[0, 1)$, which is not open, and $\exp$ maps the closed set $\R$ onto $(0,\infty)$, which is not closed in $\R$. Maps that send open sets to open sets are called **open maps**; they form a different class, neither containing nor contained in the continuous maps (for instance the identity $\R\to\R_\ell$ is open but not continuous).
:::

## Homeomorphisms

::: definition Homeomorphism {#def-homeomorphism}
A **homeomorphism** is a bijection $f\colon X\to Y$ such that both $f$ and $f^{-1}$ are continuous. If one exists, $X$ and $Y$ are **homeomorphic**, written $X\cong Y$. A property of spaces is **topological** if it is preserved by homeomorphisms.
:::

Since $f^{-1}$ is continuous exactly when $f$ maps open sets to open sets, a homeomorphism is a bijection that matches up the open sets of $X$ with those of $Y$. Everything defined in terms of open sets — closures, convergence, density, connectedness, compactness, and the fundamental group of [[topology/fundamental-group]] — is therefore preserved. Distances, angles, straightness and boundedness are not.

::: example Some homeomorphisms {#ex-homeo}
Show that (a) every open interval is homeomorphic to $\R$; (b) the open unit disc $D = \set{x\in\R^2 : \norm x < 1}$ is homeomorphic to $\R^2$; (c) the circle with one point removed is homeomorphic to $\R$.
::: solution
(a) Any two bounded open intervals are homeomorphic by an increasing affine map $x\mapsto a + (b - a)x$, so it suffices to treat $(-1, 1)$. The map $f(x) = \tan\frac{\pi x}{2}$ is a continuous, strictly increasing bijection $(-1,1)\to\R$, with continuous inverse $f^{-1}(y) = \frac2\pi\arctan y$. Unbounded intervals are handled similarly, e.g. $\ln\colon(0, \infty)\to\R$.

(b) Define $f(x) = \dfrac{x}{1 - \norm x}$ on $D$ and $g(y) = \dfrac{y}{1 + \norm y}$ on $\R^2$. Both are continuous (compositions of continuous functions with non-vanishing denominators). For $x\in D$, $\norm{f(x)} = \frac{\norm x}{1 - \norm x}$, so $1 + \norm{f(x)} = \frac{1}{1 - \norm x}$ and $g(f(x)) = x$; similarly $\norm{g(y)} = \frac{\norm y}{1 + \norm y} < 1$ and $f(g(y)) = y$. So $f$ is a homeomorphism with inverse $g$. The same formulas show that the open unit ball is homeomorphic to $\R^n$ for every $n$.

(c) Let $S^1 = \set{(x, y) : x^2 + y^2 = 1}$ and $N = (0, 1)$. **Stereographic projection** sends $(x, y)\in S^1\setminus\set N$ to the point where the line from $N$ through $(x,y)$ meets the $x$-axis:

$$
\sigma(x, y) = \frac{x}{1 - y}, \qquad \sigma^{-1}(t) = \Big(\frac{2t}{t^2 + 1},\ \frac{t^2 - 1}{t^2 + 1}\Big).
$$

Both formulas are continuous, and a direct substitution shows they are inverse to each other (this is the one-dimensional case of the Riemann sphere construction in [[complex-analysis/complex-numbers]]).
:::
:::

::: widget plot
f: tan(pi*x/2); x/(1 - abs(x))
x: -0.98, 0.98
y: -8, 8
labels: \tan(\pi x/2); x/(1-\lvert x\rvert)
caption: Two homeomorphisms from the bounded interval $(-1, 1)$ onto the whole line $\R$. Both are continuous, strictly increasing and surjective, so they have continuous inverses. Boundedness is not a topological property: topology cannot tell a short open interval from an infinitely long line.
:::

The inverse of a continuous bijection need not be continuous, and this is the most common trap in proving that two spaces are homeomorphic.

::: example A continuous bijection that is not a homeomorphism {#ex-not-homeo}
Show that $f\colon[0, 2\pi)\to S^1$, $f(t) = (\cos t, \sin t)$, is a continuous bijection but not a homeomorphism.
::: solution
$f$ is continuous because its components are, and it is a bijection because every point of the circle has exactly one angle in $[0, 2\pi)$. Consider the set $U = [0, \pi)$, which is open in $[0, 2\pi)$ (it is $(-1, \pi)\cap[0, 2\pi)$; subspace topologies are discussed below). Its image $f(U)$ is the upper half-circle including $(1, 0)$ but not $(-1, 0)$. This is not open in $S^1$: every open arc around $(1, 0)$ contains points $(\cos t, \sin t)$ with $t$ slightly negative, i.e. in the lower half, which are not in $f(U)$. Since $(f^{-1})^{-1}(U) = f(U)$ is not open, $f^{-1}$ is not continuous. Concretely, the points $f(2\pi - \frac1n)$ converge to $(1, 0) = f(0)$ in $S^1$, but their preimages $2\pi - \frac1n$ do not converge to $0$.
:::
:::

::: widget parametric
fx: cos(t)
fy: sin(t)
t: 0, 6.2
equal: true
trace: true
caption: The map $t\mapsto(\cos t, \sin t)$ on $[0, 2\pi)$ wraps an interval once around the circle. Points near the right end of the interval land next to the image of $0$: the circle "glues" the two ends, which the interval keeps apart. That is why the inverse map, which must tear the circle open at $(1,0)$, is not continuous. In [[topology/compactness]] we will see that this cannot happen for a closed interval $[0, 2\pi]$ mapping onto a circle by a continuous bijection — there is none.
:::

::: quiz
Which of the following pairs of subspaces of $\R$ or $\R^2$ are homeomorphic?
- [x] $(0, 1)$ and $(0, \infty)$
- [x] The boundary of a square and a circle
- [ ] $[0, 2\pi)$ and the circle $S^1$, via $t\mapsto(\cos t, \sin t)$ — so the spaces are homeomorphic
- [x] The open disc and the open square $(0,1)\times(0,1)$
::: solution
$(0,1)\cong(0,\infty)$ via $x\mapsto\frac{x}{1-x}$. The boundary of a square centred at $0$ is mapped homeomorphically onto the circle by radial projection $x\mapsto x/\norm x$, with inverse $y\mapsto y/\norm y_\infty$. The open disc and the open square are both homeomorphic to $\R^2$ (radial rescaling; see [[#exr-square-disc]]). The third statement is false: [[#ex-not-homeo]] shows that this particular map is not a homeomorphism, and in fact *no* homeomorphism exists — removing a point from $S^1$ leaves it connected, while removing the point $\pi$ from $[0, 2\pi)$ does not ([[topology/connectedness]]).
:::
:::

Two famous results put the definition in perspective. In 1877 Georg Cantor found a *bijection* between the interval $[0,1]$ and the square $[0,1]^2$, and in 1890 Giuseppe Peano constructed a *continuous surjection* from $[0,1]$ onto $[0,1]^2$ (a space-filling curve). Neither is a homeomorphism, and L. E. J. Brouwer proved in 1911 that $\R^m$ and $\R^n$ are not homeomorphic for $m\neq n$ — dimension is a topological invariant, but proving it needs real tools. For $m = 1$, $n = 2$ we will give a short proof in [[topology/connectedness]].

## Subspaces

Every subset of a topological space inherits a topology.

::: definition Subspace topology {#def-subspace}
Let $X$ be a topological space and $A\subseteq X$. The **subspace topology** on $A$ consists of the sets $U\cap A$ with $U$ open in $X$. With it, $A$ is a **subspace** of $X$.
:::

The axioms hold because intersecting with $A$ commutes with unions and intersections: $\bigcup(U_\alpha\cap A) = (\bigcup U_\alpha)\cap A$ and $(U\cap A)\cap(V\cap A) = (U\cap V)\cap A$. Taking complements, the closed sets of $A$ are the sets $C\cap A$ with $C$ closed in $X$. For a subset of a metric space, the subspace topology is the topology of the restricted metric, so all the subsets of $\R^n$ that we meet carry their familiar topologies.

::: example Open in the subspace, not in the space {#ex-subspace}
(a) In $A = [0, 2]\subseteq\R$, show that $[0, 1)$ is open and $(1, 2]$ is open, while neither is open in $\R$. (b) Show that $\Z\subseteq\R$ is a discrete subspace, while $K = \set0\cup\set{1/n : n\ge1}$ is not. (c) In the subspace $\Q\subseteq\R$, show that $\set{q\in\Q : q^2 < 2}$ is both open and closed.
::: solution
(a) $[0, 1) = (-1, 1)\cap A$ and $(1, 2] = (1, 3)\cap A$. Neither is open in $\R$, because no interval around $0$ (respectively $2$) lies inside it. "Open" is a relative notion: always say *open in what*.

(b) For $n\in\Z$, $\set n = (n - \frac12, n + \frac12)\cap\Z$, so every singleton is open in $\Z$ and the subspace topology is discrete. In $K$, the points $1/n$ are isolated ($\set{1/n} = (\frac{1}{n+1}, \frac{1}{n-1})\cap K$ for $n\ge2$, and similarly for $n = 1$), but $\set0$ is not open: every open set of $\R$ containing $0$ contains points $1/n$.

(c) $\set{q\in\Q : q^2 < 2} = (-\sqrt2, \sqrt2)\cap\Q = [-\sqrt2, \sqrt2]\cap\Q$, because $\pm\sqrt2\notin\Q$. The first description shows it is open in $\Q$, the second that it is closed in $\Q$. The rationals fall apart into clopen pieces — they are totally disconnected, as we will see in [[topology/connectedness]].
:::
:::

::: quiz
Let $A = [0, 1]$ with the subspace topology from $\R$. Which of these subsets are open in $A$? (Several may be correct.)
- [x] $[0, \tfrac12)$
- [ ] $\set1$
- [ ] $[\tfrac12, 1)$
- [x] $(\tfrac12, 1]$
::: solution
$[0, \frac12) = (-1, \frac12)\cap A$ and $(\frac12, 1] = (\frac12, 2)\cap A$ are open in $A$. The set $\set1$ is not open in $A$, since every open set of $\R$ containing $1$ also contains points of $A$ slightly less than $1$; and $[\frac12, 1)$ is not open in $A$ because of the point $\frac12$, which lies in the interior of $A$ but has no neighbourhood inside the set.
:::
:::

The subspace topology is characterised by which maps *into* $A$ are continuous.

::: theorem Universal property of subspaces {#thm-subspace}
Let $A$ be a subspace of $X$, with inclusion map $\iota\colon A\to X$. Then $\iota$ is continuous, and for every space $Z$, a map $g\colon Z\to A$ is continuous if and only if $\iota\circ g\colon Z\to X$ is continuous. In particular, the restriction $f|_A$ of a continuous map $f\colon X\to Y$ is continuous, and a continuous map $f\colon X\to Y$ with $f(X)\subseteq B$ is continuous as a map into the subspace $B$.
:::

::: proof
For $U$ open in $X$, $\iota^{-1}(U) = U\cap A$ is open in $A$, so $\iota$ is continuous, and hence so is $\iota\circ g$ whenever $g$ is. Conversely, suppose $\iota\circ g$ is continuous. An open set of $A$ has the form $U\cap A$, and $g^{-1}(U\cap A) = (\iota\circ g)^{-1}(U)$ is open in $Z$. So $g$ is continuous. For the last statements: $f|_A = f\circ\iota$ is a composition of continuous maps; and if $f(X)\subseteq B$, write $f = \iota_B\circ g$ with $g\colon X\to B$ and apply the first part.
:::

A continuous injective map $f\colon X\to Y$ is an **embedding** if it is a homeomorphism onto its image $f(X)$ with the subspace topology. The map of [[#ex-not-homeo]] is a continuous injection of $[0, 2\pi)$ into $\R^2$ that is not an embedding.

Continuous maps are often defined piece by piece. The next lemma says when the pieces fit together continuously.

::: lemma Pasting lemma {#lem-pasting}
Let $X = A\cup B$ with $A$ and $B$ both closed in $X$ (or both open). If $f\colon X\to Y$ is a map whose restrictions $f|_A$ and $f|_B$ are continuous, then $f$ is continuous.
:::

::: proof
Let $C$ be closed in $Y$. Then $f^{-1}(C) = (f|_A)^{-1}(C)\cup(f|_B)^{-1}(C)$. By continuity of the restrictions, $(f|_A)^{-1}(C)$ is closed in the subspace $A$, so it equals $D\cap A$ for some closed $D\subseteq X$; as $A$ is closed in $X$, $D\cap A$ is closed in $X$. Similarly $(f|_B)^{-1}(C)$ is closed in $X$, and $f^{-1}(C)$ is a union of two closed sets, hence closed. By [[#thm-continuity]], $f$ is continuous. The open case is identical with open sets in place of closed ones.
:::

For instance, $\abs x$ is continuous on $\R$ because it equals $-x$ on the closed set $(-\infty, 0]$ and $x$ on the closed set $[0,\infty)$, and both agree at $0$. The pasting lemma will be used constantly in [[topology/fundamental-group]], where paths are joined end to end. The hypothesis on $A$ and $B$ cannot be dropped: the function equal to $0$ on $(-\infty, 0)$ and $1$ on $[0,\infty)$ has continuous restrictions to both pieces but is not continuous, and indeed $(-\infty, 0)$ is not closed.

## Products

How should $X\times Y$ be topologised? In $\R^2 = \R\times\R$, the open rectangles $(a, b)\times(c, d)$ form a basis. Imitating this:

::: definition Product topology {#def-product}
Let $X$ and $Y$ be topological spaces. The **product topology** on $X\times Y$ is the topology generated by the basis of all sets $U\times V$ with $U$ open in $X$ and $V$ open in $Y$.
:::

These sets do form a basis: they cover $X\times Y$ (take $U = X$, $V = Y$), and $(U_1\times V_1)\cap(U_2\times V_2) = (U_1\cap U_2)\times(V_1\cap V_2)$ is again of the same form. Note that a general open set in the product is a *union* of such boxes and is usually not itself a product: an open disc in $\R^2$ is not of the form $U\times V$. By [[topology/topological-spaces#ex-bases]], the product topology on $\R\times\R$ is the standard topology of $\R^2$, and by induction $\R^n = \R\times\dots\times\R$.

::: theorem Universal property of products {#thm-product}
The projections $\pi_1\colon X\times Y\to X$ and $\pi_2\colon X\times Y\to Y$ are continuous. For every space $Z$, a map $f = (f_1, f_2)\colon Z\to X\times Y$ is continuous if and only if both components $f_1 = \pi_1\circ f$ and $f_2 = \pi_2\circ f$ are continuous.
:::

::: proof
For $U$ open in $X$, $\pi_1^{-1}(U) = U\times Y$ is a basis element, hence open; similarly for $\pi_2$. If $f$ is continuous, so are the compositions $f_1, f_2$. Conversely, suppose $f_1, f_2$ are continuous. For a basis element $U\times V$,

$$
f^{-1}(U\times V) = \set{z : f_1(z)\in U \text{ and } f_2(z)\in V} = f_1^{-1}(U)\cap f_2^{-1}(V),
$$

which is open. By [[#thm-continuity]](4), $f$ is continuous.
:::

This theorem explains why the product topology, rather than some other topology on $X\times Y$, is the right one: it is the coarsest topology making both projections continuous, and it makes "continuity of a vector-valued map" equivalent to "continuity of its components", as in multivariable calculus.

::: example Continuity of arithmetic and the torus {#ex-product}
(a) Show that if $f, g\colon X\to\R$ are continuous, then so are $f + g$ and $fg$. (b) Show that the torus $T = S^1\times S^1$ is homeomorphic to the doughnut-shaped surface in $\R^3$ obtained by rotating the circle of radius $1$ in the $xz$-plane centred at $(2, 0, 0)$ about the $z$-axis.
::: solution
(a) Addition $s(x, y) = x + y$ and multiplication $m(x, y) = xy$ are continuous maps $\R^2\to\R$ (from the ε–δ estimates of [[calculus-1/limits]]). By [[#thm-product]] the map $h = (f, g)\colon X\to\R^2$ is continuous, so $f + g = s\circ h$ and $fg = m\circ h$ are continuous.

(b) Write points of $S^1$ as $(\cos u, \sin u)$. Define

$$
F\big((\cos u, \sin u), (\cos v, \sin v)\big) = \big((2 + \cos v)\cos u,\ (2 + \cos v)\sin u,\ \sin v\big).
$$

This is well defined (it depends only on the points of the circles, as the formula involves only $\cos u$, $\sin u$, $\cos v$, $\sin v$), and continuous by [[#thm-product]] and [[#thm-subspace]], since each coordinate is a polynomial in the four coordinates of $S^1\times S^1\subseteq\R^4$. It is a bijection onto the surface: from a point $(X, Y, Z)$ of the surface we recover $\cos v = \sqrt{X^2 + Y^2} - 2$, $\sin v = Z$, and $(\cos u, \sin u) = (X, Y)/\sqrt{X^2 + Y^2}$; these formulas are continuous, so $F^{-1}$ is continuous. (In [[topology/compactness]] we will see that the continuity of the inverse is automatic here.)
:::
:::

::: widget surface
fx: (2 + cos(v))*cos(u)
fy: (2 + cos(v))*sin(u)
fz: sin(v)
u: 0, 2pi
v: 0, 2pi
color: height
caption: The torus $S^1\times S^1$ embedded in $\R^3$: the coordinate $u$ goes once around the big circle (the first factor) and $v$ once around the tube (the second factor). Rotate the surface. Each "horizontal" circle $v = \text{const}$ is a copy of the first factor and each meridian $u = \text{const}$ a copy of the second; they correspond to the two independent loops whose study leads to $\pi_1(T)\cong\Z^2$ in [[topology/fundamental-group]].
:::

::: application Configuration spaces
The set of all positions of a mechanical system is a topological space, its **configuration space**, and products appear naturally. A planar robot arm with two rotating joints is described by two angles, so its configuration space is the torus $S^1\times S^1$; an arm with $n$ joints has the $n$-dimensional torus $(S^1)^n$, and a rigid body moving in the plane has $\R^2\times S^1$ (position and orientation). Motion planning asks for paths in these spaces avoiding forbidden regions, and the topology of the space — for instance, whether it is connected, or which loops cannot be shrunk — determines what any planning algorithm can achieve.
:::

::: history
The word *homeomorphism* was introduced by Henri Poincaré in *Analysis Situs* (1895), though for him it referred to smooth maps; the modern definition, a continuous bijection with continuous inverse, crystallised in the work of Fréchet and Hausdorff in the 1900s and 1910s. Cantor's bijection between the line and the plane (1877) and Peano's space-filling curve (1890) showed that the intuitive idea of dimension needed justification, which Brouwer supplied in 1911 by proving the invariance of dimension. For products of infinitely many spaces the correct topology is not the obvious "box" topology but the coarser one generated by sets that restrict only finitely many coordinates; it was introduced by Andrey Tychonoff in 1930, who proved that arbitrary products of closed intervals are compact in this topology — the origin of Tychonoff's theorem that products of compact spaces are compact.
:::

## Where this leads

Continuity and homeomorphism are the morphisms and isomorphisms of topology, and the rest of the course is a search for topological properties that can tell spaces apart. Connectedness ([[topology/connectedness]]) distinguishes $\R$ from $\R^2$; compactness ([[topology/compactness]]) distinguishes $[0, 1]$ from $(0, 1)$; the fundamental group ([[topology/fundamental-group]]) distinguishes the disc from the annulus; and the Euler characteristic ([[topology/surfaces]]) distinguishes the sphere from the torus. Quotient spaces, the third basic construction after subspaces and products, are studied in [[topology/quotient-spaces]] and have a universal property dual to the one for products.

::: summary
- $f\colon X\to Y$ is continuous if preimages of open sets are open; equivalently, preimages of closed sets are closed, or $f(\overline A)\subseteq\overline{f(A)}$, or preimages of basis elements are open, or $f$ is continuous at every point ([[#thm-continuity]]).
- Whether a map is continuous depends on both topologies: every map from a discrete space or into an indiscrete space is continuous. Continuous maps need not send open sets to open sets.
- A homeomorphism is a continuous bijection with continuous inverse; homeomorphic spaces have the same topological properties. $(-1, 1)\cong\R$, the open disc $\cong\R^2$, and the circle minus a point $\cong\R$, but a continuous bijection need not be a homeomorphism.
- The subspace topology on $A$ consists of the sets $U\cap A$; a map into $A$ is continuous iff it is continuous into $X$. Openness is relative to the ambient space.
- The pasting lemma glues continuous maps defined on finitely many closed (or on open) pieces.
- The product topology has basis $U\times V$; a map into $X\times Y$ is continuous iff its components are ([[#thm-product]]).
:::

## Exercises

::: exercise Maps of Sierpiński space {level=1 check="3"}
Let $S = \set{0, 1}$ with open sets $\emptyset$, $\set1$, $S$. How many of the four maps $S\to S$ are continuous?
::: solution
A map $f\colon S\to S$ is continuous iff $f^{-1}(\set1)$ is open, i.e. is $\emptyset$, $\set1$ or $S$. The two constant maps have $f^{-1}(\set1) = \emptyset$ or $S$; the identity has $\set1$; the swap $0\leftrightarrow1$ has $f^{-1}(\set1) = \set0$, which is not open. So $3$ maps are continuous.
:::
:::

::: exercise Continuous but not open {level=1}
Show that $f\colon\R\to\R$, $f(x) = x^2$, is continuous but not an open map, and that $g\colon\R\to\R$, $g(x) = e^x$, maps a closed set onto a set that is not closed.
::: solution
$f$ is a polynomial, hence continuous; it maps the open set $(-1, 1)$ to $[0, 1)$, which is not open since no interval around $0$ lies in it. $g$ is continuous and maps the closed set $\R$ onto $(0,\infty)$, which is not closed because $0$ is in its closure but not in the set.
:::
:::

::: exercise Explicit homeomorphisms {level=1}
Write down explicit homeomorphisms $(0, 1)\to(2, 5)$, $(0, 1)\to(0, \infty)$ and $(0, \infty)\to\R$, with their inverses.
::: solution
$x\mapsto2 + 3x$ with inverse $y\mapsto(y - 2)/3$; $x\mapsto\frac{x}{1 - x}$ with inverse $y\mapsto\frac{y}{1 + y}$; $x\mapsto\ln x$ with inverse $y\mapsto e^y$. Each is a continuous strictly increasing bijection whose inverse is given by a continuous formula.
:::
:::

::: exercise Discrete subspaces {level=2}
Prove that a subspace $A\subseteq X$ is discrete if and only if every point $a\in A$ has an open neighbourhood $U$ in $X$ with $U\cap A = \set a$. Decide whether $\set{1/n : n\ge1}$ and $\set{1/n : n\ge1}\cup\set0$ are discrete subspaces of $\R$.
::: solution
The subspace is discrete iff every singleton $\set a$ is open in $A$, iff $\set a = U\cap A$ for some $U$ open in $X$. For $A = \set{1/n}$: around $1/n$ the interval $(\frac{1}{n+1}, \frac{1}{n-1})$ (or $(\frac12, 2)$ for $n = 1$) meets $A$ only in $1/n$, so $A$ is discrete. Adding $0$ destroys this at $0$, as in [[#ex-subspace]](b): every open set around $0$ contains infinitely many $1/n$.
:::
:::

::: exercise Floor and ceiling on the Sorgenfrey line {level=2}
Regard $\R$ with its standard topology as the target. Show that the floor function $\lfloor\cdot\rfloor\colon\R_\ell\to\R$ is continuous, while the ceiling function $\lceil\cdot\rceil\colon\R_\ell\to\R$ is not.
::: solution
For an open set $V\subseteq\R$, $\lfloor\cdot\rfloor^{-1}(V) = \bigcup_{n\in V\cap\Z}[n, n + 1)$, a union of basis elements of $\R_\ell$, hence open. So the floor function is continuous on $\R_\ell$ (though not on $\R$). For the ceiling, $\lceil\cdot\rceil^{-1}\big((\tfrac12, \tfrac32)\big) = \set{x : \lceil x\rceil = 1} = (0, 1]$, which is not open in $\R_\ell$: no basis set $[1, 1 + \eps)$ is contained in it.
:::
:::

::: exercise Graphs are homeomorphic to domains {level=2}
Let $f\colon X\to Y$ be continuous and let $\Gamma_f = \set{(x, f(x)) : x\in X}\subseteq X\times Y$ be its graph with the subspace topology. Prove that $\Gamma_f\cong X$.
::: solution
Let $h\colon X\to\Gamma_f$, $h(x) = (x, f(x))$. As a map into $X\times Y$ it has continuous components $\mathrm{id}$ and $f$, so it is continuous by [[#thm-product]], and hence continuous into the subspace $\Gamma_f$ by [[#thm-subspace]]. It is a bijection onto $\Gamma_f$, and its inverse is the restriction of the projection $\pi_1$ to $\Gamma_f$, which is continuous. So $h$ is a homeomorphism.
:::
:::

::: exercise Projections are open {level=2}
Prove that the projection $\pi_1\colon X\times Y\to X$ is an open map. Is it a closed map? Consider $\set{(x, y)\in\R^2 : xy = 1}$.
::: solution
Every open set $W\subseteq X\times Y$ is a union of basis sets $U_\alpha\times V_\alpha$ (which we may take with $V_\alpha\neq\emptyset$), and $\pi_1(W) = \bigcup\pi_1(U_\alpha\times V_\alpha) = \bigcup U_\alpha$ is open. It is not a closed map: the hyperbola $H = \set{xy = 1}$ is closed in $\R^2$ (the preimage of $\set1$ under the continuous map $(x, y)\mapsto xy$), but $\pi_1(H) = \R\setminus\set0$ is not closed in $\R$.
:::
:::

::: exercise Gluing along open sets {level=3}
Let $\set{U_\alpha}$ be any collection of open sets covering $X$, and let $f\colon X\to Y$ be a map whose restrictions $f|_{U_\alpha}$ are all continuous. Prove that $f$ is continuous. Show by an example that the analogous statement for an infinite collection of *closed* sets is false.
::: solution
Let $V\subseteq Y$ be open. Then $f^{-1}(V) = \bigcup_\alpha(f|_{U_\alpha})^{-1}(V)$. Each $(f|_{U_\alpha})^{-1}(V)$ is open in $U_\alpha$, i.e. of the form $W_\alpha\cap U_\alpha$ with $W_\alpha$ open in $X$, and is therefore open in $X$ because $U_\alpha$ is. A union of open sets is open, so $f$ is continuous. For closed sets, cover $\R$ by the singletons $\set x$, which are closed; the restriction of *any* function to a single point is continuous, but not every function on $\R$ is continuous. (The pasting lemma needs finitely many closed sets.)
:::
:::

::: exercise The square and the disc {#exr-square-disc level=3}
Prove that the closed square $Q = [-1, 1]^2$ is homeomorphic to the closed disc $\overline D = \set{x : \norm x_2\le1}$.
::: hint
Rescale each ray from the origin: send $x\neq0$ to $\frac{\norm x_\infty}{\norm x_2}\,x$, where $\norm x_\infty = \max(\abs{x_1}, \abs{x_2})$.
:::
::: solution
Define $h(0) = 0$ and $h(x) = \frac{\norm x_\infty}{\norm x_2}\,x$ for $x\neq0$. Then $\norm{h(x)}_2 = \norm x_\infty$, so $h$ maps $Q = \set{\norm x_\infty\le1}$ into $\overline D$, and it maps each ray from $0$ into itself. Its inverse is $k(0) = 0$, $k(y) = \frac{\norm y_2}{\norm y_\infty}\,y$, since $\norm{k(y)}_\infty = \norm y_2$ and the two scaling factors are reciprocal (the ratio $\norm x_\infty/\norm x_2$ depends only on the direction of $x$); so $h$ is a bijection $Q\to\overline D$. Away from $0$ both $h$ and $k$ are continuous, as quotients of continuous functions with non-vanishing denominators. At $0$: $\norm{h(x)}_2 = \norm x_\infty\le\norm x_2\to0$ and $\norm{k(y)}_2 = \frac{\norm y_2^2}{\norm y_\infty}\le\sqrt2\,\norm y_2\to0$ (using $\norm y_2\le\sqrt2\norm y_\infty$), so both are continuous at $0$. Hence $h$ is a homeomorphism. Restricting to the interiors also shows that the open square and the open disc are homeomorphic.
:::
:::

::: exercise A topological invariant {level=3}
Call a space **second countable** if its topology has a countable basis. Prove that second countability is a topological property, and deduce that $\R$ and the Sorgenfrey line $\R_\ell$ are not homeomorphic.
::: solution
Let $h\colon X\to Y$ be a homeomorphism and $\mathcal B$ a countable basis of $X$. The sets $h(B)$, $B\in\mathcal B$, are open in $Y$ (they are preimages of open sets under the continuous map $h^{-1}$), and there are countably many. If $V\subseteq Y$ is open, then $h^{-1}(V)$ is open in $X$, so $h^{-1}(V) = \bigcup B_\alpha$ with $B_\alpha\in\mathcal B$, and $V = h\big(h^{-1}(V)\big) = \bigcup h(B_\alpha)$. So $\set{h(B)}$ is a countable basis of $Y$. Now $\R$ has a countable basis (intervals with rational endpoints), while $\R_\ell$ has none ([[topology/topological-spaces#exr-sorgenfrey]]). Hence $\R\not\cong\R_\ell$.
:::
:::
