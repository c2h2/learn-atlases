One atom can be solved exactly, and it happens to be the simplest atom there is: hydrogen itself, one proton and one electron bound by the Coulomb attraction $V(r) = -e^{2}/4\pi\varepsilon_{0}r$. Everything else in chemistry — every orbital diagram, every selection rule, every statement about shielding — is an approximation built on top of this one solution, which is why this lesson is the centre of gravity of the whole course. The hydrogen atom is also the place where quantum mechanics first collected its debts to spectroscopy: Balmer's empirical formula of 1885, Rydberg's wavenumber arithmetic, and Bohr's half-classical model all pointed at a spectrum that Schrödinger's equation, solved in 1926, reproduced line for line — together with a whole set of quantum numbers nobody had asked for and everybody now needs.

We solve the problem in the order the mathematics forces: because the potential depends only on the distance $r$ from the nucleus, the Schrödinger equation separates in spherical coordinates into an angular part — the same for every central potential, and the source of orbital shape — and a radial part that carries the Coulomb potential and the energy levels. The angular solution hands us the quantum numbers $l$ and $m$ and the spherical harmonics, the functions whose squares draw the familiar $s$, $p$ and $d$ lobes; the radial solution hands us $n$, the energies $E_{n} = -13.6\ \mathrm{eV}/n^{2}$, and the radial distribution functions that tell you where the electron actually is. Then we collect the experimental pay-off: the hydrogen spectrum, its series limits, the reduced-mass isotope shift that revealed deuterium, and the tiny fine-structure and Lamb-shift corrections that signalled the arrival of quantum electrodynamics.

Throughout, keep three cautions in mind, because they are where students most often go wrong. An orbital is a one-electron wavefunction, not a path. The radial wavefunction $R(r)$ and the radial distribution $r^{2}R^{2}$ are different functions with different maxima. And the degeneracy of hydrogen in $l$ is an accident of the $1/r$ potential — in every many-electron atom it is lifted, and that lifting is the structural basis of the periodic table ([[general-chemistry-1/periodicity]]).

## The Coulomb problem separates

The system is two particles, a nucleus of mass $m_\mathrm{N}$ and charge $+Ze$, and an electron of mass $m_\mathrm{e}$ and charge $-e$. As for the rigid rotor ([[quantum-chemistry/vibration-rotation]]), the centre-of-mass motion separates from the relative motion, and the Schrödinger equation for the relative coordinate $\mathbf{r}$ is

$$
-\frac{\hbar^{2}}{2\mu}\nabla^{2}\psi(\mathbf{r}) - \frac{Ze^{2}}{4\pi\varepsilon_{0} r}\,\psi(\mathbf{r}) = E\,\psi(\mathbf{r}),
\qquad
\frac{1}{\mu} = \frac{1}{m_\mathrm{e}} + \frac{1}{m_\mathrm{N}},
$$ {#eq-hatom}

where $\mu$ is the reduced mass — $\mu = 0.999\,455\,m_\mathrm{e}$ for hydrogen, a correction we keep for the isotope-shift section below and otherwise drop.

::: definition Central potential {#def-central}
A potential is **central** if it depends only on the distance $r$ from a fixed point: $V = V(r)$. The Coulomb attraction between a nucleus and an electron is the prototype. For a central potential the Hamiltonian is invariant under every rotation of the coordinates about the centre, and this symmetry — not any property of the electron — is what makes the hydrogen atom soluble.
:::

::: proposition A central Hamiltonian commutes with the angular-momentum operators {#prop-commute}
If $V = V(r)$, then $[\hat{H}, \hat{L}^{2}] = 0$ and $[\hat{H}, \hat{L}_{z}] = 0$. The energy eigenfunctions can therefore be chosen to be simultaneous eigenfunctions of $\hat{H}$, $\hat{L}^{2}$ and $\hat{L}_{z}$, and the wavefunction separates as $\psi(r,\theta,\phi) = R(r)\,Y(\theta,\phi)$.
:::

::: proof
The angular-momentum operators involve only the angles $\theta,\phi$ (for instance $\hat{L}_{z} = -i\hbar\,\partial/\partial\phi$), so they commute with the multiplication by any function of $r$ alone, in particular with $V(r)$. They also commute with the radial part of $\nabla^{2}$, because $\nabla^{2} = r^{-2}\,\partial_{r}(r^{2}\partial_{r}) - \hat{L}^{2}/\hbar^{2}r^{2}$: the first term contains only $r$-derivatives and the second is built from $\hat{L}^{2}$ itself. Hence $\hat{H} = -\hbar^{2}\partial_{r}(r^{2}\partial_{r})/2\mu r^{2} + \hat{L}^{2}/2\mu r^{2} + V(r)$ commutes with both $\hat{L}^{2}$ and $\hat{L}_{z}$, and commuting Hermitian operators possess a common eigenbasis ([[quantum-chemistry/quantum-foundations]]). Writing $\psi = RY$ with $Y$ an eigenfunction of $\hat{L}^{2}$ converts the equation into an ordinary differential equation for $R(r)$:
$$
-\frac{\hbar^{2}}{2\mu r^{2}}\frac{\mathrm{d}}{\mathrm{d}r}\!\left(r^{2}\frac{\mathrm{d}R}{\mathrm{d}r}\right) + \left[-\frac{Ze^{2}}{4\pi\varepsilon_{0}r} + \frac{l(l+1)\hbar^{2}}{2\mu r^{2}}\right]R = ER .
$$ {#eq-radial}
:::

The angular functions are the **spherical harmonics** $Y_{l}^{m}(\theta,\phi)$, the same for every central potential — they are the "shape" half of every atomic and (locally) molecular orbital. The radial equation carries the physics of the specific $V(r)$, and its solutions exist only for a discrete set of energies.

## Angular momentum and the shapes of orbitals

::: definition The quantum numbers l and m {#def-lm}
The angular equation has normalisable solutions only when $l = 0, 1, 2, \dots$ and $m = -l, -l+1, \dots, +l$. The corresponding eigenvalues are
$$
\hat{L}^{2}Y_{l}^{m} = l(l+1)\,\hbar^{2}\,Y_{l}^{m},
\qquad
\hat{L}_{z}Y_{l}^{m} = m\hbar\,Y_{l}^{m}.
$$
The magnitude of the orbital angular momentum is $\sqrt{l(l+1)}\,\hbar$ — never $l\hbar$ — and its $z$-component is quantised in units of $\hbar$. The spectroscopic notation is $l=0,1,2,3 \leftrightarrow s,p,d,f$.
:::

The first spherical harmonics, with the Condon–Shortley phase dropped, are

| $l$ | $m$ | $Y_{l}^{m}(\theta,\phi)$ | real combination and shape |
|---|---|---|---|
| 0 | 0 | $\dfrac{1}{\sqrt{4\pi}}$ | $s$: sphere |
| 1 | 0 | $\sqrt{\dfrac{3}{4\pi}}\cos\theta$ | $p_{z} \propto z/r$: two lobes along $z$ |
| 1 | $\pm1$ | $\mp\sqrt{\dfrac{3}{8\pi}}\sin\theta\, e^{\pm i\phi}$ | $p_{x} \propto x/r$, $p_{y} \propto y/r$ |
| 2 | 0 | $\sqrt{\dfrac{5}{16\pi}}\,(3\cos^{2}\theta - 1)$ | $d_{z^{2}} \propto (3z^{2}-r^{2})/r^{2}$: two lobes $z$ + equatorial torus |
| 2 | $\pm1$ | $\mp\sqrt{\dfrac{15}{8\pi}}\,\sin\theta\cos\theta\, e^{\pm i\phi}$ | $d_{xz} \propto xz/r^{2}$, $d_{yz}$: four lobes in planes |
| 2 | $\pm2$ | $\sqrt{\dfrac{15}{32\pi}}\,\sin^{2}\theta\, e^{\pm 2i\phi}$ | $d_{x^{2}-y^{2}}$, $d_{xy}$: four lobes at $45°$ |

The complex $Y_{l}^{m}$ with $m \ne 0$ are eigenfunctions of $\hat{L}_{z}$; chemists almost always use real linear combinations of the $\pm m$ pairs, which are still eigenfunctions of $\hat{L}^{2}$ but not of $\hat{L}_{z}$ — the trade-off is that $\hat{L}_{z}$ and $\hat{L}_{x}$ cannot be sharp at once (their commutator is $i\hbar\hat{L}_{y}$). Each real function in the table changes sign across its nodal surfaces: the $p$ and $d$ orbitals have **angular nodes** — planes or cones through the nucleus where the function vanishes — and the number of angular nodes is exactly $l$.

::: example Space quantification: the angles of L {#ex-space-quant}
For $l = 1$, find the angle between the angular-momentum vector and the $z$-axis for each value of $m$.
::: solution
The magnitude is $|\mathbf{L}| = \sqrt{l(l+1)}\,\hbar = \sqrt{2}\,\hbar$ and the projection is $L_{z} = m\hbar$, so $\cos\theta = L_{z}/|\mathbf{L}| = m/\sqrt{2}$:
$$
m = +1:\ \cos\theta = \tfrac{1}{\sqrt{2}},\ \theta = 45.0°;
\qquad
m = 0:\ \theta = 90.0°;
\qquad
m = -1:\ \theta = 135.0° .
$$
The vector is never parallel to the axis: $\theta = 0$ would require $L_{z} = |\mathbf{L}|$, i.e. $m^{2} = l(l+1)$, impossible for integer $m \le l$. One component of $\mathbf{L}$ can be sharp, but never the whole vector — the transverse components stay blurred, exactly as the uncertainty principle demands.
:::
:::

::: warning An orbital is not an orbit {#warn-orbit}
The word "orbital" is a coinage by Mulliken (1932) precisely to avoid the Bohr orbit it replaced. A hydrogen $1s$ electron has no trajectory, no angular momentum ($l=0$ means $|\mathbf{L}| = 0$, not a planet at rest), and no definite radius: $|\psi|^{2}$ is a probability density spread over a cloud of radius $\sim a_{0}$. Bohr's circular orbits reappear only in the $n \to \infty$ limit (the correspondence principle) and in special wave-packet states that disperse in a few femtoseconds. When you draw a boundary surface enclosing $90\,\%$ of $|\psi|^{2}$, you are drawing a statistical envelope, not a container.
:::

## The radial equation and the energy levels

The radial equation [[#eq-radial]] has the form of a one-dimensional problem in $r$ with the **effective potential**

$$
V_\text{eff}(r) = -\frac{Ze^{2}}{4\pi\varepsilon_{0} r} + \frac{l(l+1)\hbar^{2}}{2\mu r^{2}} ,
$$

the Coulomb well plus the centrifugal barrier. The barrier keeps $l > 0$ electrons out of the nucleus (it diverges as $r \to 0$), while $s$ electrons feel no barrier and have a non-zero probability density *at* the nucleus — a fact with measurable consequences (the Fermi contact interaction in NMR, and the Lamb shift below).

::: widget plot
f: -1/x + l*(l+1)/(x*x); -1/x
x: 0.2, 20
y: -1.2, 0.6
sliders: l=0:0:2:1
labels: \text{effective potential } V_\text{eff}; \text{Coulomb potential } V
caption: The effective potential $V_\text{eff}(x) = -1/x + l(l+1)/x^{2}$ in Hartree atomic units ($x = r/a_{0}$) for $l$ set by the slider, against the bare Coulomb potential $-1/x$. The centrifugal term dominates at small $x$ and pushes the $l=2$ curve positive near the nucleus — a $d$ electron is excluded from the core — while the $l=0$ curve falls without bound: the $s$ electron can reach the nucleus. The minima sit at $x = 2l(l+1)$ with depth $-1/4l(l+1)$ Hartree, the circular correspondence-limit orbits.
:::

::: proposition The hydrogen energy levels {#prop-h-energies}
The radial equation for $V = -Ze^{2}/4\pi\varepsilon_{0}r$ has normalisable solutions only for
$$
E_{n} = -\frac{\mu}{m_\mathrm{e}}\,\frac{Z^{2}R_{\infty} hc}{n^{2}} = -\frac{Z^{2}}{n^{2}}\times 13.6\ \mathrm{eV},
\qquad n = 1, 2, 3, \dots
$$
with $l = 0, 1, \dots, n-1$ and $m = -l, \dots, +l$ free. For a given $n$ there are $\sum_{l=0}^{n-1}(2l+1) = n^{2}$ spatial states ($2n^{2}$ counting electron spin), all of equal energy: hydrogen is **accidentally degenerate** in $l$, a peculiarity of the $1/r$ potential that is lifted in every many-electron atom.
:::

::: proof The energy formula by the Bohr–de Broglie route {#proof-bohr-debroglie}
Impose de Broglie's relation $p = h/\lambda$ on a circular orbit and require the matter wave to close on itself in phase, $2\pi r = n\lambda$: the standing-wave condition quantises the angular momentum, $m_\mathrm{e}vr = n\hbar$. Balancing Coulomb attraction against the centripetal force, $m_\mathrm{e}v^{2}/r = Ze^{2}/4\pi\varepsilon_{0}r^{2}$, and eliminating $v$ gives
$$
r_{n} = \frac{4\pi\varepsilon_{0}\hbar^{2}}{m_\mathrm{e}Ze^{2}}\,n^{2} = \frac{n^{2}a_{0}}{Z},
\qquad
E_{n} = \frac{p^{2}}{2m_\mathrm{e}} + V = -\frac{m_\mathrm{e}Z^{2}e^{4}}{8\varepsilon_{0}^{2}h^{2}}\,\frac{1}{n^{2}} = -\frac{Z^{2}\times 13.6\ \mathrm{eV}}{n^{2}} .
$$
Numerically, $a_{0} = 52.92\ \mathrm{pm}$ and the coefficient is $13.60\ \mathrm{eV} = 2.179\times10^{-18}\ \mathrm{J}$. This is Bohr's 1913 result, and the full wave-mechanical solution of [[#eq-radial]] reproduces exactly this $E_{n}$ — the standing-wave argument is not a derivation of quantum mechanics, but it locates the same spectrum because the radial equation's polynomial-truncation condition ($n - l - 1$ radial nodes, $n$ a positive integer) encodes the same single quantisation. What the wave theory adds is $l$, $m$, the wavefunctions, and the selection rules; what it subtracts is the orbit.
:::

The quantum numbers and their ranges are worth a table of their own:

| quantum number | values | fixes |
|---|---|---|
| $n$ (principal) | $1, 2, 3, \dots$ | energy $E_n$, size $\langle r\rangle \propto n^{2}$ |
| $l$ (orbital) | $0, \dots, n-1$ | $|\mathbf{L}| = \sqrt{l(l+1)}\hbar$, angular nodes $= l$ |
| $m$ (magnetic) | $-l, \dots, +l$ | $L_{z} = m\hbar$, orientation |

The number of **radial nodes** — spherical surfaces, not planes, where $R = 0$ — is $n - l - 1$, so the total number of nodes is $(n-l-1) + l = n-1$: the energy labels the total nodal complexity, and $l$ decides how it is spent between radial and angular.

::: definition Radial distribution function {#def-radial-dist}
The probability of finding the electron between $r$ and $r + \mathrm{d}r$ **in any direction** is $P(r)\,\mathrm{d}r$ with
$$
P(r) = r^{2}R(r)^{2}
$$
(for $s$ orbitals, $P = 4\pi r^{2}\psi^{2}$, since $\psi$ is angle-independent there). $P$ weights the density by the volume $4\pi r^{2}\mathrm{d}r$ of the spherical shell, and it is $P$, not $R$ or $\psi$, whose maxima are the "radii" of chemistry.
:::

::: widget plot
f: 4*x^2*exp(-2*x); x^2*(2-x)^2*exp(-x)/8; x^4*exp(-x)/24; x^2*(27-18*x+2*x^2)^2*exp(-2*x/3)/4920.75
x: 0, 20
y: 0, 0.6
labels: \text{1s}; \text{2s}; \text{2p}; \text{3s}
caption: Normalised radial distribution functions $P(x)$, $x = r/a_{0}$, for the hydrogen $1s$, $2s$, $2p$ and $3s$ orbitals. The $1s$ peaks at $x = 1$; the $2p$ at $x = 4$; the $2s$ has an inner maximum at $x = 0.76$, a radial node at $x = 2$, and a dominant outer maximum at $x = 5.24$; the $3s$ has two radial nodes and its outermost maximum near $x = 13$. Note how the outer maxima march roughly as $n^{2}$ while the inner structure — the penetration that matters in many-electron atoms — stays near the core.
:::

::: example Most probable radii {#ex-most-probable}
Find the most probable radius for the $1s$, $2p$ and $2s$ electrons of hydrogen.
::: solution
Set $\mathrm{d}P/\mathrm{d}r = 0$. For $1s$: $P \propto r^{2}e^{-2r/a_{0}}$ gives $2/r - 2/a_{0} = 0$, so $r^{*} = a_{0} = 52.9\ \mathrm{pm}$ — the Bohr radius reappears as a most-probable radius, not an orbit. For $2p$: $P \propto r^{4}e^{-r/a_{0}}$ gives $4/r - 1/a_{0} = 0$, so $r^{*} = 4a_{0} = 212\ \mathrm{pm}$. For $2s$: $P \propto r^{2}(2 - r/a_{0})^{2}e^{-r/a_{0}}$; writing $x = r/a_{0}$, $\ln P = 2\ln x + 2\ln|2-x| - x$, so $\mathrm{d}\ln P/\mathrm{d}x = 2/x - 2/(2-x) - 1 = 0$, i.e. $x^{2} - 6x + 4 = 0$, $x = 3 \pm \sqrt{5}$. The maxima are at $x = 0.764$ and $x = 5.236$: the $2s$ electron's most probable radius is $(3+\sqrt{5})a_{0} = 2.77\ \text{Å}$, but it also spends appreciable probability inside the $1s$ shell — the outer maximum holds the bulk, the inner one buys penetration.
:::
:::

::: example Counting nodes {#ex-nodes}
How many radial and angular nodes do the $3p$, $4f$ and $5g$ orbitals have?
::: solution
Radial nodes $= n - l - 1$, angular nodes $= l$:
$3p$: $3 - 1 - 1 = 1$ radial, $1$ angular (a sphere and a plane);
$4f$: $4 - 3 - 1 = 0$ radial, $3$ angular;
$5g$: $5 - 4 - 1 = 0$ radial, $4$ angular.
In every case the total is $n - 1$: $3p \to 2$, $4f \to 3$, $5g \to 4$. The $g$ orbital ($l = 4$) first appears at $n = 5$ — the $5g$ level of hydrogen exists and is empty in every atom, and $g$ functions earn their keep in basis sets for heavy elements ([[quantum-chemistry/many-electron-atoms]]).
:::
:::

::: warning R versus P, and probability at the nucleus {#warn-R-vs-P}
Three functions are confused constantly. $\psi$ or $R$ is an amplitude: it has a sign, and $R_{2p}(0) = 0$ merely because $R_{2p} \propto r$ near the origin. $|\psi|^{2}$ is a density *per unit volume*: it is largest at the nucleus for every $s$ orbital ($|\psi_{1s}(0)|^{2} = 1/\pi a_{0}^{3}$). $P(r) = r^{2}R^{2}$ is a density *per unit radius* and vanishes at $r = 0$ for every $l$, because the shell volume $4\pi r^{2}\mathrm{d}r$ shrinks faster than any density grows. So "the $2p$ electron never visits the nucleus" (true for $P$) and "the $2s$ electron has density at the nucleus" (true for $|\psi|^{2}$) are both correct statements about different functions. The $ns$ penetration — the finite $|\psi(0)|^{2}$ and the inner radial maxima — is why $2s$ lies below $2p$ in lithium and every many-electron atom, and why $s$ orbitals alone feel the nuclear volume and spin (Fermi contact, isomer shifts).
:::

## Why the atom does not collapse

Classically an electron in orbit radiates continuously and loses energy; worse, nothing stops it spiralling into the nucleus, where the potential energy $-e^{2}/4\pi\varepsilon_{0}r$ falls without bound. Quantum mechanics forbids the collapse through the uncertainty principle, and the argument is a one-line estimate worth doing in full.

::: example The uncertainty-principle estimate of the ground state {#ex-collapse}
Localise the electron to a region of size $r$. The momentum is then uncertain by $p \sim \hbar/r$, and the energy is bounded above by
$$
E(r) \approx \frac{\hbar^{2}}{2m_\mathrm{e}r^{2}} - \frac{e^{2}}{4\pi\varepsilon_{0}r}.
$$
Minimise $E(r)$ and compare with the exact $1s$ energy.
::: solution
With $\hbar^{2}/2m_\mathrm{e} = 3.81\ \mathrm{eV\,Å^{2}}$ and $e^{2}/4\pi\varepsilon_{0} = 14.40\ \mathrm{eV\,Å}$ (so $E$ in eV with $r$ in Å),
$$
\frac{\mathrm{d}E}{\mathrm{d}r} = -\frac{2\times 3.81}{r^{3}} + \frac{14.40}{r^{2}} = 0
\quad\Longrightarrow\quad
r^{*} = \frac{2\times 3.81}{14.40}\ \text{Å} = 0.529\ \text{Å} = a_{0},
$$
$$
E(r^{*}) = \frac{3.81}{0.529^{2}} - \frac{14.40}{0.529} = 13.6 - 27.2 = -13.6\ \mathrm{eV}.
$$
The estimate lands on $a_{0}$ and $-13.6\ \mathrm{eV}$ exactly (the virial theorem, $\langle T\rangle = -E$, makes the coincidence of the coefficient exact for the $1/r$ form). The physics: squeezing the electron below $a_{0}$ costs kinetic energy $\propto 1/r^{2}$ faster than the Coulomb term gains $\propto 1/r$, so the atom has a lowest state at a finite radius. Matter is stable because $\hbar \ne 0$.
:::
:::

## The spectrum of hydrogen

::: proposition The Rydberg–Ritz formula {#prop-rydberg}
Every line of atomic hydrogen is described by the combination principle
$$
\tilde{\nu} = \frac{1}{\lambda} = R_\mathrm{H}\left(\frac{1}{n_{1}^{2}} - \frac{1}{n_{2}^{2}}\right),
\qquad n_{2} > n_{1} \ge 1,
\qquad R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}},
$$
and follows from the energy levels because $\tilde{\nu} = (E_{n_{2}} - E_{n_{1}})/hc$ with $R_\mathrm{H} = \mu e^{4}/8\varepsilon_{0}^{2}h^{3}c$. The series are $n_{1} = 1$ (Lyman, ultraviolet, limit $91.18\ \mathrm{nm}$), $n_{1} = 2$ (Balmer, visible, limit $364.7\ \mathrm{nm}$), $n_{1} = 3$ (Paschen, infrared, limit $820.6\ \mathrm{nm}$).
:::

| series | $n_{1}$ | first line $\tilde{\nu}/\mathrm{cm^{-1}}$ | $\lambda$ | region |
|---|---|---|---|---|
| Lyman | 1 | $82\,258$ ($\mathrm{Ly}\alpha$, $2\leftarrow1$) | $121.6\ \mathrm{nm}$ | vacuum UV |
| Balmer | 2 | $15\,233$ ($\mathrm{H}\alpha$, $3\leftarrow2$) | $656.5\ \mathrm{nm}$ | visible red |
| Paschen | 3 | $5331$ ($\mathrm{Pa}\alpha$, $4\leftarrow3$) | $1875\ \mathrm{nm}$ | IR |

::: example Computing Hα and Lyα {#ex-halpha}
Compute the wavelengths of $\mathrm{H}\alpha$ ($3 \to 2$) and $\mathrm{Ly}\alpha$ ($2 \to 1$) from $R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}}$.
::: solution
$$
\tilde{\nu}(\mathrm{H}\alpha) = 109\,678\left(\frac{1}{4} - \frac{1}{9}\right) = 109\,678 \times \frac{5}{36} = 15\,233\ \mathrm{cm^{-1}}
\quad\Rightarrow\quad
\lambda = \frac{10^{7}}{15\,233}\ \mathrm{nm} = 656.5\ \mathrm{nm};
$$
$$
\tilde{\nu}(\mathrm{Ly}\alpha) = 109\,678\left(1 - \frac{1}{4}\right) = 82\,258\ \mathrm{cm^{-1}}
\quad\Rightarrow\quad
\lambda = 121.6\ \mathrm{nm}.
$$
Note the asymmetry of the spectrum: $\mathrm{Ly}\alpha$ costs $10.2\ \mathrm{eV}$ because $n_{1} = 1$ puts the electron on the deepest rung, while $\mathrm{H}\alpha$'s $1.89\ \mathrm{eV}$ is a transition between closely spaced upper rungs, $E_{n} \propto -1/n^{2}$ compressing as $n$ grows. The ionisation energy follows from the series limit: $hcR_\mathrm{H} = 13.60\ \mathrm{eV}$.
:::
:::

The reduced mass enters because $R \propto \mu$: for an atom of nucleus mass $M$,

$$
R_{M} = \frac{R_{\infty}}{1 + m_\mathrm{e}/M},
\qquad
R_{\infty} = 109\,737\ \mathrm{cm^{-1}}\ (\mu \to m_\mathrm{e}).
$$ {#eq-reduced-mass}

::: example The isotope shift: deuterium shows itself {#ex-deuterium}
By how much does $\mathrm{H}\alpha$ shift in deuterium ($M = 2.014\,u$)? Urey, Murphy and Brickwedde measured exactly this in 1932 and found deuterium.
::: solution
With $m_\mathrm{e}/M(\mathrm{H}) = 1/1836.2$ and $m_\mathrm{e}/M(\mathrm{D}) = 1/3670.5$,
$$
R_\mathrm{H} = \frac{109\,737}{1.000\,545} = 109\,678\ \mathrm{cm^{-1}},
\qquad
R_\mathrm{D} = \frac{109\,737}{1.000\,272} = 109\,707\ \mathrm{cm^{-1}} .
$$
The $\mathrm{D}\alpha$ line sits at $\lambda = 36/(5R_\mathrm{D}) = 656.29\ \mathrm{nm}$ against $\mathrm{H}\alpha$ at $656.47\ \mathrm{nm}$: a shift of $0.18\ \mathrm{nm}$ — tiny, but a spectroscope resolves it easily, which is why Urey found the isotope in 1932 in the residue left by evaporating a litre of liquid hydrogen. The relative shift $\Delta\lambda/\lambda = \Delta\tilde{\nu}/\tilde{\nu} \approx m_\mathrm{e}(1/M_\mathrm{H} - 1/M_\mathrm{D}) \approx 2.7\times10^{-4}$ is a direct measurement of the nuclear mass by light.
:::
:::

Hydrogen-like ions scale as $Z^{2}$: $\mathrm{He}^{+}$ has $E_{n} = -54.4\ \mathrm{eV}/n^{2}$ and an ionisation energy of $54.4\ \mathrm{eV}$; its **Pickering series**, $n \to 4$, has wavenumbers $4R_\mathrm{He}(1/16 - 1/n^{2})$, and for even $n$ coincides line-for-line with the Balmer series of hydrogen — the historical puzzle that Bohr's $Z^{2}$ scaling resolved in 1913 when the "Pickering lines" (e.g. $454.3\ \mathrm{nm}$, $n = 9 \to 4$) turned out to belong to ionised helium in stellar atmospheres, not to hydrogen.

Two final refinements close the list of hydrogen's spectra. **Fine structure** — spin–orbit coupling and the relativistic mass correction — splits $E_{n}$ by $\sim \alpha^{2}R_\infty hc/n^{3}$ ($\mathrm{2p}_{3/2} - \mathrm{2p}_{1/2} = 0.37\ \mathrm{cm^{-1}}$), so $\mathrm{H}\alpha$ is a blend of components separated by $\sim 0.02\ \mathrm{nm}$. And in 1947 Lamb and Retherford found that $\mathrm{2s}_{1/2}$ lies $1057.8\ \mathrm{MHz} = 0.035\ \mathrm{cm^{-1}}$ above $\mathrm{2p}_{1/2}$, where Dirac's theory said they should be equal: the **Lamb shift**, caused by the electron's interaction with the vacuum's fluctuating field, is the founding measurement of quantum electrodynamics. At the other extreme, the correspondence principle is spectacularly confirmed by radio-astronomical **recombination lines**: transitions between enormous $n$ radiate at $\nu \approx 2cR/n^{3}$, so H109$\alpha$ ($110 \to 109$) appears at $5.01\ \mathrm{GHz}$ — the frequency a classical orbit of that radius would emit.

::: quiz
A hydrogen sample is excited to $n = 3$. Ignoring spin, how many distinct states are available at that energy, and how many distinct emission lines can the cascade produce?
- [x] $9$ states ($n^{2}$); $3$ lines ($3\to2$, $2\to1$, $3\to1$).
- [ ] $3$ states; $3$ lines.
- [ ] $9$ states; $6$ lines.
- [ ] $18$ states; $3$ lines.
::: solution
The degeneracy is $n^{2} = 1 + 3 + 5 = 9$ spatial states ($18$ with spin, but the question says to ignore it). The number of *lines* is the number of downward transitions between *levels*, not states: $3 \to 2$, $3 \to 1$ and $2 \to 1$ — three, because all states of a given $n$ are degenerate and emit the same photon energy. Confusing "states" with "lines" is the standard error; the counting $\binom{n}{2}$ counts transitions between levels, not between the $n^{2}$ states.
:::
:::

::: history
Balmer found in 1885 that the four known visible lines of hydrogen fit $\lambda = 3645.6\,n^{2}/(n^{2}-4)\ \text{Å}$ with $n = 3,4,5,6$ — numerology with a denominator. Rydberg (1888) and Ritz (1908) generalised it to the combination principle, and the spectroscopic community had catalogued thousands of lines by 1913 without an atom that could explain them. Bohr hit the target in 1913 with quantised orbits and derived $R$ from $e$, $m_\mathrm{e}$ and $h$; Sommerfeld added elliptical orbits and relativistic corrections in 1916 and could not fix the intensities. Schrödinger solved the real problem in 1926 — his second paper, on hydrogen, was the one that convinced the world — and Heisenberg's matrix mechanics, diagonalised for hydrogen by Pauli, agreed. The Dirac equation (1928) produced fine structure and the electron's $g$-factor; Lamb and Retherford measured the $2s$–$2p$ shift in 1947, and Bethe's calculation of it that same year founded renormalised QED. The 21-cm hyperfine line, predicted by van de Hulst in 1944 and found in 1951, then turned hydrogen's spectrum into a map of the Galaxy.
:::

## Where this leads

The hydrogen solution is the raw material of everything that follows. Replace the sharp nuclear charge by an averaged field of the other electrons and you have the orbital approximation and the periodic table ([[quantum-chemistry/many-electron-atoms]]); treat the electron–electron repulsion as a perturbation or a variational energy and you have the approximation methods ([[quantum-chemistry/approximation-methods]]); take two nuclei instead of one and you have the chemical bond ([[quantum-chemistry/chemical-bond-qm]]). The angular functions $Y_{l}^{m}$ reappear unchanged as the symmetry species of the rotation group, which is why the symmetry chapter ([[quantum-chemistry/molecular-symmetry]]) can classify $p$ and $d$ orbitals without solving anything. And the spectrum itself is taken up in earnest in [[spectroscopy/electronic-spectroscopy]], while the population of the levels — why Balmer absorption needs hot stars — is Boltzmann's law acting on $E_{n}$ ([[statistical-thermodynamics/boltzmann-distribution]]). The elementary account you met in [[general-chemistry-1/quantum-atom]] is now superseded at every point where it was, deliberately, wrong.

::: summary
- A central potential commutes with $\hat{L}^{2}$ and $\hat{L}_{z}$, so $\psi = R_{nl}(r)\,Y_{l}^{m}(\theta,\phi)$ separates: the angular part is universal (spherical harmonics), the radial part carries $V(r)$.
- $l = 0, \dots, n-1$ and $m = -l, \dots, l$; $|\mathbf{L}| = \sqrt{l(l+1)}\hbar$, $L_{z} = m\hbar$; $l$ angular nodes (planes/cones), $n - l - 1$ radial nodes (spheres), $n - 1$ total.
- $E_{n} = -Z^{2} \times 13.6\ \mathrm{eV}/n^{2}$ with degeneracy $n^{2}$ (spatial); the $l$-degeneracy is an accident of $1/r$ and is lifted in many-electron atoms.
- The most probable radii come from $P(r) = r^{2}R^{2}$: $1s \to a_{0}$, $2p \to 4a_{0}$, $2s \to (3+\sqrt{5})a_{0}$; never confuse $R$, $|\psi|^{2}$ and $P$.
- The uncertainty principle fixes the atom's size: minimising $\hbar^{2}/2mr^{2} - e^{2}/4\pi\varepsilon_{0}r$ gives $r^{*} = a_{0}$, $E = -13.6\ \mathrm{eV}$ — collapse is forbidden.
- The Rydberg–Ritz formula $\tilde{\nu} = R_\mathrm{H}(n_{1}^{-2} - n_{2}^{-2})$ with $R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}}$ gives every line; $R \propto \mu$ produces the $0.18\ \mathrm{nm}$ deuterium shift of $\mathrm{H}\alpha$.
- Hydrogen-like ions scale as $Z^{2}$ ($\mathrm{He}^{+}$: $54.4\ \mathrm{eV}$); fine structure ($0.37\ \mathrm{cm^{-1}}$ in $2p$) and the Lamb shift ($0.035\ \mathrm{cm^{-1}}$) are the first cracks in the Dirac picture.
:::

## Exercises

::: exercise A line of ionised helium {level=1 check="164.1"}
Compute the wavelength of the $3 \to 2$ transition of $\mathrm{He}^{+}$ ($R_{\mathrm{He}^{+}} = 109\,722\ \mathrm{cm^{-1}}$). (Enter the wavelength in nm.)
::: solution
$\tilde{\nu} = 4R(1/4 - 1/9) = 4 \times 109\,722 \times 5/36 = 60\,957\ \mathrm{cm^{-1}}$, so $\lambda = 10^{7}/60\,957 = 164.1\ \mathrm{nm}$ — extreme ultraviolet, four times the energy of $\mathrm{H}\alpha$ because of the $Z^{2} = 4$ scaling.
:::
:::

::: exercise Nodes of 4f {level=1 check="0"}
How many radial nodes does a hydrogen $4f$ orbital have? (Enter the number.)
::: solution
Radial nodes $= n - l - 1 = 4 - 3 - 1 = 0$. The $4f$ has three angular nodes (it is an $f$) and no radial ones: all its nodal structure is angular.
:::
:::

::: exercise The Bohr radius of He+ {level=1 check="26.5"}
What is the most probable radius of the $1s$ electron of $\mathrm{He}^{+}$? (Enter it in pm.)
::: solution
$P_{1s} \propto r^{2}e^{-2Zr/a_{0}}$ peaks at $r = a_{0}/Z = 52.92/2 = 26.5\ \mathrm{pm}$: the hydrogenic scaling $r_{n} = n^{2}a_{0}/Z$ squeezes the ion to half the radius, and its binding energy grows to $54.4\ \mathrm{eV}$.
:::
:::

::: exercise Lyman beta {level=2 check="102.6"}
Compute the wavelength of $\mathrm{Ly}\beta$ ($3 \to 1$) in atomic hydrogen ($R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}}$). (Enter the wavelength in nm.)
::: solution
$\tilde{\nu} = R_\mathrm{H}(1 - 1/9) = 109\,678 \times 8/9 = 97\,492\ \mathrm{cm^{-1}}$, $\lambda = 102.6\ \mathrm{nm}$. It lies between $\mathrm{Ly}\alpha$ ($121.6\ \mathrm{nm}$) and the series limit ($91.18\ \mathrm{nm}$), and like all Lyman lines it is absorbed by the interstellar medium — which is why Lyman-$\alpha$ forests, not $\mathrm{Ly}\beta$, carry most of the cosmological information.
:::
:::

::: exercise Space quantisation for d {level=2 check="65.9"}
For $l = 2$ and $m = 1$, what angle does the angular-momentum vector make with the $z$-axis? (Enter the angle in degrees.)
::: solution
$\cos\theta = m/\sqrt{l(l+1)} = 1/\sqrt{6} = 0.4082$, so $\theta = 65.9°$. The five allowed orientations for $l = 2$ are $\theta = 35.3°, 65.9°, 90°, 114.1°, 144.7°$ for $m = +2, +1, 0, -1, -2$ — never $0°$ or $180°$, as the uncertainty principle requires.
:::
:::

::: exercise Positronium {level=2 check="6.80"}
Positronium is an $\mathrm{e^{+}e^{-}}$ atom: a bound pair of an electron and a positron, no nucleus. Compute its ionisation energy. (Enter it in eV.)
::: solution
The reduced mass is $\mu = m_\mathrm{e}/2$ (equal masses), so $R_\mathrm{Ps} = R_{\infty}/(1 + m_\mathrm{e}/m_\mathrm{e}) = 54\,869\ \mathrm{cm^{-1}}$ and every energy is halved: $E_{1} = -13.6/2 = -6.80\ \mathrm{eV}$. Positronium's spectrum is hydrogen's at half the wavenumber — and it annihilates in $125\ \mathrm{ps}$ (para) or $142\ \mathrm{ns}$ (ortho), which is why it is a laboratory curiosity and an astrophysical diagnostic, not chemistry.
:::
:::

::: exercise Derive the 2s outer maximum {level=3}
Show from $P_{2s}(r) \propto r^{2}(2 - r/a_{0})^{2}e^{-r/a_{0}}$ that the maxima lie at $r = (3 \pm \sqrt{5})a_{0}$, and decide which is the global maximum.
::: solution
With $x = r/a_{0}$: $\ln P = 2\ln x + 2\ln|2 - x| - x + \text{const}$, so
$$
\frac{\mathrm{d}\ln P}{\mathrm{d}x} = \frac{2}{x} - \frac{2}{2-x} - 1 = 0
\quad\Longrightarrow\quad 2(2-x) - 2x - x(2-x) = 0
\quad\Longrightarrow\quad x^{2} - 6x + 4 = 0,
$$
with roots $x = 3 \pm \sqrt{5} = 0.764,\ 5.236$ (the node at $x = 2$ separates them). Evaluating: $P(0.764) \propto 0.584 \times 1.526 \times 0.466 = 0.415$ and $P(5.236) \propto 27.4 \times 10.5 \times 0.00532 = 1.53$ in the same units — the outer maximum is $3.7$ times higher, and it also integrates more probability (the shell volume $x^{2}$ favours large $r$). So the $2s$ electron's "radius" is $2.77\ \text{Å}$, with a compact inner lobe that is chemically disproportionately important: that lobe is what penetrates to the nucleus in lithium and beyond.
:::
:::

::: exercise Expectation versus most probable {level=3}
For the hydrogen $1s$ orbital compute $\langle r \rangle = \int_{0}^{\infty} r\,P(r)\,\mathrm{d}r$ and compare it with the most probable radius $a_{0}$. Why is $\langle r \rangle$ larger, and by what factor for a general $ns$-like distribution $P \propto r^{2}e^{-2r/na_{0}}$?
::: solution
With $P = 4r^{2}a_{0}^{-3}e^{-2r/a_{0}}$ and $\int_{0}^{\infty} r^{k}e^{-\alpha r}\mathrm{d}r = k!/\alpha^{k+1}$:
$$
\langle r \rangle = \frac{4}{a_{0}^{3}}\int_{0}^{\infty} r^{3}e^{-2r/a_{0}}\mathrm{d}r = \frac{4}{a_{0}^{3}}\cdot\frac{3!}{(2/a_{0})^{4}} = \frac{4 \times 6\, a_{0}}{16} = \frac{3}{2}a_{0} = 79.4\ \mathrm{pm}.
$$
$\langle r \rangle > r^{*}$ because $P$ is strongly right-skewed: the exponential tail extends to large $r$ and the mean is pulled by the tail the mode ignores. For any distribution of the form $P \propto r^{2}e^{-r/c}$ the same integral gives $\langle r \rangle = 3c$ against a mode at $2c$: the ratio is again $3/2$. The exact hydrogenic mean is $\langle r\rangle_{nl} = \tfrac{1}{2}[3n^{2} - l(l+1)]a_{0}$ — $1.5a_{0}$ for $1s$, $5a_{0}$ for $2p$ — so quoting an orbital "radius" always means saying which radius: mode, mean, or boundary surface.
:::
:::

::: exercise The Pickering coincidence {level=3}
The Pickering series of $\mathrm{He}^{+}$ has wavenumbers $\tilde{\nu} = 4R_{\mathrm{He}^{+}}(1/16 - 1/n^{2})$. Show that its even-$n$ members coincide with the Balmer series of hydrogen, and compute the odd-$n$ line $n = 9 \to 4$ ($R_{\mathrm{He}^{+}} = 109\,722\ \mathrm{cm^{-1}}$). Why did this pattern fool nineteenth-century spectroscopists?
::: solution
Put $n = 2m$ (even): $4(1/16 - 1/4m^{2}) = 1/4 - 1/m^{2}$, which is exactly the Balmer formula $R_\mathrm{H}(1/4 - 1/m^{2})$ up to the $0.04\,\%$ difference between $R_{\mathrm{He}^{+}}$ and $R_\mathrm{H}$ — so every even Pickering line hides inside a Balmer line. The odd members, e.g.
$$
\tilde{\nu} = 4 \times 109\,722\left(\frac{1}{16} - \frac{1}{81}\right) = 4 \times 109\,722 \times 0.050\,154 = 22\,011\ \mathrm{cm^{-1}},
\quad \lambda = 454.3\ \mathrm{nm},
$$
have no hydrogen counterpart and alternate with the Balmer lines like a second comb. Pickering (1896) attributed them to a "stellar element"; Bohr (1913) showed they are simply hydrogen's formula with $Z^{2} = 4$ and half-integer effective quantum numbers — one of the first triumphs of the new theory, and a lesson in reading combination patterns before interpreting them.
:::
:::
