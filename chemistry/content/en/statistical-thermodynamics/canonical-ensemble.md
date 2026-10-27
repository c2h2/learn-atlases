The molecular partition function $q$ served us well so long as molecules were independent: each had its own energy levels, unaffected by the others, and the energy of the whole system was a sum of molecular energies. But molecules do interact. The energy of a liquid is not a sum of energies of separate molecules; even in a gas, the energy of an encounter belongs to two molecules at once. Statistical thermodynamics needs a formulation in which the *whole system* — $10^{23}$ interacting molecules in a flask — is the object whose energy levels we sum over. J. Willard Gibbs supplied it in 1902 with a deceptively simple idea: imagine not one flask but a vast collection of identical flasks, an **ensemble**, and apply Boltzmann's counting to the flasks instead of the molecules.

This lesson builds the canonical ensemble and its partition function $Q$, and derives from it every thermodynamic function — internal energy, entropy, Helmholtz and Gibbs energies, pressure — in a form valid for any system, interacting or not. It shows why the energy of a macroscopic system at fixed temperature does not fluctuate measurably, though that of a nanoparticle does. And it settles a question left open in [[statistical-thermodynamics/thermodynamic-functions]]: how the indistinguishability of molecules in a gas changes the counting, which leads to the Sackur–Tetrode equation for the absolute entropy of a monatomic gas, one of the most precisely confirmed predictions of the theory, and to the resolution of the Gibbs paradox of mixing.

## Ensembles

::: definition Ensembles {#def-ensemble}
An **ensemble** is a large, imaginary collection of $\tilde N$ replicas of a system, each with the same macroscopic constraints, but each free to be in any quantum state of the whole system compatible with them. The three common ensembles are:

- the **microcanonical** ensemble: every member has the same number of molecules $N$, volume $V$ and energy $E$ (an isolated system);
- the **canonical** ensemble: every member has the same $N$, $V$ and temperature $T$, maintained by thermal contact with all the other members, which act as a heat bath (a closed system at fixed temperature);
- the **grand canonical** ensemble: every member has the same $V$, $T$ and chemical potential $\mu$, and exchanges both energy and molecules with the rest (an open system).

The thermodynamic value of a property is its average over the members of the ensemble.
:::

The replacement of a time average (one system observed for a long time) by an ensemble average (many systems observed at one instant) is the **ergodic hypothesis**. Like the principle of equal a priori probabilities, it is a postulate, justified by its success. The canonical ensemble is the most useful in chemistry because laboratory systems are usually held at a fixed temperature rather than a fixed energy; the grand canonical ensemble is the natural setting for adsorption, for open systems and for quantum statistics ([[statistical-thermodynamics/quantum-statistics]]).

In a canonical ensemble, each member is a complete system of $N$ molecules — possibly interacting — with its own set of quantum states $i$ and total energies $E_i(N, V)$. The members exchange energy with one another, so the total energy $\tilde E$ of the ensemble is fixed, but the energy of any one member is not. The question is: in what fraction of the members is the system in state $i$?

## The canonical distribution

::: proposition The canonical distribution {#prop-canonical}
In a canonical ensemble at temperature $T$, the probability that a member is in the system state $i$ of energy $E_i$ is
$$
P_i = \frac{e^{-\beta E_i}}{Q}, \qquad Q = \sum_i e^{-\beta E_i}, \qquad \beta = \frac{1}{k_\mathrm{B}T},
$$ {#eq-canonical}
where the sum runs over all quantum states of the whole system of $N$ molecules in volume $V$. $Q(N, V, T)$ is the **canonical partition function**.
:::

::: proof
The argument is the one of [[statistical-thermodynamics/boltzmann-distribution#prop-boltzmann]], with members of the ensemble in place of molecules. Let $\tilde n_i$ members be in state $i$. The members are macroscopic objects that could, in principle, be labelled, so the number of ways of realising the configuration $\{\tilde n_i\}$ is $\tilde W = \tilde N!/\prod_i\tilde n_i!$. Because the whole ensemble is isolated, every assignment consistent with $\sum_i\tilde n_i = \tilde N$ and $\sum_i\tilde n_iE_i = \tilde E$ is equally probable. Maximising $\ln\tilde W$ subject to these constraints with Lagrange multipliers gives, exactly as before, $\tilde n_i/\tilde N = e^{-\beta E_i}/\sum_je^{-\beta E_j}$. Because $\tilde N$ can be made as large as we like, the most probable configuration of the ensemble is overwhelmingly dominant, and $\tilde n_i/\tilde N$ is the probability $P_i$. The multiplier $\beta$ is common to all members in thermal contact, and is identified as $1/k_\mathrm{B}T$ by the same argument as before (or by demanding agreement with the molecular result for a perfect gas).
:::

The distribution looks identical to the Boltzmann distribution, but it says something much stronger. $E_i$ is the energy of the *whole system*, including all intermolecular interactions; nothing has been assumed about the molecules being independent. Once $Q$ is known — and computing it for interacting molecules is the hard part, taken up in [[statistical-thermodynamics/real-gases-liquids]] — the thermodynamics follows.

## Thermodynamic functions from $Q$

::: proposition Thermodynamic functions in the canonical ensemble {#prop-thermo-q}
For a system with canonical partition function $Q(N, V, T)$,
$$
\begin{aligned}
U - U(0) &= -\left(\frac{\partial\ln Q}{\partial\beta}\right)_{V} , &
S &= \frac{U - U(0)}{T} + k_\mathrm{B}\ln Q , \\
A - A(0) &= -k_\mathrm{B}T\ln Q , &
p &= k_\mathrm{B}T\left(\frac{\partial\ln Q}{\partial V}\right)_{T} , \\
H - H(0) &= -\left(\frac{\partial\ln Q}{\partial\beta}\right)_{V} + k_\mathrm{B}TV\left(\frac{\partial\ln Q}{\partial V}\right)_{T} , &
G - G(0) &= -k_\mathrm{B}T\ln Q + k_\mathrm{B}TV\left(\frac{\partial\ln Q}{\partial V}\right)_{T} ,
\end{aligned}
$$ {#eq-thermo-q}
where the quantities at $T = 0$ refer to the system in its lowest state, from which all $E_i$ are measured.
:::

::: proof
*Energy.* The ensemble average is $U - U(0) = \sum_iP_iE_i = Q^{-1}\sum_iE_ie^{-\beta E_i} = -Q^{-1}(\partial Q/\partial\beta)_V$, as for the molecular case.

*Entropy.* The entropy of the whole ensemble is $k_\mathrm{B}\ln\tilde W$, and with Stirling's approximation $\ln\tilde W = -\tilde N\sum_iP_i\ln P_i$. The entropy of one member is therefore
$$
S = -k_\mathrm{B}\sum_iP_i\ln P_i ,
$$
the **Gibbs entropy**. Substituting $\ln P_i = -\beta E_i - \ln Q$ gives $S = k_\mathrm{B}\beta\sum_iP_iE_i + k_\mathrm{B}\ln Q = (U - U(0))/T + k_\mathrm{B}\ln Q$.

*Helmholtz energy.* $A = U - TS$, so $A - A(0) = U - U(0) - TS = -k_\mathrm{B}T\ln Q$ (at $T = 0$, $A(0) = U(0)$).

*Pressure.* From thermodynamics ([[thermodynamics/free-energy]]), $p = -(\partial A/\partial V)_T$, which gives $p = k_\mathrm{B}T(\partial\ln Q/\partial V)_T$. (A direct derivation: a member in state $i$ exerts pressure $-\partial E_i/\partial V$; averaging this over $P_i$ gives the same expression.)

*Enthalpy and Gibbs energy.* $H = U + pV$ and $G = A + pV$, with the expression for $p$ substituted.
:::

The Helmholtz energy is the natural function of the canonical ensemble: $A = -k_\mathrm{B}T\ln Q$ is as compact as a formula can be, and every other quantity is a derivative of it, just as in thermodynamics every property follows from $A(T, V, N)$ by differentiation. This is the bridge: statistical mechanics computes one function, $Q$; classical thermodynamics takes over from there.

::: warning Molecular versus canonical partition functions {#warn-q-Q}
$q$ and $Q$ are different objects. The molecular partition function $q$ is a sum over the states of *one molecule*; it is of order $10^{30}$ for a molecule in a mole-sized volume. The canonical partition function $Q$ is a sum over the states of the *whole system*; for $N$ independent molecules it is $q^{N}$ or $q^{N}/N!$, a number with some $10^{24}$ digits. Formulas such as $U - U(0) = -N\,\partial\ln q/\partial\beta$ are the special cases of $U - U(0) = -\partial\ln Q/\partial\beta$ for independent molecules — never mix the two in one expression, and never write $A = -k_\mathrm{B}T\ln q$ for a system of many molecules.
:::

## Fluctuations

In the canonical ensemble the energy of a member is not fixed; it fluctuates as energy flows to and from the bath. How large are the fluctuations?

::: proposition Energy fluctuations {#prop-fluct}
In the canonical ensemble the variance of the energy is
$$
\sigma_E^{2} = \langle E^{2}\rangle - \langle E\rangle^{2} = k_\mathrm{B}T^{2}C_V .
$$ {#eq-fluct}
Because $C_V$ and $\langle E\rangle$ are both proportional to $N$, the relative fluctuation $\sigma_E/\langle E\rangle$ is proportional to $N^{-1/2}$. For a monatomic perfect gas, $\sigma_E/\langle E\rangle = (2/3N)^{1/2}$.
:::

::: proof
Differentiate $\langle E\rangle = \sum_iE_ie^{-\beta E_i}/Q$ with respect to $\beta$:
$$
\frac{\partial\langle E\rangle}{\partial\beta} = -\frac{\sum_iE_i^{2}e^{-\beta E_i}}{Q} + \frac{\left(\sum_iE_ie^{-\beta E_i}\right)^{2}}{Q^{2}} = -\langle E^{2}\rangle + \langle E\rangle^{2} = -\sigma_E^{2} .
$$
Since $\partial/\partial\beta = -k_\mathrm{B}T^{2}\,\partial/\partial T$ and $\partial\langle E\rangle/\partial T = C_V$, $\sigma_E^{2} = k_\mathrm{B}T^{2}C_V$. For a monatomic gas, $\langle E\rangle = \tfrac{3}{2}Nk_\mathrm{B}T$ and $C_V = \tfrac{3}{2}Nk_\mathrm{B}$, so $\sigma_E/\langle E\rangle = (\tfrac{3}{2}Nk_\mathrm{B}^{2}T^{2})^{1/2}/\tfrac{3}{2}Nk_\mathrm{B}T = (2/3N)^{1/2}$.
:::

Equation [[#eq-fluct]] has two lessons. First, a heat capacity is a measure of fluctuations: a system that can absorb energy readily (large $C_V$) also has its energy wander widely. Near a phase transition, where $C_V$ grows very large, fluctuations become macroscopic — the physical origin of critical opalescence. Second, since $C_V \ge 0$ follows from $\sigma_E^{2} \ge 0$, the stability condition of thermodynamics is a consequence of statistics.

::: widget distribution
dist: gamma
params: alpha=1.5, beta=1
caption: The distribution of the total kinetic energy $E$ of $N$ atoms of a monatomic perfect gas in the canonical ensemble, in units of $k_\mathrm{B}T$. The density of states of $3N$ quadratic terms grows as $E^{3N/2 - 1}$ and the Boltzmann factor falls as $e^{-E/k_\mathrm{B}T}$, so $E/k_\mathrm{B}T$ follows a gamma distribution with shape $\alpha = 3N/2$ and rate 1. The start, $\alpha = 1.5$, is a single atom: a broad, skewed distribution with mean $1.5\,k_\mathrm{B}T$. Increase $\alpha$ to 15 ($N = 10$) and the distribution becomes a narrow, nearly normal peak; its mean grows as $\alpha$ but its width only as $\sqrt{\alpha}$, as [[#prop-fluct]] predicts.
:::

::: example How much does the energy of a mole of argon fluctuate? {#ex-fluct}
For one mole of argon at $298.15\ \mathrm{K}$ in a rigid, diathermic container in contact with a heat bath, calculate the root-mean-square fluctuation of the internal energy, absolutely and relative to $U - U(0)$. Repeat for a cluster of 100 argon atoms.
::: solution
With $C_V = \tfrac{3}{2}R = 12.47\ \mathrm{J\,K^{-1}}$ for one mole,
$$
\sigma_E = (k_\mathrm{B}T^{2}C_V)^{1/2} = (1.380\,65\times10^{-23}\times298.15^{2}\times12.47)^{1/2}\ \mathrm{J} = 3.9\times10^{-9}\ \mathrm{J}.
$$
The mean energy is $U - U(0) = \tfrac{3}{2}RT = 3718\ \mathrm{J}$, so $\sigma_E/U = 1.05\times10^{-12}$, in agreement with $(2/3N_\mathrm{A})^{1/2}$. No calorimeter will ever detect a fluctuation of one part in $10^{12}$: for macroscopic systems the canonical and microcanonical ensembles give identical thermodynamics.

For $N = 100$, $\sigma_E/U = (2/300)^{1/2} = 0.082$: the energy of a nanocluster in contact with a bath wanders by $8\,\%$. At this scale "the temperature of the cluster" and "the energy of the cluster" are no longer interchangeable descriptions, and the choice of ensemble matters — a point of real importance in the simulation of small systems ([[computational-chemistry/molecular-dynamics]]).
:::
:::

## Independent molecules: distinguishable and indistinguishable

If the molecules do not interact, the energy of a state of the system is a sum of molecular energies, $E = \varepsilon^{(1)}_{i_1} + \varepsilon^{(2)}_{i_2} + \cdots + \varepsilon^{(N)}_{i_N}$, where $i_k$ labels the state of molecule $k$. Whether $Q$ is a simple product of molecular partition functions depends on whether the molecules can be told apart.

::: proposition $Q$ for independent molecules {#prop-Q-indep}
For $N$ independent molecules with molecular partition function $q$:
$$
Q = q^{N}\quad\text{(distinguishable molecules)}, \qquad
Q = \frac{q^{N}}{N!}\quad\text{(indistinguishable molecules, } q \gg N\text{)} .
$$ {#eq-Q-indep}
Molecules are distinguishable when they occupy fixed, identifiable positions (atoms in a crystal lattice, adsorbed molecules on surface sites); identical molecules free to move through the same volume (a gas, a liquid) are indistinguishable. The second formula requires that the number of accessible molecular states greatly exceed the number of molecules.
:::

::: proof
*Distinguishable.* The states of the system are all combinations $(i_1, i_2, \ldots, i_N)$ in which each molecule independently takes any of its states, so
$$
Q = \sum_{i_1}\sum_{i_2}\cdots\sum_{i_N}e^{-\beta(\varepsilon_{i_1} + \varepsilon_{i_2} + \cdots + \varepsilon_{i_N})} = \left(\sum_{i_1}e^{-\beta\varepsilon_{i_1}}\right)\cdots\left(\sum_{i_N}e^{-\beta\varepsilon_{i_N}}\right) = q^{N},
$$
by the factorisation argument of [[statistical-thermodynamics/partition-function#prop-factor]].

*Indistinguishable.* If the molecules are identical and not localised, the combination "molecule 1 in state $a$, molecule 2 in state $b$" is the *same* quantum state of the system as "molecule 1 in state $b$, molecule 2 in state $a$": quantum mechanics describes it by one (symmetrised or antisymmetrised) wavefunction, specified only by the set of occupied molecular states. The product $q^{N}$ counts each such system state $N!$ times — once for each permutation of the molecules among the $N$ occupied states — *provided the $N$ occupied states are all different*. When $q \gg N$, the overwhelming majority of terms have every molecule in a different state (the chance that two of $N$ molecules choose the same one of $q$ states is of order $N^{2}/q$), and dividing by $N!$ corrects the overcounting. When the condition fails, terms with multiple occupancy matter and must be counted correctly — the subject of [[statistical-thermodynamics/quantum-statistics]].
:::

The condition $q \gg N$ is, for a gas, a condition on the translational partition function: $V/\Lambda^{3} \gg N$, or
$$
\frac{N\Lambda^{3}}{V} \ll 1 .
$$ {#eq-classical}
It says that the volume per molecule must be much larger than the cube of the thermal wavelength — that molecular wave packets must not overlap. For argon at room temperature and $1\ \mathrm{bar}$, $N\Lambda^{3}/V = 1\times10^{-7}$, and the condition is met by a huge margin. It fails for the electrons in a metal (light particles at high density, $N\Lambda^{3}/V \approx 2\times10^{3}$ for sodium at room temperature) and for liquid helium ($N\Lambda^{3}/V \approx 1.5$ at $4.2\ \mathrm{K}$), the two classic quantum fluids.

::: widget plot
f: (p*1e5/(1.380649e-23*x))*(6.62607015e-34/sqrt(2*pi*m*1.66053907e-27*1.380649e-23*x))^3; 0.01
x: 1, 40
y: 0, 0.5
sliders: m=4.0026:1:40:0.0001; p=1:0.1:10:0.1
labels: N\Lambda^{3}/V; 0.01
caption: The degeneracy parameter $N\Lambda^{3}/V$ of a perfect gas against temperature $T$ (in K) for molar mass `m` (in $\mathrm{g\,mol^{-1}}$) and pressure `p` (in bar). It falls as $T^{-5/2}$. For helium-4 at $1\ \mathrm{bar}$ (the starting values) it drops below $0.01$, where the $1/N!$ counting of [[#prop-Q-indep]] is accurate to about a per cent, only near $12\ \mathrm{K}$; for $\mathrm{H_2}$ ($m = 2.016$) the crossover is higher still, while for argon ($m = 39.95$) it lies below $3\ \mathrm{K}$, far below the boiling point. Raising the pressure raises the curve in proportion.
:::

::: example Is helium gas at its boiling point classical? {#ex-he}
Calculate $N\Lambda^{3}/V$ for helium-4 gas ($M = 4.0026\ \mathrm{g\,mol^{-1}}$) at its normal boiling point, $4.2\ \mathrm{K}$ and $101.325\ \mathrm{kPa}$, treating the vapour as a perfect gas.
::: solution
The number density is $N/V = p/k_\mathrm{B}T = 101\,325/(1.380\,65\times10^{-23}\times4.2) = 1.747\times10^{27}\ \mathrm{m^{-3}}$. The thermal wavelength is
$$
\Lambda = \frac{h}{(2\pi mk_\mathrm{B}T)^{1/2}} = \frac{6.626\times10^{-34}}{(2\pi\times6.6465\times10^{-27}\times1.380\,65\times10^{-23}\times4.2)^{1/2}} = 4.26\times10^{-10}\ \mathrm{m} ,
$$
so $N\Lambda^{3}/V = 1.747\times10^{27}\times(4.26\times10^{-10})^{3} = 0.13$. This is not $\ll 1$: even the saturated vapour of helium shows measurable quantum-statistical deviations from classical behaviour, and the liquid ($N\Lambda^{3}/V \approx 1.5$) is fully quantum — the precondition for the superfluidity of helium-4 below $2.17\ \mathrm{K}$. For every other gas at its boiling point the parameter is far smaller.
:::
:::

## The perfect gas from $Q$

For a perfect gas of $N$ indistinguishable molecules, $Q = q^{N}/N!$ with $q = (V/\Lambda^{3})q^\mathrm{int}$, where $q^\mathrm{int} = q^\mathrm{R}q^\mathrm{V}q^\mathrm{E}$ does not depend on $V$. Every property of the perfect gas now follows by differentiation.

**Equation of state.** $\ln Q = N\ln V + (\text{terms independent of } V)$, so by [[#eq-thermo-q]]
$$
p = k_\mathrm{B}T\left(\frac{\partial\ln Q}{\partial V}\right)_T = \frac{Nk_\mathrm{B}T}{V} = \frac{nRT}{V} .
$$
The perfect-gas law emerges from the volume dependence of the translational partition function alone; the internal structure of the molecules does not affect the pressure. (Historically the argument ran the other way: we used $pV = nRT$ to identify $\beta$. That the circle closes is a consistency check.)

**Entropy.** With Stirling's approximation, $\ln Q = N\ln q - \ln N! = N\ln q - N\ln N + N$, and [[#eq-thermo-q]] gives
$$
S = \frac{U - U(0)}{T} + Nk_\mathrm{B}\ln\frac{q}{N} + Nk_\mathrm{B} .
$$ {#eq-s-gas}
This is the corrected form promised in [[statistical-thermodynamics/thermodynamic-functions]]. For a monatomic gas it becomes one of the classic results of physical chemistry.

::: proposition The Sackur–Tetrode equation {#prop-sackur-tetrode}
The molar entropy of a monatomic perfect gas (with a non-degenerate electronic ground state) is
$$
S_\mathrm{m} = R\ln\!\left(\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}}\,e^{5/2}\right) = R\ln\!\left(\frac{k_\mathrm{B}T}{p\Lambda^{3}}\,e^{5/2}\right) ,
\qquad \Lambda = \frac{h}{(2\pi mk_\mathrm{B}T)^{1/2}} .
$$ {#eq-sackur-tetrode}
:::

::: proof
For a monatomic gas $q = V/\Lambda^{3}$ and $U - U(0) = \tfrac{3}{2}Nk_\mathrm{B}T$. Substituting in [[#eq-s-gas]] for one mole ($N = N_\mathrm{A}$, $Nk_\mathrm{B} = R$):
$$
S_\mathrm{m} = \tfrac{3}{2}R + R\ln\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}} + R = R\left[\ln\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}} + \frac{5}{2}\right] = R\ln\!\left(\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}}e^{5/2}\right).
$$
For a perfect gas $V_\mathrm{m}/N_\mathrm{A} = k_\mathrm{B}T/p$, giving the second form. A degenerate electronic ground level adds $R\ln g_0$.
:::

::: example The standard molar entropy of argon {#ex-sackur-tetrode}
Calculate $S^\circ_\mathrm{m}$ for argon at $298.15\ \mathrm{K}$ and $p^\circ = 1\ \mathrm{bar}$, and compare with the calorimetric value $154.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (CODATA key values for thermodynamics).
::: solution
From [[statistical-thermodynamics/partition-function]], $\Lambda = 1.600\times10^{-11}\ \mathrm{m}$ for Ar at $298.15\ \mathrm{K}$. Then
$$
\frac{k_\mathrm{B}T}{p^\circ\Lambda^{3}} = \frac{1.380\,65\times10^{-23}\times298.15}{10^{5}\times(1.600\times10^{-11})^{3}} = \frac{4.116\times10^{-26}}{4.094\times10^{-33}} = 1.006\times10^{7},
$$
and
$$
S^\circ_\mathrm{m} = 8.3145\times\left[\ln(1.006\times10^{7}) + 2.5\right] = 8.3145\times(16.124 + 2.500) = 154.8\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
The agreement with calorimetry — which integrates $C_p/T$ from a few kelvin through the solid, the melting at $83.8\ \mathrm{K}$ and the boiling at $87.3\ \mathrm{K}$ — is exact to the precision quoted. Two entirely different routes to the entropy, one through Planck's constant and the mass of an atom, the other through a calorimeter and a thermometer, give the same number. The term $\ln N!$ is essential: without it the calculated entropy would be larger by $R(\ln N_\mathrm{A} - 1) = 447\ \mathrm{J\,K^{-1}\,mol^{-1}}$, and not even extensive.
:::
:::

The Sackur–Tetrode equation contains the familiar thermodynamics. At constant temperature, $S_\mathrm{m}$ depends on volume as $R\ln V_\mathrm{m}$, so an isothermal expansion from $V_1$ to $V_2$ changes the entropy by $nR\ln(V_2/V_1)$. At constant pressure, $\Lambda^{-3} \propto T^{3/2}$ and $k_\mathrm{B}T/p \propto T$, so $S_\mathrm{m}$ grows as $\tfrac{5}{2}R\ln T$, consistent with $C_{p,\mathrm{m}} = \tfrac{5}{2}R$. And heavier atoms have more entropy, by $\tfrac{3}{2}R\ln M$: their thermal wavelength is shorter, so more translational states fit into the same volume — xenon ($169.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$) exceeds helium ($126.2$) by $\tfrac{3}{2}R\ln(131.29/4.0026) = 43.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$.

### The Gibbs paradox

::: example Mixing identical and different gases {#ex-gibbs-paradox}
A container is divided into two equal halves, each of volume $V$, holding $n$ moles of perfect gas at the same $T$ and $p$. The partition is removed. Use [[#eq-s-gas]] to find $\Delta S$ when (a) the two gases are different (He and Ar) and (b) they are the same (Ar and Ar).
::: solution
Write the translational part of the entropy of $N$ molecules of one kind in volume $V'$ as $S = Nk_\mathrm{B}[\ln(V'/N\Lambda^{3}) + \tfrac{5}{2}]$ plus internal terms that do not change on mixing.

(a) Different gases: after mixing, each gas of $N$ molecules occupies $2V$. Each entropy increases by $Nk_\mathrm{B}\ln[(2V/N)/(V/N)] = Nk_\mathrm{B}\ln 2$, so $\Delta S = 2nR\ln 2$, the entropy of mixing of [[thermodynamics/second-law]].

(b) Same gas: after mixing, $2N$ indistinguishable molecules occupy $2V$, so $S_\text{final} = 2Nk_\mathrm{B}[\ln(2V/2N\Lambda^{3}) + \tfrac{5}{2}]$, which equals $S_\text{initial} = 2\times Nk_\mathrm{B}[\ln(V/N\Lambda^{3}) + \tfrac{5}{2}]$ exactly: $\Delta S = 0$, as it must be, since removing a partition between identical gases changes nothing observable.

Without the $1/N!$ — that is, with $S = Nk_\mathrm{B}\ln q + \ldots$ — case (b) would also give $2nR\ln 2$: re-inserting and removing a partition would create entropy from nothing. This is the **Gibbs paradox**, and it is resolved precisely by the indistinguishability of identical molecules, which makes the volume per molecule $V/N$, not $V$, the argument of the logarithm and so renders the entropy extensive.
:::
:::

### The Gibbs energy of a perfect gas

For equilibrium constants we need $G$. For the perfect gas $pV = Nk_\mathrm{B}T$, so $G = A + pV = A + Nk_\mathrm{B}T$, and with $A - A(0) = -k_\mathrm{B}T\ln Q = -Nk_\mathrm{B}T\ln q + k_\mathrm{B}T\ln N!$,
$$
G - G(0) = -Nk_\mathrm{B}T\ln q + Nk_\mathrm{B}T\ln N - Nk_\mathrm{B}T + Nk_\mathrm{B}T = -nRT\ln\frac{q}{N} .
$$ {#eq-g-gas}
The Gibbs energy is fixed by the number of accessible states *per molecule*. Writing $q_\mathrm{m} = q/n$ for the molar partition function, $G_\mathrm{m} - G_\mathrm{m}(0) = -RT\ln(q_\mathrm{m}/N_\mathrm{A})$. The **standard molar partition function** $q^\circ_\mathrm{m}$ is $q_\mathrm{m}$ evaluated with the standard molar volume $V^\circ_\mathrm{m} = RT/p^\circ$; it gives the standard molar Gibbs energy
$$
G^\circ_\mathrm{m} - G^\circ_\mathrm{m}(0) = -RT\ln\frac{q^\circ_\mathrm{m}}{N_\mathrm{A}} .
$$ {#eq-g-standard}
For argon at $298.15\ \mathrm{K}$, $q^\circ_\mathrm{m}/N_\mathrm{A} = 1.006\times10^{7}$ (the same number as in [[#ex-sackur-tetrode]]) and $G^\circ_\mathrm{m} - G^\circ_\mathrm{m}(0) = -8.3145\times298.15\times\ln(1.006\times10^{7}) = -39.97\ \mathrm{kJ\,mol^{-1}}$. Equation [[#eq-g-standard]] is the starting point of [[statistical-thermodynamics/equilibrium-from-molecules]].

## Open systems: the grand canonical ensemble and adsorption

When a system can exchange molecules as well as energy with its surroundings — a surface in contact with a gas, a protein binding ligands from solution, a pore filling with vapour — the natural ensemble is the grand canonical one of [[#def-ensemble]]. Repeating the derivation of [[#prop-canonical]] with a second constraint, on the total number of molecules in the ensemble, introduces a second Lagrange multiplier, which turns out to be $-\beta\mu$: the probability of a state of the system with $N$ molecules and energy $E_{N,i}$ is
$$
P_{N,i} = \frac{e^{-\beta(E_{N,i} - \mu N)}}{\Xi}, \qquad \Xi = \sum_{N}\sum_ie^{-\beta(E_{N,i} - \mu N)} = \sum_Ne^{\beta\mu N}Q(N, V, T),
$$
where $\Xi$ is the **grand partition function** and $\mu$ the chemical potential of the reservoir. Its logarithm is again a thermodynamic potential, $pV = k_\mathrm{B}T\ln\Xi$, and the mean number of molecules is $\langle N\rangle = k_\mathrm{B}T(\partial\ln\Xi/\partial\mu)_{T,V}$. The grand ensemble is the starting point of quantum statistics ([[statistical-thermodynamics/quantum-statistics]]); its simplest chemical application is the adsorption isotherm.

::: proposition The Langmuir isotherm from statistical mechanics {#prop-langmuir}
Let a surface have $M$ independent, equivalent sites, each either empty or holding one molecule, and let an adsorbed molecule have partition function $q_\mathrm{s}$ (energies measured from the gas-phase molecule at rest, so that $q_\mathrm{s}$ includes the factor $e^{\varepsilon_\mathrm{ads}/k_\mathrm{B}T}$ for a binding energy $\varepsilon_\mathrm{ads}$). In equilibrium with a perfect gas at pressure $p$, the fractional coverage is
$$
\theta = \frac{Kp}{1 + Kp}, \qquad K = \frac{q_\mathrm{s}\Lambda^{3}}{k_\mathrm{B}T\,q^\mathrm{int}} ,
$$ {#eq-langmuir}
where $\Lambda$ and $q^\mathrm{int}$ are the thermal wavelength and internal partition function of the gas molecule.
:::

::: proof
The sites are independent, so $\Xi$ is a product of $M$ identical single-site factors, $\xi = 1 + q_\mathrm{s}e^{\beta\mu}$ (empty, or occupied with weight $q_\mathrm{s}e^{\beta\mu}$). The mean occupancy of a site is $\theta = q_\mathrm{s}e^{\beta\mu}/(1 + q_\mathrm{s}e^{\beta\mu})$. Equilibrium requires the chemical potential of the adsorbed molecules to equal that of the gas, which from [[#eq-g-gas]] is $\mu = -k_\mathrm{B}T\ln(q/N)$ with $q/N = q^\mathrm{int}V/(N\Lambda^{3}) = q^\mathrm{int}k_\mathrm{B}T/(p\Lambda^{3})$. Hence $e^{\beta\mu} = p\Lambda^{3}/(k_\mathrm{B}Tq^\mathrm{int})$, and substituting gives [[#eq-langmuir]].
:::

The derivation turns Langmuir's 1918 kinetic argument ([[kinetics/surface-kinetics]]) into a statement about partition functions, and gives the constant $K$ a molecular meaning: the ratio of the states available to a molecule on a site to those available to it in the gas, per unit pressure.

::: example Physisorption of argon {#ex-langmuir}
Argon physisorbs on a surface at $90\ \mathrm{K}$ with binding energy $\varepsilon_\mathrm{ads} = 8.0\ \mathrm{kJ\,mol^{-1}}$; on a site, its three translational motions become vibrations of about $50\ \mathrm{cm^{-1}}$. Estimate $K$, the pressure for half coverage, and $\theta$ at $1.0\ \mathrm{bar}$.
::: solution
The site vibrations have $c_2\tilde\nu/T = 1.438\,78\times50/90 = 0.799$, so each contributes $1/(1 - e^{-0.799}) = 1.817$, and together $1.817^{3} = 6.00$. The binding factor is $e^{8000/(8.3145\times90)} = e^{10.69} = 4.40\times10^{4}$, so $q_\mathrm{s} = 2.64\times10^{5}$. For gaseous argon at $90\ \mathrm{K}$, $\Lambda = 29.1\ \mathrm{pm}$ and $\Lambda^{3}/k_\mathrm{B}T = (2.912\times10^{-11})^{3}/(1.243\times10^{-21})\ \mathrm{Pa^{-1}} = 1.99\times10^{-11}\ \mathrm{Pa^{-1}}$; $q^\mathrm{int} = 1$. Thus
$$
K = 2.64\times10^{5}\times1.99\times10^{-11}\ \mathrm{Pa^{-1}} = 5.2\times10^{-6}\ \mathrm{Pa^{-1}}, \qquad p_{1/2} = 1/K = 1.9\times10^{5}\ \mathrm{Pa} = 1.9\ \mathrm{bar},
$$
and at $1.0\ \mathrm{bar}$, $\theta = 0.52/1.52 = 0.34$. The binding energy, although only about $11RT$, is enough to hold a third of a monolayer at atmospheric pressure, because it must compete only with the translational freedom of the gas, not overwhelm it. Real physisorption at such coverages is complicated by lateral attractions and multilayer formation — the BET isotherm — which the independent-site model ignores.
:::
:::

::: quiz
A crystal of $N$ atoms is modelled as $3N$ independent harmonic oscillators localised at lattice sites. Which canonical partition function is correct?
- [x] $Q = (q^\mathrm{V})^{3N}$, because atoms on lattice sites are distinguishable by their positions.
- [ ] $Q = (q^\mathrm{V})^{3N}/(3N)!$, because the atoms are identical.
- [ ] $Q = (q^\mathrm{V})^{3N}/N!$, because there are $N$ identical atoms.
- [ ] $Q = 3N\,q^\mathrm{V}$, because the oscillators are independent.
::: solution
Identical particles at fixed, labelled positions are distinguishable *by their positions*: swapping the vibrational states of the atoms at sites 1 and 2 produces a different state of the crystal (site 1 is now in the other state), so no permutation overcounting occurs and $Q = q^{N_\text{osc}}$. This is the Einstein model of [[statistical-thermodynamics/quantum-statistics]]. The $1/N!$ belongs to particles that can wander through the same volume and exchange places; dividing here would give an entropy that is not extensive in the opposite sense. A *sum* $3Nq$ would be the partition function of a single particle with $3N$ copies of the oscillator's states — not of $3N$ particles.
:::
:::

::: history
J. Willard Gibbs, professor of mathematical physics at Yale, introduced the microcanonical, canonical and grand canonical ensembles in *Elementary Principles in Statistical Mechanics* (1902), the book that gave the subject its name and its modern form; his "canonical distribution" was chosen because it was the simplest that made the thermodynamic analogy exact. The entropy-of-mixing paradox that bears his name appears in his great memoir *On the Equilibrium of Heterogeneous Substances* (1875–1878). Albert Einstein, unaware of Gibbs's book, derived the canonical ensemble independently in 1902–1904 and in the 1904 paper obtained the energy fluctuation formula [[#eq-fluct]], which he used to estimate the size of fluctuations in black-body radiation. Otto Sackur (1911–1912) and Hugo Tetrode (1912) independently derived the absolute entropy of a monatomic gas, the first appearance of Planck's constant in a thermodynamic property of a gas; Tetrode explicitly divided the number of states by $N!$, and the result was tested against the measured vapour pressure of mercury.
:::

## Where this leads

The canonical ensemble is the framework for the rest of the course. With $Q = q^{N}/N!$ and the Gibbs energy [[#eq-g-standard]] we compute equilibrium constants from molecular data in [[statistical-thermodynamics/equilibrium-from-molecules]]. When the molecules interact, $Q$ acquires a configuration integral, and its evaluation gives virial coefficients and the structure of liquids ([[statistical-thermodynamics/real-gases-liquids]]). When the condition $N\Lambda^{3}/V \ll 1$ fails, the $1/N!$ correction is no longer enough and the grand canonical ensemble leads to Bose–Einstein and Fermi–Dirac statistics ([[statistical-thermodynamics/quantum-statistics]]). In computational chemistry, molecular dynamics and Monte Carlo simulations sample exactly these ensembles, and free-energy methods estimate ratios of canonical partition functions ([[computational-chemistry/free-energy-sampling]]).

::: summary
- An ensemble is a collection of replicas of a system; the canonical ensemble holds $N$, $V$ and $T$ fixed, and its members are in state $i$ with probability $P_i = e^{-\beta E_i}/Q$, $Q = \sum_ie^{-\beta E_i}$ summed over states of the whole system.
- All thermodynamics follows from $Q$: $A - A(0) = -k_\mathrm{B}T\ln Q$, $U - U(0) = -(\partial\ln Q/\partial\beta)_V$, $S = (U - U(0))/T + k_\mathrm{B}\ln Q$, $p = k_\mathrm{B}T(\partial\ln Q/\partial V)_T$; the Gibbs entropy is $S = -k_\mathrm{B}\sum_iP_i\ln P_i$.
- Energy fluctuations obey $\sigma_E^{2} = k_\mathrm{B}T^{2}C_V$; the relative fluctuation scales as $N^{-1/2}$ ($10^{-12}$ for a mole, $8\,\%$ for 100 atoms).
- Independent molecules: $Q = q^{N}$ if distinguishable (localised), $Q = q^{N}/N!$ if indistinguishable, valid when $N\Lambda^{3}/V \ll 1$.
- The perfect gas law follows from $q^\mathrm{T} \propto V$; the Sackur–Tetrode equation $S_\mathrm{m} = R\ln(k_\mathrm{B}Te^{5/2}/p\Lambda^{3})$ gives $154.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for argon, matching calorimetry.
- The $1/N!$ makes the entropy extensive and resolves the Gibbs paradox.
- For a perfect gas $G - G(0) = -nRT\ln(q/N)$ and $G^\circ_\mathrm{m} - G^\circ_\mathrm{m}(0) = -RT\ln(q^\circ_\mathrm{m}/N_\mathrm{A})$.
:::

## Exercises

::: exercise Fluctuations in a small system {level=1 check="0.000816"}
Calculate the relative root-mean-square energy fluctuation $\sigma_E/\langle E\rangle$ for a monatomic perfect gas of $10^{6}$ atoms in the canonical ensemble. (Enter the ratio.)
::: solution
$\sigma_E/\langle E\rangle = (2/3N)^{1/2} = (2/3\times10^{6})^{1/2} = 8.16\times10^{-4}$. A million atoms — a cube of about $30\ \mathrm{nm}$ side in the gas at $1\ \mathrm{bar}$ — still has energy fluctuations below $0.1\,\%$.
:::
:::

::: exercise Entropy of isothermal expansion {level=1 check="5.76"}
Use the Sackur–Tetrode equation to calculate the change in molar entropy when a monatomic perfect gas doubles its volume isothermally. (Enter $\Delta S_\mathrm{m}$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
At constant $T$, $\Lambda$ is unchanged and $S_\mathrm{m} = R\ln V_\mathrm{m} + \text{const}$, so $\Delta S_\mathrm{m} = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — the thermodynamic result $nR\ln(V_2/V_1)$, here obtained by counting translational states: doubling the volume doubles the number of accessible states of each molecule.
:::
:::

::: exercise The standard entropy of neon {level=1 check="146.3"}
Calculate $S^\circ_\mathrm{m}$ for neon ($M = 20.180\ \mathrm{g\,mol^{-1}}$) at $298.15\ \mathrm{K}$ and $1\ \mathrm{bar}$. (Enter it in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
Scaling from argon is quickest: $S_\mathrm{m}$ depends on mass as $\tfrac{3}{2}R\ln M$, so $S^\circ_\mathrm{m}(\mathrm{Ne}) = 154.85 + \tfrac{3}{2}\times8.3145\times\ln(20.180/39.948) = 154.85 - 8.52 = 146.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$. A direct calculation gives $\Lambda = 22.5\ \mathrm{pm}$, $k_\mathrm{B}T/p^\circ\Lambda^{3} = 3.61\times10^{6}$ and $S^\circ_\mathrm{m} = R(15.10 + 2.5) = 146.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$; the tabulated value is $146.3$.
:::
:::

::: exercise Entropy at a higher temperature {level=2 check="165.6"}
What is the standard molar entropy of argon at $500\ \mathrm{K}$? (Enter it in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
At constant pressure, $k_\mathrm{B}T/p\Lambda^{3} \propto T^{5/2}$, so $S^\circ_\mathrm{m}(500\ \mathrm{K}) = S^\circ_\mathrm{m}(298.15\ \mathrm{K}) + \tfrac{5}{2}R\ln(500/298.15) = 154.85 + 10.75 = 165.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$. The same answer follows from thermodynamics, $\Delta S = C_p\ln(T_2/T_1)$ with $C_{p,\mathrm{m}} = \tfrac{5}{2}R$.
:::
:::

::: exercise When is a gas classical? {level=2 check="12"}
Find the temperature at which $N\Lambda^{3}/V = 0.01$ for helium-4 gas at $1\ \mathrm{bar}$. (Enter $T$ in K, to two significant figures.)
::: hint
$N/V = p/k_\mathrm{B}T$ and $\Lambda^{3} \propto T^{-3/2}$, so $N\Lambda^{3}/V \propto T^{-5/2}$.
:::
::: solution
$N\Lambda^{3}/V = (p/k_\mathrm{B}T)\,h^{3}/(2\pi mk_\mathrm{B}T)^{3/2} \propto T^{-5/2}$. From [[#ex-he]], at $4.2\ \mathrm{K}$ and $101.325\ \mathrm{kPa}$ the value is $0.135$; at $1\ \mathrm{bar}$ it is $0.135\times(100/101.325) = 0.133$. Setting $0.133\times(4.2/T)^{5/2} = 0.01$ gives $(4.2/T)^{5/2} = 0.0751$, so $4.2/T = 0.0751^{0.4} = 0.355$ and $T = 11.8\ \mathrm{K}$, i.e. about $12\ \mathrm{K}$. Above this temperature helium at $1\ \mathrm{bar}$ is classical to within about $1\,\%$; every other gas reaches the same condition well above its boiling point.
:::
::: answer
$12\ \mathrm{K}$
:::
:::

::: exercise The two-state system in the canonical ensemble {level=2 check="0.693"}
A crystal contains $N$ independent, localised two-state systems (states $0$ and $\varepsilon$). Write down $Q$ and use [[#eq-thermo-q]] to obtain $A$ and $S$. What is $S/Nk_\mathrm{B}$ in the limit $T\to\infty$? (Enter $S/Nk_\mathrm{B}$.)
::: solution
The systems are distinguishable, so $Q = q^{N} = (1 + e^{-\beta\varepsilon})^{N}$ and $A - A(0) = -Nk_\mathrm{B}T\ln(1 + e^{-\beta\varepsilon})$. Then $U - U(0) = -\partial\ln Q/\partial\beta = N\varepsilon e^{-\beta\varepsilon}/(1 + e^{-\beta\varepsilon})$ and
$$
S = \frac{U - U(0)}{T} + k_\mathrm{B}\ln Q = Nk_\mathrm{B}\left[\frac{\beta\varepsilon\,e^{-\beta\varepsilon}}{1 + e^{-\beta\varepsilon}} + \ln(1 + e^{-\beta\varepsilon})\right] .
$$
As $T\to\infty$, $\beta\varepsilon\to0$, the first term vanishes and the second tends to $\ln 2$: $S/Nk_\mathrm{B} \to \ln 2 = 0.693$, the entropy of $2^{N}$ equally probable arrangements — the same result as in [[statistical-thermodynamics/thermodynamic-functions]], now from the general formalism.
:::
:::

::: exercise The van der Waals equation from a partition function {level=3}
A crude model of a dense gas replaces the volume available to each molecule by $V - Nb$ (excluded volume) and the attractions by a mean potential energy $-aN/V$ per molecule (with $a$, $b$ per molecule constants), so that
$$
Q = \frac{1}{N!}\left(\frac{V - Nb}{\Lambda^{3}}\right)^{N}e^{\beta aN^{2}/V} .
$$
Derive the equation of state, and express it in molar form.
::: solution
$\ln Q = N\ln(V - Nb) + \beta aN^{2}/V + (\text{terms independent of } V)$. Then
$$
p = k_\mathrm{B}T\left(\frac{\partial\ln Q}{\partial V}\right)_T = \frac{Nk_\mathrm{B}T}{V - Nb} - \frac{aN^{2}}{V^{2}} .
$$
Per mole, with $N = nN_\mathrm{A}$ and the molar constants $a_\mathrm{m} = N_\mathrm{A}^{2}a$, $b_\mathrm{m} = N_\mathrm{A}b$, this is $p = nRT/(V - nb_\mathrm{m}) - a_\mathrm{m}n^{2}/V^{2}$, the van der Waals equation. The derivation shows what the two constants mean: $b$ is the volume excluded by the repulsive core of a molecule and $a$ measures the average attractive energy, both of which we compute from an intermolecular potential in [[statistical-thermodynamics/real-gases-liquids]].
:::
:::

::: exercise Fluctuations and the heat capacity {level=3}
(a) Show that in the canonical ensemble $\langle(E - \langle E\rangle)^{3}\rangle = k_\mathrm{B}^{2}\left[T^{4}(\partial C_V/\partial T)_V + 2T^{3}C_V\right]$. (b) For a monatomic perfect gas, show that the skewness $\langle(E - \langle E\rangle)^{3}\rangle/\sigma_E^{3}$ equals $2/\sqrt{3N/2}$, and comment on the shape of the energy distribution for one atom and for a mole.
::: hint
Differentiate $\sigma_E^{2} = -\partial\langle E\rangle/\partial\beta$ once more with respect to $\beta$; the third central moment is $-\partial\sigma_E^{2}/\partial\beta$.
:::
::: solution
(a) By the same manipulation as in the proof of [[#prop-fluct]], $\partial^{n}\ln Q/\partial\beta^{n}$ is the $n$th cumulant times $(-1)^{n}$, so the third central moment is $\kappa_3 = -\partial\sigma_E^{2}/\partial\beta = k_\mathrm{B}T^{2}\,\partial(k_\mathrm{B}T^{2}C_V)/\partial T = k_\mathrm{B}^{2}T^{2}(2TC_V + T^{2}\,\partial C_V/\partial T)$, which is the result stated.

(b) For the monatomic gas $C_V = \tfrac{3}{2}Nk_\mathrm{B}$ is constant, so $\kappa_3 = 2k_\mathrm{B}^{2}T^{3}\cdot\tfrac{3}{2}Nk_\mathrm{B} = 3Nk_\mathrm{B}^{3}T^{3}$, and $\sigma_E^{3} = (\tfrac{3}{2}N)^{3/2}k_\mathrm{B}^{3}T^{3}$. The skewness is $3N/(\tfrac{3}{2}N)^{3/2} = 2/(\tfrac{3}{2}N)^{1/2}$ — exactly the skewness $2/\sqrt{\alpha}$ of the gamma distribution with $\alpha = 3N/2$ shown in the figure. For one atom it is $1.63$, a strongly skewed distribution with a long high-energy tail (the Maxwell–Boltzmann energy distribution); for a mole it is $2\times10^{-12}$, and the distribution is a perfectly symmetric, vanishingly narrow Gaussian.
:::
:::
