Every year plants fix of the order of a hundred billion tonnes of carbon from the atmosphere by photosynthesis, far more than the carbon in all the fossil fuels the world burns, and the chemical industry needs only a few hundred million tonnes of carbon for its products. On these numbers, renewable carbon should be easy. It is not, for reasons that are chemical as much as economic. Petroleum is a mixture of hydrocarbons, almost free of oxygen, from which the industry has learned over a century to add functional groups one at a time. Biomass is the opposite: cellulose, hemicellulose and sugars are polyols in which almost every carbon carries an oxygen atom, lignin is a cross-linked aromatic polymer of irregular structure, and plant oils are esters. Making today's products from biomass means *removing* oxygen selectively rather than adding it, in water rather than in the gas phase, from solid feedstocks of variable composition that are spread over large areas of land and harvested seasonally.

This chapter is about how that can be done. It first describes the composition of biomass and a simple index, the effective hydrogen-to-carbon ratio, that shows why biomass and petroleum lead naturally to different products. It then introduces **platform chemicals** — ethanol, lactic and succinic acids, furfural and 5-(hydroxymethyl)furfural, levulinic acid, glycerol — and the **biorefinery** that makes them, with fermentation yields limited by an electron balance. The second half is about **biocatalysis**: enzymes, whether in living cells or isolated, as catalysts for industrial synthesis, with the kinetics and metrics used to design processes around them. Throughout, the question posed in [[green-chemistry/green-principles#def-lifecycle]] remains: a renewable feedstock is an advantage only if the whole life cycle, including land, water and fertiliser, confirms it. The chemistry of the biomolecules themselves is in [[biochemistry/carbohydrates-lipids]].

## Biomass as a feedstock

Plant biomass is mostly **lignocellulose**, the material of wood, straw and grasses. Its three components, in typical proportions by dry mass, are:

- **cellulose** ($40$–$50\,\%$): linear chains of β-1,4-linked D-glucose, packed into partly crystalline microfibrils by hydrogen bonding, which makes it insoluble in water and resistant to hydrolysis;
- **hemicelluloses** ($20$–$35\,\%$): branched, amorphous polysaccharides of xylose, arabinose, mannose and other sugars, more easily hydrolysed;
- **lignin** ($15$–$30\,\%$): a three-dimensional aromatic polymer of phenylpropane units (from coniferyl, sinapyl and *p*-coumaryl alcohols) linked mostly by ether bonds, which binds the fibres and resists microbial attack.

Other feedstocks are **starch** (α-1,4 glucose, easily hydrolysed, from maize, wheat and cassava), **sucrose** (from sugar cane and beet), **plant oils** (triglycerides from palm, soya, rapeseed), and wastes and residues (straw, bagasse, forestry residues, used cooking oil, food waste). The "first generation" of bio-based processes used food crops — sugar, starch and oils; the "second generation" aims at lignocellulose and residues, which do not compete directly with food but are much harder to convert.

::: definition Effective hydrogen-to-carbon ratio {#def-hc-eff}
For a compound or feedstock of elemental composition $\mathrm{C}_c\mathrm{H}_h\mathrm{O}_o\mathrm{N}_n\mathrm{S}_s$, the **effective hydrogen-to-carbon ratio** (Chen and co-workers, 1986) is
$$
(H/C)_\mathrm{eff} = \frac{h - 2o - 3n - 2s}{c} ,
$$ {#eq-hc-eff}
the hydrogen left per carbon after notionally removing all heteroatoms as $\mathrm{H_2O}$, $\mathrm{NH_3}$ and $\mathrm{H_2S}$. Alkanes have $(H/C)_\mathrm{eff} \approx 2$ ($2 + 2/c$ for $\mathrm{C}_c\mathrm{H}_{2c+2}$), aromatics about $1$, plant oils about $1.6$, and carbohydrates $0$.
:::

The index explains much. Carbohydrates, at $(H/C)_\mathrm{eff} = 0$, can become hydrocarbon fuels only by adding hydrogen or by rejecting carbon (as $\mathrm{CO_2}$ in fermentation, or as coke in catalytic cracking, which is why zeolite processing of sugars cokes rapidly). They are, however, a natural feedstock for **oxygenated** products — acids, alcohols, polyols, furans — which petrochemistry makes by laborious oxidation. The rational strategy is to match feedstock to product: to make oxygen-rich molecules from biomass, preserving functionality, and to leave the hydrocarbons to other routes.

::: example Hydrogen balance of biomass and petroleum products {#ex-hc}
Compare $(H/C)_\mathrm{eff}$ for glucose ($\mathrm{C_6H_{12}O_6}$), glycerol ($\mathrm{C_3H_8O_3}$), triolein (glyceryl trioleate, $\mathrm{C_{57}H_{104}O_6}$), ethanol ($\mathrm{C_2H_6O}$) and heptane ($\mathrm{C_7H_{16}}$), and deduce how much hydrogen is needed, in principle, to turn glucose into hexane ($\mathrm{C_6H_{14}}$).
::: solution
By [[#eq-hc-eff]]: glucose $(12 - 12)/6 = 0$; glycerol $(8 - 6)/3 = 0.67$; triolein $(104 - 12)/57 = 1.61$; ethanol $(6 - 2)/2 = 2.0$; heptane $16/7 = 2.29$.

For glucose to hexane: $\mathrm{C_6H_{12}O_6} + n\,\mathrm{H_2} \rightarrow \mathrm{C_6H_{14}} + 6\,\mathrm{H_2O}$. Hydrogen balance: $12 + 2n = 14 + 12$, so $n = 7$: seven moles of hydrogen per mole of glucose, $14.1\ \mathrm{g}$ per $86.2\ \mathrm{g}$ of hexane ($0.164\ \mathrm{kg}$ per kg). Making that hydrogen from natural gas would release roughly $1.5\ \mathrm{kg}$ of $\mathrm{CO_2}$ per kilogram of hexane ([[green-chemistry/carbon-hydrogen]]), eroding the climate benefit. Ethanol, by contrast, has a high effective ratio because fermentation rejects a third of the carbon as $\mathrm{CO_2}$, which carries away the oxygen without needing external hydrogen. Plant oils are already close to hydrocarbons, which is why they were the first route to renewable diesel.
:::
:::

## Platform chemicals and the biorefinery

A petroleum refinery splits crude oil into fractions and converts each into many products. A **biorefinery** does the same with biomass: it fractionates the feedstock into its components (sugars from cellulose and hemicellulose, lignin, oils, proteins) and converts each into fuels, chemicals, materials, food or feed and energy, aiming to use every fraction. The intermediate molecules from which families of products can be made are called **platform chemicals**. The US Department of Energy's report *Top Value Added Chemicals from Biomass* (Werpy and Petersen, 2004) selected twelve sugar-derived building blocks; Joseph Bozell and Gene Petersen revisited the list in 2010, naming ethanol, furans (furfural, 5-(hydroxymethyl)furfural (HMF) and 2,5-furandicarboxylic acid (FDCA)), glycerol and its derivatives, biohydrocarbons such as isoprene, lactic acid, succinic acid, 3-hydroxypropionic acid, levulinic acid, sorbitol and xylitol.

### Fermentation and its theoretical yield

Many platform chemicals are made by **fermentation**: microorganisms convert sugar to a product under conditions where it, rather than biomass growth, is the main outlet for the sugar's carbon and electrons. The maximum yield is set not by atom economy but by an electron balance.

::: definition Degree of reduction {#def-gamma}
The **degree of reduction** of an organic compound $\mathrm{C}_c\mathrm{H}_h\mathrm{O}_o\mathrm{N}_n$, per carbon atom (per C-mol), is
$$
\gamma = \frac{4c + h - 2o - 3n}{c} ,
$$ {#eq-gamma}
the number of electrons per carbon that would be released on complete oxidation to $\mathrm{CO_2}$, $\mathrm{H_2O}$ and $\mathrm{NH_3}$, counting C as $+4$, H as $+1$, O as $-2$ and N as $-3$. By definition $\gamma = 0$ for $\mathrm{CO_2}$, $\mathrm{H_2O}$ and $\mathrm{NH_3}$. Glucose has $\gamma = 4$, ethanol $6$, lactic acid $4$, succinic acid $3.5$, methane $8$.
:::

::: proposition Maximum yield from an electron balance {#prop-max-yield}
In a fermentation in which sugar (substrate, degree of reduction $\gamma_\mathrm{S}$) is converted to a single product P (degree of reduction $\gamma_\mathrm{P}$), $\mathrm{CO_2}$ and water, with no external electron acceptor (anaerobic), no other electron donor and no biomass formation, the yield of product on substrate in C-mol per C-mol cannot exceed
$$
Y_\mathrm{P/S}^\mathrm{max} = \frac{\gamma_\mathrm{S}}{\gamma_\mathrm{P}} ,
$$ {#eq-max-yield}
and the carbon yield is also limited to $1$ unless $\mathrm{CO_2}$ is fixed (possible only if $\gamma_\mathrm{P} < \gamma_\mathrm{S}$).
:::

::: proof
Electrons available for reduction are conserved in a chemical transformation: with $\mathrm{CO_2}$, $\mathrm{H_2O}$ and $\mathrm{NH_3}$ defined as having zero degree of reduction, the sum of $\gamma\times$(C-mol) over all carbon-containing species is unchanged by any balanced reaction among them and these reference compounds. (This is a restatement of conservation of charge applied to oxidation numbers.) Per C-mol of substrate, $\gamma_\mathrm{S}$ electrons enter; they can leave only in the product (no other acceptor), so $Y\gamma_\mathrm{P} = \gamma_\mathrm{S}$ at most, the equality holding when no electrons go to by-products or cell growth. Carbon is also conserved: product C-mol plus $\mathrm{CO_2}$ C-mol equals substrate C-mol, so $Y \leq 1$ unless $\mathrm{CO_2}$ is a net reactant. When $\gamma_\mathrm{P} > \gamma_\mathrm{S}$ the electron limit is the stricter, and the excess carbon must leave as $\mathrm{CO_2}$; when $\gamma_\mathrm{P} < \gamma_\mathrm{S}$, as for succinic acid, the product can contain more carbon than the substrate supplied by fixing $\mathrm{CO_2}$, as some bacteria do through carboxylation of phosphoenolpyruvate or pyruvate. Real yields are lower because part of the substrate is used for growth and maintenance (ATP) and some is diverted to by-products; the metabolic pathways themselves are in [[biochemistry/glycolysis-citric-acid]].
:::

::: example The ethanol yield {#ex-ethanol}
Use [[#prop-max-yield]] to find the maximum yield of ethanol from glucose, in moles per mole and in grams per gram, and compare it with the balanced equation of alcoholic fermentation.
::: solution
$\gamma_\mathrm{S} = 4$ (glucose), $\gamma_\mathrm{P} = (8 + 6 - 2)/2 = 6$ (ethanol), so $Y^\mathrm{max} = 4/6 = \tfrac23$ C-mol per C-mol. One glucose (6 C-mol) gives at most $4$ C-mol of ethanol, i.e. $2$ molecules, the other $2$ C-mol leaving as $\mathrm{CO_2}$:
$$
\mathrm{C_6H_{12}O_6} \rightarrow 2\,\mathrm{C_2H_5OH} + 2\,\mathrm{CO_2} .
$$
The mass yield is $2\times46.07/180.16 = 0.511\ \mathrm{g\,g^{-1}}$. Industrial yeast fermentations reach about $90$–$95\,\%$ of this, the rest going to yeast growth, glycerol and other by-products. The "atom economy" of the equation is $51.1\,\%$, but the $\mathrm{CO_2}$ is not avoidable waste: it is the oxygen-carrying vehicle that raises the effective H/C ratio of the product. It is also a pure stream, captured and sold at many ethanol plants (for drinks, or as a feedstock for [[green-chemistry/carbon-hydrogen]]).
:::
:::

### The main platforms

**Ethanol** is by far the largest fermentation product, made from maize starch in the United States and from sugar cane in Brazil, mostly for fuel. Dehydrated over alumina or zeolite catalysts it gives ethylene, $\mathrm{C_2H_5OH \rightarrow C_2H_4 + H_2O}$, with a mass yield of $28.05/46.07 = 0.609$. Braskem has made polyethylene from sugar-cane ethanol at Triunfo, Brazil, since 2010; the polymer is chemically identical to fossil polyethylene and is recycled with it — a **drop-in** product.

**Lactic acid** (2-hydroxypropanoic acid) is made by bacterial fermentation with yields close to the theoretical $1\ \mathrm{g\,g^{-1}}$ ($\gamma = 4$, the same as glucose) and high optical purity. Its cyclic dimer, lactide, is polymerised by ring-opening polymerisation to **poly(lactic acid)** (PLA), produced on a large scale since 2002 by NatureWorks at Blair, Nebraska ([[polymer-chemistry/step-growth]] and [[polymer-chemistry/functional-polymers]] cover its chemistry and degradation). PLA is a **new-to-the-world** product rather than a drop-in: it has its own properties and its own end-of-life requirements, being compostable under industrial conditions but not readily in soil or the sea.

**Succinic acid**, **1,3-propanediol** (for the polyester poly(trimethylene terephthalate)) and **1,4-butanediol** are made by engineered microorganisms; the bio-based diols are drop-in replacements for petrochemical ones.

**Furans** come from acid-catalysed dehydration of sugars. Pentoses (from hemicellulose) give **furfural**, made industrially from corncobs and bagasse since the 1920s. Hexoses, especially fructose, give **5-(hydroxymethyl)furfural (HMF)**:
$$
\mathrm{C_6H_{12}O_6\ (fructose)} \rightarrow \mathrm{C_6H_6O_3\ (HMF)} + 3\,\mathrm{H_2O}, \qquad \mathrm{AE} = \frac{126.11}{180.16} = 70.0\,\%.
$$
HMF is unstable in hot aqueous acid, where it rehydrates to **levulinic acid** (4-oxopentanoic acid) and formic acid and condenses to insoluble humins, so its synthesis is a selectivity problem of the consecutive kind analysed in [[green-chemistry/petrochemicals#prop-consecutive]], usually tackled with biphasic solvent systems that extract HMF as it forms. Oxidation of HMF gives **2,5-furandicarboxylic acid (FDCA)**, which with ethylene glycol forms poly(ethylene furanoate) (PEF), a polyester with better gas-barrier properties than PET; the Dutch company Avantium has been bringing a first commercial-scale FDCA plant into operation in the mid-2020s.

**Glycerol** is the co-product of biodiesel and soap manufacture. Its surplus after the growth of biodiesel led to new uses: Solvay's Epicerol process makes epichlorohydrin from glycerol and HCl instead of from propylene and chlorine, and glycerol can be hydrogenolysed to 1,2-propanediol.

::: example Biodiesel and its glycerol {#ex-biodiesel}
Fatty acid methyl esters (FAME, "biodiesel") are made by base-catalysed transesterification of triglycerides with methanol. Taking triolein ($\mathrm{C_{57}H_{104}O_6}$, $885.43\ \mathrm{g\,mol^{-1}}$) as the model oil, write the equation, find the atom economy for the methyl ester (methyl oleate, $296.49$) and the mass of glycerol ($92.09$) per tonne of biodiesel. ($M(\mathrm{CH_3OH}) = 32.04$.)
::: solution
$$
\mathrm{C_{57}H_{104}O_6} + 3\,\mathrm{CH_3OH} \rightarrow 3\,\mathrm{C_{19}H_{36}O_2} + \mathrm{C_3H_8O_3} .
$$
Mass balance: $885.43 + 96.12 = 981.55$; $889.47 + 92.09 = 981.56$, agreeing to rounding. $\mathrm{AE} = 889.47/981.55 = 90.6\,\%$. Glycerol per tonne of FAME: $92.09/889.47 = 0.104\ \mathrm{t}$, about $10\,\%$ — hence the glycerol glut that followed the growth of biodiesel. Methanol is used in excess (typically sixfold molar) and recovered; the base catalyst (sodium methoxide or hydroxide) is consumed by any free fatty acids present to form soaps, which is why waste oils with high acid content are first esterified with an acid catalyst. Methanol is toxic and flammable, and the process is run in closed equipment. A different route, **hydrotreated vegetable oil** (HVO), removes the oxygen with hydrogen over sulfided catalysts to give alkanes — a drop-in diesel or aviation fuel — at the cost of about $3$–$4\,\%$ of the oil's mass in hydrogen.
:::
:::

### Lignin and land

**Lignin** is the largest natural source of aromatic rings, but most of it is burnt for energy in pulp mills, because kraft pulping (with sodium hydroxide and sodium sulfide) breaks its ether bonds and also forms new, resistant carbon–carbon bonds, leaving a condensed, sulfur-containing material that is difficult to upgrade. "Lignin-first" strategies (reductive catalytic fractionation, aldehyde-assisted fractionation), developed since the mid-2010s, stabilise the reactive intermediates as lignin is extracted, giving monomers such as 4-propylguaiacol in high yield; vanillin has been made from lignin commercially for decades (Borregaard, Norway).

Land is the constraint behind every bio-based process. Crops need land, water and fertiliser; growing feedstock on land that would otherwise grow food, or that was converted from forest, carries **direct and indirect land-use change** emissions that can exceed the fossil carbon saved. The EU's Renewable Energy Directive (as revised in 2018 and 2023) limits the contribution of food- and feed-crop biofuels and sets sustainability criteria and minimum greenhouse-gas savings for bio-based fuels, and distinguishes "advanced" feedstocks from wastes and residues. These rules concern fuels, but they frame the debate on bio-based chemicals too.

::: warning Bio-based, biodegradable and sustainable are three different claims {#warn-bio}
*Bio-based* refers to the origin of the carbon: bio-polyethylene is bio-based but no more biodegradable than fossil polyethylene. *Biodegradable* refers to the end of life: poly(butylene adipate-*co*-terephthalate), widely used in compostable bags, is biodegradable but made largely from fossil feedstocks. *Sustainable* requires a life-cycle assessment: a bio-based product can have higher climate, eutrophication or land-use impacts than its fossil counterpart, depending on the crop, the farming, the conversion energy and the end of life. A label should say which of the three it claims, by what standard (for bio-based content, radiocarbon measurement of the modern-carbon fraction, as in ASTM D6866 or EN 16640; for compostability, EN 13432), and over which system boundary.
:::

## Biocatalysis

Enzymes are proteins (occasionally RNA) that catalyse reactions with rate enhancements of up to $10^{17}$, often with complete regio- and stereoselectivity, in water near room temperature and neutral pH. They are made from renewable resources by fermentation, are biodegradable, and contain no scarce metals (or only abundant ones). These are precisely the properties that principles 3, 6, 7 and 9 ask for, and the main obstacles to their wider use — narrow substrate range, instability, inhibition, the need for cofactors — have been eroded since the 1990s by **directed evolution**, the laboratory repetition of mutation and selection pioneered by Frances Arnold (Nobel Prize in Chemistry 2018). Industrial biocatalysis uses enzymes as **whole cells**, as **isolated enzymes** in solution, or **immobilised** on supports for reuse in packed beds.

::: definition Michaelis–Menten kinetics and biocatalyst metrics {#def-mm}
For an enzyme following Michaelis–Menten kinetics, the initial rate at substrate concentration $[\mathrm{S}]$ is
$$
v = \frac{V_\mathrm{max}[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}, \qquad V_\mathrm{max} = k_\mathrm{cat}[\mathrm{E}]_0 ,
$$ {#eq-mm}
where $k_\mathrm{cat}$ is the turnover number (the maximum number of substrate molecules converted per active site per unit time) and $K_\mathrm{M}$ the Michaelis constant ([[biochemistry/enzymes]]). Process metrics are the **total turnover number** $\mathrm{TTN} = $ moles of product per mole of enzyme over the enzyme's working life; the **space–time yield**; the **final product concentration** (titre), which governs downstream processing; and the **enzyme loading** or **biocatalyst yield** (kg product per kg enzyme).
:::

::: widget plot
f: x/(K + x); x/(K*(1 + I/Ki) + x)
x: 0, 50
y: 0, 1.1
sliders: K=5:0.5:20:0.5; I=0:0:10:0.5; Ki=2:0.5:10:0.5
labels: v/V_\mathrm{max}\ \text{(no inhibitor)}; v/V_\mathrm{max}\ \text{(competitive inhibitor)}
hlines: 0.5
caption: Michaelis–Menten rate [[#eq-mm]], as a fraction of $V_\mathrm{max}$, against substrate concentration $[\mathrm{S}]$ in $\mathrm{mmol\,dm^{-3}}$ ($x$), for Michaelis constant $K_\mathrm{M}$ ($K$), and with a competitive inhibitor at concentration $I$ with inhibition constant $K_\mathrm{i}$, which multiplies the apparent $K_\mathrm{M}$ by $1 + I/K_\mathrm{i}$. The rate is half its maximum at $[\mathrm{S}] = K_\mathrm{M}$ (horizontal line). In a batch process the substrate concentration falls as conversion proceeds, so the rate slides down the curve; a product that inhibits competitively behaves like a rising $I$, which is why the last part of a conversion is often the slowest and why in-situ product removal is used.
:::

::: proposition Batch time for an enzymatic conversion {#prop-batch-time}
In a batch reactor with constant enzyme activity, no product inhibition and an irreversible reaction, the time to reach conversion $X$ from initial substrate concentration $[\mathrm{S}]_0$ is
$$
t = \frac{1}{V_\mathrm{max}}\left[K_\mathrm{M}\ln\frac{1}{1 - X} + [\mathrm{S}]_0X\right] .
$$ {#eq-batch-time}
At high $[\mathrm{S}]_0/K_\mathrm{M}$ the reaction is nearly zero order and $t \approx [\mathrm{S}]_0X/V_\mathrm{max}$; at low $[\mathrm{S}]_0/K_\mathrm{M}$ it is first order with $k = V_\mathrm{max}/K_\mathrm{M}$.
:::

::: proof
In a batch reactor $-\mathrm{d}[\mathrm{S}]/\mathrm{d}t = v$. Separating variables with [[#eq-mm]]:
$$
\int_{[\mathrm{S}]_0}^{[\mathrm{S}]}\frac{K_\mathrm{M} + [\mathrm{S}]'}{[\mathrm{S}]'}\,\mathrm{d}[\mathrm{S}]' = -V_\mathrm{max}t
\;\Rightarrow\;
K_\mathrm{M}\ln\frac{[\mathrm{S}]_0}{[\mathrm{S}]} + ([\mathrm{S}]_0 - [\mathrm{S}]) = V_\mathrm{max}t .
$$
Substituting $[\mathrm{S}] = [\mathrm{S}]_0(1 - X)$ gives [[#eq-batch-time]]. The limits follow by comparing the two terms: the linear term dominates when $[\mathrm{S}]_0X \gg K_\mathrm{M}\ln[1/(1 - X)]$, the logarithmic one in the opposite case. Product inhibition, enzyme deactivation and reversibility, common in practice, all lengthen the time; the formula is a lower bound used for first design.
:::

::: widget plot
f: (K*ln(1/(1 - x)) + S*x)/V; S*x/V; K*ln(1/(1 - x))/V
x: 0, 0.995
y: 0, 5
sliders: K=0.005:0.001:0.5:0.001; S=0.5:0.05:2:0.05; V=0.36:0.05:2:0.01
labels: t\ \text{(Michaelis–Menten)}; t\ \text{(zero-order limit)}; t\ \text{(first-order limit)}
caption: Batch time in hours [[#eq-batch-time]] against conversion $X$ ($x$) for Michaelis constant $K_\mathrm{M}$ ($K$, in $\mathrm{mol\,dm^{-3}}$), initial substrate concentration $[\mathrm{S}]_0$ ($S$) and $V_\mathrm{max}$ ($V$, in $\mathrm{mol\,dm^{-3}\,h^{-1}}$). With the default values — a typical industrial enzyme saturated by a concentrated substrate — the curve is almost the straight zero-order line until the last per cent of conversion. Raise $K_\mathrm{M}$ towards $[\mathrm{S}]_0$ and the logarithmic tail grows: the last few per cent then dominate the batch time, which is why enzymes with low $K_\mathrm{M}$, or continuous processes with in-situ product removal, are sought.
:::

::: example An enzymatic batch {#ex-enzyme}
An enzyme with $k_\mathrm{cat} = 50\ \mathrm{s^{-1}}$ and $K_\mathrm{M} = 5.0\ \mathrm{mmol\,dm^{-3}}$ is used at $2.0\ \mu\mathrm{mol\,dm^{-3}}$ to convert a substrate initially at $0.50\ \mathrm{mol\,dm^{-3}}$. Find the time to $99\,\%$ conversion and the total turnover number if the enzyme is used once.
::: solution
$V_\mathrm{max} = 50\ \mathrm{s^{-1}}\times2.0\times10^{-6}\ \mathrm{mol\,dm^{-3}} = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}} = 0.36\ \mathrm{mol\,dm^{-3}\,h^{-1}}$. By [[#eq-batch-time]],
$$
t = \frac{0.0050\ln100 + 0.50\times0.99}{0.36}\ \mathrm{h} = \frac{0.0230 + 0.495}{0.36}\ \mathrm{h} = 1.44\ \mathrm{h}.
$$
The logarithmic term contributes only $4\,\%$ because $[\mathrm{S}]_0 = 100\,K_\mathrm{M}$. $\mathrm{TTN} = 0.495/(2.0\times10^{-6}) = 2.5\times10^{5}$. If the substrate has a molar mass of about $200\ \mathrm{g\,mol^{-1}}$ and the enzyme about $40\ \mathrm{kg\,mol^{-1}}$, the mass of product per mass of enzyme is $2.5\times10^{5}\times200/40\,000 \approx 1200$: about a gram of enzyme per kilogram of product, which is typical of an economical process for a pharmaceutical intermediate. In practice the time is longer because of product inhibition and the gradual loss of activity.
:::
:::

### Industrial examples

- **High-fructose syrup.** Immobilised glucose isomerase converts glucose to an equilibrium mixture with fructose in packed-bed reactors; by volume of product it is the largest immobilised-enzyme process.
- **Acrylamide.** Nitrile hydratase in whole cells of *Rhodococcus* hydrates acrylonitrile to acrylamide at low temperature with essentially complete selectivity; introduced in Japan in 1985 by Nitto Chemical, it replaced a copper-catalysed process that needed higher temperatures and produced by-products, and it is one of the largest biocatalytic processes for a commodity chemical.
- **Semi-synthetic penicillins and cephalosporins.** Immobilised penicillin acylase removes the side chain of penicillin G to give 6-aminopenicillanic acid in water, replacing a chemical deacylation that needed silyl protection, dichloromethane, phosphorus pentachloride and temperatures near $-40\,^\circ\mathrm{C}$; the same enzyme family is used in the reverse direction to attach new side chains.
- **Sitagliptin.** The antidiabetic drug sitagliptin was first manufactured by a rhodium-catalysed asymmetric hydrogenation of an enamine at high pressure, followed by recrystallisation to raise the enantiomeric excess. Merck and Codexis evolved a transaminase through eleven rounds of directed evolution (Savile *et al.*, *Science*, 2010) to aminate the prochiral ketone directly, using propan-2-amine as the amine donor and giving the amine in $> 99.95\,\%$ e.e.; they reported a $10$–$13\,\%$ higher overall yield, a $19\,\%$ reduction in total waste, the elimination of the rhodium catalyst and the high-pressure equipment, and a $53\,\%$ increase in productivity. The work received a Presidential Green Chemistry Challenge Award in 2010.
- **Lipases** (*Candida antarctica* lipase B immobilised as Novozym 435) catalyse esterifications, transesterifications and kinetic resolutions in organic solvents or solvent-free, and are used for emollient esters and chiral amines.

::: quiz
A transaminase reaction in water is equilibrium-limited and inhibited by its ketone co-product. Which change is *least* likely to help?
- [ ] Using a large excess of the amine donor
- [ ] Removing the ketone co-product as it forms (for example by evaporation of acetone when propan-2-amine is the donor)
- [x] Adding more enzyme, since enzymes shift equilibria towards products
- [ ] Evolving an enzyme variant less inhibited by the co-product
::: solution
Like any catalyst, an enzyme accelerates both directions equally and cannot change the position of equilibrium ([[green-chemistry/green-principles#prop-catalyst-rate]]); more enzyme only reaches the same equilibrium sooner. Excess donor and co-product removal shift the equilibrium (Le Chatelier); a less inhibited variant raises the rate near the end of the reaction. In the sitagliptin process, a large excess of propan-2-amine and removal of the acetone formed were used together.
:::
:::

::: history From brewing to directed evolution {#hist-bio}
Fermentation is as old as brewing and baking; Louis Pasteur showed in the 1850s and 1860s that it is carried out by living microorganisms, and Eduard Buchner's 1897 demonstration of fermentation by cell-free yeast extract (Nobel Prize 1907) showed that enzymes, not life itself, did the chemistry. Leonor Michaelis and Maud Menten published their rate equation in 1913. Chaim Weizmann's acetone–butanol fermentation, developed around 1915, supplied acetone for British munitions in the First World War and was one of the first large industrial fermentations; citric acid production by *Aspergillus niger* (Pfizer, 1919) and penicillin manufacture in the 1940s followed. Furfural was made from oat hulls by Quaker Oats from 1922. Immobilised enzymes entered industry with Ichiro Chibata's aminoacylase process in Japan (1969). The US DOE's *Top Value Added Chemicals from Biomass* report appeared in 2004, Bozell and Petersen's update in 2010. Frances Arnold, who shared the 2018 Nobel Prize with George Smith and Gregory Winter, made directed evolution a routine tool from the 1990s onwards.
:::

## Where this leads

Renewable carbon is one of three routes away from fossil feedstocks; [[green-chemistry/carbon-hydrogen]] treats the second, carbon dioxide combined with low-emission hydrogen, and [[green-chemistry/circular-economy]] the third, recycled carbon. Polymers from bio-based monomers (PLA, PEF, bio-PE, bio-PET) and their end-of-life options are analysed with [[polymer-chemistry]]. The enzymology behind biocatalysis is in [[biochemistry/enzymes]], and the metabolic pathways that set fermentation yields in [[biochemistry/glycolysis-citric-acid]].

::: summary
- Lignocellulose is about $40$–$50\,\%$ cellulose, $20$–$35\,\%$ hemicellulose and $15$–$30\,\%$ lignin; first-generation processes use sugar, starch and oils, second-generation ones residues and lignocellulose.
- The effective H/C ratio, $(h - 2o - 3n - 2s)/c$, is $0$ for carbohydrates and about $2$ for alkanes: biomass is best suited to oxygenated products, and making hydrocarbons from it requires hydrogen or carbon rejection.
- The degree of reduction $\gamma = (4c + h - 2o - 3n)/c$ sets the maximum fermentation yield $\gamma_\mathrm{S}/\gamma_\mathrm{P}$ (C-mol/C-mol): $0.511\ \mathrm{g\,g^{-1}}$ for ethanol, $1\ \mathrm{g\,g^{-1}}$ for lactic acid.
- Platform chemicals — ethanol, lactic and succinic acids, furfural, HMF, FDCA, levulinic acid, glycerol, sorbitol — feed drop-in products (bio-PE) and new ones (PLA, PEF); biodiesel yields about $10\,\%$ glycerol.
- Bio-based, biodegradable and sustainable are distinct claims; land use, fertiliser and conversion energy decide sustainability.
- Enzymes follow Michaelis–Menten kinetics; batch time is $[K_\mathrm{M}\ln(1/(1 - X)) + [\mathrm{S}]_0X]/V_\mathrm{max}$. Directed evolution has made biocatalysis competitive, as in the sitagliptin transaminase, acrylamide by nitrile hydratase and enzymatic penicillin deacylation.
:::

## Exercises

::: exercise Ethanol from glucose {level=1 check="51.1"}
What is the maximum mass yield of ethanol from glucose by alcoholic fermentation? ($M$: glucose $180.16$, ethanol $46.07\ \mathrm{g\,mol^{-1}}$.) (Enter the yield in per cent by mass.)
::: solution
$2\times46.07/180.16 = 0.511$, i.e. $51.1\,\%$ by mass.
:::
:::

::: exercise Effective H/C of glycerol {level=1 check="2/3"}
Compute the effective hydrogen-to-carbon ratio of glycerol, $\mathrm{C_3H_8O_3}$. (Enter the ratio.)
::: solution
$(8 - 2\times3)/3 = 2/3 \approx 0.67$. Glycerol is more reduced than sugars ($0$) but far from hydrocarbons ($\approx 2$).
:::
:::

::: exercise Bio-ethylene {level=1 check="0.609"}
What mass of ethylene can be obtained from one tonne of ethanol by dehydration at $100\,\%$ yield? (Enter the mass in tonnes.)
::: solution
$28.05/46.07 = 0.609\ \mathrm{t}$. Combined with the fermentation yield, at most $0.511\times0.609 = 0.311\ \mathrm{t}$ of ethylene per tonne of glucose: only $31\,\%$ of the sugar's mass, but $67\,\%$ of its carbon ($4$ of $6$ C).
:::
:::

::: exercise Glycerol from biodiesel {level=2 check="10.4"}
For transesterification of triolein with methanol, what mass of glycerol is formed per $100\ \mathrm{kg}$ of methyl oleate? (Data in [[#ex-biodiesel]].) (Enter the mass in kg.)
::: solution
$100\times92.09/(3\times296.49) = 100\times92.09/889.47 = 10.4\ \mathrm{kg}$.
:::
:::

::: exercise Succinic acid {level=2 check="1.12"}
Succinic acid ($\mathrm{C_4H_6O_4}$, $118.09\ \mathrm{g\,mol^{-1}}$) can be made by bacteria that fix $\mathrm{CO_2}$. Using degrees of reduction, find the maximum yield in C-mol per C-mol of glucose and in grams per gram. (Enter the mass yield in $\mathrm{g\,g^{-1}}$, to three significant figures.)
::: solution
$\gamma(\text{succinic acid}) = (16 + 6 - 8)/4 = 3.5$, $\gamma(\text{glucose}) = 4$. $Y^\mathrm{max} = 4/3.5 = 1.143$ C-mol per C-mol: more product carbon than substrate carbon, possible only because $\mathrm{CO_2}$ is fixed. Per glucose (6 C-mol), $6.857$ C-mol of succinic acid $= 1.714\ \mathrm{mol}$, $1.714\times118.09/180.16 = 1.12\ \mathrm{g\,g^{-1}}$. The overall stoichiometry consistent with this is $7\,\mathrm{C_6H_{12}O_6} + 6\,\mathrm{CO_2} \rightarrow 12\,\mathrm{C_4H_6O_4} + 6\,\mathrm{H_2O}$. A fermentation that consumes $\mathrm{CO_2}$ is attractive, but in practice growth and by-products (acetate, formate) lower the yield.
:::
:::

::: exercise A slower enzyme {level=2 check="5.88"}
An enzymatic reaction has $K_\mathrm{M} = 10\ \mathrm{mmol\,dm^{-3}}$ and $V_\mathrm{max} = 40\ \mathrm{mmol\,dm^{-3}\,h^{-1}}$, with $[\mathrm{S}]_0 = 200\ \mathrm{mmol\,dm^{-3}}$. Find the time to $98\,\%$ conversion, assuming no inhibition or deactivation. (Enter the time in hours, to three significant figures.)
::: solution
$t = [10\ln50 + 200\times0.98]/40 = (39.12 + 196)/40 = 5.88\ \mathrm{h}$. Here the logarithmic term is $17\,\%$ of the total, because $[\mathrm{S}]_0$ is only $20\,K_\mathrm{M}$.
:::
:::

::: exercise Isobutanol {level=3 check="0.411"}
Isobutanol (2-methylpropan-1-ol, $\mathrm{C_4H_{10}O}$, $74.12\ \mathrm{g\,mol^{-1}}$) is a fuel and chemical precursor made by engineered microorganisms. Find the maximum yield from glucose using [[#prop-max-yield]], write the balanced overall equation, and comment on the fate of the remaining carbon. (Enter the maximum mass yield in $\mathrm{g\,g^{-1}}$, to three significant figures.)
::: hint
Compute $\gamma$ per carbon for isobutanol and use $Y = \gamma_\mathrm{S}/\gamma_\mathrm{P}$.
:::
::: solution
$\gamma = (16 + 10 - 2)/4 = 6$, so $Y^\mathrm{max} = 4/6$ C-mol per C-mol: from $6$ C-mol of glucose, $4$ C-mol, i.e. one isobutanol molecule. The equation is $\mathrm{C_6H_{12}O_6} \rightarrow \mathrm{C_4H_{10}O} + 2\,\mathrm{CO_2} + \mathrm{H_2O}$ (check: C $6 = 4 + 2$; H $12 = 10 + 2$; O $6 = 1 + 4 + 1$). Mass yield $74.12/180.16 = 0.411\ \mathrm{g\,g^{-1}}$. A third of the carbon leaves as $\mathrm{CO_2}$, the same fraction as for ethanol, because both products have $\gamma = 6$; the metabolic route (via pyruvate, acetolactate and decarboxylation of 2-ketoisovalerate) releases exactly two $\mathrm{CO_2}$ per glucose. To raise the carbon yield one would have to supply extra electrons, for example as hydrogen or electricity, which is the idea behind electro-fermentation and gas fermentation.
:::
:::

::: exercise Land for bio-polyethylene {level=3 check="69.4"}
A plant is to make $200\ \mathrm{kt}$ per year of polyethylene from sugar-cane ethanol. Assume the dehydration and polymerisation steps are quantitative and that sugar cane yields $6000\ \mathrm{dm^3}$ of ethanol per hectare per year (density $0.789\ \mathrm{kg\,dm^{-3}}$). What area of cane is needed? (Enter the area in thousands of hectares, to three significant figures.)
::: solution
Ethanol needed: $200\ \mathrm{kt}/0.609 = 328.4\ \mathrm{kt}$ (from $46.07/28.05 = 1.642\ \mathrm{t}$ per tonne of ethylene). Ethanol per hectare: $6000\times0.789 = 4734\ \mathrm{kg} = 4.734\ \mathrm{t}$. Area: $328\,400/4.734 = 6.94\times10^{4}\ \mathrm{ha}$, i.e. $69.4$ thousand hectares, about $694\ \mathrm{km^2}$. Scaled to the roughly $430\ \mathrm{Mt}$ of plastics produced in 2024, the same yield would need of the order of $150$ million hectares — about a tenth of the world's cropland — which shows why bio-based carbon alone cannot replace fossil carbon in plastics, and why recycling ([[green-chemistry/circular-economy]]) and reduced demand are part of every scenario.
:::
:::
