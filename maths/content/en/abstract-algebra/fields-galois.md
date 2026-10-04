Three problems from Greek geometry resisted every attempt for two thousand years: with ruler and compass alone, construct a cube with twice the volume of a given cube; trisect an arbitrary angle; and construct a square with the same area as a given circle. A fourth problem, from Renaissance algebra, was just as stubborn: find a formula for the roots of a polynomial of degree five, built from the coefficients by arithmetic and $n$-th roots, like the quadratic formula. All four were finally settled in the nineteenth century — negatively — and the decisive tools are the ones developed in this chapter.

The first idea is to treat a field $K$ containing a smaller field $F$ as a **vector space** over $F$, and to measure it by its dimension, the **degree** $[K : F]$. Degrees multiply in towers, and this simple fact already disposes of the classical constructions. The second idea, due to Galois, is to study the group of symmetries of a field extension. The **fundamental theorem of Galois theory** turns questions about fields into questions about finite groups, and the simplicity of $A_5$ ([[abstract-algebra/group-actions#thm-a5-simple]]) then shows that some quintic equations cannot be solved by radicals. Along the way we classify all finite fields.

Throughout, fields of characteristic $0$ (such as subfields of $\C$) and finite fields are the main examples; the theorems are stated so as to be correct for these.

## Field extensions and degree

::: definition Extension and degree {#def-degree}
If $F$ is a subfield of a field $K$, we call $K$ an **extension** of $F$ and write $K/F$. Then $K$ is a vector space over $F$ (add elements of $K$, multiply them by scalars from $F$), and the **degree** of the extension is its dimension

$$
[K : F] = \dim_F K .
$$

The extension is **finite** if $[K : F] < \infty$.
:::

For example $[\C : \R] = 2$, with basis $1, i$. The field $\Q(\sqrt 2) = \set{a + b\sqrt2 : a, b \in \Q}$ has $[\Q(\sqrt2) : \Q] = 2$, with basis $1, \sqrt 2$. The field $\F_8$ of [[abstract-algebra/polynomials#ex-finite-fields]] has $[\F_8 : \F_2] = 3$. On the other hand $[\R : \Q] = \infty$, since a finite-dimensional vector space over the countable field $\Q$ is countable (see [[proofs/cardinality]]).

For $\alpha_1, \dots, \alpha_n \in K$ we write $F(\alpha_1, \dots, \alpha_n)$ for the smallest subfield of $K$ containing $F$ and the $\alpha_i$, the field obtained by **adjoining** them to $F$. Vector spaces over subfields lead to the most useful formula of the subject (see [[linear-algebra/basis-dimension]] for bases).

::: theorem Tower law {#thm-tower-law}
Let $F \subseteq K \subseteq L$ be fields. If $a_1, \dots, a_m$ is a basis of $K$ over $F$ and $b_1, \dots, b_n$ is a basis of $L$ over $K$, then the $mn$ products $a_ib_j$ form a basis of $L$ over $F$. Hence

$$
[L : F] = [L : K]\,[K : F] .
$$ {#eq-tower}

(The formula also holds when some degree is infinite, with the obvious conventions.)
:::

::: proof
*Spanning.* Let $c \in L$. Since the $b_j$ span $L$ over $K$, $c = \sum_j k_jb_j$ with $k_j \in K$; and each $k_j = \sum_i f_{ij}a_i$ with $f_{ij} \in F$. So $c = \sum_{i,j} f_{ij}\,a_ib_j$.

*Independence.* Suppose $\sum_{i,j} f_{ij}a_ib_j = 0$ with $f_{ij} \in F$. Group the terms as $\sum_j\bigl(\sum_i f_{ij}a_i\bigr)b_j = 0$. The coefficients $\sum_i f_{ij}a_i$ lie in $K$, and the $b_j$ are independent over $K$, so each $\sum_i f_{ij}a_i = 0$. The $a_i$ are independent over $F$, so every $f_{ij} = 0$.

If $L/K$ or $K/F$ is infinite, then $L$ contains an infinite set independent over $F$ (products as above, or the basis of $K$ itself), so $[L:F] = \infty$ as well.
:::

An immediate consequence: if $[K : F]$ is prime, there is no field strictly between $F$ and $K$, since the degrees of the two steps would have to multiply to a prime.

## Algebraic elements and simple extensions

::: definition Algebraic and transcendental elements {#def-algebraic}
Let $K/F$ be an extension. An element $\alpha \in K$ is **algebraic** over $F$ if $f(\alpha) = 0$ for some non-zero $f \in F[x]$, and **transcendental** otherwise.
:::

$\sqrt 2$, $i$, $\sqrt[3]{2}$, $e^{2\pi i/n}$ and $\sqrt2 + \sqrt3$ are algebraic over $\Q$. The numbers $e$ and $\pi$ are transcendental over $\Q$ (Hermite, 1873, and Lindemann, 1882); the proofs use analysis and are beyond this course.

::: definition Minimal polynomial {#def-minimal-polynomial}
If $\alpha$ is algebraic over $F$, its **minimal polynomial** $m_\alpha \in F[x]$ is the monic polynomial of least degree with $m_\alpha(\alpha) = 0$. The **degree** of $\alpha$ over $F$ is $\deg m_\alpha$.
:::

::: proposition Properties of the minimal polynomial {#prop-minimal}
Let $\alpha$ be algebraic over $F$. Then $m_\alpha$ is irreducible over $F$; a polynomial $f \in F[x]$ satisfies $f(\alpha) = 0$ if and only if $m_\alpha \mid f$; and any monic irreducible $p \in F[x]$ with $p(\alpha) = 0$ equals $m_\alpha$.
:::

::: proof
The set $I = \set{f \in F[x] : f(\alpha) = 0}$ is the kernel of the evaluation homomorphism $F[x] \to K$, $f \mapsto f(\alpha)$, hence an ideal; it is non-zero because $\alpha$ is algebraic. By [[abstract-algebra/polynomials#thm-fx-pid]] it is generated by a non-zero element of least degree, which made monic is $m_\alpha$; so $f(\alpha) = 0 \iff m_\alpha \mid f$. If $m_\alpha = gh$ with both factors of smaller degree, then $g(\alpha)h(\alpha) = 0$ in the field $K$, so $g(\alpha) = 0$ or $h(\alpha) = 0$, contradicting minimality. Finally, if $p$ is monic irreducible with $p(\alpha) = 0$, then $m_\alpha \mid p$, and irreducibility forces $p = m_\alpha$.
:::

::: theorem Simple algebraic extensions {#thm-simple-extension}
Let $\alpha$ be algebraic over $F$ with minimal polynomial $m_\alpha$ of degree $n$. Then

$$
F(\alpha) \cong F[x]/(m_\alpha), \qquad\text{and}\qquad 1, \alpha, \alpha^2, \dots, \alpha^{n-1} \text{ is a basis of } F(\alpha) \text{ over } F .
$$

In particular $[F(\alpha) : F] = \deg m_\alpha$.
:::

::: proof
The evaluation map $F[x] \to K$, $f \mapsto f(\alpha)$, is a ring homomorphism with kernel $(m_\alpha)$ by [[#prop-minimal]]. Its image is $F[\alpha] = \set{f(\alpha) : f \in F[x]}$. By the first isomorphism theorem ([[abstract-algebra/rings#thm-first-iso-rings]]), $F[\alpha] \cong F[x]/(m_\alpha)$, which is a field because $m_\alpha$ is irreducible ([[abstract-algebra/polynomials#thm-quotient-field]]). So $F[\alpha]$ is a subfield of $K$ containing $F$ and $\alpha$; and any such subfield contains all polynomial expressions in $\alpha$, i.e. contains $F[\alpha]$. Hence $F(\alpha) = F[\alpha] \cong F[x]/(m_\alpha)$. The basis statement is the description of $F[x]/(m_\alpha)$ in [[abstract-algebra/polynomials#thm-quotient-field]], transported by the isomorphism $x + (m_\alpha) \mapsto \alpha$.
:::

So to find the degree of $\alpha$, find a monic irreducible polynomial with root $\alpha$. For instance $[\Q(\sqrt[3]2) : \Q] = 3$ because $x^3 - 2$ is irreducible (Eisenstein at $2$), and $[\Q(\zeta_p) : \Q] = p - 1$ for $\zeta_p = e^{2\pi i/p}$ because the cyclotomic polynomial $\Phi_p$ is irreducible ([[abstract-algebra/polynomials#ex-eisenstein]]). The theorem also says that inverses in $F(\alpha)$ are polynomials in $\alpha$: in $\Q(\sqrt[3]2)$, with $a = \sqrt[3]2$, we have $(1 + a)(1 - a + a^2) = 1 + a^3 = 3$, so

$$
\frac{1}{1 + \sqrt[3]2} = \frac{1 - \sqrt[3]2 + \sqrt[3]4}{3} .
$$

::: example A field of degree four {#ex-q-sqrt2-sqrt3}
Show that $[\Q(\sqrt2, \sqrt3) : \Q] = 4$, that $\Q(\sqrt 2, \sqrt 3) = \Q(\sqrt2 + \sqrt3)$, and find the minimal polynomial of $\gamma = \sqrt 2 + \sqrt 3$.
::: solution
First, $\sqrt3 \notin \Q(\sqrt2)$: if $\sqrt 3 = a + b\sqrt2$ with $a, b \in \Q$, squaring gives $3 = a^2 + 2b^2 + 2ab\sqrt2$, so $ab = 0$ (as $\sqrt 2$ is irrational); $b = 0$ gives $a^2 = 3$ and $a = 0$ gives $2b^2 = 3$, both impossible in $\Q$. So $x^2 - 3$ is irreducible over $\Q(\sqrt2)$ and $[\Q(\sqrt2,\sqrt3) : \Q(\sqrt 2)] = 2$. By the tower law,

$$
[\Q(\sqrt2, \sqrt3) : \Q] = 2 \cdot 2 = 4,
$$

with basis $1, \sqrt2, \sqrt3, \sqrt6$ (products of the bases $1, \sqrt 2$ and $1, \sqrt3$).

Clearly $\gamma \in \Q(\sqrt2, \sqrt3)$. Conversely $\gamma^3 = 11\sqrt2 + 9\sqrt3$, so $\gamma^3 - 9\gamma = 2\sqrt2$ and $\gamma^3 - 11\gamma = -2\sqrt3$; hence $\sqrt2, \sqrt3 \in \Q(\gamma)$ and the two fields are equal. Then $\deg m_\gamma = [\Q(\gamma) : \Q] = 4$. Since $\gamma^2 = 5 + 2\sqrt6$, we get $(\gamma^2 - 5)^2 = 24$, i.e. $\gamma^4 - 10\gamma^2 + 1 = 0$. This monic quartic has root $\gamma$ and the right degree, so $m_\gamma = x^4 - 10x^2 + 1$ (and it is automatically irreducible).
:::
:::

::: proposition Finite extensions are algebraic {#prop-finite-algebraic}
If $[K : F] = n$ is finite, every $\alpha \in K$ is algebraic over $F$ of degree dividing $n$. Consequently, if $\alpha$ and $\beta$ are algebraic over $F$, so are $\alpha \pm \beta$, $\alpha\beta$ and $\alpha/\beta$ ($\beta \neq 0$): the algebraic numbers form a field.
:::

::: proof
The $n + 1$ elements $1, \alpha, \dots, \alpha^n$ of the $n$-dimensional space $K$ are linearly dependent over $F$, which gives a non-zero polynomial with root $\alpha$. By the tower law $[K:F] = [K : F(\alpha)]\,[F(\alpha) : F]$, so $\deg m_\alpha = [F(\alpha):F]$ divides $n$. For the second statement, $[F(\alpha, \beta) : F] = [F(\alpha)(\beta) : F(\alpha)]\,[F(\alpha) : F]$ is finite, since $\beta$ is algebraic over $F(\alpha)$ of degree at most $\deg m_\beta$. So every element of $F(\alpha, \beta)$, including $\alpha \pm \beta$, $\alpha\beta$ and $\alpha/\beta$, is algebraic.
:::

## Ruler-and-compass constructions

Start with the points $0$ and $1$ in the plane $\C$. A ruler draws the line through two constructed points; a compass draws the circle with a constructed centre through a constructed point; and new points are intersections of such lines and circles. A complex number is **constructible** if it can be obtained in finitely many steps. One can construct sums, products, quotients and square roots of constructible numbers, so they form a field closed under square roots. The key fact is a converse.

::: theorem Constructible numbers have degree a power of 2 {#thm-constructible}
If $\alpha$ is constructible, then $[\Q(\alpha) : \Q]$ is a power of $2$.
:::

::: proof
(Sketch.) Suppose all points constructed so far have real and imaginary parts in a field $K \subseteq \R$. A line through two such points has an equation $ax + by = c$ with coefficients in $K$, and a circle has an equation $x^2 + y^2 + dx + ey + f = 0$ with coefficients in $K$. Intersecting two lines requires only arithmetic in $K$; intersecting a line with a circle, or two circles (subtract the equations to get a line), requires solving a quadratic over $K$, so the new coordinates lie in $K(\sqrt{\delta})$ for some $\delta \in K$, an extension of degree $1$ or $2$. Hence the coordinates of any constructible point lie in the top field $K_r$ of a tower $\Q = K_0 \subseteq K_1 \subseteq \dots \subseteq K_r$ with each $[K_{i+1} : K_i] \le 2$, and $\alpha$ lies in $K_r(i)$. By the tower law $[K_r(i) : \Q]$ is a power of $2$, and $[\Q(\alpha) : \Q]$ divides it ([[#prop-finite-algebraic]]), so it is a power of $2$ too.
:::

::: corollary The classical problems are impossible {#cor-classical}
With ruler and compass it is impossible (a) to double the cube, (b) to trisect the angle $60^\circ$, and (c) to square the circle.
:::

::: proof
(a) Doubling a unit cube requires constructing $\sqrt[3]2$, which has degree $3$ over $\Q$. (b) Trisecting $60^\circ$ requires $\cos 20^\circ$. From $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ with $\theta = 20^\circ$, $c = \cos 20^\circ$ satisfies $4c^3 - 3c = \frac12$, so $y = 2c$ is a root of $y^3 - 3y - 1$, which is irreducible over $\Q$ ([[abstract-algebra/polynomials#ex-cubic]]). So $[\Q(c) : \Q] = 3$. In both cases $3$ is not a power of $2$. (c) Squaring the unit circle requires $\sqrt\pi$; if it were constructible then $\pi$ would be algebraic, contradicting Lindemann's theorem.
:::

Since $60^\circ$ itself is constructible (it is the angle of an equilateral triangle), "trisect an arbitrary angle" is impossible. Some angles, such as $90^\circ$, can of course be trisected.

::: quiz
Which of the following numbers can be constructed with ruler and compass, starting from $0$ and $1$? (Select all that apply.)
- [x] $\sqrt 2 + \sqrt 3$
- [ ] $\sqrt[3]{2}$
- [x] $\sqrt[4]{2}$
- [ ] $\cos 20^\circ$
::: solution
Square roots of constructible numbers are constructible, and so are sums; hence $\sqrt2 + \sqrt3$ and $\sqrt[4]2 = \sqrt{\sqrt 2}$ are constructible (degree $4 = 2^2$ in both cases). $\sqrt[3]2$ and $\cos 20^\circ$ have degree $3$ over $\Q$, which is not a power of $2$. Beware the converse of [[#thm-constructible]]: degree a power of $2$ is necessary for constructibility but not in general sufficient.
:::
:::

## Splitting fields and finite fields

::: definition Splitting field {#def-splitting-field}
Let $f \in F[x]$ have degree $n \ge 1$. An extension $K/F$ is a **splitting field** of $f$ over $F$ if $f$ factors in $K[x]$ as $c(x - \alpha_1)\cdots(x - \alpha_n)$ and $K = F(\alpha_1, \dots, \alpha_n)$.
:::

Splitting fields **exist**: by Kronecker's theorem ([[abstract-algebra/polynomials#thm-kronecker]]) adjoin a root $\alpha_1$ of $f$, factor out $x - \alpha_1$, and repeat; the degrees of the steps are at most $n, n-1, \dots$, so $[K : F] \le n!$. They are also **unique up to isomorphism**: any two splitting fields of $f$ over $F$ are isomorphic by an isomorphism fixing $F$ (proved by induction on $[K:F]$, extending isomorphisms one root at a time using [[#thm-simple-extension]]; see Dummit & Foote, §13.4). For subfields of $\C$ the splitting field is simply the subfield generated by all the complex roots.

::: example The splitting field of x³ − 2 {#ex-x3-2}
Find the splitting field $K$ of $x^3 - 2$ over $\Q$ and its degree.
::: solution
The roots are $\alpha_1 = \sqrt[3]2$, $\alpha_2 = \sqrt[3]2\,\omega$ and $\alpha_3 = \sqrt[3]2\,\omega^2$, where $\omega = e^{2\pi i/3} = \frac{-1 + \sqrt{-3}}2$. So $K = \Q(\sqrt[3]2, \omega)$ (it contains $\omega = \alpha_2/\alpha_1$, and conversely $\sqrt[3]2$ and $\omega$ generate all three roots). Now $[\Q(\sqrt[3]2) : \Q] = 3$; and $\omega \notin \Q(\sqrt[3]2) \subseteq \R$, while $\omega$ is a root of $x^2 + x + 1$, so $[K : \Q(\sqrt[3]2)] = 2$. By the tower law $[K : \Q] = 6$.
:::
:::

::: widget complexplane
mode: roots
n: 3
z: 2,0
caption: The three cube roots of $2$ form an equilateral triangle centred at $0$: one real root $\sqrt[3]2$ and two complex conjugate roots $\sqrt[3]2\,\omega^{\pm1}$. The field $\Q(\sqrt[3]2)$ lies inside $\R$, so it contains only one of them; adjoining $\omega$ as well doubles the degree, giving the splitting field of degree $6$.
:::

Splitting fields also classify the finite fields. A finite field $F$ has prime characteristic $p$ ([[abstract-algebra/rings#prop-char-domain]]), so it contains the prime field $\F_p = \set{0, 1, \dots, p - 1}$, and if $[F : \F_p] = n$ then $\abs F = p^n$. In characteristic $p$ the binomial coefficients $\binom pk$, $0 < k < p$, vanish, so $(a + b)^p = a^p + b^p$: the **Frobenius map** $a \mapsto a^p$ is a ring homomorphism, injective (as a field has no non-zero kernel ideals), hence bijective when $F$ is finite.

::: theorem The multiplicative group of a finite field is cyclic {#thm-cyclic-mult}
If $F$ is a finite field with $q$ elements, then $F^\times$ is a cyclic group of order $q - 1$.
:::

::: proof
Let $N = q - 1$. For each $d \mid N$ let $\psi(d)$ be the number of elements of $F^\times$ of order $d$; every element has order dividing $N$ by Lagrange, so $\sum_{d\mid N}\psi(d) = N$. If $\psi(d) \ge 1$ and $a$ has order $d$, the $d$ distinct powers of $a$ are roots of $x^d - 1$, which has at most $d$ roots in the field $F$ ([[abstract-algebra/polynomials#cor-root-count]]); so every element of order $d$ lies in $\langle a\rangle$, and there are exactly $\varphi(d)$ of those ([[abstract-algebra/subgroups#thm-order-of-power]]). Thus $\psi(d) \le \varphi(d)$ for all $d$, and

$$
N = \sum_{d\mid N}\psi(d) \le \sum_{d\mid N}\varphi(d) = N
$$

by [[abstract-algebra/subgroups#eq-phi-sum]]. Equality forces $\psi(N) = \varphi(N) \ge 1$: there is an element of order $N$.
:::

For $F = \F_p$ this says there is a **primitive root** modulo every prime, the central theorem of [[number-theory/primitive-roots]]; for $\F_8$ and $\F_9$ we found generators explicitly in [[abstract-algebra/polynomials#ex-finite-fields]].

::: theorem Classification of finite fields {#thm-finite-fields}
For every prime $p$ and $n \ge 1$ there is a field with $q = p^n$ elements, and any two such fields are isomorphic. It is the splitting field of $x^q - x$ over $\F_p$, and its elements are exactly the $q$ roots of $x^q - x$. Every finite field has prime-power order.
:::

::: proof
*Existence.* Let $K$ be a splitting field of $f = x^q - x$ over $\F_p$, and $R \subseteq K$ the set of roots of $f$. The roots are distinct: if $(x - a)^2$ divided $f$, then $a$ would also be a root of the formal derivative $f' = qx^{q-1} - 1 = -1$ (as $q = 0$ in $K$), which has no roots. So $\abs R = q$. Moreover $R$ is a subfield: if $a^q = a$ and $b^q = b$, then $(a - b)^q = a^q - b^q = a - b$ (Frobenius applied $n$ times), $(ab)^q = ab$ and $(a^{-1})^q = a^{-1}$. Since $R$ is a field containing all the roots, $K = R$ has exactly $q$ elements.

*Uniqueness.* If $F$ is any field with $q$ elements, then $a^{q-1} = 1$ for $a \in F^\times$ (Lagrange) and so $a^q = a$ for all $a \in F$. Thus $x^q - x$ has the $q$ elements of $F$ as roots and splits over $F$, and $F$ is generated by them: $F$ is a splitting field of $x^q - x$ over $\F_p$. Splitting fields are unique up to isomorphism.
:::

The field with $p^n$ elements is written $\F_{p^n}$ or $\mathrm{GF}(p^n)$ ("Galois field"). One can show that $\F_{p^m}$ is (isomorphic to) a subfield of $\F_{p^n}$ exactly when $m \mid n$ ([[#exr-9-10]]).

## Galois groups

The symmetries of a field extension are its automorphisms that fix the base field.

::: definition Galois group {#def-galois-group}
Let $K/F$ be an extension. An **$F$-automorphism** of $K$ is a field automorphism $\sigma\colon K \to K$ with $\sigma(a) = a$ for all $a \in F$. They form a group $\Aut(K/F)$ under composition. A finite extension $K/F$ is **Galois** if $\abs{\Aut(K/F)} = [K : F]$; its automorphism group is then the **Galois group** $\operatorname{Gal}(K/F)$.
:::

The basic observation: if $\sigma \in \Aut(K/F)$ and $f \in F[x]$, then $\sigma(f(\alpha)) = f(\sigma(\alpha))$, because $\sigma$ preserves sums and products and fixes the coefficients. So **$\sigma$ maps roots of $f$ to roots of $f$**. If $K = F(\alpha_1, \dots, \alpha_n)$ is generated by the roots of $f$, an automorphism is determined by how it permutes these roots, and $\Aut(K/F)$ is isomorphic to a subgroup of $S_n$.

::: proposition At most [K:F] automorphisms {#prop-aut-bound}
If $K = F(\alpha)$ with $\alpha$ algebraic of degree $n$, then $\abs{\Aut(K/F)}$ equals the number of distinct roots of $m_\alpha$ in $K$; in particular $\abs{\Aut(K/F)} \le [K:F]$.
:::

::: proof
An $F$-automorphism $\sigma$ is determined by $\sigma(\alpha)$, since every element of $K$ is a polynomial in $\alpha$ with coefficients in $F$; and $\sigma(\alpha)$ must be a root of $m_\alpha$ in $K$. Conversely, for each root $\beta \in K$ of $m_\alpha$, the isomorphisms $F(\alpha) \cong F[x]/(m_\alpha) \cong F(\beta)$ of [[#thm-simple-extension]] give an $F$-homomorphism $K \to K$ with $\alpha \mapsto \beta$; it is injective, and an injective linear map from the finite-dimensional space $K$ to itself is surjective. So the automorphisms correspond to the roots of $m_\alpha$ in $K$, of which there are at most $n = [K : F]$.
:::

(In fact $\abs{\Aut(K/F)} \le [K:F]$ for every finite extension, and for subfields of $\C$ every finite extension is simple — the primitive element theorem.) In characteristic $0$ and for finite fields, a finite extension is Galois **if and only if it is the splitting field of some polynomial** over $F$ (Stewart, *Galois Theory*, Chapters 11–12).

::: example Four Galois groups {#ex-galois-groups}
Compute (a) $\operatorname{Gal}(\C/\R)$; (b) $\operatorname{Gal}(\Q(\sqrt2, \sqrt 3)/\Q)$; (c) the Galois group of $x^3 - 2$ over $\Q$; (d) $\Aut(\Q(\sqrt[3]2)/\Q)$.
::: solution
(a) $\C = \R(i)$ and $m_i = x^2 + 1$ has the two roots $\pm i$ in $\C$, so there are two automorphisms, the identity and complex conjugation: $\operatorname{Gal}(\C/\R) \cong \Z_2$.

(b) An automorphism sends $\sqrt 2 \mapsto \pm\sqrt 2$ and $\sqrt 3 \mapsto \pm\sqrt3$ (roots of $x^2 - 2$ and $x^2 - 3$), and is determined by these choices, so there are at most $4$. The field is the splitting field of $(x^2-2)(x^2-3)$, so it is Galois of degree $4$ and all four choices occur. Each automorphism has order at most $2$, so the group is $V_4 = \set{\id, \sigma, \tau, \sigma\tau}$, where $\sigma$ negates $\sqrt 2$ and fixes $\sqrt3$, and $\tau$ fixes $\sqrt 2$ and negates $\sqrt 3$.

(c) The splitting field $K = \Q(\sqrt[3]2, \omega)$ has degree $6$ ([[#ex-x3-2]]) and is Galois, so $\abs{\operatorname{Gal}(K/\Q)} = 6$. Each automorphism permutes the three roots $\alpha_1, \alpha_2, \alpha_3$ and is determined by the permutation, so $\operatorname{Gal}(K/\Q)$ is a subgroup of $S_3$ of order $6$: it is all of $S_3$.

(d) An automorphism of $\Q(\sqrt[3]2)$ sends $\sqrt[3]2$ to a root of $x^3 - 2$ *in this field*; the field is real, so the only such root is $\sqrt[3]2$ itself. Hence $\Aut(\Q(\sqrt[3]2)/\Q)$ is trivial, although the degree is $3$: this extension is **not** Galois. It is not a splitting field — it contains one root of $x^3 - 2$ but not the others.
:::
:::

Two further families are important. For finite fields, $\operatorname{Gal}(\F_{p^n}/\F_p)$ is **cyclic of order $n$, generated by the Frobenius map** $\phi(a) = a^p$: indeed $\phi^k(a) = a^{p^k}$, and $\phi^k = \id$ means every element is a root of $x^{p^k} - x$, which needs $p^k \ge p^n$; so $\phi$ has order $n = [\F_{p^n} : \F_p]$. For roots of unity, $\operatorname{Gal}(\Q(\zeta_n)/\Q) \cong U(n)$, the automorphism $\sigma_k$ sending $\zeta_n \mapsto \zeta_n^k$ for each $k \in U(n)$ (this uses the irreducibility of the cyclotomic polynomial $\Phi_n$, proved above for $n$ prime).

::: quiz
What is $\abs{\operatorname{Gal}(K/\Q)}$ for the splitting field $K$ of $(x^2 - 2)(x^2 - 5)$?
- [ ] $2$
- [x] $4$
- [ ] $6$
- [ ] $24$
::: solution
$K = \Q(\sqrt 2, \sqrt 5)$. As in [[#ex-q-sqrt2-sqrt3]], $\sqrt 5 \notin \Q(\sqrt 2)$, so $[K:\Q] = 4$. A splitting field is Galois, so the group has order $4$; it is $V_4$, generated by the sign changes of $\sqrt2$ and $\sqrt5$.
:::
:::

## The fundamental theorem of Galois theory

For a subgroup $H$ of $\operatorname{Gal}(K/F)$, its **fixed field** is $K^H = \set{a \in K : \sigma(a) = a \text{ for all } \sigma \in H}$; it is a field between $F$ and $K$. Conversely, each intermediate field $E$ determines the subgroup $\operatorname{Gal}(K/E)$ of automorphisms fixing $E$ pointwise.

::: theorem Fundamental theorem of Galois theory {#thm-ftgt}
Let $K/F$ be a finite Galois extension (for instance the splitting field of a polynomial over a field of characteristic $0$), with $G = \operatorname{Gal}(K/F)$. Then

$$
H \longmapsto K^H, \qquad E \longmapsto \operatorname{Gal}(K/E)
$$

are mutually inverse, inclusion-reversing bijections between the subgroups $H \le G$ and the intermediate fields $F \subseteq E \subseteq K$. Moreover:

1. $[K : K^H] = \abs H$ and $[K^H : F] = [G : H]$;
2. for every intermediate field $E$, the extension $K/E$ is Galois;
3. $E/F$ is Galois if and only if $\operatorname{Gal}(K/E)$ is a normal subgroup of $G$, and then $\operatorname{Gal}(E/F) \cong G/\operatorname{Gal}(K/E)$.
:::

::: proof
(Sketch.) The key additional ingredient is **Artin's lemma**: if $H$ is a finite group of automorphisms of a field $K$, then $[K : K^H] \le \abs H$. (One shows that any $\abs H + 1$ elements of $K$ are linearly dependent over $K^H$, by solving a system of linear equations over $K$ and averaging over $H$.)

Given $H \le G$: certainly $H \subseteq \Aut(K/K^H)$, so $\abs{H} \le \abs{\Aut(K/K^H)} \le [K : K^H] \le \abs H$, using the general bound on automorphisms and Artin's lemma. Hence equality holds throughout: $\operatorname{Gal}(K/K^H) = H$ and $[K : K^H] = \abs H$, and then $[K^H : F] = [K:F]/[K:K^H] = \abs G/\abs H$ by the tower law. Given an intermediate field $E$: if $K$ is the splitting field of $f$ over $F$, it is also the splitting field of $f$ over $E$, so $K/E$ is Galois, $\abs{\operatorname{Gal}(K/E)} = [K : E]$, and $E \subseteq K^{\operatorname{Gal}(K/E)}$ with $[K : K^{\operatorname{Gal}(K/E)}] = \abs{\operatorname{Gal}(K/E)} = [K : E]$, forcing $K^{\operatorname{Gal}(K/E)} = E$. So the two maps are inverse to each other, and they visibly reverse inclusions.

For part 3: $\sigma(E)$ is again an intermediate field and $\operatorname{Gal}(K/\sigma(E)) = \sigma\operatorname{Gal}(K/E)\sigma^{-1}$. So $\operatorname{Gal}(K/E)$ is normal exactly when $\sigma(E) = E$ for all $\sigma \in G$; in that case restriction $\sigma \mapsto \sigma|_E$ is a homomorphism $G \to \Aut(E/F)$ with kernel $\operatorname{Gal}(K/E)$, and counting with part 1 shows it is onto a group of order $[E:F]$, so $E/F$ is Galois with $\operatorname{Gal}(E/F) \cong G/\operatorname{Gal}(K/E)$ by the first isomorphism theorem. Full proofs are in Stewart, *Galois Theory*, Chapter 12, or Dummit & Foote, §14.2.
:::

::: example The Galois correspondence for ℚ(√2, √3) {#ex-correspondence-v4}
Find all fields between $\Q$ and $K = \Q(\sqrt2, \sqrt3)$.
::: solution
By [[#ex-galois-groups]], $G = \set{\id, \sigma, \tau, \sigma\tau} \cong V_4$, whose subgroups are $\set{\id}$, the three subgroups of order $2$, and $G$. The fixed fields of the order-$2$ subgroups have degree $[G : H] = 2$ over $\Q$:

- $\langle\sigma\rangle$ fixes $\sqrt 3$, so $K^{\langle\sigma\rangle} = \Q(\sqrt 3)$;
- $\langle\tau\rangle$ fixes $\sqrt 2$, so $K^{\langle\tau\rangle} = \Q(\sqrt 2)$;
- $\sigma\tau$ negates both $\sqrt 2$ and $\sqrt 3$, so it fixes $\sqrt6 = \sqrt2\sqrt3$, and $K^{\langle\sigma\tau\rangle} = \Q(\sqrt 6)$.

So the intermediate fields are exactly $\Q$, $\Q(\sqrt2)$, $\Q(\sqrt3)$, $\Q(\sqrt6)$ and $K$ — no others exist, which would be hard to prove without the theorem. All subgroups of the abelian group $V_4$ are normal, and correspondingly each quadratic field is Galois over $\Q$.
:::
:::

::: example The Galois correspondence for x³ − 2 {#ex-correspondence-s3}
Find all fields between $\Q$ and the splitting field $K = \Q(\sqrt[3]2, \omega)$ of $x^3 - 2$, and decide which are Galois over $\Q$.
::: solution
$G \cong S_3$, acting on the roots $\alpha_1 = \sqrt[3]2$, $\alpha_2 = \sqrt[3]2\,\omega$, $\alpha_3 = \sqrt[3]2\,\omega^2$. Its subgroups are $\set{e}$, $\langle(2\ 3)\rangle$, $\langle(1\ 3)\rangle$, $\langle(1\ 2)\rangle$, $A_3$ and $S_3$.

- $\langle (2\ 3)\rangle$ fixes $\alpha_1$, so its fixed field contains $\Q(\alpha_1)$, which has degree $3 = [S_3 : \langle(2\ 3)\rangle]$; hence $K^{\langle(2\ 3)\rangle} = \Q(\sqrt[3]2)$. Similarly $\langle (1\ 3)\rangle$ and $\langle(1\ 2)\rangle$ have fixed fields $\Q(\alpha_2)$ and $\Q(\alpha_3)$.
- A $3$-cycle $\sigma = (1\ 2\ 3)$ sends $\omega = \alpha_2/\alpha_1$ to $\alpha_3/\alpha_2 = \omega$, so $A_3$ fixes $\omega$; as $[S_3 : A_3] = 2 = [\Q(\omega) : \Q]$, $K^{A_3} = \Q(\omega) = \Q(\sqrt{-3})$.

So there are exactly four proper intermediate fields: three conjugate cubic fields $\Q(\alpha_i)$ and one quadratic field $\Q(\omega)$. The normal subgroups of $S_3$ are $\set e$, $A_3$, $S_3$, so among the intermediate fields only $\Q(\omega)$ is Galois over $\Q$ — it is the splitting field of $x^2 + x + 1$ — with $\operatorname{Gal}(\Q(\omega)/\Q) \cong S_3/A_3 \cong \Z_2$. The cubic fields are not Galois, matching [[#ex-galois-groups]](d).
:::
:::

::: widget graph
nodes: K@0,3; Q(a1)@-2,1.6; Q(a2)@-0.7,1.6; Q(a3)@0.6,1.6; Q(w)@2,2.2; Q@0,0
edges: K-Q(a1); K-Q(a2); K-Q(a3); K-Q(w); Q(a1)-Q; Q(a2)-Q; Q(a3)-Q; Q(w)-Q
caption: The lattice of fields between $\Q$ and $K = \Q(\sqrt[3]2, \omega)$, with $a_i = \alpha_i$ and $w = \omega$. Edges to the cubic fields $\Q(\alpha_i)$ have degree $3$ below and $2$ above; the quadratic field $\Q(\omega)$ has degree $2$ below and $3$ above. Turn the picture upside down and it becomes the lattice of subgroups of $S_3$: $K \leftrightarrow \set{e}$, $\Q(\alpha_1) \leftrightarrow \langle(2\ 3)\rangle$, $\Q(\omega) \leftrightarrow A_3$, $\Q \leftrightarrow S_3$.
:::

::: warning Fixed fields reverse inclusion
Bigger subgroups have *smaller* fixed fields: the whole group fixes only $F$, and the trivial subgroup fixes all of $K$. Also, the degree of the fixed field over $F$ is the **index** $[G:H]$, not the order $\abs H$. In [[#ex-correspondence-s3]] the subgroup of order $2$ corresponds to the field of degree $3$ over $\Q$.
:::

## Solvability by radicals and the quintic

A polynomial $f \in \Q[x]$ is **solvable by radicals** if its roots lie in a field obtained from $\Q$ by successively adjoining $n$-th roots: a tower $\Q = K_0 \subseteq K_1 \subseteq \dots \subseteq K_r$ with $K_{i+1} = K_i(a_i)$ and $a_i^{n_i} \in K_i$. The quadratic, cubic and quartic formulas show that every polynomial of degree at most $4$ is solvable by radicals.

A finite group $G$ is **solvable** if it has a chain of subgroups $\set{e} = G_0 \trianglelefteq G_1 \trianglelefteq \dots \trianglelefteq G_r = G$, each normal in the next, with every quotient $G_{i+1}/G_i$ abelian. Abelian groups are solvable; so are $S_3$ (via $\set{e} \trianglelefteq A_3 \trianglelefteq S_3$) and $S_4$ (via $\set e \trianglelefteq V \trianglelefteq A_4 \trianglelefteq S_4$, with quotients $V_4$, $\Z_3$, $\Z_2$). But $S_5$ is not: subgroups of solvable groups are solvable, and the simple non-abelian group $A_5 \le S_5$ has no such chain, since its only normal subgroups are $\set e$ and $A_5$, and $A_5/\set{e}$ is not abelian.

::: theorem Galois's criterion {#thm-galois-criterion}
A polynomial $f \in \Q[x]$ is solvable by radicals if and only if the Galois group of its splitting field over $\Q$ is a solvable group.
:::

::: proof
(Idea of the forward direction.) After first adjoining suitable roots of unity, each step $K_{i+1} = K_i(a_i)$ with $a_i^{n_i} \in K_i$ is a Galois extension with *abelian* (indeed cyclic) Galois group. Passing to Galois closures and applying the fundamental theorem, the tower of fields becomes a chain of normal subgroups with abelian quotients; since a quotient of a solvable group is solvable, the Galois group of $f$ is solvable. The converse uses the same dictionary in reverse. See Stewart, *Galois Theory*, Chapters 14–15.
:::

::: theorem An insoluble quintic {#thm-quintic}
The polynomial $f = x^5 - 6x + 3$ is not solvable by radicals over $\Q$. Consequently there is no formula in radicals for the roots of the general equation of degree $5$.
:::

::: proof
Let $K$ be the splitting field of $f$ and $G = \operatorname{Gal}(K/\Q) \le S_5$, viewed as permutations of the five roots.

*$G$ contains a $5$-cycle.* $f$ is irreducible by Eisenstein's criterion at $3$. If $\alpha$ is a root, $[\Q(\alpha) : \Q] = 5$ divides $[K : \Q] = \abs{G}$ by the tower law, so by Cauchy's theorem ([[abstract-algebra/group-actions#thm-cauchy]]) $G$ has an element of order $5$; in $S_5$ the elements of order $5$ are the $5$-cycles.

*$G$ contains a transposition.* $f'(x) = 5x^4 - 6$ vanishes only at $\pm t$ with $t = (6/5)^{1/4} \approx 1.047$. Since $f(t) = t(t^4 - 6) + 3 = 3 - 4.8\,t < 0$ and $f(-t) = 3 + 4.8\,t > 0$, while $f \to \pm\infty$ as $x \to \pm\infty$, $f$ has exactly three real roots (at most three by Rolle's theorem, since $f'$ has two real zeros; at least three by the intermediate value theorem). The other two roots are non-real complex conjugates. Complex conjugation maps $K$ to itself (it permutes the roots), fixes the three real roots and swaps the other two: it is a transposition in $G$.

*So $G = S_5$.* In $S_p$ with $p$ prime, a $p$-cycle and a transposition generate $S_p$: relabelling the roots, the transposition is $(1\ 2)$, and some power of the $5$-cycle sends $1$ to $2$, so (renumbering the other roots) $G$ contains $(1\ 2\ 3\ 4\ 5)$; these two generate $S_5$ by [[abstract-algebra/permutation-groups#exr-3-8]]. Since $S_5$ is not solvable, $f$ is not solvable by radicals by [[#thm-galois-criterion]]. A general formula for quintics would, in particular, express the roots of this $f$ in radicals.
:::

::: widget plot
f: x^5 - 6x + 3
x: -2.2, 2.2
y: -12, 12
caption: The graph of $x^5 - 6x + 3$ crosses the axis exactly three times (near $-1.671$, $0.506$ and $1.402$); the remaining two roots are a complex conjugate pair. Complex conjugation therefore acts on the roots as a transposition, which together with a $5$-cycle generates the whole of $S_5$ — the reason this quintic has no solution in radicals.
:::

::: application Error-correcting codes and cryptography
Finite fields are the arithmetic of the digital world. Reed–Solomon codes, used on CDs, DVDs, QR codes and in deep-space communication, treat blocks of data as polynomials over $\F_{2^8}$ and correct errors by polynomial arithmetic. The AES block cipher performs its byte substitutions by inversion in $\F_{256} = \F_2[x]/(x^8 + x^4 + x^3 + x + 1)$, and elliptic-curve cryptography works over large finite fields ([[number-theory/cryptography]]).
:::

::: history
Paolo Ruffini (1799) and Niels Henrik Abel (1824) proved that the general quintic cannot be solved by radicals. Évariste Galois, working around 1830 and killed in a duel in 1832 at the age of twenty, found the criterion in terms of what we now call the Galois group; his memoir was published by Joseph Liouville in 1846. Galois also introduced the finite fields that bear his name. In 1837 Pierre Wantzel published the impossibility proofs for doubling the cube and trisecting the angle, and Ferdinand von Lindemann's proof that $\pi$ is transcendental (1882) settled the squaring of the circle. The modern formulation via field extensions, degrees and fixed fields, used in this chapter, is due largely to Richard Dedekind and above all to Emil Artin, whose lectures (published 1942) shaped the way Galois theory is taught today.
:::

## Where this leads

Galois theory opens onto much of modern mathematics. Algebraic number theory studies finite extensions of $\Q$ and their rings of integers, where the failure of unique factorisation met in [[abstract-algebra/rings]] is repaired by ideals; the Galois groups of cyclotomic fields lead to the reciprocity laws generalising [[number-theory/quadratic-reciprocity]]. Finite fields underpin coding theory and the cryptography of [[number-theory/cryptography]]. And the idea of a correspondence between subgroups and intermediate objects reappears in topology, where covering spaces correspond to subgroups of the fundamental group ([[topology/fundamental-group]]).

::: summary
- An extension $K/F$ is a vector space over $F$; its **degree** is $[K:F] = \dim_F K$, and degrees multiply in towers: $[L:F] = [L:K][K:F]$ ([[#thm-tower-law]]).
- An algebraic $\alpha$ has a minimal polynomial $m_\alpha$, irreducible; $F(\alpha) \cong F[x]/(m_\alpha)$ with basis $1, \alpha, \dots, \alpha^{n-1}$, so $[F(\alpha):F] = \deg m_\alpha$.
- Constructible numbers have degree a power of $2$; since $\sqrt[3]2$ and $\cos 20^\circ$ have degree $3$, the cube cannot be doubled nor $60^\circ$ trisected.
- Splitting fields exist and are unique; there is exactly one field $\F_{p^n}$ of each prime-power order, and its multiplicative group is cyclic.
- $\operatorname{Gal}(K/F)$ permutes the roots of polynomials over $F$; $K/F$ is Galois when $\abs{\operatorname{Gal}} = [K:F]$, e.g. for splitting fields in characteristic $0$. Examples: $V_4$ for $\Q(\sqrt2,\sqrt3)$, $S_3$ for $x^3 - 2$, cyclic for finite fields.
- **Fundamental theorem**: subgroups $H$ ↔ intermediate fields $K^H$, inclusion-reversing, with $[K^H:F] = [G:H]$; normal subgroups ↔ Galois subextensions.
- $f$ is solvable by radicals iff its Galois group is solvable; $x^5 - 6x + 3$ has Galois group $S_5$, which is not solvable, so the quintic has no general formula.
:::

## Exercises

::: exercise A degree by the tower law {level=1 check="6"}
Find $[\Q(\sqrt 5, \sqrt[3]2) : \Q]$.
::: solution
$[\Q(\sqrt5) : \Q] = 2$ and $[\Q(\sqrt[3]2):\Q] = 3$, and both divide $n = [\Q(\sqrt5, \sqrt[3]2):\Q]$ by the tower law, so $6 \mid n$. On the other hand $[\Q(\sqrt5,\sqrt[3]2) : \Q(\sqrt[3]2)] \le 2$ (as $\sqrt5$ is a root of $x^2 - 5$), so $n \le 6$. Hence $n = 6$.
:::
:::

::: exercise A cyclotomic degree {level=1 check="4"}
What is $[\Q(\zeta_5) : \Q]$, where $\zeta_5 = e^{2\pi i/5}$?
::: solution
The minimal polynomial of $\zeta_5$ is the irreducible cyclotomic polynomial $\Phi_5 = x^4 + x^3 + x^2 + x + 1$ ([[abstract-algebra/polynomials#ex-eisenstein]]), so the degree is $4$.
:::
:::

::: exercise Subfields of 𝔽₆₄ {level=1 check="4"}
How many subfields does $\F_{64}$ have? (Use the fact that $\F_{2^m}$ is a subfield of $\F_{2^n}$ exactly when $m \mid n$, and that $\F_{64}$ has exactly one subfield of each such order.)
::: solution
$64 = 2^6$, so the subfields are $\F_{2^m}$ with $m \mid 6$: $\F_2$, $\F_4$, $\F_8$ and $\F_{64}$ — four subfields. (Note that $\F_{16}$ and $\F_{32}$ are *not* subfields of $\F_{64}$.) This also follows from the Galois correspondence: $\operatorname{Gal}(\F_{64}/\F_2) \cong \Z_6$ has four subgroups.
:::
:::

::: exercise A minimal polynomial {level=2}
Find the minimal polynomial of $\beta = i + \sqrt 2$ over $\Q$ and the degree $[\Q(\beta) : \Q]$.
::: solution
$\beta - \sqrt2 = i$, so $(\beta - \sqrt 2)^2 = -1$, i.e. $\beta^2 + 3 = 2\sqrt2\,\beta$. Squaring, $(\beta^2 + 3)^2 = 8\beta^2$, i.e. $\beta^4 - 2\beta^2 + 9 = 0$. As in [[#ex-q-sqrt2-sqrt3]], $\Q(\beta) = \Q(i, \sqrt 2)$ (one recovers $\sqrt 2 = (\beta^2 + 3)/(2\beta)$ and then $i = \beta - \sqrt2$), and $[\Q(i, \sqrt2) : \Q] = 4$ since $i \notin \Q(\sqrt 2) \subseteq \R$. So $\deg m_\beta = 4$ and $m_\beta = x^4 - 2x^2 + 9$.
:::
:::

::: exercise The regular 9-gon {level=2}
Show that the regular $9$-gon cannot be constructed with ruler and compass.
::: hint
Constructing it amounts to constructing $\cos 40^\circ$. Use $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$.
:::
::: solution
With $\theta = 40^\circ$, $\cos 3\theta = \cos 120^\circ = -\frac12$, so $c = \cos 40^\circ$ satisfies $4c^3 - 3c + \frac12 = 0$, and $y = 2c$ satisfies $y^3 - 3y + 1 = 0$. By the rational root theorem the only possible rational roots are $\pm1$, giving $-1$ and $3$; so the cubic is irreducible and $[\Q(c) : \Q] = 3$, not a power of $2$. By [[#thm-constructible]], $\cos 40^\circ$ is not constructible, so neither is the $9$-gon.
:::
:::

::: exercise The field ℚ(i, √2) {level=2}
Determine $\operatorname{Gal}(\Q(i, \sqrt2)/\Q)$ and all intermediate fields.
::: solution
$K = \Q(i, \sqrt 2)$ is the splitting field of $(x^2+1)(x^2-2)$ and has degree $4$ (as in [[#exr-9-4]]). Its automorphisms are determined by $i \mapsto \pm i$ and $\sqrt2 \mapsto \pm\sqrt2$, giving four automorphisms, each of order at most $2$: $G \cong V_4$. Let $\sigma$ fix $\sqrt 2$ and negate $i$ (complex conjugation), and $\tau$ fix $i$ and negate $\sqrt2$. Then $K^{\langle\sigma\rangle} = \Q(\sqrt 2)$, $K^{\langle\tau\rangle} = \Q(i)$ and $\sigma\tau$ fixes $i\sqrt 2 = \sqrt{-2}$, so $K^{\langle\sigma\tau\rangle} = \Q(\sqrt{-2})$. The intermediate fields are $\Q$, $\Q(i)$, $\Q(\sqrt 2)$, $\Q(\sqrt{-2})$ and $K$.
:::
:::

::: exercise Extensions of prime degree {level=2}
Let $[K : F] = p$ be prime. Show that $K = F(\alpha)$ for every $\alpha \in K \setminus F$.
::: solution
For $\alpha \in K \setminus F$, $F \subsetneq F(\alpha) \subseteq K$. By the tower law $[F(\alpha) : F]$ divides $p$, and it is not $1$ since $\alpha \notin F$. So $[F(\alpha) : F] = p = [K:F]$, and then $[K : F(\alpha)] = 1$, i.e. $K = F(\alpha)$.
:::
:::

::: exercise Finite subgroups of a multiplicative group {level=3}
Let $F$ be any field and $G$ a finite subgroup of $F^\times$. Prove that $G$ is cyclic. Deduce that the $n$-th roots of unity in any field form a cyclic group.
::: solution
Repeat the proof of [[#thm-cyclic-mult]] with $G$ in place of $F^\times$. Let $N = \abs G$ and $\psi(d)$ the number of elements of $G$ of order $d$; by Lagrange, $\sum_{d\mid N}\psi(d) = N$. If $a \in G$ has order $d$, its $d$ powers are distinct roots of $x^d - 1$, which has at most $d$ roots in $F$, so all elements of order $d$ lie in $\langle a\rangle$ and $\psi(d) = \varphi(d)$; otherwise $\psi(d) = 0$. Then $N = \sum\psi(d) \le \sum\varphi(d) = N$ forces $\psi(N) = \varphi(N) \ge 1$, so $G$ is cyclic. The $n$-th roots of unity in $F$ form a finite subgroup of $F^\times$ (closed under products and inverses, with at most $n$ elements), hence a cyclic group.
:::
:::

::: exercise Another insoluble quintic {level=3}
Prove that $x^5 - 4x + 2$ is not solvable by radicals over $\Q$.
::: solution
Follow [[#thm-quintic]]. The polynomial is irreducible by Eisenstein at $2$ ($2 \nmid 1$; $2 \mid -4, 2$; $4 \nmid 2$), so its Galois group $G \le S_5$ has order divisible by $5$ and contains a $5$-cycle. The derivative $5x^4 - 4$ vanishes at $\pm t$, $t = (4/5)^{1/4} \approx 0.946$, and $f(t) = t(t^4 - 4) + 2 = 2 - 3.2t < 0$, $f(-t) = 2 + 3.2t > 0$; with $f \to \pm\infty$ at $\pm\infty$ this gives exactly three real roots (near $-1.519$, $0.509$, $1.244$). Complex conjugation is then a transposition in $G$, so $G = S_5$, which is not solvable; by Galois's criterion the polynomial is not solvable by radicals.
:::
:::

::: exercise Subfields of finite fields {level=3}
Prove that $\F_{p^n}$ contains a subfield with $p^m$ elements if and only if $m \mid n$.
::: hint
For "only if" use the tower law; for "if", show that $x^{p^m} - x$ divides $x^{p^n} - x$ when $m \mid n$.
:::
::: solution
If $E \subseteq \F_{p^n}$ has $p^m$ elements, then $\F_p \subseteq E \subseteq \F_{p^n}$ and the tower law gives $n = [\F_{p^n}:\F_p] = [\F_{p^n} : E]\cdot m$, so $m \mid n$. Conversely let $n = mk$. Then $p^m - 1$ divides $p^n - 1 = (p^m)^k - 1$, and for $d \mid e$ the polynomial $x^d - 1$ divides $x^e - 1$; so $x^{p^m - 1} - 1$ divides $x^{p^n - 1} - 1$, and multiplying by $x$, $x^{p^m} - x$ divides $x^{p^n} - x$. The latter splits into distinct linear factors over $\F_{p^n}$ ([[#thm-finite-fields]]), so $x^{p^m} - x$ has exactly $p^m$ roots in $\F_{p^n}$. The set $E$ of these roots is closed under subtraction, multiplication and inverses (by the Frobenius argument in the proof of [[#thm-finite-fields]]), so it is a subfield with $p^m$ elements.
:::
:::
