A silicon wafer straight from the crystal puller, with no impurities added, has about $10^{10}$ free electrons in every cubic centimetre at room temperature — one for every five trillion atoms. Add phosphorus at one part per million and the number jumps to $5\times10^{16}$; warm the pure wafer from $300$ to $400\,\mathrm K$ and it rises more than three hundredfold. The behaviour of every device in this course follows from such numbers, so we need a reliable way to compute them. This chapter provides it.

The method combines two ingredients. The **density of states** tells us how many electron states are available at each energy near the band edges found in [[semiconductor-devices/crystals-energy-bands]]. The **Fermi–Dirac distribution** tells us the probability that a state at a given energy is occupied in thermal equilibrium. Their product, integrated over the band, gives the electron concentration $n$; the same calculation for empty states in the valence band gives the hole concentration $p$. The results are two short exponential formulas, the law $np = n_i^2$, and a single parameter — the **Fermi level** — whose position in the gap summarises the state of the material and is the key to drawing band diagrams of devices.

Throughout the course we use the following values for silicon at $T = 300\,\mathrm K$, which are those of Pierret's text and consistent with each other:

| quantity | value |
|---|---|
| thermal energy $kT$ | $0.02585\,\mathrm{eV}$ (thermal voltage $V_T = kT/q = 25.85\,\mathrm{mV}$) |
| band gap $E_g$ | $1.12\,\mathrm{eV}$ |
| effective densities of states | $N_c = 3.22\times10^{19}\,\mathrm{cm^{-3}}$, $N_v = 1.83\times10^{19}\,\mathrm{cm^{-3}}$ |
| intrinsic concentration $n_i$ | $1.0\times10^{10}\,\mathrm{cm^{-3}}$ |
| relative permittivity $\varepsilon_r$ | $11.7$ |

Device physics conventionally measures concentrations per cubic centimetre and lengths in centimetres or micrometres; we follow that convention in the text and convert to SI where an answer is to be checked.

The statistical mechanics behind the Fermi–Dirac distribution is derived in [Quantum statistics](/learn/physics/lesson.php?c=statistical-mechanics&l=quantum-statistics) in the Physics atlas; here we state it and use it.

## Electrons, holes and the intrinsic semiconductor

At absolute zero the valence band of pure silicon is full and the conduction band empty, and no current can flow. At room temperature a few electrons have been thermally excited across the gap. Each leaves behind an empty state in the valence band, a hole. In bond language, a valence electron has broken free of its covalent bond and wanders through the crystal, and the broken bond can be filled by a neighbouring valence electron, so the vacancy moves too.

::: definition Intrinsic semiconductor {#def-intrinsic}
A semiconductor is **intrinsic** when its free carriers come only from thermal excitation across the gap, so that the electron concentration $n$ in the conduction band equals the hole concentration $p$ in the valence band. Their common value is the **intrinsic carrier concentration** $n_i$:

$$
n = p = n_i \qquad\text{(intrinsic material)}.
$$
:::

A semiconductor is intrinsic only if the impurities in it are much fewer than $n_i$. For silicon that means fewer than about $10^{9}$ electrically active impurities per cubic centimetre, a purity of one part in $10^{13}$ that is not achieved in practice; even the best float-zone silicon has about $10^{12}\,\mathrm{cm^{-3}}$. Intrinsic silicon is therefore a reference state rather than a real material. It is a very useful reference, because $n_i$ appears in almost every device equation.

## The density of states

Near the bottom of the conduction band, the energy of an electron is $E = E_c + \hbar^2k^2/(2m_n^*)$, with $m_n^*$ the density-of-states effective mass of [[semiconductor-devices/crystals-energy-bands]]. We need to count how many states lie in a small energy interval.

::: theorem Density of states of a parabolic band {#thm-dos}
For a band $E = E_c + \hbar^2k^2/(2m_n^*)$, the number of electron states per unit volume per unit energy is

$$
g_c(E) = \frac{1}{2\pi^2}\left(\frac{2m_n^*}{\hbar^2}\right)^{3/2}\sqrt{E - E_c}, \qquad E \ge E_c,
$$ {#eq-dos}

and zero inside the gap. Near the top of the valence band, $g_v(E)$ has the same form with $m_p^*$ and $\sqrt{E_v - E}$.
:::

::: proof
Take a cube of side $L$ with periodic boundary conditions. Each component of $\mathbf k$ takes values $2\pi m/L$, so each allowed $\mathbf k$ occupies a volume $(2\pi/L)^3$ of $\mathbf k$-space. The states with energy below $E$ fill a sphere of radius $k = \sqrt{2m_n^*(E - E_c)}/\hbar$; counting two spin states per $\mathbf k$, the number of states per unit volume below $E$ is

$$
N(E) = \frac{2}{L^3}\cdot\frac{\tfrac43\pi k^3}{(2\pi/L)^3} = \frac{k^3}{3\pi^2} = \frac{1}{3\pi^2}\left(\frac{2m_n^*(E - E_c)}{\hbar^2}\right)^{3/2}.
$$

Differentiating with respect to $E$ gives $g_c = \mathrm dN/\mathrm dE$, which is [[#eq-dos]].
:::

The density of states rises as the square root of the energy above the band edge. For silicon the masses that make the formula fit the six-valley conduction band and the two hole bands at $300\,\mathrm K$ are $m_n^* = 1.18\,m_0$ and $m_p^* = 0.81\,m_0$.

## The Fermi–Dirac distribution

Electrons are fermions: no two can occupy the same state. In thermal equilibrium at temperature $T$ the probability that a state of energy $E$ is occupied is given by a universal function.

::: definition Fermi–Dirac distribution and Fermi level {#def-fermi}
In thermal equilibrium the probability that an electron state of energy $E$ is occupied is

$$
f(E) = \frac{1}{1 + e^{(E - E_F)/kT}},
$$ {#eq-fd}

where $k = 8.617\times10^{-5}\,\mathrm{eV/K}$ is Boltzmann's constant and $E_F$ is the **Fermi level**, the energy at which the occupation probability is exactly $\tfrac12$. The probability that the state is **empty** is $1 - f(E) = 1/(1 + e^{(E_F - E)/kT})$.
:::

At $T = 0$, $f$ is a step: every state below $E_F$ is full and every state above is empty. At finite temperature the step is rounded over a few $kT$: $f$ falls from $0.95$ to $0.05$ as $E$ goes from $E_F - 3kT$ to $E_F + 3kT$, an interval of about $0.16\,\mathrm{eV}$ at room temperature. In thermodynamic language $E_F$ is the electrochemical potential of the electrons, and its most important property is that **in equilibrium the Fermi level is the same everywhere in a system**, however many materials are in contact. If it were not, electrons would flow from where $E_F$ is high to where it is low until it was equal. This is the rule from which every equilibrium band diagram in the course is drawn.

Far above the Fermi level the exponential in the denominator dominates and the distribution reduces to the classical Boltzmann factor:

$$
f(E) \approx e^{-(E - E_F)/kT} \qquad (E - E_F \gtrsim 3kT).
$$ {#eq-boltz}

The error is $e^{(E_F-E)/kT}$ relative, about $5\,\%$ at $3kT$ and $2\,\%$ at $4kT$.

::: widget plot
f: 1/(1 + exp(x/(8.617e-5*T))); exp(-x/(8.617e-5*T)); 1 - 1/(1 + exp(x/(8.617e-5*T)))
x: -0.3, 0.3
y: 0, 1.2
sliders: T=300:50:800:10
labels: f(E); e^{-(E-E_F)/kT}; 1-f(E)
caption: The Fermi–Dirac occupation $f(E)$ against $E - E_F$ in electronvolts, the Boltzmann approximation, and the probability $1 - f$ that a state is empty (the hole occupancy). Hover near $E - E_F = 0.08\,\mathrm{eV}$ (about $3kT$ at $300\,\mathrm K$): $f$ and the Boltzmann curve have almost merged. Raise $T$: the step broadens in proportion to $T$, but $f(E_F)$ stays $\tfrac12$. Notice the symmetry: $1 - f$ at $E_F - x$ equals $f$ at $E_F + x$.
:::

## Carrier concentrations in equilibrium

The electron concentration is the number of states per unit volume at each energy times the probability that each is occupied, integrated over the conduction band:

$$
n = \int_{E_c}^{\infty} g_c(E)\,f(E)\,\mathrm dE, \qquad p = \int_{-\infty}^{E_v} g_v(E)\,\bigl[1 - f(E)\bigr]\,\mathrm dE.
$$ {#eq-n-integral}

(The upper limit is set to infinity because $f$ dies away within a few $kT$ of the band edge, long before the parabolic model fails.)

::: theorem Electron and hole concentrations (non-degenerate) {#thm-np}
If the Fermi level lies in the gap at least about $3kT$ from both band edges, then

$$
n = N_c\,e^{-(E_c - E_F)/kT}, \qquad p = N_v\,e^{-(E_F - E_v)/kT},
$$ {#eq-n-p}

where the **effective densities of states** are

$$
N_c = 2\left(\frac{2\pi m_n^* kT}{h^2}\right)^{3/2}, \qquad N_v = 2\left(\frac{2\pi m_p^* kT}{h^2}\right)^{3/2}.
$$ {#eq-nc}
:::

::: proof
In the conduction band $E - E_F \ge E_c - E_F \ge 3kT$, so [[#eq-boltz]] applies. With $x = (E - E_c)/kT$,

$$
n = \frac{1}{2\pi^2}\left(\frac{2m_n^*}{\hbar^2}\right)^{3/2}e^{-(E_c - E_F)/kT}(kT)^{3/2}\int_0^\infty \sqrt{x}\,e^{-x}\,\mathrm dx .
$$

The integral is $\Gamma(\tfrac32) = \sqrt\pi/2$. Collecting constants and using $\hbar = h/2\pi$,

$$
\frac{1}{2\pi^2}\left(\frac{2m_n^*kT}{\hbar^2}\right)^{3/2}\frac{\sqrt\pi}{2} = \frac{1}{2\pi^2}\cdot\frac{(8\pi^2m_n^*kT)^{3/2}}{h^3}\cdot\frac{\sqrt\pi}{2} = 2\left(\frac{2\pi m_n^*kT}{h^2}\right)^{3/2} = N_c,
$$

since $(8\pi^2)^{3/2}\sqrt\pi/(4\pi^2) = 2(2\pi)^{3/2}$. The hole result follows in the same way, using $1 - f(E) \approx e^{-(E_F - E)/kT}$ for $E_F - E \ge 3kT$.
:::

The formulas have a simple reading: the conduction band behaves as if all its states, $N_c$ per cubic centimetre, were concentrated at the single energy $E_c$, each occupied with the Boltzmann probability $e^{-(E_c - E_F)/kT}$. Moving $E_F$ up by $kT\ln 10 = 59.5\,\mathrm{meV}$ multiplies $n$ by ten and divides $p$ by ten.

::: example Effective density of states {#ex-nc}
Evaluate $N_c$ for silicon at $300\,\mathrm K$ with $m_n^* = 1.18\,m_0$, and find how $N_c$ scales with temperature.
::: solution
With $kT = 1.381\times10^{-23}\times300 = 4.142\times10^{-21}\,\mathrm J$,

$$
\frac{2\pi m_n^*kT}{h^2} = \frac{2\pi(1.18)(9.109\times10^{-31})(4.142\times10^{-21})}{(6.626\times10^{-34})^2} = 6.39\times10^{16}\,\mathrm{m^{-2}},
$$

so $N_c = 2(6.39\times10^{16})^{3/2}\,\mathrm{m^{-3}} = 3.22\times10^{25}\,\mathrm{m^{-3}} = 3.22\times10^{19}\,\mathrm{cm^{-3}}$. The same formula with $0.81\,m_0$ gives $N_v = 1.83\times10^{19}\,\mathrm{cm^{-3}}$. Both scale as $T^{3/2}$: at $400\,\mathrm K$, $N_c = 3.22\times10^{19}\times(4/3)^{3/2} = 4.96\times10^{19}\,\mathrm{cm^{-3}}$. Compare with $5\times10^{22}$ atoms per cubic centimetre: only about one state in a thousand per atom matters, those within a few $kT$ of the band edge.
:::
:::

### The mass-action law and the intrinsic level

Multiplying the two expressions in [[#eq-n-p]], the Fermi level cancels:

::: theorem Mass-action law {#thm-mass-action}
In a non-degenerate semiconductor in thermal equilibrium,

$$
np = N_cN_v\,e^{-E_g/kT} = n_i^2, \qquad n_i = \sqrt{N_cN_v}\,e^{-E_g/2kT},
$$ {#eq-mass-action}

independently of doping.
:::

Doping changes $n$ and $p$ in opposite directions but leaves their product fixed. This is the same law that governs $[\mathrm{H^+}][\mathrm{OH^-}]$ in water, and for the same reason: electron–hole generation and recombination is a reaction $\text{(bond)} \rightleftharpoons e^- + h^+$ whose equilibrium constant depends only on temperature.

With the constants of our table, $\sqrt{N_cN_v}\,e^{-E_g/2kT} = 2.43\times10^{19}\times e^{-21.66} = 9.5\times10^{9}\,\mathrm{cm^{-3}}$. The measured value, $9.7\times10^{9}\,\mathrm{cm^{-3}}$, agrees well; we round it to $n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$ throughout. (Older books use $1.45$ or $1.5\times10^{10}$; the difference changes calculated leakage currents by a factor of two, so always state which value you use.)

The Fermi level of the intrinsic material is called the **intrinsic level** $E_i$. Setting $n = p$ in [[#eq-n-p]] and solving,

$$
E_i = \frac{E_c + E_v}{2} + \frac{kT}{2}\ln\frac{N_v}{N_c}.
$$ {#eq-ei}

For silicon the correction is $\tfrac12(0.02585)\ln(1.83/3.22) = -7.3\,\mathrm{meV}$: $E_i$ lies $7\,\mathrm{meV}$ below midgap, which is negligible for most purposes. Writing $n_i = N_ce^{-(E_c - E_i)/kT} = N_ve^{-(E_i - E_v)/kT}$ and dividing into [[#eq-n-p]] gives the most convenient form of all:

$$
n = n_i\,e^{(E_F - E_i)/kT}, \qquad p = n_i\,e^{(E_i - E_F)/kT}.
$$ {#eq-ni-form}

The distance of the Fermi level from the middle of the gap tells you directly how many carriers there are: above $E_i$ the material is n-type, below it p-type.

## Doping

Pure silicon is useless for devices. Its usefulness comes from **dopants**, impurity atoms that replace silicon atoms in the lattice and add or remove electrons.

::: definition Donors and acceptors {#def-dopants}
A **donor** is an impurity with one more valence electron than the atom it replaces — phosphorus, arsenic or antimony (group V) in silicon. Four of its electrons form bonds; the fifth is bound only weakly and is easily released into the conduction band, leaving a fixed positive ion $N_D^+$. An **acceptor** has one fewer valence electron — boron, and less often aluminium, gallium or indium (group III). It readily accepts an electron from the valence band to complete its fourth bond, leaving a fixed negative ion $N_A^-$ and a mobile hole. Material with more donors than acceptors is **n-type**, with electrons as **majority carriers** and holes as **minority carriers**; with more acceptors it is **p-type**.
:::

How weakly is the fifth electron bound? The donor ion and its electron resemble a hydrogen atom embedded in a dielectric medium of permittivity $\varepsilon_r\varepsilon_0$, with the electron carrying the effective mass $m^*$. The hydrogen binding energy, $13.6\,\mathrm{eV}$, scales as $m/\varepsilon_r^2$, and the Bohr radius, $0.0529\,\mathrm{nm}$, as $\varepsilon_r/m$:

$$
E_d \approx 13.6\,\mathrm{eV}\times\frac{m^*/m_0}{\varepsilon_r^2}, \qquad a_d \approx 0.0529\,\mathrm{nm}\times\frac{\varepsilon_r}{m^*/m_0}.
$$ {#eq-hydrogenic}

With the conductivity mass $0.26\,m_0$ and $\varepsilon_r = 11.7$, $E_d \approx 13.6\times0.26/137 = 0.026\,\mathrm{eV}$ and $a_d \approx 2.4\,\mathrm{nm}$, an orbit spanning several hundred lattice sites, which justifies treating the crystal as a continuum. Measured ionisation energies are somewhat larger because the core of the impurity matters at short range: $45\,\mathrm{meV}$ for phosphorus, $54\,\mathrm{meV}$ for arsenic, $39\,\mathrm{meV}$ for antimony (all below $E_c$), and $45\,\mathrm{meV}$ for boron (above $E_v$). All are comparable with $kT = 26\,\mathrm{meV}$, so at room temperature dopants are almost completely ionised. In a band diagram donors are drawn as short dashes at $E_d$ just below $E_c$ and acceptors at $E_a$ just above $E_v$.

::: example Is phosphorus fully ionised? {#ex-ionisation}
Silicon is doped with $N_D = 10^{16}\,\mathrm{cm^{-3}}$ phosphorus at $300\,\mathrm K$. Find $n$, $p$, the Fermi level relative to $E_c$ and to $E_i$, and check the assumption of full ionisation. A donor level is occupied with probability $1/(1 + \tfrac12 e^{(E_d - E_F)/kT})$, the factor $\tfrac12$ arising because the neutral donor can hold an electron of either spin but not two.
::: solution
Assume full ionisation and $N_D \gg n_i$: then $n = N_D = 10^{16}\,\mathrm{cm^{-3}}$ and, by [[#thm-mass-action]],

$$
p = \frac{n_i^2}{n} = \frac{(10^{10})^2}{10^{16}} = 10^{4}\,\mathrm{cm^{-3}}.
$$

From [[#eq-n-p]] and [[#eq-ni-form]],

$$
E_c - E_F = kT\ln\frac{N_c}{n} = 0.02585\ln(3220) = 0.209\,\mathrm{eV}, \qquad E_F - E_i = kT\ln\frac{n}{n_i} = 0.02585\ln(10^6) = 0.357\,\mathrm{eV}.
$$

(The two agree: $E_c - E_i = 0.56 + 0.0073 = 0.567\,\mathrm{eV}$, and $0.567 - 0.357 = 0.210\,\mathrm{eV}$.) The donor level is at $E_c - 0.045\,\mathrm{eV}$, so $E_d - E_F = 0.209 - 0.045 = 0.164\,\mathrm{eV} = 6.34\,kT$. The fraction of donors still holding their electron is

$$
\frac{1}{1 + \tfrac12 e^{6.34}} = \frac{1}{1 + 284} = 0.0035,
$$

so $99.65\,\%$ are ionised and the assumption was excellent. The minority holes are outnumbered by the majority electrons by a factor of $10^{12}$.
:::
:::

### Charge neutrality

In a uniformly doped region in equilibrium there can be no net charge, or there would be an electric field that moved the carriers until it vanished. Positive charges are holes and ionised donors, negative ones electrons and ionised acceptors.

::: theorem Carrier concentrations in a doped semiconductor {#thm-neutrality}
In uniformly doped, non-degenerate material with full ionisation, charge neutrality $p + N_D = n + N_A$ and the mass-action law give

$$
n = \frac{N_D - N_A}{2} + \sqrt{\left(\frac{N_D - N_A}{2}\right)^2 + n_i^2}, \qquad p = \frac{n_i^2}{n}.
$$ {#eq-neutrality}

If $N_D - N_A \gg n_i$, then $n \approx N_D - N_A$; if $N_A - N_D \gg n_i$, then $p \approx N_A - N_D$ and $n = n_i^2/p$.
:::

::: proof
Substitute $p = n_i^2/n$ into $p + N_D = n + N_A$ and multiply by $n$: $n^2 - (N_D - N_A)n - n_i^2 = 0$. The quadratic has one positive root, which is [[#eq-neutrality]]. When $\abs{N_D - N_A} \gg n_i$, expand the square root: for $N_D > N_A$ it is approximately $(N_D - N_A)/2 + n_i^2/(N_D - N_A)$, giving $n \approx N_D - N_A$; for $N_A > N_D$ the two terms nearly cancel and $n \approx n_i^2/(N_A - N_D)$.
:::

When both kinds of dopant are present the material is **compensated**: the donors' extra electrons fill the acceptors' empty bonds, and only the difference produces free carriers. Compensation is not a curiosity — it is how every device is made. A p-type well is formed in an n-type wafer by implanting more boron than the phosphorus already there, and the transistors in the well see the net doping $N_A - N_D$.

::: example A compensated layer {#ex-compensated}
An n-type wafer with $N_D = 10^{16}\,\mathrm{cm^{-3}}$ receives an arsenic implant that adds $2\times10^{16}\,\mathrm{cm^{-3}}$ more donors, and then a boron implant of $N_A = 1.0\times10^{16}\,\mathrm{cm^{-3}}$. Find $n$, $p$ and $E_F - E_i$ at $300\,\mathrm K$. What would a resistivity measurement suggest the donor concentration is?
::: solution
The total donor concentration is $N_D = 3\times10^{16}$ and $N_A = 10^{16}\,\mathrm{cm^{-3}}$, so the net doping is $2\times10^{16}\,\mathrm{cm^{-3}}$, enormously larger than $n_i$. By [[#thm-neutrality]], $n = 2.0\times10^{16}\,\mathrm{cm^{-3}}$, $p = 10^{20}/(2\times10^{16}) = 5\times10^{3}\,\mathrm{cm^{-3}}$ and

$$
E_F - E_i = 0.02585\ln(2\times10^{6}) = 0.375\,\mathrm{eV}.
$$

A resistivity measurement counts the free electrons, so it would suggest $2\times10^{16}\,\mathrm{cm^{-3}}$ donors. In fact there are $4\times10^{16}\,\mathrm{cm^{-3}}$ ionised impurities in total, and they all scatter carriers; the mobility will be lower than in uncompensated material with the same $n$, as we shall see in [[semiconductor-devices/carrier-transport]].
:::
:::

::: widget plot
f: 8.617e-5*T*ln(10^x/(2e10*(T/300)^1.5*exp(-6499*(1/T - 1/300))) + sqrt((10^x/(2e10*(T/300)^1.5*exp(-6499*(1/T - 1/300))))^2 + 1)); 0.56; -0.56
x: 8, 19
y: -0.65, 0.65
sliders: T=300:200:600:5
labels: E_F - E_i; E_c - E_i; E_v - E_i
caption: The Fermi level relative to $E_i$ (in eV) against the net donor concentration $\log_{10}(N_D - N_A)$ in $\mathrm{cm^{-3}}$, from [[#eq-neutrality]], with $n_i(T)$ taken from [[#eq-ni-t]] below; the same curve mirrored below zero describes p-type doping. The band edges are drawn at $\pm0.56\,\mathrm{eV}$. At $300\,\mathrm K$ the Fermi level rises by $59.5\,\mathrm{meV}$ per decade of doping once $N_D \gg n_i$; below $10^{10}$ the material is effectively intrinsic. Raise $T$: $n_i$ grows and the flat intrinsic region extends to higher doping. Above about $10^{18}\,\mathrm{cm^{-3}}$ the curve approaches $E_c$ and the non-degenerate formulas cease to be valid.
:::

::: quiz
Silicon at $300\,\mathrm K$ has $p = 10^{17}\,\mathrm{cm^{-3}}$. Where is the Fermi level?
- [ ] $0.417\,\mathrm{eV}$ above $E_i$
- [x] $0.417\,\mathrm{eV}$ below $E_i$, about $0.135\,\mathrm{eV}$ above $E_v$
- [ ] Exactly at the acceptor level
- [ ] $0.135\,\mathrm{eV}$ below $E_c$
::: solution
P-type material has $E_F$ below $E_i$, by $kT\ln(p/n_i) = 0.02585\ln(10^7) = 0.417\,\mathrm{eV}$. Measured from the valence band, $E_F - E_v = kT\ln(N_v/p) = 0.02585\ln(183) = 0.135\,\mathrm{eV}$. The Fermi level is about $0.09\,\mathrm{eV}$ above the boron level ($E_v + 0.045$), which is why the acceptors are almost all ionised.
:::
:::

## Temperature dependence

Two things change with temperature: the intrinsic concentration, and the fraction of dopants that are ionised.

### The intrinsic concentration

From [[#eq-mass-action]] and $N_c, N_v \propto T^{3/2}$,

$$
n_i(T) = n_i(T_0)\left(\frac{T}{T_0}\right)^{3/2}\exp\left[-\frac{E_g}{2k}\left(\frac1T - \frac{1}{T_0}\right)\right],
$$ {#eq-ni-t}

with $T_0 = 300\,\mathrm K$ and, to a first approximation, a constant $E_g = 1.12\,\mathrm{eV}$ (so $E_g/2k = 6499\,\mathrm K$). The exponential dominates: $n_i$ roughly doubles for every $9\,\mathrm K$ near room temperature. Some values:

| $T$ (K) | $250$ | $300$ | $350$ | $400$ | $500$ | $600$ |
|---|---|---|---|---|---|---|
| $n_i$ ($\mathrm{cm^{-3}}$) | $1.0\times10^{8}$ | $1.0\times10^{10}$ | $2.8\times10^{11}$ | $3.5\times10^{12}$ | $1.2\times10^{14}$ | $1.4\times10^{15}$ |

(Including the shrinkage of the gap with temperature, from [[semiconductor-devices/crystals-energy-bands]], raises the high-temperature values by up to a factor of two; the qualitative picture is unchanged.)

### Three regimes

Follow the electron concentration in silicon doped with $N_D = 10^{15}\,\mathrm{cm^{-3}}$ as it is warmed from absolute zero.

1. **Freeze-out** (below about $100\,\mathrm K$). $kT$ is small compared with the donor binding energy, the Fermi level lies between $E_d$ and $E_c$, and most donor electrons remain bound. $n$ rises steeply with $T$.
2. **Extrinsic** (about $100$ to $450\,\mathrm K$ for this doping). The donors are essentially all ionised and $n_i \ll N_D$, so $n = N_D$ almost independently of temperature. This plateau is where devices are meant to operate.
3. **Intrinsic** (above about $500\,\mathrm K$). Thermal generation across the gap overwhelms the doping: $n_i$ becomes comparable with $N_D$ and then much larger, and $n \approx p \approx n_i$. The material has lost its n-type character, and junction devices stop working.

::: widget plot
f: log10(1e10*(x/300)^1.5*exp(-6499*(1/x - 1/300))); log10(10^d/2 + sqrt(10^(2d)/4 + (1e10*(x/300)^1.5*exp(-6499*(1/x - 1/300)))^2)); d
x: 250, 950
y: 7, 19
sliders: d=15:13:18:0.1
labels: \log_{10} n_i; \log_{10} n; \log_{10} N_D
caption: Logarithm of the intrinsic concentration $n_i(T)$ and of the electron concentration $n$ in silicon with donor concentration $N_D = 10^{d}\,\mathrm{cm^{-3}}$ (slider), against temperature in kelvin (full ionisation assumed, so freeze-out at low $T$ is not shown). The electron concentration stays on the plateau $n = N_D$ until $n_i$ approaches $N_D$, then follows $n_i$ upwards. Move $d$ from $15$ to $17$: the crossover where $n_i = N_D$ moves from about $580$ to about $900\,\mathrm K$. Heavily doped regions survive higher temperatures; lightly doped drift regions of power devices fail first.
:::

::: example The intrinsic temperature {#ex-intrinsic-temperature}
At what temperature does $n_i$ equal the doping $N_D = 10^{15}\,\mathrm{cm^{-3}}$? What are $n$ and $p$ there?
::: solution
We need $n_i(T) = 10^{15}$, i.e. by [[#eq-ni-t]]

$$
\left(\frac{T}{300}\right)^{3/2}\exp\left[-6499\left(\frac1T - \frac1{300}\right)\right] = 10^{5}.
$$

This is transcendental; solving numerically (bisection between $300$ and $1000\,\mathrm K$) gives $T = 583\,\mathrm K$, about $310\,^\circ\mathrm C$. Check: $(583/300)^{1.5} = 2.71$ and $6499(1/583 - 1/300) = -10.52$, so the left side is $2.71\,e^{10.52} = 2.71\times3.7\times10^{4} = 1.0\times10^{5}$. There, [[#eq-neutrality]] gives

$$
n = \frac{10^{15}}{2} + \sqrt{\frac{10^{30}}{4} + 10^{30}} = 0.5\times10^{15} + 1.118\times10^{15} = 1.62\times10^{15}\,\mathrm{cm^{-3}},
$$

and $p = n_i^2/n = 0.62\times10^{15}\,\mathrm{cm^{-3}}$. The material is now far from the clean n-type behaviour of room temperature. (With the temperature-dependent gap the crossover is about $30\,\mathrm K$ lower.)
:::
:::

::: example Choosing a substrate doping for high-temperature operation {#ex-design-doping}
A sensor chip for an engine bay must work up to $150\,^\circ\mathrm C$ ($423\,\mathrm K$). The designer requires the minority-carrier concentration in its p-type substrate never to exceed $1\,\%$ of the majority concentration, so that leakage stays low and the substrate remains firmly p-type. Find the minimum acceptor concentration.
::: solution
With $p \approx N_A$ and $n = n_i^2/N_A$, the requirement $n \le 0.01\,p$ becomes $n_i^2/N_A \le 0.01N_A$, i.e. $N_A \ge 10\,n_i$. From [[#eq-ni-t]] at $423\,\mathrm K$:

$$
n_i = 10^{10}\left(\frac{423}{300}\right)^{1.5}\exp\left[-6499\left(\frac{1}{423} - \frac{1}{300}\right)\right] = 10^{10}\times1.674\times e^{6.30} = 9.1\times10^{12}\,\mathrm{cm^{-3}}.
$$

So $N_A \ge 9.1\times10^{13}\,\mathrm{cm^{-3}}$. Any normal substrate (typically $10^{15}$ to $10^{16}\,\mathrm{cm^{-3}}$) meets this easily; the requirement bites only for the very lightly doped layers used in high-voltage devices and particle detectors. Allowing for the smaller gap at $423\,\mathrm K$ ($1.085\,\mathrm{eV}$) raises $n_i$ to about $1.3\times10^{13}\,\mathrm{cm^{-3}}$, so a safe specification is $N_A \ge 2\times10^{14}\,\mathrm{cm^{-3}}$.
:::
:::

## Heavy doping and degeneracy

The exponential formulas [[#eq-n-p]] rest on the Boltzmann approximation, which needs $E_F$ at least about $3kT$ below $E_c$ (or above $E_v$). That limit is reached when $n = N_ce^{-3} \approx 1.6\times10^{18}\,\mathrm{cm^{-3}}$ in n-type silicon. The source and drain regions of MOSFETs, the emitters of bipolar transistors and the contacts of every device are doped to $10^{19}$–$10^{20}\,\mathrm{cm^{-3}}$, well beyond it. Such material is **degenerate**: the Fermi level is close to or inside the band, and the full Fermi–Dirac integral must be used.

Three other things happen at high doping. The donor orbits (radius about $2.4\,\mathrm{nm}$) begin to overlap when the donors are closer than a few orbit radii, around $3\times10^{18}\,\mathrm{cm^{-3}}$ for phosphorus; the donor levels merge into an **impurity band** that joins the conduction band, the ionisation energy goes to zero and freeze-out disappears — degenerate silicon behaves like a poor metal. The band gap shrinks (**band-gap narrowing**), by about $0.1\,\mathrm{eV}$ at $10^{20}\,\mathrm{cm^{-3}}$, which increases the effective $n_i^2$ in the heavily doped region; this matters for the emitter of a bipolar transistor. And the dopant atoms scatter carriers strongly, reducing the mobility.

::: warning Do not use the simple formulas beyond about 10¹⁸ cm⁻³
Applying $E_c - E_F = kT\ln(N_c/n)$ to $n = 10^{20}\,\mathrm{cm^{-3}}$ gives $E_c - E_F = 0.02585\ln(0.322) = -0.029\,\mathrm{eV}$: the formula itself says the Fermi level is inside the band, contradicting the assumption it was derived from. A negative answer is the formula telling you it has failed. For quick work it is enough to say that $E_F \approx E_c$ in degenerate n-type silicon (and $E_F \approx E_v$ in degenerate p-type); for accurate work use the Fermi–Dirac integral with band-gap narrowing, as device simulators do.
:::

::: remark Why $np = n_i^2$ can mislead
The mass-action law holds only in **thermal equilibrium**. When light shines on a device, or a junction is forward biased, excess electrons and holes are injected, and $np$ can be many orders of magnitude larger than $n_i^2$ (or, in a reverse-biased junction, much smaller). Much of the rest of the course is about exactly such non-equilibrium situations; the deviation of $np$ from $n_i^2$ will be described by splitting the single Fermi level into two **quasi-Fermi levels** in [[semiconductor-devices/carrier-transport]].
:::

::: history
Enrico Fermi (1926) and Paul Dirac (1926) independently derived the statistics of particles obeying Pauli's exclusion principle, and Arnold Sommerfeld applied them to electrons in metals in 1927–1928. Alan Herries Wilson's 1931 papers on "The theory of electronic semi-conductors" used Fermi–Dirac statistics with an energy gap to explain why the conductivity of a semiconductor increases exponentially with temperature, and introduced the idea of impurity levels lying in the gap. The deliberate control of conduction type by group-III and group-V impurities was worked out during the Second World War, when Purdue University, Bell Laboratories and others developed purified germanium and silicon for microwave radar detectors; Bell's metallurgists Jack Scaff and Henry Theuerer identified boron and phosphorus as the elements responsible for p- and n-type silicon. The hydrogen model of shallow donors was developed by Walter Kohn and Joaquin Luttinger in the mid-1950s.
:::

## Where this leads

The formulas of this chapter describe a uniform semiconductor in equilibrium. In [[semiconductor-devices/carrier-transport]] we let carriers move under fields and gradients and let the material leave equilibrium, introducing quasi-Fermi levels. In [[semiconductor-devices/pn-junction]] the rule that the Fermi level is constant in equilibrium, combined with [[#eq-ni-form]] on each side, gives the built-in voltage of a junction immediately. The intrinsic concentration $n_i$, and its strong temperature dependence from [[#eq-ni-t]], set the saturation current of every diode and bipolar transistor, and the leakage that limits high-temperature electronics. The surface potential needed to invert a MOS capacitor, in [[semiconductor-devices/mos-capacitor]], is twice the distance $E_i - E_F$ computed here.

::: summary
- The density of states near a band edge grows as $\sqrt{E - E_c}$; the probability of occupation is the Fermi–Dirac function $1/(1 + e^{(E - E_F)/kT})$, and in equilibrium the Fermi level $E_F$ is constant throughout any system.
- For a non-degenerate semiconductor, $n = N_ce^{-(E_c - E_F)/kT}$ and $p = N_ve^{-(E_F - E_v)/kT}$, or $n = n_ie^{(E_F - E_i)/kT}$ and $p = n_ie^{(E_i - E_F)/kT}$.
- The mass-action law $np = n_i^2$ holds in equilibrium regardless of doping; for silicon at $300\,\mathrm K$, $n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$, $N_c = 3.22\times10^{19}$ and $N_v = 1.83\times10^{19}\,\mathrm{cm^{-3}}$.
- Donors (P, As, Sb) and acceptors (B) have ionisation energies of $40$–$55\,\mathrm{meV}$ and are fully ionised at room temperature; charge neutrality gives $n \approx N_D - N_A$ or $p \approx N_A - N_D$ when the net doping greatly exceeds $n_i$.
- Each decade of carrier concentration moves $E_F$ by $59.5\,\mathrm{meV}$ at $300\,\mathrm K$.
- $n_i$ grows as $T^{3/2}e^{-E_g/2kT}$, doubling about every $9\,\mathrm K$ near room temperature; a doped semiconductor passes through freeze-out, extrinsic and intrinsic regimes as it is heated.
- Above about $10^{18}\,\mathrm{cm^{-3}}$ silicon becomes degenerate and the Boltzmann formulas fail.
:::

## Exercises

::: exercise Minority carriers in p-type silicon {level=1 check="1e20/5e17*1e6"}
Silicon is doped with $N_A = 5\times10^{17}\,\mathrm{cm^{-3}}$ boron. Find the electron concentration at $300\,\mathrm K$, in $\mathrm{m^{-3}}$.
::: solution
$p = 5\times10^{17}\,\mathrm{cm^{-3}}$ and $n = n_i^2/p = 10^{20}/(5\times10^{17}) = 200\,\mathrm{cm^{-3}} = 2\times10^{8}\,\mathrm{m^{-3}}$. A cube of this silicon $1\,\mathrm{mm}$ on a side contains, on average, $0.2$ free electrons.
:::
:::

::: exercise Fermi level of an arsenic-doped layer {level=1 check="0.02585*log(3.22e19/2e17)"}
Find $E_c - E_F$, in electronvolts, for silicon with $N_D = 2\times10^{17}\,\mathrm{cm^{-3}}$ at $300\,\mathrm K$.
::: solution
$E_c - E_F = kT\ln(N_c/N_D) = 0.02585\ln(161) = 0.131\,\mathrm{eV}$. This is more than $3kT = 0.078\,\mathrm{eV}$, so the non-degenerate formula is still valid.
:::
:::

::: exercise Occupation probabilities {level=1 check="1/(1+exp(0.1/0.02585))"}
At $300\,\mathrm K$, find the probability that a state $0.1\,\mathrm{eV}$ above the Fermi level is occupied, and the probability that a state $0.1\,\mathrm{eV}$ below it is empty.
::: solution
$f = 1/(1 + e^{0.1/0.02585}) = 1/(1 + 47.9) = 0.0205$. By symmetry the probability that a state $0.1\,\mathrm{eV}$ below $E_F$ is empty is $1/(1 + e^{0.1/0.02585})$, also $0.0205$. The Boltzmann approximation gives $e^{-3.87} = 0.0209$, $2\,\%$ high.
:::
:::

::: exercise Lightly doped silicon {level=2 check="2e10*1e6"}
Silicon contains $N_D = 1.5\times10^{10}\,\mathrm{cm^{-3}}$ donors and no acceptors. Find $n$ (in $\mathrm{m^{-3}}$), $p$ and $E_F - E_i$ at $300\,\mathrm K$.
::: solution
Here $N_D$ is comparable with $n_i$, so we must use [[#eq-neutrality]]: $n = 0.75\times10^{10} + \sqrt{(0.75\times10^{10})^2 + 10^{20}} = 0.75\times10^{10} + 1.25\times10^{10} = 2.0\times10^{10}\,\mathrm{cm^{-3}} = 2\times10^{16}\,\mathrm{m^{-3}}$. Then $p = 10^{20}/(2\times10^{10}) = 5\times10^{9}\,\mathrm{cm^{-3}}$ and $E_F - E_i = 0.02585\ln 2 = 17.9\,\mathrm{meV}$. Note that $n - p = 1.5\times10^{10} = N_D$, as neutrality requires.
:::
:::

::: exercise Intrinsic germanium and GaAs {level=2}
Germanium has $E_g = 0.66\,\mathrm{eV}$, $N_c = 1.04\times10^{19}$, $N_v = 6.0\times10^{18}\,\mathrm{cm^{-3}}$; GaAs has $E_g = 1.42\,\mathrm{eV}$, $N_c = 4.7\times10^{17}$, $N_v = 9.0\times10^{18}\,\mathrm{cm^{-3}}$. Find $n_i$ for each at $300\,\mathrm K$ and explain why GaAs is used for "semi-insulating" substrates.
::: solution
Ge: $n_i = \sqrt{1.04\times10^{19}\times6.0\times10^{18}}\,e^{-0.66/0.0517} = 7.9\times10^{18}\times2.86\times10^{-6} = 2.3\times10^{13}\,\mathrm{cm^{-3}}$. GaAs: $n_i = \sqrt{4.7\times10^{17}\times9.0\times10^{18}}\,e^{-1.42/0.0517} = 2.06\times10^{18}\times1.18\times10^{-12} = 2.4\times10^{6}\,\mathrm{cm^{-3}}$. With so few intrinsic carriers, GaAs in which the residual impurities are compensated by deep levels has a resistivity of order $10^{8}\,\Omega\,\mathrm{cm}$, good enough to isolate microwave transistors and transmission lines on the same chip. Germanium's large $n_i$ is why germanium transistors leaked badly and failed at modest temperatures.
:::
:::

::: exercise Where is the intrinsic level? {level=2}
(a) Show from [[#eq-ei]] that $E_i$ lies exactly at midgap only if $m_n^* = m_p^*$. (b) For GaAs ($m_n^* = 0.067\,m_0$, $m_p^* = 0.48\,m_0$) find $E_i - (E_c + E_v)/2$ at $300\,\mathrm K$.
::: solution
(a) $N_v/N_c = (m_p^*/m_n^*)^{3/2}$, so the correction term $\tfrac{kT}{2}\ln(N_v/N_c) = \tfrac34kT\ln(m_p^*/m_n^*)$ vanishes only if the masses are equal. (b) $\tfrac34(0.02585)\ln(0.48/0.067) = 0.0194\times1.969 = 0.038\,\mathrm{eV}$ above midgap. The light conduction-band mass gives few conduction-band states, so the Fermi level of intrinsic GaAs must sit closer to $E_c$ to populate them equally.
:::
:::

::: exercise How fast does n_i grow? {level=2 check="log(2)/(1.5/300 + 6499/300^2)"}
Using [[#eq-ni-t]], find the temperature rise (in kelvin) near $300\,\mathrm K$ that doubles $n_i$. The ideal diffusion current of a diode is proportional to $n_i^2$: how fast does it double? Compare with the rule of thumb that the reverse current of a real silicon diode doubles roughly every $10\,^\circ\mathrm C$, and suggest why they differ.
::: hint
Differentiate $\ln n_i$ with respect to $T$.
:::
::: solution
$\mathrm d\ln n_i/\mathrm dT = \tfrac{3}{2T} + \tfrac{E_g}{2kT^2} = 0.0050 + 6499/90\,000 = 0.0050 + 0.0722 = 0.0772\,\mathrm{K^{-1}}$. Doubling needs $\Delta T = \ln 2/0.0772 = 9.0\,\mathrm K$. The ideal diffusion current of a diode goes as $n_i^2$ and so doubles every $4.5\,\mathrm K$. The familiar "doubles every $10\,^\circ\mathrm C$" applies to real silicon diodes at room temperature, whose reverse current is dominated by **generation in the depletion region**, proportional to $n_i$ rather than $n_i^2$ (see [[semiconductor-devices/diodes-photonic-devices]]); its doubling interval matches that of $n_i$ itself.
:::
:::

::: exercise Donor freeze-out {level=3}
Silicon is doped with $N_D = 10^{16}\,\mathrm{cm^{-3}}$ phosphorus ($E_c - E_d = 45\,\mathrm{meV}$). At low temperature, with $n_i$ negligible, neutrality reads $n = N_D^+ = N_D/(1 + 2e^{(E_F - E_d)/kT})$. (a) Using $n = N_ce^{-(E_c - E_F)/kT}$, show that $n$ satisfies $n^2 + \tfrac12 N_c'n - \tfrac12N_c'N_D = 0$ with $N_c' = N_ce^{-(E_c - E_d)/kT}$. (b) Find the ionised fraction at $77\,\mathrm K$ (liquid nitrogen), taking $N_c(77\,\mathrm K) = 3.22\times10^{19}(77/300)^{3/2}$.
::: hint
Write $e^{(E_F - E_d)/kT} = (n/N_c)e^{(E_c - E_d)/kT} = n/N_c'$.
:::
::: solution
(a) $e^{(E_F - E_d)/kT} = e^{(E_F - E_c)/kT}e^{(E_c - E_d)/kT} = n/N_c'$. Then $n(1 + 2n/N_c') = N_D$, i.e. $2n^2/N_c' + n - N_D = 0$, which multiplied by $N_c'/2$ is the stated quadratic.

(b) At $77\,\mathrm K$, $kT = 6.635\,\mathrm{meV}$ and $N_c = 3.22\times10^{19}\times0.1300 = 4.19\times10^{18}\,\mathrm{cm^{-3}}$. Then $N_c' = 4.19\times10^{18}e^{-45/6.635} = 4.19\times10^{18}\times1.13\times10^{-3} = 4.74\times10^{15}\,\mathrm{cm^{-3}}$. The quadratic $n^2 + 2.37\times10^{15}n - 2.37\times10^{31} = 0$ gives $n = -1.185\times10^{15} + \sqrt{1.40\times10^{30} + 2.37\times10^{31}} = -1.185\times10^{15} + 5.01\times10^{15} = 3.83\times10^{15}\,\mathrm{cm^{-3}}$, so only about $38\,\%$ of the donors are ionised. (Real silicon does better at this doping than this simple model suggests, because the excited states of the donor and its interaction with neighbours lower the effective ionisation energy; but freeze-out is a genuine effect, which is why cryogenic CMOS uses heavily doped, degenerate contacts.)
:::
:::

::: exercise Electron concentration from the full integral {level=3}
Show that if the Boltzmann approximation is **not** made, $n = N_c\,\mathcal F_{1/2}(\eta)$ where $\eta = (E_F - E_c)/kT$ and $\mathcal F_{1/2}(\eta) = \frac{2}{\sqrt\pi}\int_0^\infty \frac{\sqrt x\,\mathrm dx}{1 + e^{x - \eta}}$. Show that $\mathcal F_{1/2}(\eta) \to e^{\eta}$ for $\eta \ll -1$, and that for $\eta \gg 1$ it approaches $\frac{4}{3\sqrt\pi}\eta^{3/2}$. What is the physical meaning of the second limit?
::: solution
Repeating the proof of [[#thm-np]] without approximating $f$ gives $n = \frac{1}{2\pi^2}(2m_n^*kT/\hbar^2)^{3/2}\int_0^\infty\sqrt x\,\mathrm dx/(1 + e^{x - \eta})$, and the prefactor is $N_c\cdot\frac{2}{\sqrt\pi}$, because $N_c$ contained the factor $\Gamma(3/2) = \sqrt\pi/2$. For $\eta \ll -1$ the denominator is $\approx e^{x - \eta}$, the integral becomes $e^{\eta}\Gamma(3/2)$, and $\mathcal F_{1/2} \to e^\eta$, recovering [[#thm-np]]. For $\eta \gg 1$ the occupation is close to a step at $x = \eta$, so the integral is $\int_0^\eta\sqrt x\,\mathrm dx = \tfrac23\eta^{3/2}$ and $\mathcal F_{1/2} \to \frac{4}{3\sqrt\pi}\eta^{3/2}$. This is the degenerate limit: all states up to $E_F$ are full, as in a metal, and $n = N(E_F)$ from the proof of [[#thm-dos]], independent of temperature.
:::
:::
