For most of history, two people who wanted to communicate secretly first had to meet, or trust a courier, to agree on a secret key. In 1976 Whitfield Diffie and Martin Hellman proposed something that sounded impossible: two strangers, talking entirely in public, can agree on a shared secret that an eavesdropper cannot work out. A year later Ron Rivest, Adi Shamir and Leonard Adleman found a way to let anyone encrypt a message that only one person can decrypt. Both inventions are pure elementary number theory, built from the results of the previous chapters: Euclid's algorithm, the Chinese remainder theorem, the theorems of Fermat and Euler, and primitive roots.

The key is an **asymmetry** between easy and hard problems. Computing $a^e \bmod n$ is easy, even for numbers with hundreds of digits; so is testing whether a large number is prime. But undoing these operations — finding the exponent from the power (the discrete logarithm problem), or finding the prime factors of a product of two large primes — appears to be infeasible. In this chapter we develop fast exponentiation, Diffie–Hellman key exchange, the RSA cryptosystem with a full proof of correctness, and the probabilistic primality tests that make it possible to find large primes. The toy examples use small numbers so that every step can be checked by hand; real systems use numbers with hundreds of digits.

## Fast modular exponentiation

Computing $7^{86} \bmod 101$ by multiplying $7$ by itself $85$ times would be slow, and for exponents with hundreds of digits impossible. The trick is to square repeatedly.

::: algorithm Square-and-multiply {#alg-square-multiply}
To compute $a^e \bmod n$ for $e \ge 1$, write $e$ in binary, $e = \sum_{i=0}^{k} b_i2^i$ with $b_k = 1$.

1. Compute $a_0 = a \bmod n$ and successively $a_{i} = a_{i-1}^2 \bmod n$ for $i = 1, \dots, k$, so that $a_i \equiv a^{2^i}$.
2. Multiply together, modulo $n$, the $a_i$ for which $b_i = 1$.
:::

::: proposition Cost of square-and-multiply {#prop-square-multiply}
[[#alg-square-multiply]] correctly computes $a^e \bmod n$ using at most $2\lfloor\log_2 e\rfloor$ multiplications modulo $n$, and every number it multiplies is less than $n$.
:::

::: proof
By induction, $a_i \equiv a^{2^i} \pmod n$, since $a_i \equiv a_{i-1}^2 \equiv (a^{2^{i-1}})^2 = a^{2^i}$. Hence the product in step 2 is $\prod_{b_i = 1}a^{2^i} = a^{\sum_i b_i2^i} = a^e$ modulo $n$. The binary expansion has $k + 1$ digits with $k = \lfloor \log_2 e\rfloor$, so step 1 uses $k$ squarings and step 2 at most $k$ multiplications (one fewer than the number of $1$-digits). All factors are reduced modulo $n$, so each product is less than $n^2$ before reduction.
:::

For a $2048$-bit exponent that is at most about $4000$ multiplications of $2048$-bit numbers — a few milliseconds on a laptop.

::: example A power modulo 101 {#ex-square-multiply}
Compute $7^{86} \bmod 101$.
::: solution
$86 = 64 + 16 + 4 + 2 = 1010110_2$. Repeated squaring modulo $101$:

| $i$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|---|
| $7^{2^i} \bmod 101$ | $7$ | $49$ | $78$ | $24$ | $71$ | $92$ | $81$ |

For instance $49^2 = 2401 = 23\cdot 101 + 78$ and $78^2 = 6084 = 60\cdot 101 + 24$. Then

$$
7^{86} = 7^{64}\cdot7^{16}\cdot7^4\cdot7^2 \equiv 81\cdot 71\cdot 78\cdot 49 \pmod{101}.
$$

Multiplying step by step: $81\cdot 71 = 5751 \equiv 95$, $95\cdot 78 = 7410 \equiv 37$, $37 \cdot 49 = 1813 \equiv 96$. So $7^{86} \equiv 96 \pmod{101}$, using $6$ squarings and $3$ multiplications instead of $85$ multiplications.
:::
:::

::: quiz
How many modular multiplications (squarings included) does left-to-right square-and-multiply need to compute $a^{1000}$?
- [x] $14$
- [ ] $20$
- [ ] $500$
- [ ] $999$
::: solution
$1000 = 1111101000_2$ has $10$ binary digits, six of them $1$. Processing the bits from the left, we square once for each of the $9$ bits after the leading one and multiply by $a$ for each of the $5$ further $1$-bits: $9 + 5 = 14$ multiplications.
:::
:::

## Diffie–Hellman key exchange

Let $p$ be a large prime and $g$ a primitive root modulo $p$ ([[number-theory/primitive-roots]]). Computing $A = g^a \bmod p$ from $a$ is fast; recovering $a$ from $A$ is the **discrete logarithm problem**, for which no efficient algorithm is known when $p$ is large and well chosen. A function that is easy to compute but hard to invert is called a **one-way function**.

::: algorithm Diffie–Hellman key exchange {#alg-diffie-hellman}
Alice and Bob publicly agree on a prime $p$ and a primitive root $g$.

1. Alice chooses a secret $a$ and sends $A = g^a \bmod p$.
2. Bob chooses a secret $b$ and sends $B = g^b \bmod p$.
3. Alice computes $K = B^a \bmod p$; Bob computes $K = A^b \bmod p$.
:::

They obtain the same key, since $B^a \equiv g^{ba} = g^{ab} \equiv A^b \pmod p$. An eavesdropper sees $p$, $g$, $A$ and $B$, and to find $K = g^{ab}$ apparently has to solve a discrete logarithm.

::: example A toy key exchange {#ex-diffie-hellman}
With $p = 101$ and $g = 2$ (a primitive root modulo $101$), Alice chooses $a = 37$ and Bob chooses $b = 61$. Find the messages sent and the shared key.
::: solution
By square-and-multiply, Alice sends $A = 2^{37} \bmod 101 = 55$ and Bob sends $B = 2^{61} \bmod 101 = 73$. Alice computes $K = 73^{37} \bmod 101 = 74$, and Bob computes $K = 55^{61} \bmod 101 = 74$. As a check, $K = 2^{37\cdot 61} = 2^{2257}$, and since $2^{100} \equiv 1$ (Fermat), $2^{2257} \equiv 2^{57} \equiv 74 \pmod{101}$. An eavesdropper who knows only $101$, $2$, $55$ and $73$ would here simply try all exponents, but for a $2048$-bit prime that is out of the question.
:::
:::

::: widget modular
n: 29
mode: powers
a: 2
caption: The powers of the primitive root $2$ modulo $29$ run through all $28$ non-zero residues in an apparently random order: $2, 4, 8, 16, 3, 6, 12, 24, 19, \dots$. Computing $2^a$ is easy; going backwards from a residue to its exponent requires, in effect, searching this list. For a prime with hundreds of digits the list is astronomically long, and that is the security of Diffie–Hellman.
:::

::: warning Key exchange is not authentication
Diffie–Hellman protects against an eavesdropper but not against an active attacker who intercepts the messages. In a **man-in-the-middle attack**, Mallory replaces $A$ and $B$ by her own values $g^{m}$, sharing one key with Alice and another with Bob and relaying (and reading) everything. Real protocols such as TLS therefore combine key exchange with digital signatures that prove who sent each message.
:::

## The RSA cryptosystem

Diffie–Hellman agrees on a key; RSA lets anyone **encrypt** with a public key that only the owner of the private key can reverse — a trapdoor one-way function.

::: algorithm RSA {#alg-rsa}
*Key generation.* Choose distinct large primes $p, q$; let $n = pq$ and $\varphi(n) = (p-1)(q-1)$. Choose $e$ with $\gcd(e, \varphi(n)) = 1$, and compute $d$ with $ed \equiv 1 \pmod{\varphi(n)}$ by the extended Euclidean algorithm. Publish the **public key** $(n, e)$; keep $d$ (and $p$, $q$, $\varphi(n)$) secret.

*Encryption.* A message is an integer $m$ with $0 \le m < n$; its ciphertext is $c = m^e \bmod n$.

*Decryption.* Compute $m = c^d \bmod n$.
:::

::: theorem RSA decrypts correctly {#thm-rsa}
With notation as above, $(m^e)^d \equiv m \pmod n$ for **every** integer $m$.
:::

::: proof
Write $ed = 1 + k\varphi(n) = 1 + k(p-1)(q-1)$ with $k \ge 0$. We show $m^{ed} \equiv m$ modulo $p$ and modulo $q$.

Modulo $p$: if $p \nmid m$, Fermat's little theorem ([[number-theory/fermat-euler#thm-fermat]]) gives $m^{p-1} \equiv 1$, so

$$
m^{ed} = m\cdot\bigl(m^{p-1}\bigr)^{k(q-1)} \equiv m \pmod p .
$$

If $p \mid m$, both $m^{ed}$ and $m$ are $\equiv 0 \pmod p$. So $m^{ed} \equiv m \pmod p$ in all cases, and by the same argument $m^{ed} \equiv m \pmod q$. Since $p$ and $q$ are distinct primes, $n = pq$ divides $m^{ed} - m$ (by the Chinese remainder theorem, [[number-theory/congruences#thm-crt]]). Hence $(m^e)^d = m^{ed} \equiv m \pmod n$.
:::

Note that the proof covers messages with $\gcd(m, n) \neq 1$, where Euler's theorem alone would not apply.

::: example A toy RSA key {#ex-rsa}
Take $p = 73$ and $q = 97$, and $e = 5$. Find the private exponent $d$, encrypt $m = 2026$, and check the decryption.
::: solution
$n = 73\cdot97 = 7081$ and $\varphi(n) = 72\cdot 96 = 6912$. Since $6912 = 2^8\cdot 3^3$, $\gcd(5, 6912) = 1$. Euclid: $6912 = 1382\cdot 5 + 2$ and $5 = 2\cdot 2 + 1$, so

$$
1 = 5 - 2\cdot 2 = 5 - 2(6912 - 1382\cdot 5) = 2765\cdot 5 - 2\cdot 6912,
$$

and $d = 2765$ (check: $5\cdot 2765 = 13825 = 2\cdot 6912 + 1$). The public key is $(7081, 5)$. Encrypting, $c = 2026^5 \bmod 7081 = 1424$, and decrypting, $1424^{2765} \bmod 7081 = 2026$, both by square-and-multiply.
:::
:::

::: widget euclid
a: 6912
b: 5
mode: extended
caption: Computing the RSA private exponent for [[#ex-rsa]]: the extended Euclidean algorithm on $\varphi(n) = 6912$ and $e = 5$ finds $1 = 6912\cdot(-2) + 5\cdot 2765$, so $d = 2765$. Key generation needs only Euclid's algorithm and two primes — but without knowing the factorisation $n = 73\cdot 97$, nobody can compute $\varphi(n)$ and hence $d$.
:::

::: remark Faster decryption with the Chinese remainder theorem
The owner of the private key knows $p$ and $q$, and can decrypt about four times faster by working modulo each prime separately ([[number-theory/congruences#ex-crt-split]]). By Fermat, exponents modulo $p$ can be reduced modulo $p - 1$: with $d_p = d \bmod (p-1)$ and $d_q = d \bmod (q-1)$, compute $m_p = c^{d_p} \bmod p$ and $m_q = c^{d_q} \bmod q$ and recombine. For the toy key, $d_p = 2765 \bmod 72 = 29$ and $d_q = 2765 \bmod 96 = 77$; then $m_p = 1424^{29} \bmod 73 = 55$ and $m_q = 1424^{77} \bmod 97 = 86$, and the unique residue modulo $7081$ that is $\equiv 55 \pmod{73}$ and $\equiv 86 \pmod{97}$ is $2026$, as it should be.
:::

**Signatures.** RSA also works in reverse. To sign a message $m$, the owner computes $s = m^d \bmod n$; anyone can verify the signature by checking $s^e \equiv m \pmod n$, by the same theorem with the roles of $e$ and $d$ exchanged. Only the holder of $d$ could have produced $s$. With the toy key, the signature of $m = 100$ is $s = 100^{2765} \bmod 7081 = 6159$, and anyone can check that $6159^5 \equiv 100 \pmod{7081}$. (In practice one signs a cryptographic hash of the message rather than the message itself.)

**Security.** Anyone who can factorise $n$ can compute $\varphi(n)$ and then $d$, so RSA is at most as hard to break as factoring. Conversely, knowing $\varphi(n)$ reveals the factors: $p + q = n - \varphi(n) + 1$ and $pq = n$, so $p$ and $q$ are the roots of a quadratic. For the toy key, $p + q = 7081 - 6912 + 1 = 170$, and $x^2 - 170x + 7081 = 0$ has roots $\frac{170 \pm \sqrt{28900 - 28324}}{2} = \frac{170 \pm 24}{2}$, that is $97$ and $73$. As of 2026 the largest RSA challenge number factorised is RSA-896 (a $270$-digit, $896$-bit number), split in September 2026 by the number field sieve running on a large fleet of GPUs; keys of $2048$ bits or more are used in practice.

::: warning Textbook RSA is not secure as it stands
The bare scheme above has weaknesses that real implementations must avoid. It is **deterministic**: the same message always gives the same ciphertext, so an attacker can test guesses. It is **malleable**: since $(m_1m_2)^e = m_1^em_2^e$, multiplying two ciphertexts gives the ciphertext of the product. If $m$ and $e$ are small, $m^e$ may be less than $n$, and then $m$ is just the ordinary $e$-th root of $c$. Very small private exponents $d$ can be recovered from $(n, e)$ by continued fractions (Wiener's attack). Practical RSA therefore pads messages with random data (as in the OAEP standard) and chooses parameters carefully.
:::

::: widget modular
n: 15
mode: powers
a: 3
caption: RSA in miniature: $n = 15 = 3\cdot 5$, $\varphi(n) = 8$ and $e = 3$, with $d = 3$ since $3\cdot 3 = 9 \equiv 1 \pmod 8$. In the column of cubes every residue $1, \dots, 14$ appears exactly once (and $0^3 = 0$) — the map $m \mapsto m^3 \bmod 15$ is a permutation, and cubing again undoes it ($m^9 \equiv m$). For an exponent sharing a factor with $\varphi(n)$, such as $e = 2$, the column has repeats and decryption is impossible.
:::

## Primality testing

RSA needs primes with hundreds of digits. They are plentiful: by the prime number theorem ([[number-theory/primes#thm-pnt]]) a random number near $2^{1024}$ is prime with probability about $1/\ln(2^{1024}) \approx 1/710$, so among random odd numbers of that size about one in $355$ is prime. The problem is to *recognise* them, since trial division is hopeless.

### The Fermat test and Carmichael numbers

By Fermat's little theorem, if $a^{n-1} \not\equiv 1 \pmod n$ for some $a$ with $\gcd(a, n) = 1$, then $n$ is composite; such an $a$ is a **Fermat witness**. If $a^{n-1} \equiv 1$ but $n$ is composite, $n$ is a **pseudoprime to base $a$** — for example $341$ to base $2$ ([[number-theory/fermat-euler]]). Pseudoprimes to a given base are rare, so the test works well for random numbers; but some composites fool every base.

::: definition Carmichael number {#def-carmichael}
A composite number $n$ is a **Carmichael number** if $a^{n-1} \equiv 1 \pmod n$ for every $a$ with $\gcd(a, n) = 1$.
:::

::: theorem Korselt's criterion {#thm-korselt}
A composite number $n$ is a Carmichael number if and only if $n$ is squarefree and $p - 1 \mid n - 1$ for every prime $p$ dividing $n$.
:::

::: proof
($\Leftarrow$) Let $\gcd(a, n) = 1$ and let $p \mid n$. Then $p \nmid a$, and since $p - 1 \mid n - 1$, Fermat gives $a^{n-1} = (a^{p-1})^{(n-1)/(p-1)} \equiv 1 \pmod p$. As $n$ is squarefree, it is the product of its distinct prime factors, which are pairwise coprime, so $a^{n-1} \equiv 1 \pmod n$.

($\Rightarrow$) Let $n$ be a Carmichael number. First, $n$ is odd: if $n$ were even, then $a = -1$ is coprime to $n$ and $(-1)^{n-1} = -1$ because $n - 1$ is odd, while $-1 \not\equiv 1 \pmod n$ since $n > 2$. Now let $p$ be a prime dividing $n$ — necessarily odd — and let $p^k$ be the exact power of $p$ dividing $n$. Let $g$ be a primitive root modulo $p^k$, which exists because $p$ is odd ([[number-theory/primitive-roots#thm-primitive-root-classification]]). By the Chinese remainder theorem choose $a$ with $a \equiv g \pmod{p^k}$ and $a \equiv 1 \pmod{n/p^k}$. Then $\gcd(a, n) = 1$, so $a^{n-1} \equiv 1 \pmod n$, and in particular $g^{n-1} \equiv 1 \pmod{p^k}$. Hence $\ord_{p^k}(g) = \varphi(p^k) = p^{k-1}(p-1)$ divides $n - 1$. If $k \ge 2$, then $p$ divides both $n - 1$ and $n$, which is impossible; so $k = 1$, $n$ is squarefree, and $p - 1 \mid n - 1$.
:::

For $561 = 3\cdot 11\cdot 17$, the numbers $2$, $10$ and $16$ all divide $560$, so $561$ is a Carmichael number — the smallest one. Others are $1105 = 5\cdot 13\cdot 17$ and $1729 = 7\cdot 13\cdot 19$. In 1994 Alford, Granville and Pomerance proved that there are infinitely many Carmichael numbers, so the Fermat test alone can never be fully reliable.

### The Miller–Rabin test

The flaw in the Fermat test is that it ignores square roots of $1$. Modulo a prime, $1$ has only the square roots $\pm 1$ ([[number-theory/fermat-euler#lem-square-roots-one]]); modulo a composite it may have more, and these betray the composite.

::: theorem Strong probable primes {#thm-miller-rabin}
Let $p$ be an odd prime and write $p - 1 = 2^sd$ with $d$ odd. If $p \nmid a$, then either

$$
a^d \equiv 1 \pmod p \qquad\text{or}\qquad a^{2^rd} \equiv -1 \pmod p \ \text{ for some } 0 \le r < s .
$$
:::

::: proof
Consider the sequence $a^d, a^{2d}, a^{4d}, \dots, a^{2^sd}$, in which each term is the square of the previous one. The last term is $a^{p-1} \equiv 1$ by Fermat's little theorem. If the first term is $\equiv 1$ we are done. Otherwise let $a^{2^{r+1}d}$ be the first term $\equiv 1$, with $0 \le r < s$. Then $x = a^{2^rd}$ satisfies $x^2 \equiv 1$ but $x \not\equiv 1$, so $x \equiv -1$ because $1$ has only the square roots $\pm1$ modulo a prime.
:::

::: algorithm Miller–Rabin test {#alg-miller-rabin}
Input: an odd $n > 3$. Write $n - 1 = 2^sd$ with $d$ odd. Choose a random base $a$ with $2 \le a \le n - 2$ and compute $x = a^d \bmod n$. If $x \equiv \pm 1$, report "probably prime". Otherwise square $x$ up to $s - 1$ times; if some square is $\equiv -1$, report "probably prime"; if not, report "composite". Repeat with several independent bases.
:::

By [[#thm-miller-rabin]] a prime is never reported composite. A base that makes a composite $n$ look prime is a **strong liar**; Michael Rabin and Louis Monier proved in 1980 that for odd composite $n$ at most a quarter of the bases are strong liars. So $k$ independent random bases wrongly pass a composite with probability at most $4^{-k}$ — with $k = 40$, less than $10^{-24}$.

::: example Miller–Rabin unmasks 561 {#ex-miller-rabin-561}
Apply the Miller–Rabin test to $n = 561$ with base $a = 2$.
::: solution
$560 = 2^4\cdot 35$, so $s = 4$, $d = 35$. By square-and-multiply, $2^{35} \equiv 263 \pmod{561}$. Squaring repeatedly:

$$
263 \;\to\; 263^2 \equiv 166 \;\to\; 166^2 \equiv 67 \;\to\; 67^2 \equiv 1 \pmod{561} .
$$

The sequence $263, 166, 67, 1$ reaches $1$ without passing through $-1 \equiv 560$, so $561$ is composite — although it passes the Fermat test for every base coprime to it. In fact $67$ is a square root of $1$ other than $\pm 1$, and $\gcd(67 - 1, 561) = 33$ is a proper factor of $561$ ([[#exr-7-9]]).
:::
:::

::: quiz
In RSA with public key $(n, e)$, which of the following must be kept secret? (Select all that apply.)
- [ ] $n$
- [ ] $e$
- [x] $d$
- [x] $\varphi(n)$
- [x] the primes $p$ and $q$
::: solution
$(n, e)$ is the public key. Each of $d$, $\varphi(n)$ and the factorisation $p, q$ allows decryption: from $p, q$ one computes $\varphi(n)$ and then $d$; and from $\varphi(n)$ one can recover $p, q$ by solving a quadratic.
:::
:::

Deterministic primality testing in polynomial time was achieved in 2002 by Manindra Agrawal, Neeraj Kayal and Nitin Saxena, whose AKS test is based on the fact that, for $a$ coprime to $n$, the polynomial congruence $(x + a)^n \equiv x^n + a \pmod n$ holds exactly when $n$ is prime. It was a theoretical breakthrough, but in practice the Miller–Rabin test (sometimes with special proofs of primality) remains the method of choice.

## Factoring, and the future

The security of RSA rests on the difficulty of factoring $n = pq$. The simplest methods are trial division (about $\sqrt n$ steps) and **Fermat's method**, which looks for $n = x^2 - y^2 = (x - y)(x + y)$ by trying $x = \lceil\sqrt n\,\rceil, \lceil\sqrt n\,\rceil + 1, \dots$ until $x^2 - n$ is a square. It is fast when $p$ and $q$ are close together: for the toy key $n = 7081$, the first try $x = 85$ gives $85^2 - 7081 = 144 = 12^2$, so $7081 = (85 - 12)(85 + 12) = 73\cdot 97$ at once. Real RSA primes must therefore not be too close. Modern factoring algorithms — Pollard's rho method, the quadratic sieve and the general number field sieve — are much faster than trial division, but still take time growing faster than any power of the number of digits.

::: application The quantum threat and post-quantum cryptography
In 1994 Peter Shor showed that a large quantum computer could factor integers and compute discrete logarithms in polynomial time, which would break RSA and Diffie–Hellman. No quantum computer of the required size exists yet, but in August 2024 the US National Institute of Standards and Technology published its first post-quantum cryptography standards, based on problems about lattices and hash functions that are believed to resist quantum attacks. Elementary number theory remains central to today's internet, and the transition to new systems is under way.
:::

::: history
Whitfield Diffie and Martin Hellman published "New Directions in Cryptography" in 1976, introducing public-key cryptography and their key-exchange protocol; Ralph Merkle had independently developed related ideas. Ron Rivest, Adi Shamir and Leonard Adleman invented RSA in 1977, and it was popularised by Martin Gardner's *Scientific American* column that year, which posed the challenge of factoring a $129$-digit number (it was factored in 1994). It later emerged that James Ellis, Clifford Cocks and Malcolm Williamson at the British intelligence agency GCHQ had discovered equivalent schemes in 1970–74, kept secret until 1997. Gary Miller proposed his primality test in 1976, assuming the generalised Riemann hypothesis, and Michael Rabin made it probabilistic and unconditional in 1980.
:::

## Where this leads

Elliptic-curve cryptography replaces the group $(\Z/p\Z)^\times$ by the group of points of an elliptic curve over a finite field ([[abstract-algebra/fields-galois]]), where discrete logarithms seem to be even harder, allowing much shorter keys. Quadratic residues ([[number-theory/quadratic-reciprocity]]) give the Rabin cryptosystem and the Solovay–Strassen test, and continued fractions, which also solve Pell's equation in [[number-theory/diophantine]], give Wiener's attack on RSA with small private exponents.

::: summary
- **Square-and-multiply** computes $a^e \bmod n$ with at most $2\log_2 e$ multiplications, using the binary expansion of $e$.
- **Diffie–Hellman**: publish $g^a$ and $g^b$ modulo $p$; both parties compute $g^{ab}$. Security rests on the discrete logarithm problem; authentication is needed against a man in the middle.
- **RSA**: $n = pq$, $ed \equiv 1 \pmod{\varphi(n)}$, encrypt $m \mapsto m^e$, decrypt $c \mapsto c^d$; correctness for all $m$ follows from Fermat and the Chinese remainder theorem ([[#thm-rsa]]).
- Knowing $\varphi(n)$, $d$ or the factors breaks RSA; textbook RSA needs padding to be secure, and $p, q$ must not be close (Fermat factorisation).
- **Fermat test**: $a^{n-1} \not\equiv 1$ proves compositeness, but Carmichael numbers ($561$, $1105$, …) fool every base; **Korselt**: $n$ is Carmichael iff squarefree with $p - 1 \mid n - 1$ for all $p \mid n$.
- **Miller–Rabin**: primes satisfy $a^d \equiv 1$ or $a^{2^rd} \equiv -1$; a composite passes a random base with probability at most $1/4$.
- Shor's quantum algorithm would break RSA and Diffie–Hellman, motivating post-quantum standards.
:::

## Exercises

::: exercise Counting multiplications {level=1 check="8"}
How many modular multiplications (squarings included) does left-to-right square-and-multiply use to compute $a^{100}$?
::: solution
$100 = 1100100_2$ has $7$ digits, three of them $1$. There are $6$ squarings (one for each digit after the first) and $2$ multiplications by $a$ (for the two $1$-bits after the first), $8$ in all.
:::
:::

::: exercise A small key exchange {level=1 check="15"}
Alice and Bob use $p = 29$ and the primitive root $g = 2$. Alice's secret is $a = 5$ and Bob's is $b = 11$. What is their shared key?
::: solution
Alice sends $A = 2^5 = 32 \equiv 3$; Bob sends $B = 2^{11} = 2048 = 70\cdot 29 + 18 \equiv 18$. The key is $K = B^a = 18^5 \bmod 29$. Since $18^2 = 324 \equiv 5$ and $18^4 \equiv 25$, $18^5 \equiv 25\cdot 18 = 450 = 15\cdot 29 + 15 \equiv 15$. Bob gets the same: $3^{11} \equiv 15 \pmod{29}$. So $K = 15$.
:::
:::

::: exercise A decryption exponent {level=1 check="27"}
For RSA with $p = 5$, $q = 11$ and $e = 3$, find $d$.
::: solution
$\varphi(55) = 4\cdot 10 = 40$ and we need $3d \equiv 1 \pmod{40}$: $3\cdot 27 = 81 = 2\cdot 40 + 1$, so $d = 27$.
:::
:::

::: exercise Encrypting with a small key {level=2 check="13"}
Using the key of the previous exercise ($n = 55$, $e = 3$, $d = 27$), encrypt $m = 7$, and verify that decryption recovers $7$.
::: solution
$c = 7^3 = 343 = 6\cdot 55 + 13$, so $c = 13$. To decrypt, compute $13^{27} \bmod 55$. Modulo $5$: $13 \equiv 3$, $3^4 \equiv 1$, so $3^{27} \equiv 3^3 = 27 \equiv 2$. Modulo $11$: $13 \equiv 2$, $2^{10} \equiv 1$, so $2^{27} \equiv 2^7 = 128 \equiv 7$. The residue that is $\equiv 2 \pmod 5$ and $\equiv 7 \pmod{11}$ is $7$. So decryption gives $m = 7$.
:::
:::

::: exercise Another Carmichael number {level=2}
Use Korselt's criterion to show that $1105$ is a Carmichael number.
::: solution
$1105 = 5\cdot 13\cdot 17$ is squarefree and $1104 = 2^4\cdot 3\cdot 23$. The numbers $p - 1 = 4, 12, 16$ all divide $1104$ ($1104 = 4\cdot 276 = 12\cdot 92 = 16\cdot 69$). By [[#thm-korselt]], $1105$ is a Carmichael number.
:::
:::

::: exercise Fermat factorisation {level=2 check="47"}
Factor $2491$ by Fermat's method and enter the smaller factor.
::: solution
$\sqrt{2491} \approx 49.9$, so start with $x = 50$: $50^2 - 2491 = 9 = 3^2$. Hence $2491 = 50^2 - 3^2 = (50 - 3)(50 + 3) = 47\cdot 53$.
:::
:::

::: exercise φ(n) reveals the factors {level=2}
An RSA modulus is $n = 3127$, and you learn that $\varphi(n) = 3016$. Factor $n$.
::: solution
$p + q = n - \varphi(n) + 1 = 3127 - 3016 + 1 = 112$ and $pq = 3127$, so $p, q$ are the roots of $x^2 - 112x + 3127 = 0$: $x = \frac{112 \pm\sqrt{12544 - 12508}}{2} = \frac{112\pm 6}{2}$, i.e. $59$ and $53$. Check: $53\cdot 59 = 3127$.
:::
:::

::: exercise Carmichael numbers have at least three prime factors {level=3}
Prove that every Carmichael number is odd and has at least three prime factors.
::: solution
Oddness was shown in the proof of [[#thm-korselt]] (take $a = -1$). By Korselt, $n$ is squarefree. Suppose $n = pq$ with primes $p < q$. Then $q - 1 \mid n - 1 = pq - 1 = p(q - 1) + (p - 1)$, so $q - 1 \mid p - 1$. But $0 < p - 1 < q - 1$, a contradiction. A prime is not composite, so $n$ has at least three prime factors.
:::
:::

::: exercise Square roots of 1 give factors {level=3}
Suppose $x^2 \equiv 1 \pmod n$ but $x \not\equiv \pm 1 \pmod n$. Prove that $\gcd(x - 1, n)$ is a proper divisor of $n$ greater than $1$. Apply this to [[#ex-miller-rabin-561]].
::: solution
$n \mid x^2 - 1 = (x - 1)(x + 1)$, but $n \nmid x - 1$ and $n \nmid x + 1$. If $\gcd(x - 1, n) = 1$, then $n \mid x + 1$ by [[number-theory/divisibility#thm-coprime-divides]], a contradiction; so the gcd exceeds $1$. If $\gcd(x - 1, n) = n$, then $n \mid x - 1$, again a contradiction. So $1 < \gcd(x-1, n) < n$. For $n = 561$ and $x = 67$: $\gcd(66, 561) = 33$, giving $561 = 33\cdot 17$. (This is why a failed Miller–Rabin test often yields a factor for free.)
:::
:::

::: exercise Why e must be coprime to φ(n) {level=3}
Let $n = pq$ with distinct odd primes $p, q$. Show that if $\gcd(e, \varphi(n)) > 1$, then $m \mapsto m^e \bmod n$ is not injective, so RSA decryption is impossible.
::: hint
If a prime $r$ divides $e$ and $p - 1$, find $x \not\equiv 1 \pmod p$ with $x^r \equiv 1 \pmod p$.
:::
::: solution
Let $r$ be a prime dividing $\gcd(e, (p-1)(q-1))$; say $r \mid p - 1$ (otherwise swap $p$ and $q$). Let $g$ be a primitive root modulo $p$ and $x = g^{(p-1)/r}$, which has order $r$, so $x \not\equiv 1$ but $x^r \equiv 1 \pmod p$, hence $x^e \equiv 1 \pmod p$. By the Chinese remainder theorem choose $m$ with $m \equiv x \pmod p$ and $m \equiv 1 \pmod q$. Then $m \not\equiv 1 \pmod n$, but $m^e \equiv 1$ modulo both $p$ and $q$, so $m^e \equiv 1 = 1^e \pmod n$. Two different messages, $m$ and $1$, have the same ciphertext.
:::
:::
