Put a drop of an unknown liquid on the diamond window of an infrared spectrometer and, thirty seconds later, you have a trace with perhaps twenty bands between $4000$ and $400\ \mathrm{cm^{-1}}$. A strong, sharp band at $1742\ \mathrm{cm^{-1}}$ says *ester carbonyl*; the absence of anything broad above $3200\ \mathrm{cm^{-1}}$ says *no O–H*; a strong band near $1240\ \mathrm{cm^{-1}}$ confirms the $\mathrm{C{-}O}$ of an ester. No other technique gives functional-group information so fast, so cheaply, on so little sample. Yet the same spectrum is also a piece of exact physics: every band is a transition between vibrational levels of a molecule with $3N - 6$ coupled oscillators, its position fixed by force constants and masses, its intensity by how the dipole moment changes, its shape by rotation and collisions. And a second experiment — shining a green laser through the same liquid and looking at the faint light scattered at slightly different colours — measures the *same* vibrations through a different selection rule.

This lesson connects the two views. We start from normal modes and count them with symmetry, then add anharmonicity (overtones, hot bands, Fermi resonance), the rotational structure of gas-phase bands, Raman scattering and its selection rules, the Fourier-transform instrument, and finally the empirical but indispensable table of **group frequencies**. The harmonic oscillator, its $\Delta v = \pm 1$ rule and the Morse potential were derived in [[quantum-chemistry/vibration-rotation]], and the reduction of representations in [[quantum-chemistry/molecular-symmetry]]; here we use them. The general machinery of transition moments, populations and line widths is that of [[spectroscopy/spectroscopy-principles]].

Units: vibrational spectroscopists quote positions as wavenumbers $\tilde\nu = 1/\lambda$ in $\mathrm{cm^{-1}}$. The conversion factors used below are from CODATA 2018 ($hc/k_\mathrm{B} = 1.438\,777\ \mathrm{cm\,K}$, $1\ \mathrm{cm^{-1}} = 1.239\,842\times10^{-4}\ \mathrm{eV}$); isotopic masses are from the 2020 Atomic Mass Evaluation; diatomic constants are from Huber and Herzberg's *Constants of Diatomic Molecules* (1979) as reproduced in the NIST Chemistry WebBook, and polyatomic fundamentals from Shimanouchi's NIST tables.

## Normal modes {#sec-normal-modes}

A molecule of $N$ atoms has $3N$ nuclear coordinates. Three describe translation of the centre of mass and three (two for a linear molecule) describe rotation; the rest are internal. Near the equilibrium geometry the potential energy is a quadratic form in the displacements, and the central fact of vibrational spectroscopy is that this many-dimensional problem falls apart into independent one-dimensional oscillators.

::: definition Normal modes and normal coordinates {#def-normal-mode}
Let $q_i = \sqrt{m_i}\,\Delta x_i$ ($i = 1,\ldots,3N$) be the **mass-weighted Cartesian displacements** and $V = \tfrac12\sum_{ij} F_{ij}\,q_iq_j$ the harmonic potential, with $F_{ij} = \partial^2 V/\partial q_i\partial q_j$ the mass-weighted Hessian. The **normal coordinates** $Q_k = \sum_i L_{ik}\,q_i$ are the combinations defined by the orthonormal eigenvectors of $\mathbf F$, $\mathbf{F}\mathbf{L}_k = \lambda_k \mathbf{L}_k$. Each $Q_k$ with $\lambda_k > 0$ is a **normal mode**: a collective motion in which every atom oscillates at the same frequency $\omega_k = \sqrt{\lambda_k}$ and passes through equilibrium at the same instant. A non-linear molecule has $3N - 6$ normal modes and a linear molecule $3N - 5$; the remaining eigenvalues are zero (translations and rotations).
:::

::: proposition Separation into normal modes {#prop-normal-modes}
In normal coordinates the harmonic vibrational Hamiltonian is a sum of independent oscillators,
$$
\hat H_\mathrm{vib} = \sum_{k=1}^{3N-6}\left(-\frac{\hbar^2}{2}\frac{\partial^2}{\partial Q_k^2} + \frac12\omega_k^2 Q_k^2\right),
\qquad
E = \sum_k \left(v_k + \tfrac12\right)\hbar\omega_k ,
$$ {#eq-normal-energy}
with wavefunction $\prod_k \psi_{v_k}(Q_k)$. A **fundamental** is a transition in which one $v_k$ changes from $0$ to $1$; an **overtone** changes one $v_k$ by two or more; a **combination band** changes two or more $v_k$ at once.
:::

::: proof
Kinetic energy is $T = \tfrac12\sum_i m_i\dot{x}_i^2 = \tfrac12\sum_i \dot q_i^2 = \tfrac12\dot{\mathbf q}^{\mathsf T}\dot{\mathbf q}$, and $V = \tfrac12\mathbf q^{\mathsf T}\mathbf F\mathbf q$. Because $\mathbf F$ is real and symmetric it has an orthogonal eigenvector matrix $\mathbf L$ with $\mathbf L^{\mathsf T}\mathbf F\mathbf L = \mathrm{diag}(\lambda_k)$. Set $\mathbf Q = \mathbf L^{\mathsf T}\mathbf q$. Orthogonality preserves the kinetic energy, $\dot{\mathbf q}^{\mathsf T}\dot{\mathbf q} = \dot{\mathbf Q}^{\mathsf T}\dot{\mathbf Q}$, and diagonalises the potential, $V = \tfrac12\sum_k\lambda_k Q_k^2$. With no cross terms left, the classical Lagrangian — and after quantisation with $\hat P_k = -\mathrm{i}\hbar\,\partial/\partial Q_k$ the Hamiltonian — is a sum of terms each depending on one $Q_k$. A separable Hamiltonian has product eigenfunctions and additive energies, and each one-dimensional term is the harmonic oscillator of [[quantum-chemistry/vibration-rotation]] with $\omega_k = \sqrt{\lambda_k}$. Rigid translations and infinitesimal rotations do not change $V$, so they are eigenvectors with $\lambda = 0$: six of them for a non-linear molecule, five for a linear one (rotation about the axis moves no nucleus).
:::

The mode count is worth having at your fingertips: water has $3$ modes, carbon dioxide $4$ (two of them a degenerate pair of bends), methane $9$, benzene $30$. The modes are *not* bond stretches; they are delocalised over the molecule, although — and this is the basis of group frequencies — a mode involving a light atom or a stiff bond is often dominated by one internal coordinate.

::: example A valence force field for carbon dioxide {#ex-co2-vff}
Model $\mathrm{O{=}C{=}O}$ as three masses on a line joined by two springs of force constant $k$. Find the frequencies of the symmetric and antisymmetric stretches, and use the observed antisymmetric stretch, $\tilde\nu_3 = 2349.1\ \mathrm{cm^{-1}}$, to predict $\tilde\nu_1$.
::: solution
In the **symmetric stretch** the carbon stays still and each oxygen moves against a single spring: $\omega_1^2 = k/m_\mathrm{O}$. In the **antisymmetric stretch** both oxygens move one way and the carbon the other, keeping the centre of mass fixed; solving the $3\times3$ problem gives $\omega_3^2 = (k/m_\mathrm{O})(1 + 2m_\mathrm{O}/m_\mathrm{C})$. The ratio depends on masses alone:
$$
\frac{\tilde\nu_3}{\tilde\nu_1} = \sqrt{1 + \frac{2m_\mathrm{O}}{m_\mathrm{C}}} = \sqrt{1 + \frac{2\times15.995}{12.000}} = 1.915 .
$$
From $\tilde\nu_3$: $k = (2\pi c\tilde\nu_3)^2 \big/ \left[(1/m_\mathrm{O} + 2/m_\mathrm{C})/u\right] = 1419\ \mathrm{N\,m^{-1}}$ and $\tilde\nu_1 = 2349.1/1.915 = 1227\ \mathrm{cm^{-1}}$. The symmetric stretch is in fact near $1337\ \mathrm{cm^{-1}}$ (the mean of the Fermi doublet discussed below). The model is too simple: stretching one $\mathrm{C{=}O}$ bond stiffens the other. Adding an interaction constant $k_{12}$, $\omega_1^2 = (k + k_{12})/m_\mathrm{O}$ and $\omega_3^2 = (k - k_{12})(1/m_\mathrm{O} + 2/m_\mathrm{C})$, and fitting both frequencies gives $k = 1551\ \mathrm{N\,m^{-1}}$ and $k_{12} = 133\ \mathrm{N\,m^{-1}}$ — a small but essential coupling. Force-field fitting of this kind, done with many isotopologues to pin down the off-diagonal terms, is how force constants were obtained before quantum-chemical Hessians.
:::
:::

### Counting active modes by symmetry

Each normal mode transforms as an irreducible representation of the molecular point group, and that label decides its spectroscopic activity. The procedure is mechanical.

::: algorithm Classifying the fundamentals of a molecule {#alg-gamma-vib}
1. Find the point group and set up axes ([[quantum-chemistry/molecular-symmetry]]).
2. For each class of operations $R$, count the atoms left in place, $N_\mathrm{u}(R)$, and multiply by the contribution per unshifted atom ($3$ for $E$, $1 + 2\cos\theta$ for $C_n$, $1$ for $\sigma$, $-3$ for $i$, $-1 + 2\cos\theta$ for $S_n$). This gives $\chi_{3N}(R)$.
3. Reduce $\Gamma_{3N}$ with $n_j = \frac1h\sum_R g_R\,\chi_{3N}(R)\,\chi_j(R)$.
4. Subtract the irreps of $x, y, z$ (translations) and $R_x, R_y, R_z$ (rotations) to obtain $\Gamma_\mathrm{vib}$.
5. A fundamental is **infrared-active** if its irrep is that of $x$, $y$ or $z$, and **Raman-active** if it is that of a quadratic function ($x^2$, $xy$, $\ldots$) in the character table.
:::

::: example The six fundamentals of formaldehyde {#ex-h2co}
Classify the vibrations of $\mathrm{H_2CO}$ ($\mathrm{C_{2v}}$, molecule in the $yz$ plane, $z$ along $\mathrm{C{=}O}$), and say how many bands each spectrum should show.
::: solution
Characters of $\Gamma_{3N}$ in the order $(E, C_2, \sigma_v(xz), \sigma_v'(yz))$: $E$ fixes all four atoms, $12$; $C_2$ fixes C and O, $2\times(-1) = -2$; $\sigma_v(xz)$, perpendicular to the molecule, fixes C and O, $2\times1 = 2$; $\sigma_v'(yz)$, the molecular plane, fixes all four, $4$. Reduction:
$$
n(\mathrm{A_1}) = \tfrac14(12 - 2 + 2 + 4) = 4,\quad
n(\mathrm{A_2}) = \tfrac14(12 - 2 - 2 - 4) = 1,\quad
n(\mathrm{B_1}) = \tfrac14(12 + 2 + 2 - 4) = 3,\quad
n(\mathrm{B_2}) = \tfrac14(12 + 2 - 2 + 4) = 4 .
$$
Translations are $\mathrm{A_1}(z) + \mathrm{B_1}(x) + \mathrm{B_2}(y)$ and rotations $\mathrm{A_2}(R_z) + \mathrm{B_1}(R_y) + \mathrm{B_2}(R_x)$, so $\Gamma_\mathrm{vib} = 3\mathrm{A_1} + \mathrm{B_1} + 2\mathrm{B_2}$ — six modes, as $3N - 6$ requires. In $\mathrm{C_{2v}}$, $\mathrm{A_1}$, $\mathrm{B_1}$ and $\mathrm{B_2}$ each contain a translation *and* a quadratic function, so all six fundamentals are both infrared- and Raman-active. The gas-phase values (Shimanouchi) are: $\mathrm{A_1}$: C–H symmetric stretch $2782$, C=O stretch $1746$, $\mathrm{CH_2}$ scissor $1500$; $\mathrm{B_1}$: out-of-plane wag $1167$; $\mathrm{B_2}$: C–H antisymmetric stretch $2843$, $\mathrm{CH_2}$ rock $1249\ \mathrm{cm^{-1}}$. Only a group with an $\mathrm{A_2}$ vibration (or, as we shall see, a centre of inversion) produces silent or single-technique modes.
:::
:::

## Anharmonicity: overtones, hot bands and Fermi resonance

Harmonic theory predicts one band per active fundamental. Real spectra show more, and every extra band is a message about anharmonicity. For a single mode the term values are, to second order,
$$
G(v) = \omega_\mathrm{e}\left(v + \tfrac12\right) - \omega_\mathrm{e}x_\mathrm{e}\left(v + \tfrac12\right)^2 ,
$$ {#eq-anh}
the Morse form of [[quantum-chemistry/vibration-rotation]]. Two consequences: transitions with $\Delta v = \pm2, \pm3$ acquire intensity (the potential is not parabolic, and the dipole moment is not linear in $Q$ — **electrical anharmonicity**), and levels are no longer equally spaced, so transitions from different starting levels no longer coincide.

::: proposition Anharmonic transition wavenumbers and the Birge–Sponer sum {#prop-anh}
With the term values of equation [[#eq-anh]], the transitions from $v = 0$ and between neighbouring levels lie at
$$
\tilde\nu(v \leftarrow 0) = v\,\omega_\mathrm{e} - v(v+1)\,\omega_\mathrm{e}x_\mathrm{e},
\qquad
\Delta G_{v+\frac12} \equiv G(v+1) - G(v) = \omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}(v+1) .
$$ {#eq-overtone}
The fundamental is at $\omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}$, the first overtone at $2\omega_\mathrm{e} - 6\omega_\mathrm{e}x_\mathrm{e}$ (slightly *less* than twice the fundamental), and the **hot band** $v = 2 \leftarrow 1$ at $\omega_\mathrm{e} - 4\omega_\mathrm{e}x_\mathrm{e}$, below the fundamental by $2\omega_\mathrm{e}x_\mathrm{e}$. The dissociation energy from $v = 0$ is the sum of all spacings, $D_0 = \sum_v \Delta G_{v+\frac12}$, the area under a plot of $\Delta G_{v+\frac12}$ against $v + \tfrac12$ (the **Birge–Sponer plot**); for the linear form above it equals $\omega_\mathrm{e}^2/4\omega_\mathrm{e}x_\mathrm{e} - G(0)$.
:::

::: proof
Subtract term values. $G(v) - G(0) = \omega_\mathrm{e}v - \omega_\mathrm{e}x_\mathrm{e}\left[(v+\tfrac12)^2 - \tfrac14\right] = v\omega_\mathrm{e} - v(v+1)\omega_\mathrm{e}x_\mathrm{e}$, since $(v + \tfrac12)^2 - \tfrac14 = v^2 + v$. The neighbour spacing is $G(v+1) - G(v) = \omega_\mathrm{e} - \omega_\mathrm{e}x_\mathrm{e}\left[(v + \tfrac32)^2 - (v+\tfrac12)^2\right] = \omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}(v + 1)$. Bound levels exist while this spacing is positive; summing it from $v = 0$ to the last bound level telescopes to $G(v_\mathrm{last}+1) - G(0)$, the energy from the ground level to the dissociation limit, which is $D_0$ by definition. For the quadratic $G(v)$ the maximum of $G$ is at $v + \tfrac12 = \omega_\mathrm{e}/2\omega_\mathrm{e}x_\mathrm{e}$, where $G = \omega_\mathrm{e}^2/4\omega_\mathrm{e}x_\mathrm{e} = D_\mathrm{e}$, giving $D_0 = D_\mathrm{e} - G(0)$.
:::

::: example Anharmonicity of HCl from its overtone {#ex-hcl-overtone}
The fundamental of $\mathrm{H^{35}Cl}$ is at $2885.98\ \mathrm{cm^{-1}}$ and the first overtone at $5667.98\ \mathrm{cm^{-1}}$. Find $\omega_\mathrm{e}$ and $\omega_\mathrm{e}x_\mathrm{e}$, predict the hot band $v = 2 \leftarrow 1$, and estimate its intensity relative to the fundamental at $300\ \mathrm{K}$.
::: solution
From equation [[#eq-overtone]], $\omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e} = 2885.98$ and $2\omega_\mathrm{e} - 6\omega_\mathrm{e}x_\mathrm{e} = 5667.98$. Twice the first minus the second gives $2\omega_\mathrm{e}x_\mathrm{e} = 5771.96 - 5667.98 = 103.98$, so
$$
\omega_\mathrm{e}x_\mathrm{e} = 52.0\ \mathrm{cm^{-1}}, \qquad \omega_\mathrm{e} = 2885.98 + 103.98 = 2990.0\ \mathrm{cm^{-1}} ,
$$
in agreement with the Huber–Herzberg constants ($2990.9$ and $52.8\ \mathrm{cm^{-1}}$; the small differences come from the cubic term we neglected). The hot band lies at $\omega_\mathrm{e} - 4\omega_\mathrm{e}x_\mathrm{e} = 2782.0\ \mathrm{cm^{-1}}$, $104\ \mathrm{cm^{-1}}$ below the fundamental. Its intensity is governed by the population of $v = 1$: $\mathrm{e}^{-hc\tilde\nu/k_\mathrm{B}T} = \exp(-1.4388 \times 2885.98/300) = 9.7\times10^{-7}$ — invisible. Hot bands are prominent only for low-frequency modes: the degenerate bend of $\mathrm{CO_2}$ at $667\ \mathrm{cm^{-1}}$ has about $7\,\%$ of its molecules in $v_2 = 1$ at room temperature, and its hot bands are easily seen.
:::
:::

Overtones and combinations would be minor curiosities if they always stayed weak. They do not, because of a resonance.

::: proposition Fermi resonance {#prop-fermi}
Let two vibrational states of the **same symmetry**, a fundamental $|a\rangle$ and an overtone or combination $|b\rangle$, have unperturbed energies $E_a^0$ and $E_b^0$ separated by $\delta = E_a^0 - E_b^0$, and let the cubic anharmonic terms of the potential couple them with matrix element $W = \langle a|\hat V_\mathrm{anh}|b\rangle$. The observed levels are
$$
E_\pm = \tfrac12\left(E_a^0 + E_b^0\right) \pm \sqrt{\tfrac14\delta^2 + W^2},
$$ {#eq-fermi}
which repel each other, and the eigenstates are mixtures $\cos\theta\,|a\rangle \pm \sin\theta\,|b\rangle$ with $\tan 2\theta = 2W/\delta$. Because only the fundamental carries intensity, the two bands **share** it in the ratio $\cos^2\theta : \sin^2\theta$; at exact resonance ($\delta = 0$) they are equally intense and separated by $2|W|$.
:::

::: proof
Within the two-state space the Hamiltonian matrix is $\begin{pmatrix} E_a^0 & W \\ W & E_b^0\end{pmatrix}$; $W$ vanishes unless $\Gamma_a \times \Gamma_b$ contains the totally symmetric irrep, i.e. unless the states have the same symmetry, because $\hat V_\mathrm{anh}$ is totally symmetric. The secular equation $(E_a^0 - E)(E_b^0 - E) - W^2 = 0$ has the roots of equation [[#eq-fermi]]. Writing $E_a^0 = \bar E + \delta/2$, $E_b^0 = \bar E - \delta/2$, the upper eigenvector is $(\cos\theta, \sin\theta)$ with $\tan 2\theta = 2W/\delta$. The transition moment from the ground state is $\cos\theta\,\mu_a + \sin\theta\,\mu_b \approx \cos\theta\,\mu_a$ for the upper state and $-\sin\theta\,\mu_a$ for the lower, so intensities are $\mu_a^2\cos^2\theta$ and $\mu_a^2\sin^2\theta$: the total is conserved and redistributed.
:::

::: widget plot
f: sqrt(x^2/4 + w^2); -sqrt(x^2/4 + w^2); x/2; -x/2
x: -200, 200
y: -160, 160
sliders: w=51:0:120:1
labels: E_+ - \bar E; E_- - \bar E; \text{unperturbed } E_a^0; \text{unperturbed } E_b^0
caption: Fermi resonance as a two-level problem (equation [[#eq-fermi]]): the observed levels, measured from their mean $\bar E$ in $\mathrm{cm^{-1}}$, against the unperturbed separation $\delta$ (horizontal axis, $\mathrm{cm^{-1}}$), with the coupling $W$ on the slider `w`. Far from resonance the levels follow the straight lines of the unperturbed states; near $\delta = 0$ they avoid each other and never cross, the closest approach being $2W$. Set `w` to $51$ to reproduce the $\mathrm{CO_2}$ pair at $1285.4$ and $1388.2\ \mathrm{cm^{-1}}$, and to $0$ to see the levels cross freely when symmetry forbids the coupling.
:::

::: example The Fermi doublet of carbon dioxide {#ex-co2-fermi}
The Raman spectrum of $\mathrm{CO_2}$ shows two strong bands at $1285.4$ and $1388.2\ \mathrm{cm^{-1}}$ where one symmetric stretch was expected. Interpret them, and estimate the coupling $W$.
::: solution
Twice the bend, $2\times667.4 = 1334.8\ \mathrm{cm^{-1}}$, lies almost exactly at the symmetric-stretch fundamental. The $v_2 = 2$ level contains a component of symmetry $\Sigma_\mathrm{g}^+$ — the same as $\nu_1$ — so the two states are coupled by the cubic anharmonic term and mix. The mean of the observed pair, $\tfrac12(1285.4 + 1388.2) = 1336.8\ \mathrm{cm^{-1}}$, is the mean of the unperturbed levels, and their separation is $2\sqrt{\delta^2/4 + W^2} = 102.8\ \mathrm{cm^{-1}}$. If the unperturbed levels are within a few $\mathrm{cm^{-1}}$ of each other, $\delta^2/4 \ll W^2$ and $W \approx 102.8/2 = 51.4\ \mathrm{cm^{-1}}$; even with $\delta = 10\ \mathrm{cm^{-1}}$ the estimate changes only to $51.2\ \mathrm{cm^{-1}}$. The mixing is then nearly $50{:}50$ ($\cos^2\theta = 0.55$ for $\delta = 10$), which is why both bands are strong and why it is meaningless to ask which of them "is" $\nu_1$. Enrico Fermi gave this explanation in 1931; the same effect produces the aldehyde C–H doublet near $2820$ and $2720\ \mathrm{cm^{-1}}$ (C–H stretch with the overtone of the C–H bend near $1390\ \mathrm{cm^{-1}}$).
:::
:::

## The rotational structure of vibrational bands

In the gas phase each vibrational transition carries a rotational fine structure, because the molecule can change its rotational state as it absorbs. For a diatomic or a linear molecule in a parallel band, the rule $\Delta J = \pm1$ gives an R branch above and a P branch below the band origin $\tilde\nu_0$, separated by a gap with no line at $\tilde\nu_0$ — the pattern introduced in [[quantum-chemistry/vibration-rotation]]. Polyatomic molecules add a **Q branch** ($\Delta J = 0$) whenever the transition moment has a component perpendicular to the molecular axis: the bend of $\mathrm{CO_2}$ at $667\ \mathrm{cm^{-1}}$ (a perpendicular band, $\Pi_\mathrm{u}$) shows a sharp Q branch, while its antisymmetric stretch at $2349\ \mathrm{cm^{-1}}$ (parallel, $\Sigma_\mathrm{u}^+$) has none. The shape of a band therefore tells you the direction of the transition moment — the gas-phase analogue of a symmetry assignment.

Since the upper vibrational level has a slightly different rotational constant from the lower, the branches are not equally spaced, and the clean way to extract both constants is to pair lines that share a level.

::: proposition Combination differences {#prop-comb-diff}
For a band with lower-state constant $\tilde B''$ and upper-state constant $\tilde B'$ (rigid-rotor term values $\tilde BJ(J+1)$ in each state),
$$
\tilde\nu_\mathrm{R}(J-1) - \tilde\nu_\mathrm{P}(J+1) = 4\tilde B''\left(J + \tfrac12\right),
\qquad
\tilde\nu_\mathrm{R}(J) - \tilde\nu_\mathrm{P}(J) = 4\tilde B'\left(J + \tfrac12\right).
$$ {#eq-comb-diff}
The first difference depends only on the lower state, the second only on the upper state.
:::

::: proof
R$(J-1)$ goes from lower level $J-1$ to upper level $J$, and P$(J+1)$ from lower level $J+1$ to the *same* upper level $J$. Their difference is therefore the separation of the two lower levels, $\tilde B''\left[(J+1)(J+2) - (J-1)J\right] = \tilde B''(4J + 2)$. Likewise R$(J)$ and P$(J)$ start from the same lower level $J$ and end on upper levels $J+1$ and $J-1$, so their difference is $\tilde B'\left[(J+1)(J+2) - (J-1)J\right] = 4\tilde B'(J + \tfrac12)$. The band origin and any vibrational anharmonicity cancel exactly; centrifugal distortion adds small terms in $(J + \tfrac12)^3$.
:::

::: example Rotational constants of HCl in two vibrational levels {#ex-hcl-comb}
Lines of the $\mathrm{H^{35}Cl}$ fundamental (computed from the Huber–Herzberg constants, which reproduce the measured positions to about $0.02\ \mathrm{cm^{-1}}$) are R(0) $2906.24$, R(1) $2925.88$, P(1) $2865.10$, P(2) $2843.62\ \mathrm{cm^{-1}}$. Find $\tilde B_0$ and $\tilde B_1$ and the change in mean bond length.
::: solution
With $J = 1$ in equation [[#eq-comb-diff]], the lower-state difference is R(0) − P(2) $= 2906.24 - 2843.62 = 62.62\ \mathrm{cm^{-1}} = 6\tilde B_0$, so $\tilde B_0 = 10.437\ \mathrm{cm^{-1}}$. The upper-state difference is R(1) − P(1) $= 2925.88 - 2865.10 = 60.78\ \mathrm{cm^{-1}} = 6\tilde B_1$, so $\tilde B_1 = 10.130\ \mathrm{cm^{-1}}$. Since $\tilde B \propto 1/\langle r^{-2}\rangle$, roughly $1/r^2$, the effective bond length grows by a factor $\sqrt{10.437/10.130} = 1.015$: in $v = 1$ the molecule is $1.5\,\%$ longer on average, because the anharmonic well is wider on the outside. The difference $\tilde B_0 - \tilde B_1 = 0.307\ \mathrm{cm^{-1}}$ is the vibration–rotation constant $\alpha_\mathrm{e}$ (tabulated $0.3072$), and the same constant explains why the R lines crowd together and the P lines spread out as $J$ rises.
:::
:::

::: widget plot
f: (300/t)*(sum((j+1)*exp(-15.02*j*(j+1)/t)/(1 + (x - 2885.98 - 10.133*(j+1)*(j+2) + 10.440*j*(j+1))^2/g^2), j, 0, 20) + sum(j*exp(-15.02*j*(j+1)/t)/(1 + (x - 2885.98 - 10.133*j*(j-1) + 10.440*j*(j+1))^2/g^2), j, 1, 20))
x: 2650, 3120
y: 0, 5
sliders: t=300:100:1000:10; g=1:0.8:15:0.1
labels: \text{absorption (relative)}
caption: The fundamental band of $\mathrm{H^{35}Cl}$ simulated from $\tilde\nu_0 = 2885.98$, $\tilde B_0 = 10.440$ and $\tilde B_1 = 10.133\ \mathrm{cm^{-1}}$, with each line weighted by its Boltzmann population and rotational line strength ($J+1$ for R$(J)$, $J$ for P$(J)$). The slider `t` sets the temperature in kelvin and `g` the half-width of each line in $\mathrm{cm^{-1}}$ (instrumental resolution or pressure broadening). Note the gap at the band origin, the convergence of the R branch and the spreading of the P branch. Raise `g` above about $10\ \mathrm{cm^{-1}}$ and the lines merge into two humps, the P and R envelopes that a low-resolution spectrometer records; raise `t` and the envelopes move apart, because higher $J$ levels are populated. (Real spectra also show a weaker $\mathrm{H^{37}Cl}$ line about $2\ \mathrm{cm^{-1}}$ below each line.)
:::

In liquids and solutions rotation is quenched by collisions within picoseconds: the fine structure disappears and every band becomes a single contour some $5$–$20\ \mathrm{cm^{-1}}$ wide. This is why condensed-phase infrared spectroscopy is a matter of band positions and shapes, and why gas-phase spectra of even small molecules look so different from the spectra of the same compounds in solution.

## Raman scattering

When light of wavenumber $\tilde\nu_0$ passes through a transparent sample, a small fraction of the light is scattered elastically (Rayleigh scattering), and a far smaller fraction — typically less than a thousandth of the Rayleigh intensity — comes out with a different wavenumber, $\tilde\nu_0 \mp \tilde\nu_\mathrm{vib}$. That inelastic process is **Raman scattering**. It is not absorption followed by emission: the photon energy is chosen well away from any electronic transition, and the molecule passes through no real intermediate state.

::: definition Raman scattering and the polarisability {#def-raman}
An electric field $\boldsymbol{\mathcal E}$ induces a dipole $\boldsymbol\mu_\mathrm{ind} = \boldsymbol\alpha\,\boldsymbol{\mathcal E}$, where $\boldsymbol\alpha$ is the **polarisability** tensor (a $3\times3$ symmetric tensor whose components transform like $x^2$, $xy$, $\ldots$). Light scattered with a lower wavenumber $\tilde\nu_0 - \tilde\nu_\mathrm{vib}$ forms the **Stokes** lines (the molecule ends in a higher vibrational level); light at $\tilde\nu_0 + \tilde\nu_\mathrm{vib}$ forms the **anti-Stokes** lines (the molecule starts in an excited level and ends lower). The **Raman shift** $\tilde\nu_0 - \tilde\nu_\mathrm{scattered}$ is quoted in $\mathrm{cm^{-1}}$ and is independent of the laser wavelength.
:::

::: proposition The vibrational Raman selection rule {#prop-raman-rule}
A vibration is Raman-active only if it changes the polarisability: at least one component of $\left(\partial\boldsymbol\alpha/\partial Q\right)_0$ must be non-zero. In the harmonic approximation the rule is $\Delta v = \pm1$. Equivalently, by symmetry, the mode must transform as one of the quadratic functions in the character table.
:::

::: proof
Classically, let the field oscillate as $\mathcal E_0\cos(2\pi\nu_0 t)$ and the normal coordinate as $Q = Q_0\cos(2\pi\nu_\mathrm{vib}t)$. Expand $\alpha(Q) = \alpha_0 + (\partial\alpha/\partial Q)_0\,Q + \cdots$. Then
$$
\mu_\mathrm{ind} = \alpha_0\mathcal E_0\cos(2\pi\nu_0t) + \tfrac12\left(\frac{\partial\alpha}{\partial Q}\right)_0 Q_0\mathcal E_0\left[\cos 2\pi(\nu_0 - \nu_\mathrm{vib})t + \cos 2\pi(\nu_0 + \nu_\mathrm{vib})t\right],
$$
using $\cos a\cos b = \tfrac12[\cos(a-b) + \cos(a+b)]$. The oscillating dipole radiates at the frequencies it contains: $\nu_0$ (Rayleigh) and $\nu_0 \mp \nu_\mathrm{vib}$ (Stokes and anti-Stokes), the latter only if $(\partial\alpha/\partial Q)_0 \ne 0$. Quantum mechanically the transition moment is $\langle v'|\boldsymbol\alpha|v\rangle\boldsymbol{\mathcal E}$, and the linear term gives $\langle v'|Q|v\rangle$, non-zero only for $v' = v\pm1$ — the same ladder-operator matrix element as in infrared absorption. Because the components of $\boldsymbol\alpha$ transform like binary products of coordinates, the symmetry form of the rule follows from the transition-moment criterion of [[quantum-chemistry/molecular-symmetry]].
:::

The two selection rules are complementary rather than redundant. A vibration that moves charge asymmetrically (a polar bond stretch, an O–H or C=O) gives a strong infrared band; a vibration that changes the size or shape of a large, easily polarised electron cloud (a C=C, a C–S or S–S bond, an aromatic ring breathing mode, a metal–metal bond) gives a strong Raman band. For a molecule with a **centre of inversion** the complementarity becomes absolute: $x, y, z$ are ungerade and all quadratic functions are gerade, so no fundamental can be both infrared- and Raman-active (the **rule of mutual exclusion**, worked for $\mathrm{CO_2}$ in [[quantum-chemistry/molecular-symmetry]]).

Two further observables make Raman spectra informative. First, the **depolarisation ratio** $\rho = I_\perp/I_\parallel$ measured with plane-polarised excitation: totally symmetric modes give polarised bands, $0 \le \rho < \tfrac34$, while all other modes give $\rho = \tfrac34$, so a single polariser picks out the totally symmetric vibrations. Second, the **anti-Stokes/Stokes intensity ratio**, which measures the population of the excited level and therefore the temperature of the sample, without contact.

::: example Stokes and anti-Stokes lines of tetrachloromethane {#ex-ccl4}
Tetrachloromethane has a strong totally symmetric C–Cl stretch at $459\ \mathrm{cm^{-1}}$. With a $532.0\ \mathrm{nm}$ laser, find the wavelengths of the Stokes and anti-Stokes lines and their intensity ratio at $298\ \mathrm{K}$.
::: solution
The laser wavenumber is $\tilde\nu_0 = 1/(532.0\times10^{-7}\ \mathrm{cm}) = 18\,797\ \mathrm{cm^{-1}}$. Stokes: $18\,797 - 459 = 18\,338\ \mathrm{cm^{-1}}$, i.e. $\lambda = 545.3\ \mathrm{nm}$; anti-Stokes: $18\,797 + 459 = 19\,256\ \mathrm{cm^{-1}}$, i.e. $\lambda = 519.3\ \mathrm{nm}$. The intensity ratio is the population ratio times the $\tilde\nu^4$ dependence of scattered power on frequency:
$$
\frac{I_\mathrm{aS}}{I_\mathrm{S}} = \left(\frac{\tilde\nu_0 + \tilde\nu_\mathrm{vib}}{\tilde\nu_0 - \tilde\nu_\mathrm{vib}}\right)^4 \mathrm{e}^{-hc\tilde\nu_\mathrm{vib}/k_\mathrm{B}T}
= \left(\frac{19\,256}{18\,338}\right)^4 \times \mathrm{e}^{-1.4388\times459/298} = 1.216 \times 0.109 = 0.133 .
$$
The anti-Stokes line is about one-eighth as strong as the Stokes line. For a mode at $992\ \mathrm{cm^{-1}}$ (the ring breathing of benzene) the ratio falls to $0.013$, which is why Raman spectra are normally recorded on the Stokes side and the anti-Stokes side is used as a thermometer for low-frequency modes.
:::
:::

::: quiz Choosing the technique
A chemist wants to follow the C=C stretch of a symmetrically substituted alkene, $\mathrm{R_2C{=}CR_2}$ (with a centre of inversion), in aqueous solution. Which technique is the better choice?
- [ ] Infrared absorption, because C=C stretches are always strong in the infrared.
- [x] Raman scattering, because the stretch is gerade and changes the polarisability, and water is a weak Raman scatterer.
- [ ] Either: infrared and Raman have identical selection rules for a molecule with a centre of inversion.
- [ ] Neither: a symmetric C=C stretch is inactive in both.
::: solution
With a centre of inversion, the symmetric C=C stretch is totally symmetric ($\mathrm{A_g}$): it changes no dipole and is infrared-inactive, but it strongly changes the polarisability of the $\pi$ cloud and gives an intense, polarised Raman band. Water, strongly absorbing over much of the infrared, scatters weakly in the Raman spectrum, so aqueous samples are routine. Mutual exclusion means the two techniques have *complementary*, not identical, rules — and a totally symmetric stretch is never inactive in both.
:::
:::

## Measuring a spectrum: the Fourier-transform instrument

Older infrared spectrometers dispersed light with a grating and scanned one wavelength at a time through a narrow slit. Almost all modern instruments instead use a **Michelson interferometer**: a beam splitter sends half the light to a fixed mirror and half to a moving mirror, the two beams recombine, and a detector records the intensity as a function of the **optical path difference** $\delta$ (twice the mirror displacement). For monochromatic light of wavenumber $\tilde\nu$ the detected intensity oscillates as $1 + \cos(2\pi\tilde\nu\delta)$; for a broad source each wavenumber contributes its own cosine, and the record — the **interferogram** — is
$$
I(\delta) = \int_0^\infty B(\tilde\nu)\left[1 + \cos(2\pi\tilde\nu\delta)\right]\mathrm{d}\tilde\nu ,
$$ {#eq-interferogram}
whose oscillating part is the cosine Fourier transform of the spectrum $B(\tilde\nu)$. A computer inverts it (with the fast Fourier transform) to give the spectrum; the sample spectrum divided by a background spectrum gives the transmittance.

::: widget plot
f: cos(2*pi*1000*x/10000) + cos(2*pi*(1000 + d)*x/10000); 2*cos(pi*d*x/10000); -2*cos(pi*d*x/10000)
x: 0, 500
y: -2.4, 2.4
sliders: d=40:10:200:5
labels: \text{interferogram}; \text{envelope}; \text{envelope}
caption: The interferogram of two equally intense lines at $1000$ and $1000 + d\ \mathrm{cm^{-1}}$ against optical path difference in micrometres. The fast oscillation has a period of $10\ \mathrm{\mu m}$; the beat envelope has period $1/d$ (in centimetres), $10^4/d\ \mathrm{\mu m}$. To tell the two lines apart the mirror must travel far enough to reveal the beat: slide `d` down to $20$ and the first node moves to $250\ \mathrm{\mu m}$, so recording only the first $100\ \mathrm{\mu m}$ would leave the two lines indistinguishable. This is the origin of the resolution rule $\Delta\tilde\nu \approx 1/\delta_\mathrm{max}$.
:::

Three advantages explain why Fourier-transform infrared (FTIR) displaced dispersive instruments. The **multiplex (Fellgett) advantage**: every wavenumber is measured throughout the scan, so for a detector-noise-limited instrument the signal-to-noise ratio improves by roughly the square root of the number of resolution elements. The **throughput (Jacquinot) advantage**: a circular aperture passes far more light than a narrow slit. The **wavenumber accuracy (Connes) advantage**: the mirror position is tracked by the fringes of a helium–neon reference laser, so the wavenumber scale is calibrated internally to better than $0.01\ \mathrm{cm^{-1}}$. Sampling has changed too: most routine spectra are now taken by **attenuated total reflectance** (ATR), pressing the sample onto a diamond or germanium crystal in which the infrared beam is totally internally reflected, so that only the first micrometre or so of sample is probed and no preparation is needed.

Raman spectrometers use a laser (commonly $532$, $633$, $785$ or $1064\ \mathrm{nm}$), a filter that rejects the Rayleigh line, and a grating with a CCD detector. The main practical enemy is **fluorescence** from the sample or impurities, which can be many orders of magnitude stronger than Raman scattering; moving to near-infrared excitation ($785$ or $1064\ \mathrm{nm}$) usually avoids it at the cost of the $\tilde\nu^4$ factor. Lasers used in Raman instruments are typically Class 3B or Class 4: the beam and its specular reflections can cause permanent eye injury, so enclosed sample compartments, interlocks and laser-safety eyewear rated for the wavelength are required, and alignment work is done only by trained users under the local laser-safety rules.

::: example Resolution of an FTIR scan {#ex-ftir-res}
A spectrometer's moving mirror travels $0.25\ \mathrm{cm}$ from zero path difference. What is the nominal resolution? Could it resolve the R(0) and R(1) lines of HCl ($19.6\ \mathrm{cm^{-1}}$ apart) and the $\mathrm{H^{35}Cl}$/$\mathrm{H^{37}Cl}$ doublets (about $2\ \mathrm{cm^{-1}}$ apart)?
::: solution
The optical path difference is twice the mirror travel, $\delta_\mathrm{max} = 0.50\ \mathrm{cm}$, so $\Delta\tilde\nu \approx 1/\delta_\mathrm{max} = 2.0\ \mathrm{cm^{-1}}$. Adjacent rotational lines, $\approx 20\ \mathrm{cm^{-1}}$ apart, are resolved easily; the chlorine isotope doublets sit right at the limit and would appear as shoulders. Routine liquid and solid samples are measured at $4\ \mathrm{cm^{-1}}$ (a mirror travel of only $1.25\ \mathrm{mm}$), because condensed-phase bands are wider than that anyway; gas-phase work at $0.1\ \mathrm{cm^{-1}}$ or better needs path differences of $10\ \mathrm{cm}$ or more.
:::
:::

## Characteristic group frequencies

The previous sections treated vibrations as whole-molecule normal modes. The practical miracle of infrared spectroscopy is that certain modes nevertheless stay *localised* — a stretch of a bond to hydrogen, which moves the light atom almost alone, or a stretch of a stiff multiple bond whose frequency is far from those of its neighbours, so that it couples weakly with them. Such modes appear at nearly the same wavenumber in every molecule containing the group. Two-atom reasoning, $\tilde\nu = (1/2\pi c)\sqrt{k/\mu}$, explains the main regions:

- **Light atoms high**: X–H stretches ($\mu \approx 1\ \mathrm{u}$) lie between $2500$ and $3700\ \mathrm{cm^{-1}}$.
- **Stiff bonds high**: triple bonds ($k \approx 1600$–$1900\ \mathrm{N\,m^{-1}}$) at $2100$–$2260$, double bonds ($k \approx 950$–$1200$) at $1600$–$1850$, single bonds between heavy atoms ($k \approx 400$–$500$) below $1300\ \mathrm{cm^{-1}}$.
- **Below about $1500\ \mathrm{cm^{-1}}$**, the **fingerprint region**, single-bond stretches and bends of similar frequency mix strongly; individual bands are hard to assign, but the pattern as a whole identifies a compound by comparison with a reference spectrum.

The table collects the most useful bands (ranges for condensed-phase spectra, after Socrates, *Infrared and Raman Characteristic Group Frequencies*, and Pretsch, Bühlmann and Badertscher, *Structure Determination of Organic Compounds*; s = strong, m = medium, w = weak).

| group and vibration | $\tilde\nu/\mathrm{cm^{-1}}$ | comments |
|---|---|---|
| O–H stretch, free (dilute solution, gas) | $3650$–$3590$ | sharp, m |
| O–H stretch, hydrogen-bonded alcohol | $3550$–$3200$ | broad, s |
| O–H stretch, carboxylic acid dimer | $3300$–$2500$ | very broad, s, under the C–H bands |
| N–H stretch, amine or amide | $3500$–$3300$ | m; $\mathrm{NH_2}$ gives two bands, NH one |
| $\equiv$C–H stretch | $\approx 3300$ | sharp, s |
| =C–H stretch (alkene, arene) | $3100$–$3000$ | m |
| C–H stretch, $\mathrm{sp^3}$ | $2960$–$2850$ | s |
| aldehyde C–H stretch | $\approx 2820$ and $2720$ | m, Fermi doublet |
| C$\equiv$N stretch | $2260$–$2220$ | m, sharp |
| C$\equiv$C stretch | $2260$–$2100$ | w; absent if symmetric |
| C=O, acid chloride | $1815$–$1785$ | s |
| C=O, anhydride | $\approx 1820$ and $1760$ | s, two bands (coupled) |
| C=O, ester | $1750$–$1735$ | s |
| C=O, aldehyde | $1740$–$1720$ | s |
| C=O, ketone (acyclic, cyclohexanone) | $\approx 1715$ | s |
| C=O, carboxylic acid dimer | $1725$–$1700$ | s |
| C=O, conjugated or aryl ketone | $1690$–$1665$ | s |
| C=O, amide (amide I) | $1690$–$1630$ | s |
| C=C stretch, alkene | $1680$–$1620$ | variable, w if symmetric |
| aromatic ring stretches | $\approx 1600$ and $1500$ | m |
| $\mathrm{NO_2}$ stretches | $\approx 1550$ and $1350$ | s |
| C–O stretch (alcohols, ethers, esters) | $1300$–$1000$ | s |

The carbonyl band deserves special study, because its exact position reports on the electronic structure around the $\mathrm{C{=}O}$ group.

::: proposition Empirical trends of the carbonyl stretch {#prop-carbonyl}
The following are empirical regularities (rationalised, not derived, by the bond-order arguments given), valid for condensed-phase spectra of compounds without strong intramolecular interactions:
1. **Conjugation** with a C=C or an aromatic ring lowers $\tilde\nu(\mathrm{C{=}O})$ by $20$–$40\ \mathrm{cm^{-1}}$ (resonance delocalisation lowers the C=O bond order).
2. An **electronegative substituent** on the carbonyl carbon (Cl, OR, O–C=O) raises it (the inductive effect suppresses the polar resonance form $\mathrm{C^+{-}O^-}$ and shortens the bond); a **lone-pair donor** that conjugates strongly (the N of an amide) lowers it. Esters ($\approx 1740$) and acid chlorides ($\approx 1800$) lie above ketones; amides ($\approx 1660$) below.
3. **Ring strain** raises it: cyclohexanone $\approx 1715$, cyclopentanone $\approx 1745$, cyclobutanone $\approx 1780\ \mathrm{cm^{-1}}$, because compressing the ring angle at the carbonyl carbon couples the C=O stretch with the stretching of the adjacent C–C bonds and gives the exocyclic C=O bond more s character.
4. **Hydrogen bonding** to the carbonyl oxygen lowers it by $10$–$50\ \mathrm{cm^{-1}}$.
:::

::: example Force constants from group frequencies {#ex-force-co}
A ketone C=O stretch lies at $1715\ \mathrm{cm^{-1}}$ and an ether C–O stretch near $1100\ \mathrm{cm^{-1}}$. Treating each as an isolated C–O oscillator, find the force constants. What does the model predict for a $^{13}\mathrm{C{=}O}$ carbonyl?
::: solution
The reduced mass is $\mu = (12.000\times15.995)/(27.995) = 6.856\ \mathrm{u} = 1.1385\times10^{-26}\ \mathrm{kg}$. Then $k = \mu(2\pi c\tilde\nu)^2$:
$$
k(\mathrm{C{=}O}) = 1.1385\times10^{-26} \times \left(2\pi \times 2.9979\times10^{10} \times 1715\right)^2 = 1188\ \mathrm{N\,m^{-1}},
\qquad
k(\mathrm{C{-}O}) = 489\ \mathrm{N\,m^{-1}} .
$$
The ratio $2.4$ is close to what one expects for a double bond against a single one. For $^{13}\mathrm{C}$ the force constant is unchanged (Born–Oppenheimer) while $\mu$ becomes $13.003\times15.995/28.998 = 7.172\ \mathrm{u}$, so $\tilde\nu = 1715\sqrt{6.856/7.172} = 1677\ \mathrm{cm^{-1}}$, a shift of $38\ \mathrm{cm^{-1}}$. Isotopic labelling with $^{13}\mathrm{C}$ or $^{18}\mathrm{O}$ (which predicts $1674\ \mathrm{cm^{-1}}$) is the standard experimental proof that a band belongs to a particular bond — in enzymes, catalysts and surface species alike. Real shifts are slightly smaller than the two-atom prediction, because the normal mode also moves neighbouring atoms.
:::
:::

::: example Telling four C₄H₈O₂ isomers apart {#ex-isomers}
Four liquids of formula $\mathrm{C_4H_8O_2}$ — ethyl ethanoate, butanoic acid, 3-hydroxybutan-2-one and 1,4-dioxane — give these strong bands (besides C–H stretches near $2900\ \mathrm{cm^{-1}}$): **A** broad $3450$, sharp $1715$; **B** $1742$ and $1240$, nothing above $3100$; **C** very broad $3300$–$2500$, $1712$; **D** nothing between $1650$ and $1850$ or above $3100$, strong $1120\ \mathrm{cm^{-1}}$. Assign them.
::: solution
**D** has neither C=O nor O–H, only a strong C–O stretch: it is the cyclic diether, 1,4-dioxane. **C** shows the unmistakable carboxylic-acid pattern — an O–H band so broad (hydrogen-bonded dimers) that it swallows the C–H stretches, with a C=O near $1710\ \mathrm{cm^{-1}}$: butanoic acid. **B** has a C=O at the ester position, $1742\ \mathrm{cm^{-1}}$, plus the strong C–O–C stretch near $1240\ \mathrm{cm^{-1}}$ characteristic of ethanoates, and no O–H: ethyl ethanoate. **A** combines a hydrogen-bonded alcohol O–H ($3450$) with a ketone C=O ($1715$): 3-hydroxybutan-2-one. Note the logic: absences (no O–H, no C=O) are as decisive as presences, and the *shape* of the O–H band distinguishes an alcohol from an acid. In [[spectroscopy/structure-problems]] the same reasoning is combined with NMR and mass spectra.
:::
:::

::: warning Group frequencies are evidence, not proof {#warn-group-freq}
Three mistakes recur. First, reading a single band as a structure: a band at $1715\ \mathrm{cm^{-1}}$ is consistent with a ketone, but also with a hydrogen-bonded ester or a carboxylic acid; look for the supporting bands (C–O, O–H) and for absences. Second, ignoring the medium: O–H and N–H positions and widths depend on concentration and solvent through hydrogen bonding, and a "free" O–H at $3620\ \mathrm{cm^{-1}}$ in dilute $\mathrm{CCl_4}$ becomes a broad band near $3350$ in the neat liquid. Third, over-interpreting the fingerprint region, where bands are mixtures of many internal coordinates: use it for matching against a reference, not for assigning bonds. And remember that intensity reflects $(\partial\mu/\partial Q)^2$, not concentration of the group alone — a weak C≡C band does not mean little alkyne.
:::

### Applications

Infrared and Raman spectra are used far beyond structure determination. The vibrational bands of $\mathrm{CO_2}$, $\mathrm{H_2O}$, $\mathrm{CH_4}$ and $\mathrm{N_2O}$ in the thermal infrared — and the transparency of $\mathrm{N_2}$ and $\mathrm{O_2}$, whose only vibration changes no dipole — are the molecular basis of the greenhouse effect ([[environmental-chemistry/greenhouse-gases]]). The amide I band of proteins, $1690$–$1620\ \mathrm{cm^{-1}}$, shifts with secondary structure ($\alpha$-helices near $1655$, $\beta$-sheets near $1630\ \mathrm{cm^{-1}}$). In-situ ATR and Raman probes follow the disappearance of a reactant carbonyl or the growth of a product band in real time during a reaction. Quantitative infrared analysis obeys the Beer–Lambert law treated in [[analytical-chemistry/molecular-spectrometry]]. And Raman microscopes, with micrometre resolution, identify pigments, minerals and polymorphs of drug substances without touching the sample.

## Where this leads

Vibrational spectroscopy sits between the two neighbouring chapters of this course: pure rotation, including the rotational Raman effect with its $\Delta J = \pm 2$ rule, in [[spectroscopy/rotational-spectroscopy]], and the vibrational progressions that decorate electronic bands, governed by Franck–Condon factors, in [[spectroscopy/electronic-spectroscopy]]. The group-frequency table is one of the three pillars of [[spectroscopy/structure-problems]], with NMR ([[spectroscopy/nmr-structure]]) and mass spectrometry ([[spectroscopy/mass-spectrometry]]). Normal-mode frequencies are computed routinely from the Hessian of an electronic-structure calculation ([[computational-chemistry/potential-energy-surfaces]]), and the vibrational partition function built from them feeds the thermodynamics of [[statistical-thermodynamics]].

::: history
William Herschel discovered infrared radiation in 1800 by placing thermometers beyond the red end of a solar spectrum. William Abney and Edward Festing photographed the near-infrared absorption of many organic liquids in 1881 and noticed that bands followed atomic groupings, and William Coblentz's *Investigations of Infra-red Spectra* (1905), measured point by point, put group frequencies on a systematic footing. Adolf Smekal predicted inelastic light scattering in 1923; in 1928 C. V. Raman and K. S. Krishnan in Calcutta observed it in liquids, and Grigory Landsberg and Leonid Mandelstam independently in quartz crystals in Moscow; Raman received the Nobel Prize in Physics in 1930. Enrico Fermi explained the anomalous Raman doublet of $\mathrm{CO_2}$ in 1931. Gerhard Herzberg's *Infrared and Raman Spectra of Polyatomic Molecules* (1945) became the standard reference on normal modes. The interferometer that Albert Michelson built in 1881 became the heart of the modern spectrometer once the fast Fourier transform (James Cooley and John Tukey, 1965) and small laboratory computers made the inversion of interferograms routine; and in 1974 Martin Fleischmann, Patrick Hendra and James McQuillan observed the enormously enhanced Raman spectra of pyridine on roughened silver electrodes, the start of surface-enhanced Raman spectroscopy.
:::

::: summary
- A molecule of $N$ atoms has $3N - 6$ ($3N - 5$ if linear) normal modes, the eigenvectors of the mass-weighted Hessian; harmonically they are independent oscillators with $E = \sum_k(v_k + \tfrac12)\hbar\omega_k$.
- Symmetry decides activity: reduce $\Gamma_{3N}$, subtract translations and rotations, and call a mode infrared-active if it transforms like $x, y, z$ and Raman-active if like a quadratic function; with a centre of inversion no fundamental is both.
- Anharmonicity places overtones at $v\omega_\mathrm{e} - v(v+1)\omega_\mathrm{e}x_\mathrm{e}$, hot bands $2\omega_\mathrm{e}x_\mathrm{e}$ below the fundamental, and gives $D_0$ as the Birge–Sponer area; Fermi resonance mixes same-symmetry levels that are nearly degenerate and shares intensity between them ($\mathrm{CO_2}$: $1285.4$, $1388.2\ \mathrm{cm^{-1}}$).
- Gas-phase bands show P, (Q,) R branches; combination differences give $4\tilde B''(J+\tfrac12)$ and $4\tilde B'(J+\tfrac12)$ independently ($\mathrm{HCl}$: $\tilde B_0 = 10.44$, $\tilde B_1 = 10.13\ \mathrm{cm^{-1}}$).
- Raman scattering requires $\partial\alpha/\partial Q \ne 0$; Stokes lines dominate, the anti-Stokes/Stokes ratio measures temperature, and the depolarisation ratio identifies totally symmetric modes.
- FTIR records an interferogram whose Fourier transform is the spectrum, with resolution $\approx 1/\delta_\mathrm{max}$ and multiplex, throughput and wavenumber-accuracy advantages.
- Group frequencies follow from $\tilde\nu \propto \sqrt{k/\mu}$ for localised modes: X–H stretches above $2500$, triple bonds near $2200$, C=O at $1650$–$1820\ \mathrm{cm^{-1}}$ with empirical shifts for conjugation, substituents and ring strain; isotopic substitution proves assignments.
:::

## Exercises

::: exercise How many vibrations? {level=1 check="30"}
How many normal modes of vibration does benzene, $\mathrm{C_6H_6}$, have? (Enter the number.)
::: solution
$N = 12$ atoms, non-linear: $3N - 6 = 36 - 6 = 30$. Because of the high $\mathrm{D_{6h}}$ symmetry, ten of these are doubly degenerate pairs, leaving $20$ distinct fundamental frequencies, and mutual exclusion means only four distinct fundamentals are infrared-active and seven Raman-active.
:::
:::

::: exercise Wavenumber and wavelength {level=1 check="5.83"}
A ketone carbonyl absorbs at $1715\ \mathrm{cm^{-1}}$. What is the wavelength of the absorbed radiation? (Enter it in micrometres.)
::: solution
$\lambda = 1/\tilde\nu = 1/(1715\ \mathrm{cm^{-1}}) = 5.831\times10^{-4}\ \mathrm{cm} = 5.83\ \mathrm{\mu m}$. The mid-infrared range $4000$–$400\ \mathrm{cm^{-1}}$ corresponds to $2.5$–$25\ \mathrm{\mu m}$; older literature quotes positions in micrometres, and the conversion is a reciprocal, not a proportion.
:::
:::

::: exercise A Stokes line {level=1 check="561.6"}
Benzene's ring-breathing mode has a Raman shift of $992\ \mathrm{cm^{-1}}$. At what wavelength does its Stokes line appear with a $532.0\ \mathrm{nm}$ laser? (Enter it in nm.)
::: solution
$\tilde\nu_0 = 10^7/532.0 = 18\,797.0\ \mathrm{cm^{-1}}$; the Stokes line is at $18\,797.0 - 992 = 17\,805.0\ \mathrm{cm^{-1}}$, i.e. $\lambda = 10^7/17\,805.0 = 561.6\ \mathrm{nm}$. With a $785\ \mathrm{nm}$ laser the same shift would put the line at $852\ \mathrm{nm}$: the shift is fixed, the absolute wavelength is not.
:::
:::

::: exercise Boron trifluoride {level=2 check="3"}
$\mathrm{BF_3}$ is trigonal planar ($\mathrm{D_{3h}}$). Show that $\Gamma_\mathrm{vib} = \mathrm{A_1'} + \mathrm{A_2''} + 2\mathrm{E'}$ and decide how many fundamental bands appear in its infrared spectrum. (Enter the number of infrared bands.)
::: hint
Classes $E, 2C_3, 3C_2, \sigma_h, 2S_3, 3\sigma_v$. Count unshifted atoms and use $-1 + 2\cos\theta$ for $S_3$ ($\theta = 120^\circ$). In $\mathrm{D_{3h}}$, $(x, y)$ is $\mathrm{E'}$ and $z$ is $\mathrm{A_2''}$; $x^2 + y^2$, $z^2$ are $\mathrm{A_1'}$ and $(x^2 - y^2, xy)$ is $\mathrm{E'}$.
:::
::: solution
Unshifted atoms: $E$ 4, $C_3$ 1, $C_2$ 2, $\sigma_h$ 4, $S_3$ 1, $\sigma_v$ 2. Contributions per atom: $3, 0, -1, 1, -2, 1$. So $\chi_{3N} = (12, 0, -2, 4, -2, 2)$. Reducing ($h = 12$): $n(\mathrm{A_1'}) = \tfrac1{12}(12 + 0 - 6 + 4 - 4 + 6) = 1$, $n(\mathrm{A_2'}) = \tfrac1{12}(12 + 0 + 6 + 4 - 4 - 6) = 1$, $n(\mathrm{E'}) = \tfrac1{12}(24 + 0 + 0 + 8 + 4 + 0) = 3$, $n(\mathrm{A_1''}) = \tfrac1{12}(12 - 6 - 4 + 4 - 6) = 0$, $n(\mathrm{A_2''}) = \tfrac1{12}(12 + 6 - 4 + 4 + 6) = 2$, $n(\mathrm{E''}) = \tfrac1{12}(24 - 8 - 4) = 1$. Translations $\mathrm{E'} + \mathrm{A_2''}$, rotations $\mathrm{A_2'} + \mathrm{E''}$; hence $\Gamma_\mathrm{vib} = \mathrm{A_1'} + \mathrm{A_2''} + 2\mathrm{E'}$ (six modes as $3N - 6$ requires). Infrared-active: $\mathrm{A_2''}$ (out-of-plane bend) and both $\mathrm{E'}$ (antisymmetric stretch and in-plane bend) — **three** bands. Raman-active: $\mathrm{A_1'}$ and the two $\mathrm{E'}$, also three; the symmetric stretch appears only in the Raman spectrum, the out-of-plane bend only in the infrared, although the molecule has no centre of inversion.
:::
:::

::: exercise Anharmonicity of carbon monoxide {level=2 check="13.24"}
The fundamental of $^{12}\mathrm{C}^{16}\mathrm{O}$ is at $2143.27\ \mathrm{cm^{-1}}$ and the first overtone at $4260.06\ \mathrm{cm^{-1}}$. Find $\omega_\mathrm{e}x_\mathrm{e}$. (Enter it in $\mathrm{cm^{-1}}$.) Find $\omega_\mathrm{e}$ too.
::: solution
From [[#eq-overtone]]: $2\omega_\mathrm{e}x_\mathrm{e} = 2(2143.27) - 4260.06 = 26.48$, so $\omega_\mathrm{e}x_\mathrm{e} = 13.24\ \mathrm{cm^{-1}}$ and $\omega_\mathrm{e} = 2143.27 + 26.48 = 2169.75\ \mathrm{cm^{-1}}$ (Huber–Herzberg: $2169.81$ and $13.29\ \mathrm{cm^{-1}}$). The ratio $\omega_\mathrm{e}x_\mathrm{e}/\omega_\mathrm{e} = 0.0061$ is a third of HCl's $0.0174$: the triple bond of CO is deep and nearly harmonic over the levels the spectrum samples.
:::
:::

::: exercise A deuterium shift {level=2 check="2166"}
An $\mathrm{sp^3}$ C–H stretch lies at $2950\ \mathrm{cm^{-1}}$. Treating it as an isolated C–H oscillator, predict the C–D stretch. (Enter it in $\mathrm{cm^{-1}}$.)
::: solution
$\mu(\mathrm{CH}) = 12.000\times1.00783/13.00783 = 0.9297\ \mathrm{u}$ and $\mu(\mathrm{CD}) = 12.000\times2.01410/14.01410 = 1.7246\ \mathrm{u}$. With $k$ unchanged, $\tilde\nu(\mathrm{CD}) = 2950\sqrt{0.9297/1.7246} = 2950\times0.7342 = 2166\ \mathrm{cm^{-1}}$. Observed C–D stretches are near $2100$–$2200\ \mathrm{cm^{-1}}$, in a region otherwise almost empty — which makes deuterium labels easy to spot, and C–D bonds useful as site-specific probes in large molecules. The factor is close to, but not exactly, $1/\sqrt2 = 0.707$, because the carbon is not infinitely heavy.
:::
:::

::: exercise FTIR resolution {level=2 check="2"}
What maximum optical path difference must an FTIR spectrometer reach to achieve a nominal resolution of $0.5\ \mathrm{cm^{-1}}$? (Enter it in cm.) How far must the mirror travel?
::: solution
$\delta_\mathrm{max} \approx 1/\Delta\tilde\nu = 1/0.5 = 2\ \mathrm{cm}$; since the optical path difference is twice the mirror displacement, the mirror travels $1\ \mathrm{cm}$. The interferogram must also be sampled at least twice per period of the highest wavenumber present (the Nyquist condition): at $4000\ \mathrm{cm^{-1}}$ that is every $1.25\ \mathrm{\mu m}$ of path difference, which the He–Ne reference fringes ($0.633\ \mathrm{\mu m}$) easily provide.
:::
:::

::: exercise Birge–Sponer dissociation energy of CO {level=3 check="10.85"}
Using $\omega_\mathrm{e} = 2169.81\ \mathrm{cm^{-1}}$ and $\omega_\mathrm{e}x_\mathrm{e} = 13.288\ \mathrm{cm^{-1}}$, estimate $D_0$ of CO by a linear Birge–Sponer extrapolation. (Enter it in eV.) Compare with the thermochemical value $11.09\ \mathrm{eV}$ and comment.
::: hint
The linear extrapolation is equivalent to the Morse relation $D_\mathrm{e} = \omega_\mathrm{e}^2/4\omega_\mathrm{e}x_\mathrm{e}$; subtract $G(0)$.
:::
::: solution
$D_\mathrm{e} = 2169.81^2/(4\times13.288) = 88\,578\ \mathrm{cm^{-1}}$. $G(0) = \tfrac12(2169.81) - \tfrac14(13.288) = 1081.6\ \mathrm{cm^{-1}}$. So $D_0 = 87\,496\ \mathrm{cm^{-1}}$; with $1\ \mathrm{cm^{-1}} = 1.2398\times10^{-4}\ \mathrm{eV}$, $D_0 = 10.85\ \mathrm{eV}$. This is $2\,\%$ *below* the true value, whereas the same procedure overestimates $D_0$ of $\mathrm{H_2}$ by about $5\,\%$ ([[quantum-chemistry/vibration-rotation]]). The direction of the error depends on the curvature of the real $\Delta G$ curve: for CO the cubic constant $\omega_\mathrm{e}y_\mathrm{e}$ is positive, the spacings shrink more slowly at high $v$ than the linear law says, and the true area is larger. A linear extrapolation from the lowest levels — the Morse ladder of CO has about $80$ bound levels — is a rough estimate in either direction.
:::
:::

::: exercise Fermi resonance with a known detuning {level=3 check="0.55"}
Two interacting levels of the same symmetry are observed at $1285.4$ and $1388.2\ \mathrm{cm^{-1}}$. An independent force-field calculation puts the unperturbed fundamental $10\ \mathrm{cm^{-1}}$ above the unperturbed overtone. Find $W$ and the fraction of fundamental character, $\cos^2\theta$, in the upper level. (Enter $\cos^2\theta$.)
::: solution
The observed separation is $2\sqrt{\delta^2/4 + W^2} = 102.8$, so $\sqrt{25 + W^2} = 51.4$ and $W = \sqrt{51.4^2 - 25} = 51.16\ \mathrm{cm^{-1}}$. From $\tan 2\theta = 2W/\delta$, $\cos 2\theta = (\delta/2)/\sqrt{\delta^2/4 + W^2} = 5/51.4 = 0.0973$, and $\cos^2\theta = \tfrac12(1 + \cos 2\theta) = 0.549 \approx 0.55$. The upper level is $55\,\%$ fundamental and carries $55\,\%$ of the intensity; the lower level carries $45\,\%$. The ratio of the two band intensities, $0.55/0.45 = 1.2$, is a direct experimental measure of $\delta$ — which is how the unperturbed positions are obtained in practice.
:::
:::

::: exercise Combination differences {level=3 check="10.43"}
Two further lines of the $\mathrm{H^{35}Cl}$ fundamental are R(1) $2925.88$ and P(3) $2821.56\ \mathrm{cm^{-1}}$. Derive the appropriate combination difference and obtain $\tilde B_0$. (Enter $\tilde B_0$ in $\mathrm{cm^{-1}}$.) Why does it differ slightly from the value in [[#ex-hcl-comb]]?
::: solution
R(1) and P(3) share the upper level $J = 2$, so by [[#eq-comb-diff]] with $J = 2$, R(1) − P(3) $= 4\tilde B_0(2 + \tfrac12) = 10\tilde B_0$. Hence $\tilde B_0 = (2925.88 - 2821.56)/10 = 10.432\ \mathrm{cm^{-1}}$, against $10.437$ from the $J = 1$ pair. The decrease with $J$ is centrifugal distortion: including it, the lower-state difference is $(4\tilde B_0 - 6\tilde D_0)(J + \tfrac12) - 8\tilde D_0(J + \tfrac12)^3$, so the apparent $\tilde B_0$ is low by $6\tilde D_0$ for the $J = 1$ pair and by $14\tilde D_0$ for the $J = 2$ pair; with $\tilde D_0 = 5.3\times10^{-4}\ \mathrm{cm^{-1}}$ these are $0.003$ and $0.007\ \mathrm{cm^{-1}}$, exactly the drift observed. A plot of the differences divided by $(J + \tfrac12)$ against $(J + \tfrac12)^2$ is a straight line with intercept $4\tilde B_0 - 6\tilde D_0$ and slope $-8\tilde D_0$ — the standard way both constants are extracted from a band.
:::
:::
