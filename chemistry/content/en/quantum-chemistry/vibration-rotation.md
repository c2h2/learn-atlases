Shine infrared light on hydrogen chloride gas and it does not absorb smoothly: it absorbs in a comb of sharp lines, spaced by a few tens of $\mathrm{cm^{-1}}$, with a dark gap exactly where the band centre should be. Cool the gas and the comb contracts; substitute deuterium for hydrogen and the whole pattern shifts by a factor you can predict from a table of atomic masses. Every one of those details — line positions, spacings, intensities, isotope shifts — follows from two exactly solvable quantum systems: the **harmonic oscillator**, which is what a chemical bond looks like when it is stretched a little, and the **rigid rotor**, which is what a molecule looks like when it tumbles. This lesson solves both, and in doing so supplies the quantum machinery that [[spectroscopy/rotational-spectroscopy]] and [[spectroscopy/vibrational-spectroscopy]] spend their time using: energy levels, selection rules, and the Boltzmann statistics that decide which lines are strong and which are missing.

## The bond as a spring: the harmonic oscillator

Near its equilibrium separation $R_\mathrm{e}$ any potential energy curve is flat to first order, so the Taylor expansion $V(R) = V(R_\mathrm{e}) + \tfrac{1}{2}k(R - R_\mathrm{e})^{2} + \cdots$ begins with a quadratic term: Hooke's law, with force constant $k$ the curvature of the electronic energy surface at the bottom of the well. Two atoms of masses $m_1$ and $m_2$ then vibrate along the bond as a single particle of the **reduced mass** $\mu = m_1 m_2/(m_1 + m_2)$ — the same device that reduced the two-body box in [[quantum-chemistry/model-systems]], and the reason a spectroscopist can tell $\mathrm{HCl}$ from $\mathrm{DCl}$ without touching the electronic structure.

::: definition The vibrational harmonic oscillator {#def-ho}
The **harmonic oscillator** is the system with potential $V(x) = \tfrac{1}{2}kx^{2}$, where $x = R - R_\mathrm{e}$ is the displacement from equilibrium and $k = \left(\mathrm{d}^{2}V/\mathrm{d}R^{2}\right)_\mathrm{e} > 0$ is the force constant. Its classical angular frequency is $\omega = \sqrt{k/\mu}$, with $\mu$ the reduced mass of the two nuclei; for a polyatomic molecule each normal coordinate carries its own $\omega$, and the oscillator below is one normal mode.
:::

::: proposition Harmonic oscillator energy levels {#prop-ho-levels}
The stationary states of the harmonic oscillator have energies and wavefunctions
$$
E_v = \left(v + \tfrac{1}{2}\right)\hbar\omega, \qquad
\psi_v(x) = N_v\,H_v\!\left(\frac{x}{\alpha}\right) \mathrm{e}^{-x^{2}/2\alpha^{2}}, \qquad
\alpha = \sqrt{\frac{\hbar}{\mu\omega}} ,
$$ {#eq-ho-levels}
with $v = 0, 1, 2, \ldots$, $H_v$ the Hermite polynomials, and $N_v$ normalisation constants. The levels are equally spaced by $\hbar\omega$, the lowest level is *not* zero but $\tfrac{1}{2}\hbar\omega$ — the **zero-point energy** — and $\psi_v$ has $v$ nodes and parity $(-1)^{v}$.
:::

::: proof Solving the oscillator equation {#proof-ho}
The time-independent Schrödinger equation $-\frac{\hbar^{2}}{2\mu}\psi'' + \tfrac{1}{2}kx^{2}\psi = E\psi$ becomes dimensionless with $y = x/\alpha$ and $\varepsilon = 2E/\hbar\omega$: $\psi''(y) + (2\varepsilon - y^{2})\psi = 0$. For $y \to \pm\infty$ the equation tends to $\psi'' = y^{2}\psi$, whose acceptable solution decays as $\mathrm{e}^{-y^{2}/2}$; write $\psi = H(y)\,\mathrm{e}^{-y^{2}/2}$ and find $H'' - 2yH' + (2\varepsilon - 1)H = 0$. Trying $H = \sum_j c_j y^{j}$ gives the two-term recursion $c_{j+2} = \dfrac{2j + 1 - 2\varepsilon}{(j+2)(j+1)}\,c_j$. If the series does not terminate, $c_{j+2}/c_j \to 2/j$, which is the coefficient ratio of $\mathrm{e}^{y^{2}}$ — the wavefunction would diverge as $\mathrm{e}^{+y^{2}/2}$ and could not be normalised. Normalisability therefore *forces* the series to stop: $2\varepsilon - 1 = 2v$ for some non-negative integer $v$, giving $\varepsilon = v + \tfrac{1}{2}$, i.e. $E_v = (v+\tfrac{1}{2})\hbar\omega$, and $H$ becomes the Hermite polynomial $H_v$ of degree $v$. Quantisation here is not postulated: it is the price of square-integrability. (The same spectrum follows in two lines from ladder operators: $\hat H = \hbar\omega(\hat a^{\dagger}\hat a + \tfrac{1}{2})$ with $[\hat a, \hat a^{\dagger}] = 1$.) For the quadratic potential the virial theorem gives $\langle \hat T \rangle = \langle \hat V \rangle = \tfrac{1}{2}E_v$: at the zero-point level the molecule keeps $\tfrac{1}{4}\hbar\omega$ of purely kinetic energy — it cannot lie still at the bottom, for localising it there would, by the uncertainty principle of [[quantum-chemistry/quantum-foundations]], buy more kinetic energy than the spring saves.
:::

Zero-point energy is not a bookkeeping curiosity. The dissociation energy measured from the ground vibrational level is $D_0 = D_\mathrm{e} - \tfrac{1}{2}\hbar\omega + \cdots$, so every tabulated bond energy already carries the zero-point correction; helium, the lightest atom in the weakest well, has a zero-point energy larger than its lattice energy at ambient pressure and so never freezes no matter how cold the bath (only pressurising to $25\ \mathrm{bar}$ or more forces the solid). In the laboratory, zero-point differences of a few $\mathrm{kJ\,mol^{-1}}$ between $\mathrm{X{-}H}$ and $\mathrm{X{-}D}$ bonds are the thermodynamic engine of hydrogen–deuterium fractionation, of the heavy-water effect, and of the equilibrium isotope effects that ride on the kinetic ones in [[kinetics/transition-state-theory]].

::: example Zero-point energy and the vibrational temperature of HCl {#ex-zpe-hcl}
Hydrogen chloride vibrates with $\tilde\nu = 2990\ \mathrm{cm^{-1}}$. Find its zero-point energy in $\mathrm{kJ\,mol^{-1}}$ and decide whether the vibration is thermally excited at $\mathrm{300\ K}$.
::: solution
The zero-point energy is half a quantum: $\tfrac{1}{2}\times 2990\ \mathrm{cm^{-1}} = 1495\ \mathrm{cm^{-1}}$. Converting with $N_\mathrm{A}hc = 0.011\,963\ \mathrm{kJ\,mol^{-1}}$ per $\mathrm{cm^{-1}}$,
$$
E_0 = 1495 \times 0.011\,963 = 17.9\ \mathrm{kJ\,mol^{-1}} .
$$
The level spacing corresponds to a vibrational temperature $\Theta_\mathrm{vib} = hc\tilde\nu/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K} \times 2990\ \mathrm{cm^{-1}} = 4300\ \mathrm{K}$, so the Boltzmann population ratio of the first excited level at $\mathrm{300\ K}$ is $\mathrm{e}^{-4300/300} = 6\times10^{-7}$: essentially every $\mathrm{HCl}$ molecule sits in $v = 0$ at room temperature, and infrared absorption starts from the ground state. Vibration is frozen; rotation, as we shall see, is not.
:::
:::

The wavefunctions in equation [[#eq-ho-levels]] deserve a moment's inspection. The ground state is a Gaussian of width $\alpha = \sqrt{\hbar/\mu\omega}$ — the heavier the pair or the stiffer the spring, the narrower the packet — and its probability density peaks at the equilibrium bond length, where the *classical* oscillator spends the *least* time. For $v = 1$ the density has a node at $x = 0$; for large $v$ the quantum density develops $v + 1$ maxima and, averaged over a few fringes, reproduces the classical U-shaped distribution that piles probability up at the turning points. Those turning points are themselves instructive: at $x = \pm\sqrt{2E_v/k}$ the kinetic energy would have to be negative, yet $\psi_v$ leaks into the forbidden region by roughly $\alpha$ — the same evanescent tail that made tunnelling possible in [[quantum-chemistry/model-systems]].

::: example The force constant of hydrogen chloride {#ex-force-const}
With $\tilde\nu = 2990\ \mathrm{cm^{-1}}$ for $\mathrm{H^{35}Cl}$, compute the bond force constant $k$.
::: solution
Reduce the two masses to one: with $m(\mathrm{H}) = 1.0078\ \mathrm{u}$ and $m(^{35}\mathrm{Cl}) = 34.969\ \mathrm{u}$,
$$
\mu = \frac{1.0078 \times 34.969}{1.0078 + 34.969}\ \mathrm{u} = 0.9796\ \mathrm{u} = 1.627\times10^{-27}\ \mathrm{kg}.
$$
The angular frequency is $\omega = 2\pi c\tilde\nu = 2\pi \times 2.998\times10^{10}\ \mathrm{cm\,s^{-1}} \times 2990\ \mathrm{cm^{-1}} = 5.63\times10^{14}\ \mathrm{s^{-1}}$, so
$$
k = \mu\omega^{2} = 1.627\times10^{-27} \times \left(5.63\times10^{14}\right)^{2} = 516\ \mathrm{N\,m^{-1}} .
$$
A macroscopic comparison: a steel wire of guitar-string thickness has $k$ of order $10^{3}\ \mathrm{N\,m^{-1}}$ per bond cross-section, so chemical bonds are stiff on the scale of things you can hold — and yet $516\ \mathrm{N\,m^{-1}}$ corresponds to only $0.185\ \mathrm{eV}$ of restoring energy at the zero-point amplitude.
:::
:::

::: example Deuterium substitution: predicting the HCl→DCl shift {#ex-dcl}
Predict the fundamental vibration of $\mathrm{D^{35}Cl}$ from that of $\mathrm{H^{35}Cl}$ ($2990\ \mathrm{cm^{-1}}$), given $m(\mathrm{D}) = 2.0141\ \mathrm{u}$.
::: solution
The Born–Oppenheimer approximation makes the potential — hence $k$ — a property of the electrons alone, so replacing H by D changes $\mu$ and nothing else:
$$
\mu(\mathrm{DCl}) = \frac{2.0141 \times 34.969}{2.0141 + 34.969} = 1.9044\ \mathrm{u},
\qquad
\frac{\tilde\nu(\mathrm{DCl})}{\tilde\nu(\mathrm{HCl})} = \sqrt{\frac{\mu(\mathrm{HCl})}{\mu(\mathrm{DCl})}} = \sqrt{\frac{0.9796}{1.9044}} = 0.7172 .
$$
Hence $\tilde\nu(\mathrm{DCl}) = 2990 \times 0.7172 = 2144\ \mathrm{cm^{-1}}$. The observed fundamental is $2087\ \mathrm{cm^{-1}}$: the $2.7\,\%$ shortfall is anharmonicity, which scales roughly as the *square* of the frequency ratio ($\omega_\mathrm{e}x_\mathrm{e} \approx 53 \times 0.7172^{2} = 27\ \mathrm{cm^{-1}}$ for DCl, and the fundamental sits $2\omega_\mathrm{e}x_\mathrm{e}$ below $\omega_\mathrm{e}$). The heavier partner simply moves more slowly on the same surface, and the residual discrepancy measures how much of that surface is not parabolic.
:::
:::

::: warning Isotopes change masses, not potentials {#warn-isotope}
The frequency ratio $\sqrt{\mu'/\mu}$ assumes the force constant is identical for the two isotopologues — true to one part in $10^{4}$ under Born–Oppenheimer, because the nuclei differ only in mass. Two errors follow from forgetting this. First, treating an isotope shift as evidence about $k$ (it is evidence about $\mu$, hence about *which atoms* move, which is exactly why the shift identifies the vibrating bond). Second, assuming the zero-point *energy* is unchanged: it is not — $\mathrm{DCl}$ sits $0.07\ \mathrm{eV}$ lower in its well than $\mathrm{HCl}$, which is why $\mathrm{C{-}D}$ bonds are slightly stronger and break slightly slower, the thermodynamic half of the kinetic isotope effect.
:::

## Selection rules: which vibrations absorb light

Absorption of radiation is electric-dipole coupling: the oscillating field pushes on the molecular charge distribution, and the transition rate is proportional to $|\boldsymbol{\mu}_\mathrm{fi}|^{2}$, the square of the **transition dipole moment** $\boldsymbol{\mu}_\mathrm{fi} = \int \psi_\mathrm{f}^{*}\,\hat{\boldsymbol{\mu}}\,\psi_\mathrm{i}\,\mathrm{d}\tau$ between initial and final states. Both halves of that sentence carry a selection rule.

::: proposition Vibrational selection rules {#prop-vib-sel}
Expand the dipole moment along a normal coordinate $Q$: $\mu(Q) = \mu_0 + \left(\partial\mu/\partial Q\right)_0 Q + \cdots$. Then, within the harmonic approximation,
$$
\Delta v = \pm 1 \quad\text{with intensity}\quad \propto \left(\frac{\partial \mu}{\partial Q}\right)_0^{2},
$$
so a vibration absorbs infrared light **if and only if** it changes the dipole moment: homonuclear diatomics ($\mathrm{N_2}$, $\mathrm{O_2}$) are infrared-silent, $\mathrm{HCl}$ and $\mathrm{CO}$ are active, and $\mathrm{CO_2}$ absorbs through its asymmetric stretch and bends but not its symmetric stretch. Overtones $\Delta v = \pm 2, \pm 3$ are strictly forbidden for the harmonic oscillator and appear weakly only through anharmonicity.
:::

::: proof The selection rule from ladder operators {#proof-vib-sel}
The constant term $\mu_0$ contributes $\mu_0\int\psi_{v'}^{*}\psi_v\,\mathrm{d}x = \mu_0\delta_{v'v}$: no transition. The linear term contributes $\left(\partial\mu/\partial Q\right)_0$ times $\int\psi_{v'}^{*} x\,\psi_v\,\mathrm{d}x$. Write the position operator with ladder operators, $x = \sqrt{\hbar/2\mu\omega}\,(\hat a^{\dagger} + \hat a)$, and use $\hat a\,|v\rangle = \sqrt{v}\,|v-1\rangle$, $\hat a^{\dagger}|v\rangle = \sqrt{v+1}\,|v+1\rangle$:
$$
\langle v'|\,x\,|v\rangle = \sqrt{\frac{\hbar}{2\mu\omega}}\left(\sqrt{v}\,\delta_{v',\,v-1} + \sqrt{v+1}\,\delta_{v',\,v+1}\right),
$$
which vanishes unless $v' = v \pm 1$. The same result in one line from parity: $\psi_{v'}^{*} x\,\psi_v$ has parity $(-1)^{v'}(-1)(-1)^{v}$, which is odd — hence integrates to zero — unless $v'$ and $v$ differ by an odd integer; combined with the recursion above, only $\pm 1$ survive. Absorption ($v \to v+1$) dominates at room temperature because, as [[#ex-zpe-hcl]] showed, essentially all population sits in $v = 0$.
:::

::: quiz Infrared activity
Which of these vibrations is infrared-*inactive*?
- [ ] The asymmetric stretch of $\mathrm{CO_2}$ ($\sim 2349\ \mathrm{cm^{-1}}$).
- [x] The symmetric stretch of $\mathrm{CO_2}$ ($\sim 1333\ \mathrm{cm^{-1}}$).
- [ ] The stretch of $\mathrm{HCl}$.
- [ ] The bend of $\mathrm{H_2O}$.
::: solution
In the symmetric stretch the two $\mathrm{C{=}O}$ bonds lengthen together; their opposing bond-dipole changes cancel, $\left(\partial\mu/\partial Q\right)_0 = 0$, and the mode is infrared-silent (though Raman-active, where the relevant derivative is of the polarisability). The asymmetric stretch keeps a changing dipole; $\mathrm{HCl}$ has a permanent dipole that grows and shrinks with $R$; water's bend changes its dipole. This is why carbon dioxide is a greenhouse gas and nitrogen, three-quarters of the atmosphere, is not: $\mathrm{N_2}$'s stretch changes nothing a photon can feel.
:::
:::

## Anharmonicity: the Morse potential

A harmonic bond would never break: $V \to \infty$. Real curves flatten toward the dissociation limit $D_\mathrm{e}$, and the standard analytic stand-in is the Morse potential.

::: definition The Morse potential {#def-morse}
The **Morse potential** is $V(x) = D_\mathrm{e}\!\left(1 - \mathrm{e}^{-ax}\right)^{2}$ with $x = R - R_\mathrm{e}$, well depth $D_\mathrm{e}$ and range parameter $a$ fixed by the curvature, $a = \omega\sqrt{\mu/2D_\mathrm{e}}$. Its vibrational term values, to the accuracy the model supports, are
$$
G(v) = \omega_\mathrm{e}\!\left(v + \tfrac{1}{2}\right) - \omega_\mathrm{e}x_\mathrm{e}\!\left(v + \tfrac{1}{2}\right)^{2},
\qquad
\omega_\mathrm{e}x_\mathrm{e} = \frac{\omega_\mathrm{e}^{2}}{4D_\mathrm{e}} \;\text{(in wavenumbers)},
$$ {#eq-morse}
so the spacing between successive levels *shrinks* linearly with $v$ until the levels merge into the continuum at $v_\mathrm{max} \approx \omega_\mathrm{e}/2\omega_\mathrm{e}x_\mathrm{e} - \tfrac{1}{2}$.
:::

::: widget plot
f: 16.1*x^2; de*(1-exp(-1.87*x))^2
x: -1.2, 2.5
y: 0, 6
sliders: de=4.6:2:8:0.1
labels: \text{harmonic}; \text{Morse}
caption: Harmonic (parabola) and Morse potentials for $\mathrm{HCl}$ in $\mathrm{eV}$ against displacement $x$ in $\mathrm{\AA}$; the depth `de` of the Morse well is set by the slider. The two coincide within about $0.15\ \mathrm{\AA}$ of equilibrium — the region the $v = 0$ and $v = 1$ levels actually explore — and part company beyond: the parabola climbs for ever, the Morse curve flattens to its dissociation limit. Slide `de` deeper and watch the two curves hug each other longer: stiffer, deeper wells are more nearly harmonic, which is why $\mathrm{H_2}$ ($\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$) is well described by equation [[#eq-ho-levels]] while $\mathrm{I_2}$ is not.
:::

::: warning D₀, Dₑ and the sign of ωₑxₑ {#warn-d0-de}
Three conventions collide here. $D_\mathrm{e}$ is the depth of the *potential* from its minimum; $D_0$ is the dissociation energy from the $v = 0$ level, $D_0 = D_\mathrm{e} - G(0)$, and tables of "bond dissociation energies" mean $D_0$. The anharmonicity constant $\omega_\mathrm{e}x_\mathrm{e}$ is a *positive* number that enters equation [[#eq-morse]] with a minus sign — writing $G(v) = \omega_\mathrm{e}(v+\tfrac12) + \omega_\mathrm{e}x_\mathrm{e}(v+\tfrac12)^2$ is a sign error that makes levels diverge instead of converge. And a Morse curve fitted to $\omega_\mathrm{e}, \omega_\mathrm{e}x_\mathrm{e}$ is not the true potential: it overestimates $D_0$ by several per cent for $\mathrm{H_2}$ and worse for shallow wells, because its long-range tail ($\mathrm{e}^{-2ax}$ decay) is not the true van der Waals tail.
:::

::: example The dissociation energy of H₂ from its spectrum {#ex-h2-morse}
For $\mathrm{H_2}$, $\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$ and $\omega_\mathrm{e}x_\mathrm{e} = 121\ \mathrm{cm^{-1}}$. Estimate $D_\mathrm{e}$ and $D_0$ and compare with the measured $D_0 = 36\,118\ \mathrm{cm^{-1}} = 4.48\ \mathrm{eV}$.
::: solution
From equation [[#eq-morse]], $\omega_\mathrm{e}x_\mathrm{e} = \omega_\mathrm{e}^{2}/4D_\mathrm{e}$, so
$$
D_\mathrm{e} = \frac{\omega_\mathrm{e}^{2}}{4\,\omega_\mathrm{e}x_\mathrm{e}} = \frac{4401^{2}}{4 \times 121} = 40\,018\ \mathrm{cm^{-1}} = 4.96\ \mathrm{eV},
$$
and subtracting the zero-point term $G(0) = \tfrac{1}{2}\omega_\mathrm{e} - \tfrac{1}{4}\omega_\mathrm{e}x_\mathrm{e} = 2200.5 - 30.3 = 2170\ \mathrm{cm^{-1}}$ gives
$$
D_0 = 40\,018 - 2170 = 37\,848\ \mathrm{cm^{-1}} = 4.69\ \mathrm{eV}.
$$
The Morse estimate sits $4.7\,\%$ above the measured value — the whole vibrational ladder of $\mathrm{H_2}$ is only mildly anharmonic, yet the extrapolation still overshoots, exactly as [[#warn-d0-de]] warns, because the Morse tail is too steep. The procedure of summing observed level spacings to the dissociation limit is the **Birge–Sponner extrapolation**; for $\mathrm{H_2}$, where spacings are measured for all fifteen bound levels, it converges to the true value, while for most molecules one extrapolates after two or three terms and trusts the answer to a few per cent.
:::
:::

## Angular momentum and the rigid rotor

Rotation is governed by angular momentum, whose quantum theory is worth stating once, because it reappears in the hydrogen atom ([[quantum-chemistry/hydrogen-atom]]), in term symbols, and in every selection rule of this and the next course. The three components of $\hat{\mathbf{L}} = \hat{\mathbf{r}} \times \hat{\mathbf{p}}$ do not commute with each other ($[\hat L_x, \hat L_y] = \mathrm{i}\hbar \hat L_z$), so at most one component can be sharp at a time — but $\hat L^{2}$ commutes with all of them, and the pair $\hat L^{2}, \hat L_z$ has simultaneous eigenfunctions.

::: proposition Quantised angular momentum {#prop-amom}
The simultaneous eigenfunctions of $\hat L^{2}$ and $\hat L_z$ are the spherical harmonics $Y_{J M}(\theta,\phi)$ with eigenvalues
$$
\hat L^{2} Y_{JM} = J(J+1)\,\hbar^{2}\,Y_{JM}, \qquad
\hat L_z Y_{JM} = M\hbar\,Y_{JM}, \qquad
J = 0, 1, 2, \ldots, \quad M = -J, \ldots, +J .
$$
The magnitude of the angular momentum is $\hbar\sqrt{J(J+1)}$ — never $J\hbar$ exactly — and its $z$-component takes $2J+1$ equally spaced values: space itself is quantised into $2J+1$ orientations.
:::

::: definition The rigid rotor {#def-rotor}
The **rigid rotor** is two masses held a fixed distance $r$ apart, rotating about their centre of mass with moment of inertia $I = \mu r^{2}$. Its Hamiltonian is $\hat H = \hat L^{2}/2I$, so its states are the spherical harmonics and its energies are
$$
E_J = \frac{\hbar^{2}}{2I}J(J+1) = hc\,\tilde B\,J(J+1), \qquad
\tilde B = \frac{h}{8\pi^{2} c I},
$$ {#eq-rotor}
each level $(2J+1)$-fold degenerate in $M$. In wavenumbers, with $\mu$ in atomic mass units and $r$ in ångström, $\tilde B / \mathrm{cm^{-1}} = 16.8576 / \left(\mu/\mathrm{u}\right)\!\left(r/\mathrm{\AA}\right)^{2}$.
:::

Three contrasts with the box are worth naming. The rotor has *no zero-point energy*: $J = 0$ is allowed, with $E = 0$ and a totally delocalised orientation $\psi = Y_{00} = (4\pi)^{-1/2}$ — a rotating molecule need not rotate, because a state of exactly zero angular momentum is compatible with the uncertainty principle (all three components are sharp at zero). The levels grow as $J(J+1)$, not $J^{2}$, so the spacing $2\tilde B(J+1)$ widens with $J$. And the energies are tiny: $\tilde B$ is $1.9\ \mathrm{cm^{-1}}$ for $\mathrm{CO}$ and $10.6\ \mathrm{cm^{-1}}$ for $\mathrm{HCl}$, a thousand times below vibrational spacings, which is why rotation lives in the microwave and far-infrared.

::: example Bond length from a microwave line {#ex-co-bond}
The $J = 1 \leftarrow 0$ absorption of $^{12}\mathrm{C}^{16}\mathrm{O}$ lies at $3.862\ \mathrm{cm^{-1}}$ ($115.8\ \mathrm{GHz}$). Find the bond length, and predict the same line for $^{13}\mathrm{CO}$.
::: solution
The transition energy is $E_1 - E_0 = 2\tilde B$, so $\tilde B = 1.931\ \mathrm{cm^{-1}}$. Invert equation [[#eq-rotor]] with $\mu(^{12}\mathrm{C}^{16}\mathrm{O}) = 12.000 \times 15.995 / 27.995 = 6.856\ \mathrm{u}$:
$$
r^{2} = \frac{16.8576}{\tilde B\,\mu} = \frac{16.8576}{1.931 \times 6.856}\ \mathrm{\AA^{2}} = 1.273\ \mathrm{\AA^{2}}
\qquad\Longrightarrow\qquad r = 1.128\ \mathrm{\AA},
$$
the equilibrium $\mathrm{C{\equiv}O}$ bond length to three figures. For $^{13}\mathrm{CO}$, $\mu = 7.172\ \mathrm{u}$ and, since the electrons and hence the potential are unchanged, $r$ is unchanged: $\tilde B = 16.8576/(7.172 \times 1.273) = 1.846\ \mathrm{cm^{-1}}$, line at $3.69\ \mathrm{cm^{-1}}$. A single microwave line thus measures a bond length to $0.001\ \mathrm{\AA}$ — the rotational spectrum is the most precise ruler in structural chemistry.
:::
:::

::: proposition Rotational selection rule {#prop-rot-sel}
A rigid rotor absorbs or emits a photon with $\Delta J = \pm 1$ ($\Delta M = 0, \pm 1$), and only if the molecule has a **permanent dipole moment**. Pure rotational spectra are therefore seen for $\mathrm{HCl}$, $\mathrm{CO}$, $\mathrm{H_2O}$ — never for $\mathrm{N_2}$, $\mathrm{CO_2}$ (in its equilibrium geometry) or $\mathrm{CH_4}$.
:::

::: proof Why ΔJ = ±1 and why a dipole is needed {#proof-rot-sel}
The interaction operator is $-\hat{\boldsymbol{\mu}}\cdot\mathbf{E}$; for a rotor with fixed-length dipole $\mu$ the laboratory-frame components are $\mu\cos\theta$, $\mu\sin\theta\,\mathrm{e}^{\pm\mathrm{i}\phi}$ times constants. The transition moment $\int Y_{J'M'}^{*}\,f(\theta,\phi)\,Y_{JM}\,\mathrm{d}\Omega$ then involves $f$ being $\cos\theta \propto Y_{10}$ or $\sin\theta\,\mathrm{e}^{\pm\mathrm{i}\phi} \propto Y_{1,\pm1}$: it is an integral of *three* spherical harmonics, which vanishes unless the triangle condition $|J - 1| \le J' \le J + 1$ holds — and the $J' = J$ case vanishes by the parity of $Y_{1q}$ (equivalently, $\cos\theta$ is odd under inversion while $|Y_{JM}|^{2}$ is even, so a rotor in a definite state has no average dipole along any axis to pull on). A molecule with $\mu = 0$ has every transition moment zero from the start. The surviving rule is $\Delta J = \pm 1$: absorption lines fall at $\tilde\nu(J \to J+1) = 2\tilde B(J+1)$, a perfectly equally spaced comb starting at $2\tilde B$ with a dark gap of $2\tilde B$ at the origin.
:::

::: warning Wavenumbers are not energies {#warn-btilde}
$\tilde B = 1.931\ \mathrm{cm^{-1}}$ is a *wavenumber*, not an energy: the energy is $hc\tilde B$. Spectroscopists write every level, spacing and photon in $\mathrm{cm^{-1}}$ and let $hc$ ride invisibly; thermodynamicists want $\mathrm{J\,mol^{-1}}$ or $\mathrm{eV}$. Convert with $1\ \mathrm{cm^{-1}} = 1.986\times10^{-23}\ \mathrm{J} = 0.011\,96\ \mathrm{kJ\,mol^{-1}} = 1.240\times10^{-4}\ \mathrm{eV} = 29.98\ \mathrm{GHz}$. Mixing the conventions — inserting $hc$ twice, or not at all — is the most common way to lose a factor of $10^{3}$ in a rotational calculation.
:::

## Intensities: the Boltzmann ladder of J

Line positions come from the energy levels; line *intensities* come from how many molecules stand ready to make each transition. For absorption $J \to J+1$ the intensity is proportional to the population of the lower level, and the population of level $J$ is the product of two opposing factors: the degeneracy $2J+1$, which grows, and the Boltzmann factor $\mathrm{e}^{-\tilde B J(J+1)hc/k_\mathrm{B}T}$, which decays.

::: widget plot
f: (2*x+1)*exp(-b*x*(x+1)*1.4388/t)
x: 0, 22
y: 0, 12
sliders: b=10.59:1:20:0.5; t=300:50:600:10
labels: \text{population of level } J
caption: Relative population $(2J+1)\,\mathrm{e}^{-\tilde B J(J+1)hc/k_\mathrm{B}T}$ of the rotational levels, with $\tilde B$ (`b`, in $\mathrm{cm^{-1}}$) and $T$ (`t`, in $\mathrm{K}$) on the sliders — defaults are $\mathrm{HCl}$. The population rises, peaks, and falls: the maximum sits near $J^{*} = \sqrt{k_\mathrm{B}T/2\tilde B hc} - \tfrac{1}{2}$. Slide $T$ from 50 to $600\ \mathrm{K}$ and watch the peak march to higher $J$ — heating a gas literally spins its molecules faster — and slide $\tilde B$ down to $\mathrm{CO}$'s $1.9\ \mathrm{cm^{-1}}$ to see why heavy molecules carry thousands of thermally populated rotational levels while $\mathrm{H_2}$, with $\tilde B = 60\ \mathrm{cm^{-1}}$, has almost none at room temperature.
:::

::: example The brightest line of the HCl rotational spectrum {#ex-jstar}
For $\mathrm{HCl}$, $\tilde B = 10.59\ \mathrm{cm^{-1}}$. Which pure-rotational transition is most intense at $\mathrm{300\ K}$?
::: solution
The continuous estimate is $J^{*} = \sqrt{k_\mathrm{B}T/2\tilde B hc} - \tfrac{1}{2} = \sqrt{300/(2 \times 10.59 \times 1.4388)} - \tfrac{1}{2} = 2.6$. Because $J$ is an integer, test the neighbours with $p_J \propto (2J+1)\mathrm{e}^{-15.23\,J(J+1)/300}$ (using $\tilde B hc/k_\mathrm{B} = 15.2\ \mathrm{K}$): $p_2 \propto 5\times0.737 = 3.69$, $p_3 \propto 7\times0.544 = 3.80$, $p_4 \propto 9\times0.362 = 3.26$. The maximum is $J = 3$, so the brightest line is $J = 3 \to 4$ at $2\tilde B \times 4 = 84.7\ \mathrm{cm^{-1}}$. The same arithmetic for $\mathrm{CO}$ gives $J^{*} = 6.8 \to J = 7$: the peak sits at a *lower* $J$ for the heavier molecule even though its lines are closer together, because the rotational temperature $\tilde B hc/k_\mathrm{B}$ is smaller.
:::
:::

Put a vibrating rotor's two ladders together and you get the ro-vibrational band that opened this lesson. In the vibrational fundamental $v = 0 \to 1$ the rotational quantum number must still change by $\pm 1$, so the band splits into an **R branch** ($\Delta J = +1$, lines at $\tilde\nu_0 + \tilde B_1(J+1)(J+2) - \tilde B_0 J(J+1)$) and a **P branch** ($\Delta J = -1$, $\tilde\nu_0 + \tilde B_1 J(J-1) - \tilde B_0 J(J+1)$), with $\tilde B_1 < \tilde B_0$ because vibration on an anharmonic surface stretches the average bond. For $\mathrm{HCl}$ ($\tilde\nu_0 = 2885.9\ \mathrm{cm^{-1}}$, $\tilde B_0 = 10.44$, $\tilde B_1 = 10.14\ \mathrm{cm^{-1}}$) the R(0) line stands at $2906.2\ \mathrm{cm^{-1}}$ and the P(1) line at $2865.0\ \mathrm{cm^{-1}}$: no line falls at $\tilde\nu_0$ itself, because $\Delta J = 0$ — the Q branch — is forbidden for a $\Sigma$–$\Sigma$ transition in a diatomic, and the dark gap between the two branch heads, $2(\tilde B_0 + \tilde B_1) = 41.2\ \mathrm{cm^{-1}}$, is the "missing line" that first told rotational spectroscopy its selection rule was real. (Q branches *do* appear in polyatomics and in diatomics with electronic angular momentum — the rule is about symmetry, as [[quantum-chemistry/molecular-symmetry]] makes precise.)

The two ladders also explain the heat capacities you met in [[statistical-thermodynamics/partition-function]]: with rotational temperatures of $15\ \mathrm{K}$ ($\mathrm{HCl}$) or less, rotations are fully excited at any temperature you can reach in a solution ($C_{V,\mathrm{rot}} = R$), while vibrational temperatures of $10^{3}$–$10^{4}\ \mathrm{K}$ keep vibrations frozen near room temperature — the quantum origin of why equipartition "fails" for vibrations and never fails for rotations.

## Where this leads

The rigid rotor and harmonic oscillator return immediately and everywhere. Their exact solutions become the *starting point* for every approximation in [[quantum-chemistry/approximation-methods]] (anharmonicity and rotation–vibration coupling are the textbook perturbation problems), their angular momentum is the skeleton of the hydrogen atom in [[quantum-chemistry/hydrogen-atom]] and of term symbols in [[quantum-chemistry/many-electron-atoms]], and their selection rules, restated as symmetry statements, are the payoff of [[quantum-chemistry/molecular-symmetry]]. The spectroscopy course takes over where this one leaves off — line shapes, centrifugal distortion, Fermi resonance, rotation–vibration bands — in [[spectroscopy/rotational-spectroscopy]] and [[spectroscopy/vibrational-spectroscopy]]. And the inverted oscillator — a Morse curve run backwards at the barrier top — is the transition state of [[kinetics/transition-state-theory]], whose imaginary frequency is a vibrational frequency with a negative curvature. Learn these two model systems and half of molecular spectroscopy becomes arithmetic.

::: history
Robert Hooke announced the law of the spring in 1678 with the anagram *ceiiinosssttuv* — *ut tensio, sic vis* — and Planck made those springs quantum in 1900 by allowing them only energies $nh\nu$. That rotation was quantised too was inferred by Arnold Eucken in 1912 from the heat capacity of $\mathrm{H_2}$, whose rotational contribution is conspicuously missing at low temperature. The Morse potential (Philip Morse, 1929) gave anharmonic bonds their standard analytic shape in the same decade that band spectra were decoded; Gerhard Herzberg's *Molecular Spectra and Molecular Structure* (1945 onward) then became the field's handbook. Isidor Rabi's molecular-beam resonance method (1938, Nobel Prize 1944) and Charles Townes's microwave work (Nobel Prize 1964, shared with Nikolay Basov and Alexander Prokhorov) turned rotational spectroscopy into a measurement of bond lengths precise enough to test the Born–Oppenheimer approximation itself.
:::

::: summary
- Near equilibrium every bond is a spring: $V = \tfrac{1}{2}kx^{2}$ with $\omega = \sqrt{k/\mu}$, and the quantum oscillator has $E_v = (v+\tfrac12)\hbar\omega$ — equal spacing, $v$ nodes, and a zero-point energy $\tfrac12\hbar\omega$ that shifts bond energies, keeps helium liquid, and drives isotope fractionation.
- Isotopes change $\mu$, not $k$: frequencies scale as $1/\sqrt{\mu}$, which is how a spectrum identifies the vibrating bond ($\mathrm{HCl}$ $2990 \to \mathrm{DCl}$ $2144\ \mathrm{cm^{-1}}$).
- Infrared activity needs $\left(\partial\mu/\partial Q\right)_0 \ne 0$ and, harmonically, $\Delta v = \pm 1$; overtones are anharmonic leaks. Homonuclear diatomics are infrared-silent.
- Anharmonicity shrinks level spacings as $G(v) = \omega_\mathrm{e}(v+\tfrac12) - \omega_\mathrm{e}x_\mathrm{e}(v+\tfrac12)^{2}$ and ends the ladder at $v_\mathrm{max}$; $D_0 = D_\mathrm{e} - G(0)$, and Morse extrapolations run a few per cent high.
- Angular momentum is quantised as $J(J+1)\hbar^{2}$ with $2J+1$ orientations; the rigid rotor has $E_J = hc\tilde B J(J+1)$, $\tilde B = h/8\pi^{2}cI = 16.8576/(\mu r^{2})\ \mathrm{cm^{-1}}$, no zero-point rotation, and $(2J+1)$ degeneracy.
- Pure rotational spectra need a permanent dipole and show $\Delta J = \pm 1$: equally spaced lines at $2\tilde B(J+1)$, from which bond lengths follow to $0.001\ \mathrm{\AA}$ ($\mathrm{CO}$: $r = 1.128\ \mathrm{\AA}$).
- Rotational intensities follow $(2J+1)\mathrm{e}^{-\tilde B J(J+1)hc/k_\mathrm{B}T}$, peaking at $J^{*} \approx \sqrt{k_\mathrm{B}T/2\tilde B hc} - \tfrac12$ ($\mathrm{HCl}$: $J = 3$ at $\mathrm{300\ K}$); ro-vibrational bands show P and R branches and a dark gap $2(\tilde B_0 + \tilde B_1)$ where the Q branch would be.
:::

## Exercises

::: exercise Zero-point energy of H₂ {level=1 check="26.3"}
Compute the zero-point energy of $\mathrm{H_2}$ ($\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$) in $\mathrm{kJ\,mol^{-1}}$, taking the harmonic value. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$E_0 = \tfrac12 \times 4401\ \mathrm{cm^{-1}} = 2200.5\ \mathrm{cm^{-1}}$, and with $0.011\,963\ \mathrm{kJ\,mol^{-1}}$ per $\mathrm{cm^{-1}}$: $E_0 = 2200.5 \times 0.011\,963 = 26.3\ \mathrm{kJ\,mol^{-1}}$ — the largest zero-point energy of any molecule, because $\mu$ is the smallest. It is $6\,\%$ of the $\mathrm{H_2}$ bond energy, which is why deuterium chemistry differs measurably from hydrogen chemistry.
:::
:::

::: exercise A microwave line {level=1 check="115.8"}
Using $\tilde B = 1.931\ \mathrm{cm^{-1}}$ for CO, at what frequency in GHz does the $J = 1 \leftarrow 0$ transition absorb? (Enter it in GHz.)
::: solution
$\tilde\nu = 2\tilde B = 3.862\ \mathrm{cm^{-1}}$, and $1\ \mathrm{cm^{-1}} = 29.979\ \mathrm{GHz}$, so $\nu = 3.862 \times 29.979 = 115.8\ \mathrm{GHz}$. The measured line is at $115.27\ \mathrm{GHz}$: the difference is the $B_0 < B_\mathrm{e}$ effect of zero-point vibration stretching the bond slightly — the same anharmonicity as in the vibrational term values.
:::
:::

::: exercise An isotope shift {level=1 check="2144"}
Predict the harmonic fundamental of $\mathrm{D^{35}Cl}$ from $\tilde\nu(\mathrm{H^{35}Cl}) = 2990\ \mathrm{cm^{-1}}$. (Enter it in $\mathrm{cm^{-1}}$.)
::: solution
$\mu(\mathrm{HCl}) = 0.9796\ \mathrm{u}$, $\mu(\mathrm{DCl}) = 1.9044\ \mathrm{u}$, ratio $\sqrt{0.9796/1.9044} = 0.7172$, so $\tilde\nu(\mathrm{DCl}) = 2990 \times 0.7172 = 2144\ \mathrm{cm^{-1}}$. The observed fundamental is $2087\ \mathrm{cm^{-1}}$; the $2.7\,\%$ shortfall is anharmonicity — the fundamental sits $2\omega_\mathrm{e}x_\mathrm{e}$ below $\omega_\mathrm{e}$, and $\omega_\mathrm{e}x_\mathrm{e} \approx 27\ \mathrm{cm^{-1}}$ for DCl against $53\ \mathrm{cm^{-1}}$ for HCl.
:::
:::

::: exercise A force constant {level=2 check="516"}
Compute the force constant of $\mathrm{H^{35}Cl}$ from $\tilde\nu = 2990\ \mathrm{cm^{-1}}$. (Enter it in $\mathrm{N\,m^{-1}}$.)
::: solution
$k = \mu\omega^{2} = \mu(2\pi c\tilde\nu)^{2} = 1.627\times10^{-27}\ \mathrm{kg} \times (5.63\times10^{14}\ \mathrm{s^{-1}})^{2} = 516\ \mathrm{N\,m^{-1}}$. Compare: the $\mathrm{I{-}I}$ bond has $k \approx 170\ \mathrm{N\,m^{-1}}$ and the $\mathrm{N{\equiv}N}$ bond $k \approx 2240\ \mathrm{N\,m^{-1}}$ — force constants order bond orders, though not perfectly, because $\mu$ and $k$ both move along a series.
:::
:::

::: exercise A bond length {level=2 check="1.16"}
The rotational constant of $^{14}\mathrm{N}^{16}\mathrm{O}$ is $\tilde B = 1.672\ \mathrm{cm^{-1}}$. Find its bond length. (Enter it in $\mathrm{\AA}$.)
::: solution
$\mu(^{14}\mathrm{N}^{16}\mathrm{O}) = 14.003 \times 15.995/30.000 = 7.470\ \mathrm{u}$, so $r = \sqrt{16.8576/(1.672 \times 7.470)} = \sqrt{1.350} = 1.16\ \mathrm{\AA}$. NO is *longer* than CO ($1.128\ \mathrm{\AA}$) despite the extra electron — the odd electron occupies an antibonding $\pi^{*}$ orbital, dropping the bond order from 3 to $2.5$, and it is bond order, not electron count, that sets bond length.
:::
:::

::: exercise The brightest line {level=2 check="3"}
For $\mathrm{HCl}$ ($\tilde B = 10.59\ \mathrm{cm^{-1}}$), which $J$ level is most populated at $\mathrm{300\ K}$? (Enter $J$.)
::: solution
$p_J \propto (2J+1)\mathrm{e}^{-15.23\,J(J+1)/300}$: $p_2 = 3.69$, $p_3 = 3.80$, $p_4 = 3.26$ (relative units), so $J = 3$. The continuous estimate $J^{*} = \sqrt{300/(2\times10.59\times1.4388)} - \tfrac12 = 2.6$ rounds to the same answer here, but always check the two integers around $J^{*}$ — the discrete maximum can sit either side.
:::
:::

::: exercise Morse dissociation of a weak bond {level=3 check="4.69"}
For $\mathrm{H_2}$, $\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$, $\omega_\mathrm{e}x_\mathrm{e} = 121\ \mathrm{cm^{-1}}$. Estimate $D_0$ from the Morse relation and give it in eV. (Enter it in eV.) Why is it high?
::: solution
$D_\mathrm{e} = \omega_\mathrm{e}^{2}/4\omega_\mathrm{e}x_\mathrm{e} = 4401^{2}/484 = 40\,018\ \mathrm{cm^{-1}}$; $G(0) = \tfrac12(4401) - \tfrac14(121) = 2170\ \mathrm{cm^{-1}}$; $D_0 = 37\,848\ \mathrm{cm^{-1}} = 37\,848/8065.5 = 4.69\ \mathrm{eV}$. The measured value is $4.48\ \mathrm{eV}$: the Morse potential's $\mathrm{e}^{-2ax}$ tail is steeper than the true long-range interaction and its curvature relation $\omega_\mathrm{e}x_\mathrm{e} = \omega_\mathrm{e}^{2}/4D_\mathrm{e}$ is only the first term of a more general expansion, so extrapolating from the bottom of the well overshoots. The error direction is reliable — Morse $D_0$ values are upper estimates — which is why precision work sums measured spacings (Birge–Sponner) instead.
:::
:::

::: exercise The dark gap of a ro-vibrational band {level=3 check="41.2"}
For the $\mathrm{HCl}$ fundamental, $\tilde\nu_0 = 2885.9\ \mathrm{cm^{-1}}$, $\tilde B_0 = 10.44\ \mathrm{cm^{-1}}$, $\tilde B_1 = 10.14\ \mathrm{cm^{-1}}$. Derive the R(0) and P(1) positions from the term values and find the separation of the two branch heads. (Enter the separation in $\mathrm{cm^{-1}}$.)
::: solution
The upper state has $\tilde B_1$, the lower $\tilde B_0$. R branch ($J \to J+1$): $\tilde\nu = \tilde\nu_0 + \tilde B_1(J+1)(J+2) - \tilde B_0 J(J+1)$, so R(0) $= 2885.9 + 2(10.14) = 2906.2\ \mathrm{cm^{-1}}$. P branch ($J \to J-1$): $\tilde\nu = \tilde\nu_0 + \tilde B_1 J(J-1) - \tilde B_0 J(J+1)$, so P(1) $= 2885.9 - 2(10.44) = 2865.0\ \mathrm{cm^{-1}}$. Separation $= 2(\tilde B_0 + \tilde B_1) = 41.2\ \mathrm{cm^{-1}}$, and $\tilde\nu_0$ itself is dark: the nearest lines stand $20.3$ and $20.8\ \mathrm{cm^{-1}}$ on either side, the classic missing Q branch. The asymmetry of the two half-gaps ($\tilde B_1 < \tilde B_0$) is itself a measurement: the excited vibration holds the atoms on average $1\,\%$ further apart.
:::
:::

::: exercise The virial theorem for the oscillator {level=3}
Prove that the harmonic oscillator in any stationary state obeys $\langle \hat T \rangle = \langle \hat V \rangle = \tfrac12 E_v$, and compare the three lengths of the ground state: the classical turning point $x_\mathrm{tp}$ at $E_0$, the root-mean-square width $\langle x^{2}\rangle_0^{1/2}$, and the $1/\mathrm{e}$ half-width of the ground-state wavefunction.
::: solution
In a stationary state the expectation of any time-independent operator combination has zero time derivative, so with $\hat G = \hat x\hat p + \hat p\hat x$,
$$
0 = \left\langle \frac{\mathrm{i}}{\hbar}[\hat H, \hat G]\right\rangle .
$$
Evaluating the commutator with $[\hat x, \hat p] = \mathrm{i}\hbar$ gives $[\hat H, \hat G] = -2\mathrm{i}\hbar\left(\hat p^{2}/\mu - xV'(x)\right)$, so $0 = \langle \frac{\mathrm{i}}{\hbar}[\hat H,\hat G]\rangle = 4\langle \hat T\rangle - 2\langle xV'\rangle$, and for $V = \tfrac12 kx^{2}$ (where $xV' = 2V$) this is $0 = 4\langle \hat T\rangle - 4\langle \hat V\rangle$, i.e. $\langle \hat T \rangle = \langle \hat V \rangle = E_v/2$. Now the three lengths at $v = 0$. The classical turning point at $E_0 = \tfrac12\hbar\omega$: $\tfrac12 k x_\mathrm{tp}^{2} = \tfrac12\hbar\omega$ gives $x_\mathrm{tp} = \sqrt{\hbar\omega/k} = \sqrt{\hbar/\mu\omega} = \alpha$. The mean-square width: $\langle \hat V \rangle_0 = \tfrac12 k\langle x^{2}\rangle_0 = \tfrac14\hbar\omega$ gives $\langle x^{2}\rangle_0^{1/2} = \alpha/\sqrt{2}$. The wavefunction $\psi_0 \propto \mathrm{e}^{-x^{2}/2\alpha^{2}}$ falls to $1/\mathrm{e}$ of its peak at $x = \alpha\sqrt{2}$, and $|\psi_0|^{2}$ at $x = \alpha$. So the classical turning point $\alpha$ lies *between* the r.m.s. width and the tail of the wavefunction: a fraction $\mathrm{e}^{-1} \approx 37\,\%$ of the probability density's half-width scale sits beyond the point where classical motion would stop — the quantitative face of the tunnelling tail discussed after [[#prop-ho-levels]].
:::
:::

::: exercise How many vibrational levels? {level=3 check="17"}
For $\mathrm{H_2}$ ($\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$, $\omega_\mathrm{e}x_\mathrm{e} = 121\ \mathrm{cm^{-1}}$), how many vibrational levels does the Morse model support? (Enter $v_\mathrm{max}$.) Why does the real molecule have fewer?
::: solution
Levels end where $G(v+1) - G(v) = \omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}(v+1) = 0$, i.e. $v_\mathrm{max} = \omega_\mathrm{e}/2\omega_\mathrm{e}x_\mathrm{e} - \tfrac12 = 4401/242 - 0.5 = 17.7$, so the Morse model binds up to $v = 17$. The real $\mathrm{H_2}$ has fifteen bound levels ($v = 0$–$14$): the true potential approaches its limit more slowly than the Morse $\mathrm{e}^{-2ax}$ tail, so the real spacings stay open longer but the well is shallower than the Morse extrapolation of [[#ex-h2-morse]] suggests — the two errors partly cancel in $v_\mathrm{max}$ but not enough. Counting levels is a sensitive probe of the long-range potential, and for $\mathrm{H_2}$ every one of the fifteen has been measured by laser spectroscopy.
:::
:::
