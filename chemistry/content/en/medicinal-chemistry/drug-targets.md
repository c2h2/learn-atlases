A tablet of a modern medicine typically contains a few milligrams of an organic molecule of molar mass around $400\ \mathrm{g\,mol^{-1}}$ — perhaps $10^{19}$ molecules, spread through the water of a body that contains about $10^{27}$ water molecules and tens of thousands of different proteins. Yet that molecule changes one physiological process measurably while leaving almost everything else alone. It can do so only because it finds and binds a particular biological macromolecule, its **target**, and binding there changes what the target does. Medicinal chemistry begins with that idea, stated by Paul Ehrlich at the start of the twentieth century in the dictum *corpora non agunt nisi fixata* — "substances do not act unless they are bound".

This chapter surveys the kinds of macromolecule that drugs bind — enzymes, receptors, ion channels, transporters and nucleic acids — and introduces the quantitative ideas that tie a drug's concentration to what happens at its target: **fractional occupancy**, the conversion of an enzyme assay result into an inhibition constant (the Cheng–Prusoff relation), the kinetics of **irreversible** inhibitors, and **selectivity** expressed as a free-energy difference. The binding equilibria and enzyme kinetics behind all of this were developed in [[biochemistry/protein-function]] and [[biochemistry/enzymes]]; here we put them to work on drugs. How the binding happens at the molecular level — the forces, the thermodynamics and the difference between agonists and antagonists — is the subject of [[medicinal-chemistry/drug-binding]].

Throughout the course, drugs, diseases and numbers appear to illustrate chemistry. This is education only and not medical advice: no value in these chapters is a dose or a treatment recommendation, and treatment decisions belong to clinicians following current guidelines.

## What makes a protein a drug target

Most drug targets are proteins, and almost all are proteins with a pocket: a cleft or cavity, typically $300$–$1000\ \text{Å}^3$ in volume and lined with a mixture of polar and nonpolar side chains, into which a small molecule can fit and from which water can be displaced. The pocket is usually the place where the protein binds its own natural ligand — a substrate, a hormone, a neurotransmitter — but it need not be: **allosteric** sites elsewhere on the protein can also be exploited.

::: definition Drug target and druggability {#def-target}
A **drug target** is a biological macromolecule (usually a protein, sometimes RNA or DNA) whose function is changed when a drug binds to it, such that the change in function produces the therapeutic effect. A target is **druggable** if it can bind a small, orally absorbable molecule with useful affinity (conventionally a dissociation constant $K_\mathrm{d} \lesssim 1\ \mu\mathrm{mol\,dm^{-3}}$), which in practice requires a sufficiently deep, enclosed and partly hydrophobic pocket. A target is **validated** for a disease when there is evidence — genetic, pharmacological or clinical — that changing its activity changes the course of the disease.
:::

Druggability and validation are independent. A protein may have a beautiful pocket and no role in disease, or a central role in disease and a flat, featureless surface that no small molecule can grip. Andrew Hopkins and Colin Groom estimated in 2002 that about 3,000 of the roughly 20,000 human protein-coding genes encode proteins of families known to bind drug-like molecules — the "druggable genome" — and that only a fraction of those are linked to disease. A census by Rita Santos and colleagues (2017) counted 667 human proteins as the targets of the roughly 1,600 small-molecule and biological drugs then approved in the USA, together with about 200 targets in pathogens. The targets are concentrated in a few families:

| family | examples of drugs | how the drug acts |
|---|---|---|
| G-protein-coupled receptors (GPCRs) | β-blockers, antihistamines, opioids | agonist or antagonist at a membrane receptor |
| ion channels | local anaesthetics, benzodiazepines, calcium-channel blockers | block the pore or modulate gating |
| enzymes (including kinases and proteases) | aspirin, statins, ACE inhibitors, imatinib, HIV protease inhibitors | inhibit catalysis |
| nuclear receptors | corticosteroids, tamoxifen | agonist or antagonist at an intracellular transcription factor |
| transporters and pumps | SSRIs, proton-pump inhibitors, digoxin | block transport |
| nucleic acids | cisplatin, doxorubicin, aminoglycosides | bind DNA or ribosomal RNA |

Roughly a third of approved drugs act on GPCRs (David Hauser and colleagues counted 475 drugs acting at 108 GPCRs in 2017), and the families above together account for the large majority of the rest. That concentration is not an accident of history alone: these families have well-formed pockets that evolved to bind small molecules.

## Occupancy: from concentration to target

The first quantitative question about any drug is: at a given concentration, what fraction of its target molecules has a drug molecule bound? This is the same question asked of oxygen and myoglobin in [[biochemistry/protein-function]], and it has the same answer.

::: proposition Fractional occupancy {#prop-occupancy}
Let a drug L bind reversibly to a single class of independent sites R, $\mathrm{R + L \rightleftharpoons RL}$, with dissociation constant $K_\mathrm{d} = [\mathrm{R}][\mathrm{L}]/[\mathrm{RL}]$. At equilibrium, the fraction of sites occupied is
$$
\theta = \frac{[\mathrm{RL}]}{[\mathrm{R}] + [\mathrm{RL}]} = \frac{[\mathrm{L}]}{K_\mathrm{d} + [\mathrm{L}]},
$$ {#eq-occupancy}
where $[\mathrm{L}]$ is the **free** (unbound) drug concentration. If the drug is in large excess over the sites, the free concentration equals the total concentration.
:::

::: proof
Total sites are $[\mathrm{R}]_0 = [\mathrm{R}] + [\mathrm{RL}]$. From the definition of $K_\mathrm{d}$, $[\mathrm{R}] = K_\mathrm{d}[\mathrm{RL}]/[\mathrm{L}]$. Substituting,
$$
\theta = \frac{[\mathrm{RL}]}{K_\mathrm{d}[\mathrm{RL}]/[\mathrm{L}] + [\mathrm{RL}]} = \frac{[\mathrm{L}]}{K_\mathrm{d} + [\mathrm{L}]}.
$$
Nothing in the derivation assumes how the occupancy is used by the cell; it is pure mass action, valid at equilibrium, for one ligand and independent identical sites. When the total site concentration is not small compared with $K_\mathrm{d}$, binding depletes the free drug and $[\mathrm{L}]$ must be found from the quadratic that combines mass action with conservation of both drug and sites (an exercise in [[medicinal-chemistry/drug-binding]]).
:::

Three consequences are worth memorising. At $[\mathrm{L}] = K_\mathrm{d}$ half the sites are occupied, so $K_\mathrm{d}$ is the concentration scale of a drug: a "nanomolar" drug is one whose $K_\mathrm{d}$ is of the order of $10^{-9}\ \mathrm{mol\,dm^{-3}}$. Because $\theta/(1-\theta) = [\mathrm{L}]/K_\mathrm{d}$, going from 50 % to 90 % occupancy needs a ninefold rise in concentration, and from 90 % to 99 % another elevenfold — the curve is shallow when plotted against $\log[\mathrm{L}]$, spanning about two orders of magnitude from 10 % to 90 %. And because the hyperbola depends only on the ratio $[\mathrm{L}]/K_\mathrm{d}$, a drug with a hundredfold lower $K_\mathrm{d}$ achieves the same occupancy at a hundredfold lower concentration; affinity buys a lower concentration, not a higher maximum.

::: example Occupancy of a receptor {#ex-occupancy}
A receptor antagonist binds its receptor with $K_\mathrm{d} = 2.0\ \mathrm{nmol\,dm^{-3}}$. (a) What fraction of receptors is occupied when the free drug concentration is $18\ \mathrm{nmol\,dm^{-3}}$? (b) What free concentration would give 99 % occupancy?
::: solution
(a) By [[#eq-occupancy]], $\theta = 18/(2.0 + 18) = 0.90$: 90 % of the receptors carry a drug molecule.

(b) Rearranging, $[\mathrm{L}] = K_\mathrm{d}\,\theta/(1-\theta) = 2.0 \times 0.99/0.01 = 198 \approx 2.0\times10^2\ \mathrm{nmol\,dm^{-3}}$, eleven times the concentration needed for 90 %. Driving occupancy from 90 % to 99 % costs a tenfold higher concentration everywhere in the body, including at every other protein the drug binds weakly — which is why drugs are rarely designed to work only at near-total occupancy.
:::
:::

::: widget plot
f: 1/(1 + 10^(-a - x)); 1/(1 + 10^(-b - x))
x: -12, -3
y: 0, 1.05
sliders: a=9:6:11:0.1; b=6:4:9:0.1
labels: \text{target, } \mathrm{p}K_\mathrm{d} = a; \text{off-target, } \mathrm{p}K_\mathrm{d} = b
hlines: 0.5; 0.9
caption: Fractional occupancy [[#eq-occupancy]] against $x = \log_{10}([\mathrm{L}]/\mathrm{mol\,dm^{-3}})$ for the intended target ($\mathrm{p}K_\mathrm{d} = a$) and an off-target protein ($\mathrm{p}K_\mathrm{d} = b$), where $\mathrm{p}K_\mathrm{d} = -\log_{10}K_\mathrm{d}$. Each curve is the same sigmoid shifted along the axis and crosses 0.5 at $x = -\mathrm{p}K_\mathrm{d}$. Set $a - b = 2$ (a hundredfold selectivity) and find the concentration that gives 90 % occupancy of the target: the off-target is then already about 8 % occupied. The usable "window" between the curves grows by one unit of $x$ for each tenfold gain in selectivity.
:::

::: warning Occupancy depends on the free concentration at the target {#warn-free}
The concentration in [[#eq-occupancy]] is that of free drug in the fluid bathing the target, not the total amount in a blood sample. Many drugs are more than 90 % bound to plasma proteins such as albumin, and only the unbound fraction can reach and occupy a target ([[medicinal-chemistry/pharmacokinetics]]). Equally, occupancy is not effect: a full agonist may produce a maximal response at 10 % occupancy, and an antagonist may need 90 % occupancy before anything is seen. Occupancy is the link between chemistry and pharmacology, not the end of the chain.
:::

## Enzymes as targets

About a third of small-molecule drugs inhibit an enzyme. The theory of reversible inhibition was developed in [[biochemistry/enzymes]]: a competitive inhibitor binds the free enzyme with dissociation constant $K_\mathrm{I}$ and raises the apparent Michaelis constant to $K_\mathrm{M}(1 + [\mathrm{I}]/K_\mathrm{I})$ without changing $V_\mathrm{max}$. Medicinal chemists, however, rarely measure $K_\mathrm{I}$ directly. They measure an $\mathrm{IC_{50}}$, the inhibitor concentration that halves the rate under particular assay conditions — and the two are not the same number.

::: proposition The Cheng–Prusoff relation {#prop-cheng}
For a competitive inhibitor of an enzyme obeying Michaelis–Menten kinetics, with the inhibitor in excess over the enzyme, the concentration that halves the initial rate at substrate concentration $[\mathrm{S}]$ is
$$
\mathrm{IC_{50}} = K_\mathrm{I}\left(1 + \frac{[\mathrm{S}]}{K_\mathrm{M}}\right).
$$ {#eq-cheng}
:::

::: proof
Without inhibitor, $v_0 = V_\mathrm{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$. With competitive inhibitor, $v_i = V_\mathrm{max}[\mathrm{S}]/(K_\mathrm{M}(1 + [\mathrm{I}]/K_\mathrm{I}) + [\mathrm{S}])$. Setting $v_i = v_0/2$ and cancelling $V_\mathrm{max}[\mathrm{S}]$:
$$
K_\mathrm{M}\left(1 + \frac{[\mathrm{I}]}{K_\mathrm{I}}\right) + [\mathrm{S}] = 2(K_\mathrm{M} + [\mathrm{S}]) \quad\Rightarrow\quad \frac{K_\mathrm{M}[\mathrm{I}]}{K_\mathrm{I}} = K_\mathrm{M} + [\mathrm{S}],
$$
so $[\mathrm{I}] = K_\mathrm{I}(1 + [\mathrm{S}]/K_\mathrm{M})$, which is [[#eq-cheng]]. The excess condition lets us use the total inhibitor concentration for $[\mathrm{I}]$; for "tight-binding" inhibitors with $K_\mathrm{I}$ comparable to the enzyme concentration the relation fails and $\mathrm{IC_{50}}$ cannot fall below about half the enzyme concentration.
:::

The relation, published by Yung-Chi Cheng and William Prusoff in 1973, has a practical message: an $\mathrm{IC_{50}}$ is a property of an assay, not of a molecule. Two laboratories testing the same inhibitor at different substrate concentrations will report different values, and a compound that looks potent in an assay run at low substrate may lose much of its potency in a cell where the natural substrate is abundant — a point that matters enormously for kinase inhibitors competing with millimolar ATP ([[medicinal-chemistry/drug-case-studies]]).

::: example Converting an IC₅₀ into Kᵢ {#ex-cheng}
A competitive inhibitor gives $\mathrm{IC_{50}} = 120\ \mathrm{nmol\,dm^{-3}}$ in an assay run at $[\mathrm{S}] = 50\ \mu\mathrm{mol\,dm^{-3}}$ with an enzyme of $K_\mathrm{M} = 25\ \mu\mathrm{mol\,dm^{-3}}$. Find $K_\mathrm{I}$, and predict the $\mathrm{IC_{50}}$ in an assay run at $[\mathrm{S}] = K_\mathrm{M}/5$.
::: solution
From [[#eq-cheng]], $K_\mathrm{I} = \mathrm{IC_{50}}/(1 + [\mathrm{S}]/K_\mathrm{M}) = 120/(1 + 50/25) = 120/3 = 40\ \mathrm{nmol\,dm^{-3}}$. At $[\mathrm{S}] = 5\ \mu\mathrm{mol\,dm^{-3}}$, $\mathrm{IC_{50}} = 40(1 + 0.2) = 48\ \mathrm{nmol\,dm^{-3}}$. The molecule is unchanged; only the competition from substrate is different. Assays for competitive inhibitors are usually run at $[\mathrm{S}] \approx K_\mathrm{M}$, where $\mathrm{IC_{50}} = 2K_\mathrm{I}$, so that potencies are comparable between compounds and the assay is equally sensitive to competitive and uncompetitive inhibitors.
:::
:::

### Transition-state analogues

The most powerful idea in enzyme-inhibitor design follows from the transition-state binding argument of [[biochemistry/enzymes]]: an enzyme binds the transition state of its reaction more tightly than the substrate, by the same factor by which it accelerates the reaction. A stable molecule that resembles the transition state — its geometry, its charge distribution — can therefore capture part of that enormous affinity. Peptide hydrolysis passes through a tetrahedral intermediate, so protease inhibitors replace the scissile amide by a tetrahedral, non-hydrolysable group: a hydroxyethylene or hydroxyethylamine unit in the HIV protease inhibitors ([[medicinal-chemistry/structure-based-design]]), a phosphinate, or a boronic acid that adds the active-site serine to form a tetrahedral boronate (bortezomib, a proteasome inhibitor). The statins mimic the tetrahedral intermediate of the reduction of HMG-CoA, and oseltamivir mimics the flattened oxocarbenium-like transition state of sialic acid cleavage by influenza neuraminidase.

### Irreversible and covalent inhibitors

Some drugs form a covalent bond with their target. Aspirin transfers its acetyl group to a serine (Ser530) in the cyclooxygenase channel of COX-1, permanently blocking it; penicillins acylate the active-site serine of bacterial transpeptidases ([[medicinal-chemistry/drug-case-studies]]); omeprazole, a proton-pump inhibitor, is activated in acid to a sulfenamide that forms disulfide bonds with cysteines of the $\mathrm{H^+/K^+}$-ATPase. Modern **targeted covalent inhibitors** such as the kinase inhibitors ibrutinib and osimertinib carry a mild electrophile (an acrylamide) positioned to react with one particular cysteine near the binding site. The kinetics of such inhibitors are two-step: reversible binding, then bond formation.

::: proposition Kinetics of irreversible inhibition {#prop-inactivation}
For the mechanism
$$
\mathrm{E + I} \underset{}{\overset{K_\mathrm{I}}{\rightleftharpoons}} \mathrm{E{\cdot}I} \xrightarrow{\ k_\mathrm{inact}\ } \mathrm{E{-}I},
$$
with the reversible step in rapid equilibrium (dissociation constant $K_\mathrm{I}$) and inhibitor in excess, the active enzyme ($\mathrm{E}$ plus $\mathrm{E{\cdot}I}$) decays exponentially, $[\mathrm{E}]_\mathrm{active}(t) = [\mathrm{E}]_0\,e^{-k_\mathrm{obs}t}$, with
$$
k_\mathrm{obs} = \frac{k_\mathrm{inact}[\mathrm{I}]}{K_\mathrm{I} + [\mathrm{I}]}.
$$ {#eq-kobs}
At low inhibitor concentration $k_\mathrm{obs} \approx (k_\mathrm{inact}/K_\mathrm{I})[\mathrm{I}]$; the second-order constant $k_\mathrm{inact}/K_\mathrm{I}$ is the measure of a covalent inhibitor's efficiency.
:::

::: proof
Let $A = [\mathrm{E}] + [\mathrm{E{\cdot}I}]$ be the enzyme not yet covalently modified. Rapid equilibrium gives $[\mathrm{E{\cdot}I}] = [\mathrm{E}][\mathrm{I}]/K_\mathrm{I}$, so the fraction of $A$ present as the reversible complex is $[\mathrm{I}]/(K_\mathrm{I} + [\mathrm{I}])$ — the occupancy of [[#eq-occupancy]]. Only that complex reacts, at rate $k_\mathrm{inact}[\mathrm{E{\cdot}I}]$, so
$$
\frac{dA}{dt} = -k_\mathrm{inact}[\mathrm{E{\cdot}I}] = -\frac{k_\mathrm{inact}[\mathrm{I}]}{K_\mathrm{I} + [\mathrm{I}]}\,A.
$$
With $[\mathrm{I}]$ constant (excess), this is first order in $A$ with rate constant [[#eq-kobs]], and integrates to the exponential. The form is identical to the Michaelis–Menten equation, with $k_\mathrm{inact}$ playing the role of $k_\mathrm{cat}$ — which is no coincidence, since the inactivation is a "reaction" of the enzyme–inhibitor complex.
:::

::: example How fast does a covalent inhibitor work? {#ex-inactivation}
A covalent inhibitor has $K_\mathrm{I} = 2.0\ \mu\mathrm{mol\,dm^{-3}}$ and $k_\mathrm{inact} = 0.010\ \mathrm{s^{-1}}$. At $[\mathrm{I}] = 1.0\ \mu\mathrm{mol\,dm^{-3}}$, find $k_\mathrm{obs}$, the half-life of the active enzyme, and the fraction of activity left after $10$ minutes.
::: solution
By [[#eq-kobs]], $k_\mathrm{obs} = (0.010\ \mathrm{s^{-1}})(1.0)/(2.0 + 1.0) = 3.33\times10^{-3}\ \mathrm{s^{-1}}$. The half-life is $\ln 2/k_\mathrm{obs} = 208\ \mathrm{s}$, about $3.5$ minutes. After $600\ \mathrm{s}$ the remaining fraction is $e^{-(3.33\times10^{-3})(600)} = e^{-2.00} = 0.135$, so 86 % of the enzyme is inactivated. The efficiency constant is $k_\mathrm{inact}/K_\mathrm{I} = 5.0\times10^{3}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. Note that inactivation continues as long as inhibitor is present: an irreversible inhibitor's effect depends on concentration *and* time, so an $\mathrm{IC_{50}}$ measured at a single incubation time is not a meaningful constant for it.
:::
:::

::: widget plot
f: 100*exp(-k*c/(K + c)*x); 100*exp(-k*x)
x: 0, 20
y: 0, 105
sliders: c=1:0.1:20:0.1; K=2:0.5:10:0.1; k=0.6:0.1:2:0.05
labels: \text{active enzyme (\%)}; \text{limit } [\mathrm{I}] \gg K_\mathrm{I}
caption: Percentage of enzyme still active against time $x$ (in minutes) for a covalent inhibitor, from [[#prop-inactivation]]: $c$ is $[\mathrm{I}]$ and $K$ is $K_\mathrm{I}$ (both in $\mu\mathrm{mol\,dm^{-3}}$), $k$ is $k_\mathrm{inact}$ in $\mathrm{min^{-1}}$. Raising $c$ speeds inactivation, but never beyond the second curve, $e^{-k_\mathrm{inact}t}$, reached when the enzyme is saturated with inhibitor: the chemical step then sets the pace.
:::

Because an irreversibly inhibited enzyme stays inhibited until the cell makes new protein, the duration of effect of such a drug is set by the **resynthesis rate of the target**, not by how fast the drug leaves the body. Aspirin is the classic illustration. It is cleared from plasma within an hour or so, but the platelets it meets cannot make new COX-1 because they have no nucleus; their thromboxane synthesis stays suppressed for the rest of their lifespan of roughly 7–10 days, and recovers only as new platelets are released from the bone marrow.

### Selective toxicity

When the target belongs to a pathogen, the drug must discriminate between the pathogen's protein and the host's version of it — or hit a pathway the host does not have. Sulfonamides block dihydropteroate synthase, an enzyme of folate synthesis that bacteria need and humans lack (we take folate in our diet); they are structural mimics of the substrate *p*-aminobenzoic acid. Trimethoprim inhibits dihydrofolate reductase (DHFR), an enzyme both bacteria and humans possess, but binds the bacterial enzyme roughly $10^4$–$10^5$ times more tightly than the human one. Selectivity of this kind is naturally expressed as a ratio of dissociation constants, and that ratio as a free-energy difference.

::: definition Selectivity {#def-selectivity}
The **selectivity** of a drug for target A over a second protein B is the ratio $S = K_\mathrm{d}(\mathrm{B})/K_\mathrm{d}(\mathrm{A})$ (or the ratio of $K_\mathrm{I}$ values; ratios of $\mathrm{IC_{50}}$ values are meaningful only if the assays are equivalent). Since the standard Gibbs energy of binding is $\Delta_\mathrm{b}G^\circ = RT\ln(K_\mathrm{d}/c^\circ)$, the selectivity corresponds to a difference in binding free energy
$$
\Delta\Delta_\mathrm{b}G^\circ = \Delta_\mathrm{b}G^\circ(\mathrm{B}) - \Delta_\mathrm{b}G^\circ(\mathrm{A}) = RT\ln S.
$$ {#eq-selectivity}
At $298\ \mathrm{K}$ each factor of ten in selectivity is worth $RT\ln 10 = 5.71\ \mathrm{kJ\,mol^{-1}}$.
:::

::: example Selectivity as a free-energy difference {#ex-selectivity}
An antibacterial inhibitor binds the bacterial enzyme with $K_\mathrm{I} = 1.0\ \mathrm{nmol\,dm^{-3}}$ and the human enzyme with $K_\mathrm{I} = 30\ \mu\mathrm{mol\,dm^{-3}}$ (illustrative values of the trimethoprim type). Express the selectivity as a ratio and as $\Delta\Delta_\mathrm{b}G^\circ$ at $310\ \mathrm{K}$, and compare with the strength of one hydrogen bond.
::: solution
$S = (30\times10^{-6})/(1.0\times10^{-9}) = 3.0\times10^{4}$. By [[#eq-selectivity]], $\Delta\Delta_\mathrm{b}G^\circ = (8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(310\ \mathrm{K})\ln(3.0\times10^4) = 26.6\ \mathrm{kJ\,mol^{-1}}$. A neutral hydrogen bond buried in a protein contributes very roughly $2$–$6\ \mathrm{kJ\,mol^{-1}}$ net to binding ([[medicinal-chemistry/drug-binding]]), so this level of selectivity corresponds to a handful of interactions made in one enzyme but not in the other. For trimethoprim, crystal structures show that small differences in the shape of the active site between bacterial and vertebrate DHFR are enough.
:::
:::

## Receptors

A **receptor**, in pharmacology, is a protein whose job is to recognise a chemical signal — a hormone or neurotransmitter — and transduce it into a cellular response. A drug that mimics the signal and produces the response is an **agonist**; one that occupies the receptor without activating it, and so blocks the natural signal, is an **antagonist** ([[medicinal-chemistry/drug-binding]]). Four structural superfamilies cover almost all receptors.

**G-protein-coupled receptors** (GPCRs) are single polypeptides that cross the cell membrane seven times as α-helices, with the ligand-binding site usually in a pocket formed by the helices near the extracellular face. Humans have about 800 GPCR genes, roughly half of them olfactory receptors. An agonist stabilises an active conformation in which the cytoplasmic ends of the helices splay apart, opening a cleft that binds a heterotrimeric G protein; the G protein's α subunit exchanges GDP for GTP and dissociates to regulate an effector. $\mathrm{G_s}$ stimulates adenylyl cyclase (raising cyclic AMP), $\mathrm{G_i}$ inhibits it, and $\mathrm{G_q}$ activates phospholipase C (releasing inositol trisphosphate and diacylglycerol, and so $\mathrm{Ca^{2+}}$). The β-adrenoceptors (targets of β-blockers and of asthma bronchodilators), histamine $\mathrm{H_1}$ and $\mathrm{H_2}$ receptors, opioid receptors, dopamine and serotonin receptors and the angiotensin $\mathrm{AT_1}$ receptor are all GPCRs.

The cascade amplifies. One active receptor can activate many G proteins before it is switched off; each activated adenylyl cyclase makes many cAMP molecules; each released protein kinase A catalytic subunit phosphorylates many substrate proteins. This is why a few hundred occupied receptors can produce a full response in a cell carrying tens of thousands, and why, for agonists, effect and occupancy are not proportional.

::: widget graph
nodes: Agonist@0,2; GPCR@1,2; Gs@2,2; AC@3,3; ATP@3,1; cAMP@4,2; PKA@5,2; Substrate@6,3; Response@7,2
edges: Agonist>GPCR; GPCR>Gs; Gs>AC; AC>cAMP; ATP>cAMP; cAMP>PKA; PKA>Substrate; Substrate>Response
algorithm: topo
caption: The β-adrenoceptor–cAMP cascade as a directed graph: agonist binds the GPCR, which activates $\mathrm{G_s}$, which activates adenylyl cyclase (AC); AC converts ATP to cAMP, which releases the catalytic subunits of protein kinase A (PKA), which phosphorylate target proteins. Step through the topological sort to follow the order in which information flows. Every arrow after the first is a catalytic step, so the number of molecules multiplies along the chain. Drugs act at several nodes: β-blockers at the receptor, phosphodiesterase inhibitors (not shown) by slowing the destruction of cAMP.
:::

**Ligand-gated ion channels** are multi-subunit membrane proteins that open a pore when a neurotransmitter binds. The nicotinic acetylcholine receptor of the neuromuscular junction (blocked by curare-like muscle relaxants) and the $\mathrm{GABA_A}$ receptor, a chloride channel, are examples. Benzodiazepines bind the $\mathrm{GABA_A}$ receptor at a site between two subunits distinct from the GABA site and increase the effect of GABA; they are **positive allosteric modulators**, not agonists, which is one reason their effect is self-limiting in the absence of the natural transmitter.

**Enzyme-linked receptors** — receptor tyrosine kinases such as the insulin and epidermal growth factor receptors — have an extracellular binding domain, a single transmembrane helix and an intracellular kinase domain activated by ligand-induced dimerisation. Small-molecule drugs usually target the intracellular kinase domain at its ATP site; antibodies target the extracellular domain ([[medicinal-chemistry/biologics]]).

**Nuclear receptors** are soluble intracellular proteins (48 in humans) that bind lipophilic hormones — steroids, thyroid hormone, retinoic acid — and then act as transcription factors on DNA. Drugs for them must cross the cell membrane. The ligand changes the position of a C-terminal helix (helix 12) of the ligand-binding domain, which decides whether co-activator or co-repressor proteins are recruited. Tamoxifen, used in oestrogen-receptor-positive breast cancer, binds the oestrogen receptor and, through its bulky basic side chain, holds helix 12 in an inactive position in breast tissue — while behaving as a partial agonist in bone and the uterus. Such tissue-dependent behaviour gives the class its name, selective oestrogen receptor modulators.

## Ion channels and transporters

**Voltage-gated ion channels** open and close in response to the membrane potential. They cycle through resting, open and inactivated states, and many drugs bind one state preferentially. Local anaesthetics such as lidocaine block voltage-gated sodium channels from inside the cell, reaching their site in the pore through the open channel and binding most tightly to the open and inactivated states. Rapidly firing nerves spend more time in those states and are blocked more — **use-dependent block**, explained by Bertil Hille's modulated-receptor hypothesis (1977). The chemistry matters at every step: lidocaine is a tertiary amine ($\mathrm{p}K_\mathrm{a} \approx 7.9$) that crosses membranes as the neutral base but binds in the pore as the cation, so the local pH controls how much drug reaches its site. Dihydropyridine calcium-channel blockers (amlodipine) and many anti-epileptic drugs act on voltage-gated channels in the same state-dependent way. An important unintended channel target is the hERG potassium channel of the heart, whose block by many unrelated drugs can prolong the QT interval of the electrocardiogram and must be tested for in development ([[medicinal-chemistry/drug-development]]).

**Transporters** move molecules across membranes and are targets in their own right. The selective serotonin reuptake inhibitors (fluoxetine, sertraline) block the serotonin transporter SERT, raising the concentration of transmitter in the synapse. SGLT2 inhibitors (the gliflozins) block a sodium–glucose cotransporter in the kidney. Primary active transporters — ATP-driven pumps — include the $\mathrm{Na^+/K^+}$-ATPase, inhibited by the cardiac glycoside digoxin, and the gastric $\mathrm{H^+/K^+}$-ATPase, irreversibly inhibited by the proton-pump inhibitors. Omeprazole is a neat piece of chemistry: a weakly basic prodrug that accumulates in the acidic secretory canaliculi of the parietal cell, where protonation triggers its rearrangement to the reactive sulfenamide that captures the pump's cysteine thiols. The drug is activated only where it is needed.

::: quiz
A drug blocks a target and its effect lasts for several days, although the drug itself disappears from plasma within a few hours. Which explanations are consistent with this?
- [x] The drug inactivates its target covalently, and the effect lasts until new target protein is made.
- [ ] The drug has a very low $K_\mathrm{d}$, so its occupancy stays high after the free concentration has fallen to zero.
- [x] The drug dissociates from its target very slowly (a long residence time), so occupancy lags behind concentration.
- [ ] The Cheng–Prusoff relation makes the $\mathrm{IC_{50}}$ fall as the drug is cleared.
::: solution
Covalent inactivation (aspirin, proton-pump inhibitors) makes the duration depend on target resynthesis, and a very slow dissociation rate constant keeps a target occupied after free drug has gone, because equilibrium is not re-established on the timescale of clearance ([[medicinal-chemistry/drug-binding]]). An equilibrium $K_\mathrm{d}$ alone cannot do it: at equilibrium, zero free drug means zero occupancy, however small $K_\mathrm{d}$ is. The Cheng–Prusoff relation concerns substrate competition in an assay and says nothing about duration.
:::
:::

## Nucleic acids and other targets

DNA was the first well-understood drug target in cancer chemotherapy, and it is targeted in three chemically distinct ways. **Intercalators** — flat, polycyclic aromatic cations such as doxorubicin — slide between adjacent base pairs, unwinding and lengthening the helix; doxorubicin also traps topoisomerase II in a cleaved complex with DNA, which is probably its main cytotoxic action. **Groove binders** are crescent-shaped molecules that fit the minor groove at AT-rich sequences. **Covalent modifiers** react with nucleophilic sites on the bases, the N7 atom of guanine being the most nucleophilic. Cisplatin, *cis*-$[\mathrm{PtCl_2(NH_3)_2}]$, illustrates the chemistry at textbook level: in the low-chloride interior of a cell a chloride ligand is replaced by water, and the aquated complex binds N7 of a guanine and then of an adjacent guanine, forming a 1,2-intrastrand cross-link that kinks the helix and is recognised by proteins that trigger cell death. The *trans* isomer, which cannot form that cross-link geometry, is inactive — an early demonstration that stereochemistry decides drug action for inorganic as well as organic molecules. These drugs act on all dividing cells, which is why selectivity, not potency, is their central problem.

RNA is an increasingly important target. Many antibiotics bind bacterial ribosomal RNA: aminoglycosides at the decoding site of the 30S subunit, macrolides in the exit tunnel of the 50S subunit; selectivity comes from differences between bacterial and human ribosomes. Risdiplam, approved by the FDA in 2020 for spinal muscular atrophy, is a small molecule that binds a pre-mRNA–spliceosome complex and changes how the *SMN2* gene transcript is spliced. Oligonucleotide drugs, which recognise RNA by base pairing rather than by shape, are the subject of [[medicinal-chemistry/biologics]].

Finally, many important targets are **protein–protein interactions**, whose interfaces are large ($1500$–$3000\ \text{Å}^2$) and flat. They were long considered undruggable by small molecules, but interfaces often concentrate their binding energy in a few "hot-spot" residues. Venetoclax, approved in 2016, binds the BH3-binding groove of the anti-apoptotic protein BCL-2 and displaces its pro-apoptotic partners; it came from a fragment-based campaign ([[medicinal-chemistry/hits-and-leads]]).

## Choosing and validating a target

Before any chemistry is done, a project has to decide which target to pursue. The cost of choosing badly is enormous: most drug candidates that fail in clinical trials fail because they do not work well enough in patients, which often means the target was wrong rather than the molecule.

::: algorithm Assembling the case for a target {#algo-validation}
1. **Biological rationale.** Establish where the target is expressed, what it does and how its activity changes in the disease (tissue samples, pathway analysis).
2. **Human genetic evidence.** Look for people whose genes for the target carry loss-of-function or gain-of-function variants, and for associations between variants and disease risk. Genetic support roughly doubles (or more) the chance that a target's drugs succeed in trials (Nelson et al., 2015; King et al., 2019).
3. **Experimental perturbation.** Remove or reduce the target (gene knockout in animals, RNA interference, CRISPR editing in cells) and test whether the disease-relevant phenotype changes.
4. **Pharmacological perturbation.** Test a selective **tool compound** or antibody, if one exists, in cell and animal models; check that the effect tracks target occupancy.
5. **Druggability and safety.** Assess whether a suitable pocket exists (structures, homologues) and whether inhibiting the target everywhere it is expressed is likely to be tolerable (knockout phenotypes, expression in vital organs).
6. **Decision.** Weigh the evidence and define a measurable link between target engagement and effect (a biomarker) for use in clinical trials.
:::

::: example A target validated by human genetics {#ex-pcsk9}
In 2003 gain-of-function mutations in the gene *PCSK9* were found in French families with very high LDL cholesterol; in a 2006 study by Jonathan Cohen, Helen Hobbs and colleagues, people carrying loss-of-function *PCSK9* variants had LDL cholesterol about 15–28 % lower than non-carriers and a much lower risk of coronary heart disease. PCSK9 is a secreted protein that binds the LDL receptor and directs it to degradation. What does this evidence imply about a drug that blocks PCSK9, and why was the first such drug an antibody rather than a small molecule?
::: solution
The genetics shows two things that no animal experiment can: that lowering PCSK9 activity lowers LDL in humans, and that lifelong low activity is compatible with good health (some individuals with no functional PCSK9 at all are healthy). Both the efficacy and the safety arguments are therefore made before a drug exists. The target, however, acts through a protein–protein interaction between PCSK9 and the LDL receptor across a flat interface — poorly druggable by small molecules but ideal for an antibody, which binds such epitopes with picomolar affinity. The antibodies evolocumab and alirocumab were approved in 2015, about a decade after the genetic discovery ([[medicinal-chemistry/biologics]]).
:::
:::

::: history
The receptor concept has two founders. John Newport Langley, studying the effects of nicotine and curare on muscle in 1905, proposed that drugs act on a "receptive substance" in the cell; Paul Ehrlich, from his studies of dyes, toxins and antitoxins, developed the idea of specific "side chains" or receptors and used it to search systematically for chemicals that would bind parasites but not their host. His arsenical salvarsan (arsphenamine, 1910), effective against syphilis, was the first designed chemotherapeutic agent. Alfred Joseph Clark applied mass action to drug–receptor binding in the 1920s and 1930s, giving the occupancy theory of [[#prop-occupancy]]. Gerhard Domagk's discovery of the antibacterial dye Prontosil (1935), and the demonstration by the Tréfouëls and colleagues at the Institut Pasteur the same year that it acts through its metabolite sulfanilamide, opened the era of antibacterial chemotherapy; Donald Woods showed in 1940 that *p*-aminobenzoic acid reverses the action of sulfanilamide, the first clear example of a drug as an antimetabolite. Raymond Ahlquist divided adrenoceptors into α and β types in 1948, and James Black's design of the β-blocker propranolol and the $\mathrm{H_2}$ antagonist cimetidine in the 1960s and 1970s showed that receptor subtypes could be targeted deliberately; Black shared the 1988 Nobel Prize in Physiology or Medicine with Gertrude Elion and George Hitchings, who had designed antimetabolites such as 6-mercaptopurine and the DHFR inhibitor trimethoprim. Barnett Rosenberg's discovery in 1965 that platinum compounds released from electrodes stop bacterial cell division led to cisplatin. The structural era of receptor pharmacology culminated in the crystal structure of the β₂-adrenoceptor bound to its G protein (Brian Kobilka's group, 2011); Robert Lefkowitz and Kobilka shared the 2012 Nobel Prize in Chemistry for their work on GPCRs.
:::

## Where this leads

Every later chapter takes one of these targets and asks a chemical question about it. [[medicinal-chemistry/drug-binding]] explains *why* a molecule binds — the forces and thermodynamics behind $K_\mathrm{d}$ — and what distinguishes an agonist from an antagonist quantitatively. [[medicinal-chemistry/pharmacokinetics]] asks how a drug reaches the free concentration at its target that [[#eq-occupancy]] requires. [[medicinal-chemistry/hits-and-leads]] and [[medicinal-chemistry/structure-activity]] show how molecules for a new target are found and improved, [[medicinal-chemistry/structure-based-design]] how a target's three-dimensional structure guides design, and [[medicinal-chemistry/drug-case-studies]] follows enzymes and receptors through the histories of four drug classes. Targets that small molecules cannot reach — extracellular proteins with flat surfaces, RNA sequences, proteins with no active site at all — are the territory of [[medicinal-chemistry/biologics]]. The biochemistry underneath is in [[biochemistry/protein-function]] (binding), [[biochemistry/enzymes]] (kinetics and inhibition) and [[biochemistry/carbohydrates-lipids]] (membranes and transport).

::: summary
- A drug target is a macromolecule — mostly a protein with a binding pocket — whose altered function produces the therapeutic effect; druggability (can a small molecule bind?) and validation (does modulating it help?) are separate questions.
- GPCRs, ion channels, enzymes, nuclear receptors, transporters and nucleic acids account for nearly all targets of approved drugs; about a third of drugs act on GPCRs.
- At equilibrium the fractional occupancy is $\theta = [\mathrm{L}]/(K_\mathrm{d} + [\mathrm{L}])$ with $[\mathrm{L}]$ the free concentration; 10 % to 90 % occupancy spans an 81-fold range of concentration.
- For a competitive inhibitor, $\mathrm{IC_{50}} = K_\mathrm{I}(1 + [\mathrm{S}]/K_\mathrm{M})$: an $\mathrm{IC_{50}}$ is a property of the assay conditions, not only of the molecule.
- Irreversible inhibitors inactivate with $k_\mathrm{obs} = k_\mathrm{inact}[\mathrm{I}]/(K_\mathrm{I} + [\mathrm{I}])$; their effect lasts until the target is resynthesised, and $k_\mathrm{inact}/K_\mathrm{I}$ measures their efficiency.
- Selectivity $S = K_\mathrm{d}(\mathrm{B})/K_\mathrm{d}(\mathrm{A})$ corresponds to $\Delta\Delta_\mathrm{b}G^\circ = RT\ln S$, $5.7\ \mathrm{kJ\,mol^{-1}}$ per factor of ten at $298\ \mathrm{K}$.
- Receptor signalling is amplified, so effect is not proportional to occupancy for agonists; channel blockers are often state-dependent, and many drugs (omeprazole, cisplatin) are activated chemically near their target.
- Human genetic evidence is among the strongest forms of target validation.
:::

## Exercises

::: exercise Concentration for a given occupancy {level=1 check="20"}
A drug binds its target with $K_\mathrm{d} = 5.0\ \mathrm{nmol\,dm^{-3}}$. What free concentration gives 80 % occupancy? (Enter the concentration in $\mathrm{nmol\,dm^{-3}}$.)
::: solution
From [[#eq-occupancy]], $[\mathrm{L}] = K_\mathrm{d}\,\theta/(1-\theta) = 5.0 \times 0.80/0.20 = 20\ \mathrm{nmol\,dm^{-3}}$, i.e. four times $K_\mathrm{d}$.
:::
:::

::: exercise From half to almost full occupancy {level=1 check="19"}
By what factor must the free concentration of a drug be increased to raise the occupancy of its target from 50 % to 95 %? (Enter the factor.)
::: solution
Since $\theta/(1-\theta) = [\mathrm{L}]/K_\mathrm{d}$, the concentration is proportional to $\theta/(1-\theta)$. At 50 % this ratio is 1; at 95 % it is $0.95/0.05 = 19$. The concentration must rise nineteenfold, whatever the value of $K_\mathrm{d}$.
:::
:::

::: exercise An assay at high substrate {level=1 check="110"}
A competitive inhibitor has $K_\mathrm{I} = 10\ \mathrm{nmol\,dm^{-3}}$ against an enzyme with $K_\mathrm{M} = 0.10\ \mathrm{mmol\,dm^{-3}}$. What $\mathrm{IC_{50}}$ will be measured in an assay run at $[\mathrm{S}] = 1.0\ \mathrm{mmol\,dm^{-3}}$? (Enter the $\mathrm{IC_{50}}$ in $\mathrm{nmol\,dm^{-3}}$.)
::: solution
By [[#eq-cheng]], $\mathrm{IC_{50}} = 10(1 + 1.0/0.10) = 10 \times 11 = 110\ \mathrm{nmol\,dm^{-3}}$. Running the assay at ten times $K_\mathrm{M}$ makes the inhibitor appear eleven times weaker than its $K_\mathrm{I}$.
:::
:::

::: exercise A selectivity window {level=2 check="16.6"}
A kinase inhibitor has $K_\mathrm{d} = 0.50\ \mathrm{nmol\,dm^{-3}}$ for its target and $K_\mathrm{d} = 400\ \mathrm{nmol\,dm^{-3}}$ for a related kinase. (a) What fraction of each kinase is occupied at a free concentration of $5.0\ \mathrm{nmol\,dm^{-3}}$? (b) Express the selectivity as $\Delta\Delta_\mathrm{b}G^\circ$ at $298.15\ \mathrm{K}$. (Enter $\Delta\Delta_\mathrm{b}G^\circ$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
(a) Target: $\theta = 5.0/(0.50 + 5.0) = 0.909$. Related kinase: $\theta = 5.0/(400 + 5.0) = 0.0123$. At this concentration 91 % of the target and 1.2 % of the off-target are occupied.

(b) $S = 400/0.50 = 800$, so $\Delta\Delta_\mathrm{b}G^\circ = RT\ln S = (8.314)(298.15)\ln 800\ \mathrm{J\,mol^{-1}} = 16.6\ \mathrm{kJ\,mol^{-1}}$ — a little under three factors of ten, each worth $5.71\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Amplification in a signalling cascade {level=2 check="1000000"}
In a simplified model of the β-adrenoceptor pathway, one agonist-occupied receptor activates 20 $\mathrm{G_s}$ proteins before it is desensitised; each $\mathrm{G_s}$ activates one adenylyl cyclase, which makes 100 cAMP molecules while active; four cAMP molecules release the two catalytic subunits of one PKA holoenzyme; and each catalytic subunit phosphorylates 1000 substrate molecules. How many substrate phosphorylations follow from one occupied receptor? (Enter the number.)
::: solution
cAMP made: $20 \times 100 = 2000$. PKA holoenzymes activated: $2000/4 = 500$, releasing $500 \times 2 = 1000$ catalytic subunits. Phosphorylations: $1000 \times 1000 = 1.0\times10^{6}$. With a millionfold amplification, a tiny fraction of receptors occupied by agonist can saturate the downstream response, which is why agonist $\mathrm{EC_{50}}$ values are often far below their $K_\mathrm{d}$ ([[medicinal-chemistry/drug-binding]]).
:::
:::

::: exercise A local anaesthetic and tissue pH {level=2 check="0.24"}
Lidocaine is a tertiary amine with $\mathrm{p}K_\mathrm{a} = 7.9$ for its conjugate acid. Only the neutral base crosses the nerve membrane. Calculate the fraction present as the neutral base at pH 7.4, and at pH 6.9 (a value typical of inflamed tissue). Explain why local anaesthetics are less effective in inflamed tissue. (Enter the fraction at pH 7.4 to two significant figures.)
::: solution
For a base B with conjugate acid $\mathrm{BH^+}$, Henderson–Hasselbalch gives $[\mathrm{B}]/[\mathrm{BH^+}] = 10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}}$, so the neutral fraction is $1/(1 + 10^{\mathrm{p}K_\mathrm{a} - \mathrm{pH}})$. At pH 7.4: $1/(1 + 10^{0.5}) = 1/(1 + 3.16) = 0.24$. At pH 6.9: $1/(1 + 10^{1.0}) = 0.091$. Acidic tissue cuts the membrane-permeant fraction by a factor of about 2.6, so less drug reaches the inside of the axon, where the cation blocks the sodium channel. The same drug needs the neutral form to travel and the charged form to act — a recurring theme of [[medicinal-chemistry/pharmacokinetics]].
:::
:::

::: exercise Classifying targets {level=2}
For each drug, name the target family and say whether the drug is an agonist, antagonist, modulator, inhibitor or blocker: (a) propranolol; (b) omeprazole; (c) a benzodiazepine; (d) cisplatin; (e) tamoxifen in breast tissue; (f) lidocaine.
::: solution
(a) A GPCR (β-adrenoceptors): competitive antagonist. (b) A transporter — the gastric $\mathrm{H^+/K^+}$-ATPase, a primary active pump — inhibited irreversibly after acid activation. (c) A ligand-gated ion channel ($\mathrm{GABA_A}$ receptor): positive allosteric modulator at a site distinct from the GABA site. (d) DNA, a nucleic acid target: covalent cross-linking agent. (e) A nuclear receptor (oestrogen receptor): antagonist in breast tissue (a selective modulator overall, with partial agonism elsewhere). (f) A voltage-gated ion channel (sodium channel): use-dependent pore blocker.
:::
:::

::: exercise Time course of covalent inactivation {level=3 check="1150"}
A targeted covalent inhibitor has $k_\mathrm{inact} = 4.0\times10^{-3}\ \mathrm{s^{-1}}$. At an inhibitor concentration equal to $K_\mathrm{I}$, how long does it take to inactivate 90 % of the enzyme? How would the time change if the concentration were raised to $9K_\mathrm{I}$? (Enter the first time in seconds, to three significant figures.)
::: hint
Find $k_\mathrm{obs}$ from [[#eq-kobs]], then solve $e^{-k_\mathrm{obs}t} = 0.10$.
:::
::: solution
At $[\mathrm{I}] = K_\mathrm{I}$, $k_\mathrm{obs} = k_\mathrm{inact}/2 = 2.0\times10^{-3}\ \mathrm{s^{-1}}$. Setting $e^{-k_\mathrm{obs}t} = 0.10$ gives $t = \ln 10/k_\mathrm{obs} = 2.303/(2.0\times10^{-3}) = 1.15\times10^{3}\ \mathrm{s}$, i.e. $1150\ \mathrm{s}$ or about 19 minutes. At $9K_\mathrm{I}$, $k_\mathrm{obs} = 0.9\,k_\mathrm{inact} = 3.6\times10^{-3}\ \mathrm{s^{-1}}$ and $t = 640\ \mathrm{s}$. A ninefold increase in concentration shortens the time only 1.8-fold, because the reversible complex is already half-saturated at $K_\mathrm{I}$ and the chemical step $k_\mathrm{inact}$ caps the rate.
:::
:::

::: exercise IC₅₀ of an uncompetitive inhibitor {level=3}
An uncompetitive inhibitor binds only the enzyme–substrate complex, with dissociation constant $K_\mathrm{I}'$, so that $v_i = V_\mathrm{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}](1 + [\mathrm{I}]/K_\mathrm{I}'))$. Derive its $\mathrm{IC_{50}}$ as a function of $[\mathrm{S}]$ and compare the dependence on substrate concentration with [[#eq-cheng]]. Why might an uncompetitive inhibitor be attractive for an enzyme whose substrate accumulates when the enzyme is inhibited?
::: hint
Set $v_i = v_0/2$ with $v_0 = V_\mathrm{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$ and solve for $[\mathrm{I}]$.
:::
::: solution
Setting $v_i = v_0/2$ and cancelling $V_\mathrm{max}[\mathrm{S}]$: $K_\mathrm{M} + [\mathrm{S}](1 + [\mathrm{I}]/K_\mathrm{I}') = 2K_\mathrm{M} + 2[\mathrm{S}]$, so $[\mathrm{S}][\mathrm{I}]/K_\mathrm{I}' = K_\mathrm{M} + [\mathrm{S}]$ and
$$
\mathrm{IC_{50}} = K_\mathrm{I}'\left(1 + \frac{K_\mathrm{M}}{[\mathrm{S}]}\right).
$$
The dependence is the mirror image of the competitive case: the uncompetitive inhibitor becomes *more* potent as substrate rises, approaching $K_\mathrm{I}'$ at saturating substrate, whereas a competitive inhibitor becomes weaker. If inhibiting an enzyme in a pathway causes its substrate to build up (as often happens upstream of a blocked step), a competitive inhibitor is progressively out-competed, while an uncompetitive one gains potency — the reason uncompetitive inhibition has been called the most effective mode for drugs acting on metabolic pathways.
:::
:::
