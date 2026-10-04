The prime numbers $2, 3, 5, 7, 11, 13, \dots$ are the atoms of arithmetic: every whole number greater than $1$ is built from them by multiplication, and — this is the remarkable part — in only one way. That fact, the **fundamental theorem of arithmetic**, is so familiar from school that it is easy to miss that it needs a proof, and that in other number systems it is false. In this chapter we prove it carefully, starting from Bézout's identity, and explore its consequences: formulas for gcds and lcms, the number of divisors of $n$, the irrationality of $\sqrt 2$, and the exact power of a prime dividing $n!$.

The second half of the chapter is about how many primes there are and how they are spread out. Euclid proved there are infinitely many, by an argument still regarded as a model of mathematical elegance. Their distribution is irregular in detail — twin primes like $41, 43$ sit next to long gaps like the seven composites between $89$ and $97$ — yet remarkably regular on average: the **prime number theorem** says that the number of primes up to $x$ is approximately $x/\ln x$. Between these facts lie some of the most famous open problems in mathematics.

## Primes and composites

::: definition Prime number {#def-prime}
An integer $p > 1$ is **prime** if its only positive divisors are $1$ and $p$. An integer $n > 1$ that is not prime is **composite**; equivalently, $n = ab$ with $1 < a, b < n$.
:::

The number $1$ is neither prime nor composite. This is a convention, but a well-motivated one: if $1$ were prime, factorisations would not be unique ($6 = 2\cdot 3 = 1\cdot 2\cdot 3 = 1\cdot1\cdot2\cdot3$), and every theorem about "the" prime factorisation would need an exception.

::: lemma Prime divisors exist {#lem-prime-divisor}
Every integer $n > 1$ has a prime divisor; in fact its smallest divisor greater than $1$ is prime. If $n$ is composite, it has a prime divisor $p \le \sqrt n$.
:::

::: proof
The set of divisors of $n$ greater than $1$ contains $n$, so by well-ordering it has a least element $p$. If $p$ were composite, $p = ab$ with $1 < a < p$, then $a$ would be a smaller divisor of $n$ greater than $1$. So $p$ is prime. If $n$ is composite, write $n = ab$ with $1 < a \le b < n$; then $a^2 \le ab = n$, so $a \le \sqrt n$, and any prime divisor of $a$ is a prime divisor of $n$ that is at most $\sqrt n$.
:::

The second statement gives **trial division**: to test whether $n$ is prime, it suffices to try dividing by the primes up to $\sqrt n$.

::: example Testing 391 and 401 {#ex-trial-division}
Are $391$ and $401$ prime?
::: solution
$\sqrt{391} \approx 19.8$, so we try the primes $2, 3, 5, 7, 11, 13, 17, 19$. The first six fail, but $391 = 17 \cdot 23$: composite. For $401$, $\sqrt{401} \approx 20.02$, so the same primes suffice: $401$ is odd, its digit sum $5$ is not divisible by $3$, it does not end in $0$ or $5$, and $401 = 7\cdot 57 + 2 = 11\cdot 36 + 5 = 13\cdot 30 + 11 = 17\cdot 23 + 10 = 19\cdot 21 + 2$. No prime up to $\sqrt{401}$ divides it, so $401$ is prime.
:::
:::

Applying the same idea to all numbers at once gives the **sieve of Eratosthenes**. To find the primes up to $N$, list $2, 3, \dots, N$; circle $2$ and cross out its other multiples; circle the next number not crossed out ($3$) and cross out its multiples; and continue. Once the circled prime exceeds $\sqrt N$, every number not yet crossed out is prime, because a composite number up to $N$ has a prime factor at most $\sqrt N$.

::: widget sieve
mode: sieve
n: 120
caption: The sieve of Eratosthenes up to $120$. Each new prime crosses out its multiples, starting from its square (smaller multiples have already been crossed out by smaller primes). Since $\sqrt{120} < 11$, the work is finished after sieving by $2, 3, 5, 7$: the $30$ survivors are the primes up to $120$.
:::

## Euclid's lemma and unique factorisation

The key property of primes is not that they have few divisors, but how they divide products.

::: theorem Euclid's lemma {#thm-euclid-lemma}
Let $p$ be prime. If $p \mid ab$, then $p \mid a$ or $p \mid b$. More generally, if $p \mid a_1a_2\cdots a_k$, then $p \mid a_i$ for some $i$.
:::

::: proof
Suppose $p \mid ab$ and $p \nmid a$. The only positive divisors of $p$ are $1$ and $p$, and $p$ does not divide $a$, so $\gcd(p, a) = 1$. By [[number-theory/divisibility#thm-coprime-divides]], $p \mid b$. The general statement follows by induction on $k$: if $p \mid (a_1\cdots a_{k-1})a_k$, then $p \mid a_k$ or $p \mid a_1\cdots a_{k-1}$, and in the latter case the induction hypothesis applies.
:::

The property characterises primes: if $n > 1$ is composite, $n = ab$ with $1 < a, b < n$, then $n \mid ab$ but $n \nmid a$ and $n \nmid b$. For example $6 \mid 2\cdot 3$ but $6 \nmid 2$ and $6 \nmid 3$.

::: theorem Fundamental theorem of arithmetic {#thm-fta}
Every integer $n > 1$ can be written as a product of primes,

$$
n = p_1p_2\cdots p_r ,
$$

and this factorisation is unique apart from the order of the factors.
:::

::: proof
*Existence*, by strong induction on $n$. If $n$ is prime, it is a product of one prime. Otherwise $n = ab$ with $1 < a, b < n$; by the induction hypothesis $a$ and $b$ are products of primes, and so is $n$.

*Uniqueness*, by strong induction on $n$. Suppose

$$
n = p_1p_2\cdots p_r = q_1q_2\cdots q_s
$$

with all $p_i, q_j$ prime. Then $p_1$ divides $q_1q_2\cdots q_s$, so by Euclid's lemma $p_1 \mid q_j$ for some $j$. Since $q_j$ is prime and $p_1 > 1$, $p_1 = q_j$. Reorder the $q$'s so that $j = 1$ and cancel: $n/p_1 = p_2\cdots p_r = q_2\cdots q_s$. If $n/p_1 = 1$ then both remaining products are empty ($r = s = 1$). Otherwise $1 < n/p_1 < n$, and by the induction hypothesis the two factorisations of $n/p_1$ agree up to order. Hence so do the factorisations of $n$.
:::

Collecting equal primes gives the **canonical factorisation** $n = p_1^{e_1}p_2^{e_2}\cdots p_k^{e_k}$ with $p_1 < \dots < p_k$ and $e_i \ge 1$. For a prime $p$, the exponent of $p$ in $n$ is the **$p$-adic valuation** $v_p(n)$ (it is $0$ if $p \nmid n$); thus $n = \prod_p p^{v_p(n)}$, and uniqueness gives the rule $v_p(ab) = v_p(a) + v_p(b)$. For instance $360 = 2^3\cdot 3^2\cdot 5$, so $v_2(360) = 3$, $v_3(360) = 2$, $v_5(360) = 1$ and $v_7(360) = 0$.

::: warning Uniqueness is a theorem, not a triviality
Unique factorisation fails in number systems that look harmless. In the set $H = \set{1, 5, 9, 13, 17, 21, \dots}$ of positive integers of the form $4k + 1$, which is closed under multiplication, call an element of $H$ "$H$-prime" if it is not a product of two smaller elements of $H$ other than $1$. Then $9$, $21$ and $49$ are $H$-prime (their only proper factorisations, $3\cdot 3$, $3\cdot7$ and $7 \cdot 7$, use numbers outside $H$), yet

$$
441 = 9 \cdot 49 = 21\cdot 21
$$

has two different $H$-prime factorisations. The proof of [[#thm-fta]] fails in $H$ because Euclid's lemma fails: $21 \mid 9\cdot 49$ but $21 \nmid 9$ and $21 \nmid 49$. A similar failure in the ring $\Z[\sqrt{-5}]$, where $6 = 2 \cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$, is discussed in [[abstract-algebra/rings]].
:::

### Consequences of unique factorisation

**Divisibility, gcd and lcm.** By unique factorisation, $d \mid n$ if and only if $v_p(d) \le v_p(n)$ for every prime $p$ (if $n = dk$ then $v_p(n) = v_p(d) + v_p(k)$). Hence for positive $a, b$,

$$
\gcd(a, b) = \prod_p p^{\min(v_p(a), v_p(b))}, \qquad \lcm(a, b) = \prod_p p^{\max(v_p(a), v_p(b))},
$$

and since $\min(s, t) + \max(s, t) = s + t$, this gives a second proof that $\gcd(a, b)\lcm(a, b) = ab$. These formulas are convenient for small numbers but useless for large ones, which cannot be factorised quickly — Euclid's algorithm is then the only practical way to compute gcds.

**Counting divisors.** The positive divisors of $n = p_1^{e_1}\cdots p_k^{e_k}$ are the numbers $p_1^{f_1}\cdots p_k^{f_k}$ with $0 \le f_i \le e_i$, so the number of divisors is

$$
\tau(n) = (e_1 + 1)(e_2 + 1)\cdots(e_k + 1),
$$

and their sum, by expanding a product of geometric series, is

$$
\sigma(n) = \prod_{i=1}^k\left(1 + p_i + p_i^2 + \dots + p_i^{e_i}\right) = \prod_{i=1}^k \frac{p_i^{e_i + 1} - 1}{p_i - 1} .
$$ {#eq-sigma}

::: example Divisors of 360 {#ex-divisors-360}
Find the number and the sum of the positive divisors of $360$.
::: solution
$360 = 2^3\cdot 3^2\cdot 5$, so $\tau(360) = (3+1)(2+1)(1+1) = 24$ and

$$
\sigma(360) = (1 + 2 + 4 + 8)(1 + 3 + 9)(1 + 5) = 15\cdot 13 \cdot 6 = 1170 .
$$

(The Babylonians' choice of $360$ degrees in a circle is often explained by its many divisors.)
:::
:::

It follows from [[#eq-sigma]] that $\sigma(mn) = \sigma(m)\sigma(n)$ whenever $\gcd(m, n) = 1$, since the prime factors of $m$ and $n$ are then distinct. A number is **perfect** if it is the sum of its proper divisors, i.e. $\sigma(n) = 2n$: $6 = 1 + 2 + 3$ and $28 = 1 + 2 + 4 + 7 + 14$ are perfect.

::: theorem Euclid's perfect numbers {#thm-perfect}
If $2^k - 1$ is prime, then $n = 2^{k-1}(2^k - 1)$ is perfect.
:::

::: proof
Let $q = 2^k - 1$, prime. As $q$ is odd, $\gcd(2^{k-1}, q) = 1$ and $\sigma(n) = \sigma(2^{k-1})\sigma(q) = (2^k - 1)(q + 1) = (2^k - 1)2^k = 2n$.
:::

This gives $6, 28, 496, 8128$ for $k = 2, 3, 5, 7$. Euler proved the converse: every *even* perfect number has Euclid's form. Whether an odd perfect number exists is a famous open question.

**Irrationality.** Unique factorisation also explains why most square roots are irrational.

::: corollary Irrational square roots {#cor-irrational}
If the positive integer $n$ is not a perfect square, then $\sqrt n$ is irrational.
:::

::: proof
Suppose $\sqrt n = a/b$ with positive integers $a, b$, so $nb^2 = a^2$. For each prime $p$, $v_p(n) + 2v_p(b) = 2v_p(a)$, so $v_p(n)$ is even. Then $n = \prod_p p^{v_p(n)} = \bigl(\prod_p p^{v_p(n)/2}\bigr)^2$ is a perfect square.
:::

### The power of a prime in a factorial

How many zeros does $100!$ end with? Each zero comes from a factor $10 = 2\cdot 5$, and there are more $2$s than $5$s, so we need $v_5(100!)$.

::: theorem Legendre's formula {#thm-legendre-formula}
For a prime $p$ and a positive integer $n$,

$$
v_p(n!) = \left\lfloor\frac np\right\rfloor + \left\lfloor\frac n{p^2}\right\rfloor + \left\lfloor\frac n{p^3}\right\rfloor + \cdots
$$

(the sum is finite, since the terms vanish once $p^k > n$).
:::

::: proof
$v_p(n!) = \sum_{m=1}^n v_p(m)$ by the rule $v_p(ab) = v_p(a) + v_p(b)$. Write $v_p(m)$ as the number of $k \ge 1$ with $p^k \mid m$. Then

$$
v_p(n!) = \sum_{m=1}^n\ \sum_{k \ge 1,\ p^k \mid m} 1 = \sum_{k \ge 1}\#\set{m \le n : p^k \mid m} = \sum_{k\ge 1}\left\lfloor\frac{n}{p^k}\right\rfloor,
$$

since the multiples of $p^k$ up to $n$ are $p^k, 2p^k, \dots, \lfloor n/p^k\rfloor p^k$. (Each $m$ is counted once for every power of $p$ dividing it.)
:::

::: example Trailing zeros {#ex-trailing-zeros}
How many zeros does $100!$ end with? What is $v_2(100!)$?
::: solution
$v_5(100!) = \lfloor 100/5\rfloor + \lfloor 100/25\rfloor = 20 + 4 = 24$ (and $125 > 100$). Also

$$
v_2(100!) = 50 + 25 + 12 + 6 + 3 + 1 = 97 \ge 24,
$$

so $100! = 10^{24}m$ with $m$ not divisible by $10$: $100!$ ends in exactly $24$ zeros.
:::
:::

::: quiz
How many positive divisors does $72$ have?
- [ ] $6$
- [ ] $8$
- [x] $12$
- [ ] $72$
::: solution
$72 = 2^3\cdot 3^2$, so $\tau(72) = (3 + 1)(2 + 1) = 12$: they are $1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72$.
:::
:::

## Infinitely many primes

::: theorem Euclid's theorem {#thm-infinitude}
There are infinitely many primes.
:::

::: proof
Let $p_1, \dots, p_k$ be any finite list of primes and put $N = p_1p_2\cdots p_k + 1$. Then $N > 1$, so it has a prime divisor $q$ ([[#lem-prime-divisor]]). If $q$ were one of the $p_i$, it would divide both $N$ and $p_1\cdots p_k$, hence their difference $1$ — impossible. So $q$ is a prime not in the list. No finite list contains all primes.
:::

::: warning Euclid's number need not be prime
The proof does **not** say that $p_1\cdots p_k + 1$ is prime, only that its prime factors are new. Indeed $2\cdot 3\cdot 5 \cdot 7\cdot 11\cdot 13 + 1 = 30031 = 59\cdot 509$. The proof is also not by contradiction in any essential way: it is a recipe that, from any finite set of primes, produces another prime.
:::

Variations of Euclid's argument show there are infinitely many primes in certain arithmetic progressions.

::: theorem Primes of the form 4k + 3 {#thm-4k3}
There are infinitely many primes of the form $4k + 3$.
:::

::: proof
Let $p_1, \dots, p_k$ be any finite list of primes of the form $4k + 3$ and put $N = 4p_1\cdots p_k - 1$, which has the form $4m + 3$ and is odd. A product of numbers of the form $4m + 1$ again has this form, because $(4a + 1)(4b + 1) = 4(4ab + a + b) + 1$. So the odd number $N$ cannot have all its prime factors of the form $4m + 1$: some prime factor $q$ has the form $4m + 3$. If $q = p_i$ for some $i$, then $q$ divides $4p_1\cdots p_k - N = 1$, which is impossible. So $q$ is a new prime of the form $4m + 3$.
:::

The same trick does not work for primes $4k + 1$, because a number of the form $4m + 1$ can be a product of primes of the form $4m + 3$ (e.g. $21 = 3\cdot 7$). A different argument, using quadratic residues, handles that case in [[number-theory/quadratic-reciprocity]]. In general:

::: theorem Dirichlet's theorem on primes in arithmetic progressions {#thm-dirichlet}
If $\gcd(a, n) = 1$, there are infinitely many primes $p \equiv a \pmod n$, that is, of the form $a + kn$.
:::

The proof, given by Dirichlet in 1837, uses analytic methods (Dirichlet $L$-series) and characters of the group $(\Z/n\Z)^\times$, and is beyond this course (see Ireland and Rosen, Chapter 16). In a different direction, primes can be very sparse locally: for any $n \ge 2$ the $n - 1$ consecutive numbers

$$
n! + 2,\ n! + 3,\ \dots,\ n! + n
$$

are all composite, since $k$ divides $n! + k$ for $2 \le k \le n$. So there are arbitrarily long gaps between consecutive primes.

::: example Seven composites in a row {#ex-prime-gap}
Find seven consecutive composite numbers, first by the factorial construction and then as small as possible.
::: solution
With $n = 8$, the numbers $8! + 2, \dots, 8! + 8$, that is $40322, 40323, \dots, 40328$, are composite: $8! + k$ is divisible by $k$ for $2 \le k \le 8$. The factorial construction is wasteful, though. Running the sieve shows that $89$ and $97$ are consecutive primes, so the seven numbers

$$
90 = 2\cdot 3^2\cdot 5,\quad 91 = 7\cdot 13,\quad 92 = 2^2\cdot 23,\quad 93 = 3\cdot 31,\quad 94 = 2\cdot 47,\quad 95 = 5\cdot 19,\quad 96 = 2^5\cdot 3
$$

are all composite, and a check of the primes below $89$ shows that no earlier gap is this long. Gaps between primes near $x$ are about $\ln x$ on average, but individual gaps fluctuate wildly.
:::
:::

## The distribution of primes

Let $\pi(x)$ denote the number of primes $p \le x$. A table suggests that primes thin out slowly and steadily:

| $x$ | $10^3$ | $10^4$ | $10^5$ | $10^6$ | $10^9$ |
|---|---|---|---|---|---|
| $\pi(x)$ | $168$ | $1229$ | $9592$ | $78498$ | $50\,847\,534$ |
| $x/\ln x$ | $145$ | $1086$ | $8686$ | $72382$ | $48\,254\,942$ |
| $\operatorname{Li}(x)$ | $177$ | $1245$ | $9629$ | $78627$ | $50\,849\,234$ |

Here $\operatorname{Li}(x) = \int_2^x \frac{dt}{\ln t}$ is the **logarithmic integral**. Around $1792$, as a teenager, Gauss conjectured from tables of primes that the density of primes near $x$ is about $1/\ln x$, which makes $\operatorname{Li}(x)$ the natural estimate for $\pi(x)$. The table shows how good it is: at $x = 10^9$ the error is under $2000$ in about fifty million.

::: theorem Prime number theorem {#thm-pnt}
$$
\lim_{x\to\infty}\frac{\pi(x)}{x/\ln x} = 1, \qquad\text{that is,}\qquad \pi(x) \sim \frac{x}{\ln x} .
$$
:::

The prime number theorem was proved in $1896$, independently by Jacques Hadamard and Charles de la Vallée Poussin, using the Riemann zeta function $\zeta(s) = \sum n^{-s}$ as a function of a complex variable and showing that it has no zeros on the line $\operatorname{Re}s = 1$. An "elementary" proof (without complex analysis, but not simple) was found by Atle Selberg and Paul Erdős in $1949$. Both are beyond this course; see Hardy and Wright, Chapter 22. Equivalent forms say that the $n$-th prime $p_n$ is asymptotically $n\ln n$, and that a randomly chosen integer near $x$ is prime with probability about $1/\ln x$ — so a random $300$-digit number is prime with probability roughly $1/690$, a fact that makes it practical to find large primes for cryptography ([[number-theory/cryptography]]).

::: widget sieve
mode: count
n: 2000
caption: The prime-counting function $\pi(x)$ (a staircase rising by $1$ at each prime) against the approximations $x/\ln x$ and $\operatorname{Li}(x)$. The ratio $\pi(x)/(x/\ln x)$ tends to $1$ but very slowly — it is still about $1.15$ at $x = 2000$ — while $\operatorname{Li}(x)$ hugs the staircase much more closely. Notice how irregular the steps are locally, although the overall growth is smooth.
:::

Weaker but older and easier results are worth knowing. Chebyshev proved in the $1850$s that $c_1\frac{x}{\ln x} < \pi(x) < c_2\frac{x}{\ln x}$ for all large $x$, with constants $c_1 \approx 0.92$ and $c_2 \approx 1.11$, and deduced **Bertrand's postulate**: for every $n \ge 1$ there is a prime $p$ with $n < p \le 2n$. A key step in the elementary proofs is that every prime $p$ with $n < p \le 2n$ divides the binomial coefficient $\binom{2n}{n}$ ([[#exr-2-10]]).

::: quiz
Which of these numbers are prime? (Select all that apply.)
- [ ] $91$
- [x] $97$
- [ ] $1$
- [ ] $221$
- [x] $2$
::: solution
$91 = 7\cdot 13$ and $221 = 13\cdot17$ are composite (two classic traps); $1$ is neither prime nor composite; $97$ has no prime factor up to $\sqrt{97} < 10$; and $2$ is the only even prime.
:::
:::

## Special primes and open problems

**Mersenne primes.** If $2^n - 1$ is prime then $n$ is prime, because $2^{ab} - 1$ is divisible by $2^a - 1$ (as $x - 1$ divides $x^b - 1$). The converse fails: $2^{11} - 1 = 2047 = 23\cdot 89$. Primes of the form $2^p - 1$ are called **Mersenne primes**; they are exactly the primes in Euclid's perfect numbers, and they are easy to test (by the Lucas–Lehmer test), so the largest known primes are almost always Mersenne primes. As of 2024 the record was $2^{136279841} - 1$, a number of more than $41$ million digits found in October 2024 by the GIMPS distributed-computing project.

**Fermat primes.** Fermat noticed that $F_n = 2^{2^n} + 1$ is prime for $n = 0, 1, 2, 3, 4$ ($3, 5, 17, 257, 65537$) and conjectured that all such numbers are prime. Euler showed in 1732 that $F_5 = 4294967297 = 641\cdot 6700417$, and no further Fermat prime has ever been found. Gauss showed that a regular $p$-gon ($p$ prime) can be constructed with ruler and compass when $p$ is a Fermat prime, and Pierre Wantzel proved in 1837 that these are the only primes for which it is possible ([[abstract-algebra/fields-galois]]).

**Open problems.** Many simple questions about primes remain unanswered:

- **Twin primes**: are there infinitely many pairs $p, p + 2$ of primes ($3,5$; $11, 13$; $41, 43$; …)? In 2013 Yitang Zhang proved that there are infinitely many pairs of primes differing by at most $70$ million, and the Polymath project and James Maynard soon reduced the bound to $246$.
- **Goldbach's conjecture** (1742): every even number greater than $2$ is a sum of two primes. It has been checked by computer up to $4\times10^{18}$.
- **The Riemann hypothesis** (1859), about the zeros of $\zeta(s)$, is equivalent to the error bound $\abs{\pi(x) - \operatorname{Li}(x)} \le C\sqrt x\ln x$; it is one of the Millennium Prize Problems.

::: widget sieve
mode: ulam
n: 400
caption: The Ulam spiral: the integers $1, 2, 3, \dots$ are written in a square spiral and the primes are marked. Many primes line up along diagonals. The numbers on a diagonal are the values of a quadratic polynomial $4n^2 + bn + c$, and some quadratics take prime values unusually often (compare Euler's $n^2 + n + 41$, which is prime for $n = 0, 1, \dots, 39$). Why some quadratics are richer in primes than others is explained by quadratic residues, but whether any non-linear polynomial takes infinitely many prime values is still unknown.
:::

::: history
Euclid's *Elements* (about $300$ BC) contains both the infinitude of primes (Book IX, Proposition 20) and Euclid's lemma (Book VII, Proposition 30); the fundamental theorem in its modern form, with a complete proof of uniqueness, first appears in Gauss's *Disquisitiones Arithmeticae* (1801). Eratosthenes of Cyrene described his sieve in the third century BC. Leonhard Euler showed in 1737 that the sum of the reciprocals of the primes diverges, giving a new proof of Euclid's theorem that also shows primes are not too sparse. Legendre and Gauss conjectured the prime number theorem around $1800$; Bernhard Riemann's memoir of 1859 connected it to the zeros of the zeta function, and Hadamard and de la Vallée Poussin completed the proof in 1896.
:::

## Where this leads

Unique factorisation is used constantly in the rest of the course: in [[number-theory/fermat-euler]] to compute Euler's totient function from a factorisation, in [[number-theory/quadratic-reciprocity]] to reduce Legendre symbols to prime arguments, and in [[number-theory/diophantine]] to analyse Pythagorean triples and sums of two squares. Its failure in rings such as $\Z[\sqrt{-5}]$ ([[abstract-algebra/rings]]) gave rise to ideal theory, and its analogue for polynomials is [[abstract-algebra/polynomials#thm-poly-ufd]]. The difficulty of *finding* the factorisation of a large number is the foundation of RSA cryptography ([[number-theory/cryptography]]).

::: summary
- A prime has exactly two positive divisors; every $n > 1$ has a prime factor, and a composite $n$ has one at most $\sqrt n$ (basis of trial division and the sieve).
- **Euclid's lemma**: $p \mid ab \Rightarrow p \mid a$ or $p \mid b$; it follows from Bézout and characterises primes.
- **Fundamental theorem of arithmetic**: factorisation into primes exists and is unique up to order ([[#thm-fta]]); uniqueness genuinely needs Euclid's lemma.
- With $n = \prod p^{v_p(n)}$: divisibility, gcd and lcm compare exponents; $\tau(n) = \prod(e_i + 1)$; $\sigma$ is multiplicative; $\sqrt n$ is irrational unless $n$ is a square.
- **Legendre's formula**: $v_p(n!) = \sum_{k \ge 1}\lfloor n/p^k\rfloor$; e.g. $100!$ ends in $24$ zeros.
- There are infinitely many primes (Euclid), infinitely many of the form $4k+3$, and (Dirichlet) infinitely many in every progression $a + kn$ with $\gcd(a, n) = 1$; gaps between primes can be arbitrarily long.
- **Prime number theorem**: $\pi(x) \sim x/\ln x$, and $\operatorname{Li}(x)$ is an even better approximation; twin primes, Goldbach and the Riemann hypothesis remain open.
:::

## Exercises

::: exercise Divisors of 2024 {level=1 check="16"}
Factorise $2024$ and find the number of its positive divisors.
::: solution
$2024 = 8\cdot 253 = 2^3\cdot 11\cdot 23$, so $\tau(2024) = (3+1)(1+1)(1+1) = 16$.
:::
:::

::: exercise Primes up to 50 {level=1 check="15"}
Use the sieve of Eratosthenes to find $\pi(50)$.
::: solution
Since $\sqrt{50} < 8$, sieving by $2, 3, 5, 7$ suffices. The survivors are $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47$, so $\pi(50) = 15$.
:::
:::

::: exercise The power of 3 in 30! {level=1 check="14"}
Find $v_3(30!)$.
::: solution
By Legendre's formula, $v_3(30!) = \lfloor 30/3\rfloor + \lfloor 30/9 \rfloor + \lfloor 30/27\rfloor = 10 + 3 + 1 = 14$.
:::
:::

::: exercise gcd and lcm from factorisations {level=2 check="22680"}
Using the factorisations $504 = 2^3\cdot 3^2\cdot 7$ and $810 = 2\cdot 3^4\cdot 5$, find $\gcd(504, 810)$ and $\lcm(504, 810)$. Enter the lcm.
::: solution
Take minimum and maximum exponents: $\gcd = 2^1\cdot 3^2 = 18$ and $\lcm = 2^3\cdot 3^4\cdot 5\cdot 7 = 8\cdot 81\cdot 35 = 22680$. Check: $18\cdot 22680 = 408240 = 504\cdot 810$.
:::
:::

::: exercise When can 2ⁿ + 1 be prime? {level=2}
Prove that if $2^n + 1$ is prime ($n \ge 1$), then $n$ is a power of $2$.
::: hint
If $n$ has an odd factor $m > 1$, use $x^m + 1 = (x + 1)(x^{m-1} - x^{m-2} + \dots + 1)$ for odd $m$.
:::
::: solution
Suppose $n = km$ with $m > 1$ odd. For odd $m$, $x + 1$ divides $x^m + 1$ (as $(-1)^m + 1 = 0$, so $-1$ is a root). With $x = 2^k$: $2^k + 1$ divides $2^n + 1$, and $1 < 2^k + 1 < 2^n + 1$. So $2^n + 1$ is composite. Hence if $2^n + 1$ is prime, $n$ has no odd factor greater than $1$, i.e. $n$ is a power of $2$ and $2^n + 1$ is a Fermat number.
:::
:::

::: exercise Sophie Germain's identity {level=2}
Prove that $n^4 + 4$ is composite for every integer $n > 1$.
::: solution
$n^4 + 4 = (n^2 + 2)^2 - (2n)^2 = (n^2 + 2n + 2)(n^2 - 2n + 2)$. For $n > 1$ the smaller factor $n^2 - 2n + 2 = (n - 1)^2 + 1 \ge 2$, and the larger factor is bigger still, so both factors exceed $1$. (For $n = 1$ the identity gives $5 = 5\cdot 1$.)
:::
:::

::: exercise An irrational logarithm {level=2}
Prove that $\log_2 3$ is irrational.
::: solution
Suppose $\log_2 3 = a/b$ with positive integers $a, b$ (it is positive since $3 > 1$). Then $2^{a/b} = 3$, so $2^a = 3^b$. The left side is even and the right side odd — or, by unique factorisation, the left side has only the prime $2$ and the right side only the prime $3$. Contradiction.
:::
:::

::: exercise Primes of the form 6k + 5 {level=3}
Prove that there are infinitely many primes of the form $6k + 5$.
::: hint
Imitate [[#thm-4k3]] with $N = 6p_1\cdots p_k - 1$.
:::
::: solution
Every prime other than $2$ and $3$ has the form $6k + 1$ or $6k + 5$ (the other residues $0, 2, 3, 4$ give multiples of $2$ or $3$). A product of numbers of the form $6k + 1$ has the same form: $(6a+1)(6b+1) = 6(6ab + a + b) + 1$. Given primes $p_1, \dots, p_k$ of the form $6k + 5$, let $N = 6p_1\cdots p_k - 1$, which has the form $6m + 5$. It is not divisible by $2$ or $3$, so all its prime factors are of the form $6k+1$ or $6k+5$; they cannot all be $6k + 1$, or $N$ would be too. So some prime $q \equiv 5 \pmod 6$ divides $N$, and $q$ is not any $p_i$, since otherwise $q \mid 6p_1\cdots p_k - N = 1$.
:::
:::

::: exercise Harmonic numbers are not integers {level=3}
Prove that $H_n = 1 + \frac12 + \frac13 + \dots + \frac1n$ is not an integer for any $n \ge 2$.
::: hint
Let $2^k$ be the largest power of $2$ that is at most $n$. Multiply $H_n$ by $2^{k-1}L$, where $L$ is the product of the odd numbers up to $n$.
:::
::: solution
Let $2^k \le n < 2^{k+1}$ (so $k \ge 1$) and let $L$ be the product of all odd numbers up to $n$. Multiply $H_n$ by $M = 2^{k-1}L$:

$$
MH_n = \sum_{m=1}^n \frac{2^{k-1}L}{m}.
$$

Write $m = 2^{v}u$ with $u$ odd. For every $m \ne 2^k$ we have $v \le k - 1$ (only $m = 2^k$ has $v = k$, since $2^{k+1} > n$ and $3\cdot 2^k > n$), so $\frac{2^{k-1}L}{m} = 2^{k-1-v}\frac{L}{u}$ is an integer. For $m = 2^k$ the term is $\frac{L}{2}$, which is not an integer because $L$ is odd. So $MH_n$ is an integer plus $\frac L2$, hence not an integer; but if $H_n$ were an integer, $MH_n$ would be one. So $H_n \notin \Z$.
:::
:::

::: exercise Primes in the middle binomial coefficient {level=3}
Let $n \ge 1$. Prove that every prime $p$ with $n < p \le 2n$ divides $\binom{2n}{n}$, and deduce that the product of all such primes is at most $4^n$.
::: solution
By Legendre's formula, $v_p((2n)!) = \lfloor 2n/p\rfloor + \lfloor 2n/p^2\rfloor + \dots$. Since $n < p \le 2n$, $\lfloor 2n/p\rfloor = 1$, and $p^2 > 2n$ (as $p^2 > n^2 \ge 2n$ for $n \ge 2$; for $n = 1$, $p = 2$ and $p^2 = 4 > 2$), so $v_p((2n)!) = 1$. On the other hand $p > n$ gives $v_p(n!) = 0$. Hence

$$
v_p\binom{2n}{n} = v_p((2n)!) - 2v_p(n!) = 1,
$$

so $p \mid \binom{2n}n$. Distinct primes dividing a number have product dividing it, so $\prod_{n < p \le 2n} p \le \binom{2n}{n} \le \sum_k\binom{2n}{k} = 2^{2n} = 4^n$. (Bounds like this one are the starting point of Chebyshev's estimates for $\pi(x)$.)
:::
:::
