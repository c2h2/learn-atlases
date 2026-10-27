In the early hours of 3 December 1984, about forty tonnes of methyl isocyanate escaped from a storage tank at a pesticide plant in Bhopal, India, and drifted over the sleeping city. Thousands of people died within days and many more were injured for life; it remains the worst industrial disaster in history. The chemistry being done at Bhopal was not exotic: methyl isocyanate was an intermediate in the manufacture of carbaryl, an insecticide. What made the plant lethal was that a highly toxic, volatile and reactive intermediate was made in advance and *stored* in bulk, so that when safety systems failed there was a vast inventory to release. Ten years earlier, at Flixborough in England, a temporary pipe on a cyclohexane oxidation plant ruptured and the resulting vapour-cloud explosion killed 28 people; two years later, at Seveso in Italy, a runaway reaction released dioxin over the surrounding towns. Each disaster prompted tighter regulation. A deeper question took longer to be asked: **could the chemistry itself have been designed so that there was less to go wrong?**

That question is the starting point of **green chemistry**: the design of chemical products and processes that reduce or eliminate the use and generation of hazardous substances. Its central idea is that it is better to *prevent* hazard and waste at the molecular design stage than to control them afterwards with containment, scrubbing, treatment and disposal. Green chemistry is not a separate branch of chemistry with its own reactions; it is a way of choosing among the reactions, reagents, solvents, conditions and feedstocks that all of chemistry offers, using criteria that include hazard, waste, energy and resource use as well as yield and cost.

This chapter introduces the twelve principles of green chemistry formulated by Paul Anastas and John Warner, the distinction between **hazard** and **risk** on which they rest, the quantitative reasoning behind several principles (step counts, catalysis and energy), and **life-cycle thinking**, which stops us from solving one problem by creating another somewhere else. The following chapter, [[green-chemistry/green-metrics]], turns the principles into numbers. Throughout the course we use real industrial examples; descriptions are at textbook level, and hazards are stated so that the reasons for each design choice are clear.

## Why prevention beats treatment

Consider how a conventional chemical process deals with an unwanted by-product. It must be separated from the product, which costs energy and equipment; it must be stored, which creates an inventory that can leak; it must be treated or destroyed, which needs more reagents and energy and creates secondary waste; and whatever escapes treatment must be monitored in air, water and soil. Every one of these steps costs money and carries its own risk. A by-product that is never formed costs nothing.

The same logic applies to hazardous reagents and solvents. Engineering controls — fume cupboards, closed systems, scrubbers, bunding, personal protective equipment — reduce *exposure* to a hazardous substance, but they can fail, and they must be maintained, inspected and paid for over the whole life of the plant. Replacing the hazardous substance with a less hazardous one removes the need for some of those controls altogether. The safety engineer Trevor Kletz summarised the idea in 1978 in a phrase that has become a slogan of process safety: *what you don't have can't leak*. He called a plant that is safe because of its chemistry and design, rather than because of added protective systems, **inherently safer**.

::: definition Hazard and risk {#def-hazard-risk}
The **hazard** of a substance or situation is its intrinsic potential to cause harm: toxicity, flammability, explosivity, corrosivity, reactivity, persistence in the environment, ability to accumulate in organisms. It is a property of the substance and does not depend on how it is used. The **exposure** is the extent to which people or the environment actually come into contact with it: concentration in air or water, duration, frequency, route. The **risk** is the likelihood and severity of harm actually occurring, which depends on both:
$$
\text{risk} = f(\text{hazard},\ \text{exposure}),
$$
increasing in each argument and zero if either is zero. In the Globally Harmonised System of classification and labelling (GHS), adopted in the EU by the CLP Regulation (EC) No 1272/2008, hazards are classified into physical hazard classes (explosives, flammable liquids, oxidisers, self-reactive substances …), health hazard classes (acute toxicity, skin corrosion, carcinogenicity, mutagenicity, reproductive toxicity, specific target organ toxicity …) and environmental hazard classes (aquatic toxicity; ozone-layer hazard), each communicated by a pictogram, signal word and hazard statements.
:::

Traditional regulation and safety practice concentrate on the exposure term: they accept that the hazard is fixed and reduce exposure until the risk is acceptable. Green chemistry attacks the hazard term. The two approaches are complementary, but they have very different failure modes. If exposure controls fail, the full hazard is realised; if the hazard has been designed out, a failure of controls has less to release.

::: proposition Risk characterisation ratio {#prop-rcr}
Suppose a substance has a level of exposure below which no adverse effect is expected — for human health a **derived no-effect level** (DNEL), for the environment a **predicted no-effect concentration** (PNEC) — and that the actual exposure is $E$ (for example an air concentration at the workplace, or a predicted environmental concentration, PEC). Then the **risk characterisation ratio**
$$
\mathrm{RCR} = \frac{E}{\mathrm{DNEL}} \quad\text{or}\quad \mathrm{RCR} = \frac{\mathrm{PEC}}{\mathrm{PNEC}}
$$ {#eq-rcr}
indicates adequate control when $\mathrm{RCR} < 1$. The ratio can be lowered either by reducing $E$ (exposure control) or by raising the no-effect level (substituting a less hazardous substance). This is the scheme used in chemical safety assessments under the EU REACH Regulation (EC) No 1907/2006.
:::

::: proof
The no-effect level is derived from the lowest dose or concentration at which no adverse effect was observed in toxicological or ecotoxicological studies, divided by **assessment factors** (typically between $1$ and several thousand) that allow for extrapolation from animals to humans, from short to long exposure, from a few test species to whole ecosystems, and for variability between individuals. By construction, exposures below it are taken to be without appreciable risk. The ratio $E/\mathrm{DNEL}$ is then dimensionless and compares the actual exposure with this threshold: $\mathrm{RCR} < 1$ means the exposure is below the threshold. Because $\mathrm{RCR}$ is a quotient, a tenfold reduction in exposure and a tenfold increase in the no-effect level have the same effect on it — the formal statement that exposure control and hazard reduction are interchangeable *as long as the controls work*. The proposition is a regulatory convention rather than a law of nature: it assumes a threshold exists, which is not accepted for genotoxic carcinogens (for these a "derived minimal effect level" based on an acceptable excess risk is used instead), and its reliability depends on the assessment factors.
:::

::: example Exposure control or substitution? {#ex-rcr}
A solvent used for cleaning reactor vessels has a long-term inhalation DNEL for workers of $10\ \mathrm{mg\,m^{-3}}$. Monitoring shows a time-weighted average exposure of $15\ \mathrm{mg\,m^{-3}}$. (a) Is the risk adequately controlled? (b) Local exhaust ventilation would cut exposure by $90\,\%$; find the new RCR. (c) An alternative solvent with the same volatility (so the same exposure, $15\ \mathrm{mg\,m^{-3}}$, without the ventilation) has a DNEL of $200\ \mathrm{mg\,m^{-3}}$. Find its RCR and comment.
::: solution
(a) $\mathrm{RCR} = 15/10 = 1.5 > 1$: the risk is not adequately controlled.

(b) With ventilation, $E = 0.10\times15 = 1.5\ \mathrm{mg\,m^{-3}}$ and $\mathrm{RCR} = 1.5/10 = 0.15$.

(c) $\mathrm{RCR} = 15/200 = 0.075$, lower than (b) with no added equipment.

Both options achieve $\mathrm{RCR} < 1$, but they are not equivalent. Option (b) depends on the ventilation working: if a fan fails or a duct is blocked the RCR returns to $1.5$. Option (c) is controlled even then (and ventilation could be added as well, giving $0.0075$). The substitution also removes the hazard downstream — in waste streams, transport and storage — where the ventilation does nothing. The green-chemistry preference for (c) is a preference for robustness, not a claim that (b) is unacceptable.
:::
:::

::: warning Hazard and risk are not the same thing {#warn-hazard-risk}
Two errors are common and opposite. The first is to treat a hazardous substance as dangerous whatever the circumstances: concentrated sulfuric acid is corrosive, yet the contact process ([[green-chemistry/industrial-inorganic]]) handles hundreds of millions of tonnes a year safely in closed systems, and replacing it would usually create greater problems elsewhere. The second, more dangerous, is to treat a low measured risk as proof of low hazard: "we have never had an incident" says nothing about what happens when the controls fail. Bhopal's storage tank was, until the night of the release, a low-risk installation by the measure of past incidents. Green chemistry asks for both numbers — how hazardous, and how exposed — and seeks to reduce the first wherever a practical alternative exists. A related error is to equate "natural" with "safe" or "green": many natural products are acutely toxic, and a bio-based solvent can be more hazardous than a petrochemical one.
:::

## The twelve principles

In their 1998 book *Green Chemistry: Theory and Practice*, Paul Anastas and John Warner set out twelve principles that have become the standard statement of the field. They are design guidelines, not laws: several of them can conflict in a given case, and the art lies in balancing them. In paraphrase:

1. **Prevention.** It is better to prevent waste than to treat or clean it up after it has been formed.
2. **Atom economy.** Synthetic methods should be designed to incorporate as much as possible of the materials used in the process into the final product.
3. **Less hazardous chemical syntheses.** Wherever practicable, methods should use and generate substances that have little or no toxicity to human health and the environment.
4. **Designing safer chemicals.** Chemical products should be designed to achieve their desired function while minimising their toxicity.
5. **Safer solvents and auxiliaries.** The use of auxiliary substances (solvents, separation agents) should be avoided where possible and made innocuous when used.
6. **Design for energy efficiency.** Energy requirements should be recognised for their environmental and economic impacts and minimised; if possible, syntheses should run at ambient temperature and pressure.
7. **Use of renewable feedstocks.** A raw material should be renewable rather than depleting whenever technically and economically practicable.
8. **Reduce derivatives.** Unnecessary derivatisation (protecting groups, temporary modifications) should be avoided, because each extra step needs reagents and generates waste.
9. **Catalysis.** Catalytic reagents, as selective as possible, are superior to stoichiometric reagents.
10. **Design for degradation.** Chemical products should be designed so that at the end of their function they break down into innocuous products and do not persist in the environment.
11. **Real-time analysis for pollution prevention.** Analytical methods should allow in-process monitoring and control before hazardous substances form.
12. **Inherently safer chemistry for accident prevention.** Substances and their physical form should be chosen to minimise the potential for accidents, including releases, explosions and fires.

The principles fall into a few groups. Principles 1, 2, 8 and 9 are about **mass**: what goes into a process and what comes out other than product. They are quantified by atom economy, the E-factor and process mass intensity in [[green-chemistry/green-metrics]], and the synthetic side of atom economy — why the Diels–Alder reaction scores $100\,\%$ and the Wittig reaction about $27\,\%$ — appears in [[organic-synthesis/retrosynthesis]] and [[organic-synthesis/carbon-carbon-bonds]]. Principles 3, 4, 5 and 12 are about **hazard**. Principle 6 is about **energy**, principle 7 about **resources** ([[green-chemistry/renewable-feedstocks]]), principle 10 about the **end of life** of products ([[green-chemistry/circular-economy]]) and principle 11 about **process control**. In 2003 Anastas and Julie Zimmerman published a parallel set of twelve principles of green *engineering*, emphasising that the same ideas apply to equipment and plant design: maximise mass, energy, space and time efficiency; prefer "output-pulled" to "input-pushed" processes; design for separation; design for commercial afterlife.

::: intuition The principles as a checklist of questions
A useful way to apply the principles is to ask, for each step of a proposed route: *Where do all the atoms go? What is the most hazardous substance present, and how much of it is there at any moment? What does the solvent do, and could we do without it? How hot, how cold, how high a pressure — and why? Is a reagent being used stoichiometrically that a catalyst could replace? Does any step exist only to undo another?* Each question corresponds to a principle, and each answer suggests a change to try.
:::

### Catalysis and atom economy: an oxidation compared

Principles 2, 3 and 9 often point the same way, and a classic case shows why. The oxidation of a secondary alcohol to a ketone was for decades done in industry and teaching laboratories with chromium(VI) — sodium dichromate in sulfuric acid. Chromium(VI) compounds are carcinogenic and very toxic to aquatic life; in the EU several of them have been included in Annex XIV of REACH, which means they may be used only under a specific authorisation. The stoichiometric chromium also ends up as chromium(III) sulfate waste. A catalytic aerobic oxidation, using a supported metal catalyst (palladium, gold or ruthenium systems are known) or a nitroxyl radical such as TEMPO with a co-catalyst, uses oxygen from air as the oxidant and gives water as the only by-product.

::: example Two oxidations of 1-phenylethanol {#ex-oxidation}
Compare the atom economies of the oxidation of 1-phenylethanol ($\mathrm{C_8H_{10}O}$, $M = 122.17\ \mathrm{g\,mol^{-1}}$) to acetophenone ($\mathrm{C_8H_8O}$, $120.15\ \mathrm{g\,mol^{-1}}$) by (a) dichromate,
$$
3\,\mathrm{C_8H_{10}O} + \mathrm{Na_2Cr_2O_7} + 4\,\mathrm{H_2SO_4} \rightarrow 3\,\mathrm{C_8H_8O} + \mathrm{Cr_2(SO_4)_3} + \mathrm{Na_2SO_4} + 7\,\mathrm{H_2O},
$$
and (b) a catalytic aerobic oxidation, $2\,\mathrm{C_8H_{10}O} + \mathrm{O_2} \rightarrow 2\,\mathrm{C_8H_8O} + 2\,\mathrm{H_2O}$. Find also the minimum mass of by-products per kilogram of ketone in each case (molar masses: $\mathrm{Na_2Cr_2O_7}$ $261.97$, $\mathrm{H_2SO_4}$ $98.07$, $\mathrm{O_2}$ $32.00\ \mathrm{g\,mol^{-1}}$).
::: solution
**Check the balance of (a).** Each alcohol loses two H atoms (two electrons); three alcohols release six electrons, which reduce two Cr(VI) to two Cr(III). On the right, $2$ Cr, $2$ Na, $4$ S and $7\,\mathrm{H_2O}$: hydrogen on the left is $3\times10 + 4\times2 = 38$, on the right $3\times8 + 14 = 38$; oxygen $3 + 7 + 16 = 26$ on the left, $3 + 12 + 4 + 7 = 26$ on the right.

The atom economy is the mass of desired product divided by the total mass of reactants in the balanced equation (formalised in [[green-chemistry/green-metrics]]):
$$
\mathrm{AE_a} = \frac{3\times120.15}{3\times122.17 + 261.97 + 4\times98.07} = \frac{360.45}{1020.8} = 35.3\,\%,
\qquad
\mathrm{AE_b} = \frac{2\times120.15}{2\times122.17 + 32.00} = \frac{240.30}{276.33} = 87.0\,\%.
$$
By mass conservation the by-products in (a) amount to $1020.8 - 360.45 = 660.4\ \mathrm{g}$ per $360.45\ \mathrm{g}$ of ketone, i.e. $1.83\ \mathrm{kg}$ per kilogram, of which most is chromium(III) and sodium sulfates; in (b) only $0.150\ \mathrm{kg}$ of water per kilogram. These are minimum figures that assume $100\,\%$ yield and no excess reagent or solvent; real processes are worse, as the next chapter shows. The more important difference is qualitative: (a) uses a carcinogen and produces a heavy-metal waste, (b) produces water. The catalytic route still has hazards — organic vapour with oxygen can form flammable mixtures, so industrial aerobic oxidations are run below the oxygen limiting concentration or in flow — illustrating that principles 9 and 12 must be considered together.
:::
:::

### Step count and protecting groups

Principle 8 rests on simple arithmetic. In a linear synthesis each step has a yield below $100\,\%$, and yields multiply.

::: proposition Overall yield of a linear sequence {#prop-overall-yield}
If a target is made in $n$ consecutive steps with fractional yields $y_1, y_2, \dots, y_n$, the overall yield is
$$
Y = \prod_{i=1}^{n} y_i , \qquad\text{and if all } y_i = y,\quad Y = y^n ,
$$ {#eq-overall-yield}
so the mass of the first starting material needed per mole of product grows as $y^{-n}$, exponentially in the number of steps.
:::

::: proof
Let $n_0$ moles of starting material enter step 1. By definition of the yield of step $i$, the amount of its product is $y_i$ times the amount of its limiting reactant, which is the product of step $i-1$. By induction the amount leaving step $k$ is $n_0\prod_{i=1}^{k}y_i$, and after step $n$ it is $n_0 Y$. Inverting, the starting material needed per mole of final product is $1/Y$; with equal yields this is $y^{-n} = \mathrm{e}^{-n\ln y}$, an exponential in $n$ because $\ln y < 0$. (In a convergent synthesis, where branches are made in parallel and joined, the relevant $n$ for each branch is the length of its own path to the target, which is why convergence helps — see [[organic-synthesis/retrosynthesis]].)
:::

::: widget plot
f: 100*y^x; 100*(y+0.05)^x
x: 1, 20
y: 0, 100
sliders: y=0.8:0.5:0.95:0.01
labels: Y\ (\%),\ \text{step yield } y; Y\ (\%),\ \text{step yield } y + 0.05
caption: Overall yield [[#eq-overall-yield]] in per cent against the number of steps $n$ ($x$) for a constant step yield $y$ (slider) and for a yield five points higher. At $y = 0.80$ a ten-step route gives $10.7\,\%$; removing two protecting-group steps (one to protect, one to deprotect) raises it to $16.8\,\%$ — two-thirds of the gain from improving all ten steps from $80$ to $85\,\%$ ($19.7\,\%$), and far easier to achieve. Each avoided step also saves its reagents, solvents, work-up and energy.
:::

Protecting groups ([[organic-synthesis/protecting-groups]]) are the most common source of steps that do not build the target: a group is attached, carried through one or more transformations, and removed, adding at least two steps and generating the protecting reagent's mass as waste. Avoiding them requires **chemoselective** reagents and catalysts that act on one functional group in the presence of others — one of the main motivations for modern catalysis and biocatalysis ([[green-chemistry/renewable-feedstocks]]).

### Energy and catalysis

Principle 6 asks for ambient conditions where possible. Heating a reaction vessel, refluxing a solvent, distilling a product and cooling a cryogenic reaction all consume energy, much of it generated from fossil fuels. Even a modest heating duty adds up at scale: warming $1.00\ \mathrm{t}$ of toluene ($c_p \approx 1.70\ \mathrm{kJ\,kg^{-1}\,K^{-1}}$) from $20$ to $110\,^\circ\mathrm{C}$ needs $1000\times1.70\times90\ \mathrm{kJ} = 153\ \mathrm{MJ}$ before any reaction, reflux or distillation. A catalyst is the most direct way to reach a useful rate at lower temperature.

::: proposition Rate enhancement by a catalyst {#prop-catalyst-rate}
If a catalyst lowers the activation energy of a reaction from $E_\mathrm{a}$ to $E_\mathrm{a}'$ without changing the pre-exponential factor (an idealisation), the ratio of rate constants at temperature $T$ is
$$
\frac{k'}{k} = \exp\!\left(\frac{E_\mathrm{a} - E_\mathrm{a}'}{RT}\right),
$$ {#eq-catalyst-rate}
and the uncatalysed reaction would reach the catalysed rate at temperature $T$ only at the higher temperature $T^* = T\,E_\mathrm{a}/E_\mathrm{a}'$.
:::

::: proof
By the Arrhenius equation $k = A\exp(-E_\mathrm{a}/RT)$ ([[kinetics/collision-theory]]), $k'/k = \exp[-(E_\mathrm{a}' - E_\mathrm{a})/RT]$ with the same $A$. For the second statement set $A\exp(-E_\mathrm{a}/RT^*) = A\exp(-E_\mathrm{a}'/RT)$; taking logarithms, $E_\mathrm{a}/T^* = E_\mathrm{a}'/T$, so $T^* = T E_\mathrm{a}/E_\mathrm{a}'$. In reality a catalyst opens a different pathway with its own pre-exponential factor (often smaller for surface reactions), so the formula is an estimate. A catalyst changes rates, not equilibria: it cannot raise the equilibrium conversion, a point that matters for the reversible industrial reactions of [[green-chemistry/industrial-inorganic]].
:::

::: widget plot
x: 280, 700
y: -12, 4
sliders: Ea=100:40:200:5; Ec=70:20:150:5
f: 13 - Ea*1000/(2.303*8.314*x); 13 - Ec*1000/(2.303*8.314*x)
labels: \log_{10}(k/\mathrm{s^{-1}}),\ \text{uncatalysed}; \log_{10}(k/\mathrm{s^{-1}}),\ \text{catalysed}
hlines: -3
caption: Arrhenius lines for an uncatalysed reaction (activation energy $E_\mathrm{a}$, slider $\mathrm{Ea}$ in $\mathrm{kJ\,mol^{-1}}$) and a catalysed one ($E_\mathrm{a}'$, slider $\mathrm{Ec}$), both with $A = 10^{13}\ \mathrm{s^{-1}}$, against temperature $T$ in kelvin ($x$). The horizontal line marks $k = 10^{-3}\ \mathrm{s^{-1}}$ (a half-life of about $12$ minutes). Read off the temperature at which each line crosses it: lowering $E_\mathrm{a}$ from $100$ to $70\ \mathrm{kJ\,mol^{-1}}$ brings the required temperature down by more than $100\ \mathrm{K}$, as [[#prop-catalyst-rate]] predicts.
:::

::: example What a catalyst is worth in temperature {#ex-catalyst-T}
An uncatalysed reaction has $E_\mathrm{a} = 100\ \mathrm{kJ\,mol^{-1}}$; a catalyst lowers it to $70\ \mathrm{kJ\,mol^{-1}}$. (a) By what factor does the rate constant increase at $25\,^\circ\mathrm{C}$? (b) At what temperature would the uncatalysed reaction be as fast as the catalysed one at $25\,^\circ\mathrm{C}$, assuming equal pre-exponential factors?
::: solution
(a) By [[#eq-catalyst-rate]],
$$
\frac{k'}{k} = \exp\!\left(\frac{30\,000\ \mathrm{J\,mol^{-1}}}{8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}\times298.15\ \mathrm{K}}\right) = \exp(12.10) = 1.8\times10^{5}.
$$
(b) $T^* = 298.15\ \mathrm{K}\times100/70 = 425.9\ \mathrm{K}$, i.e. about $153\,^\circ\mathrm{C}$. Running at room temperature instead of $153\,^\circ\mathrm{C}$ saves the heating duty, may allow a lower-boiling, less hazardous solvent or no pressure vessel, and often improves selectivity, because side reactions with higher activation energies are suppressed more strongly than the main reaction as the temperature falls. The answer to (a) is given to two significant figures because the exponent, $12.10$, carries the uncertainty of the activation energies; an error of $1\ \mathrm{kJ\,mol^{-1}}$ in $E_\mathrm{a} - E_\mathrm{a}'$ changes the factor by $50\,\%$.
:::
:::

## Inherent safety and inventory

Principle 12 asks us to choose substances and their physical form to minimise the potential for accidents. Kletz's hierarchy of inherent safety, now standard in process-safety engineering, has four strategies, in order of preference:

- **Minimise (intensify):** use smaller quantities of hazardous materials — smaller reactors, smaller storage, continuous rather than batch operation.
- **Substitute:** replace a hazardous material or reaction with a less hazardous one.
- **Moderate (attenuate):** use hazardous materials in a less hazardous form or under less hazardous conditions — dilute rather than concentrated, lower temperature and pressure, a solid rather than a dust or vapour.
- **Simplify:** design out opportunities for error, for example by making equipment strong enough to contain the maximum possible pressure rather than relying on relief systems.

Bhopal is the textbook case for the first two. The hazardous intermediate was made and stored in tanks holding tens of tonnes, when the downstream step needed only a small amount at any moment. Alternative manufacturing routes to carbamate insecticides that do not involve storing methyl isocyanate were known, and after 1984 the industry moved towards generating such intermediates only in small quantities and consuming them immediately as they are formed, so that the inventory at any instant is small. That change does not alter the hazard of the molecule; it reduces the quantity that could ever be released.

::: example Inventory in batch and continuous operation {#ex-inventory}
A product is made at $0.80\ \mathrm{t\,h^{-1}}$ of reaction mixture. In batch operation each $8.0\ \mathrm{t}$ batch occupies the reactor for a $10\ \mathrm{h}$ cycle. A continuous tubular reactor achieves the same conversion with a residence time of $10\ \mathrm{min}$. Compare the mass of reacting mixture present at any moment.
::: solution
In the batch reactor the inventory is the whole batch, $8.0\ \mathrm{t}$, for most of the cycle. In a continuous reactor at steady state the hold-up is the mass flow rate times the residence time (the definition of residence time, developed in [[green-chemistry/safer-solvents]]):
$$
m = \dot m\,\tau = 0.80\ \mathrm{t\,h^{-1}}\times\frac{10}{60}\ \mathrm{h} = 0.133\ \mathrm{t}.
$$
The inventory is $8.0/0.133 = 60$ times smaller. The reaction kinetics are unchanged; what changes is that the continuous reactor processes the same throughput in small portions, each passing quickly through the hazardous zone. The trade-off is that continuous plants are less flexible and need reliable feed control and on-line analysis (principle 11) to keep the product in specification. The gain in safety is largest for fast, exothermic reactions, where the small reactor also removes heat better (see [[green-chemistry/chemical-industry]]).
:::
:::

::: quiz
A process uses a flammable, toxic gas that is delivered in large cylinders and stored on site. Which change is the best example of an *inherently* safer design rather than an added safeguard?
- [ ] Installing gas detectors linked to an automatic shut-off valve
- [ ] Training operators in emergency response
- [x] Generating the gas on demand in a small unit that feeds it directly to the reactor, so that only a few kilograms are present at any time
- [ ] Moving the cylinders to a fenced compound with a water-spray system
::: solution
On-demand generation *minimises* the inventory: the maximum release is fixed by the chemistry and plant design rather than by the reliability of detectors, valves, people or sprays. The other measures are valuable layers of protection, but each can fail, and none reduces the amount of hazardous material that could escape. Inherent safety does not replace such layers; it reduces how much depends on them.
:::
:::

## Life-cycle thinking

The principles are framed around a reaction or process, but a chemical's effects extend from the extraction of its raw materials to its final disposal. A change that improves one stage can make another worse: a "solvent-free" process that needs twice the energy; a bio-based feedstock whose cultivation uses fertiliser, water and land; a biodegradable product that releases methane in landfill. This **burden shifting** is avoided by **life-cycle thinking**.

::: definition Life cycle and system boundary {#def-lifecycle}
The **life cycle** of a product consists of all the stages from the extraction of raw materials (the *cradle*) through manufacture, distribution and use to waste treatment or disposal (the *grave*). A **life-cycle assessment** (LCA), standardised in ISO 14040 and ISO 14044, quantifies the inputs (materials, energy) and outputs (products, emissions, wastes) across a defined **system boundary** — cradle-to-grave, cradle-to-gate (up to the factory gate) or gate-to-gate (a single process) — per **functional unit**, a quantified measure of the service delivered (for example "1 kg of solvent of a given purity" or "cleaning 1000 m² of surface"), and translates them into impact categories such as climate change (in kg $\mathrm{CO_2}$-equivalent), acidification, eutrophication, toxicity, land use and resource depletion.
:::

The functional unit is the key to a fair comparison. Two products should be compared for the *same service*: a paint that needs one coat against a paint that needs two, not one kilogram against one kilogram. The methods of LCA, and its difficulties — allocation between co-products, data quality, weighting between impact categories — are treated in [[green-chemistry/green-metrics]]. Here we need only its logic.

::: example A bio-based solvent over its life cycle {#ex-lca-solvent}
Ethyl acetate ($\mathrm{C_4H_8O_2}$, $88.11\ \mathrm{g\,mol^{-1}}$) can be made from fossil feedstocks or from bio-ethanol. For illustration only (real values depend strongly on the plant and region), take cradle-to-gate emissions of $1.9\ \mathrm{kg\,CO_2e}$ per kilogram for the fossil product and $2.6\ \mathrm{kg\,CO_2e}$ for the bio-based one, the latter *excluding* the carbon taken up from the air by the crops. After use the solvent is incinerated. Compare the cradle-to-grave climate impacts per kilogram of solvent.
::: solution
Complete combustion, $\mathrm{C_4H_8O_2} + 5\,\mathrm{O_2} \rightarrow 4\,\mathrm{CO_2} + 4\,\mathrm{H_2O}$, releases
$$
\frac{4\times44.01}{88.11} = 2.00\ \mathrm{kg\ CO_2\ per\ kg}.
$$
**Fossil:** $1.9 + 2.0 = 3.9\ \mathrm{kg\,CO_2e\,kg^{-1}}$; the carbon was in the ground and is added to the atmosphere.

**Bio-based:** the crops removed $2.0\ \mathrm{kg}$ of $\mathrm{CO_2}$ from the air for each kilogram of carbon eventually in the solvent (biogenic carbon), so the life cycle is $2.6 - 2.0 + 2.0 = 2.6\ \mathrm{kg\,CO_2e\,kg^{-1}}$.

On the cradle-to-gate boundary the bio-based solvent looks *worse* ($2.6$ against $1.9$), because the biogenic uptake and the release at end of life are both outside the boundary; on the cradle-to-grave boundary it is better ($2.6$ against $3.9$). Neither statement is wrong — they answer different questions — but a claim made without stating the boundary is meaningless. The comparison also covers only climate: fertiliser use and land occupation would appear in other impact categories, where the bio-based product may score worse. If the solvent were recovered and reused ten times, the production burden per use would fall tenfold for both, and recovery would matter more than feedstock origin.
:::
:::

::: application Real-time analysis and process control
Principle 11 is often the least visible but the most practical. In-line infrared, Raman and near-infrared spectroscopy, together with chemometric models, let a plant follow conversion and impurity formation as they happen, and stop dosing a reagent or adjust temperature before an off-specification batch or a runaway develops. The US Food and Drug Administration's 2004 guidance on **process analytical technology** encouraged this approach in pharmaceutical manufacture, where it reduces rejected batches (pure waste) and supports continuous manufacturing. The analytical principles are in [[analytical-chemistry/molecular-spectrometry]].
:::

## Designing safer chemicals

Principles 4 and 10 concern the product itself. A chemical is made for a function — to kill an insect, to dissolve grease, to retard flame, to cure a disease — and the challenge is to keep the function while removing hazards that are not essential to it. Two kinds of knowledge are needed. The first is **mechanistic toxicology**: knowing which structural features confer which hazards. Electrophilic groups that alkylate DNA (epoxides, Michael acceptors, alkyl halides) raise concerns about mutagenicity; high lipophilicity (octanol–water partition coefficient $\log K_\mathrm{ow}$ above about $4.5$–$5$) combined with resistance to metabolism leads to bioaccumulation; perfluorinated chains and polychlorinated aromatics resist almost all degradation pathways. The second is **environmental fate**: knowing how a molecule will be transported and transformed after use ([[environmental-chemistry/pollutants-fate]]).

The history of persistent organic pollutants shows what happens when these questions are not asked. DDT, polychlorinated biphenyls and later several brominated flame retardants and perfluorinated surfactants were chosen precisely because they were stable, and that stability made them persist, travel to remote regions and accumulate in food chains. The Stockholm Convention (2001, in force 2004) now restricts or eliminates such substances internationally. Designing for degradation means building in a weak point that is stable during use but cleaved in the environment — an ester link that hydrolyses, a position that microorganisms can oxidise — without creating a toxic degradation product. Compounds with these features are the subject of [[green-chemistry/circular-economy]], where we also meet the regulatory frameworks, REACH and its counterparts, that now require hazard data for substances on the market.

::: history From Silent Spring to green chemistry {#hist-green}
Rachel Carson's *Silent Spring* (1962) brought the environmental effects of synthetic pesticides to public attention and contributed to the founding of the US Environmental Protection Agency in 1970. Industrial accidents at Flixborough (1974), Seveso (1976) and Bhopal (1984) shaped process-safety regulation, including the EU's Seveso Directive (1982). Trevor Kletz's 1978 *Chemistry and Industry* article "What you don't have, can't leak" introduced inherent safety. The US Pollution Prevention Act of 1990 made prevention at source national policy, and within the EPA's Office of Pollution Prevention and Toxics Paul Anastas and colleagues began a research programme that, by the early 1990s, was called *green chemistry*. In 1991 Barry Trost published the concept of atom economy in *Science*, and in 1992 Roger Sheldon introduced the E-factor. The US Presidential Green Chemistry Challenge Awards were first presented in 1996, Anastas and John Warner published the twelve principles in *Green Chemistry: Theory and Practice* in 1998, and the Royal Society of Chemistry launched the journal *Green Chemistry* in 1999. The 2005 Nobel Prize in Chemistry, for olefin metathesis, was described by the Nobel committee as a step forward for green chemistry.
:::

## Where this leads

The principles become useful only when they can be measured: [[green-chemistry/green-metrics]] defines atom economy, reaction mass efficiency, the E-factor and process mass intensity and shows how they are combined with life-cycle assessment. [[green-chemistry/chemical-industry]] and the chapters on inorganic and petrochemical processes then show how the industry is organised and how its largest processes already embody — or fail to embody — these ideas. Solvents (principle 5), renewable feedstocks (principle 7), carbon and hydrogen (principles 6 and 7 at the scale of the energy system) and end of life (principle 10) have chapters of their own. Catalysis, the most powerful single tool, is developed in [[organometallics-catalysis]] and [[kinetics/homogeneous-catalysis]].

::: summary
- Green chemistry is the design of products and processes that reduce or eliminate hazardous substances; it prefers prevention at source to treatment afterwards.
- Hazard is intrinsic; risk depends on hazard and exposure. Risk characterisation ratios ($E/\mathrm{DNEL}$, $\mathrm{PEC/PNEC}$) are lowered by controlling exposure or by substituting less hazardous substances, and substitution is more robust when controls fail.
- The twelve principles of Anastas and Warner (1998) concern mass (prevention, atom economy, fewer derivatives, catalysis), hazard (safer syntheses, chemicals, solvents, inherent safety), energy, renewable feedstocks, degradation and real-time analysis.
- Yields multiply over a linear sequence ($Y = y^n$), so avoided steps — especially protection and deprotection — save material exponentially.
- Catalysts lower activation energies, raising rates by $\exp(\Delta E_\mathrm{a}/RT)$ and allowing milder conditions, but cannot shift equilibria.
- Inherent safety (minimise, substitute, moderate, simplify) reduces what can be released; continuous processes reduce hazardous inventories.
- Life-cycle thinking with a stated system boundary and functional unit prevents burden shifting; the same product can look better or worse depending on the boundary.
:::

## Exercises

::: exercise A risk characterisation ratio {level=1 check="0.4"}
The predicted environmental concentration of a substance in a river downstream of a plant is $2.0\ \mu\mathrm{g\,dm^{-3}}$, and its PNEC for freshwater is $5.0\ \mu\mathrm{g\,dm^{-3}}$. Find the risk characterisation ratio. (Enter the RCR.)
::: solution
$\mathrm{RCR} = \mathrm{PEC}/\mathrm{PNEC} = 2.0/5.0 = 0.4$. Since $0.4 < 1$, the risk to the freshwater compartment is considered adequately controlled under the assumptions of the assessment; a margin of only a factor of $2.5$ would nonetheless prompt attention to the variability of the discharge.
:::
:::

::: exercise Yield over eight steps {level=1 check="27.2"}
A linear synthesis has eight steps, each of $85\,\%$ yield. What is the overall yield? (Enter the yield in per cent.)
::: solution
$Y = 0.85^8 = 0.2725$, i.e. $27.2\,\%$ by [[#prop-overall-yield]]. About $3.7$ moles of the first starting material are needed per mole of product.
:::
:::

::: exercise Hydrogenation of nitrobenzene {level=1 check="72.1"}
Aniline is made industrially by the catalytic hydrogenation $\mathrm{C_6H_5NO_2} + 3\,\mathrm{H_2} \rightarrow \mathrm{C_6H_5NH_2} + 2\,\mathrm{H_2O}$. Using $M(\mathrm{C_6H_5NO_2}) = 123.11$, $M(\mathrm{H_2}) = 2.016$ and $M(\mathrm{C_6H_5NH_2}) = 93.13\ \mathrm{g\,mol^{-1}}$, find the atom economy. (Enter it in per cent.)
::: solution
$\mathrm{AE} = 93.13/(123.11 + 3\times2.016) = 93.13/129.16 = 72.1\,\%$. The only by-product is water, so the low-looking figure is harmless: atom economy measures mass, not hazard — a point developed in the next chapter.
:::
:::

::: exercise The Béchamp reduction {level=2 check="34.9"}
Before catalytic hydrogenation, aniline was made by the Béchamp reduction with iron, $4\,\mathrm{C_6H_5NO_2} + 9\,\mathrm{Fe} + 4\,\mathrm{H_2O} \rightarrow 4\,\mathrm{C_6H_5NH_2} + 3\,\mathrm{Fe_3O_4}$. Find its atom economy ($M(\mathrm{Fe}) = 55.845$, $M(\mathrm{H_2O}) = 18.015\ \mathrm{g\,mol^{-1}}$; other data as in the previous exercise) and the mass of iron oxide formed per kilogram of aniline. (Enter the atom economy in per cent.)
::: solution
Reactant mass: $4\times123.11 + 9\times55.845 + 4\times18.015 = 492.44 + 502.61 + 72.06 = 1067.1\ \mathrm{g}$; product $4\times93.13 = 372.52\ \mathrm{g}$. $\mathrm{AE} = 372.52/1067.1 = 34.9\,\%$. Iron oxide: $3\times231.53/372.52 = 1.86\ \mathrm{kg}$ per kilogram of aniline. The Béchamp process survived for a time because the iron oxide could be sold as a pigment — an early example of turning a by-product into a co-product, which improves the economics without changing the atom economy as defined.
:::
:::

::: exercise Two routes, fewer steps {level=2 check="1.5625"}
Route A to a drug intermediate has seven steps and route B, which avoids a protection–deprotection pair, has five; every step in both routes has $80\,\%$ yield. By what factor is the amount of first starting material needed per kilogram of product larger for route A than for route B? (Enter the factor.)
::: solution
Starting material per mole of product is $1/Y$: route A needs $0.8^{-7} = 4.77$, route B $0.8^{-5} = 3.05$ moles per mole. The ratio is $0.8^{-2} = 1/0.64 = 1.5625$. The factor depends only on the number of avoided steps and their yield, not on the length of the rest of the route.
:::
:::

::: exercise Batch and flow inventories {level=2 check="60"}
A nitration (a fast, highly exothermic reaction) is carried out batchwise in $6.0\ \mathrm{t}$ batches, each processed in $5.0\ \mathrm{h}$. A continuous flow reactor would handle the same throughput with a residence time of $5.0\ \mathrm{min}$. By what factor is the inventory of reacting mixture reduced? (Enter the factor.)
::: solution
Throughput $\dot m = 6.0/5.0 = 1.2\ \mathrm{t\,h^{-1}}$. Continuous hold-up $= 1.2\times5.0/60 = 0.10\ \mathrm{t}$. Factor $= 6.0/0.10 = 60$. Equivalently, the factor is the ratio of the batch cycle time to the residence time, $300\ \mathrm{min}/5\ \mathrm{min}$. Nitrations are among the reactions most often moved to flow for this reason.
:::
:::

::: exercise Temperature equivalent of a catalyst {level=3 check="97.4"}
An uncatalysed reaction with $E_\mathrm{a} = 120\ \mathrm{kJ\,mol^{-1}}$ is run at $250\,^\circ\mathrm{C}$. A catalyst reduces the activation energy to $85\ \mathrm{kJ\,mol^{-1}}$ with the same pre-exponential factor. (a) At what temperature does the catalysed reaction have the same rate constant? (b) Show that if the catalyst's pre-exponential factor is ten times *smaller*, the required temperature rises by about $34\ \mathrm{K}$. (Enter the temperature for (a) in °C.)
::: hint
Equate $E_\mathrm{a}/T^*$ and $E_\mathrm{a}'/T$; for (b), include $\ln(A/A')$ in the equation.
:::
::: solution
(a) Equal rate constants with equal $A$ require $E_\mathrm{a}/T^* = E_\mathrm{a}'/T$ with $T^* = 523.15\ \mathrm{K}$, so $T = 523.15\times85/120\ \mathrm{K} = 370.6\ \mathrm{K}$, i.e. $97.4\,^\circ\mathrm{C}$ — a reduction of $153\ \mathrm{K}$.

(b) With $A' = A/10$: $\ln A - E_\mathrm{a}/RT^* = \ln A - \ln 10 - E_\mathrm{a}'/RT$, so
$$
\frac{E_\mathrm{a}'}{RT} = \frac{E_\mathrm{a}}{RT^*} - \ln 10 = \frac{120\,000}{8.314\times523.15} - 2.303 = 27.590 - 2.303 = 25.287,
$$
giving $T = 85\,000/(8.314\times25.287)\ \mathrm{K} = 404.3\ \mathrm{K}$ ($131.2\,^\circ\mathrm{C}$), higher than $370.6\ \mathrm{K}$ by $34\ \mathrm{K}$. Most of the catalyst's advantage survives a tenfold smaller pre-exponential factor, because a factor of ten in $A$ is worth only $RT\ln10 \approx 7\ \mathrm{kJ\,mol^{-1}}$ in activation energy at these temperatures.
:::
:::

::: exercise Incinerating a solvent {level=3 check="3.34"}
A process uses toluene ($\mathrm{C_7H_8}$, $92.14\ \mathrm{g\,mol^{-1}}$) as solvent, losing $0.50\ \mathrm{kg}$ per kilogram of product to an incinerator; the rest is recovered. (a) Find the $\mathrm{CO_2}$ released per kilogram of toluene burnt. (b) If the cradle-to-gate footprint of toluene is taken as $1.2\ \mathrm{kg\,CO_2e\,kg^{-1}}$ (illustrative), find the climate impact of the solvent losses per kilogram of product, and the reduction obtained by recovering $90\,\%$ of the solvent currently burnt. (Enter the answer to (a) in kg $\mathrm{CO_2}$ per kg toluene.)
::: solution
(a) $\mathrm{C_7H_8} + 9\,\mathrm{O_2} \rightarrow 7\,\mathrm{CO_2} + 4\,\mathrm{H_2O}$, so $7\times44.01/92.14 = 3.34\ \mathrm{kg\,CO_2\,kg^{-1}}$.

(b) Each kilogram of toluene lost costs $1.2$ (production of its replacement) $+ 3.34$ (incineration) $= 4.54\ \mathrm{kg\,CO_2e}$; for $0.50\ \mathrm{kg}$, $2.27\ \mathrm{kg\,CO_2e}$ per kilogram of product. Recovering $90\,\%$ of it leaves $0.050\ \mathrm{kg}$ lost, $0.227\ \mathrm{kg\,CO_2e}$, a reduction of $2.04\ \mathrm{kg\,CO_2e}$ per kilogram of product, less the energy for the extra distillation (which a full LCA would include; for toluene it is typically a fraction of a kilogram of $\mathrm{CO_2e}$ per kilogram recovered). Solvent losses often dominate the footprint of fine-chemical processes, a theme of [[green-chemistry/safer-solvents]].
:::
:::
