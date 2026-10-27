Iodine vapour is violet, a carrot is orange, a highlighter pen glows under an ultraviolet lamp, and a laser pointer throws a red dot across a lecture theatre. Each of these is an electronic transition: a photon of a few electronvolts lifts an electron from one molecular orbital to another, or an excited molecule returns the energy as light. Electronic spectra are far richer than the rotational and vibrational spectra of the previous chapters, because an electronic jump drags the nuclear framework into a new potential energy curve. The band you record is then a fingerprint of *two* potentials at once — where the molecule started and where it was sent — and its shape, its colour and whether it glows afterwards all follow from that. This lesson builds the theory in four steps: the labels and selection rules of electronic states, the Franck–Condon principle that shapes every band, the chromophores and empirical rules that let an organic chemist read a UV–visible spectrum, and the fate of the excited state — fluorescence, phosphorescence, and stimulated emission in lasers. The general machinery of transition moments, populations and line widths comes from [[spectroscopy/spectroscopy-principles]]; the kinetics of excited-state decay is developed in [[kinetics/photochemistry]], and here we concentrate on what the spectrum itself tells you.

## Electronic states of diatomic molecules

An atom's electronic states are labelled by term symbols built from total orbital and spin angular momentum, as in [[quantum-chemistry/many-electron-atoms]]. A diatomic molecule has lost spherical symmetry: only rotation about the internuclear axis leaves it unchanged, so only the *component* of orbital angular momentum along that axis is conserved. This changes the labels but not the logic.

::: definition Term symbols of linear molecules {#def-diatomic-term}
For a linear molecule, let $\Lambda\hbar$ be the magnitude of the total electronic orbital angular momentum along the internuclear axis ($\Lambda = \lvert\sum_i \lambda_i\rvert$, with $\lambda = 0$ for a $\sigma$ orbital and $\lambda = \pm 1$ for a $\pi$ orbital) and $S$ the total spin. The **molecular term symbol** is
$$
{}^{2S+1}\Lambda_{g/u}^{\pm}, \qquad \Lambda = 0, 1, 2, 3 \;\to\; \Sigma, \Pi, \Delta, \Phi ,
$$
where $2S+1$ is the spin multiplicity; the subscript $g$ or $u$ (for homonuclear molecules only) gives the parity of the electronic wavefunction under inversion through the centre; and the superscript $+$ or $-$ (for $\Sigma$ states only) gives its behaviour under reflection in a plane containing the axis. States with $\Lambda > 0$ are doubly degenerate ($\pm\Lambda$). The ground state is prefixed X, excited states of the same multiplicity A, B, C …, and states of different multiplicity a, b, c ….
:::

Closed shells are always ${}^1\Sigma^+$ (and $g$ if homonuclear), because every filled $\pi$ shell contributes $\lambda = +1$ and $-1$ in equal number and pairs its spins. The labels therefore come from the open shells only, and parity follows the rule $g\times g = u\times u = g$, $g\times u = u$, exactly as for multiplying characters in [[quantum-chemistry/molecular-symmetry]].

::: example The low-lying states of O₂ {#ex-o2-terms}
Dioxygen has the valence configuration $\ldots(1\pi_u)^4(1\pi_g)^2$. Which terms arise from the two electrons in the antibonding $1\pi_g$ pair, and which is the ground state?
::: solution
Each $\pi_g$ electron has $\lambda = \pm 1$. Put the two electrons into the two orbitals $\pi_{+1}$, $\pi_{-1}$ in every way the Pauli principle allows (six microstates). If both electrons have the same $\lambda$, they must have opposite spins: $\Lambda = 2$, $S = 0$, giving ${}^1\Delta_g$ (two microstates, $\Lambda = \pm 2$). If they have opposite $\lambda$, $\Lambda = 0$, and the remaining four microstates split into a spin triplet and a singlet: the spatially antisymmetric combination goes with the symmetric triplet spin function and turns out to be odd under reflection, ${}^3\Sigma_g^-$ (three microstates); the spatially symmetric one is ${}^1\Sigma_g^+$ (one). Count: $2 + 3 + 1 = 6$, as required. Parity is $g\times g = g$ throughout. Hund's first rule (maximum multiplicity lowest) picks the triplet: the ground state is $\mathrm{X}\,{}^3\Sigma_g^-$, which is why liquid oxygen is attracted into a magnet. The singlets lie above it at $T_\mathrm{e} = 7918\ \mathrm{cm^{-1}}$ ($\mathrm{a}\,{}^1\Delta_g$, $0.98\ \mathrm{eV}$) and $13\,195\ \mathrm{cm^{-1}}$ ($\mathrm{b}\,{}^1\Sigma_g^+$, $1.64\ \mathrm{eV}$) (Huber and Herzberg's tables). "Singlet oxygen", the reactive species in photodynamic therapy and photo-oxidation, is the $\mathrm{a}\,{}^1\Delta_g$ state.
:::
:::

Which of these states can be reached by absorbing light? The transition rate is proportional to $\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$, and the dipole operator has well-defined symmetry: it is odd under inversion, it acts only on spatial coordinates, and its component along the axis is symmetric under reflections containing the axis.

::: proposition Selection rules for electric-dipole electronic transitions {#prop-elec-sel}
For electric-dipole transitions between electronic states of a linear molecule (light atoms, weak spin–orbit coupling):
$$
\Delta\Lambda = 0, \pm 1, \qquad \Delta S = 0, \qquad \Sigma^+ \leftrightarrow \Sigma^+,\ \Sigma^- \leftrightarrow \Sigma^- \ (\text{but not } \Sigma^+ \leftrightarrow \Sigma^-), \qquad g \leftrightarrow u \ (\text{but not } g \leftrightarrow g,\ u \leftrightarrow u).
$$
The last rule, the **Laporte rule**, holds for any molecule with a centre of inversion. Spin and Laporte rules weaken when their assumptions fail: heavy atoms mix spin states through spin–orbit coupling, and vibrations that remove the centre of symmetry lend intensity to $g \leftrightarrow g$ transitions (vibronic coupling).
:::

::: proof Origin of each rule {#proof-elec-sel}
Write $\boldsymbol\mu_\mathrm{fi} = \langle \psi_\mathrm{f} \lvert \hat{\boldsymbol\mu} \rvert \psi_\mathrm{i}\rangle$ with $\hat{\boldsymbol\mu} = -e\sum_i \mathbf r_i + (\text{nuclear terms})$. (i) *Spin.* $\hat{\boldsymbol\mu}$ contains no spin operator, so the integral factorises into a spatial integral times the spin overlap $\langle S_\mathrm{f} M_{S,\mathrm f}\vert S_\mathrm{i} M_{S,\mathrm i}\rangle$, which vanishes unless the spin states are identical: $\Delta S = 0$. (ii) *Parity.* Under inversion $\mathbf r \to -\mathbf r$ the dipole changes sign. If $\psi_\mathrm i$ and $\psi_\mathrm f$ have the same parity, the integrand $\psi_\mathrm f^*\hat{\boldsymbol\mu}\psi_\mathrm i$ is odd and integrates to zero over all space; only $g \leftrightarrow u$ survives. (iii) *$\Lambda$.* The axial component $\mu_z$ commutes with rotation about the axis and so connects states of equal $\Lambda$; the perpendicular components $\mu_x \pm \mathrm i\mu_y$ carry one unit of axial angular momentum ($\propto \mathrm e^{\pm\mathrm i\phi}$) and change $\Lambda$ by $\pm1$; nothing in $\hat{\boldsymbol\mu}$ changes it by two or more. (iv) *Reflection.* $\mu_z$ is unchanged by reflection in a plane containing the axis, so for $\Sigma \leftrightarrow \Sigma$ transitions (which use $\mu_z$, since $\Delta\Lambda = 0$) the two states must have the same reflection symmetry.
:::

The rules explain the two famous oxygen absorptions. The **Schumann–Runge bands** at $175$–$200\ \mathrm{nm}$ are $\mathrm{B}\,{}^3\Sigma_u^- \leftarrow \mathrm{X}\,{}^3\Sigma_g^-$: same spin, $\Delta\Lambda = 0$, $- \leftrightarrow -$, $u \leftrightarrow g$ — fully allowed, intense, and the reason oxygen shields the Earth's surface from vacuum ultraviolet. By contrast the **atmospheric A band** of $\mathrm{b}\,{}^1\Sigma_g^+ \leftarrow \mathrm{X}\,{}^3\Sigma_g^-$ at $762\ \mathrm{nm}$ breaks three rules at once ($\Delta S \ne 0$, $+\leftrightarrow-$, $g\leftrightarrow g$). It is observed only because the path length through the atmosphere is enormous; it is a magnetic-dipole transition about $10^{9}$ times weaker than a typical allowed one, and it gives the solar spectrum a sharp notch in the deep red.

::: quiz Which transition is electric-dipole allowed?
Which of the following transitions of a homonuclear diatomic molecule is fully allowed?
- [ ] ${}^1\Delta_g \leftarrow {}^3\Sigma_g^-$
- [ ] ${}^1\Sigma_g^+ \leftarrow {}^1\Sigma_g^+$
- [x] ${}^1\Pi_u \leftarrow {}^1\Sigma_g^+$
- [ ] ${}^1\Sigma_u^- \leftarrow {}^1\Sigma_g^+$
::: solution
${}^1\Pi_u \leftarrow {}^1\Sigma_g^+$ keeps $S = 0$, changes $\Lambda$ by one and changes parity: allowed (it is the type of the strong $\mathrm{C}\,{}^1\Pi_u \leftarrow \mathrm{X}\,{}^1\Sigma_g^+$ band of $\mathrm{H_2}$). The first changes spin, $\Lambda$ by two and keeps $g$; the second is $g \leftrightarrow g$; the last is $\Sigma^- \leftrightarrow \Sigma^+$.
:::
:::

## The Franck–Condon principle

An electronic transition takes about the time of one optical cycle, of order $10^{-15}\ \mathrm{s}$; a bond vibration takes $10^{-14}$–$10^{-13}\ \mathrm{s}$. During the jump the nuclei therefore have no time to move. On a diagram of potential energy against internuclear distance, the transition is a *vertical* line, and the molecule lands on the upper curve at the bond length it had in the lower one. If the upper state has a longer equilibrium bond — as it usually does, because an electron has moved into a less bonding orbital — the molecule arrives on the inner, repulsive wall of the upper curve, vibrationally excited. The quantum version of this statement fixes the intensity of every vibrational band.

::: proposition The Franck–Condon principle {#prop-franck-condon}
Within the Born–Oppenheimer approximation, and if the electronic transition dipole $\boldsymbol\mu_\mathrm{el}$ depends only weakly on nuclear geometry (the **Condon approximation**), the intensity of the vibronic band $v' \leftarrow v''$ is
$$
I(v' \leftarrow v'') \propto \lvert\boldsymbol\mu_\mathrm{el}\rvert^2 \, q_{v'v''}, \qquad q_{v'v''} = \left\lvert \int \chi_{v'}^*(R)\,\chi_{v''}(R)\,\mathrm dR \right\rvert^2 ,
$$ {#eq-fc}
where $\chi_{v''}$ and $\chi_{v'}$ are vibrational wavefunctions of the lower and upper electronic states. The **Franck–Condon factors** $q_{v'v''}$ satisfy $\sum_{v'} q_{v'v''} = 1$: the electronic transition sets the total intensity of the band system, and the vibrational overlaps only share it out.
:::

::: proof Factorising the transition moment {#proof-fc}
Under Born–Oppenheimer the vibronic states are products $\Psi = \psi_\mathrm{el}(\mathbf r; R)\,\chi_v(R)$. The dipole operator is a sum of electronic and nuclear parts, $\hat{\boldsymbol\mu} = \hat{\boldsymbol\mu}_\mathrm e + \hat{\boldsymbol\mu}_\mathrm N$. The nuclear part does not act on electrons, so its contribution contains $\int\psi_\mathrm{el}'^*\psi_\mathrm{el}''\,\mathrm d\mathbf r = 0$ (different eigenfunctions of the same electronic Hamiltonian are orthogonal at each $R$). What remains is
$$
\boldsymbol\mu_\mathrm{fi} = \int \chi_{v'}^*(R)\left[\int \psi_\mathrm{el}'^*\,\hat{\boldsymbol\mu}_\mathrm e\,\psi_\mathrm{el}''\,\mathrm d\mathbf r\right]\chi_{v''}(R)\,\mathrm dR = \int \chi_{v'}^*\,\boldsymbol\mu_\mathrm{el}(R)\,\chi_{v''}\,\mathrm dR .
$$
If $\boldsymbol\mu_\mathrm{el}(R)$ varies little over the range of $R$ where $\chi_{v''}$ is non-zero, take it outside the integral at its average value: $\boldsymbol\mu_\mathrm{fi} \approx \boldsymbol\mu_\mathrm{el}\int\chi_{v'}^*\chi_{v''}\,\mathrm dR$. Squaring gives equation [[#eq-fc]]. The sum rule follows because the $\chi_{v'}$ (including the continuum above the dissociation limit) form a complete set: $\sum_{v'}\lvert\langle\chi_{v'}\vert\chi_{v''}\rangle\rvert^2 = \langle\chi_{v''}\vert\chi_{v''}\rangle = 1$.
:::

The overlap integral replaces the vertical-line picture by a quantitative one. Where the two potential curves have the same shape and the same equilibrium distance, $\chi_{v'}$ and $\chi_{v''}$ are identical functions, orthogonality gives $q_{v'v''} = \delta_{v'v''}$, and the spectrum is a single strong $0$–$0$ band. The more the upper curve is displaced, the more the $v'' = 0$ Gaussian overlaps with highly excited upper levels, and the band develops a long **progression** whose maximum marks the vertical transition. For two harmonic curves of the same frequency displaced by $\Delta R$ there is a closed form: from $v'' = 0$,
$$
q_{v'0} = \mathrm e^{-S}\,\frac{S^{v'}}{v'!}, \qquad S = \frac{\mu\omega(\Delta R)^2}{2\hbar} ,
$$ {#eq-huang-rhys}
a Poisson distribution in $v'$ with mean $S$, the **Huang–Rhys factor**. A rigid aromatic molecule, whose excitation barely changes the bond lengths, has $S \lesssim 1$ and a spectrum dominated by its $0$–$0$ band; a molecule whose bond lengthens markedly has $S \gg 1$ and a broad, structured hump.

::: widget plot
f: sum(exp(-s)*s^k/fact(k)*exp(-(x-k)^2/(2*w^2)), k, 0, 40)
x: -1, 12
y: 0, 1.05
sliders: s=1:0:6:0.1; w=0.15:0.05:1:0.05
labels: \text{absorption from } v''=0
caption: The vibronic band predicted by equation [[#eq-huang-rhys]] for two displaced harmonic curves: the horizontal axis is the photon energy above the $0$–$0$ band in units of $\hbar\omega$, each band $v' \leftarrow 0$ is drawn as a Gaussian of width `w` (in the same units) and height $q_{v'0}$. With `s` $= 0$ only the $0$–$0$ band appears; as the displacement grows the intensity moves into higher $v'$ and the maximum shifts to $v' \approx S$. Widen `w` (as solvent broadening does) and the progression merges into the smooth, asymmetric band typical of a dye in solution — the vibrational structure is still there, hidden under the envelope.
:::

::: example The colour of iodine vapour {#ex-iodine-vertical}
For $^{127}\mathrm{I_2}$ (constants from Huber and Herzberg): the ground state $\mathrm X\,{}^1\Sigma_g^+$ has $\omega_\mathrm e'' = 214.50\ \mathrm{cm^{-1}}$, $\omega_\mathrm ex_\mathrm e'' = 0.614\ \mathrm{cm^{-1}}$, $R_\mathrm e'' = 2.666\ \mathrm{\AA}$ and $D_0'' = 12\,440\ \mathrm{cm^{-1}}$; the excited state $\mathrm B\,{}^3\Pi_{0u}^+$ has $T_\mathrm e = 15\,769\ \mathrm{cm^{-1}}$, $\omega_\mathrm e' = 125.69\ \mathrm{cm^{-1}}$, $\omega_\mathrm ex_\mathrm e' = 0.764\ \mathrm{cm^{-1}}$ and $R_\mathrm e' = 3.024\ \mathrm{\AA}$, and dissociates to one ground-state atom and one spin–orbit excited atom $\mathrm I({}^2P_{1/2})$, which lies $7603\ \mathrm{cm^{-1}}$ above $\mathrm I({}^2P_{3/2})$. Model the B state by a Morse curve and find the wavelength of the vertical transition from the centre of $v'' = 0$.
::: solution
First locate the dissociation limit of B on the ground-state energy scale. The ground-state well depth is $D_\mathrm e'' = D_0'' + G''(0)$ with $G''(0) = \tfrac12\omega_\mathrm e'' - \tfrac14\omega_\mathrm ex_\mathrm e'' = 107.1\ \mathrm{cm^{-1}}$, so $D_\mathrm e'' = 12\,547\ \mathrm{cm^{-1}}$. The B state's asymptote is $7603\ \mathrm{cm^{-1}}$ higher, at $20\,150\ \mathrm{cm^{-1}}$ above the X minimum, so its well depth is
$$
D_\mathrm e' = 20\,150 - 15\,769 = 4381\ \mathrm{cm^{-1}} .
$$
The Morse range parameter follows from $a = \omega\sqrt{\mu/2D_\mathrm e}$ (with $\mu = 63.45\ \mathrm u$, $\omega = 2\pi c\tilde\omega_\mathrm e$ and $D_\mathrm e$ converted to joules): $a' = 1.842\ \mathrm{\AA^{-1}}$. The vertical line from $R = 2.666\ \mathrm{\AA}$ hits the B curve $0.358\ \mathrm{\AA}$ inside its minimum:
$$
V_\mathrm B(2.666\ \mathrm{\AA}) = T_\mathrm e + D_\mathrm e'\left(1 - \mathrm e^{-a'(R - R_\mathrm e')}\right)^2 = 15\,769 + 4381\left(1 - \mathrm e^{1.842\times0.358}\right)^2 = 19\,590\ \mathrm{cm^{-1}} .
$$
At the centre of the $v'' = 0$ wavefunction the ground-state potential is at its minimum, so the vertical photon has $\tilde\nu \approx 19\,590\ \mathrm{cm^{-1}}$, $\lambda = 10^7/19\,590 = 510\ \mathrm{nm}$. Iodine vapour absorbs green light near $500$–$520\ \mathrm{nm}$ and transmits red and blue: it looks violet. The $0$–$0$ band, by contrast, lies at $T_\mathrm e + G'(0) - G''(0) = 15\,725\ \mathrm{cm^{-1}}$ ($636\ \mathrm{nm}$) and is barely visible, because the $v'' = 0$ Gaussian has almost no overlap with the $v' = 0$ level centred $0.36\ \mathrm{\AA}$ away. Solving $T_\mathrm e + G'(v') = 19\,590\ \mathrm{cm^{-1}}$ shows that the vertical transition reaches $v' \approx 40$. (Strictly, $\mathrm B \leftarrow \mathrm X$ is a triplet–singlet transition; it is strong only because iodine's large spin–orbit coupling mixes the spin states so thoroughly that $S$ is no longer a good quantum number — the heavy-atom relaxation of the spin rule mentioned in [[#prop-elec-sel]].)
:::
:::

::: widget plot
f: 12547*(1-exp(-1.8576*(x-2.666)))^2; 15769+4381*(1-exp(-1.8421*(x-3.024)))^2
x: 2.3, 4.6
y: 0, 24000
vlines: 2.666
hlines: 20150
labels: \mathrm{X}\,{}^1\Sigma_g^+; \mathrm{B}\,{}^3\Pi_{0u}^+
caption: Morse curves for the X and B states of $\mathrm{I_2}$ built from the constants of [[#ex-iodine-vertical]], energy in $\mathrm{cm^{-1}}$ above the X minimum against $R$ in $\mathrm{\AA}$. The vertical line at $R_\mathrm e'' = 2.666\ \mathrm{\AA}$ is the Franck–Condon transition; it meets the B curve on its steep inner wall near $19\,600\ \mathrm{cm^{-1}}$, just below the B dissociation limit (horizontal line, $20\,150\ \mathrm{cm^{-1}}$). Because the wall is steep, the spread of bond lengths in $v'' = 0$ (about $\pm 0.05\ \mathrm{\AA}$) maps onto a spread of about $3000\ \mathrm{cm^{-1}}$ in photon energy: the width of the absorption band is the slope of the upper curve times the width of the ground-state wavefunction (the *reflection principle*). Hover to read energies; photons above $20\,150\ \mathrm{cm^{-1}}$ land in the continuum and dissociate the molecule.
:::

::: warning Vertical is not the same as 0–0 {#warn-vertical}
Three energies are easy to confuse. The **adiabatic** (0–0) transition energy connects the lowest vibrational levels of the two states and is what thermochemistry needs. The **vertical** energy, at the band maximum, is what a quick look at the spectrum gives and what most quantum-chemistry programs compute by default, and it exceeds the 0–0 energy whenever the geometries differ — by almost $4000\ \mathrm{cm^{-1}}$ for $\mathrm{I_2}$. And $T_\mathrm e$ connects the minima of the curves and is never observed directly. Also do not use equation [[#eq-huang-rhys]] for $\mathrm{I_2}$: it assumes equal, harmonic frequencies, while the B state is half as stiff as X and strongly anharmonic; inserting the B-state frequency gives $S \approx 15$, far below the $v' \approx 40$ actually reached.
:::

### Dissociation, predissociation and the Birge–Sponer extrapolation

When the photon energy exceeds the dissociation limit of the upper state, the molecule lands on the unbound part of the curve and flies apart within one vibrational period. The discrete bands then crowd together, converge, and give way to a **continuum**. The convergence limit is a precise thermochemical number: in $\mathrm{I_2}$ it lies at $20\,043\ \mathrm{cm^{-1}}$ above $v'' = 0$, and since the fragments are one ground and one excited atom, $D_0'' = 20\,043 - 7603 = 12\,440\ \mathrm{cm^{-1}} = 1.542\ \mathrm{eV}$, the value used above.

When bands cannot be followed all the way to the limit, the spacings are extrapolated. With term values $G(v) = \omega_\mathrm e(v+\tfrac12) - \omega_\mathrm ex_\mathrm e(v+\tfrac12)^2$ the separations of successive levels,
$$
\Delta G_{v+1/2} = G(v+1) - G(v) = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e(v+1),
$$
fall linearly with $v$. The **Birge–Sponer extrapolation** plots $\Delta G_{v+1/2}$ against $v + 1$, extends the line to zero, and takes the area under it as $D_0$: for a straight line this area is $(\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e)^2/4\omega_\mathrm ex_\mathrm e$. Real plots curve downwards near the limit, because long-range attraction is weaker than the Morse form assumes, so linear extrapolation usually *overestimates* $D_0$ — a point exercise [[#exr-birge]] makes quantitative.

Sometimes a band system becomes diffuse *below* its convergence limit. The upper levels there are crossed by the curve of a repulsive state; through a weak coupling (spin–orbit, or a breakdown of Born–Oppenheimer) the molecule leaks onto the repulsive curve and dissociates before it has rotated even once, and the lifetime broadening $\Delta\tilde\nu \approx 1/(2\pi c\tau)$ of [[spectroscopy/spectroscopy-principles]] blurs the rotational lines. This **predissociation** is seen in the Schumann–Runge bands of $\mathrm O_2$ and in many photochemically active molecules; its onset gives an upper bound to the dissociation energy.

## Chromophores and UV–visible spectra of polyatomic molecules

In a large molecule the term-symbol bookkeeping is replaced by the orbitals involved and by point-group labels. A **chromophore** is the group of atoms whose orbitals are responsible for an absorption band: the $\mathrm{C{=}C}$ of an alkene, the $\mathrm{C{=}O}$ of a ketone, the conjugated chain of a polyene, the d shell of a transition-metal ion. In solution the rotational and usually the vibrational structure is washed out, and a band is described by its wavelength of maximum absorption $\lambda_\mathrm{max}$, its molar absorption coefficient $\varepsilon_\mathrm{max}$, and its width.

| transition | example | $\lambda_\mathrm{max}/\mathrm{nm}$ | $\varepsilon_\mathrm{max}/\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ | why |
|---|---|---|---|---|
| $\pi \to \pi^*$ | ethene (vapour) | $\approx 165$–$171$ | $\approx 1.5\times10^4$ | allowed, large overlap |
| $\pi \to \pi^*$ | buta-1,3-diene | $217$ | $2.1\times10^4$ | allowed; smaller gap by conjugation |
| $\pi \to \pi^*$ | $\beta$-carotene | $\approx 450$ | $\approx 1.4\times10^5$ | 11 conjugated $\mathrm{C{=}C}$ |
| $\pi \to \pi^*$ | benzene | $254$ | $\approx 200$ | symmetry-forbidden, vibronically allowed |
| $n \to \pi^*$ | propanone (acetone) | $\approx 280$ | $\approx 15$ | orbitals nearly orthogonal |
| ligand-to-metal charge transfer | $\mathrm{MnO_4^-}$ | $\approx 525$ | $\approx 2\times10^3$ | allowed, large dipole change |
| d–d | $[\mathrm{Ti(H_2O)_6}]^{3+}$ | $\approx 500$ | $\approx 5$ | Laporte-forbidden ($g \leftrightarrow g$) |

(Approximate literature values in hexane, water or the gas phase, collected from Pavia et al. and Pretsch et al.; the exact numbers depend on the solvent.) The table spans more than four orders of magnitude in $\varepsilon$, and the ordering is entirely explained by selection rules and orbital overlap. The $\pi \to \pi^*$ transitions of alkenes and polyenes are fully allowed: both orbitals lie on the same atoms and their product has a large dipole. The $n \to \pi^*$ band of a carbonyl group is weak because the oxygen lone pair lies in the molecular plane while the $\pi^*$ orbital is perpendicular to it: the transition density is small, and in a $C_{2v}$ ketone the transition is formally forbidden. The d–d bands of octahedral complexes are $g \leftrightarrow g$ and borrow intensity from vibrations only — the reason most aqueous transition-metal salts are pale, while permanganate, whose band is an allowed charge transfer from oxygen to manganese, is intensely purple. Tetrahedral complexes have no centre of symmetry and their d–d bands are ten to a hundred times stronger, which is why $[\mathrm{CoCl_4}]^{2-}$ is a vivid blue where $[\mathrm{Co(H_2O)_6}]^{2+}$ is pale pink; the full theory belongs to [[coordination-chemistry/spectra-of-complexes]].

Two words describe how substituents and solvents move bands: a shift to longer wavelength is a **bathochromic** (red) shift, a shift to shorter wavelength a **hypsochromic** (blue) shift; an increase in intensity is **hyperchromic**. Extending conjugation gives a bathochromic shift, as the Hückel and particle-in-a-box models of [[quantum-chemistry/huckel-theory]] and [[quantum-chemistry/model-systems]] predict: the HOMO–LUMO gap of a polyene shrinks as the chain lengthens. Polar, hydrogen-bonding solvents blue-shift $n \to \pi^*$ bands, because they stabilise the lone pair of the ground state more than the excited state; the same solvents usually red-shift $\pi \to \pi^*$ bands slightly.

### Measuring the strength of a band: oscillator strength

$\varepsilon_\mathrm{max}$ depends on the width of the band; the property of the molecule is the *area* under it. The dimensionless **oscillator strength** compares that area with the absorption of a classical electron bound by a spring.

::: definition Oscillator strength {#def-oscillator-strength}
The **oscillator strength** of an absorption band is
$$
f = \frac{4\varepsilon_0 m_\mathrm e c^2 \ln 10}{N_\mathrm A e^2}\int\varepsilon(\tilde\nu)\,\mathrm d\tilde\nu = 4.319\times10^{-9}\ \mathrm{dm^{-3}\,mol\,cm^{2}} \int\varepsilon(\tilde\nu)\,\mathrm d\tilde\nu ,
$$ {#eq-osc}
with $\varepsilon$ in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ and $\tilde\nu$ in $\mathrm{cm^{-1}}$ (the prefactor is computed from CODATA 2018 constants; in a medium of refractive index $n$ a local-field correction is sometimes included). It is related to the transition dipole moment by $f = \dfrac{2 m_\mathrm e\omega}{3\hbar e^2}\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$. Fully allowed transitions have $f \sim 0.1$–$1$; $f = 1$ corresponds to one classical oscillating electron. For a Gaussian band, $\int\varepsilon\,\mathrm d\tilde\nu = 1.0645\,\varepsilon_\mathrm{max}\,\Delta\tilde\nu_{1/2}$, where $\Delta\tilde\nu_{1/2}$ is the full width at half maximum.
:::

As a check of the second form, the hydrogen Lyman-$\alpha$ line $2p \leftarrow 1s$ has $\sum_m\lvert\langle 2p\,m\vert\mathbf r\vert 1s\rangle\rvert^2 = 3\times(0.7449\,a_0)^2$, which gives $f = 0.416$, the accepted value.

::: example Oscillator strengths of a π→π* and an n→π* band {#ex-osc}
Estimate $f$ for (a) the $217\ \mathrm{nm}$ band of buta-1,3-diene, $\varepsilon_\mathrm{max} = 2.1\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$, and (b) the $n \to \pi^*$ band of propanone, $\varepsilon_\mathrm{max} = 15\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$, assuming both are Gaussian with a full width at half maximum of $5000\ \mathrm{cm^{-1}}$.
::: solution
(a) The integrated absorption is $1.0645 \times 2.1\times10^4 \times 5000 = 1.12\times10^8\ \mathrm{dm^3\,mol^{-1}\,cm^{-2}}$, so
$$
f = 4.319\times10^{-9} \times 1.12\times10^8 = 0.48 .
$$
(b) The same width with $\varepsilon_\mathrm{max} = 15$ gives $\int\varepsilon\,\mathrm d\tilde\nu = 7.98\times10^4$, and $f = 3.4\times10^{-4}$. The diene band carries about half the strength of a classical electron — a fully allowed transition — while the carbonyl band is more than a thousand times weaker, as expected for two nearly orthogonal orbitals. Both answers carry the uncertainty of the assumed width (two significant figures at most); in practice one integrates the measured band numerically.
:::
:::

### Woodward–Fieser rules

Before NMR, the position of the $\pi \to \pi^*$ band was one of the best structural tools for conjugated dienes and enones, and it is still a quick consistency check. R. B. Woodward found in 1941–42, and L. F. and M. Fieser later extended, that $\lambda_\mathrm{max}$ in ethanol can be predicted by adding increments to a base value. The rules are **empirical**: they summarise data for steroids and terpenes and are reliable to about $\pm5\ \mathrm{nm}$ for unstrained, planar systems.

::: algorithm Woodward–Fieser estimate of λmax {#alg-woodward}
1. Identify the conjugated chromophore and choose the **base value**. Dienes: heteroannular (the two double bonds in different rings) or acyclic $214\ \mathrm{nm}$; homoannular (both in one ring) $253\ \mathrm{nm}$. $\alpha,\beta$-unsaturated ketones: acyclic or six-membered ring $215\ \mathrm{nm}$, five-membered ring $202\ \mathrm{nm}$; aldehydes $210\ \mathrm{nm}$.
2. Add **increments**: each additional conjugated $\mathrm{C{=}C}$ $+30$; each alkyl substituent or ring residue on the chromophore $+5$ for dienes, and for enones $+10$ ($\alpha$), $+12$ ($\beta$), $+18$ ($\gamma$ and beyond); each **exocyclic** double bond (a $\mathrm{C{=}C}$ of the chromophore with one carbon in a ring and the bond outside that ring) $+5$; a homoannular diene component in an enone $+39$; polar groups as tabulated (for dienes $-\mathrm{OR}$ $+6$, $-\mathrm{Cl}$ or $-\mathrm{Br}$ $+5$, $-\mathrm{NR_2}$ $+60$).
3. For enones measured in another solvent, correct from ethanol (hexane $+11$, water $-8\ \mathrm{nm}$, as tabulated).
4. Compare with the measured $\lambda_\mathrm{max}$; disagreement by more than about $10\ \mathrm{nm}$ suggests a different chromophore, strain or twisting out of conjugation.

(Increments as tabulated in Pavia et al., *Introduction to Spectroscopy*; other tables differ by a few nm in the base values, e.g. some use $217\ \mathrm{nm}$ for acyclic dienes.)
:::

::: example Two steroid chromophores {#ex-woodward}
Predict $\lambda_\mathrm{max}$ for (a) cholesta-3,5-diene, a heteroannular diene in rings A and B, and (b) cholest-4-en-3-one, a six-membered-ring enone with the $\mathrm{C4{=}C5}$ double bond at the A/B ring fusion.
::: solution
(a) Base value (heteroannular) $214\ \mathrm{nm}$. Ring residues attached to the four diene carbons C3, C4, C5, C6: C2 on C3, C10 on C5, C7 on C6 — three, $+15$. The $\mathrm{C3{=}C4}$ bond lies in ring A, and C5 (one end of the other bond, $\mathrm{C5{=}C6}$) is also in ring A, so $\mathrm{C5{=}C6}$ is exocyclic to ring A: $+5$. Total $214 + 15 + 5 = 234\ \mathrm{nm}$; observed $235\ \mathrm{nm}$.

(b) Base value (six-membered ring enone) $215\ \mathrm{nm}$. The $\alpha$ carbon C4 carries only hydrogen: $+0$. The $\beta$ carbon C5 carries two ring residues (C6 and C10): $2 \times 12 = +24$. The $\mathrm{C4{=}C5}$ bond is exocyclic to ring B (C5 is in ring B, C4 is not): $+5$. Total $215 + 24 + 5 = 244\ \mathrm{nm}$; observed $241\ \mathrm{nm}$. Both predictions fall within the $\pm5\ \mathrm{nm}$ the rules promise — and an isomer with the double bond at $\mathrm{C5{=}C6}$, no longer conjugated with the carbonyl, would show only a weak $n \to \pi^*$ band near $290\ \mathrm{nm}$, which is how such isomers were once told apart.
:::
:::

## What happens after absorption: fluorescence and phosphorescence

An excited molecule in solution loses its excess vibrational energy to the solvent within picoseconds, then decays electronically by one of several routes. The **Jablonski diagram** organises them by spin multiplicity — the singlets $\mathrm S_0, \mathrm S_1, \mathrm S_2$ and the triplets $\mathrm T_1, \mathrm T_2$ — and its kinetics, with the rate constants $k_\mathrm f$, $k_\mathrm{IC}$, $k_\mathrm{ISC}$ and the Stern–Volmer treatment of quenching, is worked out in [[kinetics/photochemistry]]. Here we need only the spectroscopic consequences.

- **Fluorescence** is spin-allowed emission $\mathrm S_1 \to \mathrm S_0$, with lifetimes of about $1$–$100\ \mathrm{ns}$.
- **Internal conversion** (IC) is radiationless $\mathrm S_n \to \mathrm S_{n-1}$ transfer, fast between upper states ($\sim10^{-12}\ \mathrm s$), slower across the large $\mathrm S_1$–$\mathrm S_0$ gap.
- **Intersystem crossing** (ISC) is radiationless $\mathrm S_1 \to \mathrm T_1$ transfer; it is spin-forbidden and needs spin–orbit coupling, which grows steeply with nuclear charge (the **heavy-atom effect**), and by **El-Sayed's rule** it is fastest between states of different orbital type, such as ${}^1(n,\pi^*) \to {}^3(\pi,\pi^*)$ in aromatic ketones.
- **Phosphorescence** is spin-forbidden emission $\mathrm T_1 \to \mathrm S_0$, with lifetimes from microseconds to seconds; in fluid solution it is usually quenched by dissolved oxygen, which is why it is typically observed in rigid glasses at $77\ \mathrm K$ or in solids.

Because IC and vibrational relaxation outrun emission, light is almost always emitted from the lowest excited state of each multiplicity: this is **Kasha's rule**, and it makes the fluorescence spectrum independent of the excitation wavelength (the azulene $\mathrm S_2$ emission is the textbook exception). Fluorescence therefore starts from $v' = 0$ of $\mathrm S_1$ and ends on the vibrational levels of $\mathrm S_0$, whereas absorption starts from $v'' = 0$ of $\mathrm S_0$ and ends on the levels of $\mathrm S_1$. Two consequences follow at once.

::: proposition Stokes shift and the mirror-image rule {#prop-mirror}
If the $\mathrm S_0$ and $\mathrm S_1$ potentials have similar shapes and the Condon approximation holds, (i) absorption and fluorescence share the $0$–$0$ band, absorption lies on its high-energy side and fluorescence on its low-energy side, and the band maxima are separated by the **Stokes shift** $\Delta\tilde\nu = \tilde\nu_\mathrm{abs,max} - \tilde\nu_\mathrm{fl,max} > 0$; (ii) the fluorescence spectrum, plotted against wavenumber, is approximately the mirror image of the $\mathrm S_1 \leftarrow \mathrm S_0$ absorption band reflected through the $0$–$0$ energy.
:::

::: proof Why the two bands mirror each other
Absorption from $v'' = 0$ to $v'$ has intensity $\propto q_{v'0}$ and energy $\tilde\nu_{00} + v'\tilde\omega'$; emission from $v' = 0$ to $v''$ has intensity $\propto q_{0v''}$ and energy $\tilde\nu_{00} - v''\tilde\omega''$. For curves of equal shape $\tilde\omega' = \tilde\omega''$ and, for displaced harmonic oscillators, $q_{v0}$ and $q_{0v}$ are the same Poisson number $\mathrm e^{-S}S^v/v!$ of equation [[#eq-huang-rhys]]. The two progressions therefore have identical intensity patterns on either side of $\tilde\nu_{00}$, which is the mirror image. Since any $S > 0$ puts the absorption maximum above $\tilde\nu_{00}$ and the emission maximum below it, the Stokes shift is positive; solvent reorganisation around the excited molecule adds to it. (The detailed intensities also contain factors $\tilde\nu$ and $\tilde\nu^3$ for absorption and emission, which slightly distort the mirror.)
:::

Large departures from mirror symmetry are diagnostic: they mean the excited molecule changes its geometry substantially after excitation (a twist, a proton transfer, an excimer), so that emission comes from a different structure from the one that absorbed.

The integrated absorption band also predicts how fast the molecule fluoresces. Einstein's relation between absorption and spontaneous emission (below) leads to the **Strickler–Berg** formula for the radiative rate constant,
$$
k_\mathrm f = \frac{1}{\tau_0} \approx \frac{8\pi c\,n^2 \tilde\nu_\mathrm{max}^2 \ln 10}{N_\mathrm A}\int\varepsilon\,\mathrm d\tilde\nu = 2.881\times10^{-9}\, n^2\,\tilde\nu_\mathrm{max}^2 \int\varepsilon\,\mathrm d\tilde\nu\ \ \mathrm{s^{-1}} ,
$$ {#eq-strickler}
with $\tilde\nu$ in $\mathrm{cm^{-1}}$, $\varepsilon$ in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ and $n$ the refractive index (a simplified form, valid for strongly allowed bands with a small Stokes shift). A useful rule of thumb follows: $\tau_0 \approx 10^{-4}\,\mathrm s / \varepsilon_\mathrm{max}$. Strong absorbers are fast emitters; the $n \to \pi^*$ states of ketones, with $\varepsilon \approx 15$, would take microseconds to fluoresce, so ISC wins and ketones are triplet sensitisers rather than fluorophores.

::: example A fluorescent dye: brightness, lifetime and Stokes shift {#ex-dye}
A fluorescein-like dye in aqueous base absorbs at $\lambda_\mathrm{max} = 490\ \mathrm{nm}$ with $\varepsilon_\mathrm{max} = 7.69\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ and emits at $514\ \mathrm{nm}$; its fluorescence quantum yield is $\Phi_\mathrm f = 0.93$ and its lifetime $\tau = 4.1\ \mathrm{ns}$. Find (a) the Stokes shift, (b) the radiative rate constant from $\Phi_\mathrm f$ and $\tau$, and (c) the Strickler–Berg estimate, taking a Gaussian band of half-width $2000\ \mathrm{cm^{-1}}$ and $n = 1.333$.
::: solution
(a) In wavenumbers, $\tilde\nu_\mathrm{abs} = 10^7/490 = 20\,408\ \mathrm{cm^{-1}}$ and $\tilde\nu_\mathrm{fl} = 10^7/514 = 19\,455\ \mathrm{cm^{-1}}$, so $\Delta\tilde\nu = 953\ \mathrm{cm^{-1}}$ — a small shift, typical of a rigid dye.

(b) The quantum yield is the fraction of excited molecules that fluoresce, $\Phi_\mathrm f = k_\mathrm f\tau$ (see [[kinetics/photochemistry]]), so $k_\mathrm f = 0.93/4.1\times10^{-9}\ \mathrm s = 2.3\times10^8\ \mathrm{s^{-1}}$ and the natural lifetime is $\tau_0 = 1/k_\mathrm f = 4.4\ \mathrm{ns}$.

(c) $\int\varepsilon\,\mathrm d\tilde\nu = 1.0645 \times 7.69\times10^4 \times 2000 = 1.64\times10^8$, and
$$
k_\mathrm f \approx 2.881\times10^{-9} \times 1.333^2 \times (20\,408)^2 \times 1.64\times10^8 = 3.5\times10^8\ \mathrm{s^{-1}} ,
$$
$\tau_0 \approx 2.9\ \mathrm{ns}$. The estimate agrees with experiment to within a factor of $1.5$, which is as good as the assumed band shape allows; the rule of thumb gives $10^{-4}/7.69\times10^4 = 1.3\ \mathrm{ns}$, the right order of magnitude. Such dyes are bright because almost every absorbed photon is returned within a few nanoseconds, before any slower process can compete.
:::
:::

::: warning Emission wavelength does not equal absorption wavelength {#warn-stokes}
It is tempting to excite a fluorophore at its emission maximum, or to assume a dye emits the colour it looks. Neither is right. A dye's colour in white light is the complement of what it absorbs (fluorescein absorbs blue and looks yellow-orange in concentrated solution); its fluorescence is red-shifted from its absorption by the Stokes shift; and exciting at the emission wavelength excites almost nothing, because by the mirror-image rule absorption there is weak. The same logic explains why fluorimeters use filters or monochromators on both beams and observe emission at $90^\circ$ — scattered excitation light would otherwise swamp the signal.
:::

## Stimulated emission and lasers

Absorption has a partner process: a photon of the right energy can *stimulate* an excited molecule to emit an identical photon, in the same direction, with the same phase and polarisation. Einstein showed in 1917 that both stimulated and spontaneous emission must exist for matter to come to thermal equilibrium with black-body radiation.

::: proposition Einstein coefficients {#prop-einstein}
For two levels with populations $N_1, N_2$ and degeneracies $g_1, g_2$ in radiation of spectral energy density $\rho(\nu)$, the rates of absorption, stimulated emission and spontaneous emission per unit volume are $B_{12}\rho N_1$, $B_{21}\rho N_2$ and $A_{21}N_2$, and
$$
g_1 B_{12} = g_2 B_{21}, \qquad \frac{A_{21}}{B_{21}} = \frac{8\pi h\nu^3}{c^3} .
$$ {#eq-einstein}
In thermal radiation at temperature $T$ the ratio of stimulated to spontaneous emission is $B_{21}\rho/A_{21} = 1/(\mathrm e^{h\nu/k_\mathrm BT} - 1)$.
:::

::: proof Detailed balance with Planck's law {#proof-einstein}
At equilibrium the upward and downward rates are equal: $B_{12}\rho N_1 = (A_{21} + B_{21}\rho)N_2$, so $\rho = A_{21}/(B_{12}N_1/N_2 - B_{21})$. The populations follow Boltzmann, $N_2/N_1 = (g_2/g_1)\mathrm e^{-h\nu/k_\mathrm BT}$, which gives
$$
\rho(\nu) = \frac{A_{21}/B_{21}}{(g_1B_{12}/g_2B_{21})\,\mathrm e^{h\nu/k_\mathrm BT} - 1} .
$$
This must equal Planck's $\rho(\nu) = (8\pi h\nu^3/c^3)/(\mathrm e^{h\nu/k_\mathrm BT} - 1)$ at every temperature. Agreement as $T \to \infty$ requires $g_1B_{12} = g_2B_{21}$, and then agreement at all $T$ requires $A_{21}/B_{21} = 8\pi h\nu^3/c^3$. Dividing $B_{21}\rho$ by $A_{21}$ with Planck's $\rho$ gives the last result. Since $B$ is proportional to $\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$, so is $A$ — which is why a strong absorber is a fast emitter, the content of equation [[#eq-strickler]].
:::

::: widget plot
f: -log10(exp(14388/(10^x*t))-1)
x: -0.7, 4
y: -60, 5
sliders: t=300:200:6000:100
hlines: 0
labels: \log_{10}(\text{stimulated}/\text{spontaneous})
caption: The ratio of stimulated to spontaneous emission, $1/(\mathrm e^{h\nu/k_\mathrm BT} - 1)$, in thermal radiation, on a logarithmic scale against $\log_{10}(\lambda/\mathrm{\mu m})$; the temperature `t` (in $\mathrm K$) is on the slider, and $hc/k_\mathrm B = 14\,388\ \mathrm{\mu m\,K}$. At $300\ \mathrm K$ the ratio is about $10^{-33}$ for red light ($\log_{10}\lambda = -0.2$) but above $100$ for centimetre microwaves ($\log_{10}\lambda = 4$): spontaneous emission dominates in the optical region and stimulated emission in the microwave region. That is why the first device of this kind, the ammonia maser, worked at microwave frequencies, and why an optical laser needs a population far from thermal equilibrium.
:::

Stimulated emission amplifies a beam only if it beats absorption, $B_{21}\rho N_2 > B_{12}\rho N_1$, that is
$$
\frac{N_2}{g_2} > \frac{N_1}{g_1} \qquad (\text{population inversion}).
$$
In thermal equilibrium this never happens at a positive temperature. A **laser** (light amplification by stimulated emission of radiation) creates inversion by pumping energy in through other levels, places the gain medium between mirrors so that photons pass through it many times, and lets a small fraction of the light out through a partially transmitting mirror. Lasing starts at the **threshold**, where the gain per round trip equals the losses.

::: proposition Inversion requires more than two levels {#prop-inversion}
(i) Optical pumping of a two-level system cannot produce a steady-state inversion: however intense the pump, $N_2/g_2 \le N_1/g_1$. (ii) In a **three-level** laser, where the lower laser level is the ground state, inversion requires more than half of the active centres (for $g_1 = g_2$) to be in the upper laser level. (iii) In a **four-level** laser, where the lower laser level lies $\Delta E \gg k_\mathrm BT$ above the ground state and empties quickly, it is thermally almost empty and any population in the upper level gives inversion.
:::

::: proof Steady-state populations
(i) With pump density $\rho$ on the $1 \leftrightarrow 2$ transition, $\mathrm dN_2/\mathrm dt = B_{12}\rho N_1 - (B_{21}\rho + A_{21})N_2 = 0$. Using $g_1B_{12} = g_2B_{21}$, $N_2/g_2 = (N_1/g_1)\,B_{21}\rho/(B_{21}\rho + A_{21}) < N_1/g_1$; the populations per state approach equality as $\rho \to \infty$ — the transition is *saturated*, not inverted. (ii) In a three-level scheme the pump lifts centres from level 1 to level 3, which decays rapidly to level 2; laser action is $2 \to 1$. Inversion needs $N_2 > N_1$ with $N_1 + N_2 \approx N$, i.e. $N_2 > N/2$: more than half the centres must be pumped before any gain appears. (iii) If the lower laser level 1′ lies $\Delta E$ above the ground state, its thermal population is a fraction $\mathrm e^{-\Delta E/k_\mathrm BT}$ (times degeneracy factors) of the total, and a fast decay $1' \to 0$ keeps it near that value under operation. Inversion then needs only $N_2/g_2 > N_{1'}/g_{1'}$, a tiny population.
:::

The first laser, Theodore Maiman's ruby laser of 1960, is a three-level system: $\mathrm{Cr^{3+}}$ ions in $\mathrm{Al_2O_3}$ are pumped by a flash lamp into broad absorption bands, relax to the ${}^2E$ level, and lase at $694.3\ \mathrm{nm}$ back to the ${}^4A_2$ ground state — which is why ruby lasers run in intense pulses. The **Nd:YAG** laser ($\mathrm{Nd^{3+}}$ in yttrium aluminium garnet) is the standard four-level system, lasing at $1064\ \mathrm{nm}$ from ${}^4F_{3/2}$ to ${}^4I_{11/2}$. The **helium–neon** laser is a gas-discharge laser: electrons excite helium atoms to metastable levels that transfer their energy by collision to nearly coincident neon levels, and the familiar red line at $632.8\ \mathrm{nm}$ is a neon transition to a lower level that empties quickly. Dye lasers use the broad $\mathrm S_1 \to \mathrm S_0$ fluorescence of organic dyes — a four-level scheme built from the vibrational levels of the Franck–Condon envelope — and are tunable across their emission band.

::: example Why Nd:YAG is a four-level laser {#ex-ndyag}
In Nd:YAG the upper laser level lies at $11\,507\ \mathrm{cm^{-1}}$ and the terminal level of the $1064\ \mathrm{nm}$ line at $2110\ \mathrm{cm^{-1}}$ above the ground level (Koechner, *Solid-State Laser Engineering*). Check the laser wavelength, find the photon energy, and estimate the fractional thermal population of the terminal level at $300\ \mathrm K$ (ignore degeneracies).
::: solution
The transition wavenumber is $11\,507 - 2110 = 9397\ \mathrm{cm^{-1}}$, so $\lambda = 10^7/9397 = 1064.2\ \mathrm{nm}$ and $E = hc/\lambda = 1.165\ \mathrm{eV}$. With $hc/k_\mathrm B = 1.4388\ \mathrm{cm\,K}$, the Boltzmann factor of the terminal level is
$$
\exp\!\left(-\frac{2110 \times 1.4388}{300}\right) = \mathrm e^{-10.1} = 4.0\times10^{-5} .
$$
Only about four in $10^5$ ions sit in the lower laser level at room temperature, and it drains to the ground manifold in nanoseconds, so a small upper-level population already gives inversion. Compare ruby, where half the $\mathrm{Cr^{3+}}$ ions must be pumped first: this is why Nd:YAG lasers can run continuously from diode pumps while ruby needs an intense flash.
:::
:::

**Laser safety.** A laser beam is dangerous chiefly to the eye: the lens focuses a collimated beam to a spot on the retina, raising its irradiance by roughly $10^{5}$. Lasers are classified under the international standard IEC 60825-1. Class 1 lasers are safe in normal use; Class 2 are visible lasers up to $1\ \mathrm{mW}$ (continuous), where the blink reflex normally protects the eye; Class 3R extends to $5\ \mathrm{mW}$ in the visible and should not be viewed directly; Class 3B (up to $0.5\ \mathrm W$) is hazardous on direct or mirror-like reflected viewing; and Class 4 (above $0.5\ \mathrm W$) is hazardous even from diffuse reflections, and is a fire and skin hazard. Near-infrared lasers such as Nd:YAG at $1064\ \mathrm{nm}$ are especially treacherous: the beam is invisible, there is no blink reflex, yet the eye still focuses it onto the retina. Laboratory lasers of Class 3B and 4 are used only in controlled areas, with interlocks, enclosed beam paths at a fixed height (never at eye level), removal of watches and reflective jewellery, and goggles of the correct optical density *for that wavelength*; work with them requires training, supervision and a risk assessment.

## Where this leads

The ideas of this lesson run through the rest of chemistry. The selection rules and Franck–Condon factors reappear in the photoelectron and ligand-field spectra of [[coordination-chemistry/spectra-of-complexes]], where the d–d and charge-transfer bands of the table above are assigned with the Tanabe–Sugano diagrams. The excited states whose spectroscopy we have described here are the reactants of [[kinetics/photochemistry]], which treats quantum yields, Stern–Volmer quenching and photochemical rate laws. The magnetic sublevels of triplet states and radicals are probed directly by [[spectroscopy/epr]], and the vibrational structure of electronic bands connects to the normal modes of [[spectroscopy/vibrational-spectroscopy]]. Quantitative absorbance measurement — the Beer–Lambert law, calibration and the instruments — is the subject of [[analytical-chemistry/molecular-spectrometry]]. And when the Woodward–Fieser rules fail, the modern route is a calculation of vertical excitation energies by time-dependent density functional theory in [[computational-chemistry]].

::: history
James Franck argued in 1925 that an electronic transition leaves the nuclei in place, and Edward Condon gave the quantum-mechanical overlap form in 1926 and 1928. Einstein's coefficients for absorption and emission appeared in 1917. George Gabriel Stokes described the shift of fluorescence to longer wavelength in his 1852 paper on quinine solutions, and Aleksander Jabłoński drew his diagram of singlet and metastable states in 1933; Michael Kasha stated his rule in 1950. Robert Burns Woodward published his rules for dienes and enones in 1941–42 in the *Journal of the American Chemical Society*, before his synthetic work made him famous. Charles Townes and colleagues operated the ammonia maser in 1954, Arthur Schawlow and Townes proposed the optical laser in 1958, and Theodore Maiman built the ruby laser in May 1960; the Nobel Prize in Physics for 1964 went to Townes, Nikolay Basov and Aleksandr Prokhorov. Gerhard Herzberg's volumes *Molecular Spectra and Molecular Structure* — the third, on electronic spectra of polyatomic molecules, in 1966 — and the 1979 tables of Huber and Herzberg remain the standard sources of diatomic constants.
:::

::: summary
- Diatomic electronic states are labelled ${}^{2S+1}\Lambda_{g/u}^{\pm}$; closed shells are ${}^1\Sigma^+$, and $\mathrm O_2$'s $(\pi_g)^2$ gives $\mathrm X\,{}^3\Sigma_g^-$, $\mathrm a\,{}^1\Delta_g$ and $\mathrm b\,{}^1\Sigma_g^+$.
- Electric-dipole selection rules: $\Delta S = 0$, $\Delta\Lambda = 0, \pm1$, $\Sigma^\pm \leftrightarrow \Sigma^\pm$, $g \leftrightarrow u$ (Laporte); spin–orbit coupling and vibronic coupling relax them, which is why forbidden bands are weak rather than absent.
- The Franck–Condon principle: transitions are vertical and band intensities are $\lvert\boldsymbol\mu_\mathrm{el}\rvert^2\,\lvert\langle\chi_{v'}\vert\chi_{v''}\rangle\rvert^2$; displaced curves give long progressions peaking at the vertical energy (Poisson in the Huang–Rhys factor $S$ for equal harmonic curves).
- Vertical, 0–0 and $T_\mathrm e$ energies differ; convergence limits and Birge–Sponer extrapolation ($\Delta G_{v+1/2} = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e(v+1)$) give dissociation energies, while predissociation blurs bands below the limit.
- Band strength is the integrated absorption: $f = 4.32\times10^{-9}\int\varepsilon\,\mathrm d\tilde\nu$; $\pi\to\pi^*$ bands have $\varepsilon \sim 10^4$–$10^5$, $n\to\pi^*$ and d–d bands $\sim 10$–$100$; Woodward–Fieser increments predict diene and enone $\lambda_\mathrm{max}$ to about $\pm5\ \mathrm{nm}$.
- After excitation, Kasha's rule sends emission from $\mathrm S_1$ (fluorescence, ns) or $\mathrm T_1$ (phosphorescence, µs–s); fluorescence is Stokes-shifted and roughly the mirror image of absorption, and strong absorbers are fast emitters ($\tau_0 \approx 10^{-4}\,\mathrm s/\varepsilon_\mathrm{max}$).
- Einstein: $A_{21}/B_{21} = 8\pi h\nu^3/c^3$; gain needs population inversion, impossible in two levels, hard in three (ruby) and easy in four (Nd:YAG, He–Ne, dye lasers). Lasers are classified 1–4 for eye safety, and invisible infrared beams need special care.
:::

## Exercises

::: exercise The oxygen A band {level=1 check="762.1"}
The $\mathrm b\,{}^1\Sigma_g^+ (v'=0) \leftarrow \mathrm X\,{}^3\Sigma_g^- (v''=0)$ band of $\mathrm O_2$ lies at $13\,120.9\ \mathrm{cm^{-1}}$. At what wavelength does it absorb, and why is it so weak? (Enter the wavelength in nm.)
::: solution
$\lambda = 10^7/13\,120.9\ \mathrm{nm} = 762.1\ \mathrm{nm}$. The transition breaks three electric-dipole rules: $\Delta S = -1$, $\Sigma^- \to \Sigma^+$ and $g \to g$. It gains a little intensity as a magnetic-dipole transition (spin–orbit coupling mixes the states), and is seen only because sunlight crosses many kilometres of air; even so it carves a deep, sharp notch in the red end of the solar spectrum.
:::
:::

::: exercise A diene by Woodward–Fieser {level=1 check="239"}
Abietic acid contains a heteroannular diene with four alkyl substituents or ring residues on the diene carbons and one exocyclic double bond. Predict its $\lambda_\mathrm{max}$. (Enter it in nm.)
::: solution
Base value (heteroannular) $214\ \mathrm{nm}$; four substituents $4 \times 5 = +20$; one exocyclic double bond $+5$. Total $239\ \mathrm{nm}$, close to the observed value of about $241\ \mathrm{nm}$. A homoannular isomer would start from $253\ \mathrm{nm}$ and absorb near $280\ \mathrm{nm}$ — a difference large enough to distinguish the two diene types at a glance.
:::
:::

::: exercise Stokes shift of quinine {level=1 check="6555"}
Quinine sulfate in dilute sulfuric acid absorbs at $347.5\ \mathrm{nm}$ and fluoresces at $450\ \mathrm{nm}$. Calculate the Stokes shift. (Enter it in $\mathrm{cm^{-1}}$.)
::: solution
$\tilde\nu_\mathrm{abs} = 10^7/347.5 = 28\,777\ \mathrm{cm^{-1}}$, $\tilde\nu_\mathrm{fl} = 10^7/450 = 22\,222\ \mathrm{cm^{-1}}$, so $\Delta\tilde\nu = 6555\ \mathrm{cm^{-1}}$. This is about seven times the shift of the rigid dye in [[#ex-dye]]: the excited state of quinine is strongly solvated and relaxes in geometry before emitting. Always compute Stokes shifts in wavenumbers (energy), not as a difference of wavelengths — $102.5\ \mathrm{nm}$ in the ultraviolet and $102.5\ \mathrm{nm}$ in the red are very different energies.
:::
:::

::: exercise Franck–Condon factors for a small displacement {level=2 check="2"}
For two equal harmonic curves with Huang–Rhys factor $S = 2.4$, find the Franck–Condon factors $q_{v'0}$ for $v' = 0, 1, 2, 3$ and say which band of the progression from $v'' = 0$ is strongest. (Enter the $v'$ of the strongest band.)
::: solution
From equation [[#eq-huang-rhys]], $q_{v'0} = \mathrm e^{-2.4}\,2.4^{v'}/v'!$ with $\mathrm e^{-2.4} = 0.0907$: $q_{00} = 0.091$, $q_{10} = 0.218$, $q_{20} = 0.261$, $q_{30} = 0.209$. The strongest band is $v' = 2$. For a Poisson distribution the most probable value is $\lfloor S\rfloor$ when $S$ is not an integer, so the maximum sits close to the mean; the ratio of successive factors, $q_{v'+1,0}/q_{v'0} = S/(v'+1)$, crosses $1$ between $v' = 1$ and $v' = 2$. You can check with the first figure by setting `s` $= 2.4$.
:::
:::

::: exercise Oscillator strength of a dye band {level=2 check="0.71"}
A dye has a Gaussian absorption band with $\varepsilon_\mathrm{max} = 7.69\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ and a full width at half maximum of $2000\ \mathrm{cm^{-1}}$. Calculate its oscillator strength. (Enter $f$.)
::: solution
$\int\varepsilon\,\mathrm d\tilde\nu = 1.0645 \times 7.69\times10^4 \times 2000 = 1.637\times10^8\ \mathrm{dm^3\,mol^{-1}\,cm^{-2}}$, and $f = 4.319\times10^{-9} \times 1.637\times10^8 = 0.71$. A value near $1$ marks a fully allowed $\pi\to\pi^*$ transition of an extended chromophore: almost the strength of a whole classical electron. Note that a narrower band of the same $\varepsilon_\mathrm{max}$ would have a *smaller* $f$ — compare bands by area, not by height.
:::
:::

::: exercise An enone by Woodward–Fieser {level=2 check="239"}
Predict $\lambda_\mathrm{max}$ in ethanol for 4-methylpent-3-en-2-one (mesityl oxide), $\mathrm{(CH_3)_2C{=}CH{-}CO{-}CH_3}$. Which assignment would you make for a weak band near $310\ \mathrm{nm}$ with $\varepsilon \approx 50$? (Enter the predicted $\lambda_\mathrm{max}$ in nm.)
::: solution
Acyclic enone: base $215\ \mathrm{nm}$. The $\alpha$ carbon carries only H: $+0$. The $\beta$ carbon carries two methyl groups: $2 \times 12 = +24$. No ring, so no exocyclic bonds. Prediction $239\ \mathrm{nm}$; the observed $\pi\to\pi^*$ band lies at about $236\ \mathrm{nm}$ with $\varepsilon \approx 10^4$. The weak long-wavelength band, with $\varepsilon$ two orders of magnitude smaller, is the $n\to\pi^*$ transition of the carbonyl group, red-shifted by conjugation from the $\approx 280\ \mathrm{nm}$ of a saturated ketone. In water it would move to shorter wavelength (hydrogen bonding stabilises the lone pair), the classic test for an $n\to\pi^*$ assignment.
:::
:::

::: exercise A He–Ne laser pointer {level=2 check="3.19e15"}
A helium–neon laser emits $1.00\ \mathrm{mW}$ at $632.8\ \mathrm{nm}$. How many photons per second does it emit, and to which laser class does it belong? (Enter the number of photons per second.)
::: solution
$E = hc/\lambda = 6.626\times10^{-34} \times 2.998\times10^8/632.8\times10^{-9} = 3.139\times10^{-19}\ \mathrm J$ ($1.96\ \mathrm{eV}$). The photon rate is $P/E = 1.00\times10^{-3}/3.139\times10^{-19} = 3.19\times10^{15}\ \mathrm{s^{-1}}$. A visible continuous laser of $1\ \mathrm{mW}$ falls at the upper limit of Class 2: momentary exposure is protected by the blink reflex, but deliberately staring into the beam is not safe. Above $1\ \mathrm{mW}$ (up to $5\ \mathrm{mW}$) it would be Class 3R.
:::
:::

::: exercise Birge–Sponer for the B state of iodine {#exr-birge level=3 check="5045"}
Using $\omega_\mathrm e' = 125.69\ \mathrm{cm^{-1}}$ and $\omega_\mathrm ex_\mathrm e' = 0.764\ \mathrm{cm^{-1}}$ for $\mathrm I_2(\mathrm B)$, derive the Birge–Sponer estimate of $D_0'$ (the dissociation energy measured from $v' = 0$) from the linear $\Delta G_{v+1/2}$ plot, and compare it with the true value obtained from the convergence limit ($20\,043\ \mathrm{cm^{-1}}$ above X, $v'' = 0$) and the $0$–$0$ band ($15\,725\ \mathrm{cm^{-1}}$). (Enter the Birge–Sponer $D_0'$ in $\mathrm{cm^{-1}}$.)
::: hint
$D_0'$ is the sum of all the level spacings above $v' = 0$, i.e. the area of the triangle under the line $\Delta G_{v+1/2} = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e(v+1)$ between $v + 1 = 1$ and the point where it reaches zero.
:::
::: solution
Write $x = v + 1$; then $\Delta G = \omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e\,x$ falls from $\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e = 124.16\ \mathrm{cm^{-1}}$ at $x = 1$ to zero at $x_0 = \omega_\mathrm e/2\omega_\mathrm ex_\mathrm e = 82.26$. The area of the triangle is
$$
D_0' \approx \tfrac12 (x_0 - 1)(\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e) = \frac{(\omega_\mathrm e - 2\omega_\mathrm ex_\mathrm e)^2}{4\omega_\mathrm ex_\mathrm e} = \frac{124.16^2}{3.056} = 5045\ \mathrm{cm^{-1}} .
$$
(Summing the discrete spacings instead of integrating gives $5107\ \mathrm{cm^{-1}}$; the difference is the usual half-step ambiguity.) The true value is $20\,043 - 15\,725 = 4318\ \mathrm{cm^{-1}}$. The linear extrapolation overestimates by about $17\,\%$: the real $\Delta G$ plot for $\mathrm I_2(\mathrm B)$ curves down at high $v$ because the long-range attraction between the separating atoms falls off as a power of $R$, much more gently than the Morse curve's exponential, so the upper levels crowd together faster than the two-constant formula predicts. Birge–Sponer values are therefore upper bounds unless the plot is followed close to the limit.
:::
:::

::: exercise When is stimulated emission as fast as spontaneous emission? {level=3 check="3.28e4"}
At what temperature does thermal (black-body) radiation produce stimulated emission at the $632.8\ \mathrm{nm}$ He–Ne wavelength as fast as spontaneous emission? What does the answer tell you about optical lasers? (Enter the temperature in K.)
::: solution
From [[#prop-einstein]], $B_{21}\rho/A_{21} = 1/(\mathrm e^{h\nu/k_\mathrm BT} - 1) = 1$ when $h\nu/k_\mathrm BT = \ln 2$, i.e.
$$
T = \frac{hc}{\lambda k_\mathrm B\ln 2} = \frac{1.4388\times10^{-2}\ \mathrm{m\,K}}{632.8\times10^{-9}\ \mathrm m \times 0.6931} = 3.28\times10^{4}\ \mathrm K .
$$
Only radiation as hot as the surface of a hot star makes stimulated emission compete in the visible; at $300\ \mathrm K$ the ratio is $\mathrm e^{-75.8} \approx 10^{-33}$. An optical laser therefore cannot rely on thermal radiation or thermal populations: it must build an intense, highly directional field inside a resonator *and* a population inversion, both far from equilibrium. In the microwave region at $300\ \mathrm K$ the ratio exceeds $100$, which is why masers came first.
:::
:::

::: exercise Three-level versus four-level pumping {level=3}
(a) Show that optical pumping of a two-level system can at most equalise the populations per state of the two levels. (b) A three-level laser contains $N$ active ions with $g_1 = g_2$. Derive the minimum fraction that must be pumped into level 2 for gain. (c) A four-level laser has its lower laser level $2110\ \mathrm{cm^{-1}}$ above the ground state. Estimate the population that must be pumped for inversion at $300\ \mathrm K$, as a fraction of $N$, and compare.
::: hint
Use the steady-state rate equation for $N_2$ with $g_1B_{12} = g_2B_{21}$, and for (c) the Boltzmann factor of the lower laser level.
:::
::: solution
(a) In the steady state $B_{12}\rho N_1 = (B_{21}\rho + A_{21})N_2$; with $g_1B_{12} = g_2B_{21}$ this becomes $\dfrac{N_2}{g_2} = \dfrac{N_1}{g_1}\cdot\dfrac{B_{21}\rho}{B_{21}\rho + A_{21}}$. The last factor is less than $1$ for every finite $\rho$ and tends to $1$ only as $\rho \to \infty$: the populations per state approach equality but never invert. The pump stimulates emission as efficiently as it causes absorption.

(b) Pumping goes $1 \to 3$, level 3 decays rapidly to 2, and the laser line is $2 \to 1$; level 3 is practically empty, so $N_1 + N_2 = N$. Gain requires $N_2 > N_1 = N - N_2$, so $N_2 > N/2$: more than $50\,\%$ of all ions must be held in the upper laser level, at the cost of the pump energy needed to put them there.

(c) The lower laser level holds a thermal fraction of about $\mathrm e^{-2110 \times 1.4388/300} = 4.0\times10^{-5}$ of the ions (ignoring degeneracies), and fast decay to the ground state keeps it there. Inversion needs only $N_2 \gtrsim 4\times10^{-5}N$ — about $10^4$ times less than the three-level requirement. In practice the threshold is set by cavity losses, not by inversion, which is why four-level lasers such as Nd:YAG run continuously while ruby, a three-level laser, operates in pulses.
:::
:::
