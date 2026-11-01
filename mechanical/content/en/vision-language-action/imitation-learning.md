A conventional robot program is a list of instructions: move to this pose, close the gripper, move to that pose. It works beautifully when the parts arrive in a fixture at a known position, and it fails the moment the world stops cooperating — a box that is 2 cm to the left, a cable that drapes differently every time, a towel that must be folded. Writing a program for such tasks means anticipating every situation, and nobody can. **Imitation learning** takes another route: a person shows the robot what to do, many times, in many slightly different situations, and a neural network learns a function from what the robot *sees* to what it should *do*. The function is called a **policy**.

This chapter covers the simplest and still the most widely used form of imitation learning, **behaviour cloning**, which treats the problem as ordinary supervised learning. We define observations, actions and policies precisely, show that behaviour cloning is a regression or classification problem, and then study the two things that go wrong. The first is **compounding error**: a policy that makes small mistakes drifts into situations the demonstrator never visited, where its mistakes grow — the error over an episode of $T$ steps grows like $T^2$ rather than $T$. The second is **multimodality**: when demonstrators solve the same situation in two different ways, a network trained with mean-squared error averages them, and the average of "go left of the obstacle" and "go right of the obstacle" is "drive into it". The remedies — DAgger, richer action distributions, action chunking — set the agenda for the rest of the course.

The chapter assumes the software picture of [[robot-arm-design/software-stack]]: a real-time joint controller running at hundreds of hertz to a few kilohertz, and higher-level commands arriving more slowly. The learned policy is one of those higher-level sources. For neural networks and their training, the LLM Atlas is the reference: [multilayer networks](/learn/llm/lesson.php?c=neural-networks&l=perceptrons-mlps), [backpropagation](/learn/llm/lesson.php?c=neural-networks&l=backpropagation) and [optimisers](/learn/llm/lesson.php?c=neural-networks&l=optimisers).

## Observations, actions and policies {#sec-policies}

At each control step $t$ the robot receives an **observation** $o_t$ and sends an **action** $a_t$. For a robot arm doing table-top manipulation, a typical observation is

- one to three camera images: a fixed "scene" camera looking at the workspace and a "wrist" camera on the end effector (often 224 × 224 or 256 × 256 pixels after resizing, RGB);
- **proprioception**: the measured joint angles (seven numbers for a 7-DOF arm), perhaps joint velocities, the gripper opening, and sometimes the end-effector pose computed by forward kinematics;
- for language-conditioned policies, an instruction such as "put the red cup on the plate".

A typical action is a 7-D vector: a small change in end-effector position (3 numbers) and orientation (3 numbers) plus a gripper command, or a target vector of joint angles. The choice matters a great deal and is the subject of [[vision-language-action/action-representations]]. The policy usually runs at 5–50 Hz; its actions are interpolated up to the joint controller's rate.

::: definition Policy, episode and demonstration {#def-policy}
A **policy** is a map from observations (or a history of observations) to actions. It may be **deterministic**, $a_t = \pi(o_t)$, or **stochastic**, a conditional probability distribution $\pi(a_t \mid o_t)$ from which the action is sampled. An **episode** is a sequence $\tau = (o_1, a_1, o_2, a_2, \dots, o_T, a_T)$ from an initial state to success, failure or a time limit; $T$ is the **horizon**. A **demonstration** is an episode in which the actions were chosen by an expert — usually a human teleoperating the arm — and a **demonstration dataset** is a set $\mathcal D = \{\tau^{(1)}, \dots, \tau^{(N)}\}$ of $N$ demonstrations.
:::

The observation is not the **state** $s_t$ of the world. The state includes the exact positions and velocities of every object, friction coefficients, the contents of a closed drawer — things no camera sees. When the observation determines the state well enough for the task, the problem is **Markov** in the observation and a policy $\pi(a_t \mid o_t)$ suffices. When it does not (an object hidden behind the gripper, a button whose effect is delayed), the policy needs **history**: $\pi(a_t \mid o_{t-k}, \dots, o_t)$.

::: example Counting the inputs and outputs {#ex-dimensions}
A policy for a 7-DOF arm with a parallel gripper uses two RGB cameras at 224 × 224 pixels, the seven joint angles and the gripper opening, and outputs a 7-D end-effector delta plus one gripper command at 10 Hz. Count the input and output numbers per step, and the number of supervised training pairs in 200 demonstrations of 25 s each.
::: solution
Images: $2 \times 224 \times 224 \times 3 = 301\,056$ numbers. Proprioception: $7 + 1 = 8$. Input total $\approx 301\,064$ numbers per step — dominated, by a factor of almost $40\,000$, by pixels. Output: $6 + 1 = 7$ numbers (three for translation, three for rotation, one for the gripper), or 8 if orientation uses a 4-number quaternion.
At 10 Hz an episode of 25 s has $T = 250$ steps, so 200 demonstrations give $200 \times 250 = 50\,000$ observation–action pairs.
Sanity check: 50,000 pairs sounds like a lot, but consecutive pairs are nearly identical (the scene changes little in 0.1 s), so the effective number of *independent* examples is closer to the number of demonstrations, 200. This is why robot learning is data-hungry, and why the image encoder is usually pretrained on other data rather than learned from these 50,000 frames alone.
:::
:::

## Behaviour cloning {#sec-bc}

The simplest thing to do with a demonstration dataset is to treat each step as a labelled example — input $o_t$, label $a_t$ — and fit a network to it.

::: definition Behaviour cloning {#def-bc}
**Behaviour cloning** (BC) fits a parametric policy $\pi_\theta$ to demonstrations by supervised learning on the observation–action pairs, minimising an empirical loss
$$
\mathcal L(\theta) = \frac{1}{\lvert\mathcal D\rvert}\sum_{(o_t, a_t)\in\mathcal D} \ell\bigl(\pi_\theta, o_t, a_t\bigr).
$$ {#eq-bc}
For a deterministic policy the loss is a regression loss such as $\ell = \norm{\pi_\theta(o_t) - a_t}^2$ (mean-squared error, MSE) or $\norm{\pi_\theta(o_t) - a_t}_1$ (L1). For a stochastic policy it is the **negative log-likelihood** $\ell = -\log \pi_\theta(a_t \mid o_t)$, so that training is maximum-likelihood estimation of the expert's action distribution.
:::

Behaviour cloning is attractive because it is nothing more than supervised learning: no reward function, no interaction with the world during training, no simulator. The data are collected once, and training is run like any other deep-learning job. Its weakness is exactly the same fact: training sees only the states the expert visited, and the trained policy will be run in a world that responds to *its* actions, not the expert's.

The two losses above are connected. If the policy outputs a Gaussian with mean $\mu_\theta(o)$ and fixed variance $\sigma^2 I$, then
$$
-\log \pi_\theta(a\mid o) = \frac{1}{2\sigma^2}\norm{a - \mu_\theta(o)}^2 + \text{const},
$$
so MSE regression *is* maximum likelihood under a single fixed-width Gaussian. Likewise L1 regression is maximum likelihood under a Laplace distribution. The choice of loss is a choice of what shape the action distribution is assumed to have — a point we return to in [[#sec-multimodal]].

::: quiz
A behaviour-cloning policy reaches 0.2 mm average action error on held-out demonstration frames. What does this tell you about how often it will succeed on the robot?
- [ ] It will succeed almost always, because 0.2 mm is far below the task tolerance.
- [x] Very little on its own: the held-out frames come from the expert's state distribution, while the robot will visit states produced by the policy's own actions.
- [ ] It will fail, because any non-zero error compounds to infinity.
::: solution
Offline action error is measured on states the *expert* reached. Running the policy produces its own trajectory, which drifts into states that may not appear in the data at all, where the error can be much larger. Offline loss is a useful debugging signal (it catches bugs and gross underfitting) but correlates only loosely with closed-loop success, which must be measured on the robot or in simulation ([[vision-language-action/policy-evaluation]]).
:::
:::

## Compounding error and covariate shift {#sec-compounding}

Imagine a policy that drives a gripper along a demonstrated path and is very slightly wrong at each step: it ends each step 0.5 mm off the expert's path. At the next step the camera image differs a little from anything in the training set. If the network generalises well, it corrects back towards the path. If it does not — and nothing in the training objective asked it to, because the expert never had to recover from being 0.5 mm off — the next error is a little larger, the image is a little more unfamiliar, and the trajectory peels away. This is **compounding error**.

::: definition Covariate shift {#def-covariate-shift}
Let $d_{\pi^*}$ be the distribution of observations visited by the expert policy $\pi^*$ and $d_{\pi_\theta}$ the distribution visited when the learned policy $\pi_\theta$ is executed. Behaviour cloning minimises the loss under $d_{\pi^*}$, but the policy is used under $d_{\pi_\theta}$. The difference between the training and test input distributions is called **covariate shift** (or distribution shift); in sequential decision-making it is caused by the policy itself, through its own mistakes.
:::

How bad can it get? Ross and Bagnell analysed the question in 2010 by counting mistakes.

::: proposition Quadratic compounding error of behaviour cloning {#prop-t2}
Consider an episode of $T$ steps with a cost of 1 for every step on which the learner's action differs from the expert's (or, more generally, any per-step cost in $[0,1]$ that is zero while the learner follows the expert). Suppose that, on states drawn from the expert's distribution, the learned policy makes a mistake with probability at most $\varepsilon$ per step, and assume the worst case that after its first mistake the learner is in unfamiliar states and incurs cost 1 on every remaining step. Then the expected total cost satisfies
$$
J(\pi_\theta) \le \sum_{t=1}^{T}\bigl[1 - (1-\varepsilon)^t\bigr] \le \varepsilon\,\frac{T(T+1)}{2} = O(\varepsilon T^2),
$$ {#eq-t2}
and there are tasks for which this order is attained. A policy whose per-step mistake rate is $\varepsilon$ *on its own* state distribution would incur only $J \le \varepsilon T$.
:::

::: proof
While the learner has made no mistake it is on the expert's trajectory, so each step is a draw from the expert's distribution, on which the mistake probability is at most $\varepsilon$. The probability that no mistake has occurred in the first $t$ steps is therefore at least $(1-\varepsilon)^t$, and the probability that at least one has occurred by step $t$ is at most $1 - (1-\varepsilon)^t$. Under the worst-case assumption, the cost at step $t$ is 1 exactly when at least one mistake has occurred at or before $t$, so the expected cost at step $t$ is at most $1-(1-\varepsilon)^t$. Summing over $t$ gives the first inequality. Bernoulli's inequality $(1-\varepsilon)^t \ge 1 - t\varepsilon$ (valid for $0\le\varepsilon\le1$, $t\ge1$) gives $1-(1-\varepsilon)^t \le t\varepsilon$, and $\sum_{t=1}^T t = T(T+1)/2$ gives the second.
For attainment, take a "narrow ledge": one mistake moves the system into a region from which the expert's data contain no recovery, and every subsequent step costs 1. For small $\varepsilon T$, a mistake at step $t$ costs $T - t + 1$, and the expected cost is $\sum_t \varepsilon(1-\varepsilon)^{t-1}(T-t+1) \approx \varepsilon T^2/2$.
For the last statement, if the mistake probability is at most $\varepsilon$ at every step under the learner's own distribution, the expected cost at each step is at most $\varepsilon$, and the sum over $T$ steps is at most $\varepsilon T$.
:::

The analysis is deliberately pessimistic — real policies often recover from small errors because the network generalises — but it captures the shape of the problem: the *same* per-step accuracy is worth much less in a long task than in a short one. A more practical reading uses the probability that an episode survives without an unrecoverable error, $(1-\varepsilon)^T$.

::: example How long a task can a policy do? {#ex-survival}
A policy makes an unrecoverable mistake with probability $\varepsilon = 0.005$ per step. It runs at 10 Hz. Estimate the success probability of a 30 s task, and what $\varepsilon$ would be needed for 90% success. Compare the BC cost bound with the $\varepsilon T$ bound.
::: solution
$T = 30\,\mathrm s \times 10\,\mathrm{Hz} = 300$ steps. Success probability $(1-0.005)^{300} = 0.222$ — barely one attempt in five.
For 90% success, $(1-\varepsilon)^{300} = 0.9$ gives $\varepsilon = 1 - 0.9^{1/300} = 3.51\times10^{-4}$: the per-step failure rate must drop by a factor of about 14.
The bound [[#eq-t2]] with $\varepsilon = 0.005$ is $0.005 \times 300 \times 301/2 = 226$ costly steps out of 300; the $\varepsilon T$ bound is $1.5$. Sanity check: the quadratic bound is not far from $T = 300$ itself, the worst possible cost, consistent with a success probability of only 22%.
Two engineering lessons follow. Shorter effective horizons help — this is one reason *action chunking* ([[vision-language-action/action-representations]]), which makes one decision every several control steps, works so well. And recovery data — demonstrations that start from slightly wrong states — attack the problem directly.
:::
:::

::: widget plot
f: (1 - r)^x; 1 - r*(x + 1)/2
x: 0, 600
y: 0, 1
sliders: r=0.0005:0.0005:0.01
labels: (1-\varepsilon)^T\ \text{survival}; 1-\varepsilon (T+1)/2\ \text{(BC bound, per step)}
caption: Probability that an episode of $T$ steps (horizontal axis) contains no unrecoverable error, for a per-step failure probability $\varepsilon$ set by the slider $r$; the second curve is one minus the behaviour-cloning bound on the average cost per step. Halve $\varepsilon$ and notice that the horizon at which success falls to 50% doubles: success depends on the product $\varepsilon T$.
:::

### DAgger: asking the expert where the learner goes {#sec-dagger}

The proof of [[#prop-t2]] shows where the extra factor of $T$ comes from: the learner is trained on one distribution and tested on another. **DAgger** (Dataset Aggregation; Ross, Gordon and Bagnell, 2011) removes the mismatch by collecting expert labels *on the states the learner visits*.

::: algorithm DAgger {#alg-dagger}
1. Collect an initial dataset $\mathcal D_0$ of expert demonstrations and train $\pi_1$ on it by behaviour cloning.
2. For iterations $i = 1, 2, \dots, K$:
   - Run the current policy $\pi_i$ (optionally mixed with the expert: execute the expert's action with probability $\beta_i$, decreasing to 0) and record the observations it visits.
   - Ask the expert to label each visited observation $o$ with the action $\pi^*(o)$ it would have taken.
   - Aggregate: $\mathcal D_i = \mathcal D_{i-1}\cup\{(o, \pi^*(o))\}$.
   - Train $\pi_{i+1}$ on $\mathcal D_i$.
3. Return the best policy on validation episodes.
:::

Because the training distribution now contains the learner's own states, the learner is trained where it is tested, and Ross, Gordon and Bagnell proved, using the theory of no-regret online learning, that the resulting cost grows only linearly, $O(\varepsilon T)$, in the horizon.

The catch on a real arm is step 2: asking a human to label an action for every frame of a robot's trajectory, *after the fact*, is unnatural — people cannot easily say what joint velocity they would have commanded while watching a video. Practical variants let the human intervene instead. In **human-gated DAgger** (HG-DAgger, Kelly et al., 2019) the operator watches the policy run with the teleoperation device in hand and takes over when it goes wrong; the takeover segment — a recovery from a state the policy produced — is added to the data. Many industrial data-collection programmes use this pattern ("intervention data"), together with deliberately perturbed demonstrations in which the operator starts from a slightly wrong pose and corrects it.

::: warning Recovery data without the mistakes
When adding intervention data, record only the *expert's* corrective actions as training labels. If the frames in which the policy was drifting (before the human took over) are kept with the policy's own actions as labels, the dataset now teaches the mistakes. Mark every frame in the log with who was in control, and filter on that flag when building the training set.
:::

## Multimodal demonstrations {#sec-multimodal}

Covariate shift is a problem of *where* the policy is evaluated. The second failure of naive behaviour cloning is a problem of *what* it learns at a single state. Human demonstrations are rarely consistent: faced with a mug, one operator grasps the handle and another the rim; facing an obstacle, half go round the left and half round the right. The expert's action distribution $\pi^*(a\mid o)$ then has several separate peaks — it is **multimodal**.

::: proposition The MSE-optimal policy is the conditional mean {#prop-mean}
Among all functions $f$ of the observation, the expected squared error $\E\bigl[\norm{a - f(o)}^2\bigr]$ over the demonstration distribution is minimised by the conditional mean $f^*(o) = \E[a\mid o]$. The L1 error $\E\bigl[\lvert a - f(o)\rvert\bigr]$ of a scalar action is minimised by a conditional median.
:::

::: proof
Fix $o$ and write $m = \E[a\mid o]$. For any candidate $c$,
$$
\E\bigl[\norm{a-c}^2\mid o\bigr] = \E\bigl[\norm{(a-m) + (m-c)}^2\mid o\bigr] = \E\bigl[\norm{a-m}^2\mid o\bigr] + \norm{m-c}^2,
$$
because the cross term $2(m-c)\T\E[a-m\mid o] = 0$. The right-hand side is smallest when $c = m$. Averaging over $o$, the function $f^*(o) = \E[a\mid o]$ is optimal. For L1, $g(c) = \E\lvert a - c\rvert$ is convex with (sub)derivative $\Prob(a < c) - \Prob(a > c)$, which changes sign at a median.
:::

The conditional mean of a multimodal distribution is generally *between* the modes, where the expert never acts. For a policy, that average is often the one action guaranteed to fail.

::: example Averaging round an obstacle {#ex-obstacle}
A gripper must pass a post that occupies $-0.05\,\mathrm m < y < 0.05\,\mathrm m$. In 60% of the demonstrations the operator went round the left at $y = -0.10\,\mathrm m$; in 40% round the right at $y = +0.10\,\mathrm m$. (a) Which lateral position does an MSE-trained policy choose? (b) Compare the MSE of that choice with that of always going left. (c) A two-component Gaussian mixture head with weights $0.6/0.4$, means $\mp0.10\,\mathrm m$ and standard deviation $0.02\,\mathrm m$ is fitted. What is its negative log-likelihood at $y = -0.10$, $+0.10$ and $-0.02\,\mathrm m$?
::: solution
(a) By [[#prop-mean]], $y^* = 0.6(-0.10) + 0.4(0.10) = -0.02\,\mathrm m$ — inside the post. The policy collides.
(b) MSE at $y = -0.02$: $0.6(-0.10+0.02)^2 + 0.4(0.10+0.02)^2 = 0.6(0.0064) + 0.4(0.0144) = 0.0096\,\mathrm{m^2}$. MSE of always going left: $0.6(0) + 0.4(0.20)^2 = 0.0160\,\mathrm{m^2}$. The loss *prefers* the colliding action by a wide margin; no amount of training data or network capacity fixes this, because the loss itself is minimised by the average.
(c) The mixture density is $p(y) = 0.6\,\mathcal N(y; -0.1, 0.02^2) + 0.4\,\mathcal N(y; 0.1, 0.02^2)$, with peak height of each Gaussian $1/(0.02\sqrt{2\pi}) = 19.95\,\mathrm{m^{-1}}$. At $y = -0.10$ the second component contributes $e^{-50}$, negligible, so $p = 0.6 \times 19.95 = 11.97$ and $-\log p = -2.48$. At $+0.10$: $p = 0.4\times19.95 = 7.98$, $-\log p = -2.08$. At $-0.02$: both components are 4 and 6 standard deviations away, $p = 0.6\times19.95\,e^{-8} + 0.4\times19.95\,e^{-18} = 4.0\times10^{-3}$, $-\log p = 5.52$. The likelihood loss puts its probability on the modes and almost none between them; sampling from it gives left 60% of the time and right 40%, both safe.
Sanity check: the L1 loss in this example would choose the median, $-0.10\,\mathrm m$, which happens to be safe — but only because one mode holds more than half the data. With three modes of 33% each, the median is the middle mode; with continuous spreads it can again fall between modes.
:::
:::

::: widget plot
f: p*exp(-(x + d)^2/(2*0.02^2))/(0.02*sqrt(2*pi))/20; (p*(x + d)^2 + (1 - p)*(x - d)^2)*25
x: -0.2, 0.2
y: 0, 1.2
sliders: p=0.05:0.05:0.95; d=0.02:0.01:0.15
labels: \text{left mode (scaled)}; \text{MSE of predicting } y\ \text{(scaled)}
caption: The first curve is the left-hand mode of a two-way demonstration distribution with weight $p$ at $y=-d$ (the right-hand mode, weight $1-p$, sits at $+d$); the second is the mean-squared error of a policy that always predicts $y$. Move $p$ and $d$: the MSE minimum always lies at the weighted mean $(1-2p)d$, between the modes, and moves smoothly from one mode to the other instead of picking one.
:::

### Richer action heads

The cure is to give the policy an output that can represent several peaks, and to train it by likelihood (or an equivalent objective) rather than squared error. Three families are used.

1. **Mixture density heads.** The network outputs the weights $w_k$, means $\boldsymbol\mu_k$ and (diagonal) variances of $K$ Gaussian components, $\pi_\theta(a\mid o) = \sum_k w_k\,\mathcal N(a; \boldsymbol\mu_k, \Sigma_k)$, trained by negative log-likelihood. With $K = 5$ to $10$ this was a strong baseline in robot-learning benchmarks around 2021. Mixtures can be hard to train (components collapse together or one component takes all the weight) and become awkward in high dimensions.
2. **Classification over discretised actions.** Each action dimension is divided into bins — 256 in RT-1 and RT-2 — and the network outputs a categorical distribution over bins, trained with cross-entropy. A categorical distribution can represent any number of modes per dimension. Its limitations are resolution and the independence of dimensions, and it is the basis of "actions as tokens" in [[vision-language-action/action-representations]].
3. **Generative models of the whole action.** Diffusion and flow-matching models ([[vision-language-action/diffusion-flow-policies]]) learn to *sample* from an arbitrary distribution over a whole chunk of actions, and are the dominant approach for continuous control as of 2026. Implicit (energy-based) policies, which score candidate actions and pick the best, were an intermediate step (Florence et al., 2021).

::: example Resolution of a 256-bin classifier head {#ex-bins}
An end-effector translation command per step is limited to $\pm 5\,\mathrm{cm}$ and discretised uniformly into 256 bins per axis. Find the bin width, the maximum quantisation error and the RMS quantisation error, and compare with the repeatability of a typical collaborative arm (about $\pm 0.03$–$0.1\,\mathrm{mm}$).
::: solution
Range $0.10\,\mathrm m$; bin width $\Delta = 0.10/256 = 3.91\times10^{-4}\,\mathrm m = 0.391\,\mathrm{mm}$. The decoded action is the bin centre, so the maximum error is $\Delta/2 = 0.195\,\mathrm{mm}$; for an action uniformly distributed within a bin the RMS error is $\Delta/\sqrt{12} = 0.113\,\mathrm{mm}$.
This is larger than the arm's repeatability but small compared with the few-millimetre tolerance of most grasps. Note that it is a *per-step* error: if the policy is integrating deltas, quantisation errors accumulate, although closed-loop feedback from the cameras corrects them. A tighter range ($\pm 2\,\mathrm{cm}$) gives $0.156\,\mathrm{mm}$ bins but clips faster motions — the range and the bin count must be chosen from the statistics of the data, which is why VLA training pipelines compute per-dimension quantiles of the actions before discretising.
:::
:::

## History, observations and causal confusion {#sec-history}

Should the policy see one frame or several? Adding history seems harmless — more information cannot hurt a perfect learner — but in practice it often makes behaviour cloning *worse*. The reason was named **causal confusion** by de Haan, Jayaraman and Levine (2019): with history, the network can find a shortcut that predicts the expert's action from the robot's own recent motion rather than from the scene. In a demonstration, the arm moving down at step $t-1$ is an excellent predictor of the arm moving down at step $t$. A network that learns "keep doing what you were doing" achieves low training loss and fails completely when it must *start* a motion. The related **copycat problem** appears with proprioceptive history: the past actions are almost a copy of the label.

Practical consequences, as reflected in widely used policies:

- Most successful manipulation policies use **short history** — the current frame, or one or two past frames — and supply temporal context by predicting *chunks* of future actions instead ([[vision-language-action/action-representations]]).
- **Proprioception** helps precision (the network knows exactly where the gripper is) but invites shortcuts; some pipelines add noise to it or drop it out during training.
- A **wrist camera** is one of the most effective single additions for grasping: it sees the object at close range, in the gripper's own frame, where small errors are large in pixels.
- Observations should contain what the expert used to decide. If an operator looked at a display, or listened for a click, that information must be in the observation or the policy will see the expert act "for no reason" — which looks like multimodality.

::: remark Imitation versus reinforcement learning
Reinforcement learning (RL) optimises a reward by trial and error and has no covariate-shift problem in principle, since it learns from its own experience. On real arms it is limited by the cost and safety of exploration and by the difficulty of writing rewards for tasks like "fold the shirt neatly". Imitation learning gets a good policy quickly from demonstrations; RL can then fine-tune it. As of 2026 most deployed learned manipulation policies are trained mainly by imitation, with RL used for fine-tuning in some systems. Sutton and Barto (see the course references) is the standard introduction.
:::

::: example Choosing a loss for a pick-and-place cell {#ex-design}
A robot arm picks bolts from a bin and places them in a fixture. Demonstrations were collected by four operators. Inspection shows that for the place motion all operators move almost identically, but for the pick, operators choose different bolts in the bin. Recommend an action head and explain how you would check whether the data are multimodal.
::: solution
The pick is inherently multimodal: given the same bin image, the "correct" target is any of several bolts, and an MSE head would aim between two bolts. A head that represents a distribution is required — a diffusion or flow head over an action chunk, or a discretised head — trained by likelihood (or its diffusion/flow equivalent). For the place motion, unimodal regression would suffice, but one head serves both.
To check for multimodality, find near-duplicate observations (e.g. nearest neighbours in the image-embedding space of a pretrained encoder) and plot the spread of the corresponding expert actions. A spread that splits into clusters is multimodal; a spread that is merely wide may be inconsistent operating, which is better fixed at the data-collection stage ([[vision-language-action/demonstration-data]]). A second check is behavioural: if a regression policy hovers, hesitates or oscillates between two targets on the robot, it is averaging modes.
Sanity check: the required capacity is modest — a handful of modes in a low-dimensional action — so even a classification head with 256 bins per dimension would represent it; the choice between heads is then decided by smoothness and inference speed rather than by expressiveness.
:::
:::

::: history
Behaviour cloning is older than deep learning. Dean Pomerleau's ALVINN (1988–89) at Carnegie Mellon was a three-layer network with a 30 × 32 input "retina" that learned to steer a van from recordings of a human driver; Pomerleau already saw covariate shift — a network trained only on good driving never sees the car drifting off-centre — and fixed it by synthesising shifted views of the road with the corresponding corrective steering. Stéphane Ross and Drew Bagnell gave the $T^2$ analysis in 2010, and with Geoffrey Gordon introduced DAgger in 2011, tested on a racing game and Super Mario Bros. Deep visuomotor policies trained end to end from pixels arrived around 2016 (Levine, Finn, Darrell and Abbeel). In 2022 Google's RT-1 showed that behaviour cloning with a Transformer and about 130,000 real demonstrations could produce a single policy for hundreds of instructions, and in 2023 Diffusion Policy (Chi et al.) and ACT (Zhao et al.) solved the multimodality and precision problems well enough that behaviour cloning became the default recipe for learned manipulation.
:::

::: summary
- A **policy** maps observations (images, proprioception, instruction) to actions; **behaviour cloning** fits it by supervised learning on demonstration pairs.
- MSE regression is maximum likelihood under a unimodal Gaussian; the loss encodes an assumption about the shape of the expert's action distribution.
- **Covariate shift**: the policy is trained on the expert's states and run on its own. In the worst case the expected cost grows as $O(\varepsilon T^2)$, against $O(\varepsilon T)$ when training and test distributions match; the probability of a clean episode is about $(1-\varepsilon)^T$.
- **DAgger** labels the learner's own states; on real arms, human interventions and recovery demonstrations play the same role. Label only the expert's corrective actions.
- **Multimodal** demonstrations make the MSE-optimal action the conditional mean, which can lie between safe modes. Mixture, categorical and generative (diffusion, flow) heads trained by likelihood represent several modes.
- Long history invites **causal confusion**; short history plus action chunks and a wrist camera is the usual design.
:::

## Exercises

::: exercise Pairs in a dataset {#exr-pairs level=1 check="72000"}
A dataset contains 120 demonstrations of 40 s each, recorded at 15 Hz. How many observation–action pairs does it contain? (Enter the number of pairs.)
::: solution
$T = 40 \times 15 = 600$ steps per demonstration; $120 \times 600 = 72\,000$ pairs.
:::
:::

::: exercise MSE optimum of a three-way split {#exr-mean3 level=1 check="0.015"}
At one state the demonstrators' lateral offsets are $-0.06\,\mathrm m$ (25%), $0.02\,\mathrm m$ (50%) and $0.08\,\mathrm m$ (25%). Which offset does an MSE-trained deterministic policy output? (Enter the offset in m.)
::: solution
The conditional mean: $0.25(-0.06) + 0.5(0.02) + 0.25(0.08) = -0.015 + 0.010 + 0.020 = 0.015\,\mathrm m$. It lies between the first two modes, where no demonstrator acted. (The L1 optimum would be the median, $0.02\,\mathrm m$.)
:::
:::

::: exercise Survival over a longer task {#exr-survive level=1 check="0.549"}
A policy with an unrecoverable-mistake probability of $\varepsilon = 0.001$ per step runs at 20 Hz on a 30 s task. Estimate the success probability. (Enter it as a fraction to three decimal places.)
::: solution
$T = 600$; $(1-0.001)^{600} = e^{600\ln 0.999} = e^{-0.6003} = 0.549$.
:::
:::

::: exercise Per-step reliability for a target {#exr-eps level=2 check="5.27e-4"}
A 20 s task at 10 Hz must succeed 90% of the time under the model $(1-\varepsilon)^T$. What is the largest allowable per-step failure probability $\varepsilon$? (Enter $\varepsilon$ to three significant figures.)
::: solution
$T = 200$; $\varepsilon = 1 - 0.9^{1/200} = 1 - e^{\ln(0.9)/200} = 1 - e^{-5.268\times10^{-4}} = 5.27\times10^{-4}$. Approximately $-\ln(0.9)/T = 0.1054/200$, which is accurate when $\varepsilon$ is small.
:::
:::

::: exercise Action chunking and the horizon {#exr-chunk level=2 check="0.740"}
The same policy as in [[#ex-survival]] is changed to predict 10-step action chunks and to execute each chunk open-loop, so that it makes one decision every 10 control steps. Suppose the probability of an unrecoverable mistake is now $\varepsilon_c = 0.01$ *per decision* (higher than per step, because each decision commits to a full second of motion). Find the success probability of the 30 s task. (Enter it to three decimal places.)
::: solution
Decisions: $300/10 = 30$. Success $(1-0.01)^{30} = 0.99^{30} = 0.740$. Compared with 0.222 for per-step decisions, the shorter effective horizon outweighs the higher per-decision error rate. The model is crude (open-loop execution cannot react within a chunk) but shows why chunking helped behaviour cloning so much.
:::
:::

::: exercise Gaussian versus mixture likelihood {#exr-nll level=2}
For the demonstration distribution of [[#ex-obstacle]] (60% at $-0.10\,\mathrm m$, 40% at $+0.10\,\mathrm m$), compare the average negative log-likelihood of (a) the best single Gaussian and (b) the two-component mixture with $\sigma = 0.02\,\mathrm m$ given in the example. Treat the demonstrations as exactly at $\pm0.10\,\mathrm m$.
::: solution
(a) The maximum-likelihood single Gaussian has the data mean $-0.02\,\mathrm m$ and variance $0.0096\,\mathrm{m^2}$ (computed in the example), standard deviation $0.098\,\mathrm m$. Its average NLL is $\tfrac12\ln(2\pi\sigma^2) + \tfrac12 = \tfrac12\ln(0.0603) + 0.5 = -1.404 + 0.5 = -0.904$. (b) The mixture's NLL is $-2.48$ at the left mode and $-2.08$ at the right, average $0.6(-2.48) + 0.4(-2.08) = -2.32$. The mixture fits the data far better (lower NLL by $1.42$ nats per sample), and — more importantly — puts almost no probability on the collision region, while the single Gaussian's peak is at the collision point.
:::
:::

::: exercise The quadratic bound for a narrow ledge {#exr-ledge level=3}
In the narrow-ledge task of [[#prop-t2]], a mistake at step $t$ incurs cost 1 on steps $t, t+1, \dots, T$, and the learner errs with probability $\varepsilon$ at each step until its first mistake. Show that the expected cost is $J = \sum_{t=1}^{T} \varepsilon(1-\varepsilon)^{t-1}(T-t+1)$, evaluate it for $\varepsilon = 0.01$, $T = 50$, and compare with $\varepsilon T^2/2$ and $\varepsilon T$.
::: hint
The first mistake happens at step $t$ with probability $\varepsilon(1-\varepsilon)^{t-1}$. Evaluating the sum numerically is fine.
:::
::: solution
The events "first mistake at step $t$" for $t = 1,\dots,T$ are disjoint, with probability $\varepsilon(1-\varepsilon)^{t-1}$; the cost is then $T - t + 1$. Summing gives $J$; the sum has the closed form $J = T - (1-\varepsilon)\bigl(1 - (1-\varepsilon)^T\bigr)/\varepsilon$. With $\varepsilon = 0.01$ and $T = 50$, $(1-\varepsilon)^T = 0.605$, so $J = 50 - 0.99\times0.395/0.01 = 10.9$. The approximation $\varepsilon T^2/2 = 12.5$ overestimates slightly because it ignores the possibility of no mistakes; the linear rate $\varepsilon T = 0.5$ is twenty times smaller. The quadratic growth comes from the factor $(T - t + 1)$: an early mistake costs the whole remaining episode.
:::
:::

::: exercise Planning an intervention-data programme {#exr-intervention level=3}
Your company's first behaviour-cloning policy for inserting a connector succeeds in 55% of trials. Failure videos show that the policy approaches correctly but, when the connector catches on the housing edge, it keeps pushing instead of backing off and re-aligning. Design a data-collection plan (who, what, how much, how labelled) to fix this, and say how you would know it worked.
::: solution
The failure is a state the demonstrations never visited (connector caught on the edge), so this is covariate shift, not multimodality. Plan: (1) Run the current policy with an operator holding the teleoperation device; when the connector catches, the operator takes over, backs off, re-aligns and completes the insertion (HG-DAgger style). Log a "who is in control" flag on every frame. (2) Also collect deliberate recovery demonstrations: the operator starts from mis-aligned contacts and recovers. (3) Collect enough to matter in the mixture — of order 50–100 intervention episodes, a substantial fraction of a few hundred original demonstrations, since the recovery states are rare in the original data. (4) Train on the original data plus only the operator-controlled frames. (5) Evaluate old and new policies with the same set of initial conditions, blind and interleaved, and report success with confidence intervals ([[vision-language-action/policy-evaluation]]); also count how often the catch-on-edge state occurs and how often it is now recovered. Repeat if new failure modes appear — DAgger is iterative by design.
:::
:::

::: exercise Why a perfect learner can still fail {#exr-perfect level=3}
Explain, with an example from robot manipulation, how a behaviour-cloning policy can achieve *zero* error on the expert's state distribution and still fail on the robot. What property would the expert's demonstrations need for this not to happen?
::: solution
Zero error under $d_{\pi^*}$ says nothing about states outside its support. Any disturbance not present in the data — a sensor glitch, a contact that slips, a part placed 3 cm outside the demonstrated range, the actuator tracking a command with slightly different dynamics from the one used during teleoperation — moves the robot off the expert's trajectories, and the policy's behaviour there is whatever the network happens to extrapolate. Example: all demonstrations grasp a mug perfectly first time, so the dataset contains no images of a missed grasp; after a miss the policy may lift an empty gripper. For BC to be robust the demonstrations must cover a neighbourhood of the expert's trajectories with corrective actions: the expert should be "noisy but recovering" (perturbed starts, injected noise during teleoperation — the idea behind the DART method of Laskey et al., 2017 — or intervention data), so that $d_{\pi^*}$ contains the states the learner will reach.
:::
:::
