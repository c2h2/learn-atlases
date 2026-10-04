Compute the sixth powers of $1, 2, 3, 4, 5, 6$ modulo $7$: $1^6 = 1$, $2^6 = 64 = 9\cdot 7 + 1$, $3^6 = 729 = 104\cdot 7 + 1$, and so on — every one of them is $\equiv 1 \pmod 7$. Try tenth powers modulo $11$ and the same thing happens. Pierre de Fermat noticed this pattern in 1640: for a prime $p$ and any $a$ not divisible by $p$, $a^{p-1} \equiv 1 \pmod p$. This "little theorem" (as opposed to his famous "last" one) is perhaps the most useful single fact in elementary number theory. It makes enormous powers easy to reduce, it underlies the fastest practical primality tests, and it is the reason RSA decryption works.

In this chapter we give two proofs of Fermat's theorem, then follow Euler in extending it to composite moduli. This requires **Euler's totient function** $\varphi(n)$, which counts the residues coprime to $n$; we derive a formula for it from the factorisation of $n$, using the Chinese remainder theorem. The chapter ends with **Wilson's theorem**, $(p-1)! \equiv -1 \pmod p$, which characterises the primes and tells us exactly when $-1$ is a square modulo $p$.

## Fermat's little theorem

::: theorem Fermat's little theorem {#thm-fermat}
Let $p$ be prime. If $p \nmid a$, then

$$
a^{p-1} \equiv 1 \pmod p .
$$

Consequently $a^p \equiv a \pmod p$ for **every** integer $a$.
:::

::: proof
*First proof (rearrangement).* Since $\gcd(a, p) = 1$, multiplication by $a$ permutes the non-zero residues modulo $p$ ([[number-theory/congruences#prop-unit-permutes]]): the numbers $a, 2a, 3a, \dots, (p-1)a$ are congruent, in some order, to $1, 2, \dots, p - 1$. Multiplying each list together,

$$
a\cdot 2a\cdot 3a \cdots (p-1)a \equiv 1\cdot 2\cdot 3\cdots(p-1) \pmod p, \qquad\text{i.e.}\qquad a^{p-1}(p-1)! \equiv (p-1)! \pmod p .
$$

The factor $(p-1)!$ is coprime to $p$ (no factor is divisible by $p$), so we may cancel it ([[number-theory/congruences#prop-cancel]]) to get $a^{p-1} \equiv 1$. Multiplying by $a$ gives $a^p \equiv a$; and if $p \mid a$, both sides of $a^p \equiv a$ are $\equiv 0$.
:::

::: intuition Shuffling a deck
Think of the non-zero residues $1, \dots, p-1$ as a deck of cards. Multiplying every card by $a$ does not lose or duplicate any card — it only shuffles the deck. So the product of all the cards is unchanged, while it has also been multiplied by $a$ once for every card, that is $p - 1$ times. The only way both can be true is $a^{p-1} \equiv 1$. The same argument, with the cards coprime to $n$, gives Euler's theorem below.
:::

The second proof is quite different and shows *why* primes are special in another way.

::: lemma Binomial coefficients modulo p {#lem-binomial-p}
If $p$ is prime and $0 < k < p$, then $p \mid \binom pk$. Consequently $(a + b)^p \equiv a^p + b^p \pmod p$ for all integers $a, b$.
:::

::: proof
$\binom pk = \dfrac{p!}{k!\,(p-k)!}$ is an integer, and $p$ divides the numerator $p!$. The denominator is a product of numbers smaller than $p$, none divisible by $p$, so by Euclid's lemma ([[number-theory/primes#thm-euclid-lemma]]) $p$ does not divide it. Since $p \mid k!(p-k)!\binom pk$ and $p \nmid k!(p-k)!$, Euclid's lemma gives $p \mid \binom pk$. In the binomial expansion of $(a+b)^p$ every term except $a^p$ and $b^p$ therefore vanishes modulo $p$.
:::

*Second proof of Fermat's theorem (induction).* We show $a^p \equiv a$ for $a \ge 0$ by induction. For $a = 0$ it is clear. If $a^p \equiv a$, then by the lemma $(a + 1)^p \equiv a^p + 1 \equiv a + 1$. Negative $a$ follow because $a^p \equiv a$ depends only on $a \bmod p$. Finally, if $p \nmid a$ we cancel $a$ from $a^p \equiv a$. $\blacksquare$

The congruence $(a + b)^p \equiv a^p + b^p$ is sometimes called the "freshman's dream", because it is exactly the mistake students make with ordinary numbers — but modulo $p$ it is correct.

::: remark A third proof: counting necklaces
Fermat's theorem also has a combinatorial proof. There are $a^p - a$ ways to colour $p$ beads arranged in a circle with $a$ colours if we exclude the $a$ one-colour arrangements. Rotating the circle by one place splits these colourings into groups of exactly $p$, because $p$ is prime: a colouring that returned to itself after $k$ rotations with $0 < k < p$ would be fixed by all rotations, hence one-coloured. So $p$ divides $a^p - a$. This is the orbit-counting argument of [[abstract-algebra/group-actions]].
:::

::: widget pascal
rows: 16
mod: 7
caption: Pascal's triangle coloured by residues modulo $7$. Row $7$ reads $1, 0, 0, 0, 0, 0, 0, 1$: every inner coefficient $\binom 7k$ is divisible by $7$, which is [[#lem-binomial-p]]. The large blank triangles that appear are a picture of Lucas's theorem, which describes $\binom nk \bmod p$ through the base-$p$ digits of $n$ and $k$. Try a composite row such as row $6$: $\binom 62 = 15$ is not divisible by $6$.
:::

### Using Fermat's theorem

Fermat's theorem lets us reduce exponents modulo $p - 1$: if $p \nmid a$ and $m \equiv m' \pmod{p-1}$, then $a^m \equiv a^{m'} \pmod p$, because $a^{(p-1)k} = (a^{p-1})^k \equiv 1$.

::: example Reducing exponents {#ex-fermat-reduce}
(a) Compute $5^{2026} \bmod 13$. (b) Find the inverse of $3$ modulo $11$ using Fermat's theorem.
::: solution
(a) By Fermat, $5^{12} \equiv 1 \pmod{13}$, and $2026 = 12\cdot 168 + 10$, so $5^{2026} \equiv 5^{10}$. Now $5^2 = 25 \equiv -1 \pmod{13}$, so $5^{10} = (5^2)^5 \equiv (-1)^5 = -1 \equiv 12$. Hence $5^{2026} \equiv 12 \pmod{13}$.

(b) If $p \nmid a$, then $a\cdot a^{p-2} = a^{p-1} \equiv 1$, so $a^{-1} \equiv a^{p-2} \pmod p$. For $a = 3$, $p = 11$: $3^5 = 243 = 22\cdot 11 + 1 \equiv 1$, so $3^9 = 3^5\cdot 3^4 \equiv 81 \equiv 4$. Indeed $3\cdot 4 = 12 \equiv 1 \pmod{11}$.
:::
:::

::: example Repeating decimals {#ex-decimal-period}
Explain why the decimal expansion of $\frac17$ repeats with period $6$, and why that of $\frac1p$ (for a prime $p \neq 2, 5$) repeats with a period dividing $p - 1$.
::: solution
Since $7 \nmid 10$, Fermat gives $10^6 \equiv 1 \pmod 7$, i.e. $7 \mid 10^6 - 1 = 999999$; indeed $999999 = 7\cdot 142857$. Hence

$$
\frac17 = \frac{142857}{999999} = 142857\left(10^{-6} + 10^{-12} + \cdots\right) = 0.\overline{142857},
$$

summing the geometric series. In general, if $10^k \equiv 1 \pmod p$, write $10^k - 1 = pm$; then $\frac1p = \frac{m}{10^k - 1}$, whose decimal expansion repeats the $k$-digit block of $m$ (padded with leading zeros). By Fermat, $k = p - 1$ always works, so the period — the smallest such $k$ — divides $p - 1$ (we will see why in [[number-theory/primitive-roots]], where the period is identified as the order of $10$ modulo $p$). For example $\frac1{13} = 0.\overline{076923}$ has period $6$, a divisor of $12$.
:::
:::

::: application Inverses without Euclid
Cryptographic software working modulo a large prime $p$, for example in elliptic-curve signatures, often computes inverses as $a^{-1} = a^{p-2} \bmod p$ by fast exponentiation rather than by the extended Euclidean algorithm. Both are quick, but exponentiation performs the same sequence of operations whatever the value of $a$, so its running time does not leak information about secret numbers — a defence against so-called timing attacks.
:::

### The Fermat test, and its limits

Fermat's theorem gives a way to prove that a number is **composite without finding a factor**: if $a^{n-1} \not\equiv 1 \pmod n$ for some $a$ with $\gcd(a, n) = 1$, then $n$ is not prime. For example $2^{90} \equiv 64 \pmod{91}$, so $91$ is composite — as indeed $91 = 7\cdot 13$.

::: warning The converse of Fermat's theorem is false
If $a^{n-1} \equiv 1 \pmod n$, it does **not** follow that $n$ is prime. The smallest counterexample with $a = 2$ is $n = 341 = 11\cdot 31$: since $2^{10} = 1024 = 3\cdot 341 + 1 \equiv 1 \pmod{341}$, we get $2^{340} = (2^{10})^{34} \equiv 1 \pmod{341}$. Such $n$ are called **pseudoprimes** to base $2$. Worse, there are composite numbers, the **Carmichael numbers**, such as $561 = 3\cdot 11\cdot 17$, with $a^{n-1} \equiv 1$ for *every* $a$ coprime to $n$ ([[#exr-4-9]]). Primality tests used in practice therefore strengthen Fermat's test; see [[number-theory/cryptography]].
:::

::: quiz
What is $2^{30} \bmod 31$?
- [ ] $0$
- [x] $1$
- [ ] $2$
- [ ] $30$
::: solution
$31$ is prime and $31 \nmid 2$, so Fermat's theorem gives $2^{30} \equiv 1 \pmod{31}$. (In fact already $2^5 = 32 \equiv 1$.)
:::
:::

## Euler's totient function

For a composite modulus $n$, the exponent $n - 1$ no longer works, and only residues coprime to $n$ can behave like $1$ under powering. Euler counted them.

::: definition Euler's totient function {#def-totient}
For $n \ge 1$, $\varphi(n)$ is the number of integers $k$ with $1 \le k \le n$ and $\gcd(k, n) = 1$. A set of $\varphi(n)$ integers, pairwise incongruent modulo $n$ and all coprime to $n$, is a **reduced residue system** modulo $n$.
:::

The first values are:

| $n$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $\varphi(n)$ | $1$ | $1$ | $2$ | $2$ | $4$ | $2$ | $6$ | $4$ | $6$ | $4$ | $10$ | $4$ |

$\varphi(n)$ is the number of units of $\Z/n\Z$ ([[number-theory/congruences#thm-inverse-mod]]), that is the order of the group $(\Z/n\Z)^\times = U(n)$. For a prime, $\varphi(p) = p - 1$. For a prime power, the integers from $1$ to $p^k$ *not* coprime to $p^k$ are the multiples of $p$, of which there are $p^{k-1}$, so

$$
\varphi(p^k) = p^k - p^{k-1} = p^k\left(1 - \frac1p\right).
$$ {#eq-phi-prime-power}

::: theorem φ is multiplicative {#thm-totient-multiplicative}
If $\gcd(m, n) = 1$, then $\varphi(mn) = \varphi(m)\varphi(n)$.
:::

::: proof
By the Chinese remainder theorem ([[number-theory/congruences#thm-crt]]), $k \mapsto (k \bmod m,\ k \bmod n)$ is a bijection from the residues modulo $mn$ to the pairs (residue modulo $m$, residue modulo $n$). Moreover $\gcd(k, mn) = 1$ if and only if $\gcd(k, m) = 1$ and $\gcd(k, n) = 1$ (a prime dividing $k$ and $mn$ divides $m$ or $n$), and $\gcd(k, m)$ depends only on $k \bmod m$ ([[number-theory/congruences#exr-3-8]]). So the bijection matches the residues coprime to $mn$ exactly with the pairs of residues coprime to $m$ and to $n$, of which there are $\varphi(m)\varphi(n)$.
:::

::: theorem Formula for φ {#thm-totient-formula}
If $n = p_1^{e_1}\cdots p_k^{e_k}$ is the prime factorisation of $n > 1$, then

$$
\varphi(n) = \prod_{i=1}^k\bigl(p_i^{e_i} - p_i^{e_i - 1}\bigr) = n\prod_{p \mid n}\left(1 - \frac1p\right).
$$
:::

::: proof
The prime powers $p_i^{e_i}$ are pairwise coprime, so by [[#thm-totient-multiplicative]] (and induction on $k$), $\varphi(n) = \prod\varphi(p_i^{e_i})$, and [[#eq-phi-prime-power]] gives each factor.
:::

For example $\varphi(100) = 100\cdot\frac12\cdot\frac45 = 40$, $\varphi(360) = 360\cdot\frac12\cdot\frac23\cdot\frac45 = 96$, and $\varphi(2026) = \varphi(2)\varphi(1013) = 1012$ since $1013$ is prime.

::: example Units modulo 15 on a grid {#ex-phi-grid}
Illustrate $\varphi(15) = \varphi(3)\varphi(5)$ by arranging the residues modulo $15$ according to their remainders modulo $3$ and modulo $5$.
::: solution
Put $k \in \set{0, \dots, 14}$ in row $k \bmod 3$ and column $k \bmod 5$:

| | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|---|
| $0$ | $0$ | $6$ | $12$ | $3$ | $9$ |
| $1$ | $10$ | $1$ | $7$ | $13$ | $4$ |
| $2$ | $5$ | $11$ | $2$ | $8$ | $14$ |

By the Chinese remainder theorem each cell holds exactly one residue. A residue is coprime to $15$ exactly when it is not in row $0$ (not divisible by $3$) and not in column $0$ (not divisible by $5$). That leaves a $2\times 4$ block of cells, containing $1, 2, 4, 7, 8, 11, 13, 14$: so $\varphi(15) = 2\cdot 4 = 8$. The proof of [[#thm-totient-multiplicative]] is exactly this picture.
:::
:::

The formula has a probabilistic reading: a random integer avoids divisibility by $p$ with probability $1 - \frac1p$, and for distinct primes these events are independent.

::: warning φ is multiplicative only for coprime arguments
$\varphi(mn) = \varphi(m)\varphi(n)$ requires $\gcd(m, n) = 1$: for example $\varphi(4) = 2$ but $\varphi(2)^2 = 1$. Also $\varphi(n)$ cannot be computed quickly from $n$ alone unless the factorisation is known — for a product of two large primes, computing $\varphi(n)$ is as hard as factorising $n$, a fact on which RSA depends.
:::

A beautiful identity relates $\varphi$ to divisors.

::: theorem Gauss's divisor sum {#thm-phi-sum}
For every $n \ge 1$,

$$
\sum_{d \mid n}\varphi(d) = n .
$$
:::

::: proof
Sort the integers $k \in \set{1, \dots, n}$ according to $g = \gcd(k, n)$, a divisor of $n$. The $k$ with $\gcd(k, n) = g$ are $k = gj$ with $1 \le j \le n/g$ and $\gcd(j, n/g) = 1$ (dividing $k$ and $n$ by their gcd leaves coprime numbers, [[number-theory/divisibility#cor-bezout]]); there are $\varphi(n/g)$ of them. Hence $n = \sum_{g\mid n}\varphi(n/g)$, and as $g$ runs over the divisors of $n$ so does $d = n/g$.
:::

For $n = 12$: the $k$ with $\gcd(k, 12) = 1, 2, 3, 4, 6, 12$ are $\set{1,5,7,11}$, $\set{2, 10}$, $\set{3, 9}$, $\set{4, 8}$, $\set{6}$, $\set{12}$, of sizes $\varphi(12), \varphi(6), \varphi(4), \varphi(3), \varphi(2), \varphi(1) = 4, 2, 2, 2, 1, 1$, adding up to $12$. Equivalently: writing the fractions $\frac1{12}, \frac2{12}, \dots, \frac{12}{12}$ in lowest terms, exactly $\varphi(d)$ of them have denominator $d$. This identity is the key step in proving that primitive roots exist ([[number-theory/primitive-roots]]); a group-theoretic proof is in [[abstract-algebra/subgroups]].

## Euler's theorem

::: theorem Euler's theorem {#thm-euler}
If $n \ge 1$ and $\gcd(a, n) = 1$, then

$$
a^{\varphi(n)} \equiv 1 \pmod n .
$$
:::

::: proof
Let $r_1, \dots, r_{\varphi(n)}$ be a reduced residue system modulo $n$. Since $\gcd(a, n) = 1$, the numbers $ar_1, \dots, ar_{\varphi(n)}$ are again coprime to $n$ and pairwise incongruent ([[number-theory/congruences#prop-unit-permutes]]), so they form a reduced residue system too: they are the $r_i$ in some order. Multiplying,

$$
a^{\varphi(n)}\,r_1r_2\cdots r_{\varphi(n)} \equiv r_1r_2\cdots r_{\varphi(n)} \pmod n,
$$

and the product of the $r_i$ is coprime to $n$, so it can be cancelled.
:::

When $n = p$ is prime, $\varphi(p) = p - 1$ and Euler's theorem is Fermat's. In the language of group theory, Euler's theorem says that $a^{\abs{G}} = e$ in the group $G = U(n)$ of order $\varphi(n)$, a special case of Lagrange's theorem ([[abstract-algebra/lagrange#cor-euler]]); the proof above is the proof of Lagrange's theorem in disguise.

::: example Last digits and power towers {#ex-euler}
(a) Find the last two digits of $13^{2026}$. (b) Compute $2^{2^{100}} \bmod 7$.
::: solution
(a) We need $13^{2026} \bmod 100$. Since $\gcd(13, 100) = 1$ and $\varphi(100) = 40$, exponents can be reduced modulo $40$: $2026 = 40\cdot 50 + 26$, so $13^{2026} \equiv 13^{26}$. By repeated squaring modulo $100$:

$$
13^2 = 169 \equiv 69,\quad 13^4 \equiv 69^2 = 4761 \equiv 61,\quad 13^8 \equiv 61^2 = 3721 \equiv 21,\quad 13^{16} \equiv 21^2 = 441 \equiv 41 .
$$

Then $13^{26} = 13^{16}\cdot 13^8\cdot 13^2 \equiv 41\cdot 21\cdot 69$. Now $41\cdot 21 = 861 \equiv 61$ and $61 \cdot 69 = 4209 \equiv 9$. The last two digits are $09$.

(b) Modulo $7$, exponents of $2$ can be reduced modulo $\varphi(7) = 6$, so we need $2^{100} \bmod 6$. The powers of $2$ modulo $6$ alternate $2, 4, 2, 4, \dots$, with even exponents giving $4$; so $2^{100} \equiv 4 \pmod 6$, i.e. $2^{100} = 6k + 4$. Hence $2^{2^{100}} = (2^6)^k\cdot 2^4 \equiv 16 \equiv 2 \pmod 7$.
:::
:::

::: widget modular
n: 10
mode: powers
a: 3
caption: Powers modulo $10$. For the four residues coprime to $10$ — namely $1, 3, 7, 9$ — the fourth power is $1$, as Euler's theorem predicts with $\varphi(10) = 4$; this is why last digits of powers repeat with period dividing $4$. The other residues never reach $1$: for instance the powers of $2$ cycle through $2, 4, 8, 6$, and those of $5$ are all $5$.
:::

::: example Taking seventh roots modulo 11 {#ex-roots-mod-11}
Solve $x^7 \equiv 3 \pmod{11}$.
::: solution
Fermat's theorem lets us "invert the exponent". Since $\gcd(7, 10) = 1$, there is $d$ with $7d \equiv 1 \pmod{10}$, namely $d = 3$ ($21 = 2\cdot 10 + 1$). If $x^7 \equiv 3$ then $x \not\equiv 0$, and raising to the power $3$ gives

$$
x = x^{1}\cdot\bigl(x^{10}\bigr)^2 = x^{21} = (x^7)^3 \equiv 3^3 = 27 \equiv 5 \pmod{11} .
$$

Conversely $x = 5$ works: $5^2 = 25 \equiv 3$, $5^4 \equiv 9$, so $5^7 = 5^4\cdot 5^2\cdot 5 \equiv 9\cdot 3\cdot 5 = 135 \equiv 3$. So the unique solution is $x \equiv 5 \pmod{11}$. The map $x \mapsto x^7$ is a bijection of the residues modulo $11$, undone by $y \mapsto y^3$ — exactly the mechanism of RSA encryption and decryption, with $11$ replaced by a product of two large primes.
:::
:::

::: warning Euler's theorem needs coprimality
$a^{\varphi(n)} \equiv 1 \pmod n$ can fail when $\gcd(a, n) > 1$: $2^{\varphi(10)} = 2^4 = 16 \equiv 6 \pmod{10}$. Also, $\varphi(n)$ is *an* exponent that works, not necessarily the smallest: $3^{20} \equiv 1 \pmod{100}$ although $\varphi(100) = 40$. The smallest exponent, the **order** of $a$, is studied in [[number-theory/primitive-roots]].
:::

### A smaller universal exponent

Euler's exponent $\varphi(n)$ is often not the smallest exponent that works for all $a$ coprime to $n$. Combining congruences with the Chinese remainder theorem gives a better one.

::: proposition Combining exponents {#prop-lcm-exponent}
Let $n = n_1n_2$ with $\gcd(n_1, n_2) = 1$, and suppose $a^{e_1} \equiv 1 \pmod{n_1}$ and $a^{e_2} \equiv 1 \pmod{n_2}$. Then $a^{\lcm(e_1, e_2)} \equiv 1 \pmod n$.
:::

::: proof
Let $L = \lcm(e_1, e_2) = e_1k_1 = e_2k_2$. Then $a^L = (a^{e_1})^{k_1} \equiv 1 \pmod{n_1}$ and $a^L = (a^{e_2})^{k_2} \equiv 1 \pmod{n_2}$. So $n_1$ and $n_2$ both divide $a^L - 1$, and since they are coprime, so does $n$.
:::

For example, if $\gcd(a, 35) = 1$ then $a^4 \equiv 1 \pmod 5$ and $a^6 \equiv 1 \pmod 7$ by Fermat, so $a^{12} \equiv 1 \pmod{35}$ — although $\varphi(35) = 24$. The smallest exponent that works for every unit modulo $n$ is the **Carmichael function** $\lambda(n)$; thus $\lambda(35) = 12$ (some unit, such as $2$, really has order $12$) and $\lambda(100) = 20$. It reappears in [[number-theory/primitive-roots]], and RSA implementations often use $\lambda(pq) = \lcm(p-1, q-1)$ in place of $\varphi(pq)$.

::: quiz
What is $\varphi(36)$?
- [ ] $6$
- [x] $12$
- [ ] $18$
- [ ] $24$
::: solution
$36 = 2^2\cdot 3^2$, so $\varphi(36) = 36\left(1 - \frac12\right)\left(1 - \frac13\right) = 36\cdot\frac12\cdot\frac23 = 12$. Equivalently $\varphi(4)\varphi(9) = 2\cdot 6 = 12$.
:::
:::

## Wilson's theorem

Multiply all the non-zero residues modulo $11$: $10! = 3\,628\,800 = 329\,890 \cdot 11 + 10$, so $10! \equiv -1 \pmod{11}$. The reason is that the residues pair off with their inverses. We need one fact about square roots of $1$.

::: lemma Square roots of 1 modulo a prime {#lem-square-roots-one}
If $p$ is prime and $x^2 \equiv 1 \pmod p$, then $x \equiv 1$ or $x \equiv -1 \pmod p$.
:::

::: proof
$p \mid x^2 - 1 = (x - 1)(x + 1)$, so by Euclid's lemma $p \mid x - 1$ or $p \mid x + 1$.
:::

(For composite moduli this fails: $3^2 \equiv 1 \pmod 8$.)

::: theorem Wilson's theorem {#thm-wilson}
An integer $n > 1$ is prime if and only if

$$
(n - 1)! \equiv -1 \pmod n .
$$

Moreover, if $n > 4$ is composite then $(n-1)! \equiv 0 \pmod n$.
:::

::: proof
*Primes satisfy the congruence.* For $p = 2, 3$: $1! = 1 \equiv -1 \pmod 2$ and $2! = 2 \equiv -1 \pmod 3$. Let $p \ge 5$. Each $a \in \set{1, 2, \dots, p-1}$ has a unique inverse $a^{-1}$ in the same range, and $a^{-1} = a$ exactly when $a^2 \equiv 1$, that is (by the lemma) when $a = 1$ or $a = p - 1$. So the numbers $2, 3, \dots, p - 2$ split into pairs $\set{a, a^{-1}}$ with $a \neq a^{-1}$, each pair having product $\equiv 1$. Therefore

$$
(p - 1)! = 1\cdot\bigl(2\cdot 3\cdots(p-2)\bigr)\cdot(p-1) \equiv 1\cdot 1\cdot(p-1) \equiv -1 \pmod p .
$$

*Composites do not.* Let $n$ be composite, $n = ab$ with $1 < a \le b < n$. If $a < b$, both $a$ and $b$ appear among $1, \dots, n-1$, so $n = ab \mid (n-1)!$. If $a = b$, i.e. $n = a^2$, and $a > 2$, then $a$ and $2a$ are distinct numbers below $n$ (since $2a < a^2$), so $2a^2 \mid (n-1)!$ and again $n \mid (n-1)!$. In both cases $(n - 1)! \equiv 0 \not\equiv -1$. The remaining composite is $n = 4$, where $3! = 6 \equiv 2 \not\equiv -1 \pmod 4$.
:::

::: example The pairing for p = 11 {#ex-wilson-11}
Show the pairing in the proof of Wilson's theorem explicitly for $p = 11$.
::: solution
The inverses modulo $11$ are found from $2\cdot 6 = 12$, $3\cdot 4 = 12$, $5\cdot 9 = 45$ and $7\cdot 8 = 56$, all $\equiv 1 \pmod{11}$. So

$$
10! = 1\cdot (2\cdot 6)(3\cdot 4)(5\cdot 9)(7\cdot 8)\cdot 10 \equiv 1\cdot 1\cdot 1\cdot 1\cdot 1\cdot 10 \equiv -1 \pmod{11} .
$$

Only $1$ and $10$ are their own inverses.
:::
:::

::: widget modular
n: 11
mode: inverses
caption: Inverse pairs modulo $11$: $2 \leftrightarrow 6$, $3 \leftrightarrow 4$, $5 \leftrightarrow 9$, $7 \leftrightarrow 8$, while $1$ and $10 \equiv -1$ are self-inverse. Multiplying all ten residues, every pair contributes $1$, leaving $1\cdot 10 \equiv -1$: Wilson's theorem. Try a composite modulus such as $12$ to see the pairing break down.
:::

A prime $p$ is called a **Wilson prime** if even $p^2$ divides $(p-1)! + 1$. Only three are known — $5$, $13$ and $563$ — and it is not known whether there are infinitely many.

Wilson's theorem characterises primes, but it is useless as a practical test: computing $(n - 1)! \bmod n$ takes about $n$ multiplications, far more than trial division. Its value is theoretical. Here is the most important application.

::: theorem When is −1 a square modulo p? {#thm-minus-one-square}
Let $p$ be an odd prime. The congruence $x^2 \equiv -1 \pmod p$ has a solution if and only if $p \equiv 1 \pmod 4$. In that case $x = \left(\frac{p-1}2\right)!$ is a solution.
:::

::: proof
Write $m = \frac{p-1}{2}$. Pair each $k \in \set{1, \dots, m}$ with $p - k \equiv -k$; together these pairs cover $1, \dots, p - 1$. So by Wilson's theorem

$$
-1 \equiv (p - 1)! = \prod_{k=1}^m k(p - k) \equiv \prod_{k=1}^m (-k^2) = (-1)^m (m!)^2 \pmod p .
$$

If $p \equiv 1 \pmod 4$ then $m$ is even, and $(m!)^2 \equiv -1$. Conversely, suppose $x^2 \equiv -1$. Then $p \nmid x$, and by Fermat

$$
1 \equiv x^{p-1} = (x^2)^m \equiv (-1)^m \pmod p,
$$

so $m$ is even (as $-1 \not\equiv 1$ for odd $p$), i.e. $p \equiv 1 \pmod 4$.
:::

For $p = 13$: $6! = 720 = 55\cdot 13 + 5$, and $5^2 = 25 \equiv -1 \pmod{13}$. For $p = 17$: $8! = 40320 \equiv 13$ and $13^2 = 169 \equiv -1 \pmod{17}$. This theorem is the first case of quadratic reciprocity ([[number-theory/quadratic-reciprocity]]) and the key step in Fermat's theorem on sums of two squares ([[number-theory/diophantine]]).

::: application Why RSA works
In RSA cryptography ([[number-theory/cryptography]]) a message $m$ is encrypted as $c = m^e \bmod n$ with $n = pq$, and decrypted as $c^d \bmod n$, where $ed \equiv 1 \pmod{\varphi(n)}$. Writing $ed = 1 + k\varphi(n)$, Euler's theorem gives $c^d = m^{ed} = m\,(m^{\varphi(n)})^k \equiv m \pmod n$ whenever $\gcd(m, n) = 1$. The security rests on the fact that computing $\varphi(n) = (p-1)(q-1)$ requires knowing the factorisation of $n$.
:::

::: history
Pierre de Fermat stated his little theorem in a letter to Bernard Frénicle de Bessy dated 18 October 1640, without proof. Gottfried Wilhelm Leibniz left an unpublished proof from about 1683; Leonhard Euler gave the first published proof (written in 1736), and in 1763 he introduced the totient function and proved his generalisation. The notation $\varphi(n)$ is due to Gauss (1801), and the name "totient" to James Joseph Sylvester (1879). Wilson's theorem was announced by Edward Waring in 1770, who attributed it to his former student John Wilson; neither proved it, and the first published proof was given by Joseph-Louis Lagrange in 1771. The result had been noticed much earlier by Ibn al-Haytham, around the year 1000.
:::

## Where this leads

Fermat's and Euler's theorems say that $a^{\varphi(n)} \equiv 1$, but a smaller exponent often works. The smallest one, the **order** of $a$, and the existence of elements of the largest possible order — **primitive roots** — are the subject of [[number-theory/primitive-roots]]. Euler's criterion in [[number-theory/quadratic-reciprocity]] uses Fermat's theorem to decide which numbers are squares modulo $p$, generalising [[#thm-minus-one-square]]. In [[number-theory/cryptography]] these theorems become RSA, the Fermat and Miller–Rabin primality tests, and Diffie–Hellman key exchange. The group-theoretic view is developed in [[abstract-algebra/lagrange]].

::: summary
- **Fermat**: $a^{p-1} \equiv 1 \pmod p$ for $p \nmid a$, and $a^p \equiv a$ for all $a$; proved by permuting residues or via $p \mid \binom pk$ ($0 < k < p$).
- Exponents can be reduced modulo $p - 1$; $a^{p-2}$ is the inverse of $a$ modulo $p$.
- The converse fails: $341 = 11\cdot31$ is a base-$2$ pseudoprime and $561$ is a Carmichael number.
- **Euler's totient** $\varphi(n)$ counts residues coprime to $n$; it is multiplicative for coprime arguments, with $\varphi(n) = n\prod_{p\mid n}(1 - 1/p)$, and $\sum_{d\mid n}\varphi(d) = n$.
- **Euler**: $a^{\varphi(n)} \equiv 1 \pmod n$ when $\gcd(a, n) = 1$ — Lagrange's theorem for $U(n)$; it fails without coprimality.
- **Wilson**: $n > 1$ is prime iff $(n-1)! \equiv -1 \pmod n$; composite $n > 4$ give $0$.
- $-1$ is a square modulo an odd prime $p$ iff $p \equiv 1 \pmod 4$, and then $x = \left(\frac{p-1}2\right)!$ satisfies $x^2 \equiv -1$.
:::

## Exercises

::: exercise A power modulo 7 {level=1 check="4"}
Find $3^{2026} \bmod 7$.
::: solution
By Fermat $3^6 \equiv 1 \pmod 7$. Since $2026 = 6\cdot 337 + 4$, $3^{2026} \equiv 3^4 = 81 = 11\cdot 7 + 4 \equiv 4$.
:::
:::

::: exercise A totient {level=1 check="96"}
Compute $\varphi(360)$.
::: solution
$360 = 2^3\cdot 3^2\cdot 5$, so $\varphi(360) = (8 - 4)(9 - 3)(5 - 1) = 4\cdot 6\cdot 4 = 96$.
:::
:::

::: exercise A factorial modulo 17 {level=1 check="16"}
Find $16! \bmod 17$.
::: solution
$17$ is prime, so by Wilson's theorem $16! \equiv -1 \equiv 16 \pmod{17}$.
:::
:::

::: exercise Last two digits {level=2 check="9"}
Using Euler's theorem, find the last two digits of $13^{2026}$ (enter the number they form).
::: solution
This is [[#ex-euler]](a): $\varphi(100) = 40$, $13^{2026} \equiv 13^{26} \equiv 9 \pmod{100}$, so the last two digits are $09$.
:::
:::

::: exercise Solving φ(n) = 4 {level=2 check="4"}
Find all $n$ with $\varphi(n) = 4$. How many are there?
::: hint
If $p \mid n$ then $p - 1$ divides $\varphi(n)$.
:::
::: solution
If a prime $p$ divides $n$, then $\varphi(p^{v_p(n)}) = p^{v_p(n) - 1}(p-1)$ divides $\varphi(n) = 4$, so $p - 1 \mid 4$ and $p \in \set{2, 3, 5}$; also $3^2 \nmid n$ (else $3 \mid \varphi(n)$) and $5^2 \nmid n$. Write $n = 2^a3^b5^c$ with $b, c \le 1$. If $c = 1$: $\varphi(2^a)\varphi(3^b) = 1$, so $b = 0$, $a \le 1$: $n = 5, 10$. If $c = 0$ and $b = 1$: $\varphi(2^a) = 2$, so $a = 2$: $n = 12$. If $b = c = 0$: $\varphi(2^a) = 4$, so $a = 3$: $n = 8$. The solutions are $5, 8, 10, 12$ — four of them.
:::
:::

::: exercise A pseudoprime {level=2}
Verify that $2^{340} \equiv 1 \pmod{341}$ by working modulo $11$ and modulo $31$ separately, and conclude that $341$ is a pseudoprime to base $2$.
::: solution
Modulo $11$: $2^{10} \equiv 1$ by Fermat, so $2^{340} = (2^{10})^{34} \equiv 1$. Modulo $31$: $2^5 = 32 \equiv 1$, so $2^{340} = (2^5)^{68} \equiv 1$. Since $11$ and $31$ both divide $2^{340} - 1$ and are coprime, $341 = 11\cdot 31$ divides it. So $341$ passes the base-$2$ Fermat test although it is composite.
:::
:::

::: exercise φ(n) is even {level=2}
Prove that $\varphi(n)$ is even for every $n \ge 3$.
::: solution
*First proof.* If $n$ has an odd prime factor $p$, then $\varphi(p^e) = p^{e-1}(p - 1)$ is even and divides $\varphi(n)$. Otherwise $n = 2^a$ with $a \ge 2$, and $\varphi(n) = 2^{a-1}$ is even.

*Second proof.* For $n \ge 3$ the map $k \mapsto n - k$ pairs the residues coprime to $n$, since $\gcd(n - k, n) = \gcd(k, n)$, and it has no fixed point: $k = n - k$ would mean $n = 2k$ and then $\gcd(k, n) = k$, which equals $1$ only if $n = 2$. So the $\varphi(n)$ residues fall into pairs.
:::
:::

::: exercise Power sums modulo p {level=3}
Let $p$ be prime and $k \ge 1$. Prove that

$$
1^k + 2^k + \dots + (p-1)^k \equiv \begin{cases} -1 \pmod p & \text{if } (p-1) \mid k, \\ 0 \pmod p & \text{otherwise.}\end{cases}
$$
::: hint
For the second case, find $a$ with $a^k \not\equiv 1$ and multiply the sum by $a^k$.
:::
::: solution
Let $S = \sum_{x=1}^{p-1}x^k$. If $(p-1) \mid k$, each term is $\equiv 1$ by Fermat, so $S \equiv p - 1 \equiv -1$. Otherwise write $k = (p-1)q + r$ with $0 < r < p - 1$; then $x^k \equiv x^r$ for $p \nmid x$. The polynomial $x^r - 1$ has at most $r < p - 1$ roots modulo $p$ ([[abstract-algebra/polynomials#cor-root-count]], or Lagrange's theorem in [[number-theory/primitive-roots]]), so some $a \in \set{1, \dots, p-1}$ has $a^k \equiv a^r \not\equiv 1$. Multiplication by $a$ permutes $1, \dots, p - 1$, so

$$
a^kS = \sum_{x=1}^{p-1}(ax)^k \equiv \sum_{y=1}^{p-1}y^k = S \pmod p .
$$

Thus $(a^k - 1)S \equiv 0$, and since $a^k - 1 \not\equiv 0$, $S \equiv 0 \pmod p$.
:::
:::

::: exercise 561 is a Carmichael number {level=3}
Prove that $a^{561} \equiv a \pmod{561}$ for every integer $a$, although $561 = 3\cdot 11\cdot 17$ is composite.
::: solution
By the Chinese remainder theorem it suffices to prove $a^{561} \equiv a$ modulo $3$, $11$ and $17$. For a prime $p$ with $(p - 1) \mid 560$, we have $a^{561} = a\cdot(a^{p-1})^{560/(p-1)} \equiv a$ if $p \nmid a$ (Fermat), and trivially if $p \mid a$. Now $560 = 2\cdot 280 = 10\cdot 56 = 16\cdot 35$, so $p - 1 \in \set{2, 10, 16}$ all divide $560$. Hence $a^{561} \equiv a$ modulo $3$, $11$ and $17$, and so modulo $561$. In particular $a^{560} \equiv 1 \pmod{561}$ for every $a$ coprime to $561$: no base exposes $561$ through Fermat's test.
:::
:::

::: exercise A universal divisor {level=3}
Prove that $2730$ divides $n^{13} - n$ for every integer $n$.
::: solution
$2730 = 2\cdot 3\cdot 5\cdot 7\cdot 13$, a product of distinct primes, so it suffices to show $p \mid n^{13} - n$ for each of these $p$. For each, $p - 1 \in \set{1, 2, 4, 6, 12}$ divides $12$. If $p \nmid n$, Fermat gives $n^{p-1} \equiv 1$, so $n^{12} = (n^{p-1})^{12/(p-1)} \equiv 1$ and $n^{13} \equiv n$; if $p \mid n$ both sides are $0$. Since the five primes divide $n^{13} - n$ and are pairwise coprime, so does their product $2730$.
:::
:::
