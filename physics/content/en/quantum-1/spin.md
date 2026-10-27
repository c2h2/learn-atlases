The algebra of [[quantum-1/angular-momentum]] allowed angular momenta with half-integer quantum numbers, $j = \frac12, \frac32, \ldots$, and then orbital angular momentum threw them away, because a wavefunction must return to itself after a rotation by $2\pi$. Nature does not throw them away. The electron, the proton, the neutron and every quark carry an intrinsic angular momentum with $s = \frac12$, called **spin**, that is not the motion of anything through space. It has no wavefunction in the ordinary sense: the state of an electron's spin lives in a two-dimensional complex vector space, and the observables are $2\times2$ matrices.

Spin is the cleanest illustration of the formal structure of [[quantum-1/formalism]]. Everything can be computed exactly, with a few lines of matrix algebra, and every postulate can be seen at work in a single experiment, the one Otto Stern and Walther Gerlach performed in 1922. Spin also has direct practical consequences: it gives the electron a magnetic moment, which is the basis of magnetism in materials and of magnetic resonance; it doubles the number of states in each level of hydrogen; and through the Pauli exclusion principle it shapes the periodic table.

This chapter starts from the experiment, sets up the two-dimensional formalism with the Pauli matrices, computes the outcomes of measurements along arbitrary directions, follows a spin as it precesses in a magnetic field, and finishes by adding two spins together, which produces the triplet and singlet states.

## The Stern–Gerlach experiment {#stern-gerlach}

A current loop, or anything with angular momentum and charge, has a magnetic dipole moment $\boldsymbol\mu$. In a magnetic field it has energy $U = -\boldsymbol\mu\cdot\mathbf B$ ([[magnetism/magnetic-force]]). A uniform field only twists the dipole; a non-uniform field also pushes it, with force

$$
F_z = -\pdv{U}{z} = \mu_z\pdv{B_z}{z}
$$

when the field and its gradient point mainly along $z$. A beam of atoms passing through a magnet with a strong gradient is therefore deflected up or down according to the $z$-component of each atom's magnetic moment.

Stern and Gerlach, in Frankfurt in 1922, sent a beam of silver atoms from an oven through such a magnet onto a glass plate. Classically the moments of the atoms leaving the oven point in random directions, $\mu_z$ takes every value between $-\abs{\boldsymbol\mu}$ and $+\abs{\boldsymbol\mu}$, and the beam should spread into a continuous smear. Instead it split into **two** distinct spots. The $z$-component of the moment takes only two values.

Two values is odd. An orbital angular momentum $l$ has $2l + 1$ values of $m$, always an odd number. A silver atom has $47$ electrons; $46$ of them pair up with zero total angular momentum, and the last is in a $5s$ state with $l = 0$, so its orbital angular momentum is zero and there should have been one spot, not two. The two spots are the two values $m_s = \pm\frac12$ of the spin of the outer electron, $2s + 1 = 2$ with $s = \frac12$. (Stern and Gerlach interpreted their result in terms of Bohr–Sommerfeld orbits; the correct interpretation came after spin was proposed in 1925. Thomas Phipps and John Taylor repeated the experiment with ground-state hydrogen atoms in 1927 and also saw two spots, settling the matter.)

::: example Size of the splitting {#ex-sg}
Silver atoms of mass $107.87\,\mathrm u$ leave an oven at $550\,\mathrm{m/s}$ and pass through a magnet $3.50\,\mathrm{cm}$ long with field gradient $\partial B_z/\partial z = 1.00\times10^3\,\mathrm{T/m}$. Taking $\abs{\mu_z} = \mu_B = 9.274\times10^{-24}\,\mathrm{J/T}$, find the transverse deflection of each beam at the exit of the magnet.
::: solution
The force is $F = \mu_B\,\partial B_z/\partial z = (9.274\times10^{-24})(1.00\times10^3) = 9.27\times10^{-21}\,\mathrm N$, and the mass is $107.87\times1.6605\times10^{-27} = 1.791\times10^{-25}\,\mathrm{kg}$, so the acceleration is $a = 5.18\times10^4\,\mathrm{m/s^2}$, about five thousand times $g$. The time spent in the magnet is $t = 0.0350/550 = 6.36\times10^{-5}\,\mathrm s$. With constant acceleration ([[mechanics/motion-1d]]) the deflection is

$$
z = \frac12at^2 = \frac12(5.18\times10^4)(6.36\times10^{-5})^2 = 1.05\times10^{-4}\,\mathrm m = 0.105\,\mathrm{mm},
$$

up for one beam and down for the other, so the beams leave the magnet about $0.2\,\mathrm{mm}$ apart and continue to separate in the field-free region beyond. That is the scale Stern and Gerlach saw. The tiny deflection, set by the small Bohr magneton and the large mass of the atom, is why the experiment needed an enormous gradient and a well-collimated beam.
:::
:::

The experiment can be run in sequence, and the sequences are what demand the quantum formalism. Pass the beam through a magnet oriented along $z$, block the lower beam, and send the upper one ($S_z = +\hbar/2$) through a second $z$ magnet: all of it emerges up. Now send it instead through a magnet along $x$: it splits into two equal beams, $S_x = \pm\hbar/2$. Block the $S_x = -\hbar/2$ beam and send the remaining one through a third magnet along $z$: it splits *again*, into equal parts with $S_z = \pm\hbar/2$. The measurement of $S_x$ has erased the information that $S_z$ was $+\hbar/2$. This is the collapse postulate in action, and it shows that $S_x$ and $S_z$ cannot both be definite, as the non-zero commutator $[\hat S_z, \hat S_x] = i\hbar\hat S_y$ requires.

## Spin one-half and the Pauli matrices {#pauli}

The spin of an electron is an angular momentum in the sense of [[quantum-1/angular-momentum#thm-spectrum]], with $s = \frac12$. The Hilbert space is two-dimensional, spanned by the two eigenstates of $\hat S_z$.

::: definition Spin one-half {#def-spin}
A **spin-½** particle has spin operators $\hat{\mathbf S} = (\hat S_x, \hat S_y, \hat S_z)$ obeying $[\hat S_i, \hat S_j] = i\hbar\varepsilon_{ijk}\hat S_k$ on a two-dimensional space with orthonormal basis $|{\uparrow}\rangle = |\tfrac12\,\tfrac12\rangle$ and $|{\downarrow}\rangle = |\tfrac12\,{-\tfrac12}\rangle$, so that

$$
\hat S^2 = \frac34\hbar^2\,\hat 1, \qquad \hat S_z|{\uparrow}\rangle = \frac\hbar2|{\uparrow}\rangle, \qquad \hat S_z|{\downarrow}\rangle = -\frac\hbar2|{\downarrow}\rangle.
$$

A general spin state is a **spinor** $|\chi\rangle = a|{\uparrow}\rangle + b|{\downarrow}\rangle$, written as the column $\chi = \begin{pmatrix}a\\ b\end{pmatrix}$ with $\abs a^2 + \abs b^2 = 1$.
:::

The matrices follow from the ladder relations [[quantum-1/angular-momentum#eq-ladder-coeff]] with $s = \frac12$: $\hat S_+|{\downarrow}\rangle = \hbar\sqrt{\frac34 + \frac14}\,|{\uparrow}\rangle = \hbar|{\uparrow}\rangle$, and $\hat S_+|{\uparrow}\rangle = 0$, so $\hat S_+ = \hbar\begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$ and $\hat S_- = \hat S_+^\dagger$. Then $\hat S_x = \frac12(\hat S_+ + \hat S_-)$ and $\hat S_y = \frac{1}{2i}(\hat S_+ - \hat S_-)$. The result is $\hat{\mathbf S} = \frac\hbar2\boldsymbol\sigma$, with the **Pauli matrices**

$$
\sigma_x = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}, \qquad \sigma_y = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}, \qquad \sigma_z = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}.
$$ {#eq-pauli}

::: theorem Algebra of the Pauli matrices {#thm-pauli}
The Pauli matrices are Hermitian, traceless, square to the identity, and satisfy

$$
\sigma_i\sigma_j = \delta_{ij}\hat 1 + i\varepsilon_{ijk}\sigma_k.
$$ {#eq-pauli-product}

Consequently $[\sigma_i, \sigma_j] = 2i\varepsilon_{ijk}\sigma_k$, $\{\sigma_i, \sigma_j\} = \sigma_i\sigma_j + \sigma_j\sigma_i = 2\delta_{ij}\hat 1$, and for any real vectors $\mathbf a$, $\mathbf b$,

$$
(\boldsymbol\sigma\cdot\mathbf a)(\boldsymbol\sigma\cdot\mathbf b) = (\mathbf a\cdot\mathbf b)\,\hat 1 + i\,\boldsymbol\sigma\cdot(\mathbf a\times\mathbf b).
$$ {#eq-sigma-ab}
:::

::: proof
Hermiticity and tracelessness are visible in [[#eq-pauli]]. Direct multiplication gives $\sigma_x^2 = \sigma_y^2 = \sigma_z^2 = \hat 1$ and

$$
\sigma_x\sigma_y = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}\begin{pmatrix}0 & -i\\ i & 0\end{pmatrix} = \begin{pmatrix}i & 0\\ 0 & -i\end{pmatrix} = i\sigma_z,
$$

and similarly $\sigma_y\sigma_z = i\sigma_x$ and $\sigma_z\sigma_x = i\sigma_y$. Reversing the order changes the sign: $\sigma_y\sigma_x = (\sigma_x\sigma_y)^\dagger = -i\sigma_z$, since the Pauli matrices are Hermitian. These nine products are exactly [[#eq-pauli-product]]. The commutator and anticommutator follow by adding and subtracting the two orders. Finally,

$$
(\boldsymbol\sigma\cdot\mathbf a)(\boldsymbol\sigma\cdot\mathbf b) = \sum_{i,j}a_ib_j\sigma_i\sigma_j = \sum_{i,j}a_ib_j\bigl(\delta_{ij} + i\varepsilon_{ijk}\sigma_k\bigr) = \mathbf a\cdot\mathbf b + i\sum_k\sigma_k(\mathbf a\times\mathbf b)_k.
$$
:::

The commutator relation, multiplied by $(\hbar/2)^2$, is $[\hat S_i, \hat S_j] = i\hbar\varepsilon_{ijk}\hat S_k$, so the matrices are a genuine angular momentum. The identity [[#eq-sigma-ab]] with $\mathbf a = \mathbf b = \hat{\mathbf n}$, a unit vector, gives $(\boldsymbol\sigma\cdot\hat{\mathbf n})^2 = \hat 1$: the spin component along any direction, $\hat S_n = \frac\hbar2\boldsymbol\sigma\cdot\hat{\mathbf n}$, has eigenvalues $\pm\hbar/2$. Every direction is equivalent, as it must be: a Stern–Gerlach magnet along any axis gives two spots.

### Measuring along any direction

Let $\hat{\mathbf n} = (\sin\theta\cos\varphi, \sin\theta\sin\varphi, \cos\theta)$. Then

$$
\boldsymbol\sigma\cdot\hat{\mathbf n} = \begin{pmatrix}\cos\theta & \sin\theta\,e^{-i\varphi}\\ \sin\theta\,e^{i\varphi} & -\cos\theta\end{pmatrix},
$$

and one checks directly that its eigenvectors with eigenvalues $+1$ and $-1$ are

$$
|{\uparrow_n}\rangle = \begin{pmatrix}\cos\frac\theta2\\ e^{i\varphi}\sin\frac\theta2\end{pmatrix}, \qquad |{\downarrow_n}\rangle = \begin{pmatrix}-e^{-i\varphi}\sin\frac\theta2\\ \cos\frac\theta2\end{pmatrix}.
$$ {#eq-spin-n}

(For the first: the top row of $(\boldsymbol\sigma\cdot\hat{\mathbf n})|{\uparrow_n}\rangle$ is $\cos\theta\cos\frac\theta2 + \sin\theta\sin\frac\theta2 = \cos\frac\theta2$, using $\cos(\theta - \frac\theta2)$.) Conversely, *every* spinor is of the form $|{\uparrow_n}\rangle$ for some direction, up to a global phase: write $a = \abs ae^{i\alpha}$, $b = \abs be^{i\beta}$, pull out $e^{i\alpha}$, and choose $\cos\frac\theta2 = \abs a$, $\varphi = \beta - \alpha$. So every pure spin-½ state is "spin up along some axis", and the states correspond one-to-one with points on a sphere, the **Bloch sphere**. The expectation value $\langle\boldsymbol\sigma\rangle$ in the state $|{\uparrow_n}\rangle$ is exactly the unit vector $\hat{\mathbf n}$.

::: theorem Spin measurement along a tilted axis {#thm-tilted}
If a spin-½ particle is in the state $|{\uparrow_n}\rangle$, spin up along $\hat{\mathbf n}$, and $S$ is measured along a unit vector $\hat{\mathbf n}'$ making angle $\gamma$ with $\hat{\mathbf n}$, the probabilities are

$$
P(+\tfrac\hbar2) = \cos^2\frac\gamma2, \qquad P(-\tfrac\hbar2) = \sin^2\frac\gamma2,
$$

and $\langle S_{n'}\rangle = \frac\hbar2\cos\gamma$.
:::

::: proof
The physics is rotationally invariant, so we may take $\hat{\mathbf n} = \hat{\mathbf z}$ and $\hat{\mathbf n}'$ at polar angle $\gamma$, azimuth $0$. Then $|{\uparrow_n}\rangle = |{\uparrow}\rangle = (1, 0)$, and by [[#eq-spin-n]] $|{\uparrow_{n'}}\rangle = (\cos\frac\gamma2, \sin\frac\gamma2)$, so $P(+) = \abs{\langle{\uparrow_{n'}}|{\uparrow}\rangle}^2 = \cos^2\frac\gamma2$ and $P(-) = 1 - P(+) = \sin^2\frac\gamma2$. The mean is $\frac\hbar2(\cos^2\frac\gamma2 - \sin^2\frac\gamma2) = \frac\hbar2\cos\gamma$.
:::

For $\gamma = 90^\circ$ the outcomes are equally likely, as in the sequential experiment with the $x$ magnet. For $\gamma = 180^\circ$ the result is certainly $-\hbar/2$. Notice the half-angles: a rotation by $\gamma$ of the measuring axis changes the amplitude by $\cos\frac\gamma2$. Rotating the state itself by $2\pi$ about any axis multiplies the spinor by $-1$, as [[#eq-spin-n]] shows on replacing $\theta$ by $\theta + 2\pi$. A global sign has no observable effect on a single spin, so this is consistent with experiment, but it was observed directly in 1975 with neutron interferometers, where half of a neutron beam was rotated by $2\pi$ in a magnetic field and interfered destructively with the other half.

::: widget plot
f: cos(x/2)^2; sin(x/2)^2; (1 + cos(x))/2
x: 0, 2pi
y: 0, 1.05
piticks: true
labels: P(up along n′); P(down along n′); ⟨σ·n′⟩ + 1 over 2
caption: Probabilities of the two outcomes when a spin prepared up along $\hat{\mathbf n}$ is measured along an axis at angle $\gamma$ (horizontal axis). At $\gamma = 0$ the result is certain; at $\gamma = \pi/2$ it is a fair coin; at $\gamma = \pi$ it is certainly down. The third curve coincides with the first, which is the statement $\langle S_{n'}\rangle = \frac\hbar2\cos\gamma$ rewritten as a probability. Notice the period: the probabilities repeat after $2\pi$, while the spinor itself changes sign there.
:::

::: example Expectation values of a spinor {#ex-spinor}
An electron is in the spin state $\chi = \frac15\begin{pmatrix}3\\ 4i\end{pmatrix}$. Find the probabilities of $S_z = \pm\hbar/2$ and of $S_x = \pm\hbar/2$, and the vector $\langle\hat{\mathbf S}\rangle$. Along which direction is the spin definitely up?
::: solution
The state is normalised, since $(9 + 16)/25 = 1$. For $S_z$, $P(+) = \abs{3/5}^2 = 9/25$ and $P(-) = \abs{4i/5}^2 = 16/25$. The eigenvectors of $\sigma_x$ are $\frac{1}{\sqrt2}(1, \pm1)$, so

$$
P(S_x = \pm\tfrac\hbar2) = \frac12\abs{\frac35 \pm \frac{4i}{5}}^2 = \frac12\cdot\frac{9 + 16}{25} = \frac12.
$$

For the expectation values, with $\chi = (a, b)$, $\langle\sigma_z\rangle = \abs a^2 - \abs b^2$, $\langle\sigma_x\rangle = 2\operatorname{Re}(a^*b)$ and $\langle\sigma_y\rangle = 2\operatorname{Im}(a^*b)$. Here $a^*b = (3/5)(4i/5) = 12i/25$, so

$$
\langle\boldsymbol\sigma\rangle = \left(0,\ \frac{24}{25},\ -\frac{7}{25}\right), \qquad \langle\hat{\mathbf S}\rangle = \frac\hbar2\langle\boldsymbol\sigma\rangle = \hbar\left(0,\ \frac{12}{25},\ -\frac{7}{50}\right).
$$

The vector $\langle\boldsymbol\sigma\rangle$ has length $\sqrt{576 + 49}/25 = 1$: a pure spin-½ state always points somewhere on the Bloch sphere. The spin is definitely up along $\hat{\mathbf n} = (0, 0.96, -0.28)$, in the $yz$-plane, at polar angle $\theta = \arccos(-0.28) = 106.3^\circ$. Check with [[#eq-spin-n]]: $\cos\frac\theta2 = \cos53.1^\circ = 0.600 = \frac35$, and $e^{i\varphi}\sin\frac\theta2 = i(0.800)$ with $\varphi = 90^\circ$.
:::
:::

::: quiz
A beam of electrons with spin up along $z$ passes through a Stern–Gerlach magnet along $x$; only the $S_x = +\hbar/2$ beam is kept, and it is sent through a magnet along $z$. What fraction of the original beam emerges with $S_z = -\hbar/2$?
- [ ] $0$, because the beam was prepared with $S_z = +\hbar/2$.
- [x] $1/4$.
- [ ] $1/2$.
- [ ] $1/8$.
::: solution
Half the beam survives the $x$ selection ($\gamma = 90^\circ$ gives $\cos^2 45^\circ = \frac12$), and the survivors are in the state $|{\uparrow_x}\rangle$, which has no memory of the earlier $S_z$. In the final $z$ magnet, half of them go down. The fraction is $\frac12\times\frac12 = \frac14$. The first option treats $S_z$ as a property that survived the $S_x$ measurement, which [[quantum-1/formalism#ax-postulates]] (collapse) says it does not.
:::
:::

## Spin in a magnetic field {#precession}

The electron's spin carries a magnetic moment

$$
\hat{\boldsymbol\mu} = -g\,\frac{\mu_B}{\hbar}\,\hat{\mathbf S}, \qquad \mu_B = \frac{e\hbar}{2m_e} = 9.2740\times10^{-24}\,\mathrm{J/T},
$$ {#eq-moment}

where $\mu_B$ is the **Bohr magneton** and $g$ the **g-factor**. For orbital motion the same formula holds with $g = 1$ (the classical ratio of magnetic moment to angular momentum for a circulating charge is $q/2m$). For spin, Dirac's relativistic equation of 1928 predicts $g = 2$, and the measured value is $g = 2.00231930436$. The small excess, $0.00116$, was measured by Polykarp Kusch and Henry Foley in 1947 and computed by Julian Schwinger in 1948 as $\alpha/2\pi$, the first triumph of quantum electrodynamics. The minus sign means the moment points opposite the spin, because the electron is negative.

In a uniform field $\mathbf B = B\hat{\mathbf z}$ the Hamiltonian of the spin is

$$
\hat H = -\hat{\boldsymbol\mu}\cdot\mathbf B = \frac{g\mu_BB}{\hbar}\hat S_z = \frac{\hbar\omega_L}{2}\sigma_z, \qquad \omega_L = \frac{g\mu_BB}{\hbar}.
$$

Its eigenstates are $|{\uparrow}\rangle$ and $|{\downarrow}\rangle$ with energies $\pm\hbar\omega_L/2$, split by $\hbar\omega_L = g\mu_BB$. For $B = 1\,\mathrm T$ that is $1.16\times10^{-4}\,\mathrm{eV}$, about $1/200$ of $k_BT$ at room temperature.

::: theorem Larmor precession {#thm-larmor}
For a spin-½ in the field $B\hat{\mathbf z}$, with $\hat H = \frac12\hbar\omega_L\sigma_z$, the expectation value of the spin precesses about $\hat{\mathbf z}$ at the angular frequency $\omega_L$:

$$
\langle S_z\rangle(t) = \langle S_z\rangle(0), \qquad \langle S_x\rangle(t) + i\langle S_y\rangle(t) = e^{i\omega_Lt}\bigl(\langle S_x\rangle(0) + i\langle S_y\rangle(0)\bigr).
$$

A spin starting up along $\hat{\mathbf n}$ at polar angle $\theta$ and azimuth $\varphi_0$ stays at polar angle $\theta$ and has azimuth $\varphi_0 + \omega_Lt$.
:::

::: proof
Write the initial state as $\chi(0) = (a, b)$. The energy eigenstates are $|{\uparrow}\rangle$ and $|{\downarrow}\rangle$ with energies $\pm\frac12\hbar\omega_L$, so by [[quantum-1/schrodinger-equation#thm-stationary]] $\chi(t) = (ae^{-i\omega_Lt/2}, be^{i\omega_Lt/2})$. Then $\abs{a(t)}^2 - \abs{b(t)}^2$ is constant, which gives $\langle S_z\rangle$, and

$$
a(t)^*b(t) = a^*b\,e^{i\omega_Lt}.
$$

Since $\langle\sigma_x\rangle + i\langle\sigma_y\rangle = 2\operatorname{Re}(a^*b) + 2i\operatorname{Im}(a^*b) = 2a^*b$, the transverse components rotate by $e^{i\omega_Lt}$. For the state [[#eq-spin-n]], $a^*b = \cos\frac\theta2\sin\frac\theta2\,e^{i\varphi_0}$, so the azimuth advances as $\varphi_0 + \omega_Lt$.
:::

This is the same precession as a classical magnetic top in a field, at the same rate, because $\langle\hat{\mathbf S}\rangle$ obeys the classical equation $\dd\langle\mathbf S\rangle/\dd t = \langle\boldsymbol\mu\rangle\times\mathbf B$ (Ehrenfest again, since the Hamiltonian is linear in $\hat{\mathbf S}$). The frequency $\omega_L/2\pi = g\mu_BB/h$ is $28.0\,\mathrm{GHz}$ per tesla for the electron.

::: example A spin flipped by a transverse field {#ex-flip}
An electron spin is prepared up along $z$ at $t = 0$, and a field $\mathbf B = B\hat{\mathbf x}$ is switched on. Find the probability that a measurement of $S_z$ at time $t$ gives $-\hbar/2$, and the shortest time at which the spin has certainly flipped, for $B = 1.00\,\mathrm{mT}$.
::: solution
Now $\hat H = \frac12\hbar\omega_L\sigma_x$. By the rotation-operator exercise below (or by solving the two coupled equations directly), the evolution operator is

$$
e^{-i\omega_Lt\sigma_x/2} = \cos\frac{\omega_Lt}{2}\,\hat 1 - i\sin\frac{\omega_Lt}{2}\,\sigma_x,
$$

so the state is $\chi(t) = \bigl(\cos\frac{\omega_Lt}{2},\ -i\sin\frac{\omega_Lt}{2}\bigr)$, and

$$
P(S_z = -\tfrac\hbar2) = \sin^2\frac{\omega_Lt}{2}.
$$

In the Bloch picture the spin precesses about $x$, through the $yz$-plane, from the north pole to the south pole and back. The first time the flip is certain is $\omega_Lt = \pi$, i.e. $t = \pi\hbar/g\mu_BB$. For $B = 1.00\times10^{-3}\,\mathrm T$, $\omega_L = g\mu_BB/\hbar = (2.0023)(9.2740\times10^{-24})(10^{-3})/(1.05457\times10^{-34}) = 1.761\times10^8\,\mathrm{s^{-1}}$, so $t = \pi/\omega_L = 17.8\,\mathrm{ns}$. A pulse of exactly this length is a "$\pi$ pulse"; half of it, a "$\pi/2$ pulse", turns $|{\uparrow}\rangle$ into an equal superposition. These are the basic operations of magnetic resonance and of spin qubits.
:::
:::

::: widget plot
f: sin(q)*cos(w*x); sin(q)*sin(w*x); cos(q)
x: 0, 10
y: -1.1, 1.1
labels: ⟨σx⟩; ⟨σy⟩; ⟨σz⟩
sliders: w=1:0.2:3:0.1; q=1.2:0:3.14:0.02
caption: Larmor precession: the components of $\langle\boldsymbol\sigma\rangle$ against time for a spin starting at polar angle $q$ (slider, in radians) in a field along $z$, with Larmor frequency $w$. The $z$-component is constant; the transverse components rotate at $w$, a quarter-period apart. Set $q = 0$ and nothing moves: an energy eigenstate is stationary. Set $q = \pi/2$ and the spin sweeps round the equator of the Bloch sphere.
:::

::: application Magnetic resonance
If a weak field oscillating at the Larmor frequency is added perpendicular to $\mathbf B$, it drives transitions between $|{\uparrow}\rangle$ and $|{\downarrow}\rangle$, a resonance studied in [[quantum-2/time-dependent]]. For electrons this is **electron spin resonance**: spectrometers in the X band use about $9.8\,\mathrm{GHz}$ at $0.35\,\mathrm T$, matching $g\mu_BB/h = 28.0\,\mathrm{GHz/T}\times0.350\,\mathrm T$. For protons, whose magnetic moment is $2.793$ nuclear magnetons, the frequency is $42.58\,\mathrm{MHz}$ per tesla; **nuclear magnetic resonance** and its medical form, MRI, use exactly that precession of hydrogen nuclei in water and fat. A $3\,\mathrm T$ clinical scanner works at about $128\,\mathrm{MHz}$.
:::

## Spin and the full state of an electron {#full-state}

For an electron in an atom, the complete state specifies both where it is and how its spin points. The Hilbert space is the tensor product of $L^2(\R^3)$ and the two-dimensional spin space, and a general state is a two-component wavefunction

$$
\Psi(\mathbf r) = \psi_\uparrow(\mathbf r)\,|{\uparrow}\rangle + \psi_\downarrow(\mathbf r)\,|{\downarrow}\rangle, \qquad \int\bigl(\abs{\psi_\uparrow}^2 + \abs{\psi_\downarrow}^2\bigr)\,\dd^3r = 1.
$$

$\abs{\psi_\uparrow(\mathbf r)}^2\,\dd^3r$ is the probability of finding the electron near $\mathbf r$ with spin up. The spin operators act on the spin part and commute with $\hat{\mathbf r}$, $\hat{\mathbf p}$ and $\hat{\mathbf L}$. If the Hamiltonian does not involve spin, as in the hydrogen atom of [[quantum-1/hydrogen]], the stationary states are products $\psi_{nlm}(\mathbf r)\chi$ with $\chi = |{\uparrow}\rangle$ or $|{\downarrow}\rangle$, and every level has twice the degeneracy computed there: $2n^2$. When spin–orbit coupling is included, the good quantum numbers become $n$, $l$, $j$ and $m_j$, with $j = l \pm \frac12$ by [[quantum-1/angular-momentum#thm-addition]].

### The magnetic moment of an atom

The orbital and spin magnetic moments of an electron enter with different ratios to the angular momentum, $g_L = 1$ and $g_S \approx 2$, so the total moment $-\mu_B(\hat{\mathbf L} + 2\hat{\mathbf S})/\hbar$ is not parallel to $\hat{\mathbf J} = \hat{\mathbf L} + \hat{\mathbf S}$. In a weak field only its component along $\hat{\mathbf J}$ survives the rapid precession about $\hat{\mathbf J}$, and the energy shift is $g_J\mu_BBm_j$ with the **Landé factor**

$$
g_J = 1 + \frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}.
$$

For $2p_{3/2}$ this is $\frac43$, for $2p_{1/2}$ it is $\frac23$ and for an $s$ state with $j = \frac12$ it is $2$. Different levels therefore split by different amounts, and the lines between them break into more components than the $2l + 1$ of the orbital theory: this is the **anomalous Zeeman effect** that puzzled spectroscopists from 1897 until spin was proposed, and the first clue that led Pauli to his "two-valuedness". The silver atom in the Stern–Gerlach experiment is in a $5s_{1/2}$ state with $g_J = 2$, so its moment along the field is $\pm\mu_B$, which is the value used in [[#ex-sg]].

::: warning Spin is not a spinning ball
George Uhlenbeck and Samuel Goudsmit pictured spin as rotation of the electron, and the name stuck. The picture fails quantitatively. An electron spinning with angular momentum $\hbar/2$ and a radius small enough to be consistent with scattering experiments (no structure is seen down to $10^{-18}\,\mathrm m$) would need a surface speed vastly greater than $c$. And no classical rotation gives $s = \frac12$, since orbital angular momentum is always an integer multiple of $\hbar$. Spin is an intrinsic property, like charge, that transforms under rotations as an angular momentum. The minus sign of a $2\pi$ rotation has no classical counterpart at all.
:::

## Adding two spins {#two-spins}

Two spin-½ particles, say the electron and the proton in hydrogen or the two electrons in helium, have a four-dimensional spin space with uncoupled basis $|{\uparrow\uparrow}\rangle$, $|{\uparrow\downarrow}\rangle$, $|{\downarrow\uparrow}\rangle$, $|{\downarrow\downarrow}\rangle$ (first arrow for particle 1). By [[quantum-1/angular-momentum#thm-addition]] with $j_1 = j_2 = \frac12$, the total spin $\hat{\mathbf S} = \hat{\mathbf S}_1 + \hat{\mathbf S}_2$ has $s = 1$ (three states) and $s = 0$ (one state).

::: proposition Triplet and singlet {#prop-triplet-singlet}
The eigenstates of $\hat S^2$ and $\hat S_z$ for two spin-½ particles are the **triplet** ($s = 1$)

$$
|1\,1\rangle = |{\uparrow\uparrow}\rangle, \qquad |1\,0\rangle = \frac{1}{\sqrt2}\bigl(|{\uparrow\downarrow}\rangle + |{\downarrow\uparrow}\rangle\bigr), \qquad |1\,{-1}\rangle = |{\downarrow\downarrow}\rangle,
$$

and the **singlet** ($s = 0$)

$$
|0\,0\rangle = \frac{1}{\sqrt2}\bigl(|{\uparrow\downarrow}\rangle - |{\downarrow\uparrow}\rangle\bigr).
$$

The triplet states are symmetric under exchange of the two particles and the singlet is antisymmetric. In them, $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$ has the values $+\frac14\hbar^2$ (triplet) and $-\frac34\hbar^2$ (singlet).
:::

::: proof
$|{\uparrow\uparrow}\rangle$ has $m = 1$, the largest possible, so it is $|1\,1\rangle$. Lower it with $\hat S_- = \hat S_{1-} + \hat S_{2-}$. On the left, $\hat S_-|1\,1\rangle = \hbar\sqrt{2}\,|1\,0\rangle$. On the right, each $\hat S_{i-}$ turns its $\uparrow$ into $\downarrow$ with coefficient $\hbar$, giving $\hbar(|{\downarrow\uparrow}\rangle + |{\uparrow\downarrow}\rangle)$. Equating gives $|1\,0\rangle$; lowering once more gives $|{\downarrow\downarrow}\rangle$. The singlet is the remaining state with $m = 0$, orthogonal to $|1\,0\rangle$, with a phase convention. To confirm $s = 0$, check that $\hat S_\pm$ annihilate it: $\hat S_+|0\,0\rangle = \frac{\hbar}{\sqrt2}(|{\uparrow\uparrow}\rangle - |{\uparrow\uparrow}\rangle) = 0$, and similarly for $\hat S_-$, so with $\hat S_z|0\,0\rangle = 0$ every component annihilates it and $\hat S^2|0\,0\rangle = 0$.

For the dot product, $\hat S^2 = \hat S_1^2 + \hat S_2^2 + 2\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$, so $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac12\bigl(\hbar^2s(s+1) - \frac34\hbar^2 - \frac34\hbar^2\bigr)$, which is $\frac12(2 - \frac32)\hbar^2 = \frac14\hbar^2$ for $s = 1$ and $\frac12(0 - \frac32)\hbar^2 = -\frac34\hbar^2$ for $s = 0$.
:::

::: example Spin–orbit states of a p electron {#ex-spin-orbit}
An electron in a $2p$ state of hydrogen has $l = 1$ and $s = \frac12$. Find the possible values of $j$ for $\hat{\mathbf J} = \hat{\mathbf L} + \hat{\mathbf S}$, the number of states for each, the eigenvalues of $\hat{\mathbf L}\cdot\hat{\mathbf S}$, and the state $|j = \frac32,\ m_j = \frac12\rangle$ in the uncoupled basis.
::: solution
By [[quantum-1/angular-momentum#thm-addition]], $j = \frac12$ or $\frac32$, with $2$ and $4$ states, accounting for the $3\times2 = 6$ states of a $p$ electron with spin. With $\hat{\mathbf L}\cdot\hat{\mathbf S} = \frac12(\hat J^2 - \hat L^2 - \hat S^2)$,

$$
\hat{\mathbf L}\cdot\hat{\mathbf S} = \frac{\hbar^2}{2}\left(j(j+1) - 2 - \frac34\right) = \begin{cases}\frac12\hbar^2, & j = \frac32,\\ -\hbar^2, & j = \frac12.\end{cases}
$$

The spin–orbit interaction is proportional to $\hat{\mathbf L}\cdot\hat{\mathbf S}$, so it splits $2p$ into $2p_{3/2}$ (four states) and $2p_{1/2}$ (two), with the centre of gravity unchanged: $4\cdot\frac12 + 2\cdot(-1) = 0$. For the state, start from the top, $|\frac32\,\frac32\rangle = |1\,1\rangle|{\uparrow}\rangle$, and lower with $\hat J_- = \hat L_- + \hat S_-$. On the left, $\hat J_-|\frac32\,\frac32\rangle = \hbar\sqrt{\frac{15}{4} - \frac34}\,|\frac32\,\frac12\rangle = \sqrt3\hbar\,|\frac32\,\frac12\rangle$. On the right, $\hat L_-|1\,1\rangle = \sqrt2\hbar|1\,0\rangle$ and $\hat S_-|{\uparrow}\rangle = \hbar|{\downarrow}\rangle$. Hence

$$
\left|\tfrac32\,\tfrac12\right\rangle = \sqrt{\tfrac23}\,|1\,0\rangle|{\uparrow}\rangle + \sqrt{\tfrac13}\,|1\,1\rangle|{\downarrow}\rangle.
$$

In this state a measurement of $S_z$ gives $+\hbar/2$ with probability $\frac23$, even though $m_j = \frac12$ is definite. The orthogonal combination $\sqrt{\frac13}|1\,0\rangle|{\uparrow}\rangle - \sqrt{\frac23}|1\,1\rangle|{\downarrow}\rangle$ is $|\frac12\,\frac12\rangle$.
:::
:::

The singlet is the simplest **entangled** state: neither particle has a spin state of its own, yet a measurement of $S_z$ on one gives the opposite result on the other with certainty, along any axis. In hydrogen the magnetic interaction between the electron and proton spins is proportional to $\hat{\mathbf S}_e\cdot\hat{\mathbf S}_p$, so it splits the ground state into a triplet and a singlet separated by $5.87\,\mu\mathrm{eV}$; the transition between them is the $21\,\mathrm{cm}$ line of [[quantum-1/hydrogen]]. In helium, the symmetry of the spin state combined with the Pauli principle decides which spatial states are allowed, which is how spin shapes atomic structure ([[quantum-2/identical-particles]]).

::: example The hydrogen hyperfine levels {#ex-hyperfine}
Suppose the spin–spin interaction in the hydrogen ground state is $\hat H_{\mathrm{hf}} = (A/\hbar^2)\,\hat{\mathbf S}_e\cdot\hat{\mathbf S}_p$ with $A > 0$. Find the energies of the four spin states, the degeneracies, and the value of $A$ in electronvolts that reproduces the $21\,\mathrm{cm}$ line at $1420.406\,\mathrm{MHz}$.
::: solution
By [[#prop-triplet-singlet]] the triplet states have $\hat{\mathbf S}_e\cdot\hat{\mathbf S}_p = \frac14\hbar^2$ and so energy $+A/4$, three-fold degenerate; the singlet has $-\frac34\hbar^2$ and energy $-3A/4$. The singlet is the ground state, and the splitting is $A/4 + 3A/4 = A$. The photon has $h\nu = A$, so

$$
A = (6.62607\times10^{-34})(1.420406\times10^9)\,\mathrm J = 9.4117\times10^{-25}\,\mathrm J = 5.874\,\mu\mathrm{eV}.
$$

Equivalently the temperature $A/k_B = 0.068\,\mathrm K$. In interstellar space, collisions keep the triplet populated in the ratio $3:1$ fixed by the degeneracies, and the very slow spontaneous decay (lifetime about $10^7$ years per atom) is compensated by the enormous number of atoms along any line of sight.
:::
:::

::: history The discovery of spin
Otto Stern and Walther Gerlach performed their experiment in Frankfurt in February 1922. In 1924 Wolfgang Pauli, trying to explain the anomalous Zeeman effect and the structure of the periodic table, proposed that the electron has a "classically indescribable two-valuedness", and in early 1925 he formulated the exclusion principle. Ralph Kronig thought of a spinning electron that year but was discouraged from publishing. George Uhlenbeck and Samuel Goudsmit, students of Paul Ehrenfest in Leiden, proposed the spinning electron in *Naturwissenschaften* in November 1925; Llewellyn Thomas showed in 1926 that a relativistic precession factor of $\frac12$ removed a discrepancy in the fine structure. Pauli gave the two-component non-relativistic theory with the matrices now named after him in 1927, and Phipps and Taylor's hydrogen beam experiment the same year confirmed that the Stern–Gerlach splitting is due to electron spin. Paul Dirac's relativistic equation of 1928 produced spin and $g = 2$ without being asked to.
:::

## Where this leads {#leads}

Spin–orbit coupling and the Zeeman effect, which split atomic levels according to $j$ and $m_j$, are treated with perturbation theory in [[quantum-2/stationary-perturbation]] and [[quantum-2/atomic-structure]]. The triplet and singlet are the first examples of the identical-particle symmetry of [[quantum-2/identical-particles]] and of the entangled states of [[quantum-2/entanglement]], where the singlet is used to test Bell's inequality. A two-level system with Hamiltonian $\frac12\hbar\boldsymbol\omega\cdot\boldsymbol\sigma$ is also the qubit of quantum computing: every pure state is a point on the Bloch sphere, and every operation a rotation of it. In particle physics, spin-½ particles are fermions, and their behaviour under rotations is part of [[particles]].

::: summary
- The Stern–Gerlach experiment splits a beam of silver (or hydrogen) atoms into two: the electron has an intrinsic angular momentum with $s = \frac12$, $m_s = \pm\frac12$.
- Spin-½ states are two-component spinors; $\hat{\mathbf S} = \frac\hbar2\boldsymbol\sigma$ with the Pauli matrices, which satisfy $\sigma_i\sigma_j = \delta_{ij} + i\varepsilon_{ijk}\sigma_k$; $\hat S^2 = \frac34\hbar^2$.
- The spin component along any axis has eigenvalues $\pm\hbar/2$; every pure state is spin up along some direction (a point on the Bloch sphere).
- A spin up along $\hat{\mathbf n}$ measured along an axis at angle $\gamma$ gives up with probability $\cos^2(\gamma/2)$.
- The magnetic moment is $\hat{\boldsymbol\mu} = -g\mu_B\hat{\mathbf S}/\hbar$ with $g = 2.0023$; in a field the spin precesses at $\omega_L = g\mu_BB/\hbar$, $28.0\,\mathrm{GHz}$ per tesla.
- A $2\pi$ rotation multiplies a spinor by $-1$; spin has no classical model as a spinning ball.
- Two spins combine into a symmetric triplet ($s = 1$, $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac14\hbar^2$) and an antisymmetric singlet ($s = 0$, $-\frac34\hbar^2$).
:::

## Exercises {#exercises}

::: exercise Length of the spin {level=1 check="3/4"}
Give the eigenvalue of $\hat S^2$ for an electron in units of $\hbar^2$, and the eigenvalues of $\sigma_y$.
::: solution
$\hat S^2 = s(s+1)\hbar^2 = \frac12\cdot\frac32\hbar^2 = \frac34\hbar^2$. Also $\hat S^2 = \frac{\hbar^2}{4}(\sigma_x^2 + \sigma_y^2 + \sigma_z^2) = \frac{3\hbar^2}{4}\hat 1$. The eigenvalues of $\sigma_y$ are $\pm1$: its characteristic polynomial is $\lambda^2 - (-i)(i) = \lambda^2 - 1$.
:::
:::

::: exercise An ESR spectrometer {level=1 check="9.81"}
Find the electron spin resonance frequency, in GHz, at $B = 0.350\,\mathrm T$, using $g = 2.0023$ and $\mu_B = 9.2740\times10^{-24}\,\mathrm{J/T}$.
::: solution
$\nu = g\mu_BB/h = (2.0023)(9.2740\times10^{-24})(0.350)/(6.62607\times10^{-34}) = 9.81\times10^9\,\mathrm{Hz} = 9.81\,\mathrm{GHz}$, a microwave frequency.
:::
:::

::: exercise A tilted measurement {level=1 check="3/4"}
A spin is prepared up along $z$. Find the probability that a measurement along an axis at $60^\circ$ to $z$ gives $+\hbar/2$.
::: solution
By [[#thm-tilted]], $P = \cos^2 30^\circ = \frac34$.
:::
:::

::: exercise The y-component {level=2 check="12/25"}
For the state $\chi = \frac15(3, 4i)$ of [[#ex-spinor]], compute $\langle S_y\rangle$ directly from the matrix $\sigma_y$, in units of $\hbar$.
::: solution
$\sigma_y\chi = \frac15\begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}\begin{pmatrix}3\\ 4i\end{pmatrix} = \frac15\begin{pmatrix}4\\ 3i\end{pmatrix}$. Then $\chi^\dagger\sigma_y\chi = \frac{1}{25}\bigl(3\cdot4 + (-4i)(3i)\bigr) = \frac{12 + 12}{25} = \frac{24}{25}$, so $\langle S_y\rangle = \frac\hbar2\cdot\frac{24}{25} = \frac{12}{25}\hbar$.
:::
:::

::: exercise Three magnets {level=2 check="1/4"}
Unpolarised silver atoms (half spin up, half down along any axis) pass through a $z$ magnet; only the up beam is kept. It then passes through a magnet whose axis is at $90^\circ$ to $z$, and only the up beam is kept; finally it passes through a $z$ magnet and the down beam is collected. What fraction of the atoms that left the first magnet in the up beam reach the collector?
::: solution
After the first magnet the atoms are in $|{\uparrow}\rangle$. The second magnet keeps a fraction $\cos^245^\circ = \frac12$, now in the state up along the new axis. The third magnet sends $\sin^245^\circ = \frac12$ of those down. The fraction is $\frac14$. Without the middle magnet it would have been $0$: inserting a measurement can make a previously forbidden outcome possible.
:::
:::

::: exercise Precession period {level=2 check="35.7"}
Find the period of Larmor precession, in picoseconds, of an electron spin in a field of $1.00\,\mathrm T$.
::: solution
$\nu_L = g\mu_BB/h = 28.02\,\mathrm{GHz}$, so the period is $1/\nu_L = 3.57\times10^{-11}\,\mathrm s = 35.7\,\mathrm{ps}$.
:::
:::

::: exercise Rotation operators {level=3}
Use [[#eq-sigma-ab]] to show that $(\boldsymbol\sigma\cdot\hat{\mathbf n})^2 = \hat 1$ for a unit vector $\hat{\mathbf n}$, and deduce

$$
e^{-i\alpha\,\boldsymbol\sigma\cdot\hat{\mathbf n}/2} = \cos\frac\alpha2\,\hat 1 - i\sin\frac\alpha2\,\boldsymbol\sigma\cdot\hat{\mathbf n}.
$$

Show that this operator with $\alpha = 2\pi$ is $-\hat 1$, and that it is the time-evolution operator $e^{-i\hat Ht/\hbar}$ of the spin in [[#thm-larmor]] when $\hat{\mathbf n} = \hat{\mathbf z}$ and $\alpha = \omega_Lt$.
::: solution
With $\mathbf a = \mathbf b = \hat{\mathbf n}$, [[#eq-sigma-ab]] gives $(\boldsymbol\sigma\cdot\hat{\mathbf n})^2 = \hat{\mathbf n}\cdot\hat{\mathbf n} + i\boldsymbol\sigma\cdot(\hat{\mathbf n}\times\hat{\mathbf n}) = \hat 1$. So in the power series of the exponential, with $N = \boldsymbol\sigma\cdot\hat{\mathbf n}$, even powers of $N$ are $\hat 1$ and odd powers are $N$:

$$
e^{-i\alpha N/2} = \sum_k\frac{(-i\alpha/2)^k}{k!}N^k = \left(\sum_{k\ \mathrm{even}}\frac{(-i\alpha/2)^k}{k!}\right)\hat 1 + \left(\sum_{k\ \mathrm{odd}}\frac{(-i\alpha/2)^k}{k!}\right)N = \cos\frac\alpha2\,\hat 1 - i\sin\frac\alpha2\,N.
$$

At $\alpha = 2\pi$, $\cos\pi = -1$ and $\sin\pi = 0$, so the operator is $-\hat 1$. With $\hat H = \frac12\hbar\omega_L\sigma_z$, $e^{-i\hat Ht/\hbar} = e^{-i\omega_Lt\sigma_z/2}$, which is the formula with $\hat{\mathbf n} = \hat{\mathbf z}$ and $\alpha = \omega_Lt$; acting on $(a, b)$ it gives $(ae^{-i\omega_Lt/2}, be^{i\omega_Lt/2})$, as in the proof of Larmor precession. Time evolution in a magnetic field is a rotation of the spin about the field.
:::
:::

::: exercise The singlet looks the same along every axis {level=3 check="-3/4"}
Show that the singlet $|0\,0\rangle$ has the same form, up to a global phase, when written in the basis of spin up and down along $x$ instead of $z$. Then give $\langle\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2\rangle$ in the singlet, in units of $\hbar^2$.
::: hint
$|{\uparrow}\rangle = \frac{1}{\sqrt2}(|{\uparrow_x}\rangle + |{\downarrow_x}\rangle)$ and $|{\downarrow}\rangle = \frac{1}{\sqrt2}(|{\uparrow_x}\rangle - |{\downarrow_x}\rangle)$.
:::
::: solution
Substitute the hint into $|{\uparrow\downarrow}\rangle - |{\downarrow\uparrow}\rangle$, writing $+$ and $-$ for $\uparrow_x$ and $\downarrow_x$:

$$
\frac12\Bigl[(|+\rangle + |-\rangle)(|+\rangle - |-\rangle) - (|+\rangle - |-\rangle)(|+\rangle + |-\rangle)\Bigr] = \frac12\Bigl[-2|{+-}\rangle + 2|{-+}\rangle\Bigr] = -\bigl(|{+-}\rangle - |{-+}\rangle\bigr).
$$

So $|0\,0\rangle = -\frac{1}{\sqrt2}(|{+-}\rangle - |{-+}\rangle)$: the same antisymmetric form, with a global sign. The same holds for any axis, because $s = 0$ means the state is unchanged by rotations. Consequently, measuring both spins along any common axis always gives opposite results. By [[#prop-triplet-singlet]], $\langle\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2\rangle = -\frac34\hbar^2$, so the answer is $-\frac34$. Each of the three products $\hat S_{1i}\hat S_{2i}$ contributes $-\frac14\hbar^2$, the perfect anticorrelation along each axis.
:::
:::
