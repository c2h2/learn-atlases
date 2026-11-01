A policy that succeeds in the lab notebook has not yet moved a robot. Between the network and the motors sit cameras with latency, a GPU with finite memory and bandwidth, a controller that expects a new set-point every millisecond, and people who may walk into the workspace. Deployment is the engineering of that path: making the policy fast enough, feeding its slow and bursty output smoothly to a fast controller, and — above all — making sure that nothing the policy outputs can make the arm do something dangerous. A learned policy is a component whose behaviour on unseen inputs is not specified; the rest of the system must be designed on the assumption that it will, sometimes, output nonsense.

This chapter builds the deployment stack from the bottom of the latency budget to the top of the safety case. We first account for every millisecond between a photon reaching the camera and a joint moving, and see how inference time depends on the hardware's memory and arithmetic throughput and on quantisation. We then deal with **asynchronous execution**: computing the next action chunk while the current one runs, aligning chunks in time, and blending them smoothly. Next comes **interpolation** from the policy rate to the joint-controller rate. The longest section is the **safety layer below the policy** — limits on joint position, velocity, acceleration and force, workspace bounds, watchdogs and the emergency stop — and the chapter ends with monitoring and failure handling. The arm-level safety requirements are in [[robot-arm-design/arm-safety]] and the controller structure in [[robot-arm-design/software-stack]]; the inference techniques are covered in depth in the LLM Atlas on [quantisation](/learn/llm/lesson.php?c=inference&l=quantisation) and [latency, throughput and cost](/learn/llm/lesson.php?c=inference&l=latency-cost).

::: warning Safety is not a property of the policy
Nothing in this chapter replaces a risk assessment of the complete robot cell to the applicable standards (ISO 12100 for the method; ISO 10218-1 and -2 for industrial robots and their integration, revised in 2025; ISO/TS 15066 for collaborative operation; ISO 13849-1 or IEC 62061 for safety-related control functions), carried out by qualified people. A learned policy must never be part of a safety function. This lesson teaches the principles of the software layers around a policy; it is not a design for a certified system.
:::

## The deployment stack {#sec-stack}

A typical arrangement, from top to bottom:

1. **Sensors**: cameras (30–60 frames per second) and the robot's joint state (from the controller, at its own rate).
2. **Policy server**: preprocesses images (resize, normalise), runs the VLA on a GPU, un-normalises the output, and publishes action chunks with timestamps — typically 2–15 chunks per second.
3. **Action buffer and executor**: holds the current chunk, aligns new chunks in time, blends them, and emits joint (or Cartesian) targets at the policy action rate, 10–50 Hz.
4. **Interpolator**: turns those targets into smooth set-points at the joint-controller rate, 500 Hz–1 kHz.
5. **Safety filter**: checks and limits every set-point (position, velocity, acceleration, workspace, force) before it reaches the controller; runs at the controller rate in a real-time process.
6. **Robot controller and safety controller**: the manufacturer's real-time joint control and its safety-rated functions (protective stop, safe speed, safe torque off), independent of everything above.

Only layers 5 and 6 are hard real-time; layers 1–4 can run on an ordinary operating system with best-effort timing, provided that layer 5 behaves safely when they are late.

## The latency budget {#sec-latency}

::: definition Observation-to-action latency {#def-latency}
The **observation-to-action latency** $t_{\mathrm{lat}}$ is the time from the capture of the observation on which an action is based to the moment the controller starts executing that action. It is the sum of capture and transfer time, preprocessing, inference, post-processing and communication. At an action rate $f$ the policy's actions are, on arrival, $\lceil t_{\mathrm{lat}}f\rceil$ steps late relative to the observation.
:::

::: example A latency budget {#ex-latency}
A VLA arm system has: camera exposure and USB transfer $25\,\mathrm{ms}$, image preprocessing $5\,\mathrm{ms}$, inference (prefix plus 10 flow steps) $90\,\mathrm{ms}$, un-normalising and publishing $2\,\mathrm{ms}$, transport to the executor $1\,\mathrm{ms}$. The action rate is $50\,\mathrm{Hz}$ and the hand moves at up to $0.3\,\mathrm{m/s}$. Find $t_{\mathrm{lat}}$, the number of action steps it spans, and how far the hand moves during it.
::: solution
$t_{\mathrm{lat}} = 25 + 5 + 90 + 2 + 1 = 123\,\mathrm{ms}$. At $50\,\mathrm{Hz}$ (20 ms per step), $123/20 = 6.15$, so the chunk's first action is $\lceil6.15\rceil = 7$ steps old on arrival. The hand moves $0.3\times0.123 = 0.037\,\mathrm m = 37\,\mathrm{mm}$ in that time.
Inference is 73% of the budget, so it is the place to optimise; but the 25 ms of camera latency is not negligible, and it is easy to measure wrongly ([[vision-language-action/demonstration-data#ex-sync]]).
Sanity check: if the executor started each new chunk from its first action, it would command the arm back to where it was 7 steps ago — a visible backwards jerk at every chunk boundary. This is the alignment problem of [[#sec-async]].
:::
:::

### Inference hardware

Inference time is limited either by arithmetic or by memory traffic ([[vision-language-action/vla-architectures#prop-flops]]). Processing the observation prefix — hundreds of tokens at once — is **compute-bound**: time $\approx 2P n_{\mathrm{tok}}/F$ for an achieved throughput $F$. Generating a few tokens, or running a small action expert on a few tokens, is **memory-bound**: time $\approx bP/W$ per pass, for $b$ bytes per weight and memory bandwidth $W$. The two kinds of hardware a company will consider differ mainly in these two numbers and in power:

- a **workstation or server GPU** (as of 2026, for example a consumer card with 24 GB of memory and about $1\,\mathrm{TB/s}$ of bandwidth) beside the robot, connected by Ethernet;
- an **embedded module** inside the robot or its controller cabinet (for example NVIDIA's Jetson AGX Orin 64 GB, with about $205\,\mathrm{GB/s}$ of memory bandwidth shared between CPU and GPU), at a few tens of watts.

::: example A 3B VLA on an embedded module {#ex-edge}
A π0-sized model (3B backbone, 0.3B action expert) runs on an embedded module with $205\,\mathrm{GB/s}$ bandwidth and an achieved $2\times10^{13}$ FLOP/s for the prefix (an assumption to be measured). (a) Estimate the prefix time for 788 tokens (three cameras) and for 532 tokens (two cameras). (b) Estimate the time of 10 flow steps with the expert in bf16. (c) How much does 4-bit quantisation of the backbone weights help?
::: solution
(a) Three cameras: $2\times3\times10^9\times788/2\times10^{13} = 0.236\,\mathrm s$. Two cameras: $2\times3\times10^9\times532/2\times10^{13} = 0.160\,\mathrm s$.
(b) Expert weights $0.3\times10^9\times2 = 0.6\,\mathrm{GB}$ per pass, $0.6/205 = 2.9\,\mathrm{ms}$; ten steps $29\,\mathrm{ms}$.
(c) Backbone weights in 4 bits: $1.5\,\mathrm{GB}$ instead of $6\,\mathrm{GB}$, which frees memory and speeds up memory-bound passes — but the prefix is compute-bound, so weight-only quantisation hardly changes (a). It helps compute only if the arithmetic itself runs in lower precision (8-bit integer or 8-bit floating-point matrix units).
Total with two cameras: about $190\,\mathrm{ms}$ per chunk — usable with chunks of 1 s and asynchronous execution, but slow to react. Options: fewer or smaller images, a smaller backbone, compiled and fused kernels, or a server GPU, where the same model would take of order $60$–$80\,\mathrm{ms}$.
Sanity check: the embedded module's bandwidth is about one fifth of the server GPU's, and its prefix throughput (as assumed) about one fifth too; a five-fold slowdown is the expected order.
:::
:::

**Quantisation** stores weights (and possibly activations) with fewer bits: 8-bit integers or floats, or 4-bit formats with per-group scales. Weight memory falls by $2\times$ or $4\times$ relative to bf16, memory-bound passes speed up in proportion, and a model that did not fit may fit. The price is an approximation error in every layer, which is small for language-model benchmarks at 8 bits and often at 4 bits, but whose effect on a closed-loop policy must be measured: a small systematic bias in actions can matter more than a small drop in a text benchmark. OpenVLA's authors reported in 2024 that 4-bit inference preserved success on their tasks, while 8-bit inference in their implementation was *slower* because of overheads — a reminder that speed depends on kernels as much as on bits. Evaluate every quantised build with the protocol of [[vision-language-action/policy-evaluation]] before shipping it.

Other standard optimisations: compile the model (graph capture, fused attention kernels), keep everything on the GPU (no host copies of images), cache the prefix keys and values across flow steps, preprocess images on the GPU, and batch across arms if one server drives several.

## Asynchronous execution {#sec-async}

If the executor waits for each new chunk, the robot pauses for $t_{\mathrm{lat}}$ at every chunk boundary. The standard fix is to start inference for the next chunk while the current one is still executing.

::: algorithm Asynchronous chunk execution {#alg-async}
1. At time $t_0$, capture an observation and start inference; mark the resulting chunk $\mathbf A = (a_0, \dots, a_{H-1})$ with the timestamp $t_0$ of its observation.
2. When the chunk arrives at time $t_0 + t_{\mathrm{lat}}$, discard its first $d = \lceil t_{\mathrm{lat}}f\rceil$ actions, which refer to times already past, and continue executing from $a_d$.
3. Start the next inference when $h$ actions of the current chunk have been executed, choosing $h$ so that $h/f\ge t_{\mathrm{lat}}$ plus a margin — the next chunk must arrive before the current one runs out ($d + h\le H$).
4. At each switch, blend the old and new chunks over a few steps, or use real-time chunking (below), so that the commanded trajectory stays continuous.
5. If no new chunk has arrived when the current one is exhausted, hold position with a controlled deceleration, never extrapolate.
:::

::: example Aligning chunks {#ex-align}
With $t_{\mathrm{lat}} = 123\,\mathrm{ms}$ at $f = 50\,\mathrm{Hz}$ and chunks of $H = 50$, find (a) how many actions to discard from each new chunk, (b) the smallest execution horizon $h$ that guarantees a new chunk before the old one runs out, allowing a 50% margin on latency, and (c) the inference duty cycle of the GPU.
::: solution
(a) $d = \lceil0.123\times50\rceil = 7$.
(b) Latency with margin $1.5\times123 = 185\,\mathrm{ms}$, i.e. $9.2$, so $h\ge10$ steps ($200\,\mathrm{ms}$). Check: $d + h = 17\le50$.
(c) With $h = 10$, inference starts every $200\,\mathrm{ms}$ and takes $90\,\mathrm{ms}$ of GPU time: 45%. With $h = 25$ it would be 18%, with slower reaction.
Sanity check: the chunk of 50 actions covers 1 s, of which only steps 7 to 17 are executed before the next chunk replaces it; most of each chunk is never executed. That is normal: the later part of a chunk serves as a plan that keeps the motion consistent, and as a reserve if the next chunk is late.
:::
:::

### Smooth switching between chunks

Even when aligned, consecutive chunks disagree: the new one was computed from a newer observation and, for a generative policy, from new random noise — it may even have chosen a different mode ([[vision-language-action/action-representations]]). Switching abruptly produces a jump in the commanded position. Three remedies are used:

- **Cross-fading**: over $m$ steps after the switch, execute $(1 - \lambda_i)\,a^{\mathrm{old}}_i + \lambda_i\,a^{\mathrm{new}}_i$ with $\lambda_i$ rising from 0 to 1. Simple and effective when chunks are close, but it averages, and averaging two different modes can be worse than either.
- **Temporal ensembling** ([[vision-language-action/action-representations#eq-ensemble]]) when inference is cheap enough to run every step.
- **Real-time chunking** (Black, Galliker and Levine, Physical Intelligence, 2025) for flow and diffusion policies. While the current chunk executes, the next chunk is generated with the actions that will be executed during the inference delay *fixed* to their values in the current chunk, and the rest of the overlapping region softly guided towards the current chunk — an "inpainting" problem solved during flow sampling with guidance, without retraining the model. The new chunk is then consistent with what the robot is already doing, so it continues the same motion and the same mode. The authors reported smoother, faster execution and robustness to large inference delays.

## Interpolation to the controller rate {#sec-interp}

A joint position controller expects a set-point every $1\,\mathrm{ms}$ (or $2\,\mathrm{ms}$, $4\,\mathrm{ms}$); a policy provides one every $20$–$100\,\mathrm{ms}$. Sending each policy target as a step makes the controller see a sudden error, and its response — a burst of torque — excites vibration and wears the gearboxes. The targets must be interpolated.

::: example Linear interpolation and its velocity steps {#ex-interp}
A joint receives policy targets at $50\,\mathrm{Hz}$: $0$, $0.010$ and $0.030\,\mathrm{rad}$ at $t = 0$, $0.02$ and $0.04\,\mathrm s$, and the controller runs at $1\,\mathrm{kHz}$. (a) With linear interpolation, what is the commanded velocity in each interval and what happens at $t = 0.02\,\mathrm s$? (b) What is gained by a cubic spline through the targets?
::: solution
(a) Each interval of 20 ms is divided into 20 set-points. Velocities $0.010/0.02 = 0.5\,\mathrm{rad/s}$, then $0.020/0.02 = 1.0\,\mathrm{rad/s}$. At $t = 0.02\,\mathrm s$ the velocity steps by $0.5\,\mathrm{rad/s}$ within one 1 ms controller tick — a commanded acceleration of $0.5/0.001 = 500\,\mathrm{rad/s^2}$ for one tick, i.e. an impulse. Repeated 50 times a second, this is a 50 Hz excitation of the arm.
(b) A cubic spline through the same targets ([[robotics/trajectory-planning]]) has continuous velocity and acceleration at the knots, so the controller sees a smooth reference; acceleration is bounded by the curvature of the target sequence rather than by the tick length. The cost is delay: a spline through a point needs the next point, so interpolating between the *last two* received targets adds one policy period (20 ms) of latency. Alternatives are a low-pass filter on the targets or a jerk-limited trajectory generator that tracks each new target online.
:::
:::

::: widget interpolation
points: 0, 0; 1, 0.01; 2, 0.03; 3, 0.06; 4, 0.075; 5, 0.08
method: spline
x: 0, 5
y: -0.01, 0.1
caption: Joint targets from a policy at 50 Hz (one unit on the horizontal axis = one policy step of 20 ms; vertical axis in rad) and a natural cubic spline through them, the kind of curve an interpolator would sample at 1 kHz. Drag a point to simulate a noisy policy output and watch the spline bend smoothly; switch the method to linear (in the Lab) to see the corners that become velocity steps.
:::

## The safety layer {#sec-safety}

The policy is an untrusted source of commands. Below it, a deterministic, simple and testable layer enforces limits on every command, at the controller rate, whatever the policy does. It does not replace the robot's safety-rated functions — which must remain independent of all of this software — but it keeps the policy's mistakes from reaching them in the first place.

::: definition Safety filter {#def-filter}
A **safety filter** is a function applied to each commanded set-point before it is sent to the robot controller, which (i) maps any command to one that satisfies the configured limits — joint position range with margins, joint velocity, acceleration and jerk limits, Cartesian workspace bounds and keep-out zones, tool speed limits, gripper force limits — and (ii) triggers a controlled stop when a limit cannot be met by modification, when a measured quantity (force, torque, tracking error) exceeds its threshold, or when the command stream stops arriving.
:::

::: algorithm A per-tick safety filter {#alg-filter}
At each controller tick, given the previous safe set-point $\mathbf q_{k-1}$ and velocity $\dot{\mathbf q}_{k-1}$, the requested set-point $\mathbf q^{\mathrm{req}}_k$ and the tick $\Delta t$:
1. **Watchdog**: if no valid command has arrived for longer than $T_{\mathrm{wd}}$ (e.g. 2–3 policy periods), switch to a controlled stop.
2. **Validity**: reject non-finite values and commands outside the joint ranges (with margin); clamp to the ranges.
3. **Velocity**: $\dot{\mathbf q}^{\mathrm{req}} = (\mathbf q^{\mathrm{req}}_k - \mathbf q_{k-1})/\Delta t$; scale the *whole vector* by $s = \min\bigl(1, \min_i \dot q_{i,\max}/\lvert\dot q^{\mathrm{req}}_i\rvert\bigr)$, so that the direction of motion is kept.
4. **Acceleration**: limit the change of velocity per tick in the same way.
5. **Workspace**: compute the tool pose (and points on the links) by forward kinematics; if the next set-point would leave the allowed region or enter a keep-out zone, stop the motion in that direction or stop altogether.
6. **Force and tracking**: if measured external force or torque, or the tracking error, exceeds its threshold, trigger a protective stop.
7. Send $\mathbf q_k$ and log any intervention of the filter.
:::

::: example Velocity limiting that keeps direction {#ex-vel}
A policy requests joint velocities $(1.2, 0.3, -2.0)\,\mathrm{rad/s}$ for three joints with limits $(1.0, 1.0, 1.5)\,\mathrm{rad/s}$. Compare clamping each joint with scaling the vector.
::: solution
Clamping: $(1.0, 0.3, -1.5)$. The ratios between joints change (joint 2 is now relatively faster), so the tool moves along a *different path*, not just more slowly.
Scaling: $s = \min(1/1.2,\ 1/0.3,\ 1.5/2.0) = \min(0.833, 3.33, 0.75) = 0.75$, giving $(0.90, 0.225, -1.50)\,\mathrm{rad/s}$. Every joint slows by the same factor, so the path is unchanged and only the speed falls.
Sanity check: after scaling, the most limiting joint (joint 3) is exactly at its limit and the others are below theirs. For a straight-line Cartesian motion, scaling preserves the line; clamping would bend it — possibly towards an obstacle the policy was avoiding.
:::
:::

::: proposition Stopping distance {#prop-stop}
A tool moving at speed $v$ that begins braking after a reaction time $t_r$ (detection, communication and controller delay) with constant deceleration $a$ travels
$$
s_{\mathrm{stop}} = v\,t_r + \frac{v^2}{2a}
$$ {#eq-stop}
before stopping. Workspace bounds and keep-out zones must be enforced at least $s_{\mathrm{stop}}$ (plus the tool's size and a margin) before the physical boundary.
:::

::: proof
During $t_r$ the speed is $v$, covering $v\,t_r$. Under constant deceleration $a$ from $v$ to 0, $v^2 = 2as$ (from $v\,dv = -a\,ds$ integrated), so the braking distance is $v^2/(2a)$. The total is the sum. A bound placed closer than $s_{\mathrm{stop}}$ to an obstacle cannot prevent contact at speed $v$, whatever the filter does.
:::

::: example Margins for a workspace bound {#ex-stop}
An arm's tool may move at up to $0.5\,\mathrm{m/s}$ near a fixture. The filter's reaction time is $20\,\mathrm{ms}$ and the arm can brake at $5\,\mathrm{m/s^2}$ at the tool. (a) Find the stopping distance. (b) Repeat at $1.0\,\mathrm{m/s}$. (c) What if the stop is triggered by the policy server noticing a problem, with $100\,\mathrm{ms}$ of reaction time?
::: solution
(a) $0.5\times0.02 + 0.5^2/(2\times5) = 0.010 + 0.025 = 0.035\,\mathrm m = 35\,\mathrm{mm}$.
(b) $1.0\times0.02 + 1.0/10 = 0.020 + 0.100 = 0.120\,\mathrm m$ — three and a half times as far for twice the speed, because the braking term grows with $v^2$.
(c) At $0.5\,\mathrm{m/s}$: $0.05 + 0.025 = 0.075\,\mathrm m$. Reaction time in a non-real-time process doubles the distance; this is why limits are enforced in the real-time layer, not by the policy server.
Sanity check: the numbers are of the size of a hand, which is why the speed allowed near people is limited by standards and by the risk assessment, and why collaborative operation relies on force and speed limits (ISO/TS 15066) and on speed and separation monitoring.
:::
:::

::: widget plot
f: x*t + x^2/(2*a)
x: 0, 2
y: 0, 0.6
sliders: t=0.005:0.005:0.2; a=1:0.5:15
labels: s_{\text{stop}}\ (\text{m})
caption: Stopping distance against tool speed $v$ in m/s for reaction time $t$ (s) and deceleration $a$ (m/s²). Set $t = 0.02$ and $a = 5$ and read 35 mm at 0.5 m/s; then raise $t$ to 0.1 s, as for a stop requested by a non-real-time process, and watch the line steepen. At high speed the quadratic braking term dominates; at low speed the reaction time does.
:::

Beyond the filter:

- **Emergency stop**: a hardwired, safety-rated function (category 0 or 1 to IEC 60204-1, with requirements in ISO 13850 and ISO 10218) that works when every computer has failed. No software stop, and certainly no "stop" output of a policy, is an emergency stop.
- **Safety-rated monitoring** in the robot's safety controller: safe speed, safe zones, safe torque off, collision detection. Configure these conservatively for learned-policy operation, independently of the filter's limits.
- **Gripper**: limit grip force and closing speed; detect unexpected loss of a grasped object.
- **Speed near people**: for collaborative applications, the force, pressure and speed limits come from the risk assessment and ISO/TS 15066; learned policies do not change them.

::: quiz
A policy occasionally outputs a target 30 cm outside the allowed workspace. Which response belongs in the safety filter?
- [ ] Retrain the policy until it no longer does this, then remove the workspace check.
- [x] Clamp or stop motion at the workspace bound (enforced with a margin of at least the stopping distance), log the event, and report it for analysis.
- [ ] Pass it to the controller, since the robot's own joint limits will stop it.
::: solution
The filter must enforce the bound regardless of how rarely the policy violates it; retraining may reduce the frequency but never proves it is zero. Joint limits do not protect the fixtures and people inside the joint range. Logging the event makes the policy's failure visible.
:::
:::

## Monitoring and failure handling {#sec-monitor}

A deployed policy will fail in ways the evaluation did not show. Monitoring makes failures visible and recoverable.

**What to log**, for every episode: observations (at reduced rate), chunks and executed actions, inference latency, filter interventions, force readings, operator interventions, outcomes. These logs are the next round's training and evaluation data ([[vision-language-action/imitation-learning#alg-dagger]]).

**Online signals** worth watching:

- **latency** and missed deadlines (a GPU throttling under heat, a background process);
- **filter activity**: a policy that is often clipped is operating outside its training distribution;
- **disagreement between samples**: drawing several chunks from a generative policy and measuring their spread gives a cheap uncertainty signal — large spread where the demonstrations were consistent suggests an unfamiliar state;
- **progress**: no change in the scene for several seconds (a frozen policy), or repeated attempts at the same grasp;
- **out-of-distribution inputs**: image-embedding distance from the training set, lighting or camera-pose changes.

**Failure handling** should be designed as a small state machine around the policy: retry a step a bounded number of times; fall back to a scripted recovery (open gripper, retract to a safe pose); request help from an operator with a clear description of the state; and stop safely if nothing works. A **shadow mode**, in which a new policy computes actions alongside the deployed system without executing them, and a gradual rollout across a fleet are standard ways of reducing the risk of updates.

::: example A deployment checklist {#ex-checklist}
Your company is about to run a fine-tuned VLA on a customer's arm for a supervised pilot. List the checks you would make before the first autonomous episode, grouped by layer.
::: solution
*Model*: checkpoint, normalisation statistics and embodiment name match; quantised build evaluated closed-loop; latency measured on the target hardware (median and 99th percentile). *Executor*: chunk alignment uses observation timestamps; blending or real-time chunking enabled; behaviour on a late chunk is a controlled hold. *Interpolator*: smooth (spline or jerk-limited) at the controller rate; verified by logging set-points. *Safety filter*: joint ranges with margins, velocity and acceleration limits (vector scaling), workspace and keep-out zones set at least the stopping distance inside boundaries, force thresholds, watchdog; each limit tested by injecting violating commands. *Robot safety*: emergency stop tested; safety-controller zones and speeds configured; risk assessment done for the cell. *Operations*: operator trained, with an enabling device or stop within reach; logging on; failure state machine tested; rollback to the previous version possible.
:::
:::

::: history
Industrial robot controllers have always separated motion generation from safety supervision: joint limits, speed monitoring and the emergency stop were standard long before learned policies. The idea of a "safety filter" that minimally modifies commands from an untrusted controller was formalised in control theory through control barrier functions in the 2010s. Learned-policy deployment met real-time constraints when large models arrived: RT-2 (2023) ran its largest models on cloud hardware at a few hertz; OpenVLA (2024) studied quantisation for single-GPU inference; π0 (2024) used chunking and a small action expert to reach 50 Hz action rates; and 2025 brought asynchronous and real-time chunking methods and small open models designed to run on the robot, such as Hugging Face's SmolVLA.
:::

::: summary
- Stack: sensors → policy server → chunk executor → interpolator → real-time safety filter → robot controller and independent safety controller.
- Latency is the sum of capture, preprocessing, inference and communication; the prefix is compute-bound, small passes are memory-bound; weight quantisation helps memory-bound parts and must be validated closed-loop.
- Execute asynchronously: discard the $\lceil t_{\mathrm{lat}}f\rceil$ stale actions of each new chunk, start the next inference early enough, and blend chunks (cross-fade, ensembling or real-time chunking).
- Interpolate policy targets to the controller rate with smooth (spline or jerk-limited) references; linear interpolation produces velocity steps.
- A safety filter below the policy enforces joint, velocity (vector scaling), acceleration, workspace and force limits and a watchdog; bounds sit at least $s_{\mathrm{stop}} = vt_r + v^2/(2a)$ inside boundaries. The emergency stop and safety-rated functions are independent hardware.
- Monitor latency, filter activity, sample disagreement and progress; handle failures with bounded retries, scripted recovery, operator requests and safe stops.
:::

## Exercises

::: exercise Stale steps {#exr-stale level=1 check="5"}
With $t_{\mathrm{lat}} = 95\,\mathrm{ms}$ at an action rate of $50\,\mathrm{Hz}$, how many actions of a new chunk must be discarded? (Enter the number.)
::: solution
$\lceil0.095\times50\rceil = \lceil4.75\rceil = 5$.
:::
:::

::: exercise Stopping distance {#exr-stop level=1 check="0.0405"}
A tool moves at $0.3\,\mathrm{m/s}$; reaction time $15\,\mathrm{ms}$; deceleration $1.25\,\mathrm{m/s^2}$. Find the stopping distance. (Enter it in m.)
::: solution
$0.3\times0.015 + 0.09/2.5 = 0.0045 + 0.036 = 0.0405\,\mathrm m$.
:::
:::

::: exercise Memory-bound pass {#exr-mem level=1 check="4"}
A 0.4-billion-parameter action network in bf16 runs on a device with $200\,\mathrm{GB/s}$ bandwidth. What is the minimum time per pass? (Enter it in ms.)
::: solution
$0.4\times10^9\times2/(200\times10^9) = 0.004\,\mathrm s = 4\,\mathrm{ms}$.
:::
:::

::: exercise Velocity scaling factor {#exr-scale level=2 check="0.6"}
Requested joint velocities are $(0.5, -2.5, 1.0)\,\mathrm{rad/s}$ with limits $(1.5, 1.5, 1.5)\,\mathrm{rad/s}$. Find the scaling factor $s$. (Enter it.)
::: solution
$s = \min(1, 1.5/0.5, 1.5/2.5, 1.5/1.0) = \min(1, 3, 0.6, 1.5) = 0.6$; the scaled vector is $(0.3, -1.5, 0.6)\,\mathrm{rad/s}$.
:::
:::

::: exercise Minimum execution horizon {#exr-horizon level=2 check="6"}
A policy at $30\,\mathrm{Hz}$ has an observation-to-action latency of $160\,\mathrm{ms}$. Allowing a 20% margin on the latency, what is the smallest execution horizon $h$ (in steps) for which the next chunk is guaranteed to arrive in time? (Enter the number.)
::: solution
Latency with margin $1.2\times160 = 192\,\mathrm{ms}$; $h\ge0.192\times30 = 5.76$, so $h = 6$ steps ($200\,\mathrm{ms}$). Without the margin, $h = 5$ would just suffice ($167\,\mathrm{ms}$), with no room for a slow inference.
:::
:::

::: exercise Duty cycle {#exr-duty level=2 check="0.3"}
Inference takes $60\,\mathrm{ms}$ and is started every $h = 10$ steps at $50\,\mathrm{Hz}$. What fraction of the time is the GPU busy with inference? (Enter a fraction.)
::: solution
Period $10/50 = 0.2\,\mathrm s$; $0.06/0.2 = 0.3$.
:::
:::

::: exercise Cross-fading two modes {#exr-fade level=3}
Explain, with a numerical example, why cross-fading two consecutive chunks from a diffusion policy can be dangerous near an obstacle, and propose a rule for the executor.
::: solution
Suppose the old chunk passes an obstacle at $y = -0.10\,\mathrm m$ and the new one, sampled from different noise, at $+0.10\,\mathrm m$ (the obstacle spans $\pm0.05\,\mathrm m$). A linear cross-fade over 10 steps passes through $\lambda = 0.5$, commanding $y = 0$ — inside the obstacle — exactly the averaging failure of [[vision-language-action/imitation-learning#ex-obstacle]]. Rules: blend only when the chunks agree within a tolerance over the overlap (otherwise keep executing the old chunk and re-plan); better, generate the new chunk conditioned on the actions being executed (real-time chunking), so that it continues the same mode; and let the safety filter's keep-out zones catch what remains.
:::
:::

::: exercise A deployment design review {#exr-review level=3}
A team proposes running a 7B VLA in the cloud for a fleet of arms in customers' warehouses, sending images over the internet and receiving actions. Review the proposal: latency and its variability, failure modes of the network, safety architecture, privacy, cost, and an alternative.
::: solution
Latency: internet round trips add tens to hundreds of milliseconds with heavy tails; the 99th percentile, not the median, sets the execution horizon, so the robot reacts slowly and must survive long gaps. Failure modes: lost connectivity must lead to a controlled hold or retreat by the local executor and filter, never to continued motion on stale chunks; the watchdog is essential. Safety: the filter, workspace bounds and emergency stop remain local and independent of the cloud. Privacy: camera images of customer premises leave the site — consent, encryption, retention. Cost: GPU time per arm and bandwidth (compressed images at several frames per second). Alternative: a dual-system split with a local fast policy and a remote slow model ([[vision-language-action/vla-architectures#def-dual]]), or a smaller model distilled or fine-tuned to run on an on-premises GPU, with the cloud used only for logging, training and occasional high-level planning.
:::
:::
