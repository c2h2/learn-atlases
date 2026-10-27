Take a fair coin and flip it: heads or tails, each with probability $1/2$. Flip it again and it is still heads or tails with probability $1/2$ each. Randomness piled on randomness stays random. Now take a single photon and send it through a half-silvered mirror. It is detected in one of two output paths, each with probability $1/2$, so the mirror looks just like a coin flip. But if, instead of detecting the photon, you recombine the two paths on a second half-silvered mirror, the photon comes out of **one particular port every time**. Two "coin flips" in a row have produced a certain result. No probability distribution over "which path the photon took" can explain this: probabilities are non-negative and cannot cancel. What does cancel are **amplitudes** — complex numbers whose squared magnitudes are probabilities and which, unlike probabilities, can add up to zero.

This chapter sets up the language of quantum computing from that observation. We describe a **qubit** by a unit vector of two complex amplitudes, write it in Dirac notation, state the postulates of quantum mechanics that a computer scientist needs (states, unitary evolution, measurement, composite systems), and picture a single qubit as a point on the **Bloch sphere**. Along the way we prove three facts that shape everything that follows: global phases are unobservable, non-orthogonal states cannot be told apart with certainty, and measurement in different bases reveals different, complementary information. The only prerequisites are complex numbers ([Maths Atlas: complex numbers](/learn/maths/lesson.php?c=complex-analysis&l=complex-numbers)) and inner-product spaces ([Maths Atlas: inner products](/learn/maths/lesson.php?c=linear-algebra&l=inner-products)); the physics behind the postulates is in [Physics Atlas: the formalism of quantum mechanics](/learn/physics/lesson.php?c=quantum-1&l=formalism).

## From probabilistic bits to amplitudes

A classical bit is $0$ or $1$. A **probabilistic bit** — a bit whose value we know only statistically — is described by a vector $(p_0, p_1)$ with $p_0, p_1 \ge 0$ and $p_0 + p_1 = 1$. Any operation on it, deterministic or random, is a **stochastic matrix**: a matrix with non-negative entries whose columns sum to $1$. A fair coin flip, applied whatever the bit was, is
$$
C = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}, \qquad C\begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}1/2\\1/2\end{pmatrix}, \qquad C^2 = C .
$$
Two flips are the same as one. The 1-norm $p_0 + p_1$ is preserved, and nothing can ever decrease the uncertainty except looking.

Quantum mechanics replaces the probability vector by a vector of **amplitudes** $(\alpha, \beta) \in \C^2$ with the **2-norm** fixed instead: $\abs{\alpha}^2 + \abs{\beta}^2 = 1$. The probability of seeing $0$ is $\abs{\alpha}^2$ and of seeing $1$ is $\abs{\beta}^2$. Operations are now matrices that preserve the 2-norm — **unitary** matrices. The quantum analogue of the half-silvered mirror is the **Hadamard** matrix
$$
H = \frac{1}{\sqrt 2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}, \qquad H\begin{pmatrix}1\\0\end{pmatrix} = \frac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}, \qquad H^2 = I .
$$
One application gives amplitudes $1/\sqrt2$ each, so a measurement sees $0$ or $1$ with probability $1/2$ — indistinguishable from the coin. A second application gives back $(1, 0)$: the two contributions to the amplitude of $1$, namely $\tfrac{1}{\sqrt2}\cdot\tfrac{1}{\sqrt2}$ and $\tfrac{1}{\sqrt2}\cdot(-\tfrac{1}{\sqrt2})$, cancel. This is **interference**, and every quantum algorithm in this course is, at bottom, a way of arranging interference so that the amplitudes of wrong answers cancel and those of right answers reinforce.

### Dirac notation

Physicists write vectors in $\C^d$ as **kets** $\ket{\psi}$. The standard basis of $\C^2$ is the **computational basis**
$$
\ket 0 = \begin{pmatrix}1\\0\end{pmatrix}, \qquad \ket 1 = \begin{pmatrix}0\\1\end{pmatrix},
$$
so $\alpha\ket0 + \beta\ket1 = (\alpha, \beta)\T$.

::: definition Dirac notation {#def-dirac}
For a column vector $\ket\psi \in \C^d$, the **bra** $\bra\psi$ is its conjugate transpose, a row vector: $\bra\psi = \ket\psi^\dagger$. The **inner product** of $\ket\phi$ and $\ket\psi$ is the number
$$
\braket{\phi|\psi} = \bra\phi\,\ket\psi = \sum_{i} \overline{\phi_i}\,\psi_i ,
$$
linear in $\ket\psi$ and conjugate-linear in $\ket\phi$, with $\braket{\psi|\phi} = \overline{\braket{\phi|\psi}}$. The **norm** is $\norm{\psi} = \sqrt{\braket{\psi|\psi}}$. The **outer product** $\ket\psi\!\bra\phi$ is the $d \times d$ matrix whose action is $\ket\chi \mapsto \braket{\phi|\chi}\,\ket\psi$. For a matrix $A$, $A^\dagger = \overline{A}\T$ is its **adjoint** (conjugate transpose), and $\bra\phi A \ket\psi = \braket{\phi|A\psi}$.
:::

Two outer products are worth memorising. If $\ket\psi$ is a unit vector, $\ket\psi\!\bra\psi$ is the orthogonal **projector** onto the line through $\ket\psi$. And if $\ket{e_1}, \dots, \ket{e_d}$ is any orthonormal basis, the projectors onto its vectors add up to the identity:
$$
\sum_{i=1}^{d} \ket{e_i}\!\bra{e_i} = I .
$$ {#eq-completeness}
Applying [[#eq-completeness]] to a vector gives its expansion in the basis, $\ket\psi = \sum_i \braket{e_i|\psi}\ket{e_i}$, so the coefficients of $\ket\psi$ in any orthonormal basis are inner products.

A second basis of $\C^2$ appears constantly. The **Hadamard basis** or $X$ basis is
$$
\ket{+} = \frac{\ket0 + \ket1}{\sqrt2}, \qquad \ket{-} = \frac{\ket0 - \ket1}{\sqrt2},
$$
which is $H\ket0$ and $H\ket1$. One checks $\braket{+|+} = \tfrac12(1 + 1) = 1$ and $\braket{+|-} = \tfrac12(1 - 1) = 0$, and conversely $\ket0 = (\ket+ + \ket-)/\sqrt2$, $\ket1 = (\ket+ - \ket-)/\sqrt2$.

::: example Inner products and normalisation {#ex-inner}
Let $\ket\psi = \frac{1}{\sqrt3}\ket0 + \frac{\sqrt2\, i}{\sqrt3}\ket1$ and $\ket\phi = \ket{-}$. Check that $\ket\psi$ is a unit vector, compute $\braket{\phi|\psi}$, and write $\ket\psi$ in the Hadamard basis.
::: solution
$\braket{\psi|\psi} = \abs{1/\sqrt3}^2 + \abs{\sqrt2 i/\sqrt3}^2 = 1/3 + 2/3 = 1$. The bra of $\ket-$ is $\tfrac{1}{\sqrt2}(1, -1)$ (real entries, so conjugation does nothing), and
$$
\braket{-|\psi} = \frac{1}{\sqrt2}\Bigl(\frac{1}{\sqrt3} - \frac{\sqrt2 i}{\sqrt3}\Bigr) = \frac{1 - \sqrt2 i}{\sqrt6}.
$$
Similarly $\braket{+|\psi} = (1 + \sqrt2 i)/\sqrt6$. By [[#eq-completeness]], $\ket\psi = \frac{1+\sqrt2 i}{\sqrt6}\ket+ + \frac{1-\sqrt2 i}{\sqrt6}\ket-$. As a check, $\abs{1 \pm \sqrt2 i}^2/6 = 3/6 = 1/2$ for each, and the two add to $1$.
:::
:::

## The postulates for quantum computing

Quantum mechanics is a framework, like probability theory, in which particular physical theories are written. For computing we need four rules. We state them for finite-dimensional systems, which is all a quantum computer uses.

::: definition Postulates of quantum mechanics (finite-dimensional) {#def-postulates}
1. **State.** The state of an isolated system is a unit vector $\ket\psi$ in a complex inner-product space $\C^d$, its **state space**. A system with $d = 2$ is a **qubit**: its states are $\alpha\ket0 + \beta\ket1$ with $\abs\alpha^2 + \abs\beta^2 = 1$.
2. **Evolution.** Between measurements, the state changes by a **unitary** matrix $U$ (one with $U^\dagger U = I$): $\ket\psi \mapsto U\ket\psi$.
3. **Measurement.** Measuring in an orthonormal basis $\ket{e_1}, \dots, \ket{e_d}$ gives outcome $i$ with probability
$$
p(i) = \abs{\braket{e_i|\psi}}^2 ,
$$
and immediately afterwards the state is $\ket{e_i}$. More generally, a **projective measurement** is a family of orthogonal projectors $P_1, \dots, P_m$ with $\sum_k P_k = I$; outcome $k$ has probability $p(k) = \bra\psi P_k\ket\psi = \norm{P_k\psi}^2$ and leaves the state $P_k\ket\psi / \norm{P_k\psi}$.
4. **Composition.** The state space of a system made of parts with spaces $\C^{d_1}$ and $\C^{d_2}$ is the tensor product $\C^{d_1} \otimes \C^{d_2} = \C^{d_1 d_2}$. In particular $n$ qubits have state space $\C^{2^n}$, with computational basis $\ket{x}$ for $x \in \{0,1\}^n$.
:::

The third postulate is the **Born rule**. Measuring in the computational basis is the usual default ("measure the qubit"), giving $0$ with probability $\abs\alpha^2$ and $1$ with probability $\abs\beta^2$. The rule is consistent: the probabilities add to $1$ because $\sum_i \abs{\braket{e_i|\psi}}^2 = \bra\psi\bigl(\sum_i \ket{e_i}\!\bra{e_i}\bigr)\ket\psi = \braket{\psi|\psi} = 1$ by [[#eq-completeness]]. The fourth postulate is the source of both the power of quantum computing — $n$ qubits need $2^n$ amplitudes — and of entanglement; it is the subject of [[quantum-computing/entanglement]]. In this chapter we stay with one qubit.

Two features of these rules have no classical counterpart. Measurement is **destructive**: it replaces the state by a basis vector, and the amplitudes $\alpha, \beta$ cannot be read off from one copy. And evolution is **reversible**: a unitary has an inverse $U^{-1} = U^\dagger$, so no information is lost between measurements. Irreversibility enters only through measurement — and through the environment, which in effect measures a system without telling us, as [[quantum-computing/error-correction]] explains.

::: proposition Unitaries preserve inner products {#prop-unitary}
For a square complex matrix $U$ the following are equivalent: (a) $U^\dagger U = I$; (b) $\braket{U\phi|U\psi} = \braket{\phi|\psi}$ for all $\ket\phi, \ket\psi$; (c) $\norm{U\psi} = \norm{\psi}$ for all $\ket\psi$. In particular unitaries map orthonormal bases to orthonormal bases, and every eigenvalue $\lambda$ of a unitary has $\abs\lambda = 1$.
:::

::: proof
(a)⇒(b): $\braket{U\phi|U\psi} = \bra\phi U^\dagger U\ket\psi = \braket{\phi|\psi}$. (b)⇒(c): take $\phi = \psi$. (c)⇒(a): the matrix $A = U^\dagger U - I$ is Hermitian and satisfies $\bra\psi A\ket\psi = \norm{U\psi}^2 - \norm{\psi}^2 = 0$ for every $\ket\psi$. A Hermitian matrix is diagonalisable with real eigenvalues in an orthonormal eigenbasis ([Maths Atlas: the spectral theorem](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)); taking $\ket\psi$ to be each eigenvector shows each eigenvalue is $0$, so $A = 0$. Finally, if $U\ket v = \lambda\ket v$ with $\ket v \ne 0$, then $\norm{v} = \norm{Uv} = \abs\lambda\,\norm{v}$, so $\abs\lambda = 1$.
:::

::: example Two Hadamards versus two coin flips {#ex-interference}
Start in $\ket0$. Apply $H$, measure, apply $H$ again, measure. Compare with applying $H$ twice and measuring once.
::: solution
*With an intermediate measurement.* $H\ket0 = \ket+$, and measuring gives $0$ or $1$ with probability $1/2$ each, leaving $\ket0$ or $\ket1$. Then $H\ket0 = \ket+$ and $H\ket1 = \ket-$ both give the final outcomes $0$ and $1$ with probability $1/2$ each. Overall: uniform, exactly like two coin flips.

*Without it.* $H(H\ket0) = H\ket+ = \tfrac{1}{\sqrt2}(H\ket0 + H\ket1) = \tfrac12(\ket0 + \ket1 + \ket0 - \ket1) = \ket0$. The final measurement gives $0$ with probability $1$. The amplitude of $\ket1$ had two contributions, $+\tfrac12$ (via $\ket0$) and $-\tfrac12$ (via $\ket1$), which cancelled. The intermediate measurement destroyed the interference by fixing which "path" was taken.
:::
:::

::: warning A superposition is not a hidden coin flip
It is tempting to read $\ket+ = (\ket0 + \ket1)/\sqrt2$ as "the qubit is $0$ or $1$, we just don't know which". That describes a different object, a 50/50 **mixture**, which is what the intermediate measurement in [[#ex-interference]] produces. The two give the same statistics in the computational basis, but $H$ turns $\ket+$ into $\ket0$ with certainty, while it leaves the mixture uniformly random. Equally misleading is "the qubit is $0$ and $1$ at the same time, so a quantum computer tries all answers in parallel": a measurement returns just one outcome, and the art of a quantum algorithm is to make interference concentrate probability on useful outcomes. Mixtures are described properly by density matrices in [[quantum-computing/error-correction]].
:::

## Measurement and what it can reveal

### Global and relative phase

Multiplying a state by a complex number of modulus one, $\ket\psi \mapsto e^{i\gamma}\ket\psi$, changes the vector but not the physics.

::: proposition Global phase is unobservable {#prop-global-phase}
For every real $\gamma$, every unitary $U$ and every projective measurement $\{P_k\}$, the states $\ket\psi$ and $e^{i\gamma}\ket\psi$ give the same outcome probabilities after $U$, and their post-measurement states differ again only by the factor $e^{i\gamma}$.
:::

::: proof
$U(e^{i\gamma}\ket\psi) = e^{i\gamma}U\ket\psi$ by linearity. For the measurement, $\norm{P_k e^{i\gamma}U\psi}^2 = \abs{e^{i\gamma}}^2\norm{P_kU\psi}^2 = \norm{P_kU\psi}^2$, and the normalised post-measurement state is $e^{i\gamma}P_kU\ket\psi/\norm{P_kU\psi}$. Since every experiment is a sequence of unitaries and measurements, induction on its length shows that no experiment can distinguish the two.
:::

So physical states are really unit vectors **up to a global phase**. A **relative phase**, however, is observable: $\ket+$ and $\ket- = \tfrac{1}{\sqrt2}(\ket0 + e^{i\pi}\ket1)$ differ only in the phase of the $\ket1$ amplitude and give identical statistics in the computational basis, yet a measurement in the Hadamard basis tells them apart with certainty. Quantum algorithms store information in relative phases and then use a change of basis — very often $H$ — to turn phase into measurable amplitude.

### Distinguishing states

Measurement extracts limited information. Given one copy of an unknown state promised to be either $\ket\psi$ or $\ket\phi$, can we tell which?

::: theorem Non-orthogonal states cannot be distinguished reliably {#thm-distinguish}
Let $\ket\psi, \ket\phi$ be unit vectors. There is a projective measurement $\{P_k\}$ and a decision rule (a function $g$ from outcomes to $\{\psi, \phi\}$) that is correct with probability $1$ for both states if and only if $\braket{\phi|\psi} = 0$.
:::

::: proof
If $\braket{\phi|\psi} = 0$, extend $\ket\psi, \ket\phi$ to an orthonormal basis and measure in it; outcome $\psi$ occurs with certainty on $\ket\psi$ and never on $\ket\phi$.

Conversely, suppose the measurement and rule are always correct. Let $Q = \sum_{k : g(k) = \psi} P_k$, a projector (a sum of mutually orthogonal projectors), and $I - Q$ the projector for "guess $\phi$". Being correct with probability $1$ means $\bra\psi Q\ket\psi = 1$ and $\bra\phi Q\ket\phi = 0$. Since $\norm{Q\psi}^2 = \bra\psi Q\ket\psi = 1 = \norm{\psi}^2$ and $\norm{Q\psi}^2 + \norm{(I-Q)\psi}^2 = \norm\psi^2$, we get $(I-Q)\ket\psi = 0$, i.e. $Q\ket\psi = \ket\psi$. Likewise $\norm{Q\phi} = 0$, so $Q\ket\phi = 0$. Then, using $Q = Q^\dagger$,
$$
\braket{\phi|\psi} = \braket{\phi|Q\psi} = \braket{Q\phi|\psi} = 0. \qquad
$$
:::

The theorem is the reason quantum states cannot simply be read out and copied, and it is closely related to the **no-cloning theorem** of [[quantum-computing/entanglement]]: if non-orthogonal states could be copied, many copies would let us distinguish them. It is also the basis of quantum key distribution (see the application below). When the states are not orthogonal, the best possible success probability with equal priors is $\tfrac12 + \tfrac12\sqrt{1 - \abs{\braket{\phi|\psi}}^2}$ (the **Helstrom bound**, 1976); [[#ex-helstrom]] finds a measurement that attains it for $\ket0$ versus $\ket+$.

::: example Measurement disturbs {#ex-disturb}
A qubit is prepared in $\ket0$. We measure it in the $Z$ basis, then in the $X$ basis, then in the $Z$ basis again. What is the probability that the last measurement gives $1$? What would it be without the middle measurement?
::: solution
The first $Z$ measurement gives $0$ with certainty and leaves $\ket0$. The $X$ measurement gives $+$ or $-$ with probability $\abs{\braket{\pm|0}}^2 = 1/2$ each and leaves $\ket+$ or $\ket-$. Either way the last $Z$ measurement gives $1$ with probability $\abs{\braket{1|\pm}}^2 = 1/2$, so the answer is $\tfrac12\cdot\tfrac12 + \tfrac12\cdot\tfrac12 = 1/2$. Without the middle measurement the state stays $\ket0$ and the probability is $0$. Measuring $X$ erased the information that the qubit was $\ket0$: the $Z$ and $X$ bases are **complementary** — complete knowledge of one outcome means complete ignorance of the other. This is the qubit version of Heisenberg's uncertainty principle, and it is exactly what an eavesdropper on BB84 (below) runs into.
:::
:::

### Observables and expectation values

Physicists often describe a measurement by a Hermitian matrix $A = \sum_k a_k P_k$, an **observable**, whose eigenvalues $a_k$ label the outcomes and whose eigenspaces are the ranges of the $P_k$. The **expectation value** of the outcome is then
$$
\langle A \rangle_\psi = \sum_k a_k\,\bra\psi P_k\ket\psi = \bra\psi A \ket\psi .
$$
The three **Pauli matrices**
$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}, \qquad Y = \begin{pmatrix} 0 & -i \\ i & 0\end{pmatrix}, \qquad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1\end{pmatrix}
$$
are Hermitian and unitary with eigenvalues $\pm1$. "Measuring $Z$" is measuring in the computational basis, recording $+1$ for $0$ and $-1$ for $1$; "measuring $X$" is measuring in the basis $\ket\pm$; "measuring $Y$" uses the basis $\ket{\pm i} = (\ket0 \pm i\ket1)/\sqrt2$. For $\ket\psi = \alpha\ket0 + \beta\ket1$,
$$
\langle Z\rangle = \abs\alpha^2 - \abs\beta^2, \qquad \langle X\rangle = 2\operatorname{Re}(\overline\alpha\beta), \qquad \langle Y \rangle = 2\operatorname{Im}(\overline\alpha\beta).
$$ {#eq-pauli-exp}
(For example $\bra\psi X\ket\psi = \overline\alpha\beta + \overline\beta\alpha = 2\operatorname{Re}(\overline\alpha\beta)$.) For an electron, these are the three components of its spin, measured with a Stern–Gerlach magnet ([Physics Atlas: spin](/learn/physics/lesson.php?c=quantum-1&l=spin)); for a computer scientist they are three complementary questions one can ask a qubit, each answerable only statistically.

The program below computes measurement probabilities in a chosen basis and simulates repeated measurement ("shots"), which is how every real quantum computer reports results. It uses Python's built-in `complex` type; no libraries are needed.

```python
import cmath, math, random

def bloch(alpha, beta):
    """Bloch-sphere coordinates (x, y, z) of the qubit alpha|0> + beta|1>."""
    x = 2 * (alpha.conjugate() * beta).real
    y = 2 * (alpha.conjugate() * beta).imag
    z = abs(alpha) ** 2 - abs(beta) ** 2
    return round(x, 4), round(y, 4), round(z, 4)

def measure_basis(state, basis, shots, rng):
    """Measure `state` in an orthonormal basis `shots` times; count outcomes."""
    p = [abs(sum(b.conjugate() * a for b, a in zip(v, state))) ** 2 for v in basis]
    counts = [0] * len(basis)
    for _ in range(shots):
        counts[0 if rng.random() < p[0] else 1] += 1
    return [round(q, 4) for q in p], counts

r2 = 1 / math.sqrt(2)
plus = [r2, r2]                                  # |+>
psi = [math.cos(math.pi / 8), cmath.exp(1j * math.pi / 2) * math.sin(math.pi / 8)]
Zb = [[1, 0], [0, 1]]                            # computational basis
Xb = [[r2, r2], [r2, -r2]]                       # |+>, |->
rng = random.Random(2026)
print("bloch(|+>)   =", bloch(complex(r2), complex(r2)))
print("bloch(psi)   =", bloch(complex(psi[0]), psi[1]))
print("|+> in Z:", measure_basis(plus, Zb, 1000, rng))
print("|+> in X:", measure_basis(plus, Xb, 1000, rng))
print("psi in Z:", measure_basis(psi, Zb, 1000, rng))
```

```console
$ python3 measure.py
bloch(|+>)   = (1.0, 0.0, 0.0)
bloch(psi)   = (0.0, 0.7071, 0.7071)
|+> in Z: ([0.5, 0.5], [495, 505])
|+> in X: ([1.0, 0.0], [1000, 0])
psi in Z: ([0.8536, 0.1464], [854, 146])
```

The state $\ket+$ gives coin-flip statistics in $Z$ but a certain outcome in $X$. The counts fluctuate around the probabilities: with $1000$ shots the standard deviation of a count with $p = 1/2$ is $\sqrt{1000 \cdot \tfrac12\cdot\tfrac12} \approx 16$, so estimating an amplitude to $k$ decimal places needs on the order of $10^{2k}$ repetitions of the whole computation. The figure shows the distribution of such counts.

::: widget distribution
dist: binomial
params: n=100, p=0.8536
a: 80
b: 90
normal: true
caption: The number of $0$ outcomes in $100$ shots of a state with $\Prob(0) = \cos^2(\pi/8) \approx 0.854$. Change $n$ to see the spread grow like $\sqrt n$ while the relative spread shrinks like $1/\sqrt n$. Every probability you read off a quantum computer is an estimate of this kind.
:::

::: quiz
Which of the following pairs of single-qubit states give *different* probabilities for at least one measurement? (Select all that apply.)
- [ ] $\ket1$ and $-\ket1$
- [x] $\ket+$ and $\ket-$
- [x] $\tfrac{1}{\sqrt2}(\ket0 + i\ket1)$ and $\tfrac{1}{\sqrt2}(\ket0 - i\ket1)$
- [ ] $\tfrac{1}{\sqrt2}(i\ket0 + \ket1)$ and $\tfrac{1}{\sqrt2}(\ket0 - i\ket1)$
::: solution
$-\ket1 = e^{i\pi}\ket1$ differs by a global phase, and $\tfrac{1}{\sqrt2}(i\ket0 + \ket1) = i\cdot\tfrac{1}{\sqrt2}(\ket0 - i\ket1)$ likewise, so by [[#prop-global-phase]] no measurement distinguishes them. $\ket\pm$ differ by a relative phase and are separated by an $X$ measurement; the states $\ket{\pm i}$ are separated by a $Y$ measurement.
:::
:::

## The Bloch sphere

A qubit state has two complex amplitudes, four real numbers, constrained by normalisation (one equation) and defined only up to global phase (one more parameter). That leaves two real parameters — the right number for a point on a sphere.

::: theorem Bloch-sphere representation {#thm-bloch}
Every single-qubit state is, up to global phase, equal to
$$
\ket{\psi(\theta, \varphi)} = \cos\frac\theta2\,\ket0 + e^{i\varphi}\sin\frac\theta2\,\ket1
$$ {#eq-bloch}
for a unique $\theta \in [0, \pi]$ and, when $0 < \theta < \pi$, a unique $\varphi \in [0, 2\pi)$. The **Bloch vector** of the state is the unit vector $\vec r = (\sin\theta\cos\varphi, \sin\theta\sin\varphi, \cos\theta) = (\langle X\rangle, \langle Y\rangle, \langle Z\rangle)$, and the map from states (up to phase) to points of the unit sphere is a bijection.
:::

::: proof
Let $\ket\psi = \alpha\ket0 + \beta\ket1$ with $\abs\alpha^2 + \abs\beta^2 = 1$. If $\alpha \ne 0$, multiply by the global phase $\overline\alpha/\abs\alpha$ to make the $\ket0$ amplitude real and positive; if $\alpha = 0$, the state is $\ket1$ up to phase, which is [[#eq-bloch]] with $\theta = \pi$. Now $\alpha = a > 0$ and $\abs\beta = \sqrt{1 - a^2}$, so there is a unique $\theta \in [0, \pi)$ with $\cos(\theta/2) = a$ and $\sin(\theta/2) = \abs\beta$ (because $\theta/2 \in [0, \pi/2)$ and cosine is a bijection from there to $(0, 1]$). If $\beta \ne 0$, write $\beta = \abs\beta e^{i\varphi}$ with a unique $\varphi \in [0, 2\pi)$; if $\beta = 0$ then $\theta = 0$ and $\varphi$ is irrelevant. Uniqueness of $\theta$ also holds across the two cases, since $\theta$ is determined by $\abs\alpha = \cos(\theta/2)$, which does not depend on the phase.

For the Bloch vector, apply [[#eq-pauli-exp]] with $\alpha = \cos\frac\theta2$, $\beta = e^{i\varphi}\sin\frac\theta2$: $\langle Z\rangle = \cos^2\frac\theta2 - \sin^2\frac\theta2 = \cos\theta$ and $\overline\alpha\beta = e^{i\varphi}\cos\frac\theta2\sin\frac\theta2 = \tfrac12 e^{i\varphi}\sin\theta$, so $\langle X\rangle = \sin\theta\cos\varphi$ and $\langle Y\rangle = \sin\theta\sin\varphi$. These are spherical coordinates with polar angle $\theta$ and azimuth $\varphi$, and spherical coordinates with $\theta \in [0, \pi]$ and $\varphi$ as above cover every point of the sphere exactly once (the poles having arbitrary $\varphi$), which gives the bijection.
:::

The north pole is $\ket0$, the south pole $\ket1$, and the equator holds the equal superpositions $\tfrac{1}{\sqrt2}(\ket0 + e^{i\varphi}\ket1)$: $\ket+$ on the $+x$ axis, $\ket{+i}$ on $+y$, $\ket-$ on $-x$, $\ket{-i}$ on $-y$. Notice the half-angles: $\ket0$ and $\ket1$ are orthogonal as vectors but antipodal, $180°$ apart, on the sphere. That is general.

::: proposition Overlap from Bloch vectors {#prop-overlap}
If $\ket\psi, \ket\phi$ have Bloch vectors $\vec r, \vec s$, then $\abs{\braket{\phi|\psi}}^2 = \tfrac12(1 + \vec r\cdot\vec s)$. In particular two states are orthogonal if and only if their Bloch vectors are antipodal, and measuring $\ket\psi$ in the basis $\{\ket\phi, \ket{\phi^\perp}\}$ gives the outcome $\phi$ with probability $\cos^2(\Theta/2)$, where $\Theta$ is the angle between $\vec r$ and $\vec s$.
:::

::: proof
For a unit vector $\ket\phi$ with Bloch vector $\vec s$, the projector is
$$
\ket\phi\!\bra\phi = \tfrac12\bigl(I + s_x X + s_y Y + s_z Z\bigr).
$$
To verify it, write $\ket\phi = (a, b)\T$; then $\ket\phi\!\bra\phi = \begin{pmatrix}\abs a^2 & a\overline b\\ \overline a b & \abs b^2\end{pmatrix}$, while the right-hand side is $\tfrac12\begin{pmatrix}1 + s_z & s_x - is_y\\ s_x + is_y & 1 - s_z\end{pmatrix}$; by [[#eq-pauli-exp]], $s_z = \abs a^2 - \abs b^2$ and $s_x + is_y = 2\overline a b$, and the entries agree because $\abs a^2 + \abs b^2 = 1$. Hence
$$
\abs{\braket{\phi|\psi}}^2 = \bra\psi\,\ket\phi\!\bra\phi\,\ket\psi = \tfrac12\bigl(1 + s_x\langle X\rangle_\psi + s_y\langle Y\rangle_\psi + s_z\langle Z\rangle_\psi\bigr) = \tfrac12(1 + \vec s\cdot\vec r).
$$
This is $0$ exactly when $\vec r\cdot\vec s = -1$, i.e. $\vec s = -\vec r$, and with $\vec r\cdot\vec s = \cos\Theta$ it equals $\tfrac12(1 + \cos\Theta) = \cos^2(\Theta/2)$.
:::

::: example Measuring a tilted state {#ex-tilted}
A qubit has Bloch vector at polar angle $\theta = \pi/4$ and azimuth $\varphi = \pi/2$ (the state `psi` in the program above). Find its amplitudes, its Bloch vector, and the probabilities of the outcomes of $Z$, $X$ and $Y$ measurements.
::: solution
By [[#eq-bloch]], $\ket\psi = \cos\frac\pi8\ket0 + i\sin\frac\pi8\ket1 \approx 0.924\ket0 + 0.383i\ket1$. Its Bloch vector is $(\sin\frac\pi4\cos\frac\pi2, \sin\frac\pi4\sin\frac\pi2, \cos\frac\pi4) = (0, \tfrac{1}{\sqrt2}, \tfrac{1}{\sqrt2})$, as the program printed. By [[#prop-overlap]] the probability of the $+1$ outcome along an axis with unit vector $\vec s$ is $\tfrac12(1 + \vec r\cdot\vec s)$:

| measurement | $\vec r \cdot \vec s$ | $\Prob(+1)$ | $\Prob(-1)$ |
|---|---|---|---|
| $Z$ | $1/\sqrt2$ | $\tfrac12 + \tfrac{\sqrt2}{4} \approx 0.854$ | $\approx 0.146$ |
| $X$ | $0$ | $1/2$ | $1/2$ |
| $Y$ | $1/\sqrt2$ | $\approx 0.854$ | $\approx 0.146$ |

The $Z$ row matches the simulated counts $854$ and $146$. No single measurement reveals $\vec r$; the three together determine it, which is the idea of **state tomography** ([[#ex-tomography]]).
:::
:::

Unitaries act on the Bloch sphere as rotations — $X$ is a rotation by $\pi$ about the $x$ axis, $Z$ by $\pi$ about $z$, and $H$ by $\pi$ about the axis $(x + z)/\sqrt2$, swapping $\ket0 \leftrightarrow \ket+$ — a fact we prove and use in [[quantum-computing/quantum-circuits]]. The figure lets you explore the measurement probabilities of [[#prop-overlap]].

::: widget plot
f: cos(x/2)^2; (1 + sin(x)*cos(p))/2; (1 + sin(x)*sin(p))/2
x: 0, pi
y: 0, 1
sliders: p=0:0:6.2832:0.01
labels: \Prob(0) = \cos^2(\theta/2); \Prob(+) ; \Prob(+i)
piticks: true
caption: Outcome probabilities for the state $\cos\frac\theta2\ket0 + e^{i\varphi}\sin\frac\theta2\ket1$ as functions of the polar angle $\theta$ (horizontal axis), with the azimuth $\varphi$ set by the slider $p$. The $Z$ statistics do not depend on $\varphi$ at all; the relative phase shows up only in the $X$ and $Y$ measurements. At $\theta = \pi/2$ (the equator) try $p = 0$, $\pi/2$, $\pi$.
:::

::: warning The Bloch sphere does not store a continuum of information
A point on the sphere takes infinitely many bits to specify, but a qubit cannot be used to carry more than one classical bit. **Holevo's theorem** (1973) states that if $n$ qubits are prepared in states that depend on a classical message and then measured in any way, the mutual information between the message and the outcome is at most $n$ bits. The angles $\theta, \varphi$ are parameters of a probability distribution that can only be estimated, to precision about $1/\sqrt{k}$ from $k$ copies. (With shared entanglement, two classical bits per qubit are possible — superdense coding in [[quantum-computing/entanglement]] — consistent with Holevo once the entangled qubits are counted.) Also, the Bloch sphere describes one qubit only; there is no comparably simple picture of $n$ qubits.
:::

::: application Quantum key distribution
[[#thm-distinguish]] has a cryptographic use. In the **BB84** protocol (Bennett and Brassard, 1984) Alice sends Bob random bits, each encoded in a random choice of the $Z$ basis ($\ket0, \ket1$) or the $X$ basis ($\ket+, \ket-$). Bob measures each in a random basis; afterwards they announce the bases (not the bits) over a public authenticated channel and keep the positions where they matched. An eavesdropper who does not know the basis is facing the non-orthogonal states $\ket0, \ket+, \ket1, \ket-$; any measurement that gains information disturbs the states, and comparing a random sample of the kept bits reveals errors at a rate of about $25\%$ for a full intercept-and-resend attack. Security rests on physics rather than computational hardness, but real systems need authenticated classical channels, trusted devices and dedicated links; it is a complement to, not a replacement for, the post-quantum cryptography of [[cryptography/post-quantum]].
:::

## Where the formalism comes from

The postulates are not derived here; they summarise a century of experiment. The two-dimensional state space appears physically as the spin of an electron, the polarisation of a photon, two energy levels of an atom or ion, or the two lowest states of a superconducting circuit — the platforms of [[quantum-computing/quantum-hardware]]. What makes such a system a *computational* qubit is that we can prepare $\ket0$, apply a set of unitaries accurately, and measure in the computational basis. Everything else is mathematics, and the mathematics is linear algebra over $\C$.

Two consequences of linearity deserve emphasis now, because they recur. First, it suffices to know what a unitary does to a basis: $U(\alpha\ket0 + \beta\ket1) = \alpha U\ket0 + \beta U\ket1$, so to verify a circuit we check it on basis states and on enough superpositions to fix relative phases. Second, quantum mechanics is **not** a theory of probabilities over hidden classical states with extra rules: [[#ex-interference]] already shows a phenomenon no stochastic model of a single bit reproduces with the same operations, and the CHSH game of [[quantum-computing/entanglement]] rules out a large class of hidden-variable explanations altogether.

::: history
The rules in this chapter took shape in 1925–1932: Heisenberg's matrix mechanics (1925), Schrödinger's wave equation (1926), Born's probability interpretation of the wavefunction (1926, Nobel Prize 1954) and von Neumann's *Mathematical Foundations of Quantum Mechanics* (1932), which set the theory in Hilbert space and introduced projective measurement. Dirac introduced the bra–ket notation in 1939. The Stern–Gerlach experiment (1922) was the first to show a two-valued quantum degree of freedom, later identified as electron spin. The word **qubit** was coined by Benjamin Schumacher in his 1995 paper on quantum coding, crediting a conversation with William Wootters. Alexander Holevo proved his bound in 1973, and Charles Bennett and Gilles Brassard proposed BB84 in 1984. The idea that quantum systems might compute came from Richard Feynman's 1982 lecture "Simulating physics with computers" and David Deutsch's 1985 quantum Turing machine, discussed in the next chapters.
:::

## Where this leads

[[quantum-computing/quantum-circuits]] builds unitaries from small **gates** and introduces the circuit model, with a short state-vector simulator in Python that we use for the rest of the course. [[quantum-computing/entanglement]] takes up the composition postulate: many-qubit states, entanglement, the no-cloning theorem and teleportation. Measurement in a rotated basis, phase as information and interference are the working parts of the algorithms in [[quantum-computing/first-algorithms]], [[quantum-computing/shor]] and [[quantum-computing/grover]]. Mixed states, which we only glimpsed in the warning about superposition, are described by density matrices in [[quantum-computing/error-correction]]. For the physics of two-level systems see [Physics Atlas: spin](/learn/physics/lesson.php?c=quantum-1&l=spin).

::: summary
- A qubit is a unit vector $\alpha\ket0 + \beta\ket1 \in \C^2$; measuring it gives $0$ with probability $\abs\alpha^2$ and $1$ with probability $\abs\beta^2$, and leaves the corresponding basis state.
- Amplitudes, unlike probabilities, can cancel: that **interference** ([[#ex-interference]]) is what quantum algorithms exploit.
- Evolution between measurements is unitary, hence reversible and inner-product preserving ([[#prop-unitary]]); $n$ qubits have $2^n$ amplitudes.
- Measurement in any orthonormal basis follows the Born rule $p(i) = \abs{\braket{e_i|\psi}}^2$; global phases are unobservable, relative phases are not ([[#prop-global-phase]]).
- Non-orthogonal states cannot be distinguished with certainty ([[#thm-distinguish]]); this underlies no-cloning and quantum key distribution.
- Up to phase, single-qubit states are points of the **Bloch sphere** ([[#thm-bloch]]); orthogonal states are antipodal and $\abs{\braket{\phi|\psi}}^2 = \tfrac12(1 + \vec r\cdot\vec s)$.
- Despite its continuum of states, a qubit carries at most one classical bit (Holevo); amplitudes can only be estimated statistically from many shots.
:::

## Exercises

::: exercise A measurement probability {level=1 check="2/3"}
A qubit is in the state $\frac{1}{\sqrt3}\ket0 + \frac{\sqrt2 i}{\sqrt3}\ket1$ of [[#ex-inner]]. What is the probability that a computational-basis measurement gives $1$? (Enter a fraction.)
::: solution
$\abs{\sqrt2 i/\sqrt3}^2 = 2/3$. The factor $i$ has modulus $1$ and does not affect the probability; it would matter for a measurement in another basis.
:::
:::

::: exercise Normalising {level=1 check="3/5"}
The vector $3\ket0 + 4i\ket1$ is not a unit vector. Normalise it, so that the amplitude of $\ket0$ is real and positive. What is that amplitude? (Enter a fraction.)
::: solution
Its norm is $\sqrt{\abs3^2 + \abs{4i}^2} = \sqrt{9 + 16} = 5$, so the state is $\tfrac35\ket0 + \tfrac{4i}{5}\ket1$; the amplitude of $\ket0$ is $3/5$, and the outcome probabilities are $9/25$ and $16/25$.
:::
:::

::: exercise Bloch coordinates {level=1}
Find the Bloch vectors of $\ket{+i} = \tfrac{1}{\sqrt2}(\ket0 + i\ket1)$, of $\ket{-}$, and of $\tfrac{\sqrt3}{2}\ket0 + \tfrac12\ket1$. Which pairs among $\ket0, \ket1, \ket\pm, \ket{\pm i}$ are orthogonal?
::: solution
By [[#eq-pauli-exp]]: for $\ket{+i}$, $\alpha = \beta/i = 1/\sqrt2$ and $\overline\alpha\beta = i/2$, so $\vec r = (0, 1, 0)$. For $\ket-$, $\overline\alpha\beta = -1/2$, so $\vec r = (-1, 0, 0)$. For the third state $\langle Z\rangle = 3/4 - 1/4 = 1/2$ and $\overline\alpha\beta = \sqrt3/4$, so $\vec r = (\sqrt3/2, 0, 1/2)$: polar angle $\theta = \pi/3$, as $\cos(\pi/6) = \sqrt3/2$ confirms. By [[#prop-overlap]] the orthogonal pairs are the antipodal ones: $\{\ket0, \ket1\}$, $\{\ket+, \ket-\}$, $\{\ket{+i}, \ket{-i}\}$. Every other pair has overlap $1/2$.
:::
:::

::: exercise A tilted state in the Hadamard basis {level=2 check="(2+sqrt(2))/4"}
The state $\cos\frac\pi8\ket0 + \sin\frac\pi8\ket1$ is measured in the basis $\ket+, \ket-$. What is the probability of the outcome $+$? (Enter an exact expression.)
::: solution
$\braket{+|\psi} = \tfrac{1}{\sqrt2}(\cos\frac\pi8 + \sin\frac\pi8)$, so $\Prob(+) = \tfrac12(\cos\frac\pi8 + \sin\frac\pi8)^2 = \tfrac12(1 + 2\sin\frac\pi8\cos\frac\pi8) = \tfrac12(1 + \sin\frac\pi4) = \tfrac12 + \tfrac{\sqrt2}{4} = \tfrac{2 + \sqrt2}{4} \approx 0.854$. Alternatively, by [[#prop-overlap]], the Bloch vector is at $\theta = \pi/4$ in the $xz$ plane, at angle $\pi/4$ from the $x$ axis, so $\Prob(+) = \cos^2(\pi/8)$, the same number.
:::
:::

::: exercise Orthogonal Bloch vectors {level=2 check="1/2"}
Two qubit states have Bloch vectors at right angles. What is the probability that measuring one in a basis containing the other gives that other state? (Enter a fraction.)
::: solution
By [[#prop-overlap]], $\abs{\braket{\phi|\psi}}^2 = \tfrac12(1 + \cos 90°) = 1/2$. For example $\ket0$ measured in the basis $\ket\pm$, or $\ket+$ measured in the basis $\ket{\pm i}$. Vectors at right angles on the Bloch sphere correspond to **mutually unbiased** bases: knowing the outcome in one tells you nothing about the other.
:::
:::

::: exercise Eigenvalues and the Pauli matrices {level=2}
(a) Show that $X$, $Y$ and $Z$ are Hermitian and unitary, square to $I$, and pairwise **anticommute** ($XY = -YX$ and so on), with $XY = iZ$, $YZ = iX$, $ZX = iY$. (b) Deduce that each has eigenvalues $\pm1$ and find the eigenvectors of $Y$. (c) Show that for any unit vector $\vec n$, $\vec n\cdot\vec\sigma = n_xX + n_yY + n_zZ$ also squares to $I$.
::: solution
(a) Each matrix equals its conjugate transpose (for $Y$: $\overline{Y}\T = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}$). Direct multiplication gives $X^2 = Y^2 = Z^2 = I$; Hermitian and squaring to $I$ means $P^\dagger P = P^2 = I$, so each is unitary. $XY = \begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}0&-i\\i&0\end{pmatrix} = \begin{pmatrix}i&0\\0&-i\end{pmatrix} = iZ$ and $YX = \begin{pmatrix}-i&0\\0&i\end{pmatrix} = -iZ$, so they anticommute; the other two products are similar. (b) If $P\ket v = \lambda\ket v$ then $\ket v = P^2\ket v = \lambda^2\ket v$, so $\lambda = \pm1$; both occur because the trace is $0$. $Y\ket{\pm i} = \tfrac{1}{\sqrt2}(-i\cdot(\pm i)\ket0 + i\ket1) = \pm\ket{\pm i}$, so the eigenvectors are $\ket{\pm i} = (\ket0 \pm i\ket1)/\sqrt2$. (c) $(\vec n\cdot\vec\sigma)^2 = \sum_j n_j^2 P_j^2 + \sum_{j<k} n_jn_k(P_jP_k + P_kP_j) = (n_x^2 + n_y^2 + n_z^2)I + 0 = I$. So "measuring spin along $\vec n$" has outcomes $\pm1$, with eigenvectors at the points $\pm\vec n$ of the Bloch sphere.
:::
:::

::: exercise Measure the Bloch vector {#ex-tomography level=2}
Write a Python function that, given a single-qubit state, simulates $k$ shots each of $X$, $Y$ and $Z$ measurements and estimates the Bloch vector. Run it with $k = 100$ and $k = 10\,000$ on the state with $\theta = 2\pi/3$, $\varphi = \pi/4$ and compare with the exact vector. How does the error scale?
::: solution
Along each axis the $+1$ outcome has probability $p = \tfrac12(1 + r_{\text{axis}})$ ([[#prop-overlap]]), so $r_{\text{axis}} = 2p - 1$ is estimated by $2k_+/k - 1$.

```python
import cmath, math, random

def prob_first(state, v):              # probability of the outcome v
    return abs(v[0].conjugate() * state[0] + v[1].conjugate() * state[1]) ** 2

def estimate_bloch(state, shots, rng):
    r2 = 1 / math.sqrt(2)
    bases = {"x": [r2, r2], "y": [r2, 1j * r2], "z": [1, 0]}   # |+>, |+i>, |0>
    est = []
    for axis, v in bases.items():
        p = prob_first(state, [complex(a) for a in v])
        k = sum(rng.random() < p for _ in range(shots))       # simulated shots
        est.append(round(2 * k / shots - 1, 3))                # r_axis = P(+) - P(-)
    return est

theta, phi = 2 * math.pi / 3, math.pi / 4
state = [math.cos(theta / 2), cmath.exp(1j * phi) * math.sin(theta / 2)]
exact = [math.sin(theta) * math.cos(phi), math.sin(theta) * math.sin(phi), math.cos(theta)]
print("exact    ", [round(c, 3) for c in exact])
rng = random.Random(1)
for shots in (100, 10000):
    print(f"{shots:>6} shots", estimate_bloch(state, shots, rng))
```

```console
$ python3 tomography.py
exact     [0.612, 0.612, -0.5]
   100 shots [0.6, 0.68, -0.44]
 10000 shots [0.606, 0.614, -0.498]
```

Each estimate has standard deviation $2\sqrt{p(1-p)/k} \le 1/\sqrt k$: about $0.1$ for $k = 100$ and $0.01$ for $k = 10\,000$, as observed. Halving the error costs four times as many copies.
:::
:::

::: exercise Telling $\ket0$ from $\ket+$ {#ex-helstrom level=3 check="1/2+sqrt(2)/4"}
You are given $\ket0$ or $\ket+$, each with probability $1/2$, and may measure once in any orthonormal basis. Find a basis whose best decision rule succeeds with probability $\tfrac12 + \tfrac12\sqrt{1 - \abs{\braket{0|+}}^2}$, and compute that probability. (Enter it as an exact expression.)
::: solution
The Bloch vectors of $\ket0$ and $\ket+$ are $+z$ and $+x$, at $90°$. Measure along the axis $\vec m$ parallel to the difference of the two Bloch vectors: take the basis whose Bloch vectors are $\pm\vec m$ with $\vec m = (\hat z - \hat x)/\sqrt2 = (-1, 0, 1)/\sqrt2$, i.e. at $45°$ from $+z$, on the side away from $+x$. Guess "$\ket0$" on outcome $+\vec m$ and "$\ket+$" on outcome $-\vec m$. By [[#prop-overlap]],
$$
\Prob(\text{correct}) = \tfrac12\cdot\tfrac12(1 + \hat z\cdot\vec m) + \tfrac12\cdot\tfrac12(1 - \hat x\cdot\vec m) = \tfrac14\Bigl(1 + \tfrac{1}{\sqrt2}\Bigr) + \tfrac14\Bigl(1 + \tfrac{1}{\sqrt2}\Bigr) = \tfrac12 + \tfrac{\sqrt2}{4} \approx 0.854.
$$
Since $\abs{\braket{0|+}}^2 = 1/2$, the Helstrom expression is $\tfrac12 + \tfrac12\sqrt{1/2} = \tfrac12 + \tfrac{\sqrt2}{4}$, the same. (In general, for Bloch vectors $\vec r, \vec s$ and a measurement axis $\vec m$, the success probability is $\tfrac12 + \tfrac14\,\vec m\cdot(\vec r - \vec s)$, maximised by $\vec m$ parallel to $\vec r - \vec s$, giving $\tfrac12 + \tfrac14\norm{\vec r - \vec s}$; and $\norm{\vec r - \vec s}^2 = 2 - 2\vec r\cdot\vec s = 4(1 - \abs{\braket{\phi|\psi}}^2)$ by [[#prop-overlap]], which recovers the Helstrom formula for basis measurements.) In the computational basis the best rule succeeds only with probability $3/4$.
:::
:::

::: exercise Matrices that are both stochastic and unitary {level=3}
Show that a real $d\times d$ matrix with non-negative entries whose columns sum to $1$ (a stochastic matrix) is unitary if and only if it is a permutation matrix. Interpret the result: which operations do probabilistic and quantum bits have in common?
::: solution
A permutation matrix is clearly both. Conversely, let $M$ be stochastic and unitary, and let $x_1, \dots, x_d \in [0, 1]$ be the entries of one column. Stochasticity gives $\sum_i x_i = 1$, and unitarity (unit 2-norm columns) gives $\sum_i x_i^2 = 1$. Since $0 \le x_i \le 1$ we have $x_i^2 \le x_i$, with equality iff $x_i \in \{0, 1\}$; so $\sum_i (x_i - x_i^2) = 0$ forces every $x_i \in \{0, 1\}$, and exactly one equals $1$. Each column is a standard basis vector, and since the columns of a unitary are orthonormal, they are distinct: $M$ is a permutation matrix. So the only operations available to both models are reversible deterministic ones, permutations of basis states. Everything beyond that — coin flips on one side, interference on the other — is specific to each model; [[quantum-computing/quantum-circuits]] shows that permutations (reversible classical circuits) embed into quantum computation, which is why quantum computers can run any classical algorithm.
:::
:::

::: exercise The expectation of $Z$ {level=1 check="1/2"}
What is $\langle Z\rangle$ for the state $\cos\frac\pi6\ket0 + e^{i\pi/5}\sin\frac\pi6\ket1$? (Enter a fraction.)
::: solution
By [[#thm-bloch]], $\theta = \pi/3$ and $\langle Z\rangle = \cos\theta = 1/2$; equivalently $\cos^2\frac\pi6 - \sin^2\frac\pi6 = \frac34 - \frac14 = \frac12$. The phase $e^{i\pi/5}$ only affects $\langle X\rangle$ and $\langle Y\rangle$.
:::
:::
