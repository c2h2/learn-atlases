The atoms of a crystal are not frozen at their lattice sites. Each sits at the bottom of a potential well made by its neighbours and jiggles about it, and because the neighbours are coupled by the same forces, the jiggling is collective: a displacement of one atom pushes on the next, and the disturbance travels. The normal modes of this motion are waves running through the lattice, sound at long wavelengths and something more interesting at short ones.

Two puzzles motivate the chapter. Classical physics predicts, by equipartition, that every solid has a molar heat capacity $3R = 24.9\,\mathrm{J\,mol^{-1}\,K^{-1}}$, the law of Dulong and Petit, and at room temperature most simple solids obey it. Yet at low temperature the heat capacity of every insulator falls to zero, and for diamond it is already four times too small at room temperature. Second, a lattice is not a continuum: a wave with wavelength shorter than twice the atomic spacing has no meaning, and that cutoff must show up somewhere.

We solve both. The classical normal modes of a one-dimensional chain, first with one atom per cell and then with two, give the dispersion relation $\omega(k)$, the Brillouin zone and the distinction between acoustic and optical branches. Quantising each mode as a harmonic oscillator turns the waves into **phonons**, and the Einstein and Debye models then give the heat capacity, including the famous $T^3$ law. We use the reciprocal lattice of [[condensed-matter/crystals]], the quantum oscillator of [[quantum-1/harmonic-oscillator]] and the Bose–Einstein occupation from [[statistical-mechanics/bose-fermi]].

## The monatomic chain {#monatomic}

Consider $N$ identical atoms of mass $m$ on a line, with equilibrium positions $na$, joined to their nearest neighbours by springs of constant $K$. The springs are a model of the true interatomic potential: whatever that potential, expanding it to second order about equilibrium gives restoring forces linear in the displacements. This is the **harmonic approximation**, valid when the vibrations are small compared with $a$.

Let $u_n(t)$ be the displacement of atom $n$ from its site. The spring to the right is stretched by $u_{n+1} - u_n$ and pulls atom $n$ to the right with force $K(u_{n+1}-u_n)$; the spring to the left is stretched by $u_n - u_{n-1}$ and pulls it to the left. Newton's second law is

$$
m\,\ddot u_n = K(u_{n+1} - u_n) - K(u_n - u_{n-1}) = K(u_{n+1} + u_{n-1} - 2u_n).
$$ {#eq-chain-eom}

These are $N$ coupled linear equations, one for each atom. We look for solutions in which every atom oscillates at the same frequency with a phase that advances steadily along the chain:

$$
u_n(t) = A\,e^{i(kna - \omega t)}.
$$ {#eq-ansatz}

The real part of such a complex solution is the physical displacement. Substitute into [[#eq-chain-eom]]: the factor $A e^{i(kna-\omega t)}$ appears in every term and cancels, leaving

$$
-m\omega^2 = K\bigl(e^{ika} + e^{-ika} - 2\bigr) = 2K(\cos ka - 1) = -4K\sin^2\frac{ka}{2}.
$$

::: proposition Dispersion of the monatomic chain {#prop-monatomic}
The chain [[#eq-chain-eom]] has travelling-wave solutions [[#eq-ansatz]] if and only if

$$
\omega(k) = 2\sqrt{\frac{K}{m}}\,\Bigl\lvert\sin\frac{ka}{2}\Bigr\rvert.
$$ {#eq-mono-disp}

The highest frequency is $\omega_\mathrm{max} = 2\sqrt{K/m}$, reached at $k = \pm\pi/a$. For $\abs{ka}\ll 1$ the dispersion is linear, $\omega \approx v_s\abs k$, with speed of sound $v_s = a\sqrt{K/m}$.
:::

::: proof
The calculation above shows that [[#eq-ansatz]] solves [[#eq-chain-eom]] exactly when $m\omega^2 = 4K\sin^2(ka/2)$; taking the non-negative root gives [[#eq-mono-disp]]. Its maximum value over $k$ is $2\sqrt{K/m}$, attained when $\abs{\sin(ka/2)} = 1$, that is $ka = \pm\pi$. For small $\abs{ka}$, $\sin(ka/2)\approx ka/2$, so $\omega\approx a\sqrt{K/m}\,\abs k$.
:::

At long wavelengths the chain behaves as an elastic string: the atoms move nearly together over many spacings, the discreteness is invisible, and the wave travels at the constant speed of [[oscillations/travelling-waves]]. As $k$ grows the curve bends over. At the zone boundary neighbouring atoms move in exact antiphase, $u_{n+1} = -u_n$, and the mode is a standing wave.

### Why k is defined only modulo 2π/a

Replace $k$ by $k + 2\pi/a$ in [[#eq-ansatz]]. The displacement of atom $n$ acquires a factor $e^{i2\pi n} = 1$, so nothing changes. The two wavevectors describe *the same motion* of the atoms, because the wave is only ever sampled at the lattice points. The continuous waves $e^{ikx}$ and $e^{i(k+2\pi/a)x}$ differ between the atoms, but there is nothing between the atoms to see the difference. The shift $2\pi/a$ is a reciprocal lattice vector of the chain.

Every distinct mode is therefore represented exactly once by a wavevector in the interval $-\pi/a < k \le \pi/a$, the **first Brillouin zone** of the one-dimensional lattice: the Wigner–Seitz cell of its reciprocal lattice, as defined in [[condensed-matter/crystals]]. A wavelength shorter than $2a$ is the same as a longer one, exactly as a wheel filmed at the wrong frame rate seems to turn slowly backwards.

::: proposition Counting modes {#prop-count}
With periodic boundary conditions $u_{n+N} = u_n$, the allowed wavevectors in the first Brillouin zone are $k = 2\pi j/(Na)$ for $j$ an integer with $-N/2 < j \le N/2$. There are exactly $N$ of them, one per atom, and they are spaced uniformly with density $L/2\pi$ in $k$, where $L = Na$ is the length of the chain.
:::

::: proof
The condition $u_{n+N} = u_n$ applied to [[#eq-ansatz]] requires $e^{ikNa} = 1$, so $kNa = 2\pi j$ with $j\in\Z$. Distinct modes need distinct $k$ modulo $2\pi/a$, that is distinct $j$ modulo $N$, and the range $-N/2 < j \le N/2$ contains exactly one representative of each class. The spacing is $\Delta k = 2\pi/(Na) = 2\pi/L$.
:::

The count matters. A chain of $N$ atoms has $N$ degrees of freedom, so it must have exactly $N$ normal modes, and the Brillouin zone holds exactly that many. Periodic boundary conditions, joining the chain into a ring, are a convenience introduced by Born and von Kármán; for a long chain the boundary affects only a few modes and not the bulk properties.

### Group velocity

A wave packet built from modes near $k$ travels at the **group velocity**

$$
v_g = \deriv{\omega}{k} = a\sqrt{\frac{K}{m}}\,\cos\frac{ka}{2} \qquad (0 \le k \le \pi/a).
$$ {#eq-vgroup}

It equals $v_s$ at long wavelength and falls to zero at the zone boundary. A standing wave carries no energy; the zone-boundary mode is a reflection condition, the one-dimensional version of Bragg reflection: $2a\sin 90^\circ = \lambda = 2\pi/k$ at $k = \pi/a$.

::: example A model chain of copper atoms {#ex-chain}
Model a line of copper atoms ($m = 63.546\,\mathrm{u}$) at the nearest-neighbour distance $a = 2.556\,\text{Å}$ with spring constant $K = 20.0\,\mathrm{N/m}$. Find the maximum angular frequency, its frequency in terahertz, the energy $\hbar\omega_\mathrm{max}$ in meV, and the speed of sound.
::: solution
The mass is $m = 63.546\times1.66054\times10^{-27} = 1.0552\times10^{-25}\,\mathrm{kg}$, so

$$
\sqrt{K/m} = \sqrt{\frac{20.0}{1.0552\times10^{-25}}} = 1.3767\times10^{13}\,\mathrm{s^{-1}}, \qquad \omega_\mathrm{max} = 2\sqrt{K/m} = 2.753\times10^{13}\,\mathrm{rad/s}.
$$

The frequency is $\omega_\mathrm{max}/2\pi = 4.38\,\mathrm{THz}$, and

$$
\hbar\omega_\mathrm{max} = (1.05457\times10^{-34})(2.753\times10^{13})\,\mathrm{J} = 2.904\times10^{-21}\,\mathrm{J} = 18.1\,\mathrm{meV}.
$$

The speed of sound is $v_s = a\sqrt{K/m} = (2.556\times10^{-10})(1.3767\times10^{13}) = 3.52\times10^{3}\,\mathrm{m/s}$. Real copper has a longitudinal sound speed of $4.76\,\mathrm{km/s}$ and phonon energies up to about $30\,\mathrm{meV}$, measured by neutron scattering, so a spring of a few tens of newtons per metre is the right size. Notice the scales: lattice vibrations live at terahertz frequencies and tens of meV, which corresponds to temperatures $\hbar\omega/k_B$ of a few hundred kelvin. That is why quantum effects in the heat capacity show up below room temperature.
:::
:::

## The diatomic chain {#diatomic}

Now let the chain alternate between atoms of mass $m_1$ and $m_2$, still joined by springs $K$, as in a line through rock salt. The repeat distance, the lattice constant, is now $a$, with two atoms per cell spaced $a/2$ apart. Label the displacements $u_n$ (mass $m_1$) and $v_n$ (mass $m_2$) in cell $n$. Atom $u_n$ has neighbours $v_n$ and $v_{n-1}$; atom $v_n$ has neighbours $u_n$ and $u_{n+1}$:

$$
m_1\ddot u_n = K(v_n + v_{n-1} - 2u_n), \qquad m_2\ddot v_n = K(u_{n+1} + u_n - 2v_n).
$$ {#eq-diatomic-eom}

Try $u_n = A\,e^{i(kna-\omega t)}$ and $v_n = B\,e^{i(kna-\omega t)}$, with possibly different complex amplitudes. Substituting and cancelling the common exponential gives a pair of linear equations for $A$ and $B$:

$$
\begin{aligned}
(2K - m_1\omega^2)\,A - K(1 + e^{-ika})\,B &= 0, \\
-K(1 + e^{ika})\,A + (2K - m_2\omega^2)\,B &= 0.
\end{aligned}
$$

A nonzero solution requires the determinant to vanish:

$$
(2K - m_1\omega^2)(2K - m_2\omega^2) - K^2\abs{1 + e^{ika}}^2 = 0.
$$

Since $\abs{1+e^{ika}}^2 = 2 + 2\cos ka = 4\cos^2(ka/2)$, this is a quadratic in $\omega^2$: $m_1m_2\omega^4 - 2K(m_1+m_2)\omega^2 + 4K^2\sin^2(ka/2) = 0$.

::: theorem Acoustic and optical branches {#thm-diatomic}
For each $k$ in the first Brillouin zone $-\pi/a < k \le \pi/a$, the diatomic chain has two normal-mode frequencies,

$$
\omega_\pm^2 = K\Bigl(\frac{1}{m_1} + \frac{1}{m_2}\Bigr) \pm K\sqrt{\Bigl(\frac{1}{m_1}+\frac{1}{m_2}\Bigr)^2 - \frac{4\sin^2(ka/2)}{m_1m_2}}.
$$ {#eq-diatomic-disp}

The lower branch $\omega_-$, the **acoustic branch**, vanishes linearly at $k = 0$. The upper branch $\omega_+$, the **optical branch**, has $\omega_+(0) = \sqrt{2K(1/m_1+1/m_2)}$. If $m_1 > m_2$, then at the zone boundary $\omega_- = \sqrt{2K/m_1}$ and $\omega_+ = \sqrt{2K/m_2}$, and no mode has a frequency between these values.
:::

::: proof
Divide the quadratic by $m_1m_2$ and solve by the formula: with $\mu^{-1} = 1/m_1 + 1/m_2$,

$$
\omega^2 = \frac{K}{\mu} \pm\sqrt{\frac{K^2}{\mu^2} - \frac{4K^2\sin^2(ka/2)}{m_1m_2}},
$$

which is [[#eq-diatomic-disp]]. The square root is real because $(1/m_1+1/m_2)^2 - 4/(m_1m_2) = (1/m_1 - 1/m_2)^2 \ge 0$, and both roots are non-negative because the root is at most $K/\mu$. At $k = 0$ the root equals $K/\mu$, giving $\omega_-=0$ and $\omega_+^2 = 2K/\mu$. For small $k$, expand $\sqrt{X^2 - \delta}\approx X - \delta/2X$ with $X = K/\mu$ and $\delta = K^2k^2a^2/(m_1m_2)$: then $\omega_-^2\approx \delta/(2X) = Kk^2a^2/(2(m_1+m_2))$, linear in $k$. At $k = \pi/a$, $\sin^2(ka/2) = 1$ and the root is $K\abs{1/m_2 - 1/m_1}$; for $m_1 > m_2$ the two roots are $\omega^2 = 2K/m_1$ and $2K/m_2$. Finally $\omega_-$ increases and $\omega_+$ decreases with $\abs k$ on $[0,\pi/a]$, because $\sin^2(ka/2)$ increases there, so the range of $\omega_-$ is $[0,\sqrt{2K/m_1}]$, the range of $\omega_+$ is $[\sqrt{2K/m_2},\sqrt{2K/\mu}]$, and the interval between is empty.
:::

The names describe the motion. On the acoustic branch near $k=0$ the first equation gives $B\approx A$: both atoms of a cell move together, and the wave is sound. On the optical branch at $k = 0$ it gives $m_1A + m_2B = 0$: the two atoms move against each other with their centre of mass at rest. In an ionic crystal such as $\mathrm{NaCl}$ that motion is an oscillating electric dipole, and it couples strongly to infrared light of the same frequency, hence "optical". The frequency gap is a genuine feature of a lattice with a basis: waves in that range cannot propagate and are reflected, a mechanical version of the electronic band gaps of [[condensed-matter/band-structure]].

::: widget plot
f: sqrt((1 + 1/M) - sqrt(max((1 + 1/M)^2 - 4*sin(pi*x/2)^2/M, 0))); sqrt((1 + 1/M) + sqrt(max((1 + 1/M)^2 - 4*sin(pi*x/2)^2/M, 0)))
x: -1, 1
y: 0, 2.1
labels: acoustic; optical
sliders: M=1:0.2:5:0.05
caption: The two branches of the diatomic chain, $\omega$ in units of $\sqrt{K/m_2}$, against $x = ka/\pi$ across the first Brillouin zone, for mass ratio $M = m_1/m_2$. At $M = 1$ the gap closes and the curves are the monatomic dispersion "folded" into a zone half the size, since the cell has been doubled for no reason. Increase $M$: a gap opens at the zone boundary between $\sqrt{2/M}$ and $\sqrt2$, the acoustic branch flattens and the optical branch narrows towards the frequency of the light atom vibrating between fixed heavy ones.
:::

::: example Branch frequencies of a rock-salt chain {#ex-nacl-chain}
A chain alternates $\mathrm{Cl}$ ($m_1 = 35.45\,\mathrm{u}$) and $\mathrm{Na}$ ($m_2 = 22.99\,\mathrm{u}$) with $K = 30.0\,\mathrm{N/m}$. Find the top of the acoustic branch, the bottom of the optical branch and the optical frequency at $k=0$, in THz.
::: solution
The masses are $5.887\times10^{-26}\,\mathrm{kg}$ and $3.818\times10^{-26}\,\mathrm{kg}$. By [[#thm-diatomic]], with $m_1 > m_2$,

$$
\omega_-(\pi/a) = \sqrt{\frac{2K}{m_1}} = 3.193\times10^{13}\,\mathrm{s^{-1}}, \qquad \omega_+(\pi/a) = \sqrt{\frac{2K}{m_2}} = 3.964\times10^{13}\,\mathrm{s^{-1}},
$$

and

$$
\omega_+(0) = \sqrt{2K\Bigl(\frac1{m_1} + \frac1{m_2}\Bigr)} = 5.090\times10^{13}\,\mathrm{s^{-1}}.
$$

Dividing by $2\pi$, the acoustic branch ends at $5.08\,\mathrm{THz}$, the optical branch runs from $6.31$ to $8.10\,\mathrm{THz}$, and nothing propagates between $5.08$ and $6.31\,\mathrm{THz}$. Notice that $\omega_+(0)^2 = \omega_-(\pi/a)^2 + \omega_+(\pi/a)^2$, an identity of the model. The real transverse optical frequency of $\mathrm{NaCl}$ is about $4.9\,\mathrm{THz}$, a wavelength of $61\,\mu\mathrm m$ in the far infrared, where rock salt is strongly reflecting; a one-dimensional chain is a cartoon of a three-dimensional crystal, but the order of magnitude is right.
:::
:::

### Three dimensions

In a three-dimensional crystal with $p$ atoms per primitive cell the same analysis, with a $3p\times3p$ matrix in place of the $2\times2$ one, gives $3p$ branches $\omega_s(\mathbf k)$ for $\mathbf k$ in the first Brillouin zone. Three are acoustic, with $\omega\to0$ as $\mathbf k\to0$: in each, a uniform translation of the crystal is approached, and there are three independent directions to translate. Near $\mathbf k = 0$ one is **longitudinal**, with displacements along $\mathbf k$, and two are **transverse**; the longitudinal one is faster. The remaining $3p-3$ branches are optical. A crystal of $N$ cells has $3pN$ modes in all, one per degree of freedom. Copper, with one atom per cell, has only acoustic branches; silicon, with two, has three optical branches as well.

::: quiz
At the boundary of the Brillouin zone of the monatomic chain, $k = \pi/a$, what is the group velocity of the lattice wave?
- [ ] The speed of sound $a\sqrt{K/m}$.
- [ ] Twice the speed of sound.
- [x] Zero: the mode is a standing wave.
- [ ] It is undefined, because $k = \pi/a$ is not an allowed wavevector.
::: solution
From [[#eq-vgroup]], $v_g = a\sqrt{K/m}\cos(ka/2)$, which vanishes at $ka = \pi$. Neighbouring atoms move in antiphase, and the waves travelling right and left, at $k$ and $k - 2\pi/a = -k$, are the same mode, so the motion is a standing wave. It is Bragg reflection of the lattice wave by the lattice itself. The wavevector $\pi/a$ is allowed: it lies on the zone boundary and is counted once.
:::
:::

## Phonons {#phonons}

The harmonic crystal, in normal coordinates, is a set of independent oscillators, one for each mode $(\mathbf k, s)$. That decoupling, true classically, remains true in quantum mechanics. Each oscillator has the energy levels of [[quantum-1/harmonic-oscillator]], so the energy of the crystal is

$$
E = \sum_{\mathbf k, s}\hbar\omega_s(\mathbf k)\Bigl(n_{\mathbf k s} + \frac12\Bigr), \qquad n_{\mathbf k s} = 0, 1, 2, \dots
$$ {#eq-phonon-energy}

::: definition Phonon {#def-phonon}
A **phonon** is a quantum of vibrational energy $\hbar\omega_s(\mathbf k)$ in the normal mode $(\mathbf k, s)$ of a crystal. The integer $n_{\mathbf k s}$ is the number of phonons in that mode. The vector $\hbar\mathbf k$, defined modulo $\hbar\mathbf G$, is the phonon's **crystal momentum**.
:::

The language of particles is more than a metaphor. Phonons can be created and destroyed one at a time, for instance by a neutron that scatters inelastically and loses exactly $\hbar\omega$ of energy, and the conservation of energy and crystal momentum in such events is how dispersion curves are measured. Crystal momentum, however, is not true momentum: a uniform mode with $\mathbf k \ne 0$ carries no net momentum of the atoms, and it is conserved only up to a reciprocal lattice vector, because $\mathbf k$ and $\mathbf k + \mathbf G$ are the same mode.

The number of quanta in a mode is not fixed. Phonons are bosons whose number is set by temperature, so their chemical potential is zero, and in thermal equilibrium the mean occupation is the Bose–Einstein distribution derived in [[statistical-mechanics/bose-fermi]]:

$$
\langle n\rangle = \frac{1}{e^{\hbar\omega/k_BT} - 1}.
$$ {#eq-bose}

The mean energy of one mode is then $\hbar\omega(\langle n\rangle + \frac12)$. At high temperature, $k_BT\gg\hbar\omega$, the occupation is $\approx k_BT/\hbar\omega$ and the mean energy tends to $k_BT$, the classical equipartition value for an oscillator. At low temperature the occupation is exponentially small: the mode is **frozen out**.

::: example How many phonons? {#ex-occupation}
A mode has $\hbar\omega = 30.0\,\mathrm{meV}$. Find its mean phonon number at $300\,\mathrm K$ and at $77\,\mathrm K$.
::: solution
At $300\,\mathrm K$, $k_BT = 25.85\,\mathrm{meV}$, so $\hbar\omega/k_BT = 1.1605$ and

$$
\langle n\rangle = \frac{1}{e^{1.1605} - 1} = \frac{1}{3.1915 - 1} = 0.456.
$$

At $77\,\mathrm K$, $k_BT = 6.635\,\mathrm{meV}$, the ratio is $4.521$, and $\langle n\rangle = 1/(e^{4.521}-1) = 0.0110$. Cooling by a factor of four reduces the phonon population of this mode by a factor of $40$. A classical oscillator would have lost only a factor of four in energy. This exponential freezing of the high-frequency modes is the whole explanation of the low-temperature heat capacity.
:::
:::

## The heat capacity of an insulator {#heat-capacity}

The thermal energy of the lattice is the sum over modes of $\hbar\omega\langle n\rangle$, and the heat capacity is its temperature derivative. For one mode,

$$
c(\omega, T) = \deriv{}{T}\,\frac{\hbar\omega}{e^{\hbar\omega/k_BT}-1} = k_B\,\frac{x^2 e^x}{(e^x - 1)^2}, \qquad x = \frac{\hbar\omega}{k_BT}.
$$ {#eq-mode-c}

This rises from $0$ to $k_B$ as $T$ increases through $\hbar\omega/k_B$. All the physics is in the distribution of the mode frequencies, and the two classic models make opposite simplifications.

### Einstein's model

Einstein, in 1907, gave all $3N$ modes of a crystal of $N$ atoms the same frequency $\omega_E$, and defined the **Einstein temperature** $\Theta_E = \hbar\omega_E/k_B$. The heat capacity is $3N$ times [[#eq-mode-c]]:

$$
C_E = 3Nk_B\,\frac{(\Theta_E/T)^2\,e^{\Theta_E/T}}{\bigl(e^{\Theta_E/T}-1\bigr)^2}.
$$ {#eq-einstein}

At high temperature this tends to $3Nk_B$, which per mole is $3R$, the Dulong–Petit law. At low temperature it falls as $e^{-\Theta_E/T}$. For diamond, Einstein fitted $\Theta_E = 1320\,\mathrm K$; at $300\,\mathrm K$, where $\Theta_E/T = 4.40$, [[#eq-einstein]] gives $C_E = 0.244\times3R = 6.08\,\mathrm{J\,mol^{-1}\,K^{-1}}$, close to the measured $6.1$. That single fit was the first application of quantum theory to a solid, and it explained why stiff, light solids violate Dulong and Petit at room temperature. But the exponential fall is too fast. Measured heat capacities of insulators vanish as $T^3$, and the reason is that a real crystal always has acoustic modes of arbitrarily low frequency, which no temperature can freeze out completely.

### Debye's model

Debye, in 1912, kept the low-frequency modes right. He replaced every branch by a linear dispersion $\omega = v\abs{\mathbf k}$, with one average speed of sound $v$ for all three acoustic polarisations, and replaced the Brillouin zone by a sphere of the same volume, so that it still holds $N$ wavevectors.

In a cube of side $L$ with periodic boundary conditions, the allowed wavevectors form a cubic grid of spacing $2\pi/L$, the three-dimensional version of [[#prop-count]], so each occupies a volume $(2\pi/L)^3 = (2\pi)^3/V$ of $\mathbf k$-space. The number with $\abs{\mathbf k} < k$ is $\frac43\pi k^3\cdot V/(2\pi)^3$, and with three polarisations the number of modes with frequency below $\omega$ is

$$
\mathcal N(\omega) = 3\cdot\frac{V}{(2\pi)^3}\cdot\frac{4\pi}{3}\Bigl(\frac{\omega}{v}\Bigr)^3 = \frac{V\omega^3}{2\pi^2v^3}.
$$

Its derivative is the **density of states** $g(\omega) = \dd\mathcal N/\dd\omega = 3V\omega^2/(2\pi^2v^3)$. The cutoff, the **Debye frequency** $\omega_D$, is fixed by requiring $3N$ modes in total, $\mathcal N(\omega_D) = 3N$:

$$
\omega_D = v\,(6\pi^2 n)^{1/3}, \qquad \Theta_D = \frac{\hbar\omega_D}{k_B}, \qquad n = \frac NV.
$$ {#eq-debye-freq}

::: theorem Debye heat capacity {#thm-debye}
In the Debye model the heat capacity of $N$ atoms is

$$
C_D = 9Nk_B\Bigl(\frac{T}{\Theta_D}\Bigr)^3\int_0^{\Theta_D/T}\frac{x^4 e^x}{(e^x-1)^2}\,\dd x.
$$ {#eq-debye}

For $T\gg\Theta_D$ it tends to $3Nk_B$. For $T\ll\Theta_D$,

$$
C_D \approx \frac{12\pi^4}{5}\,Nk_B\Bigl(\frac{T}{\Theta_D}\Bigr)^3.
$$ {#eq-debye-t3}
:::

::: proof
Sum [[#eq-mode-c]] over modes using the density of states:

$$
C_D = \int_0^{\omega_D} g(\omega)\,k_B\frac{x^2e^x}{(e^x-1)^2}\,\dd\omega, \qquad x = \frac{\hbar\omega}{k_BT}.
$$

From [[#eq-debye-freq]], $3V/(2\pi^2 v^3) = 9N/\omega_D^3$, so $g(\omega) = 9N\omega^2/\omega_D^3$. Change variable to $x$, with $\omega = k_BTx/\hbar$ and $\dd\omega = (k_BT/\hbar)\,\dd x$; the upper limit becomes $\hbar\omega_D/k_BT = \Theta_D/T$. Then

$$
C_D = \frac{9Nk_B}{\omega_D^3}\Bigl(\frac{k_BT}{\hbar}\Bigr)^3\int_0^{\Theta_D/T}\frac{x^4e^x}{(e^x-1)^2}\,\dd x,
$$

and $(k_BT/\hbar\omega_D)^3 = (T/\Theta_D)^3$ gives [[#eq-debye]]. At high temperature the upper limit is small; there $x^2e^x/(e^x-1)^2 = 1 - x^2/12 + \dots\to1$, the integral is $\approx\frac13(\Theta_D/T)^3$, and $C_D\to3Nk_B$. At low temperature the upper limit may be taken to infinity, since the integrand decays as $x^4e^{-x}$. Integrating by parts, with $\dd\bigl(-1/(e^x-1)\bigr) = e^x/(e^x-1)^2\,\dd x$,

$$
\int_0^\infty\frac{x^4e^x}{(e^x-1)^2}\,\dd x = \Bigl[-\frac{x^4}{e^x-1}\Bigr]_0^\infty + 4\int_0^\infty\frac{x^3}{e^x-1}\,\dd x = 4\cdot\frac{\pi^4}{15},
$$

where the boundary terms vanish and $\int_0^\infty x^3/(e^x-1)\,\dd x = \Gamma(4)\zeta(4) = 6\cdot\pi^4/90 = \pi^4/15$, the integral of the Stefan–Boltzmann law. Multiplying, $9\cdot 4\pi^4/15 = 12\pi^4/5$, which is [[#eq-debye-t3]].
:::

The $T^3$ law is exact at low temperature for any crystal, not only in the model, because only modes with $\hbar\omega\lesssim k_BT$ are excited, and at low enough temperature those all lie on the linear part of the acoustic branches. The number of excited modes grows as the volume of a sphere of radius $k_BT/\hbar v$ in $\mathbf k$-space, $\propto T^3$, each with energy $\sim k_BT$, so $U\propto T^4$ and $C\propto T^3$. The same argument for photons gives the Stefan–Boltzmann law; phonons are a "black body" of sound with a cutoff.

::: widget plot
f: 3*x^3*sum(((k - 0.5)/(80*x))^4*exp((k - 0.5)/(80*x))/(exp((k - 0.5)/(80*x)) - 1)^2, k, 1, 80)/(80*x); (r/x)^2*exp(r/x)/(exp(r/x) - 1)^2; 4*pi^4/5*x^3
x: 0.02, 1.5
y: 0, 1.1
labels: Debye; Einstein; T³ law
sliders: r=0.75:0.3:1.2:0.01
caption: Heat capacity divided by the classical $3Nk_B$, against $x = T/\Theta_D$. The Debye curve is computed from [[#eq-debye]]; the Einstein curve has $\Theta_E = r\,\Theta_D$, and $r \approx 0.75$ makes the two agree at high temperature. Both approach $1$, Dulong and Petit, above $T\approx\Theta_D$. Now look below $x = 0.1$: the Einstein curve collapses exponentially while the Debye curve follows the $T^3$ law. Adjust $r$ and notice that no Einstein temperature can reproduce the low-temperature tail.
:::

::: example The heat capacity of copper at 10 K {#ex-copper-t3}
The Debye temperature of copper, from low-temperature measurements, is $\Theta_D = 343\,\mathrm K$. Find the lattice heat capacity per mole at $10\,\mathrm K$ and compare it with $3R$.
::: solution
At $T/\Theta_D = 10/343 = 0.0292$ we are deep in the $T^3$ regime, so [[#eq-debye-t3]] with $Nk_B = R$ applies:

$$
C = \frac{12\pi^4}{5}R\Bigl(\frac{T}{\Theta_D}\Bigr)^3 = 233.78\times8.3145\,\mathrm{J\,mol^{-1}\,K^{-1}}\times\Bigl(\frac{10}{343}\Bigr)^3.
$$

The prefactor is $1943.8\,\mathrm{J\,mol^{-1}\,K^{-1}}$ and the cube is $2.478\times10^{-5}$, so

$$
C = 0.0482\,\mathrm{J\,mol^{-1}\,K^{-1}}.
$$

This is $0.19\%$ of $3R = 24.94\,\mathrm{J\,mol^{-1}\,K^{-1}}$. Doubling the temperature to $20\,\mathrm K$ multiplies it by $8$, to $0.385\,\mathrm{J\,mol^{-1}\,K^{-1}}$. In copper at $10\,\mathrm K$ the conduction electrons contribute about $7\,\mathrm{mJ\,mol^{-1}\,K^{-1}}$ more, linear in $T$; we compute that in [[condensed-matter/free-electrons]]. A plot of $C/T$ against $T^2$ separates the two contributions as intercept and slope.
:::
:::

::: example The Debye temperature from the speed of sound {#ex-debye-sound}
In polycrystalline copper the longitudinal and transverse sound speeds are $v_L = 4760\,\mathrm{m/s}$ and $v_T = 2325\,\mathrm{m/s}$, and the atom density is $n = 8.49\times10^{28}\,\mathrm{m^{-3}}$. Estimate $\Theta_D$.
::: solution
The Debye model uses one speed for three polarisations. The low-frequency density of states is correct if that speed is the average that reproduces the count of modes, $3/v^3 = 1/v_L^3 + 2/v_T^3$:

$$
\frac{3}{v^3} = \frac{1}{(4760)^3} + \frac{2}{(2325)^3} = 9.27\times10^{-12} + 1.591\times10^{-10}\ \mathrm{s^3/m^3},
$$

so $v = 2612\,\mathrm{m/s}$. The slow transverse waves dominate the average. Then $(6\pi^2n)^{1/3} = 1.713\times10^{10}\,\mathrm{m^{-1}}$ and by [[#eq-debye-freq]]

$$
\Theta_D = \frac{\hbar v\,(6\pi^2 n)^{1/3}}{k_B} = \frac{(1.05457\times10^{-34})(2612)(1.713\times10^{10})}{1.38065\times10^{-23}}\,\mathrm K = 342\,\mathrm K.
$$

The calorimetric value is $343\,\mathrm K$. The agreement is better than the model deserves, but it is not an accident: at low temperature the heat capacity depends only on the acoustic modes near $\mathbf k = 0$, which are the sound waves, and those are exactly what an ultrasonic measurement probes. For aluminium the same estimate is about $7\%$ low (Exercise at the end), since the real dispersion bends away from linear more strongly.
:::
:::

::: warning The Debye temperature is not a melting point
$\Theta_D$ is a frequency in disguise: it marks where the highest-frequency modes become classically excited, and so where Dulong and Petit begins to hold. It says nothing about stability. Lead has $\Theta_D = 105\,\mathrm K$ and melts at $601\,\mathrm K$; diamond has $\Theta_D = 2230\,\mathrm K$. Nor should [[#eq-debye-t3]] be used near or above $\Theta_D$. At $T = 30\,\mathrm K$ for copper, $T/\Theta_D = 0.087$, and the $T^3$ formula is still within about $1\%$ of [[#eq-debye]]; at $T = \Theta_D/5$ it is already $70\%$ too high, and at room temperature it gives $1300\,\mathrm{J\,mol^{-1}\,K^{-1}}$ for copper, fifty-five times the truth.
:::

### Beyond the harmonic crystal

The harmonic approximation makes the normal modes independent forever: a phonon, once created, would never decay, and a pulse of heat would cross a perfect crystal at the speed of sound. Real interatomic potentials are not exactly quadratic. The cubic and higher terms in the expansion couple the modes, so phonons scatter off one another, and two consequences follow that the harmonic model cannot produce.

The first is **thermal expansion**. In a quadratic well the mean position does not depend on the amplitude of vibration, so a harmonic crystal does not expand when heated. An asymmetric well, steeper on compression than on extension, shifts the mean separation outwards as the vibrations grow.

The second is a finite **thermal conductivity**. Treat the phonons as a gas and borrow the kinetic-theory result of [[thermodynamics/kinetic-theory]]: a gas of carriers with heat capacity $C$ per unit volume, speed $v$ and mean free path $\ell$ conducts heat with

$$
\kappa = \frac13\,C\,v\,\ell.
$$ {#eq-kappa}

In an insulator the mean free path is set by phonon–phonon collisions, by impurities and isotopes, and at low temperature by the walls of the sample. Not every collision resists the heat flow. A collision that conserves crystal momentum exactly cannot relax a flow of phonons; only those in which the total $\mathbf k$ changes by a reciprocal lattice vector, called **umklapp** processes by Peierls in 1929, do. They need phonons with wavevectors comparable to the zone size, whose number falls as $e^{-\Theta_D/bT}$ with $b$ of order $2$, so the conductivity of a pure crystal rises steeply on cooling until the sample boundaries take over.

::: example The phonon mean free path in silicon {#ex-silicon-mfp}
At $300\,\mathrm K$ silicon has thermal conductivity $\kappa = 148\,\mathrm{W\,m^{-1}\,K^{-1}}$ and heat capacity $C = 1.64\times10^{6}\,\mathrm{J\,m^{-3}\,K^{-1}}$ per unit volume. Taking an average acoustic speed $v = 6.0\,\mathrm{km/s}$, estimate the phonon mean free path from [[#eq-kappa]].
::: solution
Solving for $\ell$,

$$
\ell = \frac{3\kappa}{Cv} = \frac{3\times148}{(1.64\times10^6)(6.0\times10^3)}\,\mathrm m = 4.5\times10^{-8}\,\mathrm m = 45\,\mathrm{nm}.
$$

That is about eighty lattice constants. The estimate is crude: the heat is carried mostly by slower, long-wavelength phonons whose mean free paths are much longer than the average, up to micrometres, which is why the thermal conductivity of silicon films only a few hundred nanometres thick is measurably reduced. It is a design constraint for microelectronics, where the heat of billions of transistors must escape through such films.
:::
:::

::: quiz
In the Debye model, why does the heat capacity fall as $T^3$ rather than exponentially as in Einstein's model?
- [ ] Because the Debye cutoff $\omega_D$ is higher than $\omega_E$.
- [x] Because acoustic modes with arbitrarily low frequency exist, and their number below $k_BT/\hbar$ grows as $T^3$.
- [ ] Because phonons in the Debye model are fermions.
- [ ] Because the Debye model includes the optical branches.
::: solution
Einstein's single frequency freezes out completely once $k_BT\ll\hbar\omega_E$. In the Debye model, as in a real crystal, the acoustic branches start at $\omega = 0$, so at any temperature some modes remain classically excited. Those with $\hbar\omega < k_BT$ fill a sphere in $\mathbf k$-space of radius $\propto T$, hence $\propto T^3$ of them, each contributing about $k_B$. Phonons are bosons, and the Debye model has no optical branches at all.
:::
:::

::: history Heat capacities and the first quantum solid
Pierre Louis Dulong and Alexis Thérèse Petit announced in 1819 that the product of specific heat and atomic weight is nearly the same for many solid elements. By the 1870s Heinrich Weber had found that carbon, boron and silicon fall far below the rule and approach it only when hot. In 1907 Albert Einstein, applying Planck's quantum hypothesis to the vibrations of atoms, derived [[#eq-einstein]] and fitted Weber's diamond data with one parameter. In 1912 Peter Debye treated the solid as an elastic continuum with a cutoff and obtained the $T^3$ law; in the same year Max Born and Theodore von Kármán set up the lattice dynamics of a discrete crystal, with periodic boundary conditions, which is the approach of this chapter. The quantum of lattice vibration was introduced by Igor Tamm in 1930, and the name "phonon" was suggested by Yakov Frenkel. Dispersion curves were first measured by inelastic neutron scattering in the 1950s, notably by Bertram Brockhouse, who shared the 1994 Nobel Prize for it.
:::

## Where this leads {#leads}

Phonons are everywhere in what follows. They scatter electrons and so set the temperature dependence of the resistance of a metal in [[condensed-matter/free-electrons]], and the attraction they mediate between electrons is the origin of conventional superconductivity in [[condensed-matter/magnetism-superconductivity]]. Beyond the harmonic approximation, phonons collide with each other; those collisions limit the thermal conductivity of insulators and produce thermal expansion. The same mathematics of coupled oscillators, normal modes and their quantisation describes spin waves in magnets and, in field theory, every free particle. The general theory of normal modes is in [[oscillations/superposition]] and the statistics of bosons in [[statistical-mechanics/bose-fermi]].

::: summary
- In the harmonic approximation a chain of atoms has wave solutions with $\omega = 2\sqrt{K/m}\,\abs{\sin(ka/2)}$; the wave is linear (sound) at small $k$ and a standing wave at the zone boundary.
- Wavevectors differing by a reciprocal lattice vector describe the same motion, so all modes lie in the first Brillouin zone, which holds exactly one $k$ per primitive cell.
- A basis of $p$ atoms gives $3$ acoustic and $3p-3$ optical branches; with two masses a frequency gap opens between $\sqrt{2K/m_1}$ and $\sqrt{2K/m_2}$.
- Each mode is a quantum oscillator; its quanta, phonons, obey Bose–Einstein statistics with zero chemical potential.
- Einstein's single frequency explains the departure from Dulong–Petit but falls exponentially at low $T$.
- Debye's linear dispersion with a cutoff $\Theta_D$ gives $C = \frac{12\pi^4}{5}Nk_B(T/\Theta_D)^3$ at low temperature and $3Nk_B$ at high temperature.
:::

## Exercises {#exercises}

::: exercise The top of the band {level=1 check="4.38"}
A monatomic chain has atoms of mass $63.546\,\mathrm u$ and springs $K = 20.0\,\mathrm{N/m}$. Find the highest vibration frequency $f_\mathrm{max} = \omega_\mathrm{max}/2\pi$ in THz.
::: solution
By [[#prop-monatomic]], $\omega_\mathrm{max} = 2\sqrt{K/m}$. With $m = 1.0552\times10^{-25}\,\mathrm{kg}$, $\sqrt{K/m} = 1.3767\times10^{13}\,\mathrm{s^{-1}}$, so $\omega_\mathrm{max} = 2.7534\times10^{13}\,\mathrm{s^{-1}}$ and $f_\mathrm{max} = 4.38\,\mathrm{THz}$, as in [[#ex-chain]]. The lattice spacing does not enter: the zone-boundary frequency depends only on the spring and the mass.
:::
:::

::: exercise Lead at 5 kelvin {level=1 check="0.210"}
Lead has $\Theta_D = 105\,\mathrm K$. Use the Debye $T^3$ law to find its molar heat capacity at $5.00\,\mathrm K$, in $\mathrm{J\,mol^{-1}\,K^{-1}}$.
::: solution
$T/\Theta_D = 0.04762$, well inside the low-temperature regime. Then

$$
C = 1943.8\times(0.04762)^3 = 1943.8\times1.0798\times10^{-4} = 0.210\,\mathrm{J\,mol^{-1}\,K^{-1}}.
$$

At the same temperature copper, with $\Theta_D = 343\,\mathrm K$, would have $1943.8\times(5/343)^3 = 0.0060$, thirty-five times less: soft, heavy lead has many more low-frequency modes.
:::
:::

::: exercise Dulong and Petit for aluminium {level=1 check="0.9245"}
Aluminium has molar mass $26.9815\,\mathrm{g/mol}$. What specific heat capacity, in $\mathrm{J\,g^{-1}\,K^{-1}}$, does the Dulong–Petit law predict?
::: solution
The molar value is $3R = 3\times8.31446 = 24.943\,\mathrm{J\,mol^{-1}\,K^{-1}}$. Per gram, $24.943/26.9815 = 0.9245\,\mathrm{J\,g^{-1}\,K^{-1}}$. The measured value at $25\,^\circ\mathrm C$ is $0.897$; aluminium, with $\Theta_D = 428\,\mathrm K$, is not quite classical at room temperature, and $C_p$ also exceeds $C_V$ slightly.
:::
:::

::: exercise Counting branches {level=2 check="12"}
Strontium titanate, $\mathrm{SrTiO_3}$, has the cubic perovskite structure with five atoms in the primitive cell. How many optical phonon branches does it have?
::: solution
With $p = 5$ atoms per cell there are $3p = 15$ branches in all. Three are acoustic, so $15 - 3 = 12$ are optical. In $\mathrm{SrTiO_3}$ a zone-boundary optical mode softens towards zero frequency as the crystal is cooled to $105\,\mathrm K$, where its structure changes, and the transverse optical mode at $\mathbf k = 0$ softens almost to zero at the lowest temperatures; such "soft modes" are the lattice-dynamical signature of structural phase transitions.
:::
:::

::: exercise Zone-boundary gap {level=2 check="sqrt(2)"}
In a diatomic chain with $m_1 = 2m_2$, find the ratio $\omega_+/\omega_-$ of the two frequencies at the zone boundary.
::: solution
By [[#thm-diatomic]], at $k = \pi/a$ with $m_1 > m_2$, $\omega_- = \sqrt{2K/m_1}$ and $\omega_+ = \sqrt{2K/m_2}$. The ratio is

$$
\frac{\omega_+}{\omega_-} = \sqrt{\frac{m_1}{m_2}} = \sqrt2 \approx 1.414.
$$

The gap closes only when the masses are equal. The heavy atoms alone vibrate in the acoustic zone-boundary mode, with the light ones at rest, and the light atoms alone in the optical one; check this by putting $\omega^2 = 2K/m_1$ into the first equation of the amplitude pair, which then forces $B = 0$ because $1 + e^{-i\pi} = 0$.
:::
:::

::: exercise Debye temperature of aluminium {level=2 check="399"}
Aluminium has density $2.70\,\mathrm{g/cm^3}$, molar mass $26.9815\,\mathrm{g/mol}$, and sound speeds $v_L = 6420\,\mathrm{m/s}$, $v_T = 3040\,\mathrm{m/s}$. Estimate $\Theta_D$ in kelvin as in [[#ex-debye-sound]].
::: solution
The atom density is $n = \rho N_A/M = 2700\times6.02214\times10^{23}/0.0269815 = 6.026\times10^{28}\,\mathrm{m^{-3}}$. The mean speed from $3/v^3 = 1/v_L^3 + 2/v_T^3$ is $v = 3420\,\mathrm{m/s}$. Then $(6\pi^2n)^{1/3} = 1.527\times10^{10}\,\mathrm{m^{-1}}$ and

$$
\Theta_D = \frac{\hbar v(6\pi^2n)^{1/3}}{k_B} = 399\,\mathrm K.
$$

The calorimetric value is $428\,\mathrm K$. The discrepancy is a reminder that $\Theta_D$ is a fitted parameter of a model, and that values obtained in different ways, or at different temperatures, need not agree.
:::
:::

::: exercise Sound in the diatomic chain {level=3}
Show that the acoustic branch of the diatomic chain has speed of sound $v_s = a\sqrt{K/(2(m_1+m_2))}$, where $a$ is the length of the two-atom cell. Check that this agrees with the monatomic result when $m_1 = m_2 = m$.
::: solution
The proof of [[#thm-diatomic]] gave, for small $k$, $\omega_-^2 \approx Kk^2a^2/(2(m_1+m_2))$, so $\omega_- \approx v_s\abs k$ with $v_s = a\sqrt{K/(2(m_1+m_2))}$. To check it independently, the chain is at long wavelength an elastic string of mass per length $\lambda = (m_1+m_2)/a$ and tension-like stiffness: two springs $K$ in series across one cell give an effective spring $K/2$ over length $a$, i.e. a modulus $Ka/2$, and $v_s = \sqrt{(Ka/2)/\lambda} = a\sqrt{K/(2(m_1+m_2))}$. With equal masses the atoms are spaced $a/2$ apart, and the monatomic formula with spacing $a/2$ gives $(a/2)\sqrt{K/m} = a\sqrt{K/(4m)}$, which is the same as $a\sqrt{K/(2\cdot2m)}$.
:::
:::

::: exercise The high-temperature correction {level=3}
Show that for $T\gg\Theta_D$ the Debye heat capacity is $C_D \approx 3Nk_B\bigl[1 - \frac{1}{20}(\Theta_D/T)^2\bigr]$.
::: hint
Expand $x^2e^x/(e^x-1)^2$ to order $x^2$; it is an even function of $x$.
:::
::: solution
Write $x^2e^x/(e^x-1)^2 = x^2/(4\sinh^2(x/2))$. With $\sinh y = y(1 + y^2/6 + \dots)$, $\sinh^2(x/2) = (x^2/4)(1 + x^2/12 + \dots)$, so the ratio is $1 - x^2/12 + O(x^4)$. With $u = \Theta_D/T$ small,

$$
\int_0^u\Bigl(x^2 - \frac{x^4}{12}\Bigr)\dd x = \frac{u^3}{3} - \frac{u^5}{60}.
$$

Multiplying by $9Nk_B/u^3$ from [[#eq-debye]] gives $C_D \approx 9Nk_B\bigl(\frac13 - \frac{u^2}{60}\bigr) = 3Nk_B\bigl(1 - \frac{u^2}{20}\bigr)$. At $T = \Theta_D$ the correction formula gives $0.95$, and the exact value of [[#eq-debye]] is $0.952$; the classical limit is approached quickly.
:::
:::

::: exercise The density of states of a chain {level=3}
For the monatomic chain of $N$ atoms and length $L$, show that the density of states is $g(\omega) = \dfrac{2N}{\pi}\dfrac{1}{\sqrt{\omega_\mathrm{max}^2 - \omega^2}}$ for $0 < \omega < \omega_\mathrm{max}$, and verify that it integrates to $N$.
::: solution
By [[#prop-count]] the wavevectors are spaced $2\pi/L$, so the number in $\dd k$ is $(L/2\pi)\,\dd k$. Each frequency below $\omega_\mathrm{max}$ arises from two wavevectors, $\pm k$, so $g(\omega)\,\dd\omega = 2(L/2\pi)\,\dd k$ and $g = (L/\pi)/(\dd\omega/\dd k)$. From [[#eq-vgroup]], $\dd\omega/\dd k = (a\omega_\mathrm{max}/2)\cos(ka/2)$, and $\cos(ka/2) = \sqrt{1 - \omega^2/\omega_\mathrm{max}^2}$, so

$$
g(\omega) = \frac{L}{\pi}\cdot\frac{2}{a\sqrt{\omega_\mathrm{max}^2-\omega^2}} = \frac{2N}{\pi\sqrt{\omega_\mathrm{max}^2-\omega^2}}.
$$

Then $\int_0^{\omega_\mathrm{max}} g\,\dd\omega = (2N/\pi)\arcsin(1) = N$. The density of states diverges at $\omega_\mathrm{max}$, where the group velocity vanishes: a **van Hove singularity**. In three dimensions such points give kinks rather than divergences, and they are visible in measured phonon spectra.
:::
:::
