Almost every manufactured object passes through the chemical industry at some stage. The fertiliser that grew the wheat in your bread, the polymer of your phone case, the detergent, the paint, the insulation in your walls, the drugs in a hospital pharmacy and the purified water from your tap all depend on a few hundred large-volume chemicals made from a handful of raw materials: natural gas, crude oil, coal, salt, air, water, sulfur, phosphate rock and, increasingly, biomass. The industry is a network: the output of one plant is the feed of another, often by pipeline across the same site, and a single product such as ethylene may have dozens of derivatives used in thousands of applications.

Industrial chemistry differs from laboratory chemistry not because the reactions are different — they are the same reactions — but because scale changes what matters. In the laboratory a reaction is judged by whether it works and how pure the product is; on a plant producing a million tonnes a year, a $1\,\%$ improvement in selectivity may be worth more than a new product, the heat released by the reaction may decide whether the plant is safe, and the cost of separating the product from the solvent may exceed the cost of the reaction itself. This chapter surveys the structure of the industry, its classification into bulk, fine and speciality chemicals, the economics of scale, the vocabulary of conversion, selectivity and recycle that describes a real reactor, and the physical reasons — above all heat transfer — why a reaction cannot simply be made bigger. The next two chapters apply these ideas to the largest inorganic and organic processes.

## The chemical value chain

The industry is usually described as a chain from raw materials to consumer products, with value added and volume reduced at each stage.

| stage | examples | typical scale |
|---|---|---|
| raw materials | natural gas, ethane, naphtha, coal; salt, sulfur, phosphate rock; air, water; biomass | $10^8$–$10^9\ \mathrm{t\,a^{-1}}$ |
| base (primary) chemicals | ammonia, methanol, ethylene, propylene, butadiene, benzene, toluene, xylenes; sulfuric acid, chlorine, sodium hydroxide | $10^7$–$10^8\ \mathrm{t\,a^{-1}}$ each |
| intermediates | ethylene oxide, vinyl chloride, styrene, terephthalic acid, acetic acid, phenol, caprolactam, nitric acid | $10^6$–$10^7\ \mathrm{t\,a^{-1}}$ |
| products | polymers, fertilisers, solvents, surfactants, dyes, agrochemicals, pharmaceuticals, catalysts | $1$–$10^7\ \mathrm{t\,a^{-1}}$ |

The International Energy Agency (IEA) groups seven base chemicals as **primary chemicals** — ammonia, methanol, and the "high-value chemicals" ethylene, propylene, benzene, toluene and mixed xylenes — because they account for most of the sector's energy use and emissions. Their direct $\mathrm{CO_2}$ emissions were about $935\ \mathrm{Mt}$ in 2022, of which ammonia accounted for about $45\,\%$, methanol $28\,\%$ and high-value chemicals $27\,\%$ (IEA, *Chemicals* tracking report, latest dated value as of 2026). The chemical sector is the largest industrial consumer of oil and natural gas, much of it as **feedstock** — carbon and hydrogen incorporated into products — rather than fuel. This distinction matters for decarbonisation: fuel can in principle be replaced by electricity, but feedstock carbon has to come from somewhere ([[green-chemistry/renewable-feedstocks]], [[green-chemistry/carbon-hydrogen]]).

By sales, world chemical sales were valued at about $5.4$ trillion euros in 2022 (Cefic, *Facts and Figures of the European Chemical Industry*, 2023 edition). The geography has changed rapidly: in Cefic's 2025 edition China accounted for about $46\,\%$ of global chemical sales in 2024, up from about $24\,\%$ in 2009, while the share of the European Union fell over the same period from about $21\,\%$ to $13\,\%$, with EU chemical turnover of about €$635$ billion and some $1.2$ million employees. Such figures are revised every year and depend on exchange rates and on what is counted as "chemicals" (pharmaceuticals are usually excluded), so they are best used for orders of magnitude and trends.

::: definition Bulk, fine, speciality and consumer chemicals {#def-classes}
Chemical products are classified by how they are made and sold:

- **Bulk (commodity) chemicals** are made in large volumes ($\gtrsim 10^4\ \mathrm{t\,a^{-1}}$, often $10^6$) in dedicated continuous plants, sold **by specification** (composition and purity) at low unit prices that follow feedstock costs; many producers make identical products, and competition is on cost.
- **Fine chemicals** are pure single compounds made in smaller volumes ($10$–$10^4\ \mathrm{t\,a^{-1}}$) in multipurpose batch plants, also sold by specification but at much higher prices: pharmaceutical and agrochemical intermediates and active ingredients, vitamins, flavour compounds.
- **Speciality (performance) chemicals** are sold **by function** — what they do rather than what they are — and are often formulated mixtures: catalysts, additives, coatings, adhesives, electronic chemicals, water-treatment agents. Their value lies in performance and service.
- **Consumer chemicals** are formulated products sold to the public: detergents, cosmetics, paints.

The boundaries are blurred, and a compound can move between classes as its market grows.
:::

The classes differ in their green-chemistry problems. Bulk processes have low E-factors ([[green-chemistry/green-metrics]]) but enormous absolute flows of material and energy, so their main challenges are energy, $\mathrm{CO_2}$ and feedstock. Fine-chemical and pharmaceutical processes have high E-factors because of multistep syntheses, stoichiometric reagents and solvents, so their main challenges are mass efficiency and hazard. Speciality and consumer products are where the end-of-life questions — persistence, toxicity in use, recyclability — are sharpest ([[green-chemistry/circular-economy]]).

## Conversion, selectivity and yield

In the laboratory "yield" usually means the isolated yield of a single run. Industrial reactors are described by three related quantities, because unreacted feed is almost always separated and recycled.

::: definition Conversion, selectivity and yield {#def-xsy}
For a reactor fed with $n_{\mathrm{A},0}$ moles of a key reactant $\mathrm{A}$, of which $n_\mathrm{A}$ leave unreacted, and producing $n_\mathrm{P}$ moles of the desired product $\mathrm{P}$ (with stoichiometric ratio $\nu_\mathrm{A}/\nu_\mathrm{P}$ moles of $\mathrm{A}$ per mole of $\mathrm{P}$):

- the **conversion** is $X = (n_{\mathrm{A},0} - n_\mathrm{A})/n_{\mathrm{A},0}$, the fraction of $\mathrm{A}$ consumed;
- the **selectivity** is $S = (\nu_\mathrm{A}/\nu_\mathrm{P})\,n_\mathrm{P}/(n_{\mathrm{A},0} - n_\mathrm{A})$, the fraction of the consumed $\mathrm{A}$ that became $\mathrm{P}$;
- the **yield** is $Y = (\nu_\mathrm{A}/\nu_\mathrm{P})\,n_\mathrm{P}/n_{\mathrm{A},0}$, the fraction of the fed $\mathrm{A}$ that became $\mathrm{P}$.

It follows directly that $Y = X\,S$. For a continuous reactor the same definitions apply to molar flow rates, and "per pass" quantities refer to one passage through the reactor.
:::

A reaction with low conversion but high selectivity is often preferred to one with high conversion and lower selectivity, because unconverted feed can be recovered and recycled but feed turned into by-product is lost. Many industrial reactions have a consecutive side reaction — the product reacts further to something unwanted — and selectivity falls as conversion rises ([[green-chemistry/petrochemicals]] analyses this for partial oxidations), so reactors are deliberately run at modest per-pass conversion and the unreacted feed recycled.

::: proposition Recycle at low per-pass conversion {#prop-recycle}
Consider a reactor with per-pass conversion $X$ and selectivity $S$, followed by a separator that recovers all unreacted $\mathrm{A}$ and returns it to the reactor inlet, where it is mixed with fresh feed $F$ (mol of $\mathrm{A}$ per unit time). At steady state, with no purge, the overall conversion of fresh $\mathrm{A}$ is $1$, the overall yield is $S$, and the recycle flow $R$ and reactor inlet flow $F + R$ are
$$
R = F\,\frac{1 - X}{X}, \qquad F + R = \frac{F}{X} .
$$ {#eq-recycle}
:::

::: proof
At steady state nothing accumulates, so every mole of $\mathrm{A}$ entering the system must leave or react. With complete recovery, unreacted $\mathrm{A}$ never leaves; hence all fresh $\mathrm{A}$ reacts, and the fraction $S$ of it becomes $\mathrm{P}$. Around the reactor, the inlet flow $F + R$ is converted to the extent $X$, so the unreacted flow leaving is $(1 - X)(F + R)$, and this is the recycle $R$. Solving $R = (1 - X)(F + R)$ gives $RX = (1 - X)F$, i.e. [[#eq-recycle]]. The price of a low $X$ is therefore not lost material but a larger reactor, compressor and separator, sized for the flow $F/X$.
:::

::: example The ammonia synthesis loop {#ex-loop}
In an ammonia plant the per-pass conversion of synthesis gas in the converter is about $15\,\%$, limited by equilibrium ([[green-chemistry/industrial-inorganic]]). Ammonia is condensed out and the unreacted gas recycled. Taking $X = 0.15$ and neglecting inerts, find the ratio of recycle to fresh feed and the factor by which the converter must be oversized relative to the fresh feed.
::: solution
By [[#eq-recycle]], $R/F = (1 - 0.15)/0.15 = 5.67$: almost six moles of recycled gas for every mole of fresh gas. The converter handles $F/X = 6.67$ times the fresh feed. The recycle compressor must restore the pressure lost through the loop, and the condensation of ammonia requires refrigeration; both consume energy. Real loops also contain small amounts of methane and argon from the synthesis gas, which do not react and would accumulate without a **purge** — a small bleed of loop gas. The purge removes inerts but also loses some hydrogen and nitrogen ([[#exr-purge]]), so the loop is a compromise between purge losses and the dilution of reactants by inerts.
:::
:::

## Economies of scale

Why are bulk chemicals made in giant plants? Partly because large plants need fewer workers per tonne and can integrate heat and by-products; but the main reason is geometric.

::: proposition The six-tenths rule {#prop-six-tenths}
The capital cost $C$ of chemical plant equipment scales with its capacity $Q$ approximately as
$$
\frac{C_2}{C_1} = \left(\frac{Q_2}{Q_1}\right)^{n}, \qquad n \approx 0.6 ,
$$ {#eq-six-tenths}
so the capital cost *per unit of capacity* falls as $Q^{\,n - 1} \approx Q^{-0.4}$. The exponent is empirical, varying between about $0.4$ and $0.9$ for different equipment and plants; the rule holds within the range of sizes for which the same design can be used.
:::

::: proof
A heuristic derivation explains the value. The capacity of a vessel, column or pipe is proportional to its volume, $V \propto L^3$, for a characteristic length $L$. Its cost is roughly proportional to the mass of metal, which for a given wall thickness is proportional to its surface area, $A \propto L^2 \propto V^{2/3}$. So $C \propto Q^{2/3} \approx Q^{0.67}$. Wall thickness of pressure vessels grows with diameter (the hoop stress for a cylinder of radius $r$ at pressure $p$ is $pr/t$, so $t \propto r$ at fixed stress), which raises the exponent towards $1$ for high-pressure equipment; costs that do not scale with size at all — instrumentation, control systems, design and engineering — lower it. The observed average of about $0.6$, established from cost data by R. Williams in 1947, reflects this mixture. The rule is not a law, and above a certain size it fails because the largest equipment that can be fabricated or transported is reached and further capacity must be added as parallel trains.
:::

::: widget plot
f: c*(x/100)^(n - 1) + v
x: 10, 1000
y: 0, 600
sliders: n=0.6:0.4:1:0.05; c=200:50:400:10; v=100:0:300:10
labels: \text{cost per tonne}
caption: Production cost per tonne (arbitrary currency units) against plant capacity in thousand tonnes per year ($x$): the capital charge $c\,(Q/100)^{n-1}$ for a plant whose charge is $c$ at $100\ \mathrm{kt\,a^{-1}}$, plus a variable cost $v$ (feedstock and energy) that does not depend on scale. With $n = 0.6$ a tenfold larger plant has a capital charge per tonne $2.5$ times smaller, but the advantage flattens out as variable costs — mostly feedstock — come to dominate. For $n = 1$ (no economy of scale, as for modular equipment such as electrolyser stacks) the curve is flat, which is why the economics of modular, distributed production differ from those of conventional plants.
:::

::: example Scaling a plant {#ex-scale}
A plant of capacity $50\ \mathrm{kt\,a^{-1}}$ costs $80$ million (currency units). Estimate the cost of a $500\ \mathrm{kt\,a^{-1}}$ plant by the six-tenths rule and the ratio of capital cost per tonne of capacity.
::: solution
$C_2 = 80\times(500/50)^{0.6} = 80\times10^{0.6} = 80\times3.98 = 318$ million. Per tonne of annual capacity: $80\,\mathrm{M}/50\,\mathrm{kt} = 1600$ per tonne against $318\,\mathrm{M}/500\,\mathrm{kt} = 637$ per tonne, a ratio of $10^{-0.4} = 0.40$. A tenfold increase in size reduces capital cost per tonne by $60\,\%$. This explains the steady growth of single-train capacities — ethylene crackers above $1.5\ \mathrm{Mt\,a^{-1}}$ and ammonia plants above $3000\ \mathrm{t}$ per day — and the vulnerability of the bulk sector: a giant plant must run near full capacity to recover its capital, and small, older plants close first when demand falls.
:::
:::

A complementary measure of how intensively equipment is used is the **space–time yield**, the mass of product per unit reactor volume per unit time ($\mathrm{kg\,m^{-3}\,h^{-1}}$). Bulk catalytic processes reach hundreds to thousands; batch fine-chemical processes, with long cycle times for charging, heating, cooling and emptying, often only a few. Raising space–time yield — by faster reactions, higher concentrations or continuous operation — reduces the size of plant needed for a given output, which is one of the goals of **process intensification** ([[green-chemistry/safer-solvents]]).

## From flask to plant: heat

A reaction that is gently exothermic in a $250\ \mathrm{cm^3}$ flask can be impossible to control in a $10\ \mathrm{m^3}$ reactor. The reason is that the heat generated grows with the volume of the reacting mixture, while the heat removed through the wall grows only with its area.

::: definition Adiabatic temperature rise {#def-dtad}
The **adiabatic temperature rise** of a reaction mixture is the increase in temperature that would occur if the reaction went to completion with no heat exchanged with the surroundings:
$$
\Delta T_\mathrm{ad} = \frac{(-\Delta_\mathrm{r}H)\,c_\mathrm{A,0}}{\rho\,c_p} = \frac{(-\Delta_\mathrm{r}H)\,b_\mathrm{A,0}}{c_p} ,
$$ {#eq-dtad}
where $c_\mathrm{A,0}$ is the initial concentration (moles per unit volume) of the limiting reactant, $b_\mathrm{A,0}$ the same per unit mass of mixture, $\rho$ the density and $c_p$ the specific heat capacity of the mixture, $\Delta_\mathrm{r}H$ being per mole of limiting reactant. It is the starting point of thermal-hazard assessment: a mixture whose $\Delta T_\mathrm{ad}$ could take it above the boiling point of the solvent or the onset temperature of a decomposition is a potential runaway.
:::

::: example How hot could it get? {#ex-dtad}
A batch reaction is charged with $2.0\ \mathrm{mol}$ of limiting reactant per kilogram of mixture; $\Delta_\mathrm{r}H = -150\ \mathrm{kJ}$ per mole of limiting reactant and $c_p = 1.8\ \mathrm{kJ\,kg^{-1}\,K^{-1}}$. Find $\Delta T_\mathrm{ad}$ and comment for a reaction started at $40\,^\circ\mathrm{C}$ in a solvent boiling at $110\,^\circ\mathrm{C}$.
::: solution
$$
\Delta T_\mathrm{ad} = \frac{150\ \mathrm{kJ\,mol^{-1}}\times2.0\ \mathrm{mol\,kg^{-1}}}{1.8\ \mathrm{kJ\,kg^{-1}\,K^{-1}}} = 167\ \mathrm{K}.
$$
If all the reactants were charged at once and cooling failed, the mixture would heat towards $40 + 167 = 207\,^\circ\mathrm{C}$; in practice it would boil at $110\,^\circ\mathrm{C}$, and the vapour generation could overpressurise the vessel, while any decomposition with an onset below $207\,^\circ\mathrm{C}$ could be triggered. Standard remedies are to **dose** one reactant slowly so that only a small amount is unreacted at any time (the accumulation, not the total, sets the worst case), to dilute (at the cost of more solvent and a higher PMI), or to move the reaction to a small continuous reactor. Thermal data of this kind are measured by reaction calorimetry and differential scanning calorimetry before scale-up.
:::
:::

::: proposition Heat removal and scale {#prop-heat-scale}
For geometrically similar vessels of characteristic size $L$, the rate of heat generation by a reaction proceeding at a given rate per unit volume scales as $L^3$, while the maximum rate of heat removal through the wall at a given overall heat-transfer coefficient $U$ and temperature difference scales as $L^2$:
$$
\frac{\dot Q_\mathrm{gen}}{\dot Q_\mathrm{rem}} = \frac{r\,(-\Delta_\mathrm{r}H)\,V}{U A\,\Delta T} \ \propto\ \frac{V}{A} \ \propto\ L .
$$
For a cylinder with height equal to diameter $D$, cooled over its whole surface, $A/V = 6/D$; scaling up by a factor $k$ in volume reduces $A/V$ by $k^{1/3}$.
:::

::: proof
The rate of heat generation is the reaction rate per unit volume $r$ (fixed by concentration and temperature, which are kept the same on scale-up) times $-\Delta_\mathrm{r}H$ times the volume $V$. Heat removal through the wall is $UA\,\Delta T$ (Newton's law of cooling), with $\Delta T$ limited by the coolant available. Geometric similarity means every length scales with $L$, so $V \propto L^3$ and $A \propto L^2$, and the ratio scales with $V/A \propto L$. For a cylinder of diameter $D$ and height $D$: $V = \pi D^3/4$ and $A = \pi D^2 + 2(\pi D^2/4) = 3\pi D^2/2$, so $A/V = 6/D$. Since $D \propto V^{1/3}$, multiplying $V$ by $k$ divides $A/V$ by $k^{1/3}$. ($U$ also changes on scale-up, because stirring and wall thickness change, but not enough to compensate.)
:::

::: example From one litre to ten cubic metres {#ex-av}
Compare the area-to-volume ratio of a $1.0\ \mathrm{dm^3}$ vessel with that of a $10\ \mathrm{m^3}$ reactor, both cylinders with height equal to diameter.
::: solution
For $V = 1.0\times10^{-3}\ \mathrm{m^3}$, $D = (4V/\pi)^{1/3} = 0.108\ \mathrm{m}$ and $A/V = 6/D = 55\ \mathrm{m^{-1}}$. For $V = 10\ \mathrm{m^3}$, $D = 2.34\ \mathrm{m}$ and $A/V = 2.6\ \mathrm{m^{-1}}$. The ratio is $(10/10^{-3})^{1/3} = 21.5$. A reaction whose heat was easily removed in the laboratory releases, per unit of cooling area, $21.5$ times as much heat in the plant; to keep the same temperature, the dosing rate must be slowed, extending the batch time by a similar factor, or extra cooling (internal coils, external loops, reflux condensers) must be added. A microreactor channel of $1\ \mathrm{mm}$ diameter has $A/V = 4/d = 4000\ \mathrm{m^{-1}}$, which is why fast, very exothermic reactions are increasingly run in flow.
:::
:::

### Thermal runaway

The danger is not merely that cooling is slow but that it can be outrun. The heat generated rises exponentially with temperature, through the Arrhenius factor, while the heat removed rises only linearly. Nikolay Semenov's analysis of 1928, originally for gas-phase explosions, shows when this leads to runaway.

::: proposition Semenov criterion for thermal runaway {#prop-semenov}
For a well-mixed reactor at temperature $T$ with a coolant at $T_\mathrm{c}$, let the heat generation be $\dot Q_\mathrm{g} = B\exp(-E_\mathrm{a}/RT)$ (reactant consumption neglected) and the heat removal $\dot Q_\mathrm{r} = UA(T - T_\mathrm{c})$. A stable steady state exists only if the line $\dot Q_\mathrm{r}$ intersects the curve $\dot Q_\mathrm{g}$; the critical condition is tangency, at which
$$
T_* - T_\mathrm{c} = \frac{R T_*^2}{E_\mathrm{a}} \approx \frac{R T_\mathrm{c}^2}{E_\mathrm{a}} .
$$ {#eq-semenov}
If the coolant temperature rises (or $UA$ falls) past the critical value, the reactor temperature jumps uncontrollably.
:::

::: proof
At the critical point both the heat balance and its derivative balance: $B\exp(-E_\mathrm{a}/RT_*) = UA(T_* - T_\mathrm{c})$ and $B\exp(-E_\mathrm{a}/RT_*)\,E_\mathrm{a}/RT_*^2 = UA$. Dividing the first by the second gives $T_* - T_\mathrm{c} = RT_*^2/E_\mathrm{a}$. This quadratic in $T_*$, $RT_*^2 - E_\mathrm{a}T_* + E_\mathrm{a}T_\mathrm{c} = 0$, has the physically relevant root $T_* = [E_\mathrm{a} - \sqrt{E_\mathrm{a}^2 - 4E_\mathrm{a}RT_\mathrm{c}}]/2R$; expanding for $RT_\mathrm{c}/E_\mathrm{a} \ll 1$ gives $T_* \approx T_\mathrm{c} + RT_\mathrm{c}^2/E_\mathrm{a}$. Below the tangency, the lower intersection is stable: a small temperature rise increases removal more than generation. Above it, no intersection exists below the upper (high-temperature) branch, and the temperature rises until reactant is exhausted.
:::

::: widget plot
f: exp(80/0.008314*(1/300 - 1/x)); U*(x - Tc)
x: 280, 360
y: 0, 30
sliders: Tc=300:280:320:0.5; U=1:0.3:3:0.05
labels: \dot Q_\mathrm{g}\ \text{(generation)}; \dot Q_\mathrm{r}\ \text{(removal)}
caption: A Semenov diagram for a reaction with $E_\mathrm{a} = 80\ \mathrm{kJ\,mol^{-1}}$: heat generation (exponential, normalised to $1$ at $300\ \mathrm{K}$) and heat removal $U(T - T_\mathrm{c})$, against reactor temperature $T$ in kelvin ($x$). Where the line cuts the curve from above, the steady state is stable. Raise the coolant temperature $T_\mathrm{c}$ (with $U = 1$ the critical value is about $312.5\ \mathrm{K}$) or lower the cooling capacity $U$ until the line just touches the curve: that is the critical condition [[#eq-semenov]], with $T_* - T_\mathrm{c}$ close to $RT^2/E_\mathrm{a} \approx 9\ \mathrm{K}$. Beyond it, there is no stable low-temperature state and the reaction runs away. Scale-up, which lowers the area per unit volume and hence the effective $U$, moves a safe process towards this point.
:::

::: warning "It worked in the lab" is not a safety assessment {#warn-scaleup}
A laboratory flask has a large area per unit volume and, at the bench, the chemist can watch and intervene. On scale-up, heat removal per unit volume falls by an order of magnitude ([[#ex-av]]), mixing times rise from seconds to minutes, and an addition that took a minute takes an hour, changing which reactions compete. Several serious incidents in batch plants — the 1976 Seveso release among them — involved reactions that behaved well at small scale and ran away at large scale or when a batch was left in an unusual state. Before scale-up, process chemists measure the heat of reaction, $\Delta T_\mathrm{ad}$, the accumulation of unreacted reagent during dosing, and the onset temperatures of decompositions, and carry out a structured hazard study (for example a HAZOP, a hazard and operability study). In the EU, sites holding large quantities of dangerous substances are regulated under the Seveso III Directive (2012/18/EU), which requires safety reports and emergency planning.
:::

## Batch, continuous and the shape of a plant

A chemical plant is built from a small number of **unit operations**, a concept introduced by Arthur D. Little at MIT in 1915: reaction, heat exchange, mixing, distillation, absorption, extraction, crystallisation, filtration, drying, comminution, compression and pumping. Any process can be drawn as a **process flow diagram** connecting these operations. A typical continuous plant has a feed-preparation section, a reactor, and a much larger separation section that recovers the product, recycles unreacted feed and removes by-products. In most bulk processes the **separation**, not the reaction, accounts for most of the capital and energy: distillation alone is often estimated to use a large fraction of the energy consumed by the chemical and refining industries, because it vaporises and condenses the whole stream to separate components that may differ only slightly in volatility.

| | batch | continuous |
|---|---|---|
| typical products | fine chemicals, pharmaceuticals, speciality chemicals | bulk chemicals, polymers, fuels |
| scale | kg to a few thousand t per year | $10^4$ to $10^6$ t per year |
| flexibility | one plant, many products | one plant, one product |
| hazardous inventory | whole batch | reactor hold-up only |
| quality control | batch-wise testing and release | continuous monitoring |
| downtime | charging, heating, cooling, cleaning | start-up and shut-down only |

The traditional division is weakening. Pharmaceutical manufacturers have introduced continuous processes, encouraged by regulators (the ICH Q13 guideline on continuous manufacturing of drug substances and products was adopted in 2022), because flow reactors offer better heat transfer, smaller inventories and more consistent quality; and modular, containerised plants are being built for smaller-volume products. The technology is discussed in [[green-chemistry/safer-solvents]].

::: quiz
A reaction has a per-pass conversion of $25\,\%$ and a selectivity of $96\,\%$; unreacted feed is fully recovered and recycled. What is the overall yield of product based on fresh feed?
- [ ] $24\,\%$
- [ ] $25\,\%$
- [x] $96\,\%$
- [ ] $100\,\%$
::: solution
With complete recycle all of the fresh feed eventually reacts ([[#prop-recycle]]), so the overall conversion is $1$ and the overall yield equals the selectivity, $96\,\%$. The per-pass yield $XS = 24\,\%$ describes one pass through the reactor, not the process. The low per-pass conversion costs a recycle flow three times the fresh feed.
:::
:::

## Economics and the green-chemistry agenda

The first estimate a process designer makes is the **economic potential**: the value of the products minus the cost of the raw materials, per year, before any equipment is designed. It is a mass balance with prices attached, and it explains why bulk processes are so efficient in their use of materials. Raw materials typically account for well over half of the production cost of a commodity chemical, so selectivity is money: in a plant making $10^6\ \mathrm{t\,a^{-1}}$ of a product worth €$1000$ per tonne from feed costing €$600$ per tonne, a $1\,\%$ loss of selectivity wastes about six million euros a year in feed, before the cost of treating the by-product. Energy is usually the next largest cost.

This alignment of economic and environmental interest — less waste and less energy mean lower cost — is the reason the bulk industry reached low E-factors long before green chemistry had a name. It is also why green chemistry has had most to offer where the alignment is weakest: in fine chemicals, where raw-material cost is a small part of product value and development speed matters more; in hazards, which are not priced until something goes wrong; and in **externalities** such as greenhouse gases, whose cost falls on society unless policy puts a price on them, as the EU Emissions Trading System has done for large industrial emitters since 2005.

::: history From the Leblanc process to the integrated site {#hist-industry}
The modern chemical industry began with alkali. Nicolas Leblanc's process for sodium carbonate from salt (patented 1791) spread through Britain in the early nineteenth century and produced so much hydrogen chloride that the Alkali Act of 1863 created the first industrial pollution inspectorate. William Henry Perkin's synthesis of mauveine (1856) founded the synthetic-dye industry, which gave rise to BASF (1865), Bayer and Hoechst. The Solvay process (1860s) displaced Leblanc's, and the Haber–Bosch ammonia synthesis (first plant at Oppau, 1913) introduced high-pressure catalytic processing. Arthur D. Little's concept of unit operations (1915) and the first chemical-engineering textbooks of the 1920s turned process design into a discipline. After 1945 petroleum and natural gas replaced coal as the main feedstock, steam cracking supplied the olefins for the polymer industry, and the large integrated site — the German *Verbund* at Ludwigshafen is the archetype — linked hundreds of plants by pipelines that pass each one's products and by-products to the next. Major accidents at Flixborough (1974), Seveso (1976) and Bhopal (1984) made process safety a core part of chemical engineering.
:::

## Where this leads

The vocabulary of this chapter — conversion and selectivity, recycle and purge, economy of scale, adiabatic temperature rise and heat removal — is used in every remaining chapter. [[green-chemistry/industrial-inorganic]] applies it to ammonia, sulfuric acid, nitric acid, chlor-alkali and soda ash, where the central question is how to choose temperature and pressure for a reversible exothermic reaction. [[green-chemistry/petrochemicals]] follows carbon from crude oil and natural gas to the base chemicals and polymers. The chemical-engineering background — reactor design, mass and energy balances — is treated in reference books such as Moulijn, Makkee and van Diepen's *Chemical Process Technology*; the kinetics of catalytic reactors is in [[kinetics/surface-kinetics]] and [[organometallics-catalysis/heterogeneous-catalysis]].

::: summary
- The chemical industry converts a few raw materials (natural gas, oil, coal, salt, air, water, sulfur, phosphate, biomass) through base chemicals and intermediates into products; the IEA's seven primary chemicals produced about $935\ \mathrm{Mt}$ of direct $\mathrm{CO_2}$ in 2022.
- Bulk chemicals are sold by specification at large scale in continuous plants; fine chemicals by specification in batch plants; speciality chemicals by function. Their green challenges differ: energy and carbon for bulk, mass efficiency and hazard for fine.
- Reactors are described by conversion, selectivity and yield ($Y = XS$); with complete recycle the overall yield equals the selectivity, and the recycle flow is $F(1 - X)/X$. Inerts require a purge.
- Capital cost scales roughly as capacity$^{0.6}$, so cost per tonne falls as capacity$^{-0.4}$ — the empirical basis of very large single-train plants.
- Heat generation scales with volume and removal with area; $A/V$ falls as $V^{-1/3}$ on scale-up. The adiabatic temperature rise $(-\Delta_\mathrm{r}H)b_\mathrm{A,0}/c_p$ and the Semenov criterion $T_* - T_\mathrm{c} \approx RT^2/E_\mathrm{a}$ assess runaway risk.
- Separations dominate the cost and energy of many plants; economic and environmental interests align on materials and energy, but not automatically on hazards and externalities.
:::

## Exercises

::: exercise Six-tenths rule {level=1 check="151.6"}
A $200\ \mathrm{kt\,a^{-1}}$ plant costs $100$ million. Estimate the cost of a $400\ \mathrm{kt\,a^{-1}}$ plant by the six-tenths rule. (Enter the cost in millions, to four significant figures.)
::: solution
$C = 100\times2^{0.6} = 100\times1.516 = 151.6$ million. Doubling capacity raises cost by only $52\,\%$, so capital per tonne falls by $24\,\%$.
:::
:::

::: exercise Yield from conversion and selectivity {level=1 check="53.3"}
A single pass through a reactor converts $65\,\%$ of the feed, with $82\,\%$ selectivity to product. What is the per-pass yield? (Enter it in per cent.)
::: solution
$Y = XS = 0.65\times0.82 = 0.533$, i.e. $53.3\,\%$. The remaining $35\,\%$ of the feed is unreacted (and can be recycled); $0.65\times0.18 = 11.7\,\%$ has become by-products.
:::
:::

::: exercise Space–time yield {level=1 check="80"}
A $30\ \mathrm{m^3}$ reactor produces $2.4\ \mathrm{t}$ of product per hour. Find the space–time yield. (Enter it in $\mathrm{kg\,m^{-3}\,h^{-1}}$.)
::: solution
$2400\ \mathrm{kg\,h^{-1}}/30\ \mathrm{m^3} = 80\ \mathrm{kg\,m^{-3}\,h^{-1}}$.
:::
:::

::: exercise Adiabatic temperature rise {level=2 check="117"}
A hydrogenation releases $-\Delta_\mathrm{r}H = 125\ \mathrm{kJ}$ per mole of substrate. The mixture contains $1.5\ \mathrm{mol}$ of substrate per kilogram and has $c_p = 1.6\ \mathrm{kJ\,kg^{-1}\,K^{-1}}$. Find $\Delta T_\mathrm{ad}$ if all the substrate were to react without cooling. (Enter it in K, to three significant figures.)
::: solution
$\Delta T_\mathrm{ad} = 125\times1.5/1.6 = 117.2\ \mathrm{K} \approx 117\ \mathrm{K}$. In a hydrogenation the reaction rate is usually controlled by the supply of hydrogen gas, which can be stopped, so the accumulation of unreacted hydrogen in the liquid is small — an intrinsic safety feature that slow dosing provides for liquid reagents.
:::
:::

::: exercise Recycle ratio {level=2 check="4"}
A partial oxidation is run at $20\,\%$ per-pass conversion to protect selectivity, with complete recovery and recycle of the unreacted hydrocarbon. What is the ratio of recycle flow to fresh feed? (Enter $R/F$.)
::: solution
$R/F = (1 - X)/X = 0.80/0.20 = 4$. The reactor and separation equipment handle five times the fresh feed; the trade is a larger plant for a higher selectivity.
:::
:::

::: exercise Scaling cooling {level=2 check="4.64"}
A process is scaled from a $0.10\ \mathrm{m^3}$ pilot reactor to a geometrically similar $10\ \mathrm{m^3}$ plant reactor. By what factor does the cooling area per unit volume fall? (Enter the factor to three significant figures.)
::: solution
$A/V \propto V^{-1/3}$, so the factor is $(10/0.10)^{1/3} = 100^{1/3} = 4.64$. If the pilot needed $40\,\%$ of its cooling capacity at the chosen dosing rate, the plant would need $186\,\%$ at the same rate per unit volume — impossible — so the dosing must be slowed to at most about half the pilot rate, or extra cooling area installed.
:::
:::

::: exercise The Semenov temperature margin {level=3 check="10.2"}
Derive the critical condition [[#eq-semenov]] and use the approximate form to find the maximum stable excess of reactor temperature over coolant temperature for a reaction with $E_\mathrm{a} = 100\ \mathrm{kJ\,mol^{-1}}$ cooled at $350\ \mathrm{K}$. Compare it with the exact root. (Enter the approximate value of $T_* - T_\mathrm{c}$ in K.)
::: hint
Impose both $\dot Q_\mathrm{g} = \dot Q_\mathrm{r}$ and $\mathrm{d}\dot Q_\mathrm{g}/\mathrm{d}T = \mathrm{d}\dot Q_\mathrm{r}/\mathrm{d}T$.
:::
::: solution
The derivation is that of [[#prop-semenov]]: dividing the two conditions gives $T_* - T_\mathrm{c} = RT_*^2/E_\mathrm{a}$. Approximately, $RT_\mathrm{c}^2/E_\mathrm{a} = 8.314\times350^2/100\,000 = 10.2\ \mathrm{K}$. The exact root $T_* = [E_\mathrm{a} - \sqrt{E_\mathrm{a}^2 - 4E_\mathrm{a}RT_\mathrm{c}}]/2R$, with $E_\mathrm{a}/R = 12\,028\ \mathrm{K}$, is $T_* = 6013.95 - \sqrt{6013.95^2 - 12\,027.9\times350} = 6013.95 - 5653.13 = 360.82\ \mathrm{K}$, i.e. $T_* - T_\mathrm{c} \approx 10.8\ \mathrm{K}$. A reactor that is stable only $10\ \mathrm{K}$ above its coolant has little margin, which is why exothermic batch processes are designed to run well inside the stable region.
:::
:::

::: exercise Losses through a purge {#exr-purge level=3 check="4.52"}
Fresh feed to a recycle loop contains a mole fraction $z = 0.0050$ of an inert gas (the rest is reactant). The inert leaves only in a purge stream taken from the recycle, whose inert mole fraction is held at $y = 0.10$; the rest of the purge is unreacted reactant. Show that the fraction of fresh reactant lost in the purge is $z(1 - y)/[y(1 - z)]$ and evaluate it. (Enter it in per cent.)
::: hint
At steady state the inert entering in the feed must equal the inert leaving in the purge.
:::
::: solution
Let the fresh feed be $F$ (total moles). Inert balance: $zF = yP$, so the purge is $P = zF/y$. It carries $(1 - y)P = z(1 - y)F/y$ moles of reactant, while the fresh reactant is $(1 - z)F$. The fraction lost is
$$
\frac{z(1 - y)}{y(1 - z)} = \frac{0.0050\times0.90}{0.10\times0.995} = 0.0452 ,
$$
i.e. $4.52\,\%$. Allowing the inert to build up to $y = 0.20$ would halve the loss ($2.0\,\%$) but dilute the reactants in the loop, lowering the reaction rate and, for an equilibrium-limited reaction such as ammonia synthesis, the per-pass conversion. In ammonia plants hydrogen is recovered from the purge gas, often by membranes or pressure-swing adsorption, to reduce exactly this loss.
:::
:::
