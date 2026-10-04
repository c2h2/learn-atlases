The sign of a permutation, the determinant of a matrix and the remainder of an integer on division by $12$ all have something in common. Each takes an element of a group and produces an element of a (usually much smaller) group, and each respects the operation: the sign of a product is the product of the signs, the determinant of a product is the product of the determinants, and the remainder of a sum is the sum of the remainders (modulo $12$). Such maps are called **homomorphisms**. Unlike isomorphisms they may lose information — many permutations have sign $+1$ — and the information lost is measured by a subgroup, the **kernel**.

Reversing the point of view leads to one of the central constructions of algebra. Clock arithmetic is what you get from the integers by declaring multiples of $12$ to be zero. In the same way, from any group $G$ and a suitable subgroup $N$ we can build a new group $G/N$ by "declaring the elements of $N$ to be trivial". The subgroups for which this works are the **normal** subgroups, and the **first isomorphism theorem** ties everything together: the image of a homomorphism is exactly the quotient of $G$ by its kernel.

## Homomorphisms

::: definition Homomorphism {#def-homomorphism}
A **homomorphism** from a group $G$ to a group $H$ is a map $\varphi\colon G \to H$ such that

$$
\varphi(ab) = \varphi(a)\varphi(b) \qquad\text{for all } a, b \in G .
$$

An **isomorphism** ([[abstract-algebra/groups#def-isomorphism]]) is a bijective homomorphism. An isomorphism from $G$ to itself is an **automorphism**, and the automorphisms of $G$ form a group $\Aut(G)$ under composition.
:::

The definition looks the same as for isomorphisms, but dropping bijectivity allows a huge variety of maps. Here are the examples to keep in mind; in each case the homomorphism property is a familiar identity.

1. **Determinant**: $\det\colon \mathrm{GL}_n(\R) \to \R^\times$, since $\det(AB) = \det A\det B$.
2. **Sign**: $\sgn\colon S_n \to \set{1, -1}$, by [[abstract-algebra/permutation-groups#thm-sign]].
3. **Exponential**: $\exp\colon (\C, +) \to \C^\times$, $z \mapsto e^z$, since $e^{z+w} = e^ze^w$.
4. **Reduction modulo $n$**: $\Z \to \Z_n$, $k \mapsto k \bmod n$, since the remainder of $j + k$ is the sum of the remainders, reduced modulo $n$.
5. **Powers in abelian groups**: if $G$ is abelian, $x \mapsto x^n$ is a homomorphism $G \to G$, since $(xy)^n = x^ny^n$. For instance $z \mapsto z^n$ on $\C^\times$.
6. **Conjugation**: for fixed $g \in G$, $c_g(x) = gxg^{-1}$ is an automorphism of $G$, since $gxyg^{-1} = (gxg^{-1})(gyg^{-1})$, with inverse $c_{g^{-1}}$. Automorphisms of this form are called **inner**.
7. **Projections** $G \times H \to G$, $(g, h) \mapsto g$, and the **trivial homomorphism** $x \mapsto e_H$.

::: proposition Basic properties {#prop-hom-props}
Let $\varphi\colon G \to H$ be a homomorphism and $a \in G$. Then:

1. $\varphi(e_G) = e_H$, $\varphi(a^{-1}) = \varphi(a)^{-1}$ and $\varphi(a^n) = \varphi(a)^n$ for all $n \in \Z$;
2. if $a$ has finite order, then $\ord(\varphi(a))$ divides $\ord(a)$;
3. if $K \le G$ then $\varphi(K) \le H$; if $L \le H$ then $\varphi^{-1}(L) = \set{g \in G: \varphi(g) \in L} \le G$;
4. if $\psi\colon H \to M$ is another homomorphism, then $\psi\circ\varphi$ is a homomorphism.
:::

::: proof
1. The proof given for isomorphisms in [[abstract-algebra/groups#prop-iso-props]] used only the homomorphism property: $\varphi(e)\varphi(e) = \varphi(e)$ gives $\varphi(e) = e$ by cancellation, then $\varphi(a)\varphi(a^{-1}) = \varphi(e) = e$, and powers follow by induction.

2. If $\ord(a) = n$ then $\varphi(a)^n = \varphi(a^n) = \varphi(e) = e$, so $\ord(\varphi(a)) \mid n$ by [[abstract-algebra/subgroups#thm-order-divides]].

3. $\varphi(K)$ contains $\varphi(e) = e$, and $\varphi(x)\varphi(y)^{-1} = \varphi(xy^{-1}) \in \varphi(K)$ for $x, y \in K$, so the one-step test applies. For the preimage: $e \in \varphi^{-1}(L)$, and if $\varphi(x), \varphi(y) \in L$ then $\varphi(xy^{-1}) = \varphi(x)\varphi(y)^{-1} \in L$.

4. $\psi(\varphi(ab)) = \psi(\varphi(a)\varphi(b)) = \psi(\varphi(a))\psi(\varphi(b))$.
:::

In particular the **image** $\Img\varphi = \varphi(G)$ is a subgroup of $H$.

::: definition Kernel {#def-kernel}
The **kernel** of a homomorphism $\varphi\colon G \to H$ is

$$
\ker\varphi = \set{g \in G : \varphi(g) = e_H} .
$$
:::

The kernel is a subgroup of $G$: it is the preimage of the subgroup $\set{e_H}$. The kernels of our examples are: $\ker\det = \mathrm{SL}_n(\R)$; $\ker\sgn = A_n$; $\ker\exp = 2\pi i\Z$ (since $e^z = 1$ exactly when $z \in 2\pi i \Z$); $\ker(\Z \to \Z_n) = n\Z$; $\ker(z \mapsto z^n) = \mu_n$, the $n$-th roots of unity; and $\ker c_g = \set{e}$.

::: theorem Kernels and fibres {#thm-kernel-fibres}
Let $\varphi\colon G \to H$ be a homomorphism with kernel $K$. For $a, b \in G$,

$$
\varphi(a) = \varphi(b) \iff a^{-1}b \in K \iff aK = bK .
$$

So the set of elements mapped to $\varphi(a)$ is exactly the coset $aK$, and $\varphi$ is injective if and only if $K = \set{e}$.
:::

::: proof
$\varphi(a) = \varphi(b) \iff \varphi(a)^{-1}\varphi(b) = e \iff \varphi(a^{-1}b) = e \iff a^{-1}b \in K$, and $a^{-1}b \in K \iff aK = bK$ by [[abstract-algebra/lagrange#lem-cosets]]. If $K = \set{e}$, then $\varphi(a) = \varphi(b)$ forces $a^{-1}b = e$, so $a = b$. Conversely, if $\varphi$ is injective then only $e$ maps to $e_H$.
:::

So a homomorphism collapses each coset of its kernel to a single point, and never merges two different cosets. This is the key to everything that follows.

::: widget mapping
domain: 0; 1; 2; 3; 4; 5
codomain: 0; 1; 2
map: 0>0; 1>1; 2>2; 3>0; 4>1; 5>2
editable: false
caption: The homomorphism $\Z_6 \to \Z_3$, $k \mapsto k \bmod 3$, as an arrow diagram. The kernel is $\set{0, 3}$, and the elements sent to each point of $\Z_3$ form a coset of the kernel: $\set{0,3}$, $\set{1, 4}$, $\set{2, 5}$. Every fibre has the same size, $\abs{\ker\varphi} = 2$, and $6 = 2 \times 3$.
:::

::: example Homomorphisms from Z₁₂ to Z₃₀ {#ex-homs-z12-z30}
Find all homomorphisms $\varphi\colon \Z_{12} \to \Z_{30}$, with their images and kernels.
::: solution
Since $\Z_{12} = \langle 1\rangle$, a homomorphism is determined by $x = \varphi(1)$: then $\varphi(k) = kx \bmod 30$. Not every $x$ works. The element $1$ has order $12$, so by [[#prop-hom-props]] the order of $x$ must divide $12$, i.e. $12x \equiv 0 \pmod{30}$. Conversely, if $30 \mid 12x$ then $\varphi(k) = kx \bmod 30$ is well defined (replacing $k$ by $k + 12$ changes $kx$ by $12x$, a multiple of $30$) and is clearly a homomorphism. Now $30 \mid 12x \iff 5 \mid 2x \iff 5 \mid x$, so

$$
x \in \set{0, 5, 10, 15, 20, 25}:
$$

six homomorphisms. For $x = 10$ the image is $\langle 10\rangle = \set{0, 10, 20}$, of order $3$, and the kernel is $\set{k : 10k \equiv 0 \pmod{30}} = \set{0, 3, 6, 9}$, of order $4$. For $x = 5$ the image $\langle 5\rangle$ has order $6$ and the kernel $\set{0, 6}$ order $2$; for $x = 15$ the image has order $2$ and the kernel order $6$. In every case $\abs{\ker\varphi}\cdot\abs{\Img\varphi} = 12$, a fact explained by the first isomorphism theorem below.
:::
:::

::: quiz
Which of the following maps are homomorphisms? (Select all that apply.)
- [x] $\Z \to \Z$, $x \mapsto 3x$
- [ ] $\Z \to \Z$, $x \mapsto x + 1$
- [x] $\R^\times \to \R^\times$, $x \mapsto x^2$
- [ ] $\mathrm{GL}_2(\R) \to \mathrm{GL}_2(\R)$, $A \mapsto A^2$
::: solution
$3(x + y) = 3x + 3y$, and $(xy)^2 = x^2y^2$ because $\R^\times$ is abelian. The map $x \mapsto x + 1$ fails because a homomorphism must send $0$ to $0$. For matrices $(AB)^2 = ABAB$, which differs from $A^2B^2$ whenever $AB \neq BA$, so squaring is not a homomorphism of the non-abelian group $\mathrm{GL}_2(\R)$.
:::
:::

## Normal subgroups

Kernels have a property that general subgroups lack. If $\varphi(n) = e$ then for every $g \in G$,

$$
\varphi(gng^{-1}) = \varphi(g)\,e\,\varphi(g)^{-1} = e,
$$

so the kernel is closed under conjugation by arbitrary elements of $G$.

::: definition Normal subgroup {#def-normal}
A subgroup $N$ of $G$ is **normal**, written $N \trianglelefteq G$, if $gng^{-1} \in N$ for all $g \in G$ and $n \in N$. Equivalently, $gNg^{-1} \subseteq N$ for all $g \in G$, where $gNg^{-1} = \set{gng^{-1} : n \in N}$.
:::

::: theorem Characterisations of normality {#thm-normal-test}
For a subgroup $N \le G$, the following are equivalent:

1. $gNg^{-1} \subseteq N$ for all $g \in G$;
2. $gNg^{-1} = N$ for all $g \in G$;
3. $gN = Ng$ for all $g \in G$ (every left coset is a right coset).
:::

::: proof
(1) ⇒ (2): Given $g$, apply (1) to $g^{-1}$: $g^{-1}Ng \subseteq N$. So each $n \in N$ can be written $n = g(g^{-1}ng)g^{-1}$ with $g^{-1}ng \in N$, which shows $N \subseteq gNg^{-1}$. Together with (1), $gNg^{-1} = N$.

(2) ⇒ (3): Multiply $gNg^{-1} = N$ on the right by $g$: $gN = Ng$. (Multiplying every element of a set on the right by $g$ is a bijection, so this is legitimate.)

(3) ⇒ (1): For $n \in N$, $gn \in gN = Ng$, so $gn = n'g$ for some $n' \in N$, and $gng^{-1} = n' \in N$.
:::

::: theorem Kernels are normal {#thm-kernel-normal}
The kernel of every homomorphism $\varphi\colon G \to H$ is a normal subgroup of $G$.
:::

::: proof
It is a subgroup, and the calculation before [[#def-normal]] shows $gng^{-1} \in \ker\varphi$ for $n \in \ker\varphi$, $g \in G$.
:::

Normal subgroups are common:

- Every subgroup of an **abelian** group is normal, since $gng^{-1} = n$.
- Every subgroup of **index $2$** is normal: its left cosets and right cosets are both "$N$ and the rest" ([[abstract-algebra/lagrange#exr-4-8]]). So $A_n \trianglelefteq S_n$ and the rotation subgroup $\langle r\rangle \trianglelefteq D_n$.
- The **centre** $Z(G)$ is normal, and so is every subgroup of the centre, since its elements commute with everything. For example $\langle r^2 \rangle = Z(D_4)$ is normal in $D_4$.
- Kernels: $\mathrm{SL}_n(\R) \trianglelefteq \mathrm{GL}_n(\R)$, $n\Z \trianglelefteq \Z$, $\mu_n \trianglelefteq \C^\times$.
- In $S_4$, the subgroup $V = \set{e, (1\ 2)(3\ 4), (1\ 3)(2\ 4), (1\ 4)(2\ 3)}$ is normal, because conjugation preserves cycle type ([[abstract-algebra/permutation-groups#prop-conjugation]]) and $V$ consists of the identity and *all* the double transpositions.

::: example Testing normality {#ex-normality}
(a) Show that $H = \set{e, (1\ 2)}$ is not normal in $S_3$. (b) Show that $\set{e, s}$ is not normal in $D_4$. (c) Let $K = \set{e, (1\ 2)(3\ 4)}$. Show that $K \trianglelefteq V$ and $V \trianglelefteq A_4$, but $K$ is not normal in $A_4$.
::: solution
(a) Conjugating by $(1\ 3)$ and using [[abstract-algebra/permutation-groups#prop-conjugation]]: $(1\ 3)(1\ 2)(1\ 3)^{-1} = (3\ 2) \notin H$. (This matches [[abstract-algebra/lagrange#ex-s3-cosets]], where $(1\ 3)H \neq H(1\ 3)$.)

(b) $rsr^{-1} = r(sr^{-1}) = r(rs) = r^2s \notin \set{e, s}$, using $sr^{-1} = rs$ from [[abstract-algebra/permutation-groups#eq-dihedral-relations]].

(c) $V \cong V_4$ is abelian, so $K \trianglelefteq V$; and $V \trianglelefteq A_4$ because $V$ is normal even in $S_4$. But conjugating by the $3$-cycle $(1\ 2\ 3) \in A_4$,

$$
(1\ 2\ 3)\,(1\ 2)(3\ 4)\,(1\ 2\ 3)^{-1} = (2\ 3)(1\ 4) \notin K .
$$

So **normality is not transitive**: $K \trianglelefteq V \trianglelefteq A_4$ does not imply $K \trianglelefteq A_4$.
:::
:::

::: warning gN = Ng does not mean gn = ng
Normality says that the *set* $gN$ equals the *set* $Ng$; it does **not** say that $g$ commutes with each element of $N$. In $S_3$ the subgroup $A_3 = \set{e, (1\ 2\ 3), (1\ 3\ 2)}$ is normal, yet $(1\ 2)(1\ 2\ 3) = (2\ 3)$ while $(1\ 2\ 3)(1\ 2) = (1\ 3)$. What is true is $(1\ 2)(1\ 2\ 3)(1\ 2)^{-1} = (1\ 3\ 2) \in A_3$: conjugation moves elements of $N$ around *inside* $N$.
:::

::: example The quaternion group {#ex-q8}
The **quaternion group** $Q_8 = \set{\pm1, \pm i, \pm j, \pm k}$ has the multiplication of Hamilton's quaternions: $-1$ is central with $(-1)^2 = 1$, and

$$
i^2 = j^2 = k^2 = ijk = -1, \qquad ij = k = -ji,\quad jk = i = -kj,\quad ki = j = -ik .
$$

Show that $Q_8$ is non-abelian but every subgroup of $Q_8$ is normal.
::: solution
It is non-abelian since $ij = k \ne -k = ji$. Its elements $\pm i, \pm j, \pm k$ have order $4$ and $-1$ has order $2$, so its subgroups are: $\set{1}$; $\set{\pm1}$; $\langle i\rangle = \set{\pm1, \pm i}$, $\langle j\rangle$, $\langle k\rangle$; and $Q_8$ (a subgroup containing two of $i, j, k$ up to sign contains their product, hence everything). The subgroups $\langle i\rangle, \langle j\rangle, \langle k\rangle$ have index $2$, so they are normal; $\set{\pm 1} = Z(Q_8)$ is central, so normal; and $\set{1}$ and $Q_8$ are always normal. So all six subgroups are normal although the group is not abelian.
:::
:::

::: widget cayley
group: Q8
highlight: -1
mode: table
caption: The Cayley table of $Q_8$ with the centre $\set{1, -1}$ and its cosets $\set{\pm i}$, $\set{\pm j}$, $\set{\pm k}$ coloured. The table is not symmetric ($ij = k$ but $ji = -k$), yet the colour of every product depends only on the colours of the factors, because $\set{\pm 1}$ is normal; the four colours multiply like the Klein four-group, anticipating $Q_8/\set{\pm1} \cong V_4$.
:::

::: quiz
Which subgroups of $S_3$ are normal? (Select all that apply.)
- [x] $\set{e}$
- [ ] $\set{e, (1\ 2)}$
- [x] $A_3 = \set{e, (1\ 2\ 3), (1\ 3\ 2)}$
- [x] $S_3$
::: solution
$\set{e}$ and $S_3$ are normal in any group. $A_3$ has index $2$ (it is also the kernel of $\sgn$). The subgroup $\set{e, (1\ 2)}$ is not normal: conjugating by $(1\ 3)$ gives $(2\ 3)$. The same holds for the other two subgroups of order $2$, so $S_3$ has exactly three normal subgroups.
:::
:::

## Quotient groups

Here is the payoff of normality: the cosets of a normal subgroup can themselves be multiplied.

::: theorem Quotient groups {#thm-quotient-group}
Let $N \trianglelefteq G$, and let $G/N$ be the set of left cosets of $N$ in $G$. Then

$$
(aN)(bN) = (ab)N
$$

is a well-defined operation making $G/N$ a group, the **quotient group** (or factor group) of $G$ by $N$. Its identity is $N = eN$, the inverse of $aN$ is $a^{-1}N$, and $\abs{G/N} = [G : N]$. The **natural map** $\pi\colon G \to G/N$, $\pi(a) = aN$, is a surjective homomorphism with kernel $N$.

Conversely, if $N \le G$ and the rule $(aN)(bN) = abN$ is well defined, then $N$ is normal.
:::

::: proof
*Well defined.* The rule is stated in terms of representatives, so we must check that the answer does not depend on which representatives we use. Suppose $aN = a'N$ and $bN = b'N$, so $a' = an_1$ and $b' = bn_2$ with $n_1, n_2 \in N$. Then

$$
a'b' = an_1bn_2 = ab\,(b^{-1}n_1b)\,n_2 .
$$

By normality $b^{-1}n_1b \in N$, so $a'b' \in abN$ and $a'b'N = abN$.

*Group axioms.* Associativity is inherited: $(aN\,bN)\,cN = (ab)cN = a(bc)N = aN\,(bN\,cN)$. The identity is $eN$, since $eN\,aN = aN = aN\,eN$, and $a^{-1}N\,aN = eN = aN\,a^{-1}N$. The number of elements is the number of cosets, $[G:N]$.

*The natural map* is a homomorphism by the very definition of the operation, $\pi(ab) = abN = \pi(a)\pi(b)$; it is surjective; and $\pi(a) = N$ if and only if $a \in N$, so $\ker\pi = N$.

*Converse.* Suppose the operation is well defined, and let $g \in G$, $n \in N$. Since $nN = eN$, well-definedness gives $(nN)(g^{-1}N) = (eN)(g^{-1}N)$, that is $ng^{-1}N = g^{-1}N$. By [[abstract-algebra/lagrange#lem-cosets]], $(g^{-1})^{-1}(ng^{-1}) = gng^{-1} \in N$. So $N$ is normal.
:::

Combining [[#thm-kernel-normal]] with this theorem: the normal subgroups of $G$ are *exactly* the kernels of homomorphisms out of $G$.

In additive notation the quotient is written $G/N$ with $(a + N) + (b + N) = (a + b) + N$. The prototype is $\Z/n\Z$, whose elements are the residue classes $k + n\Z$ and whose addition is addition of remainders. The map $k + n\Z \mapsto k \bmod n$ is an isomorphism $\Z/n\Z \cong \Z_n$, and in later chapters we use the two notations interchangeably.

::: example Computing quotients {#ex-quotients}
Identify (a) $D_4/\langle r^2\rangle$, (b) $\Z_{12}/\langle 4\rangle$, (c) $Q_8/\set{\pm 1}$ and (d) $S_n/A_n$.
::: solution
(a) $N = \langle r^2\rangle = \set{e, r^2}$ is central, hence normal, and $\abs{D_4/N} = 8/2 = 4$. The cosets are $N$, $rN = \set{r, r^3}$, $sN = \set{s, r^2s}$ and $rsN = \set{rs, r^3s}$. Each non-identity coset squares to the identity coset: $(rN)^2 = r^2N = N$, $(sN)^2 = s^2N = N$ and $(rsN)^2 = (rs)^2N = N$. A group of order $4$ in which every element squares to the identity is $V_4$ ([[abstract-algebra/groups#ex-small-groups]]), so $D_4/\langle r^2\rangle \cong V_4$.

(b) $N = \set{0, 4, 8}$, and $\Z_{12}/N$ has $4$ elements. The coset $1 + N$ has order $4$: $2(1 + N) = 2 + N$ and $3(1 + N) = 3 + N$ are not $N$, while $4(1 + N) = 4 + N = N$. So the quotient is cyclic: $\Z_{12}/\langle 4\rangle \cong \Z_4$.

(c) $\set{\pm1} = Z(Q_8)$ is normal and the quotient has order $4$. The cosets are $\set{\pm1}$, $\set{\pm i}$, $\set{\pm j}$, $\set{\pm k}$, and $(\pm i)^2 = -1 \in \set{\pm 1}$, and likewise for $j$ and $k$. So again every element squares to the identity and $Q_8/\set{\pm1} \cong V_4$.

(d) $A_n$ has index $2$, so $S_n/A_n$ has order $2$ and is isomorphic to $\Z_2$: the two cosets are "even" and "odd", and they multiply like signs.
:::
:::

::: widget cayley
group: D
n: 4
highlight: r^2
mode: table
caption: The Cayley table of $D_4$ with the normal subgroup $N = \set{e, r^2}$ and its cosets coloured. Because $N$ is normal, the colour of a product depends only on the colours of the factors: the coloured table collapses to a $4\times4$ table, which is the Cayley table of $D_4/N \cong V_4$. Compare with the non-normal subgroup $\set{e, s}$ in [[abstract-algebra/lagrange]], where no such collapse happens.
:::

::: warning A quotient is not a subgroup
$G/N$ is a new group whose elements are *sets* (cosets), not a subgroup of $G$. It need not be isomorphic to any subgroup of $G$: for example $Q_8/\set{\pm1} \cong V_4$, but $Q_8$ has only one element of order $2$, so it contains no copy of $V_4$. Also, $G/N$ only makes sense when $N$ is normal: for $H = \set{e, (1\ 2)}$ in $S_3$, the "product" of the cosets $(1\ 3)H$ and $(1\ 3)H$ would depend on the representatives chosen.
:::

## The first isomorphism theorem

We have seen two ways to manufacture homomorphisms out of $G$ whose kernel is a normal subgroup $N$: a given homomorphism with kernel $N$, and the natural map $G \to G/N$. The first isomorphism theorem says they are the same thing.

::: theorem First isomorphism theorem {#thm-first-iso}
Let $\varphi\colon G \to H$ be a homomorphism with kernel $K$. Then $K \trianglelefteq G$ and

$$
G/K \cong \Img\varphi, \qquad aK \mapsto \varphi(a).
$$ {#eq-first-iso}
:::

::: proof
$K$ is normal by [[#thm-kernel-normal]]. Define $\bar\varphi\colon G/K \to \Img\varphi$ by $\bar\varphi(aK) = \varphi(a)$. By [[#thm-kernel-fibres]],

$$
aK = bK \iff \varphi(a) = \varphi(b):
$$

reading this from left to right shows $\bar\varphi$ is **well defined** (equal cosets give equal values), and from right to left shows it is **injective**. It is **surjective** onto $\Img\varphi$ since every $\varphi(a)$ is $\bar\varphi(aK)$. Finally it is a **homomorphism**: $\bar\varphi(aK\,bK) = \bar\varphi(abK) = \varphi(ab) = \varphi(a)\varphi(b) = \bar\varphi(aK)\bar\varphi(bK)$. So $\bar\varphi$ is an isomorphism.
:::

The theorem is often summarised by saying that $\varphi$ factors as $G \xrightarrow{\pi} G/K \xrightarrow{\bar\varphi} H$, a surjection followed by an injection. For finite groups it gives a counting rule: $\abs{G} = \abs{\ker\varphi}\cdot\abs{\Img\varphi}$, so $\abs{\Img\varphi}$ divides both $\abs{G}$ and $\abs{H}$. This explains the numbers in [[#ex-homs-z12-z30]].

::: example Applications of the first isomorphism theorem {#ex-first-iso}
Prove that (a) $\mathrm{GL}_n(\R)/\mathrm{SL}_n(\R) \cong \R^\times$; (b) $\R/\Z \cong \mathbb{T}$, the circle group $\set{z : \abs{z} = 1}$; (c) $\C^\times/\mu_n \cong \C^\times$.
::: solution
In each case find a surjective homomorphism with the right kernel.

(a) $\det\colon\mathrm{GL}_n(\R) \to \R^\times$ has kernel $\mathrm{SL}_n(\R)$ and is surjective, since $\det\diag(t, 1, \dots, 1) = t$. So $\mathrm{GL}_n(\R)/\mathrm{SL}_n(\R) \cong \R^\times$: a coset of $\mathrm{SL}_n$ is "all matrices with a given determinant".

(b) $\varphi(x) = e^{2\pi i x}$ is a homomorphism $(\R, +) \to \mathbb{T}$ since $e^{2\pi i(x+y)} = e^{2\pi ix}e^{2\pi i y}$. It is surjective (every point of the circle is $e^{i\theta}$), and $e^{2\pi i x} = 1$ exactly when $x \in \Z$. So $\R/\Z \cong \mathbb{T}$: wrapping the real line around the circle identifies numbers that differ by an integer.

(c) $\varphi(z) = z^n$ is a homomorphism $\C^\times \to \C^\times$ (the group is abelian), with kernel $\mu_n$. It is surjective because every non-zero complex number has an $n$-th root ([[complex-analysis/complex-numbers]]). So $\C^\times/\mu_n \cong \C^\times$ — a quotient of a group can be isomorphic to the group itself.
:::
:::

::: quiz
A surjective homomorphism $\varphi\colon G \to H$ has $\abs{G} = 24$ and $\abs{H} = 6$. What is $\abs{\ker\varphi}$?
- [ ] $6$
- [x] $4$
- [ ] $18$
- [ ] It cannot be determined
::: solution
By the first isomorphism theorem $G/\ker\varphi \cong H$, so $\abs{G}/\abs{\ker\varphi} = \abs{H}$ and $\abs{\ker\varphi} = 24/6 = 4$.
:::
:::

## The second and third isomorphism theorems

Two further theorems describe how quotients interact with subgroups. Both are proved by writing down a homomorphism and applying the first theorem.

::: theorem Second isomorphism theorem {#thm-second-iso}
Let $H \le G$ and $N \trianglelefteq G$. Then $HN = \set{hn : h \in H, n \in N}$ is a subgroup of $G$, $N \trianglelefteq HN$, $H \cap N \trianglelefteq H$, and

$$
H/(H \cap N) \cong HN/N .
$$
:::

::: proof
*$HN$ is a subgroup.* It contains $e$. For $h_1n_1, h_2n_2 \in HN$,

$$
(h_1n_1)(h_2n_2) = h_1h_2\,(h_2^{-1}n_1h_2)\,n_2 \in HN, \qquad (h_1n_1)^{-1} = n_1^{-1}h_1^{-1} = h_1^{-1}\,(h_1n_1^{-1}h_1^{-1}) \in HN,
$$

using normality of $N$ for the bracketed factors. $N$ is normal in $HN$ because it is normal in all of $G$.

*The isomorphism.* Define $\psi\colon H \to HN/N$ by $\psi(h) = hN$. It is the restriction of the natural map $G \to G/N$, so it is a homomorphism. It is surjective: a typical element of $HN/N$ is $hnN = hN = \psi(h)$. Its kernel is $\set{h \in H : hN = N} = H \cap N$. By the first isomorphism theorem, $H \cap N$ is normal in $H$ and $H/(H\cap N) \cong HN/N$.
:::

::: example The second isomorphism theorem in ℤ {#ex-second-iso-z}
Apply the second isomorphism theorem to $H = m\Z$ and $N = n\Z$ in $\Z$ (with $m, n \ge 1$), and deduce that $\gcd(m, n)\cdot\lcm(m, n) = mn$.
::: solution
In additive notation $HN$ is $m\Z + n\Z = \set{mx + ny}$, which by Bézout's identity ([[number-theory/divisibility#thm-bezout]]) is $d\Z$ with $d = \gcd(m, n)$. And $m\Z \cap n\Z$ is the set of common multiples, $l\Z$ with $l = \lcm(m, n)$. The theorem gives

$$
m\Z/l\Z \cong d\Z/n\Z .
$$

Count elements: $m\Z/l\Z$ consists of the cosets of $l\Z$ in $m\Z$, of which there are $l/m$ (namely $0, m, 2m, \dots, l - m$ plus $l\Z$); similarly $\abs{d\Z/n\Z} = n/d$. So $l/m = n/d$, that is $dl = mn$.
:::
:::

::: theorem Third isomorphism theorem {#thm-third-iso}
Let $N$ and $K$ be normal subgroups of $G$ with $N \subseteq K$. Then $K/N \trianglelefteq G/N$ and

$$
(G/N)/(K/N) \cong G/K .
$$
:::

::: proof
Define $\theta\colon G/N \to G/K$ by $\theta(gN) = gK$. It is well defined: if $gN = g'N$ then $g^{-1}g' \in N \subseteq K$, so $gK = g'K$. It is a homomorphism, $\theta(gN\,hN) = ghK = gK\,hK$, and it is surjective. Its kernel is $\set{gN : gK = K} = \set{gN : g \in K} = K/N$. The first isomorphism theorem gives both conclusions.
:::

In words: "quotienting in two stages is the same as quotienting at once". For instance $\Z/12\Z$ modulo the image of $4\Z$ is $\Z/4\Z$, matching [[#ex-quotients]](b). The final theorem describes all subgroups of a quotient.

::: theorem Correspondence theorem {#thm-correspondence}
Let $N \trianglelefteq G$ and $\pi\colon G \to G/N$ the natural map. Then $K \mapsto K/N = \pi(K)$ is a bijection

$$
\set{\text{subgroups } K \text{ of } G \text{ with } N \subseteq K} \longleftrightarrow \set{\text{subgroups of } G/N},
$$

with inverse $L \mapsto \pi^{-1}(L)$. It preserves inclusions and indices ($[G:K] = [G/N : K/N]$), and $K \trianglelefteq G$ if and only if $K/N \trianglelefteq G/N$.
:::

::: proof
Both maps send subgroups to subgroups by [[#prop-hom-props]], and $\pi^{-1}(L)$ contains $N = \pi^{-1}(\set{N})$. Since $\pi$ is surjective, $\pi(\pi^{-1}(L)) = L$ for every $L \le G/N$. If $N \subseteq K \le G$, then $\pi^{-1}(\pi(K)) = KN$ (the elements whose coset meets $K$), and $KN = K$ because $N \subseteq K$. So the two maps are mutually inverse bijections. Both clearly preserve inclusions. For indices, the cosets of $K/N$ in $G/N$ are the sets $\pi(gK)$, and $gK \mapsto \pi(gK)$ is a bijection between cosets (as $gK = g'K \iff g^{-1}g' \in K \iff \pi(g)^{-1}\pi(g') \in K/N$). For normality: if $K \trianglelefteq G$, then $\pi(g)\pi(k)\pi(g)^{-1} = \pi(gkg^{-1}) \in \pi(K)$; conversely if $K/N \trianglelefteq G/N$, then $K = \pi^{-1}(K/N)$ is the kernel of the composite $G \to G/N \to (G/N)/(K/N)$, hence normal.
:::

For example, the subgroups of $\Z_{12} \cong \Z/12\Z$ correspond to subgroups of $\Z$ containing $12\Z$, which are the $d\Z$ with $d \mid 12$ — recovering the six subgroups found in [[abstract-algebra/subgroups#ex-z12-lattice]].

## Simple groups and abelianisation

A group $G \neq \set{e}$ is **simple** if its only normal subgroups are $\set{e}$ and $G$. Simple groups cannot be broken into a normal subgroup and a quotient, so they are the "atoms" from which all finite groups are assembled — the Jordan–Hölder theorem makes this precise. By [[abstract-algebra/subgroups#exr-2-9]] and the fact that all subgroups of an abelian group are normal, the abelian simple groups are exactly the cyclic groups $\Z_p$ of prime order. Non-abelian simple groups are much rarer: the smallest is $A_5$, of order $60$, proved simple in [[abstract-algebra/group-actions]]. A homomorphism out of a simple group is either injective or trivial, because its kernel is normal.

At the other extreme, we can measure how far a group is from abelian. The **commutator** of $a, b$ is $[a, b] = aba^{-1}b^{-1}$, which is $e$ exactly when $ab = ba$. The **commutator subgroup** $G'$ is the subgroup generated by all commutators. It is normal, because $g[a,b]g^{-1} = [gag^{-1}, gbg^{-1}]$ is again a commutator, and for $N \trianglelefteq G$,

$$
G/N \text{ is abelian} \iff abN = baN \text{ for all } a, b \iff a^{-1}b^{-1}ab \in N \text{ for all } a, b \iff G' \subseteq N .
$$

So $G/G'$, the **abelianisation**, is the largest abelian quotient of $G$. For $S_3$, $S_3' = A_3$ and the abelianisation is $\Z_2$ ([[#exr-5-9]] proves $S_n' = A_n$ in general).

::: history
Évariste Galois distinguished, in his memoir of 1831 and his letter of 1832, between decompositions of a group into left cosets and into right cosets, and noted the special role of subgroups for which the two coincide — normal subgroups, in modern terms; he recognised that solvability of an equation depends on finding a chain of such subgroups. Camille Jordan's *Traité des substitutions* (1870) studied composition series of normal subgroups, and Otto Hölder (1889) introduced quotient groups explicitly and completed the Jordan–Hölder theorem. The isomorphism theorems in the clean general form given here are associated with Emmy Noether, who formulated them in the 1920s for groups with operators, rings and modules alike.
:::

## Where this leads

Quotients are used constantly from now on. In [[abstract-algebra/group-actions]] a group acting on a set gives a homomorphism into a symmetric group, whose kernel is a normal subgroup; this is the main tool for proving that groups of certain orders are not simple. In [[abstract-algebra/rings]] the same pattern — kernels, quotients, an isomorphism theorem — reappears for rings, with ideals in place of normal subgroups. And in [[abstract-algebra/fields-galois]] solvability of polynomial equations by radicals becomes a statement about chains of normal subgroups with abelian quotients.

::: summary
- A **homomorphism** satisfies $\varphi(ab) = \varphi(a)\varphi(b)$; it preserves identities, inverses and powers, and $\ord\varphi(a)$ divides $\ord a$.
- The **kernel** is a normal subgroup, the fibres of $\varphi$ are its cosets, and $\varphi$ is injective iff $\ker\varphi = \set{e}$.
- $N$ is **normal** iff $gNg^{-1} \subseteq N$ for all $g$, iff $gN = Ng$ for all $g$. Subgroups of abelian groups, of index $2$, of the centre, and kernels are normal; normality is not transitive.
- For $N \trianglelefteq G$, the cosets form the **quotient group** $G/N$ with $(aN)(bN) = abN$; normality is exactly what makes this well defined.
- **First isomorphism theorem**: $G/\ker\varphi \cong \Img\varphi$; so $\abs{G} = \abs{\ker\varphi}\abs{\Img\varphi}$ for finite $G$.
- **Second**: $H/(H\cap N) \cong HN/N$. **Third**: $(G/N)/(K/N) \cong G/K$. **Correspondence**: subgroups of $G/N$ ↔ subgroups of $G$ containing $N$.
- Simple groups have no non-trivial proper normal subgroups; $G/G'$ is the largest abelian quotient.
:::

## Exercises

::: exercise Reduction from Z₈ to Z₄ {level=1 check="2"}
Show that $\varphi\colon \Z_8 \to \Z_4$, $\varphi(k) = k \bmod 4$, is a homomorphism. What is $\abs{\ker\varphi}$?
::: solution
Since $4 \mid 8$, reducing modulo $4$ is compatible with addition modulo $8$: if $j + k = q\cdot 8 + r$ then $r \equiv j + k \pmod 4$, so $\varphi(j +_8 k) = \varphi(j) +_4 \varphi(k)$. The kernel is $\set{0, 4}$, of order $2$, consistent with $8 = 2 \cdot 4$ since $\varphi$ is onto.
:::
:::

::: exercise Counting with the first isomorphism theorem {level=1 check="6"}
A homomorphism $\varphi\colon G \to H$ is surjective, $\abs{G} = 24$ and $\abs{\ker\varphi} = 4$. What is $\abs{H}$?
::: solution
$H = \Img\varphi \cong G/\ker\varphi$, which has order $24/4 = 6$.
:::
:::

::: exercise Homomorphisms from Z₈ to Z₁₂ {level=1 check="4"}
How many homomorphisms $\Z_8 \to \Z_{12}$ are there?
::: solution
A homomorphism is determined by $x = \varphi(1)$, which must satisfy $8x \equiv 0 \pmod{12}$, i.e. $12 \mid 8x$, i.e. $3 \mid 2x$, i.e. $3 \mid x$. So $x \in \set{0, 3, 6, 9}$, and each such $x$ gives a well-defined homomorphism as in [[#ex-homs-z12-z30]]. There are $4$ homomorphisms.
:::
:::

::: exercise Powers land in a normal subgroup {level=2}
Let $N \trianglelefteq G$ with $[G : N] = m$ finite. Prove that $g^m \in N$ for every $g \in G$.
::: solution
The quotient $G/N$ is a group of order $m$, so by [[abstract-algebra/lagrange#cor-element-order]], $(gN)^m = N$ for every $g$. But $(gN)^m = g^mN$, and $g^mN = N$ means $g^m \in N$.
:::
:::

::: exercise No surjection onto V₄ {level=2}
Prove that there is no surjective homomorphism from $\Z_{16}$ onto $\Z_2 \times \Z_2$.
::: solution
The image of a cyclic group $\langle a\rangle$ is cyclic, generated by $\varphi(a)$, since $\varphi(a^k) = \varphi(a)^k$. But $\Z_2\times\Z_2$ is not cyclic ([[abstract-algebra/subgroups#thm-cyclic-product]]). So no homomorphism from $\Z_{16}$ can have image $\Z_2\times\Z_2$.
:::
:::

::: exercise Automorphisms of Zₙ {level=2}
Prove that $\Aut(\Z_n) \cong U(n)$.
::: hint
An automorphism is determined by the image of $1$, which must be a generator.
:::
::: solution
An automorphism $\alpha$ of $\Z_n$ is determined by $k = \alpha(1)$, since $\alpha(m) = mk$. As $\alpha$ is surjective, $k$ must generate $\Z_n$, so $\gcd(k, n) = 1$ ([[abstract-algebra/subgroups#thm-order-of-power]]), i.e. $k \in U(n)$. Conversely, for $k \in U(n)$ the map $\alpha_k(m) = mk \bmod n$ is a homomorphism (as in [[#ex-homs-z12-z30]]), and it is injective, since $mk \equiv 0 \pmod n$ with $\gcd(k, n) = 1$ forces $n \mid m$; an injective map of a finite set to itself is bijective. So $k \mapsto \alpha_k$ is a bijection $U(n) \to \Aut(\Z_n)$. It is a homomorphism: $\alpha_k(\alpha_l(m)) = mlk$, so $\alpha_k\circ\alpha_l = \alpha_{kl}$. Hence $\Aut(\Z_n) \cong U(n)$; for example $\Aut(\Z_8) \cong U(8) \cong V_4$.
:::
:::

::: exercise A unique subgroup of a given order is normal {level=2}
Suppose $H$ is the only subgroup of $G$ of order $k$. Prove that $H \trianglelefteq G$.
::: solution
For $g \in G$, $gHg^{-1}$ is the image of $H$ under the automorphism $c_g$, so it is a subgroup, and $x \mapsto gxg^{-1}$ is a bijection $H \to gHg^{-1}$, so $\abs{gHg^{-1}} = k$. By uniqueness $gHg^{-1} = H$ for every $g$, so $H$ is normal.
:::
:::

::: exercise If G/Z(G) is cyclic {level=3}
Prove that if $G/Z(G)$ is cyclic then $G$ is abelian. Deduce that $G/Z(G)$ can never be a non-trivial cyclic group.
::: solution
Let $Z = Z(G)$ and suppose $G/Z = \langle gZ\rangle$. Every coset is $g^kZ$ for some $k$, so every element of $G$ has the form $g^kz$ with $z \in Z$. For two elements $a = g^jz$ and $b = g^kw$ ($z, w \in Z$),

$$
ab = g^jzg^kw = g^jg^k zw = g^{j+k}zw = g^kg^j wz = g^kw\,g^jz = ba,
$$

because $z$ and $w$ commute with everything and powers of $g$ commute with each other. So $G$ is abelian. But then $Z(G) = G$ and $G/Z(G)$ is trivial. Hence $G/Z(G)$ is never cyclic of order greater than $1$. (Example: $D_4/Z(D_4) \cong V_4$ is not cyclic, as it must not be.)
:::
:::

::: exercise The commutator subgroup of Sₙ {level=3}
Prove that the commutator subgroup of $S_n$ is $A_n$ for $n \ge 2$.
::: hint
Show $S_n' \subseteq A_n$ using the sign, and that every $3$-cycle is a commutator.
:::
::: solution
$S_n/A_n \cong \Z_2$ is abelian, so $S_n' \subseteq A_n$ by the criterion in the last section (equivalently, $\sgn[a,b] = \sgn(a)\sgn(b)\sgn(a)^{-1}\sgn(b)^{-1} = 1$). For $n = 2$ both sides are trivial. For $n \ge 3$ and distinct $a, b, c$,

$$
[(a\ b), (a\ c)] = (a\ b)(a\ c)(a\ b)^{-1}(a\ c)^{-1} = \bigl((a\ b)(a\ c)\bigr)^2 = (a\ c\ b)^2 = (a\ b\ c),
$$

using $(a\ b)(a\ c) = (a\ c\ b)$ from [[abstract-algebra/permutation-groups#exr-3-7]]. So every $3$-cycle lies in $S_n'$. Since the $3$-cycles generate $A_n$ (same exercise), $A_n \subseteq S_n'$. Hence $S_n' = A_n$.
:::
:::

::: exercise The group ℚ/ℤ {level=3}
Show that every element of $\Q/\Z$ has finite order, and that for each $n \ge 1$, $\Q/\Z$ has exactly one subgroup of order $n$, which is cyclic.
::: solution
An element is $\frac ab + \Z$ with $b \ge 1$, and $b\left(\frac ab + \Z\right) = a + \Z = \Z$, so it has finite order (dividing $b$). The coset $\frac1n + \Z$ has order exactly $n$, since $\frac kn \in \Z$ only when $n \mid k$; so $\langle \frac1n + \Z\rangle = \set{\frac kn + \Z : 0 \le k < n}$ is a cyclic subgroup of order $n$. Conversely, let $H$ be a subgroup of order $n$. Each element $x + \Z \in H$ has order dividing $n$ (Lagrange), so $nx \in \Z$, i.e. $x = \frac kn$ for some integer $k$. Thus $H \subseteq \set{\frac kn + \Z}$, a set of exactly $n$ elements, and since $\abs{H} = n$ they are equal. So the subgroup of order $n$ is unique and cyclic.
:::
:::
