Alice wants to send Bob a message over a channel that Eve can read. They met last week and agreed on a secret; now Alice transforms her message using that secret, sends the result, and Bob undoes the transformation. Eve sees everything that travels on the channel and knows exactly how the transformation works — everything except the secret. What can we promise Alice about what Eve learns?

For most of its history cryptography had no answer to that question beyond "nobody we know has broken it yet". Ciphers were invented, used with confidence, broken, and replaced, in a cycle that lasted more than two thousand years. The turning point came in 1949, when Claude Shannon gave the first *mathematical definition* of a secure cipher, showed that a simple cipher — the one-time pad — meets it, and proved that every cipher meeting it must have a key at least as long as the message. This chapter tells that story: the setting and syntax of encryption, three classical ciphers and why each fails, Shannon's definition of **perfect secrecy** and its equivalent forms, the one-time pad, and the theorems that show both its strength and its price. The price is what motivates the rest of the course, starting with [[cryptography/computational-security]]. We use conditional probability and Bayes' rule throughout; they are in [Maths Atlas: conditional probability](/learn/maths/lesson.php?c=probability&l=conditional-probability).

## The setting: private-key encryption

We consider the **private-key** (or **symmetric**) setting: Alice and Bob share a key that Eve does not have. The public-key setting, where no secret is shared in advance, comes in [[cryptography/public-key]].

::: definition Private-key encryption scheme {#def-scheme}
A **private-key encryption scheme** with **message space** $\mathcal M$ consists of three algorithms:

- a **key-generation** algorithm $\mathsf{Gen}$ that outputs a key $k$ from a finite **key space** $\mathcal K$ according to some probability distribution;
- an **encryption** algorithm $\mathsf{Enc}$ that takes a key $k$ and a message $m \in \mathcal M$ and outputs a **ciphertext** $c \gets \mathsf{Enc}_k(m)$ in a **ciphertext space** $\mathcal C$; it may be randomised;
- a **decryption** algorithm $\mathsf{Dec}$, deterministic, that takes $k$ and $c$ and outputs a message $m = \mathsf{Dec}_k(c)$.

It is **correct** if $\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = m$ for every key $k$ that $\mathsf{Gen}$ can output, every $m \in \mathcal M$ and every random choice of $\mathsf{Enc}$.
:::

The original message is the **plaintext**. Notice what the definition does *not* say: it says nothing about which algorithms are used being secret. **Kerckhoffs's principle** (1883) demands that a cipher remain secure even if everything about it except the key is public. There are three reasons. A key is short and easy to change if it leaks; an algorithm is built into hardware and software and is not. Algorithms leak — they are reverse-engineered, published, sold. And only a published design can be studied by people who did not invent it, which is the only way to gain confidence in it. Modern standards (AES, SHA-3, the post-quantum schemes of [[cryptography/post-quantum]]) were all chosen in open public competitions.

We also have to say what the attacker can do. In this chapter Eve is an **eavesdropper**: she sees one ciphertext and tries to learn something about the plaintext. Later chapters give her more power — many ciphertexts, chosen plaintexts, chosen ciphertexts — and that hierarchy of **threat models** is part of every security definition.

## Classical ciphers and how they fall

### The shift cipher

Julius Caesar is said to have replaced each letter by the one three places later in the alphabet. As a scheme over the alphabet $\{A, \dots, Z\}$ identified with $\Z_{26} = \{0, \dots, 25\}$: $\mathsf{Gen}$ picks $k \in \Z_{26}$ uniformly; $\mathsf{Enc}_k(m_1\dots m_\ell) = c_1 \dots c_\ell$ with $c_i = (m_i + k) \bmod 26$; and $\mathsf{Dec}_k$ subtracts $k$. With $k = 3$, `ATTACKATDAWN` becomes `DWWDFNDWGDZQ`.

::: widget modular
n: 26
mode: add
caption: The addition table of $\Z_{26}$. The shift cipher with key $k$ maps row $m$ to the entry in column $k$; every row and every column is a permutation of $\Z_{26}$, so each key permutes the alphabet and each plaintext letter can become any ciphertext letter. Hover over an entry to read off $m + k \bmod 26$, and notice that there are only $26$ columns to try.
:::

The shift cipher fails because the key space is tiny. An attacker who sees `XPPELEYZZY` simply tries all $26$ keys — an **exhaustive key search** or **brute-force attack** — and reads off the one that gives sensible text:

```python
A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def shift(text, k):
    """Shift every letter by k places (k negative to decrypt). A toy cipher."""
    return "".join(A[(A.index(ch) + k) % 26] for ch in text)

c = "XPPELEYZZY"
for k in range(26):
    print(k, shift(c, -k))
```

```console
$ python3 shift.py
0 XPPELEYZZY
1 WOODKDXYYX
...
10 NFFUBUOPPO
11 MEETATNOON
12 LDDSZSMNNM
...
25 YQQFMFZAAZ
```

Only $k = 11$ gives English. That gives the first principle of cipher design, the **sufficient key-space principle**: the key space must be too large to search. As we shall see, it is necessary but far from sufficient.

### The substitution cipher

Let the key be an arbitrary permutation $\pi$ of the alphabet, and encrypt letter by letter, $c_i = \pi(m_i)$. There are $26! = 403\,291\,461\,126\,605\,635\,584\,000\,000 \approx 2^{88.4}$ keys, more than could be searched with all the computers on Earth. Yet a newspaper puzzle-solver breaks it in minutes by **frequency analysis**, described by al-Kindī in the ninth century. In English text the letter `E` makes up about 12–13% of letters, `T` about 9%, `A` and `O` about 8%, while `J`, `Q`, `X`, `Z` are each well under 1% (these are observations from large bodies of text and vary with the source). The substitution maps letters to letters, so it preserves the frequency profile, merely relabelling it: the most common ciphertext letter is probably `E`. Pairs (`TH`, `HE`), doubled letters and short words then fix the rest.

The lesson is that the key must be not only large but *used* in a way that hides the statistics of the plaintext.

### The Vigenère cipher

The Vigenère cipher (described by Bellaso in 1553, misattributed to Vigenère) uses a keyword $k = k_0 k_1 \dots k_{t-1}$ and shifts the $i$-th letter by $k_{i \bmod t}$:
$$
c_i = (m_i + k_{i \bmod t}) \bmod 26 .
$$
Each letter of the plaintext is shifted by an amount that cycles with period $t$, so the same plaintext letter becomes different ciphertext letters at different positions, which flattens the frequency profile. It was called *le chiffre indéchiffrable* for three centuries.

::: example Vigenère encryption {#ex-vigenere}
Encrypt `ATTACKATDAWN` with the keyword `LEMON`, and decrypt it again.
::: solution
Write the keyword repeatedly under the plaintext and add letter values ($A = 0, \dots, Z = 25$) modulo $26$:

| plaintext | A | T | T | A | C | K | A | T | D | A | W | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| key | L | E | M | O | N | L | E | M | O | N | L | E |
| shift | 11 | 4 | 12 | 14 | 13 | 11 | 4 | 12 | 14 | 13 | 11 | 4 |
| ciphertext | L | X | F | O | P | V | E | F | R | N | H | R |

For instance $T + M = 19 + 12 = 31 \equiv 5 = F$. Note that the three `A`s at positions $0$, $3$ and $9$ became `L`, `O` and `N`, and the two `T`s at positions $1, 2$ became `X` and `F`. Decryption subtracts the same shifts: $L - L = 0 = A$, $X - E = 23 - 4 = 19 = T$, and so on, recovering `ATTACKATDAWN`. A short program confirms both directions:

```python
def vigenere(text, key, sign=1):
    """Toy Vigenère cipher: sign=+1 encrypts, sign=-1 decrypts."""
    return "".join(A[(A.index(ch) + sign * A.index(key[i % len(key)])) % 26]
                   for i, ch in enumerate(text))

c = vigenere("ATTACKATDAWN", "LEMON")
print(c, vigenere(c, "LEMON", -1))
```

```console
$ python3 vigenere.py
LXFOPVEFRNHR ATTACKATDAWN
```
:::
:::

The Vigenère cipher falls once the period $t$ is known: the letters at positions $0, t, 2t, \dots$ were all shifted by the same amount, so each of these $t$ subsequences is a shift cipher, broken by frequency analysis. The period itself can be found in two classical ways. Kasiski (1863) noticed that repeated fragments of plaintext that happen to line up with the same part of the key produce repeated fragments of ciphertext, at distances that are multiples of $t$. Friedman (1920s) used the **index of coincidence**, the probability that two letters drawn at random from a text are equal, $\sum_x p_x^2$. For English it is about $0.065$; for uniformly random letters it is $1/26 \approx 0.038$. Splitting the ciphertext into $t'$ subsequences for each candidate $t'$, the correct period is the one where the subsequences look like English (index near $0.065$) rather than like random text.

Notice the pattern. Each cipher was broken not by finding the key directly but by exploiting some *statistical relationship between plaintext and ciphertext* that the key did not destroy. A cipher can only be trusted if we can prove no such relationship exists — and for that we need a definition.

::: quiz
A substitution cipher has about $2^{88}$ keys, more than any computer can search. Why is it nevertheless insecure?

- [ ] Because the attacker can search the key space in parallel.
- [x] Because each plaintext letter is always mapped to the same ciphertext letter, so letter frequencies survive encryption.
- [ ] Because the key is a permutation, and permutations can be inverted.
- [ ] Because Kerckhoffs's principle requires the permutation to be public.
::: solution
A large key space defeats only exhaustive search. Frequency analysis does not search keys at all: it matches the frequency profile of the ciphertext against that of the language. Inverting a permutation requires knowing it, and Kerckhoffs's principle makes the *algorithm* public, not the key.
:::
:::

## Perfect secrecy

We now make "Eve learns nothing" precise. Model the message as a random variable $M$ over $\mathcal M$, with some distribution that describes what Eve knows in advance — perhaps that Alice's message is `ATTACK` with probability $0.7$ and `RETREAT` with probability $0.3$. The key $K$ is produced by $\mathsf{Gen}$ independently of $M$, and $C = \mathsf{Enc}_K(M)$ is the resulting ciphertext, a random variable that depends on $K$, $M$ and the randomness of $\mathsf{Enc}$. Eve learns nothing from $C$ if her knowledge about $M$ after seeing $C$ is the same as before.

::: definition Perfect secrecy {#def-perfect-secrecy}
An encryption scheme with message space $\mathcal M$ is **perfectly secret** if for every probability distribution over $\mathcal M$, every message $m \in \mathcal M$ and every ciphertext $c \in \mathcal C$ with $\Prob[C = c] > 0$,
$$
\Prob[M = m \mid C = c] = \Prob[M = m] .
$$
:::

The definition quantifies over *every* distribution of messages, because the scheme cannot know what Eve believes. It does not say that Eve learns nothing at all — she may already know a great deal about $M$ — only that the ciphertext adds nothing. And it makes no assumption about Eve's computing power: the guarantee holds against an adversary with unlimited time. This is why perfect secrecy is also called **information-theoretic** or **unconditional** security.

A useful reformulation removes the dependence on the message distribution.

::: lemma Ciphertext distribution independent of the message {#lem-perfect-equiv}
A scheme is perfectly secret if and only if for all $m_0, m_1 \in \mathcal M$ and all $c \in \mathcal C$,
$$
\Prob[\mathsf{Enc}_K(m_0) = c] = \Prob[\mathsf{Enc}_K(m_1) = c],
$$
where the probabilities are over the choice of $K$ by $\mathsf{Gen}$ and the randomness of $\mathsf{Enc}$.
:::

::: proof
Since $K$ is independent of $M$, $\Prob[C = c \mid M = m] = \Prob[\mathsf{Enc}_K(m) = c]$ whenever $\Prob[M = m] > 0$.

($\Leftarrow$) Suppose $\Prob[\mathsf{Enc}_K(m) = c] = p_c$ for every $m$. Fix any distribution over $\mathcal M$. By the law of total probability, $\Prob[C = c] = \sum_{m'} \Prob[C = c \mid M = m']\Prob[M = m'] = p_c\sum_{m'}\Prob[M = m'] = p_c$. If $\Prob[C = c] > 0$ and $\Prob[M = m] > 0$, Bayes' rule gives
$$
\Prob[M = m \mid C = c] = \frac{\Prob[C = c \mid M = m]\,\Prob[M = m]}{\Prob[C = c]} = \frac{p_c\,\Prob[M = m]}{p_c} = \Prob[M = m],
$$
and if $\Prob[M = m] = 0$ both sides are $0$. So the scheme is perfectly secret.

($\Rightarrow$) Suppose the scheme is perfectly secret and take the uniform distribution over $\mathcal M$, so $\Prob[M = m] > 0$ for all $m$. For any $m$ and $c$: if $\Prob[C = c] = 0$ then $\Prob[C = c \mid M = m] = 0$ for every $m$; otherwise Bayes' rule and perfect secrecy give $\Prob[C = c \mid M = m] = \Prob[M = m \mid C = c]\Prob[C = c]/\Prob[M = m] = \Prob[C = c]$. Either way $\Prob[\mathsf{Enc}_K(m) = c]$ equals $\Prob[C = c]$, which does not depend on $m$.
:::

So a scheme is perfectly secret exactly when the ciphertext distribution is the same whatever the message: looking at $c$ gives no hint which message produced it.

### Perfect indistinguishability

A third formulation is phrased as a game between the scheme and an adversary. Modern definitions all take this form, so it is worth seeing it first in the simplest setting.

::: definition The eavesdropping indistinguishability experiment {#def-perfect-indist}
For a scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ and an adversary $\mathcal A$, the experiment $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal A, \Pi}$ runs as follows:

1. $\mathcal A$ outputs two messages $m_0, m_1 \in \mathcal M$.
2. A key $k \gets \mathsf{Gen}$ and a uniform bit $b \in \{0, 1\}$ are chosen, and the **challenge ciphertext** $c \gets \mathsf{Enc}_k(m_b)$ is given to $\mathcal A$.
3. $\mathcal A$ outputs a bit $b'$. The experiment's output is $1$ (the adversary **succeeds**) if $b' = b$.

$\Pi$ is **perfectly indistinguishable** if every adversary $\mathcal A$ succeeds with probability exactly $1/2$.
:::

Guessing at random already succeeds with probability $1/2$, so perfect indistinguishability says that no strategy, however clever or slow, does any better than guessing.

::: theorem Two definitions agree {#thm-indist-equiv}
An encryption scheme is perfectly secret if and only if it is perfectly indistinguishable.
:::

::: proof
($\Rightarrow$) By [[#lem-perfect-equiv]], the distribution of $c$ is the same whether $b = 0$ or $b = 1$. The adversary's output $b'$ is computed from $m_0, m_1$, $c$ and its own randomness, so its distribution is also the same in both cases, say $\Prob[b' = 0] = q$. Then $\Prob[b' = b] = \tfrac12\Prob[b' = 0 \mid b = 0] + \tfrac12\Prob[b' = 1 \mid b = 1] = \tfrac12 q + \tfrac12(1 - q) = \tfrac12$.

($\Leftarrow$) If the scheme is not perfectly secret, [[#lem-perfect-equiv]] gives $m_0, m_1, c$ with $p_0 = \Prob[\mathsf{Enc}_K(m_0) = c] \ne p_1 = \Prob[\mathsf{Enc}_K(m_1) = c]$; swapping the names if necessary, $p_0 > p_1$. Let $\mathcal A$ output $m_0, m_1$, and then output $b' = 0$ if it receives $c$ and $b' = 1$ otherwise. It succeeds with probability
$$
\tfrac12 p_0 + \tfrac12(1 - p_1) = \tfrac12 + \tfrac12(p_0 - p_1) > \tfrac12,
$$
so the scheme is not perfectly indistinguishable.
:::

The game-based view will be the template for computational security: in [[cryptography/computational-security]] we keep the game and relax "exactly $1/2$" to "at most $1/2$ plus something negligible", for adversaries running in polynomial time.

::: example Perfect secrecy for one letter, not for two {#ex-shift-two}
(a) Show that the shift cipher is perfectly secret when it encrypts a single letter. (b) Show that it is not perfectly secret for two-letter messages, by finding $m_0, m_1, c$ that violate [[#lem-perfect-equiv]].
::: solution
(a) For a single letter $m$ and any ciphertext letter $c$, exactly one key maps $m$ to $c$, namely $k = (c - m) \bmod 26$. The key is uniform, so $\Prob[\mathsf{Enc}_K(m) = c] = 1/26$ for every $m$ and $c$: independent of $m$, hence perfectly secret by [[#lem-perfect-equiv]].

(b) Take $m_0 = $ `AA`, $m_1 = $ `AB` and $c = $ `XX`. The key $k = 23$ maps `AA` to `XX`, so $\Prob[\mathsf{Enc}_K(\texttt{AA}) = \texttt{XX}] = 1/26$. Every key shifts both letters by the same amount, so a message with two different letters can never become `XX`: $\Prob[\mathsf{Enc}_K(\texttt{AB}) = \texttt{XX}] = 0$. In the language of [[#def-perfect-secrecy]], if `AA` and `AB` are equally likely a priori, then after seeing `XX` Eve knows for certain that the message was not `AB`. The adversary of [[#thm-indist-equiv]] — "output $0$ if both ciphertext letters are equal" — succeeds with probability $\tfrac12 + \tfrac12\cdot 1 = 1$. One key letter cannot hide the relationship between two plaintext letters.
:::
:::

## The one-time pad

The one-time pad (Vernam 1917, with the "use once" requirement from Mauborgne) is the shift cipher with a fresh, independent key letter for every message letter. Over bits, shift is exclusive-or (addition modulo $2$), written $\oplus$.

::: definition One-time pad {#def-otp}
Fix a length $\ell$. Let $\mathcal M = \mathcal K = \mathcal C = \{0, 1\}^\ell$. $\mathsf{Gen}$ outputs a uniformly random $k \in \{0, 1\}^\ell$; $\mathsf{Enc}_k(m) = k \oplus m$ (bitwise exclusive-or); $\mathsf{Dec}_k(c) = k \oplus c$.
:::

Correctness holds because $\oplus$ is associative, $k \oplus k = 0^\ell$ and $0^\ell \oplus m = m$: $\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = k \oplus (k \oplus m) = m$.

::: widget truthtable
formula: (m xor k) xor k
compare: m
caption: Encryption and decryption of a single bit of the one-time pad: the column for $(m \oplus k) \oplus k$ equals the column for $m$, so decryption undoes encryption for both key bits. Look also at the column for $m \oplus k$: for each fixed $m$ it takes the values $0$ and $1$ once each as $k$ varies — with a uniform key bit, the ciphertext bit is uniform whatever $m$ is.
:::

::: theorem The one-time pad is perfectly secret {#thm-otp}
The one-time pad is perfectly secret.
:::

::: proof
Fix $m, c \in \{0, 1\}^\ell$. The equation $k \oplus m = c$ has exactly one solution, $k = c \oplus m$. Since $K$ is uniform over $2^\ell$ strings,
$$
\Prob[\mathsf{Enc}_K(m) = c] = \Prob[K = c \oplus m] = 2^{-\ell},
$$
which does not depend on $m$. By [[#lem-perfect-equiv]] the scheme is perfectly secret.
:::

::: example A two-byte one-time pad {#ex-otp}
Encrypt the ASCII message `HI` with the key `0x3ca5`. Then suppose the message had instead been `NO`: which key would have produced the same ciphertext?
::: solution
`HI` is `0x48 0x49`, that is $01001000\ 01001001$. XOR with $00111100\ 10100101$ gives $01110100\ 11101100$, that is `0x74ec`:

```python
m, k = b"HI", bytes([0x3C, 0xA5])
c = bytes(x ^ y for x, y in zip(m, k))
print(c.hex())                                       # 74ec
print(bytes(x ^ y for x, y in zip(c, b"NO")).hex())  # key that maps NO to c
```

```console
$ python3 otp.py
74ec
3aa3
```

The key `0x3aa3` maps `NO` to the same ciphertext `0x74ec`. Every two-byte message has exactly one key that encrypts it to `0x74ec`, and every key is equally likely, so the ciphertext is equally consistent with every message. An attacker who tries all keys gets every possible message once — `HI`, `NO`, `OK`, `GO` — and has no way to tell which is right. This is the precise sense in which exhaustive search is useless against the one-time pad.
:::
:::

### The one-time pad must be used once

The name is a warning. Suppose the same key $k$ encrypts two messages: $c_1 = k \oplus m_1$ and $c_2 = k \oplus m_2$. Then
$$
c_1 \oplus c_2 = (k \oplus m_1) \oplus (k \oplus m_2) = m_1 \oplus m_2,
$$
and the key cancels. Eve learns the XOR of the two plaintexts, which reveals where they agree (zero bits) and, for natural-language text, is usually enough to recover both by guessing likely words in one and reading off the other. If she ever learns $m_1$, she obtains $m_2 = c_1 \oplus c_2 \oplus m_1$ and the key itself. The scheme of [[#def-otp]] is perfectly secret *for one message*; it says nothing about two, and two encryptions under one key are not perfectly secret ([[#ex-two-time]]).

::: warning A pad reused, or a pad that is not random, is not a one-time pad
The perfect secrecy of the one-time pad rests on three conditions: the key is **uniformly random**, **as long as the message**, and **never reused**. Weakening any of them destroys the guarantee, not gradually but completely. A key generated by a predictable process (a seeded `random.random()`, a repeating pattern, text from a book) is not uniform. A key reused even twice gives Eve $m_1 \oplus m_2$. And "one-time pad" is a common marketing term for products that generate a short key and expand it — which is a stream cipher, with only computational security ([[cryptography/computational-security]]). Note also that the one-time pad gives **no integrity**: flipping bit $i$ of the ciphertext flips bit $i$ of the decrypted plaintext, and Bob cannot tell ([[cryptography/hash-mac]] deals with this). In real code, never implement any of the ciphers in this chapter: use a vetted library's authenticated encryption, as later chapters explain.
:::

## The price of perfect secrecy

The one-time pad needs as much key as message, and a fresh key for every message. Distributing that much key securely is as hard as distributing the messages themselves, which is why the one-time pad has been used only where that cost is acceptable — diplomatic and military hotlines, with keys carried by courier. Could a cleverer scheme do better? Shannon proved that it cannot.

::: theorem Perfect secrecy needs long keys {#thm-key-length}
If an encryption scheme with message space $\mathcal M$ and key space $\mathcal K$ is perfectly secret, then $\lvert\mathcal K\rvert \ge \lvert\mathcal M\rvert$.
:::

::: proof
Suppose $\lvert\mathcal K\rvert < \lvert\mathcal M\rvert$; we show that the scheme is not perfectly secret. Take the uniform distribution over $\mathcal M$ and any ciphertext $c$ with $\Prob[C = c] > 0$. Let
$$
\mathcal M(c) = \set{\mathsf{Dec}_k(c) : k \in \mathcal K}
$$
be the set of messages that $c$ could decrypt to. It has at most $\lvert\mathcal K\rvert < \lvert\mathcal M\rvert$ elements, so there is a message $m' \notin \mathcal M(c)$. If $c$ could be an encryption of $m'$ under some key $k$, correctness would give $\mathsf{Dec}_k(c) = m'$, putting $m'$ in $\mathcal M(c)$; so $\Prob[M = m' \mid C = c] = 0$. But $\Prob[M = m'] = 1/\lvert\mathcal M\rvert > 0$, contradicting [[#def-perfect-secrecy]].
:::

For messages of $\ell$ bits, $\lvert\mathcal M\rvert = 2^\ell$, so a perfectly secret scheme needs at least $2^\ell$ keys, which takes at least $\ell$ bits to write down. The one-time pad is optimal. The proof also shows *how* a scheme with short keys leaks: an unbounded attacker who decrypts $c$ under every key rules out every message outside $\mathcal M(c)$. [[#ex-short-key]] turns this into a concrete advantage in the indistinguishability game.

When the three spaces have the same size, Shannon characterised perfect secrecy completely.

::: theorem Shannon's theorem {#thm-shannon}
Let $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ be a scheme with deterministic $\mathsf{Enc}$ and $\lvert\mathcal M\rvert = \lvert\mathcal K\rvert = \lvert\mathcal C\rvert$, in which every ciphertext in $\mathcal C$ has positive probability under some message distribution. The scheme is perfectly secret if and only if

1. $\mathsf{Gen}$ chooses every key with probability $1/\lvert\mathcal K\rvert$, and
2. for every $m \in \mathcal M$ and $c \in \mathcal C$ there is exactly one key $k$ with $\mathsf{Enc}_k(m) = c$.
:::

::: proof
($\Leftarrow$) For any $m$ and $c$, let $k_{m,c}$ be the unique key with $\mathsf{Enc}_{k_{m,c}}(m) = c$. Then $\Prob[\mathsf{Enc}_K(m) = c] = \Prob[K = k_{m,c}] = 1/\lvert\mathcal K\rvert$, independent of $m$, and [[#lem-perfect-equiv]] gives perfect secrecy.

($\Rightarrow$) Assume perfect secrecy. By [[#lem-perfect-equiv]], $\Prob[\mathsf{Enc}_K(m) = c]$ is the same for every $m$; call it $p_c$. Every $c$ has positive probability for some message, so $p_c > 0$ for every $c$ and every $m$.

*Condition 2.* Fix $m$. For each of the $\lvert\mathcal C\rvert$ ciphertexts $c$ there is some key mapping $m$ to $c$, because $p_c > 0$. These keys are distinct for distinct $c$, because $\mathsf{Enc}$ is deterministic. There are only $\lvert\mathcal K\rvert = \lvert\mathcal C\rvert$ keys, so each $c$ is reached by exactly one key — the map $k \mapsto \mathsf{Enc}_k(m)$ is a bijection from $\mathcal K$ to $\mathcal C$.

*Condition 1.* Fix $c$, and for each $m$ let $k_m$ be the unique key with $\mathsf{Enc}_{k_m}(m) = c$. Then $\Prob[K = k_m] = \Prob[\mathsf{Enc}_K(m) = c] = p_c$ for every $m$. Distinct messages give distinct keys: if $k_m = k_{m'}$ then $\mathsf{Enc}_{k_m}(m) = \mathsf{Enc}_{k_m}(m') = c$, and correctness gives $m = \mathsf{Dec}_{k_m}(c) = m'$. So as $m$ ranges over the $\lvert\mathcal M\rvert = \lvert\mathcal K\rvert$ messages, $k_m$ ranges over all keys, and every key has the same probability $p_c$. The probabilities sum to $1$, so $p_c = 1/\lvert\mathcal K\rvert$.
:::

Shannon's theorem makes checking perfect secrecy mechanical for schemes of this shape: is the key uniform, and does every (message, ciphertext) pair correspond to exactly one key? The one-time pad passes; so does the single-letter shift cipher. A shift cipher with a non-uniform key fails condition 1 ([[#ex-nonuniform]]).

::: quiz
A variant of the one-time pad on $\ell$-bit messages chooses the key uniformly from all strings *except* $0^\ell$, so that no message is ever sent in the clear. Is it perfectly secret?

- [ ] Yes: it is a one-time pad with a slightly smaller key space, and $2^\ell - 1$ is still about $2^\ell$.
- [x] No: the ciphertext is never equal to the message, so seeing $c$ rules out $m = c$.
- [ ] Yes, because the key is still uniformly random over its key space.
- [ ] Only when $\ell \ge 128$.
::: solution
$\Prob[\mathsf{Enc}_K(m) = m] = \Prob[K = 0^\ell] = 0$, while $\Prob[\mathsf{Enc}_K(m') = m] = 1/(2^\ell - 1)$ for $m' \ne m$, so the condition of [[#lem-perfect-equiv]] fails. It also fails [[#thm-key-length]]: $\lvert\mathcal K\rvert = 2^\ell - 1 < 2^\ell = \lvert\mathcal M\rvert$. "Avoiding weak keys" here makes the scheme strictly weaker. The leak is tiny — a posterior probability of $0$ instead of $2^{-\ell}$ — but perfect secrecy allows no leak at all.
:::
:::

::: example A posterior probability under a weak scheme {#ex-posterior}
Eve believes Alice's one-letter message is `Y` (yes) with probability $0.6$ and `N` (no) with probability $0.4$. Alice encrypts with the shift cipher, but her key is generated badly: it is $k = 0$ with probability $1/2$ and uniform over $\{1, \dots, 25\}$ otherwise. Eve sees the ciphertext `Y`. What is her posterior probability that the message was `Y`?
::: solution
$\mathsf{Enc}_k(\texttt{Y}) = \texttt{Y}$ only for $k = 0$, with probability $1/2$. $\mathsf{Enc}_k(\texttt{N}) = \texttt{Y}$ needs $k = 24 - 13 = 11$, with probability $\tfrac12 \cdot \tfrac1{25} = \tfrac1{50}$. By Bayes' rule,
$$
\Prob[M = \texttt{Y} \mid C = \texttt{Y}] = \frac{0.6 \cdot \tfrac12}{0.6 \cdot \tfrac12 + 0.4\cdot\tfrac1{50}} = \frac{0.3}{0.3 + 0.008} = \frac{0.3}{0.308} \approx 0.974 .
$$
Eve's belief moves from $0.6$ to $0.974$. With a uniform key both probabilities would have been $1/26$ and the posterior would have stayed at $0.6$. The algorithm was fine; the *key distribution* failed condition 1 of [[#thm-shannon]].
:::
:::

::: history
Classical cryptanalysis is old: al-Kindī's ninth-century *Manuscript on Deciphering Cryptographic Messages* describes frequency analysis. Giovan Battista Bellaso published the "Vigenère" cipher in 1553; Friedrich Kasiski published the attack on it in 1863, though Charles Babbage seems to have found it earlier. Auguste Kerckhoffs stated his principles in *La cryptographie militaire* (1883). Gilbert Vernam built the XOR cipher for teleprinters at AT&T in 1917, and Joseph Mauborgne recognised that the key must be random and never reused. William Friedman introduced the index of coincidence in the 1920s, and the mechanical rotor machines of the Second World War, such as Enigma, fell to cryptanalysts including Marian Rejewski and Alan Turing. Reuse had consequences: in the Venona project, from 1943, US analysts exploited Soviet one-time pads whose pages had been duplicated. Claude Shannon's "Communication theory of secrecy systems" (*Bell System Technical Journal*, 1949; written as a classified report in 1945) defined perfect secrecy, proved the one-time pad perfectly secret and proved that perfect secrecy requires $\lvert\mathcal K\rvert \ge \lvert\mathcal M\rvert$ — the beginning of cryptography as a science.
:::

## Where this leads

Perfect secrecy is the right goal but too expensive: [[#thm-key-length]] forbids short keys, and practical systems encrypt gigabytes with a 128-bit key. The way out, taken in [[cryptography/computational-security]], is to weaken the adversary rather than the guarantee's form — to demand that no *efficient* adversary distinguishes encryptions with more than *negligible* advantage — and to expand a short key into a long pseudorandom pad. That chapter keeps the indistinguishability game of [[#def-perfect-indist]]. Integrity, missing entirely from the one-time pad, is the subject of [[cryptography/hash-mac]]. Information-theoretic security does survive in modern cryptography where its cost is affordable: in secret sharing ([[cryptography/protocols]]) and in one-time MACs. Quantum key distribution ([[quantum-computing]]) is an attempt to make the one-time pad's key distribution practical.

::: summary
- An encryption scheme is a triple $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ with $\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = m$ ([[#def-scheme]]). By **Kerckhoffs's principle**, only the key is secret.
- Classical ciphers (shift, substitution, Vigenère) fell to exhaustive search or to statistics — letter frequencies, the index of coincidence — that survive encryption. A large key space is necessary, not sufficient.
- **Perfect secrecy**: $\Prob[M = m \mid C = c] = \Prob[M = m]$ for every message distribution ([[#def-perfect-secrecy]]); equivalently the ciphertext distribution does not depend on the message ([[#lem-perfect-equiv]]); equivalently no adversary wins the indistinguishability game with probability other than $1/2$ ([[#thm-indist-equiv]]).
- The **one-time pad** $c = k \oplus m$ with a uniform, message-length, never-reused key is perfectly secret ([[#thm-otp]]). Reusing a key leaks $m_1 \oplus m_2$; it provides no integrity.
- Perfect secrecy requires $\lvert\mathcal K\rvert \ge \lvert\mathcal M\rvert$ ([[#thm-key-length]]), and when the spaces have equal size it holds exactly when keys are uniform and each (message, ciphertext) pair has a unique key (**Shannon's theorem**, [[#thm-shannon]]).
- These limits motivate computational security, where adversaries are efficient and keys are short.
:::

## Exercises

::: exercise Decrypting a shift cipher {level=1 check="7"}
The ciphertext `OLSSV` was produced by the shift cipher. Find the key and the plaintext. (Enter the key $k \in \{0, \dots, 25\}$.)
::: solution
Try shifts back: with $k = 7$, $O - 7 = 14 - 7 = 7 = H$, $L - 7 = 11 - 7 = 4 = E$, $S - 7 = 18 - 7 = 11 = L$, $S \to L$, $V - 7 = 21 - 7 = 14 = O$. The plaintext is `HELLO` and $k = 7$. No other key gives an English word — though for a five-letter ciphertext, two different keys giving words is possible, which is why exhaustive search needs enough ciphertext to be unambiguous.
:::
:::

::: exercise Key length for a pad {level=1 check="8192"}
How many bits of one-time-pad key does Alice need to send Bob a 1 KiB message, and how many more for a second 1 KiB message? (Enter the number of bits for one message.)
::: solution
$1\ \text{KiB} = 1024$ bytes $= 8192$ bits, and the pad must be as long as the message, so $8192$ bits. The second message needs a fresh $8192$ bits — reuse would leak the XOR of the two messages — so $16\,384$ bits in total. By [[#thm-key-length]] no perfectly secret scheme can do with less.
:::
:::

::: exercise Vigenère decryption {level=1}
Decrypt `RIJVS` with the Vigenère keyword `KEY`.
::: solution
Subtract the shifts $K = 10$, $E = 4$, $Y = 24$, $K = 10$, $E = 4$ modulo $26$: $R - K = 17 - 10 = 7 = H$; $I - E = 8 - 4 = 4 = E$; $J - Y = 9 - 24 = -15 \equiv 11 = L$; $V - K = 21 - 10 = 11 = L$; $S - E = 18 - 4 = 14 = O$. The plaintext is `HELLO`. Note that the two `L`s were encrypted to different letters, `J` and `V`, because they fell under different key letters.
:::
:::

::: exercise The two-time pad {#ex-two-time level=2}
(a) Show that the one-time pad used twice with the same key is not perfectly secret for pairs of messages: give a scheme-level statement and an adversary for the indistinguishability game that wins with probability $1$. (b) Alice sends `YES` and then `NOT` with the same three-byte key; Eve sees `075694` and `105c93`. Compute $c_1 \oplus c_2$ and check that it equals `YES` $\oplus$ `NOT`.
::: solution
(a) View the pair as one message $(m_1, m_2)$ encrypted to $(k \oplus m_1, k \oplus m_2)$. The ciphertext pair always satisfies $c_1 \oplus c_2 = m_1 \oplus m_2$. An adversary outputs $(m_1, m_2) = (0^\ell, 0^\ell)$ as its first message pair and $(0^\ell, 1^\ell)$ as its second; on receiving $(c_1, c_2)$ it outputs $b' = 0$ if $c_1 = c_2$ and $b' = 1$ otherwise. It is always right. In terms of [[#thm-key-length]]: the message space has $2^{2\ell}$ elements but there are only $2^\ell$ keys.

(b) `07 ⊕ 10 = 17`, `56 ⊕ 5c = 0a`, `94 ⊕ 93 = 07`, so $c_1 \oplus c_2 = $ `170a07`. And `YES` $=$ `59 45 53`, `NOT` $=$ `4e 4f 54`: `59 ⊕ 4e = 17`, `45 ⊕ 4f = 0a`, `53 ⊕ 54 = 07`. They agree, and the key never appeared. A Python check: `bytes(a ^ b for a, b in zip(b"YES", b"NOT")).hex()` prints `170a07`.
:::
:::

::: exercise A non-uniform key {#ex-nonuniform level=2 check="1/2"}
Let $\mathcal M = \mathcal K = \mathcal C = \Z_3$ and $\mathsf{Enc}_k(m) = (m + k) \bmod 3$. $\mathsf{Gen}$ outputs $k = 0$ with probability $1/2$ and $k = 1, 2$ with probability $1/4$ each. The message is uniform. Compute $\Prob[M = 0 \mid C = 0]$. (Enter the probability.)
::: solution
$\Prob[C = 0] = \sum_m \Prob[M = m]\Prob[K = -m \bmod 3] = \tfrac13(\tfrac12 + \tfrac14 + \tfrac14) = \tfrac13$, and $\Prob[C = 0 \mid M = 0] = \Prob[K = 0] = \tfrac12$. So $\Prob[M = 0 \mid C = 0] = \tfrac12 \cdot \tfrac13 / \tfrac13 = \tfrac12 \ne \tfrac13 = \Prob[M = 0]$. The scheme is not perfectly secret: it satisfies condition 2 of [[#thm-shannon]] (each $(m, c)$ has the unique key $c - m$) but not condition 1.
:::
:::

::: exercise Perfect secrecy and the ciphertext space {level=2}
Prove that every perfectly secret scheme satisfies $\lvert\mathcal C\rvert \ge \lvert\mathcal M\rvert$, and that this needs only correctness, not perfect secrecy.
::: solution
Fix any key $k$ that $\mathsf{Gen}$ can output, and for each $m$ fix one possible ciphertext $c_m$ of $\mathsf{Enc}_k(m)$. By correctness $\mathsf{Dec}_k(c_m) = m$, so distinct messages have distinct $c_m$ (a ciphertext decrypts to only one message under $k$). Hence $m \mapsto c_m$ is injective and $\lvert\mathcal C\rvert \ge \lvert\mathcal M\rvert$. This holds for every correct scheme, perfectly secret or not; the content of [[#thm-key-length]] is that the *key* space must also be that large.
:::
:::

::: exercise Short keys give an advantage {#ex-short-key level=3}
Let $\Pi$ be a scheme with deterministic encryption and $\lvert\mathcal K\rvert < \lvert\mathcal M\rvert$. Construct an adversary for $\mathsf{PrivK}^{\mathsf{eav}}$ (with unlimited running time) that succeeds with probability at least $1 - \lvert\mathcal K\rvert/(2\lvert\mathcal M\rvert)$. What does this give for a scheme that encrypts $256$-bit messages with $128$-bit keys?
::: solution
The adversary fixes any message $m_0$, chooses $m_1$ uniformly from $\mathcal M$, and outputs $(m_0, m_1)$. On receiving $c$ it computes $\mathcal M(c) = \set{\mathsf{Dec}_k(c) : k \in \mathcal K}$ by trying every key, and outputs $b' = 0$ if $m_0 \in \mathcal M(c)$, and $b' = 1$ otherwise.

If $b = 0$, then $c = \mathsf{Enc}_k(m_0)$ and correctness gives $m_0 = \mathsf{Dec}_k(c) \in \mathcal M(c)$: the adversary is always right. If $b = 1$, it is wrong only when $m_0 \in \mathcal M(c)$, that is, when $c$ lies in the set $S = \set{\mathsf{Enc}_{k'}(m_0) : k' \in \mathcal K}$ of at most $\lvert\mathcal K\rvert$ ciphertexts. (If $m_0 = \mathsf{Dec}_{k'}(c)$, then $c = \mathsf{Enc}_{k'}(m_0)$, because $\mathsf{Enc}_{k'}$ is deterministic and injective by correctness.) For the actual key $k$, $\mathsf{Enc}_k$ is injective, so at most $\lvert S\rvert \le \lvert\mathcal K\rvert$ messages $m_1$ satisfy $\mathsf{Enc}_k(m_1) \in S$; with $m_1$ uniform this happens with probability at most $\lvert\mathcal K\rvert/\lvert\mathcal M\rvert$. Hence
$$
\Prob[b' = b] \ge \tfrac12\cdot 1 + \tfrac12\left(1 - \frac{\lvert\mathcal K\rvert}{\lvert\mathcal M\rvert}\right) = 1 - \frac{\lvert\mathcal K\rvert}{2\lvert\mathcal M\rvert}.
$$
For $256$-bit messages and $128$-bit keys, $\lvert\mathcal K\rvert/\lvert\mathcal M\rvert = 2^{-128}$, and the adversary wins with probability at least $1 - 2^{-129}$ — but it needs to try $2^{128}$ keys. This is exactly the gap that computational security exploits: the adversary exists, but no one can run it.
:::
:::

::: exercise A balanced key {level=3}
Let $\ell \ge 2$ be even, and modify the one-time pad on $\{0, 1\}^\ell$ so that $\mathsf{Gen}$ chooses $k$ uniformly among the $\ell$-bit strings of Hamming weight exactly $\ell/2$ (equally many zeros and ones), perhaps to "avoid weak keys". Is the scheme perfectly secret? Prove your answer, and give an adversary for the indistinguishability game.
::: solution
No. There are only $\binom{\ell}{\ell/2} < 2^\ell$ such keys (the strings $0^\ell$ and $1^\ell$, for instance, are excluded), so [[#thm-key-length]] already rules out perfect secrecy. An explicit adversary: output $m_0 = 0^\ell$ and $m_1 = 1\,0^{\ell - 1}$. If $b = 0$, then $c = k$ has weight exactly $\ell/2$. If $b = 1$, then $c = k \oplus 1\,0^{\ell-1}$ is $k$ with its first bit flipped, of weight $\ell/2 + 1$ or $\ell/2 - 1$. So the adversary that outputs $b' = 0$ exactly when $c$ has weight $\ell/2$ wins with probability $1$. Any departure from the uniform distribution over all $2^\ell$ keys leaks something; here it leaks a lot.
:::
:::

::: exercise Implement and test {level=2}
Write a Python function `otp(key: bytes, data: bytes) -> bytes` for the one-time pad, which raises an error if the lengths differ, and check by exhaustive enumeration over all $2^8$ one-byte keys that for the messages `b"A"` and `b"B"` every ciphertext byte occurs exactly once. Why is this a check of [[#lem-perfect-equiv]]? (As with everything in this chapter, this is a teaching toy: real code should use an authenticated-encryption API from a vetted library.)
::: solution
```python
from collections import Counter

def otp(key: bytes, data: bytes) -> bytes:
    """Toy one-time pad: never reuse a key; use a vetted library in real code."""
    if len(key) != len(data):
        raise ValueError("key and message must have the same length")
    return bytes(k ^ d for k, d in zip(key, data))

for m in (b"A", b"B"):
    counts = Counter(otp(bytes([k]), m) for k in range(256))
    print(m, len(counts), set(counts.values()))
```

```console
$ python3 otp_check.py
b'A' 256 {1}
b'B' 256 {1}
```

Each message reaches all $256$ ciphertexts, each from exactly one key. With a uniform key, $\Prob[\mathsf{Enc}_K(m) = c] = 1/256$ for both messages and every $c$ — the condition of [[#lem-perfect-equiv]] — and it is also condition 2 of [[#thm-shannon]].
:::
:::
