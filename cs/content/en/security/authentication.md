Every few months a company announces that its database of user accounts has been stolen. What happens next depends almost entirely on a design decision made years earlier, by a developer who may have spent ten minutes on it: how the passwords were stored. If they were stored in plain text, every account is compromised at once — and, because people reuse passwords, so are many accounts on other sites. If they were hashed with a fast hash and no salt, most of them will be recovered within hours. If they were hashed with a slow, salted, memory-hard function, an attacker recovers only the weakest few, slowly, and the users have time to change them. The same theft, the same attacker; outcomes that differ by orders of magnitude.

This chapter is about **authentication**: how a system decides that a request comes from a particular person or program. It is the "S" in STRIDE ([[security/security-principles]]) and the foundation of access control, since a permission check is only as good as its knowledge of who is asking. We study passwords — how they are guessed and how to store them — with the cost arithmetic of bcrypt, scrypt and Argon2; second factors, including the HOTP and TOTP one-time-password algorithms, computed on the standard test vectors; challenge–response and public-key authentication, which resist phishing; and sessions and single sign-on. The cryptographic tools — hash functions, HMAC and signatures — are developed in [[cryptography/hash-mac]] and [[cryptography/signatures]].

## What authentication is

::: definition Identification, authentication and authorisation {#def-authn}
**Identification** is a claim of identity ("I am alice"). **Authentication** is the verification of that claim, by checking evidence that only the claimed principal should be able to provide. **Authorisation** is the separate decision about what an authenticated principal may do ([[security/access-control]]). The evidence is traditionally classified into three **factors**:

1. something you **know** — a password, a PIN;
2. something you **have** — a phone, a hardware security key, a smart card, holding a secret key;
3. something you **are** — a fingerprint, a face (biometrics).

**Multi-factor authentication** (MFA) requires evidence of at least two different factors.
:::

Two different things are called authentication. **Entity authentication** establishes that a principal is present and taking part *now*, as when a user logs in. **Message** (or data-origin) **authentication** establishes who created a message, whenever that was; it is what MACs and signatures provide. A login protocol needs entity authentication, which means it needs *freshness*: evidence that cannot simply be recorded and replayed later. Much of this chapter is about where that freshness comes from.

The factors differ in their failure modes. Secrets that you know can be guessed, phished and reused across sites, but are free and can be changed. Things you have can be stolen or lost, and cost money, but cannot be copied remotely if they keep their key in tamper-resistant hardware. Biometrics are convenient and cannot be forgotten, but they are not secret (you leave fingerprints everywhere and your face is public), cannot be changed after a compromise, and are matched approximately, with a trade-off between false accepts and false rejects. Biometrics therefore work best as a *local* unlock of a device that holds a key, not as a secret sent to a server.

## Passwords and guessing

A password is chosen by a person, and people choose predictably. To reason about guessing we model a user's password as a random variable $X$ over a set of candidate passwords, with probabilities $p_1 \ge p_2 \ge \dots$ in decreasing order.

::: definition Guessing success {#def-guessing}
An adversary who may make $q$ guesses at a password drawn from a distribution with sorted probabilities $p_1 \ge p_2 \ge \dots$ succeeds with probability at most
$$
\lambda_q = \sum_{i=1}^{q} p_i,
$$ {#eq-lambda}
and $\lambda_q$ is called the **$q$-guess success rate** of the distribution.
:::

::: proposition Optimal guessing {#prop-optimal-guessing}
Among all strategies that make $q$ distinct guesses, the probability of success is maximised by guessing the $q$ most likely passwords, and the maximum is $\lambda_q$.
:::

::: proof
A strategy that makes $q$ distinct guesses (possibly chosen adaptively, but the only feedback before success is "wrong", so the sequence is fixed in advance) succeeds exactly when $X$ is in its guess set $G$, with probability $\sum_{x \in G} \Pr[X = x]$. If $G$ is not the set of the $q$ most likely passwords, it contains some $x$ and omits some $y$ with $\Pr[X = y] \ge \Pr[X = x]$, and replacing $x$ by $y$ does not decrease the sum. Repeating this exchange at most $q$ times turns $G$ into the top $q$ passwords, so their total $\lambda_q$ is the maximum.
:::

If passwords were uniform over $N$ possibilities, $\lambda_q = q/N$ and the natural measure of strength would be the **entropy** $\log_2 N$ bits. A random 8-character string of lowercase letters has $26^8 \approx 2.09 \times 10^{11}$ possibilities, about $37.6$ bits; of all $94$ printable ASCII characters, $94^8 \approx 6.1 \times 10^{15}$, about $52.4$ bits. Four words chosen uniformly from a list of $7776$ (the "diceware" list, five dice rolls per word) give $7776^4 \approx 2^{51.7}$, and six words $2^{77.5}$.

::: widget plot
f: x*log2(a)
x: 4, 24
y: 0, 160
sliders: a=26:10:100:1
hlines: 40; 80; 128
labels: bits of a random password of length x
caption: The entropy $x \log_2 a$ of a password of $x$ characters chosen *uniformly at random* from an alphabet of $a$ symbols; the horizontal lines mark $40$, $80$ and $128$ bits. Move $a$ from $26$ (lowercase) to $94$ (all printable ASCII): each extra character adds $\log_2 a$ bits, between $4.7$ and $6.6$, so length buys strength faster than a bigger alphabet. Remember that this is the strength of a *random* string; a human-chosen password of the same length is far weaker.
:::

But human-chosen passwords are nowhere near uniform. In every large leaked password set, a small number of passwords — `123456`, `password`, names, keyboard patterns, words with a digit on the end — account for a large fraction of accounts, and the frequencies fall off roughly like a power law. "Entropy" computed from length and character classes therefore says little about a human-chosen password: `Password1!` has upper and lower case, a digit and a symbol, and is among the first guesses of any cracking tool. What matters is $\lambda_q$ for realistic $q$.

::: example Online and offline guessing {#ex-guessing}
Model a site's password distribution by a Zipf law over $N = 10^6$ passwords, $p_i = 1/(i H_N)$, where $H_N = \sum_{i=1}^N 1/i \approx 14.39$. (Real distributions are only roughly Zipfian, but this captures their heavy head.) Compute $\lambda_q$ for (a) an **online** attacker who may try $10$ passwords per account per day for a year, and (b) an **offline** attacker who has stolen the password database.
::: solution
By [[#eq-lambda]], $\lambda_q = H_q/H_N$. With computation:

```python
H = lambda n: sum(1 / i for i in range(1, n + 1))
HN = H(10**6)
for q in (1, 10, 100, 3650, 10**6):
    print(q, round(H(q) / HN, 3))
```

```console
1 0.069
10 0.204
100 0.36
3650 0.61
1000000 1.0
```

(a) The online attacker makes $q = 3650$ guesses per account in a year and, in this model, breaks $61\%$ of accounts — a reminder that a rate limit alone is not enough when users pick from a heavy-headed distribution; the site must also refuse the most common passwords, which removes the head that the attacker relies on. (b) The offline attacker is limited only by computation. If the database stores an unsalted fast hash computed at $10^{10}$ guesses per second (an assumption, of the order of a modern GPU on a fast hash), the whole $10^6$-password list takes $10^{-4}$ seconds, and the full space of 8 random lowercase letters ($2.09 \times 10^{11}$) about $21$ seconds. Offline guessing is controlled only by how the passwords are stored, which is the subject of the next section.
:::
:::

::: widget plot
f: (ln(x) + 0.5772)/(k*ln(10) + 0.5772); x/10^k
x: 1, 10000
y: 0, 1
sliders: k=6:3:9:1
labels: Zipf passwords \lambda_q \approx H_q / H_N; uniform passwords q/N
caption: The probability $\lambda_q$ of guessing a password in $q$ tries, for $N = 10^k$ possible passwords, under the Zipf model of [[#ex-guessing]] (approximating $H_n \approx \ln n + 0.5772$) and under a uniform distribution. Increase $k$: the uniform curve collapses towards zero, because a bigger space really helps when users choose uniformly, but the Zipf curve barely moves — with skewed choices most of the risk is in the first few thousand guesses, which is why blocklists of common passwords matter more than the size of the space.
:::

### Online attacks and what to require of passwords

An **online attack** submits guesses to the real login service. The defence is to limit the rate: delays that grow with consecutive failures, temporary locks, or extra challenges, applied per account and per source. Permanent lockout after a few failures is a poor choice, since it lets anyone lock any user out — an availability attack. NIST's guidance limits consecutive failed attempts on one account to at most $100$; combined with a blocklist of common passwords, that leaves an online attacker with a negligible $\lambda_q$.

Guidance on what to require of users has changed sharply. Revision 4 of NIST Special Publication 800-63B (finalised in 2025, current as of 2026) tells verifiers, among other things, to: require at least 15 characters for a password used as the only factor (at least 8 when it is one factor of several); allow at least 64 characters and any printable characters, including spaces; check new passwords against a **blocklist** of commonly used, expected or compromised values; **not** impose composition rules such as "one upper-case letter, one digit, one symbol"; **not** require periodic changes, but force a change when there is evidence of compromise; and allow password managers to paste.

::: warning Composition rules and forced expiry
"At least one capital, one digit and one symbol, changed every 90 days" sounds strict and achieves little. Users meet composition rules predictably (`Summer2026!`), and forced changes produce sequences (`Summer2026!`, `Autumn2026!`) that an attacker who knows one can predict. Both rules push users towards writing passwords down or reusing them. What actually reduces $\lambda_q$ is length, a blocklist of the passwords attackers try first, rate limiting, and — best of all — not relying on a memorised password alone.
:::

## Storing passwords

A server must be able to check a password without being able to reveal it. Consider the possibilities in turn, assuming the database is eventually stolen.

1. **Plain text.** Every password is exposed. Never acceptable.
2. **Encrypted.** The key is on the same server, so whoever steals the database usually steals the key; and encryption is reversible by design, which the server does not need.
3. **Hashed**, $h = H(\mathit{pw})$ with a cryptographic hash. A stolen hash must be inverted by guessing. But two users with the same password have the same hash, and an attacker can hash a dictionary *once* and look up every user — or use precomputed tables built before the theft.
4. **Salted and hashed**, $h = H(\mathit{salt} \,\|\, \mathit{pw})$, with a random **salt** stored next to the hash. Identical passwords now have different hashes, and precomputation is useless.
5. **Salted and hashed with a deliberately slow, memory-hard function**. Each guess now costs the attacker as much as one legitimate login costs the server.

::: definition Password hashing scheme {#def-password-hash}
A **password hashing scheme** stores, for each account, a record $(\mathit{params}, s, h)$ with $h = F_{\mathit{params}}(s, \mathit{pw})$, where $s$ is a **salt** of at least $128$ bits drawn uniformly and independently for each account (and for each password change), and $F$ is a function whose evaluation has a tunable cost: a **work factor** in time (iterations) and, for memory-hard functions, in memory. A login attempt $\mathit{pw}'$ is accepted if $F_{\mathit{params}}(s, \mathit{pw}') = h$, compared in constant time.
:::

::: proposition What salts buy {#prop-salt}
Let a stolen database contain $m$ accounts, and let an attacker test a list of $D$ candidate passwords against all of them, where one evaluation of $F$ costs one unit. Without salts the attacker needs $D$ units (plus look-ups) to test every candidate against every account, and the work can be done before the theft. With distinct salts it needs $mD$ units, and no work done before the theft helps.
:::

::: proof
Without salts, $h = F(\mathit{pw})$ depends only on the password, so computing $F(c)$ once for each candidate $c$ and looking each result up in a hash table of the $m$ stored values tests $c$ against every account: $D$ evaluations. These depend on nothing in the database, so they can be computed in advance (as dictionaries or rainbow tables). With salts, a test of $c$ against account $j$ requires $F(s_j, c)$. Since the salts are distinct, $F(s_j, c)$ and $F(s_k, c)$ are evaluations at different inputs; modelling $F$ as a random function, knowledge of one says nothing about the other, so every pair $(j, c)$ the attacker wants to test needs its own evaluation, $mD$ in total. Before the theft the salts are unknown and uniform over at least $2^{128}$ values, so a precomputation covering even one salt in a meaningful fraction of cases would need about $2^{128}$ evaluations.
:::

Salts make each account a separate problem; they do nothing for a single targeted account. That is the job of the work factor. If one evaluation of $F$ takes the attacker time $t$, testing $D$ candidates against one account takes $Dt$, so we choose $F$ to be as slow as the server can afford. Three families are in use:

- **PBKDF2** (RFC 2898, 2000) iterates HMAC $c$ times; its cost is pure computation, which is cheap on GPUs and custom hardware.
- **bcrypt** (Provos and Mazières, 1999) is built on the key setup of the Blowfish cipher, repeated $2^{\mathit{cost}}$ times; its stored string records the cost and salt. Its modest memory use (4 KiB) makes it somewhat GPU-resistant. It processes at most 72 bytes of password.
- **scrypt** (Percival, 2009) and **Argon2** (winner of the Password Hashing Competition in 2015; RFC 9106, 2021) are **memory-hard**: computing them needs a large block of memory, filled and read in a data-dependent order, so an attacker cannot buy cheap parallel speed without also buying memory for each parallel guess. Argon2id, the hybrid variant, is the usual recommendation.

The OWASP Password Storage Cheat Sheet, in versions current in recent years, suggests for example Argon2id with $19$ MiB of memory and $2$ iterations, scrypt with $N = 2^{17}$, $r = 8$, $p = 1$, bcrypt with cost at least $10$, or PBKDF2-HMAC-SHA256 with $600{,}000$ iterations where compliance requires it. These numbers rise as hardware improves; the principle is to pick the largest cost the login service can bear.

::: example Cost arithmetic {#ex-cost}
Measure on this machine one SHA-256 hash, PBKDF2-HMAC-SHA256 with $600{,}000$ iterations, scrypt with $N = 2^{14}$ and $2^{17}$ ($r = 8$, $p = 1$), and bcrypt at costs $10$, $11$, $12$. How much memory does scrypt use, and how much longer does an offline attack on one account take than with a single SHA-256?
::: solution
```python
import hashlib, os, time, bcrypt

pw = b"correct horse battery staple"
salt = os.urandom(16)

def timed(label, f):
    t = time.perf_counter(); f(); print(f"{label:28s} {1000*(time.perf_counter()-t):8.1f} ms")

timed("PBKDF2-SHA256, 600000 it.", lambda: hashlib.pbkdf2_hmac("sha256", pw, salt, 600_000))
timed("scrypt N=2^14 r=8 p=1", lambda: hashlib.scrypt(pw, salt=salt, n=2**14, r=8, p=1))
timed("scrypt N=2^17 r=8 p=1", lambda: hashlib.scrypt(pw, salt=salt, n=2**17, r=8, p=1, maxmem=2**28))
for cost in (10, 11, 12):
    timed(f"bcrypt cost {cost}", lambda: bcrypt.hashpw(pw, bcrypt.gensalt(rounds=cost)))
```

```console
PBKDF2-SHA256, 600000 it.       292.9 ms
scrypt N=2^14 r=8 p=1            50.0 ms
scrypt N=2^17 r=8 p=1           461.0 ms
bcrypt cost 10                   73.9 ms
bcrypt cost 11                  143.3 ms
bcrypt cost 12                  324.1 ms
```

A single salted SHA-256 measured with `timeit` over a million calls took about $0.75$ µs. (Timings are from one run on a 2020s server core and vary by machine.) Each bcrypt cost step doubles the time, as $2^{\mathit{cost}}$ predicts. scrypt's memory is about $128 \cdot N \cdot r$ bytes: $128 \times 2^{14} \times 8 = 2^{24}$ bytes $= 16$ MiB for $N = 2^{14}$, and $128$ MiB for $N = 2^{17}$ — which is why Python's default `maxmem` of $32$ MiB had to be raised. Compared with SHA-256, bcrypt at cost $12$ makes each guess about $0.32/(0.75 \times 10^{-6}) \approx 430{,}000$ times more expensive on this hardware. An attacker who could test the million-word list of [[#ex-guessing]] against one account in under a second now needs, on one such core, about $3.7$ days per account; and memory-hard functions make the attacker's GPUs and custom chips far less of an advantage than they are against SHA-256.
:::
:::

In application code this is a few lines with a vetted library; never write the hashing yourself.

```python
import bcrypt

def register(password: str) -> bytes:
    # gensalt makes a fresh random 16-byte salt; cost 12 = 2^12 rounds of key setup
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))

def login(stored: bytes, attempt: str) -> bool:
    # checkpw re-reads cost and salt from the stored string and compares safely
    return bcrypt.checkpw(attempt.encode(), stored)

record = register("plum-anvil-sixty-orbit")
print(record.decode())
print(login(record, "plum-anvil-sixty-orbit"), login(record, "plum-anvil-sixty-orbiT"))
print(register("plum-anvil-sixty-orbit") == record)   # same password, new salt
```

```console
$ python3 store.py
$2b$12$.16tebzG0abT.PeJU66UuO5nwv2DibH924ZdfufRZQ0DALVZy5/uC
True False
False
```

The record `$2b$12$…` holds the algorithm version, the cost and a 22-character salt followed by the hash, so the cost can be raised later: when a user logs in successfully, the server rehashes the password with the new cost. The library used here (bcrypt 5.0 for Python) refuses passwords longer than 72 bytes rather than silently truncating them, as older versions did; applications either limit length or pre-hash with a keyed function. Two further refinements are common. A **pepper** is a secret key, kept outside the database (in a hardware security module or a separate secrets store), mixed in with HMAC before hashing, so that a stolen database alone cannot be attacked at all. And the comparison of $h$ with the computed value must take **constant time**, independent of where the first differing byte is (`hmac.compare_digest` in Python), so that response times leak nothing.

::: quiz
A site stores `SHA-256(salt || password)` with a 16-byte random salt per user. An attacker steals the database. Which statement is true?

- [ ] The salts make the hashes impossible to crack, because the attacker would need $2^{128}$ tables.
- [x] Common passwords are still recovered quickly, one account at a time, because each guess costs one fast hash.
- [ ] The attacker can use a precomputed rainbow table for SHA-256.
- [ ] The attacker learns which users share a password.
::: solution
Salts defeat precomputation and stop identical passwords from looking identical ([[#prop-salt]]), so the third and fourth statements are false. But with a fast hash, testing a million candidates against one account costs about a second, so weak passwords fall quickly. The fix is a slow, memory-hard function: Argon2id, scrypt or bcrypt.
:::
:::

## One-time passwords and second factors

A password is a static secret: anyone who sees it once can use it for ever. **One-time passwords** add a second factor whose value changes, derived from a secret key held by the user's device and the server.

::: algorithm HOTP and TOTP {#alg-hotp}
Let $K$ be a shared secret key (at least 128 bits) and $C$ an 8-byte counter.

1. Compute $M = \mathrm{HMAC\text{-}SHA1}(K, C)$, a 20-byte string ([[cryptography/hash-mac#def-hmac]]).
2. **Dynamic truncation**: let $o$ be the low 4 bits of the last byte of $M$, $0 \le o \le 15$. Take the four bytes $M[o..o+3]$ as a big-endian integer and clear its top bit, giving a 31-bit number $S$.
3. Output $\mathrm{HOTP}(K, C) = S \bmod 10^d$, written with $d$ digits (usually $d = 6$).

**HOTP** (RFC 4226, 2005) increments $C$ after each use. **TOTP** (RFC 6238, 2011) sets $C = \lfloor (T - T_0)/X \rfloor$ for the current Unix time $T$, usually $T_0 = 0$ and a time step $X = 30$ s, and the server accepts codes from the current step and, to allow for clock skew, perhaps one step either side.
:::

::: example HOTP on the RFC test vector {#ex-hotp}
RFC 4226 uses the ASCII key `12345678901234567890`. Compute $\mathrm{HOTP}(K, 0)$ by hand from the HMAC value, check the first four codes with a program, and check the RFC 6238 TOTP value for $T = 59$ s with $8$ digits.
::: solution
```python
import hmac, hashlib, struct

def hotp(key: bytes, counter: int, digits: int = 6, alg=hashlib.sha1) -> str:
    mac = hmac.new(key, struct.pack(">Q", counter), alg).digest()  # 8-byte big-endian counter
    offset = mac[-1] & 0x0F                                          # dynamic truncation
    code = int.from_bytes(mac[offset:offset + 4], "big") & 0x7FFFFFFF
    return str(code % 10**digits).zfill(digits)

def totp(key: bytes, unix_time: int, step: int = 30, digits: int = 6) -> str:
    return hotp(key, unix_time // step, digits)

key = b"12345678901234567890"                      # RFC 4226 test secret
print([hotp(key, c) for c in range(4)])
print(totp(key, 59, digits=8), totp(key, 1111111109, digits=8))
mac = hmac.new(key, struct.pack(">Q", 0), hashlib.sha1).digest()
print(mac.hex(), mac[-1] & 15)
```

```console
['755224', '287082', '359152', '969429']
94287082 07081804
cc93cf18508d94934c64b65d8ba7667fb7cde4b0 0
```

By hand for $C = 0$: the last byte of $M$ is `b0`, whose low nibble is $o = 0$, so we take bytes $0$–$3$, `cc93cf18`. Clearing the top bit gives `4c93cf18` $= 1{,}284{,}755{,}224$, and modulo $10^6$ this is $755224$, the first test value of RFC 4226. For TOTP at $T = 59$, $C = \lfloor 59/30 \rfloor = 1$, and the 8-digit code $94287082$ matches RFC 6238's table, as does $07081804$ at $T = 1111111109$. The top bit is cleared so that signed and unsigned arithmetic give the same number on every platform.
:::
:::

One-time codes stop the replay of a password seen once and make guessing infeasible ($10^6$ possibilities in a 30-second window, with rate limiting). They do not stop **phishing**: a fake login page that relays the user's password and current code to the real site, in real time, logs in as the user. The weakness is that the code proves knowledge of $K$ but says nothing about *which site* the user is talking to. The same is true of codes sent by SMS, which are additionally exposed to SIM-swap fraud and are deprecated as an authenticator by NIST's guidance for most uses.

### Challenge–response and public keys

The robust solution is a protocol in which the server sends a fresh random **challenge** and the user's device answers with a response that depends on the challenge, a secret, *and the identity of the site*.

::: definition Challenge–response authentication {#def-challenge}
A verifier $V$ authenticates a prover $P$ holding a secret by sending a fresh, uniformly random $n$-bit challenge $r$; $P$ replies $\sigma = \mathsf{Sign}_{sk}(r \,\|\, \mathit{context})$ with a signature key whose public key $V$ registered earlier (or $\sigma = \mathrm{MAC}_K(r \,\|\, \mathit{context})$ with a shared key); $V$ accepts if $\sigma$ verifies for the $r$ it sent and the context it expects.
:::

::: proposition Replay and relay resistance {#prop-challenge}
Suppose the signature scheme is unforgeable ([[cryptography/signatures#def-sig]]). An attacker who has recorded the responses to $q$ earlier challenges, and who cannot obtain new signatures from $P$ on the verifier's current challenge and context, makes $V$ accept with probability at most $q/2^n + \varepsilon$, where $\varepsilon$ is its forging advantage. If the context includes the verifier's identity, as checked by $P$'s device, then a response obtained by a different verifier (such as a phishing site) is rejected by $V$ in the same way.
:::

::: proof
For $V$ to accept, the attacker must present a valid signature on $(r \,\|\, c)$ for the current challenge $r$ and the expected context $c$. Either that exact message was among the $q$ previously signed ones — which requires $r$ to equal one of the earlier challenges; since $r$ is uniform and independent, this has probability at most $q/2^n$ by the union bound — or the attacker produced a valid signature on a new message, which is a forgery and happens with probability at most $\varepsilon$. For the second claim, a phishing site $V'$ obtains signatures only on messages whose context names $V'$ (because the honest device inserts the identity of the site it is actually talking to, not the one the user believes it to be). Such a message differs from $(r \,\|\, c_V)$, so relaying it to $V$ gives $V$ no valid signature on its own expected message, and the first part applies.
:::

This is how **FIDO2/WebAuthn** security keys and **passkeys** work (W3C Web Authentication, a Recommendation since 2019). At registration the device creates a fresh key pair for the site and gives the public key to the site. At login the site sends a challenge; the browser forms a structure containing the challenge and the **origin** it is actually connected to (for example `https://bank.example`), and the device signs it together with the site's identifier, after the user touches it or unlocks it with a fingerprint or PIN. A look-alike phishing domain gets a signature that names the wrong origin, so the real site rejects it: the protocol checks the site's identity so the user does not have to. Because each site has its own key pair and the server stores only public keys, a stolen server database contains nothing that lets anyone log in, and nothing is reused across sites. The fingerprint never leaves the device; it only unlocks the local key — biometrics used in the way recommended above.

::: quiz
Which of these login methods resists a real-time phishing site that relays everything the user types to the genuine site?

- [ ] A long random password from a password manager, typed by hand.
- [ ] A password plus a six-digit TOTP code.
- [ ] A password plus a code sent by SMS.
- [x] A WebAuthn security key or passkey.
::: solution
A relaying phishing site forwards a typed password and any one-time code within their validity window. Only the WebAuthn signature is bound to the origin the browser is connected to, so the response produced for the phishing site is useless at the real one ([[#prop-challenge]]). (A password manager that fills in passwords only on the matching domain also resists phishing in practice, provided the user does not copy the password by hand when autofill fails.)
:::
:::

## Sessions and single sign-on

After a login, the server needs to recognise the user's following requests without asking for the password every time. It issues a **session token**: a random value of at least 128 bits from a cryptographically secure generator (`secrets.token_urlsafe(32)` in Python), stored by the client — usually in a cookie — and sent with each request. The server maps the token to the session's state, or the token is itself a signed or MACed structure listing the user and an expiry. The token is now as good as the password for as long as it lives, so it must travel only over TLS, be kept out of reach of scripts and of other sites (the cookie attributes `Secure`, `HttpOnly` and `SameSite`, explained in [[security/web-security]]), expire, be replaced after login (to prevent **session fixation**, in which an attacker plants a known token before the user logs in), and be invalidated at logout and on a password change.

::: example How long must a session token be? {#ex-token}
A service has $10^6$ active sessions at any time, each identified by a uniformly random token of $b$ bits. An attacker can submit $10^9$ guesses per second (far more than any real service would allow) for a year. Bound the probability that some guess matches some live session, for $b = 32$ and $b = 128$.
::: solution
Each guess matches one of the $10^6$ live tokens with probability at most $10^6/2^b$. A year is about $3.16 \times 10^7$ s, so there are $3.16 \times 10^{16}$ guesses, and by the union bound the probability of any success is at most $3.16 \times 10^{16} \times 10^6 / 2^b = 3.16 \times 10^{22}/2^b$. For $b = 32$ this bound exceeds $1$ by a factor of about $7 \times 10^{12}$ — success is certain within the first fraction of a second. For $b = 128$ it is $3.16 \times 10^{22}/3.4 \times 10^{38} \approx 9.3 \times 10^{-17}$. This is why tokens must come from a cryptographically secure generator with at least 128 bits: a counter, a timestamp or a hash of the user name has a guessing space far smaller than its length suggests.
:::
:::

Users have accounts at dozens of services, and **single sign-on** (SSO) lets one **identity provider** authenticate them for many **relying parties**. Instead of every service storing passwords, each trusts assertions signed by the identity provider.

- **Kerberos** (MIT's Project Athena, 1980s; version 5 in RFC 4120, 2005), built on the Needham–Schroeder symmetric-key protocol, is the standard in enterprise networks: a user authenticates once to a key distribution centre and obtains a **ticket-granting ticket**, then short-lived **service tickets**, each encrypted under a key shared between the centre and the service, with timestamps for freshness.
- **SAML 2.0** (2005) and **OpenID Connect** (2014, a layer on **OAuth 2.0**, RFC 6749, 2012) are the web's protocols. In OpenID Connect the relying party redirects the browser to the identity provider; the user logs in there (ideally with WebAuthn); the provider redirects back with a short-lived code that the relying party exchanges, over a direct TLS connection, for a signed **ID token** stating who the user is, for which relying party, and until when.

OAuth 2.0 by itself is a protocol for **delegated authorisation** — letting an application act on your behalf at another service with a limited **access token**, without giving it your password — not for authentication; OpenID Connect adds the identity layer. The security of these flows rests on details that are easy to get wrong: exact matching of registered redirect addresses, binding each response to the request that started it (the `state` and `nonce` parameters, and PKCE, RFC 7636), and checking the token's signature, issuer, audience and expiry. Use maintained libraries, and follow the current best-practice documents rather than blog posts.

SSO concentrates risk as well as convenience: the identity provider becomes a single point of failure and the most valuable target in the organisation, so it is where the strongest authentication belongs. And every system has a weakest path: **account recovery**. If a forgotten password can be reset by answering "mother's maiden name" or by a support agent who is persuaded on the phone, that is the real strength of the system, whatever the login page requires. Recovery should rely on factors at least as strong as login — a second registered security key, recovery codes printed at registration, or identity checks with delays and notifications.

::: history
Fernando Corbató's Compatible Time-Sharing System at MIT used passwords in the 1960s, and its password file was famously printed in place of a message of the day in 1966. Robert Morris and Ken Thompson's "Password security: a case history" (*Communications of the ACM*, 1979) described Unix's move to salted, deliberately slow hashing with the `crypt` function — a 12-bit salt and 25 iterations of a modified DES. Leslie Lamport proposed hash-chain one-time passwords in 1981; Roger Needham and Michael Schroeder's 1978 protocols led to Kerberos, developed at MIT's Project Athena in the 1980s. Niels Provos and David Mazières introduced bcrypt at USENIX in 1999, Colin Percival scrypt in 2009, and Alex Biryukov, Daniel Dinu and Dmitry Khovratovich's Argon2 won the Password Hashing Competition in 2015. HOTP and TOTP, from the industry's Initiative for Open Authentication, became RFCs in 2005 and 2011. The FIDO Alliance (2013) and the W3C's Web Authentication standard (2019) brought public-key login to browsers, and the major platforms began syncing such credentials as "passkeys" from 2022. NIST's SP 800-63B (2017) abandoned composition rules and forced expiry, and its fourth revision was finalised in 2025.
:::

## Where this leads

Authentication establishes *who*; [[security/access-control]] decides *what they may do*, and its models assume authentication has been done correctly. Session tokens live in cookies, whose protection against other websites is part of [[security/web-security]]; authenticated channels between machines, from TLS client certificates to VPNs, appear in [[security/network-security]]. Password databases are among the most valuable things an intruder can steal, which is one reason [[security/malware]] treats credential theft as a central step of intrusions. The cryptography behind challenge–response — signatures and their unforgeability — is in [[cryptography/signatures]], and authenticated key exchange in [[cryptography/protocols]].

::: summary
- **Authentication** verifies a claimed identity from evidence: something you know, have or are ([[#def-authn]]). Entity authentication needs **freshness**, so that recorded evidence cannot be replayed.
- Human-chosen passwords are skewed; the right measure is the $q$-guess success rate $\lambda_q$, maximised by guessing the most likely passwords first ([[#prop-optimal-guessing]]). Length, blocklists and rate limiting help; composition rules and forced expiry do not.
- Store passwords with a **salted, slow, memory-hard** function (Argon2id, scrypt or bcrypt) through a vetted library. Salts make every account a separate problem and defeat precomputation ([[#prop-salt]]); the work factor makes every guess expensive; a pepper and constant-time comparison add further protection.
- **HOTP/TOTP** codes are HMAC values truncated to a few digits ([[#alg-hotp]]); they stop replay and guessing but not real-time phishing.
- **Challenge–response with public keys bound to the origin** (WebAuthn, passkeys) resists replay and phishing ([[#prop-challenge]]) and leaves nothing reusable in a stolen server database.
- **Session tokens** are bearer credentials: random, transmitted over TLS, in protected cookies, rotated at login and expired. **SSO** (Kerberos, SAML, OpenID Connect) centralises authentication in an identity provider, which must be the best-protected system. Account recovery is often the weakest path.
:::

## Exercises

::: exercise Entropy of random passwords {level=1 check="8"}
What is the smallest length $L$ of a password chosen uniformly at random from the $62$ letters and digits that has at least $45$ bits of entropy? (Enter $L$.)
::: solution
Each character gives $\log_2 62 \approx 5.954$ bits. We need $5.954 L \ge 45$, so $L \ge 7.56$, hence $L = 8$ (giving about $47.6$ bits).
:::
:::

::: exercise scrypt memory {level=1 check="64"}
scrypt uses about $128 \cdot N \cdot r$ bytes of memory. How many mebibytes does it use with $N = 2^{16}$ and $r = 8$? (Enter the number of MiB.)
::: solution
$128 \times 2^{16} \times 8 = 2^7 \times 2^{16} \times 2^3 = 2^{26}$ bytes $= 64$ MiB.
:::
:::

::: exercise Raising the bcrypt cost {level=1 check="4"}
A site moves from bcrypt cost $10$ to cost $12$. By what factor does the time for an attacker to test one password guess increase? (Enter the factor.)
::: solution
bcrypt performs $2^{\mathit{cost}}$ rounds of its expensive key setup, so the factor is $2^{12}/2^{10} = 4$ — matching the measured $74$ ms and $324$ ms of [[#ex-cost]] to within timing noise.
:::
:::

::: exercise Salts in numbers {level=2 check="1000000"}
A stolen database has $10{,}000$ accounts, and an attacker wants to test each of the $100$ most common passwords against every account. How many evaluations of the password hash are needed if every account has its own salt? How many without salts? (Enter the number with salts.)
::: solution
By [[#prop-salt]], with distinct salts every (account, candidate) pair needs its own evaluation: $10{,}000 \times 100 = 10^6$. Without salts, $100$ evaluations suffice — or none at all if the attacker has a precomputed table — followed by $10^6$ cheap look-ups. With a slow hash at $0.3$ s per evaluation, the salted attack takes about $3.5$ days on one core, the unsalted one $30$ seconds.
:::
:::

::: exercise HOTP truncation {level=2 check="287082"}
For the RFC 4226 key and counter $C = 1$, HMAC-SHA1 gives the 20-byte value `75a48a19d4cbe100644e8ac1397eea747a2d33ab`. Carry out the dynamic truncation by hand. (Enter the six-digit code without leading zeros.)
::: solution
The last byte is `ab`, whose low nibble is `b` $= 11$, so $o = 11$. Bytes $11$ to $14$ (counting from $0$): the bytes are `75 a4 8a 19 d4 cb e1 00 64 4e 8a c1 39 7e ea 74 …`, so bytes $11$–$14$ are `c1 39 7e ea`. Clearing the top bit gives `41397eea` $= 1{,}094{,}287{,}082$, and modulo $10^6$ that is $287082$, the RFC's second test value and the second value printed in [[#ex-hotp]].
:::
:::

::: exercise A TOTP window {level=2}
A server accepts TOTP codes for the current 30-second step and one step on either side. (a) How long, at most, does a code observed by an attacker remain usable? (b) An online attacker without the key guesses 6-digit codes; with a limit of $5$ attempts per step, what is the probability of success within one day? (c) What should the server remember to prevent a code being used twice?
::: solution
(a) A code for step $C$ is accepted while the server's current step is $C - 1$, $C$ or $C + 1$, a span of $90$ seconds. A code seen when the user types it, during step $C$, stays usable until step $C + 1$ ends — up to $60$ seconds later — unless the server rejects reuse as in (c). (b) There are $2880$ steps in a day and at most $5$ guesses in each, so at most $14{,}400$ guesses, each succeeding with probability about $3/10^6$ (three codes are acceptable at any moment). The union bound gives at most $14{,}400 \times 3 \times 10^{-6} \approx 0.043$ — too high, which is why limits must apply across steps (for example, lock the second factor after a few dozen consecutive failures and alert the user). (c) The last step number successfully used for each account; reject any code from that step or earlier, as RFC 6238 recommends.
:::
:::

::: exercise Design a password store {level=3}
Write functions `hash_password(pw)` and `verify(pw, record)` using `hashlib.scrypt` with $N = 2^{14}$, $r = 8$, $p = 1$, a 16-byte salt from `os.urandom`, a 32-byte output, and constant-time comparison, storing the parameters with the record so that they can be changed later. Show that verifying the right and a wrong password works, and explain how you would migrate existing users to $N = 2^{17}$.
::: solution
```python
import hashlib, hmac, os

def hash_password(pw: str, n: int = 2**14, r: int = 8, p: int = 1) -> str:
    salt = os.urandom(16)
    h = hashlib.scrypt(pw.encode(), salt=salt, n=n, r=r, p=p, dklen=32, maxmem=2**28)
    return f"scrypt${n}${r}${p}${salt.hex()}${h.hex()}"

def verify(pw: str, record: str) -> bool:
    _, n, r, p, salt, h = record.split("$")
    cand = hashlib.scrypt(pw.encode(), salt=bytes.fromhex(salt), n=int(n), r=int(r),
                          p=int(p), dklen=32, maxmem=2**28)
    return hmac.compare_digest(cand, bytes.fromhex(h))   # constant-time comparison

rec = hash_password("plum-anvil-sixty-orbit")
print(rec[:40] + "...")
print(verify("plum-anvil-sixty-orbit", rec), verify("plum-anvil-sixty-orbi", rec))
```

```console
scrypt$16384$8$1$d8d48d31142b0a76804dad8...
True False
```

(The salt differs on every run.) To migrate, keep accepting old records; when a user logs in successfully, the plaintext is momentarily available, so recompute the record with $N = 2^{17}$ and store it. Accounts that never log in can be protected immediately by wrapping: store $\mathrm{scrypt}_{2^{17}}(\text{old hash})$ and verify by computing the old hash first and then the new one, so that no stored value is weaker than the new standard. In production use a maintained library (for example an Argon2id binding) that implements this format and its upgrades.
:::
:::

::: exercise Why a server-side biometric is a bad password {level=3}
A company proposes to authenticate customers by sending a scan of their fingerprint to its server, which compares it with a stored template. Using the ideas of this chapter, give four distinct weaknesses of this design compared with a WebAuthn key unlocked by the same fingerprint on the user's phone, and say which security goal each one threatens.
::: solution
(1) **Replay**: the scan is static evidence; anyone who records it in transit, on a compromised client, or from the server can submit it again. WebAuthn signs a fresh challenge, so a recorded response is useless ([[#prop-challenge]]) — authenticity. (2) **Irrevocability**: a stolen template database exposes data the users can never change, unlike a password or a key pair, which can be re-registered — confidentiality, with permanent consequences. (3) **Cross-site linkage and reuse**: the same fingerprint would be accepted by every service that adopts the scheme, so one breach compromises all of them, and templates can link a person's accounts; WebAuthn uses a separate key pair per site — confidentiality and privacy. (4) **Approximate matching on the server**: the server must accept near matches, so an attacker who can try many synthetic or lifted prints online has a non-negligible false-accept rate per attempt; with WebAuthn, matching happens on the device, which rate-limits attempts and falls back to a PIN — authenticity. One could add that a scan is not secret at all — fingerprints can be lifted from surfaces — so the design rests on a "something you are" being treated as "something you know", which it is not.
:::
:::
