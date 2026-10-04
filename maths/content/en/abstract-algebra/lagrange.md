Could a group of order $12$ contain a subgroup of order $5$? Could some element of $U(15)$, a group of order $8$, have order $3$? In [[abstract-algebra/subgroups]] we answered such questions for cyclic groups: there, the order of every subgroup divides the order of the group. This chapter proves that the same is true for **every** finite group. The theorem is named after Lagrange, and it is the first genuinely deep fact about groups: a purely combinatorial constraint, derived from nothing but the axioms, that controls the structure of all finite groups at once.

The idea of the proof is to slice the group into pieces of equal size, called **cosets**. Once we have Lagrange's theorem, consequences pour out: the order of an element divides the order of the group; groups of prime order are cyclic; Fermat's little theorem and Euler's theorem from number theory follow in two lines; and we can classify all groups of order $6$. We will also see the limits of the theorem: a divisor of $\abs{G}$ need not be the order of any subgroup.

## Cosets

::: definition Cosets {#def-coset}
Let $H$ be a subgroup of a group $G$ and $a \in G$. The **left coset** of $H$ containing $a$ is

$$
aH = \set{ah : h \in H},
$$

and the **right coset** is $Ha = \set{ha : h \in H}$. In additive notation the left coset is written $a + H = \set{a + h : h \in H}$. The element $a$ is a **representative** of the coset.
:::

A coset is a "translate" of the subgroup. Some examples make the idea concrete.

::: example Cosets in familiar groups {#ex-cosets}
Describe the cosets of (a) $3\Z$ in $\Z$; (b) $H = \langle 4 \rangle = \set{0, 4, 8}$ in $\Z_{12}$; (c) the unit circle $\mathbb{T}$ in $\C^\times$; (d) a line $L$ through the origin in the group $(\R^2, +)$.
::: solution
(a) The cosets are $3\Z = \set{\dots, -3, 0, 3, 6, \dots}$, $1 + 3\Z = \set{\dots, -2, 1, 4, 7, \dots}$ and $2 + 3\Z = \set{\dots, -1, 2, 5, 8, \dots}$: the integers with remainder $0$, $1$ and $2$ on division by $3$. Every other coset is one of these, for example $7 + 3\Z = 1 + 3\Z$. These are the **residue classes** of [[number-theory/congruences]].

(b) $0 + H = \set{0, 4, 8}$, $1 + H = \set{1, 5, 9}$, $2 + H = \set{2, 6, 10}$, $3 + H = \set{3, 7, 11}$: four cosets of three elements each.

(c) For $a \in \C^\times$, $a\mathbb{T} = \set{az : \abs{z} = 1}$ is the circle of radius $\abs{a}$ centred at $0$. The cosets are the concentric circles, one for each radius $\rho > 0$; there are infinitely many.

(d) $v + L$ is the line through $v$ parallel to $L$. The cosets are all the lines parallel to $L$, and they fill the plane without overlapping.
:::
:::

In each case the cosets are disjoint, have the same size, and fill the whole group. The next lemma shows this always happens.

::: lemma Properties of cosets {#lem-cosets}
Let $H \le G$ and $a, b \in G$.

1. $a \in aH$.
2. $aH = H$ if and only if $a \in H$.
3. $aH = bH$ if and only if $a^{-1}b \in H$, if and only if $b \in aH$.
4. Either $aH = bH$ or $aH \cap bH = \varnothing$.
5. The map $h \mapsto ah$ is a bijection $H \to aH$; in particular $\abs{aH} = \abs{H}$.

Consequently the relation $a \sim b \iff a^{-1}b \in H$ is an equivalence relation on $G$ whose equivalence classes are the left cosets of $H$, and the left cosets **partition** $G$ into pieces of equal size.
:::

::: proof
1. $a = ae \in aH$.

2. If $aH = H$ then $a \in aH = H$ by (1). Conversely, if $a \in H$ then $aH \subseteq H$ by closure; and every $h \in H$ equals $a(a^{-1}h)$ with $a^{-1}h \in H$, so $H \subseteq aH$.

3. If $aH = bH$ then $b \in bH = aH$, so $b = ah$ for some $h \in H$, giving $a^{-1}b = h \in H$. If $a^{-1}b \in H$, then by (2) $a^{-1}bH = H$; multiplying every element on the left by $a$ gives $bH = aH$. Finally $b \in aH$ means $b = ah$ for some $h \in H$, which is the same as $a^{-1}b \in H$.

4. If $c \in aH \cap bH$, then by (3) (applied twice, with $c$ in the role of $b$) $cH = aH$ and $cH = bH$, so $aH = bH$.

5. The map is surjective by the definition of $aH$, and injective by left cancellation: $ah = ah'$ implies $h = h'$.

For the last statement: by (3), $a \sim b$ means exactly $b \in aH$, so the class of $a$ is $aH$; (1) and (4) say that these classes cover $G$ and are disjoint, which also shows directly that $\sim$ is an equivalence relation (see [[proofs/relations]]).
:::

::: warning Which way round?
For left cosets the test is $aH = bH \iff a^{-1}b \in H$; for right cosets it is $Ha = Hb \iff ab^{-1} \in H$. Mixing them up is the most common error with cosets. Also, $aH = bH$ does **not** imply $a = b$ — a coset has many representatives — and, in a non-abelian group, $aH$ and $Ha$ may be different sets, as the next example shows.
:::

::: example Left and right cosets in S₃ {#ex-s3-cosets}
Let $H = \langle (1\ 2)\rangle = \set{e, (1\ 2)} \le S_3$. Find the left and the right cosets of $H$.
::: solution
Multiplying on the left (using the right-to-left convention of [[abstract-algebra/permutation-groups]]):

$$
(1\ 3)H = \set{(1\ 3),\ (1\ 3)(1\ 2)} = \set{(1\ 3),\ (1\ 2\ 3)}, \qquad (2\ 3)H = \set{(2\ 3),\ (1\ 3\ 2)} .
$$

For instance, $(1\ 3)(1\ 2)$ sends $1 \mapsto 2 \mapsto 2$, $2 \mapsto 1 \mapsto 3$, $3 \mapsto 3 \mapsto 1$, so it is $(1\ 2\ 3)$. The left cosets are $H$, $\set{(1\ 3), (1\ 2\ 3)}$ and $\set{(2\ 3), (1\ 3\ 2)}$. Multiplying on the right instead,

$$
H(1\ 3) = \set{(1\ 3),\ (1\ 3\ 2)}, \qquad H(2\ 3) = \set{(2\ 3),\ (1\ 2\ 3)} .
$$

So $(1\ 3)H \neq H(1\ 3)$: the left and right cosets give two different partitions of $S_3$ into three pairs. Both partitions consist of $3$ cosets of size $2$, as they must.
:::
:::

::: widget cayley
group: S
n: 3
highlight: (1 2)
mode: table
caption: The Cayley table of $S_3$ with $H = \set{e, (1\ 2)}$ highlighted, together with its cosets. The three cosets are disjoint and each has two elements, so $3 \cdot 2 = 6 = \abs{S_3}$. Find the left coset and the right coset of $H$ containing $(1\ 3)$ in the table: they are different, so this subgroup does not satisfy $aH = Ha$.
:::

## Lagrange's theorem

::: theorem Lagrange's theorem {#thm-lagrange}
Let $G$ be a finite group and $H \le G$. Then $\abs{H}$ divides $\abs{G}$, and the number of distinct left cosets of $H$ in $G$ is $\abs{G}/\abs{H}$.
:::

::: proof
By [[#lem-cosets]] the distinct left cosets $a_1H, \dots, a_kH$ of $H$ partition $G$, and each has exactly $\abs{H}$ elements. Counting the elements of $G$ coset by coset,

$$
\abs{G} = \abs{a_1H} + \dots + \abs{a_kH} = k\,\abs{H} .
$$

So $\abs{H}$ divides $\abs{G}$, and $k = \abs{G}/\abs{H}$.
:::

::: definition Index {#def-index}
The **index** of a subgroup $H$ in $G$, written $[G : H]$, is the number of distinct left cosets of $H$ in $G$ (possibly infinite). For finite $G$, Lagrange's theorem says

$$
[G : H] = \frac{\abs{G}}{\abs{H}} .
$$
:::

Infinite groups can have subgroups of finite index: $[\Z : n\Z] = n$, because the cosets of $n\Z$ are the $n$ residue classes. The number of *right* cosets equals the number of left cosets, even when the cosets themselves differ: the map $aH \mapsto Ha^{-1}$ is a well-defined bijection, because

$$
aH = bH \iff a^{-1}b \in H \iff (a^{-1}b)^{-1} = b^{-1}a \in H \iff Ha^{-1} = Hb^{-1},
$$

using the right-coset test $Hx = Hy \iff xy^{-1} \in H$ with $x = a^{-1}$, $y = b^{-1}$.

::: intuition Tiling a group
Lagrange's theorem says that a subgroup *tiles* the group: its translates $aH$ are copies of $H$ that fit together without gaps or overlaps, like the parallel lines covering the plane in [[#ex-cosets]]. A group of order $12$ cannot be tiled by copies of a $5$-element set, so it has no subgroup of order $5$.
:::

::: widget cayley
group: D
n: 4
highlight: s
mode: table
caption: The Cayley table of $D_4$ (order $8$) with the reflection subgroup $H = \set{e, s}$ and its cosets highlighted. There are $[D_4 : H] = 8/2 = 4$ cosets, each with two elements. Try to pick out the coset $rH = \set{r, rs}$ and compare it with $Hr = \set{r, sr} = \set{r, r^3 s}$: again left and right cosets differ.
:::

### First consequences

::: corollary Orders of elements {#cor-element-order}
If $G$ is a finite group and $a \in G$, then $\ord(a)$ divides $\abs{G}$, and $a^{\abs{G}} = e$.
:::

::: proof
By [[abstract-algebra/subgroups#thm-order-divides]], $\ord(a) = \abs{\langle a\rangle}$, which divides $\abs{G}$ by Lagrange. Writing $\abs{G} = m \ord(a)$, we get $a^{\abs{G}} = (a^{\ord(a)})^m = e$.
:::

So no element of $U(15)$ (order $8$) can have order $3$, and the orders found in [[abstract-algebra/subgroups#ex-orders-u15]] — namely $1$, $2$ and $4$ — are all divisors of $8$.

::: corollary Groups of prime order {#cor-prime-order}
A group of prime order $p$ is cyclic, and every non-identity element generates it. Hence every group of order $p$ is isomorphic to $\Z_p$.
:::

::: proof
Let $\abs{G} = p$ and $a \neq e$. Then $\ord(a)$ divides $p$ and is not $1$, so $\ord(a) = p$ and $\langle a\rangle$ has $p$ elements: $\langle a\rangle = G$. By [[abstract-algebra/subgroups#thm-cyclic-classification]], $G \cong \Z_p$.
:::

So, up to isomorphism, there is exactly one group of each prime order: $\Z_2, \Z_3, \Z_5, \Z_7, \Z_{11}, \dots$. The only subgroups of a group of prime order are $\set{e}$ and the whole group.

::: quiz
A group $G$ has order $20$. Which of the following could be the order of a subgroup of $G$? (Select all that apply.)
- [ ] $3$
- [x] $4$
- [ ] $6$
- [ ] $8$
- [x] $10$
::: solution
By Lagrange's theorem the order of a subgroup must divide $20$, so only $1, 2, 4, 5, 10, 20$ are possible. Of the options, $4$ and $10$ divide $20$; $3$, $6$ and $8$ do not. (Lagrange only says which orders are *possible*; whether each divisor actually occurs depends on $G$, although for $20$ it does — see [[abstract-algebra/group-actions]].)
:::
:::

## Fermat's and Euler's theorems

Applied to the groups $U(n)$ of [[abstract-algebra/groups#thm-un-group]], Lagrange's theorem gives two classical results of number theory almost for free. Recall that $\abs{U(n)} = \varphi(n)$, the number of integers in $\set{1, \dots, n}$ coprime to $n$, and that $a \equiv b \pmod n$ means that $n$ divides $a - b$.

::: corollary Euler's theorem {#cor-euler}
If $n \ge 2$ and $\gcd(a, n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod n$.
:::

::: proof
Let $\bar a$ be the remainder of $a$ on division by $n$. Since $\gcd(\bar a, n) = \gcd(a, n) = 1$, $\bar a \in U(n)$, a group of order $\varphi(n)$. By [[#cor-element-order]], $\bar a^{\varphi(n)} = 1$ in $U(n)$, which says that $\bar a^{\varphi(n)}$ leaves remainder $1$ on division by $n$. Since $a \equiv \bar a \pmod n$, also $a^{\varphi(n)} \equiv \bar a^{\varphi(n)} \equiv 1 \pmod n$.
:::

::: corollary Fermat's little theorem {#cor-fermat}
If $p$ is prime and $p \nmid a$, then $a^{p-1} \equiv 1 \pmod p$. For every integer $a$, $a^p \equiv a \pmod p$.
:::

::: proof
For a prime $p$, every integer from $1$ to $p - 1$ is coprime to $p$, so $\varphi(p) = p - 1$, and the first statement is [[#cor-euler]]. Multiplying by $a$ gives $a^p \equiv a$ when $p \nmid a$; when $p \mid a$, both sides are $\equiv 0$.
:::

These theorems make huge powers easy to reduce, because exponents can be reduced modulo $\varphi(n)$.

::: example Reducing large powers {#ex-large-powers}
Find (a) $3^{100} \bmod 7$ and (b) the last two digits of $3^{2026}$.
::: solution
(a) By Fermat, $3^6 \equiv 1 \pmod 7$. Since $100 = 6\cdot 16 + 4$,

$$
3^{100} = (3^6)^{16}\cdot 3^4 \equiv 1^{16} \cdot 81 = 11\cdot 7 + 4 \equiv 4 \pmod 7 .
$$

(b) We need $3^{2026} \bmod 100$. Here $\varphi(100) = 40$ (the numbers up to $100$ not divisible by $2$ or $5$) and $\gcd(3, 100) = 1$, so $3^{40} \equiv 1 \pmod{100}$. As $2026 = 40\cdot 50 + 26$, we get $3^{2026} \equiv 3^{26}$. Now compute by repeated squaring: $3^5 = 243 \equiv 43$, $3^{10} \equiv 43^2 = 1849 \equiv 49$, $3^{20} \equiv 49^2 = 2401 \equiv 1$, so

$$
3^{26} = 3^{20}\cdot 3^5 \cdot 3 \equiv 1 \cdot 43 \cdot 3 = 129 \equiv 29 \pmod{100}.
$$

The last two digits of $3^{2026}$ are $29$. (Notice that in fact $3^{20} \equiv 1$: the order of $3$ in $U(100)$ is $20$, a proper divisor of $40$, exactly as [[#cor-element-order]] allows.)
:::
:::

::: widget modular
n: 7
mode: powers
a: 3
caption: Powers modulo the prime $7$. Every non-zero residue satisfies $a^6 \equiv 1$, which is Fermat's little theorem, and the order of each $a$ (the first exponent giving $1$) is a divisor of $6 = \abs{U(7)}$: $\ord(1) = 1$, $\ord(6) = 2$, $\ord(2) = \ord(4) = 3$ and $\ord(3) = \ord(5) = 6$. No element has order $4$ or $5$.
:::

::: remark Two proofs of one theorem
[[number-theory/fermat-euler]] proves Fermat's and Euler's theorems directly, by multiplying together all the elements of $U(n)$. That argument is really a special case of the proof of Lagrange's theorem: multiplying $U(n)$ by $a$ permutes its elements, just as left multiplication permutes the cosets of $\langle a \rangle$. The group-theoretic proof explains *why* the exponent $\varphi(n)$ appears: it is the order of the group.
:::

## Classifying small groups

Lagrange's theorem limits the possible orders of elements so severely that small groups can be classified by hand. In [[abstract-algebra/groups#ex-small-groups]] we found that a group of order $4$ is $\Z_4$ or $V_4$; with Lagrange the argument is immediate, since every non-identity element has order $2$ or $4$, and an element of order $4$ makes the group cyclic. Groups of prime order are cyclic by [[#cor-prime-order]]. The first interesting case is order $6$. We need one more lemma, proved by pairing each element with its inverse.

::: lemma Elements of order two {#lem-order-two}
A finite group of even order has an element of order $2$.
:::

::: proof
The relation $g \leftrightarrow g^{-1}$ splits $G$ into pairs $\set{g, g^{-1}}$ with $g \neq g^{-1}$ and singletons $\set{g}$ with $g = g^{-1}$. The pairs contain an even number of elements in total, so the number of singletons has the same parity as $\abs{G}$, which is even. The identity is a singleton, so there is another singleton $a \neq e$, and $a = a^{-1}$ means $a^2 = e$, so $\ord(a) = 2$.
:::

::: theorem Groups of order 6 {#thm-order-6}
Every group of order $6$ is isomorphic to $\Z_6$ or to $S_3$.
:::

::: proof
Let $\abs{G} = 6$. By [[#cor-element-order]] every element has order $1$, $2$, $3$ or $6$. If some element has order $6$, then $G$ is cyclic and $G \cong \Z_6$. Assume from now on that no element has order $6$.

*There is an element of order $3$.* Otherwise every element satisfies $x^2 = e$, so $G$ is abelian ([[abstract-algebra/groups#ex-exponent-two]]). Take non-identity elements $a \neq b$. The four elements $e, a, b, ab$ are distinct ($ab = e$, $ab = a$ or $ab = b$ would force $b = a^{-1} = a$, $b = e$ or $a = e$), and $\set{e, a, b, ab}$ is closed under multiplication (for example $a\cdot ab = a^2 b = b$ and $ab \cdot ab = a^2 b^2 = e$), so it is a subgroup of order $4$ by [[abstract-algebra/subgroups#thm-finite-subgroup-test]]. But $4 \nmid 6$, contradicting Lagrange.

So let $\ord(a) = 3$, and by [[#lem-order-two]] let $\ord(b) = 2$. Put $H = \langle a\rangle = \set{e, a, a^2}$, of index $2$. Since $b \notin H$ (the elements of $H$ have orders $1$ and $3$), the two left cosets are $H$ and $bH$, so

$$
G = \set{e,\ a,\ a^2,\ b,\ ba,\ ba^2} .
$$

Where is $ab$? It is not in $H$ (else $b = a^{-1}(ab) \in H$), so $ab \in \set{b, ba, ba^2}$. If $ab = b$ then $a = e$, which is false. If $ab = ba$, then $a$ and $b$ commute, and $(ab)^k = a^kb^k = e$ forces $a^k = b^{-k} \in \langle a \rangle \cap \langle b\rangle = \set{e}$, so $3 \mid k$ and $2 \mid k$; then $ab$ has order $6$, which we excluded. Therefore $ab = ba^2 = ba^{-1}$. Multiplying on the left by $b = b^{-1}$, $bab = a^{-1}$.

The relations $a^3 = e$, $b^2 = e$, $bab = a^{-1}$ are exactly the relations [[abstract-algebra/permutation-groups#eq-dihedral-relations]] satisfied by $r$ and $s$ in $D_3$. Every product of elements written in the form $b^ja^i$ can be brought back to this form using only these relations, and the same computation in $D_3$ gives the same answer with $a, b$ replaced by $r, s$. Hence $b^ja^i \mapsto s^jr^i$ is an isomorphism $G \to D_3$, and $D_3 \cong S_3$.
:::

::: example Which groups of order 6? {#ex-order-6}
Identify each of the following groups of order $6$ as $\Z_6$ or $S_3$: $U(7)$, $U(9)$, $U(14)$, $\Z_2 \times \Z_3$ and $\mathrm{GL}_2(\Z_2)$.
::: solution
The first four are abelian, and $S_3$ is not, so by [[#thm-order-6]] each is isomorphic to $\Z_6$. One can confirm this by exhibiting an element of order $6$: $3$ in $U(7)$ (powers $3, 2, 6, 4, 5, 1$), $2$ in $U(9)$ (powers $2, 4, 8, 7, 5, 1$), $3$ in $U(14)$ (see [[abstract-algebra/subgroups#exr-2-4]]) and $(1, 1)$ in $\Z_2\times\Z_3$. On the other hand $\mathrm{GL}_2(\Z_2)$ is non-abelian ([[abstract-algebra/groups#exr-1-5]]), so it is isomorphic to $S_3$.
:::
:::

## The converse of Lagrange's theorem is false

Lagrange's theorem says that the order of a subgroup divides $\abs{G}$. Is every divisor of $\abs{G}$ the order of some subgroup? For cyclic groups, yes ([[abstract-algebra/subgroups#thm-cyclic-subgroups]]). In general, no — and the smallest counterexample is the alternating group $A_4$ of order $12$, whose elements are the identity, eight $3$-cycles and three double transpositions ([[abstract-algebra/permutation-groups#def-alternating]]).

::: theorem A₄ has no subgroup of order 6 {#thm-a4}
The group $A_4$, of order $12$, has no subgroup of order $6$.
:::

::: proof
Suppose $H \le A_4$ with $\abs{H} = 6$. Then $[A_4 : H] = 2$, so the left cosets of $H$ are $H$ itself and the complement $A_4 \setminus H$.

*Claim: $g^2 \in H$ for every $g \in A_4$.* If $g \in H$ this is clear. If $g \notin H$ then $gH = A_4 \setminus H$. If $g^2$ were outside $H$, it would lie in $gH$, so $g^2 = gh$ for some $h \in H$, and cancelling $g$ gives $g = h \in H$ — a contradiction. So $g^2 \in H$.

Now let $\sigma$ be any $3$-cycle. Then $\sigma^3 = e$, so $\sigma = \sigma^4 = (\sigma^2)^2$, and applying the claim to $g = \sigma^2$ shows $\sigma \in H$. Thus $H$ contains all eight $3$-cycles, which is impossible since $\abs{H} = 6$.
:::

In fact $A_4$ has subgroups of orders $1, 2, 3, 4$ and $12$ only. Lagrange's theorem gives necessary conditions, not sufficient ones. A partial converse does hold for prime powers: if $p^k$ divides $\abs{G}$ then $G$ has a subgroup of order $p^k$. This is Sylow's first theorem, proved in [[abstract-algebra/group-actions]].

::: warning Lagrange constrains, it does not construct
"$6$ divides $12$, so $A_4$ has a subgroup of order $6$" is a false inference. Likewise, "$d$ divides $\abs{G}$, so $G$ has an element of order $d$" is false: $V_4$ has order $4$ but no element of order $4$, and $S_4$ has order $24$ but no element of order $6$ ([[abstract-algebra/permutation-groups#ex-s4-types]]). The only guaranteed elements are those of prime order dividing $\abs{G}$ (Cauchy's theorem).
:::

## Products of subgroups

If $H$ and $K$ are subgroups, the set $HK = \set{hk : h \in H, k \in K}$ need not be a subgroup, but its size is easy to compute.

::: theorem The product formula {#thm-product-formula}
If $H$ and $K$ are finite subgroups of a group $G$, then

$$
\abs{HK} = \frac{\abs{H}\,\abs{K}}{\abs{H \cap K}} .
$$
:::

::: proof
Consider the surjective map $H \times K \to HK$, $(h, k) \mapsto hk$. We show each element of $HK$ is hit exactly $\abs{H \cap K}$ times. Fix $hk \in HK$. For each $t \in H \cap K$, the pair $(ht, t^{-1}k)$ lies in $H \times K$ and has product $hk$; distinct $t$ give distinct pairs. Conversely, if $h'k' = hk$ with $h' \in H$, $k' \in K$, put $t = h^{-1}h'$. Then $t \in H$, and $t = h^{-1}h' = k k'^{-1} \in K$, so $t \in H \cap K$, with $h' = ht$ and $k' = t^{-1}k$. So the preimage of $hk$ has exactly $\abs{H\cap K}$ elements, and $\abs{H}\abs{K} = \abs{HK}\,\abs{H \cap K}$.
:::

For example, in $S_3$ take $H = \set{e, (1\ 2)}$ and $K = \set{e, (1\ 3)}$. Then $H \cap K = \set{e}$ and $\abs{HK} = 2\cdot 2/1 = 4$. Since $4 \nmid 6$, Lagrange's theorem tells us at once that $HK$ is **not** a subgroup of $S_3$.

::: corollary Indices multiply {#cor-index-tower}
If $K \le H \le G$ with $G$ finite, then $[G : K] = [G : H]\,[H : K]$.
:::

::: proof
By Lagrange, $[G:H][H:K] = \dfrac{\abs{G}}{\abs{H}}\cdot\dfrac{\abs{H}}{\abs{K}} = \dfrac{\abs{G}}{\abs{K}} = [G : K]$.
:::

The same formula holds for infinite groups whenever the indices are finite ([[#exr-4-10]]), and it has a striking counterpart for fields, the tower law of [[abstract-algebra/fields-galois]].

::: quiz
Let $H \le G$ and $a, b \in G$. Which condition is equivalent to $aH = bH$?
- [x] $a^{-1}b \in H$
- [ ] $ab^{-1} \in H$
- [ ] $ab \in H$
- [ ] $a = b$
::: solution
By [[#lem-cosets]], $aH = bH \iff a^{-1}b \in H$. The condition $ab^{-1} \in H$ is the test for *right* cosets, $Ha = Hb$; in a non-abelian group the two can differ. And $a = b$ is sufficient but not necessary — every element of a coset represents it.
:::
:::

::: history
Joseph-Louis Lagrange's *Réflexions sur la résolution algébrique des équations* (1770–71) studied how many different values a rational function of $n$ variables can take when the variables are permuted, and showed that this number divides $n!$. In modern language, the permutations leaving the function unchanged form a subgroup of $S_n$, and the number of values is its index — so Lagrange had found the theorem for subgroups of symmetric groups, before groups had been defined. Cauchy and Galois used such counting arguments freely, and the statement for arbitrary finite groups became standard once the abstract notion of a group had been formulated in the second half of the nineteenth century. The proof by cosets is now the one everybody learns. Fermat had stated his little theorem in 1640 and Euler proved its generalisation in 1763, long before either was seen as a statement about the order of a group.
:::

## Where this leads

Cosets are the raw material of the next chapter. In [[abstract-algebra/homomorphisms]] we ask when the cosets of $H$ themselves form a group; the answer — exactly when left and right cosets coincide, that is, when $H$ is **normal** — leads to quotient groups and the isomorphism theorems. In [[abstract-algebra/group-actions]] the counting in Lagrange's proof is generalised to the orbit–stabiliser theorem, and partial converses are proved: Cauchy's theorem (elements of every prime order dividing $\abs{G}$) and Sylow's theorems (subgroups of every prime-power order dividing $\abs{G}$). The number-theoretic side continues in [[number-theory/fermat-euler]] and [[number-theory/primitive-roots]].

::: summary
- The left cosets $aH$ of a subgroup $H$ partition $G$ into sets of size $\abs{H}$; $aH = bH \iff a^{-1}b \in H$ ([[#lem-cosets]]). Left and right cosets can differ.
- **Lagrange's theorem**: for finite $G$, $\abs{H}$ divides $\abs{G}$, and the index is $[G:H] = \abs{G}/\abs{H}$ ([[#thm-lagrange]]).
- Hence $\ord(a)$ divides $\abs{G}$ and $a^{\abs{G}} = e$; a group of prime order is cyclic.
- Applied to $U(n)$: Euler's theorem $a^{\varphi(n)} \equiv 1 \pmod n$ and Fermat's little theorem $a^{p-1} \equiv 1 \pmod p$; exponents can be reduced modulo $\varphi(n)$.
- With Lagrange, small groups can be classified: order $p$ gives $\Z_p$, order $4$ gives $\Z_4$ or $V_4$, order $6$ gives $\Z_6$ or $S_3$.
- The converse is false: $A_4$ (order $12$) has no subgroup of order $6$.
- $\abs{HK} = \abs{H}\abs{K}/\abs{H\cap K}$, and indices multiply in towers $K \le H \le G$.
:::

## Exercises

::: exercise Cosets in Z₁₅ {level=1 check="5"}
List the cosets of $H = \langle 5\rangle$ in $\Z_{15}$. What is $[\Z_{15} : H]$?
::: solution
$H = \set{0, 5, 10}$, and its cosets are $H$, $1 + H = \set{1, 6, 11}$, $2 + H = \set{2, 7, 12}$, $3 + H = \set{3, 8, 13}$ and $4 + H = \set{4, 9, 14}$. So $[\Z_{15} : H] = 15/3 = 5$.
:::
:::

::: exercise A power modulo 11 {level=1 check="4"}
Find $5^{38} \bmod 11$.
::: solution
By Fermat's little theorem $5^{10} \equiv 1 \pmod{11}$, so $5^{38} = (5^{10})^3\cdot 5^8 \equiv 5^8$. Now $5^2 = 25 \equiv 3$, $5^4 \equiv 9$, and $5^8 \equiv 81 = 7\cdot 11 + 4 \equiv 4$. So $5^{38} \bmod 11 = 4$.
:::
:::

::: exercise A group of prime order {level=1 check="2"}
How many subgroups does a group of order $13$ have?
::: solution
By Lagrange's theorem a subgroup has order $1$ or $13$, so the only subgroups are $\set{e}$ and the whole group: $2$ subgroups.
:::
:::

::: exercise Intersections of subgroups of coprime order {level=2}
Let $H$ and $K$ be finite subgroups of $G$ with $\abs{H} = 12$ and $\abs{K} = 35$. Prove that $H \cap K = \set{e}$.
::: solution
$H \cap K$ is a subgroup of both $H$ and $K$, so by Lagrange its order divides both $12$ and $35$. Since $\gcd(12, 35) = 1$, $\abs{H\cap K} = 1$, that is $H \cap K = \set{e}$.
:::
:::

::: exercise Last digits {level=2 check="43"}
Find the last two digits of $7^{2027}$.
::: hint
First find the order of $7$ modulo $100$.
:::
::: solution
$7^2 = 49$ and $7^4 = 2401 \equiv 1 \pmod{100}$, so the order of $7$ in $U(100)$ is $4$ — a divisor of $\abs{U(100)} = \varphi(100) = 40$, as Lagrange's theorem predicts. Since $2027 = 4\cdot 506 + 3$,

$$
7^{2027} = (7^4)^{506}\cdot 7^3 \equiv 343 \equiv 43 \pmod{100}.
$$

The last two digits are $43$.
:::
:::

::: exercise Left and right cosets in D₄ {level=2}
Let $H = \set{e, s} \le D_4$. Compute the left coset $rH$ and the right coset $Hr$, writing each element in the form $r^k$ or $r^ks$, and show that they are different. Is there any $a \notin H$ with $aH = Ha$?
::: solution
$rH = \set{r, rs}$ and $Hr = \set{r, sr} = \set{r, r^{-1}s} = \set{r, r^3s}$. Since $rs \neq r^3s$, $rH \neq Hr$. Now $aH = Ha$ means $as \in Ha$, i.e. $as = sa$ (the other element $a$ is common to both). For $a = r^k$ this needs $r^ks = sr^k = r^{-k}s$, i.e. $r^{2k} = e$, so $k \in \set{0, 2}$: $a = r^2$ works, and so does $a = r^2s$ (since $r^2 s \cdot s = r^2 = s \cdot r^2 s$ as $r^2$ is central). So $a = r^2$ and $a = r^2s$ are the elements outside $H$ with $aH = Ha$; for the other four ($r, r^3, rs, r^3s$) the cosets differ.
:::
:::

::: exercise Groups of order p² {level=2 check="6"}
Let $p$ be prime and $G$ a group of order $p^2$ that is not cyclic. Show that every non-identity element has order $p$, and that $G$ has exactly $p + 1$ subgroups of order $p$. How many subgroups of order $5$ does $\Z_5 \times \Z_5$ have?
::: solution
By [[#cor-element-order]], orders divide $p^2$; no element has order $p^2$ (else $G$ is cyclic), so every non-identity element has order $p$. Each subgroup of order $p$ is cyclic and contains $p - 1$ elements of order $p$. Two distinct subgroups of order $p$ intersect in a subgroup whose order divides $p$ and is less than $p$, hence trivially, so the $p^2 - 1$ elements of order $p$ are split among the subgroups, $p - 1$ in each. There are therefore $\dfrac{p^2-1}{p-1} = p + 1$ subgroups of order $p$. The group $\Z_5\times\Z_5$ is not cyclic ([[abstract-algebra/subgroups#thm-cyclic-product]]), so it has $5 + 1 = 6$ subgroups of order $5$.
:::
:::

::: exercise Subgroups of index two {level=3}
Let $H \le G$ with $[G : H] = 2$. Prove that $aH = Ha$ for every $a \in G$.
::: solution
If $a \in H$ then $aH = H = Ha$. If $a \notin H$, the two left cosets are $H$ and $aH$, and they partition $G$, so $aH = G \setminus H$. Similarly the two right cosets are $H$ and $Ha$ (the number of right cosets also equals $2$), so $Ha = G\setminus H$. Hence $aH = Ha$. (This is the first example of a *normal* subgroup; see [[abstract-algebra/homomorphisms]].)
:::
:::

::: exercise A product over a group, and Wilson's theorem {level=3}
Let $G$ be a finite abelian group containing exactly one element $t$ of order $2$. Prove that the product of all the elements of $G$ equals $t$. Deduce **Wilson's theorem**: for every prime $p$, $(p-1)! \equiv -1 \pmod p$.
::: hint
Pair each element with its inverse. For Wilson, apply the result to $U(p)$, and show that $x^2 \equiv 1 \pmod p$ forces $x \equiv \pm 1$.
:::
::: solution
Since $G$ is abelian, the product does not depend on the order of the factors. Group each $g$ with $g^{-1}$: when $g \neq g^{-1}$ the pair contributes $gg^{-1} = e$. The elements with $g = g^{-1}$ are those with $g^2 = e$, namely $e$ and $t$. So the product of all elements is $e \cdot t = t$.

For Wilson's theorem with $p$ odd, take $G = U(p) = \set{1, \dots, p-1}$. If $x^2 \equiv 1 \pmod p$ then $p \mid (x-1)(x+1)$, so $p \mid x - 1$ or $p \mid x + 1$ (by Euclid's lemma, [[number-theory/primes#thm-euclid-lemma]]), that is $x = 1$ or $x = p - 1$. So $t = p - 1 \equiv -1$ is the unique element of order $2$, and the product of all elements is $1\cdot 2 \cdots (p-1) = (p-1)! \equiv -1 \pmod p$. For $p = 2$: $1! = 1 \equiv -1 \pmod 2$. (A proof without group language is in [[number-theory/fermat-euler]].)
:::
:::

::: exercise Indices multiply in infinite groups {level=3}
Let $K \le H \le G$ with $[G:H] = m$ and $[H:K] = n$ finite ($G$ may be infinite). Prove that $[G:K] = mn$.
::: hint
If $a_1H, \dots, a_mH$ are the cosets of $H$ in $G$ and $b_1K, \dots, b_nK$ those of $K$ in $H$, show that the $a_ib_jK$ are exactly the cosets of $K$ in $G$, and are distinct.
:::
::: solution
Let $G = \bigsqcup_{i=1}^m a_iH$ and $H = \bigsqcup_{j=1}^n b_jK$ (disjoint unions). Then

$$
G = \bigcup_i a_iH = \bigcup_i a_i\Bigl(\bigcup_j b_jK\Bigr) = \bigcup_{i,j} a_ib_jK,
$$

so every coset of $K$ is one of the $mn$ cosets $a_ib_jK$. They are distinct: suppose $a_ib_jK = a_{i'}b_{j'}K$. Then $a_ib_j \in a_{i'}b_{j'}K \subseteq a_{i'}H$, and also $a_ib_j \in a_iH$ (as $b_j \in H$), so $a_iH \cap a_{i'}H \neq \varnothing$ and $i = i'$. Cancelling $a_i$ gives $b_jK = b_{j'}K$, so $j = j'$. Hence there are exactly $mn$ left cosets of $K$ in $G$.
:::
:::
