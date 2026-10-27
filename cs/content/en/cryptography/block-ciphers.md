When your browser fetches a web page over TLS, the page is almost certainly encrypted with AES — the Advanced Encryption Standard — in a mode called GCM. AES is a **block cipher**: under a 128-bit key it maps each 128-bit block of input to a 128-bit block of output, and nothing more. A web page is not 128 bits long, the same page may be fetched twice, and an attacker on the network may be able to make your browser encrypt data of the attacker's choosing. Getting from "a keyed permutation of 128-bit blocks" to "secure encryption of arbitrary messages against an active attacker" is the job of a **mode of operation**, and getting it wrong is one of the most common ways that real systems with perfectly good ciphers have failed.

This chapter has two halves. The first looks inside block ciphers: what they are meant to be (strong pseudorandom permutations, [[cryptography/computational-security#def-prp]]), how they are built from simple rounds — Feistel networks and substitution–permutation networks — and how DES and AES work. The second defines security against **chosen-plaintext attacks** (CPA) and **chosen-ciphertext attacks** (CCA), shows why deterministic encryption fails, and analyses the standard modes ECB, CBC, CTR and GCM. As always, the toy ciphers in this chapter are for understanding only; real programs should call a vetted library's authenticated-encryption interface.

## What a block cipher is

::: definition Block cipher {#def-block-cipher}
A **block cipher** with key length $\kappa$ and block length $n$ is an efficiently computable function $F\colon \{0,1\}^\kappa \times \{0,1\}^n \to \{0,1\}^n$ such that for every key $k$ the map $F_k = F(k, \cdot)$ is a permutation of $\{0,1\}^n$ and $F_k^{-1}$ is also efficiently computable given $k$. It is **secure** if it behaves as a strong pseudorandom permutation: no efficient distinguisher with oracle access to $F_k$ and $F_k^{-1}$ for a uniform key can tell them from a uniformly random permutation $\pi$ and its inverse.
:::

For a concrete cipher, $\kappa$ and $n$ are fixed (AES: $n = 128$, $\kappa \in \{128, 192, 256\}$), so "efficient" and "negligible" are read concretely: the best attack should cost about $2^\kappa$ operations, the price of trying every key, and should not distinguish with fewer than about $2^{n/2}$ blocks, where the switching lemma ([[cryptography/computational-security#lem-switching]]) takes over. A block cipher is not an encryption scheme: it is deterministic, and it handles one block. It is a building block — a primitive — and its security is an assumption backed by public cryptanalysis rather than a theorem.

How do we build a permutation that looks random? Shannon (1949) named the two ingredients. **Confusion** makes the relation between key and ciphertext complicated, by nonlinear substitutions. **Diffusion** spreads the influence of each input bit over the whole block, by linear mixing, so that changing one input bit changes about half the output bits (the **avalanche effect**). Neither alone suffices; alternating them over many **rounds**, each mixing in a **round key** derived from the master key by a **key schedule**, does.

## Feistel networks and DES

A **Feistel network** turns any functions — not necessarily invertible ones — into a permutation. Split the block into halves $(L, R)$. One round, with a **round function** $f_i$ that depends on the round key, maps
$$
(L_{i-1}, R_{i-1}) \mapsto (L_i, R_i) = \big(R_{i-1},\ L_{i-1} \oplus f_i(R_{i-1})\big).
$$

::: proposition Feistel rounds are invertible {#prop-feistel}
For any functions $f_1, \dots, f_r$ from $\{0,1\}^{n/2}$ to itself, the $r$-round Feistel network is a permutation of $\{0,1\}^n$, and its inverse is computed by running the rounds in reverse order with $(L_{i-1}, R_{i-1}) = \big(R_i \oplus f_i(L_i),\ L_i\big)$.
:::

::: proof
It suffices to invert one round. Given $(L_i, R_i) = (R_{i-1}, L_{i-1} \oplus f_i(R_{i-1}))$, we read off $R_{i-1} = L_i$ and then $L_{i-1} = R_i \oplus f_i(R_{i-1}) = R_i \oplus f_i(L_i)$, since $x \oplus y \oplus y = x$. So each round is a bijection with the stated inverse, and a composition of bijections is a bijection whose inverse applies the inverses in reverse order. Note that $f_i$ itself is only ever evaluated forwards.
:::

Luby and Rackoff (1988) proved that the Feistel network with three rounds, whose round functions are independent pseudorandom functions, is a pseudorandom permutation, and with four rounds a strong one. One or two rounds are not ([[#ex-feistel-rounds]]).

::: example A toy Feistel cipher {#ex-toy-feistel}
Use an 8-bit block with 4-bit halves, the round function $f_k(R) = S[R \oplus k]$ with the 4-bit S-box
$S = [\texttt{c},\texttt{5},\texttt{6},\texttt{b},\texttt{9},\texttt{0},\texttt{a},\texttt{d},\texttt{3},\texttt{e},\texttt{f},\texttt{8},\texttt{4},\texttt{7},\texttt{1},\texttt{2}]$ (in hexadecimal; it is the S-box of the lightweight cipher PRESENT), and three round keys $\texttt{3}, \texttt{a}, \texttt{6}$. Encrypt `0x4b`, and decrypt the result.
::: solution
Start with $L_0 = \texttt{4}$, $R_0 = \texttt{b}$. In each round, $R \oplus k$ indexes the S-box, and the new right half is the old left half XORed with the S-box output:

| round | $L$ | $R$ | $k$ | $R \oplus k$ | $S[R \oplus k]$ | new $(L, R)$ |
|---|---|---|---|---|---|---|
| 1 | 4 | b | 3 | 8 | 3 | (b, 4 ⊕ 3 = 7) |
| 2 | b | 7 | a | d | 7 | (7, b ⊕ 7 = c) |
| 3 | 7 | c | 6 | a | f | (c, 7 ⊕ f = 8) |

The ciphertext is `0xc8`. To decrypt, run the rounds backwards with $(L, R) \mapsto (R \oplus f_k(L), L)$: from $(\texttt{c}, \texttt{8})$ with $k = \texttt{6}$, $S[\texttt{c} \oplus \texttt{6}] = S[\texttt{a}] = \texttt{f}$ gives $(\texttt{8} \oplus \texttt{f}, \texttt{c}) = (\texttt{7}, \texttt{c})$; then $k = \texttt{a}$ gives $(\texttt{c} \oplus S[\texttt{d}], \texttt{7}) = (\texttt{b}, \texttt{7})$; then $k = \texttt{3}$ gives $(\texttt{7} \oplus S[\texttt{8}], \texttt{b}) = (\texttt{4}, \texttt{b})$, that is `0x4b`.

```python
S = [0xC, 5, 6, 0xB, 9, 0, 0xA, 0xD, 3, 0xE, 0xF, 8, 4, 7, 1, 2]

def feistel_enc(x, keys):                  # toy 8-bit cipher: insecure, for study only
    L, R = x >> 4, x & 0xF
    for k in keys:
        L, R = R, L ^ S[R ^ k]
    return (L << 4) | R

def feistel_dec(y, keys):
    L, R = y >> 4, y & 0xF
    for k in reversed(keys):
        L, R = R ^ S[L ^ k], L
    return (L << 4) | R

keys = [0x3, 0xA, 0x6]
y = feistel_enc(0x4B, keys)
print(hex(y), hex(feistel_dec(y, keys)))
print(sorted(feistel_enc(v, keys) for v in range(256)) == list(range(256)))
```

```console
$ python3 feistel.py
0xc8 0x4b
True
```

The last line confirms that the 256 inputs map to 256 distinct outputs: a permutation, as [[#prop-feistel]] promises. With an 8-bit block and 12 bits of key the cipher is hopeless, of course — an attacker can tabulate it.
:::
:::

::: widget permutation
perm: 9 6 15 4 8 11 2 13 14 1 12 7 3 16 5 10
second: 12 7 14 1 5 10 3 16 15 4 9 6 2 13 8 11
caption: A three-round Feistel cipher on 4-bit blocks (2-bit halves, S-box $[3,0,2,1]$), with block value $v$ drawn as $v + 1$. The first permutation is the cipher under round keys $1, 2, 3$, the second under $2, 0, 1$. Each key selects one permutation of the $16$ blocks; a secure block cipher should make the permutation selected by a secret key look like one chosen uniformly from all $16! \approx 2 \times 10^{13}$. Look at the cycle structures and the composition of the two keys.
:::

**DES**, the Data Encryption Standard (FIPS 46, 1977), developed at IBM from Horst Feistel's Lucifer with modifications by the NSA, is a 16-round Feistel network on 64-bit blocks with a 56-bit key. Its round function expands the 32-bit half to 48 bits, XORs a round key, passes the result through eight S-boxes that each map 6 bits to 4, and permutes the 32 output bits. DES withstood decades of analysis remarkably well — differential cryptanalysis, published by Biham and Shamir around 1990, needs $2^{47}$ chosen plaintexts, and its designers had evidently known of it — but its key was always too short. In 1998 the Electronic Frontier Foundation's purpose-built machine found a DES key by exhaustive search in 56 hours. **Triple DES** ($E_{k_1} \circ D_{k_2} \circ E_{k_3}$) lengthened the key but kept the 64-bit block, whose birthday bound of $2^{32}$ blocks is too small for modern data volumes; NIST deprecated it and disallowed it for encryption after 2023.

## Substitution–permutation networks and AES

A **substitution–permutation network** (SPN) applies to the whole block, in each round: XOR with a round key, a layer of small invertible S-boxes in parallel (confusion), and an invertible linear mixing layer (diffusion). Unlike a Feistel network, every component must be invertible, and decryption applies the inverse components in reverse order.

**AES** is the SPN Rijndael, designed by Joan Daemen and Vincent Rijmen and chosen by NIST in 2000 after an open, worldwide, three-year competition (FIPS 197, 2001). It views the 128-bit state as a $4 \times 4$ array of bytes and performs $10$, $12$ or $14$ rounds for 128-, 192- or 256-bit keys. Each round applies

1. **SubBytes**: the same 8-bit S-box to each of the 16 bytes;
2. **ShiftRows**: row $i$ of the array is rotated left by $i$ positions;
3. **MixColumns**: each column, viewed as a vector of four bytes, is multiplied by a fixed invertible $4 \times 4$ matrix (omitted in the last round);
4. **AddRoundKey**: XOR with a 128-bit round key from the key schedule.

The arithmetic is in the finite field $\mathrm{GF}(2^8)$ of $256$ elements ([Maths Atlas: finite fields](/learn/maths/lesson.php?c=abstract-algebra&l=fields-galois)). A byte $b_7 \dots b_0$ is the polynomial $b_7x^7 + \dots + b_0$ with coefficients in $\{0, 1\}$; addition is XOR; multiplication is polynomial multiplication modulo the irreducible polynomial $x^8 + x^4 + x^3 + x + 1$ (hex `0x11b`). The S-box maps a byte to its multiplicative inverse in this field (with $0 \mapsto 0$), followed by a fixed affine map over $\mathrm{GF}(2)$. Inversion is highly nonlinear, which defeats linear and differential cryptanalysis; the affine map removes the fixed points $0 \mapsto 0$ and $1 \mapsto 1$. MixColumns is chosen so that any change in $k$ input bytes of a column changes at least $5 - k$ output bytes; with ShiftRows, two rounds spread every input byte over the whole state.

::: example Multiplying in the AES field {#ex-gf256}
Compute `0x57` $\cdot$ `0x83` in $\mathrm{GF}(2^8)$, and check that the inverse of `0x53` is `0xca`.
::: solution
`0x57` $= x^6 + x^4 + x^2 + x + 1$ and `0x83` $= x^7 + x + 1$. Their product over $\mathrm{GF}(2)$ (coefficients added mod 2) is
$$
x^{13} + x^{11} + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + 1 .
$$
Reduce modulo $x^8 + x^4 + x^3 + x + 1$, using $x^8 \equiv x^4 + x^3 + x + 1$: the result is $x^7 + x^6 + 1$, which is `0xc1`. A program does the same by "shift and add, reducing whenever a bit spills past $x^7$":

```python
def gmul(a, b):
    """Multiply bytes a, b in GF(2^8) modulo x^8 + x^4 + x^3 + x + 1."""
    r = 0
    while b:
        if b & 1:
            r ^= a            # add (XOR) the current multiple of a
        a <<= 1               # multiply a by x
        if a & 0x100:
            a ^= 0x11B        # reduce modulo the AES polynomial
        b >>= 1
    return r

print(hex(gmul(0x57, 0x83)), hex(gmul(0x53, 0xCA)))
```

```console
$ python3 gf256.py
0xc1 0x1
```

`0x53` $\cdot$ `0xca` $= 1$, so `0xca` is the inverse of `0x53`. Applying the S-box's affine map to `0xca` gives `0xed`, the AES S-box value for `0x53` (both are the worked examples of FIPS 197).
:::
:::

As of 2026 the best published key-recovery attacks on full AES (biclique attacks, 2011) are only marginally faster than exhaustive search, and no practical distinguisher is known; AES is assumed to be a strong PRP. Its real-world weaknesses have come from implementations: table-based software can leak key bytes through cache timing, which is why modern processors provide AES instructions that run in constant time, and why you should use a library that uses them.

## Chosen-plaintext security

An eavesdropper who sees one ciphertext is a weak adversary. In practice an attacker can often influence what is encrypted: a web page can make your browser send requests containing attacker-chosen text alongside your secret cookie, and in the Second World War, Allied codebreakers "gardened" — laid mines in a particular location so that the German report of it would contain a known word. The definition gives the adversary an **encryption oracle**.

::: definition CPA-security {#def-cpa}
In the experiment $\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \Pi}(n)$ a key $k \gets \mathsf{Gen}(1^n)$ is chosen; the adversary $\mathcal A$ receives oracle access to $\mathsf{Enc}_k(\cdot)$ and outputs $m_0, m_1$ of equal length; it receives $c \gets \mathsf{Enc}_k(m_b)$ for uniform $b$; it continues to have oracle access; it outputs $b'$ and succeeds if $b' = b$. $\Pi$ is **CPA-secure** if every PPT adversary succeeds with probability at most $\tfrac12 + \mathsf{negl}(n)$.
:::

CPA-security implies security when many messages are encrypted under one key (the adversary can obtain the other encryptions itself). And it rules out every deterministic scheme.

::: proposition Deterministic encryption is not CPA-secure {#prop-det-cpa}
If $\mathsf{Enc}$ is deterministic, the scheme is not CPA-secure.
:::

::: proof
The adversary chooses any distinct $m_0, m_1$ of equal length, queries the oracle on $m_0$ to obtain $c_0 = \mathsf{Enc}_k(m_0)$, and outputs $b' = 0$ if the challenge equals $c_0$ and $b' = 1$ otherwise. Because encryption is deterministic and decryption is correct ($\mathsf{Enc}_k(m_1) \ne c_0$), it always succeeds.
:::

So a secure scheme must be **randomised** (or keep state, such as a counter): encrypting the same message twice must give different ciphertexts. The simplest construction uses a fresh random input to a PRF.

::: theorem Randomised PRF encryption is CPA-secure {#thm-prf-cpa}
Let $F$ be a PRF on $n$-bit strings. For $m \in \{0,1\}^n$ let $\mathsf{Enc}_k(m) = \langle r,\ F_k(r) \oplus m\rangle$ for a fresh uniform $r \in \{0,1\}^n$, and $\mathsf{Dec}_k(\langle r, s\rangle) = F_k(r) \oplus s$. If $\mathcal A$ makes at most $q(n)$ queries to its encryption oracle, then
$$
\Prob\big[\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \Pi}(n) = 1\big] \le \frac12 + \frac{q(n)}{2^n} + \mathsf{negl}(n).
$$
:::

::: proof
Let $\tilde\Pi$ be the same scheme with $F_k$ replaced by a uniformly random function $f$. *Step 1: $\mathcal A$ cannot tell $\Pi$ from $\tilde\Pi$.* Build a PRF distinguisher $D^O$ that runs $\mathcal A$, answers each encryption query $m$ by choosing $r$ and returning $\langle r, O(r) \oplus m\rangle$, encrypts the challenge the same way, and outputs $1$ iff $\mathcal A$ guesses $b$. With $O = F_k$ it simulates $\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \Pi}$; with $O = f$ it simulates the same experiment for $\tilde\Pi$. So the two success probabilities differ by $D$'s advantage, which is negligible.

*Step 2: in $\tilde\Pi$, $\mathcal A$ succeeds with probability at most $\tfrac12 + q/2^n$.* Let $r^*$ be the randomness of the challenge ciphertext $\langle r^*, f(r^*) \oplus m_b\rangle$, and let $\mathsf{Repeat}$ be the event that some oracle query used the same $r^*$. Since $r^*$ is uniform and independent of the at most $q$ values used by the oracle, $\Prob[\mathsf{Repeat}] \le q/2^n$. If $\mathsf{Repeat}$ does not occur, then $f(r^*)$ is a uniform string independent of everything else $\mathcal A$ sees — a random function's value at a new point — so the challenge is a one-time-pad encryption of $m_b$ and $\mathcal A$ guesses $b$ with probability exactly $\tfrac12$. Hence success $\le \Prob[\mathsf{Repeat}] + \tfrac12$. Combining the steps proves the bound; $q/2^n$ is negligible for polynomial $q$.
:::

This scheme doubles the length of each block. Modes of operation do better.

## Modes of operation

Let $F$ be a block cipher with block length $n$ and let the message be $m = m_1 m_2 \dots m_\ell$ in $n$-bit blocks (with padding, if needed, to fill the last block).

### ECB: the mode not to use

**Electronic codebook** mode encrypts each block independently: $c_i = F_k(m_i)$. It is deterministic, so by [[#prop-det-cpa]] it is not CPA-secure; worse, it is not even EAV-secure for messages of two or more blocks, because equal plaintext blocks give equal ciphertext blocks *within* one message. The famous illustration is a bitmap image encrypted in ECB mode, in which the outline of the picture remains plainly visible, because large regions of identical pixels encrypt to identical blocks. ECB should never be used to encrypt data.

### CBC: cipher block chaining

**CBC** mode chooses a uniform **initialisation vector** $\mathit{IV} = c_0 \in \{0,1\}^n$ and sets
$$
c_i = F_k(c_{i-1} \oplus m_i) \quad (i = 1, \dots, \ell), \qquad m_i = F_k^{-1}(c_i) \oplus c_{i-1}.
$$
The ciphertext is $c_0 c_1 \dots c_\ell$. Chaining makes each block depend on all earlier ones, and the random $\mathit{IV}$ makes encryption randomised. Bellare, Desai, Jokipii and Rogaway (1997) proved that CBC is CPA-secure if $F$ is a PRP, with an advantage bound of order $(q\ell)^2/2^n$ for $q$ messages of $\ell$ blocks. CBC needs $F^{-1}$ to decrypt, so $F$ must be a permutation; encryption is sequential, though decryption can be parallelised. Two things go wrong in practice. The $\mathit{IV}$ must be *unpredictable*: if the attacker can predict the $\mathit{IV}$ of the next encryption, it can choose a plaintext block that tests a guess about an earlier block ([[#ex-predictable-iv]]) — TLS 1.0 used the last block of the previous record as the next $\mathit{IV}$, and TLS 1.1 (2006) switched to explicit random $\mathit{IV}$s for this reason. And CBC needs padding, which leads to padding-oracle attacks, discussed under CCA below.

### CTR: counter mode

**Counter** mode turns the block cipher into a stream cipher. Choose a uniform $\mathit{ctr} \in \{0,1\}^n$ and set
$$
c_0 = \mathit{ctr}, \qquad c_i = m_i \oplus F_k\big(\mathit{ctr} + i \bmod 2^n\big) \quad (i = 1, \dots, \ell).
$$
Decryption computes the same pad and XORs again, so $F$ need not be invertible — a PRF suffices. Both directions are fully parallelisable, the pad can be precomputed, and no padding is needed (truncate the last pad block).

::: example ECB, CBC and CTR side by side {#ex-modes}
Encrypt the three-block message `41 41 42` (bytes, with one-byte "blocks") using the toy cipher of [[#ex-toy-feistel]] in ECB mode, in CBC mode with $\mathit{IV} = $ `9c`, and in CTR mode with $\mathit{ctr} = $ `f1`. Then decrypt the CBC ciphertext.
::: solution
A short program computes all three with the functions of [[#ex-toy-feistel]]:

```python
m = [0x41, 0x41, 0x42]
print("ECB", [hex(feistel_enc(b, keys)) for b in m])

prev, cbc = 0x9C, []                              # CBC with IV = 0x9c
for b in m:
    prev = feistel_enc(b ^ prev, keys)
    cbc.append(prev)
print("CBC", [hex(c) for c in cbc])

pads = [feistel_enc((0xF1 + i) % 256, keys) for i in (1, 2, 3)]
print("CTR", [hex(p) for p in pads], [hex(p ^ b) for p, b in zip(pads, m)])
```

```console
$ python3 modes.py
ECB ['0x2b', '0x2b', '0xa5']
CBC ['0x79', '0xd3', '0x12']
CTR ['0xe9', '0xdb', '0x77'] ['0xa8', '0x9a', '0x35']
```

ECB gives `2b 2b a5`: the repeated plaintext block shows up as a repeated ciphertext block. CBC gives `9c 79 d3 12` and CTR gives `f1 a8 9a 35` (the first byte being the $\mathit{IV}$ or counter): no repetition, because each block was masked differently. To decrypt CBC, $m_1 = F_k^{-1}(\texttt{79}) \oplus \texttt{9c}$, $m_2 = F_k^{-1}(\texttt{d3}) \oplus \texttt{79}$, $m_3 = F_k^{-1}(\texttt{12}) \oplus \texttt{d3}$; running `feistel_dec` gives `41 41 42` again. With one-byte blocks the counter would repeat after 256 blocks, which is exactly what a real 128-bit block prevents.
:::
:::

::: theorem CTR mode is CPA-secure {#thm-ctr-cpa}
Let $F$ be a PRF. For an adversary that makes $q$ encryption queries, each — like the challenge — of at most $\ell$ blocks, randomised CTR mode satisfies
$$
\Prob\big[\mathsf{PrivK}^{\mathsf{cpa}}_{\mathcal A, \mathrm{CTR}}(n) = 1\big] \le \frac12 + \frac{2q\ell}{2^n} + \mathsf{negl}(n).
$$
:::

::: proof
As in [[#thm-prf-cpa]], replacing $F_k$ by a random function $f$ changes the success probability by a negligible amount (the reduction answers queries by computing the pad with its oracle). Now consider the random-function experiment. Let the challenge use counter $\mathit{ctr}^*$ and $\ell^*$ blocks, so its pad is $f$ evaluated on the inputs $\mathit{ctr}^* + 1, \dots, \mathit{ctr}^* + \ell^*$ (mod $2^n$), and let oracle query $i$ use $\mathit{ctr}_i$ and $\ell_i$ blocks. Let $\mathsf{Overlap}$ be the event that some input $\mathit{ctr}_i + j$ ($1 \le j \le \ell_i$) of an oracle query equals some input $\mathit{ctr}^* + j'$ ($1 \le j' \le \ell^*$) of the challenge.

If $\mathsf{Overlap}$ does not occur, the pad of the challenge consists of values of $f$ at points never evaluated elsewhere, so it is uniform and independent of everything else the adversary sees; the challenge is a one-time pad and the adversary succeeds with probability exactly $\tfrac12$. So success $\le \tfrac12 + \Prob[\mathsf{Overlap}]$.

For a fixed query $i$, the two runs of consecutive inputs overlap only if $\mathit{ctr}^* - \ell_i + 1 \le \mathit{ctr}_i \le \mathit{ctr}^* + \ell^* - 1$ (mod $2^n$), which is a set of $\ell^* + \ell_i - 1 < 2\ell$ values. Whichever of $\mathit{ctr}_i$ and $\mathit{ctr}^*$ is chosen later is uniform and independent of the other, so this has probability less than $2\ell/2^n$. The union bound over the $q$ queries gives $\Prob[\mathsf{Overlap}] < 2q\ell/2^n$.
:::

::: widget plot
f: 2^(x + L + 1 - n)
x: 0, 70
y: 0, 1
sliders: L=0:1:32; n=64:64:128
labels: 2q\ell/2^n
caption: The CTR bound $2q\ell/2^n$ against $\log_2 q$, for messages of $2^L$ blocks and block length $n$. With $n = 64$ (an old 64-bit block cipher) and $2^{10}$-block messages, the bound reaches $1$ after only about $2^{53}$ messages — fewer if messages are longer. With $n = 128$ the curve stays at zero across the whole plot. The bound is a budget: keys must be changed long before it is used up.
:::

::: warning Never reuse a nonce or counter with the same key
Many deployments of CTR and GCM do not choose $\mathit{ctr}$ at random but take a **nonce** ("number used once") supplied by the caller — a message number, say — and the security proof then needs every nonce under a key to be distinct. If one is repeated, two messages are encrypted with the same pad, and $c \oplus c' = m \oplus m'$: the two-time pad of [[cryptography/perfect-secrecy]]. For GCM the damage is worse, because a repeated nonce also leaks the authentication subkey and lets an attacker forge messages. Nonce reuse is a classic implementation bug: counters reset after a reboot, two devices share a key, or random 96-bit nonces are drawn so often that a birthday collision becomes likely. Use a library API that generates nonces for you or a **nonce-misuse-resistant** mode such as AES-GCM-SIV (RFC 8452), and never hand-roll a mode.
:::

### GCM: Galois/counter mode

GCM (McGrew and Viega, 2004; NIST SP 800-38D, 2007) is CTR mode with a 96-bit nonce, combined with a fast authenticator, GHASH, which evaluates a polynomial in $\mathrm{GF}(2^{128})$ at a secret point $H = F_k(0^{128})$ whose coefficients are the ciphertext blocks. The result is **authenticated encryption**: the receiver can verify that the ciphertext was produced by someone with the key, as [[cryptography/hash-mac]] explains. As of 2026, AES-GCM and ChaCha20-Poly1305 are the authenticated-encryption algorithms of TLS 1.3. This is not a detail: encryption *without* authentication is vulnerable to active attackers, as we now see.

::: quiz
Which of these modes is CPA-secure when used as specified with a secure block cipher? (Select all that apply.)

- [ ] ECB
- [x] CBC with a uniformly random IV for each message
- [ ] CBC whose IV is the last ciphertext block of the previous message
- [x] CTR with a uniformly random initial counter for each message
::: solution
ECB is deterministic ([[#prop-det-cpa]]). CBC with a predictable IV — as when it is chained from the previous message — falls to a chosen-plaintext attack ([[#ex-predictable-iv]]). CBC with random IVs and randomised CTR ([[#thm-ctr-cpa]]) are CPA-secure.
:::
:::

## Chosen-ciphertext attacks

An active attacker can also send modified ciphertexts to the receiver and observe its reaction — a decryption result, an error message, a delay. The strongest standard definition gives the adversary a **decryption oracle** as well.

::: definition CCA-security {#def-cca}
The experiment $\mathsf{PrivK}^{\mathsf{cca}}_{\mathcal A, \Pi}(n)$ is $\mathsf{PrivK}^{\mathsf{cpa}}$ in which $\mathcal A$ also has oracle access to $\mathsf{Dec}_k(\cdot)$ throughout, except that it may not ask for the decryption of the challenge ciphertext $c$ itself. $\Pi$ is **CCA-secure** if every PPT adversary succeeds with probability at most $\tfrac12 + \mathsf{negl}(n)$.
:::

The restriction is necessary — otherwise the game is trivial — and it is the only one: the adversary may ask about ciphertexts that differ from $c$ in a single bit. That is enough to break every mode in this chapter except GCM, because they are **malleable**: a change to the ciphertext causes a predictable change to the plaintext. In CTR mode, flipping bit $j$ of $c_i$ flips bit $j$ of $m_i$; the adversary flips a bit of the challenge, asks for its decryption (a different ciphertext, so allowed), flips the bit back, and reads $m_b$ ([[#ex-ctr-cca]]).

The decryption oracle may seem artificial, but real systems provide partial ones. In a **padding-oracle attack** (Vaudenay, 2002) on CBC with the common PKCS#7 padding (the last block is filled with $p$ bytes of value $p$), the receiver reveals — by a distinct error message, or just by responding faster — whether a modified ciphertext decrypts to correctly padded data. Because changing $c_{i-1}$ changes $m_i$ in a controlled way, that one bit of information per query is enough to recover the plaintext a byte at a time. The defence is not a better error message but a design that rejects every modified ciphertext before decrypting it: **authenticated encryption**, which is CCA-secure ([[cryptography/hash-mac]]).

::: example PKCS#7 padding and its check {#ex-pkcs7}
With 16-byte blocks, pad the 13-byte message `HELLO, WORLD!` and the 16-byte message `YELLOW SUBMARINE` with PKCS#7, and say which of the final blocks `… 04 04 04 04` and `… 04 04 03 04` a receiver accepts.
::: solution
PKCS#7 appends $p$ bytes of value $p$, where $1 \le p \le 16$ is chosen to reach a multiple of the block length; a message that already fills its last block gets a whole extra block. So `HELLO, WORLD!` ($13$ bytes) gets `03 03 03`, and `YELLOW SUBMARINE` ($16$ bytes) gets sixteen bytes `10` (hex for $16$), so that the receiver can always strip padding unambiguously by reading the last byte:

```python
def pad(m: bytes, n: int = 16) -> bytes:
    p = n - len(m) % n                     # 1..n bytes, never 0
    return m + bytes([p]) * p

def unpad_ok(b: bytes) -> bool:
    p = b[-1]
    return 1 <= p <= len(b) and b[-p:] == bytes([p]) * p

print(pad(b"HELLO, WORLD!").hex(" ")[-8:], len(pad(b"YELLOW SUBMARINE")))
print(unpad_ok(b"x" * 12 + bytes([4, 4, 4, 4])), unpad_ok(b"x" * 12 + bytes([4, 4, 3, 4])))
```

```console
$ python3 pkcs7.py
03 03 03 32
True False
```

The first line shows the three padding bytes of the first message. The first final block is valid (four bytes `04`) and the second is not. In CBC mode an attacker who modifies $c_{i-1}$ controls the XOR applied to $m_i$, and a receiver that reports "bad padding" differently from other errors answers, for each modified ciphertext, the question "does the last block end in valid padding?". That one bit per query is the padding oracle. (The `32` on the first output line is the length of the padded second message: two full blocks.)
:::
:::

::: quiz
A server decrypts AES-CBC messages and returns "padding error" or "MAC error" as appropriate, checking the MAC of the *plaintext* after removing the padding. Which change removes the padding oracle?

- [ ] Return the same error string for both failures.
- [ ] Use PKCS#7 padding instead of zero padding.
- [x] Compute a MAC over the IV and ciphertext and verify it, in constant time, before decrypting at all.
- [ ] Use a 256-bit AES key.
::: solution
Identical error strings still leave differences in timing (the MAC is only computed when the padding is valid), which attackers have exploited. The robust fix is encrypt-then-MAC: verify a MAC over the whole ciphertext first and reject any modified ciphertext without decrypting it ([[cryptography/hash-mac]]). Better still, use an authenticated-encryption mode such as GCM through a library. Key length is irrelevant.
:::
:::

::: history
The modes ECB, CBC, CFB and OFB were standardised with DES in FIPS 81 (1980); CBC was patented by Ehrsam, Meyer, Smith and Tuchman of IBM in 1976, and counter mode was suggested by Diffie and Hellman in 1979. Horst Feistel's Lucifer cipher at IBM (early 1970s) became DES, published as FIPS 46 in 1977. Michael Luby and Charles Rackoff proved the security of the Feistel construction in 1988. Eli Biham and Adi Shamir published differential cryptanalysis around 1990, and Mitsuru Matsui linear cryptanalysis in 1993; the EFF's "Deep Crack" machine found a DES key in 56 hours in 1998. NIST's AES competition (1997–2000) chose Rijndael by Joan Daemen and Vincent Rijmen, published as FIPS 197 in 2001. Bellare, Desai, Jokipii and Rogaway (1997) gave the first concrete-security analysis of CBC and CTR; Serge Vaudenay described padding-oracle attacks in 2002; and David McGrew and John Viega designed GCM in 2004.
:::

## Where this leads

Every mode here protects confidentiality only. [[cryptography/hash-mac]] adds integrity with message authentication codes — CBC-MAC and HMAC — and combines the two into authenticated encryption, proving that encrypt-then-MAC is CCA-secure and explaining GCM's authenticator. The CPA and CCA games carry over to public-key encryption in [[cryptography/public-key]], where the adversary can encrypt on its own and CCA-security needs constructions such as RSA-OAEP. TLS, which uses AES-GCM or ChaCha20-Poly1305 for its record layer, is described in [[cryptography/protocols]] and, from the networking side, in [[networks/application-layer]]. Side channels, such as cache-timing attacks on table-based AES, belong to [[security]].

::: summary
- A **block cipher** is a keyed permutation of $n$-bit blocks, modelled as a strong PRP ([[#def-block-cipher]]); its security is an assumption backed by cryptanalysis.
- **Feistel networks** make permutations from any round functions ([[#prop-feistel]]); DES is a 16-round Feistel cipher with a 56-bit key, now broken by exhaustive search. **AES** is a substitution–permutation network over $\mathrm{GF}(2^8)$ with 128-bit blocks and 128/192/256-bit keys.
- **CPA-security** gives the adversary an encryption oracle ([[#def-cpa]]); deterministic schemes cannot meet it ([[#prop-det-cpa]]). Randomised PRF encryption ([[#thm-prf-cpa]]), CBC with random IVs and randomised **CTR** mode ([[#thm-ctr-cpa]], bound $2q\ell/2^n$) are CPA-secure; **ECB** is not even EAV-secure.
- IVs must be unpredictable (CBC) and nonces must never repeat under a key (CTR, GCM): a repeated CTR nonce is a two-time pad.
- **CCA-security** adds a decryption oracle ([[#def-cca]]); CBC and CTR are malleable and fail it, which is the root of padding-oracle attacks. Authenticated encryption (GCM, encrypt-then-MAC) is the fix.
- Use a vetted library's authenticated-encryption API; never write your own cipher or mode.
:::

## Exercises

::: exercise Decrypting the toy cipher {level=1}
Using the toy Feistel cipher of [[#ex-toy-feistel]] with round keys `3, a, 6`, decrypt `0xc8` by hand, showing the state after each inverse round.
::: solution
Start from $(L, R) = (\texttt{c}, \texttt{8})$ and apply $(L, R) \mapsto (R \oplus S[L \oplus k], L)$ with $k = \texttt{6}, \texttt{a}, \texttt{3}$ in turn. $k = \texttt{6}$: $L \oplus k = \texttt{a}$, $S[\texttt{a}] = \texttt{f}$, new state $(\texttt{8} \oplus \texttt{f}, \texttt{c}) = (\texttt{7}, \texttt{c})$. $k = \texttt{a}$: $\texttt{7} \oplus \texttt{a} = \texttt{d}$, $S[\texttt{d}] = \texttt{7}$, new state $(\texttt{c} \oplus \texttt{7}, \texttt{7}) = (\texttt{b}, \texttt{7})$. $k = \texttt{3}$: $\texttt{b} \oplus \texttt{3} = \texttt{8}$, $S[\texttt{8}] = \texttt{3}$, new state $(\texttt{7} \oplus \texttt{3}, \texttt{b}) = (\texttt{4}, \texttt{b})$. The plaintext is `0x4b`; the states are those of the encryption table read upwards.
:::
:::

::: exercise ECB leaks equality {level=1 check="2"}
A message of four blocks $A, A, B, A$ (with $A \ne B$) is encrypted in ECB mode. How many distinct ciphertext blocks appear? (Enter the number.)
::: solution
ECB maps equal blocks to equal blocks and, being a permutation, distinct blocks to distinct blocks, so the ciphertext is $F_k(A), F_k(A), F_k(B), F_k(A)$ with $2$ distinct blocks — revealing the pattern "first, second and fourth blocks equal". CBC or CTR would give four unrelated-looking blocks.
:::
:::

::: exercise Error propagation in CBC {level=1 check="1"}
One bit of ciphertext block $c_i$ (with $1 \le i < \ell$) is flipped in transit. Which plaintext blocks are affected when the receiver decrypts in CBC mode, and how many bits of $m_{i+1}$ are flipped? (Enter the number of flipped bits in $m_{i+1}$.)
::: solution
$m_i = F_k^{-1}(c_i) \oplus c_{i-1}$: since $F_k^{-1}$ is a pseudorandom permutation, $m_i$ becomes garbage (about half its bits change). $m_{i+1} = F_k^{-1}(c_{i+1}) \oplus c_i$: here $c_i$ enters only through the XOR, so exactly the same $1$ bit of $m_{i+1}$ flips. Blocks after $i+1$ are unaffected. That predictable one-bit change is the malleability that padding-oracle attacks exploit.
:::
:::

::: exercise Field multiplication {level=2 check="254"}
Compute `0x57` $\cdot$ `0x13` in $\mathrm{GF}(2^8)$ with the AES polynomial, using the doubling method: compute `0x57` $\cdot x^j$ for $j = 0, \dots, 4$ and add the ones selected by the bits of `0x13`. (Enter the result as a decimal number.)
::: solution
Doubling (multiply by $x$, reducing with `0x1b` when the top bit overflows): `57` $\cdot x = $ `ae`; `ae` $\cdot x = $ `15c` $\oplus$ `11b` $=$ `47`; `47` $\cdot x = $ `8e`; `8e` $\cdot x = $ `11c` $\oplus$ `11b` $=$ `07`. Now `0x13` $= x^4 + x + 1$, so the product is `57` $\oplus$ `ae` $\oplus$ `07` $=$ `fe`, which is $254$. (`gmul(0x57, 0x13)` in [[#ex-gf256]] prints `0xfe`.)
:::
:::

::: exercise Too few Feistel rounds {#ex-feistel-rounds level=2}
Let the round functions be truly random. (a) Show that a one-round Feistel network is not a PRP. (b) Show that a two-round network is not a PRP either: give a distinguisher with two queries and compute its advantage.
::: solution
(a) One round maps $(L, R)$ to $(R, L \oplus f_1(R))$: the left half of the output equals the right half of the input. Query any $(L, R)$ and output $1$ if the left output half equals $R$; for a random permutation this happens with probability $2^{-n/2}$. Advantage $1 - 2^{-n/2}$.

(b) Two rounds map $(L, R)$ to $(L_2, R_2)$ with $L_2 = L \oplus f_1(R)$. Query $(L, R)$ and $(L', R)$ with $L \ne L'$ and the same $R$. Then $L_2 \oplus L_2' = L \oplus L'$, because $f_1(R)$ cancels. Output $1$ if this holds. For a random permutation, the two outputs are distinct uniformly random blocks, and the left halves satisfy the relation with probability about $2^{-n/2}$. Advantage $\approx 1 - 2^{-n/2}$. Three rounds defeat this attack, which is the Luby–Rackoff theorem.
:::
:::

::: exercise A predictable IV {#ex-predictable-iv level=2}
Suppose a CBC implementation uses, for each message, an $\mathit{IV}$ that the adversary can predict before choosing the message (for example, the last ciphertext block of the previous message). Show that the scheme is not CPA-secure: give an adversary that wins the CPA game with probability $1$ using single-block messages.
::: solution
The adversary queries any message, learns the ciphertext, and so predicts the $\mathit{IV}$ $v^*$ that the challenge will use. It outputs $m_0 = v^* \oplus u$ and $m_1$ anything else of one block, for some value $u$; it receives $c^* = F_k(v^* \oplus m_b)$, which is $F_k(u)$ if $b = 0$. It then predicts the next $\mathit{IV}$ $v'$ and queries the oracle on $v' \oplus u$, obtaining $F_k(v' \oplus v' \oplus u) = F_k(u)$. If this equals $c^*$ it outputs $0$, otherwise $1$. It is always right, since $F_k$ is a permutation. In a real system the same idea lets an attacker who can inject chosen plaintext test a guess about a secret block; the defence is a fresh unpredictable $\mathit{IV}$ for each message.
:::
:::

::: exercise The CTR bound in numbers {level=2 check="2^(-33)"}
Randomised CTR mode with a 64-bit block cipher is used to encrypt $q = 2^{20}$ messages of $\ell = 2^{10}$ blocks each. Evaluate the bound $2q\ell/2^n$ of [[#thm-ctr-cpa]], and repeat for $q = 2^{40}$. (Enter the first value.)
::: solution
$2q\ell/2^{64} = 2^{1 + 20 + 10 - 64} = 2^{-33} \approx 1.2 \times 10^{-10}$, comfortably small. For $q = 2^{40}$: $2^{1 + 40 + 10 - 64} = 2^{-13} \approx 1.2 \times 10^{-4}$, uncomfortably large for a security bound. With a 128-bit block cipher the second figure would be $2^{-77}$.
:::
:::

::: exercise CTR and CBC are not CCA-secure {#ex-ctr-cca level=3}
(a) Give an adversary that wins $\mathsf{PrivK}^{\mathsf{cca}}$ against randomised CTR mode with probability $1$. (b) Do the same for CBC mode with a random IV, using a one-block challenge. (c) Explain why adding a check "reject if the decrypted message is not valid UTF-8 text" does not repair either mode in general.
::: solution
(a) Output $m_0 = 0^n$, $m_1 = 1^n$ (one block each). Receive $\langle \mathit{ctr}, c_1\rangle$; query the decryption oracle on $\langle \mathit{ctr}, c_1 \oplus 0^{n-1}1\rangle$, which differs from the challenge and is therefore allowed. The answer is $m_b \oplus 0^{n-1}1$; XOR the last bit back and output $0$ if the result is $0^n$.

(b) The challenge is $\langle c_0, c_1\rangle$ with $m_b = F_k^{-1}(c_1) \oplus c_0$. Query decryption of $\langle c_0 \oplus 0^{n-1}1, c_1\rangle$; the answer is $m_b \oplus 0^{n-1}1$, and proceed as in (a). Flipping a bit of the IV flips the same bit of the first plaintext block.

(c) Validity checks only restrict *which* modifications the attacker can make (it can choose $m_0, m_1$ and the bit to flip so that both results remain valid), and worse, they turn the receiver into an oracle that reveals one bit — "valid or not" — about the decryption of each modified ciphertext, which is exactly what padding-oracle attacks exploit. Security against active attackers needs integrity of the ciphertext, i.e. authenticated encryption.
:::
:::

::: exercise Implement CTR and watch a nonce repeat {level=3}
Implement CTR-mode encryption and decryption for byte strings using the toy cipher `feistel_enc` of [[#ex-toy-feistel]] (one-byte blocks), with a caller-supplied starting counter. Encrypt `b"ATTACK"` and `b"RETIRE"` with the same counter `0x10` and show that XORing the two ciphertexts gives the XOR of the plaintexts. Why does this not depend on the cipher being a toy?
::: solution
```python
def ctr(data: bytes, ctr0: int, keys) -> bytes:
    """Toy CTR mode with 1-byte blocks: insecure, for study only."""
    return bytes(b ^ feistel_enc((ctr0 + i + 1) % 256, keys) for i, b in enumerate(data))

c1 = ctr(b"ATTACK", 0x10, keys)
c2 = ctr(b"RETIRE", 0x10, keys)                  # the same counter: a mistake
print(ctr(c1, 0x10, keys))                       # decryption is the same operation
print(bytes(x ^ y for x, y in zip(c1, c2)) == bytes(x ^ y for x, y in zip(b"ATTACK", b"RETIRE")))
```

```console
$ python3 ctr_reuse.py
b'ATTACK'
True
```

Both encryptions XOR their plaintexts with the same pad $F_k(\mathit{ctr}_0 + 1), F_k(\mathit{ctr}_0 + 2), \dots$, so the pad cancels in $c_1 \oplus c_2$. Nothing here used any weakness of the toy cipher: the same happens with AES, because the leak is in the mode's use, not the primitive. The proof of [[#thm-ctr-cpa]] assumed that counters are random and independent, and a repeated counter is exactly the $\mathsf{Overlap}$ event.
:::
:::
