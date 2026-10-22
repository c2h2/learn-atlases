When Justus von Liebig opened his purpose-built teaching laboratory at Giessen in 1825, he admitted students from half of Europe to learn chemistry by doing it — and he kept a book, the *Unfallbuch*, in which every accident was recorded: the bottle that exploded in a student's hands, the acid burned into a bench and into the hand resting near it. The logbook was not bureaucracy. It was the recognition that a laboratory is a place where small, repeatable errors accumulate until one of them becomes an injury, and that the only reliable way to interrupt the accumulation is a *trained skill*: look for the hazard, estimate the risk, put in a control, check that it worked, write it down. Posters and lectures do not interrupt the accumulation; habits do. This chapter is about those habits, and about the reasons behind them — because a chemist who knows *why* can extend a rule to the situation the rulebook never anticipated.

::: history The road from the accident logbook to the GHS {#hist-safety-road}
In 1852 Robert Bunsen lost the sight of one eye in a bench explosion while working with arsenic compounds; the young Henry Roscoe, working beside him, was injured in the same blast. Liebig's *Unfallbuch* and its successors recorded thousands of such events, and for a century the response was mostly personal vigilance. The turn came with the "right-to-know" legislation of the 1980s — above all the United States OSHA Hazard Communication Standard of 1986, which gave workers a legal right to the hazard information held by their employers and forced an industry to put its knowledge on the label. Three decades of incompatible national symbol systems then converged on the United Nations *Globally Harmonized System of Classification and Labelling of Chemicals* (GHS), whose first edition appeared in 2003 and which now travels with essentially every chemical shipment on earth. The label on your bottle is the end of a 150-year argument about who has to tell you what.
:::

## Hazards, risk and assessment

The whole of laboratory safety rests on one distinction, and it is worth getting exactly right.

::: definition Hazard and risk {#def-hazard-risk}
A **hazard** is an intrinsic property of a substance, a mixture or a process: the capacity to cause harm (to burn skin, to ignite, to poison, to feed a fire). A **risk** is the chance that harm will actually happen to a particular person in a particular situation: **risk = likelihood × severity, given the exposure**. A hazard is a property of the chemical; a risk is a property of the *activity you are doing with it*. Concentrated ethanoic acid in a sealed drum in a ventilated store has a real hazard (corrosive, flammable) and a very low risk; the same acid decanted into an open beaker at a crowded bench has the same hazard and a much higher risk. You cannot usually change the first; you can change the second, and that is what safety work is.
:::

The word "exposure" carries all the weight, and exposure reaches the body by four routes. **Inhalation** dominates in a chemistry laboratory: vapours from an open vessel, dusts lifted in weighing, mists from boiling and fumes from heating are carried into the lungs, where the gas-exchange surface is large, thin and well supplied with blood; how much you inhale depends on volatility, temperature, ventilation and how close your face is to the vessel, which is why "work 15 cm inside the fume cupboard" is a direct attack on the exposure term. **Skin and eye contact** includes the obvious splash but also prolonged contact with a contaminated glove: many substances do harm by being *held against* the skin long enough to permeate it. **Ingestion** is almost always self-inflicted by accident — hands to mouth, a drink taken to a bench where glassware was washed, mouth pipetting (forbidden without exception, because its failure mode is swallowing a corrosive). **Injection** — a contaminated needle or jagged glass driving material under the skin — is the fastest route, because it bypasses the skin barrier; it is rare, and it is why sharps go into dedicated boxes.

Because risk is a product of two factors, it can be attacked from either side: reduce the likelihood (closed systems, training, no clutter) or reduce the severity (smaller quantities, lower concentrations, a sash between the bottle and your face). The standard tool for doing this deliberately is a short procedure.

::: algorithm The five-step risk assessment {#alg-risk-assessment}
**Input:** the experiment you are about to do, the chemicals and quantities involved, the equipment, and the people nearby. **Output:** a written, acted-upon plan that reduces the risks to a level you would defend to a colleague.
1. **Identify the hazards.** Read the safety data sheet for every chemical before you start (below); note the GHS pictograms and hazard statements; add the physical hazards of the process itself — flames, hot glassware, vacuum implosion, pressure, corrosive waste.
2. **Decide who might be harmed, and how.** Yourself first, but also neighbouring benches, the cleaner who tidies your waste, anyone with asthma or latex allergy; name the exposure route for each hazard.
3. **Evaluate and control.** For each risk, ask what can be eliminated or substituted before you reach for equipment, then apply engineering controls and safe ways of working, and only then personal protective equipment (the hierarchy of controls, below). Reduce quantities and concentrations where the chemistry allows.
4. **Record and act.** Write the findings down — a paragraph is enough for a teaching experiment — make the preparations the plan requires (spill kit located, eyewash identified, waste containers labelled), and brief anyone working with you.
5. **Review and update.** If you change a reagent, a scale or a step, the assessment is out of date; revisit it after any incident or near-miss.
:::

Teaching laboratories often formalise step 3 as a **risk matrix**: rate the *likelihood* of each identified event (rare to almost certain) and its *severity* (first aid to fatal), and read off a rating that says whether the activity is acceptable as planned or needs more control. The matrix is a communication device, not a calculator — its value is that it forces two chemists to argue about a number instead of waving at each other's instincts. The interactive figure makes the same point in curve form.

::: widget plot
f: h*x/(1+x); x/(1+x)
x: 0, 10
y: 0, 3
sliders: h=2:0.2:3:0.1
labels: \text{high-hazard chemical}; \text{low-hazard chemical}
caption: Two saturating curves of risk against exposure $x$: the upper curve is the same activity done with a high-hazard chemical, the lower with a low-hazard one, and the slider $h$ multiplies the hazard. The high-hazard curve sits above the low-hazard curve at *every* exposure level — hazard scales the whole curve — but both curves fall steeply as exposure is reduced, so controls that cut exposure pay off whichever chemical you use. Read the figure as the two levers of this chapter: substitution moves you from the upper curve to the lower one, while ventilation, sashes and closed bottles reduce $x$ along whichever curve you are on.
:::

## Communicating hazards: GHS and safety data sheets

You cannot assess a hazard you have not been told about, and you cannot rely on being told in person. Hazard communication exists so that a bottle made in one country, shipped through a second and opened by a student in a third arrives carrying its own warning. The system that does this is the **Globally Harmonized System** (GHS) of the United Nations, in force in most countries since the 2000s.

::: definition The GHS label: pictograms, signal words, H- and P-statements {#def-ghs}
A GHS label carries up to nine standardised **pictograms** — black symbol on a white background inside a red diamond — each naming a *hazard class*: **explosive** (exploding bomb), **flammable** (flame), **oxidising** (flame over a circle), **gas under pressure** (gas cylinder), **corrosive** (test tubes pouring liquid onto a hand and a surface), **acute toxicity** (skull and crossbones), **health hazard** (a torso with a starburst over the chest, for carcinogens, respiratory sensitisers and organ toxins), **exclamation mark** (irritants, harmful substances, skin sensitisers, narcotic effects), and **environment** (a dead tree and a dead fish). A **signal word** — *Danger* for the more severe classes, *Warning* for the milder — sets the volume, and two families of numbered sentences carry the detail: **H-statements** name the hazard ("H314: Causes severe skin burns and eye damage"), and **P-statements** prescribe the precaution ("P280: Wear protective gloves/protective clothing/eye protection"). The same pictogram means the same class on every bottle in the world, which is the entire point.
:::

Reading a label is a ten-second skill: note the pictograms, take the signal word as the overall volume knob, then read the H-statements for *which* harm and the P-statements for *what to do*. The label is a summary; the full document is the safety data sheet.

::: definition The safety data sheet {#def-sds}
The **safety data sheet** (SDS, formerly MSDS) is a standardised sixteen-section document that travels with a chemical: (1) identification, (2) hazard identification, (3) composition, (4) first-aid measures, (5) fire-fighting measures, (6) accidental release measures, (7) handling and storage, (8) exposure controls and personal protection, (9) physical and chemical properties, (10) stability and reactivity, (11) toxicological information, (12) ecological information, (13) disposal considerations, (14) transport information, (15) regulatory information, (16) other information. Before an experiment, read at least five sections: **2** (the GHS classification and pictograms), **7** (how to handle and store it — incompatibilities live here), **8** (what ventilation and PPE the supplier thinks you need), **10** (what it reacts with, what it decomposes to, whether it peroxidises or polymerises), and **11** (the toxicological endpoints — which organs, which exposures, which effects). Sections 4, 5, 6 and 13 you should know the location of *before* the accident, the spill or the waste bottle.
:::

::: warning Pictograms are hazard classes, not a risk ranking {#warn-pictograms}
Three misreadings to unlearn before they cost you. First, the pictograms do not line up from "safest" to "worst": the skull and crossbones marks *acute* toxicity, and a bottle bearing only the exclamation mark can contain something whose chronic effects are worse than a splash of the acutely toxic one — the classes answer different questions. Second, "health hazard" says nothing about *how much* is dangerous: it marks a class of effect (cancer, organ damage, sensitisation), not a dose–response magnitude, and within a class concentrations differ by orders of magnitude. Third, and most dangerous of all, **no pictogram does not mean "safe"** — it means "not classified under the GHS criteria", which covers neither the effects science has not yet detected, nor the solvent that will dry the fat from your hands for twenty years before anything is measurable, nor the simple fact of a hot beaker. An unlabelled bottle is not a benign bottle; it is an unassessed one, and it should be treated as the most dangerous thing in the room.
:::

::: quiz
Which GHS pictogram is required on a bottle of concentrated sulfuric acid?
- [x] Corrosion (test tubes pouring liquid onto a hand and a surface).
- [ ] Skull and crossbones (acute toxicity).
- [ ] Flame over circle (oxidising).
- [ ] Dead tree and dead fish (environment).
::: solution
Concentrated sulfuric acid is classified in the skin-corrosion class (H314: causes severe skin burns and eye damage), so the **corrosion** pictogram with signal word *Danger* is required. It is not classified for acute toxicity by the oral, inhalation or dermal criteria (skull and crossbones), is not in the oxidising class as normally supplied (flame over circle — hot concentrated acid is an oxidiser *chemically*, but classification follows test criteria, not intuition), and is not classified as an environmental hazard. Guessing pictograms from chemistry intuition is exactly the error to avoid: classification is a legal-technical act with defined criteria, so read the label and the SDS.
:::
:::

::: example Reading an SDS before the experiment: concentrated nitric acid {#ex-read-sds}
You are about to use a few $\mathrm{cm^3}$ of concentrated nitric acid. Section 2 of the SDS shows two pictograms — flame over circle and corrosion — with signal word *Danger*, and H-statements including H272 ("May intensify fire; oxidiser"), H314 ("Causes severe skin burns and eye damage") and H335 ("May cause respiratory irritation"). Section 10 warns that the acid attacks metals and reacts violently with bases and organic materials. What do you do differently, before and during the experiment, because of each line?
::: solution
**H272 (oxidiser):** the storage rule changes — nitric acid is kept away from fuels and organics: not on the flammables shelf with ethanol or propanone, not in a tray with them, and spills on organic absorbents (sawdust, cloth, paper towels) are avoided because the soaked material can ignite. **H314 (corrosion):** splash goggles, gloves checked for acid breakthrough, a clear bench, and the eyewash located before the bottle is opened. **H335 and the brown nitrogen dioxide fumes the acid gives on standing:** measure the acid in the fume cupboard with the sash down as far as the work allows. **Section 10 incompatibilities:** no neutralising spills with concentrated base in a closed vessel (the reaction heats and pressurises it), no metal spatulas left in the acid, and waste acid goes to the labelled aqueous acid container — never into an organic waste bottle, because oxidiser in an organic waste bottle is how waste stores catch fire. One SDS line, one changed behaviour: that is what "reading the SDS" means.
:::
:::

## Engineering controls and PPE

When a risk comes out of the assessment too large, you install controls, and controls have a pecking order called the **hierarchy of controls**. At the top sits **elimination**: don't do the step, don't generate the waste, don't bring the bottle into the building. Next is **substitution**: a laboratory that replaces benzene (a known human carcinogen) with toluene for an extraction lesson has not made the activity safer by being careful — it has changed the hazard itself, which no amount of care can do. Then come **engineering controls**: the fume cupboard, the solvent cabinet, the retort stand holding the flask you are not holding. Then **administrative controls**: training, written procedures, signage, the buddy rule for high-risk work. **Personal protective equipment sits at the bottom** — not because it is unimportant but because it is the control that remains when every other has failed, it protects only the wearer, and it fails silently (a permeated glove feels exactly like a clean one). PPE is the last line of defence, never the plan.

The fume cupboard is the workhorse engineering control of the teaching laboratory, and it is worth understanding as a device rather than a superstition.

::: proposition Face velocity {#prop-face-velocity}
A fume cupboard exhausting a volumetric flow rate $Q$ (in $\mathrm{m^3\,h^{-1}}$) through a sash opening of area $A$ (in $\mathrm{m^2}$) has average **face velocity**
$$
v = \frac{Q}{3600\,A}
$$
in $\mathrm{m\,s^{-1}}$. Teaching laboratories are typically commissioned to hold $v$ between $0.4$ and $0.6\ \mathrm{m\,s^{-1}}$ at the working sash height: below the range, vapour escapes the containment; far above it, turbulence at the sash edge drags air *out* of the cupboard and the containment fails in the other direction.
:::

::: proof The face-velocity relation {#proof-face-velocity}
At these speeds air behaves as an incompressible fluid, and in steady state the volume of air entering through the sash opening per unit time must equal the volume the exhaust removes — air is not accumulating inside. The exhaust removes $Q\ \mathrm{m^3}$ per hour, i.e. $Q/3600\ \mathrm{m^3}$ per second; if the average velocity across the opening is $v$, the volume crossing the opening per second is $vA$. Equating the two rates,
$$
vA = \frac{Q}{3600}
\qquad\Longrightarrow\qquad
v = \frac{Q}{3600\,A},
$$
and the units check: $\mathrm{m^3\,h^{-1}}$ divided by $\mathrm{h\,s^{-1}} \times \mathrm{m^2}$ leaves $\mathrm{m\,s^{-1}}$. Two consequences matter at the bench. First, $v \propto 1/A$: raising the sash doubles the opening and halves the face velocity, so the sash *is* the control — the cupboard does not protect you, the sash height does. Second, the velocity profile across the opening is not flat, which is why the commissioning range is quoted for the average and why the monitor on the sash post is a calibrated instrument in its own right, due the same respect as a balance — see [[analytical-chemistry/statistics-calibration]].
:::

::: example Checking a fume cupboard {#ex-face-velocity}
A cupboard $1.20\ \mathrm{m}$ wide is set with its sash opening $0.40\ \mathrm{m}$ high, and the monitor reads an exhaust flow of $850\ \mathrm{m^3\,h^{-1}}$. Find the average face velocity and decide whether it lies in the working range $0.4$–$0.6\ \mathrm{m\,s^{-1}}$. Then find the face velocity if a student, wanting room for a large apparatus, raises the sash to $0.80\ \mathrm{m}$.
::: solution
The opening area is $A = 1.20 \times 0.40 = 0.48\ \mathrm{m^2}$, so
$$
v = \frac{Q}{3600\,A} = \frac{850}{3600 \times 0.48} = \frac{850}{1728} = 0.49\ \mathrm{m\,s^{-1}},
$$
comfortably inside $0.4$–$0.6\ \mathrm{m\,s^{-1}}$: the cupboard is working as commissioned. Raising the sash doubles the area to $0.96\ \mathrm{m^2}$ and halves the velocity to $0.25\ \mathrm{m\,s^{-1}}$ — below the range, and the vapour you generate now drifts out across your face on its way to the opening. The exhaust fan did not change; the *activity* changed, and with it the risk. Same hazard, different exposure, different answer.
:::
:::

Bench discipline follows from the physics: work at least $15\ \mathrm{cm}$ inside the opening, keep the sash as low as the work allows and fully closed when you walk away, and never use the cupboard as a chemical store — stored bottles block the airflow slots and ruin the very profile the proof above depends on.

Gloves are the most over-trusted item in the laboratory, because a glove is not "chemical protection" in general; it is a specific material with a specific **breakthrough time** for each specific chemical, published by the manufacturer and measured from first contact to detectable permeation. Nitrile handles many aqueous solutions, dilute acids and alcohols well; latex is comfortable for aqueous work but poor for most organic solvents and is itself a sensitiser; neoprene suits dilute acids and bases; butyl rubber is the choice for ketones and esters. Small, aggressive molecules — dichloromethane among them — permeate thin disposable gloves in minutes, so a glove that "fits" is not a glove that "protects" for that bottle. Wear gloves as consumables: check for swelling and discolouration, change them when contaminated, and take them off without transferring their contents to your phone, your keyboard and your face. Goggles seal around the eyes and defend against splashes from front, sides and below; safety glasses shade the eyes from impact and little else, so splash work — and all corrosive handling — asks for goggles, sometimes with a face shield over them. Add the unglamorous remainder: a closed lab coat to mid-thigh, closed footwear, long hair tied back, and no contact lenses where vapours can accumulate (they are not themselves dangerous, but they make flushing the eye impossible for the first critical minutes).

## Storage, handling and waste

Storage is hazard communication extended in time: chemicals that must never meet must never *share a shelf*. **Oxidisers away from fuels and organics** — nitric acid, permanganates and peroxides off the flammables shelf and out of the flammables cabinet, because an oxidiser feeds a fire that no air-limiting would sustain, and spill-soaked organic material against an oxidiser can ignite on its own. **Acids away from bases and carbonates** — a cracked bottle of acid dripping onto solid sodium carbonate releases carbon dioxide in a closed cabinet until the doors blow open, and acid on concentrated base releases enough heat to boil (the neutralisation enthalpy of [[general-chemistry-1/solutions-reactions]] is the same number that makes spill clean-up a warm task). **Flammables in a cabinet** built for them, in teaching quantities and no more. Every bottle and waste container carries a label with the **name, concentration, date and owner**, plus the pictograms; a bottle whose label has dissolved is not anonymous, it is *unclassified*, and it goes to the unknown-chemical procedure, not into your experiment. And the oldest rule survives because it still works: **no food or drink in the laboratory** — the ingestion route needs only one careless lunchtime, and a fridge that stores reagents must never have been able to store a sandwich.

::: example A storage puzzle: four bottles on a tray {#ex-storage-puzzle}
A delivery arrives in a single tray: concentrated nitric acid, ethanol, aqueous sodium hydroxide, and sodium chloride solution. Which two bottles must never share a tray on the walk to the store, and why? Check the others against the segregation rules.
::: solution
**Nitric acid and ethanol** are the forbidden pair: an oxidiser (H272) travelling centimetres from a flammable liquid (H226), in a tray that will tip if you trip, is a fire with fuel and oxygen source pre-mixed — and the incompatibility is stated in section 10 of both SDSs. The other pairs are benign by comparison but still worth reasoning through: nitric acid with sodium hydroxide is acid against base, and a simultaneous breakage gives a violent, splattering neutralisation, so large volumes travel in separate trays with secondary containment; sodium chloride solution is the only passenger that offends no rule. The general principle: segregate by *incompatibility*, not by alphabetical order, and never let a single accident (a dropped tray) supply both halves of a reaction.
:::
:::

Handling rules are the same physics at shorter range. Transport bottles in a tray or carrier, never by the neck. Open bottles away from your face, and smell by wafting, never by nose-in-bottle. Dilution of concentrated acids deserves its own rule because the arithmetic is easy and the heat is not:

::: example Diluting concentrated hydrochloric acid {#ex-dilution-hcl}
You need $500.0\ \mathrm{cm^3}$ of $2.00\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid, and the stock bottle reads $12.0\ \mathrm{mol\,dm^{-3}}$. What volume of stock do you need, and how do you make the solution up? (This and all such preparations are done with supervision and after a risk assessment; the acid is corrosive, its fumes irritating, and the dilution strongly exothermic.)
::: solution
The amount of $\mathrm{HCl}$ needed is $cV = 2.00 \times 0.5000 = 1.00\ \mathrm{mol}$, so the volume of stock is
$$
V = \frac{1.00\ \mathrm{mol}}{12.0\ \mathrm{mol\,dm^{-3}}} = 0.0833\ \mathrm{dm^3} = 83.3\ \mathrm{cm^3}
$$
(the mole arithmetic of [[general-chemistry-1/matter-measurement]]). Now the rule: **always add acid to water, never water to acid.** Measure about $200\ \mathrm{cm^3}$ of water into a beaker, then add the $83.3\ \mathrm{cm^3}$ of concentrated acid in portions with stirring, in the fume cupboard. Diluting concentrated acid releases tens of kilojoules per mole as the ions are hydrated; if water is added *to* the acid, the first drops land on a dense, hot acid layer and can boil explosively, spattering concentrated acid across the bench and the operator, while acid added to the larger water mass is diluted and cooled by the whole volume at once. Let the solution cool, transfer quantitatively (rinse the beaker into the flask) to a $500\ \mathrm{cm^3}$ volumetric flask, make to the mark, and invert to mix. The measuring cylinder measures the acid; the volumetric flask measures the *final volume* — never dilute in the volumetric flask itself, whose calibration is for one temperature and whose narrow neck is the worst place for heat to go.
:::
:::

Waste is a chemical with your fingerprints on it, and it is sorted into streams before it is ever generated: **halogenated organic waste** (dichloromethane, chloroform and their rinsings — the chlorine makes incineration chemistry unpleasant and is worth paying to separate), **non-halogenated organic waste** (ethanol, propanone, hexane), **aqueous heavy-metal waste** (copper, lead, chromium, mercury solutions — collected as metals, not discharged), and **aqueous acid/base waste** for neutralisation. Nothing goes down the drain: a drain is an uncontrolled dilution, and "it's only a few $\mathrm{cm^3}$" is exactly the arithmetic that a thousand students multiply into a tonne. Waste containers are labelled, kept closed and kept small — the smaller the quantity you work with, the smaller every downstream problem, which is why teaching laboratories have moved to microscale.

::: example Classifying the waste from one experiment {#ex-waste-classification}
At the end of an extraction lesson you have a separatory funnel containing an aqueous layer (water, copper(II) sulfate and a little sulfuric acid) and a dichloromethane layer, plus rinsings of the funnel in dichloromethane. Where does each part go?
::: solution
Three destinations, none of them the sink. The **dichloromethane layer and the dichloromethane rinsings** go to the *halogenated organic waste* container — dichloromethane carries the health-hazard pictogram (suspected carcinogen) and must not be vented or drained. The **aqueous layer** goes to the *aqueous heavy-metal waste* container: copper(II) sulfate is classified as very toxic to aquatic life with long-lasting effects (H410), so the copper, not the dilute acid, pins this stream to the metals route. Any leftover rinses follow the same logic by their dominant hazard. Note that the *same funnel* produces two streams: classification follows the contents of each container, not the experiment, and pouring "to make it easier" merges two hazards into one worse problem.
:::
:::

## When things go wrong

No control is perfect, so the last part of safety is rehearsed response. **Eyes:** use the eyewash for a full **15 minutes** — hold the lids open, roll the eye, and let a colleague start the clock and stay with you; contact lenses come out *during* the flush, not before, and 15 minutes feels absurd until you remember that the alternative is a chemical that keeps reacting while you argue with it. Then medical attention, with the bottle or SDS brought along. **Skin and body:** the safety shower for large-volume spills and for clothing that has caught fire (stop, drop and cover, then the shower; a fire blanket smothers a small bin fire but is wrong for wrapping a panicking person). **Fire:** know which extinguisher suits which class — water or foam for ordinary combustibles (class A), foam, dry powder or carbon dioxide for flammable liquids (class B), dry powder or carbon dioxide for electrical fires, with carbon dioxide the laboratory default because it leaves nothing on the instruments; never water on a metal fire. **Spills:** warn the room, keep clear of the vapour cloud, and work from the outside in with the spill kit appropriate to the chemical, bagging the waste as the chemical it has become.

The sequence for any incident is fixed: **protect people first** (yourself included — a second casualty helps nobody), **remove or isolate the source** (turn off the gas, switch off the hotplate, close the bottle), **inform** (the technician or supervisor, immediately, loudly), and **report** (write it down before you leave). Report every incident *and every near-miss*: the bottle that should have fallen but caught on the lip, the sash that was down when you looked away. Near-misses are the only free data safety ever produces — the Giessen logbook was valuable precisely because most of its entries were near-misses — and a laboratory that reports them buys information at the price of some embarrassment.

## Where this leads

Safety is the part of the scientific method that protects the scientist, and it leans on the rest of this course: the mole and dilution arithmetic you used above to make acid safe is [[general-chemistry-1/matter-measurement]], the vapour pressure that sets how much a solvent contributes to the air you breathe is [[general-chemistry-2/liquids-solutions]], and the honest, uncertainty-carrying numbers that make a risk assessment more than a mood are [[laboratory-methods/measurement-uncertainty]]. Every later technique chapter is this chapter applied: the solvents of [[laboratory-methods/separation-purification]] are chosen as much for their hazards as for their partition coefficients, and the qualitative tests of [[laboratory-methods/identifying-compounds]] are microscale because small quantities are the cheapest control there is. The waste streams you filled today become the green-chemistry accounting of [[analytical-chemistry/analytical-process]] — atom economy and waste factors are what safety looks like when it is designed into a process instead of bolted onto a bench.

::: summary
- A hazard is an intrinsic property; a risk is likelihood × severity given exposure — safety work changes the risk, because the hazard is usually fixed.
- Exposure arrives by four routes — inhalation, skin/eye contact, ingestion, injection — and every control in this chapter attacks one of them.
- The five-step risk assessment (identify, who and how, evaluate and control, record and act, review) is a written, repeatable procedure, not a feeling.
- GHS labels communicate hazard classes through nine pictograms, signal words and H-/P-statements; the sixteen-section SDS is the full document, and sections 2, 7, 8, 10 and 11 are the pre-experiment reading.
- Pictograms rank nothing, and silence means "not classified", not "safe".
- Controls follow the hierarchy: eliminate, substitute, engineer, administer — PPE last, because it fails silently.
- A fume cupboard protects through face velocity $v = Q/(3600\,A)$, held near $0.4$–$0.6\ \mathrm{m\,s^{-1}}$; the sash is the control, and work goes $15\ \mathrm{cm}$ inside.
- Segregate by incompatibility (oxidisers from fuels, acids from bases and carbonates), label everything, sort waste into its stream, and report every incident and near-miss.
:::

## Exercises

::: exercise Pictograms and H-statements {level=1}
Match each H-statement to the GHS pictogram it belongs to, and name the hazard class: (a) H226 "Flammable liquid and vapour"; (b) H272 "May intensify fire; oxidiser"; (c) H314 "Causes severe skin burns and eye damage"; (d) H400 "Very toxic to aquatic life".
::: solution
(a) Flame — flammable liquids. (b) Flame over circle — oxidising liquids and solids. (c) Corrosion — skin corrosion (category 1). (d) Environment — hazardous to the aquatic environment. The signal word would be *Danger* for (c) and *Warning* for (a), (b) and (d) at teaching-laboratory concentrations.
:::
:::

::: exercise Face velocity {level=1 check="0.56"}
A fume cupboard $1.50\ \mathrm{m}$ wide has its sash opening $0.30\ \mathrm{m}$ high, and the exhaust flow is $900\ \mathrm{m^3\,h^{-1}}$. Compute the average face velocity using $v = Q/(3600\,A)$. (Enter the face velocity in $\mathrm{m\,s^{-1}}$, to two decimal places.) Is it inside the working range $0.4$–$0.6\ \mathrm{m\,s^{-1}}$?
::: solution
$A = 1.50 \times 0.30 = 0.45\ \mathrm{m^2}$, so $v = 900/(3600 \times 0.45) = 900/1620 = 0.56\ \mathrm{m\,s^{-1}}$ — inside the range.
:::
:::

::: exercise Dilution volume {level=1 check="20.8"}
You need $250.0\ \mathrm{cm^3}$ of $1.00\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid from the $12.0\ \mathrm{mol\,dm^{-3}}$ stock. What volume of stock do you measure out? (Enter the volume in $\mathrm{cm^3}$, to one decimal place.) In what order do you combine acid and water, and why?
::: solution
$n = 1.00 \times 0.2500 = 0.250\ \mathrm{mol}$, so $V = 0.250/12.0 = 0.0208\ \mathrm{dm^3} = 20.8\ \mathrm{cm^3}$. Acid to water, never water to acid: the dilution is strongly exothermic, and water landing on concentrated acid can boil and spatter it, while acid stirred into the larger water mass is cooled and diluted at once.
:::
:::

::: exercise Storage segregation {level=2}
Four bottles must be returned to the store: propanone (flammable), concentrated sulfuric acid (corrosive), aqueous potassium permanganate (oxidiser, corrosive), and dilute ethanoic acid (corrosive). Propose a segregation plan for two shelves and a flammables cabinet, give the reason for each placement, and identify the one pair that must be furthest apart.
::: solution
Propanone goes in the flammables cabinet (H226; volatile, and the cabinet limits vapour accumulation and fire exposure). Potassium permanganate goes on an oxidiser shelf away from all organics and fuels (H272). The two acids — sulfuric and ethanoic — share an acid shelf, away from bases, carbonates and the oxidiser shelf. The pair to keep furthest apart is **potassium permanganate with propanone**: a strong oxidiser and a volatile flammable are the classic fire-with-the-oxygen-supplied-separately combination, and a toppled shelf would mix them without anyone choosing to. Sulfuric acid with permanganate is also worth separating (acid concentrates the oxidising power), but the fuel is what makes the permanganate–propanone pair the worst.
:::
:::

::: exercise Controls and PPE for a volatile corrosive {level=2}
A procedure asks you to measure $50\ \mathrm{cm^3}$ of concentrated hydrochloric acid (corrosive, H314; fumes strongly in air) and dilute it as in the worked example. List the controls you would use under the headings of the hierarchy that still apply (elimination/substitution, engineering, administrative, PPE), and say which heading each one belongs to.
::: solution
**Elimination/substitution:** ask whether the experiment can run at a lower concentration or smaller volume — one $2.00\ \mathrm{mol\,dm^{-3}}$ working solution made by the technician for the whole class replaces thirty students opening the concentrated bottle. **Engineering:** measure and dilute in a fume cupboard at working face velocity, sash low; work over a tray to contain drips. **Administrative:** risk assessment read before starting; no solo working; eyewash, shower and spill kit located; stock pre-dispensed so bottles are opened once. **PPE:** splash goggles (not just glasses), nitrile gloves checked for acid breakthrough and removed correctly, closed lab coat and closed shoes. Note that PPE appears last and adds nothing the fume cupboard already does — it is there for the failure, not the plan.
:::
:::

::: exercise Risk matrix {level=2}
A student plans to heat $30\ \mathrm{cm^3}$ of ethanol in an open flask on a hotplate at a bench beside a walkway, using a Bunsen-burner-heated water bath "because the hotplate is busy". Using a $5 \times 5$ matrix (likelihood and severity each 1–5, rating = product), rate the event "flammable vapour ignites" (i) as planned and (ii) after moving to a closed heating mantle in a fume cupboard away from the walkway. Which factor did each change attack, and what rating threshold of 8 (out of 25) would you defend for a teaching laboratory?
::: solution
(i) As planned: ethanol's flash point is far below the bath temperature, so vapour is generated continuously; an open flame is present *by design*, and the walkway adds a trip-and-spill path — likelihood 4, severity 4 (burns, possible fire) → rating 16: unacceptable, stop and redesign. (ii) The closed mantle removes the ignition source and the cupboard contains the vapour: likelihood falls to 2, severity stays 4 (the hot liquid can still scald) → rating 8: borderline-acceptable with PPE and eyewash controls in place. The redesign attacked the *likelihood* column (ignition source, vapour release); PPE would only have touched *severity*, which is exactly why it ranks lower. A threshold of 8 means "any event that is likely, or that could seriously injure, needs redesign before it is approved" — a defensible line in a teaching laboratory.
:::
:::

::: exercise A mini risk assessment {level=3}
Write a mini risk assessment (one paragraph per step of [[#alg-risk-assessment]]) for recrystallising a few grams of crude benzoic acid from water: heating on a hotplate, hot filtration, cooling to crystallise, vacuum filtration. Hazards, controls, waste and emergency cover — and remember that "the solvent is water" does not mean "the risk is zero".
::: hint
Work through the *process* hazards, not just the bottle: what is hot, what is under suction, what can cut, what is in the filtrate? Benzoic acid is an irritant (exclamation mark), and the crude solid may carry the acidic impurity it was made from — where does the mother liquor go?
:::
::: solution
**1. Hazards:** hot liquid and steam (scalds); hot glassware that looks identical to cold glassware; a filter flask under vacuum (implosion and cuts); benzoic acid solid, an irritant (exclamation mark) and a dust if ground; the acidic impurity in the crude material; the vacuum line pulling water into the pump. **2. Who and how:** you (scalds, cuts, splash to the eyes during hot filtration); neighbours (steam, spilled crystals underfoot); the cleaner (wet, slippery waste). **3. Evaluate and control:** hotplate, not open flame (water is not flammable, but paper and coats are); boiling granules added before heating; tongs and heat-resistant gloves for hot glassware; goggles for the hot filtration; vacuum through a stem-guarded flask with a trap in line, pump released *before* disconnecting so water is not sucked back; quantities at teaching scale. **4. Record and act:** goggles and gloves for handling the solid, spill paper ready; the acidic mother liquor goes to the aqueous acid waste container and the recovered solid to a labelled product vial — neither to the sink, because a thousand rinsings of acid are a tonne of acid; eyewash located. **5. Review:** if the procedure later changes to an ethanol recrystallisation, the whole assessment changes — the solvent becomes flammable and the hotplate question becomes urgent. The point of the exercise: a water-based experiment still produced a full assessment, because the hazards were in the *process*, and that is what step 1 is for.
:::
:::

::: exercise Accident autopsy {level=3}
Read the incident report and list every procedural violation you can find — at least six — with the correct practice for each: *"Aisha carried a full 2.5 L bottle of solvent by the neck across the laboratory, topped up her beaker at the open bench, left the bottle on the bench with the cap off for later, pipetted the liquid by mouth-filling the pipette and timing with her fingers, then went to the next bench to write up, still wearing her gloves. When the bottle on the floor behind her was knocked over, she mopped the spill with paper towels and put the towels in the general waste bin, and mentioned the spill to nobody because nobody was hurt."*
::: hint
Score each sentence against the four exposure routes, the hierarchy of controls and the waste rules; the last sentence contains two separate violations, one of them about reporting.
:::
::: solution
(1) Carrying a large bottle by the neck — transport in a tray or carrier, two hands, because the neck is the strongest-looking and weakest part and a 2.5 L break is a serious exposure. (2) Topping up at an open bench — a volatile solvent is measured in the fume cupboard, where the vapour goes past your face on the way out. (3) Bottle left open — containers stay closed except during the moment of pouring; an open bottle is a continuous source. (4) Mouth pipetting — always a pipette filler or bulb; the ingestion route needs no help. (5) Gloves worn to the write-up bench — gloves keep their contents; remove them before touching shared surfaces. (6) Solvent-soaked towels in the general bin — contaminated absorbent is chemical waste in the stream of its contaminant, and a bin of soaked paper is a slow fuse. (7) Nobody informed — spills are reported immediately so others can avoid the vapour and the slippery floor. (8) "Nobody was hurt" treated as the end — it was a near-miss, and near-misses are the free data that prevent the next entry being an injury. The sequence she skipped: protect people, isolate the source, inform, report.
:::
:::
