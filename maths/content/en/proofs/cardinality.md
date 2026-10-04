Are there more natural numbers than even numbers? The even numbers form a proper part of the natural numbers, so it seems obvious that there are fewer of them. Yet the rule $n\mapsto 2n$ pairs every natural number with exactly one even number, and leaves nothing over on either side:

$$
\begin{array}{cccccc}
1 & 2 & 3 & 4 & 5 & \cdots\\
\updownarrow & \updownarrow & \updownarrow & \updownarrow & \updownarrow & \\
2 & 4 & 6 & 8 & 10 & \cdots
\end{array}
$$

Galileo noticed the same phenomenon for the perfect squares in 1638, and concluded that "equal", "greater" and "less" simply do not apply to infinite collections. Two and a half centuries later Georg Cantor took the opposite view: *define* two sets to have the same size when their elements can be paired off exactly, and see what follows. The answers are astonishing. The natural numbers, the integers and the rational numbers all have the same size; the real numbers form a strictly larger infinity; and there is no largest infinity at all. In this chapter we prove all of this, using nothing but the functions of [[proofs/functions]].

## Comparing sizes

::: definition Equinumerous sets {#def-equinumerous}
Sets $A$ and $B$ are **equinumerous**, or have the **same cardinality**, written $\abs A = \abs B$, if there is a bijection $A\to B$. We write $\abs A\le\abs B$ if there is an injection $A\to B$, and $\abs A<\abs B$ if $\abs A\le\abs B$ but $\abs A\neq\abs B$.
:::

For finite sets this agrees with counting: two finite sets have the same number of elements exactly when their elements can be paired off. Note that "$\abs A = \abs B$" and "$\abs A\le\abs B$" are *defined* as statements about the existence of functions; we do not need to know what $\abs A$ means on its own. The definition has the properties we expect of "same size".

::: proposition Basic properties {#prop-equinumerous}
For all sets $A$, $B$ and $C$:

1. $\abs A = \abs A$;
2. if $\abs A = \abs B$, then $\abs B = \abs A$;
3. if $\abs A = \abs B$ and $\abs B = \abs C$, then $\abs A = \abs C$;
4. $\abs A\le\abs A$, and if $\abs A\le\abs B$ and $\abs B\le\abs C$, then $\abs A\le\abs C$;
5. if $A\subseteq B$, then $\abs A\le\abs B$.
:::

::: proof
- For 1: the identity $\id_A$ is a bijection.
- For 2: the inverse of a bijection is a bijection ([[proofs/functions#thm-inverse]]).
- For 3 and 4: a composition of bijections is a bijection, a composition of injections is an injection ([[proofs/functions#thm-composition]]), and $\id_A$ is an injection.
- For 5: the inclusion map $A\to B$, $a\mapsto a$, is injective.
:::

So equinumerosity behaves like an equivalence relation. It is not literally one in the sense of [[proofs/relations]], because it would have to be a relation on the set of all sets, and there is no such set ([[proofs/sets#thm-russell]]).

::: example Infinite sets of the same size {#ex-same-size}
Show that the following pairs of sets are equinumerous: (a) $\N$ and the set $E$ of even natural numbers; (b) the intervals $(0,1)$ and $(a,b)$, for any real numbers $a<b$; (c) the intervals $(0,1)$ and $(1,\infty)$.
::: solution
(a) Let $f\colon\N\to E$, $f(n) = 2n$. It is injective, since $2n = 2n'$ implies $n = n'$, and surjective, since every even natural number has the form $2k$ with $k\in\N$, and $2k = f(k)$.

(b) Let $g(x) = a + (b-a)x$. If $0<x<1$ then $a < g(x) < b$, so $g$ maps $(0,1)$ into $(a,b)$; and $y\mapsto (y-a)/(b-a)$ maps $(a,b)$ into $(0,1)$ and undoes $g$ on both sides. A function with a two-sided inverse is a bijection.

(c) Let $h(x) = 1/x$. If $0<x<1$ then $1/x>1$, and if $y>1$ then $0<1/y<1$; and $h(h(x)) = x$. So $h$ is a bijection from $(0,1)$ to $(1,\infty)$, with inverse $y\mapsto 1/y$.

In (a) a set is equinumerous with a proper subset of itself; in (b) every open interval, however short, has as many points as every other; in (c) a bounded interval is matched with an unbounded one.
:::
:::

::: warning Intuitions from finite sets fail
For finite sets a proper subset is always strictly smaller. For infinite sets this is false — [[#ex-same-size]](a) — and arguments such as "$E$ is only half of $\N$, so it is smaller" are simply invalid. Equally, finding one function $A\to B$ that is not a bijection proves nothing: $n\mapsto 4n$ from $\N$ to $E$ is not surjective, but $n\mapsto 2n$ is a bijection. To show $\abs A\neq\abs B$ you must rule out *every* possible bijection, which is what makes the uncountability proofs below interesting.
:::

::: quiz
Which of the following would prove that $\abs\N\neq\abs\R$?
- [ ] Showing that the inclusion $\N\to\R$, $n\mapsto n$, is not surjective.
- [ ] Showing that $\N$ is a proper subset of $\R$.
- [x] Showing that no function $\N\to\R$ is surjective.
- [ ] Exhibiting a real number that is not a natural number.
::: solution
$\abs\N = \abs\R$ means that *some* bijection $\N\to\R$ exists, so to refute it we must rule out every bijection. Showing that no function at all is surjective does exactly that — and it is what the diagonal argument below achieves. The other options concern one particular function or the subset relation, and the same reasoning would "prove" that the even numbers $E$ satisfy $\abs E\neq\abs\N$, which is false.
:::
:::

::: intuition Hilbert's hotel
Imagine a hotel with rooms numbered $1, 2, 3, \dots$, every one occupied. A new guest arrives. The manager asks each guest to move from room $n$ to room $n+1$; everyone still has a room, and room $1$ is now free. When a coach with infinitely many new guests arrives, the manager moves each guest from room $n$ to room $2n$, freeing all the odd-numbered rooms. The shift $n\mapsto n+1$ is a bijection from $\N$ onto $\N\setminus\set1$, and $n\mapsto 2n$ is a bijection onto the even numbers. The story goes back to lectures given by David Hilbert in the 1920s.
:::

### Finite sets

What does it mean for a set to be finite? For $n\in\N_0$ write $[n] = \set{1,\dots,n}$, with $[0] = \varnothing$. A set is **finite with $n$ elements** if it is equinumerous with $[n]$, and **infinite** if it is not finite. For this to give every finite set a unique number of elements, we need the rigorous form of the pigeonhole principle ([[discrete/advanced-counting#thm-pigeonhole]]).

::: lemma Pigeonhole principle {#lem-pigeonhole}
Let $m, n\in\N_0$. If there is an injection $[m]\to[n]$, then $m\le n$.
:::

::: proof
We use induction on $n$. If $n = 0$ then $[n] = \varnothing$, and a function $[m]\to\varnothing$ exists only if $[m] = \varnothing$, that is, $m = 0$.

Suppose the statement holds for some $n\ge0$, and let $f\colon[m]\to[n+1]$ be injective. If $m = 0$ there is nothing to prove, so let $m\ge1$. Let $\tau\colon[n+1]\to[n+1]$ be the bijection that swaps $f(m)$ and $n+1$ and fixes every other element (if $f(m) = n+1$, then $\tau = \id$). Then $g = \tau\circ f$ is injective and $g(m) = n+1$. For $i\in[m-1]$ we have $g(i)\neq g(m) = n+1$, so $g$ restricts to an injection $[m-1]\to[n]$. By the inductive hypothesis $m-1\le n$, that is, $m\le n+1$.
:::

::: corollary Finite and infinite sets {#cor-finite}
1. If $[m]$ and $[n]$ are equinumerous, then $m = n$. So the number of elements of a finite set is well defined.
2. A finite set is not equinumerous with any proper subset of itself.
3. $\N$ is infinite.
:::

::: proof
1. A bijection $[m]\to[n]$ and its inverse are injections, so $m\le n$ and $n\le m$.

2. Let $h\colon A\to[n]$ be a bijection, let $S\subsetneq A$, and pick $a\in A\setminus S$. Suppose $\psi\colon A\to S$ were a bijection; it is then an injection from $A$ into $A\setminus\set a$. Composing $h$ with the swap of $h(a)$ and $n$, we may assume $h(a) = n$, so that $h$ maps $A\setminus\set a$ into $[n-1]$. Then $h\circ\psi\circ h^{-1}$ is an injection $[n]\to[n-1]$, contradicting [[#lem-pigeonhole]].

3. The shift $n\mapsto n+1$ is a bijection from $\N$ onto its proper subset $\N\setminus\set1$, so by part 2, $\N$ is not finite.
:::

## Countable sets

::: definition Countable and uncountable {#def-countable}
A set $A$ is **countably infinite** if $\abs A = \abs\N$; **countable** if it is finite or countably infinite; and **uncountable** if it is not countable. The cardinality of $\N$ is denoted $\aleph_0$ ("aleph-null").
:::

A bijection $f\colon\N\to A$ arranges the elements of $A$ in a list $f(1), f(2), f(3),\dots$ in which every element appears exactly once. So a set is countably infinite exactly when its elements can be listed as a sequence — "counted", one, two, three, …, even though the count never ends.

::: example The integers are countable {#ex-integers}
List $\Z$ as $0, 1, -1, 2, -2, 3, -3,\dots$; that is, define $f\colon\N\to\Z$ by $f(n) = n/2$ for even $n$ and $f(n) = -(n-1)/2$ for odd $n$. Prove that $f$ is a bijection.
::: solution
For even $n = 2k$ (with $k\ge1$) we get $f(n) = k\ge1$, and for odd $n = 2k-1$ (with $k \geq 1$) we get $f(n) = -(k-1)\le0$. So $f$ sends even numbers to positive integers and odd numbers to non-positive integers.

*Injective.* Suppose $f(n) = f(n')$. Since the value is positive exactly when the argument is even, $n$ and $n'$ have the same parity. If both are even, $n/2 = n'/2$ gives $n = n'$; if both are odd, $-(n-1)/2 = -(n'-1)/2$ gives $n = n'$.

*Surjective.* For $k\ge1$, $f(2k) = k$. For $k\le0$, the number $1-2k$ is odd and at least $1$, and $f(1-2k) = -\frac{(1-2k)-1}{2} = k$.

So $\abs\Z = \abs\N$, although $\Z$ "looks twice as big".
:::
:::

Proving countability by an explicit bijection is often awkward. The next two results let us get away with much less.

::: theorem Subsets of countable sets {#thm-subset-countable}
Every subset of a countable set is countable.
:::

::: proof
Let $A$ be countable and $S\subseteq A$. There is an injection $\varphi\colon A\to\N$: a bijection if $A$ is countably infinite, and a bijection onto some $[n]\subseteq\N$ if $A$ is finite. Then $S$ is equinumerous with $T = \varphi(S)\subseteq\N$, so it suffices to show that every subset $T$ of $\N$ is countable.

If $T$ is finite there is nothing to prove, so suppose $T$ is infinite. Define $t_1 = \min T$ and, recursively, $t_{k+1} = \min\set{t\in T : t>t_k}$. These minima exist by the well-ordering principle ([[proofs/induction#thm-well-ordering]]), because the sets are non-empty: if no element of $T$ exceeded $t_k$, then $T\subseteq[t_k]$ would be finite. The map $k\mapsto t_k$ is strictly increasing, hence injective, and an easy induction gives $t_k\ge k$. It is also surjective. Given $t\in T$, the indices $k$ with $t_k\le t$ form a non-empty set (it contains $1$) of numbers at most $t$; let $k$ be the largest of them. Then $t_k\le t<t_{k+1}$, and $t = t_k$, because $t>t_k$ would force $t\ge t_{k+1}$ by the definition of $t_{k+1}$. So $k\mapsto t_k$ is a bijection $\N\to T$.
:::

::: lemma Criteria for countability {#lem-countable-criteria}
For a non-empty set $A$ the following are equivalent:

1. $A$ is countable;
2. there is an injection $A\to\N$;
3. there is a surjection $\N\to A$.
:::

::: proof
*1 ⇒ 2 and 1 ⇒ 3.* If $A$ is countably infinite, a bijection $\N\to A$ is a surjection and its inverse is an injection $A\to\N$. If $A$ is finite and non-empty, a bijection $h\colon A\to[n]$ with $n\ge1$ is an injection into $\N$, and $k\mapsto h^{-1}(\min(k,n))$ is a surjection $\N\to A$.

*2 ⇒ 1.* If $f\colon A\to\N$ is injective, then $A$ is equinumerous with $f(A)\subseteq\N$, which is countable by [[#thm-subset-countable]]; hence so is $A$.

*3 ⇒ 2.* Let $g\colon\N\to A$ be surjective. For each $a\in A$ the set $\set{n\in\N : g(n) = a}$ is non-empty, so by the well-ordering principle it has a least element; call it $f(a)$. Then $g(f(a)) = a$ for every $a$, so $g\circ f = \id_A$, and $f$ is injective by [[proofs/functions#thm-composition]].
:::

The pairs of natural numbers form an infinite grid, which looks much bigger than $\N$. It is not.

::: theorem The grid of pairs is countable {#thm-nxn}
The map $\N\times\N\to\N$, $(m,n)\mapsto 2^{m-1}(2n-1)$, is a bijection. In particular, $\N\times\N$ is countably infinite.
:::

::: proof
*Surjective.* Let $k\in\N$, and let $2^a$ be the largest power of $2$ dividing $k$ (there is one, since $2^0 = 1$ divides $k$ and every power dividing $k$ is at most $k$). Then $k = 2^a u$ with $u$ odd, for if $u$ were even, $2^{a+1}$ would divide $k$. Writing $u = 2n-1$ with $n\in\N$ and $m = a+1$ gives $k = 2^{m-1}(2n-1)$.

*Injective.* Suppose $2^a u = 2^b v$ with $a, b\ge0$ and $u,v$ odd. If $a<b$, then $u = 2^{b-a}v$ would be even, which is false; similarly $b<a$ is impossible. So $a = b$, and cancelling $2^a$ gives $u = v$. Hence equal values come from equal pairs.
:::

Cantor's own enumeration of the grid walks along the diagonals $m+n = 2, 3, 4,\dots$ in turn: $(1,1)$; then $(1,2), (2,1)$; then $(1,3), (2,2), (3,1)$; and so on. Since each diagonal is finite, every pair is reached after finitely many steps.

::: widget cantor
mode: pairing
size: 8
caption: Cantor's walk through the grid $\N\times\N$, diagonal by diagonal. Every pair is reached after finitely many steps and so receives a number in the list. Compare a row-by-row listing $(1,1), (1,2), (1,3),\dots$: it never leaves the first row, so it fails to list the pairs.
:::

::: corollary Products, rationals and unions {#cor-countable}
1. If $A$ and $B$ are countable, then $A\times B$ is countable.
2. $\Q$ is countable.
3. If $A_1, A_2, A_3,\dots$ are countable sets, then $\bigcup_{n=1}^\infty A_n$ is countable.
:::

::: proof
1. If $A$ or $B$ is empty, so is $A\times B$. Otherwise choose injections $f\colon A\to\N$ and $g\colon B\to\N$ by [[#lem-countable-criteria]]. Then $(a,b)\mapsto(f(a),g(b))$ is an injection $A\times B\to\N\times\N$, and composing with the bijection of [[#thm-nxn]] gives an injection $A\times B\to\N$.

2. $\Z\times\N$ is countable by part 1 and [[#ex-integers]], so there is a surjection $\N\to\Z\times\N$. The map $\Z\times\N\to\Q$, $(p,q)\mapsto p/q$, is surjective, because every rational number can be written with a positive denominator. Composing gives a surjection $\N\to\Q$.

3. Discard the empty sets $A_n$; if all are empty, the union is empty. Let $I\subseteq\N$ be the set of remaining indices. For each $n\in I$ choose a surjection $g_n\colon\N\to A_n$. Then $(n,k)\mapsto g_n(k)$ is a surjection from $I\times\N$ onto the union. Since $I\times\N$ is countable and non-empty, there is a surjection $\N\to I\times\N$, and composing the two gives a surjection from $\N$ onto the union.
:::

::: remark A hidden use of choice
Part 3 chooses a surjection $g_n$ for every $n$ at once: infinitely many arbitrary choices, justified by the **axiom of choice** ([[proofs/functions]]). This is not pedantry. Solomon Feferman and Azriel Lévy showed in 1963 that without the axiom of choice it is consistent that $\R$ is a countable union of countable sets. In concrete cases we can usually avoid choice by writing the enumerations down.
:::

::: widget cantor
mode: rationals
size: 8
caption: The positive rationals, listed by walking through the grid of fractions $p/q$ diagonal by diagonal. Fractions not in lowest terms, such as $2/2$ or $2/4$, repeat values already listed; once they are skipped, each positive rational appears exactly once. Between any two rationals there are infinitely many others, yet they all fit in a single list.
:::

::: example Algebraic numbers {#ex-algebraic}
A real number is **algebraic** if it is a root of a non-zero polynomial with integer coefficients — for example $\sqrt2$, a root of $x^2-2$, and every rational $p/q$, a root of $qx-p$ — and **transcendental** otherwise. Prove that the set of algebraic numbers is countable.
::: solution
For each $d\in\N$, a polynomial $a_0+a_1x+\cdots+a_dx^d$ of degree at most $d$ with integer coefficients is determined by the tuple $(a_0,\dots,a_d)\in\Z^{d+1}$, and $\Z^{d+1}$ is countable by repeated use of [[#cor-countable]], part 1. So the set $P$ of all non-zero polynomials with integer coefficients is a countable union of countable sets, hence countable by part 3. A non-zero polynomial of degree $d$ has at most $d$ real roots ([[abstract-algebra/polynomials]]), so the set of algebraic numbers is the union, over the countably many $p \in P$, of the finite sets of roots of $p$. By part 3 again it is countable.

Combined with the uncountability of $\R$ (proved next), this shows that transcendental numbers exist — indeed, all but countably many real numbers are transcendental — without exhibiting a single one. This was Cantor's argument of 1874. Joseph Liouville had constructed explicit transcendental numbers in 1844, and $e$ and $\pi$ were proved transcendental by Charles Hermite (1873) and Ferdinand von Lindemann (1882).
:::
:::

## Uncountable sets

### The diagonal argument

We use two facts about decimals, proved from the completeness of $\R$ in [[real-analysis/series]]. Every $x\in[0,1)$ has a decimal expansion $x = 0.d_1d_2d_3\ldots = \sum_{k\ge1}d_k10^{-k}$ with digits $d_k\in\set{0,\dots,9}$. Some numbers have two expansions, such as $0.5000\ldots = 0.4999\ldots$, but if we forbid expansions that end in an infinite string of $9$s, then every $x\in[0,1)$ has **exactly one** expansion.

::: theorem The real numbers are uncountable {#thm-reals-uncountable}
The interval $(0,1)$ is uncountable. Consequently $\R$ is uncountable.
:::

::: proof
By [[#lem-countable-criteria]] it suffices to show that no function $f\colon\N\to(0,1)$ is surjective. So let $f$ be any such function, and write each value in its decimal expansion that does not end in $9$s:

$$
\begin{aligned}
f(1) &= 0.\,\mathbf{d_{11}}\,d_{12}\,d_{13}\,d_{14}\ldots\\
f(2) &= 0.\,d_{21}\,\mathbf{d_{22}}\,d_{23}\,d_{24}\ldots\\
f(3) &= 0.\,d_{31}\,d_{32}\,\mathbf{d_{33}}\,d_{34}\ldots\\
&\ \ \vdots
\end{aligned}
$$

Define $x = 0.e_1e_2e_3\ldots$ by changing the diagonal digits:

$$
e_n = \begin{cases} 4, & \text{if } d_{nn} = 5,\\ 5, & \text{if } d_{nn}\neq 5.\end{cases}
$$

All digits of $x$ are $4$ or $5$, so $0 < \frac49 = 0.444\ldots\le x\le 0.555\ldots = \frac59 < 1$ and $x\in(0,1)$; and the expansion of $x$ does not end in $9$s, so it is *the* allowed expansion of $x$. For each $n$, the allowed expansions of $x$ and of $f(n)$ differ in the $n$th digit, since $e_n\neq d_{nn}$. By uniqueness of allowed expansions, $x\neq f(n)$. So $x$ is not a value of $f$, and $f$ is not surjective.

Hence $(0,1)$ is uncountable, and since a subset of a countable set is countable ([[#thm-subset-countable]]), so is $\R$.
:::

The choice of the digits $4$ and $5$ is deliberate. Had we changed digits to $0$ or $9$, the number $x$ might have turned out to be, say, $0.0999\ldots$, which equals $0.1000\ldots$ and could appear in the list in that other form. Keeping away from $0$ and $9$ sidesteps the problem of double expansions entirely.

::: widget cantor
mode: diagonal
size: 8
caption: Cantor's diagonal argument. Whatever list of expansions is shown, the new number is built by changing the $n$th digit of the $n$th entry, so it differs from every entry in at least one place. Whatever list you start from, the construction defeats it: no list of real numbers is ever complete.
:::

Since $\R = \Q\cup(\R\setminus\Q)$ and a union of two countable sets is countable, the irrational numbers are uncountable: in the sense of cardinality, almost every real number is irrational. Likewise, by [[#ex-algebraic]], almost every real number is transcendental.

### Cantor's theorem

The diagonal idea works far beyond the real numbers.

::: theorem Cantor's theorem {#thm-cantor}
For every set $A$ there is no surjection $A\to\mathcal{P}(A)$. Consequently $\abs A<\abs{\mathcal{P}(A)}$.
:::

::: proof
Let $f\colon A\to\mathcal{P}(A)$ be any function, and consider the set

$$
D = \set{a\in A : a\notin f(a)}.
$$

Then $D\subseteq A$, so $D\in\mathcal{P}(A)$. Suppose $D = f(d)$ for some $d\in A$. If $d\in D$, then by the definition of $D$, $d\notin f(d) = D$. If $d\notin D = f(d)$, then $d$ satisfies the condition defining $D$, so $d\in D$. Both cases are contradictory, so $D$ is not a value of $f$ and $f$ is not surjective.

In particular there is no bijection $A\to\mathcal{P}(A)$, so $\abs A\neq\abs{\mathcal{P}(A)}$. Since $a\mapsto\set a$ is an injection $A\to\mathcal{P}(A)$, we have $\abs A\le\abs{\mathcal{P}(A)}$, and therefore $\abs A < \abs{\mathcal{P}(A)}$.
:::

The set $D$ is a diagonal construction in disguise. Think of a table with a row for each $a\in A$ and a column for each $b \in A$, with entry "yes" when $b\in f(a)$. The row of $a$ describes the set $f(a)$; $D$ is obtained by reading the diagonal and switching every answer, so it differs from each row $f(a)$ at the entry $(a,a)$. The same trick, applied to "the set of all sets", produced Russell's paradox ([[proofs/sets#thm-russell]]).

Applying Cantor's theorem repeatedly gives $\abs\N<\abs{\mathcal{P}(\N)}<\abs{\mathcal{P}(\mathcal{P}(\N))}<\cdots$: there are infinitely many different sizes of infinity, and none is the largest. For a finite set with $n$ elements the theorem says $n<2^n$.

::: quiz
Which of the following sets is uncountable?
- [ ] $\Z\times\Z\times\Z$
- [ ] the set of all finite subsets of $\N$
- [ ] $\Q\cap(0,1)$
- [x] the set of all subsets of $\N$
::: solution
$\Z\times\Z\times\Z = (\Z\times\Z)\times\Z$ is countable by applying [[#cor-countable]] twice. The finite subsets of $\N$ form the union of the finite sets $\mathcal{P}([n])$ over $n\in\N$, a countable union of finite sets. $\Q\cap(0,1)$ is a subset of the countable set $\Q$. But $\mathcal{P}(\N)$ is uncountable: by Cantor's theorem there is not even a surjection from $\N$ onto it.
:::
:::

## The Schröder–Bernstein theorem

If $\abs A\le\abs B$ and $\abs B\le\abs A$, do $A$ and $B$ have the same size? For finite sets, yes, by counting. For infinite sets the two injections do not hand us a bijection, since neither need be surjective — think of $n\mapsto 2n$ from $\N$ to $\N$, in both directions. Nevertheless the answer is yes, and this theorem is the most useful tool for proving that two sets are equinumerous.

::: theorem Schröder–Bernstein theorem {#thm-schroder-bernstein}
If there are injections $f\colon A\to B$ and $g\colon B\to A$, then there is a bijection $h\colon A\to B$. In other words, if $\abs A\le\abs B$ and $\abs B\le\abs A$, then $\abs A = \abs B$.
:::

::: proof
Let $C_0 = A\setminus g(B)$, the elements of $A$ not hit by $g$; let $C_{n+1} = g(f(C_n))$ for $n\ge0$; and let $C = \bigcup_{n\ge0}C_n$. If $a\in A\setminus C$, then in particular $a\notin C_0$, so $a\in g(B)$; as $g$ is injective there is exactly one $b\in B$ with $g(b) = a$, which we denote $g^{-1}(a)$. Define

$$
h(a) = \begin{cases} f(a), & a\in C,\\ g^{-1}(a), & a\notin C.\end{cases}
$$

*$h$ is injective.* Let $h(a) = h(a')$. If $a, a'\in C$, then $f(a) = f(a')$ and $a = a'$ because $f$ is injective. If $a, a'\notin C$, then $g^{-1}(a) = g^{-1}(a')$, and applying $g$ gives $a = a'$. Finally suppose $a\in C$ and $a'\notin C$. Then $f(a) = g^{-1}(a')$, so $a' = g(f(a))$. But $a\in C_n$ for some $n$, so $a' = g(f(a))\in C_{n+1}\subseteq C$, a contradiction. So this case cannot occur.

*$h$ is surjective.* Let $b\in B$. If $g(b)\notin C$, then $h(g(b)) = g^{-1}(g(b)) = b$. If $g(b)\in C$, then $g(b)\notin C_0$ (since $g(b)\in g(B)$), so $g(b)\in C_{n+1} = g(f(C_n))$ for some $n\ge0$; that is, $g(b) = g(f(a))$ for some $a\in C_n$. Since $g$ is injective, $b = f(a)$ with $a\in C$, and so $b = h(a)$.
:::

::: intuition Following chains
Start at any element and apply $f$ and $g$ alternately forwards, and $g^{-1}$ and $f^{-1}$ backwards for as long as possible. The elements of $A$ and $B$ split into separate chains. A chain that, traced backwards, starts at an element of $A$ missed by $g$ is matched up using $f$; these chains make up the set $C$. Every other chain — one that starts in $B$, never starts, or closes up into a loop — is matched up using $g^{-1}$. The proof is a careful version of this picture.
:::

::: example A closed and an open interval {#ex-closed-open}
Prove that $\abs{[0,1]} = \abs{(0,1)}$.
::: solution
The inclusion $(0,1)\to[0,1]$ is injective. The map $x\mapsto(x+1)/3$ is injective and sends $[0,1]$ onto $[\frac13,\frac23]\subseteq(0,1)$, so it is an injection $[0,1]\to(0,1)$. By the Schröder–Bernstein theorem there is a bijection.

An explicit bijection also exists, in the spirit of Hilbert's hotel: send $0\mapsto\frac12$, $1\mapsto\frac13$, $\frac1n\mapsto\frac1{n+2}$ for $n\ge2$, and fix every other point. But the theorem saves us from having to find it.
:::
:::

::: example The real numbers and the subsets of ℕ {#ex-continuum}
Prove that $\abs\R = \abs{\mathcal{P}(\N)}$.
::: solution
*$\abs{\mathcal{P}(\N)}\le\abs\R$.* Send $S\subseteq\N$ to the number $x_S = \sum_{n\in S}10^{-n}\in[0,1)$, whose decimal expansion has digit $1$ in the $n$th place if $n\in S$ and $0$ otherwise. This expansion contains no $9$s, so it is the unique allowed expansion of $x_S$, and different sets give different expansions, hence different numbers. So $S\mapsto x_S$ is injective.

*$\abs\R\le\abs{\mathcal{P}(\N)}$.* Send $x\in\R$ to the set of rationals below it, $L_x = \set{q\in\Q : q<x}$. If $x<y$, there is a rational $q$ with $x<q<y$ ([[real-analysis/real-numbers]]), and then $q\in L_y\setminus L_x$; so $x\mapsto L_x$ is an injection $\R\to\mathcal{P}(\Q)$. A bijection $\varphi\colon\Q\to\N$ ([[#cor-countable]]) induces a bijection $\mathcal{P}(\Q)\to\mathcal{P}(\N)$, $T\mapsto\varphi(T)$, and composing gives an injection $\R\to\mathcal{P}(\N)$.

By the Schröder–Bernstein theorem, $\abs\R = \abs{\mathcal{P}(\N)}$.
:::
:::

::: quiz
Which pair of sets does *not* have the same cardinality?
- [ ] $\N$ and $\Q$
- [ ] $(0,1)$ and $\R$
- [ ] $\R$ and $\mathcal{P}(\N)$
- [x] $\N$ and $\mathcal{P}(\N)$
::: solution
$\abs\N = \abs\Q$ by [[#cor-countable]]; $\abs{(0,1)} = \abs\R$ by an exercise at the end of this chapter; and $\abs\R = \abs{\mathcal{P}(\N)}$ by [[#ex-continuum]]. But $\abs\N<\abs{\mathcal{P}(\N)}$ by Cantor's theorem ([[#thm-cantor]]).
:::
:::

The cardinality of $\R$ is called the **cardinality of the continuum** and denoted $\mathfrak{c}$. By [[#ex-continuum]] it is also the cardinality of $\mathcal{P}(\N)$, which is why it is often written $2^{\aleph_0}$.

::: remark The continuum hypothesis
Is there a set $S$ with $\aleph_0<\abs S<\mathfrak c$, an infinity strictly between the countable and the continuum? Cantor conjectured that there is not — the **continuum hypothesis** — and tried for years to prove it, and David Hilbert placed it first in his famous list of problems of 1900. The answer is remarkable: Kurt Gödel showed in 1940 that the continuum hypothesis cannot be disproved from the standard axioms of set theory (ZFC), and Paul Cohen showed in 1963 that it cannot be proved from them either. The usual axioms of mathematics simply do not decide it.
:::

::: application Most functions cannot be computed
A computer program is a finite string of characters from a finite alphabet, so the set of all programs is a countable union of finite sets, and is countable. But the set of functions $\N\to\set{0,1}$ — equivalently, of subsets of $\N$ — is uncountable by Cantor's theorem. So almost all such functions are computed by no program whatsoever. Alan Turing made the notion of a program precise in 1936 and used a diagonal argument to show that some questions about programs cannot be decided by any program; the best-known example is whether a given program eventually halts.
:::

::: history
In his *Two New Sciences* (1638), Galileo Galilei observed that the perfect squares can be paired with all the natural numbers and concluded that "greater" and "smaller" do not apply to infinite collections. Georg Cantor took the opposite view. In 1874 he proved that the algebraic numbers are countable but the real numbers are not; in 1877 he found, to his own surprise, that a square contains exactly as many points as a line segment; and in 1891 he published the diagonal argument together with the theorem now named after him. Richard Dedekind made "equinumerous with a proper subset" the definition of an infinite set in 1888. Cantor's ideas met fierce opposition, notably from Leopold Kronecker, but by 1926 David Hilbert could declare that no one would drive mathematicians out of the paradise Cantor had created for them.
:::

## Where this leads

The distinction between countable and uncountable runs through analysis. Every countable set of real numbers has Lebesgue measure zero, whereas intervals do not; the Cantor set is an uncountable set of measure zero ([[measure-theory/lebesgue-measure]]). Probability theory allows countable but not uncountable additivity ([[probability/probability-spaces]]), and countability conditions such as separability are basic in topology ([[topology/topological-spaces]]). Finite cardinalities are the subject of [[discrete/counting]], where bijections become the main tool for proving that two collections have the same size.

::: summary
- $\abs A = \abs B$ means that there is a bijection $A\to B$, and $\abs A\le\abs B$ that there is an injection. Infinite sets can be equinumerous with proper subsets ($\N$ and the even numbers, Hilbert's hotel); finite sets cannot, by the pigeonhole principle.
- A set is countable if it is finite or in bijection with $\N$, that is, if its elements can be listed. To prove countability, it is enough to find an injection into $\N$ or a surjection from $\N$ ([[#lem-countable-criteria]]).
- $\Z$, $\N\times\N$, $\Q$, the algebraic numbers and countable unions of countable sets are all countable.
- $\R$ is uncountable: the diagonal argument constructs a number missing from any list ([[#thm-reals-uncountable]]). Hence the irrational and the transcendental numbers are uncountable.
- Cantor's theorem: there is no surjection $A\to\mathcal{P}(A)$, so $\abs A<\abs{\mathcal{P}(A)}$ and there is no largest infinity.
- Schröder–Bernstein: injections in both directions give a bijection. For example $\abs{[0,1]} = \abs{(0,1)}$ and $\abs{\R} = \abs{\mathcal{P}(\N)} = \mathfrak c$.
- Whether some cardinality lies strictly between $\aleph_0$ and $\mathfrak c$ is not decided by the usual axioms.
:::

## Exercises

::: exercise Explicit bijections {level=1}
Write down explicit bijections (a) $\N\to\N\setminus\set{1,2,3}$; (b) $(0,1)\to(3,8)$; (c) $\N\to\Z\setminus\set0$.
::: solution
(a) $n\mapsto n+3$, with inverse $m\mapsto m-3$.

(b) $x\mapsto 3+5x$, with inverse $y\mapsto(y-3)/5$; if $0<x<1$ then $3<3+5x<8$, and conversely.

(c) $f(n) = n/2$ for even $n$ and $f(n) = -(n+1)/2$ for odd $n$, giving the list $-1, 1, -2, 2, -3, 3,\dots$. Even numbers go bijectively to the positive integers ($2k\mapsto k$) and odd numbers bijectively to the negative integers ($2k-1\mapsto -k$), so $f$ is a bijection.
:::
:::

::: exercise Countable or not? {level=1}
Which of the following sets are countable? (a) $\Z\times\Z$; (b) the set of irrational numbers; (c) the set of all finite strings of letters from $\set{a,b,\dots,z}$; (d) $\set{x\in\R : x^2\in\Q}$; (e) the set of all infinite sequences of $0$s and $1$s.
::: solution
(a) Countable, by [[#cor-countable]], part 1.

(b) Uncountable: if the irrationals were countable, $\R$ would be the union of two countable sets and hence countable.

(c) Countable: for each length $n$ there are $26^n$ strings, a finite number, and the set of all strings is a countable union of these finite sets.

(d) Countable: the set is $\set{\pm\sqrt q : q\in\Q,\ q\ge0}$, the image of the countable set $\set{q \in \Q : q \geq 0} \times\set{1,-1}$ under $(q,s)\mapsto s\sqrt q$, and the image of a countable set under any function is countable (compose with a surjection from $\N$).

(e) Uncountable: such sequences correspond to subsets of $\N$ (a sequence is the characteristic function of the set of positions where it equals $1$), and $\mathcal{P}(\N)$ is uncountable by [[#thm-cantor]].
:::
:::

::: exercise Position in Cantor's list {level=1 check="18"}
Cantor's diagonal enumeration of $\N\times\N$ assigns to $(m,n)$ the number $\pi(m,n) = \frac{(m+n-2)(m+n-1)}{2} + m$. Check that $\pi(1,1) = 1$, $\pi(1,2) = 2$ and $\pi(2,1) = 3$, and compute $\pi(3,4)$.
::: solution
$\pi(1,1) = 0 + 1 = 1$, $\pi(1,2) = \frac{1\cdot2}{2}+1 = 2$ and $\pi(2,1) = 1 + 2 = 3$. For $(3,4)$ we have $m+n = 7$, so $\pi(3,4) = \frac{5\cdot6}{2}+3 = 15+3 = 18$. (The first term counts the $1+2+\cdots+5 = 15$ pairs on the earlier diagonals $m+n = 2,\dots,6$, and $m = 3$ is the position on the diagonal $m+n = 7$.)
:::
:::

::: exercise An interval and the real line {level=2}
Show that $g\colon(-1,1)\to\R$, $g(x) = \dfrac{x}{1-\abs x}$, is a bijection, and deduce that $\abs{(0,1)} = \abs\R$.
::: hint
Guess the inverse by solving $y = x/(1-\abs x)$, noting that $x$ and $y$ have the same sign.
:::
::: solution
Let $k\colon\R\to(-1,1)$, $k(y) = \dfrac{y}{1+\abs y}$; note $\abs{k(y)} = \frac{\abs y}{1+\abs y}<1$, so $k$ does map into $(-1,1)$. For $x\in(-1,1)$, $g(x)$ has the same sign as $x$ and $\abs{g(x)} = \frac{\abs x}{1-\abs x}$, so $1+\abs{g(x)} = \frac{1}{1-\abs x}$ and

$$
k(g(x)) = \frac{x}{1-\abs x}\cdot(1-\abs x) = x.
$$

For $y\in\R$, $k(y)$ has the same sign as $y$, $1-\abs{k(y)} = \frac{1}{1+\abs y}$, and $g(k(y)) = \frac{y}{1+\abs y}\cdot(1+\abs y) = y$. So $g$ has a two-sided inverse and is a bijection. Composing with the bijection $(0,1)\to(-1,1)$, $x\mapsto 2x-1$, gives a bijection $(0,1)\to\R$.
:::
:::

::: exercise Finite subsets of the natural numbers {level=2}
Let $\mathcal{F}$ be the set of all finite subsets of $\N$. Show that $F(S) = 1 + \sum_{k\in S}2^{k-1}$ defines an injection $\mathcal F\to\N$, and conclude that $\mathcal F$ is countable. Is $F$ surjective?
::: solution
$F(S) - 1 = \sum_{k\in S}2^{k-1}$ is the number whose binary representation has a $1$ in position $k-1$ (counting from $0$) exactly for $k\in S$. Every non-negative integer has exactly one binary representation, so different finite sets give different numbers, and $F$ is injective. By [[#lem-countable-criteria]], $\mathcal F$ is countable. In fact $F$ is surjective: every $m\in\N$ has $m-1\ge0$, which has a binary representation, and the positions of its $1$s (shifted by one) form a finite set $S$ with $F(S) = m$. (For example $F(\varnothing) = 1$ and $F(\set{1,3}) = 1 + 1 + 4 = 6$.) So $F$ is a bijection.
:::
:::

::: exercise Binary sequences {level=2}
Prove directly, by a diagonal argument, that the set of all infinite sequences $(s_1, s_2, s_3,\dots)$ with each $s_k\in\set{0,1}$ is uncountable.
::: solution
The set is non-empty, so by [[#lem-countable-criteria]] it suffices to show that no function $F$ from $\N$ to the set of sequences is surjective. Write $F(n) = (s_{n1}, s_{n2}, s_{n3},\dots)$ and define the sequence $t$ by $t_n = 1-s_{nn}$. For every $n$, the sequences $t$ and $F(n)$ differ in the $n$th term, so $t\neq F(n)$. Hence $t$ is not a value of $F$. (No issue of double representations arises here, because two sequences are equal only if they agree in every term.)
:::
:::

::: exercise Sequences of natural numbers {level=2}
Call a sequence $(a_1, a_2, \dots)$ of natural numbers *eventually constant at $1$* if $a_n = 1$ for all sufficiently large $n$. Prove that the set of such sequences is countable, but the set of all sequences of natural numbers is uncountable.
::: hint
For the first part, consider the sequences with $a_n = 1$ for all $n > N$, for each fixed $N$.
:::
::: solution
For fixed $N\in\N$, a sequence with $a_n = 1$ for all $n>N$ is determined by $(a_1,\dots,a_N)\in\N^N$, which is countable by [[#cor-countable]], part 1, applied repeatedly. The set of sequences that are eventually constant at $1$ is the union of these countably many countable sets, one for each $N$, and so is countable by part 3.

The set of all sequences of natural numbers contains the sequences with every term in $\set{1,2}$, which correspond to the $0$–$1$ sequences (subtract $1$ from every term) and so form an uncountable set by the previous exercise. A set with an uncountable subset is uncountable, by [[#thm-subset-countable]].
:::
:::

::: exercise No injection back {level=3}
Prove that for every set $A$ there is no injection $\mathcal{P}(A)\to A$.
::: hint
Combine Cantor's theorem with the Schröder–Bernstein theorem.
:::
::: solution
Suppose $j\colon\mathcal{P}(A)\to A$ were injective. The map $i\colon A\to\mathcal{P}(A)$, $a\mapsto\set a$, is also injective, so by the Schröder–Bernstein theorem ([[#thm-schroder-bernstein]]) there would be a bijection $A\to\mathcal{P}(A)$. A bijection is surjective, which contradicts Cantor's theorem ([[#thm-cantor]]). So no such $j$ exists.
:::
:::

::: exercise The square and the segment {level=3}
Prove that $\abs{(0,1)\times(0,1)} = \abs{(0,1)}$, and deduce that $\abs{\R\times\R} = \abs\R$.
::: hint
Interleave the digits of the allowed decimal expansions of $x$ and $y$, and use the Schröder–Bernstein theorem.
:::
::: solution
The map $x\mapsto(x,\frac12)$ is an injection $(0,1)\to(0,1)\times(0,1)$. In the other direction, write $x = 0.x_1x_2x_3\ldots$ and $y = 0.y_1y_2y_3\ldots$ in their expansions not ending in $9$s, and let $\Phi(x,y) = 0.x_1y_1x_2y_2x_3y_3\ldots$. This expansion does not end in $9$s either, since otherwise both the odd- and even-position digits, that is, the digits of $x$ and of $y$, would eventually all be $9$. It is not $0.000\ldots$, because $x \neq 0$. So it is the allowed expansion of a number $\Phi(x,y)\in(0,1)$, and from it we can read off the expansions of $x$ and $y$; hence $\Phi$ is injective. By the Schröder–Bernstein theorem $\abs{(0,1)\times(0,1)} = \abs{(0,1)}$.

Finally, a bijection $\beta\colon(0,1)\to\R$ (see the earlier exercise) gives a bijection $(x,y)\mapsto(\beta(x),\beta(y))$ from $(0,1)\times(0,1)$ to $\R\times\R$, so $\abs{\R\times\R} = \abs{(0,1)\times(0,1)} = \abs{(0,1)} = \abs\R$. (The map $\Phi$ is not surjective — no number with expansion $0.x_1 9 x_2 9 x_3 9\ldots$ is a value — which is why the Schröder–Bernstein theorem is so convenient here.)
:::
:::

::: exercise Room for one more {level=3}
Let $A$ be a set containing a countably infinite subset $C = \set{c_1, c_2, c_3,\dots}$, with the $c_n$ distinct. Prove that $A$ is equinumerous with $A\setminus\set{c_1}$. (It can be shown, using the axiom of choice, that every infinite set has a countably infinite subset; so a set is infinite exactly when it is equinumerous with a proper subset of itself.)
::: solution
Define $h\colon A\to A\setminus\set{c_1}$ by $h(c_n) = c_{n+1}$ for every $n\in\N$, and $h(a) = a$ for $a\notin C$. The values lie in $A\setminus\set{c_1}$: elements outside $C$ are not equal to $c_1$, and $c_{n+1}\neq c_1$ since the $c_n$ are distinct.

*Injective.* Elements outside $C$ are mapped to themselves, outside $C$, while elements of $C$ are mapped into $C$; so it suffices to compare within each part. On $A\setminus C$, $h$ is the identity. On $C$, $c_{n+1} = c_{m+1}$ implies $n = m$.

*Surjective.* An element $a\in A\setminus\set{c_1}$ either lies outside $C$, in which case $a = h(a)$, or equals $c_m$ for some $m\ge2$, in which case $a = h(c_{m-1})$.

So $h$ is a bijection — Hilbert's hotel inside an arbitrary infinite set.
:::
:::
