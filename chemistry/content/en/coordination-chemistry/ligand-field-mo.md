Carbon monoxide is a feeble base. It barely dissolves in acids, has a dipole moment of only $0.11\ \mathrm{D}$, and forms no adduct with $\mathrm{BF_3}$ or a proton under ordinary conditions. Yet it sits at the very top of the spectrochemical series, above cyanide, and it binds to chromium(0), iron(0) and nickel(0) to give stable, volatile, diamagnetic molecules, $\mathrm{[Cr(CO)_6]}$, $\mathrm{[Fe(CO)_5]}$ and $\mathrm{[Ni(CO)_4]}$, in which the metal has no charge at all to attract a ligand. Fluoride, by contrast, is a hard, small, negatively charged ion that ought to be the best of all point charges, and it is a weak-field ligand. The warning at the end of [[coordination-chemistry/crystal-field-theory]] put it plainly: the spectrochemical series is not electrostatic.

The way out is to treat the metal–ligand bond as a bond. **Ligand field theory** is molecular orbital theory applied to complexes: the metal's valence $s$, $p$ and $d$ orbitals combine with ligand orbitals of the same symmetry, and the splitting $\Delta_\mathrm{o}$ appears as the gap between a non-bonding (or π-bonding or π-antibonding) $t_{2g}$ set and an antibonding $e_g$ set. It keeps everything that crystal field theory got right, the $2 + 3$ pattern, the spin-state criterion, the Jahn–Teller effect, because those follow from symmetry, and adds what it got wrong: the role of π donation and π back-donation, the covalency seen in spectra and magnetic resonance, and the **18-electron rule** that governs metal carbonyls and organometallic compounds. This chapter builds the octahedral MO diagram with the tools of [[quantum-chemistry/molecular-symmetry]], adds π bonding, introduces the angular overlap model as a quantitative version, and ends with electron counting.

## Ligand group orbitals for σ bonding

Take an octahedral complex $\mathrm{ML_6}$ and suppose at first that each ligand has a single orbital pointing at the metal: a lone pair, $\sigma$ in symmetry about the M–L axis. Number the ligands 1 ($+x$), 2 ($+y$), 3 ($-x$), 4 ($-y$), 5 ($+z$) and 6 ($-z$), and call their donor orbitals $\sigma_1, \dots, \sigma_6$. The metal valence orbitals are $3d$, $4s$ and $4p$ (for the first series). Instead of letting each metal orbital interact with each ligand orbital separately, we first combine the six ligand orbitals into symmetry-adapted combinations, each of which can interact with at most one kind of metal orbital.

::: definition Ligand group orbitals {#def-lgo}
A **ligand group orbital** (LGO, or symmetry-adapted linear combination, SALC) is a linear combination of ligand orbitals that transforms as one irreducible representation of the point group of the complex. Only metal orbitals and LGOs of the *same* irreducible representation have non-zero overlap; they combine to form bonding and antibonding molecular orbitals, and a metal orbital with no matching LGO is **non-bonding**.
:::

::: proposition The σ LGOs of an octahedron {#prop-sigma-lgo}
In $O_h$ the six ligand σ orbitals span
$$
\Gamma_\sigma = A_{1g} + E_g + T_{1u}.
$$ {#eq-gamma-sigma}
The metal $4s$ orbital is $a_{1g}$, the three $4p$ orbitals are $t_{1u}$, and the $3d$ orbitals divide into $e_g$ ($d_{z^2}$, $d_{x^2-y^2}$) and $t_{2g}$ ($d_{xy}$, $d_{xz}$, $d_{yz}$). Hence $s$, $p$ and the $e_g$ pair form σ bonds, and $t_{2g}$ has no σ partner. The normalised LGOs (neglecting ligand–ligand overlap) are
$$
\begin{aligned}
a_{1g}&: \tfrac{1}{\sqrt6}(\sigma_1 + \sigma_2 + \sigma_3 + \sigma_4 + \sigma_5 + \sigma_6),\\
e_g&: \tfrac{1}{2}(\sigma_1 - \sigma_2 + \sigma_3 - \sigma_4), \quad \tfrac{1}{\sqrt{12}}(2\sigma_5 + 2\sigma_6 - \sigma_1 - \sigma_2 - \sigma_3 - \sigma_4),\\
t_{1u}&: \tfrac{1}{\sqrt2}(\sigma_1 - \sigma_3),\quad \tfrac{1}{\sqrt2}(\sigma_2 - \sigma_4),\quad \tfrac{1}{\sqrt2}(\sigma_5 - \sigma_6).
\end{aligned}
$$
:::

::: proof
The character of the reducible representation $\Gamma_\sigma$ under an operation is the number of ligand σ orbitals left in place (each such orbital contributes $+1$; a moved orbital contributes $0$). Going through the classes of $O_h$: $E$ leaves all 6; $8C_3$ (about body diagonals) moves all, $0$; $6C_2$ (about face diagonals through edge midpoints) moves all, $0$; $6C_4$ (about an axis) leaves the 2 on that axis; $3C_2 = C_4^2$ leaves 2; $i$ moves all, $0$; $6S_4$ leaves none, $0$ (the $C_4$ part keeps the axial pair, but the reflection then swaps them); $8S_6$, $0$; $3\sigma_h$ (a coordinate plane) leaves the 4 in that plane; $6\sigma_d$ (a plane containing one axis and bisecting the other two) leaves the 2 on that axis. So
$$
\chi(\Gamma_\sigma) = (6, 0, 0, 2, 2, 0, 0, 0, 4, 2).
$$
The reduction formula $n_i = \frac{1}{h}\sum_R g_R\,\chi(R)\,\chi_i(R)$ with $h = 48$ and the $O_h$ character table gives, for $A_{1g}$: $\frac{1}{48}(6 + 6\cdot2 + 3\cdot2 + 3\cdot4 + 6\cdot2) = \frac{48}{48} = 1$. For $E_g$ (characters $2, -1, 0, 0, 2, 2, 0, -1, 2, 0$): $\frac{1}{48}(12 + 0 + 3\cdot2\cdot2 + 3\cdot4\cdot2) = \frac{48}{48} = 1$. For $T_{1u}$ (characters $3, 0, -1, 1, -1, -3, -1, 0, 1, 1$): $\frac{1}{48}(18 + 6\cdot2\cdot1 + 3\cdot2\cdot(-1) + 3\cdot4\cdot1 + 6\cdot2\cdot1) = \frac{48}{48} = 1$. All other irreducible representations give zero, and the dimensions add up, $1 + 2 + 3 = 6$.

The explicit combinations follow by matching signs to the lobes of each metal orbital: $4s$ is positive everywhere, so all ligands enter with the same sign; $d_{x^2-y^2}$ is positive along $\pm x$ and negative along $\pm y$; $d_{z^2}$ has large positive lobes along $\pm z$ and a small negative ring in the $xy$ plane, matched by the weights $2, 2, -1, -1, -1, -1$; and each $p$ orbital changes sign through the metal, matching $\sigma_k - \sigma_{k'}$ for the pair on its axis. The normalisation constants make the sum of squared coefficients equal to 1.
:::

The MO diagram now follows from three facts. The ligand donor orbitals lie *below* the metal $d$ orbitals in energy (they are lone pairs on electronegative atoms), the metal $4s$ and $4p$ lie *above* the $3d$, and the overlap with $e_g$ is substantial. So we get six bonding MOs ($a_{1g}$, $t_{1u}$, $e_g$), mainly ligand in character; the non-bonding $t_{2g}$ set, pure metal $d$; the antibonding $e_g^*$, mainly metal $d$; and higher still the antibonding $a_{1g}^*$ and $t_{1u}^*$. The twelve electrons of the six ligand lone pairs fill the bonding orbitals, and the metal's $d$ electrons go into $t_{2g}$ and $e_g^*$. The gap between them is $\Delta_\mathrm{o}$.

::: intuition What Δo now means
In crystal field theory $\Delta_\mathrm{o}$ measures how much harder ligand charges push on $e_g$ than on $t_{2g}$. In ligand field theory it measures how *antibonding* the $e_g^*$ orbitals are: the stronger the σ interaction, the further $e_g^*$ is pushed up above the $d$ level and the larger $\Delta_\mathrm{o}$. A good σ donor is one whose donor orbital overlaps well with $d_{z^2}$ and $d_{x^2-y^2}$ and lies not too far below them in energy. That is why the electron-rich, high-lying lone pairs of $\mathrm{NH_3}$ and $\mathrm{CH_3^-}$ are strong σ donors, while the contracted, low-lying $2p$ lone pairs of fluoride are poor ones, whatever the charge.
:::

::: example Filling the σ-only diagram {#ex-sigma-filling}
Using the σ-only MO diagram, give the electron configuration of (a) $\mathrm{[Co(NH_3)_6]^{3+}}$ and (b) $\mathrm{[Ni(NH_3)_6]^{2+}}$, and say which electrons are metal-centred. What is the bond order per Co–N bond in (a), and how does (b) differ?
::: solution
(a) Each $\mathrm{NH_3}$ donates two electrons (12 in all) and cobalt(III) is $d^6$: 18 valence electrons. The twelve ligand electrons fill $a_{1g}^2t_{1u}^6e_g^4$; the six metal electrons, in a strong field, fill $t_{2g}^6$ with $e_g^*$ empty. The configuration is $(a_{1g})^2(t_{1u})^6(e_g)^4(t_{2g})^6$. Six bonding MOs are full and no antibonding MO is occupied, so there are six σ bonds, one per Co–N contact: bond order 1. (b) Nickel(II) is $d^8$: 20 valence electrons, $(a_{1g})^2(t_{1u})^6(e_g)^4(t_{2g})^6(e_g^*)^2$. Two electrons now occupy the antibonding $e_g^*$ set, cancelling one bonding pair's worth of σ bonding spread over six contacts: the bond order per Ni–N bond is $(12 - 2)/2 \div 6 = 5/6$. That is consistent with the longer, weaker, more labile Ni–N bonds of $\mathrm{[Ni(NH_3)_6]^{2+}}$, which exchanges ammonia in milliseconds, compared with hours or days for $\mathrm{[Co(NH_3)_6]^{3+}}$ ([[coordination-chemistry/inorganic-mechanisms]]).
:::
:::

## π bonding and the spectrochemical series

Many ligands also have orbitals that are π-symmetric about the M–L axis: the two lone pairs of a halide perpendicular to the bond, or the empty $\pi^*$ orbitals of CO, $\mathrm{CN^-}$, bpy or $\mathrm{NO^+}$, or the empty $\sigma^*$/$3d$-type acceptor orbitals of phosphines. With two π orbitals per ligand, the twelve ligand π functions of an octahedron span $T_{1g} + T_{2g} + T_{1u} + T_{2u}$ (by the same counting as [[#prop-sigma-lgo]]). Of these, $T_{1g}$ and $T_{2u}$ match no metal valence orbital and remain ligand non-bonding; $T_{1u}$ can mix weakly with the metal $p$ orbitals, which are already used for σ bonding; and $T_{2g}$ matches exactly the three $d$ orbitals left non-bonding by σ interactions. **π bonding is what happens to $t_{2g}$.**

::: proposition Effect of π interaction on Δo {#prop-pi-effect}
Let the metal $t_{2g}$ level lie at energy $E_d$ and a ligand $t_{2g}$ LGO at $E_\mathrm{L}$, with interaction matrix element $\beta_\pi$ (overlap neglected). Then the metal-based $t_{2g}$ orbital is shifted by
$$
\delta E(t_{2g}) = \tfrac12\left[(E_\mathrm{L} - E_d) \mp \sqrt{(E_\mathrm{L} - E_d)^2 + 4\beta_\pi^2}\,\right] \approx \frac{\beta_\pi^2}{E_d - E_\mathrm{L}}, \qquad |\beta_\pi| \ll |E_d - E_\mathrm{L}|,
$$ {#eq-pi-shift}
taking the upper sign for $E_\mathrm{L} > E_d$ and the lower for $E_\mathrm{L} < E_d$. A filled ligand π set lying **below** $E_d$ (a **π donor**) raises the metal $t_{2g}$, which becomes π-antibonding, and so **decreases** $\Delta_\mathrm{o}$. An empty ligand π set lying **above** $E_d$ (a **π acceptor**) lowers the metal $t_{2g}$, which becomes π-bonding, and so **increases** $\Delta_\mathrm{o}$. The $e_g^*$ level is unaffected to this order because it has no π partner.
:::

::: proof
For each component of $t_{2g}$ (they behave identically by symmetry) the two interacting orbitals give the secular determinant
$$
\begin{vmatrix} E_d - E & \beta_\pi \\ \beta_\pi & E_\mathrm{L} - E \end{vmatrix} = 0
\quad\Longrightarrow\quad
E_\pm = \tfrac12(E_d + E_\mathrm{L}) \pm \tfrac12\sqrt{(E_d - E_\mathrm{L})^2 + 4\beta_\pi^2}.
$$
The metal-based orbital is the root nearer $E_d$. Write $x = E_\mathrm{L} - E_d$. If $x < 0$ (ligand below), the metal-based root is $E_+$, and $E_+ - E_d = \tfrac12[x + \sqrt{x^2 + 4\beta_\pi^2}] > 0$: raised. If $x > 0$ (ligand above), it is $E_-$, and $E_- - E_d = \tfrac12[x - \sqrt{x^2 + 4\beta_\pi^2}] < 0$: lowered. Expanding the square root for $4\beta_\pi^2 \ll x^2$, $\sqrt{x^2 + 4\beta_\pi^2} \approx |x|(1 + 2\beta_\pi^2/x^2)$, gives in both cases $\delta E \approx -\beta_\pi^2/x = \beta_\pi^2/(E_d - E_\mathrm{L})$: positive when the ligand level is below, negative when it is above. Since $\Delta_\mathrm{o} = E(e_g^*) - E(t_{2g})$ and $E(e_g^*)$ is fixed by σ bonding, raising $t_{2g}$ decreases $\Delta_\mathrm{o}$ and lowering it increases $\Delta_\mathrm{o}$. Whether the ligand orbitals are filled or empty matters for the electron count: a filled donor set below contributes bonding electrons that stay on the ligand side, while an empty acceptor set above lets metal $t_{2g}$ electrons delocalise onto the ligand, which is **back-donation** (back-bonding).
:::

::: widget plot
f: (x + sqrt(x^2 + 4*b^2))/2; (x - sqrt(x^2 + 4*b^2))/2; 0; x
x: -4, 4
y: -5, 5
sliders: b=0.8:0:2:0.05
labels: E_+; E_-; \text{metal }t_{2g}\text{ alone}; \text{ligand }\pi\text{ alone}
caption: The two-orbital π interaction of [[#prop-pi-effect]], with energies measured from the unperturbed metal $t_{2g}$ level ($E_d = 0$) and $x = E_\mathrm{L} - E_d$ the position of the ligand π set (arbitrary units, for instance $10^4\ \mathrm{cm^{-1}}$). The slider sets the interaction $\beta_\pi$. On the left ($x < 0$, a filled π-donor set below the metal) the metal-based orbital is the upper root $E_+$, pushed *above* zero, so $\Delta_\mathrm{o}$ shrinks: halides, hydroxide, oxide. On the right ($x > 0$, an empty π-acceptor set above) the metal-based orbital is the lower root $E_-$, pushed *below* zero, so $\Delta_\mathrm{o}$ grows: CO, $\mathrm{CN^-}$, bpy, phosphines. The shift is largest when the two levels are close and falls off as $\beta_\pi^2/|x|$, which is why low-lying $\pi^*$ orbitals (CO) make better acceptors than high-lying ones.
:::

Now the spectrochemical series makes sense as a three-way ranking:
$$
\underbrace{\mathrm{I^- < Br^- < Cl^- < F^- < OH^-}}_{\sigma\text{ donor} + \pi\text{ donor}} \;<\; \underbrace{\mathrm{H_2O < NH_3 < en}}_{\sigma\text{ donor only}} \;<\; \underbrace{\mathrm{bpy < phen < CN^- < CO}}_{\sigma\text{ donor} + \pi\text{ acceptor}}.
$$
Halides have two filled $p$ lone pairs perpendicular to the bond and are π donors; hydroxide and oxide even more so. Water has one π-type lone pair and is a weak π donor; ammonia has none and is a pure σ donor, which is why it beats water. The strong-field end consists of ligands with low-lying empty π* orbitals. Within the halides, iodide is weakest because its σ-donor orbital is diffuse and overlaps poorly, while its π donation is still substantial. Even hydride and methyl, pure σ donors with no π orbitals, are strong-field ligands, because their high-lying σ orbitals interact very strongly with $e_g$.

::: warning Back-donation is not a second bond in the same place {#warn-back-bonding}
Students sometimes picture back-bonding in a metal carbonyl as electrons flowing back along the same σ bond. It is a separate interaction of different symmetry. The σ bond uses the carbon lone pair (the $5\sigma$ orbital of CO) and the metal $e_g$ orbitals (and $s$, $p$); the π back-bond uses filled metal $t_{2g}$ orbitals and the two empty $2\pi^*$ orbitals of CO, which are perpendicular to the M–C axis. The two interactions reinforce each other (the **synergic** bond): σ donation makes the metal more electron-rich, which increases back-donation, which in turn removes electron density from the metal and lets it accept more σ density. A second mistake is to think that π acceptors are "electron-withdrawing" in the sense of making the metal positive. They stabilise *low* oxidation states, where the metal has filled $t_{2g}$ electrons to give away. Carbonyls of metals in high oxidation states hardly exist, because a metal with no $t_{2g}$ electrons cannot back-donate.
:::

### Evidence for back-donation: carbonyl stretching frequencies

Electrons that enter the $2\pi^*$ orbital of CO weaken the C–O bond, so the C–O stretching frequency $\tilde\nu(\mathrm{CO})$ in the infrared is a direct probe of back-donation ([[spectroscopy/vibrational-spectroscopy]]). Free CO absorbs at $2143\ \mathrm{cm^{-1}}$. In metal carbonyls the bands lie lower, and they move steadily as the metal's charge changes in an isoelectronic series.

::: widget regression
points: -2,1748; -1,1858; 0,2000; 1,2090; 2,2204
degree: 1
residuals: true
x: -2.5, 2.5
y: 1700, 2250
caption: The $T_{1u}$ C–O stretching wavenumber ($y$, in $\mathrm{cm^{-1}}$) of the isoelectronic octahedral $d^6$ hexacarbonyls against the charge on the complex ($x$): $\mathrm{[Ti(CO)_6]^{2-}}$ 1748, $\mathrm{[V(CO)_6]^-}$ 1858, $\mathrm{[Cr(CO)_6]}$ 2000, $\mathrm{[Mn(CO)_6]^+}$ 2090 and $\mathrm{[Fe(CO)_6]^{2+}}$ 2204 (literature values as compiled in standard inorganic texts, to about $\pm 5\ \mathrm{cm^{-1}}$). The least-squares line has a slope of about $114\ \mathrm{cm^{-1}}$ per unit of charge. Each extra negative charge raises the metal $d$ level, narrows the gap to the CO $2\pi^*$ orbital and increases back-donation, weakening the C–O bond. Free CO ($2143\ \mathrm{cm^{-1}}$) lies between the manganese and iron complexes: in the dication, back-donation is so weak that σ donation from the slightly C–O antibonding $5\sigma$ orbital actually strengthens the C–O bond above its free value.
:::

::: example Reading back-donation from the infrared {#ex-co-ir}
The tetrahedral $d^{10}$ carbonyls $\mathrm{[Ni(CO)_4]}$, $\mathrm{[Co(CO)_4]^-}$ and $\mathrm{[Fe(CO)_4]^{2-}}$ absorb at $2060$, $1890$ and $1790\ \mathrm{cm^{-1}}$. (a) Explain the trend. (b) Estimate the fractional change in the C–O force constant from free CO to $\mathrm{[Fe(CO)_4]^{2-}}$, treating C–O as an isolated harmonic oscillator.
::: solution
(a) The three are isoelectronic ($d^{10}$, 18 electrons). Lowering the nuclear charge of the metal (Ni to Co to Fe) while adding negative charge raises the $3d$ level, so back-donation into CO $2\pi^*$ increases and the C–O bond weakens step by step, by about $100$–$170\ \mathrm{cm^{-1}}$ per step, similar to the octahedral series in the figure. (b) For a harmonic oscillator $\tilde\nu = (1/2\pi c)\sqrt{k/\mu}$, so at fixed reduced mass $k \propto \tilde\nu^2$. Then
$$
\frac{k(\mathrm{[Fe(CO)_4]^{2-}})}{k(\mathrm{CO})} = \left(\frac{1790}{2143}\right)^2 = 0.698,
$$
a 30 % drop in the force constant, roughly half way from a triple bond towards a double bond ($\tilde\nu$ of a ketone C=O is about $1715\ \mathrm{cm^{-1}}$). The isolated-oscillator approximation ignores coupling to the M–C stretch, which shifts the observed bands by a few per cent, but the trend is unaffected. Infrared spectra of carbonyls are used routinely to rank the electron-donating power of other ligands in the same complex, an idea developed in [[organometallics-catalysis/ligands-complexes]].
:::
:::

## The angular overlap model

Ligand field theory in its MO form is qualitative unless we compute overlaps and energies. The **angular overlap model** (AOM) of Claus Schäffer and Christian Klixbüll Jørgensen keeps the MO picture but parameterises it: each metal–ligand contact contributes one σ parameter $e_\sigma$ and one π parameter $e_\pi$ (per π direction), and the geometry enters only through angular factors. We met the σ part as a bookkeeping device in [[coordination-chemistry/crystal-field-theory#prop-tetrahedral]]; now we justify it and add π.

::: proposition AOM energies of the d orbitals {#prop-aom}
To second order in the metal–ligand overlap, the antibonding shift of a metal $d$ orbital caused by a ligand in direction $\hat{\mathbf n}$ is $e_\sigma F_\sigma^2 + e_\pi(F_{\pi x}^2 + F_{\pi y}^2)$, where $F$ are angular overlap factors and $e_\lambda = \beta_\lambda^2/(E_d - E_\mathrm{L})$ for $\lambda = \sigma, \pi$. Shifts from different ligands add. For an octahedron and a tetrahedron of identical ligands,
$$
\begin{aligned}
O_h&: \quad E(e_g) = 3e_\sigma, \qquad E(t_{2g}) = 4e_\pi, \qquad \Delta_\mathrm{o} = 3e_\sigma - 4e_\pi,\\
T_d&: \quad E(e) = \tfrac83 e_\pi, \qquad E(t_2) = \tfrac43 e_\sigma + \tfrac89 e_\pi, \qquad \Delta_\mathrm{t} = \tfrac43 e_\sigma - \tfrac{16}{9} e_\pi = \tfrac49\Delta_\mathrm{o}.
\end{aligned}
$$ {#eq-aom}
$e_\pi > 0$ for π donors and $e_\pi < 0$ for π acceptors. The model treats each M–L interaction as independent and ignores $s$–$d$ mixing and ligand–ligand interactions; it describes the $d$-orbital energies, not the total bonding energy.
:::

::: proof
Each $d$ orbital interacting with one ligand orbital is a two-level problem. By [[#eq-pi-shift]] with $|\beta| \ll |E_d - E_\mathrm{L}|$, the metal-based orbital is shifted by $\beta^2/(E_d - E_\mathrm{L})$. The resonance integral $\beta$ is proportional to the overlap integral, which separates into a radial part (fixed for a given metal, ligand and distance) and an angular part, the value of the $d$ orbital's angular function along the bond for σ, or of its derivative perpendicular to the bond for π. Writing $\beta = \beta_\lambda F_\lambda$, the shift is $e_\lambda F_\lambda^2$. With several ligands, each $d$ orbital in a symmetry-adapted basis interacts with an LGO whose squared coupling is the sum of the individual squared couplings, so the shifts add.

The σ factors were found in [[coordination-chemistry/crystal-field-theory#prop-tetrahedral]]: $e_g$ gets $3e_\sigma$ and $t_{2g}$ gets $0$ in $O_h$; in $T_d$, $t_2$ gets $\tfrac43 e_\sigma$ and $e$ gets $0$. For π in $O_h$: a ligand on the $x$ axis has π orbitals along $y$ and $z$, which overlap fully ($F = 1$) with $d_{xy}$ and $d_{xz}$ respectively and not at all with $d_{x^2-y^2}$ or $d_{z^2}$. Each $t_{2g}$ orbital lies in a plane containing four ligands, so $E(t_{2g}) = 4e_\pi$ and $E(e_g)$ gets no π contribution. For π in $T_d$, the standard angular factors (tabulated by Schäffer and in Figgis and Hitchman) give $\tfrac23$ per ligand for each $e$ orbital and $\tfrac29$ per ligand for each $t_2$ orbital, so $E(e) = 4 \times \tfrac23 e_\pi = \tfrac83 e_\pi$ and $E(t_2) = 4 \times \tfrac29 e_\pi = \tfrac89 e_\pi$ in addition to the σ term. Check: each ligand has two π orbitals and should contribute $2e_\pi$ in total over the five $d$ orbitals; summing, $2 \times \tfrac23 + 3 \times \tfrac29 = 2$. Finally
$$
\Delta_\mathrm{t} = \tfrac43 e_\sigma + \tfrac89 e_\pi - \tfrac83 e_\pi = \tfrac43 e_\sigma - \tfrac{16}{9} e_\pi = \tfrac49(3e_\sigma - 4e_\pi) = \tfrac49\Delta_\mathrm{o}.
$$
The four-ninths ratio therefore survives π bonding, provided the same ligands are at the same distance.
:::

::: example AOM parameters from two spectra {#ex-aom}
Hexaamminechromium(III) has $\Delta_\mathrm{o} = 21\,500\ \mathrm{cm^{-1}}$ and hexachloridochromate(III) has $13\,600\ \mathrm{cm^{-1}}$. (a) Taking ammonia as a pure σ donor, find $e_\sigma(\mathrm{NH_3})$. (b) Suppose an independent analysis of lower-symmetry chloride complexes gives $e_\sigma(\mathrm{Cl}) = 5600\ \mathrm{cm^{-1}}$ for chromium(III). Find $e_\pi(\mathrm{Cl})$. (c) Predict how the $t_{2g}$ set splits in *trans*-$\mathrm{[CrCl_2(NH_3)_4]^+}$, with Cl on the $z$ axis.
::: solution
(a) With $e_\pi = 0$, $\Delta_\mathrm{o} = 3e_\sigma$, so $e_\sigma(\mathrm{NH_3}) = 21\,500/3 = 7170\ \mathrm{cm^{-1}}$.

(b) $13\,600 = 3(5600) - 4e_\pi$ gives $e_\pi(\mathrm{Cl}) = (16\,800 - 13\,600)/4 = 800\ \mathrm{cm^{-1}}$: positive, so chloride is a π donor, and its π donation removes $3200\ \mathrm{cm^{-1}}$ from what its σ bonding alone would give.

(c) The AOM energies add ligand by ligand. $d_{xy}$ lies in the plane of the four ammonias and faces no chloride: $E = 4e_\pi(\mathrm{N}) = 0$. $d_{xz}$ lies in a plane with two ammonias (on $\pm x$) and two chlorides (on $\pm z$): $E = 2e_\pi(\mathrm{N}) + 2e_\pi(\mathrm{Cl}) = 1600\ \mathrm{cm^{-1}}$, and likewise $d_{yz}$. So the $t_{2g}$ set splits into $b_{2g}$ ($d_{xy}$, lower) and $e_g$ ($d_{xz}$, $d_{yz}$, raised by $1600\ \mathrm{cm^{-1}}$) in $D_{4h}$. This is the kind of splitting resolved in the polarised single-crystal spectra from which AOM parameters are actually obtained, and why the bands of *trans*-dihalido complexes are often visibly split.
:::
:::

## Counting electrons: the 18-electron rule

The MO diagram of an octahedral complex with strong σ donors and π acceptors has nine orbitals that are bonding or nearly non-bonding — the six σ-bonding MOs ($a_{1g}$, $t_{1u}$, $e_g$) and the three π-bonding $t_{2g}$ — and above them a large gap to $e_g^*$ and the other antibonding levels. Nine orbitals hold eighteen electrons. This is the molecular-orbital meaning of the old observation that stable carbonyls give the metal the electron count of the next noble gas.

::: proposition The 18-electron rule (empirical) {#prop-18e}
Thermodynamically stable, kinetically robust complexes of low-valent transition metals with strong σ-donor and π-acceptor ligands (CO, phosphines, alkenes, cyclopentadienyl, hydride, alkyls) usually have 18 valence electrons around the metal: the metal's $d$ electrons plus the electrons donated by the ligands. The rule holds best for octahedral, trigonal bipyramidal and tetrahedral complexes of groups 6–10. Square-planar $d^8$ complexes have **16** electrons. The rule does **not** apply to complexes with weak-field ligands, which commonly have 12–22 electrons.
:::

::: proof
The rule is empirical, but its range of validity follows from the MO diagram. With π-acceptor ligands, the nine orbitals $a_{1g}$, $t_{1u}$, $e_g$ (σ bonding) and $t_{2g}$ (π bonding) are all bonding, and the next orbitals, $e_g^*$, are strongly antibonding because the σ interaction is large. Filling exactly the nine bonding orbitals, with 18 electrons, maximises bonding; fewer electrons leave a bonding orbital partly empty, and more would occupy a strongly antibonding orbital. With weak-field σ donors and π donors, $t_{2g}$ is non-bonding or π-antibonding and $e_g^*$ is only weakly antibonding, so neither removing electrons from $t_{2g}$ nor adding them to $e_g^*$ costs much, and 18 has no special status. For square-planar $d^8$ complexes the $d_{x^2-y^2}$-based orbital is strongly antibonding and one $p$ orbital ($p_z$) has no σ partner and is left empty, so only eight valence orbitals are low-lying: 16 electrons.
:::

::: algorithm Counting valence electrons (ionic method) {#alg-electron-count}
1. Assign ligand charges as closed-shell species: $\mathrm{Cl^-}$, $\mathrm{H^-}$, $\mathrm{CH_3^-}$, $\mathrm{CN^-}$ and $\mathrm{C_5H_5^-}$ (Cp) are anions; CO, $\mathrm{PR_3}$, $\mathrm{NH_3}$, $\mathrm{H_2O}$ and alkenes are neutral.
2. Find the metal oxidation state and its $d^n$ count (as in [[coordination-chemistry/coordination-compounds#def-dn]]).
3. Add the electrons donated by each ligand: 2 for each $\mathrm{Cl^-}$, $\mathrm{H^-}$, $\mathrm{CH_3^-}$, CO, $\mathrm{PR_3}$, $\mathrm{NH_3}$ or η²-alkene; 4 for a bidentate ligand such as en; 6 for η⁵-Cp⁻ or η⁶-benzene.
4. Add one electron for each metal–metal single bond.
5. The total is the valence electron count. (The covalent or neutral-ligand method, which treats Cl and Cp as one- and five-electron radicals and the metal as neutral, gives the same total; use one method consistently.)
:::

::: example Who obeys the rule? {#ex-18e}
Count the valence electrons of (a) $\mathrm{[Cr(CO)_6]}$, (b) $\mathrm{[Fe(CO)_5]}$, (c) $\mathrm{[Mn_2(CO)_{10}]}$, (d) ferrocene $\mathrm{[Fe(\eta^5\text{-}C_5H_5)_2]}$, (e) $\mathrm{[V(CO)_6]}$, (f) $\mathrm{[PtCl_4]^{2-}}$, (g) $\mathrm{[Cr(H_2O)_6]^{3+}}$, and comment.
::: solution
(a) Cr(0), $d^6$, plus $6 \times 2 = 12$: **18**. (b) Fe(0), $d^8$, plus $5 \times 2$: **18**. (c) Each Mn(0) is $d^7$ with five CO (10) and one Mn–Mn bond (1): **18** per metal. The odd-electron fragment $\mathrm{Mn(CO)_5}$ (17 electrons) dimerises to reach 18. (d) Fe(II), $d^6$, plus two $\mathrm{Cp^-}$ ($2 \times 6$): **18**, the archetypal stable organometallic sandwich. (e) V(0), $d^5$, plus 12: **17**. $\mathrm{[V(CO)_6]}$ exists as a paramagnetic, deep-green solid that is easily reduced to the 18-electron $\mathrm{[V(CO)_6]^-}$; unlike $\mathrm{Mn(CO)_5}$ it does not dimerise, because six carbonyls crowd the vanadium too much to allow a V–V bond. (f) Pt(II), $d^8$, plus 8: **16**, the normal count for square-planar $d^8$. (g) Cr(III), $d^3$, plus 12: **15**. This is a perfectly stable complex: water is a weak-field σ and π donor, and the rule has nothing to say about it. Other stable "exceptions" with weak-field ligands include $\mathrm{[Ni(en)_3]^{2+}}$ (20) and $\mathrm{[Cu(H_2O)_6]^{2+}}$ (21).
:::
:::

::: quiz
Which of these ligands would you expect to *increase* $\Delta_\mathrm{o}$ by π interaction rather than decrease it?
- [x] CO
- [ ] $\mathrm{Cl^-}$
- [x] 2,2′-bipyridine
- [ ] $\mathrm{OH^-}$
- [x] $\mathrm{PPh_3}$
::: solution
CO, bpy and triphenylphosphine have empty orbitals of π symmetry (the $\pi^*$ orbitals of CO and bpy, the P–C $\sigma^*$ orbitals of the phosphine) above the metal $d$ level; they accept electron density from $t_{2g}$, lowering it and widening the gap ([[#prop-pi-effect]]). Chloride and hydroxide have filled π-type lone pairs below the $d$ level; they push $t_{2g}$ up and narrow the gap.
:::
:::

### Tetrahedral complexes and the limits of the simple picture

In $T_d$ the four ligand σ orbitals span $A_1 + T_2$. The metal $s$ orbital is $a_1$, and both the $p$ orbitals and the $d_{xy}$, $d_{xz}$, $d_{yz}$ orbitals are $t_2$, so in a tetrahedral complex the $t_2$ $d$ orbitals are σ-antibonding (with some $p$ mixing) and the $e$ pair is σ-non-bonding — the inverse of the octahedral case, as in crystal field theory. Because $d$ and $p$ orbitals share the $t_2$ representation, tetrahedral complexes have $d$–$p$ mixing that makes their $d$–$d$ bands much more intense than those of octahedral complexes (the Laporte rule of [[coordination-chemistry/spectra-of-complexes]]). The intense purple of permanganate, $\mathrm{[MnO_4]^-}$, a $d^0$ ion, has a different origin: it is a ligand-to-metal charge-transfer transition from oxygen non-bonding orbitals to the empty $e$ set, which the same MO diagram predicts.

::: example A covalency check from magnetic resonance {#ex-covalency}
In the EPR spectrum of $\mathrm{[IrCl_6]^{2-}}$ ($d^5$, low spin, one unpaired electron in $t_{2g}$) each line is split by coupling to the chlorine nuclei, and analysis shows that the unpaired electron spends several per cent of its time (roughly 4 %) on each of the six chlorides. What does this imply for the $t_{2g}$ orbital, and what crystal field theory prediction does it contradict?
::: solution
In crystal field theory the $t_{2g}$ electron is a pure iridium $5d$ electron, and no coupling to chlorine nuclei is possible. Hyperfine coupling to chlorine means the singly occupied orbital is a molecular orbital with ligand character. If each chloride carries about 4 %, then roughly $6 \times 4 = 24\ \%$ of the electron is on the ligands and only about three-quarters on iridium. The orbital is the π-antibonding $t_{2g}^*$ combination of [[#prop-pi-effect]], in which chloride $3p\pi$ lone pairs mix with iridium $5d_{xy}$-type orbitals. This experiment, reported by John Owen and Kenneth Stevens in 1953, was one of the first direct demonstrations that metal–ligand bonding in "ionic" complexes is substantially covalent, and with the nephelauxetic effect it persuaded chemists to move from crystal field to ligand field theory. Hyperfine couplings are covered in [[spectroscopy/epr]].
:::
:::

## Where this leads

The MO diagram of this chapter is the starting point of three later topics. The spectra of [[coordination-chemistry/spectra-of-complexes]] use $\Delta_\mathrm{o}$ as a parameter and add electron repulsion; the reduction of that repulsion in complexes (the nephelauxetic effect) is another signature of covalency. The 18-electron rule and the synergic metal–carbonyl bond are the foundation of [[organometallics-catalysis/organometallic-bonding]], where the same counting is applied to alkenes, arenes, carbenes and hydrides, and where 16- and 18-electron intermediates alternate in catalytic cycles. And the distinction between σ donors, π donors and π acceptors returns in the trans effect of [[coordination-chemistry/inorganic-mechanisms]], whose strongest *trans*-directing ligands are exactly the best π acceptors and σ donors.

::: history
The molecular orbital description of complexes is almost as old as crystal field theory. John Hasbrouck Van Vleck's 1935 paper in the *Journal of Chemical Physics* already showed that MO, valence bond and crystal field approaches give the same symmetry pattern, and that the MO picture includes covalency naturally. The counting rule is older still: Irving Langmuir pointed out in 1921 that the stable carbonyls give the metal 18 electrons, and Nevil Sidgwick in the 1920s generalised it as the "effective atomic number" rule. The modern synthesis came in the 1950s. Owen and Stevens's EPR evidence for covalency in $\mathrm{[IrCl_6]^{2-}}$ (1953) and Jørgensen's and Schäffer's work on the nephelauxetic effect showed that ligands share the metal's electrons, and J. S. Griffith and L. E. Orgel's 1957 review "Ligand-field theory" in *Quarterly Reviews* gave the subject its name and shape. Claus Schäffer and Christian Klixbüll Jørgensen introduced the angular overlap model in 1965. The synergic σ-donor/π-acceptor model of the metal–carbonyl and metal–alkene bond is associated with Michael Dewar (1951) and Joseph Chatt and Leonard Duncanson (1953).
:::

::: summary
- Ligand group orbitals classify ligand orbitals by symmetry. In $O_h$ the σ set spans $A_{1g} + E_g + T_{1u}$ and bonds with metal $s$, $e_g$ and $p$; the $t_{2g}$ set is σ-non-bonding.
- $\Delta_\mathrm{o}$ is the gap between $t_{2g}$ (non-bonding or π-bonding/antibonding) and $e_g^*$ (σ-antibonding). Strong σ donors raise $e_g^*$ and increase it.
- π donors (halides, $\mathrm{OH^-}$, $\mathrm{O^{2-}}$) raise $t_{2g}$ and decrease $\Delta_\mathrm{o}$; π acceptors (CO, $\mathrm{CN^-}$, bpy, phosphines) lower $t_{2g}$ and increase it. This explains the spectrochemical series.
- Back-donation from metal $t_{2g}$ into ligand $\pi^*$ is synergic with σ donation and is seen as a lowering of $\tilde\nu(\mathrm{CO})$, by roughly $100\ \mathrm{cm^{-1}}$ per unit of negative charge in isoelectronic series.
- The angular overlap model writes $\Delta_\mathrm{o} = 3e_\sigma - 4e_\pi$ and $\Delta_\mathrm{t} = \tfrac43 e_\sigma - \tfrac{16}{9}e_\pi = \tfrac49\Delta_\mathrm{o}$, and predicts splittings in lower symmetry ligand by ligand.
- The empirical 18-electron rule (16 for square-planar $d^8$) holds for low-valent metals with π-acceptor ligands, because nine bonding orbitals lie below a large gap; it does not apply to weak-field complexes.
- Ligand hyperfine structure in EPR and the nephelauxetic effect show directly that metal–ligand bonds are covalent.
:::

## Exercises

::: exercise Count to eighteen {level=1 check="18"}
Count the valence electrons of $\mathrm{[Mo(CO)_6]}$, $\mathrm{[Ni(CO)_4]}$ and $\mathrm{[(\eta^5\text{-}C_5H_5)Mn(CO)_3]}$. (Enter the count for the manganese compound.)
::: solution
$\mathrm{[Mo(CO)_6]}$: Mo(0), $d^6$, $+ 12 = 18$. $\mathrm{[Ni(CO)_4]}$: Ni(0), $d^{10}$, $+ 8 = 18$. $\mathrm{[CpMn(CO)_3]}$: with Cp as $\mathrm{C_5H_5^-}$, manganese is Mn(I), $d^6$; Cp⁻ gives 6 and three CO give 6: $6 + 6 + 6 = 18$. (Neutral method: Mn 7, Cp 5, CO 6, total 18.)
:::
:::

::: exercise Which metal orbitals bond? {level=1}
In an octahedral complex with only σ-donor ligands, which metal orbitals (3d, 4s, 4p) form bonding and antibonding MOs, and which remain non-bonding? Give their symmetry labels.
::: solution
The σ LGOs span $a_{1g} + e_g + t_{1u}$ ([[#prop-sigma-lgo]]). So $4s$ ($a_{1g}$), the $4p$ set ($t_{1u}$) and $d_{z^2}$, $d_{x^2-y^2}$ ($e_g$) form bonding and antibonding pairs, while $d_{xy}$, $d_{xz}$, $d_{yz}$ ($t_{2g}$) remain non-bonding. With π-capable ligands the $t_{2g}$ set takes part in π bonding.
:::
:::

::: exercise A force-constant ratio {level=1 check="0.871"}
$\mathrm{[Cr(CO)_6]}$ absorbs at $2000\ \mathrm{cm^{-1}}$ and free CO at $2143\ \mathrm{cm^{-1}}$. Treating C–O as an isolated harmonic oscillator, find $k(\mathrm{CO\ in\ Cr(CO)_6})/k(\mathrm{CO})$. (Enter the ratio to three significant figures.)
::: solution
At fixed reduced mass $k \propto \tilde\nu^2$, so the ratio is $(2000/2143)^2 = 0.871$. The C–O bond is about 13 % softer in the complex because of back-donation into $2\pi^*$.
:::
:::

::: exercise Ranking ligands by mechanism {level=2}
Explain in MO terms why (a) $\Delta_\mathrm{o}(\mathrm{H_2O}) > \Delta_\mathrm{o}(\mathrm{OH^-})$ for the same metal, (b) $\Delta_\mathrm{o}(\mathrm{NH_3}) > \Delta_\mathrm{o}(\mathrm{H_2O})$, and (c) $\Delta_\mathrm{o}(\mathrm{CN^-}) > \Delta_\mathrm{o}(\mathrm{NH_3})$, even though cyanide is a far weaker Brønsted base than ammonia.
::: solution
(a) Hydroxide has two filled lone pairs of π symmetry with respect to the M–O bond and is a stronger π donor than water, which has one; π donation raises $t_{2g}$ and narrows $\Delta_\mathrm{o}$, outweighing hydroxide's slightly better σ donation. (b) Ammonia has no π-type lone pair: it is a pure σ donor, and its nitrogen lone pair is higher in energy (more basic, better matched to the metal) than water's oxygen lone pair, so it raises $e_g^*$ more and lowers nothing. (c) Cyanide is both a good σ donor through carbon and a π acceptor, its empty $\pi^*$ orbitals lowering $t_{2g}$. Brønsted basicity measures affinity for $\mathrm{H^+}$, which has no π orbitals at all and so cannot benefit from back-donation; the spectrochemical series and the proton affinity order are different scales.
:::
:::

::: exercise A charge series of carbonyls {level=2 check="2323"}
Use the least-squares line of the hexacarbonyl figure, $\tilde\nu \approx 1980 + 114.4\,q\ \mathrm{cm^{-1}}$ for charge $q$, to estimate $\tilde\nu(\mathrm{CO})$ for the hypothetical $d^6$ cation $\mathrm{[Co(CO)_6]^{3+}}$, and comment on whether the extrapolation is reliable. (Enter the estimate in $\mathrm{cm^{-1}}$, to the nearest whole number.)
::: solution
$1980 + 114.4 \times 3 = 1980 + 343.2 = 2323\ \mathrm{cm^{-1}}$. The extrapolation is unreliable for two reasons. The points already scatter about the line (the step from 0 to +1 is smaller than its neighbours), and as the positive charge grows, back-donation approaches zero, so $\tilde\nu$ must level off at a value set by σ donation alone instead of rising without limit. A linear fit is a description of the data inside its range, not a law.
:::
:::

::: exercise AOM for a tetrahedron {level=2 check="11600/3"}
A tetrahedral complex has $e_\sigma = 4500\ \mathrm{cm^{-1}}$ and $e_\pi = 1200\ \mathrm{cm^{-1}}$ for its ligands. Use [[#eq-aom]] to find the energies of the $e$ and $t_2$ sets and $\Delta_\mathrm{t}$, and confirm that $\Delta_\mathrm{t} = \tfrac49\Delta_\mathrm{o}$ for the octahedral complex with the same parameters. (Enter $\Delta_\mathrm{t}$ in $\mathrm{cm^{-1}}$.)
::: solution
$E(e) = \tfrac83 \times 1200 = 3200\ \mathrm{cm^{-1}}$ and $E(t_2) = \tfrac43 \times 4500 + \tfrac89 \times 1200 = 6000 + 1066.7 = 7066.7\ \mathrm{cm^{-1}}$, so $\Delta_\mathrm{t} = 3866.7\ \mathrm{cm^{-1}}$. The closed formula agrees: $\tfrac43(4500) - \tfrac{16}{9}(1200) = 6000 - 2133.3 = 3866.7\ \mathrm{cm^{-1}}$. The octahedral analogue has $\Delta_\mathrm{o} = 3(4500) - 4(1200) = 8700\ \mathrm{cm^{-1}}$, and $\tfrac49 \times 8700 = 3866.7\ \mathrm{cm^{-1}}$, as required.
:::
:::

::: exercise Why there is no hexacarbonylnickel {level=3}
Use electron counting and the octahedral MO diagram to explain why nickel(0) forms $\mathrm{[Ni(CO)_4]}$ but not $\mathrm{[Ni(CO)_6]}$, and why $\mathrm{[Ni(en)_3]^{2+}}$, with 20 valence electrons, is nevertheless a stable complex.
::: solution
$\mathrm{[Ni(CO)_6]}$ would have $10 + 12 = 22$ electrons. In an octahedral complex with π-acceptor ligands the nine bonding orbitals hold 18 electrons and $e_g^*$ is strongly antibonding, because CO is a strong σ donor and back-bonding has lowered $t_{2g}$ further below it. Four electrons in $e_g^*$ would cancel two full σ bonds' worth of bonding: two CO ligands are better off leaving, giving the 18-electron tetrahedral $\mathrm{[Ni(CO)_4]}$, in which the ten $d$ electrons fill the $e$ and $t_2$ sets ($d^{10}$, with no ligand field preference) and the four Ni–C σ bonds and the back-bonding are all intact. In $\mathrm{[Ni(en)_3]^{2+}}$, nickel(II) is $d^8$, $t_{2g}^6e_g^{*2}$. Ethane-1,2-diamine is a σ donor of moderate strength with no π acceptor orbitals; $\Delta_\mathrm{o}$ is only about $11\,500\ \mathrm{cm^{-1}}$, so $e_g^*$ is only mildly antibonding, and the two electrons in it cost far less than the bonding gained from six Ni–N bonds and three chelate rings. The 18-electron rule is a statement about strongly bonding, π-accepting ligands, and $\mathrm{[Ni(en)_3]^{2+}}$ is outside its domain.
:::
:::

::: exercise The size of a π shift {level=3 check="198"}
A metal $t_{2g}$ level lies $20\,000\ \mathrm{cm^{-1}}$ below an empty ligand $\pi^*$ set, with $\beta_\pi = 2000\ \mathrm{cm^{-1}}$. (a) Use the exact expression in [[#eq-pi-shift]] to find the lowering of $t_{2g}$, and compare with the second-order approximation. (b) By how much does $\Delta_\mathrm{o}$ change? (c) If the $\pi^*$ level were only $10\,000\ \mathrm{cm^{-1}}$ above $t_{2g}$, what would the approximate shift be? (Enter the exact lowering in (a) in $\mathrm{cm^{-1}}$, to three significant figures.)
::: hint
With $x = E_\mathrm{L} - E_d = +20\,000\ \mathrm{cm^{-1}}$, the metal-based root is $E_- - E_d = \tfrac12\left[x - \sqrt{x^2 + 4\beta_\pi^2}\right]$.
:::
::: solution
(a) $\sqrt{20\,000^2 + 4 \times 2000^2} = \sqrt{4.00\times10^8 + 1.60\times10^7} = \sqrt{4.16\times10^8} = 20\,396\ \mathrm{cm^{-1}}$. Then $E_- - E_d = \tfrac12(20\,000 - 20\,396) = -198\ \mathrm{cm^{-1}}$: a lowering of $198\ \mathrm{cm^{-1}}$. The second-order formula gives $\beta_\pi^2/(E_\mathrm{L} - E_d) = 4.0\times10^6/20\,000 = 200\ \mathrm{cm^{-1}}$, 1 % high. (b) This is for one π interaction per $t_{2g}$ orbital as modelled; $\Delta_\mathrm{o}$ increases by the same $198\ \mathrm{cm^{-1}}$, since $e_g^*$ is unaffected. In an octahedral complex each $t_{2g}$ orbital interacts with four ligands, and $\beta_\pi$ here should be read as the coupling to the whole LGO. (c) Halving the energy gap doubles the second-order shift, to $4.0\times10^6/10\,000 = 400\ \mathrm{cm^{-1}}$. The closer the acceptor orbital, the stronger the back-bonding: CO, with a low-lying $2\pi^*$, is a far better π acceptor than $\mathrm{N_2}$, whose $\pi^*$ lies higher.
:::
:::
