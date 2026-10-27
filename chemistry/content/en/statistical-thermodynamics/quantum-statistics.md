Copper contains about one free electron per atom, and those electrons move through the metal as freely as the atoms of a gas move through a flask. A classical electron gas would therefore add $\tfrac{3}{2}R$ to the molar heat capacity of copper — half as much again as the lattice vibrations. Measurement shows nothing of the kind: at room temperature the electronic contribution is less than $1\,\%$ of $\tfrac{3}{2}R$. And at low temperatures the heat capacity of every crystalline solid falls far below the classical $3R$ of Dulong and Petit, vanishing as $T^{3}$. Both anomalies have the same root. When the number of particles becomes comparable with the number of thermally accessible states, the Boltzmann counting of the earlier lessons — which assumes that two particles never compete for one state — breaks down, and what replaces it depends on whether the particles are fermions, which refuse to share a state, or bosons, which crowd into one.

This lesson develops the two quantum statistics. We derive the Fermi–Dirac and Bose–Einstein distributions from the grand canonical ensemble, show how both reduce to the Boltzmann distribution in the classical limit identified in [[statistical-thermodynamics/canonical-ensemble]], and apply them to the electrons in a metal (the Fermi energy and the electronic heat capacity), to photons (Planck's radiation law) and to the atoms of liquid helium (Bose–Einstein condensation). Finally we treat the vibrations of a crystal — quanta that are themselves bosons — with the Einstein and Debye models, which explain the low-temperature heat capacity of solids and underpin the third-law entropies of [[thermodynamics/second-law]].

## Bosons, fermions and occupation numbers

Quantum mechanics divides identical particles into two classes according to the symmetry of the many-particle wavefunction under exchange of any two of them ([[quantum-chemistry/many-electron-atoms]]).

::: definition Bosons, fermions and occupation numbers {#def-bose-fermi}
Particles whose wavefunction is *symmetric* under exchange are **bosons**; they have integer spin (photons, phonons, $^{4}\mathrm{He}$ atoms, $\mathrm{H_2}$ and $\mathrm{D_2}$ molecules). Particles whose wavefunction is *antisymmetric* under exchange are **fermions**; they have half-integer spin (electrons, protons, neutrons, $^{3}\mathrm{He}$ atoms). For independent particles with single-particle states $i$ of energy $\varepsilon_i$, a state of the whole system is specified completely by the **occupation numbers** $n_i$, the number of particles in each single-particle state. For bosons $n_i = 0, 1, 2, \ldots$; for fermions the Pauli exclusion principle restricts $n_i$ to $0$ or $1$.
:::

The difficulty in the canonical ensemble is the constraint $\sum_in_i = N$, which couples all the occupation numbers. The grand canonical ensemble removes it: when the system can exchange particles with a reservoir at chemical potential $\mu$, the number of particles fluctuates, and each single-particle state can be treated independently.

::: proposition The Fermi–Dirac and Bose–Einstein distributions {#prop-fd-be}
For independent fermions or bosons in equilibrium at temperature $T$ and chemical potential $\mu$, the mean occupation of a single-particle state of energy $\varepsilon$ is
$$
\langle n\rangle_\mathrm{FD} = \frac{1}{e^{(\varepsilon - \mu)/k_\mathrm{B}T} + 1}\quad(\text{fermions}),
\qquad
\langle n\rangle_\mathrm{BE} = \frac{1}{e^{(\varepsilon - \mu)/k_\mathrm{B}T} - 1}\quad(\text{bosons}).
$$ {#eq-fd-be}
The chemical potential is fixed by the mean number of particles, $N = \sum_i\langle n_i\rangle$. For bosons $\mu$ must lie below the lowest single-particle energy, so that every $\langle n\rangle$ is positive.
:::

::: proof
In the grand canonical ensemble the probability of a system state with energy $E$ and particle number $N$ is proportional to $e^{-\beta(E - \mu N)}$ (the derivation parallels that of [[statistical-thermodynamics/canonical-ensemble#prop-canonical]], with a second Lagrange multiplier, $-\beta\mu$, for the particle-number constraint on the ensemble). For independent particles $E - \mu N = \sum_in_i(\varepsilon_i - \mu)$, so the weight factorises into independent factors, one per single-particle state. For one state of energy $\varepsilon$, write $x = e^{-\beta(\varepsilon - \mu)}$. Its grand partition function is $\xi = \sum_n x^{n}$, summed over the allowed occupations:
$$
\xi_\mathrm{FD} = 1 + x, \qquad \xi_\mathrm{BE} = 1 + x + x^{2} + \cdots = \frac{1}{1 - x}\quad(x < 1).
$$
The mean occupation is $\langle n\rangle = \sum_n nx^{n}/\xi = x\,\mathrm{d}\ln\xi/\mathrm{d}x$. For fermions, $\langle n\rangle = x/(1 + x) = 1/(x^{-1} + 1)$; for bosons, $\langle n\rangle = x/(1 - x) = 1/(x^{-1} - 1)$. Substituting $x^{-1} = e^{\beta(\varepsilon - \mu)}$ gives [[#eq-fd-be]]. Convergence of the Bose sum requires $x < 1$, i.e. $\varepsilon > \mu$ for every state.
:::

The two distributions differ only in the sign of the 1, but the sign matters enormously when $\varepsilon - \mu$ is small. If $e^{\beta(\varepsilon - \mu)} \gg 1$ for every state, both reduce to
$$
\langle n\rangle \approx e^{-\beta(\varepsilon - \mu)} ,
$$
which is the Boltzmann distribution with $e^{\beta\mu} = N/q$. This is the **classical limit**: every state is sparsely occupied ($\langle n\rangle \ll 1$), so whether a second particle *could* join it never arises. For a perfect gas, $q = V/\Lambda^{3}$ (times internal factors) and $\mu = k_\mathrm{B}T\ln(N\Lambda^{3}/V)$; the classical condition $\langle n\rangle \ll 1$ is the condition $N\Lambda^{3}/V \ll 1$ of [[statistical-thermodynamics/canonical-ensemble#eq-classical]]. For argon at room temperature and $1\ \mathrm{bar}$, $\mu/k_\mathrm{B}T = \ln(1.0\times10^{-7}) = -16.1$, a large negative chemical potential, and the quantum corrections are of order $10^{-7}$.

::: widget plot
f: 1/(exp(x) + 1); 1/(exp(x) - 1); exp(-x)
x: -3, 5
y: 0, 2.5
labels: \text{Fermi–Dirac}; \text{Bose–Einstein}; \text{Boltzmann}
caption: Mean occupation $\langle n\rangle$ of a single-particle state against $x = (\varepsilon - \mu)/k_\mathrm{B}T$ for the three statistics. For $x \gtrsim 3$ all three coincide: states are sparsely occupied and the classical (Boltzmann) description is exact enough. As $x$ falls, the Fermi–Dirac occupation saturates at 1 (the exclusion principle), the Boltzmann occupation grows without limit, and the Bose–Einstein occupation diverges as $x \to 0^{+}$ — bosons pile into states just above the chemical potential. (The Bose–Einstein curve has no meaning for $x \le 0$.)
:::

::: warning Quantum statistics is not the same as quantised energy levels {#warn-quantum-stats}
Every lesson of this course has used quantised levels — rotational, vibrational, translational — but only this one uses quantum *statistics*. They are independent ideas. Boltzmann statistics with quantised levels gives the vibrational heat capacities of [[statistical-thermodynamics/thermodynamic-functions]] perfectly; quantum statistics becomes necessary only when particles compete for states, i.e. when $N\Lambda^{3}/V$ is not small. Electrons in metals, liquid helium and ultracold atomic gases are the chemically relevant cases; ordinary gases and liquids are not, however light their molecules. Conversely, do not apply Fermi–Dirac statistics to the *electrons within one molecule*: the Pauli principle there is handled by the antisymmetric wavefunction of [[quantum-chemistry/many-electron-atoms]], not by a thermal distribution.
:::

## Electrons in metals

The valence electrons of a simple metal such as sodium or copper behave, to a first approximation, as a gas of free fermions in a box the size of the crystal, the **free-electron model**. Their number density is huge — $2.65\times10^{28}\ \mathrm{m^{-3}}$ in sodium, one per atom — and their mass tiny, so $N\Lambda^{3}/V \approx 2\times10^{3}$ at room temperature. The gas is deep in the quantum regime.

::: example Degenerate and non-degenerate electron gases {#ex-degeneracy}
Compare $N\Lambda^{3}/V$ at $300\ \mathrm{K}$ for the conduction electrons of sodium ($2.65\times10^{28}\ \mathrm{m^{-3}}$) and for the conduction electrons of a moderately doped n-type silicon crystal ($1.0\times10^{22}\ \mathrm{m^{-3}}$), and say which statistics each requires.
::: solution
For an electron at $300\ \mathrm{K}$,
$$
\Lambda_\mathrm{e} = \frac{h}{(2\pi m_\mathrm{e}k_\mathrm{B}T)^{1/2}} = \frac{6.626\times10^{-34}}{(2\pi\times9.109\times10^{-31}\times1.3807\times10^{-23}\times300)^{1/2}}\ \mathrm{m} = 4.30\times10^{-9}\ \mathrm{m},
$$
some 270 times the thermal wavelength of an argon atom, because the electron is $73\,000$ times lighter. Then $\Lambda_\mathrm{e}^{3} = 7.96\times10^{-26}\ \mathrm{m^{3}}$ and
$$
\text{Na: } N\Lambda^{3}/V = 2.65\times10^{28}\times7.96\times10^{-26} = 2.1\times10^{3}, \qquad
\text{Si: } N\Lambda^{3}/V = 1.0\times10^{22}\times7.96\times10^{-26} = 8.0\times10^{-4}.
$$
The metal's electrons are a **degenerate** Fermi gas, thousands of times too dense for Boltzmann statistics: Fermi–Dirac is essential. The semiconductor's conduction electrons, a million times more dilute, are a **non-degenerate** gas: Boltzmann statistics is accurate, which is why the carrier concentrations of semiconductor physics take the simple form $n \propto e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}$ ([[materials-chemistry/electronic-structure-solids]]). Only in very heavily doped ("degenerate") semiconductors, above about $10^{25}\ \mathrm{m^{-3}}$, does the Fermi–Dirac form become necessary.
:::
:::

At $T = 0$ the Fermi–Dirac distribution is a step: $\langle n\rangle = 1$ for $\varepsilon < \mu$ and $0$ for $\varepsilon > \mu$. The electrons fill the lowest states, two per translational state (spin up and spin down), up to an energy called the **Fermi energy** $E_\mathrm{F} = \mu(T = 0)$.

::: proposition The Fermi energy of a free-electron gas {#prop-fermi}
For $N$ free electrons of mass $m_\mathrm{e}$ in volume $V$, the density of single-particle states (including both spin orientations) is
$$
g(\varepsilon) = 4\pi V\left(\frac{2m_\mathrm{e}}{h^{2}}\right)^{3/2}\varepsilon^{1/2},
$$ {#eq-dos}
and the Fermi energy is
$$
E_\mathrm{F} = \frac{h^{2}}{8m_\mathrm{e}}\left(\frac{3N}{\pi V}\right)^{2/3} .
$$ {#eq-fermi}
The mean energy per electron at $T = 0$ is $\tfrac{3}{5}E_\mathrm{F}$, and the **Fermi temperature** is $T_\mathrm{F} = E_\mathrm{F}/k_\mathrm{B}$.
:::

::: proof
The translational states of a particle in a cube of side $L$ have energies $\varepsilon = (h^{2}/8m_\mathrm{e}L^{2})(n_x^{2} + n_y^{2} + n_z^{2})$ with positive integers $n_x, n_y, n_z$. The number of states with energy below $\varepsilon$ is the number of lattice points in the positive octant of a sphere of radius $R = (8m_\mathrm{e}L^{2}\varepsilon/h^{2})^{1/2}$, which for large $R$ is $\tfrac{1}{8}\cdot\tfrac{4}{3}\pi R^{3}$. Doubling for spin,
$$
\mathcal{N}(\varepsilon) = 2\times\frac{\pi}{6}\left(\frac{8m_\mathrm{e}L^{2}\varepsilon}{h^{2}}\right)^{3/2} = \frac{\pi V}{3}\left(\frac{8m_\mathrm{e}\varepsilon}{h^{2}}\right)^{3/2} .
$$
Its derivative, $g = \mathrm{d}\mathcal{N}/\mathrm{d}\varepsilon = \tfrac{\pi V}{2}(8m_\mathrm{e}/h^{2})^{3/2}\varepsilon^{1/2} = 4\pi V(2m_\mathrm{e}/h^{2})^{3/2}\varepsilon^{1/2}$, is [[#eq-dos]]. At $T = 0$ all states up to $E_\mathrm{F}$ are filled, so $\mathcal{N}(E_\mathrm{F}) = N$, which rearranges to [[#eq-fermi]]. The mean energy is $\int_0^{E_\mathrm{F}}\varepsilon g\,\mathrm{d}\varepsilon/\int_0^{E_\mathrm{F}}g\,\mathrm{d}\varepsilon = (\tfrac{2}{5}E_\mathrm{F}^{5/2})/(\tfrac{2}{3}E_\mathrm{F}^{3/2}) = \tfrac{3}{5}E_\mathrm{F}$.
:::

::: example The Fermi energy of sodium and copper {#ex-fermi}
Calculate $E_\mathrm{F}$ and $T_\mathrm{F}$ for sodium ($2.65\times10^{28}$ conduction electrons per cubic metre) and copper ($8.47\times10^{28}\ \mathrm{m^{-3}}$), and the speed of an electron at the Fermi energy in copper.
::: solution
For sodium, $3N/\pi V = 3\times2.65\times10^{28}/\pi = 2.531\times10^{28}\ \mathrm{m^{-3}}$, whose $\tfrac{2}{3}$ power is $8.62\times10^{18}\ \mathrm{m^{-2}}$. With $h^{2}/8m_\mathrm{e} = (6.626\times10^{-34})^{2}/(8\times9.109\times10^{-31}) = 6.025\times10^{-38}\ \mathrm{J\,m^{2}}$,
$$
E_\mathrm{F}(\mathrm{Na}) = 6.025\times10^{-38}\times8.62\times10^{18}\ \mathrm{J} = 5.19\times10^{-19}\ \mathrm{J} = 3.24\ \mathrm{eV}, \qquad T_\mathrm{F} = 3.76\times10^{4}\ \mathrm{K}.
$$
For copper, the density is $3.20$ times larger, so $E_\mathrm{F}$ is $3.20^{2/3} = 2.17$ times larger: $E_\mathrm{F}(\mathrm{Cu}) = 7.03\ \mathrm{eV}$, $T_\mathrm{F} = 8.16\times10^{4}\ \mathrm{K}$. The Fermi speed is $v_\mathrm{F} = (2E_\mathrm{F}/m_\mathrm{e})^{1/2} = 1.57\times10^{6}\ \mathrm{m\,s^{-1}}$, about $0.5\,\%$ of the speed of light. Even at absolute zero the conduction electrons of copper move faster than any molecule in a gas at $10^{6}\ \mathrm{K}$: the exclusion principle, not temperature, sets their energy. Room temperature is less than $0.4\,\%$ of $T_\mathrm{F}$, so the electron gas in a metal is, thermally speaking, permanently "cold".
:::
:::

### The electronic heat capacity

At a temperature $T \ll T_\mathrm{F}$ the Fermi–Dirac step is softened over a width of a few $k_\mathrm{B}T$ around $E_\mathrm{F}$. Only electrons within about $k_\mathrm{B}T$ of the Fermi level can be thermally excited, because those deeper down have no empty states within reach. The fraction of excitable electrons is roughly $T/T_\mathrm{F}$, each gaining roughly $k_\mathrm{B}T$, so the thermal energy is of order $Nk_\mathrm{B}T^{2}/T_\mathrm{F}$ and the heat capacity of order $Nk_\mathrm{B}T/T_\mathrm{F}$. The exact low-temperature result (the Sommerfeld expansion) is
$$
C_{V,\mathrm{m}}^\mathrm{el} = \frac{\pi^{2}}{2}R\,\frac{T}{T_\mathrm{F}} = \gamma T ,
$$ {#eq-cel}
per mole of electrons. For copper at $300\ \mathrm{K}$ this is $(\pi^{2}/2)\times8.3145\times300/81\,600 = 0.15\ \mathrm{J\,K^{-1}\,mol^{-1}}$, one per cent of the classical $\tfrac{3}{2}R$ — the resolution of the puzzle at the start of the lesson.

::: widget plot
f: 1/(exp((x - 1)/t) + 1); if(x < 1, 1, 0)
x: 0, 2
y: 0, 1.1
sliders: t=0.05:0.005:0.5:0.005
labels: T > 0; T = 0
caption: The Fermi–Dirac occupation of electron states against $\varepsilon/E_\mathrm{F}$, for reduced temperature $t = T/T_\mathrm{F}$ (slider), taking $\mu \approx E_\mathrm{F}$ (accurate to order $t^{2}$). At $t = 0.005$ — copper at about $400\ \mathrm{K}$ — the step is blurred only over a sliver of width $\sim k_\mathrm{B}T$ around $E_\mathrm{F}$; only those electrons respond to heating, which is why the electronic heat capacity of a metal is so small. Even at $t = 0.05$, a temperature at which the metal would long since have boiled, the distribution is still recognisably a step.
:::

## Bosons: photons and Bose–Einstein condensation

Photons are bosons whose number is not conserved — a cavity wall absorbs and emits them freely — so their chemical potential is zero. With $\mu = 0$, the Bose–Einstein distribution gives the mean number of photons in a mode of frequency $\nu$ as $1/(e^{h\nu/k_\mathrm{B}T} - 1)$, and multiplying by the density of photon modes ($8\pi\nu^{2}/c^{3}$ per unit volume and frequency, two polarisations) and by $h\nu$ gives **Planck's radiation law**:
$$
\rho(\nu)\,\mathrm{d}\nu = \frac{8\pi h\nu^{3}}{c^{3}}\,\frac{\mathrm{d}\nu}{e^{h\nu/k_\mathrm{B}T} - 1} .
$$
This is the law whose derivation in 1900 began quantum theory ([[quantum-chemistry/quantum-foundations]]). Expressed per unit wavelength, its maximum obeys Wien's displacement law, $\lambda_\text{max}T = hc/4.965k_\mathrm{B} = 2.898\ \mathrm{mm\,K}$: the Sun's photosphere at $5772\ \mathrm{K}$ peaks near $502\ \mathrm{nm}$, the Earth at $288\ \mathrm{K}$ near $10\ \mu\mathrm{m}$ in the infrared — the region where $\mathrm{CO_2}$ and $\mathrm{H_2O}$ absorb ([[environmental-chemistry/greenhouse-gases]]).

Integrating Planck's law over all frequencies gives the total energy density of the photon gas, $u = aT^{4}$ with $a = 8\pi^{5}k_\mathrm{B}^{4}/15h^{3}c^{3}$, and the power radiated per unit area of a black surface, $\sigma T^{4}$, with the **Stefan–Boltzmann constant** $\sigma = ac/4 = 2\pi^{5}k_\mathrm{B}^{4}/15h^{3}c^{2} = 5.670\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$ — a constant built entirely from $k_\mathrm{B}$, $h$ and $c$, which was measured long before any of them was known separately.

::: example The photon gas at room temperature {#ex-photons}
Calculate the energy density and the number density of black-body photons at $300\ \mathrm{K}$, using $u = aT^{4}$ and $n = 16\pi\zeta(3)(k_\mathrm{B}T/hc)^{3}$ with $\zeta(3) = 1.202$. Compare the number density with that of air molecules at $1\ \mathrm{bar}$, and find the mean photon energy in units of $k_\mathrm{B}T$.
::: solution
$a = 4\sigma/c = 4\times5.670\times10^{-8}/2.998\times10^{8} = 7.566\times10^{-16}\ \mathrm{J\,m^{-3}\,K^{-4}}$, so $u = 7.566\times10^{-16}\times(300)^{4} = 6.13\times10^{-6}\ \mathrm{J\,m^{-3}}$. With $k_\mathrm{B}T/hc = 300/0.014\,388\ \mathrm{m^{-1}} = 2.085\times10^{4}\ \mathrm{m^{-1}}$,
$$
n = 16\pi\times1.202\times(2.085\times10^{4})^{3}\ \mathrm{m^{-3}} = 5.5\times10^{14}\ \mathrm{m^{-3}} .
$$
Air at $1\ \mathrm{bar}$ and $300\ \mathrm{K}$ has $p/k_\mathrm{B}T = 2.4\times10^{25}$ molecules per cubic metre — some $4\times10^{10}$ times more. The mean photon energy is $u/n = 2.70\,k_\mathrm{B}T$. The photon gas carries negligible heat capacity at ordinary temperatures (it matters only in stars, where $T^{4}$ wins), but its *flux*, $\sigma T^{4} = 459\ \mathrm{W\,m^{-2}}$ from a black surface at $300\ \mathrm{K}$, dominates the energy balance of the Earth's surface.
:::
:::

For bosons whose number *is* conserved — atoms of $^{4}\mathrm{He}$, or the rubidium and sodium atoms of modern ultracold-gas experiments — something remarkable happens at low temperature. The chemical potential rises towards the ground-state energy as $T$ falls, and at a critical temperature it reaches it; below that temperature the excited states can no longer hold all the particles, and the excess accumulates in the single lowest state: **Bose–Einstein condensation**. For a perfect Bose gas the critical temperature is
$$
T_\mathrm{c} = \frac{h^{2}}{2\pi mk_\mathrm{B}}\left(\frac{N/V}{2.612}\right)^{2/3},
$$ {#eq-bec}
where $2.612 = \zeta(\tfrac{3}{2})$; it is the temperature at which $N\Lambda^{3}/V = 2.612$.

::: example Bose–Einstein condensation and liquid helium {#ex-bec}
Liquid $^{4}\mathrm{He}$ has a density of $0.145\ \mathrm{g\,cm^{-3}}$ near $2\ \mathrm{K}$. Calculate $T_\mathrm{c}$ for a perfect Bose gas of this density and compare with the observed transition to the superfluid at $2.17\ \mathrm{K}$ (the λ point).
::: solution
$N/V = (145\ \mathrm{kg\,m^{-3}}/4.0026\times10^{-3}\ \mathrm{kg\,mol^{-1}})\times6.022\times10^{23}\ \mathrm{mol^{-1}} = 2.18\times10^{28}\ \mathrm{m^{-3}}$, and $m = 6.647\times10^{-27}\ \mathrm{kg}$. Then
$$
\frac{h^{2}}{2\pi mk_\mathrm{B}} = \frac{(6.626\times10^{-34})^{2}}{2\pi\times6.647\times10^{-27}\times1.3807\times10^{-23}} = 7.61\times10^{-19}\ \mathrm{K\,m^{2}},
$$
and $(2.18\times10^{28}/2.612)^{2/3} = 4.12\times10^{18}\ \mathrm{m^{-2}}$, so $T_\mathrm{c} = 3.13\ \mathrm{K}$. The perfect-gas estimate is within $50\,\%$ of the λ point, which Fritz London (1938) took as evidence that superfluidity is Bose–Einstein condensation modified by the strong interactions in the liquid. The fermion isotope $^{3}\mathrm{He}$, of similar density, shows no transition near $2\ \mathrm{K}$; it becomes superfluid only below $3\ \mathrm{mK}$, by forming bosonic pairs.
:::
:::

## The heat capacity of solids

A crystal of $N$ atoms has $3N$ vibrational modes. Its atoms sit at lattice sites and are distinguishable by position, so Boltzmann statistics with quantised vibrational levels applies — equivalently, the vibrational quanta (**phonons**) behave as bosons with $\mu = 0$, exactly like photons, and $\langle n\rangle = 1/(e^{h\nu/k_\mathrm{B}T} - 1)$ is the mean vibrational quantum number of a mode. Classically each mode contributes $k_\mathrm{B}$ to $C_V$, giving $C_{V,\mathrm{m}} = 3R = 24.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$, the empirical **Dulong–Petit law** of 1819. Quantum mechanically the modes freeze at low temperature, and the question is how the $3N$ frequencies are distributed.

::: proposition The Einstein and Debye heat capacities {#prop-einstein-debye}
(a) **Einstein model**: all $3N$ modes have the same frequency $\nu_\mathrm{E}$ (Einstein temperature $\theta_\mathrm{E} = h\nu_\mathrm{E}/k_\mathrm{B}$). Then
$$
C_{V,\mathrm{m}} = 3R\,\frac{(\theta_\mathrm{E}/T)^{2}e^{\theta_\mathrm{E}/T}}{(e^{\theta_\mathrm{E}/T} - 1)^{2}} ,
$$
which tends to $3R$ at high $T$ and falls *exponentially* as $T\to0$.

(b) **Debye model**: the modes are sound waves with a density of frequencies $g(\nu) \propto \nu^{2}$ up to a cut-off $\nu_\mathrm{D}$ chosen so that there are $3N$ modes in all (Debye temperature $\theta_\mathrm{D} = h\nu_\mathrm{D}/k_\mathrm{B}$). Then
$$
C_{V,\mathrm{m}} = 9R\left(\frac{T}{\theta_\mathrm{D}}\right)^{3}\int_0^{\theta_\mathrm{D}/T}\frac{x^{4}e^{x}}{(e^{x} - 1)^{2}}\,\mathrm{d}x ,
$$ {#eq-debye}
which tends to $3R$ at high $T$ and, for $T \ll \theta_\mathrm{D}$, to the **Debye $T^{3}$ law**
$$
C_{V,\mathrm{m}} = \frac{12\pi^{4}}{5}R\left(\frac{T}{\theta_\mathrm{D}}\right)^{3} .
$$ {#eq-t3}
:::

::: proof
(a) The crystal is $3N$ independent, distinguishable oscillators: $Q = (q^\mathrm{V})^{3N}$ ([[statistical-thermodynamics/canonical-ensemble#prop-Q-indep]]), so $C_V$ is $3N$ times the single-oscillator heat capacity, $k_\mathrm{B}f_\mathrm{E}(\theta_\mathrm{E}/T)$ of [[statistical-thermodynamics/thermodynamic-functions#eq-einstein]]. At low $T$, $f_\mathrm{E} \approx (\theta_\mathrm{E}/T)^{2}e^{-\theta_\mathrm{E}/T}$.

(b) Each mode of frequency $\nu$ contributes $k_\mathrm{B}f_\mathrm{E}(h\nu/k_\mathrm{B}T)$. Counting standing sound waves in a box exactly as electron states were counted above (three polarisations, no spin) gives $g(\nu) = 9N\nu^{2}/\nu_\mathrm{D}^{3}$, normalised so that $\int_0^{\nu_\mathrm{D}}g\,\mathrm{d}\nu = 3N$. Then
$$
C_V = k_\mathrm{B}\int_0^{\nu_\mathrm{D}}\frac{9N\nu^{2}}{\nu_\mathrm{D}^{3}}f_\mathrm{E}\!\left(\frac{h\nu}{k_\mathrm{B}T}\right)\mathrm{d}\nu ,
$$
and the substitution $x = h\nu/k_\mathrm{B}T$ (so $\nu^{2}\,\mathrm{d}\nu = (k_\mathrm{B}T/h)^{3}x^{2}\,\mathrm{d}x$) gives [[#eq-debye]] per mole. At high $T$ the upper limit is small, $f_\mathrm{E}\approx1$, and $9(T/\theta_\mathrm{D})^{3}\int_0^{\theta_\mathrm{D}/T}x^{2}\,\mathrm{d}x = 3$. At low $T$ the upper limit tends to infinity, and $\int_0^\infty x^{4}e^{x}(e^{x}-1)^{-2}\,\mathrm{d}x = 4\pi^{4}/15$, giving $9\times4\pi^{4}/15 = 12\pi^{4}/5$.
:::

Einstein's model (1907) was the first application of quantum theory to matter rather than radiation, and it explained why the heat capacity falls; but its exponential fall is too fast. Debye's model (1912) recognises that a crystal always has long-wavelength, low-frequency acoustic modes that remain excited at any temperature; their number below a frequency $\nu$ grows as $\nu^{3}$, which produces the $T^{3}$ law observed in every non-magnetic insulator. The Debye temperature is a single number characterising the stiffness of a solid: $88\ \mathrm{K}$ for lead, $343\ \mathrm{K}$ for copper, about $2200\ \mathrm{K}$ for diamond.

::: widget plot
f: 3*(1/x)^2*exp(1/x)/(exp(1/x) - 1)^2; 9*x^3*sum((((j - 0.5)/(200*x))^4*exp((j - 0.5)/(200*x))/(exp((j - 0.5)/(200*x)) - 1)^2), j, 1, 200)/(200*x); 3
x: 0.02, 1.5
y: 0, 3.2
labels: \text{Einstein } C_{V,\mathrm{m}}/R; \text{Debye } C_{V,\mathrm{m}}/R; \text{Dulong–Petit}
caption: Molar heat capacity of a crystal, $C_{V,\mathrm{m}}/R$, against reduced temperature $x = T/\theta$, in the Einstein model ($\theta = \theta_\mathrm{E}$) and the Debye model ($\theta = \theta_\mathrm{D}$, the integral [[#eq-debye]] evaluated numerically by the midpoint rule). Both approach the Dulong–Petit value $3$ above $x \approx 1$. At low temperature the Debye curve falls as $x^{3}$ while the Einstein curve falls exponentially and drops far below it: at $x = 0.1$ the Debye value is $0.23$, the Einstein value $0.014$. Experiment follows the Debye curve.
:::

::: example Lattice and electronic heat capacities of copper at 10 K {#ex-copper}
Copper has $\theta_\mathrm{D} = 343\ \mathrm{K}$ and $T_\mathrm{F} = 8.16\times10^{4}\ \mathrm{K}$. Calculate the lattice and free-electron contributions to its molar heat capacity at $10.0\ \mathrm{K}$, and the temperature below which the electronic contribution is the larger.
::: solution
At $T/\theta_\mathrm{D} = 0.0292$ the $T^{3}$ law [[#eq-t3]] applies:
$$
C^\mathrm{lat}_{V,\mathrm{m}} = \frac{12\pi^{4}}{5}\times8.3145\times(0.029\,15)^{3} = 1944\times2.477\times10^{-5}\ \mathrm{J\,K^{-1}\,mol^{-1}} = 0.0482\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
With one conduction electron per atom, [[#eq-cel]] gives
$$
C^\mathrm{el}_{V,\mathrm{m}} = \frac{\pi^{2}}{2}\times8.3145\times\frac{10.0}{81\,600} = 5.03\times10^{-3}\ \mathrm{J\,K^{-1}\,mol^{-1}} ,
$$
about a tenth of the lattice value. Writing $C = \gamma T + AT^{3}$ with $\gamma = 5.03\times10^{-4}\ \mathrm{J\,K^{-2}\,mol^{-1}}$ and $A = 4.82\times10^{-5}\ \mathrm{J\,K^{-4}\,mol^{-1}}$, the two are equal at $T = (\gamma/A)^{1/2} = 3.2\ \mathrm{K}$; below that the electrons dominate. A plot of $C/T$ against $T^{2}$ is a straight line of intercept $\gamma$ and slope $A$ — the standard way metals are characterised. The measured $\gamma$ of copper, $0.695\ \mathrm{mJ\,K^{-2}\,mol^{-1}}$, is $1.38$ times the free-electron value, a measure of how the periodic potential and electron–phonon coupling increase the effective mass of the electrons.
:::
:::

::: quiz
At $20\ \mathrm{K}$ the heat capacity of an insulating crystal with $\theta_\mathrm{D} = 200\ \mathrm{K}$ is measured. If the temperature is halved to $10\ \mathrm{K}$, by what factor does the heat capacity fall?
- [ ] 2, because $C \propto T$.
- [x] 8, because the Debye $T^{3}$ law holds at $T \ll \theta_\mathrm{D}$.
- [ ] More than 1000, because the vibrations freeze exponentially.
- [ ] It does not change: $C_V = 3R$ for any solid.
::: solution
At $T/\theta_\mathrm{D} = 0.1$ and below, the heat capacity of an insulator follows $C \propto T^{3}$ ([[#prop-einstein-debye]](b)), so halving $T$ divides $C$ by $2^{3} = 8$. A linear fall is characteristic of the conduction electrons in a *metal*; an exponential fall is the Einstein model's prediction, which is wrong because a real crystal always has low-frequency acoustic modes; and $3R$ is the high-temperature (Dulong–Petit) limit.
:::
:::

::: history
Satyendra Nath Bose sent Einstein in 1924 a derivation of Planck's law that counted photons as indistinguishable particles; Einstein translated it for *Zeitschrift für Physik* and extended the method to material particles in 1924–1925, predicting the condensation that bears both names. Enrico Fermi (1926) and Paul Dirac (1926) independently derived the statistics of particles obeying the exclusion principle; Arnold Sommerfeld's 1927–1928 free-electron theory of metals, using Fermi–Dirac statistics, resolved the heat-capacity paradox of the classical Drude model. For solids, Einstein's 1907 paper "Die Plancksche Theorie der Strahlung und die Theorie der spezifischen Wärme" and Peter Debye's 1912 theory explained the decline of heat capacities measured by Walther Nernst's laboratory in Berlin. Bose–Einstein condensation of a dilute atomic gas was achieved in 1995 with rubidium-87 by Eric Cornell and Carl Wieman and with sodium by Wolfgang Ketterle, who shared the 2001 Nobel Prize in Physics.
:::

## Where this leads

Fermi–Dirac statistics is the foundation of the band theory of solids, semiconductors and electrochemistry at metal electrodes: the Fermi level of a metal is the electrochemical potential of its electrons, and aligning Fermi levels is what happens when an electrode is polarised ([[electrochemistry/electrode-kinetics]], [[materials-chemistry/electronic-structure-solids]]). Bose–Einstein statistics underlies blackbody radiation, lasers and phonon transport. The Debye $T^{3}$ law is how calorimetric third-law entropies are extrapolated below the lowest measured temperature ([[thermodynamics/second-law]]), and the Debye temperature reappears in the theory of thermal expansion and diffraction intensities ([[materials-chemistry/diffraction]]). In the next lesson we return to classical statistics, now applied to the special configuration at the top of a reaction barrier ([[statistical-thermodynamics/statistical-rate-theory]]).

::: summary
- Identical particles are bosons (symmetric wavefunction, any occupation) or fermions (antisymmetric, $n_i = 0$ or $1$); for independent particles the grand canonical ensemble gives $\langle n\rangle = 1/(e^{(\varepsilon - \mu)/k_\mathrm{B}T} \pm 1)$, $+$ for Fermi–Dirac and $-$ for Bose–Einstein.
- When $e^{(\varepsilon - \mu)/k_\mathrm{B}T} \gg 1$ (equivalently $N\Lambda^{3}/V \ll 1$) both reduce to the Boltzmann distribution; ordinary gases and liquids are classical in this sense.
- Free electrons in a metal fill states up to the Fermi energy $E_\mathrm{F} = (h^{2}/8m_\mathrm{e})(3N/\pi V)^{2/3}$: $3.24\ \mathrm{eV}$ for Na, $7.03\ \mathrm{eV}$ for Cu, with $T_\mathrm{F} \sim 10^{4}$–$10^{5}\ \mathrm{K}$.
- Only electrons within $\sim k_\mathrm{B}T$ of $E_\mathrm{F}$ are excited, so $C^\mathrm{el}_{V,\mathrm{m}} = (\pi^{2}/2)R(T/T_\mathrm{F})$, about $1\,\%$ of the classical value at room temperature.
- Photons ($\mu = 0$) give Planck's law and Wien's $\lambda_\text{max}T = 2.898\ \mathrm{mm\,K}$; conserved bosons condense below $T_\mathrm{c}$, where $N\Lambda^{3}/V = 2.612$ ($3.1\ \mathrm{K}$ for liquid-helium density, against the λ point at $2.17\ \mathrm{K}$).
- Solids: the Einstein model explains the fall from $3R$ but too steeply; the Debye model gives $C_{V,\mathrm{m}} = (12\pi^{4}/5)R(T/\theta_\mathrm{D})^{3}$ at low $T$; metals show $C = \gamma T + AT^{3}$.
:::

## Exercises

::: exercise The Fermi energy of potassium {level=1 check="2.12"}
Potassium has $1.40\times10^{28}$ conduction electrons per cubic metre. Calculate its Fermi energy. (Enter $E_\mathrm{F}$ in eV.)
::: solution
$E_\mathrm{F} = (h^{2}/8m_\mathrm{e})(3N/\pi V)^{2/3} = 6.025\times10^{-38}\times(1.337\times10^{28})^{2/3}\ \mathrm{J} = 6.025\times10^{-38}\times5.63\times10^{18}\ \mathrm{J} = 3.39\times10^{-19}\ \mathrm{J} = 2.12\ \mathrm{eV}$. Lower electron density, lower Fermi energy: $E_\mathrm{F} \propto (N/V)^{2/3}$.
:::
:::

::: exercise Occupation at the Fermi level {level=1 check="0.0474"}
What is the probability that a state lying $3k_\mathrm{B}T$ above the chemical potential is occupied by an electron? Compare with the Boltzmann value. (Enter the Fermi–Dirac probability.)
::: solution
$\langle n\rangle_\mathrm{FD} = 1/(e^{3} + 1) = 1/21.09 = 0.0474$; the Boltzmann value is $e^{-3} = 0.0498$, $5\,\%$ higher. At $x = 3$ the two statistics already nearly agree; at $x = 0$ (the chemical potential itself) the Fermi–Dirac occupation is exactly $\tfrac{1}{2}$ whatever the temperature.
:::
:::

::: exercise Dulong and Petit {level=1 check="0.392"}
Using the Dulong–Petit law, estimate the specific heat capacity of copper ($M = 63.55\ \mathrm{g\,mol^{-1}}$) at room temperature. (Enter it in $\mathrm{J\,K^{-1}\,g^{-1}}$.)
::: solution
$C_{V,\mathrm{m}} \approx 3R = 24.94\ \mathrm{J\,K^{-1}\,mol^{-1}}$, so $c = 24.94/63.55 = 0.392\ \mathrm{J\,K^{-1}\,g^{-1}}$. The measured $c_p$ is $0.385\ \mathrm{J\,K^{-1}\,g^{-1}}$: copper at $298\ \mathrm{K}$ ($T/\theta_\mathrm{D} = 0.87$) is close to the classical limit, its $C_V$ a few per cent below $3R$ and $C_p - C_V$ about $0.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
:::
:::

::: exercise Einstein's diamond {level=2 check="5.98"}
Einstein fitted the heat capacity of diamond with $\theta_\mathrm{E} = 1320\ \mathrm{K}$. Calculate the Einstein $C_{V,\mathrm{m}}$ of diamond at $298.15\ \mathrm{K}$ and compare with the measured $6.11\ \mathrm{J\,K^{-1}\,mol^{-1}}$. (Enter $C_{V,\mathrm{m}}$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
$x = 1320/298.15 = 4.427$; $e^{x} = 83.7$; $f_\mathrm{E} = x^{2}e^{x}/(e^{x}-1)^{2} = 19.60\times83.7/(82.7)^{2} = 0.240$. So $C_{V,\mathrm{m}} = 3R\times0.240 = 5.98\ \mathrm{J\,K^{-1}\,mol^{-1}}$, within $2\,\%$ of experiment. Diamond, with its stiff bonds and light atoms, has only a quarter of its classical heat capacity at room temperature — the anomaly that led Einstein to the model. The fit fails at low temperature, where the Einstein curve drops far below the measured $T^{3}$ behaviour.
:::
:::

::: exercise The $T^{3}$ law {level=2 check="0.0148"}
The Debye temperature of sodium chloride is about $320\ \mathrm{K}$. Estimate the molar heat capacity of NaCl at $5.00\ \mathrm{K}$, remembering that a mole of NaCl contains two moles of ions. (Enter $C_{V,\mathrm{m}}$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
Per mole of ions, $C = (12\pi^{4}/5)R(T/\theta_\mathrm{D})^{3} = 1944\times(5/320)^{3} = 1944\times3.815\times10^{-6} = 7.42\times10^{-3}\ \mathrm{J\,K^{-1}}$; per mole of NaCl (two moles of ions), $0.0148\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — about $1/3400$ of its room-temperature value. Forgetting the factor of two ions per formula unit is a common slip: the Dulong–Petit limit for NaCl is $6R$ per mole of formula units, not $3R$.
:::
:::

::: exercise Wien's law {level=2 check="9.66"}
Find the wavelength of maximum emission (per unit wavelength) of a black body at $300\ \mathrm{K}$, given $\lambda_\text{max}T = 2.898\ \mathrm{mm\,K}$. (Enter $\lambda_\text{max}$ in µm.)
::: solution
$\lambda_\text{max} = 2.898\times10^{-3}\ \mathrm{m\,K}/300\ \mathrm{K} = 9.66\times10^{-6}\ \mathrm{m} = 9.66\ \mu\mathrm{m}$, in the thermal infrared. Thermal cameras and the greenhouse effect both operate in this window; at $5772\ \mathrm{K}$ the same law puts the solar maximum at $502\ \mathrm{nm}$.
:::
:::

::: exercise The Fermi–Dirac distribution in the classical limit {level=3}
For a perfect gas of spin-$\tfrac{1}{2}$ fermions of mass $m$, show that the first quantum correction to the equation of state is $pV/Nk_\mathrm{B}T = 1 + N\Lambda^{3}/(2^{7/2}V) + \cdots$, i.e. that Fermi statistics produces an effective *repulsion*. What is the sign for bosons, and why?
::: hint
In the grand canonical ensemble $pV = k_\mathrm{B}T\sum_i\ln\xi_i$. Expand $\ln(1 \pm x)$ to second order in the small quantity $x = e^{-\beta(\varepsilon_i - \mu)}$, convert sums to integrals with $\sum_ie^{-s\beta\varepsilon_i} = gV/(s^{3/2}\Lambda^{3})$ ($g = 2$ spin states), and eliminate $\mu$ using $N$.
:::
::: solution
For fermions $\ln\xi_i = \ln(1 + x_i) = x_i - \tfrac{1}{2}x_i^{2} + \cdots$, and $\langle n_i\rangle = x_i - x_i^{2} + \cdots$. With $z = e^{\beta\mu}$ and $\sum_ie^{-s\beta\varepsilon_i} = gV/(s^{3/2}\Lambda^{3})$,
$$
\frac{pV}{k_\mathrm{B}T} = \frac{gV}{\Lambda^{3}}\left(z - \frac{z^{2}}{2^{5/2}}\right), \qquad N = \frac{gV}{\Lambda^{3}}\left(z - \frac{z^{2}}{2^{3/2}}\right).
$$
Invert the second to first order: $z = (N\Lambda^{3}/gV)(1 + 2^{-3/2}N\Lambda^{3}/gV)$. Substituting,
$$
\frac{pV}{Nk_\mathrm{B}T} = \frac{z - z^{2}/2^{5/2}}{z - z^{2}/2^{3/2}} \approx 1 + z\left(2^{-3/2} - 2^{-5/2}\right) = 1 + \frac{z}{2^{5/2}} = 1 + \frac{N\Lambda^{3}}{2^{5/2}gV} ,
$$
and with $g = 2$ this is $1 + N\Lambda^{3}/(2^{7/2}V)$. The pressure exceeds the classical value: the exclusion principle keeps fermions apart, acting like a repulsion. For bosons every sign of the $x^{2}$ terms is reversed and the correction is $-N\Lambda^{3}/(2^{5/2}gV)$: bosons bunch together, an effective attraction, which at higher degeneracy culminates in Bose–Einstein condensation. Both effects are tiny for ordinary gases ($N\Lambda^{3}/V \sim 10^{-7}$) but measurable for helium below $10\ \mathrm{K}$.
:::
:::

::: exercise The Debye entropy at low temperature {level=3 check="0.0211"}
Show that a solid obeying the Debye $T^{3}$ law has $S_\mathrm{m}(T) = \tfrac{1}{3}C_{V,\mathrm{m}}(T)$ at low temperature, and use this to find the entropy of copper at $10\ \mathrm{K}$ from [[#ex-copper]], including the electronic contribution. (Enter $S_\mathrm{m}$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
With $C = AT^{3}$, $S(T) = \int_0^{T}(C/T')\,\mathrm{d}T' = \int_0^{T}AT'^{2}\,\mathrm{d}T' = \tfrac{1}{3}AT^{3} = \tfrac{1}{3}C(T)$. For the electronic term $C = \gamma T$, $S = \int_0^{T}\gamma\,\mathrm{d}T' = \gamma T = C(T)$. So for copper at $10\ \mathrm{K}$,
$$
S_\mathrm{m} = \tfrac{1}{3}\times0.0482 + 5.03\times10^{-3} = 0.0161 + 0.0050 = 0.0211\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
The electrons, a tenth of the heat capacity, carry nearly a quarter of the entropy, because their $C/T$ does not vanish as $T\to0$. This is how calorimetric entropies are extrapolated from the lowest measured temperature to $0\ \mathrm{K}$ (the "Debye extrapolation"): the unmeasured entropy is one third of the last measured heat capacity for an insulator.
:::
:::
