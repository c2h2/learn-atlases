The security of RSA rests on a bet: that multiplying two large primes is easy but recovering them from their product is not. The best classical factoring algorithm known, the general number field sieve, takes time about $\exp\bigl(c\,(\ln N)^{1/3}(\ln\ln N)^{2/3}\bigr)$ to factor $N$ — subexponential, but hopeless for the 2048-bit moduli in use today ([[cryptography/number-theory]]). In 1994 Peter Shor showed that a quantum computer could factor $N$ in time polynomial in $\log N$, and compute discrete logarithms too, breaking RSA, Diffie–Hellman and elliptic-curve cryptography alike. No quantum computer yet built is anywhere near large enough to do so (see [[quantum-computing/quantum-hardware]]), but the algorithm changed the field overnight: it was the first evidence that quantum computers could solve a problem of real importance that is believed to be classically hard.

Shor's algorithm has three layers, and this chapter builds them in turn. The **quantum Fourier transform** (QFT) is the Fourier transform over $\Z_{2^t}$, computed by a circuit of only $O(t^2)$ gates. **Phase estimation** uses the QFT and phase kickback to read off the eigenvalue $e^{2\pi i\varphi}$ of a unitary to $t$ bits. **Order finding** applies phase estimation to multiplication modulo $N$, whose eigenvalues encode the order $r$ of an element $a$, and recovers $r$ with **continued fractions**. Finally, classical number theory reduces factoring to order finding. At the end we run the whole algorithm in the simulator and factor $15$ and $21$. The number theory — modular arithmetic, Euler's theorem, the Chinese remainder theorem, Euclid's algorithm — is in [[cryptography/number-theory]] and [Maths Atlas: congruences](/learn/maths/lesson.php?c=number-theory&l=congruences); here we use it freely.

## The quantum Fourier transform

Throughout, $t$ is a number of qubits and $M = 2^t$. We identify the basis state $\ket{x}$, for $x\in\{0, \dots, M-1\}$, with the binary representation $x = x_1x_2\cdots x_t$ ($x_1$ most significant, on qubit $0$), and write $0.x_jx_{j+1}\cdots x_t$ for the binary fraction $x_j/2 + x_{j+1}/4 + \dots + x_t/2^{t-j+1}$.

::: definition Quantum Fourier transform {#def-qft}
The **quantum Fourier transform** on $t$ qubits is the linear map
$$
\mathrm{QFT}\ket x = \frac{1}{\sqrt M}\sum_{y=0}^{M-1}e^{2\pi i\,xy/M}\ket y, \qquad M = 2^t .
$$
On amplitudes it is the discrete Fourier transform: $\sum_x\alpha_x\ket x\mapsto\sum_y\beta_y\ket y$ with $\beta_y = M^{-1/2}\sum_x e^{2\pi ixy/M}\alpha_x$.
:::

The QFT is unitary: the inner product of the images of $\ket x$ and $\ket{x'}$ is $M^{-1}\sum_y e^{2\pi i(x - x')y/M}$, a geometric series with ratio $\omega = e^{2\pi i(x-x')/M}$, which is $1$ if $x = x'$ and $(1 - \omega^M)/(1 - \omega) = 0$ otherwise. For $t = 1$ it is just $H$. Its key property for algorithms is the same as in [[quantum-computing/first-algorithms]]: it maps periodic states to states concentrated on multiples of the inverse period.

::: example The Fourier transform of a periodic state {#ex-qft-periodic}
Compute the QFT on $t = 3$ qubits of $\tfrac12(\ket1 + \ket3 + \ket5 + \ket7)$, a state with period $2$ and offset $1$.
::: solution
The amplitude of $\ket y$ is
$$
\frac{1}{2\sqrt8}\sum_{k=0}^{3}e^{2\pi i(1 + 2k)y/8} = \frac{e^{2\pi iy/8}}{2\sqrt8}\sum_{k=0}^{3}e^{2\pi iky/4}.
$$
The geometric sum is $4$ if $y\equiv 0 \pmod 4$ and $0$ otherwise. So only $y = 0$ and $y = 4$ survive, each with modulus $4/(2\sqrt8) = 1/\sqrt2$: the result is $\tfrac{1}{\sqrt2}(\ket0 - \ket4)$, the phase $e^{2\pi i\cdot4/8} = -1$ coming from the offset. Measuring gives $0$ or $4$, multiples of $M/\text{period} = 8/2$. The offset affects only phases, not the outcome distribution — the property that makes the QFT detect periods.
:::
:::

### A circuit for the QFT

The definition involves $M^2 = 4^t$ matrix entries, but the QFT of a basis state is a product state, and that gives a circuit of $O(t^2)$ gates.

::: theorem Product form of the QFT {#thm-qft-product}
For $x = x_1x_2\cdots x_t$,
$$
\mathrm{QFT}\ket{x_1\cdots x_t} = \frac{1}{\sqrt{2^t}}\bigl(\ket0 + e^{2\pi i\,0.x_t}\ket1\bigr)\otimes\bigl(\ket0 + e^{2\pi i\,0.x_{t-1}x_t}\ket1\bigr)\otimes\cdots\otimes\bigl(\ket0 + e^{2\pi i\,0.x_1x_2\cdots x_t}\ket1\bigr).
$$ {#eq-qft-product}
:::

::: proof
Write $y = \sum_{l=1}^{t}y_l2^{t-l}$, so $y/M = \sum_l y_l2^{-l}$ and $e^{2\pi ixy/M} = \prod_{l=1}^t e^{2\pi i\,xy_l2^{-l}}$. The sum over $y$ factorises over the bits:
$$
\frac{1}{\sqrt M}\sum_y e^{2\pi ixy/M}\ket{y_1\cdots y_t} = \bigotimes_{l=1}^{t}\frac{1}{\sqrt2}\sum_{y_l\in\{0,1\}}e^{2\pi i\,xy_l2^{-l}}\ket{y_l} = \bigotimes_{l=1}^t\frac{\ket0 + e^{2\pi i\,x2^{-l}}\ket1}{\sqrt2}.
$$
Finally $x2^{-l} = (\text{integer}) + 0.x_{t-l+1}\cdots x_t$, because the bits $x_1, \dots, x_{t-l}$ contribute whole numbers, and $e^{2\pi i\cdot\text{integer}} = 1$. For $l = 1$ the phase is $0.x_t$ and for $l = t$ it is $0.x_1\cdots x_t$.
:::

Now read [[#eq-qft-product]] backwards. The last output qubit needs the phase $e^{2\pi i\,0.x_1x_2\cdots x_t}$: apply $H$ to the qubit holding $x_1$, which gives $\tfrac{1}{\sqrt2}(\ket0 + e^{2\pi i\,0.x_1}\ket1)$ since $e^{2\pi i\,0.x_1} = (-1)^{x_1}$, and then for $k = 2, \dots, t$ apply the phase gate $R_k = P(2\pi/2^k)$ to it, controlled by the qubit holding $x_k$, adding $x_k/2^k$ to the binary fraction. Then do the same for the qubit holding $x_2$, with controls $x_3, \dots, x_t$, and so on. Each qubit $j$ ends up holding the factor for output position $t - j + 1$, so a final reversal of the qubit order — $\lfloor t/2\rfloor$ SWAP gates — puts the factors in the order of [[#eq-qft-product]].

```text
x1 ──H──R2──R3──R4─────────────────────────────×──────
        │   │   │                              │
x2 ─────●───┼───┼───H──R2──R3──────────────────┼──×───
            │   │      │   │                   │  │
x3 ─────────●───┼──────●───┼───H──R2───────────┼──×───
                │          │      │            │
x4 ─────────────●──────────●──────●───H────────×──────
```

::: theorem Gate count of the QFT {#thm-qft-gates}
The circuit above computes the QFT on $t$ qubits with $t$ Hadamard gates, $t(t-1)/2$ controlled phase gates and $\lfloor t/2\rfloor$ SWAPs: $t(t+1)/2$ gates besides the swaps, $O(t^2)$ in all.
:::

::: proof
For correctness, note that when the gates on qubit $j$ are applied, the qubits $k > j$ that serve as their controls have not yet been touched, so they are still in the basis states $\ket{x_k}$, and a controlled $R_k$ with a control in a basis state simply multiplies the $\ket1$ component of qubit $j$ by $e^{2\pi i x_k/2^{k-j+1}}$. So after its gates, qubit $j$ is in the state $\tfrac{1}{\sqrt2}(\ket0 + e^{2\pi i\,0.x_jx_{j+1}\cdots x_t}\ket1)$, and later gates never act on it again (they use only qubits $k > j' > j$ as controls). After the swaps the qubits are in the order of [[#eq-qft-product]]; by linearity the circuit is the QFT on all states. Counting: qubit $j$ receives one $H$ and $t - j$ controlled phases, so the total is $t + \sum_{j=1}^t(t - j) = t + t(t-1)/2 = t(t+1)/2$.
:::

The implementation adds `qft.py` to the simulator. It records the gate list so that the inverse QFT is the same list reversed with negated phases, and its self-test compares the circuit with [[#def-qft]] on every basis state.

```python
from qsim import *

def qft(s, qubits, inverse=False):      # QFT on the listed qubits (most significant first)
    t, sign, gates = len(qubits), (-1 if inverse else 1), []
    for j in range(t):
        gates.append(("H", qubits[j], None))
        for k in range(j + 1, t):       # controlled phase 2*pi/2^(k-j+1), control qubits[k]
            gates.append(("P", qubits[j], (qubits[k], 2 * math.pi / 2 ** (k - j + 1))))
    for j in range(t // 2):             # reverse the order of the qubits with SWAPs
        gates.append(("SWAP", qubits[j], qubits[t - 1 - j]))
    for name, q, extra in (reversed(gates) if inverse else gates):
        if name == "H": apply(s, H, q)
        elif name == "P": apply(s, P(sign * extra[1]), q, controls=(extra[0],))
        else:
            for c, tq in ((q, extra), (extra, q), (q, extra)): apply(s, X, tq, controls=(c,))
    return sum(1 for g in gates if g[0] != "SWAP"), sum(1 for g in gates if g[0] == "SWAP")

if __name__ == "__main__":              # compare with the definition on all inputs, t = 4
    t, worst = 4, 0.0
    for x in range(2 ** t):
        s = [0j] * 2 ** t; s[x] = 1
        counts = qft(s, list(range(t)))
        exact = [cmath.exp(2j * math.pi * x * y / 2 ** t) / 2 ** (t / 2) for y in range(2 ** t)]
        worst = max(worst, max(abs(a - b) for a, b in zip(s, exact)))
    print(f"t = {t}: {counts[0]} H/controlled-phase gates, {counts[1]} swaps; "
          f"max error {worst:.1e}")
```

```console
$ python3 qft.py
t = 4: 10 H/controlled-phase gates, 2 swaps; max error 3.8e-15
```

The controlled phases $R_k$ for large $k$ are rotations by tiny angles $2\pi/2^k$. Dropping all those with $k > m$ for $m = O(\log(t/\varepsilon))$ changes the transform by at most $\varepsilon$ in operator norm (Coppersmith, 1994), giving the **approximate QFT** with $O(t\log t)$ gates; this matters in practice, because tiny rotations are both expensive to synthesise from $\{H, T\}$ ([[quantum-computing/quantum-circuits#thm-sk]]) and swamped by noise.

::: warning The QFT does not compute Fourier transforms faster than the FFT
The classical fast Fourier transform needs $\Theta(M\log M) = \Theta(t2^t)$ operations on a vector of $M$ numbers; the QFT uses $O(t^2)$ gates. But the QFT's output is a quantum state whose amplitudes cannot be read: a measurement returns one $y$, sampled with probability $\abs{\beta_y}^2$, and destroys the rest. And the input must already be a quantum state — loading $M$ arbitrary numbers into amplitudes costs at least order $M$ operations in general. The QFT is useful only inside algorithms, like Shor's, where the input state is produced by a short circuit and one sample of the output suffices.
:::

## Phase estimation

Every eigenvalue of a unitary has modulus $1$ ([[quantum-computing/qubits#prop-unitary]]), so it is $e^{2\pi i\varphi}$ for a phase $\varphi\in[0, 1)$. Phase estimation finds $\varphi$.

::: algorithm Phase estimation {#alg-pe}
Input: a circuit for controlled-$U^{2^k}$ for $k = 0, \dots, t-1$, and the eigenvector $\ket u$ in a second register, where $U\ket u = e^{2\pi i\varphi}\ket u$.
1. Prepare $\ket{0^t}\ket u$ and apply $H$ to each of the $t$ counting qubits.
2. For $j = 0, \dots, t-1$, apply $U^{2^{t-1-j}}$ to the second register, controlled by counting qubit $j$.
3. Apply the inverse QFT to the counting register, measure it, obtaining $x$, and output $\tilde\varphi = x/2^t$.
:::

After step 2, since counting qubit $j$ has weight $2^{t-1-j}$ in the binary value $x$, phase kickback ([[quantum-computing/quantum-circuits]]) gives
$$
\frac{1}{\sqrt M}\sum_{x=0}^{M-1}\ket x\otimes U^x\ket u = \Bigl(\frac{1}{\sqrt M}\sum_{x=0}^{M-1}e^{2\pi i\varphi x}\ket x\Bigr)\otimes\ket u .
$$ {#eq-pe-state}
If $\varphi = x_0/M$ for an integer $x_0$, this counting state is exactly $\mathrm{QFT}\ket{x_0}$ by [[#def-qft]], and the inverse QFT returns $\ket{x_0}$: the output is exact. In general:

::: theorem Accuracy of phase estimation {#thm-pe}
Let $\delta_x = \varphi - x/M$. [[#alg-pe]] outputs $x$ with probability
$$
p(x) = \Bigl\lvert\frac{1}{M}\sum_{k=0}^{M-1}e^{2\pi ik\delta_x}\Bigr\rvert^2 = \frac{\sin^2(\pi M\delta_x)}{M^2\sin^2(\pi\delta_x)} \quad(\delta_x\notin\Z),
$$
and $p(x) = 1$ when $\delta_x = 0$. In particular the nearest $t$-bit approximation to $\varphi$ (the $x$ with $\abs{\delta_x}\le 1/(2M)$, taken mod $1$) is output with probability at least $4/\pi^2 \approx 0.405$.
:::

::: proof
The inverse QFT maps $\sum_k e^{2\pi i\varphi k}\ket k/\sqrt M$ to the state whose amplitude at $\ket x$ is $M^{-1}\sum_k e^{2\pi i\varphi k}e^{-2\pi ikx/M} = M^{-1}\sum_k e^{2\pi ik\delta_x}$. For $\delta_x\notin\Z$ this is a geometric series with ratio $e^{2\pi i\delta_x}\ne1$, equal to $M^{-1}(1 - e^{2\pi iM\delta_x})/(1 - e^{2\pi i\delta_x})$; using $\abs{1 - e^{i\theta}} = 2\abs{\sin(\theta/2)}$ gives the formula. For the bound, let $u = M\abs{\delta_x}\le\tfrac12$ (if $u = 0$ the probability is $1$). Using $\abs{\sin\theta}\le\abs\theta$ in the denominator and $\sin(\pi u)\ge 2u$ for $u\in[0, \tfrac12]$ (sine is concave there, and equality holds at both ends) in the numerator,
$$
p(x) \ge \frac{\sin^2(\pi u)}{M^2(\pi u/M)^2} = \frac{\sin^2(\pi u)}{\pi^2u^2} \ge \frac{4u^2}{\pi^2u^2} = \frac{4}{\pi^2}. \qquad
$$
:::

Adding a few more counting qubits makes the estimate reliable: with $t = s + \lceil\log_2(2 + 1/(2\epsilon))\rceil$ qubits, the output is within $2^{-s}$ of $\varphi$ with probability at least $1 - \epsilon$ (Nielsen–Chuang, §5.2.1). The figure shows the distribution.

::: widget plot
f: (sin(16*pi*(p - x/16)) / (16*sin(pi*(p - x/16))))^2
x: 0, 15.99
y: 0, 1
sliders: p=0.3:0:0.999:0.001
labels: p(x) \text{ for } t = 4
caption: The output distribution of phase estimation with $t = 4$ counting qubits, read at the integers $x = 0, \dots, 15$, as the true phase $\varphi$ (slider $p$) varies. When $16\varphi$ is an integer (try $p = 0.25$ or $0.3125$) all the probability sits on one outcome. Halfway between, at $p = 0.28125$, the two nearest outcomes each get about $0.41$ (tending to $4/\pi^2 \approx 0.405$ as $t$ grows); that is the worst case of [[#thm-pe]].
:::

::: example Phase estimation of the $T$ gate {#ex-pe-t}
Apply [[#alg-pe]] with $t = 3$ to $U = T$ and its eigenvector $\ket1$. What is the output?
::: solution
$T\ket1 = e^{i\pi/4}\ket1 = e^{2\pi i\cdot(1/8)}\ket1$, so $\varphi = 1/8 = 0.001_2$. By [[#eq-pe-state]] the counting register after step 2 is $\tfrac{1}{\sqrt8}\sum_{x=0}^7 e^{2\pi ix/8}\ket x = \mathrm{QFT}\ket{1}$, so the inverse QFT gives $\ket{001}$ exactly and the output is $\tilde\varphi = 1/8$. Step 2 used controlled-$T^4 = $ controlled-$Z$ (on qubit $0$), controlled-$T^2 = $ controlled-$S$ (qubit $1$) and controlled-$T$ (qubit $2$). By kickback they put the phases $e^{2\pi i\cdot 4/8} = -1$, $e^{2\pi i\cdot2/8} = i$ and $e^{2\pi i/8}$ on the $\ket1$ components of the three counting qubits, which is [[#eq-qft-product]] for $x = 001$: $(\ket0 - \ket1)(\ket0 + i\ket1)(\ket0 + e^{i\pi/4}\ket1)/\sqrt8$. Had we used $U = T$ with $t = 2$, the phase $1/8$ would lie halfway between $0$ and $1/4$, and each of those outcomes would have probability $\approx 0.43$.
:::
:::

## Order finding

::: definition Order {#def-order}
For integers $N \ge 2$ and $a$ with $\gcd(a, N) = 1$, the **order** of $a$ modulo $N$ is the smallest $r \ge 1$ with $a^r\equiv1\pmod N$. **Order finding** is the problem: given $N$ and $a$, find $r$.
:::

By Euler's theorem $r$ divides $\varphi(N) < N$. No classical polynomial-time algorithm for order finding is known; for general $N$ it is as hard as factoring. Shor's idea is to find $r$ as a period: the function $x\mapsto a^x\bmod N$ is periodic with period $r$. We phrase it as phase estimation, following Kitaev (1995). Let $L$ be the number of bits of $N$ ($2^{L-1}\le N < 2^L$), and define on $L$ qubits the unitary
$$
U_a\ket y = \begin{cases}\ket{ay\bmod N} & 0\le y < N,\\ \ket y & N\le y < 2^L.\end{cases}
$$
It is a permutation of basis states because multiplication by $a$ is a bijection of $\Z_N$ when $\gcd(a, N) = 1$.

::: lemma Eigenvectors of modular multiplication {#lem-eigen}
For $s = 0, 1, \dots, r - 1$ let
$$
\ket{u_s} = \frac{1}{\sqrt r}\sum_{k=0}^{r-1}e^{-2\pi isk/r}\ket{a^k\bmod N}.
$$
Then $U_a\ket{u_s} = e^{2\pi is/r}\ket{u_s}$, and $\frac{1}{\sqrt r}\sum_{s=0}^{r-1}\ket{u_s} = \ket1$.
:::

::: proof
The values $a^0, a^1, \dots, a^{r-1}\bmod N$ are distinct (if $a^j\equiv a^k$ with $0\le j<k<r$ then $a^{k-j}\equiv1$ with $0<k-j<r$, contradicting minimality), so the $\ket{u_s}$ are unit vectors. Applying $U_a$ shifts each $\ket{a^k}$ to $\ket{a^{k+1}}$, with $a^r\equiv a^0$:
$$
U_a\ket{u_s} = \frac{1}{\sqrt r}\sum_{k=0}^{r-1}e^{-2\pi isk/r}\ket{a^{k+1}} = \frac{1}{\sqrt r}\sum_{k'=0}^{r-1}e^{-2\pi is(k'-1)/r}\ket{a^{k'}} = e^{2\pi is/r}\ket{u_s},
$$
re-indexing $k' = k + 1 \bmod r$ (the exponent is unchanged mod $r$). For the sum, $\frac{1}{\sqrt r}\sum_s\ket{u_s} = \frac1r\sum_k\bigl(\sum_se^{-2\pi isk/r}\bigr)\ket{a^k}$, and the inner sum is $r$ for $k = 0$ and $0$ for $0 < k < r$. So the result is $\ket{a^0} = \ket1$.
:::

We do not know $r$, so we cannot prepare any $\ket{u_s}$. But we do not need to: $\ket1$ is an equal superposition of all of them, and phase estimation is linear. Running [[#alg-pe]] with $U = U_a$ and second register $\ket1$ gives the same output distribution as first choosing $s$ uniformly from $\{0, \dots, r-1\}$ and then estimating $\varphi = s/r$. The controlled powers $U_a^{2^k}$ are multiplications by $a^{2^k}\bmod N$, numbers that a classical computer precomputes by repeated squaring; so no $U_a$ ever has to be applied $2^k$ times.

### Recovering $r$: continued fractions

The measurement gives $x$ with $x/M\approx s/r$. Every real number $\xi$ has a **continued fraction** expansion $\xi = [c_0; c_1, c_2, \dots] = c_0 + 1/(c_1 + 1/(c_2 + \cdots))$, obtained by repeatedly taking the integer part and inverting the remainder; for rational $\xi$ it is finite and is computed by Euclid's algorithm. Truncating it gives the **convergents** $h_k/q_k = [c_0; c_1, \dots, c_k]$, and these are the best rational approximations to $\xi$ in a strong sense:

::: theorem Legendre's theorem on continued fractions {#thm-cf}
If $s$ and $r \ge 1$ are integers with $\gcd(s, r) = 1$ and
$$
\Bigl\lvert\frac sr - \xi\Bigr\rvert < \frac{1}{2r^2},
$$
then $s/r$ is a convergent of the continued fraction of $\xi$.
:::

We use the theorem without proof (see Hardy and Wright, *An Introduction to the Theory of Numbers*, Theorem 184). With $t = 2L$ counting qubits, $M = 2^{2L} > N^2 > r^2$, so whenever phase estimation returns the nearest $x$ (probability $\ge 4/\pi^2$), $\abs{x/M - s/r}\le 1/(2M) < 1/(2r^2)$. The convergents of $x/M$, of which there are $O(L)$, then include $s/r$ in lowest terms, and since the denominators of convergents increase, we can test each denominator $q < N$ by checking whether $a^q\equiv1\pmod N$. If $\gcd(s, r) = 1$ the denominator found is $r$ itself. If not, the convergent is $s'/r'$ in lowest terms with $r'$ a proper divisor of $r$, and the test fails because $r$ is the smallest exponent with $a^r\equiv1$; repeating the experiment, or combining two runs by taking the least common multiple of their denominators, recovers $r$ with high probability. The probability that a random $s$ is coprime to $r$ is $\varphi(r)/r = \Omega(1/\log\log r)$, and with the lcm trick a constant number of runs suffices.

::: example Continued fractions by hand {#ex-cf}
Phase estimation for $N = 21$, $a = 2$ with $M = 2^{10}$ returns $x = 171$. Expand $171/1024$ as a continued fraction, list its convergents, and find the one promised by [[#thm-cf]].
::: solution
Euclid's algorithm on $(171, 1024)$: $1024 = 5\cdot171 + 169$, $171 = 1\cdot169 + 2$, $169 = 84\cdot2 + 1$, $2 = 2\cdot1$. So
$$
\frac{171}{1024} = [0; 5, 1, 84, 2] = 0 + \cfrac{1}{5 + \cfrac{1}{1 + \cfrac{1}{84 + \cfrac12}}}.
$$
The convergents are $[0] = 0$, $[0; 5] = 1/5$, $[0; 5, 1] = 1/(5 + 1) = 1/6$, $[0; 5, 1, 84] = 85/509$, and finally $171/1024$. The order is $r = 6$ and the sampled $s = 1$: $\abs{1/6 - 171/1024} = \abs{1024 - 1026}/6144 \approx 3.3\times10^{-4}$, well below $1/(2\cdot 6^2) \approx 0.0139$, so [[#thm-cf]] guarantees that $1/6$ appears — as it does. Testing denominators in order, $2^5 = 32 \equiv 11 \not\equiv 1$ but $2^6 = 64\equiv 1 \pmod{21}$, so $r = 6$; the larger denominators $509$ and $1024$ exceed $N$ and are never tried. The same computation appears as the second run in [[#ex-shor-sim]].
:::
:::

::: theorem Order finding {#thm-order}
Order finding for an $L$-bit modulus $N$ is solved with constant success probability by a quantum circuit of $O(L^3)$ gates on $O(L)$ qubits, plus $O(L^3)$ classical post-processing.
:::

::: proof
(Cost.) The counting register has $t = 2L$ qubits; the QFT on them costs $O(L^2)$ gates by [[#thm-qft-gates]]. The dominant cost is the $2L$ controlled modular multiplications by the precomputed constants $a^{2^k}\bmod N$. A multiplication of an $L$-bit register by a constant modulo $N$ can be built reversibly ([[quantum-computing/quantum-circuits#thm-oracle]]) from $O(L)$ modular additions of $O(L)$ gates each, so $O(L^2)$ gates; with uncomputation of the workspace it uses $O(L)$ ancillas. Total: $2L\cdot O(L^2) = O(L^3)$ gates. The continued-fraction expansion of an $O(L)$-bit rational has $O(L)$ terms, each test $a^q\bmod N$ costs $O(L^3)$ bit operations, or less by computing the convergents incrementally. Correctness and success probability are as argued above, using [[#thm-pe]], [[#lem-eigen]] and [[#thm-cf]].
:::

Faster multiplication algorithms reduce the gate count to $O(L^2\log L\log\log L)$, at the cost of larger constants; what matters for real machines is the constant, studied in [[quantum-computing/quantum-hardware]].

::: quiz
Order finding for $N = 21$ and $a = 2$ (order $r = 6$) with $t = 10$ counting qubits returns $x = 683$, so $x/1024 \approx 0.66699$, whose convergents are $0, 1, 2/3, 683/1024$. What happened?
- [ ] The run failed: $x$ should be close to a multiple of $1/6$, but $0.667$ is not
- [x] The run sampled $s = 4$; since $\gcd(4, 6) = 2$, the convergent $2/3$ reveals only a divisor of $r$
- [ ] The order of $2$ modulo $21$ is $3$
- [ ] Continued fractions only work when $x/M$ is exactly $s/r$
::: solution
$4/6 = 2/3 \approx 0.6667$ is within $1/(2\cdot 6^2)$ of $0.66699$, so by [[#thm-cf]] it appears as a convergent — but in lowest terms. The denominator $3$ fails the test ($2^3 = 8 \not\equiv 1 \pmod{21}$), so we run again; a run with $s = 1$ or $5$ (coprime to $6$), or the lcm of $3$ with a denominator $2$ from another run, gives $r = 6$. This is exactly what happens in the simulation below.
:::
:::

## From order finding to factoring

Factoring reduces to order finding by classical number theory. First, easy cases: if $N$ is even, output $2$; if $N = p^k$ is a prime power, find it by computing integer $k$-th roots for $k\le\log_2 N$. Both are classical and polynomial-time.

::: proposition Non-trivial square roots of one give factors {#prop-sqrt}
If $u^2\equiv1\pmod N$ but $u\not\equiv\pm1\pmod N$, then $\gcd(u - 1, N)$ and $\gcd(u + 1, N)$ are non-trivial factors of $N$.
:::

::: proof
$N$ divides $u^2 - 1 = (u-1)(u+1)$ but divides neither factor (as $u\not\equiv\pm1$). If $\gcd(u - 1, N)$ were $1$, then $N$ would divide $u + 1$ (by Euclid's lemma applied to the prime factors of $N$: every prime power dividing $N$ divides the product and shares nothing with $u - 1$, so divides $u + 1$); contradiction. If it were $N$, then $N$ would divide $u - 1$; contradiction. So $1 < \gcd(u - 1, N) < N$, and likewise for $u + 1$.
:::

::: theorem Factoring reduces to order finding {#thm-reduction}
Let $N$ be odd, not a prime power, and choose $a$ uniformly from $\{2, \dots, N-1\}$. If $\gcd(a, N) > 1$ we have a factor. Otherwise let $r$ be the order of $a$; if $r$ is even and $a^{r/2}\not\equiv -1\pmod N$, then $u = a^{r/2}\bmod N$ satisfies [[#prop-sqrt]] and yields a factor. For $a$ uniform in $\Z_N^*$ this happens with probability at least $1 - 2^{-(m-1)} \ge 1/2$, where $m \ge 2$ is the number of distinct prime factors of $N$.
:::

::: proof
The first claim is direct: $u^2 = a^r\equiv1$, and $u\not\equiv1$ because $r/2 < r$ and $r$ is minimal, while $u\not\equiv -1$ by assumption. The probability bound uses the Chinese remainder theorem: $\Z_N^*\cong\Z_{p_1^{e_1}}^*\times\dots\times\Z_{p_m^{e_m}}^*$, the order $r$ is the lcm of the orders $r_i$ modulo each $p_i^{e_i}$, and the attempt fails exactly when all the $r_i$ are divisible by the same power of $2$ (Nielsen–Chuang, Theorem 5.3, and [[cryptography/post-quantum]]). Since each $\Z_{p_i^{e_i}}^*$ is cyclic of even order, the power of $2$ in $r_i$ takes a given value with probability at most $1/2$, independently across $i$ by the CRT, so all $m$ agree with probability at most $2^{-(m-1)}$.
:::

::: algorithm Shor's factoring algorithm {#alg-shor}
Input: an odd composite $N$ that is not a prime power, of $L$ bits.
1. Choose $a$ uniformly from $\{2, \dots, N - 1\}$. If $d = \gcd(a, N) > 1$, output $d$.
2. Find the order $r$ of $a$ modulo $N$ by the quantum order-finding algorithm with $t = 2L$ counting qubits and continued fractions ([[#thm-order]]).
3. If $r$ is odd or $a^{r/2}\equiv-1\pmod N$, go to step 1. Otherwise output $\gcd(a^{r/2} - 1, N)$.
:::

By [[#thm-order]] and [[#thm-reduction]], the expected number of repetitions is constant and the total cost is $O(L^3)$ quantum gates plus polynomial classical work. The figure shows the periodic sequence that the quantum computer detects.

::: widget modular
n: 21
mode: powers
a: 2
caption: Powers of $a$ modulo $21$. For $a = 2$ the sequence $1, 2, 4, 8, 16, 11, 1, \dots$ has period $6$, the order; $2^3 = 8$ is a square root of $1$ other than $\pm1$, and $\gcd(7, 21) = 7$, $\gcd(9, 21) = 3$ are the factors. Try $a = 5$ (order $6$, $5^3 \equiv 20 \equiv -1$: a failure) and $a = 4$ (order $3$, odd: also a failure).
:::

::: example Factoring 15 and 21 in the simulator {#ex-shor-sim}
Run Shor's algorithm in the state-vector simulator for $N = 15$ with $a = 7$ and $N = 21$ with $a = 2$, with $t = 2L$ counting qubits.
::: solution
The circuit uses `permute` for each controlled multiplication by $a^{2^{t-1-j}}\bmod N$, applied when counting qubit $j$ is $1$ and the work register holds $y < N$, and `qft(…, inverse=True)` on the counting register. Rather than collapsing the state qubit by qubit, it computes the distribution of the counting register and samples from it, which is equivalent. The continued fraction of $x/2^t$ is computed exactly with Python's `Fraction`.

```python
from qsim import *
from qft import qft
from fractions import Fraction
from math import gcd

def order_finding_circuit(a, N, t, rng):
    n = N.bit_length()                       # work register: n qubits, holds y < 2^n
    s = [0j] * 2 ** (t + n); s[1] = 1        # counting register |0>^t, work register |1>
    for q in range(t): apply(s, H, q)
    for j in range(t):                       # counting qubit j controls U^(2^(t-1-j))
        m, c = pow(a, 2 ** (t - 1 - j), N), 1 << (t + n - 1 - j)
        def f(i, m=m, c=c):
            hi, y = i >> n, i & ((1 << n) - 1)
            if i & c and y < N: y = m * y % N    # controlled multiply by a^(2^k) mod N
            return (hi << n) | y
        permute(s, f)
    qft(s, list(range(t)), inverse=True)
    p = [sum(abs(s[(x << n) | y]) ** 2 for y in range(1 << n)) for x in range(1 << t)]
    return rng.choices(range(1 << t), weights=p)[0], p

def order_from_sample(x, t, a, N):           # continued fractions of x / 2^t
    cf = []; fr = Fraction(x, 2 ** t)
    while True:
        cf.append(fr.numerator // fr.denominator); rest = fr - cf[-1]
        if rest == 0: break
        fr = 1 / rest
    for k in range(1, len(cf) + 1):          # convergents h_k / q_k
        c = Fraction(cf[k - 1])
        for term in reversed(cf[:k - 1]): c = term + 1 / c
        if c.denominator < N and pow(a, c.denominator, N) == 1:
            return cf, c.denominator
    return cf, None
```

```python
from shor import *

def factor(N, a, rng):
    t = 2 * N.bit_length()
    print(f"N = {N}, a = {a}: {t} counting qubits, {t + N.bit_length()} qubits in all")
    while True:
        x, p = order_finding_circuit(a, N, t, rng)
        cf, r = order_from_sample(x, t, a, N)
        print(f"  measured x = {x:4} (x/2^t = {x / 2 ** t:.4f}), "
              f"continued fraction {cf}, order found: {r}")
        if r and r % 2 == 0 and pow(a, r // 2, N) != N - 1:
            u = pow(a, r // 2, N)
            print(f"  a^(r/2) mod N = {u}: gcd({u - 1}, {N}) = {gcd(u - 1, N)}, "
                  f"gcd({u + 1}, {N}) = {gcd(u + 1, N)}")
            likely = [k for k in range(len(p)) if p[k] > 0.02]
            print("  outcomes with P > 0.02:", ", ".join(f"{k}: {p[k]:.3f}" for k in likely))
            return

rng = random.Random(1)
factor(15, 7, rng)
factor(21, 2, rng)
```

```console
$ python3 factor.py
N = 15, a = 7: 8 counting qubits, 12 qubits in all
  measured x =    0 (x/2^t = 0.0000), continued fraction [0], order found: None
  measured x =  192 (x/2^t = 0.7500), continued fraction [0, 1, 3], order found: 4
  a^(r/2) mod N = 4: gcd(3, 15) = 3, gcd(5, 15) = 5
  outcomes with P > 0.02: 0: 0.250, 64: 0.250, 128: 0.250, 192: 0.250
N = 21, a = 2: 10 counting qubits, 15 qubits in all
  measured x =  683 (x/2^t = 0.6670), continued fraction [0, 1, 2, 341], order found: None
  measured x =  171 (x/2^t = 0.1670), continued fraction [0, 5, 1, 84, 2], order found: 6
  a^(r/2) mod N = 8: gcd(7, 21) = 7, gcd(9, 21) = 3
  outcomes with P > 0.02: 0: 0.167, 170: 0.028, 171: 0.114, 341: 0.114, 342: 0.028, 512: 0.167, 682: 0.028, 683: 0.114, 853: 0.114, 854: 0.028
```

For $N = 15$, $r = 4$ divides $M = 256$, so phase estimation is exact: the outcomes are $x = 256s/4$ for $s = 0, 1, 2, 3$, each with probability $1/4$. The first run gave $s = 0$, which carries no information. The second gave $x/M = 3/4$, with convergents $0, 1, 3/4$; the denominator $4$ passes the test $7^4 = 2401 \equiv 1 \pmod{15}$. Then $7^2 = 49\equiv4$, and $\gcd(3, 15) = 3$, $\gcd(5, 15) = 5$.

For $N = 21$, $r = 6$ does not divide $1024$, so the peaks at $1024s/6 \approx 0, 170.7, 341.3, 512, 682.7, 853.3$ are spread over neighbouring integers; the nearest integer gets probability $0.114$ and the next one $0.028$ for $s = 1, 2, 4, 5$, while $s = 0, 3$ are exact ($0.167 = 1/6$). The first run sampled $s = 4$ and gave the reduced fraction $2/3$, as in the quiz; the second gave $171/1024$, whose convergents $0, 1/5, 1/6, \dots$ yield $r = 6$. Then $2^3 = 8$, and $\gcd(7, 21) = 7$, $\gcd(9, 21) = 3$. The simulation used $15$ qubits and $2^{15}$ amplitudes; the same circuit for a 2048-bit modulus would need several thousand error-corrected qubits, and a classical simulation of it is out of the question.
:::
:::

::: warning "Quantum computers have factored numbers like 15 and 21" — with caveats
Shor's algorithm was first demonstrated on $N = 15$ in 2001 with a seven-qubit liquid-state NMR device (Vandersypen and colleagues), and $N = 21$ was factored with photonic qubits in 2012 (Martín-López and colleagues). These experiments, and most later ones, used **compiled** circuits simplified by using knowledge of the answer (for example, of the order $r$), so they demonstrate quantum control rather than factoring. Claims of factoring much larger numbers on quantum hardware have used other methods (annealing or variational optimisation) whose scaling is unknown or poor, and do not threaten RSA. As of 2026, no quantum computer has run Shor's algorithm in a way that factors a number that could not be factored by hand.
:::

### Discrete logarithms and other periods

The same method computes **discrete logarithms**: given $g$ and $h = g^\ell$ in a cyclic group of order $q$, the function $f(x_1, x_2) = g^{x_1}h^{-x_2}$ on $\Z_q\times\Z_q$ is constant on the cosets of the subgroup generated by $(\ell, 1)$, and a two-dimensional QFT and phase estimation reveal $\ell$. Because the method needs only efficient group operations, it works in the multiplicative group of a finite field and in elliptic-curve groups, which is why Shor's algorithm breaks Diffie–Hellman, DSA, ECDSA and EdDSA as well as RSA ([[cryptography/post-quantum]]). All these are instances of the **abelian hidden subgroup problem** of [[quantum-computing/first-algorithms]].

::: history
Peter Shor presented "Algorithms for quantum computation: discrete logarithms and factoring" at FOCS in November 1994; the journal version, "Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer", appeared in the *SIAM Journal on Computing* in 1997. Don Coppersmith described the approximate QFT in an IBM report in 1994. Alexei Kitaev's 1995 preprint "Quantum measurements and the abelian stabilizer problem" introduced phase estimation and solved the general abelian stabiliser problem; the presentation of order finding via phase estimation used here follows Cleve, Ekert, Macchiavello and Mosca (1998). The first experimental demonstration factored 15 in 2001 (Vandersypen, Steffen, Breyta, Yannoni, Sherwood and Chuang, *Nature*). Shor received the Nevanlinna Prize in 1998 and shared the 2023 Breakthrough Prize in Fundamental Physics.
:::

## Where this leads

[[quantum-computing/quantum-complexity]] uses Shor's algorithm as the main evidence that $\mathsf{BQP}$ is larger than $\mathsf{BPP}$, and explains why it does not suggest that quantum computers solve $\mathsf{NP}$-complete problems. [[quantum-computing/grover]] gives the other famous algorithm, whose speed-up is only quadratic but applies to any search problem. Running Shor's algorithm on cryptographic sizes needs millions of physical qubits with error correction, as estimated in [[quantum-computing/quantum-hardware]], and the response of cryptographers — new public-key schemes based on lattices and hash functions — is the subject of [[cryptography/post-quantum]]. Phase estimation itself is the core of quantum algorithms for chemistry and materials, where $U = e^{-iHt}$ for a physical Hamiltonian $H$ and the phases are energy levels.

::: summary
- The **QFT** on $t$ qubits is the discrete Fourier transform of the $2^t$ amplitudes; its product form ([[#thm-qft-product]]) gives a circuit of $t(t+1)/2$ Hadamard and controlled-phase gates plus $\lfloor t/2\rfloor$ swaps ([[#thm-qft-gates]]).
- The QFT's output cannot be read out; it is useful only inside algorithms that need one sample of a Fourier spectrum.
- **Phase estimation** ([[#alg-pe]]) finds the eigenphase $\varphi$ of $U$ to $t$ bits using controlled $U^{2^k}$ and an inverse QFT; it is exact when $2^t\varphi$ is an integer and otherwise outputs the nearest value with probability $\ge 4/\pi^2$ ([[#thm-pe]]).
- **Order finding**: the eigenvalues of $y\mapsto ay\bmod N$ are $e^{2\pi is/r}$, and $\ket1$ is a uniform superposition of the eigenvectors ([[#lem-eigen]]); with $t = 2L$ qubits, **continued fractions** recover $s/r$ ([[#thm-cf]]), in $O(L^3)$ gates overall ([[#thm-order]]).
- **Factoring** reduces to order finding: an even order $r$ with $a^{r/2}\not\equiv-1$ gives a non-trivial square root of $1$ and hence a factor by gcd ([[#prop-sqrt]], [[#thm-reduction]]).
- The simulator factors $15$ and $21$; real hardware has only run compiled toy versions, and cryptographically relevant factoring requires large-scale error correction.
:::

## Exercises

::: exercise Counting QFT gates {level=1 check="55"}
How many Hadamard and controlled-phase gates (excluding swaps) does the QFT circuit on $t = 10$ qubits use? (Enter a number.)
::: solution
By [[#thm-qft-gates]], $t(t+1)/2 = 10\cdot11/2 = 55$: ten Hadamards and $45$ controlled phases, plus $5$ swaps. The approximate QFT that keeps only $R_2, R_3, R_4$ gives qubit $j$ at most $\min(t - j, 3)$ controlled phases: $3$ each for $j = 1, \dots, 7$, then $2$, $1$, $0$, so $10 + 21 + 3 = 34$ gates.
:::
:::

::: exercise The two-qubit QFT {level=1}
Write the $4\times4$ matrix of the QFT on two qubits and check that its columns are orthonormal.
::: solution
With $\omega = e^{2\pi i/4} = i$, the entry in row $y$, column $x$ is $\tfrac12 i^{xy}$:
$$
\mathrm{QFT}_4 = \frac12\begin{pmatrix}1 & 1 & 1 & 1\\ 1 & i & -1 & -i\\ 1 & -1 & 1 & -1\\ 1 & -i & -1 & i\end{pmatrix}.
$$
Each column has four entries of modulus $1/2$, so norm $1$; the inner product of columns $x$ and $x'$ is $\tfrac14\sum_y i^{(x'-x)y}$, a sum of the four powers of a fourth root of unity $\ne 1$, which is $0$.
:::
:::

::: exercise An order {level=1 check="6"}
Find the order of $11$ modulo $21$, and use it to factor $21$. (Enter the order.)
::: solution
$11^2 = 121 = 5\cdot21 + 16\equiv16$; $11^3\equiv16\cdot11 = 176 = 8\cdot21 + 8\equiv8$; $11^6\equiv 8^2 = 64\equiv1$; and $11^1, 11^2 \not\equiv1$, while $r$ must divide $\varphi(21) = 12$, and $11^4\equiv 8\cdot 11 = 88 \equiv 4$, so $r = 6$. Then $u = 11^3\equiv8\not\equiv\pm1$, giving $\gcd(7, 21) = 7$ and $\gcd(9, 21) = 3$.
:::
:::

::: exercise Reading a measurement {level=2 check="6"}
Order finding for $N = 21$, $a = 2$ with $t = 10$ returns $x = 853$. Compute the continued fraction of $853/1024$ and its convergents, and find the order. (Enter the order.)
::: solution
$853/1024 = 0 + 1/(1024/853)$; $1024/853 = 1 + 171/853$; $853/171 = 4 + 169/171$; $171/169 = 1 + 2/169$; $169/2 = 84 + 1/2$; $2 = 2$. So $853/1024 = [0; 1, 4, 1, 84, 2]$. The convergents are $0$, $1$, $4/5$, $5/6$, $\dots$ The denominator $5$ fails ($2^5 = 32\equiv 11$), and $6$ passes ($2^6 = 64\equiv1$), so $r = 6$; indeed $5/6 \approx 0.8333$ and $853/1024 \approx 0.8330$ differ by $3.3\times10^{-4} < 1/72$.
:::
:::

::: exercise Factoring 35 by hand {level=2 check="12"}
Find the order of $2$ modulo $35$ and use [[#thm-reduction]] to factor $35$. How many counting qubits would [[#alg-shor]] use? (Enter the order.)
::: solution
Powers of $2$ mod $35$: $2, 4, 8, 16, 32, 29, 23, 11, 22, 9, 18, 1$, so $r = 12$. Then $u = 2^6 \equiv 29\not\equiv\pm1$, and $\gcd(28, 35) = 7$, $\gcd(30, 35) = 5$. Since $35 < 64 = 2^6$, $L = 6$ and $t = 2L = 12$ counting qubits, with $6$ work qubits: $18$ qubits. Our simulator runs it in a few seconds; one run (`factor(35, 2, random.Random(5))`) measured $x = 2389$, and $2389/4096 \approx 0.5833 \approx 7/12$ gave $r = 12$ directly.
:::
:::

::: exercise Unitarity of the QFT, via the product form {level=2}
Show from [[#eq-qft-product]] that the QFT maps the computational basis to an orthonormal basis, and that the inverse QFT is obtained by reversing the circuit and negating every controlled phase.
::: solution
Two images $\mathrm{QFT}\ket x$, $\mathrm{QFT}\ket{x'}$ are product states, so their inner product is $\prod_{l}\tfrac12(1 + e^{2\pi i(x' - x)2^{-l}})$. If $x\ne x'$, let $2^{l_0 - 1}$ be the lowest power of $2$ at which $x$ and $x'$ differ, i.e. $x' - x = 2^{l_0-1}\cdot\text{odd}$; then the factor with $l = l_0$ is $\tfrac12(1 + e^{i\pi\cdot\text{odd}}) = 0$. So the images are orthonormal and the QFT is unitary. The inverse of a product of gates $G_m\cdots G_1$ is $G_1^\dagger\cdots G_m^\dagger$; $H$ and SWAP are self-inverse, and the inverse of a controlled $P(\theta)$ is a controlled $P(-\theta)$. That is exactly what `qft(…, inverse=True)` does.
:::
:::

::: exercise Which bases fail? {level=2 check="3/4"}
For $N = 15$, list the orders of all $a\in\Z_{15}^*$ and determine for which $a$ step 3 of [[#alg-shor]] succeeds. What fraction of $\Z_{15}^*$ succeeds? (Enter a fraction.)
::: solution
$\Z_{15}^* = \{1, 2, 4, 7, 8, 11, 13, 14\}$ with orders $1, 4, 2, 4, 4, 2, 4, 2$. Failures: $a = 1$ (odd order) and $a = 14 \equiv -1$ (order $2$ with $a^1\equiv-1$). The other six succeed: e.g. $a = 4$: $4^1 = 4$, $\gcd(3, 15) = 3$; $a = 11$: $\gcd(10, 15) = 5$; $a = 2, 7, 8, 13$: $a^2\equiv4$, giving $3$ and $5$. So $6/8 = 3/4$, which meets the bound $1 - 2^{-(m-1)} = 1/2$ of [[#thm-reduction]] for $m = 2$ primes.
:::
:::

::: exercise Phase estimation with an inexact phase {level=2}
Phase estimation with $t = 3$ is applied to an eigenvector with $\varphi = 1/3$. Compute the probability of each outcome to three decimals and compare the most likely one with [[#thm-pe]].
::: solution
$p(x) = \abs{\tfrac18\sum_{k=0}^{7}e^{2\pi ik(1/3 - x/8)}}^2$. Numerically: $p(0) = 0.016$, $p(1) = 0.032$, $p(2) = 0.175$, $p(3) = 0.688$, $p(4) = 0.047$, $p(5) = 0.019$, $p(6) = 0.013$, $p(7) = 0.012$. The nearest $3$-bit value is $3/8 = 0.375$ (distance $0.042 < 1/16$), with probability $0.688 \ge 4/\pi^2\approx 0.405$; the two nearest, $2/8$ and $3/8$, together have $0.863$.
:::
:::

::: exercise Large errors are unlikely {level=3}
Let $e \ge 2$ be an integer. Prove that phase estimation outputs an $x$ at distance more than $e$ from $M\varphi$ (measured around the circle, i.e. with $\abs{\delta_x}\le\tfrac12$ chosen mod $1$) with probability at most $1/(2(e - 1))$.
::: solution
By [[#thm-pe]], $p(x) = \sin^2(\pi M\delta_x)/(M^2\sin^2(\pi\delta_x))$. Bound the numerator by $1$ and use $\abs{\sin(\pi\delta)}\ge 2\abs\delta$ for $\abs\delta\le\tfrac12$ (concavity of sine on $[0, \pi/2]$): $p(x)\le 1/(4M^2\delta_x^2) = 1/(4d_x^2)$, where $d_x = M\abs{\delta_x}$ is the distance of $x$ from $M\varphi$. On each side of $M\varphi$ the distances of successive integers increase by $1$, so the integers at distance more than $e$ on one side have distances $d_0 > e$, $d_1 > e + 1$, $d_2 > e + 2$, …, and
$$
\sum_{j\ge0}\frac{1}{4d_j^2} < \frac14\sum_{j\ge0}\frac{1}{(e + j)^2} \le \frac14\int_{e-1}^{\infty}\frac{dz}{z^2} = \frac{1}{4(e - 1)}.
$$
Adding both sides gives at most $1/(2(e - 1))$. For example, to be within distance $e = 2^{k}$ of $M\varphi$ (that is, to get $\varphi$ to $t - k$ bits) with failure probability $\epsilon$ it suffices that $2^k\ge 1 + 1/(2\epsilon)$, which is the origin of the extra $\lceil\log_2(2 + 1/(2\epsilon))\rceil$ qubits quoted after [[#thm-pe]].
:::
:::

::: exercise The period of $a^x$ directly {level=3}
Shor's original analysis measures the work register first. Show that after the controlled multiplications in order finding, measuring the work register and getting $a^{x_0}\bmod N$ leaves the counting register in $\frac{1}{\sqrt K}\sum_{j=0}^{K-1}\ket{x_0 + jr}$ with $K\approx M/r$, and explain how the inverse QFT then produces outcomes near multiples of $M/r$, as seen in the simulation for $N = 21$.
::: solution
After the controlled multiplications the state is $M^{-1/2}\sum_x\ket x\ket{a^x\bmod N}$. The values $a^x$ depend only on $x\bmod r$, so measuring the work register and obtaining $a^{x_0}$ ($0\le x_0 < r$) leaves exactly the $x\equiv x_0\pmod r$, i.e. $x = x_0 + jr$ for $0\le j < K$, where $K = \lceil(M - x_0)/r\rceil$, with equal amplitudes. The inverse QFT gives amplitude $\frac{1}{\sqrt{MK}}e^{-2\pi ix_0y/M}\sum_{j}e^{-2\pi ijry/M}$ at $\ket y$, a geometric sum that is large ($\approx K$ in modulus) when $ry/M$ is close to an integer $s$, i.e. $y\approx sM/r$, and small otherwise — the same Fejér-kernel shape as in [[#thm-pe]]. When $r$ divides $M$ (as for $N = 15$), $K = M/r$ exactly and only the multiples of $M/r$ occur, as in [[#ex-qft-periodic]]. By [[quantum-computing/quantum-circuits#prop-deferred]], measuring the work register first or not at all gives the same counting-register statistics, so the two analyses agree.
:::
:::
