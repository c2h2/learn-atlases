A group has one operation. The integers have two, addition and multiplication, tied together by the distributive law $a(b + c) = ab + ac$. So do the rationals, the real numbers, polynomials, matrices and the integers modulo $n$. A **ring** is a set with two such operations, and ring theory asks which familiar facts about arithmetic survive in this generality. Some do not: in $\Z_6$ we have $2 \cdot 3 = 0$ although neither factor is $0$, and in the ring $\Z[\sqrt{-5}]$ the number $6$ factors into "primes" in two genuinely different ways.

The second half of the chapter develops, for rings, the machinery that normal subgroups and quotient groups provided for groups. The role of normal subgroups is played by **ideals**, and quotient rings let us *build* new number systems: $\Z_n$ from $\Z$, the complex numbers from real polynomials, and (in the next two chapters) every finite field. We will find exactly when a quotient ring is a field — the key to all the constructions of field theory.

## Rings

::: definition Ring {#def-ring}
A **ring** is a set $R$ with two binary operations, addition $(a, b) \mapsto a + b$ and multiplication $(a, b) \mapsto ab$, such that:

1. $(R, +)$ is an abelian group, with identity $0$ and inverses $-a$;
2. multiplication is associative, and there is an element $1 \in R$ with $1a = a1 = a$ for all $a$;
3. the **distributive laws** hold: $a(b + c) = ab + ac$ and $(a + b)c = ac + bc$ for all $a, b, c$.

The ring is **commutative** if $ab = ba$ for all $a, b$.
:::

::: remark Conventions
In this course every ring has a multiplicative identity $1$. Some books allow rings without $1$; in that convention $2\Z$ (the even integers) is a ring, while for us it is not. From the section on ideals onwards, rings are assumed commutative unless we say otherwise.
:::

**Examples.**

- $\Z$, $\Q$, $\R$, $\C$ with the usual operations are commutative rings.
- $\Z_n$ with addition and multiplication modulo $n$ is a commutative ring with $n$ elements. (The axioms follow from those of $\Z$, as for the groups $\Z_n$ in [[abstract-algebra/groups]].)
- The **Gaussian integers** $\Z[i] = \set{a + bi : a, b \in \Z} \subseteq \C$, and similarly $\Z[\sqrt 2] = \set{a + b\sqrt2}$ and $\Z[\sqrt{-5}] = \set{a + b\sqrt{-5}}$, are commutative rings: they are closed under addition and multiplication, for example $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$.
- The **polynomial ring** $R[x]$ over a commutative ring $R$, studied in detail in [[abstract-algebra/polynomials]].
- The **matrix ring** $M_n(\R)$ of $n\times n$ real matrices: a ring, non-commutative for $n \ge 2$.
- The functions $\R \to \R$ (or the continuous ones) with pointwise addition and multiplication.
- The **direct product** $R \times S$ with componentwise operations, with identity $(1, 1)$.
- The **zero ring** $\set{0}$, in which $1 = 0$.
- Hamilton's **quaternions** $\mathbb{H} = \set{a + bi + cj + dk : a, b, c, d \in \R}$, with $i^2 = j^2 = k^2 = ijk = -1$: a non-commutative ring in which every non-zero element has an inverse.

::: proposition Arithmetic in a ring {#prop-ring-basics}
In any ring $R$, for all $a, b \in R$:

1. $0a = a0 = 0$;
2. $(-a)b = a(-b) = -(ab)$ and $(-a)(-b) = ab$; in particular $(-1)a = -a$;
3. if $1 = 0$, then $R = \set{0}$.
:::

::: proof
1. $0a = (0 + 0)a = 0a + 0a$; adding $-(0a)$ to both sides gives $0 = 0a$. Similarly $a0 = 0$.

2. $ab + (-a)b = (a + (-a))b = 0b = 0$, so $(-a)b$ is the additive inverse of $ab$. Similarly $a(-b) = -(ab)$. Then $(-a)(-b) = -(a(-b)) = -(-(ab)) = ab$.

3. If $1 = 0$ then $a = 1a = 0a = 0$ for every $a$.
:::

So "minus times minus is plus" is not a convention but a consequence of the distributive law. Part 3 explains why fields and domains below are required to have $1 \neq 0$.

## Units, zero-divisors, domains and fields

::: definition Units and zero-divisors {#def-units}
An element $u$ of a ring $R$ is a **unit** if it has a multiplicative inverse: $uv = vu = 1$ for some $v \in R$. The units form a group $R^\times$ under multiplication. A non-zero element $a$ of a commutative ring is a **zero-divisor** if $ab = 0$ for some $b \neq 0$.
:::

For example $\Z^\times = \set{\pm1}$, $\Z_n^\times = U(n)$, $M_n(\R)^\times = \mathrm{GL}_n(\R)$ and $\Z[i]^\times = \set{\pm1, \pm i}$ ([[#exr-7-4]]). In $\Z_6$, $2$ and $3$ are zero-divisors; in $\Z \times \Z$, $(1, 0)(0, 1) = (0, 0)$; and among functions, two non-zero functions with disjoint supports multiply to $0$. A unit is never a zero-divisor: if $u$ is a unit and $ub = 0$, then $b = u^{-1}ub = 0$.

::: example Infinitely many units {#ex-units-z-sqrt2}
Show that $1 + \sqrt2$ is a unit of $\Z[\sqrt 2]$, and that $\Z[\sqrt2]$ has infinitely many units.
::: solution
$(1 + \sqrt 2)(-1 + \sqrt2) = -1 + \sqrt 2 - \sqrt 2 + 2 = 1$, so $1 + \sqrt2$ is a unit with inverse $-1 + \sqrt 2$, which lies in $\Z[\sqrt2]$. The units form a group, so every power $(1 + \sqrt2)^n$, $n \in \Z$, is a unit. These powers are all different, because $1 + \sqrt 2 \approx 2.414 > 1$, so $(1+\sqrt2)^n$ is strictly increasing in $n$. For instance $(1 + \sqrt2)^2 = 3 + 2\sqrt2$, with inverse $3 - 2\sqrt 2$. So, unlike $\Z$ and $\Z[i]$, the ring $\Z[\sqrt2]$ has infinitely many units — they are related to solutions of Pell's equation $x^2 - 2y^2 = \pm1$ ([[number-theory/diophantine]]).
:::
:::

::: definition Integral domain {#def-integral-domain}
An **integral domain** is a commutative ring with $1 \neq 0$ and no zero-divisors: $ab = 0$ implies $a = 0$ or $b = 0$.
:::

The point of the definition is **cancellation**: in an integral domain, if $a \neq 0$ and $ab = ac$, then $a(b - c) = 0$ forces $b = c$. In $\Z_6$, by contrast, $2 \cdot 1 = 2 \cdot 4$ but $1 \ne 4$.

::: definition Field {#def-field}
A **field** is a commutative ring with $1 \neq 0$ in which every non-zero element is a unit. A non-commutative ring with $1 \neq 0$ in which every non-zero element is a unit is a **division ring** (such as $\mathbb H$).
:::

$\Q$, $\R$ and $\C$ are fields; $\Z$ and $\Z[i]$ are integral domains but not fields. Every field is an integral domain, since units are not zero-divisors.

::: theorem When is Zₙ a field? {#thm-zn-field}
For $n \ge 2$, the following are equivalent: (a) $\Z_n$ is a field; (b) $\Z_n$ is an integral domain; (c) $n$ is prime.
:::

::: proof
(a) ⇒ (b) because fields are domains. (b) ⇒ (c): if $n = ab$ with $1 < a, b < n$, then $a \cdot b = 0$ in $\Z_n$ with $a, b \neq 0$, so $\Z_n$ has zero-divisors. (c) ⇒ (a): if $n = p$ is prime and $1 \le a \le p - 1$, then $\gcd(a, p) = 1$, so $a \in U(p)$ has an inverse ([[abstract-algebra/groups#thm-un-group]]).
:::

When $p$ is prime we often write $\F_p$ for the field $\Z_p$. In $\F_p$ we can divide by any non-zero element, so linear equations $ax = b$ with $a \neq 0$ have exactly one solution, $x = a^{-1}b$, just as over $\Q$.

::: widget modular
n: 11
mode: inverses
caption: Inverses in the field $\F_{11} = \Z_{11}$: every non-zero residue $a$ has a partner $a^{-1}$ with $aa^{-1} \equiv 1 \pmod{11}$, for example $2 \cdot 6 = 12 \equiv 1$ and $3 \cdot 4 = 12 \equiv 1$. Only $1$ and $10 \equiv -1$ are their own inverses. Compare $\Z_{12}$ below, where only the four units have inverses.
:::

The next theorem gives a second proof that $\F_p$ is a field, using only finiteness.

::: theorem Finite integral domains are fields {#thm-finite-domain}
Every finite integral domain is a field.
:::

::: proof
Let $D$ be a finite integral domain and $a \neq 0$. The map $x \mapsto ax$ from $D$ to $D$ is injective, by cancellation. An injective map from a finite set to itself is surjective, so $ax = 1$ for some $x$, and $a$ is a unit.
:::

::: widget modular
n: 12
mode: multiply
caption: The multiplication table of $\Z_{12}$. The rows of the units $1, 5, 7, 11$ contain every residue exactly once, so these elements can be "divided by". Every other non-zero row contains $0$ somewhere — for example $3 \cdot 4 = 0$ and $6 \cdot 2 = 0$ — so $2, 3, 4, 6, 8, 9, 10$ are zero-divisors. In a finite commutative ring every non-zero element is one or the other.
:::

::: definition Characteristic {#def-characteristic}
The **characteristic** of a ring $R$, written $\operatorname{char} R$, is the least $n \ge 1$ such that $n\cdot 1 = 1 + 1 + \dots + 1$ ($n$ terms) equals $0$; if there is no such $n$, the characteristic is $0$.
:::

So $\operatorname{char}\Z_n = n$, and $\Q$, $\R$, $\C$, $\Z$ have characteristic $0$. In characteristic $n$, also $n\cdot a = (n\cdot 1)a = 0$ for every $a$.

::: proposition The characteristic of a domain {#prop-char-domain}
The characteristic of an integral domain is $0$ or a prime.
:::

::: proof
Suppose $\operatorname{char} D = n \ge 1$; since $1 \neq 0$, $n \ge 2$. If $n = ab$ with $1 < a, b < n$, then $(a\cdot1)(b\cdot 1) = n\cdot 1 = 0$, so $a\cdot 1 = 0$ or $b\cdot1 = 0$ because $D$ has no zero-divisors — contradicting the minimality of $n$. So $n$ is prime.
:::

::: quiz
Which of the following rings are integral domains? (Select all that apply.)
- [x] $\Z_7$
- [ ] $\Z_8$
- [x] $\Z[i]$
- [ ] $\Z \times \Z$
- [ ] $M_2(\R)$
::: solution
$\Z_7$ is a field ($7$ is prime), and $\Z[i] \subseteq \C$ inherits the absence of zero-divisors from $\C$. In $\Z_8$, $2\cdot 4 = 0$; in $\Z\times\Z$, $(1,0)(0,1) = (0,0)$; and $M_2(\R)$ is not commutative (and has zero-divisors, such as $\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)^2 = 0$).
:::
:::

A **subring** of $R$ is a subset containing $1$ that is closed under subtraction and multiplication; it is then a ring with the same operations. For example $\Z \subseteq \Z[i] \subseteq \C$ are subrings, but $2\Z$ is not a subring of $\Z$ because $1 \notin 2\Z$.

## Ring homomorphisms

::: definition Ring homomorphism {#def-ring-hom}
A **ring homomorphism** is a map $\varphi\colon R \to S$ between rings such that, for all $a, b \in R$,

$$
\varphi(a + b) = \varphi(a) + \varphi(b), \qquad \varphi(ab) = \varphi(a)\varphi(b), \qquad \varphi(1) = 1 .
$$

Its **kernel** is $\ker\varphi = \set{a \in R : \varphi(a) = 0}$. A bijective ring homomorphism is an **isomorphism**.
:::

A ring homomorphism is in particular a homomorphism of additive groups, so $\varphi(0) = 0$, $\varphi(-a) = -\varphi(a)$, and $\varphi$ is injective if and only if $\ker\varphi = \set{0}$ ([[abstract-algebra/homomorphisms#thm-kernel-fibres]]). It sends units to units, since $\varphi(u)\varphi(u^{-1}) = \varphi(1) = 1$.

**Examples.**

1. Reduction modulo $n$, $\Z \to \Z_n$, with kernel $n\Z$.
2. **Evaluation**: for $c \in \R$, $\operatorname{ev}_c\colon \R[x] \to \R$, $f \mapsto f(c)$. Its kernel consists of the polynomials with $c$ as a root.
3. Complex conjugation $\C \to \C$, $z \mapsto \bar z$, an isomorphism of $\C$ with itself.
4. The map $\varphi\colon \Z[i] \to \Z_5$, $\varphi(a + bi) = (a + 3b) \bmod 5$. Since $3^2 = 9 \equiv -1 \pmod 5$, the element $3 \in \Z_5$ behaves like $i$, and indeed

$$
\varphi\bigl((a+bi)(c+di)\bigr) = ac - bd + 3(ad + bc) \equiv (a + 3b)(c + 3d) \pmod 5,
$$

because the right side expands to $ac + 3ad + 3bc + 9bd$ and $9 \equiv -1$.
5. Non-examples: $n \mapsto 2n$ on $\Z$ preserves addition but not multiplication; $n \mapsto (n, 0)$ from $\Z$ to $\Z\times\Z$ preserves both operations but sends $1$ to $(1, 0)$, which is not the identity of $\Z\times\Z$.

Kernels of ring homomorphisms have a property beyond being additive subgroups: if $\varphi(a) = 0$ then $\varphi(ra) = \varphi(r)\cdot 0 = 0$ for **every** $r \in R$. A kernel absorbs multiplication by arbitrary elements. This is the defining property of an ideal.

## Ideals

::: definition Ideal {#def-ideal}
An **ideal** of a commutative ring $R$ is an additive subgroup $I \subseteq R$ such that $ra \in I$ for all $r \in R$ and $a \in I$. (For non-commutative rings one asks for $ra \in I$ and $ar \in I$, a two-sided ideal.)
:::

To check that $I$ is an ideal: $0 \in I$, $a - b \in I$ for $a, b \in I$, and $ra \in I$ for $r \in R$, $a \in I$.

**Examples.**

- $\set{0}$ and $R$ are ideals of $R$; an ideal different from $R$ is **proper**.
- Every kernel of a ring homomorphism is an ideal.
- For $a \in R$, the **principal ideal** generated by $a$ is $(a) = Ra = \set{ra : r \in R}$. More generally $(a_1, \dots, a_k) = \set{r_1a_1 + \dots + r_ka_k : r_i \in R}$ is the smallest ideal containing $a_1, \dots, a_k$.
- In $\Z$, $(n) = n\Z$. In $\R[x]$, $(x - c)$ is the set of polynomials vanishing at $c$ (by the factor theorem, [[abstract-algebra/polynomials#thm-factor]]).
- In $\Z[x]$, $(2, x)$ is the set of polynomials with even constant term.

An ideal containing a unit $u$ contains $u^{-1}u = 1$ and hence $r\cdot 1 = r$ for every $r$: it is the whole ring. Consequently a **field has only the two ideals** $\set{0}$ and $F$. Conversely a commutative ring whose only ideals are $\set{0}$ and $R$ (with $1 \neq 0$) is a field ([[#exr-7-5]]).

::: proposition The ideals of ℤ {#prop-ideals-z}
Every ideal of $\Z$ is principal: it equals $n\Z$ for a unique $n \ge 0$.
:::

::: proof
An ideal is in particular a subgroup of $(\Z, +)$, and these are exactly the $n\Z$ with $n \ge 0$ ([[abstract-algebra/subgroups#cor-subgroups-z]]). Conversely each $n\Z$ is an ideal.
:::

An integral domain in which every ideal is principal is a **principal ideal domain** (PID). So $\Z$ is a PID, and the same argument with the division algorithm shows that $F[x]$ is a PID for every field $F$ ([[abstract-algebra/polynomials#thm-fx-pid]]). For instance the ideal $(4, 6)$ of $\Z$ is principal: by Bézout's identity it is $(2)$. But not every domain is a PID.

::: example A non-principal ideal {#ex-non-principal}
Show that the ideal $I = (2, x)$ of $\Z[x]$ is not principal.
::: solution
Suppose $I = (f)$. Since $2 \in I$, $2 = fg$ for some $g \in \Z[x]$. Degrees add when integer polynomials are multiplied, so $\deg f = 0$ and $f$ is a constant dividing $2$: $f \in \set{\pm1, \pm2}$. If $f = \pm 1$, then $I = \Z[x]$ and $1 \in I$; but every element $2a(x) + xb(x)$ of $I$ has even constant term, so $1 \notin I$. If $f = \pm 2$, then $x \in (2)$, so $x = 2h(x)$, which is impossible since the coefficient of $x$ would be even. So $I$ is not principal, and $\Z[x]$ is not a PID.
:::
:::

## Quotient rings

Ideals are exactly what is needed to build quotient rings, in the same way that normal subgroups are what is needed for quotient groups.

::: theorem Quotient rings {#thm-quotient-ring}
Let $I$ be an ideal of a commutative ring $R$. On the set $R/I = \set{a + I : a \in R}$ of additive cosets, the operations

$$
(a + I) + (b + I) = (a + b) + I, \qquad (a + I)(b + I) = ab + I
$$

are well defined and make $R/I$ a commutative ring with zero $0 + I = I$ and identity $1 + I$. The natural map $\pi\colon R \to R/I$, $a \mapsto a + I$, is a surjective ring homomorphism with kernel $I$.
:::

::: proof
$I$ is a normal subgroup of the abelian group $(R, +)$, so the addition is well defined and makes $R/I$ an abelian group ([[abstract-algebra/homomorphisms#thm-quotient-group]]). For multiplication, suppose $a' + I = a + I$ and $b' + I = b + I$, so $a' = a + i$ and $b' = b + j$ with $i, j \in I$. Then

$$
a'b' = ab + aj + ib + ij,
$$

and $aj$, $ib$ and $ij$ all lie in $I$ because $I$ absorbs multiplication by elements of $R$. So $a'b' + I = ab + I$. The ring axioms for $R/I$ follow from those of $R$ by computing with representatives, for example $(a + I)\bigl((b + I) + (c + I)\bigr) = a(b + c) + I = (ab + ac) + I$. Finally $\pi$ preserves both operations by definition, $\pi(1) = 1 + I$, and $\pi(a) = 0 + I$ if and only if $a \in I$.
:::

Computing in $R/I$ means computing in $R$ while treating elements of $I$ as zero. In $\Z/n\Z$ we compute with integers and set multiples of $n$ to zero, which gives $\Z_n$. In $\R[x]/(x^2 + 1)$ we compute with polynomials and set $x^2 + 1$ to zero, that is, we replace $x^2$ by $-1$ wherever it occurs: so $(a + bx)(c + dx) = ac + (ad + bc)x + bdx^2 \equiv (ac - bd) + (ad + bc)x$. This is exactly complex multiplication, with $x$ playing the role of $i$ — which the next theorem turns into a proof.

::: warning What is zero in R/I?
In $R/I$ the zero element is the coset $I$ itself, and $a + I = 0$ means $a \in I$, not $a = 0$. Likewise $a + I = b + I$ means $a - b \in I$. Students sometimes "simplify" $R/I$ by throwing away the elements of $I$ from $R$; but $R/I$ is not a subset of $R$, and its elements are cosets.
:::

## The first isomorphism theorem for rings

::: theorem First isomorphism theorem for rings {#thm-first-iso-rings}
Let $\varphi\colon R \to S$ be a homomorphism of commutative rings. Then $\ker\varphi$ is an ideal of $R$, $\Img\varphi$ is a subring of $S$, and

$$
R/\ker\varphi \cong \Img\varphi, \qquad a + \ker\varphi \mapsto \varphi(a).
$$
:::

::: proof
Let $K = \ker\varphi$. It is an additive subgroup, and $\varphi(rk) = \varphi(r)\varphi(k) = 0$ for $k \in K$, so $K$ is an ideal. The image contains $\varphi(1) = 1$ and is closed under subtraction and multiplication, so it is a subring. By the first isomorphism theorem for groups applied to $(R, +)$, the map $\bar\varphi(a + K) = \varphi(a)$ is a well-defined bijective homomorphism of additive groups $R/K \to \Img\varphi$. It also preserves multiplication and identity:

$$
\bar\varphi\bigl((a + K)(b + K)\bigr) = \bar\varphi(ab + K) = \varphi(ab) = \varphi(a)\varphi(b), \qquad \bar\varphi(1 + K) = \varphi(1) = 1 .
$$

So $\bar\varphi$ is a ring isomorphism.
:::

::: example Three quotient rings identified {#ex-quotients-rings}
Prove that (a) $\R[x]/(x^2 + 1) \cong \C$; (b) $\Z[i]/(2 + i) \cong \Z_5$; (c) $\Z[x]/(x) \cong \Z$ and $\Z[x]/(2, x) \cong \Z_2$.
::: solution
(a) Let $\operatorname{ev}_i\colon \R[x] \to \C$, $f \mapsto f(i)$. It is a ring homomorphism, and it is surjective since $a + bx \mapsto a + bi$. For the kernel: dividing $f$ by $x^2 + 1$ ([[abstract-algebra/polynomials#thm-poly-division]]) gives $f = (x^2 + 1)q + (a + bx)$ with $a, b \in \R$, so $f(i) = a + bi$, which is $0$ exactly when $a = b = 0$, that is when $x^2 + 1$ divides $f$. So $\ker\operatorname{ev}_i = (x^2 + 1)$, and [[#thm-first-iso-rings]] gives $\R[x]/(x^2 + 1) \cong \C$. The complex numbers *are* real polynomials computed modulo $x^2 + 1$.

(b) Use the homomorphism $\varphi(a + bi) = (a + 3b) \bmod 5$ from the previous section. It is surjective ($\varphi(a) = a \bmod 5$). Its kernel contains $2 + i$, since $2 + 3 = 5 \equiv 0$, hence contains the ideal $(2 + i)$. Conversely, suppose $5 \mid a + 3b$, say $a + 3b = 5k$. Using $(2+i)(2-i) = 5$ and $(2 + i)(1 - i) = 3 - i$,

$$
a + bi = (a + 3b) - b(3 - i) = (2 + i)\bigl[(2 - i)k - (1 - i)b\bigr] \in (2 + i).
$$

So $\ker\varphi = (2 + i)$ and $\Z[i]/(2 + i) \cong \Z_5$.

(c) Evaluation at $0$, $f \mapsto f(0)$, maps $\Z[x]$ onto $\Z$ with kernel the polynomials with zero constant term, which is $(x)$. Composing with reduction modulo $2$ gives a surjection $\Z[x] \to \Z_2$, $f \mapsto f(0) \bmod 2$, whose kernel is the set of polynomials with even constant term, $(2, x)$.
:::
:::

## Prime and maximal ideals

Which quotients of $R$ are integral domains, and which are fields? The answers are properties of the ideal.

::: definition Prime ideal {#def-prime-ideal}
A proper ideal $P$ of a commutative ring $R$ is **prime** if $ab \in P$ implies $a \in P$ or $b \in P$.
:::

::: definition Maximal ideal {#def-maximal-ideal}
A proper ideal $M$ of $R$ is **maximal** if there is no ideal $J$ with $M \subsetneq J \subsetneq R$.
:::

In $\Z$, the ideal $n\Z$ ($n \ge 2$) is prime exactly when $n$ is prime — this is Euclid's lemma ([[number-theory/primes#thm-euclid-lemma]]) — and it is maximal exactly when $n$ is prime, because $n\Z \subseteq m\Z$ means $m \mid n$. The zero ideal of $\Z$ is prime (as $\Z$ is a domain) but not maximal.

::: theorem Prime ideals and integral domains {#thm-prime-domain}
A proper ideal $P$ of a commutative ring $R$ is prime if and only if $R/P$ is an integral domain.
:::

::: proof
$R/P$ is commutative with $1 + P \neq 0 + P$ (as $1 \notin P$, $P$ being proper). The product $(a + P)(b + P) = ab + P$ is zero exactly when $ab \in P$, and $a + P$ is zero exactly when $a \in P$. So "$(a + P)(b + P) = 0$ implies $a + P = 0$ or $b + P = 0$" says precisely "$ab \in P$ implies $a \in P$ or $b \in P$".
:::

::: theorem Maximal ideals and fields {#thm-maximal-field}
A proper ideal $M$ of a commutative ring $R$ is maximal if and only if $R/M$ is a field.
:::

::: proof
Suppose $M$ is maximal, and let $a + M \neq 0$, i.e. $a \notin M$. The set $J = M + Ra = \set{m + ra : m \in M, r \in R}$ is an ideal (check: it is closed under subtraction and under multiplication by elements of $R$) containing $M$ and $a$, so $M \subsetneq J$. By maximality $J = R$, so $1 = m + ra$ for some $m \in M$, $r \in R$. Then

$$
(r + M)(a + M) = ra + M = (1 - m) + M = 1 + M,
$$

so $a + M$ is invertible. Also $1 + M \ne 0 + M$ since $M$ is proper. So $R/M$ is a field.

Conversely suppose $R/M$ is a field, and let $J$ be an ideal with $M \subsetneq J$. Pick $a \in J \setminus M$. Then $a + M \neq 0$, so there is $b$ with $(a + M)(b + M) = 1 + M$, i.e. $ab - 1 \in M \subseteq J$. Since $ab \in J$, also $1 = ab - (ab - 1) \in J$, so $J = R$. Hence $M$ is maximal.
:::

::: corollary {#cor-maximal-prime}
Every maximal ideal is prime.
:::

::: proof
If $M$ is maximal, $R/M$ is a field, hence an integral domain, so $M$ is prime by [[#thm-prime-domain]].
:::

These two theorems are the engine of field theory: to build a field, find a maximal ideal and take the quotient. For example $(x^2 + 1)$ is maximal in $\R[x]$ because the quotient is the field $\C$, and $(2 + i)$ is maximal in $\Z[i]$ because the quotient is $\Z_5$. On the other hand, $(x)$ is prime but not maximal in $\Z[x]$, since $\Z[x]/(x) \cong \Z$ is a domain but not a field; indeed $(x) \subsetneq (2, x) \subsetneq \Z[x]$.

::: example Factoring 2 in the Gaussian integers {#ex-gaussian-2}
Show that the ideal $(2)$ of $\Z[i]$ is not prime, and describe $\Z[i]/(2)$.
::: solution
$(1 + i)(1 - i) = 1 - i^2 = 2 \in (2)$. But $1 + i \notin (2)$: the multiples of $2$ in $\Z[i]$ are $2(c + di) = 2c + 2di$, with both coordinates even. Similarly $1 - i \notin (2)$. So $(2)$ is not prime, and $\Z[i]/(2)$ is not a domain. It has four elements, the cosets of $0, 1, i, 1 + i$ (a Gaussian integer modulo $2$ is determined by the parities of its coordinates), and $(1 + i)^2 = 2i \equiv 0$: a non-zero element squares to zero. So $\Z[i]/(2)$ is a ring with $4$ elements that is not a field, unlike $\Z[i]/(2 + i) \cong \Z_5$.
:::
:::

::: quiz
Which of these quotient rings are fields? (Select all that apply.)
- [ ] $\Z[x]/(x)$
- [x] $\Z[x]/(2, x)$
- [ ] $\Z/6\Z$
- [x] $\R[x]/(x^2 + 1)$
::: solution
$\Z[x]/(x) \cong \Z$ is a domain but not a field, and $\Z/6\Z$ has zero-divisors. $\Z[x]/(2, x) \cong \Z_2$ and $\R[x]/(x^2+1) \cong \C$ are fields, so $(2, x)$ and $(x^2+1)$ are maximal ideals.
:::
:::

## The Chinese remainder theorem for rings

Two ideals $I, J$ of a commutative ring are **coprime** if $I + J = R$, where $I + J = \set{a + b : a \in I, b \in J}$; equivalently $a + b = 1$ for some $a \in I$, $b \in J$. In $\Z$, $m\Z + n\Z = \gcd(m,n)\Z$ by Bézout, so $m\Z$ and $n\Z$ are coprime exactly when $\gcd(m, n) = 1$.

::: theorem Chinese remainder theorem {#thm-crt-rings}
Let $I$ and $J$ be coprime ideals of a commutative ring $R$. Then

$$
R/(I \cap J) \cong R/I \times R/J, \qquad r + (I\cap J) \mapsto (r + I,\ r + J).
$$
:::

::: proof
The map $\varphi\colon R \to R/I \times R/J$, $r \mapsto (r + I, r + J)$, is a ring homomorphism (each coordinate is a natural map), and its kernel is $\set{r : r \in I \text{ and } r \in J} = I \cap J$. It remains to show $\varphi$ is surjective; then the first isomorphism theorem gives the result. Write $1 = a + b$ with $a \in I$, $b \in J$. Given any target $(x + I, y + J)$, put $r = xb + ya$. Then

$$
r - x = x(b - 1) + ya = -xa + ya \in I, \qquad r - y = xb + y(a - 1) = xb - yb \in J,
$$

so $\varphi(r) = (x + I, y + J)$.
:::

::: corollary {#cor-crt-zn}
If $\gcd(m, n) = 1$ then $\Z_{mn} \cong \Z_m \times \Z_n$ as rings. Consequently $U(mn) \cong U(m) \times U(n)$ and $\varphi(mn) = \varphi(m)\varphi(n)$.
:::

::: proof
$m\Z \cap n\Z = \lcm(m, n)\Z = mn\Z$ when $\gcd(m,n) = 1$, and the ideals are coprime, so the theorem gives $\Z/mn\Z \cong \Z/m\Z \times \Z/n\Z$. A ring isomorphism restricts to an isomorphism of unit groups, and the units of $R \times S$ are the pairs of units, so $U(mn) \cong U(m) \times U(n)$; comparing orders gives $\varphi(mn) = \varphi(m)\varphi(n)$.
:::

This is the ring-theoretic form of the Chinese remainder theorem of [[number-theory/congruences#thm-crt]]: a residue modulo $mn$ is the same thing as a pair of residues modulo $m$ and modulo $n$, and the correspondence respects both addition and multiplication. The proof above even contains the recipe for solving simultaneous congruences.

::: widget euclid
mode: crt
system: 2 mod 3; 4 mod 5
caption: The isomorphism $\Z_{15} \cong \Z_3 \times \Z_5$ in action: the pair of residues $(2 \bmod 3,\ 4 \bmod 5)$ corresponds to exactly one residue modulo $15$, namely $14$. The method follows the proof of [[#thm-crt-rings]]: write $1 = a + b$ with $a \in 3\Z$, $b \in 5\Z$ (here $1 = 6 - 5$), and combine.
:::

::: application Computing with remainders
Computer algebra systems exploit [[#thm-crt-rings]] to compute with huge integers: a large computation is carried out modulo several primes that fit in a machine word, where arithmetic is fast, and the results are recombined by the Chinese remainder theorem at the end. The same idea, splitting a ring as a product, underlies fast algorithms for multiplying polynomials and the speed-ups used in RSA decryption ([[number-theory/cryptography]]).
:::

::: remark Fields of fractions
Just as $\Q$ is built from $\Z$, every integral domain $D$ sits inside a field, its **field of fractions**: formal quotients $a/b$ with $b \neq 0$, where $a/b = c/d$ means $ad = bc$, added and multiplied by the usual rules. For example the field of fractions of $\Z[i]$ is $\Q(i) = \set{p + qi : p, q \in \Q}$, and that of $F[x]$ is the field $F(x)$ of rational functions. Rings with zero-divisors cannot sit inside any field, since a field has none.
:::

::: history
Ring theory grew out of number theory. In the 1840s Ernst Kummer found that unique factorisation fails in rings of "cyclotomic integers" $\Z[\zeta_p]$ — the gap in Gabriel Lamé's 1847 proof of Fermat's Last Theorem was the unjustified assumption that it holds — and he restored it by introducing "ideal numbers". Richard Dedekind replaced these by ideals in 1871: although elements such as $6 = 2\cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$ factor non-uniquely, ideals in such rings do factor uniquely into prime ideals. David Hilbert introduced the word *Zahlring* (number ring) in his 1897 report on algebraic number theory. Abraham Fraenkel gave the first axiomatic definition of an abstract ring in 1914, and Emmy Noether's paper *Idealtheorie in Ringbereichen* (1921) made ideals the central objects of commutative algebra.
:::

## Where this leads

The next chapter, [[abstract-algebra/polynomials]], studies the most important rings after $\Z$: polynomial rings $F[x]$ over a field. They behave remarkably like the integers — there is a division algorithm, every ideal is principal and factorisation is unique — and quotients $F[x]/(p(x))$ by irreducible polynomials are fields. In [[abstract-algebra/fields-galois]] those fields are used to construct splitting fields and all finite fields. The arithmetic of $\Z/n\Z$ is developed in [[number-theory/congruences]], and the Gaussian integers reappear in the proof of Fermat's two-squares theorem in [[number-theory/diophantine]].

::: summary
- A **ring** has an abelian group $(R, +)$ and an associative multiplication with $1$, linked by the distributive laws; $0a = 0$ and $(-a)(-b) = ab$ follow from the axioms.
- **Units** have inverses; **zero-divisors** multiply to zero with a non-zero partner. An **integral domain** has no zero-divisors (so cancellation holds); a **field** is a commutative ring in which every non-zero element is a unit.
- $\Z_n$ is a field iff it is a domain iff $n$ is prime; finite domains are fields; the characteristic of a domain is $0$ or prime.
- Ring homomorphisms preserve $+$, $\times$ and $1$; their kernels are **ideals** (additive subgroups absorbing multiplication). $\Z$ is a principal ideal domain; $(2, x) \subseteq \Z[x]$ is not principal.
- For an ideal $I$, $R/I$ is a ring, and $R/\ker\varphi \cong \Img\varphi$ (first isomorphism theorem). Examples: $\R[x]/(x^2+1) \cong \C$, $\Z[i]/(2+i) \cong \Z_5$.
- $R/P$ is a domain iff $P$ is prime; $R/M$ is a field iff $M$ is maximal; maximal ideals are prime.
- **CRT**: if $I + J = R$ then $R/(I\cap J) \cong R/I \times R/J$; in particular $\Z_{mn} \cong \Z_m\times\Z_n$ for coprime $m, n$.
:::

## Exercises

::: exercise Units and zero-divisors in Z₁₂ {level=1 check="7"}
List the units and the zero-divisors of $\Z_{12}$. How many zero-divisors are there?
::: solution
The units are the residues coprime to $12$: $1, 5, 7, 11$. Every other non-zero residue $a$ shares a factor $d > 1$ with $12$, and then $a \cdot (12/d) \equiv 0$ with $12/d \not\equiv 0$; so the zero-divisors are $2, 3, 4, 6, 8, 9, 10$ — seven of them.
:::
:::

::: exercise A characteristic {level=1 check="12"}
What is the characteristic of $\Z_4 \times \Z_6$?
::: solution
$n\cdot(1, 1) = (n \bmod 4, n \bmod 6)$ is zero exactly when $4 \mid n$ and $6 \mid n$, i.e. when $12 \mid n$. So the characteristic is $\lcm(4, 6) = 12$. (Note that $\Z_4\times\Z_6$ is not a domain, so the characteristic need not be prime.)
:::
:::

::: exercise Reducing a Gaussian integer {level=1 check="4"}
Under the isomorphism $\Z[i]/(2 + i) \cong \Z_5$ of [[#ex-quotients-rings]], which residue corresponds to the coset of $7 + 4i$?
::: solution
The isomorphism sends $a + bi$ to $(a + 3b) \bmod 5$, so $7 + 4i \mapsto 7 + 12 = 19 \equiv 4$.
:::
:::

::: exercise The units of ℤ[i] {level=2}
Let $N(a + bi) = a^2 + b^2$. Show that $N(zw) = N(z)N(w)$ and deduce that the units of $\Z[i]$ are exactly $\pm1$ and $\pm i$.
::: solution
$N(z) = z\bar z = \abs{z}^2$, so $N(zw) = \abs{zw}^2 = \abs z^2\abs w^2 = N(z)N(w)$. If $u$ is a unit with $uv = 1$, then $N(u)N(v) = N(1) = 1$; both are non-negative integers, so $N(u) = 1$, i.e. $a^2 + b^2 = 1$, giving $u \in \set{\pm1, \pm i}$. Conversely these four are units: $1\cdot1 = (-1)(-1) = i(-i) = 1$.
:::
:::

::: exercise Ideals characterise fields {level=2}
Let $R$ be a commutative ring with $1 \neq 0$. Prove that $R$ is a field if and only if its only ideals are $\set{0}$ and $R$.
::: solution
If $R$ is a field and $I \ne \set{0}$ is an ideal, then $I$ contains a non-zero element, which is a unit, so $I = R$. Conversely suppose the only ideals are $\set{0}$ and $R$, and let $a \neq 0$. The principal ideal $(a)$ contains $a \ne 0$, so $(a) = R$; in particular $1 \in (a)$, i.e. $1 = ra$ for some $r$. So every non-zero element is a unit and $R$ is a field. (Equivalently: $\set{0}$ is a maximal ideal, so $R \cong R/\set{0}$ is a field by [[#thm-maximal-field]].)
:::
:::

::: exercise The ideals of Z₁₂ {level=2 check="6"}
How many ideals does $\Z_{12}$ have? Which of them are maximal?
::: hint
Use the correspondence between ideals of $\Z/12\Z$ and ideals of $\Z$ containing $12\Z$.
:::
::: solution
Every ideal of $\Z_{12}$ is an additive subgroup, hence of the form $\langle d \rangle = (d)$ with $d \mid 12$, and every subgroup $(d)$ is closed under multiplication by ring elements. So the ideals are $(1), (2), (3), (4), (6), (0)$: six of them. Equivalently, they correspond to the ideals $d\Z \supseteq 12\Z$ of $\Z$. The quotient $\Z_{12}/(d) \cong \Z_d$ is a field exactly when $d$ is prime, so the maximal ideals are $(2)$ and $(3)$; these are also the only prime ideals.
:::
:::

::: exercise Idempotents of Z₁₅ {level=2 check="4"}
An element $e$ of a ring is **idempotent** if $e^2 = e$. Use the isomorphism $\Z_{15} \cong \Z_3\times\Z_5$ to find all idempotents of $\Z_{15}$. How many are there?
::: solution
An idempotent of $\Z_3\times\Z_5$ is a pair $(e_1, e_2)$ of idempotents. In a field (or domain), $e^2 = e$ means $e(e - 1) = 0$, so $e \in \set{0, 1}$. That gives $4$ idempotents $(0,0), (1,1), (1,0), (0,1)$. Translating back: $(0,0) \leftrightarrow 0$, $(1,1) \leftrightarrow 1$, $(1, 0) \leftrightarrow 10$ (as $10 \equiv 1 \pmod 3$, $10 \equiv 0 \pmod 5$) and $(0, 1) \leftrightarrow 6$. Check: $6^2 = 36 \equiv 6$ and $10^2 = 100 \equiv 10 \pmod{15}$.
:::
:::

::: exercise Prime ideals of finite rings {level=3}
Prove that in a finite commutative ring every prime ideal is maximal. Give an example of a prime ideal that is not maximal in an infinite ring.
::: solution
If $P$ is prime, $R/P$ is an integral domain by [[#thm-prime-domain]]. It is finite, so it is a field by [[#thm-finite-domain]], and hence $P$ is maximal by [[#thm-maximal-field]]. In the infinite ring $\Z$, the zero ideal is prime ($\Z$ is a domain) but not maximal ($\set{0} \subsetneq 2\Z \subsetneq \Z$); in $\Z[x]$ the ideal $(x)$ is prime but not maximal.
:::
:::

::: exercise Non-unique factorisation {level=3}
In $R = \Z[\sqrt{-5}]$ let $N(a + b\sqrt{-5}) = a^2 + 5b^2$, which is multiplicative. Show that $2$, $3$, $1 + \sqrt{-5}$ and $1 - \sqrt{-5}$ are **irreducible** (not units, and not a product of two non-units), and deduce that $6$ has two essentially different factorisations into irreducibles. Is the ideal $(2)$ prime?
::: hint
A non-unit has norm at least $2$; check that no element has norm $2$ or $3$.
:::
::: solution
The units of $R$ are $\pm1$ (norm $1$ forces $b = 0$, $a = \pm1$). The norms are $N(2) = 4$, $N(3) = 9$ and $N(1 \pm\sqrt{-5}) = 6$. If one of these elements were $xy$ with $x, y$ non-units, then $N(x), N(y) \ge 2$ would multiply to $4$, $9$ or $6$, so some factor would have norm $2$ or $3$. But $a^2 + 5b^2 \in \set{2, 3}$ is impossible: $b \neq 0$ gives at least $5$, and $b = 0$ needs $a^2 \in \set{2, 3}$. So all four are irreducible. Now $6 = 2\cdot3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$, and $2$ is not $\pm(1 \pm \sqrt{-5})$, so the factorisations differ by more than units and order. The ideal $(2)$ is not prime: $(1+\sqrt{-5})(1 - \sqrt{-5}) = 6 \in (2)$, but neither factor is in $(2)$, since multiples of $2$ have both coordinates even. So in $R$ an irreducible element need not generate a prime ideal — precisely the failure that Dedekind's ideals were invented to repair.
:::
:::
