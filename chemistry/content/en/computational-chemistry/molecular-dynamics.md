A geometry optimisation slides a molecule to the bottom of a potential energy well and stops. Real molecules never stop. At room temperature every atom has kinetic energy of order $k_\mathrm{B}T$, bonds vibrate, side chains rotate, solvent molecules jostle and exchange partners, and the measured properties of a liquid or a protein — its density, its heat capacity, its diffusion coefficient, its average structure — are *averages* over this ceaseless motion. **Molecular dynamics** (MD) computes those averages directly: it integrates Newton's equations of motion for every atom, step by step, on a potential energy surface supplied by a force field ([[computational-chemistry/molecular-mechanics]]) or by electronic-structure theory, and analyses the resulting trajectory with the tools of statistical mechanics ([[statistical-thermodynamics/canonical-ensemble]]). This lesson develops the integrators that make long, stable trajectories possible, the tricks that let a few thousand atoms represent a macroscopic liquid, the thermostats and barostats that control temperature and pressure, and the analysis that turns trajectories into numbers that can be compared with experiment.

## Equations of motion and the ergodic idea

For $N$ atoms with positions $\mathbf{r}_i$, masses $m_i$ and potential energy $U(\mathbf{r}_1, \dots, \mathbf{r}_N)$, Newton's second law reads
$$
m_i\ddot{\mathbf{r}}_i = \mathbf{F}_i = -\nabla_iU .
$$ {#eq-newton}
The total energy $E = K + U$, with $K = \sum_i\tfrac{1}{2}m_i\lvert\dot{\mathbf{r}}_i\rvert^{2}$, is conserved, so an isolated simulation samples the **microcanonical** (NVE) ensemble. Statistical mechanics wants ensemble averages $\langle A\rangle = \int A(\mathbf{r}, \mathbf{p})\,P(\mathbf{r}, \mathbf{p})\,\mathrm{d}\mathbf{r}\,\mathrm{d}\mathbf{p}$; molecular dynamics delivers time averages
$$
\bar A = \lim_{\tau\to\infty}\frac{1}{\tau}\int_0^{\tau}A\left(\mathbf{r}(t), \mathbf{p}(t)\right)\mathrm{d}t .
$$
The **ergodic hypothesis** asserts that the two are equal: given enough time, the trajectory visits every region of the constant-energy surface in proportion to its weight. It cannot be proved for realistic systems, and it fails in practice whenever the trajectory is trapped — behind a high torsional barrier, in a folded protein that never unfolds on the simulation time scale, in a glass. "Enough time" is the central practical question of simulation, and the reason for the enhanced-sampling methods of [[computational-chemistry/free-energy-sampling]].

## Integrating the equations of motion

Equation [[#eq-newton]] cannot be solved analytically for more than two bodies, so it is integrated numerically with a time step $h$ (often written $\Delta t$). The requirements are unusual. Accuracy over a single step matters less than **long-term stability**: a simulation runs for $10^{6}$–$10^{9}$ steps, and the energy must not drift. The force evaluation is by far the most expensive operation, so the integrator should need only one force evaluation per step. And the trajectory, being chaotic, will diverge from the exact one after a few thousand steps whatever we do; what we want is a trajectory that samples the right ensemble.

::: proposition The Verlet algorithm {#prop-verlet}
The positions at successive steps are related by
$$
\mathbf{r}(t + h) = 2\mathbf{r}(t) - \mathbf{r}(t - h) + \frac{h^{2}}{m}\mathbf{F}(t) + O(h^{4}),
$$
and the equivalent **velocity Verlet** form, which carries velocities explicitly, is
$$
\mathbf{r}(t + h) = \mathbf{r}(t) + h\mathbf{v}(t) + \frac{h^{2}}{2m}\mathbf{F}(t), \qquad
\mathbf{v}(t + h) = \mathbf{v}(t) + \frac{h}{2m}\left[\mathbf{F}(t) + \mathbf{F}(t + h)\right].
$$
The local error in the position is $O(h^{4})$, the global error after a fixed time is $O(h^{2})$, the scheme is **time-reversible**, and it needs one new force evaluation per step.
:::

::: proof
Expand $\mathbf{r}(t \pm h)$ in Taylor series:
$$
\mathbf{r}(t \pm h) = \mathbf{r}(t) \pm h\dot{\mathbf{r}}(t) + \tfrac{1}{2}h^{2}\ddot{\mathbf{r}}(t) \pm \tfrac{1}{6}h^{3}\dddot{\mathbf{r}}(t) + O(h^{4}).
$$
Adding the two expansions cancels all odd powers of $h$: $\mathbf{r}(t + h) + \mathbf{r}(t - h) = 2\mathbf{r}(t) + h^{2}\ddot{\mathbf{r}}(t) + O(h^{4})$, and $\ddot{\mathbf{r}} = \mathbf{F}/m$ gives the position form. The equation is unchanged if $h$ is replaced by $-h$ (the roles of $t + h$ and $t - h$ swap), so running the algorithm backwards retraces the trajectory exactly — time reversibility. For the velocity form, eliminate $\mathbf{r}(t - h)$ using the definition of the velocity as a central difference; substituting the two velocity-Verlet equations at successive steps reproduces the position form, so the two generate identical trajectories. Errors of $O(h^{4})$ per step accumulate over $\tau/h$ steps and, because the errors in a stable oscillatory system grow only linearly, the global error is $O(h^{2})$.
:::

Verlet is not the most accurate integrator per step — a fourth-order Runge–Kutta method has far smaller local errors — but it has a deeper property: it is **symplectic**, meaning that it preserves the phase-space volume exactly, as Hamiltonian dynamics does (Liouville's theorem). A symplectic integrator exactly conserves a "shadow" Hamiltonian that differs from the true one by $O(h^{2})$, so its energy *fluctuates* within a narrow band but does not drift systematically over millions of steps. Non-symplectic methods, Runge–Kutta included, accumulate a slow energy drift that ruins long simulations.

::: example Velocity Verlet on a harmonic oscillator {#ex-verlet-ho}
Integrate $\ddot x = -x$ (mass $1$, angular frequency $\omega = 1$) from $x = 1$, $v = 0$ with $h = 0.1$, and compare with the exact $x = \cos t$. How does the energy behave over $10\,000$ steps?
::: solution
With $F = -x$: step 1 gives $x_1 = 1 + 0 + \tfrac{1}{2}(0.01)(-1) = 0.99500$, new force $-0.99500$, $v_1 = 0 + 0.05(-1 - 0.995) = -0.09975$. Continuing:

| $t$ | $x$ | $v$ | $E = \tfrac{1}{2}(v^{2} + x^{2})$ | exact $\cos t$ |
|---|---|---|---|---|
| $0.0$ | $1.00000$ | $0.00000$ | $0.500000$ | $1.00000$ |
| $0.1$ | $0.99500$ | $-0.09975$ | $0.499988$ | $0.99500$ |
| $0.2$ | $0.98005$ | $-0.19850$ | $0.499951$ | $0.98007$ |
| $0.3$ | $0.95530$ | $-0.29527$ | $0.499891$ | $0.95534$ |

Over $10\,000$ steps ($160$ periods) the energy stays between $0.49875$ and $0.50000$: it dips periodically by at most $h^{2}/8 = 0.00125$ ($0.25\ \%$ of $E$) and shows no drift. Compare the explicit Euler method, $x_{n+1} = x_n + hv_n$, $v_{n+1} = v_n - hx_n$, which multiplies the energy by $(1 + h^{2}) = 1.01$ *every step*: after ten periods ($628$ steps) $E$ has grown from $0.5$ to about $260$.
:::
:::

::: proposition Stability of the Verlet algorithm {#prop-verlet-stability}
For a harmonic oscillator of angular frequency $\omega$, the Verlet algorithm produces bounded oscillations if and only if $\omega h < 2$. The numerical trajectory then oscillates with frequency $\tilde\omega$ given by
$$
\cos(\tilde\omega h) = 1 - \tfrac{1}{2}(\omega h)^{2}, \qquad \frac{\tilde\omega}{\omega} = 1 + \frac{(\omega h)^{2}}{24} + \cdots .
$$
:::

::: proof
For $\ddot x = -\omega^{2}x$ the position form gives the linear recurrence $x_{n+1} = (2 - \omega^{2}h^{2})x_n - x_{n-1}$. Try $x_n = \lambda^{n}$: $\lambda^{2} - (2 - \omega^{2}h^{2})\lambda + 1 = 0$. The product of the two roots is $1$. If the discriminant $(2 - \omega^{2}h^{2})^{2} - 4$ is negative, i.e. $\lvert 2 - \omega^{2}h^{2}\rvert < 2$, which for $h > 0$ means $\omega h < 2$, the roots are complex conjugates of modulus $1$, $\lambda = e^{\pm i\tilde\omega h}$, with $2\cos(\tilde\omega h) = 2 - \omega^{2}h^{2}$: bounded oscillation. If $\omega h > 2$ the roots are real with one of modulus greater than $1$, and the solution grows exponentially. Expanding $\arccos(1 - \tfrac{1}{2}u^{2}) = u + u^{3}/24 + \cdots$ gives the frequency shift.
:::

::: widget plot
f: acos(1 - x^2/2)/x; 1
x: 0.02, 1.99
y: 0.95, 1.6
labels: \tilde\omega/\omega\ (\text{Verlet}); \text{exact}
vlines: 2
caption: The frequency of a harmonic oscillator integrated with the Verlet algorithm, relative to the true frequency, against $\omega h$ (time step times angular frequency). For $\omega h = 0.1$ the numerical oscillator runs $0.04\ \%$ fast; at $\omega h = 1$ it is $4.7\ \%$ fast; at $\omega h = 2$ (dashed line) the scheme becomes unstable. With a fastest vibration of period $\tau_\mathrm{vib}$, $\omega h = 2\pi h/\tau_\mathrm{vib}$, so the usual rule of thumb $h \approx \tau_\mathrm{vib}/10$ corresponds to $\omega h \approx 0.63$ and a $1.7\ \%$ frequency error in that mode only.
:::

### Choosing the time step

The time step is limited by the fastest motion in the system. In a molecular system with explicit hydrogens that is the X–H stretch.

::: example The time step for organic molecules {#ex-timestep}
A C–H stretch has a wavenumber of about $3000\ \mathrm{cm^{-1}}$. Find its period, the Verlet stability limit, and a sensible time step. What changes if all bonds to hydrogen are constrained?
::: solution
The period is $\tau = 1/(c\tilde\nu) = 1/(2.998\times10^{10}\ \mathrm{cm\,s^{-1}} \times 3000\ \mathrm{cm^{-1}}) = 1.11\times10^{-14}\ \mathrm{s} = 11.1\ \mathrm{fs}$. The angular frequency is $\omega = 2\pi/\tau = 5.65\times10^{14}\ \mathrm{s^{-1}}$, so stability requires $h < 2/\omega = 3.5\ \mathrm{fs}$; accuracy and good energy conservation require about a tenth of the period, $h \approx 1\ \mathrm{fs}$. If the X–H bond lengths are held fixed by constraint algorithms (SHAKE, RATTLE, LINCS), the fastest remaining motions are bends and heavy-atom stretches with periods near $20\ \mathrm{fs}$, and $h = 2\ \mathrm{fs}$ is standard. Repartitioning mass from heavy atoms to their hydrogens ("hydrogen mass repartitioning") allows $4\ \mathrm{fs}$. A microsecond of biomolecular simulation thus needs $5\times10^{8}$ steps.
:::
:::

## Periodic boundary conditions

A cube of liquid water containing $1000$ molecules is about $3\ \mathrm{nm}$ across, and roughly a third of its molecules would be at the surface — a droplet, not a bulk liquid. The standard remedy is to make the simulation box the unit cell of an infinite periodic lattice.

::: definition Periodic boundary conditions and the minimum-image convention {#def-pbc}
In **periodic boundary conditions** the simulation box (side $L$ for a cube) is surrounded by identical periodic images of itself in all directions. A particle leaving through one face re-enters through the opposite face. Under the **minimum-image convention**, each particle interacts only with the nearest image of every other particle: the separation vector is reduced component by component as $\Delta x \to \Delta x - L\,\mathrm{round}(\Delta x/L)$. Short-range interactions are truncated at a cutoff $r_\mathrm{c} \leq L/2$, so that no particle interacts with two images of the same partner.
:::

::: example A box of water {#ex-water-box}
How many water molecules does a cubic box of side $3.00\ \mathrm{nm}$ hold at the density of water at $25\ ^\circ\mathrm{C}$ ($997\ \mathrm{kg\,m^{-3}}$)? Two oxygen atoms in the box are at $(0.20, 0.30, 2.90)$ and $(2.80, 0.10, 0.10)\ \mathrm{nm}$: what is their minimum-image separation?
::: solution
$n = \rho VN_\mathrm{A}/M = 997\ \mathrm{kg\,m^{-3}} \times (3.00\times10^{-9}\ \mathrm{m})^{3} \times 6.022\times10^{23}\ \mathrm{mol^{-1}}/0.018015\ \mathrm{kg\,mol^{-1}} = 900$ molecules (to the nearest molecule, $899.9$). The raw separation is $(2.60, -0.20, -2.80)\ \mathrm{nm}$, of length $3.83\ \mathrm{nm}$. Applying the minimum-image rule, $2.60 \to 2.60 - 3.00 = -0.40$ and $-2.80 \to -2.80 + 3.00 = 0.20$, giving $(-0.40, -0.20, 0.20)\ \mathrm{nm}$ and a distance of $0.490\ \mathrm{nm}$: the two molecules are close neighbours across the box boundary.
:::
:::

Periodicity has costs. It imposes artificial correlations at wavelengths of order $L$, it suppresses long-wavelength fluctuations, and for charged or strongly polar systems it requires care. Diffusion coefficients computed in periodic boxes are systematically too low by a hydrodynamic correction proportional to $k_\mathrm{B}T/(6\pi\eta L)$ (Yeh and Hummer, 2004).

**Long-range electrostatics.** Truncating the Coulomb interaction at a cutoff causes serious artefacts, because $1/r$ decays so slowly that the sum over periodic images is only conditionally convergent. **Ewald summation** splits each point charge into a screened short-range part (summed directly in real space) and a smooth long-range part (summed in reciprocal space as a Fourier series). The **particle-mesh Ewald** (PME) method evaluates the reciprocal-space part on a grid with fast Fourier transforms, at a cost that scales as $N\log N$; it is the default in biomolecular simulation.

## Temperature and pressure control

Experiments are performed at constant temperature and pressure, not constant energy. Simulations therefore couple the system to a **thermostat** (and often a **barostat**).

::: definition Instantaneous temperature {#def-temperature}
By equipartition ([[statistical-thermodynamics/thermodynamic-functions]]) each quadratic degree of freedom carries $\tfrac{1}{2}k_\mathrm{B}T$ of kinetic energy on average. The **instantaneous temperature** is defined by
$$
T_\mathrm{inst} = \frac{2K}{N_\mathrm{f}k_\mathrm{B}}, \qquad N_\mathrm{f} = 3N - N_\mathrm{c} - 3,
$$
where $N_\mathrm{c}$ is the number of holonomic constraints and the $3$ removes the conserved total momentum. $T_\mathrm{inst}$ fluctuates; only its average is the thermodynamic temperature. In the canonical ensemble its relative fluctuation is $\sqrt{2/N_\mathrm{f}}$.
:::

::: example Temperature of a water simulation {#ex-temperature}
A simulation of $899$ rigid water molecules has a total kinetic energy of $1.116\times10^{-17}\ \mathrm{J}$ at one instant. What is the instantaneous temperature, and how large are its typical fluctuations?
::: solution
Each rigid water molecule has $3$ translational and $3$ rotational degrees of freedom; the $3 \times 899 = 2697$ atoms carry $8091$ Cartesian coordinates, of which $3 \times 899 = 2697$ are removed by three distance constraints per molecule, and $3$ more by momentum conservation: $N_\mathrm{f} = 6 \times 899 - 3 = 5391$. Then
$$
T_\mathrm{inst} = \frac{2 \times 1.116\times10^{-17}\ \mathrm{J}}{5391 \times 1.380649\times10^{-23}\ \mathrm{J\,K^{-1}}} = 299.9\ \mathrm{K}.
$$
The relative fluctuation is $\sqrt{2/5391} = 0.0193$, i.e. about $\pm 5.8\ \mathrm{K}$ at $300\ \mathrm{K}$. A snapshot temperature differing by a few kelvin from the target is not evidence of a broken thermostat.
:::
:::

The main thermostats, in order of increasing rigour:

- **Velocity rescaling and the Berendsen thermostat** (1984) scale all velocities each step so that the temperature relaxes towards the target $T_0$ as $\mathrm{d}T/\mathrm{d}t = (T_0 - T)/\tau_T$. It is robust and excellent for equilibration, but it suppresses kinetic-energy fluctuations and does *not* generate the canonical ensemble. The stochastic velocity-rescaling thermostat of Bussi, Donadio and Parrinello (2007) adds a correctly chosen random term and does.
- **Nosé–Hoover** (1984–85) extends the system with a fictitious degree of freedom that acts as a friction coefficient, exchanging energy with a heat bath; its extended dynamics is deterministic and time-reversible and samples the canonical ensemble if ergodic (chains of thermostats are used to secure ergodicity for stiff systems).
- **Langevin dynamics** adds a friction force $-\gamma m\mathbf{v}$ and a random force whose variance is fixed by the fluctuation–dissipation theorem, $2\gamma mk_\mathrm{B}T$ per unit time per component. It samples the canonical ensemble rigorously and is robust, but it perturbs the dynamics, so transport coefficients depend on $\gamma$.

Barostats (Berendsen, Parrinello–Rahman, Monte Carlo) let the box volume fluctuate in response to the instantaneous pressure, computed from the virial $P = (Nk_\mathrm{B}T + \tfrac{1}{3}\sum_i\mathbf{r}_i\cdot\mathbf{F}_i)/V$, so that the simulation samples the isothermal–isobaric (NPT) ensemble and yields the density.

::: widget odesolver
f: (300 - y)/0.1
y0: 250
t: 0, 0.5
exact: 300 - 50*exp(-t/0.1)
h: 0.05
caption: Berendsen-type relaxation of the temperature, $\mathrm{d}T/\mathrm{d}t = (T_0 - T)/\tau_T$, from $250\ \mathrm{K}$ towards $T_0 = 300\ \mathrm{K}$ with coupling time $\tau_T = 0.1\ \mathrm{ps}$ ($t$ in picoseconds). The exact solution approaches $T_0$ exponentially. Increase the step towards $0.2\ \mathrm{ps}$ ($h > 2\tau_T$) and the Euler solution overshoots and oscillates with growing amplitude — the same stability boundary ($h\lambda < 2$) that limits the MD time step, here for a relaxation rather than a vibration.
:::

::: warning The Berendsen thermostat gives the wrong ensemble {#warn-berendsen}
Because it forces the kinetic energy towards its target deterministically, the Berendsen thermostat suppresses the natural fluctuations of $K$. Averages such as the mean energy are nearly right, but quantities that depend on fluctuations — the heat capacity $C_V = \langle\delta E^{2}\rangle/k_\mathrm{B}T^{2}$, compressibilities from volume fluctuations — are wrong, and in long simulations it can produce the "flying ice cube" artefact, in which kinetic energy drains from high-frequency modes into overall translation and rotation. Use Berendsen coupling only for equilibration, and a canonical thermostat (Nosé–Hoover chains, stochastic velocity rescaling, Langevin) for production runs.
:::

## A simulation from start to finish

::: algorithm A molecular-dynamics simulation {#alg-md}
1. **Set up**: build the initial structure (crystal structure, solvated molecule, random liquid configuration), choose the force field and water model, add counter-ions to neutralise, and choose box size so that the solute is at least $1$–$1.2\ \mathrm{nm}$ from every face.
2. **Minimise** the energy to remove bad contacts ([[computational-chemistry/potential-energy-surfaces#alg-newton]] or steepest descent).
3. **Assign velocities** from the Maxwell–Boltzmann distribution at the target temperature, and remove the centre-of-mass motion.
4. **Equilibrate**: run first at constant volume and then at constant pressure, often with restraints on the solute that are gradually released, until the energy, temperature, density and structure have stopped drifting.
5. **Produce**: run the production trajectory with a canonical thermostat (and barostat), saving coordinates at intervals much longer than the time step (every $1$–$10\ \mathrm{ps}$).
6. **Analyse**: compute averages and their statistical errors by **block averaging** (successive samples are correlated, so the naive standard error is too small); check convergence by comparing independent runs or the two halves of one run.
:::

## Analysing trajectories

**Structure.** The **radial distribution function** $g(r)$ — the probability of finding a particle at distance $r$ from another, relative to an ideal gas of the same density ([[statistical-thermodynamics/real-gases-liquids]]) — is computed by histogramming pair distances. For water the first peak of $g_\mathrm{OO}(r)$ near $0.28\ \mathrm{nm}$ and its integral (about $4.5$ neighbours) can be compared directly with X-ray and neutron scattering.

**Dynamics.** Molecular dynamics, unlike Monte Carlo, gives real time correlation functions, and from them transport coefficients.

::: proposition The Einstein relation for diffusion {#prop-einstein}
For a particle diffusing in three dimensions, the mean-square displacement grows linearly at long times:
$$
\left\langle\lvert\mathbf{r}(t) - \mathbf{r}(0)\rvert^{2}\right\rangle \to 6Dt \quad (t \to \infty),
$$
where $D$ is the self-diffusion coefficient. Equivalently (Green–Kubo), $D = \tfrac{1}{3}\int_0^{\infty}\langle\mathbf{v}(0)\cdot\mathbf{v}(t)\rangle\,\mathrm{d}t$.
:::

::: proof
The concentration of a tagged particle starting at the origin obeys Fick's second law $\partial c/\partial t = D\nabla^{2}c$, whose solution is a Gaussian $c(\mathbf{r}, t) = (4\pi Dt)^{-3/2}e^{-r^{2}/4Dt}$. Its second moment is $\langle r^{2}\rangle = \int r^{2}c\,\mathrm{d}\mathbf{r} = 3 \times 2Dt = 6Dt$ (each Cartesian component contributes $2Dt$). For the Green–Kubo form, write $\mathbf{r}(t) - \mathbf{r}(0) = \int_0^{t}\mathbf{v}(t')\,\mathrm{d}t'$, so $\langle\lvert\Delta\mathbf{r}\rvert^{2}\rangle = \int_0^{t}\!\int_0^{t}\langle\mathbf{v}(t')\cdot\mathbf{v}(t'')\rangle\,\mathrm{d}t'\,\mathrm{d}t''$. At equilibrium the correlation depends only on $t'' - t'$, and the double integral becomes $2\int_0^{t}(t - s)\langle\mathbf{v}(0)\cdot\mathbf{v}(s)\rangle\,\mathrm{d}s$; for $t$ much longer than the correlation time this tends to $2t\int_0^{\infty}\langle\mathbf{v}(0)\cdot\mathbf{v}(s)\rangle\,\mathrm{d}s$, and comparison with $6Dt$ gives the result.
:::

::: example The diffusion coefficient of water {#ex-diffusion}
In a simulation of liquid water at $298\ \mathrm{K}$ the oxygen mean-square displacement, after an initial non-linear region of about a picosecond, grows linearly, reaching $1.38\ \mathrm{nm^{2}}$ at $t = 100\ \mathrm{ps}$ (with the linear fit passing through the origin). Estimate $D$.
::: solution
$D = \mathrm{MSD}/6t = 1.38\times10^{-18}\ \mathrm{m^{2}}/(6 \times 100\times10^{-12}\ \mathrm{s}) = 2.3\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$, which happens to match the experimental value for water at $25\ ^\circ\mathrm{C}$ ($2.30\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$). Real water models vary considerably: TIP3P diffuses more than twice as fast as real water, while TIP4P/2005 is close. The finite-size correction of Yeh and Hummer, a few tenths of $10^{-9}\ \mathrm{m^{2}\,s^{-1}}$ for a $3\ \mathrm{nm}$ box, should be added before such comparisons.
:::
:::

::: widget plot
f: 6*D*(x - tau*(1 - exp(-x/tau))); 6*D*x
x: 0, 3
y: 0, 0.05
sliders: D=0.0023:0.0005:0.005:0.0001; tau=0.2:0.02:1:0.01
labels: \text{MSD (Langevin model)}; 6Dt
caption: Mean-square displacement (in $\mathrm{nm^{2}}$) against time (in ps) for a particle undergoing Langevin dynamics with diffusion coefficient $D$ (in $\mathrm{nm^{2}\,ps^{-1}}$; $0.0023$ is water) and velocity relaxation time $\tau$. At short times the motion is *ballistic*, $\mathrm{MSD} \propto t^{2}$; after a few $\tau$ it becomes diffusive and parallel to $6Dt$, offset by $6D\tau$. Fitting the slope only in the linear regime is essential: fitting from $t = 0$ underestimates $D$.
:::

::: quiz
Two simulations of the same liquid use time steps of $1\ \mathrm{fs}$ and $2\ \mathrm{fs}$ with velocity Verlet. In the first, the total energy fluctuates by $\pm 0.01\ \%$ with no drift; in the second it fluctuates by $\pm 0.04\ \%$, also without drift. What is the most reasonable conclusion?
- [ ] The second simulation is unstable and must be discarded.
- [x] Both behave as expected for a symplectic integrator: the fluctuation grows as $h^{2}$, and the absence of drift shows both are stable.
- [ ] The first simulation must contain an error, because energy should be exactly conserved.
- [ ] Doubling the time step should double the fluctuation.
::: solution
Verlet exactly conserves a shadow Hamiltonian differing from $H$ by $O(h^{2})$, so the energy fluctuates with an amplitude proportional to $h^{2}$: doubling $h$ quadruples it. A drift, not a fluctuation, signals trouble (too large a time step, a cutoff discontinuity, or a bug).
:::
:::

## Beyond classical force fields

**Ab initio molecular dynamics** (AIMD) computes forces from electronic-structure theory, usually DFT ([[computational-chemistry/density-functional-theory]]), at each step. In Born–Oppenheimer MD the SCF is converged at every step; in Car–Parrinello MD (1985) the orbitals are propagated as fictitious classical variables alongside the nuclei, avoiding full SCF convergence. AIMD can follow bond breaking and proton transfer but is limited to hundreds of atoms and tens to hundreds of picoseconds. **Machine-learned potentials** trained on DFT data now extend near-DFT accuracy to millions of atoms and nanoseconds. **Coarse-grained** models (MARTINI, for example) merge groups of atoms into beads, smoothing the energy surface and allowing much longer time steps and time scales for membranes and polymers, at the cost of chemical detail. Classical MD treats nuclei as classical particles; for light atoms at low temperature, nuclear quantum effects (zero-point energy, tunnelling) can be included by path-integral MD.

## Where this leads

Molecular dynamics samples configurations from the Boltzmann distribution, and so connects directly to free energies: [[computational-chemistry/free-energy-sampling]] shows how MD and Monte Carlo trajectories give free-energy differences, potentials of mean force and binding affinities, and how enhanced sampling overcomes the time-scale limits discussed above. Explicit-solvent MD is the reference against which the continuum solvation models of [[computational-chemistry/solvation-qmmm]] are judged, and QM/MM molecular dynamics follows reactions in enzymes. The statistical mechanics behind all of this is in [[statistical-thermodynamics/canonical-ensemble]] and [[statistical-thermodynamics/real-gases-liquids]].

::: history
Berni Alder and Thomas Wainwright performed the first molecular-dynamics simulation in 1957, of hard spheres, demonstrating a fluid–solid transition. Aneesur Rahman simulated liquid argon with a Lennard-Jones potential in 1964, and with Frank Stillinger liquid water in 1971. Loup Verlet introduced his integration algorithm and the neighbour list in 1967, in a study of Lennard-Jones fluids; the velocity form is due to William Swope and co-workers (1982). The first simulation of a protein, bovine pancreatic trypsin inhibitor for $9.2\ \mathrm{ps}$, was reported by Andrew McCammon, Bruce Gelin and Martin Karplus in 1977. Shuichi Nosé (1984) and William Hoover (1985) formulated deterministic canonical dynamics, Herman Berendsen and co-workers published their weak-coupling scheme in 1984, and Michele Parrinello and Rahman their constant-pressure method in 1981. Roberto Car and Parrinello introduced ab initio MD in 1985, and Tom Darden, Darrin York and Lee Pedersen the particle-mesh Ewald method in 1993. Paul Ewald's lattice summation dates from 1921.
:::

::: summary
- MD integrates Newton's equations on a potential energy surface; time averages equal ensemble averages only if the trajectory is ergodic on the simulated time scale.
- The Verlet (velocity Verlet) algorithm is time-reversible and symplectic, needs one force evaluation per step, and conserves a shadow Hamiltonian, so energy fluctuates as $h^{2}$ without drift.
- It is stable only for $\omega h < 2$; the fastest motion (X–H stretches, period $\approx 11\ \mathrm{fs}$) limits $h$ to about $1\ \mathrm{fs}$, or $2\ \mathrm{fs}$ with constraints.
- Periodic boundary conditions with the minimum-image convention mimic bulk matter; long-range electrostatics need Ewald/PME.
- Temperature is defined via equipartition, $T = 2K/N_\mathrm{f}k_\mathrm{B}$, and fluctuates by $\sqrt{2/N_\mathrm{f}}$; Berendsen coupling is fine for equilibration but Nosé–Hoover, stochastic rescaling or Langevin thermostats are needed for canonical sampling.
- The Einstein relation $\mathrm{MSD} \to 6Dt$ and Green–Kubo integrals give transport coefficients; statistical errors need block averaging.
- AIMD, machine-learned and coarse-grained potentials trade accuracy against size and time scale.
:::

## Exercises

::: exercise The O–H stretch period {level=1 check="9.02"}
What is the vibrational period of an O–H stretch at $3700\ \mathrm{cm^{-1}}$? (Enter it in femtoseconds to three significant figures.)
::: solution
$\tau = 1/(c\tilde\nu) = 1/(2.99792\times10^{10} \times 3700)\ \mathrm{s} = 9.02\times10^{-15}\ \mathrm{s} = 9.02\ \mathrm{fs}$.
:::
:::

::: exercise A diffusion coefficient {level=1 check="2.3"}
The mean-square displacement of a solute grows linearly with slope $1.38\times10^{-2}\ \mathrm{nm^{2}\,ps^{-1}}$. Compute $D$. (Enter it in units of $10^{-9}\ \mathrm{m^{2}\,s^{-1}}$.)
::: solution
$D = \text{slope}/6 = 2.30\times10^{-3}\ \mathrm{nm^{2}\,ps^{-1}} = 2.30\times10^{-3} \times 10^{-18}/10^{-12}\ \mathrm{m^{2}\,s^{-1}} = 2.3\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$.
:::
:::

::: exercise Minimum image {level=1 check="0.490"}
In a cubic box of side $3.00\ \mathrm{nm}$, find the minimum-image distance between particles at $(0.20, 0.30, 2.90)$ and $(2.80, 0.10, 0.10)\ \mathrm{nm}$. (Enter it in nm.)
::: solution
The separation $(2.60, -0.20, -2.80)$ reduces to $(-0.40, -0.20, 0.20)\ \mathrm{nm}$, of length $\sqrt{0.16 + 0.04 + 0.04} = \sqrt{0.24} = 0.490\ \mathrm{nm}$.
:::
:::

::: exercise The Verlet stability limit {level=2 check="3.54"}
Find the largest time step for which Verlet integration of a $3000\ \mathrm{cm^{-1}}$ C–H stretch remains stable. (Enter it in fs to three significant figures.)
::: solution
$\omega = 2\pi c\tilde\nu = 2\pi \times 2.99792\times10^{10} \times 3000\ \mathrm{s^{-1}} = 5.651\times10^{14}\ \mathrm{s^{-1}}$, and $h_\mathrm{max} = 2/\omega = 3.54\times10^{-15}\ \mathrm{s} = 3.54\ \mathrm{fs}$ ([[#prop-verlet-stability]]). Running close to this limit would distort that mode's frequency by tens of per cent; $1\ \mathrm{fs}$ is used in practice.
:::
:::

::: exercise Temperature fluctuations {level=2 check="5.78"}
A canonical simulation has $N_\mathrm{f} = 5391$ degrees of freedom at $T = 300\ \mathrm{K}$. What is the standard deviation of the instantaneous temperature? (Enter it in kelvin.)
::: solution
$\sigma_T = T\sqrt{2/N_\mathrm{f}} = 300 \times \sqrt{2/5391}\ \mathrm{K} = 300 \times 0.01926\ \mathrm{K} = 5.78\ \mathrm{K}$. For a $50\,000$-atom protein system the fluctuation would be about $1\ \mathrm{K}$; for a single small molecule in vacuum it is comparable to $T$ itself.
:::
:::

::: exercise Euler's energy explosion {level=2 check="517"}
Show that the explicit Euler method applied to $\ddot x = -x$ multiplies $E = \tfrac{1}{2}(x^{2} + v^{2})$ by exactly $(1 + h^{2})$ per step, and find the factor by which $E$ grows in $628$ steps of $h = 0.1$. (Enter the factor to three significant figures.)
::: solution
$x_{n+1}^{2} + v_{n+1}^{2} = (x_n + hv_n)^{2} + (v_n - hx_n)^{2} = (1 + h^{2})(x_n^{2} + v_n^{2})$, the cross terms cancelling. After $628$ steps the factor is $1.01^{628} = e^{628\ln 1.01} = e^{6.249} = 517$. Euler is not symplectic: it maps phase-space areas to larger areas at every step.
:::
:::

::: exercise The numerical frequency shift {level=3 check="1.011"}
Using [[#prop-verlet-stability]], compute $\tilde\omega/\omega$ for $\omega h = 0.5$, and compare with the series $1 + (\omega h)^{2}/24$. What does this mean for vibrational spectra computed from MD trajectories? (Enter $\tilde\omega/\omega$ to four significant figures.)
::: solution
$\cos(\tilde\omega h) = 1 - 0.125 = 0.875$, so $\tilde\omega h = \arccos(0.875) = 0.50536$ and $\tilde\omega/\omega = 1.0107 \approx 1.011$. The series gives $1 + 0.25/24 = 1.0104$. Frequencies from the Fourier transform of a velocity autocorrelation function are therefore blue-shifted by about $1\ \%$ for a mode with $\omega h = 0.5$ — for a $3000\ \mathrm{cm^{-1}}$ stretch, $h = 0.5/\omega = 0.88\ \mathrm{fs}$ gives a $30\ \mathrm{cm^{-1}}$ shift, which matters when comparing with infrared spectra.
:::
:::

::: exercise Derive the velocity-autocorrelation form {level=3 check="2.4"}
A simple model of the velocity autocorrelation function of a molecule in a liquid is $\langle\mathbf{v}(0)\cdot\mathbf{v}(t)\rangle = (3k_\mathrm{B}T/m)e^{-t/\tau}$. Use the Green–Kubo relation to derive $D = k_\mathrm{B}T\tau/m$, and evaluate it for a water molecule ($m = 18.0\ \mathrm{u}$) at $298\ \mathrm{K}$ with $\tau = 0.0174\ \mathrm{ps}$. (Enter $D$ in units of $10^{-9}\ \mathrm{m^{2}\,s^{-1}}$.)
::: solution
$D = \tfrac{1}{3}\int_0^{\infty}(3k_\mathrm{B}T/m)e^{-t/\tau}\,\mathrm{d}t = k_\mathrm{B}T\tau/m$. With $m = 18.0 \times 1.66054\times10^{-27}\ \mathrm{kg} = 2.989\times10^{-26}\ \mathrm{kg}$, $k_\mathrm{B}T/m = 4.114\times10^{-21}/2.989\times10^{-26} = 1.376\times10^{5}\ \mathrm{m^{2}\,s^{-2}}$, and $D = 1.376\times10^{5} \times 1.74\times10^{-14}\ \mathrm{m^{2}\,s^{-1}} = 2.4\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$. The relaxation time is very short — a few tens of femtoseconds — because each molecule is caged by its hydrogen-bonded neighbours; in reality the correlation function of water even becomes negative (the molecule rattles back from the cage wall), which the exponential model ignores.
:::
:::
