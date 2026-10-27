Hang a tube of powdered iron(II) sulfate heptahydrate from a balance with its lower end between the poles of a magnet, and the tube seems to gain weight: it is pulled into the field. Do the same with potassium hexacyanidoferrate(II) trihydrate and the tube becomes very slightly *lighter*, pushed out of the field. This experiment, the **Gouy method**, was the first way of counting unpaired electrons in a complex, and the counts it gave in the 1930s and 1940s were the strongest evidence for the high- and low-spin configurations of [[coordination-chemistry/crystal-field-theory#prop-spin-state]]. Magnetic measurements remain one of the quickest ways to answer a structural question about a new complex: is this nickel(II) complex square planar or tetrahedral? Is this iron(II) high spin or low spin, and does it change with temperature? Is this copper(II) compound a dimer?

This chapter turns the measurement into a number of unpaired electrons. It starts with the definitions of magnetisation and susceptibility, derives the Curie law from the Boltzmann distribution, and obtains the spin-only formula for the effective magnetic moment. It then explains why many complexes deviate from that formula, through orbital angular momentum that the ligand field does not fully quench, and describes **spin crossover**, in which a complex switches between high and low spin with temperature, and the coupling of spins on neighbouring metals that leads to antiferromagnetism.

## Magnetisation and susceptibility

::: definition Magnetic susceptibility {#def-susceptibility}
A sample in a magnetic field of strength $H$ acquires a **magnetisation** $M$ (magnetic dipole moment per unit volume). For most substances at ordinary fields $M$ is proportional to $H$:
$$
M = \chi H,
$$
where $\chi$ is the dimensionless **volume susceptibility** (SI). The **molar susceptibility** is $\chi_\mathrm{m} = \chi V_\mathrm{m} = \chi M_\mathrm{r}/\rho$, in $\mathrm{m^3\,mol^{-1}}$. A substance with $\chi < 0$ is **diamagnetic** and is pushed out of a field; one with $\chi > 0$ is **paramagnetic** and is drawn in. Much of the coordination chemistry literature uses cgs units, in which $\chi_\mathrm{m}$ is in $\mathrm{cm^3\,mol^{-1}}$ and $\chi_\mathrm{m}(\mathrm{SI}) = 4\pi\times10^{-6}\,\chi_\mathrm{m}(\mathrm{cgs})$.
:::

All matter is diamagnetic: an applied field induces circulating currents in every closed electron shell, and by Lenz's law their moment opposes the field. Diamagnetism is small ($\chi_\mathrm{m} \approx -10^{-10}$ to $-10^{-9}\ \mathrm{m^3\,mol^{-1}}$ for a typical complex) and independent of temperature. Unpaired electrons give a paramagnetic contribution one to three orders of magnitude larger, which falls with temperature because thermal motion randomises the orientation of the moments. A measured susceptibility is the sum of both, and the diamagnetic part is subtracted using tabulated increments for each atom and bond (**Pascal's constants**) before the paramagnetic part is interpreted. For precise work on large organic ligands this correction is not negligible.

### Measuring χ

The Gouy balance measures the force on a long cylinder of sample hanging into an inhomogeneous field. The **Faraday balance** does the same for a small sample in a region of constant field gradient. Modern work uses a **SQUID magnetometer** (superconducting quantum interference device), which measures the magnetic moment of a milligram sample from about $2\ \mathrm{K}$ to $400\ \mathrm{K}$. In solution, the **Evans method** uses NMR: a reference compound dissolved in the paramagnetic solution resonates at a slightly different frequency from the same compound in an inner capillary of pure solvent, because the bulk magnetic susceptibilities differ. For a cylindrical sample in a superconducting magnet (field parallel to the tube), the shift $\Delta f$ at spectrometer frequency $f$ gives
$$
\chi_\mathrm{m} = \frac{3\,\Delta f}{f\,c},
$$ {#eq-evans}
with $c$ the concentration of the paramagnetic species in $\mathrm{mol\,m^{-3}}$ and $\chi_\mathrm{m}$ in $\mathrm{m^3\,mol^{-1}}$ (SI), after correcting for the diamagnetism of the solute.

## The Curie law and the spin-only formula

A single electron spin has magnetic moment $\boldsymbol\mu = -g_e\mu_\mathrm{B}\mathbf{s}/\hbar$, where $\mu_\mathrm{B} = e\hbar/2m_e = 9.274\times10^{-24}\ \mathrm{J\,T^{-1}}$ is the **Bohr magneton** and $g_e = 2.0023$. A complex with total spin $S$ and no orbital angular momentum has $2S + 1$ states $M_S = S, S - 1, \dots, -S$, which a field $B$ separates in energy by the **Zeeman effect**,
$$
E(M_S) = g\mu_\mathrm{B}BM_S.
$$

::: proposition The Curie law {#prop-curie}
For an ensemble of non-interacting spins $S$ with $g$-value $g$, in the limit $g\mu_\mathrm{B}B \ll k_\mathrm{B}T$, the molar susceptibility is
$$
\chi_\mathrm{m} = \frac{\mu_0 N_\mathrm{A} g^2\mu_\mathrm{B}^2 S(S+1)}{3k_\mathrm{B}T} = \frac{C}{T}.
$$ {#eq-curie}
The constant $C$ is the **Curie constant**. The result assumes that only the $2S + 1$ Zeeman levels of the ground state are populated and that their only field dependence is the linear Zeeman term.
:::

::: proof
The moment along the field of a molecule in state $M_S$ is $\mu_z = -\partial E/\partial B = -g\mu_\mathrm{B}M_S$. By the Boltzmann distribution ([[statistical-thermodynamics/boltzmann-distribution]]) the mean moment is
$$
\langle\mu_z\rangle = \frac{\sum_{M_S} (-g\mu_\mathrm{B}M_S)\,e^{-g\mu_\mathrm{B}BM_S/k_\mathrm{B}T}}{\sum_{M_S} e^{-g\mu_\mathrm{B}BM_S/k_\mathrm{B}T}}.
$$
Write $x = g\mu_\mathrm{B}B/k_\mathrm{B}T \ll 1$ and expand the exponentials to first order, $e^{-xM_S} \approx 1 - xM_S$. Since $\sum M_S = 0$, the denominator is $2S + 1$, and the numerator is $-g\mu_\mathrm{B}\sum M_S(1 - xM_S) = g\mu_\mathrm{B}x\sum M_S^2$. Using $\sum_{M_S=-S}^{S} M_S^2 = \tfrac13 S(S+1)(2S+1)$,
$$
\langle\mu_z\rangle = \frac{g\mu_\mathrm{B}x\,S(S+1)(2S+1)/3}{2S+1} = \frac{g^2\mu_\mathrm{B}^2 S(S+1)}{3k_\mathrm{B}T}\,B.
$$
The molar magnetisation is $N_\mathrm{A}\langle\mu_z\rangle$ per mole, and with $B = \mu_0 H$ (the sample's own contribution to the field is negligible for a paramagnet) the molar susceptibility is $\chi_\mathrm{m} = N_\mathrm{A}\langle\mu_z\rangle/H = \mu_0 N_\mathrm{A}g^2\mu_\mathrm{B}^2S(S+1)/3k_\mathrm{B}T$. At high fields or low temperatures, where $x$ is not small, the full sum gives the Brillouin function and the magnetisation saturates at $N_\mathrm{A}g\mu_\mathrm{B}S$.
:::

Because $\chi_\mathrm{m}$ depends on temperature, chemists report instead the **effective magnetic moment**, defined so that the Curie law takes the form of a single classical moment $\mu_\mathrm{eff}$ (in units of $\mu_\mathrm{B}$) free to orient in the field:
$$
\chi_\mathrm{m} = \frac{\mu_0 N_\mathrm{A}\mu_\mathrm{B}^2\mu_\mathrm{eff}^2}{3k_\mathrm{B}T}
\quad\Longrightarrow\quad
\mu_\mathrm{eff} = \sqrt{\frac{3k_\mathrm{B}}{\mu_0N_\mathrm{A}\mu_\mathrm{B}^2}}\sqrt{\chi_\mathrm{m}T} = 797.7\sqrt{\chi_\mathrm{m}T},
$$ {#eq-mueff}
with $\chi_\mathrm{m}$ in $\mathrm{m^3\,mol^{-1}}$ and $T$ in K. In cgs units the same relation is $\mu_\mathrm{eff} = 2.828\sqrt{\chi_\mathrm{m}T}$ with $\chi_\mathrm{m}$ in $\mathrm{cm^3\,mol^{-1}}$. Comparing with [[#eq-curie]] for $g = 2$ and $S = n/2$ ($n$ unpaired electrons):

::: definition Spin-only magnetic moment {#def-spin-only}
The **spin-only** effective magnetic moment of a complex with $n$ unpaired electrons and no orbital contribution is
$$
\mu_\mathrm{so} = g\sqrt{S(S+1)} = \sqrt{n(n+2)}\ \mu_\mathrm{B},
$$ {#eq-spin-only}
taking $g = 2$. The values are $1.73$ ($n = 1$), $2.83$ ($n = 2$), $3.87$ ($n = 3$), $4.90$ ($n = 4$) and $5.92\ \mu_\mathrm{B}$ ($n = 5$).
:::

The steps between successive values are about $1\ \mu_\mathrm{B}$, larger than the usual deviations from spin-only behaviour, so a measured $\mu_\mathrm{eff}$ almost always identifies $n$ unambiguously.

::: example From susceptibility to unpaired electrons {#ex-unpaired}
(a) A sample of $\mathrm{K_3[Fe(C_2O_4)_3]\cdot3H_2O}$ has $\chi_\mathrm{m} = 1.84\times10^{-7}\ \mathrm{m^3\,mol^{-1}}$ at $298\ \mathrm{K}$ after diamagnetic correction. Find $\mu_\mathrm{eff}$ and the number of unpaired electrons. (b) $\mathrm{K_3[Fe(CN)_6]}$ has $\mu_\mathrm{eff} = 2.3\ \mu_\mathrm{B}$. Interpret.
::: solution
(a) By [[#eq-mueff]], $\mu_\mathrm{eff} = 797.7\sqrt{1.84\times10^{-7} \times 298} = 797.7\sqrt{5.483\times10^{-5}} = 797.7 \times 7.405\times10^{-3} = 5.91\ \mu_\mathrm{B}$. The nearest spin-only value is $5.92$ for $n = 5$; the next, $4.90$ for $n = 4$, is a whole Bohr magneton away. Iron(III) is $d^5$ and oxalate is weak field, so the complex is high spin, $t_{2g}^3e_g^2$, with five unpaired electrons and an $A_{1g}$ ground state that has no orbital contribution. (b) Cyanide is strong field, so iron(III) is low spin, $t_{2g}^5$, with one unpaired electron, $\mu_\mathrm{so} = 1.73\ \mu_\mathrm{B}$. The measured $2.3\ \mu_\mathrm{B}$ is higher because the $^2T_{2g}$ ground state carries an orbital contribution, the subject of the next section.
:::
:::

The spin-only formula is also a check on the *data*. Since $d^5$ can only have one, three or five unpaired electrons, a measured moment of, say, $5.0\ \mu_\mathrm{B}$ for an iron(III) complex would point to an impure sample or an incomplete diamagnetic correction rather than to a new spin state: a result that fits no possible configuration is a sign of a bad measurement.

::: widget plot
f: 1/x; 1/(x - t); 1/(x + t)
x: 0, 300
y: 0, 0.1
sliders: t=30:0:100:5
labels: \text{Curie}; \text{Curie–Weiss},\ \theta > 0; \text{Curie–Weiss},\ \theta < 0
caption: Susceptibility (arbitrary units, Curie constant $C = 1$) against temperature $x$ in K. The first curve is the Curie law $\chi = C/T$ of [[#prop-curie]]. The others follow the **Curie–Weiss law** $\chi = C/(T - \theta)$ with Weiss constant $\theta = \pm t$ (slider). A positive $\theta$ describes neighbouring moments that tend to align (ferromagnetic interaction); a negative $\theta$, moments that tend to oppose (antiferromagnetic interaction), and the susceptibility then falls below the Curie value at low temperature. Plotting $1/\chi$ against $T$ turns each law into a straight line, whose intercept on the temperature axis is $\theta$. For magnetically dilute complexes $|\theta|$ is a few kelvin and the Curie law holds well above about $20\ \mathrm{K}$.
:::

## Orbital contributions

An electron in an orbital with angular momentum has an additional magnetic moment from its orbital motion, and for the free ion the moment depends on $L$, $S$ and $J$. In a complex the ligand field largely destroys (**quenches**) the orbital contribution, because the field removes the degeneracy that orbital motion needs. Orbital angular momentum about an axis requires that an electron can circulate, that is, that its orbital can be turned into an equivalent, degenerate orbital by rotation about that axis, and that the target orbital is not already filled with an electron of the same spin.

::: proposition When orbital angular momentum survives {#prop-orbital}
In an octahedral complex, an orbital contribution to the magnetic moment arises from the ground state only if it is orbitally triply degenerate ($T_{1g}$ or $T_{2g}$). Complexes with $A$ or $E$ ground states have no first-order orbital contribution, and their moments are close to spin-only, modified by a small second-order term
$$
\mu_\mathrm{eff} = \mu_\mathrm{so}\left(1 - \frac{\alpha\lambda}{\Delta_\mathrm{o}}\right), \qquad \alpha = 4\ (A_2\ \text{ground state}),\quad \alpha = 2\ (E\ \text{ground state}),
$$ {#eq-so-correction}
where $\lambda$ is the spin–orbit coupling constant of the ground term ($\lambda > 0$ for less than half-filled shells, $\lambda < 0$ for more than half-filled).
:::

::: proof
The $t_{2g}$ orbitals $d_{xz}$ and $d_{yz}$ are carried into each other by a $90^\circ$ rotation about $z$, and they are degenerate, so an electron in one of them can circulate about $z$ if the other is not occupied by an electron of the same spin; the same holds for $d_{xy}$, $d_{yz}$ about $x$ and $d_{xy}$, $d_{xz}$ about $y$. In contrast, $d_{x^2-y^2}$ would have to rotate into $d_{xy}$ (a $45^\circ$ rotation about $z$), which in an octahedral field lies $\Delta_\mathrm{o}$ away, and $d_{z^2}$ cannot be rotated into any other $d$ orbital. So the $e_g$ set carries no orbital angular momentum, and a $t_{2g}$ set does only when it is unevenly occupied, $t_{2g}^1$, $t_{2g}^2$, $t_{2g}^4$, $t_{2g}^5$, which are precisely the configurations with $T$ ground states. Configurations $t_{2g}^3$ and $t_{2g}^6$, with or without $e_g$ electrons, have $A$ or $E$ ground states and are quenched.

For the second-order term, spin–orbit coupling $\lambda\mathbf{L}\cdot\mathbf{S}$ mixes into an $A_{2g}$ ground state a little of the excited $T_{2g}$ state, which lies $\Delta_\mathrm{o}$ above and does carry orbital angular momentum. Second-order perturbation theory gives an admixed orbital moment proportional to $\lambda/\Delta_\mathrm{o}$, which shifts the effective $g$-value to $g = 2(1 - \alpha\lambda/\Delta_\mathrm{o})$, and $\mu_\mathrm{eff} = g\sqrt{S(S+1)}$ gives [[#eq-so-correction]]. The coefficient $\alpha$ comes from the matrix elements of $\mathbf{L}$ between the ground and excited states (4 for $A_2$, 2 for $E$). The sign of $\lambda$ follows Hund's third rule: positive for $d^1$–$d^4$, negative for $d^6$–$d^9$.
:::

The table compares spin-only and observed moments for common high-spin octahedral ions at room temperature (typical ranges, as compiled by Figgis and Lewis).

| ion | $d^n$ | ground state | $n$ | $\mu_\mathrm{so}$ | observed $\mu_\mathrm{eff}$ |
|---|---|---|---|---|---|
| $\mathrm{Ti^{3+}}$ | $d^1$ | $^2T_{2g}$ | 1 | 1.73 | 1.6–1.8 |
| $\mathrm{V^{3+}}$ | $d^2$ | $^3T_{1g}$ | 2 | 2.83 | 2.7–2.9 |
| $\mathrm{Cr^{3+}}$ | $d^3$ | $^4A_{2g}$ | 3 | 3.87 | 3.7–3.9 |
| $\mathrm{Mn^{2+}}$ | $d^5$ | $^6A_{1g}$ | 5 | 5.92 | 5.6–6.1 |
| $\mathrm{Fe^{2+}}$ | $d^6$ | $^5T_{2g}$ | 4 | 4.90 | 5.1–5.7 |
| $\mathrm{Co^{2+}}$ | $d^7$ | $^4T_{1g}$ | 3 | 3.87 | 4.3–5.2 |
| $\mathrm{Ni^{2+}}$ | $d^8$ | $^3A_{2g}$ | 2 | 2.83 | 2.9–3.3 |
| $\mathrm{Cu^{2+}}$ | $d^9$ | $^2E_g$ | 1 | 1.73 | 1.7–2.2 |

The $A$ and $E$ ions ($\mathrm{Cr^{3+}}$, $\mathrm{Mn^{2+}}$, $\mathrm{Ni^{2+}}$, $\mathrm{Cu^{2+}}$) are close to spin-only, slightly below for $d^3$ ($\lambda > 0$) and above for $d^8$, $d^9$ ($\lambda < 0$), exactly as [[#eq-so-correction]] predicts. The $T$ ions deviate more, and cobalt(II) most of all. For the early $T$ ions ($d^1$, $d^2$) the moments are *below* spin-only at room temperature, and they fall further on cooling, because spin–orbit coupling within the $T$ state splits it into levels whose population changes with temperature: Curie's law does not hold for them.

::: example Spin–orbit corrections for nickel(II), chromium(III) and copper(II) {#ex-so}
Use [[#eq-so-correction]] to estimate $\mu_\mathrm{eff}$ for (a) $\mathrm{[Ni(H_2O)_6]^{2+}}$ ($\Delta_\mathrm{o} = 8500\ \mathrm{cm^{-1}}$, $\lambda = -315\ \mathrm{cm^{-1}}$), (b) $\mathrm{[Cr(H_2O)_6]^{3+}}$ ($\Delta_\mathrm{o} = 17\,400\ \mathrm{cm^{-1}}$, $\lambda = +92\ \mathrm{cm^{-1}}$), (c) $\mathrm{[Cu(H_2O)_6]^{2+}}$ ($\Delta_\mathrm{o} \approx 12\,500\ \mathrm{cm^{-1}}$, $\lambda = -830\ \mathrm{cm^{-1}}$).
::: solution
(a) $A_{2g}$, $\alpha = 4$: $\mu = 2.83(1 + 4 \times 315/8500) = 2.83 \times 1.148 = 3.25\ \mu_\mathrm{B}$, in the observed range (3.2–3.3 for the aqua ion). (b) $A_{2g}$, $\alpha = 4$: $\mu = 3.87(1 - 4 \times 92/17\,400) = 3.87 \times 0.979 = 3.79\ \mu_\mathrm{B}$, as observed. (c) $E_g$, $\alpha = 2$: $\mu = 1.73(1 + 2 \times 830/12\,500) = 1.73 \times 1.133 = 1.96\ \mu_\mathrm{B}$, in the observed range for copper(II). The large $|\lambda|$ of copper, a late, more compact $3d$ ion, is why its deviation is the largest of the three. (The free-ion values of $\lambda$ are used here; in complexes they are reduced by covalency, by up to 30 %, which is why the agreement is only semi-quantitative.)
:::
:::

::: example Octahedral or tetrahedral cobalt(II)? {#ex-cobalt}
A blue cobalt(II) complex $\mathrm{[CoX_2L_2]}$ has $\mu_\mathrm{eff} = 4.5\ \mu_\mathrm{B}$ and a pink isomeric material has $5.1\ \mu_\mathrm{B}$. Which is likely tetrahedral and which octahedral (for instance a polymer with bridging X)?
::: solution
High-spin $d^7$ has three unpaired electrons in both geometries ($\mu_\mathrm{so} = 3.87$). In an octahedral field the configuration is $t_{2g}^5e_g^2$ and the ground state is $^4T_{1g}$, which has a large first-order orbital contribution: moments of 4.7–5.2 $\mu_\mathrm{B}$. In a tetrahedral field the configuration is $e^4t_2^3$ and the ground state is $^4A_2$ (the $e$ set is full and the $t_2$ set half-full, so no circulation is possible), giving only the second-order contribution of [[#eq-so-correction]], with $\Delta_\mathrm{t}$ small and $\lambda$ negative: 4.4–4.8 $\mu_\mathrm{B}$. So the blue compound ($4.5$) is tetrahedral and the pink one ($5.1$) octahedral, consistent with their colours ([[coordination-chemistry/spectra-of-complexes]]: tetrahedral cobalt(II) absorbs strongly in the red-orange and looks blue; octahedral cobalt(II) absorbs weakly in the blue-green and looks pink). Magnetism and spectra together are much more convincing than either alone.
:::
:::

### Heavier metals and temperature-independent paramagnetism

For the $4d$ and $5d$ metals the picture changes in two ways. First, almost all their complexes are low spin, so the number of unpaired electrons is small. Second, the spin–orbit coupling constant grows steeply with atomic number (roughly as $Z^2$ to $Z^4$ for a given valence shell), reaching several thousand $\mathrm{cm^{-1}}$ for the $5d$ metals, comparable with or larger than $k_\mathrm{B}T$ at room temperature ($207\ \mathrm{cm^{-1}}$). For a $T$ ground state, spin–orbit coupling then splits the state into levels separated by more than $k_\mathrm{B}T$, and the spin and orbital moments partly cancel in the lowest level. Low-spin osmium(IV) in $\mathrm{K_2[OsCl_6]}$ ($t_{2g}^4$, $^3T_{1g}$, two unpaired electrons, $\mu_\mathrm{so} = 2.83\ \mu_\mathrm{B}$) has a room-temperature moment of only about $1.5\ \mu_\mathrm{B}$, which falls towards zero on cooling because its lowest spin–orbit level is non-magnetic. Takeo Kotani's 1949 treatment of such $T$ states gives $\mu_\mathrm{eff}$ as a function of $k_\mathrm{B}T/|\lambda|$, and for heavy metals the spin-only formula is simply not applicable.

Finally, even complexes with no unpaired electrons can show a small, *temperature-independent* positive susceptibility. A magnetic field mixes low-lying excited states with orbital angular momentum into a non-degenerate ground state (the second-order Zeeman effect), inducing a paramagnetic moment that does not depend on Boltzmann populations. This **temperature-independent paramagnetism** (TIP), of order $10^{-9}\ \mathrm{m^3\,mol^{-1}}$, is why $\mathrm{K[MnO_4]}$ and $\mathrm{K_2[CrO_4]}$, both $d^0$, are weakly paramagnetic, and it must be subtracted along with the diamagnetism before small moments are interpreted.

::: example How much does the diamagnetic correction matter? {#ex-diamagnetic}
A nickel(II) complex with a large organic ligand has a measured molar susceptibility of $4.95\times10^{-8}\ \mathrm{m^3\,mol^{-1}}$ at $298\ \mathrm{K}$. Its diamagnetic contribution, estimated from Pascal's constants, is $-2.9\times10^{-9}\ \mathrm{m^3\,mol^{-1}}$. Find $\mu_\mathrm{eff}$ with and without the correction.
::: solution
The measured value is the sum of paramagnetic and diamagnetic parts, $\chi_\mathrm{m} = \chi_\mathrm{para} + \chi_\mathrm{dia}$, so $\chi_\mathrm{para} = 4.95\times10^{-8} - (-2.9\times10^{-9}) = 5.24\times10^{-8}\ \mathrm{m^3\,mol^{-1}}$. Uncorrected: $\mu_\mathrm{eff} = 797.7\sqrt{4.95\times10^{-8} \times 298} = 3.06\ \mu_\mathrm{B}$. Corrected: $797.7\sqrt{5.24\times10^{-8} \times 298} = 3.15\ \mu_\mathrm{B}$. Both indicate two unpaired electrons, so the conclusion survives, but the correction (3 % in $\mu_\mathrm{eff}$, 6 % in $\chi$) is as large as the spin–orbit effect of [[#ex-so]]. Any argument that rests on the *deviation* from spin-only, such as distinguishing octahedral from tetrahedral cobalt(II), needs the correction. The sign is easy to get wrong: diamagnetism is negative, so correcting for it *increases* the paramagnetic susceptibility.
:::
:::

::: quiz
Which of these octahedral complexes should have a magnetic moment close to the spin-only value?
- [x] $\mathrm{[Cr(NH_3)_6]^{3+}}$
- [ ] $\mathrm{[Ti(H_2O)_6]^{3+}}$
- [x] $\mathrm{[Ni(NH_3)_6]^{2+}}$
- [ ] $\mathrm{[Fe(CN)_6]^{3-}}$
- [x] $\mathrm{[Mn(H_2O)_6]^{2+}}$
::: solution
Spin-only behaviour (to within the small second-order correction) requires an $A$ or $E$ ground state. $\mathrm{Cr^{3+}}$, $t_{2g}^3$: $^4A_{2g}$. $\mathrm{Ni^{2+}}$, $t_{2g}^6e_g^2$: $^3A_{2g}$. High-spin $\mathrm{Mn^{2+}}$, $t_{2g}^3e_g^2$: $^6A_{1g}$. $\mathrm{Ti^{3+}}$ ($t_{2g}^1$, $^2T_{2g}$) and low-spin $\mathrm{Fe^{3+}}$ ($t_{2g}^5$, $^2T_{2g}$) have orbitally degenerate $T$ ground states with first-order orbital contributions.
:::
:::

## Spin crossover

When $\Delta_\mathrm{o}$ and the pairing energy are nearly equal, the high-spin and low-spin states of a $d^4$–$d^7$ complex lie close in energy, and temperature can switch between them. The best-known cases are iron(II) complexes with six nitrogen donors, such as $\mathrm{[Fe(phen)_2(NCS)_2]}$, $\mathrm{[Fe(ptz)_6](BF_4)_2}$ and the iron(II) triazole polymers.

::: proposition The spin-crossover equilibrium {#prop-crossover}
Treat the change $\mathrm{LS} \rightleftharpoons \mathrm{HS}$ as a chemical equilibrium between non-interacting molecules with standard enthalpy $\Delta H$ and entropy $\Delta S$ (both positive). The fraction of molecules in the high-spin state is
$$
\gamma_\mathrm{HS}(T) = \frac{1}{1 + \exp\!\left[\dfrac{\Delta H}{R}\left(\dfrac{1}{T} - \dfrac{1}{T_{1/2}}\right)\right]}, \qquad T_{1/2} = \frac{\Delta H}{\Delta S},
$$ {#eq-crossover}
and the measured $\chi_\mathrm{m}T = \gamma_\mathrm{HS}(\chi_\mathrm{m}T)_\mathrm{HS} + (1 - \gamma_\mathrm{HS})(\chi_\mathrm{m}T)_\mathrm{LS}$. The model ignores interactions between molecules, which in solids make many transitions much more abrupt and sometimes hysteretic.
:::

::: proof
The equilibrium constant is $K = \gamma_\mathrm{HS}/(1 - \gamma_\mathrm{HS}) = \exp(-\Delta G/RT)$ with $\Delta G = \Delta H - T\Delta S$ ([[thermodynamics/reaction-equilibrium]]). Solving for $\gamma_\mathrm{HS}$ gives $\gamma_\mathrm{HS} = K/(1 + K) = 1/(1 + e^{\Delta G/RT})$. Now $\Delta G/RT = \Delta H/RT - \Delta S/R = (\Delta H/R)(1/T - \Delta S/\Delta H) = (\Delta H/R)(1/T - 1/T_{1/2})$, which gives [[#eq-crossover]]. At $T = T_{1/2}$, $\Delta G = 0$ and half the molecules are high spin. The low-spin state is favoured by enthalpy (its CFSE is larger, and its bonds are shorter and stronger), and the high-spin state by entropy: it has a higher spin degeneracy, $2S + 1 = 5$ against $1$ for iron(II), contributing $R\ln5 = 13.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$, and its longer, weaker bonds have lower vibrational frequencies and so more vibrational entropy. Because $\Delta S > 0$, the high-spin state always wins at high enough temperature.
:::

::: widget plot
f: 1/(1 + exp(h*1000/8.314*(1/x - s/(h*1000)))); 3/(1 + exp(h*1000/8.314*(1/x - s/(h*1000))))
x: 20, 400
y: 0, 3.3
sliders: h=8.6:2:20:0.2; s=48.8:20:100:0.2
labels: \gamma_\mathrm{HS}; \chi_\mathrm{m}T\ /\ \mathrm{cm^3\,K\,mol^{-1}}
caption: Spin crossover from [[#eq-crossover]] against temperature $x$ in K. The sliders set $\Delta H$ (in $\mathrm{kJ\,mol^{-1}}$) and $\Delta S$ (in $\mathrm{J\,K^{-1}\,mol^{-1}}$); the starting values, $8.6\ \mathrm{kJ\,mol^{-1}}$ and $48.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$, are the calorimetric values reported by Sorai and Seki for $\mathrm{[Fe(phen)_2(NCS)_2]}$, giving $T_{1/2} = 176\ \mathrm{K}$. The second curve is $\chi_\mathrm{m}T$ in cgs units, taking the spin-only value $(\chi_\mathrm{m}T)_\mathrm{HS} = 0.125g^2S(S+1) = 3.0\ \mathrm{cm^3\,K\,mol^{-1}}$ for $S = 2$, $g = 2$, and zero for low spin. Raising $\Delta H$ at fixed $\Delta S$ moves the transition up; raising both together at fixed ratio sharpens it. The real compound changes spin over a few kelvin, much more abruptly than this non-interacting model allows: elastic interactions between molecules in the crystal make the transition cooperative.
:::

::: example A spin-crossover compound {#ex-crossover}
For $\mathrm{[Fe(phen)_2(NCS)_2]}$ take $\Delta H = 8.6\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S = 48.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$. (a) Find $T_{1/2}$. (b) Find $\gamma_\mathrm{HS}$ and the expected $\mu_\mathrm{eff}$ at $298\ \mathrm{K}$ and at $150\ \mathrm{K}$ in the non-interacting model. (c) What fraction of $\Delta S$ comes from the spin degeneracy?
::: solution
(a) $T_{1/2} = 8600/48.8 = 176\ \mathrm{K}$. (b) At $298\ \mathrm{K}$: $\Delta G = 8600 - 298 \times 48.8 = -5942\ \mathrm{J\,mol^{-1}}$, $K = e^{5942/(8.314 \times 298)} = e^{2.398} = 11.0$, $\gamma_\mathrm{HS} = 11.0/12.0 = 0.917$. At $150\ \mathrm{K}$: $\Delta G = 8600 - 7320 = 1280\ \mathrm{J\,mol^{-1}}$, $K = e^{-1.026} = 0.358$, $\gamma_\mathrm{HS} = 0.264$. Since $\chi_\mathrm{m}T$ and hence $\mu_\mathrm{eff}^2$ are proportional to $\gamma_\mathrm{HS}$ (the low-spin state is diamagnetic), $\mu_\mathrm{eff} = 4.90\sqrt{\gamma_\mathrm{HS}}$: $4.69\ \mu_\mathrm{B}$ at $298\ \mathrm{K}$ and $2.52\ \mu_\mathrm{B}$ at $150\ \mathrm{K}$. (Note that $\mu_\mathrm{eff}$ averages as a square root, not linearly.) The real solid is almost fully high spin at room temperature and almost fully low spin below about $170\ \mathrm{K}$. (c) $R\ln5 = 13.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$, $13.4/48.8 = 27\ \%$. The remaining three-quarters is vibrational entropy, mainly from the softer Fe–N stretching and bending modes of the high-spin state, whose Fe–N bonds are about $20\ \mathrm{pm}$ longer.
:::
:::

::: warning A single moment at room temperature is not a spin state {#warn-mueff}
It is easy to measure $\mu_\mathrm{eff}$ at $298\ \mathrm{K}$, compare with [[#eq-spin-only]] and declare the spin state. Three things can go wrong. (1) A $T$ ground state carries an orbital contribution that can shift $\mu_\mathrm{eff}$ by $1\ \mu_\mathrm{B}$ (octahedral cobalt(II) at $5.1$ looks like "four unpaired electrons", which $d^7$ cannot have). (2) A spin-crossover compound partway through its transition gives an intermediate moment that corresponds to no integer $n$; only the temperature dependence reveals the mixture. (3) Metal–metal coupling in a polynuclear complex lowers the moment per metal, sometimes to near zero at low temperature, so a dimer of two $S = \tfrac12$ copper(II) ions can look "diamagnetic". In every doubtful case, measure $\chi_\mathrm{m}$ as a function of temperature.
:::

## Magnetic coupling between metal centres

When two paramagnetic ions are close, typically joined by a bridging ligand, their spins interact. The interaction is described by the isotropic **exchange Hamiltonian** $\hat H = -2J\,\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$ (sign conventions vary; in this one $J < 0$ is antiferromagnetic). For two $S = \tfrac12$ ions it gives a singlet ($S = 0$) and a triplet ($S = 1$) separated by $2|J|$, with the singlet lower when $J < 0$. The classic case is copper(II) acetate monohydrate, $\mathrm{[Cu_2(\mu\text{-}O_2CCH_3)_4(H_2O)_2]}$, a "paddlewheel" dimer whose singlet–triplet gap is about $300\ \mathrm{cm^{-1}}$. Its moment per copper at room temperature is about $1.4\ \mu_\mathrm{B}$, well below the $1.9\ \mu_\mathrm{B}$ of an isolated copper(II), and it falls towards zero on cooling as the molecules drop into the singlet. Brebis Bleaney and K. D. Bowers explained this in 1952 from EPR spectra, and their susceptibility equation for a coupled pair is still the standard model. The coupling passes through the bridging acetates (**superexchange**), not a direct Cu–Cu bond. In extended solids, the same interactions produce antiferromagnetic and ferromagnetic order below a critical temperature, the subject of [[materials-chemistry/magnetic-optical]].

## Where this leads

Magnetic moments measure the spin state that [[coordination-chemistry/crystal-field-theory]] predicts and check the ligand field assignments of [[coordination-chemistry/spectra-of-complexes]]. The orbital contributions, small for the $d$ block, become dominant for the lanthanides, whose $4f$ electrons are shielded from the ligands so that $J$ remains a good quantum number and the moments follow the free-ion formula $g_J\sqrt{J(J+1)}$ ([[coordination-chemistry/f-block]]). The unpaired electrons themselves are observed directly by EPR ([[spectroscopy/epr]]), whose $g$-values carry the same spin–orbit information as [[#eq-so-correction]]. Magnetic coupling between metals is central to the iron–sulfur clusters and the oxygen-binding and oxygen-activating copper and iron sites of [[coordination-chemistry/bioinorganic]].

::: history
Pierre Curie established the inverse temperature dependence of paramagnetic susceptibility in his 1895 thesis on the magnetic properties of substances at different temperatures, and Pierre Weiss added the molecular-field correction in 1907. Paul Langevin derived the classical $1/T$ law from statistical mechanics in 1905, and the quantum-mechanical version, with $S(S+1)$ and the quenching of orbital angular momentum, was given by John Hasbrouck Van Vleck in *The Theory of Electric and Magnetic Susceptibilities* (1932), the book for which, with later work, he shared the 1977 Nobel Prize in Physics. Linus Pauling used magnetic moments in the 1930s to classify complexes as "ionic" or "covalent", the distinction that crystal and ligand field theory later reinterpreted as high and low spin. Spin crossover was first observed by Luigi Cambi and his co-workers in the early 1930s in iron(III) tris(dithiocarbamates), whose moments changed with temperature; the iron(II) compound $\mathrm{[Fe(phen)_2(NCS)_2]}$ was characterised by Edgar König and Konrad Madeja in 1967. Bleaney and Bowers's 1952 analysis of copper acetate established the exchange-coupled dimer. D. F. Evans published his NMR method in 1959.
:::

::: summary
- Paramagnetic susceptibility follows the Curie law $\chi_\mathrm{m} = \mu_0N_\mathrm{A}g^2\mu_\mathrm{B}^2S(S+1)/3k_\mathrm{B}T$, derived from the Boltzmann populations of the Zeeman levels at low field.
- The effective moment $\mu_\mathrm{eff} = 797.7\sqrt{\chi_\mathrm{m}T}$ (SI) $= 2.828\sqrt{\chi_\mathrm{m}T}$ (cgs) is independent of temperature for a Curie paramagnet; spin-only, $\mu_\mathrm{so} = \sqrt{n(n+2)}\ \mu_\mathrm{B}$.
- Correct measured susceptibilities for diamagnetism (Pascal's constants) before interpreting them; susceptibilities are measured with a Gouy or Faraday balance, a SQUID, or in solution by the Evans NMR method.
- Orbital angular momentum survives only for orbitally degenerate $T$ ground states; $A$ and $E$ ground states give near spin-only moments with a correction $\mu_\mathrm{so}(1 - \alpha\lambda/\Delta_\mathrm{o})$.
- Octahedral and tetrahedral cobalt(II) can be distinguished by their moments (about 4.7–5.2 against 4.4–4.8 $\mu_\mathrm{B}$).
- Spin crossover is an equilibrium with $T_{1/2} = \Delta H/\Delta S$; low spin wins on enthalpy and high spin on spin and vibrational entropy. Cooperative interactions make real transitions abrupt.
- Bridging ligands couple spins on neighbouring metals; antiferromagnetic coupling lowers the moment and makes it fall on cooling (copper acetate).
:::

## Exercises

::: exercise Spin-only moments {level=1 check="3.87"}
Calculate the spin-only magnetic moment of $\mathrm{[Cr(NH_3)_6]^{3+}}$ and of $\mathrm{[Fe(H_2O)_6]^{2+}}$. (Enter the value for the chromium complex in $\mu_\mathrm{B}$, to three significant figures.)
::: solution
Chromium(III), $d^3$, $n = 3$: $\sqrt{3 \times 5} = \sqrt{15} = 3.87\ \mu_\mathrm{B}$. High-spin iron(II), $d^6$, $n = 4$: $\sqrt{24} = 4.90\ \mu_\mathrm{B}$ (observed values are higher, 5.1–5.5, because of the $^5T_{2g}$ orbital contribution).
:::
:::

::: exercise Unpaired electrons from a moment {level=1 check="5"}
An iron(III) complex has $\mu_\mathrm{eff} = 5.95\ \mu_\mathrm{B}$. How many unpaired electrons does it have, and what can you say about its ligands? (Enter the number of unpaired electrons.)
::: solution
$\sqrt{n(n+2)} = 5.95$ gives $n(n+2) = 35.4$, so $n = 5$ ($\mu_\mathrm{so} = 5.92$). Iron(III) is $d^5$, so the complex is high spin, $t_{2g}^3e_g^2$ ($^6A_{1g}$, no orbital contribution), and its ligands are weak field: water, fluoride, oxalate, chloride.
:::
:::

::: exercise From cgs susceptibility to moment {level=1 check="1.87"}
Copper(II) sulfate pentahydrate has $\chi_\mathrm{m} = 1.46\times10^{-3}\ \mathrm{cm^3\,mol^{-1}}$ (cgs, corrected for diamagnetism) at $298\ \mathrm{K}$. Find $\mu_\mathrm{eff}$. (Enter $\mu_\mathrm{eff}$ in $\mu_\mathrm{B}$, to three significant figures.)
::: solution
$\mu_\mathrm{eff} = 2.828\sqrt{1.46\times10^{-3} \times 298} = 2.828\sqrt{0.4351} = 2.828 \times 0.6596 = 1.87\ \mu_\mathrm{B}$: one unpaired electron, with the small positive orbital correction expected for a $d^9$ ion with an $E$-derived ground state.
:::
:::

::: exercise Square planar or tetrahedral nickel(II)? {level=2}
Two nickel(II) complexes of formula $\mathrm{[NiX_2(PR_3)_2]}$ are isolated: one red and diamagnetic, one green-blue with $\mu_\mathrm{eff} = 3.2\ \mu_\mathrm{B}$. Assign their geometries and explain.
::: solution
Nickel(II) is $d^8$. In a square-planar field all eight electrons pair in the four lower orbitals, leaving $d_{x^2-y^2}$ empty ([[coordination-chemistry/crystal-field-theory]]): diamagnetic. In a tetrahedral field the configuration is $e^4t_2^4$ with two unpaired electrons ($\mu_\mathrm{so} = 2.83$); the $^3T_1$ ground state carries an orbital contribution, raising $\mu_\mathrm{eff}$ to 3.2–4.0 $\mu_\mathrm{B}$. So the red diamagnetic isomer is square planar and the paramagnetic one tetrahedral. Such planar–tetrahedral pairs, for instance with $\mathrm{X} = \mathrm{Br}$ and mixed alkyl/aryl phosphines, interconvert in solution, and the equilibrium can be followed by magnetic and NMR measurements.
:::
:::

::: exercise The Evans method {level=2 check="3.20"}
In an Evans measurement on a $400\ \mathrm{MHz}$ spectrometer, a $0.0200\ \mathrm{mol\,dm^{-3}}$ solution of a nickel(II) complex shifts the reference signal by $144\ \mathrm{Hz}$ relative to the capillary at $298\ \mathrm{K}$. Neglecting the diamagnetic correction, find $\chi_\mathrm{m}$ and $\mu_\mathrm{eff}$. (Enter $\mu_\mathrm{eff}$ in $\mu_\mathrm{B}$, to three significant figures.)
::: solution
$\Delta f/f = 144/(400\times10^6) = 3.60\times10^{-7}$, and $c = 0.0200\ \mathrm{mol\,dm^{-3}} = 20.0\ \mathrm{mol\,m^{-3}}$. By [[#eq-evans]], $\chi_\mathrm{m} = 3 \times 3.60\times10^{-7}/20.0 = 5.40\times10^{-8}\ \mathrm{m^3\,mol^{-1}}$. Then $\mu_\mathrm{eff} = 797.7\sqrt{5.40\times10^{-8} \times 298} = 797.7\sqrt{1.609\times10^{-5}} = 797.7 \times 4.012\times10^{-3} = 3.20\ \mu_\mathrm{B}$: two unpaired electrons, an octahedral (or tetrahedral) nickel(II) complex.
:::
:::

::: exercise Shifting a spin transition {level=2 check="0.5"}
A spin-crossover iron(II) complex has $\Delta H = 15.0\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S = 60.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$. (a) Find $T_{1/2}$. (b) Find $\gamma_\mathrm{HS}$ at $T_{1/2}$ and at $300\ \mathrm{K}$. (c) A ligand substituent raises $\Delta H$ by $2.0\ \mathrm{kJ\,mol^{-1}}$ without changing $\Delta S$; what is the new $T_{1/2}$? (Enter $\gamma_\mathrm{HS}$ at $T_{1/2}$.)
::: solution
(a) $T_{1/2} = 15\,000/60.0 = 250\ \mathrm{K}$. (b) At $T_{1/2}$, $\gamma_\mathrm{HS} = 0.5$ by definition. At $300\ \mathrm{K}$: $\Delta G = 15\,000 - 18\,000 = -3000\ \mathrm{J\,mol^{-1}}$, $K = e^{3000/(8.314 \times 300)} = e^{1.203} = 3.33$, $\gamma_\mathrm{HS} = 3.33/4.33 = 0.769$. (c) $17\,000/60.0 = 283\ \mathrm{K}$. A stronger-field ligand stabilises the low-spin state, raises $\Delta H$ and moves the transition towards room temperature, which is how chemists tune spin-crossover materials for sensors and displays.
:::
:::

::: exercise Curie's law and saturation {level=3 check="0.336"}
For $S = \tfrac12$ and $g = 2$, the exact mean moment is $\langle\mu_z\rangle = \mu_\mathrm{B}\tanh(\mu_\mathrm{B}B/k_\mathrm{B}T)$. (a) Derive this from the two Zeeman levels. (b) Show that it reduces to the Curie law for small fields. (c) Find $x = \mu_\mathrm{B}B/k_\mathrm{B}T$ at $B = 1.00\ \mathrm{T}$ and $T = 2.00\ \mathrm{K}$, and the percentage by which the Curie law overestimates the magnetisation there. (Enter $x$ to three significant figures.)
::: hint
$\tanh x \approx x - x^3/3$ for small $x$.
:::
::: solution
(a) The levels $M_S = \pm\tfrac12$ have energies $\pm\mu_\mathrm{B}B$ (with $g = 2$) and moments $\mp\mu_\mathrm{B}$. Then $\langle\mu_z\rangle = \mu_\mathrm{B}(e^{x} - e^{-x})/(e^{x} + e^{-x}) = \mu_\mathrm{B}\tanh x$, with $x = \mu_\mathrm{B}B/k_\mathrm{B}T$. (b) For small $x$, $\tanh x \approx x$ and $\langle\mu_z\rangle \approx \mu_\mathrm{B}^2B/k_\mathrm{B}T$, which is [[#prop-curie]] with $g^2S(S+1)/3 = 4 \times \tfrac34/3 = 1$. (c) $x = (9.274\times10^{-24} \times 1.00)/(1.381\times10^{-23} \times 2.00) = 0.336$. The Curie law uses $x$ in place of $\tanh x$, so it overestimates the magnetisation by $x/\tanh x - 1 = 0.3359/0.3238 - 1 = 3.7\ \%$ (the series estimate $x^2/3 = 0.038$ agrees). At $2\ \mathrm{K}$ and $1\ \mathrm{T}$ the Curie law is still almost right; at $7\ \mathrm{T}$ and $2\ \mathrm{K}$ ($x = 2.35$) the magnetisation is 98 % saturated and the Curie law fails completely, which is why low-temperature SQUID studies use small fields.
:::
:::

::: exercise Extracting λ from a moment {level=3 check="-307"}
A nickel(II) complex with $\Delta_\mathrm{o} = 10\,800\ \mathrm{cm^{-1}}$ has $\mu_\mathrm{eff} = 3.15\ \mu_\mathrm{B}$, independent of temperature. (a) Why is the moment independent of temperature? (b) Use [[#eq-so-correction]] to find the effective spin–orbit coupling constant $\lambda$ in the complex. (c) Compare with the free-ion value $-315\ \mathrm{cm^{-1}}$ and comment. (Enter $\lambda$ in $\mathrm{cm^{-1}}$, to three significant figures.)
::: solution
(a) Nickel(II) octahedral has a $^3A_{2g}$ ground state with no orbital degeneracy; the second-order orbital contribution comes from mixing with a state $\Delta_\mathrm{o}$ away, far above $k_\mathrm{B}T$, so it does not change with temperature, and Curie's law holds with a constant $\mu_\mathrm{eff}$. (b) $3.15 = 2.828(1 - 4\lambda/10\,800)$ gives $1 - 4\lambda/10\,800 = 1.1139$, so $\lambda = -0.1139 \times 10\,800/4 = -307\ \mathrm{cm^{-1}}$. With $\mu_\mathrm{eff} = 3.15$ known only to $\pm0.01\ \mu_\mathrm{B}$, $\lambda$ is uncertain by about $\pm 10\ \mathrm{cm^{-1}}$. (c) The effective $\lambda$ is about 3 % below the free-ion value. Covalency usually reduces $\lambda$ by 10–30 %, as it reduces $B$; a value this close to the free-ion one would suggest rather ionic bonding, though the uncertainty here is comparable to the effect.
:::
:::
