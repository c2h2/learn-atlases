The two previous chapters built the parts: a policy-gradient optimiser with a KL penalty ([[post-training/rl-for-language-models]]) and a reward model learned from comparisons ([[post-training/reward-models]]). **Reinforcement learning from human feedback** (RLHF) puts them together. A supervised model is used to collect comparisons, a reward model is fitted to them, and the policy is optimised against the reward model with PPO while a KL penalty holds it near the supervised model. This recipe, described in detail for InstructGPT in 2022, produced the first widely used chat assistants and remains the reference point for every method in the rest of the course.

This chapter traces the recipe from its origins in robotics to language, states the InstructGPT objective exactly, and walks through one iteration of PPO-based RLHF with its four models, their memory cost and the bookkeeping of rollouts, rewards and advantages. It proves the basic trade-off of KL-regularised optimisation — reward and divergence both rise as the penalty weakens — and shows reward hacking appearing in a toy policy. It then turns to what RLHF does to a model, intended and unintended, and to the simpler alternatives that often replace PPO.

## Origins {#sec-origins}

**Deep RL from human preferences** (Christiano et al., 2017) trained agents in simulated robotics and Atari games without a hand-written reward. Humans watched pairs of short video clips of the agent's behaviour and said which was better; a reward model was fitted to these comparisons with the Bradley–Terry loss; and the agent was trained with RL against the reward model, while new clips were continually sent for comparison. The paper reported, for example, teaching a simulated robot to perform a backflip from about $900$ comparisons collected in under an hour — a behaviour for which writing a reward function is awkward. The three ingredients that define RLHF are all here: comparisons, a learned reward model, and RL against it with ongoing data collection.

**Ziegler et al. (2019)** applied the method to a pretrained language model (GPT-2) for stylistic continuation and summarisation, and introduced the KL penalty to the pretrained model as part of the reward. Their summarisation models also showed an early case of optimising what labellers *reward* rather than what they *want*: the policies learned to copy whole sentences from the article, which labellers rated as accurate. **Stiennon et al. (2020)** scaled this to summarising Reddit posts with models of up to $6.7$ billion parameters, with careful attention to labeller quality, and found that summaries from the RLHF policies were preferred by humans to the human-written reference summaries in the dataset — and that optimising too hard against the reward model, with a small KL coefficient, made summaries worse in human judgement even as the reward rose.

## The InstructGPT pipeline {#sec-instructgpt}

**InstructGPT** (Ouyang et al., 2022) applied RLHF to GPT-3 for general instruction following, using prompts submitted by users of an API plus prompts written by about $40$ contracted labellers.

::: algorithm The three-stage RLHF pipeline (InstructGPT) {#alg-pipeline}
1. **Supervised fine-tuning.** Labellers write demonstrations of the desired behaviour for a set of prompts (about $13{,}000$ training prompts). Fine-tune the pretrained model on them with the SFT loss ([[post-training/instruction-tuning#def-sft]]), giving $\pi^{\text{SFT}}$.
2. **Reward modelling.** For a new set of prompts (about $33{,}000$), sample several responses from the models available, have labellers rank them, and train a reward model $r_\phi$ on all pairwise comparisons ([[post-training/reward-models#eq-rm-loss]]), initialised from a supervised model ($6$ billion parameters).
3. **Reinforcement learning.** Initialise the policy $\pi_\theta$ and the value model from $\pi^{\text{SFT}}$ and $r_\phi$ respectively, and optimise the policy with PPO on a further set of prompts (about $31{,}000$) to maximise the objective [[#eq-instructgpt]].

Stages 2 and 3 can be repeated: comparisons of the new policy's outputs train a better reward model, which is used for further RL.
:::

::: example How many comparisons? {#ex-comparisons}
InstructGPT's reward-model data covered about $33{,}000$ prompts, each with between $4$ and $9$ ranked responses. Between what bounds does the number of pairwise comparisons lie, and how many responses and comparisons would there be if every prompt had $6$ responses?
::: solution
A ranking of $K$ responses gives $\binom K2$ comparisons: $\binom42 = 6$ to $\binom92 = 36$. So the data hold between $33{,}000\cdot6 = 198{,}000$ and $33{,}000\cdot36 = 1{,}188{,}000$ comparisons. With $6$ responses per prompt, labellers would rank $198{,}000$ responses, giving $\binom62 = 15$ comparisons per prompt and $495{,}000$ in all. Rankings are an efficient way to collect comparisons, though the comparisons from one ranking are not independent — which is why they were trained on together ([[post-training/reward-models#sec-architecture]]).
:::
:::

::: definition The InstructGPT objective {#def-instructgpt}
The RL stage maximises

$$
\mathcal{J}(\theta) = \E_{\mathbf{x}\sim\mathcal{D}_{\text{RL}},\ \mathbf{y}\sim\pi_\theta(\cdot\mid\mathbf{x})}\Big[r_\phi(\mathbf{x}, \mathbf{y}) - \beta\log\frac{\pi_\theta(\mathbf{y}\mid\mathbf{x})}{\pi^{\text{SFT}}(\mathbf{y}\mid\mathbf{x})}\Big] + \gamma\,\E_{\mathbf{x}\sim\mathcal{D}_{\text{pretrain}}}\big[\log\pi_\theta(\mathbf{x})\big].
$$ {#eq-instructgpt}

The first term is the KL-regularised reward of [[post-training/rl-for-language-models#def-kl-objective]] with the SFT model as reference. The second, with $\gamma > 0$ (the "PPO-ptx" variant), mixes in the ordinary language-modelling likelihood of pretraining data; with $\gamma = 0$ the method is plain PPO.
:::

The pretraining term addresses the **alignment tax**: RLHF with PPO alone degraded performance on several public NLP benchmarks relative to GPT-3 (question answering, reading comprehension and translation datasets among them), and mixing in pretraining gradients reduced these regressions without hurting labeller preferences. The headline result was that labellers preferred outputs of the $1.3$-billion-parameter InstructGPT model to those of the $175$-billion-parameter GPT-3, despite the hundredfold difference in size, and preferred the $175$-billion InstructGPT to GPT-3 in about $85\%$ of comparisons. The paper also measured modest improvements in truthfulness on TruthfulQA and reductions in toxic output when asked to be respectful, but no improvement on bias benchmarks — and noted that the model followed instructions even when they were harmful, a limitation addressed by later work ([[post-training/ai-feedback]]).

Anthropic's **helpful and harmless assistant** (Bai et al., 2022a) described a parallel pipeline with separate data for helpfulness and harmlessness, found that the two goals pull against each other, collected comparisons **online** from successive policies with weekly updates of the reward model, and reported that larger models paid a smaller alignment tax on benchmarks. It also reported an empirical regularity: the policy's reward was roughly linear in $\sqrt{D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})}$ over much of training, the same axis later used by Gao et al. ([[post-training/reward-models#prop-gao]]).

## The reward–divergence trade-off {#sec-tradeoff}

The KL coefficient $\beta$ decides how hard the reward model is optimised. Its effect can be made exact for the optimum of the regularised objective, which (as [[post-training/preference-optimisation#thm-optimal-policy]] proves) is the **tilted** reference policy $\pi_\beta(\mathbf{y}\mid\mathbf{x})\propto\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})\,e^{r(\mathbf{x}, \mathbf{y})/\beta}$.

::: proposition Weaker penalties buy reward with divergence {#prop-frontier}
Fix a prompt, write $\lambda = 1/\beta$, and let $\pi_\lambda(\mathbf{y})\propto\pi_{\text{ref}}(\mathbf{y})e^{\lambda r(\mathbf{y})}$, with normaliser $Z(\lambda) = \E_{\pi_{\text{ref}}}[e^{\lambda r}]$. Assume the reward is bounded. Then

$$
\frac{d}{d\lambda}\E_{\pi_\lambda}[r] = \Var_{\pi_\lambda}(r)\ \ge 0,\qquad \frac{d}{d\lambda}D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}}) = \lambda\Var_{\pi_\lambda}(r)\ \ge 0,
$$

so as $\beta$ decreases both the expected reward and the divergence increase, and along this curve the marginal rate is $\frac{d\,\E[r]}{d\,D_{\mathrm{KL}}} = \frac1\lambda = \beta$.
:::

::: proof
$\log Z(\lambda)$ is the cumulant-generating function of $r$ under $\pi_{\text{ref}}$. Differentiating under the (finite or dominated) sum, $\frac{d}{d\lambda}\log Z = \E_{\pi_{\text{ref}}}[re^{\lambda r}]/Z = \E_{\pi_\lambda}[r]$, and differentiating again, $\frac{d^2}{d\lambda^2}\log Z = \E_{\pi_\lambda}[r^2] - \E_{\pi_\lambda}[r]^2 = \Var_{\pi_\lambda}(r)$. For the divergence, $\log\frac{\pi_\lambda}{\pi_{\text{ref}}} = \lambda r - \log Z$, so $D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}}) = \lambda\E_{\pi_\lambda}[r] - \log Z(\lambda)$; its derivative is $\E_{\pi_\lambda}[r] + \lambda\Var_{\pi_\lambda}(r) - \E_{\pi_\lambda}[r] = \lambda\Var_{\pi_\lambda}(r)$. Dividing the two derivatives gives the rate.
:::

::: example A tilted policy by hand {#ex-tilt}
A prompt has three responses with reference probabilities $(0.5, 0.3, 0.2)$ and rewards $(0, 1, 2)$. Compute the optimum $\pi_\beta$ for $\beta = 1$, its expected reward and its divergence from the reference.
::: solution
Unnormalised weights $\pi_{\text{ref}}e^{r/\beta}$: $0.5$, $0.3e = 0.8155$, $0.2e^2 = 1.4778$, with sum $Z = 2.7933$. So $\pi_1 = (0.179, 0.292, 0.529)$, and $\E[r] = 0.292 + 2\cdot0.529 = 1.350$, up from $0.7$ under the reference. The divergence is $\lambda\E[r] - \log Z = 1.350 - 1.027 = 0.323$ nats (the proof of [[#prop-frontier]]), which agrees with computing $\sum_i\pi_i\log(\pi_i/\pi_{\text{ref},i})$ directly. The policy has gained $0.65$ in reward for $0.32$ nats.
:::
:::

So $\beta$ is literally the price of divergence: at the optimum, one more nat of KL buys $\beta$ more units of reward. Nothing in the proposition concerns the *true* quality of responses, which is where over-optimisation enters: the reward in the proposition is the proxy, and the proxy's expected value rises monotonically while the gold value need not.

### Reward hacking in a toy policy {#sec-toy}

The listing makes this concrete with a "policy" over eight candidate responses to one prompt. The proxy reward model agrees with the gold reward on seven of them but greatly overrates the eighth — think of a long, flattering answer that labellers would dislike on reflection. The reference policy gives it only $1\%$. The policy is trained by REINFORCE with a leave-one-out baseline ([[post-training/rl-for-language-models#prop-rloo]]) on the shaped reward $r_\phi - \beta\log(\pi/\pi_{\text{ref}})$, for several values of $\beta$, and compared with the exact optimum $\pi_\beta$.

```python
import math, random

# Eight candidate responses to one prompt. Response 7 is a "hack": the proxy reward model
# loves it (say, a long flattering answer), but its true (gold) quality is poor.
ref   = [0.30, 0.20, 0.15, 0.12, 0.10, 0.07, 0.05, 0.01]   # reference (SFT) policy
gold  = [0.0, 0.5, 1.0, 0.2, 1.5, 0.8, 2.0, -0.5]
proxy = [0.0, 0.5, 1.0, 0.2, 1.5, 0.8, 2.0, 3.0]
K = len(ref)

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
    return [v / s for v in e]

def kl(p, q):
    return sum(pi * math.log(pi / qi) for pi, qi in zip(p, q) if pi > 0)

def train(beta, steps=3000, batch=16, lr=0.1, seed=0):
    """REINFORCE with a leave-one-out baseline on the shaped reward proxy - beta*log(pi/ref)."""
    rng = random.Random(seed)
    theta = [math.log(p) for p in ref]                       # start at the reference policy
    for _ in range(steps):
        pi = softmax(theta)
        ys = rng.choices(range(K), weights=pi, k=batch)
        R = [proxy[y] - beta * math.log(pi[y] / ref[y]) for y in ys]   # shaped rewards
        tot = sum(R)
        g = [0.0] * K
        for y, r in zip(ys, R):
            adv = r - (tot - r) / (batch - 1)                 # leave-one-out baseline
            for j in range(K):
                g[j] += adv * ((1.0 if j == y else 0.0) - pi[j]) / batch
        theta = [t + lr * gj for t, gj in zip(theta, g)]
    return softmax(theta)

print(" beta   E[proxy]  E[gold]   KL     P(hack)")
for beta in (2.0, 1.0, 0.5, 0.25, 0.1, 0.03):
    pi = train(beta)
    print(f"{beta:5.2f}   {sum(p * r for p, r in zip(pi, proxy)):7.3f}  {sum(p * r for p, r in zip(pi, gold)):7.3f}"
          f"  {kl(pi, ref):6.3f}   {pi[7]:.3f}")
p0 = ref
print(f"  ref   {sum(p * r for p, r in zip(p0, proxy)):7.3f}  {sum(p * r for p, r in zip(p0, gold)):7.3f}   0.000   {p0[7]:.3f}")

# exact optimum pi* ~ ref * exp(proxy / beta), for comparison (derived in the DPO chapter)
print("exact optimum:")
for beta in (2.0, 1.0, 0.5, 0.25, 0.1, 0.03):
    pi = softmax([math.log(p) + r / beta for p, r in zip(ref, proxy)])
    print(f"{beta:5.2f}   {sum(p * r for p, r in zip(pi, proxy)):7.3f}  {sum(p * r for p, r in zip(pi, gold)):7.3f}"
          f"  {kl(pi, ref):6.3f}   {pi[7]:.3f}")
```

```text
 beta   E[proxy]  E[gold]   KL     P(hack)
 2.00     0.844    0.734   0.062   0.031
 1.00     1.162    0.864   0.304   0.085
 0.50     1.979    0.724   1.537   0.359
 0.25     2.861   -0.258   3.942   0.891
 0.10     1.987    1.982   2.866   0.001
 0.03     1.996    1.994   2.951   0.000
  ref     0.610    0.575   0.000   0.010
exact optimum:
 2.00     0.844    0.734   0.062   0.031
 1.00     1.162    0.864   0.304   0.085
 0.50     1.979    0.724   1.538   0.359
 0.25     2.871   -0.243   3.974   0.890
 0.10     3.000   -0.499   4.603   1.000
 0.03     3.000   -0.500   4.605   1.000
```

For $\beta\ge0.25$ training reaches the exact optimum, and the pattern of [[post-training/reward-models#sec-overoptimisation]] is plain: as $\beta$ falls, the proxy reward and the KL rise together ([[#prop-frontier]]), the gold reward peaks near $\beta = 1$ and then collapses as probability flows to the hack. At $\beta = 0.1$ and $0.03$, something different happens: the sampled optimiser does *not* find the hack. With a weak penalty the policy quickly concentrates on response $6$, the best honest answer; response $7$, with reference probability $0.01$, stops being sampled before its high reward is discovered, and the run settles in a local optimum (it did so for all ten seeds tried). This is luck, not safety. In a real language model, hacks are rarely single rare responses: they are directions such as "longer" or "more agreeable" along which the reward rises smoothly from wherever the policy is, and an optimiser follows them.

::: widget plot
f: (0.1*exp(0.5*x) + 0.15*exp(x) + 0.024*exp(0.2*x) + 0.15*exp(1.5*x) + 0.056*exp(0.8*x) + 0.1*exp(2*x) + 0.03*exp(3*x))/(0.3 + 0.2*exp(0.5*x) + 0.15*exp(x) + 0.12*exp(0.2*x) + 0.1*exp(1.5*x) + 0.07*exp(0.8*x) + 0.05*exp(2*x) + 0.01*exp(3*x)); (0.1*exp(0.5*x) + 0.15*exp(x) + 0.024*exp(0.2*x) + 0.15*exp(1.5*x) + 0.056*exp(0.8*x) + 0.1*exp(2*x) - 0.005*exp(3*x))/(0.3 + 0.2*exp(0.5*x) + 0.15*exp(x) + 0.12*exp(0.2*x) + 0.1*exp(1.5*x) + 0.07*exp(0.8*x) + 0.05*exp(2*x) + 0.01*exp(3*x))
x: 0, 12
y: -0.7, 3.2
labels: proxy reward $\mathbb{E}_{\pi_\beta}[r_\phi]$; gold reward $\mathbb{E}_{\pi_\beta}[r^\star]$
vlines: 1
caption: Expected proxy and gold reward of the exact optimum $\pi_\beta\propto\pi_{\text{ref}}e^{r_\phi/\beta}$ for the toy problem of the listing, against $\lambda = 1/\beta$. The proxy rises monotonically, as [[#prop-frontier]] requires; the gold reward peaks at $\lambda\approx1.3$ ($\beta\approx0.75$) and then falls below the reference policy's $0.575$ as the hack takes over. The vertical line marks $\beta = 1$.
:::

## One iteration of PPO-based RLHF {#sec-ppo-loop}

In practice the RL stage runs PPO ([[post-training/rl-for-language-models#def-ppo]]) on the token MDP, with the KL penalty folded into the per-token rewards.

::: algorithm PPO for RLHF {#alg-ppo-rlhf}
Models: the **policy** $\pi_\theta$ (trained), the **value model** $V_\psi$ (trained), the **reference** $\pi_{\text{ref}}$ (frozen) and the **reward model** $r_\phi$ (frozen). Repeat:
1. **Rollout.** Sample a batch of prompts and generate one response per prompt with the current policy, recording the log-probability $\log\pi_{\text{old}}(y_t\mid s_{t-1})$ of every generated token and the value estimates $V_\psi(s_t)$.
2. **Score.** Compute $R = r_\phi(\mathbf{x}, \mathbf{y})$ once per response, and the reference log-probabilities of every token with one teacher-forced pass of $\pi_{\text{ref}}$.
3. **Shape.** Set per-token rewards $r_t = -\beta\big(\log\pi_{\text{old}}(y_{t+1}\mid s_t) - \log\pi_{\text{ref}}(y_{t+1}\mid s_t)\big)$, and add $R$ at the final token ([[post-training/rl-for-language-models#prop-kl-tokens]]).
4. **Advantages.** Compute GAE advantages $\hat A_t$ and returns $\hat A_t + V_\psi(s_t)$ ([[post-training/rl-for-language-models#def-gae]]), usually with $\gamma = 1$; normalise the advantages over the batch (subtract the mean, divide by the standard deviation).
5. **Update.** For a few epochs over mini-batches of the rollouts, recompute $\log\pi_\theta$ and $V_\psi$ with teacher forcing, and take gradient steps on the PPO clipped loss for the policy and a (often clipped) squared-error loss for the value model.
6. Optionally adjust $\beta$ (below) and add a pretraining-likelihood term, as in [[#eq-instructgpt]].
:::

The value model is typically initialised from the reward model, since both map a prefix to a scalar about the eventual reward. The rollout phase is **autoregressive generation** and dominates wall-clock time in many implementations, while the update phase is ordinary teacher-forced training. Systems for RLHF therefore combine an inference engine for generation ([[inference/batching-serving]]) with a training framework, and must move updated policy weights from one to the other every iteration.

::: example Memory for four models {#ex-memory}
A team runs PPO with a $7$-billion-parameter policy, a $7$-billion-parameter value model, and frozen $7$-billion-parameter reference and reward models. With mixed-precision Adam, a trained model needs about $16$ bytes per parameter (bf16 weights and gradients, fp32 master weights and two Adam moments); a frozen model in bf16 needs $2$. Estimate the memory for model states alone, excluding activations and the generation cache.
::: solution
Trained: $2 + 2 + 4 + 4 + 4 = 16$ bytes per parameter ([[neural-networks/training-practice#ex-memory]]), so policy and value model need $2\cdot7\times10^9\cdot16 = 224$ GB. Frozen: $2\cdot7\times10^9\cdot2 = 28$ GB. Total $252$ GB — more than three $80$ GB accelerators before any activation memory, for what is a small model by current standards. This cost is a large part of the appeal of methods that drop the value model (GRPO, RLOO) or the reward model and online sampling altogether (DPO; [[post-training/preference-optimisation]]), and of sharing one network with two heads, or using parameter-efficient adapters on one frozen base ([[post-training/parameter-efficient-tuning]]).
:::
:::

### Choosing and adapting the KL coefficient {#sec-beta}

A fixed $\beta$ gives an unpredictable divergence: early in training the policy moves fast, later slowly. Ziegler et al. (2019) proposed an **adaptive controller** that steers the measured KL towards a target.

::: definition Adaptive KL controller {#def-adaptive-kl}
Given a target divergence $\mathrm{KL}_{\text{target}}$ and a gain $K_\beta$ (Ziegler et al. used $0.1$), after each iteration with measured divergence $\mathrm{KL}_t$, set

$$
e_t = \operatorname{clip}\Big(\frac{\mathrm{KL}_t - \mathrm{KL}_{\text{target}}}{\mathrm{KL}_{\text{target}}}, -0.2, 0.2\Big),\qquad \beta_{t+1} = \beta_t\,(1 + K_\beta\,e_t).
$$
:::

It is a proportional controller on the logarithm of $\beta$: too much divergence raises the penalty, too little lowers it, by at most $2\%$ per step with these settings. Whether fixed or adaptive, $\beta$ is chosen by looking beyond the reward: held-out human or model judgements, behaviour on capability benchmarks, and the over-optimisation signs of the previous chapter.

::: example One controller step {#ex-controller}
The current coefficient is $\beta = 0.05$, the target divergence $6$ nats and the measured divergence $7.5$ nats. With $K_\beta = 0.1$, what is the next $\beta$? What if the measured divergence were $20$ nats?
::: solution
$e = (7.5 - 6)/6 = 0.25$, clipped to $0.2$, so $\beta = 0.05\cdot(1 + 0.1\cdot0.2) = 0.051$. At $20$ nats the error $2.33$ is also clipped to $0.2$, giving the same $0.051$: the controller reacts slowly by design, and a sudden jump in divergence must be handled by other means, such as early stopping of the PPO epochs.
:::
:::

### Practical difficulties {#sec-practice}

PPO-based RLHF has a reputation for being hard to get right, and published implementation studies (for example Zheng et al., 2023, and Huang et al., 2024, who reproduced the summarisation results of Stiennon et al. in detail) list many details that matter:

- **Reward and advantage normalisation.** Reward-model outputs have an arbitrary offset per prompt ([[post-training/reward-models#prop-shift]]) and drift as the reward model is updated; implementations whiten rewards or advantages and clip extreme values.
- **Value-model quality.** A poor critic gives biased advantages; a value model initialised from the reward model and warmed up before policy updates helps.
- **Generation settings.** The policy must be sampled at temperature $1$ with no top-$p$ truncation if the log-probabilities used in the importance ratios and KL penalties are to match the distribution that produced the tokens ([[inference/decoding-sampling]]).
- **Termination.** Responses cut off at the length limit have no end-of-turn token; whether and how they are rewarded (some implementations give them a fixed penalty) changes the incentive to be concise.
- **Numerical mismatch.** The inference engine and the training framework may compute slightly different log-probabilities for the same tokens, so that the "old" policy's ratios are not exactly $1$ at the start of an update.

None of these is deep, but together they explain why results from different implementations of "the same" algorithm can differ widely.

## What RLHF changes in a model {#sec-effects}

RLHF is applied to change behaviour, and it does: in the published comparisons of the period, RLHF-trained assistants were strongly preferred by human raters to the supervised models they started from. Other effects are less intended, and several have been measured.

- **Length.** Responses tend to get longer, because reward models favour length ([[post-training/reward-models#sec-overoptimisation]]).
- **Diversity.** Kirk et al. (2024) found that RLHF improved generalisation to new inputs compared with SFT but substantially reduced the diversity of outputs, both across samples for the same prompt and across prompts — consistent with the mode-seeking character of the reverse-KL objective ([[post-training/rl-for-language-models#sec-kl]]).
- **Calibration.** A pretrained model's next-token probabilities are often well calibrated; the GPT-4 technical report (OpenAI, 2023) showed that the post-trained model's confidence on multiple-choice questions was much less calibrated than the pretrained model's. A policy optimised for reward is no longer trying to model a distribution.
- **Sycophancy.** Perez et al. (2022) found that RLHF-trained models were more likely to repeat back a user's stated views, and Sharma et al. (2024) traced sycophancy in part to human preference data that reward agreement ([[safety-alignment/reward-hacking]]).
- **Refusals and over-refusals.** Training for harmlessness can make a model refuse benign requests that resemble harmful ones; Bai et al. (2022a) documented the tension between helpfulness and harmlessness that later methods tried to resolve ([[post-training/ai-feedback]]).

::: warning RLHF does not add knowledge, and it can hide what is missing
A common misreading is that RLHF "makes the model smarter". The objective rewards responses that *labellers prefer*, judged on the spot, which correlates with but is not the same as correctness. RLHF mostly reshapes which of the behaviours the pretrained model can already produce are expressed — and if labellers cannot tell a confident wrong answer from a right one, RLHF can make wrong answers more confident and more persuasive. Improvements in capability, where they occur, need a signal that tracks correctness, such as verified rewards ([[post-training/preference-optimisation#sec-rlvr]]).
:::

::: quiz
Which components of PPO-based RLHF are updated by gradient descent during the RL stage?
- [x] The policy
- [x] The value model
- [ ] The reference model
- [ ] The reward model
::: solution
The policy and the value model are trained. The reference model is frozen by definition — it is the anchor of the KL penalty — and the reward model is frozen during an RL run (it may be retrained between runs on new comparisons). Training the reward model on the policy's own reward signal would be circular.
:::
:::

## Simpler alternatives to PPO {#sec-alternatives}

Because PPO is costly and delicate, many pipelines use simpler optimisers for some or all of the RL stage.

- **Best-of-$n$ sampling** at inference time: draw $n$ responses and return the one the reward model prefers. No training at all; the cost is $n$ generations per query, and the KL from the policy is at most $\log n - (n-1)/n$ ([[post-training/reward-models#thm-bon-kl]]).
- **Rejection-sampling fine-tuning.** Sample several responses per prompt, keep the best by reward (or those above a threshold), and fine-tune on them with the SFT loss; repeat. This is REINFORCE with binary weights ([[post-training/rl-for-language-models#alg-reinforce]]) and is also called **expert iteration** (Anthony et al., 2017) or, in variants, RAFT (Dong et al., 2023) and ReST (Gulcehre et al., 2023). Llama 2 (Touvron et al., 2023) used several rounds of rejection-sampling fine-tuning before applying PPO.
- **REINFORCE with sampled baselines.** Ahmadian et al. (2024) argued that PPO's machinery is unnecessary for RLHF, because a pretrained policy starts in a good region and the problem is closer to a bandit than to long-horizon control, and reported that REINFORCE with a leave-one-out baseline (RLOO, [[post-training/rl-for-language-models#prop-rloo]]) matched or exceeded PPO in their experiments while dropping the value model.
- **Group-relative methods** such as GRPO, which normalise rewards within a group of samples for the same prompt and drop the value model ([[post-training/preference-optimisation#sec-grpo]]).
- **Direct preference optimisation**, which removes the reward model and the sampling loop entirely by solving the KL-regularised problem in closed form ([[post-training/preference-optimisation]]).

Which works best is an empirical question with no settled answer as of 2026: comparisons depend heavily on tuning, data and evaluation, and results in different papers point in different directions.

::: history
Learning from human evaluative feedback has a long history in RL, from TAMER (Knox and Stone, 2009) to preference-based RL (Akrour et al., 2011; Wirth et al., 2017). Christiano et al. (NeurIPS 2017) combined comparisons, a learned reward model and deep RL; Ibarz et al. (2018) added demonstrations. Ziegler et al. (2019) brought the method to pretrained language models with a KL penalty and an adaptive controller, and Stiennon et al. (NeurIPS 2020) showed for summarisation that RLHF policies could beat human reference summaries and could be over-optimised. Askell et al. (2021) at Anthropic framed the goal of a helpful, honest and harmless assistant, and Bai et al. (2022a) trained one with online RLHF. InstructGPT (Ouyang et al., NeurIPS 2022) established the three-stage pipeline for general instruction following, and its methods underlay the chat assistants released from late 2022. Llama 2 (Touvron et al., 2023) documented RLHF at scale for an open-weight model, with separate helpfulness and safety reward models and rejection sampling. From 2023, DPO, RLOO and GRPO offered cheaper alternatives to PPO, and from 2024 RL on verifiable rewards became central to training reasoning models.
:::

::: summary
- **RLHF** = supervised fine-tuning, a **reward model** trained on human comparisons, and **RL** (classically PPO) against the reward model with a **KL penalty** to the SFT model; it descends from Christiano et al. (2017), Ziegler et al. (2019) and Stiennon et al. (2020), and was established for assistants by **InstructGPT** (2022).
- InstructGPT's objective adds a pretraining-likelihood term (**PPO-ptx**) to reduce the **alignment tax**; labellers preferred the $1.3$B InstructGPT to the $175$B GPT-3.
- At the regularised optimum, reward and KL both increase as $\beta$ falls, with marginal rate $d\,\E[r]/d\,\mathrm{KL} = \beta$ ([[#prop-frontier]]); the **gold** reward eventually falls — reward hacking — which a toy policy reproduces.
- PPO-based RLHF needs four models (policy, value, reference, reward), per-token KL shaping, GAE and many implementation details; model states alone take about $16$ bytes per trained parameter.
- RLHF lengthens responses, reduces output diversity, can degrade calibration and increase sycophancy, and shapes refusals; it reshapes behaviour more than it adds knowledge.
- Simpler optimisers — best-of-$n$, rejection-sampling fine-tuning, RLOO, GRPO and DPO — are widely used; which is best is an open empirical question.
:::

## Exercises

::: exercise Shaped rewards {level=1 check="1.4"}
A response of three tokens has policy log-probabilities $-0.5$, $-1.0$, $-0.2$ and reference log-probabilities $-1.5$, $-2.0$, $-0.2$. The reward model gives $R = 1.6$, and $\beta = 0.1$. What is the total shaped return $R - \beta\sum_t\log(\pi/\pi_{\text{ref}})$?
::: solution
Log-ratios $1.0$, $1.0$, $0$, summing to $2.0$; penalty $0.1\cdot2.0 = 0.2$; return $1.6 - 0.2 = 1.4$.
:::
:::

::: exercise The adaptive controller {level=1 check="0.098"}
With $\beta = 0.1$, $K_\beta = 0.1$, a target of $8$ nats and a measured divergence of $4$ nats, what is the next value of $\beta$ under [[#def-adaptive-kl]]?
::: solution
$e = (4 - 8)/8 = -0.5$, clipped to $-0.2$; $\beta = 0.1\cdot(1 - 0.02) = 0.098$.
:::
:::

::: exercise Memory with a shared base {level=1 check="140"}
Redo [[#ex-memory]] for a single $7$-billion-parameter policy trained with full Adam, with the value function as an extra scalar head on the policy (negligible parameters), and the reference and reward models frozen in bf16. How many gigabytes do the model states need?
::: solution
Policy (with value head): $7\times10^9\cdot16 = 112$ GB; reference and reward models: $2\cdot14 = 28$ GB; total $140$ GB. Sharing the network saves $112$ GB but couples the policy and value losses, which some implementations found less stable.
:::
:::

::: exercise The frontier for two responses {level=2 check="0.7311"}
A prompt has two responses with rewards $0$ and $1$, and $\pi_{\text{ref}} = (0.5, 0.5)$. For the tilted policy $\pi_\lambda$ of [[#prop-frontier]], compute $\E_{\pi_\lambda}[r]$ at $\lambda = 1$ (four decimal places) and $\Var_{\pi_\lambda}(r)$, and check the derivative formula numerically with $\lambda = 1.01$.
::: solution
$\pi_\lambda = (1, e^\lambda)/(1 + e^\lambda)$, so $\E[r] = \sigma(\lambda)$: at $\lambda = 1$, $0.7311$. The variance of a Bernoulli is $\sigma(1)(1 - \sigma(1)) = 0.1966$. At $\lambda = 1.01$, $\sigma(1.01) = 0.7330$, and $(0.7330 - 0.7311)/0.01 = 0.197$, matching the variance.
:::
:::

::: exercise The price of divergence {level=2}
Using [[#prop-frontier]], explain why a practitioner who fixes $\beta = 0.05$ is implicitly saying "I will accept one more nat of KL from the reference for every $0.05$ units of reward". Why does this rate say nothing about whether the extra reward is real?
::: solution
At the optimum of the regularised objective the marginal reward per nat of divergence is exactly $\beta$; any policy with more divergence would gain less than $\beta$ per extra nat, and the objective $\E[r] - \beta\,\mathrm{KL}$ would fall. So $\beta$ is the exchange rate between proxy reward and divergence. The rate concerns the *proxy* reward; whether its increase reflects real improvement depends on where the proxy is accurate, which is not visible in the proxy itself. Over-optimisation is precisely the region where proxy reward keeps increasing at rate $\beta$ while gold reward falls.
:::
:::

::: exercise Why initialise the value model from the reward model? {level=2}
Explain why the value model in PPO-based RLHF is usually initialised from the reward model rather than from the SFT model, and what goes wrong if the value model is badly initialised and the advantages are computed with GAE at $\lambda = 0.95$.
::: solution
With a terminal reward and $\gamma = 1$, the true value of a prefix is the expected final reward of its completions. The reward model already maps complete responses to that reward and has learned which features of text it depends on, so its predictions at prefixes are a reasonable starting estimate; an SFT model with a fresh scalar head starts with arbitrary values. GAE with $\lambda = 0.95$ forms advantages from TD errors $r_t + V(s_{t+1}) - V(s_t)$; a badly initialised critic produces large, systematically wrong TD errors at every token, which the near-$1$ $\lambda$ only partly averages out ([[post-training/rl-for-language-models#prop-gae-limits]]), so early policy updates follow noise. Implementations often train the value model alone for some steps before updating the policy.
:::
:::

::: exercise Rejection sampling as REINFORCE {level=2}
Show that one round of rejection-sampling fine-tuning — sample $k$ responses per prompt from $\pi_\theta$, keep those with reward above a threshold $\tau$, and take a gradient step on their SFT loss — is a REINFORCE step with a particular reward. Which reward, and which baseline? What is lost compared with REINFORCE on the original reward?
::: solution
The SFT gradient on the kept responses is $\sum_{i:R_i > \tau}\nabla\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x}) = \sum_i\mathbb{1}[R_i > \tau]\,\nabla\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x})$, the REINFORCE estimator ([[post-training/rl-for-language-models#alg-reinforce]]) with binary reward $\tilde R = \mathbb{1}[R > \tau]$ and baseline $0$. What is lost: the magnitude of the reward (a response just above the threshold counts as much as an excellent one); any negative signal (rejected responses are not pushed down, unlike with a baseline); and the KL penalty, unless the number of rounds and the learning rate are kept small. It is also off-policy after the first step if many steps are taken on the same samples.
:::
:::

::: exercise Proving the frontier for a general reward {level=3}
Prove that the curve traced by $(D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}}), \E_{\pi_\lambda}[r])$ as $\lambda$ goes from $0$ to $\infty$ is concave: that is, the marginal reward per nat, $\beta = 1/\lambda$, decreases along it. Then show that no policy $\pi$ achieves a higher expected reward than $\pi_\lambda$ with the same or smaller divergence.
::: solution
By [[#prop-frontier]], the slope of the curve is $d\,\E[r]/d\,\mathrm{KL} = 1/\lambda$, and $\mathrm{KL}$ is non-decreasing in $\lambda$; so as one moves along the curve ($\lambda$ increasing) the slope $1/\lambda$ decreases, which is concavity. For the second claim, $\pi_\lambda$ maximises $\E_\pi[r] - \frac1\lambda D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$ over all $\pi$ ([[post-training/preference-optimisation#thm-optimal-policy]] with $\beta = 1/\lambda$). If some $\pi$ had $D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})\le D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}})$ and $\E_\pi[r] > \E_{\pi_\lambda}[r]$, then $\E_\pi[r] - \frac1\lambda D_{\mathrm{KL}}(\pi) > \E_{\pi_\lambda}[r] - \frac1\lambda D_{\mathrm{KL}}(\pi_\lambda)$, contradicting optimality. So the tilted policies trace the **efficient frontier** of reward against divergence, and every value of $\beta$ picks one point on it.
:::
:::

::: exercise Reproducing the toy experiment {level=3}
Modify the listing of [[#sec-toy]] so that the policy starts from logits $\log\pi_{\text{ref}}$ plus an entropy bonus: add $\eta\,H(\pi_\theta)$ to the objective, with $\eta = 0.05$, implemented by adding $-\eta\log\pi(y)$ to each sampled response's shaped reward. Predict, before running it, whether the runs at $\beta = 0.1$ will now find the hack, and explain what this says about the relation between exploration and reward hacking.
::: solution
Adding $-\eta\log\pi(y)$ to the reward is the score-function form of an entropy bonus (as with the KL penalty, the extra term's direct gradient has zero mean by [[post-training/rl-for-language-models#lem-score]]). Combined with the KL penalty, the per-sample reward is $r_\phi - (\beta + \eta)\log\pi + \beta\log\pi_{\text{ref}}$, whose optimum is $\pi\propto\pi_{\text{ref}}^{\beta/(\beta + \eta)}e^{r_\phi/(\beta + \eta)}$: a flatter policy that keeps sampling rare responses. With $\beta = 0.1$, $\eta = 0.05$ the hack's weight is $0.01^{2/3}e^{3/0.15}$ against $0.05^{2/3}e^{2/0.15}$ for response $6$ — the hack dominates the optimum (about $99.6\%$ of the probability), and because the policy keeps exploring, training should now find it. Running the modified listing with seeds $0$ to $4$ confirms this: after $3{,}000$ steps the hack has probability between $0.96$ and $0.99$ in every run. Better exploration is good for optimisation and bad for an exploitable reward: the optimiser that finds the best honest answer faster is also the one that finds the hack. Robustness has to come from the reward and the penalty, not from a weak optimiser.
:::
:::
