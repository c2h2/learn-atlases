At $1000\ \mathrm{K}$ about one iodine molecule in a hundred is dissociated into atoms at $1\ \mathrm{bar}$; at $1500\ \mathrm{K}$ more than half are. Classical thermodynamics can relate these facts to each other — given $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$ it predicts the equilibrium constant at any temperature ([[thermodynamics/reaction-equilibrium]]) — but it cannot predict either number from scratch: the thermodynamic data must come from calorimetry or from measured equilibria. Statistical thermodynamics can. Given the mass of an iodine atom, the bond length and vibrational wavenumber of $\mathrm{I_2}$, the degeneracy of the ground state of the atom and the dissociation energy of the molecule — all obtainable from spectroscopy — it computes the equilibrium constant directly. For small gas-phase molecules the result is so reliable that tabulated thermodynamic functions such as the JANAF tables are *calculated* this way rather than measured.

This lesson derives the expression for an equilibrium constant in terms of molecular partition functions and applies it to three kinds of equilibrium that between them exhibit all the physics: an equilibrium between two forms of one molecule (conformers), where the result reduces to a Boltzmann ratio of populations; the dissociation of a diatomic molecule, where translation wins the battle against bond energy at high temperature; and isotope exchange, where the reaction energy is almost zero and the equilibrium constant is governed by symmetry numbers and zero-point energies. Along the way we see, molecule by molecule, what "enthalpy" and "entropy" of reaction mean.

## The equilibrium constant in terms of partition functions

The thermodynamic equilibrium constant for a reaction $0 = \sum_J\nu_J\mathrm{J}$ between perfect gases is $K = \prod_J(p_J/p^\circ)^{\nu_J}$ and is related to the standard reaction Gibbs energy by $\Delta_\mathrm{r}G^\circ = -RT\ln K$ ([[thermodynamics/reaction-equilibrium]]). In [[statistical-thermodynamics/canonical-ensemble]] we found the standard molar Gibbs energy of a perfect gas, $G^\circ_\mathrm{m} = G^\circ_\mathrm{m}(0) - RT\ln(q^\circ_\mathrm{m}/N_\mathrm{A})$. Combining the two is almost all there is to do — except that the zeros of energy of different molecules must now be put on a common scale.

::: definition Standard molar partition function and reaction energy at T = 0 {#def-e0}
The **standard molar partition function** $q^\circ_{J,\mathrm{m}}$ of species J is its molecular partition function evaluated with the volume $V^\circ_\mathrm{m} = RT/p^\circ$, divided by one mole, with all energies measured from the lowest state of the molecule; so $q^\circ_{J,\mathrm{m}}/N_\mathrm{A}$ is the molecular partition function in the volume $k_\mathrm{B}T/p^\circ$ that one molecule occupies at the standard pressure. The **reaction energy at $T = 0$**,
$$
\Delta_\mathrm{r}E_0 = \sum_J\nu_JE_{0,J} ,
$$
is the difference between the molar energies of the lowest states of the products and of the reactants, measured from a common zero. It includes the zero-point vibrational energies. For a dissociation $\mathrm{AB} \rightarrow \mathrm{A} + \mathrm{B}$, $\Delta_\mathrm{r}E_0 = N_\mathrm{A}D_0$, where $D_0$ is the spectroscopic dissociation energy measured from the vibrational ground state, not the well depth $D_\mathrm{e}$.
:::

::: proposition The equilibrium constant from partition functions {#prop-k}
For a reaction $0 = \sum_J\nu_J\mathrm{J}$ between perfect gases,
$$
K = \prod_J\left(\frac{q^\circ_{J,\mathrm{m}}}{N_\mathrm{A}}\right)^{\nu_J}e^{-\Delta_\mathrm{r}E_0/RT} .
$$ {#eq-k}
For example, for $\mathrm{a\,A} + \mathrm{b\,B} \rightleftharpoons \mathrm{c\,C} + \mathrm{d\,D}$,
$$
K = \frac{(q^\circ_{\mathrm{C,m}}/N_\mathrm{A})^{c}(q^\circ_{\mathrm{D,m}}/N_\mathrm{A})^{d}}{(q^\circ_{\mathrm{A,m}}/N_\mathrm{A})^{a}(q^\circ_{\mathrm{B,m}}/N_\mathrm{A})^{b}}\,e^{-\Delta_\mathrm{r}E_0/RT} .
$$
:::

::: proof
For each species, with energies measured from its own lowest state, [[statistical-thermodynamics/canonical-ensemble#eq-g-standard]] gives $G^\circ_{J,\mathrm{m}} = G^\circ_{J,\mathrm{m}}(0) - RT\ln(q^\circ_{J,\mathrm{m}}/N_\mathrm{A})$. At $T = 0$ the Gibbs energy equals the internal energy, so on a common scale $G^\circ_{J,\mathrm{m}}(0) = E_{0,J}$, the molar energy of the lowest state of J. Hence
$$
\Delta_\mathrm{r}G^\circ = \sum_J\nu_JG^\circ_{J,\mathrm{m}} = \sum_J\nu_JE_{0,J} - RT\sum_J\nu_J\ln\frac{q^\circ_{J,\mathrm{m}}}{N_\mathrm{A}} = \Delta_\mathrm{r}E_0 - RT\ln\prod_J\left(\frac{q^\circ_{J,\mathrm{m}}}{N_\mathrm{A}}\right)^{\nu_J} .
$$
Setting this equal to $-RT\ln K$ and exponentiating gives [[#eq-k]].
:::

Equation [[#eq-k]] has a transparent structure. The exponential is an energy factor: products lying above reactants ($\Delta_\mathrm{r}E_0 > 0$) are penalised by a Boltzmann factor. The ratio of partition functions is a *state-counting* factor: a side of the reaction with more accessible states per molecule is favoured, whatever its energy. These two factors are the molecular forms of the enthalpy and entropy of reaction; at high temperature the state-counting factor usually wins, which is why endothermic dissociations go to completion when the gas is hot enough.

::: warning Common zero, standard state and symmetry numbers {#warn-k}
Three slips ruin calculations with [[#eq-k]]. (i) *The zero of energy.* Each $q$ is computed with energies from its own lowest state (vibrational energies from the zero-point level); the common zero enters only through $\Delta_\mathrm{r}E_0$, which must be $D_0$, not $D_\mathrm{e}$. Using $D_\mathrm{e}$ (larger by the zero-point energy) with zero-point-based partition functions double-counts the ZPE. (ii) *The standard state.* $q^\circ_\mathrm{m}/N_\mathrm{A}$ contains $V = k_\mathrm{B}T/p^\circ$ with $p^\circ = 1\ \mathrm{bar} = 10^{5}\ \mathrm{Pa}$; using $1\ \mathrm{atm}$, or a concentration standard state, changes $K$ for any reaction with $\sum_J\nu_J \ne 0$. (iii) *Symmetry numbers and degeneracies.* $\sigma = 2$ for $\mathrm{I_2}$ and $\mathrm{H_2}$, and $g = 4$ for an iodine atom, change $K$ by factors of 2 and 16; they are not optional refinements.
:::

## Equilibrium between two forms of a molecule

The simplest application is to an equilibrium $\mathrm{A} \rightleftharpoons \mathrm{B}$ between two isomers or conformers with the same mass. The translational partition functions are then identical and cancel, as do the volume and $N_\mathrm{A}$:
$$
K = \frac{q_\mathrm{B}^\text{int}}{q_\mathrm{A}^\text{int}}\,e^{-\Delta_\mathrm{r}E_0/RT} .
$$ {#eq-k-isomer}
If each form has a single relevant state (or a few degenerate ones, $g_\mathrm{A}$ and $g_\mathrm{B}$), $K = (g_\mathrm{B}/g_\mathrm{A})e^{-\Delta E/RT}$: the equilibrium constant is just the ratio of the populations of the two sets of states — the Boltzmann distribution of [[statistical-thermodynamics/boltzmann-distribution]] applied to a chemical change.

::: proposition Equilibrium as a population ratio {#prop-population}
Let a molecule have states $i$ of energies $\varepsilon_i$ (on a common scale), divided into two sets, those belonging to form A and those belonging to form B. Then the equilibrium constant for $\mathrm{A} \rightleftharpoons \mathrm{B}$ is the ratio of the partial partition functions of the two sets,
$$
K = \frac{\sum_{i\in\mathrm{B}}e^{-\beta\varepsilon_i}}{\sum_{i\in\mathrm{A}}e^{-\beta\varepsilon_i}} = \frac{N_\mathrm{B}}{N_\mathrm{A}} ,
$$
which is identical to [[#eq-k-isomer]] once each sum is written as $e^{-\beta\varepsilon_{0}}$ (its lowest energy) times a partition function measured from that energy.
:::

::: proof
The whole collection of molecules is a single species with a single Boltzmann distribution over *all* its states, A-like and B-like. The number in set B is $N\sum_{i\in\mathrm{B}}e^{-\beta\varepsilon_i}/q$ and in set A $N\sum_{i\in\mathrm{A}}e^{-\beta\varepsilon_i}/q$; their ratio is the stated $K$ (for an isomerisation $K = p_\mathrm{B}/p_\mathrm{A} = N_\mathrm{B}/N_\mathrm{A}$). Writing $\sum_{i\in\mathrm{B}}e^{-\beta\varepsilon_i} = e^{-\beta\varepsilon_{0,\mathrm{B}}}q_\mathrm{B}$ and similarly for A gives $K = (q_\mathrm{B}/q_\mathrm{A})e^{-\beta(\varepsilon_{0,\mathrm{B}} - \varepsilon_{0,\mathrm{A}})}$, which is [[#eq-k-isomer]] per molecule.
:::

This view makes chemical equilibrium intuitive: a molecule at equilibrium simply explores all its states, and $K$ reports how much of its time it spends among the states we choose to call "B". A form wins either by lying lower in energy or by having more states — more low-frequency vibrations, more degenerate orientations, more conformational freedom.

::: example The conformers of butane {#ex-butane}
In butane, rotation about the central C–C bond gives one *anti* conformer and two mirror-image *gauche* conformers; the gauche conformers lie about $3.8\ \mathrm{kJ\,mol^{-1}}$ above the anti. Treating the vibrational and rotational partition functions of the conformers as equal, find the equilibrium fraction of gauche conformers at $298\ \mathrm{K}$ and at $500\ \mathrm{K}$.
::: solution
For anti ⇌ gauche, with $g_\text{gauche} = 2$, $g_\text{anti} = 1$,
$$
K = 2\,e^{-\Delta E/RT} = 2\exp\!\left(-\frac{3800}{8.3145\times298.15}\right) = 2\times0.2160 = 0.432 ,
$$
so the gauche fraction is $K/(1 + K) = 0.302$. At $500\ \mathrm{K}$, $K = 2e^{-0.914} = 0.802$ and the fraction is $0.445$, approaching the high-temperature limit of $2/3$, which is the purely statistical ratio of two gauche "states" to three in all. The factor 2 is an entropy of reaction, $\Delta_\mathrm{r}S^\circ = R\ln 2 = 5.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$, arising entirely from counting. (In reality the gauche form also has slightly different low-frequency vibrations; refinements of this kind are what computational conformer searches evaluate, [[computational-chemistry/molecular-mechanics]].)
:::
:::

::: widget plot
f: g*exp(-e*1000/(8.314*x))/(1 + g*exp(-e*1000/(8.314*x))); g/(1 + g)
x: 50, 1500
y: 0, 1
sliders: e=3.8:-10:20:0.1; g=2:1:6:1
labels: \text{fraction of B}; \text{high-}T\text{ limit } g/(1+g)
caption: The equilibrium fraction of the higher-energy form B in an equilibrium $\mathrm{A} \rightleftharpoons \mathrm{B}$, against $T$ (in K), when B lies `e` kilojoules per mole above A and has `g` times as many states. With the starting values (gauche/anti butane) the fraction rises from zero towards $2/3$. Set `e` negative: B is favoured by energy *and* by states, and the fraction approaches $g/(1+g)$ from above. Set `e` to zero and the equilibrium is purely entropic at every temperature.
:::

## Dissociation: when translation wins

For $\mathrm{X_2(g)} \rightleftharpoons 2\,\mathrm{X(g)}$, [[#eq-k]] reads
$$
K = \frac{(q^\circ_{\mathrm{X,m}}/N_\mathrm{A})^{2}}{q^\circ_{\mathrm{X_2,m}}/N_\mathrm{A}}\,e^{-D_0/k_\mathrm{B}T} .
$$ {#eq-k-diss}
The energy factor is tiny — the bond energy is many times $k_\mathrm{B}T$ — but the state-counting factor is enormous, because two atoms have *two* sets of translational states, each of order $10^{9}$ at high temperature, against one set (plus rotation and vibration) for the molecule. Since $q^\mathrm{T}$ grows as $T^{5/2}$ (as $T^{3/2}$ from $\Lambda^{-3}$ and as $T$ from the standard volume $k_\mathrm{B}T/p^\circ$), dissociation always wins at sufficiently high temperature.

::: example The dissociation of iodine at 1000 K {#ex-iodine}
Calculate $K$ for $\mathrm{I_2(g)} \rightleftharpoons 2\,\mathrm{I(g)}$ at $1000\ \mathrm{K}$. Data: $M(\mathrm{I}) = 126.904\ \mathrm{g\,mol^{-1}}$; for $\mathrm{I_2}$, $\tilde\nu = 214.5\ \mathrm{cm^{-1}}$, $B = 0.0374\ \mathrm{cm^{-1}}$, $D_0 = 12\,440\ \mathrm{cm^{-1}}$ ($148.8\ \mathrm{kJ\,mol^{-1}}$), ground state $^{1}\Sigma_\mathrm{g}^{+}$; the iodine atom has a $^{2}\mathrm{P}_{3/2}$ ground level ($g = 4$), its $^{2}\mathrm{P}_{1/2}$ level lying $7603\ \mathrm{cm^{-1}}$ higher.
::: solution
Work with molecular partition functions in the volume $V = k_\mathrm{B}T/p^\circ = 1.3807\times10^{-25}\ \mathrm{m^{3}}$.

*Iodine atom.* $\Lambda = h/(2\pi mk_\mathrm{B}T)^{1/2} = 4.901\times10^{-12}\ \mathrm{m}$, so $q^\mathrm{T} = V/\Lambda^{3} = 1.173\times10^{9}$. Electronic: $g = 4$ (the excited level contributes $2e^{-c_2\times7603/1000} = 3.6\times10^{-5}$, negligible). So $q^\circ_{\mathrm{I,m}}/N_\mathrm{A} = 4.692\times10^{9}$.

*Iodine molecule.* Twice the mass: $q^\mathrm{T} = 1.173\times10^{9}\times2^{3/2} = 3.318\times10^{9}$. Rotation ($\sigma = 2$): $q^\mathrm{R} = T/(2\theta_\mathrm{R}) = 1000/(2\times1.438\,78\times0.0374) = 9.29\times10^{3}$. Vibration: $\theta_\mathrm{V} = 308.6\ \mathrm{K}$, $q^\mathrm{V} = 1/(1 - e^{-0.3086}) = 3.77$. Electronic: 1. So $q^\circ_{\mathrm{I_2,m}}/N_\mathrm{A} = 3.318\times10^{9}\times9.29\times10^{3}\times3.77 = 1.162\times10^{14}$.

*Energy factor.* $D_0/k_\mathrm{B}T = c_2\tilde D_0/T = 1.438\,78\times12\,440/1000 = 17.90$, so $e^{-17.90} = 1.69\times10^{-8}$.

Putting these into [[#eq-k-diss]]:
$$
K = \frac{(4.692\times10^{9})^{2}}{1.162\times10^{14}}\times1.69\times10^{-8} = 1.895\times10^{5}\times1.69\times10^{-8} = 3.2\times10^{-3} .
$$
The state-counting factor, $1.9\times10^{5}$, overcomes most of the energy penalty of $6\times10^{7}$. With $p(\mathrm{I})^{2}/p(\mathrm{I_2})p^\circ = K$ and a total pressure of $1\ \mathrm{bar}$, the degree of dissociation $\alpha$ satisfies $4\alpha^{2}/(1 - \alpha^{2}) = K$, giving $\alpha = 0.028$: about $3\,\%$ of the molecules are dissociated. The atomic degeneracy alone contributes a factor of $4^{2} = 16$ in favour of the atoms.
:::
:::

::: widget plot
f: log10(22.564*x^1.5*(1 - exp(-308.6/x))*exp(-17898/x))
x: 500, 2000
y: -12, 2
hlines: 0
labels: \log_{10}K
caption: $\log_{10}K$ for $\mathrm{I_2(g)} \rightleftharpoons 2\,\mathrm{I(g)}$ against $T$ (in K), computed from [[#eq-k-diss]] with the data of [[#ex-iodine]]. The temperature dependence is $K \propto T^{3/2}(1 - e^{-\theta_\mathrm{V}/T})e^{-D_0/k_\mathrm{B}T}$: the translational and rotational partition functions contribute $T^{5/2}\times T^{5/2}/(T^{5/2}\times T) = T^{3/2}$. $K$ passes through 1 near $1450\ \mathrm{K}$, above which the atoms are favoured at standard pressure; the steep rise is the Boltzmann factor, the curvature at low $T$ the slow power law.
:::

### The temperature dependence and the van 't Hoff equation

Equation [[#eq-k]] contains its own van 't Hoff equation. Differentiating $\ln K$ with respect to $T$, and using $RT^{2}\,\mathrm{d}\ln(q^\circ_\mathrm{m}/N_\mathrm{A})/\mathrm{d}T = H^\circ_\mathrm{m} - H^\circ_\mathrm{m}(0)$ for a perfect gas (the $T$-dependence of $V^\circ_\mathrm{m} = RT/p^\circ$ supplies the extra $RT$ that converts $U$ into $H$), gives
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \frac{\Delta_\mathrm{r}E_0 + \sum_J\nu_J\left[H^\circ_{J,\mathrm{m}}(T) - H^\circ_{J,\mathrm{m}}(0)\right]}{RT^{2}} = \frac{\Delta_\mathrm{r}H^\circ(T)}{RT^{2}},
$$
the van 't Hoff equation of [[thermodynamics/reaction-equilibrium]], with the reaction enthalpy now built from its molecular parts. For the iodine dissociation at $1000\ \mathrm{K}$, $2\times\tfrac{5}{2}RT$ for the two atoms minus $(\tfrac{7}{2}RT - \text{a small vibrational deficit})$ for the molecule adds $5.4\ \mathrm{kJ\,mol^{-1}}$ to $D_0$, giving $\Delta_\mathrm{r}H^\circ(1000\ \mathrm{K}) = 154\ \mathrm{kJ\,mol^{-1}}$, which is what numerical differentiation of the curve in the figure also gives.

::: example The molecular anatomy of a reaction entropy {#ex-iodine-entropy}
For $\mathrm{I_2(g)} \rightarrow 2\,\mathrm{I(g)}$ at $1000\ \mathrm{K}$, use $K = 3.19\times10^{-3}$ and $\Delta_\mathrm{r}H^\circ = 154.2\ \mathrm{kJ\,mol^{-1}}$ to find $\Delta_\mathrm{r}G^\circ$ and $\Delta_\mathrm{r}S^\circ$. Then decompose $\Delta_\mathrm{r}S^\circ$ into translational, rotational, vibrational and electronic contributions, using $S_\mathrm{m} = U_\mathrm{m}/T + R\ln(q/N)+R$ for translation and $S_\mathrm{m} = U_\mathrm{m}/T + R\ln q$ for each internal mode.
::: solution
$\Delta_\mathrm{r}G^\circ = -RT\ln K = -8.3145\times1000\times\ln(3.19\times10^{-3}) = +47.8\ \mathrm{kJ\,mol^{-1}}$, and
$$
\Delta_\mathrm{r}S^\circ = \frac{\Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ}{T} = \frac{154.2 - 47.8}{1000}\ \mathrm{kJ\,K^{-1}\,mol^{-1}} = +106\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
Mode by mode, with the partition functions of [[#ex-iodine]]:

- *Translation.* $S^\mathrm{T}_\mathrm{m} = R[\ln(q^\circ_\mathrm{m}/N_\mathrm{A}) + \tfrac{5}{2}]$ gives $194.4$ for I and $203.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for $\mathrm{I_2}$; the reaction gains $2\times194.4 - 203.1 = +185.8$.
- *Rotation* of $\mathrm{I_2}$, lost: $S^\mathrm{R}_\mathrm{m} = R(1 + \ln 9293) = 84.3$, contributing $-84.3$.
- *Vibration* of $\mathrm{I_2}$, lost: $S^\mathrm{V}_\mathrm{m} = R[x/(e^{x}-1) - \ln(1 - e^{-x})]$ with $x = 0.3086$ gives $18.1$, contributing $-18.1$.
- *Electronic*: two atoms with $g = 4$ gain $2R\ln 4 = +23.1$.

The sum, $185.8 - 84.3 - 18.1 + 23.1 = 106.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$, reproduces the thermodynamic value. The dissociation entropy is a *translational* effect: one free particle becomes two, and each new particle brings some $10^{9}$ translational states with it. Rotation and vibration of the molecule, which are destroyed, take back less than half of that gain.
:::
:::

## Isotope exchange: symmetry and zero-point energy

When reactants and products are chemically almost identical, the energy factor nearly vanishes and the equilibrium constant is governed by subtle differences in partition functions. Isotope-exchange equilibria are the classic case.

::: example The equilibrium H₂ + D₂ ⇌ 2HD {#ex-hd}
Calculate $K$ for $\mathrm{H_2(g)} + \mathrm{D_2(g)} \rightleftharpoons 2\,\mathrm{HD(g)}$ at $298.15\ \mathrm{K}$. Data (Huber and Herzberg): masses $2.0157$, $3.0219$, $4.0282\ \mathrm{g\,mol^{-1}}$; rotational constants $60.853$, $45.655$, $30.444\ \mathrm{cm^{-1}}$; zero-point energies $2170.3$, $1883.7$ and $1542.3\ \mathrm{cm^{-1}}$ for $\mathrm{H_2}$, $\mathrm{HD}$ and $\mathrm{D_2}$ (from $\omega_\mathrm{e}/2 - \omega_\mathrm{e}x_\mathrm{e}/4$). All three molecules have the same potential energy curve (Born–Oppenheimer approximation) and non-degenerate electronic ground states.
::: solution
There is no change in the number of molecules, so $V$ and $N_\mathrm{A}$ cancel and
$$
K = \frac{(q^\mathrm{T}_\mathrm{HD})^{2}}{q^\mathrm{T}_\mathrm{H_2}q^\mathrm{T}_\mathrm{D_2}}\cdot\frac{(q^\mathrm{R}_\mathrm{HD})^{2}}{q^\mathrm{R}_\mathrm{H_2}q^\mathrm{R}_\mathrm{D_2}}\cdot\frac{(q^\mathrm{V}_\mathrm{HD})^{2}}{q^\mathrm{V}_\mathrm{H_2}q^\mathrm{V}_\mathrm{D_2}}\cdot e^{-\Delta_\mathrm{r}E_0/RT} .
$$
*Translation.* $q^\mathrm{T} \propto m^{3/2}$: $\left(3.0219^{2}/(2.0157\times4.0282)\right)^{3/2} = 1.193$.

*Rotation.* $q^\mathrm{R} = T/\sigma\theta_\mathrm{R} \propto 1/\sigma B$, with $\sigma = 2$ for $\mathrm{H_2}$ and $\mathrm{D_2}$ and $1$ for HD: $\dfrac{(1/45.655)^{2}}{(1/2\times60.853)(1/2\times30.444)} = \dfrac{4\times60.853\times30.444}{45.655^{2}} = 3.555$. (At $298\ \mathrm{K}$ the high-temperature formula is only approximate for $\mathrm{H_2}$, but the errors largely cancel in the ratio.)

*Vibration.* All three $q^\mathrm{V}$ are 1 to within $10^{-6}$ at $298\ \mathrm{K}$: the ratio is 1.

*Energy.* $\Delta_\mathrm{r}E_0 = 2\times1883.7 - 2170.3 - 1542.3 = 54.8\ \mathrm{cm^{-1}}$ (the electronic energies cancel), so $e^{-\Delta_\mathrm{r}E_0/RT} = e^{-1.438\,78\times54.8/298.15} = e^{-0.264} = 0.768$.

Therefore
$$
K = 1.193\times3.555\times1\times0.768 = 3.26 ,
$$
in good agreement with the measured value of about $3.3$. The symmetry numbers supply the factor $4$; the masses and moments of inertia add a little; and the zero-point energies, which favour the "segregated" isotopes $\mathrm{H_2}$ and $\mathrm{D_2}$ (the ZPE is not linear in the reduced mass), take some of it back.
:::
:::

The high-temperature limit of this equilibrium is instructive. As $T\to\infty$, the energy factor tends to 1 and the vibrational partition functions become classical, $q^\mathrm{V}\to T/\theta_\mathrm{V} \propto \mu^{1/2}$. In the classical limit the masses then cancel exactly from the product of translational, rotational and vibrational factors (a consequence of the Teller–Redlich product rule), and only the symmetry numbers survive: $K\to\sigma_{\mathrm{H_2}}\sigma_{\mathrm{D_2}}/\sigma_{\mathrm{HD}}^{2} = 4$. This is simply the statistical result for randomly pairing H and D atoms: a random mixture with equal numbers of H and D has $\mathrm{H_2} : \mathrm{HD} : \mathrm{D_2} = 1 : 2 : 1$, and $2^{2}/(1\times1) = 4$. All the chemistry — the deviation of $K$ from 4 at low temperature — is quantum mechanical, arising from zero-point energy and quantised rotation.

::: widget plot
f: 1.19279*3.55522*(1 - exp(-1.43878*4158.5/x))*(1 - exp(-1.43878*2991.9/x))/(1 - exp(-1.43878*3629.9/x))^2*exp(-78.79/x); 4
x: 50, 3000
y: 0, 4.5
labels: K; \text{classical limit } 4
caption: The equilibrium constant of $\mathrm{H_2} + \mathrm{D_2} \rightleftharpoons 2\,\mathrm{HD}$ against $T$ (in K), from the partition functions of [[#ex-hd]] (with vibrational fundamentals $4158.5$, $3629.9$ and $2991.9\ \mathrm{cm^{-1}}$ and $\Delta_\mathrm{r}E_0 = 54.8\ \mathrm{cm^{-1}} = 78.8\ \mathrm{K}\times k_\mathrm{B}$). $K$ rises towards the statistical value 4 as the zero-point-energy penalty $e^{-78.8\ \mathrm{K}/T}$ fades. Below about $100\ \mathrm{K}$ the high-temperature rotational formula used here becomes inaccurate for $\mathrm{H_2}$ and the curve is only qualitative.
:::

::: application Isotope fractionation in nature
The same physics, with heavier atoms and smaller effects, underlies the isotope geochemistry of oxygen, carbon and hydrogen. Equilibrium constants for exchanges such as $\mathrm{H_2^{18}O(l)} + \mathrm{C^{16}O_2(g)} \rightleftharpoons \mathrm{H_2^{16}O(l)} + \mathrm{C^{16}O^{18}O(g)}$ differ from their classical (symmetry-number) values by a few per cent, and their temperature dependence, computed from vibrational frequencies by the Bigeleisen–Mayer and Urey formulations (1947), turned the $^{18}\mathrm{O}/^{16}\mathrm{O}$ ratio of fossil carbonate shells into a palaeothermometer. The heavier isotope always concentrates in the phase or species where it is most tightly bound, because that is where its zero-point energy advantage is largest.
:::

## Ionisation: electrons as a chemical species

Nothing in [[#prop-k]] requires the species to be molecules. Thermal ionisation of an atom, $\mathrm{A} \rightleftharpoons \mathrm{A^{+}} + \mathrm{e^{-}}$, is a dissociation in which one fragment is an electron, a particle with a spin degeneracy of 2, no internal structure and a mass $1/1836$ of a proton's. Because the translational partition functions of $\mathrm{A}$ and $\mathrm{A^{+}}$ are equal to an excellent approximation, [[#eq-k]] becomes
$$
K = \frac{p(\mathrm{A^{+}})\,p(\mathrm{e^{-}})}{p(\mathrm{A})\,p^\circ} = \frac{g(\mathrm{A^{+}})\cdot2}{g(\mathrm{A})}\cdot\frac{k_\mathrm{B}T}{p^\circ\Lambda_\mathrm{e}^{3}}\,e^{-I/k_\mathrm{B}T},
\qquad \Lambda_\mathrm{e} = \frac{h}{(2\pi m_\mathrm{e}k_\mathrm{B}T)^{1/2}},
$$ {#eq-saha}
where $I$ is the ionisation energy and the $g$ are the degeneracies of the ground levels. This is the **Saha equation**. Its structure is that of any dissociation: a Boltzmann factor in the ionisation energy, against an entropy factor $k_\mathrm{B}T/p^\circ\Lambda_\mathrm{e}^{3}$ — the number of translational states available to a free electron in the volume per particle — which is about $200$ at $2500\ \mathrm{K}$ and grows as $T^{5/2}$.

The equation explains why ionisation, unlike most chemical equilibria, is sensitive to *pressure* as well as temperature: lowering the pressure gives the electron more volume and favours ionisation. In stellar atmospheres, where the pressure is low, hydrogen is substantially ionised at $10\,000\ \mathrm{K}$ even though $I/k_\mathrm{B}T = 15.8$, and the temperature at which each element's lines appear and disappear with spectral class — the observation Saha set out to explain — follows from [[#eq-saha]]. In the laboratory, the same equation controls the fraction of alkali-metal atoms that survive un-ionised in a flame or an inductively coupled plasma, and hence the sensitivity of atomic emission and absorption measurements ([[analytical-chemistry/atomic-spectrometry]]); an exercise below works through caesium in a flame.

::: quiz
For the gas-phase dissociation $\mathrm{N_2O_4} \rightleftharpoons 2\,\mathrm{NO_2}$, which factor in [[#eq-k]] grows fastest with temperature and is chiefly responsible for driving the equilibrium to the right as $T$ rises?
- [ ] The ratio of vibrational partition functions, because $\mathrm{N_2O_4}$ has more vibrations.
- [x] The energy factor $e^{-\Delta_\mathrm{r}E_0/RT}$, which rises steeply from a very small value; the ratio of partition functions grows only as a modest power of $T$.
- [ ] The ratio of electronic partition functions, because $\mathrm{NO_2}$ is a radical.
- [ ] None: $K$ is independent of temperature because the reaction is a dissociation.
::: solution
For any reaction with $\Delta_\mathrm{r}E_0 \gg RT$, the exponential dominates the temperature dependence: here $\Delta_\mathrm{r}E_0 \approx 54\ \mathrm{kJ\,mol^{-1}}$, so $e^{-\Delta_\mathrm{r}E_0/RT}$ increases by a factor of about 200 between $300$ and $400\ \mathrm{K}$, while the partition-function ratio — translation contributing $T^{5/2}$, rotation $T^{3/2}$, the vibrations a slowly varying factor — grows by a factor of a few. The partition functions set the *magnitude* of $K$ (the large state-counting factor in favour of two molecules), but its steep *variation* is the Boltzmann factor: the molecular origin of $\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{r}H^\circ/RT^{2}$. The radical's electronic degeneracy ($g = 2$ for $\mathrm{NO_2}$) contributes a constant factor of 4, not a temperature dependence.
:::
:::

::: history
The calculation of equilibrium constants from molecular data grew out of the "chemical constants" of Sackur and Tetrode (1912) — the constant terms in vapour-pressure and equilibrium equations, which they showed could be computed from atomic masses and Planck's constant — and was extended to molecules in the 1920s as band spectroscopy supplied rotational and vibrational energy levels. The Indian astrophysicist Meghnad Saha derived in 1920 the ionisation equilibrium $\mathrm{A} \rightleftharpoons \mathrm{A^{+}} + \mathrm{e^{-}}$ in stellar atmospheres — the **Saha equation**, a direct application of [[#eq-k]] that explained the spectral sequence of stars. Harold Urey, who discovered deuterium in 1931 (Nobel Prize, 1934), calculated with David Rittenberg the equilibrium constants of hydrogen-isotope exchanges in 1933 and in 1947 published "The thermodynamic properties of isotopic substances", the foundation of stable-isotope geochemistry; Jacob Bigeleisen and Maria Goeppert Mayer gave the general formulation the same year. The JANAF thermochemical tables, first issued in the 1960s for the rocket programme and now maintained by NIST, compute the thermodynamic functions of gases from partition functions throughout.
:::

## Where this leads

Equation [[#eq-k]] is used in reverse whenever a measured equilibrium constant is interpreted in molecular terms, and forwards whenever thermochemical data are generated by computation ([[computational-chemistry/potential-energy-surfaces]]: frequency calculations exist largely to supply $q^\mathrm{V}$ and the zero-point energy). Its most important descendant is transition-state theory: treat the activated complex as a species in equilibrium with the reactants, apply [[#eq-k]], and the rate constant follows ([[statistical-thermodynamics/statistical-rate-theory]], [[kinetics/transition-state-theory]]); the kinetic isotope effect is the kinetic cousin of the isotope-exchange equilibrium of [[#ex-hd]]. For reactions in solution the gas-phase partition functions must be supplemented by solvation free energies ([[computational-chemistry/solvation-qmmm]]), and for interacting gases by the fugacity corrections of [[statistical-thermodynamics/real-gases-liquids]].

::: summary
- For perfect gases, $K = \prod_J(q^\circ_{J,\mathrm{m}}/N_\mathrm{A})^{\nu_J}e^{-\Delta_\mathrm{r}E_0/RT}$, where $q^\circ_{J,\mathrm{m}}/N_\mathrm{A}$ is the molecular partition function in the volume $k_\mathrm{B}T/p^\circ$ with energies from each molecule's lowest state.
- $\Delta_\mathrm{r}E_0$ is the reaction energy between lowest states, including zero-point energies; for dissociation it is $N_\mathrm{A}D_0$, not $N_\mathrm{A}D_\mathrm{e}$.
- The partition-function ratio is a state-counting (entropy-like) factor; the exponential is an energy (enthalpy-like) factor.
- For isomers $K = (q_\mathrm{B}/q_\mathrm{A})e^{-\Delta E_0/RT}$: equilibrium is a Boltzmann population ratio of two sets of states (gauche/anti butane, $30\,\%$ gauche at $298\ \mathrm{K}$).
- Dissociation equilibria are driven at high $T$ by the extra translational partition function of the fragments: $K(\mathrm{I_2} \rightleftharpoons 2\mathrm{I}, 1000\ \mathrm{K}) = 3.2\times10^{-3}$.
- Isotope-exchange equilibria are governed by symmetry numbers (classical limit $K = 4$ for $\mathrm{H_2 + D_2}$) and zero-point energies ($K = 3.26$ at $298\ \mathrm{K}$).
- Differentiating $\ln K$ recovers the van 't Hoff equation with $\Delta_\mathrm{r}H^\circ$ built from $\Delta_\mathrm{r}E_0$ and molecular enthalpies.
:::

## Exercises

::: exercise A two-state equilibrium {level=1 check="0.0463"}
A molecule exists in two non-degenerate forms with identical vibrational and rotational partition functions; form B lies $7.50\ \mathrm{kJ\,mol^{-1}}$ above form A. What fraction of molecules is in form B at $298.15\ \mathrm{K}$? (Enter the fraction.)
::: solution
$K = e^{-7500/(8.3145\times298.15)} = e^{-3.0255} = 0.0485$, and the fraction is $K/(1 + K) = 0.0485/1.0485 = 0.0463$. An energy difference of three times $RT$ leaves fewer than one molecule in twenty in the upper form.
:::
:::

::: exercise Degeneracy factors in a dissociation {level=1 check="16"}
For $\mathrm{Cl_2} \rightleftharpoons 2\,\mathrm{Cl}$, by what factor do the electronic degeneracies alone change $K$ at temperatures where only the ground levels ($^{1}\Sigma_\mathrm{g}^{+}$ for $\mathrm{Cl_2}$, $^{2}\mathrm{P}_{3/2}$ for Cl) are populated? (Enter the factor.)
::: solution
$q^\mathrm{E}(\mathrm{Cl}) = 2J + 1 = 4$, $q^\mathrm{E}(\mathrm{Cl_2}) = 1$, so the electronic factor is $4^{2}/1 = 16$. Its contribution to $\Delta_\mathrm{r}S^\circ$ is $R\ln 16 = 23.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$. At high temperatures the $^{2}\mathrm{P}_{1/2}$ level ($882\ \mathrm{cm^{-1}}$ higher) also contributes and the factor rises above 16.
:::
:::

::: exercise The classical limit of isotope exchange {level=1 check="4"}
Using only symmetry numbers, predict the high-temperature limit of $K$ for $\mathrm{H^{35}Cl} + \mathrm{D^{37}Cl} \rightleftharpoons \mathrm{H^{37}Cl} + \mathrm{D^{35}Cl}$, and for $^{35}\mathrm{Cl_2} + {}^{37}\mathrm{Cl_2} \rightleftharpoons 2\,{}^{35}\mathrm{Cl}{}^{37}\mathrm{Cl}$. (Enter the second.)
::: solution
In the classical limit the masses cancel and $K\to\prod_J\sigma_J^{-\nu_J}$. For the HCl exchange all symmetry numbers are 1, so $K\to1$. For the chlorine exchange, $\sigma = 2$ for the homonuclear molecules and 1 for $^{35}\mathrm{Cl}^{37}\mathrm{Cl}$, so $K\to(2\times2)/1^{2} = 4$ — the same statistical value as for $\mathrm{H_2 + D_2}$, and for the same reason: random pairing of two kinds of atom.
:::
:::

::: exercise Degree of dissociation of iodine {level=2 check="0.53"}
Using the function plotted in the figure, $K = 22.56\,T^{3/2}(1 - e^{-308.6/T})e^{-17\,898/T}$ (with $T$ in kelvin), calculate $K$ at $1500\ \mathrm{K}$ and the degree of dissociation of iodine at a total pressure of $1.00\ \mathrm{bar}$. (Enter $\alpha$.)
::: solution
$T^{3/2} = 5.809\times10^{4}$; $1 - e^{-0.2057} = 0.1859$; $e^{-11.932} = 6.58\times10^{-6}$. So $K = 22.56\times5.809\times10^{4}\times0.1859\times6.58\times10^{-6} = 1.60$. For $\mathrm{I_2} \rightleftharpoons 2\mathrm{I}$ starting from $n$ moles of $\mathrm{I_2}$, the mole fractions are $(1-\alpha)/(1+\alpha)$ and $2\alpha/(1+\alpha)$, so $K = 4\alpha^{2}p/[(1-\alpha^{2})p^\circ]$. With $p = p^\circ$: $4\alpha^{2}/(1 - \alpha^{2}) = 1.60$, $\alpha^{2} = 1.60/5.60 = 0.286$, $\alpha = 0.53$. More than half the iodine is atomic at $1500\ \mathrm{K}$.
:::
:::

::: exercise Entropy of reaction from symmetry {level=2 check="11.5"}
What contribution do the rotational symmetry numbers make to $\Delta_\mathrm{r}S^\circ$ for $\mathrm{H_2} + \mathrm{D_2} \rightarrow 2\,\mathrm{HD}$? (Enter it in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
The symmetry numbers contribute a factor $\sigma_{\mathrm{H_2}}\sigma_{\mathrm{D_2}}/\sigma_\mathrm{HD}^{2} = 4$ to $K$, temperature independent, hence purely entropic: $\Delta_\mathrm{r}S^\circ_\sigma = R\ln 4 = 11.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$. A symmetric molecule has fewer distinguishable orientations, hence fewer rotational states and less entropy; breaking the symmetry gains $R\ln 2$ per molecule.
:::
:::

::: exercise Thermal ionisation of caesium {level=2 check="0.68"}
In a flame at $2500\ \mathrm{K}$, caesium atoms ionise: $\mathrm{Cs(g)} \rightleftharpoons \mathrm{Cs^{+}(g)} + \mathrm{e^{-}(g)}$, with ionisation energy $3.894\ \mathrm{eV}$. The degeneracies are $g(\mathrm{Cs}, {}^{2}\mathrm{S}_{1/2}) = 2$, $g(\mathrm{Cs^{+}}, {}^{1}\mathrm{S}_0) = 1$, $g(\mathrm{e^{-}}) = 2$ (spin). The translational partition functions of $\mathrm{Cs}$ and $\mathrm{Cs^{+}}$ cancel. Compute $K$ and the fraction of caesium ionised when its total partial pressure (atoms plus ions) is $1.0\times10^{-6}\ \mathrm{bar}$, assuming all electrons come from caesium. (Enter the fraction ionised.)
::: hint
The electron's $q^\circ_\mathrm{m}/N_\mathrm{A}$ is $2k_\mathrm{B}T/(p^\circ\Lambda_\mathrm{e}^{3})$ with $\Lambda_\mathrm{e} = h/(2\pi m_\mathrm{e}k_\mathrm{B}T)^{1/2}$.
:::
::: solution
$\Lambda_\mathrm{e} = 6.626\times10^{-34}/(2\pi\times9.109\times10^{-31}\times1.3807\times10^{-23}\times2500)^{1/2} = 1.491\times10^{-9}\ \mathrm{m}$; $k_\mathrm{B}T/p^\circ = 3.452\times10^{-25}\ \mathrm{m^{3}}$; so $q^\circ_\mathrm{m}(\mathrm{e^{-}})/N_\mathrm{A} = 2\times3.452\times10^{-25}/3.313\times10^{-27} = 208$. The energy factor is $e^{-3.894\ \mathrm{eV}/k_\mathrm{B}T} = e^{-18.07} = 1.42\times10^{-8}$. With the degeneracy ratio $1/2$ for $\mathrm{Cs^{+}/Cs}$,
$$
K = \frac{1}{2}\times208\times1.42\times10^{-8} = 1.47\times10^{-6}.
$$
With total caesium pressure $P$ and fraction ionised $\alpha$: $p(\mathrm{Cs^{+}}) = p(\mathrm{e^{-}}) = \alpha P$, $p(\mathrm{Cs}) = (1-\alpha)P$, so $K = \alpha^{2}P/[(1-\alpha)p^\circ]$, i.e. $\alpha^{2}/(1 - \alpha) = 1.47$. Solving, $\alpha^{2} + 1.47\alpha - 1.47 = 0$ and $\alpha = 0.68$. This is the Saha equation at work: easily ionised alkali metals ionise substantially in flames at low partial pressures, which is why flame emission measurements of caesium and potassium use an "ionisation suppressor" (a large excess of another easily ionised element) to push the equilibrium back ([[analytical-chemistry/atomic-spectrometry]]).
:::
:::

::: exercise The van 't Hoff equation from partition functions {level=3}
Show that for a perfect gas $RT^{2}\,\mathrm{d}\ln(q^\circ_\mathrm{m}/N_\mathrm{A})/\mathrm{d}T = H^\circ_\mathrm{m}(T) - H^\circ_\mathrm{m}(0)$, and hence derive $\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{r}H^\circ/RT^{2}$ from [[#eq-k]].
::: solution
$q^\circ_\mathrm{m}/N_\mathrm{A} = (k_\mathrm{B}T/p^\circ\Lambda^{3})q^\text{int}(T)$. The internal energy per mole is $U_\mathrm{m} - U_\mathrm{m}(0) = RT^{2}(\partial\ln q/\partial T)_V$, the derivative being taken at constant volume. But $q^\circ_\mathrm{m}$ is evaluated at the volume $RT/p^\circ$, which itself grows with $T$: $\ln(q^\circ_\mathrm{m}/N_\mathrm{A}) = \ln T + \ln(1/p^\circ\Lambda^{3}) + \ln q^\text{int} + \text{const}$, so
$$
RT^{2}\frac{\mathrm{d}\ln(q^\circ_\mathrm{m}/N_\mathrm{A})}{\mathrm{d}T} = RT + RT^{2}\left(\frac{\partial\ln q}{\partial T}\right)_V = RT + U_\mathrm{m} - U_\mathrm{m}(0) = H^\circ_\mathrm{m} - H^\circ_\mathrm{m}(0),
$$
since $pV_\mathrm{m} = RT$ for a perfect gas and $H(0) = U(0)$. Then from [[#eq-k]],
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \sum_J\nu_J\frac{H^\circ_{J,\mathrm{m}} - H^\circ_{J,\mathrm{m}}(0)}{RT^{2}} + \frac{\Delta_\mathrm{r}E_0}{RT^{2}} = \frac{\Delta_\mathrm{r}H^\circ(T)}{RT^{2}},
$$
because $\sum_J\nu_JH^\circ_{J,\mathrm{m}}(0) = \Delta_\mathrm{r}E_0$ on the common energy scale, so $\Delta_\mathrm{r}H^\circ(T) = \Delta_\mathrm{r}E_0 + \sum_J\nu_J[H^\circ_{J,\mathrm{m}}(T) - H^\circ_{J,\mathrm{m}}(0)]$.
:::
:::

::: exercise Why $D_0$ and not $D_\mathrm{e}$? {level=3 check="0.00274"}
A student computes $K$ for $\mathrm{I_2} \rightleftharpoons 2\mathrm{I}$ at $1000\ \mathrm{K}$ as in [[#ex-iodine]], but uses the well depth $D_\mathrm{e} = D_0 + \tfrac{1}{2}hc\tilde\nu = 12\,547\ \mathrm{cm^{-1}}$ in the exponential while keeping $q^\mathrm{V} = (1 - e^{-\theta_\mathrm{V}/T})^{-1}$. What value of $K$ does the student obtain, and why is it wrong? What would be a *consistent* calculation using $D_\mathrm{e}$? (Enter the student's $K$.)
::: solution
The extra $107\ \mathrm{cm^{-1}}$ multiplies $K$ by $e^{-1.438\,78\times107.25/1000} = e^{-0.1543} = 0.857$, so the student gets $K = 3.19\times10^{-3}\times0.857 = 2.74\times10^{-3}$. The error is a double count: $q^\mathrm{V}$ was computed with energies measured from the zero-point level, so the energy of the molecule's lowest state *is* the zero-point level, and the energy gap to the separated atoms is $D_0$. A consistent calculation with $D_\mathrm{e}$ must measure the molecule's vibrational energies from the bottom of the well, $q^\mathrm{V}_\text{bottom} = e^{-\theta_\mathrm{V}/2T}/(1 - e^{-\theta_\mathrm{V}/T})$; the extra factor $e^{-\theta_\mathrm{V}/2T}$ in the denominator of $K$ cancels the extra $e^{-hc\tilde\nu/2k_\mathrm{B}T}$ in the exponential, restoring $K = 3.19\times10^{-3}$.
:::
::: answer
$2.74\times10^{-3}$
:::
:::
