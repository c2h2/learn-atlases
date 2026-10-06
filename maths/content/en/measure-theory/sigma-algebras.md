The Riemann integral of [[real-analysis/riemann-integral]] is a beautiful theory with three serious defects.

*It is fragile under limits.* List the rationals in $[0, 1]$ as $q_1, q_2, q_3, \dots$ and let $f_n$ be the function that is $1$ at $q_1, \dots, q_n$ and $0$ elsewhere. Each $f_n$ differs from $0$ at finitely many points, so it is Riemann integrable with $\int_0^1 f_n = 0$. The sequence increases, and its pointwise limit is Dirichlet's function $D$, which is $1$ on the rationals and $0$ elsewhere — and which has no Riemann integral at all ([[real-analysis/riemann-integral#ex-dirichlet-integral]]). Yet the obvious answer is that $\int_0^1 D = 0$: $D$ is non-zero only on the rationals, a countable and in every sense negligible set.

*It cannot measure sets.* What is the length of the set of rationals in $[0, 1]$, or of the set of numbers whose decimal expansion has no digit $7$? An integral is an area, and areas are built from lengths; to integrate wild functions we need to measure wild sets.

*It is the wrong tool for probability.* "A fair coin, tossed forever, shows heads with limiting frequency $\tfrac12$" is a statement about an event defined by infinitely many tosses. To give it a probability we need to assign probabilities to events built by *countable* unions and intersections of simpler ones.

::: widget cantor
mode: rationals
size: 8
caption: The zig-zag enumeration lists every positive rational number exactly once (skipping repeats such as $2/4 = 1/2$). Restricted to $[0, 1]$, such a list $q_1, q_2, q_3, \dots$ is what builds Dirichlet's function as an increasing limit of functions $f_n$ with Riemann integral $0$: each step switches on one more rational. A countable set is "small" in a way the Riemann integral cannot detect but a measure will.
:::

Measure theory answers all three. Its first step, taken in this chapter, is to decide which sets we will measure (the **σ-algebras**) and what properties a measure must have (**countable additivity**). The next chapter constructs the most important example, Lebesgue measure on $\R$, and shows that we cannot hope to measure *every* set; the chapters after that build the integral.

## σ-algebras

Ideally we would assign a length to every subset of $\R$. In 1905 Vitali showed that this is impossible if length is to be translation invariant and countably additive ([[measure-theory/lebesgue-measure#thm-vitali]]). So we must choose a family of "measurable" sets, and it should be closed under the operations we use to build sets in analysis: complements, and countable unions and intersections.

::: definition σ-algebra {#def-sigma-algebra}
Let $X$ be a set. A family $\mathcal{A}$ of subsets of $X$ is a **σ-algebra** on $X$ if

1. $X \in \mathcal{A}$;
2. if $A \in \mathcal{A}$, then its complement $A^c = X \setminus A \in \mathcal{A}$;
3. if $A_1, A_2, A_3, \ldots \in \mathcal{A}$, then $\bigcup_{n=1}^\infty A_n \in \mathcal{A}$.

The pair $(X, \mathcal{A})$ is a **measurable space**, and the members of $\mathcal{A}$ are the **measurable sets**.
:::

Several more closure properties follow at once. $\varnothing = X^c \in \mathcal{A}$. Finite unions are countable unions with $A_n = \varnothing$ from some point on. By De Morgan's laws, $\bigcap_n A_n = \bigl(\bigcup_n A_n^c\bigr)^c \in \mathcal{A}$, so countable intersections are allowed; and $A \setminus B = A \cap B^c$ and $A \triangle B = (A\setminus B)\cup(B\setminus A)$ belong to $\mathcal{A}$ whenever $A$ and $B$ do. In short, a σ-algebra is closed under every set operation that uses countably many sets at a time. A family that contains $X$ and is closed under complements and *finite* unions only is called an **algebra** of sets.

::: example σ-algebras large and small {#ex-sigma-algebras}
Show that each of the following is a σ-algebra on $X$: (a) the power set $\mathcal{P}(X)$; (b) $\set{\varnothing, X}$; (c) $\set{\varnothing, A, A^c, X}$ for a fixed $A \subseteq X$; (d) for $X = \R$, the family $\mathcal{C}$ of sets $A$ such that $A$ or $A^c$ is countable. Show also that the finite unions of intervals in $\R$ (bounded or unbounded) form an algebra but not a σ-algebra.
::: solution
(a)–(c) are closed under complements and under all unions by inspection.

(d) $\R \in \mathcal{C}$ since its complement $\varnothing$ is countable, and the condition is symmetric in $A$ and $A^c$. Let $A_1, A_2, \ldots \in \mathcal{C}$. If every $A_n$ is countable, so is $\bigcup A_n$ (a countable union of countable sets, [[proofs/cardinality]]). Otherwise some $A_m$ has countable complement, and $\bigl(\bigcup_n A_n\bigr)^c \subseteq A_m^c$ is countable. Either way $\bigcup A_n \in \mathcal{C}$.

Finally, complements and finite unions of finite unions of intervals are again of this form, so they form an algebra. But each singleton $\set{q}$ is a (degenerate) interval, and $\Q \cap [0, 1] = \bigcup_n\set{q_n}$ is a countable union of them that is not a finite union of intervals: a finite union of intervals containing no irrational number consists of finitely many points (every interval of positive length contains irrationals), whereas $\Q \cap [0, 1]$ is infinite. So the algebra is not a σ-algebra.
:::
:::

Interesting σ-algebras are usually described not by listing their members but by naming a few sets they must contain.

::: lemma Intersections of σ-algebras {#lem-intersection}
If $\set{\mathcal{A}_i : i \in I}$ is any non-empty family of σ-algebras on $X$, then $\bigcap_{i\in I}\mathcal{A}_i$ is a σ-algebra on $X$.
:::

::: proof
$X$ belongs to every $\mathcal{A}_i$. If $A$ belongs to every $\mathcal{A}_i$, so does $A^c$; and if each $A_n$ belongs to every $\mathcal{A}_i$, so does $\bigcup_n A_n$.
:::

::: definition Generated σ-algebra {#def-generated}
For any family $\mathcal{C}$ of subsets of $X$, the **σ-algebra generated by** $\mathcal{C}$ is

$$
\sigma(\mathcal{C}) = \bigcap\set{\mathcal{A} : \mathcal{A} \text{ is a } \sigma\text{-algebra on } X \text{ with } \mathcal{C} \subseteq \mathcal{A}}.
$$

By [[#lem-intersection]] it is a σ-algebra (the family is non-empty, since it contains $\mathcal{P}(X)$), it contains $\mathcal{C}$, and it is contained in every σ-algebra that contains $\mathcal{C}$: it is the *smallest* σ-algebra containing $\mathcal{C}$.
:::

The definition gives no recipe for listing the members of $\sigma(\mathcal{C})$, and in general there is none. Instead we use the **good sets principle**: to show that every set in $\sigma(\mathcal{C})$ has some property, show that the sets with the property form a σ-algebra and that every member of $\mathcal{C}$ has it. Then that σ-algebra contains $\mathcal{C}$, hence contains $\sigma(\mathcal{C})$. For instance, the σ-algebra generated by the single points of $\R$ is easy to identify.

::: example The σ-algebra generated by points {#ex-singletons}
Show that the σ-algebra on $\R$ generated by the singletons $\set{x}$, $x \in \R$, is the countable–co-countable σ-algebra $\mathcal{C}$ of [[#ex-sigma-algebras]](d).
::: solution
*$\sigma(\text{singletons}) \subseteq \mathcal{C}$.* By [[#ex-sigma-algebras]](d), $\mathcal{C}$ is a σ-algebra, and it contains every singleton (a singleton is countable). By minimality ([[#def-generated]]), $\mathcal{C}$ contains the σ-algebra generated by the singletons. This is the good sets principle in its simplest form.

*$\mathcal{C} \subseteq \sigma(\text{singletons})$.* A countable set $A = \set{a_1, a_2, \dots}$ is the countable union $\bigcup_n\set{a_n}$, so it lies in every σ-algebra containing the singletons; a co-countable set is the complement of such a union. Hence the two σ-algebras are equal. In particular the generated σ-algebra does not contain $(0, 1)$ ([[#exr-1-5]]): knowing which single points belong to a set is far from knowing the set.
:::
:::

::: widget venn
sets: 2
expr: A - B
labels: A; B
caption: Two sets $A$, $B$ cut $X$ into four **atoms**: $A \cap B$, $A \setminus B$, $B \setminus A$ and $(A \cup B)^c$. Type other expressions — `(A | B)'`, `A & B'`, `(A - B) | (B - A)` — and notice that every one shades a union of whole atoms. So $\sigma(\set{A, B})$ consists of the $2^4 = 16$ unions of atoms (when all four are non-empty).
:::

::: quiz
Let $A, B \subseteq X$ be such that all four atoms $A\cap B$, $A\setminus B$, $B \setminus A$, $(A\cup B)^c$ are non-empty. How many sets does $\sigma(\set{A, B})$ contain?
- [ ] $4$
- [ ] $8$
- [x] $16$
- [ ] infinitely many
::: solution
The unions of atoms form a σ-algebra (complements and unions of unions of atoms are unions of atoms), and it contains $A$ and $B$; any σ-algebra containing $A$ and $B$ contains the atoms and hence their unions. So $\sigma(\set{A, B})$ is exactly the family of unions of atoms: one for each subset of the four atoms, $2^4 = 16$ in all. In general a σ-algebra generated by $n$ sets has at most $2^{2^n}$ members.
:::
:::

## Borel sets

The most important σ-algebra on $\R$ is generated by the open sets.

::: definition Borel σ-algebra {#def-borel}
The **Borel σ-algebra** $\mathcal{B}(\R)$ is the σ-algebra generated by the open subsets of $\R$. Its members are the **Borel sets**. More generally, for any metric space $X$ ([[real-analysis/metric-spaces]]), $\mathcal{B}(X)$ is the σ-algebra generated by the open subsets of $X$.
:::

Every open set and every closed set is Borel, and so is every countable intersection of open sets (a **$G_\delta$ set**) and every countable union of closed sets (an **$F_\sigma$ set**). Countable sets are Borel, being countable unions of closed singletons; so $\Q$ is an $F_\sigma$ set and the irrationals form a $G_\delta$ set. One can keep going — countable unions of $G_\delta$ sets, and so on — and the Borel sets contain everything that can be built from intervals in countably many steps. Even so, a cardinality argument shows that there are only as many Borel sets as real numbers, while $\R$ has strictly more subsets than that; so most subsets of $\R$ are not Borel. The same Borel sets arise from many different generators.

::: theorem Generators of the Borel sets {#thm-borel-generators}
$\mathcal{B}(\R)$ is generated by each of the following families:

1. the open intervals $(a, b)$ with $a < b$ rational;
2. the closed sets;
3. the half-lines $(-\infty, a]$ with $a \in \R$;
4. the half-lines $(a, \infty)$ with $a \in \R$.
:::

::: proof
*Key fact: every open set $U \subseteq \R$ is a countable union of open intervals with rational end-points.* Let $\mathcal{I}_U$ be the set of intervals $(p, q)$ with $p < q$ rational and $(p, q) \subseteq U$; it is countable, since $\Q\times\Q$ is. Every $x \in U$ lies in one of them: $U$ contains some $(x - r, x + r)$, and by density of $\Q$ we can choose rationals $p \in (x - r, x)$ and $q \in (x, x + r)$. So $U = \bigcup\mathcal{I}_U$.

(1) Let $\mathcal{E}_1$ be the family of rational open intervals. Each is open, so $\sigma(\mathcal{E}_1) \subseteq \mathcal{B}(\R)$. Conversely, by the key fact every open set is a countable union of members of $\mathcal{E}_1$, so it lies in $\sigma(\mathcal{E}_1)$; hence $\sigma(\mathcal{E}_1)$ is a σ-algebra containing all open sets, and $\mathcal{B}(\R) \subseteq \sigma(\mathcal{E}_1)$.

(2) The closed sets are the complements of the open sets, so a σ-algebra contains all open sets if and only if it contains all closed sets.

(3) Each $(-\infty, a]$ is closed, hence Borel. Conversely, in the σ-algebra $\mathcal{S}$ generated by these half-lines,

$$
(-\infty, b) = \bigcup_{n=1}^\infty\bigl(-\infty, b - \tfrac1n\bigr] \in \mathcal{S} \qquad\text{and}\qquad (a, b) = (-\infty, b) \cap (-\infty, a]^c \in \mathcal{S},
$$

so $\mathcal{S}$ contains every open interval, and by (1) $\mathcal{B}(\R) \subseteq \mathcal{S}$.

(4) $(a, \infty) = (-\infty, a]^c$, so the families in (3) and (4) generate the same σ-algebra.
:::

Generator (3) will matter in probability: a random variable $X$ is described by the probabilities of the events $\set{X \le a}$, and [[#thm-uniqueness]] below shows that these determine the probabilities of all Borel events.

## Measures

::: definition Measure {#def-measure}
A **measure** on a measurable space $(X, \mathcal{A})$ is a function $\mu\colon \mathcal{A} \to [0, \infty]$ such that

1. $\mu(\varnothing) = 0$;
2. (**countable additivity**) if $A_1, A_2, \ldots \in \mathcal{A}$ are pairwise disjoint, then $\mu\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) = \sum_{n=1}^\infty\mu(A_n)$.

The triple $(X, \mathcal{A}, \mu)$ is a **measure space**. The measure is **finite** if $\mu(X) < \infty$, a **probability measure** if $\mu(X) = 1$, and **σ-finite** if $X$ is a countable union of sets of finite measure.
:::

Values are allowed to be $\infty$; in sums we use the conventions $a + \infty = \infty$, and a series of terms in $[0, \infty]$ always has a sum in $[0, \infty]$ (the supremum of its partial sums), so the definition makes sense without any convergence hypothesis.

::: example Examples of measures {#ex-measures}
Verify that the following are measures: (a) the **counting measure** on $(X, \mathcal{P}(X))$, $\#(A) = $ number of elements of $A$ (or $\infty$); (b) the **Dirac measure** $\delta_x(A) = 1$ if $x \in A$ and $0$ otherwise; (c) on the countable–co-countable σ-algebra of $\R$, $\mu(A) = 0$ if $A$ is countable and $\mu(A) = 1$ if $A^c$ is countable. Show also that on $\N$ the function $\nu(A) = 0$ for finite $A$, $\nu(A) = 1$ for co-finite $A$, defined on the algebra of finite and co-finite sets, is additive for *finitely* many disjoint sets but not countably additive.
::: solution
(a) If the disjoint sets $A_n$ are all finite and their union is finite, both sides count the same elements; if the union is infinite, either some $A_n$ is infinite or infinitely many are non-empty, and both sides are $\infty$. (b) $x$ lies in at most one of the disjoint sets $A_n$, so the right-hand side is $1$ exactly when $x \in \bigcup A_n$.

(c) Two co-countable sets cannot be disjoint: their complements are countable, so their union is not all of $\R$, which is uncountable, and so their intersection is non-empty. Hence among pairwise disjoint sets $A_n \in \mathcal{C}$ at most one is co-countable. If none is, the union is countable and both sides are $0$; if exactly one is, the union is co-countable and both sides are $1$.

For $\nu$: two disjoint sets cannot both be co-finite, so finite additivity is checked as in (c). But $\N = \bigcup_n\set{n}$ is a countable disjoint union of finite sets, so $\nu(\N) = 1 \ne 0 = \sum_n\nu(\set n)$. Finite additivity does not imply countable additivity.
:::
:::

Further examples are built from these: for weights $w(x) \ge 0$, the **weighted counting measure** $\mu(A) = \sum_{x\in A}w(x)$; the **restriction** $\mu_B(A) = \mu(A \cap B)$ to a fixed set $B \in \mathcal{A}$; positive multiples and countable sums of measures. The most important measure of all, **Lebesgue measure** on $\mathcal{B}(\R)$ with $\lambda((a, b)) = b - a$, is surprisingly hard to construct, and occupies [[measure-theory/lebesgue-measure]].

::: theorem Basic properties of measures {#thm-measure-properties}
Let $(X, \mathcal{A}, \mu)$ be a measure space and let all sets below belong to $\mathcal{A}$.

1. (**Finite additivity.**) If $A_1, \dots, A_n$ are pairwise disjoint, $\mu(A_1 \cup \cdots \cup A_n) = \mu(A_1) + \cdots + \mu(A_n)$.
2. (**Monotonicity.**) If $A \subseteq B$, then $\mu(A) \le \mu(B)$; if moreover $\mu(A) < \infty$, then $\mu(B \setminus A) = \mu(B) - \mu(A)$.
3. (**Countable subadditivity.**) $\mu\bigl(\bigcup_{n=1}^\infty A_n\bigr) \le \sum_{n=1}^\infty\mu(A_n)$ for any sets $A_n$.
4. (**Inclusion–exclusion.**) $\mu(A \cup B) + \mu(A \cap B) = \mu(A) + \mu(B)$.
:::

::: proof
(1) Apply countable additivity to $A_1, \dots, A_n, \varnothing, \varnothing, \ldots$, using $\mu(\varnothing) = 0$.

(2) $B$ is the disjoint union of $A$ and $B \setminus A$, so $\mu(B) = \mu(A) + \mu(B\setminus A) \ge \mu(A)$; if $\mu(A) < \infty$ we may subtract it.

(3) **Disjointify**: put $B_1 = A_1$ and $B_n = A_n \setminus (A_1 \cup \cdots \cup A_{n-1})$. The $B_n$ are measurable, pairwise disjoint, $B_n \subseteq A_n$, and $\bigcup_n B_n = \bigcup_n A_n$ (each point of the union lies in a first $A_n$, and hence in $B_n$). By countable additivity and monotonicity, $\mu\bigl(\bigcup A_n\bigr) = \sum\mu(B_n) \le \sum\mu(A_n)$.

(4) $A \cup B$ is the disjoint union of $A$ and $B\setminus A$, and $B$ is the disjoint union of $A \cap B$ and $B \setminus A$. So $\mu(A \cup B) + \mu(A\cap B) = \mu(A) + \mu(B\setminus A) + \mu(A\cap B) = \mu(A) + \mu(B)$.
:::

Countable additivity has a reformulation that is the real reason for insisting on it: measures commute with monotone limits of sets.

::: theorem Continuity of measures {#thm-continuity-measure}
Let $(X, \mathcal{A}, \mu)$ be a measure space.

1. (**From below.**) If $A_1 \subseteq A_2 \subseteq \cdots$, then $\mu\bigl(\bigcup_n A_n\bigr) = \lim_{n\to\infty}\mu(A_n)$.
2. (**From above.**) If $A_1 \supseteq A_2 \supseteq \cdots$ and $\mu(A_1) < \infty$, then $\mu\bigl(\bigcap_n A_n\bigr) = \lim_{n\to\infty}\mu(A_n)$.
:::

::: proof
(1) Let $B_1 = A_1$ and $B_n = A_n \setminus A_{n-1}$ for $n \ge 2$. These are disjoint, $A_n = B_1 \cup \cdots \cup B_n$, and $\bigcup_n A_n = \bigcup_n B_n$. Hence

$$
\mu\Bigl(\bigcup_n A_n\Bigr) = \sum_{k=1}^\infty\mu(B_k) = \lim_{n\to\infty}\sum_{k=1}^n\mu(B_k) = \lim_{n\to\infty}\mu(A_n).
$$

(2) The sets $C_n = A_1 \setminus A_n$ increase to $A_1 \setminus \bigcap_n A_n$. Since all measures involved are at most $\mu(A_1) < \infty$, part (2) of [[#thm-measure-properties]] gives $\mu(C_n) = \mu(A_1) - \mu(A_n)$ and $\mu\bigl(A_1 \setminus \bigcap A_n\bigr) = \mu(A_1) - \mu\bigl(\bigcap A_n\bigr)$. By part (1), $\mu(A_1) - \mu\bigl(\bigcap A_n\bigr) = \lim\bigl(\mu(A_1) - \mu(A_n)\bigr)$, and cancelling the finite number $\mu(A_1)$ gives the claim.
:::

::: warning Continuity from above needs a finite measure
Under counting measure on $\N$, the sets $A_n = \set{n, n+1, n+2, \dots}$ decrease to $\varnothing$, but $\mu(A_n) = \infty$ for every $n$, so $\lim\mu(A_n) = \infty \ne 0 = \mu(\varnothing)$. The proof breaks exactly where it subtracts $\mu(A_n) = \infty$. It is enough that *some* $A_n$ has finite measure (start the sequence there), but not that the limit set does.
:::

::: example A coin that never shows heads {#ex-coin}
A fair coin is tossed infinitely often; assume a probability measure $P$ on the events concerning the tosses, with $P(\text{the first } n \text{ tosses are all tails}) = 2^{-n}$. Show that the coin shows heads at some toss with probability $1$.
::: solution
Let $A_n$ be the event that the first $n$ tosses are all tails. Then $A_1 \supseteq A_2 \supseteq \cdots$, and $\bigcap_n A_n$ is the event that every toss is tails. Since $P$ is finite, continuity from above gives $P\bigl(\bigcap A_n\bigr) = \lim 2^{-n} = 0$. So "never heads" has probability $0$ and "some heads" has probability $1$. Note that "never heads" is not impossible — the sequence TTT… is a perfectly good outcome — it is merely **null**. Making such arguments legitimate was one of the motivations for Kolmogorov's measure-theoretic foundation of probability ([[probability/probability-spaces]]).
:::
:::

## Null sets and almost everywhere

::: definition Null sets, almost everywhere, completeness {#def-null}
Let $(X, \mathcal{A}, \mu)$ be a measure space. A set $N \in \mathcal{A}$ with $\mu(N) = 0$ is a **null set**. A property of points $x \in X$ holds **almost everywhere** (a.e., or $\mu$-a.e.) if the set of points where it fails is contained in a null set. The measure space is **complete** if every subset of a null set belongs to $\mathcal{A}$ (and is then null).
:::

By countable subadditivity, a countable union of null sets is null. Statements such as "$f = g$ almost everywhere" or "$f_n \to f$ almost everywhere" are the bread and butter of the next chapters: integrals cannot see what happens on null sets. Every measure space can be **completed**: the sets $A \cup Z$ with $A \in \mathcal{A}$ and $Z$ a subset of a null set form a σ-algebra $\overline{\mathcal{A}}$, and $\bar\mu(A \cup Z) = \mu(A)$ is a well-defined complete measure on it ([[#exr-1-9]]). Lebesgue measure, constructed in the next chapter, is the completion of its restriction to the Borel sets.

The first Borel–Cantelli lemma is a beautifully simple consequence of countable subadditivity. For sets $A_n$, the set

$$
\limsup_{n\to\infty}A_n = \bigcap_{N=1}^\infty\bigcup_{n=N}^\infty A_n = \set{x : x \in A_n \text{ for infinitely many } n}
$$

is the event "$A_n$ happens infinitely often". (A point lies in $\bigcup_{n\ge N}A_n$ for every $N$ exactly when it lies in $A_n$ for arbitrarily large $n$.)

::: theorem First Borel–Cantelli lemma {#thm-borel-cantelli}
If $\sum_{n=1}^\infty\mu(A_n) < \infty$, then $\mu\bigl(\limsup_n A_n\bigr) = 0$: almost every point lies in only finitely many of the sets $A_n$.
:::

::: proof
For every $N$, $\limsup_n A_n \subseteq \bigcup_{n\ge N}A_n$, so by monotonicity and countable subadditivity

$$
\mu\Bigl(\limsup_n A_n\Bigr) \le \sum_{n=N}^\infty\mu(A_n).
$$

The right-hand side is the tail of a convergent series, so it tends to $0$ as $N \to \infty$ ([[real-analysis/series]]). Hence the left-hand side, which does not depend on $N$, is $0$.
:::

::: widget sequence
a: 1/n^2
mode: sums
N: 40
limit: pi^2/6
caption: Suppose the events $A_n$ have probabilities $1/n^2$. The partial sums of $\sum P(A_n)$ approach $\pi^2/6$, and the gap between the curve and its limit after $N$ terms — the tail $\sum_{n>N}1/n^2 \approx 1/N$ — bounds the probability that any event after the $N$-th occurs. The chance of infinitely many occurrences is at most every such tail, so it is $0$. With $P(A_n) = 1/n$ the partial sums diverge and the lemma says nothing.
:::

The lemma needs no independence and no information about how the $A_n$ overlap; that is its power. (A partial converse, the second Borel–Cantelli lemma, does need independence: if the events $A_n$ are independent and $\sum P(A_n) = \infty$, then with probability $1$ infinitely many of them occur.) It is the standard tool for proving that something happens only finitely often with probability one — for instance, that the proportion of heads in $n$ tosses eventually stays within any $\eps$ of $\tfrac12$, which is how the strong law of large numbers is proved in [[probability/limit-theorems]].

::: quiz
For a sequence of sets $A_n$, which statement about $\limsup_n A_n$ is correct?
- [ ] It is the set of points that lie in all but finitely many $A_n$.
- [x] It is the set of points that lie in infinitely many $A_n$.
- [ ] It is $\bigcup_n A_n$.
- [ ] It has measure $\limsup_n\mu(A_n)$.
::: solution
$x \in \bigcap_N\bigcup_{n\ge N}A_n$ means that for every $N$ there is $n \ge N$ with $x \in A_n$ — infinitely many $n$. The set of points lying in all but finitely many $A_n$ is the smaller set $\liminf A_n = \bigcup_N\bigcap_{n \ge N}A_n$. In general $\mu(\limsup A_n)$ is not $\limsup\mu(A_n)$: for $A_n = [n, n+1]$ in $\R$ with length as measure, every $\mu(A_n) = 1$ but $\limsup A_n = \varnothing$.
:::
:::

## When do two measures agree?

To specify a measure we usually give its values on a small family of sets — lengths of intervals, or the probabilities $P(X \le a)$ — and hope that these determine it on the whole σ-algebra. They do, provided the family is closed under intersections.

A family $\mathcal{P}$ of subsets of $X$ is a **π-system** if $A \cap B \in \mathcal{P}$ whenever $A, B \in \mathcal{P}$. A family $\mathcal{D}$ is a **λ-system** (or Dynkin system) if $X \in \mathcal{D}$; $B \setminus A \in \mathcal{D}$ whenever $A, B \in \mathcal{D}$ and $A \subseteq B$; and $\bigcup_n A_n \in \mathcal{D}$ whenever $A_1 \subseteq A_2 \subseteq \cdots$ are in $\mathcal{D}$. The half-lines $(-\infty, a]$, together with $\varnothing$, form a π-system; so do the intervals $(a, b]$ with $\varnothing$.

::: theorem Dynkin's π–λ theorem {#thm-pi-lambda}
If $\mathcal{P}$ is a π-system, $\mathcal{D}$ is a λ-system, and $\mathcal{P} \subseteq \mathcal{D}$, then $\sigma(\mathcal{P}) \subseteq \mathcal{D}$.
:::

::: proof
*Step 1: a family that is both a π-system and a λ-system is a σ-algebra.* It contains $X$; it contains $A^c = X\setminus A$ for each member $A$; it contains $A \cup B = (A^c \cap B^c)^c$, hence all finite unions; and a countable union $\bigcup_n A_n$ is the increasing union of the finite unions $A_1 \cup\cdots\cup A_n$.

*Step 2.* Intersections of λ-systems are λ-systems (as in [[#lem-intersection]]), so there is a smallest λ-system $\mathcal{D}_0$ containing $\mathcal{P}$, and $\mathcal{D}_0 \subseteq \mathcal{D}$. We show that $\mathcal{D}_0$ is a π-system. For $A \in \mathcal{D}_0$ let $\mathcal{G}_A = \set{B \subseteq X : A \cap B \in \mathcal{D}_0}$. This is a λ-system: $A \cap X = A \in \mathcal{D}_0$; if $B \subseteq C$ are in $\mathcal{G}_A$ then $A \cap (C\setminus B) = (A\cap C)\setminus(A\cap B)$ with $A \cap B \subseteq A \cap C$ both in $\mathcal{D}_0$; and increasing unions pass through the intersection with $A$.

If $A \in \mathcal{P}$, then $\mathcal{P} \subseteq \mathcal{G}_A$ because $\mathcal{P}$ is a π-system, so $\mathcal{D}_0 \subseteq \mathcal{G}_A$ by minimality: $A \cap B \in \mathcal{D}_0$ for all $A \in \mathcal{P}$, $B \in \mathcal{D}_0$. Read the other way round, this says that for every $B \in \mathcal{D}_0$ we have $\mathcal{P} \subseteq \mathcal{G}_B$, and so, by minimality again, $\mathcal{D}_0 \subseteq \mathcal{G}_B$: $\mathcal{D}_0$ is closed under intersections.

By step 1, $\mathcal{D}_0$ is a σ-algebra containing $\mathcal{P}$, so $\sigma(\mathcal{P}) \subseteq \mathcal{D}_0 \subseteq \mathcal{D}$.
:::

::: theorem Uniqueness of measures {#thm-uniqueness}
Let $\mu$ and $\nu$ be measures on $(X, \sigma(\mathcal{P}))$, where $\mathcal{P}$ is a π-system. If $\mu(A) = \nu(A)$ for every $A \in \mathcal{P}$ and $\mu(X) = \nu(X) < \infty$, then $\mu = \nu$ on all of $\sigma(\mathcal{P})$.
:::

::: proof
Let $\mathcal{D} = \set{A \in \sigma(\mathcal{P}) : \mu(A) = \nu(A)}$. It contains $\mathcal{P}$ and $X$. If $A \subseteq B$ are in $\mathcal{D}$, then $\mu(B \setminus A) = \mu(B) - \mu(A) = \nu(B) - \nu(A) = \nu(B \setminus A)$, the subtraction being legitimate because the measures are finite. If $A_1 \subseteq A_2 \subseteq \cdots$ are in $\mathcal{D}$, continuity from below gives $\mu(\bigcup A_n) = \lim\mu(A_n) = \lim\nu(A_n) = \nu(\bigcup A_n)$. So $\mathcal{D}$ is a λ-system, and [[#thm-pi-lambda]] gives $\sigma(\mathcal{P}) \subseteq \mathcal{D}$.
:::

Two important consequences. A Borel probability measure $\mu$ on $\R$ is determined by its **distribution function** $F(a) = \mu((-\infty, a])$, since the half-lines form a π-system generating $\mathcal{B}(\R)$ ([[#thm-borel-generators]]); this is why in probability a random variable's distribution can be described by its cumulative distribution function ([[probability/continuous-random-variables]]). And the theorem extends to σ-finite measures, provided the pieces of finite measure can be taken from $\mathcal{P}$: if $X_1 \subseteq X_2 \subseteq \cdots$ in $\mathcal{P}$ have union $X$ and $\mu(X_n) < \infty$, then $A \mapsto \mu(A \cap X_n)$ and $A \mapsto \nu(A \cap X_n)$ are finite measures that agree on $\mathcal{P}$ (as $A \cap X_n \in \mathcal{P}$) and on $X$, hence everywhere; now let $n \to \infty$, using continuity from below. Taking the intervals $(a, b]$ (with $\varnothing$) for $\mathcal{P}$ and $X_n = (-n, n]$ shows that there is at most one measure on $\mathcal{B}(\R)$ giving every interval its length. Without the proviso the extension fails: counting measure and twice counting measure on $\Q$, both σ-finite, agree on every set $(a, b]\cap\Q$, since each is infinite or empty.

::: history
Émile Borel's *Leçons sur la théorie des fonctions* (1898) introduced the idea of assigning a measure to the sets obtainable from intervals by countable unions and complements, and insisted on countable additivity. Henri Lebesgue built his integral on this foundation in his thesis of 1902. In 1905 Giuseppe Vitali showed that not every set of reals can have a translation-invariant, countably additive length, and the paradoxes of Felix Hausdorff (1914) and of Stefan Banach and Alfred Tarski (1924) showed that in three dimensions even finite additivity fails for arbitrary sets. Abstract measure spaces developed in the 1910s and 1920s, and in 1933 Andrey Kolmogorov's *Grundbegriffe der Wahrscheinlichkeitsrechnung* founded probability on a σ-algebra of events and a measure of total mass one. The π–λ theorem goes back to Wacław Sierpiński (1928) and was popularised by Eugene Dynkin in the 1950s.
:::

## Where this leads

We now know what a measure is but have only trivial examples. [[measure-theory/lebesgue-measure]] constructs Lebesgue measure on $\R$ by approximating sets from outside with intervals and using Carathéodory's criterion to select the measurable sets; it also proves Vitali's theorem that some sets cannot be measured. [[measure-theory/measurable-functions]] introduces the functions compatible with a σ-algebra, and [[measure-theory/lebesgue-integral]] integrates them, with continuity of measure ([[#thm-continuity-measure]]) reappearing as the monotone convergence theorem. In probability ([[probability/probability-spaces]]) a probability space is just a measure space of total mass one, and the Borel–Cantelli lemma is a basic tool for the strong law of large numbers.

::: summary
- A σ-algebra contains $X$ and is closed under complements and countable unions — hence under all countable set operations ([[#def-sigma-algebra]]). Measures are defined only on σ-algebras because not every set can be measured.
- $\sigma(\mathcal{C})$ is the smallest σ-algebra containing $\mathcal{C}$; prove facts about it with the good sets principle.
- The Borel σ-algebra is generated by the open sets, and equally by open intervals, closed sets or half-lines $(-\infty, a]$ ([[#thm-borel-generators]]).
- A measure is countably additive with $\mu(\varnothing) = 0$; it is monotone and countably subadditive ([[#thm-measure-properties]]).
- Measures are continuous along increasing sequences, and along decreasing ones if some set has finite measure ([[#thm-continuity-measure]]).
- Null sets and "almost everywhere": countable unions of null sets are null. Borel–Cantelli: if $\sum\mu(A_n) < \infty$, almost every point lies in only finitely many $A_n$.
- Finite measures with the same total mass that agree on a π-system agree on the σ-algebra it generates ([[#thm-uniqueness]]); a probability measure on $\R$ is determined by its distribution function.
:::

## Exercises

::: exercise Closure properties {level=1}
Let $\mathcal{A}$ be a σ-algebra and $A, B, A_1, A_2, \ldots \in \mathcal{A}$. Show that $A\setminus B$, $A \triangle B$, $\bigcap_n A_n$ and $\liminf_n A_n = \bigcup_N\bigcap_{n\ge N}A_n$ belong to $\mathcal{A}$.
::: solution
$A\setminus B = A \cap B^c = (A^c \cup B)^c \in \mathcal{A}$. $A \triangle B = (A \setminus B)\cup(B\setminus A)$ is a union of two members. $\bigcap_n A_n = \bigl(\bigcup_n A_n^c\bigr)^c$. Finally each $\bigcap_{n\ge N}A_n$ is in $\mathcal{A}$, and so is their countable union $\liminf_n A_n$.
:::
:::

::: exercise Counting sets {level=1 check="256"}
Let $A, B, C \subseteq X$ be three sets whose eight atoms (sets of the form $A^{\pm}\cap B^{\pm}\cap C^{\pm}$, where $A^+ = A$ and $A^- = A^c$) are all non-empty. How many sets are in $\sigma(\set{A, B, C})$?
::: solution
As in the quiz, $\sigma(\set{A,B,C})$ consists of all unions of atoms: the unions of atoms form a σ-algebra containing $A$, $B$, $C$, and every σ-algebra containing them contains the atoms. With eight non-empty atoms there are $2^8 = 256$ unions.
:::
:::

::: exercise Dirac and counting measures {level=1}
Let $x \in X$. Prove that $\mu = \delta_x + 2\#$ (where $\#$ is counting measure) is a measure on $\mathcal{P}(X)$, and compute $\mu(\set{x, y})$ for $y \ne x$.
::: solution
Sums and positive multiples of measures are measures: $\mu(\varnothing) = 0 + 0 = 0$, and for disjoint $A_n$, $\mu(\bigcup A_n) = \delta_x(\bigcup A_n) + 2\#(\bigcup A_n) = \sum\delta_x(A_n) + 2\sum\#(A_n) = \sum\mu(A_n)$, where adding two series of non-negative terms termwise is legitimate. Then $\mu(\set{x, y}) = 1 + 2\cdot2 = 5$.
:::
:::

::: exercise A π-system of intervals {level=2}
Show that $\mathcal{P} = \set{(a, b] : a < b} \cup \set{\varnothing}$ is a π-system generating $\mathcal{B}(\R)$. Deduce that two finite measures on $\mathcal{B}(\R)$ that agree on all intervals $(a, b]$ and have the same total mass are equal.
::: solution
$(a, b] \cap (c, d] = (\max(a,c), \min(b,d)]$, which is either of the same form or empty, so $\mathcal{P}$ is a π-system. Each $(a, b] = (-\infty, b]\cap(-\infty, a]^c$ is Borel, so $\sigma(\mathcal{P}) \subseteq \mathcal{B}(\R)$. Conversely $(a, b) = \bigcup_n(a, b - \tfrac1n]$ (over $n$ with $b - \frac1n > a$) lies in $\sigma(\mathcal{P})$, so by [[#thm-borel-generators]] $\mathcal{B}(\R) \subseteq \sigma(\mathcal{P})$. The deduction is [[#thm-uniqueness]].
:::
:::

::: exercise Not every Borel set is countable or co-countable {level=2}
Show that the interval $(0, 1)$ does not belong to the countable–co-countable σ-algebra on $\R$, so that this σ-algebra is strictly smaller than $\mathcal{B}(\R)$.
::: solution
$(0, 1)$ is uncountable ([[real-analysis/real-numbers#thm-r-uncountable]]), and so is its complement, which contains $[1, \infty)$. So neither $(0,1)$ nor its complement is countable. But the countable–co-countable σ-algebra is generated by the singletons, which are Borel, so it is contained in $\mathcal{B}(\R)$, and the inclusion is strict.
:::
:::

::: exercise Finite additivity plus continuity {level=2}
Let $\mathcal{A}$ be a σ-algebra and $\mu\colon\mathcal{A} \to [0, \infty]$ satisfy $\mu(\varnothing) = 0$, finite additivity, and continuity from below. Prove that $\mu$ is a measure.
::: solution
Let $A_1, A_2, \ldots$ be disjoint and $B_n = A_1 \cup \cdots \cup A_n$. The $B_n$ increase to $\bigcup_k A_k$. By continuity from below and finite additivity,

$$
\mu\Bigl(\bigcup_k A_k\Bigr) = \lim_{n\to\infty}\mu(B_n) = \lim_{n\to\infty}\sum_{k=1}^n\mu(A_k) = \sum_{k=1}^\infty\mu(A_k).
$$

So $\mu$ is countably additive. (The finitely additive $\nu$ of [[#ex-measures]] fails continuity from below along $\set{1}, \set{1,2}, \dots$.)
:::
:::

::: exercise Fatou's lemma for sets {level=2}
Let $\mu$ be a measure. Prove that $\mu\bigl(\liminf_n A_n\bigr) \le \liminf_n\mu(A_n)$, and that if $\mu(X) < \infty$ then $\mu\bigl(\limsup_n A_n\bigr) \ge \limsup_n\mu(A_n)$.
::: solution
Let $C_N = \bigcap_{n\ge N}A_n$; these increase to $\liminf A_n$, and $C_N \subseteq A_n$ for every $n \ge N$, so $\mu(C_N) \le \inf_{n\ge N}\mu(A_n)$. By continuity from below, $\mu(\liminf A_n) = \lim_N\mu(C_N) \le \lim_N\inf_{n\ge N}\mu(A_n) = \liminf\mu(A_n)$. Similarly $D_N = \bigcup_{n\ge N}A_n$ decrease to $\limsup A_n$ and $\mu(D_N) \ge \sup_{n\ge N}\mu(A_n)$; if $\mu(X) < \infty$, continuity from above gives $\mu(\limsup A_n) = \lim\mu(D_N) \ge \limsup\mu(A_n)$.
:::
:::

::: exercise Infinite σ-algebras are uncountable {level=3}
Prove that a σ-algebra $\mathcal{A}$ with infinitely many members contains an infinite sequence of pairwise disjoint non-empty sets, and deduce that $\mathcal{A}$ is uncountable.
::: hint
Call $E \in \mathcal{A}$ *rich* if infinitely many members of $\mathcal{A}$ are subsets of $E$. Show that a rich set can be split into a non-empty member of $\mathcal{A}$ and a rich set.
:::
::: solution
$X$ is rich. Let $E$ be rich, and choose $B \in \mathcal{A}$ with $B \subseteq E$, $B \ne \varnothing$, $B \ne E$ (possible, as $E$ has infinitely many measurable subsets). Every measurable $C \subseteq E$ is determined by the pair $(C\cap B, C\setminus B)$ of measurable subsets of $B$ and of $E \setminus B$; so if $B$ and $E\setminus B$ both had finitely many measurable subsets, so would $E$. Hence one of $B$, $E \setminus B$ is rich: call it $E'$, and call the other one $F$. Then $F \ne \varnothing$, $F \in \mathcal{A}$, and $F \cap E' = \varnothing$.

Start with $E_0 = X$ and repeat: $E_k$ splits into a non-empty $F_{k+1}$ and a rich $E_{k+1}$, disjoint, with $F_{k+1}\cup E_{k+1} = E_k$. Since $F_{j} \subseteq E_{j-1}$ and $E_k \subseteq E_{j}$ for $k \ge j$, the sets $F_1, F_2, \dots$ are pairwise disjoint and non-empty. For each $S \subseteq \N$, the union $\bigcup_{k\in S}F_k$ belongs to $\mathcal{A}$, and different $S$ give different unions (the $F_k$ are disjoint and non-empty). So $\mathcal{A}$ contains at least as many sets as $\mathcal{P}(\N)$, which is uncountable ([[proofs/cardinality]]).
:::
:::

::: exercise The completion of a measure space {level=3}
Let $(X, \mathcal{A}, \mu)$ be a measure space and $\mathcal{N}$ the family of subsets of null sets. Let $\overline{\mathcal{A}} = \set{A \cup Z : A \in \mathcal{A}, Z \in \mathcal{N}}$ and $\bar\mu(A \cup Z) = \mu(A)$. Prove that $\overline{\mathcal{A}}$ is a σ-algebra, that $\bar\mu$ is well defined, and that $\bar\mu$ is a complete measure extending $\mu$.
::: solution
*σ-algebra.* Countable unions: $\bigcup(A_n \cup Z_n) = \bigl(\bigcup A_n\bigr)\cup\bigl(\bigcup Z_n\bigr)$, and $\bigcup Z_n \subseteq \bigcup N_n$, a null set, if $Z_n \subseteq N_n$. Complements: if $Z \subseteq N$ with $N$ null, then $(A\cup Z)^c = (A \cup N)^c \cup (N \setminus (A \cup Z))$, where $(A\cup N)^c \in \mathcal{A}$ and $N\setminus(A\cup Z) \subseteq N$. And $X = X \cup\varnothing$.

*Well defined.* If $A \cup Z = A' \cup Z'$ with $Z \subseteq N$, $Z' \subseteq N'$ null, then $A \subseteq A' \cup Z' \subseteq A' \cup N'$, so $\mu(A) \le \mu(A') + \mu(N') = \mu(A')$; by symmetry $\mu(A) = \mu(A')$.

*Measure.* $\bar\mu(\varnothing) = 0$. If the sets $A_n \cup Z_n$ are disjoint, so are the $A_n$, and $\bar\mu\bigl(\bigcup(A_n\cup Z_n)\bigr) = \mu\bigl(\bigcup A_n\bigr) = \sum\mu(A_n)$. It extends $\mu$ (take $Z = \varnothing$).

*Complete.* If $\bar\mu(A \cup Z) = 0$ with $Z \subseteq N$, then $A \cup Z \subseteq A \cup N$, a null set of $\mathcal{A}$; so any subset of $A \cup Z$ belongs to $\mathcal{N} \subseteq \overline{\mathcal{A}}$.
:::
:::
