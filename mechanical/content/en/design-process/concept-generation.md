The quality of a design is determined not by how well the engineer solves the problem they chose, but by whether they chose the right problem and generated the right solution in the first place. **The engineer who generates three concepts and picks the best one is not designing — they are rationalising the first idea that came to mind.** The empirical evidence is unambiguous: teams that generate 10 or more concepts before evaluating any of them produce solutions that are measurably better (higher novelty, higher feasibility, higher customer satisfaction) than teams that generate 3, and the effect is not marginal — it is a factor of 2–3 in objective quality metrics. **The reason is simple: the first three ideas are the three most obvious ideas, and the most obvious ideas are the ones the competitor already has. The good idea is usually number seven, and the great idea is usually number twelve, and the engineer who stops at three will never find them.**

Concept generation is the phase of the design process in which the solution space is explored without commitment. The rules are: **defer judgement, seek novelty, build on others' ideas, and separate the generation from the evaluation.** The tools are: the function structure (decompose the problem into sub-functions), the morphological chart (enumerate the solution principles for each sub-function), the brainstorming session (generate without criticism), the TRIZ contradiction matrix (resolve engineering trade-offs systematically), the analogy method (borrow solutions from other domains), and the biomimetic search (ask what nature has already solved). The output is a set of 10–30 concept variants, each described by a sketch, a block diagram, and a one-paragraph narrative, ready for the selection phase.

::: warning Nine ways concept generation goes wrong
**Starting with a solution.** The engineer who opens the CAD package before writing the function structure is not generating concepts — they are drawing the first idea they had, which is almost never the best one. **Write the function structure first, and do not draw a single line until every sub-function has a name and a flow (material, energy, signal) through it.** **Generating variations of one concept.** Ten concepts that are all "a motor, a gearbox, and a lead screw, but with different gear ratios" are not ten concepts — they are one concept with ten parameter variations. **A true concept variant differs in the working principle, not the dimensions. Ask: "does this concept use a different physical effect, a different energy source, or a different motion transformation?" If the answer is no, it is not a new concept.** **Confusing parameters with principles.** Changing the material from steel to aluminium is a parameter change; changing from a bolted joint to a welded joint is a principle change; changing from a bolted joint to a snap-fit is a concept change. **The morphological chart enumerates principles, not parameters. If the chart has "steel" and "aluminium" in the same row, the row is wrong — it should be "material: metal, polymer, composite, ceramic" and the specific alloy is a parameter within the "metal" principle.** **Not decomposing the function.** A monolithic problem statement ("design a machine that fills 1 000 bottles per hour") cannot be solved; a decomposed one ("the system shall: (1) convey the bottle, (2) position the bottle under the nozzle, (3) meter the liquid, (4) dispense the liquid, (5) cap the bottle, (6) label the bottle") can be solved sub-function by sub-function. **Decompose until each sub-function is a verb-noun pair that can be solved by a known physical effect.** **Anchoring on the existing product.** The engineer who is asked to "improve the existing pump" will generate variations of the existing pump. The engineer who is asked to "move fluid from A to B" will generate centrifugal, positive-displacement, peristaltic, diaphragm, ejector, and electro-osmotic concepts. **Re-state the problem at the most abstract level possible before generating concepts, and do not look at the existing product until the concepts are on the table.** **Skipping the morphological chart.** The morphological chart is the tool that forces the enumeration of the solution space, and the enumeration is the mechanism by which the engineer finds the combination they would not have thought of. **A 5 × 4 morphological chart has 1 024 combinations; the engineer who generates 5 concepts without the chart has sampled 0.5 % of the space.** **Not using analogies.** The best engineering solutions are often borrowed from other domains: the Velcro fastener from the burdock burr, the high-speed train nose from the kingfisher's beak, the self-cleaning surface from the lotus leaf. **Ask: "what other systems solve this sub-function?" and "what does nature do?" The analogy is not a shortcut; it is a design method with a 50-year track record.** **Generating without evaluating, then evaluating without generating.** The brainstorming session that generates 50 ideas and never evaluates them is a waste of time; the evaluation meeting that scores 3 concepts without generating more is a rubber stamp. **The generation and the evaluation are separate phases, and the generation must come first. The evaluation criteria are written before the concepts are generated (from the requirements), and the concepts are scored against the criteria after the generation is complete.** **Not documenting the rejected concepts.** The concept that was rejected at the morphological-chart stage because it was "too expensive" may become the best concept when the requirements change, the material prices change, or a new manufacturing process becomes available. **Document every concept, including the rejected ones, with the reason for rejection. The rejected concept archive is the design team's institutional memory, and it is the first place to look when the selected concept fails.**
:::

## 1. Function structures: decomposing the problem

::: definition Function, flow, and the black-box model {#def-function-blackbox}
A **function** is the transformation of an input flow into an output flow. The three flow types are:

$$
\begin{array} { l l l l }
\textbf{Flow type} & \textbf{Symbol} & \textbf{Examples} & \textbf{Conservation law} \\ \hline
\text{Material} & \text{Solid line} & \text{Workpiece, fluid, granular solid} & \text{Mass conservation} \\
\text{Energy} & \text{Dashed line} & \text{Electrical, hydraulic, thermal, mechanical} & \text{Energy conservation} \\
\text{Signal} & \text{Dotted line} & \text{Sensor reading, control command, feedback} & \text{Information (no conservation)} \\
\end{array}
$$

The **black-box model** (also called the **black-box function** or **system function**) represents the entire product as a single box that transforms input flows into output flows:

$$
\text{Input flows} \; \longrightarrow \; \boxed { \text{System function} } \; \longrightarrow \; \text{Output flows}
$$

For a centrifugal pump:

$$
\text{Fluid (low } p \text{)} \; \longrightarrow \; \boxed { \text{Increase fluid pressure} } \; \longrightarrow \; \text{Fluid (high } p \text{)}
$$

$$
\text{Electrical energy} \; \longrightarrow \; \boxed { \text{Increase fluid pressure} } \; \longrightarrow \; \text{Rotational energy (loss)}
$$

$$
\text{Control signal (flow setpoint)} \; \longrightarrow \; \boxed { \text{Increase fluid pressure} } \; \longrightarrow \; \text{Feedback signal (actual flow)}
$$

**The black-box model is the first decomposition step, and it is the step that prevents the "missing interface" failure.** A pump designed without the control-signal input will not have a flow sensor, and a pump designed without the rotational-energy output will not have a motor cooling fan. **The black-box model enumerates every flow that crosses the system boundary, and every flow is an interface requirement.**
:::

::: definition The function structure (black box → sub-functions → function network) {#def-function-structure}
The **function structure** decomposes the black-box function into a network of sub-functions, each of which transforms one or more flows. The decomposition follows the flow path: the input flow enters the first sub-function, is transformed, and the output flow enters the next sub-function, and so on, until the final output flow leaves the system.

The standard sub-function verbs (the **function verb catalogue**, Pahl & Beitz) are:

$$
\begin{array} { l l l }
\textbf{Verb} & \textbf{Meaning} & \textbf{Example} \\ \hline
\text{Provide} & \text{Supply a flow} & \text{Provide electrical energy} \\
\text{Change} & \text{Transform a flow} & \text{Change electrical to mechanical energy} \\
\text{Convey} & \text{Move a flow without changing it} & \text{Convey fluid from tank to nozzle} \\
\text{Store} & \text{Hold a flow for a time} & \text{Store hydraulic energy (accumulator)} \\
\text{Distribute} & \text{Split or combine a flow} & \text{Distribute fluid to 4 cylinders} \\
\text{Connect} & \text{Join two flows} & \text{Connect motor shaft to gearbox input} \\
\text{Separate} & \text{Remove an unwanted component} & \text{Separate chips from coolant} \\
\text{Sense} & \text{Measure a flow property} & \text{Sense fluid pressure} \\
\text{Control} & \text{Regulate a flow} & \text{Control fluid flow rate} \\
\end{array}
$$

The **function structure** is the directed graph of sub-functions connected by flows. For a simple hydraulic power pack:

$$
\boxed { \text{Provide electrical energy} } \; \longrightarrow \; \boxed { \text{Change electrical to hydraulic} } \; \longrightarrow \; \boxed { \text{Store hydraulic energy} } \; \longrightarrow \; \boxed { \text{Distribute hydraulic fluid} } \; \longrightarrow \; \boxed { \text{Change hydraulic to mechanical} }
$$

**The function structure is the tool that makes the concept generation systematic: each sub-function is solved by a solution principle, and the concept is a combination of principles, one per sub-function. The morphological chart is the matrix of principles, and the concept is a path through the chart.**
:::

::: definition Functional decomposition and the sub-function hierarchy {#def-functional-decomp}
The decomposition can be performed at three levels of abstraction:

$$
\begin{array} { l l l l }
\textbf{Level} & \textbf{Abstraction} & \textbf{Example (pump)} & \textbf{When to use} \\ \hline
\text{What} & \text{Most abstract} & \text{"Increase fluid pressure"} & \text{Concept generation} \\
\text{How} & \text{Intermediate} & \text{"Convert mechanical to fluid energy"} & \text{Embodiment design} \\
\text{With what} & \text{Most concrete} & \text{"Centrifugal impeller, 316 SS, 5 vanes"} & \text{Detail design} \\
\end{array}
$$

**The concept generation phase operates at the "what" level, not the "how" or "with what" level.** The sub-function "increase fluid pressure" can be solved by a centrifugal pump, a gear pump, a peristaltic pump, a diaphragm pump, an ejector, a ram, or a gravity head. The engineer who writes "centrifugal pump" as the sub-function has already made the concept decision, and the morphological chart will not generate the alternatives.

The **sub-function hierarchy** is a tree: the top node is the system function, the second level is the major sub-functions (one per flow path), and the third level is the primitive sub-functions (the smallest unit that can be solved by a single physical effect). **The decomposition is complete when every leaf node is a verb-noun pair that can be solved by a known physical effect or a standard component.**
:::

::: example Function structure for an electric window-lift mechanism {#ex-func-window level=3 check="5"}
An automotive window-lift mechanism has the following flows: electrical energy (input), window glass (input, to be moved), gravitational force (disturbance), control signal (input, from the driver's switch). Draw the function structure.

**Sub-functions (5):**

1. **Provide electrical energy** (from the 12 V battery)
2. **Change electrical energy to rotational mechanical energy** (the motor)
3. **Change rotational direction to linear motion** (the scissor mechanism, the cable drive, or the rack-and-pinion)
4. **Store mechanical energy** (the counterbalance spring or the self-locking gear, to hold the window against gravity)
5. **Control the motion** (the switch, the relay, and the anti-pinch sensor)

**The function structure is:**

$$
\boxed { 1 } \; \xrightarrow { \text{electrical} } \; \boxed { 2 } \; \xrightarrow { \text{rotational}} \; \boxed { 3 } \; \xrightarrow { \text{linear}} \; \boxed { 4 } \; \xrightarrow { \text{glass force}} \; \text{Window}
$$

**with the control signal entering sub-function 5, which commands sub-function 2.** **The morphological chart for sub-function 3 has at least 4 principles: scissor (X-arm), cable drive, rack-and-pinion, and toggle mechanism. The engineer who starts with "scissor mechanism" has eliminated 3 of the 4 alternatives before the generation phase begins.**
:::

::: widget plot
title: The function structure: flows through the system
f: 1; 2; 3; 4; 5
x: 0,6
y: 0,6
labels: Provide; Change; Convey; Store; Control
caption: A function structure is a directed graph: the boxes are sub-functions, the arrows are flows (material, energy, signal). **The number of sub-functions is the number of decisions the designer must make, and the number of flows is the number of interfaces. A system with 5 sub-functions and 3 flow types has at least 15 interfaces (5 sub-functions × 3 flow types), and each interface is a requirement.** **The function structure is the tool that makes the interfaces explicit, and the explicit interface is the interface that gets designed, not the one that gets discovered at integration time.**
:::

## 2. The morphological chart: enumerating the solution space

::: definition The morphological chart (Zwicky box) {#def-morpho}
The **morphological chart** (Zwicky, 1969) is a matrix in which the rows are the sub-functions and the columns are the solution principles for each sub-function. A **concept variant** is a selection of one principle per sub-function, and the **concept set** is the set of all feasible variants.

$$
\begin{array} { l c c c c }
\textbf{Sub-function} & \textbf{Principle A} & \textbf{Principle B} & \textbf{Principle C} & \textbf{Principle D} \\ \hline
\text{Support load} & \text{Cantilever} & \text{Simply supported} & \text{Truss} & \text{Arch} \\
\text{Attach to frame} & \text{Bolted} & \text{Welded} & \text{Bonded} & \text{Pin-jointed} \\
\text{Material} & \text{Steel} & \text{Aluminium} & \text{GFRP} & \text{CFRP} \\
\text{Manufacturing} & \text{Machined} & \text{Cast} & \text{Sheet-formed} & \text{Printed} \\
\end{array}
$$

The number of combinations is the product of the number of principles per sub-function: $4 ^ { 4 } = 2 5 6$ . **The morphological chart does not generate the concepts; it enumerates the space from which the concepts are drawn. The engineer's job is to (1) populate the chart with feasible principles, (2) eliminate infeasible combinations (e.g., "cast" + "CFRP" is infeasible for most geometries), and (3) select a diverse subset of 10–20 combinations for evaluation.**

The chart is populated by asking, for each sub-function: "by what physical effect, mechanism, or component can this sub-function be achieved?" The answers are the principles, and the principles are drawn from:

- **Standard components** (motors, bearings, gears, springs, sensors)
- **Physical effects** (electromagnetic induction, piezoelectricity, shape-memory, thermoelectric)
- **Mechanism libraries** (four-bar linkages, cam-follower, Geneva drive, ratchet-and-pawl)
- **Nature** (biomimetic analogies: the gecko's foot for adhesion, the pangolin's scales for armour)
- **Other industries** (aerospace, medical, consumer electronics, food processing)
:::

::: definition Screening the morphological chart: feasibility and compatibility {#def-morpho-screen}
Not all combinations in the morphological chart are feasible. The screening eliminates:

1. **Physically infeasible combinations**: "Principle: magnetic levitation" + "Material: wood" is infeasible (wood is not ferromagnetic).
2. **Manufacturing-infeasible combinations**: "Principle: cast" + "Material: CFRP" is infeasible for most geometries (CFRP is not cast).
3. **Economically infeasible combinations**: "Principle: five-axis machined" + "Material: titanium" + "Volume: 10 million units" is infeasible at the target cost.
4. **Interface-incompatible combinations**: "Principle: hydraulic actuator" + "Control: PWM electronic" requires a servo-valve, which adds cost and complexity.

**The screening is performed by a cross-functional team (design, manufacturing, quality, purchasing) and takes 2–4 hours for a 5 × 4 chart. The output is a reduced chart with 10–30 feasible combinations, each of which is a candidate concept.**
:::

::: example Morphological chart for a domestic lawn mower {#ex-morpho-mower level=3 check="32"}
A domestic lawn mower has 5 sub-functions with the following principles:

| Sub-function | Principles | Count |
|-------------|-----------|-------|
| Cut the grass | Rotary blade, reel (cylinder), string trimmer, air cushion | 4 |
| Provide energy | Petrol engine, electric motor (corded), electric motor (battery), human power | 4 |
| Move the mower | Push (manual), self-propelled (wheels), hover (air cushion), robotic | 4 |
| Collect the clippings | Side discharge, rear bagging, mulching, vacuum | 4 |
| Adjust the height | Lever + spring, screw + knob, pneumatic lift, electronic + linear actuator | 4 |

How many combinations are there, and how many are feasible?

$$
N \; = \; 4 ^ { 5 } \; = \; { \bf 1 \ 0 2 4 }
$$

**After screening, the feasible combinations are approximately 30–50 (3–5 % of the total). The infeasible combinations include: "hover" + "petrol engine" (the hover principle requires a fan, which is incompatible with the blade), "robotic" + "human power" (contradictory), "air cushion" + "rear bagging" (the air cushion requires a sealed skirt, which prevents the bagging).** **The 30–50 feasible combinations are the concept set, and the selection matrix (see [[design-process/concept-selection|concept selection]]) reduces them to 2–3 for the prototype phase.**
:::

::: widget plot
title: The morphological chart: combinations vs sub-functions
f: 2^x; 3^x; 4^x
x: 1,8
y: 0,5000
labels: 2 principles each; 3 principles each; 4 principles each
caption: Number of concept combinations against the number of sub-functions, for 2, 3, and 4 solution principles per sub-function. **The growth is exponential: 5 sub-functions with 4 principles each gives 1 024 combinations; 8 sub-functions with 4 principles each gives 65 536. The morphological chart is the tool that makes the combinatorial explosion visible, and the screening is the tool that makes it manageable.** **The engineer who generates 5 concepts without the chart is not searching the space — they are sampling it at 0.01 %.**
:::

## 3. Creative techniques for concept generation

::: definition Brainstorming, brainwriting, and the rules of divergence {#def-brainstorming}
**Brainstorming** (Osborn, 1953) is a group technique for generating ideas without criticism. The four rules are:

1. **Defer judgement**: no idea is criticised, evaluated, or discussed during the generation phase. The evaluation comes later, in a separate session.
2. **Encourage wild ideas**: the unusual idea is the seed of the innovative concept. "What if the mower flew?" is a wild idea that leads to the hover mower.
3. **Build on others' ideas**: "yes, and…" is the only permitted response. The idea that is modified is more valuable than the idea that is invented.
4. **Go for quantity**: the first 10 ideas are the obvious ones; the next 10 are the variations; the next 10 are the interesting ones. **The quality of the ideas is a function of the quantity, and the quantity is a function of the time spent in the generation phase.**

**Brainwriting** (the 6-3-5 method) is a structured variant: 6 participants, each writes 3 ideas on a sheet, passes the sheet to the right, and the next participant builds on the ideas. After 5 rounds, 6 × 3 × 5 = 90 ideas are generated. **Brainwriting eliminates the dominant-personality problem of brainstorming: the quiet engineer's idea is on the sheet, and the loud engineer cannot suppress it.**

**The research evidence is mixed**: some studies find that groups generate more ideas than individuals (the synergy hypothesis), others find that individuals working alone and pooling their ideas generate more than groups working together (the production-blocking hypothesis). **The practical conclusion is: generate individually first (10 minutes of silent sketching), then pool and build in a group (30 minutes of brainwriting). The individual phase eliminates the production-blocking; the group phase adds the synergy.**
:::

::: definition TRIZ and the contradiction matrix {#def-triz}
**TRIZ** (Teoriya Resheniya Izobretatelskikh Zadach, Altshuller, 1946) is a systematic method for resolving engineering contradictions. The core insight is that **every engineering improvement creates a contradiction: making the shaft stronger makes it heavier; making the housing stiffer makes it more expensive; making the process faster makes it less accurate.** The contradiction is not a problem to be optimised away; it is a signal that a creative principle is needed.

The **contradiction matrix** maps 39 engineering parameters against each other. The entry at (i, j) lists the **40 inventive principles** that have historically resolved the contradiction between parameter i and parameter j. The 40 principles include:

$$
\begin{array} { l l l }
\textbf{Principle} & \textbf{Name} & \textbf{Example} \\ \hline
\text{No. 1} & \text{Segmentation} & \text{Blinds: one slat moves, not the whole window} \\
\text{No. 2} & \text{Taking out} & \text{Remove the noisy compressor from the room} \\
\text{No. 7} & \text{Nesting (Matryoshka)} & \text{Telescoping antenna, retractable landing gear} \\
\text{No. 10} & \text{Preliminary action} & \text{Pre-stress the concrete before it is loaded} \\
\text{No. 15} & \text{Dynamicity} & \text{Variable-geometry turbo, adaptive suspension} \\
\text{No. 19} & \text{Mechanical vibration} & \text{Ultrasonic cleaning, vibration compaction} \\
\text{No. 28} & \text{Mechanics substitution} & \text{Replace the mechanical switch with an optical sensor} \\
\text{No. 35} & \text{Phase transitions} & \text{Use the latent heat of a phase-change material} \\
\text{No. 40} & \text{Composite materials} & \text{Replace steel with CFRP: same strength, 1/5 the mass} \\
\end{array}
$$

**TRIZ is not a substitute for engineering knowledge; it is a structured way to search the space of known solutions for the contradiction you are facing. The contradiction matrix is a lookup table, and the lookup is faster than the brainstorm.**
:::

::: definition Analogical transfer and biomimetics {#def-analogy}
**Analogical transfer** is the process of solving a problem by finding a similar problem in a different domain and transferring the solution. The transfer is structured in four steps:

1. **Abstract** the problem: "I need to connect two parts so that they can be separated and reconnected many times without wear."
2. **Search** for analogous solutions in other domains: "How does nature connect two surfaces that must be separated and reconnected?" → The gecko's foot (van der Waals adhesion), the mussel's byssus thread (wet adhesion), the bird's feather (interlocking barbs).
3. **Map** the analogy to the engineering problem: "The gecko's foot uses millions of microscopic hairs (setae) that make intimate contact with the surface. The engineering analogue is a micro-textured surface with a high contact area."
4. **Adapt** the solution to the engineering constraints: "The micro-textured surface must be manufacturable, durable, and resistant to contamination."

**Biomimetics** (also called **biomimicry**, Benyus, 1997) is the systematic search of biological solutions to engineering problems. The **biomimetic search** asks: "How does nature solve this function?" and the answer is found in the **biological strategy library** (AskNature.org, the Biomimicry 3.8 database).

**The empirical evidence for analogical transfer is strong: engineers who are exposed to analogies from other domains generate 30–50 % more novel concepts than engineers who work within their own domain. The analogy is not a shortcut; it is a design method.**
:::

::: example TRIZ contradiction for a bicycle frame {#ex-triz-bike level=3 check="15"}
A bicycle frame must be stiff (to transmit pedalling power efficiently) and light (for climbing and acceleration). The stiffness-to-mass ratio is limited by the material (steel: 2.5, aluminium: 3.0, CFRP: 5.5). What TRIZ principles apply?

**The contradiction is: "Improve parameter 14 (Strength/Stiffness) without worsening parameter 1 (Weight of moving object)." The contradiction matrix suggests principles 1 (Segmentation), 8 (Anti-weight / counterweight), 15 (Dynamicity), 28 (Mechanics substitution), 35 (Phase transitions), and 40 (Composite materials).**

- **Principle 40 (Composite materials)**: Replace steel with CFRP. The stiffness-to-mass ratio improves from 2.5 to 5.5, a 2.2× improvement.
- **Principle 1 (Segmentation)**: Make the frame from tubes of varying wall thickness (butted tubing), so the material is concentrated where the stress is highest.
- **Principle 15 (Dynamicity)**: Make the frame geometry adjustable (telescoping seat tube, adjustable head angle) so one frame fits multiple riders.

**The TRIZ matrix does not tell the engineer which principle to choose; it tells the engineer which principles have historically resolved this contradiction. The choice is an engineering judgement, informed by the cost, the manufacturability, and the target market.**
:::

## 4. Concept documentation and the concept sheet

::: definition The concept sheet and the concept set {#def-concept-sheet}
Each concept variant is documented on a **concept sheet** (also called a **concept card**), which contains:

1. **Concept name**: a short, descriptive name ("Cable-drive window lift with counterbalance spring").
2. **Sketch**: a hand-drawn or CAD sketch showing the principle, the components, and the flows.
3. **Block diagram**: the function structure with the chosen principles substituted for the sub-functions.
4. **Narrative**: a one-paragraph description of how the concept works, what is novel about it, and what the key risks are.
5. **Key parameters**: the 3–5 parameters that define the concept (motor power, gear ratio, mass, cost estimate).
6. **Advantages and disadvantages**: 3–5 bullet points for each.
7. **Risk list**: the top 3 technical risks, each with a mitigation plan.

**The concept sheet is the input to the selection phase (see [[design-process/concept-selection|concept selection]]), and the quality of the selection depends on the quality of the sheets. A concept sheet that says "use a motor" is not a concept sheet; a concept sheet that says "use a 12 V DC brushed motor, 100 W, with a 20:1 worm gear and a self-locking feature" is.**
:::

::: definition Concept maturity levels: from sketch to prototype {#def-concept-maturity}
Concepts are developed to three levels of maturity:

$$
\begin{array} { l l l l }
\textbf{Level} & \textbf{Artefact} & \textbf{Fidelity} & \textbf{Purpose} \\ \hline
\text{L1: Sketch} & \text{Hand drawing, block diagram} & \text{Low} & \text{Communication, screening} \\
\text{L2: Model} & \text{CAD model, simulation, calculation} & \text{Medium} & \text{Feasibility, sizing} \\
\text{L3: Prototype} & \text{Physical model, functional test} & \text{High} & \text{Validation, risk reduction} \\
\end{array}
$$

**The maturity level determines the cost of the concept and the cost of the change. An L1 sketch costs 1 hour and can be changed in 5 minutes. An L2 CAD model costs 40 hours and can be changed in 4 hours. An L3 prototype costs 200 hours and can be changed in 20 hours. The design process is the discipline of keeping the concepts at the lowest maturity level that supports the decision, and the decision is the reason for the maturity.**
:::

::: example Concept sheet for a window-lift mechanism {#ex-concept-sheet level=3 check="3"}
Write a concept sheet for the "scissor mechanism with worm gear" concept for the automotive window-lift problem.

**Concept name**: Scissor (X-arm) window lift with worm-gear drive.

**Sketch**: [Hand drawing showing the X-arm scissor mechanism, the DC motor, the worm gear, and the sector gear that converts the worm's rotation to the scissor's opening angle.]

**Block diagram**: Battery → DC motor → Worm gear (self-locking) → Sector gear → Scissor arms → Window glass.

**Narrative**: The DC motor drives a worm gear, which provides a high reduction ratio (20:1) and a self-locking feature that prevents the window from falling when the motor is de-energised. The worm gear drives a sector gear that converts the rotation to the scissor's opening angle. The scissor arms translate the rotation to the linear motion of the glass. The self-locking feature eliminates the need for a separate counterbalance spring, reducing the part count by 3.

**Key parameters**: Motor: 12 V DC, 80 W. Gear ratio: 20:1 worm. Lift force: 80 N. Speed: 20 mm/s. Mass: 0.45 kg. Cost: £8.50 at 100 000 units/year.

**Advantages**: Self-locking (no spring needed), compact, low cost, proven technology.

**Disadvantages**: Low efficiency (worm gear: 40–60 %), noisy, limited lifespan (worm gear wear), not suitable for panoramic sunroofs.

**Risk list**: (1) Worm gear wear after 50 000 cycles → mitigation: use a bronze worm wheel, specify a grease lubricant. (2) Noise at high speed → mitigation: optimise the gear tooth profile, add a nylon bushing. (3) Anti-pinch compliance → mitigation: add a current-sensing algorithm that detects the pinch by the motor current spike.

**The concept sheet is 1 page, and the selection matrix (see [[design-process/concept-selection|concept selection]]) scores it against 8 criteria. The 3 risks are the input to the DFMEA (see [[design-process/reliability-risk|reliability and risk]]).**
:::

## Exercises

::: exercise Function structure for a coffee machine {#ex-func-coffee level=3 check="6"}
An espresso coffee machine has the following flows: water (input), electrical energy (input), coffee grounds (input), heat (output to environment), spent grounds (output), brewed coffee (output). How many sub-functions are needed, and what are they?

::: solution
**6 sub-functions:**

1. **Store water** (the reservoir)
2. **Heat water** (the thermoblock or boiler, electrical → thermal)
3. **Pressurise water** (the vibration pump or rotary pump, mechanical → hydraulic)
4. **Distribute water through coffee grounds** (the group head, the portafilter)
5. **Filter the coffee** (the paper filter or the metal screen)
6. **Control the temperature and pressure** (the thermocouple, the pressurestat, the PID controller)

**The function structure is: Store → Heat → Pressurise → Distribute → Filter → Control. The morphological chart for sub-function 2 (Heat water) has at least 3 principles: thermoblock (instantaneous), boiler (stored), and heat exchanger (dual-boiler). The morphological chart for sub-function 3 (Pressurise) has at least 3 principles: vibration pump, rotary pump, and lever (manual). The concept is a combination of one principle per sub-function, and the number of combinations is 1 × 3 × 3 × 2 × 2 × 3 = 108.**
:::
:::

::: exercise Morphological chart size {#ex-morpho-size2 level=2 check="128"}
A design has 7 sub-functions, each with 2 solution principles. How many combinations are there? If the screening eliminates 90 % of the combinations, how many feasible concepts remain?

::: solution
$$
N \; = \; 2 ^ { 7 } \; = \; { \bf 1 2 8 }
$$

After screening: $1 2 8 \times 0 . 1 0 = 1 2 . 8 \approx { \bf 1 3 }$ feasible concepts. **13 feasible concepts is a good number for the selection phase: enough to be diverse, few enough to be evaluated in a single session.**
:::
:::

::: exercise TRIZ contradiction identification {#ex-triz-contradiction level=3 check="40"}
A heat exchanger must have a high heat-transfer coefficient (to minimise the area) and a low pressure drop (to minimise the pumping power). Identify the TRIZ contradiction and suggest 2 inventive principles.

::: solution
**The contradiction is: "Improve parameter 17 (Temperature difference / heat transfer) without worsening parameter 14 (Pressure / pressure drop)."** The contradiction matrix suggests:

- **Principle 40 (Composite materials)**: Use a micro-channel heat exchanger with a high-conductivity material (copper or aluminium) that achieves a high heat-transfer coefficient with a small hydraulic diameter, reducing the pressure drop per unit area.
- **Principle 15 (Dynamicity)**: Use a variable-geometry heat exchanger that adjusts the flow cross-section to maintain a low pressure drop at low flow rates and a high heat-transfer coefficient at high flow rates.

**Principle 40 is the most common solution: the micro-channel heat exchanger (used in automotive radiators and electronics cooling) achieves a heat-transfer coefficient of 10 000 W/m²K at a pressure drop of 50 kPa, compared to 5 000 W/m²K at 200 kPa for a conventional shell-and-tube design.**
:::
:::

::: exercise Biomimetic analogy {#ex-biomimicry level=3 check="2"}
The function is "grip a smooth, wet surface without suction or adhesive." Name two biological solutions and the engineering analogue for each.

::: solution
**Biological solution 1: The gecko's foot.** The gecko climbs smooth glass using millions of microscopic hairs (setae, 5 μm diameter) that branch into nanoscale spatulae (200 nm), creating van der Waals adhesion over a large contact area. **Engineering analogue**: pressure-sensitive adhesive tape with a micro-textured surface (e.g., Gecko Tape by iRobot, or the nanoGriptech gripper).

**Biological solution 2: The tree frog's toe pad.** The tree frog grips wet surfaces using hexagonal microstructures (50 μm pillars) that expel water from the contact zone, creating a thin liquid film that generates capillary adhesion. **Engineering analogue**: micro-patterned elastomer gripper with a hydrophilic coating (e.g., the Festo BionicFinch or the Robotiq gripper with a textured pad).

**The two biological solutions use different physical mechanisms (van der Waals vs capillary adhesion), and the engineering analogues are different: the gecko-inspired gripper works on dry surfaces, the frog-inspired gripper works on wet surfaces. The analogy is not a copy; it is a transfer of the physical mechanism.**
:::
:::

::: exercise Brainwriting output {#ex-brainwriting level=2 check="90"}
In a 6-3-5 brainwriting session, 6 participants each write 3 ideas per round, and there are 5 rounds. How many ideas are generated? If 20 % are duplicates, how many unique ideas remain?

::: solution
$$
N \; = \; 6 \times 3 \times 5 \; = \; { \bf 9 0 } \ \text{ideas}
$$

After removing 20 % duplicates: $9 0 \times 0 . 8 0 = { \bf 7 2 }$ unique ideas. **72 unique ideas from a 30-minute session is a good yield. The next step is to cluster the 72 ideas into 10–15 concept families, and the concept families are the input to the morphological chart.**
:::
:::

::: exercise Concept maturity and cost {#ex-maturity-cost level=3 check="40"}
A concept at L1 (sketch) costs 1 hour to produce and 5 minutes to change. A concept at L2 (CAD model) costs 40 hours to produce and 4 hours to change. A concept at L3 (prototype) costs 200 hours to produce and 20 hours to change. If a design error is found after 3 concepts are at L3, what is the total rework cost if the error requires all 3 concepts to be reworked?

::: solution
$$
\text{Rework cost } \; = \; 3 \times 2 0 \; = \; { \bf 6 0 } \ \text{hours}
$$

**If the error had been found at L1, the rework cost would be 3 × 5 minutes = 15 minutes. The cost of the error is 60 hours / 0.25 hours = 240× higher at L3 than at L1. The design review that catches the error at L1 saves 59.75 hours, which is about £3 000 in engineer time. The review costs 2 hours of 4 people's time, which is about £800. The return on investment is 3.75:1 for this single error.**
:::
:::

::: exercise Derivation: the combinatorial explosion {#ex-derive-combinatorics level=4 check="6"}
Show that the number of concept combinations in a morphological chart with $n$ sub-functions and $p$ principles per sub-function is $N = p ^ { n }$ , and that the number of feasible combinations after screening (fraction $f$ ) is $N _ { \text{feasible } } = f \cdot p ^ { n }$ . Evaluate for $n = 6$ , $p = 3$ , $f = 0 . 0 5$ .

::: solution
Each sub-function has $p$ independent choices, and the choices are independent, so the total number of combinations is:

$$
N \; = \; \underbrace { p \times p \times \cdots \times p } _ { n \text{ times } } \; = \; p ^ { n }
$$

After screening, the feasible fraction is $f$ , so:

$$
N _ { \text{feasible } } \; = \; f \cdot p ^ { n } \; = \; 0 . 0 5 \times 3 ^ { 6 } \; = \; 0 . 0 5 \times 7 2 9 \; = \; { \bf 3 6 }
$$

**36 feasible concepts from 729 combinations. The screening eliminates 95 % of the combinations, and the remaining 36 are the concept set. The engineer who generates 5 concepts without the chart has sampled 5/729 = 0.7 % of the space, and the probability that the best concept is in the sample is 0.7 %.** $\blacksquare$
:::
:::

::: exercise Derivation: brainstorming yield {#ex-derive-brainstorm level=4 check="5"}
The number of ideas generated in a brainstorming session follows a diminishing-returns model: $I ( t ) = I _ { \max } ( 1 - e ^ { - k t } )$ , where $I _ { \max }$ is the maximum number of ideas and $k$ is the rate constant. Show that the time to reach 90 % of $I _ { \max }$ is $t _ { 9 0 } = \ln ( 1 0 ) / k$ , and evaluate for $k = 0 . 2 \ \mathrm { m i n } ^ { - 1 }$ .

::: solution
$$
I ( t _ { 9 0 } ) \; = \; 0 . 9 \, I _ { \max } \; = \; I _ { \max } ( 1 - e ^ { - k t _ { 9 0 } } )
$$

$$
0 . 9 \; = \; 1 - e ^ { - k t _ { 9 0 } } \quad \Longrightarrow \quad e ^ { - k t _ { 9 0 } } \; = \; 0 . 1 \quad \Longrightarrow \quad t _ { 9 0 } \; = \; { \frac { \ln ( 1 0 ) } { k } }
$$

$$
t _ { 9 0 } \; = \; { \frac { 2 . 3 0 3 } { 0 . 2 } } \; = \; { \bf 1 1 . 5 } \ \text{minutes}
$$

**After 11.5 minutes, the session has generated 90 % of the ideas it will ever generate. The marginal yield of the next 10 minutes is 10 % of the total, which is about 5 ideas. The practical implication is: a 15-minute brainstorming session captures 95 % of the ideas; a 60-minute session captures 100 % but wastes 45 minutes on the last 5 %. The optimal brainstorming session is 15–20 minutes, and the rest of the time is spent on brainwriting and analogical transfer.** $\blacksquare$
:::
:::

::: quiz Function structures {#quiz-func}
In a function structure, what is the correct decomposition level for the concept generation phase?

- [ ] The "with what" level (specific components and materials)
- [x] The "what" level (abstract verb-noun pairs, e.g. "increase fluid pressure")
- [ ] The "how" level (specific mechanisms, e.g. "centrifugal impeller")
- [ ] The "why" level (the customer's underlying need)

::: solution
**The "what" level.** The concept generation phase operates at the most abstract level: "increase fluid pressure," not "centrifugal pump" and not "316 SS impeller with 5 vanes." The abstraction is what allows the morphological chart to enumerate the alternatives: centrifugal, gear, peristaltic, diaphragm, ejector, ram, gravity head. The "how" and "with what" levels are for the embodiment and detail design phases, respectively.
:::
:::

::: quiz Morphological chart {#quiz-morpho}
A morphological chart has 4 sub-functions with 5 principles each. How many combinations are there, and what fraction does a team that generates 10 concepts sample?

- [ ] 100 combinations; 10 %
- [x] 625 combinations; 1.6 %
- [ ] 20 combinations; 50 %
- [ ] 1 024 combinations; 1 %

::: solution
**625 combinations; 1.6 %.** $5 ^ { 4 } = 6 2 5$ . The team that generates 10 concepts samples $1 0 / 6 2 5 = 1 . 6 \ \%$ of the space. The morphological chart is the tool that makes the sampling fraction visible, and the sampling fraction is the argument for using the chart.
:::
:::

## Where this lesson leads

- **[[design-process/design-process-overview]]** — The concept generation phase is the Pahl & Beitz "conceptual design" phase, and the morphological chart is the tool that forces the enumeration of the design space.
- **[[design-process/requirements]]** — The function structure is derived from the functional requirements, and the sub-functions are the verb-noun pairs from the specification.
- **[[design-process/concept-selection]]** — The concept set from the morphological chart is the input to the selection matrix, the Pugh matrix, and the Pareto front.
- **[[design-process/embodiment-design]]** — The selected concept is developed into a layout, and the layout is the basis for the sizing calculations.
- **[[design-process/design-for-manufacture]]** — The morphological chart includes the manufacturing principle as a sub-function, and the DFM analysis is performed on the selected concept.
- **[[design-process/reliability-risk]]** — The risk list on the concept sheet is the input to the DFMEA, and the top 3 risks drive the prototype plan.
- **[[manufacturing/process-selection]]** — The manufacturing principle in the morphological chart is the input to the process-selection chart.
- **[[materials-science/material-families]]** — The material principle in the morphological chart is the input to the materials-selection process.

::: history Concept generation: from the eureka moment to the morphological chart {#history-concept-gen}
**1941** — **James Webb Young** publishes *A Technique for Producing Ideas*, a 48-page pamphlet that codifies the idea-generation process: gather material, digest it, step away, let the idea emerge, verify it. **Young's insight is that the idea is not a lightning bolt; it is the product of a deliberate process, and the process can be taught.**

**1953** — **Alex Faickney Osborn** publishes *Applied Imagination*, introducing **brainstorming** and its four rules: defer judgement, encourage wild ideas, build on others' ideas, go for quantity. **Osborn's insight is that the criticism kills the idea, and the idea that is killed at the brainstorming stage is the idea that would have become the patent.**

**1969** — **Fritz Zwicky** publishes *Discovery, Invention, Research Through the Morphological Approach*, introducing the **morphological chart** (the "Zwicky box"). Zwicky, a Swiss astrophysicist who co-discovered the neutron star and the dark matter evidence, applies the morphological method to everything from rocket engines to social policy. **The morphological chart is the first tool that makes the combinatorial explosion of the design space explicit, and it is the ancestor of every concept-generation method in engineering.**

**1977** — **Manfred Pahl and Wolfgang Beitz** publish *Konstruktionsmethodik*, introducing the **function structure** and the systematic decomposition of the design problem into sub-functions. **The function structure is the bridge between the requirements (what the product must do) and the concepts (how it does it), and it is the reason the morphological chart works.**

**1982** — **Genrich Altshuller** publishes *And Suddenly the Inventor Appeared* (translated from Russian), introducing **TRIZ** to a Western audience. Altshuller, a patent examiner in the Soviet Navy, analysed 400 000 patents and identified 40 inventive principles that recur across domains. **TRIZ is the first empirical design method: it is not derived from theory but from the statistical analysis of what inventors actually do.**

**1997** — **Janine Benyus** publishes *Biomimicry: Innovation Inspired by Nature*, introducing the systematic search of biological solutions to engineering problems. **Benyus's insight is that nature has 3.8 billion years of R&D, and the solutions are already there — the engineer's job is to find them, not to invent them.**

**2005** — **The Stanford d.school** codifies **Design Thinking** as a 5-phase process: empathise, define, ideate, prototype, test. The ideation phase includes brainstorming, brainwriting, worst-possible-idea, and analogical transfer. **Design Thinking is the popularisation of concept generation: the method is 50 years old, but the d.school made it accessible to non-engineers, and the result is that every product team in the world now knows what a brainstorming session is.**

**2010s** — **Generative design** software (Autodesk Fusion 360, nTopology, Grasshopper) uses evolutionary algorithms to generate thousands of concept variants from a set of constraints and objectives. The engineer specifies the loads, the constraints, and the objectives; the software generates the geometry. **Generative design is the automation of the morphological chart: the software enumerates the space, the engineer selects the concept. The question "can a computer generate a concept?" is answered by the 10 000 variants that the software produces in 10 minutes — the question "which variant should we build?" is still answered by the engineer.**
:::

::: summary Concept generation {#summary-concept-gen}
- **The quality of the design is determined by the quality of the concepts, and the quality of the concepts is determined by the number of concepts.** Teams that generate 10+ concepts produce solutions that are 2–3× better than teams that generate 3.
- **The function structure decomposes the problem into sub-functions, each of which is a verb-noun pair that transforms a flow (material, energy, signal).** The decomposition is complete when every leaf node can be solved by a known physical effect.
- **The morphological chart enumerates the solution principles for each sub-function, and the concept is a path through the chart.** A 5 × 4 chart has 1 024 combinations; the engineer who generates 5 concepts without the chart has sampled 0.5 % of the space.
- **Screening eliminates infeasible combinations (physically, manufacturing, economically, or interface-incompatible), reducing the chart to 10–30 feasible concepts.** The screening is performed by a cross-functional team and takes 2–4 hours.
- **Brainstorming, brainwriting, TRIZ, and analogical transfer are the creative techniques that populate the morphological chart.** The brainstorming session is 15–20 minutes; the brainwriting session is 30 minutes; the TRIZ contradiction matrix is a lookup table; the analogy is a transfer of a physical mechanism from another domain.
- **TRIZ resolves engineering contradictions using 40 inventive principles derived from 400 000 patents.** The contradiction matrix maps 39 engineering parameters against each other and suggests the principles that have historically resolved the contradiction.
- **Biomimetics searches the 3.8-billion-year R&D archive of nature for solutions to engineering problems.** The gecko's foot → dry adhesive; the kingfisher's beak → low-noise train nose; the lotus leaf → self-cleaning surface.
- **Each concept is documented on a concept sheet: name, sketch, block diagram, narrative, key parameters, advantages, disadvantages, and risk list.** The concept sheet is the input to the selection phase, and the quality of the selection depends on the quality of the sheets.
- **Concepts are developed to three maturity levels: L1 (sketch), L2 (model), L3 (prototype).** The maturity level determines the cost of the concept and the cost of the change, and the design process is the discipline of keeping the concepts at the lowest maturity level that supports the decision.
- **The function structure is the bridge between the requirements and the concepts, and the morphological chart is the bridge between the concepts and the selection.** The two tools together are the concept generation process.
:::

## Further reading

- **Manfred Pahl, Wolfgang Beitz, Karl-Heinrich Feldhusen and Karl-Heinrich Grote (2007)** — *Engineering Design: A Systematic Approach*, 3rd ed. Springer. Chapters 3–4: the function structure, the morphological chart, and the principle solution.
- **Alex Faickney Osborn (1953)** — *Applied Imagination: Principles and Procedures of Creative Problem-Solving*. Scribner. The original brainstorming text.
- **Fritz Zwicky (1969)** — *Discovery, Invention, Research Through the Morphological Approach*. Macmillan. The original morphological-chart text, by the man who discovered dark matter.
- **Genrich Altshuller (1999)** — *And Suddenly the Inventor Appeared: TRIZ, the Theory of Inventive Problem Solving*. Translation by Lev Shulyatsky. Inventorics Publishing. The TRIZ classic, translated from the 1982 Russian original.
- **Janine Benyus (1997)** — *Biomimicry: Innovation Inspired by Nature*. William Morrow. The popularisation of biomimetics, and the argument that nature is the best engineer.
- **Stefan H. Roelofsen (2004)** — "Function modelling in design: a review." *Proceedings of the 14th CIRP Design Seminar*. The academic review of function-structure methods.
- **Nahm, S. and K. Ishii (1997)** — "Concept evolution in embodied design." *Design Studies* 18(4), pp. 433–448. The empirical study of how concepts evolve from sketch to prototype.
- **Autodesk (2023)** — *Generative Design for Industrial Designers: A Methodology*. Autodesk White Paper. The application of evolutionary algorithms to concept generation.
