Sustainability in engineering design is the practice of designing products that meet the needs of the present without compromising the ability of future generations to meet their own needs. The definition is from the Brundtland Report (1987), and the definition is the reason the engineer's obligation extends beyond the customer's requirement to the planet's carrying capacity. **The product that is cheap, reliable, and manufacturable but consumes 3× the energy of its competitor, uses a material that cannot be recycled, and ends up in a landfill after 2 years is not a good design — it is a deferred environmental liability.**

The quantitative tools of sustainable design are the **life-cycle assessment** (LCA), the **carbon footprint**, the **material selection for sustainability**, and the **circular economy** principles. The LCA quantifies the environmental impact of the product from cradle to grave: the raw material extraction, the manufacturing, the transport, the use, and the end-of-life. The carbon footprint is the LCA's most important output, because the carbon is the constraint that the planet is imposing on the engineer: the Paris Agreement target of 1.5 °C requires a 45 % reduction in CO₂ emissions by 2030 and a net-zero by 2050, and the reduction must come from the products that the engineer designs. **The engineer who designs a product that consumes 10 kW for 20 years is responsible for 10 × 8 760 × 20 × 0.4 kg CO₂/kWh = 700 tonnes of CO₂, and the 700 tonnes are the engineer's carbon legacy.**

::: warning Nine ways sustainable design goes wrong
**Not doing the life-cycle assessment.** The engineer who optimises the manufacturing energy (5 % of the life cycle) without considering the use-phase energy (70–90 % of the life cycle) is optimising the wrong variable. **Do the LCA first, and the LCA tells you where the impact is. For a motor, the impact is in the use phase; for a phone, the impact is in the material extraction; for a wind turbine, the impact is in the transport.** **Confusing the carbon footprint with the total environmental impact.** The carbon footprint is the CO₂ equivalent, but the total environmental impact includes the water use, the toxicity, the eutrophication, the ozone depletion, and the resource depletion. **A product can have a low carbon footprint and a high toxicity (a lithium-ion battery), and the toxicity is the reason the LCA has 16 impact categories, not 1.** **Not accounting for the use-phase energy.** The use-phase energy is 70–90 % of the life-cycle impact for energy-consuming products (motors, pumps, compressors, vehicles, buildings). **The engineer who designs a 10 % more efficient motor saves more CO₂ over the motor's life than the engineer who eliminates the manufacturing waste.** **Choosing the "green" material without checking the LCA.** The engineer who replaces a steel bracket with a CFRP bracket to save weight (and fuel) without checking the CFRP's embodied energy (5× steel) may increase the life-cycle impact. **The material selection for sustainability is a multi-objective optimisation: the embodied energy, the recyclability, the toxicity, and the use-phase saving must all be considered.** **Not designing for disassembly.** The product that cannot be disassembled cannot be repaired, remanufactured, or recycled. **The adhesive bond that saves 10 seconds of assembly time costs 10 minutes of disassembly time and 100 % of the recycling rate.** **Not designing for the recycling stream.** The product that is made of 15 different polymers cannot be sorted by the recycling facility, and the unsorted polymer is landfilled. **Design for 1–2 polymer families, label the parts with the ISO 11469 code, and avoid the composites in small parts.** **Not considering the remanufacture.** The product that is designed for one life is a landfill item; the product that is designed for 5 lives is a circular product. **The remanufacture saves 85 % of the energy and 90 % of the material, and the saving is the reason the remanufacture is the most sustainable end-of-life option.** **Not setting the sustainability target.** The product that has no sustainability target has no sustainability requirement, and the product that has no sustainability requirement has no sustainable design. **Set the target at the requirements stage: the carbon footprint per functional unit, the recycled content, the recyclability, and the use-phase energy.** **Not reporting the LCA.** The LCA that is not reported is the LCA that was not done. **Report the LCA in the product specification, the environmental product declaration (EPD), and the corporate sustainability report, and the report is the reason the target is met.**
:::

## 1. Life-cycle assessment

::: definition Life-cycle assessment: goal, scope, inventory, impact, interpretation {#def-lca}
The **life-cycle assessment** (LCA, ISO 14040/14044) is a systematic method for quantifying the environmental impact of a product from cradle to grave. The LCA has four phases:

1. **Goal and scope**: define the functional unit (the quantified performance of the product, e.g., "transport 1 tonne of cargo 1 km"), the system boundary (cradle-to-gate, cradle-to-grave, or cradle-to-cradle), and the impact categories.

2. **Life-cycle inventory** (LCI): quantify the inputs (raw materials, energy, water) and outputs (emissions, waste) for each life-cycle stage:

$$
\begin{array} { l l l l }
\textbf{Stage} & \textbf{Inputs} & \textbf{Outputs} & \textbf{Share of impact} \\ \hline
\text{Raw material extraction} & \text{Ore, energy, water} & \text{CO}_2, \text{tailings, wastewater} & 5\text{--}30 \ \% \\
\text{Manufacturing} & \text{Energy, materials, water} & \text{CO}_2, \text{scrap, effluent} & 5\text{--}20 \ \% \\
\text{Transport} & \text{Fuel} & \text{CO}_2, \text{NO}_x & 1\text{--}5 \ \% \\
\text{Use} & \text{Energy, consumables} & \text{CO}_2, \text{waste} & 40\text{--}90 \ \% \\
\text{End of life} & \text{Energy} & \text{CO}_2, \text{landfill, recyclate} & 1\text{--}10 \ \% \\
\end{array}
$$

3. **Life-cycle impact assessment** (LCIA): convert the inventory to impact scores using characterisation factors:

$$
I _ { k } \; = \; \sum _ { i } \, m _ { i } \, \times \; \text{CF} _ { i , k }
$$

where $m _ { i }$ is the mass of emission $i$ and $\text{CF} _ { i , k }$ is the characterisation factor for impact category $k$ .

4. **Interpretation**: identify the hotspots, the improvement opportunities, and the trade-offs.

**The LCA is the tool that tells the engineer where the impact is, and the "where" is the reason the LCA is done before the design, not after. The LCA that is done after the design is the LCA that reports the impact; the LCA that is done before the design is the LCA that reduces the impact.**
:::

::: definition Carbon footprint and the embodied energy {#def-carbon}
The **carbon footprint** is the total greenhouse gas emissions expressed as CO₂ equivalent (CO₂e), and the carbon footprint is the most important LCA output because the carbon is the constraint that the planet is imposing on the engineer.

The **embodied energy** is the total energy required to produce the material, and the embodied energy is the reason the material selection is a carbon decision:

$$
\begin{array} { l c c }
\textbf{Material} & \textbf{Embodied energy (MJ/kg)} & \textbf{Embodied CO}_2 \textbf{ (kg CO}_2\text{/kg)} \\ \hline
\text{Steel (primary)} & 25 & 1 . 9 \\
\text{Steel (EAF, recycled)} & 12 & 0 . 9 \\
\text{Aluminium (primary)} & 210 & 1 1 . 5 \\
\text{Aluminium (recycled)} & 20 & 1 . 1 \\
\text{CFRP} & 300 & 1 8 \\
\text{GFRP} & 80 & 5 \\
\text{Concrete} & 1 & 0 . 1 3 \\
\text{Cement} & 5 & 0 . 9 \\
\text{PP (polypropylene)} & 80 & 2 . 5 \\
\text{ABS} & 110 & 3 . 5 \\
\text{Timber (softwood)} & 3 & 0 . 3 \text{ (sequestered)} \\
\end{array}
$$

**The embodied energy of aluminium is 8× that of steel, and the embodied CO₂ is 6×. The engineer who replaces a steel bracket with an aluminium bracket to save weight (and fuel) must check that the use-phase saving exceeds the embodied-energy penalty. The crossover is at 5 years of use: if the aluminium bracket saves 1 kW of fuel for 5 years, the saving is 5 × 8 760 × 0.4 = 17 520 kWh, which is more than the embodied-energy penalty (210 − 25 = 185 MJ/kg × 5 kg = 925 MJ = 257 kWh). The aluminium bracket wins if the life is > 5 years.**
:::

::: definition The functional unit and the system boundary {#def-functional-unit}
The **functional unit** is the quantified performance of the product, and the functional unit is the reason the LCA comparison is fair. "1 kg of steel" is not a functional unit; "support a 10 kN load for 20 years at 20 °C" is. The functional unit is the basis of the comparison: the steel bracket and the CFRP bracket are compared on the basis of "support a 10 kN load for 20 years," not "1 kg of material."

The **system boundary** defines what is included in the LCA:

$$
\begin{array} { l l l }
\textbf{Boundary} & \textbf{Includes} & \textbf{Use case} \\ \hline
\text{Cradle-to-gate} & \text{Extraction, manufacturing} & \text{Intermediate product (steel coil)} \\
\text{Cradle-to-grave} & \text{Extraction, manufacturing, use, disposal} & \text{Final product (motor)} \\
\text{Cradle-to-cradle} & \text{Extraction, manufacturing, use, recycling} & \text{Circular product (remanufactured motor)} \\
\text{Gate-to-gate} & \text{Manufacturing only} & \text{Process improvement} \\
\end{array}
$$

**The system boundary is the reason the LCA comparison is valid: comparing a cradle-to-gate LCA of steel with a cradle-to-grave LCA of aluminium is comparing apples with oranges. The boundary must be the same for both products, and the boundary is the reason the LCA standard (ISO 14044) requires the goal and scope to be defined before the inventory.**
:::

::: example LCA of a centrifugal pump {#ex-lca-pump level=3 check="70"}
A centrifugal pump has the following life-cycle inventory:

| Stage | Energy (kWh) | CO₂ (kg) |
|-------|-------------|----------|
| Raw material (cast iron, steel, copper) | 500 | 200 |
| Manufacturing | 300 | 120 |
| Transport | 50 | 20 |
| Use (15 years × 6 000 h/year × 7.5 kW) | 675 000 | 270 000 |
| End of life | 20 | 8 |

What percentage of the life-cycle CO₂ is the use phase?

$$
\text{Total CO}_2 \; = \; 2 0 0 + 1 2 0 + 2 0 + 2 7 0 \ 0 0 0 + 8 \; = \; 2 7 0 \ 3 4 8 \ \text{kg}
$$

$$
\text{Use-phase share } \; = \; { \frac { 2 7 0 \ 0 0 0 } { 2 7 0 \ 3 4 8 } } \; = \; { \bf 9 9 . 9 \ \% }
$$

**The use phase is 99.9 % of the life-cycle CO₂. A 10 % efficiency improvement (6.75 kW instead of 7.5 kW) saves 27 000 kg of CO₂ over the pump's life, which is 100× the manufacturing CO₂. The engineer who designs a 10 % more efficient pump saves more CO₂ than the engineer who eliminates all the manufacturing waste.**
:::

::: widget plot
title: The life-cycle impact distribution: where the impact is
f: 10; 15; 5; 65; 5
x: 0,5
y: 0,80
labels: Raw material; Manufacturing; Transport; Use; End of life
caption: Percentage of life-cycle CO₂ against the life-cycle stage for an energy-consuming product (a pump). **The use phase dominates (65–99 %), and the dominance is the reason the use-phase efficiency is the most important sustainability lever.** **For a non-energy-consuming product (a bracket, a housing), the raw material and manufacturing phases dominate (50–80 %), and the dominance is the reason the material selection and the manufacturing process are the most important levers.** **The LCA tells the engineer where the impact is, and the "where" is the reason the LCA is done before the design, not after.**
:::

## 2. Material selection for sustainability

::: definition The material sustainability index {#def-material-sustainability}
The **material sustainability index** (MSI) combines the embodied energy, the embodied CO₂, the recyclability, the toxicity, and the scarcity into a single score:

$$
\text{MSI } \; = \; w _ { 1 } \, E _ { \text{embodied } } + w _ { 2 } \, C _ { \text{embodied } } + w _ { 3 } \, R _ { \text{recyclability } } + w _ { 4 } \, T _ { \text{toxicity } } + w _ { 5 } \, S _ { \text{scarcity } }
$$

The weights $w _ { i }$ are set by the designer or the customer, and the weights are the reason the MSI is a decision tool, not a fact.

$$
\begin{array} { l c c c c }
\textbf{Material} & \textbf{Embodied CO}_2 & \textbf{Recyclability} & \textbf{Toxicity} & \textbf{MSI (lower is better)} \\ \hline
\text{Steel (recycled)} & 0 . 9 & 95 \ \% & \text{Low} & \text{Low} \\
\text{Aluminium (recycled)} & 1 . 1 & 90 \ \% & \text{Low} & \text{Low} \\
\text{Aluminium (primary)} & 1 1 . 5 & 90 \ \% & \text{Low} & \text{High} \\
\text{CFRP} & 1 8 & < 5 \ \% & \text{Medium} & \text{Very high} \\
\text{PP} & 2 . 5 & 30 \ \% & \text{Low} & \text{Medium} \\
\text{ABS} & 3 . 5 & 20 \ \% & \text{Medium} & \text{Medium} \\
\text{Timber} & - 0 . 3 \text{ (sequestered)} & \text{Biodegradable} & \text{Low} & \text{Very low} \\
\end{array}
$$

**The material with the lowest MSI is not always the best choice: the CFRP has a very high MSI, but if the CFRP saves 50 % of the weight and the product is a vehicle, the use-phase saving may exceed the embodied-energy penalty. The material selection for sustainability is a multi-objective optimisation, and the multi-objective optimisation is the reason the LCA is done for the whole product, not for the material.**
:::

::: definition Design for the circular economy {#def-circular}
The **circular economy** is an economic system in which the product's materials are kept in use for as long as possible, and the waste is designed out. The circular economy has three principles (Ellen MacArthur Foundation, 2013):

1. **Design out waste and pollution**: the product is designed so that the waste is a resource for another product.
2. **Keep products and materials in use**: the product is designed for durability, repair, remanufacture, and recycling.
3. **Regenerate natural systems**: the product's materials are returned to the biosphere or the technosphere.

The **butterfly diagram** (Ellen MacArthur Foundation) shows the two loops:

$$
\begin{array} { l l l }
\textbf{Loop} & \textbf{Strategy} & \textbf{Energy saving} \\ \hline
\text{Inner loop (short)} & \text{Repair, reuse, remanufacture} & 8 0 \text{--} 9 9 \ \% \\
\text{Outer loop (long)} & \text{Recycle, recover} & 5 0 \text{--} 8 0 \ \% \\
\text{Linear (no loop)} & \text{Landfill, incineration} & 0 \ \% \\
\end{array}
$$

**The remanufacture saves 85 % of the energy and 90 % of the material, and the saving is the reason the remanufacture is the most sustainable end-of-life option. The remanufacture is the reason the Caterpillar engine, the Xerox printer, and the BMW i3 battery are designed for disassembly.**
:::

::: definition Design for disassembly (DfD) and the disassembly sequence {#def-dfd}
**Design for Disassembly** (DfD) is the practice of designing the product so that it can be disassembled quickly, safely, and with standard tools. The DfD rules are:

$$
\begin{array} { l l l l }
\textbf{Rule} & \textbf{Description} & \textbf{Time saving} & \textbf{Example} \\ \hline
\text{Use reversible joints} & \text{Screws, snap-fits, not adhesives} & 50 \ \% & \text{Screws instead of glue} \\
\text{Access from one side} & \text{All fasteners accessible from one face} & 30 \ \% & \text{Top-down disassembly} \\
\text{Standardise fasteners} & \text{One screwdriver, one torque setting} & 20 \ \% & \text{All screws are M4 Phillips} \\
\text{Label the materials} & \text{ISO 11469 resin codes} & \text{Enables sorting} & \text{PP, ABS on the moulding} \\
\text{Avoid composites in small parts} & \text{CFRP/GFRP cannot be recycled} & \text{Enables recycling} & \text{Use metal for small parts} \\
\text{Design for the recycling stream} & \text{1--2 polymer families} & \text{Enables sorting} & \text{ABS housing, PP internals} \\
\end{array}
$$

**The DfD rule that conflicts most with DFA is "use reversible joints": the adhesive bond is the cheapest assembly method (0 seconds, no fastener), but the bond prevents the disassembly and the recycling. The resolution is the product's life: a product with a 2-year life (a phone) can use adhesives; a product with a 20-year life (a machine tool) must use reversible joints.**
:::

::: example Material selection for a bracket {#ex-material-sustainability level=3 check="5"}
A bracket must support a 10 kN load. Three material options are considered:

| Material | Mass (kg) | Embodied CO₂ (kg) | Use-phase CO₂ saving (kg/year) | Life (years) |
|----------|-----------|-------------------|-------------------------------|-------------|
| Steel | 5.0 | 9.5 | 0 | 20 |
| Aluminium | 2.5 | 28.8 | 50 | 20 |
| CFRP | 1.5 | 27.0 | 80 | 20 |

Which material has the lowest life-cycle CO₂?

**Steel:** $9 . 5 + 0 \times 2 0 = 9 . 5 \ \mathrm { k g \ C O _ { 2 } }$

**Aluminium:** $2 8 . 8 - 5 0 \times 2 0 = 2 8 . 8 - 1 \ 0 0 0 = - 9 7 1 . 2 \ \mathrm { k g \ C O _ { 2 } }$ (net saving)

**CFRP:** $2 7 . 0 - 8 0 \times 2 0 = 2 7 . 0 - 1 \ 6 0 0 = - 1 \ 5 7 3 \ \mathrm { k g \ C O _ { 2 } }$ (net saving)

**The CFRP has the lowest life-cycle CO₂ (net saving of 1 573 kg), because the use-phase saving (80 kg/year × 20 years = 1 600 kg) exceeds the embodied CO₂ (27 kg). The CFRP wins despite its high embodied energy, because the use-phase saving dominates. The material selection for sustainability is a multi-objective optimisation, and the multi-objective optimisation is the reason the LCA is done for the whole product, not for the material.**
:::

## 3. Energy and emissions in manufacturing

::: definition Manufacturing energy and the energy intensity {#def-manufacturing-energy}
The **manufacturing energy** is the energy consumed by the manufacturing process, and the manufacturing energy is the reason the process selection is a carbon decision. The **energy intensity** is the energy per unit volume of material processed:

$$
\begin{array} { l c c }
\textbf{Process} & \textbf{Energy intensity (MJ/kg)} & \textbf{CO}_2 \textbf{ intensity (kg CO}_2\text{/kg)} \\ \hline
\text{Sand casting (steel)} & 1 3 & 1 . 0 \\
\text{Die casting (aluminium)} & 25 & 2 . 0 \\
\text{Machining (steel)} & 20 & 1 . 5 \\
\text{Machining (aluminium)} & 35 & 2 . 8 \\
\text{Injection moulding (PP)} & 15 & 1 . 2 \\
\text{Stamping (steel)} & 5 & 0 . 4 \\
\text{LPBF (titanium)} & 500 & 4 0 \\
\text{FDM (PLA)} & 30 & 2 . 4 \\
\end{array}
$$

**The energy intensity of LPBF (laser powder bed fusion) is 25× that of sand casting, and the difference is the reason the LPBF part has a 25× higher manufacturing CO₂. The LPBF part is justified when the part count reduction (10 parts → 1 part) or the use-phase saving (lighter part → less fuel) exceeds the manufacturing penalty.**
:::

::: definition Scope 1, 2, and 3 emissions {#def-scope}
The **GHG Protocol** (WRI/WBCSD) classifies the emissions into three scopes:

$$
\begin{array} { l l l }
\textbf{Scope} & \textbf{Description} & \textbf{Example} \\ \hline
\text{Scope 1} & \text{Direct emissions from owned sources} & \text{Factory gas boiler, company vehicles} \\
\text{Scope 2} & \text{Indirect emissions from purchased energy} & \text{Electricity, steam, heating} \\
\text{Scope 3} & \text{All other indirect emissions} & \text{Supply chain, product use, disposal} \\
\end{array}
$$

**Scope 3 is 80–95 % of the total emissions for most manufacturers, and Scope 3 includes the product's use-phase emissions. The engineer who designs a 10 % more efficient product reduces the customer's Scope 1 emissions and the manufacturer's Scope 3 emissions, and the reduction is the reason the engineer's carbon responsibility extends beyond the factory gate.**
:::

::: definition Eco-design regulations and the Ecodesign Directive {#def-ecodesign}
The **EU Ecodesign Directive** (2009/125/EC) sets the minimum energy performance standards for energy-related products. The **Ecodesign for Sustainable Products Regulation** (ESPR, 2024) extends the directive to all physical products and adds the requirements for:

- **Energy efficiency**: the minimum efficiency index (MEI) for motors, pumps, fans, and compressors.
- **Durability**: the minimum B10 life, the spare parts availability (10 years), and the repairability score.
- **Recyclability**: the minimum recycled content, the material labelling, and the design for disassembly.
- **Carbon footprint**: the maximum embodied CO₂ per functional unit, and the digital product passport.

**The ESPR is the reason the engineer must design for the circular economy, not just for the customer. The product that does not meet the ESPR requirements cannot be sold in the EU, and the EU is the largest single market for engineered products.**
:::

::: example Carbon footprint of a motor {#ex-carbon-motor level=3 check="85"}
A 10 kW motor has the following life-cycle inventory:

| Stage | CO₂ (kg) |
|-------|----------|
| Raw material (steel, copper, aluminium) | 150 |
| Manufacturing | 80 |
| Transport | 15 |
| Use (20 years × 5 000 h/year × 8.5 kW × 0.4 kg CO₂/kWh) | 340 000 |
| End of life | 5 |

What percentage of the life-cycle CO₂ is the use phase? If the motor efficiency improves from 85 % to 90 %, what is the CO₂ saving?

$$
\text{Use-phase share } \; = \; { \frac { 3 4 0 \ 0 0 0 } { 3 4 0 \ 2 5 0 } } \; = \; { \bf 9 9 . 9 \ \% }
$$

**Efficiency improvement:**

$$
\Delta P \; = \; 1 0 \times \left( { \frac { 1 } { 0 . 8 5 } } - { \frac { 1 } { 0 . 9 0 } } \right) \; = \; 1 0 \times ( 1 . 1 7 6 - 1 . 1 1 1 ) \; = \; 0 . 6 5 \ \text{kW}
$$

$$
\Delta \text{CO} _ { 2 } \; = \; 0 . 6 5 \times 5 \ 0 0 0 \times 2 0 \times 0 . 4 \; = \; { \bf 2 6 \ 0 0 0 } \ \text{kg CO}_2
$$

**The efficiency improvement saves 26 000 kg of CO₂ over the motor's life, which is 170× the manufacturing CO₂. The engineer who designs a 5 % more efficient motor saves more CO₂ than the engineer who eliminates all the manufacturing waste.**
:::

## 4. Circular economy and remanufacture

::: definition Remanufacture, repair, and reuse {#def-remanufacture}
The **remanufacture** is the process of restoring a used product to a like-new condition, with the same warranty as a new product. The remanufacture saves:

$$
\begin{array} { l c c }
& \textbf{Remanufacture} & \textbf{New manufacture} \\ \hline
\text{Energy} & 1 5 \ \% & 1 0 0 \ \% \\
\text{Material} & 1 0 \ \% & 1 0 0 \ \% \\
\text{CO}_2 & 1 5 \ \% & 1 0 0 \ \% \\
\text{Cost} & 6 0 \ \% & 1 0 0 \ \% \\
\text{Warranty} & \text{Same as new} & \text{New} \\
\end{array}
$$

The **repair** is the process of restoring the product to a working condition, with a lower warranty than a new product. The repair saves 50–80 % of the energy and material, and the repair is the reason the EU Right to Repair legislation (2024) requires the manufacturer to provide spare parts for 10 years.

The **reuse** is the process of using the product again for its original purpose, without remanufacture. The reuse saves 90–99 % of the energy and material, and the reuse is the reason the pallet, the shipping container, and the glass bottle are the most sustainable packaging.
:::

::: definition The digital product passport {#def-dpp}
The **digital product passport** (DPP, EU ESPR 2024) is the electronic record that contains the product's material composition, carbon footprint, repairability score, spare parts availability, and end-of-life instructions. The DPP is accessible via a QR code on the product, and the DPP is the reason the recycler knows what the product is made of, the repairer knows how to fix it, and the customer knows its carbon footprint.

$$
\begin{array} { l l l }
\textbf{DPP field} & \textbf{Content} & \textbf{Purpose} \\ \hline
\text{Material composition} & \text{ISO 11469 codes, REACH SVHC} & \text{Recycling, compliance} \\
\text{Carbon footprint} & \text{kg CO}_2\text{/functional unit} & \text{Scope 3 reporting} \\
\text{Repairability score} & \text{0--10 scale (iFixit method)} & \text{Consumer choice} \\
\text{Spare parts} & \text{Availability, part numbers} & \text{Right to repair} \\
\text{Disassembly instructions} & \text{Sequence, tools, torque} & \text{Remanufacture, recycling} \\
\end{array}
$$

**The DPP is the reason the engineer must design for disassembly, for material labelling, and for the recycling stream: the DPP is the product's environmental birth certificate, and the birth certificate is the reason the product's environmental performance is transparent.**
:::

::: widget plot
title: The circular economy: energy saving by end-of-life strategy
f: 100; 85; 50; 0
x: 0,4
y: 0,100
labels: Remanufacture; Repair; Recycle; Landfill
caption: Energy saving (percentage of new manufacture) by end-of-life strategy. **The remanufacture saves 85 % of the energy, the repair saves 50 %, the recycling saves 50–80 %, and the landfill saves 0 %. The remanufacture is the most sustainable end-of-life option, and the remanufacture is the reason the product must be designed for disassembly.** **The design for disassembly is the enabler of the remanufacture, and the enabler is the reason the DfD rules (reversible joints, standard fasteners, material labelling) are the most important sustainability design rules.**
:::

::: example Remanufacture of a hydraulic pump {#ex-reman-pump level=3 check="85"}
A hydraulic pump costs £800 new and £480 remanufactured. The remanufacture saves 85 % of the energy and 90 % of the material. The pump contains 15 kg of steel, 3 kg of aluminium, and 1 kg of copper. Calculate the CO₂ saving of the remanufacture.

**New manufacture CO₂:**

$$
1 5 \times 1 . 9 + 3 \times 1 1 . 5 + 1 \times 4 . 5 \; = \; 2 8 . 5 + 3 4 . 5 + 4 . 5 \; = \; 6 7 . 5 \ \text{kg CO}_2
$$

**Remanufacture CO₂ (15 % of new):**

$$
0 . 1 5 \times 6 7 . 5 \; = \; 1 0 . 1 \ \text{kg CO}_2
$$

**CO₂ saving:**

$$
6 7 . 5 - 1 0 . 1 \; = \; { \bf 5 7 . 4 } \ \text{kg CO}_2
$$

**The remanufacture saves 57.4 kg of CO₂ per pump, and the saving is 85 % of the new-manufacture CO₂. At a volume of 10 000 pumps per year, the saving is 574 tonnes of CO₂ per year, and the saving is the reason the remanufacture is the most sustainable end-of-life option.**
:::

## Exercises

::: exercise LCA of a steel vs aluminium bracket {#ex-lca-bracket level=3 check="5"}
A bracket can be made from steel (5 kg, embodied CO₂ 1.9 kg/kg) or aluminium (2.5 kg, embodied CO₂ 11.5 kg/kg). The aluminium bracket saves 0.5 kW of fuel during use (20 years, 5 000 h/year, 0.4 kg CO₂/kWh). Which material has the lower life-cycle CO₂?

::: solution
**Steel:** $5 \times 1 . 9 = 9 . 5 \ \mathrm { k g \ C O _ { 2 } }$ (embodied) + 0 (use) = **9.5 kg CO₂**

**Aluminium:** $2 . 5 \times 1 1 . 5 = 2 8 . 7 5 \ \mathrm { k g \ C O _ { 2 } }$ (embodied) $- 0 . 5 \times 5 0 0 0 \times 2 0 \times 0 . 4 = - 2 0 0 0 \ \mathrm { k g \ C O _ { 2 } }$ (use saving) = **−1 971 kg CO₂** (net saving)

**The aluminium bracket has a lower life-cycle CO₂ (net saving of 1 971 kg), because the use-phase saving (2 000 kg) exceeds the embodied-energy penalty (19.25 kg). The aluminium bracket wins despite its higher embodied CO₂, because the use-phase saving dominates.**
:::
:::

::: exercise Circular economy: remanufacture vs new {#ex-reman-vs-new level=3 check="60"}
A motor costs £500 new and £300 remanufactured. The remanufacture saves 85 % of the energy and 90 % of the material. The motor contains 20 kg of steel, 5 kg of copper, and 2 kg of aluminium. Calculate the cost saving and the CO₂ saving.

::: solution
**Cost saving:** $5 0 0 - 3 0 0 = { \bf 2 0 0 } \ \text{pounds per motor}$

**CO₂ saving:**

$$
\text{New CO}_2 \; = \; 2 0 \times 1 . 9 + 5 \times 4 . 5 + 2 \times 1 1 . 5 \; = \; 3 8 + 2 2 . 5 + 2 3 \; = \; 8 3 . 5 \ \text{kg}
$$

$$
\text{Remanufacture CO}_2 \; = \; 0 . 1 5 \times 8 3 . 5 \; = \; 1 2 . 5 \ \text{kg}
$$

$$
\text{CO}_2 \text{ saving } \; = \; 8 3 . 5 - 1 2 . 5 \; = \; { \bf 7 1 } \ \text{kg CO}_2
$$

**The remanufacture saves £200 and 71 kg of CO₂ per motor. At a volume of 5 000 motors per year, the saving is £1 million and 355 tonnes of CO₂ per year.**
:::
:::

::: exercise Scope 3 emissions {#ex-scope3 level=3 check="90"}
A manufacturer has the following emissions: Scope 1 = 500 tonnes CO₂, Scope 2 = 1 000 tonnes CO₂, Scope 3 = 9 000 tonnes CO₂. What percentage of the total emissions is Scope 3? If the product's use-phase efficiency improves by 10 %, what is the Scope 3 reduction?

::: solution
$$
\text{Scope 3 share } \; = \; { \frac { 9 \ 0 0 0 } { 5 0 0 + 1 \ 0 0 0 + 9 \ 0 0 0 } } \; = \; { \frac { 9 \ 0 0 0 } { 1 0 \ 5 0 0 } } \; = \; { \bf 8 5 . 7 \ \% }
$$

**If the use-phase efficiency improves by 10 %, and the use-phase is 80 % of Scope 3, the Scope 3 reduction is:**

$$
\Delta \text{Scope 3 } \; = \; 9 \ 0 0 0 \times 0 . 8 0 \times 0 . 1 0 \; = \; { \bf 7 2 0 } \ \text{tonnes CO}_2
$$

**The Scope 3 reduction (720 tonnes) is 48 % of the total emissions (1 500 tonnes), and the reduction is achieved by the engineer's design decision, not the manufacturer's operational decision. The engineer's carbon responsibility extends beyond the factory gate.**
:::
:::

::: exercise Design for disassembly {#ex-dfd-time level=3 check="3"}
A product has 20 parts: 10 screws (M4 Phillips), 5 snap-fits, 3 adhesive bonds, and 2 press-fits. The disassembly time is: screw = 10 s, snap-fit = 3 s, adhesive = 60 s (cutting), press-fit = 15 s. Calculate the total disassembly time. If the 3 adhesive bonds are replaced with snap-fits, what is the new time?

::: solution
**Original:**

$$
T \; = \; 1 0 \times 1 0 + 5 \times 3 + 3 \times 6 0 + 2 \times 1 5 \; = \; 1 0 0 + 1 5 + 1 8 0 + 3 0 \; = \; { \bf 3 2 5 } \ \text{seconds}
$$

**With 3 adhesive bonds replaced by snap-fits:**

$$
T \; = \; 1 0 \times 1 0 + 8 \times 3 + 0 + 2 \times 1 5 \; = \; 1 0 0 + 2 4 + 0 + 3 0 \; = \; { \bf 1 5 4 } \ \text{seconds}
$$

**The disassembly time is reduced from 325 seconds to 154 seconds (53 % reduction). The adhesive bond is the most expensive disassembly operation (60 seconds per bond), and the adhesive bond is the reason the product cannot be remanufactured.**
:::
:::

::: exercise Embodied energy comparison {#ex-embodied-energy level=2 check="8"}
Compare the embodied CO₂ of 1 kg of primary aluminium (11.5 kg CO₂/kg) with 1 kg of recycled aluminium (1.1 kg CO₂/kg). How many kg of recycled aluminium are needed to match the embodied CO₂ of 1 kg of primary aluminium?

::: solution
$$
N \; = \; { \frac { 1 1 . 5 } { 1 . 1 } } \; = \; { \bf 1 0 . 5 } \ \text{kg}
$$

**10.5 kg of recycled aluminium has the same embodied CO₂ as 1 kg of primary aluminium. The recycled aluminium is 10× better than the primary aluminium, and the 10× is the reason the recycled content requirement in the ESPR is the most effective carbon-reduction lever.**
:::
:::

::: exercise Ecodesign compliance {#ex-ecodesign level=3 check="10"}
A motor has an efficiency of 85 % and the Ecodesign Directive requires a minimum efficiency index (MEI) of 0.4 for IE3 classification. The MEI is defined as:

$$
\text{MEI } \; = \; { \frac { \eta _ { \text{actual } } - \eta _ { \text{IE1 } } } { \eta _ { \text{IE4 } } - \eta _ { \text{IE1 } } } }
$$

If $\eta _ { \text{IE1 } } = 0 . 8 0$ and $\eta _ { \text{IE4 } } = 0 . 9 2$ , calculate the MEI and determine the IE class.

::: solution
$$
\text{MEI } \; = \; { \frac { 0 . 8 5 - 0 . 8 0 } { 0 . 9 2 - 0 . 8 0 } } \; = \; { \frac { 0 . 0 5 } { 0 . 1 2 } } \; = \; { \bf 0 . 4 1 7 }
$$

**The MEI is 0.417, which is above the IE3 threshold (0.4). The motor is IE3 classified, and the IE3 classification is the reason the motor can be sold in the EU. The engineer who designs a 90 % efficient motor achieves an MEI of 0.833 (IE4), and the IE4 classification is the reason the motor is the most efficient on the market.**
:::
:::

::: exercise Derivation: the life-cycle CO₂ crossover {#ex-derive-lca-crossover level=4 check="5"}
Show that the crossover life $N ^ { * }$ at which the use-phase saving of a lighter material exceeds its embodied-energy penalty is $N ^ { * } = ( E _ { \text{light } } - E _ { \text{heavy } } ) / ( \Delta P \times h \times c )$ , where $E$ is the embodied CO₂, $\Delta P$ is the power saving, $h$ is the annual operating hours, and $c$ is the carbon intensity. Evaluate for $E _ { \text{light } } = 2 8 . 8$, $E _ { \text{heavy } } = 9 . 5$, $\Delta P = 0 . 5$ kW, $h = 5 0 0 0$ h/year, $c = 0 . 4$ kg CO₂/kWh.

::: solution
The life-cycle CO₂ for each material is:

$$
C _ { \text{heavy } } ( N ) \; = \; E _ { \text{heavy } } \qquad C _ { \text{light } } ( N ) \; = \; E _ { \text{light } } - N \, \Delta P \, h \, c
$$

Setting $C _ { \text{light } } = C _ { \text{heavy } }$ :

$$
E _ { \text{light } } - N \, \Delta P \, h \, c \; = \; E _ { \text{heavy } } \quad \Longrightarrow \quad N ^ { * } \; = \; { \frac { E _ { \text{light } } - E _ { \text{heavy } } } { \Delta P \, h \, c } }
$$

$$
N ^ { * } \; = \; { \frac { 2 8 . 8 - 9 . 5 } { 0 . 5 \times 5 \ 0 0 0 \times 0 . 4 } } \; = \; { \frac { 1 9 . 3 } { 1 \ 0 0 0 } } \; = \; { \bf 0 . 0 1 9 } \ \text{years} \; = \; { \bf 7 } \ \text{days}
$$

**The crossover is 7 days. The aluminium bracket's use-phase saving exceeds its embodied-energy penalty after 7 days of operation, and the 7 days is the reason the aluminium bracket is the sustainable choice for any product with a life > 7 days.** $\blacksquare$
:::
:::

::: exercise Derivation: the circular economy energy saving {#ex-derive-circular level=4 check="85"}
Show that the energy saving of the remanufacture is $S = 1 - ( E _ { \text{reman } } / E _ { \text{new } } )$ , and that the remanufacture saves 85 % of the energy when $E _ { \text{reman } } = 0 . 1 5 \, E _ { \text{new } }$ . If the remanufacture rate is $r$ (fraction of products remanufactured), show that the average energy per product is $E _ { \text{avg } } = ( 1 - r ) \, E _ { \text{new } } + r \, E _ { \text{reman } }$ , and evaluate the saving for $r = 0 . 5$ .

::: solution
$$
S \; = \; 1 - { \frac { E _ { \text{reman } } } { E _ { \text{new } } } } \; = \; 1 - 0 . 1 5 \; = \; { \bf 0 . 8 5 } \; \; ( 8 5 \ \% )
$$

$$
E _ { \text{avg } } \; = \; ( 1 - r ) \, E _ { \text{new } } + r \, E _ { \text{reman } } \; = \; ( 1 - r ) \, E _ { \text{new } } + r \times 0 . 1 5 \, E _ { \text{new } }
$$

$$
E _ { \text{avg } } \; = \; E _ { \text{new } } \, ( 1 - 0 . 8 5 \, r )
$$

For $r = 0 . 5$ :

$$
E _ { \text{avg } } \; = \; E _ { \text{new } } \, ( 1 - 0 . 8 5 \times 0 . 5 ) \; = \; E _ { \text{new } } \times 0 . 5 7 5
$$

**The average energy is 57.5 % of the new-manufacture energy, a 42.5 % saving. The saving is the reason the remanufacture rate is the most important circular-economy metric, and the remanufacture rate is the reason the product must be designed for disassembly.** $\blacksquare$
:::
:::

::: quiz Sustainability {#quiz-sustainability}
The life-cycle stage that dominates the CO₂ emissions of an energy-consuming product is:

- [ ] Raw material extraction
- [ ] Manufacturing
- [x] Use phase
- [ ] End of life

::: solution
**The use phase.** For energy-consuming products (motors, pumps, compressors, vehicles, buildings), the use phase is 70–99 % of the life-cycle CO₂. The engineer who designs a 10 % more efficient product saves more CO₂ than the engineer who eliminates all the manufacturing waste.
:::
:::

::: quiz Circular economy {#quiz-circular}
The end-of-life strategy that saves the most energy is:

- [ ] Recycling
- [ ] Incineration with energy recovery
- [x] Remanufacture
- [ ] Landfill

::: solution
**Remanufacture.** The remanufacture saves 85 % of the energy and 90 % of the material, compared to 50–80 % for recycling, 0–30 % for incineration with energy recovery, and 0 % for landfill. The remanufacture is the most sustainable end-of-life option, and the remanufacture is the reason the product must be designed for disassembly.
:::
:::

## Where this lesson leads

- **[[design-process/design-process-overview]]** — The sustainability requirement is a constraint in the specification, and the constraint is the reason the design is optimised for the life cycle, not just the purchase price.
- **[[design-process/requirements]]** — The sustainability target (carbon footprint, recycled content, recyclability) is a requirement in the specification, and the requirement is the reason the design has a circular-economy strategy.
- **[[design-process/design-for-manufacture]]** — The DfE rules (design for disassembly, material labelling, reversible joints) are the bridge to the circular economy.
- **[[design-process/reliability-risk]]** — The durability requirement (B10 life, MTBF) is a sustainability requirement, because a longer-lived product has a lower life-cycle impact.
- **[[manufacturing/process-selection]]** — The process selection is a carbon decision: the energy intensity of the process determines the manufacturing CO₂.
- **[[materials-science/material-families]]** — The embodied energy and the recyclability of the material determine the material's sustainability index.
- **[[manufacturing/additive-manufacturing]]** — The LPBF energy intensity (500 MJ/kg) is 25× that of sand casting, and the difference is the reason the AM part must justify its carbon penalty.
- **[[energy-systems/energy-economics-emissions]]** — The LCA methodology is the foundation of the energy-systems sustainability analysis.

::: history Sustainable design: from the Club of Rome to the digital product passport {#history-sustainability}
**1972** — **The Club of Rome** publishes *The Limits to Growth* (Meadows et al.), which models the interaction of population, industrial output, food, resources, and pollution. The model predicts that the current growth trajectory is unsustainable. **The Limits to Growth is the first quantitative model of sustainability, and the model is the reason the sustainability debate is a numbers debate, not a values debate.**

**1987** — **The Brundtland Report** (*Our Common Future*, WCED) defines sustainable development as "development that meets the needs of the present without compromising the ability of future generations to meet their own needs." **The Brundtland definition is the reason the engineer's obligation extends beyond the customer to the planet, and the obligation is the reason the LCA is done for the whole life cycle, not just the manufacturing.**

**1990** — **Walter Stigl and Michael Braungart** develop the **Cradle to Cradle** design philosophy, which argues that the product should be designed so that its materials are nutrients for the next product. **Cradle to Cradle is the reason the circular economy is a design philosophy, not a recycling programme.**

**1997** — **The Kyoto Protocol** sets the first binding CO₂ reduction targets (5.2 % below 1990 levels by 2012). **The Kyoto Protocol is the reason the carbon footprint is a regulatory constraint, not a voluntary metric.**

**2009** — **The EU Ecodesign Directive** (2009/125/EC) sets the minimum energy performance standards for energy-related products. The directive covers 14 product groups (motors, pumps, fans, boilers, TVs, etc.) and is estimated to save 10 % of the EU's primary energy by 2020. **The Ecodesign Directive is the reason the engineer must design for energy efficiency, not just for performance.**

**2013** — **The Ellen MacArthur Foundation** publishes *Towards the Circular Economy*, which codifies the circular economy principles: design out waste, keep products and materials in use, regenerate natural systems. **The Ellen MacArthur Foundation is the reason the circular economy is a business model, not a recycling programme, and the business model is the reason the remanufacture is a profit centre, not a cost centre.**

**2015** — **The Paris Agreement** sets the target of limiting global warming to 1.5 °C above pre-industrial levels, requiring a 45 % reduction in CO₂ emissions by 2030 and a net-zero by 2050. **The Paris Agreement is the reason the carbon footprint is a design constraint, not a design consideration, and the constraint is the reason the engineer's carbon responsibility is a legal obligation, not a moral choice.**

**2024** — **The EU Ecodesign for Sustainable Products Regulation** (ESPR) extends the Ecodesign Directive to all physical products and introduces the **digital product passport** (DPP), the **repairability score**, and the **recycled content requirement**. **The ESPR is the reason the engineer must design for disassembly, for material labelling, and for the recycling stream: the product that does not meet the ESPR requirements cannot be sold in the EU, and the EU is the largest single market for engineered products.**
:::

::: summary Sustainability {#summary-sustainability}
- **Sustainability is the practice of designing products that meet the needs of the present without compromising the ability of future generations to meet their own needs.** The engineer's obligation extends beyond the customer to the planet.
- **The life-cycle assessment (LCA) quantifies the environmental impact from cradle to grave: raw material, manufacturing, transport, use, and end-of-life.** The LCA tells the engineer where the impact is, and the "where" is the reason the LCA is done before the design, not after.
- **The use phase dominates the life-cycle CO₂ for energy-consuming products (70–99 %).** The engineer who designs a 10 % more efficient product saves more CO₂ than the engineer who eliminates all the manufacturing waste.
- **The embodied energy of aluminium is 8× that of steel, and the embodied CO₂ is 6×.** The material selection for sustainability is a multi-objective optimisation: the embodied energy, the recyclability, the toxicity, and the use-phase saving must all be considered.
- **The circular economy keeps the product's materials in use for as long as possible: repair, reuse, remanufacture, recycle.** The remanufacture saves 85 % of the energy and 90 % of the material, and the saving is the reason the remanufacture is the most sustainable end-of-life option.
- **Design for disassembly (DfD) is the enabler of the remanufacture: reversible joints, standard fasteners, material labelling, and 1–2 polymer families.** The DfD rule that conflicts most with DFA is "use reversible joints," and the resolution is the product's life.
- **The Scope 3 emissions (80–95 % of the total) include the product's use-phase emissions.** The engineer's carbon responsibility extends beyond the factory gate.
- **The EU Ecodesign Directive and the ESPR set the minimum energy performance standards, the repairability score, the recycled content, and the digital product passport.** The product that does not meet the ESPR requirements cannot be sold in the EU.
- **The digital product passport (DPP) is the product's environmental birth certificate: material composition, carbon footprint, repairability score, spare parts availability, and end-of-life instructions.** The DPP is the reason the product's environmental performance is transparent.
- **The carbon footprint is the constraint that the planet is imposing on the engineer: the Paris Agreement requires a 45 % reduction by 2030 and a net-zero by 2050.** The engineer's carbon legacy is the CO₂ emitted by the products they design, and the legacy is the reason the engineer's obligation is to the planet, not just to the customer.
:::

## Further reading

- **Walter R. Stahel (2016)** — *The Circular Economy: A User's Guide*. Routledge. The circular economy in practice: the performance economy, the remanufacture, and the product-life extension.
- **Michael Ashby (2021)** — *Materials and the Environment: Eco-informed Material Choice*, 4th ed. Butterworth-Heinemann. The material selection for sustainability, the embodied energy, and the CO₂ footprint.
- **Ellen MacArthur Foundation (2013)** — *Towards the Circular Economy*. Ellen MacArthur Foundation. The circular economy principles, the butterfly diagram, and the business case.
- **ISO 14040:2006 / ISO 14044:2006** — *Environmental Management — Life Cycle Assessment — Principles and Framework / Requirements and Guidelines*. ISO. The LCA standard.
- **EU Directive 2009/125/EC** — *Ecodesign Directive*. European Parliament. The minimum energy performance standards for energy-related products.
- **EU Regulation 2024/1781** — *Ecodesign for Sustainable Products Regulation (ESPR)*. European Parliament. The digital product passport, the repairability score, and the recycled content requirement.
- **Brundtland Commission (1987)** — *Our Common Future*. Oxford University Press. The Brundtland definition of sustainable development.
- **Donella H. Meadows, Dennis L. Meadows and Jørgen Randers (1992)** — *The Limits to Growth: The Global Challenge 20 Years Later*. Earthscan. The updated limits-to-growth model, and the model's continued relevance.
