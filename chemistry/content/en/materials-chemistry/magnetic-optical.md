A fridge magnet, the read head of a hard disk, the capacitor that smooths the supply in a phone, the ultrasound probe in a hospital, the red of a ruby, the white of an LED lamp and the blue of a painting by Vermeer all owe their function to the way electrons in a solid respond to fields or to light. This chapter treats three families of functional materials together because the same ideas run through them: localised moments or dipoles that *interact* with their neighbours and order cooperatively below a critical temperature (ferromagnets, antiferromagnets, ferrimagnets, ferroelectrics), and electronic transitions, between bands or between localised levels, that absorb and emit light (pigments and phosphors).

The magnetism of isolated complexes, with the Curie law and spin-only moments, was the subject of [[coordination-chemistry/magnetism]]. Here we let the moments talk to each other. We derive the Curie–Weiss law from the Weiss molecular field, explain antiferromagnetism through superexchange and ferrimagnetism in spinels with Néel's model, and meet domains, hysteresis and permanent magnets. We then treat ferroelectrics with Landau theory and close with the chemistry of colour and luminescence in solids: band-gap pigments, ligand field and charge-transfer colours, and the lanthanide phosphors of modern lighting.

## Cooperative magnetism

::: definition Magnetic order {#def-magnetic-order}
In a solid with localised moments, an interaction between neighbouring spins can make their orientations correlated. Below a critical temperature the moments order:
- **ferromagnetic** order: all moments parallel, giving a spontaneous magnetisation $M_\mathrm{s}$ below the **Curie temperature** $T_\mathrm{C}$ (Fe, Co, Ni, $\mathrm{CrO_2}$, EuO);
- **antiferromagnetic** order: equal moments on two interpenetrating sublattices pointing in opposite directions, with no net magnetisation, below the **Néel temperature** $T_\mathrm{N}$ (MnO, NiO, $\mathrm{Cr_2O_3}$);
- **ferrimagnetic** order: antiparallel sublattices with *unequal* moments, giving a net spontaneous magnetisation below $T_\mathrm{C}$ (magnetite $\mathrm{Fe_3O_4}$, the ferrites and garnets).

Above the ordering temperature the solid is paramagnetic, with a susceptibility modified by the interactions.
:::

The interaction responsible is not the magnetic dipole–dipole force between moments, which is far too weak, but **exchange**: a consequence of the Pauli principle and electron–electron repulsion, which makes the energy of two neighbouring electrons depend on the relative orientation of their spins. Werner Heisenberg showed in 1928 that it can be written as $-2J\,\mathbf{S}_i\cdot\mathbf{S}_j$, the same form used for dinuclear complexes in [[coordination-chemistry/magnetism]], with $J > 0$ favouring parallel and $J < 0$ antiparallel spins.

::: proposition The Curie–Weiss law from the molecular field {#prop-curie-weiss}
Suppose each moment feels, besides the applied field $H$, an internal **molecular field** $\lambda M$ proportional to the magnetisation, representing the average exchange with its neighbours. If the moments otherwise obey the Curie law $M = C H_\mathrm{eff}/T$, then above the ordering temperature
$$
\chi = \frac{M}{H} = \frac{C}{T - \theta}, \qquad \theta = \lambda C.
$$ {#eq-curie-weiss}
For $\lambda > 0$ (ferromagnetic interaction) $\theta = T_\mathrm{C} > 0$, and $\chi$ diverges at $T_\mathrm{C}$; below it the spontaneous magnetisation of spins $S = \tfrac12$ satisfies $m = \tanh(mT_\mathrm{C}/T)$, with $m = M/M_\mathrm{sat}$. For antiferromagnetic interactions $\theta < 0$ and $\chi$ stays finite. The mean-field approximation ignores short-range correlations, so it overestimates ordering temperatures and gives the wrong critical behaviour near them.
:::

::: proof
With $H_\mathrm{eff} = H + \lambda M$, the Curie law gives $M = (C/T)(H + \lambda M)$. Collecting the terms in $M$: $M(1 - \lambda C/T) = CH/T$, so $M = CH/(T - \lambda C)$ and $\chi = C/(T - \theta)$ with $\theta = \lambda C$. For $T < \theta$ (with $\lambda > 0$) a non-zero $M$ can exist with $H = 0$, sustained by its own molecular field. For spins $S = \tfrac12$ with moment $\mu$, the exact (not linearised) magnetisation in a field $B_\mathrm{eff}$ is $M = M_\mathrm{sat}\tanh(\mu B_\mathrm{eff}/k_\mathrm{B}T)$ (the two-level result from [[coordination-chemistry/magnetism]]). Setting $H = 0$, $B_\mathrm{eff} = \mu_0\lambda M$, and using $C = \mu_0 n\mu^2/k_\mathrm{B}$ for $n$ moments per unit volume with $M_\mathrm{sat} = n\mu$, the argument becomes $\mu_0\lambda n\mu^2 m/k_\mathrm{B}T = \lambda Cm/T = mT_\mathrm{C}/T$, so $m = \tanh(mT_\mathrm{C}/T)$. This has a non-zero solution only for $T < T_\mathrm{C}$, where the slope of $\tanh(mT_\mathrm{C}/T)$ at $m = 0$ exceeds 1.
:::

::: widget parametric
fx: 2*t/log((1 + t)/(1 - t))
fy: t
t: 0.001, 0.999
x: 0, 1.2
y: 0, 1.05
equal: false
caption: Spontaneous magnetisation $m = M/M_\mathrm{sat}$ against reduced temperature $T/T_\mathrm{C}$ in the mean-field model for $S = \tfrac12$, from [[#prop-curie-weiss]]. The curve is drawn parametrically: for each $m$, the temperature that satisfies $m = \tanh(mT_\mathrm{C}/T)$ is $T/T_\mathrm{C} = m/\operatorname{artanh}m = 2m/\ln[(1 + m)/(1 - m)]$. The magnetisation is nearly saturated at low temperature, falls slowly at first and then steeply, and vanishes at $T_\mathrm{C}$ as $(T_\mathrm{C} - T)^{1/2}$. Measured curves for iron and nickel follow this shape well except close to $T_\mathrm{C}$, where they fall more steeply (as $(T_\mathrm{C} - T)^{0.33}$ to $(T_\mathrm{C} - T)^{0.37}$) because fluctuations, ignored by the mean field, matter there.
:::

::: example How strong is the molecular field? {#ex-weiss}
Iron has $T_\mathrm{C} = 1043\ \mathrm{K}$. Estimate the effective field $B_\mathrm{mf}$ that would align a moment of one Bohr magneton against thermal agitation at $T_\mathrm{C}$, from $\mu_\mathrm{B}B_\mathrm{mf} \approx k_\mathrm{B}T_\mathrm{C}$, and compare it with the magnetic dipolar field of a neighbouring moment, about $\mu_0\mu_\mathrm{B}/4\pi r^3$ at $r = 2.5\ \text{Å}$.
::: solution
$B_\mathrm{mf} \approx k_\mathrm{B}T_\mathrm{C}/\mu_\mathrm{B} = 1.381\times10^{-23} \times 1043/9.274\times10^{-24} = 1.55\times10^3\ \mathrm{T}$. The dipolar field is $10^{-7} \times 9.274\times10^{-24}/(2.5\times10^{-10})^3 = 0.059\ \mathrm{T}$, about $3\times10^4$ times smaller. No magnetic interaction between dipoles could order iron at $1043\ \mathrm{K}$; the "field" is a way of describing exchange, an electrostatic effect of electron correlation. This was Weiss's puzzle in 1907, solved only by quantum mechanics two decades later.
:::
:::

### Antiferromagnetism and superexchange

In ionic oxides and halides the magnetic ions are separated by anions, and their spins interact through the anion's orbitals, a mechanism called **superexchange**. Consider two $\mathrm{Ni^{2+}}$ ions linked by an oxide ion in a straight line, as in NiO. Each nickel has one unpaired electron in an $e_g$ orbital pointing at the oxygen, which overlaps with the same oxygen $2p$ orbital. The oxygen $p$ orbital holds two electrons of opposite spin. Partial transfer of the spin-up oxygen electron towards one nickel is allowed only if that nickel's $e_g$ electron is spin-down (Pauli principle), and transfer of the spin-down electron to the other nickel only if *its* electron is spin-up. The covalent mixing that lowers the energy therefore favours antiparallel spins on the two metals. The **Goodenough–Kanamori rules** (1955–59) summarise such arguments: a $180^\circ$ M–O–M bond between half-filled orbitals gives strong antiferromagnetic coupling; a $90^\circ$ bond, in which the metals use orthogonal oxygen orbitals, gives weaker, often ferromagnetic coupling.

The rock salt monoxides of the $3d$ metals are the classic antiferromagnets, ordering in ferromagnetic (111) sheets that alternate in direction: MnO ($T_\mathrm{N} = 118\ \mathrm{K}$), FeO ($198\ \mathrm{K}$), CoO ($291\ \mathrm{K}$) and NiO ($525\ \mathrm{K}$). The magnetic cell is twice the chemical cell along each axis, so neutron diffraction ([[materials-chemistry/diffraction]]) shows extra "magnetic" reflections below $T_\mathrm{N}$: Clifford Shull and J. Samuel Smart's 1949 neutron study of MnO was the first direct observation of antiferromagnetic order. Above $T_\mathrm{N}$ the susceptibility follows [[#eq-curie-weiss]] with negative $\theta$; for an ideal two-sublattice antiferromagnet mean-field theory predicts $\lvert\theta\rvert = T_\mathrm{N}$, but in MnO $\lvert\theta\rvert/T_\mathrm{N}$ is about 5, a sign of **frustration**: on the face-centred cubic lattice not all neighbouring spins can be antiparallel at once.

::: example Curie–Weiss analysis of an antiferromagnet {#ex-mno}
A sample of MnO has molar susceptibility (cgs, corrected for diamagnetism) such that $1/\chi_\mathrm{m} = 208.0\ \mathrm{mol\,cm^{-3}}$ at $300\ \mathrm{K}$ and $276.6\ \mathrm{mol\,cm^{-3}}$ at $600\ \mathrm{K}$ (values generated from the Curie–Weiss law for this example). Find $C$, $\theta$ and $\mu_\mathrm{eff}$, and compare with $T_\mathrm{N} = 118\ \mathrm{K}$.
::: solution
$1/\chi = (T - \theta)/C$ is linear in $T$ with slope $1/C$. Slope $= (276.6 - 208.0)/300 = 0.2287\ \mathrm{mol\,cm^{-3}\,K^{-1}}$, so $C = 4.37\ \mathrm{cm^3\,K\,mol^{-1}}$. The intercept on the temperature axis: $T - \theta = 208.0 \times 4.37 = 909\ \mathrm{K}$ at $T = 300\ \mathrm{K}$, so $\theta = -610\ \mathrm{K}$ (more precisely, $-609$ to $-610$, depending on rounding). Then $\mu_\mathrm{eff} = 2.828\sqrt{C} = 2.828\sqrt{4.37} = 5.91\ \mu_\mathrm{B}$, the spin-only value for five unpaired electrons, as expected for high-spin $\mathrm{Mn^{2+}}$. The ratio $\lvert\theta\rvert/T_\mathrm{N} = 610/118 = 5.2$ signals strong frustration. The Curie constant must be extracted well above $\lvert\theta\rvert$ if possible; here the data are less than $\lvert\theta\rvert$ above zero, so short-range order may already bend the line in real measurements.
:::
:::

### Ferrimagnetism in spinels

Louis Néel explained in 1948 why magnetite and the ferrites are strongly magnetic although their interactions are antiferromagnetic. In a spinel ([[materials-chemistry/crystal-structures]]) the strongest superexchange is between tetrahedral (A) and octahedral (B) sites, through A–O–B angles of about $125^\circ$. It aligns all A moments antiparallel to all B moments. Because there are twice as many B sites as A sites, the two sublattice magnetisations do not cancel.

::: example The saturation moment of magnetite {#ex-magnetite}
(a) Use Néel's model and the inverse spinel distribution $\mathrm{Fe^{3+}[Fe^{2+}Fe^{3+}]O_4}$ to predict the saturation moment per formula unit. (b) Convert this into a saturation magnetisation in $\mathrm{A\,m^{-1}}$ ($a = 8.396\ \text{Å}$, $Z = 8$) and compare with the measured value at low temperature, about $5.0\times10^5\ \mathrm{A\,m^{-1}}$. (c) What would a normal spinel distribution predict?
::: solution
(a) High-spin $\mathrm{Fe^{3+}}$ ($d^5$) carries $5\ \mu_\mathrm{B}$ and $\mathrm{Fe^{2+}}$ ($d^6$) $4\ \mu_\mathrm{B}$ (spin only, $g = 2$, $gS$ per ion). A site: $5$ (one way); B sites: $4 + 5 = 9$ (the other way). Net: $9 - 5 = 4\ \mu_\mathrm{B}$ per formula unit; the $\mathrm{Fe^{3+}}$ moments cancel and only $\mathrm{Fe^{2+}}$ remains. The measured value is $4.1\ \mu_\mathrm{B}$. (b) $M_\mathrm{s} = 8 \times 4 \times 9.274\times10^{-24}\ \mathrm{A\,m^2}/(8.396\times10^{-10}\ \mathrm{m})^3 = 2.968\times10^{-22}/5.919\times10^{-28} = 5.01\times10^5\ \mathrm{A\,m^{-1}}$, in agreement. (c) Normal $\mathrm{Fe^{2+}[Fe^{3+}_2]O_4}$ would give $10 - 4 = 6\ \mu_\mathrm{B}$. The measured moment is thus independent evidence for the inverse structure predicted from ligand field site preferences.
:::
:::

### Domains, hysteresis and permanent magnets

A piece of iron is not normally magnetised, although every region of it is. It divides into **domains**, each magnetised to saturation along an easy axis but in different directions, separated by **domain walls** in which the magnetisation rotates over some tens of nanometres. Domains reduce the energy of the external field that a uniformly magnetised body would produce. An applied field grows favourably oriented domains by moving walls, then rotates the remaining magnetisation into line. On removing the field the walls do not all return, because they are pinned by defects and grain boundaries, so the magnetisation follows a **hysteresis loop**, characterised by the remanence $M_\mathrm{r}$ and the coercive field $H_\mathrm{c}$ needed to bring $M$ back to zero.

**Soft** magnets, with $H_\mathrm{c}$ below about $10^3\ \mathrm{A\,m^{-1}}$, are used in transformer cores and inductors, where the loop must be traversed with little energy loss per cycle: silicon steel, permalloy (Ni–Fe), and ferrites such as $\mathrm{Mn}_{1-x}\mathrm{Zn}_x\mathrm{Fe_2O_4}$, which are insulators and so suffer no eddy-current losses at high frequency. **Hard** (permanent) magnets need large $H_\mathrm{c}$, which comes from a strong **magnetocrystalline anisotropy**, an energy cost for magnetisation away from a crystallographic axis, ultimately due to spin–orbit coupling. The hexagonal ferrite $\mathrm{BaFe_{12}O_{19}}$ is cheap and used in fridge magnets and loudspeakers. $\mathrm{SmCo_5}$ (1960s) and $\mathrm{Nd_2Fe_{14}B}$ (announced in 1984 by Masato Sagawa's group at Sumitomo and John Croat's at General Motors) combine the large moment of iron or cobalt with the anisotropy of the $4f$ ion, and neodymium magnets are now essential for electric-vehicle motors and wind-turbine generators. The figure of merit is the maximum energy product $(BH)_\mathrm{max}$, which exceeds $400\ \mathrm{kJ\,m^{-3}}$ for the best Nd–Fe–B grades.

::: warning Ferrimagnets are not "weak ferromagnets", and $T_\mathrm{C}$ is not a melting point {#warn-ferri}
Two confusions recur. (1) Because ferrimagnets have a net moment and hysteresis, they are often called ferromagnetic in everyday and engineering language. The distinction matters chemically: a ferrite's moment is the *difference* of sublattice moments, so substituting a non-magnetic ion can *increase* it (by removing moment from the minority sublattice), as in zinc-substituted nickel ferrite; nothing like that happens in a true ferromagnet. (2) Heating a magnet above $T_\mathrm{C}$ destroys the long-range order of the spins, but the moments themselves and the crystal structure survive, and the material becomes paramagnetic. On cooling, order returns, but in randomly oriented domains, so a permanent magnet is demagnetised.
:::

## Dielectric and ferroelectric materials

An electric field polarises any insulator by displacing electron clouds relative to nuclei (electronic polarisation), ions relative to one another (ionic polarisation) and, in liquids and some solids, by aligning permanent dipoles. The response is measured by the relative permittivity $\varepsilon_\mathrm{r}$, with $P = \varepsilon_0(\varepsilon_\mathrm{r} - 1)E$. Most oxides have $\varepsilon_\mathrm{r}$ of 5–30. A few have values in the thousands, because one of their ions sits in a very shallow potential and moves easily: these are the **ferroelectrics** and their relatives.

Symmetry decides which properties are possible. Of the 32 crystallographic point groups, 11 are centrosymmetric. Of the 21 non-centrosymmetric classes, 20 are **piezoelectric** (polarised by stress; quartz, ZnO, AlN), and 10 of these are **polar**, with a unique axis along which a spontaneous polarisation can exist; polar crystals are **pyroelectric**, their polarisation changing with temperature. A **ferroelectric** is a polar crystal whose spontaneous polarisation can be reversed by an applied field, giving a hysteresis loop of $P$ against $E$ analogous to that of a ferromagnet.

Barium titanate is the prototype. Its tolerance factor $t = 1.06$ ([[materials-chemistry/crystal-structures#ex-tolerance]]) means that the $\mathrm{Ti^{4+}}$ ion is too small for its octahedron. Above $120\,^\circ\mathrm{C}$ it is cubic, with Ti vibrating about the centre; below, it shifts by about $0.1\ \text{Å}$ towards one oxygen, and the structure becomes tetragonal and polar, with further transitions to orthorhombic and rhombohedral phases on cooling. The second-order Jahn–Teller (pseudo-Jahn–Teller) effect gives the chemical reason: the off-centre shift mixes empty Ti $3d$ orbitals with filled O $2p$ orbitals, strengthening one Ti–O bond more than it weakens the opposite one. This is why ferroelectric perovskites so often contain $d^0$ ions ($\mathrm{Ti^{4+}}$, $\mathrm{Nb^{5+}}$, $\mathrm{Zr^{4+}}$) or ions with stereochemically active lone pairs ($\mathrm{Pb^{2+}}$, $\mathrm{Bi^{3+}}$).

::: proposition Landau theory of a ferroelectric transition {#prop-landau}
Near a continuous (second-order) transition, write the Gibbs energy density as a power series in the polarisation $P$, allowed by symmetry to contain only even powers in zero field:
$$
G(P) = G_0 + \tfrac12a(T - T_0)P^2 + \tfrac14bP^4 - EP, \qquad a, b > 0.
$$ {#eq-landau}
Then (i) for $T < T_0$ and $E = 0$ there is a spontaneous polarisation $P_\mathrm{s} = \pm\sqrt{a(T_0 - T)/b}$; (ii) for $T > T_0$ the dielectric susceptibility follows a Curie–Weiss law, $\chi = \partial P/\partial(\varepsilon_0E) = 1/[\varepsilon_0a(T - T_0)]$. Below $T_0$, $\chi = 1/[2\varepsilon_0a(T_0 - T)]$. The expansion is valid only for small $P$, near $T_0$; first-order transitions such as that of $\mathrm{BaTiO_3}$ need $b < 0$ and a $P^6$ term.
:::

::: proof
Equilibrium requires $\partial G/\partial P = 0$: $a(T - T_0)P + bP^3 = E$. With $E = 0$, either $P = 0$ or $P^2 = a(T_0 - T)/b$, which is real only below $T_0$; there the second derivative at $P = 0$, $a(T - T_0)$, is negative, so $P = 0$ is a maximum and the polar states are the minima. For the susceptibility, differentiate the equilibrium condition with respect to $E$: $[a(T - T_0) + 3bP^2]\,\partial P/\partial E = 1$. Above $T_0$, $P = 0$ in zero field and $\partial P/\partial E = 1/[a(T - T_0)]$, giving the Curie–Weiss form. Below $T_0$, $3bP_\mathrm{s}^2 = 3a(T_0 - T)$, so the bracket is $2a(T_0 - T)$: the susceptibility diverges from both sides, twice as fast below. Dividing by $\varepsilon_0$ converts $\partial P/\partial E$ to the dimensionless $\chi$, and $\varepsilon_\mathrm{r} = 1 + \chi$ peaks at $T_0$.
:::

::: widget plot
f: (t - 1)*x^2/2 + x^4/4
x: -1.8, 1.8
y: -0.6, 1
sliders: t=1.3:0.2:1.6:0.01
labels: G(P) - G_0\ (\text{reduced units})
caption: The Landau free energy [[#eq-landau]] in reduced units ($a = b = 1$, $T_0 = 1$, $E = 0$) against polarisation $x$, for reduced temperature $t = T/T_0$ (slider). For $t > 1$ there is a single minimum at $P = 0$ (paraelectric). As $t$ falls the minimum becomes flatter, so a small field produces a large polarisation: the permittivity peak. Below $t = 1$ the curve develops a double well with minima at $P = \pm\sqrt{1 - t}$, the two polarisation states that a field switches between in a ferroelectric memory.
:::

Ferroelectric and related ceramics are among the most widely manufactured functional materials. $\mathrm{BaTiO_3}$-based multilayer ceramic capacitors, with permittivities of several thousand, are made at a rate of trillions per year. Lead zirconate titanate (PZT), $\mathrm{Pb(Zr,Ti)O_3}$, near its morphotropic phase boundary at about $\mathrm{Zr : Ti} = 52 : 48$, is the dominant piezoelectric for ultrasound transducers, sonar, actuators and inkjet heads; lead-free alternatives based on $\mathrm{(K,Na)NbO_3}$ and $\mathrm{(Bi,Na)TiO_3}$ are being developed because of the toxicity of lead. **Multiferroics** such as $\mathrm{BiFeO_3}$ combine ferroelectric and magnetic order in one phase.

::: quiz
Which of the following can be piezoelectric?
- [x] quartz, $\alpha$-$\mathrm{SiO_2}$ (point group 32)
- [ ] rock salt, NaCl (point group $m\bar3m$)
- [x] wurtzite ZnO (point group $6mm$)
- [x] tetragonal $\mathrm{BaTiO_3}$ (point group $4mm$)
- [ ] cubic $\mathrm{BaTiO_3}$ above $120\,^\circ\mathrm{C}$ (point group $m\bar3m$)
::: solution
Piezoelectricity requires the absence of a centre of symmetry. $m\bar3m$ is centrosymmetric, so NaCl and cubic $\mathrm{BaTiO_3}$ cannot be piezoelectric. Quartz (32) is non-centrosymmetric but not polar: piezoelectric, not pyroelectric. ZnO ($6mm$) and tetragonal $\mathrm{BaTiO_3}$ ($4mm$) are polar, hence piezoelectric and pyroelectric; only $\mathrm{BaTiO_3}$ is ferroelectric, because its polarisation can be switched by a field, whereas reversing the polarisation of ZnO would require breaking bonds.
:::
:::

## Colour and luminescence in solids

A solid is coloured when it absorbs part of the visible spectrum ($1.7$–$3.1\ \mathrm{eV}$, $400$–$730\ \mathrm{nm}$); we see the complementary colour of what is absorbed. Four electronic mechanisms account for nearly all inorganic colours.

1. **Band-gap absorption.** A semiconductor absorbs all photons with $h\nu > E_\mathrm{g}$ ([[materials-chemistry/electronic-structure-solids]]). If $E_\mathrm{g} > 3.1\ \mathrm{eV}$ the solid is white or colourless (ZnO, $\mathrm{TiO_2}$, the most important white pigment); as $E_\mathrm{g}$ falls through the visible, absorption eats into the spectrum from the violet end, giving the sequence yellow ($\mathrm{CdS}$, $2.4\ \mathrm{eV}$), orange (CdS–CdSe solid solutions), red (HgS, vermilion, $2.0\ \mathrm{eV}$), and black ($E_\mathrm{g} < 1.7\ \mathrm{eV}$: Si, GaAs). Band-gap pigments therefore never appear blue or green.
2. **Ligand field (d–d) transitions** of transition-metal ions in a host: $\mathrm{Cr^{3+}}$ in $\mathrm{Al_2O_3}$ (ruby, red) and in beryl (emerald, green), $\mathrm{Co^{2+}}$ in tetrahedral sites of $\mathrm{CoAl_2O_4}$ (cobalt blue), $\mathrm{Cr_2O_3}$ (green). The same ion gives different colours in different hosts because $\Delta_\mathrm{o}$ depends on the metal–oxygen distance and covalency ([[coordination-chemistry/spectra-of-complexes]]).
3. **Charge transfer**: ligand-to-metal (the yellow of chromates), metal-to-metal intervalence (the deep blue of Prussian blue, $\mathrm{Fe^{II}}$–CN–$\mathrm{Fe^{III}}$; sapphire's blue from $\mathrm{Fe^{2+}}$–$\mathrm{Ti^{4+}}$ pairs), and transitions in trapped molecular species such as the $\mathrm{S_3^-}$ radical anion in the sodalite cages of ultramarine, the pigment once ground from lapis lazuli.
4. **Defect centres**: the F centres of [[materials-chemistry/defects]], and the colours of smoky quartz and of irradiated diamonds.

::: example Colours from band gaps {#ex-colour}
Predict the colours of (a) ZnO ($E_\mathrm{g} = 3.37\ \mathrm{eV}$), (b) CdS ($2.42\ \mathrm{eV}$), (c) HgS ($2.0\ \mathrm{eV}$) and (d) GaP ($2.26\ \mathrm{eV}$, indirect).
::: solution
The absorption edge is at $\lambda = 1240/E_\mathrm{g}\ \mathrm{nm}$; everything shorter is absorbed. (a) $368\ \mathrm{nm}$, in the near ultraviolet: no visible light is absorbed, and fine ZnO powder is white (it is a UV-absorbing pigment in sunscreens). (b) $512\ \mathrm{nm}$: violet, blue and some blue-green are absorbed, leaving yellow to orange-yellow (cadmium yellow). (c) $620\ \mathrm{nm}$: everything but red is absorbed: vermilion. (d) $549\ \mathrm{nm}$: orange-yellow, but paler than CdS, because absorption at an indirect gap rises slowly with photon energy ([[materials-chemistry/electronic-structure-solids]]). Real edges are not perfectly sharp, so colours are softened, and particle size and scattering affect the appearance of pigments. Cadmium and mercury pigments are toxic and their use is now restricted.
:::
:::

### Phosphors and luminescence

**Luminescence** is the emission of light from an excited state that is not in thermal equilibrium. A **phosphor** is a solid, usually a wide-gap host doped with an **activator** ion, that absorbs high-energy light (or electrons, or X-rays) and emits at a longer wavelength.

::: definition Quantum yield and Stokes shift {#def-luminescence}
The **quantum yield** $\Phi$ of a luminescent material is the number of photons emitted divided by the number absorbed. The **Stokes shift** is the difference in energy between the absorption (excitation) maximum and the emission maximum, caused by relaxation of the excited state's geometry before emission. Even with $\Phi = 1$, a fraction $1 - \lambda_\mathrm{exc}/\lambda_\mathrm{em}$ of the absorbed energy is lost as heat (the **Stokes loss**), because each emitted photon carries less energy than the absorbed one.
:::

Two kinds of activator dominate. **Trivalent lanthanide ions** ($\mathrm{Eu^{3+}}$, $\mathrm{Tb^{3+}}$) emit through $4f$–$4f$ transitions, which are shielded from the host by the filled $5s$ and $5p$ shells; the emission is in sharp lines at almost host-independent wavelengths ($\mathrm{Eu^{3+}}$ red at about $611\ \mathrm{nm}$, $\mathrm{Tb^{3+}}$ green at $545\ \mathrm{nm}$), slow (milliseconds, because the transitions are Laporte-forbidden) and with tiny Stokes shifts ([[coordination-chemistry/f-block]]). **$4f$–$5d$ emitters** ($\mathrm{Eu^{2+}}$, $\mathrm{Ce^{3+}}$) have allowed transitions to $5d$ orbitals that feel the crystal field strongly, so they give broad bands whose colour can be tuned by the host: $\mathrm{BaMgAl_{10}O_{17}:Eu^{2+}}$ emits blue, and $\mathrm{Y_3Al_5O_{12}:Ce^{3+}}$ (YAG:Ce) absorbs blue and emits a broad yellow band. A blue InGaN LED coated with YAG:Ce, introduced by Nichia in 1996, gives white light and is the basis of most white LED lamps; adding a red nitride phosphor such as $\mathrm{CaAlSiN_3:Eu^{2+}}$ improves the colour rendering. Fluorescent tubes used $\mathrm{Eu^{3+}}$, $\mathrm{Tb^{3+}}$ and $\mathrm{Eu^{2+}}$ phosphors excited by the $254\ \mathrm{nm}$ mercury line; **lasers** such as ruby (1960) and Nd:YAG ($1064\ \mathrm{nm}$) use the same doped-insulator principle with population inversion.

Luminescence is quenched when the excited state can lose its energy without emitting: to lattice vibrations (thermal quenching, worse at high temperature and for small energy gaps between the emitting level and the next level below), or by energy transfer between nearby activator ions until a defect absorbs it (**concentration quenching**), which is why activators are added at levels of only a few per cent.

::: example The energy budget of a white LED {#ex-led}
A white LED uses a blue chip emitting at $460\ \mathrm{nm}$ and YAG:Ce, which converts part of the blue into yellow light centred at $550\ \mathrm{nm}$ with quantum yield $0.95$. (a) What fraction of the energy of each converted photon is lost as heat in the phosphor? (b) Of $100$ blue photons absorbed by the phosphor, how much energy, as a fraction of the absorbed energy, re-emerges as yellow light?
::: solution
(a) Photon energy scales as $1/\lambda$, so a converted photon keeps $460/550 = 0.836$ of its energy: the Stokes loss is $16.4\ \%$. (b) $95$ yellow photons emerge, carrying $0.95 \times 0.836 = 0.795$ of the absorbed energy; about $20\ \%$ becomes heat in the phosphor. This heat raises the phosphor temperature, increasing thermal quenching, which is why high-power LEDs need phosphors with high quenching temperatures and good thermal contact.
:::
:::

## Where this leads

The ferrimagnetic oxides of this chapter reappear as nanoparticles in [[materials-chemistry/nanomaterials]], where size changes their magnetism (superparamagnetism) and their colour (quantum dots, plasmonic gold). Electrode materials in [[materials-chemistry/energy-materials]] are often magnetic and coloured transition-metal oxides whose oxidation state changes on cycling, and the cuprate superconductors are doped antiferromagnets. The electronic structure behind colour is in [[materials-chemistry/electronic-structure-solids]] and [[coordination-chemistry/spectra-of-complexes]]; the physics of magnetic order, including spin waves, is in Physics Atlas ([condensed matter: magnetism and superconductivity](/learn/physics/lesson.php?c=condensed-matter&l=magnetism-superconductivity)).

::: history
Pierre Curie showed in 1895 that ferromagnetism disappears above a critical temperature, and Pierre Weiss proposed the molecular field and magnetic domains in 1907. Werner Heisenberg explained the molecular field as quantum-mechanical exchange in 1928. Louis Néel predicted antiferromagnetism in 1932–36 and explained ferrimagnetism in spinel ferrites in 1948 (Nobel Prize in Physics 1970); Shull and Smart observed antiferromagnetic order in MnO by neutron diffraction in 1949; Philip Anderson formulated superexchange in 1950, and John Goodenough and Junjiro Kanamori gave their rules in 1955–59. Jacques and Pierre Curie discovered piezoelectricity in 1880, Joseph Valasek ferroelectricity in Rochelle salt in 1920–21, and the ferroelectricity of barium titanate was found during the Second World War by groups in the United States, the Soviet Union (Bentsion Vul) and Japan. Lev Landau's theory of phase transitions dates from 1937. Theodore Maiman's ruby laser (1960), the rare-earth phosphors of colour television from the 1960s and the Nd–Fe–B magnet (1984) all came from the chemistry of doped solids.
:::

::: summary
- Exchange, not dipolar interaction, couples neighbouring moments; mean-field theory gives the Curie–Weiss law $\chi = C/(T - \theta)$, with $\theta > 0$ for ferromagnetic and $\theta < 0$ for antiferromagnetic interactions, and $m = \tanh(mT_\mathrm{C}/T)$ below $T_\mathrm{C}$.
- In oxides, superexchange through $180^\circ$ M–O–M links between half-filled orbitals gives antiferromagnetism (MnO, NiO), detected by neutron diffraction; frustration makes $\lvert\theta\rvert \gg T_\mathrm{N}$.
- Ferrimagnets have antiparallel, unequal sublattices; in the inverse spinel $\mathrm{Fe_3O_4}$ the $\mathrm{Fe^{3+}}$ moments cancel, leaving $4\ \mu_\mathrm{B}$ per formula unit.
- Domains, wall pinning and magnetocrystalline anisotropy produce hysteresis: soft magnets for cores, hard magnets ($\mathrm{BaFe_{12}O_{19}}$, $\mathrm{SmCo_5}$, $\mathrm{Nd_2Fe_{14}B}$) for permanent fields.
- Non-centrosymmetric crystals can be piezoelectric, polar ones pyroelectric, and switchable polar ones ferroelectric; Landau theory gives $P_\mathrm{s} \propto (T_0 - T)^{1/2}$ and a Curie–Weiss permittivity; $d^0$ ions and lone pairs favour ferroelectric perovskites.
- Inorganic colour arises from band gaps (white → yellow → red → black as $E_\mathrm{g}$ falls), d–d transitions, charge transfer and defect centres.
- Phosphors are doped hosts: sharp $4f$–$4f$ lines from $\mathrm{Eu^{3+}}$ and $\mathrm{Tb^{3+}}$, broad tunable $4f$–$5d$ bands from $\mathrm{Eu^{2+}}$ and $\mathrm{Ce^{3+}}$; efficiency is limited by the quantum yield, the Stokes loss and quenching.
:::

## Exercises

::: exercise A ferrite moment {level=1 check="2"}
Nickel ferrite, $\mathrm{NiFe_2O_4}$, is an inverse spinel, $\mathrm{Fe^{3+}[Ni^{2+}Fe^{3+}]O_4}$. Predict its saturation moment per formula unit (spin only). (Enter the moment in $\mu_\mathrm{B}$.)
::: solution
A: $\mathrm{Fe^{3+}}$, $5\ \mu_\mathrm{B}$. B: $\mathrm{Ni^{2+}}$ ($d^8$, two unpaired electrons) $2\ \mu_\mathrm{B}$ + $\mathrm{Fe^{3+}}$ $5\ \mu_\mathrm{B}$ $= 7$. Net $7 - 5 = 2\ \mu_\mathrm{B}$ (measured about $2.2$, the excess coming from an orbital contribution on nickel).
:::
:::

::: exercise A white pigment {level=1 check="368"}
Rutile $\mathrm{TiO_2}$ has $E_\mathrm{g} = 3.0\ \mathrm{eV}$ and ZnO $3.37\ \mathrm{eV}$. Calculate the absorption-edge wavelength of ZnO and explain why both are white. (Enter the wavelength for ZnO in nm, to three significant figures.)
::: solution
$\lambda = 1240/3.37 = 368\ \mathrm{nm}$. For rutile, $413\ \mathrm{nm}$, at the extreme violet edge. Neither absorbs significantly in the visible, and their high refractive indices (2.6–2.9 for rutile) scatter light strongly, so fine powders look brilliant white. Rutile's slight violet absorption gives it a faintly warm tone; anatase, with a larger gap, is bluer-white.
:::
:::

::: exercise Ordering temperatures {level=1}
Classify each as ferromagnetic, antiferromagnetic or ferrimagnetic at room temperature, and state what happens on heating above its ordering temperature: (a) NiO ($T_\mathrm{N} = 525\ \mathrm{K}$); (b) $\mathrm{Fe_3O_4}$ ($T_\mathrm{C} = 858\ \mathrm{K}$); (c) gadolinium ($T_\mathrm{C} = 293\ \mathrm{K}$); (d) $\mathrm{CrO_2}$ ($T_\mathrm{C} = 386\ \mathrm{K}$).
::: solution
(a) Antiferromagnetic; paramagnetic above $525\ \mathrm{K}$, with $\chi$ peaking near $T_\mathrm{N}$. (b) Ferrimagnetic; paramagnetic above $858\ \mathrm{K}$. (c) Gadolinium orders just below room temperature, so at $298\ \mathrm{K}$ it is barely paramagnetic; cooled slightly it is ferromagnetic, which makes it useful for magnetic refrigeration near room temperature. (d) Ferromagnetic (a half-metal once used in magnetic recording tape); paramagnetic above $386\ \mathrm{K}$. In every case the moments survive above the ordering temperature; only their long-range alignment is lost.
:::
:::

::: exercise Curie–Weiss from data {level=2 check="-610"}
For a manganese(II) oxide sample, $1/\chi_\mathrm{m}$ (cgs) is $208.0\ \mathrm{mol\,cm^{-3}}$ at $300\ \mathrm{K}$ and $242.3\ \mathrm{mol\,cm^{-3}}$ at $450\ \mathrm{K}$. Find $\theta$. (Enter $\theta$ in K, to three significant figures.)
::: solution
Slope $= (242.3 - 208.0)/150 = 0.2287$, $C = 4.373\ \mathrm{cm^3\,K\,mol^{-1}}$. At $300\ \mathrm{K}$: $T - \theta = 208.0 \times 4.373 = 909.6$, so $\theta = 300 - 909.6 = -610\ \mathrm{K}$. The negative sign shows antiferromagnetic interactions, and $\mu_\mathrm{eff} = 2.828\sqrt{4.373} = 5.91\ \mu_\mathrm{B}$ confirms high-spin $\mathrm{Mn^{2+}}$.
:::
:::

::: exercise The Weiss field in nickel {level=2 check="930"}
Nickel has $T_\mathrm{C} = 627\ \mathrm{K}$. Estimate the molecular field from $\mu_\mathrm{B}B_\mathrm{mf} \approx k_\mathrm{B}T_\mathrm{C}$. (Enter $B_\mathrm{mf}$ in tesla, to two significant figures.)
::: solution
$B_\mathrm{mf} = 1.381\times10^{-23} \times 627/9.274\times10^{-24} = 934\ \mathrm{T} \approx 930\ \mathrm{T}$, roughly twenty times the strongest steady laboratory fields. As for iron, it represents exchange, not a real magnetic field.
:::
:::

::: exercise Stokes loss {level=2 check="0.836"}
A phosphor absorbs at $460\ \mathrm{nm}$ and emits at $550\ \mathrm{nm}$ with unit quantum yield. What fraction of the absorbed energy is emitted as light? A red phosphor absorbing at $460\ \mathrm{nm}$ and emitting at $630\ \mathrm{nm}$? (Enter the fraction for the first phosphor, to three significant figures.)
::: solution
$460/550 = 0.836$; for the red phosphor $460/630 = 0.730$. Red phosphors are intrinsically less efficient in energy terms, and the eye is also less sensitive to deep red, which is why the choice of red phosphor dominates the efficiency–colour-rendering trade-off in LED lighting.
:::
:::

::: exercise Landau exponents {level=3 check="0.5"}
(a) From [[#prop-landau]], show that $P_\mathrm{s}^2$ is linear in $T_0 - T$. (b) Find the ratio $P_\mathrm{s}(T_0 - 50\ \mathrm{K})/P_\mathrm{s}(T_0 - 200\ \mathrm{K})$. (c) Show that the inverse susceptibility has slopes in the ratio $2 : 1$ below and above $T_0$. (Enter the ratio in (b).)
::: solution
(a) $P_\mathrm{s}^2 = a(T_0 - T)/b$. (b) $P_\mathrm{s} \propto (T_0 - T)^{1/2}$, so the ratio is $\sqrt{50/200} = 0.5$. (c) Above $T_0$: $1/\chi = \varepsilon_0a(T - T_0)$, slope $\varepsilon_0a$. Below: $1/\chi = 2\varepsilon_0a(T_0 - T)$, slope of magnitude $2\varepsilon_0a$. Plots of $1/\varepsilon_\mathrm{r}$ against $T$ for a second-order ferroelectric show this V shape with a 2 : 1 slope ratio; a first-order transition such as that of $\mathrm{BaTiO_3}$ shows instead a jump and thermal hysteresis.
:::
:::

::: exercise Zinc makes a ferrite more magnetic {level=3 check="6"}
In $\mathrm{Ni}_{1-x}\mathrm{Zn}_x\mathrm{Fe_2O_4}$, $\mathrm{Zn^{2+}}$ ($d^{10}$, non-magnetic) goes onto tetrahedral sites, displacing $\mathrm{Fe^{3+}}$ to octahedral sites, while nickel remains octahedral. (a) Write the cation distribution and derive the Néel moment per formula unit as a function of $x$. (b) Evaluate it for $x = 0.5$. (c) The measured moment rises at first but then falls, and $\mathrm{ZnFe_2O_4}$ is antiferromagnetic with $T_\mathrm{N} \approx 10\ \mathrm{K}$. Explain. (Enter the moment for $x = 0.5$ in $\mu_\mathrm{B}$.)
::: hint
Count the moments on the A and B sublattices separately: A contains $(1 - x)$ $\mathrm{Fe^{3+}}$; B contains $(1 - x)$ $\mathrm{Ni^{2+}}$ and $(1 + x)$ $\mathrm{Fe^{3+}}$.
:::
::: solution
(a) $\mathrm{Zn}_x\mathrm{Fe}_{1-x}[\mathrm{Ni}_{1-x}\mathrm{Fe}_{1+x}]\mathrm{O_4}$. A: $5(1 - x)$. B: $2(1 - x) + 5(1 + x) = 7 + 3x$. Net: $7 + 3x - 5 + 5x = 2 + 8x$. (b) $x = 0.5$: $6\ \mu_\mathrm{B}$, three times the moment of pure nickel ferrite. (c) As zinc empties the A sublattice of magnetic ions, the A–B coupling that enforces the Néel arrangement weakens, and the weaker B–B antiferromagnetic coupling begins to cant the B moments away from parallel, so the moment falls below $2 + 8x$ beyond about $x = 0.4$–$0.5$. At $x = 1$ there are no A moments at all; the B sublattice orders antiferromagnetically on its own, at very low temperature. The Curie temperature also falls steadily with $x$, which is exploited in Mn–Zn and Ni–Zn ferrites to tune properties.
:::
:::

::: exercise Saturation magnetisation of nickel ferrite {level=2 check="2.6"}
Nickel ferrite has $a = 8.339\ \text{Å}$ and $Z = 8$. Using the moment from the first exercise, calculate its saturation magnetisation at $0\ \mathrm{K}$. (Enter $M_\mathrm{s}$ in units of $10^5\ \mathrm{A\,m^{-1}}$, two significant figures.)
::: solution
$M_\mathrm{s} = 8 \times 2 \times 9.274\times10^{-24}/(8.339\times10^{-10})^3 = 1.484\times10^{-22}/5.799\times10^{-28} = 2.56\times10^5\ \mathrm{A\,m^{-1}}$, which rounds to $2.6\times10^5\ \mathrm{A\,m^{-1}}$, about half that of magnetite, as the ratio of moments (2 : 4) and the similar cell volumes require.
:::
:::
