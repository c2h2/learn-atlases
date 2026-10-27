Prepare two spin-$\frac12$ particles in the singlet state of [[quantum-2/identical-particles]] and send them to two laboratories, one on each side of a city. Measure both spins along the same axis, and the results are always opposite. That alone is not strange: two gloves posted in separate boxes are always one left and one right. What is strange is what happens when the two laboratories measure along *different* axes, chosen at the last moment. The correlations then follow a law that no pair of gloves, nor any other system whose parts carry their own pre-assigned properties, can reproduce. John Bell proved this in 1964, experiments since 1972 have confirmed it with increasing rigour, and in 2015 three groups closed the last major loopholes. The 2022 Nobel Prize in Physics was awarded to Alain Aspect, John Clauser and Anton Zeilinger for those experiments.

The property responsible is **entanglement**: a state of a composite system that is not a product of states of its parts. This chapter develops the tools to describe it. **Density matrices** describe a subsystem on its own, or a system about which we have incomplete information. The **Schmidt decomposition** shows how much two parts are entangled. Then we derive the predictions for the singlet, follow the argument of Einstein, Podolsky and Rosen, and prove the **CHSH inequality** that every local hidden-variable theory obeys, together with the quantum maximum $2\sqrt2$ that violates it. The last section turns entanglement from a puzzle into a resource, with two results that underlie quantum information: the **no-cloning theorem** and **quantum teleportation**.

The prerequisites are the state-vector formalism of [[quantum-1/formalism]] and spin $\frac12$ with the Pauli matrices from [[quantum-1/spin]]. The notation is that of quantum information (Nielsen & Chuang): a two-level system is a **qubit**, with basis $\lvert0\rangle, \lvert1\rangle$, which for a spin means $\lvert{\uparrow}\rangle, \lvert{\downarrow}\rangle$ along $z$.

## Composite systems and entangled states {#composite}

The state space of a system made of two parts $A$ and $B$ is the tensor product $\mathcal H_A\otimes\mathcal H_B$. If $\{\lvert i\rangle_A\}$ and $\{\lvert j\rangle_B\}$ are orthonormal bases, the products $\lvert i\rangle_A\otimes\lvert j\rangle_B$, written $\lvert ij\rangle$, form a basis, so a general state is

$$
\lvert\psi\rangle = \sum_{i,j}c_{ij}\,\lvert i\rangle_A\lvert j\rangle_B.
$$ {#eq-general}

For two qubits this is a four-dimensional space, with basis $\lvert00\rangle, \lvert01\rangle, \lvert10\rangle, \lvert11\rangle$. Operators on one part act as $\hat O_A\otimes\mathbb 1_B$, and the tensor product of operators acts factor by factor: $(\hat O_A\otimes\hat O_B)\lvert a\rangle\lvert b\rangle = \hat O_A\lvert a\rangle\otimes\hat O_B\lvert b\rangle$.

::: definition Product and entangled states {#def-entangled}
A pure state $\lvert\psi\rangle \in \mathcal H_A\otimes\mathcal H_B$ is a **product state** if it can be written $\lvert\psi\rangle = \lvert a\rangle_A\otimes\lvert b\rangle_B$ for some states $\lvert a\rangle$, $\lvert b\rangle$. Otherwise it is **entangled**.
:::

A product state assigns a definite state to each part. An entangled state does not. The four **Bell states**

$$
\lvert\Phi^\pm\rangle = \frac{1}{\sqrt2}\bigl(\lvert00\rangle \pm \lvert11\rangle\bigr), \qquad \lvert\Psi^\pm\rangle = \frac{1}{\sqrt2}\bigl(\lvert01\rangle \pm \lvert10\rangle\bigr)
$$ {#eq-bell-states}

form an orthonormal basis of two qubits, and every one of them is entangled. $\lvert\Psi^-\rangle$ is the spin singlet.

For two qubits there is a quick test. Writing $c_{ij}$ in [[#eq-general]] as a $2\times2$ matrix $C$, a product state $(a_0\lvert0\rangle + a_1\lvert1\rangle)(b_0\lvert0\rangle + b_1\lvert1\rangle)$ has $c_{ij} = a_ib_j$, a matrix of rank $1$. So **a two-qubit pure state is a product state if and only if $\det C = 0$**. For $\lvert\Phi^+\rangle$, $C = \frac1{\sqrt2}\mathbb 1$ and $\det C = \frac12 \ne 0$.

::: example Entangled or not? {#ex-test}
Decide whether each state is entangled: (a) $\frac12(\lvert00\rangle + \lvert01\rangle + \lvert10\rangle + \lvert11\rangle)$; (b) $\frac{1}{\sqrt3}(\lvert00\rangle + \lvert01\rangle + \lvert10\rangle)$.
::: solution
(a) $C = \frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$, $\det C = 0$: a product. Indeed it is $\lvert+\rangle\lvert+\rangle$ with $\lvert+\rangle = (\lvert0\rangle + \lvert1\rangle)/\sqrt2$, both spins pointing along $+x$. Writing a state in a basis with many terms does not make it entangled.

(b) $C = \frac{1}{\sqrt3}\begin{pmatrix}1&1\\1&0\end{pmatrix}$, $\det C = -\frac13 \ne 0$: entangled. How much, we will be able to say after [[#thm-schmidt]].
:::
:::

The general structure is given by a theorem from linear algebra.

::: theorem Schmidt decomposition {#thm-schmidt}
Every pure state of $\mathcal H_A\otimes\mathcal H_B$ can be written as

$$
\lvert\psi\rangle = \sum_{k=1}^{r}\sqrt{p_k}\,\lvert u_k\rangle_A\lvert v_k\rangle_B,
$$ {#eq-schmidt}

with orthonormal sets $\{\lvert u_k\rangle\}$ in $\mathcal H_A$ and $\{\lvert v_k\rangle\}$ in $\mathcal H_B$, and **Schmidt coefficients** $p_k > 0$ with $\sum_kp_k = 1$. The number $r$ (the **Schmidt rank**) and the $p_k$ are uniquely determined by $\lvert\psi\rangle$, and the state is a product if and only if $r = 1$.
:::

::: proof
Write $\lvert\psi\rangle$ as in [[#eq-general]] with coefficient matrix $C$. By the singular value decomposition, $C = U\Sigma V^{\mathsf T}$, where $U$ and $V$ are unitary and $\Sigma$ is diagonal with non-negative entries $s_k$; this is a standard theorem, proved by diagonalising the positive matrix $CC^\dagger$. Then

$$
c_{ij} = \sum_kU_{ik}s_kV_{jk}, \qquad \lvert\psi\rangle = \sum_ks_k\Bigl(\sum_iU_{ik}\lvert i\rangle_A\Bigr)\Bigl(\sum_jV_{jk}\lvert j\rangle_B\Bigr).
$$

Define $\lvert u_k\rangle = \sum_iU_{ik}\lvert i\rangle$ and $\lvert v_k\rangle = \sum_jV_{jk}\lvert j\rangle$: they are orthonormal because the columns of unitary matrices are. Keep the $r$ terms with $s_k > 0$ and set $p_k = s_k^2$. Normalisation gives $\sum p_k = \sum_{ij}\lvert c_{ij}\rvert^2 = 1$. The $p_k$ are the eigenvalues of $CC^\dagger$, which depends only on $\lvert\psi\rangle$ and the bases, and changing the bases changes $CC^\dagger$ by a unitary similarity, so the eigenvalues are unique. A product has a rank-one $C$, so $r = 1$; conversely $r = 1$ is a single product term.
:::

The Schmidt coefficients measure entanglement. A product state has $p_1 = 1$. The Bell states have $p_1 = p_2 = \frac12$, as entangled as two qubits can be.

## Density matrices {#density}

Suppose the pair is in an entangled state and we hold only $A$. What state is $A$ in? It is not in any pure state, since that would make the pair a product. We need a more general description.

::: definition Density operator {#def-density}
A system that is in the pure state $\lvert\psi_k\rangle$ with probability $w_k$ (with $w_k \ge 0$, $\sum_kw_k = 1$) is described by the **density operator**

$$
\hat\rho = \sum_kw_k\,\lvert\psi_k\rangle\langle\psi_k\rvert.
$$ {#eq-density}

The expectation value of an observable is $\langle\hat O\rangle = \operatorname{tr}(\hat\rho\hat O)$. The state is **pure** if $\hat\rho = \lvert\psi\rangle\langle\psi\rvert$ for a single $\lvert\psi\rangle$, and **mixed** otherwise.
:::

The formula for the expectation value is the average over the ensemble: $\operatorname{tr}(\lvert\psi\rangle\langle\psi\rvert\hat O) = \langle\psi\vert\hat O\vert\psi\rangle$, and averaging with weights $w_k$ gives $\operatorname{tr}(\hat\rho\hat O)$. All predictions depend on the ensemble only through $\hat\rho$. Different ensembles can have the same $\hat\rho$: an equal mixture of $\lvert0\rangle$ and $\lvert1\rangle$, and an equal mixture of $\lvert{+}\rangle$ and $\lvert{-}\rangle$, both give $\hat\rho = \frac12\mathbb 1$, and no experiment can tell them apart.

::: theorem Properties of density operators {#thm-density}
Every density operator is Hermitian, has trace $1$, and is positive ($\langle\phi\vert\hat\rho\vert\phi\rangle \ge 0$ for all $\lvert\phi\rangle$). Its **purity** satisfies $\operatorname{tr}\hat\rho^2 \le 1$, with equality if and only if the state is pure. Conversely every Hermitian, positive operator of unit trace is a density operator.
:::

::: proof
Hermiticity is clear from [[#eq-density]]. The trace is $\sum_kw_k\langle\psi_k\vert\psi_k\rangle = 1$, and $\langle\phi\vert\hat\rho\vert\phi\rangle = \sum_kw_k\lvert\langle\phi\vert\psi_k\rangle\rvert^2 \ge 0$. A Hermitian positive operator of unit trace has an orthonormal eigenbasis $\lvert e_n\rangle$ with eigenvalues $\lambda_n \ge 0$, $\sum\lambda_n = 1$, so $\hat\rho = \sum_n\lambda_n\lvert e_n\rangle\langle e_n\rvert$ is of the form [[#eq-density]]; this proves the converse. In that eigenbasis $\operatorname{tr}\hat\rho^2 = \sum_n\lambda_n^2 \le \sum_n\lambda_n = 1$, because $0 \le \lambda_n \le 1$ gives $\lambda_n^2 \le \lambda_n$. Equality requires $\lambda_n^2 = \lambda_n$ for every $n$, so each eigenvalue is $0$ or $1$, and since they sum to $1$ exactly one is $1$: $\hat\rho = \lvert e\rangle\langle e\rvert$, a pure state.
:::

For a single qubit, every Hermitian $2\times2$ matrix of unit trace can be written

$$
\hat\rho = \frac12\left(\mathbb 1 + \mathbf r\cdot\boldsymbol\sigma\right), \qquad \mathbf r = \langle\boldsymbol\sigma\rangle,
$$ {#eq-bloch}

and its eigenvalues $\frac12(1\pm\lvert\mathbf r\rvert)$ are non-negative if and only if $\lvert\mathbf r\rvert \le 1$. Qubit states are the points of the **Bloch ball**: pure states on the surface, mixed states inside, the **maximally mixed** state $\frac12\mathbb 1$ at the centre. For a spin $\frac12$, $\mathbf r$ is the polarisation vector.

### The reduced state of a subsystem

If the pair is in the state $\hat\rho_{AB}$ and we measure only observables of $A$, of the form $\hat O_A\otimes\mathbb 1$, then

$$
\langle\hat O_A\otimes\mathbb 1\rangle = \operatorname{tr}_{AB}\bigl(\hat\rho_{AB}(\hat O_A\otimes\mathbb 1)\bigr) = \operatorname{tr}_A\bigl(\hat\rho_A\hat O_A\bigr), \qquad \hat\rho_A = \operatorname{tr}_B\hat\rho_{AB},
$$

where the **partial trace** over $B$ is defined by $\langle i\vert\hat\rho_A\vert i'\rangle = \sum_j\langle ij\vert\hat\rho_{AB}\vert i'j\rangle$. The **reduced density operator** $\hat\rho_A$ contains everything that can be learned about $A$ by measurements on $A$ alone.

For a pure state written in Schmidt form [[#eq-schmidt]],

$$
\hat\rho_A = \sum_kp_k\,\lvert u_k\rangle\langle u_k\rvert, \qquad \hat\rho_B = \sum_kp_k\,\lvert v_k\rangle\langle v_k\rvert.
$$

The two parts have the same spectrum, the Schmidt coefficients, and $\hat\rho_A$ is pure if and only if $\lvert\psi\rangle$ is a product. The **entanglement entropy** $S = -\sum_kp_k\log_2p_k$, the von Neumann entropy of $\hat\rho_A$, is $0$ for a product and $1$ bit for a Bell state.

::: example The reduced state of the singlet {#ex-singlet-reduced}
Find $\hat\rho_A$ for the singlet $\lvert\Psi^-\rangle$ and for $\cos\theta\lvert00\rangle + \sin\theta\lvert11\rangle$, with their purities.
::: solution
The singlet is already in Schmidt form with $p_1 = p_2 = \frac12$, $\lvert u_1\rangle = \lvert0\rangle$, $\lvert u_2\rangle = \lvert1\rangle$. So $\hat\rho_A = \frac12\lvert0\rangle\langle0\rvert + \frac12\lvert1\rangle\langle1\rvert = \frac12\mathbb 1$, the centre of the Bloch ball, with purity $\frac12$. Every measurement on $A$ alone gives $\pm\frac{\hbar}{2}$ with probability $\frac12$ along every axis. The pair is in a definite pure state, and each half is as random as a qubit can be.

For $\cos\theta\lvert00\rangle + \sin\theta\lvert11\rangle$, $\hat\rho_A = \cos^2\theta\,\lvert0\rangle\langle0\rvert + \sin^2\theta\,\lvert1\rangle\langle1\rvert$, with Bloch vector $(0, 0, \cos2\theta)$ and purity $\cos^4\theta + \sin^4\theta$. It goes from $1$ at $\theta = 0$ (product) to $\frac12$ at $\theta = \pi/4$ (the Bell state $\lvert\Phi^+\rangle$).
:::
:::

::: widget plot
f: -(cos(x)^2*log2(cos(x)^2) + sin(x)^2*log2(sin(x)^2)); cos(x)^4 + sin(x)^4
x: 0.01, 1.56
y: 0, 1.1
labels: entanglement entropy (bits); purity of the reduced state
caption: For the state $\cos\theta\lvert00\rangle + \sin\theta\lvert11\rangle$, against $\theta$ from $0$ to $\pi/2$. At the ends the state is a product: entropy $0$, purity $1$. At $\theta = \pi/4 \approx 0.785$ it is a Bell state: entropy $1$ bit, purity $\frac12$. Notice how flat the entropy is near its maximum: at $\theta = \pi/8$, half way, the entropy is already $0.60$ bits.
:::

::: quiz
Alice holds qubit $A$ of the pair in the state $\lvert\Phi^+\rangle$. Bob, far away, measures qubit $B$ along $z$ but does not tell Alice the result. What state should Alice now assign to $A$?
- [ ] $\lvert0\rangle$ or $\lvert1\rangle$, whichever Bob found
- [x] $\frac12\mathbb 1$, exactly as before Bob measured
- [ ] $\lvert\Phi^+\rangle$, because the pair is still entangled
- [ ] It depends on how far away Bob is
::: solution
Bob's measurement leaves $A$ in $\lvert0\rangle$ or $\lvert1\rangle$ with probability $\frac12$ each, and the density operator for Alice, who does not know which, is $\frac12\lvert0\rangle\langle0\rvert + \frac12\lvert1\rangle\langle1\rvert = \frac12\mathbb 1$, unchanged. If Bob had measured along $x$, Alice's state would be an equal mixture of $\lvert{+}\rangle$ and $\lvert{-}\rangle$: also $\frac12\mathbb 1$. Nothing Bob does changes Alice's statistics. This is the **no-signalling** property ([[#exr-nosignal]]).
:::
:::

## The EPR argument {#epr}

In 1935 Albert Einstein, Boris Podolsky and Nathan Rosen argued that quantum mechanics is incomplete. In David Bohm's 1951 version, with spins, the argument goes like this. Two spin-$\frac12$ particles are prepared in the singlet and separated.

1. If Alice measures $\sigma_z$ on $A$ and finds $+1$, she can predict with certainty that Bob will find $-1$ for $\sigma_z$ on $B$. The same holds for $\sigma_x$, or any other axis.
2. **Locality**: Alice's choice of what to measure cannot affect the physical situation at $B$, far away.
3. **Reality criterion**: if, without disturbing a system, we can predict with certainty the value of a quantity, there exists an element of physical reality corresponding to it.

From (1)–(3), $B$ has a definite value of $\sigma_z$ *and* a definite value of $\sigma_x$, both determined before any measurement, since Alice could have predicted either without touching $B$. Quantum mechanics assigns $B$ neither (the two operators do not commute), so it is an incomplete description, and one should look for a deeper theory with additional "hidden" variables that fix the outcomes. Niels Bohr replied the same year that the reality criterion is ambiguous when the experimental arrangement itself is part of what defines a quantity. For three decades this was regarded as a philosophical disagreement with no experimental consequences.

Before testing it, we need the quantum predictions for measurements along arbitrary axes.

::: proposition Correlations in the singlet {#prop-singlet}
For unit vectors $\mathbf a$ and $\mathbf b$, measurements of $\boldsymbol\sigma\cdot\mathbf a$ on $A$ and $\boldsymbol\sigma\cdot\mathbf b$ on $B$ in the singlet $\lvert\Psi^-\rangle$ give outcomes $\pm1$ whose product has mean

$$
E(\mathbf a, \mathbf b) = \langle\Psi^-\vert(\boldsymbol\sigma\cdot\mathbf a)\otimes(\boldsymbol\sigma\cdot\mathbf b)\vert\Psi^-\rangle = -\mathbf a\cdot\mathbf b = -\cos\theta_{ab}.
$$ {#eq-correlation}
:::

::: proof
The singlet has total spin zero, so $(\boldsymbol\sigma_A + \boldsymbol\sigma_B)\lvert\Psi^-\rangle = 0$, which lets us replace $\boldsymbol\sigma_B$ by $-\boldsymbol\sigma_A$ when acting on it:

$$
(\boldsymbol\sigma_A\cdot\mathbf a)(\boldsymbol\sigma_B\cdot\mathbf b)\lvert\Psi^-\rangle = -(\boldsymbol\sigma_A\cdot\mathbf a)(\boldsymbol\sigma_A\cdot\mathbf b)\lvert\Psi^-\rangle.
$$

(The operators on $A$ and $B$ commute, so $(\boldsymbol\sigma_B\cdot\mathbf b)$ can be applied first.) The Pauli identity $(\boldsymbol\sigma\cdot\mathbf a)(\boldsymbol\sigma\cdot\mathbf b) = (\mathbf a\cdot\mathbf b)\mathbb 1 + i\boldsymbol\sigma\cdot(\mathbf a\times\mathbf b)$ gives

$$
E(\mathbf a, \mathbf b) = -\mathbf a\cdot\mathbf b - i(\mathbf a\times\mathbf b)\cdot\langle\Psi^-\vert\boldsymbol\sigma_A\vert\Psi^-\rangle = -\mathbf a\cdot\mathbf b,
$$

because $\langle\boldsymbol\sigma_A\rangle = \operatorname{tr}(\hat\rho_A\boldsymbol\sigma) = 0$ for $\hat\rho_A = \frac12\mathbb 1$ ([[#ex-singlet-reduced]]).
:::

For parallel axes $E = -1$: perfect anticorrelation, as EPR used. For perpendicular axes $E = 0$: no correlation at all. In between, the correlation varies as the cosine of the angle.

## Bell's theorem and the CHSH inequality {#bell}

Bell's insight was that EPR's assumptions, taken together, have consequences that can be tested. Suppose, with EPR, that the outcomes are fixed in advance by some variables $\lambda$ carried by the particles, distributed with a probability density $\rho(\lambda)$ fixed at the source. By locality, Alice's outcome for setting $\mathbf a$ is a function $A(\mathbf a, \lambda) = \pm1$ that does not depend on Bob's setting, and Bob's is $B(\mathbf b, \lambda) = \pm1$. Then

$$
E(\mathbf a, \mathbf b) = \int\rho(\lambda)\,A(\mathbf a, \lambda)\,B(\mathbf b, \lambda)\,\dd\lambda.
$$ {#eq-lhv}

This framework is called **local hidden variables** (or local realism). It includes every classical model, such as the gloves, and any model of the kind EPR hoped for.

::: theorem CHSH inequality {#thm-chsh}
In any local hidden-variable model [[#eq-lhv]], for any settings $\mathbf a, \mathbf a'$ of Alice and $\mathbf b, \mathbf b'$ of Bob,

$$
\lvert S\rvert \le 2, \qquad S = E(\mathbf a, \mathbf b) + E(\mathbf a, \mathbf b') + E(\mathbf a', \mathbf b) - E(\mathbf a', \mathbf b').
$$ {#eq-chsh}
:::

::: proof
Fix $\lambda$ and abbreviate $A = A(\mathbf a, \lambda)$, $A' = A(\mathbf a', \lambda)$, $B = B(\mathbf b, \lambda)$, $B' = B(\mathbf b', \lambda)$, each $\pm1$. Then

$$
AB + AB' + A'B - A'B' = A(B + B') + A'(B - B').
$$

Since $B, B' = \pm1$, either $B = B'$, in which case $B - B' = 0$ and $B + B' = \pm2$, or $B = -B'$, in which case $B + B' = 0$ and $B - B' = \pm2$. In both cases the expression is $\pm2$. Averaging a quantity that is always $+2$ or $-2$ with the probability density $\rho(\lambda)$ gives a number between $-2$ and $2$, and by [[#eq-lhv]] that average is $S$.
:::

The proof uses three things: definite outcomes for all four settings at once (realism), Alice's outcome not depending on Bob's setting and vice versa (locality), and the distribution $\rho(\lambda)$ not depending on the settings (measurement independence, or "free choice"). It uses nothing about quantum mechanics, or about physics at all. The inequality is due to John Clauser, Michael Horne, Abner Shimony and Richard Holt (1969); it is a variant of Bell's original 1964 inequality that is better suited to experiments with imperfect correlations.

::: example The quantum violation {#ex-violation}
Using [[#eq-correlation]] with all four settings in a plane, choose $\mathbf a$ at $0^\circ$, $\mathbf a'$ at $90^\circ$, $\mathbf b$ at $45^\circ$ and $\mathbf b'$ at $-45^\circ$. Compute $S$.
::: solution
The angles between the settings are $\theta_{ab} = 45^\circ$, $\theta_{ab'} = 45^\circ$, $\theta_{a'b} = 45^\circ$ and $\theta_{a'b'} = 135^\circ$. So

$$
S = -\cos45^\circ - \cos45^\circ - \cos45^\circ + \cos135^\circ = -4\cdot\frac{1}{\sqrt2} = -2\sqrt2 \approx -2.83.
$$

Then $\lvert S\rvert = 2\sqrt2 > 2$. Quantum mechanics predicts correlations that no local hidden-variable model can produce. The prediction is for a definite, experimentally accessible set of settings, and the difference between $2$ and $2.83$ is large enough to be measured with imperfect detectors.
:::
:::

::: widget plot
f: 3*cos(x) - cos(3*x); 2; -2; 2*sqrt(2); -2*sqrt(2)
x: 0, pi
y: -3, 3
piticks: true
labels: quantum value; local bound; local bound; Tsirelson bound; Tsirelson bound
caption: Settings spaced equally by an angle $\theta$: $\mathbf a$ at $0$, $\mathbf b$ at $\theta$, $\mathbf a'$ at $2\theta$, $\mathbf b'$ at $3\theta$. Three of the pairs are then $\theta$ apart and the pair $(\mathbf a, \mathbf b')$ is $3\theta$ apart; putting the minus sign of the CHSH combination on that pair (an equally valid form of [[#eq-chsh]]) and using $E = -\cos$, the quantum value is $-(3\cos\theta - \cos3\theta)$, and the curve shows $3\cos\theta - \cos3\theta$. Find where it leaves the band between $-2$ and $2$: around $\theta = \pi/4$, where it touches $2\sqrt2$, and around $3\pi/4$, where it reaches $-2\sqrt2$. At $\theta = 0$ and $\pi/2$ the quantum correlations stay within the local bound; the violation needs settings that are neither parallel nor perpendicular.
:::

Can a cleverer choice of settings, or a different quantum state, push $S$ higher? No.

::: theorem Tsirelson's bound {#thm-tsirelson}
For any quantum state of two systems and any observables $\hat A, \hat A'$ on the first and $\hat B, \hat B'$ on the second with eigenvalues in $[-1, 1]$, $\lvert\langle\hat A\hat B + \hat A\hat B' + \hat A'\hat B - \hat A'\hat B'\rangle\rvert \le 2\sqrt2$.
:::

::: proof
It is enough to treat observables with eigenvalues exactly $\pm1$, so that $\hat A^2 = \hat A'^2 = \hat B^2 = \hat B'^2 = \mathbb 1$; the general case reduces to this one because the expression is linear in each observable, and an observable with eigenvalues in $[-1, 1]$ is a convex combination of observables with eigenvalues $\pm1$. Operators on different systems commute. Let $\hat C = \hat A(\hat B + \hat B') + \hat A'(\hat B - \hat B')$. Squaring and using $(\hat B\pm\hat B')^2 = 2\pm(\hat B\hat B' + \hat B'\hat B)$,

$$
\hat C^2 = \hat A^2(\hat B + \hat B')^2 + \hat A'^2(\hat B - \hat B')^2 + \hat A\hat A'(\hat B + \hat B')(\hat B - \hat B') + \hat A'\hat A(\hat B - \hat B')(\hat B + \hat B') = 4\cdot\mathbb 1 - [\hat A, \hat A'][\hat B, \hat B'].
$$

The last step: $(\hat B + \hat B')(\hat B - \hat B') = -[\hat B, \hat B']$ and $(\hat B - \hat B')(\hat B + \hat B') = [\hat B, \hat B']$, so the two cross terms combine to $-(\hat A\hat A' - \hat A'\hat A)[\hat B, \hat B']$. Each commutator has norm at most $2$ (since $\lVert\hat A\hat A'\rVert \le 1$), so $\lVert\hat C^2\rVert \le 8$. Finally, for any state, $\langle\hat C\rangle^2 \le \langle\hat C^2\rangle \le 8$ (the variance is non-negative), so $\lvert\langle\hat C\rangle\rvert \le 2\sqrt2$.
:::

The proof shows where the quantum advantage comes from: if Alice's two observables commute (or Bob's), $\hat C^2 = 4$ and $\lvert S\rvert \le 2$. Violation requires incompatible measurements on both sides. Theories even more non-local than quantum mechanics could reach $S = 4$ without allowing signalling; that nature stops at $2\sqrt2$ is one of the questions of current research on the foundations of quantum theory.

::: warning Entanglement does not send signals
A frequent mistake is to conclude from Bell's theorem that Alice's measurement sends an instantaneous influence to Bob that he can use. It cannot. Bob's reduced state, and therefore the statistics of everything he can measure, is independent of what Alice does ([[#exr-nosignal]]). The violation of [[#eq-chsh]] shows up only when the two lists of results are brought together, by ordinary communication at or below the speed of light, and compared. What Bell's theorem rules out is the combination of locality *and* pre-existing values, not relativity.
:::

::: application Experiments
Stuart Freedman and John Clauser (1972) measured polarisation correlations of photon pairs from calcium atoms and found a violation of the CHSH-type inequality. Alain Aspect, Philippe Grangier, Jean Dalibard and Gérard Roger (1981–82) did so with much higher precision, and in one experiment switched the analyser settings while the photons were in flight, closing the "locality loophole" for the first time in a partial way. Two loopholes remained: detectors that miss many photons could, in principle, select a biased sample (the detection loophole), and settings had to be chosen fast enough to be space-like separated from the other measurement. In 2015 three experiments closed both at once: Bas Hensen and co-workers at Delft with electron spins in diamonds $1.3\,\mathrm{km}$ apart, and Marissa Giustina and co-workers in Vienna and Lynden Shalm and co-workers at NIST with photons. Local hidden-variable theories are ruled out, unless one gives up measurement independence (that the settings are freely chosen), which few physicists are willing to do. Entanglement-based protocols for **quantum key distribution** use the same correlations; their security rests on the CHSH violation itself.
:::

## Entanglement as a resource {#resource}

Two results show that the rules of quantum mechanics, which forbid some operations that are classically trivial, enable others that are classically impossible.

::: theorem No-cloning theorem {#thm-nocloning}
There is no unitary operator $\hat U$ on $\mathcal H\otimes\mathcal H$ and fixed "blank" state $\lvert e\rangle$ such that $\hat U(\lvert\psi\rangle\lvert e\rangle) = \lvert\psi\rangle\lvert\psi\rangle$ for every state $\lvert\psi\rangle$. More precisely, a unitary that copies two states $\lvert\psi\rangle$ and $\lvert\phi\rangle$ exists only if they are equal (up to phase) or orthogonal.
:::

::: proof
Suppose $\hat U(\lvert\psi\rangle\lvert e\rangle) = \lvert\psi\rangle\lvert\psi\rangle$ and $\hat U(\lvert\phi\rangle\lvert e\rangle) = \lvert\phi\rangle\lvert\phi\rangle$. Unitaries preserve inner products, so

$$
\langle\phi\vert\psi\rangle\langle e\vert e\rangle = \bigl(\langle\phi\vert\langle\phi\vert\bigr)\bigl(\lvert\psi\rangle\lvert\psi\rangle\bigr) = \langle\phi\vert\psi\rangle^2.
$$

With $\langle e\vert e\rangle = 1$, the number $z = \langle\phi\vert\psi\rangle$ satisfies $z = z^2$, so $z = 0$ or $z = 1$. If $z = 1$ the normalised states are equal. So two distinct, non-orthogonal states cannot both be copied, and in particular no device copies every state. The conclusion survives if the copier is allowed an internal state that changes, $\hat U\lvert\psi\rangle\lvert e\rangle\lvert M\rangle = \lvert\psi\rangle\lvert\psi\rangle\lvert M_\psi\rangle$: then $z = z^2\langle M_\phi\vert M_\psi\rangle$, so $\lvert z\rvert \le \lvert z\rvert^2$, which for $0 \le \lvert z\rvert \le 1$ again forces $\lvert z\rvert = 0$ or $1$.
:::

Copying orthogonal states is fine: a classical bit can be copied, because $\lvert0\rangle$ and $\lvert1\rangle$ are orthogonal. What cannot be copied is an unknown superposition. If it could, one could make many copies and measure each along a different axis, determining the state completely; combined with entanglement, that would allow signalling faster than light. Quantum key distribution relies on no-cloning: an eavesdropper cannot copy the qubits in transit and must disturb them.

How, then, can an unknown qubit state be moved from one place to another? Not by measuring it, which destroys it, and not by copying it. With entanglement and two classical bits it can be transferred exactly.

::: example Quantum teleportation {#ex-teleport}
Alice has a qubit $1$ in an unknown state $\lvert\psi\rangle = \alpha\lvert0\rangle + \beta\lvert1\rangle$. Alice and Bob share a pair of qubits $2$ (Alice's) and $3$ (Bob's) in the state $\lvert\Phi^+\rangle$. Show that if Alice measures qubits $1$ and $2$ in the Bell basis and tells Bob the result, Bob can turn qubit $3$ into $\lvert\psi\rangle$.
::: solution
The initial state of the three qubits is

$$
\lvert\psi\rangle_1\lvert\Phi^+\rangle_{23} = \frac{1}{\sqrt2}\bigl(\alpha\lvert000\rangle + \alpha\lvert011\rangle + \beta\lvert100\rangle + \beta\lvert111\rangle\bigr).
$$

Rewrite the states of qubits $1$ and $2$ in the Bell basis [[#eq-bell-states]], using $\lvert00\rangle = (\lvert\Phi^+\rangle + \lvert\Phi^-\rangle)/\sqrt2$, $\lvert11\rangle = (\lvert\Phi^+\rangle - \lvert\Phi^-\rangle)/\sqrt2$, $\lvert01\rangle = (\lvert\Psi^+\rangle + \lvert\Psi^-\rangle)/\sqrt2$, $\lvert10\rangle = (\lvert\Psi^+\rangle - \lvert\Psi^-\rangle)/\sqrt2$, and collect terms:

$$
\frac12\Bigl[\lvert\Phi^+\rangle(\alpha\lvert0\rangle + \beta\lvert1\rangle) + \lvert\Phi^-\rangle(\alpha\lvert0\rangle - \beta\lvert1\rangle) + \lvert\Psi^+\rangle(\alpha\lvert1\rangle + \beta\lvert0\rangle) + \lvert\Psi^-\rangle(\alpha\lvert1\rangle - \beta\lvert0\rangle)\Bigr].
$$

Nothing physical has happened yet; this is the same state in another basis. Alice's Bell measurement gives each of the four outcomes with probability $\frac14$, independent of $\alpha$ and $\beta$, so she learns nothing about $\lvert\psi\rangle$. After the measurement qubit $3$ is in one of four states, each related to $\lvert\psi\rangle$ by a fixed Pauli operation:

| Alice's result | Bob's qubit | Bob applies |
|---|---|---|
| $\Phi^+$ | $\alpha\lvert0\rangle + \beta\lvert1\rangle$ | $\mathbb 1$ |
| $\Phi^-$ | $\alpha\lvert0\rangle - \beta\lvert1\rangle$ | $\sigma_z$ |
| $\Psi^+$ | $\beta\lvert0\rangle + \alpha\lvert1\rangle$ | $\sigma_x$ |
| $\Psi^-$ | $-\beta\lvert0\rangle + \alpha\lvert1\rangle$ | $\sigma_z\sigma_x$ |

(Check the last line: $\sigma_x$ turns $\alpha\lvert1\rangle - \beta\lvert0\rangle$ into $\alpha\lvert0\rangle - \beta\lvert1\rangle$, and $\sigma_z$ then gives $\alpha\lvert0\rangle + \beta\lvert1\rangle$.) Alice sends two classical bits saying which outcome occurred, and Bob applies the correction. Qubit $3$ is now in $\lvert\psi\rangle$ exactly, and qubit $1$ is left in a Bell state with qubit $2$, carrying no trace of $\alpha$ or $\beta$: the state has been moved, not copied, consistent with [[#thm-nocloning]]. Until the two bits arrive, Bob's qubit is in an equal mixture of the four states in the table, which is $\frac12\mathbb 1$ whatever $\lvert\psi\rangle$ was. Nothing travels faster than light.
:::
:::

::: quiz
In teleportation, which resources are used up?
- [ ] Nothing: the state is transferred for free.
- [ ] One copy of $\lvert\psi\rangle$, which Alice must clone first.
- [x] One shared entangled pair and two bits of classical communication.
- [ ] An infinite amount of classical information, to specify $\alpha$ and $\beta$.
::: solution
The Bell pair is consumed (qubits $2$ and $3$ are no longer entangled with each other afterwards), and two classical bits are sent. Describing $\alpha$ and $\beta$ classically would need infinitely many bits, and Alice does not know them anyway. Teleportation was proposed by Charles Bennett and five co-authors in 1993 and demonstrated with photons by Anton Zeilinger's group in 1997; it is now a routine step in quantum networks.
:::
:::

::: history From EPR to the Nobel Prize
Albert Einstein, Boris Podolsky and Nathan Rosen published their argument in *Physical Review* in May 1935; Niels Bohr's reply appeared in the same journal later that year, and Erwin Schrödinger, in papers the same year, coined the word **entanglement** (*Verschränkung*) and called it "the characteristic trait of quantum mechanics". The density matrix had been introduced by John von Neumann and by Lev Landau in 1927. David Bohm recast the EPR argument with spins in his 1951 textbook. John Bell's 1964 paper, in the short-lived journal *Physics*, proved that local hidden variables cannot reproduce the singlet correlations, and Clauser, Horne, Shimony and Holt's 1969 inequality made the test practical. Boris Tsirelson proved the $2\sqrt2$ bound in 1980. William Wootters and Wojciech Zurek, and independently Dennis Dieks, proved the no-cloning theorem in 1982. After the experiments of Freedman and Clauser (1972), Aspect and colleagues (1982) and the loophole-free tests of 2015, the 2022 Nobel Prize in Physics went to Alain Aspect, John Clauser and Anton Zeilinger "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science".
:::

## Where this leads {#leads}

Entanglement is the resource behind quantum computing, quantum cryptography and quantum metrology, treated at length in Nielsen & Chuang. The density matrix is the natural language of [[statistical-mechanics/canonical]], where the canonical state $e^{-\beta\hat H}/Z$ is a mixed state, and of open systems that lose coherence to their environment (decoherence), which explains why entanglement is so hard to see in large objects. The singlet correlations here involve the same spin algebra as the exchange interaction of [[quantum-2/identical-particles]]; in many-body physics, the scaling of entanglement entropy with the size of a region is now used to classify phases of matter in [[condensed-matter]].

::: summary
- The state space of a composite system is a tensor product. A pure state is entangled if it is not a product; for two qubits, if and only if $\det(c_{ij}) \ne 0$.
- Every pure bipartite state has a Schmidt decomposition $\sum_k\sqrt{p_k}\lvert u_k\rangle\lvert v_k\rangle$. The $p_k$ are the eigenvalues of both reduced states, and the entanglement entropy is $-\sum p_k\log_2p_k$.
- Density operators $\hat\rho = \sum w_k\lvert\psi_k\rangle\langle\psi_k\rvert$ are positive with unit trace; $\operatorname{tr}\hat\rho^2 \le 1$ with equality only for pure states. A qubit state is $\frac12(\mathbb 1 + \mathbf r\cdot\boldsymbol\sigma)$ with $\lvert\mathbf r\rvert \le 1$.
- The reduced state of either half of a Bell state is $\frac12\mathbb 1$. In the singlet, $E(\mathbf a, \mathbf b) = -\mathbf a\cdot\mathbf b$.
- Local hidden variables imply the CHSH inequality $\lvert S\rvert \le 2$. Quantum mechanics reaches $2\sqrt2$, and no quantum state can exceed it (Tsirelson). Loophole-free experiments in 2015 confirmed the violation.
- Entanglement does not allow signalling: Bob's reduced state is independent of Alice's actions.
- Unknown quantum states cannot be cloned, but they can be teleported using one Bell pair and two classical bits.
:::

## Exercises {#exercises}

::: exercise The purity of a mixture {level=1 check="5/8"}
A qubit is in $\lvert0\rangle$ with probability $\frac34$ and in $\lvert1\rangle$ with probability $\frac14$. Find $\operatorname{tr}\hat\rho^2$.
::: solution
$\hat\rho = \operatorname{diag}(\frac34, \frac14)$, so $\operatorname{tr}\hat\rho^2 = \frac{9}{16} + \frac{1}{16} = \frac{10}{16} = \frac58$. It lies between $\frac12$ (maximally mixed) and $1$ (pure). The Bloch vector is $(0, 0, \frac12)$.
:::
:::

::: exercise A correlation at sixty degrees {level=1 check="-1/2"}
In the singlet, Alice measures spin along $z$ and Bob along an axis at $60^\circ$ to $z$. Find $E(\mathbf a, \mathbf b)$, and the probability that their results ($\pm1$) agree.
::: solution
By [[#eq-correlation]], $E = -\cos60^\circ = -\frac12$. Since $E = P_{\mathrm{same}} - P_{\mathrm{opposite}}$ and the two probabilities add to $1$, $P_{\mathrm{same}} = (1 + E)/2 = \frac14$.
:::
:::

::: exercise A Bloch vector {level=1 check="1/2"}
Find the Bloch vector of $\hat\rho = \begin{pmatrix}\frac12 & \frac14\\ \frac14 & \frac12\end{pmatrix}$ and its length.
::: solution
Compare with [[#eq-bloch]]: $\frac12(\mathbb 1 + r_x\sigma_x + r_y\sigma_y + r_z\sigma_z)$ has diagonal $\frac12(1\pm r_z)$ and off-diagonal element $\frac12(r_x - ir_y)$ in the upper right. So $r_z = 0$, $r_x = \frac12$, $r_y = 0$, and $\lvert\mathbf r\rvert = \frac12$: a mixed state, partly polarised along $+x$.
:::
:::

::: exercise Entanglement entropy {level=2 check="-(cos(pi/8)^2*log2(cos(pi/8)^2) + sin(pi/8)^2*log2(sin(pi/8)^2))"}
Find the entanglement entropy, in bits, of $\cos(\pi/8)\lvert00\rangle + \sin(\pi/8)\lvert11\rangle$.
::: solution
The state is in Schmidt form with $p_1 = \cos^2(\pi/8) = \frac{2 + \sqrt2}{4} = 0.8536$ and $p_2 = \sin^2(\pi/8) = 0.1464$. Then

$$
S = -p_1\log_2p_1 - p_2\log_2p_2 = 0.8536\times0.2284 + 0.1464\times2.7716 = 0.601\,\mathrm{bits}.
$$
:::
:::

::: exercise A noisy singlet {level=2 check="1/sqrt(2)"}
A source produces the **Werner state** $\hat\rho = p\,\lvert\Psi^-\rangle\langle\Psi^-\rvert + (1 - p)\,\frac14\mathbb 1$, a singlet with probability $p$ and complete noise otherwise. Find the CHSH value at the settings of [[#ex-violation]] and the smallest $p$ for which the inequality is violated.
::: solution
Every correlation $\operatorname{tr}(\hat\rho\,\hat A\otimes\hat B)$ is linear in $\hat\rho$. For the noise part, $\operatorname{tr}(\frac14\mathbb 1\,(\boldsymbol\sigma\cdot\mathbf a)\otimes(\boldsymbol\sigma\cdot\mathbf b)) = \frac14\operatorname{tr}(\boldsymbol\sigma\cdot\mathbf a)\operatorname{tr}(\boldsymbol\sigma\cdot\mathbf b) = 0$. So $E = -p\,\mathbf a\cdot\mathbf b$ and $\lvert S\rvert = 2\sqrt2\,p$. Violation needs $2\sqrt2p > 2$, that is $p > 1/\sqrt2 = 0.707$. (The Werner state is entangled for all $p > \frac13$; for $\frac13 < p \le 1/\sqrt2$ it is entangled but does not violate CHSH, which shows that entanglement and Bell non-locality are not the same thing.)
:::
:::

::: exercise The Bell basis {level=2}
Show that the four Bell states [[#eq-bell-states]] are orthonormal, that $(\sigma_x\otimes\mathbb 1)\lvert\Phi^+\rangle = \lvert\Psi^+\rangle$ and $(\sigma_z\otimes\mathbb 1)\lvert\Phi^+\rangle = \lvert\Phi^-\rangle$, and that $\lvert\Psi^-\rangle$ is the only one of the four that is unchanged (up to phase) when the same rotation is applied to both qubits.
::: solution
Each Bell state is a combination of two of the basis states with coefficients $\pm1/\sqrt2$, so each has norm $1$. $\lvert\Phi^\pm\rangle$ involve $\lvert00\rangle, \lvert11\rangle$ and $\lvert\Psi^\pm\rangle$ involve $\lvert01\rangle, \lvert10\rangle$, so the $\Phi$'s are orthogonal to the $\Psi$'s; and $\langle\Phi^+\vert\Phi^-\rangle = \frac12(1 - 1) = 0$, likewise for the $\Psi$'s. Next, $\sigma_x$ swaps $\lvert0\rangle\leftrightarrow\lvert1\rangle$, so $(\sigma_x\otimes\mathbb 1)\lvert\Phi^+\rangle = \frac1{\sqrt2}(\lvert10\rangle + \lvert01\rangle) = \lvert\Psi^+\rangle$; $\sigma_z$ multiplies $\lvert1\rangle$ by $-1$, so $(\sigma_z\otimes\mathbb 1)\lvert\Phi^+\rangle = \frac1{\sqrt2}(\lvert00\rangle - \lvert11\rangle) = \lvert\Phi^-\rangle$. Finally, $\lvert\Psi^-\rangle$ is the spin singlet, with total spin $0$, so the rotation $e^{-i\theta\mathbf n\cdot(\hat{\mathbf S}_1 + \hat{\mathbf S}_2)/\hbar}$ acts on it as the identity. The other three span the triplet, $S = 1$, and are mixed among themselves by rotations: for instance, the rotation by $\pi/2$ about $z$ applied to both qubits, $e^{-i\pi\sigma_z/4}\otimes e^{-i\pi\sigma_z/4}$, multiplies $\lvert00\rangle$ by $-i$ and $\lvert11\rangle$ by $i$, so it maps $\lvert\Phi^+\rangle$ to $-i\lvert\Phi^-\rangle$. That rotational invariance is why the singlet gives $E = -\mathbf a\cdot\mathbf b$ for *every* pair of axes.
:::
:::

::: exercise No signalling {#exr-nosignal level=3}
Prove that if Alice applies any unitary $\hat U_A$ to her part of an arbitrary state $\hat\rho_{AB}$, or measures any observable on it and discards the result, Bob's reduced state $\hat\rho_B$ is unchanged.
::: solution
Use the property of the partial trace $\operatorname{tr}_A\bigl((\hat X_A\otimes\mathbb 1)\hat\rho_{AB}(\hat Y_A\otimes\mathbb 1)\bigr) = \operatorname{tr}_A\bigl((\hat Y_A\hat X_A\otimes\mathbb 1)\hat\rho_{AB}\bigr)$, which follows from cyclicity of the trace over $A$ in the matrix elements $\langle j\vert\cdot\vert j'\rangle_B$. For a unitary, $\hat\rho_{AB} \to (\hat U_A\otimes\mathbb 1)\hat\rho_{AB}(\hat U_A^\dagger\otimes\mathbb 1)$, and the new reduced state is $\operatorname{tr}_A((\hat U_A^\dagger\hat U_A\otimes\mathbb 1)\hat\rho_{AB}) = \operatorname{tr}_A\hat\rho_{AB} = \hat\rho_B$.

For a measurement with projectors $\hat\Pi_k$ on $A$ ($\sum_k\hat\Pi_k = \mathbb 1$, $\hat\Pi_k^2 = \hat\Pi_k$) whose result is discarded, the state becomes $\sum_k(\hat\Pi_k\otimes\mathbb 1)\hat\rho_{AB}(\hat\Pi_k\otimes\mathbb 1)$, and

$$
\operatorname{tr}_A\sum_k(\hat\Pi_k\otimes\mathbb 1)\hat\rho_{AB}(\hat\Pi_k\otimes\mathbb 1) = \operatorname{tr}_A\Bigl(\Bigl(\sum_k\hat\Pi_k\Bigr)\otimes\mathbb 1\;\hat\rho_{AB}\Bigr) = \hat\rho_B.
$$

Since all of Bob's statistics are $\operatorname{tr}(\hat\rho_B\hat O_B)$, nothing Alice does locally is visible to him. Bob can see an effect only conditioned on Alice's result, which he must be told.
:::
:::

::: exercise Product states have pure parts {level=3}
Prove that a pure state $\lvert\psi\rangle_{AB}$ is a product if and only if $\operatorname{tr}\hat\rho_A^2 = 1$.
::: solution
By [[#thm-schmidt]], $\hat\rho_A = \sum_kp_k\lvert u_k\rangle\langle u_k\rvert$ with orthonormal $\lvert u_k\rangle$, so $\operatorname{tr}\hat\rho_A^2 = \sum_kp_k^2$. With $p_k > 0$ and $\sum p_k = 1$, this equals $1$ if and only if there is a single term, $r = 1$, which by [[#thm-schmidt]] means the state is a product. Equivalently, by [[#thm-density]], the state is a product if and only if $\hat\rho_A$ is pure. For mixed states of $AB$ the criterion fails: $\frac12(\lvert00\rangle\langle00\rvert + \lvert11\rangle\langle11\rvert)$ has mixed parts but is not entangled, only classically correlated.
:::
:::

::: exercise Bell's theorem without inequalities {level=3}
The GHZ state of three qubits is $\lvert\mathrm{GHZ}\rangle = \frac{1}{\sqrt2}(\lvert000\rangle + \lvert111\rangle)$. Show that it is an eigenstate of $\sigma_x\sigma_x\sigma_x$ with eigenvalue $+1$ and of $\sigma_x\sigma_y\sigma_y$, $\sigma_y\sigma_x\sigma_y$, $\sigma_y\sigma_y\sigma_x$ with eigenvalue $-1$ (one Pauli matrix per qubit). Then show that no assignment of pre-existing values $x_k, y_k = \pm1$ to the three qubits can reproduce all four results.
::: solution
$\sigma_x$ flips a qubit; $\sigma_y\lvert0\rangle = i\lvert1\rangle$ and $\sigma_y\lvert1\rangle = -i\lvert0\rangle$. Then $\sigma_x\sigma_x\sigma_x$ maps $\lvert000\rangle\leftrightarrow\lvert111\rangle$ and leaves the GHZ state unchanged: eigenvalue $+1$. For $\sigma_x\sigma_y\sigma_y$, $\lvert000\rangle \to \lvert1\rangle(i\lvert1\rangle)(i\lvert1\rangle) = -\lvert111\rangle$ and $\lvert111\rangle \to \lvert0\rangle(-i\lvert0\rangle)(-i\lvert0\rangle) = -\lvert000\rangle$, so the state goes to minus itself: eigenvalue $-1$. The other two orderings are the same calculation.

Suppose each qubit carries values $x_k$, $y_k \in \{\pm1\}$ for the two measurements, independent of what is measured on the others (locality). Quantum mechanics predicts with certainty $x_1y_2y_3 = -1$, $y_1x_2y_3 = -1$, $y_1y_2x_3 = -1$. Multiplying the three, each $y_k$ appears twice and $y_k^2 = 1$, so $x_1x_2x_3 = (-1)^3 = -1$. But quantum mechanics predicts $x_1x_2x_3 = +1$ with certainty. The contradiction is total, not statistical: a single run of the $\sigma_x\sigma_x\sigma_x$ measurement refutes the model. This argument is due to Greenberger, Horne and Zeilinger (1989), in the form given by Mermin (1990).
:::
:::
