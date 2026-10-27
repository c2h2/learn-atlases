Shor's algorithm exploits a very special structure — periodicity — that most problems do not have. What can a quantum computer do for a problem with no structure at all? The cleanest such problem is **unstructured search**: among $N$ items, one (or a few) is "marked", and the only way to learn anything is to ask, for a given item, whether it is marked. Classically there is nothing better than checking items one by one, which takes about $N/2$ checks on average and $N$ in the worst case. In 1996 Lov Grover found a quantum algorithm that finds the marked item with high probability using only about $\tfrac\pi4\sqrt N$ queries. And within a year it was shown that this is optimal: no quantum algorithm can search an unstructured space with fewer than order $\sqrt N$ queries.

The speed-up is "only" quadratic, but it is remarkably general: any problem where a solution can be recognised efficiently — every problem in $\mathsf{NP}$, every key search, every constraint-satisfaction problem — gets a quadratic speed-up over brute force. This chapter derives Grover's algorithm from a single geometric fact (two reflections make a rotation), analyses it exactly, handles an unknown number of solutions, generalises it to **amplitude amplification**, which speeds up any probabilistic algorithm, and proves the **BBBV lower bound** that shows the square root cannot be beaten. The oracle notation and phase kickback are those of [[quantum-computing/first-algorithms]].

## The search problem

::: definition Unstructured search {#def-search}
Let $N = 2^n$ and $f\colon\{0, 1, \dots, N-1\}\to\{0, 1\}$, accessible only through the phase oracle $O_f\ket x = (-1)^{f(x)}\ket x$ (obtained from $U_f$ by phase kickback, [[quantum-computing/first-algorithms#lem-kickback]]). The items with $f(x) = 1$ are **marked**, or **solutions**; let $M$ be their number, $1\le M < N$. The task is to output a marked item.
:::

A classical algorithm that queries distinct items in random order needs $(N + 1)/(M + 1)$ queries on average to find a solution, and any classical algorithm needs $\Omega(N/M)$ queries to succeed with probability $1/2$ (for $M = 1$: after $q$ queries, a random marked item has been seen with probability at most $q/N$, plus a guess among the rest). Grover's algorithm uses two reflections. Let
$$
\ket s = H^{\otimes n}\ket{0^n} = \frac{1}{\sqrt N}\sum_{x=0}^{N-1}\ket x
$$
be the uniform superposition, and define the **diffusion operator**
$$
D = 2\ket s\!\bra s - I = H^{\otimes n}\bigl(2\ket{0^n}\!\bra{0^n} - I\bigr)H^{\otimes n}.
$$ {#eq-diffusion}
The second form shows how to build it: $2\ket{0^n}\!\bra{0^n} - I$ multiplies every basis state except $\ket{0^n}$ by $-1$, which is a multiply-controlled $Z$ (with $X$ gates around it) up to a global sign, costing $O(n)$ elementary gates with one ancilla. On amplitudes, $D$ is **inversion about the mean**: if $\ket\psi = \sum_x\alpha_x\ket x$ and $\bar\alpha = \frac1N\sum_x\alpha_x$, then $D\ket\psi = \sum_x(2\bar\alpha - \alpha_x)\ket x$, because $\braket{s|\psi} = \sqrt N\bar\alpha$.

::: algorithm Grover's algorithm {#alg-grover}
Input: the phase oracle $O_f$ on $n$ qubits; the number $M$ of solutions (see below if it is unknown).
1. Prepare $\ket s = H^{\otimes n}\ket{0^n}$.
2. Repeat $k = \lfloor\pi/(4\theta)\rfloor$ times, where $\sin\theta = \sqrt{M/N}$: apply the **Grover iteration** $G = D\,O_f$.
3. Measure in the computational basis and output the result $x$ (checking $f(x) = 1$ with one more query, if desired).
:::

Each iteration uses one query. Before analysing it, here is the smallest case, which is exact.

::: example Searching four items {#ex-grover-4}
Let $N = 4$ with the single marked item $x = 2$ ($\ket{10}$). Apply one Grover iteration to $\ket s$ and measure.
::: solution
$\ket s = \tfrac12(\ket0 + \ket1 + \ket2 + \ket3)$, all amplitudes $\tfrac12$. The oracle flips the marked amplitude: $(\tfrac12, \tfrac12, -\tfrac12, \tfrac12)$. The mean is $\bar\alpha = \tfrac14(\tfrac12\cdot 3 - \tfrac12) = \tfrac14$, and inversion about the mean gives $2\bar\alpha - \alpha_x$: $(0, 0, 1, 0)$. One query finds the marked item with certainty, whereas a classical algorithm needs $2.25$ queries on average (with the fourth item known by elimination: $1\cdot\tfrac14 + 2\cdot\tfrac14 + 3\cdot\tfrac12 = 2.25$). Here $\sin\theta = \tfrac12$, $\theta = \pi/6$, and after one iteration the amplitude is $\sin 3\theta = \sin(\pi/2) = 1$, as the next theorem predicts.
:::
:::

## Two reflections make a rotation

Split the uniform superposition into its marked and unmarked parts. Let
$$
\ket\beta = \frac{1}{\sqrt M}\sum_{f(x) = 1}\ket x, \qquad \ket\alpha = \frac{1}{\sqrt{N - M}}\sum_{f(x) = 0}\ket x ,
$$
orthonormal states, the normalised "good" and "bad" parts. Then
$$
\ket s = \cos\theta\,\ket\alpha + \sin\theta\,\ket\beta, \qquad \sin\theta = \sqrt{M/N}, \quad 0 < \theta \le \tfrac\pi2 .
$$ {#eq-s-split}
In the real plane spanned by $\ket\alpha$ and $\ket\beta$, the oracle $O_f$ maps $\ket\alpha\mapsto\ket\alpha$ and $\ket\beta\mapsto-\ket\beta$: it is the **reflection in the line through $\ket\alpha$**. The diffusion $D = 2\ket s\!\bra s - I$ fixes $\ket s$ and negates the vector orthogonal to it in the plane: it is the **reflection in the line through $\ket s$**. Both map the plane to itself, so the whole algorithm takes place in two real dimensions.

::: lemma Product of two reflections {#lem-reflections}
In $\R^2$, let $R_\ell$ denote reflection in a line $\ell$ through the origin. If $\ell_2$ makes angle $\theta$ with $\ell_1$ (measured anticlockwise), then $R_{\ell_2}R_{\ell_1}$ is the rotation by $2\theta$.
:::

::: proof
The reflection in the line at angle $\phi$ to the $x$ axis has matrix $\begin{pmatrix}\cos2\phi & \sin2\phi\\ \sin2\phi & -\cos2\phi\end{pmatrix}$. For lines at angles $\phi_1$ and $\phi_2 = \phi_1 + \theta$, multiplying gives
$$
\begin{pmatrix}\cos2\phi_2 & \sin2\phi_2\\ \sin2\phi_2 & -\cos2\phi_2\end{pmatrix}\begin{pmatrix}\cos2\phi_1 & \sin2\phi_1\\ \sin2\phi_1 & -\cos2\phi_1\end{pmatrix} = \begin{pmatrix}\cos2(\phi_2 - \phi_1) & -\sin2(\phi_2 - \phi_1)\\ \sin2(\phi_2 - \phi_1) & \cos2(\phi_2 - \phi_1)\end{pmatrix},
$$
by the angle-difference formulas; this is the rotation by $2(\phi_2 - \phi_1) = 2\theta$.
:::

::: theorem Grover's algorithm {#thm-grover}
After $k$ Grover iterations the state is
$$
G^k\ket s = \cos\bigl((2k+1)\theta\bigr)\ket\alpha + \sin\bigl((2k+1)\theta\bigr)\ket\beta ,
$$ {#eq-grover-state}
so a measurement gives a marked item with probability $\sin^2((2k+1)\theta)$. With $k = \lfloor\pi/(4\theta)\rfloor$ this probability is at least $1 - M/N$, and $k \le \frac\pi4\sqrt{N/M}$.
:::

::: proof
In the $(\ket\alpha, \ket\beta)$ plane, $O_f$ is the reflection in the line of $\ket\alpha$ (angle $0$) and $D$ the reflection in the line of $\ket s$ (angle $\theta$, by [[#eq-s-split]]). By [[#lem-reflections]], $G = DO_f$ is the rotation by $2\theta$. Starting from $\ket s$ at angle $\theta$, $k$ rotations reach angle $(2k + 1)\theta$, which is [[#eq-grover-state]].

For the bound, let $\tilde k = \pi/(4\theta) - \tfrac12$ be the real number with $(2\tilde k + 1)\theta = \pi/2$, and $k = \lfloor\pi/(4\theta)\rfloor$, so $\abs{k - \tilde k}\le\tfrac12$. Then the final angle $(2k+1)\theta$ differs from $\pi/2$ by at most $\theta$, so the failure probability is $\cos^2((2k+1)\theta)\le\sin^2\theta = M/N$. Finally $\theta\ge\sin\theta = \sqrt{M/N}$ gives $k\le\pi/(4\theta)\le\frac\pi4\sqrt{N/M}$.
:::

The figure shows the rotation. The plane's horizontal axis is $\ket\alpha$ and the vertical axis $\ket\beta$; the vector starts at $\ket s$, just above the horizontal axis, and each application of $G$ turns it by $2\theta$ towards $\ket\beta$.

::: widget transform2d
matrix: 0.875, -0.4841; 0.4841, 0.875
vector: 0.9682, 0.25
range: 1.2
editable: false
caption: The Grover iteration $G$ for $N = 16$, $M = 1$, as a $2\times2$ matrix acting on the plane spanned by $\ket\alpha$ (horizontal) and $\ket\beta$ (vertical). Here $\sin\theta = 1/4$, so $G$ rotates by $2\theta \approx 0.505$ radians ($29°$), and the vector is $\ket s = (\cos\theta, \sin\theta) \approx (0.968, 0.25)$. Three rotations bring the vector to angle $7\theta \approx 101°$, just past the vertical: success probability $\sin^2 7\theta \approx 0.96$. The determinant is $1$ — a rotation, though each of its two factors is a reflection.
:::

::: example Grover search in the simulator {#ex-grover-sim}
Simulate Grover's algorithm for $N = 64$ with one marked item and compare the success probability after each iteration with [[#eq-grover-state]].
::: solution
The oracle flips the sign of the marked amplitude; the diffusion uses [[#eq-diffusion]].

```python
from qsim import *

def grover_iteration(s, marked, n):
    for i in marked: s[i] = -s[i]                 # oracle O_f: flip the sign of marked items
    for q in range(n): apply(s, H, q)             # diffusion D = H^n (2|0><0| - I) H^n
    s[1:] = [-a for a in s[1:]]                   #   (2|0><0| - I): flip all but |0...0>
    for q in range(n): apply(s, H, q)

def grover(n, marked, iterations):
    s = zeros(n)
    for q in range(n): apply(s, H, q)             # uniform superposition |s>
    history = []
    for k in range(iterations + 1):
        history.append(sum(abs(s[i]) ** 2 for i in marked))
        if k < iterations: grover_iteration(s, marked, n)
    return history

n, marked = 6, {42}                               # N = 64, one marked item
theta = math.asin(math.sqrt(len(marked) / 2 ** n))
print(f"N = {2**n}, M = {len(marked)}, theta = {theta:.4f}, "
      f"optimal k = floor(pi/(4 theta)) = {math.floor(math.pi / (4 * theta))}")
for k, p in enumerate(grover(n, marked, 12)):
    print(f"k = {k:2}: P(marked) = {p:.4f}   sin^2((2k+1)theta) = {math.sin((2*k+1)*theta)**2:.4f}")
```

```console
$ python3 grover.py
N = 64, M = 1, theta = 0.1253, optimal k = floor(pi/(4 theta)) = 6
k =  0: P(marked) = 0.0156   sin^2((2k+1)theta) = 0.0156
k =  1: P(marked) = 0.1348   sin^2((2k+1)theta) = 0.1348
k =  2: P(marked) = 0.3439   sin^2((2k+1)theta) = 0.3439
k =  3: P(marked) = 0.5914   sin^2((2k+1)theta) = 0.5914
k =  4: P(marked) = 0.8164   sin^2((2k+1)theta) = 0.8164
k =  5: P(marked) = 0.9635   sin^2((2k+1)theta) = 0.9635
k =  6: P(marked) = 0.9966   sin^2((2k+1)theta) = 0.9966
k =  7: P(marked) = 0.9074   sin^2((2k+1)theta) = 0.9074
k =  8: P(marked) = 0.7180   sin^2((2k+1)theta) = 0.7180
k =  9: P(marked) = 0.4750   sin^2((2k+1)theta) = 0.4750
k = 10: P(marked) = 0.2381   sin^2((2k+1)theta) = 0.2381
k = 11: P(marked) = 0.0656   sin^2((2k+1)theta) = 0.0656
k = 12: P(marked) = 0.0001   sin^2((2k+1)theta) = 0.0001
```

Simulation and formula agree to four decimals. After $k = 6$ queries the marked item is found with probability $0.9966$; a classical search needs $32.5$ queries on average. After the optimum the probability falls again: at $k = 12$, about twice the optimum, the state has rotated almost all the way to $-\ket\alpha$ and the marked item is almost never seen.
:::
:::

::: widget plot
f: sin((2*x + 1)*asin(sqrt(m/N)))^2
x: 0, 30
y: 0, 1
sliders: N=256:16:4096:16; m=1:1:16:1
labels: \sin^2((2k+1)\theta)
caption: Success probability after $k$ Grover iterations (horizontal axis, read at integers) for $N$ items of which $m$ are marked. The first peak is at $k \approx \frac\pi4\sqrt{N/m}$: quadrupling $N$ doubles it. The probability is periodic in $k$, so iterating "a bit more to be safe" can be disastrous; and with $m = N/4$ (try $N = 16$, $m = 4$) one iteration succeeds exactly.
:::

::: warning Grover's algorithm is not "more iterations, more success"
Classical randomised search only improves with more trials. Grover's success probability oscillates: it is $\sin^2((2k+1)\theta)$, which returns to nearly $0$ after about $\frac\pi2\sqrt{N/M}$ iterations. Running the algorithm with the wrong $M$ — for instance with $M = 1$ when there are in fact $4$ solutions — can therefore overshoot badly: the optimal $k$ for $M = 1$ makes the angle about $2\cdot\frac\pi2 = \pi$ when $M = 4$, and the success probability nearly $0$. When $M$ is unknown, use the randomised schedule of the next section, or estimate $M$ first by quantum counting.
:::

::: quiz
A database has $N = 1024$ entries of which exactly $M = 256$ are marked. How many Grover iterations give the highest success probability, and what is it?
- [ ] $25$ iterations, probability about $1$
- [ ] $0$ iterations: just measure $\ket s$, probability $1/4$
- [x] $1$ iteration, probability $1$
- [ ] $2$ iterations, probability $1$
::: solution
$\sin\theta = \sqrt{256/1024} = 1/2$, so $\theta = \pi/6$ and after one iteration the angle is $3\theta = \pi/2$: success with certainty. This is the four-item example of [[#ex-grover-4]] scaled up; whenever $M = N/4$ one iteration is exact. Two iterations would give $\sin^2(5\pi/6) = 1/4$, no better than guessing.
:::
:::

::: example Grover search for a satisfying assignment {#ex-grover-sat}
Find a satisfying assignment of $\phi = (x_1\vee x_2)\wedge(\neg x_1\vee x_3)\wedge(\neg x_2\vee\neg x_3)$ with Grover's algorithm: build the oracle, choose the number of iterations, and give the success probability.
::: solution
*The oracle.* By [[quantum-computing/quantum-circuits#thm-oracle]], compute each clause into an ancilla (an OR is a Toffoli with $X$ gates on its inputs and output, since $a\vee b = \neg(\neg a\wedge\neg b)$), compute the AND of the three clause bits into a target qubit in state $\ket-$ with two more Toffolis and an ancilla, and then uncompute the clause ancillas. Phase kickback ([[quantum-computing/first-algorithms#lem-kickback]]) turns this into $O_f\ket x = (-1)^{\phi(x)}\ket x$ on the three variable qubits, at a cost of about ten Toffoli gates and five ancillas.

*The count.* Checking the eight assignments, $\phi$ is satisfied exactly by $(x_1, x_2, x_3) = (0, 1, 0)$ and $(1, 0, 1)$, so $M = 2$ and $N = 8$. Then $\sin\theta = \sqrt{2/8} = \tfrac12$, $\theta = \pi/6$, and $k = \lfloor\pi/(4\theta)\rfloor = \lfloor 1.5\rfloor = 1$. After one iteration the success probability is $\sin^2(3\theta) = 1$: the measurement returns one of the two solutions, each with probability $1/2$ (they have equal amplitudes, by symmetry of [[#eq-grover-state]]).

*In general.* For a formula with $m$ variables and an unknown number of solutions, exponential search finds one with $O(\sqrt{2^m/M})$ oracle calls, each a polynomial-size circuit. For hard instances with few solutions that is about $2^{m/2}$ — a square-root speed-up over brute force, but still exponential, and classical SAT solvers that exploit structure are often far faster than brute force on real instances.
:::
:::

### Cost in gates

Each iteration costs one oracle call plus the diffusion, which is $2n$ Hadamards and a multiply-controlled $Z$ on $n$ qubits — $O(n)$ gates. So Grover's algorithm runs in $O(\sqrt N\,(T_f + \log N))$ time, where $T_f$ is the gate cost of the oracle. For a search over the $2^m$ assignments of an $\mathsf{NP}$ problem's witness, checked by a polynomial-size circuit, this is $2^{m/2}\operatorname{poly}(m)$, against $2^m\operatorname{poly}(m)$ for brute force — a quadratic speed-up of exhaustive search, not a polynomial-time algorithm.

## Unknown numbers of solutions and quantum counting

[[#alg-grover]] needs $\theta$, hence $M$. Two methods remove that requirement.

**Exponential search** (Boyer, Brassard, Høyer and Tapp, 1998). Start with $m = 1$; repeatedly choose $j$ uniformly from $\{0, \dots, \lceil m\rceil - 1\}$, run $j$ Grover iterations from $\ket s$ and measure; if the result is marked, stop; otherwise multiply $m$ by $\lambda = 6/5$ (capping it at $\sqrt N$). The key fact is an averaging lemma: for $j$ uniform in $\{0, \dots, m - 1\}$ with $m\ge 1/\sin(2\theta)$, the average success probability $\frac1m\sum_j\sin^2((2j+1)\theta)$ is at least $1/4$. Before $m$ reaches $1/\sin 2\theta = O(\sqrt{N/M})$ the costs grow geometrically, so they sum to $O(\sqrt{N/M})$; afterwards each round succeeds with probability at least $1/4$. The expected total number of queries is $O(\sqrt{N/M})$ without knowing $M$, and if there are no solutions the algorithm can stop after $O(\sqrt N)$ queries and report "none" (with one-sided error).

**Quantum counting** (Brassard, Høyer and Tapp, 1998). The Grover iteration $G$ is a rotation by $2\theta$ in the $(\ket\alpha, \ket\beta)$ plane, so on that plane it has eigenvalues $e^{\pm2i\theta}$, and $\ket s$ is a superposition of the two eigenvectors. Phase estimation ([[quantum-computing/shor#alg-pe]]) applied to $G$ with $\ket s$ as input therefore estimates $\theta$, and hence $M = N\sin^2\theta$: with $t$ counting qubits, that is $2^t$ applications of $G$, the error in $\theta$ is $O(2^{-t})$ and the error in $M$ is $O(\sqrt{MN}\,2^{-t} + N2^{-2t})$. Counting combines the two main tools of the course, Shor's and Grover's.

## Amplitude amplification

Nothing in [[#thm-grover]] used the fact that $\ket s$ was the uniform superposition. Any quantum algorithm that succeeds with small probability can be boosted the same way.

::: theorem Amplitude amplification {#thm-aa}
Let $\mathcal A$ be a quantum circuit without measurements, let $\chi\colon\{0,1\}^n\to\{0,1\}$ mark the "good" outcomes, and suppose that measuring $\mathcal A\ket{0^n}$ gives a good outcome with probability $p = \sin^2\theta > 0$. Let $S_\chi$ be the phase oracle of $\chi$ and $S_0 = I - 2\ket{0^n}\!\bra{0^n}$, and put
$$
Q = -\mathcal A\,S_0\,\mathcal A^{-1}S_\chi .
$$
Then after $k$ applications of $Q$ to $\mathcal A\ket{0^n}$, a measurement gives a good outcome with probability $\sin^2((2k+1)\theta)$. With $k = \lfloor\pi/(4\theta)\rfloor = O(1/\sqrt p)$ applications — each using $\mathcal A$ and $\mathcal A^{-1}$ once — the success probability is at least $1 - p$.
:::

::: proof
Write $\ket\psi = \mathcal A\ket{0^n} = \cos\theta\ket{\psi_0} + \sin\theta\ket{\psi_1}$, where $\ket{\psi_1}$ and $\ket{\psi_0}$ are the normalised projections of $\ket\psi$ onto the span of good and of bad basis states. $S_\chi$ is the reflection in $\ket{\psi_0}$ within the plane spanned by $\ket{\psi_0}, \ket{\psi_1}$. And $-\mathcal AS_0\mathcal A^{-1} = \mathcal A(2\ket{0^n}\!\bra{0^n} - I)\mathcal A^{-1} = 2\ket\psi\!\bra\psi - I$ is the reflection in $\ket\psi$. Both preserve the plane; the rest of the proof of [[#thm-grover]] applies word for word, with $\ket\alpha, \ket\beta, \ket s$ replaced by $\ket{\psi_0}, \ket{\psi_1}, \ket\psi$.
:::

Grover's algorithm is the case $\mathcal A = H^{\otimes n}$, where $Q = -H^{\otimes n}S_0H^{\otimes n}O_f = DO_f$. Classically, an algorithm with success probability $p$ must be repeated about $1/p$ times; amplitude amplification needs about $1/\sqrt p$ runs of $\mathcal A$, *provided* $\mathcal A$ is a quantum circuit whose inverse we can run and success is recognisable.

::: example Amplifying a weak algorithm {#ex-aa}
A quantum circuit $\mathcal A$ outputs a correct answer, recognisable by a fast check, with probability $p = 0.01$. Compare the number of runs needed classically and with amplitude amplification to succeed with probability above $0.99$.
::: solution
Classically, $k$ independent repetitions succeed with probability $1 - 0.99^k$, which exceeds $0.99$ once $k\ge\ln(0.01)/\ln(0.99)\approx 458.2$, i.e. $459$ runs. With amplitude amplification, $\sin\theta = 0.1$ gives $\theta\approx0.10017$, $k = \lfloor\pi/(4\theta)\rfloor = 7$ applications of $Q$, and success probability $\sin^2(15\theta)\approx\sin^2(1.5025)\approx 0.9953$. Each application of $Q$ runs $\mathcal A$ once and $\mathcal A^{-1}$ once, and preparing the start state runs $\mathcal A$ once more, so the cost is $15$ runs of $\mathcal A$ or its inverse — about $30$ times fewer.
:::
:::

## Grover is optimal

Could a cleverer quantum algorithm search faster, perhaps in $O(\log N)$ queries, which would put $\mathsf{NP}$ inside $\mathsf{BQP}$ relative to an oracle? Bennett, Bernstein, Brassard and Vazirani proved in 1997 — before Grover's paper had even appeared in print — that it cannot.

::: theorem BBBV lower bound {#thm-bbbv}
Let $\mathcal B$ be any quantum algorithm that makes $T$ queries to a phase oracle $O_x$ for an unknown $x\in\{0, \dots, N - 1\}$ (with $O_x\ket y = -\ket y$ for $y = x$ and $\ket y$ otherwise, acting on a query register, possibly with workspace). If $\mathcal B$ outputs $x$ with probability at least $1/2$ for every $x$, then $T = \Omega(\sqrt N)$; precisely, $T\ge\frac{\sqrt N}{8\sqrt2}\bigl(1 - \frac4N\bigr)$.
:::

::: proof
Write the algorithm as $U_TO\,U_{T-1}O\cdots U_1O\,U_0\ket0$ with fixed unitaries $U_t$ and oracle $O$. Let $\ket{\psi_t}$ be the state after $U_t$ (just before query $t + 1$; so $\ket{\psi_0} = U_0\ket0$ and $\ket{\psi_T}$ is the final state) when the oracle is the identity (no marked item), and $\ket{\psi^x_t}$ the corresponding state when the oracle is $O_x$. Let $a_{t,y}$ be the norm of the part of $\ket{\psi_t}$ in which the query register holds $y$; then $\sum_ya_{t,y}^2 = 1$.

*Step 1: the states move apart slowly.* We have $\ket{\psi^x_{t+1}} - \ket{\psi_{t+1}} = U_{t+1}\bigl(O_x\ket{\psi^x_t} - \ket{\psi_t}\bigr) = U_{t+1}\bigl(O_x(\ket{\psi^x_t} - \ket{\psi_t}) + (O_x - I)\ket{\psi_t}\bigr)$. $O_x - I$ multiplies the part of $\ket{\psi_t}$ with query register $x$ by $-2$ and kills the rest, so $\norm{(O_x - I)\psi_t} = 2a_{t,x}$. Unitaries preserve norms, so $\norm{\psi^x_{t+1} - \psi_{t+1}}\le\norm{\psi^x_t - \psi_t} + 2a_{t,x}$, and by induction from $\psi^x_0 = \psi_0$,
$$
\norm{\psi^x_T - \psi_T}\le 2\sum_{t=0}^{T-1}a_{t,x}.
$$
Squaring and using Cauchy–Schwarz, $\norm{\psi^x_T - \psi_T}^2\le 4T\sum_ta_{t,x}^2$. Summing over $x$ and using $\sum_xa_{t,x}^2 = 1$:
$$
\sum_x\norm{\psi^x_T - \psi_T}^2\le 4T^2 .
$$ {#eq-bbbv-upper}

*Step 2: success forces the states far apart.* The final measurement outputs $x$ from $\ket{\psi_T}$ with some probability $q_x$, and $\sum_xq_x = 1$, so at least $N/2$ values of $x$ have $q_x\le 2/N$. For each such $x$, the output probabilities on the unit vectors $\ket{\psi^x_T}$ and $\ket{\psi_T}$ are $\ge\tfrac12$ and $\le\tfrac2N$. For any projector $P$ and unit vectors $u, v$, $\abs{\norm{Pu}^2 - \norm{Pv}^2} = (\norm{Pu} + \norm{Pv})\,\abs{\norm{Pu} - \norm{Pv}}\le 2\norm{u - v}$. So $\norm{\psi^x_T - \psi_T}\ge\tfrac12(\tfrac12 - \tfrac2N)$ for at least $N/2$ values of $x$, and
$$
\sum_x\norm{\psi^x_T - \psi_T}^2\ge\frac N2\cdot\frac{1}{16}\Bigl(1 - \frac4N\Bigr)^2 .
$$
Combining with [[#eq-bbbv-upper]], $4T^2\ge\frac{N}{32}(1 - \frac4N)^2$, i.e. $T\ge\frac{\sqrt N}{8\sqrt2}(1 - \frac4N)$.
:::

The constant is far from tight; Zalka (1999) showed that Grover's $\frac\pi4\sqrt N$ queries are exactly optimal for success probability near $1$, and more refined techniques — the **polynomial method** of Beals, Buhrman, Cleve, Mosca and de Wolf (1998) and Ambainis's **adversary method** (2000) — give tight lower bounds for many other problems. The theorem has two important consequences. First, an algorithm that treats an $\mathsf{NP}$ problem as a black-box search over $2^m$ candidates needs $\Omega(2^{m/2})$ queries: any polynomial-time quantum algorithm for $\mathsf{NP}$-complete problems would have to exploit their structure. Second, relative to a random oracle, $\mathsf{NP}\not\subseteq\mathsf{BQP}$ ([[quantum-computing/quantum-complexity]]).

::: warning Grover does not halve key lengths in practice
A quadratic speed-up in queries is often summarised as "AES-128 has only 64-bit security against quantum computers". That ignores three things. The oracle is a full reversible AES circuit run inside an error-corrected machine, each "query" costing many thousands of logical gates; the $2^{64}$ iterations are **sequential**, so splitting the search over $P$ machines reduces the time only by $\sqrt P$ (each machine searches $N/P$ keys in $\sqrt{N/P}$ steps, and this is optimal by a parallel version of [[#thm-bbbv]] due to Zalka); and searching a classical database requires loading it into superposition (a "QRAM"), which costs at least order $N$ resources to build. As of 2026, the consensus summarised in [[cryptography/post-quantum]] is that AES-128 remains adequate for most purposes and AES-256 gives a large margin.
:::

::: history
Lov Grover presented "A fast quantum mechanical algorithm for database search" at STOC in May 1996 and published "Quantum mechanics helps in searching for a needle in a haystack" in *Physical Review Letters* in 1997. Charles Bennett, Ethan Bernstein, Gilles Brassard and Umesh Vazirani's "Strengths and weaknesses of quantum computing", which contains the $\Omega(\sqrt N)$ lower bound, was written in 1994 — before Grover's algorithm — and published in the *SIAM Journal on Computing* in 1997, the same issue as Shor's paper. Michel Boyer, Gilles Brassard, Peter Høyer and Alain Tapp analysed Grover's algorithm with unknown numbers of solutions in 1996 (journal version 1998), and Brassard, Høyer, Michele Mosca and Tapp gave the general framework of amplitude amplification and estimation in 2002 (based on work from 1997–98). Christof Zalka proved exact optimality in 1999.
:::

## Where this leads

Amplitude amplification is a subroutine in many later algorithms: quadratic speed-ups for counting, for minimum finding (Dürr and Høyer, 1996), for collision finding (Brassard–Høyer–Tapp, $O(N^{1/3})$ queries) and element distinctness (Ambainis's quantum walk, $O(N^{2/3})$), and for Monte Carlo estimation, where it gives error $1/k$ after $k$ samples instead of $1/\sqrt k$. [[quantum-computing/quantum-complexity]] places the BBBV theorem among the oracle results about $\mathsf{BQP}$ and discusses why it suggests that $\mathsf{NP}\not\subseteq\mathsf{BQP}$. The engineering side — why a quadratic speed-up may be cancelled by the overheads of error correction for realistic problem sizes — is taken up in [[quantum-computing/quantum-hardware]].

::: summary
- **Unstructured search** among $N$ items with $M$ marked needs $\Theta(N/M)$ classical queries; Grover's algorithm needs $O(\sqrt{N/M})$.
- The Grover iteration $G = DO_f$ is a product of two reflections — in the bad states and in $\ket s$ — hence a rotation by $2\theta$ with $\sin\theta = \sqrt{M/N}$ ([[#lem-reflections]]).
- After $k$ iterations the success probability is $\sin^2((2k+1)\theta)$ ([[#thm-grover]]); $k = \lfloor\pi/(4\theta)\rfloor\approx\frac\pi4\sqrt{N/M}$ gives at least $1 - M/N$. The probability oscillates, so overshooting is harmful.
- Unknown $M$: exponential search with random iteration counts still uses $O(\sqrt{N/M})$ queries; quantum counting estimates $M$ by phase estimation of $G$.
- **Amplitude amplification** ([[#thm-aa]]) boosts any quantum algorithm with success probability $p$ to near certainty with $O(1/\sqrt p)$ runs of it and its inverse.
- **BBBV** ([[#thm-bbbv]]): every quantum search algorithm needs $\Omega(\sqrt N)$ queries; black-box methods give only quadratic speed-ups for $\mathsf{NP}$ problems.
:::

## Exercises

::: exercise Iterations for a million items {level=1 check="804"}
How many Grover iterations does [[#alg-grover]] use for $N = 2^{20}$ items with one marked item? (Enter a number.)
::: solution
$\theta = \arcsin(2^{-10})\approx 9.765\,6\times10^{-4}$, so $\pi/(4\theta)\approx 804.25$ and $k = 804$; the success probability is $\sin^2(1609\theta)\approx 0.9999998$. A classical search needs about $524\,288$ queries on average.
:::
:::

::: exercise Eight items {level=1 check="sin(5*asin(1/sqrt(8)))^2"}
For $N = 8$ and one marked item, what is the success probability after the optimal number of iterations? (Enter an exact expression or a decimal.)
::: solution
$\sin\theta = 1/\sqrt8$, so $\theta\approx0.3614$ and $\pi/(4\theta)\approx2.17$: $k = 2$. The probability is $\sin^2(5\theta) = \sin^2(5\arcsin(1/\sqrt8))\approx 0.9453$. (Exactly: the amplitudes after two iterations are $11/(8\sqrt2)$ for the marked item, and $121/128 = 0.9453125$.)
:::
:::

::: exercise Inversion about the mean {level=1}
Verify that $D = 2\ket s\!\bra s - I$ maps $\sum_x\alpha_x\ket x$ to $\sum_x(2\bar\alpha - \alpha_x)\ket x$, and use this to redo [[#ex-grover-4]] for the marked item $x = 0$.
::: solution
$\ket s\!\bra s\,\ket\psi = \braket{s|\psi}\ket s = \bigl(\frac{1}{\sqrt N}\sum_x\alpha_x\bigr)\frac{1}{\sqrt N}\sum_y\ket y = \sum_y\bar\alpha\ket y$, so $D\ket\psi = \sum_y(2\bar\alpha - \alpha_y)\ket y$. For $x = 0$: after the oracle the amplitudes are $(-\tfrac12, \tfrac12, \tfrac12, \tfrac12)$, mean $\tfrac14$, and inversion gives $(\tfrac12 + \tfrac12, 0, 0, 0) = (1, 0, 0, 0)$. Which item is marked does not matter — the algorithm is symmetric.
:::
:::

::: exercise Half the items marked {level=2 check="1/2"}
If exactly half of the $N$ items are marked, what is the success probability after one Grover iteration? (Enter a fraction.)
::: solution
$\sin\theta = \sqrt{1/2}$, $\theta = \pi/4$, and after one iteration $\sin^2(3\pi/4) = 1/2$ — exactly the probability of a random guess, which is also what zero iterations give. In fact $G$ is then a rotation by $\pi/2$ and maps $\ket s$ to a state with the same probabilities. With $M = N/2$ one should simply guess; [[#thm-grover]] guarantees only $1 - M/N = 1/2$.
:::
:::

::: exercise The diffusion operator as a circuit {level=2}
Show that $X^{\otimes n}\,(\text{controlled}^{\,n-1}\text{-}Z)\,X^{\otimes n} = I - 2\ket{0^n}\!\bra{0^n}$, where controlled$^{n-1}$-$Z$ applies $Z$ to the last qubit when the first $n - 1$ are all $1$. Conclude that $D$ equals $-H^{\otimes n}X^{\otimes n}(C^{n-1}Z)X^{\otimes n}H^{\otimes n}$ and costs $O(n)$ gates.
::: solution
$C^{n-1}Z$ multiplies $\ket{1^n}$ by $-1$ and fixes every other basis state: it is $I - 2\ket{1^n}\!\bra{1^n}$. Conjugating by $X^{\otimes n}$, which maps $\ket{1^n}\mapsto\ket{0^n}$, gives $I - 2\ket{0^n}\!\bra{0^n}$. So $-H^{\otimes n}X^{\otimes n}C^{n-1}ZX^{\otimes n}H^{\otimes n} = H^{\otimes n}(2\ket{0^n}\!\bra{0^n} - I)H^{\otimes n} = D$ by [[#eq-diffusion]]; the overall sign is a global phase (and irrelevant even inside amplitude amplification, since it multiplies $Q$ by $-1$). $C^{n-1}Z$ is built from $2(n - 2) + 1$ Toffoli-type gates using $n - 2$ ancillas (compute the AND of the controls into a chain of ancillas, apply a controlled-$Z$, uncompute), so the iteration costs $O(n)$ gates besides the oracle.
:::
:::

::: exercise Amplitude amplification in one round {level=2}
An algorithm $\mathcal A$ succeeds with probability exactly $1/4$. Show that a single application of $Q$ ([[#thm-aa]]) makes it succeed with certainty. What happens if instead $p = 1/2$, and how can that case be rescued?
::: solution
For $p = 1/4$, $\theta = \pi/6$ and one round gives $\sin^2(3\theta) = 1$. For $p = 1/2$, $\theta = \pi/4$ and $\sin^2((2k+1)\pi/4) = 1/2$ for every $k$: amplitude amplification is stuck. The standard fix is to weaken $\mathcal A$ first: add an ancilla qubit rotated to $\cos\gamma\ket0 + \sin\gamma\ket1$ and call an outcome good only if $\mathcal A$ succeeds *and* the ancilla is $1$. Choosing $\sin^2\gamma = 1/2$ gives success probability $1/4$, and one round of amplification then succeeds with certainty. In general, reducing $p$ to $\sin^2(\pi/(2(2k+1)))$ for a suitable $k$ makes amplitude amplification exact.
:::
:::

::: exercise Parallel search {level=3}
You have $P$ quantum computers and must find the one marked item among $N$. (a) Describe an algorithm in which each machine makes $O(\sqrt{N/P})$ queries. (b) Use [[#thm-bbbv]] to show that any algorithm running for $R$ rounds, in each of which the $P$ machines make one query each, needs $R = \Omega(\sqrt N/P)$. (c) Compare (a) and (b).
::: solution
(a) Split the items into $P$ blocks of $N/P$. Machine $i$ runs [[#alg-grover]] on block $i$ (an oracle that answers "unmarked" outside the block is easy to build from $O_f$) for about $\frac\pi4\sqrt{N/P}$ iterations, and checks its answer with one query. The machine whose block contains the marked item finds it with probability near $1$; the others report failure. The running time is $O(\sqrt{N/P})$ rounds.

(b) A single quantum computer can simulate the $P$ machines one after another, making the $P$ queries of each round in sequence. It then makes $RP$ queries in total, and by [[#thm-bbbv]] $RP\ge c\sqrt N$ with $c = 1/(8\sqrt2)$ for large $N$, so $R\ge c\sqrt N/P$.

(c) The bound in (b) leaves a gap: the algorithm takes $\sqrt{N/P} = \sqrt N/\sqrt P$ rounds while the bound only forbids fewer than $\sqrt N/P$. Zalka (1999) closed the gap by running the hybrid argument directly on $P$ parallel query registers, proving that $\Omega(\sqrt{N/P})$ rounds are necessary: $P$ machines speed up quantum search by only $\sqrt P$, unlike classical search, where they give a factor $P$. This is why parallelism helps Grover-based key search so little.
:::
:::

::: exercise Search with an unknown number of solutions {level=3}
Implement the exponential-search algorithm described above in the simulator for $N = 256$ and compare the average number of queries (iterations plus one checking query per round) with $\sqrt{N/M}$ for $M = 1, 3, 32$.
::: solution
```python
from qsim import *

def grover_iteration(s, marked, n):
    for i in marked: s[i] = -s[i]                 # oracle O_f: flip the sign of marked items
    for q in range(n): apply(s, H, q)             # diffusion D = H^n (2|0><0| - I) H^n
    s[1:] = [-a for a in s[1:]]                   #   (2|0><0| - I): flip all but |0...0>
    for q in range(n): apply(s, H, q)

def sample_after(n, marked, j, rng):              # run j Grover iterations, then measure
    s = zeros(n)
    for q in range(n): apply(s, H, q)
    for _ in range(j): grover_iteration(s, marked, n)
    return rng.choices(range(2 ** n), weights=probs(s))[0]

def exponential_search(n, marked, rng):           # Boyer-Brassard-Hoyer-Tapp, M unknown
    m, lam, used = 1.0, 6 / 5, 0
    while True:
        j = rng.randrange(math.ceil(m))           # random number of iterations below m
        x = sample_after(n, marked, j, rng); used += j + 1   # j iterations + 1 check query
        if x in marked: return x, used
        m = min(lam * m, math.sqrt(2 ** n))

rng = random.Random(5)
n = 8                                             # N = 256
for marked in ({17}, {17, 99, 200}, set(range(0, 256, 8))):
    runs = [exponential_search(n, marked, rng)[1] for _ in range(200)]
    M = len(marked)
    print(f"M = {M:2}: mean queries {sum(runs) / len(runs):5.1f}   "
          f"sqrt(N/M) = {math.sqrt(256 / M):4.1f}   classical N/(M+1) = {256 / (M + 1):5.1f}")
```

```console
$ python3 exponential_search.py
M =  1: mean queries  25.5   sqrt(N/M) = 16.0   classical N/(M+1) = 128.0
M =  3: mean queries  13.9   sqrt(N/M) =  9.2   classical N/(M+1) =  64.0
M = 32: mean queries   4.1   sqrt(N/M) =  2.8   classical N/(M+1) =   7.8
```

Over $200$ runs each, the average cost is about $1.5$ to $1.6$ times $\sqrt{N/M}$, consistent with the $O(\sqrt{N/M})$ bound, and well below the classical $\approx N/(M+1)$ — without the algorithm ever being told $M$. With $M$ known, [[#alg-grover]] would use $\lfloor\pi/(4\theta)\rfloor + 1$ queries: $13$, $8$ and $2$.
:::
:::

::: exercise Grover cannot be beaten for two marked items either {level=3}
Adapt the proof of [[#thm-bbbv]] to show that finding one of two marked items, when the marked set is a uniformly random pair, still needs $\Omega(\sqrt N)$ queries.
::: solution
Compare the oracle $O_{\{x, y\}}$ with the identity. As in step 1, $\norm{\psi^{xy}_T - \psi_T}\le 2\sum_t(a_{t,x} + a_{t,y})$, so $\norm{\psi^{xy}_T - \psi_T}^2\le 8T\sum_t(a_{t,x}^2 + a_{t,y}^2)$ by Cauchy–Schwarz. Summing over all $\binom N2$ pairs, each $x$ appears in $N - 1$ pairs, so $\sum_{\{x,y\}}\norm{\psi^{xy}_T - \psi_T}^2\le 8T\cdot(N - 1)\cdot T = 8(N-1)T^2$. For step 2, the output distribution of $\ket{\psi_T}$ puts total probability at most $1$ on the $N$ items, so at least half of the pairs have $q_x + q_y\le 4/N$; for them success probability $1/2$ forces $\norm{\psi^{xy}_T - \psi_T}\ge\tfrac12(\tfrac12 - \tfrac4N)$. Hence $8(N-1)T^2\ge\tfrac12\binom N2\cdot\tfrac{1}{16}(1 - \tfrac8N)^2$, which gives $T^2\ge\frac{N}{512}(1 - \tfrac8N)^2$, so $T = \Omega(\sqrt N)$ — consistent with Grover's $\frac\pi4\sqrt{N/2}$.
:::
:::
