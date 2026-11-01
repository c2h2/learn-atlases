A plan that has been validated, a program that has passed its checks and a tool call with perfect arguments can all still fail when they meet the world. The bolt slips out of the fingers; the box lid springs back; the part the detector found is a reflection. In [[llm-robot-control/language-and-robots#prop-compound]] we saw the arithmetic: per-step reliabilities of 95% give one failure in three over eight steps, while detecting failures and retrying lifts the task success to about 94%. This chapter is about making that happen. It covers **success detection** — how the system knows whether a step worked, from gripper and force signals, from re-running perception and from asking a vision-language model; **state feedback** — what to tell the language model after each step and what not to; **recovery and replanning** — a layered policy of local retries, re-observation, replanning and escalation, with retry budgets chosen by a simple expected-cost rule; and the **hierarchical** systems that by 2025–2026 had become the main way of combining language models with learned robot policies, in which an LLM or VLM chooses language subtasks and a vision-language-action (VLA) model of the kind described in [[vision-language-action/vla-architectures]] executes them.

## Did it work? Success detection {#sec-success}

::: definition Success detector {#def-success-detector}
A **success detector** for a skill is a function that, after the skill has run, maps the available observations — proprioception, force and torque, images, other sensors — to a decision "succeeded" or "failed" (with a confidence where available) about whether the skill achieved its intended effect. Its quality is described by two error rates on a representative test set: the **false-accept rate** $\alpha$, the probability of reporting success when the skill failed, and the **miss rate** (false-reject rate) $\beta$, the probability of reporting failure when the skill succeeded.
:::

The two errors have very different costs. A false reject causes an unnecessary retry — a few seconds lost, and occasionally a retry that does harm (picking a second part). A false accept lets the plan continue on a wrong picture of the world — the next step places nothing, or the kit ships with a part missing — and it is detected, if at all, much later. Most cells therefore tune their detectors for a low false-accept rate and accept more false rejects.

Success signals come in three tiers, from fastest and cheapest to slowest and most general:

| tier | signal | example checks | latency | limitations |
|---|---|---|---|---|
| proprioceptive | gripper finger position and current; joint torques; force–torque sensor | finger stopped at an opening matching the object width; payload estimate after lift; insertion force profile reached seating force | ms | cannot tell *which* object is held or *where* it was placed |
| perceptual | re-run detection and pose estimation | the object is gone from its source and present at its target within tolerance | 0.1–0.5 s | occlusion by the gripper; detector errors |
| semantic | ask a VLM a yes/no question about an image | "Is the M6 bolt inside the left tray?"; "Is the lid fully closed?" | 0.5–2 s | slower; can be confidently wrong; must be calibrated on your cell |
| process | cell sensors | weighing scale, presence sensors in fixture, torque–angle curve of a screwdriver | ms | only where installed |

The best detectors combine tiers. A pick is confirmed by the finger opening *and* the absence of the object from its source; a place by the opening of the fingers at the right height *and* a detection at the target; a screw by the driver's torque–angle curve.

::: proposition Combining independent detectors {#prop-combine}
Let two success detectors have false-accept rates $\alpha_1, \alpha_2$ and miss rates $\beta_1, \beta_2$, and suppose their errors are independent given the true outcome. Declaring success only if **both** report success (AND rule) gives
$$
\alpha_{\wedge} = \alpha_1\alpha_2,\qquad \beta_{\wedge} = 1 - (1 - \beta_1)(1 - \beta_2);
$$ {#eq-and-rule}
declaring success if **either** reports success (OR rule) gives $\alpha_{\vee} = 1 - (1 - \alpha_1)(1 - \alpha_2)$ and $\beta_{\vee} = \beta_1\beta_2$.
:::

::: proof
Condition on the skill having failed. Under the AND rule a false accept requires both detectors to accept; by conditional independence the probability is $\alpha_1\alpha_2$. Condition on the skill having succeeded: the AND rule reports success only if neither detector misses, probability $(1 - \beta_1)(1 - \beta_2)$, so the miss rate is one minus this. The OR rule is the mirror image: a false accept occurs unless both detectors correctly reject, $1 - (1 - \alpha_1)(1 - \alpha_2)$, and a miss requires both to miss, $\beta_1\beta_2$. Independence is the key assumption and often fails partly: if a bolt is hidden under the fingers, the camera *and* a VLM looking at the same image both fail in the same way, so combinations of *different physical signals* come closer to independence than combinations of two models looking at one picture.
:::

::: example Gripper plus VLM {#ex-combine}
A gripper-width check for "is a bolt held?" has $\alpha_1 = 0.04$ (it accepts when the fingers stall on the edge of the tray) and $\beta_1 = 0.01$. A VLM asked "Is a bolt between the gripper fingers?" on a wrist-camera image has $\alpha_2 = 0.06$ and $\beta_2 = 0.05$, measured on 500 logged picks. Compare the AND and OR rules. In a cell where 10% of picks fail, how many false accepts and false rejects occur per 1,000 picks under each rule?
::: solution
AND: $\alpha = 0.04\times0.06 = 0.0024$, $\beta = 1 - 0.99\times0.95 = 0.0595$. OR: $\alpha = 1 - 0.96\times0.94 = 0.0976$, $\beta = 0.01\times0.05 = 0.0005$. Per 1,000 picks there are 100 failures and 900 successes. AND: $100\times0.0024 = 0.24$ false accepts and $900\times0.0595 = 53.6$ false rejects. OR: $9.8$ false accepts and $0.45$ false rejects. The AND rule nearly eliminates the expensive error at the cost of about 54 unnecessary checks or retries per 1,000 picks; if the retry is "re-grasp", that may cause more harm than good, so the better response to an AND-rule rejection is "look again" (re-run perception with the gripper moved aside) before retrying. Sanity check: a false accept rate of 0.24% is still not zero — downstream checks (the kit's weight, a final inspection) remain worthwhile.
:::
:::

### Asking a VLM whether it worked

A semantic success check is a single, narrowly phrased question with a structured answer. Asking "Did the robot complete the task?" invites a vague answer; asking about one observable fact, with the image cropped to the relevant region, works far better.

```python
SUCCESS_SCHEMA = {
    "type": "object",
    "properties": {
        "answer": {"type": "string", "enum": ["yes", "no", "cannot_tell"]},
        "evidence": {"type": "string", "maxLength": 200}
    },
    "required": ["answer", "evidence"],
    "additionalProperties": False,
}

def vlm_check(image_crop, question: str) -> str:
    """Ask one yes/no question about a cropped image; 'cannot_tell' counts as failure."""
    reply = vlm.ask(image=image_crop,
                    prompt=f"Answer only about what is visible. {question}",
                    schema=SUCCESS_SCHEMA)          # structured output, see robot-tool-calling
    log_success_check(question, reply)
    return reply["answer"]
```

Allowing `cannot_tell` matters: forcing a yes/no answer on an occluded image produces guesses. The question template is fixed per skill ("Is the {object} inside the {target}?"), filled from the plan, and evaluated on logged images until its error rates are known — a VLM's success check is a sensor and must be characterised like one.

::: warning Success detectors drift
A detector characterised on 500 picks in January can be wrong in June: new part colours, a different tray, changed lighting, a model update by the provider. Keep logging the detector's inputs and decisions, audit a random sample by hand (or against a slower ground truth, such as weighing the kit), and re-measure $\alpha$ and $\beta$ after every change to the cell, the model version or the prompt. A hosted VLM whose version changes without notice is a sensor whose calibration may change without notice; pin the model version where the provider allows it.
:::

## What to tell the model {#sec-feedback}

After each step the language model needs enough information to decide the next one — and no more, because every token of feedback costs latency and money and dilutes the model's attention. A good result message, whether the tool result of [[llm-robot-control/robot-tool-calling]] or a line in an Inner-Monologue transcript ([[llm-robot-control/grounded-task-planning#sec-monologue]]), has four parts:

1. **Outcome**: `succeeded`, `failed` or `uncertain`, from the success detector, with the detector's name.
2. **Reason** for a failure, in the vocabulary of the skill: `grasp_empty` (fingers closed fully), `object_moved` (the target is no longer where it was), `ik_failed`, `collision_predicted`, `timeout`, `force_limit`.
3. **What changed** in the scene that matters for the plan: the object's new pose; a newly visible object; the held object.
4. **Robot state**: what is in the gripper, whether the arm is at a safe pose, active errors.

Two rules keep the feedback trustworthy. The **cell is the source of truth** for state it can measure: the count of parts in the kit comes from the cell's own record of confirmed placements, not from the model's memory of the conversation. And the **history is summarised** as it grows: after twenty steps, the model needs the current state and a short list of what has been done and what failed, not twenty full scene dumps.

::: example Context growth {#ex-context}
Each step of a long kitting task appends a tool call of about 80 tokens and a result of about 350 tokens (a scene summary of ten objects). The fixed prefix is 6,000 tokens. How large is the context after 40 steps, and what is gained by replacing full scene summaries with "what changed" results of about 120 tokens plus a single current-state block of 400 tokens?
::: solution
Full results: $6000 + 40\times(80 + 350) = 6000 + 17{,}200 = 23{,}200$ tokens, and the input billed over the whole task is the sum over steps, roughly $\sum_{k=1}^{40}(6000 + 430k) = 240{,}000 + 430\times820 = 592{,}600$ tokens. With "what changed" results: $6000 + 400 + 40\times(80 + 120) = 14{,}400$ tokens at the end, and a total of about $\sum_{k=1}^{40}(6400 + 200k) = 256{,}000 + 164{,}000 = 420{,}000$ tokens — 29% less, and each call is faster because time to first token grows with input length. The larger benefit is accuracy: with ten nearly identical scene dumps in the context, the model is more likely to read a stale pose.
:::
:::

## Recovery and replanning {#sec-recovery}

When a step fails, the cheapest effective response depends on *why* it failed. A layered recovery policy tries the cheap responses first and escalates.

::: algorithm Layered recovery policy {#alg-recovery}
Input: a failed step with its failure reason; the plan; the retry budget per step $k_{\max}$; the operator interface.
1. **Make safe.** Bring the arm to a known state: stop, open or keep the gripper as the skill specifies, retreat to a safe pose. Read the robot state.
2. **Re-observe.** Run perception on the affected region and update the scene. Many "failures" are resolved here: the object was picked after all, or it is now visible in a new place.
3. **Local retry** (no language model involved): if the reason is one the skill knows how to handle (`grasp_empty` with the object still present, `object_moved` by a small distance), retry the same skill with updated parameters, up to $k_{\max}$ attempts in total, counting attempts on the cell, not in the model's memory.
4. **Replan** (language model or planner): if local retries are exhausted or the reason is not local (`ik_failed`, `object_missing`, an unexpected object in the way), send the failure, the updated scene and the remaining goal to the planner and ask for a new plan; validate it as in [[llm-robot-control/grounded-task-planning#alg-validate]].
5. **Escalate.** If replanning fails, or the same failure recurs, or the failure reason is safety-related (`force_limit`, `collision_predicted` near a person, `protective_stop`), stop and ask the operator, stating what was attempted and what is known.
:::

Step 1 deserves emphasis. Before *any* retry, the system must know the state of the robot and the object: a retry from an unknown state is how a recoverable slip becomes a collision.

### How many retries?

Retries are not free, and they are not independent: if a grasp failed because the part is jammed, the second attempt is less likely to succeed than the first. A simple cost model makes the trade-off explicit.

::: proposition When another retry pays {#prop-retry-rule}
Let the $m$-th attempt at a step ($m = 0, 1, 2, \dots$) succeed with probability $p_m$ given that all earlier attempts failed, let every attempt take time $t_a$, and let escalation to the operator after the last failed attempt take time $t_e$. Let $F_m = \prod_{j<m}(1 - p_j)$ be the probability that the first $m$ attempts all fail ($F_0 = 1$). With a budget of $M$ attempts, the expected time for the step is
$$
E_M = t_a\sum_{m=0}^{M-1}F_m + F_M\,t_e ,
$$ {#eq-retry-time}
and adding attempt $M$ changes it by
$$
E_{M+1} - E_M = F_M\,\bigl(t_a - p_M\,t_e\bigr).
$$ {#eq-retry-delta}
Hence attempt $M$ reduces the expected time if and only if $p_M\,t_e > t_a$. If the $p_m$ are non-increasing, the optimal budget is to keep trying while $p_m > t_a/t_e$ and to escalate at the first $m$ with $p_m\le t_a/t_e$.
:::

::: proof
Attempt $m$ is made only if attempts $0, \dots, m - 1$ failed, which has probability $F_m$, and it costs $t_a$; escalation happens only if all $M$ attempts failed, probability $F_M$. Summing expected costs gives [[#eq-retry-time]]. Going from $M$ to $M + 1$ attempts adds the cost of attempt $M$, $F_Mt_a$, and replaces the escalation term $F_Mt_e$ by $F_{M+1}t_e = F_M(1 - p_M)t_e$; the difference is $F_M\bigl(t_a + (1 - p_M)t_e - t_e\bigr) = F_M(t_a - p_Mt_e)$. Since $F_M > 0$, its sign is that of $t_a - p_Mt_e$. If the $p_m$ do not increase, the sign changes at most once, from negative to positive, so $E_M$ decreases while $p_m > t_a/t_e$ and increases afterwards; the minimum is at the first $m$ where the inequality fails. The model ignores the possibility that a retry makes things worse (knocking the part off the table); that would add a cost term per attempt and lower the threshold further.
:::

::: example Choosing a retry budget {#ex-retry-budget}
A grasp attempt takes $t_a = 6\,\mathrm s$ and an operator intervention $t_e = 120\,\mathrm s$. The first attempt succeeds with $p_0 = 0.7$; logged data show that each later attempt, given that the earlier ones failed, is half as likely to succeed as the one before: $p_m = 0.7\times0.5^m$. What retry budget minimises the expected time, and what is that time? Compare with the answer under the (wrong) assumption that every attempt succeeds with $0.7$.
::: solution
The threshold is $t_a/t_e = 0.05$. The attempt probabilities are $0.7, 0.35, 0.175, 0.0875, 0.0438, \dots$; the first below $0.05$ is $p_4 = 0.0438$. So make attempts $0$–$3$ — four attempts, three retries — and escalate after the fourth failure. Expected time from [[#eq-retry-time]]: $F_0 = 1$, $F_1 = 0.3$, $F_2 = 0.195$, $F_3 = 0.1609$, $F_4 = 0.1468$, so $E_4 = 6(1 + 0.3 + 0.195 + 0.1609) + 0.1468\times120 = 9.94 + 17.62 = 27.6\,\mathrm s$. One more attempt would give $27.7\,\mathrm s$ and one fewer $28.3\,\mathrm s$ — a shallow optimum. Under the independent-attempts assumption, every retry would look worthwhile ($0.7\times120 = 84 > 6$) and five attempts would predict an expected time of under $9\,\mathrm s$ — badly optimistic, because in reality a part that resists three grasps is usually jammed or misdetected. Sanity check: 15% of steps still reach the operator, which is why step 2 of [[#alg-recovery]] (re-observe) and a replan with a different strategy are worth more than a fourth identical grasp.
:::
:::

::: widget plot
f: ta*(1 - (1 - p)^(x + 1))/p + (1 - p)^(x + 1)*te
x: 0, 8
y: 0, 60
sliders: p=0.7:0.05:0.95:0.01; ta=6:1:30:0.5; te=120:20:600:10
labels: E[\text{time}]\ \text{(s)}
caption: Expected time for a step against the number of retries $k$ (horizontal axis; $k + 1$ attempts), for a constant per-attempt success probability $p$, attempt time $t_a$ and escalation time $t_e$. When $p\,t_e > t_a$ the curve falls with every retry, levelling off at $t_a/p$; drag $t_e$ down towards $t_a/p$ and it flattens, and below that retries only add time. Remember that real retries are correlated: the constant-$p$ curve is the optimistic bound, and [[#prop-retry-rule]] with decreasing $p_m$ gives the realistic budget.
:::

::: quiz
A screw-insertion skill fails with reason `force_limit` (the measured insertion force exceeded its limit). Which response does [[#alg-recovery]] prescribe?
- [ ] Retry immediately with a higher force limit
- [ ] Ask the language model to replan with a different screw
- [x] Make safe, re-observe, and escalate to the operator if the cause is not clearly benign — force limits are safety-related
- [ ] Count it as success, since the screw is probably in
::: solution
A force limit is reached either because something is wrong with the part (cross-threading, wrong hole, burr) or because something unexpected is in contact — possibly a person's hand in a collaborative cell. Raising limits in software to "get through" defeats their purpose, and an LLM must never be given the ability to change them. The safe default is to stop, retract, look, and involve the operator; after analysis of logged cases, specific benign causes (a known misalignment) can be given a local recovery.
:::
:::

## Hierarchies: language subtasks for learned skills {#sec-hierarchy}

The skills in this course so far are programmed: pick, place, insert, each tuned by an integrator. Some tasks resist programming — routing a cable, folding a bag, wiping a curved surface, picking a tangled part — and these are where learned **vision-language-action** policies are strongest. A VLA, however, is weak at long tasks: it follows a short instruction for a few seconds at a time, and its training data rarely contain multi-minute procedures. The combination is natural.

::: definition Hierarchical language-conditioned control {#def-hierarchy}
In **hierarchical language-conditioned control**, a **high-level** model — an LLM or VLM — observes the scene and the task at a low rate (typically every few seconds, or at subtask boundaries) and emits a **language subtask** ("pick up the black cable near the left connector", "push the connector into port 3"), chosen from or close to the instructions the low-level policy was trained on. A **low-level** policy — a VLA or a set of learned or programmed skills — executes the subtask at control rate (5–50 Hz action chunks), conditioned on the instruction and the camera images. A **subtask monitor** decides when the subtask is complete, stalled or failed, and returns control to the high level.
:::

By 2025 several groups had published systems of this shape. Physical Intelligence's Hi Robot (2025) used a VLM to break open-ended prompts and mid-task corrections from users ("not that one, the other sandwich") into short instructions for its π0 VLA. Google DeepMind paired Gemini Robotics, a VLA, with Gemini Robotics-ER, an embodied-reasoning model that plans and calls the VLA as a tool (2025). Figure described its Helix model as a slow "System 2" vision-language model guiding a fast "System 1" visuomotor policy (2025). Earlier, RT-H (Google DeepMind, 2024) had shown that an intermediate layer of "language motions" ("move the arm forward", "close the gripper") makes low-level policies easier to correct by language.

The interface between the levels is the lesson of this whole course applied once more: **ground the high level's outputs in what the low level can do.** A VLA conditioned on "insert the connector with a slight wiggle" may do something unpredictable if it never saw that phrase in training. Practical systems give the high-level model the list of instruction templates the low-level policy was trained and evaluated on, with their measured success rates, exactly like a skill library ([[llm-robot-control/grounded-task-planning#def-skill]]), and treat each instruction as a skill with a precondition and a success check.

::: example Pipelining the levels {#ex-pipeline}
A cable-harness task has six subtasks. The high-level VLM takes $1.5\,\mathrm s$ to choose each subtask; the VLA executes each in about $5\,\mathrm s$; a VLM success check at the end of each takes $0.8\,\mathrm s$. Compare the total time when the levels run strictly in sequence with the time when the high level chooses the *next* subtask while the current one executes (assuming success, and discarding the choice if the check fails).
::: solution
Sequential: $6\times(1.5 + 5 + 0.8) = 43.8\,\mathrm s$. Pipelined: the first choice costs $1.5\,\mathrm s$; afterwards each subtask's choice is made during the previous subtask's $5\,\mathrm s$ of execution, so it adds nothing; total $1.5 + 6\times(5 + 0.8) = 36.3\,\mathrm s$, a 17% saving. The success check could also overlap the next subtask's start if the next subtask does not depend on it, but usually it does. When a check fails, the speculative choice is discarded and the high level replans from the observed state, costing the $1.5\,\mathrm s$ that pipelining had hidden. Sanity check: the saving is bounded by the high-level time per subtask, $6\times1.5 = 9\,\mathrm s$, less the first choice — $7.5\,\mathrm s$ ✓.
:::
:::

::: remark Monitoring a learned skill
A programmed skill knows when it has finished; a VLA does not stop by itself unless it was trained to emit a "done" signal. The subtask monitor therefore combines a **timeout** (a multiple of the subtask's typical duration), **progress signals** (the end effector has not moved for a second; the object of interest has not moved), **force and contact anomalies**, and a periodic **success question** to a VLM. A stalled or oscillating VLA is the learned-skill equivalent of a failed grasp: make safe, re-observe, retry once with a rephrased instruction or hand over to a programmed recovery, then escalate.
:::

::: history
Closing the loop between perception and action is the oldest idea in robotics — feedback control — but closing it at the level of *plans* came later. Shakey's PLANEX executive (1972) monitored the execution of STRIPS plans with "triangle tables" that recorded which conditions each step needed, so that the robot could re-enter a plan at the right point after an unexpected change. Execution monitoring and replanning became a standard part of planning architectures in the 1980s–1990s (for example the three-layer architectures of Gat and others, with a deliberative planner, an executive and reactive skills). Learned success detectors appeared with deep learning in the 2010s. In 2022 Inner Monologue (Huang et al.) fed success detection and scene descriptions back into an LLM planner as text, and in 2023 several works used VLMs as success detectors and reward models (for example Du et al., "Vision-Language Models as Success Detectors"). From 2024 the hierarchical combination of a reasoning model with a VLA became a mainstream architecture, with RT-H (2024), Hi Robot, Helix and Gemini Robotics (2025) among the published examples.
:::

::: summary
- A **success detector** ([[#def-success-detector]]) has a false-accept rate $\alpha$ and a miss rate $\beta$; false accepts are usually far more costly, so tune for low $\alpha$.
- Combine signals of different physics (gripper, force, vision, process sensors, VLM questions); with independent errors the AND rule gives $\alpha_1\alpha_2$ and the OR rule $\beta_1\beta_2$ ([[#prop-combine]]).
- Ask a VLM one narrow, templated question with a structured answer that allows `cannot_tell`; characterise it like any sensor and re-measure after changes.
- Feed back outcome, reason, what changed and robot state; keep the cell as the source of truth and summarise the history.
- **Recovery** ([[#alg-recovery]]): make safe, re-observe, local retry, replan, escalate; safety-related failures go to the operator.
- Another attempt pays iff $p_m t_e > t_a$ ([[#prop-retry-rule]]); because retries are correlated, budgets are short.
- **Hierarchies** ([[#def-hierarchy]]): an LLM/VLM chooses language subtasks from the low-level policy's trained repertoire; a VLA executes; a monitor with timeouts, progress, force and success checks returns control.
:::

## Exercises

::: exercise AND rule {level=1 check="0.0015"}
Two independent success detectors have false-accept rates $0.03$ and $0.05$. What is the false-accept rate of the AND rule? (Enter it as a fraction.)
::: solution
$\alpha_\wedge = 0.03\times0.05 = 0.0015$.
:::
:::

::: exercise OR rule miss rate {level=1 check="0.0006"}
Two independent detectors have miss rates $0.02$ and $0.03$. What is the miss rate of the OR rule? (Enter it as a fraction.)
::: solution
$\beta_\vee = 0.02\times0.03 = 0.0006$.
:::
:::

::: exercise Retry threshold {level=1 check="0.04"}
An attempt takes $8\,\mathrm s$ and an operator intervention $200\,\mathrm s$. Below what success probability is a further attempt not worth making? (Enter the probability.)
::: solution
By [[#prop-retry-rule]], an attempt pays iff $p\,t_e > t_a$, i.e. $p > 8/200 = 0.04$.
:::
:::

::: exercise Expected time with two attempts {level=2 check="21.6"}
With $t_a = 6\,\mathrm s$, $t_e = 120\,\mathrm s$, $p_0 = 0.8$ and $p_1 = 0.4$, what is the expected time for a step with a budget of two attempts? (Enter the time in s.)
::: solution
$F_1 = 0.2$ and $F_2 = 0.2\times0.6 = 0.12$, so by [[#eq-retry-time]] $E_2 = 6(1 + 0.2) + 0.12\times120 = 7.2 + 14.4 = 21.6\,\mathrm s$. For comparison, one attempt gives $E_1 = 6 + 0.2\times120 = 30\,\mathrm s$; the second attempt pays because $p_1t_e = 48 > 6$.
:::
:::

::: exercise False accepts per shift {level=2 check="0.6"}
A cell performs 2,500 picks per shift; 8% fail. The success detector (AND of gripper width and re-detection) has a false-accept rate of $0.003$. How many failed picks are accepted as successful per shift?
::: solution
Failures: $2500\times0.08 = 200$; false accepts $200\times0.003 = 0.6$ per shift — about one every two shifts, each a kit with a missing part unless a later check (weighing) catches it.
:::
:::

::: exercise A good result message {level=2}
Write the tool result (as JSON) that the system should return to the language model after a `place(bolt_m6_2, left_tray)` call in which the gripper opened at the right height but re-detection finds the bolt on the tray's rim, $3\,\mathrm{cm}$ from the intended position, tilted. Include everything the model needs and nothing it does not.
::: solution
```json
{"outcome": "failed", "detector": "redetect_at_target",
 "reason": "object_misplaced",
 "details": "bolt_m6_2 detected on the rim of left_tray, 0.03 m from target, tilted",
 "changed": {"bolt_m6_2": {"position": [0.512, 0.188, 0.034], "pose_note": "tilted, unstable"}},
 "robot": {"holding": null, "at_safe_pose": true, "errors": []},
 "suggestion_allowed": ["grasp", "ask_operator"]}
```
It gives the outcome and reason in the skill's vocabulary, the new pose (so the model need not call `get_scene` again), the robot state, and optionally the skills that are applicable now. It does not include the full scene, images, raw detector scores for unrelated objects, or a narrative.
:::
:::

::: exercise Correlated retries {level=3}
Show that if every attempt succeeds independently with the same probability $p$ and $p\,t_e > t_a$, the expected time [[#eq-retry-time]] decreases with every additional attempt and tends to $t_a/p$. Explain why this model is dangerous for setting retry budgets, giving two physical reasons why $p_m$ decreases with $m$.
::: solution
With constant $p$, $F_m = (1 - p)^m$ and $E_{M+1} - E_M = (1 - p)^M(t_a - pt_e) < 0$ for every $M$, so more attempts always help. As $M\to\infty$, $F_M t_e\to0$ and $t_a\sum_{m\ge0}(1 - p)^m = t_a/p$. The model is dangerous because it recommends unbounded retries. Physically, failures have causes that persist: the part is jammed or tangled, the detector consistently mislocates it (a reflection, a calibration error), the gripper pads are contaminated, the object is outside the trained distribution of a learned grasp model. Each failed attempt is evidence that such a persistent cause is present, so the conditional success probability of the next identical attempt drops. In addition, attempts can change the scene for the worse (push the part into a corner). Budgets must come from logged conditional success rates, and retries should vary the strategy (re-observe, different grasp) rather than repeat it.
:::
:::

::: exercise Detector design for a kitting cell {level=3}
Design the success detection for a kitting cell that places six different parts into a foam insert with cut-outs, using any of: gripper position and current, a wrist camera, an overhead camera, a scale under the kit, and a VLM. State, for each skill (pick, place, final kit check), which signals you combine, by which rule, and how you would measure $\alpha$ and $\beta$.
::: solution
Pick: AND of (finger opening within the part's width band, and stalled current) with (part absent from its source in the overhead image); α low because the two signals have different failure causes. Place: AND of (opening at the expected height) with (scale increase within ±10% of the part's mass) with (part detected in the correct cut-out by the overhead camera); the scale makes the check nearly independent of vision. Final kit: scale total equals the bill-of-materials mass within tolerance AND a VLM or classical check per cut-out ("Is the cut-out for part D filled?") — the VLM is useful here for *wrong part in a cut-out*, which mass alone may miss if masses are similar. Measurement: log every decision with its inputs; build a test set by deliberately creating failures (empty grasps, misplaced parts, swapped parts) and successes; compute α and β per skill with confidence intervals (for α near 0.003 you need thousands of failure cases, or a statistical argument from the components' independent rates); re-run after every change. Report the downstream rate of incomplete kits as the end-to-end metric.
:::
:::

::: exercise Designing a hierarchical interface {level=3}
A VLA has been fine-tuned on 40 instruction templates for cable handling, with measured success rates between 55% and 95%. Describe how you would present them to the high-level model, what the high level should do with a template whose success rate is 55%, and how you would handle an operator's request that matches no template.
::: solution
Present the templates as a skill library: name, instruction template with slots ("pick up the {colour} cable near the {connector}"), preconditions (cable visible, gripper empty), the success check used by the monitor, the measured success rate and typical duration. The high level then reasons with feasibility as in SayCan: for a 55% template it should prefer an alternative with higher success if one achieves the same effect, plan a re-observation and retry budget according to [[#prop-retry-rule]], and perhaps ask the operator to stage the cable differently. For a request that matches no template, the high level must not invent a free-form instruction and hope the VLA follows it; it should decompose the request into templates if possible, or tell the operator that the system cannot do it yet (and log the request — such logs are the best guide to which demonstrations to collect next). This keeps the language layer's outputs grounded in what the low level has actually been shown to do.
:::
:::
