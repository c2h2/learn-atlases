A handful of fertile soil contains more organisms than there are people on Earth, but chemically it is above all a vast, charged surface. One gram of a clay-rich soil can expose several hundred square metres of mineral and organic surface, most of it carrying a negative charge that holds the nutrient cations calcium, magnesium and potassium against leaching — and also holds, and sometimes releases, lead, cadmium, ammonium, pesticides and the protons of acid rain. The same surface chemistry, engineered, is the basis of water treatment: the coagulation that removes particles and natural organic matter from river water, the activated carbon that adsorbs trace organics, the reactive barriers that strip chlorinated solvents from groundwater. This lesson treats the chemistry of soils as a sorbent and an ion exchanger; the chemistry of making water safe to drink and of cleaning it after use; and the strategies — and the chemical limits — of cleaning up contaminated land and groundwater. It builds on the partitioning of [[environmental-chemistry/pollutants-fate]] and the speciation of [[environmental-chemistry/natural-waters]].

## What a soil is, chemically

A mineral soil is roughly half solids and half pore space (shared between water and air). The solids are:

- **Primary minerals** inherited from the parent rock (quartz, feldspars, micas), weathering slowly and releasing base cations.
- **Clay minerals**, secondary layered aluminosilicates smaller than $2\ \mathrm{\mu m}$. In **1:1 clays** such as kaolinite, each layer is one tetrahedral silica sheet bonded to one octahedral alumina sheet, held to the next layer by hydrogen bonds; they are non-expanding and have little charge. In **2:1 clays** — smectites (montmorillonite), vermiculite, illite — an octahedral sheet is sandwiched between two tetrahedral sheets, and **isomorphous substitution** during formation (for example $\mathrm{Mg^{2+}}$ for $\mathrm{Al^{3+}}$ in the octahedral sheet, or $\mathrm{Al^{3+}}$ for $\mathrm{Si^{4+}}$ in the tetrahedral sheet) leaves a **permanent negative charge**, balanced by exchangeable cations between the layers.
- **Oxides and hydroxides** of iron (goethite, ferrihydrite), aluminium (gibbsite) and manganese, with surface hydroxyl groups whose charge depends on pH — the **variable charge** surfaces.
- **Soil organic matter** (humus), a heterogeneous mixture of plant and microbial residues rich in carboxylic and phenolic groups, which ionise with rising pH and give it the largest charge per unit mass of any soil component. It also dominates the sorption of hydrophobic organic compounds ([[environmental-chemistry/pollutants-fate#prop-koc]]).

A variable-charge surface carries protons that can be gained or lost: $\equiv\mathrm{SOH_2^+} \rightleftharpoons \equiv\mathrm{SOH} + \mathrm{H^+} \rightleftharpoons \equiv\mathrm{SO^-} + 2\,\mathrm{H^+}$. At the **point of zero charge** (pzc) positive and negative sites balance; below it the surface is positive and attracts anions, above it negative and attracts cations. Iron and aluminium oxides have pzc values around pH $7$–$9$, so in most soils they are positively charged and bind oxyanions — phosphate, arsenate, molybdate, selenite — strongly; clays and organic matter are negative and bind cations.

## Cation exchange

::: definition Cation exchange capacity and base saturation {#def-cec}
The **cation exchange capacity** (CEC) of a soil is the amount of exchangeable cation charge it holds per unit mass, expressed in centimoles of charge per kilogram, $\mathrm{cmol(+)\,kg^{-1}}$ (numerically equal to the older unit $\mathrm{meq}/100\ \mathrm{g}$). It is the sum of permanent charge (clays) and pH-dependent charge (organic matter, oxide edges), and so it is reported at a stated pH. Typical values: kaolinite $3$–$15$, illite $10$–$40$, smectite $80$–$120$, vermiculite $100$–$150$, humus $150$–$300\ \mathrm{cmol(+)\,kg^{-1}}$. The **base saturation** is the fraction of the CEC occupied by the "base" cations $\mathrm{Ca^{2+}}$, $\mathrm{Mg^{2+}}$, $\mathrm{K^+}$ and $\mathrm{Na^+}$, the remainder being exchangeable acidity ($\mathrm{H^+}$ and $\mathrm{Al^{3+}}$).
:::

Exchange is stoichiometric — charge for charge — and reversible. Cations differ in how strongly they are held: higher charge and smaller hydrated radius bind more strongly, giving the empirical **lyotropic series** $\mathrm{Al^{3+}} > \mathrm{Ca^{2+}} > \mathrm{Mg^{2+}} > \mathrm{K^+} \approx \mathrm{NH_4^+} > \mathrm{Na^+}$. Acid deposition and nitrification add $\mathrm{H^+}$, which displaces base cations into the soil solution, from which they are leached with nitrate or sulfate; the soil acidifies once the base saturation is depleted, and $\mathrm{Al^{3+}}$ is mobilised ([[environmental-chemistry/natural-waters#ex-aluminium]]).

::: proposition Heterovalent exchange and the dilution effect {#prop-exchange}
For the exchange $2\,\mathrm{Na{-}X} + \mathrm{Ca^{2+}(aq)} \rightleftharpoons \mathrm{Ca{-}X_2} + 2\,\mathrm{Na^+(aq)}$, with exchanger composition expressed as equivalent fractions $E_\mathrm{Ca} + E_\mathrm{Na} = 1$, the Gaines–Thomas selectivity coefficient is
$$
K_\mathrm{GT} = \frac{E_\mathrm{Ca}\,[\mathrm{Na^+}]^2}{E_\mathrm{Na}^2\,[\mathrm{Ca^{2+}}]} ,
$$
so that
$$
\frac{E_\mathrm{Ca}}{E_\mathrm{Na}^2} = K_\mathrm{GT}\,\frac{[\mathrm{Ca^{2+}}]}{[\mathrm{Na^+}]^2} .
$$
If the soil solution is diluted (or concentrated) by a factor at constant $[\mathrm{Ca^{2+}}]/[\mathrm{Na^+}]$, the ratio $[\mathrm{Ca^{2+}}]/[\mathrm{Na^+}]^2$ changes in inverse proportion: dilution increases the preference of the exchanger for the divalent ion. Conditions: activity coefficients and $K_\mathrm{GT}$ treated as constant (an approximation, since $K_\mathrm{GT}$ varies with composition).
:::

::: proof The concentration–valence effect {#proof-exchange}
The expression follows from writing the mass-action quotient with equivalent fractions for the exchanger phase (the Gaines–Thomas convention). Under dilution by a factor $\delta$, both $[\mathrm{Ca^{2+}}]$ and $[\mathrm{Na^+}]$ fall by $\delta$, so $[\mathrm{Ca^{2+}}]/[\mathrm{Na^+}]^2$ *rises* by $\delta$; at fixed $K_\mathrm{GT}$, $E_\mathrm{Ca}/E_\mathrm{Na}^2$ rises by the same factor, and since $E_\mathrm{Na} = 1 - E_\mathrm{Ca}$ this increases $E_\mathrm{Ca}$. The physics is electrostatic: the diffuse layer next to a charged surface concentrates counter-ions by a Boltzmann factor $e^{-z e\psi/k_\mathrm{B}T}$, which is larger for $z = 2$; in dilute solution the potential is larger and the advantage of the divalent ion grows. This is why rain (dilute) leaves calcium on the exchanger while concentrated irrigation water with a high sodium fraction loads it with sodium, a cause of soil **sodicity**: sodium-saturated clays disperse, and the soil loses its structure and permeability.
:::

::: example Calcium and sodium on an exchanger {#ex-exchange}
A soil in contact with a solution of $10\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{Na^+}$ and $5.0\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{Ca^{2+}}$ has $K_\mathrm{GT} = 0.10\ \mathrm{mol\,dm^{-3}}$. Find $E_\mathrm{Ca}$, and its value if the solution is diluted tenfold.
::: solution
$[\mathrm{Ca^{2+}}]/[\mathrm{Na^+}]^2 = 5.0\times10^{-3}/(1.0\times10^{-2})^2 = 50\ \mathrm{dm^3\,mol^{-1}}$, so $E_\mathrm{Ca}/(1 - E_\mathrm{Ca})^2 = 0.10\times50 = 5.0$. Writing $a = 5.0$: $aE^2 - (2a + 1)E + a = 0$, i.e. $5E^2 - 11E + 5 = 0$, with the root below $1$:
$$
E_\mathrm{Ca} = \frac{11 - \sqrt{121 - 100}}{10} = \frac{11 - 4.58}{10} = 0.64 .
$$
After tenfold dilution, $[\mathrm{Ca^{2+}}]/[\mathrm{Na^+}]^2 = 500$ and $a = 50$: $50E^2 - 101E + 50 = 0$, $E_\mathrm{Ca} = (101 - \sqrt{201})/100 = 0.87$. Although the solution still contains two sodium ions per calcium ion, the exchanger now holds $87\ \%$ calcium (by charge). Rain percolating through a soil therefore displaces sodium in favour of calcium, while evaporation concentrates the soil solution and shifts the exchanger towards sodium — the chemistry behind the salinisation and sodification of irrigated soils in dry climates.
:::
:::

::: example Liming an acid soil {#ex-liming}
An arable topsoil ($0$–$20\ \mathrm{cm}$, bulk density $1.30\ \mathrm{g\,cm^{-3}}$) has $2.0\ \mathrm{cmol(+)\,kg^{-1}}$ of exchangeable acidity that the farmer wishes to neutralise with ground limestone ($\mathrm{CaCO_3}$). How much limestone is needed per hectare?
::: solution
Soil mass per hectare: $10^{4}\ \mathrm{m^2}\times0.20\ \mathrm{m}\times1300\ \mathrm{kg\,m^{-3}} = 2.6\times10^{6}\ \mathrm{kg}$. Acidity: $2.6\times10^{6}\ \mathrm{kg}\times0.020\ \mathrm{mol(+)\,kg^{-1}} = 5.2\times10^{4}\ \mathrm{mol}$ of $\mathrm{H^+}$ equivalents. Each $\mathrm{CaCO_3}$ neutralises two: $\mathrm{CaCO_3 + 2\,H{-}X \rightarrow Ca{-}X_2 + CO_2 + H_2O}$ (with $\mathrm{Al{-}X}$ reacting similarly to precipitate $\mathrm{Al(OH)_3}$). So $2.6\times10^{4}\ \mathrm{mol}\times100.09\ \mathrm{g\,mol^{-1}} = 2.6\times10^{6}\ \mathrm{g} = 2.6\ \mathrm{t\,ha^{-1}}$. In practice more is applied, because exchangeable acidity understates the total titratable acidity of organic matter, limestone is not perfectly pure or fine, and acidification continues with every nitrogen fertilisation. Liming is also used on acidified lakes and catchments in Scandinavia, as a treatment of the symptom while deposition falls.
:::
:::

## Adsorption isotherms

For trace solutes — metals, pesticides, organic micropollutants — on soils, sediments and engineered sorbents, sorption is described by an **isotherm**: the amount sorbed per mass of sorbent, $q$, as a function of the equilibrium solution concentration $C$, at constant temperature.

::: proposition The Langmuir isotherm {#prop-langmuir}
If a surface has a fixed number of identical, independent sites, each holding at most one molecule, with adsorption and desorption in dynamic equilibrium, then
$$
q = \frac{q_\text{max}K_\mathrm{L}C}{1 + K_\mathrm{L}C},
$$
where $q_\text{max}$ is the sorption capacity (monolayer coverage) and $K_\mathrm{L}$ the affinity constant. At low $C$, $q \approx q_\text{max}K_\mathrm{L}C$ — linear, with $K_\mathrm{d} = q_\text{max}K_\mathrm{L}$; at high $C$ the surface saturates at $q_\text{max}$. The empirical **Freundlich isotherm** $q = K_\mathrm{F}C^{1/n}$ ($n > 1$ typically) describes heterogeneous surfaces with a distribution of site energies and has no saturation limit; it is a fitting function, not a mechanism.
:::

::: proof Kinetic derivation of the Langmuir isotherm {#proof-langmuir}
Let $\theta = q/q_\text{max}$ be the fraction of sites occupied. The adsorption rate is proportional to the solute concentration and the fraction of free sites, $k_\mathrm{a}C(1 - \theta)$; the desorption rate is proportional to the occupied fraction, $k_\mathrm{d}\theta$. At equilibrium they are equal: $k_\mathrm{a}C(1 - \theta) = k_\mathrm{d}\theta$, so $\theta = K_\mathrm{L}C/(1 + K_\mathrm{L}C)$ with $K_\mathrm{L} = k_\mathrm{a}/k_\mathrm{d}$. This is the same argument as for gas adsorption in [[kinetics/surface-kinetics]], with $C$ in place of pressure; the assumptions (equivalent, independent sites, monolayer) are what fail on real soils, which is why Freundlich fits are often better.
:::

::: widget plot
f: qm*K*x/(1 + K*x); KF*x^(1/n)
x: 0, 20
y: 0, 15
sliders: qm=10:1:20:0.5; K=0.5:0.05:3:0.05; KF=3:0.5:6:0.1; n=2.5:1:5:0.1
labels: \text{Langmuir}; \text{Freundlich}
caption: Sorption isotherms: amount sorbed $q$ (e.g. $\mathrm{mg\,g^{-1}}$) against equilibrium concentration $C$ (e.g. $\mathrm{mg\,dm^{-3}}$). The Langmuir curve saturates at $q_\text{max}$ and is linear at low $C$ with slope $q_\text{max}K_\mathrm{L}$; the Freundlich curve keeps rising. Over a limited concentration range the two can be made to look alike — so an isotherm measured over one decade of $C$ does not tell you whether a sorbent will saturate at higher loadings, which matters when designing an activated-carbon filter.
:::

## Drinking-water treatment

Raw water from rivers, reservoirs or aquifers contains particles, natural organic matter, microorganisms and sometimes dissolved iron, manganese, arsenic, nitrate or organic micropollutants. A conventional surface-water treatment works applies a sequence of steps, each based on chemistry treated in this course.

**Coagulation and flocculation.** Most suspended particles and dissolved humic substances carry negative charge and repel each other. Adding aluminium sulfate ("alum") or iron(III) chloride at pH $6$–$7$ precipitates amorphous hydroxides, near their solubility minimum ([[environmental-chemistry/natural-waters]]), which neutralise particle charge and enmesh the particles in growing flocs ("sweep flocculation"). The hydrolysis releases protons and consumes alkalinity:
$$
\mathrm{Al_2(SO_4)_3{\cdot}14H_2O} + 6\,\mathrm{HCO_3^-} \rightarrow 2\,\mathrm{Al(OH)_3(s)} + 3\,\mathrm{SO_4^{2-}} + 6\,\mathrm{CO_2} + 14\,\mathrm{H_2O},
$$
so each $\mathrm{mg\,dm^{-3}}$ of alum ($594\ \mathrm{g\,mol^{-1}}$) consumes $6\times50.04/594 = 0.51\ \mathrm{mg\,dm^{-3}}$ of alkalinity as $\mathrm{CaCO_3}$, and soft, low-alkalinity waters need lime or soda ash added. The flocs settle (sedimentation) or are removed by **filtration** through sand. Coagulation also removes much of the natural organic matter, which matters because that organic matter later reacts with chlorine.

**Softening, iron and manganese removal, and special treatments.** Lime softening precipitates calcium as $\mathrm{CaCO_3}$ (raising pH to about $10$) and magnesium as $\mathrm{Mg(OH)_2}$; groundwater iron and manganese are oxidised (by aeration, chlorine or permanganate) to insoluble $\mathrm{Fe(OH)_3}$ and $\mathrm{MnO_2}$ and filtered off. Granular activated carbon adsorbs trace organic compounds — pesticides, taste-and-odour compounds, many PFAS — according to their isotherms; ion exchange and reverse osmosis remove nitrate and PFAS; arsenic is removed by co-precipitation with iron hydroxide or on iron-oxide sorbents.

**Disinfection.** Chlorine hydrolyses in water,
$$
\mathrm{Cl_2(g)} + \mathrm{H_2O(l)} \rightarrow \mathrm{HOCl(aq)} + \mathrm{H^+(aq)} + \mathrm{Cl^-(aq)},
\qquad
\mathrm{HOCl} \rightleftharpoons \mathrm{H^+} + \mathrm{OCl^-}\quad(\mathrm{p}K_\mathrm{a} = 7.54\ \text{at}\ 25\ \mathrm{°C}),
$$
and hypochlorous acid, a neutral molecule that penetrates cell walls, is a much more effective disinfectant (by a factor often quoted as about $80$–$100$) than the hypochlorite anion. Disinfection efficiency therefore falls with pH. In the presence of ammonia, chlorine forms chloramines ($\mathrm{NH_2Cl}$, $\mathrm{NHCl_2}$), weaker but longer-lasting disinfectants, and adding chlorine beyond the point where all ammonia has been oxidised to $\mathrm{N_2}$ — **breakpoint chlorination** — is needed to establish a free chlorine residual. Ozone and ultraviolet light are alternatives without a lasting residual.

::: definition The Chick–Watson law and Ct {#def-ct}
The inactivation of microorganisms by a disinfectant at concentration $C$ is often described, empirically, by the **Chick–Watson law**
$$
\ln\frac{N}{N_0} = -k\,C^{n}t ,
$$
with $N/N_0$ the surviving fraction after contact time $t$, $k$ a lethality coefficient specific to organism, disinfectant, pH and temperature, and $n$ usually close to $1$. With $n = 1$ the inactivation depends only on the product $Ct$ (in $\mathrm{mg\,min\,dm^{-3}}$), and regulations specify the **Ct value** required for a given "log inactivation" — $\log_{10}(N_0/N) = 2, 3, 4$ — of target organisms. It is an empirical model; real inactivation curves often show shoulders and tails.
:::

::: example Chlorine at two pH values {#ex-hocl}
A water is dosed to $0.50\ \mathrm{mg\,dm^{-3}}$ of free chlorine. What fraction is present as HOCl at pH $7.0$ and at pH $8.0$ ($\mathrm{p}K_\mathrm{a} = 7.54$)? If the required Ct for the target organism with HOCl is $1.0\ \mathrm{mg\,min\,dm^{-3}}$ and $\mathrm{OCl^-}$ contributes negligibly, what contact times are needed?
::: solution
Fraction of HOCl $= 1/(1 + 10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}})$. At pH $7.0$: $1/(1 + 10^{-0.54}) = 1/1.288 = 0.78$. At pH $8.0$: $1/(1 + 10^{0.46}) = 1/3.88 = 0.26$. Effective HOCl: $0.39$ and $0.13\ \mathrm{mg\,dm^{-3}}$. Contact times: $1.0/0.39 = 2.6\ \mathrm{min}$ and $1.0/0.13 = 7.8\ \mathrm{min}$. Raising the pH by one unit triples the required contact time. Lime-softened waters at high pH are disinfected before softening or re-acidified for this reason.
:::
:::

::: widget plot
f: 100/(1 + 10^(x - pKa)); 100 - 100/(1 + 10^(x - pKa))
x: 4, 11
y: 0, 105
sliders: pKa=7.54:7.2:7.8:0.01
labels: \%\ \mathrm{HOCl}; \%\ \mathrm{OCl^-}
caption: Speciation of free chlorine against pH. The $\mathrm{p}K_\mathrm{a}$ of hypochlorous acid ($7.54$ at $25\ \mathrm{°C}$, rising slightly at lower temperature — adjust with the slider) lies in the middle of the range of treated waters, so small pH changes alter the disinfecting power substantially. The same curve explains why swimming-pool chemistry is controlled to pH $7.2$–$7.6$.
:::

Chlorine also reacts with natural organic matter, by electrophilic substitution on activated aromatic rings and by the haloform reaction on methyl ketone structures, forming **disinfection by-products** (DBPs): trihalomethanes ($\mathrm{CHCl_3}$, $\mathrm{CHBrCl_2}$, …), haloacetic acids and many others. Some DBPs are classified as possibly carcinogenic, and they are regulated as of 2026 by, for example, a parametric value of $100\ \mathrm{\mu g\,dm^{-3}}$ for total trihalomethanes in the EU Drinking Water Directive (EU) 2020/2184, and maximum contaminant levels of $80\ \mathrm{\mu g\,dm^{-3}}$ for total trihalomethanes and $60\ \mathrm{\mu g\,dm^{-3}}$ for five haloacetic acids in the United States; WHO gives guideline values for individual compounds (e.g. chloroform $300\ \mathrm{\mu g\,dm^{-3}}$). Removing the organic precursors by coagulation before chlorination is the main control measure. The microbial risk of inadequate disinfection is far larger than the risk from DBPs, which is the consistent position of the WHO *Guidelines for Drinking-water Quality*: disinfection must never be compromised to control by-products.

## Wastewater treatment

Municipal wastewater carries organic matter (BOD of a few hundred $\mathrm{mg\,dm^{-3}}$), suspended solids, ammonium, phosphate, pathogens and a large array of micropollutants. Conventional treatment removes them in stages: **primary** sedimentation of solids; **secondary** biological treatment, usually activated sludge, in which aerated flocs of bacteria oxidise organic matter to $\mathrm{CO_2}$ and biomass, removing $90\ \%$ or more of BOD; and **tertiary** treatment for nutrients. Nitrogen is removed by nitrification ($\mathrm{NH_4^+ \rightarrow NO_3^-}$ in aerated tanks) followed by denitrification ($\mathrm{NO_3^- \rightarrow N_2}$ in anoxic tanks, using the wastewater's own organic carbon as electron donor) — the redox ladder of [[environmental-chemistry/natural-waters]] applied by design. Phosphate is removed by precipitation with iron or aluminium salts or by "enhanced biological phosphorus removal". The sludge is digested anaerobically, producing biogas (methane), or treated otherwise.

Regulation, neutrally stated: in the EU, the Urban Waste Water Treatment Directive of 1991 has been recast as Directive (EU) 2024/3019, which among other things extends tertiary treatment and introduces "quaternary" treatment to remove micropollutants (by ozonation or activated carbon) at large plants, with costs partly borne by producers of pharmaceuticals and cosmetics under extended producer responsibility; in the United States, discharges are regulated under the Clean Water Act (1972) through permits.

## Remediation of contaminated land and groundwater

Contaminated sites — former gasworks, chemical plants, petrol stations, landfills, mines, military bases — are managed under legislation such as the US Comprehensive Environmental Response, Compensation, and Liability Act (CERCLA, "Superfund", 1980) and Part 2A of the UK Environmental Protection Act 1990. Remediation decisions are risk-based: a contaminant matters if there is a source, a pathway and a receptor. The chemistry of this course determines which options work.

**Pump-and-treat** extracts contaminated groundwater and treats it at the surface (air stripping for volatiles, activated carbon, oxidation). It is limited by sorption.

::: proposition Flushing a sorbing contaminant {#prop-flushing}
Treat the contaminated zone as a well-mixed reservoir of pore volume $V_\mathrm{p} = nV$, flushed with clean water at volumetric rate $Q$, with linear, reversible, fast sorption described by the retardation factor $R_\mathrm{f}$ ([[environmental-chemistry/pollutants-fate#prop-retardation]]). The dissolved concentration then falls as
$$
\frac{C}{C_0} = \exp\!\left(-\frac{\mathrm{PV}}{R_\mathrm{f}}\right),
$$
where $\mathrm{PV} = Qt/V_\mathrm{p}$ is the number of pore volumes flushed. Reducing the concentration by a factor $F$ requires $R_\mathrm{f}\ln F$ pore volumes. Conditions: well-mixed zone, equilibrium sorption, no degradation. Real sites do worse (tailing), because of slow desorption from organic matter and diffusion out of low-permeability zones, and because of non-aqueous phase liquids that keep dissolving.
:::

::: proof Mass balance with sorption {#proof-flushing}
The total amount in the zone is $(V_\mathrm{p} + m_\mathrm{s}K_\mathrm{d})C = V_\mathrm{p}R_\mathrm{f}C$, since $R_\mathrm{f} = 1 + \rho_\mathrm{b}K_\mathrm{d}/n = 1 + m_\mathrm{s}K_\mathrm{d}/V_\mathrm{p}$. Only the dissolved part leaves, at rate $QC$. Hence $V_\mathrm{p}R_\mathrm{f}\,\mathrm{d}C/\mathrm{d}t = -QC$, so $C = C_0\exp[-Qt/(V_\mathrm{p}R_\mathrm{f})] = C_0\exp(-\mathrm{PV}/R_\mathrm{f})$. Setting $C/C_0 = 1/F$ gives $\mathrm{PV} = R_\mathrm{f}\ln F$.
:::

::: widget plot
f: exp(-x/R); exp(-x)
x: 0, 50
y: 0, 1.05
sliders: R=6.4:1:50:0.1
labels: C/C_0\ \text{(sorbing)}; C/C_0\ \text{(conservative)}
caption: Dissolved concentration in a flushed, well-mixed contaminated zone against pore volumes pumped, for a sorbing contaminant with retardation factor $R_\mathrm{f}$ (slider) and for a conservative tracer. Each factor $e$ of reduction costs $R_\mathrm{f}$ pore volumes. At $R_\mathrm{f} = 6.4$ (naphthalene in a low-carbon sand) a hundredfold reduction takes about $29$ pore volumes; for strongly sorbed compounds it takes hundreds, which is why pump-and-treat is often used to *contain* plumes rather than to clean them.
:::

**Soil vapour extraction** removes volatile compounds (benzene, trichloroethene) from the unsaturated zone by applying a vacuum, exploiting $K_\mathrm{aw}$. **Bioremediation** stimulates microbes to degrade organic contaminants: petroleum hydrocarbons degrade aerobically, so oxygen (air sparging) and nutrients are supplied; chlorinated ethenes such as tetrachloroethene (PCE) and trichloroethene (TCE) are degraded *reductively* under anaerobic conditions by dehalorespiring bacteria (for example *Dehalococcoides*), which use them as electron acceptors, so an electron donor (lactate, vegetable oil) is injected. **Monitored natural attenuation** relies on degradation, sorption and dilution already occurring, demonstrated by monitoring. **In situ chemical oxidation** injects permanganate, persulfate or hydrogen peroxide with iron (Fenton's reagent, generating hydroxyl radicals). **Permeable reactive barriers** are trenches filled with a reactive medium placed across a plume; the most common is granular **zero-valent iron**, which reduces chlorinated solvents at its corroding surface:
$$
\mathrm{Fe(s)} \rightarrow \mathrm{Fe^{2+}} + 2\,\mathrm{e^-},\qquad
\mathrm{R{-}Cl} + \mathrm{H^+} + 2\,\mathrm{e^-} \rightarrow \mathrm{R{-}H} + \mathrm{Cl^-} .
$$
Metals cannot be destroyed, so they are removed (excavation, soil washing), immobilised (adding phosphate to convert lead to the very insoluble pyromorphite, $\mathrm{Pb_5(PO_4)_3Cl}$; raising pH; adding iron oxides to bind arsenic) or extracted by plants (phytoextraction, slow and limited to a few hyperaccumulating species).

::: example Iron for a reactive barrier {#ex-zvi}
Trichloroethene, $\mathrm{C_2HCl_3}$, is reduced completely to ethene, $\mathrm{C_2H_4}$, at a zero-valent iron surface. (a) Write the overall reaction. (b) What mass of iron is consumed stoichiometrically per kilogram of TCE? (c) Why is the real consumption much higher?
::: solution
(a) Three hydrogenolysis steps, each $\mathrm{R{-}Cl + H^+ + 2\,e^- \rightarrow R{-}H + Cl^-}$, replace the three chlorines: $\mathrm{C_2HCl_3} + 3\,\mathrm{H^+} + 6\,\mathrm{e^-} \rightarrow \mathrm{C_2H_4} + 3\,\mathrm{Cl^-}$. With three $\mathrm{Fe \rightarrow Fe^{2+} + 2\,e^-}$:
$$
\mathrm{C_2HCl_3} + 3\,\mathrm{Fe} + 3\,\mathrm{H^+} \rightarrow \mathrm{C_2H_4} + 3\,\mathrm{Fe^{2+}} + 3\,\mathrm{Cl^-} .
$$
(In the barrier, the pathway is largely $\beta$-elimination through chloroacetylene and acetylene, with the same overall electron count.) (b) $3\times55.85/131.39 = 1.28\ \mathrm{kg}$ of iron per kg of TCE. (c) Iron also corrodes by reducing water, $\mathrm{Fe + 2\,H_2O \rightarrow Fe^{2+} + H_2 + 2\,OH^-}$, and dissolved oxygen, nitrate and sulfate in the groundwater; these side reactions consume far more iron than the TCE does and precipitate carbonates and hydroxides that gradually passivate the barrier. Barriers are therefore sized for decades of corrosion, not for the contaminant stoichiometry. Note the reaction also raises pH and produces hydrogen, which dehalogenating bacteria can use — chemistry and biology act together.
:::
:::

::: quiz
A site has groundwater contaminated by both benzene and tetrachloroethene (PCE). A consultant proposes injecting air to stimulate aerobic biodegradation. What is the main chemical objection?
- [ ] Benzene does not biodegrade aerobically.
- [x] PCE is degraded mainly by *reductive* dechlorination under anaerobic conditions; adding oxygen favours benzene degradation but suppresses PCE dechlorination.
- [ ] Air injection increases the $K_\mathrm{ow}$ of PCE.
- [ ] Oxygen reacts explosively with PCE.
::: solution
Highly chlorinated ethenes are electron-poor and serve as electron *acceptors*; their microbial degradation requires reducing conditions and an electron donor. Benzene is an electron donor and degrades readily with oxygen. Mixed plumes are therefore often treated in sequence or in separate zones — and in some natural plumes the benzene and other fuel compounds act as the electron donor that drives PCE dechlorination.
:::
:::

::: warning Removing a contaminant from one phase is not destroying it {#warn-transfer}
Many treatment and remediation steps transfer contaminants rather than destroy them. Air stripping moves volatiles from water to air (which then needs treatment); activated carbon and ion exchange concentrate them on a medium that must be regenerated or disposed of; coagulation puts metals into sludge; soil washing produces a concentrated fines fraction; reverse osmosis produces a concentrate. PFAS are the clearest current example: removal from drinking water is effective, but the spent carbon or resin and the concentrate contain the same practically non-degradable compounds, which require high-temperature destruction or secure containment. Always follow the mass balance to the end — ask where the contaminant goes, not only whether it has left the water.
:::

::: history
Systematic soil chemistry began with John Thomas Way's experiments for the Royal Agricultural Society in 1850, showing that soils exchange ammonium for calcium in equivalent amounts — the discovery of cation exchange — following Harry Thompson's observations of 1845. Irving Langmuir's adsorption isotherm (1916–18, for gases on solids) and Herbert Freundlich's empirical equation (1906) were soon applied to soils. Chlorination of public water supplies, introduced at Jersey City in 1908 and widely adopted thereafter, transformed public health; the discovery of trihalomethanes in chlorinated water by Johannes Rook in the Netherlands (1974) and by the US EPA the same year started the study of disinfection by-products. The activated-sludge process was developed by Edward Ardern and William Lockett in Manchester in 1914. Zero-valent iron barriers were proposed by Robert Gillham and Stephanie O'Hannesin at the University of Waterloo in the early 1990s.
:::

## Where this leads

The analytical methods that establish whether a soil or water meets a standard, and the quality control that makes the numbers defensible, are the subject of [[environmental-chemistry/environmental-monitoring]]. Designing processes that avoid creating contaminated land in the first place — safer solvents, catalysis, waste minimisation — is the agenda of [[green-chemistry/safer-solvents]] and [[green-chemistry/circular-economy]]. The surface chemistry of oxides and the electrical double layer are treated in [[electrochemistry/double-layer]], and corrosion of iron, the engine of reactive barriers, in [[electrochemistry/corrosion]].

::: summary
- Soil solids are primary minerals, clays (permanent negative charge from isomorphous substitution in 2:1 clays), variable-charge oxides (positive below their pzc, binding oxyanions) and organic matter (largest charge per mass, main sorbent for hydrophobic organics).
- CEC ($\mathrm{cmol(+)\,kg^{-1}}$) and base saturation describe a soil's exchange complex; cations are held in the order $\mathrm{Al^{3+}} > \mathrm{Ca^{2+}} > \mathrm{Mg^{2+}} > \mathrm{K^+} > \mathrm{Na^+}$, and dilution favours divalent ions (concentration–valence effect).
- Langmuir isotherms ($q = q_\text{max}K_\mathrm{L}C/(1 + K_\mathrm{L}C)$) saturate; Freundlich isotherms are empirical power laws for heterogeneous surfaces.
- Drinking-water treatment: coagulation with Al or Fe salts (consuming $0.51\ \mathrm{mg\,dm^{-3}}$ alkalinity as $\mathrm{CaCO_3}$ per mg of alum), filtration, adsorption, and disinfection, whose power depends on the HOCl fraction $1/(1 + 10^{\mathrm{pH} - 7.54})$ and on Ct.
- Chlorination forms DBPs (THMs, HAAs), controlled by removing organic precursors; microbial safety comes first.
- Wastewater treatment uses the redox ladder by design (aerobic BOD removal, nitrification, denitrification) plus chemical phosphate precipitation.
- Pump-and-treat needs $R_\mathrm{f}\ln F$ pore volumes for an $F$-fold reduction; reductive dechlorination (biological or by zero-valent iron), oxidation, vapour extraction and immobilisation are chosen by contaminant chemistry. Many treatments transfer rather than destroy contaminants.
:::

## Exercises

::: exercise Estimating CEC {level=1 check="26"}
A soil contains $20\ \%$ smectite (CEC $100\ \mathrm{cmol(+)\,kg^{-1}}$), $3.0\ \%$ organic matter (CEC $200\ \mathrm{cmol(+)\,kg^{-1}}$ at the pH of measurement), and quartz and feldspar with negligible CEC. Estimate the soil's CEC. (Enter it in $\mathrm{cmol(+)\,kg^{-1}}$.)
::: solution
$0.20\times100 + 0.030\times200 = 20 + 6 = 26\ \mathrm{cmol(+)\,kg^{-1}}$. Additivity is an approximation (organic matter coats clays and blocks some sites), but it shows why a few per cent of humus matters as much as a large clay fraction.
:::
:::

::: exercise Hypochlorous acid at pH 8 {level=1 check="26"}
What percentage of free chlorine is HOCl at pH $8.00$, taking $\mathrm{p}K_\mathrm{a} = 7.54$? (Enter the percentage, to two significant figures.)
::: solution
$100/(1 + 10^{0.46}) = 100/3.88 = 26\ \%$.
:::
:::

::: exercise Alkalinity consumed by alum {level=1 check="15"}
A treatment works doses $30\ \mathrm{mg\,dm^{-3}}$ of alum, $\mathrm{Al_2(SO_4)_3{\cdot}14H_2O}$ ($594\ \mathrm{g\,mol^{-1}}$). How much alkalinity is consumed? (Enter it in $\mathrm{mg\,dm^{-3}}$ as $\mathrm{CaCO_3}$, to two significant figures.)
::: solution
$30/594 = 0.0505\ \mathrm{mmol\,dm^{-3}}$ of alum consumes $6\times0.0505 = 0.303\ \mathrm{meq\,dm^{-3}}$, i.e. $0.303\times50.04 = 15\ \mathrm{mg\,dm^{-3}}$ as $\mathrm{CaCO_3}$. A water with only $20\ \mathrm{mg\,dm^{-3}}$ of alkalinity would be left nearly unbuffered and need alkali addition.
:::
:::

::: exercise Activated carbon for a batch treatment {level=2 check="4.8"}
A pesticide sorbs on activated carbon with a Langmuir isotherm, $q_\text{max} = 10\ \mathrm{mg\,g^{-1}}$ and $K_\mathrm{L} = 0.50\ \mathrm{dm^3\,mg^{-1}}$. How much carbon must be stirred into $1.00\ \mathrm{m^3}$ of water to reduce the concentration from $10.0$ to $0.50\ \mathrm{mg\,dm^{-3}}$ at equilibrium? (Enter the mass in kg, to two significant figures.)
::: solution
At the final concentration, $q = 10\times0.50\times0.50/(1 + 0.25) = 2.0\ \mathrm{mg\,g^{-1}}$. The pesticide removed is $(10.0 - 0.50)\ \mathrm{mg\,dm^{-3}}\times1000\ \mathrm{dm^3} = 9500\ \mathrm{mg}$, so the carbon needed is $9500/2.0 = 4750\ \mathrm{g} \approx 4.8\ \mathrm{kg}$. The carbon is in equilibrium with the *final*, low concentration, where its loading is only a fifth of capacity; a fixed-bed column, whose inlet carbon equilibrates with the *influent* concentration, uses carbon far more efficiently.
:::
:::

::: exercise Lime requirement {level=2 check="4.5"}
A pasture soil ($0$–$25\ \mathrm{cm}$, bulk density $1.20\ \mathrm{g\,cm^{-3}}$) has $3.0\ \mathrm{cmol(+)\,kg^{-1}}$ of exchangeable acidity. How much $\mathrm{CaCO_3}$ is needed per hectare to neutralise it? (Enter the mass in tonnes, to two significant figures.)
::: solution
Soil mass: $10^{4}\times0.25\times1200 = 3.0\times10^{6}\ \mathrm{kg}$; acidity $3.0\times10^{6}\times0.030 = 9.0\times10^{4}\ \mathrm{mol(+)}$; $\mathrm{CaCO_3} = 4.5\times10^{4}\ \mathrm{mol} = 4.5\times10^{6}\ \mathrm{g} = 4.5\ \mathrm{t\,ha^{-1}}$.
:::
:::

::: exercise Contact time for disinfection {level=2 check="2.0"}
For a certain virus and free chlorine at pH $7$ and $10\ \mathrm{°C}$, the Chick–Watson law holds with $n = 1$ and $k = 4.6\ \mathrm{dm^3\,mg^{-1}\,min^{-1}}$ (base $e$). What contact time at $0.50\ \mathrm{mg\,dm^{-3}}$ gives a $2$-log ($99\ \%$) inactivation? (Enter $t$ in minutes, to two significant figures.)
::: solution
$\ln(N_0/N) = \ln100 = 4.61 = kCt$, so $Ct = 4.61/4.6 = 1.0\ \mathrm{mg\,min\,dm^{-3}}$ and $t = 1.0/0.50 = 2.0\ \mathrm{min}$. A $4$-log inactivation would need twice the Ct. Real treatment plants apply safety factors and verify the residual chlorine continuously.
:::
:::

::: exercise Pore volumes for pump-and-treat {level=3 check="29"}
(a) Derive [[#prop-flushing]] from a mass balance. (b) For naphthalene with $R_\mathrm{f} = 6.4$, how many pore volumes must be pumped to reduce the dissolved concentration a hundredfold? (c) If tailing due to slow desorption means only half the sorbed mass is in fast equilibrium and the rest is released with a first-order rate constant of $0.010\ \mathrm{d^{-1}}$, explain qualitatively how the concentration–time curve changes. (Enter the number of pore volumes from (b), to two significant figures.)
::: solution
(a) As in [[#proof-flushing]]: total mass $V_\mathrm{p}R_\mathrm{f}C$, outflow $QC$, so $C = C_0e^{-\mathrm{PV}/R_\mathrm{f}}$. (b) $\mathrm{PV} = R_\mathrm{f}\ln100 = 6.4\times4.605 = 29$. (c) The fast fraction is flushed on the timescale of $R_\mathrm{f}$ pore volumes (with a smaller effective $R_\mathrm{f}$), giving an initial rapid decline; then the concentration levels off at a "tail" sustained by slow desorption, decaying only with the desorption time constant ($1/0.010 = 100\ \mathrm{d}$) regardless of how fast one pumps. When pumping stops, concentrations "rebound" as the slow fraction re-equilibrates. Both behaviours are routinely observed and are why remediation targets are often set as risk-based concentrations rather than background.
:::
:::

::: exercise Sodicity of an irrigated soil {level=3 check="0.87"}
For the exchanger of [[#ex-exchange]] ($K_\mathrm{GT} = 0.10\ \mathrm{mol\,dm^{-3}}$), find $E_\mathrm{Ca}$ when the soil solution contains $1.0\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{Na^+}$ and $0.50\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{Ca^{2+}}$. Then explain, using [[#prop-exchange]], why evaporative concentration of the same water by a factor of $10$ increases the sodium on the exchanger, and why that harms soil structure. (Enter $E_\mathrm{Ca}$, to two significant figures.)
::: solution
$[\mathrm{Ca^{2+}}]/[\mathrm{Na^+}]^2 = 5.0\times10^{-4}/(1.0\times10^{-3})^2 = 500$, so $E_\mathrm{Ca}/(1 - E_\mathrm{Ca})^2 = 50$; solving $50E^2 - 101E + 50 = 0$ gives $E_\mathrm{Ca} = (101 - \sqrt{201})/100 = 0.87$. This is the diluted solution of the example. Concentrating it tenfold takes it to the original solution, where $E_\mathrm{Ca} = 0.64$ and $E_\mathrm{Na} = 0.36$: the exchangeable sodium percentage has risen from $13\ \%$ to $36\ \%$ with no change in the Na/Ca ratio of the water. Above roughly $15\ \%$ exchangeable sodium, clays swell and disperse in low-salinity water, because the monovalent ions form a thick diffuse double layer that keeps particles apart; aggregates collapse, pores clog and infiltration falls. Gypsum ($\mathrm{CaSO_4{\cdot}2H_2O}$) is applied to reverse this, supplying calcium to exchange for sodium.
:::
:::
