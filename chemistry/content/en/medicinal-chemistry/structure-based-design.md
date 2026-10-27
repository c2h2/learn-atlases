In 1976 Christopher Beddell and Peter Goodford, at Wellcome, took the coordinates of human haemoglobin and asked a question nobody had been able to ask before: given the shape and chemistry of the cleft between the two β chains, what molecule would fit it and bind? They designed substituted benzaldehydes to bridge two amino groups across it, made them, and found that they lowered haemoglobin's oxygen affinity as the model predicted. It was the first published attempt to design ligands from a protein structure, and the beginning of **structure-based drug design**.

Fifty years later the practice is routine: over 200,000 macromolecular structures are deposited in the Protein Data Bank, AlphaFold has predicted models for essentially every known protein sequence, and no project on a protein target begins without asking whether a structure exists. This chapter is about what to do with one — what structures can and cannot tell us ([[#def-bfactor]]), how molecules are docked and scored ([[#prop-score]], [[#prop-fep]]), how fragments are grown under crystallographic guidance ([[#def-ge]]), and how four campaigns used a structure to decide what to make next. The free energies are those of [[medicinal-chemistry/drug-binding]] and the structural moves those of [[medicinal-chemistry/structure-activity]], now made deliberately rather than by trial. Drugs are named to illustrate chemistry; nothing here is medical advice.

## Where structures come from, and what they can bear

**X-ray crystallography** remains the main source. The intensities of the diffracted beams ([[materials-chemistry/diffraction]]) give the amplitudes of the structure factors but not their phases, which come from molecular replacement, heavy-atom methods or a model; from amplitudes and phases an **electron density map** is computed, and into it a chemical model — residues, waters, ions, the ligand — is built and refined until the density it predicts matches the density observed. Three numbers describe how well that worked.

The **resolution** $d_\mathrm{min}$, the smallest lattice spacing measured, sets the detail: at $3.0\ \text{Å}$ a map shows the shape of a side chain, at $2.0\ \text{Å}$ the positions of its atoms, at $1.2\ \text{Å}$ individual waters, and only below about $0.9\ \text{Å}$ does density for hydrogen appear. The **R factor** $R = \sum\lvert \lvert F_\mathrm{obs}\rvert - \lvert F_\mathrm{calc}\rvert\rvert / \sum\lvert F_\mathrm{obs}\rvert$ measures the model's agreement with the data, and $R_\mathrm{free}$, computed from reflections excluded from refinement, is the honest figure: near $0.20$ at $1.8\ \text{Å}$ the structure is reliable, at $0.35$ it is a sketch. And each atom carries a **displacement parameter**, its B factor.

::: definition Resolution, B factor and coordinate uncertainty {#def-bfactor}
The **atomic displacement parameter** (temperature factor, B factor) of an atom is defined by the attenuation it causes in the scattering at resolution $d$,
$$
f = f_0\exp\!\left(-\frac{B\sin^2\theta}{\lambda^2}\right) = f_0\exp\!\left(-\frac{B}{4d^2}\right),
$$ {#eq-debye}
and is related to the mean square displacement $\langle u^2\rangle$ from the modelled position, averaged over the crystal and over time, by
$$
B = 8\pi^2\langle u^2\rangle, \qquad u_\mathrm{rms} = \sqrt{\langle u^2\rangle} = \sqrt{\frac{B}{8\pi^2}},
$$ {#eq-bfac}
with $B$ in $\text{Å}^2$ and $u_\mathrm{rms}$ in Å. A large $B$ means the atom is disordered, mobile or partly occupied, its coordinates an average over positions differing by $u_\mathrm{rms}$ or more.
:::

::: proof Where $B = 8\pi^2\langle u^2\rangle$ comes from
Let an atom vibrate isotropically about a mean position, with displacements Gaussian of variance $\langle u^2\rangle/3$ along each axis. The scattering from a smeared atom is $f_0$ times the Fourier transform of that distribution, and in one dimension the transform of a Gaussian of variance $\sigma^2$ is $\exp(-2\pi^2\sigma^2 s^2)$ with $s = 2\sin\theta/\lambda = 1/d$. The three equal components give an exponent $-2\pi^2\langle u^2\rangle s^2$; comparing with the conventional $\exp(-Bs^2/4)$ of [[#eq-debye]] gives $B/4 = 2\pi^2\langle u^2\rangle$, which is [[#eq-bfac]]. The derivation assumes harmonic isotropic motion; real side chains hop between rotamers, so a high B factor often reports a model fitted to a superposition of conformations rather than a vibration.
:::

::: example Reading B factors in a binding site {#ex-bfactor}
In a $1.9\ \text{Å}$ structure of an enzyme–inhibitor complex, the atoms of the inhibitor's aromatic core have $B \approx 20\ \text{Å}^2$, the oxygen of a bound water bridging the ligand and a backbone amide has $B \approx 40\ \text{Å}^2$, and the terminal carbons of a solvent-exposed morpholine on the inhibitor have $B \approx 80\ \text{Å}^2$. Convert each to a root-mean-square displacement and say which structural conclusions the map supports.
::: solution
By [[#eq-bfac]], $u_\mathrm{rms} = \sqrt{B/8\pi^2}$: for $B = 20\ \text{Å}^2$, $u_\mathrm{rms} = \sqrt{20/78.96} = 0.50\ \text{Å}$; for $40\ \text{Å}^2$, $0.71\ \text{Å}$; for $80\ \text{Å}^2$, $1.01\ \text{Å}$.

A carbon–carbon bond is $1.5\ \text{Å}$ long and a good hydrogen bond $2.8$–$3.0\ \text{Å}$ between heavy atoms. The aromatic core is therefore placed well enough to design a substituent reaching a particular pocket; the bridging water is probably real, but no claim about its hydrogen-bond geometry to better than a few tenths of an ångström is supported; and the morpholine carbons, uncertain to two-thirds of a bond length, are tumbling in solvent, so designing an interaction for them is designing against noise.
:::
:::

**Cryo-electron microscopy** has, since about 2014, extended structural biology to targets that do not crystallise: large complexes, membrane receptors in lipid environments, ion channels with their subunits. Hundreds of thousands of noisy images of single particles frozen in vitreous ice are classified and averaged into a map. Resolutions of $2.5$–$3.5\ \text{Å}$ are common, but cryo-EM resolution is strongly **local**: a map may be $2.8\ \text{Å}$ in a receptor's rigid core and $4.5\ \text{Å}$ at the loops around its ligand site. Look at the local resolution in the pocket, not the headline number.

**Computed models** are the third source. AlphaFold2 (John Jumper and colleagues, 2021) predicts a fold from sequence, usually with the accuracy of a low-resolution experimental structure, and reports a per-residue confidence, pLDDT. It has not replaced crystallography for design: the model is apo and single-conformation, so the pocket's side chains are not arranged as a ligand would induce, its low-pLDDT loops are the mobile parts that line most sites, and it contains no waters, ions, cofactor or ligand. Such models start docking campaigns; the compound that goes forward is still crystallised with its target where possible.

::: warning A structure is a model, and it has no hydrogens {#warn-structure}
Four misreadings waste more synthesis than any other error in structure-based design.

1. **Protonation states are not observed.** At almost all resolutions there is no density for hydrogen, so whether a histidine is protonated, which tautomer it adopts and whether a ligand amine is cationic in the pocket are *inferences* from geometry and $\mathrm{p}K_\mathrm{a}$ calculations. Docking programs must be told, often get it wrong, and are then wrong by tens of kilojoules per mole.
2. **Water molecules are part of the design problem.** A ligand displacing a water that made two good hydrogen bonds must replace them; one displacing a poorly coordinated water gains entropy. Which is which cannot be decided from the picture.
3. **The crystal is not the cell.** Buffers and cryoprotectants are occasionally mistaken for ligands, and crystal contacts can hold a loop, or a pocket, in a non-physiological position.
4. **One structure is one conformation.** Cryptic pockets absent from every apo structure open when a ligand binds: a structure is a snapshot of an ensemble, while binding is a free energy over it ([[medicinal-chemistry/drug-binding#eq-dg]]).
:::

::: widget plot
f: sqrt(x/(8*pi^2))
x: 0, 100
y: 0, 1.2
hlines: 0.5, 1.0
points: 20,0.5; 40,0.71; 80,1.01
labels: u_\mathrm{rms}/\text{Å}
caption: Root-mean-square atomic displacement $u_\mathrm{rms} = \sqrt{B/8\pi^2}$ against the B factor, from [[#eq-bfac]]; the marked points are the three atom classes of [[#ex-bfactor]]. The guide line at $0.5\ \text{Å}$ is about a third of a C–C bond, the one at $1.0\ \text{Å}$ the point where coordinates stop carrying design information. The square root is steep at small $B$ and flat at large $B$, so the difference between $B = 10$ and $30\ \text{Å}^2$ matters far more than that between $70$ and $90\ \text{Å}^2$.
:::

## Docking and scoring

Before anything is docked the site is characterised: its pockets measured (drug sites are typically buried, mostly apolar and $200$–$600\ \text{Å}^3$ in volume), its subsites numbered after the substrate residues they accept ($\mathrm{S1}$, $\mathrm{S1}'$, $\mathrm{S2}$ … for a protease), its "hot spots" mapped with a probe by Peter Goodford's GRID method (1985), its bound waters ranked by the free energy their displacement would cost ([[computational-chemistry/molecular-dynamics]]), its ionisable residues assigned $\mathrm{p}K_\mathrm{a}$ values, and its shape compared with the proteome to anticipate selectivity problems. Two kinds of flexibility matter: **induced fit**, in which side chains and loops move to accommodate the ligand, and **conformational selection**, in which the ligand binds a rare conformation the protein already visits — the neuraminidase and kinase campaigns below illustrate each.

::: algorithm Docking a molecule into a site {#algo-docking}
1. **Prepare the protein.** Choose the structure, add hydrogens in chosen protonation and tautomer states, assign charges and a force field ([[computational-chemistry/molecular-mechanics]]), decide which waters to keep, and define the site.
2. **Prepare the ligands.** Enumerate tautomers, protonation states at the assay pH and stereoisomers; generate conformers; assign charges.
3. **Search.** Explore position, orientation and torsions — six rigid-body degrees of freedom plus one per rotatable bond — by incremental construction in the site, a genetic algorithm, Monte Carlo or feature matching to hot spots.
4. **Score each pose** with a fast approximate function ([[#prop-score]]), keeping the best per ligand.
5. **Rescore and filter.** Re-evaluate with a slower function, check each pose by eye against the chemistry you believe, and drop compounds with unwanted properties.
6. **Decide and test.** Buy or make a few hundred top-ranked compounds and assay them.
:::

Steps 3 and 4 are different problems and fail differently. The search problem — *can the program reproduce the crystallographic pose?* — is largely solved for rigid receptors: good programs reproduce the experimental pose to within $2\ \text{Å}$ root-mean-square deviation in 60–80 % of test cases. The scoring problem — *how strongly does it bind?* — is not solved at all.

::: proposition Empirical scoring functions as approximate binding free energies {#prop-score}
An **empirical scoring function** approximates the standard binding free energy as a weighted sum of structural terms counted from a single pose,
$$
\Delta_\mathrm{b}G^\circ \approx \Delta G_0 + \Delta G_\mathrm{hb}\sum_{\text{H-bonds}} f(\Delta r, \Delta\alpha) + \Delta G_\mathrm{ion}\sum_{\text{ion pairs}} f(\Delta r,\Delta\alpha) + \Delta G_\mathrm{lipo}A_\mathrm{lipo} + \Delta G_\mathrm{rot}N_\mathrm{rot},
$$ {#eq-score}
where $A_\mathrm{lipo}$ is the apolar contact area, $N_\mathrm{rot}$ the number of rotatable bonds frozen, $f$ a penalty for deviations from ideal hydrogen-bond geometry, and the coefficients are **fitted by regression to complexes of known structure and affinity**. Hans-Joachim Böhm's 1994 function, the first of the family, obtained $\Delta G_0 = +5.4$, $\Delta G_\mathrm{hb} = -4.7$, $\Delta G_\mathrm{ion} = -8.3$, $\Delta G_\mathrm{rot} = +1.4\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G_\mathrm{lipo} = -0.17\ \mathrm{kJ\,mol^{-1}}\,\text{Å}^{-2}$. Being empirical and additive, such a function estimates affinity only for complexes resembling its training set, and its errors are systematic, not random.
:::

::: proof Why the form is plausible, and why it cannot be exact
Binding free energy is a difference between two *ensembles*, the complex and the separated partners, each averaged over all configurations and over solvent. Three approximations turn that into [[#eq-score]].

First, replace the ensemble average by its value at the most probable configuration — the docked pose — discarding the configurational entropy of both states except for the crude version restored by the $N_\mathrm{rot}$ term. Second, assume **additivity**, a sum of independent group contributions: reasonable for pairwise enthalpic forces, but desolvation is cooperative (removing one water changes the cost of removing its neighbour) and the entropy of the complex is not a sum over groups at all, so additivity is an assumption about cancellation, not a theorem. Third, absorb everything not counted — the ligand's lost translational and rotational entropy, the average cost of desolvating polar groups, the standard-state term — into $\Delta G_0$, the positive "price of admission", treated as the same for every complex. Fitting the coefficients by least squares makes the function an interpolation device. Each approximation is worth several kilojoules per mole, while a factor of ten in $K_\mathrm{d}$ is only $5.7\ \mathrm{kJ\,mol^{-1}}$ ([[medicinal-chemistry/drug-binding#eq-dg]]) — hence the observed limit of about one order of magnitude in affinity.
:::

::: example Scoring a pose, and the lipophilic trap {#ex-score}
Using Böhm's coefficients, score a pose making 2 ideal neutral hydrogen bonds ($f = 1$) and 1 ideal ion pair, burying $200\ \text{Å}^2$ of apolar surface and freezing 5 rotatable bonds, and convert the score to a predicted $K_\mathrm{d}$ at $298\ \mathrm{K}$. Then repeat for a larger analogue burying $350\ \text{Å}^2$ with the same polar contacts.
::: solution
From [[#eq-score]]:
$$
\Delta_\mathrm{b}G^\circ \approx 5.4 + 2(-4.7) + 1(-8.3) + (-0.17)(200) + 1.4(5) = 5.4 - 9.4 - 8.3 - 34.0 + 7.0 = -39.3\ \mathrm{kJ\,mol^{-1}}.
$$
Then $\mathrm{p}K_\mathrm{d} = -\Delta_\mathrm{b}G^\circ/(RT\ln 10) = 39.3/5.708 = 6.89$, so $K_\mathrm{d} \approx 130\ \mathrm{nmol\,dm^{-3}}$ — a plausible lead.

Larger analogue: the lipophilic term becomes $-59.5\ \mathrm{kJ\,mol^{-1}}$ and the total $-64.8\ \mathrm{kJ\,mol^{-1}}$, giving $\mathrm{p}K_\mathrm{d} = 11.35$, $K_\mathrm{d} \approx 4\ \mathrm{pmol\,dm^{-3}}$. The function has rewarded $150\ \text{Å}^2$ of extra greasy contact with four orders of magnitude of affinity, with no penalty for solubility, lipophilicity or conformational cost. This is the characteristic failure of additive scoring — **a bias towards large, lipophilic compounds** — because apolar area is the one term that grows without limit. Hit lists must be filtered on size, $\log P$ and ligand efficiency ([[medicinal-chemistry/hits-and-leads#def-le]]) before anything is bought.
:::
:::

Three families are in use, with different weaknesses, which is why they are often combined ("consensus scoring"): **force-field** functions, summing molecular-mechanics energies plus desolvation; **empirical** functions, the regression-fitted sums of [[#eq-score]]; and **knowledge-based** functions, which turn atom-pair distance frequencies in the Protein Data Bank into statistical potentials $w(r) = -k_\mathrm{B}T\ln[g(r)/g_\mathrm{ref}(r)]$.

::: widget regression
points: 4.2,5.4; 5.0,6.9; 5.3,5.1; 6.1,7.8; 6.4,6.0; 7.0,8.2; 7.3,6.6; 7.9,7.2; 8.4,9.3; 9.1,8.0
degree: 1
x: 3.5, 10
y: 3.5, 10
caption: Typical performance of a scoring function: predicted $\mathrm{p}K_\mathrm{d}$ (vertical) against measured (horizontal) for ten complexes of one target. The least-squares slope is $0.60$, well below the ideal $1$; $r^2 = 0.51$ and the root-mean-square error is $1.12$ log units, that is $6.4\ \mathrm{kJ\,mol^{-1}}$. The rank correlation is $0.67$: the function sorts strong from weak binders but misplaces neighbours. Drag the two most potent points down and watch $r^2$ collapse: one wrongly protonated ligand can do that to a real data set.
:::

A scoring function that is poor at predicting affinity may still be very useful for **enrichment**: pulling actives towards the top of a ranked list. A docking run over 200,000 compounds containing 100 actives that places 35 of them in the top 2,000 has $\mathrm{EF}_{0.01} = 35$ — a hit rate of 1.75 % against a background of 0.05 % — while missing 65 % of the actives.

::: definition Enrichment factor and its meaning {#def-ef}
For a library of $N$ compounds containing $n$ actives, suppose that testing the top-ranked fraction $x$ (that is, $xN$ compounds) yields $h$ actives. The **enrichment factor** at that fraction is
$$
\mathrm{EF}_x = \frac{h/(xN)}{n/N} = \frac{h}{x\,n},
$$ {#eq-ef}
the ratio of the hit rate in the selected set to that of random selection: $\mathrm{EF}_x = 1$ means a worthless ranking and $1/x$ is the maximum. Enrichment factors depend on $x$ and on the library's composition, so they compare only methods tested on the same set.
:::

### Computing the free energy properly

When a few kilojoules per mole must be predicted rather than guessed, the method of choice is a **free-energy calculation** on a thermodynamic cycle: not an absolute binding free energy, but the *difference* between two similar ligands, obtained by alchemically mutating one into the other in water and in the site.

::: proposition Relative binding free energy from a thermodynamic cycle {#prop-fep}
Let ligands 1 and 2 bind the same protein with standard binding free energies $\Delta_\mathrm{b}G^\circ_1$ and $\Delta_\mathrm{b}G^\circ_2$, and let $\Delta G_\mathrm{mut}^\mathrm{free}$ and $\Delta G_\mathrm{mut}^\mathrm{bound}$ be the free energies of the unphysical transformation of 1 into 2 in bulk solvent and in the complex. Since free energy is a state function and the four processes close a cycle,
$$
\Delta\Delta G = \Delta_\mathrm{b}G^\circ_2 - \Delta_\mathrm{b}G^\circ_1 = \Delta G_\mathrm{mut}^\mathrm{bound} - \Delta G_\mathrm{mut}^\mathrm{free}, \qquad \frac{K_{\mathrm{d},2}}{K_{\mathrm{d},1}} = \exp\!\left(\frac{\Delta\Delta G}{RT}\right).
$$ {#eq-fep}
The right-hand side involves only transformations of the ligand in a fixed environment, computable by free-energy perturbation or thermodynamic integration from molecular dynamics ([[computational-chemistry/free-energy-sampling]]). Accuracies of $4$–$6\ \mathrm{kJ\,mol^{-1}}$ are achievable within a congeneric series of known binding mode, given a good force field and converged sampling.
:::

::: proof
Two paths lead from (ligand 1 free) to (ligand 2 bound): bind 1 and mutate it in the site, giving $\Delta_\mathrm{b}G^\circ_1 + \Delta G_\mathrm{mut}^\mathrm{bound}$; or mutate 1 to 2 in solution and then bind, giving $\Delta G_\mathrm{mut}^\mathrm{free} + \Delta_\mathrm{b}G^\circ_2$. Since $G$ is a state function the two sums are equal, and rearranging gives the first part of [[#eq-fep]]. The second part is [[medicinal-chemistry/drug-binding#eq-dg]] applied to each ligand and subtracted: $\Delta\Delta G = RT\ln(K_{\mathrm{d},2}/K_{\mathrm{d},1})$. The standard-state terms and the protein's own solvation free energy appear in both paths and cancel, which is why the cycle is worth constructing.
:::

::: example A free-energy perturbation prediction {#ex-fep}
A lead binds with $K_\mathrm{d} = 50\ \mathrm{nmol\,dm^{-3}}$. A proposed analogue replaces one aromatic hydrogen by a chlorine, pointing into a small apolar cleft. Simulations of the H → Cl mutation give $\Delta G_\mathrm{mut}^\mathrm{bound} = -25.0\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G_\mathrm{mut}^\mathrm{free} = -17.5\ \mathrm{kJ\,mol^{-1}}$, each with a statistical uncertainty of $\pm 1.5\ \mathrm{kJ\,mol^{-1}}$. Predict $K_\mathrm{d}$ for the analogue at $298\ \mathrm{K}$, with an uncertainty, and say what the result does and does not justify.
::: solution
By [[#eq-fep]], $\Delta\Delta G = -25.0 + 17.5 = -7.5\ \mathrm{kJ\,mol^{-1}}$, with uncertainty $\sqrt{1.5^2 + 1.5^2} = 2.1\ \mathrm{kJ\,mol^{-1}}$ for independent legs. The affinity ratio is
$$
\frac{K_{\mathrm{d},2}}{K_{\mathrm{d},1}} = \exp\!\left(\frac{-7500}{8.314\times298.15}\right) = \exp(-3.03) = 0.0486 = \frac{1}{20.6},
$$
so $K_{\mathrm{d},2} = 50/20.6 = 2.4\ \mathrm{nmol\,dm^{-3}}$. The $\pm 2.1\ \mathrm{kJ\,mol^{-1}}$ is a factor $\exp(2100/2478) = 2.3$, so the honest prediction is $1$–$6\ \mathrm{nmol\,dm^{-3}}$: roughly 20-fold better, certainly better.

The result assumes the same binding mode, a force field that describes a C–Cl group in an apolar cleft, and converged sampling — the quoted $\pm1.5$ is a precision, not an accuracy.
:::
:::

::: quiz Why compute a cycle?
Free-energy perturbation calculations usually give *relative* binding free energies of two similar ligands rather than the absolute affinity of one. Why?

- [x] The protein's solvation and standard-state contributions cancel between the legs of the cycle, so the quantity computed is smaller and better converged.
- [ ] Because absolute binding free energies are not thermodynamically well defined.
- [ ] Because $K_\mathrm{d}$ cannot be measured absolutely in experiment either.
- [x] Only the atoms that change need thorough sampling, so a short simulation of a small perturbation suffices.
::: solution
The first and fourth are right, and are one point from two sides: in [[#prop-fep]] everything common to the two ligands — the protein, its hydration shell, the bulk solvent, the standard state — contributes equally to both legs and cancels, leaving a small difference that a short simulation can converge. An absolute calculation must treat the whole transfer of a ligand from water into the site; such methods exist but converge far less easily. Absolute binding free energies are well defined once a standard state is chosen, and $K_\mathrm{d}$ is measured absolutely every day by calorimetry.
:::
:::

## Growing fragments on a structure

Structure-based design and fragment-based discovery are natural partners: a fragment binding at $1\ \mathrm{mmol\,dm^{-3}}$ tells you almost nothing from its affinity and almost everything from its crystal structure. The strategy — soak crystals in fragment cocktails, solve the structures, grow the fragments that sit in hot spots towards adjacent subsites — was set out by Philip Hajduk and Jeffrey Greer in their 2007 review of fragment-based drug discovery, and the efficiency arithmetic of [[medicinal-chemistry/hits-and-leads#def-le]], applied to the atoms just added, keeps it honest.

::: definition Group efficiency {#def-ge}
When a ligand A is grown into a ligand A–X by the addition of a group X of $\Delta N$ heavy atoms, the **group efficiency** of X is the binding free energy it contributes per added atom,
$$
\mathrm{GE}(X) = \frac{-\bigl(\Delta_\mathrm{b}G^\circ_{\mathrm{A-X}} - \Delta_\mathrm{b}G^\circ_{\mathrm{A}}\bigr)}{\Delta N} = \frac{RT\ln 10\,\bigl(\mathrm{p}K_{\mathrm{d},\mathrm{A-X}} - \mathrm{p}K_{\mathrm{d},\mathrm{A}}\bigr)}{\Delta N} \approx \frac{5.71\,\Delta\mathrm{p}K_\mathrm{d}}{\Delta N}\ \mathrm{kJ\,mol^{-1}}\ (298\ \mathrm{K}).
$$ {#eq-ge}
It is the local slope of binding free energy against heavy-atom count, so a growth step is worth keeping if $\mathrm{GE}$ is at least as large as the current $\mathrm{LE}$.
:::

::: proof The relation between group efficiency and ligand efficiency
Write $G(N)$ for the (negative) binding free energy of a compound with $N$ heavy atoms, so $\mathrm{LE}(N) = -G(N)/N$. Using $-G(N+\Delta N) = -G(N) + \mathrm{GE}\,\Delta N$ from [[#eq-ge]],
$$
\mathrm{LE}(N+\Delta N) = \frac{N\,\mathrm{LE}(N) + \Delta N\,\mathrm{GE}}{N + \Delta N},
$$
a weighted mean of the old efficiency and the group efficiency of the addition. So $\mathrm{LE}$ rises if $\mathrm{GE} > \mathrm{LE}$ and falls if $\mathrm{GE} < \mathrm{LE}$; in the continuum limit $\mathrm{d}\,\mathrm{LE}/\mathrm{d}N = (\mathrm{GE} - \mathrm{LE})/N$, an average moving towards the marginal value. The useful question during optimisation is therefore never "is the new compound more potent?" — adding atoms almost always adds some potency — but "did these atoms earn their keep?"
:::

::: example Growing a fragment, atom by atom {#ex-ge}
A fragment of 13 heavy atoms binds an enzyme with $K_\mathrm{d} = 100\ \mu\mathrm{mol\,dm^{-3}}$, and its structure shows an unoccupied apolar pocket $4\ \text{Å}$ from one ring position. Growing an eight-atom substituent into that pocket gives $K_\mathrm{d} = 0.32\ \mu\mathrm{mol\,dm^{-3}}$. Calculate the ligand efficiency before and after and the group efficiency of the addition, in $\mathrm{kJ\,mol^{-1}}$ and $\mathrm{kcal\,mol^{-1}}$ per heavy atom, and judge the step.
::: solution
Fragment: $\mathrm{p}K_\mathrm{d} = 4.00$, so $-\Delta_\mathrm{b}G^\circ = 5.708 \times 4.00 = 22.8\ \mathrm{kJ\,mol^{-1}}$ and $\mathrm{LE} = 22.8/13 = 1.76\ \mathrm{kJ\,mol^{-1}} = 0.42\ \mathrm{kcal\,mol^{-1}}$ per atom. Grown compound: $\mathrm{p}K_\mathrm{d} = 6.50$, $-\Delta_\mathrm{b}G^\circ = 37.1\ \mathrm{kJ\,mol^{-1}}$ over $N_\mathrm{HA} = 21$, so $\mathrm{LE} = 1.77\ \mathrm{kJ\,mol^{-1}} = 0.42\ \mathrm{kcal\,mol^{-1}}$ per atom. Group efficiency, from [[#eq-ge]]: $\mathrm{GE} = 5.708(6.50 - 4.00)/8 = 1.78\ \mathrm{kJ\,mol^{-1}} = 0.43\ \mathrm{kcal\,mol^{-1}}$ per atom.

The step gained 2.5 log units — a factor of 320 — and the ligand efficiency is unchanged, as [[#eq-ge]] requires when $\mathrm{GE} \approx \mathrm{LE}$. Every added atom paid its way, which happens only when the new group is pre-organised to fill a real pocket: the same gain reached by a flexible chain of fourteen atoms would give $\mathrm{GE} = 1.02\ \mathrm{kJ\,mol^{-1}}$ per atom and pull the average down.
:::
:::

**Vemurafenib** is the textbook case. Plexxikon screened about 20,000 small, simple compounds against a panel of kinases at high concentration, with crystallography as the read-out, and found that 7-azaindole bound the ATP site of several kinases with millimolar affinity but high ligand efficiency, its two ring nitrogens making the hinge hydrogen bonds that the adenine of ATP makes. Structures of the fragment in several kinases guided the growth: a 3-substituted difluorophenylsulfonamide reached a pocket next to the DFG motif, and further elaboration gave nanomolar potency against the V600E mutant of BRAF, which drives about half of melanomas. Approved in 2011, about six years after the fragment hit, it was the first drug from a fragment-based campaign — and two features of the story are general: the screen was read by structure, not potency, and selectivity was *designed in* at the growth step.

## Four campaigns

### Captopril, designed without a structure of the target

Angiotensin-converting enzyme (ACE) raises blood pressure by converting angiotensin I into angiotensin II. In the early 1970s David Cushman and Miguel Ondetti at Squibb set out to inhibit it, starting from bradykinin-potentiating peptides in snake venom. No structure of ACE existed — it was solved only in 2003. What they had was a **model**: ACE is a zinc-dependent carboxypeptidase, and William Lipscomb's structure of bovine carboxypeptidase A showed the catalytic zinc, the arginine binding the substrate's terminal carboxylate and a hydrophobic $\mathrm{S1}'$ pocket. Byers and Wolfenden had shown that benzylsuccinic acid inhibits that enzyme as a "by-product analogue", one carboxylate on the zinc and the other on the arginine.

Cushman and Ondetti transferred the idea, assuming ACE's site to be the same with one extra residue of reach, since ACE cleaves a dipeptide. Succinyl-L-proline inhibited ACE with $\mathrm{IC_{50}} \approx 330\ \mu\mathrm{mol\,dm^{-3}}$; a methyl group mimicking the substrate's penultimate side chain gave $22\ \mu\mathrm{mol\,dm^{-3}}$. Then the decisive step: replace the zinc-coordinating carboxylate by a thiol, a far better ligand for Zn(II) ([[coordination-chemistry/bioinorganic]]). The result, D-3-mercapto-2-methylpropanoyl-L-proline — captopril — inhibited ACE with $\mathrm{IC_{50}} \approx 23\ \mathrm{nmol\,dm^{-3}}$; the design was published in *Biochemistry* in 1977 and the drug approved in 1981 as the first ACE inhibitor. The campaign bought $23.7\ \mathrm{kJ\,mol^{-1}}$ of binding free energy — $6.7$ from the methyl and $17.0$ from the thiol, additive because they fill independent subsites, as the exercises work out — on a *model* built from a homologue. Structure-based design does not require the structure of the target, but a correct hypothesis about the site.

### HIV protease: structure-based design at speed

HIV-1 protease cleaves the viral Gag and Gag-Pol polyproteins; without it, virions are immature and non-infectious. It is a homodimer of 99-residue subunits with a $C_2$-symmetric active site, two catalytic aspartates (Asp25 from each subunit) sharing a proton, and flexible "flaps" that close over a ligand. Crystal structures appeared in 1989 and the first inhibitors reached patients within six years.

The strategy was **transition-state isosterism** ([[medicinal-chemistry/drug-targets]]). Hydrolysis by an aspartic protease goes through a tetrahedral intermediate formed by addition of an aspartate-activated water to the scissile carbonyl; replace that amide in a substrate-derived peptide by a non-hydrolysable tetrahedral group bearing a hydroxyl, and the inhibitor captures part of the enzyme's affinity for its transition state. The groups used were the **hydroxyethylamine** and **hydroxyethylene** isosteres, $\mathrm{{-}CH(OH){-}CH_2{-}NH{-}}$ and $\mathrm{{-}CH(OH){-}CH_2{-}CH_2{-}}$ in place of $\mathrm{{-}C(O){-}NH{-}}$, whose hydroxyl sits between the two aspartate carboxylates.

Saquinavir (Roche, 1995, the first of the class) is a hydroxyethylamine designed on this principle, with a decahydroisoquinoline carboxamide chosen by modelling to present a rigid hydrophobic surface to the $\mathrm{S1}'$ pocket. Two further ideas run through the class: the flaps hydrogen bond to the inhibitor through one tightly held **structural water**, whose displacement by a carbonyl oxygen gave the cyclic ureas, and the site's $C_2$ symmetry invited symmetric inhibitors such as ritonavir.

Two lessons. Peptidomimetics inherit peptide-like properties — high molar mass, many donors, poor absorption, fast metabolism — so potency designed on a structure must still be reconciled with [[medicinal-chemistry/pharmacokinetics#def-ro5]]; ritonavir's use as a *booster* is a pharmacokinetic fix for a design-led problem. And resistance answers the designed contacts, so inhibitors are now made to touch invariant backbone atoms (as darunavir's bis-tetrahydrofuran group does) and to stay within the "substrate envelope" that natural substrates occupy, so that a mutation disrupting the inhibitor disrupts the substrate too.

### Neuraminidase: zanamivir and oseltamivir

Influenza neuraminidase cleaves the bond between a terminal sialic acid ($N$-acetylneuraminic acid) and the rest of a cell-surface glycan, letting new virions escape. Peter Colman's group in Melbourne solved its structure in 1983; the reaction passes through an oxocarbenium-like transition state with the sugar ring flattened at C2, and the analogue DANA (2-deoxy-2,3-didehydro-Neu5Ac) has that geometry and inhibits in the micromolar range.

Mark von Itzstein, Colman, Graeme Laver and colleagues used the structure to improve on DANA, in a design published in *Nature* in 1993. GRID-type analysis showed a pocket next to the bound sugar's C4 position containing two conserved glutamates (Glu119 and Glu227). Replacing DANA's C4 hydroxyl by an amino group gave about a hundredfold gain; replacing it by a **guanidino** group — planar, with a delocalised positive charge and several donors matched to that carboxylate pair — gave a nanomolar inhibitor, zanamivir, approved in 1999. A zwitterionic polyol is not orally absorbed, so zanamivir is inhaled.

Oseltamivir addressed that: the sugar ring became a cyclohexene with the same substituents in the same geometry, the glycerol side chain a 3-pentyloxy group — which requires an induced fit found by crystallography during the project, Glu276 rotating into a salt bridge with Arg224 and so opening a hydrophobic pocket — and the carboxylate was masked as its ethyl ester, a **prodrug** hydrolysed by liver esterases. The result is orally active: structure-based design optimises affinity, and affinity is only one of the properties a medicine needs.

### Imatinib and the DFG-out conformation

All 500-odd human kinases share a bilobal fold with the ATP site between the lobes, so designing a selective inhibitor for one of them, against millimolar cellular ATP ([[medicinal-chemistry/drug-targets#eq-cheng]]), looked hopeless in 1990.

Imatinib, developed at Ciba-Geigy/Novartis from a phenylaminopyrimidine lead by Nicholas Lydon, Jürg Zimmermann, Brian Druker and colleagues, inhibits the fusion kinase BCR-ABL that causes chronic myeloid leukaemia; it was approved in 2001, and the complex solved by John Kuriyan's group in 2000 explained its selectivity. A kinase activation loop begins with a conserved Asp-Phe-Gly ("DFG") motif: in the active "DFG-in" conformation the aspartate coordinates $\mathrm{Mg^{2+}}$ in the ATP site; in the inactive "DFG-out" conformation the loop flips, the phenylalanine moving into the ATP site and the aspartate out, which **opens an allosteric pocket** beside it. Imatinib binds the DFG-out form, its pyridine and aminopyrimidine making the hinge hydrogen bonds in the adenine region, its amide reaching into the newly opened pocket and its *N*-methylpiperazine into solvent. Because kinases differ in how readily they adopt DFG-out and in the pocket it opens, an inhibitor designed for that conformation can be far more selective than one competing only for the adenine site — hence the classification of inhibitors as **type I** (DFG-in), **type II** (DFG-out) and **type III** (allosteric).

Resistance followed, by mutation of the "gatekeeper" threonine (T315I in ABL); the later inhibitors were designed on those structures, ponatinib replacing the amide with a carbon–carbon triple bond slim enough to pass the bulkier isoleucine. The class continues in [[medicinal-chemistry/drug-case-studies]].

::: history Six steps from a cleft to a medicine {#hist-sbdd}
- **1976** — Christopher Beddell, Peter Goodford and colleagues design substituted benzaldehydes for the central cavity of haemoglobin: the first ligands designed from a protein structure.
- **1977** — David Cushman and Miguel Ondetti publish the design of captopril in *Biochemistry*, reasoning from carboxypeptidase A and Byers and Wolfenden's by-product analogues.
- **1982–1985** — Irwin Kuntz and colleagues publish DOCK, the first automated docking program, and Peter Goodford publishes GRID.
- **1989** — Crystal structures of HIV-1 protease are reported by Manuel Navia and colleagues at Merck and by Alexander Wlodawer's group; saquinavir follows in 1995.
- **1993** — Mark von Itzstein, Peter Colman, Graeme Laver and colleagues report in *Nature* the design of the 4-guanidino DANA analogue, zanamivir, from the neuraminidase structure; approved 1999.
- **2007** — Philip Hajduk and Jeffrey Greer review the first decade of fragment-based discovery; vemurafenib, grown from a 7-azaindole fragment, follows in 2011, and AlphaFold2 (John Jumper and colleagues) in 2021.
:::

## Where this leads

Structure-based design is one input among several. Its pose rankings feed the triage of [[medicinal-chemistry/hits-and-leads]], its growth proposals are tested by the methods of [[medicinal-chemistry/structure-activity]], and its free energies rest on the force fields and sampling of [[computational-chemistry/molecular-mechanics]], [[computational-chemistry/molecular-dynamics]] and [[computational-chemistry/free-energy-sampling]], its electrostatics on [[computational-chemistry/solvation-qmmm]]. The campaigns continue in [[medicinal-chemistry/drug-case-studies]]; targets no small molecule can reach pass to [[medicinal-chemistry/biologics]]. Behind the structures are diffraction ([[materials-chemistry/diffraction]]) and NMR ([[spectroscopy/nmr-structure]]).

::: summary Key takeaways
- A structure is a model fitted to data: judge it by resolution, $R_\mathrm{free}$ and, atom by atom, by its B factors, since $u_\mathrm{rms} = \sqrt{B/8\pi^2}$ reaches a full ångström by $B = 80\ \text{Å}^2$ ([[#def-bfactor]]). Hydrogens, protonation states and water free energies are inferred, never observed.
- Cryo-EM extends design to non-crystallising targets but has local resolution, and AlphaFold models are apo, single-conformation and ligand-free.
- Docking separates into a search problem, largely solved for rigid sites, and a scoring problem that is not: additive empirical functions ([[#prop-score]]) reach about one order of magnitude in affinity and favour large lipophilic molecules.
- Scoring is still useful for enrichment: $\mathrm{EF}_x = h/(xn)$ ([[#def-ef]]) of 20–50 at the top 1 % turns a library into a shortlist, while saying little about what it ranks low. Docking chooses what to test; it does not replace testing.
- For a few kilojoules per mole, compute a difference: the cycle of [[#prop-fep]] cancels the protein's solvation and the standard state, giving relative free energies to $4$–$6\ \mathrm{kJ\,mol^{-1}}$.
- Audit fragment growth by group efficiency, $\mathrm{GE} = 5.71\,\Delta\mathrm{p}K_\mathrm{d}/\Delta N\ \mathrm{kJ\,mol^{-1}}$ ([[#def-ge]]): ligand efficiency rises only when $\mathrm{GE}$ exceeds it, as while vemurafenib grew from a 7-azaindole fragment.
- What structures bought: a zinc-ligating thiol worth $17\ \mathrm{kJ\,mol^{-1}}$ in captopril, transition-state isosteres against HIV protease, a guanidino group matched to two glutamates in zanamivir, DFG-out selectivity in imatinib — while zanamivir's inhalation, oseltamivir's prodrug ester and ritonavir's boosting all recall that affinity is only affinity.
:::

## Exercises

::: exercise Reading a B factor {level=1 check="0.87"}
An atom in a refined structure has $B = 60\ \text{Å}^2$. Calculate its root-mean-square displacement. (Enter $u_\mathrm{rms}$ in Å to two significant figures.)
::: solution
By [[#eq-bfac]], $u_\mathrm{rms} = \sqrt{60/78.96} = 0.87\ \text{Å}$, more than half a carbon–carbon bond length: the position is not reliable enough to design a specific interaction against, and the electron density there should be inspected before it is used at all.
:::
:::

::: exercise Ligand efficiency of a docking hit {level=1 check="1.9"}
A virtual-screening hit of 18 heavy atoms is measured at $K_\mathrm{d} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$. Calculate its ligand efficiency at $298\ \mathrm{K}$. (Enter LE in $\mathrm{kJ\,mol^{-1}}$ per heavy atom to two significant figures.)
::: solution
$\mathrm{p}K_\mathrm{d} = 6.00$, so $-\Delta_\mathrm{b}G^\circ = 34.2\ \mathrm{kJ\,mol^{-1}}$ and $\mathrm{LE} = 34.2/18 = 1.9\ \mathrm{kJ\,mol^{-1}}$ per atom, equivalently $0.45\ \mathrm{kcal\,mol^{-1}}$ per atom — comfortably above the conventional threshold of $0.3$ ([[medicinal-chemistry/hits-and-leads#def-le]]), so there is room to grow to drug size.
:::
:::

::: exercise Scoring a pose {level=1 check="5.9"}
Using Böhm's coefficients from [[#prop-score]] ($\Delta G_0 = +5.4$, $\Delta G_\mathrm{hb} = -4.7$, $\Delta G_\mathrm{ion} = -8.3$, $\Delta G_\mathrm{rot} = +1.4\ \mathrm{kJ\,mol^{-1}}$, $\Delta G_\mathrm{lipo} = -0.17\ \mathrm{kJ\,mol^{-1}}\,\text{Å}^{-2}$), score a pose making 3 ideal neutral hydrogen bonds, no ion pairs, burying $180\ \text{Å}^2$ of apolar surface and freezing 4 rotatable bonds, and convert the score to a predicted $\mathrm{p}K_\mathrm{d}$ at $298\ \mathrm{K}$. (Enter the predicted $\mathrm{p}K_\mathrm{d}$ to two significant figures.)
::: solution
$\Delta_\mathrm{b}G^\circ \approx 5.4 + 3(-4.7) + 0 + (-0.17)(180) + 1.4(4) = 5.4 - 14.1 - 30.6 + 5.6 = -33.7\ \mathrm{kJ\,mol^{-1}}$. Then $\mathrm{p}K_\mathrm{d} = 33.7/5.708 = 5.9$, i.e. $K_\mathrm{d} \approx 1\ \mu\mathrm{mol\,dm^{-3}}$ — given the typical $6\ \mathrm{kJ\,mol^{-1}}$ error, "micromolar to the nearest order of magnitude".
:::
:::

::: exercise Enrichment factor {level=2 check="48"}
A library of 500,000 compounds containing 250 known actives is docked; the top $0.50\ \%$ of the ranking is tested and 60 actives are found. Calculate the enrichment factor and the maximum attainable at this fraction. (Enter the enrichment factor.)
::: solution
$x = 0.0050$, so $xN = 2500$ compounds tested. The hit rate is $60/2500 = 2.4\ \%$ against a background $250/500000 = 0.050\ \%$. By [[#eq-ef]], $\mathrm{EF} = 60/(0.0050 \times 250) = 60/1.25 = 48$. The maximum at this fraction is $1/x = 200$, attained only if all 250 actives ranked in the top 2,500, so the ranking achieved about a quarter of perfection. Note that 190 actives were missed: the screen is a shortlist generator, not a classifier.
:::
:::

::: exercise A free-energy perturbation prediction {level=2 check="9.8"}
A lead has $K_\mathrm{d} = 120\ \mathrm{nmol\,dm^{-3}}$. For a proposed analogue, simulations give $\Delta G_\mathrm{mut}^\mathrm{bound} = -30.2\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G_\mathrm{mut}^\mathrm{free} = -24.0\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$. Predict the analogue's $K_\mathrm{d}$. (Enter $K_\mathrm{d}$ in $\mathrm{nmol\,dm^{-3}}$ to two significant figures.)
::: solution
By [[#eq-fep]], $\Delta\Delta G = -30.2 + 24.0 = -6.2\ \mathrm{kJ\,mol^{-1}}$, so $K_{\mathrm{d},2}/K_{\mathrm{d},1} = \exp(-6200/(8.314 \times 298.15)) = \exp(-2.501) = 1/12.2$. Hence $K_{\mathrm{d},2} = 120/12.2 = 9.8\ \mathrm{nmol\,dm^{-3}}$. The prediction is only as good as the assumption that the binding mode is unchanged; a crystal structure of the analogue is the check.
:::
:::

::: exercise From IC₅₀ to ligand efficiency {level=2 check="0.32"}
An inhibitor of 30 heavy atoms gives $\mathrm{IC_{50}} = 300\ \mathrm{nmol\,dm^{-3}}$ in a competitive assay run at $[\mathrm{S}] = 2K_\mathrm{M}$. Convert to $K_\mathrm{I}$ and calculate the ligand efficiency at $298\ \mathrm{K}$. (Enter LE in $\mathrm{kcal\,mol^{-1}}$ per heavy atom to two significant figures.)
::: solution
By the Cheng–Prusoff relation [[medicinal-chemistry/drug-targets#eq-cheng]], $K_\mathrm{I} = 300/(1 + 2) = 100\ \mathrm{nmol\,dm^{-3}}$, so $\mathrm{p}K_\mathrm{I} = 7.00$ and $\mathrm{LE} = 1.364 \times 7.00/30 = 0.32\ \mathrm{kcal\,mol^{-1}}$ per atom ($1.33\ \mathrm{kJ\,mol^{-1}}$). Using the raw $\mathrm{IC_{50}}$ would have given $0.30$: efficiency metrics inherit every assay artefact of the potency behind them.
:::
:::

::: exercise Was the linker any good? {level=3 check="1.1"}
Crystallography shows two fragments binding adjacent subsites, with $K_\mathrm{A} = 2.0\ \mathrm{mmol\,dm^{-3}}$ and $K_\mathrm{B} = 0.80\ \mathrm{mmol\,dm^{-3}}$. A linked molecule, in which a structure confirms that both fragments keep their original poses, binds with $K_\mathrm{AB} = 1.5\ \mu\mathrm{mol\,dm^{-3}}$. Calculate the effective molarity, find $\Delta G_\mathrm{link}$ at $298\ \mathrm{K}$, and say what the numbers imply about the linker. (Enter $E_\mathrm{M}$ in $\mathrm{mol\,dm^{-3}}$ to two significant figures.)
::: hint
Use [[medicinal-chemistry/hits-and-leads#eq-linking]]: $E_\mathrm{M} = K_\mathrm{A}K_\mathrm{B}/K_\mathrm{AB}$ and $E_\mathrm{M} = c^\circ\exp(-\Delta G_\mathrm{link}/RT)$.
:::
::: solution
$E_\mathrm{M} = (2.0\times10^{-3})(8.0\times10^{-4})/(1.5\times10^{-6}) = 1.1\ \mathrm{mol\,dm^{-3}}$, so $\Delta G_\mathrm{link} = -RT\ln(E_\mathrm{M}/c^\circ) = -0.16\ \mathrm{kJ\,mol^{-1}}$, essentially zero.

So this linker is close to ideal: it holds both fragments in their crystallographic poses without strain, and the thousandfold gain over the better fragment comes from paying the translational and rotational price once instead of twice. Values of $E_\mathrm{M}$ near $1\ \mathrm{mol\,dm^{-3}}$ are rare and require the linker's length, rigidity and exit vectors all to be right; one atom too short or one bond too flexible typically costs $5$–$15\ \mathrm{kJ\,mol^{-1}}$, and the structure then shows one fragment displaced from its pose.
:::
:::

::: exercise The captopril step {level=3 check="23.7"}
In the captopril series, succinyl-L-proline inhibits ACE with $\mathrm{IC_{50}} = 330\ \mu\mathrm{mol\,dm^{-3}}$ and captopril with $\mathrm{IC_{50}} = 23\ \mathrm{nmol\,dm^{-3}}$, measured under the same conditions. (a) Calculate the total gain in binding free energy at $298\ \mathrm{K}$. (b) Captopril has 14 heavy atoms and succinyl-L-proline 15; comment on the ligand efficiencies. (c) Why is it legitimate to compare $\mathrm{IC_{50}}$ values here, and when would it not be? (Enter the free-energy gain in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: hint
$\Delta\Delta G = RT\ln 10 \times \log_{10}(\mathrm{IC_{50},1}/\mathrm{IC_{50},2})$, and the heavy-atom counts are close enough that the efficiency comparison is almost a potency comparison.
:::
::: solution
(a) The ratio is $(3.30\times10^{-4})/(2.3\times10^{-8}) = 1.435\times10^{4}$, so $\Delta\Delta G = 5.708 \times 4.157 = 23.7\ \mathrm{kJ\,mol^{-1}}$.

(b) Succinyl-L-proline: $\mathrm{p}K \approx 3.48$ over 15 atoms, $\mathrm{LE} = 1.32\ \mathrm{kJ\,mol^{-1}}$ ($0.32\ \mathrm{kcal\,mol^{-1}}$) per atom. Captopril: $\mathrm{p}K \approx 7.64$ over 14 atoms, $\mathrm{LE} = 3.11\ \mathrm{kJ\,mol^{-1}}$ ($0.74\ \mathrm{kcal\,mol^{-1}}$) per atom. The efficiency more than doubled while the molecule got *smaller* — the hallmark of a change that corrects a mismatch rather than adding bulk, and a value reached mainly by small charged inhibitors of metalloenzymes.

(c) Both are competitive inhibitors of the same enzyme assayed at the same substrate concentration, so the Cheng–Prusoff factor $(1 + [\mathrm{S}]/K_\mathrm{M})$ cancels in the ratio. The comparison would fail between assays at different $[\mathrm{S}]$, between different mechanisms of inhibition, or for a tight-binding inhibitor whose $\mathrm{IC_{50}}$ approaches half the enzyme concentration.
:::
:::

::: exercise Why scoring functions favour fat molecules {level=3}
(a) Starting from [[#eq-score]], show that for a congeneric series in which the polar contacts are unchanged, the predicted $\mathrm{p}K_\mathrm{d}$ is linear in the buried apolar area $A_\mathrm{lipo}$, and find the predicted gain in $\mathrm{p}K_\mathrm{d}$ per $\mathrm{CH_2}$ group added, taking $25\ \text{Å}^2$ of apolar surface buried per $\mathrm{CH_2}$ and one new rotatable bond per two $\mathrm{CH_2}$ groups. (b) Compare with the experimental rule of thumb that a buried methylene is worth about $2$–$3\ \mathrm{kJ\,mol^{-1}}$. (c) Explain what the function is omitting, and why the resulting bias matters more for a virtual screen of $10^9$ make-on-demand compounds than for the rescoring of twenty analogues.
::: hint
Differentiate the score with respect to $A_\mathrm{lipo}$, remembering that $\mathrm{p}K_\mathrm{d} = -\Delta_\mathrm{b}G^\circ/(RT\ln 10)$ and that $RT\ln 10 = 5.708\ \mathrm{kJ\,mol^{-1}}$.
:::
::: solution
(a) With the polar sums fixed, [[#eq-score]] becomes $\Delta_\mathrm{b}G^\circ = \text{const} + \Delta G_\mathrm{lipo}A_\mathrm{lipo} + \Delta G_\mathrm{rot}N_\mathrm{rot}$, so
$$
\mathrm{p}K_\mathrm{d} = -\frac{\Delta_\mathrm{b}G^\circ}{RT\ln 10} = \text{const}' - \frac{\Delta G_\mathrm{lipo}}{5.708}A_\mathrm{lipo} - \frac{\Delta G_\mathrm{rot}}{5.708}N_\mathrm{rot},
$$
linear in $A_\mathrm{lipo}$ with slope $0.17/5.708 = 0.0298$ per $\text{Å}^2$. Each $\mathrm{CH_2}$ contributes $25\ \text{Å}^2$, worth $-4.25\ \mathrm{kJ\,mol^{-1}}$, and half a rotatable bond, costing $+0.7\ \mathrm{kJ\,mol^{-1}}$: net $-3.55\ \mathrm{kJ\,mol^{-1}}$, or $0.62$ units of $\mathrm{p}K_\mathrm{d}$ — a factor of 4 per methylene.

(b) The experimental increment, $2$–$3\ \mathrm{kJ\,mol^{-1}}$ ($0.35$–$0.53$ in $\mathrm{p}K_\mathrm{d}$), is smaller by about $1$–$1.5\ \mathrm{kJ\,mol^{-1}}$ per methylene; over six carbons that is an overestimate of more than one order of magnitude in $K_\mathrm{d}$, growing with molecular size without limit.

(c) The function assumes every added apolar atom is fully buried against a complementary surface, which beyond a point is geometrically impossible; it treats conformational entropy as a bond count, ignoring strain; it does not penalise desolvation of polar atoms dragged into the site; and it knows nothing of solubility or clearance.

The bias is dangerous in proportion to the freedom of the search. Rescoring twenty analogues of similar size compares like with like, and an overestimate common to all cancels in the ranking; a screen of $10^9$ compounds of molar mass 200 to $700\ \mathrm{g\,mol^{-1}}$ has in effect been told to maximise buried apolar area, and will return the greasiest molecules at the top. The remedies are external: filter on molar mass and $\log P$ before docking, rank on ligand efficiency ([[medicinal-chemistry/hits-and-leads#def-le]]), and compare within size bins.
:::
:::
