When your phone installs a software update, how does it know that the update came from the manufacturer and not from someone who has taken over the download server? A MAC would need a key shared between the manufacturer and every phone — and then any phone's owner could extract it and forge updates for everyone. What is needed is the public-key analogue of a MAC: a **digital signature**, which only the holder of a private key can produce but anyone with the matching public key can check. Signatures are also **publicly verifiable** and **transferable** — a signature that convinces you will convince anyone you show it to — which is what makes them the basis of certificates, software distribution, secure boot, signed documents and every TLS connection.

This chapter defines signature security, shows why "textbook" RSA signatures are forgeable and how hash-and-sign repairs them, and derives Schnorr signatures from an identification protocol through the Fiat–Shamir transform, proving the properties of the protocol that make the signature secure. We then look at DSA and ECDSA, explain precisely why reusing a signing nonce reveals the private key, and finish with the certificates and public-key infrastructure that bind public keys to names. As in [[cryptography/public-key]], all parameters are toys for hand calculation, and real code should use a vetted library.

## Signature schemes and their security

::: definition Signature scheme {#def-sig}
A **signature scheme** consists of PPT algorithms $\mathsf{Gen}$, $\mathsf{Sign}$, $\mathsf{Vrfy}$: $\mathsf{Gen}(1^n)$ outputs a key pair $(pk, sk)$; $\mathsf{Sign}_{sk}(m)$ outputs a signature $\sigma$; and the deterministic $\mathsf{Vrfy}_{pk}(m, \sigma)$ outputs $1$ (valid) or $0$. Correctness: $\mathsf{Vrfy}_{pk}(m, \mathsf{Sign}_{sk}(m)) = 1$ for every message $m$, except with negligible probability over $\mathsf{Gen}$.

In the experiment $\mathsf{SigForge}_{\mathcal A, \Pi}(n)$, $(pk, sk) \gets \mathsf{Gen}(1^n)$, and $\mathcal A$ is given $pk$ and oracle access to $\mathsf{Sign}_{sk}(\cdot)$. It outputs $(m, \sigma)$ and succeeds if $\mathsf{Vrfy}_{pk}(m, \sigma) = 1$ and $m$ was never queried. $\Pi$ is **existentially unforgeable under an adaptive chosen-message attack** (EUF-CMA) if every PPT $\mathcal A$ succeeds with negligible probability; it is **strongly unforgeable** if this holds even when only the pair $(m, \sigma)$ must be new.
:::

This is the MAC definition of [[cryptography/hash-mac#def-mac]] with the verification key made public. The adversary may see signatures on messages of its choice, and wins by signing *any* new message. Because verification is public, an attacker can also test candidate forgeries offline, as often as it likes.

### Textbook RSA signatures

The RSA trapdoor permutation suggests signing $m \in \Z_N^*$ as $\sigma = m^d \bmod N$ and verifying $\sigma^e \equiv m$. This **textbook RSA signature** is not secure:

- **No-message forgery.** Choose any $\sigma \in \Z_N^*$ and set $m = \sigma^e \bmod N$. Then $(m, \sigma)$ is valid, with no oracle queries at all. The message is random-looking, but the definition counts it, rightly, because applications cannot be relied on to reject strange messages.
- **Multiplicative forgery.** Given signatures $\sigma_1, \sigma_2$ on $m_1, m_2$, the product $\sigma_1\sigma_2$ is a signature on $m_1m_2 \bmod N$. To sign a chosen $m$, an attacker obtains signatures on $m\cdot r^e$ ("blinded") and divides by $r$.

Both attacks exploit the algebraic structure of $m \mapsto m^d$. The cure is to sign not $m$ but a hash of it.

## Hash-and-sign

::: definition Hash-and-sign {#def-hash-sign}
Let $\Pi = (\mathsf{Gen}, \mathsf{Sign}, \mathsf{Vrfy})$ be a signature scheme for messages of length $\ell(n)$ and $H$ a hash function with output length $\ell(n)$ and key $s$. The scheme $\Pi'$ has $pk' = (pk, s)$; it signs a message $m$ of any length as $\mathsf{Sign}_{sk}(H^s(m))$, and verifies $(m, \sigma)$ by checking $\mathsf{Vrfy}_{pk}(H^s(m), \sigma)$.
:::

::: theorem Hash-and-sign is secure {#thm-hash-sign}
If $\Pi$ is EUF-CMA secure for messages of length $\ell(n)$ and $H$ is collision-resistant, then $\Pi'$ is EUF-CMA secure for messages of arbitrary length.
:::

::: proof
Let $\mathcal A'$ attack $\Pi'$, querying messages $m_1, \dots, m_q$ and finally outputting $(m^*, \sigma^*)$ with $m^* \notin \{m_1, \dots, m_q\}$. Let $\mathsf{Coll}$ be the event that $H^s(m^*) = H^s(m_i)$ for some $i$. Then
$$
\Prob[\mathcal A' \text{ succeeds}] \le \Prob[\mathcal A' \text{ succeeds} \wedge \mathsf{Coll}] + \Prob[\mathcal A' \text{ succeeds} \wedge \neg\mathsf{Coll}] .
$$

*First term.* The collision finder $\mathcal C(s)$ generates $(pk, sk)$ itself, runs $\mathcal A'$ on $(pk, s)$ answering signing queries honestly, and when $\mathcal A'$ outputs $m^*$ searches its list for an $m_i \ne m^*$ with $H^s(m_i) = H^s(m^*)$. It finds a collision whenever $\mathsf{Coll}$ occurs, so the first term is negligible.

*Second term.* The forger $\mathcal A$ against $\Pi$, given $pk$ and a signing oracle, chooses $s$ itself and runs $\mathcal A'$ on $(pk, s)$; it answers a query $m_i$ by asking its own oracle for a signature on $H^s(m_i)$, and finally outputs $(H^s(m^*), \sigma^*)$. If $\mathcal A'$ succeeds and $\neg\mathsf{Coll}$, then $H^s(m^*)$ differs from every $H^s(m_i)$ that $\mathcal A$ queried, and $\sigma^*$ is a valid signature on it under $\Pi$: a forgery. So the second term is negligible too.
:::

Hashing also makes RSA signatures usable for long messages, but it does not by itself make textbook RSA secure: the theorem needs $\Pi$ to be secure for fixed-length messages, which textbook RSA is not. What helps is that, when $H$ is modelled as a random oracle with outputs uniform in $\Z_N^*$, the algebraic attacks stop working: the forger cannot choose $\sigma$ and then find $m$ with $H(m) = \sigma^e$, and cannot combine signatures multiplicatively. This scheme, **RSA full-domain hash** (RSA-FDH), was proved EUF-CMA secure under the RSA assumption in the random-oracle model by Bellare and Rogaway (1993, with a tighter analysis by Coron in 2000). The standardised versions are **RSA-PSS** (probabilistic signature scheme, Bellare and Rogaway 1996), which adds a random salt and has a tight proof, and the older deterministic **PKCS#1 v1.5** signature padding, still widely used in certificates; both are in RFC 8017.

::: example Toy hash-and-sign RSA {#ex-rsa-sign}
With the toy key $N = 3233$, $e = 17$, $d = 2753$ of [[cryptography/public-key#ex-rsa]], sign the messages `pay 10` and `pay 99` by computing $h = \mathrm{SHA\text{-}256}(m) \bmod N$ and $\sigma = h^d \bmod N$, and verify.
::: solution
```python
import hashlib
N, e, d = 3233, 17, 2753                 # toy key: insecure

def H(data, mod):                        # toy "full-domain" hash into Z_mod
    return int.from_bytes(hashlib.sha256(data).digest(), "big") % mod

for msg in (b"pay 10", b"pay 99"):
    h = H(msg, N)
    sig = pow(h, d, N)
    print(msg, h, sig, pow(sig, e, N) == h)
```

```console
$ python3 rsa_sign.py
b'pay 10' 50 1270 True
b'pay 99' 1427 1243 True
```

The verifier recomputes $h$ from the message and checks $\sigma^e \equiv h$. An attacker who wants a signature on `pay 99` from one on `pay 10` would need $1243$ from $1270$, which requires $d$; the multiplicative structure no longer helps, because $1427$ is not a product of hashes the attacker has signatures for — except by a coincidence that, with a real 3072-bit $N$, happens with negligible probability. (With $N = 3233$ the hash is reduced to fewer than 12 bits, so collisions among a hundred messages are likely: the toy demonstrates the mechanism, not the security.)
:::
:::

## Schnorr signatures

Discrete-logarithm signatures come from a different idea: an interactive proof that you know a secret, made non-interactive.

### An identification protocol

Let $G$ be a cyclic group of prime order $q$ with generator $g$. The prover's private key is a uniform $x \in \Z_q$ and its public key is $y = g^x$.

::: algorithm Schnorr identification {#alg-schnorr-id}
1. **Commit.** The prover chooses a uniform $k \in \Z_q$ and sends $R = g^k$.
2. **Challenge.** The verifier sends a uniform $e \in \Z_q$.
3. **Respond.** The prover sends $s = k + ex \bmod q$.
4. **Check.** The verifier accepts if $g^s = R\cdot y^e$.
:::

Completeness is $g^{k + ex} = g^k(g^x)^e$. Two further properties make the protocol useful.

::: lemma Special soundness {#lem-special-soundness}
From two accepting transcripts $(R, e, s)$ and $(R, e', s')$ with the same commitment $R$ and $e \ne e'$, the secret $x$ can be computed: $x = (s - s')(e - e')^{-1} \bmod q$.
:::

::: proof
Both transcripts satisfy the check: $g^s = Ry^e$ and $g^{s'} = Ry^{e'}$. Dividing, $g^{s - s'} = y^{e - e'} = g^{x(e - e')}$. Since $g$ has order $q$, the exponents agree modulo $q$: $s - s' \equiv x(e - e') \pmod q$. As $q$ is prime and $e \ne e'$, $e - e'$ is invertible modulo $q$, which gives the formula.
:::

So a prover that can answer two different challenges for the same commitment "knows" $x$; a cheating prover who does not know $x$ can answer at most one challenge per commitment, and is caught with probability $1 - 1/q$. That is the intuition behind the security of the protocol under the discrete-logarithm assumption.

::: lemma Honest-verifier zero knowledge {#lem-hvzk}
There is an efficient simulator that, given only the public key $y$, outputs triples $(R, e, s)$ with exactly the same distribution as transcripts of honest executions of [[#alg-schnorr-id]].
:::

::: proof
The simulator chooses $e$ and $s$ uniformly and independently from $\Z_q$ and sets $R = g^s y^{-e}$. In an honest execution, $e$ is uniform; $k$ is uniform and independent of $e$, so $s = k + ex$ is uniform and independent of $e$; and $R$ is determined by $(e, s)$ through $R = g^sy^{-e}$. The simulated triples are generated by the same rule — $(e, s)$ uniform and independent, $R = g^sy^{-e}$ — so the two distributions are identical.
:::

An honest verifier therefore learns nothing it could not have generated itself: the transcript reveals nothing about $x$. Zero-knowledge proofs are developed further in [[cryptography/protocols]].

### The Fiat–Shamir transform

The verifier's only job is to send an unpredictable challenge *after* seeing $R$. Fiat and Shamir (1986) replaced the verifier by a hash function: the signer computes the challenge as $e = H(R \,\|\, m)$, binding it to both the commitment and the message.

::: definition Schnorr signature {#def-schnorr}
Keys are $sk = x$ and $pk = y = g^x$, with $(G, q, g)$ and a hash function $H$ into $\Z_q$ public. To sign $m$, choose a uniform $k \in \Z_q$, and compute $R = g^k$, $e = H(R \,\|\, m)$ and $s = k + ex \bmod q$; the signature is $(e, s)$ (or, equivalently, $(R, s)$). To verify $(e, s)$ on $m$, compute $R' = g^sy^{-e}$ and accept iff $H(R' \,\|\, m) = e$.
:::

Pointcheval and Stern (1996) proved Schnorr signatures EUF-CMA secure under the discrete-logarithm assumption, when $H$ is modelled as a random oracle. The proof runs a forger twice with the same random tape and two different random-oracle answers at the point $H(R \,\|\, m)$ — the **forking lemma** — to obtain two transcripts with the same $R$ and different $e$, and then applies [[#lem-special-soundness]]; signing queries are answered with the simulator of [[#lem-hvzk]], programming the oracle. We do not give the probability analysis here.

::: example Schnorr signatures in a group of order 11 {#ex-schnorr}
Use the subgroup of order $q = 11$ of $\Z_{23}^*$ generated by $g = 4$, private key $x = 7$, and the toy hash $e = \mathrm{SHA\text{-}256}(R \,\|\, m) \bmod 11$ (with $R$ encoded as one byte). Sign `hello` with nonce $k = 5$ and verify.
::: solution
The public key is $y = 4^7 \bmod 23 = 8$. Signing: $R = 4^5 \bmod 23 = 12$; the hash gives $e = 2$; $s = 5 + 2\cdot 7 = 19 \equiv 8 \pmod{11}$. The signature is $(e, s) = (2, 8)$. Verification: $g^s = 4^8 = 9$ and $y^e = 8^2 = 64 \equiv 18$, so $R\cdot y^e = 12 \cdot 18 = 216 \equiv 9$ and $g^s = Ry^e$; equivalently $R' = g^sy^{-e} = 12$ and the hash of $R' \,\|\, m$ is again $2$.

```python
import hashlib
p, q, g, x = 23, 11, 4, 7                   # toy Schnorr group: insecure
y = pow(g, x, p)

def H(data, mod):
    return int.from_bytes(hashlib.sha256(data).digest(), "big") % mod

def sign(m, k):                             # k must be fresh and secret!
    R = pow(g, k, p)
    e = H(bytes([R]) + m, q)
    return R, e, (k + e * x) % q

R, e, s = sign(b"hello", 5)
print(y, R, e, s, pow(g, s, p) == R * pow(y, e, p) % p)
```

```console
$ python3 schnorr.py
8 12 2 8 True
```
:::
:::

::: widget modular
n: 23
mode: powers
a: 4
caption: Powers of $g = 4$ modulo $23$, which cycle with period $11$: the Schnorr group of [[#ex-schnorr]]. The private key $7$ corresponds to the public key $4^7 = 8$, and the nonce $5$ to the commitment $4^5 = 12$. Because the group has prime order $11$, exponents — keys, nonces and the response $s$ — are computed modulo $11$, not modulo $23$.
:::

## DSA and ECDSA

The **Digital Signature Algorithm** (DSA), adopted by NIST in FIPS 186 (1994), and its elliptic-curve version **ECDSA** are variants of the same idea designed in part to avoid Schnorr's patent (which expired in 2008). We describe ECDSA. Public parameters are a curve with a point $G$ of prime order $n$; the private key is $d \in \{1, \dots, n-1\}$ and the public key $Q = dG$. Let $z$ be the hash of the message, reduced to an integer modulo $n$.

::: algorithm ECDSA {#alg-ecdsa}
*Sign:* choose a uniform nonce $k \in \{1, \dots, n-1\}$; compute $kG = (x_1, y_1)$ and $r = x_1 \bmod n$ (restart if $r = 0$); compute $s = k^{-1}(z + rd) \bmod n$ (restart if $s = 0$). The signature is $(r, s)$.

*Verify:* check $1 \le r, s < n$; compute $w = s^{-1} \bmod n$, $u_1 = zw \bmod n$, $u_2 = rw \bmod n$ and $X = u_1G + u_2Q$; accept iff $X \ne \mathcal O$ and $x(X) \equiv r \pmod n$.
:::

::: proposition ECDSA verification is correct {#prop-ecdsa}
A signature produced by the signing algorithm passes verification.
:::

::: proof
From $s = k^{-1}(z + rd)$ we get $k = s^{-1}(z + rd) = w(z + rd) \pmod n$. Since $G$ has order $n$, scalars may be reduced modulo $n$, and
$$
u_1G + u_2Q = zwG + rwdG = w(z + rd)G = kG ,
$$
whose $x$-coordinate reduces to $r$ by construction.
:::

No security proof of ECDSA comparable to Schnorr's is known in the standard random-oracle model (proofs exist in idealised models of the group). ECDSA is also not strongly unforgeable: if $(r, s)$ is valid then so is $(r, -s \bmod n)$, since negating $k$ negates $kG$'s $y$-coordinate but keeps its $x$-coordinate ([[#ex-ecdsa-malleable]]). Systems that identify transactions by their signatures — Bitcoin, notably — had to normalise $s$ for this reason.

::: example ECDSA on the toy curve {#ex-ecdsa}
On $y^2 = x^3 + 2x + 2$ over $\Z_{17}$ with $G = (5, 1)$ of order $n = 19$ ([[cryptography/public-key#ex-ec]]), let $d = 7$, so $Q = 7G = (0, 6)$. Sign `hello`, whose toy hash is $z = \mathrm{SHA\text{-}256}(\texttt{hello}) \bmod 19 = 6$, with nonce $k = 10$, and verify.
::: solution
*Sign.* $10G = (7, 11)$, so $r = 7$. $k^{-1} = 10^{-1} \bmod 19 = 2$ (since $20 \equiv 1$). $s = 2(6 + 7\cdot 7) = 2 \cdot 55 = 110 \equiv 15 \pmod{19}$. The signature is $(7, 15)$.

*Verify.* $w = 15^{-1} \bmod 19 = 14$ (since $15 \cdot 14 = 210 = 11\cdot 19 + 1$). $u_1 = 6 \cdot 14 = 84 \equiv 8$ and $u_2 = 7 \cdot 14 = 98 \equiv 3$. Then $X = 8G + 3Q = 8G + 21G = 29G = 10G = (7, 11)$, whose $x$-coordinate is $7 = r$. Valid.

The verifier never learns $k$; it reconstructs $kG$ as a combination of $G$ and $Q$. Also $(7, -15 \bmod 19) = (7, 4)$ verifies: then $X = (7, 6) = -10G$, with the same $x$-coordinate.
:::
:::

::: widget modular
n: 19
mode: inverses
caption: Inverses modulo the group order $n = 19$, used in every ECDSA signature ($k^{-1}$) and verification ($s^{-1}$). Every non-zero residue has an inverse because $19$ is prime: for example $10^{-1} = 2$ and $15^{-1} = 14$, the values in [[#ex-ecdsa]]. With a composite group order some elements would have no inverse — one reason signature groups have prime order.
:::

### The nonce must never repeat

The nonce $k$ in Schnorr, DSA and ECDSA plays the role of the prover's commitment randomness in [[#alg-schnorr-id]], and [[#lem-special-soundness]] says what happens if the same commitment is used with two different challenges: the secret key falls out. For Schnorr, two signatures $(e_1, s_1)$ and $(e_2, s_2)$ with the same $k$ satisfy $s_1 = k + e_1x$ and $s_2 = k + e_2x$, so
$$
x = (s_1 - s_2)(e_1 - e_2)^{-1} \bmod q .
$$
For ECDSA, two signatures with the same $k$ have the same $r$, and $s_1k = z_1 + rd$, $s_2k = z_2 + rd$ give $k = (z_1 - z_2)(s_1 - s_2)^{-1}$ and then $d = (s_1k - z_1)r^{-1} \bmod n$. Worse, the attack does not need *exact* reuse: if the nonces are merely biased, or a few bits of each leak through timing, lattice techniques recover the key from enough signatures. A badly implemented random-number generator is enough to lose a signing key, and this has happened in practice — most famously in 2010, when a games-console manufacturer was found to have signed its software with ECDSA using the same nonce every time, which exposed its master signing key.

::: example Recovering a key from a repeated nonce {#ex-nonce-reuse}
In the toy Schnorr group of [[#ex-schnorr]], the signer carelessly signs `hello` and `pay Bob 10` with the same nonce $k = 5$, producing $(e_1, s_1) = (2, 8)$ and $(e_2, s_2) = (8, 6)$. Recover the private key from the two public signatures, and explain the defences.
::: solution
$x = (s_1 - s_2)(e_1 - e_2)^{-1} = (8 - 6)(2 - 8)^{-1} = 2\cdot(-6)^{-1} = 2\cdot 5^{-1} \pmod{11}$. Since $5 \cdot 9 = 45 \equiv 1$, $5^{-1} = 9$ and $x = 18 \equiv 7$ — the private key. (Both signatures share the commitment $R = 12$, which is how one notices.) This is special soundness, [[#lem-special-soundness]], put to unintended use.

Defences: generate $k$ with a cryptographically secure generator, or — better — derive it **deterministically** from the private key and the message, as in RFC 6979 for (EC)DSA and as built into **EdDSA** (Ed25519, RFC 8032), which sets $k = H(\text{secret prefix} \,\|\, m)$. Then the same message always gets the same nonce (harmless: same signature), and different messages get unrelated nonces, with no dependence on a random-number generator at signing time. Implementations must also compute $kG$ in constant time so that no bits of $k$ leak.
:::
:::

::: warning Signatures fail in implementations, not in equations
Every signature failure described in this chapter — nonce reuse, biased or leaked nonces, forgeable textbook RSA, accepting $(r, -s)$ where uniqueness was assumed, and verifiers that skip a check (such as $1 \le r, s < n$, or that a received point is on the curve) — is an implementation or usage error in a scheme that is secure on paper. Another classic is to verify a signature but then act on a *different* parse of the message from the one that was signed. Use a vetted library's signing API, prefer deterministic schemes such as Ed25519, and never write the arithmetic yourself for real keys.
:::

::: quiz
A device signs firmware with ECDSA, drawing each nonce $k$ from a generator that, after a reboot, restarts from the same seed. What follows?

- [ ] Nothing, because the private key never leaves the device.
- [ ] Only that two firmware images might get the same signature.
- [x] Two different images signed after reboots with the same nonce reveal the private key to anyone who sees both signatures.
- [ ] Verification will fail for the second image.
::: solution
The same seed produces the same $k$, so two signatures on different hashes share $r$ and satisfy two linear equations in the unknowns $k$ and $d$, which anyone can solve. Verification still succeeds — nothing looks wrong until the key is stolen. Deterministic nonces (RFC 6979, EdDSA) remove the dependence on the generator.
:::
:::

## Certificates and public-key infrastructure

A signature proves that a message came from the holder of the private key matching $pk$. But whose key is $pk$? If Mallory can make Alice believe that Mallory's public key belongs to Bob, all the mathematics is useless; this is the man-in-the-middle problem of [[cryptography/public-key]] again. A **certificate** is a signed statement binding a public key to an identity: "the public key of `www.example.org` is $pk$, valid from date $t_1$ to $t_2$", signed by a **certificate authority** (CA). If Alice already trusts the CA's public key, she can verify the certificate and so trust $pk$.

On the web, certificates follow the X.509 format (RFC 5280). A server sends a **chain**: its own (**leaf**) certificate, signed by an **intermediate** CA, whose certificate is signed by a **root** CA whose self-signed certificate is preinstalled in the browser's or operating system's **trust store**. Verifying a chain means, for each link: checking the signature with the issuer's public key; checking the validity period; checking that the issuer is allowed to act as a CA (the *basic constraints* extension) and for what purposes (*key usage*); and for the leaf, checking that the name the client asked for appears in the *subject alternative name* extension. The client must also decide whether a certificate has been **revoked** (because its private key leaked, say), via certificate revocation lists or the OCSP protocol, both of which have well-known reliability and privacy problems.

::: example Validating a certificate chain {#ex-chain}
A browser connecting to `shop.example.org` receives a leaf certificate for `*.example.org` issued by "Example Intermediate CA", and that intermediate's certificate issued by "Example Root CA", which is in the trust store. List the checks, and say what happens if the intermediate's certificate lacks the CA flag.
::: solution
(1) Find the root's public key in the trust store, and verify the root's signature on the intermediate certificate. (2) Check that the intermediate certificate is within its validity period, has the basic-constraints CA flag set (and any path-length limit permits one more level), and has the certificate-signing key usage. (3) Verify the intermediate's signature on the leaf. (4) Check the leaf's validity period, that its extended key usage includes TLS server authentication, and that `shop.example.org` matches `*.example.org` (a wildcard matches exactly one label, so `a.b.example.org` would not match). (5) Check revocation status according to policy. (6) In TLS, verify the server's signature on the handshake with the leaf's public key ([[cryptography/protocols]]), proving the server holds the private key.

If the intermediate lacks the CA flag, the chain must be rejected: otherwise the holder of *any* certificate could issue certificates for any name. Exactly this check was missing in several TLS libraries in the early 2000s.
:::
:::

The weak point of the web PKI is that any of the roughly one hundred trusted root CAs can issue a certificate for any name. When a CA is compromised or misbehaves — as when the Dutch CA DigiNotar was breached in 2011 and fraudulent certificates for major sites were issued and used, after which browsers removed it and the company went bankrupt — every site is exposed. Responses include **Certificate Transparency** (RFC 6962, 2013), under which certificates must be recorded in public append-only logs built from Merkle trees ([[cryptography/hash-mac]]) so that misissuance can be detected; automated issuance through the ACME protocol (RFC 8555, 2019), which made free domain-validated certificates routine; and steadily shorter certificate lifetimes, which limit the damage of a key compromise and reduce reliance on revocation — the CA/Browser Forum has adopted a schedule that reduces the maximum lifetime of publicly trusted TLS certificates in stages from 398 days to 47 days by 2029. Other ecosystems use different trust models: the "web of trust" of PGP, trust on first use in SSH, and pinned keys in software updates.

::: quiz
A browser receives a valid chain for `bank.example` ending at a trusted root, but the leaf certificate's private key was stolen last week and the certificate has been revoked. Which mechanism most reliably limits the damage?

- [ ] The CA's signature on the leaf, which becomes invalid once the certificate is revoked.
- [ ] Certificate Transparency, which prevents the stolen key from being used.
- [x] A short certificate lifetime, after which the stolen certificate expires regardless of whether revocation information reaches the browser.
- [ ] The root CA's self-signature.
::: solution
Revocation does not change the signature: the certificate remains cryptographically valid, and whether the browser learns of the revocation depends on CRL or OCSP checks that are often skipped or fail open. Certificate Transparency helps detect *misissued* certificates, not stolen keys. Expiry is the one check every client performs, which is why lifetimes are being shortened.
:::
:::

::: history
Diffie and Hellman's 1976 paper proposed digital signatures, and RSA (1978) gave the first construction. Michael Rabin (1979) and Shafi Goldwasser, Silvio Micali and Ron Rivest (1988) put signatures on a rigorous footing; the latter paper defined existential unforgeability under adaptive chosen-message attack and constructed a scheme meeting it from factoring. Taher ElGamal (1985) proposed discrete-logarithm signatures, Amos Fiat and Adi Shamir introduced their transform in 1986, and Claus-Peter Schnorr published his identification and signature schemes in 1989 (journal version 1991). NIST adopted DSA in FIPS 186 (1994), and ECDSA followed in ANSI X9.62 (1999). David Pointcheval and Jacques Stern proved Schnorr signatures secure in the random-oracle model in 1996. Loren Kohnfelder's 1978 MIT thesis introduced certificates; X.509 dates from 1988. Daniel Bernstein and colleagues introduced Ed25519 in 2011, standardised in RFC 8032 (2017), and Certificate Transparency was proposed by Ben Laurie, Adam Langley and Emilia Kasper (RFC 6962, 2013).
:::

## Where this leads

[[cryptography/protocols]] uses signatures to authenticate Diffie–Hellman key exchange in TLS 1.3, where the server signs the handshake transcript with its certificate key, and develops the zero-knowledge idea of [[#lem-hvzk]] in general. [[cryptography/post-quantum]] explains that Shor's algorithm forges every signature in this chapter, and describes the lattice-based ML-DSA and the hash-based SLH-DSA, the latter built only from the hash functions of [[cryptography/hash-mac]]. The organisational side of PKI — certificate policies, key ceremonies, revocation in practice, code signing and secure boot — belongs to [[security]].

::: summary
- A **signature scheme** is EUF-CMA secure if no efficient adversary with a signing oracle can sign a new message ([[#def-sig]]); verification is public, so signatures are transferable.
- **Textbook RSA signatures** are forgeable (no-message and multiplicative forgeries). **Hash-and-sign** extends a fixed-length scheme to any length given collision resistance ([[#thm-hash-sign]]); RSA-FDH and **RSA-PSS** are secure in the random-oracle model.
- **Schnorr identification** has special soundness ([[#lem-special-soundness]]) and honest-verifier zero knowledge ([[#lem-hvzk]]); the **Fiat–Shamir** transform makes it the **Schnorr signature** ([[#def-schnorr]]), secure under DL in the random-oracle model.
- **ECDSA** signs with $r = x(kG)$, $s = k^{-1}(z + rd)$ ([[#alg-ecdsa]], [[#prop-ecdsa]]); it is not strongly unforgeable.
- **Reusing (or leaking bits of) a nonce reveals the private key** ([[#ex-nonce-reuse]]); deterministic nonces (RFC 6979, Ed25519) prevent it.
- **Certificates** bind keys to names through chains to trusted roots; validation checks signatures, validity, CA constraints, names and revocation. Certificate Transparency and short lifetimes limit the damage of CA failures.
:::

## Exercises

::: exercise A no-message forgery {level=1 check="1752"}
With the toy public key $N = 3233$, $e = 17$, produce a valid textbook-RSA signature without the private key by choosing $\sigma = 2$. On which message $m$ is it valid? (Enter $m$.)
::: solution
$m = \sigma^e \bmod N = 2^{17} \bmod 3233 = 1752$. Then $\sigma^e \equiv m$, so $(1752, 2)$ verifies. With hash-and-sign the forger would need a message whose hash is $1752$, a preimage problem for the hash.
:::
:::

::: exercise Verifying a Schnorr signature {level=1}
In the toy group of [[#ex-schnorr]] (public key $y = 8$), the signer signed `hello` again with nonce $k = 9$, obtaining $R = 13$, $e = 7$, $s = 3$. Verify the equation $g^s = Ry^e$.
::: solution
$g^s = 4^3 = 64 \equiv 18 \pmod{23}$. $y^e = 8^7 \bmod 23$: $8^2 = 64 \equiv 18$, $8^4 \equiv 18^2 = 324 \equiv 2$, $8^7 = 8^4\cdot 8^2\cdot 8 \equiv 2 \cdot 18 \cdot 8 = 288 \equiv 12$. Then $Ry^e = 13 \cdot 12 = 156 \equiv 18$. Both sides equal $18$: valid. The different nonce gives a completely different signature on the same message, as randomised signing should.
:::
:::

::: exercise Counting multiplications {level=1 check="17"}
How many modular multiplications (counting squarings) does textbook-RSA verification with $e = 65537 = 2^{16} + 1$ take with square-and-multiply, skipping the trivial first multiplication by $1$? (Enter the number.)
::: solution
$65537 = 10000000000000001_2$ has $17$ bits. Starting from $r = \sigma$ for the leading bit, there are $16$ squarings for the remaining bits and one multiplication for the final $1$ bit: $17$ multiplications. That is why RSA verification is very fast, while signing with a full-size $d$ needs thousands.
:::
:::

::: exercise ECDSA nonce reuse {level=2 check="7"}
On the toy curve of [[#ex-ecdsa]], the signer used $k = 10$ for both `hello` ($z_1 = 6$, signature $(7, 15)$) and `yes` ($z_2 = 15$, signature $(7, 14)$). Recover $k$ and then $d$ from the public data alone. (Enter $d$.)
::: solution
The equal $r$ values betray the reuse. $k = (z_1 - z_2)(s_1 - s_2)^{-1} = (6 - 15)\cdot 1^{-1} = -9 \equiv 10 \pmod{19}$. Then $d = (s_1k - z_1)r^{-1} = (150 - 6)\cdot 7^{-1} = 144 \cdot 11 \pmod{19}$ (as $7 \cdot 11 = 77 \equiv 1$); $144 \equiv 11$, so $d = 121 \equiv 7$. This is the conceptual content of real nonce-reuse failures: two linear equations, two unknowns.
:::
:::

::: exercise ECDSA is not strongly unforgeable {#ex-ecdsa-malleable level=2}
Prove that if $(r, s)$ is a valid ECDSA signature on $m$, then so is $(r, n - s)$.
::: solution
Let $s' = n - s \equiv -s$, so $w' = (s')^{-1} \equiv -w$, $u_1' = -u_1$ and $u_2' = -u_2$. Then $X' = u_1'G + u_2'Q = -(u_1G + u_2Q) = -X$. Negating a point keeps its $x$-coordinate, so $x(X') = x(X) \equiv r$, and $1 \le n - s < n$. So $(r, n - s)$ verifies. It is a new *signature* on an old message, which EUF-CMA allows but strong unforgeability forbids; requiring $s \le n/2$ ("low-$s$" normalisation) restores uniqueness.
:::
:::

::: exercise Signing the hash is not enough with textbook RSA {level=2}
Suppose a scheme signs $\sigma = H(m)^d \bmod N$ where $H$ outputs only 160 bits (much shorter than $N$). Explain why the multiplicative structure may still be exploitable, and what full-domain hashing or PSS changes.
::: solution
If $H(m_1)H(m_2) \equiv H(m_3) \pmod N$ for messages the attacker can choose, then $\sigma_1\sigma_2$ signs $m_3$. With 160-bit hash values and a large $N$ the product of two hashes is an ordinary integer below $N$, so the attacker needs $H(m_3) = H(m_1)H(m_2)$ over the integers — or, more practically, many hash values that factor over a set of small primes, from whose signatures others can be combined. Such "smooth" hash values are not rare enough at these sizes, and attacks of this kind (by Desmedt and Odlyzko, and later Coron, Naccache and Stern) broke short-hash RSA signature formats. A full-domain hash spreads $H(m)$ over all of $\Z_N$, where products of hashes are essentially never hashes and smoothness is rare; PSS also randomises the input.
:::
:::

::: exercise Simulating Schnorr transcripts {level=2}
In the toy group with $y = 8$, use the simulator of [[#lem-hvzk]] with $e = 3$ and $s = 4$ to produce a transcript, and check that it is accepting. Why does this not let anyone impersonate the prover?
::: solution
$R = g^sy^{-e} = 4^4\cdot 8^{-3} \bmod 23$. $4^4 = 256 \equiv 3$; $8^3 = 512 \equiv 6$, whose inverse is $4$; so $R = 3 \cdot 4 = 12$. Check: $g^s = 3$ and $Ry^e = 12\cdot 6 = 72 \equiv 3$. Accepting. The simulator chose $e$ *before* $R$; a real verifier chooses $e$ after receiving $R$, and an impersonator who commits to $R$ first can answer only one challenge (else [[#lem-special-soundness]] would give it $x$). Order matters, and Fiat–Shamir preserves it by computing $e$ from $R$.
:::
:::

::: exercise Hash collisions forge signatures {level=3}
In hash-and-sign, suppose an attacker can find a collision $H(m) = H(m')$ where $m$ is a harmless document and $m'$ a harmful one, both of its choosing. Describe how it obtains a signature on $m'$, and why this matters for certificates. Then explain how randomising the hash input (as RSA-PSS's salt or a CA's random serial number does) changes the attack.
::: solution
The attacker asks the signer to sign the harmless $m$ and receives $\sigma$ on $H(m)$; since $H(m') = H(m)$, $\sigma$ is also valid on $m'$. For certificates, $m$ would be an innocent certificate request and $m'$ a certificate with the CA flag set: in 2008 Stevens, Sotirov and colleagues used an MD5 chosen-prefix collision to obtain a rogue intermediate CA certificate in this way (from a CA that still used MD5), and in 2012 the Flame malware used a similar MD5 collision to forge a code-signing certificate. If the signer inserts unpredictable bits — a random serial number at the start of the certificate, or a salt — before hashing, the attacker must find a collision that works for a prefix it does not know in advance, which turns the problem into a second-preimage problem, far harder. The real fix is a collision-resistant hash; randomisation is defence in depth.
:::
:::

::: exercise Implement Schnorr verification and nonce recovery {level=3}
Using `sign` and `H` from [[#ex-schnorr]], write `verify(m, e, s)` that recomputes $R' = g^sy^{-e}$ and checks $H(R' \,\|\, m) = e$. Then write `recover(e1, s1, e2, s2)` that computes $x$ from two signatures sharing a nonce, and test it on the signatures of `hello` and `pay Bob 10` with $k = 5$.
::: solution
```python
def verify(m, e, s):
    R = pow(g, s, p) * pow(y, -e, p) % p     # R' = g^s * y^(-e)
    return H(bytes([R]) + m, q) == e

def recover(e1, s1, e2, s2):
    return (s1 - s2) * pow(e1 - e2, -1, q) % q

_, e1, s1 = sign(b"hello", 5)
_, e2, s2 = sign(b"pay Bob 10", 5)
print(verify(b"hello", e1, s1), verify(b"pay Bob 10", e2, s2), verify(b"hello", e2, s2))
print(e1, s1, e2, s2, recover(e1, s1, e2, s2))
```

```console
$ python3 schnorr_reuse.py
True True False
2 8 8 6 7
```

Both signatures verify, a signature does not transfer to another message, and the recovered key is $7$. The code is for the toy group only: real Schnorr-type signatures (Ed25519, or BIP 340 Schnorr) are available in vetted libraries with deterministic nonces and constant-time arithmetic.
:::
:::
