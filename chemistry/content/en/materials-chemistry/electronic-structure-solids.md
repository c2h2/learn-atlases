Copper conducts electricity $10^{20}$ times better than diamond, silicon sits between them, and its conductivity can be changed a millionfold by replacing one atom in a million with phosphorus. Gallium arsenide emits light efficiently and silicon hardly at all, although their band gaps are similar. Nickel oxide, which simple electron counting says should be a metal, is a green insulator. Explaining such facts, and designing materials with chosen electronic properties, needs a quantitative picture of how electrons behave in an infinite periodic solid.

The chapter [[bonding-structure/metallic-bonding]] introduced bands qualitatively: the molecular orbitals of a giant molecule crowd into continuous bands of energy, and the filling of those bands decides whether a solid is a metal, a semiconductor or an insulator. Here we make the picture quantitative. We build a band from atomic orbitals for a one-dimensional chain and see how its width depends on overlap, introduce the wavevector $k$, Bloch's theorem and the density of states, treat the opposite limit of free electrons to obtain the Fermi energy of a metal, and then develop the statistics of electrons and holes in semiconductors: intrinsic carrier concentrations, doping, the position of the Fermi level, and direct and indirect gaps. A last section explains where band theory fails.

## Bands from orbitals: the tight-binding chain

Chemists build bands the way they build molecular orbitals ([[bonding-structure/molecular-orbitals]]): as linear combinations of atomic orbitals. The simplest case is a chain of $N$ identical atoms, spacing $a$, each contributing one $s$ orbital $\phi_n$ centred on atom $n$. As in Hückel theory ([[quantum-chemistry/huckel-theory]]) let the Coulomb integral be $\alpha = \langle\phi_n\vert\hat H\vert\phi_n\rangle$, the resonance integral between neighbours $\beta = \langle\phi_n\vert\hat H\vert\phi_{n\pm1}\rangle$ (negative for $s$ orbitals), and neglect overlap and interactions beyond neighbours.

::: definition Bloch's theorem and the wavevector {#def-bloch}
In a potential with the period $a$ of the lattice, the one-electron wavefunctions can be chosen so that
$$
\psi_k(x + a) = e^{ika}\,\psi_k(x),
$$ {#eq-bloch}
that is, translation by one lattice spacing multiplies $\psi$ by a phase. The label $k$ is the **wavevector**; $k$ and $k + 2\pi/a$ describe the same state, so all distinct states have $k$ in the **first Brillouin zone**, $-\pi/a < k \le \pi/a$. For a chain of $N$ atoms with periodic boundary conditions ($\psi(x + Na) = \psi(x)$), $e^{ikNa} = 1$, so $k = 2\pi j/(Na)$ with $N$ allowed values in the zone: one state per atomic orbital, as in any LCAO treatment. In three dimensions $k$ becomes a vector and the zone a polyhedron in reciprocal space ([[materials-chemistry/diffraction#prop-laue]]).
:::

::: proposition The tight-binding band of a chain {#prop-tight-binding}
For the chain of $s$ orbitals with nearest-neighbour resonance integral $\beta$, the crystal orbitals and their energies are
$$
\psi_k = \frac{1}{\sqrt N}\sum_{n=0}^{N-1} e^{ikna}\,\phi_n, \qquad E(k) = \alpha + 2\beta\cos ka.
$$ {#eq-tb}
The band runs from $\alpha + 2\beta$ (at $k = 0$, all orbitals in phase, fully bonding) to $\alpha - 2\beta$ (at $k = \pm\pi/a$, alternating signs, fully antibonding): its **bandwidth** is $W = 4\lvert\beta\rvert$, independent of $N$. In a lattice where each atom has $z$ nearest neighbours the bandwidth is $W = 2z\lvert\beta\rvert$ in the same approximation.
:::

::: proof
The combination $\psi_k$ satisfies Bloch's theorem: replacing $n$ by $n + 1$ multiplies each coefficient by $e^{ika}$. Apply $\hat H$ and project onto $\phi_m$. Only $\phi_m$ and its two neighbours contribute:
$$
\langle\phi_m\vert\hat H\vert\psi_k\rangle = \frac{1}{\sqrt N}\left(\alpha e^{ikma} + \beta e^{ik(m-1)a} + \beta e^{ik(m+1)a}\right) = \frac{e^{ikma}}{\sqrt N}\left(\alpha + 2\beta\cos ka\right).
$$
The right side is $(\alpha + 2\beta\cos ka)$ times $\langle\phi_m\vert\psi_k\rangle = e^{ikma}/\sqrt N$, for every $m$, so $\psi_k$ is an eigenfunction with $E(k) = \alpha + 2\beta\cos ka$. The extreme values of the cosine give the band edges. In three dimensions, the same calculation for a simple cubic lattice gives $E(\mathbf{k}) = \alpha + 2\beta(\cos k_xa + \cos k_ya + \cos k_za)$, with width $12\lvert\beta\rvert = 2z\lvert\beta\rvert$ for $z = 6$.
:::

Three chemical lessons follow. **Bandwidth measures overlap**: diffuse $s$ and $p$ orbitals on neighbouring metal atoms give bands $5$–$15\ \mathrm{eV}$ wide; compact $3d$ orbitals give $d$ bands of $3$–$6\ \mathrm{eV}$; the shielded $4f$ orbitals of the lanthanides give bands so narrow that the $f$ electrons stay essentially localised. **Compression widens bands**: under pressure $\lvert\beta\rvert$ grows, which is why most insulators become metallic at high enough pressure (iodine near $16\ \mathrm{GPa}$, hydrogen probably near $400\ \mathrm{GPa}$). **The bottom of a band is bonding and the top antibonding**, so filling a band beyond half-way weakens the bonds: the cohesive energies of the transition metals peak near the middle of each series, where the bonding half of the $d$ band is full.

::: widget plot
f: -sqrt(2 + 2*d^2 + 2*(1 - d^2)*cos(x)); sqrt(2 + 2*d^2 + 2*(1 - d^2)*cos(x))
x: -pi, pi
y: -2.3, 2.3
piticks: true
sliders: d=0:0:0.6:0.01
labels: \text{lower band}; \text{upper band}
caption: Bands of a chain in units of $\lvert\beta\rvert$ with $\alpha = 0$, for a cell of two atoms (length $2a$), plotted against $x = 2ka$ over its Brillouin zone. The resonance integrals alternate between $\beta(1 + d)$ and $\beta(1 - d)$, and solving the $2 \times 2$ secular problem gives $E = \pm\lvert\beta\rvert\sqrt{(1 + d)^2 + (1 - d)^2 + 2(1 - d^2)\cos x}$. At $d = 0$ (uniform chain) the two curves are $\pm2\lvert\beta\rvert\cos(x/2)$, the band $\alpha + 2\beta\cos ka$ of [[#eq-tb]] folded into the smaller zone, and they touch at the zone edge. Any dimerisation $d > 0$ opens a gap of $4d\lvert\beta\rvert$ there. For a half-filled band (one electron per atom) only the lower band is occupied, and its energy falls as the gap opens: this is the **Peierls distortion**, which makes polyacetylene an alternating single–double-bond semiconductor rather than a one-dimensional metal.
:::

## The density of states

Many properties depend not on $E(k)$ itself but on how many states lie in each energy interval.

::: definition Density of states {#def-dos}
The **density of states** $g(E)$ is defined so that $g(E)\,dE$ is the number of one-electron states (including both spin orientations) with energies between $E$ and $E + dE$. Its integral over a band equals twice the number of atomic orbitals that formed the band. The number of electrons is $\int g(E)f(E)\,dE$, where $f(E) = 1/\{1 + \exp[(E - \mu)/k_\mathrm{B}T]\}$ is the Fermi–Dirac distribution and $\mu$ the chemical potential of the electrons; at $T = 0$, $\mu$ equals the **Fermi energy** $E_\mathrm{F}$, the energy of the highest occupied state.
:::

For the tight-binding chain the allowed $k$ are evenly spaced, $2\pi/Na$ apart, so the number of states in $dk$ is $(Na/2\pi)\,dk$ per spin. States at $+k$ and $-k$ have the same energy, so with spin
$$
g(E) = 2 \times 2 \times \frac{Na}{2\pi}\left\lvert\frac{dk}{dE}\right\rvert = \frac{2Na}{\pi}\,\frac{1}{\lvert 2\beta a\sin ka\rvert} = \frac{2N}{\pi\sqrt{4\beta^2 - (E - \alpha)^2}}.
$$
The density of states is smallest at the band centre, where $E(k)$ is steepest, and diverges at the edges, where the band is flat. Such **van Hove singularities**, softened to finite peaks or kinks in three dimensions, are visible in photoelectron spectra and in the optical absorption of nanotubes ([[materials-chemistry/nanomaterials]]).

### Free electrons: the opposite limit

In simple metals such as sodium and aluminium the valence electrons are so delocalised that a better starting point is the **free-electron model**: electrons in a box of volume $V$ with zero potential, energy $E = \hbar^2k^2/2m_e$, and wavevectors on a grid of spacing $2\pi/L$ in each direction ($V = L^3$).

::: proposition Fermi energy and density of states of a free-electron metal {#prop-fermi}
For $N$ free electrons in volume $V$, number density $n = N/V$, the density of states and the Fermi energy are
$$
g(E) = \frac{V}{2\pi^2}\left(\frac{2m_e}{\hbar^2}\right)^{3/2}E^{1/2}, \qquad E_\mathrm{F} = \frac{\hbar^2}{2m_e}\left(3\pi^2n\right)^{2/3}.
$$ {#eq-fermi}
The mean energy per electron at $T = 0$ is $\tfrac35E_\mathrm{F}$. These results assume independent electrons in a constant potential; in real metals $m_e$ is replaced by an effective mass and the shape of the Fermi surface departs from a sphere.
:::

::: proof
Each allowed $\mathbf{k}$ occupies a volume $(2\pi/L)^3 = 8\pi^3/V$ of $k$-space. At $T = 0$ the $N$ electrons fill, two per $\mathbf{k}$, all states inside a sphere of radius $k_\mathrm{F}$ (the **Fermi sphere**):
$$
N = 2 \times \frac{\tfrac43\pi k_\mathrm{F}^3}{8\pi^3/V} = \frac{Vk_\mathrm{F}^3}{3\pi^2} \quad\Longrightarrow\quad k_\mathrm{F} = (3\pi^2n)^{1/3}, \qquad E_\mathrm{F} = \frac{\hbar^2k_\mathrm{F}^2}{2m_e} = \frac{\hbar^2}{2m_e}(3\pi^2n)^{2/3}.
$$
The same argument for a sphere of radius $k$ gives the number of states below $E$: $N(E) = (V/3\pi^2)(2m_eE/\hbar^2)^{3/2}$, and differentiating, $g(E) = dN/dE = (V/2\pi^2)(2m_e/\hbar^2)^{3/2}E^{1/2}$. The mean energy is $\int_0^{E_\mathrm{F}}Eg\,dE/\int_0^{E_\mathrm{F}}g\,dE = \tfrac35E_\mathrm{F}$, since $g \propto E^{1/2}$.
:::

::: example The Fermi energy of sodium and copper {#ex-fermi}
Sodium has $n = 2.65\times10^{28}$ conduction electrons per cubic metre (one per atom) and copper $n = 8.47\times10^{28}\ \mathrm{m^{-3}}$. Calculate $E_\mathrm{F}$, $k_\mathrm{F}$ and the Fermi velocity for sodium, and $E_\mathrm{F}$ for copper. Compare $E_\mathrm{F}$ with $k_\mathrm{B}T$ at room temperature.
::: solution
For sodium, $3\pi^2n = 7.846\times10^{29}\ \mathrm{m^{-3}}$, $k_\mathrm{F} = (7.846\times10^{29})^{1/3} = 9.22\times10^9\ \mathrm{m^{-1}}$, and
$$
E_\mathrm{F} = \frac{(1.0546\times10^{-34})^2 \times (9.22\times10^9)^2}{2 \times 9.109\times10^{-31}} = 5.19\times10^{-19}\ \mathrm{J} = 3.24\ \mathrm{eV}.
$$
The Fermi velocity is $v_\mathrm{F} = \hbar k_\mathrm{F}/m_e = 1.07\times10^6\ \mathrm{m\,s^{-1}}$, about $0.4\ \%$ of the speed of light. For copper, scaling by $(8.47/2.65)^{2/3} = 2.17$ gives $E_\mathrm{F} = 7.03\ \mathrm{eV}$. At $298\ \mathrm{K}$, $k_\mathrm{B}T = 0.026\ \mathrm{eV}$, more than a hundred times smaller than $E_\mathrm{F}$: only electrons within a few $k_\mathrm{B}T$ of the Fermi level can be excited thermally. That is why the electronic heat capacity of a metal is only about 1 % of the classical $\tfrac32R$ per mole of electrons, a puzzle that the free-electron model with Fermi–Dirac statistics solved in 1927–28.
:::
:::

Only the electrons within about $k_\mathrm{B}T$ of $E_\mathrm{F}$ can absorb thermal energy, and their number is proportional to the density of states at the Fermi level, $g(E_\mathrm{F})$. A calculation that follows the Fermi–Dirac distribution to first order in $k_\mathrm{B}T/E_\mathrm{F}$ (the Sommerfeld expansion, [[statistical-thermodynamics/quantum-statistics]]) gives the electronic heat capacity per mole of free electrons as
$$
C_{V,\mathrm{el}} = \frac{\pi^2}{2}R\,\frac{k_\mathrm{B}T}{E_\mathrm{F}},
$$ {#eq-cel}
linear in $T$. The same factor $g(E_\mathrm{F})$ controls Pauli paramagnetism and, through the electron–phonon coupling, the superconducting transition temperatures of [[materials-chemistry/energy-materials]].

::: example The electronic heat capacity of sodium {#ex-cel}
Use [[#eq-cel]] to calculate the electronic heat capacity of sodium ($E_\mathrm{F} = 3.24\ \mathrm{eV}$, one conduction electron per atom) at $300\ \mathrm{K}$ and compare it with the lattice heat capacity, about $3R$. At what temperature would the two be equal if the lattice contribution followed the Debye $T^3$ law, $C_\mathrm{lat} = 1944\,(T/\Theta_\mathrm{D})^3\ \mathrm{J\,K^{-1}\,mol^{-1}}$ with $\Theta_\mathrm{D} = 158\ \mathrm{K}$?
::: solution
At $300\ \mathrm{K}$, $k_\mathrm{B}T/E_\mathrm{F} = 0.02585/3.24 = 7.98\times10^{-3}$, so $C_{V,\mathrm{el}} = 4.935 \times 8.314 \times 7.98\times10^{-3} = 0.33\ \mathrm{J\,K^{-1}\,mol^{-1}}$, about $1.3\ \%$ of $3R = 24.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$. A classical electron gas would contribute $\tfrac32R = 12.5$, which is not observed. Writing $C_{V,\mathrm{el}} = \gamma T$ with $\gamma = (\pi^2/2)Rk_\mathrm{B}/E_\mathrm{F} = 4.935 \times 8.314 \times 8.617\times10^{-5}/3.24 = 1.09\times10^{-3}\ \mathrm{J\,K^{-2}\,mol^{-1}}$, equality with the Debye term requires $\gamma T = 1944T^3/\Theta_\mathrm{D}^3$, so $T^2 = \gamma\Theta_\mathrm{D}^3/1944 = 1.09\times10^{-3} \times 3.944\times10^6/1944 = 2.21$, $T = 1.5\ \mathrm{K}$. Below a few kelvin the electrons dominate the heat capacity of a metal, and plotting $C/T$ against $T^2$ gives $\gamma$ as the intercept: a direct measurement of $g(E_\mathrm{F})$. (The measured $\gamma$ of sodium is about 25 % larger than the free-electron value, a sign of the electron's enhanced effective mass.)
:::
:::

The free-electron and tight-binding pictures are two ends of one story. Adding a weak periodic potential to free electrons opens gaps at the zone boundaries, where the electron waves satisfy the Bragg condition and form standing waves concentrated either on or between the ions; strengthening the potential until the gaps are large brings us back to narrow tight-binding bands. Real band structures, calculated with density functional theory ([[computational-chemistry/density-functional-theory]]), interpolate between the two.

::: quiz
In the tight-binding chain, what happens to the bandwidth and to the energy of the $k = 0$ orbital if the interatomic spacing decreases so that $\lvert\beta\rvert$ doubles?
- [x] The bandwidth doubles and the $k = 0$ orbital moves down in energy.
- [ ] The bandwidth doubles and the $k = 0$ orbital moves up in energy.
- [ ] The bandwidth is unchanged because it depends only on $N$.
- [ ] The bandwidth halves, because more atoms fit in the chain.
::: solution
$W = 4\lvert\beta\rvert$ doubles. The $k = 0$ orbital has $E = \alpha + 2\beta$, and since $\beta < 0$ for $s$ orbitals, a larger $\lvert\beta\rvert$ lowers it. The bandwidth does not depend on $N$; adding atoms only adds more states within the same energy range.
:::
:::

## Semiconductors: electrons and holes

In a semiconductor such as silicon the valence band (built mainly from bonding combinations of $sp^3$ hybrids) is full and the conduction band (antibonding) empty at $0\ \mathrm{K}$, separated by a gap $E_\mathrm{g}$: $1.12\ \mathrm{eV}$ for Si, $0.66\ \mathrm{eV}$ for Ge, $1.42\ \mathrm{eV}$ for GaAs, $3.4\ \mathrm{eV}$ for GaN at $300\ \mathrm{K}$. At finite temperature a few electrons are excited across the gap, leaving **holes**, empty states near the top of the valence band that behave as positive carriers. Near the band edges $E(k)$ is approximately parabolic, $E = E_\mathrm{c} + \hbar^2k^2/2m_\mathrm{e}^*$ for electrons and $E = E_\mathrm{v} - \hbar^2k^2/2m_\mathrm{h}^*$ for holes, defining **effective masses** that encode the curvature of the bands (a strongly curved, wide band gives a small $m^*$ and mobile carriers).

::: proposition Carrier concentrations and the law of mass action {#prop-mass-action}
In a non-degenerate semiconductor (Fermi level more than a few $k_\mathrm{B}T$ from both band edges), the concentrations of conduction electrons and holes are
$$
n = N_\mathrm{c}\exp\!\left(-\frac{E_\mathrm{c} - \mu}{k_\mathrm{B}T}\right), \qquad p = N_\mathrm{v}\exp\!\left(-\frac{\mu - E_\mathrm{v}}{k_\mathrm{B}T}\right),
$$
where $N_\mathrm{c} = 2(m_\mathrm{e}^*k_\mathrm{B}T/2\pi\hbar^2)^{3/2}$ and $N_\mathrm{v} = 2(m_\mathrm{h}^*k_\mathrm{B}T/2\pi\hbar^2)^{3/2}$ are the **effective densities of states** of the bands. Their product is independent of the Fermi level and of doping:
$$
np = n_\mathrm{i}^2 = N_\mathrm{c}N_\mathrm{v}\exp\!\left(-\frac{E_\mathrm{g}}{k_\mathrm{B}T}\right).
$$ {#eq-np}
In an undoped (intrinsic) crystal $n = p = n_\mathrm{i}$, and the Fermi level lies at $\mu = \tfrac12(E_\mathrm{c} + E_\mathrm{v}) + \tfrac12k_\mathrm{B}T\ln(N_\mathrm{v}/N_\mathrm{c})$, close to mid-gap.
:::

::: proof
The conduction-band density of states per unit volume near the edge is the free-electron result of [[#prop-fermi]] with $m_e \to m_\mathrm{e}^*$ and energy measured from $E_\mathrm{c}$: $g_\mathrm{c}(E) = (1/2\pi^2)(2m_\mathrm{e}^*/\hbar^2)^{3/2}(E - E_\mathrm{c})^{1/2}$. When $E - \mu \gg k_\mathrm{B}T$, the Fermi–Dirac function reduces to the Boltzmann factor $e^{-(E - \mu)/k_\mathrm{B}T}$. Then
$$
n = \int_{E_\mathrm{c}}^{\infty} g_\mathrm{c}(E)\,e^{-(E - \mu)/k_\mathrm{B}T}\,dE = \frac{1}{2\pi^2}\left(\frac{2m_\mathrm{e}^*}{\hbar^2}\right)^{3/2}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}\int_0^\infty \varepsilon^{1/2}e^{-\varepsilon/k_\mathrm{B}T}\,d\varepsilon.
$$
The integral is $\tfrac{\sqrt\pi}{2}(k_\mathrm{B}T)^{3/2}$, and collecting constants gives $n = N_\mathrm{c}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}$ with $N_\mathrm{c}$ as stated. The hole result follows in the same way using $1 - f(E) \approx e^{-(\mu - E)/k_\mathrm{B}T}$ in the valence band. Multiplying, $\mu$ cancels and $np = N_\mathrm{c}N_\mathrm{v}e^{-(E_\mathrm{c} - E_\mathrm{v})/k_\mathrm{B}T}$. Setting $n = p$ and taking logarithms gives the intrinsic Fermi level. The relation is the mass-action law for the "reaction" $\mathrm{nil} \rightleftharpoons e' + h^\bullet$, exactly as for the defect equilibria of [[materials-chemistry/defects]], with $E_\mathrm{g}$ playing the role of a reaction energy.
:::

::: example Intrinsic silicon {#ex-intrinsic}
For silicon at $300\ \mathrm{K}$ take $E_\mathrm{g} = 1.12\ \mathrm{eV}$, $N_\mathrm{c} = 3.2\times10^{19}\ \mathrm{cm^{-3}}$ and $N_\mathrm{v} = 1.8\times10^{19}\ \mathrm{cm^{-3}}$ (typical tabulated values). (a) Calculate $n_\mathrm{i}$ and the fraction of the $5.0\times10^{22}$ silicon atoms per $\mathrm{cm^3}$ that have lost an electron to the conduction band. (b) Estimate $n_\mathrm{i}$ at $400\ \mathrm{K}$, ignoring the small change in $E_\mathrm{g}$ and remembering that $N_\mathrm{c}N_\mathrm{v} \propto T^3$.
::: solution
(a) $k_\mathrm{B}T = 0.02585\ \mathrm{eV}$, $\sqrt{N_\mathrm{c}N_\mathrm{v}} = 2.40\times10^{19}\ \mathrm{cm^{-3}}$, and
$$
n_\mathrm{i} = 2.40\times10^{19}\exp\!\left(-\frac{1.12}{2 \times 0.02585}\right) = 2.40\times10^{19} \times 3.91\times10^{-10} = 9.4\times10^{9}\ \mathrm{cm^{-3}},
$$
close to the accepted $1.0\times10^{10}\ \mathrm{cm^{-3}}$. The fraction is $9.4\times10^9/5.0\times10^{22} = 1.9\times10^{-13}$: about one atom in five trillion. (b) $\sqrt{N_\mathrm{c}N_\mathrm{v}}$ scales as $T^{3/2}$, a factor $1.54$, and $k_\mathrm{B}T = 0.03447\ \mathrm{eV}$, so $n_\mathrm{i}(400\ \mathrm{K}) = 3.70\times10^{19}\exp(-16.25) = 3.3\times10^{12}\ \mathrm{cm^{-3}}$, a 350-fold increase for $100\ \mathrm{K}$. This steep rise sets the upper operating temperature of silicon devices: once $n_\mathrm{i}$ approaches the dopant concentration, the device loses its designed doping profile.
:::
:::

::: widget plot
f: log(2.4e19*(1000/(300*x))^1.5*exp(-g*x/(2*0.08617)))/log(10); log(2.4e19*(1000/(300*x))^1.5*exp(-1.12*x/(2*0.08617)))/log(10)
x: 1.5, 5
y: 0, 18
sliders: g=0.66:0.2:3.5:0.01
hlines: 15
labels: n_\mathrm{i},\ E_\mathrm{g} = g; n_\mathrm{i}\ \text{for silicon}
caption: $\log_{10}$ of the intrinsic carrier concentration (in $\mathrm{cm^{-3}}$) from [[#eq-np]] against $x = 1000\ \mathrm{K}/T$, using silicon's $\sqrt{N_\mathrm{c}N_\mathrm{v}}$ at $300\ \mathrm{K}$ scaled as $T^{3/2}$ for all curves and a gap $g$ in eV (slider; Ge $0.66$, GaAs $1.42$, SiC $3.2$). The slope is $-E_\mathrm{g}/2k_\mathrm{B}\ln10$, so the gap can be read from the gradient: a factor 2 in the exponent, not 1, because each excitation makes two carriers. The line at $10^{15}\ \mathrm{cm^{-3}}$ is a typical light doping level; where $n_\mathrm{i}$ crosses it the material becomes intrinsic. Wide-gap SiC and GaN stay extrinsic to several hundred degrees Celsius, which is why they are used in high-temperature power electronics.
:::

### Doping

Replacing a silicon atom by phosphorus (group 15) adds an electron that does not fit in the valence band. It is bound to the $\mathrm{P^+}$ core only weakly, because the attraction is screened by the dielectric constant of silicon and the electron moves with the small effective mass of the conduction band. The result is a **donor** level just below $E_\mathrm{c}$; similarly boron (group 13) gives an **acceptor** level just above $E_\mathrm{v}$. In Kröger–Vink language, $\mathrm{P_{Si}^\times} \rightleftharpoons \mathrm{P_{Si}^\bullet} + e'$.

::: proposition The hydrogenic donor {#prop-hydrogenic}
A donor electron bound to a singly charged core in a semiconductor of relative permittivity $\varepsilon_\mathrm{r}$ and effective mass $m^*$ has ionisation energy and orbital radius
$$
E_\mathrm{d} = \frac{m^*/m_e}{\varepsilon_\mathrm{r}^2}\times13.6\ \mathrm{eV}, \qquad a_\mathrm{d} = \frac{\varepsilon_\mathrm{r}}{m^*/m_e}\times0.529\ \text{Å}.
$$ {#eq-hydrogenic}
The model is valid when $a_\mathrm{d}$ is many lattice spacings, so that the crystal can be treated as a continuum; it ignores the chemical identity of the donor (the "central-cell correction"), which is why measured donor energies differ by element.
:::

::: proof
The hydrogen atom has $E = -m_ee^4/[2(4\pi\varepsilon_0)^2\hbar^2] = -13.6\ \mathrm{eV}$ and $a_0 = 4\pi\varepsilon_0\hbar^2/(m_ee^2) = 0.529\ \text{Å}$ ([[quantum-chemistry/hydrogen-atom]]). In the semiconductor, the Coulomb potential is screened, $\varepsilon_0 \to \varepsilon_\mathrm{r}\varepsilon_0$, and the electron's kinetic energy near the band edge is $\hbar^2k^2/2m^*$, so $m_e \to m^*$. Substituting into both formulas gives a binding energy scaled by $(m^*/m_e)/\varepsilon_\mathrm{r}^2$ and a radius scaled by $\varepsilon_\mathrm{r}/(m^*/m_e)$.
:::

::: example Donors in silicon and gallium arsenide {#ex-donor}
(a) For silicon ($\varepsilon_\mathrm{r} = 11.7$, conductivity effective mass $m^* = 0.26\,m_e$) estimate $E_\mathrm{d}$; the measured value for phosphorus is $0.045\ \mathrm{eV}$. (b) For GaAs ($\varepsilon_\mathrm{r} = 12.9$, $m^* = 0.067\,m_e$) find $E_\mathrm{d}$ and $a_\mathrm{d}$. (c) Silicon is doped with $1.0\times10^{16}\ \mathrm{cm^{-3}}$ phosphorus at $300\ \mathrm{K}$. Find $n$, $p$ and the resistivity if the electron mobility is $1350\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$.
::: solution
(a) $E_\mathrm{d} = 13.6 \times 0.26/11.7^2 = 0.026\ \mathrm{eV}$: the right order of magnitude, and about $k_\mathrm{B}T$ at room temperature, so donors are almost fully ionised. The measured $0.045\ \mathrm{eV}$ is larger because the electron's wavefunction has some amplitude in the central cell, where the screening model fails. (b) $E_\mathrm{d} = 13.6 \times 0.067/12.9^2 = 0.0055\ \mathrm{eV}$ (measured about $0.006\ \mathrm{eV}$), and $a_\mathrm{d} = 0.529 \times 12.9/0.067 = 102\ \text{Å}$, some 18 lattice spacings: the continuum model is well justified, which is why it works so much better for GaAs. (c) All donors are ionised, so $n = 1.0\times10^{16}\ \mathrm{cm^{-3}}$, and by [[#eq-np]] $p = n_\mathrm{i}^2/n = (1.0\times10^{10})^2/1.0\times10^{16} = 1.0\times10^4\ \mathrm{cm^{-3}}$. The conductivity is $\sigma = ne\mu_\mathrm{e} = 1.0\times10^{16} \times 1.602\times10^{-19} \times 1350 = 2.16\ \mathrm{S\,cm^{-1}}$, resistivity $0.46\ \Omega\,\mathrm{cm}$, compared with about $3\times10^5\ \Omega\,\mathrm{cm}$ for intrinsic silicon. One phosphorus atom per five million silicon atoms has increased the conductivity about $10^5$-fold.
:::
:::

::: warning Holes are not missing atoms, and donors are not "extra current" {#warn-holes}
A hole is an unoccupied *electronic state* in an otherwise full band, not a vacancy in the crystal. It behaves as a positive particle with its own effective mass because the collective motion of all the remaining electrons, when one state is empty, is equivalent to the motion of a single positive charge. A second misconception is that doping adds carriers on top of the intrinsic ones: by the mass-action law $np = n_\mathrm{i}^2$, adding donors *removes* holes. In the example above the hole concentration fell from $10^{10}$ to $10^4\ \mathrm{cm^{-3}}$. Majority and minority carriers are linked, which is the basis of the p–n junction.
:::

### Direct and indirect gaps

The band extrema need not occur at the same $k$. In **direct-gap** semiconductors (GaAs, InP, GaN, CdTe) the valence band maximum and the conduction band minimum both lie at $k = 0$; in **indirect-gap** semiconductors (Si, Ge, AlAs, GaP) the conduction band minimum lies elsewhere in the Brillouin zone. A photon of energy $1$–$3\ \mathrm{eV}$ has a wavevector $2\pi/\lambda \approx 10^7\ \mathrm{m^{-1}}$, a thousand times smaller than the zone size $\pi/a \approx 10^{10}\ \mathrm{m^{-1}}$, so optical transitions are essentially vertical in $k$. In an indirect semiconductor, absorption or emission at the gap energy requires a phonon to supply the momentum, a second-order process that is about a thousand times slower. That is why light-emitting diodes and laser diodes are made from direct-gap III–V and II–VI compounds and not from silicon, and why a silicon solar cell must be tens of micrometres thick to absorb sunlight near its gap, whereas a direct-gap absorber does the job in about a micrometre ([[materials-chemistry/energy-materials]]).

The gap of a semiconductor is a chemical property. Along an isoelectronic series of the same structure the gap rises with ionicity, because the bonding (valence) states become more anion-like and the antibonding (conduction) states more cation-like: Ge $0.66$, GaAs $1.42$, ZnSe $2.7\ \mathrm{eV}$. Down a group it falls as overlap and bandwidth increase: C (diamond) $5.5$, Si $1.12$, Ge $0.66$, grey Sn $0\ \mathrm{eV}$. Alloys such as $\mathrm{Al}_x\mathrm{Ga}_{1-x}\mathrm{As}$ and $\mathrm{In}_x\mathrm{Ga}_{1-x}\mathrm{N}$ have gaps that vary smoothly (approximately linearly, with a small "bowing" term) with composition, which is how LED colours are tuned. The photon energy and wavelength are related by $\lambda = hc/E = 1240\ \mathrm{nm\,eV}/E$.

::: example Choosing an alloy for a blue LED {#ex-ingan}
The gap of $\mathrm{In}_x\mathrm{Ga}_{1-x}\mathrm{N}$ is often described by $E_\mathrm{g}(x) = 3.42(1 - x) + 0.65x - bx(1 - x)\ \mathrm{eV}$, interpolating between GaN and InN with a bowing parameter $b$ (reported values range from about $1.4$ to $2.5\ \mathrm{eV}$; take $1.4\ \mathrm{eV}$). What indium fraction gives emission at $450\ \mathrm{nm}$? How large is the error if bowing is ignored?
::: solution
$E = 1239.8/450 = 2.755\ \mathrm{eV}$. Expanding, $3.42 - 2.77x - 1.4x + 1.4x^2 = 2.755$, that is $1.4x^2 - 4.17x + 0.665 = 0$, whose physical root is
$$
x = \frac{4.17 - \sqrt{4.17^2 - 4 \times 1.4 \times 0.665}}{2 \times 1.4} = \frac{4.17 - 3.697}{2.8} = 0.169.
$$
Without bowing, linear interpolation gives $x = (3.42 - 2.755)/2.77 = 0.240$, which would produce green-shifted emission: the bowing term matters. In practice the emission also depends on strain and on quantum confinement in the thin InGaN wells of the device, so the composition is tuned empirically around $x \approx 0.15$–$0.20$ for blue. Given the uncertainty in $b$, two significant figures ($x \approx 0.17$) is all the model justifies.
:::
:::

## When band theory fails

Band theory treats each electron as moving independently in an average potential. It fails when the repulsion between two electrons on the same atom, the **Hubbard $U$**, exceeds the bandwidth $W$. Nickel oxide has the rock salt structure with $\mathrm{Ni^{2+}}$ ($d^8$): in an octahedral field the $e_g$ orbitals hold two electrons in four states, so band theory predicts a partly filled $e_g$ band and a metal. In fact NiO is a transparent green insulator with a gap of about $4\ \mathrm{eV}$. The $e_g$ band is narrow ($W \approx 1$–$2\ \mathrm{eV}$) and moving an electron from one nickel to another, $\mathrm{Ni^{2+}} + \mathrm{Ni^{2+}} \rightarrow \mathrm{Ni^{3+}} + \mathrm{Ni^{+}}$, costs $U$ of several eV. Such **Mott insulators** (and the related charge-transfer insulators, in which the lowest excitation moves an electron from oxygen to the metal) include most oxides of the late $3d$ metals, the parent compounds of the cuprate superconductors, and many of the magnetic materials of [[materials-chemistry/magnetic-optical]]. The localised, ligand-field description of [[coordination-chemistry/crystal-field-theory]] is then a better starting point than band theory. Nevill Mott argued in 1949 that a lattice of hydrogen atoms would become a metal only below a critical spacing, when $n^{1/3}a_\mathrm{H} \gtrsim 0.25$; the same criterion, with the donor radius $a_\mathrm{d}$ of [[#eq-hydrogenic]], predicts the doping level at which a semiconductor becomes metallic.

## Where this leads

Band structures and carrier statistics underlie the rest of the course. [[materials-chemistry/magnetic-optical]] connects band gaps with colour, luminescence and phosphors, and narrow bands with magnetism; [[materials-chemistry/nanomaterials]] shows how bands break up into discrete levels in quantum dots and how the band structure of graphene makes its electrons massless; [[materials-chemistry/energy-materials]] uses gaps, doping and junctions in solar cells and thermoelectrics, and asks why some metals superconduct. The physics treatment, including the nearly-free-electron model and band structures of real crystals, is in Physics Atlas ([condensed matter: band structure](/learn/physics/lesson.php?c=condensed-matter&l=band-structure) and [semiconductors](/learn/physics/lesson.php?c=condensed-matter&l=semiconductors)), and DFT calculations of bands in [[computational-chemistry/density-functional-theory]].

::: history
Paul Drude's classical electron-gas model of metals (1900) explained Ohm's law but not the small electronic heat capacity; Arnold Sommerfeld resolved this in 1927–28 by applying Fermi–Dirac statistics to the electron gas. Felix Bloch's 1928 thesis in Leipzig proved the theorem that bears his name, and Rudolf Peierls (1929–30) and Léon Brillouin (1930) introduced energy gaps at the zone boundaries and the zones themselves. Alan Wilson explained in 1931 the difference between metals, insulators and semiconductors through band filling, and showed how impurities control semiconductors. John Bardeen, Walter Brattain and William Shockley built the point-contact and junction transistors at Bell Laboratories in 1947–48 (Nobel Prize in Physics 1956). Nevill Mott's 1949 paper on the metal–non-metal transition and John Hubbard's model (1963) founded the theory of correlated electrons. Hideki Shirakawa, Alan MacDiarmid and Alan Heeger reported in 1977 that doped polyacetylene conducts like a metal, recognised by the 2000 Nobel Prize in Chemistry; and the blue GaN light-emitting diode of Isamu Akasaki, Hiroshi Amano and Shuji Nakamura (early 1990s) received the 2014 Nobel Prize in Physics.
:::

::: summary
- Bloch's theorem labels one-electron states in a crystal by a wavevector $k$ in the first Brillouin zone; a band built from $N$ orbitals holds $N$ values of $k$.
- For a tight-binding chain $E(k) = \alpha + 2\beta\cos ka$, with bandwidth $4\lvert\beta\rvert$ ($2z\lvert\beta\rvert$ in general): diffuse orbitals and short distances give wide bands; the bottom of a band is bonding, the top antibonding.
- A half-filled one-dimensional band is unstable to dimerisation (Peierls distortion), which opens a gap, as in polyacetylene.
- The density of states $g(E)$ counts states per energy; for free electrons $g \propto E^{1/2}$ and $E_\mathrm{F} = (\hbar^2/2m_e)(3\pi^2n)^{2/3}$, a few eV, far above $k_\mathrm{B}T$.
- In semiconductors $n = N_\mathrm{c}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}$, $p = N_\mathrm{v}e^{-(\mu - E_\mathrm{v})/k_\mathrm{B}T}$ and $np = n_\mathrm{i}^2 = N_\mathrm{c}N_\mathrm{v}e^{-E_\mathrm{g}/k_\mathrm{B}T}$, whatever the doping.
- Donors and acceptors are hydrogen-like states with binding energies scaled by $(m^*/m_e)/\varepsilon_\mathrm{r}^2$, a few to tens of meV, so they are ionised at room temperature.
- Direct-gap semiconductors absorb and emit light efficiently; indirect-gap ones need phonons. Gaps rise with ionicity and fall down a group.
- When on-site repulsion $U$ exceeds the bandwidth $W$, band theory fails and the solid is a Mott or charge-transfer insulator (NiO).
:::

## Exercises

::: exercise Bandwidth {level=1 check="8.0"}
A chain of atoms has $\beta = -2.0\ \mathrm{eV}$ between neighbours. What is the bandwidth, and at what $k$ do the bottom and top of the band occur? (Enter the bandwidth in eV.)
::: solution
$W = 4\lvert\beta\rvert = 8.0\ \mathrm{eV}$. The bottom, $\alpha + 2\beta = \alpha - 4.0\ \mathrm{eV}$, is at $k = 0$; the top, $\alpha + 4.0\ \mathrm{eV}$, is at the zone boundary $k = \pm\pi/a$.
:::
:::

::: exercise Absorption edge of GaAs {level=1 check="873"}
GaAs has a direct gap of $1.42\ \mathrm{eV}$ at $300\ \mathrm{K}$. At what wavelength does its absorption begin, and in what region of the spectrum? (Enter the wavelength in nm, to three significant figures.)
::: solution
$\lambda = 1240\ \mathrm{nm\,eV}/1.42\ \mathrm{eV} = 873\ \mathrm{nm}$ (using $hc = 1239.8\ \mathrm{nm\,eV}$), in the near infrared. GaAs absorbs all visible light and looks black-grey; GaAs LEDs and lasers emit near $870\ \mathrm{nm}$, used in remote controls and optical communication.
:::
:::

::: exercise Fermi energy of aluminium {level=1 check="11.7"}
Aluminium has $6.02\times10^{28}$ atoms per cubic metre and contributes three valence electrons per atom. Calculate $E_\mathrm{F}$ in the free-electron model. (Enter $E_\mathrm{F}$ in eV, to three significant figures.)
::: solution
$n = 3 \times 6.02\times10^{28} = 1.81\times10^{29}\ \mathrm{m^{-3}}$. $E_\mathrm{F} = (\hbar^2/2m_e)(3\pi^2n)^{2/3} = 6.104\times10^{-39} \times (5.359\times10^{30})^{2/3}\ \mathrm{J} = 6.104\times10^{-39} \times 3.064\times10^{20} = 1.870\times10^{-18}\ \mathrm{J} = 11.7\ \mathrm{eV}$. (Here $\hbar^2/2m_e = 6.104\times10^{-39}\ \mathrm{J\,m^2}$.)
:::
:::

::: exercise Minority carriers {level=2 check="1e5"}
Silicon at $300\ \mathrm{K}$ ($n_\mathrm{i} = 1.0\times10^{10}\ \mathrm{cm^{-3}}$) is doped with $1.0\times10^{15}\ \mathrm{cm^{-3}}$ arsenic. Find the electron and hole concentrations, and say on which side of mid-gap the Fermi level lies. (Enter $p$ in $\mathrm{cm^{-3}}$.)
::: solution
Arsenic is a donor; fully ionised, $n = 1.0\times10^{15}\ \mathrm{cm^{-3}}$. Then $p = n_\mathrm{i}^2/n = 10^{20}/10^{15} = 1.0\times10^5\ \mathrm{cm^{-3}}$. The material is n-type, so $\mu$ lies above mid-gap, by $k_\mathrm{B}T\ln(n/n_\mathrm{i}) = 0.02585\ln(10^5) = 0.30\ \mathrm{eV}$.
:::
:::

::: exercise Gap and carrier density {level=2 check="0.0030"}
Assuming the same $N_\mathrm{c}N_\mathrm{v}$ for both, by what factor is $n_\mathrm{i}$ of GaAs ($E_\mathrm{g} = 1.42\ \mathrm{eV}$) smaller than that of Si ($1.12\ \mathrm{eV}$) at $300\ \mathrm{K}$? (Enter the ratio $n_\mathrm{i}(\mathrm{GaAs})/n_\mathrm{i}(\mathrm{Si})$, two significant figures.)
::: solution
$\exp[-(1.42 - 1.12)/(2 \times 0.02585)] = \exp(-5.80) = 0.0030$. (In reality GaAs has a much smaller $N_\mathrm{c}$, because $m_\mathrm{e}^*$ is small, and its $n_\mathrm{i}$ is about $2\times10^6\ \mathrm{cm^{-3}}$, smaller still: the ratio to Si is about $2\times10^{-4}$.)
:::
:::

::: exercise Donors in germanium {level=2 check="6.4"}
Germanium has $\varepsilon_\mathrm{r} = 16.0$ and conductivity effective mass $m^* = 0.12\,m_e$. Estimate the donor ionisation energy and orbital radius from the hydrogenic model. Are donors ionised at $77\ \mathrm{K}$? (Enter $E_\mathrm{d}$ in meV, two significant figures.)
::: solution
$E_\mathrm{d} = 13.6\ \mathrm{eV} \times 0.12/256 = 6.4\ \mathrm{meV}$ (measured about $10$–$13\ \mathrm{meV}$ for P, As, Sb). $a_\mathrm{d} = 0.529 \times 16.0/0.12 = 71\ \text{Å}$. At $77\ \mathrm{K}$, $k_\mathrm{B}T = 6.6\ \mathrm{meV}$, comparable to $E_\mathrm{d}$; with $N_\mathrm{c}$ much larger than typical donor concentrations, most donors are still ionised, which is why germanium detectors work at liquid-nitrogen temperature.
:::
:::

::: exercise Hückel theory as a band {level=3 check="8"}
Apply [[#eq-tb]] to a *ring* of $N = 6$ atoms (periodic boundary conditions with $N = 6$) to find the six orbital energies. Fill them with six electrons and give the total energy as $6\alpha + x\beta$. Compare with three isolated double bonds ($6\alpha + 6\beta$). (Enter $x$.)
::: solution
$k = 2\pi j/6a$, $j = 0, \pm1, \pm2, 3$, so $E_j = \alpha + 2\beta\cos(\pi j/3)$: $\alpha + 2\beta$ ($j = 0$), $\alpha + \beta$ ($j = \pm1$, twice), $\alpha - \beta$ ($j = \pm2$, twice), $\alpha - 2\beta$ ($j = 3$). These are the Hückel energies of benzene. Six electrons fill the three lowest: $2(\alpha + 2\beta) + 4(\alpha + \beta) = 6\alpha + 8\beta$, so $x = 8$. Compared with $6\alpha + 6\beta$ the delocalisation energy is $2\beta$ (negative, stabilising). A ring with $4n + 2$ electrons fills a closed shell; this is aromaticity seen as a band of six $k$-points ([[organic-2/aromaticity]]).
:::
:::

::: exercise The intrinsic Fermi level {level=3 check="-7.4"}
(a) Starting from the expressions for $n$ and $p$ in [[#prop-mass-action]], derive the intrinsic Fermi level. (b) For silicon at $300\ \mathrm{K}$ ($N_\mathrm{c} = 3.2\times10^{19}$, $N_\mathrm{v} = 1.8\times10^{19}\ \mathrm{cm^{-3}}$), how far is it from mid-gap? (c) Why is it below mid-gap? (Enter $\mu - \tfrac12(E_\mathrm{c} + E_\mathrm{v})$ in meV, two significant figures.)
::: solution
(a) $n = p$ gives $N_\mathrm{c}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T} = N_\mathrm{v}e^{-(\mu - E_\mathrm{v})/k_\mathrm{B}T}$. Taking logarithms: $\ln N_\mathrm{c} - (E_\mathrm{c} - \mu)/k_\mathrm{B}T = \ln N_\mathrm{v} - (\mu - E_\mathrm{v})/k_\mathrm{B}T$, so $2\mu = E_\mathrm{c} + E_\mathrm{v} + k_\mathrm{B}T\ln(N_\mathrm{v}/N_\mathrm{c})$. (b) $\tfrac12 \times 25.85\ \mathrm{meV} \times \ln(1.8/3.2) = 12.93 \times (-0.575) = -7.4\ \mathrm{meV}$. (c) The conduction band has the larger effective density of states, so to keep $n = p$ the Fermi level must sit slightly closer to the valence band. The shift is tiny compared with the $1.12\ \mathrm{eV}$ gap, so "mid-gap" is an excellent approximation for silicon; in InSb, where $m_\mathrm{e}^* \ll m_\mathrm{h}^*$, it is much larger.
:::
:::

::: exercise Resistivity of doped silicon {level=2 check="0.46"}
Calculate the resistivity of silicon containing $1.0\times10^{16}\ \mathrm{cm^{-3}}$ phosphorus at $300\ \mathrm{K}$, taking the electron mobility as $1350\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$ and neglecting holes. (Enter the resistivity in $\Omega\,\mathrm{cm}$, two significant figures.)
::: solution
$\sigma = ne\mu = 1.0\times10^{16} \times 1.602\times10^{-19} \times 1350 = 2.16\ \mathrm{S\,cm^{-1}}$, so $\rho = 1/\sigma = 0.46\ \Omega\,\mathrm{cm}$. (At this doping the measured mobility is about $1200\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$ because of scattering by the ionised donors, giving $0.5\ \Omega\,\mathrm{cm}$.)
:::
:::
