There is a striking parallel between the integers and polynomials. Both can be divided with remainder; both have greatest common divisors computed by Euclid's algorithm; and just as every integer factors uniquely into primes, every polynomial over a field factors uniquely into **irreducible** polynomials. The parallel goes further. Reducing the integers modulo a prime $p$ produces the field $\F_p$; reducing polynomials modulo an irreducible polynomial produces a field too. This is how the complex numbers arise from real polynomials, and how we will build fields with $4$, $8$ or $9$ elements — fields that are *not* of the form $\Z_n$.

This chapter develops the arithmetic of the polynomial ring $F[x]$ over a field $F$: the division algorithm and its consequences, unique factorisation, and practical tests for irreducibility over $\Q$ — the rational root test, Gauss's lemma, Eisenstein's criterion and reduction modulo a prime. It ends with Kronecker's theorem, which guarantees that every polynomial has a root in *some* field. That theorem is the starting point of the field theory and Galois theory of [[abstract-algebra/fields-galois]].

## Polynomial rings

Let $R$ be a commutative ring. A **polynomial** over $R$ is a formal expression

$$
f = a_0 + a_1x + a_2x^2 + \dots + a_nx^n \qquad (a_i \in R),
$$

where only finitely many coefficients are non-zero. Polynomials are added coefficientwise and multiplied by the rule $x^ix^j = x^{i+j}$ extended by distributivity:

$$
\Bigl(\sum_i a_ix^i\Bigr)\Bigl(\sum_j b_jx^j\Bigr) = \sum_k \Bigl(\sum_{i + j = k} a_ib_j\Bigr)x^k .
$$

With these operations the polynomials form a commutative ring $R[x]$, containing $R$ as the constant polynomials. If $a_n \neq 0$, then $n$ is the **degree** $\deg f$, $a_n$ is the **leading coefficient**, and $f$ is **monic** if $a_n = 1$. The zero polynomial has no degree (it is convenient to set $\deg 0 = -\infty$).

::: warning A polynomial is not a function
Two different polynomials can define the same function. Over $\F_p$, Fermat's little theorem says $a^p = a$ for every $a \in \F_p$ ([[abstract-algebra/lagrange#cor-fermat]]), so the polynomial $x^p - x$ is not zero but its function $\F_p \to \F_p$ is identically zero. In algebra a polynomial is its list of coefficients; $x$ is a formal symbol, not a number.
:::

::: proposition Degrees over a domain {#prop-degree}
If $D$ is an integral domain and $f, g \in D[x]$ are non-zero, then $\deg(fg) = \deg f + \deg g$. Consequently $D[x]$ is an integral domain, and its units are the units of $D$ (as constant polynomials). In particular, for a field $F$ the units of $F[x]$ are the non-zero constants.
:::

::: proof
If $f$ has leading term $a_mx^m$ and $g$ has leading term $b_nx^n$, then the coefficient of $x^{m+n}$ in $fg$ is $a_mb_n \neq 0$ (no zero-divisors), and there are no higher terms. So $fg \neq 0$ and $\deg fg = m + n$. If $fg = 1$, then $\deg f + \deg g = 0$, so both are constants, and they are inverse units of $D$.
:::

Without the domain hypothesis this fails: in $\Z_4[x]$, $(2x + 1)^2 = 4x^2 + 4x + 1 = 1$, so the degree-one polynomial $2x + 1$ is a unit. From now on $F$ denotes a field.

## The division algorithm

::: theorem Division algorithm {#thm-poly-division}
Let $F$ be a field and $f, g \in F[x]$ with $g \neq 0$. There are unique polynomials $q, r \in F[x]$ with

$$
f = qg + r \qquad\text{and}\qquad r = 0 \text{ or } \deg r < \deg g .
$$
:::

::: proof
*Existence*, by strong induction on $\deg f$. If $f = 0$ or $\deg f < \deg g$, take $q = 0$, $r = f$. Otherwise let $f$ have leading term $a_mx^m$ and $g$ leading term $b_nx^n$, with $m \ge n$. Since $F$ is a field, $b_n^{-1}$ exists, and

$$
f_1 = f - a_mb_n^{-1}x^{m-n}g
$$

has its $x^m$ terms cancelled, so $f_1 = 0$ or $\deg f_1 < m$. By the induction hypothesis $f_1 = q_1g + r$ with $r = 0$ or $\deg r < \deg g$, and then $f = (a_mb_n^{-1}x^{m-n} + q_1)g + r$.

*Uniqueness.* If $qg + r = q'g + r'$ with both remainders of degree less than $\deg g$ (or zero), then $(q - q')g = r' - r$. If $q \neq q'$ the left side has degree at least $\deg g$ by [[#prop-degree]], while the right side has degree less than $\deg g$ — impossible. So $q = q'$ and then $r = r'$.
:::

The proof is ordinary long division. Only the inverse of the leading coefficient of $g$ was needed, so the same algorithm works in $R[x]$ for any commutative ring $R$ when $g$ is monic.

::: example Long division over ℚ and over 𝔽₅ {#ex-long-division}
Divide $f = x^4 + 3x^3 - 2x + 5$ by $g = x^2 + x + 1$ in $\Q[x]$, and then in $\F_5[x]$.
::: solution
Over $\Q$: the first quotient term is $x^2$, and $f - x^2g = 2x^3 - x^2 - 2x + 5$. The next term is $2x$, and $(2x^3 - x^2 - 2x + 5) - 2xg = -3x^2 - 4x + 5$. The next is $-3$, and $(-3x^2 - 4x + 5) + 3g = -x + 8$, of degree $1 < 2$. So

$$
x^4 + 3x^3 - 2x + 5 = (x^2 + 2x - 3)(x^2 + x + 1) + (8 - x).
$$

Over $\F_5$ the same computation works with every coefficient reduced modulo $5$ (no division by a number divisible by $5$ occurred, since $g$ is monic): the quotient is $x^2 + 2x + 2$ and the remainder is $4x + 3$.
:::
:::

::: theorem Remainder and factor theorems {#thm-factor}
Let $f \in F[x]$ and $c \in F$. The remainder on dividing $f$ by $x - c$ is the constant $f(c)$. Consequently $c$ is a root of $f$ (that is, $f(c) = 0$) if and only if $x - c$ divides $f$.
:::

::: proof
Divide: $f = q\cdot(x - c) + r$ with $r$ a constant (degree less than $1$, or zero). Evaluating at $c$ — evaluation is a ring homomorphism $F[x] \to F$ — gives $f(c) = q(c)\cdot 0 + r = r$.
:::

::: corollary Counting roots {#cor-root-count}
A non-zero polynomial of degree $n$ over a field (or over an integral domain) has at most $n$ roots in it.
:::

::: proof
Induction on $n$. Degree $0$: a non-zero constant has no roots. If $\deg f = n \ge 1$ and $c$ is a root, then $f = (x - c)q$ with $\deg q = n - 1$. If $d \ne c$ is another root, $0 = f(d) = (d - c)q(d)$, and since $d - c \neq 0$ and there are no zero-divisors, $q(d) = 0$. So the roots of $f$ other than $c$ are roots of $q$, of which there are at most $n - 1$. (For a domain $D$, apply the field case in its field of fractions.)
:::

::: warning Zero-divisors allow extra roots
The count fails over rings with zero-divisors. In $\Z_8$ the polynomial $x^2 - 1$ has the four roots $1, 3, 5, 7$, since each squares to $1$ modulo $8$; the proof breaks at "$(d - c)q(d) = 0$ implies $q(d) = 0$", e.g. $(3 - 1)(3 + 1) = 8 = 0$. It also fails without commutativity: $x^2 + 1$ has infinitely many roots in the quaternions, including $\pm i, \pm j, \pm k$.
:::

The root bound has important consequences: it is the key step in proving that $U(p)$ is cyclic ([[number-theory/primitive-roots]]) and, more generally, that the multiplicative group of any finite field is cyclic ([[abstract-algebra/fields-galois]]).

## F[x] is a principal ideal domain

::: theorem Ideals of F[x] {#thm-fx-pid}
Every ideal of $F[x]$ is principal. Explicitly, a non-zero ideal $I$ equals $(g)$ for any non-zero $g \in I$ of least degree, and there is a unique monic such $g$.
:::

::: proof
If $I = \set{0}$ then $I = (0)$. Otherwise choose $g \in I$, $g \neq 0$, of least degree. Certainly $(g) \subseteq I$. Conversely let $f \in I$ and divide: $f = qg + r$ with $r = 0$ or $\deg r < \deg g$. Then $r = f - qg \in I$, so by minimality of $\deg g$, $r = 0$ and $f \in (g)$. Multiplying $g$ by the inverse of its leading coefficient gives a monic generator; two monic generators divide each other, so they have the same degree and differ by a constant factor, which must be $1$.
:::

So $F[x]$, like $\Z$, is a principal ideal domain. Exactly as for integers, the **greatest common divisor** $\gcd(f, g)$ of polynomials (not both zero) is defined as the monic generator $d$ of the ideal $(f, g) = \set{uf + vg}$. It divides $f$ and $g$, every common divisor divides it, and **Bézout's identity** $d = uf + vg$ holds for some $u, v \in F[x]$. The **Euclidean algorithm** computes it: replace $(f, g)$ by $(g, r)$, where $r$ is the remainder of $f$ on division by $g$, until the remainder is $0$; then $\gcd(f, g)$ is the last non-zero remainder, made monic. The justification is the same as for integers ([[number-theory/divisibility]]): $(f, g) = (g, f - qg)$.

::: example A gcd by Euclid's algorithm {#ex-poly-gcd}
Find $\gcd(f, g)$ for $f = x^3 - 2x^2 - x + 2$ and $g = x^3 - x^2 - 4x + 4$ in $\Q[x]$, and express it in Bézout form.
::: solution
First division: $f = 1\cdot g + (-x^2 + 3x - 2)$. Second: $g$ divided by $-x^2 + 3x - 2$, or equivalently by $x^2 - 3x + 2$:

$$
x^3 - x^2 - 4x + 4 = (x + 2)(x^2 - 3x + 2) + 0 .
$$

The last non-zero remainder is $-x^2 + 3x - 2$; made monic, $\gcd(f, g) = x^2 - 3x + 2 = (x-1)(x-2)$. From the first step, $x^2 - 3x + 2 = -(f - g) = g - f$, which is Bézout's identity with $u = -1$, $v = 1$. (Indeed $f = (x-1)(x+1)(x-2)$ and $g = (x - 1)(x - 2)(x + 2)$.)
:::
:::

## Irreducible polynomials and unique factorisation

::: definition Irreducible polynomial {#def-irreducible}
A non-constant polynomial $f \in F[x]$ is **irreducible over $F$** if it cannot be written as $f = gh$ with $g, h \in F[x]$ both of degree at least $1$. Otherwise it is **reducible**.
:::

Irreducibility depends on the field. Every polynomial of degree $1$ is irreducible. The polynomial $x^2 - 2$ is irreducible over $\Q$ (as $\sqrt 2 \notin \Q$) but equals $(x - \sqrt2)(x + \sqrt 2)$ over $\R$; $x^2 + 1$ is irreducible over $\R$ but equals $(x - i)(x + i)$ over $\C$. Over finite fields we can simply test: $x^2 + 1$ factors over $\F_2$ as $(x + 1)^2$ and over $\F_5$ as $(x - 2)(x - 3)$, but is irreducible over $\F_3$, since $0^2 + 1, 1^2 + 1, 2^2 + 1$ are $1, 2, 2$, none zero.

::: proposition Degrees two and three {#prop-deg23}
A polynomial $f \in F[x]$ of degree $2$ or $3$ is irreducible over $F$ if and only if it has no root in $F$.
:::

::: proof
If $f = gh$ with $\deg g, \deg h \ge 1$ and $\deg g + \deg h \in \set{2, 3}$, one factor has degree $1$, say $g = a(x - c)$, and then $c$ is a root. Conversely a root $c$ gives the factor $x - c$ by [[#thm-factor]], with a cofactor of degree $1$ or $2$.
:::

::: warning Not for degree four
For degree $4$ or more, having no roots does **not** imply irreducibility: a quartic can split into two quadratics. Over $\R$, $(x^2 + 1)^2$ has no real roots; over $\Q$, $x^4 + 4 = (x^2 + 2x + 2)(x^2 - 2x + 2)$ has no rational roots ([[#exr-8-7]]).
:::

Irreducible polynomials are the primes of $F[x]$, and they have the key property of primes.

::: proposition Irreducibles are prime {#prop-irreducible-prime}
If $p \in F[x]$ is irreducible and $p \mid fg$, then $p \mid f$ or $p \mid g$.
:::

::: proof
Let $d = \gcd(p, f)$. It divides $p$, so (being monic) it is either $1$ or a constant multiple of $p$. If $d$ is a multiple of $p$, then $p \mid f$. If $d = 1$, Bézout gives $1 = up + vf$; multiplying by $g$, $g = upg + v(fg)$, and $p$ divides both terms, so $p \mid g$.
:::

::: theorem Unique factorisation in F[x] {#thm-poly-ufd}
Every non-constant $f \in F[x]$ can be written as

$$
f = c\,p_1p_2\cdots p_k
$$

with $c \in F^\times$ and $p_1, \dots, p_k$ monic irreducible polynomials. The factorisation is unique apart from the order of the factors.
:::

::: proof
*Existence*, by strong induction on $\deg f$. If $f$ is irreducible, $f = c\cdot(c^{-1}f)$ with $c$ its leading coefficient. Otherwise $f = gh$ with $1 \le \deg g, \deg h < \deg f$, and by induction both $g$ and $h$ factor; multiply the factorisations.

*Uniqueness.* Suppose $c\,p_1\cdots p_k = d\,q_1\cdots q_l$ with all $p_i, q_j$ monic irreducible. Comparing leading coefficients, $c = d$. Now $p_1$ divides $q_1\cdots q_l$, so by [[#prop-irreducible-prime]] (and induction on the number of factors) $p_1 \mid q_j$ for some $j$. As $q_j$ is irreducible and both are monic, $p_1 = q_j$. Cancel it (we are in a domain) and repeat; by induction on $k$, the remaining factors agree up to order, and $k = l$.
:::

Which polynomials are irreducible depends dramatically on $F$:

- Over $\C$ the irreducible polynomials are exactly those of degree $1$. This is the **fundamental theorem of algebra**: every non-constant complex polynomial has a complex root (a proof by complex analysis is in [[complex-analysis/cauchy-theorem]]).
- Over $\R$ the irreducible polynomials are those of degree $1$ and the quadratics $ax^2 + bx + c$ with $b^2 < 4ac$. Indeed, non-real roots of a real polynomial come in conjugate pairs $z, \bar z$, and $(x - z)(x - \bar z) = x^2 - 2\operatorname{Re}(z)x + \abs{z}^2$ is real.
- Over $\Q$ and over finite fields there are irreducible polynomials of every degree (for $\Q$, see Eisenstein's criterion below).

::: example One polynomial over five fields {#ex-x4-minus-1}
Factor $x^4 - 1$ into irreducibles over $\Q$, $\R$, $\C$, $\F_3$ and $\F_5$.
::: solution
Always $x^4 - 1 = (x^2 - 1)(x^2 + 1) = (x - 1)(x + 1)(x^2 + 1)$, so the question is what happens to $x^2 + 1$. Over $\Q$ and $\R$ it is irreducible (no root), giving $(x-1)(x+1)(x^2+1)$. Over $\C$ it splits: $(x - 1)(x + 1)(x - i)(x + i)$. Over $\F_3$ it has no root (see above), so $x^4 - 1 = (x - 1)(x + 1)(x^2 + 1)$. Over $\F_5$, $2^2 = 4 = -1$, so $x^2 + 1 = (x - 2)(x + 2)$ and $x^4 - 1 = (x-1)(x-2)(x-3)(x-4)$. That last factorisation also follows from Fermat's little theorem: all four non-zero elements of $\F_5$ satisfy $a^4 = 1$, so they are four roots of a polynomial of degree $4$.
:::
:::

## Irreducibility over ℚ

Deciding irreducibility over $\Q$ is a genuine problem, and several tools are used in combination. The first finds all possible rational roots.

::: theorem Rational root theorem {#thm-rational-roots}
Let $f = a_nx^n + \dots + a_1x + a_0 \in \Z[x]$ with $a_n \neq 0$. If $r/s$ is a root of $f$ with $r, s \in \Z$, $s > 0$ and $\gcd(r, s) = 1$, then $r \mid a_0$ and $s \mid a_n$.
:::

::: proof
Multiply $f(r/s) = 0$ by $s^n$:

$$
a_nr^n + a_{n-1}r^{n-1}s + \dots + a_1rs^{n-1} + a_0s^n = 0 .
$$

Every term except $a_0s^n$ is divisible by $r$, so $r \mid a_0s^n$; since $\gcd(r, s) = 1$, $r \mid a_0$ ([[number-theory/divisibility#thm-coprime-divides]]). Similarly every term except $a_nr^n$ is divisible by $s$, so $s \mid a_nr^n$ and $s \mid a_n$.
:::

::: example An irreducible cubic {#ex-cubic}
Show that $f = x^3 - 3x - 1$ is irreducible over $\Q$.
::: solution
By the rational root theorem, a rational root $r/s$ has $r \mid -1$ and $s \mid 1$, so it is $\pm 1$. But $f(1) = 1 - 3 - 1 = -3$ and $f(-1) = -1 + 3 - 1 = 1$. So $f$ has no rational root, and since it has degree $3$ it is irreducible over $\Q$ by [[#prop-deg23]]. Note that $f$ has three *real* roots (see the figure): irreducible over $\Q$ does not mean having no real roots. Its roots are $2\cos 20^\circ$, $2\cos 140^\circ$ and $2\cos 260^\circ$, which is why trisecting a $60^\circ$ angle is impossible with ruler and compass ([[abstract-algebra/fields-galois]]).
:::
:::

::: widget plot
f: x^3 - 3x - 1
x: -2.5, 2.5
y: -5, 5
points: 1, -3; -1, 1
caption: The cubic $x^3 - 3x - 1$ crosses the axis three times, near $-1.532$, $-0.347$ and $1.879$, but none of these roots is rational. The only candidates allowed by the rational root theorem are $\pm1$ (marked), where the values are $-3$ and $1$. A cubic with no rational root cannot factor over $\Q$, because any factorisation would include a linear factor.
:::

For polynomials of higher degree we need to rule out factorisations into non-linear factors. Gauss's lemma shows that it is enough to look for factorisations with **integer** coefficients. The **content** $c(f)$ of a non-zero $f \in \Z[x]$ is the gcd of its coefficients, and $f$ is **primitive** if $c(f) = 1$.

::: theorem Gauss's lemma {#thm-gauss-lemma}
1. The product of two primitive polynomials in $\Z[x]$ is primitive.
2. If $f \in \Z[x]$ factors as $f = gh$ with $g, h \in \Q[x]$ of degrees $m, n \ge 1$, then $f = GH$ with $G, H \in \Z[x]$ of degrees $m$ and $n$. In particular, a primitive polynomial is irreducible over $\Q$ if and only if it is irreducible in $\Z[x]$.
:::

::: proof
1. Let $g, h$ be primitive and suppose a prime $p$ divides every coefficient of $gh$. Reducing coefficients modulo $p$ is a ring homomorphism $\Z[x] \to \F_p[x]$, $u \mapsto \bar u$, so $\bar g\,\bar h = \overline{gh} = 0$. But $\F_p[x]$ is an integral domain ([[#prop-degree]]), so $\bar g = 0$ or $\bar h = 0$, meaning $p$ divides all coefficients of $g$ or of $h$ — contradicting primitivity.

2. Every non-zero $u \in \Q[x]$ can be written $u = \alpha u_1$ with $\alpha \in \Q_{>0}$ and $u_1 \in \Z[x]$ primitive: clear denominators, then divide by the content. Write $g = \alpha g_1$ and $h = \beta h_1$ in this way. Then $f = \alpha\beta\, g_1h_1$, and $g_1h_1$ is primitive by part 1. Write $\alpha\beta = u/v$ in lowest terms with $v > 0$. Then $vf = u\,g_1h_1$, and taking contents of both sides, $v\,c(f) = \abs{u}\,c(g_1h_1) = \abs{u}$. So $v$ divides $\abs u$, and as $\gcd(u, v) = 1$, $v = 1$: $\alpha\beta = u$ is an integer. Hence $f = (ug_1)h_1$ with $G = ug_1$ and $H = h_1$ in $\Z[x]$, of the same degrees as $g$ and $h$.
:::

::: theorem Eisenstein's criterion {#thm-eisenstein}
Let $f = a_nx^n + a_{n-1}x^{n-1} + \dots + a_0 \in \Z[x]$ and let $p$ be a prime such that

$$
p \nmid a_n, \qquad p \mid a_i \ \ (0 \le i \le n-1), \qquad p^2 \nmid a_0 .
$$

Then $f$ is irreducible over $\Q$.
:::

::: proof
Suppose not. By Gauss's lemma $f = gh$ with $g = b_kx^k + \dots + b_0$ and $h = c_lx^l + \dots + c_0$ in $\Z[x]$, where $k, l \ge 1$ and $k + l = n$. Reduce modulo $p$. All coefficients of $f$ except the leading one vanish, so

$$
\bar a_n x^n = \bar f = \bar g\,\bar h \qquad\text{in } \F_p[x],
$$

with $\bar a_n \neq 0$. Since $b_kc_l = a_n$ is not divisible by $p$, neither is $b_k$ nor $c_l$, so $\deg\bar g = k$ and $\deg \bar h = l$. By unique factorisation in $\F_p[x]$ ([[#thm-poly-ufd]]) the only monic irreducible factor of $\bar a_nx^n$ is $x$, so $\bar g = \bar b_kx^k$ and $\bar h = \bar c_lx^l$. As $k, l \ge 1$, the constant terms of $\bar g$ and $\bar h$ are zero: $p \mid b_0$ and $p \mid c_0$. But then $p^2 \mid b_0c_0 = a_0$, a contradiction.
:::

::: example Applications of Eisenstein's criterion {#ex-eisenstein}
Show that the following are irreducible over $\Q$: (a) $x^n - 2$ for every $n \ge 1$; (b) $x^5 - 6x + 3$; (c) the cyclotomic polynomial $\Phi_p(x) = x^{p-1} + x^{p-2} + \dots + x + 1$ for a prime $p$.
::: solution
(a) Eisenstein with $p = 2$: $2 \nmid 1$, $2$ divides all other coefficients ($0$ and $-2$), and $4 \nmid -2$. So there are irreducible polynomials over $\Q$ of every degree, and $\sqrt[n]2$ is irrational for every $n \ge 2$.

(b) Eisenstein with $p = 3$: $3 \nmid 1$, $3 \mid -6$, $3 \mid 3$ (and the other coefficients are $0$), and $9 \nmid 3$. This polynomial reappears in [[abstract-algebra/fields-galois]] as an equation that cannot be solved by radicals.

(c) Eisenstein does not apply directly, but irreducibility is unchanged by the substitution $x \mapsto x + 1$ (it is a ring automorphism of $\Q[x]$ preserving degrees). Since $\Phi_p(x) = \frac{x^p - 1}{x - 1}$,

$$
\Phi_p(x + 1) = \frac{(x+1)^p - 1}{x} = \sum_{k=1}^{p}\binom pk x^{k-1} = x^{p-1} + \binom{p}{p-1}x^{p-2} + \dots + \binom p2 x + p .
$$

The leading coefficient is $1$; every other coefficient $\binom pk$ with $1 \le k \le p-1$ is divisible by $p$; and the constant term $p$ is not divisible by $p^2$. So $\Phi_p(x+1)$, and hence $\Phi_p(x)$, is irreducible. For $p = 5$: $\Phi_5(x+1) = x^4 + 5x^3 + 10x^2 + 10x + 5$.
:::
:::

::: widget complexplane
mode: roots
n: 5
z: 1,0
caption: The fifth roots of unity are the roots of $x^5 - 1 = (x - 1)\Phi_5(x)$. The root $1$ belongs to the rational factor $x - 1$; the other four are the roots of $\Phi_5(x) = x^4 + x^3 + x^2 + x + 1$, which is irreducible over $\Q$ by Eisenstein's criterion applied to $\Phi_5(x+1)$. No polynomial of degree less than $4$ with rational coefficients has $e^{2\pi i/5}$ as a root.
:::

A third test reduces the problem to finite fields, where it can be settled by finite checking.

::: proposition Reduction modulo p {#prop-mod-p}
Let $f \in \Z[x]$ have leading coefficient not divisible by the prime $p$. If the reduction $\bar f \in \F_p[x]$ is irreducible over $\F_p$, then $f$ is irreducible over $\Q$.
:::

::: proof
If $f$ were reducible over $\Q$, then by Gauss's lemma $f = gh$ in $\Z[x]$ with $\deg g, \deg h \ge 1$. The product of the leading coefficients of $g$ and $h$ is not divisible by $p$, so reduction preserves both degrees, and $\bar f = \bar g\bar h$ would be a factorisation of $\bar f$ into polynomials of degree at least $1$.
:::

For example $f = x^4 + 10x^3 + 7x + 1$ reduces modulo $2$ to $x^4 + x + 1$. Over $\F_2$ this has no roots ($0$ and $1$ both give $1$), and the only irreducible quadratic over $\F_2$ is $x^2 + x + 1$, whose square $x^4 + x^2 + 1$ is different; so $x^4 + x + 1$ is irreducible over $\F_2$, and $f$ is irreducible over $\Q$.

::: warning The converse of the mod-p test is false
A polynomial irreducible over $\Q$ may be reducible modulo *every* prime. The standard example is $x^4 + 1$: it is irreducible over $\Q$ (apply Eisenstein to $(x+1)^4 + 1 = x^4 + 4x^3 + 6x^2 + 4x + 2$ with $p = 2$), yet modulo $3$ it is $(x^2 + x - 1)(x^2 - x - 1)$, modulo $5$ it is $(x^2 + 2)(x^2 - 2)$, and in fact it factors modulo every prime ([[#exr-8-8]]). So failure of the mod-$p$ test proves nothing.
:::

::: quiz
Which of these polynomials are irreducible over $\Q$? (Select all that apply.)
- [x] $x^2 - 2$
- [ ] $x^2 - 4$
- [x] $x^3 - 3x - 1$
- [ ] $x^4 + 4$
- [x] $x^5 - 6x + 3$
::: solution
$x^2 - 2$ has no rational root. $x^2 - 4 = (x - 2)(x + 2)$. $x^3 - 3x - 1$ was shown irreducible in [[#ex-cubic]]. $x^4 + 4 = (x^2 + 2x + 2)(x^2 - 2x + 2)$ has no rational roots but factors into quadratics. $x^5 - 6x + 3$ is Eisenstein at $p = 3$.
:::
:::

## Building fields from irreducible polynomials

Now we can say exactly when a quotient of $F[x]$ is a field.

::: theorem Quotients by irreducible polynomials {#thm-quotient-field}
Let $p \in F[x]$ have degree $n \ge 1$. The following are equivalent:

1. $p$ is irreducible over $F$;
2. the ideal $(p)$ is maximal;
3. $F[x]/(p)$ is a field.

In that case every element of $K = F[x]/(p)$ can be written uniquely as $a_0 + a_1\alpha + \dots + a_{n-1}\alpha^{n-1}$ with $a_i \in F$, where $\alpha = x + (p)$; so $K$ is an $n$-dimensional vector space over $F$, and if $F$ is finite with $q$ elements then $\abs{K} = q^n$.
:::

::: proof
(1) ⇔ (2): Since $F[x]$ is a PID, every ideal containing $(p)$ has the form $(d)$ with $d \mid p$. If $p$ is irreducible, such a $d$ is a non-zero constant (so $(d) = F[x]$) or a constant multiple of $p$ (so $(d) = (p)$); hence $(p)$ is maximal (it is proper as $\deg p \ge 1$). If $p = gh$ with $1 \le \deg g < n$, then $(p) \subsetneq (g) \subsetneq F[x]$, so $(p)$ is not maximal.

(2) ⇔ (3) is [[abstract-algebra/rings#thm-maximal-field]].

For the description of elements: by the division algorithm every $f \in F[x]$ satisfies $f = qp + r$ with $r = 0$ or $\deg r < n$, and $f + (p) = r + (p) = r(\alpha)$. If two remainders $r, r'$ of degree less than $n$ give the same coset, then $p \mid r - r'$, forcing $r = r'$ by degrees. So the cosets correspond bijectively to the $q^n$ polynomials of degree less than $n$.
:::

In $K = F[x]/(p)$ we compute with polynomials in $\alpha$ and use the relation $p(\alpha) = 0$ to reduce powers $\alpha^n, \alpha^{n+1}, \dots$. The field $F$ sits inside $K$ as the cosets of constants.

::: example Fields with 4, 8 and 9 elements {#ex-finite-fields}
(a) Show that $x^2 + x + 1$ is irreducible over $\F_2$ and describe $\F_4 = \F_2[x]/(x^2 + x + 1)$. (b) Construct a field with $8$ elements and show that its non-zero elements are the powers of a single element. (c) Construct a field with $9$ elements.
::: solution
(a) $x^2 + x + 1$ has no root in $\F_2$ (both $0$ and $1$ give $1$), so it is irreducible by [[#prop-deg23]], and $\F_4 = \set{0, 1, \alpha, \alpha + 1}$ with $\alpha^2 = \alpha + 1$ (remember $-1 = 1$ in characteristic $2$). For example $\alpha(\alpha + 1) = \alpha^2 + \alpha = 2\alpha + 1 = 1$, so $\alpha^{-1} = \alpha + 1$. The multiplicative group $\set{1, \alpha, \alpha+1}$ is cyclic of order $3$, generated by $\alpha$.

(b) $x^3 + x + 1$ has no root in $\F_2$, so it is irreducible and $\F_8 = \F_2[x]/(x^3 + x + 1)$ has $2^3 = 8$ elements, with $\alpha^3 = \alpha + 1$. Successive powers:

$$
\alpha^3 = \alpha + 1,\quad \alpha^4 = \alpha^2 + \alpha,\quad \alpha^5 = \alpha^3 + \alpha^2 = \alpha^2 + \alpha + 1,\quad \alpha^6 = \alpha^3 + \alpha^2 + \alpha = \alpha^2 + 1,\quad \alpha^7 = \alpha^3 + \alpha = 1 .
$$

So $\alpha, \alpha^2, \dots, \alpha^7 = 1$ are the seven non-zero elements: $\F_8^\times$ is cyclic of order $7$, generated by $\alpha$.

(c) $x^2 + 1$ is irreducible over $\F_3$, so $\F_9 = \F_3[x]/(x^2+1) = \set{a + bi : a, b \in \F_3}$ with $i^2 = -1$. Here $i$ has order $4$, but $1 + i$ has order $8$: $(1+i)^2 = 2i$ and $(1 + i)^4 = (2i)^2 = -4 = -1$. So again the multiplicative group is cyclic.
:::
:::

::: warning F₄ is not ℤ₄
The field with four elements is **not** $\Z_4$: in $\Z_4$, $2 \cdot 2 = 0$, so $\Z_4$ is not even a domain. In $\F_4$, $1 + 1 = 0$ (characteristic $2$) and the elements $\alpha$, $\alpha + 1$ are new. In general $\Z_n$ is a field only for $n$ prime, and fields of prime-power order $p^k$ ($k \ge 2$) must be built as quotients $\F_p[x]/(p(x))$.
:::

::: widget modular
n: 4
mode: multiply
caption: The multiplication table of $\Z_4$: the row of $2$ reads $0, 2, 0, 2$, so $2$ has no inverse and $\Z_4$ is not a field. The field $\F_4$ of [[#ex-finite-fields]] has a completely different multiplication: there the three non-zero elements $1, \alpha, \alpha+1$ form a cyclic group of order $3$.
:::

::: quiz
What is $\F_3[x]/(x^3 + 2x + 1)$?
- [ ] A ring with $9$ elements that is not a field
- [ ] A field with $9$ elements
- [x] A field with $27$ elements
- [ ] A ring with $27$ elements that is not a field
::: solution
The cubic $x^3 + 2x + 1$ takes the values $1$, $1 + 2 + 1 = 4 \equiv 1$ and $8 + 4 + 1 = 13 \equiv 1$ at $0, 1, 2$, so it has no root in $\F_3$ and is irreducible by [[#prop-deg23]]. By [[#thm-quotient-field]] the quotient is a field whose elements are $a_0 + a_1\alpha + a_2\alpha^2$ with $a_i \in \F_3$: $3^3 = 27$ elements.
:::
:::

The construction of [[#thm-quotient-field]] gives every polynomial a root somewhere.

::: theorem Kronecker's theorem {#thm-kronecker}
Let $f \in F[x]$ be non-constant. There is a field $K$ containing (an isomorphic copy of) $F$ in which $f$ has a root.
:::

::: proof
By [[#thm-poly-ufd]], $f$ has an irreducible factor $p$. Let $K = F[x]/(p)$, a field by [[#thm-quotient-field]]. The map $F \to K$, $a \mapsto a + (p)$, is an injective ring homomorphism (its kernel is an ideal of the field $F$ not containing $1$, hence zero), so we identify $F$ with its image. Let $\alpha = x + (p)$. Since $a \mapsto a + (p)$ is compatible with ring operations, for $p = \sum c_ix^i$ we get $p(\alpha) = \sum c_i\alpha^i = \bigl(\sum c_i x^i\bigr) + (p) = p + (p) = 0$. So $\alpha$ is a root of $p$, hence of $f$.
:::

This is the abstract version of "inventing $i$ so that $x^2 + 1$ has a root": $\R[x]/(x^2+1) \cong \C$ ([[abstract-algebra/rings#ex-quotients-rings]]). Applying the theorem repeatedly, every polynomial splits into linear factors over some field — the starting point of [[abstract-algebra/fields-galois]].

::: history
The parallel between integers and polynomials was exploited by Simon Stevin in the sixteenth century, who computed polynomial gcds by Euclid's algorithm. Carl Friedrich Gauss proved the fundamental theorem of algebra in his doctoral thesis of 1799 (giving four proofs over his lifetime), and his *Disquisitiones Arithmeticae* (1801) contains the lemma on products of primitive polynomials. The irreducibility criterion was published by Theodor Schönemann in 1846 and independently by Gotthold Eisenstein in 1850; it is sometimes called the Schönemann–Eisenstein criterion. Leopold Kronecker's construction of a root by computing modulo an irreducible polynomial (1887) gave a purely algebraic foundation for adjoining roots, and Évariste Galois had already used polynomials modulo $p$ to construct finite fields in 1830.
:::

## Where this leads

[[abstract-algebra/fields-galois]] studies the fields $F[x]/(p)$ as **field extensions** of $F$: their degree is $\deg p$, and comparing degrees proves the impossibility of the classical ruler-and-compass constructions. The finite fields built here are classified there completely — there is exactly one field of each prime-power order. Polynomials modulo a prime are also the setting of Lagrange's theorem on polynomial congruences, used in [[number-theory/primitive-roots]], and the cyclotomic polynomials $\Phi_n$ govern the arithmetic of roots of unity.

::: summary
- Over a domain, $\deg(fg) = \deg f + \deg g$; the units of $F[x]$ are the non-zero constants.
- **Division algorithm**: $f = qg + r$ with $\deg r < \deg g$; hence $f(c)$ is the remainder mod $x - c$, $c$ is a root iff $(x - c) \mid f$, and a degree-$n$ polynomial has at most $n$ roots in a domain (not in $\Z_8$!).
- $F[x]$ is a **principal ideal domain**; gcds satisfy Bézout's identity and are computed by Euclid's algorithm.
- Irreducible polynomials are prime, and factorisation into monic irreducibles is **unique** ([[#thm-poly-ufd]]). Degree $2$ or $3$: irreducible iff no root.
- Over $\Q$: rational roots $r/s$ have $r \mid a_0$, $s \mid a_n$; **Gauss's lemma** reduces to integer factorisations; **Eisenstein's criterion** ($p \mid a_i$, $p \nmid a_n$, $p^2 \nmid a_0$) and **reduction mod $p$** prove irreducibility.
- $F[x]/(p)$ is a field iff $p$ is irreducible; it has basis $1, \alpha, \dots, \alpha^{n-1}$, giving fields such as $\C$, $\F_4$, $\F_8$, $\F_9$.
- **Kronecker**: every non-constant polynomial has a root in some extension field.
:::

## Exercises

::: exercise A remainder {level=1 check="-4"}
Find the remainder when $f(x) = x^{100} + 3x^{51} - 2$ is divided by $x + 1$.
::: solution
By the remainder theorem the remainder is $f(-1) = 1 - 3 - 2 = -4$.
:::
:::

::: exercise Too many roots {level=1 check="4"}
How many roots does $x^2 - 1$ have in $\Z_{15}$? Why does this not contradict [[#cor-root-count]]?
::: solution
Testing $a = 0, \dots, 14$: $a^2 \equiv 1 \pmod{15}$ for $a = 1, 4, 11, 14$ (e.g. $4^2 = 16$, $11^2 = 121 = 8\cdot 15 + 1$). So there are $4$ roots. There is no contradiction because $\Z_{15}$ is not an integral domain ($3 \cdot 5 = 0$); for instance $(4-1)(4+1) = 15 = 0$ with both factors non-zero.
:::
:::

::: exercise One cubic, two fields {level=1}
Is $x^3 + x + 1$ irreducible over $\F_2$? Over $\F_3$? Factor it where possible.
::: solution
Over $\F_2$: the values at $0$ and $1$ are $1$ and $3 = 1$, so there is no root; by [[#prop-deg23]] the cubic is irreducible. Over $\F_3$: the value at $1$ is $3 = 0$, so $x - 1$ is a factor, and dividing gives $x^3 + x + 1 = (x - 1)(x^2 + x + 2)$ in $\F_3[x]$. The quadratic $x^2 + x + 2$ has values $2, 1, 2$ at $0, 1, 2$, so it is irreducible over $\F_3$.
:::
:::

::: exercise Bézout for polynomials {level=2}
Find $d = \gcd(x^4 - 1,\ x^3 + 2x^2 + 2x + 1)$ in $\Q[x]$ and polynomials $u, v$ with $d = u(x^4 - 1) + v(x^3 + 2x^2 + 2x + 1)$.
::: hint
Run Euclid's algorithm and then back-substitute, as for integers.
:::
::: solution
Let $f = x^4 - 1$ and $g = x^3 + 2x^2 + 2x + 1$. Dividing, $f = (x - 2)g + (2x^2 + 3x + 1)$; check: $(x-2)g = x^4 - 2x^2 - 3x - 2$, and $f - (x-2)g = 2x^2 + 3x + 1$. So the first remainder is $r_1 = 2x^2 + 3x + 1 = (2x + 1)(x + 1)$. Next, $g = (x + 1)(x^2 + x + 1)$, and dividing $g$ by $r_1$: $g = \left(\tfrac12x + \tfrac14\right)r_1 + \left(\tfrac34x + \tfrac34\right)$. Then $r_1 = \tfrac43(2x+1)\cdot\tfrac34(x + 1)$ leaves remainder $0$. So the last non-zero remainder is $\tfrac34(x + 1)$, and $d = x + 1$. Back-substituting: $\tfrac34(x+1) = g - \left(\tfrac12x + \tfrac14\right)r_1 = g - \left(\tfrac12x + \tfrac14\right)\bigl(f - (x-2)g\bigr)$, so

$$
x + 1 = -\frac{2x + 1}{3}\,f + \frac{2x^2 - 3x + 2}{3}\,g ,
$$

i.e. $u = -\frac{2x+1}{3}$ and $v = \frac{2x^2 - 3x + 2}{3}$. (Expanding confirms the identity.)
:::
:::

::: exercise An Eisenstein polynomial {level=2}
Prove that $3x^5 + 15x^4 - 20x^3 + 10x + 20$ is irreducible over $\Q$.
::: solution
Take $p = 5$: $5 \nmid 3$; $5$ divides $15$, $-20$, $0$ (the $x^2$ coefficient), $10$ and $20$; and $25 \nmid 20$. By Eisenstein's criterion the polynomial is irreducible over $\Q$.
:::
:::

::: exercise Counting irreducible quadratics {level=2 check="10"}
How many monic irreducible quadratics are there in $\F_5[x]$?
::: hint
Count the monic quadratics that are products of two monic linear factors.
:::
::: solution
There are $5^2 = 25$ monic quadratics $x^2 + bx + c$. A reducible one is $(x - r)(x - s)$; with $r = s$ there are $5$ of these, and with $r \neq s$ there are $\binom52 = 10$ (unordered pairs). So $15$ are reducible and $25 - 15 = 10$ are irreducible. In general there are $p^2 - p - \binom p2 = \frac{p(p-1)}{2}$ monic irreducible quadratics over $\F_p$.
:::
:::

::: exercise Sophie Germain's identity {level=2}
Verify that $x^4 + 4 = (x^2 + 2x + 2)(x^2 - 2x + 2)$, and show that $x^4 + 4$ has no rational root. Why does this not contradict [[#prop-deg23]]?
::: solution
$(x^2 + 2 + 2x)(x^2 + 2 - 2x) = (x^2 + 2)^2 - (2x)^2 = x^4 + 4x^2 + 4 - 4x^2 = x^4 + 4$. Since $x^4 + 4 \ge 4 > 0$ for all real $x$, there is no real (let alone rational) root. [[#prop-deg23]] only applies to degrees $2$ and $3$; a quartic may factor as a product of two quadratics without having any root.
:::
:::

::: exercise x⁴ + 1 modulo every prime {level=3}
Prove that $x^4 + 1$ is reducible over $\F_p$ for every prime $p$, although it is irreducible over $\Q$.
::: hint
Show that one of $-1$, $2$, $-2$ is a square modulo $p$ (for odd $p$), using that the product of two non-squares is a square ([[number-theory/quadratic-reciprocity]]), and find a factorisation in each case.
:::
::: solution
For $p = 2$: $x^4 + 1 = (x + 1)^4$ in $\F_2[x]$. Let $p$ be odd. The non-zero squares form a subgroup of index $2$ in $\F_p^\times$, so the product of two non-squares is a square; hence $-1$, $2$, $-2 = (-1)\cdot 2$ cannot all be non-squares. In each case:

- if $-1 = a^2$: $x^4 + 1 = x^4 - a^2 = (x^2 - a)(x^2 + a)$;
- if $2 = b^2$: $(x^2 + bx + 1)(x^2 - bx + 1) = (x^2 + 1)^2 - b^2x^2 = x^4 + (2 - b^2)x^2 + 1 = x^4 + 1$;
- if $-2 = c^2$: $(x^2 + cx - 1)(x^2 - cx - 1) = (x^2 - 1)^2 - c^2x^2 = x^4 - (2 + c^2)x^2 + 1 = x^4 + 1$.

So $x^4 + 1$ factors modulo every prime. Over $\Q$ it is irreducible because $(x + 1)^4 + 1 = x^4 + 4x^3 + 6x^2 + 4x + 2$ is Eisenstein at $2$.
:::
:::

::: exercise A generator of 𝔽₉ˣ {level=3 check="4"}
In $\F_9 = \F_3[x]/(x^2 + 1)$ (with $i = x + (x^2+1)$), find the orders of $i$ and $1 + i$, and list the elements of order $8$. How many are there?
::: solution
$i^2 = -1$, $i^4 = 1$, so $\ord(i) = 4$. From [[#ex-finite-fields]], $(1 + i)^2 = 2i$, $(1+i)^4 = -1$, so $\ord(1+i) = 8$ and $\F_9^\times = \langle 1 + i\rangle$ is cyclic of order $8$. By [[abstract-algebra/subgroups#thm-order-of-power]], $(1 + i)^k$ has order $8$ exactly when $\gcd(k, 8) = 1$, i.e. $k \in \set{1, 3, 5, 7}$: the elements $(1+i)^1 = 1 + i$, $(1+i)^3 = 1 - i = 1 + 2i$, $(1+i)^5 = -1 - i = 2 + 2i$ and $(1+i)^7 = -1 + i = 2 + i$. There are $\varphi(8) = 4$ of them.
:::
:::

::: exercise Infinitely many irreducibles {level=3}
Prove that for every field $F$ there are infinitely many monic irreducible polynomials in $F[x]$.
::: hint
Imitate Euclid's proof that there are infinitely many primes ([[number-theory/primes]]).
:::
::: solution
Suppose $p_1, \dots, p_k$ were all the monic irreducible polynomials. Let $f = p_1p_2\cdots p_k + 1$, which has degree at least $1$. By [[#thm-poly-ufd]], $f$ has a monic irreducible factor, which must be some $p_j$. But $p_j$ divides $p_1\cdots p_k$, hence divides $f - p_1\cdots p_k = 1$, which is impossible for a polynomial of degree at least $1$. (For infinite $F$ this is obvious, since the $x - a$ are irreducible; the argument matters for finite fields.)
:::
:::
