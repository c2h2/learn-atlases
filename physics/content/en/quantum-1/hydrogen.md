The hydrogen atom is the one real atom whose Schrödinger equation can be solved exactly, and the solution is the foundation of atomic physics and chemistry. Bohr's model of [[quantum-1/origins]] produced the right energies with the wrong picture: circular orbits, a ground state with angular momentum $\hbar$, and no way to say how big the atom is in any direction except one. The Schrödinger equation gives the same energies with the right picture: stationary states that are standing waves in three dimensions, labelled by three quantum numbers $n$, $l$, $m$, with a ground state that is spherically symmetric and has zero angular momentum.

The strategy uses everything built so far. A central potential commutes with angular momentum ([[quantum-1/angular-momentum]]), so the angular dependence of every stationary state is a spherical harmonic $Y_l^m(\theta, \varphi)$, and what remains is a one-dimensional problem for the radial motion, much like the problems of [[quantum-1/piecewise-potentials]] but on the half-line $r > 0$. For the Coulomb potential that radial equation can be solved by a power series, and, exactly as for the harmonic oscillator, normalisability forces the series to terminate. Termination quantises the energy.

We take the nucleus to have charge $Ze$ where it costs nothing, so that the results apply to hydrogen-like ions such as $\mathrm{He}^+$ and $\mathrm{Li}^{2+}$, and set $Z = 1$ for numbers. We use the reduced mass $\mu = m_em_p/(m_e + m_p)$ throughout; the two-body problem of electron and proton separates into free motion of the centre of mass and the motion of one particle of mass $\mu$ in the potential $V(r)$, exactly as in classical mechanics.

## From two bodies to one {#two-body}

The hydrogen atom is two particles, and the first step is to reduce it to one. This is the same reduction as in the classical Kepler problem, and it works in quantum mechanics for the same reason: the interaction depends only on the separation.

::: proposition Separation of the centre of mass {#prop-two-body}
Let two particles of masses $m_1$, $m_2$ at $\mathbf r_1$, $\mathbf r_2$ interact through a potential $V(\abs{\mathbf r_1 - \mathbf r_2})$. In terms of the centre of mass $\mathbf R = (m_1\mathbf r_1 + m_2\mathbf r_2)/M$, with $M = m_1 + m_2$, and the relative position $\mathbf r = \mathbf r_1 - \mathbf r_2$, the Hamiltonian is

$$
\hat H = -\frac{\hbar^2}{2M}\nabla_{\mathbf R}^2 - \frac{\hbar^2}{2\mu}\nabla_{\mathbf r}^2 + V(r), \qquad \mu = \frac{m_1m_2}{m_1 + m_2},
$$

so stationary states have the form $\Psi = e^{i\mathbf K\cdot\mathbf R}\psi(\mathbf r)$, with energy $\hbar^2K^2/2M + E$, where $\psi$ satisfies the one-body Schrödinger equation for a particle of mass $\mu$ in the potential $V(r)$.
:::

::: proof
By the chain rule, $\partial/\partial x_1 = (m_1/M)\,\partial/\partial X + \partial/\partial x$ and $\partial/\partial x_2 = (m_2/M)\,\partial/\partial X - \partial/\partial x$, and likewise for $y$ and $z$. Squaring,

$$
\frac{1}{m_1}\frac{\partial^2}{\partial x_1^2} + \frac{1}{m_2}\frac{\partial^2}{\partial x_2^2} = \frac{m_1 + m_2}{M^2}\frac{\partial^2}{\partial X^2} + \left(\frac{1}{m_1} + \frac{1}{m_2}\right)\frac{\partial^2}{\partial x^2} + \left(\frac{2}{M} - \frac{2}{M}\right)\frac{\partial^2}{\partial X\,\partial x}.
$$

The cross terms cancel, $(m_1 + m_2)/M^2 = 1/M$ and $1/m_1 + 1/m_2 = 1/\mu$, which gives the stated Hamiltonian. It is a sum of a part acting only on $\mathbf R$ (a free particle of mass $M$, with plane-wave eigenfunctions $e^{i\mathbf K\cdot\mathbf R}$) and a part acting only on $\mathbf r$, so separation of variables gives product eigenfunctions and additive energies.
:::

For hydrogen, $\mu = m_e/(1 + m_e/m_p) = 0.999456\,m_e$: the correction is half a part in a thousand, small but far larger than the precision of spectroscopy, which is how deuterium was found. For positronium the two masses are equal and $\mu = m_e/2$, which halves every binding energy. From now on we work with the relative coordinate and write $\mu$ for the mass.

## Separating the variables {#separation}

In three dimensions the time-independent Schrödinger equation is

$$
-\frac{\hbar^2}{2\mu}\nabla^2\psi + V(r)\psi = E\psi.
$$

Using the decomposition of the Laplacian from [[quantum-1/angular-momentum#eq-laplacian]],

$$
-\frac{\hbar^2}{2\mu}\frac{1}{r^2}\pdv{}{r}\left(r^2\pdv{\psi}{r}\right) + \frac{\hat L^2}{2\mu r^2}\psi + V(r)\psi = E\psi.
$$

The operator $\hat L^2$ acts only on the angles, so we try $\psi(r, \theta, \varphi) = R(r)\,Y_l^m(\theta, \varphi)$. Since $\hat L^2Y_l^m = \hbar^2l(l+1)Y_l^m$, the spherical harmonic factors out of every term and leaves an ordinary differential equation for $R$. It looks simplest in terms of $u(r) = rR(r)$, because $\frac{1}{r^2}(r^2R')' = u''/r$.

::: definition Radial equation and effective potential {#def-radial}
For a stationary state $\psi = R(r)Y_l^m(\theta,\varphi)$ in a central potential, the function $u = rR$ satisfies the **radial equation**

$$
-\frac{\hbar^2}{2\mu}\deriv{^2u}{r^2} + V_{\mathrm{eff}}(r)\,u = Eu, \qquad V_{\mathrm{eff}}(r) = V(r) + \frac{\hbar^2l(l+1)}{2\mu r^2},
$$ {#eq-radial}

on $0 < r < \infty$, with normalisation $\int_0^\infty\abs u^2\,\dd r = 1$ (since $\int\abs\psi^2\,\dd^3r = \int_0^\infty\abs R^2r^2\,\dd r$ when $Y_l^m$ is normalised) and the boundary condition $u(0) = 0$.
:::

The radial equation is a one-dimensional Schrödinger equation in the **effective potential** $V_{\mathrm{eff}}$. The extra term $\hbar^2l(l+1)/2\mu r^2$ is the **centrifugal barrier**. Classically, a particle with angular momentum $L$ has radial kinetic energy $E - V - L^2/2\mu r^2$, and the last term pushes it away from the origin; here $L^2$ is replaced by its eigenvalue. The condition $u(0) = 0$ is needed because $R = u/r$ must stay finite at the origin (for $l = 0$, a solution with $u(0) \ne 0$ would make $R \sim 1/r$, and $\nabla^2(1/r) = -4\pi\delta^3(\mathbf r)$ would put a delta function into the equation that is not there). So the half-line problem is like a well with an infinite wall at $r = 0$.

Notice that $m$ does not appear in [[#eq-radial]]. The radial function depends on $l$ but not on $m$, and so does the energy. This is the $(2l+1)$-fold rotational degeneracy anticipated in [[quantum-1/angular-momentum]], and it holds in any central potential.

## Solving the Coulomb problem {#coulomb}

Now take $V(r) = -Ze^2/4\pi\varepsilon_0r$ and look for bound states, $E < 0$. Introduce

$$
\kappa = \frac{\sqrt{-2\mu E}}{\hbar}, \qquad \rho = \kappa r, \qquad \rho_0 = \frac{2\mu Ze^2}{4\pi\varepsilon_0\hbar^2\kappa}.
$$

Dividing [[#eq-radial]] by $E = -\hbar^2\kappa^2/2\mu$ turns it into the dimensionless form

$$
\deriv{^2u}{\rho^2} = \left[1 - \frac{\rho_0}{\rho} + \frac{l(l+1)}{\rho^2}\right]u.
$$ {#eq-radial-dimless}

Look at the two ends first. For large $\rho$ the bracket tends to $1$, and $u \sim e^{-\rho}$ (the growing solution $e^\rho$ is not normalisable). For small $\rho$ the centrifugal term dominates, and $u'' \approx l(l+1)u/\rho^2$ has solutions $\rho^{l+1}$ and $\rho^{-l}$; the condition $u(0) = 0$ selects $\rho^{l+1}$. So we write

$$
u(\rho) = \rho^{l+1}e^{-\rho}\,v(\rho),
$$

and expect $v$ to be a well-behaved function, ideally a polynomial.

::: theorem Energy levels of hydrogen {#thm-hydrogen}
The bound-state energies of a particle of mass $\mu$ in the potential $-Ze^2/4\pi\varepsilon_0r$ are

$$
E_n = -\frac{\mu}{2\hbar^2}\left(\frac{Ze^2}{4\pi\varepsilon_0}\right)^2\frac{1}{n^2} = -\frac{Z^2\hbar^2}{2\mu a_\mu^2}\,\frac{1}{n^2}, \qquad n = 1, 2, 3, \ldots,
$$ {#eq-hydrogen-energy}

where $a_\mu = 4\pi\varepsilon_0\hbar^2/\mu e^2$. For each $n$, the allowed angular momenta are $l = 0, 1, \ldots, n-1$, and the radial function is $R_{nl} = u/r$ with $u = \rho^{l+1}e^{-\rho}v(\rho)$, $\rho = Zr/na_\mu$, and $v$ a polynomial of degree $n - l - 1$.
:::

::: proof
Substituting $u = \rho^{l+1}e^{-\rho}v$ into [[#eq-radial-dimless]] and dividing by $\rho^{l}e^{-\rho}$ gives, after a short calculation (differentiate the product twice; the terms in $l(l+1)/\rho^2$ and $1$ cancel),

$$
\rho\,v'' + 2(l + 1 - \rho)\,v' + \bigl(\rho_0 - 2(l+1)\bigr)\,v = 0.
$$

Try $v = \sum_{j\ge0}c_j\rho^j$. The coefficient of $\rho^j$ gives

$$
(j + 1)j\,c_{j+1} + 2(l+1)(j+1)\,c_{j+1} - 2j\,c_j + \bigl(\rho_0 - 2(l+1)\bigr)c_j = 0,
$$

that is

$$
c_{j+1} = \frac{2(j + l + 1) - \rho_0}{(j + 1)(j + 2l + 2)}\,c_j.
$$ {#eq-hydrogen-recursion}

For large $j$, $c_{j+1}/c_j \approx 2/j$, which is the ratio for $e^{2\rho} = \sum(2\rho)^j/j!$. If the series did not stop, $v$ would grow like $e^{2\rho}$ and $u$ like $\rho^{l+1}e^{\rho}$, which is not normalisable. So the series must terminate: for some $j = N$ (the last non-zero coefficient), the numerator vanishes,

$$
2(N + l + 1) = \rho_0, \qquad N = 0, 1, 2, \ldots
$$

Define the **principal quantum number** $n = N + l + 1$, a positive integer with $n \ge l + 1$. Then $\rho_0 = 2n$. By the definition of $\rho_0$, $\kappa = \mu Ze^2/(4\pi\varepsilon_0\hbar^2n) = Z/(na_\mu)$, and

$$
E = -\frac{\hbar^2\kappa^2}{2\mu} = -\frac{\hbar^2Z^2}{2\mu a_\mu^2n^2},
$$

which equals the first form of [[#eq-hydrogen-energy]] on substituting $a_\mu$. The polynomial $v$ has degree $N = n - l - 1$, and $l$ ranges over $0, 1, \ldots, n - 1$ for given $n$.
:::

The energies are Bohr's, now derived. They depend only on $n$, not on $l$, which is a special property of the $1/r$ potential: in any other central potential states with the same $n$ and different $l$ have different energies, as they do in the alkali atoms where the inner electrons screen the nucleus. The polynomials $v$ are associated Laguerre polynomials, $L^{2l+1}_{n-l-1}(2\rho)$.

::: corollary Degeneracy {#cor-degeneracy}
The energy level $E_n$ of hydrogen is $n^2$-fold degenerate (ignoring spin).
:::

::: proof
For each $l = 0, \ldots, n - 1$ there are $2l + 1$ values of $m$, so the number of states is $\sum_{l=0}^{n-1}(2l + 1) = 2\cdot\frac{(n-1)n}{2} + n = n^2$.
:::

The $2l+1$ part is rotational symmetry. The additional degeneracy between different $l$ is called **accidental**, but it is not an accident: the Coulomb problem has a further conserved vector, the quantum version of the Laplace–Runge–Lenz vector that keeps a classical Kepler ellipse from precessing. Wolfgang Pauli used it in 1926 to find the hydrogen spectrum by pure algebra, before Schrödinger's paper appeared. With electron spin, each level holds $2n^2$ states, which is the length of the rows of the periodic table ($2, 8, 18, 32$).

## Numbers {#numbers}

With the infinite-mass value $m_e$ in place of $\mu$, the length scale is the **Bohr radius** and the energy scale the **Rydberg energy**:

$$
a_0 = \frac{4\pi\varepsilon_0\hbar^2}{m_ee^2} = 5.29177\times10^{-11}\,\mathrm m, \qquad E_R = \frac{\hbar^2}{2m_ea_0^2} = \frac{m_e}{2\hbar^2}\left(\frac{e^2}{4\pi\varepsilon_0}\right)^2 = 13.6057\,\mathrm{eV}.
$$ {#eq-a0}

Both follow from the CODATA 2018 constants listed in [[quantum-1/origins]]; for instance $a_0 = 4\pi(8.8541878\times10^{-12})(1.0545718\times10^{-34})^2/\bigl((9.1093837\times10^{-31})(1.6021766\times10^{-19})^2\bigr) = 5.29177\times10^{-11}\,\mathrm m$. In terms of the fine-structure constant, $E_R = \frac12\alpha^2m_ec^2 = \frac12(1/137.036)^2(510{,}999\,\mathrm{eV})$, which shows that atomic binding energies are small compared with the rest energy of the electron by a factor $\alpha^2/2 \approx 2.7\times10^{-5}$. That is why non-relativistic quantum mechanics works so well for atoms.

::: example Why the atom has the size it has {#ex-size}
Estimate the size and energy of the hydrogen ground state from the uncertainty principle alone: an electron confined within a distance $r$ of the proton has momentum of order $\hbar/r$.
::: solution
Take the energy to be

$$
E(r) \approx \frac{\hbar^2}{2\mu r^2} - \frac{e^2}{4\pi\varepsilon_0r}.
$$

The first term, the kinetic energy forced by confinement, favours a large atom; the second, the Coulomb attraction, favours a small one. Setting $\dd E/\dd r = 0$ gives $-\hbar^2/\mu r^3 + e^2/(4\pi\varepsilon_0r^2) = 0$, i.e.

$$
r = \frac{4\pi\varepsilon_0\hbar^2}{\mu e^2} = a, \qquad E(a) = \frac{\hbar^2}{2\mu a^2} - \frac{\hbar^2}{\mu a^2} = -\frac{\hbar^2}{2\mu a^2}.
$$

Both are exactly right, which is luck: with $\Delta p = \hbar/2r$ or another factor the numbers would change by factors of order one. What is not luck is the structure. A classical atom collapses because nothing resists the Coulomb attraction; a quantum atom is stable because squeezing the electron costs kinetic energy that grows like $1/r^2$, faster than the $1/r$ gain in potential energy. The same competition sets the size of every atom and, with Fermi statistics, the density of ordinary matter.
:::
:::

For real hydrogen we replace $m_e$ by $\mu = m_e/(1 + m_e/m_p) = 0.999456\,m_e$. Then $E_n = -13.5983\,\mathrm{eV}/n^2$, and the measured ionisation energy of hydrogen, $13.598\,\mathrm{eV}$, agrees to all the digits that this model can be trusted for. The remaining discrepancies, a few parts in $10^5$, are the fine structure (relativity and spin–orbit coupling) and, much smaller, the Lamb shift.

::: example The spectral series {#ex-series}
Using $R_H = R_\infty\,\mu/m_e = 1.096776\times10^7\,\mathrm{m^{-1}}$, find the vacuum wavelengths of Lyman-$\alpha$ ($2\to1$), H$\alpha$ ($3\to2$) and H$\beta$ ($4\to2$), and the series limits of the Lyman and Balmer series.
::: solution
The photon wavenumber is $1/\lambda = R_H(1/n_1^2 - 1/n_2^2)$, from $hc/\lambda = E_{n_2} - E_{n_1}$ with [[#eq-hydrogen-energy]].

- Lyman-$\alpha$: $1/\lambda = \frac34R_H$, so $\lambda = 4/(3R_H) = 121.57\,\mathrm{nm}$, in the vacuum ultraviolet.
- H$\alpha$: $1/\lambda = \frac{5}{36}R_H$, $\lambda = 656.47\,\mathrm{nm}$ (red), as in [[quantum-1/origins#ex-balmer]].
- H$\beta$: $1/\lambda = \frac{3}{16}R_H$, $\lambda = 486.27\,\mathrm{nm}$ (blue-green).
- Lyman limit ($n_2 \to \infty$, $n_1 = 1$): $\lambda = 1/R_H = 91.18\,\mathrm{nm}$. Photons shorter than this ionise hydrogen from the ground state.
- Balmer limit ($n_1 = 2$): $\lambda = 4/R_H = 364.71\,\mathrm{nm}$, in the near ultraviolet.

The Lyman series lies entirely in the ultraviolet and the Balmer series straddles the visible, which is why Balmer could find his formula with a nineteenth-century spectroscope while Lyman's lines had to wait for vacuum spectrographs in 1906.
:::
:::

::: example The line that confirmed Bohr {#ex-pickering}
In 1896 Edward Pickering found, in the spectrum of the star ζ Puppis, a series of lines that nearly but not exactly interleaved with the Balmer series, and laboratory spectra of helium-hydrogen mixtures later showed a strong line at $468.6\,\mathrm{nm}$ that no hydrogen formula fitted. Show that both belong to $\mathrm{He}^+$: compute the $\mathrm{He}^+$ transitions $4\to3$ and $6\to4$, including the reduced mass (alpha-particle mass $m_\alpha = 7294.30\,m_e$), and compare $6\to4$ with H$\alpha$.
::: solution
For a nucleus of charge $Ze$ and mass $M$, [[#eq-hydrogen-energy]] gives $1/\lambda = Z^2R_M(1/n_1^2 - 1/n_2^2)$ with $R_M = R_\infty/(1 + m_e/M)$. For helium, $Z^2 = 4$ and $R_{\mathrm{He}} = 1.0973732\times10^7/(1 + 1/7294.30) = 1.0972227\times10^7\,\mathrm{m^{-1}}$.

For $4\to3$: $1/\lambda = 4R_{\mathrm{He}}(\frac19 - \frac1{16}) = 4R_{\mathrm{He}}\cdot\frac{7}{144}$, so $\lambda = 36/(7R_{\mathrm{He}}) = 468.72\,\mathrm{nm}$ in vacuum, $468.59\,\mathrm{nm}$ in air. That is the observed line.

For $6\to4$: $1/\lambda = 4R_{\mathrm{He}}(\frac1{16} - \frac1{36}) = 4R_{\mathrm{He}}\cdot\frac{5}{144} = R_{\mathrm{He}}\cdot\frac{5}{36}$. This is exactly the H$\alpha$ formula with $R_{\mathrm{He}}$ in place of $R_H$, so the wavelength is $656.20\,\mathrm{nm}$, against $656.47\,\mathrm{nm}$ for hydrogen. Every $\mathrm{He}^+$ line with even $n_1$ and $n_2$ nearly coincides with a hydrogen line, and the odd ones fall between them, which is Pickering's interleaving. The small offset, $0.27\,\mathrm{nm}$, is entirely the reduced-mass effect. In 1913 Alfred Fowler objected that Bohr's theory did not fit these lines to the accuracy measured; Bohr replied that with the reduced mass it did, and the agreement to five significant figures did much to convince physicists that the model contained something true.
:::
:::

::: widget plot
f: -2/x + l*(l + 1)/x^2; -1; -0.25; -0.1111; -0.0625
x: 0.2, 30
y: -1.6, 0.6
labels: effective potential; n = 1; n = 2; n = 3; n = 4
sliders: l=0:0:4:1
caption: The effective potential $V_{\mathrm{eff}}$ in Rydberg units ($E_R$ for energy, $a_0$ for $r$): $-2/r + l(l+1)/r^2$, with the levels $-1/n^2$ drawn as lines. At $l = 0$ the Coulomb well goes down to $-\infty$. Raise $l$: the centrifugal barrier pushes the minimum out to $r = l(l+1)$ and up to $-1/l(l+1)$, so the $n = l$ level can no longer fit. That is why $l \le n - 1$. For $l = 1$ the minimum $-\frac12$ lies below $n = 2$ but above $n = 1$.
:::

::: quiz
How many states of hydrogen, ignoring spin, have $E = E_3$, and which values of $l$ occur?
- [ ] 3 states, with $l = 0, 1, 2$.
- [ ] 6 states, with $l = 1, 2, 3$.
- [x] 9 states, with $l = 0, 1, 2$.
- [ ] 9 states, with $l = 0, 1, 2, 3$.
::: solution
For $n = 3$, $l = 0, 1, 2$ ($l \le n - 1$), with $1 + 3 + 5 = 9 = n^2$ states. There is no $l = 3$ state at $n = 3$: the radial polynomial would have degree $n - l - 1 = -1$.
:::
:::

## The wavefunctions {#wavefunctions}

The stationary states are $\psi_{nlm} = R_{nl}(r)Y_l^m(\theta, \varphi)$. From the recursion with $\rho = r/na$ (we write $a$ for $a_\mu$, or $a_0$ when nuclear motion is ignored), the first few normalised radial functions are

$$
\begin{aligned}
R_{10} &= 2a^{-3/2}e^{-r/a}, \\
R_{20} &= \frac{1}{\sqrt2}a^{-3/2}\left(1 - \frac{r}{2a}\right)e^{-r/2a}, \qquad R_{21} = \frac{1}{\sqrt{24}}a^{-3/2}\,\frac ra\,e^{-r/2a}, \\
R_{30} &= \frac{2}{3\sqrt3}a^{-3/2}\left(1 - \frac{2r}{3a} + \frac{2r^2}{27a^2}\right)e^{-r/3a}.
\end{aligned}
$$

The ground state is

$$
\psi_{100}(\mathbf r) = \frac{1}{\sqrt{\pi a^3}}\,e^{-r/a}.
$$ {#eq-ground-state}

It is spherically symmetric, has $l = 0$ and hence zero angular momentum, and is largest at the nucleus. Each $R_{nl}$ has $n - l - 1$ radial nodes, and $Y_l^m$ contributes $l$ angular nodes, so $\psi_{nlm}$ has $n - 1$ nodal surfaces in all, generalising the node counting of one-dimensional wells. In chemists' notation, $l = 0, 1, 2, 3$ are $s, p, d, f$, so $\psi_{100}$ is the $1s$ orbital, $\psi_{200}$ the $2s$ and $\psi_{21m}$ the $2p$ orbitals.

The probability of finding the electron between $r$ and $r + \dd r$, in any direction, is the **radial probability density**

$$
P(r)\,\dd r = \abs{R_{nl}(r)}^2r^2\,\dd r = \abs{u(r)}^2\,\dd r,
$$

the angular integral of $\abs{Y_l^m}^2$ being $1$. The factor $r^2$ is the area $4\pi r^2$ of a shell, which is why $P(r)$ vanishes at the origin even when $\abs\psi^2$ is largest there.

::: example Where is the electron in the ground state? {#ex-ground}
For $\psi_{100}$, find the most probable distance from the nucleus, the mean distance $\langle r\rangle$, the probability that the electron is within $a$ of the nucleus, and $\langle V\rangle$ and $\langle T\rangle$.
::: solution
$P(r) = 4a^{-3}r^2e^{-2r/a}$. Its derivative vanishes where $2r - 2r^2/a = 0$, so the most probable distance is $r = a$, Bohr's radius. The mean is

$$
\langle r\rangle = \frac{4}{a^3}\int_0^\infty r^3e^{-2r/a}\,\dd r = \frac{4}{a^3}\cdot\frac{3!}{(2/a)^4} = \frac32a,
$$

using $\int_0^\infty r^ke^{-\beta r}\,\dd r = k!/\beta^{k+1}$. The mean is larger than the most probable value because $P(r)$ has a long tail. The probability within $a$, with $x = 2r/a$:

$$
\int_0^a\frac{4r^2}{a^3}e^{-2r/a}\,\dd r = \frac12\int_0^2x^2e^{-x}\,\dd x = \frac12\Bigl[-e^{-x}(x^2 + 2x + 2)\Bigr]_0^2 = 1 - 5e^{-2} = 0.323.
$$

So two-thirds of the time the electron is farther than one Bohr radius from the proton. For the energies, $\langle 1/r\rangle = (4/a^3)\int_0^\infty re^{-2r/a}\,\dd r = (4/a^3)(a^2/4) = 1/a$, so $\langle V\rangle = -e^2/(4\pi\varepsilon_0a) = -2E_R = -27.2\,\mathrm{eV}$. Then $\langle T\rangle = E_1 - \langle V\rangle = -13.6 + 27.2 = +13.6\,\mathrm{eV}$. That is the virial theorem for a $1/r$ potential, $2\langle T\rangle = -\langle V\rangle$, proved in the exercises of [[quantum-1/formalism]].
:::
:::

::: example Building R₂₀ from the recursion {#ex-r20}
Use the recursion [[#eq-hydrogen-recursion]] to construct $R_{20}$, and normalise it.
::: solution
For $n = 2$, $l = 0$ we have $\rho_0 = 2n = 4$ and $\rho = r/2a$. Starting from $c_0$, the recursion gives

$$
c_1 = \frac{2(0 + 0 + 1) - 4}{(1)(2)}\,c_0 = -c_0, \qquad c_2 = \frac{2(1 + 0 + 1) - 4}{(2)(3)}\,c_1 = 0,
$$

so the series stops after one step and $v(\rho) = c_0(1 - \rho)$. Then $u = \rho\,e^{-\rho}(1 - \rho)$ and

$$
R_{20} = \frac ur \propto \left(1 - \frac{r}{2a}\right)e^{-r/2a}.
$$

For the normalisation, write $R_{20} = A(1 - r/2a)e^{-r/2a}$ and require $\int_0^\infty R_{20}^2r^2\,\dd r = 1$. With $x = r/a$,

$$
A^2a^3\int_0^\infty\left(1 - x + \frac{x^2}{4}\right)x^2e^{-x}\,\dd x = A^2a^3\left(2 - 6 + \frac{24}{4}\right) = 2A^2a^3,
$$

so $A = 1/\sqrt{2a^3}$, the coefficient listed above. The radial node, where $1 - r/2a = 0$, is at $r = 2a$, and $n - l - 1 = 1$ as promised. In the same way $n = 2$, $l = 1$ gives $c_1 = (2(0 + 2) - 4)c_0/(\ldots) = 0$ at once, so $v$ is constant and $R_{21} \propto re^{-r/2a}$, with no radial node.
:::
:::

::: widget plot
f: 4*x^2*exp(-2*x); x^2*(2 - x)^2*exp(-x)/8; x^4*exp(-x)/24; (4/27)*x^2*(1 - 2*x/3 + 2*x^2/27)^2*exp(-2*x/3)
x: 0, 25
y: 0, 0.6
labels: 1s; 2s; 2p; 3s
caption: Radial probability densities $P(r) = r^2\abs{R_{nl}}^2$ with $r$ in units of $a_0$. The $1s$ curve peaks at $r = a_0$. The $2p$ curve has no node and peaks at $4a_0 = n^2a_0$, the Bohr radius for $n = 2$; the $2s$ curve has one radial node at $2a_0$, and the $3s$ two. Notice that $2s$ has a small inner hump close to the nucleus: an $s$ electron penetrates the inner region more than a $p$ electron of the same $n$, which is why $2s$ lies below $2p$ in atoms with more than one electron.
:::

### Real orbitals and their shapes

Chemistry prefers real wavefunctions. Since $\psi_{nl,m}$ and $\psi_{nl,-m}$ have the same energy, any combination of them is also a stationary state, and the combinations of $e^{\pm i\varphi}$ that give $\cos\varphi$ and $\sin\varphi$ are real. For $l = 1$ the three real orbitals are proportional to $x$, $y$ and $z$ times a radial function, the $p_x$, $p_y$ and $p_z$ orbitals, each with a nodal plane through the nucleus. For $l = 2$ the five real combinations are proportional to $xy$, $yz$, $zx$, $x^2 - y^2$ and $3z^2 - r^2$, the $d$ orbitals, each with two nodal surfaces. The real orbitals are eigenfunctions of $\hat H$ and $\hat L^2$ but not of $\hat L_z$: you can have definite $m$ or a real wavefunction, not both, except for $m = 0$. In the free atom nothing selects one basis over the other; in a molecule or a crystal the surroundings break rotational symmetry and pick out the real orbitals that point towards or between neighbouring atoms.

The node counting says why $l \le n - 1$ in another way. The state with given $n$ has $n - 1$ nodal surfaces in total. They can be spheres (radial nodes) or cones and planes through the nucleus (angular nodes, $l$ of them). The largest $l$ is the one with every node angular, $l = n - 1$, and no radial node at all.

The general results, which follow from the radial functions (or more elegantly from the Feynman–Hellmann theorem and the virial theorem), are

$$
\langle r\rangle_{nl} = \frac a2\bigl(3n^2 - l(l+1)\bigr), \qquad \left\langle\frac1r\right\rangle_{nl} = \frac{1}{n^2a}.
$$

The size of the atom grows like $n^2$, as in Bohr's model, and $\langle 1/r\rangle$ gives $\langle V\rangle = 2E_n$ for every state. For $n = l + 1$ (the "circular" states with the maximum $l$), $P(r) \propto r^{2n}e^{-2r/na}$ peaks exactly at the Bohr radius $n^2a$, and for large $n$ the distribution is narrow: those are the states that most resemble Bohr's orbits. Highly excited **Rydberg atoms** with $n \sim 100$ have been made in the laboratory, with diameters near a micrometre.

::: remark The continuum
The bound states are only part of the spectrum. For $E > 0$ the radial equation has solutions for every energy, which behave at large $r$ like incoming and outgoing spherical waves, distorted by a logarithmic phase that reflects the long range of the Coulomb force. These **continuum states** describe an electron scattering off a proton, and they are needed for completeness: an arbitrary wavefunction of the relative coordinate is a combination of bound states and continuum states. Photoionisation, in which a photon with energy above $13.6\,\mathrm{eV}$ lifts the electron from $\psi_{100}$ into the continuum, is the process that makes the Lyman limit a sharp edge in the absorption spectra of hydrogen clouds.
:::

::: warning Bohr's orbit is not the ground state
A common mistake is to read $\psi_{100}$ as "the electron circling at radius $a_0$". In the true ground state, $l = 0$: the angular momentum is zero, not $\hbar$, and the distribution is spherically symmetric, not a ring. The electron has a spread of distances, with $\langle r\rangle = 1.5\,a_0$ and a $32\%$ chance of being inside $a_0$, and in a $1s$ state it even has a non-zero probability density at the nucleus, which is measured by the hyperfine interaction with the proton's magnetic moment. The Bohr model agrees with quantum mechanics on the energies and on the radius $a_0$ as a scale. It does not agree on what the atom looks like.
:::

::: example Hydrogen-like ions and exotic atoms {#ex-exotic}
(a) Find the ground-state energy and radius of $\mathrm{He}^+$ ($Z = 2$, ignoring the reduced-mass correction). (b) In **muonic hydrogen** a negative muon, of mass $m_\mu = 206.768\,m_e$, replaces the electron. Find its reduced mass, ground-state energy and Bohr radius.
::: solution
(a) By [[#eq-hydrogen-energy]] the energy scales as $Z^2$ and, from $\kappa = Z/na$, the length scale as $1/Z$. So $E_1(\mathrm{He}^+) = -4\times13.6057 = -54.42\,\mathrm{eV}$ and the radius scale is $a_0/2 = 26.5\,\mathrm{pm}$. The measured second ionisation energy of helium is $54.42\,\mathrm{eV}$.

(b) $\mu = m_\mu m_p/(m_\mu + m_p)$ with $m_p = 1836.15\,m_e$: $\mu = (206.768)(1836.15)/(2042.92)\,m_e = 185.84\,m_e$. Every formula scales with $\mu$: $E_1 = -185.84\times13.6057\,\mathrm{eV} = -2.528\,\mathrm{keV}$, and the Bohr radius is $a_0/185.84 = 2.85\times10^{-13}\,\mathrm m = 285\,\mathrm{fm}$, only about $300$ times the radius of the proton itself. The muon's wavefunction overlaps the proton far more than the electron's does, so the energy levels are sensitive to the proton's finite size. In 2010 Randolf Pohl and collaborators measured the Lamb shift of muonic hydrogen and found a proton charge radius of $0.84\,\mathrm{fm}$, four per cent smaller than the value from ordinary hydrogen, the start of the "proton radius puzzle"; later electron measurements have largely moved toward the muonic value.
:::
:::

::: application Hydrogen in astronomy
Most of the ordinary matter in the universe is hydrogen, and its spectrum is how astronomers find it. Ionised gas around hot stars glows in H$\alpha$ at $656\,\mathrm{nm}$, which gives emission nebulae their red colour; Balmer absorption lines are the main feature of A-type stellar spectra; Lyman-$\alpha$ absorption by intervening gas imprints a "forest" of lines on the spectra of distant quasars. Neutral hydrogen in its ground state is mapped through the $21\,\mathrm{cm}$ line at $1420.4\,\mathrm{MHz}$, produced by the flip of the electron spin relative to the proton spin. That photon energy, $5.9\,\mu\mathrm{eV}$, is the hyperfine splitting of $\psi_{100}$ and is proportional to $\abs{\psi_{100}(0)}^2 = 1/\pi a^3$, the density at the nucleus.
:::

::: history Solving hydrogen
Johann Balmer fitted the visible lines in 1885, and Johannes Rydberg found the general formula in 1888 and published it in 1890. Bohr's model followed in 1913 and Sommerfeld's relativistic refinement in 1916. In a paper received by *Zeitschrift für Physik* on 17 January 1926, Wolfgang Pauli derived the Balmer formula from Heisenberg's matrix mechanics, using the conserved Runge–Lenz vector. Erwin Schrödinger's first paper on wave mechanics, received by *Annalen der Physik* ten days later, on 27 January 1926, solved the radial equation by the method used here and obtained the same levels, with the spherical harmonics and Laguerre polynomials as eigenfunctions. Harold Urey, Ferdinand Brickwedde and George Murphy discovered deuterium in 1932 by its isotope-shifted Balmer lines. In 1947 Willis Lamb and Robert Retherford found that $2s_{1/2}$ and $2p_{1/2}$, degenerate even in Dirac's relativistic theory, are split by about $1\,\mathrm{GHz}$, one of the measurements that led to quantum electrodynamics.
:::

## Where this leads {#leads}

Electron spin, [[quantum-1/spin]], doubles each level. Relativistic corrections, spin–orbit coupling and the Lamb shift split the $n^2$ degeneracy into fine and hyperfine structure, treated by perturbation theory in [[quantum-2/stationary-perturbation]] and [[quantum-2/atomic-structure]]. Atoms with more than one electron cannot be solved exactly; the hydrogen orbitals, with screening, are the starting point for the periodic table. The Chemistry Atlas develops the chemist's view of the same solution in [the hydrogen atom](/learn/chemistry/lesson.php?c=quantum-chemistry&l=hydrogen-atom) and [many-electron atoms](/learn/chemistry/lesson.php?c=quantum-chemistry&l=many-electron-atoms).

::: summary
- In a central potential $\psi = R(r)Y_l^m(\theta, \varphi)$, and $u = rR$ obeys a one-dimensional equation with $V_{\mathrm{eff}} = V + \hbar^2l(l+1)/2\mu r^2$ and $u(0) = 0$.
- For the Coulomb potential the substitution $u = \rho^{l+1}e^{-\rho}v$ gives a series that must terminate, which quantises $E_n = -Z^2E_R(\mu/m_e)/n^2$ with $n = 1, 2, \ldots$ and $l \le n - 1$.
- $a_0 = 4\pi\varepsilon_0\hbar^2/m_ee^2 = 52.9177\,\mathrm{pm}$ and $E_R = \frac12\alpha^2m_ec^2 = 13.6057\,\mathrm{eV}$; with the reduced mass the ground state of hydrogen is at $-13.598\,\mathrm{eV}$.
- The level $E_n$ is $n^2$-fold degenerate without spin; the degeneracy in $l$ is special to $1/r$.
- $\psi_{100} = e^{-r/a}/\sqrt{\pi a^3}$ has $l = 0$, most probable radius $a$, $\langle r\rangle = \frac32a$ and $\langle V\rangle = 2E_1$.
- $\psi_{nlm}$ has $n - l - 1$ radial and $l$ angular nodes; $\langle r\rangle$ grows like $n^2$.
- Spectral lines follow $1/\lambda = R_H(1/n_1^2 - 1/n_2^2)$ with $R_H = 1.096776\times10^7\,\mathrm{m^{-1}}$.
:::

## Exercises {#exercises}

::: exercise Ionising from n = 2 {level=1 check="3.40"}
How much energy, in eV, is needed to ionise a hydrogen atom from a state with $n = 2$? Use the reduced-mass value $E_1 = -13.598\,\mathrm{eV}$.
::: solution
$E_2 = -13.598/4 = -3.3996\,\mathrm{eV}$, so $3.40\,\mathrm{eV}$ is needed. A photon of wavelength below $1239.84/3.40 = 365\,\mathrm{nm}$ can do it, which is the Balmer limit.
:::
:::

::: exercise Counting states {level=1 check="16"}
How many orbital states (ignoring spin) belong to $n = 4$? List the $l$ values and the number of states for each.
::: solution
$l = 0, 1, 2, 3$ with $1, 3, 5, 7$ states: $16 = 4^2$ in all, $32$ with spin.
:::
:::

::: exercise The Balmer limit {level=1 check="364.7"}
Find the short-wavelength limit of the Balmer series in nanometres, using $R_H = 1.096776\times10^7\,\mathrm{m^{-1}}$.
::: solution
$1/\lambda = R_H/4$, so $\lambda = 4/R_H = 3.6471\times10^{-7}\,\mathrm m = 364.7\,\mathrm{nm}$.
:::
:::

::: exercise Inside one Bohr radius {level=2 check="1 - 5*exp(-2)"}
Show that the probability of finding the ground-state electron within $r < a$ is $1 - 5e^{-2}$.
::: solution
This is computed in [[#ex-ground]]: $\int_0^a4a^{-3}r^2e^{-2r/a}\,\dd r = \frac12\int_0^2x^2e^{-x}\,\dd x = 1 - 5e^{-2} = 0.323$.
:::
:::

::: exercise Mean radius of 2p {level=2 check="5"}
Using $R_{21} = (24)^{-1/2}a^{-3/2}(r/a)e^{-r/2a}$, compute $\langle r\rangle$ in units of $a$, and the most probable radius.
::: solution
$P(r) = r^2R_{21}^2 = \frac{1}{24a^5}r^4e^{-r/a}$. Then

$$
\langle r\rangle = \frac{1}{24a^5}\int_0^\infty r^5e^{-r/a}\,\dd r = \frac{5!\,a^6}{24a^5} = 5a,
$$

in agreement with $\frac a2(3n^2 - l(l+1)) = \frac a2(12 - 2) = 5a$. The maximum of $r^4e^{-r/a}$ is at $4r^3 = r^4/a$, i.e. $r = 4a$, the Bohr radius $n^2a$ for $n = 2$.
:::
:::

::: exercise Muonic hydrogen {level=2 check="2.528"}
Find the ground-state binding energy of muonic hydrogen in keV, using $m_\mu = 206.768\,m_e$, $m_p = 1836.153\,m_e$ and $E_R = 13.6057\,\mathrm{eV}$.
::: solution
$\mu/m_e = (206.768)(1836.153)/(206.768 + 1836.153) = 185.841$. The binding energy is $185.841\times13.6057\,\mathrm{eV} = 2528.5\,\mathrm{eV} = 2.528\,\mathrm{keV}$. The Lyman-$\alpha$ photon of muonic hydrogen, $\frac34$ of this, is a $1.90\,\mathrm{keV}$ X-ray.
:::
:::

::: exercise The deuterium shift {level=3 check="0.179"}
Deuterium has a nucleus of mass $m_d = 3670.48\,m_e$. Find the difference, in nanometres, between the vacuum wavelengths of H$\alpha$ in hydrogen and in deuterium, using $R_\infty = 1.0973732\times10^7\,\mathrm{m^{-1}}$ and $m_p = 1836.153\,m_e$.
::: hint
$\lambda \propto 1/R_M$ with $R_M = R_\infty/(1 + m_e/M)$, so $\lambda_{\mathrm H} - \lambda_{\mathrm D} = \lambda_\infty(m_e/m_p - m_e/m_d)$.
:::
::: solution
$\lambda_M = \frac{36}{5R_\infty}(1 + m_e/M)$. With $36/(5R_\infty) = 656.112\,\mathrm{nm}$,

$$
\lambda_{\mathrm H} - \lambda_{\mathrm D} = 656.112\left(\frac{1}{1836.153} - \frac{1}{3670.48}\right)\mathrm{nm} = 656.112\times(5.4462 - 2.7244)\times10^{-4}\,\mathrm{nm} = 0.179\,\mathrm{nm}.
$$

So $\lambda_{\mathrm H} = 656.470\,\mathrm{nm}$ and $\lambda_{\mathrm D} = 656.291\,\mathrm{nm}$. Urey's group detected the faint deuterium line on the short-wavelength side of H$\alpha$ in 1932, at almost exactly this separation.
:::
:::

::: exercise Checking the ground state {level=3}
Verify directly that $\psi_{100} = (\pi a^3)^{-1/2}e^{-r/a}$ satisfies the Schrödinger equation with $V = -e^2/4\pi\varepsilon_0r$ and energy $E_1 = -\hbar^2/2\mu a^2$, where $a = 4\pi\varepsilon_0\hbar^2/\mu e^2$. Show also that $\psi_{200}$ is orthogonal to it.
::: solution
For a function of $r$ alone, $\nabla^2\psi = \frac1r\deriv{^2}{r^2}(r\psi)$. With $r\psi \propto re^{-r/a}$: $(re^{-r/a})'' = \bigl(-\frac2a + \frac{r}{a^2}\bigr)e^{-r/a}$, so

$$
\nabla^2\psi = \left(\frac{1}{a^2} - \frac{2}{ar}\right)\psi.
$$

Then

$$
-\frac{\hbar^2}{2\mu}\nabla^2\psi - \frac{e^2}{4\pi\varepsilon_0r}\psi = \left(-\frac{\hbar^2}{2\mu a^2} + \frac{\hbar^2}{\mu ar} - \frac{e^2}{4\pi\varepsilon_0r}\right)\psi.
$$

By the definition of $a$, $\hbar^2/\mu a = e^2/4\pi\varepsilon_0$, so the two $1/r$ terms cancel and the equation holds with $E = -\hbar^2/2\mu a^2$. That cancellation is what fixes $a$: any other decay length leaves an uncancelled $1/r$ term.

For orthogonality, both functions are spherically symmetric, so

$$
\langle\psi_{100}|\psi_{200}\rangle = 4\pi\int_0^\infty\frac{1}{\sqrt{\pi a^3}}e^{-r/a}\cdot\frac{1}{\sqrt{32\pi a^3}}\left(2 - \frac ra\right)e^{-r/2a}r^2\,\dd r \propto \int_0^\infty\left(2 - x\right)x^2e^{-3x/2}\,\dd x,
$$

using $\psi_{200} = R_{20}Y_0^0 = (32\pi a^3)^{-1/2}(2 - r/a)e^{-r/2a}$ and $x = r/a$. With $\int_0^\infty x^ke^{-3x/2}\,\dd x = k!(2/3)^{k+1}$ the integral is $2\cdot2(2/3)^3 - 6(2/3)^4 = \frac{32}{27} - \frac{32}{27} = 0$, as it must be for eigenfunctions of a Hermitian operator with different eigenvalues.
:::
:::
