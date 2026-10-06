Which numbers are perfect squares modulo a prime $p$? Modulo $11$ the squares of $1, 2, \dots, 10$ are $1, 4, 9, 5, 3, 3, 5, 9, 4, 1$, so exactly five of the ten non-zero residues are squares. Now turn the question around: fix a number, say $5$, and ask for which primes $p$ it is a square. Testing a few cases reveals a pattern: $5$ is a square modulo $11, 19, 29, 31, 41, \dots$ and not modulo $3, 7, 13, 17, 23, \dots$ — that is, exactly when $p \equiv \pm 1 \pmod 5$. Why should the answer to a question *modulo $p$* depend only on $p$ *modulo $5$*?

The explanation is the **law of quadratic reciprocity**, conjectured by Euler and Legendre and first proved by Gauss in 1796, when he was eighteen; he called it the "fundamental theorem" and gave eight different proofs. It relates the question "is $p$ a square modulo $q$?" to the question "is $q$ a square modulo $p$?", and it makes the solvability of $x^2 \equiv a \pmod p$ quickly decidable even for enormous numbers. In this chapter we develop the tools — the Legendre symbol, Euler's criterion and Gauss's lemma — and give a complete proof of the reciprocity law by counting lattice points, an argument due to Eisenstein.

Throughout, $p$ and $q$ denote **odd** primes.

## Quadratic residues

::: definition Quadratic residue {#def-quadratic-residue}
Let $p$ be an odd prime and $p \nmid a$. Then $a$ is a **quadratic residue** modulo $p$ if the congruence $x^2 \equiv a \pmod p$ has a solution, and a **quadratic non-residue** otherwise.
:::

So modulo $11$ the quadratic residues are $1, 3, 4, 5, 9$ and the non-residues are $2, 6, 7, 8, 10$. Multiples of $p$ are excluded from both classes.

::: proposition Half the residues are squares {#prop-half-residues}
Modulo an odd prime $p$ there are exactly $\frac{p-1}2$ quadratic residues, namely the squares $1^2, 2^2, \dots, \left(\frac{p-1}{2}\right)^2$, and $\frac{p-1}2$ non-residues. Each quadratic residue has exactly two square roots modulo $p$, of the form $\pm x$.
:::

::: proof
Every non-zero residue $x$ is congruent to $\pm y$ with $1 \le y \le \frac{p-1}2$, and $x^2 \equiv y^2$; so the squares $1^2, \dots, (\frac{p-1}2)^2$ include all quadratic residues. They are distinct: if $y^2 \equiv z^2$ then $p \mid (y - z)(y + z)$, so $y \equiv \pm z$, and for $1 \le y, z \le \frac{p-1}2$ this forces $y = z$ (since $2 \le y + z \le p - 1$). The same computation shows that $x^2 \equiv a$ has exactly the two solutions $\pm x$, which are distinct as $p$ is odd.
:::

Completing the square reduces every quadratic congruence to this case. If $p \nmid a$, then $ax^2 + bx + c \equiv 0 \pmod p$ is equivalent (multiplying by $4a$, which is invertible) to

$$
(2ax + b)^2 \equiv b^2 - 4ac \pmod p,
$$

so it has $2$, $1$ or $0$ solutions according as the discriminant $b^2 - 4ac$ is a non-zero quadratic residue, zero, or a non-residue — exactly as for real quadratics, with "positive" replaced by "quadratic residue".

::: example A quadratic congruence {#ex-quadratic-congruence}
Solve $3x^2 + 4x + 7 \equiv 0 \pmod{11}$.
::: solution
Multiply by $4a = 12 \equiv 1$ — conveniently, here multiplying by $12$ changes nothing modulo $11$ — and complete the square: the congruence is equivalent to $(6x + 4)^2 \equiv 4^2 - 4\cdot3\cdot7 = -68 \equiv 9 \pmod{11}$. The discriminant $9 = 3^2$ is a quadratic residue, so there are two solutions: $6x + 4 \equiv 3$ or $6x + 4 \equiv -3$, i.e. $6x \equiv 10$ or $6x \equiv 4$. The inverse of $6$ modulo $11$ is $2$, so $x \equiv 20 \equiv 9$ or $x \equiv 8$. Check: $3\cdot 81 + 36 + 7 = 286 = 26\cdot 11$ and $3\cdot 64 + 32 + 7 = 231 = 21\cdot 11$.
:::
:::

::: widget modular
n: 13
mode: multiply
caption: The multiplication table modulo $13$. Its diagonal holds the squares $a\cdot a$; for $a \ne 0$ they take only the six values $1, 4, 9, 3, 12, 10$ (each twice, from $a$ and $13 - a$): these are the quadratic residues. Check [[#cor-legendre-mult]] in the table: a product of two non-residues, such as $2\cdot 5 = 10$, is a residue.
:::

## The Legendre symbol and Euler's criterion

::: definition Legendre symbol {#def-legendre}
For an odd prime $p$ and an integer $a$, the **Legendre symbol** is

$$
\left(\frac ap\right) = \begin{cases} \phantom{-}1 & \text{if } a \text{ is a quadratic residue modulo } p,\\ -1 & \text{if } a \text{ is a quadratic non-residue modulo } p,\\ \phantom{-}0 & \text{if } p \mid a. \end{cases}
$$
:::

It depends only on $a \bmod p$, and the number of solutions of $x^2 \equiv a \pmod p$ is $1 + \bigl(\frac ap\bigr)$. Euler found a formula for it.

::: theorem Euler's criterion {#thm-euler-criterion}
For an odd prime $p$ and any integer $a$,

$$
\left(\frac ap\right) \equiv a^{(p-1)/2} \pmod p .
$$
:::

::: proof
If $p \mid a$, both sides are $0$. Otherwise let $g$ be a primitive root modulo $p$ ([[number-theory/primitive-roots#thm-primitive-root-prime]]) and write $a \equiv g^k$. Then $a$ is a quadratic residue if and only if $k$ is even: if $k = 2j$ then $a \equiv (g^j)^2$; conversely if $a \equiv x^2$ with $x \equiv g^i$, then $g^k \equiv g^{2i}$, so $k \equiv 2i \pmod{p-1}$ and $k$ is even because $p - 1$ is. On the other hand $g^{(p-1)/2} \equiv -1$ ([[number-theory/primitive-roots#exr-5-6]]), so

$$
a^{(p-1)/2} \equiv \bigl(g^{(p-1)/2}\bigr)^k \equiv (-1)^k \pmod p,
$$

which is $1$ when $k$ is even and $-1$ when $k$ is odd. In both cases it equals $\bigl(\frac ap\bigr)$.
:::

::: corollary Multiplicativity {#cor-legendre-mult}
$\left(\frac{ab}p\right) = \left(\frac ap\right)\left(\frac bp\right)$ for all integers $a, b$. In words: the product of two residues or of two non-residues is a residue, and the product of a residue and a non-residue is a non-residue.
:::

::: proof
By Euler's criterion both sides are congruent to $(ab)^{(p-1)/2} = a^{(p-1)/2}b^{(p-1)/2}$ modulo $p$. Both are $0$ or $\pm 1$, and $1 \not\equiv -1$ for $p > 2$, so they are equal.
:::

Thanks to multiplicativity, computing $\bigl(\frac ap\bigr)$ reduces, via the factorisation of $a$, to the three cases $\bigl(\frac{-1}p\bigr)$, $\bigl(\frac 2p\bigr)$ and $\bigl(\frac qp\bigr)$ for odd primes $q$. The first is immediate.

::: theorem The first supplementary law {#thm-first-supplement}
$$
\left(\frac{-1}{p}\right) = (-1)^{(p-1)/2} = \begin{cases} \phantom{-}1 & \text{if } p \equiv 1 \pmod 4, \\ -1 & \text{if } p \equiv 3 \pmod 4. \end{cases}
$$
:::

::: proof
Euler's criterion with $a = -1$; both sides are $\pm 1$ and congruent modulo $p > 2$, hence equal.
:::

This recovers [[number-theory/fermat-euler#thm-minus-one-square]] and has a famous consequence.

::: corollary Infinitely many primes ≡ 1 (mod 4) {#cor-primes-1-mod-4}
Every odd prime divisor of $n^2 + 1$ is $\equiv 1 \pmod 4$, and there are infinitely many primes $p \equiv 1 \pmod 4$.
:::

::: proof
If $p$ is an odd prime dividing $n^2 + 1$, then $n^2 \equiv -1 \pmod p$, so $\bigl(\frac{-1}{p}\bigr) = 1$ and $p \equiv 1 \pmod 4$. Given primes $p_1, \dots, p_k \equiv 1 \pmod 4$, let $N = (2p_1\cdots p_k)^2 + 1$. It is odd and greater than $1$, so it has an odd prime factor $q$, which is $\equiv 1 \pmod 4$ by the first part; and $q$ is not any $p_i$, since otherwise $q$ would divide $N - (2p_1\cdots p_k)^2 = 1$.
:::

For example $5^2 + 1 = 26 = 2\cdot 13$, $8^2 + 1 = 65 = 5\cdot 13$ and $12^2 + 1 = 145 = 5\cdot 29$: every odd prime factor is $\equiv 1 \pmod 4$, and no prime such as $3, 7, 11$ ever appears.

::: example Testing a residue with Euler's criterion {#ex-euler-criterion}
Is $5$ a quadratic residue modulo $19$? If so, find its square roots.
::: solution
Compute $5^9 \bmod 19$: $5^2 = 25 \equiv 6$, $5^4 \equiv 36 \equiv -2$, $5^8 \equiv 4$, so $5^9 \equiv 20 \equiv 1$. By Euler's criterion $\bigl(\frac 5{19}\bigr) = 1$. To find a root, note that $19 \equiv 3 \pmod 4$; then $x = 5^{(19+1)/4} = 5^5$ is a square root, because $x^2 = 5^{10} = 5\cdot 5^9 \equiv 5$. Here $5^5 = 5^4\cdot 5 \equiv -10 \equiv 9$, and indeed $9^2 = 81 = 4\cdot 19 + 5$. The two square roots are $\pm 9$, i.e. $9$ and $10$.
:::
:::

::: widget modular
n: 11
mode: powers
a: 2
caption: Powers modulo $11$. The column of fifth powers, $a^{(11-1)/2}$, contains only $1$ and $10 \equiv -1$: by Euler's criterion it is $1$ exactly for the quadratic residues $1, 3, 4, 5, 9$ and $-1$ for the non-residues $2, 6, 7, 8, 10$. Notice that the residues are the even powers of the primitive root $2$: $2^2 = 4$, $2^4 = 5$, $2^6 = 9$, $2^8 = 3$, $2^{10} = 1$.
:::

::: quiz
Which of the following are quadratic residues modulo $11$? (Select all that apply.)
- [x] $3$
- [x] $5$
- [ ] $6$
- [x] $9$
::: solution
The quadratic residues modulo $11$ are $1^2, 2^2, 3^2, 4^2, 5^2 \equiv 1, 4, 9, 5, 3$. So $3$, $5$ and $9$ are residues and $6$ is not. Check with Euler: $6^5 = 7776 = 706\cdot 11 + 10 \equiv -1$.
:::
:::

## Gauss's lemma and the second supplementary law

Euler's criterion is excellent for computation but awkward for proving general patterns. Gauss found a counting criterion. For $p \nmid a$, consider the $\frac{p-1}{2}$ multiples

$$
a,\ 2a,\ 3a,\ \dots,\ \tfrac{p-1}{2}a,
$$

and reduce each to its **least absolute residue**, the representative in the interval $\left(-\frac p2, \frac p2\right)$.

::: lemma Gauss's lemma {#lem-gauss}
Let $p$ be an odd prime, $p \nmid a$, and let $\mu$ be the number of the multiples $a, 2a, \dots, \frac{p-1}{2}a$ whose least absolute residues are negative. Then

$$
\left(\frac ap\right) = (-1)^\mu .
$$
:::

::: proof
Let $m = \frac{p-1}{2}$. For $1 \le k \le m$ write $ka \equiv \eps_kr_k \pmod p$ with $\eps_k = \pm 1$ and $1 \le r_k \le m$ (the least absolute residue is $\eps_kr_k$, which is never $0$ as $p \nmid ka$). The $r_k$ are distinct: if $r_j = r_k$, then $ja \equiv \pm ka$, and cancelling $a$ gives $j \equiv \pm k \pmod p$; since $1 \le j, k \le m$ we have $0 < j + k < p$, so only $j = k$ is possible. Hence $r_1, \dots, r_m$ is a rearrangement of $1, 2, \dots, m$. Multiplying the congruences $ka \equiv \eps_kr_k$ for $k = 1, \dots, m$:

$$
a^m\,m! \equiv \Bigl(\prod_k \eps_k\Bigr)\,r_1\cdots r_m = (-1)^\mu\,m! \pmod p .
$$

Cancelling $m!$ (coprime to $p$) gives $a^{(p-1)/2} \equiv (-1)^\mu$, and Euler's criterion finishes the proof.
:::

::: example Gauss's lemma in action {#ex-gauss-lemma}
Use Gauss's lemma to compute $\left(\frac{5}{13}\right)$.
::: solution
Here $m = 6$. The multiples $5, 10, 15, 20, 25, 30$ reduce modulo $13$ to $5, 10, 2, 7, 12, 4$, whose least absolute residues are

$$
5,\ -3,\ 2,\ -6,\ -1,\ 4 .
$$

Three are negative, so $\mu = 3$ and $\bigl(\frac5{13}\bigr) = -1$. Check: the squares modulo $13$ are $1, 4, 9, 3, 12, 10$, and $5$ is not among them.
:::
:::

Gauss's lemma settles the case $a = 2$ completely, because the multiples $2, 4, \dots, p - 1$ are easy to count.

::: theorem The second supplementary law {#thm-second-supplement}
$$
\left(\frac{2}{p}\right) = (-1)^{(p^2-1)/8} = \begin{cases} \phantom{-}1 & \text{if } p \equiv \pm 1 \pmod 8, \\ -1 & \text{if } p \equiv \pm 3 \pmod 8. \end{cases}
$$
:::

::: proof
The multiples $2k$, $1 \le k \le m = \frac{p-1}2$, are the even numbers $2, 4, \dots, p - 1$, all already in $[1, p-1]$; the least absolute residue of $2k$ is negative exactly when $2k > \frac p2$, i.e. $k > \frac p4$. So $\mu = m - \lfloor p/4\rfloor$. Checking the four cases $p = 8j + r$:

| $p$ | $8j + 1$ | $8j + 3$ | $8j + 5$ | $8j + 7$ |
|---|---|---|---|---|
| $m$ | $4j$ | $4j + 1$ | $4j + 2$ | $4j + 3$ |
| $\lfloor p/4\rfloor$ | $2j$ | $2j$ | $2j + 1$ | $2j + 1$ |
| $\mu$ | $2j$ | $2j + 1$ | $2j + 1$ | $2j + 2$ |

So $\mu$ is even exactly when $p \equiv \pm 1 \pmod 8$. Finally $\frac{p^2-1}{8}$ is $8j^2 + 2j$, $8j^2 + 6j + 1$, $8j^2 + 10j + 3$, $8j^2 + 14j + 6$ in the four cases, with the same parities as $\mu$.
:::

For instance $2$ is a quadratic residue modulo $7$ ($3^2 = 9 \equiv 2$) and modulo $17$ ($6^2 = 36 \equiv 2$), but not modulo $3$, $5$, $11$ or $13$.

## The law of quadratic reciprocity

::: theorem Law of quadratic reciprocity {#thm-qr}
If $p$ and $q$ are distinct odd primes, then

$$
\left(\frac pq\right)\left(\frac qp\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}} .
$$ {#eq-qr}

Equivalently: $\left(\frac pq\right) = \left(\frac qp\right)$ unless $p \equiv q \equiv 3 \pmod 4$, in which case $\left(\frac pq\right) = -\left(\frac qp\right)$.
:::

Before proving it, test it on small primes. The squares modulo $7$ are $1, 2, 4$ and those modulo $5$ are $1, 4$. For $p = 3$, $q = 7$: $\bigl(\frac37\bigr) = -1$ (as $3 \notin \set{1,2,4}$) and $\bigl(\frac73\bigr) = \bigl(\frac13\bigr) = 1$, so the product is $-1$; both primes are $\equiv 3 \pmod 4$ and indeed $(-1)^{1\cdot 3} = -1$. For $p = 5$, $q = 7$: $\bigl(\frac57\bigr) = -1$ and $\bigl(\frac75\bigr) = \bigl(\frac25\bigr) = -1$, so the product is $+1 = (-1)^{2\cdot 3}$. The exponent $\frac{p-1}2\cdot\frac{q-1}{2}$ is odd exactly when both factors are odd, i.e. when $p \equiv q \equiv 3 \pmod 4$; this gives the equivalent form. The proof rests on a refinement of Gauss's lemma for odd $a$, due to Eisenstein, which expresses $\mu$ modulo $2$ as a sum of integer parts.

::: lemma Eisenstein's lemma {#lem-eisenstein}
Let $p$ be an odd prime and $a$ an **odd** integer with $p \nmid a$. Then

$$
\left(\frac ap\right) = (-1)^{T(a, p)}, \qquad\text{where}\quad T(a, p) = \sum_{k=1}^{(p-1)/2}\left\lfloor\frac{ka}{p}\right\rfloor .
$$
:::

::: proof
Let $m = \frac{p-1}2$. Divide: $ka = p\lfloor ka/p\rfloor + t_k$ with $0 < t_k < p$. In Gauss's lemma, the least absolute residue of $ka$ is negative exactly when $t_k > \frac p2$. Let $u_1, \dots, u_s$ be the $t_k$ less than $\frac p2$ and $v_1, \dots, v_\mu$ those greater than $\frac p2$. As shown in the proof of [[#lem-gauss]], the numbers $u_1, \dots, u_s, p - v_1, \dots, p - v_\mu$ are a rearrangement of $1, \dots, m$. Write $U = \sum u_i$ and $V = \sum v_j$. Summing,

$$
U + \mu p - V = 1 + 2 + \dots + m = \frac{p^2-1}{8} .
$$ {#eq-eis-1}

On the other hand, summing $ka = p\lfloor ka/p\rfloor + t_k$ over $k = 1, \dots, m$,

$$
a\,\frac{p^2 - 1}{8} = pT(a, p) + U + V .
$$ {#eq-eis-2}

Subtracting [[#eq-eis-1]] from [[#eq-eis-2]]:

$$
(a - 1)\frac{p^2-1}{8} = p\bigl(T(a, p) - \mu\bigr) + 2V .
$$

Since $a$ is odd, $a - 1$ is even, and $\frac{p^2-1}8$ is an integer, so the left side is even. Hence $p(T(a,p) - \mu)$ is even, and as $p$ is odd, $T(a, p) \equiv \mu \pmod 2$. Gauss's lemma gives $\bigl(\frac ap\bigr) = (-1)^\mu = (-1)^{T(a,p)}$.
:::

*Proof of the law of quadratic reciprocity.* Count the lattice points $(x, y)$ with integer coordinates in the rectangle

$$
R = \set{(x, y) : 1 \le x \le \tfrac{p-1}{2},\ 1 \le y \le \tfrac{q-1}{2}} ,
$$

of which there are $\frac{p-1}2\cdot\frac{q-1}2$. No lattice point of $R$ lies on the diagonal line $py = qx$: that would require $p \mid qx$, hence $p \mid x$, impossible for $1 \le x < p$. So every point of $R$ lies either strictly below the line ($y < qx/p$) or strictly above it ($x < py/q$).

*Below the line.* For each $x$ with $1 \le x \le \frac{p-1}2$, the admissible $y$ are $1 \le y < \frac{qx}{p}$, and there are $\lfloor qx/p\rfloor$ of them; these automatically satisfy $y \le \frac{q-1}2$, since $\frac{qx}p < \frac q2$. So the number of points below the line is $\sum_x \lfloor qx/p\rfloor = T(q, p)$.

*Above the line.* By the same argument with the roles of $x$ and $y$ (and of $p$ and $q$) exchanged, the number of points above the line is $\sum_y\lfloor py/q\rfloor = T(p, q)$.

Hence $T(q, p) + T(p, q) = \frac{p-1}2\cdot\frac{q-1}2$. Since $p$ and $q$ are odd, Eisenstein's lemma applies to both symbols:

$$
\left(\frac qp\right)\left(\frac pq\right) = (-1)^{T(q,p)}(-1)^{T(p,q)} = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}} . \qquad\blacksquare
$$

::: widget plot
f: 7x/11
x: 0, 6
y: 0, 4
points: 1,1; 1,2; 1,3; 2,1; 2,2; 2,3; 3,1; 3,2; 3,3; 4,1; 4,2; 4,3; 5,1; 5,2; 5,3
hlines: 3.5
vlines: 5.5
caption: Eisenstein's proof for $p = 11$, $q = 7$. The $5 \times 3 = 15$ lattice points of the rectangle are split by the line $y = \frac{7}{11}x$. Below it lie $\sum_{x=1}^{5}\lfloor 7x/11\rfloor = 0 + 1 + 1 + 2 + 3 = 7$ points, and above it $\sum_{y=1}^{3}\lfloor 11y/7\rfloor = 1 + 3 + 4 = 8$. So $\bigl(\frac{7}{11}\bigr) = (-1)^7 = -1$ and $\bigl(\frac{11}{7}\bigr) = (-1)^8 = 1$, and their product is $(-1)^{15} = (-1)^{5\cdot 3}$, as the reciprocity law says.
:::

::: intuition Why reciprocity is surprising
The statement "$p$ is a square modulo $q$" is about arithmetic modulo $q$, while "$q$ is a square modulo $p$" is about arithmetic modulo $p$ — two completely different finite worlds. Reciprocity says they are linked by a simple sign. Gauss's lemma turns each symbol into a count, and the lattice-point picture shows that the two counts are complementary pieces of a single rectangle, cut by its diagonal: the hidden symmetry is the exchange of $x$ and $y$, which swaps the roles of $p$ and $q$.
:::

### Computing with reciprocity

Together with multiplicativity and the two supplementary laws, reciprocity computes any Legendre symbol by repeatedly reducing the top entry modulo the bottom one and flipping.

::: example A large Legendre symbol {#ex-legendre-large}
Compute $\left(\frac{713}{1009}\right)$ ($1009$ is prime).
::: solution
Factor $713 = 23\cdot 31$, so $\bigl(\frac{713}{1009}\bigr) = \bigl(\frac{23}{1009}\bigr)\bigl(\frac{31}{1009}\bigr)$. Since $1009 \equiv 1 \pmod 4$, reciprocity flips both without a sign change:

$$
\left(\frac{23}{1009}\right) = \left(\frac{1009}{23}\right) = \left(\frac{20}{23}\right) = \left(\frac{4}{23}\right)\left(\frac{5}{23}\right) = \left(\frac{5}{23}\right) = \left(\frac{23}{5}\right) = \left(\frac 35\right) = -1,
$$

using $1009 = 43\cdot 23 + 20$ and that the residues modulo $5$ are $1, 4$. Similarly, using $1009 = 32\cdot 31 + 17$,

$$
\left(\frac{31}{1009}\right) = \left(\frac{17}{31}\right) = \left(\frac{31}{17}\right) = \left(\frac{14}{17}\right) = \left(\frac{2}{17}\right)\left(\frac{7}{17}\right) = \left(\frac{17}{7}\right) = \left(\frac 37\right) = -\left(\frac 73\right) = -\left(\frac 13\right) = -1,
$$

where $\bigl(\frac 2{17}\bigr) = 1$ because $17 \equiv 1 \pmod 8$, and the sign in $\bigl(\frac37\bigr) = -\bigl(\frac73\bigr)$ appears because $3 \equiv 7 \equiv 3 \pmod 4$. Hence $\bigl(\frac{713}{1009}\bigr) = (-1)(-1) = 1$: the congruence $x^2 \equiv 713 \pmod{1009}$ has two solutions.
:::
:::

::: example For which primes is 3 a square? {#ex-three}
Show that $3$ is a quadratic residue modulo a prime $p > 3$ if and only if $p \equiv \pm 1 \pmod{12}$.
::: solution
By reciprocity, $\bigl(\frac3p\bigr) = \bigl(\frac p3\bigr)$ if $p \equiv 1 \pmod 4$ and $\bigl(\frac 3p\bigr) = -\bigl(\frac p3\bigr)$ if $p \equiv 3 \pmod 4$. Also $\bigl(\frac p3\bigr) = 1$ if $p \equiv 1 \pmod 3$ and $-1$ if $p \equiv 2 \pmod 3$. Combining the four cases using the Chinese remainder theorem modulo $12$:

| $p \bmod 12$ | $1$ | $5$ | $7$ | $11$ |
|---|---|---|---|---|
| $p \bmod 4$, $p \bmod 3$ | $1, 1$ | $1, 2$ | $3, 1$ | $3, 2$ |
| $\bigl(\frac 3p\bigr)$ | $+1$ | $-1$ | $-1$ | $+1$ |

So $\bigl(\frac 3p\bigr) = 1$ exactly when $p \equiv \pm 1 \pmod{12}$. In the same way $\bigl(\frac 5p\bigr) = \bigl(\frac p5\bigr)$ (as $5 \equiv 1 \pmod 4$), which is $1$ exactly when $p \equiv \pm 1 \pmod 5$ — the pattern from the introduction.
:::
:::

::: quiz
What is $\left(\frac{2}{17}\right)$?
- [x] $1$
- [ ] $-1$
- [ ] $0$
::: solution
$17 \equiv 1 \pmod 8$, so $\bigl(\frac 2{17}\bigr) = 1$ by the second supplementary law. Indeed $6^2 = 36 = 2\cdot 17 + 2$.
:::
:::

::: warning Reciprocity is for odd primes only
The law [[#eq-qr]] applies to two **distinct odd primes**. The symbols $\bigl(\frac{-1}p\bigr)$ and $\bigl(\frac 2p\bigr)$ cannot be "flipped" — they are handled by the supplementary laws — so before flipping, factor out $-1$ and powers of $2$. Similarly, Eisenstein's lemma needs $a$ odd: for $a = 2$ it would predict $\bigl(\frac 2p\bigr) = (-1)^0 = 1$ for every $p$, since $\lfloor 2k/p\rfloor = 0$ for $k \le \frac{p-1}2$, which is false for $p = 3$. And do not forget the sign: when both primes are $\equiv 3 \pmod 4$, flipping changes the sign.
:::

## The Jacobi symbol

Using reciprocity on $\bigl(\frac{713}{1009}\bigr)$ required factorising $713$, which is impractical for large numbers. The Jacobi symbol removes this step.

::: definition Jacobi symbol {#def-jacobi}
Let $n$ be an odd positive integer with prime factorisation $n = p_1p_2\cdots p_r$ (primes repeated). For any integer $a$, the **Jacobi symbol** is

$$
\left(\frac an\right) = \left(\frac a{p_1}\right)\left(\frac a{p_2}\right)\cdots\left(\frac a{p_r}\right),
$$

a product of Legendre symbols (with $\bigl(\frac a1\bigr) = 1$).
:::

The Jacobi symbol is multiplicative in $a$ and in $n$, depends only on $a \bmod n$, and satisfies the same laws as the Legendre symbol: for odd positive coprime $m, n$,

$$
\left(\frac mn\right)\left(\frac nm\right) = (-1)^{\frac{m-1}2\cdot\frac{n-1}2}, \qquad \left(\frac{-1}{n}\right) = (-1)^{\frac{n-1}2}, \qquad \left(\frac 2n\right) = (-1)^{\frac{n^2-1}8} .
$$

These follow from the prime case by multiplicativity, using the congruences $\frac{mn - 1}2 \equiv \frac{m-1}2 + \frac{n-1}2 \pmod 2$ and $\frac{m^2n^2 - 1}8 \equiv \frac{m^2-1}8 + \frac{n^2-1}8 \pmod 2$ for odd $m, n$ (see Ireland and Rosen, §5.2). So a Jacobi symbol can be evaluated like a gcd — reduce, pull out factors of $2$, flip — without any factorisation. For example, using $1009 = 713 + 296$ and $296 = 2^3\cdot 37$:

$$
\left(\frac{713}{1009}\right) = \left(\frac{296}{713}\right) = \left(\frac{2}{713}\right)^3\left(\frac{37}{713}\right) = \left(\frac{713}{37}\right) = \left(\frac{10}{37}\right) = \left(\frac{2}{37}\right)\left(\frac{5}{37}\right) = (-1)\left(\frac{2}{5}\right) = (-1)(-1) = 1,
$$

since $713 \equiv 1 \pmod 8$, $1009, 37 \equiv 1 \pmod 4$, $713 = 19\cdot 37 + 10$, $37 \equiv 5 \pmod 8$ and $37 \equiv 2 \pmod 5$. The answer agrees with [[#ex-legendre-large]]. The procedure mirrors Euclid's algorithm — each flip replaces the pair $(a, n)$ by $(n \bmod a, a)$ — so, by the same analysis as Lamé's theorem ([[number-theory/divisibility#thm-lame]]), the number of steps grows only like the number of digits of $n$. Symbols with numbers of hundreds of digits are evaluated in a fraction of a millisecond.

::: warning A Jacobi symbol of 1 does not mean "square"
If $n$ is composite, $\bigl(\frac an\bigr) = 1$ does **not** imply that $a$ is a square modulo $n$. For example $\bigl(\frac 2{15}\bigr) = \bigl(\frac23\bigr)\bigl(\frac25\bigr) = (-1)(-1) = 1$, but the squares modulo $15$ are $0, 1, 4, 6, 9, 10$, so $2$ is not one of them. The implication does hold in the other direction: $\bigl(\frac an\bigr) = -1$ guarantees that $a$ is not a square modulo $n$. For prime $n$ the Jacobi and Legendre symbols coincide.
:::

::: remark Square roots modulo composite numbers
For a composite modulus, combine the prime case with the Chinese remainder theorem ([[number-theory/congruences#thm-crt]]). If $n = p_1\cdots p_r$ is a product of distinct odd primes and $\gcd(a, n) = 1$, then $x^2 \equiv a \pmod n$ is solvable exactly when $\bigl(\frac a{p_i}\bigr) = 1$ for **every** $i$, and then it has $2^r$ solutions: choose one of the two square roots modulo each $p_i$ and glue them together. For example $x^2 \equiv 4 \pmod{35}$ has the four solutions $2, 12, 23, 33$ (the combinations of $\pm 2 \bmod 5$ and $\pm 2 \bmod 7$), while $x^2 \equiv 6 \pmod{35}$ has none: $6 \equiv 1$ is a square modulo $5$, but $6 \equiv -1$ is not a square modulo $7$ because $7 \equiv 3 \pmod 4$. Finding square roots modulo $n = pq$ without knowing $p$ and $q$ is as hard as factorising $n$, the basis of the Rabin cryptosystem.
:::

::: application Square roots and primality testing
For a prime $p \equiv 3 \pmod 4$ and a residue $a$, $x = a^{(p+1)/4} \bmod p$ is a square root of $a$, since $x^2 = a\cdot a^{(p-1)/2} \equiv a$ — this is how square roots are extracted in the Rabin cryptosystem and in elliptic-curve software. The Solovay–Strassen primality test (1977) checks Euler's criterion $a^{(n-1)/2} \equiv \bigl(\frac an\bigr) \pmod n$ with the Jacobi symbol for random $a$: every prime passes, and a composite $n$ fails for at least half of the $a$ coprime to $n$. Pépin's test (1877) shows that a Fermat number $F = 2^{2^k} + 1$ is prime exactly when $3^{(F-1)/2} \equiv -1 \pmod F$; reciprocity explains why $3$ is the right base ([[#exr-6-10]]).
:::

::: history
Euler discovered the reciprocity law experimentally in the 1740s–1780s, stating it in several equivalent forms. Adrien-Marie Legendre published a proof in 1785 and again in his *Essai sur la théorie des nombres* (1798), where he introduced his symbol; but the proof assumed results, such as the existence of suitable auxiliary primes, that he could not establish. Carl Friedrich Gauss found the first complete proof in 1796 and published it in the *Disquisitiones Arithmeticae* (1801), calling the law the *theorema fundamentale*; he eventually found eight proofs. Gauss's lemma appeared in his third proof (1808). Ferdinand Gotthold Eisenstein gave the lattice-point proof used here in 1844, and Carl Gustav Jacob Jacobi introduced his symbol in 1837. Hundreds of proofs have since been published, and the search for analogues — cubic, biquadratic and higher reciprocity laws — led eventually to class field theory, one of the great achievements of twentieth-century number theory.
:::

## Where this leads

Quadratic residues reappear in [[number-theory/diophantine]], where $\bigl(\frac{-1}p\bigr) = 1$ is the first step in deciding which primes are sums of two squares, and in [[number-theory/cryptography]], whose Miller–Rabin primality test is a sharper form of the congruence $a^{(p-1)/2} \equiv \pm 1$ given by Euler's criterion. The number of solutions of $x^2 \equiv a \pmod n$ for composite $n$ follows by combining the prime case with the Chinese remainder theorem ([[number-theory/congruences]]). In algebraic number theory, quadratic reciprocity describes how primes split in quadratic fields such as $\Q(\sqrt{5})$, and it is the simplest instance of the reciprocity laws studied through Galois groups ([[abstract-algebra/fields-galois]]).

::: summary
- Modulo an odd prime $p$, exactly half of the non-zero residues are **quadratic residues**; each has two square roots $\pm x$.
- The **Legendre symbol** $\bigl(\frac ap\bigr)$ is $1$, $-1$ or $0$; **Euler's criterion**: $\bigl(\frac ap\bigr) \equiv a^{(p-1)/2} \pmod p$, so the symbol is multiplicative.
- **First supplement**: $\bigl(\frac{-1}p\bigr) = (-1)^{(p-1)/2}$; hence odd primes dividing $n^2 + 1$ are $\equiv 1 \pmod 4$, and there are infinitely many such primes.
- **Gauss's lemma**: $\bigl(\frac ap\bigr) = (-1)^\mu$, $\mu$ = number of negative least absolute residues among $a, 2a, \dots, \frac{p-1}2a$; it gives the **second supplement** $\bigl(\frac 2p\bigr) = 1 \iff p \equiv \pm1 \pmod 8$.
- **Quadratic reciprocity**: $\bigl(\frac pq\bigr)\bigl(\frac qp\bigr) = (-1)^{\frac{p-1}2\frac{q-1}2}$, proved by Eisenstein's lemma and counting lattice points under the line $py = qx$.
- Reciprocity computes any Legendre symbol; the **Jacobi symbol** does so without factorising, but $\bigl(\frac an\bigr) = 1$ does not mean $a$ is a square modulo composite $n$.
- For $p \equiv 3 \pmod 4$, a square root of a residue $a$ is $a^{(p+1)/4} \bmod p$.
:::

## Exercises

::: exercise Residues modulo 13 {level=1 check="6"}
List the quadratic residues modulo $13$. How many are there?
::: solution
Squaring $1, \dots, 6$: $1, 4, 9, 16 \equiv 3, 25 \equiv 12, 36 \equiv 10$. The residues are $1, 3, 4, 9, 10, 12$ — six of them, i.e. $\frac{13-1}2$.
:::
:::

::: exercise A symbol by Euler's criterion {level=1 check="-1"}
Use Euler's criterion to compute $\left(\frac{7}{13}\right)$.
::: solution
$7^6 \bmod 13$: $7^2 = 49 \equiv 10$, $7^4 \equiv 100 \equiv 9$, $7^6 \equiv 90 \equiv 12 \equiv -1$. So $\bigl(\frac 7{13}\bigr) = -1$, consistent with the list in [[#exr-6-1]].
:::
:::

::: exercise Is −1 a square modulo 101? {level=1 check="1"}
Compute $\left(\frac{-1}{101}\right)$, and find a square root of $-1$ modulo $101$.
::: solution
$101 \equiv 1 \pmod 4$, so $\bigl(\frac{-1}{101}\bigr) = 1$. A square root is easy to spot: $10^2 = 100 \equiv -1 \pmod{101}$.
:::
:::

::: exercise Square roots modulo 19 {level=2 check="9"}
Solve $x^2 \equiv 5 \pmod{19}$ and enter the smaller solution in $\set{1, \dots, 18}$.
::: solution
From [[#ex-euler-criterion]], $\bigl(\frac{5}{19}\bigr) = 1$ and $x \equiv \pm 5^5 \equiv \pm 9$. So $x \equiv 9$ or $x \equiv 10 \pmod{19}$; the smaller is $9$.
:::
:::

::: exercise A Jacobi symbol {level=2 check="1"}
Compute $\left(\frac{219}{383}\right)$ ($383$ is prime) using the Jacobi symbol, without factorising $219$.
::: solution
Both $219$ and $383$ are $\equiv 3 \pmod 4$, so reciprocity introduces a minus sign: $\bigl(\frac{219}{383}\bigr) = -\bigl(\frac{383}{219}\bigr) = -\bigl(\frac{164}{219}\bigr)$. Now $164 = 4\cdot 41$, so $\bigl(\frac{164}{219}\bigr) = \bigl(\frac{41}{219}\bigr) = \bigl(\frac{219}{41}\bigr)$ (as $41 \equiv 1 \pmod 4$) $= \bigl(\frac{14}{41}\bigr) = \bigl(\frac{2}{41}\bigr)\bigl(\frac{7}{41}\bigr)$. Here $41 \equiv 1 \pmod 8$ gives $\bigl(\frac 2{41}\bigr) = 1$, and $\bigl(\frac 7{41}\bigr) = \bigl(\frac{41}{7}\bigr) = \bigl(\frac 67\bigr) = \bigl(\frac 27\bigr)\bigl(\frac 37\bigr) = 1\cdot(-1) = -1$. So $\bigl(\frac{164}{219}\bigr) = -1$ and $\bigl(\frac{219}{383}\bigr) = -(-1) = 1$.
:::
:::

::: exercise When is −3 a square? {level=2}
Prove that $-3$ is a quadratic residue modulo a prime $p > 3$ if and only if $p \equiv 1 \pmod 3$.
::: solution
$\bigl(\frac{-3}p\bigr) = \bigl(\frac{-1}p\bigr)\bigl(\frac 3p\bigr) = (-1)^{\frac{p-1}2}\bigl(\frac 3p\bigr)$. By reciprocity $\bigl(\frac 3p\bigr) = (-1)^{\frac{p-1}2\cdot\frac{3-1}{2}}\bigl(\frac p3\bigr) = (-1)^{\frac{p-1}2}\bigl(\frac p3\bigr)$. Multiplying, the signs cancel: $\bigl(\frac{-3}p\bigr) = \bigl(\frac p3\bigr)$, which is $1$ exactly when $p \equiv 1 \pmod 3$.
:::
:::

::: exercise Prime divisors of n² − 2 {level=2}
Show that every odd prime divisor of $n^2 - 2$ is congruent to $\pm 1 \pmod 8$.
::: solution
If $p$ is an odd prime with $p \mid n^2 - 2$, then $n^2 \equiv 2 \pmod p$ and $p \nmid n$ (else $p \mid 2$). So $2$ is a quadratic residue, $\bigl(\frac 2p\bigr) = 1$, and by the second supplementary law $p \equiv \pm 1 \pmod 8$. For example $7^2 - 2 = 47 \equiv -1 \pmod 8$, and $11^2 - 2 = 119 = 7 \cdot 17$ with $7 \equiv -1$ and $17 \equiv 1 \pmod 8$.
:::
:::

::: exercise Infinitely many primes ≡ 1 (mod 3) {level=3}
Prove that there are infinitely many primes $p \equiv 1 \pmod 3$.
::: hint
Consider $N = (2p_1\cdots p_k)^2 + 3$ and use [[#exr-6-6]].
:::
::: solution
Let $p_1, \dots, p_k$ be primes $\equiv 1 \pmod 3$ and $N = (2P)^2 + 3$ with $P = p_1\cdots p_k$. Then $N$ is odd, and $N \equiv (2P)^2 \equiv 1 \pmod 3$ (since $3 \nmid 2P$), so $2, 3 \nmid N$. Let $q$ be a prime factor of $N$; then $q > 3$, $(2P)^2 \equiv -3 \pmod q$ and $q \nmid 2P$ (else $q \mid 3$), so $-3$ is a quadratic residue modulo $q$ and $q \equiv 1 \pmod 3$ by [[#exr-6-6]]. And $q \neq p_i$, since otherwise $q \mid N - (2P)^2 = 3$. So there is always another prime $\equiv 1 \pmod 3$.
:::
:::

::: exercise The sum of the residues {level=3}
Let $p \equiv 1 \pmod 4$. Prove that the sum of the quadratic residues in $\set{1, 2, \dots, p-1}$ is $\frac{p(p-1)}4$.
::: solution
Since $\bigl(\frac{-1}p\bigr) = 1$, multiplicativity gives $\bigl(\frac{p-a}{p}\bigr) = \bigl(\frac{-a}{p}\bigr) = \bigl(\frac ap\bigr)$: $a$ is a residue if and only if $p - a$ is. As $p$ is odd, $a \neq p - a$, so the $\frac{p-1}2$ residues split into $\frac{p-1}4$ pairs $\set{a, p - a}$, each with sum $p$. The total is $\frac{p-1}4\cdot p$. For $p = 13$: $1 + 3 + 4 + 9 + 10 + 12 = 39 = \frac{13\cdot 12}{4}$.
:::
:::

::: exercise Fermat primes and the number 3 {level=3}
Let $F = 2^{2^k} + 1$ with $k \ge 1$ be prime. Prove that $3$ is a primitive root modulo $F$, and hence $3^{(F-1)/2} \equiv -1 \pmod F$.
::: solution
Since $k \ge 1$, $F \equiv 1 \pmod 4$, so reciprocity gives $\bigl(\frac 3F\bigr) = \bigl(\frac F3\bigr)$. Now $2^{2^k} = 4^{2^{k-1}} \equiv 1 \pmod 3$, so $F \equiv 2 \pmod 3$ and $\bigl(\frac F3\bigr) = -1$. By Euler's criterion $3^{(F-1)/2} \equiv -1 \pmod F$. The only prime dividing $F - 1 = 2^{2^k}$ is $2$, so by the primitive root test ([[number-theory/primitive-roots#thm-primitive-root-test]]) $3$ is a primitive root. (For $F = 5, 17, 257, 65537$ this can be checked directly; Pépin's test uses the converse to test Fermat numbers for primality.)
:::
:::
