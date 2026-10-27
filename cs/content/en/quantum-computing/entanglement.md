Prepare two qubits with a Hadamard and a CNOT, as in [[quantum-computing/quantum-circuits#ex-bell-matrix]], and give one to Alice and the other to Bob. Each of them, measuring alone, sees a perfectly random bit. Yet their bits always agree — and if both first apply a Hadamard and then measure, their bits *still* always agree, which no pair of pre-arranged random bits could guarantee for every choice of basis. The pair is in a state that is not a combination of a state of Alice's qubit and a state of Bob's: it is **entangled**. Einstein called the correlations "spooky action at a distance" and concluded, with Podolsky and Rosen in 1935, that quantum mechanics must be incomplete. Experiments have since vindicated quantum mechanics, and entanglement has become a resource that can be created, stored, consumed and counted like bandwidth or memory.

This chapter develops the mathematics of several qubits: product and entangled states, partial measurement, and the **Schmidt decomposition**. We prove the **no-cloning theorem** and the **no-signalling** principle, which together say what entanglement cannot do. Then we show what it can do: **superdense coding** sends two classical bits with one qubit, **teleportation** sends a qubit with two classical bits, and the **CHSH game** is won with probability $\cos^2(\pi/8) \approx 0.854$ by entangled players against at most $3/4$ classically. Both protocols are checked with the simulator `qsim.py` from [[quantum-computing/quantum-circuits]]. The physics of entanglement, including the EPR argument and Bell's theorem, is also treated in [Physics Atlas: entanglement](/learn/physics/lesson.php?c=quantum-2&l=entanglement).

## Product states and entangled states

Recall from [[quantum-computing/quantum-circuits]] that two qubits have the four-dimensional state space $\C^2\otimes\C^2 = \C^4$, with basis $\ket{00}, \ket{01}, \ket{10}, \ket{11}$, and that independent states combine by the tensor product, $(a_0\ket0 + a_1\ket1)\otimes(b_0\ket0 + b_1\ket1) = \sum_{ij}a_ib_j\ket{ij}$. The tensor product is bilinear, $(\ket a + \ket{a'})\otimes\ket b = \ket a\otimes\ket b + \ket{a'}\otimes\ket b$, and inner products multiply: $\bigl(\bra a\otimes\bra b\bigr)\bigl(\ket{a'}\otimes\ket{b'}\bigr) = \braket{a|a'}\braket{b|b'}$.

::: definition Product and entangled states {#def-entangled}
A state $\ket\psi$ of a system with two parts $A$ and $B$ is a **product state** if $\ket\psi = \ket a\otimes\ket b$ for some states $\ket a$ of $A$ and $\ket b$ of $B$; otherwise it is **entangled**. The four **Bell states** are
$$
\ket{\Phi^\pm} = \frac{\ket{00} \pm \ket{11}}{\sqrt2}, \qquad \ket{\Psi^\pm} = \frac{\ket{01} \pm \ket{10}}{\sqrt2}.
$$
:::

The Bell states are orthonormal, so they form a basis of $\C^4$, the **Bell basis**; by [[quantum-computing/quantum-circuits#ex-bell-matrix]] the circuit "$H$ on the first qubit, then CNOT" maps $\ket{00}, \ket{01}, \ket{10}, \ket{11}$ to $\ket{\Phi^+}, \ket{\Psi^+}, \ket{\Phi^-}, \ket{\Psi^-}$. They are entangled — the next theorem gives a test — and in a precise sense maximally so. One shared Bell pair is called an **ebit**.

### Measuring part of a system

The Born rule extends to measuring only some qubits. If qubit $0$ of a two-qubit state $\ket\psi = \sum_{ij}c_{ij}\ket{ij}$ is measured in the computational basis, the outcome $i$ occurs with probability
$$
p(i) = \sum_j \abs{c_{ij}}^2,
$$ {#eq-partial}
and the state becomes $\ket i\otimes\frac{1}{\sqrt{p(i)}}\sum_j c_{ij}\ket j$. This is the projective measurement with projectors $\ket i\!\bra i\otimes I$ ([[quantum-computing/qubits#def-postulates]]); `measure(s, q)` in the simulator implements it for any qubit of any number.

::: example Measuring half a Bell pair {#ex-half-bell}
Alice measures her qubit of $\ket{\Phi^+}$ in the computational basis. What does she see, and what is Bob's state afterwards? What if both measure in the Hadamard basis instead?
::: solution
By [[#eq-partial]], $p(0) = \abs{1/\sqrt2}^2 = 1/2 = p(1)$, and the state becomes $\ket{00}$ or $\ket{11}$: Bob's qubit is now $\ket0$ or $\ket1$, matching Alice's result. For the Hadamard basis, rewrite the state. Since $\ket0 = (\ket+ + \ket-)/\sqrt2$ and $\ket1 = (\ket+ - \ket-)/\sqrt2$,
$$
\ket{\Phi^+} = \tfrac{1}{2\sqrt2}\bigl[(\ket+ + \ket-)(\ket+ + \ket-) + (\ket+ - \ket-)(\ket+ - \ket-)\bigr] = \frac{\ket{++} + \ket{--}}{\sqrt2}.
$$
So in the Hadamard basis, too, the outcomes are uniformly random and always equal. A classical pair of correlated random bits, say both $0$ or both $1$ with probability $1/2$ — the state after the computational-basis measurement — would give *independent* uniform bits in the Hadamard basis. The correlation in two complementary bases is the signature of entanglement.
:::
:::

### The Schmidt decomposition

Every two-part state has a canonical form, and it is just the singular value decomposition ([Maths Atlas: the SVD](/learn/maths/lesson.php?c=linear-algebra&l=svd)) in disguise.

::: theorem Schmidt decomposition {#thm-schmidt}
Let $\ket\psi = \sum_{i=1}^{d_A}\sum_{j=1}^{d_B}c_{ij}\ket i\ket j$ be a unit vector in $\C^{d_A}\otimes\C^{d_B}$. There are orthonormal vectors $\ket{u_1}, \dots, \ket{u_r}$ in $\C^{d_A}$ and $\ket{v_1}, \dots, \ket{v_r}$ in $\C^{d_B}$ and positive numbers $\lambda_1 \ge \dots \ge \lambda_r > 0$ with $\sum_k\lambda_k^2 = 1$ such that
$$
\ket\psi = \sum_{k=1}^{r}\lambda_k\ket{u_k}\ket{v_k}.
$$ {#eq-schmidt}
The **Schmidt coefficients** $\lambda_k$ are the non-zero singular values of the coefficient matrix $C = (c_{ij})$, and the **Schmidt rank** $r = \rank C$. The state is a product state if and only if $r = 1$.
:::

::: proof
Write the singular value decomposition $C = U\Sigma V^\dagger$, with $U$ and $V$ unitary and $\Sigma$ having the singular values $\lambda_1 \ge \dots \ge \lambda_r > 0$ on its diagonal and zeros elsewhere, where $r = \rank C$. Entrywise $c_{ij} = \sum_{k=1}^r U_{ik}\lambda_k\overline{V_{jk}}$, so
$$
\ket\psi = \sum_k \lambda_k\Bigl(\sum_i U_{ik}\ket i\Bigr)\Bigl(\sum_j\overline{V_{jk}}\ket j\Bigr) = \sum_k\lambda_k\ket{u_k}\ket{v_k},
$$
where $\ket{u_k}$ has the entries of column $k$ of $U$ and $\ket{v_k}$ the conjugated entries of column $k$ of $V$. Columns of a unitary are orthonormal, and conjugating entries preserves orthonormality. Taking the norm, $1 = \braket{\psi|\psi} = \sum_k\lambda_k^2$ by orthonormality (equivalently, $\sum_{ij}\abs{c_{ij}}^2 = \tr(C^\dagger C) = \sum_k\lambda_k^2$).

If $r = 1$ then $\ket\psi = \ket{u_1}\ket{v_1}$ is a product. Conversely, if $\ket\psi = \ket a\ket b$ then $c_{ij} = a_ib_j$, so $C = \mathbf a\,\mathbf b\T$ is a non-zero matrix of rank one.
:::

::: example A Schmidt decomposition by hand {#ex-schmidt}
Find the Schmidt decomposition of $\ket\chi = \tfrac12(\ket{00} + \ket{01} + \ket{10} - \ket{11})$, the state produced by a CZ gate acting on $\ket+\ket+$.
::: solution
The coefficient matrix is $C = \tfrac12\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix} = \tfrac{1}{\sqrt2}H$. Since $H$ is unitary, $C^\dagger C = \tfrac12 I$, so both singular values are $1/\sqrt2$ and the Schmidt rank is $2$: the state is maximally entangled. An explicit decomposition comes from grouping by the first qubit:
$$
\ket\chi = \tfrac{1}{\sqrt2}\Bigl(\ket0\otimes\tfrac{\ket0 + \ket1}{\sqrt2} + \ket1\otimes\tfrac{\ket0 - \ket1}{\sqrt2}\Bigr) = \tfrac{1}{\sqrt2}\bigl(\ket0\ket+ + \ket1\ket-\bigr),
$$
with $\ket{u_1}, \ket{u_2} = \ket0, \ket1$ and $\ket{v_1}, \ket{v_2} = \ket+, \ket-$, both orthonormal pairs. Applying $H$ to the second qubit turns it into $\ket{\Phi^+}$, confirming that it is a Bell state in disguise. When the Schmidt coefficients are equal the Schmidt bases are not unique; for $\ket{\Phi^+}$, for instance, every real rotated basis works ([[#ex-angle]]).
:::
:::

::: corollary A test for two qubits {#cor-det}
A two-qubit state $\alpha\ket{00} + \beta\ket{01} + \gamma\ket{10} + \delta\ket{11}$ is entangled if and only if $\alpha\delta \ne \beta\gamma$.
:::

::: proof
Here $C = \begin{pmatrix}\alpha & \beta\\ \gamma & \delta\end{pmatrix}$, which is non-zero, so it has rank $1$ iff $\det C = \alpha\delta - \beta\gamma = 0$. Apply [[#thm-schmidt]].
:::

For $\ket{\Phi^+}$, $\alpha\delta = 1/2 \ne 0 = \beta\gamma$: entangled, with $C = I/\sqrt2$ and two equal Schmidt coefficients $1/\sqrt2$, the most even split possible. The Schmidt coefficients do not change under unitaries applied to $A$ alone or $B$ alone (they replace $C$ by $U_ACU_B\T$, which has the same singular values), so they measure entanglement intrinsically; the **entanglement entropy** $-\sum_k\lambda_k^2\log\lambda_k^2$ is $1$ ebit for a Bell state and $0$ for a product.

## What entanglement cannot do

### No cloning

A classical bit can be copied: CNOT maps $\ket{b}\ket0 \mapsto \ket b\ket b$ for $b \in \{0, 1\}$. Can a quantum state be copied?

::: theorem No-cloning theorem {#thm-no-cloning}
There is no unitary $U$ on a system $A\otimes B\otimes E$ (input, blank and any environment or ancilla), a fixed blank state $\ket s$ and environment state $\ket e$ such that for two states $\ket\psi, \ket\phi$ of $A$,
$$
U\ket\psi\ket s\ket e = \ket\psi\ket\psi\ket{e_\psi}, \qquad U\ket\phi\ket s\ket e = \ket\phi\ket\phi\ket{e_\phi}
$$
for some unit vectors $\ket{e_\psi}, \ket{e_\phi}$, unless $\ket\psi$ and $\ket\phi$ are orthogonal or equal up to a global phase. In particular no device copies every state of a qubit.
:::

::: proof
Unitaries preserve inner products ([[quantum-computing/qubits#prop-unitary]]). The inner product of the two inputs is $\braket{\psi|\phi}\braket{s|s}\braket{e|e} = \braket{\psi|\phi}$, and of the two outputs is $\braket{\psi|\phi}^2\braket{e_\psi|e_\phi}$. So $\braket{\psi|\phi} = \braket{\psi|\phi}^2\braket{e_\psi|e_\phi}$. Taking absolute values, with $x = \abs{\braket{\psi|\phi}} \in [0, 1]$ and $\abs{\braket{e_\psi|e_\phi}} \le 1$ by Cauchy–Schwarz, we get $x \le x^2$. Hence $x = 0$ (orthogonal) or $x = 1$, which by the equality case of Cauchy–Schwarz means $\ket\phi = e^{i\gamma}\ket\psi$.
:::

The proof uses only unitarity, but there is an even simpler argument from linearity. If $U\ket{b}\ket0 = \ket b\ket b$ for $b = 0, 1$, then $U\ket+\ket0 = \tfrac{1}{\sqrt2}(\ket{00} + \ket{11}) = \ket{\Phi^+}$, not $\ket+\ket+ = \tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$. A CNOT "copies" a superposition into an entangled state, which is a very different thing. No-cloning is why quantum information cannot be backed up by copying — so error correction has to work differently ([[quantum-computing/error-correction]]) — and why an eavesdropper cannot copy the qubits of BB84 ([[quantum-computing/qubits]]).

::: example How badly does a CNOT clone? {#ex-cnot-clone}
A CNOT with a blank target in $\ket0$ copies $\ket0$ and $\ket1$ perfectly. Feed it $\ket+$. How close is the output to the desired $\ket+\ket+$, and what does each output qubit look like alone?
::: solution
The output is $\ket{\Phi^+}$. Its overlap with $\ket+\ket+ = \tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$ is $\tfrac{1}{\sqrt2}\cdot\tfrac12(1 + 1) = \tfrac{1}{\sqrt2}$, so the fidelity with a perfect pair of copies is $\abs{1/\sqrt2}^2 = 1/2$. Each output qubit alone gives a uniformly random result in *every* basis — by [[#ex-angle]], $\ket{\Phi^+}$ is the same in every real basis — so measuring either one in the $X$ basis gives $+$ only half the time, whereas the original $\ket+$ gave $+$ with certainty. The "copy" has destroyed the $X$-basis information of the original. The best possible universal cloner, found by Bužek and Hillery (1996), produces two copies each of fidelity $5/6$ with the input; no-cloning says only that $1$ is impossible.
:::
:::

::: warning Entanglement does not send messages faster than light
When Alice measures her half of $\ket{\Phi^+}$ and gets $0$, Bob's qubit "becomes" $\ket0$ instantly, however far away he is. But Alice cannot choose her outcome, and Bob, measuring alone, sees uniformly random bits whatever Alice did. The correlation appears only when the two lists of results are compared, which needs an ordinary channel. The next proposition makes this precise, and teleportation below is a clean example: the two classical bits are essential, and before they arrive Bob's qubit carries no information about the teleported state.
:::

::: proposition No signalling {#prop-no-signalling}
Let $\ket\psi$ be a state of $A\otimes B$. Whatever unitary $U$ Alice applies to $A$, and whatever projective measurement $\{P_a\}$ she then makes on $A$ (with her outcome unknown to Bob), the probability of each outcome $b$ of any projective measurement $\{Q_b\}$ that Bob makes on $B$ is the same as if Alice had done nothing.
:::

::: proof
After Alice's operations the joint probability of $(a, b)$ is $\norm{(P_a\otimes Q_b)(U\otimes I)\psi}^2 = \bra\psi\bigl(U^\dagger P_aU\otimes Q_b\bigr)\ket\psi$, using $P_a^\dagger P_a = P_a$ and $Q_b^\dagger Q_b = Q_b$. Summing over Alice's outcomes and using $\sum_a P_a = I$ and $U^\dagger U = I$, Bob's marginal is $\bra\psi(I\otimes Q_b)\ket\psi$, which does not depend on $U$ or $\{P_a\}$.
:::

## Superdense coding

One qubit carries at most one classical bit (Holevo, [[quantum-computing/qubits]]). With a pre-shared ebit, it carries two.

::: algorithm Superdense coding {#alg-superdense}
Alice and Bob share $\ket{\Phi^+}$, Alice holding qubit $0$ and Bob qubit $1$. To send bits $b_1b_2$:
1. Alice applies $X^{b_2}$ and then $Z^{b_1}$ to her qubit, and sends it to Bob.
2. Bob, now holding both qubits, applies CNOT (qubit $0$ to qubit $1$), then $H$ to qubit $0$, and measures both qubits; the outcome is $b_1b_2$.
:::

::: proposition Superdense coding is correct {#prop-superdense}
Bob's measurement in [[#alg-superdense]] returns $b_1b_2$ with probability $1$.
:::

::: proof
Alice's operations map $\ket{\Phi^+}$ to: $\ket{\Phi^+}$ for $00$; $X\otimes I$ gives $\tfrac{1}{\sqrt2}(\ket{10} + \ket{01}) = \ket{\Psi^+}$ for $01$; $Z\otimes I$ gives $\ket{\Phi^-}$ for $10$; and $ZX\otimes I$ gives $\tfrac{1}{\sqrt2}(Z\ket{10} + Z\ket{01}) = \tfrac{1}{\sqrt2}(\ket{01} - \ket{10}) = \ket{\Psi^-}$ for $11$. Bob's CNOT then $H$ is the inverse of the Bell circuit, which by [[quantum-computing/quantum-circuits#ex-bell-matrix]] maps $\ket{\Phi^+}, \ket{\Psi^+}, \ket{\Phi^-}, \ket{\Psi^-}$ to $\ket{00}, \ket{01}, \ket{10}, \ket{11}$ respectively. So bits $b_1b_2$ end as $\ket{b_1b_2}$.
:::

The simulator confirms it:

```python
from qsim import *

def superdense(b1, b2):
    s = zeros(2)
    apply(s, H, 0); apply(s, X, 1, controls=(0,))   # shared Bell pair: Alice 0, Bob 1
    if b2: apply(s, X, 0)                            # Alice encodes two bits
    if b1: apply(s, Z, 0)                            #   on her qubit alone
    apply(s, X, 1, controls=(0,)); apply(s, H, 0)    # Bob: Bell-basis measurement
    return [round(p, 6) for p in probs(s)]

for b1 in (0, 1):
    for b2 in (0, 1):
        print(f"sent {b1}{b2}: P(00, 01, 10, 11) =", superdense(b1, b2))
```

```console
$ python3 superdense.py
sent 00: P(00, 01, 10, 11) = [1.0, 0.0, 0.0, 0.0]
sent 01: P(00, 01, 10, 11) = [0.0, 1.0, 0.0, 0.0]
sent 10: P(00, 01, 10, 11) = [0.0, 0.0, 1.0, 0.0]
sent 11: P(00, 01, 10, 11) = [0.0, 0.0, 0.0, 1.0]
```

This does not contradict Holevo's bound: two qubits — the one Alice sends and Bob's half of the pair, delivered earlier — carry two bits. What the ebit buys is that one of the qubits can be sent *before* the message exists.

## Teleportation

The reverse trade sends an unknown qubit using one ebit and two classical bits. Neither resource suffices alone: two bits cannot describe the continuous parameters of a state, and by no-signalling ([[#prop-no-signalling]]) the ebit alone transmits nothing.

::: algorithm Quantum teleportation {#alg-teleport}
Alice holds qubit $0$ in an unknown state $\ket\psi = \alpha\ket0 + \beta\ket1$. Alice (qubit $1$) and Bob (qubit $2$) share $\ket{\Phi^+}$.
1. Alice applies CNOT from qubit $0$ to qubit $1$, then $H$ to qubit $0$.
2. Alice measures qubits $0$ and $1$, obtaining bits $m_0, m_1$, and sends them to Bob over a classical channel.
3. Bob applies $X^{m_1}$, then $Z^{m_0}$, to qubit $2$, which is then in the state $\ket\psi$.
:::

::: theorem Teleportation is correct {#thm-teleport}
For every $\ket\psi$, each of the four outcomes $(m_0, m_1)$ of [[#alg-teleport]] occurs with probability $1/4$, and after Bob's correction qubit $2$ is in the state $\ket\psi$ exactly. Alice's qubits are left in $\ket{m_0m_1}$, carrying no information about $\ket\psi$.
:::

::: proof
The initial state is
$$
\ket\psi\ket{\Phi^+} = \tfrac{1}{\sqrt2}\bigl(\alpha\ket0(\ket{00} + \ket{11}) + \beta\ket1(\ket{00} + \ket{11})\bigr).
$$
The CNOT flips qubit $1$ in the $\beta$ terms: $\tfrac{1}{\sqrt2}\bigl(\alpha\ket0(\ket{00} + \ket{11}) + \beta\ket1(\ket{10} + \ket{01})\bigr)$. Then $H$ on qubit $0$ replaces $\ket0$ by $(\ket0 + \ket1)/\sqrt2$ and $\ket1$ by $(\ket0 - \ket1)/\sqrt2$:
$$
\tfrac12\bigl(\alpha(\ket0 + \ket1)(\ket{00} + \ket{11}) + \beta(\ket0 - \ket1)(\ket{10} + \ket{01})\bigr).
$$
Grouping by the state of qubits $0$ and $1$:
$$
\tfrac12\Bigl[\ket{00}(\alpha\ket0 + \beta\ket1) + \ket{01}(\alpha\ket1 + \beta\ket0) + \ket{10}(\alpha\ket0 - \beta\ket1) + \ket{11}(\alpha\ket1 - \beta\ket0)\Bigr].
$$ {#eq-teleport}
Each bracketed qubit-2 state is a unit vector, so by [[#eq-partial]] each outcome $m_0m_1$ has probability $\abs{1/2}^2 = 1/4$, independently of $\alpha, \beta$, and leaves qubit $2$ in the state $X^{m_1}Z^{m_0}\ket\psi$: $\ket\psi$, $X\ket\psi$, $Z\ket\psi$, $XZ\ket\psi = \alpha\ket1 - \beta\ket0$ respectively. Bob's correction $Z^{m_0}X^{m_1}$ undoes it, since $X^2 = Z^2 = I$: $Z^{m_0}X^{m_1}X^{m_1}Z^{m_0}\ket\psi = \ket\psi$.
:::

Before the bits arrive, Bob's qubit is in one of four states with probability $1/4$ each; averaged over them it is maximally mixed, whatever $\ket\psi$ was (as [[quantum-computing/error-correction]] makes precise with density matrices). The original $\ket\psi$ is destroyed on Alice's side, as no-cloning demands, and nothing travelled faster than light. Notice also that teleportation never *learns* $\alpha$ or $\beta$; it works for an unknown state, and even when qubit $0$ is itself entangled with other systems, which then become entangled with Bob's qubit instead (**entanglement swapping**, in the exercises).

::: example Teleportation in the simulator {#ex-teleport-sim}
Simulate [[#alg-teleport]] on the state $\ket\psi = 0.6\ket0 + 0.8ie^{0.3i}\ket1$, with real mid-circuit measurements, and check Bob's final state.
::: solution
Qubit $0$ is the leftmost bit, so the amplitude of $\ket{100}$ is $\beta$. After measuring qubits $0$ and $1$ with outcomes $m_0, m_1$, the only non-zero amplitudes are at the indices $4m_0 + 2m_1$ and $4m_0 + 2m_1 + 1$, which hold Bob's qubit.

```python
from qsim import *

def teleport(alpha, beta, rng):
    s = [0j] * 8; s[0b000], s[0b100] = alpha, beta   # qubit 0: |psi> = alpha|0> + beta|1>
    apply(s, H, 1); apply(s, X, 2, controls=(1,))    # qubits 1 (Alice), 2 (Bob): Bell pair
    apply(s, X, 1, controls=(0,)); apply(s, H, 0)    # Alice: Bell-basis measurement...
    m0, m1 = measure(s, 0, rng), measure(s, 1, rng)  # ...of qubits 0 and 1
    if m1: apply(s, X, 2)                            # Bob's corrections, using the
    if m0: apply(s, Z, 2)                            #   two classical bits received
    base = (m0 << 2) | (m1 << 1)                     # Bob's qubit: amplitudes at base, base+1
    return (m0, m1), s[base], s[base | 1]

rng = random.Random(7)
alpha, beta = 0.6, 0.8j * cmath.exp(0.3j)           # an arbitrary normalised state
for trial in range(4):
    bits, a, b = teleport(alpha, beta, rng)
    fidelity = abs(alpha.conjugate() * a + beta.conjugate() * b) ** 2
    print(f"bits {bits}: Bob has ({a:.3f}) |0> + ({b:.3f}) |1>, fidelity {fidelity:.6f}")
```

```console
$ python3 teleport.py
bits (1, 1): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
bits (0, 1): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
bits (0, 1): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
bits (1, 0): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
```

Since $0.8ie^{0.3i} = 0.8e^{i(\pi/2 + 0.3)} \approx -0.236 + 0.764i$, Bob holds exactly $\ket\psi$ — with the same global phase, even — for every outcome, and the **fidelity** $\abs{\braket{\psi|\text{Bob}}}^2$ is $1$ to six decimal places. Deleting the line `if m0: apply(s, Z, 2)` makes the fidelity drop to $\abs{\abs\alpha^2 - \abs\beta^2}^2 = 0.0784$ whenever $m_0 = 1$.
:::
:::

::: quiz
In teleportation, suppose the classical channel is noisy and Bob receives $m_0$ correctly but $m_1$ flipped. What does Bob end up with?
- [ ] $\ket\psi$, because the bits only matter up to a global phase
- [x] $X\ket\psi$
- [ ] $Z\ket\psi$
- [ ] a random state independent of $\ket\psi$
::: solution
Bob applies $Z^{m_0}X^{1 - m_1}$ to $X^{m_1}Z^{m_0}\ket\psi$. Using $X^{1-m_1}X^{m_1} = X$ this is $Z^{m_0}XZ^{m_0}\ket\psi = \pm X\ket\psi$, since $ZXZ = -X$. Up to a global phase Bob has $X\ket\psi$ — a bit-flip error, exactly the kind of error that [[quantum-computing/error-correction]] corrects.
:::
:::

## Nonlocality: the CHSH game

Are the correlations of a Bell pair just very clever pre-arranged randomness? John Bell showed in 1964 that no such "local hidden variable" model reproduces all quantum predictions. The cleanest form is a game, due in its inequality form to Clauser, Horne, Shimony and Holt (1969).

::: definition The CHSH game {#def-chsh}
A referee sends independent uniformly random bits $x$ to Alice and $y$ to Bob. Without communicating, Alice answers a bit $a$ and Bob a bit $b$. They win if $a \oplus b = x\wedge y$: their answers must agree unless both questions are $1$, in which case they must differ. Alice and Bob may agree on a strategy and share any resources beforehand.
:::

::: theorem Classical and quantum values of CHSH {#thm-chsh}
(a) Any classical strategy — deterministic functions $a(x)$, $b(y)$, possibly chosen using shared randomness — wins with probability at most $3/4$. (b) If Alice and Bob share $\ket{\Phi^+}$, Alice measures in the basis $\{\ket{\theta}, \ket{\theta^\perp}\}$ with $\ket\theta = \cos\theta\ket0 + \sin\theta\ket1$ and $\theta = 0$ (for $x = 0$) or $\pi/4$ (for $x = 1$), and Bob with $\theta = \pi/8$ (for $y = 0$) or $-\pi/8$ (for $y = 1$), reporting $0$ for $\ket\theta$ and $1$ for $\ket{\theta^\perp}$, they win with probability $\cos^2(\pi/8) = \tfrac12 + \tfrac{\sqrt2}{4} \approx 0.854$ on every question pair.
:::

::: proof
(a) A deterministic strategy is four bits $a(0), a(1), b(0), b(1)$. Winning on all four question pairs would need $a(0)\oplus b(0) = 0$, $a(0)\oplus b(1) = 0$, $a(1)\oplus b(0) = 0$ and $a(1)\oplus b(1) = 1$. Adding all four equations mod $2$, each variable appears twice on the left, giving $0 = 1$: impossible. So at most three of the four question pairs are won, and the winning probability is at most $3/4$ (achieved by $a = b = 0$ always). A strategy using shared randomness $r$ is a mixture of deterministic strategies: its winning probability is $\sum_r\Prob(r)\,w(r) \le \max_r w(r) \le 3/4$.

(b) First a lemma: if both parties measure $\ket{\Phi^+}$ at angles $\alpha$ and $\beta$, then $\Prob(a = b) = \cos^2(\alpha - \beta)$. Indeed, with real coefficients,
$$
(\bra\alpha\otimes\bra\beta)\ket{\Phi^+} = \tfrac{1}{\sqrt2}(\cos\alpha\cos\beta + \sin\alpha\sin\beta) = \tfrac{1}{\sqrt2}\cos(\alpha - \beta),
$$
so $\Prob(0, 0) = \tfrac12\cos^2(\alpha - \beta)$. The outcome $1$ corresponds to $\ket{\theta^\perp} = \ket{\theta + \pi/2}$, so $\Prob(1, 1) = \tfrac12\cos^2\bigl((\alpha + \tfrac\pi2) - (\beta + \tfrac\pi2)\bigr)$, the same value, and $\Prob(a = b) = \cos^2(\alpha - \beta)$. Now for $(x, y) = (0, 0), (0, 1), (1, 0)$ the angle differences are $-\pi/8, \pi/8, \pi/8$ and the players need $a = b$: probability $\cos^2(\pi/8)$. For $(1, 1)$ the difference is $\pi/4 + \pi/8 = 3\pi/8$ and they need $a \ne b$: probability $1 - \cos^2(3\pi/8) = \sin^2(3\pi/8) = \cos^2(\pi/8)$.
:::

The simulator confirms the numbers by computing the joint distribution exactly. A measurement in the basis $\ket\theta$ is done by rotating with $R_y(-2\theta)$ (which, by [[quantum-computing/quantum-circuits#def-gates]], turns the amplitude plane by $-\theta$, taking $\ket\theta$ to $\ket0$) and measuring in the computational basis.

```python
from qsim import *
import itertools

def Ry(t): return [[math.cos(t/2), -math.sin(t/2)], [math.sin(t/2), math.cos(t/2)]]
alice = [0, math.pi / 4]                 # measurement angle for questions x = 0, 1
bob = [math.pi / 8, -math.pi / 8]        # and for y = 0, 1

def win_probability(x, y):
    s = zeros(2); apply(s, H, 0); apply(s, X, 1, controls=(0,))   # |Phi+>
    apply(s, Ry(-2 * alice[x]), 0)       # rotate so that a Z measurement measures
    apply(s, Ry(-2 * bob[y]), 1)         #   in the basis cos t|0> + sin t|1>, ...
    p = probs(s)                         # p[2a + b] = P(Alice a, Bob b)
    return sum(p[2*a + b] for a, b in itertools.product((0, 1), repeat=2)
               if a ^ b == x & y)

total = 0
for x, y in itertools.product((0, 1), repeat=2):
    w = win_probability(x, y); total += w / 4
    print(f"x={x} y={y}: P(win) = {w:.4f}")
print(f"quantum: {total:.4f}   cos^2(pi/8) = {math.cos(math.pi/8)**2:.4f}")

best = max(sum((a[x] ^ b[y]) == (x & y) for x in (0, 1) for y in (0, 1)) / 4
           for a in itertools.product((0, 1), repeat=2)
           for b in itertools.product((0, 1), repeat=2))
print("best deterministic classical strategy:", best)
```

```console
$ python3 chsh.py
x=0 y=0: P(win) = 0.8536
x=0 y=1: P(win) = 0.8536
x=1 y=0: P(win) = 0.8536
x=1 y=1: P(win) = 0.8536
quantum: 0.8536   cos^2(pi/8) = 0.8536
best deterministic classical strategy: 0.75
```

::: widget plot
f: cos(x)^2; sin(x)^2
x: -1.5708, 1.5708
y: 0, 1
labels: \Prob(a = b) = \cos^2(\alpha - \beta); \Prob(a \ne b)
vlines: -pi/8; pi/8; 3pi/8
hlines: 0.75
piticks: true
caption: For $\ket{\Phi^+}$ measured at real angles $\alpha$ and $\beta$, the probability that the two outcomes agree depends only on $\alpha - \beta$ (horizontal axis). The optimal CHSH strategy uses differences $\pm\pi/8$ where agreement is needed and $3\pi/8$ where disagreement is needed (vertical lines); every one of the four question pairs is then won with probability $0.854$, above the classical ceiling of $0.75$ (horizontal line).
:::

No quantum strategy does better: **Tsirelson's bound** (1980) shows $\cos^2(\pi/8)$ is the maximum over all entangled states and measurements. So the CHSH game separates three worlds — classical $3/4$, quantum $0.854$, and the value $1$ that a hypothetical "non-signalling box" could achieve — and its violation of the classical bound has been seen in experiments. Loophole-free Bell tests, closing both the locality and the detection loopholes at once, were reported in 2015 by groups in Delft, Vienna and Boulder, and the 2022 Nobel Prize in Physics went to Alain Aspect, John Clauser and Anton Zeilinger for experiments with entangled photons. In computing, CHSH-type tests certify that a device really is quantum, and they underlie **device-independent** randomness generation and key distribution.

::: application Entanglement as a network resource
Quantum networks distribute ebits rather than send qubits directly: photons are lost in fibre at about $0.2$ dB/km, and lost qubits cannot be re-sent because they cannot be copied. A **quantum repeater** creates Bell pairs over short links and joins them by entanglement swapping, then uses teleportation to move data qubits. In 2017 the Chinese satellite Micius distributed entangled photons between ground stations about $1200$ km apart and teleported photon states from the ground to orbit over distances up to about $1400$ km. Such links are experiments, not yet infrastructure, as of 2026.
:::

::: history
Einstein, Podolsky and Rosen argued in 1935 that the perfect correlations of an entangled pair showed quantum mechanics to be incomplete; Erwin Schrödinger replied the same year, coining the word *Verschränkung* (entanglement) and calling it "the characteristic trait of quantum mechanics". John Bell's 1964 theorem showed that any local hidden-variable theory obeys inequalities that quantum mechanics violates, and John Clauser, Michael Horne, Abner Shimony and Richard Holt put it in testable form in 1969; Alain Aspect's experiments of 1981–82 confirmed the violation with polarisation-entangled photons. The no-cloning theorem was published in 1982 by William Wootters and Wojciech Zurek and independently by Dennis Dieks. Charles Bennett and Stephen Wiesner proposed superdense coding in 1992, and in 1993 Bennett, Gilles Brassard, Claude Crépeau, Richard Jozsa, Asher Peres and Wootters published "Teleporting an unknown quantum state via dual classical and Einstein–Podolsky–Rosen channels". Teleportation of photon polarisation was demonstrated in 1997 in Innsbruck (Bouwmeester, Zeilinger and colleagues) and in Rome (Boschi, De Martini, Popescu and colleagues).
:::

## Where this leads

The algorithms of [[quantum-computing/first-algorithms]] create entanglement between an input register and an output register and then let it interfere; Simon's algorithm, for instance, works by measuring the output register and leaving the input in a superposition of two values. Teleportation and its generalisation, **gate teleportation**, are standard tools of fault-tolerant computing ([[quantum-computing/error-correction]]), where entangled ancillas are used to apply gates and measure syndromes without disturbing encoded data; the Pauli corrections $X^{m_1}Z^{m_0}$ are exactly the "Pauli frame" that a fault-tolerant computer tracks in software. The partial trace and density matrices, which describe one half of an entangled pair on its own, are developed there too. Hardware platforms that link separate processors by distributing ebits appear in [[quantum-computing/quantum-hardware]].

::: summary
- A state of two systems is entangled if it is not a tensor product; for two qubits, $\alpha\ket{00} + \beta\ket{01} + \gamma\ket{10} + \delta\ket{11}$ is entangled iff $\alpha\delta \ne \beta\gamma$ ([[#cor-det]]).
- Every bipartite state has a **Schmidt decomposition** $\sum_k\lambda_k\ket{u_k}\ket{v_k}$, given by the SVD of its coefficient matrix ([[#thm-schmidt]]); the four **Bell states** are maximally entangled and form a basis.
- **No-cloning** ([[#thm-no-cloning]]): no physical process copies two non-orthogonal states; a CNOT "copy" of a superposition makes an entangled state instead.
- **No signalling** ([[#prop-no-signalling]]): local operations cannot change the statistics at a distant site, so entanglement alone transmits no information.
- **Superdense coding**: one ebit plus one qubit sends two bits. **Teleportation**: one ebit plus two bits sends one unknown qubit, with each correction outcome equally likely ([[#thm-teleport]]).
- The **CHSH game** is won with probability at most $3/4$ classically and $\cos^2(\pi/8) \approx 0.854$ with a Bell pair ([[#thm-chsh]]), the maximum by Tsirelson's bound; experiments confirm the violation.
:::

## Exercises

::: exercise Entangled or not? {level=1}
Which of these states are entangled? (a) $\tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$; (b) $\tfrac12(\ket{00} + \ket{01} + \ket{10} - \ket{11})$; (c) $\tfrac{1}{\sqrt2}(\ket{01} - \ket{11})$.
::: solution
Use [[#cor-det]]. (a) $\alpha\delta - \beta\gamma = \tfrac14 - \tfrac14 = 0$: a product, namely $\ket+\ket+$. (b) $-\tfrac14 - \tfrac14 = -\tfrac12 \ne 0$: entangled (it is the result of a CZ on $\ket+\ket+$, and it equals $\tfrac{1}{\sqrt2}(\ket0\ket+ + \ket1\ket-)$). (c) $\alpha = \gamma = 0$, so $0 - 0 = 0$: a product, $\ket-\ket1$.
:::
:::

::: exercise A partial measurement {level=1 check="2/3"}
The state $\tfrac{1}{\sqrt3}(\ket{00} + \ket{01} + \ket{11})$ has qubit $1$ (the right-hand qubit) measured in the computational basis. What is the probability of the outcome $1$? (Enter a fraction.)
::: solution
The outcome $1$ on qubit $1$ occurs for the terms $\ket{01}$ and $\ket{11}$, so the probability is $\tfrac13 + \tfrac13 = \tfrac23$. Afterwards the state is $\tfrac{1}{\sqrt2}(\ket0 + \ket1)\ket1 = \ket+\ket1$.
:::
:::

::: exercise Superdense coding by hand {level=1}
In [[#alg-superdense]], which Bell state does Alice produce to send $11$? Verify that Bob's circuit maps it to $\ket{11}$.
::: solution
$Z X\otimes I$ maps $\tfrac{1}{\sqrt2}(\ket{00} + \ket{11})$ to $\tfrac{1}{\sqrt2}(Z\ket1\ket0 + Z\ket0\ket1) = \tfrac{1}{\sqrt2}(\ket{01} - \ket{10}) = \ket{\Psi^-}$. Bob's CNOT gives $\tfrac{1}{\sqrt2}(\ket{01} - \ket{11}) = \ket-\ket1$, and $H$ on qubit $0$ gives $\ket1\ket1$.
:::
:::

::: exercise Resources for teleportation {level=1 check="200"}
How many classical bits must be sent to teleport $100$ qubits, and how many ebits are consumed? (Enter the number of classical bits.)
::: solution
Each qubit needs one ebit and two classical bits: $200$ bits and $100$ ebits. By superdense coding and Holevo's bound one can show that the two bits per qubit cannot be reduced: otherwise, combining teleportation with superdense coding would transmit more than two bits per qubit sent.
:::
:::

::: exercise Schmidt coefficients {level=2 check="(3+sqrt(5))/6"}
Find the Schmidt coefficients of $\ket\psi = \tfrac{1}{\sqrt3}(\ket{00} + \ket{01} + \ket{11})$. What is $\lambda_1^2$, the square of the larger one? (Enter an exact expression.)
::: solution
The coefficient matrix is $C = \tfrac{1}{\sqrt3}\begin{pmatrix}1 & 1\\ 0 & 1\end{pmatrix}$. The squared singular values are the eigenvalues of $C^\dagger C = \tfrac13\begin{pmatrix}1 & 1\\ 1 & 2\end{pmatrix}$, whose characteristic polynomial is $\mu^2 - \mu + \tfrac19$ (trace $1$, determinant $\tfrac19(2 - 1)$). So $\mu = \tfrac12 \pm \tfrac12\sqrt{1 - 4/9} = \tfrac{3 \pm \sqrt5}{6}$. Hence $\lambda_1^2 = \tfrac{3 + \sqrt5}{6} \approx 0.873$ and $\lambda_2^2 = \tfrac{3 - \sqrt5}{6} \approx 0.127$, which add to $1$. The state is entangled, but far from maximally: its entanglement entropy is about $0.55$ ebits.
:::
:::

::: exercise The angle lemma, generally {#ex-angle level=2}
Show that if both parties measure $\ket{\Phi^+}$ in the bases $\{\ket\alpha, \ket{\alpha^\perp}\}$ and $\{\ket\beta, \ket{\beta^\perp}\}$, then each party's outcome alone is uniformly random, whatever the angles. Then show that $\ket{\Phi^+} = \tfrac{1}{\sqrt2}(\ket{\alpha}\ket{\alpha} + \ket{\alpha^\perp}\ket{\alpha^\perp})$ for every real $\alpha$.
::: solution
Alice's marginal: $\Prob(a = 0) = \Prob(0,0) + \Prob(0,1) = \tfrac12\cos^2(\alpha - \beta) + \tfrac12\cos^2(\alpha - \beta - \tfrac\pi2) = \tfrac12(\cos^2 + \sin^2) = \tfrac12$, by the lemma in the proof of [[#thm-chsh]]; similarly for Bob — as no-signalling requires, since it cannot depend on the other party's angle. For the second claim, expand with $\ket\alpha = c\ket0 + s\ket1$, $\ket{\alpha^\perp} = -s\ket0 + c\ket1$: $\ket\alpha\ket\alpha + \ket{\alpha^\perp}\ket{\alpha^\perp} = (c^2 + s^2)\ket{00} + (cs - sc)\ket{01} + (sc - cs)\ket{10} + (s^2 + c^2)\ket{11} = \ket{00} + \ket{11}$. So $\ket{\Phi^+}$ looks the same in every real rotated basis, generalising [[#ex-half-bell]]. (It is not invariant under complex rotations: in the $Y$ basis the outcomes are anti-correlated.)
:::
:::

::: exercise Cloning would allow signalling {level=2}
Suppose Bob had a device that copied any qubit state $\ket\phi$ into $\ket\phi^{\otimes k}$ for large $k$. Alice and Bob share $\ket{\Phi^+}$. Show how Alice could send Bob a bit instantly by choosing her measurement basis, contradicting [[#prop-no-signalling]].
::: solution
To send $0$, Alice measures in the $Z$ basis; to send $1$, in the $X$ basis. By [[#ex-half-bell]], Bob's qubit is then in a uniformly random one of $\ket0, \ket1$, or of $\ket+, \ket-$. Bob copies it $k$ times and measures all copies in the $Z$ basis. If Alice used $Z$, all $k$ outcomes agree. If she used $X$, they are independent fair coins and all agree with probability $2^{1-k}$. So Bob learns Alice's choice with error at most $2^{1-k}$, with no classical communication: a signal. Since no-signalling is a theorem of quantum mechanics, the cloner cannot exist — a second, physical proof of [[#thm-no-cloning]].
:::
:::

::: exercise Entanglement swapping {level=3}
Qubits $0, 1$ and qubits $2, 3$ each start in $\ket{\Phi^+}$. A Bell measurement (CNOT $1\to2$, $H$ on $1$, measure $1$ and $2$) is made on qubits $1$ and $2$, with corrections $X^{m_2}$ then $Z^{m_1}$ applied to qubit $3$. Show that qubits $0$ and $3$, which never interacted, end in $\ket{\Phi^+}$. Check with the simulator.
::: solution
Teleportation is linear in the input state, so it works on half of an entangled pair: treat qubit $1$ as the input, teleported via the pair $(2, 3)$ to qubit $3$. Writing $\ket{\Phi^+}_{01} = \tfrac{1}{\sqrt2}(\ket0_0\ket0_1 + \ket1_0\ket1_1)$, teleporting qubit $1$ takes each term $\ket j_0\ket j_1$ to $\ket j_0\ket j_3$ — with the same corrections for both terms, because by [[#eq-teleport]] the outcome probabilities and corrections do not depend on the input state — so the result is $\tfrac{1}{\sqrt2}(\ket0_0\ket0_3 + \ket1_0\ket1_3)$.

```python
from qsim import *

rng = random.Random(3)
for trial in range(3):
    s = zeros(4)
    for a, b in ((0, 1), (2, 3)):                      # Bell pairs (0,1) and (2,3)
        apply(s, H, a); apply(s, X, b, controls=(a,))
    apply(s, X, 2, controls=(1,)); apply(s, H, 1)      # Bell measurement on 1 and 2
    m1, m2 = measure(s, 1, rng), measure(s, 2, rng)
    if m2: apply(s, X, 3)                              # corrections on qubit 3
    if m1: apply(s, Z, 3)
    print(f"outcomes {m1}{m2}; state of all four qubits:"); show(s)
```

```console
$ python3 swapping.py
outcomes 10; state of all four qubits:
+0.7071 |0100>
+0.7071 |1101>
outcomes 10; state of all four qubits:
+0.7071 |0100>
+0.7071 |1101>
outcomes 01; state of all four qubits:
+0.7071 |0010>
+0.7071 |1011>
```

In each run qubits $1$ and $2$ hold the measured bits, and qubits $0$ and $3$ (first and last bits) are $\tfrac{1}{\sqrt2}(\ket{0\cdot\cdot0} + \ket{1\cdot\cdot1})$: the state $\ket{\Phi^+}$.
:::
:::

::: exercise The classical CHSH value, by symmetry {level=3}
(a) What is the winning probability if Alice and Bob answer independent uniformly random bits? (b) Prove the classical bound $3/4$ in the "$\pm1$" form: with $A_x = (-1)^{a(x)}$ and $B_y = (-1)^{b(y)}$, show $S = A_0B_0 + A_0B_1 + A_1B_0 - A_1B_1 \in \{-2, 2\}$, and relate the expectation of $S$ to the winning probability. (c) What value of $\E[S]$ does the quantum strategy reach?
::: solution
(a) $a \oplus b$ is then a uniform bit independent of $x \wedge y$, so they win with probability $1/2$. (b) $S = A_0(B_0 + B_1) + A_1(B_0 - B_1)$. Since $B_0, B_1 = \pm1$, one of $B_0 + B_1$ and $B_0 - B_1$ is $0$ and the other $\pm2$; so $S = \pm2$. A term $A_xB_y$ is $+1$ exactly when $a \oplus b = 0$, so with the sign flipped for $(1,1)$, each of the four terms equals $+1$ when that question pair is won and $-1$ when lost. Averaging over uniform $(x, y)$, $\tfrac14\E[S] = \Prob(\text{win}) - \Prob(\text{lose}) = 2\Prob(\text{win}) - 1$. Since $\abs S \le 2$ for every deterministic strategy, and mixtures over shared randomness keep $\abs{\E[S]} \le 2$ — the **CHSH inequality** — we get $2\Prob(\text{win}) - 1 \le 2/4$, i.e. $\Prob(\text{win}) \le 3/4$. (c) Quantumly $\Prob(\text{win}) = \cos^2(\pi/8)$, so $\E[S] = 4(2\cos^2(\pi/8) - 1) = 4\cos(\pi/4) = 2\sqrt2 \approx 2.83$, Tsirelson's bound.
:::
:::
