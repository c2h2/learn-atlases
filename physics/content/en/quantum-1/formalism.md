So far we have solved problems: a wavefunction, a potential, a differential equation, some integrals. Along the way a pattern kept recurring. Energy eigenfunctions were orthogonal, any state could be expanded in them, the squared moduli of the coefficients behaved like probabilities, operators such as $\hat x$ and $\hat p$ failed to commute, and the product $\Delta x\,\Delta p$ never fell below $\hbar/2$. This chapter explains why. The explanation is that quantum states are vectors in a complex inner-product space, observables are Hermitian operators on that space, and the predictions of the theory are statements of linear algebra.

The pay-off is large. Once the structure is in place, the same rules handle a particle on a line, an electron's spin, which has no wavefunction in the ordinary sense, and systems of many particles. The uncertainty principle becomes a theorem about any pair of observables, with a two-line proof. The angular momentum, hydrogen and spin chapters that follow are applications of what is set up here.

You will need the linear algebra of complex vector spaces: inner products, orthonormal bases, eigenvalues and Hermitian matrices. The Maths Atlas lessons on [inner products](/learn/maths/lesson.php?c=linear-algebra&l=inner-products) and the [spectral theorem](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem) cover them. We state results for finite dimensions with proofs, and say what changes in the infinite-dimensional spaces that wavefunctions live in. A full mathematical treatment of the infinite-dimensional case is in the references (Shankar, chapter 1, is a gentle start; von Neumann's book is the original).

## States as vectors {#states}

The set of square-integrable functions on the real line is a vector space: a sum of two square-integrable functions is square-integrable, and so is a complex multiple. It carries a natural inner product.

::: definition Hilbert space and inner product {#def-hilbert}
The space $L^2(\R)$ consists of the complex functions $f$ with $\int_{-\infty}^\infty\abs f^2\,\dd x < \infty$. The **inner product** of two such functions is

$$
\langle f|g\rangle = \int_{-\infty}^\infty f(x)^*g(x)\,\dd x,
$$ {#eq-inner}

and the **norm** is $\norm f = \sqrt{\langle f|f\rangle}$. The inner product is linear in its second argument, conjugate-linear in its first, satisfies $\langle g|f\rangle = \langle f|g\rangle^*$, and $\langle f|f\rangle > 0$ unless $f = 0$. A complete inner-product space of this kind is a **Hilbert space**. The state of a quantum system is a vector $|\psi\rangle$ of unit norm in a Hilbert space, determined up to a global phase.
:::

We write a vector as a **ket** $|\psi\rangle$ and the linear map $|\phi\rangle \mapsto \langle\psi|\phi\rangle$ as a **bra** $\langle\psi|$. Putting a bra against a ket gives a number, the "bracket". The notation is Dirac's. It costs nothing and keeps track of which side of an inner product is conjugated. A wavefunction $\psi(x)$ is then the set of components of $|\psi\rangle$ along position, in a sense made precise below; the ket itself is more abstract and can be expanded in other bases.

Strictly, "$L^2$" consists of equivalence classes of functions that agree except on sets of zero length, and it includes functions with no derivative. That is irrelevant for the calculations of this course, and you can think of the states as smooth, rapidly decaying functions, which are dense in $L^2$. The completeness of $L^2$, meaning that Cauchy sequences converge, is what makes infinite expansions such as Fourier series meaningful.

::: lemma Cauchy–Schwarz inequality {#lem-schwarz}
For any vectors $f$, $g$ in an inner-product space, $\abs{\langle f|g\rangle}^2 \le \langle f|f\rangle\langle g|g\rangle$, with equality if and only if $f$ and $g$ are linearly dependent.
:::

::: proof
If $g = 0$ both sides vanish. Otherwise let $\lambda = \langle g|f\rangle/\langle g|g\rangle$ and consider $h = f - \lambda g$, the part of $f$ orthogonal to $g$. Then $\langle g|h\rangle = \langle g|f\rangle - \lambda\langle g|g\rangle = 0$, so

$$
0 \le \langle h|h\rangle = \langle f|f\rangle - \lambda\langle f|g\rangle = \langle f|f\rangle - \frac{\abs{\langle g|f\rangle}^2}{\langle g|g\rangle},
$$

where we used $\langle h|h\rangle = \langle f|h\rangle$ (because $\langle g|h\rangle = 0$) and $\langle f|g\rangle\langle g|f\rangle = \abs{\langle g|f\rangle}^2$. Multiplying by $\langle g|g\rangle > 0$ gives the inequality. Equality holds exactly when $h = 0$, i.e. $f = \lambda g$.
:::

In $L^2$ the inequality guarantees that $\langle f|g\rangle$ is finite whenever $f$ and $g$ are normalisable. It will also prove the uncertainty principle.

### Bases and expansions

A set of vectors $\{|e_n\rangle\}$ is **orthonormal** if $\langle e_m|e_n\rangle = \delta_{mn}$, and it is a **basis** (complete) if every vector can be written $|\psi\rangle = \sum_nc_n|e_n\rangle$. Taking the inner product with $\langle e_m|$ picks out the coefficients:

$$
c_n = \langle e_n|\psi\rangle, \qquad |\psi\rangle = \sum_n|e_n\rangle\langle e_n|\psi\rangle, \qquad \sum_n|e_n\rangle\langle e_n| = \hat 1.
$$ {#eq-completeness}

The last equation, the **completeness relation** or "resolution of the identity", is the most used identity in quantum mechanics. Insert it anywhere and you have expanded in that basis. For a normalised state, $\langle\psi|\psi\rangle = \sum_n\abs{c_n}^2 = 1$, which is Parseval's identity, and is why the $\abs{c_n}^2$ can be probabilities. The eigenfunctions of the infinite square well are such a basis, with $c_n = \langle\psi_n|\psi\rangle = \int\psi_n^*\psi\,\dd x$; this is what we used, without the notation, in [[quantum-1/schrodinger-equation#ex-expand]].

## Observables as Hermitian operators {#hermitian}

A linear operator $\hat A$ maps kets to kets, $|\psi\rangle \mapsto \hat A|\psi\rangle$. Measured quantities must be real, so we want operators whose expectation values $\langle\psi|\hat A|\psi\rangle$ are always real.

::: definition Adjoint and Hermitian operator {#def-hermitian}
The **adjoint** $\hat A^\dagger$ of an operator $\hat A$ is defined by $\langle f|\hat A^\dagger g\rangle = \langle\hat Af|g\rangle$ for all $f$, $g$. The operator is **Hermitian** if $\hat A^\dagger = \hat A$, that is,

$$
\langle f|\hat Ag\rangle = \langle\hat Af|g\rangle \quad\text{for all } f, g.
$$

In a finite orthonormal basis the matrix of $\hat A^\dagger$ is the conjugate transpose of the matrix of $\hat A$, and a Hermitian operator has a Hermitian matrix, $A_{mn} = A_{nm}^*$.
:::

Position is Hermitian, because $x$ is real: $\int f^*xg\,\dd x = \int(xf)^*g\,\dd x$. Momentum is Hermitian by integration by parts:

$$
\langle f|\hat pg\rangle = \int f^*\left(-i\hbar g'\right)\dd x = \bigl[-i\hbar f^*g\bigr]_{-\infty}^\infty + \int\left(i\hbar f'^*\right)g\,\dd x = \int\left(-i\hbar f'\right)^*g\,\dd x = \langle\hat pf|g\rangle.
$$

The factor $-i$ is essential: $\dd/\dd x$ on its own is **anti-Hermitian**, $(\dd/\dd x)^\dagger = -\dd/\dd x$, and multiplying by $i$ turns that into Hermitian. Sums of Hermitian operators, and real multiples of them, are Hermitian, so the Hamiltonian $\hat p^2/2m + V(\hat x)$ with real $V$ is Hermitian. A product $\hat A\hat B$ of Hermitian operators has adjoint $\hat B\hat A$, so it is Hermitian only if they commute; $\hat x\hat p$ is not Hermitian, but $\frac12(\hat x\hat p + \hat p\hat x)$ is.

::: theorem Eigenvalues and eigenvectors of Hermitian operators {#thm-hermitian}
Let $\hat A$ be Hermitian. Then
1. every expectation value $\langle\psi|\hat A|\psi\rangle$ is real;
2. every eigenvalue of $\hat A$ is real;
3. eigenvectors belonging to different eigenvalues are orthogonal.

In a finite-dimensional space, moreover, the eigenvectors of $\hat A$ can be chosen to form an orthonormal basis (the spectral theorem).
:::

::: proof
(1) $\langle\psi|\hat A\psi\rangle = \langle\hat A\psi|\psi\rangle = \langle\psi|\hat A\psi\rangle^*$, so it equals its own conjugate.

(2) If $\hat A|a\rangle = a|a\rangle$ with $|a\rangle \ne 0$, then $a\langle a|a\rangle = \langle a|\hat Aa\rangle$, which is real by (1), and $\langle a|a\rangle > 0$ is real, so $a$ is real.

(3) If $\hat A|a\rangle = a|a\rangle$ and $\hat A|b\rangle = b|b\rangle$, then

$$
b\langle a|b\rangle = \langle a|\hat Ab\rangle = \langle\hat Aa|b\rangle = a^*\langle a|b\rangle = a\langle a|b\rangle,
$$

using (2). So $(b - a)\langle a|b\rangle = 0$, and $a \ne b$ forces $\langle a|b\rangle = 0$.

For the spectral theorem in finite dimension $d$: the characteristic polynomial has a root $a_1$, with a unit eigenvector $|e_1\rangle$. The orthogonal complement $W$ of $|e_1\rangle$ is mapped into itself, because $w \in W$ implies $\langle e_1|\hat Aw\rangle = \langle\hat Ae_1|w\rangle = a_1\langle e_1|w\rangle = 0$. Restricted to $W$, $\hat A$ is still Hermitian, on a space of dimension $d - 1$. By induction it has an orthonormal eigenbasis of $W$, and adding $|e_1\rangle$ gives one for the whole space.
:::

In infinite dimensions the spectral theorem needs more care. Some Hermitian operators, like the Hamiltonians of the square well and the oscillator, have a **discrete spectrum** of normalisable eigenvectors forming a basis, as in finite dimensions. Others, like $\hat x$ and $\hat p$ on the whole line, have no normalisable eigenvectors at all: their spectrum is **continuous**. Many, like the hydrogen Hamiltonian, have both. The working rule, made rigorous by von Neumann's spectral theorem for self-adjoint operators, is that the eigenvectors of an observable are complete provided sums over continuous eigenvalues are replaced by integrals and Kronecker deltas by Dirac deltas.

### Continuous spectra: position and momentum

The eigenvalue equation for momentum is $-i\hbar f' = pf$, solved by $f_p(x) = e^{ipx/\hbar}/\sqrt{2\pi\hbar}$ for every real $p$. These plane waves are not in $L^2$, but they are orthonormal in the delta-function sense,

$$
\langle f_{p'}|f_p\rangle = \frac{1}{2\pi\hbar}\int_{-\infty}^\infty e^{i(p - p')x/\hbar}\,\dd x = \delta(p - p'),
$$

and complete: every $\psi \in L^2$ can be written $\psi(x) = \int\Phi(p)f_p(x)\,\dd p$ with

$$
\Phi(p) = \langle f_p|\psi\rangle = \frac{1}{\sqrt{2\pi\hbar}}\int_{-\infty}^\infty e^{-ipx/\hbar}\psi(x)\,\dd x.
$$ {#eq-momentum-space}

This is the Fourier transform of [[quantum-1/schrodinger-equation#free]], with $p = \hbar k$, and $\Phi(p)$ is the **momentum-space wavefunction**. Similarly the eigenfunctions of $\hat x$ with eigenvalue $x_0$ are $\delta(x - x_0)$, and the "components" of $|\psi\rangle$ along them are $\langle x_0|\psi\rangle = \psi(x_0)$. That is the precise sense in which the wavefunction is the position representation of the state, and $\Phi$ its momentum representation. Neither is more fundamental.

::: example Momentum distribution of a bound state {#ex-momentum}
The bound state of the delta-function well is $\psi(x) = \sqrt\kappa\,e^{-\kappa\abs x}$ ([[quantum-1/piecewise-potentials#delta]]). Find its momentum-space wavefunction, check that it is normalised, find the probability that a momentum measurement gives $\abs p < \hbar\kappa$, and compare $\langle p^2\rangle$ computed in the two representations.
::: solution
Split the integral [[#eq-momentum-space]] at $x = 0$ and write $p_0 = \hbar\kappa$:

$$
\Phi(p) = \sqrt{\frac{\kappa}{2\pi\hbar}}\left(\int_0^\infty e^{-(\kappa + ip/\hbar)x}\,\dd x + \int_{-\infty}^0e^{(\kappa - ip/\hbar)x}\,\dd x\right) = \sqrt{\frac{\kappa}{2\pi\hbar}}\left(\frac{1}{\kappa + ip/\hbar} + \frac{1}{\kappa - ip/\hbar}\right).
$$

The bracket is $2\kappa/(\kappa^2 + p^2/\hbar^2)$, so

$$
\Phi(p) = \sqrt{\frac{2}{\pi}}\,\frac{p_0^{3/2}}{p^2 + p_0^2}, \qquad \abs{\Phi(p)}^2 = \frac2\pi\,\frac{p_0^3}{(p^2 + p_0^2)^2}.
$$

It is real and even because $\psi$ is real and even. With $\int_{-\infty}^\infty\dd p/(p^2 + p_0^2)^2 = \pi/2p_0^3$, the total probability is $1$, as Plancherel's theorem promised. Over $-p_0 < p < p_0$, the antiderivative $\frac{1}{2p_0^2}\bigl(p/(p^2 + p_0^2) + p_0^{-1}\arctan(p/p_0)\bigr)$ gives

$$
P(\abs p < p_0) = \frac2\pi p_0^3\cdot\frac{1}{2p_0^3}\left(1 + \frac\pi2\right) = \frac12 + \frac1\pi = 0.818.
$$

For $\langle p^2\rangle$ in momentum space, $\int p^2\abs\Phi^2\,\dd p = \frac2\pi p_0^3\int\frac{p^2\,\dd p}{(p^2 + p_0^2)^2} = \frac2\pi p_0^3\cdot\frac{\pi}{2p_0} = p_0^2$. In position space, $\langle p^2\rangle = \hbar^2\int\abs{\psi'}^2\,\dd x = \hbar^2\kappa^2\int\abs\psi^2\,\dd x = \hbar^2\kappa^2$, the same. The momentum density falls off only like $1/p^4$, a consequence of the cusp in $\psi$ at the origin; a smooth wavefunction has a momentum density that falls off faster than any power. Sharp features in one representation mean long tails in the other.
:::
:::

## The postulates of measurement {#postulates}

We can now state the rules of quantum mechanics compactly. Different books order them differently; the content is standard.

::: axiom Postulates of quantum mechanics {#ax-postulates}
1. **States.** The state of an isolated system is a unit vector $|\psi\rangle$ in a Hilbert space, up to a global phase.
2. **Observables.** Each measurable quantity is represented by a Hermitian operator $\hat A$ whose eigenvectors are complete.
3. **Outcomes and probabilities (Born rule).** A measurement of $A$ yields one of the eigenvalues $a_n$ of $\hat A$. If $\{|a_n\rangle\}$ is an orthonormal eigenbasis, the probability of the result $a_n$ is $\abs{\langle a_n|\psi\rangle}^2$ (summed over an orthonormal basis of the eigenspace if $a_n$ is degenerate). For a continuous spectrum, $\abs{\langle a|\psi\rangle}^2\,\dd a$ is the probability of a result between $a$ and $a + \dd a$.
4. **Collapse.** Immediately after a measurement with result $a_n$, the state is the normalised projection of $|\psi\rangle$ onto the eigenspace of $a_n$.
5. **Evolution.** Between measurements, the state evolves by the Schrödinger equation $i\hbar\,\dd|\psi\rangle/\dd t = \hat H|\psi\rangle$.
:::

Postulate 3 with $\hat A = \hat x$ is the Born rule of [[quantum-1/schrodinger-equation#def-wavefunction]]: the eigenvectors are $\delta(x - x_0)$ and $\abs{\langle x_0|\psi\rangle}^2 = \abs{\psi(x_0)}^2$. With $\hat A = \hat p$ it says that $\abs{\Phi(p)}^2$ is the probability density of momentum. With $\hat A = \hat H$ it says that $\abs{c_n}^2$ is the probability of the energy $E_n$. In every case the mean of the distribution is

$$
\sum_na_n\abs{\langle a_n|\psi\rangle}^2 = \sum_n\langle\psi|a_n\rangle a_n\langle a_n|\psi\rangle = \langle\psi|\hat A\Bigl(\sum_n|a_n\rangle\langle a_n|\Bigr)|\psi\rangle = \langle\psi|\hat A|\psi\rangle,
$$

using $\hat A|a_n\rangle = a_n|a_n\rangle$ and completeness. So the expectation value $\langle\psi|\hat A|\psi\rangle$ of the earlier chapters is exactly the mean of the measured results, and the uncertainty $\Delta A$ is their standard deviation. A state has a definite value of $A$, with $\Delta A = 0$, if and only if it is an eigenvector of $\hat A$ (see the exercises).

Postulate 4 is what makes repeated measurements consistent: measure $A$, get $a_n$, measure again at once, and you get $a_n$ with certainty. It is also the most debated part of the theory. Nothing in this course depends on how one interprets it, only on the rule itself.

::: example A three-state system {#ex-three-state}
An observable $\hat A$ has orthonormal eigenvectors $|1\rangle$, $|2\rangle$, $|3\rangle$ with eigenvalues $a_1 = 1$, $a_2 = 2$, $a_3 = 3$ (in some unit). A system is prepared in the state $|\psi\rangle = N\bigl(|1\rangle + 2i|2\rangle - 2|3\rangle\bigr)$. Find $N$, the probabilities of each result, $\langle A\rangle$ and $\Delta A$, and the state after a measurement that gives $a_2$.
::: solution
Normalisation: $\langle\psi|\psi\rangle = \abs N^2\bigl(1 + \abs{2i}^2 + \abs{-2}^2\bigr) = 9\abs N^2$, so $N = 1/3$ (up to phase). The probabilities are the squared moduli of the components:

$$
P(1) = \frac19, \qquad P(2) = \frac49, \qquad P(3) = \frac49,
$$

which sum to $1$. The phases $i$ and $-1$ do not affect them. The mean and the mean square are

$$
\langle A\rangle = \frac{1 + 8 + 12}{9} = \frac{21}{9} = \frac73, \qquad \langle A^2\rangle = \frac{1 + 16 + 36}{9} = \frac{53}{9},
$$

so $(\Delta A)^2 = 53/9 - 49/9 = 4/9$ and $\Delta A = 2/3$. After a measurement giving $a_2$, the state collapses to $|2\rangle$ (the phase $i$ is global and can be dropped), and a second measurement of $A$ gives $2$ with probability $1$. The relative phases in $|\psi\rangle$ would matter for a measurement of a different observable that does not share this eigenbasis.
:::
:::

## Commutators and compatible observables {#commutators}

Two observables can be measured "together", in the sense that there are states with definite values of both, only under a condition on their commutator.

::: theorem Compatible observables {#thm-compatible}
Let $\hat A$ and $\hat B$ be Hermitian operators with complete sets of eigenvectors. They possess a common orthonormal eigenbasis if and only if $[\hat A, \hat B] = 0$.
:::

::: proof
If there is a common eigenbasis $\{|n\rangle\}$ with $\hat A|n\rangle = a_n|n\rangle$ and $\hat B|n\rangle = b_n|n\rangle$, then $\hat A\hat B|n\rangle = a_nb_n|n\rangle = \hat B\hat A|n\rangle$ for every basis vector, so $\hat A\hat B = \hat B\hat A$ by linearity.

Conversely, suppose $[\hat A, \hat B] = 0$, and let $|a\rangle$ be an eigenvector of $\hat A$ with eigenvalue $a$. Then $\hat A(\hat B|a\rangle) = \hat B\hat A|a\rangle = a(\hat B|a\rangle)$, so $\hat B$ maps the eigenspace $E_a$ of $\hat A$ into itself. If $E_a$ is one-dimensional, $\hat B|a\rangle$ is a multiple of $|a\rangle$, so $|a\rangle$ is already an eigenvector of $\hat B$. If $E_a$ is degenerate, $\hat B$ restricted to $E_a$ is a Hermitian operator on that (finite-dimensional, in the cases we need) subspace, and by the spectral theorem has an orthonormal eigenbasis of $E_a$. Those vectors are eigenvectors of both. Doing this in every eigenspace of $\hat A$, which are mutually orthogonal by [[#thm-hermitian]], gives a common orthonormal eigenbasis.
:::

The degenerate case is the important one. If $\hat A$ alone has degenerate eigenvalues, its eigenvalues do not label states uniquely, and we add commuting observables until the joint eigenvalues do. Such a set is a **complete set of commuting observables**. For hydrogen it will be $\hat H$, $\hat L^2$ and $\hat L_z$ (plus spin), and the labels $n$, $l$, $m$ are their joint eigenvalues.

The most important commutator is the **canonical commutation relation**, already used in [[quantum-1/harmonic-oscillator]]:

$$
[\hat x, \hat p] = i\hbar.
$$ {#eq-ccr}

It cannot hold in any finite-dimensional space, since the trace of a commutator of matrices is zero while the trace of $i\hbar\hat 1$ is not. Position and momentum need infinite dimensions. Commutators of functions of $\hat x$ and $\hat p$ follow from [[#eq-ccr]] and the product rule $[\hat A, \hat B\hat C] = [\hat A, \hat B]\hat C + \hat B[\hat A, \hat C]$.

::: example Some commutators {#ex-commutators}
Show that $[\hat x, \hat p^2] = 2i\hbar\hat p$, $[\hat x^2, \hat p] = 2i\hbar\hat x$, and $[\hat H, \hat x] = -i\hbar\hat p/m$ for $\hat H = \hat p^2/2m + V(\hat x)$. More generally show $[\hat p, f(\hat x)] = -i\hbar f'(\hat x)$.
::: solution
By the product rule, $[\hat x, \hat p^2] = [\hat x, \hat p]\hat p + \hat p[\hat x, \hat p] = 2i\hbar\hat p$. Similarly $[\hat x^2, \hat p] = \hat x[\hat x, \hat p] + [\hat x, \hat p]\hat x = 2i\hbar\hat x$. For the Hamiltonian, $V(\hat x)$ commutes with $\hat x$, so

$$
[\hat H, \hat x] = \frac{1}{2m}[\hat p^2, \hat x] = -\frac{1}{2m}[\hat x, \hat p^2] = -\frac{i\hbar}{m}\hat p.
$$

For a general function, act on a test function $g$: $[\hat p, f]g = -i\hbar(fg)' + i\hbar fg' = -i\hbar f'g$. So $[\hat p, f(\hat x)] = -i\hbar f'(\hat x)$, which reproduces $[\hat p, \hat x^2] = -2i\hbar\hat x$. Commutators with $\hat p$ act like $-i\hbar$ times differentiation with respect to $x$, and commutators with $\hat x$ like $i\hbar$ times differentiation with respect to $p$.
:::
:::

::: quiz
The operators $\hat A$ and $\hat B$ commute. Which statement follows?
- [ ] Every eigenvector of $\hat A$ is an eigenvector of $\hat B$.
- [x] There is a basis of states each having definite values of both $A$ and $B$.
- [ ] $\Delta A\,\Delta B = 0$ in every state.
- [ ] $A$ and $B$ have the same eigenvalues.
::: solution
[[#thm-compatible]] guarantees a common eigenbasis. It does not say every eigenvector of $\hat A$ is an eigenvector of $\hat B$: if $\hat A$ has a degenerate eigenvalue, a combination of states with different $B$ values is still an eigenvector of $\hat A$ but not of $\hat B$. (Take $\hat A = \hat 1$, which commutes with everything.) And in a generic superposition both $\Delta A$ and $\Delta B$ can be non-zero; commutation removes the lower bound on the product, it does not force the product to vanish.
:::
:::

## The uncertainty principle {#uncertainty}

::: theorem Robertson uncertainty relation {#thm-robertson}
For any Hermitian operators $\hat A$, $\hat B$ and any normalised state $|\psi\rangle$ in their domains,

$$
\Delta A\,\Delta B \ge \frac12\abs{\langle[\hat A, \hat B]\rangle}.
$$ {#eq-robertson}

In particular, for position and momentum,

$$
\Delta x\,\Delta p \ge \frac{\hbar}{2}.
$$ {#eq-heisenberg}
:::

::: proof
Let $\hat A_0 = \hat A - \langle A\rangle$ and $\hat B_0 = \hat B - \langle B\rangle$. These are Hermitian (we subtracted real multiples of the identity), they have the same commutator as $\hat A$ and $\hat B$, and $(\Delta A)^2 = \langle\psi|\hat A_0^2|\psi\rangle = \langle f|f\rangle$ with $|f\rangle = \hat A_0|\psi\rangle$. Similarly $(\Delta B)^2 = \langle g|g\rangle$ with $|g\rangle = \hat B_0|\psi\rangle$. By [[#lem-schwarz]],

$$
(\Delta A)^2(\Delta B)^2 = \langle f|f\rangle\langle g|g\rangle \ge \abs{\langle f|g\rangle}^2 \ge \bigl(\operatorname{Im}\langle f|g\rangle\bigr)^2 = \left(\frac{\langle f|g\rangle - \langle g|f\rangle}{2i}\right)^2.
$$

Now $\langle f|g\rangle = \langle\hat A_0\psi|\hat B_0\psi\rangle = \langle\psi|\hat A_0\hat B_0|\psi\rangle$ by hermiticity, and likewise $\langle g|f\rangle = \langle\psi|\hat B_0\hat A_0|\psi\rangle$. Their difference is $\langle[\hat A_0, \hat B_0]\rangle = \langle[\hat A, \hat B]\rangle$. Hence

$$
(\Delta A)^2(\Delta B)^2 \ge \left(\frac{1}{2i}\langle[\hat A, \hat B]\rangle\right)^2.
$$

The commutator of two Hermitian operators is anti-Hermitian, so $\langle[\hat A, \hat B]\rangle$ is purely imaginary and the bracket on the right is real; taking square roots gives [[#eq-robertson]]. With $[\hat x, \hat p] = i\hbar$, the right-hand side is $\frac12\abs{i\hbar} = \hbar/2$.
:::

Notice what the theorem is about. $\Delta A$ and $\Delta B$ are the spreads of results when $A$ is measured on many copies of $|\psi\rangle$ and $B$ is measured on many *other* copies of the same state. The theorem says no preparation makes both spreads small. It is not, in this form, a statement about the disturbance caused by measuring one and then the other, although that is how Heisenberg first motivated it.

When is the bound attained? Equality in Schwarz requires $|g\rangle = \lambda|f\rangle$, and dropping the real part requires $\operatorname{Re}\langle f|g\rangle = 0$, which makes $\lambda$ purely imaginary. For position and momentum, $\hat p_0\psi = ic\,\hat x_0\psi$ with real $c$ is a first-order differential equation whose normalisable solutions are Gaussians, as the exercises show. The ground state of the oscillator is one, which is why it achieved $\Delta x\,\Delta p = \hbar/2$.

::: example Uncertainties in the square well {#ex-well-uncertainty}
Find $\Delta x\,\Delta p$ for the state $\psi_n$ of the infinite square well of width $a$, and check [[#eq-heisenberg]].
::: solution
With $\psi_n = \sqrt{2/a}\sin(n\pi x/a)$, symmetry gives $\langle x\rangle = a/2$, and a standard integral (two integrations by parts) gives

$$
\langle x^2\rangle = \frac2a\int_0^ax^2\sin^2\frac{n\pi x}{a}\,\dd x = a^2\left(\frac13 - \frac{1}{2n^2\pi^2}\right),
$$

so $(\Delta x)^2 = a^2\bigl(\frac{1}{12} - \frac{1}{2n^2\pi^2}\bigr)$. The state is real, so $\langle p\rangle = 0$, and $\langle p^2\rangle = 2mE_n = n^2\pi^2\hbar^2/a^2$. Therefore

$$
\Delta x\,\Delta p = n\pi\hbar\sqrt{\frac{1}{12} - \frac{1}{2n^2\pi^2}} = \frac\hbar2\sqrt{\frac{n^2\pi^2}{3} - 2}.
$$

For $n = 1$ this is $0.568\,\hbar$, a little above the minimum $0.5\,\hbar$; the sine is close to, but not exactly, a Gaussian. For $n = 2$ it is $1.670\,\hbar$, and it grows linearly in $n$ for large $n$. Higher states have larger momenta, $\pm n\pi\hbar/a$, while their spread in position approaches the classical $a/\sqrt{12}$ of a uniform distribution.
:::
:::

::: widget plot
f: 0.5*sqrt(max(x^2*pi^2/3 - 2, 0)); x + 0.5; 0.5
x: 0, 6
y: 0, 7
labels: square well; oscillator; minimum ħ/2
caption: The product $\Delta x\,\Delta p$ in units of $\hbar$ against the quantum number $n$ (only integer points are states: $n = 1, 2, \ldots$ for the well, $n = 0, 1, \ldots$ for the oscillator). The square well, $\frac12\sqrt{n^2\pi^2/3 - 2}$, starts at $0.568$ for $n = 1$; the oscillator, $n + \frac12$, starts exactly on the bound $\frac12$ at $n = 0$. Both grow linearly for large $n$, with slopes $\pi/\sqrt{12} = 0.91$ and $1$.
:::

### How expectation values change in time

The commutator also governs dynamics.

::: theorem Generalised Ehrenfest theorem {#thm-ehrenfest-general}
For an observable $\hat Q$, possibly depending explicitly on time, and a state evolving by the Schrödinger equation,

$$
\deriv{}{t}\langle Q\rangle = \frac{i}{\hbar}\langle[\hat H, \hat Q]\rangle + \left\langle\pdv{\hat Q}{t}\right\rangle.
$$ {#eq-ehrenfest-general}
:::

::: proof
Differentiate $\langle\psi|\hat Q\psi\rangle$ by the product rule and use $\partial_t|\psi\rangle = -(i/\hbar)\hat H|\psi\rangle$:

$$
\deriv{}{t}\langle\psi|\hat Q\psi\rangle = \left\langle-\frac i\hbar\hat H\psi\middle|\hat Q\psi\right\rangle + \left\langle\psi\middle|\pdv{\hat Q}{t}\psi\right\rangle + \left\langle\psi\middle|\hat Q\left(-\frac i\hbar\hat H\psi\right)\right\rangle.
$$

The first term is $\frac i\hbar\langle\hat H\psi|\hat Q\psi\rangle = \frac i\hbar\langle\psi|\hat H\hat Q\psi\rangle$ (conjugate-linearity in the first slot turns $-i$ into $+i$, then hermiticity of $\hat H$). The third is $-\frac i\hbar\langle\psi|\hat Q\hat H\psi\rangle$. Together they give $\frac i\hbar\langle[\hat H, \hat Q]\rangle$.
:::

With $\hat Q = \hat x$, [[#ex-commutators]] gives $\frac i\hbar\langle-i\hbar\hat p/m\rangle = \langle p\rangle/m$, and with $\hat Q = \hat p$ it gives $-\langle V'\rangle$: the Ehrenfest theorem of [[quantum-1/schrodinger-equation#thm-ehrenfest]] is a special case. More importantly, an observable with no explicit time dependence that commutes with $\hat H$ has a constant expectation value in *every* state, and its probability distribution is constant too. That is the quantum meaning of a **conserved quantity**. Angular momentum in a central potential will be the first non-trivial example.

Combining [[#eq-ehrenfest-general]] with [[#thm-robertson]] for $\hat B = \hat H$ gives $\Delta Q\,\Delta E \ge \frac\hbar2\abs{\dd\langle Q\rangle/\dd t}$. Defining $\Delta t = \Delta Q/\abs{\dd\langle Q\rangle/\dd t}$, the time for $\langle Q\rangle$ to change by one standard deviation, this is the **energy–time uncertainty relation** $\Delta t\,\Delta E \ge \hbar/2$ of Mandelstam and Tamm (1945). Time is not an operator here; $\Delta t$ is a property of the state and of the chosen $Q$. A state with sharp energy changes slowly in everything, as a stationary state must.

### Unitary evolution

For a time-independent Hamiltonian the Schrödinger equation has the formal solution $|\psi(t)\rangle = \hat U(t)|\psi(0)\rangle$ with

$$
\hat U(t) = e^{-i\hat Ht/\hbar} = \sum_n e^{-iE_nt/\hbar}|n\rangle\langle n|,
$$

where the second form, in an energy eigenbasis $|n\rangle$, is how the exponential of an operator is defined and computed. Acting on $|\psi(0)\rangle = \sum_nc_n|n\rangle$ it reproduces the expansion [[quantum-1/schrodinger-equation#eq-general]]. The operator $\hat U$ is **unitary**, $\hat U^\dagger\hat U = \hat 1$, because each $e^{-iE_nt/\hbar}$ has modulus one. Unitary operators preserve inner products, $\langle\hat U\phi|\hat U\psi\rangle = \langle\phi|\psi\rangle$: probabilities are conserved and orthogonal states stay orthogonal, generalising the continuity equation of [[quantum-1/schrodinger-equation#thm-continuity]] and the overlap exercise of that chapter. Unitarity is the reason the Hamiltonian must be Hermitian; a non-Hermitian $\hat H$ would give probabilities that grow or decay.

There is an equivalent way to describe the same physics. Instead of letting states evolve and keeping operators fixed (the **Schrödinger picture**), one can keep the state fixed at $|\psi(0)\rangle$ and let operators evolve as $\hat A_H(t) = \hat U^\dagger\hat A\hat U$ (the **Heisenberg picture**). Expectation values are the same in both, since $\langle\psi(t)|\hat A|\psi(t)\rangle = \langle\psi(0)|\hat U^\dagger\hat A\hat U|\psi(0)\rangle$. Differentiating gives the Heisenberg equation $\dd\hat A_H/\dd t = (i/\hbar)[\hat H, \hat A_H]$, the operator form of [[#eq-ehrenfest-general]], and for the oscillator it yields $\hat x_H(t) = \hat x\cos\omega t + (\hat p/m\omega)\sin\omega t$, the classical solution with operators in place of numbers.

::: warning What the uncertainty principle does not say
Three readings are common and wrong. (1) "The particle has a definite position and momentum, but we cannot know them." The theorem is about the spread of outcomes in a state, and Bell-type experiments rule out the most natural hidden-value pictures. (2) "Every measurement has an error of at least $\hbar/2$." A single position measurement can be as precise as the apparatus allows; the constraint is on the momentum spread of the state it leaves behind. (3) "$\Delta E\,\Delta t \ge \hbar/2$ is the same kind of statement as $\Delta x\,\Delta p \ge \hbar/2$." There is no time operator, and the energy–time relation needs a separate definition of $\Delta t$, as above.
:::

::: widget plot
f: exp(-x^2/(2*s^2))/(s*sqrt(2*pi)); 2*s*exp(-2*s^2*x^2)/sqrt(2*pi)
x: -5, 5
y: 0, 1.6
labels: position density; momentum density
sliders: s=1:0.25:3:0.05
caption: A Gaussian state with $\Delta x = s$ (units with $\hbar = 1$): its position density $\abs{\psi(x)}^2$ and its momentum density $\abs{\Phi(p)}^2$, plotted against the same axis, which has $\Delta p = 1/2s$. Squeeze $s$ and the momentum density spreads; widen it and the momentum density sharpens. The product of the two widths stays exactly $\frac12$.
:::

::: history Hilbert space and the uncertainty relations
Werner Heisenberg's paper on the uncertainty relations, with its thought experiment of a gamma-ray microscope, appeared in *Zeitschrift für Physik* in 1927. The exact inequality $\Delta x\,\Delta p \ge \hbar/2$ for standard deviations was proved by Earle Kennard the same year, and Howard Percy Robertson proved the general form [[#eq-robertson]] for arbitrary observables in 1929. Erwin Schrödinger strengthened it in 1930 by keeping the real part that our proof discarded. The formulation in terms of Hilbert space is due to John von Neumann, whose *Mathematische Grundlagen der Quantenmechanik* (1932) put the spectral theory of unbounded self-adjoint operators on a rigorous footing. Paul Dirac's *Principles of Quantum Mechanics* (1930) gave the abstract formulation that physicists use, and the bra–ket notation appeared in a short paper of his in 1939.
:::

## Where this leads {#leads}

[[quantum-1/angular-momentum]] applies the machinery to the operators $\hat L_x$, $\hat L_y$, $\hat L_z$, which do not commute with each other, so only one component and $\hat L^2$ can be sharp at once. [[quantum-1/spin]] works in a two-dimensional Hilbert space, where every operator is a $2\times2$ matrix and the postulates can be tested directly in the Stern–Gerlach experiment. [[quantum-2]] uses the same framework for time-dependent perturbations, identical particles and entanglement, where the Hilbert space of a composite system is a tensor product.

::: summary
- States are unit vectors $|\psi\rangle$ in a Hilbert space, with inner product $\langle f|g\rangle = \int f^*g\,\dd x$ for wavefunctions; $\sum_n|e_n\rangle\langle e_n| = \hat 1$ for any orthonormal basis.
- Observables are Hermitian operators: their expectation values and eigenvalues are real and eigenvectors with different eigenvalues are orthogonal.
- A measurement of $A$ gives an eigenvalue $a_n$ with probability $\abs{\langle a_n|\psi\rangle}^2$ and leaves the system in the corresponding eigenstate; the mean is $\langle\psi|\hat A|\psi\rangle$.
- Position and momentum have continuous spectra; $\psi(x) = \langle x|\psi\rangle$ and $\Phi(p) = \langle p|\psi\rangle$ are Fourier transforms of each other.
- Commuting observables have a common eigenbasis; $[\hat x, \hat p] = i\hbar$.
- Robertson: $\Delta A\,\Delta B \ge \frac12\abs{\langle[\hat A, \hat B]\rangle}$, so $\Delta x\,\Delta p \ge \hbar/2$, with equality only for Gaussians.
- $\dd\langle Q\rangle/\dd t = (i/\hbar)\langle[\hat H, \hat Q]\rangle + \langle\partial_t\hat Q\rangle$; observables commuting with $\hat H$ are conserved.
:::

## Exercises {#exercises}

::: exercise Probabilities from components {level=1 check="4/9"}
In [[#ex-three-state]], what is the probability that a measurement of $A$ gives a result greater than $2.5$?
::: solution
Only $a_3 = 3$ exceeds $2.5$, with probability $\abs{-2/3}^2 = 4/9$.
:::
:::

::: exercise Hermitian or not? {level=1}
Which of the following operators on $L^2(\R)$ are Hermitian: (a) $\dd/\dd x$; (b) $i\,\dd/\dd x$; (c) $\dd^2/\dd x^2$; (d) $\hat x\hat p$?
::: solution
(a) Integration by parts gives $\langle f|g'\rangle = -\langle f'|g\rangle$, so $(\dd/\dd x)^\dagger = -\dd/\dd x$: anti-Hermitian, not Hermitian. (b) $(i\,\dd/\dd x)^\dagger = (\dd/\dd x)^\dagger(i)^* = (-\dd/\dd x)(-i) = i\,\dd/\dd x$: Hermitian. It is $-\hat p/\hbar$. (c) $\dd^2/\dd x^2 = -\hat p^2/\hbar^2$ is Hermitian (two integrations by parts). (d) $(\hat x\hat p)^\dagger = \hat p\hat x = \hat x\hat p - i\hbar \ne \hat x\hat p$: not Hermitian.
:::
:::

::: exercise Energy of a superposition {level=1 check="5/2"}
A particle in an infinite well is in the state $(\psi_1 + \psi_2)/\sqrt2$. Find $\langle H\rangle$ in units of $E_1$, and the probability that an energy measurement gives $E_2$.
::: solution
The probabilities are $\abs{1/\sqrt2}^2 = \frac12$ for each of $E_1$ and $E_2 = 4E_1$, so $\langle H\rangle = \frac12E_1 + \frac12(4E_1) = \frac52E_1$, and $P(E_2) = \frac12$. No measurement ever gives $\frac52E_1$ itself.
:::
:::

::: exercise The second state of the well {level=2 check="0.5*sqrt(4*pi^2/3 - 2)"}
Give $\Delta x\,\Delta p$, in units of $\hbar$, for the first excited state of the infinite square well.
::: solution
From [[#ex-well-uncertainty]] with $n = 2$: $\frac12\sqrt{4\pi^2/3 - 2} = 1.670$.
:::
:::

::: exercise Sharp values {level=2}
Show that $\Delta A = 0$ in the normalised state $|\psi\rangle$ if and only if $|\psi\rangle$ is an eigenvector of $\hat A$.
::: solution
If $\hat A|\psi\rangle = a|\psi\rangle$ then $\langle A\rangle = a$ and $\langle A^2\rangle = a^2$, so $\Delta A = 0$. Conversely, $(\Delta A)^2 = \langle\psi|\hat A_0^2|\psi\rangle = \norm{\hat A_0\psi}^2$ with $\hat A_0 = \hat A - \langle A\rangle$, by hermiticity. If this vanishes, $\hat A_0|\psi\rangle = 0$, i.e. $\hat A|\psi\rangle = \langle A\rangle|\psi\rangle$.
:::
:::

::: exercise A two-state check of Robertson {level=2 check="1"}
In a two-dimensional space with orthonormal basis $|1\rangle$, $|2\rangle$, let $\hat A$ have matrix $\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$ and $\hat B$ have matrix $\begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}$. In the state $|\psi\rangle = (|1\rangle + i|2\rangle)/\sqrt2$, compute $\Delta A$, $\Delta B$ and $\frac12\abs{\langle[\hat A, \hat B]\rangle}$, and give $\Delta A\,\Delta B$.
::: solution
In the basis, $\psi = \frac{1}{\sqrt2}(1, i)$. Then $\hat A\psi = \frac{1}{\sqrt2}(i, 1)$, so $\langle A\rangle = \frac12(1\cdot i + (-i)\cdot1) = 0$, and $\hat A^2 = \hat 1$ gives $\langle A^2\rangle = 1$, so $\Delta A = 1$. Similarly $\hat B\psi = \frac{1}{\sqrt2}(1, -i)$ gives $\langle B\rangle = \frac12(1 - 1) = 0$ and $\hat B^2 = \hat 1$, so $\Delta B = 1$. The commutator is

$$
[\hat A, \hat B] = \begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix} - \begin{pmatrix}0 & 1\\ -1 & 0\end{pmatrix} = \begin{pmatrix}0 & -2\\ 2 & 0\end{pmatrix},
$$

and $\langle[\hat A, \hat B]\rangle = \frac12\bigl(1\cdot(-2i) + (-i)\cdot 2\bigr) = -2i$. So $\frac12\abs{\langle[\hat A, \hat B]\rangle} = 1 = \Delta A\,\Delta B$: this state saturates the bound. These matrices are the Pauli matrices $\sigma_x$ and $\sigma_z$ of [[quantum-1/spin]], and $|\psi\rangle$ is the eigenstate of $\sigma_y$.
:::
:::

::: exercise Minimum-uncertainty states are Gaussian {level=3}
Show that a normalisable $\psi$ attains $\Delta x\,\Delta p = \hbar/2$ only if $\psi(x) = A\exp\bigl(-c(x - \langle x\rangle)^2/2\hbar + i\langle p\rangle x/\hbar\bigr)$ for some real $c > 0$.
::: hint
Follow the equality conditions in the proof of [[#thm-robertson]].
:::
::: solution
Equality requires equality in Schwarz, so $|g\rangle = \lambda|f\rangle$ for some $\lambda$, and also $\operatorname{Re}\langle f|g\rangle = 0$. With $\langle f|g\rangle = \lambda\langle f|f\rangle$ and $\langle f|f\rangle > 0$, the second condition says $\lambda = ic$ is purely imaginary. (If $\langle f|f\rangle = 0$ then $\Delta x = 0$, impossible for a normalisable function.) Writing $x_0 = \langle x\rangle$ and $p_0 = \langle p\rangle$, the condition $\hat p_0\psi = ic\,\hat x_0\psi$ reads

$$
-i\hbar\psi' - p_0\psi = ic(x - x_0)\psi, \qquad \frac{\psi'}{\psi} = \frac{ip_0}{\hbar} - \frac{c}{\hbar}(x - x_0).
$$

Integrating, $\psi = A\exp\bigl(ip_0x/\hbar - c(x - x_0)^2/2\hbar\bigr)$. Normalisability requires $c > 0$. Every such Gaussian does attain the bound, since $\Delta x^2 = \hbar/2c$ and $\Delta p^2 = c\hbar/2$.
:::
:::

::: exercise The virial theorem {level=3}
Apply [[#thm-ehrenfest-general]] to $\hat Q = \hat x\hat p$ in a stationary state to show that $2\langle T\rangle = \langle x\,V'(x)\rangle$. Deduce that $\langle T\rangle = \langle V\rangle$ for the harmonic oscillator, and $2\langle T\rangle = -\langle V\rangle$ for a potential $V \propto -1/\abs x$.
::: solution
In a stationary state every expectation value is constant, so $\langle[\hat H, \hat x\hat p]\rangle = 0$. Compute the commutator with the product rule:

$$
[\hat H, \hat x\hat p] = [\hat H, \hat x]\hat p + \hat x[\hat H, \hat p] = -\frac{i\hbar}{m}\hat p^2 + \hat x\,(i\hbar V'(\hat x)),
$$

using [[#ex-commutators]] for $[\hat H, \hat x]$, and $[\hat H, \hat p] = [V, \hat p] = i\hbar V'$. Setting the expectation value to zero gives $\langle p^2\rangle/m = \langle xV'\rangle$, i.e. $2\langle T\rangle = \langle xV'\rangle$.

For $V = \frac12m\omega^2x^2$, $xV' = m\omega^2x^2 = 2V$, so $\langle T\rangle = \langle V\rangle$, as found with ladder operators. For $V = -k/\abs x$, $xV' = k/\abs x = -V$, so $2\langle T\rangle = -\langle V\rangle$ and $E = \langle T\rangle + \langle V\rangle = -\langle T\rangle$. The same relation holds for the three-dimensional Coulomb potential, and explains why Bohr's kinetic energy was minus the total energy.
:::
:::
