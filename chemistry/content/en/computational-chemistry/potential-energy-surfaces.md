Almost every question a chemist asks a computer comes down to one object. What is the shape of this molecule? Which conformer is lowest? How high is the barrier to this reaction, and what does the transition state look like? Where are the infrared bands? Each of these is a question about the **potential energy surface** — the electronic energy as a function of where the nuclei sit. Electronic-structure methods (Hartree–Fock, correlated wavefunctions, density functional theory) and force fields are, from this point of view, simply different machines for evaluating one number, $E(\mathbf{R})$, and its derivatives at one geometry $\mathbf{R}$. This lesson is about what we do with that machine once we have it: how stationary points are found and classified, how a Hessian turns into vibrational frequencies, and how transition states and reaction paths are located. Everything here is independent of *how* the energy is computed, which is why the course begins with it.

## The surface and its stationary points

The Born–Oppenheimer approximation ([[quantum-chemistry/chemical-bond-qm]]) separates the slow nuclei from the fast electrons. For each frozen arrangement of nuclei we solve an electronic problem; its lowest eigenvalue, plus the nuclear repulsion, is the potential on which the nuclei then move.

::: definition Potential energy surface {#def-pes}
For a molecule of $N$ atoms with nuclear coordinates $\mathbf{R} = (X_1, Y_1, Z_1, \dots, Z_N)$, the **potential energy surface** (PES) is the function
$$
E(\mathbf{R}) = E_\mathrm{el}(\mathbf{R}) + V_\mathrm{NN}(\mathbf{R}),
$$
where $E_\mathrm{el}(\mathbf{R})$ is the electronic energy at fixed nuclei and $V_\mathrm{NN} = \sum_{A<B} Z_A Z_B e^{2}/4\pi\varepsilon_0 R_{AB}$ is the nuclear repulsion. Because $E$ is unchanged by overall translation and rotation, it depends on only $3N - 6$ internal coordinates ($3N - 5$ for a linear molecule). The **gradient** $\mathbf{g} = \nabla E$ has components $g_i = \partial E/\partial R_i$, and the force on the nuclei is $-\mathbf{g}$; the **Hessian** is the $3N \times 3N$ symmetric matrix of second derivatives $H_{ij} = \partial^{2} E/\partial R_i\,\partial R_j$.
:::

A diatomic has $3 \times 2 - 5 = 1$ internal coordinate, so its "surface" is a curve $E(r)$; water has $3$ (two bond lengths and an angle); benzene has $30$. Visualising more than two dimensions is impossible, which is why the language of this lesson is the language of calculus rather than of pictures: gradients, Hessians, eigenvalues. Two-dimensional model surfaces such as the one below are the training ground for intuition that must then work blind in $30$ or $3000$ dimensions.

Near any geometry $\mathbf{R}_0$ the energy can be expanded as a Taylor series ([Maths Atlas](/learn/maths/) covers the multivariable version):
$$
E(\mathbf{R}_0 + \Delta\mathbf{R}) = E(\mathbf{R}_0) + \mathbf{g}\T\Delta\mathbf{R} + \tfrac{1}{2}\,\Delta\mathbf{R}\T\mathbf{H}\,\Delta\mathbf{R} + \cdots
$$ {#eq-taylor-pes}
Everything in this lesson is built on [[#eq-taylor-pes]]. The gradient tells you which way is downhill; the Hessian tells you how the surface curves.

::: proposition Classification of stationary points {#prop-stationary}
A **stationary point** is a geometry where $\mathbf{g} = \mathbf{0}$. Discard the six (five) zero eigenvalues of the Hessian that correspond to overall translation and rotation, and let $\lambda_1, \dots, \lambda_{3N-6}$ be the rest. Then
- if every $\lambda_k > 0$ the point is a **local minimum** — a stable structure (a conformer, an intermediate, a product);
- if exactly one $\lambda_k < 0$ it is a **first-order saddle point** — a **transition state**;
- if $n > 1$ eigenvalues are negative it is a saddle point of order $n$, which is not a transition state for any elementary reaction.

The number of negative eigenvalues is the **index** of the stationary point.
:::

::: proof
At a stationary point the linear term of [[#eq-taylor-pes]] vanishes, so to second order $\Delta E = \tfrac{1}{2}\Delta\mathbf{R}\T\mathbf{H}\Delta\mathbf{R}$. Because $\mathbf{H}$ is real and symmetric, it has an orthonormal set of eigenvectors $\mathbf{q}_k$ with real eigenvalues $\lambda_k$. Writing $\Delta\mathbf{R} = \sum_k Q_k\mathbf{q}_k$ diagonalises the quadratic form:
$$
\Delta E = \tfrac{1}{2}\sum_k \lambda_k Q_k^{2}.
$$
If all $\lambda_k > 0$, every displacement raises the energy, so the point is a minimum. If exactly one $\lambda_k < 0$, the energy rises along every eigendirection except one, along which it falls on both sides: the point is a maximum along one direction and a minimum in the $3N - 7$ directions orthogonal to it — a mountain pass. With $n$ negative eigenvalues the energy falls along an $n$-dimensional set of directions. The six zero eigenvalues are excluded because translating or rotating the whole molecule changes nothing.
:::

The **transition state** of an elementary reaction is the highest point on the *lowest* path between two minima, and on such a path the highest point is a first-order saddle: along the path it is a maximum, and in every perpendicular direction it is a minimum, or there would be a lower path round it. This is why transition-state theory ([[kinetics/transition-state-theory]], [[statistical-thermodynamics/statistical-rate-theory]]) is built on first-order saddle points and not on higher ones.

::: example Classifying the stationary points of a model surface {#ex-classify-mb}
The Müller–Brown surface is a standard two-dimensional test for optimisation algorithms: a sum of four Gaussian-like terms with three minima and two saddle points. Numerical differentiation at the five stationary points gives the energies and Hessian eigenvalues below (arbitrary energy units). Classify each point and give the barriers for passing from the deepest minimum $\mathrm{M_1}$ to the shallowest minimum $\mathrm{M_3}$.

| point | $(x, y)$ | $E$ | $\lambda_1$ | $\lambda_2$ |
|---|---|---|---|---|
| $\mathrm{A}$ | $(-0.558, 1.442)$ | $-146.70$ | $410.5$ | $4068$ |
| $\mathrm{B}$ | $(0.623, 0.028)$ | $-108.17$ | $543.8$ | $3005$ |
| $\mathrm{C}$ | $(-0.050, 0.467)$ | $-80.77$ | $221.0$ | $1479$ |
| $\mathrm{D}$ | $(-0.822, 0.624)$ | $-40.66$ | $-750.9$ | $490.2$ |
| $\mathrm{E}$ | $(0.212, 0.293)$ | $-72.25$ | $-735.2$ | $510.9$ |
::: solution
Points A, B and C have two positive eigenvalues, so they are minima: $\mathrm{M_1} = \mathrm{A}$ (deepest, $-146.70$), $\mathrm{M_2} = \mathrm{B}$ ($-108.17$) and $\mathrm{M_3} = \mathrm{C}$ ($-80.77$). Points D and E each have exactly one negative eigenvalue: they are first-order saddle points, i.e. transition states. Geometrically D lies between A and C, and E between C and B. Going from A to C the system must pass D, so the forward barrier is $E_\mathrm{D} - E_\mathrm{A} = -40.66 - (-146.70) = 106.04$ and the reverse barrier (C back to A) is $E_\mathrm{D} - E_\mathrm{C} = 40.11$. Note how shallow C is towards B: the barrier through E is only $-72.25 - (-80.77) = 8.52$. A shallow intermediate with a low exit barrier on one side is the two-dimensional picture of a reactive intermediate that is hard to observe.
:::
:::

::: widget contour
f: min(-2*exp(-(x-1)^2 - 10*y^2) - exp(-x^2 - 10*(y-0.5)^2) - 1.7*exp(-6.5*(x+0.5)^2 + 11*(x+0.5)*(y-1.5) - 6.5*(y-1.5)^2) + 0.15*exp(0.7*(x+1)^2 + 0.6*(x+1)*(y-1) + 0.7*(y-1)^2), 0.5)
x: -1.5, 1.1
y: -0.4, 2.0
levels: 24
point: -0.6, 0.9
caption: The Müller–Brown surface, scaled by $1/100$ and capped at $0.5$ so that the contours show the chemically interesting region. Drag the point: the arrow is $\nabla E$, so $-\nabla E$ (the force) points across the contours towards lower energy. Find the three minima of [[#ex-classify-mb]] (closed contours) and the two saddle points (where contours cross in an X, and the gradient arrow vanishes even though the point is not a minimum).
:::

## Forces: the Hellmann–Feynman theorem

To go downhill we need the gradient. Computing it by finite differences costs $2 \times 3N$ energy evaluations per geometry, which is ruinous for a molecule of fifty atoms. Fortunately the derivative of an eigenvalue has a remarkably simple form.

::: theorem Hellmann–Feynman theorem {#thm-hellmann-feynman}
Let $\hat H(\lambda)$ depend on a parameter $\lambda$ (for example a nuclear coordinate), and let $\psi(\lambda)$ be a normalised *exact* eigenfunction, $\hat H\psi = E\psi$. Then
$$
\frac{\mathrm{d}E}{\mathrm{d}\lambda} = \left\langle \psi \left| \frac{\partial \hat H}{\partial\lambda} \right| \psi \right\rangle .
$$
The same holds for a variational approximate wavefunction that is fully optimised with respect to all its parameters, *provided those parameters do not themselves depend on* $\lambda$ through the basis.
:::

::: proof
Differentiate $E = \langle\psi|\hat H|\psi\rangle$:
$$
\frac{\mathrm{d}E}{\mathrm{d}\lambda} = \left\langle \frac{\partial\psi}{\partial\lambda}\right|\hat H\left|\psi\right\rangle + \left\langle\psi\left|\frac{\partial\hat H}{\partial\lambda}\right|\psi\right\rangle + \left\langle\psi\right|\hat H\left|\frac{\partial\psi}{\partial\lambda}\right\rangle .
$$
Since $\hat H$ is Hermitian and $\hat H\psi = E\psi$, the first and third terms equal $E\left(\langle\partial_\lambda\psi|\psi\rangle + \langle\psi|\partial_\lambda\psi\rangle\right) = E\,\frac{\mathrm{d}}{\mathrm{d}\lambda}\langle\psi|\psi\rangle = 0$, because the norm is constant. For a variational wavefunction the same cancellation occurs because $\partial E/\partial c = 0$ for every variational parameter $c$, so the implicit dependence of $E$ on $\lambda$ through the parameters drops out.
:::

For a nuclear coordinate $X_A$ the only parts of $\hat H$ that depend on $X_A$ are the electron–nucleus attraction and $V_\mathrm{NN}$, so the force on nucleus $A$ is the classical electrostatic force exerted by the electron density and the other nuclei — Feynman's 1939 "electrostatic theorem". In practice, however, the atom-centred basis functions of [[computational-chemistry/basis-sets]] move with the nuclei, so the wavefunction parameters *do* depend on $X_A$ and extra **Pulay forces** appear. Programs evaluate them analytically; the key fact for us is that an analytic gradient costs roughly as much as one energy, independent of $N$. Analytic gradients, introduced for Hartree–Fock by Pulay in 1969, are what made routine geometry optimisation possible.

## Geometry optimisation

A **geometry optimisation** is a search for a stationary point, usually a minimum. The simplest strategy, **steepest descent**, takes a step along the force, $\Delta\mathbf{R} = -\alpha\mathbf{g}$, with some step length $\alpha$. It always goes downhill for small $\alpha$, but it is slow in long narrow valleys: the gradient points across the valley rather than along it, and the iterates zigzag. The cure is to use curvature.

Setting the gradient of the quadratic model [[#eq-taylor-pes]] to zero, $\mathbf{g} + \mathbf{H}\Delta\mathbf{R} = \mathbf{0}$, gives the step that would land exactly on the stationary point if the surface were quadratic.

::: algorithm Newton–Raphson (quasi-Newton) optimisation {#alg-newton}
1. Choose a starting geometry $\mathbf{R}_0$ (from chemical intuition, a crystal structure or a force-field optimisation) and an initial Hessian $\mathbf{H}_0$ (computed, or a cheap model Hessian built from bond stretches and bends).
2. Compute the energy and analytic gradient $\mathbf{g}_k$ at $\mathbf{R}_k$.
3. Solve $\mathbf{H}_k\,\Delta\mathbf{R} = -\mathbf{g}_k$ for the Newton step; if it is longer than a trust radius, scale it down.
4. Set $\mathbf{R}_{k+1} = \mathbf{R}_k + \Delta\mathbf{R}$ and update the Hessian from the change in gradient (the BFGS formula does this using only gradients).
5. Stop when the largest gradient component, the root-mean-square gradient, the largest step and the energy change all fall below thresholds (typically $\sim 10^{-4}\ \mathrm{E_h\,bohr^{-1}}$ for the gradient).
6. Confirm the nature of the point by computing the full Hessian and counting negative eigenvalues ([[#prop-stationary]]).
:::

Near the minimum Newton–Raphson converges *quadratically*: the number of correct digits roughly doubles per step. Far from it, where the Hessian may have the wrong curvature, it can go anywhere — including uphill to a saddle point or a maximum, because the Newton step targets the nearest *stationary* point, not the nearest minimum.

::: example Newton–Raphson on the HCl Morse curve {#ex-newton-morse}
Model HCl by a Morse potential $V(r) = D_e\left[1 - e^{-a(r - r_e)}\right]^{2}$ with $D_e = 4.618\ \mathrm{eV}$, $a = 1.868\ \mathrm{\AA^{-1}}$ and $r_e = 1.2746\ \mathrm{\AA}$ (these parameters are derived in [[#ex-hcl-morse]]). Starting at $r_0 = 1.400\ \mathrm{\AA}$, take Newton steps $r_{k+1} = r_k - V'(r_k)/V''(r_k)$ and compare with steepest descent of step length $\alpha = 0.05\ \mathrm{\AA^{2}\,eV^{-1}}$.
::: solution
With $u = e^{-a(r - r_e)}$, $V' = 2D_e a\,u(1 - u)$ and $V'' = 2D_e a^{2}u(2u - 1)$. At $r_0 = 1.400\ \mathrm{\AA}$, $u = 0.791$, so $V' = 2.851\ \mathrm{eV\,\AA^{-1}}$ and $V'' = 14.84\ \mathrm{eV\,\AA^{-2}}$. The iterates are

| $k$ | Newton $r_k/\mathrm{\AA}$ | $V/\mathrm{eV}$ | steepest descent $r_k/\mathrm{\AA}$ | $V/\mathrm{eV}$ |
|---|---|---|---|---|
| 0 | $1.4000$ | $0.2015$ | $1.4000$ | $0.2015$ |
| 1 | $1.2079$ | $0.0811$ | $1.2574$ | $0.0049$ |
| 2 | $1.2640$ | $0.0018$ | $1.2864$ | $0.0022$ |
| 3 | $1.27425$ | $1.5\times10^{-6}$ | $1.2679$ | $7.1\times10^{-4}$ |
| 4 | $1.274550$ | $1\times10^{-12}$ | $1.2788$ | $2.9\times10^{-4}$ |

Newton's first step overshoots, because at $1.400\ \mathrm{\AA}$ the true curvature ($14.8\ \mathrm{eV\,\AA^{-2}}$) is less than half its value at the minimum ($32.2\ \mathrm{eV\,\AA^{-2}}$); but from step 2 the error is squared at each step ($10^{-2}$, $3\times10^{-4}$, $3\times10^{-7}\ \mathrm{\AA}$). Steepest descent happens to make a good first step but then oscillates about $r_e$, the error falling by only a factor of about $1.6$ per step. In many dimensions with very different curvatures the contrast is far starker.
:::
:::

::: warning Newton's method finds stationary points, not minima {#warn-newton}
Below the inflection point of a Morse curve, $r > r_e + (\ln 2)/a$ ($1.65\ \mathrm{\AA}$ for HCl), the curvature $V''$ is negative and the Newton step $-V'/V''$ points *outwards*: the "optimisation" marches off towards dissociation. In many dimensions the same thing happens whenever the Hessian has a negative eigenvalue: Newton heads for a saddle point. Production codes therefore shift the Hessian eigenvalues to make them positive (rational-function or trust-region methods) when seeking minima, and do the opposite on purpose when seeking transition states. And a converged optimisation proves only that $\mathbf{g} = \mathbf{0}$ — always check the Hessian. A "minimum" of a symmetric molecule found under imposed symmetry is very often a saddle point that would distort if the symmetry were lifted.
:::

::: widget gradientdescent
f: min(-2*exp(-(x-1)^2 - 10*y^2) - exp(-x^2 - 10*(y-0.5)^2) - 1.7*exp(-6.5*(x+0.5)^2 + 11*(x+0.5)*(y-1.5) - 6.5*(y-1.5)^2) + 0.15*exp(0.7*(x+1)^2 + 0.6*(x+1)*(y-1) + 0.7*(y-1)^2), 0.5)
start: -0.2, 1.0
rate: 0.01
steps: 60
x: -1.5, 1.1
y: -0.4, 2.0
caption: Steepest descent on the scaled Müller–Brown surface. From $(-0.2, 1.0)$ it slides into the shallow minimum $\mathrm{M_3}$ near $(-0.05, 0.47)$ — not the global minimum: a local optimiser finds the minimum of the basin it starts in. Drag the start into other basins; raise the rate above about $0.05$ and the iterates oscillate across the steep $y$ direction (the largest Hessian eigenvalue is about $40$ here, and descent is stable only for rate $< 2/\lambda_\mathrm{max}$). Switch to Newton and start near a saddle point to see it converge there instead.
:::

## Normal modes and vibrational frequencies

The Hessian at a minimum contains the harmonic vibrational spectrum. For one coordinate the link is familiar from [[quantum-chemistry/vibration-rotation]]: a curvature $k = V''(r_e)$ and reduced mass $\mu$ give $\omega = \sqrt{k/\mu}$. In many dimensions the masses differ from atom to atom, and they must be folded into the Hessian before it is diagonalised.

::: proposition Harmonic normal modes {#prop-normal-modes}
At a minimum, define mass-weighted coordinates $q_i = \sqrt{m_i}\,\Delta R_i$ and the mass-weighted Hessian $F_{ij} = H_{ij}/\sqrt{m_i m_j}$. The eigenvalues $\lambda_k$ of $\mathbf{F}$ are the squares of the harmonic angular frequencies, $\omega_k = \sqrt{\lambda_k}$, i.e. wavenumbers $\tilde\nu_k = \sqrt{\lambda_k}/2\pi c$; the eigenvectors are the **normal modes**, collective displacements in which every atom oscillates at the same frequency and in phase. Six (five) eigenvalues are zero (translations and rotations). At a transition state, the single negative eigenvalue gives an **imaginary frequency**, $\omega = i\sqrt{|\lambda|}$, and its eigenvector is the motion along the reaction coordinate.
:::

::: proof
To second order the classical Lagrangian for nuclear motion about the minimum is
$$
L = \tfrac{1}{2}\sum_i m_i \Delta\dot R_i^{2} - \tfrac{1}{2}\sum_{ij} H_{ij}\,\Delta R_i\,\Delta R_j = \tfrac{1}{2}\sum_i \dot q_i^{2} - \tfrac{1}{2}\sum_{ij} F_{ij}\,q_i q_j ,
$$
so the equations of motion are $\ddot{\mathbf{q}} = -\mathbf{F}\mathbf{q}$. Try $\mathbf{q}(t) = \mathbf{v}\cos(\omega t + \phi)$: this gives $\mathbf{F}\mathbf{v} = \omega^{2}\mathbf{v}$, an ordinary symmetric eigenvalue problem. Its orthonormal eigenvectors decouple the motion into independent one-dimensional oscillators, each of which is quantised exactly as in the harmonic oscillator. Without mass weighting the kinetic energy would not be a sum of equal-weight squares, and the problem would be the generalised eigenproblem $\mathbf{H}\mathbf{v} = \omega^{2}\mathbf{M}\mathbf{v}$, equivalent to the above.
:::

::: example From a Morse curve to a force constant: HCl {#ex-hcl-morse}
For $\mathrm{H^{35}Cl}$ the harmonic wavenumber is $\tilde\omega_e = 2990.95\ \mathrm{cm^{-1}}$ and $D_e = 4.618\ \mathrm{eV}$ (Huber and Herzberg's compilation, as tabulated in the NIST Chemistry WebBook). Find the force constant, the Morse range parameter $a$, and the zero-point energy.
::: solution
The reduced mass is $\mu = (1.007825 \times 34.968853)/(35.976678)\ \mathrm{u} = 0.979593\ \mathrm{u} = 1.62666\times10^{-27}\ \mathrm{kg}$. The angular frequency is $\omega = 2\pi c\tilde\omega_e = 2\pi \times 2.99792\times10^{10}\ \mathrm{cm\,s^{-1}} \times 2990.95\ \mathrm{cm^{-1}} = 5.6339\times10^{14}\ \mathrm{s^{-1}}$, so
$$
k = \mu\omega^{2} = 1.62666\times10^{-27}\ \mathrm{kg} \times (5.6339\times10^{14}\ \mathrm{s^{-1}})^{2} = 516\ \mathrm{N\,m^{-1}} .
$$
For the Morse potential $V''(r_e) = 2D_e a^{2}$, so $a = \omega\sqrt{\mu/2D_e}$; with $D_e = 4.618 \times 1.60218\times10^{-19}\ \mathrm{J} = 7.3989\times10^{-19}\ \mathrm{J}$,
$$
a = 5.6339\times10^{14}\ \mathrm{s^{-1}} \times \sqrt{\frac{1.62666\times10^{-27}\ \mathrm{kg}}{2 \times 7.3989\times10^{-19}\ \mathrm{J}}} = 1.868\times10^{10}\ \mathrm{m^{-1}} = 1.868\ \mathrm{\AA^{-1}} .
$$
The zero-point energy is $\tfrac{1}{2}hc\tilde\omega_e = 1495.5\ \mathrm{cm^{-1}} = 0.1854\ \mathrm{eV}$, so the spectroscopic dissociation energy is $D_0 = D_e - \tfrac{1}{2}hc\tilde\omega_e = 4.433\ \mathrm{eV}$ in the harmonic estimate (the measured $D_0$ is $4.434\ \mathrm{eV}$; anharmonicity shifts the true zero-point level by only about $13\ \mathrm{cm^{-1}}$). Computed $D_e$ values must always be compared with experiment *after* this zero-point correction.
:::
:::

::: widget plot
f: D*(1 - exp(-a*(x - 1.2746)))^2; D*a^2*(x - 1.2746)^2
x: 0.8, 4
y: -0.5, 7
sliders: D=4.618:1:8:0.01; a=1.868:0.8:3:0.01
labels: \text{Morse } V(r)/\mathrm{eV}; \text{harmonic } \tfrac{1}{2}k(r-r_e)^2
hlines: 4.618
caption: The Morse curve of HCl ($r$ in ångström) and its harmonic approximation with the same curvature $k = 2D_e a^{2}$. The harmonic model is good to a few per cent for the lowest vibrational levels but never dissociates. Change $D_e$ and $a$: the curvature at the bottom, and hence the harmonic frequency, depends only on $D_e a^{2}$, while the width of the well and the dissociation limit depend on them separately. This is why a frequency calculation alone cannot tell you a bond energy.
:::

The **zero-point energy** of a polyatomic molecule in the harmonic approximation is $E_\mathrm{ZPE} = \tfrac{1}{2}\sum_k hc\tilde\nu_k$, summed over the $3N - 6$ real modes. It is a sizeable correction: tens of kilojoules per mole for a small molecule, hundreds for a large one. It differs between reactant and transition state (the reaction-coordinate mode is not a vibration at the transition state), so it changes barriers by several kilojoules per mole, and it is the origin of most kinetic isotope effects.

::: example The zero-point energy of water {#ex-zpe-water}
The harmonic wavenumbers of $\mathrm{H_2O}$ (fitted to the measured spectrum) are $3832.2$, $1648.5$ and $3942.5\ \mathrm{cm^{-1}}$. Compute the harmonic zero-point energy in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$E_\mathrm{ZPE} = \tfrac{1}{2}(3832.2 + 1648.5 + 3942.5)\ \mathrm{cm^{-1}} = 4711.6\ \mathrm{cm^{-1}}$. The molar conversion factor is $hcN_\mathrm{A} = 6.62607\times10^{-34}\ \mathrm{J\,s} \times 2.99792\times10^{10}\ \mathrm{cm\,s^{-1}} \times 6.02214\times10^{23}\ \mathrm{mol^{-1}} = 11.9627\ \mathrm{J\,mol^{-1}}$ per $\mathrm{cm^{-1}}$, so $E_\mathrm{ZPE} = 4711.6 \times 0.0119627\ \mathrm{kJ\,mol^{-1}} = 56.4\ \mathrm{kJ\,mol^{-1}}$. That is about $6\ \%$ of the energy needed to atomise water — far larger than the "chemical accuracy" of $4\ \mathrm{kJ\,mol^{-1}}$ that good methods aim for, and a correction that can never be omitted.
:::
:::

Computed harmonic frequencies are usually compared with experiment after multiplication by an empirical **scale factor** (about $0.96$ for B3LYP with medium basis sets, $0.90$ for Hartree–Fock). The factor corrects two things at once: anharmonicity, which lowers real fundamentals below harmonic values, and systematic errors of the method. It is an empirical correction, fitted to sets of experimental fundamentals, and the same factor should not be applied blindly to zero-point energies, for which separately fitted factors exist.

::: example Normal modes of a symmetric linear triatomic {#ex-co2-modes}
Treat $\mathrm{CO_2}$ as two identical springs of force constant $k$ joining the oxygen atoms (mass $m_\mathrm{O}$) to the central carbon (mass $m_\mathrm{C}$), with no interaction between the oxygens, and consider motion along the axis only. Find the two stretching frequencies and their ratio.
::: solution
With displacements $x_1, x_2, x_3$ (O, C, O) the potential is $V = \tfrac{1}{2}k(x_2 - x_1)^{2} + \tfrac{1}{2}k(x_3 - x_2)^{2}$, and the equations of motion are
$$
m_\mathrm{O}\ddot x_1 = k(x_2 - x_1), \quad m_\mathrm{C}\ddot x_2 = k(x_1 - 2x_2 + x_3), \quad m_\mathrm{O}\ddot x_3 = k(x_2 - x_3).
$$
The eigenvalue problem has three solutions. (i) $\omega = 0$: uniform translation. (ii) The **symmetric stretch**, $x_1 = -x_3$, $x_2 = 0$: the carbon stays still and each oxygen vibrates on its own spring, so $\omega_\mathrm{s} = \sqrt{k/m_\mathrm{O}}$. (iii) The **antisymmetric stretch**, $x_1 = x_3$ with the carbon moving opposite to keep the centre of mass fixed, $x_2 = -2m_\mathrm{O}x_1/m_\mathrm{C}$; substituting into the first equation gives $\omega_\mathrm{a} = \sqrt{k\,(1/m_\mathrm{O} + 2/m_\mathrm{C})}$. Hence
$$
\frac{\omega_\mathrm{a}}{\omega_\mathrm{s}} = \sqrt{1 + \frac{2m_\mathrm{O}}{m_\mathrm{C}}} = \sqrt{1 + \frac{2 \times 15.995}{12.000}} = 1.91 .
$$
Experimentally the antisymmetric stretch lies at $2349\ \mathrm{cm^{-1}}$ and the symmetric stretch near $1340\ \mathrm{cm^{-1}}$ (it is split into two bands at $1285$ and $1388\ \mathrm{cm^{-1}}$ by Fermi resonance with the bending overtone), a ratio of about $1.7$–$1.8$. The simple model captures the main effect — the antisymmetric mode is higher because the light carbon moves a lot — and the remaining difference reflects the O–O interaction and the cross term between the two bonds, which a full quantum-chemical Hessian contains automatically.
:::
:::

::: quiz
A geometry optimisation of a molecule with $C_{2v}$ symmetry imposed converges to a structure whose frequency calculation shows one imaginary frequency, $310i\ \mathrm{cm^{-1}}$, whose normal mode breaks the symmetry. What should you conclude?
- [ ] The structure is the equilibrium geometry; imaginary frequencies are numerical noise.
- [x] The structure is a first-order saddle point; displacing along the imaginary mode and reoptimising without symmetry will find a lower, less symmetric minimum.
- [ ] The structure is a second-order saddle point.
- [ ] The optimiser failed, because a converged gradient implies a minimum.
::: solution
One negative Hessian eigenvalue means a first-order saddle point ([[#prop-stationary]]). Because symmetry was imposed, the optimiser could not move along the symmetry-breaking direction, in which the gradient is zero by symmetry; the structure is a stationary point, but downhill along that mode lies a lower structure of lower symmetry. Tiny imaginary frequencies (say below $50i\ \mathrm{cm^{-1}}$) can indeed be numerical noise from loose integration grids, but $310i\ \mathrm{cm^{-1}}$ is real curvature.
:::
:::

## Transition states and reaction paths

Finding a first-order saddle point is harder than finding a minimum, because there is no "downhill" to follow. Three families of methods are in common use.

- **Eigenvector following** (also called partitioned rational-function optimisation): start near the transition state with a Hessian that has one negative eigenvalue, and take a step that goes *uphill* along that eigenvector and *downhill* along all the others. It converges quickly if the starting guess is in the quadratic region of the saddle.
- **Synchronous transit** and **interpolation** methods: build a guess from the reactant and product structures (linear or quadratic synchronous transit), then refine it.
- **Chain-of-states** methods such as the **nudged elastic band** (NEB): represent the path by a string of images joined by springs, and relax each image under the component of the true force perpendicular to the path. The highest image (or a "climbing image" pushed up along the path) approximates the saddle point. These are especially popular for surface and solid-state reactions, where good guesses are hard to make.

Once found, a transition state is verified in two ways: its Hessian must have exactly one imaginary frequency, and the corresponding mode must look like the reaction (a hydrogen moving between donor and acceptor, a bond forming). The definitive test is to follow the path down from the saddle on both sides.

::: definition Intrinsic reaction coordinate {#def-irc}
The **intrinsic reaction coordinate** (IRC) is the steepest-descent path in mass-weighted coordinates from a first-order saddle point down to the minima on either side. It starts along the eigenvector of the imaginary mode and thereafter satisfies $\mathrm{d}\mathbf{q}/\mathrm{d}s = -\mathbf{g}_q/\lvert\mathbf{g}_q\rvert$, where $\mathbf{g}_q$ is the gradient with respect to mass-weighted coordinates and $s$ is the arc length. It is a geometrical construction — the path a classical system would follow with infinitesimal velocity — not the trajectory of a real reacting molecule, which has kinetic energy and may cut corners.
:::

An IRC calculation that connects the saddle point to the intended reactant and product is the evidence that the transition state belongs to the reaction you think it does. Surfaces with several saddles routinely surprise: the "transition state for a concerted reaction" may turn out, on following the IRC, to connect to an intermediate you had not considered.

The barrier height then feeds into transition-state theory. In the Eyring equation (see [[kinetics/transition-state-theory]]) the rate constant at $298\ \mathrm{K}$ is $k = (k_\mathrm{B}T/h)\,e^{-\Delta^{\ddagger}G/RT}$ with $k_\mathrm{B}T/h = 6.21\times10^{12}\ \mathrm{s^{-1}}$. Each $5.7\ \mathrm{kJ\,mol^{-1}}$ of barrier is a factor of ten in rate, which sets the accuracy a calculation needs: an error of $4\ \mathrm{kJ\,mol^{-1}}$ ("chemical accuracy", $1\ \mathrm{kcal\,mol^{-1}}$) is a factor of five in the rate constant. The free energy of activation comes from the electronic barrier plus zero-point, thermal and entropic terms evaluated from the partition functions of reactant and transition state — the harmonic frequencies of [[#prop-normal-modes]], with the imaginary mode omitted at the transition state ([[statistical-thermodynamics/statistical-rate-theory]]).

::: example From barrier to rate {#ex-barrier-rate}
A calculation gives $\Delta^{\ddagger}G = 80.0\ \mathrm{kJ\,mol^{-1}}$ for a unimolecular rearrangement at $298.15\ \mathrm{K}$. Estimate the rate constant and half-life, and the effect of a $4.0\ \mathrm{kJ\,mol^{-1}}$ error in the barrier.
::: solution
$k_\mathrm{B}T/h = (1.380649\times10^{-23} \times 298.15)/(6.62607\times10^{-34})\ \mathrm{s^{-1}} = 6.212\times10^{12}\ \mathrm{s^{-1}}$ and $\Delta^{\ddagger}G/RT = 80\,000/(8.31446 \times 298.15) = 32.27$, so
$$
k = 6.212\times10^{12}\ \mathrm{s^{-1}} \times e^{-32.27} = 0.060\ \mathrm{s^{-1}}, \qquad t_{1/2} = \frac{\ln 2}{k} = 12\ \mathrm{s}.
$$
A barrier error of $4.0\ \mathrm{kJ\,mol^{-1}}$ changes $k$ by a factor $e^{4000/(8.31446\times298.15)} = e^{1.61} = 5.0$: the half-life could be anything from $2$ to $60\ \mathrm{s}$. Absolute rate constants from computation are therefore order-of-magnitude estimates; *relative* rates of similar reactions, where errors cancel, are much more reliable.
:::
:::

At low temperature or for hydrogen transfer, nuclei can **tunnel** through the barrier. The simplest estimate, Wigner's correction, multiplies the rate by $\kappa = 1 + \tfrac{1}{24}\left(h\lvert\nu^{\ddagger}\rvert/k_\mathrm{B}T\right)^{2}$, where $\nu^{\ddagger}$ is the imaginary frequency; it is only reliable when the correction is small ($\kappa \lesssim 1.5$), and more serious treatments (Eckart barriers, small-curvature tunnelling) use the shape of the path near the saddle.

## How good is the surface?

The algorithms of this lesson are exact operations on a surface; the surface itself is only as good as the method that computes it. A rough hierarchy, explained in the following lessons, is:

| method | typical error in relative energies | cost scaling | typical use |
|---|---|---|---|
| force field ([[computational-chemistry/molecular-mechanics]]) | conformers: a few $\mathrm{kJ\,mol^{-1}}$; no bond breaking | $N$ to $N^{2}$ | proteins, liquids, conformer searches |
| Hartree–Fock ([[computational-chemistry/hartree-fock]]) | barriers often too high by $40$–$80\ \mathrm{kJ\,mol^{-1}}$ | $N^{4}$ | starting point for correlated methods |
| DFT ([[computational-chemistry/density-functional-theory]]) | $8$–$20\ \mathrm{kJ\,mol^{-1}}$, functional-dependent | $N^{3}$–$N^{4}$ | geometries, mechanisms, frequencies |
| CCSD(T) ([[computational-chemistry/electron-correlation]]) | $\sim 4\ \mathrm{kJ\,mol^{-1}}$ with large basis sets | $N^{7}$ | benchmarks for small molecules |

A common and sensible protocol is therefore "geometry and frequencies at a cheaper level, energies at a better one": optimise and compute frequencies with DFT, then compute single-point CCSD(T) energies at the DFT geometries. It works because stationary-point *geometries* are much less sensitive to the method than energies are — the energy error is second order in the geometry error, the same forgiving property that the variation principle has.

## Where this leads

Every later lesson supplies a way of computing $E(\mathbf{R})$ or uses one. Molecular mechanics ([[computational-chemistry/molecular-mechanics]]) replaces the electronic problem by a fitted classical function, making surfaces of proteins affordable; Hartree–Fock, basis sets, correlation and DFT ([[computational-chemistry/hartree-fock]] to [[computational-chemistry/density-functional-theory]]) compute it from first principles. Molecular dynamics ([[computational-chemistry/molecular-dynamics]]) moves the nuclei on the surface with Newton's equations instead of sliding them downhill, and free-energy methods ([[computational-chemistry/free-energy-sampling]]) replace the single minimum by a thermal average over the whole basin. The harmonic frequencies of this lesson are the input to the vibrational partition functions of [[statistical-thermodynamics/partition-function]] and to the rate theory of [[statistical-thermodynamics/statistical-rate-theory]].

::: history
The idea of a potential energy surface for a reaction is as old as quantum chemistry. In 1931 Henry Eyring and Michael Polanyi computed a semi-empirical surface for the reaction $\mathrm{H + H_2}$ from the London equation, finding the saddle point that became the "activated complex" of Eyring's transition-state theory of 1935. Hellmann (1937) and Feynman (1939) independently stated the theorem on energy derivatives that bears their names. The practical revolution came with analytic gradients: Peter Pulay's 1969 paper on Hartree–Fock forces made automatic geometry optimisation possible, and by the 1980s analytic second derivatives (Pople and co-workers, 1979) gave routine harmonic frequencies. Kenichi Fukui defined the intrinsic reaction coordinate in 1970, and Klaus Müller and Leo Brown introduced their two-dimensional test surface in 1979. The nudged elastic band method was developed by Hannes Jónsson and co-workers in the 1990s.
:::

::: summary
- The potential energy surface $E(\mathbf{R})$ depends on $3N - 6$ internal coordinates; its gradient gives forces and its Hessian gives curvature.
- Stationary points have $\mathbf{g} = \mathbf{0}$; the number of negative Hessian eigenvalues classifies them — zero for a minimum, one for a transition state.
- The Hellmann–Feynman theorem makes energy derivatives cheap; with atom-centred basis functions, Pulay terms must be added, and analytic gradients cost about as much as one energy.
- Newton–Raphson (quasi-Newton, BFGS) optimisation converges quadratically near a stationary point but finds the nearest *stationary* point, so the Hessian must always be checked.
- Diagonalising the mass-weighted Hessian gives harmonic frequencies and normal modes; an imaginary frequency marks the reaction coordinate at a transition state.
- Zero-point energies (tens of $\mathrm{kJ\,mol^{-1}}$) and scale factors are essential when comparing computed energies and frequencies with experiment.
- Transition states are confirmed by one imaginary frequency and an IRC connecting the intended minima; a $4\ \mathrm{kJ\,mol^{-1}}$ error in a barrier is a factor of five in rate at room temperature.
:::

## Exercises

::: exercise Counting modes {level=1 check="30"}
How many vibrational normal modes does benzene, $\mathrm{C_6H_6}$, have? (Enter the number.)
::: solution
Benzene has $N = 12$ atoms and is non-linear, so it has $3N - 6 = 36 - 6 = 30$ normal modes. (Symmetry groups them into $20$ distinct frequencies, $10$ of them doubly degenerate, as [[quantum-chemistry/molecular-symmetry]] explains.)
:::
:::

::: exercise A force constant from a wavenumber {level=1 check="516"}
Using $\tilde\omega_e = 2990.95\ \mathrm{cm^{-1}}$ and $\mu = 0.97959\ \mathrm{u}$ for $\mathrm{H^{35}Cl}$, compute the harmonic force constant. (Enter $k$ in $\mathrm{N\,m^{-1}}$ to three significant figures.)
::: solution
$\omega = 2\pi c\tilde\omega_e = 5.6339\times10^{14}\ \mathrm{s^{-1}}$ and $\mu = 0.97959 \times 1.66054\times10^{-27}\ \mathrm{kg} = 1.62666\times10^{-27}\ \mathrm{kg}$, so $k = \mu\omega^{2} = 516\ \mathrm{N\,m^{-1}}$.
:::
:::

::: exercise Classify a stationary point {level=1 check="1"}
At a stationary point of a non-linear triatomic molecule the mass-weighted Hessian, with translations and rotations projected out, has eigenvalues $+2.1\times10^{-1}$, $-4.0\times10^{-3}$ and $+8.6\times10^{-2}$ (atomic units). What is the index of this stationary point, and what is it? (Enter the index.)
::: solution
One eigenvalue is negative, so the index is $1$: it is a first-order saddle point, a transition state. The small magnitude of the negative eigenvalue compared with the positive ones signals a flat region of the surface — perhaps an inversion or an internal rotation — and is worth checking with a tighter integration grid before trusting it.
:::
:::

::: exercise An isotope shift {level=2 check="2145"}
Within the Born–Oppenheimer approximation the potential energy surface — and therefore the force constant — of DCl is the same as that of HCl. Using $\tilde\omega_e(\mathrm{H^{35}Cl}) = 2990.95\ \mathrm{cm^{-1}}$ and atomic masses $1.007825$, $2.014102$ and $34.968853\ \mathrm{u}$, predict $\tilde\omega_e$ for $\mathrm{D^{35}Cl}$. (Enter it in $\mathrm{cm^{-1}}$ to four significant figures.)
::: solution
$\mu_\mathrm{H} = 0.979593\ \mathrm{u}$ and $\mu_\mathrm{D} = (2.014102 \times 34.968853)/36.982955\ \mathrm{u} = 1.904413\ \mathrm{u}$. With $k$ fixed, $\tilde\omega \propto \mu^{-1/2}$, so $\tilde\omega_e(\mathrm{DCl}) = 2990.95 \times \sqrt{0.979593/1.904413}\ \mathrm{cm^{-1}} = 2145\ \mathrm{cm^{-1}}$. The measured value is $2145.2\ \mathrm{cm^{-1}}$: an excellent test of the Born–Oppenheimer idea that one surface serves all isotopologues.
:::
:::

::: exercise One Newton step {level=2 check="1.174"}
Apply one Newton–Raphson step $x_1 = x_0 - V'(x_0)/V''(x_0)$ to the double-well model $V(x) = x^{4} - 2x^{2}$ (dimensionless) starting from $x_0 = 1.5$. Then say what happens if you start from $x_0 = 0.4$ instead. (Enter $x_1$ for $x_0 = 1.5$ to four significant figures.)
::: hint
$V' = 4x^{3} - 4x$ and $V'' = 12x^{2} - 4$. Where is $V''$ negative?
:::
::: solution
At $x_0 = 1.5$: $V' = 13.5 - 6 = 7.5$ and $V'' = 27 - 4 = 23$, so $x_1 = 1.5 - 7.5/23 = 1.174$. The next step gives $1.032$, converging quadratically on the minimum at $x = 1$. From $x_0 = 0.4$: $V' = 0.256 - 1.6 = -1.344$ and $V'' = 1.92 - 4 = -2.08$, so $x_1 = 0.4 - 0.646 = -0.246$ — the step moves *towards the maximum at* $x = 0$, because $V'' < 0$ for $\lvert x\rvert < 1/\sqrt{3}$. Newton seeks stationary points, whatever their curvature.
:::
:::

::: exercise The zero-point energy of a barrier {level=2 check="18.5"}
A hydrogen-transfer reaction has a reactant C–H stretch at $2950\ \mathrm{cm^{-1}}$. At the transition state this stretch has become the imaginary reaction-coordinate mode; one bend softens from $1200$ to $1050\ \mathrm{cm^{-1}}$, and all other frequencies are assumed unchanged. By how much does zero-point energy lower the barrier relative to the purely electronic barrier? (Enter the lowering in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The transition state loses the stretch's zero-point energy, $\tfrac{1}{2} \times 2950 = 1475\ \mathrm{cm^{-1}}$ (an imaginary mode carries no zero-point energy), and the softer bend lowers it by a further $\tfrac{1}{2}(1200 - 1050) = 75\ \mathrm{cm^{-1}}$. The zero-point-corrected barrier is therefore lower than the electronic barrier by $1550\ \mathrm{cm^{-1}} \times 0.0119627\ \mathrm{kJ\,mol^{-1}}/\mathrm{cm^{-1}} = 18.5\ \mathrm{kJ\,mol^{-1}}$. In real hydrogen transfers part of this is recovered in new, stiff bending modes of the moving hydrogen at the transition state, so the net lowering is usually smaller; the stretch zero-point energy is also the origin of the primary kinetic isotope effect, since for C–D it is smaller by a factor of about $\sqrt{2}$.
:::
:::

::: exercise Wigner's tunnelling correction {level=3 check="3.18"}
A computed transition state for a hydrogen transfer has an imaginary frequency of $1500i\ \mathrm{cm^{-1}}$. Evaluate Wigner's correction $\kappa = 1 + \tfrac{1}{24}\left(hc\lvert\tilde\nu^{\ddagger}\rvert/k_\mathrm{B}T\right)^{2}$ at $298.15\ \mathrm{K}$, and comment on whether it should be trusted. (Enter $\kappa$.)
::: solution
$k_\mathrm{B}T/hc = 207.22\ \mathrm{cm^{-1}}$ at $298.15\ \mathrm{K}$, so $u = 1500/207.22 = 7.239$ and $\kappa = 1 + 52.40/24 = 3.18$. Wigner's formula is the first term of an expansion in $u^{2}$ about the top of a parabolic barrier, valid only when $u \lesssim 2$ (so that $\kappa \lesssim 1.2$); here the correction is large and the expansion has broken down. A treatment that uses the shape of the barrier (an Eckart fit, or small-curvature tunnelling along the IRC) is needed, and typically gives an even larger factor for so sharp a barrier.
:::
:::

::: exercise The Morse inflection point {level=3 check="1.65"}
Show that the curvature of the Morse potential $V = D_e\left[1 - e^{-a(r - r_e)}\right]^{2}$ changes sign at $r^{*} = r_e + (\ln 2)/a$, and evaluate $r^{*}$ for HCl ($r_e = 1.2746\ \mathrm{\AA}$, $a = 1.868\ \mathrm{\AA^{-1}}$). Explain what a Newton–Raphson optimiser does if started at $r > r^{*}$. (Enter $r^{*}$ in ångström.)
::: solution
With $u = e^{-a(r - r_e)}$, $V' = 2D_e a u(1 - u)$ and $V'' = 2D_e a^{2}u(2u - 1)$, which vanishes when $u = \tfrac{1}{2}$, i.e. $a(r^{*} - r_e) = \ln 2$. For HCl $r^{*} = 1.2746 + 0.6931/1.868 = 1.65\ \mathrm{\AA}$. For $r > r^{*}$ the curvature is negative while the gradient is positive (the force pulls the atoms together), so the Newton step $-V'/V''$ is *positive*: the optimiser moves to larger $r$ and the bond dissociates in the calculation, although steepest descent from the same point would have gone the right way. This is the one-dimensional version of [[#warn-newton]], and the reason optimisers impose positive-definite Hessians when seeking minima.
:::
:::

::: exercise Steepest descent on an anisotropic valley {level=3 check="0.818"}
On the quadratic surface $E = \tfrac{1}{2}(\lambda_1 x^{2} + \lambda_2 y^{2})$ with $\lambda_1 = 1$ and $\lambda_2 = 10$, steepest descent with fixed step $\alpha$ multiplies $x$ by $(1 - \alpha\lambda_1)$ and $y$ by $(1 - \alpha\lambda_2)$ each step. Find the step length that minimises the slowest convergence factor $\max\left(\lvert1 - \alpha\lambda_1\rvert, \lvert1 - \alpha\lambda_2\rvert\right)$, and give that optimal factor. How does Newton's method behave on the same surface? (Enter the optimal factor.)
::: solution
The maximum of the two factors is smallest when they are equal in magnitude with opposite signs: $1 - \alpha\lambda_1 = -(1 - \alpha\lambda_2)$, giving $\alpha = 2/(\lambda_1 + \lambda_2) = 2/11$. The factor is then $(\lambda_2 - \lambda_1)/(\lambda_2 + \lambda_1) = 9/11 = 0.818$: the error shrinks by only $18\ \%$ per step, and $\ln(10^{-6})/\ln(0.818) \approx 69$ steps are needed for six digits. The convergence depends on the **condition number** $\lambda_2/\lambda_1$ of the Hessian, which for molecules (stiff bonds, floppy torsions) can exceed $1000$. Newton's step $-\mathbf{H}^{-1}\mathbf{g}$ lands exactly on the minimum of a quadratic surface in one step, whatever the condition number.
:::
:::
