Given two polynomials written as large expressions — say, two formulas for the determinant of a symbolic matrix — are they the same polynomial? Expanding them may produce exponentially many terms. But evaluate both at a random point: if they are different polynomials they will almost certainly give different values, and if they are equal they always agree. No deterministic polynomial-time algorithm for this problem is known, yet the randomised test is simple, fast, and wrong with a probability you can make smaller than the chance of a cosmic ray flipping a bit in your computer.

[[algorithms/randomised-algorithms]] showed many such algorithms: Freivalds' test, universal hashing, Karger's minimum cut. This chapter asks what randomness adds to *complexity*. We define probabilistic Turing machines and the classes $\mathsf{BPP}$, $\mathsf{RP}$, $\mathsf{coRP}$ and $\mathsf{ZPP}$; prove that their error probabilities can be driven down exponentially (**amplification**, using a Chernoff bound that we prove); place them relative to $\mathsf{P}$, $\mathsf{NP}$ and the polynomial hierarchy — including the theorems that $\mathsf{BPP}$ has polynomial-size circuits and lies in $\Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ — and survey the evidence that randomness can in fact be removed, that is, that $\mathsf{P} = \mathsf{BPP}$.

## Probabilistic Turing machines

::: definition Probabilistic Turing machine {#def-ptm}
A **probabilistic Turing machine** $M$ is a nondeterministic Turing machine in which every nondeterministic step has exactly two choices, each taken with probability $1/2$ ("a coin flip"), independently of all other steps. The probability of a branch $b$ that makes $k$ coin flips is $2^{-k}$, and
$$
\Prob[M \text{ accepts } w] = \sum_{b \text{ accepting}} \Prob[b].
$$
$M$ runs in time $t(n)$ if every branch halts within $t(n)$ steps.
:::

Equivalently, $M$ is a deterministic machine that reads, besides its input $w$, a string $r \in \{0, 1\}^{t(n)}$ of independent uniform random bits, and $\Prob[M \text{ accepts } w] = \Prob_r[M(w, r) \text{ accepts}]$. We use whichever view is more convenient.

::: definition Randomised complexity classes {#def-bpp}
A language $L$ is in

- $\mathsf{BPP}$ (bounded-error probabilistic polynomial time) if some polynomial-time probabilistic machine $M$ satisfies $\Prob[M \text{ accepts } w] \ge 2/3$ for $w \in L$ and $\Prob[M \text{ accepts } w] \le 1/3$ for $w \notin L$;
- $\mathsf{RP}$ (randomised polynomial time) if some polynomial-time $M$ satisfies $\Prob[M \text{ accepts } w] \ge 1/2$ for $w \in L$ and $\Prob[M \text{ accepts } w] = 0$ for $w \notin L$;
- $\mathsf{coRP}$ if $\overline{L} \in \mathsf{RP}$; equivalently, some polynomial-time $M$ accepts every $w \in L$ with probability $1$ and rejects every $w \notin L$ with probability at least $1/2$;
- $\mathsf{ZPP}$ (zero-error probabilistic polynomial time) if some probabilistic machine decides $L$ with no error — every halting branch gives the correct answer — and its **expected** running time is polynomial on every input.
:::

$\mathsf{BPP}$ algorithms are **Monte Carlo** algorithms with two-sided error, $\mathsf{RP}$ and $\mathsf{coRP}$ algorithms are Monte Carlo with one-sided error, and $\mathsf{ZPP}$ algorithms are **Las Vegas** algorithms ([[algorithms/randomised-algorithms#def-lv-mc]]). The probability is over the machine's coins only, for each fixed input: there is no assumption about how inputs are distributed. The constants $2/3$, $1/2$ are arbitrary, as the next section shows.

::: proposition Easy inclusions {#prop-randomised-inclusions}
$\mathsf{P} \subseteq \mathsf{RP} \subseteq \mathsf{NP}$, $\mathsf{P} \subseteq \mathsf{coRP} \subseteq \mathsf{coNP}$, $\mathsf{RP} \cup \mathsf{coRP} \subseteq \mathsf{BPP}$, $\mathsf{BPP}$ is closed under complement, and $\mathsf{BPP} \subseteq \mathsf{PSPACE}$.
:::

::: proof
A deterministic machine is a probabilistic one that ignores its coins. If $M$ is an $\mathsf{RP}$ machine for $L$, then $w \in L$ iff some branch accepts (a probability $\ge 1/2$ is positive; a probability $0$ means no accepting branch), so $M$ viewed as a nondeterministic machine decides $L$: $\mathsf{RP} \subseteq \mathsf{NP}$. For $\mathsf{RP} \subseteq \mathsf{BPP}$, run the $\mathsf{RP}$ machine twice and accept if either run accepts: acceptance probability $\ge 1 - 1/4 = 3/4$ on $L$ and $0$ off it. Complementing the answer of a $\mathsf{BPP}$ machine turns probabilities $\ge 2/3$ into $\le 1/3$ and vice versa. Finally, a polynomial-space machine can loop over all random strings $r$ of length $t(n)$, reusing space, and count the accepting ones exactly.
:::

## Amplification

### One-sided error

::: theorem Amplification for RP {#thm-rp-amp}
If $L \in \mathsf{RP}$, then for every polynomial $q$ there is a polynomial-time probabilistic machine that accepts every $w \in L$ with probability at least $1 - 2^{-q(n)}$ and never accepts $w \notin L$.
:::

::: proof
Run the $\mathsf{RP}$ machine $q(n)$ times with independent coins, and accept iff at least one run accepts. If $w \notin L$ no run accepts. If $w \in L$, each run rejects with probability at most $1/2$, so all $q(n)$ runs reject with probability at most $2^{-q(n)}$. The running time is multiplied by $q(n)$.
:::

The same works if the original success probability is only $1/p(n)$ for a polynomial $p$: $k\,p(n)$ runs fail with probability at most $(1 - 1/p(n))^{k p(n)} \le e^{-k}$. So $\mathsf{RP}$ is the same class for any success probability between $1/\mathrm{poly}(n)$ and $1 - 2^{-\mathrm{poly}(n)}$.

### Two-sided error and the Chernoff bound

For two-sided error we repeat and take the **majority** answer. The analysis needs the fact that the number of correct runs is concentrated near its mean.

::: lemma Chernoff bound (lower tail) {#lem-chernoff}
Let $X = X_1 + \cdots + X_m$ where the $X_i \in \{0, 1\}$ are independent, and let $\mu = \E[X]$. Then for $0 < \delta < 1$,
$$
\Prob[X \le (1 - \delta)\mu] \le e^{-\delta^2\mu/2}.
$$ {#eq-chernoff}
:::

::: proof
Let $p_i = \Prob[X_i = 1]$, so $\mu = \sum p_i$. For any $s > 0$, the event $X \le (1 - \delta)\mu$ is the event $e^{-sX} \ge e^{-s(1-\delta)\mu}$, so by Markov's inequality ([[algorithms/randomised-algorithms#thm-markov]])
$$
\Prob[X \le (1 - \delta)\mu] \le \frac{\E[e^{-sX}]}{e^{-s(1-\delta)\mu}} = e^{s(1-\delta)\mu}\prod_i \E[e^{-sX_i}],
$$
using independence. Now $\E[e^{-sX_i}] = 1 - p_i(1 - e^{-s}) \le \exp(-p_i(1 - e^{-s}))$ since $1 + x \le e^x$, so the product is at most $\exp(-\mu(1 - e^{-s}))$. Choose $s = -\ln(1 - \delta)$, so that $e^{-s} = 1 - \delta$:
$$
\Prob[X \le (1 - \delta)\mu] \le \exp\bigl(-\mu\,(\delta + (1 - \delta)\ln(1 - \delta))\bigr).
$$
Finally $(1 - \delta)\ln(1 - \delta) \ge -\delta + \delta^2/2$ for $0 < \delta < 1$: both sides vanish at $\delta = 0$, and the derivative of the left side, $-\ln(1 - \delta) - 1$, is at least the derivative of the right side, $-1 + \delta$, because $-\ln(1 - \delta) \ge \delta$. So the exponent is at least $\mu\delta^2/2$.
:::

::: theorem Amplification for BPP {#thm-bpp-amp}
Suppose a polynomial-time probabilistic machine $M$ gives the correct answer on every input with probability at least $1/2 + \varepsilon$, where $0 < \varepsilon \le 1/2$. Then running $M$ $m$ times independently and taking the majority answer gives the wrong answer with probability at most $e^{-\varepsilon^2 m/2}$. In particular, for every polynomial $q$, every $L \in \mathsf{BPP}$ has a polynomial-time machine with error at most $2^{-q(n)}$; and $\mathsf{BPP}$ is unchanged if $2/3$ is replaced by $1/2 + 1/p(n)$ for any polynomial $p$.
:::

::: proof
Let $X_i = 1$ if run $i$ is correct; the $X_i$ are independent with $\Prob[X_i = 1] \ge 1/2 + \varepsilon$. (If the probabilities are larger the error only decreases, so assume equality: $\mu = (1/2 + \varepsilon)m$.) The majority is wrong only if $X \le m/2 = (1 - \delta)\mu$ with $\delta = \varepsilon/(1/2 + \varepsilon)$. By [[#lem-chernoff]] the probability is at most
$$
\exp\Bigl(-\frac{\delta^2\mu}{2}\Bigr) = \exp\Bigl(-\frac{\varepsilon^2 m}{2(1/2 + \varepsilon)}\Bigr) = \exp\Bigl(-\frac{\varepsilon^2 m}{1 + 2\varepsilon}\Bigr) \le e^{-\varepsilon^2 m/2},
$$
since $1 + 2\varepsilon \le 2$. For error $2^{-q(n)}$ take $m = \lceil 2\ln 2 \cdot q(n)/\varepsilon^2\rceil$, polynomial if $1/\varepsilon$ is. With $\varepsilon = 1/6$ (the definition of $\mathsf{BPP}$), the bound is $e^{-m/48}$.
:::

::: example How fast does majority voting converge? {#ex-majority}
A $\mathsf{BPP}$ algorithm is correct with probability exactly $2/3$. Compute the exact error of the majority of $m$ runs for several odd $m$ and compare it with the bound $e^{-m/48}$.
::: solution
The majority is wrong iff at most $\lfloor m/2\rfloor$ runs are correct, a binomial tail.

```python
from fractions import Fraction
from math import comb, exp

def majority_error(m, p=Fraction(2, 3)):
    """Exact probability that at most m/2 of m independent runs are correct."""
    return sum(comb(m, j) * p**j * (1 - p)**(m - j) for j in range(m // 2 + 1))

for m in (1, 3, 11, 51, 101, 201):
    err = majority_error(m)
    print(f"{m:4d} runs: exact error {float(err):.3e}   Chernoff bound {exp(-m / 48):.3e}")
```

```console
$ python3 majority.py
   1 runs: exact error 3.333e-01   Chernoff bound 9.794e-01
   3 runs: exact error 2.593e-01   Chernoff bound 9.394e-01
  11 runs: exact error 1.221e-01   Chernoff bound 7.952e-01
  51 runs: exact error 6.888e-03   Chernoff bound 3.456e-01
 101 runs: exact error 2.724e-04   Chernoff bound 1.219e-01
 201 runs: exact error 5.531e-07   Chernoff bound 1.518e-02
```

For three runs the error is exactly $\left(\tfrac13\right)^3 + 3 \cdot \tfrac23 \cdot \left(\tfrac13\right)^2 = \tfrac{7}{27} \approx 0.259$. The true error falls much faster than the bound — every $50$ extra runs divide it by about $25$ to $50$ — while the bound is loose by large constant factors. What matters for complexity is that both decay *exponentially* in $m$: a few hundred runs make the error negligible, at a constant-factor cost in time.
:::
:::

::: example An error budget of $2^{-100}$ {#ex-budget}
How many runs of an algorithm that is correct with probability $2/3$ does [[#thm-bpp-amp]] guarantee are enough for a majority vote with error at most $2^{-100}$? How many are actually needed?
::: solution
With $\varepsilon = 1/6$ the proof gives the error bound $\exp(-\varepsilon^2 m/(1 + 2\varepsilon)) = e^{-m/48}$, and $e^{-m/48} \le 2^{-100}$ iff $m \ge 4800 \ln 2 \approx 3327.1$: $m = 3329$ runs (taking $m$ odd) suffice. The simpler bound $e^{-\varepsilon^2 m/2}$ would ask for $m \ge 7200\ln 2 \approx 4991$. Summing the exact binomial tail, as in [[#ex-majority]], shows that $m = 1121$ runs already give error about $7.1 \times 10^{-31} < 2^{-100} \approx 7.9 \times 10^{-31}$, while $1119$ runs give about $8.0 \times 10^{-31}$, just too much. Either way the cost is a constant factor — a few thousand runs at most — independent of the input size.
:::
:::

::: widget distribution
dist: binomial
params: n=51, p=0.6667
a: 0
b: 25
caption: The number of correct answers among $51$ independent runs of an algorithm that is right with probability $2/3$. The majority vote is wrong exactly when this number is at most $25$ — the shaded tail, about $0.007$. The mean is $34$ and the standard deviation about $3.4$, so the threshold $25.5$ lies some $2.5$ standard deviations below the mean. Increase $n$ (keeping $a = 0$ and $b$ just below $n/2$) and watch the tail vanish: the distribution narrows like $\sqrt{n}$ while the gap between the mean and $n/2$ grows like $n$.
:::

### Zero error

::: theorem ZPP = RP ∩ coRP {#thm-zpp}
$\mathsf{ZPP} = \mathsf{RP} \cap \mathsf{coRP}$.
:::

::: proof
*$\subseteq$.* Let $M$ decide $L$ with zero error in expected time at most $p(n)$. Let $M'$ run $M$ for $2p(n)$ steps; by Markov's inequality, $M$ has not halted by then with probability at most $1/2$. For $\mathsf{RP}$: if $M$ halted, give its (correct) answer; otherwise reject. On $w \notin L$, $M'$ never accepts; on $w \in L$ it accepts with probability at least $1/2$. For $\mathsf{coRP}$: the same, but accept when $M$ has not halted.

*$\supseteq$.* Let $M_1$ be an $\mathsf{RP}$ machine for $L$ and $M_2$ an $\mathsf{RP}$ machine for $\overline{L}$. Repeat: run $M_1$ and $M_2$ on $w$; if $M_1$ accepts, accept; if $M_2$ accepts, reject; otherwise repeat. $M_1$ accepts only if $w \in L$, and $M_2$ only if $w \notin L$, so the answer is always correct. In each round, the machine for the true answer accepts with probability at least $1/2$, so the number of rounds is geometric with mean at most $2$ ([[algorithms/randomised-algorithms]]), and the expected time is polynomial.
:::

## What is in these classes?

### Polynomial identity testing

The motivating example is the problem of deciding whether an **arithmetic circuit** — a directed acyclic graph of $+$, $-$ and $\times$ gates over variables and integer constants — computes the zero polynomial. Expanding into monomials may take exponential time ($\prod_{i=1}^n (x_i + y_i)$ has $2^n$ terms). Evaluating at a point is fast. The key fact is that a non-zero polynomial has few roots.

::: lemma Schwartz–Zippel lemma {#lem-schwartz-zippel}
Let $q(x_1, \dots, x_k)$ be a non-zero polynomial of total degree $d$ over a field $\F$, and $S \subseteq \F$ a finite set. If $a_1, \dots, a_k$ are chosen independently and uniformly from $S$, then $\Prob[q(a_1, \dots, a_k) = 0] \le d/\lvert S\rvert$.
:::

::: proof
By induction on $k$. For $k = 1$, a non-zero polynomial of degree $d$ has at most $d$ roots ([[algorithms/randomised-algorithms#ex-schwartz-zippel]]). For $k > 1$, write $q$ as a polynomial in $x_1$ with coefficients in the other variables, $q = \sum_{i=0}^{j} x_1^i\, q_i(x_2, \dots, x_k)$, where $j$ is the largest power of $x_1$ with $q_j \ne 0$. Then $q_j$ has total degree at most $d - j$, so by induction $\Prob[q_j(a_2, \dots, a_k) = 0] \le (d - j)/\lvert S\rvert$. If $q_j(a_2, \dots, a_k) \ne 0$, then $q(x_1, a_2, \dots, a_k)$ is a non-zero polynomial in $x_1$ of degree $j$, which vanishes at the random $a_1$ with probability at most $j/\lvert S\rvert$. Hence
$$
\Prob[q(a) = 0] \le \Prob[q_j(a_2, \dots) = 0] + \Prob[q(a) = 0 \mid q_j(a_2, \dots) \ne 0] \le \frac{d - j}{\lvert S\rvert} + \frac{j}{\lvert S\rvert} = \frac{d}{\lvert S\rvert}.
$$
:::

So polynomial identity testing is in $\mathsf{coRP}$: evaluate at a random point (with integer circuits, modulo a random prime to keep numbers short); if the value is non-zero the polynomial certainly is, and if it is zero we answer "identically zero", wrong with probability at most $d/\lvert S\rvert$.

::: example Testing an algebraic identity {#ex-pit}
Test the identity $(x + y)(y + z)(z + x) = (x + y + z)(xy + yz + zx) - xyz$, and a wrong version without the $-xyz$, by evaluating modulo the prime $p = 2^{61} - 1$.
::: solution
```python
import random

P = 2**61 - 1                                   # a prime; we work modulo P

def lhs(x, y, z):                               # (x + y)(y + z)(z + x)
    return (x + y) * (y + z) * (z + x) % P

def rhs_true(x, y, z):                          # (x+y+z)(xy+yz+zx) - xyz
    return ((x + y + z) * (x*y + y*z + z*x) - x*y*z) % P

def rhs_false(x, y, z):                         # differs from lhs by the term xyz
    return ((x + y + z) * (x*y + y*z + z*x)) % P

def probably_equal(f, g, trials=20, rng=random.Random(1)):
    """coRP test: 'different' is always right; 'equal' errs with prob <= (3/P)^trials."""
    for _ in range(trials):
        point = [rng.randrange(P) for _ in range(3)]
        if f(*point) != g(*point):
            return False
    return True

print(probably_equal(lhs, rhs_true), probably_equal(lhs, rhs_false))
```

```console
$ python3 pit.py
True False
```

The difference of the two sides of the wrong identity is $xyz$, of degree $3$, so a single random point detects it except with probability at most $3/(2^{61} - 1) \approx 1.3 \times 10^{-18}$, and $20$ independent points with probability at most $(3/p)^{20}$. For the true identity every evaluation agrees, as it must: the test never declares two equal polynomials different. (Expanding both sides confirms the identity: each is $x^2y + x^2z + y^2x + y^2z + z^2x + z^2y + 2xyz$.)
:::
:::

As of 2026, no deterministic polynomial-time algorithm for polynomial identity testing of general arithmetic circuits is known, and Kabanets and Impagliazzo (2004) showed that finding one would imply new circuit lower bounds — a hint of why derandomisation is hard. Other members of $\mathsf{RP}$ or $\mathsf{coRP}$ not known to be in $\mathsf{P}$ come from the same lemma, for example deciding whether a graph has a perfect matching using a random substitution into the Tutte matrix (Lovász, 1979) — a problem that *is* in $\mathsf{P}$ by Edmonds's algorithm, but whose randomised algorithm parallelises well.

The best-known historical example is **primality**. The Solovay–Strassen (1977) and Miller–Rabin (1976/1980) tests place $\mathit{COMPOSITES}$ in $\mathsf{RP}$ — a composite number is detected with probability at least $1/2$ (respectively $3/4$) per round, and a prime is never declared composite. For 25 years $\mathit{PRIMES}$ was the flagship problem in $\mathsf{coRP}$ (and, by a further algorithm of Adleman and Huang, in $\mathsf{ZPP}$) but not known to be in $\mathsf{P}$, until Agrawal, Kayal and Saxena derandomised it in 2002.

::: quiz
A randomised algorithm for a decision problem always halts in polynomial time; when the true answer is "yes" it says "yes" with probability $0.9$, and when the answer is "no" it says "no" with probability $0.6$. In which classes is the problem known to be?
- [x] $\mathsf{BPP}$
- [ ] $\mathsf{RP}$
- [ ] $\mathsf{ZPP}$
- [x] $\mathsf{PSPACE}$
::: solution
The algorithm is correct with probability at least $0.6 = 1/2 + 0.1$ on every input, so by [[#thm-bpp-amp]] the problem is in $\mathsf{BPP}$, hence in $\mathsf{PSPACE}$. It is not an $\mathsf{RP}$ algorithm (it errs on "no" instances) and not a $\mathsf{ZPP}$ algorithm (it can be wrong). Whether the problem is also in $\mathsf{RP}$ depends on the problem; nothing here tells us.
:::
:::

## BPP and the rest of the world

Where does $\mathsf{BPP}$ sit? It contains $\mathsf{P}$ and is contained in $\mathsf{PSPACE}$. It is not known whether $\mathsf{BPP} \subseteq \mathsf{NP}$ (a $\mathsf{BPP}$ machine's accepting branches are not a short proof of anything, since rejecting inputs have them too) or whether $\mathsf{NP} \subseteq \mathsf{BPP}$ (which would make $\mathsf{NP}$-complete problems efficiently solvable in practice). Two theorems place it much lower than $\mathsf{PSPACE}$.

### Circuits and advice

::: definition P/poly {#def-ppoly}
A language $L$ is in $\mathsf{P/poly}$ if there are a polynomial-time Turing machine $M$, a polynomial $p$ and **advice strings** $a_0, a_1, a_2, \dots$ with $\lvert a_n\rvert \le p(n)$ such that, for every $w$, $w \in L$ iff $M$ accepts $\langle w, a_{\lvert w\rvert}\rangle$. Equivalently, $L$ is decided by a family of Boolean circuits $C_0, C_1, \dots$ of polynomial size, $C_n$ handling inputs of length $n$.
:::

The advice depends only on the length of the input, not on the input itself, and need not be computable — $\mathsf{P/poly}$ contains undecidable unary languages such as $\{1^n : $ the $n$-th Turing machine halts on $\varepsilon\}$, with one bit of advice per length. It is a model of **non-uniform** computation, and lower bounds against it are lower bounds on circuit size.

::: theorem Adleman's theorem {#thm-adleman}
$\mathsf{BPP} \subseteq \mathsf{P/poly}$.
:::

::: proof
Let $L \in \mathsf{BPP}$. By [[#thm-bpp-amp]] there is a polynomial-time machine $M(w, r)$, using $\ell(n)$ random bits, whose error probability on each input of length $n$ is less than $2^{-n}$. Call a random string $r \in \{0, 1\}^{\ell(n)}$ **bad for** $w$ if $M(w, r)$ gives the wrong answer. For each of the $2^n$ inputs $w$ of length $n$, fewer than a $2^{-n}$ fraction of the strings $r$ are bad. By the union bound, fewer than a $2^n \cdot 2^{-n} = 1$ fraction of the $r$ are bad for *some* $w$ — so at least one string $r_n$ is good for every input of length $n$. Take $a_n = r_n$ as advice: $M(w, a_{\lvert w\rvert})$ is always correct.
:::

The proof shows that a good random string *exists*, not how to find one, which is why it gives a non-uniform result. Combined with the **Karp–Lipton theorem** (1980) — if $\mathsf{NP} \subseteq \mathsf{P/poly}$ then $\mathsf{PH} = \Sigma_2^{\mathsf{p}}$ — it shows that $\mathsf{NP} \subseteq \mathsf{BPP}$ would collapse the polynomial hierarchy to its second level ([[complexity/hierarchies#thm-ph-collapse]]), which is taken as evidence that $\mathsf{NP}$-complete problems have no efficient randomised algorithms.

### BPP is in the second level

::: theorem Sipser–Gács–Lautemann theorem {#thm-lautemann}
$\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$.
:::

::: proof
Since $\mathsf{BPP}$ is closed under complement and $\Pi_2^{\mathsf{p}}$ consists of the complements of $\Sigma_2^{\mathsf{p}}$ languages, it suffices to show $\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}}$. Let $L \in \mathsf{BPP}$ and, by amplification, let $M(w, r)$ with $r \in \{0, 1\}^m$, $m = m(n)$ a polynomial, have error less than $2^{-n}$; we may assume $n$ is large enough that $m < 2^n$. Let $A_w = \{r : M(w, r) \text{ accepts}\} \subseteq \{0, 1\}^m$. Then $\lvert A_w\rvert > (1 - 2^{-n})2^m$ if $w \in L$, and $\lvert A_w\rvert < 2^{-n}2^m$ if $w \notin L$. For a string $t \in \{0, 1\}^m$ write $A_w \oplus t = \{r \oplus t : r \in A_w\}$ (bitwise exclusive or), a set of the same size. We claim:
$$
w \in L \iff \exists t_1, \dots, t_m \in \{0, 1\}^m\ \ \forall r \in \{0, 1\}^m\ \ \bigvee_{i=1}^{m} M(w, r \oplus t_i) \text{ accepts}.
$$ {#eq-lautemann}
The inner disjunction has $m$ terms, each a run of $M$, so it is checked in polynomial time; the quantified strings have polynomial length. So the claim puts $L$ in $\Sigma_2^{\mathsf{p}}$. Note that $M(w, r \oplus t_i)$ accepts iff $r \in A_w \oplus t_i$, so the right-hand side says that the $m$ shifted copies $A_w \oplus t_i$ cover all of $\{0, 1\}^m$.

*If $w \notin L$*, then for any $t_1, \dots, t_m$ the copies together have fewer than $m \cdot 2^{-n}2^m < 2^m$ elements (as $m < 2^n$), so some $r$ is not covered: the right-hand side is false.

*If $w \in L$*, choose $t_1, \dots, t_m$ independently and uniformly at random. For a fixed $r$, the string $r \oplus t_i$ is uniform, so $\Prob[r \notin A_w \oplus t_i] = \Prob[r \oplus t_i \notin A_w] < 2^{-n}$, and by independence $\Prob[r \text{ is covered by no copy}] < 2^{-nm}$. By the union bound over all $2^m$ strings $r$, the probability that some $r$ is uncovered is less than $2^m \cdot 2^{-nm} \le 1$ (for $n \ge 1$). So some choice of $t_1, \dots, t_m$ covers everything: the right-hand side is true.
:::

::: example Covering by translates {#ex-shifts}
For $m = 3$, find shifts covering $\{0,1\}^3$ by translates of $A = \{000, 001, 011, 101, 110, 111\}$, and show that three translates of $\{010\}$ cannot cover it.
::: solution
Two shifts suffice for $A$: $A \oplus 000 = A$ misses $010$ and $100$, and $A \oplus 001 = \{001, 000, 010, 100, 111, 110\}$ contains both. Three translates of a one-element set have at most three elements, fewer than the $8$ strings of $\{0,1\}^3$. A brute-force search agrees:

```python
from itertools import product

def covers(A, shifts, m):
    """Do the translates A xor t (t in shifts) cover all of {0,1}^m?"""
    return all(any((r ^ t) in A for t in shifts) for r in range(2 ** m))

def find_shifts(A, m, k):
    return next((ts for ts in product(range(2 ** m), repeat=k) if covers(A, ts, m)), None)

m = 3
big = {0b000, 0b001, 0b011, 0b101, 0b110, 0b111}      # 6 of the 8 strings
small = {0b010}                                       # 1 of the 8 strings
print(find_shifts(big, m, 2), find_shifts(small, m, 3))
```

```console
$ python3 shifts.py
(0, 1) None
```

In the proof, the "big" case is $w \in L$ (almost every random string makes $M$ accept) and the "small" case is $w \notin L$; $m$ translates suffice for a set of density above $1 - 2^{-n}$, and can never suffice for one of density below $2^{-n}$ when $m < 2^n$.
:::
:::

The shifts $t_i$ form a short certificate that $A_w$ is large: a small set cannot be covered by a few translates, but a huge one always can. This is a typical use of the **probabilistic method** — proving that an object exists by showing that a random one works with positive probability.

::: widget venn
sets: 3
expr: A & B & C
labels: BPP; NP; coNP
caption: What is known about $\mathsf{BPP}$, $\mathsf{NP}$ and $\mathsf{coNP}$ as of 2026: the three sets all contain $\mathsf{P}$ (inside the shaded common region), $\mathsf{RP} \subseteq \mathsf{BPP} \cap \mathsf{NP}$ and $\mathsf{coRP} \subseteq \mathsf{BPP} \cap \mathsf{coNP}$, and all three lie in $\Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ — $\mathsf{NP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ trivially and $\mathsf{BPP}$ by Sipser–Gács–Lautemann. Every region of the diagram might be empty or not, as far as anyone has proved. If the conjecture $\mathsf{P} = \mathsf{BPP}$ is true, the $\mathsf{BPP}$ circle contains nothing outside $\mathsf{P}$, which lies within the shaded centre.
:::

## Derandomisation

Is randomness really necessary for efficient computation? Most complexity theorists now believe it is not:

$$
\mathsf{P} \overset{?}{=} \mathsf{BPP}.
$$

The reason is the theory of **pseudorandom generators**: deterministic functions that stretch a short random **seed** of $O(\log n)$ bits into a long string that no small circuit can distinguish from truly random bits. If such a generator exists, a $\mathsf{BPP}$ algorithm can be derandomised by running it on the output for *every* seed — only $2^{O(\log n)} = \mathrm{poly}(n)$ of them — and taking the majority. The remarkable discovery is that such generators follow from **hardness**: Nisan and Wigderson (1994) built them from functions that are hard on average for circuits, and Impagliazzo and Wigderson (1997) showed the following.

::: theorem Hardness versus randomness {#thm-iw}
If some language in $\mathsf{E} = \mathsf{TIME}(2^{O(n)})$ requires Boolean circuits of size $2^{\Omega(n)}$ on all large input lengths, then $\mathsf{P} = \mathsf{BPP}$ (Impagliazzo and Wigderson, 1997).
:::

We do not prove this. Its hypothesis is a strong but believed circuit lower bound — the kind of statement complexity theory cannot yet prove — and its conclusion is that randomness is a convenience, not a source of extra power. Conversely, Kabanets and Impagliazzo (2004) showed that derandomising polynomial identity testing would itself imply circuit lower bounds, so "derandomisation" and "lower bounds" are two faces of the same problem.

Concrete derandomisations support the conjecture: primality (AKS, 2002), and undirected reachability in log space (Reingold, 2005), which removed the randomness from the random-walk algorithm of Aleliunas, Karp, Lipton, Lovász and Rackoff (1979). As of 2026, $\mathsf{P} = \mathsf{BPP}$ is open, as is $\mathsf{BPP} \subseteq \mathsf{NP}$; it is not even known whether $\mathsf{BPP} \ne \mathsf{NEXP}$: we know $\mathsf{BPP} \subseteq \mathsf{PSPACE} \subseteq \mathsf{EXP} \subseteq \mathsf{NEXP}$, but not that any of these inclusions is strict.

::: warning Randomised does not mean unreliable — but the randomness must be real
A $\mathsf{BPP}$ algorithm with error $1/3$ may sound unusable, but amplification makes the error $2^{-100}$ for the cost of a few hundred repetitions, far below the rate of hardware faults. The guarantee is for **every input**, over the algorithm's own coins; it does not assume that inputs are random, so an adversary choosing the input cannot defeat it. What an adversary *can* defeat is predictable "randomness": the analysis assumes independent unbiased bits. Library pseudo-random generators such as a linear congruential generator or the Mersenne Twister are fine for simulations, but an attacker who can predict them can choose inputs that make the algorithm fail (this is how hash-flooding attacks on hash tables work, [[data-structures/hash-tables]]); cryptographically secure generators ([[cryptography]]) are needed when inputs may be adversarial.
:::

Randomness also changes what "proof" means. In an **interactive proof** a randomised polynomial-time verifier exchanges messages with an all-powerful prover and must accept true claims and reject false ones with high probability. The class $\mathsf{IP}$ of languages with interactive proofs equals $\mathsf{PSPACE}$ (Lund, Fortnow, Karloff and Nisan; Shamir, 1992), far more than the $\mathsf{NP}$ of one-message proofs. [[complexity/approximation-pcp]] describes another such notion: proofs that can be checked by reading only a constant number of randomly chosen bits.

::: history
John Gill defined probabilistic Turing machines and the classes $\mathsf{BPP}$, $\mathsf{RP}$, $\mathsf{ZPP}$ and $\mathsf{PP}$ in "Computational complexity of probabilistic Turing machines" (*SIAM Journal on Computing*, 1977). Robert Solovay and Volker Strassen's primality test appeared in 1977 and Michael Rabin's version of Gary Miller's test in 1980. Leonard Adleman proved $\mathsf{RP} \subseteq \mathsf{P/poly}$ in 1978, and Charles Bennett and Gill noted in 1981 that the argument extends to $\mathsf{BPP}$. Michael Sipser showed in 1983 that $\mathsf{BPP}$ lies in the polynomial hierarchy, Péter Gács improved this to the second level, and Clemens Lautemann gave the short proof used here (1983). The polynomial-identity lemma is due to Richard DeMillo and Richard Lipton (1978), Richard Zippel (1979) and Jacob Schwartz (1980). Noam Nisan and Avi Wigderson's "Hardness vs randomness" appeared in 1994 and Russell Impagliazzo and Wigderson's "P = BPP if E requires exponential circuits" in 1997; Valentine Kabanets and Impagliazzo's converse in 2004.
:::

## Where this leads

Randomness is essential in [[cryptography]], where secret keys must be unpredictable and security is defined against probabilistic adversaries; [[quantum-computing]] defines the class $\mathsf{BQP}$ by analogy with $\mathsf{BPP}$, with amplitudes in place of probabilities. In [[complexity/approximation-pcp]], randomised verifiers that read only a few bits of a proof lead to the PCP theorem, and randomised rounding gives approximation algorithms.

::: summary
- A **probabilistic Turing machine** flips fair coins ([[#def-ptm]]); $\mathsf{BPP}$ allows two-sided error $\le 1/3$, $\mathsf{RP}$ one-sided error on "yes" inputs, $\mathsf{coRP}$ on "no" inputs, and $\mathsf{ZPP}$ no error in expected polynomial time ([[#def-bpp]]).
- $\mathsf{P} \subseteq \mathsf{ZPP} = \mathsf{RP} \cap \mathsf{coRP}$ ([[#thm-zpp]]), $\mathsf{RP} \subseteq \mathsf{NP} \cap \mathsf{BPP}$, and $\mathsf{BPP} \subseteq \mathsf{PSPACE}$ is closed under complement ([[#prop-randomised-inclusions]]).
- **Amplification**: $k$ runs reduce one-sided error to $2^{-k}$ ([[#thm-rp-amp]]); by the Chernoff bound ([[#lem-chernoff]]) the majority of $m$ runs of an algorithm correct with probability $1/2 + \varepsilon$ errs with probability at most $e^{-\varepsilon^2 m/2}$ ([[#thm-bpp-amp]]).
- **Polynomial identity testing** is in $\mathsf{coRP}$ by the Schwartz–Zippel lemma ([[#lem-schwartz-zippel]]) and not known to be in $\mathsf{P}$.
- $\mathsf{BPP} \subseteq \mathsf{P/poly}$ (Adleman, [[#thm-adleman]]) and $\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ (Sipser–Gács–Lautemann, [[#thm-lautemann]]).
- It is conjectured that $\mathsf{P} = \mathsf{BPP}$; this follows from strong circuit lower bounds (Impagliazzo–Wigderson, [[#thm-iw]]) and is open as of 2026.
:::

## Exercises

::: exercise Repeating a one-sided test {level=1 check="30"}
An $\mathsf{RP}$ algorithm accepts each "yes" instance with probability at least $1/2$. How many independent runs are needed to make the probability of missing a "yes" instance at most $10^{-9}$? (Enter the smallest number of runs guaranteed by the bound $2^{-k}$.)
::: solution
We need $2^{-k} \le 10^{-9}$, i.e. $k \ge 9\log_2 10 \approx 29.9$, so $k = 30$ runs ($2^{-30} \approx 9.3 \times 10^{-10}$). "No" instances are never accepted, however many runs we make.
:::
:::

::: exercise Majority of three {level=1 check="7/27"}
An algorithm is correct with probability exactly $2/3$, independently on each run. What is the probability that the majority of three runs is wrong? (Enter a fraction.)
::: solution
The majority is wrong if $0$ or $1$ runs are correct: $(1/3)^3 + 3 \cdot (2/3)(1/3)^2 = 1/27 + 6/27 = 7/27 \approx 0.259$, less than the single-run error $1/3$ (see [[#ex-majority]]).
:::
:::

::: exercise Which class? {level=1}
Classify each algorithm as Las Vegas or Monte Carlo (one- or two-sided error), and name the class it places its problem in: (a) randomised quicksort used to decide whether a list has a repeated element; (b) Freivalds' test for $AB = C$ ([[algorithms/randomised-algorithms#alg-freivalds]]); (c) the Miller–Rabin test for compositeness; (d) a sampling algorithm that estimates whether more than half of the $2^n$ assignments satisfy a formula by testing 1000 random ones.
::: solution
(a) Las Vegas: the answer is always correct and the expected time is $O(n\log n)$; $\mathsf{ZPP}$ (indeed $\mathsf{P}$). (b) Monte Carlo with one-sided error: "$AB \ne C$" is always correct; the language $\{\langle A, B, C\rangle : AB = C\}$ is in $\mathsf{coRP}$ by this test (and in $\mathsf{P}$ by multiplication). (c) One-sided: "composite" is always correct; $\mathit{COMPOSITES} \in \mathsf{RP}$. (d) Two-sided, but *not* a $\mathsf{BPP}$ algorithm: if the fraction of satisfying assignments is very close to $1/2$, a fixed number of samples cannot tell which side it is on with probability bounded away from $1/2$. The problem (majority-SAT) is $\mathsf{PP}$-complete; the sampler only distinguishes fractions separated by a constant gap.
:::
:::

::: exercise Robustness of the definition {level=2}
Show that the class $\mathsf{BPP}$ is unchanged if the thresholds $2/3$ and $1/3$ are replaced by $1 - 2^{-n}$ and $2^{-n}$, or by $1/2 + 1/n$ and $1/2 - 1/n$. Why can one not take $1/2 + 2^{-n}$ and $1/2 - 2^{-n}$?
::: solution
The class with $1 - 2^{-n}$ is contained in $\mathsf{BPP}$ trivially, and contains it by [[#thm-bpp-amp]] with $q(n) = n$. The class with $1/2 \pm 1/n$ contains $\mathsf{BPP}$ trivially; conversely, with $\varepsilon = 1/n$, $m = O(n^2)$ runs give error $\le 1/3$, still polynomial. With $\varepsilon = 2^{-n}$ we would need $m = \Omega(\varepsilon^{-2}) = \Omega(4^n)$ runs: exponential. The resulting class, with any advantage over $1/2$, is $\mathsf{PP}$, which contains $\mathsf{NP}$ (next exercise but one) and is believed to be much larger than $\mathsf{BPP}$.
:::
:::

::: exercise Error of a single evaluation {level=2 check="3/100"}
Two polynomials of total degree at most $3$ in five variables are compared by evaluating both at a point chosen uniformly from $\{1, \dots, 100\}^5$. If they are different, what upper bound does [[#lem-schwartz-zippel]] give on the probability that they agree at the point? (Enter a fraction.)
::: solution
Their difference is a non-zero polynomial of degree at most $3$, which vanishes at the random point with probability at most $d/\lvert S\rvert = 3/100$. The number of variables does not appear in the bound. Ten independent points reduce it to $(3/100)^{10} \approx 5.9 \times 10^{-16}$.
:::
:::

::: exercise Las Vegas from Monte Carlo {level=2}
A problem has a polynomial-time randomised algorithm $A$ that outputs a candidate solution, correct with probability at least $1/n$, and a deterministic polynomial-time checker that tells whether a candidate is correct. Turn this into a Las Vegas algorithm and bound its expected running time.
::: solution
Repeat: run $A$, check its output, stop if correct. Each round succeeds with probability $p \ge 1/n$, independently, so the number of rounds is geometric with mean $1/p \le n$. If a round costs $T(n)$ (algorithm plus checker), the expected time is at most $n\,T(n)$, polynomial; and the output is always correct. This is the pattern of [[#thm-zpp]]: a checker turns one-sided "success" into zero error.
:::
:::

::: exercise NP is in PP {level=3}
$\mathsf{PP}$ is the class of languages $L$ with a polynomial-time probabilistic machine such that $w \in L$ iff $\Prob[\text{accept}] > 1/2$. Show that $\mathsf{NP} \subseteq \mathsf{PP}$ and $\mathsf{BPP} \subseteq \mathsf{PP}$.
::: solution
For $\mathsf{NP}$ it suffices (since $\mathsf{PP}$ is closed under $\le_p$: compute the reduction, then run the machine) to put $\mathit{SAT}$ in $\mathsf{PP}$. On input $\varphi$ with $n$ variables: flip a coin; on heads, accept; on tails, choose a uniformly random assignment and accept iff it satisfies $\varphi$. If $\varphi$ is unsatisfiable, $\Prob[\text{accept}] = 1/2$, which is not $> 1/2$. If $\varphi$ has at least one satisfying assignment, $\Prob[\text{accept}] \ge 1/2 + \tfrac12 2^{-n} > 1/2$. So $\mathit{SAT} \in \mathsf{PP}$. For $\mathsf{BPP}$: a $\mathsf{BPP}$ machine accepts with probability $\ge 2/3 > 1/2$ on $L$ and $\le 1/3 < 1/2$ off $L$, so it is a $\mathsf{PP}$ machine.
:::
:::

::: exercise If NP ⊆ BPP then NP = RP {level=3}
Prove that if $\mathit{SAT} \in \mathsf{BPP}$, then $\mathit{SAT} \in \mathsf{RP}$, and hence $\mathsf{NP} = \mathsf{RP}$ (Ko, 1982).
::: solution
Let $B$ be a $\mathsf{BPP}$ algorithm for $\mathit{SAT}$ amplified to error at most $1/(4(n+1))$ on formulas of size at most $\lvert\varphi\rvert$. The $\mathsf{RP}$ algorithm on input $\varphi$ with variables $x_1, \dots, x_n$: run the search-to-decision procedure of [[complexity/np#thm-self-reduction]], using $B$ in place of the decider — at most $n + 1$ calls — to construct an assignment; then **check** deterministically whether the assignment satisfies $\varphi$, and accept iff it does. If $\varphi$ is unsatisfiable, no assignment satisfies it, so the algorithm never accepts. If $\varphi$ is satisfiable, all $n + 1$ calls are answered correctly with probability at least $1 - (n+1)/(4(n+1)) = 3/4$ (union bound), and then the procedure finds a satisfying assignment, so the algorithm accepts with probability at least $3/4 \ge 1/2$. Hence $\mathit{SAT} \in \mathsf{RP}$. $\mathsf{RP}$ is closed under polynomial-time reductions, so $\mathsf{NP} \subseteq \mathsf{RP}$, and $\mathsf{RP} \subseteq \mathsf{NP}$ always ([[#prop-randomised-inclusions]]).
:::
:::
