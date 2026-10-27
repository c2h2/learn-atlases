Ibuprofen, one of the most widely used analgesics, was first manufactured by the Boots company in the 1960s by a six-step route. In the 1980s the BHC Company (a joint venture of Boots and Hoechst Celanese) developed a three-step route, commercialised in 1992 at Bishop, Texas, which won a US Presidential Green Chemistry Challenge Award in 1997. Both routes make the same molecule from the same starting hydrocarbon. Which is "greener", and by how much? Saying that the second is shorter, catalytic and produces less waste is a qualitative judgement; to compare it with a third route, or to decide whether a change of solvent matters more than a change of reagent, we need numbers.

This chapter defines the standard **green metrics**. The simplest, **atom economy**, needs only a balanced equation and tells us the best a reaction could possibly do. The **E-factor** and **process mass intensity** measure what a real process actually does, including yields, excess reagents, solvents and work-up. **Reaction mass efficiency** links the two. None of these mass-based metrics distinguishes between a kilogram of water and a kilogram of a carcinogen, and none counts energy, so the chapter ends with **life-cycle assessment**, which does. The metrics are tools for comparison and improvement, not absolute scores: each answers a specific question and can mislead if asked a different one.

The concept of atom economy has already been used in organic synthesis to compare reactions — the Diels–Alder reaction at $100\,\%$, the Wittig reaction at about $27\,\%$ ([[organic-synthesis/carbon-carbon-bonds]]) — and to choose between disconnections in [[organic-synthesis/retrosynthesis]]. Here we treat it systematically, together with the metrics used in industry. The stoichiometry behind all of them is that of [[general-chemistry-1/stoichiometry]].

## Atom economy

::: definition Atom economy {#def-ae}
For a reaction written as a balanced equation $\sum_i \nu_i\,\mathrm{R}_i \rightarrow \nu_\mathrm{P}\,\mathrm{P} + \text{by-products}$, the **atom economy** (Trost, 1991) is the fraction of the mass of all reactants that ends up in the desired product $\mathrm{P}$:
$$
\mathrm{AE} = \frac{\nu_\mathrm{P}\,M_\mathrm{P}}{\sum_i \nu_i\,M_i}\times100\,\%,
$$ {#eq-ae}
where the sum runs over all reactants in the stoichiometric equation (but not catalysts, solvents or reagents used only in work-up). For a multistep synthesis the overall atom economy is computed from the overall equation obtained by adding the steps and cancelling intermediates.
:::

Atom economy is a property of the *equation*, not of the experiment: it assumes $100\,\%$ yield, exact stoichiometric quantities and no auxiliary materials. Its value is that it can be calculated at the planning stage, before anything is done in the laboratory, and that it exposes reaction types that are intrinsically wasteful. Additions, rearrangements and cycloadditions have $\mathrm{AE} = 100\,\%$; substitutions and eliminations necessarily produce a by-product; reactions using stoichiometric reagents with large molar masses — phosphorus ylides, many oxidants and reducing agents, protecting groups, coupling reagents for amide bonds — have low atom economies. It is also a reminder that **yield is not efficiency**: a Wittig reaction in $95\,\%$ yield still discards about three-quarters of the reactant mass as triphenylphosphine oxide.

::: example Two routes to ibuprofen {#ex-ibuprofen}
Ibuprofen, 2-[4-(2-methylpropyl)phenyl]propanoic acid ($\mathrm{C_{13}H_{18}O_2}$, $206.28\ \mathrm{g\,mol^{-1}}$), is made from 2-methylpropylbenzene (isobutylbenzene, $\mathrm{C_{10}H_{14}}$, $134.22$). The **BHC route** has three steps: Friedel–Crafts acetylation with acetic anhydride ($102.09$), catalysed by anhydrous hydrogen fluoride, which also serves as solvent and is recovered and reused; catalytic hydrogenation of the ketone to the alcohol over Raney nickel ($\mathrm{H_2}$, $2.016$); and palladium-catalysed carbonylation of the alcohol with carbon monoxide ($28.01$). The **Boots route** has six steps, using in total isobutylbenzene, acetic anhydride, ethyl chloroacetate ($122.55$), sodium ethoxide ($68.05$), aqueous acid (counted as $\mathrm{H_3O^+}$, $19.02$), hydroxylamine ($33.03$) and two waters ($36.03$). Find the atom economy of each route, and of the BHC route if the acetic acid by-product is recovered and sold.
::: solution
**BHC.** Adding the three steps, the overall equation is
$$
\mathrm{C_{10}H_{14}} + (\mathrm{CH_3CO})_2\mathrm{O} + \mathrm{H_2} + \mathrm{CO} \rightarrow \mathrm{C_{13}H_{18}O_2} + \mathrm{CH_3COOH}.
$$
Check: C $10 + 4 + 1 = 15 = 13 + 2$; H $14 + 6 + 2 = 22 = 18 + 4$; O $3 + 1 = 4 = 2 + 2$. Reactant mass $134.22 + 102.09 + 2.016 + 28.01 = 266.34\ \mathrm{g}$, so
$$
\mathrm{AE_{BHC}} = \frac{206.28}{266.34} = 77.5\,\%.
$$
The only by-product is acetic acid ($60.05$), and $206.28 + 60.05 = 266.33$, confirming the balance. If acetic acid is recovered as a co-product, all of the reactant mass is sold: the atom economy *to useful products* is $100\,\%$ (to rounding).

**Boots.** The reactant masses sum to $134.22 + 102.09 + 122.55 + 68.05 + 19.02 + 33.03 + 36.03 = 514.99\ \mathrm{g}$ per mole of ibuprofen, so
$$
\mathrm{AE_{Boots}} = \frac{206.28}{514.99} = 40.1\,\%.
$$
Per kilogram of ibuprofen the minimum waste is $(514.99 - 206.28)/206.28 = 1.50\ \mathrm{kg}$ for Boots and $(266.34 - 206.28)/206.28 = 0.291\ \mathrm{kg}$ for BHC, a fivefold difference before any yields, excesses or solvents are considered. The BHC route also replaces stoichiometric aluminium trichloride in the acylation (the Boots route produced hydrated aluminium salts as waste) by recyclable HF, and uses catalysts in all three steps. HF is acutely toxic and corrosive, so the improvement in mass efficiency comes with a demanding containment requirement — a reminder that atom economy says nothing about hazard.
:::
:::

## The E-factor

In 1992 Roger Sheldon, then at the Dutch fine-chemicals company DSM-Andeno, proposed measuring the actual waste of a process rather than the theoretical waste of an equation. His **E-factor** became the most widely quoted green metric, partly because its definition is so simple.

::: definition E-factor {#def-efactor}
The **environmental factor** of a process is
$$
E = \frac{\text{total mass of waste}}{\text{mass of product}},
$$ {#eq-efactor}
where *waste* is everything that leaves the process other than the desired product: by-products, unreacted starting materials, spent reagents, solvent losses, process aids, and — depending on the convention — water. Two conventions are in use (Roschangar, Sheldon and Senanayake, 2015): the **simple E-factor** (sEF) counts only reactants, reagents and by-products, excluding solvents and water; the **complete E-factor** (cEF) counts all materials including solvents and water with no credit for recycling. Real processes lie between the two, depending on how much solvent is recovered. An ideal process has $E = 0$.
:::

Sheldon's survey of industry sectors, from his 1992 paper and later updates, gave orders of magnitude that are still quoted and remain broadly representative:

| sector | annual production per product | E-factor (kg waste per kg product) |
|---|---|---|
| oil refining | $10^6$–$10^8\ \mathrm{t}$ | $< 0.1$ |
| bulk chemicals | $10^4$–$10^6\ \mathrm{t}$ | $< 1$ to $5$ |
| fine chemicals | $10^2$–$10^4\ \mathrm{t}$ | $5$ to $> 50$ |
| pharmaceuticals | $10$–$10^3\ \mathrm{t}$ | $25$ to $> 100$ |

The pattern is the opposite of what one might expect: the sectors producing the smallest tonnages produce the most waste per kilogram. Bulk chemicals are made by few steps, often catalytic, in continuous plants optimised over decades, where every kilogram of by-product is a cost multiplied by millions of tonnes. Fine chemicals and pharmaceuticals are complex molecules made by many steps, often with stoichiometric reagents and large volumes of solvent, in multipurpose batch plants where product value is high and development time short. In absolute terms, though, the bulk sector produces far more waste: an E-factor of $1$ on $10^6\ \mathrm{t}$ is a million tonnes, while $100$ on $100\ \mathrm{t}$ is ten thousand. Both perspectives matter.

Sheldon also proposed the **environmental quotient** $EQ = E\times Q$, where $Q$ is an "unfriendliness" weighting of the waste (for example $1$ for sodium chloride, higher for heavy-metal salts). It captures the obvious fact that waste differs in hazard, but $Q$ has no agreed scale, and in practice hazard is handled by the life-cycle and solvent-selection methods discussed below and in [[green-chemistry/safer-solvents]].

## Process mass intensity

The pharmaceutical industry, through the American Chemical Society Green Chemistry Institute Pharmaceutical Roundtable, adopted a closely related metric in the late 2000s, preferring to count what goes *in* rather than what comes out.

::: definition Process mass intensity {#def-pmi}
The **process mass intensity** is
$$
\mathrm{PMI} = \frac{\text{total mass of materials used}}{\text{mass of product}},
$$ {#eq-pmi}
where *materials used* includes reactants, reagents, catalysts, solvents (reaction and work-up), and process water. Its ideal value is $1$. It is usually reported per kilogram of isolated product of stated purity, and can be broken down into contributions from reactants, solvents and water.
:::

::: proposition Relation between PMI and E-factor {#prop-pmi-e}
If the E-factor and the PMI of a process are computed on the same basis — the same materials included, the same treatment of recycled streams — then
$$
\mathrm{PMI} = E + 1 .
$$ {#eq-pmi-e}
:::

::: proof
Conservation of mass over the process boundary: everything that goes in comes out, either as product or as something else. (Mass can accumulate inside the process, but over a complete batch or at steady state it does not.) So
$$
m_\text{in} = m_\text{product} + m_\text{waste}.
$$
Dividing by $m_\text{product}$ gives $m_\text{in}/m_\text{product} = 1 + m_\text{waste}/m_\text{product}$, i.e. $\mathrm{PMI} = 1 + E$. The condition matters: if a solvent is recovered and reused, it is not waste, and its mass must also be excluded from "materials used" except for the make-up that replaces losses; if water is excluded from one metric it must be excluded from the other. Gases such as air in an oxidation and outputs such as $\mathrm{CO_2}$ from combustion must also be treated consistently. With a consistent basis the two metrics carry the same information; PMI is favoured in industry because inputs are easier to measure (they are bought) and focus attention on purchasing and resource use, while E focuses on what must be disposed of.
:::

::: example E-factor and PMI from a batch record {#ex-batch}
A batch produces $52.0\ \mathrm{kg}$ of an intermediate from $50.0\ \mathrm{kg}$ of substrate and $35.0\ \mathrm{kg}$ of reagents, using $400\ \mathrm{kg}$ of solvent and $250\ \mathrm{kg}$ of water in the reaction and work-up. Find (a) the simple E-factor, (b) the complete E-factor and PMI with no recycling, and (c) the E-factor and PMI if $90\,\%$ of the solvent is recovered and reused.
::: solution
(a) Excluding solvent and water, the materials are $50.0 + 35.0 = 85.0\ \mathrm{kg}$, of which $52.0\ \mathrm{kg}$ is product, so
$$
\mathrm{sEF} = \frac{85.0 - 52.0}{52.0} = 0.635 .
$$
(b) Total input $50.0 + 35.0 + 400 + 250 = 735\ \mathrm{kg}$:
$$
\mathrm{cEF} = \frac{735 - 52.0}{52.0} = 13.1, \qquad \mathrm{PMI} = \frac{735}{52.0} = 14.1 .
$$
(c) Only the $40\ \mathrm{kg}$ of solvent lost counts as an input: total $50.0 + 35.0 + 40 + 250 = 375\ \mathrm{kg}$, $E = 323/52.0 = 6.21$, $\mathrm{PMI} = 7.21$. Excluding water as well, $E = (85.0 + 40 - 52.0)/52.0 = 1.40$.

Four defensible numbers — $0.635$, $1.40$, $6.21$, $13.1$ — describe one batch. Solvent and water account for almost $90\,\%$ of the input mass, which is typical: in pharmaceutical processes solvents make up roughly half to four-fifths of the mass used, and water much of the rest. A metric is meaningful only with its basis stated, and comparisons are valid only on the same basis. The step's chemistry (sEF) is efficient; its solvent use is not, and recovery halves the PMI.
:::
:::

::: widget plot
f: S/(A*x) - 1; S/(A*x) - 1 + s
x: 0.2, 1
y: 0, 30
sliders: A=0.6:0.2:1:0.01; S=1.5:1:4:0.1; s=10:0:50:1
labels: E\ \text{(reactants only)}; E\ \text{(with solvent loss } s\text{)}
caption: E-factor against yield $\varepsilon$ ($x$) for a step with atom economy $A$, stoichiometric factor $S$ (total reactant mass used divided by the stoichiometric mass) and solvent loss $s$ kilograms per kilogram of product. The reactant-only curve is $S/(A\varepsilon) - 1$, from [[#prop-rme]] and [[#prop-pmi-e]]. Notice how the two terms compare: improving the yield from $0.7$ to $0.9$ at $A = 0.6$, $S = 1.5$ lowers $E$ by about $0.8$, while recovering half of $10\ \mathrm{kg}$ of solvent lowers it by $5$. For many fine-chemical steps the solvent term dominates.
:::

## Reaction mass efficiency

Atom economy ignores yield and excess reagents; the E-factor lumps everything together. **Reaction mass efficiency**, introduced by Curzons, Constable and co-workers at GlaxoSmithKline in 2001, sits between them and can be factorised in an informative way.

::: definition Reaction mass efficiency and stoichiometric factor {#def-rme}
The **reaction mass efficiency** of a step is the mass of isolated product divided by the total mass of reactants actually used (including excesses, but excluding solvents, catalysts and work-up materials):
$$
\mathrm{RME} = \frac{m_\mathrm{P}}{\sum_i m_i}.
$$
The **stoichiometric factor** is the ratio of the mass of reactants actually used to the mass required by the balanced equation for the amount of limiting reactant charged:
$$
\mathrm{SF} = \frac{\sum_i m_i}{n_\mathrm{lim}\sum_i (\nu_i/\nu_\mathrm{lim})M_i} \ \geq 1 ,
$$
equal to $1$ when all reactants are used in exactly stoichiometric amounts.
:::

::: proposition Factorisation of reaction mass efficiency {#prop-rme}
For a single step with atom economy $\mathrm{AE}$ (as a fraction), fractional yield $\varepsilon$ (based on the limiting reactant) and stoichiometric factor $\mathrm{SF}$,
$$
\mathrm{RME} = \mathrm{AE}\times\varepsilon\times\frac{1}{\mathrm{SF}} .
$$ {#eq-rme}
Consequently, counting only reactants and product, $E = 1/\mathrm{RME} - 1 = \mathrm{SF}/(\mathrm{AE}\,\varepsilon) - 1$.
:::

::: proof
Let $n_\mathrm{lim}$ moles of the limiting reactant (stoichiometric coefficient $\nu_\mathrm{lim}$) be charged. The equation then requires $n_\mathrm{lim}\nu_i/\nu_\mathrm{lim}$ moles of each reactant $i$, of total mass $m_\mathrm{stoich} = n_\mathrm{lim}\sum_i(\nu_i/\nu_\mathrm{lim})M_i$, and would give at $100\,\%$ yield $n_\mathrm{lim}\nu_\mathrm{P}/\nu_\mathrm{lim}$ moles of product, of mass $m_\mathrm{P,max}$. By the definition of atom economy, $m_\mathrm{P,max} = \mathrm{AE}\cdot m_\mathrm{stoich}$ (the ratio of product mass to reactant mass in the balanced equation is independent of scale). The actual product mass is $m_\mathrm{P} = \varepsilon\,m_\mathrm{P,max}$, and the actual reactant mass is $\sum_i m_i = \mathrm{SF}\cdot m_\mathrm{stoich}$ by definition of SF. Therefore
$$
\mathrm{RME} = \frac{\varepsilon\,\mathrm{AE}\,m_\mathrm{stoich}}{\mathrm{SF}\,m_\mathrm{stoich}} = \frac{\mathrm{AE}\,\varepsilon}{\mathrm{SF}} .
$$
The E-factor on the same basis follows from [[#prop-pmi-e]] with $\mathrm{PMI} = 1/\mathrm{RME}$. The factorisation shows where a poor RME comes from: the chemistry (AE), the execution (yield) or the recipe (excess reagents).
:::

::: example An esterification with excess alcohol {#ex-ester}
Methyl benzoate ($136.15\ \mathrm{g\,mol^{-1}}$) is made from benzoic acid ($122.12$) and methanol ($32.04$) with an acid catalyst; methanol is used in fivefold molar excess to drive the equilibrium, and the isolated yield is $90\,\%$. Find AE, SF and RME, and check the result directly.
::: solution
The equation is $\mathrm{C_6H_5COOH + CH_3OH \rightleftharpoons C_6H_5COOCH_3 + H_2O}$, so
$$
\mathrm{AE} = \frac{136.15}{122.12 + 32.04} = \frac{136.15}{154.16} = 0.883 .
$$
Per mole of benzoic acid, the reactants used have mass $122.12 + 5\times32.04 = 282.32\ \mathrm{g}$ against $154.16\ \mathrm{g}$ required: $\mathrm{SF} = 1.831$. Then
$$
\mathrm{RME} = \frac{0.883\times0.90}{1.831} = 0.434 .
$$
Directly: product $0.90\times136.15 = 122.5\ \mathrm{g}$ from $282.3\ \mathrm{g}$ of reactants, $\mathrm{RME} = 0.434$. The excess methanol halves the RME, although an equilibrium-limited reaction needs some excess (or water removal) to reach high conversion ([[thermodynamics/reaction-equilibrium]]). Since methanol is easily recovered by distillation, the excess is better judged on a basis that credits recovery — another example of why the basis of a metric must be stated.
:::
:::

::: warning A high atom economy does not make a process green {#warn-ae}
Atom economy is a ceiling, not a score. A reaction with $\mathrm{AE} = 100\,\%$ run in $40\,\%$ yield, with tenfold excess of one reactant and fifty litres of chlorinated solvent per kilogram of product, is a poor process; a substitution with $\mathrm{AE} = 70\,\%$ whose only by-product is water or sodium chloride may be excellent. Conversely, a low atom economy is not always bad: the hydrogenation of nitrobenzene to aniline has $\mathrm{AE} = 72\,\%$ because water is the by-product. No mass metric distinguishes water from a heavy-metal salt, includes energy, or accounts for the hazards of reagents. The right use of atom economy is at the design stage, to flag intrinsically wasteful reaction types; actual processes are judged on PMI or E-factor, and on life-cycle impacts.
:::

## Metrics for multistep routes

A pharmaceutical route may have ten or more steps, and each step's PMI is computed per kilogram of *its own* product. To find the PMI of the whole route we must scale each step by the amount of its product that the following steps consume.

::: proposition PMI of a linear route {#prop-route-pmi}
Consider a linear route of $n$ steps in which step $i$ makes intermediate $\mathrm{I}_i$ (the final product being $\mathrm{I}_n$), with process mass intensity $\mathrm{PMI}_i$ per kilogram of $\mathrm{I}_i$, and let $m_i$ be the mass of $\mathrm{I}_i$ needed per kilogram of final product ($m_n = 1$, and $m_{i-1} = m_i r_i$ where $r_i$ is the mass of $\mathrm{I}_{i-1}$ consumed per kilogram of $\mathrm{I}_i$). If each intermediate is made in-house and fed entirely to the next step, the route's PMI (purchased materials per kilogram of final product) is
$$
\mathrm{PMI}_\text{route} = \sum_{i=1}^{n} m_i\,\mathrm{PMI}_i \;-\; \sum_{i=1}^{n-1} m_i .
$$ {#eq-route-pmi}
If every step has the same $\mathrm{PMI}_i = p$ and the same $r_i = r \neq 1$, this sums to $\mathrm{PMI}_\text{route} = p\,(r^n - 1)/(r - 1) - (r^n - r)/(r - 1)$.
:::

::: proof
The total input to step $i$, per kilogram of final product, is $m_i\,\mathrm{PMI}_i$ kilograms. For $i \geq 2$ this includes the $m_{i-1}$ kilograms of intermediate $\mathrm{I}_{i-1}$ made in step $i-1$, which is not a purchased material. Summing the inputs of all steps counts every purchased material once, plus each intermediate $\mathrm{I}_1,\dots,\mathrm{I}_{n-1}$ once as an input to the step that consumes it; subtracting $\sum_{i<n}m_i$ removes the intermediates. For the uniform case, $m_i = r^{n-i}$, so $\sum_{i=1}^{n} m_i = \sum_{k=0}^{n-1}r^k = (r^n-1)/(r-1)$ and $\sum_{i=1}^{n-1}m_i = \sum_{k=1}^{n-1}r^k = (r^n - r)/(r-1)$, geometric series. For a convergent route the same bookkeeping applies to each branch, with $m_i$ the mass of each branch intermediate needed per kilogram of final product.
:::

::: widget plot
f: p*(r^x - 1)/(r - 1) - (r^x - r)/(r - 1)
x: 1, 12
y: 0, 2000
sliders: p=30:5:100:1; r=1.4:1.05:2:0.05
labels: \mathrm{PMI}_\text{route}
caption: Route PMI from [[#eq-route-pmi]] against the number of steps $n$ ($x$) when every step has PMI $p$ and needs $r$ kilograms of the previous intermediate per kilogram of its product ($r$ combines the yield and the change in molar mass). The growth is geometric: with $p = 30$ and $r = 1.4$, ten steps give a route PMI over $2000$, and the first steps contribute most, because their products are needed in the largest amounts. This is why process chemists concentrate on early, high-volume steps and on convergent routes, and why the route PMIs of small-molecule drugs are typically in the hundreds and those of peptides made by solid-phase synthesis of the order of $10^4$.
:::

::: example A three-step route {#ex-route}
A drug substance $\mathrm{D}$ is made in three steps, $\mathrm{A \rightarrow B \rightarrow C \rightarrow D}$. Step 3 needs $1.30\ \mathrm{kg}$ of $\mathrm{C}$ per kg of $\mathrm{D}$ and has $\mathrm{PMI_3} = 50$; step 2 needs $1.40\ \mathrm{kg}$ of $\mathrm{B}$ per kg of $\mathrm{C}$ and has $\mathrm{PMI_2} = 30$; step 1 has $\mathrm{PMI_1} = 20$ per kg of $\mathrm{B}$. Find the route PMI and E-factor, and the fraction of the total contributed by each step.
::: solution
Masses needed per kilogram of D: $m_3 = 1$, $m_2 = 1.30\ \mathrm{kg}$ of C, $m_1 = 1.30\times1.40 = 1.82\ \mathrm{kg}$ of B. By [[#eq-route-pmi]],
$$
\mathrm{PMI}_\text{route} = (1\times50 + 1.30\times30 + 1.82\times20) - (1.30 + 1.82) = 125.4 - 3.12 = 122.3 ,
$$
and $E = 121.3$ (on the same basis). The purchased inputs attributable to each step are $50 - 1.30 = 48.7$ (step 3), $39.0 - 1.82 = 37.2$ (step 2) and $36.4$ (step 1): $40\,\%$, $30\,\%$ and $30\,\%$. Although step 1 has the lowest PMI per kilogram of its own product, it contributes as much as step 2 because its product is needed in the largest amount. Improving the yield of step 3 (reducing $r_3$) would lower the contribution of *every* earlier step.
:::
:::

Other metrics are used for particular purposes. **Carbon efficiency** is the percentage of carbon in the reactants that ends up in the product, useful when feedstock carbon or $\mathrm{CO_2}$ formation is the concern. **Effective mass yield** (Hudlicky, 1999) is the mass of product divided by the mass of *non-benign* reagents, an attempt to weight hazard. The **CHEM21 metrics toolkit** (McElroy and co-workers, 2015) combines mass metrics with flags for solvent, reagent and process hazards, energy use and work-up, at successive stages of development. None replaces judgement, but together they make the trade-offs explicit.

## Life-cycle assessment

Mass metrics count kilograms within a process boundary. They ignore the energy used for heating, cooling, stirring and separation; the impacts of making the reagents and solvents before they arrive; and what happens to the product and wastes afterwards. Life-cycle assessment (LCA), introduced in [[green-chemistry/green-principles#def-lifecycle]], addresses all three.

::: algorithm Life-cycle assessment (ISO 14040/14044) {#alg-lca}
1. **Goal and scope.** State the question, the intended audience, the **functional unit** (the service compared, e.g. "1 kg of ibuprofen of pharmacopoeial purity") and the **system boundary** (cradle-to-gate, cradle-to-grave …), and decide how co-products are handled.
2. **Life-cycle inventory (LCI).** Quantify all inputs from nature (ores, crude oil, water, land) and outputs to nature (emissions to air, water and soil, wastes) for every process inside the boundary, per functional unit, using plant data where available and database values (such as ecoinvent) for background processes such as electricity and commodity chemicals.
3. **Life-cycle impact assessment (LCIA).** Assign each inventory flow to impact categories and multiply by **characterisation factors** — for climate change, global warming potentials (in the IPCC Sixth Assessment Report, $\mathrm{GWP_{100}} = 1$ for $\mathrm{CO_2}$, $29.8$ for fossil methane and $273$ for $\mathrm{N_2O}$) — and sum to category indicators (kg $\mathrm{CO_2e}$, kg $\mathrm{SO_2e}$, …). Optional normalisation and weighting combine categories into a single score, with value judgements that must be stated.
4. **Interpretation.** Identify the hot spots, test the sensitivity of the conclusions to data and methodological choices (allocation, boundary), and state the limitations.
:::

The most debated choice in step 1 is **allocation**: when a process yields more than one useful product, how should its burdens be divided? The chlor-alkali process makes chlorine, sodium hydroxide and hydrogen in fixed proportions ([[electrochemistry/fuel-cells-electrolysis]]); a steam cracker makes ethylene, propylene and a dozen other products ([[green-chemistry/petrochemicals]]). ISO 14044 recommends avoiding allocation where possible — by subdividing the process or by **system expansion** (crediting the co-product with the burden of the product it displaces) — and otherwise allocating by a physical relationship such as mass, or by economic value. The choice can change results substantially, so sensitivity analysis is part of the standard.

::: example Allocating the electricity of a chlor-alkali cell {#ex-allocation}
A membrane cell uses $2.27\ \mathrm{MWh}$ of electricity per tonne of $\mathrm{Cl_2}$ (the value computed in [[electrochemistry/fuel-cells-electrolysis]] for $3.0\ \mathrm{V}$), from a grid emitting $0.40\ \mathrm{t\,CO_2}$ per MWh. The co-products follow $2\,\mathrm{NaCl} + 2\,\mathrm{H_2O} \rightarrow \mathrm{Cl_2} + \mathrm{H_2} + 2\,\mathrm{NaOH}$. Allocate the emissions to chlorine by mass, and by economic value with illustrative prices of $250$, $400$ and $1500$ currency units per tonne of $\mathrm{Cl_2}$, NaOH and $\mathrm{H_2}$.
::: solution
Emissions per tonne of $\mathrm{Cl_2}$ produced: $2.27\times0.40 = 0.908\ \mathrm{t\,CO_2}$, shared among the co-products. Per tonne of $\mathrm{Cl_2}$ there are $2\times40.00/70.90 = 1.128\ \mathrm{t}$ of NaOH and $2.016/70.90 = 0.0284\ \mathrm{t}$ of $\mathrm{H_2}$.

**Mass allocation:** chlorine's share is $1/(1 + 1.128 + 0.0284) = 0.464$, giving $0.421\ \mathrm{t\,CO_2}$ per tonne of $\mathrm{Cl_2}$.

**Economic allocation:** values $250$, $1.128\times400 = 451$ and $0.0284\times1500 = 43$; chlorine's share is $250/744 = 0.336$, giving $0.305\ \mathrm{t\,CO_2}$ per tonne.

The two methods differ by $38\,\%$, and the economic result moves with market prices, which for chlorine and caustic soda fluctuate in opposite directions because they are made in fixed ratio but sold into different markets. An LCA of a chlorinated product should report which method was used and how sensitive its conclusion is to the choice.
:::
:::

::: quiz
Process X has a PMI of $40$ and uses only water, ethanol and sodium chloride as auxiliaries. Process Y makes the same product with a PMI of $25$, using dichloromethane and a stoichiometric tin reagent. Which statement is justified?
- [ ] Y is greener, because its PMI is lower
- [ ] X is greener, because its auxiliaries are benign
- [x] The PMI alone cannot decide; hazard, energy and upstream impacts must be assessed, for example by solvent and reagent selection guides and an LCA
- [ ] The two are equivalent, because PMI and E-factor differ by exactly one
::: solution
PMI counts mass without weighting it. Y produces less material per kilogram, but its waste includes a suspected carcinogenic solvent and an organotin residue, both hazardous and costly to treat; X uses more material, much of it water. Neither conclusion follows from PMI alone. $\mathrm{PMI} = E + 1$ is true for each process but says nothing about comparing two.
:::
:::

::: history Counting atoms and kilograms {#hist-metrics}
Barry Trost introduced **atom economy** in a 1991 *Science* paper, "The atom economy — a search for synthetic efficiency", as a criterion for evaluating synthetic methods alongside selectivity. Roger Sheldon's **E-factor** appeared in "Organic synthesis — past, present and future" in *Chemistry & Industry* in 1992, drawing on his experience in fine-chemical manufacture; in 2007 and again in 2017 he reviewed how the metric had been used and extended. At GlaxoSmithKline, Alan Curzons, David Constable and co-workers published **reaction mass efficiency** and related metrics in 2001–2002. The ACS Green Chemistry Institute Pharmaceutical Roundtable, founded in 2005, adopted **process mass intensity** as its benchmark and began publishing industry comparisons. Life-cycle assessment developed from energy analyses of packaging in the late 1960s and 1970s; the ISO 14040 series was first issued in 1997 and revised as ISO 14040 and ISO 14044 in 2006. Frank Roschangar, Sheldon and Chris Senanayake distinguished simple and complete E-factors in 2015.
:::

## Where this leads

The metrics of this chapter are the vocabulary of the rest of the course. [[green-chemistry/chemical-industry]] explains why the E-factors of bulk and fine chemicals differ so much; [[green-chemistry/industrial-inorganic]] and [[green-chemistry/petrochemicals]] apply atom economy and energy balances to the largest processes; [[green-chemistry/safer-solvents]] attacks the solvent term, usually the largest in PMI; and [[green-chemistry/renewable-feedstocks]] and [[green-chemistry/carbon-hydrogen]] show why LCA, rather than mass, is needed to compare feedstocks and energy carriers. The statistics of uncertain inventory data, which make LCA results ranges rather than points, use the methods of [[analytical-chemistry/statistics-calibration]].

::: summary
- Atom economy, $\nu_\mathrm{P}M_\mathrm{P}/\sum\nu_iM_i$, is the theoretical ceiling set by the balanced equation: $77.5\,\%$ for the BHC ibuprofen route against $40.1\,\%$ for the Boots route.
- The E-factor (kg waste per kg product) and process mass intensity (kg input per kg product) measure real processes; on the same basis $\mathrm{PMI} = E + 1$. Always state whether solvents, water and recycling are included (simple vs complete E-factor).
- E-factors rise from below $0.1$ in refining to $25$–$100$ and more in pharmaceuticals, while absolute waste is largest in the bulk sector.
- Reaction mass efficiency factorises as $\mathrm{AE}\times\varepsilon/\mathrm{SF}$, separating chemistry, execution and excess reagents.
- Route PMI is a sum over steps weighted by the mass of each intermediate needed, and grows geometrically with step count; early steps and solvent use dominate.
- Mass metrics ignore hazard and energy. Life-cycle assessment (goal and scope, inventory, impact assessment, interpretation) uses a functional unit, a system boundary and characterisation factors such as IPCC AR6 GWPs; allocation between co-products must be stated and tested.
:::

## Exercises

::: exercise PMI from the E-factor {level=1 check="26"}
A process has a complete E-factor of $25$. What is its PMI on the same basis? (Enter the PMI.)
::: solution
By [[#prop-pmi-e]], $\mathrm{PMI} = E + 1 = 26$: $26\ \mathrm{kg}$ of materials enter for each kilogram of product, $25\ \mathrm{kg}$ of which leave as waste.
:::
:::

::: exercise A borohydride reduction {level=1 check="82.8"}
Acetophenone ($120.15\ \mathrm{g\,mol^{-1}}$) is reduced to 1-phenylethanol ($122.17$) according to $4\,\mathrm{C_8H_8O} + \mathrm{NaBH_4} + 4\,\mathrm{H_2O} \rightarrow 4\,\mathrm{C_8H_{10}O} + \mathrm{NaB(OH)_4}$. Using $M(\mathrm{NaBH_4}) = 37.83$ and $M(\mathrm{H_2O}) = 18.015\ \mathrm{g\,mol^{-1}}$, find the atom economy. (Enter it in per cent.)
::: solution
$\mathrm{AE} = 4\times122.17/(4\times120.15 + 37.83 + 4\times18.015) = 488.67/590.49 = 82.8\,\%$. In practice borohydride is used in excess and the reaction is quenched with acid, so the real RME is lower; catalytic hydrogenation or transfer hydrogenation reaches $100\,\%$ atom economy for the same transformation.
:::
:::

::: exercise A simple E-factor {level=1 check="0.75"}
A step uses $120\ \mathrm{kg}$ of reactants and reagents (excluding solvents and water) and gives $68.6\ \mathrm{kg}$ of product. Find the simple E-factor. (Enter it to two significant figures.)
::: solution
$\mathrm{sEF} = (120 - 68.6)/68.6 = 51.4/68.6 = 0.749 \approx 0.75$. The value would rise substantially once solvents were included.
:::
:::

::: exercise The aspirin experiment {level=2 check="26.4"}
In a teaching preparation of aspirin ($180.16\ \mathrm{g\,mol^{-1}}$), $2.00\ \mathrm{g}$ of 2-hydroxybenzoic acid (salicylic acid, $138.12$) is treated with $5.00\ \mathrm{cm^3}$ of acetic anhydride ($102.09\ \mathrm{g\,mol^{-1}}$, density $1.08\ \mathrm{g\,cm^{-3}}$) and a drop of acid catalyst, giving $1.95\ \mathrm{g}$ of purified aspirin. Find the yield, AE, SF and RME. (Enter the RME in per cent.)
::: solution
$n(\text{salicylic acid}) = 2.00/138.12 = 0.01448\ \mathrm{mol}$ (limiting); acetic anhydride $5.40\ \mathrm{g} = 0.05289\ \mathrm{mol}$, a $3.65$-fold excess. Theoretical aspirin $0.01448\times180.16 = 2.609\ \mathrm{g}$, yield $1.95/2.609 = 74.7\,\%$. The equation $\mathrm{C_7H_6O_3 + C_4H_6O_3 \rightarrow C_9H_8O_4 + CH_3COOH}$ gives $\mathrm{AE} = 180.16/240.21 = 75.0\,\%$. $\mathrm{SF} = 7.40/(0.01448\times240.21) = 7.40/3.478 = 2.127$. $\mathrm{RME} = 0.750\times0.747/2.127 = 0.264$, i.e. $26.4\,\%$; directly, $1.95/7.40 = 26.4\,\%$. The excess anhydride, which also acts as solvent, costs more than the by-product acetic acid. The experiment is carried out under supervision with a risk assessment: acetic anhydride is corrosive and a lachrymator, and the work is done in a fume cupboard.
:::
:::

::: exercise A four-step route {level=2 check="183"}
A route has four steps with PMIs (per kg of each step's own product) of $18$, $25$, $40$ and $60$, from first to last. The masses of each intermediate consumed per kilogram of the next step's product are $1.5$ ($\mathrm{I_1}$ per kg $\mathrm{I_2}$), $1.2$ ($\mathrm{I_2}$ per kg $\mathrm{I_3}$) and $1.25$ ($\mathrm{I_3}$ per kg final product). Find the route PMI. (Enter the PMI.)
::: solution
Masses per kilogram of final product: $m_4 = 1$, $m_3 = 1.25$, $m_2 = 1.25\times1.2 = 1.5$, $m_1 = 1.5\times1.5 = 2.25$. Then $\sum m_i\mathrm{PMI}_i = 60 + 1.25\times40 + 1.5\times25 + 2.25\times18 = 60 + 50 + 37.5 + 40.5 = 188.0$. Subtracting the intermediates, $m_1 + m_2 + m_3 = 5.0$, gives $\mathrm{PMI}_\text{route} = 183$ by [[#eq-route-pmi]]. Step 1, with the lowest PMI of its own, still contributes $40.5$ — more than step 2's $37.5 - 2.25 = 35.25$.
:::
:::

::: exercise Mass allocation in a steam cracker {level=2 check="1.61"}
A steam cracker emits $1.0\ \mathrm{t\,CO_2}$ per tonne of feed. Per tonne of feed it produces $0.31\ \mathrm{t}$ of ethylene, $0.16\ \mathrm{t}$ of propylene and $0.15\ \mathrm{t}$ of other saleable products; the remaining $0.38\ \mathrm{t}$ is methane-rich fuel gas burnt in the cracking furnaces (and already counted in the emissions). Allocating by mass among the products leaving the plant, what emissions are attributed to one tonne of ethylene? (Enter the answer in t $\mathrm{CO_2}$ per t ethylene.)
::: solution
The fuel gas is consumed inside the system boundary, so it is not a product. The products leaving total $0.31 + 0.16 + 0.15 = 0.62\ \mathrm{t}$ per tonne of feed, and under mass allocation each tonne of product carries $1.0/0.62 = 1.61\ \mathrm{t\,CO_2}$, the same for ethylene as for every other product. Economic allocation would load more on to the higher-value products. Counting the fuel gas as a "product" (an error) would give $1.0\ \mathrm{t}$, understating the burden by $38\,\%$.
:::
:::

::: exercise The minimum E-factor of a catalytic route {level=3 check="0.359"}
Show from [[#prop-rme]] that a step with stoichiometric reactants and no auxiliaries has $E = 1/(\mathrm{AE}\,\varepsilon) - 1$, and evaluate it for the BHC ibuprofen route (treat it as one overall step with $\mathrm{AE} = 0.7745$) at an overall yield of $95\,\%$, counting acetic acid as waste. (Enter $E$.)
::: hint
With $\mathrm{SF} = 1$ the RME is $\mathrm{AE}\,\varepsilon$, and $\mathrm{PMI} = 1/\mathrm{RME}$.
:::
::: solution
With $\mathrm{SF} = 1$, $\mathrm{RME} = \mathrm{AE}\,\varepsilon$. With no auxiliaries the only inputs are the reactants, so $\mathrm{PMI} = 1/\mathrm{RME}$, and $E = \mathrm{PMI} - 1 = 1/(\mathrm{AE}\,\varepsilon) - 1$. For BHC, $E = 1/(0.7745\times0.95) - 1 = 1/0.7358 - 1 = 0.359$. Of this, $0.291$ is the acetic acid inherent in the equation and $0.068$ comes from the $5\,\%$ yield loss. If the acetic acid is sold, the waste falls to the yield loss alone. Real plants add catalyst losses, HF make-up and purification, but the result shows how close a catalytic bulk-style route can come to Sheldon's bulk-chemical range.
:::
:::

::: exercise Hidden greenhouse gas in adipic acid {level=3 check="82.2"}
Adipic acid (hexanedioic acid, $146.14\ \mathrm{g\,mol^{-1}}$), a monomer of nylon-6,6, is made by oxidising a cyclohexanol–cyclohexanone mixture with nitric acid; the stoichiometry releases close to one mole of dinitrogen oxide, $\mathrm{N_2O}$ ($44.01$), per mole of adipic acid. (a) Find the mass of $\mathrm{N_2O}$ per kilogram of adipic acid at one mole per mole, and its climate impact using the IPCC AR6 $\mathrm{GWP_{100}}$ of $273$. (b) Abatement units decompose $\mathrm{N_2O}$ to $\mathrm{N_2}$ and $\mathrm{O_2}$; what abatement efficiency would bring the impact down to $4.0\ \mathrm{kg\,CO_2e\,kg^{-1}}$? (Enter the answer to (a) in kg $\mathrm{CO_2e}$ per kg adipic acid.)
::: solution
(a) $44.01/146.14 = 0.301\ \mathrm{kg\,N_2O\,kg^{-1}}$, equivalent to $0.301\times273 = 82.2\ \mathrm{kg\,CO_2e\,kg^{-1}}$ — far more than the $\mathrm{CO_2}$ footprint of making the feedstock. (b) The fraction remaining must be $4.0/82.2 = 0.049$, an abatement efficiency of $95\,\%$. Catalytic and thermal decomposition units installed by producers from the late 1990s onwards achieve efficiencies of this order, which is why adipic acid emissions fell sharply in countries that adopted them. A mass metric would record the $\mathrm{N_2O}$ as a few hundred grams of gaseous waste; only an impact assessment reveals that it dominates the process's climate footprint.
:::
:::
