Suppose a function $f\colon\{0,1\}^n\to\{0,1\}$ is given as a black box, and you are promised that it is either **constant** (the same value on every input) or **balanced** (equal to $1$ on exactly half of the inputs). Which is it? A deterministic classical algorithm may have to look at more than half the inputs — $2^{n-1} + 1$ of them — before it can be sure. A quantum algorithm, allowed to query $f$ on a superposition of inputs, answers with certainty after **one** query. This is the Deutsch–Jozsa algorithm of 1992, the first example of a quantum algorithm exponentially faster than any deterministic classical one. It solves an artificial problem, and a randomised classical algorithm does almost as well; but its idea — query in superposition, let the answers interfere through a Hadamard transform, and measure — is the template for every algorithm in this course.

This chapter sets up the **query model**, in which these speed-ups are proved rather than conjectured, and the two tools that every early algorithm uses: **phase kickback** and the **Hadamard transform**. Then we work through three algorithms of increasing strength. Deutsch–Jozsa separates quantum from deterministic classical query complexity; **Bernstein–Vazirani** learns a hidden $n$-bit string with one query instead of $n$; and **Simon's algorithm** finds a hidden "XOR period" with $O(n)$ queries where every classical algorithm, even randomised, needs $\Omega(2^{n/2})$. Simon's algorithm was the direct inspiration for Shor's factoring algorithm ([[quantum-computing/shor]]). Each algorithm is checked with the simulator `qsim.py` of [[quantum-computing/quantum-circuits]].

## The query model

In the **query model**, the input is a function $f$ that an algorithm can access only by evaluating it, and the cost is the number of evaluations, called **queries**; all other computation is free. A quantum algorithm queries through the oracle $U_f\ket x\ket y = \ket x\ket{y\oplus f(x)}$ of [[quantum-computing/quantum-circuits#def-oracle]], which it may apply to a superposition. The model is a simplification, but an honest one: if $f$ is given by a classical circuit, $U_f$ is a circuit of about the same size ([[quantum-computing/quantum-circuits#thm-oracle]]), so query savings become time savings whenever the rest of the algorithm is efficient. Its great advantage is that lower bounds can be *proved* in it, whereas for ordinary time complexity we cannot even separate $\mathsf{P}$ from $\mathsf{PSPACE}$.

::: definition Query complexity {#def-query}
For a problem whose input is a function $f$ (from a promised family), the **deterministic query complexity** $D$ is the least number of queries made, in the worst case over $f$, by a deterministic algorithm that is always correct. The **randomised** (bounded-error) query complexity $R$ is the same for randomised algorithms that are correct with probability at least $2/3$ on every $f$, and the **quantum** query complexity $Q$ for quantum algorithms (circuits interleaving arbitrary unitaries with applications of $U_f$) correct with probability at least $2/3$; $Q_E$ denotes exact quantum algorithms, correct with probability $1$.
:::

Always $Q \le R \le D$. Two lemmas do most of the work in this chapter.

::: lemma Phase kickback {#lem-kickback}
For $f\colon\{0,1\}^n\to\{0,1\}$ and $\ket- = (\ket0 - \ket1)/\sqrt2$,
$$
U_f\ket x\ket- = (-1)^{f(x)}\ket x\ket- .
$$
Hence for any input state $\sum_x\alpha_x\ket x$, one query with the target in $\ket-$ produces $\bigl(\sum_x(-1)^{f(x)}\alpha_x\ket x\bigr)\ket-$: it applies the **phase oracle** $O_f$ to the input register.
:::

::: proof
$U_f\ket x\ket0 = \ket x\ket{f(x)}$ and $U_f\ket x\ket1 = \ket x\ket{1\oplus f(x)}$, so $U_f\ket x\ket- = \ket x\,\tfrac{1}{\sqrt2}\bigl(\ket{f(x)} - \ket{1\oplus f(x)}\bigr)$. If $f(x) = 0$ this is $\ket x\ket-$; if $f(x) = 1$ it is $\ket x\,\tfrac{1}{\sqrt2}(\ket1 - \ket0) = -\ket x\ket-$. The general case follows by linearity.
:::

For $x, y \in \{0,1\}^n$ write $x\cdot y = x_1y_1\oplus\dots\oplus x_ny_n$, the inner product mod $2$.

::: lemma The Hadamard transform {#lem-hadamard}
For every $x\in\{0,1\}^n$,
$$
H^{\otimes n}\ket x = \frac{1}{\sqrt{2^n}}\sum_{y\in\{0,1\}^n}(-1)^{x\cdot y}\ket y .
$$ {#eq-hadamard}
Moreover, $\sum_{x\in\{0,1\}^n}(-1)^{x\cdot y}$ equals $2^n$ if $y = 0^n$ and $0$ otherwise.
:::

::: proof
For one qubit, $H\ket{x_j} = \tfrac{1}{\sqrt2}(\ket0 + (-1)^{x_j}\ket1) = \tfrac{1}{\sqrt2}\sum_{y_j\in\{0,1\}}(-1)^{x_jy_j}\ket{y_j}$. Taking the tensor product over $j = 1, \dots, n$ and expanding,
$$
H^{\otimes n}\ket x = \bigotimes_{j=1}^n\frac{1}{\sqrt2}\sum_{y_j}(-1)^{x_jy_j}\ket{y_j} = \frac{1}{\sqrt{2^n}}\sum_y(-1)^{x_1y_1 + \dots + x_ny_n}\ket y,
$$
and $(-1)^{x_1y_1 + \dots + x_ny_n} = (-1)^{x\cdot y}$. For the second claim, if $y = 0^n$ every term is $1$. Otherwise pick $j$ with $y_j = 1$; flipping bit $j$ of $x$ is a bijection of $\{0,1\}^n$ that changes $x\cdot y$ by $1$, so it pairs the terms into pairs that cancel.
:::

In particular $H^{\otimes n}\ket{0^n} = 2^{-n/2}\sum_x\ket x$, the uniform superposition, and since $H^{\otimes n}$ is its own inverse, $H^{\otimes n}$ maps $2^{-n/2}\sum_x(-1)^{x\cdot s}\ket x$ back to $\ket s$.

## Deutsch and Deutsch–Jozsa

The case $n = 1$ is **Deutsch's problem**: given $f\colon\{0,1\}\to\{0,1\}$, decide whether $f(0) = f(1)$. Classically that needs both values, two queries.

::: example Deutsch's algorithm {#ex-deutsch}
Start with $\ket0\ket1$, apply $H\otimes H$, query $U_f$ once, apply $H$ to the first qubit and measure it. Show that the outcome is $0$ if $f(0) = f(1)$ and $1$ otherwise.
::: solution
After $H\otimes H$ the state is $\ket+\ket-$. By [[#lem-kickback]] the query gives $\tfrac{1}{\sqrt2}\bigl((-1)^{f(0)}\ket0 + (-1)^{f(1)}\ket1\bigr)\ket-$. Pull out the global phase $(-1)^{f(0)}$: the first qubit is $\tfrac{1}{\sqrt2}(\ket0 + (-1)^{f(0)\oplus f(1)}\ket1)$, which is $\ket+$ if $f(0) = f(1)$ and $\ket-$ otherwise. The final $H$ maps these to $\ket0$ and $\ket1$. One query has computed $f(0)\oplus f(1)$, a *global* property of $f$, without learning either value: the measurement outcome tells us nothing about $f(0)$ itself. This trade — one bit about how values relate, none about the values — is typical.
:::
:::

For $n$ bits, the promise problem is as in the introduction.

::: algorithm Deutsch–Jozsa algorithm {#alg-dj}
Input: an oracle $U_f$ for $f\colon\{0,1\}^n\to\{0,1\}$, promised constant or balanced.
1. Prepare $\ket{0^n}\ket1$ and apply $H^{\otimes(n+1)}$.
2. Apply $U_f$ once.
3. Apply $H^{\otimes n}$ to the first $n$ qubits and measure them.
4. Output "constant" if the result is $0^n$, otherwise "balanced".
:::

::: theorem Correctness of Deutsch–Jozsa {#thm-dj}
[[#alg-dj]] uses one query and is always correct. The amplitude of $\ket{0^n}$ in the input register before measurement is $2^{-n}\sum_x(-1)^{f(x)}$, which is $\pm1$ if $f$ is constant and $0$ if $f$ is balanced.
:::

::: proof
After step 1 the state is $2^{-n/2}\sum_x\ket x\otimes\ket-$, and after step 2, by [[#lem-kickback]], $2^{-n/2}\sum_x(-1)^{f(x)}\ket x\otimes\ket-$. By [[#lem-hadamard]], step 3 produces
$$
\frac{1}{2^n}\sum_y\Bigl(\sum_x(-1)^{f(x) + x\cdot y}\Bigr)\ket y\otimes\ket- .
$$
The coefficient of $y = 0^n$ is $2^{-n}\sum_x(-1)^{f(x)}$. If $f$ is constant with value $c$ it is $(-1)^c$, of modulus $1$, so the outcome is $0^n$ with certainty. If $f$ is balanced, $2^{n-1}$ terms are $+1$ and $2^{n-1}$ are $-1$, the coefficient is $0$, and the outcome is never $0^n$.
:::

The simulator below implements $U_f$ with `permute`: with the target as the last qubit, basis index $i$ encodes $x = i \gg 1$ and $y = i \mathbin{\&} 1$, and $U_f$ flips the last bit when $f(x) = 1$.

```python
from qsim import *

def query(s, f, n):                 # U_f |x>|y> = |x>|y xor f(x)>, target = last qubit
    permute(s, lambda i: i ^ f(i >> 1))

def deutsch_jozsa(f, n):
    s = zeros(n + 1)
    apply(s, X, n)                                  # target |1>
    for q in range(n + 1): apply(s, H, q)           # inputs |+>^n, target |->
    query(s, f, n)                                  # ONE query: phase (-1)^f(x)
    for q in range(n): apply(s, H, q)
    p0 = sum(probs(s)[0:2])                         # P(input register = 0...0)
    return round(p0, 6)

n = 3
tests = {"constant 0": lambda x: 0, "constant 1": lambda x: 1,
         "parity x0^x1^x2": lambda x: bin(x).count("1") % 2,
         "first bit x0": lambda x: x >> 2,
         "balanced table": lambda x: [1, 1, 1, 0, 1, 0, 0, 0][x],
         "NOT balanced": lambda x: int(x == 5)}           # breaks the promise
for name, f in tests.items():
    ones = sum(f(x) for x in range(2 ** n))
    print(f"{name:16} (f=1 on {ones} of 8 inputs): P(all zeros) = {deutsch_jozsa(f, n)}")
```

```console
$ python3 deutsch_jozsa.py
constant 0       (f=1 on 0 of 8 inputs): P(all zeros) = 1.0
constant 1       (f=1 on 8 of 8 inputs): P(all zeros) = 1.0
parity x0^x1^x2  (f=1 on 4 of 8 inputs): P(all zeros) = 0.0
first bit x0     (f=1 on 4 of 8 inputs): P(all zeros) = 0.0
balanced table   (f=1 on 4 of 8 inputs): P(all zeros) = 0.0
NOT balanced     (f=1 on 1 of 8 inputs): P(all zeros) = 0.5625
```

The last line shows what happens outside the promise: with $f = 1$ on $k$ of the $2^n$ inputs the amplitude is $(2^n - 2k)/2^n$, here $6/8$, and the probability $(6/8)^2 = 0.5625$. The algorithm then answers "constant" more often than not, for a function that is neither. Promises are an essential part of these problems.

::: theorem Classical query complexity of Deutsch–Jozsa {#thm-dj-classical}
Every deterministic classical algorithm for the Deutsch–Jozsa problem makes at least $2^{n-1} + 1$ queries in the worst case. On the other hand, the randomised algorithm that queries $k$ uniformly random inputs and answers "constant" if all answers agree errs with probability at most $2^{1-k}$.
:::

::: proof
*Lower bound.* Consider an adversary that answers $0$ to every query. If the algorithm stops after $q \le 2^{n-1}$ distinct queries, both the constant function $0$ and a balanced function — $0$ on the queried inputs (and on $2^{n-1} - q$ further ones), $1$ on the remaining $2^{n-1}$ — are consistent with everything it saw, and the algorithm gives the same answer on both, so it is wrong on one of them. Hence it needs $2^{n-1} + 1$ queries, and $2^{n-1} + 1$ suffice.

*Randomised upper bound.* A constant function always gives agreeing answers, so the algorithm is never wrong on it. For a balanced $f$, each random query returns $0$ or $1$ with probability $1/2$ independently, and all $k$ answers agree with probability $2\cdot 2^{-k} = 2^{1-k}$.
:::

::: warning Deutsch–Jozsa is not an exponential speed-up over randomised algorithms
The exponential gap of [[#thm-dj]] and [[#thm-dj-classical]] is against **deterministic exact** classical algorithms. Allowing a small error, a classical algorithm needs only a constant number of queries: $k = 2$ gives error $1/2$, $k = 11$ gives error below $0.001$. So Deutsch–Jozsa shows $Q_E \ll D$, but not $Q \ll R$. The first exponential separation against bounded-error randomised algorithms came with Bernstein and Vazirani's *recursive* version of the next problem (superpolynomial) and with Simon's algorithm (exponential). When you read a claim of "quantum speed-up", ask: compared with which classical model, and on which inputs?
:::

## Bernstein–Vazirani

Now suppose $f(x) = s\cdot x$ for a hidden string $s\in\{0,1\}^n$. Classically, querying $f(e_j)$ on the unit vectors $e_j$ reveals one bit $s_j$ per query, and no classical algorithm can do better, because each query returns one bit and there are $2^n$ possible secrets.

::: theorem Bernstein–Vazirani {#thm-bv}
The circuit of [[#alg-dj]] applied to $f(x) = s\cdot x$ outputs $s$ with probability $1$ after one query. Every classical algorithm (deterministic or randomised) that makes $q$ queries outputs $s$ correctly with probability at most $2^{q-n}$ for a uniformly random $s$; so $n$ queries are needed for certainty and at least $n - 1$ for success probability $1/2$.
:::

::: proof
*Quantum.* By [[#lem-kickback]] the query produces $2^{-n/2}\sum_x(-1)^{s\cdot x}\ket x\ket-$, which is $H^{\otimes n}\ket s\otimes\ket-$ by [[#eq-hadamard]]. Since $H^{\otimes n}$ is its own inverse, step 3 leaves $\ket s\ket-$, and measuring gives $s$.

*Classical.* Fix a deterministic algorithm with $q$ queries. Its behaviour is a binary decision tree of depth $q$ (each query has two possible answers and determines the next query), with an output at each of at most $2^q$ leaves. Each secret $s$ leads to one leaf, and the algorithm is correct on $s$ only if that leaf's output is $s$; since a leaf has one output, it is correct on at most $2^q$ secrets, a fraction $2^{q-n}$ of them. A randomised algorithm is a probability distribution over deterministic ones, so its success probability on a uniformly random $s$ is an average of numbers at most $2^{q-n}$.
:::

::: example Bernstein–Vazirani by hand for two bits {#ex-bv-hand}
Trace the Bernstein–Vazirani circuit for $n = 2$ and $s = 10$, so $f(x_1x_2) = x_1$, writing the input register after each step.
::: solution
After the first Hadamards the input register is $\tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$ and the target is $\ket-$. The query multiplies each term by $(-1)^{f(x)} = (-1)^{x_1}$:
$$
\tfrac12(\ket{00} + \ket{01} - \ket{10} - \ket{11}) = \tfrac{1}{\sqrt2}(\ket0 - \ket1)\otimes\tfrac{1}{\sqrt2}(\ket0 + \ket1) = \ket-\ket+ .
$$
The final $H\otimes H$ maps $\ket-\ket+$ to $\ket1\ket0$, and the measurement gives $10 = s$. In general the phase pattern $(-1)^{s\cdot x}$ is a product state $\bigotimes_j H\ket{s_j}$ — each qubit independently in $\ket+$ or $\ket-$ according to $s_j$ — so Bernstein–Vazirani creates no entanglement in the input register at all. Its power comes from the single query writing all $n$ bits of $s$ into relative phases at once.
:::
:::

```python
from qsim import *

def bernstein_vazirani(f, n):
    s = zeros(n + 1); apply(s, X, n)
    for q in range(n + 1): apply(s, H, q)
    permute(s, lambda i: i ^ f(i >> 1))            # one query to U_f
    for q in range(n): apply(s, H, q)
    p = probs(s)
    best = max(range(len(p)), key=p.__getitem__)
    return format(best >> 1, f"0{n}b"), round(p[best] + p[best ^ 1], 6)

secret = 0b101101
n = 6
dot = lambda x: bin(x & secret).count("1") % 2      # f(x) = s . x mod 2
s_hat, p = bernstein_vazirani(dot, n)
print(f"recovered s = {s_hat} with probability {p}")
```

```console
$ python3 bernstein_vazirani.py
recovered s = 101101 with probability 1.0
```

The gap here is only $1$ against $n$ — polynomial. Its importance is structural: the Hadamard transform turns a *phase pattern* $(-1)^{s\cdot x}$ spread over all $2^n$ inputs into a *single basis state*. Composing the problem with itself recursively, Bernstein and Vazirani (1993, journal version 1997) obtained the first oracle problem that quantum computers solve in polynomial time but bounded-error classical ones need $n^{\Omega(\log n)}$ queries for ([[quantum-computing/quantum-complexity]]).

::: quiz
In the Bernstein–Vazirani circuit, the oracle is accidentally implemented for $f(x) = s\cdot x \oplus 1$ instead of $s\cdot x$. What does the circuit output?
- [x] $s$, with probability $1$
- [ ] the complement of $s$
- [ ] a uniformly random string
- [ ] $0^n$
::: solution
The phase becomes $(-1)^{s\cdot x\oplus1} = -(-1)^{s\cdot x}$, a global sign on the whole state, which is unobservable ([[quantum-computing/qubits#prop-global-phase]]). The output is still $s$. In general, adding a constant to $f$ never changes the output distribution of these algorithms.
:::
:::

## Simon's algorithm

Simon's problem hides a string in a function's *collisions* rather than in its values.

::: definition Simon's problem {#def-simon}
Given an oracle for $f\colon\{0,1\}^n\to\{0,1\}^n$ with the promise that there is a non-zero $s\in\{0,1\}^n$ such that for all $x \ne x'$,
$$
f(x) = f(x') \iff x' = x\oplus s ,
$$
find $s$. So $f$ is two-to-one, and its two preimages of every value differ by the hidden **XOR period** $s$.
:::

The figure shows such a function for $n = 3$ and $s = 110$: the inputs come in pairs $\{x, x\oplus 110\}$ with a common value, and nothing about the values themselves reveals $s$.

::: widget mapping
domain: 000; 001; 010; 011; 100; 101; 110; 111
codomain: a; b; c; d; e; f; g; h
map: 000>c; 110>c; 001>g; 111>g; 010>a; 100>a; 011>e; 101>e
editable: false
caption: A Simon function on three bits with hidden period $s = 110$: each output value has exactly the two preimages $x$ and $x\oplus110$. A classical algorithm learns about $s$ only when it happens to query both members of a pair, which takes about $2^{n/2}$ queries; Simon's algorithm instead samples strings $y$ with $y\cdot s = 0$ — here $y\in\{000, 001, 110, 111\}$.
:::

::: algorithm Simon's algorithm {#alg-simon}
1. Repeat the following quantum subroutine until the outputs $y^{(1)}, y^{(2)}, \dots$ span a space of dimension $n - 1$ (checked by Gaussian elimination over $\F_2$):
   1. Prepare $\ket{0^n}\ket{0^n}$ and apply $H^{\otimes n}$ to the first register.
   2. Apply $U_f$, giving $2^{-n/2}\sum_x\ket x\ket{f(x)}$.
   3. (Optionally) measure the second register.
   4. Apply $H^{\otimes n}$ to the first register, measure it, and record the result $y$.
2. Solve the linear system $y^{(i)}\cdot s = 0$ over $\F_2$ for its unique non-zero solution $s$.
:::

::: lemma One run of Simon's subroutine {#lem-simon}
Each run of the subroutine outputs a uniformly random $y$ among the $2^{n-1}$ strings with $y\cdot s = 0$, independently of the other runs.
:::

::: proof
Measuring the second register in step 3 gives some value $f(x_0)$ and, by [[quantum-computing/entanglement#eq-partial]], leaves the first register in $\tfrac{1}{\sqrt2}(\ket{x_0} + \ket{x_0\oplus s})$, with $x_0$ uniformly random. (If step 3 is skipped, the outcome distribution of the first register is the same, by [[quantum-computing/quantum-circuits#prop-deferred]] or by no-signalling, since the second register is never touched again.) By [[#lem-hadamard]], $H^{\otimes n}$ gives
$$
\frac{1}{\sqrt{2^{n+1}}}\sum_y\Bigl((-1)^{x_0\cdot y} + (-1)^{(x_0\oplus s)\cdot y}\Bigr)\ket y = \frac{1}{\sqrt{2^{n+1}}}\sum_y(-1)^{x_0\cdot y}\bigl(1 + (-1)^{s\cdot y}\bigr)\ket y ,
$$
using $(x_0\oplus s)\cdot y = x_0\cdot y\oplus s\cdot y$. The amplitude of $\ket y$ is $0$ when $s\cdot y = 1$ and has modulus $2/\sqrt{2^{n+1}} = 2^{-(n-1)/2}$ when $s\cdot y = 0$, so each of the $2^{n-1}$ strings orthogonal to $s$ has probability $2^{-(n-1)}$, whatever $x_0$ was. Runs start afresh, so they are independent.
:::

::: theorem Simon's algorithm uses $O(n)$ queries {#thm-simon}
The vectors orthogonal to $s$ form a subspace $s^\perp$ of $\F_2^n$ of dimension $n - 1$ whose only non-zero orthogonal vector is $s$. [[#alg-simon]] therefore outputs $s$ correctly, after an expected number of queries less than $n + 0.61$; and any $n - 1$ runs already succeed with probability $\prod_{k=1}^{n-1}(1 - 2^{-k}) > 0.288$. The classical post-processing takes $O(n^3)$ bit operations.
:::

::: proof
$s^\perp$ is the kernel of the non-zero linear map $y\mapsto s\cdot y$, so it has dimension $n - 1$; the vectors orthogonal to all of $s^\perp$ form a space of dimension $n - (n-1) = 1$, which contains $s$, so it is $\{0, s\}$. Hence once the samples span $s^\perp$, the system $y^{(i)}\cdot z = 0$ has exactly the solutions $z \in \{0, s\}$.

By [[#lem-simon]] the samples are independent uniform elements of $s^\perp \cong \F_2^{n-1}$. If the samples so far span a subspace of dimension $k < n - 1$ (which has $2^k$ elements), the next sample lies outside it with probability $1 - 2^{k-(n-1)}$, so the expected number of samples to raise the dimension from $k$ to $k + 1$ is $1/(1 - 2^{k-n+1})$. Summing over $k = 0, \dots, n-2$ and putting $j = n - 1 - k$, the expected total is
$$
\sum_{j=1}^{n-1}\frac{1}{1 - 2^{-j}} = (n - 1) + \sum_{j=1}^{n-1}\frac{1}{2^j - 1} < (n - 1) + 1.607 .
$$
Similarly, $n - 1$ samples are independent with probability $\prod_{k=0}^{n-2}(1 - 2^{k-n+1}) = \prod_{j=1}^{n-1}(1 - 2^{-j})$, and this decreasing product converges to $0.2887\ldots$. Gaussian elimination on $n - 1$ vectors of $n$ bits costs $O(n^3)$ bit operations.
:::

::: theorem Classical lower bound for Simon's problem {#thm-simon-classical}
Any classical randomised algorithm that finds $s$ with probability at least $2/3$ must make $\Omega(2^{n/2})$ queries.
:::

::: proof
(Sketch.) Choose $s$ uniformly among the $2^n - 1$ non-zero strings and $f$ uniformly among Simon functions with period $s$. Consider any algorithm making queries $x_1, x_2, \dots$, and suppose no collision $f(x_i) = f(x_j)$ has occurred among the first $i$ distinct queries. Then all the algorithm knows is that $s \notin \{x_j\oplus x_k : j < k \le i\}$ and that the answers were distinct values; by symmetry, $s$ is uniform over the remaining at least $2^n - 1 - \binom{i}{2}$ candidates. The next query $x_{i+1}$ produces a collision only if $s = x_{i+1}\oplus x_j$ for some $j \le i$, an event of probability at most $i/(2^n - 1 - \binom i2)$. So the probability of any collision within $q$ queries is at most $\sum_{i<q} i/(2^n - q^2) \le q^2/(2^n - q^2)$. Without a collision the output is a guess among at least $2^n - 1 - q^2$ candidates. For $q \le 2^{n/2}/2$ the total success probability is at most $\tfrac{1/4}{3/4} + \tfrac{1}{2^n - 2^n/4 - 1}$, about $1/3$, below $2/3$. So $q = \Omega(2^{n/2})$. Fixing the randomness of a randomised algorithm reduces to this deterministic case, and Yao's principle completes the argument. A matching classical algorithm queries random inputs until a collision appears, using $O(2^{n/2})$ queries by the birthday bound.
:::

::: example Simon's algorithm by hand {#ex-simon-hand}
For the function in the figure ($n = 3$, $s = 110$), suppose two runs of the subroutine return $y^{(1)} = 001$ and $y^{(2)} = 111$. Recover $s$.
::: solution
The equations $y\cdot s = 0$ are $s_3 = 0$ (from $001$, writing $s = s_1s_2s_3$) and $s_1\oplus s_2\oplus s_3 = 0$ (from $111$). The two vectors are independent, so they span $s^\perp$, which has dimension $2$. Substituting $s_3 = 0$ gives $s_1 = s_2$, so the solutions are $000$ and $110$; the non-zero one is $s = 110$. Had the second run returned $000$ or $001$ again, it would have added nothing, and we would run again; by [[#lem-simon]] each run returns one of the four strings $000, 001, 110, 111$, each with probability $1/4$.
:::
:::

::: example Simon's algorithm in the simulator {#ex-simon-sim}
Run [[#alg-simon]] for $n = 4$ with hidden period $s = 1011$, the function values relabelled at random so that they do not reveal $s$, and record the queries needed.
::: solution
The registers are $8$ qubits ($256$ amplitudes); input $x$ is the top $4$ bits of the index. Gaussian elimination keeps a basis keyed by leading bit; a sample is "new" if it is not in the span so far.

```python
from qsim import *

def simon_sample(f, n, rng):        # one run of the quantum circuit: returns y with y.s = 0
    s = zeros(2 * n)
    for q in range(n): apply(s, H, q)
    permute(s, lambda i: i ^ f(i >> n))              # |x>|z> -> |x>|z xor f(x)>
    for q in range(n): apply(s, H, q)
    for q in range(2 * n): measure(s, q, rng)        # measure everything
    return max(range(len(s)), key=lambda i: abs(s[i])) >> n

def add_to_basis(basis, y):          # Gaussian elimination over GF(2), keyed by leading bit
    for b in sorted(basis, reverse=True):
        y = min(y, y ^ basis[b])
    if y: basis[y.bit_length() - 1] = y
    return bool(y)

def solve(basis, n):     # non-zero s orthogonal to all rows (brute force; fine for small n)
    for cand in range(1, 2 ** n):
        if all(bin(cand & r).count("1") % 2 == 0 for r in basis.values()):
            return cand

n, secret = 4, 0b1011
labels = random.Random(0).sample(range(2 ** n), 2 ** n)  # hide the structure of f
f = lambda x: labels[min(x, x ^ secret)]                 # f(x) = f(x xor s), 2-to-1
rng = random.Random(42)
for trial in range(3):
    basis, queries = {}, 0
    while len(basis) < n - 1:
        y = simon_sample(f, n, rng); queries += 1
        new = add_to_basis(basis, y)
        print(f"  y = {y:04b}  (y.s = {bin(y & secret).count('1') % 2})" + ("  new" if new else ""))
    print(f"trial {trial}: s = {solve(basis, n):04b} after {queries} queries")
```

```console
$ python3 simon.py
  y = 0111  (y.s = 0)  new
  y = 1110  (y.s = 0)  new
  y = 1001  (y.s = 0)
  y = 0111  (y.s = 0)
  y = 0011  (y.s = 0)  new
trial 0: s = 1011 after 5 queries
  y = 0111  (y.s = 0)  new
  y = 0111  (y.s = 0)
  y = 1010  (y.s = 0)  new
  y = 0011  (y.s = 0)  new
trial 1: s = 1011 after 4 queries
  y = 0100  (y.s = 0)  new
  y = 0100  (y.s = 0)
  y = 1110  (y.s = 0)  new
  y = 0000  (y.s = 0)
  y = 1010  (y.s = 0)
  y = 0100  (y.s = 0)
  y = 0000  (y.s = 0)
  y = 0011  (y.s = 0)  new
trial 2: s = 1011 after 8 queries
```

Every sample satisfies $y\cdot s = 0$, as [[#lem-simon]] predicts. Some samples are wasted — $1001 = 0111\oplus1110$ was already in the span, and $0000$ is always useless — and the three trials needed $5$, $4$ and $8$ queries, against the expected $\sum_{j=1}^{3}1/(1 - 2^{-j}) = 2 + 4/3 + 8/7 \approx 4.5$. (The `solve` function tries all $2^n$ candidates for brevity; for large $n$ one back-substitutes in the echelon form, in $O(n^2)$ time.) A classical algorithm needs on the order of $2^{n/2} = 4$ queries here, so the advantage is invisible at $n = 4$; at $n = 100$ it is $\approx 100$ queries against $\approx 2^{50}$.
:::
:::

The figure shows how quickly the samples span $s^\perp$.

::: widget plot
f: max(0, prod(1 - 2^(k - x), k, 0, n - 2))
x: 1, 30
y: 0, 1
sliders: n=10:2:24:1
labels: \Prob(x \text{ samples span } s^\perp)
caption: The probability that $x$ independent uniform samples from $s^\perp$ (dimension $n - 1$) span it, $\prod_{k=0}^{n-2}(1 - 2^{k-x})$, read at integer $x \ge n - 1$. It is about $0.29$ at $x = n - 1$ and rises to nearly $1$ a few samples later, for every $n$: Simon's algorithm needs $n + O(1)$ queries, while classical algorithms need about $2^{n/2}$.
:::

## Why interference helps

All three algorithms have the same shape: Hadamards, one query, Hadamards, measure. The first layer spreads amplitude evenly over all inputs, so the query writes the whole table of $f$ into phases (or, for Simon, into an entangled register). The second layer is a **Fourier transform** over the group $\F_2^n$ — the characters of that group are exactly the functions $x\mapsto(-1)^{x\cdot y}$ — and it concentrates amplitude on the $y$ that describe *global* structure of $f$: whether it is constant, which linear function it is, which subgroup it is periodic under. Wrong answers are suppressed because their contributions $(-1)^{f(x) + x\cdot y}$ cancel in the sum over $x$, exactly as the second Hadamard cancelled $\ket1$ in [[quantum-computing/qubits#ex-interference]].

This is **Fourier sampling**, and it generalises. Simon's problem is an instance of the **hidden subgroup problem**: given $f$ on a group $G$ that is constant on the cosets of an unknown subgroup $K$ and distinct on different cosets, find $K$ (here $G = \F_2^n$, $K = \{0, s\}$). Replacing $\F_2^n$ by the cyclic group $\Z_N$ and the Hadamard transform by the quantum Fourier transform over $\Z_N$ gives Shor's order-finding algorithm, where $f(x) = a^x \bmod N$ is periodic with period equal to the order of $a$. The hidden subgroup problem is solved efficiently for all finite abelian groups; for some non-abelian groups — the symmetric group (which would give graph isomorphism) and the dihedral group (related to lattice problems) — no efficient quantum algorithm is known.

::: history
David Deutsch's 1985 paper "Quantum theory, the Church–Turing principle and the universal quantum computer" defined the quantum Turing machine and gave the first quantum algorithm, a version of Deutsch's problem that succeeded with probability $1/2$; the deterministic version with one query appeared in a 1998 paper of Cleve, Ekert, Macchiavello and Mosca. Deutsch and Richard Jozsa published the $n$-bit problem in 1992. Ethan Bernstein and Umesh Vazirani's "Quantum complexity theory" (STOC 1993; SIAM Journal on Computing 1997) founded quantum complexity theory, defining $\mathsf{BQP}$ and giving recursive Fourier sampling as the first superpolynomial oracle separation from $\mathsf{BPP}$. Daniel Simon's "On the power of quantum computation" (FOCS 1994; SIAM Journal on Computing 1997) gave an exponential separation from bounded-error classical algorithms. Simon's paper was at first rejected by a conference; Peter Shor, who had seen it, generalised its idea from $\F_2^n$ to $\Z_N$ to obtain the factoring algorithm within months.
:::

## Where this leads

[[quantum-computing/shor]] replaces the Hadamard transform by the quantum Fourier transform over $\Z_{2^t}$ and uses phase kickback from controlled modular multiplications to estimate eigenvalues, turning the period-finding idea of Simon's algorithm into a polynomial-time factoring algorithm. [[quantum-computing/grover]] shows a different use of the phase oracle $O_f$ — repeated reflections — for problems with no structure at all, and proves that there the speed-up is only quadratic. [[quantum-computing/quantum-complexity]] places these oracle separations among the classical complexity classes, explaining both what they prove ($\mathsf{BQP}$ differs from $\mathsf{BPP}$ relative to oracles) and what they do not (anything about $\mathsf{P}$ versus $\mathsf{BQP}$ without oracles).

::: summary
- In the **query model** the input is a black-box function and cost is the number of queries; quantum queries apply $U_f$ to superpositions, and lower bounds can be proved.
- **Phase kickback** ([[#lem-kickback]]) turns $U_f$ with target $\ket-$ into the phase oracle $\ket x\mapsto(-1)^{f(x)}\ket x$; the **Hadamard transform** ([[#lem-hadamard]]) maps $\ket x$ to $2^{-n/2}\sum_y(-1)^{x\cdot y}\ket y$.
- **Deutsch–Jozsa** decides constant versus balanced with one query and certainty ([[#thm-dj]]); deterministic classical algorithms need $2^{n-1} + 1$, but randomised ones need only $O(1)$ for small error ([[#thm-dj-classical]]).
- **Bernstein–Vazirani** finds $s$ from $f(x) = s\cdot x$ with one query against $n$ classically ([[#thm-bv]]).
- **Simon's algorithm** samples $y\perp s$ uniformly ([[#lem-simon]]) and finds the XOR period with $n + O(1)$ expected queries ([[#thm-simon]]); every classical algorithm needs $\Omega(2^{n/2})$ ([[#thm-simon-classical]]) — an exponential separation.
- All three are **Fourier sampling**: a Fourier transform over $\F_2^n$ makes wrong answers interfere destructively. Over $\Z_N$ the same idea gives Shor's algorithm.
:::

## Exercises

::: exercise Deutsch for the NOT function {level=1}
Trace Deutsch's algorithm ([[#ex-deutsch]]) for $f(x) = 1\oplus x$, writing the state after each step.
::: solution
$\ket0\ket1 \to \ket+\ket-$. Query: $\tfrac{1}{\sqrt2}((-1)^{1}\ket0 + (-1)^{0}\ket1)\ket- = -\tfrac{1}{\sqrt2}(\ket0 - \ket1)\ket- = -\ket-\ket-$. $H$ on the first qubit: $-\ket1\ket-$. The measurement gives $1$: $f(0)\ne f(1)$, correctly. The global sign $-1$ is unobservable.
:::
:::

::: exercise Breaking the promise {level=1 check="9/16"}
In the Deutsch–Jozsa algorithm with $n = 3$, $f$ equals $1$ on exactly one input and $0$ elsewhere. What is the probability of measuring $000$? (Enter a fraction.)
::: solution
By [[#thm-dj]] the amplitude of $\ket{000}$ is $2^{-3}\sum_x(-1)^{f(x)} = (7 - 1)/8 = 3/4$, so the probability is $9/16 = 0.5625$, as the simulation printed.
:::
:::

::: exercise Deterministic queries {level=1 check="513"}
How many queries does an optimal deterministic classical algorithm need, in the worst case, to solve the Deutsch–Jozsa problem for $n = 10$? (Enter a number.)
::: solution
By [[#thm-dj-classical]], $2^{n-1} + 1 = 2^9 + 1 = 513$. If the first $512$ answers are all equal the function could still be either constant or balanced; the $513$th settles it.
:::
:::

::: exercise Randomised queries {level=1 check="21"}
The randomised algorithm of [[#thm-dj-classical]] queries $k$ random inputs. What is the smallest $k$ that guarantees error probability at most $2^{-20}$? (Enter a number.)
::: solution
We need $2^{1-k} \le 2^{-20}$, i.e. $k \ge 21$. Twenty-one classical queries achieve an error rate far below what any current quantum hardware could achieve in running the one-query quantum algorithm.
:::
:::

::: exercise Waiting for a basis {level=2 check="10/3"}
In Simon's algorithm with $n = 3$, each run returns a uniformly random element of the $4$-element space $s^\perp$ (including $000$). What is the expected number of runs until the samples span $s^\perp$? (Enter a fraction.)
::: solution
We need dimension $2$. The first useful sample is any non-zero vector: probability $3/4$ per run, expected $4/3$ runs. Then we need a vector outside the span $\{0, v\}$: probability $2/4$, expected $2$ runs. Total $4/3 + 2 = 10/3$, matching the formula $\sum_{j=1}^{2}1/(1 - 2^{-j}) = 2 + 4/3$ of [[#thm-simon]].
:::
:::

::: exercise Bernstein–Vazirani with an affine function {level=2}
Show that if $f(x) = s\cdot x\oplus b$ for an unknown bit $b$, the Bernstein–Vazirani circuit still outputs $s$ with certainty. How many queries in total suffice to learn both $s$ and $b$, and how many does a classical algorithm need?
::: solution
The phase $(-1)^{s\cdot x\oplus b} = (-1)^b(-1)^{s\cdot x}$ differs from the case $b = 0$ by a global sign, so the output is again $s$ with certainty (as in the quiz). Then one classical query, $f(0^n) = b$, gives $b$; in total two queries learn the affine function, against $n + 1$ classically (the $n + 1$ values $f(0), f(e_1), \dots, f(e_n)$ are necessary and sufficient, by the decision-tree argument of [[#thm-bv]] applied to the $2^{n+1}$ possible functions).
:::
:::

::: exercise The second half of the Hadamard lemma {level=2}
Use [[#lem-hadamard]] to show that $H^{\otimes n}$ is unitary by computing $\bra{x'}H^{\otimes n}H^{\otimes n}\ket x$ directly, and to show that $H^{\otimes n}$ maps the uniform superposition over a subspace $V\subseteq\F_2^n$ to the uniform superposition over $V^\perp$.
::: solution
Since $H^{\otimes n}$ is real and symmetric, $\bra{x'}H^{\otimes n}H^{\otimes n}\ket x = \sum_y\bra{x'}H^{\otimes n}\ket y\bra yH^{\otimes n}\ket x = 2^{-n}\sum_y(-1)^{(x\oplus x')\cdot y}$, which is $1$ if $x = x'$ and $0$ otherwise by the second claim of the lemma: $H^{\otimes n}H^{\otimes n} = I$. For a subspace $V$ of dimension $k$, $H^{\otimes n}\,2^{-k/2}\sum_{v\in V}\ket v = 2^{-(n+k)/2}\sum_y\bigl(\sum_{v\in V}(-1)^{v\cdot y}\bigr)\ket y$. The inner sum is a sum of a character over the group $V$: it is $\lvert V\rvert = 2^k$ if $v\cdot y = 0$ for all $v\in V$ (i.e. $y\in V^\perp$) and $0$ otherwise (by the same pairing argument, restricted to $V$). So the result is $2^{(k-n)/2}\sum_{y\in V^\perp}\ket y$, uniform over $V^\perp$, which has $2^{n-k}$ elements.
:::
:::

::: exercise Hidden subspaces {level=3}
Generalise Simon's problem: $f\colon\F_2^n\to\{0,1\}^m$ is constant on the cosets $x + K$ of an unknown subspace $K$ of dimension $k$ and takes different values on different cosets. Show that Simon's subroutine returns a uniformly random element of $K^\perp$ and that $O(n)$ queries determine $K$.
::: solution
After the query and a measurement of the second register, the first register is $2^{-k/2}\sum_{v\in K}\ket{x_0\oplus v}$ for a random coset representative $x_0$. Applying $H^{\otimes n}$ gives, as in the previous exercise, $2^{-(n+k)/2}\sum_y(-1)^{x_0\cdot y}\sum_{v\in K}(-1)^{v\cdot y}\ket y = 2^{(k-n)/2}\sum_{y\in K^\perp}(-1)^{x_0\cdot y}\ket y$: uniform over $K^\perp$, of dimension $n - k$. As in [[#thm-simon]], an expected $n - k + O(1)$ runs give a basis of $K^\perp$, and $K = (K^\perp)^\perp$ is the solution space of the resulting linear system, computed by Gaussian elimination. This is the abelian hidden subgroup problem for $\F_2^n$.
:::
:::

::: exercise A lower bound for Bernstein–Vazirani with randomness {level=3}
Show that a classical randomised algorithm for Bernstein–Vazirani that succeeds with probability at least $1/2$ on every $s$ must make at least $n - 1$ queries, and explain why the quantum algorithm cannot be used to learn more than $n$ bits about $f$ with one query.
::: solution
If an algorithm succeeds with probability at least $1/2$ on every $s$, it does so on average over a uniformly random $s$. By [[#thm-bv]] the average success probability with $q$ queries is at most $2^{q-n}$, so $2^{q-n} \ge 1/2$ and $q \ge n - 1$. For the second part: the quantum algorithm ends by measuring $n$ qubits (the target is in $\ket-$ and carries nothing), and by Holevo's bound ([[quantum-computing/qubits]]) an $n$-qubit state yields at most $n$ bits of information. One query reveals all $n$ bits of $s$ — the maximum possible — because the problem is arranged so that every bit of the output is useful; for a general $f$, a single query cannot reveal its $2^n$-bit truth table.
:::
:::
