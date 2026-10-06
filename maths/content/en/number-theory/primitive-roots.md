Euler's theorem says that $a^{\varphi(n)} \equiv 1 \pmod n$, but often a smaller power already gives $1$: modulo $7$, $2^3 = 8 \equiv 1$ although $\varphi(7) = 6$. On the other hand, the powers of $3$ modulo $7$ are $3, 2, 6, 4, 5, 1$ — every non-zero residue appears before $1$ comes back. An element like $3$, whose powers run through all the residues coprime to $n$, is called a **primitive root**. When one exists, multiplication modulo $n$ becomes addition of exponents, and we can take **logarithms** of residues.

This chapter studies the **order** of a residue — the least exponent that gives $1$ — and proves Gauss's theorem that every prime has a primitive root. We will also see exactly which moduli have primitive roots, learn to test candidates quickly, and use **indices** (discrete logarithms) to solve congruences such as $x^5 \equiv 6 \pmod{13}$. Computing discrete logarithms for large primes appears to be extremely hard, and that difficulty is the basis of the Diffie–Hellman key exchange in [[number-theory/cryptography]].

## The order of a residue

::: definition Order modulo n {#def-order-mod}
Let $\gcd(a, n) = 1$. The **order** of $a$ modulo $n$, written $\ord_n(a)$, is the least positive integer $k$ with $a^k \equiv 1 \pmod n$.
:::

The order exists because $a^{\varphi(n)} \equiv 1$ by Euler's theorem. Examples: $\ord_7(2) = 3$ (powers $2, 4, 1$); $\ord_7(3) = 6$; $\ord_{17}(2) = 8$, since $2^4 = 16 \equiv -1$ and so $2^8 \equiv 1$ while no smaller power is $1$; and $\ord_{31}(2) = 5$, since $2^5 = 32 \equiv 1$. In the language of group theory, $\ord_n(a)$ is the order of $a$ in the group $(\Z/n\Z)^\times$ ([[abstract-algebra/subgroups#def-element-order]]).

::: theorem Powers and the order {#thm-order-divides}
Let $\gcd(a, n) = 1$ and $m = \ord_n(a)$. Then

1. $a^k \equiv 1 \pmod n$ if and only if $m \mid k$;
2. $a^i \equiv a^j \pmod n$ if and only if $i \equiv j \pmod m$;
3. $m$ divides $\varphi(n)$; in particular $\ord_p(a)$ divides $p - 1$ for a prime $p \nmid a$.
:::

::: proof
1. If $k = mq$ then $a^k = (a^m)^q \equiv 1$. Conversely, divide: $k = mq + r$ with $0 \le r < m$. Then $1 \equiv a^k = (a^m)^qa^r \equiv a^r$, and the minimality of $m$ forces $r = 0$.

2. For $i \ge j$, $a^i \equiv a^j$ is equivalent (multiplying by the inverse of $a^j$) to $a^{i-j} \equiv 1$, i.e. to $m \mid i - j$ by part 1.

3. Euler's theorem gives $a^{\varphi(n)} \equiv 1$, so $m \mid \varphi(n)$ by part 1.
:::

Part 3 makes orders easy to find: only the divisors of $\varphi(n)$ need testing. For instance, to find $\ord_{41}(10)$ we test the divisors $1, 2, 4, 5, \dots$ of $40$ in turn: $10^1$, $10^2 = 100 \equiv 18$ and $10^4 \equiv 18^2 = 324 \equiv 37$ are not $1$, but $10^5 = 100000 = 41\cdot 2439 + 1 \equiv 1$, so $\ord_{41}(10) = 5$.

::: theorem Order of a power {#thm-order-power}
If $\ord_n(a) = m$, then for every $k \ge 1$

$$
\ord_n\left(a^k\right) = \frac{m}{\gcd(m, k)} .
$$
:::

::: proof
Let $d = \gcd(m, k)$. By [[#thm-order-divides]], $(a^k)^t \equiv 1$ if and only if $m \mid kt$, if and only if $\frac md \mid \frac kd t$, if and only if $\frac md \mid t$ (as $\gcd(\frac md, \frac kd) = 1$, [[number-theory/divisibility#thm-coprime-divides]]). So the least such $t$ is $m/d$.
:::

In particular $a^k$ has the same order as $a$ exactly when $\gcd(k, m) = 1$.

::: example Periods of repeating decimals {#ex-decimal-periods}
For a prime $p \ne 2, 5$, show that the decimal expansion of $\frac 1p$ repeats with period exactly $\ord_p(10)$, and find the periods for $p = 7, 13, 17, 37, 41$.
::: solution
If $10^k \equiv 1 \pmod p$, then $\frac1p = \frac{m}{10^k - 1}$ with $m = (10^k - 1)/p$, and the expansion repeats the $k$-digit block of $m$ ([[number-theory/fermat-euler#ex-decimal-period]]). Conversely, if the expansion is purely periodic with period $k$, then $10^k\cdot\frac1p - \frac1p$ is an integer, so $p \mid 10^k - 1$. So the period is the least $k$ with $10^k \equiv 1$, which is $\ord_p(10)$. Computing:

| $p$ | $7$ | $13$ | $17$ | $37$ | $41$ |
|---|---|---|---|---|---|
| $\ord_p(10)$ | $6$ | $6$ | $16$ | $3$ | $5$ |
| $\frac1p$ | $0.\overline{142857}$ | $0.\overline{076923}$ | $0.\overline{0588235294117647}$ | $0.\overline{027}$ | $0.\overline{02439}$ |

For $37$, $10^3 = 1000 = 27\cdot 37 + 1$, so the period is just $3$. When $\ord_p(10) = p - 1$, as for $7$ and $17$, the period is as long as possible.
:::
:::

::: quiz
What is $\ord_{17}(2)$?
- [ ] $4$
- [x] $8$
- [ ] $16$
- [ ] $17$
::: solution
$2^4 = 16 \equiv -1 \pmod{17}$, so $2^8 \equiv 1$; and the order must divide $16$ and is not $1, 2$ or $4$ (since $2^1, 2^2, 2^4 \not\equiv 1$). Hence $\ord_{17}(2) = 8$.
:::
:::

## Primitive roots

::: definition Primitive root {#def-primitive-root}
An integer $g$ with $\gcd(g, n) = 1$ is a **primitive root** modulo $n$ if $\ord_n(g) = \varphi(n)$.
:::

If $g$ is a primitive root, the powers $g, g^2, \dots, g^{\varphi(n)}$ are pairwise incongruent by [[#thm-order-divides]], and all coprime to $n$, so they form a reduced residue system: **every** residue coprime to $n$ is a power of $g$. In group language, $(\Z/n\Z)^\times$ is cyclic, generated by $g$. For example $3$ is a primitive root modulo $7$, and $2$ is a primitive root modulo $13$:

$$
2^1, 2^2, \dots, 2^{12} \equiv 2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, 1 \pmod{13}.
$$

By [[#thm-order-power]] the primitive roots modulo $13$ are the powers $2^k$ with $\gcd(k, 12) = 1$, namely $2^1 = 2$, $2^5 \equiv 6$, $2^7 \equiv 11$ and $2^{11} \equiv 7$. In general, if a primitive root exists modulo $n$, there are exactly $\varphi(\varphi(n))$ of them.

Primitive roots do not always exist. Modulo $8$, the units $1, 3, 5, 7$ all satisfy $a^2 \equiv 1$ (since $9, 25, 49 \equiv 1$), so no element has order $\varphi(8) = 4$.

::: widget modular
n: 13
mode: powers
a: 2
caption: The powers of each residue modulo $13$. The rows of $2, 6, 7, 11$ reach $1$ only at the twelfth power: these are the $\varphi(12) = 4$ primitive roots, and each of their rows lists all twelve non-zero residues. Every other residue has an order that is a proper divisor of $12$: for example $3$ has order $3$ ($3, 9, 1$) and $12 \equiv -1$ has order $2$.
:::

### Polynomial congruences modulo a prime

The existence of primitive roots modulo a prime rests on a fact about polynomials.

::: theorem Lagrange's theorem on polynomial congruences {#thm-lagrange-poly}
Let $p$ be prime and $f(x) = c_dx^d + \dots + c_1x + c_0$ a polynomial with integer coefficients and $p \nmid c_d$. Then the congruence $f(x) \equiv 0 \pmod p$ has at most $d$ solutions modulo $p$.
:::

::: proof
Induction on $d$. For $d = 0$, $f = c_0 \not\equiv 0$ has no solutions. Let $d \ge 1$, and suppose $a$ is a solution (otherwise there is nothing to prove). Since $x^k - a^k = (x - a)(x^{k-1} + x^{k-2}a + \dots + a^{k-1})$ for each $k$,

$$
f(x) - f(a) = \sum_k c_k(x^k - a^k) = (x - a)g(x)
$$

for a polynomial $g$ with integer coefficients, of degree $d - 1$ and leading coefficient $c_d$. If $b$ is any solution, then $(b - a)g(b) \equiv f(b) - f(a) \equiv 0 \pmod p$, so by Euclid's lemma $b \equiv a$ or $g(b) \equiv 0$. By induction $g$ has at most $d - 1$ roots, so $f$ has at most $d$.
:::

This is the root bound for polynomials over the field $\F_p$ ([[abstract-algebra/polynomials#cor-root-count]]). It fails for composite moduli: $x^2 \equiv 1 \pmod 8$ has the four solutions $1, 3, 5, 7$.

::: corollary {#cor-xd-roots}
If $p$ is prime and $d \mid p - 1$, then $x^d \equiv 1 \pmod p$ has exactly $d$ solutions.
:::

::: proof
Write $p - 1 = de$. Then $x^{p-1} - 1 = (x^d - 1)h(x)$ with $h(x) = x^{d(e-1)} + x^{d(e-2)} + \dots + x^d + 1$, of degree $p - 1 - d$. By Fermat, $x^{p-1} - 1$ has the $p - 1$ roots $1, \dots, p - 1$; each is a root of $x^d - 1$ or of $h$ (Euclid's lemma). By Lagrange's theorem $h$ has at most $p - 1 - d$ roots, so $x^d - 1$ has at least $d$, and at most $d$.
:::

### Existence of primitive roots modulo primes

::: theorem Primitive roots modulo primes {#thm-primitive-root-prime}
Let $p$ be prime. For every divisor $d$ of $p - 1$ there are exactly $\varphi(d)$ residues of order $d$ modulo $p$. In particular there are exactly $\varphi(p - 1)$ primitive roots modulo $p$, and at least one.
:::

::: proof
For $d \mid p - 1$ let $\psi(d)$ be the number of residues in $\set{1, \dots, p-1}$ of order $d$. Every residue has some order dividing $p - 1$, so

$$
\sum_{d\mid p-1}\psi(d) = p - 1 .
$$

*Claim: $\psi(d) \le \varphi(d)$.* If $\psi(d) = 0$ this is clear. Otherwise let $a$ have order $d$. Its powers $1, a, a^2, \dots, a^{d-1}$ are $d$ distinct solutions of $x^d \equiv 1$, and by Lagrange's theorem there are no others. Any element of order $d$ satisfies $x^d \equiv 1$, so it is one of these powers, $a^k$; by [[#thm-order-power]] it has order $d$ exactly when $\gcd(k, d) = 1$. Hence $\psi(d) = \varphi(d)$ in this case.

Now by Gauss's identity ([[number-theory/fermat-euler#thm-phi-sum]]),

$$
p - 1 = \sum_{d\mid p-1}\psi(d) \le \sum_{d \mid p-1}\varphi(d) = p - 1,
$$

so equality must hold in every term: $\psi(d) = \varphi(d)$ for all $d \mid p - 1$. Taking $d = p - 1$ gives $\varphi(p - 1) \ge 1$ primitive roots.
:::

The proof is an existence proof: it does not say *which* residues are primitive roots. In practice one tests small candidates with the following criterion.

::: theorem Primitive root test {#thm-primitive-root-test}
Let $p$ be prime and $p \nmid g$. Then $g$ is a primitive root modulo $p$ if and only if

$$
g^{(p-1)/q} \not\equiv 1 \pmod p \qquad\text{for every prime } q \mid p - 1 .
$$
:::

::: proof
If $g$ is a primitive root, no exponent smaller than $p - 1$ gives $1$, in particular none of the $(p-1)/q$. Conversely, suppose $m = \ord_p(g) < p - 1$. Since $m \mid p - 1$, the quotient $(p-1)/m > 1$ has some prime factor $q$, and then $m$ divides $(p-1)/q$, so $g^{(p-1)/q} \equiv 1$ by [[#thm-order-divides]].
:::

::: example Primitive roots modulo 23 {#ex-primitive-23}
Find the smallest primitive root modulo $23$, and the number of primitive roots.
::: solution
$p - 1 = 22 = 2\cdot 11$, so $g$ is a primitive root if and only if $g^{11} \not\equiv 1$ and $g^2 \not\equiv 1$. For $g = 2$: $2^{11} = 2048 = 89\cdot 23 + 1 \equiv 1$, so $2$ fails (its order is $11$). For $g = 3$: $3^3 = 27 \equiv 4$, $3^9 \equiv 4^3 = 64 \equiv 18$, $3^{11} = 3^9\cdot 9 \equiv 162 \equiv 1$; so $3$ fails. $g = 4 = 2^2$ fails too (its order divides that of $2$). For $g = 5$: $5^2 = 25 \equiv 2$, so $5^{11} = 5\cdot(5^2)^5 \equiv 5\cdot 2^5 = 160 = 6\cdot 23 + 22 \equiv -1$. Since $5^{11} \not\equiv 1$ and $5^2 \not\equiv 1$, the smallest primitive root modulo $23$ is $5$, and there are $\varphi(22) = 10$ primitive roots in all. They are the powers $5^k$ with $\gcd(k, 22) = 1$, which work out to $5, 7, 10, 11, 14, 15, 17, 19, 20, 21$; the other residues are either $1$, $22$, or of order $11$.
:::
:::

::: widget modular
n: 23
mode: powers
a: 5
caption: Powers modulo $23$. The row of $5$ runs through all $22$ non-zero residues before returning to $1$, so $5$ is a primitive root, while the rows of $2$ and $3$ return to $1$ after $11$ steps: they lie in the subgroup of index $2$ (the quadratic residues). Since $22 = 2 \cdot 11$, every order is $1$, $2$, $11$ or $22$; check that $22 \equiv -1$ is the only element of order $2$.
:::

The least primitive roots of the first primes are:

| $p$ | $3$ | $5$ | $7$ | $11$ | $13$ | $17$ | $19$ | $23$ | $29$ | $31$ | $37$ | $41$ | $43$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| least $g$ | $2$ | $2$ | $3$ | $2$ | $2$ | $3$ | $2$ | $5$ | $2$ | $3$ | $2$ | $6$ | $3$ |

The least primitive root is usually very small — in numerical experiments it is $2$ for about $37\%$ of primes — but it has no simple pattern, and no formula for it is known. In practice one tests $g = 2, 3, 5, 6, \dots$ with [[#thm-primitive-root-test]], which requires knowing the prime factors of $p - 1$; this is one reason why cryptographic software often chooses primes $p$ for which $p - 1 = 2q$ with $q$ prime: then only two conditions need checking.

::: quiz
How many primitive roots are there modulo $23$?
- [ ] $1$
- [ ] $5$
- [x] $10$
- [ ] $22$
::: solution
By [[#thm-primitive-root-prime]] there are $\varphi(p - 1) = \varphi(22) = \varphi(2)\varphi(11) = 10$ primitive roots modulo $23$; they are $5^k$ for the ten $k \in \set{1, \dots, 21}$ coprime to $22$.
:::
:::

## Which moduli have primitive roots?

::: theorem Classification {#thm-primitive-root-classification}
A primitive root modulo $n \ge 2$ exists if and only if $n = 2$, $4$, $p^k$ or $2p^k$ for an odd prime $p$ and $k \ge 1$.
:::

::: proof
*Non-existence.* We show that in the remaining cases every unit $a$ satisfies $a^e \equiv 1$ for some $e < \varphi(n)$.

(i) $n = 2^k$ with $k \ge 3$. We claim $a^{2^{k-2}} \equiv 1 \pmod{2^k}$ for every odd $a$. For $k = 3$: odd squares are $\equiv 1 \pmod 8$. If $a^{2^{k-2}} = 1 + 2^kt$, then squaring gives $a^{2^{k-1}} = 1 + 2^{k+1}t + 2^{2k}t^2 \equiv 1 \pmod{2^{k+1}}$, completing the induction. Since $2^{k-2} < 2^{k-1} = \varphi(2^k)$, no primitive root exists.

(ii) $n = n_1n_2$ with $\gcd(n_1, n_2) = 1$ and $n_1, n_2 > 2$. Then $\varphi(n_1)$ and $\varphi(n_2)$ are both even ([[number-theory/fermat-euler#exr-4-7]]). Let $e = \varphi(n_1)\varphi(n_2)/2 = \varphi(n)/2$. Since $\varphi(n_1) \mid e$ and $\varphi(n_2) \mid e$, Euler's theorem gives $a^e \equiv 1$ modulo $n_1$ and modulo $n_2$, hence modulo $n$.

Every $n$ not in the list falls under (i) or (ii): if $n = 2^am$ with $m$ odd, then either $m = 1$ and $a \ge 3$ (case (i)); or $m$ has two distinct prime factors $p, q$, and $n = p^{v_p(n)}\cdot\frac{n}{p^{v_p(n)}}$ with both factors greater than $2$; or $m = p^k$ and $a \ge 2$, so $n = 2^a\cdot p^k$ with $2^a \ge 4$. (The remaining cases, $m = 1$ with $a = 1, 2$ and $m = p^k$ with $a = 0, 1$, give $n = 2, 4, p^k, 2p^k$, which are in the list.)

*Existence* (sketch). For $n = 2, 4$ the residues $1$ and $3$ work. For an odd prime $p$, take a primitive root $g$ modulo $p$. One checks that $g$ or $g + p$ satisfies $g^{p-1} \not\equiv 1 \pmod{p^2}$, and that such a $g$ is a primitive root modulo every power $p^k$: its order modulo $p^k$ is a multiple of $p - 1$ dividing $p^{k-1}(p-1)$, and an induction like the one in (i) shows $g^{p^{k-2}(p-1)} \not\equiv 1 \pmod{p^k}$. Finally, a primitive root modulo $p^k$ that is odd (replace $g$ by $g + p^k$ if necessary) is a primitive root modulo $2p^k$, because $\varphi(2p^k) = \varphi(p^k)$. Full details are in Niven, Zuckerman and Montgomery, §2.8, or Ireland and Rosen, Chapter 4.
:::

In group-theoretic terms, $(\Z/n\Z)^\times$ is cyclic exactly for these $n$; otherwise it is a product of several cyclic groups, for instance $U(15) \cong \Z_2 \times \Z_4$ and $U(8) \cong \Z_2\times\Z_2$. For example $2$ is a primitive root modulo $3$, $9$ and $27$ (its orders are $2$, $6$, $18$), and its odd lifts $11$ and $29$ are primitive roots modulo $18$ and $54$. But there is no primitive root modulo $8$, $12$, $15$ or $16$. When no primitive root exists, the largest possible order of a unit is the **Carmichael function** $\lambda(n)$, a proper divisor of $\varphi(n)$; for instance $\lambda(8) = 2$ and $\lambda(15) = \lcm(2, 4) = 4$.

::: widget cayley
group: U
n: 8
mode: table
caption: The multiplication table of $U(8) = \set{1, 3, 5, 7}$. Every element is its own inverse — the diagonal is all $1$s — so no element has order $4 = \varphi(8)$ and there is no primitive root modulo $8$. The group is the Klein four-group, not the cyclic group $\Z_4$; compare $U(10)$ or $U(5)$, which are cyclic.
:::

::: warning Primitive roots modulo p need not work modulo p²
A primitive root modulo $p$ is not automatically a primitive root modulo $p^2$. The smallest example is $p = 29$, $g = 14$: $14$ is a primitive root modulo $29$, but $14^{28} \equiv 1 \pmod{29^2}$, so its order modulo $841$ is only $28$ instead of $\varphi(841) = 812$. This is why the existence proof for $p^k$ may need to replace $g$ by $g + p$.
:::

## Indices and discrete logarithms

A primitive root turns multiplication into addition, just as logarithms do for real numbers.

::: definition Index {#def-index}
Let $g$ be a primitive root modulo $n$ and $\gcd(a, n) = 1$. The **index** (or **discrete logarithm**) of $a$ to base $g$, written $\operatorname{ind}_g(a)$, is the unique integer $k$ with $0 \le k < \varphi(n)$ and $g^k \equiv a \pmod n$.
:::

::: proposition Laws of indices {#prop-index-laws}
For $a, b$ coprime to $n$ and $k \ge 0$:

$$
\operatorname{ind}_g(ab) \equiv \operatorname{ind}_g(a) + \operatorname{ind}_g(b), \qquad \operatorname{ind}_g(a^k) \equiv k\operatorname{ind}_g(a) \pmod{\varphi(n)}, \qquad \operatorname{ind}_g(1) = 0 .
$$

Also $a \equiv b \pmod n$ if and only if $\operatorname{ind}_g(a) = \operatorname{ind}_g(b)$.
:::

::: proof
$g^{\operatorname{ind}a + \operatorname{ind}b} = g^{\operatorname{ind} a}g^{\operatorname{ind}b} \equiv ab \equiv g^{\operatorname{ind}(ab)}$, so the exponents agree modulo $\ord_n(g) = \varphi(n)$ by [[#thm-order-divides]]. The rule for powers follows by induction, and the last statement holds because distinct exponents in $[0, \varphi(n))$ give distinct powers.
:::

With $g = 2$ modulo $13$, reading the list of powers above backwards gives the table of indices:

| $a$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $\operatorname{ind}_2(a)$ | $0$ | $1$ | $4$ | $2$ | $9$ | $5$ | $11$ | $3$ | $8$ | $10$ | $7$ | $6$ |

::: example Solving congruences with indices {#ex-indices}
Using the table, solve modulo $13$: (a) $x^5 \equiv 6$; (b) $x^2 \equiv 10$; (c) $3^x \equiv 5$; (d) $6^x \equiv 5$.
::: solution
(a) Taking indices, $5\operatorname{ind}(x) \equiv \operatorname{ind}(6) = 5 \pmod{12}$. Since $5\cdot 5 = 25 \equiv 1 \pmod{12}$, multiply by $5$: $\operatorname{ind}(x) \equiv 25 \equiv 1$, so $x \equiv 2$. Check: $2^5 = 32 \equiv 6$.

(b) $2\operatorname{ind}(x) \equiv \operatorname{ind}(10) = 10 \pmod{12}$, so $\operatorname{ind}(x) \equiv 5 \pmod 6$, i.e. $\operatorname{ind}(x) \in \set{5, 11}$: $x \equiv 2^5 \equiv 6$ or $x \equiv 2^{11} \equiv 7$. Check: $36 \equiv 10$ and $49 \equiv 10$.

(c) $x\operatorname{ind}(3) \equiv \operatorname{ind}(5)$, i.e. $4x \equiv 9 \pmod{12}$. Since $\gcd(4, 12) = 4 \nmid 9$, there is no solution — indeed the powers of $3$ are just $3, 9, 1$.

(d) $5x \equiv 9 \pmod{12}$, so $x \equiv 5\cdot 9 = 45 \equiv 9 \pmod{12}$. Check: $6^9 \equiv 5 \pmod{13}$.
:::
:::

::: intuition Logarithms on a clock
A primitive root sets up a dictionary between two clocks: multiplication of the non-zero residues modulo $p$ and addition of exponents modulo $p - 1$. The index is the "logarithm" that translates one into the other, just as $\log(xy) = \log x + \log y$ translates multiplication of positive reals into addition. With a table of indices, every multiplicative question modulo $p$ — powers, roots, solving $a^x \equiv b$ — becomes a linear congruence modulo $p - 1$, which [[number-theory/congruences#thm-linear-congruence]] solves completely. The catch is building the table: it requires listing all $p - 1$ powers.
:::

**The discrete logarithm problem.** For a large prime $p$ and a primitive root $g$, computing $g^x \bmod p$ is fast (by repeated squaring, [[number-theory/cryptography]]), but no efficient method is known for the reverse problem: given $h$, find $x$ with $g^x \equiv h$. Trying all exponents takes about $p$ steps. A cleverer algorithm reduces this to about $\sqrt p$ steps — still hopeless when $p$ has hundreds of digits.

::: algorithm Baby-step giant-step {#alg-bsgs}
Input: a prime $p$, a primitive root $g$ and $h \not\equiv 0$. Let $m = \lceil\sqrt{p - 1}\,\rceil$.

1. (*Baby steps*) Compute and store $g^j \bmod p$ for $j = 0, 1, \dots, m - 1$.
2. (*Giant steps*) For $i = 0, 1, \dots, m$, compute $y_i = h\cdot g^{-im} \bmod p$ and stop as soon as $y_i$ equals a stored $g^j$.
3. Output $x = im + j$; then $g^x \equiv h$.
:::

It works because every $x \in [0, p-1)$ can be written as $x = im + j$ with $0 \le j < m$ and $0 \le i \le m$, and $g^{im + j} \equiv h$ is equivalent to $g^j \equiv hg^{-im}$. The work is about $2\sqrt p$ multiplications plus table look-ups, and the memory is about $\sqrt p$ stored numbers.

::: example A discrete logarithm modulo 23 {#ex-bsgs}
Solve $5^x \equiv 11 \pmod{23}$ by baby-step giant-step.
::: solution
Here $p - 1 = 22$ and $m = 5$. Baby steps: $5^0, 5^1, 5^2, 5^3, 5^4 \equiv 1, 5, 2, 10, 4$. For the giant steps we need $5^{-5}$: since $5^5 \equiv 20$ and $20\cdot 15 = 300 = 13\cdot 23 + 1$, $5^{-5} \equiv 15$. Then $y_0 = 11$, which is not in the table; $y_1 = 11\cdot 15 = 165 \equiv 4$, which is $5^4$. So $x = 1\cdot 5 + 4 = 9$. Check: $5^9 = 5^4\cdot 5^4\cdot 5 \equiv 4\cdot4\cdot 5 = 80 \equiv 11 \pmod{23}$.
:::
:::

::: application Primitive roots in practice
Diffie–Hellman key exchange ([[number-theory/cryptography]]) publishes a large prime $p$ and a generator $g$ of a large subgroup of $(\Z/p\Z)^\times$; its security depends on the discrete logarithm problem being hard. Primitive roots also give fast pseudo-random number generators of the form $x_{k+1} = gx_k \bmod p$, whose period is $p - 1$ exactly when $g$ is a primitive root, and they are used to design sequences with good correlation properties for radar and acoustics.
:::

::: remark Artin's conjecture
Is $2$ a primitive root modulo infinitely many primes? Is $10$ — that is, are there infinitely many primes $p$ for which $1/p$ has the maximal period $p - 1$ (such as $7, 17, 19, 23, 29, 47, 59, 61, 97$)? Emil Artin conjectured in 1927 that every integer other than $-1$ that is not a perfect square is a primitive root modulo infinitely many primes, with a predicted density. Christopher Hooley proved this in 1967 assuming the generalised Riemann hypothesis, and Roger Heath-Brown showed unconditionally in 1986 that there are at most two exceptional primes; so at least one of $2$, $3$, $5$ is a primitive root modulo infinitely many primes — but nobody knows which.
:::

::: history
Leonhard Euler introduced the term "primitive root" in 1773 and gave an argument for their existence modulo primes that was incomplete. Adrien-Marie Legendre also attempted a proof (1785). The first complete proofs are in Gauss's *Disquisitiones Arithmeticae* (1801), which gives two of them and also determines exactly which moduli have primitive roots. Gauss used indices systematically, and in 1839 Carl Gustav Jacob Jacobi published the *Canon Arithmeticus*, tables of indices for all primes below $1000$, which served as "logarithm tables" for modular arithmetic.
:::

## Where this leads

Primitive roots give a quick route to the next chapter: $a$ is a square modulo $p$ exactly when its index is even, which leads to Euler's criterion in [[number-theory/quadratic-reciprocity]]. The hardness of discrete logarithms underlies the Diffie–Hellman key exchange in [[number-theory/cryptography]], and also the ElGamal cryptosystem built from it. In abstract algebra, the existence of primitive roots modulo $p$ is the statement that $U(p)$ is cyclic, a special case of the theorem that the multiplicative group of every finite field is cyclic ([[abstract-algebra/fields-galois#thm-cyclic-mult]]).

::: summary
- $\ord_n(a)$ is the least $k \ge 1$ with $a^k \equiv 1$; $a^k \equiv 1$ iff $\ord_n(a) \mid k$, and $\ord_n(a) \mid \varphi(n)$ ([[#thm-order-divides]]).
- $\ord(a^k) = \ord(a)/\gcd(\ord(a), k)$; the period of $1/p$ is $\ord_p(10)$.
- **Lagrange**: a polynomial congruence of degree $d$ modulo a prime has at most $d$ solutions; $x^d \equiv 1$ has exactly $d$ when $d \mid p - 1$.
- **Every prime has a primitive root**; there are exactly $\varphi(d)$ residues of order $d$ for each $d \mid p-1$, so $\varphi(p-1)$ primitive roots.
- $g$ is a primitive root mod $p$ iff $g^{(p-1)/q} \not\equiv 1$ for every prime $q \mid p - 1$.
- Primitive roots exist exactly for $n = 2, 4, p^k, 2p^k$ ($p$ odd); none modulo $8$ or modulo numbers with two distinct odd prime factors.
- **Indices** (discrete logarithms) turn multiplication into addition modulo $\varphi(n)$ and solve congruences like $x^k \equiv a$ and $a^x \equiv b$; computing them for large $p$ is believed hard, and baby-step giant-step takes about $\sqrt p$ steps.
:::

## Exercises

::: exercise An order modulo 11 {level=1 check="5"}
Find $\ord_{11}(3)$.
::: solution
The order divides $10$. $3^1 = 3$, $3^2 = 9$, $3^5 = 243 = 22\cdot 11 + 1 \equiv 1$. So $\ord_{11}(3) = 5$.
:::
:::

::: exercise Counting primitive roots {level=1 check="8"}
How many primitive roots are there modulo $31$?
::: solution
$\varphi(30) = \varphi(2)\varphi(3)\varphi(5) = 1\cdot 2\cdot 4 = 8$.
:::
:::

::: exercise A decimal period {level=1 check="5"}
What is the period of the decimal expansion of $\frac1{41}$?
::: solution
By [[#ex-decimal-periods]] it is $\ord_{41}(10)$. The divisors of $40$ are $1, 2, 4, 5, 8, \dots$; $10^1, 10^2 \equiv 18, 10^4 \equiv 18^2 = 324 \equiv 37$ are not $1$, but $10^5 = 100000 = 2439\cdot 41 + 1 \equiv 1$. So the period is $5$: $\frac1{41} = 0.\overline{02439}$.
:::
:::

::: exercise The least primitive root modulo 41 {level=2 check="6"}
Find the smallest primitive root modulo $41$.
::: hint
$40 = 2^3\cdot 5$, so test $g^{20}$ and $g^8$.
:::
::: solution
By [[#thm-primitive-root-test]], $g$ is a primitive root if and only if $g^{20} \not\equiv 1$ and $g^{8} \not\equiv 1 \pmod{41}$. For $g = 2$: $2^{10} = 1024 = 24\cdot 41 + 40 \equiv -1$, so $2^{20} \equiv 1$; fails. For $g = 3$: $3^4 = 81 \equiv -1$, so $3^8 \equiv 1$; fails. $g = 4 = 2^2$ fails since $2$ does. For $g = 5$: $5^2 = 25$, $5^4 \equiv 625 \equiv 10$, $5^5 \equiv 50 \equiv 9$, $5^{10} \equiv 81 \equiv -1$, so $5^{20} \equiv 1$; fails. For $g = 6$: $6^2 = 36 \equiv -5$, $6^4 \equiv 25$, $6^8 \equiv 625 \equiv 10 \not\equiv 1$; and $6^{20} = 6^{16}\cdot 6^4 \equiv 100\cdot 25 \equiv 18\cdot 25 = 450 \equiv 40 \equiv -1 \not\equiv 1$. So $6$ is the smallest primitive root modulo $41$.
:::
:::

::: exercise Cube roots modulo 13 {level=2 check="3"}
Solve $x^3 \equiv 5 \pmod{13}$ using the table of indices to base $2$. How many solutions are there?
::: solution
$3\operatorname{ind}(x) \equiv \operatorname{ind}(5) = 9 \pmod{12}$. Since $\gcd(3, 12) = 3 \mid 9$, there are $3$ solutions: $\operatorname{ind}(x) \equiv 3 \pmod 4$, i.e. $\operatorname{ind}(x) \in \set{3, 7, 11}$, so $x \equiv 8, 11, 7$. Check: $8^3 = 512 = 39\cdot 13 + 5$, $11^3 = 1331 = 102\cdot 13 + 5$, $7^3 = 343 = 26\cdot 13 + 5$.
:::
:::

::: exercise Half the order gives −1 {level=2}
Let $p$ be an odd prime and $g$ a primitive root modulo $p$. Prove that $g^{(p-1)/2} \equiv -1 \pmod p$, and deduce that a primitive root is never congruent to a perfect square.
::: solution
Let $y = g^{(p-1)/2}$. Then $y^2 = g^{p-1} \equiv 1$, so $y \equiv \pm 1$ by [[number-theory/fermat-euler#lem-square-roots-one]]. But $y \not\equiv 1$ because $(p-1)/2 < p - 1 = \ord_p(g)$. Hence $y \equiv -1$. If $g \equiv x^2$, then $g^{(p-1)/2} \equiv x^{p-1} \equiv 1$ by Fermat, a contradiction.
:::
:::

::: exercise The order of 2 modulo 27 {level=2 check="18"}
Find $\ord_{27}(2)$ and decide whether $2$ is a primitive root modulo $27$.
::: solution
$\varphi(27) = 18$, so the order divides $18$; by [[#thm-primitive-root-test]]-style reasoning it suffices to check $2^9$ and $2^6$. $2^6 = 64 \equiv 10 \pmod{27}$, and $2^9 = 512 = 18\cdot 27 + 26 \equiv -1$. Neither is $1$, so the order is $18$ and $2$ is a primitive root modulo $27$ (consistent with [[#thm-primitive-root-classification]]: $27 = 3^3$).
:::
:::

::: exercise The product of the primitive roots {level=3}
Let $p > 3$ be prime. Prove that the product of all the primitive roots modulo $p$ is $\equiv 1 \pmod p$.
::: solution
If $g$ is a primitive root, so is its inverse $g^{-1} \equiv g^{p-2}$, since $\gcd(p - 2, p - 1) = 1$ ([[#thm-order-power]]). Moreover $g \not\equiv g^{-1}$, since $g^2 \equiv 1$ would give $\ord_p(g) \le 2 < p - 1$. So the primitive roots split into pairs $\set{g, g^{-1}}$, each with product $1$, and the total product is $\equiv 1$. (For $p = 3$ the only primitive root is $2 \equiv -1$, which is its own inverse.)
:::
:::

::: exercise The negative of a primitive root {level=3}
Let $p \equiv 1 \pmod 4$ be prime and $g$ a primitive root modulo $p$. Prove that $-g$ is also a primitive root. Is this true for $p \equiv 3 \pmod 4$?
::: solution
By [[#exr-5-6]], $-1 \equiv g^{(p-1)/2}$, so $-g \equiv g^{(p+1)/2}$. By [[#thm-order-power]], $\ord_p(-g) = \frac{p-1}{\gcd(p-1, (p+1)/2)}$. Any common divisor of $p - 1$ and $\frac{p+1}2$ divides $2\cdot\frac{p+1}{2} - (p - 1) = 2$; and when $p \equiv 1 \pmod 4$, $\frac{p+1}{2}$ is odd, so the gcd is $1$ and $-g$ is a primitive root. For $p \equiv 3 \pmod 4$, $\frac{p+1}2$ is even and the gcd is $2$, so $-g$ has order $\frac{p-1}{2}$ and is **not** a primitive root; for example $3$ is a primitive root modulo $7$, but $-3 \equiv 4$ has order $3$.
:::
:::

::: exercise Baby steps and giant steps {level=3 check="19"}
Use baby-step giant-step with $m = 5$ to solve $5^x \equiv 7 \pmod{23}$, and check your answer.
::: hint
Reuse the baby-step table $5^0, \dots, 5^4 \equiv 1, 5, 2, 10, 4$ and the giant-step multiplier $5^{-5} \equiv 15$ from [[#ex-bsgs]].
:::
::: solution
Giant steps: $y_0 = 7$ (not in the table), $y_1 = 7\cdot 15 = 105 \equiv 13$, $y_2 = 13\cdot 15 = 195 \equiv 11$, $y_3 = 11\cdot 15 = 165 \equiv 4 = 5^4$. So $x = 3\cdot 5 + 4 = 19$. Check by repeated squaring: $5^2 \equiv 2$, $5^4 \equiv 4$, $5^8 \equiv 16$, $5^{16} \equiv 256 \equiv 3$, so $5^{19} = 5^{16}\cdot 5^2\cdot 5 \equiv 3\cdot 2\cdot 5 = 30 \equiv 7 \pmod{23}$. As $5$ is a primitive root, the solution is unique modulo $22$: $x \equiv 19$.
:::
:::
