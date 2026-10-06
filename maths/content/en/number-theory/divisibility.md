A rectangular floor measures $252$ by $198$ units. What is the largest square tile that covers it exactly, with no cutting? Two meshing gears have $252$ and $198$ teeth; after how many turns are they back in their starting position? Both questions are about the **greatest common divisor** of $252$ and $198$, and both are answered by an algorithm written down by Euclid around $300$ BC — probably the oldest non-trivial algorithm still in everyday use. It runs inside every computer algebra system, and in the cryptography of [[number-theory/cryptography]] it is executed billions of times a day.

This chapter lays the foundation for the whole course. We make divisibility precise, prove the **division algorithm** (division with remainder), develop Euclid's algorithm and its extended form, and prove **Bézout's identity**: the greatest common divisor of $a$ and $b$ can always be written as $ax + by$ with integers $x$ and $y$. Almost every later result — unique factorisation into primes, inverses modulo $n$, the Chinese remainder theorem, RSA — rests on Bézout's identity. We finish by asking how fast Euclid's algorithm is, and find a surprising answer involving the Fibonacci numbers.

## Divisibility

::: definition Divisibility {#def-divides}
Let $a, b \in \Z$. We say $a$ **divides** $b$, and write $a \mid b$, if $b = ak$ for some integer $k$. Then $a$ is a **divisor** (or factor) of $b$, and $b$ is a **multiple** of $a$. If $a$ does not divide $b$ we write $a \nmid b$.
:::

So $3 \mid 12$, $-4 \mid 12$, $5 \nmid 12$, $7 \mid 0$ (since $0 = 7\cdot 0$), and $0 \mid b$ only when $b = 0$.

::: warning a ∣ b is a statement, not a number
The symbol $a \mid b$ is a *sentence* — "$a$ divides $b$" — which is true or false. It is not the fraction $a/b$ (nor $b/a$). Writing "$3 \mid 12 = 4$" is meaningless; write "$3 \mid 12$ because $12 = 3 \cdot 4$". Also note the order: $3 \mid 12$ is true, $12 \mid 3$ is false.
:::

::: proposition Properties of divisibility {#prop-div-props}
For all integers $a, b, c, x, y$:

1. $a \mid a$, $1 \mid a$ and $a \mid 0$;
2. if $a \mid b$ and $b \mid c$, then $a \mid c$;
3. if $a \mid b$ and $a \mid c$, then $a \mid bx + cy$;
4. if $a \mid b$ and $b \neq 0$, then $\abs a \le \abs b$;
5. if $a \mid b$ and $b \mid a$, then $a = \pm b$.
:::

::: proof
1. $a = a\cdot1$, $a = 1\cdot a$ and $0 = a\cdot 0$.

2. If $b = ak$ and $c = bl$, then $c = a(kl)$.

3. If $b = ak$ and $c = al$, then $bx + cy = a(kx + ly)$.

4. If $b = ak$ with $b \neq 0$, then $k \neq 0$, so $\abs k \ge 1$ and $\abs b = \abs a\abs k \ge \abs a$.

5. If $a = 0$ then $b = 0$ (as $a \mid b$) and vice versa. Otherwise both are non-zero and part 4 gives $\abs a \le \abs b \le \abs a$, so $\abs a = \abs b$.
:::

Property 3 — a divisor of two numbers divides every **integer linear combination** of them — is used constantly.

::: example Using linear combinations {#ex-linear-combination}
Suppose $7 \mid 3a + 2b$. Prove that $7 \mid 4a + 5b$.
::: solution
We look for an integer $s$ such that $4a + 5b - s(3a + 2b)$ is a multiple of $7$ for all $a, b$. Try $s = 6$: $6(3a + 2b) = 18a + 12b$, and $18a + 12b - (4a + 5b) = 14a + 7b = 7(2a + b)$. So

$$
4a + 5b = 6(3a + 2b) - 7(2a + b),
$$

and both terms on the right are divisible by $7$. By [[#prop-div-props]] (3), $7 \mid 4a + 5b$. (How was $6$ found? We needed $3s \equiv 4$ and $2s \equiv 5$ modulo $7$ — a question about inverses modulo $7$, answered systematically in [[number-theory/congruences]].)
:::
:::

## The division algorithm

Dividing $17$ by $5$ gives quotient $3$ and remainder $2$: $17 = 5\cdot 3 + 2$. The precise statement, and the fact that the answer is unique, rest on the **well-ordering principle**: every non-empty set of non-negative integers has a least element (see [[proofs/induction]], where it is shown to be equivalent to induction).

::: theorem Division algorithm {#thm-division-algorithm}
Let $a, b \in \Z$ with $b > 0$. There are unique integers $q$ and $r$ such that

$$
a = bq + r \qquad\text{and}\qquad 0 \le r < b .
$$

$q$ is the **quotient** and $r$ the **remainder** of $a$ on division by $b$.
:::

::: proof
*Existence.* Let $S = \set{a - bk : k \in \Z,\ a - bk \ge 0}$. It is non-empty: taking $k = -\abs a$ gives $a + b\abs{a} \ge a + \abs a \ge 0$ (as $b \ge 1$). By well-ordering $S$ has a least element $r = a - bq$, and $r \ge 0$. If $r \ge b$, then $r - b = a - b(q + 1)$ would be a smaller element of $S$, contradicting minimality. So $0 \le r < b$.

*Uniqueness.* Suppose $a = bq + r = bq' + r'$ with $0 \le r, r' < b$. Then $b(q - q') = r' - r$, so $b \mid r' - r$. But $-b < r' - r < b$, and the only multiple of $b$ strictly between $-b$ and $b$ is $0$. So $r = r'$, and then $q = q'$.
:::

We write $r = a \bmod b$ and $q = \lfloor a/b\rfloor$, the largest integer not exceeding $a/b$. Note that $b \mid a$ exactly when $a \bmod b = 0$.

::: warning Remainders of negative numbers
The remainder is always in the range $0 \le r < b$, even when $a$ is negative: $-17 = 5\cdot(-4) + 3$, so $-17 \bmod 5 = 3$ and the quotient is $-4$, not $-3$. Programming languages disagree here. In Python `-17 % 5` gives `3`, matching the theorem, but in C, C++ and Java `-17 % 5` gives `-2`, because they round the quotient towards zero. Bugs caused by this difference are common in code that handles negative numbers modulo $n$.
:::

The division algorithm lets us split the integers into finitely many classes and argue case by case. Every integer has exactly one of the forms $2k$ or $2k + 1$ (even or odd), one of the forms $3k$, $3k+1$, $3k+2$, and so on.

::: example Squares leave remainder 0 or 1 on division by 4 {#ex-squares-mod-4}
Show that the square of every integer has the form $4k$ or $4k + 1$. Deduce that no integer of the form $4k + 3$ is a sum of two squares.
::: solution
If $n = 2m$ is even, $n^2 = 4m^2$. If $n = 2m + 1$ is odd, $n^2 = 4m^2 + 4m + 1 = 4(m^2 + m) + 1$. So squares leave remainder $0$ or $1$ on division by $4$. A sum of two squares therefore leaves remainder $0 + 0$, $0 + 1$ or $1 + 1$, i.e. $0$, $1$ or $2$ — never $3$. So $3, 7, 11, 15, 19, \dots$ are not sums of two squares. Which numbers *are* sums of two squares is answered in [[number-theory/diophantine]].
:::
:::

::: quiz
What are the quotient and remainder when $-23$ is divided by $5$?
- [ ] $q = -4$, $r = -3$
- [x] $q = -5$, $r = 2$
- [ ] $q = -4$, $r = 3$
- [ ] $q = -5$, $r = -2$
::: solution
We need $-23 = 5q + r$ with $0 \le r < 5$. Since $5 \cdot(-5) = -25 \le -23 < -20 = 5\cdot(-4)$, the quotient is $q = -5$ and $r = -23 + 25 = 2$. The option $q = -4$, $r = -3$ satisfies the equation but not $0 \le r < 5$.
:::
:::

## Greatest common divisors and Euclid's algorithm

::: definition Greatest common divisor {#def-gcd}
Let $a, b$ be integers, not both zero. The **greatest common divisor** $\gcd(a, b)$ is the largest integer dividing both $a$ and $b$. If $\gcd(a, b) = 1$, then $a$ and $b$ are **coprime** (or relatively prime).
:::

The gcd exists because $1$ is a common divisor and every common divisor $d$ satisfies $\abs d \le \max(\abs a, \abs b)$ by [[#prop-div-props]]. Note $\gcd(a, b) = \gcd(\abs a, \abs b)$ and $\gcd(a, 0) = \abs a$ for $a \neq 0$. For instance, the divisors of $12$ are $\pm1, \pm2, \pm3, \pm4, \pm6, \pm12$ and those of $18$ are $\pm1, \pm2, \pm3, \pm6, \pm9, \pm18$, so $\gcd(12, 18) = 6$. Listing divisors is hopeless for large numbers, but a simple observation makes the gcd easy to compute.

::: lemma Euclid's step {#lem-euclid-step}
If $a = bq + r$ for integers $a, b, q, r$, then $a$ and $b$ have exactly the same common divisors as $b$ and $r$. In particular $\gcd(a, b) = \gcd(b, r)$.
:::

::: proof
If $d \mid a$ and $d \mid b$ then $d \mid a - bq = r$. Conversely if $d \mid b$ and $d \mid r$ then $d \mid bq + r = a$. So the two pairs have the same common divisors, hence the same greatest one.
:::

Repeating the step with $r = a \bmod b$ replaces the pair by a smaller pair with the same gcd, until the remainder is $0$.

::: algorithm The Euclidean algorithm {#alg-euclid}
Input: integers $a \ge b > 0$. Set $r_{-1} = a$, $r_0 = b$. For $i = 1, 2, \dots$, divide:

$$
r_{i-2} = q_ir_{i-1} + r_i, \qquad 0 \le r_i < r_{i-1},
$$

and stop at the first $n$ with $r_n = 0$. Output: $\gcd(a, b) = r_{n-1}$, the last non-zero remainder.
:::

The remainders strictly decrease, $b = r_0 > r_1 > r_2 > \dots \ge 0$, so the algorithm stops after at most $b$ steps (in fact far fewer — see the last section). By [[#lem-euclid-step]], $\gcd(a, b) = \gcd(r_0, r_1) = \dots = \gcd(r_{n-1}, r_n) = \gcd(r_{n-1}, 0) = r_{n-1}$.

::: example Two gcds {#ex-gcd}
Compute $\gcd(1071, 462)$ and $\gcd(252, 198)$.
::: solution
$$
\begin{aligned}
1071 &= 2\cdot 462 + 147\\
462 &= 3\cdot 147 + 21\\
147 &= 7\cdot 21 + 0
\end{aligned}
\qquad\qquad
\begin{aligned}
252 &= 1\cdot 198 + 54\\
198 &= 3\cdot 54 + 36\\
54 &= 1\cdot 36 + 18\\
36 &= 2\cdot 18 + 0
\end{aligned}
$$

So $\gcd(1071, 462) = 21$ and $\gcd(252, 198) = 18$. The largest square tile for the $252\times 198$ floor has side $18$: it fits $14$ times along one side and $11$ times along the other.
:::
:::

::: widget euclid
a: 252
b: 198
mode: gcd
caption: Euclid's algorithm as tiling: cut the largest possible squares from the $252 \times 198$ rectangle (one $198\times198$ square), then from the leftover $198 \times 54$ strip (three $54 \times 54$ squares), and so on. The quotients $1, 3, 1, 2$ count the squares of each size, and the last square, $18 \times 18$, tiles every earlier piece — so it tiles the whole rectangle, and $18 = \gcd(252, 198)$.
:::

## Bézout's identity

Running Euclid's algorithm backwards shows that the gcd is a combination of the original numbers: from the left-hand computation in [[#ex-gcd]],

$$
21 = 462 - 3\cdot 147 = 462 - 3(1071 - 2\cdot 462) = 7\cdot 462 - 3\cdot 1071 .
$$

This always works, and the cleanest proof uses well-ordering directly.

::: theorem Bézout's identity {#thm-bezout}
Let $a, b$ be integers, not both zero, and $d = \gcd(a, b)$. Then there are integers $x, y$ with

$$
ax + by = d .
$$

Moreover $d$ is the smallest positive integer of the form $ax + by$, and the integers of this form are exactly the multiples of $d$.
:::

::: proof
Let $S = \set{ax + by : x, y \in \Z,\ ax + by > 0}$. It is non-empty (it contains $a^2 + b^2 > 0$), so it has a least element $e = ax_0 + by_0$. We show $e = d$.

*$e$ divides $a$.* Divide: $a = eq + r$ with $0 \le r < e$. Then $r = a - (ax_0 + by_0)q = a(1 - qx_0) + b(-qy_0)$ is of the form $ax + by$. If $r > 0$ it would be an element of $S$ smaller than $e$; so $r = 0$ and $e \mid a$. In the same way $e \mid b$.

*$e$ is the greatest common divisor.* Any common divisor $c$ of $a$ and $b$ divides $ax_0 + by_0 = e$, so $c \le \abs c \le e$. As $e$ itself is a common divisor, $e = d$.

Finally, every $ax + by$ is a multiple of $d$ (since $d$ divides $a$ and $b$), and every multiple $md = a(mx_0) + b(my_0)$ has this form.
:::

::: corollary Consequences of Bézout {#cor-bezout}
Let $a, b$ be integers, not both zero, with $d = \gcd(a, b)$.

1. Every common divisor of $a$ and $b$ divides $d$.
2. $a$ and $b$ are coprime if and only if $ax + by = 1$ for some integers $x, y$.
3. $\gcd(a/d, b/d) = 1$.
4. The equation $ax + by = c$ has an integer solution if and only if $d \mid c$.
:::

::: proof
1. A common divisor divides $ax + by = d$. 2. If $\gcd = 1$, Bézout gives $ax + by = 1$; conversely if $ax + by = 1$, any common divisor divides $1$. 3. Divide $ax + by = d$ by $d$: $(a/d)x + (b/d)y = 1$, and apply 2. 4. This is the last sentence of [[#thm-bezout]].
:::

So $6x + 9y = 7$ has no integer solutions (as $3 \nmid 7$), while $6x + 9y = 12$ does ($x = 2$, $y = 0$, among many others). How to find *all* solutions is the subject of [[number-theory/diophantine]].

::: intuition The combinations of a and b form a ladder
Picture all the numbers $ax + by$ on the number line. They are closed under addition and subtraction, so they form a subgroup of $\Z$ — and every subgroup of $\Z$ consists of the multiples of its smallest positive element ([[abstract-algebra/subgroups]]). Bézout's identity says that this smallest step is exactly $\gcd(a, b)$: with steps of sizes $a$ and $b$, forwards and backwards, you can land on precisely the multiples of $\gcd(a,b)$, and nowhere else.
:::

::: example A water-jug puzzle {#ex-jugs}
You have an unmarked $7$-litre jug, an unmarked $4$-litre jug and a tap. How can you measure exactly $6$ litres?
::: solution
Filling a jug sets its contents to $7$ or $4$, emptying it sets them to $0$, and pouring stops when one jug is empty or the other is full; so, by induction on the number of moves, each jug always holds a combination $7x + 4y$. Since $\gcd(7, 4) = 1$, every whole number of litres is such a combination; here $6 = 7\cdot2 - 4\cdot 2$, which suggests filling the big jug twice and emptying the small jug twice. Writing (big, small) for the contents:

$$
(7, 0) \to (3, 4) \to (3, 0) \to (0, 3) \to (7, 3) \to (6, 4).
$$

Fill the big jug; pour into the small one until it is full; empty the small jug; pour the remaining $3$ litres across; fill the big jug again; top up the small jug, which takes $1$ litre. Now the big jug holds $6$ litres. With jugs of $6$ and $9$ litres, on the other hand, only multiples of $\gcd(6, 9) = 3$ can ever be measured.
:::
:::

### The extended Euclidean algorithm

Back-substitution becomes messy for long computations. Instead we can carry the coefficients along. Keep, beside each remainder $r_i$, integers $x_i, y_i$ with $r_i = ax_i + by_i$. Initially $r_{-1} = a = a\cdot 1 + b\cdot 0$ and $r_0 = b = a\cdot0 + b\cdot1$; and since $r_i = r_{i-2} - q_ir_{i-1}$, the same recurrence works for the coefficients:

$$
x_i = x_{i-2} - q_ix_{i-1}, \qquad y_i = y_{i-2} - q_iy_{i-1} .
$$

::: example The extended algorithm for 240 and 46 {#ex-extended}
Find $\gcd(240, 46)$ and integers $x, y$ with $240x + 46y = \gcd(240, 46)$.
::: solution
| $i$ | $r_i$ | $q_i$ | $x_i$ | $y_i$ |
|---|---|---|---|---|
| $-1$ | $240$ | | $1$ | $0$ |
| $0$ | $46$ | | $0$ | $1$ |
| $1$ | $10$ | $5$ | $1$ | $-5$ |
| $2$ | $6$ | $4$ | $-4$ | $21$ |
| $3$ | $4$ | $1$ | $5$ | $-26$ |
| $4$ | $2$ | $1$ | $-9$ | $47$ |
| $5$ | $0$ | $2$ | | |

Each row is computed from the two above it; for instance in row $2$, $q_2 = 4$ (since $46 = 4\cdot10 + 6$), $x_2 = 0 - 4\cdot 1 = -4$ and $y_2 = 1 - 4\cdot(-5) = 21$. The last non-zero remainder is $2$, so $\gcd(240, 46) = 2$ and

$$
240\cdot(-9) + 46\cdot 47 = -2160 + 2162 = 2 .
$$

Checking every row ($240\cdot1 - 46\cdot 5 = 10$, $-960 + 966 = 6$, …) is a good way to catch arithmetic errors.
:::
:::

::: widget euclid
a: 240
b: 46
mode: extended
caption: The extended Euclidean algorithm for $240$ and $46$ (the figure numbers the rows from $0$ and writes $s_i, t_i$ for the coefficients $x_i, y_i$ of [[#ex-extended]]). Each row keeps the invariant $r_i = 240s_i + 46t_i$; the last non-zero remainder gives $\gcd(240,46) = 2 = 240\cdot(-9) + 46\cdot 47$. The Bézout coefficients are not unique: the final row, $240\cdot 23 - 46\cdot 120 = 0$, shows that adding $23$ to $x$ and subtracting $120$ from $y$ gives another pair.
:::

Bézout's identity yields the single most useful fact about coprime numbers.

::: theorem Euclid's lemma, general form {#thm-coprime-divides}
If $a \mid bc$ and $\gcd(a, b) = 1$, then $a \mid c$.
:::

::: proof
By Bézout, $ax + by = 1$ for some integers $x, y$. Multiplying by $c$, $c = acx + bcy$. Now $a \mid acx$ and $a \mid bcy$ (since $a \mid bc$), so $a \mid c$.
:::

The coprimality hypothesis is essential: $6 \mid 4\cdot 3$ but $6 \nmid 4$ and $6 \nmid 3$. Two useful corollaries: if $a \mid c$ and $b \mid c$ with $\gcd(a, b) = 1$, then $ab \mid c$ (write $c = ak$; then $b \mid ak$ forces $b \mid k$); and if $\gcd(a, b) = \gcd(a, c) = 1$ then $\gcd(a, bc) = 1$ (multiply $ax + by = 1$ and $au + cv = 1$). When $a = p$ is prime, the theorem becomes Euclid's lemma ([[number-theory/primes#thm-euclid-lemma]]), the key to unique factorisation.

## Least common multiples

::: definition Least common multiple {#def-lcm}
For non-zero integers $a, b$, the **least common multiple** $\lcm(a, b)$ is the smallest positive integer divisible by both $a$ and $b$.
:::

Every common multiple $n$ of $a$ and $b$ is a multiple of $m = \lcm(a, b)$: dividing, $n = mq + r$ with $0 \le r < m$, and $r = n - mq$ is a common multiple smaller than $m$, so $r = 0$.

::: theorem gcd times lcm {#thm-gcd-lcm}
For positive integers $a, b$,

$$
\gcd(a, b)\cdot\lcm(a, b) = ab .
$$
:::

::: proof
Let $d = \gcd(a, b)$ and write $a = da'$, $b = db'$, so $\gcd(a', b') = 1$ by [[#cor-bezout]]. The number $m = da'b' = ab/d$ is a common multiple: $m = ab' = a'b$. Let $n$ be any common multiple, $n = ak = bl$. Then $da'k = db'l$, so $a'k = b'l$, hence $b' \mid a'k$, and since $\gcd(a', b') = 1$, $b' \mid k$ by [[#thm-coprime-divides]]. Writing $k = b't$ gives $n = ab't = mt$, a multiple of $m$. So $m$ is the least positive common multiple: $\lcm(a,b) = ab/d$.
:::

::: remark More than two numbers
The gcd of several integers is defined in the same way, and $\gcd(a, b, c) = \gcd(\gcd(a, b), c)$, since both sides are the largest number dividing all three. Bézout's identity extends: $\gcd(a_1, \dots, a_k) = a_1x_1 + \dots + a_kx_k$ for suitable integers $x_i$ (apply the two-number version repeatedly). Another useful rule is $\gcd(ma, mb) = m\gcd(a, b)$ for $m > 0$: if $d = \gcd(a,b) = ax + by$, then $md$ divides $ma$ and $mb$, and any common divisor of $ma$ and $mb$ divides $max + mby = md$.
:::

For the gears: $\lcm(252, 198) = 252\cdot 198/18 = 2772$. After $2772$ teeth have passed the meshing point, the gears are back where they started — after $2772/252 = 11$ turns of the first gear and $2772/198 = 14$ turns of the second.

::: quiz
Which of the following statements are true for all positive integers $a, b, c$? (Select all that apply.)
- [ ] If $a \mid bc$, then $a \mid b$ or $a \mid c$.
- [x] If $a \mid bc$ and $\gcd(a, b) = 1$, then $a \mid c$.
- [ ] If $a \mid c$ and $b \mid c$, then $ab \mid c$.
- [x] $\gcd(a, b)\cdot\lcm(a, b) = ab$.
::: solution
The first fails for $a = 6$, $b = 2$, $c = 3$. The second is [[#thm-coprime-divides]]. The third fails for $a = 4$, $b = 6$, $c = 12$ ($24 \nmid 12$); it holds when $\gcd(a, b) = 1$. The fourth is [[#thm-gcd-lcm]].
:::
:::

## How fast is Euclid's algorithm?

Euclid's algorithm is fast in practice — even for numbers with hundreds of digits. How fast? The worst case turns out to involve the **Fibonacci numbers** $F_1 = F_2 = 1$, $F_{k+1} = F_k + F_{k-1}$: $1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, \dots$ For consecutive Fibonacci numbers every quotient except the last is $1$, so the remainders shrink as slowly as possible:

$$
89 = 1\cdot 55 + 34,\quad 55 = 1\cdot 34 + 21,\quad \dots,\quad 3 = 1\cdot2 + 1,\quad 2 = 2\cdot 1 + 0 ,
$$

nine division steps in all for the pair $(89, 55) = (F_{11}, F_{10})$.

::: theorem Lamé's theorem {#thm-lame}
If the Euclidean algorithm applied to $a \ge b > 0$ takes $n$ division steps, then $b \ge F_{n+1}$. Consequently the number of steps is at most five times the number of decimal digits of $b$.
:::

::: proof
Use the notation of [[#alg-euclid]]: $r_{-1} = a$, $r_0 = b$, and $r_n = 0$ is the first zero remainder. We claim $r_{n-1-k} \ge F_{k+2}$ for $0 \le k \le n - 1$. For $k = 0$: $r_{n-1} \ge 1 = F_2$. For $k = 1$: the last step is $r_{n-2} = q_nr_{n-1}$, and $q_n \ge 2$ because $r_{n-2} > r_{n-1}$, so $r_{n-2} \ge 2 = F_3$. For $k \ge 2$, each step $r_{i-2} = q_ir_{i-1} + r_i$ has $q_i \ge 1$, so $r_{i-2} \ge r_{i-1} + r_i$, and by induction

$$
r_{n-1-k} \ge r_{n-k} + r_{n+1-k} \ge F_{k+1} + F_k = F_{k+2} .
$$

With $k = n - 1$ this gives $b = r_0 \ge F_{n+1}$.

For the digit bound, let $\phi = \frac{1 + \sqrt 5}{2} \approx 1.618$, which satisfies $\phi^2 = \phi + 1$. By induction $F_{k+1} \ge \phi^{k-1}$: true for $k = 1, 2$ ($1 \ge 1$, $2 \ge \phi$), and $F_{k+1} = F_k + F_{k-1} \ge \phi^{k-2} + \phi^{k-3} = \phi^{k-3}(\phi + 1) = \phi^{k-1}$. So $b \ge \phi^{n-1}$, i.e. $n - 1 \le \log_{10} b/\log_{10}\phi$. Since $\log_{10}\phi \approx 0.209 > \frac15$, we get $n - 1 \le 5\log_{10} b$. If $b$ has $N$ decimal digits then $\log_{10} b < N$, so $n - 1 < 5N$ and $n \le 5N$.
:::

So for numbers of $617$ digits — the size of a $2048$-bit RSA modulus — Euclid's algorithm needs at most $5\cdot 617 = 3085$ steps, a negligible amount of work for a computer. By contrast, finding the gcd by first factorising both numbers is believed to be infeasible at that size. That asymmetry between computing gcds (easy) and factorising (hard) is exactly what public-key cryptography exploits ([[number-theory/cryptography]]).

::: widget euclid
a: 89
b: 55
mode: gcd
caption: The worst case for Euclid's algorithm: consecutive Fibonacci numbers $89 = F_{11}$ and $55 = F_{10}$. Every quotient but the last is $1$, so each step removes only one square and the remainders run backwards through the Fibonacci sequence $34, 21, 13, 8, 5, 3, 2, 1$. Nine steps are needed, exactly the bound $b \ge F_{n+1}$ of Lamé's theorem with $n = 9$.
:::

::: application Euclid in everyday computing
Euclid's algorithm is used to reduce fractions in exact arithmetic, to compute modular inverses when generating RSA keys (the extended algorithm finds $d$ with $ed \equiv 1$), in the "binary gcd" variants built into cryptographic libraries, and in music software, where two rhythms with periods $a$ and $b$ realign after $\lcm(a, b) = ab/\gcd(a, b)$ beats. The same algorithm works for polynomials ([[abstract-algebra/polynomials]]), where it underlies error-correcting codes.
:::

::: history
The algorithm appears as Propositions 1 and 2 of Book VII of Euclid's *Elements* (about $300$ BC), phrased as repeatedly subtracting the smaller of two lengths from the larger — a process the Greeks called *anthyphairesis* — and it was probably known to earlier Greek mathematicians. In India, Āryabhaṭa (around $499$) used the closely related *kuṭṭaka* ("pulveriser") method to solve linear equations in integers. Claude-Gaspard Bachet de Méziriac showed in 1624 how to solve $ax - by = 1$ for coprime $a$ and $b$ — the heart of the identity $ax + by = \gcd(a, b)$ — and Étienne Bézout proved the analogue for polynomials in 1779; the identity is named after the latter. Gabriel Lamé's 1844 analysis of the number of steps is often cited as one of the first results in computational complexity, and also one of the first serious applications of the Fibonacci numbers.
:::

## Where this leads

Bézout's identity is the engine of the next three chapters. In [[number-theory/primes]] it proves Euclid's lemma and hence unique factorisation into primes. In [[number-theory/congruences]] it shows that $a$ has an inverse modulo $n$ exactly when $\gcd(a, n) = 1$, and powers the Chinese remainder theorem. The general solution of $ax + by = c$, and its non-negative solutions, are found in [[number-theory/diophantine]]. In abstract algebra the same ideas reappear as "every ideal of $\Z$ is principal" ([[abstract-algebra/rings]]) and as Euclid's algorithm for polynomials ([[abstract-algebra/polynomials]]).

::: summary
- $a \mid b$ means $b = ak$ for some integer $k$; a divisor of $b$ and $c$ divides every combination $bx + cy$.
- **Division algorithm**: for $b > 0$ there are unique $q, r$ with $a = bq + r$, $0 \le r < b$ — even for negative $a$ ([[#thm-division-algorithm]]).
- $\gcd(a, b) = \gcd(b, a \bmod b)$, so **Euclid's algorithm** computes the gcd as the last non-zero remainder.
- **Bézout**: $\gcd(a, b) = ax + by$ for some integers $x, y$, found by the extended algorithm; $ax + by = c$ is solvable iff $\gcd(a, b) \mid c$.
- If $a \mid bc$ and $\gcd(a, b) = 1$ then $a \mid c$ ([[#thm-coprime-divides]]).
- $\gcd(a, b)\cdot\lcm(a, b) = ab$ for positive $a, b$.
- **Lamé**: Euclid's algorithm needs at most five steps per decimal digit of the smaller number; consecutive Fibonacci numbers are the worst case.
:::

## Exercises

::: exercise A gcd by Euclid {level=1 check="77"}
Compute $\gcd(1001, 385)$ using Euclid's algorithm.
::: solution
$1001 = 2\cdot 385 + 231$, $385 = 1\cdot231 + 154$, $231 = 1\cdot 154 + 77$, $154 = 2\cdot 77 + 0$. So $\gcd(1001, 385) = 77$.
:::
:::

::: exercise An lcm {level=1 check="5005"}
Find $\lcm(1001, 385)$.
::: solution
By [[#thm-gcd-lcm]], $\lcm(1001, 385) = \dfrac{1001\cdot 385}{77} = 13\cdot 385 = 5005$.
:::
:::

::: exercise A negative dividend {level=1 check="5"}
Find the quotient and the remainder when $-100$ is divided by $7$. Enter the remainder.
::: solution
$7\cdot(-15) = -105 \le -100 < -98 = 7\cdot(-14)$, so $q = -15$ and $r = -100 + 105 = 5$: $-100 = 7\cdot(-15) + 5$.
:::
:::

::: exercise Bézout coefficients {level=2}
Find $d = \gcd(341, 217)$ and integers $x, y$ with $341x + 217y = d$.
::: solution
$341 = 1\cdot217 + 124$, $217 = 1\cdot 124 + 93$, $124 = 1\cdot 93 + 31$, $93 = 3\cdot 31$. So $d = 31$. Back-substituting:

$$
31 = 124 - 93 = 124 - (217 - 124) = 2\cdot 124 - 217 = 2(341 - 217) - 217 = 2\cdot 341 - 3\cdot 217 .
$$

So $x = 2$, $y = -3$; check: $682 - 651 = 31$.
:::
:::

::: exercise Coprime pairs {level=2}
Prove that for every integer $n$, $\gcd(n, n + 1) = 1$ and $\gcd(2n + 1, 3n + 1) = 1$.
::: solution
$(n + 1)\cdot 1 + n\cdot(-1) = 1$, so $\gcd(n, n+1) = 1$ by [[#cor-bezout]]. Similarly $(3n + 1)\cdot 2 + (2n + 1)\cdot(-3) = 6n + 2 - 6n - 3 = -1$, so any common divisor of $2n + 1$ and $3n + 1$ divides $1$, and the gcd is $1$.
:::
:::

::: exercise Sums and differences {level=2}
Suppose $\gcd(a, b) = 1$. Prove that $\gcd(a + b, a - b)$ is $1$ or $2$.
::: solution
Let $d = \gcd(a + b, a - b)$. Then $d$ divides the sum $(a + b) + (a - b) = 2a$ and the difference $(a + b) - (a - b) = 2b$. So $d$ divides $\gcd(2a, 2b)$. By Bézout, $ax + by = 1$, so $2ax + 2by = 2$ and $d \mid 2$. Hence $d \in \set{1, 2}$; both occur ($a = 2$, $b = 1$ gives $\gcd(3, 1) = 1$; $a = 3$, $b = 1$ gives $\gcd(4, 2) = 2$).
:::
:::

::: exercise Fibonacci numbers {level=2}
Prove that consecutive Fibonacci numbers are coprime, and that Euclid's algorithm applied to $(F_{n+1}, F_n)$ for $n \ge 3$ takes exactly $n - 1$ division steps.
::: solution
For $n \ge 3$ we have $F_{n+1} = 1\cdot F_n + F_{n-1}$ with $0 \le F_{n-1} < F_n$, so one step of Euclid replaces $(F_{n+1}, F_n)$ by $(F_n, F_{n-1})$. After $n - 2$ such steps we reach $(F_3, F_2) = (2, 1)$, and one more step $2 = 2\cdot 1 + 0$ finishes, with last non-zero remainder $1$. So $\gcd(F_{n+1}, F_n) = 1$, and the number of steps is $(n - 2) + 1 = n - 1$. (For $(89, 55) = (F_{11}, F_{10})$ this gives $9$ steps.)
:::
:::

::: exercise Base-b representation {level=3}
Let $b \ge 2$. Prove that every positive integer $n$ can be written uniquely as $n = c_kb^k + c_{k-1}b^{k-1} + \dots + c_1b + c_0$ with digits $0 \le c_i < b$ and $c_k \neq 0$.
::: hint
For existence, use strong induction and divide $n$ by $b$. For uniqueness, look at the remainder on division by $b$.
:::
::: solution
*Existence*, by strong induction on $n$. If $n < b$, take $k = 0$, $c_0 = n$. If $n \ge b$, divide: $n = bq + c_0$ with $0 \le c_0 < b$ and $1 \le q < n$. By induction $q = d_jb^j + \dots + d_0$ with digits $d_i$ and $d_j \ne 0$, so $n = d_jb^{j+1} + \dots + d_0b + c_0$ is a representation.

*Uniqueness*, again by strong induction. If $n = \sum c_ib^i = \sum c_i'b^i$ are two representations, then $n = b\bigl(\sum_{i\ge1}c_ib^{i-1}\bigr) + c_0$ with $0 \le c_0 < b$, so $c_0$ is the remainder of $n$ on division by $b$, and likewise $c_0'$; by uniqueness in the division algorithm, $c_0 = c_0'$ and the quotients $\sum_{i \ge 1}c_ib^{i-1} = \sum_{i\ge1}c_i'b^{i-1}$ agree. This quotient is smaller than $n$ (or zero, when $n < b$), so by induction its representation is unique, and the remaining digits agree.
:::
:::

::: exercise The gcd of Mersenne-type numbers {level=3}
Prove that $\gcd(2^m - 1, 2^n - 1) = 2^{\gcd(m, n)} - 1$ for positive integers $m, n$.
::: hint
If $m = nq + r$, show that $2^m - 1 \equiv 2^r - 1$ up to a multiple of $2^n - 1$, so Euclid's algorithm on the exponents mirrors Euclid's algorithm on the numbers.
:::
::: solution
First, $2^n - 1$ divides $2^{nq} - 1$, because $x - 1$ divides $x^q - 1 = (x - 1)(x^{q-1} + \dots + 1)$ with $x = 2^n$. Now if $m = nq + r$ with $0 \le r < n$,

$$
2^m - 1 = 2^r\bigl(2^{nq} - 1\bigr) + \bigl(2^r - 1\bigr),
$$

so by [[#lem-euclid-step]], $\gcd(2^m - 1, 2^n - 1) = \gcd(2^n - 1, 2^r - 1)$. Thus each step of Euclid's algorithm on the pair of exponents $(m, n) \to (n, r)$ corresponds to a step on the pair of numbers. When the exponent algorithm reaches $(g, 0)$ with $g = \gcd(m, n)$, the number pair is $(2^g - 1, 2^0 - 1) = (2^g - 1, 0)$, whose gcd is $2^g - 1$. For example $\gcd(2^{12} - 1, 2^{18} - 1) = 2^6 - 1 = 63$.
:::
:::
