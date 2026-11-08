Every Ethernet frame ends with $32$ check bits. The receiver divides the whole frame, read as a long binary polynomial, by a fixed polynomial of degree $32$; if the remainder is not the expected value, the frame is discarded. The division is done by a handful of flip-flops and XOR gates at the line rate, and it catches every burst of errors up to $32$ bits long. A scratched CD plays without a click, a QR code with a coffee stain still scans, and the pictures from deep-space probes survive bursts of decoder errors — all thanks to **Reed–Solomon codes**, which correct whole bytes at a time using arithmetic in a field of $256$ elements.

These are **cyclic codes**, linear block codes with one more property: a cyclic shift of a codeword is a codeword. That property lets us describe a code by a single **generator polynomial** and implement its encoder, and its error-detecting checker, as a shift register. This lesson develops the polynomial description, systematic encoding by polynomial division, and the **cyclic redundancy checks** (CRCs) used for error detection; then builds the **finite fields** $\mathrm{GF}(2^m)$ needed for multiple-error correction, and uses them to construct **BCH codes** and **Reed–Solomon codes**, with an outline of their algebraic decoders. It builds on generator and parity-check matrices, syndromes and the Singleton bound from [[information-theory/linear-block-codes]], and on the shift registers of [[digital-logic/registers-counters]].

## Codes as polynomials {#sec-polynomials}

Identify the vector $\mathbf c = (c_0, c_1, \dots, c_{n-1})$ with the polynomial

$$
c(x) = c_0 + c_1x + c_2x^2 + \dots + c_{n-1}x^{n-1}
$$

with coefficients in $\mathbb F_2$ (so $1 + 1 = 0$ and $-1 = 1$). Adding vectors is adding polynomials. Multiplying by $x$ shifts every coefficient up one place; if we also reduce modulo $x^n - 1$, so that $x^n = 1$, the coefficient $c_{n-1}$ wraps round to the constant term:

$$
x\,c(x) \bmod (x^n - 1) = c_{n-1} + c_0x + c_1x^2 + \dots + c_{n-2}x^{n-1} .
$$ {#eq-shift}

That is the **cyclic shift** of $\mathbf c$ by one place.

::: definition Cyclic code {#def-cyclic}
A linear $(n, k)$ code is **cyclic** if every cyclic shift of a codeword is a codeword. In polynomial language: whenever $c(x)$ is a codeword, so is $x\,c(x) \bmod (x^n - 1)$, and hence, by linearity, so is $a(x)c(x) \bmod (x^n - 1)$ for every polynomial $a(x)$.
:::

::: theorem The generator polynomial {#thm-generator}
In a non-zero cyclic $(n, k)$ code there is a unique monic codeword polynomial $g(x)$ of least degree, the **generator polynomial**. Then:
1. $\deg g = n - k$;
2. a polynomial $c(x)$ of degree less than $n$ is a codeword if and only if it is a multiple of $g(x)$: $c(x) = u(x)g(x)$ with $\deg u < k$;
3. $g(x)$ divides $x^n - 1$.

Conversely, every divisor of $x^n - 1$ of degree $n - k$ generates a cyclic $(n, k)$ code.
:::

::: proof
Uniqueness: if two monic codewords of least degree $r$ existed, their difference would be a non-zero codeword of degree less than $r$. (2) Every multiple $u(x)g(x)$ with $\deg u < n - r$ has degree below $n$ and is a sum of shifts of $g$, hence a codeword. Conversely, divide a codeword $c(x)$ by $g(x)$: $c(x) = q(x)g(x) + s(x)$ with $\deg s < r$. Then $s = c - qg$ is a codeword of degree less than $r$, so $s = 0$. (1) The codewords are therefore exactly the products $u(x)g(x)$ with $\deg u \le n - 1 - r$, which form a space of dimension $n - r$; so $k = n - r$. (3) Divide $x^n - 1$ by $g$: $x^n - 1 = q(x)g(x) + s(x)$. Modulo $x^n - 1$, $s(x) \equiv -q(x)g(x)$ is a codeword (a multiple of $g$ reduced mod $x^n - 1$), of degree less than $r$, so $s = 0$. For the converse, the multiples of $g$ of degree less than $n$ form a linear code of dimension $n - \deg g$, and if $g \mid x^n - 1$ the reduction modulo $x^n - 1$ of a multiple of $g$ is still a multiple of $g$, so the code is cyclic.
:::

Finding cyclic codes of length $n$ is therefore the same as factoring $x^n - 1$. Over $\mathbb F_2$,

$$
x^7 - 1 = x^7 + 1 = (x + 1)(x^3 + x + 1)(x^3 + x^2 + 1) ,
$$ {#eq-x7}

so there are cyclic codes of length $7$ with $g$ of degree $1$ (the even-weight code), $3$ (two $(7, 4)$ codes), $4$ (two $(7, 3)$ codes) and $6$ (the repetition code). The **parity-check polynomial** is $h(x) = (x^n - 1)/g(x)$, of degree $k$; every codeword satisfies $c(x)h(x) \equiv 0 \pmod{x^n - 1}$.

### Systematic encoding by division

Multiplying $u(x)$ by $g(x)$ gives a valid but non-systematic encoder. To place the message in the high-order positions, shift it up by $n - k$ places and subtract the remainder:

$$
c(x) = x^{n-k}u(x) - \rho(x), \qquad \rho(x) = x^{n-k}u(x) \bmod g(x) .
$$ {#eq-systematic-cyclic}

Then $c(x)$ is divisible by $g$ (we removed the remainder), its coefficients $c_{n-k}, \dots, c_{n-1}$ are the message, and $c_0, \dots, c_{n-k-1}$ are the parity bits $-\rho$ ($= \rho$ in binary).

::: example A cyclic Hamming code {#ex-cyclic-hamming}
Encode the message $(u_0, u_1, u_2, u_3) = (1, 0, 1, 1)$ systematically with the $(7, 4)$ cyclic code generated by $g(x) = 1 + x + x^3$, and check its minimum distance.
::: solution
$u(x) = 1 + x^2 + x^3$, so $x^3u(x) = x^3 + x^5 + x^6$. To reduce modulo $g$, use $x^3 \equiv x + 1$ (since $g(x) = 0$ means $x^3 = -x - 1 = x + 1$):

$$
x^3 \equiv x + 1,\qquad x^5 = x^2\cdot x^3 \equiv x^3 + x^2 \equiv x^2 + x + 1,\qquad x^6 = (x^3)^2 \equiv x^2 + 1 .
$$

Adding: $\rho(x) = (x + 1) + (x^2 + x + 1) + (x^2 + 1) = 1$. Hence $c(x) = 1 + x^3 + x^5 + x^6$, the vector $(1, 0, 0, 1, 0, 1, 1)$: parity bits $100$ followed by the message $1011$.

The $16$ codewords $u(x)g(x)$ have weights $0$ (once), $3$ (seven times), $4$ (seven times) and $7$ (once), so $d_{\min} = 3$. Indeed the parity-check matrix has as columns $x^j \bmod g$ for $j = 0, \dots, 6$ — the seven non-zero vectors of length $3$, each once — so this *is* a Hamming code, with its columns in a different order from [[information-theory/linear-block-codes#ex-hamming74]].
:::
:::

The remainder is computed by a **linear feedback shift register** (LFSR) with $n - k$ stages and an XOR gate wherever $g$ has a non-zero coefficient. The message bits are clocked in, highest power first; each step multiplies the register contents by $x$ and, if the bit shifted out is a $1$, subtracts $g$ — exactly the long-division algorithm, one bit per clock. After the last message bit the register holds $\rho(x)$, which is shifted out after the message. The same circuit, fed with the received word, computes the **syndrome** $s(x) = r(x) \bmod g(x)$, which is zero exactly when $r(x)$ is a codeword. In binary the circuit has $n - k$ flip-flops and at most $n - k$ XOR gates, whatever the block length — that economy is why cyclic codes took over error detection.

## Cyclic redundancy checks {#sec-crc}

A **cyclic redundancy check** is a cyclic (or shortened cyclic) code used only for error detection: the transmitter appends the $r = n - k$ remainder bits, and the receiver recomputes the remainder and rejects the block if it is wrong. Messages need not have the natural length of the code — any $k$ up to $n - r$ can be used, since shortening a cyclic code (fixing leading message bits at zero) does not change its divisibility test.

::: example Computing a CRC by long division {#ex-crc}
Compute the $4$-bit CRC of the message $11010110$ (first bit = highest power) with generator $g(x) = x^4 + x + 1$ (binary $10011$).
::: solution
Append four zeros (multiply by $x^4$) and divide by $10011$, subtracting (XOR-ing) whenever the leading bit is $1$:

```text
1101 0110 0000
1001 1                  XOR g, aligned with the leading 1
---------------
0100 1110 0000
 100 11                 XOR g
---------------
0000 0010 0000
        10 011          XOR g
---------------
0000 0000 0110          remainder
```

The remainder is $0110$, and the transmitted frame is $11010110\,0110$. The receiver divides the whole $12$-bit frame by $10011$; with no errors the remainder is $0$. A single error in, say, the third bit adds $x^9$, and $x^9 \bmod g = x^3 + x$ (binary $1010$) — not zero, so the error is detected.
:::
:::

::: theorem Error-detecting power of a CRC {#thm-crc}
Let a CRC have generator $g(x)$ of degree $r$ with non-zero constant term ($g(0) = 1$). An error pattern $e(x)$ is undetected if and only if $g(x)$ divides $e(x)$. Consequently the CRC detects:
1. every single-bit error, if $g$ has at least two terms;
2. every error pattern of odd weight, if $(x + 1)$ divides $g(x)$;
3. every **burst** of length at most $r$ (a burst of length $b$ is an error pattern whose first and last errors are $b - 1$ places apart);
4. a fraction $1 - 2^{-(r-1)}$ of bursts of length $r + 1$ and $1 - 2^{-r}$ of longer bursts (assuming all burst patterns equally likely).
:::

::: proof
The received polynomial is $c(x) + e(x)$ and $g \mid c$, so the remainder is $e(x) \bmod g$, zero exactly when $g \mid e$. (1) $e(x) = x^i$; since $g$ has a non-zero constant term and another term, it is not a power of $x$ and cannot divide $x^i$. (2) If $(x + 1) \mid g$ and $g \mid e$, then $e(1) = 0$; but $e(1)$ is the weight of $e$ modulo $2$, so the weight is even. (3) A burst of length $b$ starting at position $i$ is $e(x) = x^iB(x)$ with $\deg B = b - 1$ and $B(0) = 1$. Since $g(0) = 1$, $g$ shares no factor with $x^i$, so $g \mid e$ would require $g \mid B$, impossible when $\deg B = b - 1 < r = \deg g$. (4) For $b = r + 1$, $g \mid B$ requires $B = g$ exactly (both have degree $r$ and constant term $1$): one burst pattern out of the $2^{r-1}$ possible middle-bit patterns. For $b > r + 1$, $B = q(x)g(x)$ with $q$ of degree $b - 1 - r$ and $q(0) = 1$: $2^{b-2-r}$ patterns out of $2^{b-2}$, a fraction $2^{-r}$.
:::

A good CRC generator is the product of $(x + 1)$ and a **primitive** polynomial $p(x)$ of degree $r - 1$ (defined below); then $g$ also detects all double errors $x^i + x^j = x^i(1 + x^{j-i})$ in blocks shorter than $2^{r-1} - 1$, because the smallest $m$ with $p \mid x^m + 1$ is $2^{r-1} - 1$. Standard generators include CRC-16-CCITT, $x^{16} + x^{12} + x^5 + 1$ (HDLC, Bluetooth, X.25), and the Ethernet CRC-32, $x^{32} + x^{26} + x^{23} + x^{22} + x^{16} + x^{12} + x^{11} + x^{10} + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1$.

::: warning Bit order, initial values and final XOR
Real CRC standards add conventions that the algebra does not fix: whether each byte is fed least or most significant bit first, whether the register starts at all zeros or all ones (so that leading zero bytes are not invisible), and whether the result is complemented before transmission. Ethernet's CRC-32 starts at all ones, processes bits least significant first and complements the result — two implementations that agree on the polynomial but differ in any of these details will reject each other's frames. And a CRC is not a cryptographic checksum: anyone can modify a message and recompute its CRC, because the check is linear.
:::

::: quiz
A link uses a CRC with $r = 16$ check bits and $(x + 1) \mid g(x)$. A burst of noise corrupts $20$ consecutive bits at random. What is the probability that the error goes undetected?
- [x] About $2^{-16} \approx 1.5\times10^{-5}$
- [ ] Zero, since the CRC detects all bursts
- [ ] About $2^{-20}$
- [ ] About $\tfrac12$, since half of all patterns have even weight
::: solution
A burst of length $20 > r + 1 = 17$ is undetected with probability $2^{-r} = 2^{-16}$ by [[#thm-crc]], part 4. Bursts of length up to $16$ are always detected. Because $(x + 1) \mid g$, every undetected pattern has even weight; so the miss rate among the even-weight bursts is $2^{-15}$, and among all bursts $2^{-16}$.
:::
:::

## Finite fields {#sec-fields}

To correct more than one error, codes need arithmetic on symbols richer than single bits. The right setting is a **finite field**, in which we can add, subtract, multiply and divide by non-zero elements with the usual rules (see [Fields and Galois theory](/learn/maths/lesson.php?c=abstract-algebra&l=fields-galois) in Maths Atlas).

The integers modulo a prime $p$ form the field $\mathrm{GF}(p)$: in $\mathrm{GF}(7)$, $3\times5 = 15 = 1$, so $3^{-1} = 5$. For $p = 2$ this is $\mathbb F_2$. For codes that work on bytes we need $\mathrm{GF}(2^8)$, which is *not* the integers modulo $256$ (in which $2$ has no inverse). It is built from polynomials.

::: theorem Construction of $\mathrm{GF}(2^m)$ {#thm-gf}
Let $p(x)$ be an irreducible binary polynomial of degree $m$. The binary polynomials of degree less than $m$, with addition of coefficients modulo $2$ and multiplication modulo $p(x)$, form a field with $2^m$ elements, $\mathrm{GF}(2^m)$. The non-zero elements form a cyclic group under multiplication: there is a **primitive element** $\alpha$ whose powers $\alpha^0, \alpha^1, \dots, \alpha^{2^m - 2}$ are all the non-zero elements, and $\alpha^{2^m - 1} = 1$. If $p(x)$ is a **primitive polynomial**, the element $\alpha = x$ is primitive.
:::

::: proof
Closure under addition and multiplication and the ring axioms are inherited from polynomial arithmetic. For inverses: if $a(x) \ne 0$ has degree less than $m$, then since $p$ is irreducible, $\gcd(a, p) = 1$, and the extended Euclidean algorithm gives $s(x)a(x) + t(x)p(x) = 1$, so $s(x) \bmod p$ is the inverse of $a$. The cyclic structure of the multiplicative group of any finite field is a theorem of algebra (the group is abelian, and an abelian group in which $x^d = 1$ has at most $d$ solutions for every $d$ is cyclic); see the Maths Atlas chapter cited above. A primitive polynomial is, by definition, an irreducible polynomial for which $x$ has order $2^m - 1$.
:::

With $p(x) = x^3 + x + 1$ (primitive) and $\alpha^3 = \alpha + 1$, the field $\mathrm{GF}(8)$ is:

| power | polynomial | bits $(\alpha^2\alpha^1\alpha^0)$ |
|---|---|---|
| $0$ | $0$ | $000$ |
| $\alpha^0$ | $1$ | $001$ |
| $\alpha^1$ | $\alpha$ | $010$ |
| $\alpha^2$ | $\alpha^2$ | $100$ |
| $\alpha^3$ | $\alpha + 1$ | $011$ |
| $\alpha^4$ | $\alpha^2 + \alpha$ | $110$ |
| $\alpha^5$ | $\alpha^2 + \alpha + 1$ | $111$ |
| $\alpha^6$ | $\alpha^2 + 1$ | $101$ |

Addition is XOR of the bit patterns; multiplication adds exponents modulo $7$: $\alpha^5\cdot\alpha^4 = \alpha^9 = \alpha^2$. Hardware uses exactly these two representations — XOR for sums, and logarithm tables or small multiplier circuits for products.

::: widget modular
n: 7
mode: powers
caption: Powers modulo $7$, the multiplicative structure of the prime field $\mathrm{GF}(7)$. Find an element whose powers run through all six non-zero residues before returning to $1$: that is a primitive element ($3$ and $5$ are). Its powers serve as the "positions" of a Reed–Solomon code of length $6$ in [[#ex-rs-gf7]]. Elements such as $2$ (order $3$) generate only a subgroup. Try $n = 11$ or $n = 13$: every prime field has primitive elements.
:::

The binary polynomial $p(x)$ has $\alpha$ as a root in $\mathrm{GF}(2^m)$ even though it has no root in $\mathbb F_2$, just as $x^2 + 1$ has the root $j$ in $\C$ but none in $\R$. Each element $\beta$ of $\mathrm{GF}(2^m)$ has a **minimal polynomial** $m_\beta(x)$: the binary polynomial of least degree with $\beta$ as a root. Its roots are $\beta, \beta^2, \beta^4, \dots$ (squaring is a field automorphism in characteristic $2$, because $(a + b)^2 = a^2 + b^2$). In $\mathrm{GF}(16)$ with $\alpha^4 = \alpha + 1$, for example, $m_\alpha(x) = x^4 + x + 1$ (roots $\alpha, \alpha^2, \alpha^4, \alpha^8$) and $m_{\alpha^3}(x) = x^4 + x^3 + x^2 + x + 1$ (roots $\alpha^3, \alpha^6, \alpha^{12}, \alpha^{24} = \alpha^9$).

## BCH codes {#sec-bch}

The roots of the generator polynomial in an extension field control the minimum distance. That observation, made independently by Hocquenghem and by Bose and Ray-Chaudhuri, gives a family of codes correcting any designed number of errors.

::: definition Binary BCH code {#def-bch}
Let $\alpha$ be a primitive element of $\mathrm{GF}(2^m)$ and $n = 2^m - 1$. The **binary BCH code** of designed distance $2t + 1$ is the cyclic code of length $n$ whose generator is the least common multiple of the minimal polynomials of $\alpha, \alpha^2, \dots, \alpha^{2t}$:

$$
g(x) = \operatorname{lcm}\big(m_\alpha(x), m_{\alpha^2}(x), \dots, m_{\alpha^{2t}}(x)\big) .
$$ {#eq-bch}

A binary polynomial $c(x)$ is a codeword if and only if $c(\alpha^j) = 0$ for $j = 1, \dots, 2t$.
:::

Because $\alpha^{2j}$ is a conjugate of $\alpha^j$, the even powers come free: $g = \operatorname{lcm}(m_\alpha, m_{\alpha^3}, \dots, m_{\alpha^{2t-1}})$, of degree at most $mt$. So $n - k \le mt$: about $m = \log_2(n + 1)$ parity bits per corrected error, generalising the Hamming code ($t = 1$, $g = m_\alpha$).

::: theorem BCH bound {#thm-bch-bound}
If a cyclic code over any field has $\alpha^{b}, \alpha^{b+1}, \dots, \alpha^{b+\delta-2}$ among the roots of its generator, for an element $\alpha$ of order $n$, then $d_{\min} \ge \delta$. In particular the BCH code [[#eq-bch]] has $d_{\min} \ge 2t + 1$ and corrects $t$ errors.
:::

::: proof
Suppose a non-zero codeword had weight $w \le \delta - 1$, with non-zero coefficients $c_{i_1}, \dots, c_{i_w}$. Write $X_l = \alpha^{i_l}$; these are distinct and non-zero because $\alpha$ has order $n$ and the positions are distinct. The conditions $c(\alpha^{b+j}) = 0$ for $j = 0, \dots, w - 1$ read

$$
\begin{bmatrix} X_1^b & X_2^b & \cdots & X_w^b\\ X_1^{b+1} & X_2^{b+1} & \cdots & X_w^{b+1}\\ \vdots & & & \vdots\\ X_1^{b+w-1} & X_2^{b+w-1} & \cdots & X_w^{b+w-1}\end{bmatrix}\begin{bmatrix}c_{i_1}\\ \vdots\\ c_{i_w}\end{bmatrix} = \mathbf 0 .
$$

Factoring $X_l^b$ out of column $l$ leaves a Vandermonde matrix with rows $X_l^0, X_l^1, \dots, X_l^{w-1}$, whose determinant $\prod_{l<l'}(X_{l'} - X_l)$ is non-zero. The matrix is therefore invertible and all $c_{i_l} = 0$, a contradiction. Hence every non-zero codeword has weight at least $\delta$.
:::

::: example The $(15, 7)$ double-error-correcting BCH code {#ex-bch15}
Construct the binary BCH code of length $15$ with $t = 2$, using $\mathrm{GF}(16)$ with $\alpha^4 = \alpha + 1$.
::: solution
We need $\alpha, \alpha^2, \alpha^3, \alpha^4$ as roots. $\alpha, \alpha^2, \alpha^4$ are roots of $m_\alpha(x) = x^4 + x + 1$, and $\alpha^3$ is a root of $m_{\alpha^3}(x) = x^4 + x^3 + x^2 + x + 1$. Hence

$$
g(x) = (x^4 + x + 1)(x^4 + x^3 + x^2 + x + 1) = x^8 + x^7 + x^6 + x^4 + 1 .
$$

(Multiplying out: $x^8 + x^7 + x^6 + x^5 + x^4 + x^5 + x^4 + x^3 + x^2 + x + x^4 + x^3 + x^2 + x + 1$, and pairs cancel modulo $2$.) The degree is $8$, so the code is $(15, 7)$ with $d_{\min} \ge 5$; since $g$ itself has weight $5$, $d_{\min} = 5$ exactly. Compare a Hamming code: $(15, 11)$ corrects one error with four parity bits; the BCH code spends eight to correct two. The Hamming bound for $t = 2$, $n = 15$ requires $1 + 15 + 105 = 121 \le 2^{n-k}$, i.e. $n - k \ge 7$, so the BCH code is within one bit of the bound.
:::
:::

### Algebraic decoding

Let $r(x) = c(x) + e(x)$ with errors at unknown positions $i_1, \dots, i_\nu$ ($\nu \le t$) and, for non-binary codes, unknown values $Y_l$. Write $X_l = \alpha^{i_l}$ for the **error locators**. Because $c(\alpha^j) = 0$, the **syndromes**

$$
S_j = r(\alpha^j) = e(\alpha^j) = \sum_{l=1}^\nu Y_lX_l^j, \qquad j = 1, \dots, 2t,
$$ {#eq-syndromes}

depend only on the errors. Decoding means solving these $2t$ non-linear equations for the $2\nu$ unknowns.

::: algorithm Algebraic decoding of BCH and Reed–Solomon codes {#alg-bch-decode}
1. **Syndromes.** Compute $S_1, \dots, S_{2t}$ by evaluating $r(x)$ at $\alpha, \dots, \alpha^{2t}$. If all are zero, accept $r$.
2. **Error-locator polynomial.** Find $\Lambda(x) = \prod_{l=1}^\nu(1 - X_lx) = 1 + \Lambda_1x + \dots + \Lambda_\nu x^\nu$ of least degree satisfying the linear recurrence $S_j + \Lambda_1S_{j-1} + \dots + \Lambda_\nu S_{j-\nu} = 0$ for $j = \nu + 1, \dots, 2t$ (Newton's identities). The **Berlekamp–Massey algorithm** finds it in $O(t^2)$ operations; it is the shortest LFSR that generates the syndrome sequence.
3. **Chien search.** Evaluate $\Lambda(\alpha^{-i})$ for $i = 0, \dots, n - 1$; its zeros give the error positions $i_l$.
4. **Error values** (non-binary codes). Compute $Y_l$ by Forney's formula $Y_l = -\Omega(X_l^{-1})/\Lambda'(X_l^{-1})$, where $\Omega(x) = S(x)\Lambda(x) \bmod x^{2t}$ and $S(x) = \sum_jS_jx^{j-1}$. Binary codes have $Y_l = 1$.
5. Subtract the errors. If $\Lambda$ has fewer than $\deg\Lambda$ distinct roots, declare a **decoding failure** (more than $t$ errors).
:::

For a single error the procedure collapses: $S_1 = YX$ and $S_2 = YX^2$, so $X = S_2/S_1$ and $Y = S_1^2/S_2$. The next example does exactly this.

## Reed–Solomon codes {#sec-rs}

Reed and Solomon took the symbols of the code themselves from $\mathrm{GF}(q)$ instead of $\mathbb F_2$. The minimal polynomials then become linear factors, and the codes become as good as the Singleton bound allows.

::: definition Reed–Solomon code {#def-rs}
Let $\alpha$ be a primitive element of $\mathrm{GF}(q)$ and $n = q - 1$. The **Reed–Solomon code** $\mathrm{RS}(n, k)$ is the cyclic code over $\mathrm{GF}(q)$ with generator

$$
g(x) = (x - \alpha)(x - \alpha^2)\cdots(x - \alpha^{n-k}) .
$$ {#eq-rs}

Its codewords are $n$-tuples of $\mathrm{GF}(q)$ symbols; with $q = 2^m$ each symbol is an $m$-bit byte.
:::

::: theorem Reed–Solomon codes are MDS {#thm-rs-mds}
$\mathrm{RS}(n, k)$ has minimum distance exactly $d_{\min} = n - k + 1$. It corrects any $t = \lfloor(n - k)/2\rfloor$ symbol errors, or any $n - k$ symbol erasures, or any combination with $2\nu + \rho \le n - k$.
:::

::: proof
The generator has the $n - k$ consecutive roots $\alpha, \dots, \alpha^{n-k}$, so the BCH bound [[#thm-bch-bound]] gives $d_{\min} \ge n - k + 1$. The Singleton bound of [[information-theory/linear-block-codes]] gives $d_{\min} \le n - k + 1$. The correction statements then follow from [[information-theory/linear-block-codes#thm-detect-correct]].
:::

Two properties make Reed–Solomon codes the workhorse of storage and broadcasting. A symbol is wrong whether one or all eight of its bits are wrong, so a burst of $b$ bits corrupts at most $\lceil(b - 1)/m\rceil + 1$ symbols: **burst errors are cheap**. And erasures — symbols known to be unreliable, flagged by an inner decoder or a lost packet — cost half as much as errors.

::: example A Reed–Solomon code over GF(7) {#ex-rs-gf7}
Over $\mathrm{GF}(7)$ with primitive element $\alpha = 3$ (powers $1, 3, 2, 6, 4, 5$), construct $\mathrm{RS}(6, 4)$, encode the message $(u_0, u_1, u_2, u_3) = (1, 2, 0, 3)$ systematically, and decode it after the symbol in position $4$ has been changed by $+2$.
::: solution
$t = 1$, and $g(x) = (x - 3)(x - 2) = x^2 - 5x + 6 = x^2 + 2x + 6$ modulo $7$.

*Encoding.* By [[#eq-systematic-cyclic]], we need $x^2u(x) \bmod g$, with $u(x) = 1 + 2x + 3x^3$. From $g = 0$: $x^2 \equiv -2x - 6 = 5x + 1$. Then $x^3 \equiv 5x^2 + x \equiv 5(5x + 1) + x = 26x + 5 \equiv 5x + 5$, $x^5 = x^2x^3 \equiv (5x + 1)(5x + 5) \equiv 25x^2 + 30x + 5 \equiv 4x^2 + 2x + 5 \equiv 4(5x + 1) + 2x + 5 = 22x + 9 \equiv x + 2$. So

$$
x^2u(x) = x^2 + 2x^3 + 3x^5 \equiv (5x + 1) + 2(5x + 5) + 3(x + 2) = 18x + 17 \equiv 4x + 3 .
$$

The codeword is $c(x) = x^2u(x) - (4x + 3) = 4 + 3x + x^2 + 2x^3 + 0x^4 + 3x^5$, i.e. $(4, 3, 1, 2, 0, 3)$. Check: $c(3) = 4 + 9 + 9 + 54 + 0 + 729 = 805 = 7\times115$ and $c(2) = 4 + 6 + 4 + 16 + 0 + 96 = 126 = 7\times18$, both $0$ in $\mathrm{GF}(7)$.

*Decoding.* The received word is $(4, 3, 1, 2, 2, 3)$. Syndromes: $S_1 = r(3) = c(3) + 2\cdot3^4 = 0 + 162 \equiv 1$, and $S_2 = r(2) = 0 + 2\cdot2^4 = 32 \equiv 4$. (The decoder computes them directly from $r$, of course.) For a single error, $X = S_2/S_1 = 4$ and $Y = S_1^2/S_2 = 1\cdot4^{-1} = 2$, since $4\times2 = 8 \equiv 1$. The locator $X = 4 = \alpha^4$ points to position $4$, and the error value is $2$: subtracting gives $(4, 3, 1, 2, 0, 3)$, and the message is read off positions $2$–$5$ as $(1, 2, 0, 3)$.
:::
:::

::: widget plot
f: log10(sum(binom(255, i)*x^i*(1 - x)^(255 - i), i, 17, 255)); log10(sum(binom(255, i)*x^i*(1 - x)^(255 - i), i, 9, 255))
x: 0.002, 0.08
y: -12, 0
labels: \text{RS}(255,223),\ t=16; \text{RS}(255,239),\ t=8
caption: Probability ($\log_{10}$) that a Reed–Solomon codeword of $255$ bytes has more symbol errors than the decoder can correct, against the byte error probability (horizontal axis), assuming independent byte errors. The curves fall extremely steeply: for $t = 16$ the failure probability drops from about $3\%$ at a byte error rate of $4\%$ to $2\times10^{-5}$ at $2\%$ and $10^{-9}$ at $1\%$. Halving the redundancy ($t = 8$) moves the cliff to much lower byte error rates. This steepness is why RS codes make excellent outer codes behind an inner decoder whose output errors arrive in bursts.
:::

::: example Choosing an interleaving depth {#ex-interleave}
A storage channel produces occasional error bursts up to $500$ bits long, well separated. Data are protected by $\mathrm{RS}(255, 223)$ over $\mathrm{GF}(256)$. Design a symbol interleaver so that one burst never defeats the code.
::: solution
The code corrects $t = 16$ byte errors per codeword. A burst of $500$ bits touches at most $\lceil499/8\rceil + 1 = 64$ consecutive bytes (it may start part-way through a byte). Without interleaving, one burst corrupts up to $64 > 16$ bytes of one codeword — failure.

With **block interleaving** of depth $I$, $I$ codewords are written as the rows of an $I\times255$ array and transmitted column by column, so consecutive transmitted bytes belong to different codewords. A burst of $64$ bytes then puts at most $\lceil64/I\rceil$ bytes into any one codeword. We need $\lceil64/I\rceil \le 16$, so $I = 4$ suffices. This leaves no margin for random errors in the same codewords; with $I = 5$ (the largest depth in the CCSDS deep-space standard) each codeword receives at most $13$ burst bytes, leaving $3$ for random errors. The cost is memory and delay: the interleaver holds $I\times255 = 1275$ bytes at each end. Using erasure information (if the burst is flagged) would double the tolerance, since $2\nu + \rho \le 32$.
:::
:::

::: application Cyclic codes everywhere
CRCs check every Ethernet frame (CRC-32), USB packet (CRC-5 and CRC-16), CAN bus message (CRC-15) and Bluetooth packet. BCH codes protect the headers of DVB-S2 frames and, with $t$ in the dozens, the pages of NAND flash memory. Reed–Solomon codes are used on the compact disc (the cross-interleaved CIRC scheme of two shortened codes over $\mathrm{GF}(256)$, which corrects bursts of about $3500$ bits, some $2.4\,\mathrm{mm}$ of track), DVDs and Blu-ray discs, QR codes (four selectable levels, restoring roughly $7$–$30\,\%$ of a damaged symbol), DVB-T digital television ($\mathrm{RS}(204, 188)$, shortened from $(255, 239)$), DSL, and the CCSDS standard concatenated with a convolutional inner code ([[information-theory/convolutional-codes]]) that carried the Voyager images from Uranus and Neptune. In distributed storage, RS erasure codes let a data centre rebuild lost disks from the survivors with far less overhead than keeping three copies.
:::

## Where this leads {#sec-leads}

Cyclic codes are decoded algebraically, one block at a time, usually from hard decisions. [[information-theory/convolutional-codes]] takes a different route: a shift-register encoder with no block boundaries, decoded by the Viterbi algorithm on a trellis using soft decisions; the two are often concatenated, with a Reed–Solomon outer code cleaning up the bursty errors of the Viterbi decoder. In [[information-theory/modern-codes]] the BCH and Reed–Solomon families meet the iterative paradigm — BCH outer codes remove the error floor of LDPC codes in DVB-S2 — and polar codes are shown to be close relatives of the Reed–Muller codes of [[information-theory/linear-block-codes]]. The LFSRs used here also generate the pseudo-random sequences of spread-spectrum systems and scramblers in [[communication-systems/wireless-communication]].

::: history
Eugene Prange introduced cyclic codes in a 1957 report for the US Air Force Cambridge Research Center. W. Wesley Peterson and D. T. Brown analysed shift-register implementations of cyclic codes for error detection in 1961, the basis of today's CRCs; Peterson's 1960 paper gave the first decoding algorithm for binary BCH codes. The codes themselves were discovered by Alexis Hocquenghem (1959) and independently by Raj Chandra Bose and D. K. Ray-Chaudhuri (1960). Irving Reed and Gustave Solomon, at MIT Lincoln Laboratory, published "Polynomial Codes over Certain Finite Fields" in 1960; Daniel Gorenstein and Neal Zierler extended Peterson's decoder to non-binary codes in 1961. Robert Chien's search (1964), David Forney's error-value formula (1965), Elwyn Berlekamp's iterative algorithm (1968) and James Massey's interpretation of it as LFSR synthesis (1969) made decoding practical, and the compact disc, launched in 1982, brought Reed–Solomon decoders into millions of homes.
:::

::: summary
- A cyclic code is a linear code closed under cyclic shifts; in polynomial form its codewords are the multiples of a generator $g(x)$ of degree $n - k$ that divides $x^n - 1$.
- Systematic encoding appends the remainder of $x^{n-k}u(x)$ divided by $g(x)$; an LFSR with $n - k$ stages computes it, and the same circuit computes the syndrome $r(x) \bmod g(x)$.
- A CRC with $\deg g = r$ detects all bursts up to length $r$, all odd-weight errors if $(x + 1) \mid g$, and all but a fraction $2^{-r}$ of longer bursts; conventions (bit order, initial value, final XOR) must match.
- $\mathrm{GF}(2^m)$ is built from polynomials modulo a primitive polynomial; its non-zero elements are the powers of a primitive element $\alpha$.
- BCH codes put $\alpha, \dots, \alpha^{2t}$ among the roots of $g$; the Vandermonde argument (BCH bound) gives $d_{\min} \ge 2t + 1$ with at most $mt$ parity bits.
- Reed–Solomon codes over $\mathrm{GF}(q)$ have $g(x) = \prod_{j=1}^{n-k}(x - \alpha^j)$ and are MDS, $d_{\min} = n - k + 1$; they correct $t$ symbol errors or $2t$ erasures and handle bursts well, especially with interleaving.
- Algebraic decoding: syndromes, error-locator polynomial (Berlekamp–Massey), Chien search for positions and Forney's formula for values.
:::

## Exercises

::: exercise A cyclic shift {level=1}
For the code of [[#ex-cyclic-hamming]], shift the codeword $(1, 0, 0, 1, 0, 1, 1)$ cyclically by one place, write the result as a polynomial, and verify that it is a multiple of $g(x) = 1 + x + x^3$.
::: solution
The shift is $(1, 1, 0, 0, 1, 0, 1)$, i.e. $x\,c(x) \bmod (x^7 - 1) = x + x^4 + x^6 + x^7 \equiv 1 + x + x^4 + x^6$. Dividing: $1 + x + x^4 + x^6 = (1 + x + x^3)(1 + x^3)$, since $(1 + x + x^3)(1 + x^3) = 1 + x + x^3 + x^3 + x^4 + x^6 = 1 + x + x^4 + x^6$. So it is a codeword, with $u(x) = 1 + x^3$.
:::
:::

::: exercise A small CRC {level=1}
Compute the $3$-bit CRC of the message $1101$ with $g(x) = x^3 + x + 1$ ($1011$), and give the transmitted word.
::: solution
Divide $1101\,000$ by $1011$: $1101000 + 1011000 = 0110000$; $110000 + 101100 = 011100$; $11100 + 10110 = 01010$; $1010 + 1011 = 0001$. The remainder is $001$, and the transmitted word is $1101\,001$.
:::
:::

::: exercise Reed–Solomon parameters {level=1 check="16"}
For $\mathrm{RS}(255, 223)$ over $\mathrm{GF}(256)$, give the number of correctable symbol errors $t$, the minimum distance, the rate, and the number of erasures it can fill.
::: solution
$n - k = 32$, so $d_{\min} = 33$, $t = 16$ symbol errors, or $32$ erasures. The rate is $223/255 = 0.875$.
:::
:::

::: exercise The factor $x + 1$ {level=2}
Prove that a binary cyclic code whose generator has $(x + 1)$ as a factor contains only even-weight codewords. Which of the cyclic codes of length $7$ in [[#eq-x7]] are of this kind?
::: solution
Every codeword is $c(x) = a(x)g(x)$ and $g(1) = 0$, so $c(1) = 0$. But $c(1) = \sum_ic_i \bmod 2$ is the parity of the weight; hence the weight is even. Of length $7$: $g = x + 1$ (the $(7, 6)$ even-weight code), $g = (x + 1)(x^3 + x + 1)$ and $g = (x + 1)(x^3 + x^2 + 1)$ (the two $(7, 3)$ simplex codes, all weights $4$), but not the Hamming codes ($g$ of degree $3$, which contain weight-$3$ words) nor the repetition code (whose generator $1 + x + \dots + x^6$ is the product of the two cubics, and whose codeword $1111111$ has weight $7$).
:::
:::

::: exercise Undetected long bursts {level=2 check="2^-15"}
A CRC-16 receives a burst of exactly $17$ bits (the first and last bits of the window both in error, the $15$ between them random). What is the probability that it goes undetected?
::: solution
By [[#thm-crc]], part 4, a burst of length $r + 1 = 17$ is undetected only if its pattern equals $g$: one in $2^{r-1} = 2^{15}$ patterns, probability $3.05\times10^{-5}$.
:::
:::

::: exercise Arithmetic in GF(8) {level=2}
Using the table of $\mathrm{GF}(8)$ with $\alpha^3 = \alpha + 1$, compute $\alpha^5\cdot\alpha^4$, $\alpha^3 + \alpha^5$ and $(\alpha^2 + 1)^{-1}$.
::: solution
$\alpha^5\cdot\alpha^4 = \alpha^9 = \alpha^2$ (exponents modulo $7$). $\alpha^3 + \alpha^5 = 011 + 111 = 100 = \alpha^2$. $\alpha^2 + 1 = 101 = \alpha^6$, whose inverse is $\alpha^{-6} = \alpha$; check: $\alpha(\alpha^2 + 1) = \alpha^3 + \alpha = (\alpha + 1) + \alpha = 1$.
:::
:::

::: exercise Decoding the GF(7) code {level=2}
The codeword $(4, 3, 1, 2, 0, 3)$ of [[#ex-rs-gf7]] is received as $(4, 1, 1, 2, 0, 3)$. Decode it with the single-error formulas.
::: solution
The error is $-2 \equiv 5$ in position $1$, but the decoder does not know that. $S_1 = r(3) = c(3) + 5\cdot3 = 15 \equiv 1$; $S_2 = r(2) = c(2) + 5\cdot2 = 10 \equiv 3$. Then $X = S_2/S_1 = 3 = \alpha^1$: position $1$. $Y = S_1^2/S_2 = 3^{-1} = 5$ (since $3\times5 = 15 \equiv 1$). Subtract $5$ from position $1$: $1 - 5 = -4 \equiv 3$, recovering $(4, 3, 1, 2, 0, 3)$.
:::
:::

::: exercise Roots of the BCH generator {level=3}
::: hint
In $\mathrm{GF}(16)$ with $\alpha^4 = \alpha + 1$, compute $\alpha^3$, $\alpha^6$, $\alpha^9$, $\alpha^{12}$ as 4-bit vectors and substitute.
:::
Verify that $\alpha^3$ is a root of $x^4 + x^3 + x^2 + x + 1$ in $\mathrm{GF}(16)$ with $\alpha^4 = \alpha + 1$, and hence that the generator of [[#ex-bch15]] has $\alpha, \alpha^2, \alpha^3, \alpha^4$ among its roots. Explain why the $(15, 7)$ code has $d_{\min}$ exactly $5$ and not more.
::: solution
With $\beta = \alpha^3$: $\beta^2 = \alpha^6$, $\beta^3 = \alpha^9$, $\beta^4 = \alpha^{12}$. Compute powers: $\alpha^4 = \alpha + 1$, $\alpha^5 = \alpha^2 + \alpha$, $\alpha^6 = \alpha^3 + \alpha^2$, $\alpha^7 = \alpha^4 + \alpha^3 = \alpha^3 + \alpha + 1$, $\alpha^8 = \alpha^4 + \alpha^2 + \alpha = \alpha^2 + 1$, $\alpha^9 = \alpha^3 + \alpha$, $\alpha^{12} = \alpha^9\alpha^3 = \alpha^6 + \alpha^4 = \alpha^3 + \alpha^2 + \alpha + 1$. Then $\beta^4 + \beta^3 + \beta^2 + \beta + 1 = (\alpha^3 + \alpha^2 + \alpha + 1) + (\alpha^3 + \alpha) + (\alpha^3 + \alpha^2) + \alpha^3 + 1 = 0$ (each of $\alpha^3$, $\alpha^2$, $\alpha$, $1$ appears an even number of times). So $m_{\alpha^3}$ is as stated; $\alpha, \alpha^2, \alpha^4$ are roots of $x^4 + x + 1$ by the conjugate property. The BCH bound gives $d \ge 5$, and $g(x)$ itself is a codeword of weight $5$ ($x^8 + x^7 + x^6 + x^4 + 1$), so $d_{\min} = 5$.
:::
:::

::: exercise Interleaving for a DVB-T link {level=3 check="96"}
::: hint
A burst of $b$ bytes spread by a depth-$I$ interleaver puts at most $\lceil b/I\rceil$ bytes into one codeword.
:::
DVB-T protects $188$-byte packets with $\mathrm{RS}(204, 188)$ followed by a convolutional interleaver of depth $I = 12$. How many correctable byte errors does the code have per packet? What is the longest burst of consecutive byte errors (from the inner decoder) that the interleaver and code together always correct? Give the burst length in bytes as the answer.
::: solution
$n - k = 16$, so $t = 8$ bytes per codeword. Interleaving to depth $12$ spreads a burst of $b$ bytes so that each codeword gets at most $\lceil b/12\rceil$; we need $\lceil b/12\rceil \le 8$, i.e. $b \le 96$ bytes, about $768$ bits. Viterbi decoder error events are typically tens of bits long, so this leaves a comfortable margin.
:::
:::

::: exercise Why a CRC needs $g(0) = 1$ {level=3}
Show that if $g(0) = 0$ the CRC fails to detect some single-bit errors when the message is shortened, and that it wastes a check bit in any case. Then show that a CRC with $g(x) = (x + 1)p(x)$, $p$ primitive of degree $r - 1$, detects all double errors in blocks of length up to $2^{r-1} - 1$.
::: solution
If $g(0) = 0$ then $g = x\,g_1(x)$, and every codeword $c = ag = x\,ag_1$ has $c_0 = 0$: the lowest check bit is always zero and carries no information, so the code is effectively a CRC with generator $g_1$ of degree $r - 1$ followed by a constant $0$. (Errors in that last bit are still detected, but an $r$-bit check is doing the work of an $(r - 1)$-bit one.) For double errors $e = x^i + x^j = x^i(1 + x^{m})$ with $0 < m = j - i < n$: $g$ is coprime to $x^i$, so $g \mid e$ needs $p \mid 1 + x^m$, i.e. $x^m = 1$ in the field defined by $p$. Since $p$ is primitive, $x$ has order $2^{r-1} - 1$ there, so $m \ge 2^{r-1} - 1$. For blocks of length $n \le 2^{r-1} - 1$, $m < n$ is too small, and every double error is detected. (The factor $x + 1$ handles odd weights; together they also detect every triple error.)
:::
:::
