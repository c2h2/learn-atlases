Encryption hides what a message says. It does not stop anyone from changing it. In [[cryptography/block-ciphers]] we saw that flipping one bit of a CTR ciphertext flips the same bit of the plaintext — so an attacker who knows that a bank transfer message has the amount in bytes 20–27 can change it without ever learning the key — and that malleability turns an innocent error message into a padding oracle. Integrity needs its own tool: a **message authentication code** (MAC), a short tag computed from the message with a secret key, which no one without the key can produce for a new message.

The other tool of this chapter is the **cryptographic hash function**, an unkeyed function such as SHA-256 that compresses an input of any length to a short digest so that no one can find two inputs with the same digest. Hash functions fingerprint files and software releases, are the basis of the widely used MAC called HMAC, and make digital signatures on long messages possible ([[cryptography/signatures]]). We define MACs and their security, build them from pseudorandom functions, define collision resistance, compute the **birthday bound** exactly, analyse the Merkle–Damgård construction behind SHA-2 and its length-extension weakness, describe the sponge construction of SHA-3, and finally combine encryption and MACs into **authenticated encryption**, proving that encrypt-then-MAC is secure against chosen-ciphertext attacks.

## Message authentication codes

::: definition Message authentication code {#def-mac}
A **MAC** consists of three PPT algorithms: $\mathsf{Gen}(1^n)$ outputs a key $k$; $\mathsf{Mac}_k(m)$ outputs a **tag** $t$; and the deterministic $\mathsf{Vrfy}_k(m, t)$ outputs $1$ (valid) or $0$ (invalid). Correctness: $\mathsf{Vrfy}_k(m, \mathsf{Mac}_k(m)) = 1$ for all $k$ and $m$.

In the experiment $\mathsf{MacForge}_{\mathcal A, \Pi}(n)$, a key $k$ is chosen and $\mathcal A$ gets oracle access to $\mathsf{Mac}_k(\cdot)$; it outputs a pair $(m, t)$ and succeeds if $\mathsf{Vrfy}_k(m, t) = 1$ and $m$ was never queried to the oracle. $\Pi$ is **existentially unforgeable under an adaptive chosen-message attack** — **secure**, for short — if every PPT $\mathcal A$ succeeds with negligible probability. It is **strongly** unforgeable if this holds even when success only requires that the *pair* $(m, t)$ was never returned by the oracle.
:::

"Existential" means the attacker wins by forging a tag on *any* new message, even a meaningless one: the scheme cannot know which messages matter to the application. "Adaptive chosen-message" means it may first obtain tags on messages of its choice. The definition does not address **replay** — resending an old, validly tagged message — because a MAC cannot know whether a message is new; protocols add sequence numbers or timestamps for that ([[cryptography/protocols]]).

A PRF is a secure MAC for messages of one block.

::: theorem A PRF is a MAC {#thm-prf-mac}
Let $F$ be a PRF with $n$-bit inputs and outputs. The MAC with $\mathsf{Mac}_k(m) = F_k(m)$ for $m \in \{0,1\}^n$, and $\mathsf{Vrfy}_k(m, t) = 1$ iff $t = F_k(m)$, is secure: every PPT adversary forges with probability at most $2^{-n} + \mathsf{negl}(n)$.
:::

::: proof
Given a forger $\mathcal A$, build a PRF distinguisher $D^O$: run $\mathcal A$, answering each tag query $m$ with $O(m)$; when $\mathcal A$ outputs $(m, t)$ with $m$ not queried, query $O(m)$ and output $1$ iff the answer equals $t$. If $O = F_k$, $D$ outputs $1$ exactly when $\mathcal A$ forges. If $O = f$ is a random function, $f(m)$ at an unqueried point is uniform and independent of $\mathcal A$'s view, so $t = f(m)$ with probability exactly $2^{-n}$. Hence $\Prob[\mathcal A \text{ forges}] \le 2^{-n} + \mathsf{negl}(n)$.
:::

Long messages need a domain extension. **CBC-MAC** runs CBC mode with a zero IV and outputs only the last block: $t_0 = 0^n$, $t_i = F_k(t_{i-1} \oplus m_i)$, $t = t_\ell$. Bellare, Kilian and Rogaway (1994) proved it secure for messages of a *fixed* number $\ell$ of blocks; for variable-length messages it is insecure ([[#ex-cbc-mac]]). The standard fix, **CMAC** (NIST SP 800-38B, 2005), XORs a key-derived mask into the last block. Note that CBC-MAC uses a *fixed* IV and outputs one block, while CBC encryption uses a *random* IV and outputs all blocks: getting this backwards breaks both.

::: warning Verify tags in constant time, and never on the plaintext of an unverified message
A tag check written as `if tag == expected:` in most languages compares byte by byte and stops at the first difference, so its running time reveals how many leading bytes of a guessed tag are right. An attacker who can measure response times can then find a valid tag a byte at a time. Use a constant-time comparison such as Python's `hmac.compare_digest`, or better, a library function that verifies for you. Equally, a receiver must verify the tag *before* acting on the message in any way — before decrypting, parsing or decompressing it — or the processing itself becomes an oracle. More generally: implement none of the constructions in this chapter yourself for real use; call a vetted library's HMAC or authenticated-encryption API.
:::

## Hash functions and collision resistance

A hash function maps arbitrarily long inputs to short outputs, so it has collisions — pairs $x \ne x'$ with $H(x) = H(x')$ — in abundance. What we ask is that nobody can *find* one. A fixed function has a fixed collision, which an algorithm could simply print; to make "no efficient algorithm finds a collision" meaningful asymptotically we consider a family of functions indexed by a public key $s$.

::: definition Collision resistance {#def-crhf}
A **hash function** with output length $\ell(n)$ is a pair of PPT algorithms $(\mathsf{Gen}, H)$: $\mathsf{Gen}(1^n)$ outputs a public key $s$, and $H^s$ maps strings to $\{0,1\}^{\ell(n)}$. In the experiment $\mathsf{HashColl}_{\mathcal A}(n)$, $\mathcal A$ is given $s$ and outputs $x, x'$; it succeeds if $x \ne x'$ and $H^s(x) = H^s(x')$. The hash function is **collision-resistant** if every PPT $\mathcal A$ succeeds with negligible probability.
:::

Two weaker notions are often enough:

- **second-preimage resistance**: given $s$ and a uniform $x$, it is hard to find $x' \ne x$ with $H^s(x') = H^s(x)$;
- **preimage resistance** (one-wayness): given $s$ and $y = H^s(x)$ for a uniform $x$, it is hard to find any $x'$ with $H^s(x') = y$.

Collision resistance implies second-preimage resistance (a second preimage *is* a collision), and for hash functions that compress enough, second-preimage resistance implies preimage resistance. Deployed hash functions such as SHA-256 are single fixed functions; for them "collision-resistant" is read concretely: no one knows a collision, and the best known method is the generic one, which we now analyse.

### The birthday bound

Choose $q$ values independently and uniformly from a set of size $N$. When is a repetition likely? With $q = 23$ people and $N = 365$ birthdays the probability already exceeds $1/2$ — the **birthday paradox**. The exact probability of no collision is the probability that the second value avoids the first, the third avoids both, and so on:
$$
\Prob[\text{no collision}] = \prod_{i=1}^{q-1}\left(1 - \frac{i}{N}\right).
$$ {#eq-birthday-exact}

::: example Birthday probabilities computed exactly {#ex-birthday}
Compute the exact probability of a collision for $q = 10, 20, 23, 30, 50$ people with $N = 365$, and the smallest $q$ that gives probability at least $1/2$ for $N = 2^{16}$.
::: solution
Evaluate [[#eq-birthday-exact]] directly (with `log1p` to keep precision when $N$ is large), and confirm $q = 23$ with exact rational arithmetic:

```python
import math
from fractions import Fraction

def p_collision(q, N):
    """Exact probability that q uniform draws from N values are not all distinct."""
    return -math.expm1(sum(math.log1p(-i / N) for i in range(1, q)))

for q in (10, 20, 23, 30, 50):
    print(q, round(p_collision(q, 365), 4))

exact = 1 - math.prod(Fraction(365 - i, 365) for i in range(23))
print(float(exact))

q = 1
while p_collision(q, 2**16) < 0.5:
    q += 1
print(q, p_collision(q, 2**16))
```

```console
$ python3 birthday.py
10 0.1169
20 0.4114
23 0.5073
30 0.7063
50 0.9704
0.5072972343239854
302 0.5007224895231962
```

With $23$ people the probability is $0.5073$; with $50$, over $97\%$. For $N = 2^{16} = 65\,536$ values, $302$ draws suffice — close to $\sqrt{2\ln 2 \cdot N} \approx 1.1774 \cdot 2^{8} \approx 301.4$.
:::
:::

::: theorem The birthday bound {#thm-birthday}
Let $q$ values be chosen independently and uniformly from a set of size $N$, and let $\mathsf{Coll}$ be the event that two are equal. Then
$$
\Prob[\mathsf{Coll}] \le \frac{q(q-1)}{2N},
$$
and if $q \le \sqrt{2N}$,
$$
\Prob[\mathsf{Coll}] \ge \left(1 - \frac1e\right)\frac{q(q-1)}{2N} \ge \frac{q(q-1)}{4N}.
$$
:::

::: proof
*Upper bound.* For each of the $\binom q2$ pairs, the two values are equal with probability $1/N$; by the union bound $\Prob[\mathsf{Coll}] \le \binom q2/N = q(q-1)/(2N)$.

*Lower bound.* Using $1 - x \le e^{-x}$ in [[#eq-birthday-exact]],
$$
\Prob[\neg\mathsf{Coll}] = \prod_{i=1}^{q-1}\left(1 - \frac iN\right) \le \prod_{i=1}^{q-1}e^{-i/N} = e^{-q(q-1)/(2N)} .
$$
Let $x = q(q-1)/(2N)$; since $q(q-1) < q^2 \le 2N$, we have $0 \le x < 1$. The function $g(x) = 1 - e^{-x}$ is concave with $g(0) = 0$ and $g(1) = 1 - 1/e$, so on $[0, 1]$ it lies above the chord: $g(x) \ge (1 - 1/e)x$. Therefore $\Prob[\mathsf{Coll}] \ge 1 - e^{-x} \ge (1 - 1/e)x$, and $1 - 1/e \approx 0.632 > 1/2$ gives the last inequality.
:::

So collisions appear after about $\sqrt N$ samples, and with $q = \sqrt{2N\ln 2} \approx 1.18\sqrt N$ the probability is about $1/2$. For a hash with $\ell$-bit outputs, $N = 2^\ell$, and the **generic birthday attack** — hash random inputs and look for a repeat — finds a collision in about $2^{\ell/2}$ evaluations, with no knowledge of how the function works. (Memory can be reduced to a constant with cycle-finding methods such as Floyd's or Pollard's rho, at a small constant cost in time.) Collision resistance at a "128-bit security level" therefore needs **256-bit** outputs, while preimage resistance at that level needs only 128 bits.

::: widget plot
f: 1 - exp(-x*(x-1)/(2*N))
x: 0, 100
y: 0, 1
sliders: N=365:5:2000
hlines: 0.5
labels: 1 - e^{-q(q-1)/2N}
caption: The probability of a collision among $q$ uniform values from $N$, in the approximation $1 - e^{-q(q-1)/(2N)}$ that is accurate whenever $q \ll N$. With $N = 365$ the curve crosses $1/2$ between $q = 22$ and $q = 23$. Move $N$ and watch the crossing: quadrupling $N$ only doubles the number of samples needed, because the crossing sits at $q \approx 1.18\sqrt N$.
:::

::: quiz
A hash function has 160-bit outputs. About how many evaluations does the generic birthday attack need to find a collision with probability about $1/2$?

- [ ] $2^{160}$
- [ ] $2^{159}$
- [x] $2^{80}$
- [ ] $160^2$
::: solution
With $N = 2^{160}$, a collision is likely after about $1.18\sqrt N \approx 2^{80.2}$ evaluations ([[#thm-birthday]]). That is why 160-bit SHA-1 offered at most 80-bit collision resistance even before its cryptanalysis, and why 256-bit outputs are standard today.
:::
:::

## The Merkle–Damgård construction

How do we hash inputs of any length? The **Merkle–Damgård** construction iterates a fixed-length **compression function** $h^s\colon \{0,1\}^{2n} \to \{0,1\}^n$ (more generally, from $n + b$ bits to $n$).

::: algorithm Merkle–Damgård {#alg-md}
To hash $x$ of length $L < 2^n$ bits with compression function $h^s$:

1. Pad $x$ with zeros to a multiple of $n$ bits and split it into blocks $x_1, \dots, x_B$. Append a final block $x_{B+1} = \langle L\rangle$, the length of $x$ in binary (**length padding** or **Merkle–Damgård strengthening**).
2. Let $z_0 = \mathit{IV}$, a fixed $n$-bit string.
3. For $i = 1, \dots, B + 1$: $z_i \gets h^s(z_{i-1} \,\|\, x_i)$.
4. Output $H^s(x) = z_{B+1}$.
:::

::: theorem Merkle–Damgård preserves collision resistance {#thm-md}
If $h^s$ is collision-resistant, then so is $H^s$ of [[#alg-md]].
:::

::: proof
We show that any collision $x \ne x'$ for $H^s$ yields, efficiently, a collision for $h^s$; so an adversary that finds the former with non-negligible probability finds the latter equally often. Let $x$ and $x'$ have lengths $L, L'$, blocks $x_1, \dots, x_{B+1}$ and $x'_1, \dots, x'_{B'+1}$, and chaining values $z_i, z'_i$.

*Case $L \ne L'$.* Then $x_{B+1} = \langle L\rangle \ne \langle L'\rangle = x'_{B'+1}$, so the final inputs $z_B \| x_{B+1}$ and $z'_{B'} \| x'_{B'+1}$ differ while $h^s$ maps both to $H^s(x) = H^s(x')$: a collision.

*Case $L = L'$.* Then $B = B'$. Write $I_i = z_{i-1} \| x_i$ and $I'_i = z'_{i-1} \| x'_i$ for the inputs to the $i$-th compression. Since $x \ne x'$ have the same length, they differ in some block, so $I_i \ne I'_i$ for some $i$. Let $i^*$ be the *largest* $i \le B + 1$ with $I_i \ne I'_i$. If $i^* = B + 1$, then $h^s(I_{B+1}) = H^s(x) = H^s(x') = h^s(I'_{B+1})$ is a collision. Otherwise $I_{i^*+1} = I'_{i^*+1}$, which says in particular $z_{i^*} = z'_{i^*}$, that is $h^s(I_{i^*}) = h^s(I'_{i^*})$ with $I_{i^*} \ne I'_{i^*}$: a collision.

Finding $i^*$ takes one pass over the blocks.
:::

The length block matters: without it, an adversary who finds a single block $x_1$ with $h^s(\mathit{IV} \| x_1) = \mathit{IV}$ gets collisions between $x$ and $x_1 \| x$. SHA-256 (FIPS 180-4) is a Merkle–Damgård hash with $256$-bit chaining values and $512$-bit message blocks; its padding appends a `1` bit, zeros, and the 64-bit message length. Its compression function uses the **Davies–Meyer** construction $h(z \,\|\, x) = E_x(z) \oplus z$ from a purpose-built block cipher $E$ keyed by the message block.

```python
import hashlib
print(hashlib.sha256(b"abc").hexdigest())
print(hashlib.sha256(b"abd").hexdigest())
```

```console
$ python3 sha.py
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
a52d159f262b2c6ddb724a61840befc36eb30c88877a4030b65cbe86298449c9
```

Changing one letter changes the digest completely — the avalanche effect again. The first line is the test vector given in the standard.

::: example SHA-256 padding {#ex-sha-pad}
SHA-256 pads a message of $L$ bits by appending a `1` bit, then $z \ge 0$ zero bits with $L + 1 + z \equiv 448 \pmod{512}$, then $L$ as a 64-bit integer. How many 512-bit blocks does it process for a 3-byte message, a 55-byte message, a 56-byte message and a 64-byte message?
::: solution
The padded length is the least multiple of $512$ that is at least $L + 1 + 64 = L + 65$.

| message | $L$ (bits) | $L + 65$ | blocks |
|---|---|---|---|
| 3 bytes (`abc`) | 24 | 89 | 1 |
| 55 bytes | 440 | 505 | 1 |
| 56 bytes | 448 | 513 | 2 |
| 64 bytes | 512 | 577 | 2 |

For `abc` the single block is `61 62 63 80`, then $52$ zero bytes, then the length `00 00 00 00 00 00 00 18` ($24$ in hexadecimal). A 55-byte message is the longest that fits in one block. The padding depends only on $L$, which is why someone who knows the *length* of a secret-prefixed message $k \,\|\, m$ knows its padding exactly — the observation behind length extension, next.
:::
:::

::: quiz
A service authenticates requests with $t = \mathrm{SHA\text{-}256}(k \,\|\, m)$ for a secret $k$. Which change makes it a secure MAC?

- [ ] Keep the construction, but make $k$ 256 bits long.
- [ ] Use $t = \mathrm{SHA\text{-}256}(m \,\|\, k)$, moving the key to the end.
- [x] Use $t = \mathrm{HMAC\text{-}SHA256}_k(m)$.
- [ ] Use MD5 instead, which is faster.
::: solution
The secret-prefix construction allows length extension whatever the key length. Moving the key to the end avoids length extension but makes forgery as easy as finding a collision $m, m'$ of the unkeyed hash's internal state — a weaker, unkeyed assumption, and broken outright for hashes like MD5 with known collisions. HMAC is the standard construction with a proof ([[#def-hmac]]); KMAC or plain SHA-3 with a key prefix also work. MD5 has practical collisions and must not be used.
:::
:::

### Length extension

Merkle–Damgård has a structural property that is not a collision but bites anyway: the output *is* the final chaining value. Anyone who knows $H(x)$ and the length of $x$ — but not $x$ — can continue the iteration, computing $H(x \,\|\, \mathit{pad}(x) \,\|\, y)$ for any $y$ of their choice, where $\mathit{pad}(x)$ is the padding that the hash appended to $x$. This **length-extension** property is harmless for collision resistance but fatal for the tempting MAC $\mathsf{Mac}_k(m) = H(k \,\|\, m)$: from a valid tag on $m$, an attacker computes a valid tag on $m \,\|\, \mathit{pad} \,\|\, y$ without knowing $k$, an existential forgery. Several web APIs that signed requests this way in the 2000s had to be redesigned. The defences are to use HMAC, which hides the chaining value under a second, keyed hash; to use a hash whose output is not its full internal state (SHA-512/256 truncates; SHA-3 is a sponge); or simply to use a MAC designed as one.

### HMAC

::: definition HMAC {#def-hmac}
Let $H$ be a Merkle–Damgård hash with $b$-byte blocks, and pad the key $k$ with zeros to $b$ bytes (hashing it first if longer). Let $\mathit{ipad}$ and $\mathit{opad}$ be the bytes `0x36` and `0x5c` repeated $b$ times. Then
$$
\mathrm{HMAC}_k(m) = H\big((k \oplus \mathit{opad}) \,\|\, H((k \oplus \mathit{ipad}) \,\|\, m)\big).
$$
:::

The inner hash compresses the message; the outer hash, applied to a short fixed-length input under an independent-looking key, prevents length extension. Bellare, Canetti and Krawczyk (1996) proved HMAC a secure PRF — and therefore a secure MAC — assuming that the compression function, keyed through its chaining input, is a PRF; it was standardised in RFC 2104 (1997) and FIPS 198. HMAC is also the basis of the key-derivation function HKDF used in TLS 1.3 ([[cryptography/protocols]]).

::: example HMAC through a standard library {#ex-hmac}
Compute HMAC-SHA256 with key `key` on the message `The quick brown fox jumps over the lazy dog`, and verify a received tag correctly.
::: solution
Python's standard `hmac` module implements [[#def-hmac]]:

```python
import hashlib, hmac

key, msg = b"key", b"The quick brown fox jumps over the lazy dog"
tag = hmac.new(key, msg, hashlib.sha256).hexdigest()
print(tag)

def verify(key, msg, received_hex):
    expected = hmac.new(key, msg, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, received_hex)   # constant-time comparison

print(verify(key, msg, tag), verify(key, msg + b".", tag))
```

```console
$ python3 hmac_demo.py
f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8
True False
```

The tag is a widely published test value. Changing the message by one character makes verification fail. The key `key` is for the example only; a real key is 32 uniformly random bytes from `secrets.token_bytes(32)` or `os.urandom(32)`, never a password or a word.
:::
:::

## SHA-3 and the sponge

After practical collisions were found in MD5 (Wang and colleagues, 2004) and attacks on SHA-1 improved, NIST held a public competition (2007–2012) for a new hash function with a different design. The winner, Keccak by Bertoni, Daemen, Peeters and Van Assche, was standardised as SHA-3 in FIPS 202 (2015). The first public SHA-1 collision followed in 2017 (Stevens and colleagues); SHA-2 remains unbroken as of 2026, and both SHA-2 and SHA-3 are standard.

Keccak is a **sponge**. Its state is $b = 1600$ bits, split into a **rate** part of $r$ bits and a **capacity** part of $c = b - r$ bits, and it uses a fixed public permutation $f$ of $\{0,1\}^{1600}$ (24 rounds of simple bit operations).

- **Absorbing.** Pad the message to a multiple of $r$ bits and split it into blocks $P_1, P_2, \dots$. Starting from the all-zero state, for each block XOR $P_i$ into the rate part and apply $f$.
- **Squeezing.** Output the rate part; if more output is needed, apply $f$ and output the rate part again.

The capacity part is never directly read or written by the outside world, and that is where the security lives: generic attacks cost about $2^{c/2}$ evaluations of $f$. SHA3-256 uses $c = 512$ (so $r = 1088$), giving 256-bit outputs with 128-bit collision resistance and 256-bit preimage resistance. Because the output is only part of the state, a sponge does not allow length extension, and the simple $H(k \,\|\, m)$ is a secure MAC for SHA-3 (standardised as KMAC). The same permutation yields the extendable-output functions SHAKE128 and SHAKE256, which produce as many output bits as requested and are used inside the post-quantum standards ([[cryptography/post-quantum]]).

```python
print(hashlib.sha3_256(b"abc").hexdigest())
```

```console
$ python3 sha3.py
3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532
```

## Authenticated encryption

We now combine secrecy and integrity.

::: definition Authenticated encryption {#def-ae}
A private-key encryption scheme is **unforgeable** if no PPT adversary with an encryption oracle can output, with non-negligible probability, a new ciphertext (one not returned by the oracle) that decrypts successfully (to something other than the error symbol $\bot$). It is an **authenticated encryption** scheme if it is both CCA-secure and unforgeable.
:::

There are three obvious ways to combine a CPA-secure encryption scheme with a MAC, using *independent* keys $k_E$ and $k_M$:

- **encrypt-and-MAC**: send $\mathsf{Enc}_{k_E}(m)$ and $\mathsf{Mac}_{k_M}(m)$ — used by SSH;
- **MAC-then-encrypt**: send $\mathsf{Enc}_{k_E}(m \,\|\, \mathsf{Mac}_{k_M}(m))$ — used by TLS up to version 1.2 with CBC;
- **encrypt-then-MAC**: send $c = \mathsf{Enc}_{k_E}(m)$ and $t = \mathsf{Mac}_{k_M}(c)$ — used by IPsec ESP.

Only the last is secure in general. Encrypt-and-MAC can leak: a MAC need not hide its message, and a deterministic MAC reveals whether two messages are equal. MAC-then-encrypt can be secure for particular combinations, but the receiver must decrypt (and unpad) before it can check the tag, which is exactly how the padding oracles of [[cryptography/block-ciphers]] arose in TLS. Encrypt-then-MAC rejects every modified ciphertext before decryption.

::: theorem Encrypt-then-MAC is CCA-secure {#thm-etm}
Let $\Pi_E$ be CPA-secure and $\Pi_M$ a strongly unforgeable MAC, with independent keys. Then encrypt-then-MAC — $\mathsf{Enc}'_{k_E, k_M}(m) = \langle c, t\rangle$ with $c \gets \mathsf{Enc}_{k_E}(m)$ and $t \gets \mathsf{Mac}_{k_M}(c)$, and decryption that outputs $\bot$ if $\mathsf{Vrfy}_{k_M}(c, t) = 0$ and $\mathsf{Dec}_{k_E}(c)$ otherwise — is CCA-secure (and in fact an authenticated encryption scheme).
:::

::: proof
Let $\mathcal A$ be a PPT adversary in $\mathsf{PrivK}^{\mathsf{cca}}$ against $\Pi'$, making at most $q$ decryption queries. Call a decryption query $\langle c, t\rangle$ **valid and new** if $\mathsf{Vrfy}_{k_M}(c, t) = 1$ and $\langle c, t\rangle$ was not returned to $\mathcal A$ by the encryption oracle (nor is it the challenge, which $\mathcal A$ may not query). Let $\mathsf{VQ}$ be the event that $\mathcal A$ makes at least one such query. Then
$$
\Prob[\mathcal A \text{ succeeds}] \le \Prob[\mathsf{VQ}] + \Prob[\mathcal A \text{ succeeds} \wedge \neg\mathsf{VQ}] .
$$

*$\Prob[\mathsf{VQ}]$ is negligible.* Build a MAC forger $\mathcal F$: it chooses $k_E$ itself and a uniform index $j \in \{1, \dots, q\}$, and runs $\mathcal A$. It answers encryption queries (and the challenge) by encrypting with $k_E$ and obtaining the tag from its own $\mathsf{Mac}$ oracle. It answers a decryption query $\langle c, t\rangle$ by returning the stored plaintext if the pair was previously output by the encryption oracle, and $\bot$ otherwise — except that at the $j$-th decryption query it stops and outputs $(c, t)$ as its forgery. Until the first valid-and-new query, this simulation is exact: every new pair is answered with $\bot$, which is the right answer unless the pair is valid. If $\mathsf{VQ}$ occurs and $j$ is the index of the first valid-and-new query — probability at least $\Prob[\mathsf{VQ}]/q$ — then $\mathcal F$ outputs a valid pair $(c, t)$ that its oracle never returned, a strong forgery. So $\Prob[\mathsf{VQ}] \le q\cdot\Prob[\mathcal F \text{ forges}]$, negligible.

*$\Prob[\mathcal A \text{ succeeds} \wedge \neg\mathsf{VQ}] \le \tfrac12 + \mathsf{negl}(n)$.* Build a CPA adversary $\mathcal A_E$ against $\Pi_E$: it chooses $k_M$ itself, runs $\mathcal A$, answers encryption queries with its own encryption oracle plus a tag under $k_M$, forwards $\mathcal A$'s challenge messages and tags the challenge it receives, and answers decryption queries by the same rule as $\mathcal F$ (stored plaintext for pairs it produced, $\bot$ otherwise). It outputs $\mathcal A$'s guess. Until $\mathsf{VQ}$ occurs, $\mathcal A$'s view is exactly as in the real CCA experiment, so the probability of the event "$\mathcal A$ succeeds and $\neg\mathsf{VQ}$" is the same in both, and it is at most $\Prob[\mathcal A_E \text{ succeeds}] \le \tfrac12 + \mathsf{negl}(n)$.

Adding the two bounds proves CCA-security. Unforgeability follows from the first part, since a new valid ciphertext is a strong MAC forgery.
:::

Strong unforgeability is used in the proof: with an ordinary MAC, an adversary might produce a second valid tag $t' \ne t$ for the challenge $c$ and query $\langle c, t'\rangle$, which the CCA game allows. HMAC and CMAC, being deterministic and pseudorandom, are strongly unforgeable.

::: example Encrypt-then-MAC with a library HMAC {#ex-etm}
Build a toy encrypt-then-MAC scheme from HMAC-SHA256 — used once as a PRF to generate a CTR-style keystream under $k_E$, and once as the MAC under an independent key $k_M$ — encrypt the message `PAY BOB 0010 EUR`, then flip one bit of the ciphertext and show that the receiver rejects it without decrypting.
::: solution
```python
import hashlib, hmac

def prf(k, x):                                   # HMAC-SHA256 used as a PRF
    return hmac.new(k, x, hashlib.sha256).digest()

def encrypt(kE, kM, nonce, m):                   # toy CTR + HMAC: study only
    pad = b"".join(prf(kE, nonce + i.to_bytes(4, "big")) for i in range(len(m) // 32 + 1))
    c = nonce + bytes(a ^ b for a, b in zip(m, pad))
    return c, prf(kM, c)                         # the tag covers nonce and ciphertext

def decrypt(kE, kM, c, t):
    if not hmac.compare_digest(prf(kM, c), t):
        return None                              # reject before decrypting
    nonce, body = c[:12], c[12:]
    pad = b"".join(prf(kE, nonce + i.to_bytes(4, "big")) for i in range(len(body) // 32 + 1))
    return bytes(a ^ b for a, b in zip(body, pad))

kE, kM = bytes(range(32)), bytes(range(32, 64))  # fixed demo keys; use secrets.token_bytes
c, t = encrypt(kE, kM, b"\x00" * 12, b"PAY BOB 0010 EUR")
print(decrypt(kE, kM, c, t))
bad = bytearray(c); bad[12 + 9] ^= 0x01          # flip one bit of the amount
print(decrypt(kE, kM, bytes(bad), t))
```

```console
$ python3 etm.py
b'PAY BOB 0010 EUR'
None
```

Without the tag, flipping the lowest bit of byte $9$ of the plaintext would have turned `0010` into `0110` — malleability. With encrypt-then-MAC the modified ciphertext fails verification and is rejected before any decryption, so the receiver reveals nothing about it beyond "invalid". The tag covers the nonce as well as the ciphertext body; leaving the nonce unauthenticated would let an attacker change it and hence the keystream. The two keys are independent, as [[#thm-etm]] requires: with one key used for both purposes the proof breaks down (the reductions can no longer simulate one primitive while being given only an oracle for the other), and for some combinations the scheme does too. Real code derives separate keys with a key-derivation function such as HKDF, or simply calls an AEAD such as AES-GCM from a vetted library, which handles nonces, keys and tags as one unit. The nonce here is all zeros, acceptable only because this key pair encrypts a single message.
:::
:::

**GCM** ([[cryptography/block-ciphers]]) is an authenticated-encryption mode of the encrypt-then-MAC type: CTR encryption, then a tag computed by the polynomial hash GHASH under the subkey $H = \mathrm{AES}_k(0^{128})$, masked with an encryption of the initial counter. GHASH is not a PRF but an **almost-XOR-universal hash** — for two different messages, the XOR of their hashes equals a given value with probability at most about $\ell/2^{128}$ over $H$, for messages of $\ell$ blocks — and masking it with a fresh pseudorandom value per nonce makes it a one-time MAC in the spirit of [[cryptography/perfect-secrecy]]. ChaCha20-Poly1305 (RFC 8439) is built the same way from a stream cipher and the polynomial hash Poly1305. Both also authenticate **associated data** — headers that must travel in the clear but must not be modified — which is why they are called AEAD schemes (authenticated encryption with associated data).

::: history
Ralph Merkle and Ivan Damgård independently published the iterated construction and its proof at CRYPTO 1989. Ron Rivest designed MD4 (1990) and MD5 (1992); the NSA designed SHA-0 (1993), SHA-1 (1995) and SHA-2 (2001). Xiaoyun Wang and colleagues found MD5 collisions in 2004 and showed SHA-1 weaker than its birthday bound in 2005; Marc Stevens and colleagues at CWI and Google published the first SHA-1 collision ("SHAttered") in 2017. NIST's SHA-3 competition (2007–2012) chose Keccak, published as FIPS 202 in 2015. On the MAC side, Bellare, Kilian and Rogaway analysed CBC-MAC in 1994; Bellare, Canetti and Krawczyk introduced HMAC in 1996 (RFC 2104, 1997); Bellare and Namprempre's 2000 paper on generic composition proved encrypt-then-MAC secure and explained the weaknesses of the alternatives; and David McGrew and John Viega designed GCM in 2004.
:::

## Where this leads

Hash functions are half of every digital signature: [[cryptography/signatures]] signs $H(m)$ rather than $m$, so a collision in $H$ is a forged signature, and uses Merkle trees of hashes to build signatures that rely only on hash functions — the basis of the post-quantum standard SLH-DSA ([[cryptography/post-quantum]]). The **random-oracle model**, in which a hash function is treated as a truly random function, underlies RSA-OAEP ([[cryptography/public-key]]) and Schnorr signatures. Key derivation with HKDF, and AEAD for the TLS record layer, appear in [[cryptography/protocols]]. Password hashing is a different problem — the inputs have little entropy, so the hash must be deliberately slow and salted (scrypt, Argon2) — and belongs to [[security]].

::: summary
- A **MAC** is secure if no efficient adversary with a tagging oracle can tag a new message ([[#def-mac]]). A PRF is a MAC for one block ([[#thm-prf-mac]]); CBC-MAC is secure only for fixed-length messages, and CMAC fixes that. Verify tags in constant time.
- A **collision-resistant** hash makes it hard to find $x \ne x'$ with $H(x) = H(x')$ ([[#def-crhf]]); it implies second-preimage resistance.
- **Birthday bound**: $q$ uniform values from $N$ collide with probability at most $q(q-1)/2N$ and at least $(1 - 1/e)q(q-1)/2N$ for $q \le \sqrt{2N}$ ([[#thm-birthday]]); $q = 23$ gives $0.5073$ for $N = 365$. An $\ell$-bit hash offers at most $\ell/2$-bit collision resistance.
- **Merkle–Damgård** with length padding turns a collision-resistant compression function into a collision-resistant hash ([[#thm-md]]), but allows **length extension**, so $H(k \,\|\, m)$ is not a MAC. **HMAC** ([[#def-hmac]]) and the **SHA-3 sponge** avoid it.
- **Authenticated encryption** is CCA-security plus unforgeability ([[#def-ae]]). **Encrypt-then-MAC** with independent keys is CCA-secure ([[#thm-etm]]); MAC-then-encrypt invited padding oracles. GCM and ChaCha20-Poly1305 are standard AEAD modes.
:::

## Exercises

::: exercise The birthday problem {level=1 check="23"}
What is the smallest number of people for which the probability that two share a birthday (365 equally likely birthdays, ignoring leap years) exceeds $1/2$? (Enter the number.)
::: solution
From [[#ex-birthday]], $q = 22$ gives $1 - \prod_{i=1}^{21}(1 - i/365) \approx 0.4757$ and $q = 23$ gives $0.5073$, so the answer is $23$. The bound $\sqrt{2\ln 2 \cdot 365} \approx 22.5$ predicts it.
:::
:::

::: exercise Generic collision cost {level=1 check="2^128"}
About how many hash evaluations does the generic birthday attack need to find a SHA-256 collision with probability about $1/2$? Give the answer to the nearest power of two. (Enter it as a power of two, such as `2^100`.)
::: solution
$N = 2^{256}$, so about $1.18 \cdot 2^{128}$ evaluations, that is $2^{128}$ to the nearest power of two. This is the sense in which SHA-256 offers "128-bit" collision resistance. Preimages, by contrast, cost about $2^{256}$ generically.
:::
:::

::: exercise A MAC with short tags {level=1 check="2^(-32)"}
A MAC built from a PRF outputs 32-bit tags. What is the probability that an adversary who outputs a random tag on a new message succeeds, if the PRF is ideal? (Enter the probability.)
::: solution
By the proof of [[#thm-prf-mac]], an unqueried PRF value is uniform, so a guess succeeds with probability $2^{-32} \approx 2.3 \times 10^{-10}$. That sounds small, but an attacker who can submit many forgery attempts online — each rejected silently — succeeds after about $2^{32}$ attempts. Short tags are acceptable only when the number of verification attempts is limited, which is why 128-bit tags are the norm.
:::
:::

::: exercise CBC-MAC with variable lengths {#ex-cbc-mac level=2}
Let $\mathsf{Mac}_k$ be CBC-MAC applied to messages of any number of blocks. Given the tag $t$ of a one-block message $m$, produce a valid tag on a two-block message without querying it.
::: solution
CBC-MAC of the two-block message $m \,\|\, (m \oplus t)$ is $F_k\big(F_k(m) \oplus m \oplus t\big) = F_k(t \oplus m \oplus t) = F_k(m) = t$. So $(m \,\|\, (m \oplus t), t)$ is a forgery. More generally, the tag of a message is a chaining value from which computation can continue. Fixed-length CBC-MAC is immune because the forgery has a different length; CMAC and length-prepending prevent the attack for variable lengths.
:::
:::

::: exercise Collision resistance implies second-preimage resistance {level=2}
Prove that a collision-resistant hash function is second-preimage resistant, by a reduction.
::: solution
Let $\mathcal A$ find second preimages: given $s$ and a uniform $x$ (from the relevant input set), it outputs $x' \ne x$ with $H^s(x') = H^s(x)$ with probability $\varepsilon(n)$. The collision finder $\mathcal C$, given $s$, chooses $x$ uniformly itself, runs $\mathcal A(s, x)$ to get $x'$, and outputs $(x, x')$. $\mathcal C$ runs in polynomial time and succeeds exactly when $\mathcal A$ does, with probability $\varepsilon(n)$, so $\varepsilon$ is negligible. The converse fails: a function can be second-preimage resistant and yet have known collisions for specially structured inputs.
:::
:::

::: exercise Why length padding is needed {level=2}
Consider Merkle–Damgård *without* the final length block. Suppose someone finds a block $y$ with $h^s(\mathit{IV} \,\|\, y) = \mathit{IV}$ (a fixed point reached from the IV). Give a collision for the resulting $H^s$, and explain why the theorem's proof fails without the length block.
::: solution
For any message $x$ (a whole number of blocks), $H^s(y \,\|\, x) = H^s(x)$: after processing $y$ the chaining value is back to $\mathit{IV}$, and the rest of the computation is identical. So $(x, y\|x)$ is a collision. In the proof of [[#thm-md]], the case $L = L'$ needs the two block sequences to have the same number of blocks so that the backwards walk pairs block $i$ with block $i$; with different lengths and no length block, the walk can reach the start of the shorter message without finding a differing compression input. The length block forces either a differing last compression input or equal lengths.
:::
:::

::: exercise Encrypt-and-MAC leaks equality {level=2}
Show that encrypt-and-MAC, with any CPA-secure encryption and a deterministic MAC such as HMAC, is not even CPA-secure.
::: solution
The adversary queries its encryption oracle on $m_0$ and receives $\langle c, t_0\rangle$ with $t_0 = \mathsf{Mac}_{k_M}(m_0)$. It then submits challenge messages $m_0$ and $m_1 \ne m_0$ and receives $\langle c^*, t^*\rangle$. Since the MAC is deterministic, $t^* = t_0$ if $b = 0$, while if $b = 1$, $t^* = \mathsf{Mac}_{k_M}(m_1)$, which equals $t_0$ only with negligible probability (otherwise the adversary could forge by guessing that $m_1$ has the tag $t_0$). So outputting $b' = 0$ iff $t^* = t_0$ succeeds with probability close to $1$. The tag is computed on the plaintext and was never designed to hide it.
:::
:::

::: exercise The lower birthday bound in numbers {level=3 check="1 - e^(-1/2)"}
For $N = 2^{64}$ and $q = 2^{32}$, compute (a) the upper bound $q(q-1)/2N$, (b) the lower bound $(1 - 1/e)q(q-1)/2N$, and (c) the approximation $1 - e^{-q(q-1)/2N}$ to the exact collision probability, to four decimal places. Explain why (c) is accurate here. (Enter the value of (c) as an exact expression, such as `1 - e^(-1/2)`, or to six decimal places.)
::: solution
$q(q-1)/2N = 2^{32}(2^{32} - 1)/2^{65} = \tfrac12(1 - 2^{-32}) \approx 0.5000$. (b) $0.6321 \times 0.5 \approx 0.3161$. (c) $1 - e^{-0.5} \approx 0.393469$ (to four places $0.3935$). The exact value is $1 - \prod_{i<q}(1 - i/N)$, and $\ln(1 - i/N) = -i/N - i^2/(2N^2) - \dots$; the correction terms sum to about $q^3/(6N^2) = 2^{96}/(6 \cdot 2^{128}) \approx 4 \times 10^{-11}$, negligible, so the exponential approximation agrees with the exact value to many decimal places. The true probability, $0.3935$, lies between the lower bound $0.3161$ and the upper bound $0.5000$, as [[#thm-birthday]] promises.
:::
:::

::: exercise Implement a birthday search on a truncated hash {level=3}
Using `hashlib.sha256`, define $H_{32}(x)$ as the first 4 bytes of $\mathrm{SHA\text{-}256}(x)$. Write a program that hashes the strings `b"msg-0"`, `b"msg-1"`, … until two of them have the same $H_{32}$, and report how many strings it hashed. Compare with the prediction of [[#thm-birthday]]. (This attacks only your own deliberately weakened toy function; full SHA-256 is far beyond reach.)
::: solution
```python
import hashlib, math

def h32(x: bytes) -> bytes:
    return hashlib.sha256(x).digest()[:4]        # a deliberately weak 32-bit hash

seen = {}
i = 0
while True:
    x = b"msg-%d" % i
    d = h32(x)
    if d in seen:
        print(i + 1, seen[d], x, d.hex())
        break
    seen[d] = x
    i += 1
print(round(math.sqrt(2 * math.log(2) * 2**32)))
```

On one run the program hashed $114\,807$ strings before `msg-114806` collided with `msg-108856` (both have $H_{32}$ = `38b4f97a`). The exact count depends on the strings, but the theorem predicts a collision with probability $1/2$ after about $\sqrt{2\ln 2\cdot 2^{32}} \approx 77\,163$ strings, and almost certainly after a few times that; the expected number is about $\sqrt{\pi N/2} \approx 82\,137$. Each extra output bit multiplies the work by $\sqrt 2$, so 256 bits put collisions at $2^{128}$.
:::
:::
