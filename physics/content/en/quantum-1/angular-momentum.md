In classical mechanics angular momentum is conserved whenever the force is central, and that conservation is what makes the Kepler problem solvable ([[mechanics]]). The same is true in quantum mechanics: for a particle in a potential that depends only on the distance $r$ from a centre, angular momentum commutes with the Hamiltonian, and its eigenvalues label the stationary states. Before we can solve the hydrogen atom in [[quantum-1/hydrogen]], then, we need to know what values angular momentum can take and what its eigenfunctions look like.

The answers are surprising in two ways. First, the three components of angular momentum do not commute with one another. You can know the magnitude of $\mathbf L$ and one component, conventionally $L_z$, but not two components at once, so the vector never points in a definite direction. Second, the allowed values are discrete: the magnitude squared is $\hbar^2l(l+1)$ and $L_z$ is $m\hbar$, with $m$ running in integer steps from $-l$ to $l$. Both facts follow from the commutation relations alone, by a ladder argument like the one that solved the harmonic oscillator in [[quantum-1/harmonic-oscillator]]. The algebra also allows half-integer $l$, which orbital motion cannot produce. Nature uses that loophole: it is spin, the subject of [[quantum-1/spin]].

This chapter derives the commutation relations, finds the spectrum algebraically, constructs the spherical harmonics as the eigenfunctions of orbital angular momentum, applies them to a rotating molecule, and ends with a brief account of how two angular momenta combine. The formal tools are those of [[quantum-1/formalism]]: Hermitian operators, commutators, and the theorem that commuting observables share eigenvectors.

## The angular momentum operators {#operators}

Classically $\mathbf L = \mathbf r\times\mathbf p$. In quantum mechanics we replace position and momentum by operators, $\hat{\mathbf p} = -i\hbar\nabla$, so

$$
\hat L_x = \hat y\hat p_z - \hat z\hat p_y, \qquad \hat L_y = \hat z\hat p_x - \hat x\hat p_z, \qquad \hat L_z = \hat x\hat p_y - \hat y\hat p_x.
$$ {#eq-L}

There is no ordering ambiguity: each product pairs a coordinate with a momentum in a different direction, and those commute. The basic commutators in three dimensions are $[\hat x_i, \hat p_j] = i\hbar\delta_{ij}$, $[\hat x_i, \hat x_j] = 0$ and $[\hat p_i, \hat p_j] = 0$. Each $\hat L_i$ is Hermitian, since it is a difference of products of commuting Hermitian operators.

::: theorem Commutation relations of angular momentum {#thm-commutators}
The components of orbital angular momentum satisfy

$$
[\hat L_x, \hat L_y] = i\hbar\hat L_z, \qquad [\hat L_y, \hat L_z] = i\hbar\hat L_x, \qquad [\hat L_z, \hat L_x] = i\hbar\hat L_y,
$$ {#eq-L-comm}

and each component commutes with $\hat L^2 = \hat L_x^2 + \hat L_y^2 + \hat L_z^2$:

$$
[\hat L^2, \hat L_i] = 0, \qquad i = x, y, z.
$$ {#eq-L2-comm}
:::

::: proof
Expand $[\hat L_x, \hat L_y] = [\hat y\hat p_z - \hat z\hat p_y,\ \hat z\hat p_x - \hat x\hat p_z]$ into four commutators. In $[\hat y\hat p_z, \hat x\hat p_z]$ every factor on the left commutes with every factor on the right, so it vanishes, and so does $[\hat z\hat p_y, \hat z\hat p_x]$. The other two are

$$
[\hat y\hat p_z, \hat z\hat p_x] = \hat y[\hat p_z, \hat z]\hat p_x = -i\hbar\,\hat y\hat p_x, \qquad [\hat z\hat p_y, \hat x\hat p_z] = \hat x[\hat z, \hat p_z]\hat p_y = i\hbar\,\hat x\hat p_y.
$$

So $[\hat L_x, \hat L_y] = -i\hbar\hat y\hat p_x + i\hbar\hat x\hat p_y = i\hbar\hat L_z$. The other two relations in [[#eq-L-comm]] follow by cyclic permutation $x\to y\to z\to x$, which maps the definitions [[#eq-L]] into each other.

For [[#eq-L2-comm]] take $i = z$; the others follow by symmetry. Since $[\hat L_z, \hat L_z^2] = 0$,

$$
[\hat L^2, \hat L_z] = [\hat L_x^2, \hat L_z] + [\hat L_y^2, \hat L_z] = \hat L_x[\hat L_x, \hat L_z] + [\hat L_x, \hat L_z]\hat L_x + \hat L_y[\hat L_y, \hat L_z] + [\hat L_y, \hat L_z]\hat L_y.
$$

Substituting $[\hat L_x, \hat L_z] = -i\hbar\hat L_y$ and $[\hat L_y, \hat L_z] = i\hbar\hat L_x$, this is $-i\hbar(\hat L_x\hat L_y + \hat L_y\hat L_x) + i\hbar(\hat L_y\hat L_x + \hat L_x\hat L_y) = 0$.
:::

The relations [[#eq-L-comm]] are written compactly as $[\hat L_i, \hat L_j] = i\hbar\,\varepsilon_{ijk}\hat L_k$, with the Levi-Civita symbol. They are the defining property of angular momentum. Any three Hermitian operators $\hat J_x$, $\hat J_y$, $\hat J_z$ obeying them are called an angular momentum, whether or not they come from $\mathbf r\times\mathbf p$, and everything in the next section uses only these relations. They are also the commutation relations of infinitesimal rotations, which is the deeper reason angular momentum is conserved when the Hamiltonian is rotationally symmetric.

What do they mean physically? By [[quantum-1/formalism#thm-compatible]] two observables have common eigenstates only if they commute. Since $\hat L_x$ and $\hat L_y$ do not, there is no basis of states with definite $L_x$ and $L_y$; and by the Robertson inequality

$$
\Delta L_x\,\Delta L_y \ge \frac\hbar2\abs{\langle L_z\rangle}.
$$

But $\hat L^2$ commutes with every component, so we can choose states with definite $L^2$ and definite $L_z$. That is the standard choice. Nothing singles out the $z$-axis physically; it is just the axis we chose to label states by.

### Why angular momentum is conserved in a central potential

The generalised Ehrenfest theorem, [[quantum-1/formalism#thm-ehrenfest-general]], says that an observable is conserved when it commutes with the Hamiltonian. For a particle in a potential $V(r)$ that depends only on the distance from the origin, $\hat H = \hat p^2/2m + V(r)$, and every component of $\hat{\mathbf L}$ commutes with both terms.

::: example Lz commutes with a central Hamiltonian {#ex-central}
Show that $[\hat L_z, \hat x^2 + \hat y^2 + \hat z^2] = 0$ and $[\hat L_z, \hat p^2] = 0$. Deduce that $[\hat L_z, \hat H] = 0$ for $\hat H = \hat p^2/2m + V(r)$.
::: solution
Use $[\hat L_z, \hat x] = [\hat x\hat p_y - \hat y\hat p_x, \hat x] = -\hat y[\hat p_x, \hat x] = i\hbar\hat y$, and similarly $[\hat L_z, \hat y] = \hat x[\hat p_y, \hat y] = -i\hbar\hat x$ and $[\hat L_z, \hat z] = 0$. Then by the product rule

$$
[\hat L_z, \hat x^2 + \hat y^2] = \hat x(i\hbar\hat y) + (i\hbar\hat y)\hat x + \hat y(-i\hbar\hat x) + (-i\hbar\hat x)\hat y = 0,
$$

since $\hat x$ and $\hat y$ commute; and $[\hat L_z, \hat z^2] = 0$. The same computation with momenta, using $[\hat L_z, \hat p_x] = i\hbar\hat p_y$, $[\hat L_z, \hat p_y] = -i\hbar\hat p_x$ and $[\hat L_z, \hat p_z] = 0$, gives $[\hat L_z, \hat p^2] = 0$.

So $\hat L_z$ commutes with $r^2$ and hence with any function of $r^2$, in particular with $V(r)$ (expand in a power series, or note that $\hat L_z = -i\hbar\,\partial_\varphi$ does not touch $r$). Therefore $[\hat L_z, \hat H] = 0$, and by symmetry the same holds for $\hat L_x$, $\hat L_y$ and $\hat L^2$. Geometrically, $\hat L_z$ generates rotations about $z$; $r^2$ and $p^2$ are unchanged by rotations, so they commute with it.
:::
:::

The consequence is the starting point of the hydrogen atom. Because $\hat H$, $\hat L^2$ and $\hat L_z$ commute with each other, [[quantum-1/formalism#thm-compatible]] lets us choose energy eigenstates that are also eigenstates of $\hat L^2$ and $\hat L_z$, labelled by $l$ and $m$. And because $\hat H$ commutes with $\hat L_\pm$ as well, the $2l + 1$ states with the same $l$ and different $m$ all have the same energy: rotational symmetry forces a $(2l+1)$-fold degeneracy in every central potential. Whatever further degeneracy hydrogen has must come from somewhere else.

::: quiz
A particle is in a state with definite $L_z = 2\hbar$. Which statement must be true?
- [ ] $L_x$ and $L_y$ are both zero.
- [x] The expectation values $\langle L_x\rangle$ and $\langle L_y\rangle$ are zero, but $\Delta L_x\,\Delta L_y \ge \hbar^2$.
- [ ] The state also has definite $L_x$, because $\hat L^2$ commutes with both.
- [ ] $L^2 = 4\hbar^2$.
::: solution
In an $\hat L_z$ eigenstate, $\langle L_x\rangle = \langle L_y\rangle = 0$ (an exercise below proves this from $\hat L_x = [\hat L_y, \hat L_z]/i\hbar$), but the components are not sharp: Robertson gives $\Delta L_x\Delta L_y \ge \frac\hbar2\cdot2\hbar = \hbar^2$. That $\hat L^2$ commutes with $\hat L_x$ and with $\hat L_z$ does not make $\hat L_x$ commute with $\hat L_z$. And we will see that $L^2 = \hbar^2l(l+1)$ with $l \ge 2$, so $L^2 \ge 6\hbar^2$, not $4\hbar^2$.
:::
:::

## The spectrum from the algebra {#spectrum}

As with the oscillator, the trick is a pair of operators that step between eigenvalues.

::: definition Ladder operators for angular momentum {#def-Lpm}
For an angular momentum $\hat{\mathbf J}$ (any three Hermitian operators obeying [[#eq-L-comm]]), the **raising** and **lowering operators** are

$$
\hat J_\pm = \hat J_x \pm i\hat J_y.
$$

They are adjoints of each other, $\hat J_\pm^\dagger = \hat J_\mp$, and satisfy

$$
[\hat J_z, \hat J_\pm] = \pm\hbar\hat J_\pm, \qquad [\hat J^2, \hat J_\pm] = 0, \qquad \hat J_\mp\hat J_\pm = \hat J^2 - \hat J_z^2 \mp \hbar\hat J_z.
$$ {#eq-Jpm}
:::

The first relation is $[\hat J_z, \hat J_x] \pm i[\hat J_z, \hat J_y] = i\hbar\hat J_y \pm i(-i\hbar\hat J_x) = \pm\hbar(\hat J_x \pm i\hat J_y)$. The second follows from [[#eq-L2-comm]]. For the third, multiply out: $(\hat J_x \mp i\hat J_y)(\hat J_x \pm i\hat J_y) = \hat J_x^2 + \hat J_y^2 \pm i[\hat J_x, \hat J_y] = \hat J^2 - \hat J_z^2 \mp\hbar\hat J_z$.

::: theorem Eigenvalues of angular momentum {#thm-spectrum}
Let $|j\,m\rangle$ be a normalised simultaneous eigenvector of $\hat J^2$ and $\hat J_z$. Then the eigenvalues have the form

$$
\hat J^2|j\,m\rangle = \hbar^2j(j+1)|j\,m\rangle, \qquad \hat J_z|j\,m\rangle = m\hbar|j\,m\rangle,
$$ {#eq-jm}

where $j$ is one of $0, \frac12, 1, \frac32, 2, \ldots$ and, for given $j$, $m$ takes the $2j + 1$ values $-j, -j+1, \ldots, j-1, j$. With the standard choice of phases,

$$
\hat J_\pm|j\,m\rangle = \hbar\sqrt{j(j+1) - m(m\pm1)}\;|j\,m\pm1\rangle.
$$ {#eq-ladder-coeff}
:::

::: proof
Write the $\hat J^2$ eigenvalue as $\hbar^2\lambda$ and the $\hat J_z$ eigenvalue as $\hbar m$; we must show $\lambda = j(j+1)$ with $j$ as stated.

*Stepping.* By [[#eq-Jpm]], $\hat J_z(\hat J_\pm|j\,m\rangle) = \hat J_\pm\hat J_z|j\,m\rangle \pm\hbar\hat J_\pm|j\,m\rangle = (m\pm1)\hbar\,\hat J_\pm|j\,m\rangle$, and $\hat J^2$ commutes with $\hat J_\pm$. So $\hat J_\pm|j\,m\rangle$ is either zero or an eigenvector with the same $\lambda$ and $m$ raised or lowered by one.

*Bounds.* The norm of the stepped vector is, using $\hat J_\pm^\dagger = \hat J_\mp$ and [[#eq-Jpm]],

$$
\norm{\hat J_\pm|j\,m\rangle}^2 = \langle j\,m|\hat J_\mp\hat J_\pm|j\,m\rangle = \hbar^2\bigl(\lambda - m^2 \mp m\bigr) = \hbar^2\bigl(\lambda - m(m\pm1)\bigr) \ge 0.
$$

So for fixed $\lambda$, $m$ is bounded: $m^2 \le \lambda - \abs m$ at least, and in particular $m^2 \le \lambda$. Repeated raising cannot go on for ever, so there is a top value $m = m_{\max}$ with $\hat J_+|j\,m_{\max}\rangle = 0$. Then $\lambda - m_{\max}(m_{\max} + 1) = 0$. Likewise there is a bottom value $m_{\min}$ with $\hat J_-|j\,m_{\min}\rangle = 0$, so $\lambda - m_{\min}(m_{\min} - 1) = 0$.

*Solving.* Equating the two expressions for $\lambda$, $m_{\max}(m_{\max}+1) = m_{\min}(m_{\min}-1)$, which factorises as $(m_{\max} + m_{\min})(m_{\max} - m_{\min} + 1) = 0$. The second factor is positive because $m_{\max} \ge m_{\min}$, so $m_{\min} = -m_{\max}$. Call $m_{\max} = j$. Then $\lambda = j(j+1)$ and $m$ runs from $-j$ to $j$. Since the top is reached from the bottom in whole steps, $2j$ is a non-negative integer: $j \in \{0, \frac12, 1, \frac32, \ldots\}$.

*Coefficients.* The norm computed above is $\hbar^2\bigl(j(j+1) - m(m\pm1)\bigr)$. Choosing the phase of $|j\,m\pm1\rangle$ so that the coefficient is real and positive gives [[#eq-ladder-coeff]].
:::

The square of the angular momentum is $\hbar^2j(j+1)$, not $\hbar^2j^2$. The largest possible $L_z$, $j\hbar$, is less than the magnitude $\sqrt{j(j+1)}\,\hbar$, and the difference is the irreducible spread of $L_x$ and $L_y$: in the state $|j\,j\rangle$, $\langle L_x^2 + L_y^2\rangle = \hbar^2j(j+1) - \hbar^2j^2 = \hbar^2j$. That leftover cannot be removed.

::: example The matrices for j = 1 {#ex-j1}
For $j = 1$, write down the matrices of $\hat J_z$, $\hat J_+$, $\hat J_-$ and $\hat J_x$ in the basis $|1\,1\rangle$, $|1\,0\rangle$, $|1\,{-1}\rangle$, and find the eigenvalues of $\hat J_x$.
::: solution
$\hat J_z$ is diagonal with entries $\hbar$, $0$, $-\hbar$. By [[#eq-ladder-coeff]], $\hat J_+|1\,0\rangle = \hbar\sqrt{2 - 0}\,|1\,1\rangle = \sqrt2\hbar|1\,1\rangle$ and $\hat J_+|1\,{-1}\rangle = \hbar\sqrt{2 - 0}\,|1\,0\rangle = \sqrt2\hbar|1\,0\rangle$, while $\hat J_+|1\,1\rangle = 0$. So

$$
\hat J_z = \hbar\begin{pmatrix}1 & 0 & 0\\ 0 & 0 & 0\\ 0 & 0 & -1\end{pmatrix}, \quad \hat J_+ = \sqrt2\hbar\begin{pmatrix}0 & 1 & 0\\ 0 & 0 & 1\\ 0 & 0 & 0\end{pmatrix}, \quad \hat J_- = \hat J_+^\dagger = \sqrt2\hbar\begin{pmatrix}0 & 0 & 0\\ 1 & 0 & 0\\ 0 & 1 & 0\end{pmatrix}.
$$

Then $\hat J_x = \frac12(\hat J_+ + \hat J_-)$:

$$
\hat J_x = \frac{\hbar}{\sqrt2}\begin{pmatrix}0 & 1 & 0\\ 1 & 0 & 1\\ 0 & 1 & 0\end{pmatrix}.
$$

Its characteristic polynomial, in units of $\hbar$, is $-\mu^3 + \mu = -\mu(\mu - 1)(\mu + 1)$ (the off-diagonal entries $1/\sqrt2$ contribute $2\times\frac12\mu$). So the eigenvalues of $\hat J_x$ are $\hbar$, $0$, $-\hbar$, the same as those of $\hat J_z$, as rotational symmetry requires. The eigenvector for $+\hbar$ is $\frac12(1, \sqrt2, 1)$: a state with definite $J_x = \hbar$ is a superposition of all three $J_z$ states, with probabilities $\frac14$, $\frac12$, $\frac14$.
:::
:::

::: example Measuring a transverse component {#ex-measure-lx}
A particle with $l = 1$ is in the state $|1\,1\rangle$. Using the eigenvectors of $\hat L_x$ from [[#ex-j1]], find the probabilities of the results $\hbar$, $0$, $-\hbar$ in a measurement of $L_x$, and check against $\langle L_x^2\rangle$.
::: solution
The normalised eigenvectors of the matrix $\hat J_x$ of [[#ex-j1]] are, in the basis $|1\,1\rangle$, $|1\,0\rangle$, $|1\,{-1}\rangle$,

$$
v_{+} = \tfrac12\bigl(1, \sqrt2, 1\bigr), \qquad v_0 = \tfrac{1}{\sqrt2}\bigl(1, 0, -1\bigr), \qquad v_- = \tfrac12\bigl(1, -\sqrt2, 1\bigr),
$$

for the eigenvalues $\hbar$, $0$, $-\hbar$. (Check $v_0$: the middle row of $\hat J_x v_0$ is $\frac{\hbar}{\sqrt2}\cdot\frac{1}{\sqrt2}(1 - 1) = 0$, and the outer rows vanish because the middle component does.) The state $|1\,1\rangle$ is the column $(1, 0, 0)$, so the probabilities are the squared first components:

$$
P(\hbar) = \frac14, \qquad P(0) = \frac12, \qquad P(-\hbar) = \frac14.
$$

The mean is $\frac14\hbar - \frac14\hbar = 0$, as it must be in an $\hat L_z$ eigenstate, and the mean square is $\frac14\hbar^2 + \frac14\hbar^2 = \frac12\hbar^2$, which matches the general formula $\frac{\hbar^2}{2}\bigl(l(l+1) - m^2\bigr) = \frac{\hbar^2}{2}(2 - 1)$ proved in the exercises. A state with the largest possible $L_z$ still gives $L_x = 0$ half the time. After the measurement, the state is the corresponding $v$, and a subsequent measurement of $L_z$ is again uncertain.
:::
:::

::: remark Space quantisation and the Zeeman effect
An electron with orbital angular momentum $\hat{\mathbf L}$ carries a magnetic moment $\hat{\boldsymbol\mu} = -(e/2m_e)\hat{\mathbf L} = -\mu_B\hat{\mathbf L}/\hbar$, where $\mu_B = e\hbar/2m_e = 5.788\times10^{-5}\,\mathrm{eV/T}$ is the Bohr magneton. In a field $B\hat{\mathbf z}$ the energy $-\hat{\boldsymbol\mu}\cdot\mathbf B = \mu_BB\hat L_z/\hbar$ adds $m\mu_BB$ to the level, so a level with angular momentum $l$ splits into $2l + 1$ equally spaced sublevels, $5.8\times10^{-5}\,\mathrm{eV}$ apart per tesla. Pieter Zeeman observed the broadening and splitting of spectral lines in a magnetic field in 1896, and the $2l + 1$ sublevels are the "space quantisation" of the orientation of $\mathbf L$ that the old quantum theory postulated. The real pattern in most atoms is more complicated (the "anomalous" Zeeman effect), because spin contributes to the magnetic moment with a different ratio; that story is told in [[quantum-1/spin]].
:::

## Orbital angular momentum and spherical harmonics {#harmonics}

For orbital angular momentum we can say more, because the operators act on wavefunctions. In spherical coordinates $(r, \theta, \varphi)$, a calculation with the chain rule (Griffiths & Schroeter §4.3, or the exercises of [[math-methods/vector-calculus]]) gives

$$
\hat L_z = -i\hbar\pdv{}{\varphi}, \qquad \hat L^2 = -\hbar^2\left[\frac{1}{\sin\theta}\pdv{}{\theta}\left(\sin\theta\pdv{}{\theta}\right) + \frac{1}{\sin^2\theta}\frac{\partial^2}{\partial\varphi^2}\right],
$$ {#eq-L-spherical}

and $\hat L_\pm = \hbar e^{\pm i\varphi}\bigl(\pm\partial_\theta + i\cot\theta\,\partial_\varphi\bigr)$. None of them involves $r$: angular momentum acts only on the angles. The bracket in $\hat L^2$ is the angular part of the Laplacian, so

$$
\nabla^2 = \frac{1}{r^2}\pdv{}{r}\left(r^2\pdv{}{r}\right) - \frac{\hat L^2}{\hbar^2r^2},
$$ {#eq-laplacian}

a relation that will separate the hydrogen problem into a radial and an angular part.

The eigenfunctions of $\hat L_z$ are $e^{im\varphi}$. Here a new condition enters that the algebra did not know about. A wavefunction must be a single-valued function of position, and $\varphi$ and $\varphi + 2\pi$ are the same point, so $e^{2\pi im} = 1$ and **$m$ must be an integer**. Since $m$ and $l$ differ by integers, $l$ is an integer too. Orbital angular momentum allows $l = 0, 1, 2, \ldots$ only; the half-integer values of [[#thm-spectrum]] must have some other origin.

::: definition Spherical harmonics {#def-Ylm}
The **spherical harmonics** $Y_l^m(\theta,\varphi)$, $l = 0, 1, 2, \ldots$, $m = -l, \ldots, l$, are the normalised simultaneous eigenfunctions

$$
\hat L^2Y_l^m = \hbar^2l(l+1)Y_l^m, \qquad \hat L_zY_l^m = m\hbar Y_l^m, \qquad \int_0^{2\pi}\!\!\int_0^\pi\bigl(Y_{l'}^{m'}\bigr)^*Y_l^m\sin\theta\,\dd\theta\,\dd\varphi = \delta_{ll'}\delta_{mm'},
$$

with the Condon–Shortley phases fixed by [[#eq-ladder-coeff]]. They have the form $Y_l^m = N_{lm}P_l^m(\cos\theta)e^{im\varphi}$, where $P_l^m$ is an associated Legendre function.
:::

We can construct them by the ladder method. The top state satisfies $\hat L_+Y_l^l = 0$. With $Y_l^l = f(\theta)e^{il\varphi}$, the operator $\pm\partial_\theta + i\cot\theta\,\partial_\varphi$ with the upper sign gives $f' - l\cot\theta\,f = 0$, whose solution is $f = \sin^l\theta$. So $Y_l^l \propto \sin^l\theta\,e^{il\varphi}$, and the others follow by applying $\hat L_-$. The first few, which you should know, are

$$
\begin{aligned}
Y_0^0 &= \frac{1}{\sqrt{4\pi}}, \\
Y_1^0 &= \sqrt{\frac{3}{4\pi}}\cos\theta, \qquad Y_1^{\pm1} = \mp\sqrt{\frac{3}{8\pi}}\sin\theta\,e^{\pm i\varphi}, \\
Y_2^0 &= \sqrt{\frac{5}{16\pi}}\bigl(3\cos^2\theta - 1\bigr), \qquad Y_2^{\pm1} = \mp\sqrt{\frac{15}{8\pi}}\sin\theta\cos\theta\,e^{\pm i\varphi}, \qquad Y_2^{\pm2} = \sqrt{\frac{15}{32\pi}}\sin^2\theta\,e^{\pm2i\varphi}.
\end{aligned}
$$

Written in Cartesian coordinates on the unit sphere, $rY_1^0 \propto z$ and $rY_1^{\pm1} \propto \mp(x \pm iy)$. The $l = 1$ harmonics are just the coordinates, and the $l = 2$ harmonics are the quadratic combinations with zero trace. Under the parity operation $\mathbf r \to -\mathbf r$, which is $\theta \to \pi - \theta$, $\varphi \to \varphi + \pi$, they pick up $(-1)^l$. In chemistry, the real combinations of $Y_1^{\pm1}$ are the $p_x$ and $p_y$ orbitals and $Y_1^0$ is $p_z$.

::: example Checking an eigenfunction {#ex-Y10}
Verify that $Y_1^0 = \sqrt{3/4\pi}\,\cos\theta$ is normalised and is an eigenfunction of $\hat L^2$ with eigenvalue $2\hbar^2$, and that $\hat L_+Y_1^0 = \sqrt2\hbar\,Y_1^1$.
::: solution
Normalisation, with $u = \cos\theta$, $\dd u = -\sin\theta\,\dd\theta$:

$$
\frac{3}{4\pi}\int_0^{2\pi}\dd\varphi\int_0^\pi\cos^2\theta\sin\theta\,\dd\theta = \frac{3}{4\pi}\cdot2\pi\cdot\int_{-1}^1u^2\,\dd u = \frac{3}{4\pi}\cdot2\pi\cdot\frac23 = 1.
$$

There is no $\varphi$ dependence, so only the $\theta$ part of [[#eq-L-spherical]] acts: $\partial_\theta\cos\theta = -\sin\theta$, then $\sin\theta\cdot(-\sin\theta) = -\sin^2\theta$, then $\frac{1}{\sin\theta}\partial_\theta(-\sin^2\theta) = -2\cos\theta$. Hence $\hat L^2\cos\theta = -\hbar^2(-2\cos\theta) = 2\hbar^2\cos\theta = \hbar^2\cdot1\cdot2\cos\theta$, which is $l(l+1)\hbar^2$ with $l = 1$.

Finally, $\hat L_+ = \hbar e^{i\varphi}(\partial_\theta + i\cot\theta\,\partial_\varphi)$ acting on $\sqrt{3/4\pi}\cos\theta$ gives $\hbar e^{i\varphi}\sqrt{3/4\pi}(-\sin\theta) = -\sqrt2\hbar\cdot\sqrt{3/8\pi}\sin\theta\,e^{i\varphi} = \sqrt2\hbar\,Y_1^1$, with the minus sign of $Y_1^1$ absorbed. The coefficient $\sqrt2\hbar$ is [[#eq-ladder-coeff]] with $l = 1$, $m = 0$: $\hbar\sqrt{2 - 0}$.
:::
:::

::: widget plot
f: 1/(4*pi); 3*cos(x)^2/(4*pi); 5*(3*cos(x)^2 - 1)^2/(16*pi)
x: 0, pi
y: 0, 0.85
piticks: true
labels: l = 0; l = 1; l = 2 (all m = 0)
caption: The angular probability densities $\abs{Y_l^0(\theta)}^2$ against the polar angle $\theta$ from $0$ (the $+z$ direction) to $\pi$. The $l = 0$ density is the constant $1/4\pi$: an $s$ state has no preferred direction. $\abs{Y_1^0}^2$ peaks along the axis and vanishes at $\theta = \pi/2$, the dumbbell of a $p_z$ orbital. $\abs{Y_2^0}^2$ has nodes at $\cos^2\theta = 1/3$, i.e. $\theta = 54.7^\circ$ and $125.3^\circ$. Count the zeros: $Y_l^0$ has $l$ nodal cones.
:::

::: widget plot
f: 5*(3*cos(x)^2 - 1)^2/(16*pi); 15*sin(x)^2*cos(x)^2/(8*pi); 15*sin(x)^4/(32*pi)
x: 0, pi
y: 0, 0.85
piticks: true
labels: m = 0; |m| = 1; |m| = 2 (all l = 2)
caption: The three distinct angular densities for $l = 2$. As $\abs m$ increases at fixed $l$, the density moves from the poles toward the equator: $\abs{Y_2^{\pm2}}^2 \propto \sin^4\theta$ is concentrated near $\theta = \pi/2$, where the orbit of a classical particle with $L_z$ close to $\abs{\mathbf L}$ would lie. None of these depends on $\varphi$, because $\abs{e^{im\varphi}} = 1$; every density is symmetric about the $z$-axis.
:::

::: warning The vector does not point along z
It is tempting to picture $|l\,m\rangle$ with $m = l$ as "$\mathbf L$ pointing along $+z$". It cannot be. $\abs{\mathbf L} = \sqrt{l(l+1)}\,\hbar$ is always larger than $l\hbar$, so the largest $L_z$ is short of the full length by a finite angle. The usual **vector model** draws $\mathbf L$ as lying somewhere on a cone of half-angle $\theta$ with $\cos\theta = m/\sqrt{l(l+1)}$ about $z$, with $L_x$ and $L_y$ undetermined. For $l = 1$, $m = 1$ that angle is $45^\circ$. Only as $l \to \infty$ does the cone close up, which is how the classical picture of a definite vector re-emerges.
:::

## The rigid rotor {#rotor}

The simplest application is a molecule rotating about its centre of mass. For a diatomic molecule of reduced mass $\mu$ and fixed bond length $r_0$, the moment of inertia is $I = \mu r_0^2$, and the classical rotational energy is $L^2/2I$. Quantum mechanically

$$
\hat H = \frac{\hat L^2}{2I}, \qquad E_l = \frac{\hbar^2l(l+1)}{2I}, \qquad l = 0, 1, 2, \ldots,
$$ {#eq-rotor}

each level with degeneracy $2l + 1$ (the $m$ values) and eigenfunctions $Y_l^m(\theta,\varphi)$ describing the orientation of the molecular axis. Spectroscopists write $E_l = hBl(l+1)$ with the **rotational constant** $B = \hbar/4\pi I$ (in hertz). A polar molecule absorbs or emits a photon in a transition with $\Delta l = \pm1$ (a selection rule derived in [[quantum-2/time-dependent]]), so the absorption lines from $l$ to $l + 1$ lie at

$$
\nu = \frac{E_{l+1} - E_l}{h} = 2B(l + 1),
$$

equally spaced by $2B$, a pattern observed in the far infrared and microwave spectra of every polar diatomic gas.

::: example Carbon monoxide {#ex-co}
The lowest rotational line of $^{12}\mathrm C^{16}\mathrm O$, $l = 0 \to 1$, is at $115.271\,\mathrm{GHz}$. Find $B$, the moment of inertia, and the bond length. Atomic masses: $12.0000\,\mathrm u$ and $15.9949\,\mathrm u$.
::: solution
The line is at $2B$, so $B = 57.636\,\mathrm{GHz}$. Then

$$
I = \frac{\hbar}{4\pi B} = \frac{1.054572\times10^{-34}}{4\pi(5.7636\times10^{10})} = 1.4561\times10^{-46}\,\mathrm{kg\,m^2}.
$$

The reduced mass is $\mu = (12.0000)(15.9949)/27.9949\,\mathrm u = 6.85621\,\mathrm u = 1.13851\times10^{-26}\,\mathrm{kg}$, so

$$
r_0 = \sqrt{\frac{I}{\mu}} = \sqrt{\frac{1.4561\times10^{-46}}{1.13851\times10^{-26}}} = 1.131\times10^{-10}\,\mathrm m = 113.1\,\mathrm{pm}.
$$

The next lines are at $230.54$, $345.81\,\mathrm{GHz}$ and so on (slightly lower in reality, because the molecule stretches as it spins faster). The $115\,\mathrm{GHz}$ line, with wavelength $2.60\,\mathrm{mm}$, is the line radio astronomers use to map cold molecular gas in galaxies. The energy of the $l = 1$ level corresponds to $hB\cdot2/k_B = 5.5\,\mathrm K$, so at room temperature many rotational levels are populated, in sharp contrast to the frozen vibrations of [[quantum-1/harmonic-oscillator#ex-hcl]].
:::
:::

### Which levels are populated?

At temperature $T$ the probability of finding a molecule in a particular state $|l\,m\rangle$ is proportional to $e^{-E_l/k_BT}$, and there are $2l + 1$ such states with energy $E_l$. The population of the level $l$ is therefore

$$
P_l = \frac{(2l + 1)\,e^{-hBl(l+1)/k_BT}}{Z}, \qquad Z = \sum_{l=0}^\infty(2l + 1)\,e^{-hBl(l+1)/k_BT}.
$$

Two effects compete. The degeneracy grows linearly with $l$ and the Boltzmann factor falls; the product peaks where its derivative with respect to $l$ vanishes, at $l_{\max} \approx \sqrt{k_BT/2hB} - \frac12$. For CO at $300\,\mathrm K$, $k_BT/hB = 108.5$, so $l_{\max} \approx 6.9$; summing the series numerically gives the largest population, $8.2\%$, at $l = 7$, with only $0.9\%$ of the molecules in the ground state $l = 0$. When $k_BT \gg hB$ the sum is well approximated by an integral, $Z \approx k_BT/hB$, which is the classical result for a rotor with two rotational degrees of freedom and gives the rotational contribution $R$ to the molar heat capacity of a diatomic gas. That is why the rotational degrees of freedom count fully at room temperature while vibrations, with $\hbar\omega \gg k_BT$, do not.

::: remark The semiclassical size of l
For large $l$, $l(l+1) = (l + \frac12)^2 - \frac14 \approx (l + \frac12)^2$, so the magnitude of the angular momentum is close to $(l + \frac12)\hbar$. A classical particle of momentum $p$ passing the origin at impact parameter $b$ has $L = pb$, so the partial wave with quantum number $l$ corresponds to particles passing at distance $b \approx (l + \frac12)\hbar/p = (l + \frac12)\lambda/2\pi$. This picture is the basis of partial-wave scattering theory in [[quantum-2/scattering]]: at low energy, when the de Broglie wavelength is large compared with the range of the force, only $l = 0$ matters.
:::

## Adding two angular momenta {#addition}

An electron in an atom has orbital angular momentum $\hat{\mathbf L}$ and spin $\hat{\mathbf S}$; two electrons have two of each. When interactions couple them, the conserved quantity is the total $\hat{\mathbf J} = \hat{\mathbf J}_1 + \hat{\mathbf J}_2$, and we need its eigenstates. Because $\hat{\mathbf J}_1$ and $\hat{\mathbf J}_2$ act on different degrees of freedom, their components commute with each other, and one checks at once that $\hat{\mathbf J}$ obeys [[#eq-L-comm]]. So [[#thm-spectrum]] applies to it: the total has eigenvalues $\hbar^2j(j+1)$ and $m\hbar$.

There are two natural bases for the $(2j_1 + 1)(2j_2 + 1)$ states with fixed $j_1$ and $j_2$. The **uncoupled basis** $|j_1\,m_1\rangle|j_2\,m_2\rangle$ diagonalises $\hat J_{1z}$ and $\hat J_{2z}$. The **coupled basis** $|j\,m\rangle$ diagonalises $\hat J^2$ and $\hat J_z$ (together with $\hat J_1^2$ and $\hat J_2^2$, which commute with everything here).

::: theorem Addition of angular momenta {#thm-addition}
For fixed $j_1$ and $j_2$, the total angular momentum quantum number takes each of the values

$$
j = \abs{j_1 - j_2},\ \abs{j_1 - j_2} + 1,\ \ldots,\ j_1 + j_2
$$

exactly once, and $m = m_1 + m_2$.
:::

::: proof
Since $\hat J_z = \hat J_{1z} + \hat J_{2z}$, each uncoupled state is an eigenstate of $\hat J_z$ with $m = m_1 + m_2$. Count the uncoupled states with a given $m$; assume $j_1 \ge j_2$. The value $m = j_1 + j_2$ occurs once ($m_1 = j_1$, $m_2 = j_2$); $m = j_1 + j_2 - 1$ occurs twice; and in general the number $n(m)$ increases by one each time $m$ decreases by one, until $m = j_1 - j_2$, after which it stays constant at $2j_2 + 1$ down to $m = -(j_1 - j_2)$, and then decreases symmetrically.

Each multiplet of total $j$ contributes one state to every $m$ with $\abs m \le j$. The single state at $m = j_1 + j_2$ must therefore belong to a multiplet with $j = j_1 + j_2$, which uses one state at each lower $m$. At $m = j_1 + j_2 - 1$ there is one state left over, which must start a multiplet with $j = j_1 + j_2 - 1$. Continuing, a new multiplet starts at each $m$ where $n(m)$ increases, i.e. for $j = j_1 + j_2, j_1 + j_2 - 1, \ldots, j_1 - j_2$, and none starts below that. As a check, $\sum_{j=j_1-j_2}^{j_1+j_2}(2j + 1) = (2j_1 + 1)(2j_2 + 1)$, so all states are accounted for.
:::

Which basis is "right" depends on the Hamiltonian. If the two angular momenta do not interact, the uncoupled states are energy eigenstates and the coupled ones are merely another basis. If the Hamiltonian contains a coupling of the form $\hat{\mathbf J}_1\cdot\hat{\mathbf J}_2$, as the spin–orbit interaction $\hat{\mathbf L}\cdot\hat{\mathbf S}$ in atoms does, the coupled basis is the one in which it is diagonal, because

$$
\hat{\mathbf J}_1\cdot\hat{\mathbf J}_2 = \frac12\left(\hat J^2 - \hat J_1^2 - \hat J_2^2\right) \quad\text{has eigenvalues}\quad \frac{\hbar^2}{2}\bigl(j(j+1) - j_1(j_1+1) - j_2(j_2+1)\bigr).
$$

The levels of different $j$ are then split, and that splitting is the fine structure of atomic spectra.

The coefficients $\langle j_1\,m_1;\,j_2\,m_2|j\,m\rangle$ relating the two bases are the **Clebsch–Gordan coefficients**. They are found by starting from the top state $|j_1 + j_2,\ j_1 + j_2\rangle = |j_1\,j_1\rangle|j_2\,j_2\rangle$, applying $\hat J_- = \hat J_{1-} + \hat J_{2-}$ to step down, and using orthogonality to construct the top state of each lower multiplet. They are tabulated in every textbook and in the Particle Data Group tables.

::: example Two units of orbital angular momentum {#ex-1x1}
Two particles each have $l = 1$. Which total $L$ values are possible, how many states belong to each, and what is the $|L = 2,\ M = 1\rangle$ state in the uncoupled basis?
::: solution
By [[#thm-addition]], $L = 0, 1, 2$, with $1 + 3 + 5 = 9 = 3\times3$ states. The top state is $|2\,2\rangle = |1\,1\rangle|1\,1\rangle$. Apply $\hat L_- = \hat L_{1-} + \hat L_{2-}$. On the left, [[#eq-ladder-coeff]] with $l = 2$, $m = 2$ gives $\hat L_-|2\,2\rangle = \hbar\sqrt{6 - 2}\,|2\,1\rangle = 2\hbar|2\,1\rangle$. On the right, each single-particle lowering gives $\hbar\sqrt{2 - 0}$:

$$
\hat L_-\bigl(|1\,1\rangle|1\,1\rangle\bigr) = \sqrt2\hbar\bigl(|1\,0\rangle|1\,1\rangle + |1\,1\rangle|1\,0\rangle\bigr).
$$

Hence $|2\,1\rangle = \frac{1}{\sqrt2}\bigl(|1\,0\rangle|1\,1\rangle + |1\,1\rangle|1\,0\rangle\bigr)$. The orthogonal combination with the same $M = 1$, $\frac{1}{\sqrt2}\bigl(|1\,1\rangle|1\,0\rangle - |1\,0\rangle|1\,1\rangle\bigr)$, is the top of the $L = 1$ multiplet. The $L = 2$ state is symmetric under exchange of the particles and the $L = 1$ state antisymmetric, a pattern that matters for identical particles in [[quantum-2/identical-particles]].
:::
:::

::: history Angular momentum quantisation
Arnold Sommerfeld extended Bohr's model in 1916 to elliptical orbits with quantised orientations, "space quantisation", which Otto Stern and Walther Gerlach tested with silver atoms in 1922. The commutation relations [[#eq-L-comm]] and the spectrum $\hbar^2j(j+1)$ were derived by Max Born, Werner Heisenberg and Pascual Jordan in their 1926 paper on matrix mechanics. The spherical harmonics are much older: Pierre-Simon Laplace and Adrien-Marie Legendre introduced them in the 1780s in the theory of gravitational attraction. Alfred Clebsch and Paul Gordan studied the coefficients that bear their names in the invariant theory of the 1860s and 1870s, long before quantum mechanics; Eugene Wigner's book on group theory and atomic spectra (1931) and Edward Condon and George Shortley's *The Theory of Atomic Spectra* (1935) made them standard tools of physics. The phase convention we use is Condon and Shortley's.
:::

## Where this leads {#leads}

In [[quantum-1/hydrogen]] the Laplacian splits by [[#eq-laplacian]] into a radial part and $\hat L^2$, the angular part of every stationary state in a central potential is a $Y_l^m$, and the radial equation contains the centrifugal term $\hbar^2l(l+1)/2mr^2$. In [[quantum-1/spin]] the half-integer values of [[#thm-spectrum]] turn out to be realised by an internal angular momentum of the electron, with $j = \frac12$ and $2\times2$ matrices. Adding spin and orbital angular momentum gives the fine structure of atoms in [[quantum-2/atomic-structure]], and the Chemistry Atlas uses the same spherical harmonics to build atomic orbitals in [the hydrogen atom](/learn/chemistry/lesson.php?c=quantum-chemistry&l=hydrogen-atom).

::: summary
- $\hat{\mathbf L} = \hat{\mathbf r}\times\hat{\mathbf p}$ has components with $[\hat L_i, \hat L_j] = i\hbar\varepsilon_{ijk}\hat L_k$ and $[\hat L^2, \hat L_i] = 0$: only $L^2$ and one component can be sharp.
- From the commutation relations alone, $J^2 = \hbar^2j(j+1)$ and $J_z = m\hbar$ with $2j \in \{0, 1, 2, \ldots\}$ and $m = -j, \ldots, j$; $\hat J_\pm|j\,m\rangle = \hbar\sqrt{j(j+1) - m(m\pm1)}\,|j\,m\pm1\rangle$.
- For orbital angular momentum $\hat L_z = -i\hbar\,\partial_\varphi$, and single-valuedness forces integer $m$ and $l$.
- The eigenfunctions are the spherical harmonics $Y_l^m(\theta,\varphi) \propto P_l^m(\cos\theta)e^{im\varphi}$, orthonormal on the sphere, with parity $(-1)^l$.
- $\nabla^2 = r^{-2}\partial_r(r^2\partial_r) - \hat L^2/\hbar^2r^2$ separates central-force problems.
- A rigid rotor has $E_l = \hbar^2l(l+1)/2I$ with degeneracy $2l + 1$; CO's $115.271\,\mathrm{GHz}$ line gives a bond length of $113.1\,\mathrm{pm}$.
- Two angular momenta combine to $j = \abs{j_1 - j_2}, \ldots, j_1 + j_2$, each once, with $m = m_1 + m_2$.
:::

## Exercises {#exercises}

::: exercise Length of the vector {level=1 check="sqrt(6)"}
Give the magnitude of the orbital angular momentum, in units of $\hbar$, for a state with $l = 2$, and list the possible values of $L_z$.
::: solution
$\abs{\mathbf L} = \sqrt{l(l+1)}\,\hbar = \sqrt6\,\hbar = 2.449\,\hbar$. The possible values of $L_z$ are $-2\hbar, -\hbar, 0, \hbar, 2\hbar$.
:::
:::

::: exercise The narrowest cone {level=1 check="30"}
For $l = 3$, $m = 3$, find the half-angle in degrees of the cone of the vector model, $\cos\theta = m/\sqrt{l(l+1)}$.
::: solution
$\cos\theta = 3/\sqrt{12} = \sqrt3/2$, so $\theta = 30^\circ$. For $l = 1$, $m = 1$ it was $45^\circ$; the cone narrows as $l$ grows, but never closes.
:::
:::

::: exercise The second CO line {level=1 check="230.54"}
Using $B = 57.636\,\mathrm{GHz}$ for CO, find the frequency in GHz of the $l = 1 \to 2$ rotational line, treating the molecule as rigid.
::: solution
$\nu = 2B(l + 1)$ with $l = 1$, so $\nu = 4B = 230.54\,\mathrm{GHz}$. The measured line is at $230.538\,\mathrm{GHz}$; the small shortfall is centrifugal stretching.
:::
:::

::: exercise Spread of a transverse component {level=2 check="1/2"}
Show that in the state $|l\,m\rangle$, $\langle L_x^2\rangle = \frac{\hbar^2}{2}\bigl(l(l+1) - m^2\bigr)$. Evaluate it in units of $\hbar^2$ for $l = 1$, $m = 1$.
::: hint
By symmetry about the $z$-axis, $\langle L_x^2\rangle = \langle L_y^2\rangle$.
:::
::: solution
$\langle L_x^2\rangle + \langle L_y^2\rangle = \langle L^2 - L_z^2\rangle = \hbar^2\bigl(l(l+1) - m^2\bigr)$. To see that the two terms are equal, write $\hat L_x^2 - \hat L_y^2 = \frac12(\hat L_+^2 + \hat L_-^2)$, which changes $m$ by $\pm2$ and so has zero expectation value in $|l\,m\rangle$. Hence each is half the sum. For $l = 1$, $m = 1$: $\frac12(2 - 1) = \frac12$.
:::
:::

::: exercise Normalising Y₁¹ {level=2}
Show that $\int\abs{Y_1^1}^2\,\dd\Omega = 1$ for $Y_1^1 = -\sqrt{3/8\pi}\sin\theta\,e^{i\varphi}$, and that $Y_1^1$ is orthogonal to $Y_1^0$.
::: solution
$\abs{Y_1^1}^2 = (3/8\pi)\sin^2\theta$, and $\int_0^\pi\sin^3\theta\,\dd\theta = \int_{-1}^1(1 - u^2)\,\dd u = \frac43$. So the integral is $(3/8\pi)\cdot2\pi\cdot\frac43 = 1$. Orthogonality to $Y_1^0$ follows from the $\varphi$ integral alone: $\int_0^{2\pi}e^{i\varphi}\,\dd\varphi = 0$. More generally, harmonics with different $m$ are orthogonal because of the factor $e^{i(m - m')\varphi}$, and those with the same $m$ but different $l$ because they are eigenfunctions of the Hermitian $\hat L^2$ with different eigenvalues.
:::
:::

::: exercise Counting multiplets {level=2 check="3"}
A particle with $j_1 = \frac32$ couples to one with $j_2 = 1$. How many distinct values of the total $j$ occur? List them and check the count of states.
::: solution
By [[#thm-addition]], $j = \frac12, \frac32, \frac52$: three values. The numbers of states are $2 + 4 + 6 = 12 = 4\times3$.
:::
:::

::: exercise Transverse components in an Lz eigenstate {level=3}
Prove that $\langle L_x\rangle = \langle L_y\rangle = 0$ in any eigenstate of $\hat L_z$. Then show that the state $|l\,l\rangle$ saturates the uncertainty relation $\Delta L_x\,\Delta L_y \ge \frac\hbar2\abs{\langle L_z\rangle}$.
::: solution
From [[#eq-L-comm]], $i\hbar\hat L_x = [\hat L_y, \hat L_z]$. If $\hat L_z|\psi\rangle = m\hbar|\psi\rangle$, then

$$
i\hbar\langle L_x\rangle = \langle\psi|\hat L_y\hat L_z - \hat L_z\hat L_y|\psi\rangle = m\hbar\langle\psi|\hat L_y|\psi\rangle - m\hbar\langle\psi|\hat L_y|\psi\rangle = 0,
$$

using hermiticity of $\hat L_z$ to act to the left in the second term. The same argument with $i\hbar\hat L_y = [\hat L_z, \hat L_x]$ gives $\langle L_y\rangle = 0$.

So $(\Delta L_x)^2 = \langle L_x^2\rangle$, which by the previous exercise is $\frac{\hbar^2}{2}\bigl(l(l+1) - m^2\bigr)$, and the same for $L_y$. For $m = l$, $(\Delta L_x)^2 = (\Delta L_y)^2 = \frac{\hbar^2}{2}\,l$, so $\Delta L_x\,\Delta L_y = \frac{\hbar^2l}{2}$. The bound is $\frac\hbar2\abs{\langle L_z\rangle} = \frac\hbar2\cdot l\hbar$, the same. The extreme states $|l\,{\pm l}\rangle$ are minimum-uncertainty states for the transverse components, the analogue for angular momentum of the oscillator ground state.
:::
:::

::: exercise L² on the top harmonic {level=3}
Using [[#eq-L-spherical]], verify directly that $Y_l^l \propto \sin^l\theta\,e^{il\varphi}$ satisfies $\hat L^2Y_l^l = \hbar^2l(l+1)Y_l^l$.
::: solution
Let $f = \sin^l\theta$. Then $\partial_\theta f = l\sin^{l-1}\theta\cos\theta$, and

$$
\frac{1}{\sin\theta}\partial_\theta\bigl(\sin\theta\,\partial_\theta f\bigr) = \frac{1}{\sin\theta}\partial_\theta\bigl(l\sin^l\theta\cos\theta\bigr) = \frac{l}{\sin\theta}\bigl(l\sin^{l-1}\theta\cos^2\theta - \sin^{l+1}\theta\bigr) = l^2\sin^{l-2}\theta\cos^2\theta - l\sin^l\theta.
$$

The $\varphi$ part contributes $\frac{1}{\sin^2\theta}\partial_\varphi^2e^{il\varphi} = -\frac{l^2}{\sin^2\theta}e^{il\varphi}$, i.e. $-l^2\sin^{l-2}\theta$ times $e^{il\varphi}$. Adding, with $\cos^2\theta = 1 - \sin^2\theta$:

$$
l^2\sin^{l-2}\theta(1 - \sin^2\theta) - l\sin^l\theta - l^2\sin^{l-2}\theta = -(l^2 + l)\sin^l\theta.
$$

So $\hat L^2Y_l^l = -\hbar^2\cdot\bigl(-l(l+1)\bigr)Y_l^l = \hbar^2l(l+1)Y_l^l$.
:::
:::
