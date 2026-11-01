A policy's output is a number, or a list of numbers, that the robot turns into motion. What those numbers *mean* — joint angles or end-effector poses, absolute targets or small increments, one step or a whole second of future motion, real numbers or discrete tokens — is the **action representation**, and it influences almost everything about a learned policy: whether it can be trained on data from other robots, how precise and how smooth it is, whether it can express multimodal behaviour, how many network evaluations it needs per second, and how quickly it reacts to the unexpected.

This chapter works through the choices one at a time. First the **action space**: joint versus end-effector, absolute versus delta, the frame a delta is expressed in, the representation of rotations (and why a six-number representation is preferred by learning methods), and the gripper. Then **normalisation and discretisation**: binning each dimension into 256 levels and treating the bins as tokens of a language model, as RT-2 and OpenVLA do, and the frequency-space tokenisation (FAST) that compresses a whole chunk of actions with a discrete cosine transform. Finally **action chunking**: predicting many future actions at once, executing them open-loop or blending overlapping predictions by temporal ensembling, and the trade-off between control rate, chunk length and reaction time. The kinematics behind joint and end-effector spaces is in [[robotics/forward-kinematics]], [[robotics/jacobians]] and [[robotics/rigid-motions]].

## Action spaces {#sec-spaces}

::: definition Action space {#def-action-space}
An **action space** specifies what the policy's output vector commands, in which units and frame, and how the low-level controller executes it. The common choices for an arm are
- **absolute joint positions** $\mathbf q^{\mathrm{cmd}}_t\in\R^n$ (the target angle of each of $n$ joints);
- **joint deltas** $\Delta\mathbf q_t = \mathbf q^{\mathrm{cmd}}_t - \mathbf q_t$ or joint velocities $\dot{\mathbf q}^{\mathrm{cmd}}_t$;
- **absolute end-effector poses** $T^{\mathrm{cmd}}_t\in SE(3)$, a position $\mathbf p\in\R^3$ and an orientation $R\in SO(3)$ of the tool in the robot base frame;
- **end-effector deltas** $(\Delta\mathbf p_t, \Delta R_t)$, a small translation and rotation expressed in the base frame or in the current tool frame;
plus one or more **gripper** dimensions (open/close, or a target finger width).
:::

Each choice has a different set of strengths.

**Joint space** needs no inverse kinematics at run time, so there are no singularities or IK failures, and the policy controls redundancy (the elbow of a 7-DOF arm) directly. Leader–follower demonstrations ([[vision-language-action/demonstration-data]]) produce joint commands natively. But joint actions are specific to one arm: a dataset recorded on one robot says nothing directly about another with different link lengths.

**End-effector space** is closer to the task — "move the gripper 2 cm towards the cup" means the same thing on any arm — so it is the natural choice for pooling data across robots, and most of the Open X-Embodiment datasets use end-effector deltas. Its costs are an IK or Cartesian controller in the loop, with all of its singularities and joint-limit problems ([[robotics/inverse-kinematics]]), and ambiguity for redundant arms.

**Absolute versus delta.** A delta $\Delta\mathbf p$ is small and has similar statistics everywhere in the workspace, which makes it easy to learn and to share between tasks. But errors in executed deltas accumulate — the robot drifts if the controller under-shoots each increment — and a delta has to be interpreted relative to *something*: the measured pose, or the previous command. Absolute targets do not drift and are more robust to controller lag, but their distribution depends on where the task is in the workspace. Many recent chunking policies predict absolute joint targets (ACT, π0 on bimanual arms), while many cross-embodiment datasets use deltas; conversion between them is easy if the dataset records both commands and measured states.

::: example A delta in the tool frame {#ex-tool-frame}
The tool frame of a gripper is rotated $+90^\circ$ about the base $z$-axis relative to the base frame (its $x$-axis points along base $y$). The policy outputs a translation delta $\Delta\mathbf p^{\mathrm{tool}} = (10, 0, -5)\,\mathrm{mm}$ in the tool frame. Find the delta in the base frame. What would happen if the controller interpreted the output as a base-frame delta?
::: solution
The rotation from tool to base coordinates is
$$
R = R_z(90^\circ) = \begin{pmatrix} 0 & -1 & 0\\ 1 & 0 & 0\\ 0 & 0 & 1\end{pmatrix},\qquad \Delta\mathbf p^{\mathrm{base}} = R\,\Delta\mathbf p^{\mathrm{tool}} = \begin{pmatrix} 0\\ 10\\ -5\end{pmatrix}\mathrm{mm}.
$$
The gripper moves 10 mm along base $y$ and 5 mm down. Interpreted as a base-frame command, the same numbers would move it 10 mm along base $x$ — at right angles to the intended direction. Sanity check: the vertical component is unchanged because the rotation is about $z$. A mismatch of this kind between dataset and controller is one of the commonest silent bugs when a model trained on one dataset is run on another robot; the action frame belongs in the dataset metadata.
:::
:::

Rotation deltas compose differently in the two frames: $R_{t+1} = \Delta R\,R_t$ for a base-frame delta and $R_{t+1} = R_t\,\Delta R$ for a tool-frame delta ([[robotics/rigid-motions]]).

### Representing rotations {#sec-rotations}

An orientation has three degrees of freedom, but no set of three numbers describes it well everywhere. **Euler angles** jump by $2\pi$ when an angle wraps and lose a degree of freedom at gimbal lock. **Axis–angle** vectors $\boldsymbol\phi = \theta\,\mathbf u$ jump from $\pi\mathbf u$ to $-\pi\mathbf u$ for the same rotation. **Unit quaternions** are smooth but double-cover: $\mathbf q$ and $-\mathbf q$ are the same rotation, so a network asked to output "the" quaternion must learn an arbitrary choice that flips sign discontinuously somewhere. For a neural network, which is a continuous function of its inputs, a target that jumps for nearly identical inputs is very hard to fit.

Zhou, Barnes, Lu, Yang and Li showed in 2019 that this is unavoidable in low dimension — every representation of 3D rotations by vectors in $\R^d$ with $d\le4$ is discontinuous somewhere — and proposed a continuous representation in six dimensions.

::: proposition The 6D rotation representation {#prop-6d}
Represent $R = [\mathbf r_1\ \mathbf r_2\ \mathbf r_3]\in SO(3)$ by its first two columns, $(\mathbf r_1, \mathbf r_2)\in\R^6$. Conversely, map any pair $(\mathbf a_1, \mathbf a_2)$ of linearly independent vectors to
$$
\mathbf b_1 = \frac{\mathbf a_1}{\norm{\mathbf a_1}},\qquad \mathbf b_2 = \frac{\mathbf a_2 - (\mathbf b_1\cdot\mathbf a_2)\,\mathbf b_1}{\norm{\mathbf a_2 - (\mathbf b_1\cdot\mathbf a_2)\,\mathbf b_1}},\qquad \mathbf b_3 = \mathbf b_1\times\mathbf b_2,\qquad R = [\mathbf b_1\ \mathbf b_2\ \mathbf b_3].
$$ {#eq-gram-schmidt}
Then $R\in SO(3)$; applying the map to the first two columns of a rotation returns that rotation; and both maps are continuous (the second on the set of linearly independent pairs).
:::

::: proof
$\mathbf b_1$ is a unit vector. $\mathbf b_2$ is $\mathbf a_2$ minus its component along $\mathbf b_1$, so $\mathbf b_1\cdot\mathbf b_2 = 0$, and it is normalised; the denominator is non-zero exactly when $\mathbf a_2$ is not parallel to $\mathbf a_1$. The cross product of two orthonormal vectors is a unit vector orthogonal to both with $\det[\mathbf b_1\ \mathbf b_2\ \mathbf b_3] = (\mathbf b_1\times\mathbf b_2)\cdot\mathbf b_3 = \norm{\mathbf b_3}^2 = 1$, so $R$ is orthogonal with determinant $+1$, a rotation. If $(\mathbf a_1, \mathbf a_2) = (\mathbf r_1, \mathbf r_2)$ are the columns of a rotation, they are already orthonormal, so $\mathbf b_1 = \mathbf r_1$, $\mathbf b_2 = \mathbf r_2$, and $\mathbf b_3 = \mathbf r_1\times\mathbf r_2 = \mathbf r_3$ for a right-handed frame. Taking columns is linear, hence continuous; the Gram–Schmidt map is built from sums, products, cross products and division by norms that do not vanish on its domain, hence continuous there.
:::

The network outputs six unconstrained numbers, the loss can be computed on the reconstructed matrix (or on the six numbers directly), and nothing jumps. The 6D representation is common for *absolute* orientations in learned policies. For small *deltas*, the discontinuities of axis–angle and Euler angles are far away (they occur near rotations of $\pi$), so three-number deltas are widely used and perfectly adequate.

::: example Recovering a rotation from a noisy 6D output {#ex-6d}
The true orientation is $R_z(30^\circ)$, whose first two columns are $(0.866, 0.5, 0)$ and $(-0.5, 0.866, 0)$. A network outputs $\mathbf a_1 = (0.90, 0.45, 0.05)$, $\mathbf a_2 = (-0.40, 0.90, 0.00)$. Reconstruct $R$ with [[#eq-gram-schmidt]] and find its angular error.
::: solution
$\norm{\mathbf a_1} = 1.0075$, so $\mathbf b_1 = (0.8933, 0.4467, 0.0496)$. $\mathbf b_1\cdot\mathbf a_2 = -0.3573 + 0.4020 + 0 = 0.0447$; $\mathbf a_2 - 0.0447\,\mathbf b_1 = (-0.4399, 0.8800, -0.0022)$, of norm $0.9839$, so $\mathbf b_2 = (-0.4471, 0.8945, -0.0023)$. $\mathbf b_3 = \mathbf b_1\times\mathbf b_2 = (-0.0454, -0.0202, 0.9988)$.
The angle of the error rotation $R_{\mathrm{true}}\T R$ follows from $\tr(R_{\mathrm{true}}\T R) = 1 + 2\cos\theta_{\mathrm{err}}$; numerically $\theta_{\mathrm{err}} = 4.5^\circ$.
Sanity check: $\mathbf b_1$ points at $\arctan(0.4467/0.8933) = 26.6^\circ$ in the $xy$-plane, $3.4^\circ$ short of $30^\circ$, and tilts $2.8^\circ$ out of the plane; a combined error of a few degrees is consistent. The output is always a valid rotation, however wrong the raw numbers — the property that makes the representation safe to use.
:::
:::

### The gripper

A parallel gripper is often commanded by a single number: a target width, or a binary open/close. Gripper actions are nearly binary in the data — long stretches fully open or fully closed and short transitions — which makes them easy to classify but awkward to regress (an MSE head predicts "half closed" at the moment of decision). Most policies either threshold a continuous output (close if $> 0.5$) or treat the gripper as a separate binary or categorical output. Dexterous hands add one dimension per actuated joint and are treated like extra arm joints.

## Normalisation and discretisation {#sec-discretisation}

Different action dimensions have different units and ranges — metres, radians, a gripper fraction — so they are **normalised** before training. Diffusion and flow policies usually standardise each dimension to zero mean and unit variance, or map it to $[-1, 1]$. Discretising policies map a range $[a_{\min}, a_{\max}]$ to bins; robust choices of the range use quantiles of the data (OpenVLA, 2024, used the 1st and 99th percentiles) so that rare outliers do not waste resolution.

::: proposition Quantisation error of uniform bins {#prop-quant}
Divide $[a_{\min}, a_{\max}]$ into $B$ equal bins of width $\Delta = (a_{\max} - a_{\min})/B$ and decode each bin to its centre. Then the decoding error of any action in range is at most $\Delta/2$, and if the action is uniformly distributed within its bin, the root-mean-square error is $\Delta/\sqrt{12}$.
:::

::: proof
An action $a$ in a bin $[c - \Delta/2, c + \Delta/2)$ is decoded to the centre $c$, so $\lvert a - c\rvert\le\Delta/2$. If $e = a - c$ is uniform on $[-\Delta/2, \Delta/2]$, its mean is 0 and its mean square is $\frac{1}{\Delta}\int_{-\Delta/2}^{\Delta/2} e^2\,de = \frac{1}{\Delta}\cdot\frac{2}{3}\left(\frac{\Delta}{2}\right)^3 = \frac{\Delta^2}{12}$.
:::

### Actions as tokens

A language model predicts the next token from a vocabulary. **RT-2** (Brohan et al., 2023) turned this machinery to robot control by representing each action dimension as one of 256 bins and writing the bin indices as tokens: an action became a short "sentence" of eight tokens (a terminate flag, three for position delta, three for rotation delta, one for the gripper). **OpenVLA** (Kim et al., 2024) used the same idea with seven tokens per step, reassigning the 256 least-used tokens of its Llama 2 tokenizer to action bins. The model is trained with the ordinary cross-entropy loss of next-token prediction, which gives it a categorical — and therefore potentially multimodal — distribution over each dimension, conditioned on the dimensions already generated.

::: definition Per-dimension action tokenisation {#def-binning}
In **per-dimension binning** each normalised action dimension $a^{(j)}\in[-1,1]$ is mapped to a bin index $k^{(j)} = \min\bigl(\lfloor (a^{(j)}+1)B/2\rfloor, B-1\bigr)\in\{0,\dots,B-1\}$, and each index is mapped to a reserved token of the model's vocabulary. An action of dimension $d$ becomes $d$ tokens, generated autoregressively; a chunk of $H$ actions becomes $Hd$ tokens.
:::

::: widget plot
f: sin(x); (2/b)*(floor((sin(x) + 1)*b/2) + 0.5) - 1
x: 0, 6.3
y: -1.1, 1.1
sliders: b=4:1:64
labels: \text{action}; \text{decoded bin centre}
caption: A smooth action trajectory (a sine in normalised units) and its decoding after uniform binning into $b$ bins. With few bins the staircase is obvious; by 64 bins it is hard to see, and at 256 bins (RT-2, OpenVLA) the step is $2/256 \approx 0.008$ of the normalised range. Notice that the error is bounded by half a step everywhere, independently of how fast the action changes.
:::

Two properties of token outputs matter for control.

1. **Cost.** Each token needs one forward step of the language model. With $d = 7$ tokens per action, a 7-billion-parameter model must run seven decoding steps per control step. With a key–value cache each decoding step is cheaper than processing the whole prompt, but large autoregressive VLAs ran at only a few hertz on a single high-end GPU in 2024 ([[vision-language-action/vla-deployment]]; and [the key–value cache](/learn/llm/lesson.php?c=inference&l=kv-cache) in the LLM Atlas).
2. **High-frequency chunks tokenise badly.** At 50 Hz, consecutive actions are almost equal, so in a chunk of binned actions each token is nearly a copy of the one $d$ positions earlier. Next-token prediction then has an easy shortcut (copy) and receives little signal about the overall motion. Pertsch et al. (2025) showed that autoregressive VLAs trained with naive binning on high-frequency, dexterous data performed poorly, and proposed a compressed tokenisation.

### FAST: frequency-space action tokenisation {#sec-fast}

The idea of **FAST** (Frequency-space Action Sequence Tokenization; Pertsch et al., Physical Intelligence, 2025) is the same as in JPEG image compression: smooth signals have most of their energy in a few low-frequency cosine components, so transform, quantise, and keep the few large coefficients.

::: algorithm FAST tokenisation of an action chunk {#alg-fast}
Input: an action chunk of $H$ steps and $d$ dimensions, normalised per dimension (for example, so that the 1st and 99th percentiles map to $\mp1$).
1. **Transform.** For each dimension $j$, apply the discrete cosine transform (DCT-II) along time to the $H$ values, giving coefficients $C^{(j)}_0, \dots, C^{(j)}_{H-1}$; $C_0$ is proportional to the mean, higher indices to faster oscillations.
2. **Quantise.** Multiply by a scale factor $\gamma$ and round to integers, $\hat C^{(j)}_k = \operatorname{round}(\gamma\,C^{(j)}_k)$. Most high-frequency coefficients become zero. $\gamma$ controls the trade-off between compression and fidelity.
3. **Flatten.** Arrange the integers into one sequence, low frequencies first, interleaving dimensions: $\hat C^{(1)}_0, \hat C^{(2)}_0, \dots, \hat C^{(d)}_0, \hat C^{(1)}_1, \dots$, so that the most important information comes first.
4. **Compress.** Apply byte-pair encoding (BPE), trained on a corpus of such sequences, to merge frequent patterns — in particular the long runs of zeros — into single tokens. The resulting tokens are the model's output vocabulary for actions.
Decoding inverts steps 4 to 1: BPE decode, reshape, divide by $\gamma$, inverse DCT.
:::

The tokenisation is lossy only in step 2, and invertible otherwise. Its output length adapts to the signal: a smooth motion needs few tokens, a jerky one more. The authors also released a "universal" version of the tokenizer trained on a large and varied set of robot action data. Autoregressive VLAs trained with FAST tokens were reported to match diffusion/flow-based ones on dexterous tasks while training faster, at the price of slower inference, since decoding is still token by token (as of 2025).

::: theorem Orthogonality of the DCT (Parseval) {#thm-dct}
With the orthonormal DCT-II
$$
C_k = \sqrt{\frac{2 - \delta_{k0}}{H}}\sum_{n=0}^{H-1} x_n\cos\frac{\pi (n+\frac12)k}{H},\qquad k = 0,\dots,H-1,
$$ {#eq-dct}
the transform matrix is orthogonal, so $\sum_n x_n^2 = \sum_k C_k^2$ and the inverse is the transpose. Consequently, the squared reconstruction error after changing the coefficients equals the sum of the squared coefficient changes.
:::

::: proof
The vectors $\mathbf c_k$ with entries $c_{k,n} = \sqrt{(2-\delta_{k0})/H}\,\cos\bigl(\pi(n+\tfrac12)k/H\bigr)$ are eigenvectors, with distinct eigenvalues $2 - 2\cos(\pi k/H)$, of the symmetric $H\times H$ second-difference matrix with reflecting (Neumann) boundaries, so they are mutually orthogonal; the normalisation constants make each have unit length (the sum $\sum_n\cos^2(\pi(n+\frac12)k/H)$ equals $H/2$ for $k\ge1$ and $H$ for $k = 0$). A matrix with orthonormal rows is orthogonal, so it preserves the Euclidean norm, and its inverse is its transpose. If the coefficients change by $\delta\mathbf C$, the signal changes by $\mathbf M\T\delta\mathbf C$, which has the same norm. (See [Fourier series in Maths Atlas](/learn/maths/lesson.php?c=pde&l=fourier-series) for the continuous analogue.)
:::

So a quantisation step of $1/\gamma$ in each coefficient bounds the error in the same way as [[#prop-quant]], but only for the coefficients that survive — the rounding of a coefficient to zero removes at most $1/(2\gamma)$ from it.

::: example Compressing a smooth motion {#ex-fast}
One action dimension, normalised to $[-1, 1]$, moves from $-1$ to $+1$ along a quintic profile over a chunk of $H = 50$ steps (one second at 50 Hz). The orthonormal DCT gives $C_0 = 0$, $C_1 = -5.357$, $C_2 = 0$, $C_3 = 0.296$, $C_5 = 0.042$, $C_7 = 0.011$, with even coefficients zero by symmetry and the rest smaller still. Quantise with $\gamma = 10$ and find the non-zero integers, the reconstruction error and the compression relative to 50 per-step bins. What happens to a gripper that closes abruptly at step 30?
::: solution
$\gamma C_1 = -53.57\to-54$, $\gamma C_3 = 2.96\to3$, $\gamma C_5 = 0.42\to0$, everything else $\to0$. Two non-zero integers out of 50; after BPE merges the runs of zeros, this dimension costs a handful of tokens instead of 50.
Energy: $C_1^2 + C_3^2 = 28.79$ out of a total of $28.79 + 0.002$, so more than 99.9% of the signal is in two coefficients. Numerically, reconstructing from $(-54, 3)/10$ gives a maximum error of $0.020$ and an RMS error of $0.0087$ in normalised units — 1% of the half-range. With $\gamma = 20$, three coefficients survive ($-107, 6, 1$) and the maximum error falls to $0.004$.
The gripper step from $-1$ to $+1$ at step 30 is a discontinuity, whose cosine coefficients decay slowly: with $\gamma = 10$, 41 of the 50 coefficients are non-zero, almost no compression. Step-like dimensions compress badly, which is one reason the tokeniser's BPE stage and its training corpus matter.
Sanity check: $C_1 = -5.36$ is close to the value for a pure half-cosine of amplitude 1, $-\sqrt{H/2} = -5$, as it should be for a profile that looks like a half-cosine.
:::
:::

## Action chunking {#sec-chunking}

A policy that outputs one action per control step must decide every few milliseconds, and every decision is a chance for the compounding error of [[vision-language-action/imitation-learning#prop-t2]]. **Action chunking** — introduced to modern manipulation by ACT (Action Chunking with Transformers; Zhao, Kumar, Levine and Finn, 2023) — predicts a sequence of future actions at once.

::: definition Action chunk and execution horizon {#def-chunk}
An **action chunk** of length $H$ is the policy output $\mathbf A_t = (a_t, a_{t+1}, \dots, a_{t+H-1})$ predicted from the observation at time $t$. The policy is queried every $h$ control steps ($1\le h\le H$), and the first $h$ actions of each chunk are executed; $h$ is the **execution horizon**. With $h = H$ chunks are executed open-loop back to back; with $h < H$ the remainder is discarded or blended with the next prediction.
:::

Chunking helps in three ways. It shortens the effective decision horizon by a factor of $h$. It lets the policy represent the *temporal* structure of a motion — a smooth arc, a pause — rather than learning it step by step, which also reduces the effect of idle pauses and other non-Markov behaviour in human demonstrations. And it decouples the control rate from the inference rate: a slow network can drive a fast controller, provided a chunk lasts longer than an inference.

The price is reactivity: during the open-loop part of a chunk, the robot ignores new observations.

::: example Control rate, chunk length and reaction time {#ex-rates}
An arm is controlled at $f = 50\,\mathrm{Hz}$. The policy predicts chunks of $H = 50$ actions and takes $t_{\mathrm{inf}} = 80\,\mathrm{ms}$ per inference. Compare (a) per-step queries, (b) $h = 25$ and (c) $h = 50$: how many inferences per second, is the timing feasible, and what is the worst-case delay before the robot reacts to an event (an object moved by a person)?
::: solution
One control step is $1/f = 20\,\mathrm{ms}$; one chunk covers $50\times20 = 1.0\,\mathrm s$; one inference takes $80/20 = 4$ control steps.
(a) $h = 1$: 50 inferences per second, each taking 80 ms — impossible on one GPU without batching tricks; the policy could only keep up at $1/0.080 = 12.5\,\mathrm{Hz}$.
(b) $h = 25$: 2 inferences per second, using $2\times80 = 160\,\mathrm{ms}$ of compute per second. Worst case, the event happens just after an observation was taken; it is seen at the next query, $25\times20 = 500\,\mathrm{ms}$ later, and acted on after inference, $500 + 80 = 580\,\mathrm{ms}$ after the event.
(c) $h = 50$: 1 inference per second; worst-case reaction $1000 + 80 = 1080\,\mathrm{ms}$.
If inference runs synchronously (the robot waits), each chunk boundary also inserts an 80 ms pause — visible as a stutter; running inference asynchronously while the previous chunk executes removes it ([[vision-language-action/vla-deployment]]).
Sanity check: human reaction times are a few hundred milliseconds, so (b) is comparable to a person; (c) would visibly ignore a moved object for a second.
:::
:::

### Temporal ensembling

ACT proposed a way to have both smoothness and reactivity: query the policy *every* step, and execute at time $t$ a weighted average of all the predictions for time $t$ made by the chunks still in range. If chunks were predicted at times $t - i$ for $i = 0, 1, \dots, H-1$, each gives a prediction $\hat a^{(i)}_t$ for the current step, and the executed action is
$$
a_t = \frac{\sum_i w_i\,\hat a^{(i)}_t}{\sum_i w_i},\qquad w_i = e^{-m\,i},
$$ {#eq-ensemble}
where in the ACT paper $w_0$ is the weight of the *oldest* prediction, so that a positive $m$ favours older predictions and a small $m$ lets new observations in more quickly. Temporal ensembling smooths the transitions between chunks, at the cost of one inference per control step — affordable for a small ACT model (tens of millions of parameters), usually not for a multi-billion-parameter VLA, whose deployments instead use execution horizons $h > 1$ with smoothing across chunk boundaries.

::: warning Averaging chunks reintroduces mode averaging
Temporal ensembling averages predictions. If two consecutive chunks come from *different* modes — one going left round an obstacle, the next going right — the average goes into the obstacle, exactly the failure of MSE regression in [[vision-language-action/imitation-learning#ex-obstacle]]. Ensembling is safe for a deterministic policy that commits to one mode; for a stochastic (diffusion or flow) policy, either execute chunks without averaging, condition each new chunk on the previous one, or blend only when the chunks agree.
:::

::: example Temporal ensembling weights {#ex-ensemble}
At the current step four chunks (predicted 3, 2, 1 and 0 steps ago) give predictions $0.120, 0.118, 0.112, 0.105$ for a gripper height in metres, oldest first. Find the executed value for $m = 0.01$, $0.1$ and $0.5$ with $w_i = e^{-mi}$, $i = 0$ for the oldest.
::: solution
$m = 0.01$: weights $1, 0.990, 0.980, 0.970$; weighted mean $0.1138\,\mathrm m$ — almost the plain average, $0.1138$.
$m = 0.1$: weights $1, 0.905, 0.819, 0.741$; mean $0.1144\,\mathrm m$.
$m = 0.5$: weights $1, 0.607, 0.368, 0.223$; mean $0.1166\,\mathrm m$, close to the oldest prediction.
The most recent prediction (0.105 m, based on the newest image) says the gripper should be lower; the larger $m$, the more the executed action lags it. Sanity check: every weighted mean lies between the smallest and largest prediction, as a convex combination must.
:::
:::

::: widget plot
f: exp(-m*x)
x: 0, 50
y: 0, 1.05
sliders: m=0.005:0.005:0.3
labels: w_i = e^{-m i}
caption: Temporal-ensembling weights against the age index $i$ ($i = 0$ is the oldest chunk still in range, for a chunk length of 50). Small $m$ gives nearly equal weights — a long moving average that responds slowly to new observations; large $m$ concentrates the weight on the oldest predictions. The time constant of the average is about $1/m$ steps.
:::

::: quiz
A team switches from per-step actions to chunks of 1 s executed open-loop at 30 Hz. Success improves on the nominal task, but the policy now fails whenever a person nudges the target object during the motion. What is the most direct fix?
- [ ] Increase the chunk length so the policy plans further ahead.
- [x] Shorten the execution horizon (query more often, e.g. every 0.25 s), running inference asynchronously.
- [ ] Switch from end-effector deltas to joint positions.
::: solution
Open-loop execution of a 1 s chunk means the robot ignores the nudge for up to a second. Querying more often (a shorter execution horizon) restores reactivity while keeping the benefits of predicting a chunk; asynchronous inference avoids pauses at boundaries. Longer chunks make it worse, and the action space is not the cause.
:::
:::

::: history
Early learned visuomotor policies (2016) output joint torques or velocities directly, one step at a time. RT-1 (2022) discretised each of 11 action dimensions (arm, base and mode) into 256 bins, and RT-2 (2023) wrote those bins as text tokens of a vision-language model. Zhou and co-authors' continuity analysis of rotation representations (2019) moved learned pose prediction to the 6D representation. ACT (2023) brought action chunking and temporal ensembling to low-cost bimanual manipulation, and Diffusion Policy (2023) generated whole chunks continuously ([[vision-language-action/diffusion-flow-policies]]). FAST (2025) applied the discrete cosine transform of JPEG to action chunks so that autoregressive models could learn high-frequency dexterous control.
:::

::: summary
- Action spaces: joint (no IK, embodiment-specific) or end-effector (transferable, needs IK); absolute (no drift) or delta (uniform statistics); always record the frame and units.
- Rotations: Euler angles, axis–angle and quaternions are discontinuous somewhere as network targets; the 6D representation with Gram–Schmidt is continuous. Small deltas can use three numbers.
- Uniform binning has error $\le\Delta/2$, RMS $\Delta/\sqrt{12}$; RT-2 and OpenVLA write 256 bins per dimension as tokens.
- FAST tokenises a chunk by DCT, quantisation, low-frequency-first flattening and BPE; smooth motions compress to few tokens, discontinuities do not.
- Action chunks of length $H$ executed $h$ steps at a time reduce the decision horizon and decouple control rate from inference rate; worst-case reaction time is about $h/f + t_{\mathrm{inf}}$.
- Temporal ensembling smooths chunks but averages modes; use it with deterministic policies or blend only agreeing chunks.
:::

## Exercises

::: exercise Bin width {#exr-binwidth level=1 check="0.469"}
A rotation delta about one axis is clipped to $\pm 0.06\,\mathrm{rad}$ and divided into 256 bins. Find the bin width. (Enter it in mrad, to three significant figures.)
::: solution
$\Delta = 0.12/256 = 4.69\times10^{-4}\,\mathrm{rad} = 0.469\,\mathrm{mrad}$.
:::
:::

::: exercise Tokens per second {#exr-tokens level=1 check="70"}
An autoregressive VLA emits 7 tokens per action and the robot needs 10 actions per second with no chunking. How many action tokens must it generate per second? (Enter the number.)
::: solution
$7\times10 = 70$ tokens per second, each requiring a decoding step of the full model.
:::
:::

::: exercise Reaction time {#exr-react level=1 check="0.43"}
A 30 Hz controller executes $h = 12$ actions of each chunk and inference takes $30\,\mathrm{ms}$. Find the worst-case reaction time to an event. (Enter it in s, to two significant figures.)
::: solution
$h/f + t_{\mathrm{inf}} = 12/30 + 0.030 = 0.400 + 0.030 = 0.43\,\mathrm s$.
:::
:::

::: exercise RMS quantisation error {#exr-rms level=2 check="0.0451"}
A gripper-width command between 0 and 80 mm is binned into 512 levels. Find the RMS quantisation error for widths uniformly distributed within a bin. (Enter it in mm, to three significant figures.)
::: solution
$\Delta = 80/512 = 0.15625\,\mathrm{mm}$; RMS $= \Delta/\sqrt{12} = 0.0451\,\mathrm{mm}$.
:::
:::

::: exercise A base-frame rotation delta {#exr-compose level=2}
The current tool orientation is $R_t = R_x(90^\circ)$. The policy outputs a delta of $+10^\circ$ about $z$. Write $R_{t+1}$ if the delta is in (a) the base frame and (b) the tool frame, and describe each motion physically.
::: solution
(a) $R_{t+1} = R_z(10^\circ)R_x(90^\circ)$: the tool rotates about the *base* vertical axis — it swings round the table's vertical. (b) $R_{t+1} = R_x(90^\circ)R_z(10^\circ)$: the tool rotates about its own $z$-axis, which after $R_x(90^\circ)$ points along base $-y$; it twists about a horizontal axis. Same numbers, different motions: the frame must be part of the action specification.
:::
:::

::: exercise Ensembling with a fresh correction {#exr-ens level=2 check="0.1166"}
In [[#ex-ensemble]] with $m = 0.5$, verify the executed value. (Enter it in m, to four significant figures.)
::: solution
Weights $1, e^{-0.5} = 0.6065, e^{-1} = 0.3679, e^{-1.5} = 0.2231$; sum $2.1975$. Weighted sum $0.120 + 0.118\times0.6065 + 0.112\times0.3679 + 0.105\times0.2231 = 0.1200 + 0.0716 + 0.0412 + 0.0234 = 0.2562$. Mean $0.2562/2.1975 = 0.1166\,\mathrm m$.
:::
:::

::: exercise Why six numbers and not nine? {#exr-6d level=3}
The full rotation matrix (nine numbers, made orthogonal by an SVD projection) is also a continuous representation. Discuss the trade-offs between the 6D and 9D representations for a network output, and show that the 6D map [[#eq-gram-schmidt]] treats the two columns asymmetrically.
::: solution
Both are continuous. The 9D representation with SVD orthogonalisation (the nearest rotation in the Frobenius norm) treats all columns symmetrically and has been reported to perform at least as well; its projection is costlier and its gradient involves the SVD. The 6D map is cheap and simple. It is asymmetric: $\mathbf b_1$ depends only on $\mathbf a_1$, while $\mathbf b_2$ depends on both, so errors in $\mathbf a_1$ propagate to every column while errors in $\mathbf a_2$ along $\mathbf a_1$ are discarded. For example, $(\mathbf a_1, \mathbf a_2)$ and $(\mathbf a_1, \mathbf a_2 + 5\mathbf a_1)$ give the same rotation, but $(\mathbf a_1 + 5\mathbf a_2, \mathbf a_2)$ does not. In practice either works; what matters is avoiding the discontinuous 3D and 4D representations for absolute orientations.
:::
:::

::: exercise Choosing an action representation {#exr-choose level=3}
Your company's 6-DOF arm will run a VLA fine-tuned from a model pretrained on Open X-Embodiment (mostly end-effector deltas at 3–15 Hz). The product task is screwing a cap onto a bottle, controlled at 100 Hz by the joint controller, with demonstrations from a leader–follower rig. Propose an action space, normalisation, chunk length and execution horizon, and justify each choice.
::: solution
A defensible answer: record joint commands (from the leader) *and* end-effector poses; for fine-tuning use absolute joint targets or end-effector targets per the pretrained model's convention — matching the pretraining action space helps transfer, but for a single product arm joint targets avoid IK problems and capture the wrist rotation precisely. Normalise per dimension with quantiles of the product data. Predict chunks at a policy rate of 20–50 Hz (interpolated to 100 Hz by the controller), e.g. $H = 50$ steps at 50 Hz (1 s) covering one turn of the cap, with execution horizon $h$ of 10–25 steps (0.2–0.5 s) so the policy can react to cross-threading; check that $h/f$ exceeds the inference latency. The gripper as a separate binary output. Evaluate alternatives by closed-loop trials, not offline loss.
:::
:::
