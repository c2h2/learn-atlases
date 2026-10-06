We want a measure $\lambda$ on the real line that deserves to be called *length*: it should give every interval its length, $\lambda([a, b]) = b - a$; it should be translation invariant, $\lambda(E + t) = \lambda(E)$; and, being a measure ([[measure-theory/sigma-algebras#def-measure]]), it should be countably additive. Such a measure exists — it is **Lebesgue measure** — but its construction is subtle, for a reason that we meet at the end of the chapter: it cannot be defined on *all* subsets of $\R$.

The construction has three steps, and the ideas are as important as the result, because the same steps build measures of area and volume, probability measures on spaces of sequences, and many others.

1. Define the **outer measure** $\lambda^*(A)$ of *every* set $A \subseteq \R$ by covering $A$ as economically as possible with countably many intervals. This is easy, and $\lambda^*$ is monotone and countably subadditive, but not additive.
2. Select the sets that **split every other set additively** — Carathéodory's criterion. They form a σ-algebra, and on it $\lambda^*$ is countably additive.
3. Check that intervals, and hence all Borel sets, are among the selected sets.

## Outer measure

For an open interval $I = (a, b)$ write $\ell(I) = b - a$ for its length.

::: definition Lebesgue outer measure {#def-outer-measure}
For $A \subseteq \R$, the **Lebesgue outer measure** of $A$ is

$$
\lambda^*(A) = \inf\set{\sum_{k=1}^\infty\ell(I_k) : I_1, I_2, \ldots \text{ open intervals with } A \subseteq \bigcup_{k=1}^\infty I_k}.
$$

The value may be $\infty$ (if every such sum diverges).
:::

The *countable* covers are what make this definition powerful. With finite covers we would get the older Jordan content, under which the rationals in $[0, 1]$ would have size $1$ (see [[#ex-rationals-measure]]). With countable covers they become negligible.

::: theorem Properties of outer measure {#thm-outer-properties}
1. $\lambda^*(\varnothing) = 0$, and $\lambda^*(A) \le \lambda^*(B)$ whenever $A \subseteq B$.
2. (**Countable subadditivity.**) $\lambda^*\bigl(\bigcup_{n=1}^\infty A_n\bigr) \le \sum_{n=1}^\infty\lambda^*(A_n)$ for all sets $A_n \subseteq \R$.
3. (**Translation invariance.**) $\lambda^*(A + t) = \lambda^*(A)$ for every $t \in \R$, where $A + t = \set{a + t : a \in A}$.
4. Every countable set has outer measure $0$.
:::

::: proof
(1) The empty set is covered by intervals of length $\eps/2^k$, for any $\eps > 0$. Every cover of $B$ is a cover of $A$, so the infimum for $A$ is over a larger family and is at most the infimum for $B$.

(2) We may assume every $\lambda^*(A_n)$ is finite. Let $\eps > 0$. For each $n$ choose open intervals $I_{n,k}$ covering $A_n$ with $\sum_k\ell(I_{n,k}) < \lambda^*(A_n) + \eps/2^n$. All the intervals $I_{n,k}$ together form a countable cover of $\bigcup_n A_n$, so

$$
\lambda^*\Bigl(\bigcup_n A_n\Bigr) \le \sum_{n,k}\ell(I_{n,k}) < \sum_n\Bigl(\lambda^*(A_n) + \frac{\eps}{2^n}\Bigr) = \sum_n\lambda^*(A_n) + \eps.
$$

(Here the intervals $I_{n,k}$ are taken in a single sequence; since the terms are non-negative, every finite partial sum of their lengths, and hence the whole sum, is at most $\sum_n\sum_k\ell(I_{n,k})$.) As $\eps$ was arbitrary, the inequality follows.

(3) The intervals $I_k$ cover $A$ if and only if the translated intervals $I_k + t$ cover $A + t$, and translation preserves lengths.

(4) If $A = \set{a_1, a_2, \dots}$, cover $a_k$ by an interval of length $\eps/2^k$; the total length is $\eps$.
:::

::: widget cantor
mode: rationals
size: 8
caption: The positive rationals can be listed $q_1, q_2, q_3, \dots$ by walking the zig-zag through the table of fractions. Covering $q_k$ by an open interval of length $\eps/2^k$ covers every positive rational with total length at most $\eps$ — however small $\eps$ is — and listing $0, q_1, -q_1, q_2, -q_2, \dots$ instead does the same for all of $\Q$. That is why $\lambda^*(\Q) = 0$, even though $\Q$ is dense and meets every interval.
:::

::: example The rationals: countable versus finite covers {#ex-rationals-measure}
Show that $\lambda^*(\Q\cap[0, 1]) = 0$, but that any *finite* family of open intervals covering $\Q\cap[0, 1]$ has total length at least $1$.
::: solution
*Countable covers.* List the rationals of $[0, 1]$ as $q_1, q_2, \dots$ and cover $q_k$ by the interval $\bigl(q_k - \eps2^{-k-1}, q_k + \eps2^{-k-1}\bigr)$ of length $\eps 2^{-k}$. The total length is $\eps$, so $\lambda^*(\Q\cap[0,1]) \le \eps$ for every $\eps > 0$.

*Finite covers.* Let $I_1, \dots, I_m$ be open intervals covering $\Q\cap[0,1]$, with union $U$. Then $[0, 1]\setminus U$ is a finite union of intervals (complements and intersections of finitely many intervals are finite unions of intervals) containing no rational number. An interval of positive length contains rationals, so each of these intervals is a single point: $[0, 1]\setminus U$ is a finite set $F$. Since the $I_k$ themselves form a cover of $U$, and $[0, 1] \subseteq U \cup F$, we get, using $\lambda^*([0, 1]) = 1$ (proved in [[#thm-outer-interval]] below),

$$
1 = \lambda^*([0, 1]) \le \lambda^*(U) + \lambda^*(F) \le \sum_{k=1}^m\ell(I_k) + 0.
$$

So finite covers cannot see that the rationals are small; this is why the older Jordan content, defined with finite covers, cannot measure $\Q\cap[0,1]$ at all.
:::
:::

The first real test of the definition is whether it gets intervals right. The inequality $\lambda^*([a, b]) \le b - a$ is easy; the reverse inequality needs compactness.

::: theorem Outer measure of an interval {#thm-outer-interval}
For every interval $I$ with end-points $a \le b$ (open, closed or half-open), $\lambda^*(I) = b - a$. Unbounded intervals have infinite outer measure.
:::

::: proof
*Closed intervals, upper bound.* For every $\eps > 0$, the single interval $(a - \eps, b + \eps)$ covers $[a, b]$, so $\lambda^*([a, b]) \le b - a + 2\eps$, hence $\le b - a$.

*Closed intervals, lower bound.* Let $(I_k)$ be any countable cover of $[a, b]$ by open intervals. By the Heine–Borel theorem ([[real-analysis/metric-spaces#thm-heine-borel]]) finitely many of them already cover $[a, b]$; it suffices to show that these have total length greater than $b - a$. Choose one of them, $(a_1, b_1)$, containing $a$. If $b_1 \le b$, then $b_1 \in [a, b]$ is covered by another of the finitely many intervals, $(a_2, b_2)$, with $a_2 < b_1 < b_2$. Continue in this way: as long as $b_j \le b$, choose a further interval $(a_{j+1}, b_{j+1})$ of the finite cover containing $b_j$. The right end-points strictly increase, so no interval is chosen twice, and the process stops after at most finitely many steps, with some $b_m > b$. Then

$$
\sum_{j=1}^m (b_j - a_j) = b_m - a_1 + \sum_{j=1}^{m-1}(b_j - a_{j+1}) \ge b_m - a_1 > b - a,
$$

because each $a_{j+1} < b_j$, $b_m > b$ and $a_1 < a$. So every cover has total length greater than $b - a$, and $\lambda^*([a, b]) \ge b - a$.

*Other intervals.* If $I$ has end-points $a < b$, then for small $\eps > 0$, $[a + \eps, b - \eps] \subseteq I \subseteq [a, b]$, so by monotonicity $b - a - 2\eps \le \lambda^*(I) \le b - a$. An unbounded interval contains intervals $[c, c + n]$ for every $n$, so its outer measure is at least $n$ for every $n$.
:::

Combined with property 4, this gives a measure-theoretic proof that $[0, 1]$ is uncountable: a countable set has outer measure $0$, but $[0, 1]$ has outer measure $1$ (compare [[real-analysis/real-numbers#thm-r-uncountable]]).

::: warning Outer measure is not additive
It is natural to hope that $\lambda^*(A \cup B) = \lambda^*(A) + \lambda^*(B)$ for disjoint sets. For "reasonable" sets this is true, but not in general: [[#thm-vitali]] below implies that there are disjoint sets $A$, $B$ with $\lambda^*(A \cup B) < \lambda^*(A) + \lambda^*(B)$ ([[#exr-2-7]]). Outer measure measures every set, but it is not a measure on $\mathcal{P}(\R)$. We must restrict it to a smaller family of sets.
:::

## Carathéodory's criterion

Which sets should we keep? Carathéodory's answer is to keep exactly those sets that cut every set of $\R$ into two pieces whose outer measures add up.

::: definition Lebesgue measurable set {#def-caratheodory}
A set $E \subseteq \R$ is **Lebesgue measurable** if for every set $A \subseteq \R$,

$$
\lambda^*(A) = \lambda^*(A \cap E) + \lambda^*(A \setminus E).
$$ {#eq-caratheodory}

The family of Lebesgue measurable sets is denoted $\mathcal{L}$.
:::

The set $A$ in [[#eq-caratheodory]] is a "test set", and $E$ must pass every test. Since $A = (A \cap E) \cup (A \setminus E)$, subadditivity always gives $\le$; so $E$ is measurable as soon as $\lambda^*(A) \ge \lambda^*(A\cap E) + \lambda^*(A \setminus E)$ for every $A$ with $\lambda^*(A) < \infty$. The criterion is symmetric in $E$ and its complement.

::: intuition Why test against every set?
Imagine trying to define the area of a region $E$ by squeezing it between inner and outer approximations. Carathéodory's criterion is a cleverer version: $E$ is measurable if its boundary is "thin" enough that, whatever set $A$ we look at, cutting $A$ along $E$ loses nothing. A set like Vitali's, which is spread through every interval in a hopelessly irregular way, fails the test for some $A$: the two pieces $A\cap E$ and $A \setminus E$ each need covers almost as large as a cover of all of $A$.
:::

::: theorem Carathéodory's theorem {#thm-caratheodory}
$\mathcal{L}$ is a σ-algebra, it contains every set of outer measure $0$, and the restriction of $\lambda^*$ to $\mathcal{L}$ is a complete measure.
:::

::: proof
The proof uses only properties 1 and 2 of [[#thm-outer-properties]], so it works for any outer measure.

*Step 1: null sets and complements.* If $\lambda^*(Z) = 0$, then for every $A$, $\lambda^*(A\cap Z) + \lambda^*(A\setminus Z) \le 0 + \lambda^*(A)$ by monotonicity, so $Z \in \mathcal{L}$. In particular $\varnothing \in \mathcal{L}$. Since [[#eq-caratheodory]] is unchanged when $E$ is replaced by $E^c$, $\mathcal{L}$ is closed under complements, and $\R = \varnothing^c \in \mathcal{L}$.

*Step 2: finite unions.* Let $E, F \in \mathcal{L}$ and $A \subseteq \R$. Applying the criterion for $E$ to $A$, and then the criterion for $F$ to $A\setminus E$,

$$
\lambda^*(A) = \lambda^*(A \cap E) + \lambda^*\bigl((A\setminus E)\cap F\bigr) + \lambda^*\bigl(A\setminus(E \cup F)\bigr) \ge \lambda^*\bigl(A \cap (E\cup F)\bigr) + \lambda^*\bigl(A \setminus(E\cup F)\bigr),
$$

using subadditivity and $(A\cap E)\cup\bigl((A\setminus E)\cap F\bigr) = A \cap(E \cup F)$. So $E \cup F \in \mathcal{L}$; with step 1, $\mathcal{L}$ is closed under finite unions, intersections and differences.

*Step 3: additivity on test sets.* If $E_1, \dots, E_n \in \mathcal{L}$ are disjoint and $B_n = E_1\cup\cdots\cup E_n$, then for every $A$,

$$
\lambda^*(A \cap B_n) = \sum_{k=1}^n\lambda^*(A\cap E_k).
$$ {#eq-additive-on-tests}

For $n = 1$ this is trivial. Applying the criterion for $E_n$ to the test set $A \cap B_n$: since the $E_k$ are disjoint, $A\cap B_n\cap E_n = A \cap E_n$ and $(A\cap B_n)\setminus E_n = A \cap B_{n-1}$, so $\lambda^*(A\cap B_n) = \lambda^*(A\cap E_n) + \lambda^*(A\cap B_{n-1})$, and induction finishes.

*Step 4: countable unions.* Let $E_1, E_2, \ldots \in \mathcal{L}$ and $E = \bigcup_k E_k$. Replacing $E_k$ by $E_k\setminus(E_1\cup\cdots\cup E_{k-1})$, which is in $\mathcal{L}$ by step 2 and has the same union, we may assume the $E_k$ are disjoint. Let $B_n = E_1\cup\cdots\cup E_n \in \mathcal{L}$. For every $A$, by [[#eq-additive-on-tests]] and monotonicity ($A \setminus B_n \supseteq A \setminus E$),

$$
\lambda^*(A) = \lambda^*(A\cap B_n) + \lambda^*(A\setminus B_n) \ge \sum_{k=1}^n\lambda^*(A\cap E_k) + \lambda^*(A\setminus E).
$$

Letting $n \to \infty$ and then using countable subadditivity,

$$
\lambda^*(A) \ge \sum_{k=1}^\infty\lambda^*(A\cap E_k) + \lambda^*(A\setminus E) \ge \lambda^*(A\cap E) + \lambda^*(A\setminus E).
$$ {#eq-countable-step}

So $E \in \mathcal{L}$, and $\mathcal{L}$ is a σ-algebra.

*Step 5: countable additivity and completeness.* Taking $A = E$ in [[#eq-countable-step]] gives $\lambda^*(E) \ge \sum_k\lambda^*(E_k)$, and subadditivity gives the reverse inequality, so $\lambda^*(\bigcup E_k) = \sum\lambda^*(E_k)$ for disjoint $E_k \in \mathcal{L}$. Finally, a subset of a null set has outer measure $0$ and so lies in $\mathcal{L}$ by step 1: the measure is complete.
:::

::: quiz
Which of the following statements about Lebesgue outer measure $\lambda^*$ are true? Select all that apply.
- [x] $\lambda^*(A)$ is defined for every subset $A \subseteq \R$.
- [ ] $\lambda^*(A \cup B) = \lambda^*(A) + \lambda^*(B)$ for all disjoint $A, B$.
- [ ] If $\lambda^*(A) = 0$, then $A$ is countable.
- [x] A set with $\lambda^*(A) = 0$ is Lebesgue measurable.
::: solution
Outer measure is defined for all sets, and null sets pass Carathéodory's test (step 1 of the proof of [[#thm-caratheodory]]). Additivity fails for some disjoint pairs ([[#exr-2-7]]) — that is why we restrict to $\mathcal{L}$. And null sets can be uncountable: the Cantor set below is an example.
:::
:::

## Lebesgue measure

Carathéodory's theorem would be useless if $\mathcal{L}$ contained only null sets and their complements. The crucial check is that half-lines pass the test.

::: theorem Borel sets are Lebesgue measurable {#thm-borel-measurable}
Every Borel set is Lebesgue measurable: $\mathcal{B}(\R) \subseteq \mathcal{L}$.
:::

::: proof
By [[measure-theory/sigma-algebras#thm-borel-generators]] the half-lines $(c, \infty)$ generate $\mathcal{B}(\R)$, and $\mathcal{L}$ is a σ-algebra, so it suffices to show that $E = (c, \infty)$ is measurable. Let $A \subseteq \R$ with $\lambda^*(A) < \infty$ and let $\eps > 0$. Choose open intervals $I_k$ covering $A$ with $\sum_k\ell(I_k) < \lambda^*(A) + \eps$. Each $I_k$ splits into the two intervals $I_k' = I_k \cap (c, \infty)$ and $I_k'' = I_k \cap (-\infty, c]$ (either may be empty), whose lengths add up to $\ell(I_k)$. The $I_k'$ cover $A\cap E$ and the $I_k''$ cover $A \setminus E$. They are not all open, but by [[#thm-outer-interval]] each has outer measure equal to its length, so by subadditivity

$$
\lambda^*(A \cap E) + \lambda^*(A\setminus E) \le \sum_k\lambda^*(I_k') + \sum_k\lambda^*(I_k'') = \sum_k\ell(I_k) < \lambda^*(A) + \eps.
$$

As $\eps$ is arbitrary, $E$ satisfies [[#eq-caratheodory]].
:::

::: definition Lebesgue measure {#def-lebesgue-measure}
**Lebesgue measure** is the restriction $\lambda$ of the outer measure $\lambda^*$ to the σ-algebra $\mathcal{L}$ of Lebesgue measurable sets. By [[#thm-caratheodory]], [[#thm-outer-interval]] and [[#thm-borel-measurable]], $(\R, \mathcal{L}, \lambda)$ is a complete measure space, every Borel set is measurable, and $\lambda(I)$ is the length of every interval $I$.
:::

Lebesgue measure is translation invariant: by [[#thm-outer-properties]](3), $E + t$ passes Carathéodory's test whenever $E$ does, and $\lambda(E + t) = \lambda(E)$. It is σ-finite, since $\R = \bigcup_n[-n, n]$. And it is the only measure on $\mathcal{B}(\R)$ that gives intervals their lengths: two such measures agree on the π-system of intervals $(a, b]$ inside each $[-n, n]$, hence on all Borel subsets of $[-n, n]$ by [[measure-theory/sigma-algebras#thm-uniqueness]], and hence everywhere by continuity from below.

::: example Open sets {#ex-open-sets}
Show that every open set $U \subseteq \R$ is the union of countably many pairwise disjoint open intervals, and deduce that $\lambda(U)$ is the sum of their lengths.
::: solution
For $x \in U$, let $I_x$ be the union of all open intervals $J$ with $x \in J \subseteq U$. A union of intervals with a common point is an interval, and a union of open sets is open, so $I_x$ is the largest open interval (possibly unbounded) with $x \in I_x \subseteq U$. If $I_x \cap I_y \ne \varnothing$, then $I_x \cup I_y$ is an open interval in $U$ containing $x$, so $I_x \cup I_y \subseteq I_x$ by maximality, and likewise $\subseteq I_y$: the two coincide. So the distinct intervals $I_x$ are pairwise disjoint, and their union is $U$. Each contains a rational number, and disjoint intervals contain different ones, so there are only countably many. By countable additivity and [[#thm-outer-interval]], $\lambda(U) = \sum\ell(I)$ over these intervals. For instance $U = \bigcup_{n\ge1}(n, n + 2^{-n})$ is unbounded but has measure $1$.
:::
:::

::: example An open dense set of small measure {#ex-open-dense}
Given $\eps > 0$, construct an open set $U \subseteq \R$ that meets every interval but has $\lambda(U) \le \eps$. Deduce that $K = [0, 1]\setminus U$ is a closed set containing no interval, with $\lambda(K) \ge 1 - \eps$.
::: solution
List the rationals as $q_1, q_2, \dots$ and let $U = \bigcup_k\bigl(q_k - \eps2^{-k-1}, q_k + \eps 2^{-k-1}\bigr)$. It is open, it contains $\Q$ and so meets every interval, and by subadditivity $\lambda(U) \le \sum_k\eps2^{-k} = \eps$. The set $K = [0, 1]\cap U^c$ is closed; it contains no interval of positive length, since every such interval contains a rational, which lies in $U$; and $\lambda(K) = 1 - \lambda([0,1]\cap U) \ge 1 - \eps$. So a set that is topologically thin (closed with empty interior) can be large in measure, and one that is topologically large (open and dense) can be small. Measure and topology measure different things.
:::
:::

How large is $\mathcal{L}$? Every set you can describe explicitly is in it, and in a precise sense every measurable set is a Borel set up to a null set: measurable sets can be approximated from outside by open sets and from inside by closed sets.

::: theorem Regularity of Lebesgue measure {#thm-regularity}
For every $A \subseteq \R$, $\lambda^*(A) = \inf\set{\lambda(U) : U \supseteq A,\ U \text{ open}}$. Moreover, for $E \subseteq \R$ the following are equivalent:

1. $E$ is Lebesgue measurable;
2. for every $\eps > 0$ there is an open $U \supseteq E$ with $\lambda^*(U \setminus E) < \eps$;
3. for every $\eps > 0$ there is a closed $F \subseteq E$ with $\lambda^*(E \setminus F) < \eps$;
4. $E = G \setminus Z$ for a $G_\delta$ set $G$ and a null set $Z$.
:::

::: proof
*Outer regularity.* Monotonicity gives $\lambda^*(A) \le \lambda(U)$ for every open $U \supseteq A$. Conversely, if $\lambda^*(A) < \infty$ and $\eps > 0$, choose open intervals $I_k$ covering $A$ with $\sum\ell(I_k) < \lambda^*(A) + \eps$; their union $U$ is open, contains $A$, and $\lambda(U) \le \sum\ell(I_k) < \lambda^*(A) + \eps$.

*(1) ⇒ (2).* Suppose first $\lambda(E) < \infty$. By outer regularity there is an open $U \supseteq E$ with $\lambda(U) < \lambda(E) + \eps$, and since $E$ is measurable, $\lambda(U\setminus E) = \lambda(U) - \lambda(E) < \eps$. In general, apply this to $E_n = E \cap [-n, n]$ with $\eps/2^n$, obtaining open $U_n \supseteq E_n$ with $\lambda(U_n \setminus E_n) < \eps/2^n$; then $U = \bigcup U_n$ is open, contains $E$, and $U \setminus E \subseteq \bigcup_n(U_n \setminus E_n)$ has measure less than $\eps$.

*(2) ⇒ (4).* Choose open $U_n \supseteq E$ with $\lambda^*(U_n\setminus E) < 1/n$ and let $G = \bigcap_n U_n$, a $G_\delta$ set containing $E$. Then $Z = G \setminus E \subseteq U_n \setminus E$ has $\lambda^*(Z) < 1/n$ for every $n$, so $Z$ is null, and $E = G\setminus Z$.

*(4) ⇒ (1).* $G$ is Borel, hence measurable, and $Z$ is measurable by [[#thm-caratheodory]]; so $E = G \cap Z^c \in \mathcal{L}$.

*(1) ⇔ (3).* $E$ is measurable if and only if $E^c$ is, which by (1) ⇔ (2) holds if and only if for each $\eps$ there is an open $U \supseteq E^c$ with $\lambda^*(U \setminus E^c) < \eps$. Put $F = U^c$: it is closed, $F \subseteq E$, and $E\setminus F = E \cap U = U \setminus E^c$.
:::

So a Lebesgue measurable set is a $G_\delta$ set minus a null set, or equally an $F_\sigma$ set plus a null set; the Lebesgue σ-algebra is the **completion** of the Borel σ-algebra ([[measure-theory/sigma-algebras#exr-1-9]]). Intersecting the closed sets in (3) with $[-n, n]$ shows also that $\lambda(E) = \sup\set{\lambda(K) : K \subseteq E \text{ compact}}$ ([[#exr-2-9]]).

## The Cantor set

Countable sets have measure zero. Are there *uncountable* null sets? The most famous example is built by repeatedly removing middle thirds.

::: example The Cantor set {#ex-cantor-set}
Let $C_0 = [0, 1]$, and obtain $C_{n+1}$ from $C_n$ by removing the open middle third of each of its intervals: $C_1 = [0, \tfrac13]\cup[\tfrac23, 1]$, $C_2 = [0, \tfrac19]\cup[\tfrac29, \tfrac13]\cup[\tfrac23, \tfrac79]\cup[\tfrac89, 1]$, and so on. The **Cantor set** is $C = \bigcap_n C_n$. Show that $C$ is compact, uncountable, and of Lebesgue measure $0$.
::: solution
*Measure.* $C_n$ is a disjoint union of $2^n$ closed intervals, each of length $3^{-n}$, so $\lambda(C_n) = (2/3)^n$. The sets decrease and $\lambda(C_0) = 1 < \infty$, so by continuity from above ([[measure-theory/sigma-algebras#thm-continuity-measure]]) $\lambda(C) = \lim(2/3)^n = 0$. Equivalently, the removed intervals have total length $\sum_{n\ge1}2^{n-1}/3^n = 1$: everything is removed, as far as length is concerned.

*Compact.* $C$ is an intersection of closed sets, hence closed, and it is bounded.

*Uncountable.* A number $x \in [0, 1]$ lies in $C$ exactly when it has a ternary (base $3$) expansion $x = \sum_{k\ge1}d_k3^{-k}$ using only the digits $d_k \in \set{0, 2}$: at stage $k$, removing the middle third removes the numbers whose $k$-th digit must be $1$. (Points such as $\tfrac13 = 0.1000\ldots_3 = 0.0222\ldots_3$ have an expansion of the right kind.) Different digit sequences in $\set{0, 2}^{\N}$ give different numbers, so $C$ is in bijection with the set of all infinite sequences of $0$s and $2$s, which is uncountable by Cantor's diagonal argument ([[proofs/cardinality]]). In fact the map $\sum d_k3^{-k} \mapsto \sum(d_k/2)2^{-k}$ sends $C$ *onto* $[0, 1]$, so $C$ has as many points as $[0,1]$.
:::
:::

::: widget sequence
a: 2^(n-1)/3^n
mode: both
N: 30
limit: 1
caption: The lengths removed when building the Cantor set: $2^{n-1}$ intervals of length $3^{-n}$ at stage $n$. Their partial sums climb to $1$, the whole length of $[0, 1]$, so the Cantor set that remains has measure $0$ — although it still contains uncountably many points, among them $\tfrac14 = 0.0202\ldots_3$, which is never an end-point of a removed interval.
:::

The Cantor set settles a question about $\mathcal{L}$ itself. Since $\lambda(C) = 0$ and Lebesgue measure is complete, *every* subset of $C$ is Lebesgue measurable. $C$ has the cardinality $\mathfrak{c}$ of $\R$, so $\mathcal{L}$ has at least $2^{\mathfrak{c}}$ members; but there are only $\mathfrak{c}$ Borel sets. Hence **there are Lebesgue measurable sets that are not Borel**. (A specific one, the preimage of a non-measurable set under a homeomorphism built from the Cantor function, appears in [[measure-theory/measurable-functions#ex-cantor-function]].)

::: quiz
What is the Lebesgue measure of the set of irrational numbers in $[0, 1]$?
- [ ] $0$, because the irrationals contain no interval
- [x] $1$
- [ ] It is not defined, because the irrationals are not measurable
- [ ] $\tfrac12$
::: solution
$[0, 1]\cap\Q$ is countable, hence measurable with measure $0$, and $[0,1]$ has measure $1$. The irrationals in $[0, 1]$ form the measurable set $[0,1]\setminus\Q$, of measure $1 - 0 = 1$. A set can have full measure without containing any interval, and — as the Cantor set shows — a set can be uncountable and have measure $0$. Size in the sense of measure is different from size in the sense of cardinality or of topology.
:::
:::

## A non-measurable set

Is every subset of $\R$ Lebesgue measurable? If it were, Lebesgue measure would be a countably additive, translation invariant measure on all subsets of $\R$, assigning length $1$ to $[0, 1]$. Vitali showed that no such measure exists.

::: theorem Vitali's theorem {#thm-vitali}
Assuming the axiom of choice, there is a subset $V \subseteq [0, 1]$ that is not Lebesgue measurable. More precisely, no countably additive, translation invariant measure defined on all subsets of $\R$ can give $[0, 1]$ a finite positive measure.
:::

::: proof
Call $x, y \in [0, 1]$ equivalent if $x - y \in \Q$. This is an equivalence relation ([[proofs/relations]]), and its classes are the sets $(x + \Q)\cap[0, 1]$. By the axiom of choice there is a set $V \subseteq [0, 1]$ containing exactly one element from each class. Let $q_1, q_2, \ldots$ be an enumeration of $\Q\cap[-1, 1]$ and put $V_k = V + q_k$.

*The translates are disjoint.* If $v + q_j = w + q_k$ with $v, w \in V$, then $v - w = q_k - q_j \in \Q$, so $v$ and $w$ are equivalent; as $V$ contains one element per class, $v = w$, and then $q_j = q_k$, so $j = k$.

*They cover $[0, 1]$ and lie in $[-1, 2]$.* If $x \in [0, 1]$, let $v \in V$ be the representative of its class. Then $x - v \in \Q$ and $\abs{x - v} \le 1$, so $x - v = q_k$ for some $k$ and $x \in V_k$. And each $V_k \subseteq [0,1] + [-1, 1] = [-1, 2]$. Hence

$$
[0, 1] \subseteq \bigcup_{k=1}^\infty V_k \subseteq [-1, 2].
$$

Now suppose $\mu$ is a translation invariant measure defined on a translation invariant σ-algebra containing $V$ and all intervals, with $\mu([0, 1])$ finite and positive (for instance $\mu = \lambda$, if $V$ were Lebesgue measurable). Then all $V_k$ have measure $\mu(V)$, and by countable additivity and monotonicity

$$
\mu([0, 1]) \le \sum_{k=1}^\infty\mu(V) \le \mu([-1, 2]) \le 3\mu([0,1]).
$$

If $\mu(V) = 0$ the middle sum is $0$, contradicting $\mu([0,1]) > 0$; if $\mu(V) > 0$ the sum is $\infty$, contradicting $\mu([-1,2]) < \infty$. So no such $\mu$ exists, and in particular $V \notin \mathcal{L}$.
:::

::: warning Non-measurable sets are not found in nature
Vitali's set is not constructed but *chosen*, using the axiom of choice to pick one point from each of uncountably many classes. This is unavoidable: Robert Solovay proved in 1970 that it is consistent with the other axioms of set theory (assuming an inaccessible cardinal is consistent) that every subset of $\R$ is Lebesgue measurable. In practice every set that arises from limits, unions, intersections, continuous functions and the like is Borel, hence measurable. Non-measurable sets explain *why* we need σ-algebras; they do not obstruct analysis.
:::

::: history
Henri Lebesgue defined the measure of a set in his 1902 thesis *Intégrale, longueur, aire*, building on Émile Borel's measure of 1898: he defined outer and inner measures by approximation with intervals and called a set measurable when the two agree. Giuseppe Vitali constructed his non-measurable set in 1905. Constantin Carathéodory found the criterion used in this chapter in 1914; it made the construction independent of inner measure and applicable to any outer measure, and it is how most measures are built today. The Cantor set appears in a paper of Henry Smith (1875) and was studied by Georg Cantor in 1883. In 1970 Robert Solovay showed that without the axiom of choice one cannot prove that non-measurable sets exist.
:::

## Where this leads

With Lebesgue measure in hand we can integrate. [[measure-theory/measurable-functions]] identifies the functions whose level sets are measurable, and [[measure-theory/lebesgue-integral]] defines $\int f\,d\lambda$ by approximating $f$ from below with simple functions, which are finite combinations of indicator functions of measurable sets. The construction of this chapter generalises at once: covering by rectangles gives Lebesgue measure on $\R^n$ (area and volume, as used informally in [[multivariable/multiple-integrals]]); replacing $b - a$ by $F(b) - F(a)$ for an increasing right-continuous $F$ gives the Lebesgue–Stieltjes measure $\mu_F$, with $\mu_F((a, b]) = F(b) - F(a)$, and those for which $F$ rises from $0$ at $-\infty$ to $1$ at $+\infty$ are exactly the distributions of real random variables ([[probability/continuous-random-variables]]); and Carathéodory's theorem builds the measure for infinitely many coin tosses that probability theory needs.

::: summary
- Lebesgue outer measure $\lambda^*(A)$ is the infimum of total lengths of countable covers of $A$ by open intervals ([[#def-outer-measure]]). It is defined for all sets, monotone, countably subadditive and translation invariant; countable sets have outer measure $0$.
- $\lambda^*([a, b]) = b - a$; the proof needs the Heine–Borel theorem ([[#thm-outer-interval]]).
- Carathéodory's criterion selects the sets $E$ with $\lambda^*(A) = \lambda^*(A\cap E) + \lambda^*(A\setminus E)$ for all $A$; they form a σ-algebra on which $\lambda^*$ is a complete measure ([[#thm-caratheodory]]).
- All Borel sets are measurable; Lebesgue measure gives intervals their lengths, is translation invariant, and is the unique such measure on Borel sets.
- Regularity: measurable sets are approximated from outside by open sets and from inside by closed sets; each is a $G_\delta$ set minus a null set ([[#thm-regularity]]).
- The Cantor set is compact, uncountable and null; its subsets show that some measurable sets are not Borel.
- With the axiom of choice, Vitali's set is not measurable: no translation invariant, countably additive length can be defined on all subsets of $\R$ ([[#thm-vitali]]).
:::

## Exercises

::: exercise The irrationals in an interval {level=1 check="2"}
Find the Lebesgue measure of the set of irrational numbers in $[0, 2]$.
::: solution
$\Q\cap[0, 2]$ is countable, so it is measurable with measure $0$ ([[#thm-outer-properties]] and [[#thm-caratheodory]]). The irrationals in $[0,2]$ form $[0, 2]\setminus\Q$, so their measure is $\lambda([0,2]) - 0 = 2$.
:::
:::

::: exercise Null sets are invisible {level=1}
Let $\lambda^*(Z) = 0$. Prove that $\lambda^*(A \cup Z) = \lambda^*(A)$ and $\lambda^*(A\setminus Z) = \lambda^*(A)$ for every $A \subseteq \R$.
::: solution
By monotonicity and subadditivity, $\lambda^*(A) \le \lambda^*(A \cup Z) \le \lambda^*(A) + \lambda^*(Z) = \lambda^*(A)$. For the second, $A \subseteq (A\setminus Z)\cup Z$, so $\lambda^*(A) \le \lambda^*(A \setminus Z) + 0 \le \lambda^*(A)$, using monotonicity for the last step.
:::
:::

::: exercise Countable sets {level=1}
Prove that every countable subset of $\R$ is a Borel set of Lebesgue measure $0$, and that every set $A$ with $\lambda^*(A) = 0$ is Lebesgue measurable.
::: solution
A countable set is a countable union of singletons, which are closed, so it is Borel (an $F_\sigma$ set); its outer measure is $0$ by [[#thm-outer-properties]](4), so $\lambda(A) = 0$. Any set with outer measure $0$ satisfies Carathéodory's criterion by step 1 of the proof of [[#thm-caratheodory]].
:::
:::

::: exercise Avoiding a digit {level=2 check="0"}
Let $E$ be the set of numbers in $[0, 1]$ having a decimal expansion in which the digit $7$ never appears. Find $\lambda(E)$.
::: solution
Let $E_n$ be the set of $x \in [0, 1]$ having a decimal expansion whose first $n$ digits avoid $7$. It is a union of $9^n$ closed intervals of length $10^{-n}$ (one for each allowed choice of the first $n$ digits), so it is Borel with $\lambda(E_n) \le (9/10)^n$. Since $E \subseteq E_n$ for every $n$, monotonicity gives $\lambda^*(E) \le (9/10)^n \to 0$. So $E$ is null (and measurable), and $\lambda(E) = 0$: almost every number contains the digit $7$ — indeed, infinitely often.
:::
:::

::: exercise Scaling {level=2}
For $c \ne 0$ and $A \subseteq \R$ let $cA = \set{ca : a \in A}$. Prove that $\lambda^*(cA) = \abs{c}\,\lambda^*(A)$, and that $cE$ is measurable whenever $E$ is.
::: solution
Open intervals $I_k$ cover $A$ if and only if the intervals $cI_k$ cover $cA$, and $\ell(cI_k) = \abs{c}\ell(I_k)$. So the sums in the definition of $\lambda^*(cA)$ are exactly $\abs c$ times those for $\lambda^*(A)$, and the infima satisfy $\lambda^*(cA) = \abs c\lambda^*(A)$. If $E$ is measurable and $A$ is any set, then using the formula for $c$ and for $1/c$,

$$
\lambda^*(A\cap cE) + \lambda^*(A\setminus cE) = \abs c\bigl(\lambda^*(c^{-1}A\cap E) + \lambda^*(c^{-1}A\setminus E)\bigr) = \abs c\,\lambda^*(c^{-1}A) = \lambda^*(A),
$$

so $cE$ is measurable.
:::
:::

::: exercise A fat Cantor set {level=2 check="1/2"}
Start with $[0, 1]$. At stage $n = 1, 2, 3, \ldots$ remove from the middle of each of the $2^{n-1}$ remaining closed intervals an open interval of length $4^{-n}$. Let $S$ be what remains. Find $\lambda(S)$, and show that $S$ contains no interval of positive length.
::: hint
Check first that each remaining interval is long enough for the next removal: after stage $n$ the $2^n$ remaining intervals have equal length, between $2^{-(n+1)}$ and $2^{-n}$.
:::
::: solution
After stage $n$ the remaining $2^n$ intervals all have the same length $L_n$, and their total length is $1 - \sum_{k=1}^n2^{k-1}4^{-k} = \frac12 + 2^{-n-1}$, so $L_n = \frac{1 + 2^{-n}}{2^{n+1}}$. Since $2^{-(n+1)} < L_n < 2^{-n}$, each interval is longer than the piece $4^{-(n+1)}$ to be removed at the next stage, so the construction is possible. The total length removed is $\sum_{n\ge1}2^{n-1}4^{-n} = \frac12$, so by countable additivity $\lambda(S) = 1 - \frac12 = \frac12$. Any interval contained in $S$ lies inside one of the $2^n$ intervals of stage $n$ for every $n$, so its length is at most $L_n < 2^{-n}$ for every $n$, hence $0$. So $S$ is a closed, nowhere dense set of positive measure — "small" topologically but not in measure.
:::
:::

::: exercise Outer measure is not additive {level=2}
Use [[#thm-vitali]] to show that there are disjoint sets $B_1, B_2 \subseteq \R$ with $\lambda^*(B_1 \cup B_2) < \lambda^*(B_1) + \lambda^*(B_2)$.
::: solution
Vitali's set $V$ is not measurable, so Carathéodory's criterion fails for it: there is a set $A$ with $\lambda^*(A) \ne \lambda^*(A\cap V) + \lambda^*(A\setminus V)$. Since "$\le$" always holds by subadditivity, we must have $\lambda^*(A) < \lambda^*(A\cap V) + \lambda^*(A\setminus V)$. Put $B_1 = A \cap V$ and $B_2 = A\setminus V$: they are disjoint and $B_1 \cup B_2 = A$.
:::
:::

::: exercise Non-measurable sets are everywhere {level=3}
Let $E \in \mathcal{L}$ with $\lambda(E) > 0$. Prove that $E$ contains a subset that is not Lebesgue measurable.
::: hint
First show that every measurable subset of a translate $V + q$ of Vitali's set has measure $0$. Then use that the translates $V + q$, $q \in \Q$, cover $\R$.
:::
::: solution
*Measurable subsets of $V$ are null.* If $F \subseteq V$ is measurable, the translates $F + q_k$ ($q_k$ enumerating $\Q\cap[-1, 1]$) are disjoint (as in the proof of [[#thm-vitali]]) and contained in $[-1, 2]$, so $\sum_k\lambda(F) \le 3$, forcing $\lambda(F) = 0$. By translation invariance the same holds for measurable subsets of any translate $V + q$.

*The translates cover $\R$.* Every real $x$ is equivalent modulo $\Q$ to some point of $[0, 1]$ (subtract its integer part), hence to some $v \in V$; so $x \in V + q$ with $q = x - v \in \Q$. Thus $E = \bigcup_{q\in\Q}\bigl(E\cap(V + q)\bigr)$, a countable union.

If every $E\cap(V+q)$ were measurable, each would be null by the first part, and then $E$, a countable union of null sets, would be null — contradicting $\lambda(E) > 0$. So some $E \cap (V + q)$ is a non-measurable subset of $E$.
:::
:::

::: exercise Inner regularity {level=3}
Let $E$ be Lebesgue measurable. Prove that $\lambda(E) = \sup\set{\lambda(K) : K \subseteq E,\ K \text{ compact}}$.
::: solution
Monotonicity gives $\lambda(K) \le \lambda(E)$ for every compact $K \subseteq E$, so the supremum is at most $\lambda(E)$. For the reverse, let $E_n = E \cap [-n, n]$, which increase to $E$, so $\lambda(E_n) \to \lambda(E)$ by continuity from below. Fix $n$ and $\eps > 0$. By [[#thm-regularity]](3) there is a closed $F \subseteq E_n$ with $\lambda(E_n\setminus F) < \eps$; $F$ is closed and bounded, hence compact ([[real-analysis/metric-spaces#thm-heine-borel]]), and $\lambda(F) > \lambda(E_n) - \eps$. Hence the supremum is at least $\lambda(E_n) - \eps$ for every $n$ and $\eps$, so it is at least $\lim\lambda(E_n) = \lambda(E)$. (This works also when $\lambda(E) = \infty$.)
:::
:::
