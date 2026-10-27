Two billiard balls can be painted different colours, and even unpainted they can be followed along their paths, so after a collision we know which is which. Two electrons cannot be labelled at all. They have exactly the same mass, charge and spin, and quantum mechanics gives them no trajectories to follow: after their wave packets have overlapped, no experiment, even in principle, can say which one went where. Classical physics treats this as harmless bookkeeping. In quantum mechanics it is a physical principle with enormous consequences. It is why atoms have shells and the periodic table has its shape, why matter does not collapse, why white dwarfs are held up, why metals conduct, why iron is magnetic, and why helium-4 becomes a superfluid.

This chapter states the principle and works out its consequences for two particles in detail. The **exchange operator** swaps two particles; for identical particles it commutes with the Hamiltonian, and nature allows only states that are symmetric or antisymmetric under it. Antisymmetry gives the **Pauli exclusion principle**. It also produces an apparent force between particles, the **exchange force**, that comes from no term in the Hamiltonian. For two electrons it ties the spin state to the spatial state, and the result is visible in the spectrum of helium, whose singlet and triplet states differ in energy by electronvolts although the Hamiltonian contains no spin at all.

We use spin from [[quantum-1/spin]] and the addition of two spins $\frac12$ into singlet and triplet from [[quantum-1/angular-momentum]], and first-order degenerate perturbation theory from [[quantum-2/stationary-perturbation]]. The statistical mechanics of many identical particles is developed in [[statistical-mechanics/quantum-statistics]].

## The exchange operator {#exchange}

Take two particles, each with its own Hilbert space of states (position and spin). A state of the pair is a wavefunction $\psi(\xi_1, \xi_2)$, where $\xi_k = (\mathbf r_k, m_{s,k})$ collects the position and spin component of particle $k$. Labelling the two particles is a choice of argument order. If the particles are identical, swapping the labels cannot change any prediction.

::: definition Exchange operator {#def-exchange}
The **exchange operator** $\hat P_{12}$ acts on two-particle wavefunctions by swapping the arguments:

$$
(\hat P_{12}\psi)(\xi_1, \xi_2) = \psi(\xi_2, \xi_1).
$$

A state is **symmetric** if $\hat P_{12}\psi = \psi$ and **antisymmetric** if $\hat P_{12}\psi = -\psi$.
:::

::: proposition Properties of the exchange operator {#prop-exchange}
(a) $\hat P_{12}^2 = \mathbb 1$, $\hat P_{12}$ is Hermitian and unitary, and its eigenvalues are $+1$ and $-1$. (b) For any single-particle observable $\hat A$, $\hat P_{12}\hat A_1\hat P_{12} = \hat A_2$, where $\hat A_k$ acts on particle $k$. (c) If the two particles are identical, the Hamiltonian is symmetric, $\hat H(\xi_1, \xi_2) = \hat H(\xi_2, \xi_1)$, and $[\hat P_{12}, \hat H] = 0$.
:::

::: proof
(a) Swapping twice restores the order, so $\hat P_{12}^2 = \mathbb 1$. It preserves inner products, because $\int\phi^*(\xi_2, \xi_1)\psi(\xi_2, \xi_1)\,\dd\xi_1\,\dd\xi_2$ is the same integral as $\int\phi^*(\xi_1, \xi_2)\psi(\xi_1, \xi_2)\,\dd\xi_1\,\dd\xi_2$ with the dummy variables renamed. So $\hat P_{12}$ is unitary, $\hat P_{12}^\dagger = \hat P_{12}^{-1} = \hat P_{12}$, and hence Hermitian. If $\hat P_{12}\psi = p\psi$ then $\psi = \hat P_{12}^2\psi = p^2\psi$, so $p = \pm1$.

(b) Apply both sides to a product $\phi(\xi_1)\chi(\xi_2)$: $\hat P_{12}\hat A_1\hat P_{12}$ first gives $\phi(\xi_2)\chi(\xi_1)$, then $(\hat A\phi)(\xi_2)\chi(\xi_1)$, then $\phi(\xi_1)(\hat A\chi)(\xi_2)$, which is $\hat A_2$ acting on the product. Products span the two-particle space, so the operators agree.

(c) The Hamiltonian of identical particles has the same mass in both kinetic terms, the same external potential for both, and an interaction $V(\xi_1, \xi_2) = V(\xi_2, \xi_1)$; by (b) conjugating with $\hat P_{12}$ maps it to itself. So $\hat P_{12}\hat H\hat P_{12} = \hat H$, and multiplying on the right by $\hat P_{12}$ gives $\hat P_{12}\hat H = \hat H\hat P_{12}$.
:::

By (c), energy eigenstates can be chosen to be symmetric or antisymmetric, and since $\hat P_{12}$ commutes with $\hat H$, the time evolution preserves the symmetry ([[#exr-conserved]]). That is a statement about what *can* be chosen. Nature goes further.

::: axiom Symmetrisation postulate {#ax-symmetrisation}
The state of a system of identical particles is always symmetric under the exchange of any two of them, or always antisymmetric, according to the kind of particle. Particles whose states are symmetric are **bosons**; particles whose states are antisymmetric are **fermions**. For more than two particles the state is symmetric (bosons) or antisymmetric (fermions) under every pair exchange.
:::

Which particles are which? The **spin–statistics theorem** answers: particles with integer spin ($0, 1, 2, \dots$) are bosons, and particles with half-integer spin ($\frac12, \frac32, \dots$) are fermions. Electrons, protons, neutrons and quarks are fermions; photons, gluons, the Higgs boson, and pions are bosons. The theorem is a consequence of relativity and causality in quantum field theory (Pauli, 1940; see Weinberg, *The Quantum Theory of Fields*, Vol. 1, chapter 5). In non-relativistic quantum mechanics it has to be taken as an extra postulate.

Composite particles follow the rule according to their total spin, which is set by the number of fermions they contain. A $^4\mathrm{He}$ atom has two protons, two neutrons and two electrons, six fermions, so it is a boson. A $^3\mathrm{He}$ atom has five fermions and is a fermion. The two isotopes behave completely differently at low temperature: $^4\mathrm{He}$ becomes superfluid at $2.17\,\mathrm K$, $^3\mathrm{He}$ only below about $3\,\mathrm{mK}$, by a different mechanism (pairing of atoms, as in a superconductor).

::: remark Why only plus or minus one?
One might wonder whether swapping could multiply the state by any phase $e^{i\theta}$. In three dimensions, swapping twice is equivalent to doing nothing (the path of one particle round the other can be shrunk to a point), so $e^{2i\theta} = 1$ and $\theta = 0$ or $\pi$. In two dimensions that argument fails, and quasiparticles called **anyons** with other phases exist in fractional quantum Hall systems. In three dimensions there are only bosons and fermions.
:::

## Building symmetric and antisymmetric states {#building}

Suppose the particles do not interact, so that $\hat H = \hat h_1 + \hat h_2$ with the same single-particle Hamiltonian $\hat h$ for each. If $\phi_a$ and $\phi_b$ are eigenstates of $\hat h$ with energies $\varepsilon_a$, $\varepsilon_b$, then $\phi_a(\xi_1)\phi_b(\xi_2)$ and $\phi_b(\xi_1)\phi_a(\xi_2)$ are both eigenstates of $\hat H$ with energy $\varepsilon_a + \varepsilon_b$. This is **exchange degeneracy**. The symmetrisation postulate allows only one combination of them:

$$
\psi_\pm(\xi_1, \xi_2) = \frac{1}{\sqrt2}\bigl[\phi_a(\xi_1)\phi_b(\xi_2) \pm \phi_b(\xi_1)\phi_a(\xi_2)\bigr], \qquad a \ne b,
$$ {#eq-two-state}

with $+$ for bosons and $-$ for fermions. The factor $1/\sqrt2$ normalises it when $\phi_a \perp \phi_b$. If $a = b$, the boson state is just $\phi_a(\xi_1)\phi_a(\xi_2)$, and the fermion combination is identically zero.

::: theorem Pauli exclusion principle {#thm-pauli}
Two identical fermions cannot occupy the same single-particle state. More generally, if $\psi$ is antisymmetric then $\psi(\xi, \xi) = 0$: two identical fermions have zero probability amplitude to be found at the same position with the same spin component.
:::

::: proof
The antisymmetric combination in [[#eq-two-state]] with $a = b$ is $\frac{1}{\sqrt2}[\phi_a(\xi_1)\phi_a(\xi_2) - \phi_a(\xi_1)\phi_a(\xi_2)] = 0$, which is not a state. For the general statement, antisymmetry gives $\psi(\xi, \xi) = -\psi(\xi, \xi)$ for every $\xi$, so $\psi(\xi, \xi) = 0$.
:::

For $N$ particles, the antisymmetric combination of $N$ different single-particle states is a determinant, because a determinant changes sign when two rows are swapped.

::: definition Slater determinant {#def-slater}
For orthonormal single-particle states $\phi_1, \dots, \phi_N$, the **Slater determinant** is the $N$-fermion state

$$
\Psi(\xi_1, \dots, \xi_N) = \frac{1}{\sqrt{N!}}\begin{vmatrix}\phi_1(\xi_1) & \phi_2(\xi_1) & \cdots & \phi_N(\xi_1)\\ \phi_1(\xi_2) & \phi_2(\xi_2) & \cdots & \phi_N(\xi_2)\\ \vdots & \vdots & & \vdots\\ \phi_1(\xi_N) & \phi_2(\xi_N) & \cdots & \phi_N(\xi_N)\end{vmatrix}.
$$

It is antisymmetric under every pair exchange, normalised, and vanishes if any two of the $\phi_k$ coincide.
:::

The bosonic counterpart is the **permanent**, the same sum without the alternating signs, normalised differently when states repeat. For non-interacting particles a state is then specified by **occupation numbers**: how many particles occupy each single-particle state. For fermions each occupation number is $0$ or $1$; for bosons it is any non-negative integer. Which particle is in which state is not a meaningful question.

::: example Two particles in a box {#ex-box}
Two non-interacting particles of mass $m$ are in the infinite square well of width $L$, with single-particle energies $\varepsilon_n = n^2\varepsilon_1$, $\varepsilon_1 = \pi^2\hbar^2/2mL^2$. Ignore spin. Find the ground state and first excited state, with energies and degeneracies, if the particles are (a) distinguishable, (b) identical bosons, (c) identical fermions.
::: solution
(a) Distinguishable: any product $\phi_n(x_1)\phi_{n'}(x_2)$ is allowed. The ground state is $\phi_1\phi_1$ with energy $2\varepsilon_1$, non-degenerate. The first excited level has energy $\varepsilon_1 + 4\varepsilon_1 = 5\varepsilon_1$ and is doubly degenerate: $\phi_1(x_1)\phi_2(x_2)$ and $\phi_2(x_1)\phi_1(x_2)$.

(b) Bosons: the ground state is $\phi_1(x_1)\phi_1(x_2)$, energy $2\varepsilon_1$. The first excited level, $5\varepsilon_1$, is non-degenerate: only the symmetric combination $\psi_+$ of [[#eq-two-state]] with $a = 1$, $b = 2$ is allowed.

(c) Fermions: $\phi_1\phi_1$ is forbidden by [[#thm-pauli]]. The ground state is $\psi_-$ with $a = 1$, $b = 2$, energy $5\varepsilon_1$, non-degenerate. The first excited level is $\psi_-$ with $a = 1$, $b = 3$, energy $10\varepsilon_1$.

Real electrons have spin, which doubles the number of single-particle states; two electrons can then both be in $\phi_1$ if their spin state is antisymmetric. That is the subject of [[#spin-exchange]].
:::
:::

::: quiz
Three identical spin-0 bosons are placed in a system with only two single-particle states. How many three-particle states are there?
- [ ] $8$, as for distinguishable particles
- [x] $4$
- [ ] $3$
- [ ] $0$, because three particles cannot share two states
::: solution
For bosons a state is fixed by the occupation numbers $(n_1, n_2)$ with $n_1 + n_2 = 3$: $(3,0), (2,1), (1,2), (0,3)$, four states. Distinguishable particles have $2^3 = 8$ states. For fermions the answer would be $0$, since each state can hold at most one.
:::
:::

## The exchange force {#exchange-force}

Even with no interaction between them, identical particles do not move independently. Symmetrisation correlates their positions: bosons tend to be found together, fermions apart. The cleanest measure is the mean square separation.

::: theorem Separation in symmetrised states {#thm-separation}
For one-dimensional particles in the states $\psi_\pm$ of [[#eq-two-state]] built from real orthonormal $\phi_a, \phi_b$ (spin ignored), and for the distinguishable product $\psi_d = \phi_a(x_1)\phi_b(x_2)$,

$$
\left\langle(x_1 - x_2)^2\right\rangle_\pm = \left\langle(x_1 - x_2)^2\right\rangle_d \mp 2\lvert\langle x\rangle_{ab}\rvert^2, \qquad \langle x\rangle_{ab} = \int\phi_a(x)\,x\,\phi_b(x)\,\dd x.
$$ {#eq-separation}

Bosons ($+$) are on average closer than distinguishable particles, fermions ($-$) farther apart.
:::

::: proof
Expand $(x_1 - x_2)^2 = x_1^2 + x_2^2 - 2x_1x_2$. For the distinguishable state,

$$
\langle x_1^2\rangle_d = \langle x^2\rangle_a, \qquad \langle x_2^2\rangle_d = \langle x^2\rangle_b, \qquad \langle x_1x_2\rangle_d = \langle x\rangle_a\langle x\rangle_b.
$$

In $\psi_\pm$ the probability density is $\frac12[\phi_a(x_1)^2\phi_b(x_2)^2 + \phi_b(x_1)^2\phi_a(x_2)^2 \pm 2\phi_a(x_1)\phi_b(x_1)\phi_a(x_2)\phi_b(x_2)]$. For $x_1^2$ the first two terms give $\frac12(\langle x^2\rangle_a + \langle x^2\rangle_b)$, and the cross term gives $\pm\langle x^2\rangle_{ab}\langle1\rangle_{ab} = 0$ by orthogonality. So $\langle x_1^2\rangle_\pm + \langle x_2^2\rangle_\pm = \langle x^2\rangle_a + \langle x^2\rangle_b$, as for distinguishable particles. For $x_1x_2$ the first two terms give $\langle x\rangle_a\langle x\rangle_b$, and the cross term gives $\pm\langle x\rangle_{ab}^2$. Substituting, $\langle(x_1 - x_2)^2\rangle_\pm = \langle(x_1 - x_2)^2\rangle_d \mp 2\langle x\rangle_{ab}^2$. For complex $\phi$'s the same calculation gives $\lvert\langle x\rangle_{ab}\rvert^2$.
:::

The correction depends on the **overlap** of $\phi_a$ and $\phi_b$: if the two wavefunctions do not overlap, $\phi_a(x)\phi_b(x) = 0$ everywhere, $\langle x\rangle_{ab} = 0$, and symmetrisation makes no difference. That is why we can ignore the antisymmetrisation of an electron here with one on the Moon. There is no force in the Hamiltonian; the effect is kinematic. It behaves, though, as an attraction between bosons and a repulsion between fermions, and is called the **exchange force**.

::: example The exchange force in a box {#ex-exchange-box}
For two particles in the infinite well of width $L$ in the states $\phi_1$ and $\phi_2$, compute the root-mean-square separation for distinguishable particles, bosons and fermions.
::: solution
Each state is symmetric about $L/2$, so $\langle x\rangle_1 = \langle x\rangle_2 = L/2$, and the standard integral gives $\langle x^2\rangle_n = L^2\bigl(\frac13 - \frac{1}{2n^2\pi^2}\bigr)$. For distinguishable particles

$$
\langle(x_1 - x_2)^2\rangle_d = \langle x^2\rangle_1 + \langle x^2\rangle_2 - 2\left(\frac L2\right)^2 = L^2\left(\frac23 - \frac{1}{2\pi^2} - \frac{1}{8\pi^2} - \frac12\right) = L^2\left(\frac16 - \frac{5}{8\pi^2}\right) = 0.1033\,L^2.
$$

The overlap integral, using $\sin u\sin2u = \frac12(\cos u - \cos3u)$ and integrating by parts, is

$$
\langle x\rangle_{12} = \frac2L\int_0^Lx\sin\frac{\pi x}{L}\sin\frac{2\pi x}{L}\,\dd x = -\frac{16L}{9\pi^2} = -0.1801\,L.
$$

So $2\langle x\rangle_{12}^2 = 512L^2/81\pi^4 = 0.0649\,L^2$, and [[#eq-separation]] gives

$$
\langle(x_1 - x_2)^2\rangle_+ = 0.0384\,L^2, \qquad \langle(x_1 - x_2)^2\rangle_- = 0.1682\,L^2.
$$

The rms separations are $0.196L$ for bosons, $0.321L$ for distinguishable particles and $0.410L$ for fermions. The effect is large because $\phi_1$ and $\phi_2$ overlap over the whole well.
:::
:::

::: widget plot
f: 2*(sin(pi*x)*sin(2*pi*y) + sin(2*pi*x)*sin(pi*y))^2; 2*(sin(pi*x)*sin(2*pi*y) - sin(2*pi*x)*sin(pi*y))^2; 2*(sin(pi*x)^2*sin(2*pi*y)^2 + sin(2*pi*x)^2*sin(pi*y)^2)
x: 0, 1
sliders: y=0.3:0:1:0.01
labels: bosons; fermions; distinguishable (averaged over labelling)
caption: Joint probability density for two particles in a well of width $1$ occupying $\phi_1$ and $\phi_2$, as a function of the position $x$ of one particle when the other is held at $x_2 = y$ (the slider). The fermion curve always vanishes at $x = y$, wherever you put the slider: that is [[#thm-pauli]], a hole around each fermion. The boson curve is enhanced near $x = y$. The distinguishable curve is the average of the other two, so symmetrisation simply moves probability towards or away from the diagonal.
:::

## Spin and the exchange interaction {#spin-exchange}

Electrons have spin $\frac12$, and the full two-electron state includes spin. If the Hamiltonian does not involve spin, as for the Coulomb Hamiltonian of an atom, its eigenstates can be chosen as products of a spatial part and a spin part, $\psi(\mathbf r_1, \mathbf r_2)\chi(1, 2)$. The total must be antisymmetric. From [[quantum-1/angular-momentum]], the four spin states of two spin-$\frac12$ particles combine into a symmetric **triplet** with total spin $S = 1$,

$$
\chi_{1,1} = \uparrow\uparrow, \qquad \chi_{1,0} = \frac{1}{\sqrt2}(\uparrow\downarrow + \downarrow\uparrow), \qquad \chi_{1,-1} = \downarrow\downarrow,
$$

and an antisymmetric **singlet** with $S = 0$, $\chi_{0,0} = \frac{1}{\sqrt2}(\uparrow\downarrow - \downarrow\uparrow)$. So:

- a **symmetric** spatial state must be paired with the **singlet**;
- an **antisymmetric** spatial state must be paired with a **triplet**.

Now the spin state decides the spatial symmetry, and the spatial symmetry decides, through [[#thm-separation]], how close the electrons come. Electrons in a triplet keep apart; electrons in a singlet are allowed to come together. Since electrons repel, the triplet has less repulsion energy. That is the origin of an energy difference between spin states in a spin-independent Hamiltonian.

### The excited states of helium

The lowest excited configuration of helium has one electron in $1s$ and one in $2s$. Ignoring the repulsion $e^2/4\pi\varepsilon_0r_{12}$, the energy is $-Z^2(1 + \frac14)\times13.6\,\mathrm{eV} = -68.0\,\mathrm{eV}$ for $Z = 2$, and the level is fourfold degenerate: the symmetric spatial state with the singlet, the antisymmetric spatial state with each of the three triplets. Treat the repulsion as a perturbation with [[quantum-2/stationary-perturbation#thm-degenerate]].

::: theorem Coulomb and exchange integrals {#thm-exchange}
Let two electrons occupy orthonormal spatial orbitals $\phi_a$ and $\phi_b$, and let $\hat V = e^2/4\pi\varepsilon_0\lvert\mathbf r_1 - \mathbf r_2\rvert$. In the spatial states $\psi_\pm = \frac1{\sqrt2}[\phi_a(\mathbf r_1)\phi_b(\mathbf r_2) \pm \phi_b(\mathbf r_1)\phi_a(\mathbf r_2)]$, paired with the singlet ($+$) and the triplet ($-$), the first-order energy shifts are

$$
E^{1}_\pm = J \pm K,
$$

where the **Coulomb integral** $J$ and the **exchange integral** $K$ are

$$
J = \int\!\!\int\lvert\phi_a(\mathbf r_1)\rvert^2\,\frac{e^2}{4\pi\varepsilon_0r_{12}}\,\lvert\phi_b(\mathbf r_2)\rvert^2\,\dd^3r_1\,\dd^3r_2, \qquad K = \int\!\!\int\phi_a^*(\mathbf r_1)\phi_b^*(\mathbf r_2)\,\frac{e^2}{4\pi\varepsilon_0r_{12}}\,\phi_b(\mathbf r_1)\phi_a(\mathbf r_2)\,\dd^3r_1\,\dd^3r_2.
$$ {#eq-JK}

Both are positive. The triplet lies below the singlet by $2K$.
:::

::: proof
The perturbation does not act on spin, so its matrix elements between different spin states vanish, and within each spin sector the spatial state is fixed. The four states are therefore good states and the shifts are the diagonal elements. Expanding,

$$
\langle\psi_\pm\vert\hat V\vert\psi_\pm\rangle = \frac12\bigl[\langle ab\vert\hat V\vert ab\rangle + \langle ba\vert\hat V\vert ba\rangle \pm \langle ab\vert\hat V\vert ba\rangle \pm \langle ba\vert\hat V\vert ab\rangle\bigr],
$$

where $\lvert ab\rangle$ means $\phi_a(\mathbf r_1)\phi_b(\mathbf r_2)$. Since $\hat V$ is symmetric, relabelling the integration variables shows that the first two terms are both $J$ and the last two are $K$ and $K^*$. $K$ is real because $\hat V$ is a real function and the swap of variables maps $K$ to $K^*$, so the shift is $J\pm K$. $J$ is the electrostatic energy of two positive charge distributions, so $J > 0$. $K$ is the self-energy of the complex "overlap charge" $\rho(\mathbf r) = \phi_a^*(\mathbf r)\phi_b(\mathbf r)$, namely $\int\!\!\int\rho^*(\mathbf r_1)\rho(\mathbf r_2)/r_{12}$; writing it in Fourier space as a positive multiple of $\int\lvert\tilde\rho(\mathbf k)\rvert^2/k^2\,\dd^3k$ shows $K > 0$ whenever $\rho \ne 0$.
:::

For helium's $1s2s$ configuration with hydrogen-like orbitals of charge $Z$, the integrals can be done in closed form (Bransden & Joachain, chapter 7): $J = \frac{17}{81}ZE_{\mathrm h}$ and $K = \frac{16}{729}ZE_{\mathrm h}$, with $E_{\mathrm h} = 27.211\,\mathrm{eV}$.

::: example Singlet and triplet 1s2s helium {#ex-helium-1s2s}
Estimate the energies of the $1s2s$ singlet and triplet states of helium and compare with experiment: the ground state is at $-79.005\,\mathrm{eV}$, the triplet $2^3S$ lies $19.820\,\mathrm{eV}$ above it and the singlet $2^1S$ $20.616\,\mathrm{eV}$ above it.
::: solution
With $Z = 2$,

$$
J = \frac{34}{81}\times27.211\,\mathrm{eV} = 11.42\,\mathrm{eV}, \qquad K = \frac{32}{729}\times27.211\,\mathrm{eV} = 1.194\,\mathrm{eV}.
$$

The unperturbed energy is $-2.5E_{\mathrm h} = -68.03\,\mathrm{eV}$, so

$$
E_{\mathrm{singlet}} = -68.03 + 11.42 + 1.19 = -55.41\,\mathrm{eV}, \qquad E_{\mathrm{triplet}} = -68.03 + 11.42 - 1.19 = -57.80\,\mathrm{eV}.
$$

Experiment gives $-79.005 + 20.616 = -58.39\,\mathrm{eV}$ and $-79.005 + 19.820 = -59.19\,\mathrm{eV}$. First order gets the ordering right (triplet below singlet), and the energies within about $3\,\mathrm{eV}$, but predicts a splitting $2K = 2.39\,\mathrm{eV}$ against the measured $0.80\,\mathrm{eV}$. The error is the same one as in the ground state: the orbitals are not adjusted for screening. The inner $1s$ electron screens the nucleus almost completely from the outer $2s$ electron, which therefore moves in a larger orbital that overlaps less with $1s$, reducing $K$.
:::
:::

Helium's spectrum falls into two almost separate systems, singlet **parahelium** and triplet **orthohelium**. Electric-dipole radiation does not act on spin, so it does not connect them, and for a time around 1900 they were attributed to two different gases. The lowest triplet, $2^3S$, cannot decay to the $1^1S$ ground state at all by a dipole transition and lives for about $7900\,\mathrm s$.

::: warning The exchange energy is not a magnetic interaction
The singlet–triplet splitting of $0.8\,\mathrm{eV}$ in helium has nothing to do with the magnetic moments of the electrons, whose dipole–dipole energy at atomic distances is of order $\mu_0\mu_B^2/4\pi a_0^3 \approx 4\times10^{-4}\,\mathrm{eV}$, a few thousand times smaller. It is electrostatic energy, made spin-dependent by antisymmetry. A common error is to explain parallel spins in atoms or magnets by "spins like to align": they do not, the Coulomb repulsion prefers antisymmetric spatial states, and antisymmetric spatial states come with symmetric spins.
:::

The effect of exchange on spin can be written as an effective interaction between spins. For two spins $\frac12$, $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac12(\hat S^2 - \hat S_1^2 - \hat S_2^2)$ has the value $\frac14\hbar^2$ in the triplet and $-\frac34\hbar^2$ in the singlet. So the two energies $J\mp K$ (triplet, singlet) are reproduced by

$$
\hat H_{\mathrm{eff}} = J - \frac K2 - \frac{2K}{\hbar^2}\,\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2,
$$ {#eq-heisenberg}

as you can check by substituting the two eigenvalues. Spins appear to be coupled, although the Hamiltonian has no spin in it.

::: application Ferromagnetism and the covalent bond
Heisenberg (1928) proposed that an interaction of the form [[#eq-heisenberg]] between electrons on neighbouring atoms, summed over a crystal, $\hat H = -\sum_{\langle ij\rangle}J_{ij}\hat{\mathbf S}_i\cdot\hat{\mathbf S}_j$, explains ferromagnetism: when the effective coupling favours parallel spins, the spins of iron, cobalt and nickel line up spontaneously below the Curie temperature ($1043\,\mathrm K$ for iron). The magnetic dipole interaction is far too weak to do this. In the hydrogen molecule the sign is the other way: the bonding state is a spatially symmetric spin singlet, with electron density piled up between the protons, and the triplet is repulsive. The covalent bond is an exchange effect, as the Chemistry Atlas lesson on [the chemical bond](/learn/chemistry/lesson.php?c=quantum-chemistry&l=chemical-bond-qm) explains from the chemist's side.
:::

::: quiz
Two electrons are in the same spatial orbital $\phi$ (for example the two $1s$ electrons of the helium ground state). What is their spin state?
- [ ] Any of the four spin states
- [ ] One of the triplet states
- [x] The singlet
- [ ] The state $\uparrow\downarrow$
::: solution
The spatial state $\phi(\mathbf r_1)\phi(\mathbf r_2)$ is symmetric, so the spin state must be antisymmetric: the singlet $\frac{1}{\sqrt2}(\uparrow\downarrow - \downarrow\uparrow)$. The product $\uparrow\downarrow$ is not antisymmetric; it is half singlet and half $m = 0$ triplet. So the ground state of helium has total spin zero, and there is no triplet $1s^2$ state.
:::
:::

## Many fermions {#many}

For $N$ non-interacting fermions in a potential, the ground state fills the lowest $N$ single-particle states, one particle in each (counting spin states separately): a single Slater determinant. The energy of the highest filled level is the **Fermi energy**. Adding a fermion costs at least the Fermi energy, however weak the forces; that cost is what makes a gas of fermions resist compression, even at zero temperature.

::: example Electrons in a long molecule {#ex-polyene}
Model the $\pi$ electrons of a conjugated chain molecule as $N$ non-interacting electrons in a one-dimensional well of length $L$. Find the total ground-state energy for $N = 6$ and the energy of the lowest excitation, and evaluate the absorption wavelength for $L = 0.70\,\mathrm{nm}$ (hexatriene, roughly).
::: solution
Each level $\varepsilon_n = n^2\varepsilon_1$ holds two electrons, spin up and spin down. Six electrons fill $n = 1, 2, 3$, and the total energy is $2(1 + 4 + 9)\varepsilon_1 = 28\varepsilon_1$. The lowest excitation promotes an electron from $n = 3$ to $n = 4$, costing $(16 - 9)\varepsilon_1 = 7\varepsilon_1$. With

$$
\varepsilon_1 = \frac{\pi^2\hbar^2}{2mL^2} = \frac{h^2}{8mL^2} = \frac{(6.626\times10^{-34})^2}{8(9.109\times10^{-31})(0.70\times10^{-9})^2}\,\mathrm J = 1.229\times10^{-19}\,\mathrm J = 0.767\,\mathrm{eV},
$$

the excitation energy is $7\varepsilon_1 = 5.37\,\mathrm{eV}$, and $\lambda = hc/\Delta E = 1240\,\mathrm{eV\,nm}/5.37\,\mathrm{eV} = 231\,\mathrm{nm}$. Hexatriene absorbs near $258\,\mathrm{nm}$, which is good for so crude a model. Without the Pauli principle all six electrons would sit in $n = 1$ and the lowest excitation would be $3\varepsilon_1$, giving a wavelength more than twice as long.
:::
:::

::: application White dwarfs and neutron stars
A white dwarf is a star of about a solar mass compressed to the size of the Earth, with no nuclear fuel left. What holds it up is the pressure of its electrons, which fill states up to a Fermi energy of hundreds of keV. Fowler explained this in 1926, within months of Fermi–Dirac statistics. Chandrasekhar showed in 1931 that when the electrons become relativistic the pressure can no longer support a mass above about $1.4$ solar masses. Neutron stars are held up, in the same way, by neutrons. The quantitative theory is in [[statistical-mechanics/bose-fermi]] and [[gravitation/stars]].
:::

For bosons the opposite happens: any number may share a state, and at low enough temperature a macroscopic fraction of a gas of bosons occupies the single lowest state. That is **Bose–Einstein condensation**, predicted by Einstein in 1925 and achieved in dilute atomic gases in 1995. Lasers are a related effect for photons: the rate of stimulated emission into a mode is proportional to the number of photons already in it, the bosonic enhancement that the $B$ coefficient of [[quantum-2/time-dependent]] describes.

::: history Bose, Fermi, Dirac and Pauli
Wolfgang Pauli stated the exclusion principle in January 1925 to explain the shell structure of atoms and the anomalous Zeeman effect, assigning each electron four quantum numbers, one of them a "two-valuedness" that Uhlenbeck and Goudsmit identified with spin later that year. Satyendra Nath Bose derived Planck's law in 1924 by a new way of counting photon states; Einstein extended the counting to atoms in 1924–25. Enrico Fermi worked out the statistics of particles obeying Pauli's principle in early 1926, and Paul Dirac, independently later that year, connected both statistics to symmetric and antisymmetric wavefunctions. Werner Heisenberg in 1926 explained the separate para- and ortho-helium spectra by exchange symmetry, and in 1928 proposed the exchange mechanism of ferromagnetism. John Slater introduced the determinant form in 1929, and Pauli proved the spin–statistics theorem in relativistic field theory in 1940.
:::

## Where this leads {#leads}

[[quantum-2/atomic-structure]] uses the Pauli principle and the exchange energy to build atoms with many electrons: the shell structure, Hund's rule that electrons in a partly filled shell maximise their total spin, term symbols and the periodic table. [[statistical-mechanics/quantum-statistics]] turns the counting rules here into the Fermi–Dirac and Bose–Einstein distributions. [[condensed-matter/free-electrons]] fills a Fermi sea in a metal, and [[condensed-matter/magnetism-superconductivity]] develops the exchange model of magnets. In [[quantum-2/entanglement]] we will meet the singlet again, as the standard example of an entangled state.

::: summary
- Identical particles cannot be labelled. The exchange operator $\hat P_{12}$ commutes with their Hamiltonian, and has eigenvalues $\pm1$.
- Symmetrisation postulate: bosons (integer spin) have symmetric states, fermions (half-integer spin) antisymmetric. The spin–statistics link comes from relativistic field theory.
- Two particles in different states $a$, $b$: $\psi_\pm = [\phi_a\phi_b \pm \phi_b\phi_a]/\sqrt2$. $N$ fermions: a Slater determinant. Pauli: no two identical fermions in the same state.
- Symmetrisation correlates positions even without forces: $\langle(x_1 - x_2)^2\rangle_\pm = \langle(x_1 - x_2)^2\rangle_d \mp 2\lvert\langle x\rangle_{ab}\rvert^2$. The effect needs overlapping wavefunctions.
- For two electrons, a symmetric spatial state goes with the spin singlet, an antisymmetric one with the triplet. The Coulomb repulsion then gives $E = J\pm K$: the triplet lies lower by $2K$.
- Helium $1s2s$: first order gives a splitting of $2.39\,\mathrm{eV}$; experiment $0.80\,\mathrm{eV}$. The exchange energy is electrostatic, not magnetic, and can be written as $-(2K/\hbar^2)\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$.
- Fermions fill levels up to a Fermi energy, which gives degeneracy pressure; bosons can condense into a single state.
:::

## Exercises {#exercises}

::: exercise Counting two-particle states {level=1 check="15"}
A single particle has five available states. How many states does a pair of identical bosons have? How many for identical fermions, and for distinguishable particles?
::: solution
Bosons: either both in the same state ($5$ ways) or in two different states, one symmetric combination for each unordered pair ($\binom52 = 10$), so $15$ in all. Fermions: only the $10$ antisymmetric combinations. Distinguishable: $5^2 = 25$. Note $15 + 10 = 25$: the two-particle space splits into its symmetric and antisymmetric parts, of dimensions $n(n+1)/2$ and $n(n-1)/2$.
:::
:::

::: exercise Three electrons in a box {level=1 check="6"}
Three non-interacting electrons (spin $\frac12$) are in a one-dimensional infinite well. Find the ground-state energy in units of $\varepsilon_1 = \pi^2\hbar^2/2mL^2$.
::: solution
Each spatial level holds two electrons of opposite spin. Two go in $n = 1$ and one in $n = 2$, so $E = 1 + 1 + 4 = 6$ in units of $\varepsilon_1$. The ground state is doubly degenerate: the third electron can have spin up or down.
:::
:::

::: exercise The singlet value of S1·S2 {level=1 check="-3/4"}
Find the eigenvalue of $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$, in units of $\hbar^2$, in the singlet state of two spin-$\frac12$ particles.
::: solution
$\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac12(\hat S^2 - \hat S_1^2 - \hat S_2^2)$. In the singlet $S = 0$, and $\hat S_k^2 = \frac34\hbar^2$, so the value is $\frac12(0 - \frac34 - \frac34)\hbar^2 = -\frac34\hbar^2$. In the triplet it is $\frac12(2 - \frac32)\hbar^2 = \frac14\hbar^2$.
:::
:::

::: exercise Fermions in an oscillator {level=2 check="13/2"}
Five non-interacting spin-$\frac12$ fermions are in a one-dimensional harmonic oscillator of angular frequency $\omega$. Find the ground-state energy in units of $\hbar\omega$. What would it be for five spinless bosons?
::: solution
The levels are $(n + \frac12)\hbar\omega$, two fermions each. Fill $n = 0$ (two), $n = 1$ (two), $n = 2$ (one): $E = 2(\frac12) + 2(\frac32) + \frac52 = 1 + 3 + 2.5 = 6.5$, that is $\frac{13}{2}\hbar\omega$. Five bosons all occupy $n = 0$: $\frac52\hbar\omega$.
:::
:::

::: exercise Separation of two fermions {level=2 check="1/6 - 5/(8*pi^2) + 512/(81*pi^4)"}
Using [[#ex-exchange-box]], give $\langle(x_1 - x_2)^2\rangle/L^2$ for two spinless fermions in $\phi_1$ and $\phi_2$ of the infinite well, as an exact expression, and derive the value of $\langle x\rangle_{12}$ used there.
::: solution
With $u = \pi x/L$, $\langle x\rangle_{12} = \frac{2L}{\pi^2}\int_0^\pi u\sin u\sin2u\,\dd u$ and $\sin u\sin2u = \frac12(\cos u - \cos3u)$. Integrating by parts, $\int_0^\pi u\cos ku\,\dd u = [(\cos ku)/k^2]_0^\pi = ((-1)^k - 1)/k^2$, which is $-2$ for $k = 1$ and $-\frac29$ for $k = 3$. So the integral is $\frac12(-2 + \frac29) = -\frac89$, and $\langle x\rangle_{12} = -\frac{16L}{9\pi^2}$. Then

$$
\frac{\langle(x_1 - x_2)^2\rangle_-}{L^2} = \frac16 - \frac{5}{8\pi^2} + 2\left(\frac{16}{9\pi^2}\right)^2 = \frac16 - \frac{5}{8\pi^2} + \frac{512}{81\pi^4} = 0.1682.
$$
:::
:::

::: exercise Exchange splitting in Li+ {level=2 check="3.58"}
Using the hydrogen-like integrals quoted before [[#ex-helium-1s2s]], estimate the first-order singlet–triplet splitting of the $1s2s$ configuration of $\mathrm{Li}^+$ ($Z = 3$), in eV.
::: solution
$2K = 2\times\frac{16}{729}\times3\times27.211\,\mathrm{eV} = \frac{96}{729}\times27.211\,\mathrm{eV} = 3.58\,\mathrm{eV}$. The hydrogen-like estimate scales linearly with $Z$. The measured splitting in $\mathrm{Li}^+$ is about $1.9\,\mathrm{eV}$; as in helium the first-order value is too large, for the same reason.
:::
:::

::: exercise Symmetry is conserved {#exr-conserved level=3}
Prove that if $\hat H$ is symmetric under exchange, a state that is symmetric (or antisymmetric) at $t = 0$ remains so for all time. Explain why this means the symmetrisation postulate is consistent with the dynamics.
::: solution
By [[#prop-exchange]] (c), $[\hat P_{12}, \hat H] = 0$. If $\hat H$ is time-independent, the evolution operator $\hat U(t) = e^{-i\hat Ht/\hbar}$ is a power series in $\hat H$, so it commutes with $\hat P_{12}$ too. If $\hat P_{12}\psi(0) = p\,\psi(0)$, then

$$
\hat P_{12}\psi(t) = \hat P_{12}\hat U(t)\psi(0) = \hat U(t)\hat P_{12}\psi(0) = p\,\hat U(t)\psi(0) = p\,\psi(t).
$$

If $\hat H$ depends on time but is symmetric at each time, let $\phi(t) = \hat P_{12}\psi(t) - p\psi(t)$. Then $i\hbar\dot\phi = \hat P_{12}\hat H\psi - p\hat H\psi = \hat H\phi$, so $\phi$ obeys the Schrödinger equation with $\phi(0) = 0$, and by uniqueness of solutions $\phi(t) = 0$. Either way, no physical (symmetric) Hamiltonian can turn a state of one symmetry into the other, so assigning one symmetry to each kind of particle never conflicts with the evolution.
:::
:::

::: exercise Properties of the Slater determinant {level=3}
Prove that the Slater determinant of [[#def-slater]] is antisymmetric under every pair exchange, normalised to $1$, and identically zero if the $\phi_k$ are linearly dependent.
::: solution
Swapping $\xi_i$ and $\xi_j$ swaps rows $i$ and $j$ of the matrix, which changes the sign of the determinant: antisymmetry. If the $\phi_k$ are linearly dependent, the columns of the matrix are linearly dependent for every choice of the $\xi$'s, so the determinant vanishes identically; this includes the case of two equal orbitals.

For normalisation, expand the determinant as $\sum_\sigma\sgn(\sigma)\prod_k\phi_{\sigma(k)}(\xi_k)$ over permutations $\sigma$. Then

$$
\langle\Psi\vert\Psi\rangle = \frac{1}{N!}\sum_{\sigma, \tau}\sgn(\sigma)\sgn(\tau)\prod_{k=1}^N\langle\phi_{\sigma(k)}\vert\phi_{\tau(k)}\rangle.
$$

By orthonormality each factor is $\delta_{\sigma(k)\tau(k)}$, so only $\sigma = \tau$ survives, and then $\sgn(\sigma)^2 = 1$. There are $N!$ such terms, so $\langle\Psi\vert\Psi\rangle = N!/N! = 1$.
:::
:::

::: exercise The Dirac exchange identity {level=3}
For two spin-$\frac12$ particles, let $\hat P^{\mathrm{spin}}_{12}$ swap their spin states. Prove that $\hat P^{\mathrm{spin}}_{12} = \frac12\bigl(1 + \boldsymbol\sigma_1\cdot\boldsymbol\sigma_2\bigr) = \frac12 + \frac{2}{\hbar^2}\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$, and use it to explain [[#eq-heisenberg]].
::: solution
Both sides are operators on the four-dimensional spin space, so it is enough to compare them on a basis. The triplet states are symmetric, so $\hat P^{\mathrm{spin}}_{12} = +1$ on them; the singlet is antisymmetric, so $\hat P^{\mathrm{spin}}_{12} = -1$ on it. On the other side, $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac14\hbar^2$ on the triplet and $-\frac34\hbar^2$ on the singlet, so $\frac12 + 2\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2/\hbar^2$ is $\frac12 + \frac12 = 1$ and $\frac12 - \frac32 = -1$. The operators agree on a basis, hence everywhere. Since $\boldsymbol\sigma = 2\hat{\mathbf S}/\hbar$, the two forms are the same.

For electrons the total state is antisymmetric, $\hat P^{\mathrm{space}}_{12}\hat P^{\mathrm{spin}}_{12} = -1$, so $\hat P^{\mathrm{space}}_{12} = -\hat P^{\mathrm{spin}}_{12}$ (both square to $1$). The first-order energy $J + K\,\hat P^{\mathrm{space}}_{12}$ (which gives $J\pm K$ on spatially symmetric and antisymmetric states) therefore equals $J - K\hat P^{\mathrm{spin}}_{12} = J - \frac K2 - \frac{2K}{\hbar^2}\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$, which is [[#eq-heisenberg]]. The spin coupling is the exchange operator in disguise.
:::
:::
