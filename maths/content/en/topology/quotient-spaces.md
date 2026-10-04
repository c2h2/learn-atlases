Take a square sheet of paper and glue its left edge to its right edge: you get a cylinder. Now glue the top circle of the cylinder to the bottom circle and you get a torus — the surface of a doughnut. If instead you give the strip a half-twist before gluing the first pair of edges, you get a Möbius band, a surface with only one side. Gluing is the most powerful way of building new spaces, and almost every interesting space in geometry and topology can be described as a polygon, a disc or a cube with some points identified.

To make gluing precise we need the **quotient topology**: identify points by an equivalence relation, and declare a set of equivalence classes open exactly when the set of all points in those classes is open. This simple definition has a universal property dual to the one for products, and combined with the theorem "compact to Hausdorff" of [[topology/compactness]] it lets us recognise quotients as familiar spaces. But gluing can also produce monsters — spaces in which a sequence converges to two different points, or in which the only open sets are $\emptyset$ and everything. To keep track of good behaviour we first study the **separation axioms**, above all the Hausdorff property.

## Separation axioms

In a metric space, distinct points can be separated by disjoint balls. General topological spaces need not have this property ([[topology/topological-spaces#ex-many-limits]]), and the degree to which points and closed sets can be separated by open sets is measured by a hierarchy of conditions.

::: definition Separation axioms {#def-separation}
A topological space $X$ is

1. **$T_1$** if for any two distinct points $x, y$, each has an open neighbourhood not containing the other;
2. **Hausdorff** (or $T_2$) if any two distinct points have *disjoint* open neighbourhoods;
3. **regular** if it is $T_1$ and any point $x$ and closed set $C\not\ni x$ have disjoint open neighbourhoods;
4. **normal** if it is $T_1$ and any two disjoint closed sets have disjoint open neighbourhoods.
:::

Each condition implies the previous ones (in a $T_1$ space points are closed, so regular implies Hausdorff and normal implies regular). Metric spaces satisfy all four: for normality, given disjoint closed sets $A$ and $B$, the function $f(x) = \frac{d(x, A)}{d(x, A) + d(x, B)}$ is continuous, equal to $0$ on $A$ and $1$ on $B$, and $f^{-1}([0, \frac12))$, $f^{-1}((\frac12, 1])$ are disjoint open neighbourhoods. Urysohn's lemma says that, conversely, every normal space has such separating functions.

::: proposition T₁ means points are closed {#prop-t1}
A space $X$ is $T_1$ if and only if every singleton $\set x$ is closed.
:::

::: proof
If $X$ is $T_1$ and $x\in X$, every $y\neq x$ has an open neighbourhood not containing $x$; the union of these neighbourhoods is $X\setminus\set x$, which is therefore open. Conversely, if all singletons are closed and $x\neq y$, then $X\setminus\set y$ is an open neighbourhood of $x$ not containing $y$, and symmetrically.
:::

::: example Where the axioms fail {#ex-separation}
Decide which of the separation properties hold for (a) an infinite set with the cofinite topology, (b) Sierpiński space, (c) the Sorgenfrey line $\R_\ell$.
::: solution
(a) Singletons are finite, hence closed: the space is $T_1$. It is not Hausdorff, because any two non-empty open sets have finite complements and therefore intersect. (b) In Sierpiński space $\set{0,1}$ (open sets $\emptyset$, $\set1$, $\set{0,1}$), the only open set containing $0$ is the whole space, which contains $1$: not $T_1$. (c) $\R_\ell$ is Hausdorff, since its topology is finer than the standard one: the disjoint intervals that separate two points in $\R$ are open in $\R_\ell$ too. (It is in fact normal, although the product $\R_\ell\times\R_\ell$ is not — a famous example showing that normality is not preserved by products.)
:::
:::

The Hausdorff property is the one that matters most, and the first reason is the uniqueness of limits.

::: theorem Limits in Hausdorff spaces {#thm-unique-limits}
In a Hausdorff space, a sequence converges to at most one point.
:::

::: proof
Suppose $x_n\to x$ and $x_n\to y$ with $x\neq y$. Choose disjoint open sets $U\ni x$ and $V\ni y$. Then $x_n\in U$ for all $n\ge N_1$ and $x_n\in V$ for all $n\ge N_2$, so $x_n\in U\cap V = \emptyset$ for $n\ge\max(N_1, N_2)$ — impossible.
:::

::: theorem Subspaces and products of Hausdorff spaces {#thm-hausdorff-products}
Every subspace of a Hausdorff space is Hausdorff, and the product of two Hausdorff spaces is Hausdorff. Moreover, $X$ is Hausdorff if and only if the **diagonal** $\Delta = \set{(x, x) : x\in X}$ is closed in $X\times X$.
:::

::: proof
*Subspaces.* If $x\neq y$ in $A\subseteq X$, disjoint open sets $U\ni x$ and $V\ni y$ of $X$ give disjoint open sets $U\cap A$ and $V\cap A$ of $A$.

*Products.* Let $(x_1, y_1)\neq(x_2, y_2)$ in $X\times Y$; say $x_1\neq x_2$ (the other case is symmetric). Choose disjoint open $U_1\ni x_1$, $U_2\ni x_2$ in $X$. Then $U_1\times Y$ and $U_2\times Y$ are disjoint open neighbourhoods of the two points.

*Diagonal.* A point $(x, y)\notin\Delta$ means $x\neq y$. A basic open set $U\times V$ contains $(x, y)$ and misses $\Delta$ exactly when $x\in U$, $y\in V$ and $U\cap V = \emptyset$. So the complement of $\Delta$ is open (every point outside $\Delta$ has such a box around it) if and only if any two distinct points have disjoint neighbourhoods.
:::

::: quiz
Which of these spaces are Hausdorff? (Several may be correct.)
- [x] Any metric space
- [ ] $\R$ with the cofinite topology
- [x] The Sorgenfrey line $\R_\ell$
- [x] Any subspace of $\R^n$
- [ ] An indiscrete space with two points
::: solution
Metric spaces are Hausdorff (separate by balls of radius half the distance), hence so are subspaces of $\R^n$. $\R_\ell$ has a finer topology than $\R$, so it inherits the separating sets. The cofinite topology on an infinite set has no disjoint non-empty open sets, and an indiscrete space with two points has only one non-empty open set.
:::
:::

## The quotient topology

::: definition Quotient space {#def-quotient}
Let $X$ be a topological space and $\sim$ an equivalence relation on $X$. Let $X/{\sim}$ be the set of equivalence classes and $q\colon X\to X/{\sim}$, $q(x) = [x]$, the **quotient map**. The **quotient topology** on $X/{\sim}$ declares $U\subseteq X/{\sim}$ open if and only if $q^{-1}(U)$ is open in $X$.
:::

This is a topology because preimages commute with unions and intersections: $q^{-1}(\bigcup U_\alpha) = \bigcup q^{-1}(U_\alpha)$ and $q^{-1}(U\cap V) = q^{-1}(U)\cap q^{-1}(V)$. It is the *finest* topology on $X/{\sim}$ making $q$ continuous. Note that $q^{-1}(U)$ is always **saturated** — a union of equivalence classes — so the open sets of the quotient correspond exactly to the saturated open sets of $X$.

A common special case: if $A\subseteq X$, then $X/A$ denotes the quotient in which all points of $A$ are identified to a single point and all other points are left alone ("collapsing $A$ to a point").

::: theorem Universal property of quotients {#thm-quotient-universal}
Let $q\colon X\to X/{\sim}$ be a quotient map. A map $g\colon X/{\sim}\to Z$ is continuous if and only if $g\circ q\colon X\to Z$ is continuous. Consequently, every continuous $f\colon X\to Z$ that is constant on each equivalence class induces a continuous map $\bar f\colon X/{\sim}\to Z$ with $\bar f\circ q = f$.
:::

::: proof
If $g$ is continuous, so is $g\circ q$, since $q$ is. Conversely, suppose $g\circ q$ is continuous and let $W\subseteq Z$ be open. Then $q^{-1}\big(g^{-1}(W)\big) = (g\circ q)^{-1}(W)$ is open in $X$, so $g^{-1}(W)$ is open in $X/{\sim}$ by the definition of the quotient topology. For the second statement, $\bar f([x]) = f(x)$ is well defined because $f$ is constant on classes, and $\bar f\circ q = f$ is continuous, so $\bar f$ is continuous by the first part.
:::

Compare [[topology/continuous-maps#thm-product]]: a map *into* a product is continuous iff its components are; a map *out of* a quotient is continuous iff its composite with $q$ is. To recognise a quotient as a familiar space we combine this with compactness.

::: theorem Recognising quotients {#thm-recognise}
Let $X$ be compact, $Y$ Hausdorff and $f\colon X\to Y$ a continuous surjection. Define $x\sim x'$ if $f(x) = f(x')$. Then the induced map $\bar f\colon X/{\sim}\to Y$ is a homeomorphism.
:::

::: proof
By [[#thm-quotient-universal]], $\bar f$ is continuous; it is surjective because $f$ is, and injective because $\bar f([x]) = \bar f([x'])$ means $f(x) = f(x')$, i.e. $[x] = [x']$. The quotient $X/{\sim} = q(X)$ is compact, as the continuous image of a compact space ([[topology/compactness#thm-image]]). So $\bar f$ is a continuous bijection from a compact space to a Hausdorff space, hence a homeomorphism by [[topology/compactness#thm-compact-hausdorff]].
:::

::: example Two basic quotients {#ex-basic-quotients}
Show that (a) the interval $[0, 1]$ with its endpoints identified is homeomorphic to the circle $S^1$; (b) the closed disc $D^2$ with its boundary circle collapsed to a point is homeomorphic to the sphere $S^2$.
::: solution
(a) Let $f(t) = (\cos2\pi t, \sin2\pi t)$, a continuous surjection from the compact space $[0, 1]$ onto the Hausdorff space $S^1$. Two points have the same image exactly when they are equal or are the two endpoints $0, 1$. So the relation of [[#thm-recognise]] is "identify $0$ with $1$", and $[0, 1]/\set{0,1}\cong S^1$.

(b) For $x\in D^2$ with $r = \norm x$, define

$$
f(x) = \Big(\sin(\pi r)\,\frac{x}{r},\ \cos(\pi r)\Big)\ (x\neq0), \qquad f(0) = (0, 0, 1).
$$

This sends the circle of radius $r$ to the circle of latitude at angular distance $\pi r$ from the north pole $N = (0,0,1)$; it is continuous (at $0$ because $\norm{\sin(\pi r)\,x/r}\le\sin(\pi r)\to0$), lands in $S^2$ (since $\sin^2 + \cos^2 = 1$), and is surjective. It is injective on the open disc and sends the whole boundary circle $r = 1$ to the south pole $(0, 0, -1)$. By [[#thm-recognise]], $D^2/S^1\cong S^2$. In the same way $D^n/S^{n-1}\cong S^n$ for all $n$.
:::
:::

## Gluing polygons: the torus, Möbius band, Klein bottle and projective plane

Many important surfaces are quotients of the unit square $Q = [0, 1]^2$ in which points of the boundary are identified in pairs and interior points are left alone.

- The **cylinder**: $(0, y)\sim(1, y)$.
- The **torus** $T$: $(0, y)\sim(1, y)$ and $(x, 0)\sim(x, 1)$.
- The **Möbius band** $M$: $(0, y)\sim(1, 1 - y)$ — the left and right edges are glued with a half-twist.
- The **Klein bottle** $K$: $(0, y)\sim(1, y)$ and $(x, 0)\sim(1 - x, 1)$ — a cylinder whose end circles are glued with a reflection.
- The **real projective plane** $\R P^2$: $(0, y)\sim(1, 1 - y)$ and $(x, 0)\sim(1 - x, 1)$ — each boundary point is glued to the point symmetric to it through the centre of the square.

A convenient shorthand labels the edges of the square with letters and arrows, read around the boundary: the torus is $aba^{-1}b^{-1}$, the Klein bottle $aba^{-1}b$ and the projective plane $abab$, where an inverse means the edge is traversed against its arrow. These **polygon presentations** are the language of the classification of surfaces in [[topology/surfaces]].

::: example The torus is a product of circles {#ex-torus}
Prove that the square with opposite sides identified as above is homeomorphic to $S^1\times S^1$.
::: solution
Let $f\colon Q\to S^1\times S^1$, $f(x, y) = \big((\cos2\pi x, \sin2\pi x), (\cos2\pi y, \sin2\pi y)\big)$. It is continuous by [[topology/continuous-maps#thm-product]], surjective, and $Q$ is compact while $S^1\times S^1$ is Hausdorff ([[#thm-hausdorff-products]]). Now $f(x, y) = f(x', y')$ iff $x - x'\in\Z$ and $y - y'\in\Z$, which for points of $[0,1]^2$ means: $x' = x$ or $\set{x, x'} = \set{0, 1}$, and similarly for $y$. These are exactly the identifications defining the torus (including the four corners, which all become one point). By [[#thm-recognise]], $T\cong S^1\times S^1$, and by [[topology/continuous-maps#ex-product]] this is the doughnut surface in $\R^3$.
:::
:::

The Möbius band can be built in $\R^3$ by moving a short segment around a circle while rotating it by half a turn.

::: widget surface
fx: (1 + v*cos(u/2))*cos(u)
fy: (1 + v*cos(u/2))*sin(u)
fz: v*sin(u/2)
u: 0, 2pi
v: -0.4, 0.4
color: height
caption: The Möbius band: as $u$ goes once around the circle, the segment (parametrised by $v$) turns through half a revolution, so the segment at $u = 2\pi$ is the segment at $u = 0$ flipped: $(0, y)\sim(1, 1 - y)$. Rotate it and follow the edge with your eye — the band has a single boundary curve, and a single side.
:::

The Klein bottle and the projective plane cannot be embedded in $\R^3$ at all (a closed surface in $\R^3$ separates space into an inside and an outside, and these surfaces have only one side). They can be drawn with self-intersections. The "figure-eight" picture of the Klein bottle below passes through itself along a circle; in the abstract quotient space there is no intersection.

::: widget surface
fx: (2 + cos(u/2)*sin(v) - sin(u/2)*sin(2*v))*cos(u)
fy: (2 + cos(u/2)*sin(v) - sin(u/2)*sin(2*v))*sin(u)
fz: sin(u/2)*sin(v) + cos(u/2)*sin(2*v)
u: 0, 2pi
v: 0, 2pi
color: height
caption: An immersion of the Klein bottle in $\R^3$: a figure-eight cross-section is carried around a circle while rotating by half a turn, so that after one revolution the figure eight comes back reflected. The surface crosses itself, but the abstract Klein bottle, the quotient of the square by $aba^{-1}b$, does not; it lives without self-intersection in $\R^4$.
:::

The projective plane has several equally useful descriptions, all homeomorphic:

1. the square with boundary word $abab$ (or the closed disc with antipodal boundary points identified, $x\sim-x$ for $\norm x = 1$);
2. the sphere $S^2$ with antipodal points identified, $x\sim-x$;
3. the set of lines through the origin in $\R^3$, with lines close when their directions are close.

The equivalence of (2) and (3) is clear (each line meets the sphere in a pair of antipodal points). For (1) and (2): every antipodal pair on $S^2$ has a representative in the closed northern hemisphere, unique except on the equator, where both points of a pair lie; and the hemisphere is a disc. Projecting the hemisphere onto the disc and using [[#thm-recognise]] turns this into a proof ([[#exr-rp2]]).

::: application Periodic boundary conditions
Simulations in physics and chemistry often model a tiny piece of an infinite crystal or fluid by a box in which a particle leaving through one face re-enters through the opposite face. Mathematically the box has been replaced by the quotient $\R^3/\Z^3$, a three-dimensional torus, which has no boundary and no special points. The same identification appears in classic video games in which an object leaving the right side of the screen reappears on the left and one leaving the top reappears at the bottom: the screen is a torus. Conveyor belts are sometimes made as Möbius bands so that both "sides" wear evenly — there is only one side.
:::

## When quotients misbehave

Quotients of very nice spaces can be very badly behaved.

::: example The line with two origins {#ex-two-origins}
Let $X = \R\times\set{0, 1}$ (two disjoint copies of the line) and identify $(x, 0)\sim(x, 1)$ for every $x\neq0$. Show that every point of the quotient $L$ has a neighbourhood homeomorphic to an open interval, but $L$ is not Hausdorff.
::: solution
Let $0_a$ and $0_b$ be the classes of $(0,0)$ and $(0,1)$, the "two origins". For each copy $i\in\set{0,1}$ let $j_i\colon\R\to L$, $j_i(x) = q(x, i)$; it is continuous and injective. For an open set $W\subseteq\R$,

$$
q^{-1}\big(j_i(W)\big) = \big(W\times\set i\big)\cup\big((W\setminus\set0)\times\set{1 - i}\big),
$$

which is open in $X$; so $j_i(W)$ is open in $L$. Taking $W = \R$ shows that the image $L_i = j_i(\R)$ is open, and the general case shows that $j_i$ maps open sets to open sets. Hence $j_i$ is a homeomorphism of $\R$ onto the open set $L_i$, and every point of $L$ lies in $L_0$ or $L_1$. But any open sets $U\ni0_a$ and $V\ni0_b$ have preimages containing intervals $(-\eps,\eps)\times\set0$ and $(-\eps', \eps')\times\set1$, and the points $(\delta, 0)\sim(\delta, 1)$ with $0 < \delta < \min(\eps,\eps')$ give a common point of $U$ and $V$. So $0_a$ and $0_b$ cannot be separated; indeed the sequence $[(1/n, 0)]$ converges to both origins.
:::
:::

::: example An indiscrete quotient {#ex-r-mod-q}
Let $x\sim y$ on $\R$ if $x - y\in\Q$. Show that the quotient topology on $\R/\Q$ is indiscrete.
::: solution
Let $U\subseteq\R/\Q$ be open and non-empty. Then $W = q^{-1}(U)$ is a non-empty open subset of $\R$ that is saturated: if $x\in W$ then $x + r\in W$ for every rational $r$. $W$ contains an interval $(a, b)$, and hence all its translates $(a + r, b + r)$, $r\in\Q$. Every real number lies in one of these translates (choose a rational $r$ with $x - b < r < x - a$), so $W = \R$ and $U$ is everything. The only open sets are $\emptyset$ and the whole quotient, although the quotient has uncountably many points.
:::
:::

::: warning Quotient maps are not always open, and quotients need not be Hausdorff
It is tempting to assume that the image of an open set under a quotient map is open; often it is not. In $[0,1]\to[0,1]/\set{0,1}\cong S^1$, the open set $[0, \frac12)$ of $[0,1]$ maps to a half-open arc, which is not open in the circle, because its preimage $[0,\frac12)\cup\set1$ is not open. Always test openness in the quotient by taking *preimages* of saturated sets. And never assume a quotient is Hausdorff: a quotient $X/{\sim}$ can only be Hausdorff if the classes are closed in $X$, and even closed classes are not enough, as the line with two origins shows. [[#thm-recognise]] is the safest route: exhibit a continuous surjection from a compact space onto a known Hausdorff space.
:::

::: quiz
Collapse a subset $A\subseteq\R$ to a point. For which $A$ is $\R/A$ Hausdorff?
- [x] $A = [0, 1]$
- [ ] $A = (0, 1)$
- [ ] $A = \Q$
- [x] $A = \set{0}$
::: solution
If $A$ is not closed, the point $[A]$ is not closed in the quotient (its preimage $A$ is not closed), so the quotient is not even $T_1$: this rules out $(0,1)$ and $\Q$. For $A = \set0$ nothing is identified. For $A = [0,1]$, the map $f(x) = x$ for $x\le0$, $0$ for $0\le x\le1$, $x - 1$ for $x\ge1$ is continuous by the pasting lemma, surjective, and identifies exactly the points of $[0,1]$; one checks that the induced map $\R/[0,1]\to\R$ has continuous inverse $y\mapsto q(y)$ for $y\le0$ and $q(y + 1)$ for $y\ge0$. So $\R/[0,1]\cong\R$, which is Hausdorff.
:::
:::

::: history
The Möbius band was discovered independently by August Ferdinand Möbius and Johann Benedict Listing in 1858; Felix Klein described his one-sided closed surface in 1882. The projective plane comes from projective geometry, where it was the setting for the work of Girard Desargues in the seventeenth century and Jean-Victor Poncelet in the nineteenth. Hausdorff included his separation axiom in the definition of a topological space in 1914. The finer hierarchy of separation axioms was organised by Heinrich Tietze in 1923, and Pavel Urysohn's lemma on continuous functions separating closed sets in normal spaces appeared in 1925. Identification spaces were studied systematically from the 1920s, notably by Robert Lee Moore in his work on decompositions of the plane.
:::

## Where this leads

Quotients are the main source of examples in the rest of the course. In [[topology/fundamental-group]] we compute the fundamental group of the circle, viewed as the quotient $\R/\Z$, and state those of the torus and the projective plane. In [[topology/surfaces]] every closed surface is presented as a polygon with edges identified in pairs, and the classification theorem says that the sphere, the tori and the projective planes and their connected sums are the only possibilities. Quotients by group actions — orbit spaces such as $\R^n/\Z^n$ and $S^n/\set{\pm1}$ — are central in geometry and connect topology with [[abstract-algebra/group-actions]].

::: summary
- $T_1$: points are closed; Hausdorff: distinct points have disjoint neighbourhoods; regular and normal spaces separate points and closed sets. Metric spaces satisfy all of these; the cofinite topology is $T_1$ but not Hausdorff.
- In Hausdorff spaces limits of sequences are unique; subspaces and products of Hausdorff spaces are Hausdorff; $X$ is Hausdorff iff the diagonal is closed in $X\times X$.
- The quotient topology on $X/{\sim}$ makes $U$ open iff $q^{-1}(U)$ is open; open sets of the quotient correspond to saturated open sets of $X$.
- Universal property: $g\colon X/{\sim}\to Z$ is continuous iff $g\circ q$ is; continuous maps constant on classes descend to the quotient.
- A continuous surjection from a compact space onto a Hausdorff space identifies the quotient by "same image" with the target ([[#thm-recognise]]): $[0,1]/\set{0,1}\cong S^1$, $D^2/S^1\cong S^2$, square$/aba^{-1}b^{-1}\cong S^1\times S^1$.
- The Möbius band, Klein bottle and projective plane are quotients of the square; quotients can fail to be Hausdorff (line with two origins) or be indiscrete ($\R/\Q$).
:::

## Exercises

::: exercise Sierpiński space again {level=1}
Show that Sierpiński space is not $T_1$ and that every finite $T_1$ space is discrete. Deduce that every finite Hausdorff space is discrete.
::: solution
In Sierpiński space the singleton $\set0$ is closed (its complement $\set1$ is open), but $\set1$ is not closed, since its complement $\set0$ is not open. So not every singleton is closed, and by [[#prop-t1]] the space is not $T_1$. In a finite $T_1$ space every subset is a finite union of closed singletons, hence closed; so every subset is also open (its complement is closed): the topology is discrete. A finite Hausdorff space is $T_1$, hence discrete by the same argument.
:::
:::

::: exercise Corners of the square {level=1 check="4"}
In the identification of the square that produces the torus, how many points of the square are identified with the corner $(0, 0)$ (including the corner itself)?
::: solution
$(0,0)\sim(1,0)$ (left–right gluing), $(0,0)\sim(0,1)$ (top–bottom gluing) and therefore also $\sim(1,1)$: all $4$ corners become one point of the torus. For comparison, the centre of an edge, such as $(\frac12, 0)$, is identified only with $(\frac12, 1)$ — a class of $2$ points — and interior points form classes of $1$.
:::
:::

::: exercise Folding the line {level=1}
Let $x\sim y$ on $\R$ if $y = \pm x$. Prove that $\R/{\sim}$ is homeomorphic to $[0, \infty)$.
::: solution
$f(x) = \abs x$ is a continuous surjection $\R\to[0,\infty)$ that identifies exactly $x$ and $-x$, so by [[#thm-quotient-universal]] it induces a continuous bijection $\bar f\colon\R/{\sim}\to[0,\infty)$. Its inverse is $g(t) = q(t)$ for $t\ge0$, the composite of the inclusion $[0,\infty)\to\R$ and $q$, which is continuous. So $\bar f$ is a homeomorphism. ([[#thm-recognise]] does not apply directly because $\R$ is not compact; here the inverse is easy to write down.)
:::
:::

::: exercise Where continuous maps agree {level=2}
Let $f, g\colon X\to Y$ be continuous with $Y$ Hausdorff. Prove that $E = \set{x : f(x) = g(x)}$ is closed. Deduce that if $f$ and $g$ agree on a dense subset of $X$, then $f = g$. Show that the Hausdorff hypothesis is needed.
::: solution
$E$ is the preimage of the diagonal $\Delta\subseteq Y\times Y$ under the continuous map $x\mapsto(f(x), g(x))$, and $\Delta$ is closed by [[#thm-hausdorff-products]]; so $E$ is closed. If $E$ contains a dense set $D$, then $E\supseteq\overline D = X$. Without the Hausdorff property: let $Y = \set{0,1}$ be indiscrete, $X = \R$, $f\equiv0$ and $g$ the indicator function of $\R\setminus\Q$. Both are continuous (every map into an indiscrete space is), they agree on the dense set $\Q$, but $f\neq g$.
:::
:::

::: exercise The circle as a quotient of the line {level=2}
Let $x\sim y$ on $\R$ if $x - y\in\Z$. Prove that $\R/\Z\cong S^1$.
::: solution
$p(t) = (\cos2\pi t, \sin2\pi t)$ is continuous and constant on classes, so it induces a continuous map $\bar p\colon\R/\Z\to S^1$, which is a bijection because $p(t) = p(t')$ iff $t - t'\in\Z$. The quotient $\R/\Z$ is compact: every class has a representative in $[0, 1]$, so $\R/\Z = q([0,1])$ is a continuous image of a compact set. $S^1$ is Hausdorff. By [[topology/compactness#thm-compact-hausdorff]], $\bar p$ is a homeomorphism.
:::
:::

::: exercise A cone is a disc {level=2}
The **cone** on a space $X$ is $CX = (X\times[0,1])/(X\times\set1)$. Prove that the cone on $S^1$ is homeomorphic to the closed disc $D^2$.
::: solution
Define $f\colon S^1\times[0,1]\to D^2$ by $f(z, t) = (1 - t)z$. It is continuous, surjective (every $w\neq0$ is $f(w/\norm w, 1 - \norm w)$, and $0 = f(z, 1)$), and $f(z, t) = f(z', t')$ iff $(z,t) = (z',t')$ or $t = t' = 1$ — exactly the identification defining the cone. $S^1\times[0,1]$ is compact and $D^2$ is Hausdorff, so [[#thm-recognise]] gives $CS^1\cong D^2$.
:::
:::

::: exercise Collapsing a closed set {level=3}
Let $X$ be a compact Hausdorff space and $A\subseteq X$ a non-empty closed subset. Prove that $X/A$ is Hausdorff.
::: hint
Two kinds of pairs of points must be separated: two points not in $A$, and a point not in $A$ from the point $[A]$. Use the exercise on separating compact sets in [[topology/compactness]].
:::
::: solution
Open sets of $X/A$ correspond to open sets of $X$ that either contain $A$ or are disjoint from $A$ (these are the saturated open sets). *Two points $x, y\notin A$.* Choose disjoint open $U\ni x$, $V\ni y$ in $X$. Then $U\setminus A$ and $V\setminus A$ are open (as $A$ is closed), disjoint, disjoint from $A$, hence saturated; their images are disjoint open neighbourhoods of $[x]$ and $[y]$. *A point $x\notin A$ and the point $[A]$.* The sets $\set x$ and $A$ are disjoint and compact ($A$ is closed in a compact space), so there are disjoint open sets $U\ni x$ and $V\supseteq A$ (separation of compact sets in Hausdorff spaces, from the exercises of [[topology/compactness]]). $U$ is disjoint from $V\supseteq A$, so saturated, and $V$ contains $A$, so saturated. Their images separate $[x]$ and $[A]$.
:::
:::

::: exercise The projective plane, two ways {#exr-rp2 level=3}
Prove that the sphere $S^2$ with antipodal points identified is homeomorphic to the closed disc $D^2$ with antipodal points of its boundary identified.
::: solution
Let $D' = D^2/{\sim}$ with $x\sim-x$ for $\norm x = 1$, and let $q\colon D^2\to D'$ be the quotient map. Define $h\colon D^2\to S^2/\set{\pm1}$ by $h(x) = \big[\big(x, \sqrt{1 - \norm x^2}\big)\big]$: lift $x$ to the closed northern hemisphere and take its antipodal class. $h$ is continuous (a composite of continuous maps), and surjective because every antipodal pair has a point with $x_3\ge0$. Two points $x\neq x'$ of $D^2$ have the same image iff their lifts are antipodal, which (both having $x_3\ge0$) happens iff $x_3 = 0$ for both, i.e. $\norm x = \norm{x'} = 1$, and $x' = -x$. So $h$ identifies exactly the points identified in $D'$, and induces a continuous bijection $\bar h\colon D'\to S^2/\set{\pm1}$. The source $D'$ is compact. The target is Hausdorff: two distinct classes $\set{\pm u}$, $\set{\pm v}$ are separated by the images of small balls $B(\pm u, r)\cap S^2$ and $B(\pm v, r)\cap S^2$ with $r$ less than half the distance between the sets $\set{\pm u}$ and $\set{\pm v}$ — these unions are saturated, open and disjoint. By [[topology/compactness#thm-compact-hausdorff]], $\bar h$ is a homeomorphism.
:::
:::
