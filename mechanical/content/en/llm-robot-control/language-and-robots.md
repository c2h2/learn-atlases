An operator walks up to a robot cell and says: "Clear the bench, but leave the torque wrench where it is." Every word of that sentence is easy for a person. *Clear* means pick up the loose parts and put them somewhere sensible; *the bench* is the surface in front of the arm, not the shelf behind it; *leave the torque wrench* means do not touch one particular object, which first has to be found. A conventional robot program cannot accept the sentence at all. It needs a part number, a pick pose, a place pose and a sequence, written in advance by an integrator. A large language model (LLM) can read the sentence, but it cannot see the bench, does not know how far the arm reaches, and has never felt a part slip out of a gripper. This course is about combining the two: keeping the verified robot stack you already have — the motion planner, the joint controllers, the grasp detector of [[robot-arm-design/software-stack]] — and putting a language model above it as the component that understands the request and decides what to do.

This first chapter sets out what a language model contributes and what it lacks, explains why fluent plans are often infeasible plans (the **grounding problem**), shows with a simple probability model why errors compound over multi-step tasks, compares the four main architectures that connect language to motion, and gives latency and cost figures (as of 2026) that decide which architecture fits a given cell. The language-model background — transformers, prompting, tool use — is taught in the LLM Atlas, for example [Prompt design](/learn/llm/lesson.php?c=prompting-rag&l=prompt-design) and [Function calling and tools](/learn/llm/lesson.php?c=agents&l=function-calling); here we take it as given and concentrate on the robot.

## What a language model brings {#sec-knows}

A language model is trained to predict text, and the text of the internet, manuals and books contains an enormous amount of everyday knowledge about objects and tasks. Nobody wrote it down as a database, but it is there implicitly: cups are carried upright when they contain liquid, knives are handed over handle first, a screwdriver goes with screws, a lid is removed before something is poured out of a jar, fragile things go on top of a box rather than at the bottom. For a robot programmer this is exactly the knowledge that is tedious to encode by hand and that breaks every time the product mix changes.

::: definition Affordance {#def-affordance}
An **affordance** of an object is an action that the object makes possible for a given agent: a handle affords grasping, a drawer affords pulling, a flat stable surface affords placing. The term is due to the psychologist James J. Gibson (1977). In robotics it is used in two senses that this course keeps apart: **semantic affordance**, the knowledge that an action makes sense for an object type ("mugs can be picked up by the handle"), and **physical affordance**, the fact that *this* robot can actually perform the action on *this* object *now* (the mug is within reach, the handle is not occluded, the gripper opens wide enough).
:::

Language models are good at semantic affordances and at three related things:

- **Task decomposition.** "Make the bench ready for the next shift" becomes a list of subtasks — remove scrap, return tools to the shadow board, wipe the fixture — because similar decompositions appear in countless written procedures.
- **Resolving vague references.** "The thing I use to tighten the M8 bolts" can be resolved to "torque wrench" or "8 mm hex key" from context, and the model can ask a clarifying question when it cannot.
- **Translating intent into constraints.** "Don't put anything on top of the gauge" and "do the heavy parts first" become ordering and placement constraints that a planner can enforce.

The model also writes code and fills structured forms reliably, which matters for the architectures below: a model that can emit a correct JSON object or a short Python function against a documented API can drive a robot without ever producing a motor command itself.

## What a language model does not know {#sec-doesnt}

The list of what is missing is just as important, and it is the reason the rest of this course exists.

1. **Metric geometry.** A text model has no reliable sense of distances, angles or clearances. It may "know" that a mug is about 10 cm tall, but it cannot compute whether a 12 cm gripper fits between two boxes 11 cm apart. Vision-language models (Chapter [[llm-robot-control/vision-language-perception]]) narrow this gap but do not close it; metric answers must come from depth sensing and geometry.
2. **The robot's body.** The model does not know the arm's reach, payload, joint limits, gripper stroke or which tool is mounted, unless you tell it — and even then it reasons about these numbers as text, not as kinematics.
3. **The current scene.** It has not seen the bench. Anything it says about where objects are is either something you put into its context or a guess.
4. **The robot's skills.** It does not know that your cell has a validated `pick_from_tray` skill but no `pour` skill, or that the suction gripper cannot pick perforated sheet.
5. **Dynamics and contact.** Friction, slip, compliance, the force needed to seat a connector: none of this can be learned reliably from text.

When any of these is missing, the model does not fall silent. It produces a plan that *reads* well. This failure mode has a name.

::: definition Hallucinated feasibility {#def-hallucinated-feasibility}
A plan exhibits **hallucinated feasibility** when every step is semantically sensible and the plan as a whole is fluent, but at least one step is physically impossible or unsafe for the actual robot in the actual scene — an object out of reach, an object that is not present, a skill the robot does not have, a payload above the rating, or a placement that collides.
:::

::: example A plan that reads well and cannot run {#ex-shelf}
A six-axis arm with reach $0.85\,\mathrm m$ (from the shoulder axis to the flange) is mounted on a table so that its shoulder is $0.75\,\mathrm m$ above the floor. An operator asks it to "put the spare filter cartridges on the top shelf". An LLM given only the request replies with a tidy four-step plan: locate the cartridges, pick each one, move to the top shelf, place. The top shelf is $1.90\,\mathrm m$ above the floor and its front edge is $0.40\,\mathrm m$ horizontally from the shoulder axis. Is the plan feasible?
::: solution
The target point is $1.90 - 0.75 = 1.15\,\mathrm m$ above the shoulder and $0.40\,\mathrm m$ in front of it, a distance
$$
d = \sqrt{0.40^2 + 1.15^2}\,\mathrm m = 1.218\,\mathrm m
$$
from the shoulder. That exceeds the reach of $0.85\,\mathrm m$ by $0.37\,\mathrm m$ even before we account for the gripper length and the cartridge, so no joint configuration reaches the shelf. Every word of the LLM's plan was sensible; step 3 was impossible. A system that checks each target pose with inverse kinematics before execution rejects the plan in milliseconds; a system that trusts the text sends the arm towards a singular, fully stretched configuration and then fails, or worse, attempts the nearest reachable pose and drops the cartridge. Sanity check: $1.2\,\mathrm m$ against $0.85\,\mathrm m$ is a 43% shortfall — not a borderline case that calibration error could explain.
:::
:::

::: warning Fluent is not feasible
The most common mistake when first connecting an LLM to a robot is to treat a well-written plan as evidence that the plan will work. Language models are trained to produce plausible text; plausibility and physical feasibility are unrelated. The model's confidence, the quality of its explanation and the presence of numbers in its answer ("move 0.3 m to the left") tell you nothing about whether the motion is reachable or collision-free. Every action the model proposes must be checked by components that know the robot and the scene.
:::

### The grounding problem {#sec-grounding}

Philosophers and cognitive scientists asked long before LLMs how the symbols of a language get their meaning; Stevan Harnad called this the **symbol grounding problem** (1990). For a robot the question is concrete.

::: definition Grounding {#def-grounding}
**Grounding** a language-model output means connecting each symbol in it to something the robot can measure or do: object names to detected objects with poses in the robot's base frame, verbs to skills in the robot's library with checkable preconditions, and spatial words ("left of", "on top of", "near") to geometric predicates evaluated on the current scene. An output is **grounded** when every one of its references resolves to such an entity, and **ungrounded** otherwise.
:::

There are three complementary ways to ground an LLM, and the rest of the course uses all of them:

- **Ground the inputs.** Put the robot's skills, limits and a description of the current scene into the model's context, so that it reasons about the real situation (Chapters [[llm-robot-control/grounded-task-planning]] and [[llm-robot-control/vision-language-perception]]).
- **Ground the outputs.** Constrain what the model can say to things the robot can do: a fixed list of skills, typed tool calls, or a small API, so that "pour" cannot even be expressed if no pouring skill exists (Chapters [[llm-robot-control/code-as-policies]] and [[llm-robot-control/robot-tool-calling]]).
- **Ground by feedback.** Execute, observe and tell the model what happened, so that it corrects its picture of the world (Chapter [[llm-robot-control/closed-loop-recovery]]).

None of these makes the model's output trustworthy on its own. Grounding reduces how often the model is wrong; the checks and limits *below* the model (Chapter [[llm-robot-control/llm-guardrails]]) decide what happens when it is wrong anyway.

::: quiz
An LLM is told the robot's skill list and a scene description listing "red bin at (0.42, −0.10, 0.05) m". It plans "pick the blue bin". Which kind of grounding would have prevented this plan from reaching the motion planner?
- [ ] Grounding the inputs: a longer scene description
- [x] Grounding the outputs: requiring object arguments to be identifiers from the current scene list, and rejecting any that are not
- [ ] None — this is a hallucination and cannot be prevented
- [ ] A larger language model
::: solution
The input was already grounded — the scene list was in the context — and the model still referred to an object that does not exist. Output grounding catches this mechanically: if `pick` accepts only an `object_id` drawn from the current detection list (an enum in the tool schema, or a lookup that raises an error), the reference to a nonexistent blue bin is rejected before any motion is planned, and the error can be fed back to the model. Larger models make such mistakes less often, but not never; a mechanical check is the reliable fix.
:::
:::

## Why errors compound {#sec-compound}

Robot tasks given in language are usually several steps long, and each step can fail: the plan may be wrong, the object may be misdetected, the grasp may slip. A simple model shows why long tasks need checking at every step rather than only at the end.

::: proposition Success of a multi-step task {#prop-compound}
Let a task consist of $n$ steps, and suppose step $i$ succeeds with probability $p_i$ given that all earlier steps succeeded, and that the task succeeds only if every step does. Then the task success probability is
$$
P_{\text{task}} = \prod_{i=1}^{n} p_i ,
$$ {#eq-compound}
which for equal step reliabilities is $p^n$. If, in addition, a failed step is detected with probability $d$ and a detected failure is retried once with the same success probability $p$, each step succeeds with probability
$$
p' = p + (1 - p)\,d\,p ,
$$ {#eq-retry-once}
and the task with probability $(p')^n$.
:::

::: proof
Let $S_i$ be the event that step $i$ succeeds. By the multiplication rule for conditional probabilities ([conditional probability](/learn/maths/lesson.php?c=probability&l=conditional-probability)), $\Prob(S_1\cap\dots\cap S_n) = \Prob(S_1)\,\Prob(S_2\mid S_1)\cdots\Prob(S_n\mid S_1\cap\dots\cap S_{n-1}) = \prod p_i$, and the task succeeds exactly on this intersection. No independence assumption is needed beyond defining $p_i$ as the conditional probabilities. For the retry: a step succeeds either at the first attempt (probability $p$), or it fails ($1 - p$), the failure is detected ($d$) and the retry succeeds ($p$); these two ways are disjoint, so $p' = p + (1 - p)dp$. An undetected failure, probability $(1 - p)(1 - d)$, ends the task in failure. We assume the retry's success probability equals $p$, i.e. that the failed attempt did not make the situation worse — an assumption real systems must earn by recovering to a known state.
:::

The product falls quickly. Eight steps at 95% each give $0.95^8 = 0.663$: one task in three fails although each step "almost always" works. The second formula shows where the leverage is: with good failure detection ($d = 0.9$) and a single retry, the per-step success rises to $0.95 + 0.05\times0.9\times0.95 = 0.9928$ and the eight-step task to $0.9928^8 = 0.943$. Detection is worth more than a better planner: it is the main subject of [[llm-robot-control/closed-loop-recovery]].

::: widget plot
f: p^x; (p + (1 - p)*d*p)^x
x: 1, 30
y: 0, 1
sliders: p=0.95:0.8:0.999:0.001; d=0.9:0:1:0.01
labels: \text{open loop } p^n; \text{detect and retry once}
hlines: 0.9
caption: Task success probability against the number of steps $n$ (read the horizontal axis as $n$). The lower curve is the open-loop product $p^n$; the upper curve adds failure detection with probability $d$ and one retry. Start at $p = 0.95$: open-loop success falls below 90% after only two steps. Raise $d$ to 1 and see how far the 90% line moves to the right; then set $d = 0$ and the two curves coincide — retries are worthless if failures are not noticed.
:::

::: example How reliable must each step be? {#ex-step-reliability}
A customer requires that 90% of twelve-step kitting tasks complete without operator intervention. What per-step reliability does this need without retries, and what first-attempt reliability suffices with $d = 0.95$ and one retry?
::: solution
Without retries, $p^{12} \ge 0.90$ gives $p \ge 0.90^{1/12} = 0.99126$: each step must succeed 99.1% of the time — a demanding figure for grasping in clutter, let alone for the language part. With detection and one retry we need $p' = p + (1 - p)(0.95)p \ge 0.99126$. This is a quadratic $-0.95p^2 + 1.95p - 0.99126 \ge 0$; its relevant root is
$$
p = \frac{1.95 - \sqrt{1.95^2 - 4(0.95)(0.99126)}}{2(0.95)} = 0.9285 .
$$
So a first-attempt reliability of about 93% is enough when failures are noticed and retried. Check: $0.9285 + 0.0715\times0.95\times0.9285 = 0.9916$ ✓. The lesson for system design is that the 6-point difference between 93% and 99% per step is bought far more cheaply with detection than with a better model.
:::
:::

## Four architectures {#sec-architectures}

There are four established ways to connect a language model to an arm. They differ in what the model outputs and therefore in what the layers below must check.

::: definition LLM-as-planner {#def-planner}
The model receives the instruction, a list of the robot's skills and a scene description, and outputs a **sequence of skill invocations** in a fixed vocabulary, for example `[pick(cartridge_3), place(cartridge_3, shelf_2)]`. A conventional executor validates and runs each skill. SayCan (2022) is the classic example; [[llm-robot-control/grounded-task-planning]] develops it.
:::

::: definition LLM-as-programmer {#def-programmer}
The model writes a **short program** — usually Python — against a documented robot API with perception queries (`detect`, `get_pose`) and actions (`move_to`, `grasp`, `place`). The program can contain loops, conditionals and arithmetic, so one generation can express "pick every red part and place them in a row 5 cm apart". The program runs in a sandbox that checks every API call. Code as Policies (2022) is the classic example; see [[llm-robot-control/code-as-policies]].
:::

::: definition LLM-as-tool-caller {#def-toolcaller}
The robot's capabilities are exposed as **typed tools** with JSON schemas, and the model calls them one or a few at a time in an agent loop, reading each tool's result before deciding the next call. This is the function-calling interface that all major LLM APIs offered by 2024, and the one that the Model Context Protocol (MCP) standardises; see [[llm-robot-control/robot-tool-calling]].
:::

::: definition End-to-end vision-language-action model {#def-vla}
A **vision-language-action (VLA) model** is a single network that maps camera images and an instruction directly to low-level actions (end-effector or joint targets) at control rate, typically 5–50 Hz. It is trained on robot demonstration data rather than prompted; the [[vision-language-action/vla-architectures]] chapter of the VLA course describes it. A VLA can serve as one skill under an LLM planner — the hierarchical arrangement of [[llm-robot-control/closed-loop-recovery]].
:::

The first three keep the model *above* a verified stack and differ in granularity. A planner chooses from a menu; a programmer writes a recipe; a tool caller converses with the robot one call at a time. The fourth puts learned behaviour *into* the stack.

| | planner | programmer | tool caller | end-to-end VLA |
|---|---|---|---|---|
| model output | skill sequence | Python program | JSON tool calls | actions at 5–50 Hz |
| model calls per task | 1 (plus replans) | 1 (plus repairs) | 3–20 | continuous |
| what is checked | skill names, preconditions | code (static checks), every API call | schema, every call | output limits, safety layer |
| handles loops/arithmetic | poorly | well | moderately | not applicable |
| reacts to new observations | between steps | only if program polls | after every call | every control cycle |
| needs robot training data | no (skills already exist) | no | no | yes, substantial |
| typical failure | wrong skill order | subtle logic bug | long, slow loops | unpredictable out-of-distribution motion |

How to choose? The decision depends less on the model than on the cell.

::: algorithm Choosing an architecture {#alg-choose}
1. **List the skills the cell already has** and how they are validated. If the tasks are compositions of existing, reliable skills (pick, place, open fixture, scan), start with a planner or tool caller: the LLM only has to choose and order.
2. **Check whether tasks need arithmetic, loops or spatial patterns** ("every third slot", "a 4 × 5 grid with 30 mm pitch"). If so, add code generation for that layer, or provide skills that take the pattern as a parameter.
3. **Check how much the scene changes during a task.** If later steps depend on what earlier steps revealed (opening a box to see what is inside), prefer the tool-calling loop, which observes after each call.
4. **Check whether the required motions can be programmed at all.** Deformable objects, cable routing, wiping and other contact-rich skills that resist classical programming are candidates for a learned policy (a VLA or a smaller learned skill), placed *under* the language layer.
5. **Check the latency budget** against the figures of the next section. A per-call delay of 1–3 s is acceptable for a kitting command; it is not acceptable inside a control loop.
6. **Whatever you choose, put the same hard limits below it** — workspace, speed, force, collision checking — and log every model output with the checks it passed.
:::

Most production systems in 2026 are hybrids: a tool-calling agent whose tools include a planner for multi-step sequences, a sandboxed code tool for patterns, and one or two learned skills for contact-rich steps.

::: quiz
A food-packaging line receives orders such as "fill the tray with three of each flavour, alternating, chocolate in the corners". The pick-and-place skill is reliable; the packing pattern changes with every order. Which architecture handles the pattern most naturally?
- [ ] An end-to-end VLA, because the task is visual
- [ ] A planner choosing among `pick` and `place` with fixed slot names
- [x] Code generation: a short program that computes the slot sequence and calls the existing skill
- [ ] None: the LLM cannot help with packing patterns
::: solution
The difficulty is combinatorial and arithmetic (alternation, corner constraints, counts), which a short program expresses in a few lines and which can be checked before anything moves — for instance by simulating the resulting tray layout. A planner could list the 3 × $k$ placements one by one, but long flat lists are where LLMs make counting errors. A VLA would need demonstrations of every pattern. The pick-and-place motion itself stays a validated skill in all cases.
:::
:::

## Latency and cost {#sec-latency}

A robot that pauses for ten seconds before every move feels broken, and a model call on every control cycle is impossible. The numbers decide where in the stack a language model can sit. They change quickly; the values below are typical **as of 2026** for hosted frontier models and should be re-measured for your own deployment.

The time for one model call is dominated by two terms: the **time to first token** $t_{\text{ft}}$ (network round trip, queueing and processing the input, which grows with input length), and the generation of $N_{\text{out}}$ output tokens at a rate $r$:
$$
T_{\text{call}} \approx t_{\text{ft}} + \frac{N_{\text{out}}}{r} .
$$ {#eq-call-latency}
This is a model, not a law: it ignores network jitter and the variation of $r$ with server load, and models that "think" before answering add hidden reasoning tokens to $N_{\text{out}}$. As of 2026, typical values for hosted mid-size frontier models are $t_{\text{ft}} \approx 0.3$–$1.5\,\mathrm s$ and $r \approx 50$–$200$ tokens/s; a small model served on a local GPU can reach $t_{\text{ft}} < 0.1\,\mathrm s$ with lower capability. A token is roughly three-quarters of an English word, and a JSON tool call with a pose is 50–150 tokens. Prices for hosted models are quoted per million tokens; as of late 2026 a mid-tier model of a major provider costs on the order of \$2 per million input tokens and \$10 per million output tokens, small models one to two orders of magnitude less. Repeated prefixes (system prompt, tool definitions) can be **cached** by most providers at a fraction of the input price.

::: example Latency and cost of a tool-calling command {#ex-latency}
A tool-calling agent handles "put the three bolts in the left tray". It needs five model turns (detect, then pick/place calls, then a final report). Each turn generates about 150 tokens; the input is a 6,000-token prefix (system prompt, tool schemas, scene) that grows by about 300 tokens per turn as tool results are appended. Take $t_{\text{ft}} = 0.8\,\mathrm s$, $r = 80$ tokens/s, \$2 per million input tokens and \$10 per million output tokens, no caching. Estimate the model time and the cost per command, and the daily cost for 1,000 commands.
::: solution
Per turn, by [[#eq-call-latency]], $T = 0.8 + 150/80 = 2.675\,\mathrm s$; five turns give $13.4\,\mathrm s$ of model time, *in addition* to the motion time (perhaps $15$–$20\,\mathrm s$ for three pick-and-place cycles). Input tokens over the five turns: $6000 + 6300 + 6600 + 6900 + 7200 = 33{,}000$, costing $33{,}000\times\$2\times10^{-6} = \$0.066$; output $750$ tokens cost $\$0.0075$. Total about $\$0.074$ per command, or $\$74$ per day at 1,000 commands. Two observations: input dominates cost (resending the prefix every turn), which is why prefix caching pays; and model time is comparable to motion time, which is why the planner and code architectures — one model call per task — are attractive when the scene is predictable. A code-generation call producing 400 tokens costs $0.8 + 400/80 = 5.8\,\mathrm s$ once.
:::
:::

::: widget plot
f: x*(tft + Nout/r)
x: 0, 20
y: 0, 60
sliders: tft=0.8:0.1:2:0.05; Nout=150:20:600:10; r=80:20:300:5
labels: \text{model time per task (s)}
hlines: 10
caption: Total model time (s) against the number of model calls per task $n$ (horizontal axis), for time to first token $t_{\text{ft}}$, output tokens per call $N_{\text{out}}$ and generation rate $r$ in tokens/s. The horizontal line at 10 s is a rough limit of operator patience for a short command. Notice that halving $N_{\text{out}}$ — terse tool calls instead of chatty explanations — helps as much as doubling $r$; and that a tool-calling loop with 15 calls is slow at any realistic setting, which motivates tools that do more per call.
:::

Three consequences shape the architectures of later chapters. **Never put a hosted model in a control loop**: at 1–3 s per call it can choose the next subtask, not the next joint target; joint control stays at 1 kHz in the controller and trajectory streaming at 100–500 Hz. **Make each call do a meaningful amount of work**: a `pick_and_place(object, target)` tool beats separate `move_to`, `open_gripper`, `move_to`, `close_gripper` calls. **Plan for the network failing**: the arm must be safe and stationary, or able to finish its current skill, if the model does not answer.

::: example A VLA's latency budget, for comparison {#ex-vla-rate}
A VLA running on a local GPU produces an "action chunk" of 16 end-effector targets for the next $0.8\,\mathrm s$ in $80\,\mathrm{ms}$ of inference. How many chunks per second can it produce, and what fraction of the time does it spend on inference if it replans every $0.4\,\mathrm s$ (executing half of each chunk)?
::: solution
At $80\,\mathrm{ms}$ per inference it could produce $12.5$ chunks per second. Replanning every $0.4\,\mathrm s$ uses $0.08/0.4 = 20\%$ of the GPU time, and the targets are spaced $0.8/16 = 50\,\mathrm{ms}$ apart (20 Hz), which a lower-level controller interpolates. Compare a hosted LLM call of $1$–$3\,\mathrm s$: 10–40 times slower than one VLA chunk. The two belong at different levels of the hierarchy — the VLA turns "pick the cable" into motion, the LLM decides that picking the cable is the next thing to do.
:::
:::

## Where the language model sits {#sec-stack}

Putting the pieces together, a language-commanded arm has five layers, each running at its own rate and each able to refuse the request of the layer above:

1. **Interaction** (seconds): speech or text in, confirmations and questions out.
2. **Language model** (seconds per call): plans, writes code or calls tools; sees skills, limits, scene summaries and results.
3. **Skills and perception** (tens of milliseconds to seconds): open-vocabulary detection, grasp planning, pick, place, insert; each skill checks its own preconditions.
4. **Motion planning and trajectory generation** (milliseconds to a second): collision-free paths and time-scaled trajectories as in [[robotics/motion-planning-perception]] and [[robotics/trajectory-planning]].
5. **Control and safety** (1 kHz and faster): joint servo loops, the safety-rated controller with its speed, force and zone limits ([[robot-arm-design/arm-safety]]).

Commands flow down and are checked at every level; observations flow up and are summarised at every level. The language model never sees raw joint torques and never sends them. That separation is the single most important design decision in the course: it means a wrong answer from the model produces, at worst, a refused request or a skill that does something sensible but unwanted — not an uncontrolled motion.

::: history
Terry Winograd's SHRDLU (MIT, 1968–1970) answered questions and obeyed English commands in a simulated world of coloured blocks, parsing sentences into procedures with hand-written grammars; it impressed everyone and generalised to nothing outside its world. Shakey (SRI, 1966–1972) was the first mobile robot to reason about its own actions, using the STRIPS planner of Richard Fikes and Nils Nilsson (1971). Through the 1990s and 2000s, "natural-language interfaces" for robots meant semantic parsers mapping restricted English to logical forms (for instance the probabilistic grounding graphs of Tellex et al., 2011). The arrival of large pretrained language models changed the picture: in 2022 Google's SayCan combined a 540-billion-parameter language model with learned skill value functions on a mobile manipulator, Code as Policies had a model write robot programs, and Inner Monologue fed observations back to the model. In 2023 RT-2 and PaLM-E brought vision and language into a single model producing actions, opening the end-to-end VLA line. By 2025–2026 function-calling APIs and the Model Context Protocol had made "LLM as tool caller" the default industrial interface.
:::

::: summary
- LLMs know semantic affordances, task structure and everyday object knowledge; they do not know metric geometry, the robot's body, the current scene, the available skills or contact dynamics.
- Plans that are fluent but physically impossible are **hallucinated feasibility** ([[#def-hallucinated-feasibility]]); every proposed action must be checked by components that know the robot.
- **Grounding** ([[#def-grounding]]) ties words to detections, skills and geometric predicates — through the inputs, the allowed outputs and feedback.
- Multi-step success is a product, $P = \prod p_i$ ([[#prop-compound]]); detection of failures with retry lifts the per-step reliability to $p + (1 - p)dp$ and is cheaper than a better model.
- Four architectures: planner (skill sequence), programmer (code against an API), tool caller (typed calls in a loop), end-to-end VLA (actions at control rate); production systems mix them.
- As of 2026 a hosted model call costs about $0.3$–$1.5\,\mathrm s$ plus $N_{\text{out}}/r$ with $r \approx 50$–$200$ tokens/s; keep models out of control loops and make each call do substantial work.
- The model sits above skills, planning and a safety-rated controller; it never sends motor commands.
:::

## Exercises

::: exercise Ten steps {level=1 check="0.737"}
A task has ten steps, each succeeding with probability $0.97$, with no retries. What is the probability that the task succeeds? (Enter the probability to three decimal places.)
::: solution
By [[#prop-compound]], $P = 0.97^{10} = 0.737$. More than a quarter of the tasks fail although each step works 97% of the time.
:::
:::

::: exercise Within reach? {level=1 check="0.778"}
An arm with a reach of $0.90\,\mathrm m$ (from the shoulder) has its shoulder $0.80\,\mathrm m$ above the floor. A bin sits $0.25\,\mathrm m$ above the floor, $0.55\,\mathrm m$ horizontally from the shoulder axis. What is the distance from the shoulder to the bin, and is the bin within reach? (Enter the distance in m to three decimal places.)
::: solution
The bin is $0.80 - 0.25 = 0.55\,\mathrm m$ below the shoulder and $0.55\,\mathrm m$ in front of it, so $d = \sqrt{0.55^2 + 0.55^2} = \sqrt{0.605} = 0.778\,\mathrm m < 0.90\,\mathrm m$. The flange can reach the point, but the margin of $0.12\,\mathrm m$ must still accommodate the gripper length and the approach direction, so the feasibility check must be done with inverse kinematics for the full grasp pose, not with the distance alone.
:::
:::

::: exercise Latency of one call {level=1 check="2.5"}
A model has a time to first token of $0.5\,\mathrm s$ and generates $100$ tokens/s. How long does a call producing a 200-token tool call take? (Enter the time in s.)
::: solution
By [[#eq-call-latency]], $T = 0.5 + 200/100 = 2.5\,\mathrm s$.
:::
:::

::: exercise Required step reliability {level=2 check="0.99126"}
What per-step success probability is needed for a twelve-step task to succeed 90% of the time without retries? (Enter the probability to five decimal places.)
::: solution
$p = 0.90^{1/12} = 0.99126$, as in [[#ex-step-reliability]].
:::
:::

::: exercise Cost with caching {level=2 check="0.0303"}
Repeat the cost estimate of [[#ex-latency]] assuming the provider caches the 6,000-token prefix: on turns 2–5 those 6,000 tokens are billed at \$0.20 per million instead of \$2 per million, while the first turn and the tokens added after the prefix are billed at the full rate; output as before. What is the cost per command? (Enter the cost in dollars to four decimal places.)
::: solution
First turn: $6000$ tokens at full rate, $\$0.012$. Turns 2–5: cached prefix $4\times6000 = 24{,}000$ tokens at $\$0.20$ per million, $\$0.0048$; uncached growth $300 + 600 + 900 + 1200 = 3000$ tokens at $\$2$ per million, $\$0.006$. Output $750$ tokens, $\$0.0075$. Total $0.012 + 0.0048 + 0.006 + 0.0075 = \$0.0303$, about 41% of the uncached $\$0.0735$. Output is now a quarter of the bill, so terse tool calls matter for cost as well as latency.
:::
:::

::: exercise What the model cannot know {level=2}
For the command "Hand me the 10 mm socket from the drawer", list everything the robot system must know that a language model given only the sentence cannot know, and for each item name the component that should supply it.
::: solution
(1) Which drawer, and where it is: the scene map or a perception query. (2) Whether the drawer is open, and whether the arm has a skill to open it: the skill library with preconditions, perception of the drawer state. (3) Which object is the 10 mm socket among many similar sockets: open-vocabulary detection plus, ideally, a fiducial or known storage layout, because "10 mm" is printed small and a VLM can easily misread it. (4) Whether the socket is reachable and graspable: inverse kinematics and grasp planning on its measured pose. (5) Where "me" is, and how to hand over safely: person detection, a handover skill with reduced speed and force limits, and the collaborative-operation limits of the safety controller. (6) Whether anyone else is in the workspace: the safety system, not the model. The model contributes the decomposition — open drawer, find socket, pick, hand over — and the resolution of "10 mm socket" to an object class.
:::
:::

::: exercise Detection versus first-attempt reliability {level=2}
A team can either (a) raise the first-attempt step success from $0.92$ to $0.96$ by switching to a larger model, or (b) keep $p = 0.92$ and add a success detector with $d = 0.85$ and one retry. Which gives the higher success for a ten-step task?
::: solution
(a) $0.96^{10} = 0.665$. (b) $p' = 0.92 + 0.08\times0.85\times0.92 = 0.9826$, and $0.9826^{10} = 0.839$. Detection with retry wins clearly. Combining both, $p' = 0.96 + 0.04\times0.85\times0.96 = 0.9926$ and $0.9926^{10} = 0.928$.
:::
:::

::: exercise Retrying more than once {level=3}
Generalise [[#eq-retry-once]] to up to $k$ retries, each failure being detected independently with probability $d$ and each attempt succeeding with probability $p$. Show that the step success probability is
$$
p'_k = p\sum_{j=0}^{k}\bigl((1-p)d\bigr)^j = p\,\frac{1 - ((1 - p)d)^{k+1}}{1 - (1 - p)d},
$$
and find its limit as $k\to\infty$. What does the limit say about the value of more retries when $d < 1$?
::: solution
The step succeeds at attempt $j + 1$ ($j = 0, \dots, k$) if the first $j$ attempts fail and are each detected — probability $((1 - p)d)^j$ — and attempt $j + 1$ succeeds, probability $p$. The events for different $j$ are disjoint, so $p'_k$ is the sum, a geometric series with ratio $q = (1 - p)d < 1$, giving the closed form. As $k\to\infty$, $p'_\infty = p/(1 - (1 - p)d)$. For $p = 0.95$, $d = 0.9$: $p'_1 = 0.99275$, $p'_\infty = 0.95/0.955 = 0.99476$. The ceiling is set by undetected failures: the probability of eventual undetected failure is $1 - p'_\infty = (1 - p)(1 - d)/(1 - (1 - p)d)$. Beyond one or two retries, improving $d$ is the only lever — and in practice retries also cost time and may worsen the scene.
:::
:::

::: exercise Choosing an architecture for a product {level=3}
Your company sells a 7 kg-payload arm for machine tending. Customers want to say things like "load the next five blanks from the left pallet, skip any that are scratched" and "after this batch, switch to the long gripper". Using [[#alg-choose]], propose an architecture, state which components already exist and which must be built, and identify the two failure modes you would test first.
::: solution
A reasonable answer: a tool-calling agent on top of the existing machine-tending skills. Existing: pallet pick with known pallet geometry, machine door/chuck interface, tool changer, the safety controller. Tools to expose: `list_pallet_slots`, `inspect_blank(slot)` (a VLM or classical vision check for scratches returning a score and an image crop for logging), `load_blank(slot)`, `change_gripper(name)`, `get_cell_state`. Skips and counts ("next five", "skip scratched") are simple logic the agent can handle over several calls, or a small sandboxed code tool if patterns become complex. No VLA is needed: the motions are structured and already programmed. Hard limits stay in the controller and the skills (machine-door interlock, payload check on gripper change). First failure modes to test: (1) the scratch inspection — false accepts send bad parts into the machine, so log every decision and measure precision and recall on held-out parts; (2) state confusion in counting — the agent loads six or four blanks, or loses count after a retried pick; test with scripted scenarios where a pick fails mid-sequence and check the final count against the cell's own counter, which should be the source of truth rather than the model's memory.
:::
:::
