A protein structure in the Protein Data Bank is a single set of coordinates, but the protein it describes is never still. At room temperature its atoms vibrate with amplitudes of tenths of an ångström every picosecond; side chains flip between rotamers in nanoseconds; loops and domains open and close in microseconds to milliseconds; and the whole molecule unfolds and refolds, rarely, over seconds to hours. Binding a ligand, catalysing a reaction or transmitting an allosteric signal all depend on these motions. A structure, in other words, is better thought of as the most populated member of an ensemble of conformations, whose relative free energies and rates of interconversion determine what the protein does.

This final chapter brings the course together. It first makes binding quantitative — affinities, free energies, rates — and asks how conformational change and binding are linked. It then describes molecular dynamics simulation, the computational microscope for motion, and ends with protein design, where the understanding built up in this course is tested in the most demanding way: by writing new sequences that fold into structures and carry out functions that nature never produced. Background on binding and allostery is in [[biochemistry/enzyme-regulation]] and in Chemistry Atlas ([Protein function: binding and allostery](/learn/chemistry/lesson.php?c=biochemistry&l=protein-function)); force fields and molecular dynamics are treated in more depth in the Chemistry Atlas course on computational chemistry ([Molecular mechanics and force fields](/learn/chemistry/lesson.php?c=computational-chemistry&l=molecular-mechanics) and [Molecular dynamics](/learn/chemistry/lesson.php?c=computational-chemistry&l=molecular-dynamics)).

## Binding: affinity, free energy and kinetics

For a protein P binding a ligand L to form a complex PL,

$$
\mathrm P + \mathrm L \rightleftharpoons \mathrm{PL}, \qquad K_\mathrm d = \frac{[\mathrm P][\mathrm L]}{[\mathrm{PL}]},
$$

where $K_\mathrm d$, the **dissociation constant**, has units of concentration and is the free ligand concentration at which half the protein is bound. Small $K_\mathrm d$ means tight binding.

::: definition Binding free energy and rates {#def-binding}
The **standard free energy of binding** is

$$
\Delta G^\circ_\mathrm{bind} = RT\ln\frac{K_\mathrm d}{c^\circ},
$$ {#eq-binding}

with the standard concentration $c^\circ = 1$ mol L⁻¹, so tighter binding gives a more negative $\Delta G^\circ$. The **fraction of protein bound** at free ligand concentration $[\mathrm L]$ is $\theta = [\mathrm L]/(K_\mathrm d + [\mathrm L])$. Kinetically, $K_\mathrm d = k_\mathrm{off}/k_\mathrm{on}$, where the **association rate constant** $k_\mathrm{on}$ (M⁻¹ s⁻¹) is limited by diffusion to about $10^8$–$10^9$ M⁻¹ s⁻¹ for small ligands and is typically $10^5$–$10^7$ for proteins binding each other, and the **dissociation rate constant** $k_\mathrm{off}$ (s⁻¹) sets the **residence time** $1/k_\mathrm{off}$ of the complex.
:::

::: example From a dissociation constant to a residence time {#ex-binding}
A drug binds its target with $K_\mathrm d = 10$ nmol L⁻¹ and $k_\mathrm{on} = 10^6$ M⁻¹ s⁻¹ at 25 °C. Calculate (a) the binding free energy, (b) $k_\mathrm{off}$ and the half-life of the complex, and (c) the fraction of target bound at 100 nmol L⁻¹ free drug.
::: solution
(a) $\Delta G^\circ = 2.479\ln(10^{-8}) = 2.479\times(-18.42) = -45.7$ kJ mol⁻¹. (b) $k_\mathrm{off} = K_\mathrm dk_\mathrm{on} = 10^{-8}\times10^6 = 0.01$ s⁻¹, so the half-life is $\ln2/0.01 = 69$ s and the mean residence time 100 s. (c) $\theta = 100/(10 + 100) = 0.91$. Every tenfold change in $K_\mathrm d$ corresponds to $RT\ln10 = 5.7$ kJ mol⁻¹ at 25 °C, about the energy of one good hydrogen bond in a favourable environment — which is why medicinal chemists can gain or lose orders of magnitude in affinity with a single atom.
:::
:::

**Isothermal titration calorimetry** (ITC) measures the heat released as ligand is added, and so gives $K_\mathrm d$, the stoichiometry and the binding enthalpy $\Delta H$ in one experiment; the entropy follows from $\Delta G = \Delta H - T\Delta S$. Binding free energies are often modest differences between larger enthalpy and entropy terms, and modifications that make binding more exothermic frequently make it less favourable entropically — **enthalpy–entropy compensation**, part real (tighter contacts restrict motion) and part an artefact of the correlated errors in deriving $\Delta S$ from $\Delta G$ and $\Delta H$.

### Ligands stabilise the structures they bind

Binding is linked to folding and to conformational change by a simple thermodynamic principle: a ligand shifts any equilibrium towards the states it binds.

::: proposition Stabilisation by a ligand {#prop-linkage}
If a ligand binds only the native state N of a protein, with dissociation constant $K_\mathrm d$, then the apparent stability of the protein at free ligand concentration $[\mathrm L]$ is

$$
\Delta G_\mathrm U([\mathrm L]) = \Delta G_\mathrm U(0) + RT\ln\Bigl(1 + \frac{[\mathrm L]}{K_\mathrm d}\Bigr).
$$ {#eq-linkage}
:::

::: proof
The apparent equilibrium constant for unfolding counts all native forms: $K_\mathrm U^\mathrm{app} = [\mathrm U]/([\mathrm N] + [\mathrm{NL}])$. Since $[\mathrm{NL}] = [\mathrm N][\mathrm L]/K_\mathrm d$, this is $[\mathrm U]/([\mathrm N](1 + [\mathrm L]/K_\mathrm d)) = K_\mathrm U/(1 + [\mathrm L]/K_\mathrm d)$. Taking $-RT\ln$ of both sides gives [[#eq-linkage]].
:::

This is why ligands raise melting temperatures — the basis of **thermal shift assays**, in which binders are detected by the increase in $T_\mathrm m$ of a target ([[structural-biology/protein-folding]]) — and why pharmacological chaperones can rescue destabilised mutant proteins. The same argument applies to any pair of conformations.

### Induced fit and conformational selection

Many proteins change shape on binding. Hexokinase closes its two domains around glucose (W. S. Bennett and T. A. Steitz, 1978, from yeast hexokinase), excluding water from the active site; haemoglobin switches between T and R quaternary states as oxygen binds ([[biochemistry/enzyme-regulation]]). Two limiting mechanisms describe how.

::: definition Induced fit and conformational selection {#def-induced-fit}
In **induced fit** (D. E. Koshland, 1958), the ligand binds the unliganded conformation and then induces the change to the bound conformation. In **conformational selection** (also called population shift; an idea implicit in the model of J. Monod, J. Wyman and J.-P. Changeux, 1965), the protein already samples the bound conformation, at low population, before the ligand arrives; the ligand binds preferentially to that conformation and so shifts the equilibrium towards it. Both mechanisms reach the same final equilibrium; they differ in the order of steps, which can be distinguished only by kinetics.
:::

::: proposition Apparent affinity under conformational selection {#prop-conf-selection}
Let a protein exist in an inactive conformation I and an active conformation A, with $K_\mathrm{conf} = [\mathrm A]/[\mathrm I]$, and let the ligand bind only A, with dissociation constant $K_\mathrm d^\ast$. Then the apparent dissociation constant for binding to the protein as a whole is

$$
K_\mathrm d^\mathrm{app} = K_\mathrm d^\ast\Bigl(1 + \frac{1}{K_\mathrm{conf}}\Bigr).
$$ {#eq-conf-selection}
:::

::: proof
The fraction bound is $[\mathrm{AL}]/([\mathrm I] + [\mathrm A] + [\mathrm{AL}])$. With $[\mathrm I] = [\mathrm A]/K_\mathrm{conf}$ and $[\mathrm{AL}] = [\mathrm A][\mathrm L]/K_\mathrm d^\ast$, dividing through by $[\mathrm A]$ gives $\theta = ([\mathrm L]/K_\mathrm d^\ast)/(1 + 1/K_\mathrm{conf} + [\mathrm L]/K_\mathrm d^\ast) = [\mathrm L]/(K_\mathrm d^\ast(1 + 1/K_\mathrm{conf}) + [\mathrm L])$, a simple binding curve with the stated apparent constant.
:::

::: example The cost of a rare conformation {#ex-conf-selection}
A kinase spends 1 % of its time in the conformation that an inhibitor binds, with intrinsic $K_\mathrm d^\ast = 1$ nmol L⁻¹. What is the apparent $K_\mathrm d$? A mutation raises the population of that conformation to 10 %. What happens to the apparent affinity, and what is the corresponding change in binding free energy at 25 °C?
::: solution
With 1 % in A, $K_\mathrm{conf} = 0.01/0.99 = 0.0101$ and $K_\mathrm d^\mathrm{app} = 1\times(1 + 99) = 100$ nmol L⁻¹: the inhibitor pays $RT\ln100 = 11.4$ kJ mol⁻¹ to select a rare conformation. With 10 %, $K_\mathrm{conf} = 0.111$ and $K_\mathrm d^\mathrm{app} = 1\times(1 + 9) = 10$ nmol L⁻¹, tenfold tighter, a change of $-RT\ln10 = -5.7$ kJ mol⁻¹, although the mutation is far from the binding site and the intrinsic contacts are unchanged. Mutations that alter conformational equilibria are a common cause of drug resistance and of drug sensitivity in kinases; imatinib, which binds an inactive conformation of the Abl kinase, is a well-studied example.
:::
:::

::: widget plot
f: 1/(1 + 10^(s - x)); 1/(1 + 10^(s + ln(1 + 1/K)/ln(10) - x))
x: -12, -4
y: 0, 1
sliders: s=-9:-11:-6:0.1; K=0.0101:0.001:10:0.001
labels: \text{ligand binding A only (intrinsic)}; \text{whole protein (apparent)}
caption: Fraction of protein bound against $\log_{10}$ of free ligand concentration (mol L⁻¹), from [[#eq-conf-selection]]. The first curve is binding to the active conformation alone, with $\log_{10}K_\mathrm d^\ast = s$; the second is binding to the protein as a whole when only a fraction $K/(1+K)$ of it is in that conformation. With the default $K = 0.0101$ (1 % active) the apparent curve lies two log units to the right, as in [[#ex-conf-selection]]. Raise $K$ above 1 and the two curves nearly merge: once the selected conformation dominates, conformational selection costs almost nothing.
:::

Kinetics can separate the two mechanisms. For induced fit, the observed rate of the conformational step increases with ligand concentration and saturates; for conformational selection with a slow conformational change, it can *decrease* with ligand concentration, because more and more of the reaction flux must wait for the slow isomerisation of unliganded protein. Stopped-flow, relaxation-dispersion NMR ([[structural-biology/nmr-spectroscopy]]) and single-molecule FRET have shown that many systems use both, in proportions that depend on conditions.

### Populations and the Boltzmann factor

A protein's conformations are populated according to their free energies. For two states differing by $\Delta G$, the population of the higher one is

$$
p = \frac{e^{-\Delta G/RT}}{1 + e^{-\Delta G/RT}},
$$ {#eq-boltzmann}

so a state 5 kJ mol⁻¹ above the ground state is populated 12 % of the time at 25 °C, one 10 kJ mol⁻¹ above about 2 %, one 20 kJ mol⁻¹ above 0.03 %. Such "excited states" are invisible in a crystal structure but can dominate function: an enzyme may adopt its catalytically competent conformation only a few per cent of the time, and its turnover rate may be set by how fast it reaches it.

::: widget plot
f: exp(-x/(0.008314*T))/(1 + exp(-x/(0.008314*T)))
x: -10, 25
y: 0, 1
sliders: T=298:250:370:1
labels: p_\text{state 2}
vlines: 5; 10
caption: The population of the second of two conformations against its free energy relative to the first (kJ mol⁻¹), from [[#eq-boltzmann]], at temperature $T$ (K). A free-energy difference of zero gives 50 %; each additional 5.7 kJ mol⁻¹ at 25 °C divides the population ratio by ten. Raise $T$ and the curve flattens: higher temperature populates higher-energy states more.
:::

## Molecular dynamics

Experiments give ensemble averages and a few rates. **Molecular dynamics** (MD) simulation gives a movie: the trajectory of every atom of a protein in water, computed from a model of the forces between them.

::: definition Molecular mechanics force field {#def-force-field}
A **force field** gives the potential energy $U$ of a molecular system as a sum of simple terms in the atomic coordinates:

$$
U = \sum_\text{bonds}k_b(b - b_0)^2 + \sum_\text{angles}k_\theta(\theta - \theta_0)^2 + \sum_\text{torsions}k_\phi\bigl[1 + \cos(n\phi - \delta)\bigr] + \sum_{i<j}\left(4\varepsilon_{ij}\Bigl[\Bigl(\frac{\sigma_{ij}}{r_{ij}}\Bigr)^{12} - \Bigl(\frac{\sigma_{ij}}{r_{ij}}\Bigr)^6\Bigr] + \frac{q_iq_j}{4\pi\varepsilon_0 r_{ij}}\right).
$$ {#eq-force-field}

The first three sums describe covalent geometry; the last describes non-bonded interactions between atoms $i$ and $j$ at distance $r_{ij}$: the **Lennard-Jones** term (repulsion at short range, dispersion attraction at longer range) and the **Coulomb** term between partial charges $q$. The parameters ($k_b$, $b_0$, …, $\varepsilon_{ij}$, $\sigma_{ij}$, $q_i$) are fitted to quantum-mechanical calculations and experimental data on small molecules. Widely used protein force fields include the AMBER, CHARMM, GROMOS and OPLS families.
:::

::: widget plot
f: 4*e*((s/x)^12 - (s/x)^6)
x: 2.5, 8
y: -1.2, 1.5
sliders: e=0.65:0.1:1:0.01; s=3.4:3:4:0.01
labels: U_\mathrm{LJ}\ (\mathrm{kJ\,mol^{-1}})
hlines: 0
caption: The Lennard-Jones term of [[#eq-force-field]] for a pair of atoms against their separation (Å), with well depth $\varepsilon$ (kJ mol⁻¹) and size $\sigma$ (Å) set by the sliders; the defaults are typical of two carbon atoms. The minimum lies at $2^{1/6}\sigma \approx 1.12\sigma$ (3.8 Å by default) with depth $\varepsilon$; inside $\sigma$ the energy rises steeply. Each such contact contributes less than one $k_\mathrm BT$, but a well-packed core has thousands of them, which is why packing matters so much for stability.
:::

Given the forces $\mathbf F_i = -\partial U/\partial\mathbf r_i$, Newton's equations $m_i\ddot{\mathbf r}_i = \mathbf F_i$ are integrated numerically in small time steps. The time step must be short compared with the fastest motion, the stretching of bonds to hydrogen (period about 10 fs), so it is usually 1–2 fs with those bonds constrained. The standard integrator is the **velocity Verlet** algorithm, which is simple, time-reversible and conserves energy well over long runs:

```python
import math

# Velocity Verlet for a single particle in a harmonic well (illustration; MD does this
# for ~10^5 atoms in 3D with the force field of the definition above).
k, m, dt = 1.0, 1.0, 0.1          # force constant, mass, time step (arbitrary units)
x, v = 1.0, 0.0                   # initial position and velocity

def accel(x):
    return -k * x / m

for step in range(int(10 * 2 * math.pi / dt)):   # about ten periods
    v += 0.5 * dt * accel(x)      # half kick
    x += dt * v                   # drift
    v += 0.5 * dt * accel(x)      # half kick

energy = 0.5 * k * x**2 + 0.5 * m * v**2
print(round(energy, 4))           # stays close to the initial 0.5
```

A simulation of a protein in a box of water molecules typically contains $10^4$–$10^6$ atoms, with periodic boundary conditions and long-range electrostatics computed by Ewald summation in Fourier space. Temperature and pressure are held constant by thermostats and barostats that mimic contact with surroundings.

::: example How long is a simulation? {#ex-md-steps}
How many time steps of 2 fs are needed to simulate 1 μs and 1 ms? If a GPU computes 2,000 steps per second for a 100,000-atom system (illustrative), how long do these simulations take?
::: solution
1 μs requires $10^{-6}/(2\times10^{-15}) = 5\times10^8$ steps, and 1 ms $5\times10^{11}$ steps. At 2,000 steps per second these take $2.5\times10^5$ s (about 3 days) and $2.5\times10^8$ s (about 8 years). Microsecond simulations are routine; millisecond simulations, the timescale of many conformational changes and of folding of all but the fastest proteins, need special-purpose hardware or enhanced sampling.
:::
:::

The first MD simulation of a protein, bovine pancreatic trypsin inhibitor *in vacuo* for 9.2 ps (J. A. McCammon, B. R. Gelin and M. Karplus, 1977), showed that a folded protein is a fluid-like, fluctuating object. Martin Karplus, Michael Levitt and Arieh Warshel received the Nobel Prize in Chemistry in 2013 for multiscale models of complex chemical systems. The special-purpose Anton machines of D. E. Shaw Research (from 2008) reached milliseconds, folding small proteins ([[structural-biology/structure-prediction]]) and following drugs as they found their binding sites. Methods that bypass brute force are widespread: **enhanced sampling** (replica exchange, metadynamics) accelerates crossing of barriers; **Markov state models** stitch many short simulations into a kinetic network of states; **coarse-grained** models (such as MARTINI, which represents about four heavy atoms by one bead) simulate membranes and large assemblies; and **alchemical free-energy calculations** (free-energy perturbation) compute differences in binding free energy between related ligands to within about 4–5 kJ mol⁻¹ for favourable systems, now used routinely in drug discovery.

::: warning A simulation is only as good as its force field and its sampling
An MD trajectory looks like reality, but every frame depends on approximations: fixed partial charges without electronic polarisation, simplified water models, and parameters fitted to small molecules. Older force fields, for example, made disordered proteins too compact and over-stabilised helices, errors corrected only when simulations were compared with NMR and SAXS data. Equally serious is sampling: a 1 μs simulation of a process that takes 1 ms will almost never show it, and averages over a trajectory that has not visited all relevant states are biased. Conclusions from simulation should be tested against experiment, and simulations should be repeated from different starting points.
:::

## Protein design

If we understand how sequences determine structures, we should be able to run the problem backwards: choose a structure, or a function, and find a sequence that produces it.

::: definition The inverse folding problem {#def-design}
**Protein design** seeks an amino-acid sequence whose lowest-free-energy structure is a chosen target structure (or that carries out a chosen function), and that folds to it robustly. Because the sequence space is vast — $20^{100} \approx 10^{130}$ sequences of 100 residues — design relies on energy functions or learned models to score sequences for a structure, and on efficient search. A designed sequence must not only fit the target well (**positive design**) but also fit all competing structures badly (**negative design**), so that the target is the deep minimum of a funnel ([[structural-biology/protein-folding]]).
:::

Early successes were rule-based. Peptides designed with heptad repeats formed coiled coils of the intended oligomeric state ([[structural-biology/protein-architecture]]), and W. F. DeGrado's group designed four-helix bundles in the late 1980s. Computational design with physics-based energy functions began with S. L. Mayo's fully automated design of a zinc-finger fold without zinc (B. I. Dahiyat and S. L. Mayo, 1997). In 2003 B. Kuhlman, D. Baker and colleagues designed **Top7**, a 93-residue α/β protein with a fold not observed in nature, using Rosetta to alternate between sequence design and backbone optimisation; its crystal structure matched the design to 1.2 Å RMSD.

Designing function proved harder. The first computationally designed enzymes, for the Kemp elimination (D. Röthlisberger and colleagues, 2008) and a retro-aldol reaction (L. Jiang and colleagues, 2008), had activities $10^5$–$10^8$ times lower than natural enzymes; **directed evolution** — repeated rounds of random mutation and selection for activity, developed by Frances Arnold (Nobel Prize in Chemistry 2018) — then raised them by orders of magnitude, and the evolved variants showed what the designs had missed: precise positioning of catalytic groups, pre-organisation and the right dynamics.

::: example How much has evolution improved a design? {#ex-design}
A designed Kemp eliminase has $k_\mathrm{cat}/K_\mathrm M = 10^2$ M⁻¹ s⁻¹; after 17 rounds of directed evolution, a variant reaches $2\times10^5$ M⁻¹ s⁻¹ (illustrative values in the range reported). What is the average improvement per round, and what difference in activation free energy (at 25 °C) does the total improvement correspond to?
::: solution
The total improvement is $2\times10^3$-fold, so the average per round is $(2\times10^3)^{1/17} = e^{7.60/17} = e^{0.447} = 1.56$, about 1.6-fold per round. The corresponding lowering of the activation free energy for $k_\mathrm{cat}/K_\mathrm M$ (by transition-state theory, [[biochemistry/enzymes]]) is $RT\ln(2\times10^3) = 2.479\times7.60 = 18.8$ kJ mol⁻¹ — comparable with the effect of a few well-placed hydrogen bonds or a better-positioned catalytic base. Each round of evolution typically found mutations worth 1–2 kJ mol⁻¹, many of them far from the active site, acting by tuning the active site's geometry and dynamics.
:::
:::

### Deep-learning design

The networks that solved structure prediction transformed design. Running a prediction network "in reverse" — searching for sequences that the network predicts, with high confidence, to fold into some structure — generated proteins with new folds (I. Anishchenko and colleagues, "hallucination", 2021). **ProteinMPNN** (J. Dauparas and colleagues, 2022) designs sequences for a given backbone with much higher experimental success than physics-based methods. **RFdiffusion** (J. L. Watson and colleagues, 2023), a generative model adapted from image diffusion methods, creates new backbones conditioned on a functional site, a symmetry or a binding target. The usual pipeline now generates thousands of backbones with a diffusion model, designs sequences for them, filters by predicting their structures with an independent network, and tests a few hundred in the laboratory; for many binding targets, binders with nanomolar affinity are found among tens of designs. Design tools for complexes with small molecules, nucleic acids and metals followed (2024 onwards).

::: algorithm A modern design pipeline {#alg-design}
1. **Specify** the goal: a fold, a symmetric assembly, a binder to a target surface, or a scaffold presenting a functional motif.
2. **Generate backbones** that satisfy the specification (for example with a diffusion model conditioned on the target).
3. **Design sequences** for each backbone (for example with an inverse-folding network such as ProteinMPNN), several per backbone.
4. **Filter in silico**: predict the structure of each sequence with an independent prediction network and keep those whose prediction matches the design with high confidence (low RMSD, high pLDDT, low interface PAE).
5. **Test** a manageable number in the laboratory (expression, folding by CD, binding by surface plasmon resonance or yeast display, structure by crystallography or cryo-EM) and feed failures back into the methods.
:::

::: application Designed proteins in use
A designed two-component icosahedral nanoparticle displaying the receptor-binding domain of the SARS-CoV-2 spike (A. C. Walls, N. P. King, D. Veesler and colleagues, 2020) became the basis of a vaccine approved in South Korea in 2022, the first approved medicine based on a computationally designed protein assembly. Designed binders that neutralise toxins, designed cytokine mimics, designed protein sensors and switches, and enzymes for industrial chemistry are in various stages of development.
:::

::: quiz
A designed sequence is predicted by a structure-prediction network to fold into the intended backbone with pLDDT above 90, but when expressed it is insoluble and shows no circular-dichroism signal for secondary structure. Which conclusion is best?
- [ ] The prediction network must be inaccurate for all sequences.
- [x] The prediction is a hypothesis about the lowest-energy structure only; the sequence may aggregate, fold too slowly, or have a competing structure of similar energy.
- [ ] The design must be correct, and the experiment should be repeated until it works.
- [ ] Circular dichroism cannot detect secondary structure in designed proteins.
::: solution
Prediction says, in effect, "if this chain folds, it probably folds like this". It says nothing about solubility, expression, folding kinetics, aggregation or competing minima — the problems of negative design and of folding in a cell ([[structural-biology/protein-folding]]). Filtering designs by prediction raises success rates greatly but does not guarantee any individual design, which is why pipelines test many and report success as a fraction.
:::
:::

::: intuition Function needs the right motions, not only the right shape
A designed binder needs a rigid, complementary surface, and rigidity is something design is good at: many successful designs are more stable and more rigid than natural proteins. An enzyme is harder, because catalysis requires a sequence of states — substrate bound, transition state stabilised, product released — and so a protein that can change shape in a controlled way, with the right groups arriving at the right moment. This is probably why designed binders now succeed routinely while designed enzymes still start orders of magnitude behind natural ones, and why directed evolution, which optimises whatever matters without needing to understand it, remains the best way to finish the job.
:::

::: history
Molecular dynamics began with simulations of liquids in the 1950s and 1960s (B. J. Alder and T. E. Wainwright; A. Rahman; L. Verlet, whose integrator of 1967 is still used) and reached proteins in 1977 with McCammon, Gelin and Karplus's 9.2 ps trajectory of bovine pancreatic trypsin inhibitor. Force fields for biomolecules were developed through the 1980s and 1990s by the groups of Martin Karplus (CHARMM), Peter Kollman (AMBER), Wilfred van Gunsteren (GROMOS) and William Jorgensen (OPLS). On the design side, Bernd Gutte's and William DeGrado's designed peptides of the 1970s and 1980s gave way to automated design with the zinc-finger fold of Dahiyat and Mayo (1997) and the novel fold Top7 of Kuhlman, Baker and colleagues (2003). Frances Arnold's directed evolution (from 1993) showed that laboratory evolution could optimise what rational design could not. Deep generative models (hallucination, 2021; ProteinMPNN, 2022; RFdiffusion, 2023) raised design success rates sharply, and the 2024 Nobel Prize in Chemistry recognised David Baker's work on computational protein design alongside structure prediction.
:::

## Where this leads

This is the last chapter of the course. The structures, methods and ideas met here are applied throughout biology: in [[bioinformatics]], where structures and predicted models are compared and searched at the scale of whole proteomes; in [[systems-biology]], where the kinetics of binding and conformational change become the parameters of network models; in [[biotechnology]], where designed and engineered proteins are put to work; and in [[biochemistry/enzymes]] and [[biochemistry/enzyme-regulation]], whose mechanisms and allostery are now read from structures as a matter of course.

::: summary
- Affinity, free energy and kinetics: $\Delta G^\circ = RT\ln K_\mathrm d$ (a factor of 10 in $K_\mathrm d$ is 5.7 kJ mol⁻¹ at 25 °C), $K_\mathrm d = k_\mathrm{off}/k_\mathrm{on}$, residence time $1/k_\mathrm{off}$.
- A ligand stabilises the states it binds: $\Delta G_\mathrm U$ rises by $RT\ln(1 + [\mathrm L]/K_\mathrm d)$ ([[#eq-linkage]]); under conformational selection the apparent affinity is weakened by $1 + 1/K_\mathrm{conf}$ ([[#eq-conf-selection]]).
- Conformational populations follow the Boltzmann factor; functionally important "excited states" of a few per cent are invisible in a single structure but measurable by NMR and single-molecule methods.
- Molecular dynamics integrates Newton's equations with an empirical force field ([[#eq-force-field]]) in 1–2 fs steps; microseconds are routine, milliseconds expensive. Force-field errors and insufficient sampling are the two standing limitations.
- Design solves the inverse problem, needing positive and negative design; from rule-based coiled coils and Top7 to diffusion models and inverse-folding networks, with directed evolution still essential for catalysis.
:::

## Exercises

::: exercise From $K_\mathrm d$ to free energy {level=1 check="-34.2"}
What is the standard binding free energy (kJ mol⁻¹, three significant figures) for $K_\mathrm d = 1.0$ μmol L⁻¹ at 25 °C?
::: solution
$\Delta G^\circ = RT\ln(10^{-6}) = 2.479\times(-13.82) = -34.2$ kJ mol⁻¹.
:::
:::

::: exercise A residence time {level=1 check="693"}
A complex has $k_\mathrm{off} = 10^{-3}$ s⁻¹. What is its half-life in seconds?
::: solution
$\ln2/10^{-3} = 693$ s, about 12 minutes.
:::
:::

::: exercise A Boltzmann population {level=1 check="0.02"}
What fraction of molecules occupies a conformation 10 kJ mol⁻¹ above the ground state at 25 °C (two significant figures)?
::: solution
$e^{-10/2.479} = 0.0176$, and $p = 0.0176/1.0176 = 0.017$, about 2 %.
:::
:::

::: exercise Stabilisation by a ligand {level=2 check="11.4"}
A protein with $\Delta G_\mathrm U = 20$ kJ mol⁻¹ binds a ligand with $K_\mathrm d = 1$ μmol L⁻¹. By how much (kJ mol⁻¹, three significant figures) does 100 μmol L⁻¹ of free ligand raise its apparent stability at 25 °C? What is the new $T_\mathrm m$ shift, qualitatively?
::: solution
$RT\ln(1 + 100/1) = 2.479\ln(101) = 2.479\times4.615 = 11.4$ kJ mol⁻¹, raising the apparent stability from 20 to 31.4 kJ mol⁻¹. Since $\Delta G_\mathrm U$ falls by roughly $\Delta H_\mathrm m/T_\mathrm m$ per kelvin near $T_\mathrm m$ (typically 1 kJ mol⁻¹ K⁻¹ or more), the melting temperature rises by several degrees — the signal measured in a thermal-shift assay.
:::
:::

::: exercise Conformational selection and drug resistance {level=2 check="5.7"}
An inhibitor binds the inactive conformation of a kinase with intrinsic $K_\mathrm d^\ast = 2$ nmol L⁻¹; in the wild-type enzyme that conformation has a population of 20 %. A resistance mutation lowers the population to 2 %. Calculate the apparent $K_\mathrm d$ in each case and the loss of binding free energy (kJ mol⁻¹, two significant figures) at 25 °C.
::: solution
Wild type: $K_\mathrm{conf} = 0.2/0.8 = 0.25$, so $K_\mathrm d^\mathrm{app} = 2(1 + 4) = 10$ nmol L⁻¹. Mutant: $K_\mathrm{conf} = 0.02/0.98 = 0.0204$, so $K_\mathrm d^\mathrm{app} = 2(1 + 49) = 100$ nmol L⁻¹. Affinity is lost tenfold, which costs $RT\ln10 = 5.7$ kJ mol⁻¹, although the binding site itself is unchanged. Mutations that merely shift a conformational equilibrium are therefore a route to resistance that structures of the drug–target complex alone would not reveal.
:::
:::

::: exercise Distinguishing mechanisms {level=2}
For a protein binding a ligand, stopped-flow experiments give an observed relaxation rate that *decreases* with ligand concentration before levelling off. (a) Which mechanism does this favour, and why? (b) What would induced fit predict? (c) What independent evidence from NMR would support your answer?
::: solution
(a) Conformational selection with a slow isomerisation: as ligand increases, more of the protein that is in the binding-competent conformation is captured quickly, and the overall relaxation becomes limited by the slow conversion of the remaining unliganded protein, so the observed rate falls towards the isomerisation rate. (b) Induced fit predicts the observed rate to *increase* with ligand concentration and saturate at the sum of the forward and reverse rates of the induced conformational step, because the conformational change happens after binding. (c) Relaxation-dispersion NMR on the free protein should detect an excited state with chemical shifts matching the bound conformation, present at the population and exchange rate inferred from the kinetics.
:::
:::

::: exercise Sampling in a simulation {level=2}
A loop closes over an active site with a rate of $10^4$ s⁻¹ and opens at $10^4$ s⁻¹. (a) How many closing events would you expect in a 10 μs simulation? (b) How long a simulation would be needed to estimate the two rates to within about 10 %, assuming Poisson statistics and that you need the standard error of a rate to be 10 %? (c) Why does running ten independent 10 μs simulations help?
::: solution
(a) The mean waiting time to close is 100 μs, so in 10 μs the expected number of events is 0.1: most such simulations would show none. (b) For a Poisson count $n$, the relative standard error is $1/\sqrt n$, so 10 % needs $n = 100$ events of each kind, i.e. about $100\times100$ μs $= 10$ ms of simulation — beyond routine means. (c) Ten independent runs give ten independent chances to observe the transition and, crucially, allow the variability between runs to be assessed; they also combine naturally in a Markov state model, which can estimate the slow rates from many short trajectories that each capture only part of the kinetics.
:::
:::

::: exercise Positive and negative design {level=3}
A designed four-helix bundle is intended to be a monomer. The designed protein is folded and stable by circular dichroism, but gel filtration and native mass spectrometry show it is a dimer with eight helices. (a) What has gone wrong, in terms of positive and negative design? (b) Why is this failure mode common for helical designs? (c) Suggest two changes to the sequence, and one computational check, that would favour the monomer.
::: solution
(a) Positive design succeeded — the helices are formed and packed — but negative design failed: an alternative structure, the dimer, was not penalised, and it buries at least as much hydrophobic surface as the intended monomer. (b) A helical bundle's interactions are largely local and modular, so the same hydrophobic stripes can pack in several registers and stoichiometries; coiled-coil studies showed long ago that small changes at the core positions switch between dimers, trimers and tetramers. (c) Place β-branched residues (Val, Ile) and specific polar contacts at core positions in the pattern known to favour the intended oligomeric state; shorten or kink the helices and add loops of defined length that cannot be satisfied by the dimer; introduce charged residues on the outer faces to repel a second copy. Computationally, predict or dock the designed sequence as a dimer and higher oligomer (for example with a multimer-prediction network) and keep only designs whose monomeric prediction is confident and whose oligomeric predictions are not.
:::
:::

::: exercise Reading an ITC experiment {level=3}
ITC of a ligand binding a protein at 25 °C gives $K_\mathrm d = 50$ nmol L⁻¹ and $\Delta H = -60$ kJ mol⁻¹. A chemical modification of the ligand that adds a methyl group buried in a hydrophobic pocket gives $K_\mathrm d = 5$ nmol L⁻¹ and $\Delta H = -45$ kJ mol⁻¹. (a) Calculate $\Delta G^\circ$ and $-T\Delta S^\circ$ for both. (b) Interpret the change in thermodynamic terms. (c) Why would comparing only enthalpies have been misleading?
::: solution
(a) First: $\Delta G^\circ = 2.479\ln(5\times10^{-8}) = -41.8$ kJ mol⁻¹, so $-T\Delta S^\circ = \Delta G^\circ - \Delta H = -41.8 + 60 = +18.2$ kJ mol⁻¹ (entropically unfavourable). Second: $\Delta G^\circ = 2.479\ln(5\times10^{-9}) = -47.5$ kJ mol⁻¹ and $-T\Delta S^\circ = -47.5 + 45 = -2.5$ kJ mol⁻¹ (slightly favourable). (b) The methyl group improves affinity tenfold (5.7 kJ mol⁻¹), but the gain is entropic — consistent with the hydrophobic effect, which releases ordered water from the pocket and from the ligand's surface — while the enthalpy becomes less favourable, perhaps because the ligand is strained or some polar contacts are lengthened. This is enthalpy–entropy compensation. (c) Enthalpy alone would have suggested the modification was harmful; only the free energy determines affinity. Conversely, optimising for enthalpy ("enthalpy-driven binding") is a heuristic in medicinal chemistry, not a rule, and must always be checked against $\Delta G$.
:::
:::
