A cell's metabolism is a chemical plant that was not designed for your purposes. It converts the substrate you supply into more cells, into carbon dioxide, into dozens of by-products, and — if you are fortunate — into a little of the compound you want. **Metabolic engineering**, a term introduced by James Bailey in 1991, is the deliberate redesign of that network so that most of the carbon and most of the electrons end up in the product.

It differs from the protein production of [[biotechnology/protein-production]] in a way that governs everything else. A protein is the direct output of one gene, so expression level is the main lever. A small molecule is the output of a *pathway* of ten or twenty reactions embedded in a network of a thousand, competing for the same precursors, cofactors and energy as the cell's own growth. There is no single gene to over-express, the stoichiometry of the whole network sets a hard ceiling on what is achievable, and the cell actively regulates against your intentions. The subject is therefore quantitative from the first page: yields from stoichiometry, fluxes from balances, control distributed across enzymes, and an economics in which a few per cent of yield decides whether a process exists.

This chapter assumes central metabolism ([[microbiology/microbial-metabolism]], [[biochemistry/metabolic-integration]]) and the circuit mathematics of [[biotechnology/synthetic-biology]]. Scale-up is [[biotechnology/bioprocessing]]; the network modelling is extended in [[systems-biology/metabolic-networks]].

## The ceiling: what stoichiometry allows

Before any engineering, two conservation laws bound the achievable yield: carbon is conserved, and so are the electrons available for transfer.

::: definition Yield, titre, productivity {#def-yield}
The **yield** $Y_{P/S}$ is product formed per substrate consumed, quoted in g g⁻¹, mol mol⁻¹, or **C-mol C-mol⁻¹** (moles of carbon in product per mole of carbon in substrate), which is the form in which the carbon balance is transparent. The **titre** is the final concentration (g L⁻¹) and the **volumetric productivity** the titre divided by the run time (g L⁻¹ h⁻¹). These three — yield, titre, rate — are the standard figures of merit, and a process must satisfy all three: yield sets the raw-material cost, titre sets the cost of separating the product from water, and productivity sets how much plant is needed.
:::

::: definition Degree of reduction {#def-gamma}
The **degree of reduction** $\gamma$ of a compound C$_x$H$_y$O$_z$ is the number of electrons available per carbon atom, relative to the reference compounds CO₂, H₂O and NH₃:

$$
\gamma = \frac{4x + y - 2z}{x} .
$$ {#eq-gamma}

Thus $\gamma = 4$ for glucose and for lactate, 6 for ethanol, 3.5 for succinate, 5.6 for isoprene, 0 for CO₂, and about 4.2 for microbial biomass of average composition. The quantity matters because electrons, like carbon, cannot be created: in a fermentation with no external electron acceptor, the electrons in the substrate must all appear in the products.
:::

::: proposition Maximum theoretical yield from the two balances {#prop-max-yield}
Consider converting a substrate S into a product P with no external electron acceptor and, as an upper bound, no biomass formation. Let the substrate have $x_S$ carbons and degree of reduction $\gamma_S$, and the product $x_P$ and $\gamma_P$, and let the only other product be CO₂ ($\gamma = 0$). Then

- the **carbon balance** limits the yield to $x_S/x_P$ moles of product per mole of substrate;
- the **electron balance** limits it to $x_S\gamma_S/(x_P\gamma_P)$.

The achievable maximum is the smaller of the two. If the product is *more* reduced per carbon than the substrate ($\gamma_P > \gamma_S$) the electron balance binds and carbon must be released as CO₂; if it is *less* reduced the carbon balance binds and the surplus electrons must be disposed of — in practice by making a more reduced by-product, by reducing an external acceptor, or by evolving hydrogen.

Worked for glucose ($x_S = 6$, $\gamma_S = 4$, so 24 electrons per mole):

| product | $x_P$ | $\gamma_P$ | carbon limit | electron limit | maximum | mass yield |
|---|---|---|---|---|---|---|
| lactate | 3 | 4 | 2.00 | 2.00 | 2.00 mol mol⁻¹ | 1.00 g g⁻¹ |
| ethanol | 2 | 6 | 3.00 | 2.00 | 2.00 | 0.511 |
| acetate | 2 | 4 | 3.00 | 3.00 | 3.00 | 1.00 |
| succinate | 4 | 3.5 | 1.50 | 1.71 | 1.50 | 0.98 |
| isoprene | 5 | 5.6 | 1.20 | 0.857 | 0.857 | 0.324 |

Three readings of the table are instructive. Lactate is the ideal fermentation product: carbon and electrons balance exactly, nothing is wasted, and the mass yield is 1. Ethanol is electron-limited, which is why alcoholic fermentation releases exactly two CO₂ per glucose and why 0.511 g g⁻¹ is the number against which every ethanol process is judged. Succinate is carbon-limited with electrons to spare, which is why the higher yields reported for succinate (up to about 1.7 mol mol⁻¹) require **fixing CO₂** through a carboxylating enzyme, adding carbon from outside the sugar — the table's carbon limit applies only when CO₂ is a product and not a co-substrate.

These are upper bounds and nothing more. They assume no biomass, no maintenance energy and a pathway whose ATP balance closes, and real processes reach 70–95 % of them at best.
:::

::: example Why ethanol stops at 0.51 g g⁻¹ {#ex-ethanol}
(a) Write the overall equation for alcoholic fermentation and confirm both balances. (b) A distillery reports 0.48 g ethanol per g glucose. What fraction of the theoretical maximum is that, and where has the rest gone? (c) Why can no amount of engineering raise the figure above 0.511 g g⁻¹ with glucose as the only substrate?
::: solution
(a) C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂. Carbon: $6 = 2\times2 + 2\times1$. ✓ Electrons: glucose supplies 24; ethanol carries $2\times2\times6 = 24$; CO₂ carries none. ✓ Both balances are tight simultaneously, which is why this fermentation is so efficient and so ancient.

(b) $0.48/0.511 = 94$ %. The missing 6 % is mostly carbon diverted to biomass — the yeast must grow — plus glycerol (made to dispose of surplus NADH from biosynthesis), small amounts of organic acids and higher alcohols, and the maintenance energy the cells spend on staying alive without growing.

(c) Because electrons are conserved. Each mole of ethanol holds 12 electrons and a mole of glucose supplies only 24, so two moles of ethanol exhaust the supply; the two remaining carbons must leave as fully oxidised CO₂. The only escapes are to supply electrons from outside the sugar — by feeding a more reduced co-substrate, by electrochemical or hydrogen-driven reduction, or by fixing CO₂ with external reducing power — and all of these change the question rather than improving the answer to it.
:::
:::

::: example Two routes to the same five carbons {#ex-isoprenoid}
Terpenoids are built from the C₅ unit isopentenyl diphosphate (IPP), which cells make by one of two pathways: the **mevalonate** route from three acetyl-CoA, and the **MEP** route from one pyruvate plus one glyceraldehyde-3-phosphate. (a) Compute the carbon efficiency of each from glucose. (b) Reconcile the MEP figure with the electron limit in [[#prop-max-yield]]. (c) Which would you choose, and what else would you need to know?
::: solution
(a) *Mevalonate.* Each acetyl-CoA (C₂) comes from pyruvate with the loss of one CO₂, so glucose (C₆) gives 2 acetyl-CoA (C₄) and 2 CO₂. Three acetyl-CoA therefore require 1.5 glucose, that is 9 carbons, and yield one C₅ unit (one further carbon is lost in the decarboxylation that forms IPP): carbon efficiency $5/9 = 56$ %, or 0.67 mol IPP per mol glucose.

*MEP.* One glucose gives one pyruvate and one glyceraldehyde-3-phosphate (C₃ + C₃), which condense and lose one carbon: $5/6 = 83$ %, or 1.0 mol IPP per mol glucose. On carbon alone, MEP is half again as efficient, and this is the main reason it has been pursued so hard in engineered strains.

(b) The electron limit for isoprene from glucose is 0.857 mol mol⁻¹, *below* the MEP pathway's carbon stoichiometry of 1.0. The resolution is that MEP consumes reducing equivalents (NADPH) and ATP which must themselves be generated by oxidising some of the substrate; so the pathway cannot run at its carbon stoichiometry on glucose alone, and the real ceiling is set by redox and energy, not by carbon. The lesson is general: a pathway's carbon stoichiometry is only an upper bound on what its cofactor requirements will allow.

(c) You would need the ATP and NADPH demand of each route per C₅ unit, the host's capacity to supply NADPH (which is tied to the pentose phosphate pathway and so to how carbon is partitioned), whether the host's native route is subject to feedback inhibition that engineering must overcome, and how much flux each route can actually carry — mevalonate has been engineered to very high flux in yeast, whereas MEP in bacteria has proved harder to drive than its stoichiometry suggests, because of regulation and intermediate toxicity. Choosing on stoichiometry alone is the commonest error in pathway selection.
:::
:::

## Flux, and where control resides

::: definition Flux and flux balance {#def-flux}
A **flux** is the rate of a reaction per unit biomass, usually in mmol g⁻¹ h⁻¹. Writing $S$ for the stoichiometric matrix of the network (one row per metabolite, one column per reaction) and $v$ for the vector of fluxes, the assumption that internal metabolites do not accumulate gives the **flux balance** condition

$$
S\,v = 0 ,
$$ {#eq-flux-balance}

a linear system whose solution space is the set of all flux distributions consistent with the stoichiometry. Because a genome-scale network has far more reactions than metabolites, the system is underdetermined and the space is large; **flux balance analysis** selects a point in it by maximising an objective (classically growth rate) subject to capacity bounds. **¹³C flux analysis** instead measures the distribution directly: feeding a substrate labelled at known positions and measuring the labelling patterns of metabolites constrains the fluxes that could have produced them.
:::

Flux balance analysis tells you what the network *could* do. It is poor at predicting what it *will* do, because it contains no kinetics and no regulation, and the growth-maximising solution is often not the one the cell adopts. Its real use in engineering is to compute ceilings and to identify knockouts that make product formation obligatory — if every flux distribution permitting growth also produces the product, the strain cannot help but make it, and this is a design strategy rather than a prediction.

### Control is distributed

::: proposition Flux control coefficients and the summation theorem {#prop-summation}
The **flux control coefficient** of enzyme $i$ over a steady-state flux $J$ is the fractional change in flux per fractional change in enzyme activity:

$$
C^{J}_{i} = \frac{\partial \ln J}{\partial \ln E_i} = \frac{E_i}{J}\frac{\partial J}{\partial E_i} .
$$ {#eq-control-coefficient}

For a pathway at steady state, these coefficients satisfy the **summation theorem** (Henrik Kacser and Jim Burns, and independently Reinhart Heinrich and Tom Rapoport, 1973–74):

$$
\sum_{i} C^{J}_{i} = 1 ,
$$ {#eq-summation}

the sum running over all enzymes in the pathway. Control is therefore a **shared, conserved quantity**: if one enzyme has a coefficient of 0.7, all the others together have 0.3, and raising one enzyme's coefficient necessarily lowers the others'. A coefficient of 1 means the flux is proportional to that enzyme — the textbook "rate-limiting step" — and measured coefficients in real pathways are usually well below 1 and distributed across several enzymes.

A simple illustration: for two irreversible reactions in series far from saturation, the flux behaves like current through two resistors, $J = (1/E_1 + 1/E_2)^{-1}$, and the control coefficients are $C_1 = (1/E_1)/(1/E_1+1/E_2)$ and $C_2 = 1 - C_1$. Whichever enzyme is scarcer holds most of the control, and as it is over-expressed its own coefficient falls — which is exactly why doubling an enzyme rarely doubles a flux, and why the next round of engineering must target a different step.
:::

::: widget plot
f: 1/(1/x + 1/E2)
x: 0.1, 10
y: 0, 10
sliders: E2=2:0.5:10:0.5
labels: J = (1/E_1 + 1/E_2)^{-1}
caption: Flux through two reactions in series against the activity of the first, for a fixed activity $E_2$ of the second (slider). While $E_1 \ll E_2$ the line is nearly straight — enzyme 1 holds almost all the control and over-expressing it pays off proportionally. As $E_1$ passes $E_2$ the curve flattens and saturates at $E_2$: control has transferred to the second enzyme, and further over-expression of the first achieves almost nothing while still costing the cell resources. Raise $E_2$ and the whole curve lifts. This single picture is the quantitative content of "there is no rate-limiting step".
:::

::: warning There is no "rate-limiting step" to find
Generations of textbooks taught that each pathway has one slow step that sets its flux, so that engineering consists in identifying and over-expressing it. The summation theorem shows why this is at best a special case: control is a distributed, conserved quantity, and a coefficient of 1 for one enzyme is the extreme rather than the rule. Three practical consequences follow. First, over-expressing the enzyme with the highest coefficient moves control elsewhere, so improvement comes in diminishing increments and requires repeated re-measurement. Second, large flux increases usually need several enzymes raised together, in balance — which is why combinatorial libraries of expression levels often beat rational single changes. Third, an enzyme with a small flux control coefficient may still have a large **concentration** control coefficient over an intermediate, so it can matter greatly for the accumulation of a toxic or inhibitory metabolite even while it barely affects the flux.
:::

::: example Reading control from an over-expression experiment {#ex-control}
Over-expressing enzyme A two-fold raises the pathway flux by 10 %. Over-expressing enzyme B two-fold raises it by 50 %. (a) Estimate the flux control coefficients. (b) What do the two values sum to, and what does the remainder mean? (c) After raising B four-fold, a further doubling of B adds only 5 %. Interpret. (d) What is the next move?
::: solution
(a) $C_A = \ln 1.10/\ln 2 = 0.14$ and $C_B = \ln 1.50/\ln 2 = 0.58$. (Using logarithms is the right way to read a finite change: the coefficient is defined as a derivative of logarithms, and a two-fold change is not infinitesimal, so these are averages over the interval rather than exact coefficients.)

(b) $0.14 + 0.58 = 0.72$, so the remaining enzymes of the pathway hold about 0.28 of the control between them, by [[#eq-summation]]. No single further target will give a large gain.

(c) B's coefficient has fallen to $\ln 1.05/\ln 2 = 0.07$. Control has moved away from B as it was raised — exactly the behaviour of the two-enzyme model in the figure above. B is no longer worth raising.

(d) Raise A and the remaining enzymes together with B's new level, rather than sequentially; or, equivalently, build a small library in which several enzyme levels vary (different promoters and ribosome binding sites) and select the best combination. Then re-measure, because the identity of the controlling step will have changed again. If the flux now saturates despite balanced expression, the limit has probably moved outside the pathway — to precursor supply, to cofactor regeneration, or to export of the product.
:::
:::

## Strategies

The engineering repertoire can be organised under four headings.

**Push, pull and block.** *Push* more carbon into the pathway by increasing the supply of its precursor — removing feedback inhibition from an early enzyme, redirecting flux at a branch point, over-expressing the precursor-forming reactions. *Pull* the product through by raising the activity of downstream steps and by exporting or consuming the product, which relieves inhibition and keeps the pathway's reactions thermodynamically favourable. *Block* competing routes by deleting the genes that consume the precursor or the intermediates. Blocking is the most powerful and the most dangerous move: a deletion that removes a by-product often also removes a route the cell needed for redox or energy balance, and the strain either fails to grow or finds an unexpected alternative.

**Balance cofactors and energy.** A pathway that consumes NADPH while the host generates NADH will be limited whatever its enzyme levels. The levers are the partition of carbon between glycolysis and the pentose phosphate pathway, the expression of transhydrogenases that interconvert the two cofactors, and swapping an enzyme for a variant with the opposite cofactor preference. ATP must also balance: a pathway with no net ATP yield cannot support maintenance, and one that consumes ATP needs a source.

**Control the pathway dynamically.** Growth and production compete for the same carbon, so the best design is often to separate them in time: grow first, then switch the pathway on, by inducer, temperature, nutrient depletion, or — more elegantly — by a quorum-sensing circuit that switches at a cell density the culture reaches by itself. Feedback can also be used within the pathway: a biosensor that detects a toxic intermediate and throttles the enzyme producing it keeps that intermediate near a safe level across changing conditions, which fixed expression cannot do. These are the circuits of [[biotechnology/synthetic-biology]] put to work.

**Evolve what you cannot design.** Adaptive laboratory evolution — serial passage under a selection that rewards the desired behaviour — routinely finds improvements that no model predicted, especially for tolerance to the product or to a feedstock, and for restoring growth after an aggressive set of deletions. Sequencing the evolved strain then reveals the mutations, some of which are intelligible and can be transferred to a clean background. The practical art lies in arranging a selection in which the thing you want is the thing that grows.

::: example Yield against rate: the economics {#ex-economics}
A product sells for US\$2 per kg; glucose costs US\$0.30 per kg. (a) What is the substrate cost per kg of product at yields of 0.2, 0.4 and 0.5 g g⁻¹? (b) Strain A reaches 0.45 g g⁻¹ at 1.0 g L⁻¹ h⁻¹; strain B reaches 0.35 g g⁻¹ at 2.5 g L⁻¹ h⁻¹. Which is better? (c) What third quantity decides it?
::: solution
(a) Substrate cost is price divided by yield: $0.30/0.2 = \text{US\$}1.50$; $0.30/0.4 = \text{US\$}0.75$; $0.30/0.5 = \text{US\$}0.60$ per kg of product. Against a selling price of US\$2, the difference between a yield of 0.2 and 0.5 is the difference between a plausible business and an impossible one — and this is before any other cost.

(b) It depends on which resource is scarce. Strain A's substrate cost is US\$0.67 per kg and strain B's US\$0.86, so A is cheaper per kilogram; but B produces 2.5 times as fast, so the same vessel delivers 2.5 times more product per year. If the plant is built and its capacity is the constraint, B generates far more margin in total; if the plant is yet to be sized, or if the market is limited, A's lower unit cost wins.

(c) Capital charge per unit of product — the annualised cost of the plant divided by its annual output — which converts productivity into money and makes the two comparable. The general rule in this industry is that yield dominates for cheap, high-volume products (fuels, bulk chemicals), where raw material is most of the cost; titre and productivity dominate for expensive, low-volume products, where the plant and the purification dominate. A metabolic engineering project should know which regime it is in before choosing what to optimise.
:::
:::

::: widget plot
f: 0.51*(1 - x/0.45); 0.51*(1 - x/0.45)*x/0.45
x: 0, 0.45
y: 0, 0.55
labels: \text{product yield } Y_{P/S}; \text{relative volumetric productivity}
caption: An idealised trade-off between growth and production: the upper line is product yield falling linearly as more carbon goes into biomass at higher specific growth rate $\mu$ (h⁻¹), and the lower curve is the volumetric productivity, proportional to $\mu$ times the yield, on the same arbitrary scale. Yield is maximal in a culture that does not grow — which makes nothing per hour, since there are no cells to make it — and productivity peaks at an intermediate growth rate, here at half the maximum. This is why two-stage processes exist: grow at high $\mu$ to accumulate catalyst, then shift to low $\mu$ to convert substrate to product at high yield. The linear yield–growth relation is a schematic, not a measured law; real strains deviate from it in both directions.
:::

::: quiz
A strain makes 2 g L⁻¹ of a product at a yield of 0.12 g g⁻¹ and leaks 30 % of the consumed carbon into acetate. The pathway's five enzymes have been raised as far as expression allows, and flux no longer responds. What is the most promising next step?
- [ ] Raise all five pathway enzymes a further two-fold.
- [x] Delete or attenuate the route to acetate, then re-measure the flux control coefficients.
- [ ] Switch to a richer medium so that the cells grow faster.
- [ ] Increase the plasmid copy number.
::: solution
When flux no longer responds to the pathway's own enzymes, their control coefficients have fallen and control lies outside the pathway — here, visibly, in a competing route that consumes nearly a third of the carbon. Blocking it redirects precursor into the pathway and changes the whole distribution of control, which must then be measured again. More expression of enzymes that already hold little control adds burden for nothing ([[#prop-summation]]); faster growth diverts more carbon to biomass and would usually lower the yield further; copy number is just another way of raising expression. The caution with the winning option is the one noted above: acetate overflow is often how the cell disposes of surplus carbon or maintains redox balance, so the deletion may impair growth and may need to be an attenuation rather than a knockout, or to be paired with a change that provides the function the deleted route was performing.
:::
:::

## What has actually been built

::: application Four processes and what each one shows
**Amino acids by *Corynebacterium glutamicum*.** Glutamate production was discovered in 1957 by Shukuo Kinoshita and colleagues, who found that a soil bacterium excreted glutamate when its membrane was made leaky by biotin limitation. Lysine, threonine and others followed, and the industry now produces amino acids on a scale of millions of tonnes a year as of 2026, mostly for animal feed. The strains were improved for decades by mutagenesis and selection before any of it was rational, and the lesson is that selection for a measurable phenotype works even without understanding — and that when the genomes of the classical strains were finally sequenced, the mutations were found to be exactly the ones metabolic control analysis would have recommended: removal of feedback inhibition on the first enzyme of the pathway, and loss of competing routes.

**1,3-propanediol from glucose.** A route not present in any single organism was assembled in *E. coli*, combining the glycerol-forming reactions of yeast with the glycerol-to-propanediol reactions of *Klebsiella*, with extensive engineering of central metabolism to supply the cofactors. Titres above 100 g L⁻¹ were achieved, and the product became the monomer of a commercial polymer. It shows that pathways can be assembled across kingdoms, and that most of the work is not in the heterologous pathway but in the host's own metabolism.

**Semisynthetic artemisinin.** Artemisinin is a plant terpenoid whose supply from *Artemisia annua* was volatile in price and quantity. From 2003 Jay Keasling's laboratory expressed a mevalonate pathway and a plant terpene synthase in microbes to make a precursor; a decade of engineering moved the route to yeast and raised the titre of artemisinic acid to about 25 g L⁻¹ (Paddon and colleagues, 2013), after which chemical conversion gives artemisinin. Industrial production began in 2013. It shows what a sustained effort can achieve — and, in its commercial history, that a fermentation route must compete with an agricultural one on price, which is a different question from whether it works.

**Gas fermentation.** Acetogenic bacteria such as *Clostridium autoethanogenum* grow on carbon monoxide and hydrogen, fixing carbon through the Wood–Ljungdahl pathway, and have been engineered to make ethanol and other products from industrial waste gases. The constraints here are the opposite of a sugar fermentation's: carbon is cheap and energy is scarce, so the ATP balance of every candidate pathway decides whether it can run at all.
:::

Two further considerations recur across all of these. **Product toxicity** usually sets the titre: solvents disrupt membranes, acids acidify the cytoplasm, and many intermediates are more toxic than the final product. Remedies are export (a transporter that removes the product from the cell), tolerance engineering (usually found by evolution rather than by design), and in-process removal, in which the product is extracted continuously so that its concentration in the broth never reaches the inhibitory level. And **the host matters**: *E. coli* for fast growth and genetic ease, *S. cerevisiae* for tolerance of low pH and ethanol and for expressing plant enzymes that need a eukaryotic environment, *C. glutamicum* for amino acids, filamentous fungi for organic acids and secreted enzymes, and cyanobacteria or algae where the substrate is to be CO₂ and light.

::: intuition Metabolism resists because it was selected to
It is easy to read a cell's regulation as an obstacle placed in the engineer's way, but the regulation is the point: a wild cell that poured its carbon into one product would be outcompeted immediately. Feedback inhibition of the first enzyme of a pathway, repression of its genes by the product, degradation of over-accumulated intermediates and overflow routes that dump surplus carbon are all mechanisms for *not* doing what a metabolic engineer wants. This is why so much of the work consists of disabling regulation — feedback-resistant enzyme variants, promoter replacements that remove native control — and why the resulting strains are unfit outside the fermenter. A production strain is a domesticated organism, and like a domesticated plant it survives only in cultivation.
:::

::: history
Metabolic engineering has two ancestries. The industrial one begins with the classical fermentations — citric acid by *Aspergillus niger* from the 1920s, penicillin yields raised a thousand-fold by mutagenesis and selection in the 1940s and 1950s, glutamate by *Corynebacterium glutamicum* after Shukuo Kinoshita's work of 1957 — all achieved by selection on phenotype without molecular understanding. The analytical one begins with Henrik Kacser and Jim Burns's and Reinhart Heinrich and Tom Rapoport's metabolic control analysis of 1973–74, which replaced the rate-limiting step with distributed control, and with Bernhard Palsson's and others' development of constraint-based flux models from the 1990s. The two joined when recombinant DNA made directed changes possible: James Bailey named the field in a 1991 *Science* review, and Gregory Stephanopoulos, Aristos Aristidou and Jens Nielsen's textbook of 1998 set out its framework. Landmark constructions followed: the 1,3-propanediol route in *E. coli* through the 1990s and 2000s; Jay Keasling's terpenoid pathways from 2003, reaching industrial artemisinic acid production in 2013; genome-scale models used to design knockouts from the 2000s onwards; and the extension to one-carbon and gaseous feedstocks in the 2010s and 2020s.
:::

::: summary
- Yield, titre and volumetric productivity are distinct figures of merit, and which one dominates the economics depends on whether raw material or plant is the larger cost.
- Carbon and electron balances bound the yield: the maximum is the smaller of $x_S/x_P$ and $x_S\gamma_S/(x_P\gamma_P)$, with $\gamma = (4x+y-2z)/x$ ([[#eq-gamma]], [[#prop-max-yield]]). Ethanol from glucose is electron-limited at 0.511 g g⁻¹; lactate balances exactly at 1.00; products more reduced than the substrate force CO₂ release.
- A pathway's carbon stoichiometry is an upper bound that its ATP and NADPH requirements may not permit: compare routes on cofactors as well as carbon.
- Flux balance ($Sv = 0$) defines what the network could do; ¹³C analysis measures what it does. Constraint-based models are best used to compute ceilings and to design knockouts that make production obligatory.
- Control is distributed and conserved: $C^J_i = \partial\ln J/\partial\ln E_i$ and $\sum_i C^J_i = 1$ ([[#eq-summation]]). Over-expressing an enzyme lowers its own coefficient, so improvement is incremental and multiple enzymes must be balanced.
- The strategic repertoire is push, pull, block; balance cofactors and ATP; separate growth from production in time, with dynamic or feedback control; and evolve what cannot be designed.
- Titres are usually set by product toxicity, addressed by export, tolerance or in-process removal. Production strains are domesticated organisms whose native regulation has been deliberately disabled.
:::

## Exercises

::: exercise Degree of reduction {level=1 check="4.67"}
Compute the degree of reduction of glycerol, C₃H₈O₃, to two decimal places.
::: solution
$\gamma = (4\times3 + 8 - 2\times3)/3 = (12+8-6)/3 = 14/3 = 4.67$. Being more reduced per carbon than glucose, glycerol is an attractive substrate for making reduced products — one reason the surplus glycerol from biodiesel manufacture was pursued as a feedstock.
:::
:::

::: exercise Maximum ethanol {level=1 check="0.511"}
Confirm the maximum mass yield of ethanol on glucose to three decimal places, using 180.16 and 46.07 g mol⁻¹.
::: solution
Two moles of ethanol per mole of glucose: $2\times46.07/180.16 = 0.511$ g g⁻¹.
:::
:::

::: exercise A control coefficient {level=1 check="0.25"}
Raising an enzyme's activity three-fold increases the pathway flux by 32 %. Estimate its flux control coefficient to two decimal places.
::: solution
From [[#eq-control-coefficient]], using logarithms because the change is finite rather than infinitesimal,

$$
C = \frac{\ln 1.32}{\ln 3} = \frac{0.2776}{1.0986} = 0.25 .
$$

This is an average over the interval, not the derivative at the starting point; because the coefficient falls as the enzyme rises, the true value at the original enzyme level is somewhat higher than 0.25.
:::
:::

::: exercise Carbon versus electrons {level=2 check="1.00"}
What is the maximum yield, in mol per mol of glucose, of 1-butanol (C₄H₁₀O)? Which balance binds? Give the yield to two decimal places.
::: solution
$\gamma_P = (4\times4 + 10 - 2)/4 = 6.0$, so a mole of butanol carries $4\times6 = 24$ electrons. The carbon limit is $6/4 = 1.50$ mol mol⁻¹; the electron limit is $24/24 = 1.00$ mol mol⁻¹. The electron balance binds, so the maximum is **1.00 mol per mol of glucose**, a mass yield of $74.12/180.16 = 0.41$ g g⁻¹, with two carbons released as CO₂.

If reducing power were supplied from outside — by feeding hydrogen, by a more reduced co-substrate, or electrochemically — the carbon balance would become the only constraint and yields up to 1.50 mol mol⁻¹ (0.62 g g⁻¹) would become thermodynamically allowed. Whether that is worth doing depends entirely on the price of the electrons.
:::
:::

::: exercise Which to optimise {level=2}
Two projects: a fuel selling at US\$0.60 per kg, and a flavour compound selling at US\$400 per kg. Both currently run at 0.15 g g⁻¹ yield, 5 g L⁻¹ titre and 0.1 g L⁻¹ h⁻¹. You can double exactly one of yield, titre or rate. Choose for each project and justify quantitatively.
::: solution
For the fuel, substrate cost at 0.15 g g⁻¹ with glucose at US\$0.30 kg⁻¹ is US\$2.00 per kg of product against a selling price of US\$0.60 — the process loses money on raw material alone, and no improvement in titre or rate can fix that. Doubling the yield halves the substrate cost to US\$1.00, still above the price: the project needs a yield improvement of at least four-fold to be viable, and yield is the only quantity worth working on.

For the flavour compound, substrate cost is irrelevant (US\$2.00 against US\$400). What matters is the cost of the plant and of recovering the product from 5 g L⁻¹ — that is, from a broth that is 99.5 % water and host material. Doubling the titre halves the volume to be processed per kilogram of product and so cuts the dominant cost; doubling the rate would halve the capital charge instead. Titre is usually the better choice at this low a concentration, because recovery cost falls steeply with concentration while capital charge falls only linearly with rate.
:::
:::

::: exercise Sequential over-expression {level=2}
A three-enzyme pathway has control coefficients 0.6, 0.3 and 0.1. You double enzyme 1. (a) Predict the flux increase. (b) Qualitatively, what are the coefficients afterwards? (c) Why is doubling all three at once better than doubling them one at a time, and what limits that strategy?
::: solution
(a) $\Delta\ln J \approx C_1\Delta\ln E_1 = 0.6\times\ln 2 = 0.416$, so $J$ rises by $e^{0.416} = 1.52$, about 52 %. (This uses the coefficient as if constant over a two-fold change, which overestimates the gain, since the coefficient falls as the enzyme rises.)

(b) Enzyme 1's coefficient falls, and those of enzymes 2 and 3 rise, still summing to 1. Control has moved downstream.

(c) Doubling all three preserves their relative balance, so no single step becomes the new bottleneck and the flux increase is closer to the sum of the coefficients times $\ln 2$ — that is, close to the full factor of 2. Sequential changes waste effort because each one moves control away from the enzyme just raised. The limit is burden: expressing three enzymes at twice the level costs the cell resources, slows growth and so lowers the volumetric productivity even as the specific flux rises ([[biotechnology/synthetic-biology]]). Beyond some point, balanced over-expression stops paying, and the pathway must be made more efficient rather than more abundant.
:::
:::

::: exercise A deletion that backfires {level=2}
To stop acetate overflow you delete both acetate-forming routes in *E. coli*. The strain grows at half the rate, accumulates pyruvate, and makes lactate instead. Explain all three observations, and give two alternative designs.
::: solution
Acetate overflow is not waste for its own sake: it disposes of carbon arriving at acetyl-CoA faster than the TCA cycle and respiration can process it, and the acetate kinase step recovers ATP. Deleting it removes a drain, so the metabolites upstream (pyruvate, acetyl-CoA) accumulate; it removes an ATP-yielding reaction, which slows growth; and the cell finds another way to dispose of surplus carbon and to reoxidise NADH — lactate, which costs it less than stopping. The network has rerouted around the deletion, as networks generally do.

Alternatives: (i) attenuate rather than delete — replace the native promoter with a weaker one, so the route is reduced to the capacity the cell genuinely needs, which is tuning rather than removal; (ii) reduce the arrival rate of carbon instead of blocking its exit, by limiting glucose uptake (a weakened transporter, or fed-batch feeding at a controlled rate), which prevents the overflow situation from arising; (iii) delete the alternative outlets as well *and* provide the missing functions — an NADH oxidase or an engineered route that reoxidises NADH while making the desired product. The general principle: before deleting a by-product pathway, ask what it was doing for the cell, and supply that function by design.
:::
:::

::: exercise Designing a two-stage process {level=3}
A product is toxic above 8 g L⁻¹ and its pathway consumes two NADPH per molecule. You may use a quorum-sensing switch, an inducible promoter, a transporter and in-process extraction. Design a process and state what each element contributes and what you would measure. (Assume a maximum theoretical yield of 0.45 g g⁻¹.)
::: solution
A workable design: grow in fed-batch on glucose with the pathway off, to a high cell density, so that the catalyst is accumulated at maximum growth rate and none of the substrate is wasted on a product the cells cannot yet tolerate. Switch the pathway on at the end of growth — a quorum-sensing switch does this automatically at a density the culture reaches by itself, which removes the need for an operator decision and the cost of an inducer, while an inducible promoter gives more precise control and the ability to abort. In the production phase, feed glucose at a rate that limits growth to a low $\mu$, so that carbon goes to product rather than biomass, and the yield approaches the stoichiometric ceiling.

Toxicity sets the rest. An exporter removes the product from the cytoplasm, where the concentration that matters is the intracellular one; in-process extraction (a second liquid phase, a resin, or stripping if the product is volatile) keeps the aqueous concentration below 8 g L⁻¹ indefinitely, so the run is no longer bounded by the toxic titre and total production is set by the run length rather than by the inhibition point. NADPH demand means the production phase must be engineered to supply two NADPH per molecule: expect to redirect carbon through the pentose phosphate pathway, or to express a transhydrogenase, and check whether this reduces the attainable yield below 0.45 g g⁻¹.

Measurements: specific growth rate and viability in both phases; yield on glucose during the production phase alone (not averaged over growth, which conflates the two); intracellular as well as extracellular product concentration, to confirm that the exporter works; NADPH/NADP⁺ ratio or a redox-responsive reporter; and the fraction of cells still carrying a functional pathway at harvest, since the production phase is exactly when a costly construct is selected against.
:::
:::

::: exercise Reading a flux map {level=3}
¹³C analysis of a strain consuming 10 mmol glucose g⁻¹ h⁻¹ gives: 7.0 through glycolysis to pyruvate, 3.0 into the pentose phosphate pathway, 4.5 into the TCA cycle, 3.5 to acetate, 1.2 to the product pathway, the rest to biomass. (a) Check the carbon bookkeeping qualitatively and identify the largest loss. (b) The product needs NADPH. What does the split at glucose-6-phosphate tell you? (c) Propose two changes and predict their effects, including a side effect of each.
::: solution
(a) Of 10 mmol glucose (60 mmol carbon), only 1.2 mmol of flux reaches the product pathway, while 3.5 mmol goes to acetate and 4.5 mmol enters the TCA cycle, which oxidises carbon to CO₂. Acetate is the largest avoidable loss — it is excreted rather than used — and TCA flux, though necessary for energy and precursors, is the largest sink overall. The product pathway receives a small fraction of the carbon, so the yield is far below the ceiling.

(b) The pentose phosphate pathway takes 3.0 of 10, that is 30 % of the glucose, and it is the main NADPH source. Whether that is sufficient depends on the product's demand: at 1.2 mmol h⁻¹ of product needing 2 NADPH each, 2.4 mmol h⁻¹ of NADPH is required for the pathway alone, against roughly 6 mmol h⁻¹ generated by 3.0 mmol h⁻¹ of flux through the two oxidative steps — adequate now, but not if product flux is to be raised five-fold, since biosynthesis also draws on the same pool. NADPH supply is therefore the constraint that will appear next.

(c) (i) Limit glucose uptake by feeding rather than batch, which suppresses the overflow to acetate; side effect: lower specific rates throughout, so volumetric productivity may fall even as yield rises. (ii) Push more carbon through the pentose phosphate pathway (over-express its first enzymes, or delete phosphoglucose isomerase to force flux through it); side effect: the pathway releases one CO₂ per glucose-6-phosphate oxidised, so carbon yield falls — you are buying NADPH with carbon, and the trade must be checked against [[#prop-max-yield]] rather than assumed to be favourable. A balanced answer raises both product-pathway enzymes and NADPH supply while restraining uptake, and then re-measures the flux map, because every one of these changes moves the control.
:::
:::
