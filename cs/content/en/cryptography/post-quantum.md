Every public-key scheme in [[cryptography/public-key]] and [[cryptography/signatures]] rests on one of two problems: factoring integers or computing discrete logarithms, in $\Z_p^*$ or on an elliptic curve. In 1994 Peter Shor showed that a quantum computer could solve both in polynomial time. No quantum computer built so far comes anywhere near the size needed, and as of 2026 nobody can say with confidence when, or whether, one will. But two facts make the threat urgent already. Data encrypted today with RSA or elliptic-curve Diffie–Hellman can be recorded today and decrypted whenever a large quantum computer appears — **harvest now, decrypt later** — so secrets that must last a decade need protection now. And replacing the public-key cryptography in every protocol, device and certificate on the planet takes many years: the move from SHA-1 to SHA-2, a far simpler change, took more than a decade.

**Post-quantum cryptography** means classical algorithms, running on ordinary computers, whose security rests on problems that quantum computers are not known to solve efficiently. In August 2024 NIST published the first three standards: **ML-KEM** (FIPS 203), a key-encapsulation mechanism based on module lattices; **ML-DSA** (FIPS 204), a lattice-based signature scheme; and **SLH-DSA** (FIPS 205), a signature scheme based only on hash functions. This chapter explains what quantum computers threaten and what they do not, the **learning-with-errors** problem and a toy lattice encryption scheme built on it, hash-based signatures from Lamport's one-time scheme to Merkle trees, and the state of the migration as of 2026. Quantum computation itself is the subject of [[quantum-computing]]; here we treat quantum algorithms as black boxes with known costs.

## What a quantum computer breaks

### Shor's algorithm

Shor's algorithm solves the **order-finding** problem — given $N$ and $a \in \Z_N^*$, find the smallest $r > 0$ with $a^r \equiv 1 \pmod N$ — in time polynomial in $\log N$, using the quantum Fourier transform to detect the period of $x \mapsto a^x \bmod N$. Factoring reduces to order finding by classical number theory alone.

::: proposition Factoring from orders {#prop-order-factor}
Let $N$ be an odd composite, $a \in \Z_N^*$, and $r$ the order of $a$ modulo $N$. If $r$ is even and $a^{r/2} \not\equiv -1 \pmod N$, then $\gcd(a^{r/2} - 1, N)$ is a non-trivial factor of $N$.
:::

::: proof
Let $x = a^{r/2} \bmod N$. Then $x^2 = a^r \equiv 1$, so $N$ divides $x^2 - 1 = (x - 1)(x + 1)$. Since $r/2 < r$ and $r$ is the order, $x \not\equiv 1$, so $N \nmid x - 1$; by assumption $x \not\equiv -1$, so $N \nmid x + 1$. If $\gcd(x - 1, N)$ were $1$, then $N$ would divide $x + 1$ (as $N \mid (x-1)(x+1)$); if it were $N$, then $N$ would divide $x - 1$. Neither holds, so the gcd lies strictly between $1$ and $N$.
:::

It can be shown, using the Chinese remainder theorem, that if $N$ has at least two distinct odd prime factors then a uniformly random $a \in \Z_N^*$ satisfies the hypotheses with probability at least $1/2$, so a few random choices of $a$ suffice. The same period-finding idea computes discrete logarithms in any group in which the group operation can be computed efficiently — including elliptic-curve groups. Shor's algorithm therefore breaks RSA, finite-field Diffie–Hellman, ElGamal, DSA, ECDH, ECDSA and EdDSA alike, at every key size: larger keys only make the quantum computer slightly larger.

::: example Factoring 15 and 21 from orders {#ex-shor-classical}
Use [[#prop-order-factor]] to factor $N = 15$ with $a = 7$, and $N = 21$ with $a = 2$, finding the orders by hand (the step that a quantum computer would do for large $N$).
::: solution
$N = 15$, $a = 7$: the powers of $7$ modulo $15$ are $1, 7, 4, 13, 1$, so $r = 4$, which is even, and $7^2 = 49 \equiv 4 \not\equiv -1$. Then $\gcd(4 - 1, 15) = 3$ and $\gcd(4 + 1, 15) = 5$: $15 = 3 \cdot 5$.

$N = 21$, $a = 2$: the powers of $2$ modulo $21$ are $1, 2, 4, 8, 16, 11, 1$, so $r = 6$, and $2^3 = 8 \not\equiv -1 \equiv 20$. Then $\gcd(8 - 1, 21) = 7$ and $\gcd(8 + 1, 21) = 3$: $21 = 3 \cdot 7$.

The classical part is trivial; all the difficulty is in finding $r$, whose size is comparable to $N$. Experimental demonstrations of Shor's algorithm on quantum hardware have so far factored only numbers of this tiny size, and some of them only with simplifications that presuppose the answer.
:::
:::

How large a machine is needed? Resource estimates have fallen steadily as algorithms and error-correction techniques improve: a 2025 estimate by Craig Gidney put the factoring of a 2048-bit RSA modulus at under a million noisy physical qubits running for under a week, whereas the largest machines of 2026 have on the order of a thousand physical qubits with error rates that do not yet support such computations. Such estimates are observations about current engineering, not theorems, and they change; the prudent response is to migrate before the question becomes urgent.

### Grover's algorithm

Symmetric cryptography is affected far less. **Grover's algorithm** (1996) finds a marked item among $N$ with about $\tfrac\pi4\sqrt N$ evaluations of a function, and this is optimal for unstructured search (Bennett, Bernstein, Brassard and Vazirani, 1997). Applied to exhaustive key search it turns $2^k$ trials into about $2^{k/2}$ quantum evaluations of the cipher. Even this overstates the threat: Grover's iterations are inherently sequential, each one is a full reversible evaluation of AES inside an error-corrected quantum computer, and splitting the search over $P$ machines only reduces the time by $\sqrt P$. NIST's post-quantum security categories are in fact defined by the cost of key search on AES-128 (category 1), AES-192 (category 3) and AES-256 (category 5). The usual advice, as of 2026, is that AES-128 remains acceptable for most purposes and AES-256 gives a comfortable margin; SHA-256 and SHA-3 remain secure (the best known quantum collision algorithms give no practical advantage over classical ones once their memory costs are counted).

::: widget plot
f: x; x/2
x: 0, 256
y: 0, 260
labels: \text{classical } \log_2(\text{cost}) = k; \text{Grover } \log_2(\text{cost}) = k/2
vlines: 128; 256
caption: The base-2 logarithm of the cost of exhaustive key search against a $k$-bit key, classically ($2^k$) and with Grover's algorithm (about $2^{k/2}$ sequential quantum evaluations). The vertical lines mark AES-128 and AES-256: Grover brings AES-256 down to about the classical cost of AES-128, which is still far out of reach. Public-key schemes based on factoring or discrete logarithms are not on this picture at all — Shor's algorithm breaks them in polynomial time.
:::

::: quiz
Which of the following does a large quantum computer running Shor's or Grover's algorithm break outright (that is, in polynomial time)? (Select all that apply.)

- [x] RSA-4096 encryption
- [x] ECDSA signatures on the curve P-256
- [ ] AES-256 encryption
- [ ] HMAC-SHA256
- [x] X25519 key exchange
::: solution
Shor's algorithm factors and computes discrete logarithms, including on elliptic curves, in polynomial time, so RSA of any size, ECDSA and X25519 are broken. Against AES-256 Grover gives at best a square-root speed-up, to about $2^{128}$ sequential steps, and HMAC-SHA256 likewise keeps a large security margin.
:::
:::

## Lattices and learning with errors

A **lattice** is the set of integer combinations $\set{z_1\mathbf b_1 + \dots + z_n\mathbf b_n : z_i \in \Z}$ of linearly independent vectors $\mathbf b_1, \dots, \mathbf b_n \in \R^n$ — a regular grid of points, possibly very skewed. Two problems on lattices have resisted classical and quantum attack for decades: the **shortest vector problem** (find a shortest non-zero lattice point) and the **closest vector problem** (find the lattice point closest to a given target), and their approximate versions with polynomial approximation factors. The best algorithms, by lattice sieving or enumeration, take time exponential in the dimension $n$; quantum algorithms improve the exponent only slightly. Cryptography uses a problem that is an average-case form of these.

::: definition Learning with errors {#def-lwe}
Let $n, q$ be integers and $\chi$ a distribution on small integers (for example uniform on $\{-1, 0, 1\}$, or a discrete Gaussian of small width). For a secret $\mathbf s \in \Z_q^n$, an **LWE sample** is $(\mathbf a, b)$ with $\mathbf a$ uniform in $\Z_q^n$ and $b = \langle\mathbf a, \mathbf s\rangle + e \bmod q$ for $e \gets \chi$. The **decision-LWE problem** is to distinguish, with non-negligible advantage, $m$ LWE samples — written as a matrix, $(A, A\mathbf s + \mathbf e)$ with $A \in \Z_q^{m\times n}$ — from $(A, \mathbf u)$ with $\mathbf u$ uniform in $\Z_q^m$.
:::

Without the error, $A\mathbf s = \mathbf b$ is a linear system that Gaussian elimination solves in polynomial time. The small errors make the problem appear hard: elimination amplifies them until they swamp the answer. Regev (2005) proved that solving LWE on average, for suitable parameters, is at least as hard as solving approximate shortest-vector problems on *any* lattice of dimension $n$ by a quantum algorithm — a worst-case-to-average-case reduction of a kind that factoring and discrete logarithms do not enjoy — and Peikert (2009) and others gave classical versions for some parameters.

::: widget distribution
dist: binomial
params: n=4, p=0.5
caption: ML-KEM draws its secret and error coefficients from a **centred binomial distribution**: the number of heads in $4$ fair coin flips, minus $2$, which takes values $-2, \dots, 2$ with probabilities $\tfrac{1}{16}, \tfrac{4}{16}, \tfrac{6}{16}, \tfrac{4}{16}, \tfrac{1}{16}$ (shown here before the shift by $2$). It is easy to sample in constant time and has small variance ($1$), which keeps the accumulated error far below the decryption threshold.
:::

### Regev's encryption scheme

::: definition Regev encryption (one bit) {#def-regev}
Parameters $n, m, q$ and an error distribution $\chi$. Key generation chooses $\mathbf s \in \Z_q^n$ uniformly, $A \in \Z_q^{m \times n}$ uniformly and $\mathbf e \gets \chi^m$; the public key is $(A, \mathbf b = A\mathbf s + \mathbf e)$ and the private key is $\mathbf s$. To encrypt a bit $\mu$, choose a uniform $\mathbf r \in \{0, 1\}^m$ (a random subset of the rows) and output
$$
\mathbf u = \mathbf r^{\mathsf T}A \in \Z_q^n, \qquad v = \mathbf r^{\mathsf T}\mathbf b + \mu\lfloor q/2\rfloor \in \Z_q .
$$
To decrypt, compute $d = v - \langle\mathbf u, \mathbf s\rangle \bmod q$ and output $0$ if $d$ is closer to $0$ than to $\lfloor q/2\rfloor$ (modulo $q$), and $1$ otherwise.
:::

::: theorem Correctness and security of Regev encryption {#thm-regev}
(a) Decryption is correct whenever $\lvert\mathbf r^{\mathsf T}\mathbf e\rvert < q/4$; in particular it is always correct if every error has absolute value at most $B$ and $mB < q/4$. (b) If decision-LWE is hard and $m \ge (n + 1)\log_2 q + \omega(\log n)$, the scheme is CPA-secure.
:::

::: proof
(a) $d = \mathbf r^{\mathsf T}(A\mathbf s + \mathbf e) + \mu\lfloor q/2\rfloor - \mathbf r^{\mathsf T}A\mathbf s = \mu\lfloor q/2\rfloor + \mathbf r^{\mathsf T}\mathbf e$. The term $\mathbf r^{\mathsf T}\mathbf e$ is a sum of at most $m$ errors, so $\lvert\mathbf r^{\mathsf T}\mathbf e\rvert \le mB$. If it is less than $q/4$ in absolute value, $d$ lies within $q/4$ of $\mu\lfloor q/2\rfloor$ and decryption returns $\mu$.

(b) Consider a hybrid in which the public key $(A, \mathbf b)$ is replaced by $(A, \mathbf u')$ with $\mathbf u'$ uniform. A CPA adversary whose success differs noticeably between the real scheme and this hybrid would distinguish LWE samples from uniform, by the usual reduction (the distinguisher builds the public key from its challenge, encrypts, and forwards the adversary's guess). In the hybrid, the matrix $[A \mid \mathbf u']$ is uniform, and the **leftover hash lemma** — which we use without proof — says that when $m \ge (n+1)\log_2 q + \omega(\log n)$, the pair $([A \mid \mathbf u'],\ \mathbf r^{\mathsf T}[A \mid \mathbf u'])$ for uniform $\mathbf r \in \{0,1\}^m$ is statistically close to uniform. Then $(\mathbf u, \mathbf r^{\mathsf T}\mathbf u')$ is close to uniform and masks $\mu\lfloor q/2\rfloor$ as a one-time pad would, so the adversary's advantage in the hybrid is negligible.
:::

::: example Regev encryption with toy numbers {#ex-regev}
Take $n = 4$, $m = 8$, $q = 97$ and errors uniform in $\{-1, 0, 1\}$. Generate a key, encrypt the bits $0, 1, 1, 0$ and decrypt, showing the value $d$ each time.
::: solution
Here $mB = 8 < q/4 = 24.25$, so by [[#thm-regev]] decryption never fails.

```python
import random
random.seed(2026)
n, m, q = 4, 8, 97                        # toy parameters: utterly insecure
s = [random.randrange(q) for _ in range(n)]                    # secret key
A = [[random.randrange(q) for _ in range(n)] for _ in range(m)]
e = [random.choice([-1, 0, 1]) for _ in range(m)]              # small errors
b = [(sum(a * x for a, x in zip(row, s)) + err) % q for row, err in zip(A, e)]

def encrypt(bit):
    S = [i for i in range(m) if random.random() < 0.5]         # random subset of rows
    u = [sum(A[i][j] for i in S) % q for j in range(n)]
    v = (sum(b[i] for i in S) + bit * (q // 2)) % q
    return u, v, S

def decrypt(u, v):
    d = (v - sum(x * y for x, y in zip(u, s))) % q             # = bit*48 + sum of errors
    return 0 if min(d, q - d) < q // 4 else 1, d

print("s =", s, "e =", e)
for bit in (0, 1, 1, 0):
    u, v, S = encrypt(bit)
    print(bit, S, u, v, decrypt(u, v))
```

```console
$ python3 regev.py
s = [15, 40, 64, 65] e = [0, 1, 1, 1, -1, 1, 0, -1]
0 [1, 2, 6] [17, 56, 58, 1] 66 (0, 2)
1 [0, 1, 2, 4, 5] [30, 50, 61, 77] 60 (1, 50)
1 [1, 3, 4, 6] [3, 29, 40, 38] 76 (1, 49)
0 [0, 1, 2, 3, 6] [77, 28, 19, 77] 60 (0, 3)
```

For the first ciphertext the subset is rows $\{1, 2, 6\}$, whose errors sum to $1 + 1 + 0 = 2$, and indeed $d = 2$, close to $0$. For the second, rows $\{0, 1, 2, 4, 5\}$ have errors summing to $0 + 1 + 1 - 1 + 1 = 2$, and $d = 48 + 2 = 50$, close to $\lfloor 97/2\rfloor = 48$. Each $d$ is "the message, shifted by a small noise". Real parameters use $n$ in the hundreds and much larger $m$; this toy key could be recovered by trying all $97^4 \approx 8.9 \times 10^7$ secrets.
:::
:::

### From Regev to ML-KEM

Regev's scheme has public keys of $m \times n$ numbers and encrypts one bit at a time. **Ring-LWE** and **module-LWE** replace integers by polynomials in a ring such as $R_q = \Z_q[X]/(X^{256} + 1)$, so that one ring element carries 256 coefficients and multiplication — computed quickly with a number-theoretic transform, the modular analogue of the FFT — mixes them all. **ML-KEM** (module-lattice KEM, FIPS 203, August 2024), derived from the CRYSTALS-Kyber submission, works with $k \times k$ matrices over $R_q$ with $q = 3329$, with $k = 2, 3, 4$ for the parameter sets ML-KEM-512, ML-KEM-768 and ML-KEM-1024 (NIST security categories 1, 3 and 5). Secrets and errors come from a centred binomial distribution, ciphertexts are compressed by dropping low-order bits (which adds a little more noise), and a variant of the **Fujisaki–Okamoto transform** turns the CPA-secure encryption into a CCA-secure KEM: the decapsulator re-encrypts the decrypted message and, if the result does not match the received ciphertext, returns a pseudorandom key derived from a secret value rather than an error ("implicit rejection"), giving an attacker nothing to learn from malformed ciphertexts. Decryption can fail, with probability below $2^{-164}$ for ML-KEM-768 — far below any other risk.

**ML-DSA** (FIPS 204), from CRYSTALS-Dilithium, is a Fiat–Shamir signature over module lattices in the spirit of Schnorr ([[cryptography/signatures#def-schnorr]]): the signer commits to a masked value, derives a challenge by hashing, and responds; because a lattice response could leak the secret through its distribution, the signer checks whether the response falls in a safe range and otherwise **aborts and restarts** with fresh randomness ("Fiat–Shamir with aborts", Lyubashevsky 2009), so that published responses are independent of the key.

::: example How big are post-quantum keys? {#ex-pq-sizes}
Using the sizes in FIPS 203 and FIPS 204, compare a TLS key share and certificate signature before and after the post-quantum transition, and compute the size of the hybrid key shares of X25519MLKEM768.
::: solution
The sizes in bytes are:

| scheme | public key | ciphertext or signature |
|---|---|---|
| X25519 | 32 | 32 |
| ML-KEM-512 | 800 | 768 |
| ML-KEM-768 | 1184 | 1088 |
| ML-KEM-1024 | 1568 | 1568 |
| Ed25519 | 32 | 64 |
| RSA-3072 (PSS) | 384 | 384 |
| ML-DSA-44 | 1312 | 2420 |
| ML-DSA-65 | 1952 | 3309 |
| ML-DSA-87 | 2592 | 4627 |
| SLH-DSA-SHA2-128s | 32 | 7856 |
| SLH-DSA-SHA2-128f | 32 | 17 088 |

A hybrid X25519MLKEM768 key share concatenates both: the client sends $32 + 1184 = 1216$ bytes (an X25519 key and an ML-KEM encapsulation key) and the server $32 + 1088 = 1120$ bytes (an X25519 key and an ML-KEM ciphertext), against $32$ each before. A certificate chain with two ML-DSA-65 signatures and one ML-DSA-65 public key in the leaf adds roughly $2 \times 3309 + 1952 \approx 8.6$ KB compared with a few hundred bytes for Ed25519 or ECDSA. Key exchange grows by a few kilobytes, which fits in the first flights with modest cost; signatures grow more, which is why their migration is slower and why schemes with shorter signatures, such as Falcon, remain of interest.
:::
:::

## Hash-based signatures

Signatures can be built from a hash function alone, with security that depends on nothing but the hash's one-wayness or collision resistance — properties against which quantum computers offer only modest speed-ups. That makes them the most conservative post-quantum choice.

::: definition Lamport one-time signature {#def-lamport}
Let $H$ be a hash function with $n$-bit outputs, and sign $\ell$-bit messages (in practice, $\ell$-bit hashes of messages). The private key is $2\ell$ uniform $n$-bit strings $x_{i,b}$ for $i = 1, \dots, \ell$ and $b \in \{0, 1\}$; the public key is $y_{i,b} = H(x_{i,b})$. To sign $m = m_1\dots m_\ell$, reveal $\sigma = (x_{1,m_1}, \dots, x_{\ell,m_\ell})$. To verify, check $H(\sigma_i) = y_{i,m_i}$ for every $i$.
:::

Each key pair may sign **one** message: signing two messages that differ in position $i$ reveals both $x_{i,0}$ and $x_{i,1}$, and with enough signatures an attacker can mix and match preimages to sign new messages.

::: theorem Lamport signatures are one-time secure {#thm-lamport}
If $H$ is one-way, the Lamport scheme is existentially unforgeable when the adversary may obtain a signature on at most one message of its choice: any PPT forger succeeds with negligible probability.
:::

::: proof
Let $\mathcal A$ forge with probability $\varepsilon$. Build an inverter $\mathcal I$ that is given $y^* = H(x^*)$ for a uniform $x^*$ and must find a preimage. $\mathcal I$ chooses $i^* \in \{1, \dots, \ell\}$ and $b^* \in \{0, 1\}$ uniformly, generates all other $x_{i,b}$ itself, and sets $y_{i^*, b^*} = y^*$. This public key has exactly the distribution of a real one, and gives no information about $(i^*, b^*)$. When $\mathcal A$ asks for a signature on $m$: if $m_{i^*} = b^*$, $\mathcal I$ cannot answer and aborts; otherwise it answers with its known preimages. When $\mathcal A$ outputs a forgery $(m', \sigma')$ with $m' \ne m$, if $m'_{i^*} = b^*$ then $\sigma'_{i^*}$ is a preimage of $y^*$, and $\mathcal I$ outputs it.

$\mathcal I$ succeeds if $\mathcal A$ forges, $m_{i^*} \ne b^*$ and $m'_{i^*} = b^*$. Since $m' \ne m$ there is a position $j$ with $m'_j \ne m_j$; the event "$i^* = j$ and $b^* = m'_j$" has probability $\tfrac1\ell\cdot\tfrac12$, independently of $\mathcal A$'s behaviour (which does not depend on $(i^*, b^*)$), and it implies both conditions. So $\mathcal I$ inverts $H$ with probability at least $\varepsilon/(2\ell)$, and $\varepsilon$ is negligible if $H$ is one-way. (If $\mathcal A$ asks for no signature, the same argument applies without the abort condition.)
:::

::: example A toy Lamport signature {#ex-lamport}
Sign the message `release v2.1` with a Lamport key for 8-bit digests (the first byte of its SHA-256 hash), and check that the signature does not verify for `release v6.6`.
::: solution
```python
import hashlib, secrets

def H(x: bytes) -> bytes:
    return hashlib.sha256(x).digest()

ELL = 8                                              # sign 8-bit digests (toy)
sk = [[secrets.token_bytes(32) for b in range(2)] for i in range(ELL)]
pk = [[H(sk[i][b]) for b in range(2)] for i in range(ELL)]

def bits(m: bytes):                                   # first ELL bits of H(m)
    d = H(m)[0]
    return [(d >> (ELL - 1 - i)) & 1 for i in range(ELL)]

def sign(m):
    return [sk[i][bit] for i, bit in enumerate(bits(m))]

def verify(m, sig):
    return all(H(s) == pk[i][bit] for i, (s, bit) in enumerate(zip(sig, bits(m))))

sig = sign(b"release v2.1")
print(bits(b"release v2.1"), verify(b"release v2.1", sig), verify(b"release v6.6", sig))
```

```console
$ python3 lamport.py
[0, 0, 0, 0, 0, 1, 1, 1] True False
```

The digest bits of `release v2.1` are `00000111`, so the signature reveals $x_{1,0}, \dots, x_{5,0}, x_{6,1}, x_{7,1}, x_{8,1}$. The digest of `release v6.6` is `10100100`, which differs in five positions, so verification fails: the forger would need, for example, $x_{1,1}$, which has never been revealed. With an 8-bit digest, of course, a forger could simply search for another message with digest `00000111` (one try in 256 succeeds); real schemes sign full 256-bit hashes, making the public key $2 \cdot 256 \cdot 32 = 16$ KiB and the signature $8$ KiB — which is why practical schemes use more compact one-time signatures such as Winternitz chains.
:::
:::

**From one to many signatures.** Merkle (1979) observed that $2^h$ one-time public keys can be committed to by a binary tree of hashes, a **Merkle tree**, whose root is the single public key. A signature consists of the next unused one-time key's signature, that one-time public key, and the $h$ sibling hashes along the path to the root (the **authentication path**), which let the verifier recompute the root. Security reduces to the one-time scheme and the collision resistance of the tree's hash. But the signer must remember which leaves it has used — a **stateful** scheme — and reusing a leaf, after restoring a backup or cloning a virtual machine, breaks security. The stateful schemes XMSS (RFC 8391) and LMS (RFC 8554) are standardised for settings, such as firmware signing, where state can be managed carefully (NIST SP 800-208).

**SLH-DSA** (FIPS 205), derived from SPHINCS+, removes the state. It builds a *hypertree* of Merkle trees whose leaves sign the roots of trees below, ending in a **few-time** signature scheme (FORS) at the bottom, and chooses the bottom leaf pseudorandomly from the message, so that the chance of using one leaf often enough to matter is negligible even over $2^{64}$ signatures. The price is size and speed: signatures of about 8 to 50 KB and signing times orders of magnitude slower than ML-DSA. The payoff is that its security rests only on standard properties of SHA-2 or SHAKE ([[cryptography/hash-mac]]), assumptions that have been studied far longer than lattices.

::: warning New assumptions need time — and the new standards need vetted implementations
Two schemes that reached the final rounds of the NIST process were broken classically in 2022: the multivariate signature scheme Rainbow (by Ward Beullens) and the isogeny-based key exchange SIKE (by Wouter Castryck and Thomas Decru, in about an hour on a laptop for the main parameter set). Their mathematics was sound, but their concrete hardness assumptions had been studied too briefly. That is why deployments in the transition period use **hybrid** constructions, which combine a classical scheme (X25519, ECDSA) with a post-quantum one so that the result is secure if *either* is; and why the hash-based SLH-DSA, relying on the oldest assumptions, is standardised alongside the lattice schemes. ML-KEM and ML-DSA are also new to implement: their security depends on constant-time sampling, decoding and rejection, and early implementations have had timing leaks. Use the implementations in maintained, reviewed libraries, never your own, and treat the toy code in this chapter as exactly that.
:::

## The migration, as of 2026

NIST's process began with a call for proposals in 2016, received 69 complete submissions, and after three rounds of public analysis selected CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+ and Falcon in July 2022. The first three became FIPS 203, 204 and 205 on 13 August 2024; a standard based on Falcon (FN-DSA, which has shorter signatures but needs delicate floating-point Gaussian sampling) is to follow as FIPS 206. In March 2025 NIST also selected **HQC**, a KEM based on error-correcting codes, as a backup to ML-KEM resting on a different assumption. NIST's transition plan (draft NIST IR 8547, 2024) proposes deprecating the quantum-vulnerable public-key algorithms at the 112-bit security level after 2030 and disallowing them after 2035; other governments have published similar timelines.

Key exchange is moving first, because of harvest-now-decrypt-later. The hybrid key share **X25519MLKEM768**, which feeds both the X25519 and the ML-KEM-768 shared secrets into the TLS 1.3 key schedule ([[cryptography/protocols]]), has been enabled by default in major browsers and large content-delivery networks since 2024–2025, so that by 2026 a large share of web traffic is already protected against future quantum decryption; SSH and messaging protocols (such as Signal's PQXDH, 2023) have added comparable hybrids. Signatures and certificates are moving more slowly: a forged signature in the future does not compromise past traffic, and the larger sizes affect every certificate chain, so the web PKI's transition to ML-DSA (or to new certificate designs that reduce the number of signatures sent) is expected to take the rest of the decade. Long-lived signatures — firmware roots of trust, code signing — are the exception, and hash-based schemes are already used there.

::: quiz
An organisation encrypts medical records that must stay confidential for 25 years, and signs software updates whose keys are rotated every two years. Which should it move to post-quantum cryptography first?

- [x] The key exchange and encryption protecting the medical records, because recorded ciphertext could be decrypted later.
- [ ] The software-update signatures, because signatures are easier to forge.
- [ ] Neither, because no large quantum computer exists in 2026.
- [ ] The AES-256 encryption of the records, by replacing it with ML-KEM.
::: solution
Confidentiality is threatened retroactively: an adversary can record the key exchange now and break it whenever a quantum computer appears, possibly within the 25-year window. Signatures need only resist forgery while they are trusted, so short-lived signing keys can migrate later (long-lived roots of trust are another matter). AES-256 itself needs no replacement; ML-KEM replaces the *public-key* step that establishes the AES key.
:::
:::

::: history
Ralph Merkle's thesis (1979) introduced hash trees and many-time signatures from Leslie Lamport's 1979 one-time scheme; Robert McEliece proposed code-based encryption in 1978. Peter Shor published his quantum algorithms for factoring and discrete logarithms in 1994 (journal version 1997), and Lov Grover his search algorithm in 1996. Miklós Ajtai showed in 1996 that lattice problems have worst-case to average-case reductions; Jeffrey Hoffstein, Jill Pipher and Joseph Silverman proposed the NTRU cryptosystem in 1996 (published 1998); and Oded Regev introduced learning with errors in 2005 (journal version 2009), work that earned him the 2018 Gödel Prize. Vadim Lyubashevsky, Chris Peikert and Regev introduced ring-LWE in 2010. NIST announced its post-quantum standardisation process in 2016, selected the first algorithms in July 2022, and published FIPS 203, 204 and 205 on 13 August 2024; the same summer of 2022 saw Rainbow and SIKE broken.
:::

## Where this leads

The quantum algorithms themselves — the quantum Fourier transform, period finding, amplitude amplification, and the error correction a cryptographically relevant machine would need — are developed in [[quantum-computing]]. The complexity class $\mathsf{BQP}$ and the evidence that it does not contain $\mathsf{NP}$, which is why lattice problems are believed to remain hard for quantum computers, are in [[complexity]]. Deploying the new schemes in protocols — hybrid key exchange, larger certificate chains, crypto-agility in software — is part of [[security]], and quantum key distribution, which uses physics rather than computational hardness to distribute one-time-pad keys ([[cryptography/perfect-secrecy]]), is a different response to the same threat with its own, very different, deployment constraints.

::: summary
- **Shor's algorithm** finds orders and discrete logarithms in polynomial time on a quantum computer, breaking RSA, finite-field and elliptic-curve Diffie–Hellman, DSA, ECDSA and EdDSA at every key size; factoring reduces classically to order finding ([[#prop-order-factor]]).
- **Grover's algorithm** gives only a square-root speed-up for key search, inherently sequential; AES-128 is still adequate for most purposes and AES-256 gives a margin, and SHA-2/SHA-3 remain secure.
- **Learning with errors** ([[#def-lwe]]) — noisy linear equations — is as hard as worst-case lattice problems; **Regev encryption** decrypts correctly when the accumulated error is below $q/4$ and is CPA-secure under LWE ([[#thm-regev]]). **ML-KEM** (FIPS 203) and **ML-DSA** (FIPS 204) are module-lattice schemes with keys and ciphertexts of about a kilobyte or more.
- **Hash-based signatures** need only a hash function: **Lamport** one-time signatures are secure if $H$ is one-way ([[#thm-lamport]]); Merkle trees give many-time stateful schemes (XMSS, LMS), and **SLH-DSA** (FIPS 205) is stateless at the cost of large signatures.
- As of 2026, hybrid key exchange (**X25519MLKEM768**) is widely deployed in TLS, signatures are migrating more slowly, and new assumptions are treated with caution — two finalists were broken classically in 2022. Use vetted implementations.
:::

## Exercises

::: exercise Factoring with an order {level=1 check="5"}
The order of $a = 2$ modulo $N = 15$ is $r = 4$. Use [[#prop-order-factor]] to find the larger of the two prime factors of $15$. (Enter it.)
::: solution
$2^{r/2} = 2^2 = 4 \not\equiv -1 \pmod{15}$. Then $\gcd(4 - 1, 15) = 3$ and $\gcd(4 + 1, 15) = 5$. The larger factor is $5$.
:::
:::

::: exercise Grover against AES-128 {level=1 check="2^64"}
About how many sequential evaluations of AES does Grover's algorithm need to find a 128-bit key, to the nearest power of two? (Enter it as a power of two.)
::: solution
About $\tfrac\pi4\sqrt{2^{128}} = \tfrac\pi4 \cdot 2^{64} \approx 0.79 \cdot 2^{64}$, so $2^{64}$ to the nearest power of two — each a full reversible AES computation on a fault-tolerant quantum computer, run one after another. Splitting over $2^{20}$ machines would only reduce the time per machine to $2^{54}$ evaluations.
:::
:::

::: exercise A Regev decryption by hand {level=1}
With $q = 97$, a ciphertext gives $d = v - \langle\mathbf u, \mathbf s\rangle \bmod q = 45$. What bit does it decrypt to, and what was the accumulated error if decryption is correct? Do the same for $d = 95$.
::: solution
$\lfloor 97/2\rfloor = 48$. $d = 45$ is at distance $3$ from $48$ and distance $45$ from $0$, so the bit is $1$ with error $45 - 48 = -3$. $d = 95$ is at distance $2$ from $0$ (since $97 - 95 = 2$) and $47$ from $48$, so the bit is $0$ with error $-2$.
:::
:::

::: exercise When decryption can fail {level=2 check="24"}
In Regev's scheme with errors bounded by $B = 1$ and $q = 97$, what is the largest $m$ for which [[#thm-regev]](a) guarantees correct decryption for every choice of subset? (Enter $m$.)
::: solution
We need $mB < q/4 = 24.25$, so $m \le 24$. For larger $m$ decryption is still correct with high probability, because a random subset sum of random signs is typically of size about $\sqrt m$, not $m$ — which is how real schemes choose parameters, accepting a tiny, precisely computed failure probability.
:::
:::

::: exercise Hybrid key shares {level=2 check="2336"}
In a TLS 1.3 handshake using X25519MLKEM768, how many bytes of key-share data are sent in total by client and server together, and how does this compare with X25519 alone? (Enter the total for the hybrid.)
::: solution
Client: $32 + 1184 = 1216$ bytes; server: $32 + 1088 = 1120$ bytes; total $2336$ bytes, against $64$ for X25519 alone — about $2.2$ KiB more per full handshake, usually still fitting within the first packets.
:::
:::

::: exercise Two Lamport signatures {level=2}
A Lamport key for 4-bit digests signs the digests `0110` and `1100`. Which private values have been revealed, and which other digests can an attacker now sign?
::: solution
`0110` reveals $x_{1,0}, x_{2,1}, x_{3,1}, x_{4,0}$; `1100` reveals $x_{1,1}, x_{2,1}, x_{3,0}, x_{4,0}$. Position $1$ and position $3$ now have both values revealed, positions $2$ and $4$ only $x_{2,1}$ and $x_{4,0}$. So the attacker can sign any digest of the form $b_1\,1\,b_3\,0$: `0100`, `0110`, `1100`, `1110` — two new ones. With many signatures nearly every position is exposed both ways, which is why each key pair must sign only once.
:::
:::

::: exercise A Merkle tree {level=3}
Explain how a Merkle tree of height $h = 3$ over eight Lamport public keys yields a signature scheme for eight messages. What does a signature contain, how many hash computations does the verifier perform to recompute the root (besides verifying the Lamport signature), and what goes wrong if the signer forgets which leaves it has used?
::: solution
The leaves are $L_j = H(\mathit{pk}_j)$ for the eight one-time public keys; each internal node is the hash of its two children, and the root is the public key. To sign the $j$-th message, the signer produces a Lamport signature with $\mathit{sk}_j$ and attaches $j$, $\mathit{pk}_j$ and the three sibling hashes on the path from leaf $j$ to the root. The verifier checks the Lamport signature with $\mathit{pk}_j$, computes $L_j = H(\mathit{pk}_j)$, and then hashes upwards three times, combining with the siblings in the order given by the bits of $j$ — four hash computations in all, $h + 1$ in general — and compares with the root. A forger must either forge a one-time signature or produce a different $\mathit{pk}$ hashing up to the same root, which requires a collision. If the signer reuses a leaf, it signs two messages with one Lamport key, which the previous exercise shows to be insecure: hence the state, and SLH-DSA's pseudorandom leaf selection to avoid it.
:::
:::

::: exercise Why hybrid {level=3}
A hybrid KEM derives the session key as $k = \mathrm{KDF}(k_1 \,\|\, k_2 \,\|\, \mathit{transcript})$ from an X25519 shared secret $k_1$ and an ML-KEM shared secret $k_2$. Argue informally that $k$ is indistinguishable from random if *either* $k_1$ or $k_2$ is, modelling the KDF as a random oracle. Why include the transcript (the ciphertexts and public keys)?
::: solution
Suppose $k_2$ is indistinguishable from a uniform string even given everything the adversary sees (because ML-KEM is secure), while $k_1$ may be fully known (because X25519 has been broken). In the random-oracle model, $k$ is a fresh random value unless the adversary queries the oracle on exactly $k_1 \| k_2 \| \mathit{transcript}$, which requires guessing $k_2$; that succeeds with negligible probability, else the adversary would distinguish $k_2$ from random. The argument is symmetric in $k_1$ and $k_2$. Including the transcript binds the key to the exact public keys and ciphertexts used, so that an attacker cannot combine components from different sessions or substitute one component, and it protects against weaknesses in KEMs whose shared secret does not by itself depend on the ciphertext. The TLS hybrid feeds the concatenated secrets into the transcript-bound key schedule of [[cryptography/protocols]].
:::
:::
