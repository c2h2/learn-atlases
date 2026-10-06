In [[real-analysis/metric-spaces]] you met a remarkable fact: a map $f$ between metric spaces is continuous if and only if the preimage of every open set is open. The ε–δ definition, with all its distances, can be replaced by a statement that mentions only open sets. The same is true of convergence ($x_n\to x$ means that every open set containing $x$ contains all but finitely many terms), of closed sets, of closures and of boundaries. Distances are needed to *produce* the open sets, but after that they play no further role.

A second observation points the same way. On the plane we can measure distance in many ways — the Euclidean distance $d_2$, the "taxicab" distance $d_1(x, y) = \abs{x_1 - y_1} + \abs{x_2 - y_2}$, or the maximum distance $d_\infty(x, y) = \max(\abs{x_1 - y_1}, \abs{x_2 - y_2})$. These metrics disagree about almost every distance, yet they produce exactly the same open sets, and therefore the same continuous functions and the same convergent sequences. Whatever they have in common is the *real* structure for questions of continuity.

Topology takes this lesson seriously. A **topological space** is a set together with a chosen collection of subsets called open sets, subject to three simple axioms; no distances are mentioned at all. In this chapter we give the definition and a stock of examples — some familiar, some strange — learn to describe topologies efficiently by **bases**, and develop the vocabulary of closed sets, closures, interiors, boundaries and limit points. Along the way we will see that some intuitions from metric spaces survive and others fail, which is the main thing to learn in a first encounter with topology.

## Topologies

What properties of the open sets of a metric space should we keep as axioms? In a metric space, a union of any number of open sets is open, and so is the intersection of two (hence of finitely many) open sets, but not necessarily of infinitely many: in $\R$,

$$
\bigcap_{n=1}^\infty\Big(-\frac1n, \frac1n\Big) = \set{0},
$$

which is not open. Together with the trivial facts that $\emptyset$ and the whole space are open, these are the axioms.

::: definition Topology {#def-topology}
A **topology** on a set $X$ is a collection $\tau$ of subsets of $X$ such that

1. $\emptyset\in\tau$ and $X\in\tau$;
2. the union of any collection of sets in $\tau$ is in $\tau$;
3. the intersection of any two (hence of any finitely many) sets in $\tau$ is in $\tau$.

The pair $(X, \tau)$ is a **topological space**, and the members of $\tau$ are its **open sets**. An **open neighbourhood** of a point $x$ is an open set containing $x$.
:::

When the topology is clear from the context we simply speak of "the space $X$". The same set can carry many topologies, and choosing one is a genuine decision.

::: example A first catalogue of topologies {#ex-catalogue}
Check that each of the following is a topology.

1. The **discrete topology** on any set $X$: every subset is open.
2. The **indiscrete** (or trivial) **topology**: only $\emptyset$ and $X$ are open.
3. The **cofinite topology** on an infinite set $X$: a set $U$ is open if $U = \emptyset$ or $X\setminus U$ is finite.
4. **Sierpiński space**: $X = \set{0, 1}$ with $\tau = \set{\emptyset, \set1, \set{0,1}}$.
::: solution
(1) and (2): the power set of $X$ and the collection $\set{\emptyset, X}$ are clearly closed under unions and finite intersections.

(3) $\emptyset$ is open by definition, and $X$ is open because $X\setminus X = \emptyset$ is finite. If $U_\alpha$ ($\alpha\in A$) are open, either all are empty (and so is their union) or some $U_\beta\neq\emptyset$; then by De Morgan's law

$$
X\setminus\bigcup_\alpha U_\alpha = \bigcap_\alpha(X\setminus U_\alpha)\subseteq X\setminus U_\beta,
$$

which is finite, so the union is open. If $U$ and $V$ are open and non-empty, $X\setminus(U\cap V) = (X\setminus U)\cup(X\setminus V)$ is a union of two finite sets, hence finite; and if one of them is empty, so is $U\cap V$. So $U\cap V$ is open.

(4) There are only three sets, and every union and intersection of them is again one of them: for instance $\set1\cup\set{0,1} = \set{0,1}$ and $\set1\cap\set{0,1} = \set1$.
:::
:::

The most important example is the one that motivated the definition.

::: proposition The metric topology {#prop-metric}
Let $(X, d)$ be a metric space, and call $U\subseteq X$ open if for every $x\in U$ there is $r > 0$ with $B(x, r) = \set{y : d(x, y) < r}\subseteq U$. These open sets form a topology, the **metric topology**, and every open ball is open.
:::

::: proof
$\emptyset$ is open vacuously, and $X$ is open because every ball lies in $X$. If $x\in\bigcup_\alpha U_\alpha$, then $x\in U_\beta$ for some $\beta$, and a ball around $x$ inside $U_\beta$ also lies in the union. If $x\in U\cap V$, choose $r_1, r_2$ with $B(x, r_1)\subseteq U$ and $B(x, r_2)\subseteq V$; then $B(x, \min(r_1, r_2))\subseteq U\cap V$. Finally, if $y\in B(x, r)$, put $s = r - d(x, y) > 0$; for $z\in B(y, s)$ the triangle inequality gives $d(x, z) \le d(x, y) + d(y, z) < d(x, y) + s = r$, so $B(y, s)\subseteq B(x, r)$ and the ball is open.
:::

A topological space whose topology comes from some metric in this way is called **metrisable**. Different metrics may give the same topology; they are then called **topologically equivalent**. This happens, for example, whenever there are constants $c, C > 0$ with $c\,d(x, y)\le d'(x, y)\le C\,d(x, y)$, because then every $d$-ball around $x$ contains a $d'$-ball around $x$ and vice versa. On $\R^2$ one has $d_\infty\le d_2\le d_1\le 2d_\infty$, so the three metrics of the introduction all give the **standard topology** of $\R^2$.

::: widget metricballs
metrics: 1; 2; inf
radius: 1
caption: Unit balls of the taxicab metric $d_1$ (a diamond), the Euclidean metric $d_2$ (a disc) and the maximum metric $d_\infty$ (a square). Each ball contains a scaled-down copy of the others centred at the same point, so a set that contains a small ball of one kind around each of its points also contains small balls of the other kinds: the three metrics have the same open sets. Change the radius and the centre to convince yourself that this nesting never fails.
:::

The discrete topology is metrisable — use the **discrete metric** $d(x, y) = 1$ for $x\neq y$, for which $B(x, 1) = \set x$ is open. The indiscrete topology on a set with at least two points is not metrisable: in a metric space, two distinct points $x\neq y$ have the disjoint open neighbourhoods $B(x, r)$ and $B(y, r)$ with $r = d(x, y)/2$, while in the indiscrete topology the only non-empty open set is $X$. We will return to this **Hausdorff property** in [[topology/quotient-spaces]].

Two topologies on the same set can be compared. If $\tau_1\subseteq\tau_2$, we say $\tau_2$ is **finer** (it has more open sets) and $\tau_1$ is **coarser**. The discrete topology is the finest of all and the indiscrete topology the coarsest; on $\R$ the cofinite topology is coarser than the standard one, since a set with finite complement is a union of open intervals. Some topologies cannot be compared at all.

::: quiz
Let $X = \set{a, b, c}$. Which of these collections is a topology on $X$?
- [ ] $\set{\emptyset, \set a, \set b, X}$
- [x] $\set{\emptyset, \set a, \set{a, b}, X}$
- [ ] $\set{\emptyset, \set{a, b}, \set{b, c}, X}$
- [ ] $\set{\set a, \set{a, b}, X}$
::: solution
The second collection contains $\emptyset$ and $X$, and every union and intersection of its members is again a member (the sets form a chain). The first fails because $\set a\cup\set b = \set{a, b}$ is missing; the third because $\set{a,b}\cap\set{b,c} = \set b$ is missing; the fourth because $\emptyset$ is missing.
:::
:::

## Bases

Listing all open sets is rarely practical; for $\R$ we describe the topology by saying that open intervals are open and that open sets are the unions of open intervals. The general version of this idea is a basis.

::: definition Basis {#def-basis}
A **basis** on a set $X$ is a collection $\mathcal B$ of subsets of $X$ (the **basis elements**) such that

1. every $x\in X$ lies in at least one basis element;
2. if $x\in B_1\cap B_2$ with $B_1, B_2\in\mathcal B$, then there is $B_3\in\mathcal B$ with $x\in B_3\subseteq B_1\cap B_2$.

The **topology generated by $\mathcal B$** consists of the sets $U\subseteq X$ such that for every $x\in U$ there is $B\in\mathcal B$ with $x\in B\subseteq U$.
:::

::: theorem The topology generated by a basis {#thm-basis}
If $\mathcal B$ is a basis on $X$, the collection $\tau$ it generates is a topology on $X$, and $\tau$ consists exactly of the unions of subcollections of $\mathcal B$ (the empty union giving $\emptyset$).
:::

::: proof
*$\tau$ is a topology.* $\emptyset\in\tau$ vacuously, and $X\in\tau$ by condition (1). If $U_\alpha\in\tau$ for all $\alpha$ and $x\in\bigcup U_\alpha$, then $x\in U_\beta$ for some $\beta$, so there is a basis element $B$ with $x\in B\subseteq U_\beta\subseteq\bigcup U_\alpha$; hence the union is in $\tau$. If $U, V\in\tau$ and $x\in U\cap V$, choose $B_1, B_2\in\mathcal B$ with $x\in B_1\subseteq U$ and $x\in B_2\subseteq V$; condition (2) gives $B_3\in\mathcal B$ with $x\in B_3\subseteq B_1\cap B_2\subseteq U\cap V$. So $U\cap V\in\tau$.

*Description.* Each basis element $B$ is in $\tau$ (for $x\in B$ take $B$ itself), so by the union axiom every union of basis elements is in $\tau$. Conversely, if $U\in\tau$, choose for each $x\in U$ a basis element $B_x$ with $x\in B_x\subseteq U$; then $U = \bigcup_{x\in U}B_x$.
:::

::: example Bases on the line and the plane {#ex-bases}
(a) The open intervals $(a, b)$ form a basis generating the standard topology of $\R$; so do the open intervals with *rational* endpoints. (b) The open balls of a metric space form a basis for the metric topology; so do the open rectangles $(a, b)\times(c, d)$ for the standard topology of $\R^2$. (c) The half-open intervals $[a, b)$ form a basis on $\R$; the topology they generate is the **lower limit topology**, and $\R$ with this topology is denoted $\R_\ell$ (the **Sorgenfrey line**). Show that $\R_\ell$ is strictly finer than the standard topology.
::: solution
(a) The intersection of two open intervals is an open interval or empty, so condition (2) holds with $B_3 = B_1\cap B_2$; the topology generated is the standard one by the very definition of open sets in $\R$ as a metric space. For rational endpoints: if $x\in(a, b)$, choose rationals $p, q$ with $a < p < x < q < b$; then $x\in(p, q)\subseteq(a, b)$, so every open set is still a union of such intervals.

(b) If $x\in B(y_1, r_1)\cap B(y_2, r_2)$, the proof of [[#prop-metric]] shows that a small ball around $x$ lies in both balls. For rectangles, intersections of open rectangles are open rectangles, and every open disc around $x$ contains an open square around $x$ and vice versa.

(c) $[a, b)\cap[c, d) = [\max(a, c), \min(b, d))$ is again of this form or empty, so we have a basis. Every open interval is open in $\R_\ell$, because $(a, b) = \bigcup_{n}[a + \frac1n, b)$ (union over $n$ with $a + \frac1n < b$). Hence every standard open set, a union of open intervals, is open in $\R_\ell$: the lower limit topology is finer. It is strictly finer because $[0, 1)$ is open in $\R_\ell$ but not in the standard topology — no open interval around $0$ fits inside $[0,1)$.
:::
:::

The countable basis in (a) is worth noticing: a space with a countable basis is called **second countable**, and this property will be useful later. The Sorgenfrey line, by contrast, has no countable basis ([[#exr-sorgenfrey]]) — one of many ways in which it is a valuable source of counterexamples.

## Closed sets, closure and interior

::: definition Closed sets {#def-closed}
A subset $C$ of a topological space $X$ is **closed** if its complement $X\setminus C$ is open.
:::

By De Morgan's laws, $X\setminus\bigcup_\alpha U_\alpha = \bigcap_\alpha(X\setminus U_\alpha)$ and $X\setminus(U\cap V) = (X\setminus U)\cup(X\setminus V)$, so the axioms for open sets translate into axioms for closed sets.

::: proposition Properties of closed sets {#prop-closed}
In any topological space $X$: $\emptyset$ and $X$ are closed; the intersection of any collection of closed sets is closed; and the union of finitely many closed sets is closed.
:::

::: proof
$X\setminus\emptyset = X$ and $X\setminus X = \emptyset$ are open. If the $C_\alpha$ are closed, $X\setminus\bigcap C_\alpha = \bigcup(X\setminus C_\alpha)$ is a union of open sets, hence open. If $C, D$ are closed, $X\setminus(C\cup D) = (X\setminus C)\cap(X\setminus D)$ is an intersection of two open sets, hence open; induction handles finitely many.
:::

::: widget venn
sets: 2
expr: (A | B)'
labels: A; B
caption: The complement of $A\cup B$ is shaded. Type `A' & B'` to check that it is the same region: $(A\cup B)' = A'\cap B'$. De Morgan's laws exchange unions and intersections when we pass to complements, which is exactly why closed sets are stable under *arbitrary intersections* and *finite unions* while open sets are stable under arbitrary unions and finite intersections.
:::

"Closed" is not the opposite of "open". In $\R$, the interval $[0,1)$ is neither open nor closed, while $\emptyset$ and $\R$ are both; in a discrete space every set is both. Sets that are both open and closed — **clopen** sets — will be the subject of [[topology/connectedness]].

::: definition Interior, closure, boundary {#def-closure}
Let $A$ be a subset of a topological space $X$.

1. The **interior** $\operatorname{int}A$ is the union of all open sets contained in $A$ — the largest open subset of $A$.
2. The **closure** $\overline A$ is the intersection of all closed sets containing $A$ — the smallest closed set containing $A$.
3. The **boundary** is $\partial A = \overline A\setminus\operatorname{int}A$.
4. $A$ is **dense** in $X$ if $\overline A = X$.
:::

By the axioms, $\operatorname{int}A$ is open and $\overline A$ is closed; $A$ is open if and only if $A = \operatorname{int}A$, and closed if and only if $A = \overline A$. In practice closures are computed with the following criterion.

::: theorem Points of the closure {#thm-closure}
Let $A\subseteq X$ and $x\in X$. Then $x\in\overline A$ if and only if every open set containing $x$ intersects $A$. If $\mathcal B$ is a basis for the topology, it suffices to check the basis elements containing $x$.
:::

::: proof
We prove the equivalent statement: $x\notin\overline A$ if and only if some open set containing $x$ misses $A$. If $x\notin\overline A$, then $U = X\setminus\overline A$ is open, contains $x$, and does not meet $A\subseteq\overline A$. Conversely, if $U$ is open, $x\in U$ and $U\cap A = \emptyset$, then $X\setminus U$ is a closed set containing $A$, so $\overline A\subseteq X\setminus U$, and $x\notin\overline A$. For the statement about a basis: every open set containing $x$ contains a basis element containing $x$, so if all such basis elements meet $A$, so do all open sets containing $x$; the converse is clear because basis elements are open.
:::

::: definition Limit point {#def-limit-point}
A point $x\in X$ is a **limit point** (or accumulation point) of $A$ if every open set containing $x$ meets $A$ in a point *other than $x$*. The set of limit points of $A$ is written $A'$.
:::

::: theorem Closure and limit points {#thm-closure-limit}
For every $A\subseteq X$, $\overline A = A\cup A'$. Consequently $A$ is closed if and only if it contains all its limit points.
:::

::: proof
By [[#thm-closure]], every limit point of $A$ lies in $\overline A$, and $A\subseteq\overline A$; so $A\cup A'\subseteq\overline A$. Conversely, let $x\in\overline A$ with $x\notin A$. Every open set $U$ containing $x$ meets $A$ by [[#thm-closure]], and the points of $U\cap A$ are different from $x$ because $x\notin A$; so $x\in A'$. Hence $\overline A\subseteq A\cup A'$. Finally, $A$ is closed iff $A = \overline A = A\cup A'$ iff $A'\subseteq A$.
:::

::: example Computing closures in three topologies {#ex-closures}
(a) In $\R$ (standard topology), let $A = (0, 1]\cup\set2$. Find $\operatorname{int}A$, $\overline A$, $\partial A$ and $A'$. Do the same for $\Q$. (b) In $\R_\ell$, find the closure of $(0, 1)$. (c) In the cofinite topology on $\R$, find the closure of an infinite set.
::: solution
(a) Every point of $(0, 1)$ has an interval around it inside $A$, while every interval around $1$ or $2$ contains points outside $A$; so $\operatorname{int}A = (0, 1)$. By [[#thm-closure]], $0\in\overline A$ (every interval around $0$ meets $(0,1]$), while points outside $[0, 1]\cup\set2$ have intervals around them missing $A$; so $\overline A = [0,1]\cup\set2$ and $\partial A = \set{0, 1, 2}$. The limit points are $A' = [0, 1]$: the isolated point $2$ belongs to $A$ but is not a limit point, since $(1.5, 2.5)$ meets $A$ only in $2$. For $\Q$: every open interval contains rationals and irrationals, so $\overline\Q = \R$ ($\Q$ is dense), $\operatorname{int}\Q = \emptyset$ and $\partial\Q = \R$; and since every interval around a real number $x$ contains rationals other than $x$, $\Q' = \R$.

(b) Use the basis of half-open intervals. A point $x < 0$ has $[x, 0)$ missing $(0,1)$; a point $x\ge1$ has $[x, x + 1)$ missing $(0,1)$; but every $[0, b)$ meets $(0, 1)$. So the closure of $(0, 1)$ in $\R_\ell$ is $[0, 1)$, not $[0, 1]$: the point $1$ can be "approached from the left" only, and the topology of $\R_\ell$ only sees approach from the right.

(c) Let $A\subseteq\R$ be infinite. A non-empty open set $U$ has finite complement, so it cannot miss the infinite set $A$. By [[#thm-closure]] every point is in $\overline A$: $\overline A = \R$. The closed sets of the cofinite topology are just the finite sets and $\R$ itself.
:::
:::

::: quiz
In the Sorgenfrey line $\R_\ell$, what is the closure of $[0, 1)$?
- [ ] $[0, 1]$
- [x] $[0, 1)$
- [ ] $(0, 1)$
- [ ] $\R$
::: solution
$[0,1)$ is closed in $\R_\ell$: its complement $(-\infty, 0)\cup[1,\infty)$ is a union of basis sets $[a, b)$ — for instance $(-\infty,0) = \bigcup_n[-n, 0)$ and $[1,\infty) = \bigcup_n[1, n)$. So the closure is the set itself. In particular $[0, 1)$ is clopen in $\R_\ell$, which already shows how different the Sorgenfrey line is from the real line.
:::
:::

::: warning The closure of a ball is not always the closed ball
In $\R^n$ the closure of the open ball $B(x, r)$ is the closed ball $\set{y : d(x, y)\le r}$, and it is tempting to believe this in every metric space. It fails for the discrete metric: $B(x, 1) = \set x$ is already closed, so its closure is $\set x$, while the "closed ball" $\set{y : d(x, y)\le1}$ is the whole space. What is always true is that $\overline{B(x,r)}\subseteq\set{y : d(x, y)\le r}$, because the right-hand side is closed. More generally, intuitions about closures drawn from pictures of $\R^2$ must be checked against the definitions.
:::

## Convergence without a metric

::: definition Convergent sequence {#def-convergence}
A sequence $(x_n)$ in a topological space $X$ **converges** to $x\in X$ if for every open set $U$ containing $x$ there is $N$ such that $x_n\in U$ for all $n\ge N$.
:::

In a metric space this is the familiar definition, since it suffices to test the balls $B(x, \eps)$. In general spaces, however, sequences behave strangely.

::: example Sequences with many limits {#ex-many-limits}
(a) In an indiscrete space, every sequence converges to every point. (b) In the cofinite topology on $\R$, the sequence $x_n = n$ converges to every real number.
::: solution
(a) The only open set containing a given point $x$ is $X$, which contains every term. (b) Let $x\in\R$ and let $U$ be an open set containing $x$. Then $\R\setminus U$ is finite, so it contains only finitely many of the integers $1, 2, 3, \dots$, and all $x_n = n$ beyond the largest of them lie in $U$. Hence $x_n\to x$, for every $x$.
:::
:::

Limits are unique in metric spaces because distinct points have disjoint neighbourhoods; the cofinite topology on an infinite set has no disjoint non-empty open sets at all. This is the separation property studied in [[topology/quotient-spaces]]. A second warning: in metric spaces, $x\in\overline A$ exactly when some sequence in $A$ converges to $x$, but in general topological spaces sequences are not enough to detect closures (see [[#exr-cocountable]]). In metric spaces, and more generally in spaces in which each point has a countable collection of neighbourhoods that suffices for testing, sequences do detect closures.

::: application The Zariski topology
Topologies far from metric ones are central in algebraic geometry. On $\C^n$, declare a set closed if it is the set of common zeros of some collection of polynomials. These closed sets satisfy [[#prop-closed]] (the zero set of a product $pq$ is the union of the zero sets, and the zero set of a collection of polynomials is the intersection of their zero sets), so their complements form a topology, the **Zariski topology**. On $\C$ a non-zero polynomial has finitely many zeros, so the Zariski topology on $\C$ is exactly the cofinite topology. Although very coarse, this topology carries just the right information for studying solutions of polynomial equations; see [[abstract-algebra/polynomials]] for the algebra behind it.
:::

::: history
The idea of an abstract space with a notion of nearness grew out of analysis around 1900. Maurice Fréchet introduced metric spaces in his thesis of 1906, and Frigyes Riesz studied abstract spaces defined by limit points in 1907–1909. Felix Hausdorff's *Grundzüge der Mengenlehre* (1914) gave the first general definition of a topological space, using axioms for neighbourhoods that included the separation property now named after him. Kazimierz Kuratowski characterised topologies by the properties of the closure operation in 1922. The axioms for open sets used today, which drop Hausdorff's separation axiom, became standard in the 1920s and 1930s, notably through the work of Pavel Alexandrov and later the Bourbaki group.
:::

## Where this leads

With open sets as the basic notion we can now define continuity for maps between arbitrary topological spaces and build new spaces from old as subspaces and products ([[topology/continuous-maps]]). The open and closed sets of this chapter are the raw material of the two great properties of [[topology/connectedness]] and [[topology/compactness]]; the strange behaviour of sequences in non-Hausdorff spaces motivates the separation axioms of [[topology/quotient-spaces]]; and the Sorgenfrey line and the cofinite topology will reappear as counterexamples throughout. The σ-algebras of measure theory ([[measure-theory/sigma-algebras]]) are axiomatised in the same spirit (with complements and countable unions in place of arbitrary unions and finite intersections), and [[real-analysis/metric-spaces]] becomes a special case.

::: summary
- A topology on $X$ is a collection of subsets containing $\emptyset$ and $X$ and closed under arbitrary unions and finite intersections ([[#def-topology]]); its members are the open sets.
- Every metric gives a topology; topologically equivalent metrics (such as $d_1, d_2, d_\infty$ on $\R^2$) give the same one. The discrete, indiscrete, cofinite and lower limit topologies and Sierpiński space are standard examples.
- A basis generates a topology whose open sets are the unions of basis elements ([[#thm-basis]]); open intervals generate the topology of $\R$, half-open intervals $[a,b)$ the finer Sorgenfrey topology.
- Closed sets are complements of open sets: closed under arbitrary intersections and finite unions. "Closed" is not the opposite of "open".
- $x\in\overline A$ if and only if every open set (or basis element) containing $x$ meets $A$; $\overline A = A\cup A'$, so a set is closed iff it contains its limit points.
- In general spaces sequences can converge to many points, and do not always detect closures; the Hausdorff separation property restores unique limits, and in metric spaces sequences do detect closures.
:::

## Exercises

::: exercise Topologies on two points {level=1 check="4"}
How many different topologies are there on the set $X = \set{a, b}$? List them.
::: solution
Every topology contains $\emptyset$ and $X$, and may or may not contain each of $\set a$ and $\set b$. All four choices satisfy the axioms (the union of $\set a$ and $\set b$ is $X$, their intersection is $\emptyset$): the indiscrete topology $\set{\emptyset, X}$, the two Sierpiński topologies $\set{\emptyset, \set a, X}$ and $\set{\emptyset,\set b, X}$, and the discrete topology. So there are $4$.
:::
:::

::: exercise Is it a topology? {level=1}
On $X = \set{1, 2, 3, 4}$, decide whether $\tau_1 = \set{\emptyset, \set1, \set{2, 3}, \set{1, 2, 3}, X}$ and $\tau_2 = \set{\emptyset, \set1, \set2, \set{1, 3}, X}$ are topologies.
::: solution
$\tau_1$ is a topology: $\set1\cup\set{2,3} = \set{1,2,3}\in\tau_1$, $\set1\cap\set{2,3} = \emptyset$, and all other unions and intersections involve $\emptyset$, $X$ or nested sets. $\tau_2$ is not: $\set1\cup\set2 = \set{1,2}\notin\tau_2$ (also $\set2\cup\set{1,3} = \set{1,2,3}\notin\tau_2$).
:::
:::

::: exercise Counting boundary points {level=1 check="3"}
Let $A = [0, 1)\cup\set3\subseteq\R$ (standard topology). Find $\operatorname{int}A$, $\overline A$ and $\partial A$. How many points does $\partial A$ have?
::: solution
$\operatorname{int}A = (0, 1)$: the point $0$ has no interval around it inside $A$, and neither does $3$. $\overline A = [0, 1]\cup\set3$ by [[#thm-closure]]. So $\partial A = \overline A\setminus\operatorname{int}A = \set{0, 1, 3}$, which has $3$ points.
:::
:::

::: exercise A countable basis {#exr-countable-basis level=2}
Prove that the open intervals $(p, q)$ with $p, q\in\Q$ form a countable basis for the standard topology on $\R$, and that the open discs with rational centres (both coordinates rational) and rational radii form a countable basis for $\R^2$.
::: solution
The collection of pairs $(p, q)$ of rationals is countable, so there are countably many such intervals; that they form a basis generating the standard topology was shown in [[#ex-bases]](a). For $\R^2$: let $U$ be open and $x\in U$, with $B(x, r)\subseteq U$. Choose a point $c$ with rational coordinates and $d(c, x) < r/3$, and a rational $s$ with $r/3 < s < 2r/3$. Then $x\in B(c, s)$ since $d(x, c) < r/3 < s$, and $B(c, s)\subseteq B(x, r)$ since $d(y, x)\le d(y, c) + d(c, x) < 2r/3 + r/3 = r$ for $y\in B(c, s)$. So every open set is a union of such discs (they form a basis because they are open and satisfy this property), and there are countably many of them.
:::
:::

::: exercise Closure of unions and intersections {level=2}
Prove that $\overline{A\cup B} = \overline A\cup\overline B$ and $\overline{A\cap B}\subseteq\overline A\cap\overline B$, and give an example in $\R$ where the inclusion is strict.
::: solution
$\overline A\cup\overline B$ is closed (a finite union of closed sets) and contains $A\cup B$, so it contains $\overline{A\cup B}$. Conversely $A\subseteq A\cup B$ implies $\overline A\subseteq\overline{A\cup B}$ (the closure is monotone: every closed set containing $A\cup B$ contains $A$), and similarly for $B$. For the intersection: $A\cap B\subseteq A$ gives $\overline{A\cap B}\subseteq\overline A$, and likewise $\subseteq\overline B$. Example: $A = \Q$ and $B = \R\setminus\Q$ have $\overline{A\cap B} = \overline\emptyset = \emptyset$, while $\overline A\cap\overline B = \R\cap\R = \R$.
:::
:::

::: exercise Interior and closure are dual {level=2}
Prove that $X\setminus\overline A = \operatorname{int}(X\setminus A)$ for every subset $A$ of a space $X$. Deduce that $A$ is dense if and only if its complement has empty interior, and that $\partial A = \overline A\cap\overline{X\setminus A}$.
::: solution
An open set $U$ satisfies $U\subseteq X\setminus A$ if and only if $X\setminus U$ is a closed set containing $A$. Taking the union of all such $U$ on the left corresponds to taking the intersection of all such $X\setminus U$ on the right, so $\operatorname{int}(X\setminus A) = X\setminus\bigcap\set{C\text{ closed} : C\supseteq A} = X\setminus\overline A$. Hence $\overline A = X$ iff $\operatorname{int}(X\setminus A) = \emptyset$. Applying the identity to $X\setminus A$ gives $\operatorname{int}A = X\setminus\overline{X\setminus A}$, so $\partial A = \overline A\setminus\operatorname{int}A = \overline A\cap\overline{X\setminus A}$.
:::
:::

::: exercise Dense sets {#exr-dense level=2}
Prove that $D\subseteq X$ is dense if and only if $D$ meets every non-empty open subset of $X$. Show that $\Q$ is dense in the Sorgenfrey line $\R_\ell$, and that in the cofinite topology on an infinite set every infinite subset is dense.
::: solution
By [[#thm-closure]], $\overline D = X$ iff every point $x$ has the property that every open set containing $x$ meets $D$, iff every non-empty open set (which contains some point) meets $D$. In $\R_\ell$ every non-empty open set contains a basis interval $[a, b)$ with $a < b$, which contains rationals; so $\Q$ is dense. In the cofinite topology a non-empty open set has finite complement and so meets every infinite set ([[#ex-closures]](c)).
:::
:::

::: exercise Topologies on three points {level=3 check="29"}
Show that there are exactly $29$ topologies on the three-point set $X = \set{a, b, c}$.
::: hint
Organise the count by the number of singletons that are open, and remember that intersections of open sets are open.
:::
::: solution
Every topology contains $\emptyset$ and $X$; the question is which of the six proper non-empty subsets (three singletons and three doubletons) are open. We count according to the number of open singletons.

*No open singleton.* Two different doubletons intersect in a singleton, which would then be open; so at most one doubleton is open. This gives the indiscrete topology and the three topologies $\set{\emptyset, D, X}$ with $D$ a doubleton: $4$ topologies.

*Exactly one open singleton*, say $\set a$ ($3$ choices). The doubleton $\set{b, c}$ cannot be open together with $\set{a,b}$ or $\set{a, c}$, since the intersections $\set b$ or $\set c$ would be further open singletons; and $\set{a, b}\cap\set{a, c} = \set a$ is allowed. The possible families of open doubletons are $\emptyset$, $\set{\set{a,b}}$, $\set{\set{a,c}}$, $\set{\set{a,b},\set{a,c}}$ and $\set{\set{b,c}}$, and each gives a topology (unions such as $\set a\cup\set{b,c} = X$ cause no problem). So $5$ topologies for each choice: $15$.

*Exactly two open singletons*, say $\set a$ and $\set b$ ($3$ choices). Then $\set{a, b}$ is open. The doubletons $\set{a, c}$ and $\set{b,c}$ cannot both be open, since their intersection $\set c$ would be a third open singleton; each alone is allowed ($\set{a,c}\cup\set b = X$, $\set{a,c}\cap\set b = \emptyset$). So $3$ topologies for each choice: $9$.

*All three singletons open.* Then every subset is open: the discrete topology, $1$.

In total $4 + 15 + 9 + 1 = 29$. (A computer search confirms this; on four points there are already $355$ topologies.)
:::
:::

::: exercise The Sorgenfrey line is not second countable {#exr-sorgenfrey level=3}
Prove that $\R_\ell$ has no countable basis, although it has a countable dense subset.
::: hint
Given a basis $\mathcal B$, choose for each $x$ an element $B_x\in\mathcal B$ with $x\in B_x\subseteq[x, x + 1)$.
:::
::: solution
Let $\mathcal B$ be any basis for $\R_\ell$. For each $x\in\R$ the set $[x, x+1)$ is open and contains $x$, so there is $B_x\in\mathcal B$ with $x\in B_x\subseteq[x, x+1)$. Then $x$ is the smallest element of $B_x$. If $x\neq y$ then $B_x\neq B_y$, because their smallest elements differ. So $x\mapsto B_x$ is an injection from $\R$ into $\mathcal B$, and $\mathcal B$ is uncountable. On the other hand $\Q$ is countable and dense in $\R_\ell$ ([[#exr-dense]]). In metric spaces a countable dense subset always yields a countable basis (balls with rational radii around its points, as in [[#exr-countable-basis]]), so this also shows that $\R_\ell$ is not metrisable.
:::
:::

::: exercise Sequences do not detect closures {#exr-cocountable level=3}
The **cocountable topology** on $\R$ consists of $\emptyset$ and the sets with countable complement. Show that it is a topology, that a sequence converges in it only if it is eventually constant, and that $0$ lies in the closure of $A = \R\setminus\set0$ although no sequence in $A$ converges to $0$.
::: solution
*Topology.* As for the cofinite topology ([[#ex-catalogue]]), using that subsets of countable sets and finite unions of countable sets are countable. *Sequences.* Suppose $x_n\to x$. The set $C = \set{x_n : x_n\neq x}$ is countable, so $U = \R\setminus C$ is open and contains $x$. Hence $x_n\in U$ for $n\ge N$, which means $x_n = x$ for $n\ge N$. *Closure.* A non-empty open set has countable complement, so it is uncountable and meets $A$; in particular every open set containing $0$ meets $A$, and $0\in\overline A$ by [[#thm-closure]]. But a sequence in $A$ converging to $0$ would have to be eventually equal to $0\notin A$, which is impossible.
:::
:::
