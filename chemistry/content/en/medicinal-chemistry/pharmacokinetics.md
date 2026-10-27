A molecule that binds its target with picomolar affinity in a test tube is not yet a medicine. Swallowed, it must dissolve in the gut, cross the intestinal wall, survive a first pass through the liver, travel in the blood partly bound to albumin, leave the blood for the tissue where its target is, and stay long enough to act before enzymes in the liver rewrite its structure or the kidneys filter it out. In the 1980s and 1990s a large share of drug candidates that failed in clinical trials did so for exactly these reasons — poor pharmacokinetics rather than lack of effect — and the lesson changed medicinal chemistry: potency and "drug-likeness" are now optimised together, from the first hit onwards.

This chapter is about that journey, summarised by the acronym **ADME**: absorption, distribution, metabolism and excretion. **Pharmacokinetics** (what the body does to the drug) is the quantitative description of the time course of drug concentrations; **pharmacodynamics** (what the drug does to the body) was the subject of [[medicinal-chemistry/drug-binding]]. We first look at the physical chemistry that decides whether a molecule crosses membranes — ionisation, lipophilicity and the empirical rules of drug-likeness — then at the chemistry of drug metabolism by cytochrome P450 enzymes, and finally at the simple compartmental models that turn clearance and volume of distribution into concentration–time curves. The acid–base equilibria come from [[general-chemistry-2/acids-bases]] and the first-order kinetics from [[kinetics/rate-laws]].

**Safety note.** All doses, concentrations and clearances in this chapter are **illustrative values** chosen to make the arithmetic clear. They are not doses of any medicine and must never be used as such; real doses are set for an individual patient by a prescriber using a current formulary.

## Absorption: crossing membranes

Most drugs are taken by mouth, and most are absorbed in the small intestine by **passive diffusion** through the lipid bilayer of the epithelial cells. Fick's law says that the flux is proportional to the membrane permeability and to the concentration difference; the permeability, in turn, is roughly proportional to the molecule's partition coefficient into the membrane and inversely related to its size and its number of hydrogen-bonding groups, which must be stripped of water before the molecule can enter the hydrocarbon core. Charged species barely cross at all. Ionisation and lipophilicity are therefore the first two properties a medicinal chemist checks.

::: definition Partition and distribution coefficients {#def-logp}
The **partition coefficient** $P$ of a neutral compound is the ratio of its equilibrium concentrations in 1-octanol and water, $P = [\mathrm{X}]_\mathrm{oct}/[\mathrm{X}]_\mathrm{aq}$, usually quoted as $\log P$. The **distribution coefficient** $D$ at a given pH is the ratio of the *total* concentrations of all forms (neutral and ionised) in the two phases, $D = [\mathrm{X}]_\mathrm{oct,total}/[\mathrm{X}]_\mathrm{aq,total}$, quoted as $\log D_\mathrm{pH}$ (for example $\log D_{7.4}$). Octanol is an empirical stand-in for a membrane: wet octanol is hydrophobic but can accept and donate hydrogen bonds.
:::

::: proposition log D of an ionisable compound {#prop-logd}
Assume that only the neutral form partitions into octanol (ions stay in water). For a monoprotic acid HA with dissociation constant $K_\mathrm{a}$,
$$
\log D = \log P - \log_{10}\!\left(1 + 10^{\,\mathrm{pH} - \mathrm{p}K_\mathrm{a}}\right),
$$ {#eq-logd-acid}
and for a base B whose conjugate acid $\mathrm{BH^+}$ has dissociation constant $K_\mathrm{a}$,
$$
\log D = \log P - \log_{10}\!\left(1 + 10^{\,\mathrm{p}K_\mathrm{a} - \mathrm{pH}}\right).
$$ {#eq-logd-base}
:::

::: proof
For the acid, the octanol phase contains only HA, so $D = [\mathrm{HA}]_\mathrm{oct}/([\mathrm{HA}]_\mathrm{aq} + [\mathrm{A^-}]_\mathrm{aq})$. Dividing numerator and denominator by $[\mathrm{HA}]_\mathrm{aq}$ and using $[\mathrm{A^-}]/[\mathrm{HA}] = K_\mathrm{a}/[\mathrm{H^+}] = 10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}}$ (Henderson–Hasselbalch) gives $D = P/(1 + 10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}})$; take logarithms. For the base, the aqueous phase contains B and $\mathrm{BH^+}$ with $[\mathrm{BH^+}]/[\mathrm{B}] = 10^{\mathrm{p}K_\mathrm{a} - \mathrm{pH}}$, and the same steps give [[#eq-logd-base]]. The assumption that ions do not partition fails by an amount that depends on counter-ions (ion pairs do enter octanol), typically limiting $\log D$ to about $\log P - 3$ or $-4$ far from the $\mathrm{p}K_\mathrm{a}$.
:::

So $\log D$ equals $\log P$ when the compound is essentially un-ionised, falls by $0.30$ (a factor of 2) when $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$, and then falls by one unit per pH unit beyond it. Most drugs are weak bases (amines) or weak acids (carboxylic acids, tetrazoles, sulfonamides), so their effective lipophilicity changes along the gut, from stomach (pH 1–3) to small intestine (pH 6–7.5) and blood (pH 7.4).

::: example log D of an acid and a base {#ex-logd}
(a) A carboxylic acid drug of the ibuprofen type has $\log P = 4.0$ and $\mathrm{p}K_\mathrm{a} = 4.4$. Find $\log D_{7.4}$. (b) An amine drug has $\log P = 3.0$ and $\mathrm{p}K_\mathrm{a} = 9.5$ (conjugate acid). Find $\log D_{7.4}$.
::: solution
(a) By [[#eq-logd-acid]], $\log D = 4.0 - \log(1 + 10^{3.0}) = 4.0 - 3.000 = 1.0$. At blood pH the acid is 99.9 % ionised, and its effective lipophilicity is a thousand times lower than $\log P$ suggests.

(b) By [[#eq-logd-base]], $\log D = 3.0 - \log(1 + 10^{2.1}) = 3.0 - 2.104 = 0.90$. The amine is 99.2 % protonated at pH 7.4. Both compounds still cross membranes adequately, because diffusion of the small neutral fraction is fast and the equilibrium between the forms is re-established instantly as the neutral form is removed.
:::
:::

::: widget plot
f: P - log10(1 + 10^(x - a)); P - log10(1 + 10^(b - x))
x: 0, 14
y: -3, 5
sliders: P=3:0:5:0.1; a=4.4:2:7:0.1; b=9.5:7:11:0.1
labels: \text{acid}, \mathrm{p}K_\mathrm{a} = a; \text{base}, \mathrm{p}K_\mathrm{a} = b
vlines: 1.5; 6.5; 7.4
caption: $\log D$ against pH for a weak acid ($\mathrm{p}K_\mathrm{a} = a$) and a weak base ($\mathrm{p}K_\mathrm{a} = b$) with the same $\log P$, from [[#prop-logd]]. Vertical lines mark stomach (1.5), small intestine (6.5) and blood (7.4). Acids are most lipophilic in the stomach and bases in alkaline media; the curves bend at the $\mathrm{p}K_\mathrm{a}$ and fall with slope 1 beyond it. Moving the $\mathrm{p}K_\mathrm{a}$ of an amine down by two units — for example by putting an electron-withdrawing group near the nitrogen — raises $\log D_{7.4}$ by nearly two units without changing $\log P$.
:::

When the pH differs on the two sides of a membrane, the neutral form equilibrates but the ionised form is trapped where it forms. At equilibrium the neutral concentrations are equal on both sides, so the ratio of *total* concentrations across the membrane for an acid is $(1 + 10^{\mathrm{pH}_1 - \mathrm{p}K_\mathrm{a}})/(1 + 10^{\mathrm{pH}_2 - \mathrm{p}K_\mathrm{a}})$ — the **pH-partition hypothesis** (Brodie, Shore and colleagues, 1950s). Acids accumulate on the alkaline side and bases on the acidic side; omeprazole's accumulation in the acid canaliculi of parietal cells ([[medicinal-chemistry/drug-targets]]) is a designed case of this **ion trapping**.

::: example Ion trapping of a weak acid {#ex-trap}
An acid with $\mathrm{p}K_\mathrm{a} = 3.5$ equilibrates across the stomach lining between gastric juice (pH 1.5) and plasma (pH 7.4). Find the ratio of total concentrations, plasma : stomach, if only the neutral form crosses.
::: solution
Ratio $= (1 + 10^{7.4 - 3.5})/(1 + 10^{1.5 - 3.5}) = (1 + 7943)/(1.01) = 7.9\times10^{3}$. Although the acid is mostly neutral in the stomach and so crosses into the mucosal cells readily, at equilibrium nearly all of it ends up ionised in the plasma side. In practice the small intestine, with its enormous surface area, absorbs more of even acidic drugs than the stomach does; the pH-partition hypothesis describes equilibrium, while absorption is a rate governed also by area and residence time.
:::
:::

Not all transport is passive. **Uptake transporters** carry some drugs in (the peptide transporter PEPT1 absorbs β-lactam antibiotics and the valine-ester prodrug valaciclovir; the amino-acid transporter LAT1 carries levodopa across the blood–brain barrier), and **efflux transporters**, above all P-glycoprotein (P-gp, *ABCB1*), pump many lipophilic drugs back out of intestinal cells and out of the brain. Solubility can also limit absorption: a molecule must dissolve before it can diffuse, and many modern lipophilic candidates are poorly soluble — the subject of salt and polymorph selection in [[medicinal-chemistry/drug-development]].

### Drug-likeness: Lipinski's rule of five

In 1997 Christopher Lipinski and colleagues at Pfizer examined the properties of about 2,000 drugs that had reached phase II clinical trials and compared them with the compounds then emerging from high-throughput screening. They summarised what they found as a rule of thumb, named for the multiples of five in it.

::: definition Lipinski's rule of five (empirical) {#def-ro5}
Poor absorption or permeation of an orally given compound is more likely when it has more than one of:

- more than 5 hydrogen-bond donors (counted as the sum of OH and NH groups);
- more than 10 hydrogen-bond acceptors (counted as the sum of N and O atoms);
- a molar mass over $500\ \mathrm{g\,mol^{-1}}$;
- a calculated $\log P$ over 5.

The rule is **empirical** — a statistical description of past drugs, not a physical law — and it explicitly excludes compounds that are substrates for transporters (many antibiotics, vitamins, cardiac glycosides). Daniel Veber and colleagues (2002) added two further empirical criteria for oral bioavailability in rats: at most 10 rotatable bonds and a polar surface area of at most $140\ \text{Å}^2$.
:::

The rule of five works because each criterion is a proxy for a physical cost: hydrogen-bonding groups must be desolvated to enter a membrane, size slows diffusion and lowers solubility, and very high lipophilicity brings poor solubility, high plasma-protein binding and rapid metabolism. It does not work as a filter for *activity*, and important classes of medicine lie outside it — natural products, macrocycles, peptides and the targeted protein degraders of [[medicinal-chemistry/biologics]] — the territory now called "beyond the rule of five".

::: example Applying the rule of five {#ex-ro5}
Check (a) propranolol, $\mathrm{C_{16}H_{21}NO_2}$, with one OH, one NH and $\log P \approx 3.0$; and (b) ciclosporin, $\mathrm{C_{62}H_{111}N_{11}O_{12}}$, a cyclic undecapeptide with four amide NH groups, one OH and $\log P \approx 3$, against the rule. Ciclosporin is nevertheless orally absorbed in useful amounts. Why might that be?
::: solution
(a) Molar mass $= 16(12.011) + 21(1.008) + 14.007 + 2(15.999) = 259.3\ \mathrm{g\,mol^{-1}}$; donors 2; acceptors (N + O) 3; $\log P$ 3.0. No violations.

(b) Molar mass $= 62(12.011) + 111(1.008) + 11(14.007) + 12(15.999) = 1202.6\ \mathrm{g\,mol^{-1}}$; donors $4 + 1 = 5$ (not a violation); acceptors $11 + 12 = 23$; $\log P$ about 3. Two violations (mass and acceptors), so the rule predicts poor absorption. Ciclosporin escapes the prediction because seven of its eleven amide nitrogens are *N*-methylated and, in a nonpolar environment, its remaining NH groups form intramolecular hydrogen bonds with its own carbonyls. The molecule changes conformation like a chameleon, hiding its polar groups inside the macrocycle as it enters the membrane. Counting atoms cannot see conformational effects — which is exactly why the rule is a guide, not a law.
:::
:::

## Distribution

Once in the blood, a drug distributes into tissues. The extent is summarised by a single, rather abstract number.

::: definition Volume of distribution, clearance and half-life {#def-pk}
The **volume of distribution** $V$ is the proportionality constant between the amount $A$ of drug in the body and its plasma concentration $C$: $V = A/C$. **Clearance** $\mathrm{CL}$ is the proportionality constant between the rate of elimination and the plasma concentration: rate of elimination $= \mathrm{CL}\times C$; it is the volume of plasma completely cleared of drug per unit time. For first-order elimination, the **elimination rate constant** is $k = \mathrm{CL}/V$ and the **half-life** is $t_{1/2} = \ln 2/k = \ln 2\, V/\mathrm{CL}$.
:::

$V$ is not a physical volume. A drug confined to plasma has $V \approx 3\ \mathrm{dm^3}$ for an adult; one that distributes evenly in total body water has $V \approx 40\ \mathrm{dm^3}$; a lipophilic base that binds tissue phospholipids strongly can have an apparent $V$ of hundreds or thousands of litres, far more than the volume of the body, simply because so little of it remains in plasma. Acids, highly bound to albumin, tend to have small $V$; lipophilic bases large $V$.

**Plasma protein binding** matters because only unbound drug crosses capillary walls, reaches targets and is filtered by the kidney. The unbound fraction $f_\mathrm{u}$ ranges from nearly 1 to below 0.01. Warfarin, for example, is about 99 % bound to albumin. Changes in protein binding alone, however, rarely change the *unbound* concentration at steady state for long, because clearance of a low-extraction drug rises with $f_\mathrm{u}$ (see [[#prop-wellstirred]]) — a frequent source of misplaced alarm about "displacement interactions".

The **blood–brain barrier** — brain capillary endothelial cells joined by tight junctions, with high expression of P-gp — excludes most polar molecules and P-gp substrates. Central nervous system drugs are on average smaller, less polar (polar surface area below about $90\ \text{Å}^2$) and less often acidic than other drugs; conversely, second-generation antihistamines were made less sedating by making them P-gp substrates or zwitterions that do not enter the brain.

## Metabolism

The liver converts lipophilic molecules into polar ones that the kidney can excrete. This is a defence against lipophilic xenobiotics in the diet, and drugs are treated as such. Metabolism is conventionally divided into **phase I** reactions, which introduce or unmask a polar group (oxidation, reduction, hydrolysis), and **phase II** reactions, which attach a large polar group to it (conjugation with glucuronic acid, sulfate, glutathione, acetyl or amino acids).

### Cytochrome P450 enzymes

The most important phase I enzymes are the **cytochromes P450** (CYPs), haem-thiolate monooxygenases bound to the endoplasmic reticulum of liver and intestinal cells. Their name comes from the absorption band at $450\ \mathrm{nm}$ of the reduced enzyme's complex with carbon monoxide. Humans have 57 CYP genes, but a handful — CYP3A4, CYP2D6, CYP2C9, CYP2C19 and CYP1A2 — metabolise most drugs, CYP3A4 alone contributing to the metabolism of roughly a third of them (Zanger and Schwab, 2013). Its active site is large and flexible, which is why it accepts so many different substrates.

The overall reaction inserts one oxygen atom of $\mathrm{O_2}$ into a C–H bond and reduces the other to water:
$$
\mathrm{R{-}H + O_2 + NADPH + H^+ \rightarrow R{-}OH + H_2O + NADP^+}.
$$

::: algorithm The P450 catalytic cycle {#algo-p450}
1. The substrate binds near the haem, displacing a water ligand from the iron(III) resting state; the iron changes from low spin to high spin, which makes it easier to reduce.
2. One electron, from NADPH via cytochrome P450 reductase, reduces $\mathrm{Fe^{III}}$ to $\mathrm{Fe^{II}}$.
3. $\mathrm{O_2}$ binds the iron(II), giving an oxy complex best described as $\mathrm{Fe^{III}{-}O{-}O^{\cdot -}}$ (superoxide).
4. A second electron and a proton give a hydroperoxo complex, $\mathrm{Fe^{III}{-}OOH}$.
5. A second protonation of the distal oxygen and heterolysis of the O–O bond release water and leave **compound I**: an oxo-iron(IV) unit with the porphyrin oxidised to a radical cation, $(\mathrm{Por^{\cdot +}})\mathrm{Fe^{IV}{=}O}$, two oxidation equivalents above the resting state. The axial cysteine thiolate pushes electron density onto the iron and helps break the O–O bond.
6. Compound I abstracts a hydrogen atom from the substrate C–H bond, giving a carbon radical and $\mathrm{Fe^{IV}{-}OH}$.
7. **Oxygen rebound**: the radical combines with the hydroxyl on iron, giving the alcohol and regenerating $\mathrm{Fe^{III}}$; the product leaves.
:::

The hydrogen-abstraction step explains the site-selectivity of P450 oxidation, which follows radical stability modified by access to the iron: benzylic and allylic C–H bonds and C–H bonds next to nitrogen or oxygen are attacked preferentially, and the most exposed positions of the molecule are attacked first. Oxidation α to an amine nitrogen gives a carbinolamine that falls apart into a secondary amine and an aldehyde (*N*-**dealkylation**); oxidation α to an ether oxygen gives *O*-dealkylation; aromatic rings and alkenes are epoxidised. A medicinal chemist who finds a metabolic "soft spot" can block it — with a fluorine on an aromatic ring, a methyl at a benzylic position, or deuterium in place of hydrogen (the kinetic isotope effect on hydrogen abstraction slows the step; deutetrabenazine, approved in 2017, was the first deuterated drug). Lowering lipophilicity overall reduces P450 metabolism, which is one of the reasons the lipophilicity criteria of drug-likeness exist.

### Conjugation and reactive metabolites

In phase II, UDP-glucuronosyltransferases attach glucuronic acid to hydroxyl, carboxyl and amino groups; sulfotransferases attach sulfate to phenols; *N*-acetyltransferases acetylate aromatic amines and hydrazines (and a common genetic polymorphism of NAT2 divides people into "fast" and "slow" acetylators); glutathione *S*-transferases add the tripeptide glutathione to electrophiles.

That last reaction is a protective one. Some phase I products are reactive electrophiles that can bind covalently to proteins. The textbook example is paracetamol (acetaminophen). Most of it is glucuronidated or sulfated directly, but a minor fraction is oxidised by CYP2E1 and CYP3A4 to *N*-acetyl-*p*-benzoquinone imine (NAPQI), a quinone imine that is normally trapped at once by glutathione. When glutathione is depleted, NAPQI reacts with cysteine residues of liver proteins and causes hepatocellular injury; the antidote acetylcysteine works by replenishing glutathione. Medicinal chemists screen for groups ("structural alerts") that can be activated in this way — anilines, thiophenes, furans, Michael acceptors — and test for glutathione adducts early in a project.

### Prodrugs and drug interactions

Metabolism can be put to use. A **prodrug** is an inactive compound converted to the active drug in the body. Enalapril is the ethyl ester of the ACE inhibitor enalaprilat, which as a dicarboxylic acid is poorly absorbed; esterases unmask it after absorption ([[medicinal-chemistry/drug-case-studies]]). Valaciclovir, the L-valine ester of aciclovir, is absorbed by PEPT1 and hydrolysed to aciclovir, raising oral bioavailability several-fold.

Because a few enzymes handle many drugs, drugs interact. An **inhibitor** of CYP3A4 (the antifungal ketoconazole, the HIV protease inhibitor ritonavir, furanocoumarins in grapefruit juice acting on intestinal CYP3A4) raises the concentrations of other CYP3A4 substrates; an **inducer** (the antibiotic rifampicin, the herbal remedy St John's wort, via the nuclear receptor PXR) increases the amount of enzyme over days and lowers them. Ritonavir's inhibition of CYP3A4 is used deliberately: low doses "boost" the concentrations of co-administered protease inhibitors ([[medicinal-chemistry/structure-based-design]]). Interaction risk is assessed for every new drug following the ICH M12 guideline on drug interaction studies (adopted 2024).

## Excretion and clearance

The kidney excretes polar drugs and metabolites by glomerular filtration of unbound drug (glomerular filtration rate about $120\ \mathrm{cm^3\,min^{-1}}$, or $7\ \mathrm{dm^3\,h^{-1}}$, in a healthy young adult), active secretion in the proximal tubule, and passive reabsorption of lipophilic neutral species from the tubular fluid — the same pH-partition principle, which is why urine pH can change the excretion of weak acids and bases. The liver eliminates drugs by metabolism and by secretion into bile. Clearances by different organs add.

For the liver, the clearance depends both on how fast the enzymes work and on how fast blood brings the drug to them.

::: proposition Hepatic clearance: the well-stirred model {#prop-wellstirred}
Let blood flow through the liver at rate $Q$, let the unbound fraction in blood be $f_\mathrm{u}$, and let the hepatic enzymes remove unbound drug with **intrinsic clearance** $\mathrm{CL_{int}}$ (the clearance the enzymes would show if flow were unlimited). If the liver behaves as a single well-mixed compartment in which the outflow concentration equals the concentration in the organ, then at steady state the **extraction ratio** and the hepatic clearance are
$$
E = \frac{f_\mathrm{u}\mathrm{CL_{int}}}{Q + f_\mathrm{u}\mathrm{CL_{int}}}, \qquad \mathrm{CL_H} = QE = \frac{Q\,f_\mathrm{u}\mathrm{CL_{int}}}{Q + f_\mathrm{u}\mathrm{CL_{int}}},
$$ {#eq-wellstirred}
and the fraction of an oral dose escaping first-pass metabolism by the liver is $F_\mathrm{H} = 1 - E$.
:::

::: proof
Let $C_\mathrm{in}$ be the concentration in blood entering the liver and $C_\mathrm{out}$ that leaving. Mass balance at steady state: the rate of removal equals inflow minus outflow, $Q(C_\mathrm{in} - C_\mathrm{out})$. In the well-stirred model the enzymes see the outflow concentration, of which the fraction $f_\mathrm{u}$ is unbound, so the rate of metabolism is $\mathrm{CL_{int}}f_\mathrm{u}C_\mathrm{out}$. Equating, $Q(C_\mathrm{in} - C_\mathrm{out}) = f_\mathrm{u}\mathrm{CL_{int}}C_\mathrm{out}$, so $C_\mathrm{out}/C_\mathrm{in} = Q/(Q + f_\mathrm{u}\mathrm{CL_{int}})$. The extraction ratio is $E = (C_\mathrm{in} - C_\mathrm{out})/C_\mathrm{in} = 1 - C_\mathrm{out}/C_\mathrm{in}$, which is the first expression. Clearance is the rate of removal divided by the entering concentration, $Q(C_\mathrm{in} - C_\mathrm{out})/C_\mathrm{in} = QE$. A drug absorbed from the gut enters the liver through the portal vein before reaching the systemic circulation, and a fraction $E$ of it is removed on the way.
:::

Two limits make the model useful. If $f_\mathrm{u}\mathrm{CL_{int}} \ll Q$ (a **low-extraction** drug), $\mathrm{CL_H} \approx f_\mathrm{u}\mathrm{CL_{int}}$: clearance is set by enzyme activity and protein binding, and enzyme inhibitors or inducers change it proportionally. If $f_\mathrm{u}\mathrm{CL_{int}} \gg Q$ (a **high-extraction** drug), $\mathrm{CL_H} \approx Q$: clearance is limited by blood flow, but oral bioavailability is low because most of each dose is removed on the first pass.

::: example First-pass extraction {#ex-wellstirred}
A drug has unbound fraction $f_\mathrm{u} = 0.10$ and hepatic intrinsic clearance $\mathrm{CL_{int}} = 1800\ \mathrm{dm^3\,h^{-1}}$; liver blood flow is $Q = 90\ \mathrm{dm^3\,h^{-1}}$ (a typical adult value). Find $E$, $\mathrm{CL_H}$ and $F_\mathrm{H}$. What happens if an interaction raises $f_\mathrm{u}$ to 0.20?
::: solution
$f_\mathrm{u}\mathrm{CL_{int}} = 180\ \mathrm{dm^3\,h^{-1}}$. By [[#eq-wellstirred]], $E = 180/(90 + 180) = 0.667$, $\mathrm{CL_H} = 90 \times 0.667 = 60\ \mathrm{dm^3\,h^{-1}}$ and $F_\mathrm{H} = 0.333$: two-thirds of an oral dose is lost on the first pass. With $f_\mathrm{u} = 0.20$, $f_\mathrm{u}\mathrm{CL_{int}} = 360$, $E = 360/450 = 0.80$ and $\mathrm{CL_H} = 72\ \mathrm{dm^3\,h^{-1}}$: doubling the free fraction raises clearance by only 20 %, because flow is becoming limiting. For a low-extraction drug the same change would nearly double clearance.
:::
:::

## Concentration–time curves

### The one-compartment model

The simplest model treats the body as one well-mixed volume $V$ from which drug is removed with clearance $\mathrm{CL}$.

::: proposition One-compartment intravenous bolus {#prop-bolus}
After a rapid intravenous dose $D$ into a single compartment of volume $V$ with first-order elimination (clearance $\mathrm{CL}$ independent of concentration), the plasma concentration is
$$
C(t) = \frac{D}{V}\,e^{-kt}, \qquad k = \frac{\mathrm{CL}}{V},
$$ {#eq-bolus}
and the area under the concentration–time curve from $0$ to $\infty$ is $\mathrm{AUC} = D/\mathrm{CL}$.
:::

::: proof
The amount in the body is $A = VC$, and the rate of elimination is $\mathrm{CL}\,C$, so $V\,dC/dt = -\mathrm{CL}\,C$, i.e. $dC/dt = -kC$ with $k = \mathrm{CL}/V$. With $C(0) = D/V$ the solution is [[#eq-bolus]] ([[kinetics/rate-laws]]). Integrating, $\mathrm{AUC} = \int_0^\infty (D/V)e^{-kt}\,dt = D/(Vk) = D/\mathrm{CL}$. The result $\mathrm{AUC} = D/\mathrm{CL}$ is more general than the model: integrating $\mathrm{CL}\,C$ over all time gives the total amount eliminated, which is the dose, for any linear model with elimination from the sampled compartment.
:::

The derivation shows the logic of pharmacokinetics: $V$ and $\mathrm{CL}$ are the physiologically meaningful parameters, and $k$ and $t_{1/2}$ are derived from them. A drug can have a long half-life because it is cleared slowly *or* because it has a huge volume of distribution — two very different situations with the same plot.

::: example Parameters from two plasma samples {#ex-bolus}
After an intravenous dose of $500\ \mathrm{mg}$ (an illustrative value), plasma concentrations are $8.0\ \mathrm{mg\,dm^{-3}}$ at $1.0\ \mathrm{h}$ and $2.0\ \mathrm{mg\,dm^{-3}}$ at $5.0\ \mathrm{h}$. Assuming one-compartment behaviour, find $k$, $t_{1/2}$, $C(0)$, $V$, $\mathrm{CL}$ and $\mathrm{AUC}$.
::: solution
$k = \ln(8.0/2.0)/(5.0 - 1.0\ \mathrm{h}) = 1.386/4.0 = 0.347\ \mathrm{h^{-1}}$, so $t_{1/2} = 0.693/0.347 = 2.0\ \mathrm{h}$ (two half-lives took the concentration from 8 to 2). Extrapolating back, $C(0) = 8.0\,e^{0.347 \times 1.0} = 11.3\ \mathrm{mg\,dm^{-3}}$. Then $V = D/C(0) = 500/11.3 = 44\ \mathrm{dm^3}$, $\mathrm{CL} = kV = 0.347 \times 44.2 = 15\ \mathrm{dm^3\,h^{-1}}$, and $\mathrm{AUC} = D/\mathrm{CL} = C(0)/k = 11.3/0.347 = 33\ \mathrm{mg\,h\,dm^{-3}}$. A volume of 44 litres suggests distribution into roughly total body water.
:::
:::

### Oral absorption: the Bateman function

After an oral dose, drug enters the compartment from the gut by a first-order process with rate constant $k_\mathrm{a}$, and only a fraction $F$, the **bioavailability**, reaches the systemic circulation intact (losses from incomplete absorption and first-pass metabolism, $F = F_\mathrm{abs}F_\mathrm{G}F_\mathrm{H}$).

::: proposition First-order absorption and elimination {#prop-bateman}
With first-order absorption ($k_\mathrm{a}$) and elimination ($k$), $k_\mathrm{a} \neq k$, bioavailability $F$ and dose $D$, the plasma concentration of a one-compartment drug is
$$
C(t) = \frac{F D\,k_\mathrm{a}}{V(k_\mathrm{a} - k)}\left(e^{-kt} - e^{-k_\mathrm{a}t}\right),
$$ {#eq-bateman}
with maximum at $t_\mathrm{max} = \ln(k_\mathrm{a}/k)/(k_\mathrm{a} - k)$. The area is $\mathrm{AUC} = FD/\mathrm{CL}$, so $F$ is measured as $F = (\mathrm{AUC_{oral}}/D_\mathrm{oral})/(\mathrm{AUC_{iv}}/D_\mathrm{iv})$.
:::

::: proof
The amount in the gut, $A_\mathrm{g}$, obeys $dA_\mathrm{g}/dt = -k_\mathrm{a}A_\mathrm{g}$ with $A_\mathrm{g}(0) = FD$, so $A_\mathrm{g} = FDe^{-k_\mathrm{a}t}$. The amount in the body obeys $dA/dt = k_\mathrm{a}A_\mathrm{g} - kA$, a consecutive first-order scheme ([[kinetics/rate-laws]]). Multiply by the integrating factor $e^{kt}$: $d(Ae^{kt})/dt = k_\mathrm{a}FDe^{(k - k_\mathrm{a})t}$. Integrate from 0 with $A(0) = 0$: $Ae^{kt} = k_\mathrm{a}FD(e^{(k - k_\mathrm{a})t} - 1)/(k - k_\mathrm{a})$, so $A = k_\mathrm{a}FD(e^{-kt} - e^{-k_\mathrm{a}t})/(k_\mathrm{a} - k)$; divide by $V$. Setting $dC/dt = 0$ gives $ke^{-kt} = k_\mathrm{a}e^{-k_\mathrm{a}t}$, so $e^{(k_\mathrm{a} - k)t} = k_\mathrm{a}/k$ and $t_\mathrm{max}$ follows. Integrating [[#eq-bateman]] from 0 to ∞ gives $FDk_\mathrm{a}(1/k - 1/k_\mathrm{a})/(V(k_\mathrm{a} - k)) = FD/(Vk) = FD/\mathrm{CL}$.
:::

::: example Peak time and peak concentration {#ex-bateman}
A drug (illustrative values) has $k_\mathrm{a} = 1.5\ \mathrm{h^{-1}}$, $k = 0.20\ \mathrm{h^{-1}}$, $V = 40\ \mathrm{dm^3}$ and $F = 0.80$. After an oral dose of $200\ \mathrm{mg}$, find $t_\mathrm{max}$ and $C_\mathrm{max}$.
::: solution
$t_\mathrm{max} = \ln(1.5/0.20)/(1.5 - 0.20) = 2.015/1.30 = 1.55\ \mathrm{h}$. The prefactor in [[#eq-bateman]] is $FDk_\mathrm{a}/(V(k_\mathrm{a} - k)) = (0.80)(200)(1.5)/((40)(1.30)) = 4.615\ \mathrm{mg\,dm^{-3}}$, and $e^{-0.20 \times 1.55} - e^{-1.5 \times 1.55} = 0.7335 - 0.0977 = 0.6358$. So $C_\mathrm{max} = 4.615 \times 0.6358 = 2.9\ \mathrm{mg\,dm^{-3}}$. Note that $t_\mathrm{max}$ depends only on the two rate constants, not on the dose, and that a slower absorption (smaller $k_\mathrm{a}$) delays and lowers the peak without changing the AUC.
:::
:::

::: widget plot
f: 5*a/(a - k)*(exp(-k*x) - exp(-a*x)); 5*exp(-k*x)
x: 0, 24
y: 0, 5.5
sliders: a=1.5:0.3:4:0.05; k=0.2:0.05:0.25:0.01
labels: \text{oral, } C(t); \text{intravenous bolus}
caption: Plasma concentration (in units of $FD/V$, here $5\ \mathrm{mg\,dm^{-3}}$) against time in hours for an oral dose ([[#eq-bateman]], absorption rate constant $a = k_\mathrm{a}$) and an intravenous bolus of the same bioavailable dose ([[#eq-bolus]]), with elimination rate constant $k$. Slow absorption flattens and delays the peak; when $k_\mathrm{a}$ is close to $k$ the oral curve stays low for a long time. For $k_\mathrm{a} \gg k$ the terminal slope of both curves is $k$; but if absorption is the slower process, the terminal phase reflects $k_\mathrm{a}$ instead — the "flip-flop" situation used deliberately in slow-release formulations.
:::

### Repeated doses and steady state

Most drugs are given repeatedly. With doses $D$ every interval $\tau$ and linear kinetics, the concentration curves superpose: each dose adds its own decaying exponential to what is left of earlier doses. After an intravenous bolus regimen the concentration just after the $n$th dose is $(D/V)(1 + e^{-k\tau} + \dots + e^{-(n-1)k\tau})$, a geometric series. As $n \to \infty$ it tends to $(D/V)/(1 - e^{-k\tau})$, so the **accumulation factor** is
$$
R_\mathrm{ac} = \frac{1}{1 - e^{-k\tau}},
$$ {#eq-accumulation}
and the average concentration over a dosing interval at steady state is $C_\mathrm{ss,avg} = FD/(\mathrm{CL}\,\tau)$, because at steady state the amount eliminated per interval equals the amount absorbed. For a constant-rate infusion $R_0$, the steady-state concentration is $C_\mathrm{ss} = R_0/\mathrm{CL}$. In every case the approach to steady state follows $1 - e^{-kt}$: half-way after one half-life, 90 % after $3.3$ half-lives — independent of dose or dosing interval. These relationships are the reason medicinal chemists aim for a half-life compatible with once- or twice-daily dosing.

::: widget plot
f: sum(heaviside(x - n*T)*exp(-k*(x - n*T)), n, 0, 15); 1/(1 - exp(-k*T))
x: 0, 72
y: 0, 5
sliders: T=8:2:24:1; k=0.1:0.03:0.5:0.01
labels: C(t)\ \text{(units of } D/V); \text{steady-state peak}
caption: Repeated intravenous doses every $T$ hours with elimination rate constant $k$ (in $\mathrm{h^{-1}}$): the sawtooth rises towards a steady state whose peak is $R_\mathrm{ac} = 1/(1 - e^{-kT})$ times the first peak ([[#eq-accumulation]]). With $T$ equal to one half-life ($kT = 0.69$) the concentration doubles; when $T$ is much shorter than the half-life the drug accumulates strongly and the swings within each interval shrink. The time to reach steady state depends only on $k$, not on $T$.
:::

::: warning Half-life is not a measure of how fast a drug is cleared {#warn-halflife}
$t_{1/2} = \ln 2\,V/\mathrm{CL}$ depends on both clearance and volume. A drug that is cleared rapidly but distributes into a huge tissue volume (many lipophilic amines) can have a long half-life; a drug cleared slowly but confined to plasma can have a short one. When a liver enzyme is inhibited, it is $\mathrm{CL}$ that changes; when tissue binding changes, $V$ changes. Reasoning about mechanisms requires the two primary parameters, not the half-life alone. Likewise, a long half-life does not imply a long duration of action if the drug's effect depends on target residence time ([[medicinal-chemistry/drug-binding]]) or irreversible inhibition ([[medicinal-chemistry/drug-targets]]).
:::

::: quiz
A new compound has high potency, $\log D_{7.4} = 5.8$, molar mass $620\ \mathrm{g\,mol^{-1}}$ and poor aqueous solubility, and it disappears quickly when incubated with liver microsomes. Which changes are most likely to improve its oral pharmacokinetics?
- [x] Reducing lipophilicity, for example by replacing an aromatic ring with a smaller polar heterocycle.
- [ ] Adding two further aromatic rings to increase affinity, so that a lower concentration is needed.
- [x] Blocking the site of P450 oxidation with fluorine or by removing the vulnerable group.
- [x] Reducing molar mass, if potency can be kept.
::: solution
The compound violates two rule-of-five criteria and has high lipophilicity, which typically brings poor solubility and rapid oxidative metabolism. Lowering $\log D$ and size and blocking the metabolic soft spot all address those causes. Adding aromatic rings would make every problem worse — the "molecular obesity" that Michael Hann (2011) described as a common failing of lead optimisation.
:::
:::

::: history
Torsten Teorell published the first compartmental models of drug distribution in 1937, and Friedrich Hartmut Dost's *Der Blutspiegel* (1953) gave the subject the name *pharmacokinetics*. The pH-partition hypothesis was developed by Bernard Brodie, Parkhurst Shore, Lewis Schanker and colleagues at the US National Institutes of Health in the 1950s, from measurements of drug absorption from the stomach and intestine. Brodie and Julius Axelrod also showed (1948–1949) that paracetamol is the active metabolite of acetanilide and phenacetin, an early demonstration of a drug acting through its metabolite. The hepatic pigment with an absorption band at $450\ \mathrm{nm}$ in its carbon monoxide complex was described by Martin Klingenberg in 1958 and identified as a haemoprotein, cytochrome P450, by Tsuneo Omura and Ryo Sato in 1962–1964; Ronald Estabrook, David Cooper and Otto Rosenthal showed in 1963 that it catalyses steroid hydroxylation. John Groves proposed the oxygen-rebound mechanism in 1976. Malcolm Rowland, Leslie Benet and Garry Graham introduced the clearance concepts and the well-stirred liver model in 1973. Christopher Lipinski's rule of five was published in *Advanced Drug Delivery Reviews* in 1997 and changed how compound libraries were designed.
:::

## Where this leads

Pharmacokinetic properties are optimised alongside potency throughout a project. [[medicinal-chemistry/hits-and-leads]] introduces lipophilic ligand efficiency, which rewards potency gained without lipophilicity, and [[medicinal-chemistry/structure-activity]] the Hansch equations in which $\log P$ appears as a variable. Prodrug design and metabolic blocking reappear in the case studies of [[medicinal-chemistry/drug-case-studies]]. Biologics ([[medicinal-chemistry/biologics]]) are cleared by entirely different routes — proteolysis, target-mediated clearance and recycling by the neonatal Fc receptor — and have very different half-lives. The preclinical and clinical measurement of ADME properties, including the first doses in humans, is part of [[medicinal-chemistry/drug-development]]. For the mathematics of the linear differential equations used here see [[kinetics/rate-laws]] and Maths Atlas (`/learn/maths/`).

::: summary
- ADME — absorption, distribution, metabolism, excretion — decides whether a potent molecule reaches its target at a useful free concentration for a useful time.
- Passive absorption requires the neutral form; $\log D = \log P - \log(1 + 10^{\pm(\mathrm{pH} - \mathrm{p}K_\mathrm{a})})$, and pH differences across membranes trap ionised drug on one side.
- Lipinski's rule of five (no more than one of: > 5 donors, > 10 acceptors, $M > 500$, $\log P > 5$) is an empirical guide to oral drug-likeness, with known exceptions such as transporter substrates and chameleonic macrocycles.
- Volume of distribution $V = A/C$ and clearance (elimination rate $= \mathrm{CL}\,C$) are the primary parameters; $k = \mathrm{CL}/V$, $t_{1/2} = \ln 2\,V/\mathrm{CL}$ and $\mathrm{AUC} = FD/\mathrm{CL}$.
- Cytochrome P450 enzymes oxidise C–H bonds by hydrogen abstraction and oxygen rebound from compound I, $(\mathrm{Por^{\cdot+}})\mathrm{Fe^{IV}{=}O}$; phase II conjugation makes metabolites polar; reactive metabolites are trapped by glutathione.
- Hepatic clearance follows $\mathrm{CL_H} = Qf_\mathrm{u}\mathrm{CL_{int}}/(Q + f_\mathrm{u}\mathrm{CL_{int}})$ in the well-stirred model; high-extraction drugs suffer large first-pass losses.
- With oral dosing $C(t)$ follows the Bateman function; with repeated dosing concentrations accumulate by $1/(1 - e^{-k\tau})$ and reach steady state after about four to five half-lives.
:::

## Exercises

All doses and concentrations below are illustrative values for calculation only.

::: exercise Volume of distribution {level=1 check="40"}
An intravenous bolus of $200\ \mathrm{mg}$ gives an extrapolated initial plasma concentration of $5.0\ \mathrm{mg\,dm^{-3}}$. What is the volume of distribution? (Enter $V$ in $\mathrm{dm^3}$.)
::: solution
$V = D/C(0) = 200/5.0 = 40\ \mathrm{dm^3}$ — about total body water for an adult.
:::
:::

::: exercise Half-life from clearance and volume {level=1 check="6.93"}
A drug has $V = 70\ \mathrm{dm^3}$ and $\mathrm{CL} = 7.0\ \mathrm{dm^3\,h^{-1}}$. Find its half-life and the time to reach 90 % of steady state during a constant infusion. (Enter $t_{1/2}$ in hours to three significant figures.)
::: solution
$k = \mathrm{CL}/V = 0.100\ \mathrm{h^{-1}}$, so $t_{1/2} = 0.6931/0.100 = 6.93\ \mathrm{h}$. 90 % of steady state is reached when $1 - e^{-kt} = 0.90$, i.e. $t = \ln 10/k = 23\ \mathrm{h}$ ($3.32$ half-lives).
:::
:::

::: exercise log D of an amine {level=1 check="0.9"}
An amine drug has $\log P = 3.0$ and its conjugate acid has $\mathrm{p}K_\mathrm{a} = 9.5$. Calculate $\log D_{7.4}$, and say how $\log D_{7.4}$ would change if fluorination lowered the $\mathrm{p}K_\mathrm{a}$ to 7.4 with $\log P$ unchanged. (Enter the first $\log D_{7.4}$ to one decimal place.)
::: solution
By [[#eq-logd-base]], $\log D_{7.4} = 3.0 - \log(1 + 10^{2.1}) = 3.0 - 2.10 = 0.9$. With $\mathrm{p}K_\mathrm{a} = 7.4$, $\log D_{7.4} = 3.0 - \log 2 = 2.7$, an increase of 1.8 units.
:::
:::

::: exercise Oral bioavailability from AUC {level=2 check="0.6"}
An intravenous dose of $100\ \mathrm{mg}$ gives $\mathrm{AUC} = 20\ \mathrm{mg\,h\,dm^{-3}}$; an oral dose of $200\ \mathrm{mg}$ of the same drug in the same subjects gives $\mathrm{AUC} = 24\ \mathrm{mg\,h\,dm^{-3}}$. Find $F$ and the clearance. (Enter $F$.)
::: solution
$F = (24/200)/(20/100) = 0.12/0.20 = 0.60$. From the intravenous data, $\mathrm{CL} = D/\mathrm{AUC} = 100/20 = 5.0\ \mathrm{dm^3\,h^{-1}}$. Dose-normalising assumes linear kinetics over this range of doses.
:::
:::

::: exercise Accumulation {level=2 check="3.41"}
A drug with a half-life of $12\ \mathrm{h}$ is given as repeated intravenous doses every $6\ \mathrm{h}$. By what factor will the peak concentration at steady state exceed the peak after the first dose? (Enter $R_\mathrm{ac}$ to three significant figures.)
::: solution
$k\tau = (\ln 2/12)(6) = 0.3466$, so $e^{-k\tau} = 2^{-1/2} = 0.7071$ and $R_\mathrm{ac} = 1/(1 - 0.7071) = 3.41$ by [[#eq-accumulation]]. Dosing at half the half-life gives a more than threefold accumulation; dosing once per half-life would give 2.
:::
:::

::: exercise Infusion to a target concentration {level=2 check="10"}
For an illustrative calculation, suppose a drug with $\mathrm{CL} = 5.0\ \mathrm{dm^3\,h^{-1}}$ and $V = 50\ \mathrm{dm^3}$ is to be held at a plasma concentration of $2.0\ \mathrm{mg\,dm^{-3}}$ by constant infusion. What infusion rate is required at steady state, and how long would it take to get within 10 % of the target without a loading dose? (Enter the rate in $\mathrm{mg\,h^{-1}}$.)
::: solution
$R_0 = C_\mathrm{ss}\,\mathrm{CL} = 2.0 \times 5.0 = 10\ \mathrm{mg\,h^{-1}}$. With $k = 5.0/50 = 0.10\ \mathrm{h^{-1}}$, 90 % of $C_\mathrm{ss}$ is reached after $\ln 10/0.10 = 23\ \mathrm{h}$. This slow approach is why a loading amount $V C_\mathrm{ss}$ is used in pharmacokinetic designs when a target concentration is needed quickly.
:::
:::

::: exercise The time of the peak {level=3}
(a) Show from [[#eq-bateman]] that $t_\mathrm{max} = \ln(k_\mathrm{a}/k)/(k_\mathrm{a} - k)$ and that it is unchanged if $k_\mathrm{a}$ and $k$ are interchanged. (b) Explain why this symmetry means that a single oral concentration–time curve cannot tell you whether the terminal decline reflects elimination or absorption, and what extra experiment resolves the ambiguity.
::: hint
For (a), write $t_\mathrm{max}$ with the roles of the two constants swapped and simplify. For (b), think about what an intravenous dose measures.
:::
::: solution
(a) $dC/dt = 0$ requires $ke^{-kt} = k_\mathrm{a}e^{-k_\mathrm{a}t}$, so $(k_\mathrm{a} - k)t = \ln(k_\mathrm{a}/k)$, giving $t_\mathrm{max}$. Interchanging: $\ln(k/k_\mathrm{a})/(k - k_\mathrm{a}) = (-\ln(k_\mathrm{a}/k))/(-(k_\mathrm{a} - k)) = t_\mathrm{max}$. Moreover the shape of $C(t)$, apart from its scale, depends on $k$ and $k_\mathrm{a}$ only through the symmetric combination $e^{-kt} - e^{-k_\mathrm{a}t}$ divided by $(k_\mathrm{a} - k)$, which also changes sign twice under the swap.

(b) Fitting an oral curve yields two exponents but cannot say which is which: a drug absorbed fast and eliminated slowly gives the same shape as one absorbed slowly and eliminated fast ("flip-flop"). Only the scale differs, and that involves the unknown $F/V$. An intravenous dose, which has no absorption phase, measures $k$ directly and removes the ambiguity.
:::
:::

::: exercise Low and high extraction {level=3 check="15"}
Using the well-stirred model with $Q = 90\ \mathrm{dm^3\,h^{-1}}$, compare two drugs: X with $\mathrm{CL_{int}} = 90\ \mathrm{dm^3\,h^{-1}}$ and Y with $\mathrm{CL_{int}} = 1800\ \mathrm{dm^3\,h^{-1}}$, both with $f_\mathrm{u} = 0.10$. (a) Find $\mathrm{CL_H}$ and $F_\mathrm{H}$ for each. (b) Find $\mathrm{CL_H}$ for X if $f_\mathrm{u}$ doubles to 0.20. (c) Which drug's oral exposure would be affected more by an inhibitor that halves $\mathrm{CL_{int}}$? (Enter $\mathrm{CL_H}$ of X at $f_\mathrm{u} = 0.20$ in $\mathrm{dm^3\,h^{-1}}$.)
::: hint
Oral exposure is $\mathrm{AUC_{oral}} = F D/\mathrm{CL}$; with only hepatic clearance and complete absorption, $F_\mathrm{H}/\mathrm{CL_H} = 1/(f_\mathrm{u}\mathrm{CL_{int}})$.
:::
::: solution
(a) X: $f_\mathrm{u}\mathrm{CL_{int}} = 9$, $E = 9/99 = 0.091$, $\mathrm{CL_H} = 8.2\ \mathrm{dm^3\,h^{-1}}$, $F_\mathrm{H} = 0.91$. Y: from [[#ex-wellstirred]], $\mathrm{CL_H} = 60\ \mathrm{dm^3\,h^{-1}}$, $F_\mathrm{H} = 0.33$.

(b) X with $f_\mathrm{u} = 0.20$: $f_\mathrm{u}\mathrm{CL_{int}} = 18$, $E = 18/108 = 0.167$, $\mathrm{CL_H} = 15\ \mathrm{dm^3\,h^{-1}}$ — nearly double, as expected for a low-extraction drug.

(c) From [[#eq-wellstirred]], $F_\mathrm{H}/\mathrm{CL_H} = (1 - E)/(QE) = 1/(f_\mathrm{u}\mathrm{CL_{int}})$, so the oral AUC is inversely proportional to $f_\mathrm{u}\mathrm{CL_{int}}$ for *both* drugs: halving $\mathrm{CL_{int}}$ doubles oral exposure in each case. The mechanism differs, however. For X the rise comes almost entirely from lower systemic clearance; for Y mostly from a higher bioavailability ($F_\mathrm{H}$ rises from 0.33 to 0.50) while its systemic clearance falls only from 60 to $45\ \mathrm{dm^3\,h^{-1}}$. After an intravenous dose, only X would show a large change.
:::
:::
