A protein is a chain of a few hundred amino acids held together by strong covalent bonds, yet what makes it an enzyme, a receptor or a structural fibre is its *shape*, and that shape is held by forces a hundred times weaker than a covalent bond. Heat a solution of egg white to $70\ \mathrm{^\circ C}$ and the shape is lost without a single covalent bond breaking. Put oil and water together and they separate, although the attraction between an oil molecule and a water molecule is not repulsive at all. Add a few millimoles of lactic acid to a litre of blood and its pH barely moves. These three facts — the fragility of biological structure, the hydrophobic effect and the buffering of body fluids — are the subject of this chapter, and all three are properties of water. Biochemistry happens in water, at about $55\ \mathrm{mol\,dm^{-3}}$ of it, and every interaction between biomolecules is a competition with the interactions each molecule could make with the solvent instead.

We begin with the water molecule and the hydrogen bond, then treat electrostatic and van der Waals interactions quantitatively, then the hydrophobic effect, which is not a force at all but an entropy of the solvent. The last part returns to acid–base chemistry — the equilibria of [[general-chemistry-2/acids-bases]] and [[general-chemistry-2/buffers-titrations]] — applied to the buffers of cells and blood. The general description of intermolecular forces is in [[bonding-structure/intermolecular-forces]]; here we ask how large each force is *in water*, which is the only question that matters for a cell.

## Water and the hydrogen bond

The water molecule is bent, with an $\mathrm{H{-}O{-}H}$ angle of $104.5^\circ$ and $\mathrm{O{-}H}$ bonds of $95.7\ \mathrm{pm}$. Oxygen ($\chi = 3.44$) pulls electron density from hydrogen ($\chi = 2.20$), so each hydrogen carries a partial positive charge and the oxygen a partial negative charge concentrated in its two lone pairs. The result is a large dipole moment, $1.85\ \mathrm{D}$ in the gas phase, and a molecule with two hydrogen-bond donors and two acceptor lone pairs arranged roughly tetrahedrally. That four-fold geometry is the key to almost every unusual property of the liquid.

::: definition The hydrogen bond {#def-hbond}
A **hydrogen bond** $\mathrm{D{-}H\cdots A}$ is an attractive interaction between a hydrogen atom covalently bonded to an electronegative **donor** atom $\mathrm{D}$ (in biomolecules O or N, occasionally S or an activated C) and a lone pair on an electronegative **acceptor** atom $\mathrm{A}$ (O or N). In biological structures:

- the $\mathrm{D\cdots A}$ distance is typically $0.27$–$0.31\ \mathrm{nm}$ ($0.28\ \mathrm{nm}$ for $\mathrm{O\cdots O}$ in ice), less than the sum of the van der Waals radii of the two heavy atoms ($0.304\ \mathrm{nm}$ for two oxygens);
- the bond is **directional**: strongest when $\mathrm{D{-}H\cdots A}$ is close to linear, and weakened markedly beyond about $30^\circ$ of bending;
- its energy is mostly electrostatic (dipole–dipole and charge–dipole) with a covalent, charge-transfer component; isolated in the gas phase it is worth about $20\ \mathrm{kJ\,mol^{-1}}$ for the water dimer, and $4$–$40\ \mathrm{kJ\,mol^{-1}}$ across neutral and ionic pairs.

The energy that matters in water is not the gas-phase value but the **net** change when a solute–solute hydrogen bond replaces two solute–water hydrogen bonds; that net value is small, typically $0$–$6\ \mathrm{kJ\,mol^{-1}}$.
:::

In ice Ih every molecule donates two and accepts two hydrogen bonds, building an open tetrahedral lattice that is less dense than the liquid — which is why ice floats and lakes freeze from the top. When ice melts about $15\ \%$ of these bonds break, and the liquid at $25\ \mathrm{^\circ C}$ is a fluctuating network in which each molecule makes on average about $3.4$ hydrogen bonds whose partners change on a picosecond time scale. Breaking the network costs energy, and so water has an exceptionally high heat capacity ($4.18\ \mathrm{J\,g^{-1}\,K^{-1}}$), enthalpy of vaporisation ($44.0\ \mathrm{kJ\,mol^{-1}}$ at $25\ \mathrm{^\circ C}$) and surface tension for so small a molecule. Physiologically these numbers mean that the body buffers temperature well and loses heat efficiently by evaporation.

The property that matters most for the chemistry of the cell is the **relative permittivity** (dielectric constant), $\varepsilon_\mathrm{r} = 78.4$ at $25\ \mathrm{^\circ C}$ and $74.2$ at $37\ \mathrm{^\circ C}$ (CRC Handbook; Malmberg–Maryott fit). The permanent dipoles of water reorient in an electric field and partly cancel it, so the interaction between two ions in water is about eighty times weaker than in a vacuum. This is why salts dissolve: the ions are individually surrounded by oriented water molecules — the **hydration shell** — and the lattice energy is paid for by the hydration energy, as in [[thermodynamics/ions-in-solution]].

::: warning "Hydrogen bonds hold proteins together" — but not in the way it sounds {#warn-hbond-net}
A protein contains hundreds of hydrogen bonds, and it is tempting to multiply by $20\ \mathrm{kJ\,mol^{-1}}$ and conclude that a folded protein is enormously stable. It is not: typical unfolding free energies are only $20$–$60\ \mathrm{kJ\,mol^{-1}}$ for the whole molecule. The unfolded chain is not deprived of hydrogen bonds; it makes them with water. Folding *exchanges* amide–water and water–water hydrogen bonds for amide–amide and water–water ones, and the bookkeeping nearly cancels. What hydrogen bonds contribute is **specificity**: a buried polar group that is *not* hydrogen-bonded costs a great deal (it has lost its water partners for nothing), so the folded structure must satisfy almost every buried donor and acceptor. Hydrogen bonds decide *which* structure forms more than *whether* one forms.
:::

## Electrostatic interactions

Charged groups are everywhere in biomolecules: carboxylates of aspartate and glutamate, ammonium and guanidinium groups of lysine and arginine, phosphates of nucleic acids, metal ions. Their interactions obey Coulomb's law, modified by the medium.

::: proposition Coulomb energy in a dielectric {#prop-coulomb}
Two point charges $z_1e$ and $z_2e$ at distance $r$ in a uniform medium of relative permittivity $\varepsilon_\mathrm{r}$ have the interaction energy, per mole of pairs,
$$
E(r) = \frac{N_\mathrm{A}\,z_1z_2e^2}{4\pi\varepsilon_0\varepsilon_\mathrm{r}\,r} = \frac{1389.4\ \mathrm{kJ\,mol^{-1}\,Å}}{\varepsilon_\mathrm{r}}\,\frac{z_1z_2}{r}.
$$ {#eq-coulomb}
In an electrolyte of ionic strength $I$, mobile ions screen the interaction, and at distances beyond a few ångströms it falls off approximately as $E(r)\,e^{-r/\lambda_\mathrm{D}}$, with the **Debye length** $\lambda_\mathrm{D} = 0.304\ \mathrm{nm}/\sqrt{I/(\mathrm{mol\,dm^{-3}})}$ for water at $25\ \mathrm{^\circ C}$. The conditions are those of continuum electrostatics: the medium is uniform and much larger than the charges' separation, and the charges are not so close that the molecular structure of the solvent between them matters.
:::

::: proof Where the numbers come from
In a vacuum the energy of two point charges is $q_1q_2/4\pi\varepsilon_0 r$. In a polarisable medium the field of each charge orients and distorts the surrounding dipoles, whose induced charge partly cancels the field; for a linear, isotropic medium the field and hence the energy at any distance are reduced by the factor $\varepsilon_\mathrm{r}$. Multiplying by $N_\mathrm{A}$ gives molar units, and with $e = 1.602\,18\times10^{-19}\ \mathrm{C}$, $\varepsilon_0 = 8.854\,19\times10^{-12}\ \mathrm{F\,m^{-1}}$ and $r$ in ångströms ($10^{-10}\ \mathrm{m}$),
$$
\frac{N_\mathrm{A}e^2}{4\pi\varepsilon_0} = \frac{(6.022\,14\times10^{23})(1.602\,18\times10^{-19})^2}{4\pi(8.854\,19\times10^{-12})} = 1.3894\times10^{-4}\ \mathrm{J\,m\,mol^{-1}} = 1389.4\ \mathrm{kJ\,mol^{-1}\,Å}.
$$
For screening, Debye–Hückel theory solves the Poisson–Boltzmann equation linearised in the potential: the cloud of counter-ions around a charge makes the potential decay as $e^{-r/\lambda_\mathrm{D}}/r$ with $\lambda_\mathrm{D}^2 = \varepsilon_0\varepsilon_\mathrm{r}k_\mathrm{B}T/(2N_\mathrm{A}e^2 I)$, $I$ in $\mathrm{mol\,m^{-3}}$. Inserting $\varepsilon_\mathrm{r} = 78.4$ and $T = 298.15\ \mathrm{K}$ gives $\lambda_\mathrm{D} = 0.304\ \mathrm{nm}$ at $I = 1\ \mathrm{mol\,dm^{-3}}$, and the $1/\sqrt{I}$ dependence follows from the formula.
:::

The equation makes the decisive point at once. The thermal energy available per mole at body temperature is $RT = 2.58\ \mathrm{kJ\,mol^{-1}}$; an interaction is significant only if it is several $RT$. In water the energy of two opposite unit charges $0.4\ \mathrm{nm}$ apart is less than twice $RT$, but in a nonpolar environment it is thirty times $RT$.

::: example A salt bridge on the surface and in the interior {#ex-salt-bridge}
A lysine ammonium group ($+1$) and a glutamate carboxylate ($-1$) form an ion pair — a **salt bridge** — with their charge centres $0.40\ \mathrm{nm}$ apart. Estimate the Coulomb energy (a) on the protein surface, fully exposed to water ($\varepsilon_\mathrm{r} = 78.4$), and (b) buried in the protein interior, for which an effective $\varepsilon_\mathrm{r} \approx 4$ is often used. Compare each with $RT$ at $298\ \mathrm{K}$, and explain why buried salt bridges are nevertheless rare.
::: solution
With [[#eq-coulomb]], $z_1z_2 = -1$ and $r = 4.0\ \text{Å}$:

(a) $E = -1389.4/(78.4 \times 4.0) = -4.43\ \mathrm{kJ\,mol^{-1}}$, about $1.8\,RT$ ($RT = 2.48\ \mathrm{kJ\,mol^{-1}}$). Adding $0.15\ \mathrm{mol\,dm^{-3}}$ of salt ($\lambda_\mathrm{D} = 0.785\ \mathrm{nm}$) multiplies this by $e^{-0.40/0.785} = 0.60$, leaving about $-2.7\ \mathrm{kJ\,mol^{-1}}$: a surface salt bridge is worth roughly one $RT$, and its contribution to stability is often measured as $1$–$4\ \mathrm{kJ\,mol^{-1}}$.

(b) $E = -1389.4/(4 \times 4.0) = -86.8\ \mathrm{kJ\,mol^{-1}}$, about $35\,RT$ — enormous.

The catch is the price of getting there. Each ion in water is strongly hydrated; moving a single charge from water into a low-dielectric interior costs a **desolvation** (Born) energy of tens of $\mathrm{kJ\,mol^{-1}}$, which an isolated charge never repays. For a pair, the desolvation of both ions largely cancels the strong buried attraction, so the net gain over a solvent-exposed pair is small or even negative. Buried ion pairs therefore occur mostly where they are functional — in active sites and at subunit interfaces — and are usually networked with further hydrogen bonds. The general lesson: the strength of an interaction is meaningless without the strength of the interactions it replaced.
:::
:::

The figure plots [[#eq-coulomb]] for opposite unit charges; move the slider from the protein-interior value towards water and watch the well disappear.

::: widget plot
f: -1389.4/(e*x); -1389.4/(78.4*x)
x: 2, 12
y: -150, 0
sliders: e=4:2:80:1
labels: \varepsilon_\mathrm{r} = e\ \text{(slider)}; \text{water } (\varepsilon_\mathrm{r} = 78.4)
hlines: -2.48
caption: Coulomb energy $E$ (in $\mathrm{kJ\,mol^{-1}}$) of two opposite unit charges against separation $x$ (in Å), from $E = -1389.4/(\varepsilon_\mathrm{r}x)$. The slider sets $\varepsilon_\mathrm{r}$ of the medium (4 is a common effective value for a protein interior); the second curve is water at $25\ \mathrm{^\circ C}$. The horizontal line is $-RT$ at $298\ \mathrm{K}$: in water an ion pair is barely bound even at contact, while in a nonpolar medium it is bound by tens of $RT$. Screening by salt, not shown, weakens the water curve further.
:::

### Dipoles and van der Waals interactions

Most biomolecular groups are neutral but polar. A charge interacts with a dipole with an energy falling as $1/r^2$, two fixed dipoles as $1/r^3$, and two freely rotating dipoles, after Boltzmann averaging over orientations, as $1/r^6$. Every molecule, polar or not, also attracts every other through the **London dispersion** interaction, arising from correlated fluctuations of their electron clouds, which also falls as $1/r^6$. At short range, overlap of filled orbitals produces a steep repulsion. The sum of the $1/r^6$ attractions and the repulsion is what biochemists call the **van der Waals interaction**.

::: definition The van der Waals (Lennard-Jones) interaction {#def-vdw}
Between two uncharged atoms or groups the **van der Waals interaction** is commonly modelled by the Lennard-Jones potential
$$
V(r) = 4\epsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right],
$$ {#eq-lj}
where $\sigma$ is the distance at which $V = 0$ and $\epsilon$ is the depth of the well. The minimum lies at the **van der Waals contact distance** $r_\mathrm{min} = 2^{1/6}\sigma \approx 1.12\,\sigma$, where $V = -\epsilon$. For pairs of carbon, nitrogen and oxygen atoms $r_\mathrm{min}$ is about $0.34$–$0.40\ \mathrm{nm}$ and $\epsilon$ about $0.4$–$1\ \mathrm{kJ\,mol^{-1}}$. The $r^{-6}$ term has a physical basis (dispersion); the $r^{-12}$ term is an empirical convenience for the overlap repulsion.
:::

Setting $\mathrm{d}V/\mathrm{d}r = 0$ gives $12\sigma^{12}/r^{13} = 6\sigma^6/r^7$, so $r^6 = 2\sigma^6$, and substituting back gives $V = 4\epsilon(\tfrac14 - \tfrac12) = -\epsilon$. Each atom–atom contact is weaker than $RT$, but a folded protein or a tightly fitting ligand makes hundreds of them, and — unlike hydrogen bonds — they are not cancelled one-for-one by contacts with water, because the protein interior is packed about as densely as an organic crystal (packing fraction near $0.75$) while water around a solute is not. Close packing is therefore worth a great deal in aggregate, and it explains why the interiors of proteins tolerate few cavities and why a ligand that is a few tenths of an ångström too large binds badly: the $r^{-12}$ wall is unforgiving.

::: widget plot
f: 4*w*((s/x)^12 - (s/x)^6)
x: 0.28, 0.8
y: -1.5, 2
sliders: w=0.6:0.1:2:0.05; s=0.34:0.28:0.42:0.005
labels: V(r)
hlines: 0
caption: The Lennard-Jones potential $V(r) = 4\epsilon[(\sigma/r)^{12} - (\sigma/r)^6]$ in $\mathrm{kJ\,mol^{-1}}$ against $r$ (in nm). The sliders set the well depth $w = \epsilon$ and the size parameter $s = \sigma$. The minimum, $-\epsilon$, lies at $r = 2^{1/6}\sigma$ — $0.382\ \mathrm{nm}$ for $\sigma = 0.34\ \mathrm{nm}$. Note the asymmetry: compressing the contact by $0.03\ \mathrm{nm}$ costs far more than stretching it by the same amount, which is why steric clashes dominate the shape of binding sites.
:::

::: example Dispersion contacts add up {#ex-vdw-sum}
A small ligand buried in a binding pocket makes $40$ atom–atom contacts, each near the van der Waals minimum with $\epsilon = 0.5\ \mathrm{kJ\,mol^{-1}}$. In water, before binding, the same ligand atoms made contacts with water molecules whose total dispersion energy was about $70\ \%$ of that in the pocket (water is less densely packed around a solute and its atoms are less polarisable than carbon). Estimate the net van der Waals contribution to binding at $310\ \mathrm{K}$ and express it in units of $RT$. Then find the contact distance for $\sigma = 0.35\ \mathrm{nm}$.
::: solution
In the pocket the dispersion energy is $40 \times (-0.5) = -20\ \mathrm{kJ\,mol^{-1}}$. Before binding it was $0.70 \times (-20) = -14\ \mathrm{kJ\,mol^{-1}}$. The net change is $-20 - (-14) = -6\ \mathrm{kJ\,mol^{-1}}$, which is $6/2.58 = 2.3\,RT$ at $310\ \mathrm{K}$ — a factor of $e^{2.3} \approx 10$ in the binding constant from packing alone. (Water displaced from the pocket also gains interactions in bulk, which this crude estimate ignores; real calculations treat the whole cycle.) The contact distance is $r_\mathrm{min} = 2^{1/6} \times 0.35 = 0.393\ \mathrm{nm}$. The lesson is the same as for hydrogen bonds: each van der Waals contact is weak and mostly offset by solvent, but the *difference* between good and mediocre packing over many contacts is chemically significant.
:::
:::

## The hydrophobic effect

Methane dissolves in water only to about $1.4\ \mathrm{mmol\,dm^{-3}}$ at $1\ \mathrm{bar}$ and $25\ \mathrm{^\circ C}$, and oil and water separate into layers. The naive explanation — that hydrocarbons repel water — is wrong: the dispersion attraction between a hydrocarbon and water is comparable to that between hydrocarbon molecules. The real explanation lies in what a nonpolar solute does to the water around it.

::: definition The hydrophobic effect {#def-hydrophobic}
The **hydrophobic effect** is the tendency of nonpolar molecules and groups in water to aggregate, or to transfer into a nonpolar phase, so as to minimise their contact with water. Its thermodynamic signature for small nonpolar solutes near room temperature is:

- a positive free energy of transfer from a nonpolar solvent into water, roughly proportional to the nonpolar surface area exposed (about $3.5$–$4\ \mathrm{kJ\,mol^{-1}}$ per $\mathrm{CH_2}$ group, of order $0.1\ \mathrm{kJ\,mol^{-1}}$ per $\text{Å}^2$; empirical values from solubility data);
- a transfer that is opposed by **entropy** ($\Delta S < 0$ for nonpolar solute into water) while the enthalpy change is small;
- a large positive change in heat capacity on hydration, so that the enthalpy and entropy of transfer both change strongly with temperature.

It is an effect of the solvent, not an attractive force between the nonpolar groups.
:::

The molecular picture is this. A water molecule next to a nonpolar surface cannot point any of its four hydrogen-bonding directions at the solute. To keep its hydrogen bonds it must arrange them tangentially to the surface, which restricts its orientations. The hydrogen bonds survive (so $\Delta H$ is small), but the water in the first shell has fewer accessible configurations (so $\Delta S$ is negative). When two nonpolar molecules come together, part of this ordered shell is released into the bulk, and the entropy gain of the water drives the association. This is the old "iceberg" picture of Frank and Evans in a more defensible form; the water is not ice-like, but its orientational freedom is reduced.

::: example The thermodynamics of moving methane out of water {#ex-methane-transfer}
For the transfer of methane from water into benzene at $25\ \mathrm{^\circ C}$, compilations based on Kauzmann's analysis (as tabulated by Voet & Voet) give $\Delta H = +11.7\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G = -10.9\ \mathrm{kJ\,mol^{-1}}$. Find $\Delta S$ and $-T\Delta S$, say which term drives the transfer, and calculate the ratio of equilibrium concentrations $[\mathrm{CH_4}]_\text{benzene}/[\mathrm{CH_4}]_\text{water}$.
::: solution
From $\Delta G = \Delta H - T\Delta S$:
$$
\Delta S = \frac{\Delta H - \Delta G}{T} = \frac{(11.7 + 10.9)\times10^{3}\ \mathrm{J\,mol^{-1}}}{298.15\ \mathrm{K}} = +75.8\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
so $-T\Delta S = -22.6\ \mathrm{kJ\,mol^{-1}}$. The transfer is *endothermic*: methane is, if anything, better bonded in water than in benzene. It happens because of the entropy, $22.6\ \mathrm{kJ\,mol^{-1}}$ in its favour, which is the entropy gained by the water molecules released from the methane's hydration shell. The partition ratio is
$$
K = e^{-\Delta G/RT} = \exp\!\left(\frac{10\,900}{8.314 \times 298.15}\right) = e^{4.40} = 81.
$$
(The free energy refers to mole-fraction standard states, as in Kauzmann's tables, so $K$ is strictly a ratio of mole fractions; the conclusion is unchanged.) Methane prefers benzene by almost two orders of magnitude for entropic, not enthalpic, reasons: that is the hydrophobic effect in one line.
:::
:::

The large heat-capacity change has a striking consequence. Because $\partial\Delta H/\partial T = \Delta C_p$ and $\partial\Delta S/\partial T = \Delta C_p/T$, the entropic character of the effect at $25\ \mathrm{^\circ C}$ turns increasingly enthalpic at higher temperature, and the free energy of hydrophobic association has a maximum strength somewhere above room temperature. Proteins folded largely by the hydrophobic effect are therefore destabilised both by heating and, less familiarly, by cooling: **cold denaturation**, observed for several proteins below $0\ \mathrm{^\circ C}$ under conditions that prevent freezing. The two-state thermodynamics of folding is treated in [[biochemistry/amino-acids-proteins#prop-folding]].

The hydrophobic effect organises biology on every scale. It drives the burial of nonpolar side chains (leucine, isoleucine, valine, phenylalanine) in the cores of globular proteins, the self-assembly of phospholipids into bilayers and of detergents into micelles, the stacking of bases in nucleic acids, and much of the binding of drugs to their targets. **Amphipathic** molecules — those with both polar and nonpolar parts, such as fatty acid salts and phospholipids — satisfy both preferences at once by forming structures with their polar heads facing water and their tails hidden, a theme developed for membranes in [[biochemistry/carbohydrates-lipids]].

::: quiz
Two nonpolar side chains associate in water. Which statement best describes the thermodynamics at $25\ \mathrm{^\circ C}$?
- [ ] $\Delta H$ is large and negative because hydrocarbons attract each other much more strongly than they attract water.
- [x] $\Delta H$ is small; $\Delta S$ is positive because water molecules constrained at the nonpolar surfaces are released into the bulk.
- [ ] $\Delta S$ is negative because two molecules become one complex, and the process is driven by hydrogen bonds between the side chains.
- [ ] The process is driven by the Coulomb attraction of induced charges, which is strong because water has a high permittivity.
::: solution
Near room temperature the hydrophobic effect is entropy-driven: the solute–solute and solute–water dispersion interactions are similar in size, so $\Delta H$ is small, but releasing restricted shell water raises the solvent entropy. The loss of translational entropy of the two solutes is real but smaller. A high permittivity *weakens*, not strengthens, electrostatic attraction, and nonpolar side chains make no hydrogen bonds.
:::
:::

## Ionisation of water and pH

Water ionises slightly, $\mathrm{2\,H_2O \rightleftharpoons H_3O^+ + OH^-}$, with $K_\mathrm{w} = [\mathrm{H^+}][\mathrm{OH^-}] = 1.0\times10^{-14}$ at $25\ \mathrm{^\circ C}$ (concentrations in $\mathrm{mol\,dm^{-3}}$, activity coefficients taken as 1). The ionisation is endothermic, so $K_\mathrm{w}$ rises with temperature: at $37\ \mathrm{^\circ C}$, $\mathrm{p}K_\mathrm{w} = 13.62$ and neutral water has $\mathrm{pH} = 6.81$. "Neutral" is not a fixed pH. Writing $\mathrm{H^+}$ for the hydrated proton is shorthand; protons in water move through the hydrogen-bond network by the **Grotthuss mechanism**, a relay of bond rearrangements, which is why $\mathrm{H^+}$ and $\mathrm{OH^-}$ have far higher mobilities than other ions and why proton transfer in enzymes and membrane proteins can be so fast.

Most biomolecules are weak acids or bases. A carboxyl group ($\mathrm{p}K_\mathrm{a} \approx 4$) is almost fully deprotonated at pH 7; an amino group ($\mathrm{p}K_\mathrm{a} \approx 9$–$10$) almost fully protonated; the imidazole side chain of histidine ($\mathrm{p}K_\mathrm{a} \approx 6.0$) is partly protonated, which is why it is the commonest proton shuttle in enzyme active sites ([[biochemistry/enzymes]]). The equation that connects pH, $\mathrm{p}K_\mathrm{a}$ and the state of protonation is the workhorse of the subject.

::: proposition The Henderson–Hasselbalch equation {#prop-hh}
For a weak acid $\mathrm{HA}$ with conjugate base $\mathrm{A^-}$ in dilute aqueous solution,
$$
\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]},
$$ {#eq-hh}
and the fraction of the acid present as the base form is
$$
\alpha = \frac{[\mathrm{A^-}]}{[\mathrm{HA}] + [\mathrm{A^-}]} = \frac{1}{1 + 10^{\,\mathrm{p}K_\mathrm{a} - \mathrm{pH}}}.
$$ {#eq-alpha}
The equation holds when concentrations can stand for activities (dilute solution, or $\mathrm{p}K_\mathrm{a}$ values already corrected to the working ionic strength, written $\mathrm{p}K_\mathrm{a}'$) and, when used to *predict* a buffer's pH from the amounts mixed, when $[\mathrm{HA}]$ and $[\mathrm{A^-}]$ are both much larger than $[\mathrm{H^+}]$ and $[\mathrm{OH^-}]$.
:::

::: proof From the equilibrium constant
The acid dissociation constant is $K_\mathrm{a} = [\mathrm{H^+}][\mathrm{A^-}]/[\mathrm{HA}]$. Take $-\log_{10}$ of both sides:
$$
-\log_{10}K_\mathrm{a} = -\log_{10}[\mathrm{H^+}] - \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}, \quad\text{that is}\quad \mathrm{p}K_\mathrm{a} = \mathrm{pH} - \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]},
$$
which rearranges to [[#eq-hh]]. For the fraction, divide numerator and denominator of $\alpha$ by $[\mathrm{A^-}]$: $\alpha = 1/(1 + [\mathrm{HA}]/[\mathrm{A^-}])$, and $[\mathrm{HA}]/[\mathrm{A^-}] = [\mathrm{H^+}]/K_\mathrm{a} = 10^{\,\mathrm{p}K_\mathrm{a} - \mathrm{pH}}$. The relation itself is exact for equilibrium concentrations; the approximation enters only when one replaces the *equilibrium* $[\mathrm{HA}]$ and $[\mathrm{A^-}]$ by the *formal* amounts added, which is valid when the dissociation or protonation by water shifts them negligibly — the condition stated.
:::

Three consequences are worth memorising. At $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ the group is half protonated. One pH unit away, the ratio is $10:1$ ($\alpha = 0.909$ or $0.091$); two units away, $100:1$. And a buffer resists pH change best at its $\mathrm{p}K_\mathrm{a}$, as we now show.

::: definition Buffer capacity {#def-buffer-capacity}
The **buffer capacity** $\beta$ of a solution is the amount of strong base, per unit volume, needed to raise the pH by one unit, $\beta = \mathrm{d}c_\mathrm{b}/\mathrm{d\,pH}$. For a single weak acid–base pair at total concentration $C$, neglecting the contribution of water itself,
$$
\beta = \ln 10\; C\,\frac{K_\mathrm{a}[\mathrm{H^+}]}{(K_\mathrm{a} + [\mathrm{H^+}])^2} = \ln 10\; C\,\alpha(1 - \alpha),
$$ {#eq-beta}
which has its maximum $\beta_\mathrm{max} = (\ln 10)\,C/4 \approx 0.576\,C$ at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ and falls to a third of it one pH unit away. A buffer is useful within about $\mathrm{p}K_\mathrm{a} \pm 1$.
:::

The figure shows [[#eq-alpha]] and the normalised capacity $\beta/C$ together. Drag the $\mathrm{p}K_\mathrm{a}$ to $6.86$ (phosphate), $6.1$ (bicarbonate) or $6.0$ (histidine) and note where pH 7.4 falls on each curve.

::: widget plot
f: 1/(1 + 10^(p - x)); 2.3026*10^(x - p)/(1 + 10^(x - p))^2
x: 2, 12
y: 0, 1.05
sliders: p=6.86:3:11:0.01
labels: \alpha = [\mathrm{A^-}]/C; \beta/C
hlines: 0.5
vlines: 7.4
caption: The fraction $\alpha$ of a weak acid in its base form (sigmoid) and the buffer capacity per unit total concentration, $\beta/C = \ln 10\,\alpha(1-\alpha)$ (bell curve), against pH $x$. The slider sets $\mathrm{p}K_\mathrm{a}$ (default $6.86$, the second $\mathrm{p}K_\mathrm{a}$ of phosphoric acid). At $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ the acid is half dissociated and $\beta/C$ peaks at $0.576$; the vertical line marks pH 7.4. Water's own contribution to buffering, important only below pH 3 or above pH 11, is not included.
:::

## Physiological buffers

The pH of the cytosol is held near $7.2$ and that of blood plasma between $7.35$ and $7.45$. Three buffer systems do most of the work.

**Phosphate.** Lehninger (8th ed.) quotes $\mathrm{p}K_\mathrm{a}$ values of $2.14$, $6.86$ and $12.4$ for phosphoric acid at $25\ \mathrm{^\circ C}$. The thermodynamic (zero-ionic-strength) constants in Harris's *Quantitative Chemical Analysis* are $2.15$, $7.20$ and $12.38$; the middle value falls to about $6.8$–$6.9$ at physiological ionic strength, which is why biochemistry texts quote $6.86$, and we use it here. Only the middle pair, $\mathrm{H_2PO_4^-/HPO_4^{2-}}$, matters near pH 7; with cytosolic phosphate (inorganic and in metabolites) at several $\mathrm{mmol\,dm^{-3}}$ it is the main intracellular small-molecule buffer.

**Proteins.** Histidine side chains ($\mathrm{p}K_\mathrm{a} \approx 6$, shifted by their surroundings) and terminal amino groups buffer near pH 7. Haemoglobin, at about $2.3\ \mathrm{mmol\,dm^{-3}}$ of tetramer in blood (about $5\ \mathrm{mmol\,dm^{-3}}$ in the red cells themselves) with dozens of histidines each, is the largest non-bicarbonate buffer of blood, and its protonation is coupled to oxygen binding (the Bohr effect, [[biochemistry/protein-function]]).

**Bicarbonate.** The dominant extracellular buffer is unusual, because its acid form is a gas exchanged with the lungs:
$$
\mathrm{CO_2(g)} \rightleftharpoons \mathrm{CO_2(aq)}, \qquad \mathrm{CO_2(aq)} + \mathrm{H_2O} \rightleftharpoons \mathrm{H_2CO_3} \rightleftharpoons \mathrm{H^+} + \mathrm{HCO_3^-}.
$$
The hydration of $\mathrm{CO_2}$ is slow on its own and is catalysed in red cells by **carbonic anhydrase**, one of the fastest enzymes known. Because $[\mathrm{H_2CO_3}]$ is only about $1/400$ of $[\mathrm{CO_2(aq)}]$, physiologists combine the two equilibria into an apparent constant referred to dissolved $\mathrm{CO_2}$, $\mathrm{p}K_\mathrm{a}' = 6.1$ at $37\ \mathrm{^\circ C}$, and use Henry's law, $[\mathrm{CO_2(aq)}] = s\,p_\mathrm{CO_2}$ with $s = 0.0307\ \mathrm{mmol\,dm^{-3}\,mmHg^{-1}}$ (commonly rounded to $0.03$).

::: example The pH of arterial blood {#ex-bicarbonate}
Arterial plasma has $[\mathrm{HCO_3^-}] = 24\ \mathrm{mmol\,dm^{-3}}$ and $p_\mathrm{CO_2} = 40\ \mathrm{mmHg}$. Calculate its pH. Then explain, with the same equation, why the bicarbonate system is an effective physiological buffer even though its $\mathrm{p}K_\mathrm{a}'$ is $1.3$ units below blood pH.
::: solution
Dissolved $\mathrm{CO_2}$: $0.030 \times 40 = 1.20\ \mathrm{mmol\,dm^{-3}}$. Then
$$
\mathrm{pH} = 6.1 + \log_{10}\frac{24}{1.20} = 6.1 + \log_{10}20 = 6.1 + 1.30 = 7.40.
$$
(With the unrounded $s = 0.0307$ the result is $7.39$; the difference is within the precision of $\mathrm{p}K_\mathrm{a}' = 6.1$.) By the criterion of [[#def-buffer-capacity]], a pair $1.3$ units from its $\mathrm{p}K_\mathrm{a}$, with a base-to-acid ratio of $20:1$, is a poor buffer in a closed vessel. But the body is an **open system**: the lungs hold $p_\mathrm{CO_2}$ — the denominator — near constant and can lower it within minutes by faster breathing, while the kidneys adjust $[\mathrm{HCO_3^-}]$ — the numerator — over hours to days. An added strong acid converts $\mathrm{HCO_3^-}$ into $\mathrm{CO_2}$, which is breathed out instead of accumulating, so the ratio falls far less than it would in a beaker ([[#exr-open]] quantifies this). This is why clinicians describe acid–base disturbances as "respiratory" (a change in $p_\mathrm{CO_2}$) or "metabolic" (a change in $[\mathrm{HCO_3^-}]$): each attacks one term of the equation.
:::
:::

::: example Making a phosphate buffer {#ex-phosphate}
You need $1.00\ \mathrm{dm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ sodium phosphate buffer at pH 7.40, made from $\mathrm{Na_2HPO_4}$ ($M = 141.96\ \mathrm{g\,mol^{-1}}$) and $\mathrm{NaH_2PO_4}$ ($M = 119.98\ \mathrm{g\,mol^{-1}}$). Using $\mathrm{p}K_\mathrm{a} = 6.86$, find the masses of each salt, and the buffer capacity of the result.
::: solution
From [[#eq-hh]], $[\mathrm{HPO_4^{2-}}]/[\mathrm{H_2PO_4^-}] = 10^{7.40 - 6.86} = 10^{0.54} = 3.467$. The base fraction is $\alpha = 3.467/4.467 = 0.7762$, so the buffer contains $0.07762\ \mathrm{mol}$ of $\mathrm{HPO_4^{2-}}$ and $0.02238\ \mathrm{mol}$ of $\mathrm{H_2PO_4^-}$:
$$
m(\mathrm{Na_2HPO_4}) = 0.07762 \times 141.96 = 11.0\ \mathrm{g}, \qquad m(\mathrm{NaH_2PO_4}) = 0.02238 \times 119.98 = 2.69\ \mathrm{g}.
$$
The capacity from [[#eq-beta]] is $\beta = 2.303 \times 0.100 \times 0.7762 \times 0.2238 = 0.040\ \mathrm{mol\,dm^{-3}}$ per pH unit, $70\ \%$ of the maximum the same concentration would give at pH 6.86. In practice the pH is checked with a calibrated meter and trimmed with a little acid or base, because $\mathrm{p}K_\mathrm{a}$ depends on ionic strength and temperature. (Sodium phosphates are low-hazard laboratory chemicals; the usual eye protection applies.)
:::
:::

::: warning Henderson–Hasselbalch is not the whole titration {#warn-hh-limits}
The equation is often used outside its range. It cannot give the pH of a solution of the weak acid alone or the base alone (one of the logarithm's arguments is then near zero and the water equilibrium matters), and it gives nonsense for very dilute buffers whose components are comparable to $[\mathrm{H^+}]$. For polyprotic acids each $\mathrm{p}K_\mathrm{a}$ applies only to its own pair, and only when neighbouring $\mathrm{p}K_\mathrm{a}$ values are well separated (more than about 2 units). For groups in proteins, the "$\mathrm{p}K_\mathrm{a}$" is an apparent value that depends on the charges nearby, so the titration of a protein is not a simple sum of free-amino-acid curves — the theme of [[biochemistry/amino-acids-proteins#def-pi]].
:::

## Where this leads

Every later chapter uses these ideas. The folding of proteins in [[biochemistry/amino-acids-proteins]] balances the hydrophobic effect against the conformational entropy of the chain, with hydrogen bonds and packing deciding the details; the acid–base equations of this chapter give the charges of amino acids and the isoelectric points of proteins. Ligand binding in [[biochemistry/protein-function]] and catalysis in [[biochemistry/enzymes]] exploit precisely positioned charges and hydrogen bonds in low-dielectric pockets. Membranes in [[biochemistry/carbohydrates-lipids]] are the hydrophobic effect made visible, and the base stacking and hydrogen bonding of [[biochemistry/nucleic-acids]] make the double helix. The same continuum electrostatics returns in [[thermodynamics/ions-in-solution]] (Debye–Hückel theory) and in drug design in [[medicinal-chemistry/drug-binding]]. For the mathematics of logarithms and exponentials used throughout, see [Maths Atlas](/learn/maths/).

::: history
The hydrogen bond entered chemistry in 1920, when Wendell Latimer and Worth Rodebush, in Gilbert Lewis's department at Berkeley, explained the association of water and the weakness of ammonium hydroxide as a base by a hydrogen nucleus "held between two octets". In 1933 John Desmond Bernal and Ralph Fowler proposed a tetrahedrally hydrogen-bonded model of liquid water, and in 1935 Linus Pauling explained the residual entropy of ice, $R\ln\tfrac32$ per mole, by the disorder of its protons. The language of pH came from the Carlsberg Laboratory: Søren Sørensen introduced the pH scale in 1909, a year after Lawrence Henderson had written the buffer equilibrium for carbonic acid in blood, and Karl Albert Hasselbalch put Henderson's equation into logarithmic form in 1916. Peter Debye and Erich Hückel published their theory of electrolyte screening in 1923, and John Lennard-Jones his inverse-power potentials in 1924. The thermodynamics of hydrophobic hydration was described by Henry Frank and Marjorie Evans in 1945 ("icebergs"), and Walter Kauzmann's review of 1959 argued that "hydrophobic bonds" are the main force in protein folding — a view consolidated in Charles Tanford's book *The Hydrophobic Effect* (1973).
:::

::: summary
- Water is a small, strongly polar molecule with two donors and two acceptors in tetrahedral array; its hydrogen-bond network gives it a high heat capacity, enthalpy of vaporisation and relative permittivity ($78.4$ at $25\ \mathrm{^\circ C}$, $74.2$ at $37\ \mathrm{^\circ C}$).
- A hydrogen bond $\mathrm{D{-}H\cdots A}$ is directional and worth about $20\ \mathrm{kJ\,mol^{-1}}$ in the gas phase, but in water its *net* contribution is small; hydrogen bonds confer specificity more than stability.
- Coulomb energy in a medium is $1389.4\,z_1z_2/(\varepsilon_\mathrm{r}r)\ \mathrm{kJ\,mol^{-1}}$ ($r$ in Å), further screened by salt over a Debye length $0.304/\sqrt{I}\ \mathrm{nm}$; ion pairs are weak in water and strong but costly to desolvate in protein interiors.
- Van der Waals interactions (Lennard-Jones, minimum at $2^{1/6}\sigma$) are individually weaker than $RT$ but add up over the many contacts of close packing.
- The hydrophobic effect is an entropy of the solvent near room temperature, with small $\Delta H$ and a large heat-capacity change; it drives protein folding, membrane formation and much ligand binding.
- Henderson–Hasselbalch: $\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log([\mathrm{A^-}]/[\mathrm{HA}])$; buffer capacity $\beta = \ln 10\,C\alpha(1-\alpha)$ peaks at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$.
- Phosphate and histidine buffer inside cells; bicarbonate ($\mathrm{p}K_\mathrm{a}' = 6.1$, $p_\mathrm{CO_2}$ set by the lungs) is an open-system buffer that holds blood at pH 7.4.
:::

## Exercises

::: exercise Acetate buffer ratio {level=1 check="10"}
Acetic acid has $\mathrm{p}K_\mathrm{a} = 4.76$ at $25\ \mathrm{^\circ C}$. What ratio $[\mathrm{CH_3COO^-}]/[\mathrm{CH_3COOH}]$ gives a buffer of pH 5.76, and what fraction of the acid is then deprotonated? (Enter the ratio.)
::: solution
From the Henderson–Hasselbalch equation, $\log_{10}([\mathrm{A^-}]/[\mathrm{HA}]) = 5.76 - 4.76 = 1.00$, so the ratio is $10^{1.00} = 10$. The fraction deprotonated is $\alpha = 10/11 = 0.909$. The buffer capacity is then only $\ln 10 \times 0.909 \times 0.091 = 0.19$ times $C$, a third of its maximum, which is the usual rule that a buffer works within one unit of its $\mathrm{p}K_\mathrm{a}$.
:::
:::

::: exercise A partly buried salt bridge {level=1 check="34.7"}
An arginine guanidinium ($+1$) and an aspartate carboxylate ($-1$) are $0.40\ \mathrm{nm}$ apart in a partly buried region with effective $\varepsilon_\mathrm{r} = 10$. Calculate the magnitude of their Coulomb energy. (Enter $\lvert E\rvert$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$E = -1389.4 \times 1 \times 1/(10 \times 4.0) = -34.7\ \mathrm{kJ\,mol^{-1}}$, so $\lvert E\rvert = 34.7\ \mathrm{kJ\,mol^{-1}}$ — eight times its value in water ($4.43$) and about $13\,RT$ at $310\ \mathrm{K}$. The effective permittivity of a protein region is not a fundamental constant; values between 4 and 20 are used depending on how buried and how polar the surroundings are, so such estimates are good to a factor of two at best.
:::
:::

::: exercise Metabolic acidosis {level=1 check="7.32"}
In a patient's arterial blood $[\mathrm{HCO_3^-}] = 20\ \mathrm{mmol\,dm^{-3}}$ while $p_\mathrm{CO_2} = 40\ \mathrm{mmHg}$. Using $\mathrm{p}K_\mathrm{a}' = 6.1$ and $s = 0.030\ \mathrm{mmol\,dm^{-3}\,mmHg^{-1}}$, calculate the pH, and say which kind of disturbance this is. (Enter the pH to two decimal places.)
::: solution
$[\mathrm{CO_2(aq)}] = 0.030 \times 40 = 1.20\ \mathrm{mmol\,dm^{-3}}$ and $\mathrm{pH} = 6.1 + \log_{10}(20/1.20) = 6.1 + 1.222 = 7.32$. The bicarbonate (the "metabolic" term) is low while $p_\mathrm{CO_2}$ is normal, so this is a metabolic acidosis; the expected physiological response is faster breathing to lower $p_\mathrm{CO_2}$ and bring the ratio back towards 20. (This is a chemistry exercise, not a clinical assessment.)
:::
:::

::: exercise Contact distance {level=1 check="0.382"}
For two carbon atoms the Lennard-Jones parameters are $\sigma = 0.340\ \mathrm{nm}$ and $\epsilon = 0.36\ \mathrm{kJ\,mol^{-1}}$. Find the separation at the potential minimum and the energy there, and the energy at $r = \sigma$. (Enter $r_\mathrm{min}$ in nm to three significant figures.)
::: solution
$r_\mathrm{min} = 2^{1/6}\sigma = 1.1225 \times 0.340 = 0.382\ \mathrm{nm}$ and $V(r_\mathrm{min}) = -\epsilon = -0.36\ \mathrm{kJ\,mol^{-1}}$, about $0.14\,RT$ at body temperature. At $r = \sigma$ both bracketed terms equal 1 and $V = 0$: moving only $0.042\ \mathrm{nm}$ inwards from the minimum has cost the whole well depth, and any further compression rises steeply.
:::
:::

::: exercise Preparing a buffer of given capacity {level=2 check="0.0288"}
What is the maximum buffer capacity of a $50.0\ \mathrm{mmol\,dm^{-3}}$ HEPES buffer ($\mathrm{p}K_\mathrm{a} = 7.5$ at $25\ \mathrm{^\circ C}$), at what pH is it reached, and by how much would the pH change if $1.0\ \mathrm{mmol\,dm^{-3}}$ of strong acid were added at that pH? (Enter $\beta_\mathrm{max}$ in $\mathrm{mol\,dm^{-3}}$ per pH unit to three significant figures.)
::: solution
$\beta_\mathrm{max} = \ln 10\,C/4 = 2.3026 \times 0.0500/4 = 0.0288\ \mathrm{mol\,dm^{-3}}$ per pH unit, at $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 7.5$. For a small addition, $\Delta\mathrm{pH} \approx -\Delta c/\beta = -0.0010/0.0288 = -0.035$. (Exactly: the base and acid forms go from $25.0$ and $25.0$ to $24.0$ and $26.0\ \mathrm{mmol\,dm^{-3}}$, so $\mathrm{pH} = 7.5 + \log_{10}(24/26) = 7.465$, a change of $-0.035$.)
:::
:::

::: exercise Ethane and the hydrophobic effect {level=2 check="84.2"}
For the transfer of ethane from water to benzene at $25\ \mathrm{^\circ C}$, the same compilation as in [[#ex-methane-transfer]] gives $\Delta H = +9.2\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G = -15.9\ \mathrm{kJ\,mol^{-1}}$. Calculate $\Delta S$, and compare the free energy per carbon with methane's. (Enter $\Delta S$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$ to three significant figures.)
::: solution
$\Delta S = (9.2 + 15.9)\times10^{3}/298.15 = 84.2\ \mathrm{J\,K^{-1}\,mol^{-1}}$, so $-T\Delta S = -25.1\ \mathrm{kJ\,mol^{-1}}$; the transfer is again endothermic and entropy-driven. The extra $\mathrm{CH_2}$ group makes $\Delta G$ more negative by $5.0\ \mathrm{kJ\,mol^{-1}}$, of the same order as the $3.5$–$4\ \mathrm{kJ\,mol^{-1}}$ per methylene found from longer homologous series: the hydrophobic driving force grows roughly in proportion to nonpolar surface area.
:::
:::

::: exercise Debye screening {level=2 check="0.785"}
Calculate the Debye length in water at $25\ \mathrm{^\circ C}$ for a physiological ionic strength of $0.15\ \mathrm{mol\,dm^{-3}}$, and the factor by which the Coulomb energy of two charges $0.40\ \mathrm{nm}$ apart is reduced by screening compared with pure water. Repeat for $I = 0.010\ \mathrm{mol\,dm^{-3}}$. (Enter $\lambda_\mathrm{D}$ at $I = 0.15$ in nm to three significant figures.)
::: solution
$\lambda_\mathrm{D} = 0.304/\sqrt{0.15} = 0.785\ \mathrm{nm}$, and the screening factor is $e^{-0.40/0.785} = 0.60$. At $I = 0.010$, $\lambda_\mathrm{D} = 0.304/0.100 = 3.04\ \mathrm{nm}$ and the factor is $e^{-0.40/3.04} = 0.88$. Physiological salt therefore removes about $40\ \%$ of a short-range ion-pair interaction and almost all long-range interactions beyond $1$–$2\ \mathrm{nm}$; this is why the binding of highly charged molecules such as DNA-binding proteins is so sensitive to salt concentration. (The exponential form is itself only approximate at distances comparable to ion sizes.)
:::
:::

::: exercise Buffer capacity from first principles {level=3}
A solution contains a weak acid $\mathrm{HA}$ and its sodium salt at total concentration $C = [\mathrm{HA}] + [\mathrm{A^-}]$, to which strong base is added at concentration $c_\mathrm{b}$. (a) Using the charge balance, show that, when $[\mathrm{H^+}]$ and $[\mathrm{OH^-}]$ are negligible beside the buffer species, $c_\mathrm{b} = C\alpha + \text{constant}$, and hence derive [[#eq-beta]]. (b) Show that $\beta$ is maximal at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ and find the ratio $\beta(\mathrm{p}K_\mathrm{a} \pm 1)/\beta_\mathrm{max}$.
::: hint
Write $\alpha$ as a function of $h = [\mathrm{H^+}] = 10^{-\mathrm{pH}}$ and use $\mathrm{d}h/\mathrm{d\,pH} = -h\ln 10$.
:::
::: solution
(a) Let the salt contribute $c_\mathrm{s}$ of $\mathrm{Na^+}$. Charge balance: $[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$, with $[\mathrm{Na^+}] = c_\mathrm{s} + c_\mathrm{b}$. Neglecting $[\mathrm{H^+}]$ and $[\mathrm{OH^-}]$, $c_\mathrm{b} = [\mathrm{A^-}] - c_\mathrm{s} = C\alpha - c_\mathrm{s}$. With $\alpha = K_\mathrm{a}/(K_\mathrm{a} + h)$,
$$
\frac{\mathrm{d}\alpha}{\mathrm{d}h} = -\frac{K_\mathrm{a}}{(K_\mathrm{a} + h)^2}, \qquad \beta = \frac{\mathrm{d}c_\mathrm{b}}{\mathrm{d\,pH}} = C\,\frac{\mathrm{d}\alpha}{\mathrm{d}h}\,\frac{\mathrm{d}h}{\mathrm{d\,pH}} = \ln 10\;C\,\frac{K_\mathrm{a}h}{(K_\mathrm{a} + h)^2},
$$
and since $\alpha(1 - \alpha) = K_\mathrm{a}h/(K_\mathrm{a} + h)^2$ this is $\ln 10\,C\alpha(1-\alpha)$. (Including water adds $\ln 10\,([\mathrm{H^+}] + [\mathrm{OH^-}])$.) (b) $\alpha(1-\alpha)$ is a downward parabola in $\alpha$ with maximum $\tfrac14$ at $\alpha = \tfrac12$, i.e. at $h = K_\mathrm{a}$, $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$. At $\mathrm{pH} = \mathrm{p}K_\mathrm{a} \pm 1$, $\alpha = 10/11$ or $1/11$ and $\alpha(1-\alpha) = 10/121$, so the ratio is $(10/121)/(1/4) = 40/121 = 0.33$.
:::
:::

::: exercise Open and closed bicarbonate buffering {level=3 check="7.17" #exr-open}
Blood plasma starts at $[\mathrm{HCO_3^-}] = 24.0$ and $[\mathrm{CO_2(aq)}] = 1.20\ \mathrm{mmol\,dm^{-3}}$ ($\mathrm{p}K_\mathrm{a}' = 6.1$). Strong acid is added to give $10.0\ \mathrm{mmol\,dm^{-3}}$ of $\mathrm{H^+}$, all of which reacts with bicarbonate. Calculate the final pH (a) in a closed vessel, where the $\mathrm{CO_2}$ formed stays dissolved, and (b) in an open system in which breathing keeps $[\mathrm{CO_2(aq)}]$ at $1.20\ \mathrm{mmol\,dm^{-3}}$. Ignore the non-bicarbonate buffers. (Enter the pH in case (b) to two decimal places.)
::: hint
Each proton converts one $\mathrm{HCO_3^-}$ into one $\mathrm{CO_2}$; the difference between the cases is only what happens to the $\mathrm{CO_2}$.
:::
::: solution
After reaction $[\mathrm{HCO_3^-}] = 24.0 - 10.0 = 14.0\ \mathrm{mmol\,dm^{-3}}$.

(a) Closed: $[\mathrm{CO_2}] = 1.20 + 10.0 = 11.2\ \mathrm{mmol\,dm^{-3}}$ and $\mathrm{pH} = 6.1 + \log_{10}(14.0/11.2) = 6.1 + 0.097 = 6.20$ — a catastrophic fall of 1.2 units.

(b) Open: $\mathrm{pH} = 6.1 + \log_{10}(14.0/1.20) = 6.1 + 1.067 = 7.17$, a fall of only $0.23$.

The open system turns a mediocre closed buffer into an excellent one, because the acid form is removed as fast as it is made. Breathing faster (lowering $p_\mathrm{CO_2}$ below normal) would bring the pH closer still to 7.4: at $[\mathrm{CO_2}] = 0.70\ \mathrm{mmol\,dm^{-3}}$ it would be $6.1 + \log_{10}20 = 7.40$. The non-bicarbonate buffers (haemoglobin, phosphate, plasma proteins) would absorb part of the acid too and make the fall smaller in both cases.
:::
:::

::: exercise Is a buried hydrogen bond worth making? {level=3}
A protein can adopt two conformations. In conformation A a buried serine hydroxyl donates a hydrogen bond to a backbone carbonyl. In conformation B the side chain rotates so that the hydroxyl is still buried but makes no hydrogen bond. In the unfolded state the hydroxyl and the carbonyl each make hydrogen bonds to water. Using the bookkeeping of [[#warn-hbond-net]], explain (a) why the net contribution of the hydrogen bond in A to folding stability, relative to the unfolded state, is small, and (b) why the free-energy difference between A and B is nevertheless large (several $\mathrm{kJ\,mol^{-1}}$). (c) If $G_\mathrm{B} - G_\mathrm{A} = 6.0\ \mathrm{kJ\,mol^{-1}}$ at $310\ \mathrm{K}$, what is the ratio of the populations of A and B?
::: solution
(a) Folding to A breaks the serine–water and carbonyl–water hydrogen bonds and forms one serine–carbonyl bond; the displaced waters form a water–water hydrogen bond in the bulk. The number of hydrogen bonds is about the same before and after, so the net enthalpy change is small; what remains is the small difference between a geometrically optimal intramolecular bond and those with water, plus entropy terms, typically $0$–$6\ \mathrm{kJ\,mol^{-1}}$.

(b) In B the hydroxyl and the carbonyl have lost their water partners and gained nothing: two hydrogen bonds' worth of interaction has been given up with no replacement inside a low-dielectric interior. So B lies well above A, and also above the unfolded state for this group. That is the specificity argument: buried polar groups must be satisfied, so hydrogen bonds select the correct structure among compact alternatives even though they add little to stability relative to the unfolded chain.

(c) $N_\mathrm{A}/N_\mathrm{B} = e^{\Delta G/RT} = \exp(6000/(8.314 \times 310)) = e^{2.33} = 10.3$: about ten molecules in A for every one in B.
:::
:::
