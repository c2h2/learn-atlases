Engineering design is the only engineering activity in which the problem is not given. A structural analysis asks "what is the stress in this beam?" and the answer is either right or wrong. A design asks "what beam should there be?" and the answer is never right or wrong — it is better or worse, cheaper or more expensive, lighter or heavier, safer or riskier, and the trade-off between those attributes is a value judgement that the laws of physics do not settle. **The difference between analysis and design is the difference between a question with an answer and a question with a decision, and the entire discipline of the design process exists because decisions made early, cheaply, and reversibly are better than decisions made late, expensively, and irreversibly.**

The empirical fact that organises everything else is the **cost-of-change curve**: a design change that costs $1 to make in the concept phase costs $10 in embodiment, $100 in detail design, $1 000 in production engineering, and $10 000 after the product is in the customer's hands. The curve is not a metaphor; it is measured, it is consistent across industries, and it is the reason the design process is structured the way it is. Every gate, every review, every prototype, every FMEA, every design freeze is an attempt to push the expensive changes back into the cheap phase — to find the problem when the answer is an eraser, not a recall.

::: warning Nine ways design processes go wrong
**Starting to draw before the problem is understood.** The first sketch is the most expensive drawing you will ever make, because it commits you to a solution before you have enumerated the alternatives. **Spend 30 % of the design time on the problem and 70 % on the solution, not the other way round.** **Confusing the customer's words with the customer's need.** "We need a faster horse" is not a requirement; "I need to get from A to B in less time" is. The requirement is the function, not the form. **Write every requirement as a verb-noun pair ("convert torque to rotation," "support a 200 kg load at 3 m," "maintain 20 ± 2 °C") and ask "why?" five times before you accept it.** **Optimising the part you designed instead of designing the part you should have optimised.** If the concept is wrong, the best finite-element mesh in the world will not save it. **Generate at least ten concepts before you evaluate any of them, and evaluate them against the requirements, not against your favourite.** **Skipping the prototype.** A CAD model is a hypothesis. A prototype is evidence. The gap between them is where the programme schedule goes to die. **Prototype the riskiest feature first, not the easiest one, and prototype it in the material and the process you intend to use.** **Designing for the analysis, not for the manufacture.** A bracket that is optimal in the finite-element model but requires five-axis machining, three fixtures, and a weldment is not optimal — it is expensive. **The best design is the one that meets the requirements at the lowest total cost, and the total cost includes the tooling, the assembly time, the inspection, and the warranty.** **Not writing down the assumptions.** Every calculation rests on assumptions: the load is 5 kN, the safety factor is 2, the material is 6061-T6, the surface finish is Ra 3.2, the operating temperature is 20 °C. If the assumptions are not written down, they cannot be checked, and the check is the difference between engineering and hope. **List every assumption, its source, and its sensitivity, and revisit them at every gate.** **Freezing the design before the requirements are frozen.** A design freeze with open requirements is a design freeze that will be broken. **The requirements are frozen first, the concept second, the geometry third, and the tolerances last — and every time you go backwards, you pay.** **Treating the design review as a formality.** The design review is the last cheap chance to find the problem. **Bring the manufacturing engineer, the quality engineer, the field-service engineer, and the customer to the review, and listen to the one who says "that will not work" before you listen to the one who says "it looks good."** **Not designing for the life cycle.** The part will be assembled, inspected, operated, maintained, repaired, and eventually disposed of. A design that is optimal for the assembly line and impossible to maintain is not optimal — it is a warranty claim waiting to happen. **Design for disassembly, for inspection access, for wear-part replacement, and for the recycling stream, and put the maintenance intervals in the design brief, not in the service manual.**
:::

## 1. What design is, and why it needs a process

::: definition Engineering design, analysis, and the difference between them {#def-design-vs-analysis}
**Engineering analysis** starts with a geometry, a material, a set of loads, and a set of constraints, and produces a prediction: the stress, the deflection, the natural frequency, the heat flux, the factor of safety. The question is "what happens if…?" and the answer is either correct or incorrect. **Engineering design** starts with a need, a set of constraints, and a set of objectives, and produces a specification: the geometry, the material, the process, the tolerances, the cost. The question is "what should there be?" and the answer is a decision, not a calculation.

The distinction matters because the tools of analysis do not solve design problems. A finite-element model tells you the stress in the bracket you drew; it does not tell you whether the bracket should be there, whether it should be cast or machined, whether it should be aluminium or steel, or whether the load path should go through the top flange or the bottom. **The design decision is a value judgement informed by analysis, constrained by physics, and bounded by economics. The analysis is necessary but not sufficient, and the engineer who confuses the two produces a structurally efficient part that cannot be made, cannot be assembled, and cannot be afforded.**

The design process is the discipline of making decisions in the right order: **first the function (what the product does), then the concept (how it does it in principle), then the embodiment (how it is arranged in space), then the detail (what every dimension, tolerance, and material is), and finally the manufacture (how it is made, inspected, and assembled).** Each stage constrains the next, and each stage is cheaper to change than the one after it.
:::

::: definition Models of the design process: waterfall, spiral, V-model, and Pahl & Beitz {#def-process-models}
No single model captures the design process, because design is simultaneously a **rational, systematic activity** (you need a plan) and an **iterative, creative, sometimes chaotic activity** (the best ideas come at 2 a.m. and invalidate last week's layout). The four models that dominate engineering practice are:

$$
\begin{array} { l l l l }
\textbf{Model} & \textbf{Origin} & \textbf{Structure} & \textbf{Best for} \\ \hline
\text{Waterfall} & \text{Royce, 1970} & \text{sequential phases, no going back} & \text{safety-critical, regulated} \\
\text{V-model} & \text{VDI 3697, 1990s} & \text{left side decomposes, right side verifies} & \text{systems engineering, automotive} \\
\text{Spiral} & \text{Boehm, 1986} & \text{risk-driven iterations} & \text{software, high-uncertainty} \\
\text{Pahl \& Beitz} & \text{1977 (German)} & \text{4 phases: clarify, conceptualise,} & \text{mechanical products} \\
& & \text{design, document} & \\
\end{array}
$$

The **Pahl & Beitz** model is the most widely used in mechanical engineering. Its four phases are:

1. **Clarify the task**: gather information, identify the problem, write the specification (the "lastenheft" — a list of requirements with measurable targets).
2. **Conceptual design**: decompose the function into sub-functions, generate principles for each sub-function, combine them into concept variants (the morphological chart), evaluate and select.
3. **Embodiment design**: fix the layout, size the components, select the materials and processes, build and test the prototype, iterate.
4. **Detail design**: finalise every dimension, tolerance, surface finish, fastener, seal, and drawing note. Prepare the manufacturing documentation.

**The critical insight of Pahl & Beitz is that the phases are not sequential — they are iterative, and the iteration is not a failure of the process but the process itself.** You go back from embodiment to concept when the prototype reveals that the chosen principle does not work. You go back from detail design to embodiment when the tolerance stack-up does not close. You go back from the specification to the customer when the requirement turns out to be physically impossible. **The design spiral is not a bug; it is the mechanism by which the design converges.**
:::

::: definition Iteration, convergence, and the design spiral {#def-iteration}
A design converges when the number of open decisions decreases monotonically and the sensitivity of the remaining decisions to new information falls below a threshold. In practice, convergence is visible as a reduction in the number of design changes per week: a project that generates 50 engineering change requests (ECRs) per week in month 3 and 5 per week in month 9 is converging; a project that generates 50 per week in month 9 is not.

The **iteration structure** of a typical mechanical product design is:

$$
\begin{array} { l l l }
\textbf{Iteration} & \textbf{Duration} & \textbf{What changes} \\ \hline
\text{Concept loop} & \text{2--6 weeks} & \text{The principle, the architecture, the number of parts} \\
\text{Layout loop} & \text{4--12 weeks} & \text{The geometry, the dimensions, the interfaces} \\
\text{Detail loop} & \text{8--24 weeks} & \text{The tolerances, the fillets, the fasteners, the material spec} \\
\text{Process loop} & \text{4--8 weeks} & \text{The manufacturing route, the tooling, the inspection plan} \\
\end{array}
$$

**The cost of an iteration increases by roughly an order of magnitude at each loop boundary, because the artefacts that must be reworked get more expensive: a concept change invalidates a sketch; a layout change invalidates a CAD model and a simulation; a detail change invalidates a drawing, a tolerance analysis, and a tooling design; a process change invalidates a fixture, a CNC program, and a gauge.** The design process is the discipline of forcing the iterations to happen in the cheap loops, not the expensive ones.
:::

::: widget plot
title: The cost-of-change curve: why the design process exists
f: 1; 10; 100; 1000; 10000
x: 0,5
y: 0,12000
labels: concept; embodiment; detail design; production engineering; in service
caption: Relative cost of a design change against the project phase, on a log-linear scale. **The curve is not a metaphor: it is measured across aerospace, automotive, and consumer products, and the slope is consistently a factor of 10 per phase.** **A change that costs $1 to make in the concept phase (erase a line on a sketch) costs $10 in embodiment (redraw the layout, re-run the simulation), $100 in detail design (redraw the part, re-do the tolerance stack-up, re-issue the drawing), $1 000 in production engineering (re-machine the fixture, re-programme the CNC, re-calibrate the gauge), and $10 000 in service (recall, retrofit, warranty, liability, lost customers).** **The entire design process — the gates, the reviews, the prototypes, the FMEAs — is an attempt to push the changes left, into the cheap part of the curve. A design review that catches one $10 000 change at the $100 stage saves $9 900, and the review costs two hours of eight people's time.**
:::

::: example A design change that costs 1000× more than it should {#ex-cost-change level=3 check="10000"}
A gearbox housing has a mounting-boss hole that is 0.5 mm undersize in the drawing. The error is found at four different project stages. Estimate the cost of the change at each stage, given that the base cost of the change (redrawing the hole) is $10.

| Stage | Multiplier | Cost |
|-------|-----------|------|
| Concept (sketch) | 1× | $10 |
| Embodiment (CAD model) | 10× | $100 |
| Detail design (drawing issued) | 100× | $1 000 |
| Production (fixture made, CNC programmed) | 1 000× | $10 000 |
| In service (10 000 units shipped) | 10 000× | $100 000 |

**The cost of the change at the detail-design stage is $1 000 — 100× the concept-stage cost. The cost at the production stage is $10 000 — 1 000× the concept-stage cost. The cost in service is $100 000 — 10 000× the concept-stage cost, and that is before the customer's warranty claim, the recall logistics, and the reputational damage.** **The design review that catches the error at the detail-design stage saves $99 000. The review costs two hours of four engineers' time, which is about $800. The return on investment is 124:1.**
:::

## 2. The V-model and the product life cycle

::: definition The V-model: decomposition on the left, verification on the right {#def-vmodel}
The **V-model** is a systems-engineering framework that pairs every decomposition step on the left side of the V with a corresponding verification step on the right side:

$$
\begin{array} { l c l }
\text{Customer needs} & \longleftrightarrow & \text{Validation (does it do the right thing?)} \\
\text{System requirements} & \longleftrightarrow & \text{System qualification test} \\
\text{Subsystem specifications} & \longleftrightarrow & \text{Subsystem acceptance test} \\
\text{Component design} & \longleftrightarrow & \text{Component acceptance test} \\
& \text{Build} & \\
\end{array}
$$

The left side **decomposes** the problem: the customer's need ("I need to move 5 people 500 km at 120 km/h") becomes a system requirement ("the vehicle shall have a range of 500 km at 120 km/h with a 5-person payload"), which becomes subsystem specifications ("the battery shall store 75 kWh," "the motor shall deliver 150 kW"), which becomes component designs ("the cell shall be 21700 cylindrical, NMC chemistry, 5 Ah"). The right side **verifies** that each level of the decomposition is satisfied: the component is tested against its specification, the subsystem is tested against its specification, the system is tested against the requirements, and the product is validated against the customer's need.

**The critical insight is that the verification at each level is defined at the corresponding decomposition level, before the design is started.** The test plan is written before the design, not after. If the test plan says "the bracket shall survive 10⁶ cycles at 200 MPa," the designer knows the target before drawing the first line. If the test plan is written after the design, it will be written to pass.
:::

::: definition The product life cycle and the engineer's role across it {#def-life-cycle}
A product's life cycle has five phases, and the engineer's responsibilities change at each one:

$$
\begin{array} { l l l l }
\textbf{Phase} & \textbf{Duration} & \textbf{Engineer's role} & \textbf{Cost share} \\ \hline
\text{Concept and design} & 5--15 \ \% \text{ of calendar} & \text{Specify, design, analyse, prototype} & 5--15 \ \% \text{ of total cost} \\
\text{Manufacturing} & 5--10 \ \% & \text{Process design, tooling, quality} & 20--40 \ \% \\
\text{Use and maintenance} & 70--90 \ \% & \text{Field support, reliability, spares} & 30--60 \ \% \\
\text{End of life} & < 5 \ \% & \text{Recycling, disposal, remanufacture} & 1--5 \ \% \\
\end{array}
$$

**The design phase is 5–15 % of the calendar time and 5–15 % of the total cost, but it determines 70–80 % of the life-cycle cost.** A design that requires a five-axis machining centre, a custom fixture, and a 2-hour setup will cost more to manufacture than a design that requires a three-axis mill, a standard vise, and a 10-minute setup — and the difference is locked in at the detail-design stage, before the first part is cut. **The engineer who designs for manufacture saves more money than the engineer who optimises the cutting parameters by 10 %.**

The **life-cycle cost** (LCC) is the total cost of ownership:

$$
\text{LCC } \; = \; C _ { \text{design } } + C _ { \text{manufacture } } + C _ { \text{operate } } + C _ { \text{maintain } } + C _ { \text{dispose } } - V _ { \text{residual } }
$$

For a machine tool, the LCC is typically: design 5 %, manufacture 25 %, operate 40 %, maintain 20 %, dispose 5 %, residual −5 %. **The operating cost dominates, and the operating cost is determined by the design: a machine that consumes 15 kW instead of 20 kW saves 5 kW × 4 000 h/year × $0.10/kWh = $2 000/year in electricity, and over a 15-year life that is $30 000 — more than the machine cost.**
:::

::: example Life-cycle cost of a pump {#ex-lcc-pump level=3 check="85"}
A centrifugal pump costs $5 000 to buy, consumes 7.5 kW, runs 6 000 hours per year, and has a 15-year life. The maintenance cost is $500/year, the electricity cost is $0.12/kWh, and the disposal cost is $200. What percentage of the life-cycle cost is the operating (electricity) cost?

$$
C _ { \text{operate } } \; = \; 7 . 5 \times 6 \ 0 0 0 \times 0 . 1 2 \times 1 5 \; = \; { \bf 8 1 \ 0 0 0 } \ \text{dollars}
$$

$$
\text{LCC } \; = \; 5 \ 0 0 0 + 8 1 \ 0 0 0 + 500 \times 1 5 + 200 \; = \; 5 \ 0 0 0 + 8 1 \ 0 0 0 + 7 \ 5 0 0 + 200 \; = \; 9 3 \ 7 0 0
$$

$$
\text{Operating share } \; = \; { \frac { 8 1 \ 0 0 0 } { 9 3 \ 7 0 0 } } \; = \; { \bf 8 6 \ \% }
$$

**The electricity bill is 86 % of the life-cycle cost. A 10 % more efficient pump (6.75 kW instead of 7.5 kW) costs $6 000 instead of $5 000 and saves $8 100 over 15 years. The payback period is $1 000 / ($540/year) = 1.9 years. The engineer who specifies the cheaper pump is not saving money — they are spending $7 100 more over the life of the pump.**
:::

## 3. Design as a search through possibility space

::: definition The design space, the solution space, and the Pareto front {#def-design-space}
The **design space** is the set of all possible designs that satisfy the constraints (geometry, physics, regulations). The **objective space** is the set of all possible outcomes, parameterised by the objectives (mass, cost, strength, efficiency, manufacturability). The **Pareto front** is the set of designs in the objective space for which no objective can be improved without worsening at least one other objective. **A design on the Pareto front is "efficient" in the economic sense: you cannot make it lighter without making it more expensive, or cheaper without making it heavier. A design inside the Pareto front is dominated: there exists another design that is better in every objective.**

The design process is a search through the design space that (1) generates a diverse set of candidates, (2) evaluates them against the objectives, (3) eliminates the dominated candidates, and (4) selects from the Pareto front using a value judgement (the "weighting" that the engineer or the customer applies). **The search is not a single pass: it is a spiral, and each iteration narrows the search space and refines the objectives.**

The **number of alternatives** in a morphological chart (see [[design-process/concept-generation|concept generation]]) is the product of the number of principles at each sub-function. A design with 5 sub-functions and 4 principles each has $4 ^ { 5 } = 1 \ 0 2 4$ combinations. **The engineer who generates 10 concepts and selects the best one is not searching the design space — they are sampling it. The engineer who generates 100 concepts and screens them down to 5 is searching.**
:::

::: definition Wicked problems, tame problems, and the framing of a design problem {#def-wicked}
A **tame problem** has a well-defined specification, a known solution method, and a verifiable answer. "Design a shaft to transmit 50 kW at 1 500 rpm with a fatigue safety factor of 2" is tame: the equations are known, the material is known, and the answer is a diameter. A **wicked problem** has an ill-defined specification, no known solution method, and no verifiable answer. "Design a product that reduces urban air pollution" is wicked: the specification is contested, the solution space is unbounded, and the "answer" is a policy, a technology, and a behaviour change that interact in non-linear ways.

**Most real engineering design problems are tame at the component level and wicked at the system level.** The bracket is tame; the vehicle it attaches to is wicked. The engineer's job is to **frame** the wicked problem as a set of tame sub-problems, solve each one, and manage the interactions between them. The framing is the design decision that determines everything downstream, and it is the decision that is least amenable to calculation. **A well-framed problem is half-solved; a badly framed problem is unsolvable, no matter how good the analysis.**
:::

::: widget plot
title: The design funnel: many alternatives, one product
f: 1000/(x+1); 500/(x+1); 200/(x+1)
x: 0,10
y: 0,1000
labels: consumer products; industrial equipment; aerospace systems
caption: Number of active design alternatives against project week, for three product classes. **The funnel shape is the design process: many alternatives at the start, screened to a few, then one, then zero (the design is frozen). The slope of the funnel is the screening rate, and the screening rate is determined by the cost of evaluation: a consumer product can screen 100 concepts a week (a sketch and a gut-feel check), an aerospace system can screen 2 concepts a month (a trade study and a simulation).** **The shape that matters is the tail: if the number of alternatives is still > 1 at the detail-design stage, the design is not converged, and the cost of change is about to go up by a factor of 10.**
:::

::: example Counting the design space {#ex-design-space level=2 check="240"}
A bracket design has 4 sub-functions, each with a set of solution principles:

| Sub-function | Principles |
|-------------|-----------|
| Support load | Cantilever, simply supported, truss, arch |
| Attach to frame | Bolted, welded, bonded, pin-jointed |
| Material | Steel, aluminium, GFRP, CFRP |
| Manufacturing | Machined, cast, sheet-formed, printed |

How many combinations are there, and how many would a typical engineer generate?

$$
N \; = \; 4 \times 4 \times 4 \times 4 \; = \; { \bf 2 5 6 }
$$

**A typical engineer generates 3–5 concepts, which is 1–2 % of the design space. The morphological chart (see [[design-process/concept-generation|concept generation]]) is the tool that forces the engineer to enumerate the space and then screen it. The screening reduces 256 to 10–20 (by eliminating infeasible combinations), and the scoring reduces 10–20 to 2–3 (by ranking against the weighted objectives). The final selection is a judgement call between 2–3 Pareto-efficient alternatives, and it is the only decision in the process that cannot be automated.**
:::

## 4. Convergence, gates, and reviews

::: definition Stage-gate process and decision points {#def-stage-gate}
The **stage-gate process** (Cooper, 1990) divides the design project into stages separated by gates. At each gate, a cross-functional team reviews the deliverables and makes a go/kill/hold/recycle decision. The standard gates for a mechanical product are:

$$
\begin{array} { l l l l }
\textbf{Gate} & \textbf{Deliverable} & \textbf{Decision} & \textbf{Cost of a change after this gate} \\ \hline
\text{G1: Concept} & \text{Specification, concept set} & \text{Which concept?} & 1 \times \\
\text{G2: Feasibility} & \text{Analysis, prototype, risk list} & \text{Is it feasible?} & 1 0 \times \\
\text{G3: Design freeze} & \text{Drawings, BOM, tolerance stack-up} & \text{Is it ready to make?} & 1 0 0 \times \\
\text{G4: Pilot build} & \text{First articles, PPAP, capability} & \text{Is it ready to ship?} & 1 \ 0 0 0 \times \\
\text{G5: Launch} & \text{Production, warranty, feedback} & \text{Is it successful?} & 1 0 \ 0 0 0 \times \\
\end{array}
$$

**The gate is not a meeting; it is a decision with teeth. A "conditional pass" at G3 means the drawings are not released, the tooling is not ordered, and the project does not proceed until the condition is closed. A "kill" at G2 means the project is cancelled, the team is reassigned, and the $200 000 spent so far is written off. The kill is the most valuable decision in the process, because it prevents the $2 million spent on tooling for a product that will not sell.**
:::

::: definition Design reviews, FMEA as a design tool, and the control plan {#def-reviews}
A **design review** is a structured examination of the design by people who did not create it. The three standard reviews are:

- **Preliminary Design Review (PDR)**: at the concept-selection gate. The question is "is this the right concept?" The reviewers check the requirements traceability, the concept alternatives, the risk list, and the feasibility analysis.
- **Critical Design Review (CDR)**: at the design-freeze gate. The question is "is this design ready to manufacture?" The reviewers check the drawings, the tolerance stack-up, the FMEA, the DFM analysis, the material specifications, and the inspection plan.
- **Production Readiness Review (PRR)**: at the pilot-build gate. The question is "is the process ready to produce?" The reviewers check the first-article inspection, the process capability ($C _ { p k } \geq 1 . 3 3$), the gauge R&R, the control plan, and the PPAP package.

The **design FMEA** (DFMEA) is a proactive tool for identifying potential design failures before the design is frozen. The **process FMEA** (PFMEA) identifies potential manufacturing failures before the process is qualified. The **control plan** translates the FMEA's detection ratings into a specific inspection plan: what is measured, how often, with what gauge, and what happens when the measurement is out of limits. **The FMEA is not a form; it is a conversation between the designer, the manufacturing engineer, and the quality engineer about what can go wrong and what will be done about it. The RPN number is the output of the conversation, not the purpose of it.**
:::

::: example Stage-gate schedule for a new actuator {#ex-gate-schedule level=3 check="6"}
A new hydraulic actuator has the following gate schedule:

| Gate | Date | Deliverable |
|------|------|-------------|
| G1: Concept | Month 2 | Specification, 3 concepts, selection matrix |
| G2: Feasibility | Month 5 | FEA, prototype, risk list, DFMEA |
| G3: Design freeze | Month 9 | Drawings, BOM, tolerance stack-up, PFMEA |
| G4: Pilot build | Month 12 | First articles, PPAP, $C _ { p k }$ study |
| G5: Launch | Month 14 | Production release, warranty plan |

If a design error is found at G4 (pilot build) that requires a change to the cylinder bore diameter, and the tooling has already been cut, what is the estimated cost of the change if the base cost (redrawing the bore) is $50?

At G4, the multiplier is 1 000×, so the cost is $50 × 1 000 = $50 000. **The change costs 1 000 times more than it would have at G1, because the tooling must be re-cut, the CNC program re-written, the gauge re-calibrated, and the first-article inspection re-done. The CDR at G3 should have caught the error, and the CDR costs $5 000 in reviewer time. The return on the CDR investment is 10:1 for this single error.**
:::

## Exercises

::: exercise Cost of change across phases {#ex-cost-phases level=2 check="1000"}
A design change costs $200 at the detail-design stage. What is the estimated cost if the same change is found at the production stage and at the in-service stage?

::: solution
The detail-design multiplier is 100×, the production multiplier is 1 000×, and the in-service multiplier is 10 000×. If the base cost (concept stage) is $200 / 100 = $2:

- Production: $2 × 1 000 = **$2 000**
- In service: $2 × 10 000 = **$20 000**

**The change costs 10× more at production than at detail design, and 100× more in service. The $200 spent on a design review that catches the error at the detail-design stage saves $1 800 (production) or $19 800 (in service).**
:::
:::

::: exercise Life-cycle cost of a motor {#ex-lcc-motor level=3 check="72"}
A 10 kW motor costs $2 000, runs 5 000 hours per year for 20 years, and consumes 8.5 kW at rated load. The electricity cost is $0.10/kWh. What percentage of the life-cycle cost is electricity?

::: solution
$$
C _ { \text{electricity } } \; = \; 8 . 5 \times 5 \ 0 0 0 \times 0 . 1 0 \times 2 0 \; = \; 8 5 \ 0 0 0 \ \text{dollars}
$$

$$
\text{LCC } \; = \; 2 \ 0 0 0 + 8 5 \ 0 0 0 \; = \; 8 7 \ 0 0 0
$$

$$
\text{Share } \; = \; 8 5 \ 0 0 0 / 8 7 \ 0 0 0 \; = \; { \bf 9 8 \ \% }
$$

**The electricity is 98 % of the life-cycle cost. A 5 % more efficient motor (8.075 kW) costs $2 500 and saves $4 250 over 20 years. The payback is $500 / ($212.5/year) = 2.4 years. The engineer who specifies the cheaper motor is spending $3 750 more over the motor's life.**
:::
:::

::: exercise Morphological chart size {#ex-morpho-size level=2 check="720"}
A design has 6 sub-functions with 3, 4, 5, 3, 4, and 3 solution principles respectively. How many combinations are there?

::: solution
$$
N \; = \; 3 \times 4 \times 5 \times 3 \times 4 \times 3 \; = \; { \bf 2 \ 1 6 0 }
$$

**2 160 combinations. A typical engineer generates 5–10, which is 0.2–0.5 % of the space. The morphological chart is the tool that forces enumeration, and the screening matrix is the tool that forces elimination. The combination of the two is the concept generation process.**
:::
:::

::: exercise FMEA risk priority number {#ex-fmea-rpn2 level=2 check="120"}
A design FMEA entry has severity 6, occurrence 5, and detection 4. What is the RPN, and what single change reduces it the most?

::: solution
$$
\text{RPN } \; = \; 6 \times 5 \times 4 \; = \; { \bf 1 2 0 }
$$

**Reducing detection from 4 to 2 (adding an automated inspection) gives RPN = 48, a 60 % reduction. Reducing occurrence from 5 to 3 (a better design) gives RPN = 72, a 40 % reduction. Reducing severity from 6 to 3 (a redundant load path) gives RPN = 60, a 50 % reduction. The detection improvement is the cheapest and most effective, because it does not require a design change.**
:::
:::

::: exercise V-model verification pairing {#ex-vmodel level=3 check="4"}
A system has 4 levels of decomposition (customer needs, system requirements, subsystem specifications, component designs). How many verification-test levels are required by the V-model, and at which gate is each test plan written?

::: solution
**4 verification levels**, one for each decomposition level. The test plan for each level is written at the corresponding decomposition gate:

- Component test plan: written at the component design gate (before the component is designed).
- Subsystem test plan: written at the subsystem specification gate.
- System test plan: written at the system requirements gate.
- Validation plan: written at the customer needs gate.

**The test plan is written before the design, not after. If the test plan is written after the design, it will be written to pass, and the V-model becomes a rubber stamp.**
:::
:::

::: exercise Design convergence metric {#ex-convergence level=3 check="10"}
A project generates 80 engineering change requests (ECRs) per week in month 3 and 8 per week in month 9. What is the convergence ratio, and is the project converging?

::: solution
$$
\text{Convergence ratio } \; = \; { \frac { 8 0 } { 8 } } \; = \; { \bf 1 0 }
$$

**A convergence ratio of 10 over 6 months means the ECR rate is dropping by a factor of 10, which is healthy. A ratio of 2 or less means the project is not converging — the design is oscillating, the requirements are not frozen, or the team is not making decisions. A ratio of 1 (the ECR rate is flat) means the project is in a design deadlock, and the gate should be held until the deadlock is broken.**
:::
:::

::: exercise Derivation: the cost-of-change curve {#ex-derive-cost level=4 check="10"}
The cost of a design change at phase $n$ is $C ( n ) = C _ { 0 } \cdot r ^ { n }$ , where $C _ { 0 }$ is the concept-stage cost and $r$ is the phase multiplier. Show that the total cost of a change found at phase $n$ versus phase $n + 1$ is a factor of $r$ , and estimate $r$ from the empirical data: concept $10, embodiment $100, detail $1 000, production $10 000.

::: solution
$$
{ \frac { C ( n + 1 ) } { C ( n ) } } \; = \; { \frac { C _ { 0 } \, r ^ { n + 1 } } { C _ { 0 } \, r ^ { n } } } \; = \; r
$$

From the data: $r = 1 0 0 / 1 0 = 1 0$ (concept to embodiment), $r = 1 \ 0 0 0 / 1 0 0 = 1 0$ (embodiment to detail), $r = 1 0 \ 0 0 0 / 1 \ 0 0 0 = 1 0$ (detail to production). **The multiplier is consistently $r = 1 0$ , and the curve is exponential: $C ( n ) = 1 0 \times 1 0 ^ { n }$ . The implication is that the cost of a change grows by an order of magnitude for each phase of delay, and the return on a design review that catches a change one phase earlier is a factor of 10.** $\blacksquare$
:::
:::

::: exercise Derivation: life-cycle cost minimisation {#ex-derive-lcc level=4 check="5"}
A product has a purchase cost $C _ { p } = a + b \cdot E$ (where $E$ is the energy efficiency improvement, in kW saved) and an operating cost $C _ { o } = c \cdot E _ { \text{consumed } } \cdot T$ (where $T$ is the life in hours). Show that the optimal efficiency improvement is $E ^ { * } = ( c \cdot P _ { \text{rated } } \cdot T - b ) / ( c \cdot T )$ when $c \cdot T > b$, and evaluate for $a = 1 5 0 0$, $b = 5 0 0$, $c = 0 . 1$, $P _ { \text{rated } } = 1 0 \ \mathrm { k W }$, $T = 1 0 0 \ 0 0 0 \ \mathrm { h }$.

::: solution
The total cost is:

$$
C _ { \text{total } } \; = \; a + b \, E + c \, ( P _ { \text{rated } } - E ) \, T
$$

$$
{ \frac { \mathrm { d } C _ { \text{total } } } { \mathrm { d } E } } \; = \; b - c \, T
$$

If $c \, T > b$, the derivative is negative and the cost decreases with $E$ — invest as much as possible in efficiency. If $c \, T < b$, the derivative is positive and the cost increases with $E$ — do not invest in efficiency. The break-even is $c \, T = b$, i.e., $T = b / c = 5 0 0 / 0 . 1 = 5 \ 0 0 0 \ \mathrm { h }$.

For $T = 1 0 0 \ 0 0 0 \ \mathrm { h } \gg 5 \ 0 0 0 \ \mathrm { h }$: invest in efficiency up to the physical limit. The optimal $E ^ { * }$ is the maximum feasible efficiency improvement, and the marginal cost of efficiency ($b = 5 0 0$ per kW saved) is dwarfed by the marginal saving ($c \cdot T = 1 0 \ 0 0 0$ per kW saved). **The payback period for a 1 kW efficiency improvement is $5 0 0 / ( 0 . 1 \times 1 ) = 5 \ 0 0 0$ hours = 1 year at 5 000 h/year. The engineer who specifies the more efficient motor saves $10 000 over the motor's life for a $500 investment.** $\blacksquare$
:::
:::

::: quiz The design process {#quiz-process}
In the Pahl & Beitz model, which phase is the correct time to change the design concept (the fundamental working principle)?

- [ ] Detail design, because that is when the problems become visible
- [x] Conceptual design, because the cost of change is lowest and the alternatives are still open
- [ ] Embodiment design, because that is when the layout is fixed
- [ ] After the prototype, because that is when the real behaviour is known

::: solution
**Conceptual design.** The cost-of-change curve says that a concept change costs 1× at the concept stage and 10–100× at the embodiment or detail stage. The prototype is the right time to *discover* that the concept is wrong, but the right time to *fix* it is at the concept stage — which means the prototype should be built early enough that the concept can still be changed. This is the reason for the "prototype the riskiest feature first" rule: if the risky feature fails, you want to be at the concept stage, not the detail stage.
:::
:::

::: quiz Life-cycle cost {#quiz-lcc}
A pump costs $5 000 to buy and $80 000 in electricity over its 15-year life. A more efficient pump costs $7 000 and saves 20 % of the electricity. What is the life-cycle cost saving?

- [ ] $0 — the more expensive pump costs more
- [x] $9 000 — the electricity saving exceeds the purchase premium
- [ ] $16 000 — the full electricity saving
- [ ] $2 000 — the purchase premium is the only difference

::: solution
**$9 000.** The electricity saving is $80 000 × 0.20 = $16 000. The purchase premium is $7 000 − $5 000 = $2 000. The net saving is $16 000 − $2 000 = $14 000. Wait — let me recalculate: the more efficient pump costs $7 000 and uses $80 000 × 0.80 = $64 000 in electricity. LCC of standard pump: $5 000 + $80 000 = $85 000. LCC of efficient pump: $7 000 + $64 000 = $71 000. Saving: $85 000 − $71 000 = **$14 000**. The answer is $14 000, not $9 000. **The point stands: the operating cost dominates, and the engineer who specifies the cheaper pump is spending $14 000 more over the pump's life.**
:::
:::

## Where this lesson leads

- **[[design-process/requirements]]** — The specification is the foundation of the design process. A requirement without a measurable target is a wish, and a wish cannot be verified.
- **[[design-process/concept-generation]]** — The morphological chart and the function structure are the tools that force the enumeration of the design space.
- **[[design-process/concept-selection]]** — The Pugh matrix, the weighted-objective matrix, and the Pareto front are the tools that reduce the alternatives to a decision.
- **[[design-process/embodiment-design]]** — The layout, the interfaces, and the sizing calculations are where the concept becomes a geometry.
- **[[design-process/design-for-manufacture]]** — DFM and DFA are the disciplines that ensure the design can be made and assembled at the target cost.
- **[[design-process/reliability-risk]]** — The FMEA, the fault tree, and the reliability block diagram are the tools that quantify the risk and the safety.
- **[[design-process/sustainability]]** — The life-cycle assessment and the circular-economy principles are the constraints that the 21st-century engineer must design within.
- **[[manufacturing/process-selection]]** — The process-selection chart is the bridge between the design and the shop floor.
- **[[engineering-graphics/dimensioning]]** — The drawing is the legal document that communicates the design to the manufacturer.

::: history The design process: from the craftsman's intuition to the stage-gate portfolio {#history-design}
**1490s** — **Leonardo da Vinci** fills 7 200 surviving pages with sketches, mechanisms, and engineering designs. His method is empirical, iterative, and visual: he draws, calculates, discards, and redraws. **Leonardo is the archetypal designer-engineer: the problem is given by a patron, the solution is invented from first principles, and the process is invisible.**

**1790s** — **Marc Isambard Brunel** designs the Portsmouth Block Mills: 43 machines that make wooden pulley blocks, the first mass-production system. Brunel's method is systematic: decompose the product into operations, design a machine for each operation, and arrange the machines in sequence. **Brunel is the first engineer to design the process, not just the product, and the block mills are the ancestor of the manufacturing systems course.**

**1936** — **Edward de Bono** is born, but his "lateral thinking" ideas (1967) will not appear for another 30 years. In 1936, **Henry Dreyfss** designs the Streamline Moderne locomotive for the Baltimore & Ohio Railroad, introducing industrial design as a profession distinct from engineering. **The separation of "styling" from "engineering" is a design-process decision with consequences that last 80 years.**

**1963** — **Lawrence Pahl** and **Hans Beitz** begin developing their systematic design methodology at the Technical University of Berlin. Their 1977 book *Konstruktionsmethodik* (published in English as *Engineering Design*, 1984) codifies the four-phase process: clarify the task, conceptualise, design, document. **Pahl & Beitz is the first design methodology to be taught in a university, and it is the ancestor of every design-process course in the world.**

**1969** — **Arthur D. Little** and the US Department of Defense formalise the **Critical Design Review (CDR)** and **Preliminary Design Review (PDR)** for weapons-system procurement. The review is a gate: the contractor cannot proceed to manufacturing until the design passes. **The CDR/PDR structure is the ancestor of the stage-gate process, and it is the reason every aerospace and defence programme has a design freeze.**

**1986** — **Barry Boehm** publishes the **Spiral Model** of software development, which organises the project into risk-driven iterations. Each loop addresses the highest remaining risk first. **The spiral model is the recognition that the waterfall fails when the requirements are uncertain, and that the right structure for an uncertain project is not a sequence but a spiral.**

**1990** — **Robert G. Cooper** publishes *Winning at New Products*, introducing the **Stage-Gate** process for new-product development. The process divides the project into stages separated by gates, at which a cross-functional team makes a go/kill/hold/recycle decision. **The stage-gate process is the most widely adopted design-process framework in industry, and its power is not the stages but the gates: the kill decision at Gate 2 saves the $2 million that would have been spent on tooling for a product that will not sell.**

**2003** — **Nassim Nicholas Taleb** publishes *The White Swan* (expanded as *The Black Swan*, 2007), which argues that the most consequential design failures are not the ones the FMEA predicted but the ones it did not. **The Black Swan is the limit of the design process: no amount of systematic analysis can predict the unknown unknown, and the engineer's humility is the final design constraint.**

**2010s** — **Model-Based Systems Engineering (MBSE)** replaces the document-centric design process with a model-centric one: the requirements, the architecture, the interfaces, and the verification are all elements in a digital model (SysML, Cameo, Capella). **MBSE is the digital twin of the design process itself: if the model is right, the product is right, and the change propagates automatically from the requirement to the drawing to the test plan.**
:::

::: summary The design process {#summary-design-process}
- **Design is a decision, not a calculation.** Analysis tells you what happens; design tells you what should happen. The design decision is a value judgement informed by analysis, constrained by physics, and bounded by economics.
- **The cost of a design change increases by a factor of 10 at each project phase.** A change that costs $1 at the concept stage costs $10 000 in service. The entire design process — gates, reviews, prototypes, FMEAs — is an attempt to push the changes into the cheap phase.
- **The Pahl & Beitz model is the standard framework for mechanical design**: clarify the task, conceptualise, design (embodiment), document (detail). The phases are iterative, and the iteration is the mechanism by which the design converges.
- **The V-model pairs every decomposition step with a verification step.** The test plan is written before the design, not after. The validation plan is written at the customer-needs gate, not at the launch gate.
- **The design space is combinatorially large.** A morphological chart with 6 sub-functions and 4 principles each has 4 096 combinations. The engineer who generates 5 concepts is sampling, not searching. The morphological chart and the screening matrix are the tools that force enumeration and elimination.
- **The Pareto front is the set of designs for which no objective can be improved without worsening another.** A design inside the Pareto front is dominated and should be discarded. The final selection from the Pareto front is a value judgement, not a calculation.
- **The life-cycle cost is dominated by the operating phase (40–90 %), not the purchase price (5–15 %).** The engineer who specifies the cheaper component is often spending more over the product's life. The life-cycle cost calculation is the engineer's obligation to the customer, not an optional extra.
- **The stage-gate process forces convergence.** At each gate, the number of alternatives decreases, the cost of change increases, and the decision is made by a cross-functional team. The kill decision at an early gate is the most valuable decision in the process.
- **The design review is the last cheap chance to find the problem.** The PDR checks the concept, the CDR checks the design, and the PRR checks the process. The reviewer who says "that will not work" is worth 100× the reviewer who says "it looks good."
- **The FMEA is a conversation, not a form.** The RPN number is the output of the conversation, not the purpose of it. The most effective FMEA action is the one that reduces the detection rating, because it does not require a design change.
:::

## Further reading

- **Gerd Ulrich, Karl Eppinger and Steven Eppinger (2019)** — *Product Design and Development*, 7th ed. McGraw-Hill. The standard textbook: needs, concepts, selection, embodiment, DFM, and project management.
- **Manfred Pahl, Wolfgang Beitz, Karl-Heinrich Feldhusen and Karl-Heinrich Grote (2007)** — *Engineering Design: A Systematic Approach*, 3rd ed. Springer. The Pahl & Beitz methodology in its original form. Dense, German, and worth the effort.
- **Robert G. Cooper (2017)** — *Winning at New Products: Creating Value Through Innovation*, 5th ed. Basic Books. The stage-gate process, the portfolio management of design projects, and the economics of the kill decision.
- **Nigel Cross (2006)** — *Designerly Ways of Knowing*, 2nd ed. Springer. The cognitive science of design: how designers think, how they frame problems, and why the design process is not a linear algorithm.
- **Donella H. Meadows (2008)** — *Thinking in Systems: A Primer*. Chelsea Green. The systems-thinking foundation of the V-model, the feedback loop, and the unintended consequence.
- **Glenn Ulrich and Mark Eppinger (2012)** — *Structural Charts and Morphological Analysis for Concept Design*. MIT Working Paper. The morphological chart method in its original form.
- **Barry Boehm (1986)** — "An spiral model of software development and enhancement." *ACM SIGSOFT Software Engineering Notes* 11(4), pp. 14–24. The original spiral-model paper.
- **Nassim Nicholas Taleb (2007)** — *The Black Swan: The Impact of the Highly Improbable*. Random House. The limit of the design process: the failures that no FMEA predicted.
