A continuous function on a closed bounded interval $[a, b]$ attains a maximum and a minimum. On the open interval $(0, 1)$ the function $f(x) = x$ has no maximum (its values creep up to $1$ without reaching it), and $1/x$ is not even bounded; on $\R$ the function $x$ is unbounded. What is special about $[a, b]$? In real analysis the answer is the Bolzano–Weierstrass theorem: every sequence in $[a, b]$ has a convergent subsequence, *with limit in $[a, b]$*. Topology offers a different answer, phrased without sequences, which turns out to be the more powerful one: every cover of $[a, b]$ by open sets can be reduced to a finite cover.

This property, **compactness**, is the topological substitute for finiteness. Finite sets are trivially compact, and many arguments that work for finite sets — taking a maximum, choosing the smallest of finitely many radii — work for compact spaces. In this chapter we define compactness, prove the **Heine–Borel theorem** characterising the compact subsets of $\R^n$ as the closed bounded ones, show that continuous images of compact spaces are compact (which gives the extreme value theorem in full generality), prove that a continuous bijection from a compact space to a Hausdorff space is automatically a homeomorphism, and relate compactness to sequences in metric spaces.

## Open covers and compactness

::: definition Compactness {#def-compact}
An **open cover** of a topological space $X$ is a collection $\mathcal U$ of open sets whose union is $X$. A **subcover** is a subcollection that still covers $X$. The space $X$ is **compact** if every open cover of $X$ has a finite subcover. A subset of a space is compact if it is compact in the subspace topology.
:::

Since open sets of a subspace $A$ have the form $U\cap A$, a subset $A\subseteq X$ is compact if and only if every collection of open sets *of $X$* whose union contains $A$ has a finite subcollection whose union contains $A$. We use this form without comment.

::: example Compact and non-compact spaces {#ex-compact-examples}
(a) Show that every finite space and every indiscrete space is compact, and that an infinite discrete space is not. (b) Show that $\R$ and $(0, 1)$ are not compact. (c) Show that $K = \set0\cup\set{1/n : n\ge1}\subseteq\R$ is compact.
::: solution
(a) A finite space has only finitely many open sets, so every open cover is already finite. In an indiscrete space an open cover must contain $X$ itself, which is a subcover of one set. In an infinite discrete space the cover by singletons $\set{\set x}$ has no proper subcover, let alone a finite one.

(b) The intervals $(-n, n)$, $n\ge1$, cover $\R$, but finitely many of them have union $(-N, N)$ for the largest $N$ used, which is not $\R$. Similarly $(\frac1n, 1)$, $n\ge2$, cover $(0, 1)$, but any finite subcollection has union $(\frac1N, 1)\neq(0,1)$.

(c) Let $\mathcal U$ be a cover of $K$ by open sets of $\R$. Some $U_0\in\mathcal U$ contains $0$, and since $U_0$ is open it contains an interval $(-\eps, \eps)$, hence all $1/n$ with $n > 1/\eps$. The finitely many remaining points $1, \frac12,\dots,\frac1N$ ($N\le1/\eps$) are each in some member $U_1,\dots,U_N$ of $\mathcal U$. So $U_0, U_1,\dots,U_N$ is a finite subcover. The point $0$ is essential: $K\setminus\set0$ is not compact (cover it by the open intervals $(\frac{1}{n} - \frac{1}{n^2+n}, \frac1n + \frac{1}{n^2+n})$, which isolate the points from each other).
:::
:::

Compactness is a topological property, and more: it is preserved by continuous maps.

::: theorem Continuous images of compact spaces {#thm-image}
If $X$ is compact and $f\colon X\to Y$ is continuous, then $f(X)$ is compact.
:::

::: proof
Let $\mathcal V$ be a cover of $f(X)$ by open sets of $Y$. The preimages $f^{-1}(V)$, $V\in\mathcal V$, are open and cover $X$, so finitely many of them, $f^{-1}(V_1),\dots,f^{-1}(V_n)$, cover $X$. Then $V_1,\dots,V_n$ cover $f(X)$: if $y = f(x)$, then $x\in f^{-1}(V_k)$ for some $k$, so $y\in V_k$.
:::

## Compact sets, closed sets and the Hausdorff property

Compactness and closedness are closely related, but the relation needs one more property of the space, which we meet properly in [[topology/quotient-spaces]]: a space $X$ is **Hausdorff** if any two distinct points have disjoint open neighbourhoods. Metric spaces are Hausdorff (use balls of radius half the distance).

::: theorem Closed subsets and compact subsets {#thm-closed-compact}
1. A closed subset of a compact space is compact.
2. A compact subset of a Hausdorff space is closed.
:::

::: proof
(1) Let $C$ be closed in the compact space $X$, and let $\mathcal U$ be a collection of open sets of $X$ covering $C$. Adding the open set $X\setminus C$ gives an open cover of $X$, which has a finite subcover. Removing $X\setminus C$ from it (if present) leaves finitely many members of $\mathcal U$ covering $C$.

(2) Let $K$ be compact in the Hausdorff space $X$, and let $x\notin K$. For each $y\in K$ choose disjoint open sets $U_y\ni x$ and $V_y\ni y$. The $V_y$ cover $K$, so finitely many, $V_{y_1},\dots,V_{y_n}$, cover it. Then $U = U_{y_1}\cap\dots\cap U_{y_n}$ is an open set containing $x$ and disjoint from $V_{y_1}\cup\dots\cup V_{y_n}\supseteq K$. So every point outside $K$ has a neighbourhood outside $K$: the complement of $K$ is open.
:::

The proof of (2) shows a typical use of compactness: infinitely many neighbourhoods $U_y$ cannot be intersected, but finitely many can.

::: warning Compact sets need not be closed
Part (2) needs the Hausdorff hypothesis. In the cofinite topology on an infinite set, *every* subset is compact (a cover of $A$ contains a set $U_0$ meeting $A$; it misses only finitely many points of the space, each lying in some other member of the cover), yet only the finite subsets and the whole space are closed. Likewise in an indiscrete space every subset is compact. In non-Hausdorff spaces, compactness and closedness come apart.
:::

## The Heine–Borel theorem

The fundamental compact space is the closed interval.

::: theorem Closed intervals are compact {#thm-interval}
Every closed bounded interval $[a, b]\subseteq\R$ is compact.
:::

::: proof
Let $\mathcal U$ be a cover of $[a, b]$ by open subsets of $\R$, and let

$$
S = \set{x\in[a, b] : [a, x]\text{ is covered by finitely many members of }\mathcal U}.
$$

Then $a\in S$ (one member containing $a$ suffices), and $S$ is bounded by $b$; let $s = \sup S\in[a,b]$. Choose $U\in\mathcal U$ with $s\in U$ and $\eps > 0$ with $(s - \eps, s + \eps)\subseteq U$. By the definition of supremum there is $x\in S$ with $s - \eps < x\le s$. Finitely many members of $\mathcal U$ cover $[a, x]$; adding $U$, finitely many members cover $[a, y]$ for every $y\in[a, b]$ with $y < s + \eps$. Taking $y = s$ shows $s\in S$. If $s < b$, taking $y = \min(s + \eps/2, b) > s$ shows $y\in S$, contradicting $s = \sup S$. Hence $s = b$ and $[a, b]$ is covered by finitely many members of $\mathcal U$.
:::

As with connectedness in [[topology/connectedness#thm-intervals]], the least upper bound property of $\R$ does the work; in $\Q$, the "closed interval" $[0, 2]\cap\Q$ is not compact (cover it by the sets $\set{q : \abs{q^2 - 2} > 1/n}$).

To pass to higher dimensions we need products, and the key lemma is about "tubes".

::: lemma Tube lemma {#lem-tube}
Let $Y$ be compact, $x\in X$, and let $W$ be an open subset of $X\times Y$ containing the slice $\set x\times Y$. Then there is an open $U\ni x$ with $U\times Y\subseteq W$.
:::

::: proof
For each $y\in Y$, the point $(x, y)\in W$ lies in a basis element $U_y\times V_y\subseteq W$. The $V_y$ cover the compact space $Y$, so finitely many, $V_{y_1},\dots,V_{y_n}$, cover $Y$. Put $U = U_{y_1}\cap\dots\cap U_{y_n}$, an open set containing $x$. If $(x', y')\in U\times Y$, then $y'\in V_{y_k}$ for some $k$ and $x'\in U\subseteq U_{y_k}$, so $(x', y')\in U_{y_k}\times V_{y_k}\subseteq W$.
:::

::: theorem Products of compact spaces {#thm-product}
If $X$ and $Y$ are compact, then $X\times Y$ is compact.
:::

::: proof
Let $\mathcal W$ be an open cover of $X\times Y$. For each $x\in X$, the slice $\set x\times Y$ is homeomorphic to $Y$, hence compact, so finitely many members of $\mathcal W$ cover it; let $W_x$ be their (open) union. By the tube lemma there is an open $U_x\ni x$ with $U_x\times Y\subseteq W_x$. The $U_x$ cover $X$, so finitely many, $U_{x_1},\dots,U_{x_m}$, cover $X$. Then the tubes $U_{x_k}\times Y$ cover $X\times Y$, and each is covered by finitely many members of $\mathcal W$; altogether finitely many members of $\mathcal W$ cover $X\times Y$.
:::

::: theorem Heine–Borel theorem {#thm-heine-borel}
A subset of $\R^n$ is compact if and only if it is closed and bounded.
:::

::: proof
Let $K\subseteq\R^n$ be compact. It is closed by [[#thm-closed-compact]](2), since $\R^n$ is a metric space and hence Hausdorff. It is bounded because the open balls $B(0, m)$, $m\ge1$, cover $K$, and finitely many of them — hence the largest — must cover it.

Conversely, let $K$ be closed and bounded, say $K\subseteq[-M, M]^n$. The cube $[-M, M]^n$ is compact by [[#thm-interval]] and [[#thm-product]] (with induction on $n$; the product topology on $\R^n$ is the standard one by [[topology/continuous-maps]]). So $K$, a closed subset of a compact space, is compact by [[#thm-closed-compact]](1).
:::

So closed discs, spheres $S^n$, closed cubes and the torus in $\R^3$ are compact, while open discs, $\R^n$ and the punctured closed disc are not.

::: example The orthogonal group is compact {#ex-orthogonal}
Regard $n\times n$ real matrices as points of $\R^{n^2}$. Show that the group $O(n) = \set{A : A\T A = I}$ of orthogonal matrices is compact, while the group $GL_n(\R)$ of invertible matrices is not.
::: solution
The map $A\mapsto A\T A$ from $\R^{n^2}$ to $\R^{n^2}$ is continuous, since each entry of $A\T A$ is a polynomial in the entries of $A$. So $O(n)$, the preimage of the closed set $\set I$, is closed. It is bounded: $A\T A = I$ says the columns of $A$ are unit vectors, so every entry has absolute value at most $1$ and $\norm A_2\le\sqrt n$ in $\R^{n^2}$. By Heine–Borel, $O(n)$ is compact. $GL_n(\R)$ is not compact: it is unbounded (it contains $tI$ for all $t\neq0$), and it is not closed either, since $\frac1kI\to0\notin GL_n(\R)$. Compactness arguments of this kind are common in linear algebra: for a symmetric matrix $A$, the continuous function $x\mapsto x\T Ax$ attains its maximum on the compact unit sphere, and the maximum is attained at an eigenvector — the first step of one proof of the spectral theorem ([[linear-algebra/spectral-theorem]]).
:::
:::

::: quiz
Which of these subsets of $\R^2$ are compact? (Several may be correct.)
- [x] The unit circle $S^1$
- [ ] The open unit disc
- [x] $\set{(x, y) : x^4 + y^4\le1}$
- [ ] The hyperbola $\set{(x, y) : xy = 1}$
- [x] The finite set $\set{(0,0), (1, 2)}$
::: solution
By Heine–Borel, look for closed and bounded sets. The circle, the region $x^4 + y^4\le1$ (closed as the preimage of $(-\infty, 1]$ under a continuous function, bounded since $\abs x, \abs y\le1$) and finite sets qualify. The open disc is bounded but not closed; the hyperbola is closed but not bounded.
:::
:::

::: warning Closed and bounded is not compact in general
Heine–Borel is a theorem about $\R^n$, not about metric spaces in general. In $\R$ with the bounded metric $d(x, y) = \min(\abs{x - y}, 1)$, the whole space is closed and bounded (by $1$), and it is not compact since the topology is the usual one. In the space $\ell^2$ of square-summable sequences, the closed unit ball is closed and bounded but not compact ([[#exr-ell2]]). The correct general statement is that a metric space is compact if and only if it is *complete and totally bounded*.
:::

## Compactness and continuous maps

::: corollary Extreme value theorem {#cor-evt}
If $X$ is a non-empty compact space and $f\colon X\to\R$ is continuous, then $f$ is bounded and attains its maximum and minimum: there are $p, q\in X$ with $f(p)\le f(x)\le f(q)$ for all $x\in X$.
:::

::: proof
$f(X)$ is a compact subset of $\R$ by [[#thm-image]], so it is closed and bounded by Heine–Borel. A non-empty bounded set of reals has a supremum $s$, which lies in the closure of the set; since $f(X)$ is closed, $s\in f(X)$, i.e. $s = f(q)$ for some $q$. The minimum is handled in the same way.
:::

This is the extreme value theorem of [[calculus-1/continuity]], now valid for continuous functions on spheres, tori, closed balls, products of closed intervals, and any other compact space.

::: widget plot
f: atan(x); 1/x
x: -6, 6
y: -3, 3
labels: \arctan x; 1/x
hlines: pi/2; -pi/2
caption: Two continuous functions on non-compact domains. On $\R$, $\arctan x$ is bounded, but its supremum $\pi/2$ (dashed) is approached and never attained. On $(0, 1]$, $1/x$ is not even bounded. Restrict either function to a closed bounded interval and the extreme value theorem guarantees a maximum and a minimum.
:::

::: example Distances and norms {#ex-distance}
(a) Let $K\subseteq\R^n$ be compact and non-empty and $p\in\R^n$. Show that there is a point of $K$ nearest to $p$. (b) Show that any two norms on $\R^n$ are equivalent: if $\norm{\cdot}$ is a norm, there are $c, C > 0$ with $c\norm x_2\le\norm x\le C\norm x_2$.
::: solution
(a) The function $f(x) = \norm{x - p}$ is continuous on $K$, so it attains its minimum at some $q\in K$ by [[#cor-evt]]; $q$ is a nearest point. (For a closed but unbounded set, intersect it with a large closed ball first.)

(b) Write $x = \sum x_ie_i$. By the triangle inequality and the Cauchy–Schwarz inequality, $\norm x\le\sum\abs{x_i}\norm{e_i}\le C\norm x_2$ with $C = \big(\sum\norm{e_i}^2\big)^{1/2}$. This also shows $\abs{\norm x - \norm y}\le\norm{x - y}\le C\norm{x - y}_2$, so $\norm\cdot$ is continuous with respect to the Euclidean metric. On the unit sphere $S^{n-1} = \set{\norm x_2 = 1}$, which is compact by Heine–Borel, it attains a minimum $c$, and $c > 0$ because a norm vanishes only at $0$. For $x\neq0$, $\norm x = \norm x_2\,\big\lVert x/\norm x_2\big\rVert\ge c\norm x_2$. Hence all norms on $\R^n$ define the same topology — a statement that fails for infinite-dimensional spaces.
:::
:::

The next theorem is one of the most frequently used in topology: it removes the need to check continuity of inverses.

::: theorem Compact to Hausdorff {#thm-compact-hausdorff}
Let $f\colon X\to Y$ be a continuous bijection from a compact space $X$ to a Hausdorff space $Y$. Then $f$ is a homeomorphism.
:::

::: proof
We show that $f$ maps closed sets to closed sets; then for $g = f^{-1}$ and $C$ closed in $X$, $g^{-1}(C) = f(C)$ is closed, so $g$ is continuous. Let $C\subseteq X$ be closed. By [[#thm-closed-compact]](1) $C$ is compact, so $f(C)$ is compact by [[#thm-image]], hence closed in the Hausdorff space $Y$ by [[#thm-closed-compact]](2).
:::

For example, the map $[0, 2\pi]\to S^1$, $t\mapsto(\cos t, \sin t)$, is continuous and surjective but not injective, and its restriction to $[0, 2\pi)$ is a bijection that is not a homeomorphism ([[topology/continuous-maps#ex-not-homeo]]) — the domain $[0, 2\pi)$ is not compact. In [[topology/quotient-spaces]] this theorem will show that gluing the ends of $[0, 2\pi]$ together produces exactly the circle. It also shows at once that the map from $S^1\times S^1$ to the doughnut surface in [[topology/continuous-maps#ex-product]] is a homeomorphism: it is a continuous bijection from a compact space to a subspace of $\R^3$, which is Hausdorff.

::: quiz
Let $f\colon X\to Y$ be a continuous bijection. In which situation can you conclude that $f$ is a homeomorphism?
- [x] $X$ is compact and $Y$ is Hausdorff
- [ ] $X$ is Hausdorff and $Y$ is compact
- [ ] $X$ and $Y$ are both metric spaces
- [ ] $X = [0, 2\pi)$ and $Y = S^1$
::: solution
[[#thm-compact-hausdorff]] needs compactness of the *domain* and the Hausdorff property of the *target*. The other options fail: the identity map from $[0,1]$ with the discrete topology (Hausdorff) to $[0,1]$ with the usual topology (compact) is a continuous bijection but not a homeomorphism; the map $[0,2\pi)\to S^1$ of [[topology/continuous-maps#ex-not-homeo]] is a continuous bijection between metric spaces that is not a homeomorphism.
:::
:::

## Sequential compactness in metric spaces

For metric spaces, compactness can be expressed with sequences, which is how it is usually first met in analysis.

::: definition Sequential compactness {#def-seq-compact}
A space $X$ is **sequentially compact** if every sequence in $X$ has a subsequence converging to a point of $X$.
:::

::: lemma Lebesgue number lemma {#lem-lebesgue}
Let $\mathcal U$ be an open cover of a sequentially compact metric space $X$. Then there is $\delta > 0$ (a **Lebesgue number** of the cover) such that every subset of $X$ of diameter less than $\delta$ lies in some member of $\mathcal U$.
:::

::: proof
If not, then for each $n$ there is a set $A_n$ of diameter less than $1/n$ that lies in no member of $\mathcal U$. Pick $x_n\in A_n$. By sequential compactness a subsequence $x_{n_k}$ converges to some $x\in X$. Choose $U\in\mathcal U$ containing $x$ and $\eps > 0$ with $B(x, \eps)\subseteq U$. For $k$ large, $d(x_{n_k}, x) < \eps/2$ and $1/n_k < \eps/2$; then every point $y\in A_{n_k}$ satisfies $d(y, x)\le d(y, x_{n_k}) + d(x_{n_k}, x) < \eps$, so $A_{n_k}\subseteq B(x,\eps)\subseteq U$, a contradiction.
:::

::: theorem Compact equals sequentially compact for metric spaces {#thm-sequential}
A metric space is compact if and only if it is sequentially compact.
:::

::: proof
*Compact ⇒ sequentially compact.* Let $(x_n)$ be a sequence in the compact metric space $X$, and suppose no subsequence converges. Then no point $x$ is a limit of a subsequence, so each $x$ has a ball $B(x, r_x)$ containing $x_n$ for only finitely many $n$ (otherwise we could choose $n_1 < n_2 < \dots$ with $x_{n_k}\in B(x, 1/k)$, a subsequence converging to $x$). These balls cover $X$, finitely many of them cover $X$, and so only finitely many indices $n$ occur in total — impossible for an infinite sequence.

*Sequentially compact ⇒ compact.* Let $\mathcal U$ be an open cover and $\delta$ a Lebesgue number for it. We claim that $X$ is covered by finitely many balls of radius $\delta/3$. If not, choose $y_1$ arbitrarily and inductively $y_{k+1}\notin B(y_1,\delta/3)\cup\dots\cup B(y_k, \delta/3)$; then $d(y_j, y_k)\ge\delta/3$ for all $j\neq k$, so no subsequence of $(y_k)$ is Cauchy, let alone convergent — a contradiction. So $X = B(y_1,\delta/3)\cup\dots\cup B(y_m, \delta/3)$. Each ball has diameter at most $2\delta/3 < \delta$, so it lies in some $U_k\in\mathcal U$, and $U_1,\dots,U_m$ is a finite subcover.
:::

Combining with Heine–Borel gives the **Bolzano–Weierstrass theorem**: every bounded sequence in $\R^n$ has a convergent subsequence (it lies in a compact cube). The sequence below is a good test of intuition.

::: widget sequence
a: sin(n)
N: 200
mode: terms
y: -1.2, 1.2
caption: The terms of $a_n = \sin n$ wander through $[-1, 1]$ without ever settling down — in fact they come arbitrarily close to every point of $[-1,1]$, because $\pi$ is irrational. The sequence diverges, yet by Bolzano–Weierstrass it has convergent subsequences, since $[-1,1]$ is compact; indeed for every $c\in[-1,1]$ some subsequence converges to $c$.
:::

A second classical consequence of compactness is uniform continuity.

::: theorem Uniform continuity on compact spaces {#thm-uniform}
Let $f\colon X\to Y$ be a continuous map between metric spaces, with $X$ compact. Then $f$ is uniformly continuous: for every $\eps > 0$ there is $\delta > 0$ such that $d(x, x') < \delta$ implies $d(f(x), f(x')) < \eps$.
:::

::: proof
Given $\eps > 0$, the sets $U_y = f^{-1}\big(B(y, \eps/2)\big)$, $y\in Y$, form an open cover of $X$. Let $\delta$ be a Lebesgue number for it ([[#lem-lebesgue]], applicable by [[#thm-sequential]]). If $d(x, x') < \delta$, the set $\set{x, x'}$ has diameter less than $\delta$, so it lies in some $U_y$: both $f(x)$ and $f(x')$ are within $\eps/2$ of $y$, and $d(f(x), f(x')) < \eps$.
:::

::: example A Lebesgue number {#ex-lebesgue}
Find the largest Lebesgue number of the cover $\set{[0, 0.6),\ (0.5, 1]}$ of $[0, 1]$.
::: solution
Let $A\subseteq[0,1]$ have diameter less than $0.1$. If $A$ contains a point $a\le0.5$, then every point of $A$ is less than $a + 0.1\le0.6$, so $A\subseteq[0, 0.6)$; otherwise $A\subseteq(0.5, 1]$. So $\delta = 0.1$ is a Lebesgue number. No $\delta > 0.1$ works: the set $[0.5, 0.6]$ has diameter $0.1 < \delta$ but lies in neither member, since $0.5\notin(0.5, 1]$ and $0.6\notin[0, 0.6)$. The largest Lebesgue number is $0.1$ — the length of the overlap, as the picture of two overlapping intervals suggests.
:::
:::

::: remark Tychonoff's theorem and compactifications
[[#thm-product]] extends to arbitrary products: **Tychonoff's theorem** states that any product of compact spaces is compact in the product topology. Its proof for infinite products is subtle (it is equivalent to the axiom of choice), but its consequences reach far into analysis, for instance the Banach–Alaoglu theorem of functional analysis. In the other direction, a non-compact space can often be made compact by adding points. The **one-point compactification** of $\R^n$ adds a single point $\infty$, with neighbourhoods the complements of compact sets, and the result is homeomorphic to the sphere $S^n$ via stereographic projection — for $n = 2$ this is the Riemann sphere of [[complex-analysis/complex-numbers]].
:::

::: application Existence of optimal solutions
Many problems in economics, engineering and statistics ask for the best choice among infinitely many: the cheapest design, the most likely parameter, the shortest route. The extreme value theorem guarantees that a continuous cost function on a compact set of choices has a minimiser, before any algorithm is run; when the set of choices is not compact (prices can be arbitrarily large, a parameter can drift to infinity), a minimiser may not exist, and showing that a minimising sequence stays in a compact set is the standard first step. In infinite-dimensional problems — finding a curve or a function — compactness theorems such as Arzelà–Ascoli play the same role, for example in the Peano existence theorem for differential equations ([[ode/existence-uniqueness]]).
:::

::: history
Compactness emerged from the analysis of the nineteenth century. Eduard Heine proved in 1872 that a continuous function on a closed bounded interval is uniformly continuous, using an argument with covers. Émile Borel proved in his thesis of 1895 that every countable cover of a closed bounded interval by open intervals has a finite subcover, and the extension to arbitrary covers followed soon after, through Pierre Cousin, Henri Lebesgue and others. Maurice Fréchet introduced the word *compact* in 1906, for what we now call sequential compactness. Pavel Alexandrov and Pavel Urysohn made the open-cover definition the central one in their memoir on compact spaces, written in the early 1920s and published in 1929, and Andrey Tychonoff proved the compactness of products in 1930–1935.
:::

## Where this leads

Compactness is one of the two pillars of point-set topology, and it will be used repeatedly in the rest of the course. In [[topology/quotient-spaces]], [[#thm-compact-hausdorff]] identifies quotient spaces such as the circle, the torus and the projective plane with concrete models. In [[topology/fundamental-group]], the Lebesgue number lemma is the engine of the path-lifting argument that computes the fundamental group of the circle. In analysis, compactness gives uniform continuity, the existence of maxima and minima, and the convergence of subsequences — and in [[real-analysis/metric-spaces]] and [[measure-theory/lp-spaces]] its failure in infinite dimensions is the source of many subtleties.

::: summary
- A space is compact if every open cover has a finite subcover; finite sets, closed intervals and $\set0\cup\set{1/n}$ are compact, while $\R$, $(0,1)$ and infinite discrete spaces are not.
- Continuous images of compact spaces are compact; closed subsets of compact spaces are compact; compact subsets of Hausdorff spaces are closed.
- $[a, b]$ is compact, products of compact spaces are compact (tube lemma), and so a subset of $\R^n$ is compact iff it is closed and bounded (Heine–Borel). In general metric spaces closed and bounded is not enough.
- Extreme value theorem: a continuous real function on a non-empty compact space attains its maximum and minimum.
- A continuous bijection from a compact space to a Hausdorff space is a homeomorphism.
- In metric spaces compactness is equivalent to sequential compactness; every open cover has a Lebesgue number, and continuous maps on compact spaces are uniformly continuous.
:::

## Exercises

::: exercise A non-compact interval {level=1}
Show directly from the definition that $(0, 1]$ is not compact, and that a union of finitely many compact subsets of a space is compact.
::: solution
The open sets $(\frac1n, 2)$, $n\ge1$, cover $(0, 1]$, but finitely many of them have union $(\frac1N, 2)$, which misses $(0, \frac1N]$. For the union $K_1\cup\dots\cup K_m$ of compact sets: given a cover by open sets, finitely many members cover each $K_i$, and the union of these finitely many finite collections is a finite subcover.
:::
:::

::: exercise Recognising compact sets {level=1}
Which of the following are compact: $[0,1]\cap\Q$; $\Z$; the closed unit disc in $\R^2$; $\set{(x, \sin x) : 0\le x\le\pi}$; $\set{(x,y) : x^2 - y^2 = 1}$?
::: solution
$[0,1]\cap\Q$ is bounded but not closed in $\R$ (its closure is $[0,1]$), so not compact. $\Z$ is closed but unbounded, not compact. The closed disc is closed and bounded, so compact. The graph of $\sin$ on $[0,\pi]$ is the continuous image of $[0,\pi]$ under $x\mapsto(x,\sin x)$, so compact. The hyperbola $x^2 - y^2 = 1$ is closed but unbounded, not compact.
:::
:::

::: exercise A guaranteed maximum {level=1 check="sqrt(2)"}
Explain why $f(x, y) = x + y$ attains a maximum on the unit circle $S^1$, and find it.
::: solution
$S^1$ is compact (closed and bounded) and $f$ is continuous, so the maximum exists by [[#cor-evt]]. With $(x, y) = (\cos t, \sin t)$, $f = \cos t + \sin t = \sqrt2\sin(t + \frac\pi4)$, whose maximum is $\sqrt2$, attained at $t = \frac\pi4$, i.e. at $(\frac{1}{\sqrt2},\frac1{\sqrt2})$.
:::
:::

::: exercise A Lebesgue number {level=2 check="1/10"}
The intervals $[0, 0.4)$, $(0.3, 0.8)$ and $(0.7, 1]$ cover $[0, 1]$. Find the largest Lebesgue number of this cover.
::: solution
Arguing as in [[#ex-lebesgue]], the obstruction comes from the overlaps: a set of diameter less than $\delta$ must fit inside one member. The overlap $(0.3, 0.4)$ has length $0.1$, and so does $(0.7, 0.8)$. Take $\delta = 0.1$ and $A$ of diameter less than $0.1$, with $a = \inf A$. If $a\le0.3$, then $A\subseteq[a, a + 0.1)\subseteq[0, 0.4)$. If $0.3 < a\le0.7$, then $A\subseteq[a, a + 0.1)\subseteq(0.3, 0.8)$. If $a > 0.7$, then $A\subseteq(0.7, 1]$. So $0.1$ is a Lebesgue number. For $\delta > 0.1$, the set $[0.3, 0.4]$ has diameter $0.1 < \delta$ and lies in no member. The largest Lebesgue number is $0.1$.
:::
:::

::: exercise No continuous surjection {level=2}
Prove that there is no continuous surjection from $[0, 1]$ onto $(0, 1)$, but that there is a continuous surjection from $(0, 1)$ onto $[0, 1]$.
::: solution
The continuous image of the compact space $[0,1]$ is compact, but $(0,1)$ is not compact, so no continuous surjection $[0,1]\to(0,1)$ exists. On the other hand $f(x) = \frac12\big(1 + \sin(4\pi x)\big)$ maps $(0, 1)$ continuously onto $[0, 1]$: it takes the value $1$ at $x = \frac18$ and $0$ at $x = \frac38$, and all values in between by the intermediate value theorem.
:::
:::

::: exercise Separating compact sets {level=2}
Let $K$ and $L$ be disjoint compact subsets of a Hausdorff space $X$. Prove that there are disjoint open sets $U\supseteq K$ and $V\supseteq L$.
::: solution
For each $x\in K$, the proof of [[#thm-closed-compact]](2) applied to the compact set $L$ and the point $x\notin L$ gives disjoint open sets $U_x\ni x$ and $V_x\supseteq L$. The $U_x$ cover $K$, so finitely many, $U_{x_1},\dots,U_{x_n}$, cover $K$. Put $U = U_{x_1}\cup\dots\cup U_{x_n}$ and $V = V_{x_1}\cap\dots\cap V_{x_n}$. Then $U\supseteq K$, $V\supseteq L$ is open (a finite intersection), and $U\cap V = \emptyset$ because each $U_{x_k}$ is disjoint from $V_{x_k}\supseteq V$.
:::
:::

::: exercise The cofinite topology is compact {level=2}
Prove that every subset of a space with the cofinite topology is compact. Deduce that a compact subset of a non-Hausdorff space need not be closed.
::: solution
Let $A\subseteq X$ and let $\mathcal U$ be a collection of open sets covering $A$. If $A = \emptyset$ there is nothing to do. Otherwise pick $U_0\in\mathcal U$ with $U_0\cap A\neq\emptyset$; then $U_0$ is non-empty, so $X\setminus U_0$ is finite, and so is $A\setminus U_0 = \set{a_1,\dots,a_k}$. Choose $U_i\in\mathcal U$ containing $a_i$; then $U_0,\dots,U_k$ cover $A$. For an infinite $X$, any infinite proper subset (for instance $X$ minus one point) is compact but not closed, since the closed sets are the finite sets and $X$.
:::
:::

::: exercise Compact metric spaces are complete and totally bounded {level=3}
A metric space is **totally bounded** if for every $\eps > 0$ it is covered by finitely many balls of radius $\eps$. Prove that a compact metric space is complete and totally bounded.
::: solution
*Totally bounded:* the balls $B(x, \eps)$, $x\in X$, cover $X$, so finitely many do. *Complete:* let $(x_n)$ be a Cauchy sequence. By [[#thm-sequential]] it has a subsequence $x_{n_k}\to x$. Given $\eps > 0$, choose $N$ with $d(x_n, x_m) < \eps/2$ for $m, n\ge N$, and $k$ with $n_k\ge N$ and $d(x_{n_k}, x) < \eps/2$. Then for $n\ge N$, $d(x_n, x)\le d(x_n, x_{n_k}) + d(x_{n_k}, x) < \eps$. So $x_n\to x$. (The converse also holds: a complete and totally bounded metric space is compact — every sequence has a Cauchy subsequence by a diagonal argument with finitely many balls at each scale.)
:::
:::

::: exercise Closed and bounded but not compact {#exr-ell2 level=3}
Let $\ell^2$ be the space of real sequences $x = (x_1, x_2,\dots)$ with $\sum x_i^2 < \infty$, with the metric $d(x, y) = \big(\sum(x_i - y_i)^2\big)^{1/2}$. Show that the closed unit ball $\set{x : d(x, 0)\le1}$ is closed and bounded but not compact.
::: solution
It is bounded by definition and closed because $x\mapsto d(x, 0)$ is continuous and the ball is the preimage of $[0, 1]$. Let $e_n$ be the sequence with a $1$ in position $n$ and $0$ elsewhere; all $e_n$ lie in the ball, and $d(e_m, e_n) = \sqrt2$ for $m\neq n$. So no subsequence of $(e_n)$ is Cauchy, hence none converges, and the ball is not sequentially compact; by [[#thm-sequential]] it is not compact. (It is not totally bounded: balls of radius $\frac12$ can each contain at most one $e_n$.)
:::
:::

::: exercise Continuous maps from compact spaces are closed {level=3}
Let $X$ be compact and $Y$ Hausdorff, and let $f\colon X\to Y$ be continuous. Prove that $f$ is a closed map (it sends closed sets to closed sets), and deduce that a continuous injection $S^1\to\R^2$ is an embedding. Show by an example that the hypothesis that $X$ is compact cannot be dropped.
::: solution
If $C\subseteq X$ is closed, it is compact ([[#thm-closed-compact]](1)), so $f(C)$ is compact ([[#thm-image]]) and hence closed in $Y$ ([[#thm-closed-compact]](2)). A continuous injection $f\colon S^1\to\R^2$ is a continuous bijection from the compact space $S^1$ onto the Hausdorff subspace $f(S^1)$, hence a homeomorphism onto its image by [[#thm-compact-hausdorff]]: an embedding. Without compactness: the projection $\R^2\to\R$, $(x,y)\mapsto x$, maps the closed hyperbola $xy = 1$ onto $\R\setminus\set0$, which is not closed.
:::
:::
