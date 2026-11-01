The previous chapter ended with a warning: a language model will happily produce a plan that reads well and cannot run. This chapter is about producing plans that *can* run. The idea common to every method here is to separate two questions that a person answers together without noticing: **is this step useful for the instruction?** — a question about meaning, where a language model is strong — and **can the robot do this step now?** — a question about the robot and the scene, where the model knows nothing unless we tell it. We develop the vocabulary of skills with preconditions and effects, the SayCan rule that multiplies a language score by a feasibility score, the LLM+P pattern in which the model translates a request into a formal planning problem that a classical planner solves, the validation of any plan by symbolic simulation and geometric checks before the arm moves, and the Inner-Monologue pattern of feeding results back so that the plan can be corrected as it runs. The motivation and the four architectures are in [[llm-robot-control/language-and-robots]]; classical planning is treated at length in Russell and Norvig, and the LLM side of task decomposition in the LLM Atlas chapter [Planning and task decomposition](/learn/llm/lesson.php?c=agents&l=planning).

## Skills: the vocabulary of plans {#sec-skills}

A robot that is commanded in language still needs a fixed vocabulary of things it can do. In a cell that vocabulary is the **skill library**: the pick, place, insert, open-fixture and scan routines that integrators have programmed, tuned and validated. A planner, whether it is a person, a classical algorithm or an LLM, composes these skills; it does not invent new motions.

::: definition Skill {#def-skill}
A **skill** is a parameterised robot behaviour $\sigma(\theta)$ — for example `pick(object)` or `place(object, location)` — together with
- a **precondition** $\operatorname{pre}_\sigma(\theta)$: a set of facts that must hold before execution (the gripper is empty, the object is visible and reachable);
- **effects**: facts the skill makes true, $\operatorname{add}_\sigma(\theta)$, and facts it makes false, $\operatorname{del}_\sigma(\theta)$ (after `pick(bolt)` the robot is holding the bolt and the bolt is no longer on the bench);
- a **success check**: a test, run after execution, of whether the intended effects were actually achieved (the gripper's finger position shows an object, a camera confirms the bolt is no longer on the bench).
The facts are **predicates** over the scene's objects, such as `at(bolt, bench)` or `hand_empty`. Preconditions and effects form the skill's **symbolic model**; the success check connects the model to reality.
:::

Here is a small skill library for a kitting cell, written as a table that can be pasted into a prompt or turned into tool schemas:

| skill | parameters | precondition | effects (add / delete) | success check |
|---|---|---|---|---|
| `pick` | part $p$, slot $s$ | `at(p,s)`, `hand_empty` | + `holding(p)`, `free(s)` / − `at(p,s)`, `hand_empty` | finger width in object band; slot empty in image |
| `place` | part $p$, slot $s$ | `holding(p)`, `free(s)` | + `at(p,s)`, `hand_empty` / − `holding(p)`, `free(s)` | finger open; part detected in slot |
| `scan` | slot $s$ | — | updates `at(·, s)` from vision | detector returns |
| `open_fixture` | fixture $f$ | `closed(f)`, `hand_empty` | + `open(f)` / − `closed(f)` | door sensor |

Two features of this table recur throughout the course. Preconditions are *checkable*: each predicate can be evaluated by a perception query or a sensor before the skill runs. And the symbolic model is a *simplification*: `pick` can fail although its precondition holds (the part slips), so the success check is not optional.

::: remark Granularity
How large should a skill be? If skills are tiny (`move_to`, `close_gripper`), plans are long, the language model must reason about geometry, and errors compound as in [[llm-robot-control/language-and-robots#prop-compound]]. If skills are huge (`do_kitting_order`), the model has little to decide. A good rule is that a skill should be the largest unit that an integrator can validate on its own and that the operator would name in a sentence: "pick the bolt", "load the machine", "open the fixture".
:::

## SayCan: usefulness times feasibility {#sec-saycan}

The first system to ground an LLM planner in a real robot's abilities at scale was SayCan (Ahn et al., 2022, "Do As I Can, Not As I Say"). Its idea is simple enough to state in one line and important enough to derive carefully.

At each step the robot has a finite set of candidate skills $\pi$ (each with its parameters filled in: `pick(m6_bolt)`, `place(left_tray)` …), each with a short text description $\ell_\pi$. Given the instruction $i$ and the history of skills already executed, we want the skill that is most likely to make progress. Call $c_\pi$ the event "executing $\pi$ now succeeds", and $u_\pi$ the event "$\pi$ is a useful next step for $i$".

::: proposition SayCan scoring rule {#prop-saycan}
Suppose that, given the instruction and history, whether a skill is useful does not depend on whether it would succeed, and whether it would succeed depends only on the current state $s$. Then
$$
\Prob(u_\pi \cap c_\pi \mid i, s) = \underbrace{\Prob(u_\pi \mid i)}_{\text{language model}}\;\cdot\;\underbrace{\Prob(c_\pi \mid s)}_{\text{affordance value}},
$$ {#eq-saycan}
and choosing the skill that maximises this product chooses the step most likely to be *both* useful and successful. The first factor is estimated from the language model's likelihood of the text $\ell_\pi$ following a prompt containing $i$ and the history, normalised over the candidates; the second from a value function or success classifier trained for each skill on the robot.
:::

::: proof
For any two events, $\Prob(u\cap c\mid i, s) = \Prob(u\mid i, s)\,\Prob(c\mid u, i, s)$. The first assumption ("usefulness is decided by the instruction, not by the robot's state, and is independent of success") gives $\Prob(u\mid i, s) = \Prob(u\mid i)$; the second ("success depends only on the state") together with conditional independence of $c$ and $u$ gives $\Prob(c\mid u, i, s) = \Prob(c\mid s)$. Multiplying yields [[#eq-saycan]]. The maximiser of the product is then by definition the candidate with the highest probability of being both useful and successful. Neither assumption holds exactly — a skill that cannot succeed is arguably not useful — which is why the rule can make the mistakes shown below.
:::

In SayCan the language factor came from PaLM (a 540-billion-parameter model) scoring each skill description, and the affordance factor from value functions learned by reinforcement learning on a mobile manipulator in an office kitchen. The authors reported that on 101 instructions PaLM-SayCan chose a correct sequence of skills 84% of the time and executed it successfully 74% of the time. In an industrial cell the affordance factor is usually not learned at all: it is computed from perception and kinematics — is the object detected with high confidence, is there a collision-free inverse-kinematics solution for the grasp, is the gripper empty.

::: algorithm SayCan planning loop {#alg-saycan}
Input: instruction $i$; skill set $\Pi$ with text descriptions $\ell_\pi$ and affordance functions $v_\pi(s)\in[0,1]$; termination skill `done` with $v = 1$.
1. Set the history $h$ to the empty list.
2. Observe the state $s$. For each $\pi\in\Pi$, compute the language score $u_\pi$: the model's probability of $\ell_\pi$ as the next step after a prompt containing $i$ and $h$, normalised so that $\sum_\pi u_\pi = 1$.
3. Compute $v_\pi(s)$ for each $\pi$ and the combined score $u_\pi v_\pi(s)$.
4. Select $\pi^* = \arg\max_\pi u_\pi v_\pi(s)$. If $\pi^*$ is `done`, stop.
5. Execute $\pi^*$, append $\ell_{\pi^*}$ to $h$, and go to 2.
:::

::: example One step of SayCan in a kitting cell {#ex-saycan}
Instruction: "Put the M6 bolt in the left tray." The gripper is empty; an M6 bolt lies on the bench, partly hidden under a rag; an M8 bolt lies in the open. The language model's normalised scores and the affordance values from perception and inverse kinematics are:

| candidate | $u_\pi$ (language) | $v_\pi$ (affordance) |
|---|---|---|
| `pick(m6_bolt)` | 0.55 | 0.80 |
| `place(left_tray)` | 0.25 | 0.02 |
| `pick(m8_bolt)` | 0.10 | 0.92 |
| `open_drawer` | 0.05 | 0.70 |
| `done` | 0.05 | 1.00 |

Which skill is chosen? What happens after a successful pick, if the scores become `place(left_tray)` $0.70$, `place(right_tray)` $0.15$, `done` $0.10$, `pick(m8_bolt)` $0.05$, with affordances $0.95$, $0.95$, $1.00$, $0.05$? Finally, how much may the M6 bolt's affordance fall before SayCan picks the wrong bolt?
::: solution
Products: `pick(m6_bolt)` $0.55\times0.80 = 0.440$; `place(left_tray)` $0.25\times0.02 = 0.005$ (nothing to place with an empty gripper); `pick(m8_bolt)` $0.092$; `open_drawer` $0.035$; `done` $0.050$. SayCan picks the M6 bolt. Note that the language model alone gave `place(left_tray)` a quarter of its probability — "put … in the tray" — and the affordance factor removed it.

After the pick: $0.70\times0.95 = 0.665$, $0.15\times0.95 = 0.143$, $0.10\times1.00 = 0.100$, $0.05\times0.05 = 0.0025$. The robot places the bolt in the left tray; on the next step `done` will dominate.

Switching point: the wrong bolt wins when $0.55\,v < 0.092$, i.e. $v < 0.092/0.55 = 0.167$. If the rag hides enough of the M6 bolt that the grasp planner's confidence drops below about 17%, SayCan confidently picks the *M8* bolt — a feasible step that does not serve the instruction. Sanity check: the product rule trades usefulness against feasibility linearly, so a highly feasible irrelevant action can beat a barely feasible relevant one.
:::
:::

::: widget plot
f: u1*x; u2*v2; ud
x: 0, 1
y: 0, 0.6
sliders: u1=0.55:0.05:1:0.01; u2=0.1:0:0.5:0.01; v2=0.92:0:1:0.01; ud=0.05:0:0.3:0.01
labels: \text{pick(m6): } u_1 v; \text{pick(m8): } u_2 v_2; \text{done}
caption: SayCan scores against the affordance value $v$ of the intended skill (horizontal axis). The rising line is the score of `pick(m6_bolt)`, the flat lines those of the distractor `pick(m8_bolt)` and of `done`. Wherever a flat line lies above the rising one, SayCan chooses the wrong action. Increase $u_2$ — a language model that finds the two bolts more alike — and watch the crossing point move to the right. Raise the score of `done` and note that the robot may simply give up when the target is hard to grasp.
:::

The example shows the two weaknesses of the pure product. First, when the right skill is hard, the rule prefers an easy wrong one; a practical fix is to require $u_\pi$ above a threshold (refuse to act on anything the instruction does not support) and to add skills that *improve* affordance — `push_aside(rag)`, `scan(bench)` — or a skill `ask_operator`. Second, the language scores themselves need care.

::: warning Language-model scores are not calibrated probabilities
The likelihood a model assigns to a text depends on its length and phrasing as much as on its meaning. A multi-token description such as "pick up the M6 hex bolt" has a lower total probability than "pick bolt" simply because it multiplies more token probabilities, each below 1. SayCan-style scoring must therefore normalise — use the same phrasing template for every skill, compare average log-probability per token, or ask the model to choose among enumerated options — and must never be read as a calibrated "probability of being right". As of 2026 many hosted APIs do not expose token log-probabilities at all; the practical substitute is to have the model rank or select from the candidate list, with the affordance check applied afterwards as a hard filter.
:::

::: quiz
In [[#ex-saycan]], suppose the planner instead multiplies the language score by a hard feasibility *mask* — $v = 1$ if inverse kinematics and grasp detection succeed, $v = 0$ otherwise — and the M6 bolt's grasp detection just succeeds. Which skill is chosen?
- [x] `pick(m6_bolt)`, because its language score is highest among feasible skills
- [ ] `pick(m8_bolt)`, because it is more feasible
- [ ] `done`, because it always has $v = 1$
- [ ] It depends on the M8 bolt's grasp confidence
::: solution
With a binary mask, every feasible skill keeps its language score and infeasible ones drop to zero: `pick(m6_bolt)` $0.55$, `pick(m8_bolt)` $0.10$, `open_drawer` $0.05$, `done` $0.05$, `place` $0$. The masked rule never trades usefulness for "easier", which is why industrial systems often prefer a mask plus a confidence threshold on perception to the continuous product. The price is that a barely feasible grasp is attempted with full confidence, so the success check after the pick becomes essential.
:::
:::

## Formal planning with an LLM translator {#sec-pddl}

SayCan decides one step at a time, greedily. For tasks with real constraints — swap two parts using a free buffer slot, stack in a specific order, respect "heavy parts first" — greedy choices fail and lists written by the model in one go often violate a precondition halfway through. Classical AI solved such problems decades ago with planners that search over states, given a formal model of the actions. The modern combination lets each component do what it is good at.

::: definition PDDL domain and problem {#def-pddl}
The **Planning Domain Definition Language (PDDL)**, introduced for the 1998 International Planning Competition by Drew McDermott and colleagues and descended from STRIPS (1971), describes a planning task in two parts. A **domain** declares types, predicates and actions, each action with parameters, a precondition and an effect — the symbolic model of [[#def-skill]]. A **problem** declares the objects, the initial state (a set of true ground predicates; everything not listed is false) and the goal (a condition on the final state). A **plan** is a sequence of ground actions whose preconditions hold in turn, starting from the initial state, and after which the goal holds.
:::

The kitting skills of the table above, in PDDL:

```lisp
(define (domain kitting)
  (:requirements :strips :typing)
  (:types part slot)
  (:predicates (at ?p - part ?s - slot) (holding ?p - part)
               (hand-empty) (free ?s - slot))
  (:action pick
    :parameters (?p - part ?s - slot)
    :precondition (and (at ?p ?s) (hand-empty))
    :effect (and (holding ?p) (free ?s) (not (at ?p ?s)) (not (hand-empty))))
  (:action place
    :parameters (?p - part ?s - slot)
    :precondition (and (holding ?p) (free ?s))
    :effect (and (at ?p ?s) (hand-empty) (not (holding ?p)) (not (free ?s)))))
```

In the **LLM+P** pattern (Liu et al., 2023) the language model does not plan. It translates:

1. The natural-language request and a scene summary become a PDDL **problem** file, written by the model against the fixed, hand-written **domain**. A worked example of a similar problem in the prompt makes this translation far more reliable.
2. A classical planner — Fast Downward and similar search-based planners are standard — finds a plan, or proves within a time limit that none exists.
3. The plan is executed skill by skill, and optionally the model turns it back into a sentence for the operator.

::: example Swapping two parts {#ex-swap}
Part $a$ is in slot $A$ and part $b$ in slot $B$; slot $C$ is free; the gripper is empty. The operator says "swap the two parts". Write the PDDL problem, find a plan, and compare with the four-step plan a language model typically writes directly: pick $a$ from $A$, place $a$ in $B$, pick $b$ from $B$, place $b$ in $A$.
::: solution
The problem:
```lisp
(define (problem swap)
  (:domain kitting)
  (:objects a b - part  A B C - slot)
  (:init (at a A) (at b B) (free C) (hand-empty))
  (:goal (and (at a B) (at b A))))
```
A planner returns the shortest plan, six actions: `pick a A`, `place a C`, `pick b B`, `place b A`, `pick a C`, `place a B`. The model's four-step plan fails at step 2: `place a B` requires `free B`, but $b$ is still there. In the real cell the arm would try to put a part on top of another; in the symbolic model the precondition simply does not hold. No four-step plan exists, because each part must be moved at least once and one of them twice (a single gripper and no free target slot) — the planner's search proves this. Sanity check: three moves of two actions each, six actions.
:::
:::

The division of labour is the point. Translation from words to a goal is a language task, at which models are good; searching through orderings while tracking preconditions is a combinatorial task at which they are unreliable and planners are exact. The weak link moves to the translation: a wrong object name, a missing initial fact or a goal that says less than the operator meant. Those errors are easier to catch than a subtly wrong plan, because the problem file is short and can be checked against the perceived scene — every object in it must be a detected object; every `at` fact must match a detection.

::: remark Beyond STRIPS
Real cells need more than STRIPS: numeric fluents (payload, count of parts), durative actions, and above all geometry — "place" is possible only if there is a collision-free placement pose. **Task and motion planning (TAMP)** interleaves symbolic search with calls to motion planners and grasp samplers so that a symbolic plan is accepted only once each step has a geometric realisation. TAMP systems are the industrial-strength version of the validation described next; an LLM can sit on top of one exactly as in LLM+P.
:::

## Validating a plan before execution {#sec-validation}

Whatever produced a plan — SayCan, LLM+P, a model writing a list, a human — it should pass three checks before the arm moves. The first is cheap and exact given the symbolic model.

::: proposition Soundness of symbolic plan validation {#prop-validation}
Let the symbolic model consist of an initial state $s_0$ (a set of ground facts) and ground actions $a_1, \dots, a_n$ with preconditions $\operatorname{pre}(a_k)$, add lists $\operatorname{add}(a_k)$ and delete lists $\operatorname{del}(a_k)$. Define
$$
s_k = \bigl(s_{k-1}\setminus\operatorname{del}(a_k)\bigr)\cup\operatorname{add}(a_k),\qquad k = 1, \dots, n .
$$ {#eq-progression}
If $\operatorname{pre}(a_k)\subseteq s_{k-1}$ for every $k$ and the goal $G\subseteq s_n$, then executing the plan in any world that behaves exactly as the model says achieves $G$. Conversely, the first $k$ with $\operatorname{pre}(a_k)\not\subseteq s_{k-1}$ identifies the first step that the model predicts will fail.
:::

::: proof
By induction on $k$: $s_0$ is the true initial state by assumption. If $s_{k-1}$ is the true state before step $k$ and $\operatorname{pre}(a_k)\subseteq s_{k-1}$, then $a_k$ is applicable, and in a world that behaves as modelled its effect is to remove exactly $\operatorname{del}(a_k)$ and add $\operatorname{add}(a_k)$, so the true state afterwards is $s_k$ by [[#eq-progression]]. Hence $s_n$ is the true final state, and $G\subseteq s_n$ means the goal holds. For the converse, steps $1, \dots, k - 1$ are applicable by the same induction, and step $k$ has a precondition fact missing from the state the model predicts, so the model predicts it cannot run. (Applying the delete list before the add list is the STRIPS convention; it matters only for actions that both add and delete the same fact.)
:::

The proposition is only as good as its hypothesis, "a world that behaves exactly as the model says". It guarantees nothing about slipping parts or a misdetected slot, but it catches every *logical* error in a plan — wrong order, double pick, place into an occupied slot, unknown skill — in microseconds. A validator is a dozen lines of Python:

```python
def validate(plan, state, skills, goal):
    """Symbolic validation: return (True, final_state) or (False, reason)."""
    state = set(state)
    for k, (name, args) in enumerate(plan, start=1):
        if name not in skills:
            return False, f"step {k}: unknown skill {name!r}"
        sk = skills[name]
        if len(args) != len(sk.params):
            return False, f"step {k}: {name} expects {len(sk.params)} arguments"
        b = dict(zip(sk.params, args))                    # bind parameters
        ground = lambda atoms: {tuple(b.get(t, t) for t in a) for a in atoms}
        missing = ground(sk.pre) - state
        if missing:
            return False, f"step {k}: {name}{tuple(args)} needs {sorted(missing)}"
        state = (state - ground(sk.delete)) | ground(sk.add)   # eq. (progression)
    unmet = set(goal) - state
    return (False, f"goal not reached: {sorted(unmet)}") if unmet else (True, state)
```

Run on the model's four-step swap plan of [[#ex-swap]], it returns `step 2: place('a', 'B') needs [('free', 'B')]` — a message precise enough to send straight back to the language model as feedback for a corrected plan.

The second and third checks need geometry.

::: algorithm Three-stage plan validation {#alg-validate}
Input: a candidate plan, the current scene model (detected objects with poses and uncertainties), the skill library, the robot model.
1. **Symbolic check.** Validate the plan against the skills' symbolic models by [[#prop-validation]]. Also check that every argument names an object or location that exists in the current scene. On failure, return the first failing step and the missing facts.
2. **Geometric check.** For each step, compute the poses it requires (grasp pose, pre-grasp, place pose), using the poses predicted by the earlier steps. Check that each has an inverse-kinematics solution within joint limits, that a collision-free path exists between consecutive poses (a motion-planner query, as in [[robotics/motion-planning-perception]]), and that payload and gripper stroke suffice. On failure, return the step and the reason ("no IK solution for place pose at slot C").
3. **Simulation (when available).** Execute the plan in a physics simulator initialised from the scene model, and check the goal and the absence of collisions or drops. This catches interactions the first two stages ignore — a part placed so close to another that the gripper fingers hit it, a stack that topples.
4. Only a plan that passes all stages is executed; every failure message is logged and can be returned to the planner for repair.
:::

::: example Geometric validation catches a reach problem {#ex-geometric}
A plan passes the symbolic check: `pick(housing, tray_1)`, `place(housing, fixture)`. The housing in tray 1 sits at $(0.62, -0.31, 0.08)\,\mathrm m$ in the base frame; the gripper must approach from above with the tool point $0.15\,\mathrm m$ above the grasp point for the pre-grasp. The arm's reachable workspace for a vertical tool orientation is, to a good approximation, a cylinder about the base axis with radius $0.75\,\mathrm m$ and height range $0$–$0.70\,\mathrm m$. Do the grasp and pre-grasp lie in it?
::: solution
Horizontal distance from the base axis: $\sqrt{0.62^2 + 0.31^2} = \sqrt{0.3844 + 0.0961} = 0.693\,\mathrm m < 0.75\,\mathrm m$. Heights: grasp $0.08\,\mathrm m$, pre-grasp $0.23\,\mathrm m$, both in range. Both poses pass this coarse test, so the planner proceeds to a full inverse-kinematics query and a collision check. Had the tray been placed $0.1\,\mathrm m$ further out, at a radius of about $0.79\,\mathrm m$, the step would fail here with a message naming the step and the pose — information the language model can use ("the housing in tray 1 is out of reach; ask the operator to move the tray or use the second robot"). A coarse workspace test is useful as a fast first filter; the inverse-kinematics solution remains the authority.
:::
:::

::: example What validation saves {#ex-validation-value}
A planner produces plans with a logical or geometric error 8% of the time. A validator catches 90% of these. Over 1,000 commands, how many erroneous plans reach the arm, with and without the validator? If each erroneous execution costs on average 4 minutes of operator recovery, what is saved per 1,000 commands?
::: solution
Without validation $1000\times0.08 = 80$ erroneous plans execute; with it $80\times(1 - 0.9) = 8$. The 72 caught plans are returned to the planner and most are repaired in a few seconds. Recovery time saved: $72\times4 = 288$ minutes, almost five hours of operator time per 1,000 commands, for a check that costs milliseconds (symbolic) to about a second (motion-planner queries) per plan. The 8 that slip through are mostly errors outside the model — the reason success detection is still needed.
:::
:::

## Feedback during execution: Inner Monologue {#sec-monologue}

Validation checks a plan against the scene *as it was perceived* before execution. Execution then changes the scene, sometimes not as intended. In **Inner Monologue** (Huang et al., 2022) the planner's prompt is a running transcript into which the system writes, in plain text, what happened after each step: whether the step succeeded, what objects the camera now sees, and anything a human said. The language model plans the next step after reading this transcript, so it can retry, choose a different object, or ask a question.

A transcript for the bolt task might read:

```text
Human: Put the M6 bolt in the left tray.
Scene: m6_bolt (bench, partly covered by rag), m8_bolt (bench), left_tray (empty), right_tray (empty)
Robot action: pick(m6_bolt)
Success: no — gripper closed fully, no object detected
Scene: m6_bolt (bench, under rag), rag (bench)
Robot action: push_aside(rag)
Success: yes
Scene: m6_bolt (bench, fully visible), rag (bench, moved), ...
Robot action: pick(m6_bolt)
Success: yes
Robot action: place(m6_bolt, left_tray)
Success: yes
Robot action: done
```

Inner Monologue distinguished several kinds of textual feedback: **success detection** (did the last skill achieve its effect?), **passive scene description** (what the perception system currently reports), **active scene description** (answers to questions the model asks, such as "is the drawer open?") and **human feedback**. All of them are ordinary text in the model's context, which makes the pattern easy to implement with any model; their reliability depends entirely on the detectors that produce them. The feedback loop is developed fully in [[llm-robot-control/closed-loop-recovery]].

::: warning Feedback text is an input, not an oracle
The model treats everything in its transcript as true. A success detector that reports "yes" when the part fell back into the tray makes the planner continue confidently with a wrong picture of the world; a scene description that omits an object makes the planner forget it. Measure the precision and recall of every feedback source on its own, log what was written into the transcript, and let the *cell's own state* (counters, sensors, the symbolic state from validation) remain the source of truth where it exists. Text from the scene — labels, notes, screens — must also never be pasted into the transcript as if it were an instruction; see [[llm-robot-control/llm-guardrails]].
:::

::: history
STRIPS (Fikes and Nilsson, 1971) gave the Shakey robot the precondition–add–delete representation of actions still used today, and PDDL (McDermott et al., 1998) standardised it for the International Planning Competitions, which drove two decades of progress in heuristic search planners such as Fast Downward (Helmert, 2006). Task and motion planning grew from the 2000s onwards to connect symbolic plans to geometry. The language-model era began in 2022: Huang, Abbeel, Pathak and Mordatch showed that LLMs can act as zero-shot planners when their free-text steps are mapped to admissible actions; SayCan (Ahn et al., Google and Everyday Robots) multiplied language scores by learned affordances on a real robot; Inner Monologue (Huang et al.) added textual feedback; and ProgPrompt (Singh et al.) prompted models with program-like plans. LLM+P (Liu et al., 2023) returned to classical planners, using the model only as a translator into PDDL, and a line of 2023–2024 work studied how often LLM-written plans are actually valid, generally finding that unaided models fail on problems that require tracking many preconditions.
:::

::: summary
- A **skill** ([[#def-skill]]) has parameters, a checkable precondition, add and delete effects, and a success check; plans are sequences of skills, never raw motions.
- **SayCan** chooses the skill maximising $\Prob(\text{useful}\mid i)\cdot\Prob(\text{success}\mid s)$ ([[#prop-saycan]]); the product can prefer an easy wrong action to a hard right one, so use thresholds, binary feasibility masks and skills that improve affordance.
- Language-model likelihoods are not calibrated probabilities; normalise phrasing or have the model choose from enumerated options.
- **LLM+P**: the model translates the request into a PDDL problem against a fixed domain ([[#def-pddl]]); a classical planner finds a correct plan or proves none exists.
- **Validate before executing** ([[#alg-validate]]): symbolic progression ([[#prop-validation]]) catches logical errors exactly in microseconds; geometric checks (IK, collision, payload) and simulation catch physical ones.
- **Inner Monologue** feeds success, scene and human feedback back as text so that the plan adapts during execution; the feedback is only as good as its detectors.
:::

## Exercises

::: exercise Choosing by product {level=1 check="0.2975"}
Three candidate skills have language scores $0.40$, $0.35$, $0.25$ and affordance values $0.30$, $0.85$, $0.60$. Which does SayCan choose, and what is its combined score? (Enter the winning score.)
::: solution
Products: $0.120$, $0.2975$, $0.150$. The second skill wins with $0.2975$, although the language model preferred the first: the first is too unlikely to succeed in the current state.
:::
:::

::: exercise Switching point {level=1 check="0.4"}
A useful skill has language score $0.50$; a distractor has language score $0.20$ and affordance $1.0$. Below what affordance value of the useful skill does SayCan choose the distractor? (Enter the affordance value.)
::: solution
The distractor wins when $0.50\,v < 0.20\times1.0$, i.e. $v < 0.4$.
:::
:::

::: exercise Ground actions {level=1 check="80"}
The kitting domain above has 5 parts and 8 slots. How many ground `pick` and `place` actions are there in total?
::: solution
Each of `pick` and `place` has one part and one slot parameter: $5\times8 = 40$ groundings each, $80$ in total. A planner considers those whose preconditions hold in the current state; with one gripper, at most 5 picks are applicable when the hand is empty, and while it holds one part the other four occupy four slots, so at most 4 places (one per free slot) are applicable.
:::
:::

::: exercise Find the first failing step {level=2}
Initial state: `at(a, A)`, `at(b, B)`, `free(C)`, `free(D)`, `hand_empty`. Plan: `pick(a, A)`, `place(a, C)`, `pick(b, B)`, `place(b, C)`, `pick(a, C)`. Apply [[#prop-validation]] and report the first failing step and the missing fact.
::: solution
After step 1: `holding(a)`, `free(A)`, `at(b,B)`, `free(C)`, `free(D)`. Step 2: `at(a,C)`, `hand_empty`, `free(C)` deleted. Step 3: `holding(b)`, `free(B)`. Step 4: `place(b, C)` needs `free(C)` — false, since $a$ is in $C$. The first failing step is 4, missing `free(C)`. A corrected plan places $b$ in $D$ or in $A$.
:::
:::

::: exercise Rotating three parts {level=2 check="8"}
Parts $a, b, c$ are in slots $A, B, C$; slot $D$ is free; the goal is $a$ in $B$, $b$ in $C$, $c$ in $A$. How many actions does the shortest plan have?
::: solution
Every part must move (three moves), and since all three target slots are occupied initially, one part must first go to the buffer $D$ and later move again: four moves, each a `pick` and a `place`, so $8$ actions. For example: $a\to D$, $c\to A$, $b\to C$, $a\to B$. In general a cyclic permutation of $k$ parts with one buffer needs $k + 1$ moves, $2(k + 1)$ actions.
:::
:::

::: exercise Length bias in scoring {level=2 check="0.6816"}
A model's token log-probabilities (natural logarithms) for two skill descriptions are: "pick up the hex bolt from the bench" $(-0.4, -0.3, -0.5, -0.2, -0.6, -0.3)$ and "open drawer" $(-1.1, -0.9)$. Compare the total log-probabilities and the per-token geometric-mean probabilities. Which skill does each criterion prefer? (Enter the per-token geometric-mean probability of the first description to four decimal places.)
::: solution
Totals: $-2.3$ and $-2.0$, so total likelihood prefers "open drawer" ($e^{-2.0} = 0.135$ against $e^{-2.3} = 0.100$). Per token: $-2.3/6 = -0.383$, $e^{-0.383} = 0.6816$; $-2.0/2 = -1.0$, $e^{-1} = 0.368$. Per-token scoring strongly prefers the bolt description, in which each word was individually likely. The criterion changed the decision — which is why scoring must use a fixed phrasing template or an enumerated-choice prompt.
:::
:::

::: exercise A PDDL action for a fixture {level=2}
Extend the kitting domain with a fixture that must be open before a part can be placed in it and must be closed (clamped) before machining. Write `open-fixture`, `close-fixture` and a `place-in-fixture` action, and the goal for "load part $a$ and clamp it".
::: solution
Add predicates `(open ?f - fixture)`, `(closed ?f - fixture)`, `(in ?p - part ?f - fixture)`, `(empty ?f - fixture)`.
```lisp
(:action open-fixture :parameters (?f - fixture)
  :precondition (and (closed ?f) (hand-empty))
  :effect (and (open ?f) (not (closed ?f))))
(:action close-fixture :parameters (?f - fixture)
  :precondition (and (open ?f) (hand-empty))
  :effect (and (closed ?f) (not (open ?f))))
(:action place-in-fixture :parameters (?p - part ?f - fixture)
  :precondition (and (holding ?p) (open ?f) (empty ?f))
  :effect (and (in ?p ?f) (hand-empty) (not (holding ?p)) (not (empty ?f))))
```
Goal: `(and (in a F1) (closed F1))`. Requiring `hand-empty` for closing prevents the model from planning to clamp with a part still in the gripper; in the real cell the fixture's own interlock must enforce the same rule, because the symbolic model is not a safety function.
:::
:::

::: exercise Validator recall needed {level=3 check="0.95"}
A planner's plans contain an error 6% of the time. The customer accepts at most 3 erroneous executions per 1,000 commands. What recall (fraction of erroneous plans caught) must the validator have? (Enter the recall as a fraction.)
::: solution
Erroneous executions per 1,000: $1000\times0.06\times(1 - r)\le3$, so $1 - r\le0.05$ and $r\ge0.95$. Symbolic checks alone rarely reach this for geometric errors; the geometric and simulation stages of [[#alg-validate]] are needed, and the recall must be measured on a test set of seeded faulty plans.
:::
:::

::: exercise Greedy versus planned {level=3}
Explain, with the swap problem of [[#ex-swap]], why SayCan's greedy one-step rule may fail where LLM+P succeeds, even if every affordance is computed exactly. Then describe how you would combine the two approaches in one system.
::: solution
At the start of the swap, the most "useful-sounding" step after `pick(a, A)` is `place(a, B)` — it directly mentions the goal location — but it is infeasible (B is occupied), so its affordance is 0; the next choice might be `place(a, A)` (putting it back, feasible, useless) or `place(a, C)` (feasible, useful only as part of a longer plan). The language model must recognise that the detour through $C$ is progress, which a one-step score captures poorly; the greedy rule can loop (pick, put back, pick …). A planner searching over sequences finds the detour because it evaluates whole plans against the goal. Combination: let the LLM translate the instruction into a PDDL goal (LLM+P), plan symbolically, validate geometrically, then execute step by step with Inner-Monologue feedback; when a step fails, update the initial state from perception and re-plan with the classical planner rather than asking the LLM for the next step. The LLM is consulted again only if the goal itself is in question (an object is missing, the operator's request is ambiguous).
:::
:::

::: exercise Designing a skill library {level=3}
For a robot that assembles a small gearbox (housing, two shafts with gears, a cover, four screws), propose a skill library of six to ten skills with parameters, preconditions, effects and success checks. Explain how you chose the granularity and which success checks need sensors beyond the gripper.
::: solution
A possible library: `pick(part, location)` (pre: `hand_empty`, `at(part, location)`; check: finger width), `place(part, location)`; `insert_shaft(shaft, bore)` (pre: `holding(shaft)`, `aligned` not required as a fact — alignment is inside the skill; check: insertion depth from robot position and a force profile that ends at the expected seating force); `mesh_gears(shaft_a, shaft_b)` as a check skill (rotate the input and measure the output rotation with a camera or encoder); `place_cover(cover, housing)` (pre: both shafts inserted); `drive_screw(hole)` (pre: `holding(screwdriver)`, cover placed; check: torque–angle curve from the screwdriver controller reaches the target torque within an angle window); `change_tool(tool)`; `inspect(assembly)` (camera). Granularity: each skill is a unit an integrator can tune and test alone and that an operator would name. Force/torque sensing (insertion, screwdriving) and vision (gear mesh, inspection) are needed because gripper state alone cannot confirm contact tasks. The symbolic model records what each success check confirms, so validation and replanning use measured, not assumed, state.
:::
:::
