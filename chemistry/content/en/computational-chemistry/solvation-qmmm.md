Most chemistry happens in solution, and most biochemistry inside proteins. Yet the electronic-structure methods of this course, as presented so far, describe isolated molecules in a vacuum. The difference is not a small correction. Water stabilises a sodium ion by about $365\ \mathrm{kJ\,mol^{-1}}$; it turns the gas-phase deprotonation of acetic acid, which costs over $1400\ \mathrm{kJ\,mol^{-1}}$, into an equilibrium with $\mathrm{p}K_\mathrm{a} = 4.76$; it reverses the order of $\mathrm{S_N2}$ rates; it shifts absorption bands by thousands of wavenumbers. There are two ways of putting the environment back. One is to treat it explicitly, as the molecular-dynamics and free-energy methods of [[computational-chemistry/molecular-dynamics]] and [[computational-chemistry/free-energy-sampling]] do — accurate, but expensive, and with quantum mechanics affordable only for a small region. The other is to replace the solvent by a **dielectric continuum** that responds to the solute's charge distribution — cheap, and astonishingly effective for many purposes. This lesson develops continuum models from the Born and Onsager formulas to modern PCM, COSMO and SMD, shows how they are used in thermodynamic cycles for $\mathrm{p}K_\mathrm{a}$ values and redox potentials, and then describes the **QM/MM** methods that embed a quantum-mechanical region in a classical environment, the tool of choice for reactions in enzymes.

## The solvation free energy

::: definition Solvation free energy {#def-solvation}
The **solvation free energy** $\Delta G^{*}_\mathrm{solv}$ of a solute is the free-energy change for transferring it from the ideal gas to an ideal dilute solution at the *same concentration* (Ben-Naim's standard state, denoted $*$, typically $1\ \mathrm{mol\,dm^{-3}}$ in both phases). It is conventionally decomposed as
$$
\Delta G^{*}_\mathrm{solv} = \Delta G_\mathrm{elec} + \Delta G_\mathrm{cav} + \Delta G_\mathrm{disp\text{-}rep} + \Delta G_\mathrm{struct},
$$
the electrostatic work of polarising the solvent, the work of creating a cavity for the solute, the dispersion–repulsion interactions with the solvent, and changes in solvent structure (hydrogen bonding, hydrophobic ordering) not covered by the other terms. Only the total is observable; the partition depends on the model.
:::

The standard state matters. Gas-phase free energies are usually tabulated for $p^\circ = 1\ \mathrm{bar}$ (or $1\ \mathrm{atm}$ in older work), while solution free energies refer to $1\ \mathrm{mol\,dm^{-3}}$. An ideal gas at $1\ \mathrm{atm}$ and $298.15\ \mathrm{K}$ has a concentration of $1/24.46\ \mathrm{mol\,dm^{-3}}$, so compressing it to $1\ \mathrm{mol\,dm^{-3}}$ costs
$$
\Delta G^{\circ\to *} = RT\ln\frac{V_\mathrm{m}^\circ}{1\ \mathrm{dm^{3}\,mol^{-1}}} = RT\ln 24.46 = 7.93\ \mathrm{kJ\,mol^{-1}}
$$ {#eq-standard-state}
per mole of each species (at $1\ \mathrm{bar}$ the volume is $24.79\ \mathrm{dm^{3}}$ and the correction $7.95\ \mathrm{kJ\,mol^{-1}}$). Forgetting this correction in a reaction that changes the number of solute molecules is one of the commonest errors in computational $\mathrm{p}K_\mathrm{a}$ and binding calculations.

## Continuum electrostatics: Born and Onsager

The largest term for ions and polar molecules is electrostatic. Model the solvent as a uniform dielectric of relative permittivity $\varepsilon_\mathrm{r}$ outside a cavity containing the solute; the solute's charges polarise the dielectric, and the polarisation produces a **reaction field** that acts back on the solute and lowers its energy.

::: proposition The Born equation {#prop-born}
For a point charge $ze$ at the centre of a spherical cavity of radius $a$ in a dielectric of relative permittivity $\varepsilon_\mathrm{r}$, the electrostatic solvation free energy (relative to vacuum) is
$$
\Delta G_\mathrm{Born} = -\frac{z^{2}e^{2}N_\mathrm{A}}{8\pi\varepsilon_0 a}\left(1 - \frac{1}{\varepsilon_\mathrm{r}}\right) = -694.7\ \mathrm{kJ\,mol^{-1}}\times\frac{z^{2}}{a/\mathrm{\AA}}\left(1 - \frac{1}{\varepsilon_\mathrm{r}}\right).
$$
:::

::: proof
Compute the reversible work of charging the sphere from $0$ to $ze$, first in vacuum and then in the dielectric. When the sphere carries charge $q$, the potential at its surface is $\phi(q) = q/4\pi\varepsilon_0\varepsilon_\mathrm{r}a$, so bringing up a further $\mathrm{d}q$ from infinity costs $\phi\,\mathrm{d}q$, and the total work is
$$
w = \int_0^{ze}\frac{q\,\mathrm{d}q}{4\pi\varepsilon_0\varepsilon_\mathrm{r}a} = \frac{(ze)^{2}}{8\pi\varepsilon_0\varepsilon_\mathrm{r}a}.
$$
The free energy of transfer is the difference between this and the vacuum work ($\varepsilon_\mathrm{r} = 1$): $\Delta G = \frac{(ze)^{2}}{8\pi\varepsilon_0 a}\left(\frac{1}{\varepsilon_\mathrm{r}} - 1\right)$, multiplied by $N_\mathrm{A}$ per mole. Numerically $e^{2}N_\mathrm{A}/8\pi\varepsilon_0 = \tfrac{1}{2} \times 1389.35\ \mathrm{kJ\,mol^{-1}\,\AA}$.
:::

::: example Hydration of the sodium ion {#ex-born-na}
The experimental hydration free energy of $\mathrm{Na^{+}}$ is about $-365\ \mathrm{kJ\,mol^{-1}}$ (Marcus's compilation). Evaluate the Born energy in water ($\varepsilon_\mathrm{r} = 78.4$) with the crystal ionic radius $1.02\ \mathrm{\AA}$, and find the radius that reproduces experiment.
::: solution
With $a = 1.02\ \mathrm{\AA}$: $\Delta G = -694.7 \times (1/1.02) \times (1 - 1/78.4) = -694.7 \times 0.9804 \times 0.9872 = -672\ \mathrm{kJ\,mol^{-1}}$, almost twice too negative. Solving $-694.7 \times 0.9872/a = -365$ gives $a = 1.88\ \mathrm{\AA}$. The effective cavity radius is larger than the ionic radius by about $0.85\ \mathrm{\AA}$ — the correction Latimer, Pitzer and Slansky proposed empirically in 1939 — because the solvent's dielectric response does not begin at the ion's surface: the first hydration shell is partly saturated and its oxygen atoms cannot approach closer than their own size allows. Every continuum model has some such radius parameter, and the results depend on it as $1/a$.
:::
:::

::: widget plot
f: -694.7*z^2/x*(1 - 1/e)
x: 0.8, 5
y: -1500, 0
sliders: z=1:1:3:1; e=78.4:1:80:0.1
points: 1.88, -365
labels: \Delta G_\mathrm{Born}/\mathrm{kJ\,mol^{-1}}
caption: The Born solvation free energy against cavity radius $a$ in ångström, for charge number $z$ and relative permittivity $\varepsilon_\mathrm{r}$. The marked point is $\mathrm{Na^{+}}$ in water with its effective radius of $1.88\ \mathrm{\AA}$. The $z^{2}$ dependence makes divalent ions four times, and trivalent ions nine times, more strongly solvated at the same radius; the $1/a$ dependence makes the result very sensitive to the radius for small ions. Lower $\varepsilon_\mathrm{r}$ towards $2$ to see how little of the stabilisation survives in a non-polar solvent.
:::

The factor $(1 - 1/\varepsilon_\mathrm{r})$ saturates quickly: it is $0.50$ for $\varepsilon_\mathrm{r} = 2$ (hexane-like), $0.79$ for chloroform ($4.8$), $0.97$ for acetonitrile ($36$) and $0.99$ for water. Most of the electrostatic stabilisation of an ion is achieved by any reasonably polar solvent; what distinguishes solvents beyond that is specific interactions — hydrogen bonding to anions, coordination to cations — that the continuum omits.

For a neutral polar molecule the leading term is the dipole.

::: proposition The Onsager reaction field {#prop-onsager}
A point dipole $\mu$ at the centre of a spherical cavity of radius $a$ in a dielectric $\varepsilon_\mathrm{r}$ experiences a reaction field $R = \frac{2(\varepsilon_\mathrm{r} - 1)}{2\varepsilon_\mathrm{r} + 1}\frac{\mu}{4\pi\varepsilon_0 a^{3}}$ parallel to itself, and its electrostatic solvation free energy is
$$
\Delta G_\mathrm{Onsager} = -\frac{1}{2}\mu R = -\frac{\mu^{2}}{4\pi\varepsilon_0 a^{3}}\cdot\frac{\varepsilon_\mathrm{r} - 1}{2\varepsilon_\mathrm{r} + 1}.
$$
:::

::: proof
Inside the cavity the potential is that of the dipole plus a uniform reaction field, $\phi_\mathrm{in} = \frac{\mu\cos\theta}{4\pi\varepsilon_0 r^{2}} - Rr\cos\theta$; outside it is a screened dipole, $\phi_\mathrm{out} = \frac{\mu'\cos\theta}{4\pi\varepsilon_0 r^{2}}$. These are the $l = 1$ solutions of Laplace's equation. Continuity of $\phi$ at $r = a$ gives $\mu/4\pi\varepsilon_0 a^{2} - Ra = \mu'/4\pi\varepsilon_0 a^{2}$; continuity of the normal component of the displacement, $\partial\phi_\mathrm{in}/\partial r = \varepsilon_\mathrm{r}\partial\phi_\mathrm{out}/\partial r$, gives $-2\mu/4\pi\varepsilon_0 a^{3} - R = -2\varepsilon_\mathrm{r}\mu'/4\pi\varepsilon_0 a^{3}$. Eliminating $\mu'$ yields the stated $R$. The free energy of a dipole in a field that it induces itself (linear response) is $-\tfrac{1}{2}\mu R$, the factor $\tfrac{1}{2}$ accounting for the work done in polarising the medium.
:::

The Onsager model underlies the classical theory of **solvatochromism**: a molecule whose dipole changes on excitation, from $\mu_\mathrm{g}$ to $\mu_\mathrm{e}$, has its absorption shifted in proportion to $(\mu_\mathrm{e} - \mu_\mathrm{g})$ and to a polarity function of the solvent, as in the Lippert–Mataga equation. Fitting solvatochromic shifts gives excited-state dipole moments.

::: widget plot
f: 1 - 1/x; 2*(x - 1)/(2*x + 1); (x - 1)/(x + k)
x: 1, 80
y: 0, 1.05
sliders: k=0.5:0:2:0.05
labels: \text{Born } 1 - 1/\varepsilon_\mathrm{r}; \text{Onsager } 2(\varepsilon_\mathrm{r}-1)/(2\varepsilon_\mathrm{r}+1); \text{COSMO } (\varepsilon_\mathrm{r}-1)/(\varepsilon_\mathrm{r}+x)
vlines: 4.81; 78.4
caption: Dielectric factors against the solvent's relative permittivity. The Born factor for an ion and the Onsager factor for a dipole both rise steeply and saturate: by $\varepsilon_\mathrm{r} \approx 10$ most of the electrostatic solvation is achieved, and chloroform ($4.81$) and water ($78.4$), marked, differ by less than a factor of $1.4$. The COSMO scaling factor with $x = 0.5$ (the slider) coincides exactly with the Onsager factor, and with $x = 0$ it reproduces the Born factor.
:::

## Polarisable continuum models

Real solutes are not spheres with central point charges. Modern continuum models build the cavity from interlocking atomic spheres (radii typically $1.1$–$1.2$ times van der Waals radii) and solve the electrostatic problem numerically for the actual quantum-mechanical charge density.

::: definition Apparent surface charge models {#def-pcm}
In a **polarisable continuum model** (PCM) the dielectric's polarisation is represented by an **apparent surface charge** density $\sigma(\mathbf{s})$ spread over the cavity surface, discretised into small tesserae with charges $q_k$. The charges are determined by the electrostatic boundary conditions given the solute's potential $\mathbf{V}$ on the tesserae, through a linear equation $\mathbf{K}\mathbf{q} = -\mathbf{R}\mathbf{V}$ whose matrices depend on the cavity geometry and $\varepsilon_\mathrm{r}$. The reaction potential of these charges is added to the solute Hamiltonian, $\hat H = \hat H_0 + \hat V_\mathrm{R}[\mathbf{q}]$, and because $\mathbf{q}$ depends on the solute density the two are solved together self-consistently (the **self-consistent reaction field**, SCRF). The electrostatic solvation free energy is $\Delta G_\mathrm{elec} = \tfrac{1}{2}\mathbf{q}\cdot\mathbf{V}$ plus the change in the solute's own energy on polarisation.
:::

Variants differ in how the boundary-condition equation is formulated. The **conductor-like** models (COSMO, Klamt and Schüürmann 1993; C-PCM) first solve for a perfect conductor ($\varepsilon_\mathrm{r} = \infty$), where the condition is simply that the total potential vanishes on the surface, and then scale the charges by $f(\varepsilon_\mathrm{r}) = (\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + x)$ with $x$ between $0$ and $\tfrac{1}{2}$. The integral-equation-formalism PCM (IEF-PCM) solves the dielectric problem exactly for the given cavity. For high-permittivity solvents the variants agree closely.

Electrostatics alone does not give accurate solvation free energies; the non-electrostatic terms are comparable in size for neutral molecules. The **SMD** model (Marenich, Cramer and Truhlar, 2009) combines IEF-PCM electrostatics, with optimised atomic radii, and a cavity–dispersion–solvent-structure term proportional to atomic surface areas with coefficients that depend on solvent descriptors (refractive index, hydrogen-bond acidity and basicity, surface tension). It was parameterised on several thousand experimental solvation free energies in about ninety solvents and reaches mean errors of about $3\ \mathrm{kJ\,mol^{-1}}$ for neutral solutes and $15$–$20\ \mathrm{kJ\,mol^{-1}}$ for ions. **COSMO-RS** (Klamt, 1995) goes further, using the COSMO surface charges of solute and solvent molecules in a statistical-thermodynamic model of interacting surface segments to predict activity coefficients, partition coefficients and solubilities in arbitrary solvents and mixtures.

::: warning What continuum models cannot do {#warn-continuum}
A continuum has no molecules. It cannot form a specific hydrogen bond to the solute, coordinate a metal ion, transfer a proton, or show that a reaction is catalysed by one particular water molecule. It describes the *average* response of bulk solvent, at equilibrium — and the equilibrium response is not right for fast processes: during a vertical electronic excitation only the solvent's electronic polarisation (the optical permittivity $n^{2} \approx 1.8$ for water) can follow, and non-equilibrium solvation must be used for absorption spectra. For anions with localised charge and for hydroxide or fluoride, errors of tens of $\mathrm{kJ\,mol^{-1}}$ are common. The standard remedy is the **cluster–continuum** approach: include one or a few explicit solvent molecules hydrogen-bonded to the critical site, and embed the cluster in the continuum.
:::

## Thermodynamic cycles in solution

Solution-phase reaction free energies are usually computed by combining a high-level gas-phase calculation with solvation free energies:
$$
\Delta G^{*}_\mathrm{aq} = \Delta G^{\circ}_\mathrm{gas} + \Delta n\,RT\ln 24.46 + \sum_\mathrm{products}\Delta G^{*}_\mathrm{solv} - \sum_\mathrm{reactants}\Delta G^{*}_\mathrm{solv},
$$ {#eq-solution-cycle}
where $\Delta n$ is the change in the number of moles of solute species and the second term converts the gas-phase standard state ([[#eq-standard-state]]).

::: algorithm Computing a $\mathrm{p}K_\mathrm{a}$ from a thermodynamic cycle {#alg-pka}
1. Optimise HA and $\mathrm{A^{-}}$ in the gas phase (or in the continuum) and compute their frequencies, to obtain gas-phase free energies with thermal corrections ([[statistical-thermodynamics/equilibrium-from-molecules]]); compute the electronic energies at a high level (for example CCSD(T)/CBS or a good double-hybrid functional).
2. Obtain $\Delta G^{\circ}_\mathrm{gas}$ for $\mathrm{HA(g)} \rightarrow \mathrm{A^{-}(g)} + \mathrm{H^{+}(g)}$, using $G^{\circ}(\mathrm{H^{+}, g}) = -26.3\ \mathrm{kJ\,mol^{-1}}$ (from the Sackur–Tetrode equation at $1\ \mathrm{atm}$, $298\ \mathrm{K}$).
3. Compute $\Delta G^{*}_\mathrm{solv}$ for HA and $\mathrm{A^{-}}$ with a continuum model (preferably with explicit water molecules for the anion), and use the experimental value for the proton, $\Delta G^{*}_\mathrm{solv}(\mathrm{H^{+}}) = -1112.5\ \mathrm{kJ\,mol^{-1}}$ (Tissandier and co-workers, 1998, in the $1\ \mathrm{mol\,dm^{-3}}$ convention).
4. Combine with [[#eq-solution-cycle]] ($\Delta n = +1$) and convert: $\mathrm{p}K_\mathrm{a} = \Delta G^{*}_\mathrm{aq}/(RT\ln 10)$, with $RT\ln 10 = 5.708\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$.
5. Where possible use an **isodesmic** or relative scheme — compute $\Delta\mathrm{p}K_\mathrm{a}$ relative to a reference acid of known $\mathrm{p}K_\mathrm{a}$ and similar structure — so that the proton's solvation energy and many systematic errors cancel.
:::

::: example The $\mathrm{p}K_\mathrm{a}$ of acetic acid {#ex-pka}
For acetic acid at $298.15\ \mathrm{K}$, take $\Delta G^{\circ}_\mathrm{gas} = 1427\ \mathrm{kJ\,mol^{-1}}$ for gas-phase deprotonation (at $1\ \mathrm{atm}$), $\Delta G^{*}_\mathrm{solv}(\mathrm{CH_3COOH}) = -28\ \mathrm{kJ\,mol^{-1}}$, $\Delta G^{*}_\mathrm{solv}(\mathrm{CH_3COO^{-}}) = -322\ \mathrm{kJ\,mol^{-1}}$ and $\Delta G^{*}_\mathrm{solv}(\mathrm{H^{+}}) = -1112.5\ \mathrm{kJ\,mol^{-1}}$ (approximate experimental values). Compute the $\mathrm{p}K_\mathrm{a}$, and the change produced by a $10\ \mathrm{kJ\,mol^{-1}}$ error in the solvation of the anion.
::: solution
By [[#eq-solution-cycle]],
$$
\Delta G^{*}_\mathrm{aq} = 1427 + 7.93 + (-322) + (-1112.5) - (-28) = 28.4\ \mathrm{kJ\,mol^{-1}},
$$
so $\mathrm{p}K_\mathrm{a} = 28.4/5.708 = 4.98$, against the measured $4.76$. The aqueous free energy is a small difference of very large numbers: the gas-phase deprotonation energy and the solvation of the two ions cancel to within $2\ \%$. A $10\ \mathrm{kJ\,mol^{-1}}$ error in $\Delta G^{*}_\mathrm{solv}(\mathrm{A^{-}})$ — typical of continuum models for anions — shifts the $\mathrm{p}K_\mathrm{a}$ by $10/5.708 = 1.75$ units. This is why absolute computed $\mathrm{p}K_\mathrm{a}$ values are often in error by two or more units, while relative schemes do much better.
:::
:::

::: example A dimerisation in solution {#ex-dimer-ss}
Two molecules of a carboxylic acid form a hydrogen-bonded dimer, $2\,\mathrm{RCOOH} \rightleftharpoons (\mathrm{RCOOH})_2$. A calculation gives $\Delta G^{\circ}_\mathrm{gas} = -15.0\ \mathrm{kJ\,mol^{-1}}$ (standard state $1\ \mathrm{atm}$), and a continuum model gives solvation free energies of $-20.0\ \mathrm{kJ\,mol^{-1}}$ for each monomer and $-24.0\ \mathrm{kJ\,mol^{-1}}$ for the dimer in chloroform, at $298.15\ \mathrm{K}$ (illustrative values). Find $\Delta G^{*}$ in solution and the dimerisation constant on the molar scale.
::: solution
Here $\Delta n = 1 - 2 = -1$, so the standard-state term is $-7.93\ \mathrm{kJ\,mol^{-1}}$. By [[#eq-solution-cycle]],
$$
\Delta G^{*}_\mathrm{soln} = -15.0 - 7.93 + (-24.0) - 2(-20.0) = -6.9\ \mathrm{kJ\,mol^{-1}},
$$
and $K = e^{6.93/2.479} = 16\ \mathrm{dm^{3}\,mol^{-1}}$. Two effects reduce the gas-phase driving force: the solvent stabilises two separate monomers more than one dimer (each monomer exposes its polar COOH group, while the dimer buries both), and the standard-state change makes association less favourable at $1\ \mathrm{mol\,dm^{-3}}$ than at the lower concentration ($1/24.46\ \mathrm{mol\,dm^{-3}}$) of a gas at $1\ \mathrm{atm}$. Omitting the $7.93\ \mathrm{kJ\,mol^{-1}}$ would overestimate $K$ by a factor of $24.5$.
:::
:::

The same approach gives **redox potentials**: compute $\Delta G^{*}_\mathrm{aq}$ for $\mathrm{Ox} + n\mathrm{e^{-}} \rightarrow \mathrm{Red}$, convert with $E^\circ = -\Delta G/nF$, and subtract the absolute potential of the reference electrode (about $4.28\ \mathrm{V}$ for the standard hydrogen electrode in the convention consistent with the proton solvation energy above), or better, compute relative to a reference couple ([[electrochemistry]]).

::: quiz
A computed $\mathrm{p}K_\mathrm{a}$ for an alcohol, from a gas-phase CCSD(T) calculation and an SMD continuum model, is $21$, while the experimental value is $16$. Which correction is most likely to help?
- [ ] Using a larger basis set for the gas-phase calculation.
- [x] Adding explicit water molecules hydrogen-bonded to the alkoxide oxygen (a cluster–continuum model), or using a relative scheme against a reference alcohol.
- [ ] Changing the dielectric constant from $78.4$ to $80$.
- [ ] Removing the standard-state correction.
::: solution
The alkoxide anion has a small, localised negative charge stabilised by strong, specific hydrogen bonds that a continuum underestimates; the computed anion solvation is not negative enough, so the $\mathrm{p}K_\mathrm{a}$ is too high. Five units correspond to $29\ \mathrm{kJ\,mol^{-1}}$, a typical continuum error for such anions. Basis-set and dielectric changes are far too small to matter, and the standard-state term is required.
:::
:::

## QM/MM: quantum chemistry inside a classical environment

An enzyme active site is too large for quantum chemistry and too reactive for a force field. The **quantum mechanics/molecular mechanics** (QM/MM) idea of Warshel and Levitt (1976) is to treat a small region — the substrate and the catalytic residues, typically $50$–$300$ atoms — quantum-mechanically, and the rest of the protein and solvent with a force field ([[computational-chemistry/molecular-mechanics]]).

::: definition QM/MM energy schemes {#def-qmmm}
In the **additive** scheme the total energy is
$$
E_\mathrm{QM/MM} = E_\mathrm{QM}(\mathrm{inner}) + E_\mathrm{MM}(\mathrm{outer}) + E_\mathrm{QM\text{-}MM}(\mathrm{inner}, \mathrm{outer}),
$$
where the coupling term contains the bonded MM terms that cross the boundary, the Lennard-Jones interactions between QM and MM atoms, and the electrostatic interaction between the QM charge density and the MM point charges. In the **subtractive** scheme (ONIOM, Morokuma and co-workers),
$$
E_\mathrm{ONIOM} = E_\mathrm{high}(\mathrm{model}) + E_\mathrm{low}(\mathrm{real}) - E_\mathrm{low}(\mathrm{model}),
$$
where "real" is the whole system and "model" the inner region (capped with link atoms); the low-level calculation of the inner region is subtracted so that it is not counted twice. Any two methods can be combined (QM:QM as well as QM:MM).
:::

How the electrostatic coupling is treated defines three levels of embedding:

- **Mechanical embedding**: QM–MM electrostatics are computed classically, with MM charges and fixed charges on the QM atoms. The QM wavefunction does not feel its environment; this is rarely adequate for charged active sites.
- **Electrostatic embedding**: the MM point charges enter the QM Hamiltonian as one-electron terms, $-\sum_J q_J/\lvert\mathbf{r} - \mathbf{R}_J\rvert$, so the QM density is polarised by the protein and solvent. This is the standard choice.
- **Polarisable embedding**: in addition, the MM region is polarised by the QM region (polarisable force fields), self-consistently.

When the boundary cuts a covalent bond — for example the $\mathrm{C_\alpha}$–$\mathrm{C_\beta}$ bond of a catalytic residue — the dangling valence of the QM region must be capped. The most common solution is a **link atom**, usually hydrogen, placed along the cut bond; the MM charges nearest the link atom are deleted, shifted or smeared to prevent them from over-polarising the QM density. Frozen localised orbitals (the local self-consistent field method) are the main alternative. Cut through non-polar C–C bonds, never through polar or conjugated ones.

::: example An ONIOM energy {#ex-oniom}
For a large molecule, an ONIOM(DFT:MM) calculation needs three energies. Relative to a reference structure, a proposed transition state has $\Delta E_\mathrm{DFT}(\mathrm{model}) = +78.4\ \mathrm{kJ\,mol^{-1}}$, $\Delta E_\mathrm{MM}(\mathrm{real}) = +12.6\ \mathrm{kJ\,mol^{-1}}$ and $\Delta E_\mathrm{MM}(\mathrm{model}) = +4.1\ \mathrm{kJ\,mol^{-1}}$ (illustrative values). What is the ONIOM barrier, and what does each term represent?
::: solution
$\Delta E_\mathrm{ONIOM} = 78.4 + 12.6 - 4.1 = 86.9\ \mathrm{kJ\,mol^{-1}}$. The first term is the intrinsic barrier of the reacting core at the quantum level; $E_\mathrm{MM}(\mathrm{real}) - E_\mathrm{MM}(\mathrm{model}) = +8.5\ \mathrm{kJ\,mol^{-1}}$ is the force field's estimate of how the surroundings (steric strain of the larger framework, in this case) change the barrier. The subtraction removes the force field's own (poor) description of the bond breaking in the core, which is why the scheme works even though MM cannot describe the reaction.
:::
:::

QM/MM energies along a single reaction path are not enough for an enzyme, where thousands of protein and water configurations contribute. Practical QM/MM studies therefore combine the method with the sampling of [[computational-chemistry/free-energy-sampling]]: QM/MM molecular dynamics with umbrella sampling along a reaction coordinate gives a potential of mean force and a free-energy barrier, which can be compared with $k_\mathrm{cat}$ through transition-state theory ([[kinetics/transition-state-theory]]). Because QM energies are expensive, the quantum level is usually a semi-empirical method or DFT with a modest basis, sometimes corrected at a few points with a higher level. Warshel's empirical valence bond (EVB) method, which describes the reacting system by a few diabatic valence-bond states with force-field energies, is a cheaper alternative widely used for enzyme catalysis.

QM/MM is equally useful for **spectroscopy in condensed phases**: excitation energies of a chromophore in a protein (retinal in rhodopsin, the green fluorescent protein chromophore), NMR chemical shifts and vibrational spectra are computed by taking snapshots from an MD trajectory and evaluating the property with QM/MM electrostatic embedding, then averaging over snapshots. The snapshot average captures the inhomogeneous broadening that a single structure misses.

## Choosing a solvation model

| question | reasonable approach |
|---|---|
| solvation free energies of neutral organics | SMD or COSMO-RS |
| $\mathrm{p}K_\mathrm{a}$, redox potentials | continuum with explicit solvent at the charged site; relative schemes |
| conformational equilibria in solution | continuum, checked against explicit-solvent MD for flexible molecules |
| reactions with solvent participation (proton relay, hydrolysis) | cluster–continuum or explicit QM/MM MD |
| enzyme mechanisms | QM/MM with electrostatic embedding and free-energy sampling |
| UV–visible spectra in solution | TD-DFT with non-equilibrium continuum, or QM/MM snapshots |
| partition coefficients, solubilities | COSMO-RS or explicit free-energy calculations |

## Where this leads

This lesson closes the course by connecting its two halves: the electronic-structure methods of [[computational-chemistry/hartree-fock]] to [[computational-chemistry/density-functional-theory]] provide the quantum region and the gas-phase energies, while the force fields and sampling methods of [[computational-chemistry/molecular-mechanics]] to [[computational-chemistry/free-energy-sampling]] provide the environment and the thermal averages. Applications of these multiscale models appear across the atlas: enzyme catalysis in [[biochemistry]], drug binding in [[medicinal-chemistry/drug-binding]], electrode processes in [[electrochemistry]] and heterogeneous catalysis in [[organometallics-catalysis]].

::: history
Max Born derived his formula for ionic solvation in 1920, and Lars Onsager his reaction-field theory of polar liquids in 1936. Wendell Latimer, Kenneth Pitzer and Cyril Slansky introduced effective Born radii in 1939. The polarisable continuum model was developed by Stefano Miertuš, Eolo Scrocco and Jacopo Tomasi in 1981; Andreas Klamt and Gerrit Schüürmann's COSMO followed in 1993 and Klamt's COSMO-RS in 1995, and Aleksandr Marenich, Christopher Cramer and Donald Truhlar published SMD in 2009. Arieh Warshel and Michael Levitt's 1976 study of the lysozyme reaction introduced the QM/MM approach, and Martin Field, Paul Bash and Martin Karplus formulated a widely used combined QM/MM potential in 1990; Keiji Morokuma and co-workers introduced the ONIOM scheme in 1995–96. The 2013 Nobel Prize in Chemistry was awarded to Karplus, Levitt and Warshel "for the development of multiscale models for complex chemical systems".
:::

::: summary
- Solvation free energies are transfer free energies between equal concentrations; converting gas-phase standard states to $1\ \mathrm{mol\,dm^{-3}}$ adds $RT\ln 24.46 = 7.93\ \mathrm{kJ\,mol^{-1}}$ per species.
- The Born equation $\Delta G = -694.7\,z^{2}(1 - 1/\varepsilon_\mathrm{r})/(a/\mathrm{\AA})\ \mathrm{kJ\,mol^{-1}}$ and Onsager's reaction field capture ionic and dipolar solvation; both saturate rapidly with $\varepsilon_\mathrm{r}$, and the cavity radius is an empirical parameter.
- PCM, COSMO and SMD solve the continuum electrostatics self-consistently with the quantum-mechanical density on molecular cavities; SMD adds parameterised non-electrostatic terms; COSMO-RS predicts activity coefficients.
- Continuum models miss specific interactions; cluster–continuum models and relative schemes greatly improve $\mathrm{p}K_\mathrm{a}$ and redox calculations, where $5.7\ \mathrm{kJ\,mol^{-1}}$ is one $\mathrm{p}K_\mathrm{a}$ unit.
- QM/MM treats a reactive region quantum-mechanically inside a force-field environment (additive or subtractive ONIOM schemes), with electrostatic embedding and link atoms at the boundary.
- Enzyme mechanisms and condensed-phase spectra need QM/MM combined with sampling over many environment configurations.
:::

## Exercises

::: exercise The standard-state correction {level=1 check="7.93"}
Compute $RT\ln 24.46$ at $298.15\ \mathrm{K}$. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$8.31446\times10^{-3} \times 298.15 \times \ln 24.46 = 2.4790 \times 3.1971 = 7.93\ \mathrm{kJ\,mol^{-1}}$ ([[#eq-standard-state]]).
:::
:::

::: exercise A Born energy {level=1 check="-365"}
Evaluate the Born hydration free energy of a monovalent ion with cavity radius $1.88\ \mathrm{\AA}$ in water ($\varepsilon_\mathrm{r} = 78.4$). (Enter it in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$-694.7 \times (1/1.88) \times (1 - 1/78.4) = -369.5 \times 0.98724 = -365\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise From free energy to $\mathrm{p}K_\mathrm{a}$ {level=1 check="4.98"}
A thermodynamic cycle gives $\Delta G^{*}_\mathrm{aq} = 28.4\ \mathrm{kJ\,mol^{-1}}$ for the dissociation of an acid at $298.15\ \mathrm{K}$. What is its $\mathrm{p}K_\mathrm{a}$? (Enter it to three significant figures.)
::: solution
$\mathrm{p}K_\mathrm{a} = \Delta G/(RT\ln 10) = 28.4/5.708 = 4.98$.
:::
:::

::: exercise Transfer of an ion to a non-polar solvent {level=2 check="188"}
Using the Born equation with $a = 1.91\ \mathrm{\AA}$ for chloride, estimate the electrostatic free energy of transfer of $\mathrm{Cl^{-}}$ from water ($\varepsilon_\mathrm{r} = 78.4$) to hexane ($\varepsilon_\mathrm{r} = 1.89$). (Enter $\Delta G_\mathrm{transfer}$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
In water $\Delta G = -694.7/1.91 \times 0.98724 = -359.1\ \mathrm{kJ\,mol^{-1}}$; in hexane $-694.7/1.91 \times (1 - 1/1.89) = -363.7 \times 0.4709 = -171.3\ \mathrm{kJ\,mol^{-1}}$. The transfer costs $-171.3 - (-359.1) = +188\ \mathrm{kJ\,mol^{-1}}$: ions do not dissolve in alkanes, which is why phase-transfer catalysts wrap them in large lipophilic counter-ions.
:::
:::

::: exercise An ONIOM combination {level=2 check="86.9"}
Combine $E_\mathrm{high}(\mathrm{model}) = 78.4$, $E_\mathrm{low}(\mathrm{real}) = 12.6$ and $E_\mathrm{low}(\mathrm{model}) = 4.1\ \mathrm{kJ\,mol^{-1}}$ (relative energies) into the ONIOM barrier. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$78.4 + 12.6 - 4.1 = 86.9\ \mathrm{kJ\,mol^{-1}}$ ([[#def-qmmm]]).
:::
:::

::: exercise Onsager solvation of water {level=2 check="-24.7"}
Estimate the Onsager electrostatic solvation free energy of a water molecule ($\mu = 1.85\ \mathrm{D}$, $1\ \mathrm{D} = 3.33564\times10^{-30}\ \mathrm{C\,m}$) in a spherical cavity of radius $1.60\ \mathrm{\AA}$ in water ($\varepsilon_\mathrm{r} = 78.4$). (Enter it in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\mu = 6.171\times10^{-30}\ \mathrm{C\,m}$; $\mu^{2}/(4\pi\varepsilon_0 a^{3}) = (3.808\times10^{-59})/(1.11265\times10^{-10} \times 4.096\times10^{-30})\ \mathrm{J} = 8.356\times10^{-20}\ \mathrm{J}$. The dielectric factor is $(\varepsilon_\mathrm{r} - 1)/(2\varepsilon_\mathrm{r} + 1) = 77.4/157.8 = 0.4905$. So $\Delta G = -8.356\times10^{-20} \times 0.4905\ \mathrm{J} = -4.099\times10^{-20}\ \mathrm{J}$, or $\times N_\mathrm{A}$: $-24.7\ \mathrm{kJ\,mol^{-1}}$. This is close to the experimental hydration free energy of water ($-26.4\ \mathrm{kJ\,mol^{-1}}$), but the agreement depends entirely on the chosen radius: with $a = 1.40\ \mathrm{\AA}$ the estimate would be $-36.8\ \mathrm{kJ\,mol^{-1}}$, because $\Delta G \propto a^{-3}$.
:::
:::

::: exercise Derive the COSMO scaling for a dipole {level=3 check="0.718"}
For a conductor ($\varepsilon_\mathrm{r} \to \infty$) the Onsager factor $2(\varepsilon_\mathrm{r} - 1)/(2\varepsilon_\mathrm{r} + 1)$ tends to $1$. Show that the ratio of the Onsager energy in a dielectric to that in a conductor is $(\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + \tfrac{1}{2})$, and that the corresponding ratio for a Born ion is $(\varepsilon_\mathrm{r} - 1)/\varepsilon_\mathrm{r}$. Evaluate the dipole ratio for chloroform ($\varepsilon_\mathrm{r} = 4.81$). (Enter it to three significant figures.)
::: solution
Dipole: $\frac{2(\varepsilon_\mathrm{r} - 1)/(2\varepsilon_\mathrm{r} + 1)}{1} = \frac{\varepsilon_\mathrm{r} - 1}{\varepsilon_\mathrm{r} + \frac{1}{2}}$. Ion: the Born factor $(1 - 1/\varepsilon_\mathrm{r})$ is already relative to the conductor limit $1$, giving $(\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + 0)$. So the COSMO factor $f = (\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + x)$ is exact for an ion with $x = 0$ and for a dipole with $x = \tfrac{1}{2}$, which is why COSMO uses values in this range. For chloroform, $3.81/5.31 = 0.718$ for a dipole, against $3.81/4.81 = 0.792$ for an ion; in water the two differ by less than $1\ \%$.
:::
:::

::: exercise A relative $\mathrm{p}K_\mathrm{a}$ {level=3 check="3.77"}
An isodesmic proton-exchange reaction $\mathrm{HA + B^{-} \rightleftharpoons A^{-} + HB}$, in which HB is acetic acid ($\mathrm{p}K_\mathrm{a} = 4.76$), has a computed $\Delta G^{*}_\mathrm{aq} = -5.65\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$. Derive $\mathrm{p}K_\mathrm{a}(\mathrm{HA}) = \mathrm{p}K_\mathrm{a}(\mathrm{HB}) + \Delta G^{*}_\mathrm{aq}/(RT\ln 10)$, evaluate it, and explain why this route is more reliable than the absolute cycle. (Enter the $\mathrm{p}K_\mathrm{a}$ to three significant figures.)
::: solution
The exchange reaction is the dissociation of HA minus the dissociation of HB, so $\Delta G^{*}_\mathrm{aq} = \Delta G^{*}(\mathrm{HA}) - \Delta G^{*}(\mathrm{HB}) = RT\ln 10\,[\mathrm{p}K_\mathrm{a}(\mathrm{HA}) - \mathrm{p}K_\mathrm{a}(\mathrm{HB})]$. Hence $\mathrm{p}K_\mathrm{a}(\mathrm{HA}) = 4.76 - 5.65/5.708 = 4.76 - 0.990 = 3.77$. The proton never appears, so its uncertain solvation free energy and the standard-state correction cancel ($\Delta n = 0$), and errors of the continuum model for two similar anions largely cancel too. Relative schemes typically reduce $\mathrm{p}K_\mathrm{a}$ errors from several units to about half a unit, provided the reference acid is structurally similar.
:::
:::
