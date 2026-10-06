Look back over the proofs of this course and the same few ideas keep returning. A sequence converges when its distance to the limit tends to $0$. A Cauchy sequence is one whose terms become close to each other. A function is continuous when nearby points have nearby images. The Bolzano–Weierstrass theorem extracts convergent subsequences, and with them we proved that continuous functions on $[a, b]$ attain their maximum and are uniformly continuous. And in [[real-analysis/uniform-convergence]] exactly the same arguments worked for *functions*, with $\abs{x - y}$ replaced by $\sup\abs{f - g}$.

All these arguments use only a handful of properties of distance. A **metric space** is a set with a distance function having those properties, and nothing else. The payoff is economy and reach: one proof serves for the real line, for $\R^n$, and for spaces of functions, where the "points" are functions and a "ball" is a set of functions close to a given one. In this chapter we develop the vocabulary — open and closed sets, convergence, continuity, completeness and compactness — and finish with the contraction mapping theorem, a single result that solves equations of every kind, from $x = \cos x$ to differential equations.

## Metrics

::: definition Metric space {#def-metric}
A **metric** on a set $X$ is a function $d\colon X \times X \to [0, \infty)$ such that for all $x, y, z \in X$:

1. $d(x, y) = 0$ if and only if $x = y$;
2. $d(x, y) = d(y, x)$ (symmetry);
3. $d(x, z) \le d(x, y) + d(y, z)$ (the triangle inequality).

A **metric space** $(X, d)$ is a set with a metric. Any subset $A \subseteq X$ is again a metric space with the restricted metric, a **subspace** of $X$.
:::

::: example A gallery of metrics {#ex-metrics}
Check that the following are metric spaces: (a) $\R$ with $d(x, y) = \abs{x - y}$; (b) $\R^n$ with the three metrics

$$
d_1(x, y) = \sum_{i=1}^n\abs{x_i - y_i}, \qquad d_2(x, y) = \Bigl(\sum_{i=1}^n(x_i - y_i)^2\Bigr)^{1/2}, \qquad d_\infty(x, y) = \max_i\abs{x_i - y_i};
$$

(c) any set with the **discrete metric** $d(x, y) = 1$ for $x \ne y$, $d(x, x) = 0$; (d) the space $C[a, b]$ of continuous functions on $[a, b]$ with $d_\infty(f, g) = \sup_{x}\abs{f(x) - g(x)}$ and with $d_1(f, g) = \int_a^b\abs{f - g}$.
::: solution
In every case properties 1 and 2 are immediate, except perhaps 1 for $d_1$ on $C[a, b]$: if $\int_a^b\abs{f - g} = 0$ with $\abs{f - g}$ continuous and non-negative, then $f = g$ ([[real-analysis/riemann-integral#exr-6-4]]). The triangle inequality is the real content.

(a) is [[real-analysis/real-numbers#thm-triangle]]. For $d_1$ and $d_\infty$ on $\R^n$ apply it coordinatewise: $\abs{x_i - z_i} \le \abs{x_i - y_i} + \abs{y_i - z_i}$, then sum over $i$, or take the maximum over $i$ (the maximum of a sum is at most the sum of the maxima). For $d_2$ the triangle inequality is Minkowski's inequality $\norm{u + v} \le \norm u + \norm v$ for the Euclidean norm, which follows from the Cauchy–Schwarz inequality ([[linear-algebra/inner-products]]). (c) If $x \ne z$, then $y$ differs from at least one of $x, z$, so $d(x, y) + d(y, z) \ge 1 = d(x, z)$. (d) For each $t$, $\abs{f(t) - h(t)} \le \abs{f(t) - g(t)} + \abs{g(t) - h(t)} \le d_\infty(f, g) + d_\infty(g, h)$; take the supremum over $t$. For $d_1$, integrate the pointwise inequality, using monotonicity and linearity of the integral. The supremum is finite because continuous functions on $[a, b]$ are bounded.
:::
:::

The three metrics on $\R^n$ are different but comparable: for all $x, y$,

$$
d_\infty(x, y) \le d_2(x, y) \le d_1(x, y) \le n\,d_\infty(x, y).
$$ {#eq-equivalent}

(The first two inequalities say that one term, or a square root of a sum of squares, is at most the corresponding sum; the last bounds each of $n$ terms by the largest.) As a result they have the same convergent sequences, the same open sets and the same continuous functions; only the shapes of their balls differ.

::: widget metricballs
metrics: 1; 2; inf
radius: 1
caption: Unit balls $\set{x : d(0, x) < 1}$ in the plane for $d_1$ (a diamond), $d_2$ (a disc) and $d_\infty$ (a square). Drag the centre and the radius, and vary $p$ through the $p$-metrics between them. The nesting diamond ⊂ disc ⊂ square is [[#eq-equivalent]]: every ball of one metric contains a ball of another with the same centre, which is why all three metrics define the same open sets.
:::

::: quiz
Which of the following define a metric on $\R$? Select all that apply.
- [ ] $d(x, y) = (x - y)^2$
- [x] $d(x, y) = \dfrac{\abs{x - y}}{1 + \abs{x - y}}$
- [ ] $d(x, y) = \abs{x^2 - y^2}$
- [x] $d(x, y) = \sqrt{\abs{x - y}}$
::: solution
$(x - y)^2$ fails the triangle inequality: $d(0, 2) = 4 > d(0, 1) + d(1, 2) = 2$. $\abs{x^2 - y^2}$ fails property 1: $d(1, -1) = 0$. The other two are metrics: both have the form $\varphi(\abs{x - y})$ with $\varphi$ strictly increasing, $\varphi(0) = 0$, and $\varphi(s + t) \le \varphi(s) + \varphi(t)$ — for the second see [[#exr-8-4]]; for the last, $\sqrt{s + t} \le \sqrt s + \sqrt t$ (square both sides). The second metric is bounded by $1$, yet it has the same convergent sequences as $\abs{x - y}$: boundedness of a metric says nothing about the space.
:::
:::

## Open and closed sets

In a metric space $(X, d)$ the **open ball** of centre $x$ and radius $r > 0$ is $B(x, r) = \set{y \in X : d(x, y) < r}$.

::: definition Open and closed sets {#def-open}
A set $U \subseteq X$ is **open** if for every $x \in U$ there is $r > 0$ with $B(x, r) \subseteq U$. A set $F \subseteq X$ is **closed** if its complement $X \setminus F$ is open.
:::

Every open ball is open: if $y \in B(x, r)$, then $s = r - d(x, y) > 0$ and $B(y, s) \subseteq B(x, r)$, because $d(x, z) \le d(x, y) + d(y, z) < d(x, y) + s = r$ for $z \in B(y, s)$. Open intervals are open in $\R$, closed intervals $[a, b]$ are closed (their complement is a union of two open intervals), and $[a, b)$ is neither. Being open or closed is not like being a door: $\R$ and $\varnothing$ are both open and closed, and in a discrete metric space every set is both, since $B(x, \tfrac12) = \set{x}$.

::: theorem Unions and intersections {#thm-open-sets}
In any metric space: $\varnothing$ and $X$ are open; any union of open sets is open; any intersection of **finitely many** open sets is open. Dually, any intersection of closed sets and any finite union of closed sets is closed.
:::

::: proof
$\varnothing$ is open because there is nothing to check, and $X$ because every ball lies in $X$. If $x$ lies in a union $\bigcup_\alpha U_\alpha$ of open sets, it lies in some $U_\beta$, which contains a ball $B(x, r)$; that ball lies in the union. If $x \in U_1 \cap \cdots \cap U_n$, choose $r_i > 0$ with $B(x, r_i) \subseteq U_i$ and let $r = \min(r_1, \dots, r_n) > 0$; then $B(x, r)$ lies in every $U_i$. The statements about closed sets follow by taking complements (De Morgan's laws, [[proofs/sets]]).
:::

::: warning Infinite intersections of open sets
The finiteness in [[#thm-open-sets]] matters: $\bigcap_{n\ge1}(-\tfrac1n, \tfrac1n) = \set{0}$, which is not open in $\R$. The proof fails because $\min(r_1, r_2, \dots)$ of infinitely many radii can be $0$. Likewise an infinite union of closed sets need not be closed: $\bigcup_n[\tfrac1n, 1] = (0, 1]$.
:::

Whether a set is open depends on the surrounding space. In $X = [0, 2]$ with the usual metric, the set $[0, 1)$ is open, since $[0, 1) = X \cap (-1, 1)$ and the balls of $X$ are the intersections of balls of $\R$ with $X$; in $\R$ it is not open.

A sequence $(x_n)$ in $X$ **converges** to $x \in X$ if $d(x_n, x) \to 0$; limits are unique, by the triangle inequality, exactly as in [[real-analysis/sequences#thm-limit-unique]]. In $\R^n$, by [[#eq-equivalent]], convergence in any of $d_1$, $d_2$, $d_\infty$ means convergence of each coordinate; in $(C[a, b], d_\infty)$ it means uniform convergence. Closed sets are exactly those that cannot be escaped by taking limits.

::: theorem Closed sets contain their limits {#thm-closed-sequential}
A set $F \subseteq X$ is closed if and only if, whenever $x_n \in F$ for all $n$ and $x_n \to x \in X$, the limit $x$ lies in $F$.
:::

::: proof
Suppose $F$ is closed, $x_n \in F$ and $x_n \to x$. If $x \notin F$, then $x$ lies in the open set $X\setminus F$, so some ball $B(x, r)$ misses $F$. But $d(x_n, x) < r$ for large $n$, so $x_n \in B(x, r)$, contradicting $x_n \in F$.

Conversely, suppose $F$ contains the limits of its convergent sequences, and let $x \in X\setminus F$. If no ball $B(x, r)$ were contained in $X \setminus F$, then each $B(x, 1/n)$ would contain a point $x_n \in F$; then $x_n \to x$, so $x \in F$ — a contradiction. Hence $X\setminus F$ is open and $F$ is closed.
:::

::: example Closed and non-closed sets of functions {#ex-closed-functions}
In $(C[0, 1], d_\infty)$, show that $F = \set{f : f(0) = 0}$ is closed, but that the set $P$ of polynomial functions is not.
::: solution
If $f_n \in F$ and $f_n \to f$ in $d_\infty$, then $\abs{f(0)} = \abs{f(0) - f_n(0)} \le d_\infty(f, f_n) \to 0$, so $f(0) = 0$ and $f \in F$; by [[#thm-closed-sequential]] $F$ is closed. For $P$: by the Weierstrass approximation theorem ([[real-analysis/uniform-convergence#thm-weierstrass-approx]]) there are polynomials $p_n$ with $d_\infty(p_n, e^x) < 1/n$, so $p_n \to e^x$; but $e^x$ is not a polynomial (all its derivatives are $e^x \ne 0$). So $P$ does not contain the limits of its sequences: it is not closed. In fact every continuous function is such a limit — the polynomials are **dense** in $C[0, 1]$.
:::
:::

## Continuity

The ε–δ definition transfers word for word: $f\colon (X, d) \to (Y, \rho)$ is **continuous at** $x$ if for every $\eps > 0$ there is $\delta > 0$ with $\rho(f(x), f(y)) < \eps$ whenever $d(x, y) < \delta$. In a metric space this has a reformulation that does not mention numbers at all.

::: theorem Three faces of continuity {#thm-continuity-open}
For $f\colon (X, d) \to (Y, \rho)$ the following are equivalent:

1. $f$ is continuous at every point of $X$;
2. whenever $x_n \to x$ in $X$, $f(x_n) \to f(x)$ in $Y$;
3. for every open set $V \subseteq Y$, the preimage $f^{-1}(V) = \set{x \in X : f(x) \in V}$ is open in $X$.
:::

::: proof
(1) ⇔ (2) is proved exactly as [[real-analysis/continuity#thm-sequential-continuity]], with $\abs{\cdot}$ replaced by $d$ and $\rho$.

(1) ⇒ (3). Let $V$ be open and $x \in f^{-1}(V)$. Since $f(x) \in V$ and $V$ is open, $B(f(x), \eps) \subseteq V$ for some $\eps > 0$. By continuity there is $\delta > 0$ with $f(B(x, \delta)) \subseteq B(f(x), \eps) \subseteq V$, that is $B(x, \delta) \subseteq f^{-1}(V)$. So $f^{-1}(V)$ is open.

(3) ⇒ (1). Let $x \in X$ and $\eps > 0$. The ball $B(f(x), \eps)$ is open, so its preimage is an open set containing $x$, and therefore contains some ball $B(x, \delta)$. This says exactly that $d(x, y) < \delta$ implies $\rho(f(x), f(y)) < \eps$.
:::

Taking complements, (3) is equivalent to: preimages of closed sets are closed. This gives quick proofs that sets are open or closed: for a continuous $g\colon \R^n \to \R$ the set $\set{x : g(x) > 0}$ is open (the preimage of $(0, \infty)$) and $\set{x : g(x) = 0}$ is closed (the preimage of $\set{0}$). For example the unit sphere $\set{x : d_2(x, 0) = 1}$ is closed in $\R^n$. Condition (3) is taken as the *definition* of continuity in topology ([[topology/continuous-maps]]), where there is no metric at all.

## Completeness

::: definition Complete metric space {#def-complete}
A sequence $(x_n)$ in a metric space is a **Cauchy sequence** if for every $\eps > 0$ there is $N$ with $d(x_m, x_n) < \eps$ for all $m, n \ge N$. The space is **complete** if every Cauchy sequence in it converges to a point of the space.
:::

Every convergent sequence is Cauchy (by the triangle inequality); completeness is the converse. By the Cauchy criterion ([[real-analysis/sequences#thm-cauchy]]) $\R$ is complete. $\Q$ is not (decimal approximations to $\sqrt2$), and neither is the subspace $(0, 1]$ of $\R$ ($x_n = 1/n$ is Cauchy, and its limit $0$ is missing). In $\R^n$ a sequence is Cauchy if and only if each coordinate sequence is, by [[#eq-equivalent]], so $\R^n$ is complete. A discrete metric space is complete, since a Cauchy sequence is eventually constant. Two general facts are often used: a **closed subset of a complete space is complete**, and a **complete subspace of any metric space is closed** ([[#exr-8-5]]).

The most important complete space after $\R^n$ is a space of functions.

::: theorem C[a, b] is complete {#thm-c-complete}
The space $C[a, b]$ of continuous real functions on $[a, b]$, with the metric $d_\infty(f, g) = \sup_x\abs{f(x) - g(x)}$, is complete.
:::

::: proof
Let $(f_n)$ be Cauchy in $d_\infty$: for every $\eps > 0$ there is $N$ with $\abs{f_n(x) - f_m(x)} < \eps$ for all $m, n \ge N$ and all $x$. This is the Cauchy criterion for uniform convergence, so by [[real-analysis/uniform-convergence#thm-uniform-cauchy]] the sequence converges uniformly to a function $f$. By [[real-analysis/uniform-convergence#thm-uniform-continuous]], $f$ is continuous, so $f \in C[a, b]$, and uniform convergence means precisely $d_\infty(f_n, f) \to 0$.
:::

::: example An incomplete space of functions {#ex-incomplete}
Show that $C[0, 1]$ with the metric $d_1(f, g) = \int_0^1\abs{f - g}$ is not complete.
::: solution
Let $f_n$ be $0$ on $[0, \tfrac12]$, rise linearly from $0$ to $1$ on $[\tfrac12, \tfrac12 + \tfrac1n]$, and equal $1$ on $[\tfrac12 + \tfrac1n, 1]$ (for $n \ge 2$). Each $f_n$ is continuous, $\int_0^1 f_n = \frac12 - \frac{1}{2n}$, and $f_m \ge f_n$ for $m > n$, so

$$
d_1(f_m, f_n) = \int_0^1(f_m - f_n) = \frac{1}{2n} - \frac{1}{2m} < \frac{1}{2n}.
$$

So $(f_n)$ is Cauchy. Suppose $d_1(f_n, f) \to 0$ for some continuous $f$. Then $\int_0^{1/2}\abs f \le d_1(f_n, f) \to 0$, so $f = 0$ on $[0, \tfrac12]$ (a continuous non-negative function with integral $0$ vanishes). For any $\delta > 0$ and $n > 1/\delta$, $\int_{1/2+\delta}^1\abs{f - 1} \le d_1(f_n, f) \to 0$, so $f = 1$ on $[\tfrac12 + \delta, 1]$, hence on $(\tfrac12, 1]$. Such an $f$ is discontinuous at $\tfrac12$ — a contradiction. The "limit" is a step function, which is not in the space. Completing this space leads to the Lebesgue space $L^1$ of [[measure-theory/lp-spaces]].
:::
:::

## Compactness

The Bolzano–Weierstrass theorem made closed bounded intervals special: every sequence in $[a, b]$ has a subsequence converging *in* $[a, b]$. That property is the key to the extreme value and Heine–Cantor theorems, and it deserves a name.

::: definition Compactness {#def-compact}
A subset $K$ of a metric space is **(sequentially) compact** if every sequence in $K$ has a subsequence that converges to a point of $K$. An **open cover** of $K$ is a family of open sets whose union contains $K$; $K$ has the **finite subcover property** if every open cover of $K$ has a finite subfamily that still covers $K$.
:::

For subsets of metric spaces the two properties are equivalent (see the remark below), and either may be called compactness. The sequential form is natural in analysis; the cover form is the one that generalises to topology ([[topology/compactness]]) and is the one needed in measure theory. For intervals we prove both.

::: theorem Heine–Borel theorem {#thm-heine-borel}
1. Every open cover of a closed bounded interval $[a, b]$ has a finite subcover.
2. A subset of $\R^n$ is compact if and only if it is closed and bounded.
:::

::: proof
(1) Let $\mathcal{U}$ be a family of open sets covering $[a, b]$, and let

$$
S = \set{x \in [a, b] : [a, x] \text{ is covered by finitely many sets of } \mathcal{U}}.
$$

$a \in S$, since $a$ lies in some member of $\mathcal U$. $S$ is bounded above by $b$, so $s = \sup S$ exists and $a \le s \le b$. The point $s$ lies in some $U_0 \in \mathcal{U}$; as $U_0$ is open, $(s - r, s + r) \subseteq U_0$ for some $r > 0$. By the approximation property ([[real-analysis/real-numbers#lem-sup-approx]]) there is $x \in S$ with $s - r < x \le s$. Take finitely many members of $\mathcal U$ covering $[a, x]$ and add $U_0$, which contains $[x, s + r/2]$. Then $[a, t]$ is covered by finitely many sets, where $t = \min(s + r/2,\ b)$, so $t \in S$ and therefore $t \le s$. Since $s + r/2 > s$, this forces $t = b$, hence $b \le s$, so $s = b$ and $b = t \in S$: the whole of $[a, b]$ is covered by finitely many members of $\mathcal U$.

(2) Suppose $K \subseteq \R^n$ is compact. If $K$ were unbounded, we could choose $x_k \in K$ with $d_2(x_k, 0) > k$; every subsequence would be unbounded and so could not converge. If $x_k \in K$ and $x_k \to x$, compactness gives a subsequence converging to a point of $K$, and that point must be $x$ (subsequences of a convergent sequence have the same limit); so $x \in K$, and $K$ is closed by [[#thm-closed-sequential]].

Conversely, let $K$ be closed and bounded, and let $(x_k)$ be a sequence in $K$. Its first coordinates form a bounded sequence of reals, so by Bolzano–Weierstrass ([[real-analysis/sequences#thm-bw]]) some subsequence has convergent first coordinates. The second coordinates of this subsequence are bounded, so a further subsequence has convergent second coordinates as well. After $n$ steps we have a subsequence whose coordinates all converge, so it converges in $\R^n$, and its limit lies in $K$ because $K$ is closed.
:::

::: warning Closed and bounded is not enough in general
In $(C[0, 1], d_\infty)$ the closed unit ball $\set{f : d_\infty(f, 0) \le 1}$ is closed and bounded but not compact. The functions $f_n(x) = x^n$ lie in it, and no subsequence converges in $d_\infty$: a uniform limit of a subsequence would be continuous and would equal the pointwise limit, which is discontinuous at $1$. Similarly, $\N$ with the discrete metric is closed and bounded (all distances are at most $1$) but the sequence $1, 2, 3, \dots$ has no convergent subsequence. Heine–Borel is a theorem about $\R^n$, not a definition of compactness.
:::

The basic theorem about compact sets is short — and it contains the boundedness and extreme value theorems of [[real-analysis/continuity]] as special cases.

::: theorem Continuous images of compact sets {#thm-compact-image}
Let $f\colon X \to Y$ be continuous and $K \subseteq X$ compact. Then $f(K)$ is compact. In particular, if $Y = \R$, then $f$ is bounded on $K$ and attains its maximum and minimum on $K$ (if $K \ne \varnothing$).
:::

::: proof
Let $(y_n)$ be a sequence in $f(K)$, say $y_n = f(x_n)$ with $x_n \in K$. By compactness a subsequence $x_{n_k}$ converges to some $x \in K$, and by continuity $y_{n_k} = f(x_{n_k}) \to f(x) \in f(K)$. So $f(K)$ is compact. If $Y = \R$, then $f(K)$ is closed and bounded by [[#thm-heine-borel]]; its supremum is the limit of a sequence in $f(K)$ (approximation property), hence belongs to $f(K)$ because $f(K)$ is closed. So the maximum is attained, and similarly the minimum.
:::

::: remark Sequential compactness and open covers
In a metric space $K$ is sequentially compact if and only if it has the finite subcover property. *Sketch.* If every open cover has a finite subcover and $(x_n)$ had no subsequence converging in $K$, each point of $K$ would have a ball around it containing $x_n$ for only finitely many $n$; finitely many of these balls cover $K$, yet together they contain only finitely many terms — impossible. Conversely, a sequentially compact $K$ is **totally bounded** (for each $\eps$ it is covered by finitely many $\eps$-balls), and every open cover has a **Lebesgue number** $\delta > 0$ such that each ball of radius $\delta$ centred in $K$ lies in a single member of the cover; covering $K$ by finitely many $\delta$-balls then gives a finite subcover. A full proof is in [[topology/compactness]]; Rudin, *Principles of Mathematical Analysis*, proves the first direction (Theorem 3.6) and develops the second in the exercises of chapter 2.
:::

::: quiz
Which of these subsets of $\R$ are compact? Select all that apply.
- [x] $[0, 1] \cup [2, 3]$
- [ ] $[0, \infty)$
- [x] $\set{0} \cup \set{1/n : n \in \N}$
- [ ] $\Q \cap [0, 1]$
::: solution
By Heine–Borel we need closed and bounded. $[0,1]\cup[2,3]$ is a finite union of closed sets and is bounded. $[0, \infty)$ is unbounded. $\set{0}\cup\set{1/n}$ is bounded and closed: the only limit point of the $1/n$ is $0$, which is included. $\Q\cap[0,1]$ is bounded but not closed — rationals converge to $\sqrt2/2$, which is missing.
:::
:::

## The contraction mapping theorem

Many problems can be written as $x = T(x)$: find a **fixed point** of a map $T$. The simplest method is to iterate — start anywhere and compute $x_1 = T(x_0)$, $x_2 = T(x_1)$, and so on — and hope that the iterates converge. When $T$ shrinks distances by a fixed factor and the space is complete, the hope is fulfilled.

A map $T\colon X \to X$ is a **contraction** if there is a constant $k$ with $0 \le k < 1$ such that $d(T(x), T(y)) \le k\,d(x, y)$ for all $x, y \in X$.

::: theorem Contraction mapping theorem {#thm-contraction}
Let $(X, d)$ be a non-empty complete metric space and $T\colon X \to X$ a contraction with constant $k < 1$. Then $T$ has exactly one fixed point $x^*$. Moreover, for any starting point $x_0 \in X$, the iterates $x_{n+1} = T(x_n)$ converge to $x^*$, and

$$
d(x_n, x^*) \le \frac{k^n}{1 - k}\,d(x_0, x_1).
$$ {#eq-contraction-bound}
:::

::: proof
*The iterates form a Cauchy sequence.* By induction $d(x_{j+1}, x_j) \le k^j d(x_1, x_0)$: this holds for $j = 0$, and $d(x_{j+2}, x_{j+1}) = d(T(x_{j+1}), T(x_j)) \le k\,d(x_{j+1}, x_j)$. For $m > n$, the triangle inequality and the geometric series give

$$
d(x_m, x_n) \le \sum_{j=n}^{m-1}d(x_{j+1}, x_j) \le d(x_1, x_0)\sum_{j=n}^{\infty}k^j = \frac{k^n}{1 - k}\,d(x_1, x_0).
$$ {#eq-cauchy-iterates}

Since $k^n \to 0$, $(x_n)$ is Cauchy, and since $X$ is complete it converges to some $x^* \in X$.

*The limit is a fixed point.* $T$ is continuous (it is Lipschitz with constant $k$), so $T(x^*) = \lim T(x_n) = \lim x_{n+1} = x^*$.

*Uniqueness.* If $T(y^*) = y^*$ as well, then $d(x^*, y^*) = d(T(x^*), T(y^*)) \le k\,d(x^*, y^*)$, so $(1 - k)\,d(x^*, y^*) \le 0$ and $x^* = y^*$.

*The error bound.* Let $m \to \infty$ in [[#eq-cauchy-iterates]]; since $d(x_m, x_n) \to d(x^*, x_n)$ (by the triangle inequality), we get [[#eq-contraction-bound]].
:::

The bound [[#eq-contraction-bound]] is computable *before* the iteration starts, from the first step alone: it tells us how many iterations suffice for a given accuracy. The theorem also guarantees uniqueness, which is often the harder part of an existence-and-uniqueness problem.

::: example Solving x = cos x {#ex-cos}
Show that $x = \cos x$ has exactly one solution in $[0, 1]$, and that iterating $x_{n+1} = \cos x_n$ from $x_0 = 1$ converges to it.
::: solution
Let $X = [0, 1]$, which is complete as a closed subset of $\R$, and $T(x) = \cos x$. Since $\cos$ decreases on $[0, 1]$, $T(X) = [\cos 1, 1] \subseteq [0, 1]$, so $T$ maps $X$ to itself. By the mean value theorem, for $x, y \in [0, 1]$ there is $c$ between them with

$$
\abs{\cos x - \cos y} = \abs{\sin c}\,\abs{x - y} \le \sin(1)\,\abs{x - y},
$$

and $k = \sin 1 \approx 0.841 < 1$. So $T$ is a contraction, and [[#thm-contraction]] gives a unique fixed point $x^* \approx 0.739085$, the limit of the iterates from any starting point in $[0, 1]$. The a priori bound [[#eq-contraction-bound]], with $d(x_0, x_1) = 1 - \cos 1 \approx 0.460$, guarantees an error below $10^{-3}$ after $47$ steps ([[#exr-8-7]]); in practice $15$ steps suffice, because near $x^*$ the true contraction factor is $\abs{\sin x^*} \approx 0.674$.
:::
:::

::: widget cobweb
g: cos(x)
x0: 1
steps: 20
x: 0, 1.2
caption: The cobweb diagram for $x_{n+1} = \cos x_n$ from $x_0 = 1$. Because $\cos$ is decreasing, the orbit spirals inwards around the fixed point where the graph meets the diagonal $y = x$. Each step shrinks the distance to it by roughly the factor $\lvert\cos'(x^*)\rvert = \sin x^* \approx 0.67$, so each turn of the spiral (two steps) is about $0.45$ times the size of the last. Try other starting values: every orbit in $[0, 1]$ is drawn to the same point — uniqueness in action.
:::

::: application Solving differential equations by iteration
The initial value problem $y' = F(t, y)$, $y(0) = y_0$ is equivalent to the integral equation $y(t) = y_0 + \int_0^t F(s, y(s))\,ds$, a fixed-point problem for the map $(Ty)(t) = y_0 + \int_0^t F(s, y(s))\,ds$ on a space of continuous functions. For $y' = y$, $y(0) = 1$ on $[0, \tfrac12]$: $\abs{(Tf)(t) - (Tg)(t)} \le \int_0^t\abs{f - g} \le \tfrac12 d_\infty(f, g)$, so $T$ is a contraction of the complete space $(C[0, \tfrac12], d_\infty)$ ([[#thm-c-complete]]). Starting from $f_0 = 1$, the iterates are $1$, $1 + t$, $1 + t + \frac{t^2}{2}$, …, the partial sums of $e^t$. When $F$ is Lipschitz in $y$, the same argument proves the Picard–Lindelöf existence and uniqueness theorem ([[ode/existence-uniqueness]]); with $T(x) = x - f(x)/f'(x)$ it explains the convergence of Newton's method near a simple root ([[numerical-analysis/root-finding]]).
:::

::: warning Both hypotheses are needed
Without completeness: $T(x) = x/2$ is a contraction of $(0, 1]$ with no fixed point (the would-be fixed point $0$ is missing). Without a *uniform* constant $k < 1$: $T(x) = x + 1/x$ maps $[1, \infty)$ into itself and satisfies $\abs{T(x) - T(y)} = \abs{x - y}\bigl(1 - \frac{1}{xy}\bigr) < \abs{x - y}$ for $x \ne y$, yet $T(x) = x$ would need $1/x = 0$. Distances shrink, but by factors that creep up to $1$.
:::

::: history
Maurice Fréchet introduced abstract spaces with a distance in his doctoral thesis of 1906, unifying the convergence arguments that had been made separately for numbers, points and functions; Felix Hausdorff named them *metric spaces* in his *Grundzüge der Mengenlehre* (1914), which also developed open sets and topology systematically. The finite subcover property of $[a, b]$ goes back to Eduard Heine's 1872 work on uniform continuity and to Émile Borel, who in 1895 proved it for countable covers by open intervals; it was later extended to arbitrary covers. Émile Picard used the method of successive approximations to solve differential equations in 1890, and Stefan Banach isolated the abstract contraction principle in his thesis, published in 1922.
:::

## Where this leads

Metric spaces are the gateway to topology, where open sets are taken as the primitive notion and continuity is defined by [[#thm-continuity-open]](3): see [[topology/topological-spaces]], and [[topology/compactness]] for compactness without sequences. Complete metric spaces of functions are the setting of functional analysis. In [[measure-theory/lp-spaces]] the incomplete space of [[#ex-incomplete]] is completed to the Lebesgue space $L^1$, and the $p$-metrics pictured above become the $L^p$ norms on spaces of functions. The contraction mapping theorem gives existence and uniqueness for differential equations ([[ode/existence-uniqueness]]), the inverse and implicit function theorems of several-variable calculus, and the convergence analysis of iterative methods ([[numerical-analysis/iterative-methods]]).

::: summary
- A metric is a distance function: zero only between equal points, symmetric, and satisfying the triangle inequality ([[#def-metric]]). Examples: $d_1, d_2, d_\infty$ on $\R^n$, the discrete metric, $d_\infty$ and $d_1$ on $C[a, b]$.
- Open sets contain a ball around each of their points; unions and finite intersections of open sets are open; closed sets are exactly those containing the limits of their convergent sequences ([[#thm-closed-sequential]]).
- Continuity can be expressed with ε and δ, with sequences, or by "preimages of open sets are open" ([[#thm-continuity-open]]).
- Complete spaces: every Cauchy sequence converges. $\R^n$ and $(C[a, b], d_\infty)$ are complete ([[#thm-c-complete]]); $\Q$ and $(C[0,1], d_1)$ are not.
- Compact sets: every sequence has a subsequence converging in the set. In $\R^n$ these are exactly the closed bounded sets, and $[a, b]$ has the finite subcover property ([[#thm-heine-borel]]); in general closed and bounded is not enough.
- Continuous images of compact sets are compact, which gives the extreme value theorem in any metric space ([[#thm-compact-image]]).
- A contraction of a complete space has a unique fixed point, found by iteration with error at most $\frac{k^n}{1-k}d(x_0, x_1)$ ([[#thm-contraction]]).
:::

## Exercises

::: exercise Three distances {level=1 check="5"}
Find $d_1$, $d_2$ and $d_\infty$ between the points $(1, 2)$ and $(4, -2)$ of $\R^2$. (Enter $d_2$.)
::: solution
The coordinate differences are $3$ and $4$ in absolute value. So $d_1 = 3 + 4 = 7$, $d_2 = \sqrt{9 + 16} = 5$ and $d_\infty = \max(3, 4) = 4$, consistent with $d_\infty \le d_2 \le d_1 \le 2d_\infty$.
:::
:::

::: exercise Discrete spaces {level=1}
Let $X$ carry the discrete metric. Show that every subset of $X$ is both open and closed, and that a sequence converges if and only if it is eventually constant.
::: solution
For $x \in A \subseteq X$, the ball $B(x, \tfrac12) = \set{x}$ lies in $A$, so every $A$ is open; its complement is open too, so $A$ is also closed. If $x_n \to x$, then $d(x_n, x) < \tfrac12$ for $n \ge N$, which forces $x_n = x$ for $n \ge N$. Conversely an eventually constant sequence clearly converges.
:::
:::

::: exercise Distance functions are continuous {level=1}
Let $a$ be a point of a metric space $X$. Prove that $f(x) = d(x, a)$ satisfies $\abs{f(x) - f(y)} \le d(x, y)$, and deduce that the closed ball $\set{x : d(x, a) \le r}$ is closed.
::: solution
By the triangle inequality $d(x, a) \le d(x, y) + d(y, a)$, so $f(x) - f(y) \le d(x, y)$; exchanging $x$ and $y$ gives $f(y) - f(x) \le d(x, y)$. So $f$ is $1$-Lipschitz, hence continuous. The closed ball is $f^{-1}([0, r])$, the preimage of a closed subset of $\R$, so it is closed by [[#thm-continuity-open]].
:::
:::

::: exercise A bounded metric {level=2}
Prove that $\rho(x, y) = \dfrac{\abs{x - y}}{1 + \abs{x - y}}$ is a metric on $\R$, and that $x_n \to x$ in $\rho$ if and only if $x_n \to x$ in the usual metric.
::: hint
$\varphi(t) = \frac{t}{1+t}$ is increasing on $[0, \infty)$, and $\varphi(s + t) \le \varphi(s) + \varphi(t)$.
:::
::: solution
Properties 1 and 2 are clear. $\varphi(t) = 1 - \frac{1}{1+t}$ is increasing, and for $s, t \ge 0$,

$$
\varphi(s + t) = \frac{s}{1 + s + t} + \frac{t}{1 + s + t} \le \frac{s}{1+s} + \frac{t}{1+t} = \varphi(s) + \varphi(t).
$$

Hence $\rho(x, z) = \varphi(\abs{x - z}) \le \varphi(\abs{x-y} + \abs{y - z}) \le \rho(x, y) + \rho(y, z)$. For convergence: $\varphi$ is continuous with $\varphi(0) = 0$, so $\abs{x_n - x} \to 0$ implies $\rho(x_n, x) \to 0$; conversely $\abs{x_n - x} = \frac{\rho}{1 - \rho}$ (solve for $t$), which tends to $0$ when $\rho(x_n, x) \to 0$.
:::
:::

::: exercise Complete and closed {level=2}
Let $Y$ be a subset of a metric space $X$. Prove: (a) if $X$ is complete and $Y$ is closed, then $Y$ is complete; (b) if $Y$ is complete (as a subspace), then $Y$ is closed in $X$.
::: solution
(a) A Cauchy sequence in $Y$ is Cauchy in $X$, so it converges to some $x \in X$; since $Y$ is closed, $x \in Y$ by [[#thm-closed-sequential]]. (b) Let $y_n \in Y$ with $y_n \to x \in X$. A convergent sequence is Cauchy, so $(y_n)$ is Cauchy in $Y$ and converges to some $y \in Y$. By uniqueness of limits in $X$, $x = y \in Y$. So $Y$ is closed.
:::
:::

::: exercise Non-negative functions {level=2}
Prove that $F = \set{f \in C[0, 1] : f(x) \ge 0 \text{ for all } x}$ is closed in $(C[0, 1], d_\infty)$ but is not open.
::: solution
If $f_n \in F$ and $f_n \to f$ uniformly, then for each $x$, $f(x) = \lim f_n(x) \ge 0$ (limits preserve weak inequalities), so $f \in F$, and $F$ is closed. It is not open: the zero function lies in $F$, but for every $r > 0$ the constant function $-r/2$ lies in the ball $B(0, r)$ and not in $F$.
:::
:::

::: exercise Counting iterations {level=2 check="47"}
For $T(x) = \cos x$ on $[0, 1]$ with $k = \sin 1$ and $x_0 = 1$, find the smallest $n$ for which the bound [[#eq-contraction-bound]] guarantees $\abs{x_n - x^*} < 10^{-3}$.
::: solution
Here $d(x_0, x_1) = 1 - \cos 1 \approx 0.45970$ and $k = \sin 1 \approx 0.84147$, so we need $\frac{k^n}{1-k}\cdot 0.45970 < 10^{-3}$, that is $k^n < 3.449\times10^{-4}$, or $n > \frac{\ln(3.449\times 10^{-4})}{\ln 0.84147} \approx 46.2$. So $n = 47$. (The true error drops below $10^{-3}$ after $15$ steps: the a priori bound is safe but pessimistic.)
:::
:::

::: exercise Uniform continuity on compact sets {level=3}
Let $K$ be a compact metric space and $f\colon K \to Y$ continuous. Prove that $f$ is uniformly continuous: for every $\eps > 0$ there is $\delta > 0$ with $\rho(f(x), f(y)) < \eps$ whenever $d(x, y) < \delta$.
::: hint
Copy the proof of [[real-analysis/continuity#thm-heine-cantor]], replacing Bolzano–Weierstrass by compactness.
:::
::: solution
Suppose not. Then there are $\eps_0 > 0$ and points $x_n, y_n \in K$ with $d(x_n, y_n) < 1/n$ but $\rho(f(x_n), f(y_n)) \ge \eps_0$. By compactness a subsequence $x_{n_k} \to x \in K$, and then $d(y_{n_k}, x) \le d(y_{n_k}, x_{n_k}) + d(x_{n_k}, x) \to 0$, so $y_{n_k} \to x$ too. By continuity $f(x_{n_k}) \to f(x)$ and $f(y_{n_k}) \to f(x)$, so $\rho(f(x_{n_k}), f(y_{n_k})) \le \rho(f(x_{n_k}), f(x)) + \rho(f(x), f(y_{n_k})) \to 0$, contradicting $\rho(f(x_{n_k}), f(y_{n_k})) \ge \eps_0$.
:::
:::

::: exercise Shrinking maps on compact spaces {level=3}
Let $K$ be a non-empty compact metric space and $T\colon K \to K$ a map with $d(T(x), T(y)) < d(x, y)$ whenever $x \ne y$. Prove that $T$ has exactly one fixed point. (Compare the warning above: on the non-compact space $[1, \infty)$ this fails.)
::: hint
Minimise the continuous function $g(x) = d(x, T(x))$ over $K$.
:::
::: solution
$T$ is continuous (it is $1$-Lipschitz), so $g(x) = d(x, T(x))$ is continuous: $\abs{g(x) - g(y)} \le d(x, y) + d(T(x), T(y)) \le 2d(x, y)$. By [[#thm-compact-image]] $g$ attains its minimum at some $x^* \in K$. If $T(x^*) \ne x^*$, then $g(T(x^*)) = d(T(x^*), T(T(x^*))) < d(x^*, T(x^*)) = g(x^*)$, contradicting minimality. So $T(x^*) = x^*$. If $y^*$ were another fixed point, $d(x^*, y^*) = d(T(x^*), T(y^*)) < d(x^*, y^*)$, which is impossible.
:::
:::
