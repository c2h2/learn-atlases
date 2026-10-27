Propranolol and the hormone adrenaline both bind the β-adrenoceptor, in the same pocket, with an affinity that differs by a few orders of magnitude in propranolol's favour. Yet adrenaline makes the heart beat faster and propranolol does nothing at all, except stop adrenaline from acting. Two questions are hidden here, and they are the two questions of this chapter. The first is about **affinity**: what holds a molecule in a pocket, how strongly, and for how long? The answer is a free energy, $\Delta_\mathrm{b}G^\circ$, built from hydrogen bonds, ionic interactions, dispersion forces and the hydrophobic effect, all of them paid for against the cost of stripping water from both partners and of freezing the ligand's motion. The second is about **efficacy**: once bound, does the molecule switch the receptor on, partly on, or not at all? That property is not a free energy of binding but a property of the complex, and it is measured through dose–response curves.

We build on [[medicinal-chemistry/drug-targets]], where the fractional occupancy $\theta = [\mathrm{L}]/(K_\mathrm{d} + [\mathrm{L}])$ was introduced, and on the account of noncovalent interactions in water in [[biochemistry/water-noncovalent]] and of binding equilibria in [[biochemistry/protein-function]]. The thermodynamic tools are those of [[thermodynamics/reaction-equilibrium]]. Drugs named in the chapter illustrate chemistry and pharmacology; nothing here is medical advice.

## The free energy of binding

A dissociation constant is an equilibrium constant, and every equilibrium constant is a standard Gibbs energy in disguise.

::: proposition Binding free energy and the dissociation constant {#prop-dg}
For the binding equilibrium $\mathrm{R + L \rightleftharpoons RL}$ in dilute solution, with dissociation constant $K_\mathrm{d}$ expressed in $\mathrm{mol\,dm^{-3}}$ and standard concentration $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, the standard Gibbs energy of binding is
$$
\Delta_\mathrm{b}G^\circ = RT\ln\frac{K_\mathrm{d}}{c^\circ} = -RT\ln 10 \times \mathrm{p}K_\mathrm{d}, \qquad \Delta_\mathrm{b}G^\circ = \Delta_\mathrm{b}H^\circ - T\Delta_\mathrm{b}S^\circ .
$$ {#eq-dg}
At $298\ \mathrm{K}$, $\Delta_\mathrm{b}G^\circ = -5.71\,\mathrm{p}K_\mathrm{d}\ \mathrm{kJ\,mol^{-1}}$.
:::

::: proof
The association constant is $K_\mathrm{a} = 1/K_\mathrm{d}$, and in the dilute-solution (ideal) limit the thermodynamic equilibrium constant of the association is $K = K_\mathrm{a}c^\circ = c^\circ/K_\mathrm{d}$, each concentration being divided by $c^\circ$ to make the activities dimensionless. The general relation $\Delta_\mathrm{r}G^\circ = -RT\ln K$ ([[thermodynamics/reaction-equilibrium]]) then gives $\Delta_\mathrm{b}G^\circ = -RT\ln(c^\circ/K_\mathrm{d}) = RT\ln(K_\mathrm{d}/c^\circ)$. Writing $\ln x = \ln 10\,\log_{10}x$ and $\mathrm{p}K_\mathrm{d} = -\log_{10}(K_\mathrm{d}/c^\circ)$ gives the second form; $RT\ln 10 = (8.314)(298.15)(2.3026)\ \mathrm{J\,mol^{-1}} = 5.71\ \mathrm{kJ\,mol^{-1}}$.
:::

Two points about [[#eq-dg]] are easy to miss. First, $\Delta_\mathrm{b}G^\circ$ depends on the choice of standard state: it describes binding from a $1\ \mathrm{mol\,dm^{-3}}$ solution, a concentration no drug ever reaches, and its *entropy* part includes the loss of translational freedom of the ligand on going from that concentration into the complex. Absolute values are therefore conventional; *differences* between ligands binding the same protein are not. Second, the scale is logarithmic and compressed: the whole range of drug potency, from a millimolar fragment ($\mathrm{p}K_\mathrm{d} = 3$) to a picomolar antibody ($\mathrm{p}K_\mathrm{d} = 12$), spans only $-17$ to $-68\ \mathrm{kJ\,mol^{-1}}$ — a few typical covalent bonds' worth of energy would exceed all of it. Drug design is a struggle for a few kilojoules per mole at a time.

The enthalpy and entropy can be separated experimentally by **isothermal titration calorimetry** (ITC): ligand is injected into a cell containing the protein, and the heat released at each injection gives both $\Delta_\mathrm{b}H^\circ$ (directly) and $K_\mathrm{d}$ (from the shape of the titration curve), hence $T\Delta_\mathrm{b}S^\circ$ by difference.

::: example An ITC measurement {#ex-itc}
ITC at $25\ \mathrm{^\circ C}$ gives $K_\mathrm{d} = 10\ \mathrm{nmol\,dm^{-3}}$ and $\Delta_\mathrm{b}H^\circ = -60\ \mathrm{kJ\,mol^{-1}}$ for an inhibitor binding to its enzyme. Find $\Delta_\mathrm{b}G^\circ$, $-T\Delta_\mathrm{b}S^\circ$ and $\Delta_\mathrm{b}S^\circ$, and comment.
::: solution
By [[#eq-dg]], $\Delta_\mathrm{b}G^\circ = (8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})\ln(1.0\times10^{-8}) = -45.7\ \mathrm{kJ\,mol^{-1}}$. Then $-T\Delta_\mathrm{b}S^\circ = \Delta_\mathrm{b}G^\circ - \Delta_\mathrm{b}H^\circ = -45.7 - (-60) = +14.3\ \mathrm{kJ\,mol^{-1}}$, so $\Delta_\mathrm{b}S^\circ = -14.3\times10^{3}/298.15 = -48\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Binding is **enthalpy-driven** and opposed by entropy: the favourable heat comes from hydrogen bonds and close van der Waals contacts, and the unfavourable entropy from freezing the ligand's rotations and translations (partly offset by released water). A comparable inhibitor could reach the same $K_\mathrm{d}$ with a smaller $\Delta H$ and a favourable entropy if it bound mainly through the hydrophobic effect.
:::
:::

A pervasive observation in such data is **enthalpy–entropy compensation**: a chemical change that makes $\Delta_\mathrm{b}H^\circ$ more negative (a tighter hydrogen bond, say) often makes $T\Delta_\mathrm{b}S^\circ$ more negative too (a more rigid complex), so that $\Delta_\mathrm{b}G^\circ$ changes much less than either. Part of this is physical — a stronger interaction restricts motion — and part is statistical, because $\Delta G$ is measured more precisely than $\Delta H$ and errors in $\Delta H$ appear with opposite sign in $T\Delta S$. Compensation is why improving affinity by "adding a hydrogen bond" so often fails.

## The interactions that hold a drug in place

Binding takes place in water, and almost every interaction a drug makes with its protein replaces an interaction that both partners were already making with water. The relevant energy is always that of an **exchange**:
$$
\mathrm{R{\cdots}H_2O} + \mathrm{L{\cdots}H_2O} \rightleftharpoons \mathrm{R{\cdots}L} + \mathrm{H_2O{\cdots}H_2O}.
$$
This is the single most important idea for reasoning about binding, and it explains the typical values below (net contributions to $\Delta_\mathrm{b}G^\circ$ of an interaction formed in a well-fitting complex, not gas-phase energies).

| interaction | typical gas-phase energy / $\mathrm{kJ\,mol^{-1}}$ | typical net contribution in water / $\mathrm{kJ\,mol^{-1}}$ |
|---|---|---|
| ionic (salt bridge), e.g. $\mathrm{R{-}NH_3^+\cdots{}^-O_2C{-}R'}$ | several hundred | $0$ to $-15$; up to $-20$ if buried and well positioned |
| neutral hydrogen bond, e.g. $\mathrm{N{-}H\cdots O{=}C}$ | $-15$ to $-30$ | $0$ to $-6$ |
| charge-assisted hydrogen bond | $-40$ to $-100$ | $-4$ to $-12$ |
| van der Waals (dispersion) contact, per heavy atom in close contact | $-2$ to $-4$ | about $-1$ to $-2$ |
| hydrophobic effect | — | about $-0.1\ \mathrm{kJ\,mol^{-1}}$ per $\text{Å}^2$ of nonpolar surface buried; about $-3$ per $\mathrm{CH_2}$ |
| cation–π (ammonium over an aromatic ring) | $-40$ to $-80$ | $-2$ to $-8$ |
| halogen bond, $\mathrm{C{-}X\cdots O}$ ($\mathrm{X = Cl, Br, I}$) | $-5$ to $-20$ | $0$ to $-5$ |

The numbers in the right-hand column are order-of-magnitude guides from analyses of many protein–ligand complexes, not constants: the same hydrogen bond can contribute nothing if a donor or acceptor is left unsatisfied elsewhere, or more than $10\ \mathrm{kJ\,mol^{-1}}$ if it is shielded from water.

**Ionic interactions** are strong in the gas phase but heavily screened in water (relative permittivity about 80) and carry a large **desolvation penalty**: an ammonium ion must shed a tightly held hydration shell. Salt bridges at the protein surface contribute little; buried ones, such as that between the protonated amine of most aminergic GPCR ligands and a conserved aspartate (Asp3.32) in the receptor, can anchor a whole class of drugs.

**Hydrogen bonds** are directional ($\mathrm{N{-}H\cdots O}$ near-linear, donor–acceptor distance $2.7$–$3.1\ \text{Å}$). In water a hydrogen bond to the protein replaces one to water, so the net gain is small — unless the protein's partner group is in a pocket where water cannot satisfy it well. Conversely, burying a polar group of the ligand *without* a hydrogen-bond partner costs a desolvation penalty of several kilojoules per mole, which is why adding a hydroxyl group in the wrong place can make a molecule bind tenfold *less* well.

**Van der Waals interactions** — dispersion attraction balanced by short-range repulsion — are individually weak and nondirectional but numerous; a drug in a snug pocket may make dozens of contacts. They reward shape complementarity, and they reward it steeply because dispersion falls off as $r^{-6}$: a gap of $1\ \text{Å}$ between ligand and pocket wall loses most of the attraction.

The **hydrophobic effect** is not an attraction between nonpolar groups at all but a consequence of water's structure ([[biochemistry/water-noncovalent]]). Water around a nonpolar surface cannot form its full hydrogen-bond network; burying that surface releases water to bulk. At room temperature the effect is largely entropic for small solutes. It is the most reliable source of affinity and the main reason drug molecules are fairly lipophilic — with consequences for solubility and metabolism taken up in [[medicinal-chemistry/pharmacokinetics]]. A useful empirical figure is that each methylene group added to a ligand in a hydrophobic pocket can gain up to about $3\ \mathrm{kJ\,mol^{-1}}$, roughly a factor of 3.4 in $K_\mathrm{d}$, about the same as its free energy of transfer from water to octanol.

**Cation–π interactions** place a cation (often a quaternary or protonated amine) over the face of an aromatic ring of tryptophan, tyrosine or phenylalanine, whose π electron cloud carries a partial negative charge above and below the ring. Acetylcholine binds both its esterase and its receptors this way. **Halogen bonds** exploit the **σ-hole**, a region of positive electrostatic potential on the far side of a C–Cl, C–Br or C–I bond along its axis, which interacts with lone pairs of backbone carbonyl oxygens.

Two costs oppose all these gains. Binding freezes the ligand's **rotational and translational** freedom; and each **rotatable bond** that is free in solution but fixed in the complex costs conformational entropy, very roughly $1$–$4\ \mathrm{kJ\,mol^{-1}}$ per bond. Rigid ligands that are already in the bound conformation do not pay this second cost — the rationale for conformational restriction in [[medicinal-chemistry/structure-activity]].

::: example Average group contributions to binding {#ex-andrews}
Peter Andrews, David Craik and Jennifer Martin (*J. Med. Chem.*, 1984) fitted the binding constants of about 200 ligands to an additive model. In their empirical scheme the average intrinsic binding energies (in $\mathrm{kcal\,mol^{-1}}$, favourable taken as positive) are: $\mathrm{N^+}$ 11.5, $\mathrm{CO_2^-}$ 8.2, $\mathrm{OH}$ 2.5, $\mathrm{C{=}O}$ 3.4, ether O 1.1, $\mathrm{sp^2}$ C 0.7, $\mathrm{sp^3}$ C 0.8, with a penalty of 14.0 for the loss of overall rotational and translational entropy and 0.7 per rotatable bond. Estimate the "average" binding energy of propranolol (an ammonium nitrogen, a hydroxyl, an ether oxygen, ten $\mathrm{sp^2}$ carbons of the naphthalene, six $\mathrm{sp^3}$ carbons and six rotatable bonds), convert it to a $\mathrm{p}K_\mathrm{d}$ at $298\ \mathrm{K}$, and compare with its observed $\mathrm{p}K_\mathrm{d}$ at the β-adrenoceptor of about 9.
::: solution
Sum of group terms: $11.5 + 2.5 + 1.1 + 10(0.7) + 6(0.8) = 26.9\ \mathrm{kcal\,mol^{-1}}$. Penalties: $14.0 + 6(0.7) = 18.2$. Net: $8.7\ \mathrm{kcal\,mol^{-1}} = 36.4\ \mathrm{kJ\,mol^{-1}}$, so $\Delta_\mathrm{b}G^\circ \approx -36.4\ \mathrm{kJ\,mol^{-1}}$ and $\mathrm{p}K_\mathrm{d} = 36.4/5.71 = 6.4$. The observed value is about 2.6 units higher. Andrews' numbers describe a ligand that makes the *average* interaction with an *average* receptor; a ligand that beats the estimate by orders of magnitude fits its pocket unusually well, while one far below it fits badly. The scheme is empirical and crude — it ignores geometry entirely — but it gives a useful baseline against which to judge a measured affinity, an idea refined into ligand efficiency in [[medicinal-chemistry/hits-and-leads]].
:::
:::

::: warning A hydrogen bond is not worth 20 kJ mol⁻¹ in binding {#warn-hbond}
It is tempting to add up gas-phase interaction energies — $20\ \mathrm{kJ\,mol^{-1}}$ per hydrogen bond, hundreds for a salt bridge — and conclude that a ligand with five hydrogen bonds must bind with $\Delta G$ near $-100\ \mathrm{kJ\,mol^{-1}}$. This ignores that every one of those groups was hydrogen-bonded to water before binding. The net effect of a hydrogen bond in water is the *difference* between two similar interactions and is typically a few kilojoules per mole, sometimes zero or positive. Gains come from interactions that water makes poorly (dispersion contacts, buried nonpolar surface) and from interactions in places water cannot reach.
:::

## Binding kinetics: how long a drug stays

An equilibrium constant says nothing about how fast equilibrium is reached. For a drug whose concentration rises and falls over hours, the rates of binding and unbinding can matter as much as $K_\mathrm{d}$.

::: proposition Kinetics of one-step binding {#prop-kinetics}
For $\mathrm{R + L} \underset{k_\mathrm{off}}{\overset{k_\mathrm{on}}{\rightleftharpoons}} \mathrm{RL}$:

1. at equilibrium, $K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on}$;
2. with ligand in excess at constant concentration $[\mathrm{L}]$, the complex approaches equilibrium exponentially with observed rate constant
$$
k_\mathrm{obs} = k_\mathrm{on}[\mathrm{L}] + k_\mathrm{off};
$$ {#eq-kobs-bind}
3. when free ligand is removed, the complex decays with rate constant $k_\mathrm{off}$; the mean lifetime of the complex, the **residence time**, is $\tau = 1/k_\mathrm{off}$ and its half-life $\ln 2/k_\mathrm{off}$.
:::

::: proof
The rate equation is $d[\mathrm{RL}]/dt = k_\mathrm{on}[\mathrm{R}][\mathrm{L}] - k_\mathrm{off}[\mathrm{RL}]$. (1) At equilibrium the derivative vanishes, so $[\mathrm{R}][\mathrm{L}]/[\mathrm{RL}] = k_\mathrm{off}/k_\mathrm{on}$, which is $K_\mathrm{d}$ by definition. (2) Write $[\mathrm{R}] = [\mathrm{R}]_0 - [\mathrm{RL}]$ with $[\mathrm{L}]$ constant:
$$
\frac{d[\mathrm{RL}]}{dt} = k_\mathrm{on}[\mathrm{L}][\mathrm{R}]_0 - (k_\mathrm{on}[\mathrm{L}] + k_\mathrm{off})[\mathrm{RL}],
$$
a linear first-order equation whose solution relaxes to its equilibrium value $[\mathrm{RL}]_\mathrm{eq}$ as $1 - e^{-k_\mathrm{obs}t}$ with $k_\mathrm{obs}$ given by [[#eq-kobs-bind]]. (3) With $[\mathrm{L}] = 0$ the equation becomes $d[\mathrm{RL}]/dt = -k_\mathrm{off}[\mathrm{RL}]$, an exponential decay; the mean lifetime of a first-order decay is $1/k$.
:::

Association rate constants of small molecules with proteins typically lie between $10^{5}$ and $10^{8}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$, below the diffusion limit of about $10^{9}$ because only a small part of the protein surface is the entrance to the site and the protein may need to change shape. Since $k_\mathrm{on}$ varies over a limited range, high affinity mostly means slow dissociation: a $1\ \mathrm{nmol\,dm^{-3}}$ drug with $k_\mathrm{on} = 10^6\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ must have $k_\mathrm{off} = 10^{-3}\ \mathrm{s^{-1}}$.

::: example Residence time {#ex-residence}
Surface plasmon resonance gives $k_\mathrm{on} = 1.0\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ and $k_\mathrm{off} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$ for a receptor antagonist. Find $K_\mathrm{d}$, the residence time and the half-life of the complex. How long does it take to reach 90 % of equilibrium binding at $[\mathrm{L}] = 10\ \mathrm{nmol\,dm^{-3}}$?
::: solution
$K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on} = 1.0\times10^{-9}\ \mathrm{mol\,dm^{-3}} = 1.0\ \mathrm{nmol\,dm^{-3}}$. Residence time $\tau = 1/k_\mathrm{off} = 1000\ \mathrm{s} \approx 17\ \mathrm{min}$; half-life $\ln 2/k_\mathrm{off} = 693\ \mathrm{s} \approx 12\ \mathrm{min}$. By [[#eq-kobs-bind]], $k_\mathrm{obs} = (1.0\times10^{6})(1.0\times10^{-8}) + 1.0\times10^{-3} = 1.1\times10^{-2}\ \mathrm{s^{-1}}$, and 90 % of equilibrium is reached after $\ln 10/k_\mathrm{obs} = 209\ \mathrm{s}$, about $3.5$ minutes. A binding assay incubated for one minute would underestimate the affinity of this compound; and the residence time is the reason the antagonism persists for a while after the free drug is washed away.
:::
:::

Robert Copeland and colleagues argued in 2006 that **residence time** is often a better predictor of a drug's duration of action in the body than $K_\mathrm{d}$, because the body is an open system in which free drug concentrations change continually. The muscarinic antagonist tiotropium, with a residence time of many hours at the $\mathrm{M_3}$ receptor, is a frequently cited example. The idea has limits — slow dissociation also means slow association at a given $K_\mathrm{d}$, and a drug cleared faster than it dissociates is a special case — but it has made kinetic measurements routine in lead optimisation.

## Stereochemistry and conformation

Protein pockets are chiral, so the two enantiomers of a chiral drug are, as far as the target is concerned, different compounds. Arthur Easson and Edgar Stedman proposed in 1933 that a ligand interacting with a receptor at three points can discriminate its enantiomers, because only one can make all three contacts simultaneously; the more active enantiomer is called the **eutomer**, the less active the **distomer**, and the ratio of their affinities the **eudismic ratio**.

::: example A eudismic ratio as a free energy {#ex-eudismic}
The (*S*)-enantiomer of propranolol binds β-adrenoceptors about 100 times more tightly than the (*R*)-enantiomer. What difference in binding free energy at $298\ \mathrm{K}$ does that represent, and how many "three-point" contacts must it involve?
::: solution
By [[#eq-dg]], $\Delta\Delta_\mathrm{b}G^\circ = RT\ln 100 = (8.314)(298.15)(4.605)\ \mathrm{J\,mol^{-1}} = 11.4\ \mathrm{kJ\,mol^{-1}}$. In the (*S*)-enantiomer the hydroxyl, the protonated amine and the aryloxy group can simultaneously reach their partners (serine and asparagine side chains, an aspartate carboxylate, the aromatic pocket); in the (*R*)-enantiomer, with the hydroxyl and hydrogen swapped, one of the three cannot be made at the same time as the others. Losing a single well-placed polar contact — say a charge-assisted hydrogen bond and its associated water reorganisation — is enough to account for $10\ \mathrm{kJ\,mol^{-1}}$; nothing about the other contacts needs to change.
:::
:::

Single-enantiomer drugs became the norm after the FDA's 1992 policy statement on the development of stereoisomeric drugs, which asked that each enantiomer of a racemate be characterised. The story often told about thalidomide — that one enantiomer is sedative and the other teratogenic, so that the single enantiomer would have been safe — does not survive scrutiny: the stereocentre of thalidomide is acidic (it is α to an imide carbonyl) and the enantiomers interconvert in the body within hours. Chirality matters, but so does the chemistry of the stereocentre. The molecular target of thalidomide's effects, the ubiquitin ligase component cereblon, reappears in [[medicinal-chemistry/biologics]].

**Conformation** matters in the same way. A flexible ligand binds in one conformation, which may not be its lowest-energy one in solution; the free energy needed to reach the bound conformation (the **strain energy**) is subtracted from the binding free energy. **Induced fit** (Daniel Koshland, 1958) describes the converse: the protein too changes conformation on binding, and the energy for that change also comes out of the binding free energy — which is part of why antagonists, which hold the receptor in an inactive state, often bind with higher affinity than agonists, which must drive it into an active one.

## Agonists, antagonists and efficacy

::: definition Agonist, antagonist and efficacy {#def-efficacy}
A receptor ligand is an **agonist** if its binding produces a response, and an **antagonist** if it binds without producing a response and so reduces the response to an agonist. **Efficacy** is the ability of a bound ligand to activate the receptor. A **full agonist** can produce the maximal response of the system; a **partial agonist** produces a smaller maximal response however high its concentration; an **inverse agonist** reduces the receptor's constitutive (ligand-free) activity. A **competitive antagonist** binds reversibly at the agonist site, so its effect is overcome by raising the agonist concentration (**surmountable**); a **noncompetitive antagonist** (an irreversible ligand at the same site, or an allosteric inhibitor) lowers the maximal response (**insurmountable**).
:::

On a molecular level efficacy is a matter of conformational selection. A receptor exists in equilibrium between inactive and active conformations; an agonist binds the active conformation more tightly than the inactive one and so shifts the equilibrium towards it, an inverse agonist does the reverse, and a neutral antagonist binds both equally. Because effect depends both on the drug's properties (affinity, efficacy) and on the tissue's (receptor number, amplification), pharmacologists separate the two with a model.

::: proposition The operational model of agonism {#prop-operational}
Suppose an agonist A binds the receptor with dissociation constant $K_\mathrm{A}$, and the response is a hyperbolic function of the concentration of agonist–receptor complex, $E = E_\mathrm{m}[\mathrm{AR}]/(K_\mathrm{E} + [\mathrm{AR}])$, where $E_\mathrm{m}$ is the maximal response of the system and $K_\mathrm{E}$ the complex concentration giving half of it. Define the **transducer ratio** $\tau = [\mathrm{R}]_0/K_\mathrm{E}$. Then
$$
\frac{E}{E_\mathrm{m}} = \frac{\tau[\mathrm{A}]}{K_\mathrm{A} + (1 + \tau)[\mathrm{A}]}, \qquad E_\mathrm{max} = \frac{\tau}{1 + \tau}E_\mathrm{m}, \qquad \mathrm{EC_{50}} = \frac{K_\mathrm{A}}{1 + \tau}.
$$ {#eq-operational}
:::

::: proof
Occupancy gives $[\mathrm{AR}] = [\mathrm{R}]_0[\mathrm{A}]/(K_\mathrm{A} + [\mathrm{A}])$ ([[medicinal-chemistry/drug-targets#prop-occupancy]]). Substitute into the transducer function and multiply numerator and denominator by $(K_\mathrm{A} + [\mathrm{A}])/K_\mathrm{E}$:
$$
\frac{E}{E_\mathrm{m}} = \frac{[\mathrm{R}]_0[\mathrm{A}]/K_\mathrm{E}}{K_\mathrm{A} + [\mathrm{A}] + [\mathrm{R}]_0[\mathrm{A}]/K_\mathrm{E}} = \frac{\tau[\mathrm{A}]}{K_\mathrm{A} + (1 + \tau)[\mathrm{A}]}.
$$
As $[\mathrm{A}] \to \infty$ this tends to $\tau/(1 + \tau)$. The expression is a hyperbola in $[\mathrm{A}]$ of the form $E_\mathrm{max}[\mathrm{A}]/(\mathrm{EC_{50}} + [\mathrm{A}])$ with $\mathrm{EC_{50}} = K_\mathrm{A}/(1 + \tau)$, as can be seen by dividing numerator and denominator by $1 + \tau$.
:::

The model was introduced by James Black and Paul Leff in 1983. A large $\tau$ — high efficacy or a tissue with many receptors and strong amplification — gives a full agonist whose $\mathrm{EC_{50}}$ lies far below its $K_\mathrm{A}$: a **receptor reserve**, in which a maximal response needs only a fraction of the receptors. A small $\tau$ gives a partial agonist with $\mathrm{EC_{50}} \approx K_\mathrm{A}$. The same molecule can therefore be a full agonist in one tissue and a partial agonist in another, a fact that explains several clinical differences between drugs of the same class.

::: widget plot
f: 10^x/(1 + 10^x); t*10^x/(1 + (1 + t)*10^x)
x: -4, 3
y: 0, 1.05
sliders: t=10:0.1:100:0.1
labels: \text{occupancy } \theta; \text{response } E/E_\mathrm{m}
hlines: 0.5
caption: Occupancy and response from the operational model [[#eq-operational]], against $x = \log_{10}([\mathrm{A}]/K_\mathrm{A})$, with transducer ratio $t = \tau$. For $\tau = 10$ the response curve lies about one log unit to the left of the occupancy curve: half-maximal response at about 8 % occupancy. Lower $\tau$ towards 1 and the agonist becomes partial — the plateau falls to $\tau/(1+\tau)$ and the response curve slides back on top of the occupancy curve. Raise it to 100 and the receptor reserve grows.
:::

::: example A partial agonist in two tissues {#ex-partial}
An agonist with $K_\mathrm{A} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$ has $\tau = 9$ in tissue X and $\tau = 1$ in tissue Y (which expresses fewer receptors). Find $E_\mathrm{max}/E_\mathrm{m}$ and $\mathrm{EC_{50}}$ in each tissue, and the receptor occupancy at the $\mathrm{EC_{50}}$ in tissue X.
::: solution
From [[#eq-operational]]. Tissue X: $E_\mathrm{max}/E_\mathrm{m} = 9/10 = 0.90$, $\mathrm{EC_{50}} = 1.0/10 = 0.10\ \mu\mathrm{mol\,dm^{-3}}$. Tissue Y: $E_\mathrm{max}/E_\mathrm{m} = 1/2 = 0.50$, $\mathrm{EC_{50}} = 1.0/2 = 0.50\ \mu\mathrm{mol\,dm^{-3}}$. At $0.10\ \mu\mathrm{mol\,dm^{-3}}$ the occupancy in tissue X is $0.10/(1.0 + 0.10) = 0.091$: 9 % occupancy gives half the tissue's maximal response. The molecule behaves as a near-full agonist in X and as a partial agonist in Y — efficacy is a joint property of drug and tissue, and only $K_\mathrm{A}$ is a property of the drug–receptor pair alone. Partial agonists find use precisely because their maximal effect is self-limiting.
:::
:::

## Competitive antagonism and the Schild equation

An antagonist cannot be studied by measuring its effect, because it has none; it is studied through the effect it prevents. If an agonist and a competitive antagonist B compete for the same site, adding B shifts the agonist's dose–response curve to the right without changing its maximum. The size of the shift measures the antagonist's affinity, and does so independently of everything downstream of the receptor.

::: proposition The Schild equation {#prop-schild}
Let agonist A and competitive antagonist B bind the same site reversibly, with dissociation constants $K_\mathrm{A}$ and $K_\mathrm{B}$, at equilibrium. Let the response depend only on agonist occupancy (through any monotonic function). Then the **dose ratio** $r$ — the factor by which the agonist concentration must be increased in the presence of B to give the same response as before — is
$$
r = 1 + \frac{[\mathrm{B}]}{K_\mathrm{B}}, \qquad \log_{10}(r - 1) = \log_{10}[\mathrm{B}] - \log_{10}K_\mathrm{B}.
$$ {#eq-schild}
A plot of $\log(r - 1)$ against $\log[\mathrm{B}]$ (a **Schild plot**) is a straight line of slope 1 whose intercept on the $\log[\mathrm{B}]$ axis is $\log K_\mathrm{B}$; the value $\mathrm{p}A_2 = -\log_{10}K_\mathrm{B}$ is the antagonist's affinity.
:::

::: proof
With two ligands competing for one site, mass action gives $[\mathrm{AR}] = [\mathrm{A}][\mathrm{R}]/K_\mathrm{A}$ and $[\mathrm{BR}] = [\mathrm{B}][\mathrm{R}]/K_\mathrm{B}$. Conservation of receptor, $[\mathrm{R}]_0 = [\mathrm{R}] + [\mathrm{AR}] + [\mathrm{BR}]$, gives the agonist occupancy (the **Gaddum equation**)
$$
\theta_\mathrm{A} = \frac{[\mathrm{A}]/K_\mathrm{A}}{1 + [\mathrm{A}]/K_\mathrm{A} + [\mathrm{B}]/K_\mathrm{B}}.
$$
Equal responses mean equal agonist occupancies. Let $[\mathrm{A}]$ give occupancy $\theta$ without antagonist and $[\mathrm{A}']$ give the same occupancy with antagonist. Equating, cross-multiplying and simplifying:
$$
\frac{[\mathrm{A}]/K_\mathrm{A}}{1 + [\mathrm{A}]/K_\mathrm{A}} = \frac{[\mathrm{A}']/K_\mathrm{A}}{1 + [\mathrm{A}']/K_\mathrm{A} + [\mathrm{B}]/K_\mathrm{B}} \quad\Rightarrow\quad [\mathrm{A}]\left(1 + \frac{[\mathrm{B}]}{K_\mathrm{B}}\right) = [\mathrm{A}'].
$$
So $r = [\mathrm{A}']/[\mathrm{A}] = 1 + [\mathrm{B}]/K_\mathrm{B}$, independent of $\theta$, of $K_\mathrm{A}$ and of how occupancy is turned into response; taking logarithms of $r - 1$ gives the linear form.
:::

The independence from the transduction process is what makes [[#eq-schild]] so valuable: the same antagonist should give the same $K_\mathrm{B}$ in any tissue that expresses the same receptor, so $\mathrm{p}A_2$ values were used to classify receptors long before receptors could be cloned. A Schild slope significantly different from 1 is a diagnostic: it signals that the antagonist is not simply competitive, that equilibrium has not been reached, or that the agonist acts at more than one receptor.

::: widget plot
f: 1/(1 + 10^(-x - 7)); 1/(1 + (1 + 10^b)*10^(-x - 7))
x: -10, -2
y: 0, 1.05
sliders: b=1:-1:4:0.1
labels: \text{agonist alone}; \text{with antagonist}
hlines: 0.5
caption: Agonist response against $x = \log_{10}[\mathrm{A}]$ for an agonist with $\mathrm{EC_{50}} = 10^{-7}\ \mathrm{mol\,dm^{-3}}$, alone and with a competitive antagonist at $[\mathrm{B}] = 10^{b}K_\mathrm{B}$. The curve shifts right by $\log_{10} r = \log_{10}(1 + 10^b)$ without changing shape or maximum: set $b = 1$ and the shift is $\log_{10}11 = 1.04$ units; each further unit of $b$ adds almost exactly one unit of shift — the slope of 1 in the Schild plot.
:::

::: example A Schild analysis {#ex-schild}
In an isolated tissue, an antagonist at concentrations $1.0\times10^{-8}$, $1.0\times10^{-7}$ and $1.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$ gives agonist dose ratios of 3.0, 21 and 201. Construct the Schild plot, test whether the antagonism is competitive and find $K_\mathrm{B}$ and $\mathrm{p}A_2$.
::: solution
$\log(r - 1)$ is $\log 2 = 0.301$, $\log 20 = 1.301$ and $\log 200 = 2.301$ at $\log[\mathrm{B}] = -8, -7, -6$. The points rise by exactly one unit per unit of $\log[\mathrm{B}]$: slope 1, consistent with simple competitive antagonism. From [[#eq-schild]] at the first point, $0.301 = -8 - \log K_\mathrm{B}$, so $\log K_\mathrm{B} = -8.301$, $K_\mathrm{B} = 5.0\times10^{-9}\ \mathrm{mol\,dm^{-3}}$ and $\mathrm{p}A_2 = 8.30$. (Each point gives the same answer; with real, scattered data one fits a line, checks the slope, and then constrains it to 1 to estimate $K_\mathrm{B}$.)
:::
:::

::: widget regression
points: -8,0.301; -7,1.301; -6,2.301; -7.5,0.85; -6.5,1.75
degree: 1
x: -9, -5
y: -0.5, 3
caption: A Schild plot: $\log_{10}(r - 1)$ against $\log_{10}([\mathrm{B}]/\mathrm{mol\,dm^{-3}})$, with the three points of [[#ex-schild]] and two further measurements carrying realistic scatter. The fitted slope should be close to 1 for a competitive antagonist; the line crosses $\log(r-1) = 0$ at $\log[\mathrm{B}] = \log K_\mathrm{B}$. Drag a point to see how sensitive the slope is to a single poorly measured dose ratio — and why a slope of, say, 0.8 is not by itself proof of non-competitive behaviour.
:::

::: quiz
A new antagonist shifts an agonist's dose–response curve to the right and also lowers its maximum, and the effect does not wash out. Which description fits best?
- [ ] A competitive antagonist with a very low $K_\mathrm{B}$.
- [x] An irreversible (or very slowly dissociating) ligand at the agonist site, or an allosteric inhibitor: insurmountable antagonism.
- [ ] A partial agonist with large $\tau$.
- [ ] A competitive antagonist studied at too high a concentration.
::: solution
A reversible competitive antagonist only ever shifts the curve in parallel, at any concentration, because enough agonist always displaces it ([[#prop-schild]]). Lowering the maximum means a fraction of receptors has been removed from play — by covalent attachment, by a ligand that does not dissociate during the experiment, or by an allosteric mechanism that reduces efficacy. With a large receptor reserve, an irreversible antagonist can first shift the curve in parallel (spare receptors absorb the loss) and only then depress the maximum: Robert Furchgott used exactly this to measure receptor reserve in 1966.
:::
:::

::: history
Emil Fischer's lock-and-key metaphor for the specificity of enzymes (1894) and Paul Ehrlich's receptor theory gave pharmacology its first picture of binding. Alfred Joseph Clark showed in the 1920s that the responses of isolated tissues to acetylcholine and its antagonists follow the hyperbolic laws of mass action, and John Gaddum derived the occupancy of two competing ligands in 1937. Arthur Easson and Edgar Stedman's three-point model of enantiomer discrimination dates from 1933. Heinz Otto Schild introduced the $\mathrm{p}A_2$ scale in 1947, and the linear Schild plot was published by Ooi Arunlakshana and Schild in 1959. E. J. Ariëns (1954) introduced intrinsic activity to describe partial agonists, and R. P. Stephenson (1956) separated affinity from efficacy; Robert Furchgott's use of irreversible antagonists (1966) made receptor reserve measurable, and James Black and Paul Leff's operational model (1983) gave the modern quantitative framework. Isothermal titration calorimetry became practical for biomolecules with the instrument and analysis described by Thomas Wiseman and colleagues in 1989, and Robert Copeland, David Pompliano and Thomas Meek's 2006 essay made drug–target residence time a standard concept in drug discovery.
:::

## Where this leads

The free energy [[#eq-dg]] is the quantity optimised in every later design chapter. [[medicinal-chemistry/hits-and-leads]] divides it by molecular size to define ligand efficiency; [[medicinal-chemistry/structure-activity]] studies how it changes with structure, including quantitative relationships with lipophilicity; and [[medicinal-chemistry/structure-based-design]] attempts to compute it from three-dimensional structures, via scoring functions and free-energy perturbation. The free-drug concentrations that set occupancy and response in this chapter are produced by absorption, distribution and clearance — the subject of [[medicinal-chemistry/pharmacokinetics]]. Physical background: the thermodynamics of equilibria is in [[thermodynamics/reaction-equilibrium]], and the statistical origin of the entropy terms (translational and rotational freedom) in [[statistical-thermodynamics]].

::: summary
- $\Delta_\mathrm{b}G^\circ = RT\ln(K_\mathrm{d}/c^\circ) = -5.71\,\mathrm{p}K_\mathrm{d}\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$; all drug potencies lie within about $-17$ to $-70\ \mathrm{kJ\,mol^{-1}}$, and ITC separates the enthalpy and entropy, which often compensate.
- Binding in water is an exchange of interactions with water for interactions with the protein; net hydrogen-bond and salt-bridge contributions are small, while dispersion contacts and buried nonpolar surface (the hydrophobic effect, about $3\ \mathrm{kJ\,mol^{-1}}$ per $\mathrm{CH_2}$) are reliable; desolvation and lost conformational entropy oppose binding.
- Group-additivity schemes such as Andrews' are empirical baselines, not predictions.
- $K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on}$; approach to equilibrium has $k_\mathrm{obs} = k_\mathrm{on}[\mathrm{L}] + k_\mathrm{off}$, and the residence time $1/k_\mathrm{off}$ can govern the duration of action.
- Enantiomers are different ligands for a chiral pocket; the eudismic ratio converts to a free-energy difference, and in-vivo racemisation can defeat single-enantiomer development.
- Efficacy is distinct from affinity: in the operational model $E_\mathrm{max} = \tau E_\mathrm{m}/(1 + \tau)$ and $\mathrm{EC_{50}} = K_\mathrm{A}/(1 + \tau)$, so whether an agonist is full or partial depends on the tissue.
- Competitive antagonists shift dose–response curves in parallel with dose ratio $r = 1 + [\mathrm{B}]/K_\mathrm{B}$; a Schild plot of slope 1 gives $\mathrm{p}A_2 = -\log K_\mathrm{B}$ independently of the tissue.
:::

## Exercises

::: exercise Binding free energy from Kd {level=1 check="-43.4"}
An inhibitor binds its enzyme with $K_\mathrm{d} = 25\ \mathrm{nmol\,dm^{-3}}$ at $298.15\ \mathrm{K}$. Calculate $\Delta_\mathrm{b}G^\circ$. (Enter $\Delta_\mathrm{b}G^\circ$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\Delta_\mathrm{b}G^\circ = RT\ln(K_\mathrm{d}/c^\circ) = (8.314)(298.15)\ln(2.5\times10^{-8})\ \mathrm{J\,mol^{-1}} = -43.4\ \mathrm{kJ\,mol^{-1}}$. Equivalently $\mathrm{p}K_\mathrm{d} = 7.60$ and $-5.71 \times 7.60 = -43.4$.
:::
:::

::: exercise Kd from rate constants {level=1 check="2"}
A ligand binds with $k_\mathrm{on} = 5.0\times10^{5}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ and dissociates with $k_\mathrm{off} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$. What is $K_\mathrm{d}$, and what is the residence time? (Enter $K_\mathrm{d}$ in $\mathrm{nmol\,dm^{-3}}$.)
::: solution
$K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on} = (1.0\times10^{-3})/(5.0\times10^{5}) = 2.0\times10^{-9}\ \mathrm{mol\,dm^{-3}} = 2.0\ \mathrm{nmol\,dm^{-3}}$. The residence time is $1/k_\mathrm{off} = 1000\ \mathrm{s}$, about 17 minutes.
:::
:::

::: exercise pA₂ from a single dose ratio {level=1 check="9"}
At $10\ \mathrm{nmol\,dm^{-3}}$, a competitive antagonist shifts the agonist dose–response curve so that the dose ratio is 11. Find $K_\mathrm{B}$ and $\mathrm{p}A_2$. (Enter $\mathrm{p}A_2$.)
::: solution
From [[#eq-schild]], $K_\mathrm{B} = [\mathrm{B}]/(r - 1) = 10/10 = 1.0\ \mathrm{nmol\,dm^{-3}}$, so $\mathrm{p}A_2 = -\log(1.0\times10^{-9}) = 9.0$. A single dose ratio gives $K_\mathrm{B}$ only if the antagonism is known to be competitive; establishing that needs several concentrations and a Schild slope of 1.
:::
:::

::: exercise What is a methyl group worth? {level=2 check="3.4"}
Adding a methyl group that fills a small hydrophobic pocket improves an inhibitor's binding free energy by $3.0\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$. By what factor does $K_\mathrm{d}$ fall? What improvement in $\Delta_\mathrm{b}G^\circ$ would be needed for a tenfold gain? (Enter the factor to two significant figures.)
::: solution
The factor is $\exp(\Delta\Delta G/RT) = \exp(3000/(8.314 \times 298.15)) = \exp(1.210) = 3.4$. A tenfold gain requires $RT\ln 10 = 5.7\ \mathrm{kJ\,mol^{-1}}$. Gains of tenfold or more from one methyl group (the "magic methyl" effect) occur, but usually because the methyl also changes the ligand's preferred conformation or displaces an unfavourably placed water molecule — not from the hydrophobic effect alone.
:::
:::

::: exercise Full or partial? {level=2 check="0.8"}
An agonist has $K_\mathrm{A} = 50\ \mathrm{nmol\,dm^{-3}}$ and transducer ratio $\tau = 4$ in a given tissue. Find $E_\mathrm{max}/E_\mathrm{m}$ and the $\mathrm{EC_{50}}$. If half the receptors are inactivated irreversibly, what are the new values? (Enter the original $E_\mathrm{max}/E_\mathrm{m}$.)
::: solution
By [[#eq-operational]], $E_\mathrm{max}/E_\mathrm{m} = 4/5 = 0.80$ and $\mathrm{EC_{50}} = 50/5 = 10\ \mathrm{nmol\,dm^{-3}}$. Halving $[\mathrm{R}]_0$ halves $\tau$ to 2: $E_\mathrm{max}/E_\mathrm{m} = 2/3 = 0.67$ and $\mathrm{EC_{50}} = 50/3 = 17\ \mathrm{nmol\,dm^{-3}}$. The curve shifts right and its maximum falls, while $K_\mathrm{A}$, a property of the molecule, is unchanged.
:::
:::

::: exercise Measuring kon and koff from association curves {level=2 check="1000000"}
In a kinetic binding assay, the observed rate constant for association is $0.011\ \mathrm{s^{-1}}$ at $[\mathrm{L}] = 10\ \mathrm{nmol\,dm^{-3}}$ and $0.051\ \mathrm{s^{-1}}$ at $50\ \mathrm{nmol\,dm^{-3}}$. Find $k_\mathrm{on}$, $k_\mathrm{off}$ and $K_\mathrm{d}$. (Enter $k_\mathrm{on}$ in $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$.)
::: solution
By [[#eq-kobs-bind]], $k_\mathrm{obs}$ is linear in $[\mathrm{L}]$ with slope $k_\mathrm{on}$ and intercept $k_\mathrm{off}$. Slope: $(0.051 - 0.011)/(40\times10^{-9}) = 1.0\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. Intercept: $0.011 - (1.0\times10^{6})(1.0\times10^{-8}) = 1.0\times10^{-3}\ \mathrm{s^{-1}}$. Hence $K_\mathrm{d} = 1.0\ \mathrm{nmol\,dm^{-3}}$. The intercept is the difference of two similar numbers, so $k_\mathrm{off}$ is better measured directly from a dissociation experiment.
:::
:::

::: exercise Ligand depletion {level=3 check="0.73"}
A binding assay contains $10\ \mathrm{nmol\,dm^{-3}}$ of receptor sites and $10\ \mathrm{nmol\,dm^{-3}}$ of a ligand with $K_\mathrm{d} = 1.0\ \mathrm{nmol\,dm^{-3}}$. (a) Show that the concentration of complex $x$ satisfies $x^2 - ([\mathrm{R}]_0 + [\mathrm{L}]_0 + K_\mathrm{d})x + [\mathrm{R}]_0[\mathrm{L}]_0 = 0$. (b) Find the fractional occupancy and compare it with the value obtained by wrongly using the total ligand concentration in [[medicinal-chemistry/drug-targets#eq-occupancy]]. (Enter the true occupancy to two significant figures.)
::: hint
Write $[\mathrm{R}] = [\mathrm{R}]_0 - x$ and $[\mathrm{L}] = [\mathrm{L}]_0 - x$ in $K_\mathrm{d} = [\mathrm{R}][\mathrm{L}]/x$; take the smaller root.
:::
::: solution
(a) $K_\mathrm{d}x = ([\mathrm{R}]_0 - x)([\mathrm{L}]_0 - x) = [\mathrm{R}]_0[\mathrm{L}]_0 - ([\mathrm{R}]_0 + [\mathrm{L}]_0)x + x^2$, which rearranges to the quadratic.

(b) With concentrations in $\mathrm{nmol\,dm^{-3}}$: $x^2 - 21x + 100 = 0$, so $x = (21 - \sqrt{441 - 400})/2 = (21 - 6.403)/2 = 7.30$. (The other root, 13.7, exceeds both totals.) The occupancy is $7.30/10 = 0.73$, and the free ligand is only $2.70\ \mathrm{nmol\,dm^{-3}}$. The naive formula gives $10/(10 + 1) = 0.91$. When receptor and ligand concentrations are comparable with each other and well above $K_\mathrm{d}$, binding depletes the ligand and the simple hyperbola overestimates occupancy — the "tight-binding" regime, in which $K_\mathrm{d}$ values below the receptor concentration cannot be measured reliably.
:::
:::

::: exercise Thermodynamic signatures {level=3}
Two inhibitors bind the same enzyme at $298\ \mathrm{K}$ with the same $K_\mathrm{d} = 1.0\ \mathrm{nmol\,dm^{-3}}$. For A, ITC gives $\Delta_\mathrm{b}H^\circ = -70\ \mathrm{kJ\,mol^{-1}}$; for B, $\Delta_\mathrm{b}H^\circ = -15\ \mathrm{kJ\,mol^{-1}}$. (a) Calculate $-T\Delta_\mathrm{b}S^\circ$ for each. (b) Suggest which kinds of interaction dominate each, and which compound you would expect to lose more affinity if a nearby residue mutated in a way that slightly displaced one of its polar contacts. (c) Explain why it would be wrong to conclude that A is "the better molecule" simply because its binding is enthalpy-driven.
::: hint
$\Delta_\mathrm{b}G^\circ$ is the same for both, about $-51\ \mathrm{kJ\,mol^{-1}}$.
:::
::: solution
(a) $\Delta_\mathrm{b}G^\circ = RT\ln(10^{-9}) = -51.4\ \mathrm{kJ\,mol^{-1}}$ for both. A: $-T\Delta S = -51.4 + 70 = +18.6\ \mathrm{kJ\,mol^{-1}}$ (entropy opposes binding). B: $-T\Delta S = -51.4 + 15 = -36.4\ \mathrm{kJ\,mol^{-1}}$ (entropy drives binding).

(b) A binds mainly through specific, directional polar interactions and tight van der Waals packing, paying an entropic price for rigidity. B binds mainly through the hydrophobic effect (release of ordered water from nonpolar surfaces), with relatively few strong polar contacts. A, whose affinity depends on precise hydrogen-bond geometry, would be more sensitive to a mutation that displaces a polar contact; a drug-resistance mutation in a viral enzyme is an example of exactly this kind of perturbation.

(c) Affinity is set by $\Delta G$ alone, and the two compounds are equal. Enthalpic binders are sometimes said to be more selective or easier to optimise, since hydrophobic binding tends to come with high lipophilicity (with its pharmacokinetic and safety drawbacks); that is a useful heuristic, not a law, and enthalpy–entropy compensation, the dependence of both terms on buffer protonation changes, and the large uncertainty of $\Delta H$ for weak binders all make individual ITC signatures hard to interpret.
:::
:::
