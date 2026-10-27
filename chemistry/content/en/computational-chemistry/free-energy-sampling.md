The quantities chemists most want from a simulation are free energies: the equilibrium constant of a reaction, the binding affinity of a drug, the solubility of a compound, the population of a conformer, the height of a barrier in solution. A free energy is not an average of anything that can be computed configuration by configuration; it is a property of the whole Boltzmann distribution, $A = -k_\mathrm{B}T\ln Q$ ([[statistical-thermodynamics/canonical-ensemble]]), and the partition function $Q$ is an integral over all of configuration space — $3N$ dimensions for $N$ atoms. This lesson develops the two ideas that make such quantities computable. First, **Monte Carlo** methods generate configurations distributed according to the Boltzmann distribution without ever computing $Q$, so that ensemble averages can be estimated by simple means. Second, **free-energy methods** — perturbation, thermodynamic integration and their relatives — compute free-energy *differences*, which are averages after all, by connecting two states through a path along which each step can be sampled well. The lesson ends with enhanced-sampling methods that overcome the time-scale problem of [[computational-chemistry/molecular-dynamics]].

## Why simple sampling fails

The configurational average of a property $A$ in the canonical ensemble is
$$
\langle A\rangle = \frac{\int A(\mathbf{r}^{N})\,e^{-\beta U(\mathbf{r}^{N})}\,\mathrm{d}\mathbf{r}^{N}}{\int e^{-\beta U(\mathbf{r}^{N})}\,\mathrm{d}\mathbf{r}^{N}}, \qquad \beta = \frac{1}{k_\mathrm{B}T}.
$$ {#eq-canonical-average}
Numerical quadrature on a grid is hopeless: ten points per coordinate for $100$ atoms is $10^{300}$ evaluations. Monte Carlo integration — evaluating the integrand at random points and averaging — has an error that falls as $n^{-1/2}$ *whatever the dimension*, which makes high-dimensional integrals tractable in principle.

::: widget montecarlo
mode: integral
f: exp(-x^2)
a: 0
b: 3
n: 1000
caption: Monte Carlo estimate of $\int_0^{3}e^{-x^{2}}\,\mathrm{d}x = 0.8862$ (essentially $\sqrt\pi/2$) from uniformly distributed random points. The error shrinks as $1/\sqrt n$ — quadrupling $n$ halves it — and this rate does not depend on the dimension of the integral. But most uniformly chosen points fall where the integrand is tiny; in $3N$ dimensions, where the Boltzmann factor is negligible almost everywhere, uniform sampling essentially never hits the important region.
:::

Uniform sampling of a dense liquid fails because almost every random configuration contains overlapping atoms with $e^{-\beta U} \approx 0$. The fraction of configuration space that matters is astronomically small. What is needed is **importance sampling**: generate configurations with probability proportional to $e^{-\beta U}$ in the first place, so that [[#eq-canonical-average]] becomes a plain average over the sample.

## The Metropolis algorithm

Metropolis, the Rosenbluths and the Tellers showed in 1953 how to do this without knowing the normalising constant: construct a random walk (a Markov chain) in configuration space whose stationary distribution is the Boltzmann distribution.

::: algorithm Metropolis Monte Carlo {#alg-metropolis}
1. Start from a configuration $\mathbf{r}_\mathrm{o}$ ("old") with energy $U_\mathrm{o}$.
2. Propose a trial configuration $\mathbf{r}_\mathrm{n}$ by a symmetric random move — for example, displace one randomly chosen particle by a vector drawn uniformly from a cube of side $2\delta$ — and compute $\Delta U = U_\mathrm{n} - U_\mathrm{o}$.
3. Accept the move with probability
$$
P_\mathrm{acc} = \min\left(1, e^{-\beta\Delta U}\right):
$$
always if the energy falls; if it rises, draw a uniform random number $\xi \in [0, 1)$ and accept if $\xi < e^{-\beta\Delta U}$.
4. If the move is rejected, the old configuration is counted *again* in the averages.
5. Repeat. After an equilibration period, average any property over the sequence of configurations.
:::

::: proposition Detailed balance and the Metropolis criterion {#prop-detailed-balance}
A Markov chain with transition probabilities $\pi(\mathrm{o}\to\mathrm{n}) = \alpha(\mathrm{o}\to\mathrm{n})P_\mathrm{acc}(\mathrm{o}\to\mathrm{n})$ leaves a distribution $\mathcal N(\mathbf{r})$ invariant if it satisfies **detailed balance**,
$$
\mathcal N(\mathrm{o})\,\pi(\mathrm{o}\to\mathrm{n}) = \mathcal N(\mathrm{n})\,\pi(\mathrm{n}\to\mathrm{o}).
$$
With a symmetric proposal, $\alpha(\mathrm{o}\to\mathrm{n}) = \alpha(\mathrm{n}\to\mathrm{o})$, the Metropolis acceptance rule satisfies detailed balance for $\mathcal N \propto e^{-\beta U}$. If the chain is also ergodic (every configuration reachable), its distribution converges to the Boltzmann distribution.
:::

::: proof
Summing the detailed-balance condition over all $\mathrm{o}$ gives $\sum_\mathrm{o}\mathcal N(\mathrm{o})\pi(\mathrm{o}\to\mathrm{n}) = \mathcal N(\mathrm{n})\sum_\mathrm{o}\pi(\mathrm{n}\to\mathrm{o}) = \mathcal N(\mathrm{n})$, since the probabilities of leaving $\mathrm{n}$ (including staying) sum to one: $\mathcal N$ is stationary. With symmetric $\alpha$, detailed balance requires $P_\mathrm{acc}(\mathrm{o}\to\mathrm{n})/P_\mathrm{acc}(\mathrm{n}\to\mathrm{o}) = \mathcal N(\mathrm{n})/\mathcal N(\mathrm{o}) = e^{-\beta(U_\mathrm{n} - U_\mathrm{o})}$. Suppose $U_\mathrm{n} > U_\mathrm{o}$: the Metropolis rule gives $P_\mathrm{acc}(\mathrm{o}\to\mathrm{n}) = e^{-\beta\Delta U}$ and $P_\mathrm{acc}(\mathrm{n}\to\mathrm{o}) = 1$, whose ratio is $e^{-\beta\Delta U}$ as required; the case $U_\mathrm{n} < U_\mathrm{o}$ is symmetric. Only *ratios* of Boltzmann factors appear, so $Q$ is never needed.
:::

The rule that rejected moves recount the old configuration is not a detail: omitting it destroys detailed balance and biases every average.

::: example Metropolis acceptance {#ex-metropolis-acc}
At $300\ \mathrm{K}$, a trial move raises the energy by $2.0\ \mathrm{kJ\,mol^{-1}}$. What is the acceptance probability? The random number drawn is $\xi = 0.31$: is the move accepted? What if $\Delta U = 10\ \mathrm{kJ\,mol^{-1}}$?
::: solution
$RT = 8.3145\times10^{-3} \times 300 = 2.494\ \mathrm{kJ\,mol^{-1}}$, so $P_\mathrm{acc} = e^{-2.0/2.494} = e^{-0.802} = 0.449$. Since $\xi = 0.31 < 0.449$, the move is accepted. For $\Delta U = 10\ \mathrm{kJ\,mol^{-1}}$, $P_\mathrm{acc} = e^{-4.01} = 0.018$: the move would be accepted about once in fifty attempts, which is how the simulation visits higher-energy configurations with exactly their Boltzmann weight.
:::
:::

::: example Choosing the step size {#ex-step-size}
A one-dimensional harmonic oscillator with $\beta U = x^{2}/2$ (so that $\langle x^{2}\rangle = 1$ exactly) is sampled by Metropolis moves $x \to x + \delta(2\xi - 1)$ for $2\times10^{5}$ steps. One run with each step size gave:

| $\delta$ | acceptance ratio | $\langle x^{2}\rangle$ |
|---|---|---|
| $0.5$ | $0.90$ | $0.9999$ |
| $2.5$ | $0.56$ | $0.9948$ |
| $10$ | $0.16$ | $0.9937$ |

Which step size is best, and why is high acceptance not the goal?
::: solution
All three estimates are within statistical error of $1$, as detailed balance guarantees for any $\delta$; what differs is efficiency. With $\delta = 0.5$ nearly every move is accepted, but each moves the walker only a little, so successive samples are strongly correlated and the walk explores the distribution slowly. With $\delta = 10$ most moves land far out where $e^{-\beta U}$ is tiny and are rejected, so the walker sits still. The decorrelation per step is greatest for an intermediate $\delta$ (here around $2.5$, comparable to the width of the distribution), with acceptance ratios of roughly $30$–$60\ \%$. The often-quoted "aim for $50\ \%$ acceptance" is a rule of thumb; the right criterion is the statistical error per unit of computer time, estimated by block averaging.
:::
:::

Monte Carlo has advantages over molecular dynamics: no forces are needed, unphysical moves are allowed (swapping particle identities, inserting and deleting particles in the **grand canonical** ensemble, rotating whole side chains, flipping between conformers), and the ensemble is exactly canonical. But it gives no dynamics, and for large flexible molecules, where a single atom move disrupts bonded geometry, it is less efficient than MD. The two are used for different purposes, and both produce Boltzmann-distributed samples on which the free-energy methods below operate.

## Free-energy perturbation

Consider two states 0 and 1 of the same system with potential energies $U_0$ and $U_1$ — for example, a solute with and without its charges, or ligand A and ligand B in a binding site. The Helmholtz free-energy difference is $\Delta A = A_1 - A_0 = -k_\mathrm{B}T\ln(Q_1/Q_0)$, and the ratio of partition functions *can* be written as an average.

::: proposition The Zwanzig equation (free-energy perturbation) {#prop-zwanzig}
$$
\Delta A = A_1 - A_0 = -k_\mathrm{B}T\ln\left\langle e^{-\beta(U_1 - U_0)}\right\rangle_0 ,
$$
where $\langle\cdots\rangle_0$ is a canonical average over configurations sampled with $U_0$. The identity is exact; for a finite sample it converges only if the configurations important in state 1 are adequately sampled in state 0.
:::

::: proof
The kinetic contributions to $Q_0$ and $Q_1$ are identical if the masses are unchanged, so only configurational integrals matter. Multiply and divide by $e^{-\beta U_0}$:
$$
\frac{Q_1}{Q_0} = \frac{\int e^{-\beta U_1}\,\mathrm{d}\mathbf{r}^{N}}{\int e^{-\beta U_0}\,\mathrm{d}\mathbf{r}^{N}} = \frac{\int e^{-\beta(U_1 - U_0)}e^{-\beta U_0}\,\mathrm{d}\mathbf{r}^{N}}{\int e^{-\beta U_0}\,\mathrm{d}\mathbf{r}^{N}} = \left\langle e^{-\beta\Delta U}\right\rangle_0 ,
$$
with $\Delta U = U_1 - U_0$. Taking $-k_\mathrm{B}T\ln$ gives the result.
:::

The exponential average is dominated by configurations with *low* $\Delta U$, which may be rare in state 0. If the distribution of $\Delta U$ sampled in state 0 is Gaussian with mean $\langle\Delta U\rangle_0$ and variance $\sigma^{2}$, the average can be evaluated exactly (it is the moment-generating function of a Gaussian), giving the **second-order cumulant** formula
$$
\Delta A = \langle\Delta U\rangle_0 - \frac{\beta\sigma^{2}}{2} .
$$ {#eq-cumulant}
The free-energy difference is lower than the average energy change by an amount that grows with the width of the distribution. Equation [[#eq-cumulant]] also shows the danger: the configurations that dominate the exponential average lie near $\langle\Delta U\rangle_0 - \beta\sigma^{2}$, i.e. $\beta\sigma$ standard deviations into the low tail. If $\beta\sigma$ is more than about $2$, those configurations are essentially never sampled and FEP converges very slowly. The practical rule is to break a large perturbation into small **windows** $\lambda = 0, \lambda_1, \lambda_2, \dots, 1$ with $\beta\sigma \lesssim 1$–$2$ in each, and to sum the window free energies.

::: example A Gaussian perturbation {#ex-fep-gauss}
In a simulation of state 0 at $300\ \mathrm{K}$, the energy difference $\Delta U = U_1 - U_0$ is found to be Gaussian with mean $10.0\ \mathrm{kJ\,mol^{-1}}$ and standard deviation $3.0\ \mathrm{kJ\,mol^{-1}}$. Estimate $\Delta A$, and say whether a single window is adequate.
::: solution
With $\beta = 1/2.494\ \mathrm{mol\,kJ^{-1}}$,
$$
\Delta A = 10.0 - \frac{(3.0)^{2}}{2 \times 2.494} = 10.0 - 1.80 = 8.2\ \mathrm{kJ\,mol^{-1}}.
$$
Here $\beta\sigma = 1.2$, so the dominant configurations lie at $\Delta U \approx 10.0 - 3.6 = 6.4\ \mathrm{kJ\,mol^{-1}}$, $1.2$ standard deviations below the mean, which are sampled about $10\ \%$ of the time: one window is acceptable. With $\sigma = 10\ \mathrm{kJ\,mol^{-1}}$ the dominant region would be four standard deviations into the tail, sampled once in $30\,000$ configurations, and the estimate would be unreliable.
:::
:::

::: widget plot
f: exp(-(x - m)^2/(2*s^2)); exp(-(x - m + s^2/2.494)^2/(2*s^2))
x: -20, 30
y: 0, 1.1
sliders: m=10:-5:20:0.1; s=3:0.5:10:0.1
labels: P_0(\Delta U)\ \text{(sampled)}; P_0(\Delta U)\,e^{-\beta\Delta U}\ \text{(what the average needs)}
caption: The distribution of $\Delta U$ (in $\mathrm{kJ\,mol^{-1}}$) sampled in state 0, and the same distribution weighted by $e^{-\beta\Delta U}$ at $300\ \mathrm{K}$ (both scaled to unit height). For a Gaussian the weighted distribution is shifted left by $\beta\sigma^{2}$. With $\sigma = 3$ the two overlap well and FEP converges; increase $\sigma$ and the weighted distribution moves into the region the simulation almost never visits — the overlap problem, cured by intermediate windows.
:::

Because each direction of an FEP calculation samples only one end state, it is good practice to compute both forward ($0 \to 1$) and backward ($1 \to 0$) estimates; a large difference between them (**hysteresis**) signals poor overlap. Bennett's **acceptance ratio** method (BAR, 1976) and its multistate generalisation (MBAR) combine forward and backward data optimally and give the minimum-variance estimate; they are the standard analysis today.

## Thermodynamic integration

Alternatively, define a hybrid potential $U(\lambda)$ that interpolates between the states, for example linearly, $U(\lambda) = (1 - \lambda)U_0 + \lambda U_1$, and differentiate the free energy with respect to $\lambda$.

::: proposition Thermodynamic integration {#prop-ti}
For a potential $U(\lambda)$ depending smoothly on a coupling parameter $\lambda$,
$$
\frac{\partial A}{\partial\lambda} = \left\langle\frac{\partial U}{\partial\lambda}\right\rangle_\lambda, \qquad
\Delta A = \int_0^{1}\left\langle\frac{\partial U}{\partial\lambda}\right\rangle_\lambda\mathrm{d}\lambda ,
$$
where $\langle\cdots\rangle_\lambda$ is a canonical average with the potential $U(\lambda)$.
:::

::: proof
$A(\lambda) = -k_\mathrm{B}T\ln Q(\lambda)$ with $Q(\lambda) \propto \int e^{-\beta U(\lambda)}\,\mathrm{d}\mathbf{r}^{N}$. Differentiating under the integral,
$$
\frac{\partial A}{\partial\lambda} = -\frac{k_\mathrm{B}T}{Q}\frac{\partial Q}{\partial\lambda} = -\frac{k_\mathrm{B}T}{Q}\int\left(-\beta\frac{\partial U}{\partial\lambda}\right)e^{-\beta U}\,\mathrm{d}\mathbf{r}^{N}\cdot\frac{Q}{\int e^{-\beta U}\,\mathrm{d}\mathbf{r}^{N}} = \left\langle\frac{\partial U}{\partial\lambda}\right\rangle_\lambda ,
$$
and integrating from $0$ to $1$ gives $\Delta A$.
:::

Thermodynamic integration (TI) replaces the exponential average of FEP by an ordinary average at each $\lambda$, which converges more gracefully, at the price of a numerical quadrature over $\lambda$. Its integrand is usually smooth if $U(\lambda)$ is chosen sensibly. When atoms are made to appear or disappear ("alchemical" changes), linear scaling of the Lennard-Jones term makes the integrand diverge near the end point where the atom is almost absent — other atoms can overlap with it — and **soft-core** potentials are used to remove the singularity.

::: example Thermodynamic integration from five windows {#ex-ti}
Simulations at five values of $\lambda$ give $\langle\partial U/\partial\lambda\rangle_\lambda = 40.0$, $22.5$, $10.1$, $2.8$ and $-1.5\ \mathrm{kJ\,mol^{-1}}$ at $\lambda = 0$, $0.25$, $0.5$, $0.75$ and $1$. Estimate $\Delta A$ by the trapezium rule and by Simpson's rule.
::: solution
Trapezium rule with spacing $0.25$:
$$
\Delta A \approx 0.25\left[\tfrac{1}{2}(40.0) + 22.5 + 10.1 + 2.8 + \tfrac{1}{2}(-1.5)\right] = 0.25 \times 54.65 = 13.7\ \mathrm{kJ\,mol^{-1}}.
$$
Simpson's rule: $\Delta A \approx \tfrac{0.25}{3}\left[40.0 + 4(22.5) + 2(10.1) + 4(2.8) - 1.5\right] = \tfrac{0.25}{3} \times 159.9 = 13.3\ \mathrm{kJ\,mol^{-1}}$. The two quadratures differ by $0.3\ \mathrm{kJ\,mol^{-1}}$ because the integrand is strongly curved; where curvature is large, more $\lambda$ points are needed (or Gaussian quadrature in $\lambda$). The difference is a direct measure of the quadrature error, to be added to the statistical error from each window.
:::
:::

## Alchemical cycles and binding free energies

Free energy is a state function, so the free energy of a physical process can be computed along an unphysical path. This is the basis of the **thermodynamic cycles** that make relative binding and solvation free energies computable. To compare how strongly two ligands L and L′ bind to a protein P, one could in principle simulate each binding event; instead one "mutates" L into L′ twice — once bound to the protein and once free in solution:
$$
\begin{array}{ccc}
\mathrm{P} + \mathrm{L} & \xrightarrow{\ \Delta G_\mathrm{bind}(\mathrm{L})\ } & \mathrm{PL} \\
\Big\downarrow\,\Delta G_\mathrm{solv} & & \Big\downarrow\,\Delta G_\mathrm{complex} \\
\mathrm{P} + \mathrm{L}' & \xrightarrow{\ \Delta G_\mathrm{bind}(\mathrm{L}')\ } & \mathrm{PL}'
\end{array}
$$
Around the closed cycle the free-energy changes sum to zero, so
$$
\Delta\Delta G_\mathrm{bind} = \Delta G_\mathrm{bind}(\mathrm{L}') - \Delta G_\mathrm{bind}(\mathrm{L}) = \Delta G_\mathrm{complex} - \Delta G_\mathrm{solv} .
$$ {#eq-cycle}
Both vertical legs are alchemical FEP or TI calculations, which converge well when L and L′ differ by a few atoms. Errors in the force field and incomplete sampling of protein rearrangements partly cancel between the legs. Well-run relative binding calculations reach root-mean-square errors of about $4\ \mathrm{kJ\,mol^{-1}}$ against experiment and are now used routinely in drug discovery to prioritise compounds for synthesis.

::: example A relative binding free energy {#ex-rbfe}
Mutating a ligand from L (with a hydrogen) to L′ (with a chlorine) costs $\Delta G_\mathrm{complex} = +5.2\ \mathrm{kJ\,mol^{-1}}$ in the binding site and $\Delta G_\mathrm{solv} = +8.0\ \mathrm{kJ\,mol^{-1}}$ in water, at $298\ \mathrm{K}$. Which ligand binds more strongly, and by what factor in the dissociation constant?
::: solution
By [[#eq-cycle]], $\Delta\Delta G_\mathrm{bind} = 5.2 - 8.0 = -2.8\ \mathrm{kJ\,mol^{-1}}$: the chlorinated ligand binds more strongly. Since $\Delta G_\mathrm{bind} = RT\ln K_\mathrm{d}$ (with $K_\mathrm{d}$ relative to the standard concentration), $K_\mathrm{d}(\mathrm{L})/K_\mathrm{d}(\mathrm{L}') = e^{2.8/2.479} = 3.1$. A typical statistical uncertainty of $\pm 1\ \mathrm{kJ\,mol^{-1}}$ on each leg makes this factor uncertain between about $1.7$ and $5.5$: free-energy calculations rank compounds usefully but do not give precise affinities.
:::
:::

**Absolute** binding free energies (ligand decoupled entirely from protein and from water) and **solvation** free energies (solute decoupled from solvent and from vacuum) use the same machinery with larger perturbations, and need restraints and standard-state corrections. Hydration free energies of small molecules are a standard benchmark of force fields ([[computational-chemistry/molecular-mechanics]]); good fixed-charge force fields achieve errors of about $4$–$6\ \mathrm{kJ\,mol^{-1}}$.

## Potentials of mean force and enhanced sampling

Often we want the free energy not of a state but *along a coordinate* $\xi$ — a distance between two ions, a torsion, the position of a ligand along an unbinding path, a reaction coordinate.

::: definition Potential of mean force {#def-pmf}
The **potential of mean force** (PMF), or free-energy profile, along a collective variable $\xi(\mathbf{r}^{N})$ is
$$
W(\xi) = -k_\mathrm{B}T\ln P(\xi) + \text{constant},
$$
where $P(\xi)$ is the equilibrium probability density of $\xi$. Its negative gradient is the force along $\xi$ averaged over all other degrees of freedom. For the distance $r$ between two particles in a liquid, $W(r) = -k_\mathrm{B}T\ln g(r)$, where $g(r)$ is the radial distribution function.
:::

::: example A potential of mean force from $g(r)$ {#ex-pmf}
The oxygen–oxygen radial distribution function of water at $298\ \mathrm{K}$ has its first maximum $g = 3.0$ near $0.28\ \mathrm{nm}$ and its first minimum $g = 0.8$ near $0.33\ \mathrm{nm}$. Compute the PMF at these points relative to large separation, and the free-energy barrier for leaving the first shell.
::: solution
$W = -RT\ln g$ with $RT = 2.479\ \mathrm{kJ\,mol^{-1}}$: at the maximum $W = -2.479\ln 3.0 = -2.72\ \mathrm{kJ\,mol^{-1}}$; at the minimum $W = -2.479\ln 0.8 = +0.55\ \mathrm{kJ\,mol^{-1}}$. The barrier from the first-shell minimum of $W$ to the dividing surface is $0.55 + 2.72 = 3.3\ \mathrm{kJ\,mol^{-1}}$, little more than $RT$: neighbours exchange on a picosecond time scale. The PMF is much shallower than the hydrogen-bond energy ($\approx 20\ \mathrm{kJ\,mol^{-1}}$), because breaking one hydrogen bond allows others to form and because entropy is included.
:::
:::

For high barriers, unbiased simulation rarely visits the top, and $P(\xi)$ cannot be estimated there. **Enhanced-sampling** methods add a bias to push the system over:

- **Umbrella sampling** (Torrie and Valleau, 1977) runs a series of simulations, each with a harmonic restraint $w_i(\xi) = \tfrac{1}{2}k(\xi - \xi_i)^{2}$ centred at successive points along $\xi$. Each window samples a narrow region well; the biased histograms are unbiased and joined by the **weighted histogram analysis method** (WHAM) or MBAR. The windows must overlap.
- **Metadynamics** (Laio and Parrinello, 2002) deposits small repulsive Gaussians along the trajectory in $\xi$-space, gradually filling the free-energy wells until the system diffuses freely; the accumulated bias approximates $-W(\xi)$. Well-tempered metadynamics shrinks the Gaussians over time for convergence.
- **Replica exchange** (parallel tempering) runs copies at a ladder of temperatures and periodically swaps configurations between neighbours with a Metropolis criterion, so that configurations heated over barriers return to the target temperature. It needs no choice of collective variable.
- **Non-equilibrium work**: Jarzynski's equality (1997), $e^{-\beta\Delta A} = \langle e^{-\beta W}\rangle$, relates the work $W$ done in repeated fast, irreversible pulls from state 0 to state 1 to the equilibrium free-energy difference. The average is again exponential and dominated by rare low-work trajectories.

::: warning The collective variable must capture the slow motion {#warn-cv}
Umbrella sampling and metadynamics accelerate motion only along the chosen collective variable. If another slow degree of freedom — a side-chain rotation, a water molecule entering a pocket, a ring pucker — is coupled to the process but not included, the simulation can cross the biased coordinate without equilibrating the hidden one, producing a smooth but wrong PMF with hysteresis between forward and backward runs. Check convergence by running in both directions, by extending simulations until the profile stops changing, and by watching the orthogonal degrees of freedom. A free-energy profile with a small error bar from block averaging can still be wrong if sampling is incomplete; the statistical error measures precision, not accuracy.
:::

::: quiz
Thermodynamic integration and free-energy perturbation compute a free-energy *difference* by averaging. Why can't a single long simulation give an *absolute* free energy $A = -k_\mathrm{B}T\ln Q$ as a simple average?
- [ ] Because $Q$ depends on the masses of the particles.
- [x] Because $Q$ is the integral of $e^{-\beta U}$ over all of configuration space, and Boltzmann sampling only visits regions where this is large; one would need $\langle e^{+\beta U}\rangle$, which is dominated by high-energy configurations that are never sampled.
- [ ] Because Monte Carlo does not sample the canonical ensemble.
- [ ] Because absolute free energies are not defined in classical mechanics.
::: solution
Formally $1/Q \propto \langle e^{+\beta U}\rangle$, an average dominated by configurations of very high energy — the opposite of what Boltzmann sampling visits — so it never converges. Differences between similar states avoid this, because the integrand of the ratio is dominated by configurations both states share.
:::
:::

## Where this leads

The sampling methods of this lesson turn the force fields of [[computational-chemistry/molecular-mechanics]] and the trajectories of [[computational-chemistry/molecular-dynamics]] into measurable thermodynamics: solvation free energies, partition coefficients, $\mathrm{p}K_\mathrm{a}$ shifts and binding affinities. Continuum solvation models ([[computational-chemistry/solvation-qmmm]]) are a cheap approximation to the solvation free energies computed here explicitly, and QM/MM free-energy simulations combine the alchemical and umbrella methods with quantum-mechanical energies to compute reaction barriers in enzymes. Binding free energies connect directly to [[medicinal-chemistry/drug-binding]].

::: history
Nicholas Metropolis, Arianna and Marshall Rosenbluth, and Augusta and Edward Teller published the Metropolis algorithm in 1953, in a study of hard disks run on the MANIAC computer at Los Alamos. John Kirkwood formulated thermodynamic integration in 1935, and Robert Zwanzig the perturbation formula in 1954. Charles Bennett's acceptance-ratio method appeared in 1976, and Glenn Torrie and John Valleau introduced umbrella sampling in 1977. Free-energy perturbation calculations on solvation and binding were pioneered in the 1980s by William Jorgensen and by Peter Kollman and Andrew McCammon. Shankar Kumar and co-workers formulated WHAM for free-energy profiles in 1992, Christopher Jarzynski proved his non-equilibrium equality in 1997, Yuji Sugita and Yuko Okamoto introduced replica-exchange molecular dynamics in 1999, and Alessandro Laio and Michele Parrinello metadynamics in 2002. Michael Shirts and John Chodera's MBAR (2008) is now the standard estimator.
:::

::: summary
- Configurational integrals in $3N$ dimensions require Monte Carlo; uniform sampling fails, so importance sampling generates Boltzmann-distributed configurations.
- The Metropolis rule $P_\mathrm{acc} = \min(1, e^{-\beta\Delta U})$ satisfies detailed balance without knowing $Q$; rejected moves recount the old state, and step sizes are tuned for efficiency, not maximal acceptance.
- Free-energy perturbation: $\Delta A = -k_\mathrm{B}T\ln\langle e^{-\beta\Delta U}\rangle_0$; for Gaussian $\Delta U$, $\Delta A = \langle\Delta U\rangle - \beta\sigma^{2}/2$; large perturbations need windows with good overlap, analysed with BAR/MBAR.
- Thermodynamic integration: $\Delta A = \int_0^{1}\langle\partial U/\partial\lambda\rangle_\lambda\,\mathrm{d}\lambda$, with soft-core potentials for appearing atoms.
- Thermodynamic cycles give relative binding free energies as $\Delta G_\mathrm{complex} - \Delta G_\mathrm{solv}$, typically to about $4\ \mathrm{kJ\,mol^{-1}}$.
- The PMF $W(\xi) = -k_\mathrm{B}T\ln P(\xi)$; umbrella sampling, metadynamics, replica exchange and non-equilibrium work methods overcome barriers, but only along the slow coordinates they address.
:::

## Exercises

::: exercise An acceptance probability {level=1 check="0.449"}
At $300\ \mathrm{K}$ a trial move raises the energy by $2.0\ \mathrm{kJ\,mol^{-1}}$. What is the Metropolis acceptance probability? (Enter it to three significant figures.)
::: solution
$e^{-2.0/2.494} = e^{-0.802} = 0.449$ ([[#ex-metropolis-acc]]).
:::
:::

::: exercise Monte Carlo error {level=1 check="40000"}
A Monte Carlo estimate from $10\,000$ independent samples has a standard error of $0.020$. How many samples are needed to reduce the error to $0.010$? (Enter the number.)
::: solution
The error scales as $n^{-1/2}$, so halving it needs four times as many samples: $40\,000$. For correlated samples (from a Markov chain) the effective number of independent samples is smaller by the statistical inefficiency, and more steps are needed.
:::
:::

::: exercise From $\Delta\Delta G$ to selectivity {level=1 check="3.09"}
A relative binding calculation gives $\Delta\Delta G_\mathrm{bind} = -2.8\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$. By what factor is the dissociation constant smaller for the second ligand? (Enter the factor to three significant figures.)
::: solution
$e^{2.8/(8.31446\times10^{-3} \times 298.15)} = e^{1.1295} = 3.09$.
:::
:::

::: exercise The cumulant estimate {level=2 check="8.20"}
In state 0 at $300\ \mathrm{K}$, $\Delta U$ is Gaussian with mean $10.0\ \mathrm{kJ\,mol^{-1}}$ and standard deviation $3.0\ \mathrm{kJ\,mol^{-1}}$. Compute $\Delta A$ from [[#eq-cumulant]]. (Enter it in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\Delta A = 10.0 - 9.0/(2 \times 2.4943) = 10.0 - 1.804 = 8.20\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Thermodynamic integration {level=2 check="13.7"}
Using the five-window data of [[#ex-ti]], $\langle\partial U/\partial\lambda\rangle = 40.0, 22.5, 10.1, 2.8, -1.5\ \mathrm{kJ\,mol^{-1}}$ at $\lambda = 0, 0.25, 0.5, 0.75, 1$ — compute $\Delta A$ by the trapezium rule. (Enter it in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$0.25[20.0 + 22.5 + 10.1 + 2.8 - 0.75] = 0.25 \times 54.65 = 13.7\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise A potential of mean force {level=2 check="-2.72"}
The first peak of a radial distribution function at $298.15\ \mathrm{K}$ has height $g = 3.0$. What is the potential of mean force there, relative to large separation? (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$W = -RT\ln g = -2.479 \times \ln 3.0 = -2.479 \times 1.0986 = -2.72\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Derive the cumulant formula {level=3 check="-1.80"}
Show that if $\Delta U$ is Gaussian with mean $\mu$ and variance $\sigma^{2}$ in state 0, then $\langle e^{-\beta\Delta U}\rangle_0 = e^{-\beta\mu + \beta^{2}\sigma^{2}/2}$, and hence derive [[#eq-cumulant]]. For $\mu = 10.0$ and $\sigma = 3.0\ \mathrm{kJ\,mol^{-1}}$ at $300\ \mathrm{K}$, what is $\Delta A - \langle\Delta U\rangle_0$? (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\langle e^{-\beta x}\rangle = (2\pi\sigma^{2})^{-1/2}\int e^{-\beta x - (x - \mu)^{2}/2\sigma^{2}}\,\mathrm{d}x$. Completing the square, $-\beta x - (x - \mu)^{2}/2\sigma^{2} = -(x - \mu + \beta\sigma^{2})^{2}/2\sigma^{2} - \beta\mu + \beta^{2}\sigma^{2}/2$, and the Gaussian integral gives $e^{-\beta\mu + \beta^{2}\sigma^{2}/2}$. Then $\Delta A = -\beta^{-1}(-\beta\mu + \beta^{2}\sigma^{2}/2) = \mu - \beta\sigma^{2}/2$. The completed square also shows that the integrand peaks at $x = \mu - \beta\sigma^{2}$ — the overlap problem. Numerically $\Delta A - \mu = -\beta\sigma^{2}/2 = -9.0/(2 \times 2.494) = -1.80\ \mathrm{kJ\,mol^{-1}}$. By Jensen's inequality $\langle e^{-\beta\Delta U}\rangle \geq e^{-\beta\langle\Delta U\rangle}$, so $\Delta A \leq \langle\Delta U\rangle_0$ for any distribution, not only Gaussians.
:::
:::

::: exercise Jarzynski from five pulls {level=3 check="11.0"}
Five non-equilibrium pulling simulations at $298.15\ \mathrm{K}$ require works of $12.0$, $9.5$, $11.0$, $15.0$ and $10.5\ \mathrm{kJ\,mol^{-1}}$. Estimate $\Delta A$ from Jarzynski's equality and compare with the mean work. Why is the estimate biased for small samples? (Enter $\Delta A$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
With $RT = 2.4790\ \mathrm{kJ\,mol^{-1}}$, $e^{-W/RT} = 0.00790, 0.02166, 0.01183, 0.00236, 0.01447$; the mean is $0.01164$, and $\Delta A = -2.479\ln 0.01165 = 11.0\ \mathrm{kJ\,mol^{-1}}$, below the mean work of $11.6\ \mathrm{kJ\,mol^{-1}}$ (the second law requires $\langle W\rangle \geq \Delta A$; the difference is dissipated work). The exponential average is dominated by the lowest works, and with few samples the rare, very low-work trajectories that would pull the average further down are usually missing, so finite-sample Jarzynski estimates are biased *upwards*. The bias shrinks only slowly with the number of pulls unless the dissipation is small compared with $k_\mathrm{B}T$.
:::
:::
