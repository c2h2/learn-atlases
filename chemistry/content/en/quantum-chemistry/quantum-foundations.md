By 1900 classical physics looked like a finished building. Newton's equations described every motion from cannonballs to planets, Maxwell's equations unified electricity, magnetism and light, and Boltzmann's statistics connected heat to molecular motion — and yet the building had three cracks in its foundations that no repair could close. A hot cavity glowed with a spectrum that classical theory said should run to infinity; metals ejected electrons from light only above a threshold frequency, no matter how bright the beam; and hydrogen gas, excited in a discharge tube, emitted not a continuum but a set of razor-sharp lines whose wavelengths obeyed a relation no classical theory could even state, let alone derive. Quantum mechanics is the replacement that grew out of those three failures, and this lesson lays its foundations: the wavefunction and its Born interpretation, the Schrödinger equation as an eigenvalue problem, operators and observables, the commutators that make measurement consequential, and the uncertainty principle as a working tool rather than a slogan.

The route is deliberately both historical and logical. We first look at what classical physics got wrong, because the structure of the new theory is dictated by those failures; we then introduce the wavefunction and the rules that turn it into predictions; and we finish with the two ideas — non-commuting operators and the Fourier limit — that make quantum mechanics *different* from a classical wave theory and not merely new mathematics. Every later lesson in this course runs on this machinery: [[quantum-chemistry/model-systems]] solves it exactly for boxes and rings, [[quantum-chemistry/hydrogen-atom]] for the hydrogen atom, and [[quantum-chemistry/approximation-methods]] when it can no longer be solved; [[spectroscopy/spectroscopy-principles]] reads its eigenvalues as spectra.

## Three failures of classical physics

::: definition Black-body radiation and the Planck distribution {#def-planck}
A **black body** is an ideal absorber and emitter in thermal equilibrium; the radiation inside a heated cavity is the textbook case. Its spectral energy density is measured as a function of frequency $\nu$ at temperature $T$, and Planck found in 1900 that every curve is fitted by
$$
\rho(\nu, T) = \frac{8\pi h\nu^{3}}{c^{3}}\,\frac{1}{e^{h\nu/k_\mathrm{B}T} - 1},
$$ {#eq-planck}
provided the cavity walls' microscopic oscillators of frequency $\nu$ can exchange energy only in packets $E = nh\nu$. The single new constant is $h = 6.626\times10^{-34}\ \mathrm{J\,s}$, Planck's constant; the classical world is the limit $h\nu \ll k_\mathrm{B}T$, where the discreteness of the packets is invisible.
:::

Classical theory predicts the opposite high-frequency behaviour, and the prediction is worth deriving because it shows exactly where quantum mechanics enters.

::: proposition The Rayleigh–Jeans law and the ultraviolet catastrophe {#prop-uv}
Counting electromagnetic modes in a cavity and assigning each the classical thermal energy $k_\mathrm{B}T$ gives the **Rayleigh–Jeans law**
$$
\rho(\nu, T) = \frac{8\pi\nu^{2}k_\mathrm{B}T}{c^{3}},
$$
which agrees with [[#eq-planck]] at low frequency but grows without bound as $\nu^{2}$ at high frequency, so that the total energy density $\int_{0}^{\infty}\rho\,\mathrm{d}\nu$ is infinite — the **ultraviolet catastrophe**.
:::

::: proof Mode counting and equipartition {#proof-uv}
A rectangular cavity of volume $V$ admits standing electromagnetic waves whose wavelengths fit the box; counting the allowed wavevectors in threes of integers and two polarisations gives $8\pi\nu^{2}/c^{3}$ modes per unit volume per unit frequency. Classical statistical mechanics ([[statistical-thermodynamics/boltzmann-distribution]]) assigns each quadratic degree of freedom the mean energy $k_\mathrm{B}T/2$, and each mode has two (electric and magnetic), so every mode carries $k_\mathrm{B}T$ whatever its frequency. Multiplying modes by energy gives the Rayleigh–Jeans law. Integrating it, $\int_{0}^{\infty}\nu^{2}\,\mathrm{d}\nu = \infty$: any hot object should radiate infinite power in the ultraviolet. Planck's repair was to make the oscillator energy discrete, which replaces the factor $k_\mathrm{B}T$ in the numerator of the mode-energy by $h\nu/(e^{h\nu/k_\mathrm{B}T} - 1)$: modes with $h\nu \gg k_\mathrm{B}T$ are frozen out by the Boltzmann factor, the integral converges, and the catastrophe disappears. The total then comes out as $\sigma T^{4}$ (Stefan–Boltzmann), and the peak follows Wien's displacement law $\lambda_\text{max}T = 2.898\times10^{-3}\ \mathrm{m\,K}$: the Sun's surface at $5800\ \mathrm{K}$ peaks at $500\ \mathrm{nm}$, in the visible, while a room-temperature object at $298\ \mathrm{K}$ peaks at $9.7\ \mu\mathrm{m}$, in the infrared.
:::

::: widget plot
f: x^3/(exp(480*x/T)-1); T*x^2/480; x^3*exp(-480*x/T)
x: 0.5, 40
y: 0, 700
sliders: T=5800:3000:8000:100
labels: \text{Planck}; \text{Rayleigh--Jeans}; \text{Wien}
caption: The three black-body formulas of the text, plotted as $\rho$ against frequency $x$ in units of $10^{13}\ \mathrm{Hz}$ at a temperature `T` in kelvin set by the slider (the constant $480$ is $h\nu/k_\mathrm{B}T$ per unit of $x$). The Planck curve rises, peaks (Wien's law) and falls; the Rayleigh–Jeans curve matches it at low frequency and then runs off the top of the chart — the ultraviolet catastrophe in one glance. The Wien curve, an earlier empirical fit, fails at low frequency where Planck and Rayleigh–Jeans agree.
:::

The second failure is sharper still because it involves single quanta rather than an average.

::: example The photoelectric effect on caesium {#ex-photoelectric}
Caesium metal has a work function $\Phi = 2.14\ \mathrm{eV}$. Light of wavelength $400\ \mathrm{nm}$ and power $1.0\ \mathrm{mW}$ shines on a clean caesium surface. Find the maximum kinetic energy of the ejected electrons, the stopping potential, the threshold wavelength, and the photon flux. (Use $hc = 1239.84\ \mathrm{eV\,nm}$.)
::: solution
Einstein's 1905 reading of the effect is that light arrives as quanta of energy $E = h\nu = hc/\lambda$, each absorbed by a single electron:
$$
E_\text{photon} = \frac{1239.84\ \mathrm{eV\,nm}}{400\ \mathrm{nm}} = 3.10\ \mathrm{eV},
\qquad
K_\text{max} = E_\text{photon} - \Phi = 3.10 - 2.14 = 0.96\ \mathrm{eV}.
$$
The stopping potential is therefore $0.96\ \mathrm{V}$; the threshold wavelength, where $K_\text{max} = 0$, is
$$
\lambda_0 = \frac{hc}{\Phi} = \frac{1239.84}{2.14} = 579\ \mathrm{nm}.
$$
The photon flux is the power divided by the photon energy: $1.0\times10^{-3}\ \mathrm{J\,s^{-1}}$ divided by $3.10\times1.602\times10^{-19}\ \mathrm{J} = 2.0\times10^{16}\ \mathrm{s^{-1}}$. Three classical predictions fail here: classically any colour should eject electrons if the beam is bright enough (in fact nothing happens at $600\ \mathrm{nm}$ however intense the light); the electron energy should grow with intensity (it grows with frequency); and at very low intensity there should be a waiting time while an electron accumulates energy (electrons appear within $\sim10^{-9}\ \mathrm{s}$ because the quantum arrives whole).
:::
:::

The third failure is hydrogen's line spectrum, treated in [[general-chemistry-1/quantum-atom]] and worth restating as a standing challenge.

::: proposition The Rydberg formula and hydrogen term values {#prop-rydberg}
All lines of atomic hydrogen are given empirically by the **Rydberg formula**
$$
\frac{1}{\tilde{\lambda}} = R_\mathrm{H}\left(\frac{1}{n_1^{2}} - \frac{1}{n_2^{2}}\right),
\qquad n_2 > n_1 = 1, 2, 3, \dots
$$ {#eq-rydberg}
with $R_\mathrm{H} = 1.0968\times10^{7}\ \mathrm{m^{-1}}$. Equivalently the atom possesses **term values** $T_n = hcR_\mathrm{H}/n^{2}$, and a line is a difference of terms; the scale $hcR_\mathrm{H} = 13.6\ \mathrm{eV}$ is the ionisation energy of hydrogen. Classical electrodynamics predicts that an orbiting electron radiates continuously and spirals into the nucleus in about $10^{-11}\ \mathrm{s}$, so neither the stability nor the line spectrum has a classical explanation.
:::

::: example The first line of the Balmer series {#ex-rydberg}
Compute the wavelength and photon energy of the transition $n_2 = 3 \rightarrow n_1 = 2$ (the red line $\mathrm{H}\alpha$), and of the series limit $n_2 = \infty \rightarrow n_1 = 1$ (Lyman limit).
::: solution
From [[#eq-rydberg]],
$$
\frac{1}{\lambda} = 1.0968\times10^{7}\left(\frac{1}{4} - \frac{1}{9}\right)\mathrm{m^{-1}}
= 1.0968\times10^{7}\times0.13889 = 1.523\times10^{6}\ \mathrm{m^{-1}},
$$
so $\lambda = 656.5\ \mathrm{nm}$, in the red — and the photon energy is $13.6\times(1/4 - 1/9) = 1.89\ \mathrm{eV}$. The Lyman limit gives $1/\lambda = R_\mathrm{H}$, $\lambda = 91.18\ \mathrm{nm}$, in the vacuum ultraviolet, with photon energy $13.6\ \mathrm{eV}$: exactly the energy needed to ionise the atom from $n = 1$. The whole spectrum of the most abundant element in the universe is one number and two integers — a fact that any new mechanics had to reproduce, and [[quantum-chemistry/hydrogen-atom]] will show how the Schrödinger equation does.
:::
:::

## Matter waves

The first bridge across the cracks was Louis de Broglie's suggestion that the wave–particle duality of light has a mirror image in matter.

::: definition The de Broglie wavelength {#def-debroglie}
A free particle of momentum $p$ has an associated **matter wave** of wavelength and wavenumber
$$
\lambda = \frac{h}{p}, \qquad \tilde\nu = \frac{1}{\lambda} = \frac{p}{h}.
$$
For an electron accelerated from rest through a potential $V$, $p = (2m_\mathrm{e}eV)^{1/2}$ and $\lambda = 1.226\,(V/\mathrm{V})^{-1/2}\ \mathrm{nm}$. The hypothesis was confirmed in 1927 when Davisson and Germer diffracted $54\ \mathrm{V}$ electrons from a nickel crystal and found the angles expected for $\lambda = 0.167\ \mathrm{nm}$, comparable to the $0.215\ \mathrm{nm}$ spacing of the crystal planes; electrons are now diffracted routinely, exactly as [[general-chemistry-1/quantum-atom]] needs them to be.
:::

::: example Electron and dust-grain wavelengths {#ex-debroglie}
Find the de Broglie wavelength (a) of a $54\ \mathrm{eV}$ electron, (b) of an electron accelerated through $100\ \mathrm{V}$, and (c) of a spherical dust grain of diameter $1\ \mu\mathrm{m}$ and density $1000\ \mathrm{kg\,m^{-3}}$ drifting at $1\ \mathrm{mm\,s^{-1}}$.
::: solution
(a) With $E = 54\ \mathrm{eV} = 8.65\times10^{-18}\ \mathrm{J}$,
$$
\lambda = \frac{h}{\sqrt{2m_\mathrm{e}E}}
= \frac{6.626\times10^{-34}}{\left(2\times9.109\times10^{-31}\times8.65\times10^{-18}\right)^{1/2}}
= 1.67\times10^{-10}\ \mathrm{m} = 0.167\ \mathrm{nm},
$$
a diffraction-friendly wavelength, which is why Davisson and Germer saw their rings. (b) $\lambda = 1.226/\sqrt{100}\ \mathrm{nm} = 0.123\ \mathrm{nm}$ — the same scale as atomic spacings, which is why electron diffraction and electron microscopy see atoms at all. (c) The grain has mass $m = \frac{4}{3}\pi(0.5\times10^{-6})^{3}\times1000 = 5.2\times10^{-16}\ \mathrm{kg}$, so
$$
\lambda = \frac{6.626\times10^{-34}}{5.2\times10^{-16}\times10^{-3}} = 1.3\times10^{-15}\ \mathrm{m}.
$$
That is $10^{5}$ times smaller than an atom: no aperture small enough to diffract it exists, and the grain behaves classically. Matter waves are universal; their *observability* is not.
:::
:::

::: warning Small wavelength does not mean no wave {#warn-macro}
The dust grain of the previous example is no less quantum for having an unmeasurably small wavelength: its centre of mass still has a wavefunction. What destroys the interference in practice is *decoherence* — the grain scatters sunlight and air molecules constantly, and each scattered photon carries away which-path information, washing out any fringe before it forms. When you read later that a molecule "behaves as a wave", the claim is always about an experiment isolated enough from its environment to preserve phase; and when a chemistry textbook says quantum effects are "negligible for large molecules", it usually means decoherence or small $\lambda$, not a failure of the theory.
:::

## The wavefunction and the Born interpretation

Matter waves need a mathematics, and the first attempt — Schrödinger's original reading of his $\psi$ as a smeared-out charge density — is wrong. The correct reading is Max Born's.

::: definition Wavefunction and Born interpretation {#def-born}
The state of a particle moving along $x$ is a (generally complex) **wavefunction** $\psi(x, t)$, and $|\psi(x,t)|^{2}$ is a **probability density**: the probability of finding the particle between $x$ and $x + \mathrm{d}x$ in a position measurement is $|\psi|^{2}\,\mathrm{d}x$. The wavefunction itself is not observed; it is the amplitude whose modulus squared gives probabilities and whose *phase* governs interference. A wavefunction must be single-valued, continuous, and finite, and normalised so that
$$
\int_{-\infty}^{\infty}|\psi(x,t)|^{2}\,\mathrm{d}x = 1 .
$$
:::

::: proposition Expectation values {#prop-expectation}
The mean of many measurements of an observable $A$ on identically prepared systems — the **expectation value** — is
$$
\langle A \rangle = \int \psi^{*}\,\hat{A}\,\psi\,\mathrm{d}x ,
$$ {#eq-expect}
where $\hat{A}$ is the operator of $A$ (next section); for position this reduces to $\langle x \rangle = \int x|\psi|^{2}\,\mathrm{d}x$. The spread of the measurements is $\Delta A = \left(\langle A^{2}\rangle - \langle A\rangle^{2}\right)^{1/2}$, and $\Delta A = 0$ exactly when $\psi$ is an eigenfunction of $\hat{A}$.
:::

::: example Normalising a particle on a line segment {#ex-normalise}
A particle is confined to the segment $0 \le x \le L$ with wavefunction $\psi(x) = Nx(L - x)$ and $\psi = 0$ outside. Find $N$ for $L = 100\ \mathrm{pm}$ and the most probable position.
::: solution
Normalisation requires
$$
1 = N^{2}\int_{0}^{L}x^{2}(L-x)^{2}\,\mathrm{d}x
= N^{2}\int_{0}^{L}\left(L^{2}x^{2} - 2Lx^{3} + x^{4}\right)\mathrm{d}x
= N^{2}\left(\frac{L^{5}}{3} - \frac{L^{5}}{2} + \frac{L^{5}}{5}\right) = \frac{N^{2}L^{5}}{30},
$$
so $N = (30/L^{5})^{1/2} = (30)^{1/2}/L^{5/2}$. With $L = 1.00\times10^{-10}\ \mathrm{m}$,
$$
N = \frac{5.477}{\left(10^{-10}\right)^{5/2}} = 5.48\times10^{15}\ \mathrm{m^{-3/2}} .
$$
The probability density $|\psi|^{2}$ is largest where $x(L-x)$ is, at $x = L/2 = 50\ \mathrm{pm}$ — the particle is most likely found at the middle of the segment, and exactly at the ends (where $\psi = 0$) not at all. Note that $N$ carries units $\mathrm{m^{-3/2}}$ because in one dimension $|\psi|^{2}$ is a probability *per unit length*.
:::
:::

::: widget plot
f: exp(-x^2/(2*s^2)); exp(-2*s^2*x^2)
x: -4, 4
y: 0, 1.15
sliders: s=0.5:0.2:1.5:0.05
labels: \text{position density } |\psi(x)|^2; \text{momentum density } |\phi(p)|^2
caption: A Gaussian wave packet and its momentum-space partner, with the position width `s` set by the slider (both densities normalised to height one; momentum is in units of $\hbar/s_0$). Narrowing the packet in position *widens* it in momentum: the two widths multiply to a constant, $\sigma_x\sigma_p = \hbar/2$, the minimum allowed by the uncertainty theorem below. A particle with a perfectly sharp momentum would be a flat line in position — spread over all space and found nowhere in particular.
:::

::: quiz
A particle's normalised wavefunction is $\psi = \tfrac{1}{\sqrt{2}}\left(\psi_\mathrm{A} + i\,\psi_\mathrm{B}\right)$, where $\psi_\mathrm{A}$ and $\psi_\mathrm{B}$ are normalised states localised in well-separated regions A and B and orthogonal to each other. A position measurement finds the particle in B with probability
- [x] $\tfrac{1}{2}$, because the probability is the modulus squared of the coefficient and $|i|^{2} = 1$; the phase factor $i$ affects interference, not this probability.
- [ ] Zero, because the coefficient of $\psi_\mathrm{B}$ is imaginary and probabilities must be real.
- [ ] One, because the imaginary unit means the B component dominates.
- [ ] $\tfrac{1}{4}$, because $|\psi|^{2}$ averages the two regions.
::: solution
Writing the probability current out, $\left|\tfrac{1}{\sqrt{2}}\right|^{2}\!\!\int_{B}|i\,\psi_\mathrm{B}|^{2}\mathrm{d}x = \tfrac{1}{2}\times1 = \tfrac{1}{2}$. Complex amplitudes are the price of interference: the relative phase between $\psi_\mathrm{A}$ and $\psi_\mathrm{B}$ would change the outcome of an *interference* experiment (a later overlap of the two regions) while leaving this position probability at $\tfrac{1}{2}$.
:::
:::

## Operators, observables and eigenvalues

The dictionary between the wavefunction and the laboratory is written in operators.

::: definition Operator, eigenfunction, eigenvalue {#def-operator}
An **operator** $\hat{A}$ is a rule that turns one function into another: $\hat{A}f = g$. A non-zero $f$ satisfying
$$
\hat{A}f = a f
$$
is an **eigenfunction** of $\hat{A}$ with **eigenvalue** $a$. The measurement postulate of quantum mechanics says: the only values an observable $A$ can yield are the eigenvalues of its operator $\hat{A}$; a measurement leaves the system in the corresponding eigenfunction; and a wavefunction that is *not* an eigenfunction yields the eigenvalues probabilistically, with mean [[#eq-expect]].
:::

::: proposition The operators of position, momentum and energy {#prop-operators}
In one dimension the observables of elementary mechanics are represented by
$$
\hat{x} = x, \qquad
\hat{p}_x = -i\hbar\frac{\mathrm{d}}{\mathrm{d}x}, \qquad
\hat{H} = -\frac{\hbar^{2}}{2m}\frac{\mathrm{d}^{2}}{\mathrm{d}x^{2}} + V(x),
$$ {#eq-operators}
where $\hbar = h/2\pi$ and $\hat{H}$, the **Hamiltonian**, represents total energy. These operators do not all commute:
$$
\left[\hat{x}, \hat{p}_x\right] \equiv \hat{x}\hat{p}_x - \hat{p}_x\hat{x} = i\hbar,
$$
the **canonical commutation relation**, while $\left[\hat{x}, \hat{x}\right] = \left[\hat{p}_x, \hat{p}_x\right] = 0$ and any operator commutes with itself and with functions of itself.
:::

::: proof The canonical commutator {#proof-commutator}
Let the commutator act on an arbitrary differentiable test function $f(x)$, since two operators are equal only if they do the same thing to every function:
$$
\left[\hat{x}, \hat{p}_x\right]f
= x\left(-i\hbar\frac{\mathrm{d}f}{\mathrm{d}x}\right)
- \left(-i\hbar\frac{\mathrm{d}}{\mathrm{d}x}(xf)\right)
= -i\hbar x f' + i\hbar\left(f + xf'\right)
= i\hbar f .
$$
The $xf'$ terms cancel and what survives is $i\hbar f$ for every $f$ — so $\left[\hat{x},\hat{p}_x\right] = i\hbar$ as operators. The physics is in the non-cancellation: measuring position and then momentum is *not* the same operation as momentum and then position, and this single $i\hbar$ is the source of the uncertainty theorem below.
:::

::: example Which functions are eigenfunctions of momentum? {#ex-eigen}
Test $\psi_1 = e^{ikx}$ and $\psi_2 = \cos kx$ against $\hat{p}_x = -i\hbar\,\mathrm{d}/\mathrm{d}x$, and interpret.
::: solution
$$
\hat{p}_x\,\psi_1 = -i\hbar(ik)e^{ikx} = \hbar k\,\psi_1 :
$$
$\psi_1$ is an eigenfunction with eigenvalue $p = \hbar k$ — a particle in $\psi_1$ has momentum exactly $\hbar k$ ($\Delta p = 0$), and by the same token its $|\psi_1|^{2} = 1$ is uniform: a particle of perfectly defined momentum is completely delocalised. But
$$
\hat{p}_x\,\psi_2 = -i\hbar(-k\sin kx) = i\hbar k\sin kx \neq \text{const}\times\cos kx,
$$
so $\cos kx$ is *not* a momentum eigenfunction. Rewriting it as $\cos kx = \tfrac{1}{2}(e^{ikx} + e^{-ikx})$ shows why: it is an equal mixture of momentum $+\hbar k$ and $-\hbar k$, so a momentum measurement on $\psi_2$ yields $+\hbar k$ half the time and $-\hbar k$ half the time, with mean zero and $\Delta p = \hbar k$. Standing waves — which is what bound states are — have no definite momentum.
:::
:::

::: warning Operators are not numbers {#warn-operators}
Three errors recur. First, treating $\hat{A}\psi = a\psi$ as solved for "the" value $a$: an operator usually has *many* eigenfunctions and eigenvalues, and only a measurement on an eigenfunction is predictable. Second, forgetting that products of operators are ordered: $\hat{x}\hat{p}_x \ne \hat{p}_x\hat{x}$, so translating classical formulas like $xp$ into operators requires a decision (the quantum object is usually the symmetrised $\tfrac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$). Third, expecting eigenvalues to be real by construction: they are, but only because the operators of observables are *Hermitian* — $\int\phi^{*}\hat{A}\psi = \int(\hat{A}\phi)^{*}\psi$ — a property worth checking whenever you invent an operator.
:::

## The Schrödinger equation

::: definition The time-independent Schrödinger equation {#def-tise}
For a particle of mass $m$ in a potential $V(x)$, the states of definite energy — the ones that do not change in time except for a phase — are the eigenfunctions of the Hamiltonian [[#eq-operators]]:
$$
\hat{H}\psi = E\psi
\qquad\Longleftrightarrow\qquad
-\frac{\hbar^{2}}{2m}\frac{\mathrm{d}^{2}\psi}{\mathrm{d}x^{2}} + V(x)\psi = E\psi .
$$ {#eq-tise}
This is the **time-independent Schrödinger equation**. It is a postulate — it cannot be derived, only justified by its consequences — but it can be *plausibilised*: demanding that $\psi = e^{ikx}$ be an eigenfunction of $\hat{H}$ with $V = 0$ and reading off $E = \hbar^{2}k^{2}/2m$ is just $E = p^{2}/2m$ with $p = \hbar k$ from de Broglie.
:::

The equation's deepest property is arithmetic rather than analytic: it is a *boundary-value* problem. A differential equation on an infinite line has solutions at almost any $E$; a differential equation whose solutions must stay finite and match boundary conditions (vanish at the walls of a box, decay at infinity) has them only at isolated $E$. Quantisation is not an extra postulate bolted on — it is what boundary conditions do to waves, exactly as a guitar string admits only certain frequencies. [[quantum-chemistry/model-systems]] will see this in its purest form.

::: example Writing Schrödinger equations, and checking one {#ex-tise}
Write the time-independent Schrödinger equation for (a) an electron in the field of a proton, $V(r) = -e^{2}/(4\pi\varepsilon_0 r)$, and (b) a vibration modelled as $V(x) = \tfrac{1}{2}k_\mathrm{f}x^{2}$. Then verify that $\psi = e^{ikx}$ solves the free-particle equation ($V = 0$) and find $E$.
::: solution
(a) In one coordinate for simplicity (the full atom is done in three dimensions in [[quantum-chemistry/hydrogen-atom]]):
$$
-\frac{\hbar^{2}}{2m_\mathrm{e}}\frac{\mathrm{d}^{2}\psi}{\mathrm{d}x^{2}} - \frac{e^{2}}{4\pi\varepsilon_0 x}\psi = E\psi .
$$
(b) $-\dfrac{\hbar^{2}}{2m}\dfrac{\mathrm{d}^{2}\psi}{\mathrm{d}x^{2}} + \tfrac{1}{2}k_\mathrm{f}x^{2}\psi = E\psi$, solved in [[quantum-chemistry/vibration-rotation]]. (c) Substituting $\psi = e^{ikx}$ with $V = 0$: the second derivative is $(ik)^{2}e^{ikx} = -k^{2}e^{ikx}$, so the left side is $\dfrac{\hbar^{2}k^{2}}{2m}e^{ikx} = E\psi$ — an identity with $E = \hbar^{2}k^{2}/2m$, the expected free-particle energy. No quantisation appears here, and none should: a free particle is unconfined, and its spectrum is continuous. Confinement is what buys discrete levels.
:::
:::

## The uncertainty principle

::: theorem The generalised uncertainty principle {#thm-uncertainty}
For any two observables $\hat{A}$ and $\hat{B}$ and any state $\psi$,
$$
\Delta A\,\Delta B \ \ge\ \frac{1}{2}\left|\left\langle\left[\hat{A}, \hat{B}\right]\right\rangle\right| ,
$$
where $\Delta A$ is the spread of measurements of $A$ on identically prepared systems. With $\hat{A} = \hat{x}$, $\hat{B} = \hat{p}_x$ and the canonical commutator, **Heisenberg's relation**
$$
\Delta x\,\Delta p_x \ \ge\ \frac{\hbar}{2} .
$$
It constrains the *state*, not the cleverness of the apparatus: no preparation, however skilful, has both spreads smaller.
:::

::: proof From commutators to spreads {#proof-uncertainty}
Write $\hat{F} = \hat{A} - \langle A\rangle$ and $\hat{G} = \hat{B} - \langle B\rangle$, so $\Delta A^{2} = \langle\psi|\hat{F}^{2}|\psi\rangle$ and likewise for $G$. For any two square-integrable functions the Cauchy–Schwarz inequality gives $\langle F^{2}\rangle\langle G^{2}\rangle \ge \left|\langle FG\rangle\right|^{2}$ (apply $\int|f + \lambda g|^{2} \ge 0$ to $f = \hat{F}\psi$, $g = \hat{G}\psi$ and minimise over $\lambda$). Split $\langle FG\rangle$ into the parts symmetric and antisymmetric in $F \leftrightarrow G$:
$$
\langle FG\rangle = \tfrac{1}{2}\langle FG + GF\rangle + \tfrac{1}{2}\langle [F, G]\rangle ,
$$
and note that $[F, G] = [A, B]$ because shifts by numbers do not change commutators. The first term is real (for Hermitian operators) and the second purely imaginary, so $\left|\langle FG\rangle\right|^{2} \ge \tfrac{1}{4}\left|\langle[A, B]\rangle\right|^{2}$, and taking square roots gives the theorem. For $\hat{x}, \hat{p}_x$ the commutator is the number $i\hbar$, its expectation is $i\hbar$, and $\Delta x\,\Delta p_x \ge \hbar/2$.
:::

::: example Confining an electron to $100\ \mathrm{pm}$ {#ex-uncertainty}
An electron is localised to $\Delta x = 100\ \mathrm{pm}$ (an atomic radius). Estimate the minimum spread in its speed and the corresponding kinetic energy, and compare with chemical bond energies.
::: solution
The theorem gives
$$
\Delta p_x \ \ge\ \frac{\hbar}{2\Delta x}
= \frac{1.055\times10^{-34}}{2\times1.00\times10^{-10}}
= 5.3\times10^{-25}\ \mathrm{kg\,m\,s^{-1}},
$$
so $\Delta v_x = \Delta p_x/m_\mathrm{e} = 5.8\times10^{5}\ \mathrm{m\,s^{-1}}$, about $0.2\%$ of the speed of light. Taking $p \sim \Delta p$ as the scale of the momentum,
$$
K \sim \frac{(\Delta p)^{2}}{2m_\mathrm{e}}
= \frac{\left(5.3\times10^{-25}\right)^{2}}{2\times9.109\times10^{-31}}
= 1.5\times10^{-19}\ \mathrm{J} = 0.95\ \mathrm{eV}.
$$
A factor-of-two convention in $\Delta p$ moves this by a factor of four, but the message is robust: squeezing an electron to atomic size costs electronvolts of kinetic energy — the same currency as chemical bonds ($1$–$10\ \mathrm{eV}$). Molecules are stable *because* confining the bonding electrons pays for itself in potential energy, and no classical argument says so.
:::
:::

::: example Why electrons do not live in nuclei {#ex-nucleus}
Nuclei have radii of a few femtometres. If an electron were confined to $\Delta x = 5\ \mathrm{fm}$, what would its kinetic energy be? What does this say about the pre-1932 idea that nuclei contain electrons?
::: solution
Now $\Delta p \ge \hbar/(2\Delta x) = 1.055\times10^{-34}/(1.0\times10^{-14}) = 1.1\times10^{-20}\ \mathrm{kg\,m\,s^{-1}}$. This momentum is so large that the electron would be relativistic ($p \gg m_\mathrm{e}c = 2.7\times10^{-22}\ \mathrm{kg\,m\,s^{-1}}$), so use $E \approx pc$:
$$
E \approx pc = 1.1\times10^{-20}\times2.998\times10^{8}
= 3.2\times10^{-12}\ \mathrm{J} = 20\ \mathrm{MeV}.
$$
Nuclear beta electrons are emitted with energies of order $1\ \mathrm{MeV}$, twenty times smaller, and nuclear binding energies per nucleon are only $\sim8\ \mathrm{MeV}$: an electron could not hide inside a nucleus, because confining it there would cost more energy than the nucleus has. The resolution was the neutron (Chadwick, 1932) — nuclei are made of protons and neutrons, and beta electrons are *created* at the moment of emission. The uncertainty principle here is not philosophy but a mass spectrometer.
:::
:::

## Wave packets and group velocity

A particle *is* localised, so its wavefunction must be a **wave packet**: a superposition of many de Broglie waves whose phases add near one point and cancel elsewhere.

::: proposition Wave packets and the Fourier limit {#prop-wavepacket}
A packet built from wavenumbers centred on $k_0$ with spread $\Delta k$ has a position width $\Delta x$ bounded by
$$
\Delta x\,\Delta k \ \ge\ \frac{1}{2},
$$
a theorem of Fourier analysis with equality for a Gaussian. Multiplying by $\hbar$ and using $p = \hbar k$ recovers $\Delta x\,\Delta p \ge \hbar/2$: the uncertainty principle is the Fourier limit dressed in physics. Moreover the packet's centre travels at the **group velocity** $v_\mathrm{g} = \mathrm{d}\omega/\mathrm{d}k$, and with $E = \hbar\omega$ and $E = p^{2}/2m$ this gives $v_\mathrm{g} = \hbar k/m = p/m$ — the classical particle speed. The wavefunction's phase travels at the *phase* velocity $E/p = v/2$; it is the group that carries the particle.
:::

::: widget fourier
wave: pulse
terms: 7
spectrum: true
caption: A localised packet is a sum of many waves. The partial sums of the Fourier series of a periodic pulse show the mechanism: with few terms the "particle" is smeared into side lobes, and sharpening it requires adding short-wavelength components — the spectrum panel lists the wavenumbers a packet demands. This is why a narrow $\Delta x$ forces a wide $\Delta k$, and why the kinetic energy of a confined particle grows as its box shrinks, the result [[quantum-chemistry/model-systems]] will quantify for the box.
:::

::: history
The quantum came in three steps. Planck (Planck) fitted black-body radiation in December 1900 with energy packets $h\nu$, calling his constant "a purely formal assumption". Einstein (Einstein) made the packets real in 1905 to explain the photoelectric effect — light *is* quanta — and received the 1921 Nobel Prize for it, not for relativity. Bohr (Bohr) grafted a quantum condition onto the planetary atom in 1913 and derived hydrogen's lines, leaving the mechanism opaque. De Broglie (de Broglie) proposed matter waves in 1924, Davisson and Germer (Davisson, Germer) diffracted electrons in 1927, and in those same two years Heisenberg (Heisenberg) built mechanics from observable transition frequencies, Schrödinger (Schrödinger) wrote the wave equation and solved hydrogen, and Born (Born) read $\psi$ as probability — earning the 1954 Nobel Prize while Schrödinger and Dirac shared 1933's for "new productive forms of atomic theory". Heisenberg's uncertainty paper appeared in 1927; the general commutator form used here is Robertson's (Robertson, 1929), and Dirac's *Principles of Quantum Mechanics* (1930) recast the whole subject as the algebra of non-commuting observables that this lesson's operators preview.
:::

## Where this leads

The machinery is now assembled; the rest of the course is applications. [[quantum-chemistry/model-systems]] solves [[#eq-tise]] for boxes and rings, where quantisation, tunnelling and the particle-in-a-box model of conjugated molecules appear in closed form. [[quantum-chemistry/vibration-rotation]] adds the oscillator and rotor whose spectra are chemistry's fingerprints, and [[quantum-chemistry/hydrogen-atom]] attacks the atom whose lines started this lesson. When separation of variables fails, [[quantum-chemistry/approximation-methods]] continues in the spirit of Planck's compromise: guess well (variation) or expand around what you can solve (perturbation). The measurement postulate and the operators of [[#prop-operators]] are the entire equipment of [[computational-chemistry/hartree-fock]], and the expectation-value formula [[#eq-expect]] is how every computed property — dipole moment, charge density, transition energy — is finally read off a wavefunction.

::: summary
- Classical physics failed three ways — the ultraviolet catastrophe, the photoelectric threshold, and hydrogen's line spectrum — and each failure forced one quantum postulate: energy exchange in packets $h\nu$, light as quanta, and stationary states with discrete energies.
- Matter has wavelength $\lambda = h/p$; it is observable for electrons at atomic scales ($0.1\ \mathrm{nm}$ at $54\ \mathrm{eV}$) and hopelessly small for dust grains ($10^{-15}\ \mathrm{m}$), which is why the everyday world looks classical.
- The wavefunction $\psi$ is a probability amplitude: $|\psi|^{2}$ is a probability density (Born), normalised to one, and expectation values come from $\langle A\rangle = \int\psi^{*}\hat{A}\psi\,\mathrm{d}x$.
- Observables are Hermitian operators; measurable values are their eigenvalues only; and $\hat{p}_x = -i\hbar\,\mathrm{d}/\mathrm{d}x$ does not commute with $\hat{x}$ — $\left[\hat{x},\hat{p}_x\right] = i\hbar$.
- The Schrödinger equation $\hat{H}\psi = E\psi$ is an eigenvalue equation whose boundary conditions produce quantisation; free particles are not quantised, confined ones are.
- The uncertainty principle $\Delta x\,\Delta p \ge \hbar/2$ follows from the commutator, is a Fourier property of wave packets, and gives order-of-magnitude kinetic energies: $\sim1\ \mathrm{eV}$ for an electron in an atom, $\sim20\ \mathrm{MeV}$ for one confined to a nucleus.
- A packet's centre moves at the group velocity $v_\mathrm{g} = \mathrm{d}\omega/\mathrm{d}k = p/m$, so the wave and the particle agree where both descriptions are classical.
:::

## Exercises

::: exercise Electron wavelength {level=1 check="1.23"}
Find the de Broglie wavelength of an electron with kinetic energy $1.00\ \mathrm{eV}$. (Enter it in $\mathrm{nm}$.)
::: solution
$\lambda = h/\sqrt{2m_\mathrm{e}E} = 6.626\times10^{-34}/\sqrt{2\times9.109\times10^{-31}\times1.602\times10^{-19}} = 1.23\times10^{-9}\ \mathrm{m} = 1.23\ \mathrm{nm}$ — ten atomic diameters, which is why very slow electrons diffract strongly from surfaces and gratings.
:::
:::

::: exercise Photon energy {level=1 check="1.89"}
What is the energy of a photon of the $\mathrm{H}\alpha$ line, $\lambda = 656.3\ \mathrm{nm}$? (Enter it in $\mathrm{eV}$.)
::: solution
$E = hc/\lambda = 1239.84/656.3 = 1.89\ \mathrm{eV}$. This is exactly the term difference $13.6\times(1/4 - 1/9)\ \mathrm{eV}$ of [[#prop-rydberg]]: photon energies and term values are the same bookkeeping in two currencies.
:::
:::

::: exercise Photoelectric threshold {level=1 check="579"}
The work function of caesium is $2.14\ \mathrm{eV}$. Below what wavelength does light fail to eject electrons from caesium? (Enter it in $\mathrm{nm}$.)
::: solution
$\lambda_0 = hc/\Phi = 1239.84/2.14 = 579\ \mathrm{nm}$ — orange-yellow light. Caesium is used in photocells precisely because its threshold sits in the visible; for most metals $\Phi \sim 4$–$5\ \mathrm{eV}$ puts the threshold in the ultraviolet.
:::
:::

::: exercise Electron speed {level=2 check="4.36"}
Find the speed of the $54\ \mathrm{eV}$ electrons of the Davisson–Germer experiment. (Enter it in units of $10^{6}\ \mathrm{m\,s^{-1}}$.)
::: solution
$v = \sqrt{2E/m_\mathrm{e}} = \sqrt{2\times8.65\times10^{-18}/9.109\times10^{-31}} = 4.36\times10^{6}\ \mathrm{m\,s^{-1}}$, about $1.5\%$ of the speed of light — non-relativistic, so the elementary formula is safe. Note $v$ is fixed by $E$ alone; $\lambda$ is fixed by $p$; the two together are why electron microscopes need accelerating voltages, not brighter filaments, to see smaller things.
:::
:::

::: exercise Normalisation and probability {level=2}
For the wavefunction $\psi = Nx(L-x)$ of the segment example, compute the probability of finding the particle in the left third of the segment, $0 \le x \le L/3$.
::: solution
With $N^{2} = 30/L^{5}$,
$$
P = \frac{30}{L^{5}}\int_{0}^{L/3}x^{2}(L-x)^{2}\,\mathrm{d}x
= \frac{30}{L^{5}}\left[\frac{L^{2}x^{3}}{3} - \frac{Lx^{4}}{2} + \frac{x^{5}}{5}\right]_{0}^{L/3}
= 30\left(\frac{1}{81} - \frac{1}{162} + \frac{1}{1215}\right) = 0.259 .
$$
A quarter of the probability in a third of the length: the density peaks at the centre, so the edge third is under-populated relative to a uniform distribution. Always check $0 \le P \le 1$ and the symmetry of the answer — here the right third must give the same $0.259$ and the middle third $0.482$.
:::
:::

::: exercise Confinement cost {level=2 check="5.8"}
An electron in a conjugated molecule is localised to $\Delta x = 10\ \mathrm{pm}$. Estimate the minimum spread of its speed. (Enter it in units of $10^{6}\ \mathrm{m\,s^{-1}}$.)
::: solution
$\Delta v \ge \hbar/(2m_\mathrm{e}\Delta x) = 1.055\times10^{-34}/(2\times9.109\times10^{-31}\times1.0\times10^{-11}) = 5.8\times10^{6}\ \mathrm{m\,s^{-1}}$. Ten times tighter confinement than the atomic case gives ten times the speed spread and a hundred times the kinetic energy ($\sim95\ \mathrm{eV}$): squeezing electrons into small spaces is expensive, and molecules pay it only when potential energy refunds them.
:::
:::

::: exercise Commutator algebra {level=3}
Compute the commutators $\left[\hat{x}, \hat{p}_x^{2}\right]$ and $\left[\hat{x}^{2}, \hat{p}_x\right]$ by letting them act on a test function. Then use $[\hat{A},\hat{B}\hat{C}] = [\hat{A},\hat{B}]\hat{C} + \hat{B}[\hat{A},\hat{C}]$ to rederive both, and evaluate $\left[\hat{H}, \hat{x}\right]$ for $\hat{H} = \hat{p}^{2}/2m + V(\hat{x})$.
::: solution
On $f(x)$: $\hat{x}\hat{p}^{2}f = -\hbar^{2}x f''$, while $\hat{p}^{2}\hat{x}f = -\hbar^{2}(xf)'' = -\hbar^{2}(xf'' + 2f')$; the difference is $2\hbar^{2}f' = 2i\hbar\hat{p}f$, so $\left[\hat{x},\hat{p}^{2}\right] = 2i\hbar\hat{p}$. Similarly $\left[\hat{x}^{2},\hat{p}\right] = 2i\hbar\hat{x}$. The product rule reproduces both: $[\hat{x},\hat{p}^{2}] = [\hat{x},\hat{p}]\hat{p} + \hat{p}[\hat{x},\hat{p}] = 2i\hbar\hat{p}$. For the Hamiltonian, $V(\hat{x})$ commutes with $\hat{x}$, so $\left[\hat{H},\hat{x}\right] = \left[\hat{p}^{2},\hat{x}\right]/2m = -2i\hbar\hat{p}/2m = -i\hbar\hat{p}/m$. The physical content: $[\hat{H},\hat{x}] \ne 0$ means position is not conserved — its expectation value moves, $\mathrm{d}\langle x\rangle/\mathrm{d}t = \langle\hat{p}\rangle/m$, which is Ehrenfest's theorem and Newton's first law surviving inside quantum mechanics.
:::
:::

::: exercise The catastrophe, derived {level=3}
Derive the Rayleigh–Jeans law from mode counting and equipartition, and show explicitly that the classical energy density diverges. Then compute the *quantum* total energy density at $T = 5800\ \mathrm{K}$ using $\int_{0}^{\infty}\dfrac{x^{3}}{e^{x}-1}\,\mathrm{d}x = \pi^{4}/15$ and compare with the Stefan–Boltzmann value $u = 4\sigma T^{4}/c$.
::: solution
Modes per unit volume per unit frequency: $8\pi\nu^{2}/c^{3}$ (standing waves in a box, two polarisations). Equipartition gives each $k_\mathrm{B}T$, so $\rho(\nu)\,\mathrm{d}\nu = 8\pi\nu^{2}k_\mathrm{B}T\,\mathrm{d}\nu/c^{3}$, and $\int_{0}^{\infty}\nu^{2}\,\mathrm{d}\nu \to \infty$: the total is infinite at *any* temperature — the catastrophe. Quantum mechanically, with $x = h\nu/k_\mathrm{B}T$,
$$
u = \frac{8\pi(k_\mathrm{B}T)^{4}}{h^{3}c^{3}}\int_{0}^{\infty}\frac{x^{3}}{e^{x}-1}\,\mathrm{d}x
= \frac{8\pi^{5}k_\mathrm{B}^{4}}{15h^{3}c^{3}}T^{4},
$$
which is finite and proportional to $T^{4}$ — Stefan–Boltzmann emerges, with $\sigma$ built only from $h$, $c$, $k_\mathrm{B}$. At $5800\ \mathrm{K}$: $u = 4\times5.67\times10^{-8}\times5800^{4}/2.998\times10^{8} = 7.9\times10^{8}\ \mathrm{J\,m^{-3}}$, a finite number where the classical theory offered only infinity. One factor of $h$ in the right place converts a nonsense into a thermometer.
:::
:::

::: exercise The ground state from the uncertainty principle {level=3}
Model the hydrogen atom by confining the electron to a sphere of radius $r$, so that $p \sim \hbar/r$, and write the total energy
$$
E(r) = \frac{\hbar^{2}}{2m_\mathrm{e}r^{2}} - \frac{e^{2}}{4\pi\varepsilon_0 r}.
$$
Minimise over $r$, show the minimum sits at the Bohr radius $a_0 = 4\pi\varepsilon_0\hbar^{2}/m_\mathrm{e}e^{2}$ with $E = -13.6\ \mathrm{eV}$, and explain in one sentence why the atom does not collapse to $r = 0$ and why it does not fly apart.
::: solution
$\mathrm{d}E/\mathrm{d}r = -\hbar^{2}/m_\mathrm{e}r^{3} + e^{2}/4\pi\varepsilon_0 r^{2} = 0$ gives $r^{\ast} = 4\pi\varepsilon_0\hbar^{2}/m_\mathrm{e}e^{2} = a_0 = 52.9\ \mathrm{pm}$. Substituting back, using $e^{2}/4\pi\varepsilon_0 = \hbar^{2}/m_\mathrm{e}a_0$:
$$
E(a_0) = \frac{\hbar^{2}}{2m_\mathrm{e}a_0^{2}} - \frac{\hbar^{2}}{m_\mathrm{e}a_0^{2}} = -\frac{\hbar^{2}}{2m_\mathrm{e}a_0^{2}} = -13.6\ \mathrm{eV},
$$
the exact hydrogen ground-state energy (the variational theorem of [[quantum-chemistry/approximation-methods]] guarantees no guess can beat the true minimum, and here the guess is the truth). Collapse is prevented because localising the electron below $a_0$ raises $\Delta p \sim \hbar/r$ and the kinetic term $\propto 1/r^{2}$ outruns the potential $\propto 1/r$; dispersal is prevented because the potential well pulls the electron back before the kinetic term can fade. The atom is the truce between the uncertainty principle and Coulomb's law — and this estimate, obtained without solving any differential equation, already contains the size and binding energy of every molecule's simplest case.
:::
:::
