The previous chapters built secure primitives — authenticated encryption, Diffie–Hellman, signatures — each with a precise definition and a proof. Real security needs them combined into a **protocol**: a sequence of messages between parties that achieves a goal such as "Alice and Bob end up sharing a fresh key, each knows who the other is, and nobody else learns anything about the key". Protocols are where most cryptographic failures happen, because secure parts can be combined insecurely: a message can be replayed in a different session, reflected back to its sender, or accepted as coming from someone who never sent it. The classic example is a three-message protocol published in 1978, in which a flaw went unnoticed for seventeen years.

This chapter studies three kinds of protocol. **Authenticated key exchange** is the foundation of secure communication, and we follow it from a broken textbook protocol through the design principles of TLS 1.3, the protocol behind HTTPS, including its key-derivation function HKDF. **Secret sharing** splits a secret so that any $t$ of $n$ parties can recover it but fewer learn nothing, with a perfect-security proof in the style of [[cryptography/perfect-secrecy]]. **Zero-knowledge proofs** convince a verifier that a statement is true while revealing nothing else. The networking side of TLS — round trips, HTTP/3 and what TLS does not hide — is in [[networks/application-layer]] and is not repeated here.

## Authenticated key exchange

Diffie–Hellman alone resists eavesdroppers ([[cryptography/public-key#thm-dh]]) but not a man in the middle. An **authenticated key exchange** (AKE) protocol should give, for every session that completes:

- **key secrecy**: the session key is indistinguishable from random to an attacker who controls the network — who can delay, drop, modify, replay and inject messages and start sessions of its own — and who may also learn the keys of *other* sessions;
- **authentication**: if Alice completes a session believing she talks to Bob, then Bob took part in that session with Alice, and they hold the same key (entity authentication and **key confirmation**);
- **forward secrecy**: session keys remain secret even if the parties' long-term private keys are stolen *after* the session ends.

Formal models making this precise, in which the adversary schedules many concurrent sessions and may corrupt parties and reveal session keys, were introduced by Bellare and Rogaway (1993) and Canetti and Krawczyk (2001). We work with the informal goals and look at how protocols meet or miss them.

### A protocol flaw

The Needham–Schroeder public-key protocol (1978) lets $A$ and $B$, who know each other's public encryption keys, authenticate each other with fresh random **nonces** $N_A$, $N_B$; we write $\{X\}_B$ for $X$ encrypted under $B$'s public key.

1. $A \to B$: $\{N_A, A\}_B$
2. $B \to A$: $\{N_A, N_B\}_A$
3. $A \to B$: $\{N_B\}_B$

Each party has sent a fresh nonce that only the intended recipient can decrypt and has seen it returned, so each seems to be talking to the other. In 1995 Gavin Lowe found that this is wrong, using a model checker. Suppose $A$ starts a session with a dishonest party $M$. $M$ decrypts message 1, re-encrypts $\{N_A, A\}$ under $B$'s key and sends it to $B$. $B$ replies with $\{N_A, N_B\}_A$, addressed to $A$; $M$ cannot read it but forwards it to $A$ as its own reply. $A$, believing it is talking to $M$, decrypts it and sends $\{N_B\}_M$; $M$ decrypts this and sends $\{N_B\}_B$ to $B$. Now $B$ believes it has authenticated $A$ — but $A$ was talking to $M$, and $M$ knows both nonces. Every primitive worked; the protocol failed, because message 2 does not say *who* sent it. Lowe's fix is to include the responder's identity: $\{N_A, N_B, B\}_A$. Then $A$, expecting $M$, sees $B$'s name and aborts.

The lesson generalises into a design rule: **bind every message to its context** — the identities of the parties, the session, and everything said so far. The standard way to do so is to authenticate the hash of the entire **transcript**.

### Signed Diffie–Hellman and SIGMA

A natural fix for man-in-the-middle attacks is for each party to sign its Diffie–Hellman share. But signing only $g^y$ is not enough: an attacker can replay an old signed share, and identities can be misbound (an attacker relays a party's signed share while claiming it as its own). The **SIGMA** design ("SIGn-and-MAc", Krawczyk 2003), the basis of TLS 1.3 and IKEv2, has each party

1. send an ephemeral share $g^x$ or $g^y$;
2. sign the transcript so far — both shares and everything else exchanged — with its long-term key; and
3. send a MAC, under a key derived from $g^{xy}$, of its own identity and the transcript, proving that it holds the session key and binding its identity to it.

The signature proves who is present in *this* session (the transcript contains the fresh shares, so old signatures do not fit), and the MAC proves possession of the key and binds the identity to it, preventing misbinding. Because the shares are **ephemeral** — new exponents for every session, erased afterwards — stealing a long-term signing key later lets an attacker impersonate the party in future sessions but not compute the keys of past ones: forward secrecy. Contrast **RSA key transport**, used in TLS up to version 1.2, in which the client encrypts a random secret under the server's long-term RSA key: an attacker who records traffic and later obtains that key decrypts every recorded session.

::: definition Key-derivation function HKDF {#def-hkdf}
HKDF (Krawczyk 2010; RFC 5869) derives keys from a secret with HMAC ([[cryptography/hash-mac#def-hmac]]) in two steps:

- **Extract**: $\mathit{PRK} = \mathrm{HMAC}(\mathit{salt}, \mathit{IKM})$ turns input keying material $\mathit{IKM}$ that is secret but not uniform (such as a Diffie–Hellman group element) into a pseudorandom key;
- **Expand**: $\mathit{OKM} = T(1) \,\|\, T(2) \,\|\, \dots$ truncated to $L$ bytes, where $T(0)$ is empty and $T(i) = \mathrm{HMAC}(\mathit{PRK},\ T(i-1) \,\|\, \mathit{info} \,\|\, i)$ with $i$ a single byte.
:::

The $\mathit{info}$ string labels each derived key with its purpose ("client handshake traffic key", say), so that keys for different purposes are independent: compromising one tells nothing about the others. This is the systematic answer to the key-separation requirement of [[cryptography/hash-mac#thm-etm]].

::: example HKDF with a test vector {#ex-hkdf}
Compute HKDF-SHA256 with $\mathit{IKM}$ = 22 bytes `0x0b`, $\mathit{salt}$ = bytes `00` to `0c`, $\mathit{info}$ = bytes `f0` to `f9` and $L = 42$, and compare with the first test case of RFC 5869.
::: solution
```python
import hashlib, hmac

def hkdf_extract(salt, ikm):
    return hmac.new(salt, ikm, hashlib.sha256).digest()

def hkdf_expand(prk, info, L):
    out, t, i = b"", b"", 1
    while len(out) < L:
        t = hmac.new(prk, t + info + bytes([i]), hashlib.sha256).digest()
        out, i = out + t, i + 1
    return out[:L]

prk = hkdf_extract(bytes(range(13)), b"\x0b" * 22)
print(prk.hex())
print(hkdf_expand(prk, bytes(range(0xF0, 0xFA)), 42).hex())
```

```console
$ python3 hkdf.py
077709362c2e32df0ddc3f0dc47bba6390b6c73bb50f9c3122ec844ad7c2b3e5
3cb25f25faacd57a90434f64d0362f2a2d2d0a90cf1a5a4c5db02d56ecc4c5bf34007208d5b887185865
```

Both lines match the PRK and OKM of RFC 5869's test case 1. Since SHA-256 outputs 32 bytes, $L = 42$ needs $\lceil 42/32\rceil = 2$ HMAC blocks in the expand step, of which the second is truncated to 10 bytes. In production, use a library's HKDF (Python's `cryptography` package provides one) rather than this listing — though here, unusually, the listing is short enough to check against the standard.
:::
:::

## TLS 1.3

TLS 1.3 (RFC 8446, 2018) was designed in an unusually open process, with academic analysis of drafts — including machine-checked proofs of the handshake in symbolic models — feeding back into the design. It removed everything from earlier versions that had caused attacks: RSA key transport (no forward secrecy, Bleichenbacher oracles), static Diffie–Hellman, CBC mode and MAC-then-encrypt (padding oracles), compression (which leaks secrets through ciphertext length), renegotiation, and custom groups. What remains, in a full handshake with server authentication, is a SIGMA-style protocol. Braces $\{\dots\}$ mark messages encrypted under handshake keys.

1. **Client → Server: `ClientHello`** — a random nonce, the supported cipher suites (such as `TLS_AES_128_GCM_SHA256` and `TLS_CHACHA20_POLY1305_SHA256` — AEAD and hash only), and a `key_share` with one or more ephemeral public keys, for example an X25519 share $g^x$, or, as of 2026 increasingly, a hybrid share combining X25519 with the post-quantum ML-KEM ([[cryptography/post-quantum]]).
2. **Server → Client: `ServerHello`** — its own nonce, the chosen suite and its `key_share` $g^y$. Both sides can now compute $g^{xy}$ and derive handshake keys.
3. **Server → Client: `{EncryptedExtensions}`, `{Certificate}`, `{CertificateVerify}`, `{Finished}`** — the server's certificate chain ([[cryptography/signatures]]), a signature with the certificate's key over the hash of the transcript so far, and a MAC (HMAC) over the transcript under a key derived from the handshake secret.
4. **Client → Server: `{Finished}`** — the client's MAC over the transcript. (If the server asked for client authentication, the client's `Certificate` and `CertificateVerify` come first.) Application data then flows under application traffic keys.

The **key schedule** chains HKDF calls. An *early secret* is extracted from a pre-shared key (or zeros); a *handshake secret* is extracted with the Diffie–Hellman value as input keying material and the previous secret, via an expand step, as salt; a *master secret* follows. From each secret, labelled expand steps that include a hash of the transcript up to that point derive the client and server traffic keys, the `Finished` keys, and secrets for resumption. Every key thus depends on the fresh Diffie–Hellman value *and* on the exact messages exchanged, so a modification anywhere produces different keys and failed `Finished` checks.

::: example Following the authentication in TLS 1.3 {#ex-tls}
An attacker on the path replaces the server's `key_share` $g^y$ with its own $g^{y'}$, hoping to sit in the middle. At which step does the handshake fail, and why? What if instead the attacker removes the client's strongest cipher suite from the `ClientHello` to force a weaker one?
::: solution
The client computes keys from $g^{xy'}$, and the attacker can decrypt the server's encrypted messages only if it also replaced the client's share in the other direction — the classic man-in-the-middle. But it cannot produce a valid `CertificateVerify`: the server's signature covers the hash of the transcript as the *server* saw it, containing $g^{y}$, while the client's transcript contains $g^{y'}$, so the signature fails to verify for the client; and the attacker cannot sign a new transcript without the certificate's private key. The handshake aborts at the client's check of `CertificateVerify`.

Removing a cipher suite changes the `ClientHello`, which is part of the signed and MACed transcript, so the server's signature and the `Finished` MACs, computed over the server's view, no longer match the client's. Downgrade to an *older protocol version* gets special treatment, since an old version would not authenticate the transcript in the same way: a TLS 1.3 server that negotiates TLS 1.2 writes a fixed marker into the last bytes of its signed random nonce, which a TLS 1.3 client checks.
:::
:::

**Resumption and 0-RTT.** After a handshake the server can issue a ticket for a pre-shared key, letting the client resume later with an abbreviated handshake (optionally still with a fresh Diffie–Hellman exchange for forward secrecy). With **0-RTT** the client sends application data in its first flight, encrypted under a key derived from the pre-shared key alone. This data has no forward secrecy with respect to that key and can be **replayed** by an attacker, since the server has not yet contributed any fresh randomness; TLS 1.3 leaves it to applications to use 0-RTT only for requests that are safe to repeat ([[networks/application-layer]] counts the round trips saved).

::: warning Do not design your own protocol
The Needham–Schroeder flaw survived seventeen years of expert attention; TLS before version 1.3 accumulated a long list of attacks on combinations of individually sound parts, and new protocol bugs are still found by formal tools. Designing an authentication or key-exchange protocol is a research activity, not an engineering task. Use TLS 1.3 through a maintained library, or, for custom settings, a framework with published analysis such as the Noise protocol framework or a messaging protocol with formal proofs, and configure it with its recommended defaults. "Encrypt the socket with AES" is not a protocol.
:::

::: quiz
A server uses TLS 1.2 with RSA key transport. Years later its RSA private key is stolen. An attacker had recorded many past sessions. What can it do?

- [ ] Nothing: session keys were random and are deleted after each session.
- [x] Decrypt every recorded session, because each session's premaster secret was encrypted under the stolen key.
- [ ] Only impersonate the server in future sessions.
- [ ] Decrypt only sessions that used 0-RTT.
::: solution
With RSA key transport, the client encrypted the session's premaster secret under the server's long-term key, so that key decrypts the recorded handshakes and hence the sessions: no forward secrecy. With ephemeral Diffie–Hellman (mandatory in TLS 1.3 full handshakes) the stolen key would allow future impersonation but not decryption of the past. The same "record now, decrypt later" worry motivates the move to post-quantum key exchange.
:::
:::

## Secret sharing

A company's signing key is too valuable to entrust to one employee, and too valuable to lose if one employee leaves. **Threshold secret sharing** splits it into $n$ shares such that any $t$ of them reconstruct it and any $t - 1$ reveal nothing at all.

::: definition Shamir's secret sharing {#def-shamir}
Let $p > n$ be a prime and the secret $S \in \Z_p$. The dealer chooses $a_1, \dots, a_{t-1}$ uniformly from $\Z_p$, forms the polynomial
$$
f(x) = S + a_1x + a_2x^2 + \dots + a_{t-1}x^{t-1} \pmod p,
$$
and gives party $i$ the share $(i, f(i))$, for $i = 1, \dots, n$.
:::

::: theorem Shamir's scheme is correct and perfectly private {#thm-shamir}
(a) Any $t$ shares determine $S$, which can be computed by Lagrange interpolation: for distinct $x_1, \dots, x_t$,
$$
S = f(0) = \sum_{j=1}^t f(x_j)\,\lambda_j, \qquad \lambda_j = \prod_{m \ne j}\frac{-x_m}{x_j - x_m} \pmod p .
$$
(b) Any $t - 1$ shares are uniformly distributed and independent of $S$: they give no information about $S$ in the sense of perfect secrecy.
:::

::: proof
Both parts rest on the fact that over the field $\Z_p$, for distinct points $x_1, \dots, x_t$ and any values $y_1, \dots, y_t$, there is **exactly one** polynomial of degree at most $t - 1$ with $f(x_j) = y_j$ for all $j$. Existence: the Lagrange polynomial $L(x) = \sum_j y_j\prod_{m\ne j}(x - x_m)/(x_j - x_m)$ has degree at most $t-1$ and takes the value $y_j$ at $x_j$ (the product is $1$ at $x_j$ and $0$ at the other points); the denominators are non-zero, hence invertible, because the $x_j$ are distinct and $p$ is prime. Uniqueness: the difference of two such polynomials has degree at most $t - 1$ and $t$ roots, and a non-zero polynomial over a field has at most as many roots as its degree, so the difference is zero.

(a) $f$ itself is a polynomial of degree at most $t - 1$ through the $t$ shares, so it equals $L$, and $S = f(0) = L(0)$, which is the stated formula.

(b) Fix any $t - 1$ distinct non-zero points $x_1, \dots, x_{t-1}$. For each candidate secret $S'$ and each list of values $(y_1, \dots, y_{t-1})$, there is exactly one polynomial of degree at most $t-1$ through the $t$ points $(0, S'), (x_1, y_1), \dots, (x_{t-1}, y_{t-1})$, that is, exactly one choice of coefficients $(a_1, \dots, a_{t-1})$. The coefficients are uniform over $\Z_p^{t-1}$, so for every $S'$, each of the $p^{t-1}$ possible lists of share values occurs with probability exactly $p^{-(t-1)}$. The distribution of the $t - 1$ shares is therefore uniform and does not depend on the secret — exactly the condition of [[cryptography/perfect-secrecy#lem-perfect-equiv]].
:::

::: example Sharing and recovering a secret {#ex-shamir}
With $p = 97$, $t = 3$ and secret $S = 13$, the dealer picks $a_1 = 5$, $a_2 = 2$. Compute the shares of parties $1$ to $6$, recover $S$ from the shares of parties $1$, $3$ and $5$, and show that the shares of parties $1$ and $3$ alone are consistent with every secret.
::: solution
$f(x) = 13 + 5x + 2x^2 \bmod 97$ gives $f(1) = 20$, $f(2) = 31$, $f(3) = 46$, $f(4) = 65$, $f(5) = 88$ and $f(6) = 115 \bmod 97 = 18$.

From $x = 1, 3, 5$ the Lagrange coefficients at $0$ are
$$
\lambda_1 = \frac{(-3)(-5)}{(1-3)(1-5)} = \frac{15}{8}, \quad \lambda_3 = \frac{(-1)(-5)}{(3-1)(3-5)} = -\frac54, \quad \lambda_5 = \frac{(-1)(-3)}{(5-1)(5-3)} = \frac38 .
$$
Over the rationals, $\tfrac{15}{8}\cdot 20 - \tfrac54 \cdot 46 + \tfrac38 \cdot 88 = 37.5 - 57.5 + 33 = 13$. Modulo $97$ the coefficients are $15 \cdot 8^{-1} \equiv 14$, $-5\cdot 4^{-1} \equiv 23$ and $3 \cdot 8^{-1} \equiv 61$, and $14 \cdot 20 + 23 \cdot 46 + 61 \cdot 88 = 280 + 1058 + 5368 = 6706 = 69 \cdot 97 + 13$, so again $S = 13$. The shares of parties $2, 4, 6$ (with the wrapped-around value $18$) also give $13$.

With only $(1, 20)$ and $(3, 46)$, *every* secret is possible: for $S' = 0$ the polynomial $87x + 30x^2$ fits, for $S' = 1$ the polynomial $1 + 21x + 95x^2$, for $S' = 2$ the polynomial $2 + 52x + 63x^2$, and so on — one polynomial for each of the $97$ secrets, as part (b) of [[#thm-shamir]] says.

```python
P = 97
def recover(shares):
    """Lagrange interpolation at 0 over Z_P (toy secret sharing)."""
    S = 0
    for j, (xj, yj) in enumerate(shares):
        num = den = 1
        for m, (xm, _) in enumerate(shares):
            if m != j:
                num, den = num * -xm % P, den * (xj - xm) % P
        S = (S + yj * num * pow(den, -1, P)) % P
    return S

print(recover([(1, 20), (3, 46), (5, 88)]), recover([(2, 31), (4, 65), (6, 18)]))
```

```console
$ python3 shamir.py
13 13
```
:::
:::

::: widget plot
f: 13 + 5*x + 2*x^2
x: -1, 6
y: 0, 100
points: 0,13; 1,20; 2,31; 3,46; 4,65; 5,88
labels: f(x) = 13 + 5x + 2x^2
caption: The sharing polynomial of [[#ex-shamir]] drawn over the real numbers: the secret is its value at $0$ and the shares are its values at $1, \dots, 5$. Any three points determine a parabola and hence the intercept; through any two points pass parabolas with every possible intercept. Over $\Z_{97}$ the picture wraps around — the share $f(6) = 115$ becomes $18$ — which is what makes the privacy perfect rather than approximate.
:::

Secret sharing is the basis of **threshold cryptography**, in which $t$ of $n$ parties jointly decrypt or sign without ever reconstructing the key in one place, and of **secure multiparty computation**, in which parties compute a function of their private inputs, learning only the output (Ben-Or, Goldwasser and Wigderson, 1988). Shamir's scheme by itself trusts the dealer and the parties to submit correct shares; *verifiable* secret sharing adds commitments so that cheating is detected.

## Zero-knowledge proofs

Schnorr's identification protocol ([[cryptography/signatures#alg-schnorr-id]]) convinces a verifier that the prover knows a discrete logarithm while revealing nothing about it. The general notion was introduced by Goldwasser, Micali and Rackoff (1985).

::: definition Interactive proof and zero knowledge {#def-zk}
An **interactive proof** for a language $L$ is a protocol between a prover $P$ and a PPT verifier $V$ on a common input $w$ such that

- **completeness**: if $w \in L$, the honest prover makes $V$ accept with probability $1$ (or close to $1$);
- **soundness**: if $w \notin L$, no prover strategy whatsoever makes $V$ accept with probability more than some $\varepsilon < 1$, which repetition drives down.

It is (perfect, honest-verifier) **zero-knowledge** if there is a PPT **simulator** that, given only $w \in L$, outputs transcripts with exactly the same distribution as real executions between $P$ and the honest $V$.
:::

The simulator captures "learning nothing": anything the verifier could compute from a transcript, it could compute from a simulated transcript, which it can produce itself without the prover. The strongest notion requires a simulator for *every* efficient verifier, including cheating ones; the protocols below achieve that too, with a simulator that guesses the verifier's challenge and starts again when the guess is wrong.

### Graph isomorphism

Two graphs $G_0, G_1$ on vertex set $\{1, \dots, n\}$ are **isomorphic** if some permutation $\pi$ of the vertices maps the edges of $G_0$ exactly onto those of $G_1$; write $G_1 = \pi(G_0)$. No polynomial-time algorithm for deciding isomorphism is known (Babai's 2015 algorithm is quasi-polynomial). The prover knows $\pi$.

::: algorithm Zero-knowledge proof of graph isomorphism {#alg-gi-zk}
Repeat $k$ times:

1. The prover chooses a uniform permutation $\sigma$ and sends $H = \sigma(G_1)$.
2. The verifier sends a uniform bit $b$.
3. If $b = 1$ the prover sends $\tau = \sigma$; if $b = 0$ it sends $\tau = \sigma \circ \pi$.
4. The verifier checks that $H = \tau(G_b)$.

Accept if every round passes.
:::

::: theorem The protocol is a perfect zero-knowledge proof {#thm-gi-zk}
The protocol is complete; if $G_0$ and $G_1$ are not isomorphic, a cheating prover passes each round with probability at most $1/2$, so all $k$ with probability at most $2^{-k}$; and it is perfect honest-verifier zero-knowledge.
:::

::: proof
*Completeness.* If $b = 1$, $\tau(G_1) = \sigma(G_1) = H$. If $b = 0$, $\tau(G_0) = \sigma(\pi(G_0)) = \sigma(G_1) = H$.

*Soundness.* Suppose $G_0 \not\cong G_1$. Whatever graph $H$ a cheating prover sends, it is isomorphic to at most one of $G_0$, $G_1$ (isomorphism is an equivalence relation, so if it were isomorphic to both, they would be isomorphic to each other). For the other value of $b$ no $\tau$ passes the check. Since $b$ is uniform and chosen after $H$, the prover fails with probability at least $1/2$ in each round, independently.

*Zero knowledge.* The simulator, for each round, chooses a uniform bit $b$ and a uniform permutation $\tau$, and outputs $(H, b, \tau)$ with $H = \tau(G_b)$. In a real round, $b$ is uniform; given $b$, $\tau$ is $\sigma$ or $\sigma\circ\pi$ with $\sigma$ uniform, hence uniform in either case (composing with a fixed permutation is a bijection of the set of permutations); and $H = \tau(G_b)$ is determined by $b$ and $\tau$. So real and simulated triples have the same distribution.
:::

::: example One round of the protocol {#ex-gi-round}
Let $G_0$ be the path with edges $\{1,2\}, \{2,3\}, \{3,4\}$, and let $\pi$ map $1 \mapsto 3$, $2 \mapsto 1$, $3 \mapsto 4$, $4 \mapsto 2$. Compute $G_1 = \pi(G_0)$, then one round with $\sigma\colon 1 \mapsto 4, 2 \mapsto 3, 3 \mapsto 1, 4 \mapsto 2$ and challenge $b = 0$.
::: solution
$G_1 = \pi(G_0)$ has edges $\{\pi(1), \pi(2)\} = \{3, 1\}$, $\{\pi(2), \pi(3)\} = \{1, 4\}$ and $\{\pi(3), \pi(4)\} = \{4, 2\}$: the path $3 - 1 - 4 - 2$. The prover sends $H = \sigma(G_1)$, with edges $\{\sigma(3), \sigma(1)\} = \{1, 4\}$, $\{\sigma(1), \sigma(4)\} = \{4, 2\}$, $\{\sigma(4), \sigma(2)\} = \{2, 3\}$: the path $1 - 4 - 2 - 3$. With $b = 0$ it reveals $\tau = \sigma\circ\pi$: $1 \mapsto \sigma(3) = 1$, $2 \mapsto \sigma(1) = 4$, $3 \mapsto \sigma(4) = 2$, $4 \mapsto \sigma(2) = 3$. The verifier checks $\tau(G_0)$: edges $\{1, 4\}, \{4, 2\}, \{2, 3\}$, equal to $H$. The verifier has learned a random relabelling of $G_0$ that equals $H$ — something it could have produced itself — and nothing about $\pi$, which is hidden by the uniform $\sigma$.
:::
:::

::: widget permutation
perm: 3 1 4 2
second: 4 3 1 2
caption: The secret isomorphism $\pi$ of [[#ex-gi-round]] (one-line notation: $1 \mapsto 3$, $2 \mapsto 1$, $3 \mapsto 4$, $4 \mapsto 2$) and the prover's random relabelling $\sigma$. Their composition $\sigma\circ\pi$ is the permutation revealed when the challenge is $b = 0$. Because $\sigma$ is uniform, $\sigma\circ\pi$ is uniform too, so seeing it reveals nothing about $\pi$; only someone who can answer *both* challenges for the same $H$ must know $\pi$.
:::

Goldreich, Micali and Wigderson (1986) showed, assuming one-way functions exist, that *every* language in $\mathsf{NP}$ has a (computational) zero-knowledge proof, by giving one for graph 3-colouring using commitments. Modern **succinct** non-interactive arguments (zk-SNARKs and zk-STARKs), made non-interactive with the Fiat–Shamir transform of [[cryptography/signatures]], let a prover convince anyone that a computation was carried out correctly with a proof of a few hundred bytes, and are used in privacy-preserving and blockchain systems.

::: quiz
A verifier wants to be fooled with probability at most $10^{-6}$ by a cheating prover in the graph-isomorphism protocol. How many rounds are needed?

- [ ] $6$
- [ ] $10$
- [x] $20$
- [ ] $10^6$
::: solution
Each round lets a cheater through with probability at most $1/2$, so $k$ rounds with $2^{-k}$. We need $2^{-k} \le 10^{-6}$, that is $k \ge 6\log_2 10 \approx 19.93$, so $k = 20$. Zero knowledge is preserved under sequential repetition.
:::
:::

::: history
Roger Needham and Michael Schroeder published their protocols in 1978, and Gavin Lowe found the attack on the public-key version with the FDR model checker in 1995. Michael Burrows, Martín Abadi and Needham introduced a logic for reasoning about authentication protocols in 1989. Mihir Bellare and Phillip Rogaway gave the first formal model of authenticated key exchange in 1993, Ran Canetti and Hugo Krawczyk a widely used refinement in 2001, and Krawczyk the SIGMA design in 2003 and HKDF in 2010. TLS descends from Netscape's SSL (1995), was standardised as TLS 1.0 in 1999 and reached version 1.3 in RFC 8446 (2018). Adi Shamir and George Blakley independently invented threshold secret sharing in 1979. Shafi Goldwasser, Silvio Micali and Charles Rackoff introduced zero-knowledge proofs (conference version 1985, *SIAM Journal on Computing* 1989), and Oded Goldreich, Micali and Avi Wigderson showed that all of $\mathsf{NP}$ has zero-knowledge proofs in 1986.
:::

## Where this leads

TLS 1.3's key exchange is being upgraded to resist quantum computers by hybrid shares combining X25519 with ML-KEM, and its certificates will eventually carry post-quantum signatures: [[cryptography/post-quantum]]. Distributed protocols for agreement among many parties, some of them faulty or malicious, are the subject of [[distributed-systems]]. How protocols are deployed, configured and attacked in practice — certificate validation errors, downgrade attacks, side channels, and protocol fuzzing — belongs to [[security]], and the zero-knowledge and interactive-proof ideas have deep consequences in [[complexity]] ($\mathsf{IP} = \mathsf{PSPACE}$, the PCP theorem).

::: summary
- Protocols fail at composition even when every primitive is secure; the Needham–Schroeder public-key protocol was broken by a relay attack fixed by naming the responder. **Bind every message to identities and transcript.**
- **Authenticated key exchange** aims at key secrecy against active attackers, mutual authentication with key confirmation, and **forward secrecy**, which ephemeral Diffie–Hellman provides and RSA key transport does not.
- **SIGMA** (sign the transcript, MAC the identity) underlies **TLS 1.3**: key shares in the first flight, signed and MACed transcripts, AEAD-only suites and an **HKDF** key schedule ([[#def-hkdf]]). 0-RTT data can be replayed.
- **Shamir secret sharing** hides a secret as $f(0)$ of a random polynomial of degree $t - 1$; any $t$ shares reconstruct it by Lagrange interpolation and any $t - 1$ are uniform and independent of it ([[#thm-shamir]]).
- **Zero-knowledge proofs** are complete, sound, and simulatable ([[#def-zk]]); the graph-isomorphism protocol has soundness error $2^{-k}$ and perfect zero knowledge ([[#thm-gi-zk]]). Every $\mathsf{NP}$ language has zero-knowledge proofs, assuming one-way functions.
- Use standard, analysed protocols (TLS 1.3, Noise) through vetted libraries; do not design your own.
:::

## Exercises

::: exercise HKDF output blocks {level=1 check="3"}
How many HMAC-SHA256 computations does HKDF-Expand perform to produce $L = 80$ bytes of output? (Enter the number.)
::: solution
Each $T(i)$ is one HMAC giving $32$ bytes, so $\lceil 80/32\rceil = 3$ computations, the last truncated to $16$ bytes. HKDF-Expand can produce at most $255 \cdot 32 = 8160$ bytes, since the counter is a single byte.
:::
:::

::: exercise Recover a shared secret {level=1 check="13"}
With the shares $(2, 31)$, $(4, 65)$ and $(6, 18)$ of [[#ex-shamir]] over $\Z_{97}$, compute the secret by Lagrange interpolation. (Enter the secret.)
::: solution
The coefficients at $0$ for $x = 2, 4, 6$ are $\lambda_2 = \tfrac{(-4)(-6)}{(2-4)(2-6)} = 3$, $\lambda_4 = \tfrac{(-2)(-6)}{(4-2)(4-6)} = -3$, $\lambda_6 = \tfrac{(-2)(-4)}{(6-2)(6-4)} = 1$. So $S = 3 \cdot 31 - 3 \cdot 65 + 18 = 93 - 195 + 18 = -84 \equiv 13 \pmod{97}$.
:::
:::

::: exercise Soundness amplification {level=1 check="40"}
How many rounds of the graph-isomorphism protocol make a cheating prover's success probability at most $2^{-40}$? (Enter the number of rounds.)
::: solution
The success probability after $k$ rounds is at most $2^{-k}$, so $k = 40$.
:::
:::

::: exercise What forward secrecy needs {level=2}
A TLS 1.3 server reuses the same ephemeral X25519 key share for all connections during a day, to save computation. Which security property is weakened, and when does it matter?
::: solution
Forward secrecy relies on erasing the ephemeral private exponent after the session. If the server's exponent $y$ is kept for a day, an attacker who compromises the server during that day (or obtains the stored $y$) can compute $g^{xy}$ for every recorded session of that day, since the client shares $g^x$ are in the transcripts. Sessions from other days stay protected. The window of exposure grows from one session to one day; the authentication and secrecy against outsiders who never compromise the server are unaffected.
:::
:::

::: exercise Lowe's attack in detail {level=2}
In the Needham–Schroeder attack, list the six messages with their senders, receivers and contents, and explain exactly which check Lowe's fix makes fail.
::: solution
(1) $A \to M$: $\{N_A, A\}_M$. (2) $M(A) \to B$: $\{N_A, A\}_B$, sent by $M$ pretending to be $A$. (3) $B \to M(A)$: $\{N_A, N_B\}_A$, intended for $A$. (4) $M \to A$: the same $\{N_A, N_B\}_A$, as $M$'s reply. (5) $A \to M$: $\{N_B\}_M$. (6) $M(A) \to B$: $\{N_B\}_B$. $B$ now believes it shares $N_A, N_B$ with $A$. With the fix, message 3 is $\{N_A, N_B, B\}_A$; $M$ cannot change it (it cannot decrypt or re-encrypt meaningfully without $A$'s key), so at message 4 $A$ sees the name $B$ where it expected $M$, and aborts.
:::
:::

::: exercise Privacy of two shares, by counting {level=2 check="97"}
In Shamir's scheme with $p = 97$ and $t = 3$, fix the two shares $(1, 20)$ and $(3, 46)$. How many pairs of coefficients $(a_1, a_2)$ are consistent with these shares *and* a given secret $S'$, and how many secrets are consistent with them in total? (Enter the number of consistent secrets.)
::: solution
For each $S'$, the conditions $S' + a_1 + a_2 = 20$ and $S' + 3a_1 + 9a_2 = 46$ are two linear equations in $(a_1, a_2)$ with determinant $9 - 3 = 6 \ne 0 \pmod{97}$, so exactly one pair solves them. Hence each of the $97$ secrets is consistent with exactly one polynomial, and all $97$ secrets are possible — each equally likely, because each polynomial was equally likely. This is part (b) of [[#thm-shamir]] in miniature.
:::
:::

::: exercise A simulator for Schnorr's protocol is not a forger {level=3}
The simulator for graph isomorphism (and for Schnorr's protocol in [[cryptography/signatures#lem-hvzk]]) produces accepting transcripts without the secret. Explain carefully why this does not contradict soundness, and why a *non-interactive* transcript produced by the Fiat–Shamir transform is convincing while a simulated interactive one is not.
::: solution
Soundness is about an interaction in which the verifier chooses $b$ (or $e$) uniformly *after* the prover commits to $H$ (or $R$). The simulator reverses the order: it picks the challenge first and then constructs a commitment that fits. A transcript therefore proves nothing to a third party — it might have been simulated — but convinces the *live* verifier, who knows its challenge was chosen after the commitment. In Fiat–Shamir, the challenge is $H(\text{commitment} \,\|\, m)$; to simulate, one would have to find a commitment whose hash equals a pre-chosen challenge, which for a random oracle is infeasible. So the hash enforces the order, and the transcript becomes transferable evidence, i.e. a signature. In the random-oracle proof, the *reduction* can program the oracle to make simulation work, which is precisely the power a real attacker lacks.
:::
:::

::: exercise Implement Shamir sharing {level=3}
Write `share(S, t, n, p)` that returns $n$ shares using coefficients from `secrets.randbelow(p)`, and test with $p = 2^{127} - 1$ (a Mersenne prime) that random subsets of $t$ shares recover $S$ with `recover` from [[#ex-shamir]] (adapted to a parameter $p$), while $t - 1$ shares give an essentially random value. What would a real system add?
::: solution
```python
import secrets, random

def share(S, t, n, p):
    coeffs = [S] + [secrets.randbelow(p) for _ in range(t - 1)]
    f = lambda x: sum(c * pow(x, k, p) for k, c in enumerate(coeffs)) % p
    return [(i, f(i)) for i in range(1, n + 1)]

def recover(shares, p):
    S = 0
    for j, (xj, yj) in enumerate(shares):
        num = den = 1
        for m, (xm, _) in enumerate(shares):
            if m != j:
                num, den = num * -xm % p, den * (xj - xm) % p
        S = (S + yj * num * pow(den, -1, p)) % p
    return S

p, S = 2**127 - 1, 123456789
sh = share(S, 3, 5, p)
print(all(recover(random.sample(sh, 3), p) == S for _ in range(20)))
print(recover(sh[:2], p) == S)
```

```console
$ python3 shamir_test.py
True
False
```

Every 3-subset recovers the secret; interpolating only 2 shares gives the value at $0$ of the line through them, which is uniformly distributed and equals $S$ only with probability $1/p$. A real system adds authenticated channels to deliver shares, verifiable secret sharing so that a bad share is detected, secure erasure of the dealer's polynomial, and usually threshold protocols that use the shares without ever reconstructing the key — all from a reviewed library.
:::
:::
