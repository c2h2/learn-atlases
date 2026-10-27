An excited hydrogen atom in its $2p$ state does not stay there. After about $1.6\,\mathrm{ns}$ on average it drops to $1s$ and emits a photon of wavelength $121.6\,\mathrm{nm}$, the Lyman-$\alpha$ line. Yet $2p$ is an eigenstate of the hydrogen Hamiltonian, and eigenstates are stationary: [[quantum-1/schrodinger-equation]] showed that their probability densities do not change in time. Something outside the Coulomb Hamiltonian must be driving the change, and in this case it is the coupling of the electron to the electromagnetic field. The same coupling, with a laser instead of the vacuum, drives an atom up as well as down, and does so coherently enough that the atom can be flipped back and forth between two levels at will.

This chapter is about transitions: the probability that a system prepared in one eigenstate of $\hat H^{0}$ is later found in another, because a perturbation $\hat H'(t)$ acts for a while. We solve a two-level system exactly first, because it shows every feature we later approximate: oscillation, resonance, detuning. Then we develop first-order time-dependent perturbation theory, derive Fermi's golden rule for transitions into a continuum, and use it to compute the absorption and emission of light by atoms, ending with the Einstein $A$ coefficient of the $2p\to1s$ transition from first principles.

The background is [[quantum-1/formalism]] and [[quantum-2/stationary-perturbation]]. The matrix elements $H'_{fi} = \langle f\vert\hat H'\vert i\rangle$ of the previous chapter come back, now as amplitudes for jumping rather than as energy shifts.

## Expanding in stationary states {#coefficients}

Let $\hat H^{0}$ have orthonormal eigenstates $\lvert n\rangle$ with energies $E_n$, and let $\hat H(t) = \hat H^{0} + \hat H'(t)$. Any state can be expanded in the $\lvert n\rangle$, and it is convenient to take out the phase that each component would acquire without the perturbation.

::: definition Interaction-picture amplitudes {#def-amplitudes}
The **amplitudes** $c_n(t)$ of a state $\lvert\Psi(t)\rangle$ are defined by

$$
\lvert\Psi(t)\rangle = \sum_n c_n(t)\,e^{-iE_nt/\hbar}\lvert n\rangle.
$$ {#eq-expansion}

The **transition probability** from an initial state $\lvert i\rangle$ to a final state $\lvert f\ne i\rangle$ at time $t$ is $P_{i\to f}(t) = \lvert c_f(t)\rvert^2$, given $c_n(0) = \delta_{ni}$. We write $\omega_{fi} = (E_f - E_i)/\hbar$ for the **Bohr frequency** of the transition.
:::

If $\hat H' = 0$ the amplitudes are constant: all the time dependence is in the phases. With $\hat H'$ present, substitute [[#eq-expansion]] into $i\hbar\,\partial_t\lvert\Psi\rangle = (\hat H^{0} + \hat H')\lvert\Psi\rangle$. The $\hat H^{0}$ terms cancel against the derivatives of the phases, and taking the inner product with $\langle f\rvert$ leaves an exact system of equations:

$$
i\hbar\,\dot c_f(t) = \sum_n H'_{fn}(t)\,e^{i\omega_{fn}t}\,c_n(t).
$$ {#eq-exact}

This is the Schrödinger equation, nothing approximated yet. It is an infinite set of coupled linear equations, and the perturbation couples amplitudes with a phase factor that oscillates at the Bohr frequency of each pair of levels.

## The two-level system and Rabi oscillations {#rabi}

Keep only two states, a ground state $\lvert g\rangle$ and an excited state $\lvert e\rangle$, with $\omega_0 = (E_e - E_g)/\hbar > 0$. Many real systems are well described this way: a spin $\frac12$ in a magnetic field, an atom driven by a laser tuned near one transition and far from all others, a superconducting qubit. Drive it with an oscillating coupling

$$
\hat H'(t) = \hbar\Omega\cos(\omega t)\bigl(\lvert e\rangle\langle g\rvert + \lvert g\rangle\langle e\rvert\bigr),
$$

where $\Omega$ is real and is called the **Rabi frequency**; it is proportional to the strength of the drive. Define the **detuning** $\Delta = \omega - \omega_0$. Equations [[#eq-exact]] become

$$
i\dot c_e = \Omega\cos(\omega t)\,e^{i\omega_0t}\,c_g, \qquad i\dot c_g = \Omega\cos(\omega t)\,e^{-i\omega_0t}\,c_e.
$$

Write $\cos\omega t = \frac12(e^{i\omega t} + e^{-i\omega t})$. Then $\cos(\omega t)\,e^{i\omega_0t}$ contains a slow term $\frac12e^{-i\Delta t}$ and a fast term $\frac12e^{i(\omega + \omega_0)t}$. Near resonance, $\lvert\Delta\rvert \ll \omega_0$, the fast term averages to almost nothing over the time in which the amplitudes change, and dropping it is the **rotating-wave approximation**. It is excellent whenever $\Omega, \lvert\Delta\rvert \ll \omega_0$, as is typical for optical transitions ($\omega_0 \sim 10^{15}\,\mathrm{s^{-1}}$) driven by lasers ($\Omega$ up to $\sim 10^{9}\,\mathrm{s^{-1}}$).

::: theorem Rabi formula {#thm-rabi}
In the rotating-wave approximation, a two-level system that starts in $\lvert g\rangle$ is found in $\lvert e\rangle$ at time $t$ with probability

$$
P_{g\to e}(t) = \frac{\Omega^2}{\Omega^2 + \Delta^2}\,\sin^2\!\left(\frac{\Omega' t}{2}\right), \qquad \Omega' = \sqrt{\Omega^2 + \Delta^2}.
$$ {#eq-rabi}
:::

::: proof
After the rotating-wave approximation,

$$
i\dot c_e = \frac\Omega2e^{-i\Delta t}c_g, \qquad i\dot c_g = \frac\Omega2e^{i\Delta t}c_e.
$$

Remove the explicit time dependence by setting $c_e = e^{-i\Delta t/2}b_e$ and $c_g = e^{i\Delta t/2}b_g$. Then $i\dot c_e = e^{-i\Delta t/2}\bigl(i\dot b_e + \frac\Delta2b_e\bigr)$, and similarly for $c_g$, so

$$
i\deriv{}{t}\begin{pmatrix}b_g\\ b_e\end{pmatrix} = M\begin{pmatrix}b_g\\ b_e\end{pmatrix}, \qquad M = \frac12\begin{pmatrix}\Delta & \Omega\\ \Omega & -\Delta\end{pmatrix}.
$$

$M$ is constant and Hermitian, and $M^2 = \frac14(\Omega^2 + \Delta^2)\mathbb 1 = (\Omega'/2)^2\mathbb 1$. So the series for the exponential splits into even and odd powers, exactly as for $e^{-i\theta}$:

$$
e^{-iMt} = \cos\!\left(\frac{\Omega't}{2}\right)\mathbb 1 - i\,\frac{2M}{\Omega'}\,\sin\!\left(\frac{\Omega't}{2}\right).
$$

With $b_g(0) = 1$, $b_e(0) = 0$, the lower component is $b_e(t) = -i(\Omega/\Omega')\sin(\Omega't/2)$. Since $\lvert c_e\rvert = \lvert b_e\rvert$, squaring gives [[#eq-rabi]].
:::

On resonance, $\Delta = 0$, the system oscillates completely between $\lvert g\rangle$ and $\lvert e\rangle$ at angular frequency $\Omega$ in the populations: these are **Rabi oscillations**. A drive switched on for $t = \pi/\Omega$, a **$\pi$ pulse**, transfers the whole population to $\lvert e\rangle$; a $\pi/2$ pulse makes an equal superposition. Off resonance the oscillation is faster, at $\Omega'$, and incomplete: its maximum is $\Omega^2/(\Omega^2 + \Delta^2)$, a Lorentzian in the detuning whose full width at half maximum is $2\Omega$.

::: widget plot
f: sin(sqrt(1+d^2)*x/2)^2/(1+d^2); (x/2)^2
x: 0, 20
y: 0, 1.2
sliders: d=0:-3:3:0.1
labels: Rabi formula; first-order perturbation theory at resonance
caption: The excited-state probability against $\Omega t$, with the detuning $d = \Delta/\Omega$ on the slider. At $d = 0$ the population swings completely to the excited state at $\Omega t = \pi$ and back at $2\pi$. Increase $\lvert d\rvert$: the oscillation speeds up and its peak falls to $1/(1+d^2)$. The parabola is what first-order perturbation theory predicts on resonance, $(\Omega t/2)^2$: correct while it is small, and absurd once it passes $1$. Perturbation theory is a short-time or weak-drive theory.
:::

::: application Qubits and magnetic resonance
A spin-$\frac12$ in a static field $B_0\hat{\mathbf z}$ has $\omega_0 = \gamma B_0$, and a small field $B_1$ rotating in the $xy$ plane at $\omega$ drives it exactly as above, with $\Omega = \gamma B_1$. Here the rotating-wave approximation is not even needed: for a field that truly rotates, [[#eq-rabi]] is exact ([[#exr-spin-rabi]]). This is nuclear magnetic resonance, the basis of MRI, in which $\pi$ and $\pi/2$ pulses are applied to protons at $42.6\,\mathrm{MHz}$ per tesla. The same pulses, applied with microwaves to superconducting circuits or with lasers to trapped ions, are the single-qubit gates of quantum computing. See [[quantum-2/entanglement]].
:::

## First-order perturbation theory {#first-order}

For a general $\hat H'(t)$ and many levels, [[#eq-exact]] cannot be solved. If the perturbation is weak, though, the amplitudes stay close to their initial values for some time, and we can iterate. Start with $c_n = \delta_{ni}$ on the right of [[#eq-exact]] and integrate.

::: theorem First-order transition amplitude {#thm-first-order}
Let the system be in $\lvert i\rangle$ at $t = 0$. To first order in $\hat H'$, the amplitude to be in $\lvert f\rangle$, $f \ne i$, at time $t$ is

$$
c_f(t) = -\frac{i}{\hbar}\int_0^t H'_{fi}(t')\,e^{i\omega_{fi}t'}\,\dd t'.
$$ {#eq-first-order}

The approximation is valid while $\lvert c_f\rvert^2 \ll 1$ for every $f \ne i$.
:::

::: proof
Insert a bookkeeping parameter, $\hat H' \to \lambda\hat H'$, and expand $c_n = c_n^{(0)} + \lambda c_n^{(1)} + \cdots$. At order $\lambda^0$, [[#eq-exact]] says $\dot c_n^{(0)} = 0$, so $c_n^{(0)} = \delta_{ni}$ for all time. At order $\lambda^1$ the right-hand side of [[#eq-exact]] contains $\hat H'$ multiplied by the zeroth-order amplitudes, so

$$
i\hbar\,\dot c_f^{(1)} = \sum_nH'_{fn}e^{i\omega_{fn}t}\delta_{ni} = H'_{fi}(t)e^{i\omega_{fi}t}.
$$

Integrating from $0$, where $c_f^{(1)}(0) = 0$, gives [[#eq-first-order]]. The neglected terms are of order $\lambda^2$; they are small as long as the depletion of $\lvert i\rangle$ and the population of the other states are small, which is the stated condition.
:::

The result says: the amplitude to jump is the time integral of the coupling, weighted by the phase $e^{i\omega_{fi}t}$. A perturbation that varies slowly compared with $1/\omega_{fi}$ averages to almost nothing against that phase and causes no transition. That is the **adiabatic** limit. A perturbation that acts suddenly, over a time short compared with $1/\omega_{fi}$, does not resolve the phase and gives the largest amplitude.

::: example An oscillator kicked by a pulse {#ex-kick}
An oscillator of mass $m$ and angular frequency $\omega$, in its ground state, is subjected to a force pulse $F(t) = F_0e^{-t^2/\tau^2}$ from $t = -\infty$ to $\infty$, so $\hat H'(t) = -F(t)\,\hat x$. Find the first-order probability that it ends in the first excited state, and examine the limits of short and long pulses.
::: solution
The only state reached from $\lvert0\rangle$ at first order is $\lvert1\rangle$, since $\langle1\vert\hat x\vert0\rangle = \sqrt{\hbar/2m\omega}$ and $\langle n\vert\hat x\vert0\rangle = 0$ for $n \ge 2$. With $\omega_{10} = \omega$ and the time integral now over the whole real line,

$$
c_1 = \frac{i}{\hbar}F_0\sqrt{\frac{\hbar}{2m\omega}}\int_{-\infty}^{\infty}e^{-t^2/\tau^2}e^{i\omega t}\,\dd t = \frac{i}{\hbar}F_0\sqrt{\frac{\hbar}{2m\omega}}\,\sqrt\pi\,\tau\,e^{-\omega^2\tau^2/4},
$$

using the Gaussian Fourier transform $\int e^{-t^2/\tau^2 + i\omega t}\,\dd t = \sqrt\pi\,\tau\,e^{-\omega^2\tau^2/4}$. So

$$
P_{0\to1} = \frac{\pi F_0^2\tau^2}{2m\hbar\omega}\,e^{-\omega^2\tau^2/2}.
$$

For a long pulse, $\omega\tau \gg 1$, the probability is exponentially small: the oscillator follows the slowly changing force adiabatically and returns to its ground state when the force goes away. For a short pulse, $\omega\tau \ll 1$, the exponential is $1$ and $P = (\pi F_0^2\tau^2)/(2m\hbar\omega) = p^2/(2m\hbar\omega)$, where $p = \int F\,\dd t = \sqrt\pi F_0\tau$ is the impulse. Classically an impulse $p$ given to an oscillator at rest deposits energy $p^2/2m$, and dividing by the quantum $\hbar\omega$ gives the expected number of quanta, $p^2/2m\hbar\omega$, which is the same expression. The first-order result is valid while this is small.
:::
:::

### Sudden and adiabatic changes {#sudden}

The two limits of [[#ex-kick]] are general. If $\hat H$ changes over a time $T$ long compared with $1/\omega_{fi}$ for all relevant pairs of levels, the **adiabatic theorem** (Born and Fock, 1928) says that a system starting in the $n$th eigenstate of $\hat H$ ends in the $n$th eigenstate of the final Hamiltonian, whatever that is, provided the levels never cross. If instead $\hat H$ jumps from $\hat H_{\mathrm{old}}$ to $\hat H_{\mathrm{new}}$ in a time short compared with every $1/\omega_{fi}$, the state has no time to change. This is the **sudden approximation**: the state just after the jump equals the state just before, and the probability of finding the system in an eigenstate $\lvert\phi_k\rangle$ of $\hat H_{\mathrm{new}}$ is $\lvert\langle\phi_k\vert\psi_{\mathrm{old}}\rangle\rvert^2$. Neither limit needs $\hat H'$ to be small.

::: example Beta decay of tritium {#ex-tritium}
A tritium atom ($^3\mathrm H$, one electron in $1s$) beta-decays: the nucleus emits a fast electron and becomes $^3\mathrm{He}$ with charge $2e$. The emitted electron leaves in about $10^{-18}\,\mathrm s$, short compared with the atomic time $\hbar/E_{\mathrm h} = 2.4\times10^{-17}\,\mathrm s$. Find the probability that the atomic electron ends in the $1s$ state of $^3\mathrm{He}^+$.
::: solution
By the sudden approximation the electron is still in the hydrogen $1s$ state $\psi_1 = (\pi a^3)^{-1/2}e^{-r/a}$ immediately after the decay. The new ground state is the $Z = 2$ orbital $\phi_1 = (8/\pi a^3)^{1/2}e^{-2r/a}$. Their overlap is

$$
\langle\phi_1\vert\psi_1\rangle = \frac{\sqrt8}{\pi a^3}\,4\pi\int_0^\infty r^2e^{-3r/a}\,\dd r = \frac{4\sqrt8}{a^3}\cdot\frac{2a^3}{27} = \frac{16\sqrt2}{27},
$$

and the probability is $512/729 = 0.702$. The remaining $30$ per cent goes to excited states of $\mathrm{He}^+$ (about $25$ per cent to $2s$) and to ionisation. Only $s$ states are reached, because the change in the potential is spherically symmetric. These "shake-up" probabilities matter in precision measurements of the neutrino mass from the tritium beta spectrum.
:::
:::

### A constant perturbation switched on

The simplest time dependence is a constant $\hat V$ switched on at $t = 0$. Then [[#eq-first-order]] is elementary:

$$
c_f(t) = -\frac{i}{\hbar}V_{fi}\int_0^te^{i\omega_{fi}t'}\,\dd t' = -\frac{V_{fi}}{\hbar\omega_{fi}}\left(e^{i\omega_{fi}t} - 1\right),
$$

and since $\lvert e^{i\theta} - 1\rvert^2 = 4\sin^2(\theta/2)$,

$$
P_{i\to f}(t) = \frac{\lvert V_{fi}\rvert^2}{\hbar^2}\,F_t(\omega_{fi}), \qquad F_t(\omega) = \frac{\sin^2(\omega t/2)}{(\omega/2)^2}.
$$ {#eq-constant}

For a final state with $\omega_{fi} \ne 0$ the probability oscillates and never grows beyond $4\lvert V_{fi}\rvert^2/\hbar^2\omega_{fi}^2$. Energy non-conserving transitions are possible for short times, which is a form of the time–energy uncertainty relation, but they do not accumulate. For $\omega_{fi} \to 0$, $F_t \to t^2$ and the probability grows quadratically. The function $F_t(\omega)$ is a peak at $\omega = 0$ of height $t^2$ and width about $2\pi/t$, with area

$$
\int_{-\infty}^{\infty}F_t(\omega)\,\dd\omega = 2\pi t.
$$ {#eq-area}

(Substitute $u = \omega t/2$ and use $\int_{-\infty}^{\infty}\sin^2u/u^2\,\dd u = \pi$.) Height $t^2$ and width $1/t$: the area grows linearly in $t$, and as $t \to \infty$ the function becomes $2\pi t\,\delta(\omega)$.

::: widget plot
f: if(abs(x) < 1e-9, t/(2*pi), sin(x*t/2)^2/((x/2)^2*2*pi*t))
x: -10, 10
sliders: t=2:0.5:20:0.5
caption: The function $F_t(\omega)/2\pi t$ against $\omega$, with $t$ on the slider. Its area is always $1$. Increase $t$ and watch the central peak become taller and narrower, of width about $4\pi/t$ between its first zeros, while the side lobes shrink in relative importance. For large $t$ only final states with $\omega_{fi}$ within about $2\pi/t$ of zero contribute: the energy-conserving ones, as a delta function.
:::

## Fermi's golden rule {#golden-rule}

A single final state is rarely of interest. An atom photo-ionised by ultraviolet light, a nucleus emitting an electron in beta decay, an excited atom emitting a photon in any direction: in each case the final states form a continuum, and we want the total probability of reaching any of them.

::: theorem Fermi's golden rule {#thm-golden}
Let a constant perturbation $\hat V$ be switched on at $t = 0$, and let the final states $\lvert f\rangle$ form a continuum with **density of states** $\rho(E)$ (number of states per unit energy) near $E_i$, over which $V_{fi}$ varies slowly. For times long compared with $\hbar$ divided by the energy scale over which $\rho$ and $V_{fi}$ change, but short enough that $\lvert i\rangle$ is not appreciably depleted, the total transition probability grows linearly, $P(t) = \Gamma t$, with rate

$$
\Gamma_{i\to f} = \frac{2\pi}{\hbar}\,\lvert V_{fi}\rvert^2\,\rho(E_f)\Big\vert_{E_f = E_i}.
$$ {#eq-golden}

For a harmonic perturbation $\hat H'(t) = \hat V e^{-i\omega t} + \hat V^\dagger e^{i\omega t}$, the same holds with $\rho$ evaluated at $E_f = E_i + \hbar\omega$ (absorption, from the first term) or $E_f = E_i - \hbar\omega$ (stimulated emission, from the second, with $V^\dagger_{fi}$).
:::

::: proof
Sum [[#eq-constant]] over the final states in an energy window around $E_i$, replacing the sum by an integral with the density of states:

$$
P(t) = \int\rho(E_f)\,\frac{\lvert V_{fi}\rvert^2}{\hbar^2}\,F_t\!\left(\frac{E_f - E_i}{\hbar}\right)\dd E_f = \int\rho\,\frac{\lvert V_{fi}\rvert^2}{\hbar}\,F_t(\omega_{fi})\,\dd\omega_{fi}.
$$

For $t$ large enough that the peak of $F_t$, of width $\sim 2\pi/t$, is narrow compared with the scale on which $\rho\lvert V_{fi}\rvert^2$ varies, the slowly varying factor can be taken outside at $\omega_{fi} = 0$, and [[#eq-area]] gives

$$
P(t) = \frac{\lvert V_{fi}\rvert^2}{\hbar}\rho(E_i)\cdot2\pi t,
$$

which is [[#eq-golden]] times $t$. For the harmonic case, the amplitude from [[#eq-first-order]] is

$$
c_f = -\frac{i}{\hbar}\left[V_{fi}\frac{e^{i(\omega_{fi} - \omega)t} - 1}{i(\omega_{fi} - \omega)} + V^\dagger_{fi}\frac{e^{i(\omega_{fi} + \omega)t} - 1}{i(\omega_{fi} + \omega)}\right].
$$

For $\omega > 0$ and $t \gg 1/\omega$ only one term can be near resonance at a time; the cross term between them is not resonant and does not grow with $t$. Each term then behaves like the constant case with $\omega_{fi}$ replaced by $\omega_{fi} \mp \omega$, which moves the peak of $F_t$ to $E_f = E_i \pm \hbar\omega$.
:::

The rule is often written with a delta function, $\Gamma_{i\to f} = (2\pi/\hbar)\lvert V_{fi}\rvert^2\delta(E_f - E_i)$, to be integrated against whatever density of final states the problem has. The delta function expresses energy conservation, which emerges only for long times.

::: warning When the golden rule is not valid
Two conditions pull in opposite directions. The time must be long, $t \gg \hbar/\delta E$, where $\delta E$ is the energy range over which $\rho\lvert V\rvert^2$ changes, so that $F_t$ acts as a delta function. But first-order theory needs $\Gamma t \ll 1$. Both hold only if $\Gamma \ll \delta E/\hbar$: the decay rate must be slow compared with the spread of final energies. For a *discrete* final state, $\delta E = 0$, there is no golden rule at all: the system Rabi-oscillates, as in [[#thm-rabi]], and quoting a rate for it is a mistake.
:::

What happens after $\Gamma t$ becomes comparable with $1$? A more careful treatment (Weisskopf and Wigner, 1930) shows that the probability of remaining in $\lvert i\rangle$ decays as $e^{-\Gamma t}$, at the same rate the golden rule gives, and that the emitted energy is spread over a **Lorentzian** of full width $\hbar\Gamma$. That is the **natural linewidth**.

::: quiz
A perturbation $\hat V$ couples a discrete initial state to a continuum. If $\lvert V_{fi}\rvert$ is doubled everywhere, what happens to the decay rate and to the time after which the golden rule's linear growth sets in?
- [ ] The rate doubles; the onset time is unchanged.
- [x] The rate is multiplied by four; the onset time, set by the width of the continuum, is unchanged.
- [ ] The rate is multiplied by four, and the golden rule becomes valid sooner.
- [ ] The rate is unchanged, because the density of states has not changed.
::: solution
The rate is proportional to $\lvert V_{fi}\rvert^2$. The onset of linear growth needs $t \gg \hbar/\delta E$, which depends on how fast $\rho\lvert V\rvert^2$ varies with energy, not on its size. A larger rate makes $\Gamma t \ll 1$ fail sooner, so the window of validity of first-order theory shrinks.
:::
:::

## Atoms and light {#light}

An atom of size $a_0 \approx 0.05\,\mathrm{nm}$ in light of wavelength $\lambda \sim 500\,\mathrm{nm}$ sees an electric field that is uniform across it. In this **electric-dipole approximation** the light is a field $\boldsymbol{\mathcal E}(t) = \mathcal E_0\hat{\boldsymbol\epsilon}\cos\omega t$, and the electron of charge $-e$ at position $\mathbf r$ relative to the nucleus has

$$
\hat H'(t) = e\,\mathcal E_0\,\hat{\boldsymbol\epsilon}\cdot\hat{\mathbf r}\,\cos\omega t = -\hat{\mathbf d}\cdot\boldsymbol{\mathcal E}(t), \qquad \hat{\mathbf d} = -e\hat{\mathbf r}.
$$ {#eq-dipole}

The magnetic part of the force is smaller by the electron's speed over $c$, of order $\alpha$, and is neglected. So every transition rate involves the matrix element $\mathbf r_{fi} = \langle f\vert\hat{\mathbf r}\vert i\rangle$.

::: proposition Electric-dipole selection rules {#prop-selection}
For hydrogen-like states $\lvert nlm\rangle$ (spin unchanged), $\langle n'l'm'\vert\hat{\mathbf r}\vert nlm\rangle = 0$ unless

$$
\Delta l = l' - l = \pm1 \qquad\text{and}\qquad \Delta m = m' - m \in \{0, \pm1\}.
$$

The $z$ component connects only $\Delta m = 0$, and $x\pm iy$ connect only $\Delta m = \pm1$.
:::

::: proof
*The rule for $m$.* The components of $\hat{\mathbf r}$ have simple commutators with $\hat L_z = \hat x\hat p_y - \hat y\hat p_x$: $[\hat L_z, \hat z] = 0$ and $[\hat L_z, \hat x\pm i\hat y] = \pm\hbar(\hat x\pm i\hat y)$. Taking the matrix element of $[\hat L_z, \hat z] = 0$ between $\langle n'l'm'\rvert$ and $\lvert nlm\rangle$ gives $(m' - m)\hbar\,\langle\hat z\rangle_{fi} = 0$, so $\hat z$ connects only $m' = m$. Likewise $(m' - m \mp 1)\hbar\,\langle\hat x\pm i\hat y\rangle_{fi} = 0$, so $\hat x\pm i\hat y$ connects only $m' = m\pm1$. Every component of $\hat{\mathbf r}$ is a combination of $\hat z$ and $\hat x\pm i\hat y$, so $\Delta m \in \{0, \pm1\}$.

*The rule for $l$, partly.* Under parity $\mathbf r \to -\mathbf r$, $\lvert nlm\rangle$ is multiplied by $(-1)^l$ and $\hat{\mathbf r}$ is odd, so the matrix element is multiplied by $(-1)^{l + l' + 1}$ and must vanish unless $l + l'$ is odd. That excludes $\Delta l = 0, \pm2, \dots$. Excluding $\Delta l = \pm3, \pm5, \dots$ needs more: $\hat{\mathbf r}$ is a vector operator, so it can change angular momentum by at most one unit, by the triangle rule of angular momentum addition. An elementary proof uses the identity $[\hat L^2, [\hat L^2, \hat{\mathbf r}]] = 2\hbar^2(\hat{\mathbf r}\hat L^2 + \hat L^2\hat{\mathbf r})$; taking its matrix element gives $\bigl[(l'(l'+1) - l(l+1))^2 - 2(l'(l'+1) + l(l+1))\bigr]\langle\hat{\mathbf r}\rangle_{fi} = 0$, whose bracket factorises as $\bigl[(l' + l + 1)^2 - 1\bigr]\bigl[(l' - l)^2 - 1\bigr]$ (a standard problem in the chapter on quantum dynamics of Griffiths & Schroeter).
:::

Because the photon carries one unit of angular momentum, the selection rules are angular momentum conservation for the atom plus photon. Transitions that violate them are called **forbidden**. They are not impossible, only much slower, proceeding through magnetic-dipole or electric-quadrupole couplings or two-photon emission: hydrogen's $2s$ state, which cannot reach $1s$ by a dipole transition, lives about $0.12\,\mathrm s$ instead of nanoseconds.

::: quiz
A hydrogen atom is in the state $3d$, $m = 0$. To which of these states can it decay by a single electric-dipole photon?
- [ ] $1s$
- [ ] $2s$
- [x] $2p$, $m = 0$ and $2p$, $m = \pm1$
- [ ] $3p$
::: solution
The rule $\Delta l = \pm1$ excludes $1s$ and $2s$ ($\Delta l = -2$). From $m = 0$, $\Delta m = 0, \pm1$ reaches all three $2p$ sublevels. The $3p$ state has the same energy as $3d$ in the Coulomb approximation, so there is no photon to emit, and with fine structure the energy difference is so small that the $\omega^3$ factor makes that rate negligible. So $3d$ decays to $2p$, and $2p$ then decays to $1s$: a cascade.
:::
:::

### Absorption and stimulated emission of incoherent light

Thermal light and most lamps are not monochromatic: they contain a spread of frequencies with random phases, described by an energy density $u(\omega)$ per unit angular frequency. For each frequency component, [[#eq-dipole]] is a harmonic perturbation with $\hat V = \frac12e\mathcal E_0\,\hat{\boldsymbol\epsilon}\cdot\hat{\mathbf r}$, and near resonance the first-order probability is $\lvert V_{fi}\rvert^2F_t(\omega_{fi} - \omega)/\hbar^2$. With random phases the probabilities of different components add. The time-averaged energy density of a component is $\frac12\varepsilon_0\mathcal E_0^2$ (electric plus magnetic), so replace $\mathcal E_0^2$ by $(2/\varepsilon_0)\,u(\omega)\,\dd\omega$ and integrate with [[#eq-area]]:

$$
P(t) = \frac{e^2\lvert\hat{\boldsymbol\epsilon}\cdot\mathbf r_{fi}\rvert^2}{4\hbar^2}\cdot\frac{2}{\varepsilon_0}\,u(\omega_{fi})\cdot2\pi t = \frac{\pi e^2}{\varepsilon_0\hbar^2}\lvert\hat{\boldsymbol\epsilon}\cdot\mathbf r_{fi}\rvert^2u(\omega_{fi})\,t.
$$

For isotropic unpolarised light, average over directions of $\hat{\boldsymbol\epsilon}$: $\langle\lvert\hat{\boldsymbol\epsilon}\cdot\mathbf r_{fi}\rvert^2\rangle = \frac13\lvert\mathbf r_{fi}\rvert^2$, with $\lvert\mathbf r_{fi}\rvert^2 = \lvert x_{fi}\rvert^2 + \lvert y_{fi}\rvert^2 + \lvert z_{fi}\rvert^2$. The rate is $B\,u(\omega_{fi})$, with

$$
B = \frac{\pi e^2}{3\varepsilon_0\hbar^2}\lvert\mathbf r_{fi}\rvert^2.
$$ {#eq-einstein-B}

The same calculation applies to stimulated emission from the upper level, with the same $\lvert\mathbf r_{fi}\rvert^2$, so the two $B$ coefficients are equal (for non-degenerate levels).

### Spontaneous emission

Nothing in this calculation makes an atom decay in the dark: with $u = 0$ the rate is zero. Spontaneous emission is caused by the quantised electromagnetic field, whose vacuum fluctuations act as a perturbation even with no photons present. Remarkably, its rate can be found without quantising the field, by an argument of Einstein's.

::: theorem Einstein's relation for spontaneous emission {#thm-einstein}
Let $A$ be the rate of spontaneous emission from an upper level $b$ to a lower level $a$, both non-degenerate, with Bohr frequency $\omega_0$, and $B$ the coefficient [[#eq-einstein-B]] for absorption and stimulated emission. If atoms in thermal equilibrium with black-body radiation are to have Boltzmann populations, then

$$
A = \frac{\hbar\omega_0^3}{\pi^2c^3}B = \frac{\omega_0^3e^2\lvert\mathbf r_{ba}\rvert^2}{3\pi\varepsilon_0\hbar c^3}.
$$ {#eq-einstein-A}
:::

::: proof
Let $N_a$ and $N_b$ be the numbers of atoms in each level. In radiation of energy density $u(\omega)$, the rate equation is

$$
\deriv{N_b}{t} = -N_bA - N_bB\,u(\omega_0) + N_aB\,u(\omega_0).
$$

In equilibrium the right side vanishes, so $u(\omega_0) = A/\bigl(B(N_a/N_b - 1)\bigr)$. The Boltzmann distribution gives $N_a/N_b = e^{\hbar\omega_0/k_BT}$, so

$$
u(\omega_0) = \frac{A/B}{e^{\hbar\omega_0/k_BT} - 1}.
$$

Planck's law from [[quantum-1/origins]], written per unit angular frequency, is $u(\omega) = (\hbar\omega^3/\pi^2c^3)/(e^{\hbar\omega/k_BT} - 1)$. The two agree at every temperature if and only if $A/B = \hbar\omega_0^3/\pi^2c^3$. Multiplying by [[#eq-einstein-B]] gives the second form.
:::

The factor $\omega^3$ is why spontaneous emission dominates in the ultraviolet and is negligible at radio frequencies, and why X-ray lasers are hard to build.

::: example The lifetime of hydrogen's 2p state {#ex-lyman}
Compute the spontaneous emission rate of $2p\to1s$ in hydrogen and the lifetime of $2p$. Use $\langle100\vert\hat z\vert210\rangle = (2^7\sqrt2/3^5)\,a_0$.
::: solution
The final state $\lvert100\rangle$ has $m = 0$, so by [[#prop-selection]] from $\lvert210\rangle$ only $z$ contributes, and

$$
\lvert\mathbf r_{fi}\rvert^2 = \left(\frac{2^7\sqrt2}{3^5}\right)^2a_0^2 = \frac{2^{15}}{3^{10}}a_0^2 = 0.5549\,a_0^2.
$$

From $\lvert21,\pm1\rangle$ only $x$ and $y$ contribute, and the result for $\lvert\mathbf r_{fi}\rvert^2$ is the same, as it must be: the lifetime cannot depend on the orientation of the atom. The photon energy is $\hbar\omega_0 = \frac34\times13.606\,\mathrm{eV} = 10.204\,\mathrm{eV}$, so $\omega_0 = 1.5503\times10^{16}\,\mathrm{s^{-1}}$ and $\lambda = 2\pi c/\omega_0 = 121.5\,\mathrm{nm}$. Then [[#eq-einstein-A]] gives

$$
A = \frac{\omega_0^3e^2\lvert\mathbf r_{fi}\rvert^2}{3\pi\varepsilon_0\hbar c^3} = \frac{(1.5503\times10^{16})^3(1.6022\times10^{-19})^2(0.5549)(5.2918\times10^{-11})^2}{3\pi(8.8542\times10^{-12})(1.0546\times10^{-34})(2.9979\times10^{8})^3}\,\mathrm{s^{-1}}.
$$

Working through, $A = 6.27\times10^{8}\,\mathrm{s^{-1}}$. The $2p$ state can decay only to $1s$ (the $2s$ is at the same energy in this approximation), so its lifetime is $\tau = 1/A = 1.60\,\mathrm{ns}$, in agreement with measurement. In terms of fundamental constants the result is $A = (2/3)^8\alpha^5mc^2/\hbar$, which shows how small $\alpha^5 \approx 2\times10^{-11}$ makes atomic lifetimes long compared with the atomic period $\hbar/(mc^2\alpha^2) \approx 2.4\times10^{-17}\,\mathrm s$: the lifetime is about $7\times10^{7}$ of these atomic time units.
:::
:::

::: example The natural width of Lyman alpha {#ex-width}
Find the natural linewidth of the $2p\to1s$ line, as a frequency and as a fraction of the line's frequency.
::: solution
The excited state decays at rate $\Gamma = A = 6.27\times10^{8}\,\mathrm{s^{-1}}$, so the line is a Lorentzian of full width $\hbar\Gamma$ in energy, which is $\Gamma$ in angular frequency and

$$
\delta\nu = \frac{\Gamma}{2\pi} = \frac{6.27\times10^{8}}{2\pi}\,\mathrm{Hz} = 99.8\,\mathrm{MHz}.
$$

The line itself is at $\nu = c/\lambda = 2.467\times10^{15}\,\mathrm{Hz}$, so $\delta\nu/\nu = 4.0\times10^{-8}$. In a gas at room temperature Doppler broadening is about a hundred times larger, and laser techniques that cancel it are needed to see the natural width.
:::
:::

::: example Which Balmer-alpha components are allowed? {#ex-balmer}
Hydrogen's $\mathrm H_\alpha$ line comes from $n = 3 \to n = 2$. Ignoring spin, list which of the transitions between the sublevels $3s, 3p, 3d$ and $2s, 2p$ are electric-dipole allowed.
::: solution
The rule $\Delta l = \pm1$ allows $3s\to2p$ ($\Delta l = +1$), $3p\to2s$ ($-1$) and $3d\to2p$ ($-1$). It forbids $3s\to2s$ ($\Delta l = 0$), $3p\to2p$ ($0$) and $3d\to2s$ ($-2$). So three of the six $l$-pairs radiate. With fine structure each of them splits further, by the rule $\Delta j = 0, \pm1$, into the seven components that make up the fine structure of $\mathrm H_\alpha$. Note that $3p$ also decays to $1s$, emitting Lyman-$\beta$; [[#exr-3p]] computes that rate.
:::
:::

::: history From Einstein to the golden rule
Albert Einstein introduced the $A$ and $B$ coefficients in 1916 and 1917, deriving Planck's law from the rates of absorption, spontaneous and stimulated emission, years before there was a quantum mechanics to compute them; stimulated emission, which this argument requires, is the principle of the laser (1960). Paul Dirac developed time-dependent perturbation theory, by "variation of constants", in 1926, and in his 1927 paper on the emission and absorption of radiation quantised the electromagnetic field and derived the transition rate into a continuum, with spontaneous emission included. Victor Weisskopf and Eugene Wigner (1930) explained the exponential decay and the Lorentzian line shape. Isidor Rabi analysed spin flips in a rotating magnetic field in 1937 and built the molecular-beam magnetic resonance method on it in 1938, for which he received the 1944 Nobel Prize. The name **golden rule** is due to Enrico Fermi, whose Chicago lecture notes *Nuclear Physics* (1950) call the rate formula "Golden Rule No. 2" because it is used so often.
:::

## Where this leads {#leads}

[[quantum-2/scattering]] applies the golden rule to a particle passing a target: the rate of transitions from an incoming plane wave into outgoing plane waves in a solid angle is a cross section, and the result is the Born approximation. In [[particles/decay]] the same rule, with a phase-space density of states, gives beta-decay spectra and lifetimes. In [[condensed-matter/semiconductors]] it gives optical absorption across a band gap. And the Rabi oscillation is the elementary gate of the qubits of [[quantum-2/entanglement]].

::: summary
- Expanding $\lvert\Psi\rangle = \sum_nc_ne^{-iE_nt/\hbar}\lvert n\rangle$ turns the Schrödinger equation into $i\hbar\dot c_f = \sum_nH'_{fn}e^{i\omega_{fn}t}c_n$, exact.
- A resonantly driven two-level system Rabi-oscillates: $P = (\Omega^2/\Omega'^2)\sin^2(\Omega't/2)$ with $\Omega' = \sqrt{\Omega^2 + \Delta^2}$. A $\pi$ pulse inverts the populations.
- To first order, $c_f = -(i/\hbar)\int H'_{fi}e^{i\omega_{fi}t'}\,\dd t'$: a Fourier component at the Bohr frequency. Slow perturbations cause no transitions; sudden ones do.
- Fermi's golden rule: into a continuum, the rate is $\Gamma = (2\pi/\hbar)\lvert V_{fi}\rvert^2\rho(E_f)$, with $E_f = E_i$ or $E_i\pm\hbar\omega$. It needs a continuum and $\Gamma \ll \delta E/\hbar$.
- Electric-dipole transitions obey $\Delta l = \pm1$, $\Delta m = 0, \pm1$; others are forbidden (slow).
- Einstein's equilibrium argument gives $A = \omega^3e^2\lvert\mathbf r_{fi}\rvert^2/3\pi\varepsilon_0\hbar c^3$. For hydrogen $2p\to1s$, $A = 6.27\times10^{8}\,\mathrm{s^{-1}}$ and $\tau = 1.60\,\mathrm{ns}$.
- A decay rate $\Gamma$ makes the line a Lorentzian of full width $\Gamma$ in angular frequency: about $100\,\mathrm{MHz}$ for Lyman-$\alpha$.
:::

## Exercises {#exercises}

::: exercise A pi pulse {level=1 check="100"}
A two-level atom is driven exactly on resonance with Rabi frequency $\Omega = 2\pi\times5.00\,\mathrm{MHz}$. How long, in nanoseconds, must the drive stay on to take the atom from $\lvert g\rangle$ to $\lvert e\rangle$ with certainty?
::: solution
On resonance [[#eq-rabi]] gives $P = \sin^2(\Omega t/2)$, which first reaches $1$ at $\Omega t = \pi$:

$$
t = \frac{\pi}{\Omega} = \frac{\pi}{2\pi\times5.00\times10^{6}\,\mathrm{s^{-1}}} = 1.00\times10^{-7}\,\mathrm s = 100\,\mathrm{ns}.
$$

This assumes the excited-state lifetime is much longer than $100\,\mathrm{ns}$.
:::
:::

::: exercise A detuned drive {level=1 check="1/2"}
A two-level system is driven with detuning $\Delta$ equal to its Rabi frequency $\Omega$. What is the largest excited-state probability it ever reaches?
::: solution
The maximum of [[#eq-rabi]] is $\Omega^2/(\Omega^2 + \Delta^2) = \Omega^2/2\Omega^2 = \frac12$, reached at $\Omega't = \pi$ with $\Omega' = \sqrt2\,\Omega$. This is the half-maximum point of the resonance, so the full width at half maximum in detuning is $2\Omega$.
:::
:::

::: exercise A lifetime {level=1 check="1.595"}
Given $A = 6.268\times10^{8}\,\mathrm{s^{-1}}$ for $2p\to1s$ in hydrogen, find the lifetime of $2p$ in nanoseconds, to four significant figures, and the fraction of an initial population left after $5.00\,\mathrm{ns}$.
::: solution
$\tau = 1/A = 1/(6.268\times10^{8})\,\mathrm s = 1.595\times10^{-9}\,\mathrm s = 1.595\,\mathrm{ns}$. After $5.00\,\mathrm{ns}$ the fraction is $e^{-t/\tau} = e^{-3.134} = 0.0435$.
:::
:::

::: exercise The best pulse length {level=2 check="sqrt(2)"}
In [[#ex-kick]], hold $F_0$ and $\omega$ fixed and vary $\tau$. For which value of $\omega\tau$ is the excitation probability largest?
::: solution
$P \propto \tau^2e^{-\omega^2\tau^2/2}$. With $s = \omega\tau$, maximise $s^2e^{-s^2/2}$: the derivative is $(2s - s^3)e^{-s^2/2}$, which vanishes at $s^2 = 2$. So $\omega\tau = \sqrt2$. Very short pulses deliver too little impulse at fixed $F_0$; long pulses are adiabatic and excite nothing.
:::
:::

::: exercise The sudden approximation {level=2 check="32/(9*pi^2)"}
A particle is in the ground state of an infinite square well on $0 < x < L$. The right wall is suddenly moved to $x = 2L$, so quickly that the wavefunction has no time to change. What is the probability that a measurement of energy then finds the particle in the ground state of the new well?
::: hint
When the change is instantaneous, the state just after equals the state just before; expand it in the new eigenstates.
:::
::: solution
The old ground state is $\psi = \sqrt{2/L}\,\sin(\pi x/L)$ on $(0, L)$ and zero beyond. The new ground state is $\phi_1 = \sqrt{1/L}\,\sin(\pi x/2L)$ on $(0, 2L)$. The overlap, with $u = \pi x/L$, is

$$
\langle\phi_1\vert\psi\rangle = \frac{\sqrt2}{L}\int_0^L\sin\frac{\pi x}{L}\sin\frac{\pi x}{2L}\,\dd x = \frac{\sqrt2}{\pi}\int_0^\pi\sin u\,\sin\frac u2\,\dd u = \frac{\sqrt2}{\pi}\cdot\frac43.
$$

(The integral: $\sin u = 2\sin\frac u2\cos\frac u2$, so $\int_0^\pi2\sin^2\frac u2\cos\frac u2\,\dd u = \frac43\bigl[\sin^3\frac u2\bigr]_0^\pi = \frac43$.) The probability is $(4\sqrt2/3\pi)^2 = 32/9\pi^2 = 0.360$. The sudden limit is the opposite of the adiabatic limit, in which the particle would end in the new ground state with certainty.
:::
:::

::: exercise Selection rules in practice {level=2}
Which of the following hydrogen transitions are electric-dipole allowed: (a) $4f\to3d$; (b) $4f\to2p$; (c) $3d\to1s$; (d) $2p,m=1\to1s$ emitting light polarised along $z$; (e) $4p\to3p$? For each forbidden one, give the rule it breaks.
::: solution
(a) Allowed: $\Delta l = -1$. (b) Forbidden: $\Delta l = -2$. (c) Forbidden: $\Delta l = -2$; $3d$ decays through $2p$ instead. (d) Forbidden for that polarisation: light polarised along $z$ couples through $\hat z$, which needs $\Delta m = 0$; the $m = 1\to m = 0$ decay emits light whose dipole rotates in the $xy$ plane. (e) Forbidden: $\Delta l = 0$, which parity excludes. The principal quantum number does not enter the rules at all; any change of $n$ is allowed.
:::
:::

::: exercise Lyman beta {#exr-3p level=3 check="1.67"}
Compute the spontaneous emission rate of $3p\to1s$ in hydrogen, in units of $10^{8}\,\mathrm{s^{-1}}$. Use $R_{31}(r) = \frac{8}{27\sqrt6}\,a_0^{-3/2}\left(1 - \frac{r}{6a_0}\right)\frac{r}{a_0}e^{-r/3a_0}$ and $R_{10} = 2a_0^{-3/2}e^{-r/a_0}$.
::: hint
As in [[#ex-lyman]], $\lvert\mathbf r_{fi}\rvert^2 = \frac13\left(\int_0^\infty R_{10}R_{31}r^3\,\dd r\right)^2$. Use $\int_0^\infty\rho^ke^{-b\rho}\,\dd\rho = k!/b^{k+1}$ with $b = \frac43$.
:::
::: solution
With $\rho = r/a_0$, the product $R_{10}R_{31}r^3$ gives the radial integral

$$
\frac{16a_0}{27\sqrt6}\int_0^\infty\left(\rho^4 - \frac{\rho^5}{6}\right)e^{-4\rho/3}\,\dd\rho = \frac{16a_0}{27\sqrt6}\left[\frac{4!}{(4/3)^5} - \frac{5!}{6\,(4/3)^6}\right].
$$

Evaluate the bracket: $24/(4/3)^5 = 24\times243/1024 = 5.6953$ and $20/(4/3)^6 = 20\times729/4096 = 3.5596$, so the bracket is $2.1357$ and the integral is $\frac{16}{27\sqrt6}\times2.1357\,a_0 = 0.51669\,a_0$. Then $\lvert\mathbf r_{fi}\rvert^2 = \frac13(0.51669)^2a_0^2 = 0.088989\,a_0^2$, which is exactly $3^6/2^{13}\,a_0^2$. The photon energy is $\frac89\times13.606\,\mathrm{eV} = 12.094\,\mathrm{eV}$, so $\omega_0 = 1.8374\times10^{16}\,\mathrm{s^{-1}}$. Scaling from [[#ex-lyman]],

$$
A = 6.268\times10^{8}\,\mathrm{s^{-1}}\times\frac{0.088989}{0.55493}\times\left(\frac{12.094}{10.204}\right)^3 = 6.268\times10^{8}\times0.16036\times1.6648\,\mathrm{s^{-1}} = 1.67\times10^{8}\,\mathrm{s^{-1}}.
$$

The $3p$ state can also decay to $2s$, more slowly ($2.2\times10^{7}\,\mathrm{s^{-1}}$), so its lifetime is $1/(1.89\times10^{8}\,\mathrm{s^{-1}}) = 5.3\,\mathrm{ns}$, and Lyman-$\beta$ is emitted in $88$ per cent of decays.
:::
:::

::: exercise The Einstein relations with degeneracy {level=3}
Repeat the proof of [[#thm-einstein]] when the lower level has degeneracy $g_a$ and the upper level $g_b$, with absorption coefficient $B_{ab}$ and stimulated-emission coefficient $B_{ba}$. Show that $g_aB_{ab} = g_bB_{ba}$ and $A = (\hbar\omega_0^3/\pi^2c^3)B_{ba}$.
::: solution
The rate equation is $\dot N_b = -N_bA - N_bB_{ba}u + N_aB_{ab}u$, and in equilibrium

$$
u(\omega_0) = \frac{A}{B_{ab}N_a/N_b - B_{ba}}.
$$

The Boltzmann ratio with degeneracies is $N_a/N_b = (g_a/g_b)e^{\hbar\omega_0/k_BT}$, so

$$
u(\omega_0) = \frac{A/B_{ba}}{(g_aB_{ab}/g_bB_{ba})e^{\hbar\omega_0/k_BT} - 1}.
$$

For this to equal Planck's $(\hbar\omega_0^3/\pi^2c^3)/(e^{\hbar\omega_0/k_BT} - 1)$ at all temperatures, the coefficient of the exponential must be $1$, giving $g_aB_{ab} = g_bB_{ba}$, and the numerators must agree, giving $A = (\hbar\omega_0^3/\pi^2c^3)B_{ba}$. At high temperature, where $u \to \infty$, the populations must approach $g_a : g_b$; that limit alone forces the first relation. Since $A$ is a property of the atom and not of the radiation, the relations hold whether or not the atoms are in equilibrium.
:::
:::

::: exercise Rabi's problem without approximation {#exr-spin-rabi level=3}
A spin-$\frac12$ particle with $\hat H = -\gamma\hat{\mathbf S}\cdot\mathbf B$ is in the field $\mathbf B = B_0\hat{\mathbf z} + B_1(\cos\omega t\,\hat{\mathbf x} - \sin\omega t\,\hat{\mathbf y})$. Show by transforming to a frame rotating with the field that, starting from spin up, the probability of spin down at time $t$ is given exactly by [[#eq-rabi]], with $\omega_0 = \gamma B_0$, $\Omega = \gamma B_1$ and $\Delta = \omega - \omega_0$ (up to a sign convention for $\Delta$ that does not affect $P$).
::: hint
Write $\hat H(t) = \hat R\,\hat H(0)\,\hat R^\dagger$ with $\hat R = e^{i\omega t\hat S_z/\hbar}$, and set $\lvert\Psi\rangle = \hat R\lvert\tilde\Psi\rangle$.
:::
::: solution
Rotation about $z$ by angle $\theta$ is $\hat R = e^{-i\theta\hat S_z/\hbar}$, and $\hat R\hat S_x\hat R^\dagger = \cos\theta\,\hat S_x + \sin\theta\,\hat S_y$. With $\theta = -\omega t$ this is $\cos\omega t\,\hat S_x - \sin\omega t\,\hat S_y$, so $\hat H(t) = \hat R\hat H(0)\hat R^\dagger$ with $\hat R = e^{i\omega t\hat S_z/\hbar}$ and $\hat H(0) = -\gamma(B_0\hat S_z + B_1\hat S_x)$. Set $\lvert\Psi\rangle = \hat R\lvert\tilde\Psi\rangle$. Then

$$
i\hbar\partial_t\lvert\Psi\rangle = i\hbar\dot{\hat R}\lvert\tilde\Psi\rangle + \hat R\,i\hbar\partial_t\lvert\tilde\Psi\rangle = \hat R\hat H(0)\lvert\tilde\Psi\rangle,
$$

and $i\hbar\dot{\hat R} = -\omega\hat S_z\hat R$, so $i\hbar\partial_t\lvert\tilde\Psi\rangle = \tilde H\lvert\tilde\Psi\rangle$ with the *time-independent* $\tilde H = -(\gamma B_0 - \omega)\hat S_z - \gamma B_1\hat S_x$. In the basis $(\uparrow, \downarrow)$, with $\hat S = \frac\hbar2\boldsymbol\sigma$,

$$
\tilde H = \frac\hbar2\begin{pmatrix}-(\omega_0 - \omega) & -\Omega\\ -\Omega & \omega_0 - \omega\end{pmatrix} = -\frac\hbar2\begin{pmatrix}-\Delta & \Omega\\ \Omega & \Delta\end{pmatrix}.
$$

This has the same structure as $M$ in the proof of [[#thm-rabi]], with $(\tilde H/\hbar)^2 = \frac14(\Omega^2 + \Delta^2)\mathbb 1$, so $e^{-i\tilde Ht/\hbar} = \cos(\Omega't/2) - i(2\tilde H/\hbar\Omega')\sin(\Omega't/2)$, and the down component starting from up has modulus $(\Omega/\Omega')\lvert\sin(\Omega't/2)\rvert$. The operator $\hat R$ only multiplies the up and down components by phases, so the probability in the lab frame is the same, and it is [[#eq-rabi]] exactly. Whether the energetically lower state is "up" (here, for $\gamma > 0$) only changes which state is called $g$.
:::
:::
