The memory in a server is struck by cosmic-ray neutrons often enough that, across a data centre, bits flip every few minutes. Server memory modules therefore store each $64$-bit word as $72$ bits: the extra eight bits let the memory controller correct any single flipped bit and detect any two, at a cost of $12.5\,\%$ more storage. The same idea, scaled up, protects QR codes, hard-disk sectors, satellite links and the data of every mobile phone. It is an **error-correcting code**: a set of permitted bit patterns chosen so far apart that a few errors cannot turn one into another.

[[information-theory/channel-capacity]] proved that good codes exist but gave no way to build or decode them. This lesson starts the constructive half of the course with **linear block codes**, whose codewords form a vector space over the binary field. Linearity buys three things at once: a code is described by a small **generator matrix** instead of a list of $2^k$ codewords, its error-correcting power is read off from the weights of its codewords, and decoding reduces to computing a short **syndrome**. We define Hamming distance and what it guarantees, develop generator and parity-check matrices, decode with syndromes and the standard array, construct the **Hamming codes** and their extended single-error-correcting, double-error-detecting versions, and prove the Hamming and Singleton bounds that limit every code. The algebra is that of [[digital-logic/boolean-algebra]] — exclusive-OR is addition — combined with the matrix methods of linear algebra.

## Block codes and Hamming distance {#sec-distance}

A **binary block code** of length $n$ is a set $\mathcal C$ of $M$ binary $n$-tuples, the **codewords**. If $M = 2^k$, each codeword can carry $k$ message bits, and the code is an $(n, k)$ code of **rate** $R = k/n$; the $n - k$ extra bits are **redundancy**. The encoder maps a message $\mathbf u \in \{0, 1\}^k$ to a codeword $\mathbf c$; the channel delivers $\mathbf r = \mathbf c + \mathbf e$, where $\mathbf e$ marks the flipped positions and addition is modulo $2$ in each position.

::: definition Hamming distance and weight {#def-hamming-distance}
The **Hamming weight** $w(\mathbf x)$ of a binary vector is its number of ones. The **Hamming distance** $d(\mathbf x, \mathbf y) = w(\mathbf x + \mathbf y)$ is the number of positions in which $\mathbf x$ and $\mathbf y$ differ. The **minimum distance** of a code is

$$
d_{\min} = \min\{d(\mathbf c, \mathbf c') : \mathbf c, \mathbf c' \in \mathcal C,\ \mathbf c \ne \mathbf c'\} .
$$ {#eq-dmin}

An $(n, k)$ code with minimum distance $d$ is called an $(n, k, d)$ code.
:::

The Hamming distance is a metric: it is symmetric, zero only for equal vectors, and obeys the triangle inequality $d(\mathbf x, \mathbf z) \le d(\mathbf x, \mathbf y) + d(\mathbf y, \mathbf z)$ (a position where $\mathbf x$ and $\mathbf z$ differ must be one where $\mathbf y$ differs from at least one of them). On a BSC with crossover $p < \tfrac12$, a pattern of $w$ errors has probability $p^w(1 - p)^{n-w}$, which decreases with $w$, so the maximum-likelihood decoder is the **minimum-distance decoder**: choose the codeword nearest to $\mathbf r$.

::: theorem Error detection and correction {#thm-detect-correct}
A code with minimum distance $d_{\min}$
1. detects every error pattern of weight at most $d_{\min} - 1$;
2. corrects every error pattern of weight at most $t = \lfloor(d_{\min} - 1)/2\rfloor$ by minimum-distance decoding;
3. more generally, can simultaneously correct up to $t'$ errors and detect up to $s \ge t'$ errors if $t' + s < d_{\min}$, and can correct $\nu$ errors and $\rho$ erasures if $2\nu + \rho < d_{\min}$.
:::

::: proof
(1) An error pattern of weight $1 \le w \le d_{\min} - 1$ cannot turn a codeword into another codeword, since codewords differ in at least $d_{\min}$ places; so $\mathbf r$ is not a codeword and the error is noticed. (2) Suppose $w(\mathbf e) \le t$, so $d(\mathbf r, \mathbf c) \le t$. For any other codeword $\mathbf c'$, the triangle inequality gives $d(\mathbf r, \mathbf c') \ge d(\mathbf c, \mathbf c') - d(\mathbf r, \mathbf c) \ge d_{\min} - t \ge 2t + 1 - t = t + 1$. So $\mathbf c$ is the unique nearest codeword. (3) The same argument with spheres of radius $t'$ around codewords, which must not be reachable by $s$ errors from another codeword; for erasures, delete the $\rho$ erased positions: the punctured code has distance at least $d_{\min} - \rho \ge 2\nu + 1$ and corrects $\nu$ errors.
:::

Geometrically, put a "Hamming sphere" of radius $t$ around every codeword. When $d_{\min} \ge 2t + 1$ the spheres are disjoint, and any received word inside a sphere is decoded to its centre.

The **repetition code** $\{000, 111\}$ has $d_{\min} = 3$: it corrects one error or detects two, at rate $\tfrac13$. The **single parity-check code** of length $n$, which appends to $n - 1$ data bits their exclusive-OR, contains all even-weight words: $d_{\min} = 2$, so it detects any single error (indeed any odd number) but corrects none, at rate $(n - 1)/n$. Most of this lesson is about codes between these extremes.

## Linear codes {#sec-linear}

Searching a list of $2^k$ codewords for the nearest one is hopeless for $k = 64$, let alone $k = 1000$. Structure is needed.

::: definition Linear block code {#def-linear}
An $(n, k)$ **linear block code** is a $k$-dimensional subspace of the vector space $\mathbb F_2^n$ of binary $n$-tuples, with addition and scalar multiplication modulo $2$. Equivalently, the sum (bitwise XOR) of any two codewords is a codeword. A **generator matrix** is a $k\times n$ matrix $G$ whose rows form a basis of the code; the encoder maps $\mathbf u \mapsto \mathbf c = \mathbf uG$.
:::

Every linear code contains the all-zero word ($\mathbf c + \mathbf c = \mathbf 0$). Over $\mathbb F_2 = \{0, 1\}$, $1 + 1 = 0$, so subtraction is the same as addition, and every row operation of Gaussian elimination is "add one row to another". A generator matrix can always be brought by row operations (and, if necessary, a permutation of columns, which gives an **equivalent** code with the same distances) to **systematic form**

$$
G = \big[\,I_k\ \big|\ P\,\big], \qquad \mathbf c = \mathbf uG = \big[\,\mathbf u\ \big|\ \mathbf uP\,\big],
$$ {#eq-systematic}

in which the first $k$ code bits are the message itself and the last $n - k$ are **parity bits** computed by the $k\times(n - k)$ matrix $P$. Systematic encoding is just a set of XOR trees, one per parity bit.

::: theorem Minimum distance of a linear code {#thm-min-weight}
For a linear code, $d_{\min}$ equals the minimum Hamming weight of the non-zero codewords. More generally, the set of distances from any one codeword to all the others is the same for every codeword.
:::

::: proof
$d(\mathbf c, \mathbf c') = w(\mathbf c + \mathbf c')$, and $\mathbf c + \mathbf c'$ is a codeword, non-zero when $\mathbf c \ne \mathbf c'$; conversely each non-zero codeword $\mathbf c$ is at distance $w(\mathbf c)$ from $\mathbf 0$. For the second statement, the map $\mathbf x \mapsto \mathbf x + \mathbf c$ is a bijection of the code onto itself that preserves distances and takes $\mathbf 0$ to $\mathbf c$.
:::

So instead of $\binom{2^k}{2}$ pairs we examine $2^k - 1$ weights. The second statement means that the error probability of a linear code on a symmetric channel does not depend on which codeword was sent — we may always analyse the all-zero codeword.

::: example The $(7, 4)$ Hamming code {#ex-hamming74}
A code has the systematic generator matrix

$$
G = \left[\begin{array}{cccc|ccc}1&0&0&0&1&1&0\\0&1&0&0&1&0&1\\0&0&1&0&0&1&1\\0&0&0&1&1&1&1\end{array}\right].
$$

Encode $\mathbf u = 1011$, write the parity equations, and find $d_{\min}$.
::: solution
$\mathbf c = \mathbf uG$ is the sum of rows $1$, $3$ and $4$: $1000110 + 0010011 + 0001111 = 1011010$. The message appears in the first four bits and the parity bits are $010$.

Writing $\mathbf c = (u_1, u_2, u_3, u_4, p_1, p_2, p_3)$, the columns of $P$ give

$$
p_1 = u_1 + u_2 + u_4,\qquad p_2 = u_1 + u_3 + u_4,\qquad p_3 = u_2 + u_3 + u_4 \pmod 2 .
$$

For $\mathbf u = 1011$: $p_1 = 1 + 0 + 1 = 0$, $p_2 = 1 + 1 + 1 = 1$, $p_3 = 0 + 1 + 1 = 0$, as found.

Listing all $16$ codewords (sums of subsets of rows) gives weights: one of weight $0$, seven of weight $3$, seven of weight $4$ and one of weight $7$. By [[#thm-min-weight]], $d_{\min} = 3$: the code corrects any single error, at rate $\tfrac47$ instead of the repetition code's $\tfrac13$.
:::
:::

## The parity-check matrix {#sec-parity-check}

A subspace can be described either by a basis (the generator) or by the linear equations its vectors satisfy. The second description is the one used for decoding.

::: definition Parity-check matrix and dual code {#def-parity-check}
A **parity-check matrix** of an $(n, k)$ linear code $\mathcal C$ is an $(n - k)\times n$ matrix $H$ of rank $n - k$ such that

$$
\mathbf c \in \mathcal C \iff \mathbf cH^{\T} = \mathbf 0 .
$$ {#eq-parity}

For a systematic generator $G = [I_k \mid P]$, one parity-check matrix is $H = [P^{\T} \mid I_{n-k}]$, and $GH^{\T} = 0$. The code generated by $H$ is the **dual code** $\mathcal C^\perp$, the $(n, n - k)$ code of all vectors orthogonal (modulo $2$) to every codeword.
:::

To verify: $GH^{\T} = [I_k \mid P]\begin{bmatrix}P\\ I_{n-k}\end{bmatrix} = P + P = 0$ over $\mathbb F_2$. Each row of $H$ is one parity equation — for [[#ex-hamming74]], the first row of $H = [P^{\T} \mid I_3]$ is $1101\,100$, the equation $u_1 + u_2 + u_4 + p_1 = 0$.

::: theorem Minimum distance from the parity-check matrix {#thm-dmin-columns}
A linear code has minimum distance $d$ if and only if every set of $d - 1$ columns of $H$ is linearly independent and some set of $d$ columns is linearly dependent. In particular, $d_{\min} \ge 3$ if and only if the columns of $H$ are non-zero and distinct.
:::

::: proof
If $\mathbf c$ has ones in positions $j_1, \dots, j_w$, then $\mathbf cH^{\T} = \mathbf h_{j_1} + \dots + \mathbf h_{j_w}$, the sum of those columns of $H$. So a codeword of weight $w$ exists exactly when some $w$ columns sum to zero, i.e. are linearly dependent (over $\mathbb F_2$, a dependency is a subset summing to zero). The smallest such $w$ is $d_{\min}$. Over $\mathbb F_2$, one column is dependent if it is zero, and two are dependent if they are equal.
:::

## Syndrome decoding {#sec-syndrome}

::: definition Syndrome {#def-syndrome}
The **syndrome** of a received vector $\mathbf r$ is the $(n - k)$-bit vector

$$
\mathbf s = \mathbf rH^{\T} = (\mathbf c + \mathbf e)H^{\T} = \mathbf eH^{\T} .
$$ {#eq-syndrome}
:::

The syndrome depends only on the error pattern, not on the codeword: it is zero for every codeword and, by [[#thm-dmin-columns]], equal to the sum of the columns of $H$ at the error positions. Decoding therefore splits into computing $\mathbf s$ (a few XOR trees) and deciding which error pattern caused it.

Many error patterns share a syndrome: $\mathbf e$ and $\mathbf e + \mathbf c$ have the same syndrome for every codeword $\mathbf c$. The $2^n$ vectors of $\mathbb F_2^n$ fall into $2^{n-k}$ **cosets** $\mathbf e + \mathcal C$, one per syndrome, each containing $2^k$ vectors. Arranging them in rows gives Slepian's **standard array**: the first row is the code itself, and each later row is a coset headed by a **coset leader**, a vector of least weight in it.

::: theorem Syndrome decoding is maximum likelihood {#thm-syndrome-ml}
On a BSC with $p < \tfrac12$, the decoder that computes $\mathbf s = \mathbf rH^{\T}$, looks up the coset leader $\hat{\mathbf e}$ with that syndrome and outputs $\hat{\mathbf c} = \mathbf r + \hat{\mathbf e}$ is a minimum-distance, hence maximum-likelihood, decoder. It decodes correctly if and only if the actual error pattern is a coset leader.
:::

::: proof
The candidate codewords are $\mathbf r + \mathbf e'$ for the error patterns $\mathbf e'$ with $\mathbf e'H^{\T} = \mathbf s$, i.e. the members of $\mathbf r$'s coset; the distance from $\mathbf r$ to $\mathbf r + \mathbf e'$ is $w(\mathbf e')$. Choosing the minimum-weight member of the coset therefore chooses the nearest codeword, which on a BSC with $p < \tfrac12$ is the most likely one. The output equals $\mathbf c$ exactly when $\hat{\mathbf e} = \mathbf e$.
:::

The decoder needs a table of $2^{n-k}$ syndromes and leaders, not $2^k$ codewords: for a $(72, 64)$ code that is $256$ entries instead of $1.8\times10^{19}$. For long codes even $2^{n-k}$ is too many, and later chapters replace table lookup by algebra ([[information-theory/cyclic-codes]]) or by iterative message passing ([[information-theory/modern-codes]]).

::: example Correcting an error {#ex-syndrome}
The codeword $1011010$ of [[#ex-hamming74]] is received as $\mathbf r = 1001010$. Decode it.
::: solution
The parity-check matrix is

$$
H = \big[P^{\T} \mid I_3\big] = \left[\begin{array}{cccc|ccc}1&1&0&1&1&0&0\\1&0&1&1&0&1&0\\0&1&1&1&0&0&1\end{array}\right].
$$

$\mathbf r$ has ones in positions $1, 4, 6$, so $\mathbf s$ is the sum of columns $1$, $4$ and $6$ of $H$: $(1, 1, 0) + (1, 1, 1) + (0, 1, 0) = (0, 1, 1)$. This equals column $3$ of $H$, so the coset leader is the single error in position $3$. Flipping it gives $\hat{\mathbf c} = 1011010$ and the message $\hat{\mathbf u} = 1011$. Every single error produces a different non-zero syndrome — the seven columns of $H$ — so all seven are corrected; the eighth syndrome, zero, means "no error".
:::
:::

::: quiz
The $(7, 4)$ code above receives a word with errors in positions $1$ and $2$. What does the syndrome decoder do?
- [ ] It detects a double error and asks for retransmission
- [ ] It corrects both errors
- [x] It "corrects" a third position, producing a codeword with three bit errors
- [ ] It outputs the received word unchanged, because the syndrome is zero
::: solution
The syndrome is $\mathbf h_1 + \mathbf h_2 = (1,1,0) + (1,0,1) = (0,1,1) = \mathbf h_3$. The decoder believes the error is in position $3$ and flips it, so the output differs from the true codeword in positions $1$, $2$ and $3$ — a codeword at distance $3$ from the transmitted one. A code with $d_{\min} = 3$ used for correction cannot also detect double errors; the extended code of [[#sec-hamming]] can.
:::
:::

## Hamming codes {#sec-hamming}

[[#thm-dmin-columns]] suggests the most efficient single-error-correcting code: use as columns of $H$ *every* non-zero $m$-bit vector.

::: definition Hamming codes {#def-hamming}
For $m \ge 2$, the **Hamming code** of order $m$ is the linear code whose parity-check matrix has as columns all $2^m - 1$ non-zero binary $m$-tuples. Its parameters are

$$
n = 2^m - 1, \qquad k = 2^m - 1 - m, \qquad d_{\min} = 3 .
$$ {#eq-hamming-params}
:::

The codes are $(3, 1)$ (the repetition code), $(7, 4)$, $(15, 11)$, $(31, 26)$, $(63, 57)$, …, with rates approaching $1$. If the columns of $H$ are arranged so that column $j$ is the binary representation of $j$, the syndrome of a single error *is* the binary address of the erroneous bit — Hamming's original arrangement, convenient for hardware. The minimum distance is $3$ because the columns are distinct and non-zero, while columns $1$, $2$ and $3$ (binary $001 + 010 = 011$) are dependent.

How good can a single-error-correcting code be? Each codeword "owns" a Hamming sphere of the vectors within distance $t$ of it, and for unique decoding these spheres must not overlap.

::: theorem Hamming (sphere-packing) bound {#thm-hamming-bound}
Every binary code of length $n$ with $M$ codewords that corrects all patterns of up to $t$ errors satisfies

$$
M\sum_{i=0}^t\binom ni \le 2^n ;\qquad\text{for an }(n, k)\text{ code,}\quad \sum_{i=0}^t\binom ni \le 2^{n-k} .
$$ {#eq-hamming-bound}

A code that meets the bound with equality is called **perfect**. The Hamming codes are perfect single-error-correcting codes.
:::

::: proof
The sphere of radius $t$ around a codeword contains $\sum_{i=0}^t\binom ni$ vectors (the codeword itself, those differing in one position, in two, …). If the code corrects $t$ errors, spheres around distinct codewords are disjoint (a vector in two spheres could not be decoded correctly for both). The $M$ disjoint spheres fit in the space of $2^n$ vectors, giving the bound. For a Hamming code with $t = 1$: $M(1 + n) = 2^{2^m - 1 - m}\cdot2^m = 2^{2^m - 1} = 2^n$.
:::

Perfect codes are rare: apart from the trivial ones (repetition codes of odd length, and the whole space), the only perfect binary codes are the Hamming codes and the $(23, 12, 7)$ **Golay code**, which corrects three errors ($1 + 23 + 253 + 1771 = 2048 = 2^{11}$). A perfect code wastes no syndrome: every received vector is within distance $t$ of exactly one codeword, so a perfect code always "corrects" — it can never detect an error beyond its capacity.

::: theorem Singleton bound {#thm-singleton}
Every $(n, k)$ linear code satisfies $d_{\min} \le n - k + 1$.
:::

::: proof
Delete the last $d_{\min} - 1$ positions of every codeword. Two distinct codewords differ in at least $d_{\min}$ positions, so they still differ after the deletion: the shortened words are $2^k$ distinct vectors of length $n - d_{\min} + 1$. Hence $2^k \le 2^{n - d_{\min} + 1}$, i.e. $d_{\min} \le n - k + 1$. (The argument uses no linearity, and holds for any alphabet.)
:::

Codes meeting the Singleton bound are **maximum distance separable** (MDS). Among binary codes only the trivial ones are MDS — repetition, single-parity and the whole space — but over larger alphabets there are many: the Reed–Solomon codes of [[information-theory/cyclic-codes]] are MDS, which is why they dominate storage applications. The **Gilbert–Varshamov bound** goes the other way: there exist binary linear codes with $\sum_{i=0}^{d-2}\binom{n-1}i < 2^{n-k}$, so good codes are not rare, just hard to decode.

### Extending, shortening and puncturing

Practical word sizes are powers of two, not $2^m - 1 - m$. Three operations adapt a code:

- **Extending** adds an overall parity bit, the XOR of all $n$ bits. Every odd-weight codeword gains a one, so a code with odd $d_{\min}$ gains $1$ in distance: the extended Hamming code $(2^m, 2^m - 1 - m, 4)$ corrects one error and detects two (**SECDED**). Its parity-check matrix is $H$ with a zero column appended and a row of all ones added.
- **Shortening** fixes some message bits at $0$ and does not transmit them: $(n, k) \to (n - s, k - s)$, with $d_{\min}$ not decreased.
- **Puncturing** deletes some parity bits: $(n, k) \to (n - s, k)$, raising the rate at the cost of distance.

::: example A SECDED code for 64-bit memory words {#ex-secded}
Design a single-error-correcting, double-error-detecting code for $64$-bit data words, and describe the decoding rule.
::: solution
A single-error-correcting code needs a distinct non-zero syndrome for each of the $n = 64 + r$ positions: $2^r - 1 \ge 64 + r$. For $r = 6$, $63 < 70$; for $r = 7$, $127 \ge 71$. So a $(127, 120)$ Hamming code shortened by $56$ positions gives a $(71, 64, 3)$ code. Extending it with an overall parity bit gives the $(72, 64, 4)$ SECDED code used on ECC memory modules ($8$ check bits per $64$ data bits, which also matches the $\times8$ memory chip width: nine chips instead of eight).

Decoding uses the $7$-bit Hamming syndrome $\mathbf s$ and the overall parity check $q$ (the XOR of all $72$ received bits):
- $\mathbf s = \mathbf 0$, $q = 0$: no error.
- $q = 1$: an odd number of errors, assumed to be one. If $\mathbf s \ne \mathbf 0$ it is the column of the erroneous bit, which is flipped; if $\mathbf s = \mathbf 0$ the error is in the overall parity bit itself.
- $\mathbf s \ne \mathbf 0$, $q = 0$: an even number of errors, at least two — uncorrectable, reported to the operating system.

Hsiao's 1970 variant chooses the $72$ columns of $H$ all of odd weight, which makes the double-error test simply "syndrome of even weight" and balances the XOR trees for speed.
:::
:::

::: warning Correction and detection compete
A code with $d_{\min} = 4$ can correct one error *and* detect two, or detect three — but not correct one and detect three. Every error pattern that the decoder "corrects" is one it can no longer detect. Designers of storage and memory systems often choose detection only (a CRC, [[information-theory/cyclic-codes]]) and retransmit, because an undetected miscorrection is far worse than a detected error. Be equally careful with the word "corrects": a $t$-error-correcting decoder corrects *all* patterns of weight up to $t$ and some heavier ones, and it silently miscorrects others.
:::

## Error performance and coding gain {#sec-performance}

A $t$-error-correcting code on a BSC with crossover $p$ decodes a block correctly whenever at most $t$ errors occur, so its block error probability is at most

$$
P_{\text{block}} \le \sum_{i=t+1}^n\binom nip^i(1 - p)^{n-i} \approx \binom n{t+1}p^{t+1}\quad(p \ll 1) ,
$$ {#eq-block-error}

with equality for perfect codes. The decoded *bit* error rate is smaller: a block decoded wrongly with $i$ channel errors usually ends with about $i + t$ wrong bits out of $n$, giving the approximation $P_b \approx \sum_{i=t+1}^n\frac{i + t}n\binom nip^i(1 - p)^{n-i}$.

Coding is not free in energy. With BPSK over an AWGN channel and a rate-$R$ code, each *code* bit carries energy $E_c = RE_b$, so the channel crossover probability rises from $Q(\sqrt{2E_b/N_0})$ to $p = Q(\sqrt{2RE_b/N_0})$ (the $Q$-function of [[random-signals/probability-for-engineers]]). The code must correct enough errors to more than repay this. The **coding gain** at a given bit error rate is the reduction in $E_b/N_0$ the code allows compared with uncoded transmission.

::: widget plot
f: log10(0.5*(1 - erf(sqrt(10^(x/10))))); log10(sum((i + 1)/7*binom(7, i)*(0.5*(1 - erf(sqrt(4/7*10^(x/10)))))^i*(1 - 0.5*(1 - erf(sqrt(4/7*10^(x/10)))))^(7 - i), i, 2, 7)); log10(sum((i + 3)/23*binom(23, i)*(0.5*(1 - erf(sqrt(12/23*10^(x/10)))))^i*(1 - 0.5*(1 - erf(sqrt(12/23*10^(x/10)))))^(23 - i), i, 4, 23))
x: 0, 12
y: -8, 0
hlines: -5
labels: \text{uncoded BPSK}; (7,4)\ \text{Hamming}; (23,12)\ \text{Golay}
caption: Bit error rate ($\log_{10}$, vertical) against $E_b/N_0$ in dB for uncoded BPSK and for hard-decision decoding of the $(7, 4)$ Hamming and $(23, 12)$ Golay codes. At low $E_b/N_0$ the codes are *worse* than no coding: the energy spent on redundancy raises the channel error rate faster than the decoder can correct. At $10^{-5}$ (dashed line) the Hamming code gains only about $0.4\,\mathrm{dB}$ and the Golay code about $2\,\mathrm{dB}$; the curves steepen with $t$, so the gain grows at lower error rates.
:::

::: example Coding gain of the $(7, 4)$ Hamming code {#ex-coding-gain}
Compare uncoded BPSK with the $(7, 4)$ Hamming code (hard decisions) at $E_b/N_0 = 8\,\mathrm{dB}$, and estimate the coding gain at a bit error rate of $10^{-5}$.
::: solution
$E_b/N_0 = 10^{0.8} = 6.31$. Uncoded: $P_b = Q(\sqrt{2\times6.31}) = Q(3.55) = 1.9\times10^{-4}$.

Coded: each code bit has $E_c/N_0 = \tfrac47\times6.31 = 3.61$, so the channel crossover probability is $p = Q(\sqrt{7.21}) = Q(2.69) = 3.6\times10^{-3}$ — nineteen times worse than uncoded. The decoder fails when two or more of the seven bits are wrong; using the approximation above,

$$
P_b \approx \tfrac37\binom72p^2(1 - p)^5 + \dots \approx \tfrac37\times21\times(3.6\times10^{-3})^2 = 1.2\times10^{-4},
$$

and the exact value (computed by enumerating all $128$ error patterns) is $1.17\times10^{-4}$. The code beats uncoded transmission by a factor of $1.6$ at this SNR. Solving for $P_b = 10^{-5}$ gives $E_b/N_0 = 9.17\,\mathrm{dB}$ coded against $9.59\,\mathrm{dB}$ uncoded: a gain of only $0.4\,\mathrm{dB}$. Hard decisions throw away information (the data-processing inequality at work); with soft-decision maximum-likelihood decoding the asymptotic gain of a code is $10\log_{10}(Rd_{\min}) = 10\log_{10}(12/7) = 2.3\,\mathrm{dB}$, as shown in [[communication-systems/optimal-detection]]. Short algebraic codes with hard decisions are cheap but weak; [[information-theory/convolutional-codes]] and [[information-theory/modern-codes]] gain far more.
:::
:::

::: widget distribution
dist: binomial
params: n=7, p=0.02
a: 2
b: 7
caption: The number of channel errors in a block of $n$ bits on a BSC. A single-error-correcting code fails exactly when two or more errors occur (shaded). Raise $p$ and watch the failure probability grow roughly as $\binom n2p^2$; raise $n$ at fixed $p$ (a longer Hamming code, of higher rate) and see why longer codes need to correct more errors to keep the same reliability.
:::

::: application Linear block codes in use
SECDED Hamming codes protect DRAM, caches and register files in servers and in automotive and aerospace processors; more advanced "chipkill" memory uses symbol-based codes that survive the failure of a whole memory chip. The $(32, 6)$ first-order Reed–Muller code, a linear code with $d_{\min} = 16$, carried the pictures from the Mariner 9 Mars orbiter in 1971–72. The extended Golay code $(24, 12, 8)$ was used by the Voyager probes for colour images from Jupiter and Saturn. The simple parity bit survives in serial UARTs, and two-dimensional parity (row and column checks) in early magnetic tape. Product codes, built from two short linear codes arranged in rows and columns, are decoded iteratively in optical-fibre and solid-state-drive controllers.
:::

## Where this leads {#sec-leads}

Linear codes are subspaces; the next step is to add more algebra. [[information-theory/cyclic-codes]] studies codes closed under cyclic shifts, described by a single **generator polynomial**, which gives shift-register encoders, the CRCs used for error detection on every network link, and the multiple-error-correcting BCH and Reed–Solomon codes with algebraic decoders. [[information-theory/convolutional-codes]] drops the block structure in favour of a continuous stream encoded by a small finite-state machine and decoded by the Viterbi algorithm, with soft decisions. And [[information-theory/modern-codes]] returns to the parity-check matrix: LDPC codes are linear block codes whose $H$ is very large and very sparse, decoded by passing messages along the graph that $H$ defines.

::: history
Richard Hamming, frustrated that the Bell Labs relay computers stopped whenever their error-detecting circuits found a fault over a weekend, devised his single-error-correcting codes in 1947; Bell Labs delayed publication for patent reasons, and his paper appeared in the *Bell System Technical Journal* in 1950. Shannon's 1948 paper had already described the $(7, 4)$ code, credited to Hamming. Marcel Golay published the perfect $(23, 12)$ binary and $(11, 6)$ ternary codes in a one-page note in the *Proceedings of the IRE* in 1949. David Slepian put linear codes on an algebraic footing in 1956, introducing the standard array. Irving Reed and David Muller described Reed–Muller codes in 1954, and M. Y. Hsiao published the odd-weight-column SECDED codes used in computer memories in 1970. That the Hamming and Golay codes are the only non-trivial perfect binary codes was proved by Aimo Tietäväinen and, independently, by Jacobus van Lint in 1973.
:::

::: summary
- A code with minimum Hamming distance $d_{\min}$ detects $d_{\min} - 1$ errors and corrects $t = \lfloor(d_{\min} - 1)/2\rfloor$; on a BSC, maximum-likelihood decoding is minimum-distance decoding.
- A linear $(n, k)$ code is a $k$-dimensional subspace of $\mathbb F_2^n$, encoded by $\mathbf c = \mathbf uG$; in systematic form $G = [I_k \mid P]$ and $H = [P^{\T} \mid I_{n-k}]$, with $GH^{\T} = 0$.
- For a linear code, $d_{\min}$ is the least non-zero codeword weight, and the least number of linearly dependent columns of $H$.
- The syndrome $\mathbf s = \mathbf rH^{\T} = \mathbf eH^{\T}$ depends only on the error; decoding by coset leaders is maximum likelihood and needs a table of $2^{n-k}$ entries.
- Hamming codes ($H$ = all non-zero columns) are perfect $(2^m - 1, 2^m - 1 - m, 3)$ codes; extended by an overall parity bit they give SECDED codes such as the $(72, 64)$ memory code.
- The Hamming bound $\sum_{i\le t}\binom ni \le 2^{n-k}$ and the Singleton bound $d_{\min} \le n - k + 1$ limit every code.
- With BPSK, a rate-$R$ code raises the channel error rate because $E_c = RE_b$; hard-decision Hamming coding gains only about $0.4\,\mathrm{dB}$ at $10^{-5}$, and the potential soft-decision gain is $10\log_{10}(Rd_{\min})$.
:::

## Exercises

::: exercise Hamming distance {level=1 check="4"}
Find the Hamming distance between $1011010$ and $0110011$.
::: solution
Their sum is $1101001$, of weight $4$: they differ in positions $1, 2, 4, 7$. The distance is $4$.
:::
:::

::: exercise What a distance buys {level=1 check="2"}
A code has $d_{\min} = 5$. How many errors can it correct? How many can it detect if used for detection only? Can it correct one error and detect three at the same time?
::: solution
$t = \lfloor4/2\rfloor = 2$ errors corrected; $4$ detected. Correcting $t' = 1$ while detecting $s = 3$ needs $t' + s < d_{\min}$: $1 + 3 = 4 < 5$, so yes.
:::
:::

::: exercise Rate of a Hamming code {level=1 check="11/15"}
Give $n$, $k$ and the rate of the Hamming code with $m = 4$ parity bits.
::: solution
$n = 2^4 - 1 = 15$, $k = 15 - 4 = 11$, rate $11/15 = 0.733$.
:::
:::

::: exercise Encoding and decoding {level=2}
Using the $(7, 4)$ code of [[#ex-hamming74]], encode $\mathbf u = 0110$, then decode the received word $1110011$.
::: solution
$\mathbf c = $ row $2$ + row $3$ of $G$ $= 0100101 + 0010011 = 0110110$. For $\mathbf r = 1110011$, with ones in positions $1, 2, 3, 6, 7$, add the corresponding columns of $H$ one at a time: $(1,1,0) + (1,0,1) = (0,1,1)$; $+\,(0,1,1) = (0,0,0)$; $+\,(0,1,0) = (0,1,0)$; $+\,(0,0,1) = (0,1,1)$. So $\mathbf s = (0, 1, 1) = \mathbf h_3$; the decoder flips bit $3$, giving $\hat{\mathbf c} = 1100011$ and $\hat{\mathbf u} = 1100$. Check: $p_1 = 1 + 1 + 0 = 0$, $p_2 = 1 + 0 + 0 = 1$, $p_3 = 1 + 0 + 0 = 1$, parity $011$ as received. Adding columns one at a time, as here, avoids the most common slip in syndrome arithmetic.
:::
:::

::: exercise Undetected errors {level=2 check="7*0.01^3*0.99^4+7*0.01^4*0.99^3+0.01^7"}
The $(7, 4)$ Hamming code is used for error detection only over a BSC with $p = 0.01$. An error goes undetected when the error pattern is itself a non-zero codeword. Using the weight distribution of [[#ex-hamming74]], find the probability of undetected error.
::: solution
$P_u = \sum_iA_ip^i(1 - p)^{n-i} = 7p^3(1 - p)^4 + 7p^4(1 - p)^3 + p^7 = 6.72\times10^{-6} + 6.8\times10^{-8} + 10^{-14} = 6.79\times10^{-6}$. The probability that *some* error occurs is $1 - 0.99^7 = 0.068$, so only one error event in $10^4$ goes unnoticed.
:::
:::

::: exercise A double-error-correcting code {level=2 check="7"}
What is the smallest number $r = n - k$ of parity bits that the Hamming bound allows for a double-error-correcting code with $k = 8$ message bits?
::: solution
Need $1 + n + \binom n2 \le 2^r$ with $n = 8 + r$. For $r = 6$: $n = 14$, $1 + 14 + 91 = 106 > 64$. For $r = 7$: $n = 15$, $1 + 15 + 105 = 121 \le 128$. So $r \ge 7$. The bound is necessary, not sufficient. No *linear* $(15, 8)$ code has $d_{\min} = 5$; the best linear choice is the $(15, 7, 5)$ BCH code of [[information-theory/cyclic-codes]], with $8$ parity bits. (The non-linear Nordstrom–Robinson code, punctured to length $15$, does have $256$ codewords and distance $5$.)
:::
:::

::: exercise The dual of the Hamming code {level=2}
Show that the dual of the $(7, 4)$ Hamming code — the $(7, 3)$ code generated by $H$ — has every non-zero codeword of weight $4$. What is its minimum distance, and how many errors does it correct?
::: solution
The codewords are the $8$ sums of subsets of the rows of $H$: $\mathbf 0$, the three rows $1101100$, $1011010$, $0111001$ (weight $4$ each), the three pairwise sums $0110110$, $1010101$, $1100011$ (weight $4$), and the sum of all three, $0001111$ (weight $4$). All non-zero weights equal $4$, so $d_{\min} = 4$: it corrects one error and detects two. This is the **simplex code**: its codewords are the vertices of a regular simplex in Hamming space, and its extended version is a first-order Reed–Muller code.
:::
:::

::: exercise SECDED for 32-bit words {level=3 check="39"}
::: hint
Find the least $r$ with $2^r \ge 32 + r + 1$, then add one bit.
:::
Design a SECDED code for $32$-bit data words: give its length $n$, explain how it is obtained from a Hamming code, and state its overhead.
::: solution
$r = 5$: $32 \ge 38$? No. $r = 6$: $64 \ge 39$, yes. Shorten the $(63, 57)$ Hamming code by $25$ positions to $(38, 32, 3)$ and extend it with an overall parity bit: a $(39, 32, 4)$ SECDED code, $7$ check bits, an overhead of $21.9\,\%$ — higher than the $12.5\,\%$ of the $(72, 64)$ code, because the number of check bits grows only logarithmically with the word length.
:::
:::

::: exercise The Singleton bound and binary MDS codes {level=3}
::: hint
Write the generator in systematic form $G = [I_k \mid P]$ and ask what weight each row of $P$ must have.
:::
Show that the repetition code $(n, 1, n)$ and the single parity-check code $(n, n - 1, 2)$ meet the Singleton bound with equality. Then argue that a binary code with $2 \le k \le n - 2$ cannot be MDS.
::: solution
Repetition: $n - k + 1 = n = d$. Single parity: $n - (n - 1) + 1 = 2 = d$. Now suppose a binary $(n, k)$ code with $2 \le k \le n - 2$ has $d = n - k + 1$, and write its generator in systematic form $G = [I_k \mid P]$ (column permutations do not change distances). Row $i$ of $G$ is a codeword of weight $1 + w(\mathbf p_i)$, where $\mathbf p_i$ is row $i$ of $P$, which has length $n - k$. It must be at least $n - k + 1$, so $\mathbf p_i$ is all ones — for every row. Then rows $1$ and $2$ of $G$ sum to a codeword with ones in positions $1$ and $2$ and $\mathbf p_1 + \mathbf p_2 = \mathbf 0$ elsewhere: weight $2$, which is less than $n - k + 1$ because $n - k \ge 2$. This contradiction shows no such code exists. Larger alphabets escape this argument because two non-zero symbols need not cancel, and Reed–Solomon codes are MDS.
:::
:::

::: exercise Golay coding gain {level=3}
::: hint
Use $p = Q(\sqrt{2RE_b/N_0})$ with $R = 12/23$ and the block-error formula with $t = 3$; the code is perfect, so it is exact for blocks.
:::
For the $(23, 12)$ Golay code with hard decisions, compute the channel crossover probability and the block error probability at $E_b/N_0 = 8\,\mathrm{dB}$, and compare the decoded bit error rate (approximate formula) with uncoded BPSK.
::: solution
$E_c/N_0 = \tfrac{12}{23}\times6.31 = 3.29$, $p = Q(\sqrt{6.58}) = Q(2.57) = 5.1\times10^{-3}$. The block error probability is $P_{\text{block}} = \sum_{i\ge4}\binom{23}ip^i(1 - p)^{23-i} \approx \binom{23}4p^4(1 - p)^{19} = 8855\times7.0\times10^{-10}\times0.91 = 5.6\times10^{-6}$ (the full sum gives $5.7\times10^{-6}$). The bit error rate is about $\tfrac{4 + 3}{23}P_{\text{block}} = 1.7\times10^{-6}$, against $1.9\times10^{-4}$ uncoded — over a hundred times better, consistent with the gain of about $2\,\mathrm{dB}$ at $10^{-5}$ seen in the figure.
:::
:::
