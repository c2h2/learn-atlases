In 1868 Alexander Crum Brown and Thomas Fraser in Edinburgh converted a series of plant alkaloids — strychnine, brucine, morphine, nicotine and others — into their *N*-methyl quaternary ammonium salts and found that the products, whatever their parent's action, now paralysed muscle like curare. They concluded that physiological action is a function of chemical constitution, and asked whether that function could be written down. A century and a half later the question still defines medicinal chemistry. Given a lead compound ([[medicinal-chemistry/hits-and-leads]]), which parts of it matter for activity? What can be changed, and to what? Can the effect of a change be predicted before the compound is made?

The study of how biological activity changes with structure is called **structure–activity relationships** (SAR). This chapter describes the qualitative toolkit — probing functional groups, defining a **pharmacophore**, varying the carbon skeleton, restricting conformation and swapping groups for **bioisosteres** — and then the quantitative one: Hammett substituent constants, the hydrophobic constant $\pi$, **Hansch analysis** and the **Free–Wilson** method, which express activity as a linear free-energy relationship in physicochemical descriptors. The free-energy picture of binding is that of [[medicinal-chemistry/drug-binding]]; the electronic effects of substituents on aromatic rings were developed in [[organic-2/aromatic-substitution]], and the physical organic chemistry of linear free-energy relationships appears in [[kinetics/transition-state-theory]].

## Probing a lead: which groups matter?

The first questions about a lead are about its functional groups. Each hydroxyl, amine, carbonyl and aromatic ring might be making an interaction with the target, or might be a passenger. The classical method is to make analogues in which one group at a time is removed or **masked** — a hydroxyl converted into its methyl ether (no longer a hydrogen-bond donor), an amine into an amide (no longer basic, so no longer charged), a ketone reduced to an alcohol (changed geometry and acceptor strength) — and to measure what happens to activity.

The interpretation uses the free-energy scale. A loss of activity of a factor of 10 means a loss of $5.7\ \mathrm{kJ\,mol^{-1}}$ of binding free energy at $298\ \mathrm{K}$; a group whose removal costs a factor of 100 or more is making an important interaction, while a group whose removal changes activity by less than a factor of 2 or 3 probably is not. But the inference is not watertight. A change can act indirectly — methylating a phenol also makes it bulkier and changes its conformational preferences; acylating an amine changes the molecule's $\log D$ and so its concentration in a cell-based assay. SAR from cell or animal assays mixes binding with pharmacokinetics, and the cleanest SAR comes from binding or enzyme assays on purified targets.

::: definition Pharmacophore {#def-pharmacophore}
A **pharmacophore** is the set of steric and electronic features — hydrogen-bond donors and acceptors, positive and negative ionisable groups, aromatic rings and hydrophobic centres — together with their relative positions in three dimensions, that is necessary for a molecule to interact with a particular target and produce (or block) its response. It is an abstraction: it refers to features, not to particular atoms or functional groups, so structurally different molecules can share a pharmacophore (IUPAC, Wermuth and colleagues, 1998).
:::

Once the important groups are known, their spatial arrangement is the pharmacophore. For the β-adrenoceptor antagonists (β-blockers), for example, the classical pharmacophore is an aryloxypropanolamine: a secondary amine carrying a branched alkyl group (isopropyl or *tert*-butyl), protonated at physiological pH; a hydroxyl on the carbon β to the nitrogen, with the (*S*) configuration; and an aromatic ring joined through an $\mathrm{{-}OCH_2{-}}$ link. Propranolol (a naphthalene), atenolol (a *para*-substituted benzene) and timolol (a thiadiazole) differ completely in their aromatic parts yet present the same three features in the same arrangement. Pharmacophore models are used to search databases for new scaffolds (ligand-based virtual screening, [[medicinal-chemistry/hits-and-leads]]) and to explain why apparently unrelated molecules act on the same receptor.

::: example Interpreting a group-removal series {#ex-removal}
A lead inhibitor has $K_\mathrm{I} = 20\ \mathrm{nmol\,dm^{-3}}$. Analogues give: phenol OH → OMe, $K_\mathrm{I} = 18\ \mu\mathrm{mol\,dm^{-3}}$; phenol OH → H, $K_\mathrm{I} = 15\ \mu\mathrm{mol\,dm^{-3}}$; ring methyl → H, $K_\mathrm{I} = 40\ \mathrm{nmol\,dm^{-3}}$; secondary amine N–H → N–CH₃, $K_\mathrm{I} = 25\ \mathrm{nmol\,dm^{-3}}$. Which groups belong to the pharmacophore, and how much is each interaction worth at $298\ \mathrm{K}$?
::: solution
Convert each ratio to $\Delta\Delta G = RT\ln(K_\mathrm{analogue}/K_\mathrm{lead})$. OH → OMe: ratio 900, $\Delta\Delta G = 5.71\log 900 = 16.9\ \mathrm{kJ\,mol^{-1}}$. OH → H: ratio 750, $16.4\ \mathrm{kJ\,mol^{-1}}$. Methyl → H: ratio 2, $1.7\ \mathrm{kJ\,mol^{-1}}$. N–H → N–CH₃: ratio 1.25, $0.6\ \mathrm{kJ\,mol^{-1}}$. The phenol is clearly essential, and since both its removal and its methylation are equally damaging, it is acting as a hydrogen-bond *donor* (the ether can still accept). The ring methyl makes a modest hydrophobic contribution and the amine N–H is not a donor to the target (but the nitrogen itself might still be important as a base: methylation keeps it basic). The phenol OH belongs to the pharmacophore; the methyl is a candidate for modification.
:::
:::

## Changing the skeleton

With the pharmacophore known, chemists vary the rest of the molecule to improve potency, selectivity and properties. The standard moves are few and are best thought of in terms of the binding free energy and of the physicochemical costs described in [[medicinal-chemistry/pharmacokinetics]].

- **Homologation and chain branching.** Adding methylene groups to an alkyl chain usually raises activity up to an optimum and then lowers it, as the chain first fills a hydrophobic pocket and then overflows it (or as lipophilicity becomes excessive). Branching changes shape and can block metabolism at the branch point.
- **Ring variation.** Replacing benzene by pyridine adds a hydrogen-bond acceptor and lowers $\log P$ by about 1.4 units; replacing it by thiophene keeps shape and aromaticity; saturating a ring increases three-dimensionality and solubility. Ring fusion and ring expansion change the angles between substituents.
- **Extension.** Adding a group that reaches an adjacent pocket can add an interaction — the basis of fragment growing.
- **Conformational restriction.** A flexible molecule binds in one conformation. Locking it into that conformation by forming a ring, introducing a double bond or adding a substituent that biases a torsion angle removes the conformational entropy penalty (roughly $1$–$4\ \mathrm{kJ\,mol^{-1}}$ per frozen rotatable bond) and the strain of reaching the bound conformation. If the wrong conformation is locked in, activity falls sharply — which itself reveals the bioactive conformation. Rigid analogues also often bind fewer off-targets, because they can adopt fewer shapes.

A small structural change sometimes produces an unexpectedly large change in potency: an **activity cliff**. The **"magic methyl"** effect — tenfold or larger gains from adding one methyl group — is usually a conformational effect, the methyl forcing a biaryl to twist or an amide to adopt the bound geometry, or displacing a poorly placed water molecule. Activity cliffs are the most informative data in a series, and **matched molecular pair** analysis, which compares the effects of the same small change across many series, is used to learn which changes are generally useful.

### Isosteres and bioisosteres

::: definition Isosteres and bioisosteres {#def-bioisostere}
**Isosteres** (Irving Langmuir, 1919) are atoms, ions or molecules with the same number and arrangement of valence electrons, such as $\mathrm{N_2}$ and $\mathrm{CO}$, or $\mathrm{N_2O}$ and $\mathrm{CO_2}$, which have similar physical properties. **Bioisosteres** (Harris Friedman, 1951) are groups that can replace one another in a biologically active molecule while retaining the activity, because they share the features that matter for the interaction — size, shape, electron distribution, hydrogen-bonding pattern, acidity or lipophilicity. **Classical** bioisosteres follow the valence-electron analogy (for example $\mathrm{{-}CH_2{-}}$, $\mathrm{{-}NH{-}}$, $\mathrm{{-}O{-}}$, $\mathrm{{-}S{-}}$); **non-classical** bioisosteres do not share atom counts or electron counts but mimic a property (for example a tetrazole for a carboxylic acid). Whether a replacement is bioisosteric is an empirical finding for a particular target, not a property of the groups alone.
:::

Bioisosteric replacement is used to keep activity while fixing something else. Common replacements:

| group | bioisosteres | what is usually gained |
|---|---|---|
| $\mathrm{{-}CO_2H}$ ($\mathrm{p}K_\mathrm{a} \approx 4$–$5$) | 1*H*-tetrazol-5-yl ($\mathrm{p}K_\mathrm{a} \approx 4.5$–$5$), acylsulfonamide, hydroxamic acid | similar acidity, more delocalised charge, higher lipophilicity, no acyl glucuronide metabolites |
| $\mathrm{{-}H}$ | $\mathrm{{-}F}$ | similar size, blocks P450 oxidation, changes $\mathrm{p}K_\mathrm{a}$ of neighbours |
| $\mathrm{{-}C(O)O{-}}$ (ester) | amide, 1,2,4-oxadiazole | resistance to esterases |
| $\mathrm{{-}C(O)NH{-}}$ (amide) | 1,2,3-triazole, *E*-alkene, fluoroalkene, retro-amide | resistance to proteases (peptidomimetics) |
| benzene ring | pyridine, thiophene; bicyclo[1.1.1]pentane for a *para*-disubstituted ring | lower lipophilicity, better solubility, new vectors |
| $\mathrm{{-}OH}$ (phenol) | $\mathrm{{-}NHSO_2CH_3}$, indazole NH, benzimidazolone | resistance to glucuronidation, retained donor |
| $\mathrm{C{-}H}$ | $\mathrm{C{-}D}$ | slower P450 oxidation (kinetic isotope effect) |

The angiotensin receptor antagonist losartan is a well-known case: replacing a carboxylic acid on its biphenyl by a tetrazole gave a compound that was about tenfold more potent and orally active. Another is the history of cimetidine. The $\mathrm{H_2}$ antagonist metiamide contained a thiourea and caused agranulocytosis (a loss of white blood cells) in some patients, an effect attributed to the thiourea. James Black's group replaced the thiourea $\mathrm{C{=}S}$ by $\mathrm{C{=}N{-}CN}$: the cyanoguanidine is planar, polar, strongly dipolar and weakly basic like the thiourea, and the resulting compound, cimetidine, kept the activity and became one of the first "blockbuster" medicines.

::: warning A bioisostere is defined by the target, not by a table {#warn-bioisostere}
Tables of bioisosteres are lists of replacements that have worked somewhere. They are a source of ideas, not of predictions. A tetrazole has the acidity of a carboxylic acid but is larger, its charge is spread over four nitrogens, and it is a weaker hydrogen-bond acceptor at any one atom; in a pocket that grips a carboxylate with two precisely placed arginines, the replacement can lose most of the activity. Fluorine is "similar in size to hydrogen" but very different electronically: it changes the acidity of nearby groups, the conformation of adjacent bonds (the *gauche* effect) and the dipole of the molecule. Every replacement must be tested, and its effect on properties other than activity measured.
:::

## Quantitative structure–activity relationships

The qualitative moves change potency in steps. Corwin Hansch's insight, in the early 1960s, was that the *size* of those steps, for a series of compounds acting by the same mechanism, can often be correlated with a few physicochemical parameters of the substituents. The correlations are **linear free-energy relationships**: since $\log$ of an equilibrium or rate constant is proportional to a free energy, adding free-energy contributions means adding logarithms.

### Electronic effects: the Hammett equation

::: proposition The Hammett equation (empirical linear free-energy relationship) {#prop-hammett}
For a reaction or equilibrium of a series of *meta*- or *para*-substituted benzene derivatives, the equilibrium (or rate) constant $K_\mathrm{X}$ of the compound with substituent X is related to that of the unsubstituted compound $K_\mathrm{H}$ by
$$
\log_{10}\frac{K_\mathrm{X}}{K_\mathrm{H}} = \rho\,\sigma_\mathrm{X},
$$ {#eq-hammett}
where the **substituent constant** $\sigma_\mathrm{X}$ depends only on X and its position, defined by the ionisation of substituted benzoic acids in water at $25\ \mathrm{^\circ C}$ (for which $\rho = 1$ exactly), and the **reaction constant** $\rho$ depends only on the reaction and conditions.
:::

::: proof Why a linear relationship is expected
The relation is empirical, but its form follows from two assumptions. Write the free-energy change of the reaction of compound X as $\Delta G_\mathrm{X} = -RT\ln K_\mathrm{X}$. Assume (i) that a substituent changes the free energy of a reaction by an amount $\delta\Delta G_\mathrm{X} = \Delta G_\mathrm{X} - \Delta G_\mathrm{H}$ that can be factorised into a property of the substituent (how strongly it donates or withdraws electrons at the reaction centre) times a property of the reaction (how sensitive the reaction is to electron density there), $\delta\Delta G_\mathrm{X} = -a_\mathrm{X}b_\mathrm{R}$; and (ii) that this holds for every reaction in a family with the same set of $a_\mathrm{X}$. Then $\log(K_\mathrm{X}/K_\mathrm{H}) = a_\mathrm{X}b_\mathrm{R}/(RT\ln 10)$. Choose a reference reaction, the ionisation of benzoic acids, and define $\sigma_\mathrm{X} = \log(K_\mathrm{X}/K_\mathrm{H})$ for it, so that its $\rho = 1$; for any other reaction, $\rho = b_\mathrm{R}/b_\mathrm{ref}$ and [[#eq-hammett]] follows. The assumptions hold when the substituent is remote and cannot interact sterically with the reaction centre, which is why *ortho* substituents are excluded, and fail when resonance with the reaction centre varies between reactions — the reason for the separate scales $\sigma^+$ and $\sigma^-$.
:::

Positive $\sigma$ means electron-withdrawing (nitro, $\sigma_p = 0.78$; cyano, 0.66; chloro, 0.23); negative means electron-donating (methyl, $\sigma_p = -0.17$; methoxy, $-0.27$; amino, $-0.66$). For an acid, $\log(K_\mathrm{X}/K_\mathrm{H}) = \mathrm{p}K_\mathrm{a,H} - \mathrm{p}K_\mathrm{a,X}$, so $\mathrm{p}K_\mathrm{a,X} = \mathrm{p}K_\mathrm{a,H} - \rho\sigma_\mathrm{X}$. In drug design σ predicts the $\mathrm{p}K_\mathrm{a}$ of aromatic acids, phenols and anilines — and through them their ionisation and $\log D$ — and describes electronic contributions to binding.

::: example Predicting pKₐ values {#ex-hammett}
Benzoic acid has $\mathrm{p}K_\mathrm{a} = 4.20$ in water at $25\ \mathrm{^\circ C}$. Using $\sigma_p(\mathrm{NO_2}) = 0.78$, $\sigma_p(\mathrm{OCH_3}) = -0.27$ and $\sigma_m(\mathrm{Cl}) = 0.37$, predict the $\mathrm{p}K_\mathrm{a}$ values of 4-nitro-, 4-methoxy- and 3-chlorobenzoic acid. (The measured values are 3.44, 4.47 and 3.83.)
::: solution
With $\rho = 1$, $\mathrm{p}K_\mathrm{a,X} = 4.20 - \sigma_\mathrm{X}$: 4-nitro, $4.20 - 0.78 = 3.42$; 4-methoxy, $4.20 + 0.27 = 4.47$; 3-chloro, $4.20 - 0.37 = 3.83$. Agreement to within 0.02 is expected, since these acids *define* the σ values. The interesting point is the sign for methoxy: an oxygen is electronegative, but in the *para* position its lone pair donates into the ring by resonance, which outweighs its inductive withdrawal, so the acid is weakened. In the *meta* position resonance donation cannot reach the carboxyl carbon and $\sigma_m(\mathrm{OCH_3}) = +0.12$.
:::
:::

::: widget regression
points: 0,4.20; -0.17,4.37; -0.27,4.47; 0.23,3.98; 0.37,3.83; 0.71,3.45; 0.78,3.44
degree: 1
x: -0.4, 0.9
y: 3.2, 4.7
caption: A Hammett plot: measured $\mathrm{p}K_\mathrm{a}$ values of benzoic acid and its 4-methyl, 4-methoxy, 4-chloro, 3-chloro, 3-nitro and 4-nitro derivatives in water at $25\ \mathrm{^\circ C}$ against the substituent constant σ. The least-squares slope is $-1.01$ and the intercept $4.20$, as [[#eq-hammett]] requires for the reference reaction ($\rho = 1$). Drag a point to see how a single anomalous substituent — an *ortho* group, say, with a steric effect that σ does not describe — would distort the fitted line.
:::

### Lipophilicity: the π constant

Hansch and Toshio Fujita realised that the octanol–water partition coefficient behaves additively in the same way.

::: definition The hydrophobic substituent constant π {#def-pi}
The **hydrophobic substituent constant** of substituent X on a parent compound is
$$
\pi_\mathrm{X} = \log_{10}P_\mathrm{X} - \log_{10}P_\mathrm{H},
$$ {#eq-pi}
where $P$ is the octanol–water partition coefficient of the neutral compound. Values are tabulated for substituents on benzene (Hansch, Leo and colleagues): for example $\pi(\mathrm{CH_3}) = 0.56$, $\pi(\mathrm{Cl}) = 0.71$, $\pi(\mathrm{Br}) = 0.86$, $\pi(\mathrm{CF_3}) = 0.88$, $\pi(\mathrm{F}) = 0.14$, $\pi(\mathrm{OCH_3}) = -0.02$, $\pi(\mathrm{NO_2}) = -0.28$, $\pi(\mathrm{OH}) = -0.67$, $\pi(\mathrm{NH_2}) = -1.23$. To a first approximation π values are **additive**, $\log P \approx \log P_\mathrm{parent} + \sum\pi$, as long as the substituents do not interact electronically or sterically; this is an empirical regularity, since $\log P$ is a free energy of transfer and free-energy increments of non-interacting groups add.
:::

::: example Estimating log P {#ex-pi}
Benzene has $\log P = 2.13$. Estimate $\log P$ for chlorobenzene, toluene, 4-chlorotoluene and phenol. (Measured: 2.84, 2.73, 3.33, 1.46.)
::: solution
Chlorobenzene: $2.13 + 0.71 = 2.84$. Toluene: $2.13 + 0.56 = 2.69$. 4-Chlorotoluene: $2.13 + 0.71 + 0.56 = 3.40$. Phenol: $2.13 - 0.67 = 1.46$. The single-substituent estimates are exact or nearly so (they define π); the disubstituted compound is overestimated by 0.07, a typical error from small electronic interactions between the groups. Fragment-based programs for calculated $\log P$ ("clogP") extend the same additivity to whole molecules, with correction factors for interacting groups.
:::
:::

### Hansch analysis

::: proposition The Hansch equation and the optimum lipophilicity {#prop-hansch}
For a congeneric series acting by the same mechanism, let $C$ be the molar concentration producing a fixed biological effect. Hansch's **empirical** model expresses the potency as a linear free-energy relationship in substituent parameters,
$$
\log_{10}\frac{1}{C} = -a\,\pi^2 + b\,\pi + \rho\,\sigma + c, \qquad a > 0,
$$ {#eq-hansch}
whose coefficients $a$, $b$, $\rho$ and $c$ are found by multiple linear regression. The potency is greatest at the **optimum lipophilicity**
$$
\pi_0 = \frac{b}{2a}
$$ {#eq-pi0}
(or, when the equation is written in $\log P$, at $\log P_0 = b/2a$).
:::

::: proof
The terms have physical motivations. Potency in a biological test depends both on reaching the site (transport through aqueous and lipid phases, which Hansch modelled as a random walk whose success first rises and then falls with lipophilicity, because very lipophilic compounds are trapped in the first membrane or fat they meet and very hydrophilic ones never enter it) and on binding (partly hydrophobic, so linear in π, and partly electronic, linear in σ by [[#eq-hammett]]). A parabola in π is the simplest function with a maximum. For the optimum, differentiate at constant σ:
$$
\frac{\partial\log(1/C)}{\partial\pi} = -2a\pi + b = 0 \quad\Rightarrow\quad \pi_0 = \frac{b}{2a},
$$
and $\partial^2/\partial\pi^2 = -2a < 0$ confirms a maximum. Because the model is empirical, the existence of an optimum is a finding to be tested for each series, not a consequence of theory; Hugo Kubinyi's bilinear model (1977), which rises linearly and then falls linearly, often fits better.
:::

A Hansch analysis gives more than a prediction. The sign and size of ρ say whether electron-withdrawing groups help binding; a coefficient of π close to 1 suggests the substituent is fully buried in a hydrophobic environment; an optimum $\log P$ near 2 is often found for compounds that must cross the blood–brain barrier. And the equation identifies where the series' best compound lies in descriptor space, suggesting which substituent to make next.

::: example A Hansch fit {#ex-hansch}
A series of 4-substituted analogues with nearly identical σ (all alkyl or alkyl-like groups) gives the following potencies: $(\pi, \log 1/C) = (0, 4.05), (0.5, 4.58), (1.0, 5.02), (1.5, 5.10), (2.0, 5.03), (2.5, 4.60), (3.0, 3.95)$. Fit a parabola, find the optimum π, and predict whether a substituent with $\pi = 1.98$ (*tert*-butyl) or $\pi = 0.56$ (methyl) should be more potent.
::: solution
Least squares (the regression figure below) gives $\log(1/C) = -0.502\pi^2 + 1.489\pi + 4.017$. By [[#eq-pi0]], $\pi_0 = 1.489/(2 \times 0.502) = 1.48$. Predicted potencies: *tert*-butyl, $-0.502(1.98)^2 + 1.489(1.98) + 4.017 = 4.99$; methyl, $-0.502(0.56)^2 + 1.489(0.56) + 4.017 = 4.69$. The *tert*-butyl compound should be about twice as potent ($10^{0.30}$). The optimum lies near an ethyl or isopropyl group ($\pi \approx 1.0$–$1.5$); extending further into *n*-butyl or larger is predicted to lose activity. The prediction assumes the bulky *tert*-butyl group has no steric clash that π does not describe — a steric parameter (Taft's $E_\mathrm{s}$ or a volume) would be added if it did.
:::
:::

::: widget regression
points: 0,4.05; 0.5,4.58; 1.0,5.02; 1.5,5.10; 2.0,5.03; 2.5,4.60; 3.0,3.95
degree: 2
x: -0.5, 3.5
y: 3.5, 5.5
caption: The Hansch parabola of [[#ex-hansch]]: potency $\log(1/C)$ against the hydrophobic constant π of the substituent. The fitted quadratic peaks at $\pi_0 = b/2a \approx 1.5$. Drag the two right-most points upwards — as if very lipophilic analogues had stayed potent — and the optimum moves right; set the degree in your mind to 1 and you see why fitting a straight line to such data would miss the optimum entirely.
:::

### Free–Wilson analysis

Spencer Free and James Wilson (1964) proposed a model that needs no physicochemical parameters at all: each substituent at each position contributes a fixed increment to $\log(1/C)$,
$$
\log\frac{1}{C} = \mu + \sum_{i}\sum_{j} a_{ij}x_{ij},
$$ {#eq-freewilson}
where $x_{ij} = 1$ if substituent $j$ is present at position $i$ and 0 otherwise, $a_{ij}$ is its contribution and $\mu$ the activity of the parent. The contributions are fitted by regression over a matrix of compounds. Free–Wilson analysis predicts untested combinations of substituents already seen in the data set; it cannot predict new substituents, and it fails whenever substituents interact (non-additivity), which is itself diagnostic — for example of a change in binding mode.

::: example Testing additivity {#ex-freewilson}
A parent compound (H at positions 1 and 2) has $\mathrm{pIC_{50}} = 5.0$. With Cl, CH₃ or H at position 1 and OCH₃ or H at position 2, the measured values are: (Cl, H) 5.8; (CH₃, H) 5.4; (H, OCH₃) 5.5; (Cl, OCH₃) 6.2; (CH₃, OCH₃) 6.9. Find the Free–Wilson contributions from the monosubstituted compounds, predict the two disubstituted compounds, and interpret any discrepancy at $298\ \mathrm{K}$.
::: solution
With $\mu = 5.0$ for the parent, the single-substituent compounds give the increments directly: $a_{1,\mathrm{Cl}} = 5.8 - 5.0 = 0.8$, $a_{1,\mathrm{CH_3}} = 0.4$, $a_{2,\mathrm{OCH_3}} = 0.5$. (With more compounds than unknowns these would be fitted by least squares.) Additivity predicts (Cl, OCH₃) $= 5.0 + 0.8 + 0.5 = 6.3$ and (CH₃, OCH₃) $= 5.0 + 0.4 + 0.5 = 5.9$. The first agrees with the measured 6.2 within typical assay error (±0.1–0.2 log units). The second is underpredicted by 1.0 log unit: the pair is tenfold more potent than additivity allows, an extra $5.71 \times 1.0 = 5.7\ \mathrm{kJ\,mol^{-1}}$ of binding free energy. Such **non-additivity** says the two substituents do not act independently — perhaps the methyl and methoxy together force a twist that pre-organises the bound conformation, or the combination shifts the molecule into a different binding mode. It is a signal to obtain a crystal structure, not noise to be averaged away.
:::
:::

Hansch and Free–Wilson analyses are complementary. A Hansch equation interpolates and extrapolates in descriptor space, so it can suggest substituents that have never been made, but it needs descriptors that capture the relevant physics; a Free–Wilson model needs no descriptors, but only redistributes what has been seen. Mixed models — Free–Wilson indicator variables added to a Hansch equation — are used when one position behaves additively and another does not.

## Building and trusting a QSAR model

Modern quantitative structure–activity relationships go far beyond σ and π. Descriptors include calculated $\log P$, polar surface area, molar refractivity (a measure of volume and polarisability), counts of donors and acceptors, topological indices, and, in **3D-QSAR** methods such as comparative molecular field analysis (CoMFA; Richard Cramer and colleagues, 1988), the steric and electrostatic interaction energies of aligned molecules with a probe atom at thousands of grid points. Machine-learning models — random forests, support vector machines, graph neural networks — fit activity to hundreds or thousands of such descriptors. The more flexible the model, the greater the danger that it fits noise.

::: definition Goodness of fit and cross-validated predictivity {#def-q2}
For $n$ compounds with measured activities $y_i$, mean $\bar y$ and fitted values $\hat y_i$, the **coefficient of determination** is
$$
r^2 = 1 - \frac{\sum_i (y_i - \hat y_i)^2}{\sum_i (y_i - \bar y)^2}.
$$
The **cross-validated** $q^2$ replaces each fitted value by the prediction $\hat y_{(i)}$ of a model refitted *without* compound $i$ (leave-one-out) or without a block of compounds:
$$
q^2 = 1 - \frac{\mathrm{PRESS}}{\sum_i (y_i - \bar y)^2}, \qquad \mathrm{PRESS} = \sum_i \bigl(y_i - \hat y_{(i)}\bigr)^2 .
$$ {#eq-q2}
$r^2$ measures how well a model describes the data used to build it; $q^2$ estimates how well it predicts data it has not seen. Since every left-out prediction is at least as poor on average as the fitted value, $q^2 \le r^2$ in practice.
:::

A model with $r^2 = 0.95$ and $q^2 = 0.2$ has memorised its training set. Practical rules, all **empirical**, follow from this: use at least five compounds per fitted descriptor (John Topliss and Robert Costello, 1972, showed that random numbers regressed against random descriptors give impressive $r^2$ values when the ratio is lower); test the final model on an external set of compounds that played no part in choosing it, preferably made later in time; and remember that the accuracy of the model cannot exceed that of the assay, typically ±0.2–0.3 log units, so any claimed root-mean-square error below that is suspect. A QSAR model also has an **applicability domain**: it predicts only for compounds resembling those it was trained on.

::: example Fit or prediction? {#ex-q2}
A five-descriptor model for 20 compounds has residual sum of squares $\sum(y_i - \hat y_i)^2 = 0.90$; the total sum of squares about the mean is $\sum(y_i - \bar y)^2 = 9.0$ (log units squared); leave-one-out cross-validation gives $\mathrm{PRESS} = 4.5$. Calculate $r^2$ and $q^2$ and comment on the compounds-per-descriptor ratio.
::: solution
$r^2 = 1 - 0.90/9.0 = 0.90$; by [[#eq-q2]], $q^2 = 1 - 4.5/9.0 = 0.50$. The gap is large: the model explains 90 % of the variance it was fitted to but only half of the variance in compounds it has not seen. With 20 compounds and 5 descriptors the ratio is 4, below the guideline of 5, so the descriptor set should be pruned — a model with two or three descriptors and $q^2$ close to its $r^2$ would be more trustworthy. The root-mean-square prediction error, $\sqrt{4.5/20} = 0.47$ log units, is about a factor of 3 in potency.
:::
:::

### Making the next compound: the Topliss tree

Medicinal chemists rarely fit a full QSAR model before they have a dozen compounds. Topliss proposed in 1972 an operational scheme that uses the logic of Hansch analysis one compound at a time, for substituents on a benzene ring.

::: algorithm The Topliss decision tree for aromatic substituents (abridged) {#algo-topliss}
Starting from the unsubstituted phenyl compound (H):
1. Make the **4-chloro** analogue (π and σ both positive). Compare its potency with the parent: more (M), equal (E) or less (L).
2. If **M**, lipophilicity and/or electron withdrawal help: make **3,4-dichloro** (both increased further). If that is better again, continue towards larger π + σ (for example 3-CF₃-4-Cl); if worse, the optimum has been passed or a steric limit reached.
3. If **E**, the gains in π and σ may be cancelling (for example a negative ρ offset by a positive π coefficient): make **4-methyl** (π positive, σ negative).
4. If **L**, either electron withdrawal hurts or there is a steric problem at position 4: make **4-methoxy** (π ≈ 0, σ negative); if that is also worse, explore the 3-position.
5. At each branch, the next substituent is the one that best separates the remaining hypotheses about the signs of the π and σ coefficients.
:::

The scheme works because each comparison is a crude measurement of the signs in [[#eq-hansch]]; its power is that it reaches a good substituent in a few syntheses rather than a full matrix. Its limitation is the same as Hansch analysis: it assumes the compounds bind in the same way, and a steric clash or a new interaction overrides it.

## Optimising the whole molecule

Potency is only one of the properties a lead must acquire. A medicine must also be selective, soluble, permeable, metabolically stable, free of toxic liabilities such as hERG channel block ([[medicinal-chemistry/drug-targets]]) and makeable. **Multiparameter optimisation** treats these together, and much of SAR in practice is the search for changes that fix one property without spoiling the others. The characteristic moves are:

- **Blocking metabolism.** A *para* position oxidised by cytochrome P450 ([[medicinal-chemistry/pharmacokinetics]]) is capped with fluorine; a benzylic methyl is replaced by CF₃ or removed; an electron-rich ring is replaced by an electron-poor heterocycle.
- **Reducing lipophilicity.** Each unit of $\log P$ removed tends to improve solubility, reduce clearance and reduce off-target binding. Replacing CH by N in an aromatic ring, adding a polar group where it points into solvent, or saturating a ring are typical. The aim is to raise LLE ([[medicinal-chemistry/hits-and-leads#def-le]]), gaining potency per unit of lipophilicity.
- **Tuning p*K*ₐ.** Fluorine near an amine lowers its p*K*ₐ (by about 1–2 units per β-fluorine), reducing the fraction protonated at pH 7.4, which can improve permeability or reduce hERG binding (to which lipophilic bases are prone).
- **Solvent-exposed handles.** The part of a ligand pointing out of the binding site into solvent can be changed freely to tune solubility and pharmacokinetics; kinase inhibitors such as imatinib carry a solubilising piperazine there ([[medicinal-chemistry/drug-case-studies]]).
- **Prodrugs.** When the active form cannot be absorbed — usually because it is too polar — a group is masked by a cleavable one: enalapril, the ethyl ester of the diacid enalaprilat, is the classic case.

::: example Fluorine and basicity {#ex-fluorine}
A lead contains a piperidine nitrogen with $\mathrm{p}K_\mathrm{a} = 9.8$. Introducing a fluorine β to the nitrogen lowers the $\mathrm{p}K_\mathrm{a}$ to 8.2 (an illustrative shift within the usual range). Calculate the fraction of the compound that is un-ionised at pH 7.4 before and after, and the change in $\log D_{7.4}$ if $\log P$ of the neutral base is unchanged.
::: solution
For a base, the un-ionised fraction is $f = 1/(1 + 10^{\mathrm{p}K_\mathrm{a} - \mathrm{pH}})$ ([[medicinal-chemistry/pharmacokinetics#eq-logd-base]]). Before: $f = 1/(1 + 10^{2.4}) = 1/252.2 = 3.97\times10^{-3}$. After: $f = 1/(1 + 10^{0.8}) = 1/7.31 = 0.137$. Since $\log D = \log P + \log f$, $\log D$ rises by $\log(0.137/3.97\times10^{-3}) = 1.54$ units. The neutral fraction, which crosses membranes, increases about 35-fold. In practice fluorine also changes $\log P$ slightly and can alter conformation, so the effect on permeability and on binding has to be measured — and if the protonated amine made a salt bridge to the target, potency may fall.
:::
:::

::: quiz
A Free–Wilson model has been fitted to 30 analogues containing H, F, Cl or CH₃ at position 3 and H or OH at position 5. Which of the following can it legitimately do?
- [x] Predict the activity of an untested analogue with Cl at position 3 and OH at position 5.
- [ ] Predict the activity of the 3-bromo analogue.
- [ ] Predict the activity of a compound in which the central ring has been changed from benzene to pyridine.
- [ ] Prove that the 3-substituent interacts with a hydrophobic pocket.
::: solution
Free–Wilson increments exist only for substituents and positions in the training set, so the model can predict new *combinations* of known substituents (if they are additive) but not a new substituent (bromo), and certainly not a new scaffold. Its increments are correlations, not structural evidence: a hydrophobic interpretation would need a Hansch-type analysis, a structure or further experiments.
:::
:::

::: history
Alexander Crum Brown and Thomas Fraser's paper of 1868 was the first explicit statement that biological action is a function of chemical constitution. Irving Langmuir defined isosterism in 1919, and Harris Friedman introduced the term bioisostere in 1951. Louis Hammett published his equation for the effect of *meta* and *para* substituents in 1937. Corwin Hansch, Toshio Fujita and colleagues at Pomona College published the analysis of plant-growth regulators that founded QSAR in 1962 and the π constant and the general Hansch equation in 1964; in the same year Spencer Free and James Wilson published their additive model. John Topliss published his decision tree in 1972, and with Robert Costello his warning about chance correlations in the same year. Hugo Kubinyi proposed the bilinear model in 1977, and Richard Cramer, David Patterson and Jeffrey Bunce introduced CoMFA in 1988. James Black's work on β-blockers and on histamine $\mathrm{H_2}$ antagonists, both built on systematic SAR, was recognised with the Nobel Prize in Physiology or Medicine in 1988.
:::

## Where this leads

SAR tells us what matters; protein structures tell us why. [[medicinal-chemistry/structure-based-design]] uses crystal structures, docking and free-energy calculations to make the moves of this chapter deliberate rather than empirical, and [[medicinal-chemistry/drug-case-studies]] follows SAR campaigns that produced β-lactams, ACE inhibitors, statins and kinase inhibitors. The pharmacokinetic consequences of the property changes discussed here are in [[medicinal-chemistry/pharmacokinetics]]. Multiple linear regression and cross-validation are treated in Maths Atlas (`/learn/maths/`), and the physical organic chemistry behind σ in [[organic-2/aromatic-substitution]].

::: summary
- Structure–activity relationships are found by removing or masking groups one at a time and reading the changes as free energies ($5.7\ \mathrm{kJ\,mol^{-1}}$ per factor of 10 at $298\ \mathrm{K}$); the essential features and their 3D arrangement form the pharmacophore.
- Skeleton changes — homologation, ring variation, extension and conformational restriction — tune potency; activity cliffs such as "magic methyl" effects are usually conformational.
- Bioisosteres (tetrazole for carboxylic acid, F for H, heterocycles for benzene) keep activity while changing other properties; whether a replacement works is an empirical finding for each target.
- The Hammett equation $\log(K_\mathrm{X}/K_\mathrm{H}) = \rho\sigma$ and the additive constant $\pi = \log P_\mathrm{X} - \log P_\mathrm{H}$ are empirical linear free-energy relationships.
- Hansch analysis, $\log(1/C) = -a\pi^2 + b\pi + \rho\sigma + c$, correlates potency with lipophilicity and electronics and gives an optimum $\pi_0 = b/2a$; Free–Wilson analysis fits additive substituent increments, and non-additivity signals a change in binding.
- A QSAR model is judged by its cross-validated $q^2$ and by external prediction, not by $r^2$; use few descriptors per compound and stay within the applicability domain.
- Lead optimisation is multiparameter: blocking metabolism, lowering lipophilicity, tuning p*K*ₐ and using prodrugs matter as much as potency.
:::

## Exercises

::: exercise The value of a group {level=1 check="8.4"}
Removing a hydroxyl group from an enzyme inhibitor raises $K_\mathrm{I}$ thirtyfold. Calculate the loss of binding free energy at $298\ \mathrm{K}$. (Enter $\Delta\Delta G$ in $\mathrm{kJ\,mol^{-1}}$ to two significant figures.)
::: solution
$\Delta\Delta G = RT\ln 30 = 2.303 \times 8.314 \times 298.15 \times \log 30\ \mathrm{J\,mol^{-1}} = 5.708 \times 1.477\ \mathrm{kJ\,mol^{-1}} = 8.4\ \mathrm{kJ\,mol^{-1}}$. That is typical of a good neutral hydrogen bond in a well-placed position — but as [[#ex-removal]] shows, it does not by itself say whether the OH acts as donor or acceptor.
:::
:::

::: exercise A Hammett prediction {level=1 check="3.97"}
Using $\sigma_p(\mathrm{Cl}) = 0.23$ and $\mathrm{p}K_\mathrm{a} = 4.20$ for benzoic acid, predict the $\mathrm{p}K_\mathrm{a}$ of 4-chlorobenzoic acid in water at $25\ \mathrm{^\circ C}$. (Enter the $\mathrm{p}K_\mathrm{a}$.)
::: solution
With $\rho = 1$, $\mathrm{p}K_\mathrm{a} = 4.20 - 0.23 = 3.97$ (measured 3.98). Chlorine withdraws electrons inductively more than it donates by resonance, stabilising the carboxylate.
:::
:::

::: exercise Additive lipophilicity {level=1 check="3.55"}
Benzene has $\log P = 2.13$. Use $\pi(\mathrm{Cl}) = 0.71$ to estimate $\log P$ of 1,4-dichlorobenzene, and compare with the measured value of 3.44. (Enter the estimated $\log P$.)
::: solution
$\log P \approx 2.13 + 2 \times 0.71 = 3.55$, an overestimate of 0.11. The two chlorines each withdraw electrons from the ring, so each is slightly less lipophilic in the presence of the other than on its own — a small interaction term, of the kind that fragment-based clogP methods correct for.
:::
:::

::: exercise Cross-validation {level=1 check="0.7"}
A QSAR model has total sum of squares $4.0$ and leave-one-out $\mathrm{PRESS} = 1.2$ (log units squared). Calculate $q^2$. (Enter $q^2$ to one significant figure.)
::: solution
By [[#eq-q2]], $q^2 = 1 - 1.2/4.0 = 0.70$. A value above about 0.5 is usually regarded as indicating a model with genuine predictive ability, subject to confirmation on an external test set.
:::
:::

::: exercise Hammett for phenols {level=2 check="9.16"}
The ionisation of phenols in water at $25\ \mathrm{^\circ C}$ has $\rho = 2.23$, and phenol has $\mathrm{p}K_\mathrm{a} = 9.99$. Predict the $\mathrm{p}K_\mathrm{a}$ of 3-chlorophenol ($\sigma_m = 0.37$). Explain why ρ is larger than for benzoic acids. (Enter the $\mathrm{p}K_\mathrm{a}$ to two decimal places.)
::: solution
$\mathrm{p}K_\mathrm{a} = 9.99 - 2.23 \times 0.37 = 9.99 - 0.825 = 9.16$ (measured 9.12). In a phenoxide the negative charge is on an oxygen attached directly to the ring and is partly delocalised into it, so substituents on the ring affect its stability strongly; in a benzoate the charge sits on the carboxylate, insulated from the ring by the carboxyl carbon, so the reaction is less sensitive. For *para* substituents that can accept the phenoxide charge by resonance (NO₂, CN), the enhanced constants $\sigma^-$ must be used instead.
:::
:::

::: exercise A Free–Wilson prediction {level=2 check="6.9"}
For a series with parent $\mathrm{pIC_{50}} = 6.0$, the 4-fluoro analogue has $\mathrm{pIC_{50}} = 6.3$ and the *N*-methyl analogue 6.6. Predict $\mathrm{pIC_{50}}$ for the 4-fluoro-*N*-methyl compound assuming additivity, and state what you would conclude if the measured value were 5.6. (Enter the predicted $\mathrm{pIC_{50}}$.)
::: solution
$\mathrm{pIC_{50}} = 6.0 + 0.3 + 0.6 = 6.9$. A measured 5.6 would be 1.3 log units (20-fold) below prediction, a strongly negative interaction: the two changes cannot be made together without one disrupting the other's benefit — for instance because *N*-methylation changes the conformation so that the fluorinated ring no longer sits where it did. The pair would be a priority for structural study.
:::
:::

::: exercise Choosing a substituent with a Hansch equation {level=2 check="5.23"}
For a series of 4-substituted analogues, $\log(1/C) = -0.20\pi^2 + 0.88\pi + 0.95\sigma + 4.10$. Using the values (π, σ_p): CH₃ (0.56, −0.17), Cl (0.71, 0.23), Br (0.86, 0.23), CF₃ (0.88, 0.54), OCH₃ (−0.02, −0.27), NO₂ (−0.28, 0.78), find the predicted most potent substituent and the optimum π at constant σ. (Enter the predicted $\log(1/C)$ of the best substituent.)
::: solution
Substituting: H, 4.10; CH₃, $-0.20(0.314) + 0.493 - 0.162 + 4.10 = 4.37$; Cl, 4.84; Br, 4.93; CF₃, $-0.20(0.774) + 0.774 + 0.513 + 4.10 = 5.23$; OCH₃, 3.83; NO₂, 4.58. CF₃ is best, because it combines a large π with strong electron withdrawal (ρ is positive). The optimum at constant σ is $\pi_0 = 0.88/(2 \times 0.20) = 2.2$, well beyond any single small substituent, so disubstitution (3-CF₃-4-Cl, say) would be worth exploring — though steric effects, which this equation ignores, may intervene.
:::
:::

::: exercise Paying for flexibility {level=3 check="26"}
A flexible lead binds with $K_\mathrm{d} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$. A cyclised analogue freezes three rotatable bonds in exactly the bound conformation, without strain and without changing any contact. (a) Taking an illustrative entropic cost of $3.0\ \mathrm{kJ\,mol^{-1}}$ per rotatable bond frozen on binding, estimate $K_\mathrm{d}$ of the cyclised analogue at $298\ \mathrm{K}$. (b) Explain why the actual gain is usually smaller, and what a large *loss* of activity on cyclisation would tell you. (Enter $K_\mathrm{d}$ in $\mathrm{nmol\,dm^{-3}}$ to two significant figures.)
::: hint
The cyclised analogue avoids paying $3 \times 3.0\ \mathrm{kJ\,mol^{-1}}$; convert this free-energy gain into a factor with $\exp(\Delta\Delta G/RT)$.
:::
::: solution
(a) The gain is $\Delta\Delta G = 9.0\ \mathrm{kJ\,mol^{-1}}$, a factor of $\exp(9000/(8.314 \times 298.15)) = \exp(3.63) = 37.7$. So $K_\mathrm{d} = 1000\ \mathrm{nmol\,dm^{-3}}/37.7 = 26\ \mathrm{nmol\,dm^{-3}}$.

(b) The estimate assumes the free ligand's rotors were fully free and that the new ring adds no strain, no new steric contacts and no change in desolvation; in practice rings introduce small strains, the flexible ligand already populated the bound conformation to some extent, and the per-bond entropy cost itself varies (estimates range from about 1 to 4 $\mathrm{kJ\,mol^{-1}}$). Gains of 3–10-fold are common; 40-fold is optimistic. A large loss — say 100-fold — means the ring has locked the molecule in a conformation other than the bioactive one, which is itself valuable information: a set of rigid analogues maps out the bioactive conformation.
:::
:::

::: exercise Hansch from first principles {level=3}
(a) Show that if a substituent's contribution to binding free energy is proportional to its transfer free energy from water to octanol, $\delta\Delta_\mathrm{b}G = \beta\,\delta\Delta_\mathrm{tr}G$, then $\log(1/C)$ is linear in π with slope β. (b) Show that adding a term $-a\pi^2$ gives an optimum, and find the optimum π and the maximum potency gain over the parent for $a = 0.30$, $b = 1.2$. (c) Explain why an optimum $\log P$ might arise in a cellular or whole-animal assay but not in a binding assay on purified protein.
::: hint
$\pi = \log P_\mathrm{X} - \log P_\mathrm{H} = -\delta\Delta_\mathrm{tr}G/(RT\ln 10)$ with $\Delta_\mathrm{tr}G$ the free energy of transfer from water to octanol.
:::
::: solution
(a) $\log P = -\Delta_\mathrm{tr}G/(RT\ln 10)$, so $\pi_\mathrm{X} = -\delta\Delta_\mathrm{tr}G_\mathrm{X}/(RT\ln 10)$. If the effective concentration $C$ is that at which a fixed fraction of target is occupied, $C \propto K_\mathrm{d}$ and $\log(1/C) = -\Delta_\mathrm{b}G/(RT\ln 10) + \text{const}$. Then $\log(1/C_\mathrm{X}) - \log(1/C_\mathrm{H}) = -\beta\,\delta\Delta_\mathrm{tr}G/(RT\ln 10) = \beta\pi_\mathrm{X}$: linear in π with slope β. A slope of 1 means the substituent is as fully desolvated in the binding site as in octanol.

(b) $\log(1/C) = -a\pi^2 + b\pi + c$ has derivative $-2a\pi + b$, zero at $\pi_0 = b/2a = 1.2/0.60 = 2.0$; the second derivative $-2a$ is negative, so this is a maximum. The gain over the parent ($\pi = 0$) is $-a\pi_0^2 + b\pi_0 = b^2/4a = 1.44/1.20 = 1.2$ log units, a factor of 16.

(c) In a purified-protein assay the ligand is free in buffer at known concentration, and binding to a hydrophobic site keeps improving with lipophilicity until solubility fails. In cells or animals, the compound must partition through aqueous and lipid compartments: very lipophilic compounds bind to membranes, plasma proteins and fat, are metabolised faster and are less soluble, so the free concentration at the target falls. The parabola describes this transport and distribution, which is why Hansch's optimum $\log P$ values were largest in simple systems and smallest in whole organisms.
:::
:::
