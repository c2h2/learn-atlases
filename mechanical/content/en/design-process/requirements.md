A requirement is a promise to the customer, and a specification is the set of promises that, taken together, define the product. The difference between a product that succeeds and a product that fails is almost never a calculation error — it is a requirement that was wrong, missing, or ambiguous. **The bridge that collapses was not miscalculated; it was designed to the wrong load case. The pump that vibrates itself to destruction was not mis-engineered; it was specified without a frequency constraint. The software that crashes was not badly coded; it was specified without a failure-mode requirement.** The cost of a wrong requirement is not the cost of fixing the requirement — it is the cost of the product that was built to the wrong requirement, which is the cost of the product plus the cost of the recall, plus the cost of the redesign, plus the cost of the reputation.

The discipline of requirements engineering is the discipline of writing down, unambiguously, measurably, and verifiably, what the product must do, what it must not do, what it must withstand, and what it must cost. The tools are simple: a verb-noun pair for every function, a number with a unit and a tolerance for every performance target, a test method for every requirement, and a traceability matrix that links every requirement to a test and every test to a requirement. The difficulty is not the tools; the difficulty is the conversations that the tools force: the conversation with the customer who says "it should be fast" and must be made to say "it must accelerate from 0 to 100 km/h in 6.2 seconds at sea level, 25 °C, with a 75 kg driver"; the conversation with the marketing team who says "it should be cheap" and must be made to say "the bill of materials must not exceed $47 at a volume of 50 000 units per year"; the conversation with the regulatory affairs team who says "it must be safe" and must be made to say "it must comply with ISO 12100, EN ISO 13849-1 Performance Level d, and the Machinery Directive 2006/42/EC Annex I."

::: warning Nine ways requirements go wrong
**Writing the solution instead of the need.** "The housing shall be made of aluminium" is not a requirement; it is a design decision masquerading as one. The requirement is "the housing shall dissipate 50 W at 40 °C ambient without exceeding 85 °C." The aluminium is one solution; a steel housing with a heat sink, a plastic housing with a fan, and a finned extrusion are three others. **Write every requirement as a function (verb-noun) with a measurable target, and never name a material, a process, or a component in a requirement.** **Writing a requirement that cannot be tested.** "The product shall be user-friendly" is not a requirement; it is a wish. The testable version is "a first-time user shall complete the setup procedure in under 3 minutes with no more than 2 errors, measured on a sample of 20 users." **If you cannot write the test procedure, you have not written a requirement.** **Not distinguishing needs from requirements from specifications.** The **need** is the customer's problem ("I need to move 500 kg of grain per hour from the truck to the silo"). The **requirement** is a measurable target derived from the need ("the system shall transfer 500 ± 50 kg/h of wheat (bulk density 770 kg/m³) over a horizontal distance of 30 m and a vertical rise of 8 m"). The **specification** is the complete set of requirements, constraints, and interfaces that define the product. **Confusing the three is the most common cause of scope creep: the customer changes the need, the engineer changes the requirement, and the specification is never updated.** **Not prioritising.** A product with 200 requirements and no priorities is a product with 200 must-haves, which is a product that cannot be built. **Classify every requirement as mandatory (the product fails without it), important (the product is degraded without it), or desirable (the product is better with it), and enforce the classification at every trade-off.** **Not tracing.** A requirement that is not linked to a test is a requirement that will not be verified. A test that is not linked to a requirement is a test that will be forgotten. **The traceability matrix is the spine of the V-model, and it is the first document the auditor asks for.** **Ignoring the interface requirements.** The product does not exist in isolation: it connects to a power supply, a data bus, a mechanical frame, a human operator, and a regulatory environment. **Every interface is a requirement, and every interface requirement must be bilateral: "the product shall accept 24 V DC ± 10 % from the customer's supply" is a requirement on the product; "the customer's supply shall provide 24 V DC ± 10 % with < 1 % ripple" is a requirement on the interface. Both must be written, and both must be tested.** **Not writing the negative requirements.** "The product shall not start when the guard is open" is a safety requirement. "The product shall not leak more than 0.1 ml/h of hydraulic fluid at 200 bar and 80 °C" is an environmental requirement. **The negative requirements (the "shall not" statements) are the ones that prevent the lawsuit, and they are the ones that are most often forgotten.** **Not freezing the requirements.** A requirement that changes after the design is frozen is a change order, and a change order costs 10–100× the cost of the change at the requirement stage. **The requirements are frozen at Gate 1, and any change after that goes through a change-control board that assesses the cost, the schedule impact, and the risk.** **Not validating the requirements with the customer.** The requirements are written by the engineer, but they describe the customer's need. **The validation step is: show the requirements to the customer, ask them to imagine the product that meets every requirement, and ask "is this the product you want?" If the answer is "well, almost," the requirements are wrong, and it is cheaper to fix them now than to build the wrong product.**
:::

## 1. From need to requirement to specification

::: definition Needs, requirements, and specifications {#def-needs-reqs-specs}
The three levels of abstraction in the front end of the design process are:

$$
\begin{array} { l l l l }
\textbf{Level} & \textbf{Who writes it} & \textbf{Language} & \textbf{Example} \\ \hline
\text{Customer need} & \text{Customer} & \text{Natural language, vague} & \text{"I need to move grain from the truck to the silo"} \\
\text{Requirement} & \text{Engineer} & \text{Verb-noun + measurable target} & \text{"Transfer 500 ± 50 kg/h over 30 m horizontal, 8 m vertical"} \\
\text{Specification} & \text{Engineer} & \text{Complete set of requirements} & \text{The 200-page document that defines the product} \\
\end{array}
$$

A well-written requirement has five properties (the **SMART** criteria, adapted for engineering):

- **Specific**: unambiguous, with no undefined terms. "The motor shall be powerful" is not specific. "The motor shall deliver 15 N·m continuous torque at 1 500 rpm" is.
- **Measurable**: quantified with a number, a unit, and a tolerance. "The pump shall be quiet" is not measurable. "The pump shall produce < 65 dB(A) at 1 m, measured per ISO 3744" is.
- **Achievable**: physically possible within the constraints. "The bracket shall weigh 10 g and support 10 kN" is not achievable with any known material.
- **Relevant**: traceable to a customer need. A requirement that does not trace to a need is gold-plating.
- **Testable**: a verification method exists. "The coating shall be durable" is not testable. "The coating shall survive 500 hours of salt-spray per ISO 9227 with < 5 % scribe creep" is.

**The verb-noun convention is the single most powerful tool in requirements engineering.** Every requirement is written as "the [system] shall [verb] [noun] [under conditions] [to a target]." The verb is a function (transfer, support, convert, maintain, limit, detect, stop). The noun is the object of the function (torque, load, heat, temperature, pressure, vibration). The conditions are the environment (temperature, humidity, vibration, altitude). The target is the number with a unit and a tolerance. **If you cannot write the requirement in this form, you do not understand it.**
:::

::: definition Requirement classification and prioritisation {#def-req-classification}
Requirements are classified by type and by priority:

**By type:**

$$
\begin{array} { l l l }
\textbf{Type} & \textbf{Description} & \textbf{Example} \\ \hline
\text{Functional} & \text{What the product does} & \text{"Lift 500 kg to 3 m in 10 s"} \\
\text{Performance} & \text{How well it does it} & \text{"Positioning accuracy ± 0.1 mm"} \\
\text{Constraint} & \text{Limits on the design} & \text{"Mass < 50 kg, cost < £2 000"} \\
\text{Interface} & \text{How it connects to the world} & \text{"Accept 24 V DC ± 10 \%, M12 connector"} \\
\text{Environmental} & \text{What it must withstand} & \text{"Operate at -20 to +50 °C, IP65"} \\
\text{Safety} & \text{What it must not do} & \text{"Stop within 0.5 s when the E-stop is pressed"} \\
\text{Regulatory} & \text{What standards it must meet} & \text{"Comply with CE, UL, ATEX Zone 2"} \\
\text{Reliability} & \text{How long it must last} & \text{"MTBF > 10 000 h, B10 life > 20 000 h"} \\
\end{array}
$$

**By priority (the MoSCoW method, adapted):**

- **Must have (M)**: the product is non-functional without it. Non-negotiable. Violation is a show-stopper.
- **Should have (S)**: the product is degraded without it. Important but not critical. Can be traded against cost or schedule with management approval.
- **Could have (C)**: the product is better with it. Desirable. First candidate for de-scope.
- **Won't have (W)**: explicitly excluded. **The "won't have" category is the most important and the most often omitted, because it prevents the scope creep that kills projects.**

**The priority is not a suggestion; it is a decision rule. When the design trade-off arises (and it always does), the priority tells you which requirement to relax. If all requirements are "must have," the trade-off is unresolvable, and the engineer is forced to make a decision that should have been made by the customer.**
:::

::: definition Quality Function Deployment (QFD) and the House of Quality {#def-qfd}
**Quality Function Deployment** (QFD, Akao, 1966) is a structured method for translating customer needs (the "voice of the customer") into engineering requirements (the "voice of the engineer"). The tool is the **House of Quality** (HoQ), a matrix that relates customer attributes (rows) to engineering characteristics (columns):

$$
\begin{array} { l c c c c }
& \text{EC}_1 \text{ (torque)} & \text{EC}_2 \text{ (mass)} & \text{EC}_3 \text{ (cost)} & \text{EC}_4 \text{ (noise)} \\ \hline
\text{CA}_1 \text{ ("powerful")} & \boldsymbol{9} & 3 & 1 & 1 \\
\text{CA}_2 \text{ ("light")} & 3 & \boldsymbol{9} & \boldsymbol{9} & 1 \\
\text{CA}_3 \text{ ("cheap")} & 1 & 1 & \boldsymbol{9} & 3 \\
\text{CA}_4 \text{ ("quiet")} & 1 & 3 & 1 & \boldsymbol{9} \\
\end{array}
$$

The relationship strengths are: 9 = strong, 3 = medium, 1 = weak, 0 = none. The **importance weighting** (from the customer) multiplies the rows, and the **technical correlation matrix** (the "roof" of the house) captures the interactions between engineering characteristics (e.g., increasing torque increases mass and noise).

**The value of QFD is not the matrix; it is the conversations it forces.** The matrix makes the trade-offs explicit: "the customer wants powerful and light and cheap and quiet, and the roof says that powerful and light are negatively correlated, and powerful and cheap are negatively correlated, and the customer has to choose." **The QFD is the tool that turns "I want everything" into "I want these three things, and I accept that I cannot have the fourth."**
:::

::: example Writing a requirement from a need {#ex-write-req level=3 check="3"}
A customer says: "I need a pump that can handle thick oil." Write three testable requirements from this need.

**Requirement 1 (functional):** The pump shall deliver ≥ 20 L/min of SAE 15W-40 engine oil (viscosity 110 mPa·s at 40 °C) against a 5 bar back-pressure, at an ambient temperature of 20 ± 5 °C.

**Requirement 2 (constraint):** The pump motor shall not draw more than 1.5 kW at the rated flow and pressure.

**Requirement 3 (environmental):** The pump shall operate continuously at an ambient temperature of −10 to +50 °C and a relative humidity of 10–95 % (non-condensing).

**Each requirement has a verb (deliver, draw, operate), a noun (flow, power, temperature), a number with a unit, a tolerance, and a test condition. Each is testable: the first is verified by a flow-versus-pressure curve at the specified viscosity; the second by a wattmeter; the third by a thermal chamber run. The original need ("handle thick oil") is not testable, not specific, and not measurable. The three requirements are.**
:::

::: widget plot
title: The requirement funnel: from 200 needs to 50 requirements
f: 200/(x+1); 100/(x+1); 50/(x+1)
x: 0,10
y: 0,200
labels: raw customer statements; after clustering; after testability filter
caption: Number of requirement statements against project week, showing the three filters. **The first filter (clustering) merges duplicate and overlapping statements: 200 raw statements become 100 unique requirements. The second filter (testability) eliminates statements that cannot be verified: 100 become 50. The third filter (priority) classifies the 50 into 15 must-haves, 20 should-haves, 10 could-haves, and 5 won't-haves.** **The 15 must-haves are the specification; the 20 should-haves are the design targets; the 10 could-haves are the wish list; the 5 won't-haves are the scope boundary. The engineer who does not write the won't-haves will spend the project's second half defending against scope creep.**
:::

## 2. Specification structure and the V-model traceability

::: definition The product specification document {#def-spec-doc}
A product specification (also called a **requirements specification**, **system requirements document**, or **customer requirements document**) is the contract between the customer and the design team. Its structure follows the V-model:

$$
\begin{array} { l l l }
\textbf{Section} & \textbf{Content} & \textbf{Verification method} \\ \hline
\text{1. Purpose and scope} & \text{What the product is and is not} & \text{Review} \\
\text{2. Operating environment} & \text{Temperature, humidity, vibration, altitude, EMC} & \text{Environmental test} \\
\text{3. Functional requirements} & \text{Verb-noun pairs with targets} & \text{Functional test} \\
\text{4. Performance requirements} & \text{Accuracy, speed, efficiency, noise} & \text{Performance test} \\
\text{5. Interface requirements} & \text{Mechanical, electrical, data, fluid} & \text{Interface test} \\
\text{6. Constraints} & \text{Mass, volume, cost, material, process} & \text{Inspection, audit} \\
\text{7. Safety and regulatory} & \text{Standards, directives, hazard analysis} & \text{Compliance test, audit} \\
\text{8. Reliability and maintainability} & \text{MTBF, B10, MTTR, spares} & \text{Life test, field data} \\
\text{9. Verification and acceptance} & \text{Test plan, acceptance criteria} & \text{The test itself} \\
\text{10. Assumptions and dependencies} & \text{What the design takes for granted} & \text{Review} \\
\end{array}
$$

**Section 10 is the most important and the most often omitted.** Every design rests on assumptions: the supply voltage is 230 V ± 10 %, the ambient temperature is 20 °C, the operator is right-handed, the maintenance interval is 1 000 hours, the material is available from two suppliers. If the assumptions are not written down, they cannot be checked, and the check is the difference between engineering and hope. **The assumption that turns out to be wrong is the one that was not written down.**
:::

::: definition Traceability: the requirement-test matrix {#def-traceability}
The **traceability matrix** links every requirement to the test that verifies it, and every test to the requirement it verifies. The matrix is the backbone of the V-model:

$$
\begin{array} { l c c c c }
\text{Requirement} & \text{Test ID} & \text{Test method} & \text{Pass criterion} & \text{Status} \\ \hline
\text{R-001: Flow} \geq 20 \text{ L/min} & \text{T-001} & \text{Flow bench, 15W-40, 5 bar} & \geq 20 \text{ L/min} & \text{Pass} \\
\text{R-002: Power} \leq 1.5 \text{ kW} & \text{T-002} & \text{Wattmeter at rated flow} & \leq 1.5 \text{ kW} & \text{Pass} \\
\text{R-003: Temp range} & \text{T-003} & \text{Thermal chamber, -10 to +50 °C} & \text{No failure} & \text{Pending} \\
\end{array}
$$

**The matrix is complete when every requirement has at least one test and every test has at least one requirement. An orphan requirement (no test) is a requirement that will not be verified. An orphan test (no requirement) is a test that will be forgotten when the requirement changes.** The traceability matrix is the first document the auditor asks for, and the first document the project manager should check when the schedule slips: if the test is not scheduled, the requirement is not verified, and the product is not ready.
:::

::: definition Verification vs validation: the right product vs the right way {#def-verif-valid}
**Verification** asks "did we build the product right?" — does the product meet the specification? **Validation** asks "did we build the right product?" — does the product meet the customer's need? The distinction is critical, because a product can be perfectly verified (every requirement met, every test passed) and completely wrong (the customer did not want what the specification describes).

$$
\begin{array} { l l l }
& \textbf{Verification} & \textbf{Validation} \\ \hline
\text{Question} & \text{Did we build it right?} & \text{Did we build the right thing?} \\
\text{Against} & \text{The specification} & \text{The customer's need} \\
\text{Method} & \text{Test, inspection, analysis} & \text{Prototype, user trial, field trial} \\
\text{When} & \text{After design, during build} & \text{Before design, after prototype} \\
\text{Failure mode} & \text{The product does not meet the spec} & \text{The spec does not meet the need} \\
\end{array}
$$

**The most expensive failure in engineering is a product that passes every verification test and fails validation.** The Ford Edsel, the Segway, and Google Glass all passed their verification tests and failed their validation. **The validation step is: show the prototype to the customer, let them use it, and watch their face. If the face says "well, actually, what I meant was…," the specification is wrong, and it is cheaper to fix the specification now than to build the wrong product.**
:::

::: example Specification for a laboratory centrifuge {#ex-spec-centrifuge level=3 check="8"}
A laboratory centrifuge has the following functional requirements. How many are functional, how many are constraints, and how many are safety?

| ID | Requirement | Type |
|----|-------------|------|
| R-01 | Spin a 24 × 1.5 mL rotor to 13 000 rpm ± 50 rpm | Functional |
| R-02 | Achieve 17 000 × g RCF at 13 000 rpm | Performance |
| R-03 | Run for 30 min continuously at maximum speed without the motor exceeding 80 °C | Performance |
| R-04 | Mass < 12 kg | Constraint |
| R-05 | Noise < 54 dB(A) at 1 m | Constraint |
| R-06 | Detect imbalance > 0.5 g·mm and stop within 3 s | Safety |
| R-07 | Lid shall not open while the rotor is above 200 rpm | Safety |
| R-08 | Comply with IEC 61010-2-020 | Regulatory |

**Functional: 1 (R-01). Performance: 2 (R-02, R-03). Constraint: 2 (R-04, R-05). Safety: 2 (R-06, R-07). Regulatory: 1 (R-08). Total: 8 requirements.** **The safety requirements (R-06, R-07) are the ones that will be tested first, because they are the ones that will be audited first, and the ones that will be the subject of the lawsuit if they fail.**
:::

## 3. Quality Function Deployment in practice

::: definition The House of Quality: construction and interpretation {#def-hoq}
The House of Quality is constructed in six steps:

1. **List the customer attributes (CAs)** with importance weights (1–5, from customer interviews). The CAs are the "voice of the customer": "powerful," "light," "cheap," "quiet," "reliable," "easy to maintain."
2. **List the engineering characteristics (ECs)** that the design team controls: torque, mass, cost, noise, MTBF, number of parts. The ECs are the "voice of the engineer."
3. **Fill the relationship matrix**: for each CA-EC pair, assign 9 (strong), 3 (medium), 1 (weak), or 0 (none). The relationship is "does this EC affect this CA?"
4. **Fill the technical correlation matrix (the roof)**: for each EC-EC pair, assign + (positive correlation, they move together) or − (negative correlation, one improves as the other worsens). The roof identifies the trade-offs.
5. **Calculate the absolute importance** of each EC: $I _ { j } = \sum _ { i } w _ { i } \, r _ { i j }$ , where $w _ { i }$ is the CA importance weight and $r _ { i j }$ is the relationship strength.
6. **Set the target values** for each EC: the number the design must achieve. The targets are the specification.

**The absolute importance ranking tells the designer where to focus: the EC with the highest importance is the one that most affects the customer's satisfaction, and it is the one that should drive the design. If the EC with the highest importance is "cost" and the EC with the lowest importance is "noise," the designer knows that the customer will trade noise for cost, and the design review should focus on the cost drivers.**
:::

::: example QFD for an electric bicycle {#ex-qfd-bike level=3 check="135"}
An electric bicycle has three customer attributes and four engineering characteristics:

| | Torque (Nm) | Mass (kg) | Battery (Wh) | Cost (£) |
|---|---|---|---|---|
| "Powerful" (w=5) | 9 | 3 | 9 | 3 |
| "Light" (w=4) | 1 | 9 | 9 | 1 |
| "Affordable" (w=3) | 1 | 1 | 3 | 9 |

Calculate the absolute importance of each EC.

$$
I _ { \text{torque} } \; = \; 5 \times 9 + 4 \times 1 + 3 \times 1 \; = \; 4 5 + 4 + 3 \; = \; 5 2
$$

$$
I _ { \text{mass} } \; = \; 5 \times 3 + 4 \times 9 + 3 \times 1 \; = \; 1 5 + 3 6 + 3 \; = \; 5 4
$$

$$
I _ { \text{battery} } \; = \; 5 \times 9 + 4 \times 9 + 3 \times 3 \; = \; 4 5 + 3 6 + 9 \; = \; { \bf 9 0 }
$$

$$
I _ { \text{cost} } \; = \; 5 \times 3 + 4 \times 1 + 3 \times 9 \; = \; 1 5 + 4 + 2 7 \; = \; 4 6
$$

**The battery capacity has the highest importance (90), because it is strongly related to both "powerful" and "light" (a bigger battery gives more range, which is what "powerful" means to a cyclist, and a bigger battery is heavier, which conflicts with "light"). The roof of the house shows the conflict: battery capacity is positively correlated with torque (more battery = more sustained power) and negatively correlated with mass (more battery = more weight). The QFD tells the designer: the battery is the critical decision, and the trade-off is range versus weight.**
:::

::: widget plot
title: The QFD importance ranking: where to focus the design
f: 52*x; 54*x; 90*x; 46*x
x: 0,1
y: 0,100
labels: Torque (52); Mass (54); Battery (90); Cost (46)
caption: Absolute importance of each engineering characteristic from the QFD matrix, normalised to the maximum. **The battery capacity dominates (90), followed by mass (54), torque (52), and cost (46). The ranking tells the designer where the design effort should go: the battery selection is the most consequential decision, and the cost is the least consequential — the customer will pay more for a bigger battery and a lighter frame.** **The ranking is not a prescription; it is a prioritisation. The designer who optimises the cost and ignores the battery is optimising the wrong variable.**
:::

## 4. Requirement engineering tools and techniques

::: definition Stakeholder analysis and the context diagram {#def-stakeholders}
A **stakeholder** is anyone who affects or is affected by the product: the customer, the user, the manufacturer, the maintainer, the regulator, the recycler, the neighbour, the competitor. The **stakeholder analysis** identifies the stakeholders, their needs, their influence, and their attitude (supportive, neutral, hostile).

The **context diagram** (also called a **system context diagram** or **Level-0 DFD**) is a block diagram that shows the system as a single box and the external entities (stakeholders, other systems, the environment) as surrounding boxes, with the flows (material, energy, information) between them. The context diagram is the first model of the system, and it defines the system boundary: what is inside the system (the engineer's responsibility) and what is outside (the interface requirement).

**The context diagram is the tool that prevents the "missing interface" failure.** A pump designed without a context diagram might not account for the inlet pressure from the customer's supply, the back-pressure from the customer's piping, the electrical supply quality, the ambient temperature, the mounting footprint, or the maintenance access. The context diagram forces the engineer to enumerate the interfaces before the design starts, and the interface requirements are written before the functional requirements.
:::

::: definition Requirement elicitation techniques {#def-elicitation}
The requirements are not written; they are **elicited** — drawn out of the stakeholders by structured techniques:

$$
\begin{array} { l l l l }
\textbf{Technique} & \textbf{Best for} & \textbf{Cost} & \textbf{Bias} \\ \hline
\text{Interviews (1-on-1)} & \text{Expert users, regulators} & \text{High} & \text{Social desirability} \\
\text{Focus groups} & \text{Consumer products, new markets} & \text{Medium} & \text{Groupthink, dominant voice} \\
\text{Observation (ethnography)} & \text{Unarticulated needs, workarounds} & \text{High} & \text{Observer effect} \\
\text{Surveys} & \text{Quantifying preferences at scale} & \text{Low} & \text{Response bias, poor response rate} \\
\text{Lead-user analysis} & \text{Innovative products, extreme users} & \text{Medium} & \text{Not representative} \\
\text{Benchmarking} & \text{Competitive products, best-in-class} & \text{Low} & \text{Incremental, misses discontinuities} \\
\text{TRIZ contradiction analysis} & \text{Resolving engineering trade-offs} & \text{Medium} & \text{Requires training} \\
\text{Jobs-to-be-done} & \text{Understanding the underlying need} & \text{Medium} & \text{Abstract, hard to quantify} \\
\end{array}
$$

**The most powerful technique is observation, because the user cannot articulate what they work around.** A nurse who wraps a bandage with her left hand because the dispenser is on the right is telling you the dispenser is in the wrong place, but she will never say so, because she has adapted. **The engineer who watches the nurse is designing for the need; the engineer who surveys the nurse is designing for the answer.**
:::

::: example Stakeholder analysis for a hospital bed {#ex-stakeholder level=3 check="6"}
A hospital bed has the following stakeholders: patient, nurse, doctor, cleaning staff, biomedical engineer, hospital procurement, infection-control officer, manufacturer, regulator (MHRA/FDA), recycling facility. How many are internal (directly involved in using or maintaining the product) and how many are external?

**Internal (directly involved in using or maintaining): patient, nurse, doctor, cleaning staff, biomedical engineer = 5.** **External (indirectly involved): hospital procurement, infection-control officer, manufacturer, regulator, recycling facility = 5.** **Total: 10 stakeholders.** **The infection-control officer is the stakeholder who will require that the bed has no horizontal surfaces where bacteria can settle, no crevices that cannot be cleaned, and a surface that withstands 5 000 cycles of quaternary-ammonium disinfectant. The engineer who does not interview the infection-control officer will design a bed that the hospital cannot pass its own audit on.**
:::

## Exercises

::: exercise Write a testable requirement {#ex-testable-req level=2 check="4"}
Rewrite the following vague statements as testable requirements: (a) "The motor shall be powerful." (b) "The enclosure shall be waterproof." (c) "The software shall be fast." (d) "The product shall be safe." How many measurable targets are needed?

::: solution
(a) "The motor shall deliver 12 N·m continuous torque at 2 000 rpm ± 5 % at 40 °C ambient." (b) "The enclosure shall maintain IP67 (1 m for 30 min per IEC 60529) with no water ingress." (c) "The software shall respond to a button press within 200 ms at 95th percentile, measured over 1 000 trials." (d) "The product shall comply with IEC 62368-1 (audio/video, IT) and shall not present a hazard exceeding ES1/PS1 under single-fault conditions."

**Each requirement has a verb, a noun, a number, a unit, a tolerance, a condition, and a test standard. The number of measurable targets is 4 (one per requirement).**
:::
:::

::: exercise QFD importance calculation {#ex-qfd-calc level=3 check="78"}
A product has two customer attributes ("durable" w=5, "light" w=3) and three engineering characteristics (material thickness, mass, cost). The relationship matrix is:

| | Thickness | Mass | Cost |
|---|---|---|---|
| Durable (5) | 9 | 3 | 3 |
| Light (3) | 3 | 9 | 1 |

Calculate the absolute importance of each EC.

::: solution
$$
I _ { \text{thickness} } \; = \; 5 \times 9 + 3 \times 3 \; = \; 4 5 + 9 \; = \; 5 4
$$

$$
I _ { \text{mass} } \; = \; 5 \times 3 + 3 \times 9 \; = \; 1 5 + 2 7 \; = \; 4 2
$$

$$
I _ { \text{cost} } \; = \; 5 \times 3 + 3 \times 1 \; = \; 1 5 + 3 \; = \; { \bf 1 8 }
$$

**Thickness dominates (54), because "durable" is the most important customer attribute (w=5) and thickness is strongly related to durability (r=9). The roof of the house shows the conflict: thickness is positively correlated with mass (thicker = heavier), so the designer must trade durability against weight. Cost is the least important (18), so the designer has freedom to use a more expensive material if it improves the durability-to-mass ratio.**
:::
:::

::: exercise Traceability matrix completeness {#ex-trace level=3 check="5"}
A specification has 12 requirements and 8 tests. The traceability matrix shows that 3 requirements have no test and 1 test has no requirement. Is the matrix complete? How many requirement-test links are needed for completeness?

::: solution
**The matrix is not complete.** For completeness: every requirement must have at least one test (12 requirements → at least 12 links), and every test must have at least one requirement (8 tests → at least 8 links). The minimum number of links is max(12, 8) = 12 (if each test covers at least one requirement, and some tests cover multiple requirements). **The 3 orphan requirements must be assigned tests, and the 1 orphan test must be linked to a requirement or deleted.**
:::
:::

::: exercise Verification vs validation {#ex-verif-valid2 level=2 check="2"}
A product passes all 50 verification tests but the customer rejects it in the field trial because "it doesn't do what I need." Is this a verification failure or a validation failure? How many validation steps were skipped?

::: solution
**This is a validation failure.** The verification tests confirmed that the product meets the specification; the field trial revealed that the specification does not meet the customer's need. **At least 2 validation steps were skipped: (1) the concept validation (show the concept to the customer before designing), and (2) the prototype validation (let the customer use a prototype before the design freeze).** The cost of skipping validation is the cost of building a product that passes every test and fails every user.
:::
:::

::: exercise Requirement prioritisation {#ex-prioritise level=3 check="15"}
A product has 40 requirements: 15 must-have, 12 should-have, 8 could-have, 5 won't-have. The design team has capacity to implement 30 requirements. Which 10 should be de-scoped, and what is the minimum number of requirements that must be implemented?

::: solution
**De-scope the 8 could-haves and 2 should-haves (the lowest-priority should-haves). The minimum number of requirements that must be implemented is 15 (the must-haves).** The 12 should-haves are negotiable with management approval; the 8 could-haves are the first candidates for de-scope; the 5 won't-haves are already excluded. **The engineer who cannot de-scope a could-have is not managing the project — they are gold-plating it.**
:::
:::

::: exercise Context diagram interfaces {#ex-context-interfaces level=3 check="7"}
A CNC machining centre has the following external entities: electrical supply, compressed air, coolant supply, chip conveyor, network (Ethernet), operator, maintenance technician. How many interface requirements are needed?

::: solution
**7 interface requirements**, one per external entity. Each interface requirement is bilateral: the machine requires 400 V 3-phase 63 A from the supply; the supply must provide 400 V ± 10 % with < 5 % THD. The machine requires 6 bar compressed air; the supply must provide 6 ± 0.5 bar with < 3 μm particulate. **The interface requirement that is most often forgotten is the network: the machine requires a 100 Mbps Ethernet connection with a static IP; the customer's IT department must provide it. If the IT department is not a stakeholder, the machine arrives and cannot be networked, and the commissioning is delayed by 3 weeks.**
:::
:::

::: exercise Derivation: the SMART criteria as a completeness check {#ex-derive-smart level=4 check="5"}
Show that the SMART criteria (Specific, Measurable, Achievable, Relevant, Testable) are a completeness check for a requirement by demonstrating that each criterion eliminates a class of defective requirements. Give an example of a requirement that fails each criterion.

::: solution
- **Not Specific**: "The pump shall be fast." (Fast in what sense? Flow rate? Response time? RPM?) → Ambiguous.
- **Not Measurable**: "The structure shall be stiff." (Stiff to what tolerance? Measured how?) → No number, no unit.
- **Not Achievable**: "The bracket shall weigh 5 g and support 10 kN." (No material can do this at the given geometry.) → Physically impossible.
- **Not Relevant**: "The bracket shall be painted blue." (The customer did not ask for a colour.) → Gold-plating.
- **Not Testable**: "The coating shall be durable." (Durable against what? For how long? Measured by what method?) → No verification method.

**Each criterion eliminates a distinct class of defect, and a requirement that passes all five is a requirement that can be designed to, tested, and accepted. The five criteria are necessary and jointly sufficient for a well-formed requirement.** $\blacksquare$
:::
:::

::: exercise Derivation: QFD importance as a weighted sum {#ex-derive-qfd level=4 check="3"}
The absolute importance of engineering characteristic $j$ is $I _ { j } = \sum _ { i } w _ { i } \, r _ { i j }$ . Show that if all customer weights are equal ($w _ { i } = 1$) and all relationships are binary ($r _ { i j } \in \{ 0 , 1 \}$), the importance reduces to the number of customer attributes that EC $j$ affects. Evaluate for an EC that affects 3 of 5 attributes.

::: solution
With $w _ { i } = 1$ and $r _ { i j } \in \{ 0 , 1 \}$:

$$
I _ { j } \; = \; \sum _ { i = 1 } ^ { 5 } 1 \times r _ { i j } \; = \; \sum _ { i = 1 } ^ { 5 } r _ { i j } \; = \; \text{number of CAs that EC } j \text{ affects}
$$

For an EC that affects 3 of 5 attributes: $I _ { j } = 3$. **The importance is the count of customer needs that the engineering characteristic addresses. An EC that addresses all 5 needs has importance 5; an EC that addresses none has importance 0 and should be deleted from the specification.** $\blacksquare$
:::
:::

::: quiz Requirements {#quiz-req}
Which of the following is a well-formed requirement?

- [ ] "The housing shall be made of aluminium."
- [x] "The housing shall dissipate 50 W at 40 °C ambient without exceeding 85 °C."
- [ ] "The housing shall be lightweight and strong."
- [ ] "The housing shall be manufactured using a cost-effective process."

::: solution
**"The housing shall dissipate 50 W at 40 °C ambient without exceeding 85 °C."** It is specific (dissipate 50 W), measurable (85 °C limit), achievable (physically possible), relevant (traces to the thermal-management need), and testable (run at 50 W, measure the temperature). The other three are either solutions (aluminium), vague (lightweight and strong), or unmeasurable (cost-effective).
:::
:::

::: quiz Verification and validation {#quiz-vv}
A product passes all verification tests but fails in the field because the customer's actual use case was not in the specification. This is a failure of:

- [ ] Verification, because the tests should have caught it
- [x] Validation, because the specification did not capture the customer's need
- [ ] Quality control, because the product was defective
- [ ] Project management, because the schedule was too tight

::: solution
**Validation.** Verification confirms that the product meets the specification; validation confirms that the specification meets the customer's need. If the specification is wrong, the product will pass every verification test and fail in the field. The fix is not better tests; the fix is better requirements elicitation and a validation step before the design freeze.
:::
:::

## Where this lesson leads

- **[[design-process/design-process-overview]]** — The requirements are the input to the Pahl & Beitz "clarify the task" phase and the left side of the V-model.
- **[[design-process/concept-generation]]** — The functional requirements are decomposed into sub-functions, and each sub-function is solved by a principle.
- **[[design-process/concept-selection]]** — The requirement priorities drive the concept selection matrix: the must-haves are the screening criteria, the should-haves are the scoring criteria.
- **[[design-process/embodiment-design]]** — The specification's interface requirements determine the layout and the mounting geometry.
- **[[design-process/reliability-risk]]** — The reliability requirements (MTBF, B10) drive the component selection, the safety factor, and the maintenance plan.
- **[[design-process/sustainability]]** — The environmental requirements (operating temperature, disposal, recycling) are constraints that the design must satisfy.
- **[[manufacturing/process-selection]]** — The cost constraint and the tolerance requirement determine the process selection.
- **[[engineering-graphics/tolerances-fits]]** — The performance requirements (accuracy, clearance) become the tolerance specifications on the drawing.

::: history Requirements engineering: from the oral brief to the model-based specification {#history-requirements}
**1940s** — The **US military** writes the first formal requirements documents for weapons systems: the **Request for Proposal (RFP)** and the **MIL-SPEC**. The requirements are written in natural language, are often contradictory, and are verified by a demonstration. **The MIL-SPEC is the ancestor of every requirements document, and its failure modes (ambiguity, incompleteness, inconsistency) are the failure modes that requirements engineering was invented to fix.**

**1966** — **Yoji Akao** and **Shigeru Mizuno** develop **Quality Function Deployment** at Mitsubishi Heavy Industries in Kobe, Japan. The House of Quality translates the customer's voice into engineering characteristics, and the method is adopted by Toyota, Canon, and Sony. **QFD is the first method to make the customer's voice quantitative, and it is the reason Japanese products in the 1980s were better at meeting customer needs than Western products.**

**1979** — The **IEEE** publishes the first standard for software requirements specifications (IEEE Std 830-1984, drafted 1979). The standard defines the structure of a requirements document: purpose, scope, definitions, requirements, appendices. **The IEEE standard is the first attempt to standardise the requirements document, and its structure is still the template for every requirements document in every industry.**

**1987** — **Thomas Gilb** publishes *Principles of Software Management and Engineering*, introducing the **Planguage** — a formal specification language that requires every requirement to have a measurable target, a verification method, and a tracking mechanism. **Gilb's insight is that a requirement without a number is not a requirement; it is a wish. The Planguage is the ancestor of the SMART criteria.**

**1990s** — The **V-model** is adopted by the German automotive industry (VDI 3697) and the European space industry (ECSS-E-ST-10-02C). The V-model pairs every decomposition step with a verification step, and the test plan is written before the design. **The V-model is the structural answer to the question "how do you know you built the right thing?" and its answer is "you write the test before you write the design."**

**2006** — The **INCOSE Systems Engineering Handbook** (4th ed.) codifies the requirements engineering process: elicit, analyse, specify, verify, manage. The handbook defines the requirement attributes (unique ID, text, type, priority, source, verification method, status) and the traceability requirements. **The INCOSE handbook is the reference for every systems-engineering programme in aerospace, defence, and automotive.**

**2010s** — **Model-Based Systems Engineering (MBSE)** replaces the text-based requirements document with a model-based one: the requirements are elements in a SysML model, linked to the architecture, the interfaces, and the verification cases. Tools: IBM Rational DOORS, Cameo Systems Modeler, Polarion. **MBSE is the promise that the requirements can be verified automatically: if the model is consistent, the product is consistent, and the change propagates from the requirement to the test without a human in the loop.**
:::

::: summary Needs and requirements {#summary-requirements}
- **A requirement is a promise to the customer, and a specification is the set of promises that defines the product.** The cost of a wrong requirement is not the cost of fixing the requirement — it is the cost of the product built to the wrong requirement.
- **Write every requirement as a verb-noun pair with a measurable target, a condition, and a test method.** "The system shall [verb] [noun] [under conditions] [to a target]." If you cannot write the test, you have not written a requirement.
- **The SMART criteria (Specific, Measurable, Achievable, Relevant, Testable) are a completeness check.** A requirement that fails any of the five is a defective requirement, and the defect will be found at the most expensive possible time.
- **Classify every requirement by type (functional, performance, constraint, interface, environmental, safety, regulatory, reliability) and by priority (must, should, could, won't).** The priority is a decision rule for the trade-off, and the "won't have" category is the scope boundary that prevents scope creep.
- **Quality Function Deployment translates the customer's voice into engineering characteristics.** The House of Quality makes the trade-offs explicit and the importance ranking tells the designer where to focus.
- **The traceability matrix links every requirement to a test and every test to a requirement.** An orphan requirement is a requirement that will not be verified; an orphan test is a test that will be forgotten.
- **Verification asks "did we build it right?" Validation asks "did we build the right thing?"** A product can pass every verification test and fail validation. The validation step is: show the prototype to the customer and watch their face.
- **The context diagram defines the system boundary and enumerates the interfaces.** Every interface is a requirement, and every interface requirement is bilateral. The missing interface is the most common cause of integration failure.
- **The stakeholder analysis identifies everyone who affects or is affected by the product.** The stakeholder who is not interviewed is the stakeholder whose requirement is not written, and whose objection will appear at the design review or the audit.
- **The requirements are frozen at Gate 1, and any change after that goes through a change-control board.** The change-control board assesses the cost, the schedule impact, and the risk, and the decision is recorded. The requirement that changes without a change order is the requirement that kills the project.
:::

## Further reading

- **Gerd Ulrich, Karl Eppinger and Steven Eppinger (2019)** — *Product Design and Development*, 7th ed. McGraw-Hill. Chapters 2–4: customer needs, QFD, and the product specification.
- **Yoji Akao and Shigeru Mizuno (1994)** — *QFD: The Customer-Driven Approach to Quality Planning and Deployment*. Productivity Press. The original QFD text by its inventors.
- **INCOSE (2023)** — *Systems Engineering Handbook*, 5th ed. Wiley. The reference for requirements engineering, the V-model, and the traceability matrix.
- **Karl Wiegers and Joy Beatty (2013)** — *Software Requirements*, 3rd ed. Microsoft Press. The requirements engineering discipline from the software side: elicitation, analysis, specification, verification, management.
- **Donella H. Meadows (2008)** — *Thinking in Systems: A Primer*. Chelsea Green. The systems-thinking foundation of the context diagram, the feedback loop, and the unintended consequence.
- **Genichi Taguchi (1986)** — *Introduction to Quality Engineering: Designing Quality into Products and Processes*. Asian Productivity Organization. The Taguchi loss function and the quality-improvement philosophy that underpins QFD.
- **Clayton M. Christensen and Jerome L. Bower (1996)** — "Customer power, strategic adaptation, and resource allocation." *Strategic Management Journal* 17(S2), pp. 197–218. The lead-user method and the innovator's dilemma.
- **ISO/IEC/IEEE 29148:2018** — *Systems and software engineering — Life cycle processes — Requirements engineering*. The international standard for requirements engineering.
