A classical computer does not implement arbitrary Boolean functions directly. It wires together a few kinds of small gates — AND, OR, NOT, or just NAND — and the theory of [Boolean circuits](/learn/ee/lesson.php?c=digital-logic&l=boolean-algebra) tells us that this is enough: every function $\{0,1\}^n \to \{0,1\}$ is computed by some circuit of NAND gates. A quantum computer works the same way. The postulates of [[quantum-computing/qubits]] allow any unitary on $2^n$ amplitudes, but hardware can only apply a few kinds of operations, each acting on one or two qubits at a time, and an algorithm is a sequence — a **circuit** — of such **gates**. The questions of this chapter are which gates exist, how to read and simulate circuits, how classical computation fits inside quantum computation, and which small sets of gates are **universal**, able to build or approximate every unitary.

We meet the standard one-qubit gates and show that each acts as a rotation of the Bloch sphere; prove that every one-qubit unitary is a product of three rotations; introduce controlled operations and multi-qubit circuits; write the small **state-vector simulator** in pure Python that the rest of the course uses; show how any classical computation becomes a reversible **oracle** $U_f$; and state the universality results, including the Solovay–Kitaev theorem, together with the counting argument that shows why most unitaries are nevertheless hopelessly expensive.

## Single-qubit gates

A **single-qubit gate** is a $2 \times 2$ unitary matrix. The ones that appear constantly have names.

::: definition Standard single-qubit gates {#def-gates}
The **Pauli gates** $X$, $Y$, $Z$ of [[quantum-computing/qubits]] (with $X$ also called NOT, since $X\ket0 = \ket1$ and $X\ket1 = \ket0$); the **Hadamard** gate $H$; the **phase gates**
$$
H = \frac{1}{\sqrt2}\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix}, \qquad
P(\varphi) = \begin{pmatrix}1 & 0\\ 0 & e^{i\varphi}\end{pmatrix}, \qquad S = P(\pi/2), \qquad T = P(\pi/4);
$$
and, for a real angle $\theta$, the **rotation gates**
$$
R_x(\theta) = e^{-i\theta X/2} = \begin{pmatrix}\cos\frac\theta2 & -i\sin\frac\theta2\\ -i\sin\frac\theta2 & \cos\frac\theta2\end{pmatrix}, \quad
R_y(\theta) = \begin{pmatrix}\cos\frac\theta2 & -\sin\frac\theta2\\ \sin\frac\theta2 & \cos\frac\theta2\end{pmatrix}, \quad
R_z(\theta) = \begin{pmatrix}e^{-i\theta/2} & 0\\ 0 & e^{i\theta/2}\end{pmatrix}.
$$
More generally, for a unit vector $\vec n \in \R^3$, $R_{\vec n}(\theta) = e^{-i\theta\,\vec n\cdot\vec\sigma/2} = \cos\frac\theta2\,I - i\sin\frac\theta2\,(n_xX + n_yY + n_zZ)$.
:::

The exponential formula follows from the power series of $e^{A}$ and the fact that $(\vec n\cdot\vec\sigma)^2 = I$ (an exercise in [[quantum-computing/qubits]]): the even powers give $\cos\frac\theta2\,I$ and the odd powers $-i\sin\frac\theta2\,\vec n\cdot\vec\sigma$. Note that $S^2 = Z$, $T^2 = S$, and $P(\varphi) = e^{i\varphi/2}R_z(\varphi)$, so phase gates and $z$ rotations agree up to a global phase. The Hadamard gate swaps the two bases of [[quantum-computing/qubits]]: $H\ket0 = \ket+$, $H\ket1 = \ket-$, and since $H^2 = I$ also $H\ket\pm = \ket{0}, \ket1$. Conjugating by $H$ exchanges $X$ and $Z$:
$$
HXH = Z, \qquad HZH = X, \qquad HYH = -Y.
$$ {#eq-hxh}

The name "rotation" is earned.

::: theorem Single-qubit gates rotate the Bloch sphere {#thm-rotation}
If a state has Bloch vector $\vec r$, then $R_{\vec n}(\theta)$ applied to it gives the state whose Bloch vector is $\vec r$ rotated by angle $\theta$ about the axis $\vec n$ (anticlockwise looking down $\vec n$ towards the origin).
:::

::: proof
By the proof of [[quantum-computing/qubits#prop-overlap]], a state with Bloch vector $\vec r$ has projector $\ket\psi\!\bra\psi = \tfrac12(I + \vec r\cdot\vec\sigma)$, and $U\ket\psi$ has projector $U\ket\psi\!\bra\psi U^\dagger$. So it suffices to show that $R\,(\vec m\cdot\vec\sigma)\,R^\dagger = (\mathcal R\vec m)\cdot\vec\sigma$ for every $\vec m$, where $R = R_{\vec n}(\theta)$ and $\mathcal R$ is the rotation of $\R^3$. Write $A = \vec n\cdot\vec\sigma$, $B = \vec m\cdot\vec\sigma$, $c = \cos\frac\theta2$, $s = \sin\frac\theta2$. The multiplication rules $XY = iZ$, $YZ = iX$, $ZX = iY$ and $P^2 = I$ give the identity
$$
(\vec a\cdot\vec\sigma)(\vec b\cdot\vec\sigma) = (\vec a\cdot\vec b)\,I + i(\vec a\times\vec b)\cdot\vec\sigma .
$$
Hence $BA - AB = -2i(\vec n\times\vec m)\cdot\vec\sigma$ and
$$
ABA = A\bigl((\vec n\cdot\vec m)I - i(\vec n\times\vec m)\cdot\vec\sigma\bigr) = (\vec n\cdot\vec m)A + \bigl(\vec n\times(\vec n\times\vec m)\bigr)\cdot\vec\sigma = \bigl(2(\vec n\cdot\vec m)\vec n - \vec m\bigr)\cdot\vec\sigma,
$$
using $\vec n\cdot(\vec n\times\vec m) = 0$ and $\vec n\times(\vec n\times\vec m) = (\vec n\cdot\vec m)\vec n - \vec m$. Now
$$
RBR^\dagger = (cI - isA)\,B\,(cI + isA) = c^2B + ics(BA - AB) + s^2ABA,
$$
which equals $\bigl(\cos\theta\,\vec m + \sin\theta\,(\vec n\times\vec m) + (1 - \cos\theta)(\vec n\cdot\vec m)\,\vec n\bigr)\cdot\vec\sigma$ after using $c^2 - s^2 = \cos\theta$, $2cs = \sin\theta$, $2s^2 = 1 - \cos\theta$. The vector in brackets is Rodrigues' formula for the rotation of $\vec m$ by $\theta$ about $\vec n$.
:::

So $Z = iR_z(\pi)$ is a half-turn about $z$, $X$ a half-turn about $x$, $S$ a quarter-turn about $z$ (taking $\ket+$ to $\ket{+i}$), $T$ an eighth-turn, and $H = \tfrac{1}{\sqrt2}(X + Z) = iR_{\vec n}(\pi)$ with $\vec n = (1, 0, 1)/\sqrt2$, a half-turn about the diagonal between $x$ and $z$, which swaps those two axes and reverses $y$ — exactly [[#eq-hxh]]. Since $\mathrm{SU}(2) \to \mathrm{SO}(3)$ in this way is onto, every rotation of the sphere is a gate and every gate is a rotation (times a phase).

The matrix of $H$ is real, so it also acts on the real plane of amplitudes $(\alpha, \beta)$. There it is a **reflection** in the line at angle $\pi/8$, which the figure shows.

::: widget transform2d
matrix: 0.7071, 0.7071; 0.7071, -0.7071
eigen: true
vector: 1, 0
range: 1.5
caption: The Hadamard matrix acting on real amplitude vectors $(\alpha, \beta)$. Its eigenvectors, with eigenvalues $+1$ and $-1$, lie at angles $\pi/8$ and $5\pi/8$; the determinant is $-1$, so it is a reflection, and applying it twice gives the identity. Drag the vector: $(1,0) = \ket0$ goes to $(0.707, 0.707) = \ket+$. Change the matrix to $\cos t, -\sin t; \sin t, \cos t$ with numbers for $t = \theta/2$ to see $R_y(\theta)$, a rotation of the amplitude plane by $\theta/2$ — half the Bloch-sphere angle.
:::

::: theorem Z–Y decomposition {#thm-zyz}
For every $2\times2$ unitary $U$ there are real numbers $\alpha, \beta, \gamma, \delta$ with
$$
U = e^{i\alpha}\,R_z(\beta)\,R_y(\gamma)\,R_z(\delta).
$$
:::

::: proof
First, the shape of a $2\times2$ unitary. Its first column $(a, c)\T$ is a unit vector, and its second column is a unit vector orthogonal to it. In $\C^2$ the vectors orthogonal to $(a, c)\T$ form the line spanned by $(-\overline c, \overline a)\T$, which is itself a unit vector, so the second column is $e^{i\lambda}(-\overline c, \overline a)\T$ for some real $\lambda$:
$$
U = \begin{pmatrix} a & -e^{i\lambda}\overline c\\ c & e^{i\lambda}\overline a\end{pmatrix}, \qquad \abs a^2 + \abs c^2 = 1 .
$$
Second, multiplying out,
$$
R_z(\beta)R_y(\gamma)R_z(\delta) = \begin{pmatrix} e^{-i(\beta+\delta)/2}\cos\frac\gamma2 & -e^{-i(\beta-\delta)/2}\sin\frac\gamma2\\ e^{i(\beta-\delta)/2}\sin\frac\gamma2 & e^{i(\beta+\delta)/2}\cos\frac\gamma2\end{pmatrix}.
$$
Choose $\gamma \in [0, \pi]$ with $\cos\frac\gamma2 = \abs a$, $\sin\frac\gamma2 = \abs c$, and write $a = \abs a e^{i\kappa}$, $c = \abs c e^{i\mu}$ (any $\kappa$ or $\mu$ if the modulus is $0$). Put $\alpha = \lambda/2$ and solve the linear equations $-(\beta + \delta)/2 = \kappa - \alpha$ and $(\beta - \delta)/2 = \mu - \alpha$ for $\beta, \delta$. Then the first column of $e^{i\alpha}R_z(\beta)R_y(\gamma)R_z(\delta)$ is $(a, c)\T$. Its second column is $e^{i\alpha}(-e^{-i(\beta-\delta)/2}\sin\frac\gamma2,\ e^{i(\beta+\delta)/2}\cos\frac\gamma2)\T = e^{2i\alpha}(-\overline c, \overline a)\T = e^{i\lambda}(-\overline c, \overline a)\T$, as required.
:::

Geometrically, any rotation of the sphere is a rotation about $z$, then about $y$, then about $z$ — the Euler angles of mechanics. The same argument works with any two orthogonal axes in place of $z$ and $y$.

::: example Decomposing the Hadamard gate {#ex-h-decomp}
Find a Z–Y decomposition of $H$ and check it.
::: solution
$H$ maps the Bloch vector $\hat z$ to $\hat x$ and $\hat x$ to $\hat z$. A half-turn about $z$ followed by a quarter-turn about $y$ does the same: $R_z(\pi)$ fixes $\hat z$ and sends $\hat x \mapsto -\hat x$; then $R_y(\pi/2)$ sends $\hat z \mapsto \hat x$ and $-\hat x \mapsto \hat z$. Multiplying the matrices,
$$
R_y(\tfrac\pi2)R_z(\pi) = \frac{1}{\sqrt2}\begin{pmatrix}1 & -1\\ 1 & 1\end{pmatrix}\begin{pmatrix}-i & 0\\ 0 & i\end{pmatrix} = \frac{-i}{\sqrt2}\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix} = -iH,
$$
so $H = e^{i\pi/2}\,R_z(0)\,R_y(\pi/2)\,R_z(\pi)$: $\alpha = \pi/2$, $\beta = 0$, $\gamma = \pi/2$, $\delta = \pi$. The global phase $e^{i\pi/2}$ is unobservable on its own, but it matters as soon as $H$ is *controlled* by another qubit, as we see next.
:::
:::

## Multi-qubit gates and circuits

### Tensor products

By the composition postulate ([[quantum-computing/qubits#def-postulates]]), $n$ qubits have state space $\C^{2^n}$ with basis $\ket{x_0x_1\cdots x_{n-1}}$, $x_j \in \{0, 1\}$. We number qubits from the left: qubit $0$ is the leftmost bit of the label, so $\ket{10}$ means qubit $0$ is $1$ and qubit $1$ is $0$, and the label read as a binary number gives the index of the amplitude. (Some software numbers from the right; when comparing with other sources, check the convention.) If qubit $0$ is in state $\ket a$ and qubit $1$ in state $\ket b$ independently, the joint state is the **tensor product** $\ket a\otimes\ket b$, computed as the **Kronecker product** of coordinate vectors:
$$
\begin{pmatrix}a_0\\a_1\end{pmatrix}\otimes\begin{pmatrix}b_0\\b_1\end{pmatrix} = \begin{pmatrix}a_0b_0\\a_0b_1\\a_1b_0\\a_1b_1\end{pmatrix}, \qquad \text{e.g. } \ket+\otimes\ket0 = \tfrac{1}{\sqrt2}(\ket{00} + \ket{10}).
$$
We abbreviate $\ket a\otimes\ket b$ to $\ket a\ket b$ or $\ket{ab}$. A gate $U$ on qubit $0$ alone acts on two qubits as $U\otimes I$, where $(A\otimes B)(\ket a\otimes\ket b) = A\ket a\otimes B\ket b$; as a matrix, $A\otimes B$ is the block matrix with blocks $a_{ij}B$. Most two-qubit states are *not* tensor products — they are **entangled** — and that is the subject of [[quantum-computing/entanglement]]. For circuits, the facts we need are just these: the gate on one qubit acts on every basis label by changing that qubit's bit, linearly; and gates on different qubits commute.

### Controlled gates

::: definition Controlled operations {#def-controlled}
The **controlled-NOT** (CNOT) gate on a **control** qubit $c$ and **target** qubit $t$ maps $\ket{c}\ket{t} \mapsto \ket{c}\ket{t \oplus c}$ for $c, t \in \{0, 1\}$, where $\oplus$ is addition mod $2$. For a single-qubit unitary $U$, **controlled-$U$** maps $\ket0\ket\psi \mapsto \ket0\ket\psi$ and $\ket1\ket\psi \mapsto \ket1 U\ket\psi$. The **Toffoli** gate (controlled-controlled-NOT) maps $\ket{a}\ket{b}\ket{t} \mapsto \ket a\ket b\ket{t \oplus ab}$. The **SWAP** gate maps $\ket{a}\ket{b} \mapsto \ket b\ket a$. In the basis $\ket{00}, \ket{01}, \ket{10}, \ket{11}$ (control first),
$$
\mathrm{CNOT} = \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}, \qquad
\mathrm{CZ} = \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&-1\end{pmatrix}.
$$
:::

Controlled-$Z$ is symmetric in its two qubits — it multiplies $\ket{11}$ by $-1$ and does nothing else — so it has no preferred control. Because $HXH = Z$, a CNOT is a CZ with Hadamards on the target before and after. A subtle point: "control" and "target" are not physical directions of information flow. In the Hadamard basis a CNOT acts as a CNOT with the roles exchanged ([[#ex-reverse-cnot]]), and a controlled-$U$ can change the *control* qubit's state, by **phase kickback**: if $U\ket\psi = e^{i\varphi}\ket\psi$, then controlled-$U$ maps $(\alpha\ket0 + \beta\ket1)\ket\psi$ to $(\alpha\ket0 + e^{i\varphi}\beta\ket1)\ket\psi$, putting the eigenvalue on the control. Phase kickback is the engine of nearly every algorithm in [[quantum-computing/first-algorithms]] and [[quantum-computing/shor]]; it is also why global phases matter inside controlled gates — controlled-$(e^{i\alpha}U)$ differs from controlled-$U$ by the gate $P(\alpha)$ on the control.

### Circuit diagrams

A **quantum circuit** is drawn with one horizontal wire per qubit, time running left to right, and gates as boxes; a control is a dot joined to its target, and $\oplus$ marks the target of a CNOT. Without a diagram widget, we draw circuits in text:

```text
q0: |0> ──H──●──      prepares (|00> + |11>)/√2
             │
q1: |0> ─────X──
```

Reading left to right, $H$ makes $\tfrac{1}{\sqrt2}(\ket0 + \ket1)\ket0 = \tfrac{1}{\sqrt2}(\ket{00} + \ket{10})$, and the CNOT flips qubit $1$ on the second term, giving the **Bell state** $\tfrac{1}{\sqrt2}(\ket{00} + \ket{11})$. The matrix of a circuit is the product of its gate matrices **in reverse order** — the first gate is rightmost — because matrices act on the column vector from the left: here $\mathrm{CNOT}\cdot(H\otimes I)$. Gates on disjoint qubits in the same column can be applied in either order, and the number of columns is the circuit's **depth**, a measure of its running time when gates on different qubits run in parallel.

::: example The matrix of the Bell circuit {#ex-bell-matrix}
Compute the $4\times4$ matrix of the circuit "$H$ on qubit $0$, then CNOT $0\to1$" and the images of the four basis states.
::: solution
In the basis $\ket{00}, \ket{01}, \ket{10}, \ket{11}$, $H\otimes I$ is the block matrix $\tfrac{1}{\sqrt2}\begin{pmatrix}I & I\\ I & -I\end{pmatrix}$, and CNOT swaps the last two rows of whatever it multiplies. So
$$
\mathrm{CNOT}\,(H\otimes I) = \frac{1}{\sqrt2}\begin{pmatrix}1&0&1&0\\0&1&0&1\\0&1&0&-1\\1&0&-1&0\end{pmatrix}.
$$
Its columns are the images of the basis states:
$$
\ket{00} \mapsto \tfrac{1}{\sqrt2}(\ket{00} + \ket{11}), \quad \ket{01} \mapsto \tfrac{1}{\sqrt2}(\ket{01} + \ket{10}), \quad \ket{10} \mapsto \tfrac{1}{\sqrt2}(\ket{00} - \ket{11}), \quad \ket{11} \mapsto \tfrac{1}{\sqrt2}(\ket{01} - \ket{10}).
$$
These four orthonormal states are the **Bell basis**. Running the circuit backwards (CNOT, then $H$, then measure) therefore measures in the Bell basis — the key step of teleportation and superdense coding in [[quantum-computing/entanglement]].
:::
:::

::: definition Circuit model {#def-circuit}
A **quantum circuit** on $n$ qubits is a sequence of gates, each a unitary acting on a constant number of qubits (one, two or three). It starts from $\ket{0}^{\otimes n}$ (or from an input $\ket x$), applies the gates in order, and ends by measuring some or all qubits in the computational basis. Its **size** is the number of gates and its **depth** the number of layers of gates acting on disjoint qubits. Extra qubits used as workspace are called **ancillas**.
:::

Measurements in the middle of a circuit, with later gates conditioned on their outcomes, are often convenient (teleportation uses them). They add no power:

::: proposition Principle of deferred measurement {#prop-deferred}
A measurement in the middle of a circuit followed by gates classically controlled by its outcome can be replaced by the corresponding quantum-controlled gates, with the measurement moved to the end; the joint distribution of all measurement outcomes is unchanged.
:::

::: proof
Consider one mid-circuit measurement of qubit $q$ followed by a unitary $V_b$ that depends on the outcome $b$. Write the state before measurement as $\ket0_q\ket{\psi_0} + \ket1_q\ket{\psi_1}$ (unnormalised, the second factor on all other qubits). Measuring gives $b$ with probability $\norm{\psi_b}^2$, after which the rest is $V_b\ket{\psi_b}/\norm{\psi_b}$. The alternative applies the controlled gate $\ket0\!\bra0\otimes V_0 + \ket1\!\bra1\otimes V_1$, giving $\ket0\,V_0\ket{\psi_0} + \ket1\,V_1\ket{\psi_1}$; any later gates that do not touch $q$ act on each branch separately, and a final measurement of $q$ gives $b$ with probability $\norm{V_b\psi_b}^2 = \norm{\psi_b}^2$, leaving the same conditional state on the other qubits. By induction over the measurements of the circuit, the joint distribution of all outcomes is the same.
:::

## A state-vector simulator

To check circuits — and every algorithm in this course — we use a small simulator that stores all $2^n$ amplitudes in a Python list of `complex` numbers. Applying a single-qubit gate $U$ to qubit $q$ pairs each basis index $i$ that has bit $q$ equal to $0$ with the index $i \,|\, m$ that has it equal to $1$ (where $m$ is the bit mask of qubit $q$), and replaces the two amplitudes $(a, b)$ by $U(a, b)\T$. A controlled gate does the same only for indices whose control bits are all $1$.

```python
# qsim.py, part 1 - a tiny state-vector simulator using only the standard library.
# Qubit 0 is the leftmost (most significant) bit of a basis label |q0 q1 ... q_{n-1}>.
import cmath, math, random

def zeros(n):                      # the state |00...0> on n qubits
    s = [0j] * (1 << n); s[0] = 1; return s

def nqubits(s): return len(s).bit_length() - 1

def apply(s, U, q, controls=()):   # apply 2x2 matrix U to qubit q
    n = nqubits(s); m = 1 << (n - 1 - q)
    cmask = sum(1 << (n - 1 - c) for c in controls)
    for i in range(len(s)):
        if i & m == 0 and i & cmask == cmask:   # i has q = 0 and all controls = 1
            a, b = s[i], s[i | m]
            s[i], s[i | m] = U[0][0]*a + U[0][1]*b, U[1][0]*a + U[1][1]*b

def permute(s, f):                 # basis permutation |i> -> |f(i)> (a reversible map)
    t = [0j] * len(s)
    for i, a in enumerate(s): t[f(i)] += a
    s[:] = t

def probs(s): return [abs(a) ** 2 for a in s]
```

```python
# qsim.py, part 2 - measurement, printing and the standard gates
def measure(s, q, rng=random):     # measure qubit q, collapse s, return the bit
    n = nqubits(s); m = 1 << (n - 1 - q)
    p1 = sum(abs(a) ** 2 for i, a in enumerate(s) if i & m)
    bit = 1 if rng.random() < p1 else 0
    norm = math.sqrt(p1 if bit else 1 - p1)
    for i in range(len(s)):
        s[i] = s[i] / norm if bool(i & m) == bool(bit) else 0j
    return bit

def show(s, tol=1e-9):             # print the non-zero amplitudes as kets
    n = nqubits(s)
    for i, a in enumerate(s):
        if abs(a) > tol:
            z = f"{a.real:+.4f}" if abs(a.imag) < tol else f"({a.real:+.4f}{a.imag:+.4f}i)"
            print(f"{z} |{i:0{n}b}>")

r2 = 1 / math.sqrt(2)
H = [[r2, r2], [r2, -r2]]
X = [[0, 1], [1, 0]]
Y = [[0, -1j], [1j, 0]]
Z = [[1, 0], [0, -1]]
S = [[1, 0], [0, 1j]]
T = [[1, 0], [0, cmath.exp(1j * math.pi / 4)]]
def P(phi): return [[1, 0], [0, cmath.exp(1j * phi)]]
```

Save both parts as one file `qsim.py`. The `permute` function applies a permutation of basis states, which is how we will apply classical reversible functions such as $U_f$ below and modular multiplication in [[quantum-computing/shor]]; `measure` implements the Born rule and collapse for one qubit.

::: example Three circuit identities, checked by simulation {#ex-identities}
Use the simulator to (a) prepare the Bell state, (b) check that three alternating CNOTs swap two qubits, and (c) compute the matrix of a CNOT conjugated by Hadamards on both qubits.
::: solution
```python
from qsim import *

# A Bell pair: H on qubit 0, then CNOT from qubit 0 to qubit 1
s = zeros(2); apply(s, H, 0); apply(s, X, 1, controls=(0,)); show(s)

# Three CNOTs make a SWAP: check on |10>, and on a superposition with phases
s = zeros(2); apply(s, X, 0)                          # |10>
for c, t in ((0, 1), (1, 0), (0, 1)): apply(s, X, t, controls=(c,))
print("SWAP|10> ="); show(s)

# CNOT conjugated by Hadamards is a CNOT the other way round
def matrix(circuit, n):
    cols = []
    for j in range(1 << n):
        s = [0j] * (1 << n); s[j] = 1; circuit(s); cols.append(s)
    return [[round(cols[j][i].real, 6) for j in range(1 << n)] for i in range(1 << n)]
def reversed_cnot(s):
    for q in (0, 1): apply(s, H, q)
    apply(s, X, 1, controls=(0,))
    for q in (0, 1): apply(s, H, q)
for row in matrix(reversed_cnot, 2): print(row)
```

```console
$ python3 identities.py
+0.7071 |00>
+0.7071 |11>
SWAP|10> =
+1.0000 |01>
[1.0, 0.0, 0.0, 0.0]
[0.0, 0.0, 0.0, 1.0]
[0.0, 0.0, 1.0, 0.0]
[0.0, 1.0, 0.0, 0.0]
```

(a) is the Bell state. (b) On basis states, the three CNOTs map $\ket{a, b} \mapsto \ket{a, a\oplus b} \mapsto \ket{b, a\oplus b} \mapsto \ket{b, a}$, using $a \oplus (a \oplus b) = b$; since this holds on a basis, linearity gives SWAP on every state. (c) Column $j$ of the printed matrix is the image of basis state $j$: $\ket{01} \mapsto \ket{11}$ and $\ket{11} \mapsto \ket{01}$, the others fixed. That is a CNOT with qubit $1$ as control and qubit $0$ as target. The identity $(H\otimes H)\,\mathrm{CNOT}_{0\to1}\,(H\otimes H) = \mathrm{CNOT}_{1\to0}$ is proved by hand in [[#ex-reverse-cnot]].
:::
:::

The simulator's cost is the point of quantum computing. A state of $n$ qubits needs $2^n$ complex numbers — at 16 bytes each in double precision, 16 GiB for $n = 30$ and 16 PiB for $n = 50$ — and each gate touches all of them. Cleverer classical methods (tensor networks, stabiliser simulation for Clifford circuits, Feynman path sums as in [[quantum-computing/quantum-complexity]]) handle special circuits far beyond this, but no known classical method simulates *general* circuits of $n$ qubits and polynomial depth in time polynomial in $n$.

::: quiz
In the circuit "$H$ on qubit $0$, then CNOT from qubit $0$ to qubit $1$, then $H$ on qubit $0$" applied to $\ket{00}$, what is the probability that measuring both qubits gives $00$?
- [ ] $0$
- [x] $1/4$
- [ ] $1/2$
- [ ] $1$
::: solution
After the first two gates the state is $\tfrac{1}{\sqrt2}(\ket{00} + \ket{11})$. The final $H$ on qubit $0$ gives $\tfrac12(\ket{00} + \ket{10} + \ket{01} - \ket{11})$: four amplitudes of modulus $1/2$, so each outcome, including $00$, has probability $1/4$. Without the CNOT the two Hadamards would cancel and $00$ would be certain; the CNOT has recorded "which path" qubit $0$ took in qubit $1$, which destroys the interference — just like the intermediate measurement in [[quantum-computing/qubits#ex-interference]].
:::
:::

## Classical computation inside quantum circuits

Quantum circuits are reversible; AND and OR are not — from $a \wedge b = 0$ we cannot recover $a$ and $b$. The fix, found by Bennett (1973), Fredkin and Toffoli (1982), is to keep the inputs. The Toffoli gate computes $\ket{a, b, 0} \mapsto \ket{a, b, a\wedge b}$, and with $X$ (NOT) gates and ancillas set to $0$ or $1$ it computes NAND, so it is universal for classical reversible computation; being a permutation of basis states, it is also a unitary, and hence a quantum gate.

::: definition Oracle for a Boolean function {#def-oracle}
For $f\colon \{0,1\}^n \to \{0,1\}^m$, the **(bit) oracle** $U_f$ on $n + m$ qubits is the linear map with $U_f\ket{x}\ket{y} = \ket{x}\ket{y \oplus f(x)}$ for $x \in \{0,1\}^n$, $y \in \{0,1\}^m$, where $\oplus$ is bitwise XOR. For $m = 1$, the **phase oracle** is $O_f\ket{x} = (-1)^{f(x)}\ket x$.
:::

$U_f$ permutes the basis (it is its own inverse, because $y \oplus f(x) \oplus f(x) = y$), so it is unitary for every $f$, even when $f$ itself is not invertible. The phase oracle is obtained from $U_f$ by phase kickback, with the target qubit in the state $\ket- = (\ket0 - \ket1)/\sqrt2$: $U_f\ket x\ket- = \ket x\,\tfrac{1}{\sqrt2}(\ket{f(x)} - \ket{1\oplus f(x)}) = (-1)^{f(x)}\ket x\ket-$, so with the target in $\ket-$, $U_f$ acts as $O_f$ on the input register.

::: theorem Classical circuits give efficient oracles {#thm-oracle}
If $f\colon\{0,1\}^n\to\{0,1\}^m$ is computed by a classical circuit of $s$ AND, OR and NOT gates (fan-in at most $2$), then $U_f$ is implemented by a quantum circuit of $O(s + m)$ Toffoli, CNOT and $X$ gates using $O(s)$ ancillas that start and end in $\ket0$.
:::

::: proof
Give every wire of the classical circuit its own ancilla, initially $\ket0$. Process the gates in topological order, writing each gate's output into its wire's ancilla: NOT of $a$ as CNOT from $a$ followed by $X$; AND of $a, b$ as a Toffoli onto the fresh ancilla; OR as $a \vee b = \neg(\neg a\wedge\neg b)$, with $X$ gates around a Toffoli (restoring the inputs afterwards). After these $O(s)$ gates the ancillas hold all intermediate values, call them $g(x)$, and the output wires hold $f(x)$: we have $\ket x\ket{0}\ket y \mapsto \ket x\ket{g(x)}\ket y$. Now XOR the $m$ output wires into the register $\ket y$ with $m$ CNOTs, giving $\ket x\ket{g(x)}\ket{y\oplus f(x)}$. Finally run the first stage backwards — each gate used is its own inverse — which **uncomputes** $g(x)$ to $\ket0$ because the first stage did not depend on $y$. The net effect is $\ket x\ket0\ket y \mapsto \ket x\ket0\ket{y\oplus f(x)}$ on basis states, hence by linearity $U_f\otimes I$ on all states.
:::

The uncomputation step is essential. If the "garbage" $g(x)$ were left behind, the state $\sum_x \alpha_x\ket x\ket{g(x)}\ket{f(x)}$ would be entangled with the garbage, and different $x$ could no longer interfere — the garbage acts like a record of which path was taken, as in the quiz above. So any polynomial-time classical algorithm becomes a polynomial-size quantum circuit, and quantum computers can do everything classical ones can, with polynomial overhead (made precise in [[quantum-computing/quantum-complexity]]).

::: example Toffoli from two-qubit gates {#ex-toffoli}
Hardware usually offers only one- and two-qubit gates. Let $V = \tfrac12\begin{pmatrix}1+i & 1-i\\ 1-i & 1+i\end{pmatrix}$, so that $V^2 = X$. Show that the circuit "controlled-$V$ from qubit $1$ to $2$; CNOT $0\to1$; controlled-$V^\dagger$ from $1$ to $2$; CNOT $0\to1$; controlled-$V$ from $0$ to $2$" is a Toffoli gate.
::: solution
Track the operator applied to the target for each value of the controls $(a, b)$. Qubit $1$ holds $b$ during the first controlled-$V$, $b\oplus a$ during the controlled-$V^\dagger$, and $b$ again afterwards (the two CNOTs cancel). So the target receives $V^{b}\,(V^\dagger)^{a\oplus b}\,V^{a}$ (all powers of $V$ commute). For $(a,b) = (0,0)$: $I$. For $(0,1)$: $V V^\dagger = I$. For $(1,0)$: $V^\dagger V = I$. For $(1,1)$: $V\cdot I\cdot V = V^2 = X$. That is exactly the Toffoli gate. The simulator agrees:

```python
from qsim import *

V  = [[(1 + 1j) / 2, (1 - 1j) / 2], [(1 - 1j) / 2, (1 + 1j) / 2]]   # V*V = X
Vd = [[(1 - 1j) / 2, (1 + 1j) / 2], [(1 + 1j) / 2, (1 - 1j) / 2]]   # V dagger

def toffoli_from_two_qubit_gates(s):        # controls 0 and 1, target 2
    apply(s, V, 2, controls=(1,))
    apply(s, X, 1, controls=(0,))
    apply(s, Vd, 2, controls=(1,))
    apply(s, X, 1, controls=(0,))
    apply(s, V, 2, controls=(0,))

for j in range(8):
    s = [0j] * 8; s[j] = 1
    toffoli_from_two_qubit_gates(s)
    out = [i for i in range(8) if abs(s[i]) > 1e-9]
    print(f"|{j:03b}> -> |{out[0]:03b}>  amplitude {s[out[0]].real:+.3f}")
```

```console
$ python3 toffoli.py
|000> -> |000>  amplitude +1.000
|001> -> |001>  amplitude +1.000
|010> -> |010>  amplitude +1.000
|011> -> |011>  amplitude +1.000
|100> -> |100>  amplitude +1.000
|101> -> |101>  amplitude +1.000
|110> -> |111>  amplitude +1.000
|111> -> |110>  amplitude +1.000
```

Every basis state goes to the right basis state with amplitude exactly $1$ — no stray phases — so the circuit equals the Toffoli matrix. Decomposing further into CNOTs and the gates $H$, $T$, $T^\dagger$, a standard circuit uses $6$ CNOTs and $7$ $T$ or $T^\dagger$ gates.
:::
:::

## Universality

Which small gate sets suffice? There are two notions. A set is **exactly universal** if every unitary on any number of qubits is a finite product of its gates (acting on chosen qubits); since a finite set generates only countably many products, an exactly universal set must be infinite — for instance, all single-qubit gates plus CNOT. A finite set can at best be **approximately universal**: its products come arbitrarily close to every unitary. Closeness is measured by the **operator norm** $\norm{A} = \max_{\norm{\psi} = 1}\norm{A\psi}$; if $\norm{U - V} \le \varepsilon$, then every measurement on $U\ket\psi$ and $V\ket\psi$ gives outcome probabilities that differ by at most $2\varepsilon$.

::: lemma Errors add up at most linearly {#lem-errors}
If $U_1, \dots, U_m$ and $V_1, \dots, V_m$ are unitaries with $\norm{U_j - V_j} \le \varepsilon_j$, then $\norm{U_m\cdots U_1 - V_m\cdots V_1} \le \sum_j \varepsilon_j$.
:::

::: proof
By induction on $m$; $m = 1$ is the hypothesis. Write $U' = U_{m-1}\cdots U_1$ and $V' = V_{m-1}\cdots V_1$. Then
$$
U_mU' - V_mV' = U_m(U' - V') + (U_m - V_m)V',
$$
and since unitaries have operator norm $1$ and $\norm{AB} \le \norm A\norm B$, the norm is at most $\norm{U' - V'} + \norm{U_m - V_m} \le \sum_{j<m}\varepsilon_j + \varepsilon_m$.
:::

So to run a circuit of $m$ ideal gates to overall accuracy $\varepsilon$, it is enough to approximate each gate to accuracy $\varepsilon/m$. The universality results are then as follows.

::: theorem Universality of CNOT and single-qubit gates {#thm-universal}
(a) Every unitary on $d$-dimensional space is a product of at most $d(d-1)/2$ **two-level unitaries** (unitaries that act non-trivially on only two basis vectors). (b) Every unitary on $n$ qubits is a product of single-qubit gates and CNOTs (Barenco and others, 1995); $O(n^2 4^n)$ gates suffice by this construction and $O(4^n)$ by later ones.
:::

::: proof
(a) Let $U$ be a $d\times d$ unitary. Choose a two-level unitary $T_1$ acting on basis vectors $1, 2$ that sets entry $(2,1)$ of $T_1U$ to $0$: on the pair $(u_{11}, u_{21})$ it acts as $\frac{1}{r}\begin{pmatrix}\overline{u_{11}} & \overline{u_{21}}\\ -u_{21} & u_{11}\end{pmatrix}$ with $r = \sqrt{\abs{u_{11}}^2 + \abs{u_{21}}^2}$ (the identity if $r = 0$). Repeating for rows $3, \dots, d$ against row $1$ makes the first column $(e^{i\phi}, 0, \dots, 0)\T$ after $d - 1$ steps; one more two-level phase on vectors $1, 2$ (or absorb it into the last step) makes it $(1, 0, \dots, 0)\T$. Because the product is unitary, its first row is then also $(1, 0, \dots, 0)$, so it is $1 \oplus U'$ with $U'$ unitary of size $d - 1$. Recurse: in total at most $(d-1) + (d-2) + \dots + 1 = d(d-1)/2$ factors $T_k$ with $T_K\cdots T_1U = I$, so $U = T_1^\dagger\cdots T_K^\dagger$, each $T_k^\dagger$ two-level.

(b) (Sketch.) A two-level unitary on basis vectors $\ket s, \ket t$ of $n$ qubits is conjugated, by a sequence of CNOTs and $X$ gates following a Gray code from $s$ to $t$, into a single-qubit unitary on one qubit controlled by all the others being in a fixed pattern. A multiply-controlled single-qubit gate is built from Toffolis, ancillas and one controlled-$U$; Toffolis come from two-qubit gates ([[#ex-toffoli]]); and controlled-$U$ is $e^{i\alpha}$-phase on the control together with $A\,X\,B\,X\,C$ on the target with $ABC = I$, where $A, B, C$ come from [[#thm-zyz]] ([[#ex-abc]]). Counting gates gives the bound.
:::

::: theorem Approximate universality and the Solovay–Kitaev theorem {#thm-sk}
(a) The set $\{H, T, \mathrm{CNOT}\}$ is approximately universal: the group generated by $H$ and $T$ is dense in the single-qubit unitaries up to global phase (Boykin and others, 1999). (b) **Solovay–Kitaev theorem.** Let $G$ be a finite set of single-qubit gates, closed under inverses, that generates a dense subgroup of $\mathrm{SU}(2)$. Then every single-qubit unitary can be approximated to operator-norm accuracy $\varepsilon$ by a product of $O(\log^c(1/\varepsilon))$ gates from $G$, for a constant $c$ (about $3.97$ in the standard proof), and the product can be found by a classical algorithm in time $O(\log^{c'}(1/\varepsilon))$. Consequently a circuit of $m$ CNOTs and arbitrary single-qubit gates can be approximated to accuracy $\varepsilon$ by $O(m\log^c(m/\varepsilon))$ gates from $G\cup\{\mathrm{CNOT}\}$.
:::

We state (b) without proof (see Dawson and Nielsen, 2006, or Nielsen–Chuang, Appendix 3). The idea of (a): $T$ is (up to phase) a rotation by $\pi/4$ about $z$, and $HTH$ a rotation by $\pi/4$ about $x$; their product is a rotation by an angle $\theta$ with $\cos(\theta/2) = \cos^2(\pi/8)$, which is an irrational multiple of $\pi$, so its powers are dense in the rotations about one axis, and two such axes generate a dense set. The consequence is that the choice of finite universal set does not matter for complexity theory: switching sets costs only a polylogarithmic factor. For the specific set $\{H, T\}$ there are much better algorithms than Solovay–Kitaev: a $z$-rotation can be approximated with about $3\log_2(1/\varepsilon)$ $T$ gates (Ross and Selinger, 2016), which is optimal up to an additive constant.

::: widget plot
f: log10(3.3219*x)*3.97; log10(3*3.3219*x)
x: 1, 15
y: 0, 8
labels: \log_{10}\bigl((\log_2 1/\varepsilon)^{3.97}\bigr); \log_{10}(3\log_2 1/\varepsilon)
caption: Growth of the gate count needed to approximate a single-qubit rotation to accuracy $\varepsilon = 10^{-x}$ (horizontal axis: $x$ decimal digits), on a logarithmic vertical scale, ignoring constant factors: the Solovay–Kitaev bound $(\log 1/\varepsilon)^{3.97}$ against the $3\log_2(1/\varepsilon)$ of optimal $\{H, T\}$ synthesis. Both are polylogarithmic — tiny compared with $1/\varepsilon$ — but at $10$ digits the difference is about a million gates against a hundred.
:::

Universality does not make every unitary cheap. A counting argument shows the opposite.

::: proposition Most unitaries need exponentially many gates {#prop-counting}
Fix a finite gate set $G$ of gates on at most two qubits. For small enough $\varepsilon > 0$, there are $n$-qubit states $\ket\psi$ such that every circuit of gates from $G$ that maps $\ket{0}^{\otimes n}$ to within distance $\varepsilon$ of $\ket\psi$ has $\Omega\bigl(2^n\log(1/\varepsilon)/\log n\bigr)$ gates.
:::

::: proof
(Sketch.) A circuit of $m$ gates is specified by choosing, for each gate, an element of $G$ and at most two qubits: at most $(\lvert G\rvert n^2)^m$ circuits. Each produces one state, and the $\varepsilon$-ball around it covers a fraction of the unit sphere of $\C^{2^n} = \R^{2^{n+1}}$ that is at most about $\varepsilon^{2^{n+1} - 1}$ (the surface of a ball of radius $\varepsilon$ on a sphere of dimension $D - 1 = 2^{n+1} - 1$ scales as $\varepsilon^{D-1}$). To cover the whole sphere we need $(\lvert G\rvert n^2)^m\,\varepsilon^{2^{n+1}-1} \gtrsim 1$, i.e. $m \gtrsim (2^{n+1} - 1)\log(1/\varepsilon)/\log(\lvert G\rvert n^2) = \Omega(2^n\log(1/\varepsilon)/\log n)$.
:::

So efficient quantum algorithms are rare and precious: they exist only for problems with structure — periodicity, symmetry, the physics of other quantum systems — that a polynomial-size circuit can exploit.

::: warning "Quantum gates act on all $2^n$ amplitudes at once, so quantum computers are exponentially parallel"
A single gate does update $2^{n-1}$ pairs of amplitudes, and that is why classical simulation is expensive. But the amplitudes are not outputs. A measurement returns $n$ bits, sampled from the final distribution, and destroys the state; Holevo's bound ([[quantum-computing/qubits]]) limits what can be learned. A quantum algorithm is fast only if interference makes a useful answer likely. [[#prop-counting]] shows the flip side: most unitaries cannot be implemented efficiently, so most "exponential parallelism" is unusable.
:::

### The Clifford group

One gate set deserves a name. The **Clifford gates** $H$, $S$ and CNOT generate the **Clifford group**, the unitaries that map Pauli operators to Pauli operators under conjugation (as $H$ does in [[#eq-hxh]]). Clifford circuits create entanglement and are central to error correction ([[quantum-computing/error-correction]]), but by the **Gottesman–Knill theorem** (1998) a Clifford circuit acting on $\ket{0}^{\otimes n}$ followed by computational-basis measurements can be simulated classically in polynomial time. Adding any single non-Clifford gate, such as $T$, restores universality ([[#thm-sk]]). In fault-tolerant machines, Clifford gates are comparatively cheap and $T$ gates expensive, so the **$T$-count** of a circuit is a standard measure of its cost.

::: history
Reversible computation was studied before quantum computing: Rolf Landauer argued in 1961 that erasing information has an unavoidable thermodynamic cost, Charles Bennett showed in 1973 that any computation can be made reversible by keeping and then uncomputing a history, and Tommaso Toffoli (1980) and Edward Fredkin with Toffoli (1982) introduced the gates that bear their names. Richard Feynman described quantum gates and circuits for reversible computation in "Quantum mechanical computers" (1985). David Deutsch introduced quantum computational networks — circuits — in 1989, and Andrew Yao (1993) proved them equivalent to quantum Turing machines. Adriano Barenco and eight co-authors established in 1995 that CNOT and single-qubit gates are universal. Robert Solovay (in unpublished work around 1995) and Alexei Kitaev (1997) proved the theorem now named after them; Christopher Dawson and Michael Nielsen gave the standard exposition in 2006. Daniel Gottesman's 1998 paper on the Heisenberg representation of quantum computers contains the Gottesman–Knill theorem, credited jointly to Emanuel Knill.
:::

## Where this leads

The tensor product and the Bell circuit lead directly to entanglement, teleportation and superdense coding in [[quantum-computing/entanglement]], where we use the simulator to check both protocols. The oracle $U_f$ and phase kickback are the setting of the query algorithms in [[quantum-computing/first-algorithms]]. Controlled phase gates, combined with Hadamards, build the quantum Fourier transform in [[quantum-computing/shor]]. Universality and [[#lem-errors]] make the class $\mathsf{BQP}$ independent of the gate set in [[quantum-computing/quantum-complexity]], and the Clifford group returns as the backbone of stabiliser codes in [[quantum-computing/error-correction]].

::: summary
- Single-qubit gates are $2\times2$ unitaries; up to a global phase each is a rotation $R_{\vec n}(\theta)$ of the Bloch sphere ([[#thm-rotation]]), and each is $e^{i\alpha}R_z(\beta)R_y(\gamma)R_z(\delta)$ ([[#thm-zyz]]).
- Key identities: $H\ket0 = \ket+$, $HXH = Z$, $S = T^2$, $Z = S^2$; three CNOTs make a SWAP; Hadamards reverse a CNOT.
- Controlled-$U$ can change the control qubit by **phase kickback**, which is why global phases matter inside controlled gates.
- A circuit's matrix is the product of its gate matrices in reverse order; mid-circuit measurements can be deferred to the end ([[#prop-deferred]]).
- Every classical circuit of size $s$ gives a reversible oracle $U_f\ket x\ket y = \ket x\ket{y\oplus f(x)}$ of size $O(s)$, provided garbage is uncomputed ([[#thm-oracle]]).
- CNOT plus single-qubit gates are exactly universal; $\{H, T, \mathrm{CNOT}\}$ is approximately universal, and by **Solovay–Kitaev** changing gate sets costs only a polylogarithmic factor ([[#thm-sk]]); errors of gates add at most linearly ([[#lem-errors]]).
- Nevertheless almost all unitaries need exponentially many gates ([[#prop-counting]]); efficient quantum algorithms are the exception.
:::

## Exercises

::: exercise Conjugating by Hadamards {level=1}
Verify $HZH = X$ and $HXH = Z$ by matrix multiplication, and deduce $HYH = -Y$ from $Y = iXZ$.
::: solution
$HZ = \tfrac{1}{\sqrt2}\begin{pmatrix}1 & -1\\ 1 & 1\end{pmatrix}$ and $HZH = \tfrac12\begin{pmatrix}1-1 & 1+1\\ 1+1 & 1-1\end{pmatrix} = X$. Multiplying $HZH = X$ on both sides by $H$ (using $H^2 = I$) gives $Z = HXH$. Then $Y = iXZ$ (check: $iXZ = i\begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix} = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}$), so $HYH = i(HXH)(HZH) = iZX = -iXZ = -Y$, since $ZX = -XZ$.
:::
:::

::: exercise Phase gates {level=1 check="2"}
How many $T$ gates in a row equal the $S$ gate, and how many equal $Z$? (Enter the number of $T$ gates that give $S$.)
::: solution
$T^k = P(k\pi/4)$, so $T^2 = P(\pi/2) = S$ and $T^4 = P(\pi) = Z$. The answer is $2$ (and $4$ for $Z$; $T^8 = I$).
:::
:::

::: exercise CNOT with the other control {level=1}
Write down the $4\times4$ matrix of the CNOT whose control is qubit $1$ and whose target is qubit $0$, in the basis $\ket{00}, \ket{01}, \ket{10}, \ket{11}$.
::: solution
It fixes $\ket{00}$ and $\ket{10}$ (control $0$) and swaps $\ket{01} \leftrightarrow \ket{11}$. The matrix, with column $j$ the image of basis vector $j$, has ones at positions $(0,0)$, $(3,1)$, $(2,2)$, $(1,3)$ — exactly the matrix printed in [[#ex-identities]](c).
:::
:::

::: exercise The memory wall {level=1 check="16"}
How many tebibytes (TiB, $2^{40}$ bytes) does a state-vector simulator need to store the state of $40$ qubits in double-precision complex numbers (16 bytes per amplitude)? (Enter the number of TiB.)
::: solution
$2^{40}$ amplitudes $\times\ 16$ bytes $= 16 \times 2^{40}$ bytes $= 16$ TiB. Each additional qubit doubles this; the largest exact state-vector simulations on supercomputers have reached the mid-40s of qubits.
:::
:::

::: exercise Reversing a CNOT by hand {#ex-reverse-cnot level=2}
Prove $(H\otimes H)\,\mathrm{CNOT}_{0\to1}\,(H\otimes H) = \mathrm{CNOT}_{1\to0}$. (Hint: write CNOT as $\ket0\!\bra0\otimes I + \ket1\!\bra1\otimes X$.)
::: solution
$\ket0\!\bra0 = \tfrac12(I + Z)$ and $\ket1\!\bra1 = \tfrac12(I - Z)$, so $\mathrm{CNOT}_{0\to1} = \tfrac12(I\otimes I + Z\otimes I + I\otimes X - Z\otimes X)$. Conjugating each tensor factor by $H$ and using [[#eq-hxh]] gives $\tfrac12(I\otimes I + X\otimes I + I\otimes Z - X\otimes Z)$. Regrouping, this is $I\otimes\tfrac12(I + Z) + X\otimes\tfrac12(I - Z) = I\otimes\ket0\!\bra0 + X\otimes\ket1\!\bra1$, which applies $X$ to qubit $0$ exactly when qubit $1$ is $\ket1$: $\mathrm{CNOT}_{1\to0}$.
:::
:::

::: exercise Error budget {level=1 check="0.1"}
A circuit has $1000$ gates, each implemented with operator-norm error at most $10^{-4}$. What upper bound does [[#lem-errors]] give on the operator-norm error of the whole circuit? (Enter a decimal.)
::: solution
$1000 \times 10^{-4} = 0.1$. Measurement probabilities may then differ from the ideal ones by up to $2 \times 0.1 = 0.2$. Real errors are usually random and partly cancel, but the linear bound is what one can guarantee; for longer computations error correction is needed ([[quantum-computing/error-correction]]).
:::
:::

::: exercise Controlled gates from the Z–Y decomposition {#ex-abc level=2}
Let $U = e^{i\alpha}R_z(\beta)R_y(\gamma)R_z(\delta)$. Put $A = R_z(\beta)R_y(\gamma/2)$, $B = R_y(-\gamma/2)R_z(-(\delta+\beta)/2)$ and $C = R_z((\delta - \beta)/2)$. Show that $ABC = I$ and $AXBXC = e^{-i\alpha}U$, and deduce a circuit for controlled-$U$ from CNOTs and single-qubit gates.
::: solution
$ABC = R_z(\beta)R_y(\tfrac\gamma2)R_y(-\tfrac\gamma2)R_z(-\tfrac{\delta+\beta}{2})R_z(\tfrac{\delta-\beta}{2}) = R_z(\beta)R_z(-\beta) = I$. Since $XR_y(\theta)X = R_y(-\theta)$ and $XR_z(\theta)X = R_z(-\theta)$ (conjugation by $X$ is a half-turn about $x$, which reverses $y$ and $z$), $XBX = R_y(\tfrac\gamma2)R_z(\tfrac{\delta+\beta}{2})$. Then $AXBXC = R_z(\beta)R_y(\tfrac\gamma2)R_y(\tfrac\gamma2)R_z(\tfrac{\delta+\beta}{2})R_z(\tfrac{\delta-\beta}{2}) = R_z(\beta)R_y(\gamma)R_z(\delta) = e^{-i\alpha}U$. Circuit: apply $C$ to the target, CNOT, $B$ to the target, CNOT, $A$ to the target, and $P(\alpha)$ to the control. If the control is $0$ the target receives $ABC = I$; if it is $1$ it receives $AXBXC = e^{-i\alpha}U$, and $P(\alpha)$ supplies the missing $e^{i\alpha}$ on exactly that branch. That is two CNOTs and four single-qubit gates.
:::
:::

::: exercise Phase kickback {level=2}
Let $U$ be a single-qubit unitary with eigenvector $\ket u$, $U\ket u = e^{2\pi i\varphi}\ket u$. Show that the circuit "$H$ on the control; controlled-$U$; $H$ on the control", applied to $\ket0\ket u$, gives control outcome $0$ with probability $\cos^2(\pi\varphi)$. What does this measure, and how precisely?
::: solution
$H$: $\tfrac{1}{\sqrt2}(\ket0 + \ket1)\ket u$. Controlled-$U$ with kickback: $\tfrac{1}{\sqrt2}(\ket0 + e^{2\pi i\varphi}\ket1)\ket u$. $H$: $\tfrac12\bigl((1 + e^{2\pi i\varphi})\ket0 + (1 - e^{2\pi i\varphi})\ket1\bigr)\ket u$. So $\Prob(0) = \tfrac14\abs{1 + e^{2\pi i\varphi}}^2 = \tfrac14(2 + 2\cos 2\pi\varphi) = \cos^2(\pi\varphi)$. The circuit estimates the eigenphase $\varphi$, but only through one coin with bias $\cos^2(\pi\varphi)$: $k$ repetitions give $\varphi$ to precision about $1/\sqrt k$. [[quantum-computing/shor]] shows how phase estimation with several control qubits and the quantum Fourier transform gets $t$ bits of $\varphi$ with high probability using $O(t)$ control qubits.
:::
:::

::: exercise How many circuits? {level=3}
Carry out the counting argument of [[#prop-counting]] for single-qubit gates only: if $G$ has $g$ gates, how many distinct products of length at most $m$ are there, and what lower bound on $m$ does covering the Bloch sphere to accuracy $\varepsilon$ require? Compare with the Solovay–Kitaev upper bound.
::: solution
There are at most $g + g^2 + \dots + g^m \le g^{m+1}$ products. Each approximates the points within distance about $\varepsilon$ of one point on the Bloch sphere (a 2-dimensional sphere), a cap of area $O(\varepsilon^2)$ out of $4\pi$. Covering the sphere needs $g^{m+1}\cdot O(\varepsilon^2) \ge 4\pi$, so $m \ge 2\log(1/\varepsilon)/\log g - O(1) = \Omega(\log(1/\varepsilon))$. (Approximating unitaries rather than states — the 3-dimensional group $\mathrm{SU}(2)$ — gives $3\log(1/\varepsilon)/\log g$, which is where the constant $3$ in Ross–Selinger's $3\log_2(1/\varepsilon)$ comes from.) The Solovay–Kitaev theorem gives $O(\log^{3.97}(1/\varepsilon))$, polylogarithmic but not linear in $\log(1/\varepsilon)$; for special gate sets such as $\{H, T\}$, number-theoretic algorithms achieve the linear lower bound up to constants.
:::
:::

::: exercise Implement the ABC construction {level=3}
Using `qsim.py`, implement controlled-$H$ from two CNOTs and single-qubit gates using [[#ex-abc]] and the decomposition of [[#ex-h-decomp]], and check it against `apply(s, H, 1, controls=(0,))` on all four basis states.
::: solution
From [[#ex-h-decomp]], $\alpha = \pi/2$, $\beta = 0$, $\gamma = \pi/2$, $\delta = \pi$, so $A = R_y(\pi/4)$, $B = R_y(-\pi/4)R_z(-\pi/2)$, $C = R_z(\pi/2)$.

```python
from qsim import *
def Ry(t): return [[math.cos(t/2), -math.sin(t/2)], [math.sin(t/2), math.cos(t/2)]]
def Rz(t): return [[cmath.exp(-1j*t/2), 0], [0, cmath.exp(1j*t/2)]]
def mul(A, B): return [[sum(A[i][k]*B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
A, B, C = Ry(math.pi/4), mul(Ry(-math.pi/4), Rz(-math.pi/2)), Rz(math.pi/2)
def controlled_h(s):                      # control qubit 0, target qubit 1
    apply(s, C, 1); apply(s, X, 1, controls=(0,))
    apply(s, B, 1); apply(s, X, 1, controls=(0,))
    apply(s, A, 1); apply(s, P(math.pi/2), 0)
worst = 0
for j in range(4):
    s = [0j]*4; s[j] = 1; controlled_h(s)
    t = [0j]*4; t[j] = 1; apply(t, H, 1, controls=(0,))
    worst = max(worst, max(abs(a - b) for a, b in zip(s, t)))
print("largest amplitude difference:", f"{worst:.1e}")
```

```console
$ python3 controlled_h.py
largest amplitude difference: 1.8e-16
```

The two circuits agree to rounding error on every basis state, hence everywhere by linearity. Leaving out the final $P(\pi/2)$ gives a largest difference of $1.0$: the "global" phase of $H$ is not global inside a controlled gate.
:::
:::
