[[vision-language-action/imitation-learning]] ended with a requirement: a policy for real demonstrations must represent a *distribution* over actions with several separate peaks, not just its mean. [[vision-language-action/action-representations]] added a second: the policy should output a *chunk* of continuous actions — tens of time steps of a 7- to 14-dimensional arm — that is smooth in time. A categorical head over bins handles multimodality but each dimension separately and coarsely; a Gaussian mixture handles continuous values but becomes unwieldy for a 700-number chunk.

Generative models from image synthesis solve both problems at once. A **diffusion model** learns to turn random noise into a sample from the data distribution by removing the noise step by step; a **flow-matching** model learns a velocity field that carries noise to data along a smooth path. Neither assumes a shape for the distribution, both work in hundreds of dimensions, and both produce a whole chunk at once. Diffusion Policy (Chi et al., 2023) brought diffusion to visuomotor control; flow matching became the action generator of π0 (2024) and many VLAs after it. This chapter derives both from the beginning, shows how they are conditioned on observations, explains why their training objectives — which are mean-squared errors — do *not* average modes, and works out what they cost at run time.

For the image-generation side of the same mathematics, see [Generating images](/learn/llm/lesson.php?c=multimodal&l=image-generation) in the LLM Atlas; the probability background is in [Probability for machine learning](/learn/llm/lesson.php?c=math-for-ml&l=probability).

## Sampling instead of predicting {#sec-sampling}

Write $\mathbf x$ for the quantity the policy must produce — a normalised action chunk $\mathbf A_t\in\R^{H\times d}$, flattened to a vector — and $\mathbf o$ for the observation. The goal is not a function $\mathbf x = f(\mathbf o)$ but a sampler: a procedure that, given $\mathbf o$, produces random $\mathbf x$ distributed as the expert's $p(\mathbf x\mid\mathbf o)$. Each call gives one plausible chunk; if half the demonstrations go left of an obstacle and half right, half the samples do too.

Both methods build the sampler the same way. They fix a simple **reference distribution**, the standard Gaussian $\mathcal N(\mathbf 0, I)$, and a path of distributions that blends the data into it. Training teaches a network the local rule for moving along the path backwards; sampling starts from Gaussian noise and applies the rule repeatedly.

## Denoising diffusion {#sec-ddpm}

::: definition Forward (noising) process {#def-forward}
Given a clean sample $\mathbf x_0$ and a **noise schedule** $0 < \beta_1 < \dots < \beta_K < 1$, the **forward process** of a denoising diffusion probabilistic model (DDPM; Ho, Jain and Abbeel, 2020) is the Markov chain
$$
\mathbf x_k = \sqrt{1-\beta_k}\,\mathbf x_{k-1} + \sqrt{\beta_k}\,\boldsymbol\epsilon_k,\qquad \boldsymbol\epsilon_k\sim\mathcal N(\mathbf 0, I)\ \text{independent},\qquad k = 1,\dots,K.
$$ {#eq-forward}
Write $\alpha_k = 1-\beta_k$ and $\bar\alpha_k = \prod_{s=1}^{k}\alpha_s$.
:::

Each step shrinks the signal slightly and adds a little noise; after enough steps, nothing of $\mathbf x_0$ remains. (We write $k$ for the diffusion step, to keep $t$ for robot time.)

::: proposition Closed form of the noised sample {#prop-marginal}
For every $k$, $\mathbf x_k$ given $\mathbf x_0$ is Gaussian:
$$
\mathbf x_k = \sqrt{\bar\alpha_k}\,\mathbf x_0 + \sqrt{1-\bar\alpha_k}\,\boldsymbol\epsilon,\qquad \boldsymbol\epsilon\sim\mathcal N(\mathbf 0, I).
$$ {#eq-marginal}
If $\bar\alpha_K\to0$, the distribution of $\mathbf x_K$ tends to $\mathcal N(\mathbf 0, I)$ whatever the data distribution.
:::

::: proof
By induction on $k$. For $k = 1$, [[#eq-forward]] is [[#eq-marginal]] with $\bar\alpha_1 = \alpha_1$. Suppose $\mathbf x_{k-1} = \sqrt{\bar\alpha_{k-1}}\,\mathbf x_0 + \sqrt{1-\bar\alpha_{k-1}}\,\boldsymbol\epsilon'$. Then
$$
\mathbf x_k = \sqrt{\alpha_k\bar\alpha_{k-1}}\,\mathbf x_0 + \sqrt{\alpha_k(1-\bar\alpha_{k-1})}\,\boldsymbol\epsilon' + \sqrt{1-\alpha_k}\,\boldsymbol\epsilon_k .
$$
The last two terms are independent zero-mean Gaussians, so their sum is Gaussian with covariance $\bigl(\alpha_k - \alpha_k\bar\alpha_{k-1} + 1 - \alpha_k\bigr)I = (1-\bar\alpha_k)I$, which is $\sqrt{1-\bar\alpha_k}\,\boldsymbol\epsilon$ with $\boldsymbol\epsilon$ standard normal; and $\alpha_k\bar\alpha_{k-1} = \bar\alpha_k$. For the limit, the coefficient of $\mathbf x_0$ tends to 0 and that of $\boldsymbol\epsilon$ to 1, so for data of finite variance $\mathbf x_K$ converges in distribution to $\boldsymbol\epsilon$.
:::

So a noisy version of a training chunk at any level $k$ can be produced in one line, without simulating the chain. The schedule decides how quickly the signal fades. Ho et al. used $K = 1000$ with $\beta$ rising linearly from $10^{-4}$ to $0.02$, giving $\bar\alpha_{1000} = 4.0\times10^{-5}$. Diffusion Policy used a "squared-cosine" schedule (Nichol and Dhariwal, 2021), $\bar\alpha_k = \cos^2\!\bigl(\frac{k/K+s}{1+s}\frac{\pi}{2}\bigr)/\cos^2\!\bigl(\frac{s}{1+s}\frac{\pi}{2}\bigr)$ with $s = 0.008$, with $K = 100$.

::: example A noise schedule and a noised action {#ex-schedule}
(a) For the squared-cosine schedule with $K = 100$, $\bar\alpha_{10} = 0.972$, $\bar\alpha_{50} = 0.494$, $\bar\alpha_{90} = 0.024$. Find the signal and noise coefficients at each, and the signal-to-noise ratio $\mathrm{SNR} = \bar\alpha/(1-\bar\alpha)$. (b) A normalised action component $x_0 = 0.50$ is noised at $k = 50$ with the draw $\epsilon = -1.20$. Find $x_{50}$, and show that knowing $\epsilon$ exactly recovers $x_0$.
::: solution
(a) $k = 10$: $\sqrt{0.972} = 0.986$, $\sqrt{0.028} = 0.167$, SNR $= 34.8$. $k = 50$: $0.703$ and $0.711$, SNR $= 0.976$ — signal and noise about equal. $k = 90$: $0.155$ and $0.988$, SNR $= 0.025$ — almost pure noise.
(b) $x_{50} = 0.703\times0.50 + 0.711\times(-1.20) = 0.351 - 0.853 = -0.502$. Inverting [[#eq-marginal]], $x_0 = (x_{50} - \sqrt{1-\bar\alpha}\,\epsilon)/\sqrt{\bar\alpha} = (-0.502 + 0.853)/0.703 = 0.50$.
Sanity check: the data were normalised to roughly unit scale, so at $k = 90$ the noise standard deviation (0.99) dwarfs the signal (0.155 × a number of order 1), as intended. If the actions had been left in millimetres (values of order 100), even $k = 90$ would leave a signal of 15 against noise of 1 — the schedule would never reach noise. See the warning below.
:::
:::

### The reverse process and the noise-prediction objective {#sec-reverse}

To generate, the chain is run backwards: start from $\mathbf x_K\sim\mathcal N(\mathbf 0, I)$ and step to $\mathbf x_{K-1}, \dots, \mathbf x_0$. If $\boldsymbol\epsilon$ in [[#eq-marginal]] were known, $\mathbf x_0$ would follow at once, as in [[#ex-schedule]]. It is not known — but it can be *estimated* from $\mathbf x_k$ by a network $\boldsymbol\epsilon_\theta(\mathbf x_k, k)$ trained to predict the noise that was added.

::: algorithm Training and sampling a DDPM {#alg-ddpm}
**Training.** Repeat: draw a training sample $\mathbf x_0$, a step $k$ uniformly from $\{1,\dots,K\}$ and $\boldsymbol\epsilon\sim\mathcal N(\mathbf 0, I)$; form $\mathbf x_k$ by [[#eq-marginal]]; take a gradient step on
$$
\mathcal L(\theta) = \bigl\lVert\boldsymbol\epsilon - \boldsymbol\epsilon_\theta(\mathbf x_k, k)\bigr\rVert^2 .
$$ {#eq-eps-loss}
**Sampling.** Draw $\mathbf x_K\sim\mathcal N(\mathbf 0, I)$. For $k = K, \dots, 1$:
$$
\mathbf x_{k-1} = \frac{1}{\sqrt{\alpha_k}}\left(\mathbf x_k - \frac{\beta_k}{\sqrt{1-\bar\alpha_k}}\,\boldsymbol\epsilon_\theta(\mathbf x_k, k)\right) + \sigma_k\mathbf z,\qquad \mathbf z\sim\mathcal N(\mathbf 0, I),
$$ {#eq-reverse}
with $\sigma_k^2 = \beta_k$ (and $\mathbf z = \mathbf 0$ at the last step). Return $\mathbf x_0$.
:::

Ho et al. derived [[#eq-eps-loss]] as a simplified, reweighted form of the variational bound on the log-likelihood, and [[#eq-reverse]] from the Gaussian posterior $q(\mathbf x_{k-1}\mid\mathbf x_k, \mathbf x_0)$ with $\mathbf x_0$ replaced by its estimate; the full derivation is in the LLM Atlas lesson linked above. Here we need one fact about the objective, because it explains why diffusion succeeds where mean-squared-error regression failed.

::: proposition What the noise predictor learns {#prop-tweedie}
Over all functions of $(\mathbf x_k, k)$, the loss [[#eq-eps-loss]] is minimised by the conditional mean $\boldsymbol\epsilon^*(\mathbf x_k, k) = \E[\boldsymbol\epsilon\mid\mathbf x_k]$. Equivalently, the implied estimate of the clean sample,
$$
\hat{\mathbf x}_0(\mathbf x_k) = \frac{\mathbf x_k - \sqrt{1-\bar\alpha_k}\,\boldsymbol\epsilon^*(\mathbf x_k, k)}{\sqrt{\bar\alpha_k}} = \E[\mathbf x_0\mid\mathbf x_k],
$$ {#eq-x0hat}
is the posterior mean of the data given the noisy sample at level $k$.
:::

::: proof
The first statement is [[vision-language-action/imitation-learning#prop-mean]] applied with input $(\mathbf x_k, k)$ and target $\boldsymbol\epsilon$. For the second, take the conditional expectation of [[#eq-marginal]] given $\mathbf x_k$: $\mathbf x_k = \sqrt{\bar\alpha_k}\,\E[\mathbf x_0\mid\mathbf x_k] + \sqrt{1-\bar\alpha_k}\,\E[\boldsymbol\epsilon\mid\mathbf x_k]$, and solve for $\E[\mathbf x_0\mid\mathbf x_k]$.
:::

So the diffusion network *is* an MSE regressor — but of the noise, at every noise level, not of the action. At high noise, $\E[\mathbf x_0\mid\mathbf x_k]$ is a blurry average near the overall mean, and the sampler moves only a little towards it. As the noise falls, the posterior concentrates on whichever mode the current sample is closest to, and the conditional mean becomes that mode. The sampler commits to a mode gradually, through the randomness of the starting noise and of the $\sigma_k\mathbf z$ terms, and never needs to output an average of modes.

::: example The denoiser for two modes {#ex-denoiser}
Let the clean action be $x_0 = +1$ or $-1$ with probability $\tfrac12$ each. Show that the optimal denoiser is $\E[x_0\mid x_k] = \tanh\bigl(\sqrt{\bar\alpha_k}\,x_k/(1-\bar\alpha_k)\bigr)$, and evaluate it at $x_k = 0.3$ for $\bar\alpha_k = 0.1$, $0.5$ and $0.99$.
::: solution
Given $x_0 = \pm1$, $x_k\sim\mathcal N(\pm\sqrt{\bar\alpha}, 1-\bar\alpha)$. By Bayes' rule with equal priors,
$$
\frac{\Prob(x_0 = 1\mid x_k)}{\Prob(x_0 = -1\mid x_k)} = \exp\!\left(\frac{(x_k+\sqrt{\bar\alpha})^2 - (x_k-\sqrt{\bar\alpha})^2}{2(1-\bar\alpha)}\right) = \exp\!\left(\frac{2\sqrt{\bar\alpha}\,x_k}{1-\bar\alpha}\right),
$$
and $\E[x_0\mid x_k] = \Prob(+1) - \Prob(-1) = \tanh\bigl(\sqrt{\bar\alpha}\,x_k/(1-\bar\alpha)\bigr)$.
At $x_k = 0.3$: $\bar\alpha = 0.1$ gives $\tanh(0.105) = 0.105$ — almost no information, the estimate stays near the mean 0. $\bar\alpha = 0.5$: $\tanh(0.424) = 0.401$. $\bar\alpha = 0.99$: $\tanh(29.8) = 1.000$ — certainty that the mode is $+1$.
Sanity check: at every noise level the estimate is between $-1$ and $+1$, and it is exactly the mean 0 at $x_k = 0$, where both modes are equally likely; this is the point where the random noise decides which mode the sample goes to.
:::
:::

::: warning Normalise actions before diffusion
The noise in [[#eq-marginal]] has unit variance in every dimension. If one action dimension is in millimetres (spread of hundreds) and another is a gripper fraction (spread of 0.3), the schedule destroys the gripper signal in a few steps and barely touches the position. Normalise each dimension (to $[-1, 1]$ or to zero mean and unit variance) before training and un-normalise after sampling, with the *same* statistics at training and deployment; a mismatch here is a classic cause of policies that move in the right direction by the wrong amount.
:::

## Conditioning on observations {#sec-conditioning}

A policy needs $p(\mathbf x\mid\mathbf o)$, not $p(\mathbf x)$. Conditioning is simple: give the network the observation as an extra input, $\boldsymbol\epsilon_\theta(\mathbf x_k, k, \mathbf o)$, and train on pairs $(\mathbf o, \mathbf x_0)$ from the demonstrations. [[#prop-tweedie]] holds with every expectation conditioned on $\mathbf o$, and sampling runs [[#eq-reverse]] with $\mathbf o$ fixed.

**Diffusion Policy** (Chi, Feng, Du, Xu, Cousineau, Burchfiel and Song, 2023) made the design choices that most later work kept:

- the generated variable is an **action chunk** (prediction horizon $T_p = 16$ steps in its default configuration), of which the first $T_a = 8$ are executed before re-planning, conditioned on the last $T_o = 2$ observations;
- the observation is encoded once per policy step by a ResNet image encoder (per camera) plus the proprioception, and the encoding conditions the denoiser — in its CNN variant by **FiLM** (feature-wise scaling and shifting of the denoiser's channels), in its Transformer variant by cross-attention from the noisy action tokens to the observation tokens;
- the denoiser is a 1D temporal U-Net over the chunk, which naturally produces smooth action sequences;
- 100 diffusion steps in training and fewer at inference (with the DDIM sampler below).

Encoding the observation only once and then running the small denoiser many times is the key to speed: the expensive part (images) is not repeated per denoising step. VLAs with diffusion or flow heads do the same, with a large vision-language model as the encoder ([[vision-language-action/vla-architectures]]).

::: remark Guidance
Image generators often use classifier-free guidance, extrapolating from the unconditional towards the conditional prediction to make samples follow the prompt more strongly. It is used much less in robot policies, where the observation conditioning is already strong; when used it trades diversity for adherence and can produce exaggerated motions.
:::

## Fewer steps: DDIM {#sec-ddim}

The sampler [[#eq-reverse]] needs $K$ network evaluations — 100 to 1000 — too many for real-time control. Song, Meng and Ermon (2021) observed that the same trained network defines a family of samplers, including a deterministic one that can skip steps. From $\mathbf x_k$, estimate $\hat{\mathbf x}_0$ by [[#eq-x0hat]] and $\hat{\boldsymbol\epsilon} = \boldsymbol\epsilon_\theta(\mathbf x_k, k)$, and jump to any earlier level $k' < k$ by re-noising the estimate with the estimated noise:
$$
\mathbf x_{k'} = \sqrt{\bar\alpha_{k'}}\,\hat{\mathbf x}_0 + \sqrt{1-\bar\alpha_{k'}}\,\hat{\boldsymbol\epsilon} .
$$ {#eq-ddim}
This **DDIM** update needs no retraining; with 10 well-chosen levels it gives samples close to those of the 100-step DDPM sampler. Each step uses the network once, so a 10-step DDIM sampler is ten times cheaper. Distillation methods (consistency models and related ideas) train a separate network to go from noise to data in one or two steps; they have been applied to policies but are less common.

## Flow matching {#sec-flow}

Diffusion arrives at a deterministic sampler by a detour through a stochastic chain. **Flow matching** (Lipman et al., 2023) and **rectified flow** (Liu, Gong and Liu, 2023) define the path and its velocity directly.

::: definition Linear interpolation path and flow-matching loss {#def-flow}
Let $\mathbf x_0\sim\mathcal N(\mathbf 0, I)$ be noise and $\mathbf x_1$ a data sample (in this section the indices are reversed relative to diffusion: $\tau = 0$ is noise, $\tau = 1$ is data). The **interpolation path** is
$$
\mathbf x_\tau = (1-\tau)\,\mathbf x_0 + \tau\,\mathbf x_1,\qquad \tau\in[0,1],
$$ {#eq-path}
whose velocity along each straight line is $\mathbf u = \mathbf x_1 - \mathbf x_0$. A network $\mathbf v_\theta(\mathbf x, \tau, \mathbf o)$ is trained with the **flow-matching loss**
$$
\mathcal L(\theta) = \E_{\tau, \mathbf x_0, (\mathbf o, \mathbf x_1)}\bigl\lVert\mathbf v_\theta(\mathbf x_\tau, \tau, \mathbf o) - (\mathbf x_1 - \mathbf x_0)\bigr\rVert^2 .
$$ {#eq-fm-loss}
Samples are generated by integrating the ODE $d\mathbf x/d\tau = \mathbf v_\theta(\mathbf x, \tau, \mathbf o)$ from a noise sample at $\tau = 0$ to $\tau = 1$.
:::

Papers differ in which end is noise and in sign conventions (π0, for example, writes the path with its own labelling of $\tau$); the content is the same.

::: proposition The flow-matching minimiser {#prop-fm}
The loss [[#eq-fm-loss]] is minimised by the **marginal velocity field**
$$
\mathbf v^*(\mathbf x, \tau, \mathbf o) = \E\bigl[\mathbf x_1 - \mathbf x_0 \mid \mathbf x_\tau = \mathbf x, \mathbf o\bigr] = \frac{\E[\mathbf x_1\mid\mathbf x_\tau = \mathbf x, \mathbf o] - \mathbf x}{1-\tau}\quad(\tau < 1),
$$ {#eq-vstar}
and the solutions of $d\mathbf x/d\tau = \mathbf v^*$ started from $\mathbf x_0\sim\mathcal N(\mathbf 0, I)$ have, at each $\tau$, the same distribution as $\mathbf x_\tau$ in [[#eq-path]]; in particular at $\tau = 1$ they are distributed as the data.
:::

::: proof
The first equality is again the conditional-mean property ([[vision-language-action/imitation-learning#prop-mean]]), with input $(\mathbf x_\tau, \tau, \mathbf o)$ and target $\mathbf x_1 - \mathbf x_0$. For the second, [[#eq-path]] gives $\mathbf x_0 = (\mathbf x_\tau - \tau\mathbf x_1)/(1-\tau)$, so $\mathbf x_1 - \mathbf x_0 = (\mathbf x_1 - \mathbf x_\tau)/(1-\tau)$; take the conditional expectation given $\mathbf x_\tau = \mathbf x$.
The transport property (stated here with a sketch; see Lipman et al., 2023, for the assumptions): let $p_\tau$ be the density of $\mathbf x_\tau$. For a test function $\varphi$, $\frac{d}{d\tau}\E[\varphi(\mathbf x_\tau)] = \E[\nabla\varphi(\mathbf x_\tau)\cdot(\mathbf x_1 - \mathbf x_0)] = \E[\nabla\varphi(\mathbf x_\tau)\cdot\mathbf v^*(\mathbf x_\tau, \tau)]$ by the tower property. This is the weak form of the continuity equation $\partial_\tau p_\tau + \nabla\cdot(p_\tau\mathbf v^*) = 0$. The density of the ODE solutions satisfies the same equation with the same initial condition $p_0 = \mathcal N(\mathbf 0, I)$, so, given uniqueness of its solution (which needs regularity of $\mathbf v^*$), the two families of distributions coincide.
:::

The proof shows the same mechanism as diffusion: the network regresses by squared error onto a quantity whose conditional mean is a *velocity*, not an action. Near $\tau = 0$ every sample sees the same blurred average and moves towards the middle of the data; as $\tau$ grows, the conditional expectation $\E[\mathbf x_1\mid\mathbf x_\tau]$ locks onto one mode, and the velocity carries the sample there.

::: example Integrating a two-mode flow by hand {#ex-flow}
Let the data be $x_1 = \pm1$ with equal probability (one action dimension). (a) Show that $\E[x_1\mid x_\tau = x] = \tanh\bigl(\tau x/(1-\tau)^2\bigr)$. (b) Starting from the noise sample $x_0 = 0.2$, integrate $dx/d\tau = v^*$ with four Euler steps of $\Delta\tau = 0.25$.
::: solution
(a) Given $x_1 = \pm1$, $x_\tau = (1-\tau)x_0 \pm \tau\sim\mathcal N(\pm\tau, (1-\tau)^2)$. The log-ratio of the posterior probabilities is $\bigl[(x+\tau)^2 - (x-\tau)^2\bigr]/\bigl(2(1-\tau)^2\bigr) = 2\tau x/(1-\tau)^2$, so $\E[x_1\mid x] = \tanh\bigl(\tau x/(1-\tau)^2\bigr)$, and by [[#eq-vstar]] $v^* = \bigl(\tanh(\tau x/(1-\tau)^2) - x\bigr)/(1-\tau)$.
(b) $\tau = 0$: $v^* = (0 - 0.2)/1 = -0.200$; $x = 0.2 - 0.25\times0.200 = 0.1500$.
$\tau = 0.25$: $\tanh(0.25\times0.15/0.5625) = \tanh(0.0667) = 0.0666$; $v^* = (0.0666 - 0.15)/0.75 = -0.111$; $x = 0.15 - 0.0278 = 0.1222$.
$\tau = 0.5$: $\tanh(0.5\times0.1222/0.25) = \tanh(0.2444) = 0.2397$; $v^* = (0.2397 - 0.1222)/0.5 = 0.235$; $x = 0.1222 + 0.0588 = 0.1810$.
$\tau = 0.75$: $\tanh(0.75\times0.181/0.0625) = \tanh(2.172) = 0.9743$; $v^* = (0.9743 - 0.1810)/0.25 = 3.173$; $x = 0.1810 + 0.7933 = 0.9743$.
The sample ends at $0.974$, close to the mode $+1$ (an exact integration gives $1.000$). For the first half of the flow the sample drifts *towards the middle*; at $\tau\approx0.5$ the posterior commits to $+1$ and the velocity becomes large. A noise sample of $-0.1$ goes to $-1$ in the same way. No sample ends at 0, the average of the modes.
Sanity check: four steps are enough here because the path is nearly straight once the mode is chosen; with ten steps, as in π0, the error is smaller still.
:::
:::

::: widget slopefield
f: tanh(x*y/((1 - x)^2 + x^2*s^2)) + (x*s^2 - (1 - x))/((1 - x)^2 + x^2*s^2)*(y - x*tanh(x*y/((1 - x)^2 + x^2*s^2)))
x: 0, 1
y: -2.5, 2.5
points: 0, 0.2; 0, -0.1; 0, 1.5; 0, -1.8; 0, 0.6
sliders: s=0.05:0.05:0.5
caption: The exact flow-matching velocity field for one-dimensional data made of two equal Gaussian modes at $\pm1$ with standard deviation $s$; the horizontal axis is the flow time $\tau$ from noise (left) to data (right), the vertical axis the action. Every solution curve starts at a noise sample and ends in one of the two modes; none ends at 0. Click to start more curves near $y=0$ and watch them split; switch to Euler with a large step to see how few steps a nearly straight flow needs.
:::

### Why flows are fast

The ideal flow of [[#eq-path]] has straight *conditional* paths (each pair $(\mathbf x_0, \mathbf x_1)$ is joined by a line), but the *marginal* paths bend where different pairs cross, as in the figure near $\tau = 0.5$. The straighter the marginal paths, the fewer integration steps are needed. In practice flow-matching policies use about 5–10 Euler steps, and the training-time distribution of $\tau$ can be weighted towards the noisy end, where the velocity is hardest to learn (π0 sampled $\tau$ from a shifted beta distribution for this reason). The relation to diffusion is close: with a Gaussian reference, diffusion and flow matching with appropriate schedules learn equivalent quantities, and DDIM is an ODE integrator of the same kind. The differences in practice are the parametrisation (noise or velocity), the schedule and the default number of steps.

::: quiz
Both a diffusion policy and a flow-matching policy are trained with a mean-squared-error loss. Why does neither average the modes of a bimodal demonstration distribution, when MSE regression of the action does?
- [ ] Because they use a larger network.
- [x] Because the regression target is the noise or the velocity at a given noise level, whose conditional mean is a direction of motion; the sample commits to a mode as the noise is removed, and the output is a sample, not a conditional mean of actions.
- [ ] Because they are trained with a likelihood loss rather than MSE.
::: solution
The network is a conditional-mean estimator, but of the right thing: the velocity (or noise) given the current noisy sample. Iterating it from random noise produces samples from the full distribution. MSE regression of the action, by contrast, outputs the conditional mean of the action itself.
:::
:::

## Inference cost {#sec-cost}

A generative policy pays for its expressiveness in network evaluations. The cost of producing one chunk is
$$
t_{\mathrm{chunk}} = t_{\mathrm{enc}} + N_{\mathrm{steps}}\,t_{\mathrm{den}},
$$ {#eq-cost}
the observation encoding once plus the denoiser (or velocity network) once per integration step. A useful order-of-magnitude rule for Transformers is that a forward pass costs about $2P$ floating-point operations per token for $P$ parameters (plus attention, which is small for short sequences); the time is that count divided by the throughput the hardware actually achieves.

::: example Diffusion versus flow, small and large {#ex-cost}
(a) A Diffusion-Policy-style controller has a $10\,\mathrm{ms}$ image encoder and a U-Net denoiser taking $4\,\mathrm{ms}$ per evaluation on the robot's GPU (illustrative figures). Compare the chunk time with 100 DDPM steps and with 10 DDIM steps, for chunks executed 8 steps at a time at 10 Hz. (b) A VLA has a 3-billion-parameter vision-language backbone that processes 800 tokens (three images and the instruction) once, and a 300-million-parameter action network that processes a chunk of 50 action tokens (as in π0, 2024) at each of 10 flow steps. With an achieved throughput of $10^{14}$ FLOP/s, estimate the time per chunk.
::: solution
(a) DDPM: $10 + 100\times4 = 410\,\mathrm{ms}$. DDIM: $10 + 10\times4 = 50\,\mathrm{ms}$. Executing 8 actions at 10 Hz takes $0.8\,\mathrm s$, so both fit in principle, but the DDPM version spends half the cycle computing and, if run synchronously, pauses for 0.41 s at every chunk; 50 ms is a barely noticeable pause.
(b) Backbone: $2\times3\times10^9\times800 = 4.8\times10^{12}$ FLOP, $48\,\mathrm{ms}$. Action network per step: $2\times3\times10^8\times50 = 3\times10^{10}$ FLOP, $0.3\,\mathrm{ms}$ — plus attention from the 50 action tokens to the 800 cached backbone tokens, which keeps it small. Ten steps: about $3\,\mathrm{ms}$ of arithmetic; in practice kernel launch and memory traffic dominate at this size and a few milliseconds per step is realistic. Total of order $60$–$80\,\mathrm{ms}$ per chunk.
Sanity check: for the VLA the integration steps are cheap because the action network is a tenth of the size of the backbone and runs on few tokens; the cost is dominated by encoding the observation, which happens once. That is the reason for splitting a VLA into a large backbone and a small "action expert".
:::
:::

::: example Choosing the number of steps {#ex-steps}
A flow policy's success rate on a peg-insertion task was measured at 1, 2, 5 and 10 integration steps as 40%, 71%, 83% and 84% (60 trials each; illustrative data). Each step costs 6 ms and the chunk budget left after encoding is 40 ms. Which number of steps would you use, and what further test would you run?
::: solution
The budget allows at most $\lfloor40/6\rfloor = 6$ steps. Between 5 and 10 steps the difference (83% vs 84%) is far smaller than the sampling uncertainty with 60 trials (a 95% interval on 83% is roughly $\pm10$ percentage points; [[vision-language-action/policy-evaluation]]), whereas 1 or 2 steps are clearly worse. Use 5 steps ($30\,\mathrm{ms}$), leaving margin. Then confirm with a larger, interleaved A/B test of 5 against 10 steps if the margin matters, and check smoothness (jerk of the executed trajectory), which can degrade at few steps before success does.
:::
:::

::: history
Diffusion models were introduced by Sohl-Dickstein and colleagues in 2015 as a way of learning by reversing a diffusion process from non-equilibrium thermodynamics; Ho, Jain and Abbeel's DDPM (2020) made them competitive for images, and Song and colleagues connected them to score matching and stochastic differential equations (2021), the same year DDIM cut the number of steps. Janner and colleagues' Diffuser (2022) used diffusion to plan trajectories; Chi and colleagues' Diffusion Policy (2023) showed large gains over earlier behaviour-cloning heads on real and simulated manipulation. Flow matching and rectified flow appeared in 2022–23 as simpler, deterministic alternatives, and π0 (Physical Intelligence, 2024) combined a flow-matching action generator with a vision-language model, a design many VLAs followed.
:::

::: summary
- A generative policy samples an action chunk from $p(\mathbf x\mid\mathbf o)$ instead of predicting one value; this represents multimodal behaviour.
- DDPM noises data as $\mathbf x_k = \sqrt{\bar\alpha_k}\mathbf x_0 + \sqrt{1-\bar\alpha_k}\boldsymbol\epsilon$ and trains $\boldsymbol\epsilon_\theta$ by MSE; the optimum is $\E[\boldsymbol\epsilon\mid\mathbf x_k]$, equivalent to the posterior mean $\E[\mathbf x_0\mid\mathbf x_k]$ at each noise level.
- Sampling removes noise step by step; the sample commits to one mode as the noise falls. DDIM reuses the same network with about 10 steps.
- Flow matching regresses the velocity $\mathbf x_1 - \mathbf x_0$ along straight noise-to-data paths; the minimiser is the marginal velocity, whose ODE carries noise to data in 5–10 Euler steps.
- Observations condition the denoiser (FiLM, cross-attention); encode them once per chunk and run the small denoiser many times.
- Cost $\approx t_{\mathrm{enc}} + N_{\mathrm{steps}}t_{\mathrm{den}}$; always normalise actions to unit scale.
:::

## Exercises

::: exercise Signal coefficient {#exr-signal level=1 check="0.379"}
For $\bar\alpha_k = 0.144$, find the coefficient of $\mathbf x_0$ in [[#eq-marginal]]. (Enter it to three significant figures.)
::: solution
$\sqrt{0.144} = 0.379$. The noise coefficient is $\sqrt{0.856} = 0.925$: at this level the sample is mostly noise.
:::
:::

::: exercise Recovering the clean action {#exr-recover level=1 check="0.4"}
At a level with $\bar\alpha = 0.64$, a noisy action component is $x_k = -0.28$ and the network predicts $\hat\epsilon = -1.00$. Find $\hat x_0$ from [[#eq-x0hat]]. (Enter the value.)
::: solution
$\hat x_0 = (x_k - \sqrt{0.36}\,\hat\epsilon)/\sqrt{0.64} = (-0.28 + 0.60)/0.80 = 0.40$.
:::
:::

::: exercise Steps within a budget {#exr-budget level=1 check="7"}
A policy's observation encoder takes 22 ms, each denoiser call 9 ms, and the chunk must be ready within 90 ms. What is the largest number of denoising steps? (Enter the number.)
::: solution
$(90 - 22)/9 = 7.6$, so 7 steps.
:::
:::

::: exercise The cumulative product {#exr-alphabar level=2 check="0.9900"}
For a linear schedule with $\beta_k$ from $10^{-4}$ to $0.02$ over $K = 100$ steps, find $\bar\alpha_{10}$. (Enter it to four decimal places.)
::: solution
$\beta_k = 10^{-4} + (k-1)(0.02 - 10^{-4})/99$, so $\beta_1,\dots,\beta_{10}$ run from $0.0001$ to $0.00191$, sum $0.01005$. Then $\bar\alpha_{10} = \prod(1-\beta_k)\approx e^{-\sum\beta_k} = 0.9900$; the exact product is $0.98999$.
:::
:::

::: exercise A flow step {#exr-flowstep level=2 check="0.664"}
For the two-mode data of [[#ex-flow]], take one Euler step of $\Delta\tau = 0.5$ from $x = 0.4$ at $\tau = 0.5$, using $v^* = (\tanh(\tau x/(1-\tau)^2) - x)/(1-\tau)$. Where does the sample land at $\tau = 1$? (Enter the value to three decimal places.)
::: solution
$\tanh(0.5\times0.4/0.25) = \tanh(0.8) = 0.664$; $v^* = (0.664 - 0.4)/0.5 = 0.528$; $x = 0.4 + 0.5\times0.528 = 0.664$. (A step that ends at $\tau = 1$ lands exactly on the current estimate $\E[x_1\mid x_\tau] = \tanh(0.8)$, by [[#eq-vstar]].) A single large step under-shoots the mode $+1$: the estimate of the mode is still blurred at $\tau = 0.5$, and more steps are needed for accuracy.
:::
:::

::: exercise MSE target of a flow {#exr-target level=2}
Show that a flow-matching network trained on data with a single mode — $\mathbf x_1$ always equal to a fixed $\mathbf a$ for a given observation — learns $\mathbf v^*(\mathbf x, \tau) = (\mathbf a - \mathbf x)/(1-\tau)$, and that every ODE solution reaches $\mathbf a$ at $\tau = 1$.
::: solution
With $\mathbf x_1 = \mathbf a$ deterministic, $\E[\mathbf x_1\mid\mathbf x_\tau] = \mathbf a$ and [[#eq-vstar]] gives the stated field. The ODE $d\mathbf x/d\tau = (\mathbf a - \mathbf x)/(1-\tau)$ has solution $\mathbf x(\tau) - \mathbf a = (1-\tau)(\mathbf x_0 - \mathbf a)$ (check: the derivative is $-(\mathbf x_0 - \mathbf a) = (\mathbf a - \mathbf x)/(1-\tau)$). At $\tau = 1$ it equals $\mathbf a$ for every starting noise: a straight line, integrated exactly by a single Euler step.
:::
:::

::: exercise Posterior at an intermediate time {#exr-posterior level=3}
For the two-mode data of [[#ex-flow]] (modes $\pm1$, equal weight), find the probability that a sample at $x_\tau = 0.1$ ends in the $+1$ mode, for $\tau = 0.25$, $0.5$ and $0.75$. Interpret the result in terms of when the flow "decides".
::: solution
$\Prob(+1\mid x) = \tfrac12\bigl(1 + \tanh(\tau x/(1-\tau)^2)\bigr)$. $\tau = 0.25$: argument $0.025/0.5625 = 0.0444$, probability $0.522$. $\tau = 0.5$: $0.05/0.25 = 0.2$, probability $0.599$. $\tau = 0.75$: $0.075/0.0625 = 1.2$, probability $0.917$. Early in the flow a point near the middle is undecided; by $\tau = 0.75$ even a point only 0.1 from the middle is nearly committed. Decisions concentrate in the middle of the flow, which is why weighting training towards those times, and not skimping on integration steps there, matters.
:::
:::

::: exercise Designing a generative head {#exr-design level=3}
Your company's arm runs a 50 Hz joint controller; the task (wiping a table) is multimodal (the wiping pattern varies) and the onboard GPU gives you 40 ms per chunk for the action generator after observation encoding. Propose a chunk length, execution horizon, generator (diffusion or flow), number of steps and conditioning, and explain how you would check the choices.
::: solution
A reasonable design: flow matching (or DDIM-sampled diffusion) over chunks of $H = 50$ joint targets (1 s at 50 Hz), executed $h = 10$–$25$ steps at a time so the policy reacts within about 0.3–0.6 s; condition the velocity network on the encoded images and proprioception by cross-attention (or FiLM for a CNN); 5–10 integration steps sized to the 40 ms budget (measure per-step time on the target GPU); normalise every action dimension. Checks: closed-loop success and coverage of the table on a fixed set of initial conditions; smoothness (jerk) of the executed trajectories; mode switching between consecutive chunks (does the wiping pattern change mid-stroke? if so, condition on the previous chunk or use a longer $h$); an ablation of the number of steps. Do not use temporal ensembling across chunks from different samples.
:::
:::
