If today is a Thursday, what day of the week will it be in $1461$ days? What is the last digit of $7^{100}$? Is $918\,082$ divisible by $11$? Each question asks only for a *remainder*, and computing the huge number first would be wasteful. Gauss's great idea, in the opening pages of his *Disquisitiones Arithmeticae* of 1801, was to introduce a notation — the **congruence** $a \equiv b \pmod n$ — that lets us calculate with remainders as if they were numbers, adding, subtracting, multiplying and raising to powers while ignoring multiples of $n$.

This chapter develops that arithmetic. We prove that congruences can be added and multiplied, see how familiar divisibility tests fall out at once, and find exactly when we can **divide** modulo $n$: precisely when the divisor is coprime to $n$, by Bézout's identity. We then solve linear congruences $ax \equiv b \pmod n$ completely, and finish with the **Chinese remainder theorem**, which solves several congruences simultaneously and lets us split a computation modulo a composite number into independent computations modulo its factors.

## Congruence modulo n

::: definition Congruence {#def-congruence}
Let $n \ge 1$. Integers $a$ and $b$ are **congruent modulo $n$**, written

$$
a \equiv b \pmod n,
$$

if $n \mid a - b$. The number $n$ is the **modulus**. If $n \nmid a - b$ we write $a \not\equiv b \pmod n$.
:::

For example $38 \equiv 14 \pmod{12}$, since $38 - 14 = 24$; $-3 \equiv 9 \pmod{12}$; and $a \equiv 0 \pmod n$ just says $n \mid a$. On a $12$-hour clock, $38$ o'clock is $2$ o'clock: congruence modulo $12$ is clock arithmetic.

::: proposition Congruence and remainders {#prop-same-remainder}
$a \equiv b \pmod n$ if and only if $a$ and $b$ leave the same remainder on division by $n$. In particular every integer is congruent modulo $n$ to exactly one of $0, 1, \dots, n - 1$, namely its remainder $a \bmod n$.
:::

::: proof
Write $a = nq + r$ and $b = nq' + r'$ with $0 \le r, r' < n$ ([[number-theory/divisibility#thm-division-algorithm]]). Then $a - b = n(q - q') + (r - r')$, so $n \mid a - b$ if and only if $n \mid r - r'$. Since $-n < r - r' < n$, this happens if and only if $r = r'$.
:::

It follows that congruence modulo $n$ is an **equivalence relation** (reflexive, symmetric, transitive — "having the same remainder" obviously is; see [[proofs/relations]]). Its equivalence classes are the **residue classes**

$$
[a] = \set{\dots, a - 2n, a - n, a, a + n, a + 2n, \dots} = a + n\Z,
$$

and there are exactly $n$ of them, $[0], [1], \dots, [n-1]$. A set containing exactly one integer from each class, such as $\set{0, 1, \dots, n-1}$ or $\set{-1, 0, 1}$ modulo $3$, is a **complete residue system**. The set of residue classes is written $\Z/n\Z$; in abstract algebra it is the ring $\Z_n$ ([[abstract-algebra/rings]]).

::: widget modular
n: 12
mode: clock
a: 5
caption: Arithmetic on a $12$-hour clock is arithmetic modulo $12$: adding $5$ repeatedly visits $0, 5, 10, 3, 8, 1, \dots$ and returns to $0$ only after twelve steps, because $\gcd(5, 12) = 1$. Every integer lands on one of the twelve positions, its residue class; for instance $38$ and $-10$ both land on $2$.
:::

## Arithmetic with congruences

The crucial fact is that congruences can be combined like equations.

::: theorem Congruence arithmetic {#thm-congruence-arith}
Suppose $a \equiv b \pmod n$ and $c \equiv d \pmod n$. Then

$$
a + c \equiv b + d, \qquad a - c \equiv b - d, \qquad ac \equiv bd, \qquad a^k \equiv b^k \pmod n
$$

for every integer $k \ge 0$.
:::

::: proof
We have $n \mid a - b$ and $n \mid c - d$. Then $(a + c) - (b + d) = (a - b) + (c - d)$ and $(a - c) - (b - d) = (a - b) - (c - d)$ are divisible by $n$. For products,

$$
ac - bd = a(c - d) + d(a - b),
$$

a combination of multiples of $n$. Taking $c = a$, $d = b$ repeatedly (induction on $k$) gives $a^k \equiv b^k$.
:::

So in any expression built from sums and products we may replace any number by anything congruent to it — usually by its remainder, or by a small negative number. This is what makes the operations on residue classes, $[a] + [b] = [a + b]$ and $[a][b] = [ab]$, **well defined**: the answer does not depend on the representatives chosen.

::: example Days, digits and divisibility {#ex-congruence-computations}
(a) 1 January 2026 was a Thursday. On which day of the week does 1 January 2030 fall? (b) Find the last digit of $7^{100}$. (c) Show that $7 \mid 3^{2n+1} + 2^{n+2}$ for every $n \ge 0$.
::: solution
(a) Between the two dates lie the years 2026, 2027, 2028 (a leap year) and 2029, that is $365 + 365 + 366 + 365 = 1461$ days. Days of the week repeat with period $7$, and $1461 = 7\cdot 208 + 5$, so $1461 \equiv 5 \pmod 7$. Five days after a Thursday is a Tuesday.

(b) The last digit is the residue modulo $10$. Now $7^2 = 49 \equiv -1 \pmod{10}$, so $7^4 \equiv (-1)^2 = 1$ and

$$
7^{100} = (7^4)^{25} \equiv 1^{25} = 1 \pmod{10} .
$$

The last digit is $1$.

(c) Modulo $7$, $3^2 = 9 \equiv 2$, so $3^{2n+1} = 3\cdot 9^n \equiv 3\cdot 2^n$, while $2^{n+2} = 4\cdot 2^n$. Adding, $3^{2n+1} + 2^{n+2} \equiv 7\cdot 2^n \equiv 0 \pmod 7$.
:::
:::

Repeated use of [[#thm-congruence-arith]] shows that any polynomial with integer coefficients respects congruences.

::: corollary Polynomials respect congruences {#cor-poly-congruence}
If $f(x) = c_kx^k + \dots + c_1x + c_0$ has integer coefficients and $a \equiv b \pmod n$, then $f(a) \equiv f(b) \pmod n$.
:::

::: proof
By [[#thm-congruence-arith]], $a^i \equiv b^i$ for each $i$, hence $c_ia^i \equiv c_ib^i$, and summing the congruences gives $f(a) \equiv f(b)$.
:::

This turns questions about infinitely many integers into finitely many checks: to see whether $f(x) \equiv 0 \pmod n$ has a solution, it is enough to try one representative from each residue class.

::: example A polynomial never divisible by 5 {#ex-poly-mod-5}
Show that $x^2 + x + 1$ is never divisible by $5$, and that no perfect square ends in the digit $2$, $3$, $7$ or $8$.
::: solution
By [[#cor-poly-congruence]] the value of $f(x) = x^2 + x + 1$ modulo $5$ depends only on $x \bmod 5$. Trying the five classes,

$$
f(0) = 1,\quad f(1) = 3,\quad f(2) = 7 \equiv 2,\quad f(3) = 13 \equiv 3,\quad f(4) = 21 \equiv 1 \pmod 5,
$$

and none is $0$. So $5 \nmid x^2 + x + 1$ for every integer $x$. Similarly, the last digit of $x^2$ is determined by $x \bmod 10$, and the squares of $0, 1, \dots, 9$ end in $0, 1, 4, 9, 6, 5, 6, 9, 4, 1$. The digits $2, 3, 7, 8$ never occur, so a number such as $1\,234\,567$ cannot be a perfect square — no computation of square roots needed.
:::
:::

::: intuition A new number system
It helps to think of $\Z/n\Z$ as a number system in its own right, with exactly $n$ "numbers" $[0], \dots, [n-1]$ arranged in a circle. Addition and multiplication work as usual and obey the familiar laws (commutativity, associativity, distributivity), because they are inherited from $\Z$. Two things are new: the circle wraps around, so $[n] = [0]$ and there is no meaningful notion of "positive" or "larger"; and some non-zero numbers may multiply to zero. The rest of this chapter is about the second point.
:::

**Divisibility tests.** Write a number in decimal as $N = d_k10^k + \dots + d_110 + d_0$. Since $10 \equiv 1 \pmod 9$, every power $10^i \equiv 1$, and so

$$
N \equiv d_k + \dots + d_1 + d_0 \pmod 9 :
$$

a number is congruent to its digit sum modulo $9$ (and modulo $3$). Since $10 \equiv -1 \pmod{11}$, $10^i \equiv (-1)^i$, and $N$ is congruent modulo $11$ to its **alternating digit sum** $d_0 - d_1 + d_2 - \cdots$. For $918\,082$ the alternating sum is $2 - 8 + 0 - 8 + 1 - 9 = -22 \equiv 0$, so $11 \mid 918\,082$ (indeed $918\,082 = 11 \cdot 83\,462$), while its digit sum $28$ shows it leaves remainder $1$ on division by $9$. The rule modulo $9$ is the basis of **casting out nines**, an old check on hand multiplication: if $ab = c$ then the digit sums must satisfy $s(a)s(b) \equiv s(c) \pmod 9$.

::: warning Division and exponents need care
Congruences may be multiplied but not, in general, divided. For example $2\cdot 4 \equiv 2\cdot 1 \pmod 6$, since $8 - 2 = 6$, yet $4 \not\equiv 1 \pmod 6$. The correct rule is [[#prop-cancel]] below. Likewise, **exponents may not be reduced modulo $n$**: $10 \equiv 3 \pmod 7$, but $2^{10} = 1024 \equiv 2 \pmod 7$ while $2^3 = 8 \equiv 1 \pmod 7$. Exponents can be reduced modulo the order of the base — by Fermat and Euler, modulo $p - 1$ or $\varphi(n)$ ([[number-theory/fermat-euler]]).
:::

::: proposition Cancellation {#prop-cancel}
If $ac \equiv bc \pmod n$ and $d = \gcd(c, n)$, then $a \equiv b \pmod{n/d}$. In particular, if $\gcd(c, n) = 1$ then $ac \equiv bc \pmod n$ implies $a \equiv b \pmod n$.
:::

::: proof
We have $n \mid (a - b)c$, so $\frac nd \mid (a - b)\frac cd$. Since $\gcd\!\left(\frac nd, \frac cd\right) = 1$ ([[number-theory/divisibility#cor-bezout]]), [[number-theory/divisibility#thm-coprime-divides]] gives $\frac nd \mid a - b$.
:::

In the example above, $2\cdot 4 \equiv 2\cdot 1 \pmod 6$ gives $4 \equiv 1 \pmod 3$, which is true.

::: quiz
Which of the following statements are true? (Select all that apply.)
- [x] $25 \equiv 1 \pmod{12}$
- [x] $-5 \equiv 7 \pmod{12}$
- [x] $3\cdot 4 \equiv 0 \pmod{12}$
- [ ] If $2x \equiv 2 \pmod{12}$ then $x \equiv 1 \pmod{12}$
::: solution
$25 - 1 = 24$ and $-5 - 7 = -12$ are multiples of $12$, and $12 \equiv 0$. The last statement fails for $x = 7$: $2\cdot 7 = 14 \equiv 2$. By [[#prop-cancel]], $2x \equiv 2 \pmod{12}$ only gives $x \equiv 1 \pmod 6$, i.e. $x \equiv 1$ or $7 \pmod{12}$.
:::
:::

## Inverses modulo n

Dividing by $a$ modulo $n$ means multiplying by an **inverse**: an integer $x$ with $ax \equiv 1 \pmod n$.

::: theorem Inverses modulo n {#thm-inverse-mod}
An integer $a$ has an inverse modulo $n$ if and only if $\gcd(a, n) = 1$. The inverse is then unique modulo $n$, and it can be computed by the extended Euclidean algorithm.
:::

::: proof
$ax \equiv 1 \pmod n$ means $ax - 1 = ny$ for some integer $y$, i.e. $ax - ny = 1$. By Bézout's identity ([[number-theory/divisibility#thm-bezout]]) such $x, y$ exist if and only if $\gcd(a, n) = 1$, and the extended Euclidean algorithm finds them. If $ax \equiv ax' \equiv 1$, then $x \equiv x(ax') = (xa)x' \equiv x' \pmod n$.
:::

::: example An inverse modulo 120 {#ex-inverse}
Find the inverse of $17$ modulo $120$.
::: solution
Euclid's algorithm: $120 = 7\cdot 17 + 1$. So $1 = 120 - 7\cdot 17$, i.e. $17\cdot(-7) \equiv 1 \pmod{120}$. The inverse is $-7 \equiv 113 \pmod{120}$. Check: $17 \cdot 113 = 1921 = 16\cdot 120 + 1$. (This is exactly the computation used to make an RSA decryption key in [[number-theory/cryptography]].)
:::
:::

The residue classes coprime to $n$ are the **units** modulo $n$; they form a group under multiplication, written $(\Z/n\Z)^\times$ (or $U(n)$ in [[abstract-algebra/groups]]), whose order is Euler's totient $\varphi(n)$. The other non-zero classes are **zero-divisors**: if $d = \gcd(a, n) > 1$, then $a\cdot\frac nd = \frac ad\cdot n \equiv 0$ although $\frac nd \not\equiv 0$. When $n = p$ is prime, every non-zero class is a unit, so $\Z/p\Z$ is a **field**: we can add, subtract, multiply and divide, as with rational numbers ([[abstract-algebra/rings#thm-zn-field]]).

::: proposition Multiplying by a unit permutes the residues {#prop-unit-permutes}
If $\gcd(a, n) = 1$ and $r_1, \dots, r_n$ is a complete residue system modulo $n$, then so is $ar_1, \dots, ar_n$. Likewise multiplication by $a$ permutes the residue classes coprime to $n$.
:::

::: proof
There are $n$ numbers $ar_i$, so it suffices to show they are pairwise incongruent. If $ar_i \equiv ar_j \pmod n$, then cancelling the unit $a$ ([[#prop-cancel]]) gives $r_i \equiv r_j$, so $i = j$. For the second statement, note also that $\gcd(ar, n) = 1$ whenever $\gcd(r, n) = 1$.
:::

For example, multiplying $0, 1, 2, 3, 4, 5, 6$ by $3$ modulo $7$ gives $0, 3, 6, 2, 5, 1, 4$ — the same residues in a different order. This innocent-looking fact is the heart of the proof of Fermat's little theorem in [[number-theory/fermat-euler]].

::: warning Two meanings of "mod"
The notation $a \equiv b \pmod n$ is a **relation** between $a$ and $b$, while $a \bmod n$ is an **operation** producing a number in $\set{0, \dots, n-1}$. So $17 \equiv -7 \pmod{12}$ is true, and $17 \bmod 12 = 5$ is true, but "$17 \bmod 12 = -7$" is false. Write $a \equiv b \pmod n$ when you mean that $a$ and $b$ are interchangeable modulo $n$, and $a \bmod n$ only when you want the standard remainder.
:::

::: widget modular
n: 26
mode: inverses
caption: Inverses modulo $26$, the modulus of the alphabet. Only the twelve residues coprime to $26$ — the odd numbers other than $13$ — have inverses, for example $3 \cdot 9 = 27 \equiv 1$ and $5\cdot 21 = 105 \equiv 1$. This is why the affine cipher $x \mapsto ax + b \pmod{26}$ can be deciphered only when $\gcd(a, 26) = 1$: deciphering needs $a^{-1}$.
:::

## Linear congruences

A **linear congruence** is $ax \equiv b \pmod n$. A solution is really a residue class: if $x$ works, so does $x + kn$. So "the number of solutions" means the number of solutions modulo $n$.

::: theorem Solving linear congruences {#thm-linear-congruence}
Let $d = \gcd(a, n)$. The congruence $ax \equiv b \pmod n$ has a solution if and only if $d \mid b$. In that case it has exactly $d$ solutions modulo $n$: if $x_0$ is one solution, they are

$$
x_0,\quad x_0 + \frac nd,\quad x_0 + 2\frac nd,\quad \dots,\quad x_0 + (d-1)\frac nd .
$$
:::

::: proof
$ax \equiv b \pmod n$ has a solution if and only if $ax - ny = b$ has an integer solution, which happens if and only if $d \mid b$ ([[number-theory/divisibility#cor-bezout]]).

Now suppose $d \mid b$ and $x_0$ is a solution. For any $x$: $ax \equiv b \equiv ax_0 \pmod n$ if and only if $a(x - x_0) \equiv 0 \pmod n$, if and only if (dividing by $d$) $\frac nd \mid \frac ad(x - x_0)$, if and only if $\frac nd \mid x - x_0$, since $\gcd(\frac nd, \frac ad) = 1$. So the solutions are exactly the $x \equiv x_0 \pmod{n/d}$. Modulo $n$, the class of $x_0$ modulo $n/d$ splits into the $d$ distinct classes $x_0 + k\frac nd$, $0 \le k < d$.
:::

In practice: divide $a$, $b$ and $n$ by $d$, solve $\frac ad x \equiv \frac bd \pmod{\frac nd}$ using an inverse, and then list the $d$ lifts.

::: example Two linear congruences {#ex-linear}
Solve (a) $12x \equiv 18 \pmod{30}$ and (b) $6x \equiv 7 \pmod 9$.
::: solution
(a) $d = \gcd(12, 30) = 6$ divides $18$, so there are $6$ solutions modulo $30$. Divide by $6$: $2x \equiv 3 \pmod 5$. The inverse of $2$ modulo $5$ is $3$, so $x \equiv 3\cdot 3 = 9 \equiv 4 \pmod 5$. Modulo $30$ the solutions are

$$
x \equiv 4, 9, 14, 19, 24, 29 \pmod{30} .
$$

Check one: $12\cdot 9 = 108 = 3\cdot 30 + 18$.

(b) $\gcd(6, 9) = 3$ does not divide $7$, so there is no solution. Directly: $6x$ is always a multiple of $3$, and so is $6x - 9y$, which therefore can never equal $7$.
:::
:::

::: quiz
How many solutions modulo $10$ does $4x \equiv 6 \pmod{10}$ have?
- [ ] $0$
- [ ] $1$
- [x] $2$
- [ ] $4$
::: solution
$\gcd(4, 10) = 2$ divides $6$, so there are exactly $2$ solutions modulo $10$. Dividing by $2$: $2x \equiv 3 \pmod 5$, so $x \equiv 4 \pmod 5$, giving $x \equiv 4$ and $x \equiv 9 \pmod{10}$ (check: $16 \equiv 6$ and $36 \equiv 6$).
:::
:::

## The Chinese remainder theorem

The *Sunzi Suanjing*, a Chinese mathematical text from roughly the third to fifth century, poses a problem of the following kind: find a number that leaves remainder $2$ when divided by $3$, remainder $3$ when divided by $5$, and remainder $2$ when divided by $7$. In our language:

$$
x \equiv 2 \pmod 3, \qquad x \equiv 3 \pmod 5, \qquad x \equiv 2 \pmod 7 .
$$

::: theorem Chinese remainder theorem {#thm-crt}
Let $n_1, n_2, \dots, n_k$ be pairwise coprime positive integers and $N = n_1n_2\cdots n_k$. For any integers $a_1, \dots, a_k$ the system

$$
x \equiv a_1 \pmod{n_1},\quad x \equiv a_2 \pmod{n_2},\quad \dots,\quad x \equiv a_k \pmod{n_k}
$$

has a solution, and any two solutions are congruent modulo $N$. Explicitly, with $N_i = N/n_i$ and $M_i$ an inverse of $N_i$ modulo $n_i$,

$$
x = a_1N_1M_1 + a_2N_2M_2 + \dots + a_kN_kM_k
$$ {#eq-crt-formula}

is a solution.
:::

::: proof
*Existence.* $N_i$ is the product of the moduli other than $n_i$, each coprime to $n_i$, so $\gcd(N_i, n_i) = 1$ and the inverse $M_i$ exists ([[#thm-inverse-mod]]). For $j \neq i$, $n_j \mid N_i$, so $N_iM_i \equiv 0 \pmod{n_j}$; while $N_iM_i \equiv 1 \pmod{n_i}$. Hence modulo $n_j$ every term of [[#eq-crt-formula]] vanishes except the $j$-th, and $x \equiv a_jN_jM_j \equiv a_j \pmod{n_j}$.

*Uniqueness.* If $x$ and $y$ are solutions, then $n_i \mid x - y$ for every $i$. The $n_i$ are pairwise coprime, so their product divides $x - y$ (by repeated use of the fact that coprime divisors of a number have product dividing it, [[number-theory/divisibility#thm-coprime-divides]]). Thus $x \equiv y \pmod N$. Conversely every $y \equiv x \pmod N$ is a solution.
:::

::: example Sunzi's problem {#ex-sunzi}
Solve $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$, $x \equiv 2 \pmod 7$, first by formula [[#eq-crt-formula]] and then by successive substitution.
::: solution
*By the formula.* $N = 105$, and $N_1 = 35$, $N_2 = 21$, $N_3 = 15$. Inverses: $35 \equiv 2 \pmod 3$ with inverse $2$; $21 \equiv 1 \pmod 5$ with inverse $1$; $15 \equiv 1 \pmod 7$ with inverse $1$. So

$$
x = 2\cdot 35\cdot 2 + 3\cdot 21\cdot 1 + 2\cdot 15\cdot 1 = 140 + 63 + 30 = 233 \equiv 23 \pmod{105} .
$$

*By substitution.* The first congruence says $x = 2 + 3t$. Then $2 + 3t \equiv 3 \pmod 5$ gives $3t \equiv 1$, so $t \equiv 2 \pmod 5$, $t = 2 + 5s$ and $x = 8 + 15s$. Then $8 + 15s \equiv 2 \pmod 7$ becomes $1 + s \equiv 2$, so $s \equiv 1 \pmod 7$ and $x = 23 + 105r$. Both methods give $x \equiv 23 \pmod{105}$; check: $23 = 7\cdot 3 + 2 = 4\cdot 5 + 3 = 3\cdot 7 + 2$.
:::
:::

::: widget euclid
mode: crt
system: 2 mod 3; 3 mod 5; 2 mod 7
caption: Sunzi's system solved step by step. Each congruence cuts the candidates down: $x \equiv 2 \pmod 3$ leaves $2, 5, 8, \dots$; adding $x \equiv 3 \pmod 5$ leaves $8, 23, 38, \dots$ (period $15$); adding $x \equiv 2 \pmod 7$ leaves $23, 128, \dots$ (period $105$). The answer is unique modulo $3 \cdot 5 \cdot 7 = 105$.
:::

**Non-coprime moduli.** If the moduli share factors, a solution need not exist, and if it does it is unique only modulo the lcm. For two congruences: $x \equiv a \pmod m$ and $x \equiv b \pmod n$ are simultaneously solvable if and only if $\gcd(m, n) \mid a - b$ ([[#exr-3-9]]). For instance $x \equiv 3 \pmod 6$ and $x \equiv 5 \pmod 8$ are compatible ($\gcd = 2$ divides $5 - 3$), with solution $x \equiv 21 \pmod{24}$; but $x \equiv 1 \pmod 4$ and $x \equiv 2 \pmod 6$ are not, since the first forces $x$ odd and the second forces $x$ even.

::: remark The structure behind the theorem
The Chinese remainder theorem says that the map $x \bmod N \mapsto (x \bmod n_1, \dots, x \bmod n_k)$ is a bijection from $\Z/N\Z$ to $\Z/n_1\Z \times \dots \times \Z/n_k\Z$. By [[#thm-congruence-arith]] it respects addition and multiplication, so it is an **isomorphism of rings** ([[abstract-algebra/rings#thm-crt-rings]]). Consequently $a$ is a unit modulo $N$ if and only if it is a unit modulo every $n_i$, which is the key to the multiplicativity of Euler's function in [[number-theory/fermat-euler]].
:::

::: example Splitting a computation {#ex-crt-split}
Compute $3^{100} \bmod 35$ by working modulo $5$ and modulo $7$.
::: solution
Modulo $5$: $3^4 = 81 \equiv 1$, so $3^{100} = (3^4)^{25} \equiv 1$. Modulo $7$: $3^6 = 729 \equiv 1$ (as $729 = 104 \cdot 7 + 1$), and $100 = 6\cdot 16 + 4$, so $3^{100} \equiv 3^4 = 81 \equiv 4$. Now solve $x \equiv 1 \pmod 5$, $x \equiv 4 \pmod 7$: the candidates $1, 6, 11, \dots$ give $11 \equiv 4 \pmod 7$. So $3^{100} \equiv 11 \pmod{35}$. This divide-and-recombine strategy is how RSA decryption is sped up in practice ([[number-theory/cryptography]]).
:::
:::

::: application Check digits
Identification numbers often end with a check digit defined by a congruence, so that typing errors can be detected. In the ISBN-10 system for books the digits $d_1d_2\cdots d_{10}$ must satisfy

$$
10d_1 + 9d_2 + 8d_3 + \dots + 2d_9 + d_{10} \equiv 0 \pmod{11},
$$

with the symbol X standing for $d_{10} = 10$. For the first nine digits $0, 1, 4, 0, 4, 4, 9, 1, 3$ the weighted sum is $130 \equiv 9 \pmod{11}$, so the check digit is $2$. Because $11$ is prime, the code detects every single wrong digit and every swap of two adjacent digits ([[#exr-3-10]]). Bank card numbers use the simpler Luhn checksum modulo $10$, which catches all single-digit errors but not every transposition.
:::

::: history
Congruences were used long before they had a notation. The *Sunzi Suanjing* contains the remainder problem above, and in 1247 Qin Jiushao's *Mathematical Treatise in Nine Sections* gave a general method, the *dayan* rule, for solving systems of linear congruences, including cases with non-coprime moduli. In India, Āryabhaṭa and Brahmagupta solved such problems with the *kuṭṭaka* method. Euler worked extensively with remainders in the eighteenth century, but it was Carl Friedrich Gauss who introduced the symbol $\equiv$ and the term "congruence" in the first section of his *Disquisitiones Arithmeticae* (1801), turning a collection of tricks into an algebra. The name "Chinese remainder theorem" became common in Western textbooks only in the twentieth century.
:::

## Where this leads

Congruences are the language of the rest of the course. [[number-theory/fermat-euler]] studies powers modulo $n$ and proves the theorems of Fermat, Euler and Wilson; [[number-theory/primitive-roots]] studies the multiplicative structure of $(\Z/n\Z)^\times$; [[number-theory/quadratic-reciprocity]] asks which numbers are squares modulo $p$; and [[number-theory/cryptography]] builds RSA and Diffie–Hellman from modular exponentiation. In abstract algebra, $\Z/n\Z$ is the basic example of a quotient ring, and the Chinese remainder theorem becomes a statement about rings ([[abstract-algebra/rings]]).

::: summary
- $a \equiv b \pmod n$ means $n \mid a - b$, equivalently equal remainders; congruence is an equivalence relation with the $n$ residue classes $[0], \dots, [n-1]$.
- Congruences can be added, subtracted, multiplied and raised to powers ([[#thm-congruence-arith]]); this gives divisibility tests ($N \equiv$ digit sum mod $9$; alternating sum mod $11$).
- Cancellation needs care: $ac \equiv bc \pmod n$ gives $a \equiv b \pmod{n/\gcd(c,n)}$; exponents cannot be reduced modulo $n$.
- $a$ is invertible modulo $n$ iff $\gcd(a, n) = 1$; the inverse comes from the extended Euclidean algorithm. $\Z/p\Z$ is a field.
- $ax \equiv b \pmod n$ is solvable iff $d = \gcd(a, n)$ divides $b$, and then has exactly $d$ solutions modulo $n$.
- **Chinese remainder theorem**: for pairwise coprime moduli, a system $x \equiv a_i \pmod{n_i}$ has a unique solution modulo $\prod n_i$; it can be found by formula or by substitution.
- With non-coprime moduli, $x \equiv a \pmod m$, $x \equiv b \pmod n$ is solvable iff $\gcd(m, n) \mid a - b$, uniquely modulo $\lcm(m, n)$.
:::

## Exercises

::: exercise A power of 2 modulo 7 {level=1 check="4"}
Find $2^{50} \bmod 7$.
::: solution
$2^3 = 8 \equiv 1 \pmod 7$, and $50 = 3\cdot 16 + 2$, so $2^{50} = (2^3)^{16}\cdot 2^2 \equiv 4 \pmod 7$.
:::
:::

::: exercise An inverse modulo 31 {level=1 check="9"}
Find the inverse of $7$ modulo $31$ (as a number between $1$ and $30$).
::: solution
Euclid: $31 = 4\cdot 7 + 3$, $7 = 2\cdot 3 + 1$. Back-substituting, $1 = 7 - 2\cdot 3 = 7 - 2(31 - 4\cdot 7) = 9\cdot 7 - 2\cdot 31$. So $7^{-1} \equiv 9$; check: $63 = 2\cdot 31 + 1$.
:::
:::

::: exercise Divisibility by 11 {level=1 check="5"}
What is the remainder when $123456789$ is divided by $11$?
::: solution
The alternating digit sum from the right is $9 - 8 + 7 - 6 + 5 - 4 + 3 - 2 + 1 = 5$, so $123456789 \equiv 5 \pmod{11}$.
:::
:::

::: exercise Counting solutions {level=2 check="5"}
Solve $15x \equiv 25 \pmod{35}$. How many solutions are there modulo $35$?
::: solution
$d = \gcd(15, 35) = 5$ divides $25$, so there are $5$ solutions. Dividing by $5$: $3x \equiv 5 \pmod 7$. The inverse of $3$ modulo $7$ is $5$ ($15 \equiv 1$), so $x \equiv 25 \equiv 4 \pmod 7$. The solutions modulo $35$ are $x \equiv 4, 11, 18, 25, 32$.
:::
:::

::: exercise A system of three congruences {level=2 check="173"}
Find the smallest positive $x$ with $x \equiv 1 \pmod 4$, $x \equiv 2 \pmod 9$ and $x \equiv 3 \pmod 5$.
::: solution
The moduli are pairwise coprime, so the solution is unique modulo $180$. Substitution: $x = 1 + 4t$; then $1 + 4t \equiv 2 \pmod 9$ gives $4t \equiv 1$, and $4^{-1} \equiv 7 \pmod 9$, so $t \equiv 7$, $t = 7 + 9s$ and $x = 29 + 36s$. Then $29 + 36s \equiv 3 \pmod 5$ becomes $4 + s \equiv 3$, so $s \equiv 4 \pmod 5$ and $x = 29 + 144 = 173$. Check: $173 = 43\cdot4 + 1 = 19\cdot 9 + 2 = 34\cdot 5 + 3$.
:::
:::

::: exercise Sums of three squares {level=2}
Show that every square is congruent to $0$, $1$ or $4$ modulo $8$, and deduce that no integer $n \equiv 7 \pmod 8$ is a sum of three squares.
::: solution
Squares of $0, 1, \dots, 7$ modulo $8$ are $0, 1, 4, 1, 0, 1, 4, 1$, so every square is $\equiv 0, 1$ or $4 \pmod 8$. A sum of three such residues takes the values $0+0+0 = 0$, $1$, $2$, $3$, $4$, $5$, $6$ ($= 1+1+4$), $8 \equiv 0$, $9 \equiv 1$, $12 \equiv 4$ — checking all combinations, $7$ never occurs. So $7, 15, 23, \dots$ are not sums of three squares. (Legendre and Gauss proved that $n$ is a sum of three squares exactly when it is not of the form $4^a(8b + 7)$; see [[number-theory/diophantine]].)
:::
:::

::: exercise Remainders 1, 2, 3, 4, 5 {level=2 check="59"}
Find the smallest positive integer that leaves remainders $1, 2, 3, 4, 5$ on division by $2, 3, 4, 5, 6$ respectively.
::: hint
Each remainder is one less than the divisor.
:::
::: solution
The conditions say $x \equiv -1$ modulo $2, 3, 4, 5$ and $6$, i.e. $x + 1$ is a common multiple of $2, 3, 4, 5, 6$, hence a multiple of $\lcm(2, 3, 4, 5, 6) = 60$. The smallest positive $x$ is $59$. (The moduli are not coprime, but the congruences are compatible.)
:::
:::

::: exercise Congruent numbers share gcds {level=2}
Prove that if $a \equiv b \pmod n$ then $\gcd(a, n) = \gcd(b, n)$. Why does this make "$\gcd(a, n)$" meaningful for a residue class?
::: solution
Write $a = b + kn$. By [[number-theory/divisibility#lem-euclid-step]] (with the roles $a = b + kn$, the pairs $(a, n)$ and $(n, b)$ have the same common divisors), $\gcd(a, n) = \gcd(b, n)$. So all integers in one residue class modulo $n$ have the same gcd with $n$, and in particular the property "coprime to $n$", which decides invertibility ([[#thm-inverse-mod]]), depends only on the class.
:::
:::

::: exercise Two congruences with non-coprime moduli {level=3}
Prove that the system $x \equiv a \pmod m$, $x \equiv b \pmod n$ has a solution if and only if $d = \gcd(m, n)$ divides $a - b$, and that the solution is then unique modulo $\lcm(m, n)$.
::: solution
A solution has the form $x = a + mt$ with $a + mt \equiv b \pmod n$, i.e. $mt \equiv b - a \pmod n$. By [[#thm-linear-congruence]] this is solvable in $t$ if and only if $\gcd(m, n) \mid b - a$. For uniqueness: if $x$ and $y$ are solutions then $m \mid x - y$ and $n \mid x - y$, so $x - y$ is a common multiple of $m$ and $n$, hence a multiple of $\lcm(m, n)$; conversely adding a multiple of $\lcm(m,n)$ to a solution gives a solution.
:::
:::

::: exercise ISBN check digits catch errors {level=3}
For ISBN-10 codes, $\sum_{i=1}^{10}(11 - i)d_i \equiv 0 \pmod{11}$. Prove that changing a single digit, or swapping two adjacent different digits, always produces an invalid code.
::: solution
*Single error.* If $d_i$ is replaced by $d_i' \ne d_i$, the weighted sum changes by $(11 - i)(d_i' - d_i)$. Here $1 \le 11 - i \le 10$ and $0 < \abs{d_i' - d_i} \le 10$, so neither factor is divisible by the prime $11$, and by Euclid's lemma neither is the product. So the new sum is $\not\equiv 0$.

*Adjacent transposition.* Swapping $d_i$ and $d_{i+1}$ changes the sum by $(11 - i)d_{i+1} + (10 - i)d_i - (11 - i)d_i - (10 - i)d_{i+1} = d_{i+1} - d_i$, which is non-zero and has absolute value at most $10$, so it is not divisible by $11$. Again the code becomes invalid. (A modulus such as $10$ would fail: a weight could share a factor with $10$.)
:::
:::
