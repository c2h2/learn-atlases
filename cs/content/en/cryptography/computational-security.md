The one-time pad is perfectly secure, and [[cryptography/perfect-secrecy#thm-key-length]] proved that its enormous keys are unavoidable: no perfectly secret scheme can encrypt more message bits than it has key bits. Yet every day your browser encrypts gigabytes under a single 128-bit key. Either those connections are insecure, or "secure" means something other than perfect secrecy.

It means something weaker but entirely adequate. The proof of the key-length theorem used an adversary that tries every key — $2^{128}$ trial decryptions for a 128-bit key. At $10^{18}$ trials a second, far beyond any computer existing as of 2026, that takes about $1.1 \times 10^{13}$ years, some eight hundred times the age of the universe. A guarantee that holds against every adversary who can actually be built is all anyone needs. **Computational security** makes this precise in two relaxations: the adversary runs in **feasible** time, and it may succeed with a **negligible** probability beyond guessing. In exchange, keys can be short, and a short random key can be stretched into a long **pseudorandom** one. This chapter defines negligible functions and computational security, introduces **pseudorandom generators** (PRGs), **pseudorandom functions** (PRFs) and **pseudorandom permutations** (PRPs), and develops the main proof technique of modern cryptography: the **reduction**, which shows that breaking a scheme would break an assumption we believe. Randomised algorithms and probability bounds are as in [[algorithms/randomised-algorithms]].

## Efficient adversaries and negligible success

There are two ways to state a computational guarantee. The **concrete** approach names numbers: a scheme is **$(t, \varepsilon)$-secure** if every adversary running for at most $t$ steps succeeds with probability at most $\varepsilon$ beyond trivial guessing. Exhaustive search for a uniform 128-bit key, running for $t$ trial decryptions, finds the key with probability $t/2^{128}$, so no scheme with 128-bit keys can be better than $(t, t/2^{128})$-secure; a good one comes close. Concrete statements are what practitioners need, but they are tied to a machine model and a particular key length.

The **asymptotic** approach, which we use for definitions and proofs, introduces a **security parameter** $n \in \N$ — think of it as the key length — given to every algorithm in unary as $1^n$ so that "polynomial in the input length" means "polynomial in $n$". Honest parties and adversaries alike are **probabilistic polynomial-time** (PPT) algorithms: randomised algorithms whose running time is bounded by a polynomial in $n$. And an adversary's advantage must vanish faster than any inverse polynomial.

::: definition Negligible function {#def-negligible}
A function $\varepsilon\colon \N \to \R_{\ge 0}$ is **negligible** if for every polynomial $p$ there is an $N$ such that $\varepsilon(n) < 1/p(n)$ for all $n > N$. Equivalently, for every constant $c > 0$, $\varepsilon(n) < n^{-c}$ for all sufficiently large $n$. We write $\mathsf{negl}(n)$ for an unspecified negligible function.
:::

$2^{-n}$, $2^{-\sqrt n}$ and $n^{-\log n}$ are negligible; $n^{-10}$ and $1/n^{1000}$ are not. The definition is chosen so that polynomially many tries cannot turn a negligible success probability into a noticeable one.

::: proposition Closure properties {#prop-negl-closure}
If $\varepsilon_1$ and $\varepsilon_2$ are negligible and $p$ is a polynomial with $p(n) \ge 0$, then $\varepsilon_1 + \varepsilon_2$ and $p \cdot \varepsilon_1$ are negligible.
:::

::: proof
Let $q$ be any polynomial; we may assume $q(n) \ge 1$ for large $n$ (replacing $q$ by $q^2 + 1$ only makes the claim stronger). For the sum: since $2q$ is a polynomial, $\varepsilon_1(n) < 1/(2q(n))$ and $\varepsilon_2(n) < 1/(2q(n))$ for all large $n$, so $\varepsilon_1(n) + \varepsilon_2(n) < 1/q(n)$. For the product: $p \cdot q$ is bounded by a polynomial $r$ with $r(n) \ge 1$ (take $r = p\cdot q + 1$), and $\varepsilon_1(n) < 1/r(n) \le 1/(p(n)q(n))$ for large $n$ wherever $p(n) > 0$; so $p(n)\varepsilon_1(n) < 1/q(n)$ (and it is $0$ where $p(n) = 0$).
:::

The second property is the important one. If one attempt succeeds with negligible probability $\varepsilon$, then by the union bound $p(n)$ attempts succeed with probability at most $p(n)\varepsilon(n)$, still negligible. A polynomial-time adversary cannot amplify a negligible chance into a real one — while a non-negligible advantage, such as $1/n^{10}$, *can* be amplified by repetition, which is why it counts as a break.

::: widget plot
f: -c*log(x)/log(2); -sqrt(x)
x: 1, 3000
y: -60, 0
sliders: c=1:1:8
labels: \log_2 n^{-c}; \log_2 2^{-\sqrt{n}}
caption: The base-2 logarithms of an inverse polynomial $n^{-c}$ and of the negligible function $2^{-\sqrt n}$. For small $n$ the polynomial is smaller, but for every $c$ the curve $-\sqrt n$ eventually drops below $-c\log_2 n$ and stays there. Increase $c$ and watch the crossing move right — but it always exists. That "eventually, for every $c$" is exactly [[#def-negligible]].
:::

### Indistinguishable encryptions

We now keep the game of [[cryptography/perfect-secrecy#def-perfect-indist]] and relax its conclusion. Two changes are needed besides restricting to PPT adversaries. The messages must have **equal length**, because an encryption scheme that handles arbitrary lengths cannot hide the length (and a ciphertext as long as the message is the norm). And success need only be close to $1/2$.

::: definition EAV-security {#def-eav}
A private-key encryption scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$, where $\mathsf{Gen}(1^n)$ outputs a key, has **indistinguishable encryptions in the presence of an eavesdropper** (is **EAV-secure**) if for every PPT adversary $\mathcal A$ there is a negligible function $\mathsf{negl}$ such that
$$
\Prob\big[\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal A, \Pi}(n) = 1\big] \le \tfrac12 + \mathsf{negl}(n),
$$
where in the experiment $\mathcal A(1^n)$ outputs messages $m_0, m_1$ with $\lvert m_0\rvert = \lvert m_1\rvert$, receives $c \gets \mathsf{Enc}_k(m_b)$ for $k \gets \mathsf{Gen}(1^n)$ and uniform $b$, and succeeds if it outputs $b' = b$.
:::

Goldwasser and Micali (1984) also defined **semantic security**: whatever a PPT adversary can compute about the plaintext from the ciphertext, it could compute without the ciphertext. They proved it equivalent to indistinguishability, which is far easier to work with, so we use indistinguishability as the definition.

## Pseudorandom generators

The one-time pad needs a long uniform key. What if we use a short uniform seed and a deterministic algorithm that stretches it into a long string that *looks* uniform to every efficient observer?

::: definition Pseudorandom generator {#def-prg}
Let $\ell$ be a polynomial with $\ell(n) > n$. A deterministic polynomial-time algorithm $G$ that maps $s \in \{0, 1\}^n$ to $G(s) \in \{0, 1\}^{\ell(n)}$ is a **pseudorandom generator** with **expansion factor** $\ell$ if for every PPT algorithm $D$ (a **distinguisher**) there is a negligible function such that
$$
\Big\lvert \Prob_{s \gets \{0,1\}^n}\big[D(G(s)) = 1\big] - \Prob_{r \gets \{0,1\}^{\ell(n)}}\big[D(r) = 1\big]\Big\rvert \le \mathsf{negl}(n).
$$
The left-hand side is the **advantage** of $D$.
:::

A PRG's output is very far from uniform in the information-theoretic sense: it takes at most $2^n$ values among $2^{\ell(n)}$, so an unbounded distinguisher that checks "is $r$ in the image of $G$?" has advantage at least $1 - 2^{n - \ell(n)} \ge 1/2$. Pseudorandomness is a statement about what *efficient* tests can see.

::: example A generator that is not pseudorandom {#ex-not-prg}
Let $G(s) = s \,\|\, (s_1 \oplus s_2 \oplus \dots \oplus s_n)$: the seed followed by its parity bit, so $\ell(n) = n + 1$. Find a distinguisher and compute its advantage.
::: solution
Let $D(y)$ output $1$ if the last bit of $y$ equals the XOR of its first $n$ bits, and $0$ otherwise. On $y = G(s)$ this always holds: $\Prob[D(G(s)) = 1] = 1$. On a uniform $r \in \{0, 1\}^{n+1}$ the last bit is uniform and independent of the others, so it matches the parity with probability exactly $\tfrac12$. The advantage is $\lvert 1 - \tfrac12\rvert = \tfrac12$, not negligible. Any output bit that is a *linear* function of the others is caught this way; more generally a PRG must survive every efficient statistical test, not just the ones its designer thought of.
:::
:::

Do PRGs exist? Nobody knows how to prove it: a PRG with $\ell(n) > n$ would imply $\mathsf P \ne \mathsf{NP}$ (deciding whether a string lies in the image of $G$ is in $\mathsf{NP}$, and an efficient decision procedure would be a distinguisher). What is known is that PRGs exist **if and only if one-way functions exist** — functions easy to compute and hard to invert on random inputs (Håstad, Impagliazzo, Levin and Luby, 1999). In practice we use **stream ciphers** such as ChaCha20 (Bernstein 2008, standardised in RFC 8439) or AES in counter mode ([[cryptography/block-ciphers]]), conjectured to be pseudorandom because decades of public analysis have found no efficient distinguisher. All the theorems below are therefore *conditional*: if the primitive is secure, then so is the construction.

### Encrypting with a pseudorandom pad

::: definition Pseudo-one-time pad {#def-pseudo-otp}
Let $G$ be a PRG with expansion factor $\ell$. For messages $m \in \{0, 1\}^{\ell(n)}$: $\mathsf{Gen}(1^n)$ outputs a uniform $k \in \{0, 1\}^n$; $\mathsf{Enc}_k(m) = G(k) \oplus m$; $\mathsf{Dec}_k(c) = G(k) \oplus c$.
:::

::: theorem The pseudo-one-time pad is EAV-secure {#thm-pseudo-otp}
If $G$ is a pseudorandom generator, the scheme of [[#def-pseudo-otp]] is EAV-secure.
:::

::: proof
This is a **reduction**: from any adversary $\mathcal A$ against the scheme we build a distinguisher $D$ against $G$, and show that $\mathcal A$'s success translates into $D$'s advantage. $D$ is given a string $w \in \{0, 1\}^{\ell(n)}$ and does the following:

1. Run $\mathcal A(1^n)$ to obtain $m_0, m_1 \in \{0, 1\}^{\ell(n)}$.
2. Choose a uniform bit $b$ and give $\mathcal A$ the ciphertext $c = w \oplus m_b$.
3. When $\mathcal A$ outputs $b'$, output $1$ if $b' = b$ and $0$ otherwise.

$D$ runs in polynomial time because $\mathcal A$ does. Consider its two possible inputs.

- If $w = G(k)$ for uniform $k$, then $c$ is distributed exactly as in $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal A, \Pi}(n)$, so $\Prob[D(G(k)) = 1] = \Prob[\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal A, \Pi}(n) = 1]$.
- If $w$ is uniform, then $\mathcal A$ is playing against the one-time pad, which is perfectly secret ([[cryptography/perfect-secrecy#thm-otp]]); by [[cryptography/perfect-secrecy#thm-indist-equiv]] it succeeds with probability exactly $\tfrac12$. So $\Prob[D(w) = 1] = \tfrac12$.

Therefore
$$
\Prob\big[\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal A, \Pi}(n) = 1\big] - \tfrac12 = \Prob[D(G(k)) = 1] - \Prob[D(w) = 1] \le \mathsf{negl}(n),
$$
because $G$ is a PRG and $D$ is PPT.
:::

::: example A weak generator breaks the pad {#ex-weak-pad}
Suppose a careless generator $G$ has a stuck output bit: the last bit of $G(s)$ is $0$ for every seed, while the other bits are fine. Show directly that the pseudo-one-time pad built from $G$ is not EAV-secure, and compute the adversary's success probability. Then compute the success of the adversary when the last bit of $G(s)$ is instead $0$ with probability $0.6$ over the seed.
::: solution
Let $\mathcal A$ output $m_0 = 0^{\ell}$ and $m_1 = 0^{\ell - 1}1$, which differ only in the last bit, and output $b'$ equal to the last bit of $c$. Since the last bit of $c = G(k) \oplus m_b$ is $0 \oplus b = b$, $\mathcal A$ is always right: success probability $1$.

If the last bit of $G(k)$ is $0$ with probability $0.6$, the last bit of $c$ equals $b$ with probability $0.6$, so the same adversary succeeds with probability $0.6 = \tfrac12 + 0.1$. In the reduction of [[#thm-pseudo-otp]] the corresponding distinguisher $D$ has advantage exactly $0.1$: it outputs $1$ with probability $0.6$ on $G(k)$ and $\tfrac12$ on uniform strings. A bias of $0.1$ in one bit is a constant — not negligible — so the scheme is broken. The example also shows the reduction is *tight*: the adversary's advantage over $\tfrac12$ equals the distinguisher's advantage.
:::
:::

Read the proof contrapositively: an adversary that beats the scheme would give an efficient test that tells $G$'s output from random. As long as we believe no such test exists, the scheme is secure. Every security proof in this course has this shape.

::: warning What "provably secure" means
A proof such as [[#thm-pseudo-otp]] does not show that a scheme is unbreakable. It shows that breaking the scheme is *at least as hard as* breaking an assumption (here: that $G$ is a PRG), *in the attack model of the definition* (here: one eavesdropped ciphertext). The scheme can still fail if the assumption is false, if the attacker can do more than the model allows (see the multiple-message attack below), or if the implementation leaks — through timing, power, error messages, or a badly seeded random number generator — something the model never mentions. Asymptotic statements also hide constants: "negligible" says nothing about whether $n = 128$ is large enough. Proofs are invaluable because they turn vague worries into precise assumptions, but in real systems the remaining gaps are why you should use vetted libraries and standard constructions, never schemes you have designed or implemented yourself.
:::

### Many messages

The pseudo-one-time pad is deterministic: encrypting the same message twice under the same key gives the same ciphertext, and two different messages give ciphertexts whose XOR is $m_1 \oplus m_2$, just like the two-time pad. A natural strengthening of the definition lets the adversary see encryptions of a *list* of messages; then no deterministic scheme is secure, because the adversary can submit lists $(m, m)$ and $(m, m')$ and check whether the two ciphertexts are equal. Secure encryption of many messages under one key needs **randomised** (or stateful) encryption, and a tool that produces fresh pseudorandom pads on demand. That tool is a pseudorandom function.

::: quiz
Which of the following functions of $n$ are negligible? (Select all that apply.)

- [x] $2^{-n/2}$
- [ ] $n^{-100}$
- [x] $n^{-\log_2 n}$
- [ ] $1/(n^3 + 5n)$
::: solution
$2^{-n/2}$ is negligible: $n^c 2^{-n/2} \to 0$ for every $c$. $n^{-\log_2 n} = 2^{-(\log_2 n)^2}$ is negligible because $(\log_2 n)^2$ eventually exceeds $c\log_2 n$ for every constant $c$. $n^{-100}$ and $1/(n^3 + 5n)$ are inverse polynomials and therefore not negligible: an adversary with such an advantage can amplify it by repetition.
:::
:::

## Hybrid arguments

Proofs often compare a real distribution with an ideal one through a chain of intermediate **hybrid** distributions, each close to the next. The following example shows the technique, and also how to stretch a PRG further.

::: theorem Doubling the stretch {#thm-prg-double}
Let $G\colon \{0, 1\}^n \to \{0, 1\}^{2n}$ be a PRG. Write $G(s) = G_0(s) \,\|\, G_1(s)$ with halves of $n$ bits. Then
$$
G'(s) = G\big(G_0(s)\big) \,\|\, G\big(G_1(s)\big) \in \{0, 1\}^{4n}
$$
is a PRG.
:::

::: proof
Let $D$ be a PPT distinguisher for $G'$. Define four distributions on $4n$-bit strings, for uniform and independent $s \in \{0,1\}^n$, $r_0, r_1 \in \{0, 1\}^n$ and $u_0, u_1 \in \{0, 1\}^{2n}$:
$$
H_0 = G(G_0(s)) \,\|\, G(G_1(s)), \quad H_1 = G(r_0) \,\|\, G(r_1), \quad H_2 = G(r_0) \,\|\, u_1, \quad H_3 = u_0 \,\|\, u_1 .
$$
$H_0$ is the output of $G'$ and $H_3$ is uniform. Write $p_i = \Prob[D(H_i) = 1]$. By the triangle inequality the advantage of $D$ is
$$
\lvert p_0 - p_3\rvert \le \lvert p_0 - p_1\rvert + \lvert p_1 - p_2\rvert + \lvert p_2 - p_3\rvert ,
$$
and each term is the advantage of a PPT distinguisher for $G$:

- $D_1(y)$, given $y \in \{0, 1\}^{2n}$, splits $y = y_0 \| y_1$ and outputs $D(G(y_0) \| G(y_1))$. If $y = G(s)$ this is $D(H_0)$; if $y$ is uniform, $y_0, y_1$ are uniform and independent and this is $D(H_1)$. So $\lvert p_0 - p_1\rvert$ is the advantage of $D_1$.
- $D_2(y)$ picks its own uniform $r_0$ and outputs $D(G(r_0) \| y)$: on $y = G(r_1)$ it sees $H_1$, on uniform $y$ it sees $H_2$.
- $D_3(y)$ picks its own uniform $u_1$ and outputs $D(y \| u_1)$: on $y = G(r_0)$ it sees $H_2$, on uniform $y$ it sees $H_3$.

Each advantage is negligible because $G$ is a PRG, and a sum of three negligible functions is negligible ([[#prop-negl-closure]]).
:::

Repeating the construction $d$ times builds a binary tree of depth $d$ whose $2^d$ leaves are pseudorandom. The hybrid argument still works for polynomially many hybrids, and the advantage grows at most by that polynomial factor — still negligible. Goldreich, Goldwasser and Micali (1986) went one step further: they used the path from the root to leaf $x$ to *define* a function $F_s(x)$ with exponentially many outputs, any of which can be computed in time polynomial in $n$ by walking down $n$ levels. That is a pseudorandom function.

## Pseudorandom functions and permutations

A **keyed function** is an efficiently computable $F\colon \{0, 1\}^n \times \{0, 1\}^n \to \{0, 1\}^n$; we write $F_k(x) = F(k, x)$, and the key $k$ is chosen uniformly. Let $\mathsf{Func}_n$ be the set of *all* functions from $\{0,1\}^n$ to $\{0,1\}^n$. Describing one takes a table of $2^n$ entries of $n$ bits each, so $\lvert\mathsf{Func}_n\rvert = 2^{n2^n}$ — for $n = 128$, a description of $128 \cdot 2^{128}$ bits, against a 128-bit key. A PRF is a keyed function that no efficient algorithm can tell apart from a uniformly random element of this enormous set, even when it may query the function at inputs of its choice.

::: definition Pseudorandom function {#def-prf}
An efficient keyed function $F$ is a **pseudorandom function** if for every PPT distinguisher $D$ with oracle access there is a negligible function such that
$$
\Big\lvert \Prob_{k \gets \{0,1\}^n}\big[D^{F_k(\cdot)}(1^n) = 1\big] - \Prob_{f \gets \mathsf{Func}_n}\big[D^{f(\cdot)}(1^n) = 1\big]\Big\rvert \le \mathsf{negl}(n).
$$
Here $D^{O}$ means that $D$ may submit any inputs $x$ to the **oracle** $O$ and receive $O(x)$, adaptively; it never sees $k$.
:::

The distinguisher cannot be given $f$ itself — it is far too long — which is why the definition uses oracle access. A random function can be simulated by **lazy sampling**: answer each new query $x$ with a fresh uniform $n$-bit value and remember it; answer a repeated query consistently.

::: example A keyed function that is not pseudorandom {#ex-not-prf}
Show that $F_k(x) = k \oplus x$ is not a PRF, by giving a distinguisher and computing its advantage.
::: solution
$D$ queries $y_0 = O(0^n)$ and $y_1 = O(1^n)$ and outputs $1$ if $y_0 \oplus y_1 = 1^n$. If $O = F_k$, then $y_0 \oplus y_1 = (k \oplus 0^n) \oplus (k \oplus 1^n) = 1^n$ always, so $D$ outputs $1$ with probability $1$. If $O = f$ is random, $y_0$ and $y_1$ are independent and uniform, so $y_0 \oplus y_1$ is uniform and equals $1^n$ with probability $2^{-n}$. The advantage is $1 - 2^{-n}$. A single output $F_k(x)$ *is* uniform — the function fails because its outputs are related to each other. Pseudorandomness is about the joint behaviour on many inputs.
:::
:::

PRFs are the workhorse of symmetric cryptography. A PRF immediately gives a PRG — the reverse direction of the GGM construction.

::: proposition A PRF gives a PRG {#prop-prf-prg}
Let $F$ be a PRF and $t = t(n)$ a polynomial with $t \ge 2$, and write $\langle i\rangle$ for the $n$-bit binary representation of $i$. Then $G(s) = F_s(\langle 1\rangle) \,\|\, F_s(\langle 2\rangle) \,\|\, \dots \,\|\, F_s(\langle t\rangle)$ is a PRG with expansion factor $tn$.
:::

::: proof
Let $D$ be a distinguisher for $G$. Build $D'$ with an oracle $O$: query $O(\langle 1\rangle), \dots, O(\langle t\rangle)$, concatenate the answers into $y$, and output $D(y)$. If $O = F_s$ for uniform $s$, then $y = G(s)$. If $O = f$ is uniform in $\mathsf{Func}_n$, then its values at the $t$ distinct inputs are independent and uniform, so $y$ is a uniform $tn$-bit string. Hence the advantage of $D$ equals that of $D'$, which is negligible since $F$ is a PRF and $D'$ is PPT.
:::

This is the idea behind **counter mode** in [[cryptography/block-ciphers]]: evaluating a PRF at successive counters yields as long a pseudorandom pad as we like, and a random starting point makes each encryption use a fresh pad.

### Permutations

A block cipher such as AES is a keyed function that is also a **permutation** for every key: $F_k$ is a bijection on $\{0, 1\}^n$ and $F_k^{-1}$ is efficiently computable from $k$, which is what makes decryption possible. Let $\mathsf{Perm}_n$ be the set of all permutations of $\{0, 1\}^n$; it has $(2^n)!$ elements.

::: definition Pseudorandom permutation {#def-prp}
An efficient keyed permutation $F$ (with efficient inverse) is a **pseudorandom permutation** if no PPT distinguisher with oracle access to $F_k$ can tell it from a uniform $\pi \in \mathsf{Perm}_n$ with non-negligible advantage. It is a **strong** pseudorandom permutation if this holds even when the distinguisher has oracle access to both $F_k$ and $F_k^{-1}$ (respectively $\pi$ and $\pi^{-1}$).
:::

Is a random permutation distinguishable from a random function? A permutation never maps two inputs to the same output; a random function sometimes does. But collisions in a random function are rare until about $2^{n/2}$ queries — the birthday bound, computed exactly in [[cryptography/hash-mac]].

::: lemma PRP/PRF switching lemma {#lem-switching}
For any distinguisher $D$ making at most $q$ oracle queries,
$$
\Big\lvert \Prob_{f \gets \mathsf{Func}_n}\big[D^{f} = 1\big] - \Prob_{\pi \gets \mathsf{Perm}_n}\big[D^{\pi} = 1\big]\Big\rvert \le \frac{q(q - 1)}{2^{n+1}} .
$$
Consequently a PRP is also a PRF (for $q$ polynomial the bound is negligible).
:::

::: proof
We may assume $D$ never repeats a query (it can remember answers). Run both oracles by lazy sampling, driven by the same sequence of uniform $n$-bit values $y_1, y_2, \dots, y_q$:

- *Function game:* the answer to the $i$-th query is $y_i$.
- *Permutation game:* the answer to the $i$-th query is $y_i$ if $y_i$ differs from all earlier answers; otherwise it is a fresh value chosen uniformly from those not yet used.

The permutation game answers with distinct values, each uniform over the unused ones, which is exactly the distribution of $\pi$ on $q$ distinct points; the function game is exactly $f$. Let $\mathsf{Bad}$ be the event that $y_i = y_j$ for some $j < i$. Until $\mathsf{Bad}$ happens the two games give identical answers, so $D$ behaves identically, and $\mathsf{Bad}$ depends only on the $y$'s, so it has the same probability in both games. Hence the two probabilities that $D$ outputs $1$ differ by at most $\Prob[\mathsf{Bad}]$. By the union bound over pairs,
$$
\Prob[\mathsf{Bad}] \le \sum_{i=1}^{q}\frac{i - 1}{2^n} = \frac{q(q - 1)}{2 \cdot 2^n} .
$$
For the consequence: a distinguisher's advantage against $F_k$ versus $f$ is at most its advantage against $F_k$ versus $\pi$ (negligible) plus $q(q - 1)/2^{n+1}$ (negligible for polynomial $q$), by the triangle inequality.
:::

::: widget plot
f: 2^(2*x - n - 1)
x: 0, 80
y: 0, 1
sliders: n=32:16:128
labels: q^2/2^{n+1}
caption: The switching bound $q^2/2^{n+1}$ (here plotted against $\log_2 q$) for block length $n$. With $n = 64$ the bound reaches $1/2$ at $q = 2^{32}$ queries — $2^{32}$ blocks of $8$ bytes are only $32$ GiB of data, which is why 64-bit block ciphers are retired. Slide $n$ to $128$: the bound stays tiny until $q \approx 2^{64}$. The rule of thumb is to change keys well before $2^{n/2}$ blocks.
:::

::: example How much data per key? {#ex-data-per-key}
A protocol wants the switching bound of [[#lem-switching]] to stay below $2^{-32}$. How many blocks may it encrypt under one key with (a) a 64-bit block cipher, (b) AES with 128-bit blocks? Express the answers in bytes.
::: solution
We need $q^2/2^{n+1} \le 2^{-32}$, roughly $q \le 2^{(n - 31)/2}$. (a) $n = 64$: $q \le 2^{16.5} \approx 92\,682$ blocks of $8$ bytes, about $724$ KiB. (b) $n = 128$: $q \le 2^{48.5} \approx 4.0 \times 10^{14}$ blocks of $16$ bytes, about $6.4 \times 10^{15}$ bytes, or $5.7$ PiB. Real protocols set limits of this kind; for instance TLS 1.3 (RFC 8446, §5.5) caps the amount of data protected under one AES-GCM key and requires a key update before it is reached. The numbers explain why the move from 64-bit to 128-bit blocks mattered so much.
:::
:::

::: quiz
A distinguisher receives oracle access to either a uniformly random function or a uniformly random permutation on $\{0, 1\}^{64}$ and makes $2^{20}$ queries. Which is closest to the best possible advantage?

- [ ] $1/2$
- [x] about $2^{-25}$
- [ ] about $2^{-44}$
- [ ] exactly $0$, since both answer uniformly
::: solution
The lemma gives $q(q-1)/2^{n+1} \approx 2^{40}/2^{65} = 2^{-25}$, and the bound is essentially tight: the distinguisher that outputs "function" when it sees a collision achieves an advantage close to the collision probability, $1 - e^{-q(q-1)/2^{65}} \approx 2^{-25}$. Each single answer is uniform in both cases, but only the function ever repeats an output.
:::
:::

## In practice

Real primitives are not proved pseudorandom; they are conjectured to be, on the strength of public cryptanalysis. As of 2026, AES (a strong PRP with $n = 128$ and 128-, 192- or 256-bit keys) and ChaCha20 (a stream cipher, effectively a PRF from a 256-bit key and a counter to 512-bit blocks) are the standard choices; the older RC4 stream cipher was found to have biased output and was prohibited in TLS by RFC 7465 (2015). Key lengths of 128 bits are the usual minimum for symmetric keys, and 256 bits are used where a margin against quantum search is wanted ([[cryptography/post-quantum]]). The proofs in this chapter tell us *how to use* such primitives safely; whether AES itself is a PRP is a matter of evidence, not proof.

::: history
Shannon's 1949 paper already asked what an adversary with limited computation could do, but the modern framework came from complexity theory. Andrew Yao (1982) defined pseudorandomness by indistinguishability against efficient tests. Shafi Goldwasser and Silvio Micali's "Probabilistic encryption" (*Journal of Computer and System Sciences*, 1984; conference version 1982) introduced semantic security, indistinguishability and randomised encryption, and later earned them the 2012 Turing Award. Manuel Blum and Micali (1984) built the first PRG from a number-theoretic hardness assumption. Oded Goldreich, Goldwasser and Micali defined pseudorandom functions and built them from any PRG (*Journal of the ACM*, 1986). Michael Luby and Charles Rackoff (1988) defined pseudorandom permutations and showed how to build them from PRFs with the Feistel network ([[cryptography/block-ciphers]]). Johan Håstad, Russell Impagliazzo, Leonid Levin and Michael Luby (*SIAM Journal on Computing*, 1999) proved that a PRG exists if any one-way function does. The concrete-security viewpoint was developed by Mihir Bellare, Phillip Rogaway and others in the 1990s.
:::

## Where this leads

[[cryptography/block-ciphers]] models AES as a strong PRP, defines security against **chosen-plaintext attacks** (where the adversary also gets an encryption oracle) and builds CPA-secure encryption from a PRF by randomised counter mode. [[cryptography/hash-mac]] uses PRFs to build message authentication codes and works out the birthday bound behind [[#lem-switching]]. Public-key encryption in [[cryptography/public-key]] rests on the same reduction technique, but with number-theoretic assumptions in place of pseudorandomness. The complexity-theoretic side — one-way functions, hardness amplification, and why proving any of these primitives exist would separate $\mathsf P$ from $\mathsf{NP}$ — is in [[complexity]].

::: summary
- **Computational security** restricts adversaries to probabilistic polynomial time and allows a **negligible** advantage — one smaller than every inverse polynomial ([[#def-negligible]]). Negligible functions are closed under sums and polynomial multiples ([[#prop-negl-closure]]), so repetition cannot amplify them.
- **EAV-security** is the indistinguishability game with equal-length messages and success at most $\tfrac12 + \mathsf{negl}(n)$ ([[#def-eav]]); it is equivalent to semantic security.
- A **PRG** stretches a short seed into output no efficient test can tell from uniform ([[#def-prg]]); XORing its output with the message is EAV-secure, by a **reduction** to the PRG ([[#thm-pseudo-otp]]). Such proofs are conditional on the assumption and the model.
- **Hybrid arguments** chain distributions; they show, for example, that PRG stretch can be increased ([[#thm-prg-double]]).
- A **PRF** is indistinguishable from a random function under adaptive queries ([[#def-prf]]); it yields a PRG by evaluating at counters ([[#prop-prf-prg]]). A **PRP** (strong PRP with inverse queries) models a block cipher ([[#def-prp]]), and a PRP is a PRF up to $q(q-1)/2^{n+1}$ ([[#lem-switching]]).
- Deterministic encryption cannot be secure for many messages; secure multi-message encryption needs randomness — the subject of the next chapter.
:::

## Exercises

::: exercise Recognising negligible functions {level=1}
For each function decide whether it is negligible, with a one-line reason: (a) $2^{-\log_2 n}$; (b) $n^{-\log_2\log_2 n}$; (c) $10^{-6}$ (constant); (d) $2^{-n}\cdot n^{50}$.
::: solution
(a) $2^{-\log_2 n} = 1/n$, an inverse polynomial: not negligible. (b) $n^{-\log_2\log_2 n}$: for every $c$, $\log_2\log_2 n > c$ for large $n$, so it is below $n^{-c}$ eventually: negligible (though it decays very slowly). (c) A non-zero constant is never below $1/n$ for large $n$: not negligible — a fixed one-in-a-million chance is a break in the asymptotic sense. (d) $n^{50}2^{-n}$ is a polynomial times a negligible function, negligible by [[#prop-negl-closure]].
:::
:::

::: exercise Exhaustive search in concrete terms {level=1 check="14"}
An attacker can test $10^{18}$ keys per second. How long, in days, does exhaustive search over all $2^{80}$ keys take? (Enter the number of days, rounded to the nearest whole day.)
::: solution
$2^{80} \approx 1.209 \times 10^{24}$, so the search takes $1.209 \times 10^{6}$ seconds, about $13.99$ days, so $14$ days. For a 128-bit key the same attacker needs $2^{128}/10^{18}$ seconds $\approx 1.08 \times 10^{13}$ years. Each extra key bit doubles the work; 80-bit keys are no longer considered adequate.
:::
:::

::: exercise Advantage of a parity test {level=1 check="1/2"}
Let $G(s) = s \,\|\, s_1$ (the seed followed by a copy of its first bit). Give a distinguisher and compute its advantage. (Enter the advantage.)
::: solution
$D(y)$ outputs $1$ if the last bit of $y$ equals the first. On $G(s)$ this always holds; on uniform $y \in \{0,1\}^{n+1}$ it holds with probability $\tfrac12$. The advantage is $\tfrac12$.
:::
:::

::: exercise Repetition is not stretch {level=2}
Let $G\colon \{0, 1\}^n \to \{0, 1\}^{2n}$ be a PRG. (a) Prove that $G'(s) = G(s) \,\|\, G(s)$ is not a PRG. (b) Prove that $G''(s)$, the first $2n - 1$ bits of $G(s)$, is a PRG.
::: solution
(a) The distinguisher that outputs $1$ when the two halves of its $4n$-bit input are equal outputs $1$ with probability $1$ on $G'(s)$ and with probability $2^{-2n}$ on a uniform string: advantage $1 - 2^{-2n}$. Copying output adds length but no pseudorandomness.

(b) $G''$ still expands, since $2n - 1 > n$ for $n \ge 2$. Given a distinguisher $D$ for $G''$, let $D'(y)$, for $y \in \{0,1\}^{2n}$, output $D$ applied to the first $2n - 1$ bits of $y$. On $y = G(s)$ it runs $D$ on $G''(s)$; on uniform $y$ it runs $D$ on a uniform $(2n-1)$-bit string. So $D'$ has the same advantage as $D$, which is negligible because $G$ is a PRG. Throwing bits away never hurts pseudorandomness.
:::
:::

::: exercise A PRF built from a PRF {level=2}
Let $F$ be a PRF. Which of the following are PRFs (with key $k$)? Prove or give a distinguisher. (a) $F'_k(x) = F_k(x) \oplus x$. (b) $F'_k(x) = F_k(x) \oplus F_k(\bar x)$, where $\bar x$ is the bitwise complement of $x$.
::: solution
(a) Yes. Given a distinguisher $D$ for $F'$, let $D'$ with oracle $O$ run $D$ and answer each query $x$ with $O(x) \oplus x$. If $O = F_k$, $D$ sees $F'_k$. If $O = f$ is random, $D$ sees $x \mapsto f(x) \oplus x$, which is itself a uniformly random function (XORing each value with a fixed $x$ is a bijection on the table of values). So the advantages are equal, and negligible.

(b) No. $F'_k(x) = F'_k(\bar x)$ for every $x$, because XOR is commutative. The distinguisher queries $0^n$ and $1^n$ and outputs $1$ if the answers are equal: probability $1$ for $F'_k$, $2^{-n}$ for a random function.
:::
:::

::: exercise The switching bound {level=2 check="2^(-25)"}
For $q = 2^{20}$ queries to a permutation on $64$-bit strings, compute the simplified switching bound $q^2/2^{n+1}$ and compare it with the exact probability that $q$ uniform $64$-bit values are not all distinct. (Enter $q^2/2^{n+1}$.)
::: solution
$q^2/2^{65} = 2^{40}/2^{65} = 2^{-25} \approx 2.98 \times 10^{-8}$; the bound $q(q-1)/2^{65}$ of [[#lem-switching]] is smaller by the factor $1 - 2^{-20}$. The exact collision probability is $1 - \prod_{i=1}^{q-1}(1 - i/2^{64})$, which for $q \ll 2^{32}$ is extremely close to $q(q-1)/2^{65}$: the union bound is tight when the bound is small. The two differ appreciably only near $q \approx 2^{32}$, where the bound reaches $1/2$ and the true probability is $1 - e^{-1/2} \approx 0.39$.
:::
:::

::: exercise A PRF gives EAV-secure encryption of one block {level=3}
Let $F$ be a PRF on $n$-bit strings, and consider $\mathsf{Enc}_k(m) = F_k(0^n) \oplus m$ for $m \in \{0,1\}^n$. Prove that it is EAV-secure by a direct reduction to $F$ (not via [[#prop-prf-prg]]). Then explain precisely why it is not secure if the adversary sees encryptions of two different messages.
::: solution
Given an adversary $\mathcal A$, build $D^O$: run $\mathcal A$ to get $m_0, m_1$; choose $b$; give $\mathcal A$ the ciphertext $O(0^n) \oplus m_b$; output $1$ iff $\mathcal A$ outputs $b$. If $O = F_k$, $D$ simulates $\mathsf{PrivK}^{\mathsf{eav}}$ exactly. If $O = f$ is random, $f(0^n)$ is a uniform $n$-bit string, so $\mathcal A$ faces a one-time pad and succeeds with probability exactly $\tfrac12$. So $\mathcal A$'s success minus $\tfrac12$ equals $D$'s advantage, which is negligible.

With two messages, both are encrypted with the same pad $F_k(0^n)$, so $c_1 \oplus c_2 = m_1 \oplus m_2$. The adversary submitting $(m, m)$ versus $(m, m')$ with $m \ne m'$ distinguishes by testing $c_1 = c_2$. The fix, in [[cryptography/block-ciphers]], is to choose a fresh random input $r$ for each encryption and send $\langle r, F_k(r) \oplus m\rangle$.
:::
:::

::: exercise Implementing lazy sampling {level=3}
Write a Python class `RandomFunction` that simulates a uniformly random function from $\{0,1\}^{n}$ to itself by lazy sampling, and a class `RandomPermutation` that does the same for a random permutation. Use them to estimate, over $10\,000$ trials, the probability that the distinguisher "output 1 if any two answers coincide" outputs $1$ on each oracle with $n = 16$ and $q = 300$ distinct queries, and compare with the bound of [[#lem-switching]].
::: solution
```python
import random

class RandomFunction:
    def __init__(self, n): self.n, self.table = n, {}
    def __call__(self, x):
        if x not in self.table:                       # fresh query: new uniform value
            self.table[x] = random.getrandbits(self.n)
        return self.table[x]

class RandomPermutation(RandomFunction):
    def __call__(self, x):
        if x not in self.table:
            used = set(self.table.values())
            y = random.getrandbits(self.n)
            while y in used:                          # resample until unused
                y = random.getrandbits(self.n)
            self.table[x] = y
        return self.table[x]

def collides(oracle, q):
    ys = [oracle(x) for x in range(q)]
    return len(set(ys)) < q

random.seed(1)
n, q, T = 16, 300, 10_000
pf = sum(collides(RandomFunction(n), q) for _ in range(T)) / T
pp = sum(collides(RandomPermutation(n), q) for _ in range(T)) / T
print(pf, pp, q * (q - 1) / 2 ** (n + 1))
```

```console
$ python3 lazy.py
0.4955 0.0 0.684356689453125
```

The permutation never collides, the function collides about half the time (the estimate is $0.4955$), so this distinguisher's advantage is about $0.50$, below the bound $0.68$. (The exact collision probability for $q = 300$ in $2^{16}$ is $1 - \prod_{i<300}(1 - i/65536) \approx 0.496$; the union bound overestimates it once it is no longer small.)
:::
:::
