Inside the six symmetries of the triangle sit the three rotations $\set{e, r, r^2}$, and they form a group in their own right: rotating twice is a rotation, the identity is a rotation, and undoing a rotation is a rotation. Inside the integers sit the even integers, which also form a group under addition. Groups sitting inside other groups are called **subgroups**, and they are the first tool for understanding the structure of a group: a large group is often best understood through the smaller groups it contains.

The simplest way to produce a subgroup is to take one element and all of its powers. The groups that arise like this, the **cyclic groups**, are the simplest groups there are, and they are the one family we can understand *completely*. By the end of this chapter we will know every cyclic group up to isomorphism, every one of their subgroups, and the order of every element — and the answers will be governed by divisors and greatest common divisors, foreshadowing the close link between group theory and [[number-theory]].

## Subgroups

::: definition Subgroup {#def-subgroup}
A subset $H$ of a group $G$ is a **subgroup** of $G$, written $H \le G$, if $H$ is itself a group under the operation of $G$. The subgroups $\set{e}$ (the **trivial subgroup**) and $G$ itself are always present; any other subgroup is a **proper non-trivial** subgroup.
:::

A subgroup automatically has the same identity as $G$: if $f$ is the identity of $H$, then $ff = f = fe$ in $G$, and cancellation in $G$ gives $f = e$. Likewise the inverse of $h$ in $H$ is its inverse $h^{-1}$ in $G$, by uniqueness of inverses ([[abstract-algebra/groups#thm-group-basics]]). And associativity is inherited for free, since it holds for all elements of $G$. So checking that a subset is a subgroup comes down to closure, the identity and inverses — and even this can be streamlined.

::: theorem Subgroup tests {#thm-subgroup-test}
Let $H$ be a subset of a group $G$. The following are equivalent:

1. $H \le G$;
2. (**two-step test**) $H \neq \varnothing$, and $ab \in H$ and $a^{-1} \in H$ whenever $a, b \in H$;
3. (**one-step test**) $H \neq \varnothing$, and $ab^{-1} \in H$ whenever $a, b \in H$.
:::

::: proof
(1) ⇒ (3): A subgroup contains $e$, so is non-empty; if $a, b \in H$ then $b^{-1} \in H$ and so $ab^{-1} \in H$ by closure.

(3) ⇒ (2): Pick $a \in H$. Taking $b = a$ gives $e = aa^{-1} \in H$. Then for any $b \in H$, $b^{-1} = eb^{-1} \in H$. Finally, for $a, b \in H$ we now know $b^{-1} \in H$, so $ab = a(b^{-1})^{-1} \in H$.

(2) ⇒ (1): The operation of $G$ restricts to a binary operation on $H$ by closure, and it is associative because it is associative on all of $G$. $H$ contains some $a$, hence $a^{-1}$, hence $aa^{-1} = e$, which is an identity for $H$. Inverses lie in $H$ by assumption. So $H$ is a group.
:::

In additive notation the one-step test reads: $H$ is non-empty and $a - b \in H$ whenever $a, b \in H$.

::: example Some subgroups {#ex-subgroups}
Show that (a) $n\Z \le \Z$; (b) $\mathrm{SL}_n(\R) \le \mathrm{GL}_n(\R)$; (c) the unit circle $\mathbb{T} = \set{z \in \C : \abs{z} = 1}$ is a subgroup of $\C^\times$.
::: solution
(a) $0 \in n\Z$, and $na - nb = n(a - b) \in n\Z$. By the one-step test, $n\Z \le \Z$.

(b) $I \in \mathrm{SL}_n(\R)$. If $\det A = \det B = 1$, then $\det(AB^{-1}) = \det A \,/\det B = 1$, so $AB^{-1} \in \mathrm{SL}_n(\R)$.

(c) $1 \in \mathbb{T}$, and if $\abs{z} = \abs{w} = 1$ then $\abs{zw^{-1}} = \abs{z}/\abs{w} = 1$.
:::
:::

When $H$ is finite there is an even quicker test: closure alone is enough.

::: theorem Finite subgroup test {#thm-finite-subgroup-test}
A non-empty **finite** subset $H$ of a group $G$ that is closed under the operation of $G$ is a subgroup.
:::

::: proof
By the two-step test it suffices to show $a^{-1} \in H$ for each $a \in H$. By closure all the powers $a, a^2, a^3, \dots$ lie in $H$. Since $H$ is finite, two of them coincide: $a^i = a^j$ with $i < j$. Cancelling $a^i$ gives $a^{j-i} = e$. If $j - i = 1$ then $a = e$ and $a^{-1} = e = a \in H$. Otherwise $j - i - 1 \ge 1$, and $a^{-1} = a^{j-i-1}$ (because $a \cdot a^{j-i-1} = a^{j-i} = e$) is a positive power of $a$, hence in $H$.
:::

For example the rotations $\set{e, r, r^2}$ of the triangle form a subgroup of $D_3$ simply because the product of two rotations is a rotation. The theorem fails for infinite sets: $\set{1, 2, 3, \dots}$ is closed under addition but is not a subgroup of $\Z$.

::: warning A subgroup uses the same operation
$\Z_n = \set{0, 1, \dots, n-1}$ is a subset of $\Z$ and is a group, but it is **not** a subgroup of $\Z$: its operation (addition modulo $n$) is not the operation of $\Z$, and indeed $\set{0, \dots, n-1}$ is not closed under ordinary addition. Similarly $\set{1, -1}$ is a group under multiplication but not a subgroup of $(\Z, +)$. Always test closure under the operation of the *big* group.
:::

### Intersections, centres and centralisers

::: proposition Intersections of subgroups {#prop-intersection}
The intersection of any collection of subgroups of $G$ is a subgroup of $G$.
:::

::: proof
Let $H = \bigcap_i H_i$. Each $H_i$ contains $e$, so $e \in H$. If $a, b \in H$ then $a, b \in H_i$ for every $i$, so $ab^{-1} \in H_i$ for every $i$, so $ab^{-1} \in H$.
:::

Unions are a different story: $2\Z \cup 3\Z$ contains $2$ and $3$ but not $5$, so it is not a subgroup. (In fact a union of two subgroups is a subgroup only when one contains the other — [[#exr-2-6]].)

Two subgroups measure how commutative a group is.

::: definition Centre and centraliser {#def-centre}
The **centre** of a group $G$ is

$$
Z(G) = \set{a \in G : ag = ga \text{ for all } g \in G},
$$

the set of elements that commute with everything. For $a \in G$, the **centraliser** of $a$ is $C_G(a) = \set{g \in G : ga = ag}$.
:::

Both are subgroups. For the centre: $e \in Z(G)$; if $a, b \in Z(G)$ and $g \in G$, then $(ab)g = a(bg) = a(gb) = (ag)b = (ga)b = g(ab)$, so $ab \in Z(G)$; and from $ag = ga$ we get, multiplying by $a^{-1}$ on both sides, $ga^{-1} = a^{-1}g$, so $a^{-1} \in Z(G)$. The same computation with $g$ fixed shows that the centraliser $C_G(g)$ is a subgroup. Clearly $G$ is abelian if and only if $Z(G) = G$, and $Z(G) = \bigcap_{a\in G} C_G(a)$.

::: example The centre of GL₂(ℝ) {#ex-centre-gl2}
Show that $Z(\mathrm{GL}_2(\R)) = \set{\lambda I : \lambda \neq 0}$, the non-zero scalar matrices.
::: solution
Scalar matrices commute with every matrix, so they lie in the centre. Conversely let $A = \begin{pmatrix} a & b\\ c & d\end{pmatrix}$ be central. It commutes with $E = \begin{pmatrix} 1 & 1\\ 0 & 1\end{pmatrix}$:

$$
AE = \begin{pmatrix} a & a+b\\ c & c+d\end{pmatrix}, \qquad EA = \begin{pmatrix} a+c & b+d\\ c & d\end{pmatrix}.
$$

Comparing top-left entries gives $c = 0$, and comparing top-right entries gives $a = d$. It also commutes with $F = \begin{pmatrix} 1 & 0\\ 1 & 1\end{pmatrix}$:

$$
AF = \begin{pmatrix} a+b & b\\ c+d & d\end{pmatrix}, \qquad FA = \begin{pmatrix} a & b\\ a+c & b+d\end{pmatrix},
$$

so $b = 0$. Hence $A = aI$ with $a \neq 0$ (as $A$ is invertible). In the triangle group $D_3$, by contrast, no element other than $e$ commutes with everything (check rows against columns in the table [[abstract-algebra/groups#eq-d3-table]]), so $Z(D_3) = \set{e}$.
:::
:::

**Subgroup generated by a set.** If $S \subseteq G$, the intersection of all subgroups of $G$ containing $S$ is, by [[#prop-intersection]], the smallest subgroup containing $S$. It is written $\langle S\rangle$, the **subgroup generated by $S$**, and it consists of all finite products $s_1^{\pm1}s_2^{\pm1}\cdots s_k^{\pm1}$ with $s_i \in S$ (these products form a subgroup by the two-step test, and any subgroup containing $S$ must contain them). For instance, in $D_3$ we have $s_1s_2 = r$, so $\langle s_1, s_2\rangle$ contains $r$, $r^2$, $s_1$, $s_2$ and $rs_1 = s_3$: the two reflections generate the whole group. The most important case is a single generator, to which we now turn.

## The order of an element

::: definition Order of an element {#def-element-order}
Let $a$ be an element of a group $G$. The **order** of $a$, written $\ord(a)$ (or $\abs{a}$), is the smallest positive integer $n$ with $a^n = e$. If no such $n$ exists, $a$ has **infinite order**. In additive notation, $\ord(a)$ is the smallest $n \ge 1$ with $na = 0$.
:::

Examples: $\ord(e) = 1$, and $e$ is the only element of order $1$. In $D_3$, $\ord(r) = 3$ and each reflection has order $2$. In $\C^\times$, $\ord(i) = 4$ and $\ord(2) = \infty$. In $\Z$ every non-zero element has infinite order. In $\Z_{12}$, the multiples of $8$ are $8, 16 \equiv 4, 24 \equiv 0$, so $\ord(8) = 3$.

::: definition Cyclic subgroup {#def-cyclic-subgroup}
For $a \in G$, the **cyclic subgroup generated by $a$** is $\langle a\rangle = \set{a^k : k \in \Z}$ (in additive notation $\set{ka : k \in \Z}$).
:::

It is a subgroup by the one-step test: it contains $a^0 = e$, and $a^j(a^k)^{-1} = a^{j-k}$ by the exponent laws. It is the smallest subgroup containing $a$. The next theorem connects its size to the order of $a$ and is the workhorse of the whole chapter.

::: theorem Powers of an element {#thm-order-divides}
Let $a \in G$.

1. If $a$ has infinite order, the powers $a^k$ ($k \in \Z$) are all distinct, so $\langle a \rangle$ is infinite.
2. If $\ord(a) = n$, then $a^k = e$ if and only if $n \mid k$; more generally $a^i = a^j$ if and only if $n \mid i - j$. Hence $\langle a\rangle = \set{e, a, a^2, \dots, a^{n-1}}$ with these $n$ elements distinct, and $\abs{\langle a\rangle} = \ord(a)$.
:::

::: proof
1. If $a^i = a^j$ with $i > j$, then $a^{i-j} = e$ with $i - j \ge 1$, so $a$ has finite order.

2. If $n \mid k$, say $k = nq$, then $a^k = (a^n)^q = e^q = e$. Conversely suppose $a^k = e$. By the division algorithm ([[number-theory/divisibility#thm-division-algorithm]]) write $k = qn + r$ with $0 \le r < n$. Then

$$
e = a^k = (a^n)^q a^r = a^r .
$$

Since $0 \le r < n$ and $n$ is the *least* positive integer with $a^n = e$, we must have $r = 0$; so $n \mid k$. Applying this to $k = i - j$ gives the second statement, since $a^i = a^j \iff a^{i-j} = e$. Finally, every power $a^k$ equals $a^r$ where $r$ is the remainder of $k$ modulo $n$, so $\langle a\rangle = \set{e, a, \dots, a^{n-1}}$, and these are distinct because no two of $0, 1, \dots, n-1$ differ by a multiple of $n$.
:::

So the "order" of an element and the "order" of the subgroup it generates are the same number — which is why the same word is used for both.

::: example Orders in U(15) {#ex-orders-u15}
Find the order of every element of $U(15) = \set{1, 2, 4, 7, 8, 11, 13, 14}$.
::: solution
Compute successive powers modulo $15$ until $1$ appears:

- $2, 4, 8, 16 \equiv 1$: $\ord(2) = 4$, and $\langle 2\rangle = \set{1, 2, 4, 8}$;
- $4, 16 \equiv 1$: $\ord(4) = 2$; similarly $11^2 = 121 \equiv 1$ and $14^2 = 196 \equiv 1$, so $\ord(11) = \ord(14) = 2$;
- $7, 49 \equiv 4, 28 \equiv 13, 91 \equiv 1$: $\ord(7) = 4$; $8 = 2^3$ and $13 = 7^3$ also have order $4$;
- $\ord(1) = 1$.

No element has order $8$, so no element generates all of $U(15)$: the group has order $8$ but is not "generated by one element". Contrast $U(10)$, where $\ord(3) = 4 = \abs{U(10)}$.
:::
:::

::: quiz
What is the order of $8$ in $\Z_{12}$, and what is the order of $8$ in $U(15)$?
- [ ] $12$ and $8$
- [x] $3$ and $4$
- [ ] $3$ and $2$
- [ ] $4$ and $4$
::: solution
In $\Z_{12}$ the operation is addition: $8, 16 \equiv 4, 24 \equiv 0$, so $\ord(8) = 3$. In $U(15)$ it is multiplication: $8, 64 \equiv 4, 32 \equiv 2, 16 \equiv 1$, so $\ord(8) = 4$. The same symbol can have different orders in different groups, so always be clear which group and which operation you mean.
:::
:::

::: warning Orders of products are unpredictable
Knowing $\ord(a)$ and $\ord(b)$ tells you little about $\ord(ab)$ unless $a$ and $b$ commute. In $D_3$ the reflections $s_1, s_2$ have order $2$, but $s_1s_2 = r$ has order $3$. In $\mathrm{GL}_2(\R)$,

$$
A = \begin{pmatrix} 0 & 1\\ 1 & 0\end{pmatrix},\quad B = \begin{pmatrix} 0 & 2\\ \tfrac12 & 0\end{pmatrix}\quad\text{satisfy}\quad A^2 = B^2 = I, \quad AB = \begin{pmatrix} \tfrac12 & 0\\ 0 & 2\end{pmatrix},
$$

and $(AB)^k = \diag(2^{-k}, 2^k) \neq I$ for all $k \ge 1$: two elements of order $2$ whose product has infinite order. Even in abelian groups $\ord(ab)$ can be smaller than $\lcm(\ord a, \ord b)$, for instance when $b = a^{-1}$.
:::

## Cyclic groups

::: definition Cyclic group {#def-cyclic}
A group $G$ is **cyclic** if $G = \langle a\rangle$ for some $a \in G$; such an $a$ is a **generator** of $G$.
:::

Examples: $\Z = \langle 1\rangle = \langle -1\rangle$; $\Z_n = \langle 1\rangle$; the roots of unity $\mu_n = \langle e^{2\pi i/n}\rangle$; $U(10) = \langle 3\rangle$. Non-examples: $U(8)$ and $U(15)$ (no element has order equal to the group's order); $D_3$ (a cyclic group is abelian, because $a^ia^j = a^{i+j} = a^ja^i$); and $\Q$ under addition ([[#exr-2-8]]).

By [[#thm-order-divides]], a finite group $G$ is cyclic exactly when it has an element of order $\abs{G}$. The next theorem says that cyclic groups are completely determined by their order.

::: theorem Classification of cyclic groups {#thm-cyclic-classification}
Let $G = \langle a\rangle$ be cyclic. If $G$ is infinite then $G \cong \Z$; if $\abs{G} = n$ then $G \cong \Z_n$.
:::

::: proof
If $G$ is infinite, $a$ has infinite order, so the map $\varphi\colon \Z \to G$, $k \mapsto a^k$, is injective by [[#thm-order-divides]]; it is surjective because every element of $G$ is a power of $a$; and $\varphi(j + k) = a^{j+k} = a^ja^k = \varphi(j)\varphi(k)$. So $\varphi$ is an isomorphism ([[abstract-algebra/groups#def-isomorphism]]).

If $\abs{G} = n$ then $\ord(a) = n$, and $\varphi\colon \Z_n \to G$, $k \mapsto a^k$, is a bijection by [[#thm-order-divides]]. For $j, k \in \Z_n$, the sum $j +_n k$ differs from $j + k$ by a multiple of $n$, so $\varphi(j +_n k) = a^{j +_n k} = a^{j+k} = a^ja^k$, again by [[#thm-order-divides]]. So $\varphi$ is an isomorphism.
:::

Thus up to isomorphism there is exactly one cyclic group of each order: $\Z$, and $\Z_n$ for $n \ge 1$. In particular $U(10) \cong U(5) \cong \mu_4 \cong \Z_4$. Every question about cyclic groups is now a question about $\Z_n$, which is a question about integers and divisibility. The first such question is: which powers of a generator are again generators?

::: theorem Orders of powers {#thm-order-of-power}
Let $\ord(a) = n$ and $k \in \Z$. Then

$$
\ord(a^k) = \frac{n}{\gcd(n, k)}, \qquad\text{and}\qquad \langle a^k\rangle = \langle a^{\gcd(n,k)}\rangle .
$$

In particular $a^k$ generates $\langle a\rangle$ if and only if $\gcd(n, k) = 1$.
:::

::: proof
Let $d = \gcd(n, k)$. By [[#thm-order-divides]], $(a^k)^m = a^{km} = e$ if and only if $n \mid km$, which (dividing by $d$) holds if and only if $\frac{n}{d} \mid \frac{k}{d}m$. Since $\gcd\!\left(\frac nd, \frac kd\right) = 1$, this happens if and only if $\frac nd \mid m$ ([[number-theory/divisibility#thm-coprime-divides]]). So the least positive such $m$ is $n/d$, which is the order of $a^k$.

For the second statement: $a^k = (a^d)^{k/d} \in \langle a^d\rangle$, so $\langle a^k\rangle \subseteq \langle a^d\rangle$. Both subgroups have $n/d$ elements (by the first part, $\ord(a^d) = n/\gcd(n,d) = n/d$), so they are equal. Finally $a^k$ generates $\langle a\rangle$ if and only if $\ord(a^k) = n$, that is $\gcd(n, k) = 1$.
:::

The number of integers $k$ with $1 \le k \le n$ and $\gcd(n, k) = 1$ is **Euler's totient** $\varphi(n)$ ([[number-theory/fermat-euler#def-totient]]). So a cyclic group of order $n$ has exactly $\varphi(n)$ generators; for example $\Z_{12}$ has the $\varphi(12) = 4$ generators $1, 5, 7, 11$.

::: example Computing in Z₃₀ {#ex-z30}
In $\Z_{30}$, find the order of $18$, list $\langle 18\rangle$, and find all generators of $\langle 18\rangle$.
::: solution
Here $n = 30$ and $\gcd(30, 18) = 6$, so $\ord(18) = 30/6 = 5$, and $\langle 18\rangle = \langle 6\rangle = \set{0, 6, 12, 18, 24}$. (Directly: $18, 36 \equiv 6, 24, 42 \equiv 12, 30 \equiv 0$.) This subgroup is cyclic of order $5$, generated by $6$; its generators are $6m$ with $\gcd(5, m) = 1$, that is $6, 12, 18, 24$ — every non-zero element, as it must be in a group of prime order.
:::
:::

::: widget modular
n: 13
mode: powers
a: 2
caption: Powers modulo $13$: for each $a$ the figure lists $a, a^2, a^3, \dots$ modulo $13$, and the first exponent at which $1$ appears is $\ord(a)$ in $U(13)$. The row of $2$ runs through all twelve non-zero residues, so $U(13) = \langle 2 \rangle$ is cyclic. Find the other elements of order $12$ — there are $\varphi(12) = 4$ generators, namely $2^k$ with $\gcd(k, 12) = 1$ — and check that every order divides $12$.
:::

## Subgroups of cyclic groups

For a general group, finding all subgroups is hard. For cyclic groups the answer is complete and beautifully simple.

::: theorem Fundamental theorem of cyclic groups {#thm-cyclic-subgroups}
Every subgroup of a cyclic group is cyclic. Moreover, if $G = \langle a\rangle$ has order $n$, then the order of every subgroup of $G$ divides $n$, and for each positive divisor $d$ of $n$ there is **exactly one** subgroup of order $d$, namely $\langle a^{n/d}\rangle$.
:::

::: proof
Let $H \le G = \langle a\rangle$. If $H = \set{e}$ then $H = \langle e\rangle$ is cyclic. Otherwise $H$ contains some $a^k$ with $k \neq 0$, and then also $a^{-k}$, so it contains a positive power of $a$. Let $m$ be the **least** positive integer with $a^m \in H$. We claim $H = \langle a^m\rangle$. Certainly $\langle a^m\rangle \subseteq H$. Conversely let $a^k \in H$ and write $k = qm + r$ with $0 \le r < m$. Then

$$
a^r = a^k (a^m)^{-q} \in H,
$$

and minimality of $m$ forces $r = 0$. So $a^k = (a^m)^q \in \langle a^m\rangle$, proving the claim.

Now suppose $\abs{G} = n$. Since $a^n = e \in H$, the argument just given (with $k = n$) shows $m \mid n$, and by [[#thm-order-of-power]] $\abs{H} = \ord(a^m) = n/\gcd(n,m) = n/m$, a divisor of $n$. For each divisor $d$ of $n$, the subgroup $\langle a^{n/d}\rangle$ has order $n/(n/d) = d$, so a subgroup of order $d$ exists. If $K$ is any subgroup of order $d$, the first part shows $K = \langle a^m\rangle$ with $m \mid n$ and $n/m = d$, so $m = n/d$ and $K = \langle a^{n/d}\rangle$. So the subgroup of order $d$ is unique.
:::

::: corollary Subgroups of ℤ {#cor-subgroups-z}
The subgroups of $\Z$ are exactly $n\Z$ for $n = 0, 1, 2, \dots$.
:::

::: proof
$\Z = \langle 1\rangle$ is cyclic, so each subgroup is $\langle m\rangle = m\Z$ for some integer $m$, which we may take to be $\ge 0$ since $m\Z = (-m)\Z$.
:::

::: example The subgroups of Z₁₂ {#ex-z12-lattice}
List all subgroups of $\Z_{12}$ and describe which contain which.
::: solution
The divisors of $12$ are $1, 2, 3, 4, 6, 12$, so by [[#thm-cyclic-subgroups]] there are exactly six subgroups, the subgroup of order $d$ being $\langle 12/d\rangle$:

| order $d$ | subgroup | elements |
|---|---|---|
| $1$ | $\langle 0\rangle$ | $0$ |
| $2$ | $\langle 6\rangle$ | $0, 6$ |
| $3$ | $\langle 4\rangle$ | $0, 4, 8$ |
| $4$ | $\langle 3\rangle$ | $0, 3, 6, 9$ |
| $6$ | $\langle 2\rangle$ | $0, 2, 4, 6, 8, 10$ |
| $12$ | $\langle 1\rangle$ | all of $\Z_{12}$ |

The subgroup of order $d$ is contained in the subgroup of order $d'$ exactly when $d \mid d'$: for example $\langle 4\rangle \subseteq \langle 2\rangle$ (since $4 = 2\cdot 2$) but $\langle 4\rangle \not\subseteq \langle 3\rangle$. So the containments mirror divisibility among the divisors of $12$. Every element of $\Z_{12}$ generates one of these six subgroups: $\langle k\rangle = \langle\gcd(k, 12)\rangle$, so for instance $\langle 9\rangle = \langle 3\rangle$ and $\langle 10\rangle = \langle 2\rangle$.
:::
:::

::: widget graph
nodes: Z12@0,3; H6@-1,2; H4@1,2; H3@-1,1; H2@1,1; H1@0,0
edges: Z12-H6; Z12-H4; H6-H3; H6-H2; H4-H2; H3-H1; H2-H1
caption: The lattice of subgroups of $\Z_{12}$: $H_d$ is the unique subgroup of order $d$, namely $\langle 12/d\rangle$, and a line joins two subgroups when the lower one is a maximal subgroup of the upper one. The diagram is exactly the divisibility diagram of the divisors of $12$. Drag the nodes to rearrange it.
:::

::: widget cayley
group: Z
n: 12
highlight: 4
mode: table
caption: The Cayley table of $\Z_{12}$ with the subgroup $\langle 4\rangle = \set{0, 4, 8}$ highlighted (its translates $\set{1,5,9}$, $\set{2,6,10}$, $\set{3,7,11}$ — the cosets of [[abstract-algebra/lagrange]] — are coloured too). Sums of two elements of $\langle 4 \rangle$ always land back in $\langle 4\rangle$: the subgroup is closed. Its elements $4$ and $8$ have order $12/\gcd(12,4) = 3$, matching $\abs{\langle 4\rangle} = 3$.
:::

Counting the elements of each order in a cyclic group gives a pretty identity.

::: corollary Elements of each order {#cor-phi-count}
Let $G$ be cyclic of order $n$ and $d \mid n$. Then $G$ has exactly $\varphi(d)$ elements of order $d$. Consequently

$$
\sum_{d \mid n} \varphi(d) = n .
$$ {#eq-phi-sum}
:::

::: proof
An element of order $d$ generates a subgroup of order $d$, and by [[#thm-cyclic-subgroups]] there is only one, $H = \langle a^{n/d}\rangle$, which is cyclic of order $d$. So the elements of order $d$ are exactly the generators of $H$, and there are $\varphi(d)$ of them by [[#thm-order-of-power]]. Every element of $G$ has order dividing $n$ (by [[#thm-order-of-power]], $\ord(a^k) = n/\gcd(n,k)$), so counting the elements of $G$ according to their orders gives $n = \sum_{d\mid n}\varphi(d)$.
:::

For $n = 12$: $\varphi(1) + \varphi(2) + \varphi(3) + \varphi(4) + \varphi(6) + \varphi(12) = 1 + 1 + 2 + 2 + 2 + 4 = 12$. A purely number-theoretic proof of [[#eq-phi-sum]] is given in [[number-theory/fermat-euler]]; it is the key to the existence of primitive roots in [[number-theory/primitive-roots]].

::: quiz
How many subgroups does $\Z_{30}$ have?
- [ ] $4$
- [ ] $6$
- [x] $8$
- [ ] $30$
::: solution
By the fundamental theorem there is exactly one subgroup for each positive divisor of $30$. The divisors are $1, 2, 3, 5, 6, 10, 15, 30$, so there are $8$ subgroups.
:::
:::

## Direct products of cyclic groups

In [[abstract-algebra/groups]] we saw that $\Z_2 \times \Z_3 \cong \Z_6$ but $\Z_2 \times \Z_2 \cong V_4 \not\cong \Z_4$. Orders of elements explain the difference.

::: lemma Orders in a direct product {#lem-product-order}
If $g \in G$ and $h \in H$ have finite orders, then $\ord\bigl((g, h)\bigr) = \lcm\bigl(\ord(g), \ord(h)\bigr)$ in $G \times H$.
:::

::: proof
$(g, h)^k = (g^k, h^k)$ is the identity if and only if $g^k = e$ and $h^k = e$, that is (by [[#thm-order-divides]]) if and only if $k$ is a common multiple of $\ord(g)$ and $\ord(h)$. The least positive such $k$ is the least common multiple.
:::

::: theorem When a product of cyclic groups is cyclic {#thm-cyclic-product}
$\Z_m \times \Z_n$ is cyclic if and only if $\gcd(m, n) = 1$, in which case $\Z_m \times \Z_n \cong \Z_{mn}$.
:::

::: proof
The group has order $mn$. If $\gcd(m, n) = 1$ then $\lcm(m, n) = mn$, so by [[#lem-product-order]] the element $(1, 1)$ has order $mn$ and generates the group; by [[#thm-cyclic-classification]] it is isomorphic to $\Z_{mn}$. If $\gcd(m, n) = d > 1$, then for every $(x, y)$, $\ord(x)$ divides $m$ and $\ord(y)$ divides $n$, so $\ord(x, y)$ divides $\lcm(m, n) = mn/d < mn$ ([[number-theory/divisibility#thm-gcd-lcm]]). No element has order $mn$, so the group is not cyclic.
:::

::: example Which products are cyclic? {#ex-products}
Decide whether $\Z_3 \times \Z_4$ and $\Z_2 \times \Z_4$ are cyclic.
::: solution
$\gcd(3, 4) = 1$, so $\Z_3 \times \Z_4 \cong \Z_{12}$, generated by $(1, 1)$: its multiples $(k \bmod 3, k \bmod 4)$ for $k = 0, \dots, 11$ are all different. On the other hand $\gcd(2, 4) = 2$, and every element of $\Z_2 \times \Z_4$ has order dividing $\lcm(2, 4) = 4$, so the group of order $8$ is not cyclic. The statement "$(k \bmod 3, k \bmod 4)$ determines $k \bmod 12$" is an instance of the Chinese remainder theorem ([[number-theory/congruences]]).
:::
:::

::: remark Beyond cyclic groups
Every finite abelian group turns out to be isomorphic to a direct product of cyclic groups $\Z_{n_1} \times \dots \times \Z_{n_k}$ (the **fundamental theorem of finite abelian groups**; see Gallian, Chapter 11, or Dummit & Foote, §5.2). For example $U(15) \cong \Z_2 \times \Z_4$: compare the orders found in [[#ex-orders-u15]] with those in $\Z_2 \times \Z_4$, which has one element of order $1$, three of order $2$ and four of order $4$.
:::

::: history
Long before groups were defined, cyclic groups were at the heart of Carl Friedrich Gauss's *Disquisitiones Arithmeticae* (1801). Gauss proved that the non-zero residues modulo a prime $p$ are all powers of a single "primitive root" — in our language, that $U(p)$ is cyclic — and used the subgroups of this cyclic group to study the equation $x^p = 1$. In 1796, aged eighteen, he had used exactly this idea for $p = 17$: since $U(17)$ is cyclic of order $16 = 2^4$, it has a chain of subgroups of orders $16, 8, 4, 2, 1$, each of index $2$ in the one before, and this allowed him to solve $x^{17} = 1$ by a succession of quadratic equations, proving that the regular $17$-gon can be constructed with ruler and compass.
:::

## Where this leads

Subgroups of a general finite group are far less tidy than those of a cyclic group, but one constraint survives: in [[abstract-algebra/lagrange]] we prove that the order of *every* subgroup of a finite group divides the order of the group. The converse half of [[#thm-cyclic-subgroups]] — a subgroup for every divisor — fails in general, and the Sylow theorems of [[abstract-algebra/group-actions]] describe how much of it survives. The question of which groups $U(n)$ are cyclic is answered in [[number-theory/primitive-roots]], and Gauss's $17$-gon argument is the prototype of the correspondence between subgroups and intermediate fields studied in [[abstract-algebra/fields-galois]].

::: summary
- A non-empty subset $H$ is a subgroup if and only if $ab^{-1} \in H$ for all $a, b \in H$ ([[#thm-subgroup-test]]); for finite $H$, closure alone suffices.
- Intersections of subgroups are subgroups; unions usually are not. The centre $Z(G)$ and centralisers $C_G(a)$ are subgroups.
- $\ord(a)$ is the least $n \ge 1$ with $a^n = e$; then $a^k = e \iff n \mid k$, and $\abs{\langle a \rangle} = \ord(a)$ ([[#thm-order-divides]]).
- A cyclic group is isomorphic to $\Z$ or to $\Z_n$; if $\ord(a) = n$ then $\ord(a^k) = n/\gcd(n,k)$, so there are $\varphi(n)$ generators.
- Subgroups of cyclic groups are cyclic, and a cyclic group of order $n$ has exactly one subgroup of each order $d \mid n$, namely $\langle a^{n/d}\rangle$ ([[#thm-cyclic-subgroups]]).
- A cyclic group of order $n$ has $\varphi(d)$ elements of order $d$ for each $d \mid n$, whence $\sum_{d\mid n}\varphi(d) = n$.
- $\ord(g, h) = \lcm(\ord g, \ord h)$, and $\Z_m \times \Z_n$ is cyclic exactly when $\gcd(m, n) = 1$.
:::

## Exercises

::: exercise An order in Z₃₀ {level=1 check="10"}
Find the order of $27$ in $\Z_{30}$, and list the elements of $\langle 27\rangle$.
::: solution
$\gcd(30, 27) = 3$, so $\ord(27) = 30/3 = 10$, and $\langle 27\rangle = \langle 3\rangle = \set{0, 3, 6, \dots, 27}$, the ten multiples of $3$.
:::
:::

::: exercise Counting generators {level=1 check="8"}
How many generators does $\Z_{20}$ have? List them.
::: solution
The generators are the $k \in \set{1, \dots, 19}$ with $\gcd(k, 20) = 1$: $1, 3, 7, 9, 11, 13, 17, 19$. There are $\varphi(20) = 8$ of them.
:::
:::

::: exercise A cyclic subgroup of U(13) {level=1 check="3"}
Find the order of $3$ in $U(13)$ and list $\langle 3\rangle$.
::: solution
$3^1 = 3$, $3^2 = 9$, $3^3 = 27 = 2\cdot 13 + 1 \equiv 1$. So $\ord(3) = 3$ and $\langle 3\rangle = \set{1, 3, 9}$.
:::
:::

::: exercise Is U(14) cyclic? {level=2}
List the elements of $U(14)$, find their orders, and decide whether $U(14)$ is cyclic.
::: solution
$U(14) = \set{1, 3, 5, 9, 11, 13}$, of order $6$. The powers of $3$ modulo $14$ are $3, 9, 27 \equiv 13, 39 \equiv 11, 33 \equiv 5, 15 \equiv 1$, so $\ord(3) = 6$ and $U(14) = \langle 3\rangle$ is cyclic, isomorphic to $\Z_6$. By [[#thm-order-of-power]], the orders are $\ord(3^k) = 6/\gcd(6,k)$: $\ord(1) = 1$, $\ord(3) = \ord(5) = 6$ ($5 = 3^5$), $\ord(9) = \ord(11) = 3$ ($9 = 3^2$, $11 = 3^4$) and $\ord(13) = 2$ ($13 = 3^3$).
:::
:::

::: exercise Subgroups of Z₁₈ {level=2 check="6"}
How many subgroups does $\Z_{18}$ have? List each one by a generator, and say which subgroups contain $\langle 6\rangle$.
::: solution
One subgroup for each divisor of $18$: $1, 2, 3, 6, 9, 18$, so there are $6$ subgroups, namely $\langle 0\rangle$, $\langle 9\rangle$ (order $2$), $\langle 6\rangle$ (order $3$), $\langle 3\rangle$ (order $6$), $\langle 2\rangle$ (order $9$) and $\Z_{18} = \langle 1\rangle$. The subgroup $\langle 6\rangle$ has order $3$, and the subgroup of order $d'$ contains it exactly when $3 \mid d'$: so $\langle 6\rangle$, $\langle 3\rangle$, $\langle 2\rangle$ and $\Z_{18}$.
:::
:::

::: exercise Unions of subgroups {level=2}
Let $H$ and $K$ be subgroups of $G$. Prove that $H \cup K$ is a subgroup if and only if $H \subseteq K$ or $K \subseteq H$.
::: solution
If one contains the other, the union is the larger one, a subgroup. Conversely suppose neither contains the other: pick $h \in H \setminus K$ and $k \in K \setminus H$. If $H \cup K$ were a subgroup then $hk \in H \cup K$. If $hk \in H$ then $k = h^{-1}(hk) \in H$, a contradiction; if $hk \in K$ then $h = (hk)k^{-1} \in K$, also a contradiction. So $H \cup K$ is not a subgroup.
:::
:::

::: exercise Elements of finite order {level=2}
Let $G$ be an abelian group. Prove that $T = \set{g \in G : \ord(g) < \infty}$ is a subgroup of $G$. Use the matrices $A, B$ from the warning on orders of products to show that this can fail for non-abelian groups.
::: solution
$e \in T$. If $a, b \in T$ with $a^m = e$ and $b^n = e$, then since $G$ is abelian,

$$
(ab^{-1})^{mn} = a^{mn}(b^{-1})^{mn} = (a^m)^n (b^n)^{-m} = e,
$$

so $ab^{-1}$ has finite order and $T \le G$ by the one-step test. In $\mathrm{GL}_2(\R)$, the matrices $A$ and $B$ have order $2$, so they lie in the set of elements of finite order, but $AB$ has infinite order; so that set is not closed under multiplication.
:::
:::

::: exercise The rationals are not cyclic {level=3}
Prove that $(\Q, +)$ is not cyclic.
::: solution
Suppose $\Q = \langle x\rangle$ for some $x \in \Q$. Then $x \neq 0$ (as $\Q \neq \set{0}$), and every rational is an integer multiple $kx$. But $x/2 \in \Q$, and $x/2 = kx$ would give $k = 1/2 \notin \Z$. This contradiction shows $\Q$ is not cyclic.
:::
:::

::: exercise Groups without proper subgroups {level=3}
Let $G \neq \set{e}$ be a group whose only subgroups are $\set{e}$ and $G$. Prove that $G$ is cyclic of prime order.
::: hint
Take $a \neq e$ and consider $\langle a\rangle$. Then rule out infinite order and composite order.
:::
::: solution
Choose $a \neq e$. Then $\langle a \rangle \ne \set{e}$ is a subgroup, so $\langle a\rangle = G$ and $G$ is cyclic. If $G$ were infinite, it would be isomorphic to $\Z$ by [[#thm-cyclic-classification]], and $\Z$ has the proper non-trivial subgroup $2\Z$, so $G$ would have one too. Hence $G$ is finite, of order $n \ge 2$. If $n$ were composite, $n = de$ with $1 < d < n$, then by [[#thm-cyclic-subgroups]] $G$ would have a subgroup of order $d$, which is neither $\set{e}$ nor $G$. So $n$ is prime.
:::
:::

::: exercise A criterion for being cyclic {level=3}
Let $G$ be a finite group of order $n$ such that, for each divisor $d$ of $n$, the equation $x^d = e$ has at most $d$ solutions in $G$. Prove that $G$ is cyclic. (You may use the fact, proved in [[abstract-algebra/lagrange]], that the order of every element of $G$ divides $n$.)
::: hint
Let $\psi(d)$ be the number of elements of order $d$. Show that $\psi(d) \le \varphi(d)$ by looking at the subgroup generated by one element of order $d$, then compare $\sum_d \psi(d)$ with [[#eq-phi-sum]].
:::
::: solution
For $d \mid n$ let $\psi(d)$ be the number of elements of $G$ of order $d$. By Lagrange's theorem ([[abstract-algebra/lagrange#cor-element-order]]) the order of every element divides $n$, so $\sum_{d \mid n}\psi(d) = n$. Suppose $\psi(d) \geq 1$ and let $a$ have order $d$. The $d$ distinct elements of $\langle a\rangle$ all satisfy $x^d = e$, so by hypothesis they are *all* the solutions of $x^d = e$. Any element of order $d$ satisfies $x^d = e$, so it lies in $\langle a\rangle$ and is a generator of this cyclic group of order $d$; hence $\psi(d) \le \varphi(d)$. So in all cases $\psi(d) \le \varphi(d)$. Counting elements by order,

$$
n = \sum_{d \mid n}\psi(d) \le \sum_{d\mid n}\varphi(d) = n,
$$

so equality holds throughout, and in particular $\psi(n) = \varphi(n) \ge 1$. An element of order $n$ generates $G$, so $G$ is cyclic. (This argument is used in [[number-theory/primitive-roots]] to prove that $U(p)$ is cyclic, and in [[abstract-algebra/fields-galois]] to prove that the multiplicative group of a finite field is cyclic.)
:::
:::
