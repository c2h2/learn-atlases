RLHF with PPO optimises a KL-regularised reward in three stages and with four models ([[post-training/rlhf]]). Rafailov et al. (2023) observed that this objective has an exact solution, and that the solution can be turned around: instead of learning a reward and then searching for the policy that maximises it, one can write the reward *in terms of* the policy and fit the policy to the preference data directly. The result, **direct preference optimisation** (DPO), is a classification-style loss on pairs of responses, needs no reward model and no sampling during training, and became within a year one of the most widely used post-training methods.

This chapter proves the closed form of the optimal KL-regularised policy, derives the DPO loss from it, and analyses its gradient and its implicit reward. A small experiment shows DPO recovering the optimal policy from preference probabilities — and over-fitting when each pair is labelled once, the failure that motivated **IPO**. It then surveys the main relatives, labelled as variants with their stated motivations: IPO, KTO, ORPO and SimPO. Finally it returns to reinforcement learning with **GRPO**, which drops PPO's value model by comparing samples within a group, and to RL from **verifiable rewards**, as described in published reports.

## The optimal policy of the KL-regularised objective {#sec-optimal}

Recall the objective of [[post-training/rl-for-language-models#def-kl-objective]]: for each prompt $\mathbf{x}$, maximise

$$
\E_{\mathbf{y}\sim\pi(\cdot\mid\mathbf{x})}\big[r(\mathbf{x}, \mathbf{y})\big] - \beta\,D_{\mathrm{KL}}\big(\pi(\cdot\mid\mathbf{x})\,\Vert\,\pi_{\text{ref}}(\cdot\mid\mathbf{x})\big)
$$ {#eq-objective}

over all distributions $\pi(\cdot\mid\mathbf{x})$ on responses, with $\beta > 0$.

::: theorem The optimal KL-regularised policy {#thm-optimal-policy}
Let the reward be bounded on the support of $\pi_{\text{ref}}(\cdot\mid\mathbf{x})$. The unique maximiser of [[#eq-objective]] is

$$
\pi^\star(\mathbf{y}\mid\mathbf{x}) = \frac{1}{Z(\mathbf{x})}\,\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})\exp\Big(\frac{r(\mathbf{x}, \mathbf{y})}{\beta}\Big),\qquad Z(\mathbf{x}) = \sum_{\mathbf{y}}\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})\exp\Big(\frac{r(\mathbf{x}, \mathbf{y})}{\beta}\Big),
$$ {#eq-optimal}

and the maximum value is $\beta\log Z(\mathbf{x})$.
:::

::: proof
Fix $\mathbf{x}$ and drop it from the notation. $Z$ is finite and positive because $r$ is bounded, so $\pi^\star$ is a probability distribution, and by its definition $r(\mathbf{y}) = \beta\log\frac{\pi^\star(\mathbf{y})}{\pi_{\text{ref}}(\mathbf{y})} + \beta\log Z$. Substituting into the objective for any $\pi$ (with $\pi\ll\pi_{\text{ref}}$; otherwise the divergence is infinite),

$$
\begin{aligned}
\E_\pi[r] - \beta D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}}) &= \E_\pi\Big[\beta\log\frac{\pi^\star(\mathbf{y})}{\pi_{\text{ref}}(\mathbf{y})} + \beta\log Z - \beta\log\frac{\pi(\mathbf{y})}{\pi_{\text{ref}}(\mathbf{y})}\Big]\\
&= \beta\log Z - \beta\,\E_\pi\Big[\log\frac{\pi(\mathbf{y})}{\pi^\star(\mathbf{y})}\Big] = \beta\log Z - \beta\,D_{\mathrm{KL}}(\pi\Vert\pi^\star).
\end{aligned}
$$

By Gibbs' inequality ([[math-for-ml/information-theory#thm-gibbs]]) the divergence is non-negative and zero only at $\pi = \pi^\star$, which is therefore the unique maximiser, with value $\beta\log Z$. This is the variational characterisation of the softmax ([[math-for-ml/optimisation#prop-softmax-variational]]) with the uniform distribution replaced by $\pi_{\text{ref}}$.
:::

The optimal policy **tilts** the reference by the exponentiated reward, and $\beta$ is a temperature: as $\beta\to\infty$, $\pi^\star\to\pi_{\text{ref}}$; as $\beta\to0$, $\pi^\star$ concentrates on the highest-reward responses within the support of $\pi_{\text{ref}}$. A response the reference never produces stays impossible at every $\beta$ — the reverse KL forbids putting mass where the reference has none. In the toy experiment of [[post-training/rlhf#sec-toy]], PPO-style training converged to exactly this policy.

::: widget plot
f: exp(-x^2/2)/sqrt(2*pi); exp(-(x - 1/b)^2/2)/sqrt(2*pi)
x: -4, 8
y: 0, 0.45
sliders: b=1:0.2:4:0.05
labels: reference $\pi_{\mathrm{ref}} = \mathcal{N}(0, 1)$; optimum $\pi^\star$ for $r(y) = y$
caption: The tilt of [[#thm-optimal-policy]] for a continuous toy problem: a standard normal reference and the linear reward $r(y) = y$. Then $\pi^\star(y)\propto e^{-y^2/2}e^{y/\beta}\propto e^{-(y - 1/\beta)^2/2}$, a normal distribution shifted by $1/\beta$ (slider $b = \beta$): the expected reward is $1/\beta$ and the divergence $1/(2\beta^2)$. Halving $\beta$ doubles the reward gain and quadruples the divergence.
:::

::: example How far does the optimum move? {#ex-tilt-sizes}
For the Gaussian problem of the figure ($\pi_{\text{ref}} = \Normal(0, 1)$, $r(y) = y$), compute the expected reward gain and the divergence of $\pi^\star$ for $\beta = 2$, $1$ and $0.5$, and check the marginal rate $d\,\E[r]/d\,D_{\mathrm{KL}} = \beta$ of [[post-training/rlhf#prop-frontier]].
::: solution
$\pi^\star = \Normal(1/\beta, 1)$, so $\E[r] = 1/\beta$ and $D_{\mathrm{KL}} = 1/(2\beta^2)$: $(0.5, 0.125)$, $(1, 0.5)$ and $(2, 2)$ for the three values. Writing $\E[r] = \sqrt{2D_{\mathrm{KL}}}$, the derivative is $1/\sqrt{2D_{\mathrm{KL}}} = \beta$, as the proposition requires. Reward grows like the square root of the divergence — the same $\sqrt{\mathrm{KL}}$ axis on which over-optimisation was measured ([[post-training/reward-models#prop-gao]]).
:::
:::

## From the optimal policy to DPO {#sec-dpo}

Solving [[#eq-optimal]] for the reward gives

$$
r(\mathbf{x}, \mathbf{y}) = \beta\log\frac{\pi^\star(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})} + \beta\log Z(\mathbf{x}).
$$ {#eq-reparam}

This expresses the reward through the policy that is optimal for it. The partition function $Z(\mathbf{x})$ is a sum over all responses and cannot be computed — but it depends only on the prompt, and the Bradley–Terry model depends only on reward *differences* between responses to the same prompt ([[post-training/reward-models#prop-shift]]).

::: proposition Preferences in terms of the optimal policy {#prop-dpo-pref}
If preferences follow the Bradley–Terry model with reward $r$, and $\pi^\star$ is the optimal policy [[#eq-optimal]] for $r$, then

$$
P(\mathbf{y}_w\succ\mathbf{y}_l\mid\mathbf{x}) = \sigma\Big(\beta\log\frac{\pi^\star(\mathbf{y}_w\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_w\mid\mathbf{x})} - \beta\log\frac{\pi^\star(\mathbf{y}_l\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_l\mid\mathbf{x})}\Big).
$$
:::

::: proof
Substitute [[#eq-reparam]] for both responses into $\sigma(r(\mathbf{x}, \mathbf{y}_w) - r(\mathbf{x}, \mathbf{y}_l))$ ([[post-training/reward-models#eq-bt]]); the two terms $\beta\log Z(\mathbf{x})$ cancel.
:::

The preference probability is now a function of a policy alone. Fitting it to data by maximum likelihood, with a parametrised policy $\pi_\theta$ in place of $\pi^\star$, is DPO.

::: definition Direct preference optimisation (Rafailov et al., 2023) {#def-dpo}
For a preference dataset $\mathcal{D}$ of triples $(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)$, a frozen reference policy $\pi_{\text{ref}}$ and $\beta > 0$, define the **implicit reward** $\hat r_\theta(\mathbf{x}, \mathbf{y}) = \beta\log\frac{\pi_\theta(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}$. The **DPO loss** is

$$
\mathcal{L}_{\text{DPO}}(\theta) = -\E_{(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)\sim\mathcal{D}}\Big[\log\sigma\Big(\beta\log\frac{\pi_\theta(\mathbf{y}_w\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_w\mid\mathbf{x})} - \beta\log\frac{\pi_\theta(\mathbf{y}_l\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_l\mid\mathbf{x})}\Big)\Big],
$$ {#eq-dpo}

the Bradley–Terry loss ([[post-training/reward-models#eq-rm-loss]]) with $\hat r_\theta$ as the reward. Each term needs the sequence log-probabilities of the two responses under $\pi_\theta$ and $\pi_{\text{ref}}$: four teacher-forced passes, and those of $\pi_{\text{ref}}$ can be computed once in advance.
:::

The derivation says: if the data follow Bradley–Terry with some reward $r$, and the policy class contains $\pi^\star$, then the maximum-likelihood $\pi_\theta$ under [[#eq-dpo]] is the optimal KL-regularised policy for the maximum-likelihood reward — the same answer RLHF would reach with a perfectly fitted reward model and a perfect optimiser, in one supervised stage. The title of the paper, *Your language model is secretly a reward model*, refers to $\hat r_\theta$: every policy defines a reward for which it is optimal. Nothing is lost by this parametrisation.

::: proposition Every reward class has a policy representative {#prop-representation}
Call two rewards equivalent if they differ by a function of the prompt only; equivalent rewards induce the same preferences and the same optimal policy. Every reward $r$ is equivalent to exactly one reward of the form $\beta\log\frac{\pi(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}$ with $\pi$ a policy whose support is that of $\pi_{\text{ref}}$, namely $\pi = \pi^\star_r$.
:::

::: proof
Existence: by [[#eq-reparam]], $r - \beta\log Z(\mathbf{x}) = \beta\log(\pi^\star_r/\pi_{\text{ref}})$, which differs from $r$ by a function of $\mathbf{x}$. Uniqueness: if $\beta\log(\pi_1/\pi_{\text{ref}})$ and $\beta\log(\pi_2/\pi_{\text{ref}})$ are equivalent, then $\pi_1(\mathbf{y}\mid\mathbf{x}) = c(\mathbf{x})\pi_2(\mathbf{y}\mid\mathbf{x})$ for all $\mathbf{y}$, and summing over $\mathbf{y}$ gives $c(\mathbf{x}) = 1$. Equivalent rewards have the same optimal policy because $e^{c(\mathbf{x})/\beta}$ cancels in the normalisation of [[#eq-optimal]].
:::

### The DPO gradient {#sec-gradient}

::: proposition Gradient of the DPO loss {#prop-dpo-grad}
For one triple, with $\hat\Delta = \hat r_\theta(\mathbf{x}, \mathbf{y}_w) - \hat r_\theta(\mathbf{x}, \mathbf{y}_l)$,

$$
\nabla_\theta\mathcal{L}_{\text{DPO}} = -\beta\,\sigma(-\hat\Delta)\,\Big(\nabla_\theta\log\pi_\theta(\mathbf{y}_w\mid\mathbf{x}) - \nabla_\theta\log\pi_\theta(\mathbf{y}_l\mid\mathbf{x})\Big).
$$ {#eq-dpo-grad}
:::

::: proof
By [[post-training/reward-models#eq-rm-grad]] with $r_\phi$ replaced by $\hat r_\theta$, and $\nabla_\theta\hat r_\theta = \beta\nabla_\theta\log\pi_\theta$, since $\pi_{\text{ref}}$ does not depend on $\theta$.
:::

Gradient descent raises the log-probability of the chosen response and lowers that of the rejected one, weighted by $\sigma(-\hat\Delta)$, the probability that the implicit reward model currently ranks the pair wrongly. Without that weight the update would be "SFT on winners, unlikelihood on losers", which Rafailov et al. reported to degenerate; the weight stops pushing on pairs that are already ranked correctly by a comfortable margin, and the reference ratio in $\hat\Delta$ measures the margin *relative to where the model started*.

::: example A DPO loss by hand {#ex-dpo}
For one pair, the sequence log-probabilities are $\log\pi_\theta(\mathbf{y}_w) = -42.0$, $\log\pi_\theta(\mathbf{y}_l) = -45.0$, $\log\pi_{\text{ref}}(\mathbf{y}_w) = -43.0$ and $\log\pi_{\text{ref}}(\mathbf{y}_l) = -44.0$. With $\beta = 0.1$, compute the implicit rewards, the loss and the gradient weight. What were they at the start of training, when $\pi_\theta = \pi_{\text{ref}}$?
::: solution
$\hat r(\mathbf{y}_w) = 0.1\cdot(-42 + 43) = 0.1$, $\hat r(\mathbf{y}_l) = 0.1\cdot(-45 + 44) = -0.1$, $\hat\Delta = 0.2$. Loss $-\ln\sigma(0.2) = -\ln0.5498 = 0.598$; weight $\sigma(-0.2) = 0.450$. At the start $\hat\Delta = 0$, the loss is $\ln2 = 0.693$ and the weight $0.5$ — every DPO run starts at loss $\ln 2$, a useful sanity check. Note that the chosen response's log-probability is $-42$: absolute log-probabilities are large and negative for long responses, and only the differences from the reference matter.
:::
:::

## DPO in a toy problem {#sec-code}

The listing applies DPO to a "policy" over four responses with a reference $\pi_{\text{ref}} = (0.4, 0.3, 0.2, 0.1)$, true rewards $(0, 1, 0.5, 2)$ and $\beta = 1$, so that by [[#thm-optimal-policy]] the target is $\pi^\star\propto\pi_{\text{ref}}e^{r}$. The policy is a softmax over four logits, trained by gradient descent on the DPO loss over all six pairs. In the first run the data are the population preference probabilities $\sigma(r_i - r_j)$ (equivalently, infinitely many labels per pair); in the second each pair is labelled **once**, by its true winner; the third applies IPO ([[#def-ipo]]) to the same single labels.

```python
import math, random

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
    return [v / s for v in e]

def sig(z):
    return 1 / (1 + math.exp(-z))

ref = [0.4, 0.3, 0.2, 0.1]                  # reference policy over 4 responses
r = [0.0, 1.0, 0.5, 2.0]                    # true (hidden) rewards
beta = 1.0
K = len(ref)
target = softmax([math.log(p) + ri / beta for p, ri in zip(ref, r)])   # pi* ~ ref * exp(r / beta)
pairs = [(i, j) for i in range(K) for j in range(K) if i < j]

def dpo_grad(theta, prefs):
    """Gradient of the DPO loss with respect to the logits theta.
    prefs: list of (i, j, p) meaning 'i preferred to j with probability p'."""
    pi = softmax(theta)
    h = [math.log(pi[k] / ref[k]) for k in range(K)]          # implicit reward / beta
    g = [0.0] * K                                            # d loss / d h
    for i, j, p in prefs:
        m = beta * (h[i] - h[j])
        c = -beta * (p * sig(-m) - (1 - p) * sig(m)) / len(prefs)
        g[i] += c; g[j] -= c
    s = sum(g)                                               # chain rule through log-softmax
    return [g[k] - pi[k] * s for k in range(K)]

def run(prefs, steps, lr, report, loss="dpo", tau=1.0):
    theta = [math.log(p) for p in ref]                       # start at the reference
    for t in range(steps + 1):
        pi = softmax(theta)
        if t in report:
            tv = 0.5 * sum(abs(a - b) for a, b in zip(pi, target))
            kl = max(0.0, sum(a * math.log(a / b) for a, b in zip(pi, ref)))   # clip rounding noise
            print(f"  step {t:5d}  pi = {[round(x, 3) for x in pi]}  TV to pi* {tv:.4f}  KL(pi||ref) {kl:.3f}")
        if loss == "dpo":
            g = dpo_grad(theta, prefs)
        else:                                                # IPO: (h_w - h_l - 1/(2 tau))^2
            h = [math.log(pi[k] / ref[k]) for k in range(K)]
            gh = [0.0] * K
            for i, j, _ in prefs:
                d = 2 * (h[i] - h[j] - 1 / (2 * tau)) / len(prefs)
                gh[i] += d; gh[j] -= d
            s = sum(gh); g = [gh[k] - pi[k] * s for k in range(K)]
        theta = [a - lr * b for a, b in zip(theta, g)]

print("pi* =", [round(x, 3) for x in target])
print("1. DPO on the population preference probabilities sigma(r_i - r_j):")
pop = [(i, j, sig(r[i] - r[j])) for i, j in pairs]
run(pop, 500, 0.5, {0, 10, 50, 500})

print("2. DPO on one deterministic label per pair (the winner under r):")
det = [(i, j, 1.0) if r[i] > r[j] else (j, i, 1.0) for i, j in pairs]
run(det, 20000, 2.0, {0, 1000, 20000})
print("3. IPO (tau = 1) on the same labels:")
run(det, 20000, 0.5, {0, 1000, 20000}, loss="ipo")
```

```text
pi* = [0.175, 0.357, 0.144, 0.323]
1. DPO on the population preference probabilities sigma(r_i - r_j):
  step     0  pi = [0.4, 0.3, 0.2, 0.1]  TV to pi* 0.2805  KL(pi||ref) 0.000
  step    10  pi = [0.282, 0.35, 0.18, 0.187]  TV to pi* 0.1432  KL(pi||ref) 0.055
  step    50  pi = [0.186, 0.36, 0.149, 0.305]  TV to pi* 0.0183  KL(pi||ref) 0.220
  step   500  pi = [0.175, 0.357, 0.144, 0.323]  TV to pi* 0.0000  KL(pi||ref) 0.250
2. DPO on one deterministic label per pair (the winner under r):
  step     0  pi = [0.4, 0.3, 0.2, 0.1]  TV to pi* 0.2805  KL(pi||ref) 0.000
  step  1000  pi = [0.0, 0.013, 0.0, 0.987]  TV to pi* 0.6634  KL(pi||ref) 2.218
  step 20000  pi = [0.0, 0.001, 0.0, 0.999]  TV to pi* 0.6758  KL(pi||ref) 2.296
3. IPO (tau = 1) on the same labels:
  step     0  pi = [0.4, 0.3, 0.2, 0.1]  TV to pi* 0.2805  KL(pi||ref) 0.000
  step  1000  pi = [0.293, 0.363, 0.188, 0.155]  TV to pi* 0.1682  KL(pi||ref) 0.035
  step 20000  pi = [0.293, 0.363, 0.188, 0.155]  TV to pi* 0.1682  KL(pi||ref) 0.035
```

With preference probabilities, DPO converges to $\pi^\star = (0.175, 0.357, 0.144, 0.323)$ exactly, without ever forming a reward model or sampling — the theorem at work. With one label per pair it does not: the labels are deterministic, the Bradley–Terry likelihood keeps increasing as margins grow ([[post-training/reward-models#prop-rm-props]]), and the policy collapses onto the response that wins every comparison, approaching the largest divergence possible here, $\log(1/0.1) = 2.303$ nats. The KL regularisation that $\beta$ was supposed to provide has disappeared. IPO, on the same data, stops at bounded margins.

## DPO in practice {#sec-practice}

DPO is trained like SFT: offline, on a fixed dataset, with a frozen reference (usually the SFT model, whose log-probabilities on the dataset can be cached) and one forward and backward pass per response. Typical values of $\beta$ in published recipes lie between about $0.01$ and $0.5$. It was quickly adopted for open models: Zephyr (Tunstall et al., 2023) applied it to preferences labelled by a model ([[post-training/ai-feedback]]), Llama 3 (Llama Team, 2024) used several rounds of rejection sampling, SFT and DPO, and Tülu 3 (Lambert et al., 2024) used SFT followed by DPO and then RL on verifiable rewards. Several difficulties have been documented.

- **Over-fitting to deterministic preferences.** The listing above shows the mechanism; Azar et al. (2024) analysed it and proposed IPO.
- **Both likelihoods fall.** In practice the log-probabilities of *both* chosen and rejected responses often decrease during DPO training, the rejected faster; probability mass moves to responses outside the dataset, sometimes worse ones. Pal et al. (2024) and Razin et al. (2025, "likelihood displacement") studied this and proposed corrections, such as adding a term that keeps the chosen response's likelihood from falling below the reference.
- **Off-policy data.** The derivation assumes nothing about where $\mathbf{y}_w, \mathbf{y}_l$ come from, but the loss only constrains the policy on those responses. If they were sampled from a different model, the policy's behaviour on its own typical outputs is weakly constrained. **Online** or **iterative** DPO — regenerate responses from the current policy, label them (often with a reward model or judge), and repeat — addresses this and has been reported to help (for example Xiong et al., 2024; Guo et al., 2024).
- **Length.** Preference data that favour longer answers are exploited by DPO as by RLHF; Park et al. (2024) proposed a length-regularised variant.

Whether DPO matches PPO-based RLHF is contested. Xu et al. (2024) and Ivison et al. (2024) found well-tuned PPO ahead in their experiments, by margins that depended on the task, while also finding that the quality of the preference data mattered more than the choice of algorithm. DPO's large practical advantage is simplicity and cost.

::: warning DPO is not "RLHF without the RL" in every respect
DPO and RLHF share an optimum only under idealised assumptions: preferences exactly Bradley–Terry, a policy class containing $\pi^\star$, and enough data on the relevant responses. In practice they differ in what data they see. RLHF trains on samples from the current policy, scored by a reward model that generalises to new responses; DPO trains on a fixed set of responses and generalises only through the network's inductive biases. A low DPO loss means the policy ranks the dataset's pairs correctly, not that its own generations are good, and a high reward-model accuracy for the implicit reward $\hat r_\theta$ is not evidence of a good policy.
:::

## Variants {#sec-variants}

Many objectives have been proposed in the same mould. Four of the most cited are summarised here, with the motivation their authors gave. They are alternatives, not a progression, and published comparisons among them depend strongly on hyperparameters and data.

### IPO {#sec-ipo}

Azar et al. (2024) wrote a general family of preference objectives, $\Psi$PO, of which RLHF and DPO are the case $\Psi(p) = \log\frac{p}{1-p}$, and argued that this choice is what makes DPO over-fit: when a pair is always preferred one way, $\Psi(1) = \infty$ and the KL term cannot hold the policy back. Choosing $\Psi$ to be the identity gives **identity preference optimisation**.

::: definition IPO loss (Azar et al., 2024) {#def-ipo}
With $h_\theta(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l) = \log\frac{\pi_\theta(\mathbf{y}_w\mid\mathbf{x})\,\pi_{\text{ref}}(\mathbf{y}_l\mid\mathbf{x})}{\pi_\theta(\mathbf{y}_l\mid\mathbf{x})\,\pi_{\text{ref}}(\mathbf{y}_w\mid\mathbf{x})}$ and a regularisation parameter $\tau > 0$,

$$
\mathcal{L}_{\text{IPO}}(\theta) = \E_{(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)\sim\mathcal{D}}\Big[\Big(h_\theta(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l) - \frac{1}{2\tau}\Big)^2\Big].
$$
:::

::: proposition Why DPO diverges and IPO does not {#prop-ipo}
For a single pair labelled $\mathbf{y}_w\succ\mathbf{y}_l$ with probability one, the DPO loss $-\log\sigma(\beta h)$ is strictly decreasing in $h$ with infimum $0$ approached only as $h\to\infty$, so gradient descent increases $h$ without bound. The IPO loss $(h - 1/(2\tau))^2$ is minimised at the finite margin $h = 1/(2\tau)$. If the pair is preferred with probability $p$ (labels in both directions), the expected IPO loss is minimised at $h = (2p - 1)/(2\tau)$, which is bounded for every $p$; the DPO minimiser $\beta h = \log\frac{p}{1-p}$ is infinite at $p\in\{0, 1\}$.
:::

::: proof
$\frac{d}{dh}[-\log\sigma(\beta h)] = -\beta\sigma(-\beta h) < 0$ for all $h$, and $-\log\sigma(\beta h)\to0$ only as $h\to\infty$. For IPO with labels in both directions, the expected loss is $p(h - c)^2 + (1-p)(-h - c)^2$ with $c = 1/(2\tau)$ (a reversed label flips the sign of $h$); its derivative $2p(h - c) + 2(1-p)(h + c)$ vanishes at $h = (2p - 1)c$. The DPO case is [[post-training/reward-models#prop-rm-props]] with reward difference $\beta h$.
:::

IPO regresses the log-ratio margin to a target instead of maximising a likelihood. Its regularisation is effective even with deterministic labels, at the cost of a target margin that does not depend on how strongly a pair is preferred unless the data contain both orders.

### KTO {#sec-kto}

Paired preferences are not always available; often one has only thumbs-up and thumbs-down judgements of single responses. **Kahneman–Tversky optimisation** (Ethayarajh et al., 2024) works with such unpaired labels. Motivated by prospect theory's value function, it compares each response's implicit reward $\hat r_\theta = \beta\log\frac{\pi_\theta(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}$ with a reference point $z_0$, an estimate of $\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\text{ref}})$ computed from other responses in the batch and not differentiated through:

$$
\mathcal{L}_{\text{KTO}} = \E_{(\mathbf{x}, \mathbf{y})}\Big[\lambda_y - v(\mathbf{x}, \mathbf{y})\Big],\qquad v = \begin{cases}\lambda_D\,\sigma(\hat r_\theta - z_0) & \mathbf{y}\text{ desirable},\\ \lambda_U\,\sigma(z_0 - \hat r_\theta) & \mathbf{y}\text{ undesirable},\end{cases}
$$

with weights $\lambda_D, \lambda_U$ that can correct for imbalance between the numbers of desirable and undesirable examples ($\lambda_y$ is the weight of the example's own class). The authors reported performance comparable to DPO in their experiments, from weaker data.

### ORPO and SimPO {#sec-reference-free}

Both remove the reference model, saving its memory and forward passes.

- **ORPO** (Hong et al., 2024, odds-ratio preference optimisation) merges SFT and preference learning into one stage. With the length-normalised likelihood $P_\theta(\mathbf{y}\mid\mathbf{x}) = \exp\big(\frac1{|\mathbf{y}|}\log\pi_\theta(\mathbf{y}\mid\mathbf{x})\big)$ and its odds $\operatorname{odds}_\theta = P_\theta/(1 - P_\theta)$, it minimises $\mathcal{L}_{\text{SFT}}(\mathbf{y}_w) - \lambda\log\sigma\big(\log\frac{\operatorname{odds}_\theta(\mathbf{y}_w\mid\mathbf{x})}{\operatorname{odds}_\theta(\mathbf{y}_l\mid\mathbf{x})}\big)$: imitate the chosen response while making its odds exceed the rejected one's.
- **SimPO** (Meng et al., 2024) uses the length-normalised log-probability as the implicit reward and requires a margin $\gamma$: $\mathcal{L}_{\text{SimPO}} = -\log\sigma\big(\frac{\beta}{|\mathbf{y}_w|}\log\pi_\theta(\mathbf{y}_w\mid\mathbf{x}) - \frac{\beta}{|\mathbf{y}_l|}\log\pi_\theta(\mathbf{y}_l\mid\mathbf{x}) - \gamma\big)$. Length normalisation matches the reward to how generation actually scores sequences and removes DPO's incentive to favour long responses; dropping the reference removes the explicit KL anchor, so regularisation comes only from the learning rate and the number of steps.

| method | data | reference model | implicit reward | regularisation |
|---|---|---|---|---|
| DPO | pairs | yes | $\beta\log(\pi_\theta/\pi_{\text{ref}})$ | KL (implicit), weak for deterministic labels |
| IPO | pairs | yes | log-ratio margin $h$ | squared loss to margin $1/(2\tau)$ |
| KTO | single responses, good or bad | yes | $\beta\log(\pi_\theta/\pi_{\text{ref}})$ vs reference point | KL reference point |
| ORPO | pairs | no | log odds of normalised likelihood | SFT term |
| SimPO | pairs | no | $\frac\beta{|\mathbf{y}|}\log\pi_\theta$ | margin $\gamma$, early stopping |

::: example A SimPO margin {#ex-simpo}
A chosen response of $100$ tokens has $\log\pi_\theta = -50$, and a rejected response of $40$ tokens has $\log\pi_\theta = -30$. Compare the DPO-style unnormalised difference $\log\pi_\theta(\mathbf{y}_w) - \log\pi_\theta(\mathbf{y}_l)$ with SimPO's normalised one, for $\beta = 2$ and $\gamma = 0.5$, and compute the SimPO loss.
::: solution
Unnormalised: $-50 - (-30) = -20$: the long chosen response looks much *less* likely, purely because it is longer. Normalised: $-50/100 = -0.5$ per token against $-30/40 = -0.75$, so the chosen response is more likely per token. SimPO's argument is $2\cdot(-0.5) - 2\cdot(-0.75) - 0.5 = -1 + 1.5 - 0.5 = 0$, and the loss is $-\ln\sigma(0) = \ln2 = 0.693$: the pair is exactly at the required margin's boundary. (DPO avoids the raw length effect differently, by subtracting the reference's log-probabilities of the same responses.)
:::
:::

## Group-relative policy optimisation {#sec-grpo}

DPO removes RL; GRPO keeps RL but removes its most expensive component. Introduced with DeepSeekMath (Shao et al., 2024), it replaces PPO's learned value model with a baseline computed from a **group** of samples for the same prompt.

::: definition GRPO (Shao et al., 2024) {#def-grpo}
For each prompt $\mathbf{x}$, sample a group of $G$ responses $\mathbf{y}_1, \dots, \mathbf{y}_G$ from $\pi_{\text{old}}$ and score them, $R_1, \dots, R_G$. With outcome rewards, every token of response $i$ gets the **group-normalised advantage**

$$
\hat A_i = \frac{R_i - \operatorname{mean}(R_1, \dots, R_G)}{\operatorname{std}(R_1, \dots, R_G)}.
$$

The policy maximises the PPO clipped objective ([[post-training/rl-for-language-models#def-ppo]]) averaged over the tokens of each response and over the group, minus a KL penalty added directly to the loss rather than to the reward:

$$
\mathcal{J}_{\text{GRPO}}(\theta) = \E\Big[\frac1G\sum_{i=1}^{G}\frac{1}{|\mathbf{y}_i|}\sum_{t=1}^{|\mathbf{y}_i|}\Big(\min\big(\rho_{i,t}\hat A_i,\ \operatorname{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon)\hat A_i\big) - \beta\,\hat D_{i,t}\Big)\Big],
$$

where $\rho_{i,t} = \pi_\theta(y_{i,t}\mid\cdot)/\pi_{\text{old}}(y_{i,t}\mid\cdot)$ and $\hat D_{i,t} = u - \log u - 1$ with $u = \pi_{\text{ref}}(y_{i,t}\mid\cdot)/\pi_\theta(y_{i,t}\mid\cdot)$ is the non-negative "k3" estimate of the per-token KL ([[post-training/rl-for-language-models#sec-kl]]).
:::

The group mean is a sampled baseline, which keeps the gradient direction unbiased ([[post-training/rl-for-language-models#prop-rloo]]); dividing by the group standard deviation rescales each prompt's advantages to unit size. GRPO needs no value model, which saves memory and avoids the difficulty of learning values for long reasoning traces with a single terminal reward. Shao et al. reported that it improved their $7$-billion-parameter instruction-tuned maths model on GSM8K and MATH. Later analyses pointed out that two normalisations bias the objective: dividing by $|\mathbf{y}_i|$ makes each token of a long wrong answer count less, which favours longer incorrect responses, and dividing by the standard deviation up-weights prompts that are almost always or almost never solved (Liu et al., 2025, who proposed removing both); other modifications, such as asymmetric clipping and dropping groups with no reward variance, were proposed in DAPO (Yu et al., 2025).

::: example Group advantages {#ex-grpo}
A prompt's group of $G = 4$ responses receives verified rewards $1, 0, 0, 1$ (correct or not). Compute the GRPO advantages with the population standard deviation. What happens if all four responses are wrong?
::: solution
Mean $0.5$, standard deviation $\sqrt{\frac14\sum(R_i - 0.5)^2} = 0.5$. Advantages $(1 - 0.5)/0.5 = 1$ for the correct responses and $-1$ for the wrong ones: correct reasoning is reinforced token by token, wrong reasoning discouraged. If all four are wrong, every $R_i - \text{mean} = 0$ and the standard deviation is $0$; implementations add a small constant to the denominator, so all advantages are $0$ and the prompt contributes only through the KL term. Prompts that are always or never solved carry no learning signal, which is why curricula and filtering of prompts by difficulty matter for this kind of training.
:::
:::

### Reinforcement learning from verifiable rewards {#sec-rlvr}

When correctness can be checked by a program — a maths answer compared with a reference, code run against tests, an instruction's format verified — the reward model can be replaced by the checker. Lambert et al. (2024, Tülu 3) named this **reinforcement learning with verifiable rewards** (RLVR) and used it as a final post-training stage for maths and precise instruction following. A verifier cannot be flattered or exploited in the ways a learned reward model can, although it can still be gamed if it is incomplete (tests that do not cover the specification, answer checkers that accept malformed output).

The DeepSeek-R1 report (DeepSeek-AI, 2025) described training **DeepSeek-R1-Zero** by applying GRPO directly to a pretrained base model with only rule-based rewards: an accuracy reward for a correct final answer or passing tests, and a format reward for putting the reasoning between designated tags. The authors chose not to use a neural reward model, citing reward hacking. They reported that the model's average response length grew steadily during training as it learned to produce long chains of reasoning, including re-checking its own steps, and that its pass@1 accuracy on the AIME 2024 mathematics competition rose from $15.6\%$ to $71.0\%$. Because R1-Zero's outputs had problems of readability and language mixing, the released DeepSeek-R1 added supervised "cold-start" data, further RL, rejection-sampling SFT and a final RL stage covering general tasks. These are reported results for particular models; how such training changes a model's reasoning, and how far it transfers beyond checkable domains, is studied in [[reasoning/verifiable-rewards]] and [[reasoning/test-time-scaling]].

::: quiz
Which statements about DPO are correct?
- [x] At the start of training, when $\pi_\theta = \pi_{\text{ref}}$, the loss on every pair is $\ln2$.
- [x] The partition function $Z(\mathbf{x})$ cancels because both responses in a pair share the same prompt.
- [ ] DPO samples responses from the current policy at every step.
- [ ] With one deterministic label per pair, the KL regularisation keeps the DPO policy close to $\pi^\star$.
::: solution
At initialisation both implicit rewards are $0$, so the loss is $-\log\sigma(0) = \ln2$. $Z(\mathbf{x})$ depends only on the prompt and cancels in the reward difference ([[#prop-dpo-pref]]). DPO is offline: it never samples unless run in an iterative variant. With deterministic labels the likelihood keeps growing with the margin and the policy drifts far from $\pi^\star$ ([[#prop-ipo]] and the listing).
:::
:::

::: history
The closed form [[#eq-optimal]] for KL-regularised optimisation is classical: it is the Gibbs variational principle of statistical mechanics, and appears in RL as the solution of entropy- and KL-regularised control (Todorov, 2007; Kappen et al., 2012; relative-entropy policy search, Peters et al., 2010) and in reward-weighted regression (Peters and Schaal, 2007). Korbak, Perez and Buckley (2022) noted that KL-regularised RLHF is equivalent to Bayesian inference with the reference as prior. Rafailov et al. (NeurIPS 2023) turned the closed form into a training objective, DPO. In 2024 came IPO (Azar et al., AISTATS), KTO (Ethayarajh et al., ICML), ORPO (Hong et al.) and SimPO (Meng et al., NeurIPS), together with studies of DPO's failure modes and comparisons with PPO. On the RL side, Shao et al. (2024) introduced GRPO with DeepSeekMath, Lambert et al. (2024) named RLVR in Tülu 3, and DeepSeek-AI (2025) described DeepSeek-R1, trained with GRPO on rule-based rewards; the report was later published in *Nature* (2025).
:::

::: summary
- The KL-regularised objective $\E_\pi[r] - \beta D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$ is maximised by the **tilted reference** $\pi^\star\propto\pi_{\text{ref}}e^{r/\beta}$, with value $\beta\log Z$ ([[#thm-optimal-policy]]).
- Inverting it, $r = \beta\log(\pi^\star/\pi_{\text{ref}}) + \beta\log Z(\mathbf{x})$; in the Bradley–Terry model $Z$ cancels, and maximum likelihood over policies is the **DPO loss** $-\log\sigma(\beta\log\frac{\pi_\theta(\mathbf{y}_w)}{\pi_{\text{ref}}(\mathbf{y}_w)} - \beta\log\frac{\pi_\theta(\mathbf{y}_l)}{\pi_{\text{ref}}(\mathbf{y}_l)})$, one supervised stage with no reward model or sampling.
- The DPO gradient raises the chosen and lowers the rejected log-probability, weighted by the implicit reward model's error probability; every policy is optimal for its own implicit reward.
- With preference probabilities DPO recovers $\pi^\star$; with deterministic labels margins grow without bound and the KL anchor is lost. In practice both likelihoods often fall, off-policy data weakly constrain the policy, and online variants help.
- **Variants**: IPO (squared loss to a target margin), KTO (unpaired good/bad labels), ORPO and SimPO (reference-free, length-normalised). None is uniformly best.
- **GRPO** replaces PPO's value model with group-normalised rewards and a direct KL term; with **verifiable rewards** it trained the reported DeepSeek-R1-Zero, whose reasoning traces lengthened and AIME accuracy rose during RL.
:::

## Exercises

::: exercise A tilted distribution {level=1 check="0.7311"}
A prompt has two responses with $\pi_{\text{ref}} = (0.5, 0.5)$ and rewards $r = (0, 1)$. With $\beta = 1$, what probability does the optimal policy [[#eq-optimal]] give the second response? Give four decimal places.
::: solution
$\pi^\star_2 = 0.5e^1/(0.5 + 0.5e) = e/(1 + e) = \sigma(1) = 0.7311$.
:::
:::

::: exercise The starting loss {level=1 check="0.6931"}
What is the DPO loss of any pair at initialisation, $\pi_\theta = \pi_{\text{ref}}$, to four decimal places? What would it mean if your training run's first logged loss were $0.31$?
::: solution
$-\ln\sigma(0) = \ln2 = 0.6931$. A first loss far from $\ln2$ means $\pi_\theta\ne\pi_{\text{ref}}$ at the start — for example the policy and reference were loaded from different checkpoints, or the reference log-probabilities were computed with a different template or with dropout active.
:::
:::

::: exercise Implicit rewards {level=1 check="0.2"}
With $\beta = 0.05$, a response's log-probability rose during DPO training from $-120$ under the reference to $-116$ under the policy. What is its implicit reward?
::: solution
$\hat r = 0.05\cdot(-116 + 120) = 0.2$.
:::
:::

::: exercise The value of the optimum {level=2 check="0.3228"}
For the three-response problem of [[post-training/rlhf#ex-tilt]] ($\pi_{\text{ref}} = (0.5, 0.3, 0.2)$, $r = (0, 1, 2)$, $\beta = 1$), compute $\beta\log Z$, and check [[#thm-optimal-policy]] by computing $\E_{\pi^\star}[r] - \beta D_{\mathrm{KL}}(\pi^\star\Vert\pi_{\text{ref}})$. Then give the divergence $D_{\mathrm{KL}}(\pi^\star\Vert\pi_{\text{ref}})$ to four decimal places.
::: solution
$Z = 0.5 + 0.3e + 0.2e^2 = 2.7933$, $\beta\log Z = 1.0272$. From the RLHF example, $\E_{\pi^\star}[r] = 1.3501$ and $D_{\mathrm{KL}} = 0.3228$, so $1.3501 - 0.3228 = 1.0273\approx1.0272$ (rounding). The divergence is $0.3228$ nats.
:::
:::

::: exercise A DPO gradient weight {level=2 check="0.2689"}
During training, a pair has implicit rewards $\hat r(\mathbf{y}_w) = 0.6$ and $\hat r(\mathbf{y}_l) = -0.4$. What is the gradient weight $\sigma(-\hat\Delta)$ of [[#eq-dpo-grad]], to four decimal places? By what factor is the update smaller than at initialisation?
::: solution
$\hat\Delta = 1.0$, $\sigma(-1) = 0.2689$; at initialisation the weight is $0.5$, so the update is $0.538$ times as large. Pairs ranked correctly with a margin get less weight, those ranked wrongly more.
:::
:::

::: exercise IPO with mixed labels {level=2 check="0.3"}
A pair is labelled in both directions, with $\mathbf{y}_1$ preferred in $80\%$ of the labels. With $\tau = 1$, what log-ratio margin $h$ does IPO converge to, by [[#prop-ipo]]? What reward gap $\beta h$ would DPO converge to with population labels?
::: solution
$h = (2p - 1)/(2\tau) = 0.6/2 = 0.3$. DPO: $\beta h = \log(0.8/0.2) = \ln4 = 1.386$. IPO's target is linear in $p$ and bounded; DPO's is the log-odds, unbounded as $p\to1$.
:::
:::

::: exercise GRPO advantages {level=2 check="1.7321"}
A group of $G = 4$ responses receives rewards $1, 0, 0, 0$. Compute the GRPO advantages with the population standard deviation, and give the advantage of the correct response to four decimal places. Compare with the leave-one-out advantages $R_i - \frac{1}{G-1}\sum_{j\ne i}R_j$.
::: solution
Mean $0.25$; variance $\frac14(0.75^2 + 3\cdot0.25^2) = \frac14(0.5625 + 0.1875) = 0.1875$, standard deviation $0.4330$. Advantages: $0.75/0.433 = 1.7321$ for the correct response and $-0.25/0.433 = -0.5774$ for the others. Leave-one-out: $1 - 0 = 1$ and $0 - \frac13 = -0.333$ — proportional to the mean-subtracted values by $\frac{G}{G-1} = \frac43$ ($0.75\cdot\frac43 = 1$), as in [[post-training/rl-for-language-models#prop-rloo]], but without the division by the standard deviation, which makes rare successes on hard prompts count for more in GRPO.
:::
:::

::: exercise Deriving DPO for rankings {level=3}
The Plackett–Luce model gives the probability of a ranking $\mathbf{y}_{(1)}\succ\mathbf{y}_{(2)}\succ\dots\succ\mathbf{y}_{(K)}$ of $K$ responses as $\prod_{k=1}^{K}\frac{\exp r(\mathbf{x}, \mathbf{y}_{(k)})}{\sum_{j\ge k}\exp r(\mathbf{x}, \mathbf{y}_{(j)})}$. Substitute the reparametrisation [[#eq-reparam]] and show that $Z(\mathbf{x})$ cancels, giving a DPO loss for rankings. What does it reduce to for $K = 2$?
::: solution
With $r = \hat r + \beta\log Z(\mathbf{x})$, $\hat r = \beta\log(\pi/\pi_{\text{ref}})$, every exponential gains the same factor $Z(\mathbf{x})$, which cancels between numerator and denominator of each factor:

$$
P(\text{ranking}) = \prod_{k=1}^{K}\frac{\exp\hat r(\mathbf{x}, \mathbf{y}_{(k)})}{\sum_{j\ge k}\exp\hat r(\mathbf{x}, \mathbf{y}_{(j)})}.
$$

The loss is its negative logarithm, $-\sum_k\big[\hat r_\theta(\mathbf{y}_{(k)}) - \log\sum_{j\ge k}e^{\hat r_\theta(\mathbf{y}_{(j)})}\big]$, a sum of softmax cross-entropies: at each stage the next-ranked response must win against all remaining ones. For $K = 2$ the last factor is $1$ and the first is $e^{\hat r_1}/(e^{\hat r_1} + e^{\hat r_2}) = \sigma(\hat r_1 - \hat r_2)$, recovering [[#eq-dpo]]. Rafailov et al. give this extension in their appendix.
:::
:::

::: exercise The Gaussian tilt {level=3}
Let $\pi_{\text{ref}} = \Normal(0, 1)$ on $\R$ and $r(y) = ay - \frac c2y^2$ with $c\ge0$. Using [[#thm-optimal-policy]] (with densities in place of probabilities), find $\pi^\star$, its expected reward under $r$, and $D_{\mathrm{KL}}(\pi^\star\Vert\pi_{\text{ref}})$. Show that for $c = 0$ the divergence is $a^2/(2\beta^2)$, and explain what a positive $c$ — a reward that penalises extreme responses — does to the trade-off.
::: solution
$\pi^\star(y)\propto\exp(-\frac{y^2}{2} + \frac{ay}{\beta} - \frac{cy^2}{2\beta}) = \exp\big(-\frac{1 + c/\beta}{2}y^2 + \frac a\beta y\big)$, a normal distribution with precision $s = 1 + c/\beta$ and mean $\mu = \frac{a/\beta}{s} = \frac{a}{\beta + c}$, variance $1/s$. Expected reward: $a\mu - \frac c2(\mu^2 + 1/s)$. Divergence between normals: $D_{\mathrm{KL}}(\Normal(\mu, 1/s)\Vert\Normal(0, 1)) = \frac12\big(\frac1s + \mu^2 - 1 + \log s\big)$. For $c = 0$, $s = 1$, $\mu = a/\beta$ and the divergence is $\frac12\mu^2 = a^2/(2\beta^2)$, as in the figure. A positive $c$ shrinks both the shift, to $a/(\beta + c)$, and the variance: the optimum no longer moves arbitrarily far as $\beta\to0$, but converges to the reward's maximiser $y = a/c$ with vanishing variance — the divergence then grows only through the narrowing, like $\frac12\log(c/\beta)$. A bounded reward gives a bounded incentive to move; an unbounded one, such as a linear reward, rewards ever more extreme outputs, which is the continuous analogue of reward hacking.
:::
:::
