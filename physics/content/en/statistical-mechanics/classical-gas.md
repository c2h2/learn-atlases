The ideal gas is where thermodynamics started, and it is where statistical mechanics has to prove itself. Kinetic theory, in [[thermodynamics/kinetic-theory]], explained the pressure of a dilute gas as a flux of momentum and read off $\tfrac12m\langle v^2\rangle = \tfrac32k_BT$ by comparing with the empirical law $PV = Nk_BT$. Here nothing is taken from experiment. We evaluate the canonical partition function of [[statistical-mechanics/canonical]] for atoms in a box and *derive* the equation of state, the energy, the distribution of speeds and, most strikingly, the absolute entropy, a number thermodynamics can only measure by integrating heat capacities from near absolute zero.

That entropy, the **Sackur–Tetrode equation**, contains Planck's constant. A purely classical calculation cannot produce it: classical phase space has no natural unit of volume, so classical entropy is defined only up to an additive constant. It also contains a factor $1/N!$ that classical mechanics does not supply, and whose absence leads to the **Gibbs paradox**, an entropy that increases when a partition between two identical gases is removed. Both ingredients come from quantum mechanics, in a limit where the gas otherwise behaves classically. This chapter is therefore a bridge: it uses quantum states to justify classical statistics, and it ends with the criterion that tells us when the bridge gives way and [[statistical-mechanics/quantum-statistics]] is needed.

## From quantum states to phase space {#phase-space}

Put one atom of mass $m$ in a cubical box of side $L$ and volume $V = L^3$, with no internal structure and no forces except the walls. The stationary states of [[quantum-1/piecewise-potentials]], generalised to three dimensions, are labelled by three positive integers, with energies

$$
\varepsilon_{n_x n_y n_z} = \frac{h^2}{8mL^2}\left(n_x^2 + n_y^2 + n_z^2\right), \qquad n_x, n_y, n_z = 1, 2, 3, \dots
$$ {#eq-box}

The single-particle partition function factorises over the three directions, because the energy is a sum:

$$
Z_1 = \sum_{n_x, n_y, n_z}e^{-\beta\varepsilon} = \left(\sum_{n=1}^\infty e^{-a n^2}\right)^3, \qquad a = \frac{\beta h^2}{8mL^2}.
$$

For any macroscopic box, $a$ is absurdly small. For a helium atom at $300\,\mathrm{K}$ in a box of side $1\,\mathrm{cm}$ it is about $2\times10^{-17}$. Consecutive terms of the sum then differ by almost nothing, and the sum is an integral to excellent accuracy.

::: definition Thermal de Broglie wavelength {#def-lambda}
The **thermal wavelength** of a particle of mass $m$ at temperature $T$ is

$$
\lambda = \frac{h}{\sqrt{2\pi mk_BT}}.
$$ {#eq-lambda}
:::

Up to a factor of order one, $\lambda$ is the de Broglie wavelength $h/p$ of a particle with the typical thermal momentum $p \sim \sqrt{mk_BT}$. It is a quantum length; it sets the scale on which a gas particle "knows" it is a wave.

::: theorem Translational partition function {#thm-z1}
For a structureless particle in a box of volume $V$, in the limit where $\lambda$ is much smaller than the box,

$$
Z_1 = \frac{V}{\lambda^3}.
$$ {#eq-z1}
:::

::: proof
For small $a$, replace the sum by the integral and extend the lower limit to $0$:

$$
\sum_{n=1}^\infty e^{-an^2} \approx \int_0^\infty e^{-an^2}\,\dd n = \frac12\sqrt{\frac{\pi}{a}}.
$$

The error is close to $\tfrac12$ in absolute terms (the missing half of the $n = 0$ term), negligible against $\tfrac12\sqrt{\pi/a}$ when $a \ll 1$. Substituting $a = \beta h^2/(8mL^2)$,

$$
\frac12\sqrt{\frac{\pi\cdot8mL^2}{\beta h^2}} = L\,\frac{\sqrt{2\pi mk_BT}}{h} = \frac{L}{\lambda}.
$$

Cubing, $Z_1 = L^3/\lambda^3 = V/\lambda^3$. The result does not depend on the box being cubical; any shape gives the volume, up to surface corrections of relative order $\lambda/L$.
:::

::: example How good is the integral? {#ex-sum-integral}
Compare $\sum_{n\ge1}e^{-an^2}$ with $\tfrac12\sqrt{\pi/a}$ for $a = 0.1$ and $a = 0.01$, and find the thermal wavelength of helium at $300\,\mathrm{K}$.
::: solution
Summing numerically, $\sum_{n\ge1}e^{-0.1n^2} = 2.3025$, while $\tfrac12\sqrt{\pi/0.1} = 2.8025$. For $a = 0.01$, the sum is $8.3623$ and the integral $8.8623$. In both cases the difference is $0.5000$ to four decimal places: the sum is $\tfrac12\sqrt{\pi/a} - \tfrac12$ with an error that is exponentially small in $1/a$. The relative error is $\tfrac12\big/\tfrac12\sqrt{\pi/a} = \sqrt{a/\pi}$, which for a real box, $a \sim 10^{-17}$, is $\sim10^{-9}$.

For helium, $m = 4.002602\,\mathrm{u} = 6.6465\times10^{-27}\,\mathrm{kg}$, and

$$
\lambda = \frac{6.62607015\times10^{-34}}{\sqrt{2\pi\times6.6465\times10^{-27}\times1.380649\times10^{-23}\times300}}\,\mathrm{m} = 5.04\times10^{-11}\,\mathrm{m},
$$

about $50\,\mathrm{pm}$, smaller than the atom itself. For argon at room temperature, ten times heavier, $\lambda = 16\,\mathrm{pm}$. Then $Z_1 = V/\lambda^3$ for $V = 1\,\mathrm{cm^3}$ is of order $10^{25}$: that many single-particle states are thermally accessible.
:::
:::

The same result has a classical reading. The classical single-particle partition function is an integral over position and momentum,

$$
Z_1 = \frac{1}{h^3}\int e^{-\beta H(\mathbf r, \mathbf p)}\,\dd^3r\,\dd^3p,
$$ {#eq-phase-space}

with $H = p^2/2m$. The position integral gives $V$, and each momentum component gives $\sqrt{2\pi mk_BT}$, so the right side is $V(2\pi mk_BT)^{3/2}/h^3 = V/\lambda^3$, exactly [[#eq-z1]]. Comparing the two calculations fixes the rule: **one quantum state occupies a volume $h^3$ of phase space** (in general $h^f$ for $f$ degrees of freedom). Classical statistical mechanics has the integral but not the $h^3$, and is therefore blind to the additive constant in the entropy. The quantum count supplies it. The same rule, with any Hamiltonian, is what justifies the use of $e^{-\beta H}$ as a phase-space density in the equipartition theorem of [[statistical-mechanics/canonical]].

::: example The phase-space rule for an oscillator {#ex-osc-phase-space}
Evaluate [[#eq-phase-space]], in its one-dimensional form $Z_1 = h^{-1}\int e^{-\beta H}\,\dd x\,\dd p$, for a harmonic oscillator $H = p^2/2m + \tfrac12m\omega^2x^2$, and compare with the quantum partition function $1/[2\sinh(\beta\hbar\omega/2)]$ of [[statistical-mechanics/canonical]].
::: solution
The integral is a product of two Gaussians:

$$
Z_1^{\mathrm{cl}} = \frac1h\int_{-\infty}^\infty e^{-\beta p^2/2m}\,\dd p\int_{-\infty}^\infty e^{-\beta m\omega^2x^2/2}\,\dd x = \frac1h\sqrt{\frac{2\pi m}{\beta}}\sqrt{\frac{2\pi}{\beta m\omega^2}} = \frac{2\pi}{h\beta\omega} = \frac{k_BT}{\hbar\omega}.
$$

The quantum result, for $\beta\hbar\omega \ll 1$, is $1/[2\sinh(\beta\hbar\omega/2)] \approx 1/(\beta\hbar\omega) = k_BT/\hbar\omega$, the same. At $k_BT = 10\,\hbar\omega$ the two are $10.000$ and $9.996$. So the rule "one state per area $h$ of phase space" is not special to free particles: it reproduces the high-temperature limit of the quantum sum for a bound system too. That is the semiclassical statement that each quantum state occupies an area $h$ of the $(x, p)$ plane, which the Bohr–Sommerfeld condition $\oint p\,\dd x = nh$ already expressed in 1916. At low temperature the classical integral keeps counting states that the quantum oscillator does not have, and the agreement fails, as it did for the Sackur–Tetrode entropy.
:::
:::

## Many particles: the factor $1/N!$ {#identical}

Now put $N$ identical atoms in the box, still non-interacting. If the atoms were distinguishable, [[statistical-mechanics/canonical#prop-factor]] would give $Z = Z_1^N$. They are not. The term in $Z_1^N$ in which atom $1$ is in state $a$ and atom $2$ in state $b$ is a separate term from the one with atom $1$ in $b$ and atom $2$ in $a$, but quantum mechanically these are the same state: one atom in $a$, one in $b$. Each $N$-particle state in which all $N$ atoms occupy *different* single-particle states appears $N!$ times in $Z_1^N$, once for each permutation.

::: proposition The classical ideal gas {#prop-z-gas}
If the number of thermally accessible single-particle states is much larger than $N$, so that the probability of two atoms occupying the same state is negligible, then

$$
Z_N = \frac{Z_1^N}{N!} = \frac{1}{N!}\left(\frac{V}{\lambda^3}\right)^N.
$$ {#eq-zn}

The condition is

$$
n\lambda^3 \ll 1, \qquad n = \frac{N}{V}.
$$ {#eq-classical-condition}
:::

::: proof
Expand $Z_1^N = \sum_{s_1, \dots, s_N}e^{-\beta(\varepsilon_{s_1} + \dots + \varepsilon_{s_N})}$. The terms in which the $s_i$ are all distinct represent each physical state exactly $N!$ times, so dividing by $N!$ counts them correctly. Terms with two or more equal $s_i$ are miscounted by the division. To estimate their weight, assign states to the $N$ particles at random among the roughly $Z_1 = V/\lambda^3$ accessible ones. The expected number of coincident pairs is about $N^2/(2Z_1) = \tfrac12N\,n\lambda^3$, so the fraction of particles involved in a coincidence is of order $n\lambda^3$. The miscounting therefore changes $\ln Z$, a quantity of order $N$, by an amount of order $N\,n\lambda^3$: a relative error of order $n\lambda^3$, negligible when [[#eq-classical-condition]] holds. This is a sketch; the exact treatment in [[statistical-mechanics/quantum-statistics]] confirms that the leading corrections to $\ln Z$ are of relative order $n\lambda^3$, with opposite signs for bosons and fermions.
:::

The quantity $n\lambda^3$ is the number of particles in a cube of side $\lambda$. When it is small, the particles' wave packets rarely overlap and the gas is **non-degenerate**, or classical. When it approaches $1$, the gas is **degenerate**, and whether the particles are bosons or fermions changes everything.

::: example When is a gas classical? {#ex-degeneracy}
Evaluate $n\lambda^3$ for (a) nitrogen at $300\,\mathrm{K}$ and $1\,\mathrm{atm}$; (b) liquid helium-4 at its boiling point, $4.2\,\mathrm{K}$, with mass density $0.125\,\mathrm{g/cm^3}$; (c) the conduction electrons in copper at $300\,\mathrm{K}$, $n = 8.47\times10^{28}\,\mathrm{m^{-3}}$.
::: solution
(a) The number density is $n = P/k_BT = 101325/(1.380649\times10^{-23}\times300) = 2.45\times10^{25}\,\mathrm{m^{-3}}$. With $m = 28.0134\,\mathrm{u}$, [[#eq-lambda]] gives $\lambda = 1.90\times10^{-11}\,\mathrm{m}$, and $n\lambda^3 = 1.7\times10^{-7}$. Air is classical by seven orders of magnitude.

(b) Here $n = 125\,\mathrm{kg/m^3}/(4.0026\,\mathrm{u}) = 1.88\times10^{28}\,\mathrm{m^{-3}}$ and $\lambda = 4.25\times10^{-10}\,\mathrm{m}$ at $4.2\,\mathrm{K}$, so $n\lambda^3 = 1.45$. The ideal-gas formulae are not even approximately valid. Liquid helium becomes superfluid at $2.17\,\mathrm{K}$, a phenomenon connected with Bose–Einstein condensation.

(c) For electrons, $m = 9.109\times10^{-31}\,\mathrm{kg}$, a mass $7000$ times smaller than helium's, gives $\lambda = 4.3\times10^{-9}\,\mathrm{m}$ at $300\,\mathrm{K}$, and $n\lambda^3 = 6.8\times10^{3}$. The electron gas in a metal is extremely degenerate at room temperature. Treating it classically was the error that prevented Drude's model of 1900 from getting the electronic heat capacity right; the Fermi–Dirac treatment is in [[statistical-mechanics/bose-fermi]].
:::
:::

## Thermodynamics of the ideal gas {#thermo}

With [[#eq-zn]] and Stirling's approximation $\ln N! \approx N\ln N - N$, the free energy is

$$
F = -k_BT\ln Z_N = -Nk_BT\left[\ln\frac{V}{N\lambda^3} + 1\right].
$$ {#eq-f-gas}

The volume enters only through $V/N$, the volume per particle, and that is why $F$ is extensive. The $\ln N!$ produced the $N$ in the denominator.

::: theorem The ideal gas from its partition function {#thm-ideal-gas}
A classical ideal gas of $N$ structureless particles satisfies

$$
PV = Nk_BT, \qquad U = \tfrac32Nk_BT, \qquad \mu = k_BT\ln(n\lambda^3).
$$ {#eq-ideal}
:::

::: proof
By [[statistical-mechanics/canonical#thm-free-energy]], $P = -\partial F/\partial V$ at fixed $T$ and $N$. In [[#eq-f-gas]] only $\ln V$ depends on $V$, so $P = Nk_BT/V$.

For the energy, $\ln Z_N = N\ln V - 3N\ln\lambda - \ln N!$, and $\lambda \propto \beta^{1/2}$, so $\ln Z_N = \tfrac32N\ln(1/\beta) + (\text{terms independent of }\beta)$. Then $U = -\partial\ln Z_N/\partial\beta = \tfrac32N/\beta = \tfrac32Nk_BT$.

The chemical potential is $\mu = (\partial F/\partial N)_{T,V}$. Differentiating [[#eq-f-gas]],

$$
\mu = -k_BT\left[\ln\frac{V}{N\lambda^3} + 1\right] - Nk_BT\left(-\frac1N\right) = -k_BT\ln\frac{V}{N\lambda^3} = k_BT\ln(n\lambda^3).
$$
:::

The ideal-gas law, which [[thermodynamics/temperature]] took as the operational definition of the absolute temperature, is now a theorem in which $T$ is the statistical temperature $1/T = \partial S/\partial U$. The two temperatures agree. The energy is the equipartition value for three quadratic terms. The chemical potential is new: in the classical regime $n\lambda^3 \ll 1$ it is large and negative, many $k_BT$ below zero. As the gas is compressed or cooled towards degeneracy, $\mu$ rises towards zero, and that is the regime where the quantum distributions part company.

::: theorem Sackur–Tetrode equation {#thm-sackur-tetrode}
The entropy of a classical monatomic ideal gas is

$$
S = Nk_B\left[\ln\left(\frac{V}{N\lambda^3}\right) + \frac52\right] = Nk_B\left[\ln\left(\frac{V}{N}\left(\frac{4\pi mU}{3Nh^2}\right)^{3/2}\right) + \frac52\right].
$$ {#eq-sackur-tetrode}
:::

::: proof
From [[statistical-mechanics/canonical#thm-free-energy]], $S = (U - F)/T$. With $U = \tfrac32Nk_BT$ and [[#eq-f-gas]],

$$
S = \frac{1}{T}\left(\tfrac32Nk_BT + Nk_BT\left[\ln\frac{V}{N\lambda^3} + 1\right]\right) = Nk_B\left[\ln\frac{V}{N\lambda^3} + \frac52\right].
$$

For the second form, $k_BT = 2U/(3N)$, so $2\pi mk_BT = 4\pi mU/(3N)$ and $\lambda^{-3} = (4\pi mU/3Nh^2)^{3/2}$.
:::

The second form is the microcanonical entropy $S(U, V, N)$, from which $1/T = \partial S/\partial U = \tfrac32Nk_B/U$ and $P/T = \partial S/\partial V = Nk_B/V$, consistent with [[statistical-mechanics/microcanonical]]. Its dependence on $V$ and $T$, $Nk_B[\ln V + \tfrac32\ln T] + \text{const}$, is the entropy change formula of [[thermodynamics/entropy]], now with the constant determined.

::: example The absolute entropy of argon {#ex-argon}
Compute the molar entropy of argon gas at $298.15\,\mathrm{K}$ and $1\,\mathrm{bar}$ from [[#eq-sackur-tetrode]], and compare with the calorimetric value $154.8\,\mathrm{J/(mol\cdot K)}$.
::: solution
The volume per atom is $V/N = k_BT/P = 1.380649\times10^{-23}\times298.15/10^5 = 4.1164\times10^{-26}\,\mathrm{m^3}$. With $m = 39.948\,\mathrm{u} = 6.6335\times10^{-26}\,\mathrm{kg}$,

$$
\lambda = \frac{h}{\sqrt{2\pi mk_BT}} = 1.5997\times10^{-11}\,\mathrm{m}, \qquad \lambda^3 = 4.0936\times10^{-33}\,\mathrm{m^3}.
$$

So $V/(N\lambda^3) = 1.0056\times10^7$, whose logarithm is $16.124$. Per mole,

$$
S_m = R\,(16.124 + 2.5) = 8.314462618\times18.624\,\mathrm{J/(mol\cdot K)} = 154.8\,\mathrm{J/(mol\cdot K)}.
$$

The agreement with the calorimetric entropy, obtained by integrating $C_P/T$ from a few kelvin through the melting and boiling of argon and adding the latent-heat terms, is to four significant figures. The same calculation for the other noble gases at $298.15\,\mathrm{K}$ and $1\,\mathrm{bar}$ gives

| gas | He | Ne | Ar | Kr | Xe |
|---|---|---|---|---|---|
| $S_m$ from [[#eq-sackur-tetrode]] (J/(mol·K)) | $126.15$ | $146.33$ | $154.85$ | $164.09$ | $169.69$ |

which matches the tabulated standard entropies to the precision given. Two independent routes to an absolute entropy, one through heat measurements on a solid and liquid, one through counting quantum states of a gas, agree. This was one of the early confirmations that $h$ belongs in the description of gases, and that the third law is correct.
:::
:::

The chemical potential in [[#eq-ideal]] can be evaluated with the same numbers. For argon at $298.15\,\mathrm{K}$ and $1\,\mathrm{bar}$, $n\lambda^3 = 1/(1.0056\times10^7) = 9.94\times10^{-8}$, so $\mu = k_BT\ln(9.94\times10^{-8}) = -16.12\,k_BT = -0.414\,\mathrm{eV}$. It is the free energy cost of adding one atom, and it is negative because adding an atom to a dilute gas opens up far more microstates than it uses energy. Chemists write the same quantity as $\mu = \mu^\circ + k_BT\ln(P/P^\circ)$ and put the $\lambda$ into $\mu^\circ$.

::: widget plot
f: 18.624 + 2.5*ln(x/298.15); 0
x: 0.05, 300
y: -5, 25
labels: Sackur–Tetrode S/R for argon at 1 bar; zero
caption: The Sackur–Tetrode molar entropy of argon at $1\,\mathrm{bar}$, in units of $R$, against temperature in kelvin. At $298\,\mathrm{K}$ it is $18.6$, that is $154.8\,\mathrm{J/(mol\cdot K)}$. Move towards the left edge: the curve falls like $\tfrac52\ln T$ and crosses zero near $0.17\,\mathrm{K}$, an impossible result for a count. The formula has already left its domain at about $0.47\,\mathrm{K}$, where $n\lambda^3$ reaches $1$, and real argon has long since condensed, at $87\,\mathrm{K}$.
:::

::: warning The classical entropy fails at low temperature
As $T \to 0$ at fixed density, $\lambda \to \infty$, $V/(N\lambda^3) \to 0$, and [[#eq-sackur-tetrode]] goes to $-\infty$. A negative entropy is impossible for a count: $\Omega \ge 1$. The formula is not wrong in its own regime; it is being used outside it. Long before $S$ turns negative, $n\lambda^3$ has reached $1$, and [[#prop-z-gas]] no longer applies. Every ideal-gas result in this chapter carries the hypothesis $n\lambda^3 \ll 1$.
:::

::: quiz
At fixed temperature, the volume of a classical ideal gas is doubled with $N$ fixed. By how much does the entropy change, according to [[#eq-sackur-tetrode]]?
- [ ] By $Nk_B\ln2 + \tfrac52Nk_B$.
- [x] By $Nk_B\ln2$.
- [ ] By $\tfrac32Nk_B\ln2$.
- [ ] Not at all, since $T$ is fixed.
::: solution
Only $\ln(V/N\lambda^3)$ changes, and $\lambda$ depends only on $T$. So $\Delta S = Nk_B\ln(2V/V) = Nk_B\ln2$, the same as for the free expansion and the reversible isotherm of [[thermodynamics/entropy]]. The $\tfrac52$ is a constant and cancels in any difference; $\tfrac32Nk_B\ln2$ would be the change on doubling $T$ at fixed $V$.
:::
:::

## The Gibbs paradox {#gibbs}

Take a box divided by a partition into two halves, each of volume $V$, each holding $N$ atoms at the same temperature and pressure. Remove the partition. If the two halves hold *different* gases, say helium and argon, each gas expands irreversibly into twice its volume and the entropy rises. If they hold the *same* gas, nothing observable happens: reinserting the partition restores the initial state, so the process is reversible and $\Delta S$ must be zero.

::: proposition Entropy of mixing {#prop-mixing}
When the partition between $N$ atoms of gas A in volume $V$ and $N$ atoms of gas B in volume $V$, at the same temperature, is removed,

$$
\Delta S = 2Nk_B\ln2 \quad\text{if A and B are different gases}, \qquad \Delta S = 0 \quad\text{if they are the same gas}.
$$ {#eq-mixing}
:::

::: proof
Different gases: the gases are ideal and do not interact, so after mixing the partition function is a product of the partition function of $N$ atoms of A in volume $2V$ and that of $N$ atoms of B in volume $2V$, and the entropy is the sum of their Sackur–Tetrode entropies. For each gas the only change in [[#eq-sackur-tetrode]] is $V \to 2V$ at fixed $N$ and $T$, an increase of $Nk_B\ln2$. Together, $2Nk_B\ln2$.

Same gas: before, the entropy is $2S(N, V)$; after, it is $S(2N, 2V)$, the entropy of $2N$ identical atoms in volume $2V$. Equation [[#eq-sackur-tetrode]] depends on $V$ and $N$ only through $V/N$, which is unchanged, and has the prefactor $N$, which doubles. So $S(2N, 2V) = 2S(N, V)$ and $\Delta S = 0$.
:::

Now suppose we had forgotten the $1/N!$ and used $Z = Z_1^N$. Then $F$ would contain $\ln V$ rather than $\ln(V/N)$, the entropy would be $S' = Nk_B[\ln(V/\lambda^3) + \tfrac32]$, and removing a partition between identical gases would give

$$
S'(2N, 2V) - 2S'(N, V) = 2Nk_B\ln(2V) - 2Nk_B\ln V = 2Nk_B\ln2 > 0.
$$

That is the **Gibbs paradox**: a counting that treats identical atoms as distinguishable predicts an entropy of mixing for a gas mixed with itself, and an entropy that is not extensive. Gibbs saw in the 1870s that the cure was to count states that differ only by a permutation of identical particles as one, which is the $1/N!$. Classical mechanics gives no reason for this: classical particles follow trajectories and can, in principle, be labelled. Quantum mechanics does: identical particles have no labels at all, and a state is specified by how many particles occupy each single-particle state, not by which.

::: remark Is the paradox about knowledge?
The mixing entropy jumps from $2Nk_B\ln2$ to $0$ as two gases become identical; it does not shrink continuously as the gases become more alike. That discontinuity worried many authors. The resolution is that entropy depends on which macrostates we can distinguish. If no experiment could separate gas A from gas B, they are, for thermodynamics, the same gas, and no work could be extracted from their "mixing". If an experiment can tell them apart, even by a tiny difference in mass, a semipermeable membrane can in principle separate them reversibly and extract $T\Delta S = 2Nk_BT\ln2$ of work. Jaynes's 1992 essay *The Gibbs paradox* is a clear modern discussion.
:::

::: example Separating air {#ex-air}
Model air as $1.00\,\mathrm{mol}$ of oxygen and $4.00\,\mathrm{mol}$ of nitrogen, both ideal, at $298\,\mathrm{K}$ and $1\,\mathrm{atm}$. Find the entropy of mixing, and the minimum work needed to separate the mixture back into pure gases at the same temperature and pressure.
::: solution
Before mixing, each gas sits at the common pressure in its own volume, proportional to its amount: $V_{\mathrm{O_2}} = \tfrac15V$ and $V_{\mathrm{N_2}} = \tfrac45V$. After mixing, each occupies $V$. As in the proof of [[#prop-mixing]], each gas behaves as if alone and gains $n_iR\ln(V/V_i) = -n_iR\ln x_i$, with mole fractions $x_{\mathrm{O_2}} = 0.2$ and $x_{\mathrm{N_2}} = 0.8$. So

$$
\Delta S = -R\bigl[1.00\ln0.2 + 4.00\ln0.8\bigr] = 8.314462618\times(1.6094 + 0.8926) = 20.80\,\mathrm{J/K}.
$$

The general formula is $\Delta S = -R\sum_in_i\ln x_i$, which for two equal amounts gives back $2R\ln2$ per mole of each.

Separation is the reverse process. At constant temperature, with the surroundings as a reservoir at $T$, the minimum work is the increase of the gas's Helmholtz free energy. The energy of an ideal gas does not change at fixed temperature, so separation raises $F = U - TS$ by $T\Delta S_{\mathrm{mix}}$, and $W_{\min} = 298\times20.80 = 6.20\times10^3\,\mathrm{J}$, about $6\,\mathrm{kJ}$ for five moles of air. Real air-separation plants use several times this. For identical gases the minimum work is zero, as it must be: there is nothing to separate.
:::
:::

## The Maxwell–Boltzmann distribution {#maxwell}

The distribution of molecular velocities follows from the Boltzmann factor applied to one molecule, treated with the phase-space measure of [[#eq-phase-space]]. The probability that a molecule has position in $\dd^3r$ and momentum in $\dd^3p$ is proportional to $e^{-\beta p^2/2m}\,\dd^3r\,\dd^3p$. Integrating over position and changing variables to velocity, $\mathbf p = m\mathbf v$:

::: theorem Maxwell–Boltzmann distribution {#thm-maxwell}
In a classical ideal gas at temperature $T$, the velocity of a molecule has probability density

$$
f(\mathbf v) = \left(\frac{m}{2\pi k_BT}\right)^{3/2}\exp\left(-\frac{mv^2}{2k_BT}\right),
$$ {#eq-mb-velocity}

and its speed $v = \lvert\mathbf v\rvert$ has probability density

$$
F(v) = 4\pi\left(\frac{m}{2\pi k_BT}\right)^{3/2}v^2\exp\left(-\frac{mv^2}{2k_BT}\right).
$$ {#eq-mb-speed}
:::

::: proof
The density in velocity is proportional to $e^{-\beta mv^2/2} = \prod_{i=x,y,z}e^{-\beta mv_i^2/2}$. Each factor integrates to $\sqrt{2\pi k_BT/m}$, so the normalising constant is $(m/2\pi k_BT)^{3/2}$, which is [[#eq-mb-velocity]]. The density depends only on $v$, so the probability that the speed lies in $[v, v + \dd v]$ is $f$ times the volume of the spherical shell, $4\pi v^2\,\dd v$, which gives [[#eq-mb-speed]].
:::

The derivation makes clear what Maxwell's 1860 argument assumed and Boltzmann's later work justified: the three velocity components are independent because the energy is a sum of three terms, and each is Gaussian because each term is quadratic. Interactions between molecules do not change the result, as long as the potential energy depends on positions only: the factor $e^{-\beta H}$ then splits into a momentum part and a position part, and the momentum part is the same Gaussian. The Maxwell distribution holds in liquids and in dense gases, not only in ideal ones.

The three characteristic speeds, derived in [[thermodynamics/kinetic-theory]], are

$$
v_p = \sqrt{\frac{2k_BT}{m}}, \qquad \langle v\rangle = \sqrt{\frac{8k_BT}{\pi m}}, \qquad v_{\mathrm{rms}} = \sqrt{\frac{3k_BT}{m}},
$$

in the ratio $1 : 1.128 : 1.225$. What [[#eq-mb-speed]] adds is the tail: the fraction of molecules faster than a given speed. With $x = v/v_p$, integration by parts of [[#eq-mb-speed]] gives

$$
\Prob(\text{speed} > v) = 1 - \erf(x) + \frac{2x}{\sqrt\pi}e^{-x^2}.
$$ {#eq-tail}

::: widget plot
f: 4*pi*(M/(2000*pi*8.314462618*T))^1.5*x^2*exp(-M*x^2/(2000*8.314462618*T))
x: 0, 3000
y: 0, 0.004
sliders: T=300:20:2000:10; M=28:2:132:1
caption: The Maxwell–Boltzmann speed distribution $F(v)$, in $(\mathrm{m/s})^{-1}$, against speed in $\mathrm{m/s}$, for molar mass $M$ in $\mathrm{g/mol}$. It opens on nitrogen at $300\,\mathrm{K}$, peaked at $422\,\mathrm{m/s}$. Raise $T$ and watch the peak move right and drop, keeping unit area. Set $M = 4$ for helium: at $300\,\mathrm{K}$ the curve spreads past $3000\,\mathrm{m/s}$. Set $M = 132$ for xenon: it squeezes below $500\,\mathrm{m/s}$. Only the ratio $T/M$ matters.
:::

::: example The fast tail of nitrogen {#ex-tail}
Find the most probable, mean and rms speeds of nitrogen molecules at $300\,\mathrm{K}$, and the fraction of molecules with speeds above $1000\,\mathrm{m/s}$.
::: solution
With $m = 28.0134\,\mathrm{u} = 4.6517\times10^{-26}\,\mathrm{kg}$ and $k_BT = 4.1419\times10^{-21}\,\mathrm{J}$,

$$
v_p = \sqrt{\frac{2\times4.1419\times10^{-21}}{4.6517\times10^{-26}}} = 422\,\mathrm{m/s},\qquad \langle v\rangle = 476\,\mathrm{m/s},\qquad v_{\mathrm{rms}} = 517\,\mathrm{m/s}.
$$

For the tail, $x = 1000/422.0 = 2.370$. Then $\erf(2.370) = 0.99920$, and $2x e^{-x^2}/\sqrt\pi = 2.674\times e^{-5.615} = 2.674\times0.003641 = 0.009737$, so [[#eq-tail]] gives

$$
\Prob(v > 1000\,\mathrm{m/s}) = 1 - 0.99920 + 0.00974 = 0.0105.
$$

About one molecule in a hundred moves faster than $1\,\mathrm{km/s}$. At $2.37$ times the most probable speed, the Gaussian factor is $e^{-5.6}$; at five times, it would be $e^{-25}$. Rates of processes that need a fast molecule, such as chemical reactions with an activation energy, are controlled by this tail, which is why they depend so steeply on temperature.
:::
:::

::: application Why the Earth has lost its hydrogen
At the top of the atmosphere, the exosphere, temperatures are around $1000\,\mathrm{K}$ and collisions are rare, so a molecule moving upward faster than the escape speed $11.2\,\mathrm{km/s}$ leaves. From [[#eq-tail]], the fraction of hydrogen atoms above escape speed at $1000\,\mathrm{K}$ is $1.6\times10^{-3}$; for helium it is $5\times10^{-13}$; for oxygen molecules about $10^{-104}$. Replenished continually by the Maxwell distribution, a fraction of $10^{-3}$ empties a planet's hydrogen in a geologically short time, while oxygen is held for ever. This thermal escape is called **Jeans escape**, after James Jeans, who analysed it in 1916.
:::

## Molecules with internal structure {#internal}

A molecule has rotational, vibrational and electronic states as well as translational ones. If the internal energy is independent of the centre-of-mass motion, which is an excellent approximation for a dilute gas, the single-molecule partition function factorises:

$$
Z_1 = \frac{V}{\lambda^3}\,z_{\mathrm{int}}(T), \qquad Z_N = \frac{1}{N!}\left(\frac{V}{\lambda^3}\right)^N z_{\mathrm{int}}^N,
$$

with $\lambda$ built from the total mass. Since $z_{\mathrm{int}}$ does not depend on $V$, the pressure is still $Nk_BT/V$: the ideal-gas law does not care about internal structure. The internal partition function adds $-Nk_BT\ln z_{\mathrm{int}}$ to $F$ and contributes to $U$, $S$ and $C_V$. Rotations at room temperature give $z_{\mathrm{rot}} \approx k_BT/(\sigma hcB)$ for a linear molecule with rotational constant $B$ and symmetry number $\sigma$, and one $k_BT$ to the energy; vibrations, as computed in [[statistical-mechanics/canonical]], are mostly frozen. The Chemistry Atlas works through these factors and the resulting heat capacities and entropies in [The molecular partition function](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=partition-function), and uses them to compute equilibrium constants in [Equilibrium constants from molecular data](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=equilibrium-from-molecules).

::: quiz
An ideal gas of diatomic molecules and an ideal gas of atoms are at the same $T$, $V$ and $N$. Which quantities are necessarily the same for the two gases?
- [x] The pressure.
- [ ] The internal energy.
- [x] The Maxwell distribution of speeds, if the molecular and atomic masses are equal.
- [ ] The entropy.
::: solution
The pressure is $-\partial F/\partial V$, and the internal partition function does not depend on $V$, so both gases have $P = Nk_BT/V$. The speed distribution depends only on $m$ and $T$, because the centre-of-mass motion factorises from the internal motion. The energy and entropy have extra internal contributions for the molecules: $U$ gains at least $Nk_BT$ from rotation, and $S$ gains $Nk_B(\ln z_{\mathrm{rot}} + 1)$.
:::
:::

::: history Maxwell, Gibbs, Sackur and Tetrode
James Clerk Maxwell derived the velocity distribution in 1860 from the assumption that the three velocity components are statistically independent and that the distribution depends only on speed; Boltzmann, from 1868, derived it from the dynamics of collisions and generalised it to molecules in external fields. Gibbs discussed the entropy of mixing in *On the Equilibrium of Heterogeneous Substances* (1875–1878), and in his 1902 book he distinguished "generic" phases, in which permuting identical particles gives the same state, from "specific" ones; counting generic phases is the factor $1/N!$. Otto Sackur in 1911 and Hugo Tetrode in 1912, independently, computed the absolute entropy of a monatomic gas by dividing phase space into cells of volume $h^3$, and showed that the result agreed with the vapour-pressure data for mercury. It was a remarkable use of Planck's constant in a problem with no radiation in it, more than a decade before quantum mechanics explained why a cell has that size.
:::

## Where this leads {#leads}

The classical gas is the limit $n\lambda^3 \ll 1$ of something larger. [[statistical-mechanics/quantum-statistics]] drops the assumption that no two particles share a state and counts occupation numbers directly, using the grand canonical ensemble; the Maxwell–Boltzmann distribution reappears as the common limit of the Bose–Einstein and Fermi–Dirac distributions, and the chemical potential $\mu = k_BT\ln(n\lambda^3)$ of this chapter is the bridge. [[statistical-mechanics/bose-fermi]] then studies what happens when $n\lambda^3$ is of order one or larger: electrons in metals and white dwarfs, and the Bose–Einstein condensate. Interactions between gas molecules, which turn a gas into a liquid, are the starting point of [[statistical-mechanics/phase-transitions]] and, for chemists, of [Interacting molecules: real gases and liquids](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=real-gases-liquids).

::: summary
- A free particle in a box of volume $V$ has $Z_1 = V/\lambda^3$, with thermal wavelength $\lambda = h/\sqrt{2\pi mk_BT}$; equivalently, one quantum state per phase-space volume $h^3$.
- For $N$ identical particles with $n\lambda^3 \ll 1$, $Z_N = Z_1^N/N!$. The $1/N!$ removes permutations of identical particles; without it the entropy is not extensive (the Gibbs paradox).
- From $F = -Nk_BT[\ln(V/N\lambda^3) + 1]$ follow $PV = Nk_BT$, $U = \tfrac32Nk_BT$ and $\mu = k_BT\ln(n\lambda^3)$, large and negative in the classical regime.
- The Sackur–Tetrode entropy $S = Nk_B[\ln(V/N\lambda^3) + \tfrac52]$ gives the absolute entropy of monatomic gases in agreement with calorimetry, e.g. $154.8\,\mathrm{J/(mol\cdot K)}$ for argon at $298.15\,\mathrm{K}$ and $1\,\mathrm{bar}$.
- Removing a partition between $N$ atoms each of two different ideal gases, at equal $T$ and $P$, gives $\Delta S = 2Nk_B\ln2$; for the same gas on both sides it gives zero.
- The Maxwell–Boltzmann distributions follow from the Boltzmann factor; the tail fraction above a speed $v$ is $1 - \erf(x) + 2xe^{-x^2}/\sqrt\pi$ with $x = v/v_p$.
- The classical formulae fail when $n\lambda^3$ approaches $1$: liquid helium, electrons in metals, cold atomic gases.
:::

## Exercises {#exercises}

::: exercise Thermal wavelength of helium {level=1 check="50.4"}
Find the thermal wavelength of a helium-4 atom, mass $4.002602\,\mathrm{u}$, at $300\,\mathrm{K}$, in picometres to three significant figures. Use $1\,\mathrm{u} = 1.66053906660\times10^{-27}\,\mathrm{kg}$.
::: solution
The mass is $m = 4.002602\times1.66053906660\times10^{-27} = 6.6465\times10^{-27}\,\mathrm{kg}$, and

$$
2\pi mk_BT = 2\pi\times6.6465\times10^{-27}\times1.380649\times10^{-23}\times300 = 1.7297\times10^{-46}\,\mathrm{kg^2\,m^2/s^2}.
$$

Its square root is $1.3152\times10^{-23}\,\mathrm{kg\,m/s}$, so $\lambda = 6.62607015\times10^{-34}/1.3152\times10^{-23} = 5.04\times10^{-11}\,\mathrm{m} = 50.4\,\mathrm{pm}$.
:::
:::

::: exercise Is air classical? {level=1 check="1.69e-7"}
Find $n\lambda^3$ for nitrogen, $m = 28.0134\,\mathrm{u}$, at $300\,\mathrm{K}$ and $101325\,\mathrm{Pa}$, to three significant figures.
::: solution
The number density is $n = P/k_BT = 101325/(4.1419\times10^{-21}) = 2.446\times10^{25}\,\mathrm{m^{-3}}$. With $m = 4.6517\times10^{-26}\,\mathrm{kg}$,

$$
\lambda = \frac{6.62607015\times10^{-34}}{\sqrt{2\pi\times4.6517\times10^{-26}\times4.1419\times10^{-21}}} = 1.904\times10^{-11}\,\mathrm{m},
$$

so $\lambda^3 = 6.906\times10^{-33}\,\mathrm{m^3}$ and $n\lambda^3 = 1.69\times10^{-7}$. The condition [[#eq-classical-condition]] holds with a wide margin.
:::
:::

::: exercise Mixing helium and argon {level=1 check="11.53"}
One mole of helium and one mole of argon, at the same temperature and pressure, are separated by a partition. The partition is removed. Find the entropy change in $\mathrm{J/K}$, to four significant figures.
::: solution
This is [[#prop-mixing]] with $N = N_A$ for each gas. Each gas doubles its volume at fixed temperature, gaining $R\ln2$:

$$
\Delta S = 2R\ln2 = 2\times8.314462618\times0.693147 = 11.53\,\mathrm{J/K}.
$$

The masses of the atoms do not enter; only the fact that they are different gases does.
:::
:::

::: exercise Absolute entropy of neon {level=2 check="146.3"}
Use the Sackur–Tetrode equation to compute the molar entropy of neon, $m = 20.1797\,\mathrm{u}$, at $298.15\,\mathrm{K}$ and $1.00\times10^5\,\mathrm{Pa}$, in $\mathrm{J/(mol\cdot K)}$ to four significant figures.
::: solution
The volume per atom is $k_BT/P = 4.1164\times10^{-26}\,\mathrm{m^3}$, as for argon. The mass is $m = 3.3510\times10^{-26}\,\mathrm{kg}$, so

$$
\lambda = \frac{h}{\sqrt{2\pi mk_BT}} = 2.2507\times10^{-11}\,\mathrm{m}, \qquad \lambda^3 = 1.1401\times10^{-32}\,\mathrm{m^3}.
$$

Then $V/(N\lambda^3) = 3.610\times10^6$, with logarithm $15.099$, and

$$
S_m = R(15.099 + 2.5) = 8.314462618\times17.599 = 146.3\,\mathrm{J/(mol\cdot K)}.
$$

The tabulated value is $146.33\,\mathrm{J/(mol\cdot K)}$. Neon has a lower entropy than argon at the same $T$ and $P$ because it is lighter: its $\lambda$ is larger, so fewer momentum states are accessible. The difference is $\tfrac32R\ln(m_{\mathrm{Ar}}/m_{\mathrm{Ne}}) = 8.52\,\mathrm{J/(mol\cdot K)}$.
:::
:::

::: exercise Heating at constant volume {level=2 check="8.645"}
One mole of a monatomic ideal gas is heated at constant volume from $300\,\mathrm{K}$ to $600\,\mathrm{K}$. Use [[#eq-sackur-tetrode]] to find $\Delta S$ in $\mathrm{J/K}$, to four significant figures, and check the answer against $\int C_V\,\dd T/T$.
::: solution
In [[#eq-sackur-tetrode]] only $\lambda$ depends on $T$, with $\lambda^{-3} \propto T^{3/2}$. So

$$
\Delta S = Nk_B\ln\frac{\lambda(300)^3}{\lambda(600)^3} = R\ln\left(\frac{600}{300}\right)^{3/2} = \tfrac32R\ln2 = 8.645\,\mathrm{J/K}.
$$

Thermodynamically, $C_V = \tfrac32R$ and $\int_{300}^{600}C_V\,\dd T/T = \tfrac32R\ln2$, the same. The statistical formula and the Clausius definition agree on every difference; the statistical one also fixes the absolute value.
:::
:::

::: exercise Hydrogen above escape speed {level=2 check="1.65e-3"}
Using [[#eq-tail]], find the fraction of hydrogen atoms, $m = 1.00784\,\mathrm{u}$, faster than $11.2\,\mathrm{km/s}$ in a gas at $1000\,\mathrm{K}$, to three significant figures.
::: solution
The most probable speed is $v_p = \sqrt{2k_BT/m} = \sqrt{2\times1.380649\times10^{-20}/1.6736\times10^{-27}} = 4062\,\mathrm{m/s}$. Then $x = 11200/4062 = 2.757$ and $x^2 = 7.602$. The error function is $\erf(2.757) = 0.999904$, so $1 - \erf(x) = 9.6\times10^{-5}$, and

$$
\frac{2x}{\sqrt\pi}e^{-x^2} = 3.111\times4.99\times10^{-4} = 1.553\times10^{-3}.
$$

The fraction is $9.6\times10^{-5} + 1.553\times10^{-3} = 1.65\times10^{-3}$. The second term dominates: deep in the tail, $\Prob(v > v_0)$ behaves like $(2x/\sqrt\pi)e^{-x^2}$.
:::
:::

::: exercise The paradox made quantitative {level=3}
Suppose the $1/N!$ is omitted, so that $Z' = Z_1^N$ with $Z_1 = V/\lambda^3$. Find the resulting entropy $S'(T, V, N)$, show that $S'(T, 2V, 2N) \neq 2S'(T, V, N)$, and compute the difference. Then prove that the correct entropy [[#eq-sackur-tetrode]] satisfies $S(T, \alpha V, \alpha N) = \alpha S(T, V, N)$ for every $\alpha > 0$, and identify which step of the derivation is responsible.
::: hint
For $Z'$, $F' = -Nk_BT\ln(V/\lambda^3)$ and $U$ is unchanged. Compute $S' = (U - F')/T$.
:::
::: solution
Without $1/N!$, $\ln Z' = N\ln(V/\lambda^3)$. The energy depends only on the $\beta$-dependence, which is unchanged, so $U = \tfrac32Nk_BT$, and

$$
S' = \frac{U - F'}{T} = Nk_B\left[\ln\frac{V}{\lambda^3} + \frac32\right].
$$

Then

$$
S'(T, 2V, 2N) - 2S'(T, V, N) = 2Nk_B\left[\ln\frac{2V}{\lambda^3} + \frac32\right] - 2Nk_B\left[\ln\frac{V}{\lambda^3} + \frac32\right] = 2Nk_B\ln2 \neq 0.
$$

So $S'$ is not extensive, and it predicts the spurious mixing entropy $2Nk_B\ln2$ for identical gases.

For the correct entropy, $V/N$ is invariant under $V \to \alpha V$, $N \to \alpha N$, and $\lambda$ depends only on $T$:

$$
S(T, \alpha V, \alpha N) = \alpha Nk_B\left[\ln\frac{\alpha V}{\alpha N\lambda^3} + \frac52\right] = \alpha S(T, V, N).
$$

The responsible step is $\ln N! \approx N\ln N - N$ in [[#eq-f-gas]]: the term $-N\ln N$ converts $N\ln V$ into $N\ln(V/N)$, and the term $+N$ changes $\tfrac32$ into $\tfrac52$. Without the $1/N!$, the entropy would grow by $Nk_B\ln N$ more than it should, an amount that is not proportional to $N$.
:::
:::

::: exercise A two-dimensional gas {level=3}
Atoms adsorbed on a flat surface of area $A$ can move freely along it but not away from it, forming a two-dimensional ideal gas. Derive the partition function, the equation of state for the spreading pressure $\Pi = -(\partial F/\partial A)_{T,N}$, the energy, and the entropy, and state the condition for the result to be valid.
::: hint
Repeat [[#thm-z1]] with two directions instead of three. The phase-space rule now gives one state per $h^2$.
:::
::: solution
For motion in two dimensions the box sum has two factors, each $L/\lambda$, so $Z_1 = A/\lambda^2$ with the same $\lambda = h/\sqrt{2\pi mk_BT}$. For $N$ identical atoms with $N\lambda^2/A \ll 1$, $Z_N = (A/\lambda^2)^N/N!$ and

$$
F = -Nk_BT\left[\ln\frac{A}{N\lambda^2} + 1\right].
$$

The spreading pressure is $\Pi = -\partial F/\partial A = Nk_BT/A$, the two-dimensional ideal-gas law. Since $\lambda^{-2} \propto \beta^{-1}$, $\ln Z_N = N\ln(1/\beta) + \text{const}$ and $U = Nk_BT$: two quadratic terms per atom, as equipartition requires. The entropy is

$$
S = \frac{U - F}{T} = Nk_B\left[\ln\frac{A}{N\lambda^2} + 2\right],
$$

the two-dimensional Sackur–Tetrode equation. It is extensive in $(A, N)$ for the same reason as before. The condition for validity is $(N/A)\lambda^2 \ll 1$: few atoms per area $\lambda^2$. The model ignores the binding to the surface, which contributes a factor $e^{\beta\varepsilon_b}$ and a vibrational partition function per atom; those multiply $Z_1$ by quantities independent of $A$, so they change $U$, $S$ and $\mu$ but not $\Pi$.
:::
:::
