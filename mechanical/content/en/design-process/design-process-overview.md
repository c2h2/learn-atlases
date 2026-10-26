An analysis problem arrives complete: here is a beam, its supports, its loads and its material, find the deflection. A design problem arrives incomplete. A customer says that a ward needs a way to move patients from bed to chair without injuring nurses, or that a small brewery needs a bottling line that fits in a 6 m room. Nobody has said what the device is, what it is made of, how much force it must carry or what it may cost. The designer has to turn that incomplete statement into a set of drawings, models and instructions from which an object can be made, tested, sold, used, repaired and finally disposed of. On the way there are thousands of decisions, most of them made with incomplete information, and many of them hard to reverse once the next decision has been built on top.

This chapter is about how engineers organise that work. It defines what distinguishes design from analysis, describes the main models of the design process — the systematic phases of Pahl and Beitz and VDI 2221, the systems-engineering V-model and the stage-gate process used to manage product development — and explains why every one of them is built around iteration and early checking. Two simple quantitative models make the argument precise: a probabilistic model of iteration and late-found errors, and the life-cycle cost of a product discounted to present value. The remaining chapters of the course work through the phases in order: [[design-process/requirements]], [[design-process/concept-generation]], [[design-process/concept-selection]], [[design-process/embodiment-design]], [[design-process/design-for-manufacture]], [[design-process/reliability-risk]], [[design-process/sustainability]] and [[design-process/ethics-standards]].

## Design and analysis {#sec-design}

Analysis is the forward problem: given a fully described artefact, predict its behaviour. Design is the inverse problem: given a desired behaviour, find an artefact that produces it. Inverse problems rarely have unique solutions. A bracket that carries $5\,\mathrm{kN}$ with a factor of safety of 2 can be a machined aluminium block, a folded steel sheet, a casting, a moulded glass-filled nylon part or a pair of standard angle sections; each answer is correct in the sense that it carries the load, and the choice between them depends on cost, mass, production volume, appearance, the tools the factory owns and dozens of other considerations that are not physics.

::: definition Design problem: requirements, constraints, objectives and design variables {#def-design-problem}
A **design problem** consists of

- **design variables** — the quantities the designer chooses: the configuration (which parts exist and how they connect), the materials and processes, and the dimensions and tolerances;
- **constraints** — conditions every acceptable design must satisfy, such as "stress below the allowable value", "mass at most $12\,\mathrm{kg}$", "fits within a $600\times400\times300\,\mathrm{mm}$ envelope", or "complies with EN ISO 12100";
- **objectives** — quantities to be made as small or as large as possible among the acceptable designs, such as unit cost, mass, energy use or noise.

The **requirements** of a product are the written statement of its constraints and objectives, each with a measurable target where possible. A design is **feasible** if it satisfies all constraints; design is the search for a feasible design that is good, not necessarily optimal, with respect to the objectives.
:::

Two features make real design problems harder than the optimisation problems of a mathematics course. First, the configuration variables are discrete and the set of possible configurations is not known in advance: part of the designer's job is to invent the options. Second, the problem itself changes as it is worked on. Herbert Simon called such problems **ill-structured**: the criteria for a good answer, the space of possible answers and the knowledge needed are not all available at the start, and are clarified by attempting solutions. A prototype that reveals an unexpected vibration does not only fail a test — it adds a requirement (a minimum natural frequency) that nobody wrote down at the beginning.

Analysis is still indispensable. Every design decision is a prediction that the chosen artefact will behave acceptably, and the quality of a design is limited by the quality of those predictions. The two activities alternate: a designer proposes, analysis evaluates, and the evaluation suggests the next proposal. The rest of this chapter is about organising that alternation so that the expensive mistakes are found while they are still cheap.

## Models of the design process {#sec-models}

Over the past sixty years engineers and researchers have proposed many models of the design process. It helps to separate two kinds. **Descriptive models** say what designers actually do, as observed in studies of practising designers; they emphasise early commitment to a solution idea, followed by analysis and repair. **Prescriptive models** say what designers ought to do; they emphasise working on the problem before the solution and deliberately generating alternatives. The models taught in mechanical engineering are prescriptive, and they are best read as checklists of deliverables and decisions, not as an order in which thought must happen.

### The systematic approach of Pahl and Beitz and VDI 2221

The most influential prescriptive model in mechanical engineering comes from the German school of *Konstruktionslehre* (design science). Gerhard Pahl and Wolfgang Beitz published their textbook in 1977; the guideline VDI 2221, issued by the Association of German Engineers in 1986, set out a closely related sequence. Both divide the work into four main phases.

::: algorithm Main phases of the systematic design process {#alg-phases}
1. **Planning and task clarification.** Identify the need, collect information about the market, users, competitors, regulations and the company's capabilities, and write the **requirements list** (specification): each requirement with a measurable value, marked as a demand (must be met) or a wish (desirable). *Deliverable:* an agreed specification.
2. **Conceptual design.** Abstract the problem to its essential functions, set up a function structure, search for working principles for each sub-function, combine them into concept variants, and evaluate the variants against the specification. *Deliverable:* a chosen concept, described by sketches and principal calculations.
3. **Embodiment design.** Turn the concept into a definitive layout: arrangement of parts, preliminary shapes and sizes, materials, processes and interfaces, checked by calculation, simulation and prototypes against strength, stiffness, life, safety, manufacture and cost. *Deliverable:* a definitive layout.
4. **Detail design.** Fix every dimension, tolerance, surface finish, material specification and assembly instruction, and produce the production documents: detail and assembly drawings or annotated 3D models, parts lists, test and inspection plans. *Deliverable:* the released product documentation.

At the end of each phase the results are checked against the specification; if they fail, work returns to the earliest phase in which the cause can be fixed.
:::

The last sentence matters more than the four numbered steps. Pahl and Beitz insist on iteration at every level: within a phase (try, evaluate, improve) and between phases (a layout that cannot meet the stiffness requirement may send the designer back to the concept, and a concept that cannot be made at the target cost may send the team back to renegotiate the specification). What the model prescribes is not a one-way sequence but an order of *commitment*: do not fix tolerances before the layout is stable, do not fix the layout before the concept is chosen, and do not choose the concept before the problem is understood.

### The V-model

Large systems — aircraft, cars, rail vehicles, medical scanners — are designed by many teams working on subsystems. Systems engineering organises this work with the **V-model** (or Vee model), introduced in this form by Kevin Forsberg and Harold Mooz in 1991. The left arm of the V descends through levels of decomposition: user needs, system requirements, system architecture, subsystem requirements, component design. The bottom of the V is implementation: parts are made and software written. The right arm ascends through integration: components are tested, assembled into subsystems and tested, assembled into the system and tested, and finally the system is validated against the user needs.

::: definition Verification and validation {#def-vv}
**Verification** asks whether the product was built right: whether a component, subsystem or system meets its *specified requirements*, shown by inspection, analysis, demonstration or test. **Validation** asks whether the right product was built: whether the finished system meets the *users' needs* in its intended environment. In the V-model each level on the left is paired with a verification activity at the same level on the right, and the verification method for each requirement is decided when the requirement is written.
:::

The horizontal pairing in the V is the model's main lesson. A requirement for which no test, analysis or inspection can be specified is not yet a requirement, and writing the verification plan at the same time as the requirement forces vague statements ("the handle shall be comfortable") to become measurable ones ("the handle shall have a grip diameter of $30$–$40\,\mathrm{mm}$ and a maximum surface temperature of $43\,^\circ\mathrm{C}$"). Validation cannot be reduced to verification: a product can meet every written requirement and still fail its users because a need was never written down.

### Stage-gate product development

The models above describe the technical work. Companies also need a way to decide whether to keep spending money on a project. Robert Cooper's **stage-gate** process, published in 1990 from studies of industrial new-product projects, divides development into stages (scoping, building the business case, development, testing and validation, launch) separated by **gates**. At each gate a review team examines the deliverables of the previous stage against agreed criteria and decides to go, kill, hold or recycle the project. The gates are where the technical design process meets the business: a design review at the end of embodiment design is often also the gate at which the company commits to buying production tooling.

::: remark Iterative models from software
In software, Winston Royce's 1970 paper on managing large software projects is usually cited as the origin of the strictly sequential "waterfall" model, although Royce himself described the single-pass sequence as risky and recommended iteration and building the system twice. Barry Boehm's spiral model (1988) made risk the driver: each turn of the spiral resolves the largest remaining risk by prototyping or analysis before committing more resources. Agile methods push the same idea further with short cycles of build and feedback. Mechanical products cannot be rebuilt every two weeks as software can, but the principle — resolve the biggest uncertainty first and cheaply — carries over directly to prototyping strategy.
:::

## Iteration and the cost of late change {#sec-iteration}

All of these models are built around checking work early. The justification is an empirical regularity: the later a defect in a design is found, the more work has been built on top of it and the more it costs to correct. A wrong bearing choice found in a concept review costs an hour; found after the housing drawings are released, it means redrawing the housing; found after the casting pattern is made, it means new tooling; found in service, it may mean a recall. The ratio between successive stages varies widely between industries and between defects, and the often-quoted "factor of ten per phase" is a rule of thumb rather than a measured constant. The direction of the effect is not in doubt, and a simple probability model shows how it shapes the process.

### How many tries?

Suppose a prototype is built and tested, and each build–test cycle independently passes with probability $p$. Failed cycles are followed by a redesign and another build.

::: proposition Expected number of build–test cycles {#prop-geometric}
If each cycle passes independently with probability $p > 0$, the number of cycles $K$ up to and including the first pass has the geometric distribution $\Pr(K = k) = (1-p)^{k-1}p$, $k = 1, 2, \dots$, with
$$
\E[K] = \frac{1}{p}, \qquad \Pr(K > m) = (1-p)^m .
$$ {#eq-geometric}
:::

::: proof
The first pass occurs at cycle $k$ exactly when the first $k-1$ cycles fail and the $k$-th passes; by independence this has probability $(1-p)^{k-1}p$. $K > m$ exactly when the first $m$ cycles all fail, probability $(1-p)^m$. For the mean, write $q = 1 - p$ and use $\E[K] = \sum_{m\ge 0}\Pr(K > m) = \sum_{m\ge0} q^m = 1/(1-q) = 1/p$, the sum of a geometric series with $0 \le q < 1$. The assumptions are that $p$ is the same for every cycle and that cycles are independent; in practice $p$ usually rises as the design matures, so $1/p$ with the first-cycle value is pessimistic.
:::

::: example Planning prototype iterations {#ex-iterations}
A team designing a hand-held tool estimates that its first full prototype has a 60 % chance of passing the drop and endurance tests. Each build–test–redesign cycle takes 8 weeks and costs €40 000. Estimate the expected time and cost to a passing prototype, and the probability that more than three cycles are needed.

::: solution
From [[#eq-geometric]] with $p = 0.6$: $\E[K] = 1/0.6 = 1.67$ cycles. Expected duration $1.67\times8 = 13.3$ weeks; expected cost $1.67\times40\,000 = $ €66 700. The probability of needing more than three cycles is $\Pr(K > 3) = 0.4^3 = 0.064$, about 6 %.

The plan should therefore budget for two cycles, not one: planning for a single cycle with $p = 0.6$ means a 40 % chance of overrunning immediately. Raising $p$ is worth money: if a week of extra analysis and a cheap rig test of the riskiest feature raised $p$ to $0.8$, the expected number of cycles would fall to $1.25$, saving about $0.42\times$€40 000 ≈ €17 000 and three weeks.

*Sanity check:* with $p = 1$ the model gives exactly one cycle; as $p\to0$ the expected number grows without bound — both as they should.
:::
:::

### When is a defect found?

Now follow a single design defect — an error made in an early phase — through the reviews that might catch it.

::: proposition Expected cost of a defect with imperfect reviews {#prop-defect-cost}
A defect is introduced in phase 1. At the end of each of the phases $1, 2, \dots, N$ a review detects it, if still present, with probability $d$ independently of the other reviews. Correcting it after the review of phase $k$ costs $c_k = c_1 r^{k-1}$ with growth factor $r > 1$; a defect that escapes all $N$ reviews is found in service at cost $c_1 r^N$. With $q = r(1-d)$, the expected cost of the defect is
$$
\E[C] = c_1\left[d\sum_{k=1}^{N} q^{\,k-1} + q^{N}\right]
= c_1\left[d\,\frac{1 - q^N}{1 - q} + q^N\right]\quad (q \ne 1).
$$ {#eq-defect-cost}
:::

::: proof
The defect is first caught at review $k$ when reviews $1,\dots,k-1$ miss it and review $k$ catches it, probability $(1-d)^{k-1}d$; the cost is then $c_1r^{k-1}$, so this outcome contributes $c_1 d\,[r(1-d)]^{k-1} = c_1 d\,q^{k-1}$. It escapes all reviews with probability $(1-d)^N$ at cost $c_1 r^N$, contributing $c_1 q^N$. Adding the mutually exclusive outcomes gives the first form; summing the finite geometric series gives the second. Assumptions: one defect, constant detection probability, independence between reviews, and a geometric cost growth — all idealisations, but the structure of the result does not depend on the exact numbers.
:::

The single number $q = r(1-d)$ controls everything. If $q < 1$ — reviews catch defects faster than the cost of repair grows — the series converges and the expected cost stays within a small multiple of $c_1$. If $q > 1$, the expected cost is dominated by the last terms, the expensive late discoveries, and grows rapidly with the number of phases. For $r = 5$, reviews must catch more than 80 % of the defects present just to keep $q$ below 1. This is the quantitative reason for the design reviews, analyses and tests at the end of every phase of [[#alg-phases]], and for writing the verification plan with the requirement in the V-model.

::: example Value of better reviews {#ex-reviews}
A designer chooses a gear ratio that will make an actuator too slow. Correcting it during the concept review costs €500 of engineering time ($c_1$). Each later phase multiplies the cost of correction by $r = 5$. There are $N = 4$ phase-end reviews before production, and an escaped defect is found in service. Compute the expected cost when the reviews catch a defect with probability $d = 0.5$ and with $d = 0.8$.

::: solution
For $d = 0.5$: $q = 5\times0.5 = 2.5$. The terms of [[#eq-defect-cost]] are
$$
d\,q^{k-1} = 0.5,\ 1.25,\ 3.125,\ 7.8125 \quad (k = 1,\dots,4), \qquad q^4 = 39.0625,
$$
summing to $51.75$. The expected cost is $51.75\times500 = $ €25 875; three-quarters of it comes from the 6.25 % chance ($0.5^4$) that the defect reaches service.

For $d = 0.8$: $q = 5\times0.2 = 1$, so every term $d\,q^{k-1} = 0.8$ and $q^4 = 1$: the bracket is $4\times0.8 + 1 = 4.2$ and the expected cost is $4.2\times500 = $ €2 100.

Raising review effectiveness from 50 % to 80 % cuts the expected cost of this one defect by a factor of about 12. A real design contains hundreds of potential defects, so the difference is between a project that is routinely late and over budget and one that is not. *Sanity check:* with perfect reviews ($d = 1$) the formula gives $c_1$; with no reviews ($d = 0$) it gives $c_1 r^N = 625\times500 = $ €312 500, the in-service cost. Both values bracket the results.
:::
:::

::: widget plot
title: Expected cost of one design defect against review effectiveness
f: log10(x + r*x*(1 - x) + r^2*x*(1 - x)^2 + r^3*x*(1 - x)^3 + r^4*(1 - x)^4); log10(r^4)
x: 0, 1
y: 0, 4
sliders: r=5:2:10:0.5
labels: \log_{10}(\E[C]/c_1); \log_{10}(r^4)\ \text{(no reviews)}
caption: Logarithm of the expected cost of a defect, in units of its concept-stage cost, against the detection probability $d$ of each of four reviews ([[#eq-defect-cost]]); the horizontal line is the cost if the defect always escapes to service ($d = 0$). Each step of 1 on the vertical axis is a factor of 10. With $r = 5$, raising $d$ from 0.5 to 0.8 lowers the curve by about 1.1, a factor of 12 ([[#ex-reviews]]). Increase $r$ and the whole curve rises and steepens: the faster correction costs grow, the more each point of review effectiveness is worth. Only near $d = 1$ do the curves for all $r$ meet at $\E[C] = c_1$.
:::

::: warning Folklore numbers about design cost
Two figures are repeated in many textbooks and slide decks: that a change costs ten times more in each successive phase, and that design "determines" 70–80 % of a product's manufacturing or life-cycle cost while consuming only a few per cent of it. Treat both as rules of thumb, not data. Karl Ulrich and Scott Pearson traced the 70 % claim in the early 1990s and found that it went back to an informal internal survey at Ford rather than a published measurement; their own study of coffee makers found that design choices did account for a large share of the variation in manufacturing cost, but the exact proportion depends on how "determines" is defined. Use the qualitative lesson — early decisions constrain later costs, and late changes are expensive — and when you need numbers, estimate them for your own product.
:::

## Life-cycle cost {#sec-lcc}

A designer who minimises the purchase price of a machine may maximise the cost of owning it. Pumps, fans, compressors and motors are the classic examples: over a working life of fifteen or twenty years, the electricity they consume often costs many times their price. Comparing designs fairly requires adding all costs over the life, and because money spent later is worth less than money spent now, discounting them to a common date.

::: definition Life-cycle cost and present value {#def-lcc}
The **life-cycle cost** (LCC) of a product to its owner is the sum of the acquisition cost (price, installation, commissioning), the operating costs (energy, consumables, labour), the maintenance and repair costs, the cost of downtime, and the end-of-life cost (decommissioning, disposal, minus any resale or scrap value). A cash flow $C_t$ occurring $t$ years from now has **present value** $C_t/(1+i)^t$, where $i$ is the annual discount rate, and the LCC is the sum of the present values of all cash flows.
:::

::: proposition Present value of a uniform annual cost {#prop-annuity}
A cost $A$ incurred at the end of each year for $n$ years, discounted at rate $i > 0$, has present value
$$
PV = A\,\frac{1 - (1+i)^{-n}}{i} = A\cdot P(i, n),
$$ {#eq-annuity}
where $P(i,n)$ is the **present-worth factor**. As $i\to0$, $P\to n$.
:::

::: proof
$PV = \sum_{t=1}^{n}A(1+i)^{-t}$ is a finite geometric series with first term $A v$ and ratio $v = (1+i)^{-1}$:
$$
PV = Av\,\frac{1 - v^n}{1 - v} = A\,\frac{(1+i)^{-1}\,[1-(1+i)^{-n}]}{i/(1+i)} = A\,\frac{1 - (1+i)^{-n}}{i}.
$$
For small $i$, $(1+i)^{-n} \approx 1 - ni$, so $P \approx ni/i = n$: without discounting the present value is simply $nA$. The assumptions are a constant cost, a constant discount rate and end-of-year payments; prices that rise at a steady rate $g$ can be handled by replacing $i$ with $(i-g)/(1+g)$.
:::

::: example Life-cycle cost of two pumps {#ex-lcc-pump}
A cooling-water system needs $22\,\mathrm{kW}$ of hydraulic power for $5000\,\mathrm{h}$ a year over a $15$-year life. Pump set A costs €8 000 and has a wire-to-water efficiency (pump times motor) of $0.70$; pump set B costs €11 000 and has an efficiency of $0.78$. Electricity costs €0.18 per kWh, maintenance is €600 a year for either, and the owner discounts at $6\,\%$ a year. Compare the life-cycle costs, ignoring end-of-life value.

::: solution
Present-worth factor: $P(0.06, 15) = (1 - 1.06^{-15})/0.06 = 9.712$.

Pump A: electrical input $22/0.70 = 31.43\,\mathrm{kW}$; annual energy $31.43\times5000 = 157\,143\,\mathrm{kWh}$; annual energy cost $157\,143\times0.18 = $ €28 286. LCC $= 8000 + (28\,286 + 600)\times9.712 = $ €288 545.

Pump B: input $22/0.78 = 28.21\,\mathrm{kW}$; annual energy $141\,026\,\mathrm{kWh}$; annual cost €25 385. LCC $= 11\,000 + (25\,385 + 600)\times9.712 = $ €263 369.

Pump B saves €2 901 a year in electricity, repays its €3 000 premium in about $1.03$ years, and has a life-cycle cost about €25 200 lower. The purchase price is under 4 % of either LCC; energy is about 95 %.

*Sanity check:* undiscounted, pump A's energy over 15 years would be $15\times$€28 286 ≈ €424 000; discounting at 6 % reduces this by a factor $9.71/15 = 0.65$, consistent with the result. A buyer comparing only purchase prices would choose the pump that costs €25 000 more to own.
:::
:::

::: widget plot
title: Cumulative life-cycle cost of the two pumps
f: 8 + (157.143*c + 0.6)*(1 - (1 + i)^(-x))/i; 11 + (141.026*c + 0.6)*(1 - (1 + i)^(-x))/i
x: 0, 20
y: 0, 400
sliders: c=0.18:0.05:0.4:0.01; i=0.06:0.01:0.15:0.005
labels: \text{pump A (k€)}; \text{pump B (k€)}
caption: Present value of the cumulative cost (thousands of euros) of the two pump sets of [[#ex-lcc-pump]] against years of operation, for an electricity price $c$ in €/kWh and discount rate $i$. The curves start at the purchase prices and cross after about 1.1 years. Lower the electricity price to €0.05/kWh and the crossover moves to about 4.3 years; raise the discount rate as well and both curves flatten, because distant energy bills count for less — yet even at €0.05/kWh and 15 % the efficient pump repays its premium in under six years of a fifteen-year life.
:::

The life-cycle view changes design decisions well beyond pumps. It justifies spending on corrosion protection that avoids repainting, on access panels that halve service time, on standard parts that can be bought for decades, and on efficiency improvements whose payback is short compared with the product's life. It also shows whose cost the designer is minimising: the manufacturer pays the production cost, but the user pays the energy and maintenance and society pays for emissions and disposal. Standards and regulations such as the EU energy-efficiency requirements for motors exist partly because the buyer and the user are often different people. [[design-process/sustainability]] extends the same accounting from money to energy and emissions.

## Stage-gates as investment decisions {#sec-gates}

A gate review decides whether the information gained in a stage justifies the much larger spending of the next one. Development stages usually get more expensive as a project proceeds — a concept study costs less than a set of prototypes, which costs less than production tooling — while the uncertainty about the product's success falls. Gates exploit this: they let the company buy information cheaply before committing heavily.

::: example Value of gating a project {#ex-gates}
A company is considering a new actuator. Stage 1 (concept and feasibility) costs €0.1 M and succeeds with probability $0.5$; stage 2 (design and prototypes) costs €0.5 M and succeeds with probability $0.6$; stage 3 (tooling, certification and launch) costs €2.0 M and the product then succeeds in the market with probability $0.8$, earning a present value of €10 M. Compare the expected net value (a) if the company commits all three stages at the start and (b) if it stops at the first failed stage.

::: solution
(a) Without gates all costs are spent regardless: $-(0.1 + 0.5 + 2.0) + 0.5\times0.6\times0.8\times10 = -2.6 + 2.4 = -$€0.2 M. The project would be rejected.

(b) With gates, work backwards. If stage 3 is reached: $-2.0 + 0.8\times10 = 6.0$. Stage 2 entered: $-0.5 + 0.6\times6.0 = 3.1$. Stage 1: $-0.1 + 0.5\times3.1 = 1.45$. The expected net value is €1.45 M. The expected spending is $0.1 + 0.5\times0.5 + 0.5\times0.6\times2.0 = $ €0.95 M instead of €2.6 M.

The overall success probability is $0.24$ in both cases; what changes is that the expensive stages are only paid for when the cheap ones have succeeded. *Sanity check:* if every stage succeeded with certainty the two plans would have the same value, $-2.6 + 10 = $ €7.4 M; gating is valuable only because of uncertainty.
:::
:::

Real gate decisions are not this tidy — the probabilities are judgements, projects are rarely killed as readily as the model suggests, and good gates also redirect a project rather than only stopping it. But the example explains two practical rules. First, put cheap, high-information work (feasibility calculations, rig tests of the riskiest feature, conversations with users) before expensive, low-information work (tooling, certification). Second, define the gate criteria before the stage starts, so that the review compares the results against an agreed bar and not against the sunk cost.

## The engineer's work across the life cycle {#sec-life-cycle}

The phases of [[#alg-phases]] end with released documentation, but the designer's responsibility does not. The product life cycle continues through production (where the designer supports process planning, resolves deviations and approves changes), use and maintenance (where field failures and complaints feed back into the next design), and end of life (disassembly, reuse, recycling or disposal). Several practices connect the design office to these later stages.

- **Design reviews** at the end of each phase bring in people who did not do the design: manufacturing, quality, service, purchasing, safety, and sometimes users. Their value lies in the independent view — the $d$ of [[#prop-defect-cost]].
- **Configuration management** records exactly which version of every drawing, model and software item defines each built product, and controls changes through engineering change requests and notices. Without it a field failure cannot be traced to a design version.
- **The design record** — calculations, test reports, assumptions, decisions and the reasons for them — lets the next engineer understand why the product is as it is. It is also the evidence of due diligence if the product is involved in an accident; see [[design-process/ethics-standards]].
- **Concurrent engineering** (or integrated product development) runs the design of the product and of its manufacturing process in parallel, with cross-functional teams, so that production knowledge enters while the design is still cheap to change. [[design-process/design-for-manufacture]] gives the methods.

::: quiz
A requirement states that "the trolley shall carry a 150 kg load over a 20 mm kerb without tipping". The prototype passes this test, but in hospital trials nurses find the trolley too hard to push over carpet. What has happened?
- [ ] verification failed and validation passed
- [x] verification passed and validation failed
- [ ] both verification and validation failed
- [ ] the trial was a verification activity, so nothing can be concluded about validation
::: solution
The test showed that the product meets its written requirement (verification passed). The trial showed that it does not meet the users' needs in the real environment (validation failed): a need — low pushing force on carpet — was never captured as a requirement. The fix starts at the top of the V: add a requirement with a measurable target (for example a maximum initial pushing force on a specified carpet) and a verification method.
:::
:::

::: history
The study of design methods as a discipline is often dated to the Conference on Design Methods held at Imperial College London in September 1962, whose proceedings were edited by J. Christopher Jones and D. G. Thornley (1963). In 1969 Herbert Simon's *The Sciences of the Artificial* argued that design could be studied as rigorously as natural science, and in 1973 he described the "ill-structured" problems that design presents. In Germany the systematic approach was codified in Pahl and Beitz's *Konstruktionslehre* (1977), translated into English in 1984 under Ken Wallace's editorship, and in the guideline VDI 2221 (1986). Winston Royce's 1970 paper on large software projects, Barry Boehm's spiral model (1988), Robert Cooper's stage-gate process (1990) and Forsberg and Mooz's V-model (1991) brought iteration, risk and verification into the management of product development.
:::

::: summary
- Design is the inverse of analysis: from desired behaviour to an artefact, with many acceptable answers. A design problem has design variables, constraints and objectives; requirements state them measurably.
- Prescriptive process models (Pahl & Beitz, VDI 2221) fix an order of commitment — clarify the task, conceptual design, embodiment, detail — with checks against the specification and iteration at every level.
- The V-model pairs each level of decomposition with verification at the same level; verification asks "built right?", validation "right product?".
- Stage-gate processes buy information cheaply before committing to expensive stages; with stage costs rising and success uncertain, gating raises the expected value.
- With review detection probability $d$ and cost growth $r$ per phase, the expected cost of a defect is governed by $q = r(1-d)$; reviews must catch more than $1 - 1/r$ of defects to stop late discoveries dominating.
- Expected build–test cycles are $1/p$; plan for iteration rather than hoping to avoid it.
- Life-cycle cost discounts all costs to present value, $PV = A[1-(1+i)^{-n}]/i$ for a uniform annual cost; for energy-using equipment the running cost usually dwarfs the price.
:::

## Exercises

::: exercise Number of prototype builds {#exr-builds level=1 check="4"}
A new seal design passes its pressure-cycling test with probability $0.25$ per build, independently. How many builds are expected up to and including the first pass? (Enter the expected number of builds.)
::: solution
By [[#eq-geometric]], $\E[K] = 1/p = 1/0.25 = 4$ builds. The probability of needing more than 4 is $0.75^4 = 0.32$ — high enough that the team should rather find out why the pass probability is so low before building at all.
:::
:::

::: exercise Present-worth factor {#exr-pwf level=1 check="7.7217"}
Compute the present-worth factor $P(i, n)$ for a discount rate of $5\,\%$ and a life of $10$ years. (Enter $P$ rounded to four decimal places.)
::: solution
$P = (1 - 1.05^{-10})/0.05 = (1 - 0.613913)/0.05 = 7.7217$. Ten annual payments of €1 are worth about €7.72 today; undiscounted they would be €10.
:::
:::

::: exercise Annual energy cost of a pump {#exr-energy level=1 check="28285.71"}
A pump delivers $22\,\mathrm{kW}$ of hydraulic power at a wire-to-water efficiency of $0.70$ for $5000\,\mathrm h$ a year, with electricity at €0.18 per kWh. What is the annual electricity cost? (Enter the cost in euros, rounded to two decimal places.)
::: solution
Electrical input $22/0.70 = 31.4286\,\mathrm{kW}$; energy $31.4286\times5000 = 157\,142.86\,\mathrm{kWh}$; cost $157\,142.86\times0.18 = $ €28 285.71. This is more than three times the price of the pump in [[#ex-lcc-pump]], every year.
:::
:::

::: exercise Motor efficiency upgrade {#exr-motor level=2 check="1.11"}
A conveyor motor delivers $15\,\mathrm{kW}$ of shaft power for $4000\,\mathrm h$ a year. A motor with efficiency $0.925$ costs €400 more than one with efficiency $0.90$. With electricity at €0.20 per kWh, find the annual saving and the simple payback time of the better motor. (Enter the payback time in years.)
::: solution
Input powers: $15/0.90 = 16.667\,\mathrm{kW}$ and $15/0.925 = 16.216\,\mathrm{kW}$, a difference of $0.4505\,\mathrm{kW}$. Annual energy saved $0.4505\times4000 = 1801.8\,\mathrm{kWh}$, worth €360.36. Payback $400/360.36 = 1.11$ years. Since motors of this size typically run for well over ten years, the upgrade is clearly worthwhile; with discounting at 6 % over 10 years its present value is $360.36\times7.36 \approx$ €2 650.
:::
:::

::: exercise A two-review defect model {#exr-two-reviews level=2 check="28"}
A defect costs $c_1$ to fix at the first review, and the cost grows by $r = 10$ per phase. There are $N = 2$ reviews, each catching the defect with probability $d = 0.5$; an escaped defect is found in service. Find $\E[C]/c_1$. (Enter the ratio.)
::: solution
$q = 10\times0.5 = 5$. From [[#eq-defect-cost]]: $\E[C]/c_1 = d(1 + q) + q^2 = 0.5\times6 + 25 = 28$. The terms are $0.5$ (caught at review 1), $2.5$ (caught at review 2) and $25$ (escapes, probability $0.25$, cost $100c_1$). The escape term dominates because $q > 1$.
:::
:::

::: exercise Break-even running hours {#exr-breakeven level=2 check="532"}
For the two pumps of [[#ex-lcc-pump]], with all other data unchanged, how many operating hours per year make the two life-cycle costs equal? (Enter the hours per year, rounded to the nearest hour.)
::: solution
The extra price of B, €3 000, must equal the present value of its energy saving: $3000 = (22/0.70 - 22/0.78)\,H\times0.18\times9.712$. The power difference is $31.429 - 28.205 = 3.2234\,\mathrm{kW}$, so $3000 = 3.2234\times0.18\times9.712\,H = 5.635\,H$ and $H = 532\,\mathrm{h}$ a year. Any duty above about 10 hours a week favours the efficient pump; a fire pump tested once a month would not justify it.
:::
:::

::: exercise Expected spending with gates {#exr-gate-spend level=2 check="1.4"}
A project has three stages costing €0.2 M, €1.0 M and €4.0 M. Stage 1 succeeds with probability $0.4$, stage 2 with probability $0.5$; the project is stopped at the first failure. What is the expected total spending? (Enter it in millions of euros.)
::: solution
Stage 1 is always paid; stage 2 is paid with probability $0.4$; stage 3 with probability $0.4\times0.5 = 0.2$. Expected spending $= 0.2 + 0.4\times1.0 + 0.2\times4.0 = $ €1.4 M, against €5.2 M if all stages were committed at the start.
:::
:::

::: exercise Properties of the defect-cost model {#exr-derive-defect level=3}
Starting from [[#eq-defect-cost]], (a) show that $\E[C] = c_1$ when $d = 1$ and $\E[C] = c_1 r^N$ when $d = 0$; (b) show that for $q < 1$ the expected cost stays below $c_1\,d/(1-q) + c_1$ however many phases there are, while for $q > 1$ it grows without bound as $N$ increases; (c) suppose each review costs $c_R$ to hold. Explain qualitatively why adding a review to a phase where $r$ is large is worth more than adding one where $r$ is small.
::: solution
(a) With $d = 1$, $q = 0$: only the $k = 1$ term survives, $d\,q^0 = 1$, and $q^N = 0$, so $\E[C] = c_1$. With $d = 0$, $q = r$ and the sum vanishes, leaving $c_1 r^N$.

(b) For $0 \le q < 1$, $\sum_{k=1}^{N}q^{k-1} < 1/(1-q)$ and $q^N < 1$, so $\E[C] < c_1[d/(1-q) + 1]$ for every $N$. For $q > 1$, $\E[C] \ge c_1 q^N \to \infty$ as $N\to\infty$ (and the sum also grows).

(c) A review in phase $k$ converts a fraction $d$ of the defects present there from being fixed later, at an expected cost that grows like $r$ per phase, into being fixed now. The saving per defect caught is roughly proportional to the cost ratio between now and later, so it is large where $r$ is large — for example just before tooling is ordered or software is frozen — and small where later changes are cheap. Reviews should be concentrated before the irreversible commitments, which is exactly where stage-gate processes put their gates.
:::
:::

::: exercise Planning a design process {#exr-plan level=3}
A small company that makes agricultural equipment wants to develop a battery-powered barrow for carrying $150\,\mathrm{kg}$ loads on rough ground. It has four engineers, no experience with batteries or motor controllers, and wants a product on sale in 18 months at a production rate of about 2 000 units a year. Propose an outline design process: the phases and gates, the main deliverable at each gate, where prototypes are built and what each one should test, and how you would reduce the risks you consider largest. Justify your choices with the ideas of this chapter.
::: solution
One reasonable answer (many are possible):

*Task clarification (about 2 months).* Visit users on farms and building sites; write a specification with measurable targets — payload, gradient, range per charge, mass, turning circle, price — and a verification method for each. Identify applicable regulations (machinery and battery safety, electromagnetic compatibility). Gate 1: agreed specification and business case.

*Concept (about 3 months).* Generate drive concepts (hub motor, single motor with chain, two-wheel versus tracked), battery options (bought-in power-tool packs versus a custom pack) and frame concepts. The largest risks are the unfamiliar electrical system and range on rough ground. Reduce them cheaply: buy a commercial hub motor and battery and build a crude test rig ("proof-of-principle prototype") to measure energy per kilometre on real ground. Gate 2: chosen concept with measured energy data.

*Embodiment (about 5 months).* Layout, frame sizing, motor and battery selection, interfaces, first full "alpha" prototypes (two or three) for function, endurance and abuse testing; design reviews with the factory's production staff. Buying the battery and controller from a specialist supplier transfers much of the electrical risk. Gate 3: design passes alpha tests; tooling decision.

*Detail and industrialisation (about 6 months).* Drawings, tolerances, supplier quotes, tooling, "beta" prototypes made with production processes for certification testing and field trials with real users (validation). Gate 4: certification and field-trial results; launch.

The plan budgets for at least two iterations of the alpha prototype ($1/p$ thinking), places the cheapest high-information tests first, concentrates reviews before tooling (largest $r$), and keeps two months of contingency in 18.
:::
:::

## Further reading

Pahl, Beitz, Feldhusen and Grote's *Engineering Design: A Systematic Approach* (3rd English edition, 2007) is the standard account of the systematic process and its phases. Ulrich, Eppinger and Yang's *Product Design and Development* (7th edition, 2020) describes development processes, stage-gates and the economics of product development from industrial practice. Nigel Cross's *Engineering Design Methods* (5th edition, 2021) is a short, readable survey of descriptive and prescriptive models and the main methods. Dieter and Schmidt's *Engineering Design* (6th edition, 2021) covers the process together with cost evaluation and life-cycle thinking. For the origin and limits of the "design determines 70 % of cost" figure see Ulrich and Pearson's MIT working paper *Does product design really determine 80 % of manufacturing cost?* (1993) and Barton, Love and Taylor's review in the *Journal of Engineering Design* (2001).
