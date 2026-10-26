A machine has an environmental cost long before it is switched on and long after it is switched off. Ore is mined and smelted, polymers are made from oil and gas, parts are cast, machined and moulded, the product is shipped, it consumes energy and consumables for years, and at the end it is landfilled, burnt or — if the designer made it possible — repaired, remanufactured or recycled. The designer fixes most of these flows: the choice of material sets the energy and emissions of production, the mass and efficiency set the energy of use, and the way the parts are joined decides whether anything can be recovered. This chapter gives the quantitative tools for those decisions. It starts with **life-cycle assessment** (LCA) as standardised in ISO 14040 and ISO 14044, then the quick **eco-audit** used in the concept and embodiment phases, the arithmetic of embodied energy and carbon, recycled content and the use phase (including the classic lightweighting break-even), the accounting of a company's emissions in Scopes 1, 2 and 3, and finally design for disassembly, remanufacture and the circular economy, with the EU ecodesign rules that now make some of this a legal requirement. The materials data build on [[materials-science]]; the cost and assembly arguments are those of [[design-process/design-for-manufacture]].

## Life-cycle thinking {#sec-life-cycle}

The life of a product is conventionally divided into five phases: **material** production (extraction and refining of the raw materials), **manufacture** (shaping, joining, finishing, assembly), **transport** (to the customer, and of parts between factories), **use** (energy, consumables, maintenance) and **end of life** (collection, disassembly, reuse, recycling, incineration, landfill). The sum of the burdens over all five phases — energy, greenhouse-gas emissions, water, toxic releases, land use — is the product's environmental footprint. The decisive point for a designer is that the distribution between the phases varies enormously between products: a disposable drinks bottle has almost all its burden in the material, an electric pump almost all of it in the use phase. Effort spent on the wrong phase achieves nothing, so the first job is always to find out which phase dominates.

::: definition Life-cycle assessment, functional unit and system boundary {#def-lca}
**Life-cycle assessment** (LCA) is the compilation and evaluation of the inputs, outputs and potential environmental impacts of a product system throughout its life cycle (ISO 14040:2006). Two choices make an LCA meaningful:

- The **functional unit** is the quantified performance that the compared systems deliver — for example "supporting a 2 kN load at 300 mm for 15 years", "delivering $10^4\,\mathrm m^3$ of water against a head of 20 m", or "1 km driven by a mid-size car" — and every flow is expressed per functional unit. Two products are compared only on the same functional unit.
- The **system boundary** states which processes are included: *cradle-to-gate* (materials and manufacture, up to the factory gate), *cradle-to-grave* (all five phases) or *cradle-to-cradle* (with the end-of-life material returned to production). Cut-off criteria (for example: flows below 1 % of mass are ignored) are stated explicitly.
:::

ISO 14040 sets out the principles and framework and ISO 14044 the requirements and guidelines; both were published in 2006, replacing the first ISO 14040-series standards of 1997–2000, and ISO 14044 was amended in 2017 and 2020. They describe four iterative phases.

::: algorithm The four phases of an LCA (ISO 14040/14044) {#alg-lca}
1. **Goal and scope definition.** State the purpose and audience (an internal design comparison, an environmental product declaration, a public comparative claim — the last requires a critical review), the functional unit, the system boundary, allocation rules for co-products and recycling, the impact categories, and the data quality requirements.
2. **Life-cycle inventory (LCI).** Build a process model and collect the input and output flows of every process inside the boundary — materials, energy, emissions to air, water and soil, wastes — scaled to the functional unit. Primary data come from the company's own processes, background data (electricity mixes, steel, polymers, transport) from databases such as ecoinvent.
3. **Life-cycle impact assessment (LCIA).** Assign the inventory flows to impact categories (climate change, acidification, eutrophication, ozone depletion, resource depletion, toxicity …) and multiply by characterisation factors to obtain category indicators — for climate change, kilograms of CO₂-equivalent.
4. **Interpretation.** Identify the significant flows and phases, check completeness, consistency and sensitivity to the main assumptions, and draw conclusions and recommendations that are consistent with the goal and scope.
:::

A full LCA of a product takes weeks and needs data that do not exist during concept design. Designers therefore work with a reduced version that tracks one or two indicators — usually primary energy and CO₂-equivalent — through the five phases with rounded data. Ashby calls this an **eco-audit**. It is an LCA without the impact-assessment breadth, and it is what this chapter uses from here on.

::: definition Embodied energy, carbon footprint and CO₂-equivalent {#def-embodied}
The **embodied energy** $H_m$ of a material (MJ/kg) is the primary energy consumed to produce one kilogram of it from raw resources, including the energy of the fuels, electricity generation and transport in the supply chain. The **embodied carbon** or **carbon footprint** of production $c_m$ (kg CO₂e/kg) is the corresponding mass of greenhouse gases. Gases are combined by their **global warming potential** over 100 years, GWP$_{100}$, relative to CO₂: the IPCC Sixth Assessment Report (2021) gives 29.8 for fossil methane, 27.0 for non-fossil methane and 273 for nitrous oxide, so that
$$
m_{\mathrm{CO_2e}} = \sum_i \mathrm{GWP}_i\,m_i .
$$ {#eq-co2e}
:::

Embodied data vary with the production route, the producer and above all the electricity used, so every value carries an uncertainty of typically ±10–20 % and must be quoted with its source and date. The table gives round values of the order found in Ashby's *Materials and the Environment* (3rd edition, 2021) and similar inventories; they are used in all the examples of this chapter but are for learning only — a real study takes data for the actual supplier.

| material | embodied energy $H_m$ (MJ/kg) | carbon $c_m$ (kg CO₂e/kg) | value used here |
|---|---|---|---|
| carbon steel, primary | 22–30 | 1.7–2.4 | 2.0 |
| aluminium alloy, primary | 190–220 | 11–14 | 12 |
| aluminium alloy, recycled | 25–35 | 1–3 | 2.0 |
| copper, primary | 55–70 | 3.5–4.5 | 4.0 |
| polypropylene | 70–90 | 2.5–3.5 | 3.0 |
| CFRP (epoxy matrix) | 250–300 | 20–25 | 22 |

Two facts in this table drive many design decisions. First, light metals and composites cost far more energy per kilogram than steel: aluminium about six times, CFRP about ten times. Second, recycling aluminium needs only a small fraction (of the order of 10–15 %) of the energy of primary production, because the metal is only remelted rather than reduced from alumina by electrolysis.

## The eco-audit {#sec-eco-audit}

::: algorithm Eco-audit of a product {#alg-eco-audit}
1. Write the **bill of materials**: each part's material and mass $m_j$, and its main shaping process.
2. **Material phase**: $C_{\mathrm{mat}} = \sum_j m_j c_{m,j}$ (and the same with $H_m$ for energy).
3. **Manufacture**: add the processing energy or carbon per kilogram shaped (casting, machining, moulding — typically a fraction of the material value for metals).
4. **Transport**: mass × distance × emission factor per tonne-kilometre of the mode (sea, rail, road, air differ by more than an order of magnitude).
5. **Use**: energy consumed over the life × emission factor of the energy carrier (kg CO₂e per kWh of electricity, per litre of fuel), plus consumables.
6. **End of life**: the burden of disposal, and — reported separately — any credit for recycling or reuse.
7. Draw the five phases as a bar chart, identify the dominant phase, and direct the design effort there. Repeat with the main data varied (electricity mix, life, usage) to see whether the ranking is robust.
:::

::: example Eco-audit of a heating circulator pump {#ex-pump-audit}
A domestic central-heating circulator pump contains $1.5\,\mathrm{kg}$ of steel (housing and shaft), $0.5\,\mathrm{kg}$ of copper (motor winding), $0.3\,\mathrm{kg}$ of aluminium (motor frame) and $0.2\,\mathrm{kg}$ of polypropylene (impeller and cover). It draws $40\,\mathrm W$ for $5000\,\mathrm h$ a year for 15 years. Take the carbon data of the table, $3\,\mathrm{kg}$ CO₂e for manufacture and $0.5\,\mathrm{kg}$ for transport, and an electricity emission factor of $0.25\,\mathrm{kg\,CO_2e/kWh}$ (the order of magnitude of a mid-2020s European grid average). Where should the designer act?
::: solution
**Material:** $1.5\times2.0 + 0.5\times4.0 + 0.3\times12 + 0.2\times3.0 = 3.0 + 2.0 + 3.6 + 0.6 = 9.2\,\mathrm{kg\,CO_2e}$. Note that the 0.3 kg of aluminium contributes more than the 1.5 kg of steel.

**Manufacture and transport:** $3 + 0.5 = 3.5\,\mathrm{kg}$.

**Use:** energy $40\,\mathrm W \times 5000\,\mathrm h/\mathrm{yr}\times15\,\mathrm{yr} = 3.0\times10^6\,\mathrm{Wh} = 3000\,\mathrm{kWh}$, emissions $3000\times0.25 = 750\,\mathrm{kg\,CO_2e}$.

**Total** (before end of life) $\approx 763\,\mathrm{kg}$, of which the use phase is $750/763 = 98\,\%$.

Replacing the aluminium frame by steel would save a few kilograms at most; a pump that does the same hydraulic work with a more efficient motor and speed control so that it averages $10\,\mathrm W$ would use $750\,\mathrm{kWh}$ and emit $187.5\,\mathrm{kg}$ — a saving of $562.5\,\mathrm{kg}$, a hundred times more than any change of material. This is why EU ecodesign rules for circulators regulate their energy efficiency, not their materials.

*Sanity check:* even if the electricity were five times cleaner ($0.05\,\mathrm{kg/kWh}$) the use phase would still be $150\,\mathrm{kg}$, about 90 % of the total; the conclusion is robust to the main uncertainty.
:::
:::

The pump is typical of anything that runs continuously from the mains: motors, compressors, fans, refrigerators, lighting. Products without energy use in service — furniture, hand tools, packaging, structural brackets — have their burden in the material phase, and there the choice and amount of material matters most. Vehicles are the interesting middle case, because the material choice changes the mass and the mass changes the use-phase fuel.

## Materials, recycling and the use phase {#sec-materials-use}

### Recycled content and the end-of-life credit

::: proposition Embodied carbon with recycled content {#prop-recycled}
If a fraction $r$ of a material is recycled (secondary) and $1-r$ primary, with carbon intensities $c_s$ and $c_p$, the embodied carbon per kilogram is
$$
c(r) = (1-r)\,c_p + r\,c_s = c_p - r\,(c_p - c_s),
$$ {#eq-recycled}
which falls linearly with $r$ at the rate $c_p - c_s$.
:::

::: proof
One kilogram of the mixed material consists of $1-r$ kg made by the primary route and $r$ kg by the secondary route. The inventory is additive over the mass produced by each route, so the burdens add: $(1-r)c_p + r c_s$. The assumptions are that the two routes give interchangeable material and that the remelting and alloy-adjustment burden is included in $c_s$.
:::

Where recycling is credited is a modelling choice with real consequences. In the **recycled-content** (or *cut-off*) approach, a product is credited for the secondary material it *uses*, as in [[#eq-recycled]], and gets nothing for being recyclable. In the **end-of-life** (or *avoided-burden*, *substitution*) approach, the product carries the primary burden but receives a credit at the end of its life for the primary material that its recycled scrap will replace, typically $f_{\mathrm{rec}}(c_p - c_s)$ per kilogram with $f_{\mathrm{rec}}$ the fraction actually recovered. The first rewards using recycled material today; the second rewards designing for recovery tomorrow. ISO 14044 requires the choice to be stated and applied consistently.

::: warning Counting the same recycling twice
A product that is modelled with recycled input *and* with an end-of-life recycling credit has been credited twice for the same scrap — once when the scrap entered and once when it leaves. Choose one allocation approach and use it for every option in the comparison. Equally common: comparing products with different functional units (one bracket against another that lasts half as long), or reporting a cradle-to-gate figure next to a cradle-to-grave one. An LCA comparison is only as fair as its goal and scope definition.
:::

### Use phase: lightweighting a vehicle part

For a car, the fuel consumption attributable to each kilogram of mass is expressed by a **fuel reduction value**, the change in consumption per unit change of mass. Published LCA studies use values from a few hundredths to about one litre per 100 km per 100 kg depending on the vehicle, the driving cycle and whether the powertrain is resized for the lighter car; a few tenths is typical for a petrol car. This chapter uses $\beta = 0.3\,\mathrm{L}$ per 100 km per 100 kg, i.e. $3\times10^{-5}\,\mathrm{L/(km\,kg)}$, and $2.3\,\mathrm{kg}$ of CO₂ per litre of petrol burnt (tank-to-wheel). Every kilogram carried over one kilometre then costs
$$
u = \beta c_f = 3\times10^{-5}\times2.3 = 6.9\times10^{-5}\,\mathrm{kg\,CO_2/(km\,kg)} ,
$$
or $0.069\,\mathrm{kg}$ per 1000 km per kilogram.

::: proposition Break-even distance for a lighter, more carbon-intensive part {#prop-breakeven}
A part of mass $m_1$ and production carbon intensity $c_1$ is replaced by one of mass $m_2 < m_1$ and intensity $c_2$ with $m_2c_2 > m_1c_1$. With use-phase emissions $u$ per kilogram per kilometre, the replacement reduces the life-cycle emissions if and only if the distance driven exceeds
$$
x^* = \frac{m_2c_2 - m_1c_1}{(m_1 - m_2)\,u}.
$$ {#eq-breakeven}
:::

::: proof
Over a distance $x$ the cumulative emissions of each option are production plus use: $E_i(x) = m_ic_i + m_iux$. These are straight lines in $x$; the lighter part starts higher ($m_2c_2 > m_1c_1$) but rises less steeply ($m_2u < m_1u$). Setting $E_1(x^*) = E_2(x^*)$ gives $m_1c_1 + m_1ux^* = m_2c_2 + m_2ux^*$, hence $x^*(m_1 - m_2)u = m_2c_2 - m_1c_1$. For $x > x^*$, $E_2 < E_1$. Assumptions: the fuel saving is proportional to mass, $u$ is constant over the life, and the end-of-life phase is the same for both (or included in $c_i$). If $m_2c_2 \le m_1c_1$ the lighter part wins at every distance.
:::

::: example Steel or aluminium for a suspension arm {#ex-breakeven}
A steel suspension component of $20\,\mathrm{kg}$ can be redesigned in aluminium at $11\,\mathrm{kg}$ (aluminium's lower density is partly offset by the larger sections needed for its lower modulus and fatigue strength). Using the chapter's data, find the break-even distance for primary aluminium and for an alloy with 50 % recycled content, and compare the totals over a $200\,000\,\mathrm{km}$ car life.
::: solution
**Production:** steel $20\times2.0 = 40\,\mathrm{kg\,CO_2e}$; primary aluminium $11\times12 = 132\,\mathrm{kg}$. The aluminium part starts $92\,\mathrm{kg}$ behind.

**Use:** the saving is $(20 - 11)\times6.9\times10^{-5} = 6.21\times10^{-4}\,\mathrm{kg/km}$.

**Break-even** from [[#eq-breakeven]]: $x^* = 92/6.21\times10^{-4} = 1.48\times10^5\,\mathrm{km}$, about $148\,000\,\mathrm{km}$.

**With 50 % recycled content**, [[#eq-recycled]] gives $c = 12 - 0.5\times(12 - 2) = 7.0\,\mathrm{kg/kg}$, production $77\,\mathrm{kg}$, extra $37\,\mathrm{kg}$ and $x^* = 37/6.21\times10^{-4} \approx 59\,600\,\mathrm{km}$.

**Over $200\,000\,\mathrm{km}$:** steel $40 + 20\times6.9\times10^{-5}\times2\times10^5 = 40 + 276 = 316\,\mathrm{kg}$; primary aluminium $132 + 151.8 = 283.8\,\mathrm{kg}$ — a saving of about 10 %, but only if the car really reaches the distance. For a vehicle that covers $100\,000\,\mathrm{km}$, primary aluminium would be worse than steel.

*Sanity check:* units — $\mathrm{kg}/(\mathrm{kg\,km^{-1}}) = \mathrm{km}$. Limiting case: if aluminium had the carbon intensity of steel, $x^* < 0$ and the lighter part wins immediately, as it should.
:::
:::

::: widget plot
f: 40 + 20*0.23*b*x; 11*(12 - 10*r) + 11*0.23*b*x
x: 0, 300
y: 0, 450
sliders: r=0:0:1:0.05; b=0.3:0.05:1:0.05
labels: \text{steel, 20 kg}; \text{aluminium, 11 kg}
caption: Cumulative CO₂e (kg) of the suspension part of [[#ex-breakeven]] against distance driven (thousands of km), with $r$ the recycled fraction of the aluminium and $b$ the fuel reduction value in L per 100 km per 100 kg. The lines cross at the break-even distance. Raise $r$ and watch the crossing move towards zero — above $r \approx 0.84$ the aluminium part is better from the first kilometre. Raise $b$ (a heavier, thirstier vehicle) and the crossing moves left; for an electric car on a clean grid, $b$ is effectively small and lightweighting pays back much later.
:::

The same arithmetic, with the energy of the use phase in place of fuel, applies to aircraft (where each kilogram saved is worth far more because the mass must be lifted and carried for tens of millions of kilometres), to reciprocating machine parts, and — in reverse — to the question of whether to replace an old, inefficient product by a new, efficient one.

::: example Should an old refrigerator be replaced? {#ex-replace}
An old refrigerator uses $450\,\mathrm{kWh}$ a year; an efficient replacement of the same volume uses $150\,\mathrm{kWh}$ a year. The manufacturer's published LCA of the new model gives $350\,\mathrm{kg\,CO_2e}$ for its materials, manufacture, transport and end of life. With $0.25\,\mathrm{kg\,CO_2e/kWh}$, after how many years has the replacement paid back its embodied carbon?
::: solution
Annual saving $(450 - 150)\times0.25 = 75\,\mathrm{kg\,CO_2e}$; payback $350/75 = 4.67$ years. If the old appliance would otherwise run for many more years, replacement is clearly worthwhile. On a grid five times cleaner ($0.05\,\mathrm{kg/kWh}$) the payback is $350/15 = 23$ years, longer than the new appliance's life: there, keeping and repairing the old one would be the better choice.

*Sanity check:* payback scales inversely with the emission factor and with the efficiency gap, as it should — the decarbonisation of electricity shifts the balance of the life cycle from use towards production, which is why reparability and durability matter more each year.
:::
:::

::: quiz
Two designs of an office chair are compared in an LCA. Design A weighs 14 kg and is guaranteed for 5 years; design B weighs 18 kg and is guaranteed for 10 years with replaceable upholstery and castors. Which functional unit makes the comparison fair?
- [ ] one chair
- [ ] one kilogram of chair
- [x] seating one person for 10 years
- [ ] the materials of one chair, cradle-to-gate
::: solution
The function is seating a person over time, so the functional unit must include the duration: over 10 years two A chairs are needed against one B (plus any replacement parts). Comparing "one chair" or "one kilogram" ignores durability, which is often the most effective environmental property of a design.
:::
:::

## Accounting for an organisation: Scopes 1, 2 and 3 {#sec-scopes}

Products are assessed by LCA; companies report their emissions under the **Greenhouse Gas Protocol**, developed by the World Resources Institute and the World Business Council for Sustainable Development (Corporate Standard 2001, revised 2004; Corporate Value Chain (Scope 3) Standard 2011). Engineers meet it because a company's targets — and its customers' — increasingly reach into the design of its products.

::: definition Scope 1, 2 and 3 emissions {#def-scopes}
- **Scope 1**: direct emissions from sources the company owns or controls — fuel burnt in its boilers, furnaces and vehicles, process emissions, refrigerant leaks.
- **Scope 2**: indirect emissions from the generation of purchased electricity, steam, heat and cooling that the company consumes.
- **Scope 3**: all other indirect emissions in the value chain, in 15 categories — upstream (for example category 1, purchased goods and services; category 4, transport) and downstream (for example category 11, use of sold products, which counts the expected *lifetime* emissions of the products sold in the reporting year; category 12, their end-of-life treatment).
:::

::: example Where a compressor manufacturer's emissions are {#ex-scopes}
In one year a manufacturer of industrial air compressors burns gas worth $500\,\mathrm{MWh}$ ($0.18\,\mathrm{kg\,CO_2e/kWh}$), buys $2000\,\mathrm{MWh}$ of electricity ($0.25\,\mathrm{kg/kWh}$), buys $3000\,\mathrm t$ of steel ($2.0\,\mathrm{t\,CO_2e/t}$) and sells $10\,000$ compressors of $7.5\,\mathrm{kW}$, each expected to run $3000\,\mathrm h$ a year for 12 years. Estimate Scopes 1, 2 and the two Scope 3 categories, and the share of category 11.
::: solution
Scope 1: $500\times10^3\,\mathrm{kWh}\times0.18 = 90\,\mathrm t$. Scope 2: $2\times10^6\times0.25 = 500\,\mathrm t$. Scope 3, category 1: $3000\times2.0 = 6000\,\mathrm t$. Category 11: $10\,000\times7.5\,\mathrm{kW}\times3000\,\mathrm h\times12 = 2.7\times10^9\,\mathrm{kWh}$, times $0.25$ gives $675\,000\,\mathrm t$. Total $681\,590\,\mathrm t$, of which category 11 is $99.0\,\%$.

The factory's own emissions (Scopes 1 and 2) are less than 0.1 % of the total; even the steel is under 1 %. A 1 % improvement in the efficiency of the compressors' motors and air ends removes more CO₂ than shutting the factory down. *Sanity check:* $7.5\,\mathrm{kW}$ for $36\,000\,\mathrm h$ is $270\,\mathrm{MWh}$ per machine, about $67.5\,\mathrm t$ of CO₂ — far more than the roughly half-tonne of steel in it embodies.
:::
:::

## Designing for the end of life {#sec-end-of-life}

The EU **waste hierarchy** (Waste Framework Directive 2008/98/EC) orders the treatment options: prevention, preparing for re-use, recycling, other recovery (such as energy recovery), and disposal. The **circular economy** extends the same idea into design: keep products, components and materials in use at their highest value for as long as possible. In order of preference the inner loops are *maintain and repair* (the product stays with its user), *reuse and refurbish* (it passes to another user), *remanufacture* (it is disassembled, worn parts are replaced or restored, and it is reassembled to as-new specification with a new warranty — common for engine and gearbox parts, starter motors, toner cartridges and hydraulic pumps), and *recycle* (only the material is kept). Each loop outward loses the energy and labour embodied in the shape, so the tighter loops are worth more.

::: definition Design for disassembly {#def-dfd}
**Design for disassembly** (DfD) is the set of design rules that make it quick and non-destructive to take a product apart for repair, upgrade, remanufacture or material separation:

- use few fasteners, of few types, all accessible from one direction and released with standard tools; avoid adhesives and moulded-in metal inserts where materials must be separated;
- make wear and failure-prone parts (batteries, seals, bearings, filters, brushes) replaceable without disturbing the rest;
- minimise the number of different materials, avoid incompatible combinations (for example copper in steel scrap, filled with unfilled polymers), and mark polymer parts with their material code (ISO 11469);
- make the disassembly sequence obvious, and document it.
:::

DfD sometimes conflicts with design for assembly ([[design-process/design-for-manufacture]]): a snap fit is fast to assemble and may be impossible to release; a bonded joint saves fasteners but locks two materials together. Reversible snap fits, quarter-turn fasteners and screws that are few and accessible serve both aims.

::: example A drill battery pack: glued or screwed? {#ex-battery-pack}
A cordless-drill battery pack has a two-part housing. Version A is ultrasonically welded shut; version B is closed by four screws. Opening A without damage is impossible, so a failed cell means the whole pack (cells, electronics and housing, $0.6\,\mathrm{kg}$) is scrapped. In version B the failed cell group can be replaced. Suppose the cells account for $70\,\%$ of the pack's production footprint of $10\,\mathrm{kg\,CO_2e}$, that half the packs that fail could be repaired by replacing one of two cell groups, and that the screws add $5\,\mathrm s$ to assembly. Is version B worthwhile?
::: solution
Replacing one of two cell groups re-uses the housing, electronics and the other cell group: the avoided production is $10 - 0.5\times7 = 6.5\,\mathrm{kg\,CO_2e}$ per repaired pack, and since half the failed packs are repairable the expected saving is $3.25\,\mathrm{kg}$ per failed pack. The cost is $5\,\mathrm s$ of assembly labour per pack (a few pence) and four screws. Version B is clearly better environmentally; whether it pays commercially depends on the repair channel — which is why regulation increasingly requires it (see below).

*Sanity check:* the result scales with the fraction of the footprint that is *not* in the failed part; for a product whose value is concentrated in a single non-replaceable component, repairability gains little.
:::
:::

### Regulation: from ecodesign to product passports

The EU **Ecodesign Directive 2009/125/EC** (which replaced Directive 2005/32/EC) set a framework for energy-related products, under which product-specific regulations fixed minimum efficiencies and other requirements — for electric motors, circulators, fans, pumps, lighting, household appliances and many more. In July 2024 the **Ecodesign for Sustainable Products Regulation** (EU) 2024/1781 (ESPR) entered into force. It extends ecodesign to almost all physical products and to requirements beyond energy: durability, reparability, upgradability, recycled content, presence of substances of concern, and information requirements, set product group by product group through delegated acts. Implementing measures adopted under the old Directive remain in force until they are replaced. The ESPR introduces a **digital product passport** — product data accessible through a data carrier such as a QR code, for customers, repairers, recyclers and authorities — and bans large companies from destroying unsold apparel, clothing accessories and footwear from 19 July 2026. Requirements for specific product groups are being adopted in stages; check the current position for a given product rather than relying on this summary (as of 2026).

::: history
Life-cycle studies began with packaging. In 1969 Harry Hunt of the Midwest Research Institute led a study for the Coca-Cola Company comparing the resources and wastes of different drinks containers, usually cited as the first LCA. In 1987 the World Commission on Environment and Development (the Brundtland Commission) published *Our Common Future*, defining sustainable development as development that meets the needs of the present without compromising the ability of future generations to meet their own needs. The ISO 14040 series standardised LCA from 1997 and was consolidated into ISO 14040 and ISO 14044 in 2006. The Greenhouse Gas Protocol's corporate standard (2001, revised 2004) introduced the three scopes, and its Scope 3 standard followed in 2011. In the EU, ecodesign moved from energy efficiency (Directive 2005/32/EC, recast as 2009/125/EC) to the broad Ecodesign for Sustainable Products Regulation of 2024.
:::

::: summary
- An LCA (ISO 14040/14044) has four phases — goal and scope, inventory, impact assessment, interpretation — and is meaningful only for a stated functional unit and system boundary.
- An eco-audit tracks energy or CO₂e through the material, manufacture, transport, use and end-of-life phases; find the dominant phase first, then design for it.
- Embodied carbon per kilogram differs by an order of magnitude between steel and aluminium or CFRP; recycled aluminium needs only a small fraction of the energy of primary metal, and $c(r) = c_p - r(c_p - c_s)$.
- For energy-using products the use phase usually dominates; for vehicles, a lighter but more carbon-intensive part pays back after $x^* = (m_2c_2 - m_1c_1)/((m_1-m_2)u)$, which depends strongly on recycled content and vehicle life.
- Companies report Scope 1 (own combustion), Scope 2 (purchased energy) and Scope 3 (value chain); for makers of energy-using products, Scope 3 category 11 (use of sold products) often dwarfs the rest.
- Keep materials in the tightest loop possible — repair, reuse, remanufacture before recycling — by designing for disassembly; choose one recycling-allocation approach and do not double count.
- EU ecodesign law now covers durability, reparability, recycled content and product passports as well as efficiency.
:::

## Exercises

::: exercise Embodied carbon with recycled content {#exr-recycled level=1 check="25.6"}
An aluminium bracket of $3.2\,\mathrm{kg}$ is made from an alloy with 40 % recycled content. Using $c_p = 12$ and $c_s = 2.0\,\mathrm{kg\,CO_2e/kg}$, find its embodied carbon. (Enter it in kg CO₂e.)
::: solution
$c = 12 - 0.4\times(12 - 2) = 8.0\,\mathrm{kg/kg}$; $3.2\times8.0 = 25.6\,\mathrm{kg\,CO_2e}$. With primary metal only it would be $38.4\,\mathrm{kg}$.
:::
:::

::: exercise CO₂-equivalent of a process {#exr-co2e level=1 check="159.6"}
A process emits $100\,\mathrm{kg}$ of CO₂ and $2\,\mathrm{kg}$ of fossil methane. Using the GWP$_{100}$ values of [[#def-embodied]], what is the total in CO₂-equivalent? (Enter it in kg CO₂e.)
::: solution
$100 + 2\times29.8 = 159.6\,\mathrm{kg\,CO_2e}$. The 2 kg of methane contribute more than a third of the total.
:::
:::

::: exercise Lifetime energy of a compressor {#exr-compressor level=1 check="67.5"}
A $7.5\,\mathrm{kW}$ compressor runs $3000\,\mathrm h$ a year for 12 years on electricity at $0.25\,\mathrm{kg\,CO_2e/kWh}$. What are its use-phase emissions? (Enter them in tonnes of CO₂e.)
::: solution
$7.5\times3000\times12 = 270\,000\,\mathrm{kWh}$; $\times0.25 = 67\,500\,\mathrm{kg} = 67.5\,\mathrm t$.
:::
:::

::: exercise A CFRP bonnet {#exr-cfrp level=2 check="261"}
A steel bonnet of $15\,\mathrm{kg}$ is replaced by a CFRP bonnet of $7.5\,\mathrm{kg}$. Using the chapter's data ($c = 2.0$ for steel, $22$ for CFRP, $u = 6.9\times10^{-5}\,\mathrm{kg/(km\,kg)}$), find the break-even distance. (Enter it in thousands of km, rounded to the nearest whole number.)
::: solution
Extra production carbon $7.5\times22 - 15\times2.0 = 165 - 30 = 135\,\mathrm{kg}$. Saving $7.5\times6.9\times10^{-5} = 5.175\times10^{-4}\,\mathrm{kg/km}$. $x^* = 135/5.175\times10^{-4} = 260\,870\,\mathrm{km} \approx 261$ thousand km — longer than the life of most cars, so on this basis the CFRP bonnet does not pay back (unless recycled fibre or a lower-carbon process is used, or end-of-life differences are included).
:::
:::

::: exercise Replacing a motor {#exr-motor level=2 check="2379"}
A motor delivering $11\,\mathrm{kW}$ of shaft power for $4000\,\mathrm h$ a year has an efficiency of 89 %. A replacement has 93.5 %. How much electrical energy does the replacement save per year? (Enter it in kWh, rounded to the nearest whole number.) If the new motor's embodied footprint is $400\,\mathrm{kg\,CO_2e}$ and electricity is $0.25\,\mathrm{kg/kWh}$, what is the carbon payback time?
::: solution
Input energy $= 11\times4000/\eta$: old $49\,438\,\mathrm{kWh}$, new $47\,059\,\mathrm{kWh}$, saving $2379\,\mathrm{kWh}$ a year. Carbon saving $2379\times0.25 = 595\,\mathrm{kg/yr}$, payback $400/595 = 0.67$ years — about eight months. Motors running long hours are among the most worthwhile replacements, which is why minimum motor efficiencies were among the first ecodesign requirements.
:::
:::

::: exercise Scope 3 share {#exr-scopes level=2 check="99.0"}
For the compressor manufacturer of [[#ex-scopes]], what percentage of the total is Scope 3 category 11? (Enter it in %, rounded to one decimal place.) Then recompute it if the expected life is 6 years instead of 12.
::: solution
$675\,000/681\,590 = 99.03\,\% \approx 99.0\,\%$. With a 6-year life, category 11 halves to $337\,500\,\mathrm t$ and the share becomes $337\,500/344\,090 = 98.1\,\%$ — still overwhelmingly dominant. (A shorter assumed life does not reduce real emissions; it only shortens the period counted, a reason why such assumptions must be disclosed.)
:::
:::

::: exercise Recycled content for immediate benefit {#exr-rstar level=3 check="0.836"}
For the suspension arm of [[#ex-breakeven]] (steel $20\,\mathrm{kg}$ at $c = 2.0$; aluminium $11\,\mathrm{kg}$ with $c_p = 12$, $c_s = 2.0$), derive the recycled fraction $r^*$ above which the aluminium part has lower emissions at every distance, and evaluate it. (Enter $r^*$ rounded to three decimal places.)
::: solution
The aluminium part wins from $x = 0$ when its production carbon does not exceed the steel part's: $m_a\,c(r) \le m_sc_s$, i.e. $m_a[c_p - r(c_p - c_{s,\mathrm{Al}})] \le m_sc_{\mathrm{steel}}$, so
$$
r^* = \frac{c_p - m_sc_{\mathrm{steel}}/m_a}{c_p - c_{s,\mathrm{Al}}} = \frac{12 - 40/11}{12 - 2} = \frac{12 - 3.636}{10} = 0.836 .
$$
Above about 84 % recycled content the lighter part is better from the first kilometre, consistent with the plot. In practice such high recycled content is available for castings and some extrusions, less so for high-strength wrought alloys, which need clean scrap.
:::
:::

::: exercise Designing a washing machine for the circular economy {#exr-washing level=3}
A manufacturer wants to cut the life-cycle footprint of its washing machines. The use phase (electricity for heating water, and detergent) dominates, followed by the steel, concrete counterweight, motor and electronics in production; machines are often scrapped after 8–10 years because of failed bearings, which are pressed into a welded plastic drum, or control boards. Propose and justify design changes in each of the following directions, and say how you would check their benefit quantitatively: (a) use-phase energy, (b) durability and reparability, (c) end of life, (d) business model (sale, lease or remanufacture).
::: solution
(a) Most energy goes into heating water, so lower wash temperatures with enzymatic detergents, better load sensing and water metering, and heat-pump drying (for washer-dryers) save more than any material change; a brushless motor with variable-speed drive improves spin efficiency. Quantify with an eco-audit per functional unit "washing $x$ kg of laundry per year for $N$ years" under a standard usage profile. (b) A bolted or clamped two-part drum makes the bearings replaceable; standard bearings and seals, a modular control board with a diagnostic interface, and published spare-part availability extend the life — a life of 15 instead of 10 years cuts production burden per functional unit by a third. (c) Separable counterweights (concrete is often moulded around fixings; a steel or cast-iron weight is recyclable), marked polymers, few material types and screwed rather than glued assemblies raise the recovered fraction. (d) Leasing, with the manufacturer taking machines back, aligns its income with durability and enables remanufacture of drums and motors; the benefit is checked by comparing footprint per wash-year for the linear and the circular system, with the take-back logistics included. A good answer notes the trade-offs: longer life locks in today's efficiency, so the use-phase improvement rate of new models must be weighed against replacement (compare [[#ex-replace]]).
:::
:::

::: exercise Derivation: when does the use phase dominate? {#exr-dominance level=3}
A product of mass $m$ (average material carbon $\bar c$ per kg, with manufacture adding a fraction $k$ of the material value) draws average power $P$ for $t$ hours over its life on electricity of intensity $g$ (kg CO₂e/kWh). Derive the condition for the use phase to exceed a fraction $\phi$ of the total footprint, and apply it with $\bar c = 4\,\mathrm{kg/kg}$, $k = 0.3$, $g = 0.25$ to a $2\,\mathrm{kg}$ product that must use at least 90 % of its footprint in service. Interpret the result.
::: solution
Production $C_p = (1+k)m\bar c$, use $C_u = Pt\,g$ (with $P$ in kW). $C_u/(C_u + C_p) > \phi \iff C_u > \frac{\phi}{1-\phi}C_p$, i.e.
$$
Pt > \frac{\phi}{1-\phi}\,\frac{(1+k)m\bar c}{g}.
$$
Numbers: $C_p = 1.3\times2\times4 = 10.4\,\mathrm{kg}$; $\phi/(1-\phi) = 9$; $Pt > 9\times10.4/0.25 = 374\,\mathrm{kWh}$ over the life. A $10\,\mathrm W$ device must run $37\,400\,\mathrm h$ (over four years continuously); a $1\,\mathrm{kW}$ device only $374\,\mathrm h$. Products that run continuously, or at high power for a moderate time, are use-dominated; small, rarely used devices are production-dominated. As $g$ falls with grid decarbonisation the threshold rises in proportion, and more products become production-dominated.
:::
:::

## Further reading

Ashby's *Materials and the Environment* (3rd edition, Butterworth-Heinemann, 2021) develops the eco-audit and gives embodied energy and carbon data for most engineering materials; ISO 14040:2006 and ISO 14044:2006 are the normative references for LCA, and the GHG Protocol's Corporate and Scope 3 Standards (World Resources Institute and WBCSD, 2004 and 2011) for company accounting. Allwood and Cullen's *Sustainable Materials: With Both Eyes Open* (UIT Cambridge, 2012) analyses where the energy of steel and aluminium goes and how design can use less of it.
