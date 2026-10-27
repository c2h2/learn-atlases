The classical ideal gas of [[statistical-mechanics/classical-gas]] rested on one hypothesis: so many single-particle states are accessible that no two particles ever compete for the same one. The criterion was $n\lambda^3 \ll 1$, with $\lambda$ the thermal wavelength. Air satisfies it by seven orders of magnitude. The electrons in a copper wire violate it by four, liquid helium violates it, and so do the photons in a hot cavity, the vibrations of a crystal lattice, the neutrons in a neutron star and the atoms in a modern cold-atom experiment. In each case the factor $1/N!$ is no longer an adequate correction, and we have to count the quantum states of identical particles exactly.

The counting is simple once it is done in the right variables. A state of a gas of identical particles is not a list of which particle is where; it is a list of *how many* particles occupy each single-particle state. For fermions each number is $0$ or $1$; for bosons it is any non-negative integer. The constraint that the numbers add up to $N$ is awkward in the canonical ensemble, so we release it: we let the gas exchange particles as well as energy with a reservoir. That is the **grand canonical ensemble**, and in it each single-particle state becomes an independent system. Its mean occupation is the **Fermi–Dirac** or the **Bose–Einstein** distribution, and the classical Maxwell–Boltzmann result is their common limit. This chapter derives the two distributions and the machinery for using them; [[statistical-mechanics/bose-fermi]] applies them to radiation, metals, stars and condensates.

## Identical particles and occupation numbers {#occupation}

In quantum mechanics, identical particles are not merely similar: no measurement can tell which is which, and the many-particle wavefunction must reflect that. As shown in [[quantum-2/identical-particles]], exchanging the labels of two identical particles multiplies the wavefunction by $+1$ or by $-1$, and which sign applies is fixed by the species.

::: definition Bosons and fermions {#def-bosons-fermions}
A **boson** is a particle whose many-particle states are symmetric under the exchange of any two of them; a **fermion** is one whose states are antisymmetric. By the spin–statistics theorem of relativistic quantum field theory, particles of integer spin (photons, phonons treated as particles, $^4$He atoms, $^{87}$Rb atoms) are bosons, and particles of half-integer spin (electrons, protons, neutrons, $^3$He atoms) are fermions.
:::

For non-interacting particles, take a basis of single-particle states $k = 1, 2, 3, \dots$ with energies $\varepsilon_k$; we call them **orbitals**, following Kittel and Kroemer, to avoid confusion with states of the whole gas. A symmetric or antisymmetric $N$-particle state built from these orbitals is completely specified by the **occupation numbers** $n_k$, the number of particles in each orbital, because the (anti)symmetrisation leaves no further choice. For fermions an antisymmetric state with two particles in the same orbital vanishes identically: that is the **Pauli exclusion principle**, $n_k \in \{0, 1\}$. For bosons, $n_k \in \{0, 1, 2, \dots\}$. In both cases

$$
N = \sum_kn_k, \qquad E = \sum_kn_k\varepsilon_k.
$$ {#eq-occupation}

::: example Two particles, three orbitals {#ex-two-three}
Two particles occupy three orbitals of equal energy. Count the two-particle states if the particles are (a) distinguishable, (b) identical bosons, (c) identical fermions. At a temperature high enough that all states are equally likely, find in each case the probability that both particles are in the same orbital.
::: solution
(a) Each particle independently picks an orbital: $3^2 = 9$ states. Three of them have both particles in the same orbital, so the probability is $3/9 = \tfrac13$.

(b) A boson state is a set of occupation numbers $(n_1, n_2, n_3)$ with sum $2$. The stars-and-bars count of [[statistical-mechanics/microcanonical]] gives $\binom{2 + 3 - 1}{2} = 6$: the three doubly occupied states $(2,0,0)$, $(0,2,0)$, $(0,0,2)$ and the three states $(1,1,0)$, $(1,0,1)$, $(0,1,1)$. The probability of double occupancy is $3/6 = \tfrac12$.

(c) For fermions each $n_k$ is $0$ or $1$, so only the three states $(1,1,0)$, $(1,0,1)$, $(0,1,1)$ survive: $\binom32 = 3$ states, and double occupancy has probability $0$.

Relative to distinguishable particles, bosons are *more* likely to share an orbital and fermions are forbidden to. The classical count with $1/N!$, $9/2! = 4.5$, is not an integer and agrees with neither. It is right only when double occupancy is rare, which requires many more orbitals than particles: that is the condition $n\lambda^3 \ll 1$ of [[statistical-mechanics/classical-gas]]. The tendency of bosons to bunch together and of fermions to avoid each other is not a force; it is a consequence of counting alone.
:::
:::

In the canonical ensemble, the partition function of an ideal quantum gas is a sum over all sets $\{n_k\}$ with $\sum n_k = N$. That constraint couples the orbitals and spoils the factorisation that made the classical calculation easy. The remedy is to let $N$ vary.

## The grand canonical ensemble {#grand}

Let the system exchange both energy and particles with a reservoir, the pair being isolated with total energy $U_0$ and total particle number $N_0$. A microstate $s$ of the system now has an energy $E_s$ and a particle number $N_s$.

::: theorem The Gibbs distribution {#thm-gibbs}
A system in equilibrium with a reservoir at temperature $T$ and chemical potential $\mu$ is found in a microstate $s$ with energy $E_s$ and particle number $N_s$ with probability

$$
p_s = \frac{e^{-\beta(E_s - \mu N_s)}}{\mathcal Z}, \qquad \mathcal Z = \sum_se^{-\beta(E_s - \mu N_s)}.
$$ {#eq-gibbs}

The normalising sum $\mathcal Z(T, V, \mu)$ is the **grand partition function**, and the exponential is the **Gibbs factor**.
:::

::: proof
As in the derivation of the Boltzmann distribution in [[statistical-mechanics/canonical]], $p_s$ is proportional to the number of microstates of the reservoir compatible with S being in $s$:

$$
p_s \propto \Omega_R(U_0 - E_s, N_0 - N_s) = \exp\left[\frac{S_R(U_0 - E_s, N_0 - N_s)}{k_B}\right].
$$

Expand to first order in the small quantities $E_s$ and $N_s$:

$$
S_R(U_0 - E_s, N_0 - N_s) \approx S_R(U_0, N_0) - E_s\pdv{S_R}{U} - N_s\pdv{S_R}{N}.
$$

By the definitions in [[statistical-mechanics/microcanonical]], $\partial S_R/\partial U = 1/T$ and $\partial S_R/\partial N = -\mu/T$, the reservoir's temperature and chemical potential. Hence $p_s \propto e^{-(E_s - \mu N_s)/k_BT}$. The neglected second-order terms are small for the same reason as before: a large reservoir does not change its $T$ or $\mu$ appreciably when it gives up a little energy or a few particles. Normalising gives [[#eq-gibbs]].
:::

The grand partition function plays the role $Z$ played before. With the fugacity $z = e^{\beta\mu}$, $\mathcal Z = \sum_Nz^NZ_N$, a power series in $z$ whose coefficients are the canonical partition functions.

::: theorem Thermodynamics from the grand partition function {#thm-grand-potential}
Define the **grand potential** $\Phi = -k_BT\ln\mathcal Z$. Then

$$
\langle N\rangle = -\pdv{\Phi}{\mu} = k_BT\pdv{\ln\mathcal Z}{\mu}, \qquad S = -\pdv{\Phi}{T}, \qquad \Phi = U - TS - \mu\langle N\rangle = -PV.
$$ {#eq-grand}

The particle-number fluctuations are $\langle N^2\rangle - \langle N\rangle^2 = k_BT\,\partial\langle N\rangle/\partial\mu$.
:::

::: proof
Differentiating $\ln\mathcal Z$ with respect to $\mu$ at fixed $T$ brings down $\beta N_s$ from each term, so $k_BT\,\partial\ln\mathcal Z/\partial\mu = \sum_sN_sp_s = \langle N\rangle$. A second derivative gives the variance, exactly as in the proof of the energy-fluctuation theorem of [[statistical-mechanics/canonical]].

For the entropy, use the Gibbs form $S = -k_B\sum p_s\ln p_s$ with $\ln p_s = -\beta(E_s - \mu N_s) - \ln\mathcal Z$:

$$
S = k_B\beta(U - \mu\langle N\rangle) + k_B\ln\mathcal Z = \frac{U - \mu\langle N\rangle - \Phi}{T},
$$

so $\Phi = U - TS - \mu\langle N\rangle$. Differentiating $\Phi = -k_BT\ln\mathcal Z$ with respect to $T$ at fixed $\mu$, the same steps as for $F$ give $-\partial\Phi/\partial T = S$.

Finally, $\Phi(T, V, \mu)$ is extensive and its only extensive argument is $V$, so $\Phi = V\phi(T, \mu)$. Its volume derivative is $-P$, by the same argument as for $F$ (the energies $E_s$ depend on $V$), so $\phi = -P$ and $\Phi = -PV$.
:::

The relation $PV = k_BT\ln\mathcal Z$ is the most efficient route to the equation of state of a quantum gas. As in the canonical case, the grand canonical ensemble agrees with the others for macroscopic systems, because the relative fluctuation of $N$ is of order $1/\sqrt N$. The exception, again, is a system near a phase transition, and the Bose–Einstein condensate of the next chapter is one.

::: example The classical gas, grand canonically {#ex-classical-grand}
Using $Z_N = Z_1^N/N!$ with $Z_1 = V/\lambda^3$, compute $\mathcal Z$ for a classical ideal gas, and recover the chemical potential and the equation of state. Show that the number of particles in an open volume has Poisson fluctuations.
::: solution
The series is an exponential:

$$
\mathcal Z = \sum_{N=0}^\infty\frac{(zZ_1)^N}{N!} = \exp(zZ_1) = \exp\left(\frac{e^{\beta\mu}V}{\lambda^3}\right).
$$

So $\ln\mathcal Z = e^{\beta\mu}V/\lambda^3$, and [[#eq-grand]] gives $\langle N\rangle = k_BT\,\partial\ln\mathcal Z/\partial\mu = e^{\beta\mu}V/\lambda^3$. Solving, $\mu = k_BT\ln(n\lambda^3)$, the result of [[statistical-mechanics/classical-gas]]. The equation of state is $PV = k_BT\ln\mathcal Z = k_BT\langle N\rangle$, the ideal-gas law.

The probability of exactly $N$ particles is $(zZ_1)^N/(N!\,\mathcal Z) = \langle N\rangle^Ne^{-\langle N\rangle}/N!$: a Poisson distribution. Its variance equals its mean, which also follows from the fluctuation formula: $k_BT\,\partial\langle N\rangle/\partial\mu = \langle N\rangle$. A cubic micrometre of air at room conditions holds on average $2.4\times10^7$ molecules, with a standard deviation $\sqrt{\langle N\rangle} \approx 4900$, a relative fluctuation of $2\times10^{-4}$. Density fluctuations on smaller scales scatter light; Rayleigh scattering by such fluctuations is why the sky is blue.
:::
:::

## The two distributions {#distributions}

For an ideal gas of identical particles, a microstate is a set of occupation numbers, and by [[#eq-occupation]] the Gibbs factor is a product over orbitals:

$$
e^{-\beta(E - \mu N)} = \prod_ke^{-\beta(\varepsilon_k - \mu)n_k}.
$$

Since the $n_k$ are now unconstrained, the sum over all sets $\{n_k\}$ factorises, $\mathcal Z = \prod_k\mathcal Z_k$, with one factor per orbital. Each orbital behaves as an independent system that exchanges particles with the rest of the gas, which acts as its reservoir.

::: theorem Fermi–Dirac and Bose–Einstein distributions {#thm-distributions}
In an ideal gas of identical particles at temperature $T$ and chemical potential $\mu$, the mean occupation of an orbital of energy $\varepsilon$ is

$$
\bar n_{\mathrm{FD}}(\varepsilon) = \frac{1}{e^{(\varepsilon - \mu)/k_BT} + 1}\quad\text{(fermions)}, \qquad \bar n_{\mathrm{BE}}(\varepsilon) = \frac{1}{e^{(\varepsilon - \mu)/k_BT} - 1}\quad\text{(bosons)}.
$$ {#eq-distributions}

For bosons the chemical potential must lie below the lowest orbital energy, $\mu < \varepsilon_0$. The grand potential is $\Phi = \mp k_BT\sum_k\ln\bigl(1 \pm e^{-\beta(\varepsilon_k - \mu)}\bigr)$, upper signs for fermions.
:::

::: proof
Let $x = e^{-\beta(\varepsilon - \mu)}$ for one orbital.

Fermions: $n \in \{0, 1\}$, so $\mathcal Z_k = 1 + x$ and

$$
\bar n = \frac{0\cdot1 + 1\cdot x}{1 + x} = \frac{1}{x^{-1} + 1} = \frac{1}{e^{\beta(\varepsilon - \mu)} + 1}.
$$

Bosons: $n = 0, 1, 2, \dots$, so $\mathcal Z_k = \sum_nx^n = 1/(1 - x)$, which converges only if $x < 1$, that is $\varepsilon > \mu$. This must hold for every orbital, so $\mu$ lies below the lowest one. Then

$$
\bar n = \frac{\sum_nnx^n}{\sum_nx^n} = x\deriv{}{x}\ln\frac{1}{1 - x} = \frac{x}{1 - x} = \frac{1}{e^{\beta(\varepsilon - \mu)} - 1}.
$$

The grand potential is $-k_BT\sum_k\ln\mathcal Z_k$, with $\ln\mathcal Z_k = \ln(1 + x)$ for fermions and $-\ln(1 - x)$ for bosons, as stated.
:::

The two formulae differ by one sign, and that sign is the whole difference between a metal and a superfluid. For fermions, $0 \le \bar n \le 1$, as the exclusion principle demands; $\bar n = \tfrac12$ exactly at $\varepsilon = \mu$, and at low temperature the distribution is a step: orbitals below $\mu$ full, above $\mu$ empty, with the step smeared over a few $k_BT$. For bosons, $\bar n$ can be arbitrarily large, and diverges as $\varepsilon$ approaches $\mu$ from above.

::: widget plot
f: 1/(exp(x)+1); 1/(exp(x)-1); exp(-x)
x: -3, 5
y: 0, 2.5
labels: Fermi–Dirac; Bose–Einstein; Maxwell–Boltzmann
caption: Mean occupation of an orbital against $x = (\varepsilon - \mu)/k_BT$. For $x \gtrsim 3$ the three curves are indistinguishable: occupations are small and statistics does not matter. Approach $x = 0$: the Bose–Einstein curve shoots up, the Fermi–Dirac curve passes through $\tfrac12$, and the Boltzmann curve passes through $1$. For negative $x$, allowed only for fermions, the Fermi–Dirac occupation approaches $1$, never exceeding it.
:::

::: example The Fermi step at room temperature {#ex-fermi-step}
In a metal at $300\,\mathrm{K}$ the conduction electrons obey the Fermi–Dirac distribution with $\mu$ several electronvolts above the bottom of the band. Find the occupation of orbitals $0.100\,\mathrm{eV}$ above $\mu$ and $0.100\,\mathrm{eV}$ below it, and the energy range over which the occupation falls from $0.9$ to $0.1$.
::: solution
At $300\,\mathrm{K}$, $k_BT = 0.025852\,\mathrm{eV}$, so $0.100\,\mathrm{eV}$ is $3.868\,k_BT$. Above $\mu$,

$$
\bar n = \frac{1}{e^{3.868} + 1} = \frac{1}{47.86 + 1} = 0.0205.
$$

Below $\mu$, $\bar n = 1/(e^{-3.868} + 1) = 0.9795 = 1 - 0.0205$. The distribution is symmetric about $\mu$ in the sense that $\bar n(\mu + \delta) = 1 - \bar n(\mu - \delta)$: the probability that an orbital $\delta$ above $\mu$ is occupied equals the probability that one $\delta$ below is empty.

The occupation is $0.9$ where $e^{x} + 1 = 1/0.9$, so $x = \ln(1/9) = -2.197$, and $0.1$ where $x = \ln9 = 2.197$. The width of the step is $2\ln9\,k_BT = 4.39\,k_BT = 0.114\,\mathrm{eV}$. In copper, as we will see in [[statistical-mechanics/bose-fermi]], $\mu$ is about $7\,\mathrm{eV}$, so only the electrons in the outer $1.6\%$ of the occupied range of energies are affected by temperature at all. That is why the electronic heat capacity of a metal is so small.
:::
:::

The fluctuations of the occupation follow from the fluctuation formula of [[#thm-grand-potential]] applied to one orbital, and they too carry the sign:

$$
\langle n^2\rangle - \bar n^2 = k_BT\pdv{\bar n}{\mu} = \bar n(1 \mp \bar n),
$$ {#eq-occupation-fluct}

upper sign for fermions. A completely full or completely empty fermion orbital does not fluctuate. A boson orbital with large $\bar n$ has fluctuations of order $\bar n$ itself, larger than the Poisson value $\sqrt{\bar n}$: this is the excess noise of thermal light, measured by Hanbury Brown and Twiss in 1956.

::: quiz
For which value of $(\varepsilon - \mu)/k_BT$ is the Bose–Einstein occupation exactly $1$?
- [ ] $0$
- [x] $\ln 2$
- [ ] $1$
- [ ] No value, since occupations of bosons are always large.
::: solution
Setting $1/(e^{x} - 1) = 1$ gives $e^{x} = 2$, so $x = \ln2 \approx 0.693$. At the same $x$, the Fermi–Dirac occupation is $1/3$ and the Maxwell–Boltzmann value is $\tfrac12$. Boson occupations are large only when $\varepsilon - \mu$ is small compared with $k_BT$.
:::
:::

## The classical limit {#classical-limit}

If $e^{\beta(\varepsilon - \mu)} \gg 1$ for every orbital, the $\pm1$ in [[#eq-distributions]] is negligible and both distributions become

$$
\bar n(\varepsilon) \approx e^{-\beta(\varepsilon - \mu)},
$$ {#eq-mb-occupation}

the **Maxwell–Boltzmann** occupation. Orbitals are then rarely occupied, $\bar n \ll 1$, and the question of what happens when two particles share one does not arise.

::: proposition The classical limit {#prop-classical-limit}
For an ideal gas of particles with internal degeneracy $g$ (for example $g = 2$ for spin $\tfrac12$), the condition for [[#eq-mb-occupation]] is $e^{\beta\mu} \ll 1$, equivalently $n\lambda^3/g \ll 1$. In that limit $\mu = k_BT\ln(n\lambda^3/g)$ and the grand potential reduces to that of the classical gas with $Z_N = (gZ_1)^N/N!$.
:::

::: proof
Measure energies from the lowest orbital, so $\varepsilon \ge 0$. The largest value of $e^{-\beta(\varepsilon - \mu)}$ is $e^{\beta\mu}$, so $\bar n \ll 1$ for every orbital if and only if $e^{\beta\mu} \ll 1$. In that case, for every orbital, $\ln(1 \pm x) \approx \pm x$ with $x = e^{-\beta(\varepsilon_k - \mu)}$, and the grand potential of [[#thm-distributions]] becomes

$$
\Phi \approx -k_BT\sum_ke^{-\beta(\varepsilon_k - \mu)} = -k_BT\,e^{\beta\mu}\,gZ_1,
$$

where $gZ_1 = gV/\lambda^3$ is the sum over orbitals, including the $g$ internal states. This is $-k_BT\ln\mathcal Z$ for $\mathcal Z = \exp(e^{\beta\mu}gZ_1)$, which [[#ex-classical-grand]] showed is the grand partition function of the classical gas with $Z_N = (gZ_1)^N/N!$. Then $\langle N\rangle = e^{\beta\mu}gV/\lambda^3$, so $e^{\beta\mu} = n\lambda^3/g$, and the condition $e^{\beta\mu} \ll 1$ is $n\lambda^3/g \ll 1$.
:::

This closes the argument begun in the previous chapter: the $1/N!$ is the classical limit of exact quantum counting, and $n\lambda^3$ is the parameter that measures how far from the limit a gas is. The first correction, derived in an exercise below, changes the pressure:

$$
\frac{PV}{Nk_BT} = 1 \pm \frac{n\lambda^3}{4\sqrt2\,g} + O\bigl((n\lambda^3)^2\bigr),
$$ {#eq-virial}

with the upper sign for fermions. Fermions push harder than classical particles, because the exclusion principle keeps them apart; bosons push less, because they bunch. The correction acts like an effective repulsion or attraction, although the particles do not interact.

How good is the first-order formula? The exact relation between $z$ and $n\lambda^3$, derived in the last exercise, is a pair of power series that are easy to sum numerically.

::: example The chemical potential near degeneracy {#ex-near-degeneracy}
For an ideal gas with $g = 1$, find the fugacity $z = e^{\beta\mu}$ and the ratio $PV/Nk_BT$ for bosons and for fermions at $n\lambda^3 = 0.1$ and at $n\lambda^3 = 0.5$, using the exact series

$$
n\lambda^3 = \sum_{j\ge1}(\mp1)^{j+1}\frac{z^j}{j^{3/2}}, \qquad \frac{P\lambda^3}{k_BT} = \sum_{j\ge1}(\mp1)^{j+1}\frac{z^j}{j^{5/2}},
$$

and compare with the classical values $z = n\lambda^3$ and $PV/Nk_BT = 1$.
::: solution
Solve the first series for $z$ by bisection on $0 < z < 1$, then evaluate the second. A few lines of python, summing until the terms are negligible, give:

| $n\lambda^3$ | statistics | $z$ | $\mu/k_BT = \ln z$ | $PV/Nk_BT$ | first-order [[#eq-virial]] |
|---|---|---|---|---|---|
| $0.1$ | classical | $0.1000$ | $-2.303$ | $1$ | $1$ |
| $0.1$ | Bose | $0.0965$ | $-2.338$ | $0.9823$ | $0.9823$ |
| $0.1$ | Fermi | $0.1036$ | $-2.267$ | $1.0176$ | $1.0177$ |
| $0.5$ | classical | $0.5000$ | $-0.693$ | $1$ | $1$ |
| $0.5$ | Bose | $0.4185$ | $-0.871$ | $0.9108$ | $0.9116$ |
| $0.5$ | Fermi | $0.5960$ | $-0.518$ | $1.0876$ | $1.0884$ |

At $n\lambda^3 = 0.1$ the first-order correction is exact to four figures; at $0.5$ it is still good to $0.1\%$. Bosons need a smaller fugacity than classical particles to hold the same density, because each orbital holds more of them on average; fermions need a larger one. The Bose fugacity cannot exceed $1$, and the Bose series at $z = 1$ is $\zeta(\tfrac32) = 2.612$, a maximum density. What happens beyond it is Bose–Einstein condensation, in [[statistical-mechanics/bose-fermi]].
:::
:::

::: widget plot
f: sum(x^k/k^1.5, k, 1, 200); sum((-1)^(k+1)*x^k/k^1.5, k, 1, 200); x
x: 0, 1
y: 0, 2.7
labels: Bose; Fermi; classical
caption: The density $n\lambda^3/g$ against the fugacity $z = e^{\mu/k_BT}$ for the three statistics. Near $z = 0$ the curves coincide, which is the classical limit. Follow them to the right: at a given density, the Bose curve needs the smallest $z$ and the Fermi curve the largest. The Bose curve rises steeply to $\zeta(3/2) = 2.612$ at $z = 1$ and cannot go further (the plotted series is cut off at 200 terms, so it ends a little lower). The Fermi curve continues past $z = 1$ in reality; this series form covers only $z \le 1$.
:::

::: warning A quantum correction is not an interaction
The correction [[#eq-virial]] is present in a gas of particles with no forces between them. It must not be confused with the second virial coefficient produced by real intermolecular forces, which for helium at a few kelvin is of comparable size and opposite in effect. Both contribute in a real gas. Similarly, the "exchange hole" around an electron in a metal is a statistical effect, not a Coulomb one, though both exist and both lower the energy.
:::

## Density of states {#dos}

For a macroscopic box the orbitals are so closely spaced that sums over them become integrals over energy. The weight in the integral is the number of orbitals per unit energy.

::: theorem Density of states of a free particle {#thm-dos}
For non-relativistic particles of mass $m$ and internal degeneracy $g$ in a box of volume $V$, the number of orbitals with energy between $\varepsilon$ and $\varepsilon + \dd\varepsilon$ is $D(\varepsilon)\,\dd\varepsilon$, with

$$
D(\varepsilon) = \frac{gV}{4\pi^2}\left(\frac{2m}{\hbar^2}\right)^{3/2}\varepsilon^{1/2}.
$$ {#eq-dos}

For photons, with $\varepsilon = \hbar ck$ and $g = 2$ polarisations, $D(\varepsilon) = V\varepsilon^2/(\pi^2\hbar^3c^3)$.
:::

::: proof
Use periodic boundary conditions on a cube of side $L$, which give the same bulk counting as hard walls and are simpler. The orbitals are plane waves $e^{i\mathbf k\cdot\mathbf r}$ with $\mathbf k = (2\pi/L)(n_x, n_y, n_z)$ for integers $n_i$, so each allowed $\mathbf k$ occupies a volume $(2\pi/L)^3 = (2\pi)^3/V$ of $k$-space. The number of orbitals with $\lvert\mathbf k\rvert < k$ is $g$ times the volume of the sphere divided by the volume per point:

$$
\mathcal N(k) = g\,\frac{\tfrac43\pi k^3}{(2\pi)^3/V} = \frac{gVk^3}{6\pi^2}.
$$

For a free particle, $\varepsilon = \hbar^2k^2/2m$, so $k = (2m\varepsilon)^{1/2}/\hbar$ and $\mathcal N(\varepsilon) = (gV/6\pi^2)(2m\varepsilon/\hbar^2)^{3/2}$. Differentiating with respect to $\varepsilon$ gives [[#eq-dos]].

For photons, $k = \varepsilon/\hbar c$ and $g = 2$, so $\mathcal N = V\varepsilon^3/(3\pi^2\hbar^3c^3)$, whose derivative is $V\varepsilon^2/(\pi^2\hbar^3c^3)$.
:::

With $D(\varepsilon)$, the particle number and energy of an ideal quantum gas are

$$
N = \int_0^\infty D(\varepsilon)\,\bar n(\varepsilon)\,\dd\varepsilon, \qquad U = \int_0^\infty\varepsilon\,D(\varepsilon)\,\bar n(\varepsilon)\,\dd\varepsilon.
$$ {#eq-n-u-integrals}

The first equation, at given $N$, $V$ and $T$, determines $\mu$; the second then gives $U$. Every calculation in [[statistical-mechanics/bose-fermi]] has this shape.

::: example Counting electron orbitals {#ex-count-orbitals}
How many electron orbitals, including both spin states, have kinetic energy below $1.00\,\mathrm{eV}$ in a box of volume $1.00\,\mathrm{cm^3}$?
::: solution
From the proof of [[#thm-dos]], with $g = 2$,

$$
\mathcal N(\varepsilon) = \frac{2V}{6\pi^2}\left(\frac{2m\varepsilon}{\hbar^2}\right)^{3/2} = \frac{V(2m\varepsilon)^{3/2}}{3\pi^2\hbar^3}.
$$

With $m = 9.1093837\times10^{-31}\,\mathrm{kg}$ and $\varepsilon = 1.602176634\times10^{-19}\,\mathrm{J}$, $(2m\varepsilon)^{1/2} = 5.402\times10^{-25}\,\mathrm{kg\,m/s}$, whose cube is $1.577\times10^{-73}$. With $\hbar^3 = 1.173\times10^{-102}$ and $V = 10^{-6}\,\mathrm{m^3}$,

$$
\mathcal N = \frac{10^{-6}\times1.577\times10^{-73}}{3\pi^2\times1.173\times10^{-102}} = 4.54\times10^{21}.
$$

That is many orbitals, but a cubic centimetre of copper has $8.5\times10^{22}$ conduction electrons, nineteen times more. With at most one electron per orbital, most of them must sit at energies well above $1\,\mathrm{eV}$, even at absolute zero. That is the degenerate Fermi gas, quantified in the next chapter.
:::
:::

A useful identity holds for any ideal gas with a power-law dispersion, whatever the statistics.

::: proposition Pressure and energy {#prop-pv-u}
For an ideal gas of non-relativistic particles ($\varepsilon \propto k^2$) obeying Fermi–Dirac, Bose–Einstein or Maxwell–Boltzmann statistics, $PV = \tfrac23U$. For massless particles ($\varepsilon \propto k$), such as photons, $PV = \tfrac13U$.
:::

The proof, an integration by parts of $\Phi = -PV$ written as an integral over $D(\varepsilon)$, is an exercise. For the classical gas, $PV = \tfrac23\cdot\tfrac32Nk_BT$ is the ideal-gas law. For the degenerate electron gas it gives a pressure that persists at $T = 0$; for radiation it gives the radiation pressure $u/3$.

::: remark Particles that are not conserved
Photons in a cavity and phonons in a crystal are created and destroyed freely by the walls or by anharmonic interactions, so their number is not fixed by anything. At fixed $T$ and $V$ the number then adjusts to minimise the free energy, which requires $(\partial F/\partial N)_{T,V} = \mu = 0$. Their occupation is therefore the Bose–Einstein distribution with $\mu = 0$, $\bar n = 1/(e^{\beta\varepsilon} - 1)$, which is the Planck distribution found for a single oscillator in [[statistical-mechanics/canonical]]. The two descriptions agree: an electromagnetic mode of frequency $\omega$ is a harmonic oscillator, and "$n$ photons in the mode" is its $n$th excited state.
:::

::: quiz
Which of the following ideal gases may be treated with the Bose–Einstein distribution with $\mu = 0$?
- [x] Black-body photons in a cavity at temperature $T$.
- [ ] A dilute gas of $^{87}$Rb atoms in a sealed trap.
- [x] Phonons in a crystal at temperature $T$.
- [ ] Conduction electrons in a metal.
::: solution
Photons and phonons are not conserved, so their chemical potential is zero. Rubidium atoms in a sealed trap are conserved, so $\mu$ is fixed by their number and is negative (and approaches zero only at condensation). Electrons are fermions and need the Fermi–Dirac distribution with $\mu$ near the Fermi energy.
:::
:::

::: example When does Bose statistics matter for light? {#ex-photon-occupation}
Find the mean number of photons per mode, $\bar n = 1/(e^{hc/\lambda k_BT} - 1)$, for (a) green light, $\lambda = 500\,\mathrm{nm}$, in equilibrium at the solar surface temperature $5772\,\mathrm{K}$; (b) the same wavelength at $300\,\mathrm{K}$; (c) a microwave of wavelength $10\,\mathrm{cm}$ at $300\,\mathrm{K}$.
::: solution
The combination $hc/k_B = 1.4388\times10^{-2}\,\mathrm{m\,K}$ gives $x = hc/\lambda k_BT$ directly.

(a) $x = 1.4388\times10^{-2}/(5.00\times10^{-7}\times5772) = 4.985$, and $\bar n = 1/(e^{4.985} - 1) = 6.9\times10^{-3}$. Even sunlight at its source has fewer than one photon per hundred modes in the visible: the occupation is small, and Boltzmann statistics would give nearly the same answer.

(b) $x = 95.9$ and $\bar n = e^{-95.9} \approx 2\times10^{-42}$. Room-temperature objects do not glow visibly.

(c) $x = 1.4388\times10^{-2}/(0.100\times300) = 4.80\times10^{-4}$, and $\bar n \approx 1/x = 2085$. Here every mode holds thousands of photons, the classical Rayleigh–Jeans limit applies, and the field behaves like a classical wave with thermal noise $k_BT$ per mode, which is the Johnson–Nyquist noise of radio engineering.

The same photon gas is "classical particles" at short wavelength and "classical waves" at long wavelength. Bose–Einstein statistics interpolates between them, and its $-1$ is what makes the crossover at $hc/\lambda \sim k_BT$.
:::
:::

::: remark Composite particles
Whether an atom is a boson or a fermion depends on the total number of fermions it contains, since exchanging two atoms exchanges all their constituents at once. An atom with an even number of protons, neutrons and electrons in total is a boson; an odd number makes it a fermion. Thus $^4$He (2 + 2 + 2 = 6) and $^{87}$Rb (37 + 50 + 37 = 124) are bosons, while $^3$He (2 + 1 + 2 = 5) and $^6$Li (3 + 3 + 3 = 9) are fermions. The rule holds as long as the internal structure is not resolved, that is, when the atoms do not approach closer than their own size, which is the situation in a dilute gas.
:::

::: application Langmuir adsorption
A surface with $M$ independent binding sites, each holding at most one molecule with binding energy $\varepsilon_b$, in contact with a gas at chemical potential $\mu$, is a set of Fermi–Dirac "orbitals" of energy $-\varepsilon_b$, whether the molecules are fermions or not: the exclusion is geometric. The fraction of occupied sites is $\theta = 1/(e^{-\beta(\varepsilon_b + \mu)} + 1)$. With $e^{\beta\mu} = n\lambda^3 \propto P$ for the gas, this becomes $\theta = KP/(1 + KP)$, the Langmuir isotherm of surface chemistry, with $K$ computable from molecular data. The Chemistry Atlas develops quantum statistics from the chemist's side, including the ortho and para forms of hydrogen, in [Quantum statistics](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=quantum-statistics).
:::

::: history Bose, Einstein, Fermi and Dirac
In 1924 Satyendra Nath Bose, at Dacca, sent Einstein a derivation of Planck's radiation law that counted the photons in phase-space cells as indistinguishable, without using classical electrodynamics. Einstein translated it into German and had it published in the *Zeitschrift für Physik* (1924), then applied the same counting to a gas of atoms in papers of 1924 and 1925, in the second of which he predicted condensation. Wolfgang Pauli stated the exclusion principle for electrons in atoms in 1925. Enrico Fermi, early in 1926, applied it to an ideal gas and obtained the distribution with the $+1$; Paul Dirac, later in 1926 and independently, related both statistics to symmetric and antisymmetric wavefunctions, as Heisenberg had in the same year. Dirac named the two kinds of particle bosons and fermions in 1945. The spin–statistics connection was proved for free fields by Markus Fierz in 1939 and by Pauli in 1940.
:::

## Where this leads {#leads}

Everything is now in place to compute. [[statistical-mechanics/bose-fermi]] evaluates the integrals [[#eq-n-u-integrals]] in four regimes: photons with $\mu = 0$, which gives Planck's law and the Stefan–Boltzmann constant; phonons, which give the Debye heat capacity; the degenerate electron gas, with metals and white dwarfs as examples; and the ideal Bose gas, which condenses. In [[condensed-matter/free-electrons]] the Fermi–Dirac distribution is the starting point for transport, and in [[condensed-matter/semiconductors]] it gives the carrier densities. The grand canonical ensemble also returns in [[statistical-mechanics/phase-transitions]], where a lattice gas of particles on sites turns out to be the Ising model in disguise.

::: summary
- Identical particles are bosons (symmetric states, integer spin) or fermions (antisymmetric, half-integer spin). A state of an ideal gas is a set of occupation numbers $n_k$, with $n_k \in \{0, 1\}$ for fermions.
- The grand canonical ensemble weights microstates by $e^{-\beta(E - \mu N)}$; $\Phi = -k_BT\ln\mathcal Z = -PV$ and $\langle N\rangle = -\partial\Phi/\partial\mu$.
- For an ideal gas $\mathcal Z$ factorises over orbitals, giving $\bar n = 1/(e^{\beta(\varepsilon - \mu)} + 1)$ for fermions and $1/(e^{\beta(\varepsilon - \mu)} - 1)$ for bosons, with $\mu$ below the lowest orbital for bosons.
- Both reduce to the Maxwell–Boltzmann occupation $e^{-\beta(\varepsilon - \mu)}$ when $e^{\beta\mu} \ll 1$, that is $n\lambda^3/g \ll 1$, and then $Z_N = (gZ_1)^N/N!$ is recovered.
- The first quantum correction to the pressure is $\pm n\lambda^3/(4\sqrt2g)$, raising it for fermions and lowering it for bosons, with no forces involved.
- The density of states of free particles is $D(\varepsilon) = (gV/4\pi^2)(2m/\hbar^2)^{3/2}\varepsilon^{1/2}$; $N$ and $U$ are integrals of $D\bar n$ and $\varepsilon D\bar n$.
- For any ideal non-relativistic gas $PV = \tfrac23U$; for photons $PV = \tfrac13U$.
:::

## Exercises {#exercises}

::: exercise Two bosons, four orbitals {level=1 check="10"}
Two identical bosons are placed in four orbitals. How many distinct two-particle states are there? How many if the particles are fermions?
::: solution
For bosons, count occupation numbers $(n_1, \dots, n_4)$ with sum $2$: by stars and bars, $\binom{2 + 4 - 1}{2} = \binom52 = 10$. These are the $4$ doubly occupied states and the $\binom42 = 6$ states with two different orbitals singly occupied. For fermions, only the $6$ singly occupied pairs are allowed.
:::
:::

::: exercise An occupation above the Fermi level {level=1 check="0.0205"}
Find the Fermi–Dirac occupation of an orbital $0.100\,\mathrm{eV}$ above the chemical potential at $300\,\mathrm{K}$, to three significant figures.
::: solution
As in [[#ex-fermi-step]], $(\varepsilon - \mu)/k_BT = 0.100/0.025852 = 3.868$, and

$$
\bar n = \frac{1}{e^{3.868} + 1} = 0.0205.
$$

The Maxwell–Boltzmann value $e^{-3.868} = 0.0209$ is only $2\%$ higher: at this distance from $\mu$, statistics hardly matters.
:::
:::

::: exercise A crowded boson orbital {level=1 check="1/(exp(0.1)-1)"}
Find the Bose–Einstein occupation of an orbital with $\varepsilon - \mu = 0.1\,k_BT$, and its standard deviation.
::: solution
By [[#eq-distributions]],

$$
\bar n = \frac{1}{e^{0.1} - 1} = 9.51.
$$

By [[#eq-occupation-fluct]], the variance is $\bar n(1 + \bar n) = 9.51\times10.51 = 99.9$, so the standard deviation is $10.0$, larger than the mean. A Poisson variable with the same mean would have standard deviation $3.08$.
:::
:::

::: exercise Helium vapour near its boiling point {level=2 check="0.976"}
Treat helium-4 gas ($g = 1$, $m = 4.002602\,\mathrm{u}$) at $4.20\,\mathrm{K}$ and $101325\,\mathrm{Pa}$ as an ideal Bose gas. Find $n\lambda^3$ and the ratio $PV/Nk_BT$ predicted by [[#eq-virial]], to three significant figures.
::: solution
The number density is $n = P/k_BT = 101325/(1.380649\times10^{-23}\times4.20) = 1.747\times10^{27}\,\mathrm{m^{-3}}$ (using the ideal-gas law for $n$ is consistent at this order). The thermal wavelength is $\lambda = h/\sqrt{2\pi mk_BT} = 4.258\times10^{-10}\,\mathrm{m}$, so $\lambda^3 = 7.720\times10^{-29}\,\mathrm{m^3}$ and $n\lambda^3 = 0.135$. With the lower sign for bosons,

$$
\frac{PV}{Nk_BT} = 1 - \frac{0.135}{4\sqrt2} = 1 - 0.0238 = 0.976.
$$

The quantum correction is a $2.4\%$ reduction. Real helium vapour at its boiling point deviates from ideality by more than this, because the attractive van der Waals interaction contributes a comparable correction of the same sign.
:::
:::

::: exercise Number fluctuations in a small volume {level=2 check="2.02e-4"}
Air at $300\,\mathrm{K}$ and $101325\,\mathrm{Pa}$ is treated as a classical ideal gas. Find the relative standard deviation of the number of molecules in an open cube of side $1.00\,\mu\mathrm{m}$, to three significant figures.
::: solution
The mean number is $\langle N\rangle = PV/k_BT = 101325\times10^{-18}/(4.1419\times10^{-21}) = 2.446\times10^{7}$. By [[#ex-classical-grand]] the distribution is Poisson, so the standard deviation is $\sqrt{\langle N\rangle}$ and the relative fluctuation is

$$
\frac{1}{\sqrt{\langle N\rangle}} = \frac{1}{\sqrt{2.446\times10^7}} = 2.02\times10^{-4}.
$$
:::
:::

::: exercise Orbitals in a cube {level=2 check="4.54e21"}
Using the density of states of [[#thm-dos]], verify the count of [[#ex-count-orbitals]] by integrating $D(\varepsilon)$ from $0$ to $1.00\,\mathrm{eV}$ for electrons in $1.00\,\mathrm{cm^3}$, and give the number to three significant figures.
::: solution
With $g = 2$,

$$
\int_0^{\varepsilon_1}D(\varepsilon)\,\dd\varepsilon = \frac{2V}{4\pi^2}\left(\frac{2m}{\hbar^2}\right)^{3/2}\cdot\frac23\varepsilon_1^{3/2} = \frac{V}{3\pi^2}\left(\frac{2m\varepsilon_1}{\hbar^2}\right)^{3/2},
$$

which is the formula used in the example. Numerically, $2m\varepsilon_1/\hbar^2 = 2.624\times10^{19}\,\mathrm{m^{-2}}$, whose $3/2$ power is $1.344\times10^{29}\,\mathrm{m^{-3}}$, and dividing by $3\pi^2 = 29.61$ and multiplying by $V = 10^{-6}\,\mathrm{m^3}$ gives $4.54\times10^{21}$.
:::
:::

::: exercise Pressure and energy of an ideal gas {level=3}
Prove [[#prop-pv-u]]. Show that if $D(\varepsilon) = CV\varepsilon^{\alpha}$ for some $C$ and $\alpha > -1$, then for Fermi–Dirac, Bose–Einstein and Maxwell–Boltzmann statistics alike, $PV = U/(\alpha + 1)$. Deduce the two cases in the proposition.
::: hint
Write $PV = -\Phi = \pm k_BT\int_0^\infty D(\varepsilon)\ln(1 \pm e^{-\beta(\varepsilon - \mu)})\,\dd\varepsilon$ and integrate by parts, integrating $\varepsilon^\alpha$ and differentiating the logarithm.
:::
::: solution
By [[#thm-distributions]] and [[#thm-grand-potential]], with the upper sign for fermions,

$$
PV = -\Phi = \pm k_BT\int_0^\infty CV\varepsilon^\alpha\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr)\,\dd\varepsilon.
$$

Integrate by parts with $\dd(\varepsilon^{\alpha+1}/(\alpha+1))$:

$$
PV = \pm k_BT\,CV\left[\frac{\varepsilon^{\alpha+1}}{\alpha+1}\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr)\right]_0^\infty \mp k_BT\,CV\int_0^\infty\frac{\varepsilon^{\alpha+1}}{\alpha+1}\deriv{}{\varepsilon}\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr)\,\dd\varepsilon.
$$

The boundary term vanishes: at $\varepsilon = 0$ because $\alpha + 1 > 0$, and as $\varepsilon \to \infty$ because the logarithm decays like $e^{-\beta\varepsilon}$. (For bosons we need $\mu < 0$ so that the logarithm is finite at $\varepsilon = 0$.) The derivative is

$$
\deriv{}{\varepsilon}\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr) = \frac{\mp\beta e^{-\beta(\varepsilon - \mu)}}{1 \pm e^{-\beta(\varepsilon - \mu)}} = \frac{\mp\beta}{e^{\beta(\varepsilon - \mu)} \pm 1} = \mp\beta\,\bar n(\varepsilon).
$$

Substituting, the signs combine to $+$ and $k_BT\beta = 1$:

$$
PV = \frac{1}{\alpha + 1}\int_0^\infty\varepsilon\,CV\varepsilon^\alpha\,\bar n(\varepsilon)\,\dd\varepsilon = \frac{U}{\alpha + 1}.
$$

For Maxwell–Boltzmann statistics, $\ln(1 \pm x) \to \pm x$ and the same steps apply with $\bar n = e^{-\beta(\varepsilon - \mu)}$. Non-relativistic particles have $D \propto \varepsilon^{1/2}$, so $\alpha = \tfrac12$ and $PV = \tfrac23U$. Photons have $D \propto \varepsilon^2$, so $\alpha = 2$ and $PV = \tfrac13U$.
:::
:::

::: exercise The first quantum correction {level=3}
For an ideal gas of particles with degeneracy $g$ and $D(\varepsilon)$ as in [[#eq-dos]], show that

$$
\frac{N\lambda^3}{gV} = \sum_{j=1}^\infty(\mp1)^{j+1}\frac{z^j}{j^{3/2}}, \qquad \frac{P\lambda^3}{gk_BT} = \sum_{j=1}^\infty(\mp1)^{j+1}\frac{z^j}{j^{5/2}},
$$

with $z = e^{\beta\mu} < 1$ and the upper sign for fermions. Eliminate $z$ to first order and derive [[#eq-virial]].
::: hint
Expand $\bar n = ze^{-\beta\varepsilon}/(1 \pm ze^{-\beta\varepsilon})$ as a geometric series in $ze^{-\beta\varepsilon}$, and use $\int_0^\infty\varepsilon^{1/2}e^{-j\beta\varepsilon}\,\dd\varepsilon = \Gamma(\tfrac32)(j\beta)^{-3/2}$ with $\Gamma(\tfrac32) = \sqrt\pi/2$. For the pressure, use $PV = \tfrac23U$.
:::
::: solution
Write $y = ze^{-\beta\varepsilon} < 1$. Then $\bar n = y/(1 \pm y) = \sum_{j\ge1}(\mp1)^{j+1}y^j$. With $D(\varepsilon) = A\varepsilon^{1/2}$, $A = (gV/4\pi^2)(2m/\hbar^2)^{3/2}$,

$$
N = A\sum_j(\mp1)^{j+1}z^j\int_0^\infty\varepsilon^{1/2}e^{-j\beta\varepsilon}\,\dd\varepsilon = A\,\frac{\sqrt\pi}{2}(k_BT)^{3/2}\sum_j(\mp1)^{j+1}\frac{z^j}{j^{3/2}}.
$$

Now $A(\sqrt\pi/2)(k_BT)^{3/2} = (gV/4\pi^2)(2mk_BT/\hbar^2)^{3/2}(\sqrt\pi/2)$. Using $\hbar = h/2\pi$, $(2mk_BT/\hbar^2)^{3/2} = (2\pi)^3(2mk_BT)^{3/2}/h^3$, and the prefactor becomes $gV(2\pi)^3\sqrt\pi(2mk_BT)^{3/2}/(8\pi^2h^3) = gV(2\pi mk_BT)^{3/2}/h^3 = gV/\lambda^3$. That is the first series.

For the energy, the same steps with $\varepsilon^{3/2}$ and $\Gamma(\tfrac52) = \tfrac32\Gamma(\tfrac32)$ give $U = \tfrac32k_BT(gV/\lambda^3)\sum(\mp1)^{j+1}z^j/j^{5/2}$, and $PV = \tfrac23U$ gives the second series.

To first order, with $y_0 = N\lambda^3/(gV) = n\lambda^3/g$,

$$
y_0 = z \mp \frac{z^2}{2^{3/2}}, \qquad\text{so}\qquad z = y_0 \pm \frac{y_0^2}{2^{3/2}} + O(y_0^3).
$$

Then

$$
\frac{PV}{Nk_BT} = \frac{z \mp z^2/2^{5/2}}{z \mp z^2/2^{3/2}} = 1 \mp z\left(\frac{1}{2^{5/2}} - \frac{1}{2^{3/2}}\right) + O(z^2) = 1 \pm \frac{z}{2^{5/2}} + O(z^2),
$$

since $2^{-5/2} - 2^{-3/2} = -2^{-5/2}$. Replacing $z$ by $y_0$ at this order, and $2^{5/2} = 4\sqrt2$,

$$
\frac{PV}{Nk_BT} = 1 \pm \frac{n\lambda^3}{4\sqrt2\,g} + O\bigl((n\lambda^3)^2\bigr),
$$

with the upper sign, an increase, for fermions. That is [[#eq-virial]].
:::
:::
