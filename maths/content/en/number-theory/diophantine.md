A **Diophantine equation** is a polynomial equation whose solutions are required to be integers (or sometimes rationals). The name honours Diophantus of Alexandria, whose *Arithmetica* collected such problems around the third century, but the questions are much older — a Babylonian clay tablet from about 1800 BC lists numbers connected with right-angled triangles with whole-number sides. Diophantine equations are deceptively hard. The equation $x^n + y^n = z^n$ looks innocent, yet proving that it has no positive solutions for $n \ge 3$ took 358 years. In 1900 David Hilbert asked, as the tenth of his famous problems, for a general method to decide whether any given Diophantine equation has a solution; in 1970 Yuri Matiyasevich, completing work of Martin Davis, Hilary Putnam and Julia Robinson, proved that **no such method can exist**.

So there is no general theory, and each family of equations needs its own ideas. In this chapter we solve completely the four most important classical families, each with a characteristic technique: **linear equations** (Bézout's identity), **Pythagorean triples** (unique factorisation), **sums of two squares** (quadratic residues and the pigeonhole principle), and **Pell's equation** (the arithmetic of numbers $x + y\sqrt d$). Along the way we meet Fermat's method of **infinite descent** and prove the case $n = 4$ of Fermat's Last Theorem.

## Linear Diophantine equations

The equation $ax + by = c$ is solvable in integers exactly when $\gcd(a, b) \mid c$ ([[number-theory/divisibility#cor-bezout]]). Now we find all solutions.

::: theorem Linear Diophantine equations {#thm-linear-diophantine}
Let $a, b$ be integers, not both zero, $d = \gcd(a, b)$, and suppose $d \mid c$. If $(x_0, y_0)$ is one solution of $ax + by = c$, then all integer solutions are

$$
x = x_0 + \frac bd\,t, \qquad y = y_0 - \frac ad\,t \qquad (t \in \Z).
$$
:::

::: proof
These are solutions: $a\left(x_0 + \frac bdt\right) + b\left(y_0 - \frac adt\right) = ax_0 + by_0 + \frac{ab}{d}t - \frac{ab}dt = c$. Conversely let $(x, y)$ be any solution. Subtracting $ax_0 + by_0 = c$ gives $a(x - x_0) = -b(y - y_0)$, and dividing by $d$,

$$
\frac ad(x - x_0) = -\frac bd(y - y_0).
$$

Since $\gcd\!\left(\frac ad, \frac bd\right) = 1$, [[number-theory/divisibility#thm-coprime-divides]] gives $\frac bd \mid x - x_0$ (if $b = 0$ the statement is immediate), say $x - x_0 = \frac bd t$. Substituting back, $\frac ad\cdot\frac bdt = -\frac bd(y - y_0)$, so $y - y_0 = -\frac ad t$ (cancelling $\frac bd \ne 0$; if $b = 0$ then $a \neq 0$ and $x$ is determined directly).
:::

So the solutions lie on a line, spaced evenly at steps of $\left(\frac bd, -\frac ad\right)$.

::: example A linear equation via Euclid {#ex-linear-diophantine}
Find all integer solutions of $1071x + 462y = 105$.
::: solution
From [[number-theory/divisibility#ex-gcd]], $\gcd(1071, 462) = 21$ and $21 = 7\cdot 462 - 3\cdot 1071$. Since $105 = 5\cdot 21$, multiplying by $5$ gives the particular solution $x_0 = -15$, $y_0 = 35$: indeed $1071\cdot(-15) + 462\cdot 35 = -16065 + 16170 = 105$. With $\frac bd = \frac{462}{21} = 22$ and $\frac ad = \frac{1071}{21} = 51$, all solutions are

$$
x = -15 + 22t, \qquad y = 35 - 51t \qquad (t \in \Z).
$$
:::
:::

::: widget euclid
a: 1071
b: 462
mode: extended
caption: The extended Euclidean algorithm for $1071$ and $462$ produces $\gcd = 21 = 1071\cdot(-3) + 462\cdot 7$. Scaling by $c/21$ gives one solution of $1071x + 462y = c$ whenever $21 \mid c$, and [[#thm-linear-diophantine]] produces all the others by moving along the line in steps of $(22, -51)$.
:::

In applications we usually need **non-negative** solutions, which form a finite set when $a, b > 0$.

::: example Hens and ducks {#ex-hens-ducks}
A farmer spends exactly £71 on hens at £3 each and ducks at £5 each. In how many ways can this be done?
::: solution
We need $3x + 5y = 71$ with $x, y \ge 0$. One solution is $x = 2$, $y = 13$, so the general solution is $x = 2 + 5t$, $y = 13 - 3t$. The conditions $x \ge 0$ and $y \ge 0$ mean $t \ge 0$ and $t \le 4$. So there are five possibilities:

$$
(x, y) = (2, 13),\ (7, 10),\ (12, 7),\ (17, 4),\ (22, 1) .
$$
:::
:::

Which amounts can be paid at all with coins of two coprime values $a$ and $b$? Small amounts may be impossible, but every large amount can be paid.

::: theorem The two-coin problem {#thm-coin}
Let $a, b$ be coprime positive integers. Every integer $n > ab - a - b$ can be written as $n = ax + by$ with integers $x, y \ge 0$, but $ab - a - b$ cannot.
:::

::: proof
Given $n$, choose $x$ with $0 \le x \le b - 1$ and $ax \equiv n \pmod b$ (possible since $a$ is invertible modulo $b$). Then $y = (n - ax)/b$ is an integer, and $n = ax + by$; moreover by [[#thm-linear-diophantine]] every solution has $x$-coordinate congruent to this one modulo $b$, so if any solution has $x, y \ge 0$, this one does (it has the smallest non-negative $x$, hence the largest $y$). If $n > ab - a - b$, then $n - ax \ge n - a(b - 1) > -b$, so $y > -1$, i.e. $y \ge 0$.

Now suppose $ab - a - b = ax + by$ with $x, y \ge 0$. Then $a(x + 1) + b(y + 1) = ab$, so $b \mid a(x + 1)$ and hence $b \mid x + 1$; similarly $a \mid y + 1$. So $x + 1 \ge b$ and $y + 1 \ge a$, giving $ab = a(x+1) + b(y+1) \ge 2ab$, a contradiction.
:::

With coins of $5$ and $8$, the largest impossible amount is $40 - 5 - 8 = 27$; the impossible amounts are $1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 17, 19, 22, 27$. There are $14 = \frac{(5-1)(8-1)}2$ of them; James Joseph Sylvester proved in 1884 that exactly $\frac{(a-1)(b-1)}{2}$ amounts are impossible in general. For three or more coin values no closed formula for the largest impossible amount is known.

::: quiz
Does $6x + 10y = 15$ have integer solutions?
- [ ] Yes, infinitely many
- [ ] Yes, exactly one
- [x] No
::: solution
$\gcd(6, 10) = 2$ does not divide $15$ (the left side is always even), so there are no solutions. If $c$ were divisible by $2$ there would be infinitely many.
:::
:::

## Pythagorean triples

A **Pythagorean triple** is a solution of $x^2 + y^2 = z^2$ in positive integers, such as $(3, 4, 5)$ or $(5, 12, 13)$. Multiplying a triple by $k$ gives another, so it suffices to find the **primitive** triples, those with $\gcd(x, y, z) = 1$.

::: theorem Primitive Pythagorean triples {#thm-pythagorean}
The primitive Pythagorean triples $(x, y, z)$ with $y$ even are exactly

$$
x = m^2 - n^2, \qquad y = 2mn, \qquad z = m^2 + n^2,
$$

where $m > n > 0$ are coprime integers of opposite parity. Different such pairs $(m, n)$ give different triples.
:::

::: proof
*Preliminary facts.* In a primitive triple, $x$ and $y$ are coprime: a prime dividing both would divide $z^2$, hence $z$. They are not both even (coprime), and not both odd, since then $z^2 = x^2 + y^2 \equiv 2 \pmod 4$, which is not a square modulo $4$ ([[number-theory/divisibility#ex-squares-mod-4]]). So exactly one leg is even; call it $y$. Then $x$ and $z$ are odd.

*Every primitive triple has this form.* Write $y^2 = z^2 - x^2 = (z - x)(z + x)$. Both factors are even; put $u = \frac{z+x}{2}$ and $v = \frac{z-x}2$, positive integers with $\left(\frac y2\right)^2 = uv$. A common divisor of $u$ and $v$ divides $u + v = z$ and $u - v = x$, so $\gcd(u, v) = 1$. A product of two coprime positive integers that is a perfect square must have both factors perfect squares (compare exponents in the prime factorisations, [[number-theory/primes#thm-fta]]). So $u = m^2$ and $v = n^2$ for positive integers $m > n$, and then

$$
z = u + v = m^2 + n^2,\qquad x = u - v = m^2 - n^2, \qquad y = 2\sqrt{uv} = 2mn .
$$

Moreover $\gcd(m, n) = 1$ because $\gcd(u, v) = 1$, and $m, n$ have opposite parity because $z = m^2 + n^2$ is odd.

*Conversely* such $m, n$ give a triple, since $(m^2 - n^2)^2 + (2mn)^2 = m^4 + 2m^2n^2 + n^4 = (m^2 + n^2)^2$. It is primitive: a prime $p$ dividing $x$ and $z$ divides $z + x = 2m^2$ and $z - x = 2n^2$; $p$ is odd since $z$ is odd, so $p \mid m$ and $p \mid n$, contradicting $\gcd(m,n) = 1$. Finally $(m, n)$ is recovered from the triple as $m^2 = \frac{z+x}2$, $n^2 = \frac{z-x}2$.
:::

The first few primitive triples are:

| $(m, n)$ | $(2,1)$ | $(3,2)$ | $(4,1)$ | $(4,3)$ | $(5,2)$ | $(5,4)$ | $(6,1)$ | $(6,5)$ |
|---|---|---|---|---|---|---|---|---|
| $(x, y, z)$ | $(3,4,5)$ | $(5,12,13)$ | $(15,8,17)$ | $(7,24,25)$ | $(21,20,29)$ | $(9,40,41)$ | $(35,12,37)$ | $(11,60,61)$ |

::: intuition Rational points on a circle
Dividing by $z^2$, a Pythagorean triple is a point $\left(\frac xz, \frac yz\right)$ with rational coordinates on the unit circle $X^2 + Y^2 = 1$. Draw the line through the rational point $(-1, 0)$ with slope $t$: it meets the circle again at

$$
\left(\frac{1 - t^2}{1 + t^2},\ \frac{2t}{1 + t^2}\right),
$$

which is rational exactly when $t$ is (if the second point is rational, so is the slope of the line joining it to $(-1, 0)$). Writing $t = \frac nm$ gives $\left(\frac{m^2-n^2}{m^2+n^2}, \frac{2mn}{m^2+n^2}\right)$ — the parametrisation of [[#thm-pythagorean]] seen geometrically. The same "chord method" finds rational points on other conics, and its extension to cubic curves leads to the theory of elliptic curves.
:::

::: widget plot
f: sqrt(1 - x^2); -sqrt(1 - x^2); (x + 1)/2; 2(x + 1)/3
x: -1.3, 1.3
y: -1.3, 1.3
equal: true
points: -1, 0; 3/5, 4/5; 5/13, 12/13
labels: X^2+Y^2=1; ; t=1/2; t=2/3
caption: Lines through $(-1, 0)$ with rational slope $t$ meet the unit circle again at rational points. Slope $t = \frac12$ hits $\left(\frac35, \frac45\right)$, giving the triple $(3, 4, 5)$; slope $t = \frac23$ hits $\left(\frac5{13}, \frac{12}{13}\right)$, giving $(5, 12, 13)$. Every Pythagorean triple arises this way from some rational slope.
:::

## Infinite descent and Fermat's Last Theorem

Around 1637 Pierre de Fermat wrote in the margin of his copy of Diophantus that $x^n + y^n = z^n$ has no solutions in positive integers for $n \ge 3$, adding that he had a marvellous proof which the margin was too narrow to contain. The only case for which he left a proof is $n = 4$, using his method of **infinite descent**: from any solution, produce a *smaller* solution; since positive integers cannot decrease for ever, there is no solution at all.

::: theorem No positive solutions to x⁴ + y⁴ = z² {#thm-descent-4}
There are no positive integers $x, y, z$ with $x^4 + y^4 = z^2$.
:::

::: proof
Suppose there were solutions, and choose one with $z$ as small as possible.

*Step 1: $\gcd(x, y) = 1$.* If a prime $p$ divided $x$ and $y$, then $p^4 \mid z^2$, so $p^2 \mid z$, and $\left(\frac xp, \frac yp, \frac z{p^2}\right)$ would be a solution with smaller $z$.

*Step 2: a Pythagorean triple.* Now $(x^2)^2 + (y^2)^2 = z^2$ with $\gcd(x^2, y^2) = 1$, so $(x^2, y^2, z)$ is a primitive Pythagorean triple. Swapping $x$ and $y$ if necessary, $y^2$ is the even leg, and by [[#thm-pythagorean]]

$$
x^2 = m^2 - n^2, \qquad y^2 = 2mn, \qquad z = m^2 + n^2,
$$

with $m > n > 0$ coprime and of opposite parity.

*Step 3: a second triple.* From $x^2 + n^2 = m^2$ with $\gcd(m, n) = 1$, $(x, n, m)$ is again a primitive Pythagorean triple. Since $x$ is odd ($x^2 = m^2 - n^2$ is odd), the even leg is $n$, so

$$
x = r^2 - s^2, \qquad n = 2rs, \qquad m = r^2 + s^2,
$$

with $r > s > 0$ coprime.

*Step 4: three squares.* Now $y^2 = 2mn = 4rs(r^2 + s^2)$, so $\left(\frac y2\right)^2 = rs(r^2 + s^2)$. The three factors $r$, $s$, $r^2 + s^2$ are pairwise coprime (a prime dividing $r$ and $r^2 + s^2$ divides $s^2$, hence $s$). A product of pairwise coprime positive integers that is a square has every factor a square, so $r = u^2$, $s = v^2$ and $r^2 + s^2 = w^2$ for positive integers $u, v, w$. But then

$$
u^4 + v^4 = r^2 + s^2 = w^2,
$$

a new solution, with $w \le w^2 = m \le m^2 < m^2 + n^2 = z$. This contradicts the minimality of $z$.
:::

::: corollary Fermat's Last Theorem for n = 4 {#cor-flt-4}
There are no positive integers with $x^4 + y^4 = z^4$. Consequently $x^n + y^n = z^n$ has no positive solutions whenever $4 \mid n$.
:::

::: proof
A solution of $x^4 + y^4 = z^4$ would give the solution $(x, y, z^2)$ of [[#thm-descent-4]]. If $n = 4k$, a solution of $x^n + y^n = z^n$ gives $(x^k)^4 + (y^k)^4 = (z^k)^4$.
:::

So to prove Fermat's Last Theorem it suffices to treat odd prime exponents. Euler essentially settled $n = 3$ (1770), and Sophie Germain, Dirichlet, Legendre, Lamé and Kummer handled many further cases in the nineteenth century, Kummer's work founding algebraic number theory. The full theorem was proved by Andrew Wiles in 1994, with a crucial step completed jointly with Richard Taylor, by connecting a hypothetical solution to an elliptic curve that could not be modular.

## Sums of two squares

Which numbers are sums of two squares? $5 = 1 + 4$, $13 = 4 + 9$, $25 = 9 + 16$, but $3$, $7$, $21$ are not. Since squares are $\equiv 0$ or $1 \pmod 4$, no number $\equiv 3 \pmod 4$ is a sum of two squares. Products behave well, because of an identity known to Brahmagupta and later to Fibonacci:

$$
(a^2 + b^2)(c^2 + d^2) = (ac - bd)^2 + (ad + bc)^2 .
$$ {#eq-brahmagupta}

(It is $\abs{z}^2\abs{w}^2 = \abs{zw}^2$ for $z = a + bi$, $w = c + di$.) So the problem reduces to primes.

::: theorem Fermat's two-squares theorem {#thm-two-squares}
An odd prime $p$ is a sum of two squares if and only if $p \equiv 1 \pmod 4$.
:::

::: proof
If $p = a^2 + b^2$ then $p \equiv 0, 1$ or $2 \pmod 4$, so $p \equiv 1 \pmod 4$ (as $p$ is odd).

Conversely let $p \equiv 1 \pmod 4$. By [[number-theory/quadratic-reciprocity#thm-first-supplement]] there is an integer $x_0$ with $x_0^2 \equiv -1 \pmod p$. Let $k = \lfloor\sqrt p\,\rfloor$; since $p$ is prime, it is not a perfect square, so $k < \sqrt p < k + 1$. Consider the $(k + 1)^2 > p$ numbers

$$
u + x_0v, \qquad 0 \le u, v \le k .
$$

There are more of them than residue classes modulo $p$, so by the pigeonhole principle ([[discrete/advanced-counting]]) two of them, from different pairs $(u_1, v_1) \neq (u_2, v_2)$, are congruent: $u_1 + x_0v_1 \equiv u_2 + x_0v_2 \pmod p$. Put $a = u_1 - u_2$ and $b = v_1 - v_2$. Then $(a, b) \neq (0, 0)$, $\abs a, \abs b \le k < \sqrt p$, and $a \equiv -x_0b \pmod p$. Hence

$$
a^2 + b^2 \equiv x_0^2b^2 + b^2 = (x_0^2 + 1)b^2 \equiv 0 \pmod p,
$$

while $0 < a^2 + b^2 < 2p$. The only multiple of $p$ strictly between $0$ and $2p$ is $p$, so $a^2 + b^2 = p$.
:::

::: example Writing primes as sums of two squares {#ex-two-squares}
Express $29$ and $13$ as sums of two squares using a square root of $-1$.
::: solution
For $p = 29$: $12^2 = 144 = 5\cdot 29 - 1$, so $x_0 = 12$. The proof looks for $a \equiv -12b \pmod{29}$ with $\abs a, \abs b < \sqrt{29} \approx 5.4$. For $b = 1$, $-12 \equiv 17$, and neither $17$ nor $17 - 29 = -12$ is small; for $b = 2$, $-24 \equiv 5$, which is. So $(a, b) = (5, 2)$ and $29 = 5^2 + 2^2$. For $p = 13$: $5^2 = 25 \equiv -1$, and $b = 1$ gives $a \equiv -5 \equiv 8$, too large; $b = 2$ gives $a \equiv -10 \equiv 3$, so $13 = 3^2 + 2^2$. (A neat alternative: run Euclid's algorithm on $p$ and $x_0$; the first two remainders below $\sqrt p$ give the representation. For $29, 12$ the remainders are $5, 2, 1$, and $5^2 + 2^2 = 29$.)
:::
:::

::: theorem Which numbers are sums of two squares? {#thm-sum-two-squares}
A positive integer $n$ is a sum of two squares if and only if every prime $p \equiv 3 \pmod 4$ divides $n$ to an even power.
:::

::: proof
($\Leftarrow$) Write $n = 2^a\prod p_i^{e_i}\prod q_j^{2f_j}$ with $p_i \equiv 1$ and $q_j \equiv 3 \pmod 4$. Each factor is a sum of two squares: $2 = 1^2 + 1^2$, each $p_i$ by [[#thm-two-squares]], and $q_j^2 = q_j^2 + 0^2$. By [[#eq-brahmagupta]] (applied repeatedly), so is their product.

($\Rightarrow$) We use a lemma: *if $q \equiv 3 \pmod 4$ is prime and $q \mid a^2 + b^2$, then $q \mid a$ and $q \mid b$.* Indeed, if $q \nmid b$, let $b'$ be an inverse of $b$ modulo $q$; then $(ab')^2 \equiv -1 \pmod q$, contradicting $\bigl(\frac{-1}{q}\bigr) = -1$. So $q \mid b$, and then $q \mid a^2$, so $q \mid a$.

Now prove ($\Rightarrow$) by strong induction on $n$. Let $n = a^2 + b^2$ and let $q \equiv 3 \pmod 4$ be a prime dividing $n$. By the lemma $q \mid a$ and $q \mid b$, so $q^2 \mid n$ and $\frac n{q^2} = \left(\frac aq\right)^2 + \left(\frac bq\right)^2$ is a smaller sum of two squares. By induction every prime $\equiv 3 \pmod 4$ divides $\frac n{q^2}$ to an even power, hence also $n$.
:::

For example $2026 = 2\cdot 1013$ with $1013 \equiv 1 \pmod 4$ prime, so it is a sum of two squares: $2026 = 45^2 + 1^2$. But $2027 \equiv 3 \pmod 4$ is not, and neither is $21 = 3\cdot 7$; while $245 = 5\cdot 7^2 = 14^2 + 7^2$ is, because $7$ appears squared.

::: quiz
Which of these numbers are sums of two squares? (Select all that apply.)
- [ ] $21$
- [x] $50$
- [x] $245$
- [ ] $2027$
::: solution
$21 = 3\cdot 7$ has primes $\equiv 3 \pmod 4$ to odd powers. $50 = 2\cdot 5^2 = 7^2 + 1^2 = 5^2 + 5^2$. $245 = 5\cdot 7^2 = 14^2 + 7^2$. $2027 \equiv 3 \pmod 4$, so it cannot be a sum of two squares.
:::
:::

::: remark Three and four squares
Lagrange proved in 1770 that **every** positive integer is a sum of four squares; for example $7 = 4 + 1 + 1 + 1$. Three squares suffice exactly for the numbers not of the form $4^a(8b + 7)$ — a theorem of Legendre and Gauss. The easy half is [[number-theory/congruences#exr-3-6]]: squares are $0, 1, 4 \pmod 8$, so no number $\equiv 7 \pmod 8$ is a sum of three squares.
:::

## Pell's equation

For a positive integer $d$ that is not a perfect square, **Pell's equation** is

$$
x^2 - dy^2 = 1 .
$$

It always has the trivial solution $(1, 0)$. Its non-trivial solutions give excellent rational approximations to $\sqrt d$: if $x^2 - dy^2 = 1$ then $\frac xy - \sqrt d = \frac{1}{y(x + y\sqrt d)}$, which is tiny. For $d = 2$ the solutions $(3, 2), (17, 12), (99, 70)$ give $\frac{99}{70} = 1.414285\ldots$, close to $\sqrt2 = 1.414213\ldots$.

The key is to work with numbers $x + y\sqrt d$ and their **norm** $N(x + y\sqrt d) = x^2 - dy^2 = (x + y\sqrt d)(x - y\sqrt d)$. A direct computation (Brahmagupta's "composition") shows the norm is multiplicative:

$$
(x_1 + y_1\sqrt d)(x_2 + y_2\sqrt d) = (x_1x_2 + dy_1y_2) + (x_1y_2 + x_2y_1)\sqrt d, \qquad N(\alpha\beta) = N(\alpha)N(\beta) .
$$ {#eq-pell-composition}

So products of solutions are solutions. A solution with $x, y > 0$ is **positive**; the positive solution with the smallest $x$ (equivalently smallest $y$, or smallest $x + y\sqrt d$, since $x^2 = 1 + dy^2$) is the **fundamental solution**.

::: theorem Solutions of Pell's equation {#thm-pell}
Let $d > 0$ be a non-square. Then $x^2 - dy^2 = 1$ has a positive solution. If $(x_1, y_1)$ is the fundamental solution, the positive solutions are exactly the pairs $(x_k, y_k)$, $k \ge 1$, given by

$$
x_k + y_k\sqrt d = (x_1 + y_1\sqrt d)^k .
$$
:::

::: proof
*Existence* (sketch). By Dirichlet's approximation theorem there are infinitely many pairs of positive integers $(x, y)$ with $\abs{x - y\sqrt d} < \frac 1y$. For these, $\abs{x^2 - dy^2} = \abs{x - y\sqrt d}\,(x + y\sqrt d) < \frac1y(2y\sqrt d + 1) \le 2\sqrt d + 1$. So some non-zero integer $N$ occurs as $x^2 - dy^2$ for infinitely many pairs, and among those, two pairs $(x, y) \ne (x', y')$ satisfy $x \equiv x'$, $y \equiv y' \pmod{\abs N}$. Then $\frac{x + y\sqrt d}{x' + y'\sqrt d}$ turns out to have integer coordinates and norm $1$, giving a non-trivial solution. Full details are in Niven, Zuckerman and Montgomery, §7.8. In practice solutions are found by the continued fraction expansion of $\sqrt d$.

*All solutions are powers.* Let $\eps = x_1 + y_1\sqrt d > 1$. By [[#eq-pell-composition]] each $\eps^k$ has norm $1$, and its coordinates are positive integers, so $(x_k, y_k)$ is a positive solution. Conversely let $(x, y)$ be a positive solution and $\alpha = x + y\sqrt d$. Then $\alpha \ge \eps$, so there is $k \ge 1$ with $\eps^k \le \alpha < \eps^{k+1}$. Put $\beta = \alpha\eps^{-k}$; since $\eps^{-1} = x_1 - y_1\sqrt d$, $\beta = \alpha(x_1 - y_1\sqrt d)^k = u + v\sqrt d$ with integers $u, v$, and $N(\beta) = 1$. Also $1 \le \beta < \eps$. Suppose $\beta > 1$. Then $0 < \beta^{-1} = u - v\sqrt d < 1$, so $u = \frac{\beta + \beta^{-1}}2 > 0$ and $v = \frac{\beta - \beta^{-1}}{2\sqrt d} > 0$: $(u, v)$ is a positive solution with $u + v\sqrt d < \eps$, contradicting the minimality of the fundamental solution. Hence $\beta = 1$ and $\alpha = \eps^k$.
:::

Expanding $(x_1 + y_1\sqrt d)^{k+1} = (x_1 + y_1\sqrt d)(x_k + y_k\sqrt d)$ gives the recurrence

$$
x_{k+1} = x_1x_k + dy_1y_k, \qquad y_{k+1} = x_1y_k + y_1x_k .
$$

::: example Solving Pell equations {#ex-pell}
Find the first few solutions of $x^2 - 2y^2 = 1$ and $x^2 - 3y^2 = 1$.
::: solution
For $d = 2$, trying $y = 1, 2$: $1 + 2 = 3$ is not a square, $1 + 8 = 9 = 3^2$, so the fundamental solution is $(3, 2)$. Then $(3 + 2\sqrt2)^2 = 17 + 12\sqrt2$ and $(3 + 2\sqrt 2)^3 = 99 + 70\sqrt 2$: the solutions are $(3, 2), (17, 12), (99, 70), (577, 408), \dots$. Check: $17^2 - 2\cdot 12^2 = 289 - 288 = 1$.

For $d = 3$: $y = 1$ gives $1 + 3 = 4 = 2^2$, so $(2, 1)$ is fundamental, and the recurrence $x_{k+1} = 2x_k + 3y_k$, $y_{k+1} = x_k + 2y_k$ gives $(7, 4), (26, 15), (97, 56), \dots$.

The fundamental solution can be surprisingly large: for $d = 7$ it is $(8, 3)$, but for $d = 61$ it is $(1766319049, 226153980)$.
:::
:::

::: widget plot
f: sqrt((x^2 - 1)/2); x/sqrt(2)
x: 0, 20
y: 0, 15
points: 1, 0; 3, 2; 17, 12
labels: x^2-2y^2=1; y=x/\sqrt2
caption: The hyperbola $x^2 - 2y^2 = 1$ and its asymptote $y = x/\sqrt 2$. The integer points $(1,0)$, $(3, 2)$, $(17, 12)$ (and then $(99, 70)$, off the picture) lie on the hyperbola, getting ever closer to the asymptote; this is why $\frac{17}{12}$ and $\frac{99}{70}$ approximate $\sqrt 2$ so well. Each point is obtained from the previous one by the map $(x, y) \mapsto (3x + 4y, 2x + 3y)$, multiplication by $3 + 2\sqrt 2$.
:::

::: warning The negative Pell equation
The equation $x^2 - dy^2 = -1$ behaves differently: it is solvable for some $d$ and not for others. For $d = 2$, $(1, 1)$ works; for $d = 3$ there is no solution at all, since $x^2 \equiv -1 \pmod 3$ is impossible. More generally, if $d$ has a prime factor $q \equiv 3 \pmod 4$, then $x^2 \equiv -1 \pmod q$ has no solution, so neither does $x^2 - dy^2 = -1$. Do not assume that results for $+1$ carry over to $-1$.
:::

::: application Square triangular numbers
Which triangular numbers $\frac{n(n+1)}{2}$ are perfect squares? Setting $\frac{n(n+1)}2 = m^2$ and multiplying by $8$ gives $(2n + 1)^2 - 8m^2 = 1$, a Pell equation with $d = 8$ ([[#exr-8-10]]). Its solutions give the square triangular numbers $1$, $36$, $1225$, $41616$, …, with $n = 1, 8, 49, 288, \dots$ — an infinite family produced by one quadratic irrationality.
:::

::: history
The tablet Plimpton 322 (about 1800 BC) lists numbers that most historians interpret as derived from Pythagorean triples, some as large as $(12709, 13500, 18541)$. Euclid's *Elements* gives the parametrisation of Pythagorean triples, and Diophantus's *Arithmetica* (third century) is the first book devoted to equations in rational numbers. Brahmagupta (628) discovered the composition law for $x^2 - Ny^2$, and the cyclic (*chakravala*) method described by Bhāskara II (1150) solves Pell's equation, including the case $d = 61$. Fermat stated the two-squares theorem in 1640 and challenged European mathematicians with Pell's equation in 1657; Euler proved the two-squares theorem (published 1752–55), and Lagrange proved in 1768 that every Pell equation has a solution. The name "Pell" comes from Euler's mistaken attribution to John Pell. The proof of the two-squares theorem given here uses an idea of Axel Thue (1902).
:::

## Where this leads

The methods of this chapter open onto much of modern number theory. Sums of two squares are the arithmetic of the Gaussian integers $\Z[i]$ ([[abstract-algebra/rings]]): a prime $p \equiv 1 \pmod 4$ factors as $(a + bi)(a - bi)$. Pell's equation describes the units of $\Z[\sqrt d]$, the first case of Dirichlet's unit theorem in algebraic number theory. The chord method for the circle extends to elliptic curves $y^2 = x^3 + ax + b$, whose rational points form a group and which are central to Wiles's proof of Fermat's Last Theorem and to elliptic-curve cryptography ([[number-theory/cryptography]]).

::: summary
- $ax + by = c$ is solvable iff $d = \gcd(a,b) \mid c$; then all solutions are $x = x_0 + \frac bdt$, $y = y_0 - \frac adt$ ([[#thm-linear-diophantine]]).
- With coprime coin values $a, b$, every amount above $ab - a - b$ is payable, and $ab - a - b$ is not ([[#thm-coin]]).
- Primitive Pythagorean triples are $(m^2 - n^2, 2mn, m^2 + n^2)$ with $m > n$ coprime of opposite parity — equivalently, rational points on the unit circle.
- **Infinite descent**: $x^4 + y^4 = z^2$ has no positive solutions, so Fermat's Last Theorem holds for $n = 4$ (and all multiples of $4$).
- **Fermat's two-squares theorem**: an odd prime is a sum of two squares iff $p \equiv 1 \pmod 4$ — proved from $x_0^2 \equiv -1$ and the pigeonhole principle.
- $n$ is a sum of two squares iff primes $\equiv 3 \pmod 4$ divide it to even powers, using $(a^2+b^2)(c^2+d^2) = (ac-bd)^2 + (ad+bc)^2$.
- **Pell's equation** $x^2 - dy^2 = 1$ always has a positive solution, and all positive solutions are powers $(x_1 + y_1\sqrt d)^k$ of the fundamental one.
:::

## Exercises

::: exercise Counting purchases {level=1 check="5"}
In how many ways can the farmer of [[#ex-hens-ducks]] spend exactly £71, if hens cost £3 and ducks £5? (Count the solutions of $3x + 5y = 71$ with $x, y \ge 0$.)
::: solution
From [[#ex-hens-ducks]] the solutions are $x = 2 + 5t$, $y = 13 - 3t$ with $0 \le t \le 4$: five ways.
:::
:::

::: exercise The largest impossible amount {level=1 check="27"}
With coins worth $5$ and $8$ units, what is the largest amount that cannot be paid exactly?
::: solution
By [[#thm-coin]] with $a = 5$, $b = 8$: $ab - a - b = 40 - 13 = 27$.
:::
:::

::: exercise A triple from m and n {level=1 check="53"}
Find the primitive Pythagorean triple with $m = 7$, $n = 2$. Enter the hypotenuse.
::: solution
$x = 49 - 4 = 45$, $y = 2\cdot 7\cdot 2 = 28$, $z = 49 + 4 = 53$. Check: $45^2 + 28^2 = 2025 + 784 = 2809 = 53^2$. ($\gcd(7,2) = 1$ and $7, 2$ have opposite parity, so the triple is primitive.)
:::
:::

::: exercise Triangles with hypotenuse 65 {level=2 check="4"}
How many right-angled triangles with integer sides have hypotenuse $65$?
::: hint
Find the primitive triples with $z = 65 = m^2 + n^2$, and the multiples of triples with hypotenuse $5$ and $13$.
:::
::: solution
$65 = 8^2 + 1^2 = 7^2 + 4^2$, both pairs coprime and of opposite parity, giving the primitive triples $(63, 16, 65)$ and $(33, 56, 65)$. Non-primitive triples are multiples $k(x', y', z')$ with $kz' = 65$: $13\cdot(3, 4, 5) = (39, 52, 65)$ and $5\cdot(5, 12, 13) = (25, 60, 65)$. So there are $4$ triangles.
:::
:::

::: exercise Two squares or not {level=2}
Write $2026$ as a sum of two squares, and show that $2027$ is not a sum of two squares.
::: solution
$2026 = 2025 + 1 = 45^2 + 1^2$. (This is predicted by [[#thm-sum-two-squares]], since $2026 = 2\cdot 1013$ and $1013 \equiv 1 \pmod 4$ is prime.) And $2027 = 4\cdot 506 + 3 \equiv 3 \pmod 4$, while sums of two squares are $\equiv 0, 1, 2 \pmod 4$.
:::
:::

::: exercise A negative Pell equation {level=2}
Show that $x^2 - 3y^2 = -1$ has no integer solutions, while $x^2 - 2y^2 = -1$ has infinitely many.
::: solution
Modulo $3$, $x^2 - 3y^2 \equiv x^2 \in \set{0, 1}$, never $-1 \equiv 2$. For $d = 2$: $1 - 2 = -1$, so $(1, 1)$ is a solution, and multiplying $1 + \sqrt 2$ by solutions of the $+1$ equation preserves the norm $-1$ ([[#eq-pell-composition]]): $(1 + \sqrt2)(3 + 2\sqrt 2) = 7 + 5\sqrt2$, and $49 - 50 = -1$. The powers of $3 + 2\sqrt 2$ give infinitely many such solutions.
:::
:::

::: exercise The next Pell solution {level=2 check="26"}
Find the solution of $x^2 - 3y^2 = 1$ with the smallest $y > 10$. Enter $x$.
::: solution
From [[#ex-pell]] the positive solutions are $(2, 1), (7, 4), (26, 15), \dots$, so the answer is $(26, 15)$: $676 - 3\cdot 225 = 676 - 675 = 1$.
:::
:::

::: exercise Divisibility in Pythagorean triples {level=3}
Prove that in every Pythagorean triple one leg is divisible by $3$, one leg is divisible by $4$, and one of the three numbers is divisible by $5$.
::: solution
It suffices to treat primitive triples $(m^2 - n^2, 2mn, m^2 + n^2)$, since multiples inherit the property. *By $4$*: one of $m, n$ is even, so $4 \mid 2mn$. *By $3$*: if $3 \mid m$ or $3 \mid n$ then $3 \mid 2mn$; otherwise $m^2 \equiv n^2 \equiv 1 \pmod 3$ and $3 \mid m^2 - n^2$. *By $5$*: if $5 \mid mn$ then $5 \mid 2mn$. Otherwise $m^2, n^2 \in \set{1, 4} \pmod 5$ (the non-zero squares modulo $5$); if $m^2 \equiv n^2$ then $5 \mid m^2 - n^2$, and if not, $\set{m^2, n^2} \equiv \set{1, 4}$ and $5 \mid m^2 + n^2$.
:::
:::

::: exercise Coprime sums of two squares {level=3}
Suppose $n = a^2 + b^2$ with $\gcd(a, b) = 1$. Prove that $n$ has no prime factor $q \equiv 3 \pmod 4$ and that $4 \nmid n$.
::: solution
If $q \equiv 3 \pmod 4$ divided $n$, the lemma in the proof of [[#thm-sum-two-squares]] would give $q \mid a$ and $q \mid b$, contradicting $\gcd(a, b) = 1$. If $4 \mid n$, then $a^2 + b^2 \equiv 0 \pmod 4$, which forces both squares to be $\equiv 0$, i.e. $a, b$ both even — again contradicting coprimality. (Conversely, one can show that every $n$ without such factors and with $4 \nmid n$ is a sum of two coprime squares.)
:::
:::

::: exercise Square triangular numbers {level=3 check="1225"}
Show that $\frac{n(n+1)}{2} = m^2$ if and only if $(2n + 1)^2 - 8m^2 = 1$. Using the fundamental solution $(3, 1)$ of $X^2 - 8Y^2 = 1$, find the first three square triangular numbers, and enter the third.
::: solution
Multiplying $\frac{n(n+1)}2 = m^2$ by $8$ gives $4n^2 + 4n = 8m^2$, i.e. $(2n + 1)^2 - 1 = 8m^2$; the steps are reversible. So we need solutions $(X, Y) = (2n + 1, m)$ of $X^2 - 8Y^2 = 1$ with $X$ odd. The fundamental solution is $(3, 1)$ ($9 - 8 = 1$), and by [[#thm-pell]] the others come from $(3 + \sqrt 8)^k$: $(3 + \sqrt8)^2 = 17 + 6\sqrt 8$ and $(3 + \sqrt 8)^3 = 99 + 35\sqrt 8$. All the $X$ are odd. These give $(n, m) = (1, 1), (8, 6), (49, 35)$ and the square triangular numbers $1$, $36$ and $1225 = 35^2 = \frac{49\cdot 50}{2}$.
:::
:::
