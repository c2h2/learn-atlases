Every physical qubit is leaky. Stray electromagnetic fields rotate it, imperfect pulses over- or under-rotate it, and its environment — phonons, two-level defects, the measurement apparatus itself — slowly learns its state and in doing so destroys its superpositions. On the best hardware of 2026, a two-qubit gate fails roughly once in a few hundred to a few thousand applications. Shor's algorithm for a 2048-bit number needs billions of gates. Without some way to correct errors as they happen, a quantum computer could never run it.

Classical computers protect information by redundancy — store three copies, take a majority vote. For a long time it seemed that quantum information could not be protected that way: copying is forbidden by the no-cloning theorem ([[quantum-computing/entanglement#thm-no-cloning]]), looking at the qubits to check them destroys superpositions, and errors are continuous — a rotation by any small angle — rather than discrete bit flips. In 1995 Peter Shor showed that all three obstacles can be overcome, and within two years the **threshold theorem** showed that arbitrarily long quantum computations are possible with noisy components, provided the noise is below a constant threshold. This chapter explains how. We first need a language for noise: **density matrices** and **quantum channels**. Then we build the three-qubit bit-flip and phase-flip codes, Shor's nine-qubit code, and the **stabiliser formalism** that describes nearly every code in use, including the surface code; and we state the threshold theorem. Every code is simulated with `qsim.py` ([[quantum-computing/quantum-circuits]]).

## Density matrices

A state vector describes a system we know completely. If a qubit is in state $\ket{\psi_i}$ with probability $p_i$ — because a preparation device is unreliable, or because the qubit is entangled with something we do not see — no single vector describes the statistics of all measurements. A matrix does.

::: definition Density matrix {#def-density}
An **ensemble** $\{(p_i, \ket{\psi_i})\}$ (probabilities $p_i$ summing to $1$, unit vectors $\ket{\psi_i}$) has **density matrix**
$$
\rho = \sum_i p_i\ket{\psi_i}\!\bra{\psi_i}.
$$
A matrix is a density matrix of some ensemble if and only if it is Hermitian, positive semidefinite ($\bra v\rho\ket v\ge0$ for all $\ket v$) and has trace $1$. The state is **pure** if $\rho = \ket\psi\!\bra\psi$ for one vector, which happens if and only if $\tr\rho^2 = 1$; otherwise it is **mixed**, with $\tr\rho^2 < 1$.
:::

All the postulates of [[quantum-computing/qubits#def-postulates]] carry over. A projective measurement $\{P_k\}$ gives outcome $k$ with probability $\tr(P_k\rho)$ — the average over the ensemble of $\bra{\psi_i}P_k\ket{\psi_i}$ — and leaves the state $P_k\rho P_k/\tr(P_k\rho)$; a unitary maps $\rho\mapsto U\rho U^\dagger$; and the expectation of an observable $A$ is $\tr(A\rho)$. Two ensembles with the same density matrix give identical statistics for every experiment, so the density matrix *is* the state. For one qubit the projector formula of [[quantum-computing/qubits#prop-overlap]] extends to
$$
\rho = \tfrac12\bigl(I + r_xX + r_yY + r_zZ\bigr), \qquad \abs{\vec r}\le 1, \qquad \tr\rho^2 = \tfrac12(1 + \abs{\vec r}^2),
$$ {#eq-bloch-ball}
where $r_j = \tr(\rho\sigma_j)$: mixed states fill the inside of the Bloch sphere, the **Bloch ball**, with pure states on the surface and the **maximally mixed state** $I/2$ at the centre.

This resolves the warning of [[quantum-computing/qubits]]: the superposition $\ket+$ has $\rho = \tfrac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ (Bloch vector $\hat x$), the 50/50 mixture of $\ket0$ and $\ket1$ has $\rho = \tfrac12 I$ (the centre). Their diagonals — the computational-basis probabilities — agree; the off-diagonal entries, called **coherences**, are what distinguishes them.

### Subsystems

Entanglement is the other source of mixedness. If $AB$ is in state $\rho_{AB}$, the statistics of measurements on $A$ alone are given by the **reduced density matrix** $\rho_A = \tr_B\rho_{AB}$, where the **partial trace** is the linear map with $\tr_B(\ket a\!\bra{a'}\otimes\ket b\!\bra{b'}) = \ket a\!\bra{a'}\,\braket{b'|b}$. (It is the unique choice for which $\tr(\rho_A M) = \tr(\rho_{AB}(M\otimes I))$ for every observable $M$ on $A$.)

::: example Half of a Bell pair {#ex-reduced}
Compute the reduced state of either qubit of $\ket{\Phi^+}$, and of qubit $0$ of the product $\ket+\ket0$.
::: solution
$\ket{\Phi^+}\!\bra{\Phi^+} = \tfrac12(\ket{00}\!\bra{00} + \ket{00}\!\bra{11} + \ket{11}\!\bra{00} + \ket{11}\!\bra{11})$. Tracing out qubit $1$, the cross terms vanish because $\braket{1|0} = 0$, leaving $\tfrac12(\ket0\!\bra0 + \ket1\!\bra1) = I/2$: maximally mixed, Bloch vector $0$. A Bell pair's halves are individually as random as possible, which is why Bob's qubit before the classical bits arrive in teleportation carries no information ([[quantum-computing/entanglement#thm-teleport]]). For $\ket+\ket0$, $\rho = \ket+\!\bra+\otimes\ket0\!\bra0$ and the partial trace gives $\ket+\!\bra+$: pure. In general a pure state of $AB$ is a product iff $\rho_A$ is pure, and the eigenvalues of $\rho_A$ are the squared Schmidt coefficients ([[quantum-computing/entanglement#thm-schmidt]]). The same calculation is in [Physics Atlas: entanglement](/learn/physics/lesson.php?c=quantum-2&l=entanglement).
:::
:::

## Noise as a quantum channel

A noisy process — a gate that sometimes misfires, a qubit coupled to its environment — maps density matrices to density matrices, linearly. The general form of such a map is a **quantum channel**.

::: definition Quantum channel (Kraus form) {#def-channel}
A **quantum channel** on a $d$-dimensional system is a map
$$
\mathcal E(\rho) = \sum_k E_k\rho E_k^\dagger, \qquad \sum_k E_k^\dagger E_k = I,
$$
for some $d\times d$ **Kraus operators** $E_k$. Every channel arises by letting the system interact unitarily with an environment that starts in a fixed state and then tracing the environment out, and conversely (Stinespring and Kraus).
:::

The completeness condition makes $\tr\mathcal E(\rho) = \tr\rho$. Read $E_k\rho E_k^\dagger$ as "event $k$ happened, with probability $\tr(E_k\rho E_k^\dagger)$". The standard single-qubit channels:

| channel | Kraus operators | effect on the Bloch vector $(r_x, r_y, r_z)$ |
|---|---|---|
| bit flip, probability $p$ | $\sqrt{1-p}\,I$, $\sqrt p\,X$ | $(r_x,\ (1-2p)r_y,\ (1-2p)r_z)$ |
| phase flip (dephasing) | $\sqrt{1-p}\,I$, $\sqrt p\,Z$ | $((1-2p)r_x,\ (1-2p)r_y,\ r_z)$ |
| depolarising | $\sqrt{1-p}\,I$, $\sqrt{p/3}\,X$, $\sqrt{p/3}\,Y$, $\sqrt{p/3}\,Z$ | $(1 - \tfrac43p)\,\vec r$ |
| amplitude damping, rate $\gamma$ | $\begin{pmatrix}1&0\\0&\sqrt{1-\gamma}\end{pmatrix}$, $\begin{pmatrix}0&\sqrt\gamma\\0&0\end{pmatrix}$ | $(\sqrt{1-\gamma}\,r_x,\ \sqrt{1-\gamma}\,r_y,\ \gamma + (1-\gamma)r_z)$ |

::: proposition Pauli channels shrink the Bloch ball {#prop-pauli-channel}
Conjugation by a Pauli matrix $P\in\{X, Y, Z\}$ flips the signs of the two Bloch components other than $P$'s own. Consequently the bit-flip, phase-flip and depolarising channels act on Bloch vectors as in the table.
:::

::: proof
By the anticommutation relations ([[quantum-computing/qubits]], exercise on the Pauli matrices), $XXX = X$ and $XYX = -Y$, $XZX = -Z$, and similarly for $Y$ and $Z$. So $X\rho X = \tfrac12(I + r_xX - r_yY - r_zZ)$. The bit-flip channel gives $(1-p)\rho + pX\rho X = \tfrac12(I + r_xX + (1-2p)r_yY + (1-2p)r_zZ)$; dephasing is the same with $Z$. For the depolarising channel, each component $r_j$ is kept by one of the three Paulis and flipped by the other two, so it becomes $(1-p)r_j + \tfrac p3(r_j - r_j - r_j) = (1 - \tfrac{4p}{3})r_j$.
:::

Amplitude damping models energy loss — an excited atom emitting a photon, a superconducting qubit relaxing from $\ket1$ to $\ket0$ — and pulls every state towards $\ket0$, the north pole. Dephasing models random phase kicks, which leave the populations alone but kill coherences. Repeated over time, they give the two standard figures of merit of hardware: the **relaxation time** $T_1$, with $\Prob(\ket1\text{ survives}) = e^{-t/T_1}$, and the **dephasing time** $T_2$, with coherences decaying as $e^{-t/T_2}$; amplitude damping alone gives $T_2 = 2T_1$, and extra dephasing makes $T_2$ shorter.

::: widget plot
f: exp(-x/a); exp(-x/b); 1 - 2*exp(-x/a)
x: 0, 400
y: -1, 1
sliders: a=100:10:500:10; b=80:10:500:10
labels: \Prob(\ket1 \text{ survives}) = e^{-t/T_1}; r_x(t) = e^{-t/T_2}; r_z(t)
caption: Decoherence of a qubit over time $t$ in microseconds, with $T_1 = a$ and $T_2 = b$ (sliders; physically $T_2 \le 2T_1$). A qubit prepared in $\ket1$ relaxes towards $\ket0$, its $z$ component rising from $-1$ to $+1$; a qubit prepared in $\ket+$ loses its $x$ component. With gates of about $50$ ns and $T_1, T_2$ of order $100$ µs — typical orders of magnitude for superconducting qubits in the mid-2020s — a few thousand gates fit within one coherence time, far fewer than a large algorithm needs.
:::

::: example Dephasing a superposition {#ex-dephase}
A qubit in $\ket+$ passes through the phase-flip channel with $p = 0.1$, then is measured in the $X$ basis. What is the probability of the outcome $+$? What is the purity of the state?
::: solution
By [[#prop-pauli-channel]] the Bloch vector $(1, 0, 0)$ becomes $(0.8, 0, 0)$, so by [[#eq-bloch-ball]] $\rho = \tfrac12(I + 0.8X)$. The outcome $+$ has probability $\tr(\ket+\!\bra+\rho) = \tfrac12(1 + 0.8) = 0.9$ — equivalently, the qubit was hit by $Z$ (turning $\ket+$ into $\ket-$) with probability $0.1$. The purity is $\tr\rho^2 = \tfrac12(1 + 0.64) = 0.82 < 1$. A computational-basis measurement would still give $0$ and $1$ with probability $1/2$ each: dephasing is invisible in the $Z$ basis, which is why a classical error model (bit flips only) misses half the problem.
:::
:::

## The three-qubit codes

### The bit-flip code

Suppose, first, that the only error is the bit flip $X$, applied independently to each qubit with probability $p$. Encode one logical qubit into three physical ones:
$$
\alpha\ket0 + \beta\ket1\ \mapsto\ \alpha\ket{000} + \beta\ket{111},
$$
with two CNOTs from the data qubit onto two fresh qubits in $\ket0$. This is not cloning: the result is not $(\alpha\ket0 + \beta\ket1)^{\otimes3}$, but an entangled state in the two-dimensional **code space** spanned by the **logical basis** $\ket{0_L} = \ket{000}$ and $\ket{1_L} = \ket{111}$.

A flip of qubit $j$ moves the state into an orthogonal subspace: $X_1$ gives $\alpha\ket{100} + \beta\ket{011}$, and so on. To find out which, we must not measure the qubits — that would collapse the superposition — but only the **parities** $Z_1Z_2$ and $Z_2Z_3$ (the observables $Z\otimes Z\otimes I$ and $I\otimes Z\otimes Z$, with eigenvalue $+1$ when the two bits agree). Every state in the code space, and every state reached from it by a single flip, is an eigenstate of both, so measuring them reveals the **syndrome** without disturbing the encoded amplitudes.

| error | state | $Z_1Z_2$ | $Z_2Z_3$ | correction |
|---|---|---|---|---|
| none | $\alpha\ket{000} + \beta\ket{111}$ | $+1$ | $+1$ | none |
| $X_1$ | $\alpha\ket{100} + \beta\ket{011}$ | $-1$ | $+1$ | $X_1$ |
| $X_2$ | $\alpha\ket{010} + \beta\ket{101}$ | $-1$ | $-1$ | $X_2$ |
| $X_3$ | $\alpha\ket{001} + \beta\ket{110}$ | $+1$ | $-1$ | $X_3$ |

In a circuit, each parity is measured by CNOTs from the two data qubits onto an ancilla in $\ket0$, which is then measured: the ancilla ends in $\ket{b_1\oplus b_2}$, which depends only on the parity, not on the encoded amplitudes.

::: theorem The bit-flip code {#thm-bitflip}
The three-qubit code with syndrome measurement and correction restores the encoded state exactly whenever at most one of the three qubits suffered a bit flip. If each qubit is flipped independently with probability $p$, the logical state is corrupted with probability $3p^2 - 2p^3$, which is less than $p$ whenever $p < 1/2$.
:::

::: proof
By the table, each single flip, and no flip, gives a distinct syndrome, and the correction maps the state back to $\alpha\ket{000} + \beta\ket{111}$; the syndrome measurement itself does not change the state, which is an eigenstate of both parities. If two or three qubits flip, the syndrome is that of the complementary single flip (for example $X_1X_2$ gives the syndrome of $X_3$), and the "correction" produces $\alpha\ket{111} + \beta\ket{000}$, a logical bit flip. The probability of two or more flips is $\binom32p^2(1-p) + p^3 = 3p^2 - 2p^3$. Finally $p - (3p^2 - 2p^3) = p(1 - p)(1 - 2p) > 0$ for $0 < p < 1/2$.
:::

The simulation below adds a module `stab.py` to the simulator for measuring a Pauli observable $P$ (a "word" such as `ZZI`): the projectors onto the eigenvalues $\pm1$ are $(I\pm P)/2$, so the outcome $+1$ has probability $\norm{(I + P)\psi/2}^2$ and the state is projected accordingly.

```python
# stab.py - Pauli operators and stabiliser measurements on top of qsim
from qsim import *
PAULI = {"I": [[1, 0], [0, 1]], "X": X, "Y": Y, "Z": Z}

def apply_pauli(s, word):                  # word like "ZZI": one letter per qubit
    for q, p in enumerate(word):
        if p != "I": apply(s, PAULI[p], q)

def measure_pauli(s, word, rng):           # measure the observable P = word (eigenvalues +-1)
    t = s[:]; apply_pauli(t, word)         # t = P s
    plus = [(a + b) / 2 for a, b in zip(s, t)]          # (I + P)/2 s
    p_plus = sum(abs(a) ** 2 for a in plus)
    outcome = +1 if rng.random() < p_plus else -1
    proj = plus if outcome == +1 else [(a - b) / 2 for a, b in zip(s, t)]
    norm = math.sqrt(p_plus if outcome == +1 else 1 - p_plus)
    s[:] = [a / norm for a in proj]
    return outcome

def fidelity(s, t): return abs(sum(a.conjugate() * b for a, b in zip(s, t))) ** 2
```

```python
from stab import *

def encode(alpha, beta):                   # alpha|000> + beta|111>
    s = [0j] * 8; s[0], s[7] = alpha, beta; return s

SYNDROME = {(+1, +1): None, (-1, +1): 0, (-1, -1): 1, (+1, -1): 2}   # which qubit to flip

def trial(p, rng, alpha=0.6, beta=0.8j):
    s = encode(alpha, beta)
    for q in range(3):                     # independent bit flips with probability p
        if rng.random() < p: apply(s, X, q)
    syn = (measure_pauli(s, "ZZI", rng), measure_pauli(s, "IZZ", rng))
    if SYNDROME[syn] is not None: apply(s, X, SYNDROME[syn])
    return fidelity(s, encode(alpha, beta)) > 0.5      # logical state recovered?

rng = random.Random(2026)
for p in (0.01, 0.05, 0.1, 0.2, 0.5):
    shots = 20000
    fail = sum(not trial(p, rng) for _ in range(shots)) / shots
    print(f"p = {p:4}: logical failure {fail:.4f}   3p^2 - 2p^3 = {3*p*p - 2*p**3:.4f}")
```

```console
$ python3 bitflip.py
p = 0.01: logical failure 0.0005   3p^2 - 2p^3 = 0.0003
p = 0.05: logical failure 0.0072   3p^2 - 2p^3 = 0.0073
p =  0.1: logical failure 0.0293   3p^2 - 2p^3 = 0.0280
p =  0.2: logical failure 0.1055   3p^2 - 2p^3 = 0.1040
p =  0.5: logical failure 0.5039   3p^2 - 2p^3 = 0.5000
```

The Monte Carlo estimates agree with [[#thm-bitflip]] within sampling error (with $20\,000$ shots at $p = 0.01$, about $6$ failures are expected, and $10$ were seen). After correction the fidelity is exactly $1$ or exactly $0$ — the code converts an arbitrary error pattern into either nothing or a logical $X$.

### The phase-flip code

A phase flip $Z$ has no classical analogue, but in the Hadamard basis it *is* a bit flip: $Z\ket\pm = \ket\mp$. So encode $\alpha\ket0 + \beta\ket1\mapsto\alpha\ket{+++} + \beta\ket{---}$ (the bit-flip encoder followed by $H$ on all three qubits), measure the parities $X_1X_2$ and $X_2X_3$, and correct with $Z$ on the indicated qubit. This **phase-flip code** corrects any single $Z$ error with the same failure probability $3p^2 - 2p^3$ — but it is helpless against bit flips, which it sees as logical phase errors, just as the bit-flip code is helpless against phase flips ([[#ex-wrong-code]]).

::: widget plot
f: x; 3*x^2 - 2*x^3; 3*(3*x^2 - 2*x^3)^2 - 2*(3*x^2 - 2*x^3)^3
x: 0, 0.6
y: 0, 0.6
labels: \text{unencoded } p; \text{one level: } 3p^2 - 2p^3; \text{two levels (code of codes)}
caption: Logical error probability of the bit-flip code against independent flips with probability $p$. Below $p = 1/2$ the code helps, and the improvement is dramatic for small $p$: at $p = 0.01$ the logical rate is $3\times10^{-4}$. Encoding each of the three qubits again in the same code (two levels of **concatenation**, nine qubits) gives the third curve, at $p = 0.01$ about $2.7\times10^{-7}$. The crossing point $p = 1/2$ is this toy model's **threshold**.
:::

## Shor's nine-qubit code

Combining the two codes protects against both. Shor's code first encodes against phase flips, then encodes each of the three qubits against bit flips:
$$
\ket{0_L} = \frac{(\ket{000} + \ket{111})^{\otimes3}}{2\sqrt2}, \qquad \ket{1_L} = \frac{(\ket{000} - \ket{111})^{\otimes3}}{2\sqrt2}.
$$ {#eq-shor-code}
A bit flip in one block of three is diagnosed by the two parities $Z_iZ_j$ of that block, as in the bit-flip code. A phase flip on any qubit of a block changes that block's sign, $\ket{000}\pm\ket{111}\to\ket{000}\mp\ket{111}$, and is diagnosed by comparing the signs of neighbouring blocks, which is the measurement of $X_1X_2X_3X_4X_5X_6$ and $X_4X_5X_6X_7X_8X_9$; it is corrected by $Z$ on any one qubit of the block. A $Y = iXZ$ error triggers both. So the code corrects $X$, $Y$ and $Z$ on any single qubit. Remarkably, that is enough to correct *every* single-qubit error.

::: theorem Discretisation of errors {#thm-discretise}
If a code with a syndrome measurement and correction procedure corrects the errors $I$, $X_j$, $Y_j$, $Z_j$ on qubit $j$ (each mapped to a distinct syndrome, or to a syndrome whose correction undoes it), then it corrects any error acting on qubit $j$ alone: any unitary, and indeed any channel whose Kraus operators act on qubit $j$.
:::

::: proof
The four matrices $I, X, Y, Z$ form a basis of the $2\times2$ complex matrices, so any operator on qubit $j$ is $E = e_0I + e_1X_j + e_2Y_j + e_3Z_j$. Acting on an encoded state $\ket{\psi_L}$, it gives the superposition $e_0\ket{\psi_L} + e_1X_j\ket{\psi_L} + e_2Y_j\ket{\psi_L} + e_3Z_j\ket{\psi_L}$. The four terms lie in the eigenspaces of the syndrome observables belonging to different syndromes (or, if two errors share a syndrome, they are handled by the same correction). Measuring the syndrome is a projective measurement onto those eigenspaces, so it **collapses** the superposition onto one term — say $X_j\ket{\psi_L}$, up to normalisation — and the correction for that syndrome restores $\ket{\psi_L}$. Whatever the outcome, the final state is $\ket{\psi_L}$. For a channel with Kraus operators $E_k$ on qubit $j$, apply the argument to each $\ket{\psi_L}$-branch $E_k\ket{\psi_L}$: each is restored to $\ket{\psi_L}$, so the output is $\sum_k p_k\ket{\psi_L}\!\bra{\psi_L} = \ket{\psi_L}\!\bra{\psi_L}$.
:::

This is the conceptual heart of quantum error correction: the syndrome measurement turns a continuous error into a discrete one, and it reveals only *which* error occurred, never the encoded amplitudes. The simulation applies a random single-qubit unitary to a random qubit of Shor's code and corrects it.

::: example Shor's code corrects an arbitrary error {#ex-shor-code}
Encode $0.6\ket0 + 0.8e^{0.7i}\ket1$ in Shor's code, apply a random single-qubit unitary to a random qubit, measure the eight syndrome observables, correct, and compare with the ideal encoded state.
::: solution
The eight observables are the six parities $Z_iZ_{i+1}$ within blocks and the two six-qubit $X$ checks. Bit flips are corrected block by block; the $X$ checks locate a block with the wrong sign, corrected by $Z$ on its first qubit.

```python
from stab import *

def shor_encode(alpha, beta):              # |0_L> = (|000>+|111>)^3 / 2^(3/2), |1_L> with minus signs
    s = zeros(9); s[0], s[256] = alpha, beta    # alpha|0> + beta|1> on qubit 0
    apply(s, X, 3, controls=(0,)); apply(s, X, 6, controls=(0,))
    for b in (0, 3, 6):
        apply(s, H, b); apply(s, X, b + 1, controls=(b,)); apply(s, X, b + 2, controls=(b,))
    return s

Z_CHECKS = ["ZZIIIIIII", "IZZIIIIII", "IIIZZIIII", "IIIIZZIII", "IIIIIIZZI", "IIIIIIIZZ"]
X_CHECKS = ["XXXXXXIII", "IIIXXXXXX"]
FLIP = {(+1, +1): None, (-1, +1): 0, (-1, -1): 1, (+1, -1): 2}

def correct(s, rng):
    syn = [measure_pauli(s, w, rng) for w in Z_CHECKS + X_CHECKS]
    for block in range(3):                 # bit flips: majority within each block of three
        q = FLIP[(syn[2 * block], syn[2 * block + 1])]
        if q is not None: apply(s, X, 3 * block + q)
    q = FLIP[(syn[6], syn[7])]             # phase flips: which block has the wrong sign
    if q is not None: apply(s, Z, 3 * q)
    return syn

def random_unitary(rng):                   # a random single-qubit gate, e^{ia} Rz Ry Rz
    a, b, c, d = (rng.uniform(0, 2 * math.pi) for _ in range(4))
    Rz = lambda t: [[cmath.exp(-1j * t / 2), 0], [0, cmath.exp(1j * t / 2)]]
    Ry = [[math.cos(c / 2), -math.sin(c / 2)], [math.sin(c / 2), math.cos(c / 2)]]
    m = lambda A, B: [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
    return [[cmath.exp(1j * a) * x for x in row] for row in m(m(Rz(b), Ry), Rz(d))]

rng = random.Random(9)
alpha, beta = 0.6, 0.8 * cmath.exp(0.7j)
ideal = shor_encode(alpha, beta)
for trial in range(5):
    s = ideal[:]; q = rng.randrange(9); apply(s, random_unitary(rng), q)
    before = fidelity(s, ideal)
    syn = correct(s, rng)
    print(f"error on qubit {q}: fidelity before {before:.3f}, syndrome "
          f"{''.join('+' if x > 0 else '-' for x in syn)}, after {fidelity(s, ideal):.6f}")
```

```console
$ python3 shor9.py
error on qubit 7: fidelity before 0.674, syndrome ++++--++, after 1.000000
error on qubit 7: fidelity before 0.005, syndrome +++++++-, after 1.000000
error on qubit 3: fidelity before 0.041, syndrome ++-+++--, after 1.000000
error on qubit 6: fidelity before 0.463, syndrome +++++++-, after 1.000000
error on qubit 2: fidelity before 0.002, syndrome ++++++-+, after 1.000000
```

In every trial the error had reduced the fidelity — to $0.002$ in the last — and after the syndrome measurement and correction it is $1$ to six decimals. The syndromes show the discretisation at work: the first trial collapsed to a bit flip on qubit $7$ (block $3$'s parities read $-, -$), the second to a phase flip in block $3$ (the last $X$ check reads $-$), the third to a $Y$ error on qubit $3$ (both a bit-flip and a phase-flip syndrome). The same unitary on the same qubit can collapse to different Pauli errors in different runs; each is corrected.
:::
:::

## The stabiliser formalism

The parity checks above are all products of Pauli matrices, and the code spaces are their common $+1$ eigenspaces. Daniel Gottesman made this the definition.

::: definition Stabiliser code {#def-stabiliser}
The **Pauli group** on $n$ qubits, $\mathcal P_n$, consists of the tensor products $P_1\otimes\dots\otimes P_n$ with $P_j\in\{I, X, Y, Z\}$, times phases $\pm1, \pm i$; any two elements commute or anticommute. A **stabiliser group** is an abelian subgroup $\mathcal S\subseteq\mathcal P_n$ not containing $-I$, generated by $n - k$ independent elements $g_1, \dots, g_{n-k}$. Its **code space** is
$$
\mathcal C(\mathcal S) = \set{\ket\psi : g\ket\psi = \ket\psi \text{ for all } g\in\mathcal S}.
$$
An $[[n, k, d]]$ **stabiliser code** encodes $k$ logical qubits in $n$ physical ones; its **distance** $d$ is the smallest weight (number of non-identity factors) of a Pauli operator that commutes with every element of $\mathcal S$ but is not itself in $\mathcal S$ (up to phase) — that is, of a non-trivial **logical operator**.
:::

The bit-flip code is $\mathcal S = \langle ZZI, IZZ\rangle$, an $[[3, 1, 1]]$ code (its logical $Z$, namely $ZII$, has weight $1$, which is why it cannot correct phase flips). Shor's code has the eight generators measured in the example and is $[[9, 1, 3]]$.

::: theorem Basic facts about stabiliser codes {#thm-stabiliser}
(a) The code space of an $[[n, k, d]]$ stabiliser code has dimension $2^k$. (b) A Pauli error $E$ that anticommutes with generator $g_i$ flips the outcome of measuring $g_i$ on any code state, and the **syndrome** — the list of signs $s_i = \pm1$ with $Eg_i = s_ig_iE$ — depends only on $E$, not on the encoded state. (c) A code of distance $d$ detects every Pauli error of weight less than $d$ and corrects every Pauli error of weight at most $t = \lfloor(d-1)/2\rfloor$ (hence, by [[#thm-discretise]] extended to $t$ qubits, every error on at most $t$ qubits).
:::

::: proof
(a) The projector onto the $+1$ eigenspace of $g_i$ is $(I + g_i)/2$, and since the generators commute, the projector onto $\mathcal C$ is $\Pi = \prod_{i=1}^{n-k}\frac{I + g_i}{2} = \frac{1}{2^{n-k}}\sum_{g\in\mathcal S}g$ (expanding the product gives each of the $2^{n-k}$ group elements once, by independence). Every Pauli other than $\pm I$ has trace $0$, and $-I\notin\mathcal S$, so $\dim\mathcal C = \tr\Pi = 2^{-(n-k)}\tr I = 2^{-(n-k)}2^n = 2^k$.

(b) For $\ket\psi\in\mathcal C$, $g_iE\ket\psi = s_iEg_i\ket\psi = s_iE\ket\psi$, so $E\ket\psi$ is an eigenvector of $g_i$ with eigenvalue $s_i$, whatever $\ket\psi$ is.

(c) If $E$ has weight $< d$ and commutes with every generator, then by the definition of distance $E\in\mathcal S$ up to phase, so it acts trivially (as a phase) on the code space: it is harmless. Otherwise it anticommutes with some generator and gives a non-trivial syndrome: detected. For correction, suppose $E_1, E_2$ both have weight $\le t$ and the same syndrome. Then $E_2^\dagger E_1$ commutes with every generator and has weight $\le 2t < d$, so it lies in $\mathcal S$ up to phase: $E_1\ket\psi = cE_2\ket\psi$ for every code state. Hence applying $E_2^\dagger$ — the correction chosen for that syndrome — undoes $E_1$ too, up to a global phase.
:::

Part (c) is a special case of the general **Knill–Laflamme conditions** (1997): a code with projector $\Pi$ can correct a set of errors $\{E_a\}$ if and only if $\Pi E_a^\dagger E_b\Pi = c_{ab}\Pi$ for some numbers $c_{ab}$ — errors must not distinguish code states from one another. Important stabiliser codes include:

- the **Steane code** $[[7, 1, 3]]$ (1996), built from the classical $[7, 4]$ Hamming code: three $X$-type and three $Z$-type generators, one for each row of the Hamming parity-check matrix. Its logical $H$, $S$ and CNOT are **transversal** — applied qubit by qubit, so a single faulty gate cannot spread an error within a block;
- the **five-qubit code** $[[5, 1, 3]]$ (Laflamme, Miquel, Paz and Zurek; Bennett, DiVincenzo, Smolin and Wootters; 1996), the smallest code correcting an arbitrary single-qubit error;
- the **surface code** (Kitaev 1997; Bravyi and Kitaev 1998; Dennis, Kitaev, Landahl and Preskill 2002), with qubits on a $d\times d$ grid and four-qubit $X$-type and $Z$-type checks on neighbouring qubits. It encodes one logical qubit at distance $d$ using $d^2$ data qubits and $d^2 - 1$ measurement qubits, needs only nearest-neighbour interactions on a planar chip, and tolerates physical error rates near $1\%$. It is the leading candidate for superconducting hardware.

::: warning A code is not a cure
Encoding helps only if the error-correction cycle itself introduces fewer errors than it removes. Syndrome measurements use extra gates and ancillas, each of which can fail, and a single faulty CNOT can copy one error onto two data qubits, which a distance-3 code cannot correct. That is why the threshold theorem, not the existence of codes, is the real result: it requires **fault-tolerant** circuits, designed so that one fault causes at most one error per code block, and physical error rates below the threshold. Above threshold, adding qubits makes things *worse* — as [[#thm-bitflip]] already shows for $p > 1/2$.
:::

::: quiz
For the bit-flip code $\mathcal S = \langle ZZI, IZZ\rangle$, which of these errors give the syndrome $(Z_1Z_2, Z_2Z_3) = (-1, -1)$? (Select all that apply.)
- [x] $X_2$
- [x] $X_1X_3$
- [ ] $Z_2$
- [x] $Y_2$
::: solution
An error flips the sign of each generator it anticommutes with. $X_2$ anticommutes with both $Z_1Z_2$ and $Z_2Z_3$; so does $Y_2$ (it contains an $X$ on qubit $2$); and $X_1X_3$ anticommutes with $Z_1Z_2$ (through $X_1$) and with $Z_2Z_3$ (through $X_3$). $Z_2$ commutes with both and goes undetected — it is a logical operator of weight $1$, the reason the code has distance $1$ against general errors. The code "corrects" $X_1X_3$ by applying $X_2$, producing the logical error $XXX$.
:::
:::

## Fault tolerance and the threshold theorem

Suppose each physical operation — gate, preparation, measurement, idle step — fails independently with probability $p$. Replace every qubit by a block of a distance-3 code and every operation by a fault-tolerant **gadget** that performs it on encoded blocks followed by error correction. If gadgets are designed so that any single fault is corrected, an encoded operation fails only if at least two faults occur within it. If the gadget contains $A$ locations, that probability is at most $\binom A2p^2 \le cp^2$ for a constant $c$ depending on the code and gadget design. Now **concatenate**: encode each physical qubit of the code again, and so on. A level-$k$ operation fails with probability
$$
p^{(k)}\le c\bigl(p^{(k-1)}\bigr)^2 = \frac{(cp)^{2^k}}{c},
$$ {#eq-concatenation}
by induction. If $p < p_{\mathrm{th}} = 1/c$, the logical error falls **doubly exponentially** in $k$, while the size of each logical operation grows only exponentially in $k$, by a factor of at most $A$ per level.

::: theorem Threshold theorem {#thm-threshold}
(Aharonov and Ben-Or; Kitaev; Knill, Laflamme and Zurek; 1996–97.) There is a constant $p_{\mathrm{th}} > 0$ such that any quantum circuit of $m$ gates can be simulated, with error at most $\varepsilon$ in its output distribution, by a circuit of $O\bigl(m\,\mathrm{polylog}(m/\varepsilon)\bigr)$ noisy gates, provided each component fails independently (or with sufficiently weakly correlated noise) with probability at most $p < p_{\mathrm{th}}$, fresh ancillas can be prepared throughout the computation, and gates can act in parallel.
:::

::: proof
(Sketch, from [[#eq-concatenation]].) We need each of the $m$ logical operations to fail with probability at most $\varepsilon/m$; by a union bound the whole computation then fails with probability at most $\varepsilon$. Choose the smallest $k$ with $(cp)^{2^k}/c\le\varepsilon/m$, i.e. $2^k\ge\log(cm/\varepsilon)/\log(1/(cp))$. Each level multiplies the size by at most $A$, so the overhead is $A^k = (2^k)^{\log_2 A} = O\bigl(\log^{\log_2A}(m/\varepsilon)\bigr)$, polylogarithmic. The hard part, which we omit, is the construction of fault-tolerant gadgets for a universal gate set — including a non-Clifford gate such as $T$ — and the proof that faults do not spread uncontrollably within and between blocks.
:::

The constant depends on the noise model and the scheme: early proofs gave thresholds around $10^{-6}$ to $10^{-4}$; numerical estimates for the surface code with realistic circuit-level noise are around $1\%$, about $10^{-2}$. In the surface code the logical error rate per error-correction cycle behaves roughly as $p_L\approx A\,(p/p_{\mathrm{th}})^{(d+1)/2}$, so each increase of the distance by $2$ divides the logical error rate by a factor $\Lambda\approx p_{\mathrm{th}}/p$. Measuring $\Lambda > 1$ on real hardware — the **below-threshold** regime — is the experiment of [[quantum-computing/quantum-hardware]].

::: example How deep must the concatenation be? {#ex-concat}
Suppose $c = 10^4$ (threshold $10^{-4}$) and the physical error rate is $p = 10^{-5}$. How many levels of concatenation give a logical error rate of at most $10^{-15}$, and how many physical qubits does each logical qubit then need if each level uses the $7$-qubit Steane code?
::: solution
By [[#eq-concatenation]], $p^{(k)} = (cp)^{2^k}/c = 0.1^{2^k}\cdot10^{-4}$. We need $0.1^{2^k}\le10^{-11}$, i.e. $2^k\ge11$, so $k = 4$ (giving $10^{-16}\cdot10^{-4} = 10^{-20}$; $k = 3$ gives only $10^{-8}\cdot10^{-4} = 10^{-12}$). Each level multiplies the number of data qubits by $7$: $7^4 = 2401$ physical qubits per logical qubit, before counting the ancillas for syndrome extraction, which typically double or triple it. The doubly exponential improvement is why a modest number of levels suffices — and the exponential growth of size is why physical error rates far below threshold are so valuable.
:::
:::

Two further points matter for real machines. First, no code has a universal set of transversal gates (the **Eastin–Knill theorem**, 2009), so at least one gate, usually $T$, must be implemented differently, most often by **magic-state distillation** (Bravyi and Kitaev, 2005), which consumes many noisy copies of the state $T\ket+$ to produce one good copy; this is a large part of the cost of fault-tolerant algorithms. Second, decoding — inferring the most likely error from the syndromes — must be done classically in real time, about once per microsecond for superconducting qubits, by fast algorithms such as minimum-weight perfect matching on a graph of syndrome changes.

::: history
Peter Shor's "Scheme for reducing decoherence in quantum computer memory" (*Physical Review A*, 1995) gave the nine-qubit code; Andrew Steane's seven-qubit code and the general Calderbank–Shor–Steane (CSS) construction followed in 1996. Emanuel Knill and Raymond Laflamme stated the conditions for quantum error correction in 1997, and Daniel Gottesman's 1997 Caltech thesis developed the stabiliser formalism. Shor described fault-tolerant computation in 1996, and the threshold theorem was proved independently by Dorit Aharonov and Michael Ben-Or, by Alexei Kitaev, and by Knill, Laflamme and Wojciech Zurek in 1996–97. Kitaev introduced the toric code in 1997, leading to the surface code; Eric Dennis, Kitaev, Andrew Landahl and John Preskill analysed it as a quantum memory in 2002, and Robert Raussendorf and Jim Harrington estimated a threshold near $1\%$ in 2007.
:::

## Where this leads

[[quantum-computing/quantum-hardware]] describes the physical platforms, their error rates and coherence times as of 2026, and the experiments that have begun to operate logical qubits below threshold. The resource counts for Shor's algorithm quoted there — around a million physical qubits for RSA-2048 — come from surface-code constructions like those sketched here. The Clifford group of [[quantum-computing/quantum-circuits]] is exactly the group of unitaries that permute Pauli operators, which is why stabiliser codes, Clifford gates and the Gottesman–Knill theorem belong together, and why the non-Clifford $T$ gate is the expensive one. Classical coding theory — Hamming codes, distance, syndromes — is the template for all of this; quantum codes add the second, phase, type of error.

::: summary
- Density matrices $\rho = \sum_ip_i\ket{\psi_i}\!\bra{\psi_i}$ describe mixtures and subsystems; a qubit's state is a point of the **Bloch ball** ([[#eq-bloch-ball]]), and half of a Bell pair is maximally mixed ([[#ex-reduced]]).
- Noise is a **quantum channel** $\rho\mapsto\sum_kE_k\rho E_k^\dagger$; bit flip, dephasing and depolarising channels shrink the Bloch ball ([[#prop-pauli-channel]]); $T_1$ and $T_2$ measure relaxation and dephasing.
- The **bit-flip code** $\alpha\ket{000} + \beta\ket{111}$ measures parities, not qubits, and fails with probability $3p^2 - 2p^3$ ([[#thm-bitflip]]); the phase-flip code does the same in the Hadamard basis.
- **Shor's code** $[[9, 1, 3]]$ corrects $X$, $Y$, $Z$ on any qubit, and therefore any single-qubit error: syndrome measurement **discretises** errors ([[#thm-discretise]]).
- **Stabiliser codes** are common $+1$ eigenspaces of commuting Pauli operators; $[[n, k, d]]$ codes have dimension $2^k$ and correct $\lfloor(d-1)/2\rfloor$ errors ([[#thm-stabiliser]]). Steane, five-qubit and surface codes are the main examples.
- **Threshold theorem** ([[#thm-threshold]]): below a constant physical error rate, concatenated or surface codes make logical errors arbitrarily small with polylogarithmic overhead; surface-code thresholds are about $1\%$.
:::

## Exercises

::: exercise Purity {level=1 check="0.82"}
A qubit has Bloch vector $(0.8, 0, 0)$. What is $\tr\rho^2$? (Enter a decimal.)
::: solution
By [[#eq-bloch-ball]], $\tr\rho^2 = \tfrac12(1 + 0.64) = 0.82$, as in [[#ex-dephase]]. Pure states have $\tr\rho^2 = 1$ and the maximally mixed state $\tfrac12$.
:::
:::

::: exercise A logical error rate {level=1 check="3*0.01^2-2*0.01^3"}
Each of the three qubits of the bit-flip code is flipped independently with probability $0.01$. What is the probability that error correction fails? (Enter an exact expression or a decimal.)
::: solution
By [[#thm-bitflip]], $3p^2 - 2p^3 = 3\times10^{-4} - 2\times10^{-6} = 2.98\times10^{-4}$, a $33$-fold improvement over $p = 0.01$.
:::
:::

::: exercise Reading a syndrome {level=1}
In the bit-flip code, the parities are measured as $Z_1Z_2 = +1$, $Z_2Z_3 = -1$. Which correction is applied, and what happens if the actual error was $X_1X_2$?
::: solution
The syndrome $(+1, -1)$ points to qubit $3$, so $X_3$ is applied. If the real error was $X_1X_2$, the state was $\alpha\ket{110} + \beta\ket{001}$ — the same syndrome — and applying $X_3$ gives $\alpha\ket{111} + \beta\ket{000}$: a logical $X$, an undetected failure. That is the $3p^2(1 - p)$ term of [[#thm-bitflip]].
:::
:::

::: exercise The depolarising channel {level=1 check="0.6"}
A qubit with Bloch vector $\vec r$ passes through the depolarising channel with $p = 0.3$. By what factor is the length of its Bloch vector multiplied? (Enter a decimal.)
::: solution
By [[#prop-pauli-channel]] the factor is $1 - \tfrac43p = 1 - 0.4 = 0.6$. At $p = 3/4$ the factor is $0$: every state becomes $I/2$, so the channel's output is independent of its input.
:::
:::

::: exercise A reduced state {level=2}
Find the reduced density matrix of qubit $0$ for $\tfrac{1}{\sqrt3}(\ket{00} + \ket{01} + \ket{11})$, its Bloch vector and its eigenvalues, and compare the eigenvalues with the Schmidt coefficients found in [[quantum-computing/entanglement]].
::: solution
Group by the state of qubit $0$: $\tfrac{1}{\sqrt3}\bigl(\ket0(\ket0 + \ket1) + \ket1\ket1\bigr)$. With unnormalised $\ket{a_0} = \tfrac{1}{\sqrt3}(\ket0 + \ket1)$ and $\ket{a_1} = \tfrac{1}{\sqrt3}\ket1$ for qubit $1$, $\rho_0 = \sum_{i,j}\braket{a_j|a_i}\ket i\!\bra j = \tfrac13\begin{pmatrix}2 & 1\\ 1 & 1\end{pmatrix}$. Its Bloch vector is $(r_x, r_y, r_z) = (2/3, 0, 1/3)$, of length $\sqrt5/3 \approx 0.745$. The eigenvalues are $\tfrac12(1\pm\sqrt5/3) = (3\pm\sqrt5)/6\approx 0.873, 0.127$ — exactly the squared Schmidt coefficients from the exercise on Schmidt coefficients in [[quantum-computing/entanglement]].
:::
:::

::: exercise The wrong code {#ex-wrong-code level=2 check="0.244"}
The phase-flip code is used against **bit-flip** noise with $p = 0.1$ on each qubit. Show that it fails whenever an odd number of qubits are flipped, compute the failure probability, and compare with no encoding. Check by simulation. (Enter the failure probability to three decimals.)
::: solution
$X\ket\pm = \pm\ket\pm$, so a bit flip on qubit $j$ maps $\alpha\ket{+++} + \beta\ket{---}$ to $\alpha\ket{+++} - \beta\ket{---}$: a logical $Z$. The syndromes $X_1X_2$, $X_2X_3$ are unaffected ($X$ commutes with $X$), so nothing is corrected, and the logical state is wrong exactly when an odd number of flips occurred: probability $\tfrac12(1 - (1 - 2p)^3) = \tfrac12(1 - 0.512) = 0.244$, much worse than $0.1$ without encoding.

```python
from stab import *

def encode(alpha, beta):                   # alpha|+++> + beta|--->
    s = [0j] * 8; s[0], s[7] = alpha, beta
    for q in range(3): apply(s, H, q)
    return s

SYNDROME = {(+1, +1): None, (-1, +1): 0, (-1, -1): 1, (+1, -1): 2}

def trial(p, rng, noise, alpha=0.6, beta=0.8j):
    s = encode(alpha, beta)
    for q in range(3):
        if rng.random() < p: apply(s, noise, q)     # independent errors
    syn = (measure_pauli(s, "XXI", rng), measure_pauli(s, "IXX", rng))
    if SYNDROME[syn] is not None: apply(s, Z, SYNDROME[syn])
    return fidelity(s, encode(alpha, beta)) > 0.5

rng = random.Random(7)
p, shots = 0.1, 20000
for name, noise in (("Z (phase flips)", Z), ("X (bit flips)", X)):
    fail = sum(not trial(p, rng, noise) for _ in range(shots)) / shots
    print(f"phase-flip code, {name:16} p = {p}: logical failure {fail:.4f}")
```

```console
$ python3 phaseflip.py
phase-flip code, Z (phase flips)  p = 0.1: logical failure 0.0281
phase-flip code, X (bit flips)    p = 0.1: logical failure 0.2465
```

Against the errors it was designed for, the code fails with probability $\approx 3p^2 - 2p^3 = 0.028$; against the other kind, $\approx 0.244$. A useful code must handle both, as Shor's code does.
:::
:::

::: exercise Surface-code qubit counts {level=2 check="97"}
A distance-$d$ surface code uses $d^2$ data qubits and $d^2 - 1$ measurement qubits. How many physical qubits does a distance-$7$ logical qubit need? If $\Lambda = 2$ and the distance-$3$ logical error per cycle is $3\times10^{-3}$, estimate the distance-$7$ rate. (Enter the number of qubits.)
::: solution
$2d^2 - 1 = 2\cdot49 - 1 = 97$ qubits. Each step $d\to d + 2$ divides the logical error by $\Lambda$, so from $d = 3$ to $d = 7$ (two steps) the rate falls to $3\times10^{-3}/4 = 7.5\times10^{-4}$ per cycle. Reaching $10^{-12}$ at $\Lambda = 2$ would need about $\log_2(3\times10^{9})\approx 31.5$ steps from $d = 3$ — distance about $67$ and nearly $10\,000$ physical qubits per logical qubit — which is why increasing $\Lambda$ (lowering $p$) is so valuable.
:::
:::

::: exercise Concatenation levels {level=2 check="4"}
With $c = 10^4$ and $p = 10^{-5}$ as in [[#ex-concat]], what is the smallest number of levels of concatenation giving logical error at most $10^{-15}$? (Enter a number.)
::: solution
$k = 4$, as computed in [[#ex-concat]]: $0.1^{2^k}\cdot10^{-4}\le10^{-15}$ requires $2^k\ge 11$.
:::
:::

::: exercise The quantum Hamming bound {level=3 check="5"}
A non-degenerate $[[n, 1, 3]]$ code must give a different syndrome to each of the errors $I$ and $X_j, Y_j, Z_j$ ($j = 1, \dots, n$), and each syndrome class must contain a copy of the $2$-dimensional code space. Show that $2(1 + 3n)\le2^n$, and find the smallest $n$ allowed. (Enter that $n$.)
::: solution
The $1 + 3n$ errors map the code space onto $1 + 3n$ mutually orthogonal $2$-dimensional subspaces (orthogonal because their syndromes differ), all inside $\C^{2^n}$; so $2(1 + 3n)\le 2^n$. For $n = 4$: $26 > 16$; for $n = 5$: $32\le32$, with equality. So $n\ge5$, and the five-qubit code meets the bound exactly — it is a **perfect** code, every syndrome being used. Degenerate codes (in which distinct errors act identically on the code space) can evade the argument, but for $k = 1$, $d = 3$ none is smaller.
:::
:::

::: exercise Stabilisers of the bit-flip code {level=3}
(a) Show that $ZZI$ and $IZZ$ commute, and that their common $+1$ eigenspace is spanned by $\ket{000}$ and $\ket{111}$, as [[#thm-stabiliser]](a) predicts for $n = 3$, $k = 1$. (b) Find logical operators $\bar X$ and $\bar Z$ — Paulis that commute with the stabiliser but act on the code space as $X$ and $Z$ on the encoded qubit — and verify that the code's distance is $1$. (c) What is the stabiliser of the phase-flip code, and what are its logical operators?
::: solution
(a) $ZZI\cdot IZZ = ZIZ = IZZ\cdot ZZI$ (on qubit $2$, $Z\cdot Z = I$ either way). A basis state $\ket{b_1b_2b_3}$ is an eigenvector of $Z_1Z_2$ with eigenvalue $(-1)^{b_1\oplus b_2}$, so the common $+1$ eigenspace is spanned by the basis states with $b_1 = b_2 = b_3$: $\ket{000}$ and $\ket{111}$, dimension $2 = 2^1$. (b) $\bar X = XXX$ maps $\ket{000}\leftrightarrow\ket{111}$ and commutes with both generators (it anticommutes with each $Z$, twice). $\bar Z = ZII$ (or $IZI$, $IIZ$, or $ZZZ$) gives $\ket{000}\mapsto\ket{000}$, $\ket{111}\mapsto-\ket{111}$ and commutes with the generators. Since $\bar Z$ has weight $1$ and is not in $\mathcal S$, the distance is $1$: a single $Z$ error is an undetectable logical error. (c) Conjugating by $H^{\otimes3}$: $\mathcal S = \langle XXI, IXX\rangle$, with $\bar X = ZZZ$ and $\bar Z = XII$, distance $1$ against $X$ errors — the content of [[#ex-wrong-code]].
:::
:::
