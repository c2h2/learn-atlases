Backpropagation delivers a gradient; an **optimiser** decides what to do with it. The choice matters more for deep networks than the convex theory of [[math-for-ml/optimisation]] would suggest. The loss is non-convex, its curvature differs by orders of magnitude between directions and between layers, the gradients are noisy estimates from mini-batches, and a single bad step can send training into a region from which it never recovers. The optimisers in use today — SGD with momentum for many vision models, Adam and AdamW for Transformers — are simple rules, each fixing a specific weakness of the one before, and each paired with a **learning-rate schedule** that matters as much as the rule itself.

[[math-for-ml/optimisation]] defined gradient descent and its convergence on smooth functions, stochastic gradient descent ([[math-for-ml/optimisation#def-sgd]]), heavy-ball momentum ([[math-for-ml/optimisation#def-momentum]]) and Adam and AdamW ([[math-for-ml/optimisation#alg-adam]]), and analysed the quadratic model that explains why the learning rate is limited by the sharpest direction. This chapter builds on those definitions without repeating them: it explains the noise floor of SGD, the two ways momentum is written, the adaptive methods from AdaGrad to Adam with their properties, why decoupled weight decay differs from an $\ell_2$ penalty, the schedules and warm-up used in practice, gradient clipping, and what has been proposed since.

## Stochastic gradient descent in practice {#sec-sgd}

Deep networks are trained on mini-batches. An **epoch** is one pass over the training set; in practice the data are shuffled and split into consecutive batches (sampling *without* replacement within an epoch), which behaves like the independent sampling assumed by the theory but visits every example exactly once per epoch. Language models are pretrained for roughly one epoch over a corpus of trillions of tokens, so for them every batch is fresh data and the distinction disappears.

With a constant learning rate, SGD does not converge to a minimiser: once close, the gradient noise keeps kicking it around. For least squares the size of this **noise floor** can be computed exactly.

::: proposition The noise floor of SGD on least squares {#prop-floor}
Consider least squares with inputs $\mathbf{x}\sim\Normal(\mathbf{0}, I_d)$ and responses $y = \mathbf{w}_\star^\top\mathbf{x} + \xi$, with noise $\xi$ of mean $0$ and variance $\sigma^2$, independent of $\mathbf{x}$. SGD with batch size $1$ and constant learning rate $\eta$ updates $\mathbf{w}\leftarrow\mathbf{w} - \eta(\mathbf{w}^\top\mathbf{x} - y)\mathbf{x}$ on a fresh example each step. If $0 < \eta < 2/(d + 2)$, the error $\mathbf{e}_t = \mathbf{w}_t - \mathbf{w}_\star$ satisfies

$$
\E\lVert\mathbf{e}_t\rVert^2\to\frac{\eta\sigma^2d}{2 - \eta(d + 2)}\approx\frac{\eta\sigma^2d}{2}\quad(\eta\text{ small}).
$$ {#eq-floor}
:::

::: proof
The residual is $\mathbf{w}^\top\mathbf{x} - y = \mathbf{e}^\top\mathbf{x} - \xi$, so $\mathbf{e}_{t+1} = (I - \eta\mathbf{x}\mathbf{x}^\top)\mathbf{e}_t + \eta\xi\mathbf{x}$. Square and take expectations over the fresh $(\mathbf{x}, \xi)$, given $\mathbf{e}_t$; the cross term vanishes because $\E\xi = 0$ and $\xi$ is independent of $\mathbf{x}$. For a standard Gaussian $\mathbf{x}$, $\E[\mathbf{x}\mathbf{x}^\top] = I$, $\E[(\mathbf{x}^\top\mathbf{e})^2\lVert\mathbf{x}\rVert^2] = (d + 2)\lVert\mathbf{e}\rVert^2$ (a fourth-moment identity: $\E x_i^4 = 3$, $\E x_i^2x_j^2 = 1$ for $i\ne j$) and $\E\lVert\mathbf{x}\rVert^2 = d$. Hence

$$
\E\big[\lVert\mathbf{e}_{t+1}\rVert^2\mid\mathbf{e}_t\big] = \lVert\mathbf{e}_t\rVert^2 - 2\eta\lVert\mathbf{e}_t\rVert^2 + \eta^2(d + 2)\lVert\mathbf{e}_t\rVert^2 + \eta^2\sigma^2d.
$$

Writing $u_t = \E\lVert\mathbf{e}_t\rVert^2$, this is $u_{t+1} = (1 - 2\eta + \eta^2(d + 2))u_t + \eta^2\sigma^2d$, a linear recursion whose factor lies in $(0, 1)$ when $0 < \eta < 2/(d + 2)$. It converges to the fixed point $u = \eta^2\sigma^2d/(2\eta - \eta^2(d + 2))$, which simplifies to [[#eq-floor]].
:::

::: example Noise floors in numbers {#ex-floor}
For $d = 2$ and $\sigma^2 = 1$, compute the noise floor for $\eta = 0.1$ and $\eta = 0.01$, and estimate how many steps each needs to get from $\E\lVert\mathbf{e}\rVert^2 = 5$ to within twice its floor.
::: solution
By [[#eq-floor]], $\eta = 0.1$ gives $0.2/(2 - 0.4) = 0.125$ and $\eta = 0.01$ gives $0.02/1.96 = 0.0102$. The recursion in the proof contracts the excess $u_t - u_\infty$ by $1 - 2\eta + 4\eta^2$ per step: $0.84$ for $\eta = 0.1$ and $0.9804$ for $\eta = 0.01$. To shrink the excess from about $5$ to the size of the floor takes $\ln(0.125/5)/\ln0.84\approx21$ steps for the large rate and $\ln(0.0102/5)/\ln0.9804\approx313$ steps for the small one. The large rate is fifteen times faster but ends twelve times higher: the trade-off a schedule resolves. The experiment in [[#sec-code]] measures floors of $0.12$–$0.15$ and $0.009$–$0.012$.
:::
:::

The floor is proportional to the learning rate and to the noise. A large learning rate makes fast early progress and then stalls at a high floor; a small one has a low floor but takes long to get there. **Decaying the learning rate** gets both: large steps while far away, small steps at the end. This is the practical content of the Robbins–Monro conditions of [[math-for-ml/optimisation#sec-sgd]], and the reason every serious training run uses a schedule (see [[#sec-schedules]]). Increasing the batch size $B$ divides the gradient noise variance by $B$ and has, to first order, the same effect on the floor as dividing $\eta$ by $B$ — the intuition behind scaling the learning rate with the batch size.

## Momentum {#sec-momentum}

Libraries write momentum differently from the textbook heavy ball. PyTorch's `torch.optim.SGD(momentum=β)` updates

$$
\mathbf{b}_t = \beta\mathbf{b}_{t-1} + \mathbf{g}_t,\qquad\theta_t = \theta_{t-1} - \eta\,\mathbf{b}_t,
$$ {#eq-torch-momentum}

accumulating raw gradients in a buffer $\mathbf{b}$ and scaling by $\eta$ afterwards.

::: proposition The two forms of momentum agree {#prop-momentum-forms}
With a constant learning rate, [[#eq-torch-momentum]] produces the same iterates as the heavy-ball update $\mathbf{v}_t = \beta\mathbf{v}_{t-1} - \eta\mathbf{g}_t$, $\theta_t = \theta_{t-1} + \mathbf{v}_t$ of [[math-for-ml/optimisation#def-momentum]]. Unrolled, the step is a weighted sum of past gradients,

$$
\theta_t - \theta_{t-1} = -\eta\sum_{s=1}^t\beta^{t-s}\mathbf{g}_s,
$$

whose weights sum to at most $1/(1 - \beta)$: for a constant gradient the effective learning rate approaches $\eta/(1 - \beta)$.
:::

::: proof
Set $\mathbf{v}_t = -\eta\mathbf{b}_t$. Multiplying the buffer recursion by $-\eta$ gives $\mathbf{v}_t = \beta\mathbf{v}_{t-1} - \eta\mathbf{g}_t$, and $\theta_t = \theta_{t-1} - \eta\mathbf{b}_t = \theta_{t-1} + \mathbf{v}_t$. Unrolling $\mathbf{b}_t = \sum_{s\le t}\beta^{t-s}\mathbf{g}_s$ from $\mathbf{b}_0 = \mathbf{0}$ gives the sum, and $\sum_{s\le t}\beta^{t-s} = (1 - \beta^t)/(1 - \beta) < 1/(1 - \beta)$.
:::

::: example Momentum amplifies and cancels {#ex-momentum}
With $\beta = 0.9$, find the long-run buffer $\mathbf{b}_t$ of [[#eq-torch-momentum]] for a constant gradient $g_t = 1$, and for an alternating gradient $g_t = (-1)^t$.
::: solution
For a constant gradient, $b_t = \sum_{k=0}^{t-1}0.9^k\to10$: the step is ten times the plain gradient step. For the alternating gradient, $b_t = (-1)^t\sum_{k=0}^{t-1}(-0.9)^k\to(-1)^t/(1 + 0.9)$, of magnitude $0.526$: about half the plain step. The ratio between the amplification of a consistent direction and of an oscillating one is $(1 + \beta)/(1 - \beta) = 19$. On a narrow valley, where the gradient across the valley flips sign each step and the gradient along it is steady, this ratio is exactly what turns zig-zagging into progress.
:::
:::

The two forms differ when the learning rate changes during training: in [[#eq-torch-momentum]] a new learning rate applies at once to the whole accumulated buffer, in the heavy-ball form only to new gradients. With $\beta = 0.9$ the effective learning rate is ten times $\eta$, so switching momentum on without lowering $\eta$ often causes divergence.

**Nesterov momentum** evaluates the gradient at the point momentum is about to carry the parameters to, $\mathbf{v}_t = \beta\mathbf{v}_{t-1} - \eta\nabla f(\theta_{t-1} + \beta\mathbf{v}_{t-1})$, $\theta_t = \theta_{t-1} + \mathbf{v}_t$. Looking ahead lets it correct an overshoot one step earlier; on smooth convex functions it attains the optimal accelerated rate (Nesterov, 1983), and Sutskever, Martens, Dahl and Hinton (2013) showed that momentum, with Nesterov's variant and a well-chosen initialisation, was enough to train deep and recurrent networks that had been thought to need second-order methods.

::: widget gradientdescent
f: (1 - x)^2 + 100*(y - x^2)^2
start: -1.2, 1
rate: 0.001
steps: 200
method: momentum
x: -2, 2
y: -1, 3
caption: The Rosenbrock function $(1 - x)^2 + 100(y - x^2)^2$, whose minimum $(1, 1)$ lies at the end of a long curved valley. Plain gradient descent (switch the method) needs a learning rate below about $0.0015$ (two over the largest curvature at the start) to avoid bouncing out across the steep walls, and then crawls along the valley floor; momentum accumulates speed along the floor while the oscillations across it cancel. Raise the learning rate to see where each method becomes unstable.
:::

## Adaptive methods {#sec-adaptive}

Momentum fixes direction-dependent oscillation, but a single learning rate still has to suit every parameter. In a deep network that is a real limitation: gradients of embedding rows for rare tokens are tiny and infrequent, those of normalisation gains are large, and the scale varies from layer to layer. **Adaptive** methods give each parameter its own step size, inversely proportional to the typical size of its gradients.

::: definition AdaGrad and RMSProp {#def-adagrad}
With all operations elementwise and a small $\epsilon > 0$:

- **AdaGrad** (Duchi, Hazan and Singer, 2011) accumulates squared gradients, $\mathbf{r}_t = \mathbf{r}_{t-1} + \mathbf{g}_t^2$, and updates $\theta_t = \theta_{t-1} - \eta\,\mathbf{g}_t/(\sqrt{\mathbf{r}_t} + \epsilon)$.
- **RMSProp** (Tieleman and Hinton, 2012, in a lecture of Hinton's Coursera course) replaces the sum by an exponential moving average, $\mathbf{r}_t = \rho\mathbf{r}_{t-1} + (1 - \rho)\mathbf{g}_t^2$, with the same update.
:::

AdaGrad's accumulated sum only grows, so its step sizes decay like $1/\sqrt t$ — good for convex problems with sparse features, for which it has strong regret guarantees, but too aggressive for long non-convex training, where it stops learning. RMSProp forgets old gradients with time constant about $1/(1 - \rho)$ steps, so the step size tracks the *recent* gradient scale. Adam ([[math-for-ml/optimisation#alg-adam]]) is RMSProp with momentum applied to the numerator and bias correction for both averages.

::: proposition Properties of the Adam update {#prop-adam}
Let $\mathbf{m}_t$ and $\mathbf{v}_t$ be Adam's moving averages with $\mathbf{m}_0 = \mathbf{v}_0 = \mathbf{0}$.

1. (*Bias correction.*) If the gradients $\mathbf{g}_1, \dots, \mathbf{g}_t$ all have the same mean $\boldsymbol{\mu}$ and the same second moment $\mathbf{s} = \E\mathbf{g}^2$, then $\E\mathbf{m}_t = (1 - \beta_1^t)\boldsymbol{\mu}$ and $\E\mathbf{v}_t = (1 - \beta_2^t)\mathbf{s}$, so $\hat{\mathbf{m}}_t$ and $\hat{\mathbf{v}}_t$ are unbiased.
2. (*Scale invariance.*) With $\epsilon = 0$, multiplying every gradient by a constant $c > 0$ — or the gradients of one coordinate by its own constant — leaves the update unchanged.
3. (*Sign descent as a limit.*) With $\beta_1 = \beta_2 = 0$ and $\epsilon = 0$ the update is $-\eta\operatorname{sign}(\mathbf{g}_t)$.
:::

::: proof
(1) Unrolling, $\mathbf{m}_t = (1 - \beta_1)\sum_{s=1}^t\beta_1^{t-s}\mathbf{g}_s$, so $\E\mathbf{m}_t = (1 - \beta_1)\boldsymbol{\mu}\sum_{k=0}^{t-1}\beta_1^k = (1 - \beta_1^t)\boldsymbol{\mu}$; the same computation with $\mathbf{g}_s^2$ gives $\E\mathbf{v}_t$. Dividing by $1 - \beta^t$ removes the factor. (2) Replacing $\mathbf{g}_s$ by $c\mathbf{g}_s$ multiplies $\mathbf{m}_t$ and $\hat{\mathbf{m}}_t$ by $c$ and $\mathbf{v}_t$ by $c^2$, so $\sqrt{\hat{\mathbf{v}}_t}$ by $c$, and the ratio $\hat{\mathbf{m}}_t/\sqrt{\hat{\mathbf{v}}_t}$ is unchanged; the same holds coordinate by coordinate. (3) Then $\hat{\mathbf{m}}_t = \mathbf{g}_t$ and $\sqrt{\hat{\mathbf{v}}_t} = \lvert\mathbf{g}_t\rvert$, and their ratio is the sign.
:::

The bias correction matters most at the start: without it, $\mathbf{v}_t$ is close to zero for the first few hundred steps (with $\beta_2 = 0.999$) and the steps would be too large. Scale invariance means Adam's step is set by $\eta$ and by the *signal-to-noise ratio* of each coordinate's gradient — near $\eta$ when the gradient is consistent, much smaller when it fluctuates in sign — rather than by its raw scale. This is why Adam's learning rates ($10^{-4}$ to $10^{-3}$ for language models) are not comparable with SGD's, and why Adam is far less sensitive to the gradient scale differences between layers. It is not invariant to rotations of parameter space, and it does not automatically make an ill-conditioned problem well conditioned.

::: example Two AdamW steps by hand {#ex-adamw}
Minimise $f(\theta) = \theta^2$ from $\theta_0 = 1$ with AdamW, $\eta = 0.1$, $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 0$ and weight decay $\lambda = 0.01$. Compute $\theta_1$ and $\theta_2$.
::: solution
**Step 1.** $g_1 = 2\theta_0 = 2$; $m_1 = 0.1\cdot2 = 0.2$, $v_1 = 0.001\cdot4 = 0.004$; bias-corrected $\hat m_1 = 0.2/0.1 = 2$ and $\hat v_1 = 0.004/0.001 = 4$. The update is $\eta(\hat m_1/\sqrt{\hat v_1} + \lambda\theta_0) = 0.1(1 + 0.01) = 0.101$, so $\theta_1 = 0.899$.

**Step 2.** $g_2 = 1.798$; $m_2 = 0.9\cdot0.2 + 0.1\cdot1.798 = 0.3598$ and $\hat m_2 = 0.3598/0.19 = 1.89368$; $v_2 = 0.999\cdot0.004 + 0.001\cdot1.798^2 = 0.0072288$ and $\hat v_2 = 0.0072288/0.001999 = 3.61621$, $\sqrt{\hat v_2} = 1.90163$. The update is $0.1(1.89368/1.90163 + 0.01\cdot0.899) = 0.1(0.99582 + 0.00899) = 0.10048$, so $\theta_2 = 0.79852$.

Both steps have size about $\eta$, although the gradient shrank by $10\%$: Adam moves at a roughly constant speed while the gradient keeps its sign. Close to the minimum the gradient changes sign, $\hat m$ shrinks relative to $\sqrt{\hat v}$, and the steps become small.
:::
:::

### Weight decay in adaptive methods {#sec-adamw}

For plain SGD an $\ell_2$ penalty $\frac\lambda2\lVert\theta\rVert^2$ in the loss and multiplying the weights by $1 - \eta\lambda$ each step are the same thing ([[ml-fundamentals/regularisation#prop-decay]]). For adaptive methods they are not.

::: proposition An $\ell_2$ penalty is not weight decay under Adam {#prop-decoupled}
Suppose Adam's preconditioner has reached a steady value $\sqrt{\hat{\mathbf{v}}}$ and ignore momentum ($\beta_1 = 0$) and $\epsilon$. Adding $\frac\lambda2\lVert\theta\rVert^2$ to the loss shrinks coordinate $i$ by the factor $1 - \eta\lambda/\sqrt{\hat v_i}$ per step, in addition to the loss-gradient step. Decoupled weight decay (AdamW) shrinks every coordinate by the same factor $1 - \eta\lambda$.
:::

::: proof
With the penalty, the gradient fed to Adam is $\mathbf{g} + \lambda\theta$, and the update is $-\eta(\mathbf{g} + \lambda\theta)/\sqrt{\hat{\mathbf{v}}}$, whose $i$-th component splits into $-\eta g_i/\sqrt{\hat v_i}$ and $-\eta\lambda\theta_i/\sqrt{\hat v_i}$; the second term multiplies $\theta_i$ by $1 - \eta\lambda/\sqrt{\hat v_i}$. AdamW adds $-\eta\lambda\theta_i$ outside the division, a factor $1 - \eta\lambda$ for every $i$.
:::

Under the coupled $\ell_2$ form, weights with large or noisy gradient histories (large $\hat v_i$) are barely regularised and weights with tiny gradients are decayed hard — the opposite of the prior "all weights equally likely to be small" that the penalty was meant to express. Loshchilov and Hutter (2019) showed that decoupling restored the benefits of weight decay for Adam, and AdamW became the standard optimiser for Transformers. Note that frameworks differ in whether $\lambda$ is multiplied by the current $\eta$ (PyTorch's `AdamW` multiplies by the learning rate, as in [[math-for-ml/optimisation#alg-adam]]) — a detail that matters when copying hyperparameters between code bases. Weight decay is usually not applied to biases and normalisation gains.

::: quiz
A model is trained with Adam and an $\ell_2$ penalty $\frac\lambda2\lVert\theta\rVert^2$ added to the loss. Which parameters are regularised *least*?
- [ ] Those with the smallest gradients
- [x] Those whose gradients have the largest typical magnitude
- [ ] All parameters equally, as with SGD
- [ ] Only the biases
::: solution
By [[#prop-decoupled]] the penalty's shrinkage for coordinate $i$ is divided by $\sqrt{\hat v_i}$, the root-mean-square of its gradients, so parameters with large gradients are shrunk least. AdamW avoids this by applying the decay outside the adaptive scaling.
:::
:::

## Learning-rate schedules {#sec-schedules}

Almost no deep network is trained at a constant learning rate. A schedule $\eta_t$ multiplies a peak learning rate $\eta_{\max}$ by a shape that rises at the start and falls at the end.

::: definition Common learning-rate schedules {#def-schedules}
Let $T$ be the total number of steps and $T_w$ the number of warm-up steps.

- **Linear warm-up**: $\eta_t = \eta_{\max}\,t/T_w$ for $t\le T_w$.
- **Cosine decay** (Loshchilov and Hutter, 2017) after warm-up: $\eta_t = \eta_{\min} + \frac12(\eta_{\max} - \eta_{\min})\big(1 + \cos(\pi\frac{t - T_w}{T - T_w})\big)$.
- **Step decay**: multiply $\eta$ by a factor (often $0.1$) at fixed epochs, as in the original residual-network training.
- **Inverse square root** (Vaswani et al., 2017): $\eta_t\propto\min\big(t^{-1/2}, t\,T_w^{-3/2}\big)$, a linear warm-up followed by decay as $1/\sqrt t$.
- **Warm-up–stable–decay** (WSD): warm up, hold $\eta_{\max}$ constant for most of training, then decay quickly (linearly or otherwise) over a final fraction, often around $10$–$20\%$, of the steps (Hu et al., 2024; Hägele et al., 2024).
:::

::: widget plot
f: max(0, min(x/w, 0.1 + 0.45*(1 + cos(pi*(x - w)/(100 - w))))); max(0, min(x/w, 1, 0.1 + 0.9*(100 - x)/20))
x: 0, 100
y: 0, 1.1
sliders: w=5:1:30:1
labels: warm-up then cosine to $10\%$; warm-up–stable–decay
caption: Two schedules over $100$ (thousand) steps, as fractions of $\eta_{\max}$, with a warm-up of $w$ steps. The cosine schedule starts decaying immediately after warm-up; WSD holds the peak until the last $20\%$ and then decays linearly. A WSD run can be stopped and decayed at any point, which makes it convenient when the final training length is not fixed in advance.
:::

The shape follows from [[#prop-floor]]: a high learning rate makes progress, a low one settles into a good point, so the run spends most of its time high and finishes low. The end of the decay typically produces a sharp drop in the loss, which is visible in WSD runs as a cliff at the start of the decay phase.

**Warm-up** is harder to justify from first principles, and its benefit was established empirically. At initialisation the curvature of the loss can be much higher than later in training, so a learning rate that is safe later may be unstable at first; Adam's second-moment estimate is based on few samples early on, which makes its steps erratic (Liu et al., 2020); and Goyal et al. (2017) found a gradual warm-up essential when training with very large batches and correspondingly large learning rates. Post-norm Transformers were particularly dependent on warm-up ([[transformers/transformer-block#sec-residual]]). In current language-model recipes warm-up lasts from a few hundred to a few thousand steps.

::: example A schedule in numbers {#ex-schedule}
A run of $T = 100{,}000$ steps uses $\eta_{\max} = 3\times10^{-4}$, $T_w = 2{,}000$ warm-up steps and cosine decay to $\eta_{\min} = 0.1\,\eta_{\max}$, like the schedule reported for LLaMA (Touvron et al., 2023). Find $\eta$ at steps $1{,}000$, $2{,}000$, $51{,}000$ and $100{,}000$.
::: solution
Step $1{,}000$ is halfway through warm-up: $\eta = 3\times10^{-4}\cdot0.5 = 1.5\times10^{-4}$. Step $2{,}000$: the peak, $3\times10^{-4}$. Step $51{,}000$: $(t - T_w)/(T - T_w) = 49{,}000/98{,}000 = \frac12$, so $\cos(\pi/2) = 0$ and $\eta = \eta_{\min} + \frac12(\eta_{\max} - \eta_{\min}) = 3\times10^{-5} + 1.35\times10^{-4} = 1.65\times10^{-4}$. Step $100{,}000$: $\cos\pi = -1$ and $\eta = \eta_{\min} = 3\times10^{-5}$.
:::
:::

## Gradient clipping {#sec-clipping}

Occasionally a batch produces a gradient far larger than usual — an unlucky batch, a region of high curvature, an attention logit that has grown too large. One such step can undo hours of training. **Clipping** caps the step.

::: definition Gradient clipping by global norm {#def-clipping}
Given the full gradient $\mathbf{g}$ (all parameters concatenated) and a threshold $c > 0$, replace

$$
\mathbf{g}\leftarrow\mathbf{g}\cdot\min\Big(1, \frac{c}{\lVert\mathbf{g}\rVert}\Big).
$$
:::

The clipped gradient has the same direction and norm at most $c$; gradients already smaller than $c$ are untouched. Clipping by the *global* norm preserves the relative sizes of the gradients of different layers, unlike clipping each coordinate. It was introduced for recurrent networks, whose gradients can explode over long sequences (Pascanu, Mikolov and Bengio, 2013), and is now standard for Transformers: GPT-3 (Brown et al., 2020) and LLaMA (Touvron et al., 2023) both report clipping the global norm at $1.0$, with AdamW, $\beta_1 = 0.9$, $\beta_2 = 0.95$ and weight decay $0.1$. The gradient norm, logged at every step, is also one of the most informative signals for diagnosing a run ([[neural-networks/training-practice]]).

::: warning Learning rates do not transfer
A learning rate is meaningful only together with the optimiser, the batch size, the schedule, the initialisation and the model width. Adam's $3\times10^{-4}$ and SGD's $0.1$ are both reasonable values for their own optimisers; swapping them is a disaster. Doubling the batch size usually calls for a larger learning rate (for SGD roughly in proportion, up to a limit); widening a network usually calls for a smaller one for its hidden layers. Parametrisations such as $\mu$P (Yang et al., 2021) are designed so that the best learning rate stays approximately fixed as width grows ([[scaling]]). When reusing a published recipe, change one thing at a time and re-tune the learning rate first.
:::

## Comparing the optimisers {#sec-code}

The listing runs the methods on the Rosenbrock function from the standard starting point $(-1.2, 1)$, each with a learning rate near the largest that is stable for it, and then shows the noise floor of SGD and the effect of a schedule on noisy least squares ($d = 2$, $\sigma^2 = 1$, batch size $1$).

```python
import math, random

def rosenbrock(p):                        # f(x, y) = (1 - x)^2 + 100 (y - x^2)^2, minimum at (1, 1)
    x, y = p
    f = (1 - x) ** 2 + 100 * (y - x * x) ** 2
    g = [-2 * (1 - x) - 400 * x * (y - x * x), 200 * (y - x * x)]
    return f, g

def sgd(lr):
    def step(p, g, s):
        return [pi - lr * gi for pi, gi in zip(p, g)]
    return step

def momentum(lr, beta=0.9):               # PyTorch form: v <- beta v + g ; p <- p - lr v
    def step(p, g, s):
        s.setdefault("v", [0.0] * len(p))
        s["v"] = [beta * vi + gi for vi, gi in zip(s["v"], g)]
        return [pi - lr * vi for pi, vi in zip(p, s["v"])]
    return step

def rmsprop(lr, rho=0.9, eps=1e-8):
    def step(p, g, s):
        s.setdefault("r", [0.0] * len(p))
        s["r"] = [rho * ri + (1 - rho) * gi * gi for ri, gi in zip(s["r"], g)]
        return [pi - lr * gi / (math.sqrt(ri) + eps) for pi, gi, ri in zip(p, g, s["r"])]
    return step

def adam(lr, b1=0.9, b2=0.999, eps=1e-8, wd=0.0):   # wd > 0: decoupled decay (AdamW)
    def step(p, g, s):
        t = s["t"] = s.get("t", 0) + 1
        s.setdefault("m", [0.0] * len(p)); s.setdefault("v", [0.0] * len(p))
        s["m"] = [b1 * mi + (1 - b1) * gi for mi, gi in zip(s["m"], g)]
        s["v"] = [b2 * vi + (1 - b2) * gi * gi for vi, gi in zip(s["v"], g)]
        mh = [mi / (1 - b1 ** t) for mi in s["m"]]
        vh = [vi / (1 - b2 ** t) for vi in s["v"]]
        return [pi - lr * (mi / (math.sqrt(vi) + eps) + wd * pi) for pi, mi, vi in zip(p, mh, vh)]
    return step

print("Rosenbrock from (-1.2, 1):")
for name, opt in [("gradient descent  lr=1e-3", sgd(1e-3)),
                  ("momentum 0.9      lr=1e-3", momentum(1e-3)),
                  ("RMSProp           lr=1e-2", rmsprop(1e-2)),
                  ("Adam              lr=1e-2", adam(1e-2))]:
    p, s = [-1.2, 1.0], {}
    out = []
    for t in range(1, 5001):
        f, g = rosenbrock(p)
        p = opt(p, g, s)
        if t in (100, 1000, 5000):
            out.append(f"{rosenbrock(p)[0]:.2e}")
    print(f"  {name}  f after 100/1000/5000 steps: {' / '.join(out)}   end ({p[0]:.3f}, {p[1]:.3f})")

# Stochastic gradients: least squares on noisy data, constant vs decaying learning rate
rng = random.Random(0)
data = []
for _ in range(1000):
    x = [rng.gauss(0, 1), rng.gauss(0, 1)]
    data.append((x, 2.0 * x[0] - 1.0 * x[1] + rng.gauss(0, 1)))
# the empirical least-squares solution w_hat, from the 2x2 normal equations
a = sum(x[0] * x[0] for x, _ in data); b = sum(x[0] * x[1] for x, _ in data)
d = sum(x[1] * x[1] for x, _ in data)
c0 = sum(x[0] * y for x, y in data); c1 = sum(x[1] * y for x, y in data)
det = a * d - b * b
w_hat = [(d * c0 - b * c1) / det, (a * c1 - b * c0) / det]
print("SGD with batch size 1 on noisy least squares;")
print("mean |w - w_hat|^2 over steps 1-1000 / 4001-5000 / 19001-20000:")
for name, sched in [("constant lr 0.1      ", lambda t: 0.1),
                    ("constant lr 0.01     ", lambda t: 0.01),
                    ("lr 0.1 cosine to zero", lambda t: 0.05 * (1 + math.cos(math.pi * t / 20000)))]:
    w = [0.0, 0.0]; acc = 0.0; out = []
    for t in range(1, 20001):
        x, y = data[rng.randrange(len(data))]
        r = w[0] * x[0] + w[1] * x[1] - y
        lr = sched(t)
        w = [w[0] - lr * r * x[0], w[1] - lr * r * x[1]]
        acc += (w[0] - w_hat[0]) ** 2 + (w[1] - w_hat[1]) ** 2
        if t % 1000 == 0:
            if t in (1000, 5000, 20000):
                out.append(f"{acc / 1000:.1e}")
            acc = 0.0
    print(f"  {name}  {' / '.join(out)}")
```

```text
Rosenbrock from (-1.2, 1):
  gradient descent  lr=1e-3  f after 100/1000/5000 steps: 3.80e+00 / 4.54e-01 / 3.76e-03   end (0.939, 0.881)
  momentum 0.9      lr=1e-3  f after 100/1000/5000 steps: 1.43e-01 / 2.51e-05 / 8.82e-20   end (1.000, 1.000)
  RMSProp           lr=1e-2  f after 100/1000/5000 steps: 3.48e+00 / 3.58e-02 / 2.22e-02   end (0.989, 0.963)
  Adam              lr=1e-2  f after 100/1000/5000 steps: 4.18e+00 / 1.25e+00 / 4.72e-10   end (1.000, 1.000)
SGD with batch size 1 on noisy least squares;
mean |w - w_hat|^2 over steps 1-1000 / 4001-5000 / 19001-20000:
  constant lr 0.1        1.4e-01 / 1.2e-01 / 1.5e-01
  constant lr 0.01       2.1e-01 / 8.8e-03 / 1.2e-02
  lr 0.1 cosine to zero  1.6e-01 / 9.9e-02 / 1.1e-03
```

On the Rosenbrock valley momentum is the clear winner at this learning rate; plain gradient descent is still creeping along the valley after $5{,}000$ steps. RMSProp, with no momentum and a constant learning rate, ends up bouncing around near the minimum rather than converging — an adaptive method moves at a speed of order $\eta$ whatever the gradient, so it needs a decaying learning rate to settle. Adam's momentum averages those bounces out. On the noisy problem, the constant-learning-rate runs plateau at the floors predicted by [[#eq-floor]] — $0.1\cdot2/(2 - 0.4) = 0.125$ and $0.01\cdot2/(2 - 0.04) = 0.0102$ — while the cosine schedule starts fast with the large learning rate and ends ten times lower than the small constant one. No single ranking of optimisers holds across problems; these toy results illustrate mechanisms, not general performance.

## Beyond Adam {#sec-beyond}

Adam needs two extra numbers per parameter — for a model with $7\times10^9$ parameters, $56$ GB of optimiser state in 32-bit floats ([[math-for-ml/optimisation#ex-adam]]). Several lines of work try to reduce this memory or to improve on Adam's diagonal preconditioning. As of 2026 the most widely documented include:

- **Adafactor** (Shazeer and Stern, 2018) stores the second moments of a weight matrix in factored form, one vector for the rows and one for the columns, cutting the memory from $mn$ to $m + n$ numbers per matrix; it was used to train T5.
- **Lion** (Chen et al., 2023), found by automated program search, updates by the *sign* of an interpolation of momentum and gradient, so every coordinate moves by exactly $\eta$; it stores only momentum.
- **Shampoo** (Gupta, Koren and Singer, 2018) and its successors precondition each weight matrix by matrix roots of accumulated gradient statistics for its rows and columns, a structured approximation to full-matrix AdaGrad; SOAP (Vyas et al., 2024) runs Adam in Shampoo's eigenbasis.
- **Muon** (Jordan et al., 2024) replaces the momentum matrix of each hidden weight matrix by an approximately orthogonalised version, computed with a few Newton–Schulz iterations, so that all its singular directions take equal steps; Liu et al. (2025) reported scaling it to large language-model training.

Claims of improvement over a well-tuned AdamW baseline have often shrunk on careful re-evaluation, because the baseline's hyperparameters matter as much as the optimiser. AdamW, with warm-up, cosine or WSD decay, clipping at norm $1$ and weight decay around $0.1$, remains the default in most published language-model recipes.

::: history
Stochastic approximation began with Herbert Robbins and Sutton Monro (1951). Boris Polyak introduced the heavy-ball method in 1964 and Yurii Nesterov his accelerated gradient in 1983. Neural networks were trained with SGD and momentum from the start: Rumelhart, Hinton and Williams (1986) used a momentum term. Adaptive per-parameter rates came from online convex optimisation with AdaGrad (Duchi, Hazan and Singer, 2011); Matthew Zeiler's AdaDelta (2012) and Tijmen Tieleman and Geoffrey Hinton's RMSProp (2012) adapted it to non-convex training. Diederik Kingma and Jimmy Ba's Adam (arXiv 2014, ICLR 2015) combined momentum with RMSProp-style scaling and bias correction; Reddi, Kale and Kumar (2018) showed that Adam can fail to converge on certain convex problems and proposed AMSGrad, and Ilya Loshchilov and Frank Hutter introduced cosine annealing with restarts (2017) and decoupled weight decay (AdamW, 2019). Goyal et al. (2017) trained ImageNet models in one hour with large batches, linear learning-rate scaling and warm-up.
:::

::: summary
- With a constant learning rate SGD stalls at a **noise floor** proportional to $\eta$ times the gradient noise ($\eta\sigma^2d/2$ for least squares); decaying the learning rate removes it, and larger batches lower it.
- **Momentum** averages past gradients with weights $\beta^k$, giving an effective learning rate $\eta/(1 - \beta)$ along consistent directions and cancelling oscillations; PyTorch's form and the heavy ball agree at constant $\eta$. Nesterov's variant looks ahead.
- **AdaGrad**, **RMSProp** and **Adam** divide each coordinate's step by its root-mean-square gradient. Adam's bias correction makes its averages unbiased; its update is invariant to gradient scale and moves each coordinate by roughly $\eta$ when the gradient is consistent.
- An $\ell_2$ penalty under Adam regularises parameters with large gradients least; **AdamW** decouples the decay so that all weights shrink by the same factor.
- **Schedules**: linear warm-up, then cosine, step, inverse-square-root or warm-up–stable–decay. Warm-up's benefit is empirical; decay is what reaches a low loss at the end.
- **Gradient clipping** by global norm caps rare huge steps without changing direction; typical language-model recipes use AdamW, $\beta_2 = 0.95$, weight decay $0.1$ and clipping at $1$.
:::

## Exercises

::: exercise Effective learning rate of momentum {level=1 check="0.1"}
With momentum $\beta = 0.9$ and learning rate $\eta = 0.01$, what step does [[#eq-torch-momentum]] eventually take per unit of a constant gradient?
::: solution
By [[#prop-momentum-forms]] the weights sum to $1/(1 - \beta) = 10$, so the step approaches $\eta/(1 - \beta) = 0.1$ times the gradient.
:::
:::

::: exercise Bias correction by hand {level=1 check="0.39/0.19"}
Adam with $\beta_1 = 0.9$ receives gradients $g_1 = 1$ and $g_2 = 3$ for one parameter. Compute $m_2$ and $\hat m_2$, and enter $\hat m_2$.
::: solution
$m_1 = 0.1\cdot1 = 0.1$ and $m_2 = 0.9\cdot0.1 + 0.1\cdot3 = 0.39$. The correction divides by $1 - 0.9^2 = 0.19$: $\hat m_2 = 0.39/0.19\approx2.053$, a weighted average of $1$ and $3$ with weights $0.09/0.19$ and $0.1/0.19$. Without correction, $m_2 = 0.39$ would understate the gradient's size by a factor of five.
:::
:::

::: exercise A cosine schedule {level=1 check="1e-3*(1+cos(pi/4))/2"}
A cosine schedule without warm-up decays from $\eta_{\max} = 10^{-3}$ to $0$ over $T = 1{,}000$ steps. What is the learning rate at step $250$?
::: solution
$\eta_{250} = \frac12\cdot10^{-3}\big(1 + \cos(\pi\cdot250/1000)\big) = \frac12\cdot10^{-3}(1 + \cos\frac\pi4) = 10^{-3}\cdot0.8536 = 8.54\times10^{-4}$. A quarter of the way through, the cosine schedule has lost only $15\%$ of its peak.
:::
:::

::: exercise Clipping a gradient {level=2 check="3/13"}
A gradient $\mathbf{g} = (3, 4, 12)$ is clipped to global norm $c = 1$. What is its first component after clipping? Would clipping each coordinate to $[-1, 1]$ give the same direction?
::: solution
$\lVert\mathbf{g}\rVert = \sqrt{9 + 16 + 144} = 13$, so $\mathbf{g}\leftarrow\mathbf{g}/13 = (3/13, 4/13, 12/13)$, first component $3/13\approx0.231$. Coordinate-wise clipping gives $(1, 1, 1)$, which points in a different direction and discards the information that the third component is four times the first.
:::
:::

::: exercise A noise floor {level=2 check="0.5/1.4"}
Under the assumptions of [[#prop-floor]], with $d = 10$, $\sigma^2 = 1$ and $\eta = 0.05$, what is the limiting $\E\lVert\mathbf{w}_t - \mathbf{w}_\star\rVert^2$? By what factor does halving $\eta$ reduce it?
::: solution
$\eta\sigma^2d/(2 - \eta(d + 2)) = 0.5/(2 - 0.6) = 0.5/1.4\approx0.357$. With $\eta = 0.025$: $0.25/(2 - 0.3) = 0.147$, a reduction by a factor of $2.43$ — slightly more than $2$, because the denominator also grows. The learning rate $0.05$ is within a factor of about three of the stability limit $2/(d + 2) = 0.167$, which is why the denominator matters.
:::
:::

::: exercise Coupled and decoupled decay {level=2}
Two parameters have Adam second-moment estimates $\hat v_1 = 100$ and $\hat v_2 = 10^{-4}$. With $\eta = 10^{-3}$ and $\lambda = 0.1$, compute the per-step shrinkage factor of each under an $\ell_2$ penalty (coupled) and under AdamW (decoupled), using [[#prop-decoupled]].
::: solution
Coupled: $1 - \eta\lambda/\sqrt{\hat v_i}$, which is $1 - 10^{-4}/10 = 1 - 10^{-5}$ for the first and $1 - 10^{-4}/10^{-2} = 1 - 10^{-2}$ for the second: the parameter with small gradients is decayed a thousand times faster. Decoupled: $1 - \eta\lambda = 1 - 10^{-4}$ for both.
:::
:::

::: exercise The value of momentum on a quadratic {level=2 check="9/11"}
On a quadratic with condition number $\kappa = 100$, the best constant-step gradient descent contracts the error by $(\kappa - 1)/(\kappa + 1)$ per step and optimally tuned heavy-ball momentum by $(\sqrt\kappa - 1)/(\sqrt\kappa + 1)$ ([[math-for-ml/optimisation#sec-momentum]]). Compute the momentum factor, and the number of steps each needs to reduce the error by a factor of $10^6$.
::: solution
Momentum: $(10 - 1)/(10 + 1) = 9/11\approx0.818$; gradient descent: $99/101\approx0.980$. Steps: $\ln10^{-6}/\ln(9/11) = 68.8$, so $69$ steps, against $\ln10^{-6}/\ln(99/101) = 690.8$, so $691$ steps — a tenfold saving, the factor $\sqrt\kappa$.
:::
:::

::: exercise Two AdamW steps {level=3 check="0.798519"}
Repeat [[#ex-adamw]] carefully to six decimal places and give $\theta_2$. Then explain what would change in the first step if bias correction were omitted.
::: solution
Following the example: $\theta_1 = 1 - 0.1(2/2 + 0.01) = 0.899$; $g_2 = 1.798$, $\hat m_2 = 0.3598/0.19 = 1.893684$, $\hat v_2 = 0.0072288/0.001999 = 3.616210$, $\sqrt{\hat v_2} = 1.901634$, ratio $0.995818$; update $0.1(0.995818 + 0.00899) = 0.100481$; $\theta_2 = 0.798519$. Without bias correction, the first step would use $m_1/\sqrt{v_1} = 0.2/\sqrt{0.004} = 3.162$ instead of $1$, a step of $0.317$ instead of $0.101$ — the factor $(1 - \beta_1)/\sqrt{1 - \beta_2}$ of [[math-for-ml/optimisation#ex-adam]].
:::
:::

::: exercise How big is Adam's first step? {level=3 check="0.05"}
A layer has $N = 10^6$ weights initialised with standard deviation $0.02$. Adam's first step with $\eta = 10^{-3}$ moves every weight with a nonzero gradient by $\pm\eta$ ([[#prop-adam]]). Estimate the norm of the update relative to the norm of the weights, and explain how this motivates warm-up.
::: solution
The update has $N$ coordinates of size $10^{-3}$, norm $\sqrt N\cdot10^{-3} = 1$. The weights have norm about $\sqrt N\cdot0.02 = 20$. The relative size is $1/20 = 0.05$: the very first step changes the layer by $5\%$, in directions chosen from a single noisy batch, whatever the gradient's size. Sign-like steps from poorly estimated moments are a plausible reason why Adam benefits from a small learning rate at first; warm-up keeps the early relative updates small until $\hat{\mathbf{v}}$ is estimated from many batches.
:::
:::

::: exercise Factored second moments {level=3}
Adafactor approximates the matrix $V\in\R^{m\times n}$ of second moments of a weight matrix by the rank-one matrix $\hat V = \mathbf{r}\mathbf{c}^\top/(\mathbf{1}^\top\mathbf{r})$, where $\mathbf{r} = V\mathbf{1}$ holds the row sums and $\mathbf{c} = V^\top\mathbf{1}$ the column sums. Show that $\hat V$ has the same row and column sums as $V$, that it equals $V$ when $V$ is itself rank one with positive entries, and compute the memory saving for a $4{,}096\times4{,}096$ matrix.
::: solution
Let $S = \mathbf{1}^\top\mathbf{r} = \mathbf{1}^\top V\mathbf{1}$, the total sum. Row sums of $\hat V$: $\hat V\mathbf{1} = \mathbf{r}(\mathbf{c}^\top\mathbf{1})/S = \mathbf{r}\,S/S = \mathbf{r}$, since $\mathbf{c}^\top\mathbf{1} = S$ too; column sums likewise give $\mathbf{c}$. If $V = \mathbf{a}\mathbf{b}^\top$ with positive entries, then $\mathbf{r} = \mathbf{a}(\mathbf{b}^\top\mathbf{1})$, $\mathbf{c} = \mathbf{b}(\mathbf{a}^\top\mathbf{1})$ and $S = (\mathbf{a}^\top\mathbf{1})(\mathbf{b}^\top\mathbf{1})$, so $\hat V = \mathbf{a}\mathbf{b}^\top = V$. Memory: $V$ has $4{,}096^2 = 16{,}777{,}216$ entries; $\mathbf{r}$ and $\mathbf{c}$ have $8{,}192$ together, a factor of $2{,}048$ fewer. (Shazeer and Stern derive this choice as the minimiser of a generalised KL divergence between $V$ and rank-one approximations.)
:::
:::
