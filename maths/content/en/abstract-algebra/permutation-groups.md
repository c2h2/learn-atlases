In the 1870s and 1880s a puzzle swept America and Europe: fifteen numbered tiles in a $4\times4$ tray with one empty square, to be slid around until they were in order. Puzzle sellers offered the tray with tiles $14$ and $15$ swapped and challenged buyers to put them right. Nobody ever could, and by the end of this chapter you will be able to prove that nobody ever will: every sequence of moves rearranges the tiles by an *even* permutation, and swapping two tiles is odd.

Permutations — rearrangements of a finite set — were the first groups ever studied. Lagrange, Ruffini, Cauchy and Galois all thought about groups as collections of permutations of the roots of an equation, long before the abstract definition of [[abstract-algebra/groups]] existed. They remain central for a precise reason, Cayley's theorem: *every* group is a group of permutations. In this chapter we learn to compute with permutations efficiently using cycle notation, prove that every permutation has a well-defined **sign**, meet the alternating groups, and study the symmetry groups of regular polygons, the **dihedral groups**.

## Symmetric groups

::: definition Symmetric group {#def-symmetric-group}
For a set $X$, the **symmetric group** $\operatorname{Sym}(X)$ is the set of all bijections $X \to X$, called **permutations** of $X$, with composition as the operation. For $X = \set{1, 2, \dots, n}$ we write $S_n$, the **symmetric group of degree $n$**.
:::

$\operatorname{Sym}(X)$ is a group: the composite of two bijections is a bijection, composition of functions is associative, the identity map $\id$ (which we also call $e$) is the identity, and a bijection has an inverse function, which is again a bijection (see [[proofs/functions]]). To count $S_n$, build a permutation $\sigma$ by choosing $\sigma(1)$ ($n$ choices), then $\sigma(2) \neq \sigma(1)$ ($n-1$ choices), and so on (see [[discrete/counting]]):

$$
\abs{S_n} = n(n-1)\cdots 2 \cdot 1 = n! .
$$

So $\abs{S_3} = 6$, $\abs{S_4} = 24$, $\abs{S_5} = 120$, and $\abs{S_{10}} = 3\,628\,800$ — symmetric groups get large very quickly.

A permutation can be written in **two-line notation**, listing each $i$ above its image $\sigma(i)$:

$$
\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 1 & 3 \end{pmatrix}
$$

means $\sigma(1) = 2$, $\sigma(2) = 4$, $\sigma(3) = 1$, $\sigma(4) = 3$. Its inverse is obtained by swapping the two rows (and re-sorting the columns): $\sigma^{-1}(2) = 1$, $\sigma^{-1}(4) = 2$, and so on.

**The convention for products.** We compose permutations like functions, from right to left:

$$
\sigma\tau = \sigma \circ \tau, \qquad (\sigma\tau)(i) = \sigma(\tau(i)) \qquad (\text{apply } \tau \text{ first}).
$$

Some books (and some computer algebra systems) use the opposite convention, so always check which one is in force.

::: example Products in S₄ {#ex-two-line}
With $\sigma$ as above and $\tau = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 3 & 2 & 4 & 1 \end{pmatrix}$, compute $\sigma\tau$ and $\tau\sigma$.
::: solution
For $\sigma\tau$, apply $\tau$ then $\sigma$:

$$
1 \xrightarrow{\tau} 3 \xrightarrow{\sigma} 1, \quad 2 \xrightarrow{\tau} 2 \xrightarrow{\sigma} 4, \quad 3 \xrightarrow{\tau} 4 \xrightarrow{\sigma} 3, \quad 4 \xrightarrow{\tau} 1 \xrightarrow{\sigma} 2,
\qquad\text{so}\qquad \sigma\tau = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 1 & 4 & 3 & 2 \end{pmatrix}.
$$

For $\tau\sigma$, apply $\sigma$ then $\tau$: $1 \mapsto 2 \mapsto 2$, $2 \mapsto 4 \mapsto 1$, $3 \mapsto 1 \mapsto 3$, $4 \mapsto 3 \mapsto 4$, so

$$
\tau\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 1 & 3 & 4 \end{pmatrix} \neq \sigma\tau .
$$

So $S_4$ is non-abelian. In general $S_n$ is non-abelian for every $n \ge 3$, since the two permutations used for $D_3$ in [[abstract-algebra/groups#ex-triangle]] can be extended by fixing $4, \dots, n$.
:::
:::

## Cycle notation

Two-line notation hides the structure of a permutation. Follow $\sigma$ above starting from $1$: $1 \mapsto 2 \mapsto 4 \mapsto 3 \mapsto 1$. The permutation moves the four symbols around a single loop.

::: definition Cycles {#def-cycle}
Let $a_1, \dots, a_k$ be distinct elements of $\set{1, \dots, n}$. The **cycle** $(a_1\ a_2\ \dots\ a_k)$ is the permutation sending $a_1 \mapsto a_2 \mapsto \dots \mapsto a_k \mapsto a_1$ and fixing every other element. Its **length** is $k$; a cycle of length $k$ is a **$k$-cycle**, and a $2$-cycle is a **transposition**. Cycles $(a_1\ \dots\ a_k)$ and $(b_1\ \dots\ b_l)$ are **disjoint** if no $a_i$ equals any $b_j$.
:::

The same cycle can be written starting from any of its entries: $(1\ 2\ 4\ 3) = (2\ 4\ 3\ 1) = (4\ 3\ 1\ 2)$. The inverse of a cycle runs it backwards: $(a_1\ a_2\ \dots\ a_k)^{-1} = (a_k\ \dots\ a_2\ a_1)$. Disjoint cycles **commute**: if $\alpha$ and $\beta$ are disjoint, then for a symbol $i$ moved by $\alpha$, both $\alpha\beta$ and $\beta\alpha$ send $i$ to $\alpha(i)$ (because $\beta$ fixes both $i$ and $\alpha(i)$); symmetrically for symbols moved by $\beta$; and both fix everything else.

::: theorem Disjoint cycle decomposition {#thm-cycle-decomposition}
Every permutation $\sigma \in S_n$ is a product of disjoint cycles. The decomposition is unique apart from the order of the factors (and the inclusion or omission of $1$-cycles).
:::

::: proof
*Existence.* Define $i \sim j$ if $j = \sigma^k(i)$ for some $k \in \Z$. This is an equivalence relation on $\set{1, \dots, n}$ (reflexive with $k = 0$, symmetric since $i = \sigma^{-k}(j)$, transitive since $\sigma^l(\sigma^k(i)) = \sigma^{k+l}(i)$); see [[proofs/relations]]. Its classes are the **orbits** of $\sigma$. Fix $i$. The symbols $i, \sigma(i), \sigma^2(i), \dots$ cannot all be distinct, so let $m \ge 1$ be least with $\sigma^m(i) \in \set{i, \sigma(i), \dots, \sigma^{m-1}(i)}$. If $\sigma^m(i) = \sigma^j(i)$ with $1 \le j < m$, then applying $\sigma^{-1}$ gives $\sigma^{m-1}(i) = \sigma^{j-1}(i)$, contradicting minimality; so $\sigma^m(i) = i$. Then $\sigma^k(i)$ depends only on $k$ modulo $m$, so the orbit of $i$ is exactly $\set{i, \sigma(i), \dots, \sigma^{m-1}(i)}$, and on this orbit $\sigma$ acts as the cycle

$$
\gamma_i = \bigl(i\ \ \sigma(i)\ \ \sigma^2(i)\ \ \cdots\ \ \sigma^{m-1}(i)\bigr).
$$

The orbits partition $\set{1, \dots, n}$, so the cycles $\gamma$ obtained from the different orbits are disjoint, and their product agrees with $\sigma$ on every symbol: $\sigma = \gamma_{1}\gamma_{2}\cdots$ (one cycle per orbit).

*Uniqueness.* Suppose $\sigma = \beta_1\cdots\beta_t$ with disjoint cycles $\beta_j$ of length at least $2$. If $i$ is moved by $\beta_j$, then $\sigma$ agrees with $\beta_j$ on $i$ and all its images, so $\beta_j = \bigl(i\ \sigma(i)\ \cdots\bigr)$ is the cycle of $\sigma$ through $i$ constructed above. Hence the $\beta_j$ are exactly the cycles of length at least $2$ found in the existence part.
:::

The proof is also an algorithm: start with the smallest symbol not yet used, follow it until you return, close the cycle, and repeat. One-cycles (fixed points) are usually omitted, so $(1\ 2\ 4\ 3)$ in $S_5$ fixes $5$.

::: example Decomposing a permutation {#ex-decompose}
Write $\sigma = \begin{pmatrix} 1&2&3&4&5&6&7&8&9\\ 5&7&9&1&4&2&3&8&6\end{pmatrix}$ in cycle notation.
::: solution
Start at $1$: $1 \mapsto 5 \mapsto 4 \mapsto 1$, giving $(1\ 5\ 4)$. The smallest unused symbol is $2$: $2 \mapsto 7 \mapsto 3 \mapsto 9 \mapsto 6 \mapsto 2$, giving $(2\ 7\ 3\ 9\ 6)$. Only $8$ remains, and $\sigma(8) = 8$. So

$$
\sigma = (1\ 5\ 4)(2\ 7\ 3\ 9\ 6).
$$
:::
:::

Multiplying permutations in cycle notation needs only the right-to-left rule: to find where a symbol goes, push it through the cycles from the rightmost to the leftmost.

::: example Products of cycles {#ex-cycle-products}
In $S_5$, compute $(1\ 3\ 5)(1\ 2)$ and $(1\ 2)(1\ 3\ 5)$.
::: solution
For $(1\ 3\ 5)(1\ 2)$: $1$ goes to $2$ under $(1\ 2)$, and $(1\ 3\ 5)$ fixes $2$, so $1 \mapsto 2$. Next $2 \mapsto 1 \mapsto 3$, then $3 \mapsto 3 \mapsto 5$, then $5 \mapsto 5 \mapsto 1$, closing the cycle; $4$ is fixed. So $(1\ 3\ 5)(1\ 2) = (1\ 2\ 3\ 5)$.

For $(1\ 2)(1\ 3\ 5)$: $1 \mapsto 3 \mapsto 3$, $3 \mapsto 5 \mapsto 5$, $5 \mapsto 1 \mapsto 2$, $2 \mapsto 2 \mapsto 1$. So $(1\ 2)(1\ 3\ 5) = (1\ 3\ 5\ 2)$, a different $4$-cycle.
:::
:::

::: widget permutation
perm: 5 7 9 1 4 2 3 8 6
second: (1 2)
caption: The permutation of [[#ex-decompose]] as an arrow diagram: its cycles $(1\ 5\ 4)$ and $(2\ 7\ 3\ 9\ 6)$ appear as separate loops, and $8$ is a fixed point. Compare the order and sign the figure reports with [[#thm-order-lcm]] and [[#thm-sign]]. The figure also composes $\sigma$ with $(1\ 2)$: work out both $\sigma(1\ 2)$ and $(1\ 2)\sigma$ by hand and decide which one it shows.
:::

### Orders and cycle types

Cycle notation makes the order of a permutation easy to read off. A $k$-cycle has order $k$: applying it $j$ times moves each $a_i$ forward $j$ places around the loop, which returns every symbol to its start exactly when $k \mid j$.

::: theorem Order of a permutation {#thm-order-lcm}
If $\sigma = \gamma_1\gamma_2\cdots\gamma_t$ is a product of disjoint cycles of lengths $k_1, \dots, k_t$, then $\ord(\sigma) = \lcm(k_1, \dots, k_t)$.
:::

::: proof
The $\gamma_i$ commute, so $\sigma^j = \gamma_1^j \gamma_2^j\cdots\gamma_t^j$. The factor $\gamma_i^j$ moves only symbols in the support of $\gamma_i$, and these supports are disjoint, so $\sigma^j = e$ if and only if every $\gamma_i^j = e$, that is (by [[abstract-algebra/subgroups#thm-order-divides]]) if and only if $k_i \mid j$ for every $i$. The least such positive $j$ is $\lcm(k_1, \dots, k_t)$.
:::

So the permutation of [[#ex-decompose]] has order $\lcm(3, 5) = 15$, while $(1\ 2)(3\ 4\ 5)$ has order $6$. The list of cycle lengths of $\sigma$ (including $1$s for fixed points if we wish) is its **cycle type**; for example $(1\ 5\ 4)(2\ 7\ 3\ 9\ 6) \in S_9$ has cycle type $(5, 3, 1)$.

::: warning The order is the lcm, not the product or the sum
For **disjoint** cycles the order is the least common multiple of the lengths: $(1\ 2)(3\ 4)$ has order $2$, not $4$. For cycles that overlap, nothing so simple holds — $(1\ 2)(2\ 3) = (1\ 2\ 3)$ has order $3$ — so always convert to disjoint cycles first.
:::

::: example Counting by cycle type in S₄ {#ex-s4-types}
Count the elements of $S_4$ of each cycle type, and hence the number of elements of each order.
::: solution
- Identity: $1$ element (order $1$).
- Transpositions $(a\ b)$: choose the pair, $\binom42 = 6$ elements (order $2$).
- Double transpositions $(a\ b)(c\ d)$: the pairing of $\set{1,2,3,4}$ into two pairs is determined by the partner of $1$, so $3$ elements (order $2$).
- $3$-cycles: choose the fixed point ($4$ ways); the other three symbols form $2$ different $3$-cycles, $(a\ b\ c)$ and $(a\ c\ b)$; so $8$ elements (order $3$).
- $4$-cycles: write them starting with $1$ as $(1\ a\ b\ c)$; there are $3! = 6$ orders for $a, b, c$; so $6$ elements (order $4$).

Check: $1 + 6 + 3 + 8 + 6 = 24 = 4!$. So $S_4$ has $1$ element of order $1$, $9$ of order $2$, $8$ of order $3$ and $6$ of order $4$, and no element of order $6$ — although $6$ divides $24$.
:::
:::

There is a rule for how cycle types behave under **conjugation**, which will be important in [[abstract-algebra/group-actions]].

::: proposition Conjugating a cycle {#prop-conjugation}
For $\tau \in S_n$ and any cycle,

$$
\tau\,(a_1\ a_2\ \dots\ a_k)\,\tau^{-1} = \bigl(\tau(a_1)\ \ \tau(a_2)\ \ \dots\ \ \tau(a_k)\bigr).
$$

Consequently $\tau\sigma\tau^{-1}$ has the same cycle type as $\sigma$, for every $\sigma, \tau \in S_n$.
:::

::: proof
Let $\gamma = (a_1\ \dots\ a_k)$. For the symbol $\tau(a_i)$ we get $\tau\gamma\tau^{-1}(\tau(a_i)) = \tau(\gamma(a_i)) = \tau(a_{i+1})$ (indices modulo $k$). If $x$ is not of the form $\tau(a_i)$, then $\tau^{-1}(x)$ is not one of the $a_i$, so $\gamma$ fixes it and $\tau\gamma\tau^{-1}(x) = x$. This proves the formula. If $\sigma = \gamma_1\cdots\gamma_t$ in disjoint cycles, then $\tau\sigma\tau^{-1} = (\tau\gamma_1\tau^{-1})\cdots(\tau\gamma_t\tau^{-1})$, a product of cycles of the same lengths on the disjoint sets $\tau(\text{support of }\gamma_i)$.
:::

## Transpositions and the sign of a permutation

A transposition is the simplest possible rearrangement: swap two things. Any arrangement can be reached by repeated swaps — that is how many sorting algorithms work.

::: theorem Transpositions generate Sₙ {#thm-transpositions}
For $n \ge 2$, every permutation in $S_n$ is a product of transpositions. Explicitly,

$$
(a_1\ a_2\ \dots\ a_k) = (a_1\ a_k)(a_1\ a_{k-1})\cdots(a_1\ a_3)(a_1\ a_2).
$$ {#eq-cycle-transpositions}
:::

::: proof
Check [[#eq-cycle-transpositions]] symbol by symbol, remembering that the rightmost factor acts first. The symbol $a_1$ is sent to $a_2$ by $(a_1\ a_2)$, and $a_2$ is untouched by the other factors, so $a_1 \mapsto a_2$. For $2 \le i \le k-1$, the symbol $a_i$ is untouched until $(a_1\ a_i)$ sends it to $a_1$; the next factor $(a_1\ a_{i+1})$ sends $a_1$ to $a_{i+1}$, which is untouched afterwards; so $a_i \mapsto a_{i+1}$. Finally $a_k$ is untouched until the last factor $(a_1\ a_k)$ sends it to $a_1$. Symbols outside the cycle are fixed by every factor. So the right-hand side equals the cycle. By [[#thm-cycle-decomposition]] every permutation is a product of cycles, hence of transpositions; the identity is $(1\ 2)(1\ 2)$.
:::

Products of transpositions are far from unique: $(1\ 2\ 3) = (1\ 3)(1\ 2) = (2\ 3)(1\ 3) = (1\ 3)(2\ 3)(1\ 2)(1\ 3)$. Yet in every such expression for $(1\ 2\ 3)$ the number of transpositions is even. This is the remarkable fact we now prove.

For $\sigma \in S_n$ ($n \ge 2$) define

$$
\sgn(\sigma) = \prod_{1 \le i < j \le n} \frac{\sigma(j) - \sigma(i)}{j - i} .
$$ {#eq-sign}

An **inversion** of $\sigma$ is a pair $i < j$ with $\sigma(i) > \sigma(j)$.

::: lemma The sign counts inversions {#lem-inversions}
$\sgn(\sigma) = (-1)^{N(\sigma)}$, where $N(\sigma)$ is the number of inversions of $\sigma$. In particular $\sgn(\sigma) = \pm 1$.
:::

::: proof
The map $\set{i, j} \mapsto \set{\sigma(i), \sigma(j)}$ is a bijection from the set of $2$-element subsets of $\set{1, \dots, n}$ to itself (its inverse comes from $\sigma^{-1}$). The absolute value of the factor for $\set{i,j}$ in the numerator of [[#eq-sign]] is $\abs{\sigma(j) - \sigma(i)}$, the "distance" of the pair $\set{\sigma(i), \sigma(j)}$; in the denominator it is the distance $j - i$ of $\set{i,j}$. As $\set{i,j}$ runs over all pairs, so does $\set{\sigma(i),\sigma(j)}$, so numerator and denominator have the same absolute value and $\abs{\sgn\sigma} = 1$. The factor for $i < j$ is negative exactly when $\sigma(i) > \sigma(j)$, so the sign of the product is $(-1)^{N(\sigma)}$.
:::

::: theorem The sign homomorphism {#thm-sign}
For all $\sigma, \tau \in S_n$, $\sgn(\sigma\tau) = \sgn(\sigma)\sgn(\tau)$, and $\sgn(\tau) = -1$ for every transposition $\tau$. Consequently, if $\sigma$ is a product of $k$ transpositions then $\sgn(\sigma) = (-1)^k$: a permutation cannot be both a product of an even number and a product of an odd number of transpositions.
:::

::: proof
For a pair $P = \set{i, j}$ write $f_\sigma(P) = \dfrac{\sigma(j) - \sigma(i)}{j - i}$; this does not depend on which element of $P$ we call $i$, since swapping $i$ and $j$ changes the sign of both numerator and denominator. So $\sgn(\sigma) = \prod_P f_\sigma(P)$ over all pairs $P$. For $\sigma\tau$,

$$
f_{\sigma\tau}(\set{i,j}) = \frac{\sigma(\tau(j)) - \sigma(\tau(i))}{\tau(j) - \tau(i)} \cdot \frac{\tau(j) - \tau(i)}{j - i} = f_\sigma\bigl(\set{\tau(i), \tau(j)}\bigr)\, f_\tau(\set{i,j}).
$$

Take the product over all pairs $P$. Since $P \mapsto \tau(P)$ permutes the pairs, $\prod_P f_\sigma(\tau(P)) = \prod_P f_\sigma(P) = \sgn(\sigma)$; hence $\sgn(\sigma\tau) = \sgn(\sigma)\sgn(\tau)$.

Now let $\tau = (a\ b)$ with $a < b$. Its inversions are the pair $(a, b)$ itself and, for each $m$ with $a < m < b$, the two pairs $(a, m)$ and $(m, b)$ (as $\tau(a) = b > m$ and $m > a = \tau(b)$); no other pair is inverted. So $N(\tau) = 1 + 2(b - a - 1)$ is odd and $\sgn(\tau) = -1$ by [[#lem-inversions]]. Finally, if $\sigma = \tau_1\cdots\tau_k$ with each $\tau_i$ a transposition, multiplicativity gives $\sgn(\sigma) = (-1)^k$, so the parity of $k$ is determined by $\sigma$.
:::

::: definition Even and odd permutations {#def-even-odd}
A permutation $\sigma$ is **even** if $\sgn(\sigma) = 1$ (it is a product of an even number of transpositions) and **odd** if $\sgn(\sigma) = -1$.
:::

By [[#eq-cycle-transpositions]] a $k$-cycle is a product of $k - 1$ transpositions, so

$$
\sgn(a_1\ \dots\ a_k) = (-1)^{k-1}:
$$

**cycles of odd length are even, and cycles of even length are odd.** The sign of any permutation is the product of the signs of its disjoint cycles. For example $(1\ 5\ 4)(2\ 7\ 3\ 9\ 6)$ is even, and $(1\ 2\ 3\ 4)(5\ 6)$ is even too (odd times odd).

::: quiz
Let $\sigma = (1\ 4\ 2)(3\ 5\ 6\ 7) \in S_7$. What are the order and the sign of $\sigma$?
- [ ] order $7$, even
- [ ] order $12$, even
- [x] order $12$, odd
- [ ] order $7$, odd
::: solution
The cycles are disjoint, of lengths $3$ and $4$, so the order is $\lcm(3, 4) = 12$ (not $3 + 4 = 7$). A $3$-cycle is even and a $4$-cycle is odd, so $\sgn(\sigma) = (+1)(-1) = -1$: $\sigma$ is odd.
:::
:::

### The alternating group

::: definition Alternating group {#def-alternating}
The **alternating group** $A_n$ is the set of even permutations in $S_n$.
:::

It is a subgroup by [[abstract-algebra/subgroups#thm-subgroup-test]]: $e$ is even, and if $\sigma, \tau$ are even then $\sgn(\sigma\tau^{-1}) = \sgn(\sigma)\sgn(\tau)^{-1} = 1$. For $n \ge 2$ exactly half of all permutations are even:

$$
\abs{A_n} = \frac{n!}{2},
$$

because $\sigma \mapsto (1\ 2)\sigma$ is a bijection from the even permutations to the odd ones (it changes the sign, and it is its own inverse since $(1\ 2)(1\ 2) = e$). Thus $A_3 = \set{e, (1\ 2\ 3), (1\ 3\ 2)}$ is cyclic of order $3$, and $A_4$ has $12$ elements: the identity, the eight $3$-cycles and the three double transpositions $(1\ 2)(3\ 4)$, $(1\ 3)(2\ 4)$, $(1\ 4)(2\ 3)$. The group $A_4$ will provide the classic counterexample in [[abstract-algebra/lagrange]], and $A_5$, of order $60$, is the smallest non-abelian simple group, the obstruction to solving the quintic in [[abstract-algebra/fields-galois]].

::: widget cayley
group: A
n: 4
highlight: (1 2)(3 4); (1 3)(2 4)
mode: table
caption: The Cayley table of $A_4$, of order $12 = 4!/2$. The highlighted subgroup is generated by two double transpositions; it is $V = \set{e, (1\ 2)(3\ 4), (1\ 3)(2\ 4), (1\ 4)(2\ 3)}$, a copy of the Klein four-group. The remaining eight elements are $3$-cycles. Notice that $A_4$ has no element of order $4$ or $6$.
:::

::: example The fifteen puzzle {#ex-fifteen}
In the fifteen puzzle a move slides a tile into the empty square. Show that the position with tiles $14$ and $15$ swapped and all other tiles (and the empty square) in their home positions cannot be reached from the solved position.
::: solution
Treat the empty square as a sixteenth tile, "$16$". A position is then a permutation of the sixteen squares, and each move is a transposition: it swaps $16$ with a neighbouring tile. Colour the board like a chessboard. Every move moves the empty square to a square of the other colour, so if the empty square ends where it started, the number of moves $k$ is even. The position reached is a product of $k$ transpositions, hence an even permutation by [[#thm-sign]]. The target position differs from the solved one by the single transposition $(14\ 15)$, which is odd. So it can never be reached. (Conversely, one can show that every position with the empty square at home that is an even permutation *can* be reached, so exactly half of the arrangements are solvable.)
:::
:::

## Dihedral groups

Label the vertices of a regular $n$-gon ($n \ge 3$) as $1, 2, \dots, n$ anticlockwise, and read labels modulo $n$ (so vertex $n + 1$ is vertex $1$). A **symmetry** of the polygon is a distance-preserving map of the plane that carries the polygon onto itself.

::: definition Dihedral group {#def-dihedral}
The **dihedral group** $D_n$ is the group of symmetries of a regular $n$-gon under composition. Let $r$ be the anticlockwise rotation by $2\pi/n$ about the centre, and $s$ the reflection in the line through the centre and vertex $1$. On vertices, $r(i) = i + 1$ and $s(i) = 2 - i$.
:::

::: warning Two notations
In this course $D_n$ is the dihedral group of order $2n$ (symmetries of the $n$-gon), as in Gallian and Armstrong. Dummit & Foote and many algebraists write $D_{2n}$ for the same group. So "$D_4$" here, the symmetries of a square, is "$D_8$" there.
:::

::: theorem Structure of Dₙ {#thm-dihedral}
$D_n$ has exactly $2n$ elements,

$$
D_n = \set{e, r, r^2, \dots, r^{n-1},\ s, rs, r^2s, \dots, r^{n-1}s},
$$

where $r^k$ is rotation by $2\pi k/n$ and each $r^ks$ is a reflection. They satisfy

$$
r^n = e, \qquad s^2 = e, \qquad srs = r^{-1}, \qquad\text{hence}\qquad sr^k = r^{-k}s .
$$ {#eq-dihedral-relations}
:::

::: proof
A symmetry $f$ permutes the vertices (they are the points of the polygon farthest from the centre) and preserves distances, so it sends adjacent vertices (those at the minimal distance, the side length) to adjacent vertices. It also fixes the centre $O$, the average of the vertices. An isometry of the plane fixing $O$ is a linear (orthogonal) map, so it is determined by its values on the two linearly independent position vectors of vertices $1$ and $2$ ([[linear-algebra/linear-maps]]). Now $f(1)$ can be any of the $n$ vertices, and $f(2)$ must be one of the $2$ neighbours of $f(1)$, so there are **at most** $2n$ symmetries.

On the other hand, the $2n$ listed maps are symmetries, and they are distinct, because they do different things to vertices $1$ and $2$: $r^k$ sends $(1, 2) \mapsto (1 + k, 2 + k)$, while $r^ks$ sends $(1, 2) \mapsto (1 + k, k)$ since $s(1) = 1$ and $s(2) = 0 = n$. So $\abs{D_n} = 2n$.

For the relations: $r^n$ is a full turn and $s^2$ reflects twice, so both are the identity. For every vertex $i$,

$$
srs(i) = s\bigl(r(2 - i)\bigr) = s(3 - i) = 2 - (3 - i) = i - 1 = r^{-1}(i),
$$

and a symmetry is determined by its action on vertices, so $srs = r^{-1}$. Then $sr^ks = (srs)^k = r^{-k}$ (the inner $s^2 = e$ cancel), and multiplying on the right by $s$ gives $sr^k = r^{-k}s$. Finally $(r^ks)^2 = r^k (sr^k) s = r^k r^{-k} s s = e$, so each $r^ks$ has order $2$; it reverses the orientation of the polygon, so it is a reflection.
:::

The relations [[#eq-dihedral-relations]] are all you need to multiply in $D_n$: move every $s$ to the right, replacing $sr^k$ by $r^{-k}s$. In general

$$
(r^as^b)(r^cs^d) = r^{a + (-1)^b c}\, s^{b + d} \qquad (a, c \in \Z_n,\ b, d \in \set{0,1}).
$$

Numbering the vertices also turns each symmetry into a permutation of $\set{1, \dots, n}$, and distinct symmetries give distinct permutations (a symmetry is determined by its effect on vertices). So $D_n$ is isomorphic to a subgroup of $S_n$ of order $2n$; in this picture $r = (1\ 2\ \cdots\ n)$ and $s = (2\ n)(3\ \ n{-}1)\cdots$. For $n = 3$ this subgroup has order $6 = 3!$, so it is all of $S_3$: $D_3 \cong S_3$, every permutation of a triangle's corners is a symmetry.

::: example The symmetries of a square {#ex-d4}
List the elements of $D_4$ as permutations of the vertices $1, 2, 3, 4$, identify each geometrically, and check that $sr = r^{-1}s$.
::: solution
Here $r = (1\ 2\ 3\ 4)$ and $s = (2\ 4)$ (the reflection in the diagonal through vertices $1$ and $3$). Multiplying out with the right-to-left rule:

| element | permutation | geometric description |
|---|---|---|
| $e$ | $e$ | identity |
| $r$ | $(1\ 2\ 3\ 4)$ | rotation by $90^\circ$ |
| $r^2$ | $(1\ 3)(2\ 4)$ | rotation by $180^\circ$ |
| $r^3$ | $(1\ 4\ 3\ 2)$ | rotation by $270^\circ$ |
| $s$ | $(2\ 4)$ | reflection in the diagonal through $1, 3$ |
| $rs$ | $(1\ 2)(3\ 4)$ | reflection in the line through the midpoints of edges $12$ and $34$ |
| $r^2s$ | $(1\ 3)$ | reflection in the diagonal through $2, 4$ |
| $r^3s$ | $(1\ 4)(2\ 3)$ | reflection in the line through the midpoints of edges $14$ and $23$ |

For instance $rs$: $1 \mapsto 1 \mapsto 2$, $2 \mapsto 4 \mapsto 1$, $3 \mapsto 3 \mapsto 4$, $4 \mapsto 2 \mapsto 3$, giving $(1\ 2)(3\ 4)$. Now $sr$ sends $1 \mapsto 2 \mapsto 4$, $4 \mapsto 1 \mapsto 1$, $2 \mapsto 3 \mapsto 3$, $3 \mapsto 4 \mapsto 2$, so $sr = (1\ 4)(2\ 3) = r^3s = r^{-1}s$, as [[#eq-dihedral-relations]] predicts. Note that $D_4$ has only $8$ of the $24$ permutations of the vertices: the transposition $(1\ 2)$, for example, is not a symmetry, because it would send the edge $\set{2, 3}$ to the diagonal $\set{1, 3}$.
:::
:::

::: widget cayley
group: D
n: 4
mode: graph
generators: r; s
caption: The Cayley graph of $D_4$ for the generators $r$ and $s$: each of the eight elements is a vertex, and edges record multiplication by $r$ and by $s$. The four rotations form one $4$-cycle of $r$-edges and the four reflections another, while $s$-edges pair each rotation with a reflection. Every element can be reached from $e$, which is what "$r$ and $s$ generate $D_4$" means.
:::

::: quiz
Which of the following permutations of the vertices $1, 2, 3, 4$ (labelled in order around a square) is **not** a symmetry of the square?
- [ ] $(1\ 3)$
- [ ] $(1\ 2\ 3\ 4)$
- [ ] $(1\ 2)(3\ 4)$
- [x] $(1\ 2)$
::: solution
A symmetry must send adjacent vertices to adjacent vertices. The transposition $(1\ 2)$ sends the adjacent pair $\set{2, 3}$ to $\set{1, 3}$, a diagonal, so it is not a symmetry. The other three are $r^2s$, $r$ and $rs$ in [[#ex-d4]].
:::
:::

## Cayley's theorem

We have seen that $D_n$ "is" a group of permutations. In fact every group is.

::: theorem Cayley's theorem {#thm-cayley}
Every group $G$ is isomorphic to a subgroup of $\operatorname{Sym}(G)$. In particular, every group of order $n$ is isomorphic to a subgroup of $S_n$.
:::

::: proof
For $g \in G$ define $\lambda_g\colon G \to G$ by $\lambda_g(x) = gx$ ("left multiplication by $g$"). It is a bijection, with inverse $\lambda_{g^{-1}}$, so $\lambda_g \in \operatorname{Sym}(G)$. For $g, h \in G$ and all $x$,

$$
\lambda_{gh}(x) = ghx = \lambda_g(\lambda_h(x)), \qquad\text{so}\qquad \lambda_{gh} = \lambda_g\lambda_h .
$$

Let $\Lambda = \set{\lambda_g : g \in G}$. It is non-empty and $\lambda_g\lambda_h^{-1} = \lambda_g\lambda_{h^{-1}} = \lambda_{gh^{-1}} \in \Lambda$, so $\Lambda \le \operatorname{Sym}(G)$. The map $\lambda\colon G \to \Lambda$, $g \mapsto \lambda_g$, is surjective by definition, respects products by the display above, and is injective because $\lambda_g = \lambda_h$ implies $g = \lambda_g(e) = \lambda_h(e) = h$. So $G \cong \Lambda$. If $\abs{G} = n$, numbering the elements of $G$ as $1, \dots, n$ identifies $\operatorname{Sym}(G)$ with $S_n$.
:::

::: example U(8) as a permutation group {#ex-cayley-u8}
Find the permutations $\lambda_g$ of the set $\set{1, 3, 5, 7}$ given by Cayley's theorem for $G = U(8)$.
::: solution
Multiplying each element by $3$ modulo $8$: $1 \mapsto 3$, $3 \mapsto 9 \equiv 1$, $5 \mapsto 15 \equiv 7$, $7 \mapsto 21 \equiv 5$. So $\lambda_3 = (1\ 3)(5\ 7)$. Similarly $\lambda_5 = (1\ 5)(3\ 7)$ and $\lambda_7 = (1\ 7)(3\ 5)$, and $\lambda_1 = e$. So $U(8)$ is realised as the group of the identity and the three double transpositions of its four elements — the same shape as the subgroup $V$ of $A_4$ in the figure above.
:::
:::

::: remark What Cayley's theorem does and does not say
The theorem shows that the abstract definition of a group adds no new examples: every group already lives inside some symmetric group. But it is a poor way to *study* a group of order $n$, because $S_n$ has $n!$ elements. The real power of permutation representations comes from letting a group act on smaller sets (cosets, conjugates, geometric objects), which is the theme of [[abstract-algebra/group-actions]].
:::

::: history
Permutations entered algebra through the theory of equations. Joseph-Louis Lagrange (1770–71) studied how expressions in the roots of a polynomial change when the roots are permuted, and Paolo Ruffini (1799) used permutation arguments in his attempt to prove the quintic unsolvable. Augustin-Louis Cauchy developed the calculus of permutations — products, inverses and the cycle notation used today — in papers of 1815 and the 1840s, and Évariste Galois made groups of permutations the centre of his theory of equations. Camille Jordan's *Traité des substitutions* (1870) was the first book devoted to permutation groups. The fifteen puzzle became a craze around 1880; in 1879 William Johnson and William Story published a proof in the *American Journal of Mathematics* that exactly half of the possible arrangements can be reached.
:::

## Where this leads

Cycle types and conjugation reappear in [[abstract-algebra/group-actions]], where we show that two permutations are conjugate exactly when they have the same cycle type and count the conjugacy classes of $S_n$. The sign map $\sgn\colon S_n \to \set{\pm1}$ is our first example of a homomorphism; in [[abstract-algebra/homomorphisms]] its kernel $A_n$ becomes a normal subgroup and $S_n/A_n \cong \Z_2$. Dihedral and symmetric groups are the standard testing ground for every theorem in the course, and the Galois group of a polynomial of degree $n$ is a subgroup of $S_n$ ([[abstract-algebra/fields-galois]]). The sign of a permutation also underlies the definition of the determinant ([[linear-algebra/determinants]]).

::: summary
- $S_n$, the bijections of $\set{1, \dots, n}$ under composition, has order $n!$ and is non-abelian for $n \ge 3$. Products are read right to left: $\sigma\tau$ applies $\tau$ first.
- Every permutation is a product of disjoint cycles, uniquely up to order ([[#thm-cycle-decomposition]]); disjoint cycles commute, and the order is the lcm of the cycle lengths.
- Conjugation preserves cycle type: $\tau(a_1\ \dots\ a_k)\tau^{-1} = (\tau(a_1)\ \dots\ \tau(a_k))$.
- Every permutation is a product of transpositions, and the parity of the number of transpositions is well defined: $\sgn$ is multiplicative with $\sgn(\text{transposition}) = -1$ ([[#thm-sign]]). A $k$-cycle has sign $(-1)^{k-1}$.
- The even permutations form the alternating group $A_n$ of order $n!/2$; parity explains why the fifteen puzzle with two tiles swapped is unsolvable.
- $D_n$, the symmetries of a regular $n$-gon, has order $2n$: rotations $r^k$ and reflections $r^ks$ with $r^n = s^2 = e$ and $sr = r^{-1}s$ ([[#thm-dihedral]]).
- Cayley's theorem: every group is isomorphic to a group of permutations, via left multiplication.
:::

## Exercises

::: exercise Cycles, order and sign {level=1 check="3"}
Write $\sigma = \begin{pmatrix} 1&2&3&4&5&6\\ 4&6&1&3&2&5\end{pmatrix}$ as a product of disjoint cycles, and find its order and sign.
::: solution
$1 \mapsto 4 \mapsto 3 \mapsto 1$ and $2 \mapsto 6 \mapsto 5 \mapsto 2$, so $\sigma = (1\ 4\ 3)(2\ 6\ 5)$. The order is $\lcm(3, 3) = 3$, and the sign is $(+1)(+1) = +1$: $\sigma$ is even.
:::
:::

::: exercise Two products {level=1}
Let $\sigma = (1\ 2\ 3)$ and $\tau = (1\ 2)(3\ 4)$ in $S_4$. Compute $\sigma\tau$ and $\tau\sigma$.
::: solution
For $\sigma\tau$ apply $\tau$ first: $1 \mapsto 2 \mapsto 3$, $3 \mapsto 4 \mapsto 4$, $4 \mapsto 3 \mapsto 1$, $2 \mapsto 1 \mapsto 2$. So $\sigma\tau = (1\ 3\ 4)$. For $\tau\sigma$ apply $\sigma$ first: $1 \mapsto 2 \mapsto 1$, $2 \mapsto 3 \mapsto 4$, $4 \mapsto 4 \mapsto 3$, $3 \mapsto 1 \mapsto 2$. So $\tau\sigma = (2\ 4\ 3)$. Both are $3$-cycles — even, as they must be, since $\sigma$ and $\tau$ are both even — but they are different.
:::
:::

::: exercise Elements of order 3 in S₅ {level=1 check="20"}
How many elements of order $3$ are there in $S_5$?
::: solution
By [[#thm-order-lcm]] an element of $S_5$ has order $3$ exactly when its disjoint cycles have lengths from $\set{1, 3}$ with at least one $3$. Two disjoint $3$-cycles need $6$ symbols, so the elements of order $3$ are exactly the $3$-cycles. Choose the three symbols in $\binom53 = 10$ ways; each set gives $2$ different $3$-cycles. Total: $20$.
:::
:::

::: exercise The largest order in S₇ {level=2 check="12"}
What is the largest order of an element of $S_7$?
::: hint
List the ways of writing $7$ as a sum of cycle lengths and compute the lcm for each.
:::
::: solution
The order is the lcm of the cycle lengths, which form a partition of $7$. Going through the partitions: $7 \to 7$; $6+1 \to 6$; $5+2 \to 10$; $5+1+1 \to 5$; $4+3 \to 12$; $4+2+1 \to 4$; $3+3+1 \to 3$; $3+2+2 \to 6$; $3+2+1+1 \to 6$; the remaining partitions ($4+1+1+1$, $3+1+1+1+1$ and those with all parts $\le 2$) give orders at most $4$. The maximum is $12$, attained by permutations such as $(1\ 2\ 3\ 4)(5\ 6\ 7)$.
:::
:::

::: exercise Elements of A₄ by order {level=2 check="3"}
How many elements of order $2$ does $A_4$ have? Show that $A_4$ has no element of order $4$ or $6$.
::: solution
The even cycle types in $S_4$ are the identity, $3$-cycles and double transpositions (a transposition and a $4$-cycle are odd). From [[#ex-s4-types]], $A_4$ consists of $1$ identity, $8$ three-cycles (order $3$) and $3$ double transpositions (order $2$). So there are $3$ elements of order $2$ and none of order $4$ or $6$.
:::
:::

::: exercise The centre of Dₙ {level=2}
Show that $Z(D_n) = \set{e}$ if $n$ is odd and $Z(D_n) = \set{e, r^{n/2}}$ if $n$ is even.
::: solution
A reflection $r^ks$ is never central: $(r^ks)r = r^kr^{-1}s = r^{k-1}s$ while $r(r^ks) = r^{k+1}s$, and these differ because $r^2 \neq e$ for $n \ge 3$. A rotation $r^k$ commutes with every rotation; it commutes with $s$ if and only if $r^ks = sr^k = r^{-k}s$, that is $r^{2k} = e$, that is $n \mid 2k$. If it commutes with $s$ and with $r$, it commutes with every $r^js$ too. For $0 \le k < n$, $n \mid 2k$ means $k = 0$, or $k = n/2$ when $n$ is even. This gives the result.
:::
:::

::: exercise Three-cycles generate Aₙ {level=2}
Check that $(a\ b)(c\ d) = (a\ c\ b)(a\ c\ d)$ for distinct $a, b, c, d$ and that $(a\ b)(a\ c) = (a\ c\ b)$ for distinct $a, b, c$. Deduce that for $n \ge 3$ every element of $A_n$ is a product of $3$-cycles.
::: solution
For $(a\ c\ b)(a\ c\ d)$ apply $(a\ c\ d)$ first: $a \mapsto c \mapsto b$, $b \mapsto b \mapsto a$, $c \mapsto d \mapsto d$, $d \mapsto a \mapsto c$. So it sends $a \leftrightarrow b$ and $c \leftrightarrow d$, which is $(a\ b)(c\ d)$. For $(a\ b)(a\ c)$: $a \mapsto c \mapsto c$, $c \mapsto a \mapsto b$, $b \mapsto b \mapsto a$, giving $(a\ c\ b)$. An even permutation is a product of an even number of transpositions; group them in consecutive pairs. A pair of equal transpositions cancels; a pair sharing one symbol is $(a\ b)(a\ c)$, a $3$-cycle; a disjoint pair is $(a\ b)(c\ d)$, a product of two $3$-cycles. So every even permutation is a product of $3$-cycles (the identity being the empty product, or $(1\ 2\ 3)^3$).
:::
:::

::: exercise Two generators for Sₙ {level=3}
Prove that $S_n$ ($n \ge 2$) is generated by $\tau = (1\ 2)$ and $\gamma = (1\ 2\ \cdots\ n)$.
::: hint
Use [[#prop-conjugation]] to compute $\gamma^k\tau\gamma^{-k}$, then show that the adjacent transpositions $(i\ \ i{+}1)$ generate every transposition.
:::
::: solution
Let $H = \langle\tau, \gamma\rangle$. By [[#prop-conjugation]], $\gamma^k\tau\gamma^{-k} = (\gamma^k(1)\ \ \gamma^k(2)) = (1{+}k\ \ 2{+}k)$, so $H$ contains every adjacent transposition $(i\ \ i{+}1)$ for $1 \le i \le n-1$. Next, by induction on $j - i$, $H$ contains every $(i\ j)$ with $i < j$: the case $j = i + 1$ is done, and if $(i\ \ j{-}1) \in H$ then

$$
(j{-}1\ \ j)\,(i\ \ j{-}1)\,(j{-}1\ \ j)^{-1} = (i\ \ j)
$$

by [[#prop-conjugation]], so $(i\ j) \in H$. Since every permutation is a product of transpositions ([[#thm-transpositions]]), $H = S_n$.
:::
:::

::: exercise Same cycle type means conjugate {level=3}
Prove the converse of [[#prop-conjugation]]: if $\sigma, \sigma' \in S_n$ have the same cycle type, then $\sigma' = \tau\sigma\tau^{-1}$ for some $\tau \in S_n$. Find such a $\tau$ for $\sigma = (1\ 2)(3\ 4\ 5)$ and $\sigma' = (2\ 5)(1\ 3\ 4)$.
::: solution
Write both permutations as products of disjoint cycles including $1$-cycles, listing cycles of equal length in the same order, one above the other:

$$
\sigma = (a_1\ \dots\ a_{k})(b_1\ \dots\ b_l)\cdots, \qquad \sigma' = (a'_1\ \dots\ a'_{k})(b'_1\ \dots\ b'_l)\cdots .
$$

Every symbol $1, \dots, n$ occurs exactly once in each line, so $\tau(a_i) = a'_i$, $\tau(b_j) = b'_j$, … defines a permutation $\tau$. By [[#prop-conjugation]], $\tau\sigma\tau^{-1}$ is obtained by applying $\tau$ to every symbol in the cycles of $\sigma$, which gives exactly $\sigma'$. For the example, align $(1\ 2)(3\ 4\ 5)$ with $(2\ 5)(1\ 3\ 4)$: $\tau(1) = 2$, $\tau(2) = 5$, $\tau(3) = 1$, $\tau(4) = 3$, $\tau(5) = 4$, so $\tau = (1\ 2\ 5\ 4\ 3)$. Check: $\tau\sigma\tau^{-1} = (\tau(1)\ \tau(2))(\tau(3)\ \tau(4)\ \tau(5)) = (2\ 5)(1\ 3\ 4)$.
:::
:::
