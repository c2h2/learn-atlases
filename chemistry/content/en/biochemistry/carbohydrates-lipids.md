A slice of bread, a cotton shirt and the shell of a crab are made of the same sugar, D-glucose (or, for the crab, its *N*-acetylated amino derivative), joined in different ways. Starch is digested in minutes; cellulose passes through us untouched; chitin armours an insect for life. The difference is a single stereochemical descriptor at one carbon atom — α or β — and the way that choice propagates into the shape of a chain. A drop of olive oil and the membrane around every cell are likewise built from the same few fatty acids, but one is a featureless liquid and the other a two-molecule-thick sheet that holds a voltage of about $70\ \mathrm{mV}$ across $4\ \mathrm{nm}$ — a field of nearly $2\times10^{7}\ \mathrm{V\,m^{-1}}$. This chapter explains both families of molecules from the organic chemistry you already know (stereocentres, hemiacetals and acetals, esters) and the noncovalent forces of [[biochemistry/water-noncovalent]], and then asks the thermodynamic question that every cell must answer: what does it cost to move a molecule or an ion across a membrane? The stereochemical language is that of [[organic-1/stereochemistry]]; the acetal chemistry is that of [[organic-2/carbonyl-addition]].

## Monosaccharides

A **monosaccharide** is a polyhydroxy aldehyde or ketone with the formula $(\mathrm{CH_2O})_n$, $n = 3$ to $7$. Aldehydes are **aldoses**, ketones **ketoses**, and the carbon count gives the rest of the name: trioses, tetroses, pentoses, hexoses. The smallest are glyceraldehyde (an aldotriose) and dihydroxyacetone (a ketotriose), both intermediates of glycolysis. The most important are the aldohexose D-glucose, the ketohexose D-fructose, and the aldopentoses D-ribose and 2-deoxy-D-ribose of RNA and DNA ([[biochemistry/nucleic-acids]]).

### Configuration: D and L

Every carbon of an open-chain aldose except the carbonyl carbon and the terminal $\mathrm{CH_2OH}$ is a stereocentre. An aldose with $n$ carbons therefore has $n - 2$ stereocentres and $2^{n-2}$ stereoisomers. Carbohydrate chemists label them with the older **Fischer convention** rather than with *R*/*S* descriptors: draw the chain vertically in a Fischer projection with the carbonyl group at the top, and look at the stereocentre *farthest* from the carbonyl. If its hydroxyl points to the right the sugar is **D**, if to the left **L**, by comparison with D- and L-glyceraldehyde. Natural sugars are overwhelmingly D. The D/L label says nothing about the sign of optical rotation (D-fructose is laevorotatory) and nothing about the other stereocentres, which are encoded in the trivial name: D-glucose, D-mannose and D-galactose are three of the eight D-aldohexoses.

Two sugars that differ in configuration at exactly one stereocentre are **epimers**: D-mannose is the C-2 epimer of D-glucose and D-galactose its C-4 epimer. Epimerisation is a real biochemical reaction — galactose from milk is converted into glucose by inverting C-4 on a nucleotide-activated sugar — so the word is not just bookkeeping.

::: example Counting aldohexoses {#ex-aldohexoses}
How many stereoisomeric aldohexoses are there, how many are D, and how are D-glucose and L-glucose related?
::: solution
An aldohexose, $\mathrm{OHC{-}(CHOH)_4{-}CH_2OH}$, has stereocentres at C-2, C-3, C-4 and C-5, so there are $2^4 = 16$ stereoisomers. The D/L label is fixed by C-5 alone, and C-2 to C-4 can take any of $2^3 = 8$ arrangements, so there are 8 D-aldohexoses (allose, altrose, glucose, mannose, gulose, idose, galactose, talose) and their 8 L enantiomers. L-Glucose is the mirror image of D-glucose: it differs at *all four* stereocentres, not only at C-5. Changing only C-5 would give a different D/L-labelled sugar, L-idose — a diastereomer, not an enantiomer. This is the most common slip with the Fischer convention: D and L name a pair of enantiomers, but they are *assigned* by one carbon.
:::
:::

### Ring formation

An aldehyde and an alcohol add reversibly to give a **hemiacetal** ([[organic-2/carbonyl-addition]]). In a sugar both groups are in the same molecule, and when they are separated by the right number of atoms the addition is intramolecular and strongly favoured: ring strain is small for five- and six-membered rings, and the entropy cost of bringing the two groups together has already been paid by the chain. In D-glucose the C-5 hydroxyl attacks the C-1 aldehyde to give a six-membered ring containing one oxygen, called a **pyranose** after pyran; attack by the C-4 hydroxyl gives a five-membered **furanose** after furan. Fructose, a 2-ketose, forms a hemiketal; in sucrose and in fructose 1,6-bisphosphate it is a furanose. In water at equilibrium more than $99\ \%$ of glucose is cyclic, and the open-chain aldehyde is a fraction of one per cent.

Ring closure creates a new stereocentre at the former carbonyl carbon, the **anomeric carbon**: the oxygen can attack either face of the planar aldehyde.

::: definition Anomers and mutarotation {#def-anomer}
The two diastereomers of a cyclic sugar that differ only in configuration at the anomeric carbon (C-1 of an aldose, C-2 of a 2-ketose) are **anomers**. In the **α** anomer the anomeric hydroxyl is on the opposite side of the ring from the $\mathrm{CH_2OH}$ group that carries the D/L reference carbon (in a Haworth drawing of a D-sugar, the anomeric OH points down); in the **β** anomer it is on the same side (up). Because the ring opens and closes through the free carbonyl form, the anomers interconvert in solution; the resulting change of optical rotation of a freshly dissolved pure anomer, until it reaches the equilibrium value, is called **mutarotation**.
:::

The **Haworth projection** draws the ring as a flat hexagon seen edge-on, with the ring oxygen at the back right; groups on the right of the Fischer projection go down. The real pyranose is a **chair**. In β-D-glucopyranose every substituent, including the anomeric hydroxyl, is equatorial — glucose is the only aldohexose for which this is possible, and it is tempting to connect this with its dominance in nature. In α-D-glucopyranose the anomeric hydroxyl is axial.

::: example How much of each anomer? {#ex-mutarotation}
Pure α-D-glucopyranose has specific rotation $[\alpha]_\mathrm{D} = +112.2^\circ$, pure β-D-glucopyranose $+18.7^\circ$, and a glucose solution at equilibrium at $25\ \mathrm{^\circ C}$ settles at $+52.7^\circ$ (values as given by Berg et al. and Nelson and Cox). Assuming only the two pyranose anomers are present in appreciable amounts, find the equilibrium fraction of each, the equilibrium constant $K = [\beta]/[\alpha]$ and $\Delta G^\circ$ for $\alpha \rightleftharpoons \beta$ at $298.15\ \mathrm{K}$.
::: solution
Optical rotation is additive: if a fraction $x$ is β, then
$$
52.7 = 112.2\,(1 - x) + 18.7\,x \quad\Rightarrow\quad x = \frac{112.2 - 52.7}{112.2 - 18.7} = \frac{59.5}{93.5} = 0.636.
$$
So the solution is $63.6\ \%$ β and $36.4\ \%$ α, and $K = 0.636/0.364 = 1.75$. Then
$$
\Delta G^\circ = -RT\ln K = -(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})\ln 1.75 = -1.39\ \mathrm{kJ\,mol^{-1}}.
$$
The β anomer is favoured, but by much less than the roughly $3\ \mathrm{kJ\,mol^{-1}}$ that an axial hydroxyl usually costs in a cyclohexane: the axial anomeric OH of the α form is partly stabilised by the **anomeric effect**, a preference of an electronegative substituent next to a ring oxygen for the axial position (explained by donation from a ring-oxygen lone pair into the $\sigma^*$ orbital of the axial $\mathrm{C{-}O}$ bond). The small furanose and open-chain populations make the "two-component" assumption good to about $1\ \%$.
:::
:::

Mutarotation is first order in the approach to equilibrium. Uncatalysed it takes hours at room temperature; it is accelerated by acid and base (the ring opening is a general acid–base catalysed hemiacetal cleavage, [[kinetics/homogeneous-catalysis]]) and, in cells, by the enzyme mutarotase. The figure shows the decay of the optical rotation towards the equilibrium value.

::: widget plot
f: 52.7 + (112.2 - 52.7)*exp(-k*x); 52.7 + (18.7 - 52.7)*exp(-k*x)
x: 0, 300
y: 0, 120
sliders: k=0.02:0.002:0.1:0.002
labels: \text{start from }\alpha; \text{start from }\beta
hlines: 52.7
caption: Mutarotation of D-glucose: specific rotation (in degrees) against time $x$ (in minutes) for a solution made from pure α (upper curve) or pure β (lower curve), with the relaxation rate constant $k$ (in $\mathrm{min^{-1}}$, set by the slider) equal to the sum of the forward and reverse rate constants. Both curves approach the same equilibrium value, $+52.7^\circ$, which corresponds to $63.6\ \%$ β. The value of $k$ shown is illustrative; acid, base and the enzyme mutarotase all raise it.
:::

### Reducing sugars and derivatives

Because the ring opens, a cyclic sugar with a free anomeric hydroxyl behaves as an aldehyde in slow reactions: it reduces mild oxidants such as $\mathrm{Cu^{2+}}$ in alkaline solution (Fehling's and Benedict's tests, which deposit red $\mathrm{Cu_2O}$) or $\mathrm{Ag^+}$ (Tollens' test). Such a sugar is called a **reducing sugar**. Glucose oxidase, which oxidises the β anomer at C-1 to the lactone, is the basis of glucose test strips and sensors. Ketoses also test positive, because base isomerises them to aldoses through an enediol — the same reaction catalysed in glycolysis by phosphohexose isomerase ([[biochemistry/glycolysis-citric-acid]]).

Cells modify monosaccharides extensively. **Phosphate esters** such as glucose 6-phosphate are the working form of sugars inside cells: the negative charge traps them in the cytosol and gives enzymes a binding handle. **Amino sugars** replace a hydroxyl by an amino group (glucosamine; *N*-acetylglucosamine, GlcNAc, in chitin and bacterial cell walls). **Deoxy sugars** lack a hydroxyl (2-deoxyribose). **Sugar acids** and **sugar alcohols** come from oxidation and reduction (gluconate, glucuronate, sorbitol).

## The glycosidic bond

A hemiacetal reacts with a second alcohol, with loss of water, to give an **acetal**. In sugars the acetal carbon is the anomeric carbon, and the new bond is the glycosidic bond.

::: definition Glycosidic bond {#def-glycosidic}
A **glycosidic bond** is the bond from the anomeric carbon of a sugar to an oxygen (an **O-glycoside**) or nitrogen (an **N-glycoside**) of another molecule, formed by replacing the anomeric hydroxyl. It is named by the anomeric configuration and the two carbon numbers it joins: in maltose the C-1 of one glucose (α) is linked to O-4 of the next, written **Glc(α1→4)Glc**. Formation of the glycoside fixes the configuration at the anomeric carbon: the ring can no longer open, the glycosidic residue does not mutarotate, and it does not reduce Fehling's solution. A residue whose anomeric carbon is still a free hemiacetal is a **reducing end**; the other end of a chain, whose C-4 hydroxyl is free, is a **non-reducing end**.
:::

Chemically, a glycoside is an acetal: stable to base, hydrolysed by aqueous acid through an oxocarbenium ion, and hydrolysed in biology by **glycosidases**, which are specific for both the sugar and the anomeric configuration. In cells glycosidic bonds are not made by condensing free sugars with alcohols — the equilibrium in water lies on the side of hydrolysis — but by **glycosyltransferases** that transfer the sugar from an activated donor, a nucleotide sugar such as UDP-glucose.

::: example Is a glycosidic bond stable? {#ex-maltose}
For maltose + $\mathrm{H_2O} \rightarrow 2$ glucose, Nelson and Cox give $\Delta G^{\circ\prime} = -15.5\ \mathrm{kJ\,mol^{-1}}$. Calculate the equilibrium constant at $298.15\ \mathrm{K}$, and reconcile it with the fact that a maltose solution can be kept at neutral pH for years.
::: solution
$$
K = \exp\!\left(-\frac{\Delta G^{\circ\prime}}{RT}\right) = \exp\!\left(\frac{15\,500\ \mathrm{J\,mol^{-1}}}{(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})}\right) = e^{6.253} = 5.2\times10^{2}.
$$
With concentrations in $\mathrm{mol\,dm^{-3}}$ (water at unit activity), $K = [\mathrm{glucose}]^2/[\mathrm{maltose}] = 520\ \mathrm{mol\,dm^{-3}}$: at any realistic concentration hydrolysis is essentially complete at equilibrium. ($K$ has units because one molecule becomes two; this is also why dilution drives hydrolysis further.) The bond survives because hydrolysis is slow: at neutral pH and room temperature the uncatalysed half-life of a glycosidic bond is measured in millions of years, since the oxocarbenium-ion transition state is reached only with acid catalysis. Glycosidases reach rate enhancements of $10^{15}$ or more. Thermodynamically unstable, kinetically inert: that combination is exactly what a storage polymer needs, because the cell decides when to release glucose by deciding when to make the enzyme act.
:::
:::

### Disaccharides

Three disaccharides matter in nutrition. **Maltose**, Glc(α1→4)Glc, comes from starch digestion and is reducing. **Lactose**, Gal(β1→4)Glc, is milk sugar; its glucose end is reducing. It is cleaved by lactase, and people in whom intestinal lactase declines after weaning cannot digest it, so that colonic bacteria ferment it instead (lactose intolerance). **Sucrose**, Glc(α1↔2β)Fru, links the anomeric carbons of *both* sugars, so neither ring can open: sucrose is a **non-reducing** sugar, one reason plants use it to transport carbon, since it does not react with protein amino groups as reducing sugars slowly do.

::: quiz
Which of these sugars gives a negative Benedict's test (no red $\mathrm{Cu_2O}$)?
- [ ] lactose, Gal(β1→4)Glc
- [ ] maltose, Glc(α1→4)Glc
- [x] sucrose, Glc(α1↔2β)Fru
- [ ] D-fructose
::: solution
A positive test needs a free anomeric carbon that can open to a carbonyl group. Lactose and maltose each have a reducing glucose end. Fructose is free, and in alkaline solution it isomerises through an enediol to aldoses, so it reduces copper(II) too. Sucrose joins the anomeric carbons of glucose and fructose to each other, so both are locked as acetals and it is non-reducing.
:::
:::

::: warning α/β is not D/L, and it cannot change once a glycoside forms {#warn-anomer}
Two different errors are common. First, α and β are *anomers* — diastereomers that differ at one carbon — and have nothing to do with the D/L pair of enantiomers: α-D-glucose and β-D-glucose are both D. Second, mutarotation is a property of the free hemiacetal. Once the anomeric carbon is in a glycosidic bond, its configuration is fixed: cellulose cannot "mutarotate into" starch, and the human body cannot digest cellulose because we have no enzyme for β(1→4) glucosidic bonds, not because the glucose is different. Cooking, chewing and stomach acid do not convert one into the other.
:::

## Polysaccharides

**Polysaccharides** (glycans) are polymers of tens to tens of thousands of monosaccharide residues. **Homopolysaccharides** contain one kind of residue; **heteropolysaccharides** several. Unlike proteins and nucleic acids, polysaccharides are not made from a template: their length and branching are set by the enzymes that make them and are variable.

**Starch**, the storage glucan of plants, is a mixture of **amylose** — unbranched Glc(α1→4) chains of up to several thousand residues — and **amylopectin**, the same chains with α(1→6) branch points every 24–30 residues. **Glycogen**, the animal storage glucan in liver and muscle, has the amylopectin structure with branches every 8–12 residues, making a dense, roughly spherical particle. Branching has a kinetic purpose: glycogen phosphorylase removes glucose only from non-reducing ends, and every branch adds one more end, so a highly branched molecule can release glucose rapidly.

The α(1→4) link has a built-in kink: successive residues are rotated relative to one another, so amylose coils into a hollow helix of about six residues per turn. The famous blue-black colour of starch with iodine comes from linear polyiodide chains threaded down the inside of that helix. **Cellulose**, by contrast, is Glc(β1→4) throughout. In the β link each residue is flipped by $180^\circ$ relative to the previous one, the chain is straight and flat, and ring-oxygen-to-3-OH hydrogen bonds within each chain hold it in that shape. Parallel chains then hydrogen-bond side by side into sheets, the sheets stack, and the result is a microfibril with a tensile strength approaching that of steel — the material of wood and cotton. **Chitin** is the same structure with GlcNAc in place of glucose. The difference between food and fibre is the stereochemistry of one bond.

::: example Why store glycogen rather than glucose? {#ex-glycogen-osmotic}
Nelson and Cox estimate that the glycogen in a liver cell would correspond to about $0.4\ \mathrm{mol\,dm^{-3}}$ of free glucose. Estimate the extra osmotic pressure this would produce at $37\ \mathrm{^\circ C}$ if it were stored as free glucose, using the van 't Hoff equation $\Pi = cRT$. Compare it with the cytosol's total osmolarity of about $0.3\ \mathrm{mol\,dm^{-3}}$.
::: solution
In SI units $c = 0.4\ \mathrm{mol\,dm^{-3}} = 400\ \mathrm{mol\,m^{-3}}$, so
$$
\Pi = cRT = (400\ \mathrm{mol\,m^{-3}})(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(310.15\ \mathrm{K}) = 1.03\times10^{6}\ \mathrm{Pa} \approx 10\ \mathrm{bar}.
$$
Free glucose at this level would more than double the solute concentration of the cell, and water would rush in until the plasma membrane burst. The same glucose as one glycogen particle of some $10^{4}$–$10^{5}$ residues is osmotically almost nothing, since osmotic pressure counts particles, not mass (Nelson and Cox quote an effective glycogen concentration near $0.01\ \mu\mathrm{mol\,dm^{-3}}$). Polymerisation is the cell's solution to storing a soluble fuel. (The van 't Hoff equation is the ideal dilute-solution limit, adequate for an estimate of this kind; see [[general-chemistry-2/liquids-solutions]].)
:::
:::

Carbohydrates are also attached to proteins and lipids as **glycoconjugates**. **Glycoproteins** carry oligosaccharides linked through asparagine nitrogen (*N*-linked) or serine and threonine oxygen (*O*-linked); the ABO blood groups are glycolipid and glycoprotein antigens that differ by a single terminal sugar. **Proteoglycans** carry long, highly sulfated, negatively charged glycosaminoglycan chains (heparan sulfate, chondroitin sulfate) that hold water in cartilage. Bacterial cell walls are **peptidoglycan**, alternating GlcNAc and *N*-acetylmuramic acid cross-linked by short peptides — the structure attacked by lysozyme and whose synthesis penicillin blocks ([[medicinal-chemistry/drug-targets]]).

## Lipids

**Lipids** are defined by a property rather than a structure: they are the biomolecules that are poorly soluble in water and soluble in nonpolar solvents. They include fuels (triacylglycerols), membrane components (phospholipids, sphingolipids, sterols) and signals (steroid hormones, eicosanoids).

### Fatty acids

A **fatty acid** is a carboxylic acid with a long hydrocarbon chain, usually unbranched and with an even number of carbons (12–24) because it is built two carbons at a time from acetyl-CoA ([[biochemistry/lipid-nitrogen-metabolism]]). The shorthand gives chain length, number of double bonds and their positions counted from the carboxyl carbon: palmitic acid is 16:0, oleic acid 18:1(Δ9), linoleic acid 18:2(Δ9,12). Natural double bonds are almost always *cis* and, in polyunsaturated acids, separated by one $\mathrm{CH_2}$ group (methylene-interrupted). Nutrition labels count from the methyl end instead: linoleic acid is an ω-6 and α-linolenic acid, 18:3(Δ9,12,15), an ω-3 fatty acid. With $\mathrm{p}K_\mathrm{a} \approx 4.5$–$5$, fatty acids at pH 7 are carboxylate anions.

| fatty acid | shorthand | melting point / °C |
|---|---|---|
| lauric | 12:0 | 44.2 |
| myristic | 14:0 | 53.9 |
| palmitic | 16:0 | 63.1 |
| stearic | 18:0 | 69.6 |
| oleic | 18:1(Δ9) | 13.4 |
| linoleic | 18:2(Δ9,12) | 1–5 |
| α-linolenic | 18:3(Δ9,12,15) | −11 |

(Data from Nelson and Cox, *Lehninger Principles of Biochemistry*, Table 10-1.) Two trends are visible. Each extra $\mathrm{CH_2}$ adds dispersion contact between neighbouring chains, so melting points rise with length. A *cis* double bond puts a rigid $30^\circ$ kink in the chain, which prevents close packing: one double bond lowers the melting point by about $56\ \mathrm{K}$ relative to stearic acid, and each further one lowers it more. This is why lard and butter (rich in saturated chains) are solid at room temperature while olive oil (mostly oleate) and fish oils (polyunsaturated) are liquid. *Trans* fats, produced by partial industrial hydrogenation, have straight chains and pack like saturated ones.

### Triacylglycerols

**Triacylglycerols** (triglycerides) are triesters of glycerol with three fatty acids. They are neutral and almost completely nonpolar, and they are the main energy store of animals. Their advantage over glycogen is twofold: the carbon is more reduced (it yields about $37\ \mathrm{kJ\,g^{-1}}$ on complete oxidation, against about $17\ \mathrm{kJ\,g^{-1}}$ for carbohydrate), and it is stored anhydrous, whereas glycogen carries about twice its own mass of water of hydration. Gram for gram of stored tissue, fat holds roughly six times as much energy as hydrated glycogen. Hydrolysis of a triacylglycerol with base gives glycerol and the fatty-acid salts — **saponification**, the ancient chemistry of soap ([[organic-2/carboxylic-derivatives]]).

### Membrane lipids

Membrane lipids are **amphipathic**: a polar head group attached to two nonpolar tails.

- **Glycerophospholipids** are built on glycerol 3-phosphate: two fatty acids esterified at C-1 and C-2 (typically saturated at C-1, unsaturated at C-2) and a phosphate at C-3 linked to a head-group alcohol. With choline the lipid is phosphatidylcholine (zwitterionic, the commonest lipid of animal membranes); with ethanolamine, phosphatidylethanolamine; with serine, the negatively charged phosphatidylserine, kept on the inner leaflet of healthy cells; with inositol, phosphatidylinositol, a source of signalling molecules.
- **Sphingolipids** are built on sphingosine, an amino alcohol with a long built-in chain; an amide-linked fatty acid supplies the second tail. Sphingomyelin has a phosphocholine head group; glycosphingolipids carry sugars and form the outer, recognition surface of cells.
- **Sterols**, chiefly **cholesterol** in animals, have a rigid fused four-ring nucleus with a single hydroxyl group. Cholesterol sits in the bilayer with its hydroxyl at the interface and its rings among the chains.

Whether an amphipathic molecule forms a micelle or a bilayer in water is a matter of geometry, which a single dimensionless number captures.

::: definition Critical packing parameter {#def-packing}
For an amphiphile with hydrocarbon volume $v$, maximum (fully extended) chain length $l_\mathrm{c}$ and optimal head-group area $a_0$ at the water interface, the **critical packing parameter** is
$$
P = \frac{v}{a_0\,l_\mathrm{c}}.
$$
As an empirical guide (Israelachvili, Mitchell and Ninham), $P < \tfrac13$ favours spherical micelles, $\tfrac13 < P < \tfrac12$ cylindrical micelles, $\tfrac12 < P < 1$ flexible bilayers and vesicles, and $P > 1$ inverted phases. For a saturated chain of $n$ carbons, Tanford's estimates are $v \approx (0.0274 + 0.0269\,n)\ \mathrm{nm^3}$ and $l_\mathrm{c} \approx (0.154 + 0.1265\,n)\ \mathrm{nm}$.
:::

The parameter turns the qualitative picture into a calculation: a single tail under a big head is a cone, which packs into a sphere; two tails under the same head make a cylinder, which packs into a flat sheet.

::: example Micelle or bilayer? {#ex-packing}
Dipalmitoylphosphatidylcholine (DPPC) has two 16:0 chains and a head-group area of about $0.64\ \mathrm{nm^2}$. Its lysophospholipid, lyso-PC, has one 16:0 chain and roughly the same head group. Predict the aggregate each forms in water.
::: solution
For one 16-carbon chain, $v = 0.0274 + 0.0269 \times 16 = 0.4578\ \mathrm{nm^3}$ and $l_\mathrm{c} = 0.154 + 0.1265 \times 16 = 2.178\ \mathrm{nm}$. For DPPC the hydrocarbon volume is doubled but the length is not:
$$
P_\mathrm{DPPC} = \frac{2 \times 0.4578}{0.64 \times 2.178} = 0.66, \qquad P_\mathrm{lyso} = \frac{0.4578}{0.64 \times 2.178} = 0.33.
$$
DPPC falls in the bilayer range and forms vesicles (liposomes); lyso-PC is at the micelle boundary and forms micelles, and in fact acts as a detergent that disrupts membranes. Snake-venom phospholipases A₂, which remove one chain from membrane phospholipids, damage cells partly by producing lysophospholipids. Detergents used to extract membrane proteins (dodecyl sulfate, Triton X-100) are single-chain amphiphiles with $P$ below $\tfrac13$ for the same reason.
:::
:::

## Membranes

The aggregation of membrane lipids is driven by the **hydrophobic effect** ([[biochemistry/water-noncovalent#def-hydrophobic]]): removing hydrocarbon chains from contact with water releases ordered water and raises the entropy of the solvent, so the bilayer assembles spontaneously and reseals when torn. A **lipid bilayer** is about $5\ \mathrm{nm}$ thick, with a hydrocarbon core of about $3\ \mathrm{nm}$ between two layers of head groups. Its core is a liquid with the polarity of a hydrocarbon (relative permittivity about 2, against 78 for water), and that one fact sets its permeability.

### The fluid mosaic

In the **fluid mosaic model** (Singer and Nicolson, 1972) proteins are embedded in or attached to a two-dimensional fluid of lipids. **Integral membrane proteins** cross the bilayer, usually as bundles of α helices about 20 residues long whose outward faces are hydrophobic (or, in the outer membranes of bacteria, mitochondria and chloroplasts, as β barrels); **peripheral proteins** bind to the surface. Both lipids and many proteins diffuse sideways rapidly. In two dimensions the mean square displacement after time $t$ is $\langle r^2\rangle = 4Dt$, and phospholipids have lateral diffusion coefficients around $1\ \mu\mathrm{m^2\,s^{-1}}$, so a lipid explores about $\sqrt{4 \times 1 \times 1}\ \mu\mathrm{m} = 2\ \mu\mathrm{m}$ in one second — the length of a bacterium. Transverse diffusion, **flip-flop** from one leaflet to the other, requires dragging a polar head group through the hydrocarbon core and is very slow (hours to days) without enzymes. Membranes are therefore **asymmetric**: the two leaflets have different compositions, maintained by ATP-driven flippases, and the appearance of phosphatidylserine on the outer leaflet is a signal that a cell is dying.

Bilayers also melt. Below a transition temperature $T_\mathrm{m}$ the chains are extended and ordered (a gel); above it they are disordered (a fluid). For pure DPPC $T_\mathrm{m} = 41\ \mathrm{^\circ C}$; shorter or unsaturated chains melt lower. Cells keep their membranes fluid by adjusting chain composition — bacteria grown in the cold make more unsaturated fatty acids — and cholesterol acts as a buffer of fluidity, ordering fluid chains and disordering gel ones, so that the sharp transition is broadened away.

### Permeability

Small nonpolar molecules ($\mathrm{O_2}$, $\mathrm{CO_2}$, $\mathrm{N_2}$, steroid hormones) cross a bilayer quickly by dissolving in the core. Small uncharged polar molecules (water, urea, glycerol) cross more slowly, and large polar molecules (glucose) and ions hardly at all: the permeability coefficient of a bilayer to $\mathrm{Na^+}$ or $\mathrm{K^+}$ is around $10^{-12}\ \mathrm{cm\,s^{-1}}$, roughly $10^{9}$ times smaller than to water. The reason is electrostatic: the Born energy of an ion, $\propto z^2/\varepsilon_\mathrm{r}$, rises by over $100\ \mathrm{kJ\,mol^{-1}}$ when it moves from water ($\varepsilon_\mathrm{r} \approx 78$) to hydrocarbon ($\varepsilon_\mathrm{r} \approx 2$) ([[biochemistry/water-noncovalent#prop-coulomb]]). A pure bilayer is therefore an excellent insulator, and almost all traffic of ions and polar nutrients needs proteins.

## Transport across membranes

Membrane transport proteins fall into three classes. **Channels** form aqueous pores that open and close; ions flow through them down their electrochemical gradients at up to $10^{7}$–$10^{8}$ ions per second, with selectivity set by the geometry of a filter (the $\mathrm{K^+}$ channel strips hydration water from $\mathrm{K^+}$ and replaces it with carbonyl oxygens spaced exactly right for $\mathrm{K^+}$ but too far apart for the smaller $\mathrm{Na^+}$). **Carriers** (transporters) bind their substrate on one side, change conformation and release it on the other, far more slowly ($10^2$–$10^4$ per second). **Pumps** are carriers that couple transport to ATP hydrolysis.

All of these obey one thermodynamic rule. The quantity that drives transport is the difference in **electrochemical potential**, which combines a concentration term and an electrical term.

::: proposition Free energy of transport {#prop-transport}
For transfer of $1\ \mathrm{mol}$ of a solute of charge number $z$ from the outside of a membrane (concentration $c_\mathrm{out}$, electric potential $\psi_\mathrm{out}$) to the inside ($c_\mathrm{in}$, $\psi_\mathrm{in}$), at temperature $T$ and in the dilute-solution approximation,
$$
\Delta G_\mathrm{t} = RT\ln\frac{c_\mathrm{in}}{c_\mathrm{out}} + zF\,\Delta\psi, \qquad \Delta\psi = \psi_\mathrm{in} - \psi_\mathrm{out}.
$$ {#eq-transport}
Transport is spontaneous (passive) if $\Delta G_\mathrm{t} < 0$ and must be coupled to an exergonic process (active transport) if $\Delta G_\mathrm{t} > 0$. At equilibrium, $\Delta G_\mathrm{t} = 0$ gives the **Nernst equation** for the membrane potential at which an ion is at equilibrium:
$$
\Delta\psi_\mathrm{eq} = \frac{RT}{zF}\ln\frac{c_\mathrm{out}}{c_\mathrm{in}}.
$$ {#eq-nernst-membrane}
:::

::: proof From the electrochemical potential
The electrochemical potential of an ion $i$ in a phase at electric potential $\psi$ is $\tilde\mu_i = \mu_i^\circ + RT\ln(c_i/c^\circ) + z_iF\psi$, the chemical potential of [[thermodynamics/mixtures]] in the ideal-dilute approximation (activities replaced by concentrations) plus the electrical work $z_iF\psi$ per mole of bringing the charge to that potential. The standard chemical potential $\mu_i^\circ$ is the same on both sides because the solvent is the same. Moving $1\ \mathrm{mol}$ from out to in changes the Gibbs energy by $\tilde\mu_i(\mathrm{in}) - \tilde\mu_i(\mathrm{out})$; the standard terms cancel, the logarithms combine to $RT\ln(c_\mathrm{in}/c_\mathrm{out})$ and the electrical terms to $zF(\psi_\mathrm{in} - \psi_\mathrm{out})$, which is [[#eq-transport]]. Setting it to zero and solving for $\Delta\psi$ gives [[#eq-nernst-membrane]]. For a neutral solute ($z = 0$) the electrical term vanishes and equilibrium is equal concentrations.
:::

Biologists quote the membrane potential as inside minus outside; a resting animal cell has $\Delta\psi \approx -70\ \mathrm{mV}$ (inside negative). At $37\ \mathrm{^\circ C}$, $RT\ln 10 = 5.94\ \mathrm{kJ\,mol^{-1}}$, so every tenfold concentration ratio is worth $5.94\ \mathrm{kJ\,mol^{-1}}$, while $F \times 0.1\ \mathrm{V} = 9.65\ \mathrm{kJ\,mol^{-1}}$ per unit charge: the electrical term is as important as the concentration term for ions. The figure shows both.

::: widget plot
f: 5.938*x + z*96.485*psi; 5.938*x
x: -4, 4
y: -40, 40
sliders: z=1:-2:2:1; psi=-0.07:-0.15:0.15:0.005
hlines: 0
labels: \Delta G_\mathrm{t}\ (\text{charge } z); \Delta G_\mathrm{t}\ (\text{neutral})
caption: Free energy of moving one mole of solute into a cell at $37\ \mathrm{^\circ C}$, $\Delta G_\mathrm{t}$ (in $\mathrm{kJ\,mol^{-1}}$), against $x = \log_{10}(c_\mathrm{in}/c_\mathrm{out})$, from [[#eq-transport]]: $\Delta G_\mathrm{t} = 5.938\,x + 96.485\,z\,\Delta\psi$ with $\Delta\psi$ in volts. The sliders set the charge number $z$ and the membrane potential $\Delta\psi = \psi_\mathrm{in} - \psi_\mathrm{out}$ (default $-70\ \mathrm{mV}$). Where the coloured line crosses zero the ion is at its Nernst equilibrium; a cation is pulled into a cell with a negative interior even against a modest concentration gradient.
:::

### Passive and facilitated transport

Glucose cannot cross a bilayer at a useful rate on its own, but most animal cells take it up by **facilitated diffusion** through GLUT transporters. Facilitated diffusion is passive — it only ever moves glucose down its concentration gradient ($z = 0$, so $\Delta G_\mathrm{t} < 0$ means $c_\mathrm{in} < c_\mathrm{out}$) — but it is protein-mediated, and so it is fast, specific and **saturable**. The carrier binds glucose on the outside, flips, and releases it inside, so the flux follows the same hyperbola as an enzyme ([[biochemistry/enzymes#prop-mm]]):
$$
J = \frac{J_\mathrm{max}\,c_\mathrm{out}}{K_\mathrm{t} + c_\mathrm{out}},
$$
where the transport constant $K_\mathrm{t}$ plays the role of $K_\mathrm{M}$ (for the erythrocyte transporter GLUT1, Nelson and Cox give $K_\mathrm{t} \approx 1.5\ \mathrm{mmol\,dm^{-3}}$). Simple diffusion through the lipid, by contrast, follows Fick's law, flux $= P\,\Delta c$, linear in concentration and without saturation.

::: widget plot
f: x/(K + x); 0.02*x
x: 0, 30
y: 0, 1.1
sliders: K=1.5:0.2:10:0.1
labels: \text{facilitated (GLUT)}; \text{simple diffusion}
caption: Initial influx of glucose, as a fraction of the maximum carrier flux $J_\mathrm{max}$, against outside glucose concentration $x$ (in $\mathrm{mmol\,dm^{-3}}$, zero inside). Facilitated diffusion saturates hyperbolically with half-maximal flux at $x = K_\mathrm{t}$ (slider; $1.5\ \mathrm{mmol\,dm^{-3}}$ is GLUT1); simple diffusion through the bilayer (an illustrative, much exaggerated permeability) rises linearly without limit. Blood glucose near $5\ \mathrm{mmol\,dm^{-3}}$ keeps GLUT1 at about three-quarters of its maximum, whereas the liver transporter GLUT2, with $K_\mathrm{t}$ near $15$–$20\ \mathrm{mmol\,dm^{-3}}$, responds almost linearly to changes in blood glucose — try $K = 17$.
:::

### Active transport

**Primary active transport** uses ATP directly. The **Na⁺/K⁺-ATPase** of the plasma membrane of animal cells pumps three $\mathrm{Na^+}$ out and two $\mathrm{K^+}$ in for each ATP hydrolysed. It is a **P-type ATPase**: it phosphorylates one of its own aspartate residues, and the phosphorylated and dephosphorylated forms face opposite sides of the membrane with different ion affinities. Because it moves one net positive charge out per cycle it is **electrogenic**, contributing directly to the negative interior. It consumes a large fraction of the ATP of a resting animal — a quarter or more overall, and much more in nerve tissue.

::: example The cost of the sodium pump {#ex-na-k-pump}
In a typical mammalian cell (values as in Berg et al.) $[\mathrm{Na^+}]_\mathrm{in} = 12$, $[\mathrm{Na^+}]_\mathrm{out} = 145$, $[\mathrm{K^+}]_\mathrm{in} = 140$ and $[\mathrm{K^+}]_\mathrm{out} = 4\ \mathrm{mmol\,dm^{-3}}$, and $\Delta\psi = -70\ \mathrm{mV}$. Calculate the free energy needed to pump $3\ \mathrm{Na^+}$ out and $2\ \mathrm{K^+}$ in at $37\ \mathrm{^\circ C}$, and compare it with the free energy of ATP hydrolysis in cells, about $-50$ to $-60\ \mathrm{kJ\,mol^{-1}}$ ([[biochemistry/bioenergetics#ex-atp-cell]]).
::: solution
At $310.15\ \mathrm{K}$, $RT = 2.579\ \mathrm{kJ\,mol^{-1}}$ and $F\,|\Delta\psi| = (96\,485)(0.070) = 6.754\ \mathrm{kJ\,mol^{-1}}$ per unit charge.

**Sodium out.** Moving from in to out reverses the signs in [[#eq-transport]]: $\Delta G = RT\ln(c_\mathrm{out}/c_\mathrm{in}) + zF(\psi_\mathrm{out} - \psi_\mathrm{in})$, and $\psi_\mathrm{out} - \psi_\mathrm{in} = +0.070\ \mathrm{V}$:
$$
\Delta G_\mathrm{Na} = 2.579\ln\frac{145}{12} + 6.754 = 6.425 + 6.754 = +13.18\ \mathrm{kJ\,mol^{-1}}.
$$
Both terms oppose the movement: sodium is pushed uphill in concentration *and* out against the electric field that pulls cations in.

**Potassium in.** $\Delta G_\mathrm{K} = 2.579\ln(140/4) + (1)(96.485)(-0.070) = 9.168 - 6.754 = +2.41\ \mathrm{kJ\,mol^{-1}}$. Here the field helps, and most of the concentration cost is repaid electrically.

**Total.** $3(13.18) + 2(2.41) = 39.5 + 4.8 = 44.4\ \mathrm{kJ}$ per cycle. ATP hydrolysis under cellular conditions supplies $50$–$60\ \mathrm{kJ\,mol^{-1}}$, so one ATP per cycle suffices with a margin that keeps the pump running forwards. The standard value $\Delta G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$ would *not* suffice: the pump depends on the cell keeping ATP far from equilibrium with ADP and phosphate.
:::
:::

**Secondary active transport** uses an ion gradient made by a pump to drive another solute uphill. A **symporter** moves both in the same direction, an **antiporter** in opposite directions. The intestinal and kidney **Na⁺–glucose symporter** SGLT1 moves two $\mathrm{Na^+}$ into the cell with each glucose, so the large downhill free energy of sodium entry can concentrate glucose inside the epithelial cell, from which it leaves into the blood through GLUT2 by facilitated diffusion. The $\mathrm{Na^+/Ca^{2+}}$ exchanger of heart muscle is an antiporter; lactose permease of *E. coli* is a $\mathrm{H^+}$–lactose symporter, driven by the proton gradient of [[biochemistry/oxidative-phosphorylation#prop-pmf]].

::: example How far can sodium concentrate glucose? {#ex-sglt}
Using the sodium concentrations and membrane potential of [[#ex-na-k-pump]], find the largest ratio $[\mathrm{glucose}]_\mathrm{in}/[\mathrm{glucose}]_\mathrm{out}$ that SGLT1 (2 Na⁺ per glucose) can sustain at $37\ \mathrm{^\circ C}$. What would a 1 : 1 symporter achieve?
::: solution
For one $\mathrm{Na^+}$ entering, $\Delta G_\mathrm{Na} = RT\ln(12/145) + F(-0.070) = -6.425 - 6.754 = -13.18\ \mathrm{kJ\,mol^{-1}}$. The overall process, $2\,\mathrm{Na^+_{out}} + \mathrm{Glc_{out}} \rightarrow 2\,\mathrm{Na^+_{in}} + \mathrm{Glc_{in}}$, reaches equilibrium when
$$
RT\ln\frac{[\mathrm{Glc}]_\mathrm{in}}{[\mathrm{Glc}]_\mathrm{out}} + 2\Delta G_\mathrm{Na} = 0 \quad\Rightarrow\quad \frac{[\mathrm{Glc}]_\mathrm{in}}{[\mathrm{Glc}]_\mathrm{out}} = \exp\!\left(\frac{26.36}{2.579}\right) = e^{10.22} = 2.8\times10^{4}.
$$
A 1 : 1 symporter would give only $e^{5.11} = 1.7\times10^{2}$. Coupling stoichiometry enters as an exponent: the second sodium squares the achievable ratio. In practice the cell keeps the ratio far below the limit, but the margin means glucose is absorbed from the gut completely even when its concentration there is low. The same reasoning applies to every coupled transporter: the maximum ratio is the exponential of the coupled free energy divided by $RT$.
:::
:::

## Where this leads

Glucose enters metabolism as glucose 6-phosphate, and its breakdown and resynthesis are the subject of [[biochemistry/glycolysis-citric-acid]]; glycogen synthesis from UDP-glucose and its controlled breakdown by phosphorylase reappear there and in the hormonal integration of [[biochemistry/lipid-nitrogen-metabolism]], which also covers the oxidation and synthesis of the fatty acids met here. The membrane-potential and electrochemical-potential arguments of [[#prop-transport]] are exactly those used for protons in the chemiosmotic theory of [[biochemistry/oxidative-phosphorylation]], where the inner mitochondrial membrane's impermeability to ions becomes the means of making ATP. The thermodynamics of ATP that powered the sodium pump is developed in [[biochemistry/bioenergetics]], the electrochemistry of the Nernst equation in [[electrochemistry/cell-thermodynamics]], and amphiphile self-assembly — micelles, vesicles and their use in drug delivery — returns in [[polymer-chemistry/polymer-solutions]] and [[medicinal-chemistry/pharmacokinetics]].

::: history
Augustin-Pierre Dubrunfaut observed in 1846 that the optical rotation of a fresh glucose solution changes on standing — mutarotation — though its explanation had to wait for the cyclic structures. Emil Fischer established the relative configurations of glucose and its isomers between 1888 and 1894, using the Kiliani chain extension and the symmetry of the derived diacids, and received the 1902 Nobel Prize in Chemistry for his work on sugars and purines; the D/L convention is his. Walter Norman Haworth showed in the 1920s that glucose is usually a six-membered pyranose and introduced the projection that bears his name; he shared the 1937 Nobel Prize in Chemistry with Paul Karrer. On the membrane side, Evert Gorter and François Grendel extracted the lipids from red blood cells in 1925, spread them as a monolayer and found an area about twice the cells' surface, suggesting a bilayer. Jens Christian Skou discovered the Na⁺/K⁺-ATPase in crab nerve in 1957 (Nobel Prize in Chemistry 1997), Robert Crane proposed sodium–glucose cotransport in 1960, and S. Jonathan Singer and Garth Nicolson published the fluid mosaic model in 1972.
:::

::: summary
- Monosaccharides are polyhydroxy aldehydes and ketones; an aldose with $n$ carbons has $2^{n-2}$ stereoisomers, labelled D or L by the stereocentre farthest from the carbonyl. Epimers differ at one stereocentre.
- Sugars cyclise to hemiacetals (pyranoses, furanoses), creating α and β anomers that interconvert by mutarotation; glucose at equilibrium is about 64 % β.
- A glycosidic bond is an acetal at the anomeric carbon; it locks the anomeric configuration, is thermodynamically unstable but kinetically inert to hydrolysis, and is made in cells from nucleotide sugars.
- α(1→4) glucans (starch, glycogen) form helices and are fuel; β(1→4) glucans (cellulose) form straight, hydrogen-bonded fibres. Branching gives glycogen many non-reducing ends for rapid mobilisation; polymerisation avoids osmotic stress.
- Fatty-acid melting points rise with chain length and fall sharply with *cis* double bonds; triacylglycerols store about six times more energy per gram of tissue than hydrated glycogen.
- Amphipathic lipids self-assemble by the hydrophobic effect; the packing parameter $P = v/(a_0 l_\mathrm{c})$ predicts micelles (one tail) or bilayers (two tails). Membranes are two-dimensional fluids with slow flip-flop and very low ion permeability.
- Transport obeys $\Delta G_\mathrm{t} = RT\ln(c_\mathrm{in}/c_\mathrm{out}) + zF\Delta\psi$; facilitated diffusion is passive and saturable, the Na⁺/K⁺-ATPase pumps 3 Na⁺ out and 2 K⁺ in per ATP, and secondary transporters use ion gradients with stoichiometry acting as an exponent.
:::

## Exercises

::: exercise D-Aldopentoses {level=1 check="4"}
How many D-aldopentoses are there? Name the one found in RNA and say how 2-deoxy-D-ribose differs from it. (Enter the number of D-aldopentoses.)
::: solution
An aldopentose, $\mathrm{OHC{-}(CHOH)_3{-}CH_2OH}$, has three stereocentres (C-2, C-3, C-4), giving $2^3 = 8$ stereoisomers. C-4 fixes D or L, so there are $2^2 = 4$ D-aldopentoses: D-ribose, D-arabinose, D-xylose and D-lyxose. RNA contains D-ribose (as the β-furanose); 2-deoxy-D-ribose, the sugar of DNA, has H in place of the OH at C-2, which removes the stereocentre there and, importantly, the neighbouring hydroxyl that makes RNA susceptible to base-catalysed hydrolysis.
:::
:::

::: exercise Reducing or not {level=1}
Classify as reducing or non-reducing, with a reason: (a) D-galactose; (b) lactose; (c) sucrose; (d) trehalose, Glc(α1↔1α)Glc; (e) methyl α-D-glucopyranoside; (f) glycogen.
::: solution
(a) Reducing: a free hemiacetal opens to the aldehyde. (b) Reducing: the glucose residue's anomeric carbon is free. (c) Non-reducing: both anomeric carbons are in the glycosidic bond. (d) Non-reducing, for the same reason: the two glucoses are joined C-1 to C-1. (e) Non-reducing: the anomeric carbon is an acetal (a methyl glycoside) and cannot open. (f) Each glycogen molecule has one reducing end (in fact attached to the protein glycogenin) and thousands of non-reducing ends; for practical purposes glycogen is non-reducing, as the reducing end is a negligible fraction of the residues.
:::
:::

::: exercise The potassium equilibrium potential {level=1 check="-95"}
With $[\mathrm{K^+}]_\mathrm{in} = 140$ and $[\mathrm{K^+}]_\mathrm{out} = 4\ \mathrm{mmol\,dm^{-3}}$ at $37\ \mathrm{^\circ C}$, calculate the membrane potential $\Delta\psi = \psi_\mathrm{in} - \psi_\mathrm{out}$ at which $\mathrm{K^+}$ would be at equilibrium. ($R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$, $F = 96\,485\ \mathrm{C\,mol^{-1}}$.) (Enter $\Delta\psi$ in mV to the nearest millivolt.)
::: solution
From [[#eq-nernst-membrane]] with $z = 1$: $\Delta\psi = (RT/F)\ln(c_\mathrm{out}/c_\mathrm{in}) = (26.73\ \mathrm{mV})\ln(4/140) = (26.73)(-3.555) = -95\ \mathrm{mV}$. The resting potential of a typical cell, about $-70\ \mathrm{mV}$, is close to but less negative than this, because the resting membrane is mostly but not exclusively permeable to $\mathrm{K^+}$; the small $\mathrm{Na^+}$ leak (whose Nernst potential is $+67\ \mathrm{mV}$) pulls it towards positive values.
:::
:::

::: exercise Galactose at equilibrium {level=2 check="0.72"}
α-D-Galactopyranose has $[\alpha]_\mathrm{D} = +150.7^\circ$ and β-D-galactopyranose $+52.8^\circ$; the equilibrium mixture has $+80.2^\circ$. Assuming only the two pyranoses are present, find the fraction of β anomer at equilibrium and $\Delta G^\circ$ for α ⇌ β at $298.15\ \mathrm{K}$. (Enter the fraction of β to two significant figures.)
::: solution
$x_\beta = (150.7 - 80.2)/(150.7 - 52.8) = 70.5/97.9 = 0.720$, so about $72\ \%$ β. $K = 0.720/0.280 = 2.57$ and $\Delta G^\circ = -RT\ln K = -(8.314)(298.15)\ln 2.57 = -2.34\ \mathrm{kJ\,mol^{-1}}$. As in glucose, the anomer with the equatorial anomeric OH predominates.
:::
:::

::: exercise Saturation of GLUT1 {level=2 check="0.769"}
GLUT1 has $K_\mathrm{t} = 1.5\ \mathrm{mmol\,dm^{-3}}$ for glucose. What fraction of its maximal influx does it operate at when the outside glucose concentration is $5.0\ \mathrm{mmol\,dm^{-3}}$ and the inside concentration is negligible? What fraction at $10\ \mathrm{mmol\,dm^{-3}}$? (Enter the fraction at $5.0\ \mathrm{mmol\,dm^{-3}}$ to three significant figures.)
::: solution
$J/J_\mathrm{max} = c/(K_\mathrm{t} + c) = 5.0/6.5 = 0.769$. At $10\ \mathrm{mmol\,dm^{-3}}$, $10/11.5 = 0.870$. Doubling blood glucose raises uptake by only $13\ \%$: the transporter is near saturation, which keeps glucose supply to red cells and brain steady when blood glucose fluctuates.
:::
:::

::: exercise Lateral diffusion {level=2 check="25"}
A phospholipid has a lateral diffusion coefficient of $1.0\ \mu\mathrm{m^2\,s^{-1}}$. Using $\langle r^2\rangle = 4Dt$, how long does it take for its root-mean-square displacement to reach $10\ \mu\mathrm{m}$, the size of a typical animal cell? Contrast this with flip-flop. (Enter the time in seconds.)
::: solution
$t = \langle r^2\rangle/4D = (10\ \mu\mathrm{m})^2/(4 \times 1.0\ \mu\mathrm{m^2\,s^{-1}}) = 25\ \mathrm{s}$. Because displacement grows only as $\sqrt t$, ten times the distance takes a hundred times as long. Flip-flop of a phospholipid in a pure bilayer takes hours to days — roughly $10^{3}$ to $10^{4}$ times longer than crossing the whole cell sideways — because the polar head group must pass through the hydrocarbon core; this is why membrane asymmetry persists.
:::
:::

::: exercise Pumping calcium {level=3 check="39.0"}
The plasma-membrane $\mathrm{Ca^{2+}}$-ATPase exports calcium. Calculate the free energy needed to move $1\ \mathrm{mol}$ of $\mathrm{Ca^{2+}}$ out of a cell at $37\ \mathrm{^\circ C}$ when $[\mathrm{Ca^{2+}}]_\mathrm{in} = 0.10\ \mu\mathrm{mol\,dm^{-3}}$, $[\mathrm{Ca^{2+}}]_\mathrm{out} = 2.0\ \mathrm{mmol\,dm^{-3}}$ and $\Delta\psi = -70\ \mathrm{mV}$, and decide whether one ATP (about $-55\ \mathrm{kJ\,mol^{-1}}$ in the cell) can pump one or two calcium ions. (Enter the free energy per mole of $\mathrm{Ca^{2+}}$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: hint
The concentration ratio is $2\times10^{4}$, and $z = 2$ doubles the electrical term.
:::
::: solution
For export, $\Delta G = RT\ln(c_\mathrm{out}/c_\mathrm{in}) + zF(\psi_\mathrm{out} - \psi_\mathrm{in}) = (2.579)\ln(2.0\times10^{-3}/1.0\times10^{-7}) + 2(96.485)(0.070)$. The first term is $2.579 \times 9.903 = 25.54\ \mathrm{kJ\,mol^{-1}}$ and the second $13.51\ \mathrm{kJ\,mol^{-1}}$, total $39.0\ \mathrm{kJ\,mol^{-1}}$. One ATP ($\approx 55\ \mathrm{kJ\,mol^{-1}}$) can pay for one $\mathrm{Ca^{2+}}$ ($39\ \mathrm{kJ}$) but not two ($78\ \mathrm{kJ}$), and the plasma-membrane pump does indeed move one $\mathrm{Ca^{2+}}$ per ATP (exchanging it for protons, which reduces the electrical cost). The ten-thousandfold gradient that this maintains is what makes $\mathrm{Ca^{2+}}$ such an effective intracellular signal: opening a few channels raises the cytosolic concentration tenfold within milliseconds.
:::
:::

::: exercise The general symport limit {level=3}
A symporter couples the uptake of a neutral solute S to the entry of $n$ ions of charge $z$. (a) Using [[#prop-transport]], show that at equilibrium
$$
\frac{[\mathrm{S}]_\mathrm{in}}{[\mathrm{S}]_\mathrm{out}} = \left(\frac{c_\mathrm{out}}{c_\mathrm{in}}\right)^{n}\exp\!\left(-\frac{nzF\Delta\psi}{RT}\right),
$$
where $c$ refers to the coupling ion. (b) For lactose permease in *E. coli* ($n = 1$, $z = +1$ for $\mathrm{H^+}$), with the cytoplasm $0.5$ pH unit more alkaline than the medium and $\Delta\psi = -120\ \mathrm{mV}$ at $25\ \mathrm{^\circ C}$, estimate the maximum lactose accumulation ratio.
::: hint
Write the free energy of the whole coupled process as the sum of one term for S and $n$ terms for the ions, set it to zero, and exponentiate. A pH difference of 0.5 is a factor $10^{0.5}$ in $[\mathrm{H^+}]$.
:::
::: solution
(a) For the process $\mathrm{S_{out}} + n\,\mathrm{X^{z}_{out}} \rightarrow \mathrm{S_{in}} + n\,\mathrm{X^{z}_{in}}$, add the transport free energies: $\Delta G = RT\ln([\mathrm{S}]_\mathrm{in}/[\mathrm{S}]_\mathrm{out}) + n[RT\ln(c_\mathrm{in}/c_\mathrm{out}) + zF\Delta\psi]$. At equilibrium $\Delta G = 0$, so $\ln([\mathrm{S}]_\mathrm{in}/[\mathrm{S}]_\mathrm{out}) = n\ln(c_\mathrm{out}/c_\mathrm{in}) - nzF\Delta\psi/RT$; exponentiating gives the result. (b) The cytoplasm is more alkaline, so $c_\mathrm{out}/c_\mathrm{in} = [\mathrm{H^+}]_\mathrm{out}/[\mathrm{H^+}]_\mathrm{in} = 10^{0.5} = 3.16$. The electrical factor is $\exp[-(96\,485)(-0.120)/(8.314 \times 298.15)] = e^{4.671} = 106.8$. The ratio is $3.16 \times 106.8 \approx 3.4\times10^{2}$. Most of the driving force is electrical: the proton-motive force of [[biochemistry/oxidative-phosphorylation#prop-pmf]] stores energy in both forms, and this transporter spends both.
:::
:::

::: exercise A lysolipid {level=3 check="0.33"}
Using Tanford's formulas and $a_0 = 0.64\ \mathrm{nm^2}$, calculate the packing parameter of a lysophosphatidylcholine with one 16:0 chain, and predict the effect of adding a small amount of it to a vesicle of DPPC. Why does a phospholipase that removes the C-2 fatty acid damage membranes? (Enter $P$ to two significant figures.)
::: solution
$v = 0.0274 + 0.0269 \times 16 = 0.4578\ \mathrm{nm^3}$, $l_\mathrm{c} = 0.154 + 0.1265 \times 16 = 2.178\ \mathrm{nm}$, so $P = 0.4578/(0.64 \times 2.178) = 0.33$ — at the border between spheres and cylinders, cone-shaped. A little lyso-PC enters the outer leaflet of a DPPC vesicle and, by favouring positive curvature, makes the bilayer leaky; enough of it dissolves the bilayer into mixed micelles, as any detergent does. Phospholipase A₂ converts two-tailed bilayer-formers ($P \approx 0.66$) into one-tailed micelle-formers plus a free fatty acid, so it converts membrane into detergent in place. This is part of the action of many snake and bee venoms and of the enzymes that release arachidonic acid for signalling.
:::
:::
