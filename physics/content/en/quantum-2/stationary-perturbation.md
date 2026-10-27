The hydrogen atom of [[quantum-1/hydrogen]] is solved exactly, and its levels depend only on the principal quantum number $n$. Look at the Balmer line $\mathrm H_\alpha$ through a good spectrometer and it is not one line but several, a few gigahertz apart. Put the atom in a magnet and the lines split further; put it in an electric field and they split in a different pattern. None of this is in the Coulomb Hamiltonian. It comes from small extra terms: relativistic kinematics, the interaction of the electron's spin with its orbital motion, an external field. Each extra term is too awkward to solve exactly together with the Coulomb potential, and each is small.

This chapter turns "small" into a systematic method. We write the Hamiltonian as a solvable part plus a correction, expand the energies and states in powers of the correction, and read off the first few terms. The method is called **stationary** (or time-independent) **perturbation theory**, because the correction does not depend on time; [[quantum-2/time-dependent]] treats corrections that do. We derive the first- and second-order formulae, see why degenerate levels need separate treatment, and then apply both to the fine structure of hydrogen and to the Zeeman and Stark effects. The last section is the variational method, which gives upper bounds on ground-state energies when no small parameter is available, and its first triumph: the ground state of helium to within two per cent.

The language is that of [[quantum-1/formalism]]: kets, Hermitian operators, orthonormal eigenbases. Angular momentum addition from [[quantum-1/angular-momentum]] and spin from [[quantum-1/spin]] are used in the fine-structure section. The same ideas, with a chemist's emphasis, appear in the Chemistry Atlas lesson on [approximation methods](/learn/chemistry/lesson.php?c=quantum-chemistry&l=approximation-methods).

## Setting up the expansion {#setup}

Suppose we know the complete solution of an **unperturbed** problem,

$$
\hat H^{0}\lvert n^{0}\rangle = E_n^{0}\lvert n^{0}\rangle, \qquad \langle m^{0}\vert n^{0}\rangle = \delta_{mn},
$$ {#eq-unperturbed}

and we want the eigenvalues of $\hat H = \hat H^{0} + \hat H'$, where $\hat H'$ is in some sense small. To keep track of orders we insert a bookkeeping parameter $\lambda$ and study $\hat H(\lambda) = \hat H^{0} + \lambda\hat H'$; at the end we set $\lambda = 1$. Every power of $\lambda$ in the answer then marks one power of $\hat H'$.

::: definition Perturbation series {#def-series}
Let $\hat H(\lambda) = \hat H^{0} + \lambda\hat H'$ with $\hat H^{0}$ and $\hat H'$ Hermitian. The **perturbation series** for the eigenvalue $E_n(\lambda)$ and eigenvector $\lvert n(\lambda)\rangle$ that reduce to $E_n^{0}$ and $\lvert n^{0}\rangle$ at $\lambda = 0$ are the formal power series

$$
E_n = E_n^{0} + \lambda E_n^{1} + \lambda^2E_n^{2} + \cdots, \qquad \lvert n\rangle = \lvert n^{0}\rangle + \lambda\lvert n^{1}\rangle + \lambda^2\lvert n^{2}\rangle + \cdots.
$$ {#eq-series}

$E_n^{k}$ is the **$k$th-order energy correction** and $\lvert n^{k}\rangle$ the $k$th-order correction to the state. We fix the normalisation and phase of $\lvert n\rangle$ by the convention $\langle n^{0}\vert n\rangle = 1$, which means $\langle n^{0}\vert n^{k}\rangle = 0$ for every $k \ge 1$.
:::

The convention $\langle n^{0}\vert n\rangle = 1$ costs nothing: it makes $\lvert n\rangle$ unnormalised by a factor $1 + O(\lambda^2)$, which can be repaired at the end. It saves a great deal of algebra, because the corrections to the state are then orthogonal to the unperturbed state and can be expanded in the other unperturbed states alone.

What does "small" mean? We will find that the expansion parameter is the ratio of a matrix element of $\hat H'$ between two unperturbed states to the energy difference of those states,

$$
\left\lvert\frac{\langle m^{0}\vert\hat H'\vert n^{0}\rangle}{E_n^{0} - E_m^{0}}\right\rvert \ll 1.
$$

The perturbation has to be weak compared with the level spacing, not compared with the energy itself. That is why degeneracy, where a level spacing is zero, needs special treatment.

::: remark Is the series convergent?
Often it is not. For the anharmonic oscillator $\hat H = \hat p^2/2m + \frac12 m\omega^2\hat x^2 + \lambda\hat x^4$ the series in $\lambda$ has zero radius of convergence: for any $\lambda < 0$ the potential is unbounded below, so the problem changes character however small $\lambda$ is. The series is still **asymptotic**: its first few terms approximate the exact answer better and better as $\lambda \to 0$. In practice one computes one or two orders and checks them against something independent.
:::

## Non-degenerate perturbation theory {#nondegenerate}

Substitute [[#eq-series]] into $\hat H\lvert n\rangle = E_n\lvert n\rangle$ and collect powers of $\lambda$. The orders $\lambda^0$, $\lambda^1$ and $\lambda^2$ give

$$
\begin{aligned}
\lambda^0:&\quad \hat H^{0}\lvert n^{0}\rangle = E_n^{0}\lvert n^{0}\rangle, \\
\lambda^1:&\quad \hat H^{0}\lvert n^{1}\rangle + \hat H'\lvert n^{0}\rangle = E_n^{0}\lvert n^{1}\rangle + E_n^{1}\lvert n^{0}\rangle, \\
\lambda^2:&\quad \hat H^{0}\lvert n^{2}\rangle + \hat H'\lvert n^{1}\rangle = E_n^{0}\lvert n^{2}\rangle + E_n^{1}\lvert n^{1}\rangle + E_n^{2}\lvert n^{0}\rangle.
\end{aligned}
$$ {#eq-orders}

The zeroth-order equation is the unperturbed problem. Everything else follows by taking inner products with unperturbed states.

::: theorem Non-degenerate perturbation theory {#thm-nondegenerate}
Let $E_n^{0}$ be a non-degenerate eigenvalue of $\hat H^{0}$, and write $H'_{mn} = \langle m^{0}\vert\hat H'\vert n^{0}\rangle$. Then

$$
E_n^{1} = H'_{nn} = \langle n^{0}\vert\hat H'\vert n^{0}\rangle,
$$ {#eq-first}

$$
\lvert n^{1}\rangle = \sum_{m\ne n}\frac{H'_{mn}}{E_n^{0} - E_m^{0}}\,\lvert m^{0}\rangle,
$$ {#eq-state1}

$$
E_n^{2} = \sum_{m\ne n}\frac{\lvert H'_{mn}\rvert^2}{E_n^{0} - E_m^{0}}.
$$ {#eq-second}
:::

::: proof
Take the inner product of the first-order equation in [[#eq-orders]] with $\langle n^{0}\rvert$. Because $\hat H^{0}$ is Hermitian, $\langle n^{0}\vert\hat H^{0}\vert n^{1}\rangle = E_n^{0}\langle n^{0}\vert n^{1}\rangle$, and this cancels the matching term on the right. What remains is $\langle n^{0}\vert\hat H'\vert n^{0}\rangle = E_n^{1}\langle n^{0}\vert n^{0}\rangle = E_n^{1}$, which is [[#eq-first]].

Now take the inner product of the same equation with $\langle m^{0}\rvert$ for $m \ne n$. Orthogonality kills the $E_n^{1}$ term, and $\langle m^{0}\vert\hat H^{0} = E_m^{0}\langle m^{0}\rvert$ gives

$$
E_m^{0}\langle m^{0}\vert n^{1}\rangle + H'_{mn} = E_n^{0}\langle m^{0}\vert n^{1}\rangle, \qquad \langle m^{0}\vert n^{1}\rangle = \frac{H'_{mn}}{E_n^{0} - E_m^{0}}.
$$

The division is legal because $E_n^{0}$ is non-degenerate, so $E_m^{0} \ne E_n^{0}$ for every $m \ne n$. The unperturbed states form a basis, and by the convention of [[#def-series]] the component along $\lvert n^{0}\rangle$ is zero, so expanding $\lvert n^{1}\rangle = \sum_m\lvert m^{0}\rangle\langle m^{0}\vert n^{1}\rangle$ gives [[#eq-state1]].

Finally take the inner product of the second-order equation with $\langle n^{0}\rvert$. The terms in $\lvert n^{2}\rangle$ cancel as before, $\langle n^{0}\vert n^{1}\rangle = 0$ removes the $E_n^{1}$ term, and

$$
E_n^{2} = \langle n^{0}\vert\hat H'\vert n^{1}\rangle = \sum_{m\ne n}\frac{H'_{nm}H'_{mn}}{E_n^{0} - E_m^{0}}.
$$

Since $\hat H'$ is Hermitian, $H'_{nm} = (H'_{mn})^*$, and the numerator is $\lvert H'_{mn}\rvert^2$. This is [[#eq-second]].
:::

The first-order shift is simply the expectation value of the perturbation in the unperturbed state. It is what you would guess: to first order the state does not have time to adjust, and the energy changes by the average of the extra potential. The second-order shift is the energy gained by letting the state adjust, by mixing in other states.

::: corollary The ground state is pushed down at second order {#cor-ground}
If $\lvert 0^{0}\rangle$ is a non-degenerate ground state, then $E_0^{2} \le 0$, with equality only if $\hat H'$ connects $\lvert 0^{0}\rangle$ to no other state.
:::

::: proof
For the ground state every denominator $E_0^{0} - E_m^{0}$ in [[#eq-second]] is negative, and every numerator $\lvert H'_{m0}\rvert^2$ is non-negative.
:::

More generally, second order makes levels **repel**: a level is pushed down by the levels above it and up by the levels below it, and most strongly by its nearest neighbours.

::: example A charged oscillator in a uniform field {#ex-charged-oscillator}
A particle of charge $q$ and mass $m$ in the oscillator potential $\frac12 m\omega^2x^2$ is placed in a uniform electric field $\mathcal E$ along $x$, so that $\hat H' = -q\mathcal E\hat x$. Find the energy shifts of every level to second order, and compare with the exact answer.
::: solution
From [[quantum-1/harmonic-oscillator]], $\hat x = \sqrt{\hbar/2m\omega}\,(\hat a + \hat a^\dagger)$, so the only non-zero matrix elements of $\hat x$ between oscillator states are

$$
\langle n-1\vert\hat x\vert n\rangle = \sqrt{\frac{\hbar}{2m\omega}}\sqrt n, \qquad \langle n+1\vert\hat x\vert n\rangle = \sqrt{\frac{\hbar}{2m\omega}}\sqrt{n+1}.
$$

First order: $E_n^{1} = -q\mathcal E\langle n\vert\hat x\vert n\rangle = 0$, because every oscillator state has definite parity and $x$ is odd.

Second order: only $m = n\pm 1$ contribute to [[#eq-second]], with denominators $E_n^{0} - E_{n-1}^{0} = \hbar\omega$ and $E_n^{0} - E_{n+1}^{0} = -\hbar\omega$:

$$
E_n^{2} = q^2\mathcal E^2\frac{\hbar}{2m\omega}\left[\frac{n}{\hbar\omega} - \frac{n+1}{\hbar\omega}\right] = -\frac{q^2\mathcal E^2}{2m\omega^2}.
$$

The shift is the same for every level. Exactly, complete the square:

$$
\frac12 m\omega^2x^2 - q\mathcal Ex = \frac12 m\omega^2\left(x - \frac{q\mathcal E}{m\omega^2}\right)^2 - \frac{q^2\mathcal E^2}{2m\omega^2}.
$$

The field moves the centre of the oscillator and lowers every level by $q^2\mathcal E^2/2m\omega^2$. Second order is exact here, and all higher corrections vanish. The state correction [[#eq-state1]] mixes $\lvert n\pm1\rangle$ into $\lvert n\rangle$, which to first order is the shifted wavefunction: a small displacement $d$ changes $\psi(x)$ to $\psi(x - d) \approx \psi(x) - d\,\psi'(x)$, and $\psi'$ is a combination of the neighbouring eigenfunctions.
:::
:::

The next example has a known exact answer that is not a polynomial in the perturbation, so we can watch the series approximate it.

::: example A stiffer spring {#ex-stiffer}
The spring constant of an oscillator changes from $k = m\omega^2$ to $(1 + \varepsilon)k$, so $\hat H' = \frac12\varepsilon m\omega^2\hat x^2$. Find the first-order shift of level $n$ and compare with the exact energy.
::: solution
Use $\hat x^2 = (\hbar/2m\omega)(\hat a + \hat a^\dagger)^2 = (\hbar/2m\omega)(\hat a^2 + \hat a^{\dagger 2} + 2\hat a^\dagger\hat a + 1)$. The diagonal element is $\langle n\vert\hat x^2\vert n\rangle = (\hbar/2m\omega)(2n+1)$, so by [[#eq-first]]

$$
E_n^{1} = \frac12\varepsilon m\omega^2\cdot\frac{\hbar}{2m\omega}(2n+1) = \frac{\varepsilon}{2}\left(n + \frac12\right)\hbar\omega.
$$

Exactly, the new angular frequency is $\omega\sqrt{1+\varepsilon}$, so $E_n = (n+\frac12)\hbar\omega\sqrt{1+\varepsilon}$. The binomial series $\sqrt{1+\varepsilon} = 1 + \varepsilon/2 - \varepsilon^2/8 + \cdots$ reproduces the first-order term. [[#exr-stiffer2]] obtains the $-\varepsilon^2/8$ from [[#eq-second]]. The binomial series converges only for $\lvert\varepsilon\rvert < 1$: at $\varepsilon = -1$ the spring disappears and there are no bound states at all.
:::
:::

::: widget plot
f: sqrt(1+x); 1+x/2; 1+x/2-x^2/8
x: -0.95, 2
labels: exact; first order; second order
caption: Energy of any oscillator level divided by its unperturbed value, as a function of the fractional change $\varepsilon$ (horizontal axis) in the spring constant. Near $\varepsilon = 0$ the three curves are indistinguishable. Notice that the first-order line lies above the exact curve everywhere, as [[#cor-ground]] and the variational principle require for the ground state, and that the second-order parabola tracks the exact curve well out to $\varepsilon \approx 0.5$, then turns away. Near $\varepsilon = -1$ the exact curve plunges steeply to zero and no low-order polynomial can follow it.
:::

::: warning Unperturbed denominators, unperturbed states
Every quantity on the right of [[#eq-first]]–[[#eq-second]] is unperturbed: the states $\lvert m^{0}\rangle$, the energies $E_m^{0}$ in the denominators. It is a common mistake to "improve" the formula by inserting first-order-corrected energies in the denominators. That mixes orders inconsistently and does not give the second-order energy. A second mistake is to forget the sum is over a complete set, including continuum states when $\hat H^{0}$ has a continuous spectrum. For hydrogen in an electric field, roughly a fifth of the second-order shift of the ground state comes from the continuum.
:::

## Degenerate perturbation theory {#degenerate}

If $E_n^{0}$ is degenerate, the denominators in [[#eq-state1]] vanish for the other states of the same level, and the derivation breaks. The trouble is not just technical. Inside a degenerate subspace any orthonormal basis is a basis of eigenstates of $\hat H^{0}$, and the perturbation selects particular combinations. Only those combinations change continuously into eigenstates of $\hat H$ as $\lambda$ grows from zero; they are called the **good states**. The first task is to find them.

::: theorem Degenerate perturbation theory, first order {#thm-degenerate}
Let $E^{0}$ be an eigenvalue of $\hat H^{0}$ with a $g$-dimensional eigenspace spanned by the orthonormal states $\lvert\psi_1^{0}\rangle, \dots, \lvert\psi_g^{0}\rangle$, and let $W$ be the $g\times g$ Hermitian matrix

$$
W_{ij} = \langle\psi_i^{0}\vert\hat H'\vert\psi_j^{0}\rangle.
$$

The first-order corrections $E^{1}$ to the $g$ perturbed levels that emerge from $E^{0}$ are the eigenvalues of $W$, and the zeroth-order (good) states are $\sum_j c_j\lvert\psi_j^{0}\rangle$ with $(c_1, \dots, c_g)$ the corresponding eigenvectors of $W$.
:::

::: proof
Suppose a perturbed eigenstate tends, as $\lambda \to 0$, to some state $\lvert\chi^{0}\rangle = \sum_j c_j\lvert\psi_j^{0}\rangle$ in the eigenspace. It must lie in the eigenspace, because at $\lambda = 0$ it is an eigenstate of $\hat H^{0}$ with eigenvalue $E^{0}$. Write $\lvert\chi\rangle = \lvert\chi^{0}\rangle + \lambda\lvert\chi^{1}\rangle + \cdots$ and $E = E^{0} + \lambda E^{1} + \cdots$. The first-order equation has the same form as in [[#eq-orders]]:

$$
(\hat H^{0} - E^{0})\lvert\chi^{1}\rangle = (E^{1} - \hat H')\lvert\chi^{0}\rangle.
$$

Take the inner product with $\langle\psi_i^{0}\rvert$. The left side vanishes because $\langle\psi_i^{0}\rvert(\hat H^{0} - E^{0}) = 0$. The right side gives

$$
0 = E^{1}c_i - \sum_j W_{ij}c_j, \qquad i = 1, \dots, g.
$$

So $Wc = E^{1}c$: the vector $c$ is an eigenvector of $W$ and $E^{1}$ is its eigenvalue. Conversely, each eigenvector of $W$ gives a consistent solution at this order. Since $W$ is Hermitian it has $g$ real eigenvalues, counted with multiplicity, and an orthonormal set of eigenvectors.
:::

If the eigenvalues of $W$ are distinct, first order has **lifted** the degeneracy completely. If some coincide, the corresponding combinations are not yet fixed, and one has to go to second order or find a symmetry argument. The calculation is easiest when the basis is chosen so that $W$ is already diagonal. A symmetry usually tells you how to do that.

::: lemma Good states from a symmetry {#lem-good}
Let $\hat A$ be a Hermitian operator that commutes with both $\hat H^{0}$ and $\hat H'$. If the basis states $\lvert\psi_i^{0}\rangle$ of a degenerate eigenspace are eigenstates of $\hat A$ with eigenvalues $a_i$, then $W_{ij} = 0$ whenever $a_i \ne a_j$. In particular, if the $a_i$ are all distinct, $W$ is diagonal and the $\lvert\psi_i^{0}\rangle$ are the good states, with $E^{1}_i = \langle\psi_i^{0}\vert\hat H'\vert\psi_i^{0}\rangle$.
:::

::: proof
Since $[\hat A, \hat H'] = 0$,

$$
0 = \langle\psi_i^{0}\vert[\hat A, \hat H']\vert\psi_j^{0}\rangle = (a_i - a_j)\langle\psi_i^{0}\vert\hat H'\vert\psi_j^{0}\rangle = (a_i - a_j)W_{ij},
$$

using the Hermiticity of $\hat A$ to act to the left. If $a_i \ne a_j$ then $W_{ij} = 0$.
:::

The lemma is how we will handle hydrogen. The level $n$ has degeneracy $2n^2$ (counting spin), and one chooses quantum numbers that diagonalise the perturbation: $m$ for a perturbation symmetric under rotations about $z$, $j$ and $m_j$ for one that commutes with $\hat{\mathbf J}$.

::: example The linear Stark effect in hydrogen {#ex-stark}
A hydrogen atom is placed in a uniform electric field $\mathcal E$ along $z$. The electron has charge $-e$, so its potential energy in the potential $\phi = -\mathcal Ez$ is $\hat H' = e\mathcal E\hat z$. Ignoring spin and fine structure, find the first-order splitting of the $n = 2$ level, and evaluate it for $\mathcal E = 1.00\times10^{7}\,\mathrm{V/m}$.
::: solution
The ground state is non-degenerate and has even parity, so $E_1^{1} = e\mathcal E\langle 100\vert z\vert100\rangle = 0$: there is no linear Stark effect in the ground state.

The $n = 2$ level has four states $\lvert 200\rangle, \lvert 211\rangle, \lvert 210\rangle, \lvert 21,-1\rangle$ in the notation $\lvert nlm\rangle$. Two selection rules cut down the $4\times4$ matrix $W$. First, $\hat z$ commutes with $\hat L_z$, so by [[#lem-good]] states with different $m$ are not connected. Second, $z$ is odd under parity and the state $\lvert nlm\rangle$ has parity $(-1)^l$, so the diagonal elements vanish and so does any element between states of the same $l$. The only non-zero elements are $\langle200\vert\hat H'\vert210\rangle$ and its conjugate.

With $R_{20} = (2a^3)^{-1/2}(1 - r/2a)e^{-r/2a}$, $R_{21} = (24a^3)^{-1/2}(r/a)e^{-r/2a}$, $Y_0^0 = (4\pi)^{-1/2}$ and $Y_1^0 = (3/4\pi)^{1/2}\cos\theta$, where $a$ is the Bohr radius,

$$
\langle200\vert z\vert210\rangle = \int_0^\infty R_{20}R_{21}\,r^3\,\dd r\int Y_0^{0}\cos\theta\,Y_1^{0}\,\dd\Omega.
$$

The angular integral is $\frac{\sqrt3}{4\pi}\int\cos^2\theta\,\dd\Omega = \frac{\sqrt3}{4\pi}\cdot\frac{4\pi}{3} = \frac{1}{\sqrt3}$. With $\rho = r/a$ the radial integral is

$$
\frac{a}{\sqrt{48}}\int_0^\infty\left(1 - \frac{\rho}{2}\right)\rho^4e^{-\rho}\,\dd\rho = \frac{a}{\sqrt{48}}\left(4! - \frac{5!}{2}\right) = \frac{a(24 - 60)}{\sqrt{48}} = -\frac{36a}{\sqrt{48}}.
$$

The product is $-36a/\sqrt{144} = -3a$. In the subspace of $\lvert200\rangle, \lvert210\rangle$,

$$
W = \begin{pmatrix} 0 & -3e\mathcal Ea \\ -3e\mathcal Ea & 0\end{pmatrix},
$$

with eigenvalues $\pm3e\mathcal Ea$ and good states $(\lvert200\rangle \mp \lvert210\rangle)/\sqrt2$. The states $\lvert21,\pm1\rangle$ are unshifted. So the $n = 2$ level splits into three: $+3e\mathcal Ea$, $0$ (twice), $-3e\mathcal Ea$. Numerically,

$$
3e\mathcal Ea = 3\times(5.29\times10^{-11}\,\mathrm m)\times(1.00\times10^{7}\,\mathrm{V/m})\times e = 1.59\times10^{-3}\,\mathrm{eV}.
$$

The good states are not parity eigenstates. Each has a permanent electric dipole moment of magnitude $3ea$, pointing along or against the field. Only a degenerate level can have one: a non-degenerate state has definite parity, and the expectation value of an odd operator in it vanishes.
:::
:::

The splitting is linear in the field because the degenerate states $2s$ and $2p$ can be mixed at no energy cost. In any real atom other than hydrogen the $s$ and $p$ levels of the same $n$ are not degenerate, the first-order shift vanishes, and the Stark effect is quadratic in $\mathcal E$, from [[#eq-second]]. Even in hydrogen the result needs $3e\mathcal Ea$ to be large compared with the fine-structure splitting of the next section, $\sim 5\times10^{-5}\,\mathrm{eV}$; the field above satisfies that by a factor of thirty.

::: quiz
A perturbation $\hat H'$ is even under parity. Which statement about hydrogen's $n = 2$ level, ignoring spin, is correct?
- [ ] It produces a linear Stark-like splitting of $2s$ and $2p_0$ into $\pm$ a common value.
- [x] It cannot connect $2s$ with any $2p$ state, so $2s$ and $2p$ can be treated separately.
- [ ] Its first-order shift of $2s$ must vanish.
- [ ] Its second-order shift of the ground state must vanish.
::: solution
An even operator has zero matrix elements between states of opposite parity, and $2s$ (even) and $2p$ (odd) have opposite parity, so $W$ is block-diagonal. Nothing forces the diagonal element $\langle 200\vert\hat H'\vert200\rangle$ to vanish: an even operator can have a non-zero expectation value. The second-order ground-state shift is negative unless $\hat H'$ connects the ground state to nothing, by [[#cor-ground]].
:::
:::

## The fine structure of hydrogen {#fine-structure}

The Coulomb Hamiltonian of [[quantum-1/hydrogen]] leaves out two effects of the same size, both of relative order $\alpha^2$, where $\alpha = e^2/4\pi\varepsilon_0\hbar c = 1/137.036$ is the **fine-structure constant**. Writing $E_n = -13.6\,\mathrm{eV}/n^2$ for the Bohr energies, we will need three expectation values in hydrogen eigenstates, computed in the hydrogen chapter or found by the Feynman–Hellmann theorem ([[#exr-fh]] derives one):

$$
\left\langle\frac1r\right\rangle = \frac{1}{n^2a}, \qquad \left\langle\frac{1}{r^2}\right\rangle = \frac{1}{(l+\frac12)n^3a^2}, \qquad \left\langle\frac{1}{r^3}\right\rangle = \frac{1}{l(l+\frac12)(l+1)n^3a^3}\quad (l \ge 1).
$$ {#eq-radial-averages}

### The relativistic correction

Expanding the relativistic kinetic energy $\sqrt{p^2c^2 + m^2c^4} - mc^2$ in powers of $p/mc$ gives

$$
T = \frac{p^2}{2m} - \frac{p^4}{8m^3c^2} + \cdots, \qquad \hat H'_{\mathrm r} = -\frac{\hat p^4}{8m^3c^2}.
$$

The level $n$ is degenerate, but $\hat H'_{\mathrm r}$ is rotationally invariant: it commutes with $\hat L^2$ and $\hat L_z$ (and with the spin), so by [[#lem-good]] the states $\lvert nlm\rangle$ are good and we may use [[#eq-first]] directly. Write $\hat p^2 = 2m(\hat H^{0} - V)$, so that

$$
E_{\mathrm r}^{1} = -\frac{1}{8m^3c^2}\langle\hat p^2\hat p^2\rangle = -\frac{1}{2mc^2}\left\langle(E_n - V)^2\right\rangle = -\frac{1}{2mc^2}\left[E_n^2 - 2E_n\langle V\rangle + \langle V^2\rangle\right],
$$

using the Hermiticity of $\hat p^2$ to act with one factor to the left. With $V = -e^2/4\pi\varepsilon_0r$, the averages [[#eq-radial-averages]] and $E_n = -e^2/(8\pi\varepsilon_0an^2)$, a few lines of algebra give

$$
E_{\mathrm r}^{1} = -\frac{E_n^2}{2mc^2}\left[\frac{4n}{l + \frac12} - 3\right].
$$ {#eq-rel}

The correction is negative (the relativistic kinetic energy grows more slowly than $p^2/2m$) and largest for small $l$, whose orbits come closest to the nucleus and move fastest.

### Spin–orbit coupling

In the electron's rest frame the proton circles it and produces a magnetic field $\mathbf B \propto \mathbf L$. The electron's magnetic moment $-(g_s\mu_B/\hbar)\mathbf S$, with $g_s \approx 2$, has energy $-\boldsymbol\mu\cdot\mathbf B$ in that field. Transforming back to the lab frame correctly introduces a kinematic factor $\frac12$, the **Thomas precession**, and the result is

$$
\hat H'_{\mathrm{so}} = \frac{e^2}{8\pi\varepsilon_0}\frac{1}{m^2c^2r^3}\,\hat{\mathbf S}\cdot\hat{\mathbf L}.
$$

The same term, factor of $\frac12$ included, comes out of the Dirac equation without any frame-hopping. Now $\hat{\mathbf S}\cdot\hat{\mathbf L}$ does not commute with $\hat L_z$ or $\hat S_z$, so the states $\lvert nlm_lm_s\rangle$ are *not* good. It does commute with $\hat L^2$, $\hat S^2$, $\hat J^2$ and $\hat J_z$, where $\hat{\mathbf J} = \hat{\mathbf L} + \hat{\mathbf S}$, because

$$
\hat{\mathbf S}\cdot\hat{\mathbf L} = \frac12\left(\hat J^2 - \hat L^2 - \hat S^2\right).
$$

So the good states are the coupled states $\lvert n\,l\,j\,m_j\rangle$ of [[quantum-1/angular-momentum]], with $j = l\pm\frac12$. In them $\hat{\mathbf S}\cdot\hat{\mathbf L}$ has the value $\frac{\hbar^2}2[j(j+1) - l(l+1) - \frac34]$, and with $\langle r^{-3}\rangle$ from [[#eq-radial-averages]]

$$
E_{\mathrm{so}}^{1} = \frac{E_n^2}{mc^2}\cdot\frac{n\left[j(j+1) - l(l+1) - \frac34\right]}{l(l+\frac12)(l+1)} \qquad (l \ge 1).
$$

The relativistic correction is diagonal in the coupled basis as well, since it is diagonal for every $l$ whatever the $m$'s, so both corrections can be added level by level.

::: theorem Fine structure of hydrogen {#thm-fine}
To first order in $\hat H'_{\mathrm r} + \hat H'_{\mathrm{so}}$ (together with the Darwin term for $l = 0$), the energy of hydrogen's level with quantum numbers $n, j$ is

$$
E_{nj} = E_n + \frac{E_n^2}{2mc^2}\left(3 - \frac{4n}{j + \frac12}\right) = -\frac{13.6\,\mathrm{eV}}{n^2}\left[1 + \frac{\alpha^2}{n^2}\left(\frac{n}{j + \frac12} - \frac34\right)\right].
$$ {#eq-fine}

It depends on $j$ but not on $l$: for example $2s_{1/2}$ and $2p_{1/2}$ remain degenerate.
:::

::: proof
For $l \ge 1$ substitute $j = l + \frac12$ in the spin–orbit formula. Then $j(j+1) - l(l+1) - \frac34 = l$, and $E_{\mathrm{so}}^{1} = (E_n^2/mc^2)\,n/((l+\frac12)(l+1))$. Adding [[#eq-rel]] and writing everything in terms of $j + \frac12 = l + 1$,

$$
\frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l+\frac12} + \frac{2n}{(l+\frac12)(l+1)}\right] = \frac{E_n^2}{2mc^2}\left[3 - \frac{4n(l+1) - 2n}{(l+\frac12)(l+1)}\right] = \frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l+1}\right].
$$

For $j = l - \frac12$, the bracket is $j(j+1) - l(l+1) - \frac34 = -(l+1)$, so $E_{\mathrm{so}}^{1} = -(E_n^2/mc^2)\,n/(l(l+\frac12))$, and

$$
\frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l+\frac12} - \frac{2n}{l(l+\frac12)}\right] = \frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l}\right],
$$

with $j + \frac12 = l$. Both cases give [[#eq-fine]]. For $l = 0$ there is no spin–orbit term, but the Dirac equation produces an extra contact term, the **Darwin term**, whose expectation value is non-zero only for $s$ states and equals $2nE_n^2/mc^2$; added to [[#eq-rel]] with $l = 0$ it gives $\frac{E_n^2}{2mc^2}(3 - 8n)$, which is [[#eq-fine]] with $j = \frac12$. The second form follows from $E_n^2/(2mc^2) = \frac{13.6\,\mathrm{eV}}{n^2}\cdot\frac{\alpha^2}{4n^2}$, because $13.6\,\mathrm{eV} = \frac12\alpha^2mc^2$.
:::

The Dirac equation solved exactly gives a formula whose expansion to order $\alpha^2$ is [[#eq-fine]]; perturbation theory has reproduced the leading relativistic physics without solving a relativistic wave equation.

::: example Fine structure of the n = 2 level {#ex-fine-n2}
Compute the fine-structure shifts of $2s_{1/2}$, $2p_{1/2}$ and $2p_{3/2}$, and the splitting between $2p_{3/2}$ and $2p_{1/2}$ as an energy and as a frequency. Use $E_2 = -3.4014\,\mathrm{eV}$ and $mc^2 = 0.51100\,\mathrm{MeV}$.
::: solution
The common factor is

$$
\frac{E_2^2}{2mc^2} = \frac{(3.4014\,\mathrm{eV})^2}{2\times0.51100\times10^{6}\,\mathrm{eV}} = 1.1321\times10^{-5}\,\mathrm{eV}.
$$

For $j = \frac12$ the bracket in [[#eq-fine]] is $3 - 8/1 = -5$, so both $2s_{1/2}$ and $2p_{1/2}$ are lowered by $5.660\times10^{-5}\,\mathrm{eV}$. For $j = \frac32$ the bracket is $3 - 8/2 = -1$, and $2p_{3/2}$ is lowered by $1.132\times10^{-5}\,\mathrm{eV}$. The splitting is

$$
\Delta E = 4\times1.1321\times10^{-5}\,\mathrm{eV} = 4.528\times10^{-5}\,\mathrm{eV}, \qquad \nu = \frac{\Delta E}{h} = \frac{4.528\times10^{-5}\times1.6022\times10^{-19}\,\mathrm J}{6.6261\times10^{-34}\,\mathrm{J\,s}} = 10.95\,\mathrm{GHz}.
$$

The measured value is $10.97\,\mathrm{GHz}$, the small difference coming from the reduced mass and from QED. The whole $n = 2$ level moves by about $10^{-5}$ of its binding energy, which is the size $\alpha^2 \approx 5.3\times10^{-5}$ predicts.
:::
:::

::: remark The Lamb shift
In 1947 Willis Lamb and Robert Retherford found that $2s_{1/2}$ lies about $1.06\,\mathrm{GHz}$ *above* $2p_{1/2}$, contradicting the $l$-independence of [[#thm-fine]]. The shift comes from the interaction of the electron with the quantised electromagnetic field (vacuum fluctuations), and explaining it was the first triumph of quantum electrodynamics. It is about a tenth of the fine-structure splitting. Smaller still is the **hyperfine** structure from the proton's magnetic moment, which splits the ground state by $1.42\,\mathrm{GHz}$, the 21-centimetre line of radio astronomy.
:::

### The Zeeman effect

In a magnetic field $\mathbf B = B\hat{\mathbf z}$ the orbital and spin magnetic moments add the perturbation

$$
\hat H'_{\mathrm Z} = \frac{\mu_B}{\hbar}\left(\hat L_z + 2\hat S_z\right)B, \qquad \mu_B = \frac{e\hbar}{2m} = 5.788\times10^{-5}\,\mathrm{eV/T},
$$

taking $g_s = 2$. What to do depends on how $\mu_BB$ compares with the fine-structure splittings.

**Weak field** ($\mu_BB$ much smaller than fine structure). Fine structure fixes the good states $\lvert nljm_j\rangle$, and we need the expectation value of $\hat L_z + 2\hat S_z = \hat J_z + \hat S_z$ in each multiplet. The **projection theorem** (a special case of the Wigner–Eckart theorem, Sakurai & Napolitano §3.11) says that within a multiplet of fixed $j$ the matrix elements of any vector operator $\hat{\mathbf V}$ are proportional to those of $\hat{\mathbf J}$: $\langle\hat{\mathbf V}\rangle = \langle\hat{\mathbf V}\cdot\hat{\mathbf J}\rangle\langle\hat{\mathbf J}\rangle/\hbar^2j(j+1)$. Applied to $\hat{\mathbf S}$, with $\hat{\mathbf S}\cdot\hat{\mathbf J} = \frac12(\hat J^2 + \hat S^2 - \hat L^2)$, it gives

$$
E_{\mathrm Z}^{1} = g_J\,\mu_B B\,m_j, \qquad g_J = 1 + \frac{j(j+1) - l(l+1) + \frac34}{2j(j+1)}.
$$ {#eq-lande}

$g_J$ is the **Landé $g$-factor**. Each fine-structure level splits into $2j+1$ equally spaced sublevels.

**Strong field** ($\mu_BB$ much larger than fine structure), the **Paschen–Back** regime. Now $\hat H'_{\mathrm Z}$ dominates, and it is diagonal in $\lvert nlm_lm_s\rangle$: $E = E_n + \mu_BB(m_l + 2m_s)$, with fine structure as a smaller correction on top.

::: intuition Why g_J is not 1 or 2
The spin and orbital moments have different gyromagnetic ratios, so the total moment is not parallel to $\mathbf J$. Spin–orbit coupling makes $\mathbf L$ and $\mathbf S$ precess rapidly about $\mathbf J$; the weak external field only sees the time-averaged moment, which is its projection on $\mathbf J$. The weight of spin in that projection gives a $g_J$ between $1$ (pure orbit) and $2$ (pure spin): $g_J = 2$ for $s_{1/2}$, $\frac23$ for $p_{1/2}$, $\frac43$ for $p_{3/2}$.
:::

::: example The ground state in one tesla {#ex-zeeman}
Find the Zeeman splitting of hydrogen's ground state in $B = 1.00\,\mathrm T$, and decide whether $1\,\mathrm T$ is a weak or strong field for the $n = 2$ level.
::: solution
The ground state is $1s_{1/2}$: $l = 0$, $j = \frac12$. Then [[#eq-lande]] gives $g_J = 1 + (\frac34 + \frac34)/(2\cdot\frac34) = 2$, and $m_j = \pm\frac12$, so

$$
E_{\mathrm Z}^{1} = \pm\mu_BB = \pm5.79\times10^{-5}\,\mathrm{eV},
$$

a splitting of $1.16\times10^{-4}\,\mathrm{eV}$, or $28.0\,\mathrm{GHz}$. For $n = 2$ the fine-structure splitting is $4.53\times10^{-5}\,\mathrm{eV}$ from [[#ex-fine-n2]], comparable to $\mu_BB = 5.79\times10^{-5}\,\mathrm{eV}$. One tesla is neither weak nor strong for $n = 2$: the intermediate regime, in which one diagonalises $\hat H'_{\mathrm{so}} + \hat H'_{\mathrm r} + \hat H'_{\mathrm Z}$ together in the eight-dimensional $n = 2$ subspace. Fields well below $0.1\,\mathrm T$ are weak, and fields of several tesla begin to be strong.
:::
:::

## The variational method {#variational}

Perturbation theory needs a solvable $\hat H^{0}$ close to $\hat H$. Often there is none. The variational method needs only a guess.

::: theorem Variational principle {#thm-variational}
Let $\hat H$ have ground-state energy $E_{\mathrm{gs}}$. For every normalisable state $\lvert\psi\rangle \ne 0$ in the domain of $\hat H$,

$$
\langle H\rangle_\psi = \frac{\langle\psi\vert\hat H\vert\psi\rangle}{\langle\psi\vert\psi\rangle} \ge E_{\mathrm{gs}},
$$ {#eq-variational}

with equality if and only if $\lvert\psi\rangle$ is a ground state.
:::

::: proof
Expand $\lvert\psi\rangle = \sum_k c_k\lvert k\rangle$ in the orthonormal eigenstates of $\hat H$, $\hat H\lvert k\rangle = E_k\lvert k\rangle$, with $E_k \ge E_{\mathrm{gs}}$ (if $\hat H$ also has a continuous spectrum, the sum includes an integral, and the argument is unchanged). Then

$$
\langle\psi\vert\hat H\vert\psi\rangle - E_{\mathrm{gs}}\langle\psi\vert\psi\rangle = \sum_k\lvert c_k\rvert^2(E_k - E_{\mathrm{gs}}) \ge 0,
$$

since every term is non-negative. Equality requires $c_k = 0$ whenever $E_k > E_{\mathrm{gs}}$, which means $\lvert\psi\rangle$ lies in the ground eigenspace.
:::

In practice one picks a family of trial states $\lvert\psi(\beta)\rangle$ depending on parameters $\beta$, computes $\langle H\rangle(\beta)$, and minimises. The minimum is the best upper bound the family can give. An error of order $\epsilon$ in the state gives an error of order $\epsilon^2$ in the energy ([[#exr-quadratic]]), so a mediocre wavefunction can give a good energy.

::: example A Gaussian guess for hydrogen {#ex-gauss}
Use the trial wavefunction $\psi = e^{-br^2}$, $b > 0$, to bound the ground-state energy of hydrogen.
::: solution
Work in atomic units for the algebra, $\hbar = m = e^2/4\pi\varepsilon_0 = 1$, where lengths are in Bohr radii and energies in hartrees ($1\,E_{\mathrm h} = 27.211\,\mathrm{eV}$). The integrals needed are Gaussian:

$$
\langle\psi\vert\psi\rangle = 4\pi\int_0^\infty r^2e^{-2br^2}\,\dd r = \left(\frac{\pi}{2b}\right)^{3/2}.
$$

For the kinetic energy use $\langle T\rangle = \frac12\int\lvert\nabla\psi\rvert^2\,\dd^3r/\langle\psi\vert\psi\rangle$, with $\lvert\nabla\psi\rvert^2 = 4b^2r^2e^{-2br^2}$:

$$
\langle T\rangle = \frac{2b^2\cdot4\pi\int_0^\infty r^4e^{-2br^2}\,\dd r}{(\pi/2b)^{3/2}} = \frac{3b}{2}.
$$

For the potential, $\int_0^\infty re^{-2br^2}\,\dd r = 1/4b$, so

$$
\langle V\rangle = -\frac{4\pi/4b}{(\pi/2b)^{3/2}} = -2\sqrt{\frac{2b}{\pi}}.
$$

Minimise $\langle H\rangle(b) = \frac32b - 2\sqrt{2b/\pi}$: setting the derivative $\frac32 - \sqrt{2/\pi b}$ to zero gives $b = 8/9\pi$, and then

$$
\langle H\rangle_{\min} = \frac32\cdot\frac{8}{9\pi} - 2\sqrt{\frac{16}{9\pi^2}} = \frac{4}{3\pi} - \frac{8}{3\pi} = -\frac{4}{3\pi}\,E_{\mathrm h} = -\frac{8}{3\pi}\times13.606\,\mathrm{eV} = -11.55\,\mathrm{eV}.
$$

The bound lies above the true $-13.61\,\mathrm{eV}$, as it must, by fifteen per cent. A Gaussian has the wrong shape both at the nucleus (no cusp) and at large $r$ (it decays too fast). Quantum chemistry nonetheless builds wavefunctions out of sums of Gaussians, because their integrals are easy.
:::
:::

### The ground state of helium

Helium has two electrons and a nucleus of charge $Z = 2$. Neglecting nuclear motion,

$$
\hat H = -\frac{\hbar^2}{2m}\left(\nabla_1^2 + \nabla_2^2\right) - \frac{Ze^2}{4\pi\varepsilon_0}\left(\frac{1}{r_1} + \frac{1}{r_2}\right) + \frac{e^2}{4\pi\varepsilon_0}\frac{1}{\lvert\mathbf r_1 - \mathbf r_2\rvert}.
$$

The experimental ground-state energy, minus the sum of the two ionisation energies $24.587\,\mathrm{eV}$ and $54.418\,\mathrm{eV}$, is $-79.005\,\mathrm{eV}$. Without the repulsion each electron would be in a hydrogen-like $1s$ orbital with energy $-Z^2\times13.6\,\mathrm{eV}$, giving $-8\times13.6 = -108.8\,\mathrm{eV}$: far too low. Treating the repulsion to first order adds $\langle1/r_{12}\rangle$ in the product state, a six-dimensional integral whose value (Griffiths & Schroeter §8.2; Bransden & Joachain, chapter 7) is

$$
\left\langle\frac{e^2}{4\pi\varepsilon_0r_{12}}\right\rangle = \frac58\,Z\,E_{\mathrm h}
$$ {#eq-repulsion}

for two electrons in $1s$ orbitals with nuclear charge $Z$. For $Z = 2$ this is $\frac54E_{\mathrm h} = 34.0\,\mathrm{eV}$, and first-order perturbation theory gives $-108.8 + 34.0 = -74.8\,\mathrm{eV}$. That is an upper bound, since it is the expectation value of $\hat H$ in a normalised state, but it misses by $4.2\,\mathrm{eV}$. The repulsion is not small compared with the level spacing, and the first-order state ignores the fact that each electron partly hides the nucleus from the other.

::: example The variational estimate for helium {#ex-helium}
Take as trial state the product of two hydrogen-like $1s$ orbitals with an adjustable charge $Z_e$, $\psi = (Z_e^3/\pi a^3)\,e^{-Z_e(r_1 + r_2)/a}$. Find the best $Z_e$ and the resulting bound.
::: solution
Use hartrees again. The trick is to write the true Hamiltonian as one for which $\psi$ is an exact eigenstate, plus a remainder:

$$
\hat H = \left[-\tfrac12\nabla_1^2 - \frac{Z_e}{r_1} - \tfrac12\nabla_2^2 - \frac{Z_e}{r_2}\right] + (Z_e - Z)\left(\frac{1}{r_1} + \frac{1}{r_2}\right) + \frac{1}{r_{12}}.
$$

The bracket has $\psi$ as eigenstate with eigenvalue $2\times(-\frac12Z_e^2) = -Z_e^2$. In a hydrogen-like $1s$ orbital of charge $Z_e$, $\langle1/r\rangle = Z_e$ (from [[#eq-radial-averages]] with $n = 1$ and $a \to a/Z_e$), and [[#eq-repulsion]] with $Z \to Z_e$ gives $\langle1/r_{12}\rangle = \frac58Z_e$. So

$$
\langle H\rangle(Z_e) = -Z_e^2 + 2(Z_e - Z)Z_e + \frac58Z_e = Z_e^2 - 2ZZ_e + \frac58Z_e.
$$

The derivative $2Z_e - 2Z + \frac58$ vanishes at

$$
Z_e = Z - \frac{5}{16} = \frac{27}{16} = 1.6875,
$$

and the minimum value is $-Z_e^2 = -(27/16)^2E_{\mathrm h} = -2.8477\,E_{\mathrm h}$. In electronvolts,

$$
\langle H\rangle_{\min} = -2.8477\times27.211\,\mathrm{eV} = -77.49\,\mathrm{eV} \approx -77.5\,\mathrm{eV}.
$$

The experimental value is $-79.0\,\mathrm{eV}$, so the one-parameter bound is within $1.5\,\mathrm{eV}$, or $1.9$ per cent. The optimal $Z_e < 2$ has a direct physical reading: each electron sees the nuclear charge partly **screened** by the other, by $\frac{5}{16}$ of an electron charge.
:::
:::

::: widget plot
f: x^2 - 2*Z*x + (5/8)*x
x: 0.5, 5
sliders: Z=2:1:5:1
caption: The variational energy $\langle H\rangle(Z_e) = Z_e^2 - 2ZZ_e + \frac58Z_e$, in hartrees, against the trial charge $Z_e$ on the horizontal axis. Start at $Z = 2$ (helium): the minimum sits at $Z_e = 1.6875$ with value $-2.848$, a little above the exact $-2.903$. Move the slider to $Z = 3$ ($\mathrm{Li}^+$) and higher: the minimum is always at $Z - \frac{5}{16}$, so screening is the same fraction of an electron for every two-electron ion, and matters less and less relative to $Z$.
:::

Hylleraas, in 1929, added the interelectronic distance $r_{12}$ to the trial function and got within about $0.01\,\mathrm{eV}$ with a handful of parameters. Modern variational calculations agree with experiment to better than one part in $10^{9}$, and differences at that level test QED. The helium atom is treated again in [[quantum-2/atomic-structure]], where the Pauli principle from [[quantum-2/identical-particles]] decides which states the two electrons may occupy.

::: warning Upper bounds only for the ground state
The variational principle bounds the ground state. It bounds an excited state only if the trial function is exactly orthogonal to every lower state, which is usually arranged by symmetry: a trial function with $l = 1$, for example, bounds the lowest $l = 1$ level. A low $\langle H\rangle$ for a trial function that has not been orthogonalised says nothing about the first excited state. Nor does a good variational energy guarantee a good wavefunction for other observables: the error in $\langle H\rangle$ is second order in the error of the state, while the error in, say, $\langle r^2\rangle$ is first order.
:::

::: quiz
For helium, first-order perturbation theory gives $-74.8\,\mathrm{eV}$, the screened variational calculation gives $-77.5\,\mathrm{eV}$, and experiment gives $-79.0\,\mathrm{eV}$. Which statement is correct?
- [ ] First-order perturbation theory can give an energy above or below the true ground-state energy, so $-74.8$ might have been an underestimate.
- [x] Both $-74.8$ and $-77.5\,\mathrm{eV}$ are expectation values of $\hat H$ in normalised states, so both are upper bounds, and the lower one is the better estimate.
- [ ] The variational result could be improved by choosing $Z_e = 2$.
- [ ] A trial function with two parameters could give $-80\,\mathrm{eV}$.
::: solution
The first-order energy $E^{0} + \langle\hat H'\rangle$ is $\langle\psi^{0}\vert\hat H\vert\psi^{0}\rangle$, an expectation value of the full Hamiltonian, so [[#thm-variational]] bounds it from below by the true energy. The variational family includes $Z_e = 2$ (the first-order calculation), and the minimum over the family is lower. No trial function, however many parameters, goes below the true ground-state energy.
:::
:::

::: history From Rayleigh to Hylleraas
Lord Rayleigh developed the expansion of vibration frequencies in powers of a small change in a system, in *The Theory of Sound* (1877), for strings of slightly non-uniform density. Erwin Schrödinger adapted it to his wave equation in the third of his 1926 papers on quantisation as an eigenvalue problem, including the degenerate case, and applied it to the Stark effect of hydrogen; the method is called **Rayleigh–Schrödinger perturbation theory**. The linear Stark effect had been observed by Johannes Stark in 1913, and the Zeeman effect by Pieter Zeeman in 1896. Arnold Sommerfeld's relativistic Bohr model of 1916 happened to give the right fine-structure formula; Dirac's 1928 equation gave it for the right reasons, and Lamb and Retherford's 1947 measurement showed where it fails. Walther Ritz had turned Rayleigh's energy argument into a practical method in 1908–1909, which is why variational calculations are also called Rayleigh–Ritz. Georg Kellner (1927), who found the screened charge $27/16$, and then Egil Hylleraas (1929) applied it to helium, Hylleraas reaching a precision that convinced physicists that quantum mechanics worked for atoms with more than one electron.
:::

## Where this leads {#leads}

[[quantum-2/time-dependent]] extends the method to perturbations that switch on and off or oscillate, which is how atoms absorb and emit light; its central result, Fermi's golden rule, contains the same matrix elements $H'_{mn}$. [[quantum-2/identical-particles]] uses first-order degenerate perturbation theory to explain why helium's triplet states lie below its singlets. [[quantum-2/atomic-structure]] combines the screening idea of the helium calculation with the Pauli principle to build the periodic table, and uses the fine-structure results here to explain term symbols and spin–orbit splittings in heavier atoms. In [[condensed-matter/band-structure]] degenerate perturbation theory at a zone boundary opens the band gaps of the nearly free electron model.

::: summary
- Write $\hat H = \hat H^{0} + \lambda\hat H'$ and expand in $\lambda$. For a non-degenerate level, $E_n^{1} = \langle n^{0}\vert\hat H'\vert n^{0}\rangle$ and $E_n^{2} = \sum_{m\ne n}\lvert H'_{mn}\rvert^2/(E_n^{0} - E_m^{0})$, with unperturbed states and energies throughout.
- The expansion parameter is a matrix element divided by an energy difference. Second order pushes the ground state down and makes levels repel.
- In a degenerate level, diagonalise the matrix of $\hat H'$ in the degenerate subspace. An operator that commutes with $\hat H^{0}$ and $\hat H'$ and has distinct eigenvalues there labels the good states.
- Hydrogen's fine structure (relativistic, spin–orbit and Darwin terms) gives $E_{nj} = E_n[1 + (\alpha^2/n^2)(n/(j+\frac12) - \frac34)]$: of order $\alpha^2 E_n$, depending on $j$ only. The $2p_{3/2}$–$2p_{1/2}$ splitting is $4.53\times10^{-5}\,\mathrm{eV}$, $10.9\,\mathrm{GHz}$.
- The weak-field Zeeman shift is $g_J\mu_BBm_j$ with the Landé factor $g_J$; in strong fields the shift is $\mu_BB(m_l + 2m_s)$.
- Hydrogen's $n = 2$ level has a linear Stark effect, $0, \pm3e\mathcal Ea$, because $2s$ and $2p$ are degenerate; non-degenerate states have only a quadratic one.
- The variational principle $\langle H\rangle_\psi \ge E_{\mathrm{gs}}$ turns any trial state into an upper bound. A screened-charge trial state gives $-77.5\,\mathrm{eV}$ for helium against the measured $-79.0\,\mathrm{eV}$.
:::

## Exercises {#exercises}

::: exercise A step in the well {level=1 check="0.1"}
An infinite square well on $0 < x < L$ is perturbed by $\hat H' = V_0$ for $0 < x < L/2$ and $0$ elsewhere, with $V_0 = 0.200\,\mathrm{eV}$. Find the first-order shift of every level, in eV.
::: solution
The unperturbed states are $\psi_n = \sqrt{2/L}\,\sin(n\pi x/L)$, non-degenerate. By [[#eq-first]],

$$
E_n^{1} = V_0\frac{2}{L}\int_0^{L/2}\sin^2\frac{n\pi x}{L}\,\dd x = V_0\frac{2}{L}\left[\frac x2 - \frac{L}{4n\pi}\sin\frac{2n\pi x}{L}\right]_0^{L/2} = V_0\frac{2}{L}\cdot\frac L4 = \frac{V_0}{2},
$$

because $\sin(n\pi) = 0$. Every level rises by $V_0/2 = 0.100\,\mathrm{eV}$. Each probability density $\lvert\psi_n\rvert^2$ is symmetric about the centre, so the particle spends half its time in the raised half.
:::
:::

::: exercise The ground-state fine structure {level=1 check="-181.1"}
Use [[#eq-fine]] to find the fine-structure shift of hydrogen's $1s_{1/2}$ level, in micro-electronvolts. Take $13.6057\,\mathrm{eV}$ for the Rydberg energy and $mc^2 = 0.510999\,\mathrm{MeV}$.
::: solution
With $n = 1$, $j = \frac12$, the bracket $3 - 4n/(j+\frac12)$ is $3 - 4 = -1$, so

$$
\Delta E = -\frac{E_1^2}{2mc^2} = -\frac{(13.6057)^2}{2\times0.510999\times10^{6}}\,\mathrm{eV} = -1.811\times10^{-4}\,\mathrm{eV} = -181.1\,\mu\mathrm{eV}.
$$

Equivalently $-13.6057\,\mathrm{eV}\times\alpha^2/4$, with $\alpha^2 = 5.325\times10^{-5}$.
:::
:::

::: exercise A Landé factor {level=1 check="4/3"}
Compute $g_J$ for the $2p_{3/2}$ level of hydrogen, and state how many Zeeman sublevels it has in a weak field.
::: solution
With $l = 1$, $j = \frac32$: $j(j+1) = \frac{15}{4}$, $l(l+1) = 2$, so [[#eq-lande]] gives

$$
g_J = 1 + \frac{\frac{15}{4} - 2 + \frac34}{2\cdot\frac{15}{4}} = 1 + \frac{\frac{5}{2}}{\frac{15}{2}} = \frac43.
$$

There are $2j + 1 = 4$ sublevels, $m_j = \pm\frac12, \pm\frac32$, with shifts $\frac43\mu_BBm_j$.
:::
:::

::: exercise The stiffer spring at second order {#exr-stiffer2 level=2 check="-1/8"}
For the perturbation $\hat H' = \frac12\varepsilon m\omega^2\hat x^2$ of [[#ex-stiffer]], compute $E_n^{2}$ from [[#eq-second]] and give the coefficient $c$ in $E_n^{2} = c\,\varepsilon^2(n+\frac12)\hbar\omega$.
::: hint
$\hat x^2$ connects $\lvert n\rangle$ only to $\lvert n\pm2\rangle$ off the diagonal.
:::
::: solution
From $\hat x^2 = (\hbar/2m\omega)(\hat a^2 + \hat a^{\dagger2} + 2\hat a^\dagger\hat a + 1)$, the off-diagonal elements are

$$
\langle n+2\vert\hat x^2\vert n\rangle = \frac{\hbar}{2m\omega}\sqrt{(n+1)(n+2)}, \qquad \langle n-2\vert\hat x^2\vert n\rangle = \frac{\hbar}{2m\omega}\sqrt{n(n-1)}.
$$

Multiplying by $\frac12\varepsilon m\omega^2$ gives $H'_{n\pm2,n} = \frac{\varepsilon\hbar\omega}{4}\sqrt{\cdots}$. The denominators are $\mp2\hbar\omega$, so

$$
E_n^{2} = \frac{\varepsilon^2\hbar^2\omega^2}{16}\left[\frac{n(n-1)}{2\hbar\omega} - \frac{(n+1)(n+2)}{2\hbar\omega}\right] = \frac{\varepsilon^2\hbar\omega}{32}(-4n - 2) = -\frac{\varepsilon^2}{8}\left(n + \frac12\right)\hbar\omega.
$$

So $c = -\frac18$, the second term of $\sqrt{1+\varepsilon} = 1 + \frac{\varepsilon}{2} - \frac{\varepsilon^2}{8} + \cdots$.
:::
:::

::: exercise Stark splitting in a laboratory field {level=2 check="0.635"}
A hydrogen atom in its $n = 2$ level is placed in a field $\mathcal E = 2.00\times10^{6}\,\mathrm{V/m}$. Using [[#ex-stark]], find the energy difference between the highest and lowest Stark components, in meV. Take $a = 5.29177\times10^{-11}\,\mathrm m$.
::: solution
The components are at $+3e\mathcal Ea$, $0$, $0$, $-3e\mathcal Ea$, so the outer spacing is $6e\mathcal Ea$:

$$
6\times(5.29177\times10^{-11}\,\mathrm m)\times(2.00\times10^{6}\,\mathrm{V/m})\times e = 6.350\times10^{-4}\,\mathrm{eV} = 0.635\,\mathrm{meV}.
$$

This is fourteen times the fine-structure splitting $0.0453\,\mathrm{meV}$, so neglecting fine structure is reasonable.
:::
:::

::: exercise Two coupled degenerate states {level=2}
A two-state system has $\hat H^{0} = E_0\mathbb 1$ (exactly degenerate) and $\hat H' = \begin{pmatrix}\delta & V\\ V & -\delta\end{pmatrix}$ with real $\delta, V$. Find the exact energies, and show that degenerate first-order perturbation theory gives them exactly. Then suppose instead $\hat H^{0} = \operatorname{diag}(E_0 + \Delta, E_0 - \Delta)$ with $\lvert\Delta\rvert \gg \lvert V\rvert$ and $\delta = 0$, and show that non-degenerate second-order perturbation theory reproduces the expansion of the exact result.
::: solution
In the first case $\hat H = E_0\mathbb 1 + \hat H'$, and the eigenvalues of $\hat H'$ are the roots of $\lambda^2 - \delta^2 - V^2 = 0$, so $E = E_0\pm\sqrt{\delta^2 + V^2}$. Degenerate perturbation theory says the first-order shifts are the eigenvalues of $W = \hat H'$ itself (the whole space is the degenerate subspace), which is the same calculation. Higher orders vanish because $\hat H'$ commutes with $\hat H^{0} \propto \mathbb 1$.

In the second case the exact energies are $E_0\pm\sqrt{\Delta^2 + V^2}$. For $\lvert\Delta\rvert \gg \lvert V\rvert$, $\sqrt{\Delta^2 + V^2} = \lvert\Delta\rvert\sqrt{1 + V^2/\Delta^2} \approx \lvert\Delta\rvert + V^2/2\lvert\Delta\rvert$. Take $\Delta > 0$. Perturbation theory: the diagonal of $\hat H'$ vanishes, so $E^{1} = 0$. For the upper level, $E^{2} = V^2/((E_0+\Delta) - (E_0 - \Delta)) = V^2/2\Delta$; for the lower, $-V^2/2\Delta$. These match the expansion: the levels repel, each by $V^2/2\Delta$. As $\Delta \to 0$ the second-order result diverges while the exact one tends to $\pm V$, which is why degenerate levels have to be treated by diagonalisation.
:::
:::

::: exercise A Gaussian trial for the oscillator and for hydrogen {level=2 check="-11.55"}
(a) Show that the Gaussian $\psi = e^{-bx^2}$ used as a trial function for the oscillator $\hat H = \hat p^2/2m + \frac12m\omega^2x^2$ gives exactly $\frac12\hbar\omega$ at its optimum. (b) State the minimum of the Gaussian bound for hydrogen found in [[#ex-gauss]], in eV to four significant figures.
::: solution
(a) For $\psi = e^{-bx^2}$, $\langle x^2\rangle = 1/4b$ and $\langle p^2\rangle = \hbar^2b$ (both standard Gaussian integrals), so $\langle H\rangle = \hbar^2b/2m + m\omega^2/8b$. Setting the derivative $\hbar^2/2m - m\omega^2/8b^2$ to zero gives $b = m\omega/2\hbar$, and $\langle H\rangle = \hbar\omega/4 + \hbar\omega/4 = \frac12\hbar\omega$. The bound is saturated because the family contains the exact ground state.

(b) From [[#ex-gauss]], $\langle H\rangle_{\min} = -\frac{8}{3\pi}\times13.6057\,\mathrm{eV} = -0.84883\times13.6057\,\mathrm{eV} = -11.55\,\mathrm{eV}$.
:::
:::

::: exercise A degenerate level in two dimensions {level=3 check="32/(9*pi^2)"}
A particle is in the two-dimensional infinite square well $0 < x, y < L$, with unperturbed states $\psi_{n_xn_y} = (2/L)\sin(n_x\pi x/L)\sin(n_y\pi y/L)$. The perturbation is $\hat H' = V_0$ for $0 < x < L/2$ and $0 < y < L/2$, zero elsewhere. Find the first-order splitting of the doubly degenerate level $(1,2), (2,1)$, as a multiple of $V_0$.
::: hint
Each matrix element factorises into an $x$ integral times a $y$ integral over $(0, L/2)$. You will need $\int_0^{\pi/2}\sin u\,\sin2u\,\dd u = \frac23$.
:::
::: solution
Let $I_{nn'} = \frac2L\int_0^{L/2}\sin\frac{n\pi x}{L}\sin\frac{n'\pi x}{L}\,\dd x$. The diagonal integrals are $I_{11} = I_{22} = \frac12$ (as in the first exercise). The off-diagonal one, with $u = \pi x/L$, is

$$
I_{12} = \frac2\pi\int_0^{\pi/2}\sin u\,\sin2u\,\dd u = \frac2\pi\int_0^{\pi/2}2\sin^2u\cos u\,\dd u = \frac2\pi\cdot\frac23 = \frac{4}{3\pi}.
$$

So $W_{aa} = W_{bb} = V_0I_{11}I_{22} = V_0/4$ and

$$
W_{ab} = \langle12\vert\hat H'\vert21\rangle = V_0I_{12}I_{21} = V_0\left(\frac{4}{3\pi}\right)^2 = \frac{16V_0}{9\pi^2}.
$$

The eigenvalues of $W$ are $V_0\bigl(\frac14\pm\frac{16}{9\pi^2}\bigr)$, so the splitting is $\frac{32}{9\pi^2}V_0 = 0.360\,V_0$. The good states are $(\psi_{12}\pm\psi_{21})/\sqrt2$: the perturbation respects the symmetry $x \leftrightarrow y$, and the good states are its eigenstates, as [[#lem-good]] predicts.
:::
:::

::: exercise First order is an upper bound {level=3}
Prove that for any $\hat H = \hat H^{0} + \hat H'$, the first-order estimate $E_0^{0} + E_0^{1}$ of the ground-state energy is greater than or equal to the exact ground-state energy. Check the statement with [[#ex-charged-oscillator]] and with helium.
::: solution
Let $\lvert0^{0}\rangle$ be a normalised ground state of $\hat H^{0}$. Then

$$
\langle0^{0}\vert\hat H\vert0^{0}\rangle = \langle0^{0}\vert\hat H^{0}\vert0^{0}\rangle + \langle0^{0}\vert\hat H'\vert0^{0}\rangle = E_0^{0} + E_0^{1},
$$

using [[#eq-first]] (if the level is degenerate, take $\lvert0^{0}\rangle$ to be the good state with the lowest first-order energy; the identity is the same). By [[#thm-variational]] this is at least $E_{\mathrm{gs}}$. For the charged oscillator, $E_0^{0} + E_0^{1} = \frac12\hbar\omega$, above the exact $\frac12\hbar\omega - q^2\mathcal E^2/2m\omega^2$. For helium, $-74.8\,\mathrm{eV}$ is above $-79.0\,\mathrm{eV}$. Nothing similar holds at second order: $E_0^{0} + E_0^{1} + E_0^{2}$ can lie below the true energy.
:::
:::

::: exercise Error in the energy is second order {#exr-quadratic level=3}
Let $\lvert\psi\rangle = \lvert0\rangle + \epsilon\lvert\phi\rangle$, where $\lvert0\rangle$ is the normalised ground state of $\hat H$ and $\lvert\phi\rangle$ is normalised and orthogonal to it. Show that $\langle H\rangle_\psi - E_0 = O(\epsilon^2)$, and give the coefficient.
::: solution
$\langle\psi\vert\psi\rangle = 1 + \lvert\epsilon\rvert^2$. In the numerator, $\langle0\vert\hat H\vert\phi\rangle = E_0\langle0\vert\phi\rangle = 0$, so the cross terms vanish and

$$
\langle H\rangle_\psi = \frac{E_0 + \lvert\epsilon\rvert^2\langle\phi\vert\hat H\vert\phi\rangle}{1 + \lvert\epsilon\rvert^2}, \qquad \langle H\rangle_\psi - E_0 = \frac{\lvert\epsilon\rvert^2\bigl(\langle\phi\vert\hat H\vert\phi\rangle - E_0\bigr)}{1 + \lvert\epsilon\rvert^2}.
$$

The error is $\lvert\epsilon\rvert^2(\langle H\rangle_\phi - E_0) + O(\epsilon^4)$, non-negative and quadratic in the admixture.
:::
:::

::: exercise The Feynman–Hellmann theorem {#exr-fh level=3}
Prove that if $\hat H(\lambda)\lvert n(\lambda)\rangle = E_n(\lambda)\lvert n(\lambda)\rangle$ with normalised, differentiable eigenstates, then $\deriv{E_n}{\lambda} = \langle n\vert\partial\hat H/\partial\lambda\vert n\rangle$. Then use it with $\lambda = e^2$ for hydrogen to derive $\langle1/r\rangle = 1/n^2a$, where $E_n = -me^4/(2(4\pi\varepsilon_0)^2\hbar^2n^2)$.
::: solution
Differentiate $E_n = \langle n\vert\hat H\vert n\rangle$:

$$
\deriv{E_n}{\lambda} = \langle\partial_\lambda n\vert\hat H\vert n\rangle + \langle n\vert\partial_\lambda\hat H\vert n\rangle + \langle n\vert\hat H\vert\partial_\lambda n\rangle = E_n\,\partial_\lambda\langle n\vert n\rangle + \langle n\vert\partial_\lambda\hat H\vert n\rangle,
$$

and $\langle n\vert n\rangle = 1$ for all $\lambda$, so the first term vanishes. This is the theorem, and it is [[#eq-first]] in differential form.

For hydrogen, $\hat H = \hat p^2/2m - \lambda/(4\pi\varepsilon_0r)$ with $\lambda = e^2$, so $\partial\hat H/\partial\lambda = -1/(4\pi\varepsilon_0r)$. Since $E_n \propto -\lambda^2$, $\deriv{E_n}{\lambda} = 2E_n/\lambda$. Hence

$$
-\frac{1}{4\pi\varepsilon_0}\left\langle\frac1r\right\rangle = \frac{2E_n}{e^2} = -\frac{me^2}{(4\pi\varepsilon_0)^2\hbar^2n^2}, \qquad \left\langle\frac1r\right\rangle = \frac{me^2}{4\pi\varepsilon_0\hbar^2n^2} = \frac{1}{n^2a},
$$

with $a = 4\pi\varepsilon_0\hbar^2/me^2$. This is also the virial theorem $\langle V\rangle = 2E_n$ for the Coulomb potential.
:::
:::
