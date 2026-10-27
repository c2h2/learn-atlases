Everything so far has been symmetric: Alice and Bob share a key. In 1976 Whitfield Diffie and Martin Hellman asked how two people who have never met could agree on a key over a channel that everyone can read, and the answer they found — and the RSA cryptosystem that followed a year later — came not from block ciphers but from **number theory**: arithmetic modulo a large integer, in which some operations are easy (multiplying, raising to a power, testing primality) while their apparent inverses (factoring, taking discrete logarithms) seem to be extraordinarily hard. Public-key cryptography lives in that gap.

This chapter collects the number theory and the algorithms that the next three chapters need, with the emphasis on *computation*: how to compute greatest common divisors and inverses with the extended Euclidean algorithm, powers with repeated squaring, and isomorphisms with the Chinese remainder theorem; why Fermat's and Euler's theorems hold, in the language of finite groups; how to find large primes with the Miller–Rabin test; and how to state precisely the hard problems — factoring, discrete logarithms, the computational and decisional Diffie–Hellman problems — on which security will rest. Proofs of the classical theorems are in [Maths Atlas: congruences](/learn/maths/lesson.php?c=number-theory&l=congruences), [Fermat and Euler](/learn/maths/lesson.php?c=number-theory&l=fermat-euler) and [primitive roots](/learn/maths/lesson.php?c=number-theory&l=primitive-roots), and group theory in [Maths Atlas: groups](/learn/maths/lesson.php?c=abstract-algebra&l=groups); here we prove what we need in the form we need it, and count the cost of every algorithm in bit operations, because cryptographic numbers have thousands of bits.

## Modular arithmetic and its cost

For an integer $N \ge 2$, $\Z_N = \{0, 1, \dots, N - 1\}$ with addition and multiplication modulo $N$. We write $a \bmod N$ for the remainder and $a \equiv b \pmod N$ when $N$ divides $a - b$. Reducing after every operation keeps numbers below $N$, so for an $n$-bit modulus (that is, $N < 2^n$) addition costs $O(n)$ bit operations and multiplication with reduction costs $O(n^2)$ by the schoolbook method — faster methods exist (Karatsuba's $O(n^{1.585})$ and beyond), but $O(n^2)$ is the right picture for 2048-bit numbers. The key point is that every operation is *polynomial in the length* $n = \lceil\log_2 N\rceil$, not in $N$ itself. An algorithm that takes $N$ steps, such as trying every divisor, is exponential in $n$.

An element $a \in \Z_N$ has a **multiplicative inverse** $a^{-1}$ (with $a \cdot a^{-1} \equiv 1$) exactly when $\gcd(a, N) = 1$, and the inverses are found by Euclid's algorithm.

### The extended Euclidean algorithm

::: algorithm Extended Euclidean algorithm {#alg-egcd}
Input integers $a \ge b \ge 0$, not both $0$. Output $g = \gcd(a, b)$ and integers $s, t$ with $as + bt = g$.

1. $(r_0, s_0, t_0) \gets (a, 1, 0)$ and $(r_1, s_1, t_1) \gets (b, 0, 1)$; $i \gets 1$.
2. While $r_i \ne 0$:
   1. $q_i \gets \lfloor r_{i-1}/r_i\rfloor$;
   2. $(r_{i+1}, s_{i+1}, t_{i+1}) \gets (r_{i-1} - q_ir_i,\ s_{i-1} - q_is_i,\ t_{i-1} - q_it_i)$;
   3. $i \gets i + 1$.
3. Return $(r_{i-1}, s_{i-1}, t_{i-1})$.
:::

::: theorem Correctness and cost of extended Euclid {#thm-egcd}
[[#alg-egcd]] returns $g = \gcd(a, b)$ and $s, t$ with $as + bt = g$. It performs at most $2\log_2 a + 2$ iterations, and $O(n^2)$ bit operations for $n$-bit inputs.
:::

::: proof
*Invariants.* For every $i$, (i) $r_i = as_i + bt_i$, and (ii) $\gcd(r_{i-1}, r_i) = \gcd(a, b)$. Both hold for $i = 1$. If they hold for $i - 1$ and $i$, then $r_{i+1} = r_{i-1} - q_ir_i = a(s_{i-1} - q_is_i) + b(t_{i-1} - q_it_i)$, which is (i) for $i + 1$; and any common divisor of $r_{i-1}$ and $r_i$ divides $r_{i+1} = r_{i-1} - q_ir_i$, while any common divisor of $r_i$ and $r_{i+1}$ divides $r_{i-1} = q_ir_i + r_{i+1}$, so the gcds agree, which is (ii).

*Termination and output.* $r_{i+1} = r_{i-1} \bmod r_i < r_i$, so the remainders strictly decrease and reach $0$. When $r_i = 0$, (ii) gives $\gcd(a, b) = \gcd(r_{i-1}, 0) = r_{i-1}$, and (i) gives $r_{i-1} = as_{i-1} + bt_{i-1}$.

*Iterations.* We claim $r_{i+1} < r_{i-1}/2$. If $r_i \le r_{i-1}/2$ then $r_{i+1} < r_i \le r_{i-1}/2$. Otherwise $q_i = 1$ and $r_{i+1} = r_{i-1} - r_i < r_{i-1}/2$. So the remainder halves every two iterations, and after at most $2\log_2 a + 2$ iterations it is $0$. Each iteration is a division and some multiplications of numbers of at most $n$ bits (the $\abs{s_i}, \abs{t_i}$ stay below $a$); a careful accounting, in which the quotient sizes sum to $O(n)$, gives $O(n^2)$ in total.
:::

::: example Extended Euclid by hand {#ex-egcd}
Compute $\gcd(240, 46)$ with coefficients, and then the inverse of $17$ modulo $3120$.
::: solution
Each row is $r_i = 240 s_i + 46 t_i$; the quotient $q_i$ produces the next row.

| $i$ | $r_i$ | $q_i$ | $s_i$ | $t_i$ |
|---|---|---|---|---|
| 0 | 240 | | 1 | 0 |
| 1 | 46 | 5 | 0 | 1 |
| 2 | 10 | 4 | 1 | −5 |
| 3 | 6 | 1 | −4 | 21 |
| 4 | 4 | 1 | 5 | −26 |
| 5 | 2 | 2 | −9 | 47 |
| 6 | 0 | | | |

So $\gcd(240, 46) = 2 = 240 \cdot (-9) + 46 \cdot 47$; check: $-2160 + 2162 = 2$.

For $17^{-1} \bmod 3120$, the same algorithm on $(3120, 17)$ returns $\gcd = 1 = 3120 \cdot 2 + 17 \cdot (-367)$ (check: $6240 - 6239 = 1$), so $17^{-1} \equiv -367 \equiv 2753 \pmod{3120}$. Python computes inverses directly:

```python
print(pow(17, -1, 3120), 17 * 2753 % 3120)
```

```console
$ python3 inverse.py
2753 1
```

(These are the numbers of the textbook RSA example in [[cryptography/public-key]].)
:::
:::

::: widget euclid
a: 240
b: 46
mode: extended
caption: The extended Euclidean algorithm on $240$ and $46$: each row keeps $r_i = 240s_i + 46t_i$, and the last non-zero remainder is the gcd. The tiling shows the same division steps as squares cut from a rectangle. Try a pair of consecutive Fibonacci numbers such as $89$ and $55$ — the worst case, with all quotients equal to $1$ — and watch the number of rows grow only logarithmically.
:::

### Fast exponentiation

Computing $a^e \bmod N$ by $e - 1$ multiplications is hopeless for a 2048-bit $e$. **Repeated squaring** uses the binary expansion of $e$.

::: algorithm Square-and-multiply {#alg-modexp}
Input $a \in \Z_N$ and $e \ge 0$ with binary digits $e_{n-1}\dots e_1e_0$. Output $a^e \bmod N$.

1. $r \gets 1$.
2. For $j = n - 1$ down to $0$:
   1. $r \gets r^2 \bmod N$;
   2. if $e_j = 1$, $r \gets r \cdot a \bmod N$.
3. Return $r$.
:::

After processing digits $e_{n-1}\dots e_j$, the invariant is $r = a^{\lfloor e/2^j\rfloor}$: squaring doubles the exponent and multiplying by $a$ adds the next bit. So the algorithm is correct and uses at most $2n$ modular multiplications, $O(n^3)$ bit operations with schoolbook multiplication, for an $n$-bit exponent and modulus. A real implementation must also not let its running time or memory accesses depend on the bits of a *secret* exponent, or the exponent leaks through timing; constant-time "ladder" variants exist for this, and library implementations use them.

::: example Square-and-multiply on a Carmichael number {#ex-modexp}
Compute $7^{560} \bmod 561$ with [[#alg-modexp]].
::: solution
$560 = 1000110000_2$. Starting from $r = 1$, square for every bit and multiply by $7$ for every $1$ bit:

| bit | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
|---|---|---|---|---|---|---|---|---|---|---|
| $r$ | 7 | 49 | 157 | 526 | 160 | 241 | 298 | 166 | 67 | 1 |

For instance after the third bit $r = 49^2 \bmod 561 = 2401 - 4 \cdot 561 = 157$, and at the fifth bit $r = 526^2 \cdot 7 \bmod 561 = 160$. The result is $7^{560} \equiv 1 \pmod{561}$, using $10$ squarings and $3$ multiplications instead of $559$ multiplications. Fermat's little theorem would predict exactly this if $561$ were prime — but $561 = 3 \cdot 11 \cdot 17$. We return to this below.
:::
:::

## Groups, Fermat and Euler

The right language for exponentiation is that of groups ([Maths Atlas: groups](/learn/maths/lesson.php?c=abstract-algebra&l=groups)). A **group** $(G, \cdot)$ is a set with an associative operation, an identity $1$, and inverses; it is **abelian** if the operation is commutative, and its **order** is $\abs G$. The groups we need are:

- $\Z_N$ under addition, of order $N$;
- $\Z_N^* = \set{a \in \Z_N : \gcd(a, N) = 1}$ under multiplication modulo $N$, of order $\phi(N)$, **Euler's totient** (closed under multiplication because a product of numbers coprime to $N$ is coprime to $N$; inverses exist by extended Euclid);
- for a prime $p$, $\Z_p^* = \{1, \dots, p - 1\}$, of order $p - 1$;
- elliptic-curve groups, in [[cryptography/public-key]].

::: theorem Exponents live modulo the group order {#thm-group-order}
Let $G$ be a finite abelian group of order $m$. Then $g^m = 1$ for every $g \in G$. Consequently $g^x = g^{x \bmod m}$ for every integer $x$.
:::

::: proof
List the elements as $h_1, \dots, h_m$. The map $h \mapsto gh$ is a bijection of $G$ (its inverse is $h \mapsto g^{-1}h$), so $gh_1, \dots, gh_m$ is the same list in another order. Since $G$ is abelian we may multiply the two lists in any order:
$$
h_1h_2\cdots h_m = (gh_1)(gh_2)\cdots(gh_m) = g^m\,h_1h_2\cdots h_m .
$$
Multiplying by the inverse of $h_1\cdots h_m$ gives $g^m = 1$. For any $x$, write $x = qm + r$ with $r = x \bmod m$; then $g^x = (g^m)^q g^r = g^r$.
:::

The result holds for non-abelian groups too, by Lagrange's theorem ([Maths Atlas: Lagrange's theorem](/learn/maths/lesson.php?c=abstract-algebra&l=lagrange)). Applied to $\Z_N^*$ and $\Z_p^*$ it gives the two classical theorems.

::: corollary Euler's and Fermat's theorems {#cor-euler-fermat}
If $\gcd(a, N) = 1$ then $a^{\phi(N)} \equiv 1 \pmod N$. If $p$ is prime and $p \nmid a$ then $a^{p-1} \equiv 1 \pmod p$.
:::

The next consequence is the mathematical heart of RSA.

::: corollary Taking $e$-th roots {#cor-eth-root}
Let $G$ be a finite abelian group of order $m$ and $e$ an integer with $\gcd(e, m) = 1$, and let $d = e^{-1} \bmod m$. Then $x \mapsto x^e$ is a permutation of $G$, with inverse $y \mapsto y^d$.
:::

::: proof
$ed \equiv 1 \pmod m$, so by [[#thm-group-order]] $(x^e)^d = x^{ed} = x^{ed \bmod m} = x^1 = x$, and similarly $(y^d)^e = y$. A map with a two-sided inverse is a bijection.
:::

In $\Z_N^*$ with $N = pq$, computing $d$ requires the group order $\phi(N) = (p-1)(q-1)$, which is easy for whoever knows $p$ and $q$ and — as far as anyone knows — hard for everyone else. That asymmetry is RSA.

### The Chinese remainder theorem

::: theorem Chinese remainder theorem {#thm-crt}
Let $N = pq$ with $\gcd(p, q) = 1$. The map $f(x) = (x \bmod p,\ x \bmod q)$ is a bijection from $\Z_N$ to $\Z_p \times \Z_q$ that respects addition and multiplication; it restricts to a bijection from $\Z_N^*$ to $\Z_p^* \times \Z_q^*$. In particular $\phi(N) = \phi(p)\phi(q)$, which is $(p-1)(q-1)$ for distinct primes.
:::

::: proof
$f$ respects the operations because reduction modulo $p$ and modulo $q$ each do. It is injective: if $f(x) = f(x')$ then $p$ and $q$ both divide $x - x'$, hence so does $pq$ (they are coprime), so $x = x'$ in $\Z_N$. Both sets have $N = pq$ elements, so $f$ is a bijection. Explicitly, extended Euclid gives $s, t$ with $ps + qt = 1$; then $e_p = qt$ satisfies $e_p \equiv 1 \pmod p$, $e_p \equiv 0 \pmod q$, and $e_q = ps$ the reverse, so $x = (a\,e_p + b\,e_q) \bmod N$ is the preimage of $(a, b)$. Finally $x$ is coprime to $N$ iff it is coprime to both $p$ and $q$, iff $x \bmod p \in \Z_p^*$ and $x \bmod q \in \Z_q^*$; counting gives $\phi(N) = \phi(p)\phi(q)$.
:::

The CRT is used everywhere in public-key cryptography: it lets the owner of an RSA key compute modulo $p$ and $q$ separately and recombine, about four times faster than working modulo $N$ ([[cryptography/public-key]]), and it explains the structure of $\Z_N^*$ used in many proofs.

::: widget euclid
mode: crt
system: 2 mod 3; 3 mod 5; 2 mod 7
caption: The Chinese remainder theorem solving $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$, $x \equiv 2 \pmod 7$: the unique solution modulo $105$ is $x = 23$. Each step combines two congruences into one using the coefficients from extended Euclid. Change a residue and see the solution move; make two moduli share a factor and see when the system has no solution.
:::

::: quiz
$N = 77 = 7 \cdot 11$. What is $\phi(77)$, and what is $3^{241} \bmod 77$?

- [ ] $\phi = 76$ and $3^{241} \equiv 3^{13}$
- [x] $\phi = 60$ and $3^{241} \equiv 3$
- [ ] $\phi = 60$ and $3^{241} \equiv 1$
- [ ] $\phi = 18$ and $3^{241} \equiv 3^7$
::: solution
$\phi(77) = 6 \cdot 10 = 60$ by [[#thm-crt]]. Since $\gcd(3, 77) = 1$, [[#thm-group-order]] lets us reduce the exponent: $241 = 4 \cdot 60 + 1$, so $3^{241} \equiv 3^1 = 3 \pmod{77}$.
:::
:::

## Finding large primes

RSA needs random primes of 1024 bits or more, and Diffie–Hellman needs a large prime modulus. Primes are plentiful: by the **prime number theorem** the number of primes below $x$ is about $x/\ln x$, so a random $n$-bit odd number is prime with probability about $2/(n\ln 2)$ — for $n = 1024$, about $1/355$. Choosing random odd candidates and testing each therefore takes a few hundred tests on average. Everything depends on a fast test.

The first idea is Fermat's theorem: if $a^{N-1} \not\equiv 1 \pmod N$ for some $a$, then $N$ is certainly composite, and $a$ is a **Fermat witness**. For most composites, most bases are witnesses. But there are composites, the **Carmichael numbers**, for which $a^{N-1} \equiv 1$ for *every* $a$ coprime to $N$: [[#ex-modexp]] found one, $561$, and there are infinitely many (Alford, Granville and Pomerance, 1994). The Fermat test cannot detect them. The fix uses a second property of primes.

::: lemma Square roots of one modulo a prime {#lem-sqrt-one}
If $p$ is an odd prime and $x^2 \equiv 1 \pmod p$, then $x \equiv \pm 1 \pmod p$.
:::

::: proof
$p$ divides $x^2 - 1 = (x - 1)(x + 1)$, and a prime dividing a product divides a factor, so $x \equiv 1$ or $x \equiv -1$.
:::

Modulo a composite $N$ with at least two distinct odd prime factors, $1$ has more than two square roots (by the CRT, combine $\pm 1$ modulo each factor), and the test hunts for one.

::: algorithm Miller–Rabin test {#alg-miller-rabin}
Input an odd $N > 3$ and a number of rounds $t$. Write $N - 1 = 2^s d$ with $d$ odd.

Repeat $t$ times:

1. Choose $a$ uniformly from $\{2, \dots, N - 2\}$ and compute $x \gets a^d \bmod N$.
2. If $x = 1$ or $x = N - 1$, this round passes.
3. Otherwise square $x$ up to $s - 1$ times; if it becomes $N - 1$, the round passes. If it never does, output **composite** ($a$ is a **strong witness**).

If all rounds pass, output **probably prime**.
:::

::: theorem Miller–Rabin is correct with one-sided error {#thm-miller-rabin}
If $N$ is prime, the test always outputs "probably prime". If $N$ is an odd composite, each round outputs "composite" with probability at least $3/4$, so $t$ independent rounds wrongly output "probably prime" with probability at most $4^{-t}$. The test uses $O(t)$ modular exponentiations, $O(tn^3)$ bit operations for $n$-bit $N$.
:::

::: proof
*Primes pass.* Let $N = p$ be prime and $a \in \{2, \dots, p - 2\}$. The sequence $a^d, a^{2d}, \dots, a^{2^sd}$ ends in $a^{p-1} \equiv 1$ by Fermat. Each term is the square of the previous one. If the first term is $1$ the round passes. Otherwise there is a first term equal to $1$, and the term before it is a square root of $1$ that is not $1$, so it is $-1 = p - 1$ by [[#lem-sqrt-one]]; that term appears among $a^d, \dots, a^{2^{s-1}d}$, so the round passes.

*Composites usually fail.* That at most a quarter of the bases in $\{1, \dots, N-1\}$ are **strong liars** (bases for which a round passes) for every odd composite $N > 9$ is a theorem of Monier and Rabin (1980), whose proof analyses the structure of $\Z_N^*$ through the CRT; we omit it, and prove in [[#ex-fermat-half]] the simpler fact that when a Fermat witness coprime to $N$ exists, at most half of $\Z_N^*$ are Fermat liars. Independent rounds multiply the error probabilities.

*Cost.* Each round is one exponentiation and at most $s - 1 < n$ squarings.
:::

For random candidates, the error is far smaller than $4^{-t}$, because most composites have very few strong liars; standards such as FIPS 186-5 specify the number of rounds for each size. Since 2002 primality has also been known to be decidable in deterministic polynomial time (the AKS algorithm), but Miller–Rabin remains the practical choice.

::: example Miller–Rabin unmasks 561 {#ex-mr-561}
Run one round of Miller–Rabin on $N = 561$ with base $a = 2$.
::: solution
$N - 1 = 560 = 2^4 \cdot 35$, so $s = 4$ and $d = 35$. Compute $x = 2^{35} \bmod 561 = 263$: not $1$ or $560$. Square repeatedly: $263^2 \bmod 561 = 166$, $166^2 \bmod 561 = 67$, $67^2 \bmod 561 = 1$. The sequence $263, 166, 67, 1$ never passes through $560$, so the round outputs **composite**. In fact $67$ is a square root of $1$ modulo $561$ other than $\pm 1$ — which by [[#lem-sqrt-one]] is impossible modulo a prime — and $\gcd(67 - 1, 561) = 33$ even reveals a factor. The Fermat test with the same base sees only the final $1$ and is fooled.

```python
def miller_rabin_round(N, a):
    """One round: True means 'probably prime', False means 'composite'."""
    d, s = N - 1, 0
    while d % 2 == 0:
        d, s = d // 2, s + 1
    x = pow(a, d, N)
    if x in (1, N - 1):
        return True
    for _ in range(s - 1):
        x = x * x % N
        if x == N - 1:
            return True
    return False

print(pow(2, 560, 561), miller_rabin_round(561, 2))
```

```console
$ python3 mr.py
1 False
```
:::
:::

::: widget sieve
mode: count
n: 2000
caption: The prime-counting function $\pi(x)$ against $x/\ln x$ and the logarithmic integral $\operatorname{Li}(x)$. Primes thin out only logarithmically: near $x$ about one number in $\ln x$ is prime. That is why random search for 1024-bit primes, with about one prime in every $710$ integers (one in $355$ odd ones), needs only a few hundred primality tests.
:::

::: warning Generating keys is not a programming exercise
The algorithms in this chapter are simple enough to implement in a few lines, and that is exactly the danger. Real key generation needs a cryptographically secure random number generator (Python's `secrets` or `os.urandom`, never `random`), which produced the famous failure of 2008, when a Debian patch reduced OpenSSL's key-generation entropy to about 15 bits; constant-time arithmetic, so that timing does not leak secret exponents; the right number of primality rounds for adversarially chosen inputs; and checks that the standards prescribe for each key type. The toy code here, with Python's built-in `pow`, is fine for learning and for numbers you choose yourself. For real keys, use a vetted library such as OpenSSL, libsodium or Python's `cryptography` package.
:::

## Hard problems

Public-key cryptography rests on computational problems believed to be hard. As with PRGs, hardness is an assumption.

### Factoring

Multiplying two $n$-bit primes is easy; recovering them from the product appears to be hard. Formally, let $\mathsf{GenModulus}(1^n)$ output $(N, p, q)$ with $N = pq$ for uniform $n$-bit primes $p, q$.

::: definition The factoring assumption {#def-factoring}
**Factoring is hard** relative to $\mathsf{GenModulus}$ if for every PPT algorithm $\mathcal A$, $\Prob[\mathcal A(N) \in \{p, q\}] \le \mathsf{negl}(n)$, where $(N, p, q) \gets \mathsf{GenModulus}(1^n)$.
:::

Trial division takes about $\sqrt N = 2^n$ steps. The best known classical algorithm, the **general number field sieve**, runs in time $\exp\big((1.923 + o(1))(\ln N)^{1/3}(\ln\ln N)^{2/3}\big)$ — subexponential, which is why RSA moduli must be thousands of bits long rather than hundreds. The largest RSA challenge number factored publicly as of 2026 is RSA-250 (829 bits), in 2020. On a large quantum computer, Shor's algorithm (1994) factors in polynomial time ([[cryptography/post-quantum]]).

### Discrete logarithms

Let $G$ be a **cyclic** group of order $q$ with **generator** $g$, meaning $G = \set{g^0, g^1, \dots, g^{q-1}}$. Every $h \in G$ is $g^x$ for a unique $x \in \Z_q$, the **discrete logarithm** $\log_g h$. Computing $g^x$ is fast ([[#alg-modexp]]); computing $x$ from $g^x$ seems hard in suitable groups. For a prime $p$, the group $\Z_p^*$ is cyclic of order $p - 1$ ([Maths Atlas: primitive roots](/learn/maths/lesson.php?c=number-theory&l=primitive-roots)).

::: widget modular
n: 23
mode: powers
a: 5
caption: Powers of $5$ modulo the prime $23$. Since $5$ has order $22$ it generates all of $\Z_{23}^*$: its powers visit every non-zero residue in an order that looks scrambled. Computing $5^x$ is easy; finding $x$ from $5^x$ is the discrete-logarithm problem. Switch to $a = 4$: it has order $11$ and generates the subgroup of squares, a group of prime order.
:::

Let $\mathcal G(1^n)$ output a description of a cyclic group $G$, its order $q$ (with $\lVert q\rVert = n$) and a generator $g$.

::: definition Discrete-logarithm, CDH and DDH problems {#def-dlog}
Relative to $\mathcal G$, with $(G, q, g) \gets \mathcal G(1^n)$ and $x, y, z$ uniform in $\Z_q$:

- the **discrete-logarithm problem** is hard if no PPT algorithm given $(G, q, g, g^x)$ outputs $x$ with non-negligible probability;
- the **computational Diffie–Hellman (CDH) problem** is hard if no PPT algorithm given $(G, q, g, g^x, g^y)$ outputs $g^{xy}$ with non-negligible probability;
- the **decisional Diffie–Hellman (DDH) problem** is hard if for every PPT $D$,
$$
\Big\lvert\Prob[D(G, q, g, g^x, g^y, g^{xy}) = 1] - \Prob[D(G, q, g, g^x, g^y, g^z) = 1]\Big\rvert \le \mathsf{negl}(n).
$$
:::

DDH says that the Diffie–Hellman value $g^{xy}$ looks like a random group element even to someone who knows $g^x$ and $g^y$. The three assumptions are ordered.

::: proposition DDH ⇒ CDH ⇒ discrete logarithm {#prop-dh-order}
If DDH is hard relative to $\mathcal G$, then so is CDH; if CDH is hard, then so is the discrete-logarithm problem.
:::

::: proof
Contrapositively, an algorithm for the easier-looking problem solves the harder-looking one. If $\mathcal A$ computes discrete logarithms, then given $g^x, g^y$ compute $x = \mathcal A(g^x)$ and output $(g^y)^x = g^{xy}$: CDH is solved with the same success probability. If $\mathcal B$ solves CDH with probability $\varepsilon$, let $D(g^x, g^y, h)$ output $1$ iff $\mathcal B(g^x, g^y) = h$. On a real triple $D$ outputs $1$ with probability at least $\varepsilon$; on a random triple, $h = g^z$ is uniform and independent of $\mathcal B$'s output, so $D$ outputs $1$ with probability exactly $1/q$. The advantage is at least $\varepsilon - 1/q$, non-negligible if $\varepsilon$ is (since $1/q \le 2^{-(n-1)}$ is negligible).
:::

Which groups? Generic algorithms — baby-step giant-step ([Maths Atlas](/learn/maths/lesson.php?c=number-theory&l=primitive-roots)) and Pollard's rho — compute discrete logarithms in any group of order $q$ in about $\sqrt q$ operations, and Shoup (1997) proved that no "generic" algorithm, one that only multiplies group elements, can do better. Two refinements follow:

- If the order $q$ has small prime factors, the **Pohlig–Hellman** method computes the logarithm modulo each prime-power factor separately and combines the results with the CRT; the cost is governed by the *largest prime factor* of the order. So we use groups of **prime order** $q$.
- In $\Z_p^*$ itself, DDH is *easy*, because the order $p - 1$ is even and squares can be recognised ([[#ex-ddh-zp]]). The standard choice is the subgroup of squares modulo a **safe prime** $p = 2q + 1$ with $q$ prime, which is cyclic of prime order $q$; in $\Z_{23}^*$ ($23 = 2 \cdot 11 + 1$) it is the subgroup of order $11$ generated by $4$.

::: example A discrete logarithm in a group of prime order {#ex-bsgs}
In the subgroup of order $q = 11$ of $\Z_{23}^*$ generated by $g = 4$, find $x = \log_4 13$ by baby-step giant-step with $m = \lceil\sqrt{11}\,\rceil = 4$.
::: solution
The idea is to write $x = im + j$ with $0 \le i, j < m$, so that $13 \cdot (g^{-m})^i = g^j$. *Baby steps:* tabulate $g^j$ for $j = 0, \dots, 3$: $\{1 \mapsto 0,\ 4 \mapsto 1,\ 16 \mapsto 2,\ 18 \mapsto 3\}$. *Giant steps:* $g^{-4} = 4^{-4} \bmod 23 = 8$ (indeed $4^4 = 256 \equiv 3$ and $3 \cdot 8 = 24 \equiv 1$). Starting from $y = 13$ and multiplying by $8$ each time: $i = 0$: $y = 13$, not in the table; $i = 1$: $y = 13 \cdot 8 = 104 \equiv 12$, not in the table; $i = 2$: $y = 12 \cdot 8 = 96 \equiv 4$, in the table with $j = 1$. So $x = 2 \cdot 4 + 1 = 9$, and indeed $4^9 \equiv 13 \pmod{23}$ (the powers of $4$ are $1, 4, 16, 18, 3, 12, 2, 8, 9, 13, 6$). The method uses about $2\sqrt q$ group operations and $\sqrt q$ memory; for $q \approx 2^{256}$ that is $2^{128}$, the generic barrier.
:::
:::

In $\Z_p^*$ there are also non-generic **index-calculus** algorithms, including a number field sieve with the same subexponential running time as for factoring, so $p$ must again be thousands of bits. In elliptic-curve groups ([[cryptography/public-key]]) no algorithm better than the generic $\sqrt q$ is known for well-chosen curves, so a 256-bit curve offers about 128-bit security. The NIST guideline SP 800-57 Part 1 equates, as of 2026, 128-bit security with RSA or finite-field moduli of 3072 bits and elliptic-curve groups of 256 bits, and 112-bit security with 2048-bit moduli.

::: quiz
A designer proposes Diffie–Hellman in $\Z_p^*$ where $p - 1 = 2 \cdot 3 \cdot 5 \cdot 7 \cdots$ (a product of many small primes) times one 40-bit prime, with $p$ a 2048-bit prime. Roughly how hard is the discrete-logarithm problem in the whole group?

- [ ] Like a 2048-bit group: about $2^{112}$ operations.
- [ ] Like a 1024-bit group.
- [x] About $2^{20}$ operations: Pohlig–Hellman reduces it to the 40-bit prime factor.
- [ ] Impossible, because $p$ is prime.
::: solution
Pohlig–Hellman solves the logarithm modulo each prime factor of the group order and combines with the CRT. The small factors are trivial and the 40-bit factor needs about $\sqrt{2^{40}} = 2^{20}$ steps by baby-step giant-step. The size of $p$ protects only against index calculus; the order must have a large prime factor, and in practice one works in a subgroup of large prime order.
:::
:::

::: history
Euclid's algorithm appears in Book VII of the *Elements* (about 300 BC); the Chinese remainder theorem goes back to Sunzi's *Mathematical Classic* (3rd to 5th century AD). Pierre de Fermat stated his little theorem in a 1640 letter, and Leonhard Euler proved it and generalised it to the totient (1736, 1763). Gary Miller gave a deterministic test assuming the generalised Riemann hypothesis (1976), which Michael Rabin turned into the unconditional randomised test (1980); Robert Solovay and Volker Strassen published another randomised test in 1977. Agrawal, Kayal and Saxena showed in 2002 that primality is in $\mathsf P$. On the hard side, Carl Pomerance's quadratic sieve (1981) and the number field sieve of John Pollard, Hendrik Lenstra, Arjen Lenstra and Mark Manasse (around 1990) are the main factoring algorithms; Pohlig and Hellman published their reduction in 1978, and Daniel Shanks the baby-step giant-step method in 1971. Peter Shor's 1994 quantum algorithms for factoring and discrete logarithms are why the field is now moving to post-quantum schemes.
:::

## Where this leads

[[cryptography/public-key]] puts all of this to work: Diffie–Hellman key exchange and ElGamal encryption rest on CDH and DDH in prime-order groups, RSA on [[#cor-eth-root]] in $\Z_N^*$, and elliptic curves supply groups in which only generic attacks are known. [[cryptography/signatures]] adds Schnorr and RSA signatures, and [[cryptography/post-quantum]] explains why Shor's algorithm breaks every assumption in this chapter and which assumptions replace them. The complexity of factoring and discrete logarithms — neither known to be $\mathsf{NP}$-hard nor in $\mathsf P$ — is discussed in [[complexity]].

::: summary
- Modular arithmetic on $n$-bit numbers costs $O(n)$ (addition) and $O(n^2)$ (multiplication) bit operations; algorithms must be polynomial in $n$, not in $N$.
- **Extended Euclid** computes $\gcd(a, b) = as + bt$ and modular inverses in $O(\log a)$ iterations ([[#thm-egcd]]); **square-and-multiply** computes $a^e \bmod N$ with at most $2n$ multiplications ([[#alg-modexp]]).
- In a finite abelian group of order $m$, $g^m = 1$ and exponents work modulo $m$ ([[#thm-group-order]]): Euler and Fermat follow, and $x \mapsto x^e$ is a permutation with inverse $x^d$ when $ed \equiv 1 \pmod m$ ([[#cor-eth-root]]). The **CRT** splits $\Z_{pq}$ into $\Z_p \times \Z_q$, giving $\phi(pq) = (p-1)(q-1)$ ([[#thm-crt]]).
- **Miller–Rabin** never rejects a prime and catches a composite with probability at least $3/4$ per round ([[#thm-miller-rabin]]); it defeats Carmichael numbers, which fool the Fermat test.
- Hard problems: **factoring** ([[#def-factoring]]), **discrete logarithm**, **CDH** and **DDH** ([[#def-dlog]]), with DDH ⇒ CDH ⇒ DL ([[#prop-dh-order]]). Use groups of large prime order; DDH fails in $\Z_p^*$ itself.
- Generic discrete-log algorithms cost $\sqrt q$; factoring and finite-field logs have subexponential algorithms, so their parameters are much larger (3072 vs 256 bits for 128-bit security, as of 2026).
:::

## Exercises

::: exercise A modular inverse {level=1 check="23"}
Find the inverse of $7$ modulo $40$ with the extended Euclidean algorithm. (Enter the inverse in $\{0, \dots, 39\}$.)
::: solution
$40 = 5 \cdot 7 + 5$, $7 = 1 \cdot 5 + 2$, $5 = 2 \cdot 2 + 1$. Back-substituting: $1 = 5 - 2\cdot 2 = 5 - 2(7 - 5) = 3 \cdot 5 - 2 \cdot 7 = 3(40 - 5\cdot 7) - 2\cdot 7 = 3 \cdot 40 - 17 \cdot 7$. So $7^{-1} \equiv -17 \equiv 23 \pmod{40}$; check: $7 \cdot 23 = 161 = 4 \cdot 40 + 1$.
:::
:::

::: exercise Reducing exponents {level=1 check="9"}
Compute $3^{200} \bmod 13$ without a calculator. (Enter the residue.)
::: solution
By Fermat, $3^{12} \equiv 1 \pmod{13}$, and $200 = 16 \cdot 12 + 8$, so $3^{200} \equiv 3^8$. Now $3^2 = 9$, $3^4 = 81 \equiv 3$, $3^8 \equiv 9$. So $3^{200} \equiv 9 \pmod{13}$. (In fact $3$ has order $3$ modulo $13$, since $3^3 = 27 \equiv 1$, and $200 \equiv 2 \pmod 3$ gives $3^2 = 9$ directly.)
:::
:::

::: exercise The totient of an RSA modulus {level=1 check="3120"}
Compute $\phi(3233)$, given that $3233 = 61 \cdot 53$. (Enter the number.)
::: solution
By [[#thm-crt]], $\phi(61 \cdot 53) = 60 \cdot 52 = 3120$. Knowing $\phi(N)$ for $N = pq$ is equivalent to knowing the factors: $p + q = N - \phi(N) + 1 = 114$ and $pq = 3233$ make $p, q$ the roots of $x^2 - 114x + 3233$, namely $61$ and $53$.
:::
:::

::: exercise Solving with the CRT {level=1 check="23"}
Find the smallest non-negative $x$ with $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$ and $x \equiv 2 \pmod 7$. (Enter $x$.)
::: solution
Combine the last two: $x \equiv 2 \pmod 7$ gives $x = 2 + 7k$, and $2 + 7k \equiv 3 \pmod 5$ means $2k \equiv 1$, so $k \equiv 3$ and $x \equiv 23 \pmod{35}$. Then $23 \equiv 2 \pmod 3$ already, so $x = 23$, unique modulo $105$.
:::
:::

::: exercise Strong liars for 91 {level=2 check="18"}
How many bases $a \in \{1, \dots, 90\}$ are strong liars for $N = 91 = 7 \cdot 13$ (that is, a Miller–Rabin round with base $a$ outputs "probably prime")? Compare with the bound of [[#thm-miller-rabin]]. (Enter the count.)
::: solution
Here $90 = 2 \cdot 45$, so $s = 1$, $d = 45$, and $a$ is a strong liar iff $a^{45} \equiv \pm 1 \pmod{91}$. Counting with a short program (`sum(1 for a in range(1, 91) if pow(a, 45, 91) in (1, 90))`) gives $18$ — namely $1, 9, 10, 12, 16, 17, 22, 29, 38, 53, 62, 69, 74, 75, 79, 81, 82, 90$. Since $\phi(91) = 72$, this is exactly $\phi(91)/4$: the Monier–Rabin bound is attained. By contrast $36$ bases are Fermat liars ($a^{90} \equiv 1$).
:::
:::

::: exercise Half the bases are Fermat witnesses {#ex-fermat-half level=2}
Let $N$ be an odd composite and suppose some $w \in \Z_N^*$ satisfies $w^{N-1} \not\equiv 1 \pmod N$. Prove that at most half of the elements of $\Z_N^*$ are Fermat liars.
::: solution
The liars $L = \set{a \in \Z_N^* : a^{N-1} \equiv 1}$ form a subgroup: $1 \in L$, and if $a, b \in L$ then $(ab)^{N-1} = a^{N-1}b^{N-1} \equiv 1$ (finite, closed under multiplication, hence a subgroup). It is a proper subgroup since $w \notin L$. By Lagrange's theorem its order divides $\phi(N)$, so it is at most $\phi(N)/2$. Directly: the map $a \mapsto wa$ sends $L$ injectively into $\Z_N^* \setminus L$ (if $wa \in L$ for $a \in L$ then $w = (wa)a^{-1} \in L$), so $\abs{\Z_N^* \setminus L} \ge \abs L$. Carmichael numbers are exactly the composites with no such $w$, which is why the Fermat test needs Miller–Rabin's extra check.
:::
:::

::: exercise DDH is easy in the full group modulo a prime {#ex-ddh-zp level=2}
Let $p$ be an odd prime and $g$ a generator of $\Z_p^*$. Using Euler's criterion — $h$ is a square modulo $p$ iff $h^{(p-1)/2} \equiv 1$ — give a distinguisher for DDH in $\Z_p^*$ and compute its advantage.
::: solution
$g^x$ is a square iff $x$ is even (a generator is not a square, and $g^x = (g^{x/2})^2$ for even $x$). So from $g^x$ and $g^y$ we learn the parities of $x$ and $y$, and $g^{xy}$ is a square iff $xy$ is even, i.e. iff $x$ or $y$ is even. $D(g^x, g^y, h)$ outputs $1$ iff "$h$ is a square" agrees with "$g^x$ or $g^y$ is a square". On real triples it always outputs $1$. On random triples $h = g^z$ is a square with probability $1/2$ independently of $x, y$, so $D$ outputs $1$ with probability $1/2$. The advantage is $1/2$. (Checking all triples for $p = 23$, $g = 5$ confirms success rates $1.0$ and $0.5$.) In the subgroup of squares of prime order $q$ there is no such character to exploit.
:::
:::

::: exercise Implement Miller–Rabin and generate a prime {level=3}
Using `miller_rabin_round` from [[#ex-mr-561]] and `secrets.randbelow` for randomness, write `is_probable_prime(N, t=40)` and `random_prime(bits)`, which tries random odd `bits`-bit candidates (top bit set) until one passes. Generate a 256-bit prime, count the candidates tried, and compare with the prime number theorem. What does the program *not* do that a real key generator must?
::: solution
```python
import secrets

def is_probable_prime(N, t=40):
    if N < 4:
        return N in (2, 3)
    if N % 2 == 0:
        return False
    return all(miller_rabin_round(N, 2 + secrets.randbelow(N - 3)) for _ in range(t))

def random_prime(bits):
    tries = 0
    while True:
        tries += 1
        n = secrets.randbits(bits) | (1 << (bits - 1)) | 1   # top bit and odd
        if is_probable_prime(n):
            return n, tries

p, tries = random_prime(256)
print(p.bit_length(), tries)
```

Each run prints `256` and a number of tries that varies from run to run — a geometric random variable. By the prime number theorem an odd 256-bit number is prime with probability about $2/(256\ln 2) \approx 1/88.7$, so the expected number of candidates is about $89$. A real generator would also sieve candidates by small primes before the expensive test, run in constant time, follow the standard's rules (for RSA, FIPS 186-5 constrains how $p$ and $q$ relate), and be part of a reviewed library: use one.
:::
:::
