The microcanonical ensemble of [[statistical-mechanics/microcanonical]] describes a system sealed off from the world, with its energy fixed. Almost nothing we measure is like that. A gas in a flask, a crystal on a bench, a molecule in solution: each exchanges energy with its surroundings and is kept at a temperature, not at an energy. Its energy fluctuates. The question becomes: at temperature $T$, what is the probability that the system is in a particular microstate $s$ of energy $E_s$?

The answer is the **Boltzmann factor**, $e^{-E_s/k_BT}$, and it is the most used formula in statistical physics. We derive it from the microcanonical postulate by treating the surroundings as a huge reservoir. Its normalising sum, the **partition function** $Z$, turns out to contain all of the thermodynamics: the energy, entropy, free energy, pressure and heat capacity are all derivatives of $\ln Z$. With it we prove the equipartition theorem that [[thermodynamics/kinetic-theory]] had to assume, see why it fails for quantised motions, and compute how large the energy fluctuations of a system at fixed temperature really are.

Throughout, $\beta = 1/k_BT$. It is the natural variable: $\beta$ is the quantity $\partial(\ln\Omega)/\partial U$ of the previous chapter, the one that two systems in contact share.

## System and reservoir {#reservoir}

Consider a small system S in thermal contact with a very large system R, the **reservoir**, the pair being isolated with total energy $U_0$. "Small" means only that S holds a negligible fraction of the energy; S can still be macroscopic. We want the probability that S is in one particular microstate $s$, with energy $E_s$.

::: theorem The Boltzmann distribution {#thm-boltzmann}
A system in thermal equilibrium with a reservoir at temperature $T$ is found in a microstate $s$ of energy $E_s$ with probability

$$
p_s = \frac{e^{-\beta E_s}}{Z}, \qquad Z = \sum_s e^{-\beta E_s}, \qquad \beta = \frac{1}{k_BT}.
$$ {#eq-boltzmann}

The sum runs over microstates, not energy levels.
:::

::: proof
Once S is fixed in microstate $s$, the reservoir has energy $U_0 - E_s$ and may be in any of its $\Omega_R(U_0 - E_s)$ microstates. The combined system is isolated, so by the fundamental postulate every microstate of the pair is equally likely. The number of microstates of the pair with S in $s$ is $1\times\Omega_R(U_0 - E_s)$, hence

$$
p_s \propto \Omega_R(U_0 - E_s) = \exp\left[\frac{S_R(U_0 - E_s)}{k_B}\right].
$$

Expand the reservoir entropy in powers of $E_s$, which is tiny compared with $U_0$:

$$
S_R(U_0 - E_s) = S_R(U_0) - E_s\pdv{S_R}{U} + \frac{E_s^2}{2}\frac{\partial^2 S_R}{\partial U^2} - \dots
$$

The first derivative is $1/T$, the reservoir temperature, by the definition in [[statistical-mechanics/microcanonical]]. The second derivative is $\partial(1/T)/\partial U = -1/(T^2C_R)$, where $C_R$ is the heat capacity of the reservoir. The second-order term, relative to the first, is of order $E_s/(TC_R)$, the temperature change the reservoir would suffer if it gave up $E_s$, divided by $T$. For a reservoir large enough, that ratio is as small as we please, and the expansion may be truncated after the linear term. Then

$$
p_s \propto e^{S_R(U_0)/k_B}\,e^{-E_s/k_BT}.
$$

The first factor does not depend on $s$. Normalising so that $\sum_s p_s = 1$ gives [[#eq-boltzmann]].
:::

Notice what the proof did not use: any property of S beyond its list of energies. S can be a single atom, a molecule, a magnetic dipole, or a litre of gas. The reservoir enters only through its temperature. The collection of copies of S distributed according to [[#eq-boltzmann]] is the **canonical ensemble**.

If several microstates share an energy, their probabilities add. When a level $E_j$ has **degeneracy** $g_j$ (that many microstates), the probability of the level is

$$
P(E_j) = \frac{g_j\,e^{-\beta E_j}}{Z}, \qquad Z = \sum_j g_j\,e^{-\beta E_j}.
$$ {#eq-levels}

::: warning States, not levels
The Boltzmann factor weights each *microstate*. A level with degeneracy $g$ gets $g$ times the weight. Forgetting the degeneracy gives wrong populations for rotational levels ($g = 2J+1$), for atomic levels ($g = 2n^2$ in hydrogen, with spin) and for electrons in solids. The ratio of probabilities of two microstates is $e^{-\beta(E_2 - E_1)}$; the ratio of probabilities of two levels is $(g_2/g_1)e^{-\beta(E_2 - E_1)}$.
:::

::: example Excited hydrogen in the Sun {#ex-sun}
The solar photosphere has a temperature near $5800\,\mathrm{K}$. The $n = 2$ level of hydrogen lies $\Delta E = 10.20\,\mathrm{eV}$ above the ground state, and including spin the degeneracies are $g_1 = 2$ and $g_2 = 8$. Find the ratio of the number of atoms in $n = 2$ to the number in $n = 1$.
::: solution
At $5800\,\mathrm{K}$,

$$
k_BT = \frac{1.380649\times10^{-23}\times5800}{1.602176634\times10^{-19}}\,\mathrm{eV} = 0.4998\,\mathrm{eV}.
$$

By [[#eq-levels]], the partition function cancels from the ratio:

$$
\frac{N_2}{N_1} = \frac{g_2}{g_1}\,e^{-\Delta E/k_BT} = 4\,e^{-10.20/0.4998} = 4\,e^{-20.41} = 5.5\times10^{-9}.
$$

About five atoms in a billion are in the first excited state. Yet the Balmer absorption lines, which start from $n = 2$, are prominent in the solar spectrum, because there is so much hydrogen. The exponential is what matters: a level ten times $k_BT$ above the ground state is suppressed by $e^{-10} \approx 4.5\times10^{-5}$, one twenty times above by $2\times10^{-9}$. Cecilia Payne used exactly this reasoning, combined with Saha's ionisation equation, in her 1925 thesis showing that the stars are mostly hydrogen.
:::
:::

## The partition function {#partition}

The normalising sum $Z(\beta)$ was introduced as a convenience. It is much more than that.

::: definition Partition function {#def-z}
The **canonical partition function** of a system with microstates $s$ of energies $E_s$ is

$$
Z(T, V, N) = \sum_s e^{-E_s/k_BT}.
$$ {#eq-z}

It depends on $T$ through $\beta$, and on $V$ and $N$ through the energies $E_s$.
:::

$Z$ is dimensionless and counts, roughly, the number of microstates that are thermally accessible: states with $E_s - E_0 \lesssim k_BT$ contribute about $1$ each, states far above contribute almost nothing. At $T \to 0$, $Z \to g_0e^{-\beta E_0}$, the ground-state term. The German name *Zustandssumme*, "sum over states", is the origin of the letter $Z$.

::: theorem Energy from the partition function {#thm-energy}
The mean energy of a system in the canonical ensemble is

$$
U = \langle E\rangle = -\pdv{\ln Z}{\beta}.
$$ {#eq-u}
:::

::: proof
Differentiate $Z = \sum_s e^{-\beta E_s}$ term by term: $\partial Z/\partial\beta = -\sum_s E_se^{-\beta E_s}$. Then

$$
-\pdv{\ln Z}{\beta} = -\frac{1}{Z}\pdv{Z}{\beta} = \sum_s E_s\frac{e^{-\beta E_s}}{Z} = \sum_s E_sp_s = \langle E\rangle.
$$
:::

### Free energy and entropy

The thermodynamic potential natural to fixed $T$, $V$, $N$ is the Helmholtz free energy $F = U - TS$ of [[thermodynamics/potentials]], whose differential is $\dd F = -S\,\dd T - P\,\dd V + \mu\,\dd N$. The partition function supplies it directly.

::: theorem Free energy from the partition function {#thm-free-energy}
Define $F = -k_BT\ln Z$. Then

$$
F = U - TS, \qquad S = -\left(\pdv{F}{T}\right)_{V, N} = -k_B\sum_s p_s\ln p_s, \qquad P = -\left(\pdv{F}{V}\right)_{T, N}.
$$ {#eq-f}

For a macroscopic system, this $S$ agrees with the Boltzmann entropy $k_B\ln\Omega(U)$ of an isolated system at the same mean energy, to leading order in $N$.
:::

::: proof
Entropy. From $p_s = e^{-\beta E_s}/Z$, $\ln p_s = -\beta E_s - \ln Z$, so

$$
-k_B\sum_s p_s\ln p_s = k_B\beta\sum_s p_sE_s + k_B\ln Z\sum_s p_s = \frac{U}{T} + k_B\ln Z = \frac{U - F}{T}.
$$

So the quantity $S = -k_B\sum p_s\ln p_s$ satisfies $F = U - TS$. Now differentiate $F = -k_BT\ln Z$ at fixed $V$ and $N$, using $\partial\beta/\partial T = -1/(k_BT^2)$ and [[#eq-u]]:

$$
-\pdv{F}{T} = k_B\ln Z + k_BT\pdv{\ln Z}{\beta}\pdv{\beta}{T} = k_B\ln Z + \frac{U}{T} = S.
$$

Pressure. Each energy depends on $V$; a slow change of volume leaves the system in the same quantum state (the adiabatic theorem), and the work done on it in state $s$ is $(\partial E_s/\partial V)\,\dd V$. The mean pressure is therefore $P = \langle-\partial E_s/\partial V\rangle$, and

$$
-\pdv{F}{V} = k_BT\frac{1}{Z}\pdv{Z}{V} = k_BT\frac{1}{Z}\sum_s(-\beta)\pdv{E_s}{V}e^{-\beta E_s} = \sum_s p_s\left(-\pdv{E_s}{V}\right) = P.
$$

Agreement with $k_B\ln\Omega$, in outline. Group the states by energy, $Z = \int\Omega(E)e^{-\beta E}\,\dd E/\delta E$. For a macroscopic system $\Omega(E)$ grows like $e^{N\cdot(\text{something})}$ and $e^{-\beta E}$ decays like $e^{-N\cdot(\text{something})}$, so the integrand has a sharp maximum at the energy $U$ where $\partial\ln\Omega/\partial E = \beta$, of width of order $\sqrt N$ times the energy per particle (computed in [[#thm-fluctuations]]). Then $\ln Z = \ln\Omega(U) - \beta U + O(\ln N)$, so $F = U - Tk_B\ln\Omega(U) + O(\ln N)$. Both terms are of order $N$; the correction is not. Comparing with $F = U - TS$ gives $S = k_B\ln\Omega(U)$ to leading order. Pathria and Beale, chapter 3, give the details.
:::

The formula $S = -k_B\sum_s p_s\ln p_s$ is the **Gibbs entropy**. For the microcanonical distribution, $p_s = 1/\Omega$ on $\Omega$ states, it reduces to $k_B\ln\Omega$ exactly. It is also, apart from the constant and the base of the logarithm, Shannon's measure of information (1948): the entropy is the missing information about which microstate the system occupies.

::: intuition The whole thermodynamics in one function
Once $Z(T, V, N)$ is known, every equilibrium property follows by differentiation: $F = -k_BT\ln Z$, then $S$, $P$ and $\mu$ from the partial derivatives of $F$, $U = F + TS$, and $C_V = \partial U/\partial T$. The physics is in the energy levels; the rest is calculus. A recurring technique is to choose the zero of energy at the ground state, since shifting every $E_s$ by a constant $E_0$ multiplies $Z$ by $e^{-\beta E_0}$ and shifts $F$ and $U$ by $E_0$, leaving $S$, $P$ and $C_V$ untouched.
:::

### Independent subsystems

When a system consists of parts that do not interact, its energy is a sum, and its partition function is a product.

::: proposition Factorisation {#prop-factor}
If a system consists of two independent parts, with microstates $(a, b)$ and energies $E_{a,b} = E_a + E_b$, then $Z = Z_1Z_2$. For $N$ independent, distinguishable, identical subsystems, $Z = z^N$, where $z$ is the partition function of one subsystem, and $F = -Nk_BT\ln z$.
:::

::: proof
The sum over all pairs factorises because the exponential of a sum is a product:

$$
Z = \sum_a\sum_b e^{-\beta(E_a + E_b)} = \left(\sum_a e^{-\beta E_a}\right)\left(\sum_b e^{-\beta E_b}\right) = Z_1Z_2.
$$

Induction gives $z^N$ for $N$ identical independent subsystems, provided that listing the state of subsystem $1$, then of subsystem $2$, and so on, counts each microstate exactly once. That is true when the subsystems are distinguishable, for example by their positions in a crystal.
:::

The proviso matters. For $N$ identical atoms of a gas, permuting the atoms does not produce a new microstate, and $z^N$ overcounts. The correction, $Z = z^N/N!$ in the classical limit, is the subject of [[statistical-mechanics/classical-gas]].

::: example The two-level system {#ex-two-level}
Each of $N$ distinguishable, independent subsystems has a ground state of energy $0$ and one excited state of energy $\Delta$. Find the mean energy and the heat capacity, and locate the maximum of the heat capacity.
::: solution
For one subsystem, $z = 1 + e^{-\beta\Delta}$. By [[#prop-factor]], $\ln Z = N\ln(1 + e^{-\beta\Delta})$, and [[#eq-u]] gives

$$
U = -N\pdv{}{\beta}\ln(1 + e^{-\beta\Delta}) = \frac{N\Delta\,e^{-\beta\Delta}}{1 + e^{-\beta\Delta}} = \frac{N\Delta}{e^{\beta\Delta} + 1}.
$$

The fraction of excited subsystems, $1/(e^{\beta\Delta} + 1)$, rises from $0$ at $T = 0$ to $\tfrac12$ as $T \to \infty$ and never exceeds one half at positive temperature. With $x = \beta\Delta = \Delta/k_BT$ and $\dd x/\dd T = -x/T$,

$$
C = \deriv{U}{T} = Nk_B\,\frac{x^2e^{x}}{(e^{x} + 1)^2}.
$$ {#eq-schottky}

This is the **Schottky anomaly**. It vanishes at low temperature (exponentially, because exciting any subsystem costs a factor $e^{-x}$) and at high temperature (like $x^2/4$, because once the two levels are equally populated there is nowhere to put more energy). The maximum is where $\dd C/\dd x = 0$. Differentiating $\ln C = 2\ln x + x - 2\ln(1 + e^x)$ gives $2/x + 1 - 2e^x/(1 + e^x) = 0$, which simplifies to

$$
x\tanh\frac{x}{2} = 2.
$$

The root, found numerically by bisection, is $x = 2.399$, that is $k_BT = 0.417\,\Delta$, where $C = 0.439\,Nk_B$. A bump of this shape in a measured heat capacity, superposed on the smooth lattice contribution, is the signature of a two-level system: magnetic ions in a crystal field, or tunnelling defects in a glass.
:::
:::

::: widget plot
f: 1/(1+exp(1/x)); exp(1/x)/(x^2*(1+exp(1/x))^2)
x: 0.02, 3
y: 0, 0.55
labels: excited fraction; C/(N k_B)
caption: The two-level system of the worked example, against $x = k_BT/\Delta$. The excited fraction climbs towards $\tfrac12$ but never reaches it. The heat capacity peaks at $k_BT \approx 0.42\,\Delta$, where the excited fraction is changing fastest, and dies away on both sides. Hover near $x = 0.42$ to read the peak value $0.44$; then look at $x = 3$, where the populations are nearly equal and $C$ has fallen to about $0.03$.
:::

::: example The paramagnet in the canonical ensemble {#ex-paramagnet}
Treat the two-state paramagnet of [[statistical-mechanics/microcanonical]], $N$ distinguishable dipoles of moment $\mu$ in a field $B$, canonically. Find the magnetisation and the entropy, and use the entropy to explain adiabatic demagnetisation: a salt at $1.00\,\mathrm{K}$ in a field of $1.00\,\mathrm{T}$ is thermally isolated and the field is slowly reduced to $0.0100\,\mathrm{T}$. What is the final temperature, if the dipoles are ideal?
::: solution
One dipole has energies $\mp\mu B$, so $z = e^{\beta\mu B} + e^{-\beta\mu B} = 2\cosh y$ with $y = \beta\mu B$. The probability of the aligned state is $e^{y}/(2\cosh y)$, the mean moment along the field is $\mu\tanh y$, and

$$
M = N\mu\tanh\frac{\mu B}{k_BT},
$$

the result of the previous chapter, obtained without Stirling's formula. The free energy is $F = -Nk_BT\ln(2\cosh y)$. Differentiating at fixed $B$, with $\partial y/\partial T = -y/T$,

$$
S = -\pdv{F}{T} = Nk_B\bigl[\ln(2\cosh y) - y\tanh y\bigr].
$$

As $y \to 0$ (weak field or high temperature) $S \to Nk_B\ln2$, every microstate accessible. As $y \to \infty$, $\ln(2\cosh y) \to y$ and $\tanh y \to 1$, so $S \to 0$: all dipoles aligned.

The important feature is that $S$ depends on $B$ and $T$ only through the ratio $y = \mu B/k_BT$. A slow change with the salt thermally isolated is reversible and adiabatic, so it keeps $S$ fixed, hence $y$ fixed, hence $B/T$ fixed. Reducing the field by a factor $100$ reduces the temperature by the same factor:

$$
T_{\mathrm{f}} = T_{\mathrm{i}}\,\frac{B_{\mathrm{f}}}{B_{\mathrm{i}}} = 1.00\,\mathrm{K}\times\frac{0.0100}{1.00} = 0.0100\,\mathrm{K}.
$$

In a real salt the dipoles interact, which acts like an internal field of order $0.01$ to $0.1\,\mathrm{T}$ and sets a floor on the temperature reached, and the lattice vibrations must be cold enough to hold negligible entropy. Within those limits this is how temperatures well below $1\,\mathrm{K}$ were first reached: the method was proposed independently by Peter Debye and William Giauque in 1926 and carried out by Giauque and Duncan MacDougall in 1933. Nuclear dipoles, a thousand times weaker, take the method down to microkelvin.
:::
:::

::: example The Einstein solid again {#ex-oscillator}
Find the partition function and mean energy of a quantum harmonic oscillator with levels $E_n = (n + \tfrac12)\hbar\omega$, and compare with the microcanonical result of [[statistical-mechanics/microcanonical]].
::: solution
With $\varepsilon = \hbar\omega$, the sum is geometric:

$$
z = \sum_{n=0}^\infty e^{-\beta\varepsilon(n + 1/2)} = e^{-\beta\varepsilon/2}\sum_{n=0}^\infty\left(e^{-\beta\varepsilon}\right)^n = \frac{e^{-\beta\varepsilon/2}}{1 - e^{-\beta\varepsilon}} = \frac{1}{2\sinh(\beta\varepsilon/2)}.
$$

Then $\ln z = -\beta\varepsilon/2 - \ln(1 - e^{-\beta\varepsilon})$ and

$$
\langle E\rangle = -\pdv{\ln z}{\beta} = \frac{\varepsilon}{2} + \frac{\varepsilon\,e^{-\beta\varepsilon}}{1 - e^{-\beta\varepsilon}} = \frac{\varepsilon}{2} + \frac{\varepsilon}{e^{\beta\varepsilon} - 1}.
$$ {#eq-osc-e}

The mean number of quanta is $\langle n\rangle = 1/(e^{\beta\varepsilon} - 1)$, the **Planck distribution**, which will reappear for photons and phonons in [[statistical-mechanics/bose-fermi]]. For $N$ distinguishable oscillators, [[#prop-factor]] gives $Z = z^N$ and $U = N\langle E\rangle$, which apart from the zero-point term $N\varepsilon/2$ is exactly the microcanonical result $U = N\varepsilon/(e^{\varepsilon/k_BT} - 1)$. The two ensembles agree, as [[#thm-free-energy]] says they must for large $N$, but the canonical calculation took three lines instead of a combinatorial identity and Stirling's formula.

The free energy is $F = N\varepsilon/2 + Nk_BT\ln(1 - e^{-\beta\varepsilon})$. As a check on [[#eq-f]], its temperature derivative gives $S = Nk_B[\beta\varepsilon\langle n\rangle - \ln(1 - e^{-\beta\varepsilon})]$, which vanishes as $T \to 0$ (one state, the ground state) and grows like $Nk_B[\ln(k_BT/\varepsilon) + 1]$ at high temperature, matching [[statistical-mechanics/microcanonical]].
:::
:::

::: quiz
A system has two microstates of energy $0$ and four microstates of energy $\varepsilon$. At very high temperature, $k_BT \gg \varepsilon$, what fraction of the time is it in one of the states of energy $\varepsilon$?
- [ ] $\tfrac12$
- [x] $\tfrac23$
- [ ] $\tfrac15$
- [ ] It approaches $1$, because high temperature favours high energy.
::: solution
The level probabilities are proportional to $g_je^{-\beta E_j}$: $2$ and $4e^{-\beta\varepsilon}$. As $\beta\varepsilon \to 0$ the exponential tends to $1$, so the probabilities tend to $2/6$ and $4/6$. At infinite temperature every *microstate* is equally likely, and the upper level has twice as many. A positive temperature never inverts the population per microstate; only a negative temperature, as in [[statistical-mechanics/microcanonical]], does that.
:::
:::

## Equipartition {#equipartition}

Classical mechanics describes a system by continuous coordinates and momenta, and its "sum over states" becomes an integral over phase space. The precise rule, including the factor of Planck's constant that makes the integral dimensionless, is justified in [[statistical-mechanics/classical-gas]]. For averages the normalisation cancels, and all we need is that the probability density in phase space is proportional to $e^{-\beta H}$, where $H$ is the classical energy (the Hamiltonian).

::: theorem Equipartition {#thm-equipartition}
Let a classical system be in canonical equilibrium at temperature $T$, with Hamiltonian $H = a\xi^2 + H'(\text{other variables})$, where $\xi$ is one coordinate or momentum ranging over $(-\infty, \infty)$, $a > 0$ is independent of $\xi$, and $H'$ does not depend on $\xi$. Then

$$
\langle a\xi^2\rangle = \tfrac12 k_BT.
$$ {#eq-equipartition}

Consequently, a classical system whose energy is a sum of $f$ such quadratic terms has mean energy $U = \tfrac{f}{2}k_BT$ and heat capacity $C = \tfrac{f}{2}k_B$.
:::

::: proof
Write the phase-space variables as $\xi$ and $\mathbf y$ (everything else). The canonical average is

$$
\langle a\xi^2\rangle = \frac{\int a\xi^2\,e^{-\beta a\xi^2}e^{-\beta H'(\mathbf y)}\,\dd\xi\,\dd\mathbf y}{\int e^{-\beta a\xi^2}e^{-\beta H'(\mathbf y)}\,\dd\xi\,\dd\mathbf y}.
$$

The integrals over $\mathbf y$ are the same in numerator and denominator, so they cancel. (The hypothesis that $a$ does not depend on $\xi$ is enough; if $a$ depends on $\mathbf y$, carry out the $\xi$ integral first at fixed $\mathbf y$, obtain $\tfrac12k_BT$, and then average a constant over $\mathbf y$.) What remains is

$$
\langle a\xi^2\rangle = \frac{\int_{-\infty}^\infty a\xi^2e^{-\beta a\xi^2}\,\dd\xi}{\int_{-\infty}^\infty e^{-\beta a\xi^2}\,\dd\xi} = -\pdv{}{\beta}\ln\int_{-\infty}^\infty e^{-\beta a\xi^2}\,\dd\xi.
$$

The Gaussian integral is $\int e^{-\beta a\xi^2}\,\dd\xi = \sqrt{\pi/(\beta a)}$, whose logarithm is $-\tfrac12\ln\beta + (\text{terms independent of }\beta)$. Its derivative with respect to $\beta$ is $-1/(2\beta)$, so

$$
\langle a\xi^2\rangle = \frac{1}{2\beta} = \tfrac12k_BT.
$$

Adding $f$ such contributions gives $U = \tfrac{f}{2}k_BT$, and differentiation gives $C$.
:::

Every quadratic term gets the same share, whatever its coefficient: a light atom and a heavy one have the same mean kinetic energy, a stiff spring and a soft one the same mean potential energy. The familiar counts follow.

| system | quadratic terms per particle | $C_V$ per mole |
|---|---|---|
| monatomic gas | $3$ (translation) | $\tfrac32R$ |
| rigid diatomic gas | $3 + 2$ (translation, two rotations) | $\tfrac52R$ |
| diatomic with vibration | $3 + 2 + 2$ | $\tfrac72R$ |
| crystal (Dulong–Petit) | $6$ (three kinetic, three potential) | $3R$ |

::: example Thermal noise of a cantilever {#ex-cantilever}
The cantilever of an atomic force microscope behaves as a spring of stiffness $\kappa = 0.100\,\mathrm{N/m}$ at $300\,\mathrm{K}$. Find the root-mean-square thermal displacement of its tip.
::: solution
The potential energy $\tfrac12\kappa x^2$ is a quadratic term in the coordinate $x$, with $a = \kappa/2$. By [[#thm-equipartition]], $\langle\tfrac12\kappa x^2\rangle = \tfrac12k_BT$, so

$$
x_{\mathrm{rms}} = \sqrt{\frac{k_BT}{\kappa}} = \sqrt{\frac{1.380649\times10^{-23}\times300}{0.100}}\,\mathrm{m} = 2.04\times10^{-10}\,\mathrm{m}.
$$

The tip jitters by about $0.2\,\mathrm{nm}$, comparable to an atomic diameter. Far from being a nuisance, this is used to calibrate cantilevers: measure $\langle x^2\rangle$ and infer $\kappa = k_BT/\langle x^2\rangle$. The classical result is valid because the cantilever's resonance frequency, tens of kilohertz, gives $\hbar\omega \sim 10^{-29}\,\mathrm{J}$, utterly negligible against $k_BT = 4.1\times10^{-21}\,\mathrm{J}$.
:::
:::

### When equipartition fails

The theorem rests on classical mechanics, in which $\xi$ ranges continuously. For a quantum oscillator, [[#eq-osc-e]] gives the mean energy above the ground state as $\varepsilon/(e^{\beta\varepsilon} - 1)$. For $k_BT \gg \varepsilon$ this expands to $k_BT - \varepsilon/2 + \varepsilon^2/(12k_BT) + \dots$; together with the zero-point energy $\varepsilon/2$, the total mean energy approaches $k_BT$, the classical value for two quadratic terms. For $k_BT \ll \varepsilon$ it is exponentially small, and the mode is **frozen out**: it contributes nothing to the heat capacity.

::: widget plot
f: 1/(exp(1/x)-1); x - 0.5
x: 0.01, 2.5
y: 0, 2.2
labels: quantum oscillator; classical asymptote
caption: Mean thermal energy of a quantum oscillator above its ground state, $\langle n\rangle\varepsilon$, in units of $\varepsilon$, against $k_BT/\varepsilon$. The straight line is the high-temperature asymptote $k_BT - \varepsilon/2$, which with the zero-point energy is the classical equipartition value. The curves merge above $k_BT \approx \varepsilon$. Below $k_BT \approx 0.2\,\varepsilon$ the oscillator is frozen: its energy, and hence its heat capacity, is nearly zero.
:::

So equipartition holds for a degree of freedom only if its level spacing is small compared with $k_BT$. For the nitrogen molecule the vibrational quantum corresponds to a wavenumber of about $2330\,\mathrm{cm^{-1}}$, a temperature $hc\tilde\nu/k_B \approx 3350\,\mathrm{K}$; at room temperature the fraction of molecules vibrationally excited is $e^{-3350/300} \approx 1.4\times10^{-5}$, and air has $C_V = \tfrac52R$, not $\tfrac72R$. Rotational spacings of nitrogen are a few kelvin, so rotation is fully classical at room temperature. The electronic excitations are many electronvolts up and never contribute. That the classical theory could not explain these missing degrees of freedom was one of Kelvin's "two clouds" over nineteenth-century physics, in his Royal Institution lecture of 1900; the answer was quantisation. The vibrational and rotational partition functions of molecules, and the heat capacities they give, are worked out in detail in the Chemistry Atlas chapter [The molecular partition function](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=partition-function).

::: example Rotation of carbon monoxide {#ex-rotation}
A rigid linear molecule has rotational levels $E_J = k_B\theta_{\mathrm{rot}}J(J+1)$, $J = 0, 1, 2, \dots$, each with degeneracy $2J + 1$. For carbon monoxide the rotational constant $1.9313\,\mathrm{cm^{-1}}$ gives $\theta_{\mathrm{rot}} = hc\tilde B/k_B = 2.779\,\mathrm{K}$. At $300\,\mathrm{K}$, compute the rotational partition function, compare it with the classical value $T/\theta_{\mathrm{rot}}$, and find the most populated level.
::: solution
Summing $(2J + 1)e^{-J(J+1)\theta_{\mathrm{rot}}/T}$ numerically until the terms are negligible (by $J \approx 60$) gives $z_{\mathrm{rot}} = 108.30$. The classical value, the integral of the same expression over $J$, is $T/\theta_{\mathrm{rot}} = 107.96$; the Euler–Maclaurin correction $+\tfrac13$ brings it to $108.30$, in agreement to five figures. The rotational energy is then $-\partial\ln z_{\mathrm{rot}}/\partial\beta = k_BT$ to the same accuracy: two quadratic terms, as equipartition says for two rotational axes.

By [[#eq-levels]], the population of level $J$ is proportional to $(2J + 1)e^{-J(J+1)\theta_{\mathrm{rot}}/T}$. The degeneracy rises and the Boltzmann factor falls, so there is a maximum. Treating $J$ as continuous and setting the derivative to zero gives $J_{\max} = \sqrt{T/2\theta_{\mathrm{rot}}} - \tfrac12 = 6.85$; among integers the largest population is at $J = 7$, holding $8.2\%$ of the molecules, while the ground level $J = 0$ holds only $0.92\%$. This is the envelope of intensities seen in the infrared rotation–vibration spectrum of CO, and it is a direct picture of degeneracy competing with the Boltzmann factor. The classical limit is excellent because $T/\theta_{\mathrm{rot}} \approx 108$; for hydrogen, with $\theta_{\mathrm{rot}} = 85\,\mathrm{K}$, it is not, and the nuclear-spin statistics of $\mathrm H_2$ enter as well.
:::
:::

## Fluctuations {#fluctuations}

In the canonical ensemble the energy is not fixed. How much does it vary?

::: theorem Energy fluctuations {#thm-fluctuations}
In the canonical ensemble the variance of the energy is

$$
\langle E^2\rangle - \langle E\rangle^2 = \frac{\partial^2\ln Z}{\partial\beta^2} = k_BT^2C_V,
$$ {#eq-fluct}

where $C_V = (\partial U/\partial T)_{V,N}$. In particular $C_V \ge 0$.
:::

::: proof
From $Z = \sum_s e^{-\beta E_s}$, $\partial^2Z/\partial\beta^2 = \sum_s E_s^2e^{-\beta E_s} = Z\langle E^2\rangle$. Then

$$
\frac{\partial^2\ln Z}{\partial\beta^2} = \pdv{}{\beta}\left(\frac{1}{Z}\pdv{Z}{\beta}\right) = \frac{1}{Z}\frac{\partial^2Z}{\partial\beta^2} - \left(\frac{1}{Z}\pdv{Z}{\beta}\right)^2 = \langle E^2\rangle - \langle E\rangle^2.
$$

On the other hand, by [[#eq-u]], $\partial^2\ln Z/\partial\beta^2 = -\partial U/\partial\beta$, and since $\dd\beta = -\dd T/(k_BT^2)$,

$$
-\pdv{U}{\beta} = k_BT^2\pdv{U}{T} = k_BT^2C_V.
$$

A variance is non-negative, so $C_V \ge 0$.
:::

The theorem ties a fluctuation to a response: how much the energy wanders at fixed $T$ is fixed by how much it would change if $T$ were changed. That is the first instance of the **fluctuation–dissipation** idea, which Einstein used in 1905 for Brownian motion.

Both $U$ and $C_V$ are proportional to $N$, so the standard deviation $\Delta E = \sqrt{k_BT^2C_V}$ grows like $\sqrt N$ and the *relative* fluctuation $\Delta E/U$ falls like $1/\sqrt N$.

::: example Energy fluctuations of a gas {#ex-gas-fluct}
Find the relative energy fluctuation $\Delta E/U$ of a monatomic ideal gas of $N$ atoms in canonical equilibrium, and evaluate it for one mole.
::: solution
By equipartition, $U = \tfrac32Nk_BT$ and $C_V = \tfrac32Nk_B$. From [[#eq-fluct]],

$$
\Delta E = \sqrt{k_BT^2\cdot\tfrac32Nk_B} = \sqrt{\tfrac32N}\,k_BT, \qquad \frac{\Delta E}{U} = \frac{\sqrt{3N/2}\,k_BT}{\tfrac32Nk_BT} = \sqrt{\frac{2}{3N}}.
$$

For $N = N_A = 6.022\times10^{23}$, $\Delta E/U = 1.05\times10^{-12}$. A mole of gas held at constant temperature has an energy defined to about one part in a trillion. For a single atom, $N = 1$, the fluctuation is $82\%$ of the mean, and "the energy of an atom at temperature $T$" is not a sharp quantity at all.
:::
:::

This is why the ensembles agree. A macroscopic system at fixed $T$ has, to one part in $10^{12}$, a fixed energy, so it is statistically indistinguishable from an isolated system at that energy. The choice of ensemble is a choice of calculational convenience, and the canonical one is almost always the more convenient. The exceptions are small systems, and systems near a critical point, where $C_V$ grows without bound and the fluctuations are large on every scale; we meet those in [[statistical-mechanics/phase-transitions]].

The shape behind the scaling is easy to see for an ideal gas. Grouping the states of $N$ atoms by energy, the density of states grows like $E^{3N/2 - 1}$, and multiplied by $e^{-\beta E}$ this gives a distribution of $E$ whose mean is $\tfrac32Nk_BT$. The figure plots it with energy measured in units of that mean.

::: widget plot
f: (x*exp(1-x))^(1.5*N)
x: 0, 3
y: 0, 1.1
sliders: N=1:1:300:1
caption: The relative probability of finding a total energy $x$ times the mean, for $N$ atoms of a monatomic ideal gas at fixed temperature (the curve is $(xe^{1-x})^{3N/2}$, which differs from the exact density by one power of $x$). At $N = 1$ the energy is anything from almost $0$ to three times the mean. Drag $N$ up: by $N = 300$ the half-width at half-maximum is about $0.057$, which is $1.18$ times the standard deviation $\sqrt{2/3N} = 0.047$ from the theorem, as for a Gaussian. A mole would make the peak $10^{-12}$ wide.
:::

::: warning Mean energy is not most probable energy
For one atom of an ideal gas the energy distribution is $\propto\sqrt E\,e^{-\beta E}$, with mean $\tfrac32k_BT$ but maximum at $\tfrac12k_BT$. For a single two-level system, the mean energy lies between the only two allowed values and is never observed. The mean is what thermodynamics measures, because a macroscopic measurement averages over a huge number of particles; for small systems, ask which quantity you need.
:::

::: quiz
A system at fixed $T$ has heat capacity $C_V$. If you double the size of the system at the same temperature, what happens to the relative energy fluctuation $\Delta E/U$?
- [ ] It doubles.
- [ ] It is unchanged.
- [x] It falls by a factor $\sqrt2$.
- [ ] It falls by a factor $2$.
::: solution
$U$ and $C_V$ both double. $\Delta E = \sqrt{k_BT^2C_V}$ grows by $\sqrt2$, so $\Delta E/U$ changes by $\sqrt2/2 = 1/\sqrt2$.
:::
:::

::: application Chemistry from the same partition function
Equilibrium constants, reaction free energies, heat capacities of real gases and absolute entropies of molecules are all computed in chemistry from the canonical $Z$, with the molecular partition function factorised into translational, rotational, vibrational and electronic parts. See [Thermodynamic functions from partition functions](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=thermodynamic-functions) and [The canonical ensemble](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=canonical-ensemble) in the Chemistry Atlas, which take the chemist's road from here to tables of $\Delta G^\circ$.
:::

::: history Gibbs and the ensembles
The exponential weight $e^{-E/kT}$ appears in Boltzmann's papers of 1868 and 1871, first for molecules in a gas under external forces and then for general mechanical systems in thermal equilibrium; in 1871 he also extended equipartition, which Maxwell had established for translation and rotation in 1860, to general quadratic energies. Josiah Willard Gibbs, at Yale, gave the subject its modern form in *Elementary Principles in Statistical Mechanics* (1902). He introduced the word *ensemble* for an imagined collection of copies of a system, named the microcanonical, canonical and grand canonical ensembles, showed that the canonical distribution reproduces thermodynamics with $F = -kT\ln Z$, and computed the energy fluctuation. Einstein, unaware of Gibbs's book, rederived much of it in papers of 1902–1904, including [[#eq-fluct]], which he then applied to black-body radiation.
:::

## Where this leads {#leads}

The partition function is the engine of the rest of the course. In [[statistical-mechanics/classical-gas]] it is evaluated for atoms in a box, which gives the ideal-gas law, the Sackur–Tetrode entropy and the Maxwell distribution, and requires facing the question of identical particles. In [[statistical-mechanics/quantum-statistics]] we let the particle number fluctuate too, which is the grand canonical ensemble, and that is the natural language for bosons and fermions. In [[statistical-mechanics/phase-transitions]] the partition function of interacting spins can no longer be factorised, and approximations and simulations take over; the Metropolis algorithm samples the Boltzmann distribution without ever computing $Z$, as in [[computation/random-sampling]].

::: summary
- A system in contact with a reservoir at temperature $T$ is in microstate $s$ with probability $e^{-\beta E_s}/Z$, with $\beta = 1/k_BT$. The derivation needs only the reservoir's temperature.
- The Boltzmann factor weights microstates; a level of degeneracy $g$ carries the factor $g$.
- The partition function $Z = \sum_se^{-\beta E_s}$ generates the thermodynamics: $U = -\partial\ln Z/\partial\beta$, $F = -k_BT\ln Z$, $S = -\partial F/\partial T = -k_B\sum p_s\ln p_s$, $P = -\partial F/\partial V$.
- Independent distinguishable subsystems have $Z = z^N$. Identical particles of a gas need more care.
- Classical equipartition: each quadratic term in the energy has mean $\tfrac12k_BT$. It fails for modes with level spacing $\gtrsim k_BT$, which freeze out.
- Energy fluctuations satisfy $\langle\Delta E^2\rangle = k_BT^2C_V$; hence $C_V \ge 0$ and $\Delta E/U \sim 1/\sqrt N$, which is why the canonical and microcanonical ensembles agree for large systems.
- The two-level system has a Schottky peak in $C$ at $k_BT \approx 0.42\,\Delta$; the oscillator gives the Planck distribution $\langle n\rangle = 1/(e^{\beta\hbar\omega} - 1)$.
:::

## Exercises {#exercises}

::: exercise A Boltzmann ratio {level=1 check="0.145"}
Two non-degenerate states differ in energy by $0.0500\,\mathrm{eV}$. At $300\,\mathrm{K}$, find the ratio of the probability of the upper state to that of the lower, to three significant figures.
::: solution
At $300\,\mathrm{K}$, $k_BT = 1.380649\times10^{-23}\times300/1.602176634\times10^{-19}\,\mathrm{eV} = 0.025852\,\mathrm{eV}$. The ratio of two microstate probabilities is

$$
\frac{p_2}{p_1} = e^{-\Delta E/k_BT} = e^{-0.0500/0.025852} = e^{-1.934} = 0.145.
$$

The partition function cancels from any ratio of probabilities. The probability of the upper state itself, if these are the only two, is $0.145/1.145 = 0.126$.
:::
:::

::: exercise A three-level partition function {level=1 check="1+exp(-1)+exp(-2)"}
A system has three non-degenerate states with energies $0$, $\varepsilon$ and $2\varepsilon$. Find its partition function at $k_BT = \varepsilon$.
::: solution
By [[#def-z]], with $\beta\varepsilon = 1$,

$$
Z = e^{0} + e^{-1} + e^{-2} = 1 + e^{-1} + e^{-2} = 1.503.
$$

The probabilities are $1/Z = 0.665$, $e^{-1}/Z = 0.245$ and $e^{-2}/Z = 0.090$. The value $Z \approx 1.5$ says that, roughly, one and a half states are thermally accessible.
:::
:::

::: exercise A two-level mean energy {level=1 check="1/(1+e)"}
For the two-level system of [[#ex-two-level]], find the mean energy per subsystem, in units of $\Delta$, when $k_BT = \Delta$.
::: solution
From the worked example, $U/N = \Delta/(e^{\beta\Delta} + 1)$. With $\beta\Delta = 1$,

$$
\frac{U}{N\Delta} = \frac{1}{e + 1} = 0.269.
$$

Even at $k_BT = \Delta$ only $27\%$ of the subsystems are excited, well short of the high-temperature limit of one half.
:::
:::

::: exercise Calibrating a cantilever {level=2 check="204"}
For the cantilever of [[#ex-cantilever]], $\kappa = 0.100\,\mathrm{N/m}$ at $300\,\mathrm{K}$, give the rms displacement in picometres to three significant figures. If a measurement at the same temperature gives an rms displacement of $350\,\mathrm{pm}$, what is the actual stiffness?
::: solution
By equipartition $x_{\mathrm{rms}} = \sqrt{k_BT/\kappa} = \sqrt{4.1419\times10^{-21}/0.100} = 2.035\times10^{-10}\,\mathrm{m}$, which is $204\,\mathrm{pm}$ to three significant figures.

Inverting, $\kappa = k_BT/x_{\mathrm{rms}}^2 = 4.1419\times10^{-21}/(3.50\times10^{-10})^2 = 0.0338\,\mathrm{N/m}$. The method needs only the temperature and the measured variance, not the geometry or the elastic modulus of the beam.
:::
:::

::: exercise Locating the Schottky peak {level=2 check="2.399"}
Show that the heat capacity [[#eq-schottky]] has its maximum where $x\tanh(x/2) = 2$, with $x = \Delta/k_BT$, and find the root to four significant figures.
::: hint
Differentiate $\ln C$ rather than $C$, and use $1 - 2e^x/(1 + e^x) = -\tanh(x/2)$.
:::
::: solution
Up to the constant $Nk_B$, $\ln C = 2\ln x + x - 2\ln(1 + e^x)$. Setting the derivative to zero,

$$
\frac{2}{x} + 1 - \frac{2e^x}{1 + e^x} = 0.
$$

Now $1 - 2e^x/(1 + e^x) = (1 - e^x)/(1 + e^x) = -\tanh(x/2)$, so the condition is $2/x = \tanh(x/2)$, that is $x\tanh(x/2) = 2$. The function $g(x) = x\tanh(x/2) - 2$ is increasing for $x > 0$, with $g(2) = -0.477$ and $g(3) = 0.715$. Bisection on $[2, 3]$ converges to $x = 2.39936$, which is $2.399$ to four significant figures. The peak is at $k_BT = \Delta/2.399 = 0.417\,\Delta$ and its height is $C = 0.439\,Nk_B$.
:::
:::

::: exercise Fluctuations of a small sample {level=2 check="8.16e-11"}
A sample of monatomic ideal gas contains $N = 1.00\times10^{20}$ atoms and is held at constant temperature. Find the relative energy fluctuation $\Delta E/U$, to three significant figures.
::: solution
From [[#ex-gas-fluct]], $\Delta E/U = \sqrt{2/(3N)}$. With $N = 1.00\times10^{20}$,

$$
\frac{\Delta E}{U} = \sqrt{\frac{2}{3.00\times10^{20}}} = \sqrt{6.67\times10^{-21}} = 8.16\times10^{-11}.
$$

The sample is about $4\,\mathrm{cm^3}$ of gas at room conditions, yet its energy fluctuates by less than one part in ten billion.
:::
:::

::: exercise Generalised equipartition {level=3}
Let a classical system have Hamiltonian $H = a\lvert\xi\rvert^n + H'$, where $\xi$ ranges over $(-\infty, \infty)$, $a > 0$, $n > 0$, and neither $a$ nor $H'$ depends on $\xi$. Prove that $\langle a\lvert\xi\rvert^n\rangle = k_BT/n$. Deduce the mean gravitational potential energy $mgz$ of a molecule in an isothermal atmosphere above flat ground, with $z$ ranging over $[0, \infty)$, and check that $n = 2$ gives [[#thm-equipartition]].
::: hint
Substitute $u = \beta a\lvert\xi\rvert^n$ to show that $\int e^{-\beta a\lvert\xi\rvert^n}\,\dd\xi$ is proportional to $\beta^{-1/n}$, then differentiate its logarithm with respect to $\beta$. The half-line case works the same way.
:::
::: solution
As in the proof of [[#thm-equipartition]], the integrals over the other variables cancel, and

$$
\langle a\lvert\xi\rvert^n\rangle = -\pdv{}{\beta}\ln I(\beta), \qquad I(\beta) = \int_{-\infty}^\infty e^{-\beta a\lvert\xi\rvert^n}\,\dd\xi.
$$

By symmetry $I = 2\int_0^\infty e^{-\beta a\xi^n}\,\dd\xi$. Substitute $\xi = (\beta a)^{-1/n}t$, so that $\dd\xi = (\beta a)^{-1/n}\,\dd t$:

$$
I(\beta) = 2(\beta a)^{-1/n}\int_0^\infty e^{-t^n}\,\dd t = C\,\beta^{-1/n},
$$

where $C$ does not depend on $\beta$ (the remaining integral is $\Gamma(1 + 1/n)$, finite for $n > 0$). Then $\ln I = \ln C - (1/n)\ln\beta$ and

$$
\langle a\lvert\xi\rvert^n\rangle = \frac{1}{n\beta} = \frac{k_BT}{n}.
$$

For $n = 2$ this is $\tfrac12k_BT$, which is [[#thm-equipartition]].

For the atmosphere, the only change is the range $z \in [0, \infty)$, which removes the factor $2$ and leaves $I \propto \beta^{-1/n}$ with $n = 1$ and $a = mg$. Hence $\langle mgz\rangle = k_BT$, twice the share of a quadratic term. The density falls as $e^{-mgz/k_BT}$, the isothermal barometric formula, and the mean height is $k_BT/mg$, about $9.0\,\mathrm{km}$ for nitrogen at $298\,\mathrm{K}$.
:::
:::

::: exercise The Gibbs variational principle {level=3}
For any probability distribution $q_s$ over the microstates of a system, define $F[q] = \sum_sq_sE_s + k_BT\sum_sq_s\ln q_s$. Prove that $F[q] \ge -k_BT\ln Z$, with equality if and only if $q_s$ is the Boltzmann distribution $p_s = e^{-\beta E_s}/Z$. Interpret the result.
::: hint
Write $E_s = -k_BT(\ln p_s + \ln Z)$, substitute, and use $\ln y \le y - 1$ with equality only at $y = 1$.
:::
::: solution
From $p_s = e^{-\beta E_s}/Z$, $E_s = -k_BT(\ln p_s + \ln Z)$. Substituting and using $\sum_sq_s = 1$,

$$
F[q] = -k_BT\sum_sq_s\ln p_s - k_BT\ln Z + k_BT\sum_sq_s\ln q_s = -k_BT\ln Z + k_BT\sum_sq_s\ln\frac{q_s}{p_s}.
$$

It remains to show that $D = \sum_sq_s\ln(q_s/p_s) \ge 0$, with equality only when $q = p$. Using $\ln y \le y - 1$ for $y > 0$, with equality only at $y = 1$, applied to $y = p_s/q_s$ for each $s$ with $q_s > 0$:

$$
-D = \sum_{q_s > 0}q_s\ln\frac{p_s}{q_s} \le \sum_{q_s > 0}q_s\left(\frac{p_s}{q_s} - 1\right) = \sum_{q_s > 0}p_s - 1 \le 0.
$$

So $D \ge 0$. Equality in the first step requires $p_s = q_s$ for every $s$ with $q_s > 0$; equality in the second requires the $p_s$ with $q_s > 0$ to sum to $1$, and since every $p_s$ is positive, $q_s > 0$ for all $s$. Hence $D = 0$ if and only if $q = p$, and $F[q] \ge -k_BT\ln Z$ with equality exactly at the Boltzmann distribution.

Interpretation: $F[q]$ is the free energy $U - TS$ that a system would have if its microstates were occupied with probabilities $q_s$, with $S$ the Gibbs entropy. At fixed temperature, equilibrium is the distribution that minimises it, the statistical counterpart of the thermodynamic criterion $\dd F \le 0$ of [[thermodynamics/potentials]]. The principle is also a practical tool: choosing a trial family $q$ and minimising $F[q]$ gives an upper bound on the true free energy, and that is how mean-field theory is derived in [[statistical-mechanics/phase-transitions]].
:::
:::
