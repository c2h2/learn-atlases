Look at the mass balance of almost any fine-chemical or pharmaceutical process and the largest item is not a reactant, a reagent or the product. It is the solvent. Reactions are run in solution because dissolved molecules meet quickly and the heat of reaction is carried away; work-ups wash, extract and crystallise with more solvent; equipment is cleaned between batches with yet more. Analyses of pharmaceutical manufacturing by GlaxoSmithKline and by the ACS Green Chemistry Institute Pharmaceutical Roundtable have repeatedly found that solvents make up roughly half or more of the mass used to make an active ingredient, and most of the rest is water. Solvents are also where much of the hazard lies: many common laboratory solvents are flammable, several are toxic to the nervous system, liver or reproductive system, some are carcinogenic, and their vapours contribute to photochemical smog and, in the case of a few chlorinated ones, to stratospheric ozone loss.

Principle 5 of green chemistry ([[green-chemistry/green-principles]]) asks that auxiliary substances be avoided where possible and made innocuous when used. This chapter turns that into practice. It starts with the properties that make a solvent useful, quantified by solubility parameters; it describes how solvent selection guides rank solvents and how regulation restricts the worst of them; it examines the alternatives — water, supercritical carbon dioxide, ionic liquids, bio-based solvents and no solvent at all — with their genuine advantages and their limits; and it ends with continuous-flow processing, which changes the conditions of a reaction (temperature, pressure, residence time, inventory) as radically as a change of solvent. The metrics used to judge all of these are those of [[green-chemistry/green-metrics]].

## What a solvent does, and how to choose one

A solvent must dissolve the reactants (and sometimes not the product, so that it crystallises), be inert under the reaction conditions, have a convenient liquid range, allow the product to be isolated, and be recoverable or disposable. For a given reaction it may also influence the rate and selectivity, by stabilising charged transition states (polar aprotic solvents accelerate $\mathrm{S_N2}$ reactions of anions; see [[organic-1/nucleophilic-substitution]]) or by hydrogen bonding. "Like dissolves like" is made quantitative by the cohesive energy of the liquid.

::: definition Hildebrand and Hansen solubility parameters {#def-solubility-parameter}
The **cohesive energy density** of a liquid is the energy needed to separate its molecules to an ideal gas, per unit volume: $(\Delta_\mathrm{vap}H - RT)/V_\mathrm{m}$, where $V_\mathrm{m}$ is the molar volume of the liquid. The **Hildebrand solubility parameter** is its square root,
$$
\delta = \left(\frac{\Delta_\mathrm{vap}H - RT}{V_\mathrm{m}}\right)^{1/2},
$$ {#eq-hildebrand}
usually quoted in $\mathrm{MPa^{1/2}}$ ($1\ \mathrm{MPa} = 1\ \mathrm{J\,cm^{-3}}$). **Hansen solubility parameters** split the cohesive energy into dispersion, polar and hydrogen-bonding parts, $\delta^2 = \delta_\mathrm{D}^2 + \delta_\mathrm{P}^2 + \delta_\mathrm{H}^2$, and measure the dissimilarity of two substances by the distance
$$
R_\mathrm{a} = \left[4(\delta_{\mathrm{D}1} - \delta_{\mathrm{D}2})^2 + (\delta_{\mathrm{P}1} - \delta_{\mathrm{P}2})^2 + (\delta_{\mathrm{H}1} - \delta_{\mathrm{H}2})^2\right]^{1/2} .
$$ {#eq-hansen}
A solute is characterised by a sphere of radius $R_0$ in Hansen space; solvents with relative energy difference $\mathrm{RED} = R_\mathrm{a}/R_0 < 1$ are expected to dissolve it. The factor $4$ is empirical, chosen so that solubility regions become spheres.
:::

::: proposition Regular-solution enthalpy of mixing {#prop-regular}
For two non-polar liquids that mix without specific interactions (Hildebrand's **regular solutions**), with volume fractions $\phi_1$, $\phi_2$ and mixture molar volume $V$, the enthalpy of mixing per mole of mixture is approximately
$$
\Delta_\mathrm{mix}H \approx V\,\phi_1\phi_2\,(\delta_1 - \delta_2)^2 \ \geq 0 .
$$ {#eq-regular}
Mixing is therefore most favourable (least endothermic) when the solubility parameters are equal.
:::

::: proof
Model the liquid as molecules on a lattice with contacts between neighbours (the derivation of [[thermodynamics/mixtures]] for the regular solution). Let the interaction energy per unit volume of contacts be $-c_{11}$ in pure liquid 1, $-c_{22}$ in pure liquid 2 and $-c_{12}$ between them, so that the cohesive energy densities are $c_{11} = \delta_1^2$ and $c_{22} = \delta_2^2$. With random mixing, a fraction $\phi_1^2$ of the contacts is 1–1, $\phi_2^2$ is 2–2 and $2\phi_1\phi_2$ is 1–2, and the energy of the mixture per unit volume is $-(\phi_1^2c_{11} + \phi_2^2c_{22} + 2\phi_1\phi_2c_{12})$; the unmixed liquids have $-(\phi_1c_{11} + \phi_2c_{22})$. Using $\phi_1 + \phi_2 = 1$, the energy of mixing per unit volume is $\phi_1\phi_2(c_{11} + c_{22} - 2c_{12})$. The **geometric-mean assumption** for dispersion forces, $c_{12} = (c_{11}c_{22})^{1/2}$ (from London's formula, in which the interaction is proportional to the product of polarisabilities), gives $c_{11} + c_{22} - 2\sqrt{c_{11}c_{22}} = (\delta_1 - \delta_2)^2$. Multiplying by $V$ and neglecting the small difference between energy and enthalpy of mixing in a liquid gives [[#eq-regular]]. The assumption fails for hydrogen-bonding or strongly polar liquids, which is why Hansen's three-component parameters are used for them.
:::

::: example Solubility parameters from vaporisation enthalpies {#ex-hildebrand}
Calculate the Hildebrand parameters of hexane ($\Delta_\mathrm{vap}H = 31.56\ \mathrm{kJ\,mol^{-1}}$, $M = 86.18\ \mathrm{g\,mol^{-1}}$, $\rho = 0.655\ \mathrm{g\,cm^{-3}}$) and ethanol ($42.32\ \mathrm{kJ\,mol^{-1}}$, $46.07$, $0.789$) at $25\,^\circ\mathrm{C}$, and comment on the enthalpy of mixing of hexane with toluene ($\delta = 18.2\ \mathrm{MPa^{1/2}}$).
::: solution
**Hexane:** $V_\mathrm{m} = 86.18/0.655 = 131.6\ \mathrm{cm^3\,mol^{-1}}$; $\Delta_\mathrm{vap}H - RT = 31\,560 - 8.314\times298.15 = 29\,081\ \mathrm{J\,mol^{-1}}$;
$$
\delta = \left(\frac{29\,081\ \mathrm{J\,mol^{-1}}}{131.6\ \mathrm{cm^3\,mol^{-1}}}\right)^{1/2} = (221.0\ \mathrm{J\,cm^{-3}})^{1/2} = 14.9\ \mathrm{MPa^{1/2}}.
$$
**Ethanol:** $V_\mathrm{m} = 58.4\ \mathrm{cm^3\,mol^{-1}}$, $\Delta_\mathrm{vap}H - RT = 39\,841\ \mathrm{J\,mol^{-1}}$, $\delta = (682\ \mathrm{J\,cm^{-3}})^{1/2} = 26.1\ \mathrm{MPa^{1/2}}$, the large value reflecting hydrogen bonding.

For a 50:50 (by volume) mixture of hexane and toluene, [[#eq-regular]] gives $\Delta_\mathrm{mix}H/V \approx 0.25\times(18.2 - 14.9)^2 = 2.7\ \mathrm{J\,cm^{-3}}$, small: the liquids mix freely, the entropy of mixing easily outweighing it. For hexane and ethanol the difference of $11\ \mathrm{MPa^{1/2}}$ would predict $30\ \mathrm{J\,cm^{-3}}$, and the regular-solution model is in any case invalid because ethanol's cohesion is mostly hydrogen bonding; the pair is miscible at room temperature but shows large positive deviations from Raoult's law. The tabulated values (Hansen's handbook) are $14.9$ for hexane and $26.5$ for ethanol.
:::
:::

### Solvent selection guides

Because hazard, environmental fate and process suitability all matter, the pharmaceutical industry developed **solvent selection guides** that rank solvents on several criteria. Pfizer published one in 2008, GSK in 2011 (updated in 2016), Sanofi in 2013, and the European CHEM21 consortium published a consensus guide (Prat *et al.*, *Green Chemistry*, 2016) that scores safety (flash point, auto-ignition, peroxide formation), health (GHS hazard statements, exposure limits) and environment (volatility, aquatic toxicity, persistence, ease of recycling) and combines them into four categories. In outline:

| category (CHEM21) | examples |
|---|---|
| recommended | water, ethanol, propan-2-ol, butan-1-ol, ethyl acetate, isopropyl acetate, anisole, acetone (with caveats) |
| problematic | methanol, toluene, cyclohexane, heptane, acetonitrile, tetrahydrofuran, 2-methyltetrahydrofuran, dimethyl sulfoxide, cyclopentyl methyl ether |
| hazardous | dichloromethane, *N*,*N*-dimethylformamide, *N*,*N*-dimethylacetamide, *N*-methylpyrrolidone, 1,4-dioxane, hexane, pentane |
| highly hazardous | benzene, chloroform, tetrachloromethane, 1,2-dichloroethane, nitromethane, diethyl ether |

The categories reflect specific hazards. Diethyl ether has a flash point of $-45\,^\circ\mathrm{C}$ and forms explosive peroxides; hexane is metabolised to hexane-2,5-dione, a neurotoxin, which is why heptane is preferred; benzene is a human carcinogen; chloroform and tetrachloromethane are toxic to the liver; dipolar aprotic amides (DMF, DMAc, NMP) are reproductive toxicants. "Problematic" solvents are acceptable when there is a reason to use them, preferably with recycling. The guides are tools for a structured conversation, not verdicts: a "recommended" solvent that requires a long extra distillation may be worse overall than a "problematic" one that allows direct crystallisation.

Regulation reinforces the guides. In the EU, REACH Annex XVII restricts the use of NMP (entry 71, from 2020) and DMF (entry 76, from December 2023) unless workers' exposure is kept below harmonised derived no-effect levels, and both are on the REACH Candidate List of substances of very high concern as reproductive toxicants. Dichloromethane has been restricted in paint strippers in the EU since 2010–2012 (entry 59), and in 2024 the US EPA finalised a rule under the Toxic Substances Control Act prohibiting most consumer and many commercial uses of methylene chloride, with strict workplace controls for the uses that remain. For medicines, the ICH **Q3C** guideline limits residual solvents in the drug substance: Class 1 solvents, such as benzene (limit $2\ \mathrm{ppm}$), should be avoided; Class 2 solvents have permitted daily exposures, for example dichloromethane ($600\ \mathrm{ppm}$), acetonitrile ($410\ \mathrm{ppm}$), toluene ($890\ \mathrm{ppm}$) and methanol ($3000\ \mathrm{ppm}$); Class 3 solvents of low toxicity, such as ethanol, acetone and ethyl acetate, are acceptable up to $5000\ \mathrm{ppm}$ without justification.

::: example Replacing NMP {#ex-nmp}
A coupling reaction is run in NMP, Hansen parameters $(\delta_\mathrm{D}, \delta_\mathrm{P}, \delta_\mathrm{H}) = (18.0, 12.3, 7.2)\ \mathrm{MPa^{1/2}}$. Candidate replacements: dihydrolevoglucosenone (Cyrene, a bio-based dipolar aprotic solvent made from cellulose), $(18.8, 10.6, 6.9)$; dimethyl sulfoxide, $(18.4, 16.4, 10.2)$; DMF, $(17.4, 13.7, 11.3)$; acetone, $(15.5, 10.4, 7.0)$. Rank them by Hansen distance from NMP.
::: solution
By [[#eq-hansen]], for Cyrene:
$$
R_\mathrm{a} = \left[4(18.8 - 18.0)^2 + (10.6 - 12.3)^2 + (6.9 - 7.2)^2\right]^{1/2} = (2.56 + 2.89 + 0.09)^{1/2} = 2.35\ \mathrm{MPa^{1/2}}.
$$
Similarly: DMF $4.50$, DMSO $5.14$, acetone $5.35$. Cyrene is the closest match, and DMF — which would merely exchange one restricted solvent for another — is next. Hansen distance is a first screen: the replacement must also be stable to the reagents (Cyrene, a ketone, is unstable towards strong bases and some nucleophiles), have a boiling point compatible with the reaction temperature and work-up (Cyrene boils at about $227\,^\circ\mathrm{C}$, which makes it hard to remove by evaporation, so products are usually isolated by adding water), and give comparable rate and selectivity, which must be tested experimentally.
:::
:::

### Volatility

Most solvent hazards — fire, inhalation exposure, emissions of volatile organic compounds (VOCs) — scale with vapour pressure, which depends steeply on temperature.

::: proposition Clausius–Clapeyron estimate of vapour pressure {#prop-cc}
If the enthalpy of vaporisation is independent of temperature and the vapour is ideal, the vapour pressure at temperature $T$ of a liquid with normal boiling point $T_\mathrm{b}$ is
$$
p(T) = p^\ominus\exp\!\left[-\frac{\Delta_\mathrm{vap}H}{R}\left(\frac{1}{T} - \frac{1}{T_\mathrm{b}}\right)\right], \qquad p^\ominus = 101.325\ \mathrm{kPa},
$$ {#eq-cc}
and the equilibrium mass concentration of vapour in air above the liquid is $c = pM/RT$.
:::

::: proof
The Clapeyron equation for liquid–vapour equilibrium, $\mathrm{d}p/\mathrm{d}T = \Delta_\mathrm{vap}H/(T\Delta_\mathrm{vap}V)$, with $\Delta_\mathrm{vap}V \approx V_\mathrm{m}(\mathrm{g}) = RT/p$ (the liquid volume neglected), becomes $\mathrm{d}\ln p/\mathrm{d}T = \Delta_\mathrm{vap}H/RT^2$ ([[thermodynamics/phase-equilibria]]). Integrating from $T_\mathrm{b}$, where $p = p^\ominus$ by definition of the normal boiling point, to $T$ with constant $\Delta_\mathrm{vap}H$ gives [[#eq-cc]]. The concentration follows from the ideal-gas law, $n/V = p/RT$, multiplied by $M$.
:::

::: widget plot
f: 101.325*exp(-28800/8.314*(1/x - 1/312.8)); 101.325*exp(-31940/8.314*(1/x - 1/350.2)); 101.325*exp(-33180/8.314*(1/x - 1/383.8)); 101.325*exp(-40650/8.314*(1/x - 1/373.15))
x: 260, 380
y: 0, 110
labels: \text{dichloromethane}; \text{ethyl acetate}; \text{toluene}; \text{water}
hlines: 101.325
caption: Vapour pressures in kPa from the Clausius–Clapeyron equation [[#eq-cc]] against temperature in kelvin ($x$), using normal boiling points and enthalpies of vaporisation at the boiling point: dichloromethane ($312.8\ \mathrm{K}$, $28.8\ \mathrm{kJ\,mol^{-1}}$), ethyl acetate ($350.2\ \mathrm{K}$, $31.9$), toluene ($383.8\ \mathrm{K}$, $33.2$), water ($373.15\ \mathrm{K}$, $40.7$). At room temperature dichloromethane's vapour pressure is almost half an atmosphere — ten times that of ethyl acetate — so open handling releases large amounts of vapour, and a $1\ \mathrm{dm^3}$ spill in a closed room can exceed occupational exposure limits by orders of magnitude. The constant-$\Delta_\mathrm{vap}H$ approximation is good to a few per cent near the boiling point and less accurate far below it.
:::

::: warning "Non-volatile" does not mean "green" {#warn-ionic}
Ionic liquids were promoted in the late 1990s as green solvents because their vapour pressure is negligible: no inhalation exposure, no VOC emissions, no flammable vapour. But a solvent's life cycle does not end at the reactor. Many ionic liquids are toxic to aquatic organisms, especially those with long alkyl chains; some are poorly biodegradable and very mobile in water; tetrafluoroborate and hexafluorophosphate anions hydrolyse slowly to HF; their synthesis typically has a high PMI; and because they cannot be distilled, product isolation often needs extraction with a volatile solvent, reintroducing the problem. The lesson generalises: a single favourable property (low volatility, bio-based origin, biodegradability) is not a sufficient criterion, and solvents should be compared across their life cycle and against the alternative of using less solvent or none.
:::

## Alternatives to conventional organic solvents

### Water

Water is non-flammable, non-toxic and cheap, and for many reactions it is a surprisingly good medium. Ronald Breslow showed in 1980 that the Diels–Alder reaction of cyclopentadiene with butenone is about $700$ times faster in water than in isooctane: the hydrophobic effect forces the non-polar reactants together, and hydrogen bonding to the carbonyl group stabilises the polarised transition state. In 2005 Sharpless and co-workers described reactions "on water", in which insoluble reactants stirred as a suspension in water react faster than in organic solvents or neat, attributed to hydrogen bonding at the oil–water interface. **Micellar catalysis**, developed extensively by Bruce Lipshutz using designer surfactants such as TPGS-750-M (2011), runs transition-metal-catalysed couplings in nanometre-sized micelles in water at low surfactant concentrations, often at room temperature and with low catalyst loadings.

The limits are real. Many organometallic reagents react with water; many substrates are insoluble; and the aqueous waste, contaminated with organic material and metals, must be treated before discharge — it does not disappear from the PMI. Water has a high heat of vaporisation ($40.7\ \mathrm{kJ\,mol^{-1}}$, $2.26\ \mathrm{MJ\,kg^{-1}}$), so removing it by evaporation is energy-intensive. Water is green when the product can be isolated by filtration or phase separation and the aqueous phase can be recycled or treated simply.

### Supercritical carbon dioxide

Above its critical point, $T_\mathrm{c} = 304.13\ \mathrm{K}$ ($31.0\,^\circ\mathrm{C}$) and $p_\mathrm{c} = 7.377\ \mathrm{MPa}$, carbon dioxide is a **supercritical fluid**: no distinction between liquid and gas remains, and the density can be varied continuously from gas-like to liquid-like by small changes in pressure or temperature near the critical point. Solvating power rises with density, so solubility can be tuned, and on depressurisation the solvent simply evaporates, leaving a solvent-free product. $\mathrm{CO_2}$ is non-flammable, of low toxicity (but an asphyxiant in enclosed spaces), cheap and available as a by-product of ammonia and ethanol plants, so its use does not add to emissions if it is recovered. Hydrogen and oxygen are completely miscible with it, which removes the gas–liquid mass-transfer limitation of hydrogenations and oxidations.

::: example How non-ideal is supercritical CO₂? {#ex-scco2}
The density of $\mathrm{CO_2}$ at $40\,^\circ\mathrm{C}$ and $10.0\ \mathrm{MPa}$ is about $630\ \mathrm{kg\,m^{-3}}$ (NIST reference data). Compare it with the ideal-gas value and with liquid water, and explain why this matters for its use as a solvent.
::: solution
For an ideal gas,
$$
\rho = \frac{pM}{RT} = \frac{10.0\times10^{6}\ \mathrm{Pa}\times0.04401\ \mathrm{kg\,mol^{-1}}}{8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}\times313.15\ \mathrm{K}} = 169\ \mathrm{kg\,m^{-3}}.
$$
The real fluid is $3.7$ times denser: close to the critical point the attractive forces between molecules dominate, and the compressibility factor $Z = \rho_\mathrm{ideal}/\rho = 0.27$. At $630\ \mathrm{kg\,m^{-3}}$ (about two-thirds of the density of water) $\mathrm{CO_2}$ dissolves many non-polar and moderately polar organic compounds, while a reduction to a few MPa at the same temperature lowers the density several-fold and precipitates them. This tunability, analysed with real-gas equations of state ([[statistical-thermodynamics/real-gases-liquids]]), is the basis of supercritical extraction and of separations by stepwise depressurisation. The pressure, however, requires thick-walled equipment and compression energy, and $\mathrm{CO_2}$ is a poor solvent for polar and ionic compounds unless co-solvents or surfactants are added.
:::
:::

The largest applications are extractions. Kurt Zosel at the Max Planck Institute for Coal Research in Mülheim patented the decaffeination of coffee with supercritical $\mathrm{CO_2}$ in the 1970s, replacing chlorinated solvents; hops, spices and natural oils are extracted similarly, and supercritical $\mathrm{CO_2}$ is used in dry cleaning and in polymer foaming. Martyn Poliakoff's group at Nottingham and the company Thomas Swan built a continuous multipurpose plant for hydrogenations and other reactions in supercritical $\mathrm{CO_2}$ in 2002.

### Ionic liquids and deep eutectic solvents

**Ionic liquids** are salts melting below about $100\,^\circ\mathrm{C}$, typically with bulky, asymmetric organic cations (1-alkyl-3-methylimidazolium, pyrrolidinium, phosphonium) and weakly coordinating anions (bis(trifluoromethanesulfonyl)imide, acetate). Their properties can be tuned by choice of ions, and some dissolve cellulose or $\mathrm{CO_2}$ well. The best-known industrial application, BASF's BASIL process (2002), is less a solvent replacement than clever engineering: in the manufacture of alkoxyphenylphosphines, the HCl by-product was formerly scavenged by a tertiary amine, forming a thick slurry of ammonium salt. Replacing the amine with 1-methylimidazole gives 1-methylimidazolium chloride, a liquid at the reaction temperature that separates as a second phase, so the reaction can be run in a small continuous reactor; BASF reported an increase in space–time yield by a factor of about $80\,000$. The cautions of the warning above apply. **Deep eutectic solvents**, introduced by Andrew Abbott and co-workers in 2003 (choline chloride with urea, melting at $12\,^\circ\mathrm{C}$ although the components melt at $302$ and $133\,^\circ\mathrm{C}$), are cheaper, often made from benign components, and increasingly studied for metal processing and biomass.

### Bio-based and safer organic solvents

Many replacements are ordinary molecules with better profiles. **2-Methyltetrahydrofuran** (2-MeTHF), made from furfural or levulinic acid, replaces THF and dichloromethane in extractions because, unlike THF, it is only partly miscible with water; **cyclopentyl methyl ether** forms peroxides much more slowly than other ethers; **ethyl acetate** and **isopropyl acetate** replace dichloromethane in many extractions and chromatography; **Cyrene** and **γ-valerolactone** are being developed to replace dipolar aprotic amides; **dimethyl carbonate** replaces toxic methylating agents and some solvents. Bio-based origin is an advantage only if the life cycle confirms it ([[green-chemistry/green-principles#ex-lca-solvent]]).

### No solvent

The most effective solvent strategy is often to use less. Running reactions at higher concentration, or **neat** when the reactants are liquid, reduces both PMI and reactor volume; telescoping several steps in one solvent avoids isolations; crystallising the product directly from the reaction mixture avoids extraction. **Mechanochemistry** — grinding solid reactants in a ball mill, sometimes with a few drops of liquid ("liquid-assisted grinding") — carries out reactions between solids without bulk solvent; it is used for co-crystals, metal–organic frameworks and an increasing range of organic and organometallic reactions, and IUPAC named it one of the "top ten emerging technologies in chemistry" in 2019.

::: quiz
A process chemist wants to replace dichloromethane in a liquid–liquid extraction of an organic product from water. Which property must the replacement have that THF lacks?
- [ ] A higher boiling point than water
- [x] Limited miscibility with water, so that two phases form
- [ ] A Hildebrand parameter close to that of water
- [ ] Zero vapour pressure
::: solution
An extraction needs two immiscible phases. THF is fully miscible with water and cannot be used; 2-MeTHF, ethyl acetate, isopropyl acetate and cyclopentyl methyl ether are only partly miscible and are common replacements. A solubility parameter close to water's would make the solvent miscible with water, and zero vapour pressure would make it difficult to remove from the product.
:::
:::

## Continuous-flow chemistry

Changing the solvent is one way to make a reaction safer; changing the reactor is another. In **continuous-flow** processing the reactants are pumped through a tube, channel or series of small vessels, reacting as they go; the product emerges continuously. The ideas are those of [[green-chemistry/chemical-industry]]: small inventory, large area per volume, steady-state operation. What is new since the 2000s is their application to fine-chemical and pharmaceutical synthesis, in tubes of millimetre diameter.

::: definition Residence time and ideal flow reactors {#def-flow}
For a reactor of volume $V$ fed at volumetric flow rate $Q$ (assumed constant along the reactor), the **space time** or mean **residence time** is $\tau = V/Q$. Two idealised flow reactors bound real behaviour: the **plug-flow reactor** (PFR), in which fluid elements move through without mixing in the direction of flow, so each spends exactly $\tau$ in the reactor; and the **continuous stirred-tank reactor** (CSTR), perfectly mixed, so the outlet composition equals the composition inside. Narrow tubes at modest flow rates approximate plug flow; stirred vessels in series approach it as their number increases.
:::

::: proposition Conversion in ideal flow reactors {#prop-pfr-cstr}
For an irreversible first-order reaction with rate constant $k$, at constant density and temperature, the conversion at residence time $\tau$ is
$$
X_\mathrm{PFR} = 1 - \mathrm{e}^{-k\tau}, \qquad X_\mathrm{CSTR} = \frac{k\tau}{1 + k\tau} .
$$ {#eq-pfr-cstr}
For a given conversion the CSTR needs a larger volume than the PFR, by the factor $[X/(1 - X)]/[-\ln(1 - X)]$.
:::

::: proof
In a PFR, a fluid element behaves like a small batch reactor that has been reacting for its time in the reactor; after $\tau$, first-order kinetics give $c/c_0 = \mathrm{e}^{-k\tau}$ ([[kinetics/rate-laws]]), so $X = 1 - \mathrm{e}^{-k\tau}$. In a CSTR at steady state the balance on reactant is in $=$ out $+$ reaction: $Qc_0 = Qc + kcV$, so $c/c_0 = 1/(1 + k\tau)$ and $X = k\tau/(1 + k\tau)$. Solving each for $k\tau$ at given $X$: $k\tau_\mathrm{PFR} = -\ln(1 - X)$ and $k\tau_\mathrm{CSTR} = X/(1 - X)$; at the same $Q$ the volumes are in the ratio of the $\tau$s. The CSTR is less efficient because all of the reactant is at the low outlet concentration, where a positive-order reaction is slowest.
:::

::: widget plot
f: 1 - exp(-x); x/(1 + x); 1 - 1/(1 + x/N)^N
x: 0, 6
y: 0, 1
sliders: N=3:1:20:1
labels: \text{PFR}; \text{CSTR}; N\ \text{CSTRs in series}
caption: Conversion of a first-order reaction against the Damköhler number $k\tau$ ($x$) in a plug-flow reactor, a single stirred tank and a cascade of $N$ equal stirred tanks with the same total residence time (slider). For $90\,\%$ conversion the PFR needs $k\tau = 2.30$ and the single CSTR $9.0$, four times the volume; a cascade of a few tanks recovers most of the difference, which is why continuous stirred-tank cascades are used when solids or slurries rule out tubes.
:::

The advantages of flow for green chemistry follow from the scale arguments of the previous chapters:

- **Heat transfer.** A tube of internal diameter $d$ has $A/V = 4/d$: $4000\ \mathrm{m^{-1}}$ for $1\ \mathrm{mm}$, against about $2.6\ \mathrm{m^{-1}}$ for a $10\ \mathrm{m^3}$ vessel ([[green-chemistry/chemical-industry#ex-av]]). Strongly exothermic reactions — nitrations, organolithium chemistry, fluorinations — can be run near isothermally at higher temperatures and concentrations, often with less solvent.
- **Small inventory.** At any moment only the reactor hold-up, millilitres to litres, is reacting, so hazardous intermediates (diazo compounds, azides, organic peroxides) can be generated and consumed in line rather than accumulated ([[green-chemistry/green-principles#ex-inventory]]).
- **Process windows.** Tubes withstand high pressure easily, so solvents can be heated far above their normal boiling points ("superheated" conditions), and gases (hydrogen, oxygen, CO) can be dissolved at high concentration; residence times of seconds allow unstable intermediates to be used before they decompose.
- **Photochemistry and electrochemistry.** Light penetrates only a short distance into an absorbing solution (Beer–Lambert law, [[analytical-chemistry/molecular-spectrometry]]), and electrode reactions need short distances between electrodes; thin channels suit both.
- **Scale-up by numbering up.** Production is increased by running longer or in parallel, rather than redesigning a larger vessel with poorer heat transfer.

There are drawbacks. Solids block narrow channels; slow reactions need long tubes or large volumes; start-up and shut-down produce off-specification material; and the equipment, pumps and on-line analysis (principle 11) are more complex. Flow is a powerful option, not a universal answer.

::: example Sizing a flow reactor {#ex-flow}
A first-order reaction has $k = 0.20\ \mathrm{min^{-1}}$ at the chosen temperature. (a) What residence time gives $95\,\%$ conversion in a PFR, and what volume is needed for a throughput of $50\ \mathrm{cm^3\,min^{-1}}$? (b) How long must a tube of $2.0\ \mathrm{mm}$ internal diameter be? (c) What residence time would a single CSTR need?
::: solution
(a) $k\tau = -\ln(1 - 0.95) = 3.00$, so $\tau = 3.00/0.20 = 15.0\ \mathrm{min}$ and $V = Q\tau = 50\times15.0 = 750\ \mathrm{cm^3}$.

(b) The cross-section is $\pi(0.10\ \mathrm{cm})^2 = 0.0314\ \mathrm{cm^2}$, so $L = 750/0.0314\ \mathrm{cm} = 2.39\times10^{4}\ \mathrm{cm} = 239\ \mathrm{m}$ — a long coil, which in practice would be built with a wider tube or several parallel coils, or the reaction run hotter to raise $k$ (a tenfold faster reaction needs $24\ \mathrm{m}$).

(c) $k\tau = X/(1 - X) = 19$, $\tau = 95\ \mathrm{min}$: more than six times longer. The throughput of $50\ \mathrm{cm^3\,min^{-1}}$ is $72\ \mathrm{dm^3}$ a day, enough for kilogram quantities of a fine chemical from a reactor holding $0.75\ \mathrm{dm^3}$.
:::
:::

::: history Solvents under scrutiny {#hist-solvents}
Joel Hildebrand introduced the solubility parameter in the 1930s and developed the theory of regular solutions with Robert Scott (*The Solubility of Nonelectrolytes*, 1950); Charles Hansen proposed his three-component parameters in his 1967 doctoral thesis. The Montreal Protocol (1987) phased out tetrachloromethane and 1,1,1-trichloroethane as ozone-depleting substances, the first large-scale forced solvent substitution. Kurt Zosel's supercritical decaffeination was commercialised in Germany from 1978. Ronald Breslow reported hydrophobic acceleration of Diels–Alder reactions in water in 1980; Kenneth Seddon and others championed ionic liquids in the 1990s, and BASF's BASIL process started in 2002. Pfizer (2008), GSK (2011, 2016), Sanofi (2013) and the CHEM21 consortium (2016) published solvent selection guides. The ICH Q3C guideline on residual solvents was first adopted in 1997. Continuous-flow synthesis of pharmaceuticals moved from academic demonstrations in the 2000s to commercial manufacture, supported by the ICH Q13 guideline (2022).
:::

## Where this leads

Solvents return in [[green-chemistry/renewable-feedstocks]], where cellulose processing needs special solvents (ionic liquids, N-methylmorpholine N-oxide for lyocell fibres) and biocatalysis works mostly in water, and in [[green-chemistry/circular-economy]], where solvent-based recycling of plastics and regulation under REACH reappear. The thermodynamics of mixing is developed in [[thermodynamics/mixtures]], and the analysis of reactor types is the subject of chemical reaction engineering, treated in Moulijn, Makkee and van Diepen's *Chemical Process Technology*.

::: summary
- Solvents typically account for half or more of the mass used in pharmaceutical manufacture, and much of the hazard; using less solvent is usually the most effective change.
- The Hildebrand parameter $\delta = [(\Delta_\mathrm{vap}H - RT)/V_\mathrm{m}]^{1/2}$ and the regular-solution result $\Delta_\mathrm{mix}H \approx V\phi_1\phi_2(\delta_1 - \delta_2)^2$ quantify "like dissolves like"; Hansen's three parameters and distance $R_\mathrm{a}$ handle polar and hydrogen-bonding liquids and guide substitution.
- Selection guides (Pfizer, GSK, Sanofi, CHEM21) rank solvents as recommended, problematic, hazardous or highly hazardous; REACH restricts NMP and DMF, the US EPA's 2024 TSCA rule restricts methylene chloride, and ICH Q3C limits residues in medicines.
- Vapour pressure, from Clausius–Clapeyron, drives fire, exposure and VOC hazards; low volatility alone (ionic liquids) does not make a solvent green.
- Water, supercritical $\mathrm{CO_2}$ ($T_\mathrm{c} = 31.0\,^\circ\mathrm{C}$, $p_\mathrm{c} = 7.38\ \mathrm{MPa}$), bio-based solvents, deep eutectic solvents and mechanochemistry each solve specific problems with specific limitations.
- In flow, $\tau = V/Q$; first-order conversion is $1 - \mathrm{e}^{-k\tau}$ in plug flow and $k\tau/(1 + k\tau)$ in a CSTR. Narrow channels give large $A/V$, small inventories and access to high temperatures and pressures.
:::

## Exercises

::: exercise Residence time {level=1 check="10"}
A $20\ \mathrm{cm^3}$ coil reactor is fed at $2.0\ \mathrm{cm^3\,min^{-1}}$. What is the residence time? (Enter it in minutes.)
::: solution
$\tau = V/Q = 20/2.0 = 10\ \mathrm{min}$.
:::
:::

::: exercise A Hildebrand parameter {level=1 check="16.8"}
Cyclohexane has $\Delta_\mathrm{vap}H = 33.0\ \mathrm{kJ\,mol^{-1}}$ at $25\,^\circ\mathrm{C}$, $M = 84.16\ \mathrm{g\,mol^{-1}}$ and density $0.774\ \mathrm{g\,cm^{-3}}$. Calculate its Hildebrand parameter. (Enter $\delta$ in $\mathrm{MPa^{1/2}}$, to three significant figures.)
::: solution
$V_\mathrm{m} = 84.16/0.774 = 108.7\ \mathrm{cm^3\,mol^{-1}}$; $\Delta_\mathrm{vap}H - RT = 33\,000 - 2479 = 30\,521\ \mathrm{J\,mol^{-1}}$; $\delta = (30\,521/108.7)^{1/2} = (280.8)^{1/2} = 16.8\ \mathrm{MPa^{1/2}}$, in agreement with tabulated values.
:::
:::

::: exercise Plug flow conversion {level=1 check="86.5"}
A first-order reaction with $k = 0.20\ \mathrm{min^{-1}}$ runs in a plug-flow reactor with $\tau = 10\ \mathrm{min}$. Find the conversion. (Enter it in per cent.)
::: solution
$X = 1 - \mathrm{e}^{-2.0} = 1 - 0.135 = 0.865$, i.e. $86.5\,\%$. In a single CSTR with the same $\tau$ it would be $2.0/3.0 = 66.7\,\%$.
:::
:::

::: exercise Hansen distance {level=2 check="3.13"}
Using Hansen parameters dichloromethane $(17.0, 7.3, 7.1)$ and ethyl acetate $(15.8, 5.3, 7.2)\ \mathrm{MPa^{1/2}}$, compute $R_\mathrm{a}$. (Enter it in $\mathrm{MPa^{1/2}}$, to three significant figures.)
::: solution
$R_\mathrm{a} = [4(1.2)^2 + (2.0)^2 + (0.1)^2]^{1/2} = (5.76 + 4.00 + 0.01)^{1/2} = 9.77^{1/2} = 3.13\ \mathrm{MPa^{1/2}}$. For comparison, DCM to 2-MeTHF $(16.9, 5.0, 4.3)$ is $3.63$. Both are close enough to be worth testing as replacements for many solutes, which matches practice.
:::
:::

::: exercise Volume penalty of a stirred tank {level=2 check="3.91"}
For a first-order reaction, by what factor must a single CSTR be larger than a PFR to achieve $90\,\%$ conversion at the same flow rate? (Enter the factor, to three significant figures.)
::: solution
$\tau_\mathrm{CSTR}/\tau_\mathrm{PFR} = [X/(1 - X)]/[-\ln(1 - X)] = 9.0/2.303 = 3.91$. At $99\,\%$ conversion the factor is $99/4.605 = 21.5$: the penalty grows rapidly with conversion.
:::
:::

::: exercise How much vapour? {level=2 check="48.3"}
Estimate the vapour pressure of dichloromethane at $20\,^\circ\mathrm{C}$ from its normal boiling point ($39.6\,^\circ\mathrm{C}$) and $\Delta_\mathrm{vap}H = 28.8\ \mathrm{kJ\,mol^{-1}}$, and the equilibrium vapour concentration in air ($M = 84.93\ \mathrm{g\,mol^{-1}}$). (Enter the vapour pressure in kPa, to three significant figures.)
::: solution
$\ln(p/p^\ominus) = -(28\,800/8.314)(1/293.15 - 1/312.75) = -3464.0\times2.138\times10^{-4} = -0.7405$, so $p = 101.325\times0.4769 = 48.3\ \mathrm{kPa}$ (measured: about $47\ \mathrm{kPa}$). Concentration: $c = pM/RT = 48\,300\times84.93/(8.314\times293.15)\ \mathrm{g\,m^{-3}} = 1.68\times10^{3}\ \mathrm{g\,m^{-3}}$, i.e. $1.7\ \mathrm{kg\,m^{-3}}$ in saturated air — some four orders of magnitude above typical occupational exposure limits, which are of the order of a hundred milligrams per cubic metre. Hence closed handling and local exhaust ventilation are essential wherever DCM is still used.
:::
:::

::: exercise Mixing enthalpy of a regular solution {level=3 check="2.7"}
Derive [[#eq-regular]] from the lattice model with the geometric-mean rule, and use it to estimate the enthalpy of mixing per cubic centimetre for a $50:50$ (by volume) mixture of hexane ($\delta = 14.9$) and toluene ($\delta = 18.2\ \mathrm{MPa^{1/2}}$). (Enter the answer in $\mathrm{J\,cm^{-3}}$, to two significant figures.)
::: hint
Count contacts with probabilities $\phi_1^2$, $\phi_2^2$, $2\phi_1\phi_2$; use $c_{12} = \sqrt{c_{11}c_{22}}$.
:::
::: solution
The derivation is that of [[#prop-regular]]. Numerically, $\phi_1\phi_2(\delta_1 - \delta_2)^2 = 0.25\times3.3^2 = 2.7\ \mathrm{J\,cm^{-3}}$. For a mixture with molar volume about $120\ \mathrm{cm^3\,mol^{-1}}$ this is $0.33\ \mathrm{kJ\,mol^{-1}}$, much smaller than the ideal entropy-of-mixing contribution $-T\Delta_\mathrm{mix}S \approx -RT\times2\times0.5\ln2 = -1.7\ \mathrm{kJ\,mol^{-1}}$ (using mole fractions near $0.5$), so the liquids are miscible in all proportions, as observed.
:::
:::

::: exercise Numbering up {level=3 check="133"}
A product is to be made at $100\ \mathrm{t}$ per year ($8000$ operating hours) in a tubular reactor with a residence time of $2.0\ \mathrm{min}$; the reaction mixture has a density of $1.0\ \mathrm{kg\,dm^{-3}}$. Find the reactor volume, and the length of tubing of $2.0\ \mathrm{mm}$ internal diameter required. Compare the inventory with a batch process making $1.0\ \mathrm{t}$ batches. (Enter the length in metres, to three significant figures.)
::: solution
Throughput $= 10^{5}\ \mathrm{kg}/8000\ \mathrm{h} = 12.5\ \mathrm{kg\,h^{-1}} = 12.5\ \mathrm{dm^3\,h^{-1}}$. Volume $= 12.5\times(2.0/60) = 0.417\ \mathrm{dm^3}$. Cross-section $\pi(1.0\times10^{-3}\ \mathrm{m})^2 = 3.14\times10^{-6}\ \mathrm{m^2}$, so $L = 4.17\times10^{-4}/3.14\times10^{-6} = 133\ \mathrm{m}$. The reacting inventory is $0.42\ \mathrm{kg}$ against $1000\ \mathrm{kg}$ in a batch: a factor of $2400$. A $133\ \mathrm{m}$ coil is practical, but more often the same volume would be provided by ten parallel $13\ \mathrm{m}$ channels or a wider tube with static mixers, keeping the pressure drop manageable.
:::
:::
