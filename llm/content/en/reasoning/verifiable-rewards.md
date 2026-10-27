Reinforcement learning from human feedback trains a policy against a learned reward model, and the previous chapter showed what that invites: the more strongly a policy is optimised against a learned reward, the more it exploits the reward's errors. For some tasks there is a way round the problem. A mathematics problem with a known numerical answer, a programming task with unit tests, a puzzle whose solution can be checked, an instruction with a checkable constraint ("answer in exactly three sentences") — for all of these the reward can be computed by a program, exactly, for any output. **Reinforcement learning with verifiable rewards** (RLVR) trains on such tasks. Since 2024 it has been the central ingredient in training models that reason at length, and the behaviours it produces — long chains of thought, checking, backtracking — are what most people now mean by a "reasoning model".

This chapter defines RLVR and its verifiers, derives the policy-gradient estimators it uses, and analyses **GRPO** (group relative policy optimisation; Shao et al., 2024) in detail: its group-relative advantage as REINFORCE with a baseline, the exact relation to the unbiased leave-one-out baseline, the KL estimator it uses, and the groups that carry no signal at all. It covers the older family of **expert iteration** methods, such as STaR, and shows that fine-tuning on a model's own successful solutions is a policy gradient in disguise. It then describes the DeepSeek-R1 report accurately — what was done, what was measured and what was reported as emerging — and ends with the open questions: overthinking and length, and whether RLVR teaches new reasoning or sharpens what the base model could already do. The general reinforcement-learning background (policies, returns, PPO) is in [[post-training/rl-for-language-models]] and [[post-training/rlhf]]; [[post-training/preference-optimisation]] introduced GRPO briefly.

## Verifiable tasks {#sec-tasks}

::: definition Verifiable reward {#def-verifiable}
A **verifiable reward** for prompt $x$ is a function $r(x, y)$ computed by a program from the model's output $y$, without a learned model: for example $r = \mathbf 1[\text{extracted answer} \equiv a^*]$ for a reference answer $a^*$, the fraction or the conjunction of unit tests passed by extracted code, acceptance by a proof checker, or satisfaction of a checkable format constraint. **RLVR** maximises $\E_{x\sim\mathcal D,\;y\sim\pi_\theta(\cdot\mid x)}[r(x,y)]$, usually with a penalty on the divergence from a reference policy.
:::

The term was introduced by Lambert et al. (2024) in the Tülu 3 report, which applied it to mathematics and precise instruction following; the practice is older (STaR, expert iteration and code-generation RL with unit tests). Typical verifiable domains, as of 2026, are:

- **Mathematics with final answers**: competition and textbook problems whose answer is a number, expression or set, compared after normalisation (so that $1/2$, $0.5$ and `\frac{1}{2}` match) and often by symbolic equivalence with a computer-algebra system.
- **Code**: programming problems with hidden test cases, run in a sandbox; the reward is all-tests-pass or the fraction passed.
- **Formal proofs**: statements in a proof assistant such as Lean, where the checker accepts or rejects a proof exactly.
- **Constraints and formats**: word counts, required keywords, valid JSON, the presence of reasoning delimiters.
- **Logic puzzles** generated with known solutions (Sudoku, Countdown-style arithmetic, knights-and-knaves).

A verifier is exact only for what it checks. A mathematics checker accepts a correct final answer reached by flawed reasoning ([[reasoning/process-outcome-rewards#ex-false-positive]]); unit tests accept code that special-cases the tests; a format reward accepts well-formed nonsense. "Verifiable" removes the errors of a learned reward model but not the gap between the checked property and the intended one.

::: example A brittle answer checker {#ex-checker}
A checker extracts the last number in the output and compares it with the reference as a string. The reference answer is `0.5`. Which of these outputs are scored correctly: (a) "... so the probability is 1/2." (b) "... so $p = 0.50$." (c) "The answer is 0.5, though at step 3 I assumed independence, which is false; the correct answer is 0.25." (d) "Probability: .5"?
::: solution
(a) The last number is `2` (from `1/2`), scored wrong although correct — a **false negative**. (b) `0.50` is not the string `0.5`: false negative. (c) The last number is `0.25`, scored wrong — correctly, by luck of ordering; had the model written "0.25 ... is wrong, the answer is 0.5", the checker would accept a muddled solution. (d) `.5` is scored wrong: false negative. False negatives teach the policy to fear correct but differently formatted answers, and they make the reward noisier; this is why practical checkers parse a designated answer field (such as a `\boxed{}` expression) and compare values symbolically, and why many training recipes add a format reward for using that field.
:::
:::

## Policy gradients with a baseline {#sec-pg}

For one prompt $x$, let $J(\theta) = \E_{y\sim\pi_\theta}[r(y)]$ (we drop $x$ from the notation). The **score-function** or REINFORCE identity ([[post-training/rl-for-language-models]]) gives

$$
\nabla_\theta J = \E_{y\sim\pi_\theta}\big[r(y)\,\nabla_\theta\log\pi_\theta(y)\big],\qquad \nabla_\theta\log\pi_\theta(y) = \sum_{t}\nabla_\theta\log\pi_\theta(y_t\mid y_{<t}),
$$ {#eq-reinforce}

so a sampled output's log-probability is pushed up in proportion to its reward. With $0/1$ rewards this only ever pushes up successful samples, and its variance is high. Subtracting a **baseline** fixes both.

::: proposition Baselines do not bias the gradient {#prop-baseline}
For any $b$ that does not depend on the sample $y$, $\E_{y\sim\pi_\theta}\big[(r(y) - b)\nabla_\theta\log\pi_\theta(y)\big] = \nabla_\theta J$. If $y_1,\dots,y_G$ are independent samples and $b_i$ is any function of the samples other than $y_i$, then $\E\big[(r(y_i) - b_i)\nabla_\theta\log\pi_\theta(y_i)\big] = \nabla_\theta J$.
:::

::: proof
$\E[\nabla_\theta\log\pi_\theta(y)] = \sum_y\pi_\theta(y)\frac{\nabla_\theta\pi_\theta(y)}{\pi_\theta(y)} = \nabla_\theta\sum_y\pi_\theta(y) = \nabla_\theta1 = 0$, so a constant $b$ contributes nothing in expectation. In the second case, condition on the other samples: $b_i$ is then fixed and $y_i$ is still distributed as $\pi_\theta$, because the samples are independent; the first case applies, and averaging over the other samples preserves the equality.
:::

The natural baseline is the expected reward $J$ itself, which we do not know but can estimate from other samples of the same prompt. This is what GRPO does.

## Group relative policy optimisation {#sec-grpo}

PPO, the standard algorithm of RLHF, estimates per-token advantages with a learned **value model** — typically a network as large as the policy — and generalised advantage estimation. Shao et al. (2024), in the DeepSeekMath paper, replaced the value model by statistics of a *group* of samples for the same prompt.

::: definition GRPO {#def-grpo}
For each prompt $x$, **GRPO** samples a group of $G$ outputs $o_1,\dots,o_G$ from the current (old) policy $\pi_{\text{old}}$, scores them with rewards $r_1,\dots,r_G$, and gives every token of output $i$ the **group-relative advantage**

$$
\hat A_i = \frac{r_i - \operatorname{mean}(r_1,\dots,r_G)}{\operatorname{std}(r_1,\dots,r_G)}.
$$ {#eq-grpo-adv}

It maximises the clipped surrogate

$$
\mathcal J(\theta) = \E\Bigg[\frac1G\sum_{i=1}^G\frac1{\lvert o_i\rvert}\sum_{t=1}^{\lvert o_i\rvert}\Big(\min\big(\rho_{i,t}\hat A_i,\ \operatorname{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon)\hat A_i\big) - \beta\,\hat D_{i,t}\Big)\Bigg],
$$ {#eq-grpo}

where $\rho_{i,t} = \pi_\theta(o_{i,t}\mid x, o_{i,<t})/\pi_{\text{old}}(o_{i,t}\mid x, o_{i,<t})$ is the importance ratio, $\varepsilon$ the clipping range, and $\hat D_{i,t} = \frac{\pi_{\text{ref}}(o_{i,t}\mid\cdot)}{\pi_\theta(o_{i,t}\mid\cdot)} - \log\frac{\pi_{\text{ref}}(o_{i,t}\mid\cdot)}{\pi_\theta(o_{i,t}\mid\cdot)} - 1$ an estimate of the divergence from the reference policy $\pi_{\text{ref}}$, added to the loss rather than to the reward.
:::

The clipping is PPO's: it stops the importance ratio from moving far from $1$ when the same batch is used for several gradient steps. Removing the value model saves the memory and compute of a second large network, and avoids training a value function on long sequences with a reward only at the end — the setting in which value estimates are least reliable. Shao et al. also described a process-supervision variant with step rewards; the outcome variant above is the one used most widely.

### The advantage as a baseline {#sec-grpo-baseline}

::: proposition GRPO's baseline, scaled {#prop-grpo-loo}
Let $\bar r = \frac1G\sum_j r_j$ and let $\bar r_{-i} = \frac1{G-1}\sum_{j\ne i}r_j$ be the leave-one-out mean. Then

$$
r_i - \bar r = \frac{G-1}{G}\,\big(r_i - \bar r_{-i}\big).
$$

Hence the mean-centred advantage gives a gradient estimate whose expectation is $\frac{G-1}{G}\nabla_\theta J$: unbiased up to a constant factor. Dividing by the group's standard deviation multiplies each prompt's contribution by a factor that depends on that prompt's rewards, so the combined estimate is no longer proportional to $\sum_x\nabla_\theta J_x$.
:::

::: proof
$\bar r = \frac1G r_i + \frac{G-1}G\bar r_{-i}$, so $r_i - \bar r = \frac{G-1}{G}r_i - \frac{G-1}{G}\bar r_{-i}$. The leave-one-out mean does not depend on $o_i$, so by [[#prop-baseline]] the estimator with advantage $r_i - \bar r_{-i}$ has expectation $\nabla_\theta J$, and the mean-centred one has $\frac{G-1}G$ times that. The standard deviation depends on all rewards of the group, including $r_i$, and differs between prompts; dividing by it reweights prompts by $1/\operatorname{std}$, and because it depends on $r_i$ it also correlates with the sample, so the result is not an unbiased estimate of any fixed multiple of the total gradient.
:::

The leave-one-out estimator is exactly **RLOO** (REINFORCE leave-one-out), which Ahmadian et al. (2024) proposed for RLHF; with the centring alone, GRPO is RLOO with a slightly smaller step. What the standard-deviation scaling does is easiest to see with binary rewards. If a prompt has success rate $p$ and $G$ is large, the centred advantages are $1 - p$ for successes and $-p$ for failures, so the average magnitude of the advantage is $2p(1-p)$, largest at $p = 1/2$. Dividing by $\sqrt{p(1-p)}$ gives advantages $\sqrt{(1-p)/p}$ and $-\sqrt{p/(1-p)}$, average magnitude $2\sqrt{p(1-p)}$: prompts that are nearly always solved, or nearly never, get relatively *more* weight. Liu et al. (2025) called this a difficulty bias and, in their "Dr. GRPO" variant, removed both the standard-deviation scaling and the $1/\lvert o_i\rvert$ length normalisation discussed in [[#sec-length]].

::: widget plot
f: 2*x*(1 - x); 2*sqrt(x*(1 - x))
x: 0, 1
y: 0, 1.1
labels: mean-centred advantage, $2p(1-p)$; standard-deviation scaled, $2\sqrt{p(1-p)}$
caption: Average magnitude of the advantage given to a prompt's samples as a function of the prompt's success rate $p$, for a large group with $0/1$ rewards. Without scaling, prompts of middling difficulty dominate the update. GRPO's division by the group standard deviation flattens the curve, giving relatively more weight to prompts the model nearly always or nearly never solves — though at exactly $p = 0$ or $p = 1$ both are zero, since every sample gets the same reward.
:::

### Groups without signal {#sec-zero}

If all $G$ samples of a prompt receive the same reward, every advantage in [[#eq-grpo-adv]] is $0$ (implementations add a small constant to the denominator), and the prompt contributes nothing but the KL term. With binary rewards and success rate $p$, this happens with probability

$$
p^G + (1-p)^G.
$$ {#eq-zero-var}

Early in training, many prompts are too hard ($p\approx0$); late in training, many are too easy ($p\approx1$). Either way a growing share of the generated samples — which are the expensive part of RLVR — is wasted. Yu et al. (2025), in the DAPO recipe, filtered such groups out and kept sampling until each batch was full of prompts with mixed outcomes ("dynamic sampling"); curricula that select prompts of intermediate difficulty address the same problem.

::: example Advantages in one group {#ex-grpo}
A prompt's group of $G = 8$ outputs gets rewards $(1, 0, 0, 1, 0, 0, 0, 0)$. Compute the GRPO advantages, the mean-centred advantages and the leave-one-out advantages, and check [[#prop-grpo-loo]].
::: solution
The mean is $\bar r = 0.25$ and the (population) standard deviation $\sqrt{0.25\cdot0.75} = 0.433$. Mean-centred advantages: $0.75$ for the two successes and $-0.25$ for the six failures. GRPO divides by $0.433$: $1.732$ and $-0.577$. Leave-one-out: a success's baseline is the mean of the other seven, $1/7$, so its advantage is $0.857$; a failure's baseline is $2/7$, advantage $-0.286$. And $\frac78\cdot0.857 = 0.75$, $\frac78\cdot(-0.286) = -0.25$, as the proposition says. Note that the advantages sum to zero: the two successes are pushed up exactly as much, in total, as the six failures are pushed down.
:::
:::

::: example How much of a batch is wasted? {#ex-waste}
A training batch has prompts of which half have success rate $p = 0.9$ and half $p = 0.05$ under the current policy. With $G = 8$, what fraction of prompts give zero-variance groups?
::: solution
For $p = 0.9$: $0.9^8 + 0.1^8 = 0.4305$. For $p = 0.05$: $0.05^8 + 0.95^8 = 0.6634$. On average $0.547$: more than half the prompts, and therefore more than half the generation compute, produce no policy gradient. Increasing $G$ to $16$ lowers this to $\frac12(0.185 + 0.440) = 0.313$, at twice the sampling cost per prompt. Filtering prompts to keep $p$ away from $0$ and $1$ is usually cheaper.
:::
:::

::: example Partial credit from unit tests {#ex-partial}
A coding prompt has $10$ hidden tests, and the reward is the fraction passed. A group of $G = 4$ programs passes $10$, $6$, $6$ and $0$ tests. Compute the GRPO advantages, and compare with an all-or-nothing reward.
::: solution
Rewards $(1, 0.6, 0.6, 0)$, mean $0.55$; deviations $(0.45, 0.05, 0.05, -0.55)$, population variance $(0.2025 + 0.0025 + 0.0025 + 0.3025)/4 = 0.1275$, standard deviation $0.357$. Advantages: $(1.260, 0.140, 0.140, -1.540)$. The two partial programs are pushed *up*, slightly, although neither solves the task. With all-or-nothing rewards $(1, 0, 0, 0)$ the advantages are $(1.732, -0.577, -0.577, -0.577)$: the partial programs are pushed down along with the empty one. Partial credit gives signal on prompts that no sample solves completely, but it also rewards passing the easy tests — which can be done by special-casing them — so the choice is a trade-off between a denser signal and a more exploitable one.
:::
:::

### The KL estimator {#sec-k3}

::: proposition An unbiased, non-negative KL estimate {#prop-k3}
For distributions $\pi$ and $\pi_{\text{ref}}$ over tokens with $\pi_{\text{ref}}(v) > 0$ wherever $\pi(v) > 0$, let $w(v) = \pi_{\text{ref}}(v)/\pi(v)$. Then for $v\sim\pi$, the quantity $w - \log w - 1$ is non-negative and $\E_{v\sim\pi}[w - \log w - 1] = \mathrm{KL}(\pi\,\Vert\,\pi_{\text{ref}})$.
:::

::: proof
For $w > 0$, $w - 1\ge\log w$ (the logarithm lies below its tangent at $1$), so $w - \log w - 1\ge0$. In expectation, $\E_\pi[w] = \sum_v\pi(v)\frac{\pi_{\text{ref}}(v)}{\pi(v)} = \sum_{v:\pi(v) > 0}\pi_{\text{ref}}(v)\le1$, with equality under the support assumption in both directions (as for softmax distributions, which are positive everywhere). And $\E_\pi[-\log w] = \sum_v\pi(v)\log\frac{\pi(v)}{\pi_{\text{ref}}(v)} = \mathrm{KL}(\pi\Vert\pi_{\text{ref}})$. Adding, $\E[w - \log w - 1] = 1 + \mathrm{KL} - 1 = \mathrm{KL}$.
:::

This is the "$k_3$" estimator in Schulman's well-known note on approximating KL divergence. Its value at a single sampled token is never negative, unlike the plain estimate $-\log w$, and its variance is lower when the two distributions are close. The penalty keeps the policy near the reference; some later RLVR recipes (DAPO among them) dropped it entirely for long reasoning runs, arguing that the policy is *meant* to move far from its initialisation, while others kept a small coefficient.

## Expert iteration and STaR {#sec-expert}

Before policy-gradient methods became standard for reasoning, a simpler loop was used: sample solutions, keep the ones that pass the check, fine-tune on them, repeat. Anthony et al. (2017) called the general pattern **expert iteration** — an "expert" (search, or many samples plus a filter) produces better outputs than the "apprentice" policy, which is then trained to imitate them.

::: algorithm Self-taught reasoner (STaR) {#alg-star}
**Input:** pretrained model $M_0$, dataset $\{(x_i, a_i^*)\}$, few-shot rationale prompt $P$.
1. For $k = 1, 2, \dots$:
2. For each $x_i$, generate a rationale and answer $(z_i, \hat a_i)$ with $M_{k-1}$ prompted by $P$.
3. **Rationalisation:** for each $x_i$ with $\hat a_i\ne a_i^*$, generate a rationale with the correct answer given as a hint, and keep it (without the hint) if it reaches $a_i^*$.
4. Fine-tune the *original* model $M_0$ on all kept $(x_i, z_i, a_i^*)$ to obtain $M_k$.
5. Stop when performance stops improving.
:::

Zelikman et al. (2022) reported that STaR improved a $6$-billion-parameter GPT-J model on arithmetic and on CommonsenseQA, where it performed comparably to a fine-tuned GPT-3 model about thirty times larger. Rationalisation lets the model learn from problems it could not yet solve, at the risk of rationales that reach the answer only because they were told it. Related methods include rejection-sampling fine-tuning (Yuan et al., 2023) and ReST-EM (Singh et al., 2023), which framed the loop as expectation–maximisation and found that self-generated data could outperform human-written solutions for fine-tuning on mathematics and code.

::: theorem Filtered fine-tuning is a policy gradient {#thm-filtered}
Let rewards be binary and $J_x(\theta) = \Prob_{y\sim\pi_\theta(\cdot\mid x)}(r(x,y) = 1)$. Draw $n$ samples per prompt from $\pi_\theta$ and take one gradient step of maximum likelihood on the successful ones, $\sum_x\sum_j r(x, y_{x,j})\log\pi_\theta(y_{x,j}\mid x)$, at the current parameters. Its expected gradient is $n\sum_x\nabla_\theta J_x$. If instead each prompt's successful samples are averaged (one unit of weight per solved prompt), the expected gradient of a solved prompt's term is $\nabla_\theta\log J_x$.
:::

::: proof
For one sample, $\E[r\nabla\log\pi_\theta(y)] = \nabla J_x$ by [[#eq-reinforce]]; summing over $n$ samples and prompts gives the first claim. For the second, condition on a sample being successful: its distribution is $\pi_\theta(y\mid r = 1) = \pi_\theta(y)r(y)/J_x$, so

$$
\E[\nabla\log\pi_\theta(y)\mid r = 1] = \sum_y\frac{\pi_\theta(y)r(y)}{J_x}\nabla\log\pi_\theta(y) = \frac{\nabla J_x}{J_x} = \nabla\log J_x,
$$

and an average of successful samples has the same expectation.
:::

So keeping all successes is REINFORCE with $0/1$ rewards and no baseline; normalising per prompt maximises $\sum_x\log J_x$, which weights a prompt's gradient by $1/J_x$ and so emphasises hard prompts that are solved only occasionally. Neither uses failures: they have reward $0$ and are simply dropped, whereas a baseline gives them negative advantages and pushes their probability down. Expert iteration also takes large steps — a full fine-tuning per round on data from a fixed earlier policy — so in practice it is "off-policy" in a way the theorem's single step at current parameters is not.

## DeepSeek-R1 {#sec-r1}

The DeepSeek-R1 report (DeepSeek-AI, January 2025; a revised version appeared in *Nature* in September 2025) described the training of two reasoning models from the DeepSeek-V3 base model, a mixture-of-experts Transformer, and released their weights. As the most detailed public account of large-scale RLVR at the time, it is worth describing exactly.

**DeepSeek-R1-Zero** was trained by GRPO *directly from the base model*, with no supervised fine-tuning first. Prompts asked the model to put its reasoning between `<think>` and `</think>` tags and its answer between `<answer>` tags. The reward was rule-based: an **accuracy reward** (the answer checked against the reference, or code run against test cases) and a **format reward** for using the tags. The report explained that neural reward models were avoided because of reward hacking at scale ([[reasoning/process-outcome-rewards#sec-r1-prm]]). Reported results and observations:

- Pass@1 on the AIME 2024 mathematics competition rose during training from $15.6\%$ to $71.0\%$, and to $86.7\%$ with majority voting over $64$ samples.
- The average length of responses grew steadily during training, from hundreds to thousands of tokens, without any explicit incentive for length; the report interpreted this as the model learning to spend more test-time computation on harder problems.
- Behaviours such as re-checking earlier steps and trying alternative approaches appeared during training; the report showed an intermediate checkpoint writing that it had reached an "aha moment" and re-evaluating its solution.
- Its outputs had poor readability and mixed languages.

**DeepSeek-R1** addressed these problems with a multi-stage pipeline: (1) supervised fine-tuning on a **cold start** of thousands of long chain-of-thought examples written in a readable format; (2) reasoning-oriented RL with the same rule-based rewards plus a **language-consistency reward** (the proportion of target-language words), which the report noted slightly lowered benchmark scores but improved readability; (3) **rejection sampling** from the resulting checkpoint to build about $600{,}000$ reasoning samples, combined with about $200{,}000$ non-reasoning samples (writing, factual questions, translation), for a second round of supervised fine-tuning; and (4) a final RL stage over all kinds of prompts, using rule-based rewards for reasoning and reward models for general helpfulness and harmlessness. The report gave R1's AIME 2024 pass@1 as $79.8\%$ and its MATH-500 accuracy as $97.3\%$.

The report also **distilled** R1 into smaller open models (Qwen and Llama models from $1.5$ to $70$ billion parameters) by supervised fine-tuning on its outputs, and compared this with running RL on a $32$-billion-parameter base model directly: the distilled model was much stronger ($72.6\%$ against $47.0\%$ AIME 2024 pass@1, as reported). Its conclusion was that distilling a stronger model is more effective for small models than RL on them, while going beyond the strongest model may still require RL and larger base models. It listed **unsuccessful attempts**: process reward models and Monte Carlo tree search over reasoning steps, the latter because the space of token sequences is far larger than that of board games and a fine-grained value model was hard to train.

Other developers published related reports in the same period. Kimi k1.5 (Kimi Team, 2025) described long-context RL without tree search, value functions or process reward models, with a **length penalty** and methods for transferring long-chain behaviour into shorter outputs. OpenAI's o1 announcement (September 2024) reported that performance improved with more RL training compute and with more thinking time but did not disclose the training method; descriptions of undisclosed systems beyond such statements are speculation and are not repeated here.

::: warning "Emergent" behaviours are reported observations, not mechanisms
The growth of response length and the appearance of self-checking in R1-Zero are measurements and examples from one training run, interpreted by its authors. Later analyses offered other contributing explanations: some base models already produce self-reflection phrases before any RL (Liu et al., 2025), and the per-sequence length normalisation of GRPO's loss can itself favour longer incorrect responses ([[#sec-length]]). The behaviours are real and reproducible across several open replications; *why* they appear, and how much is new versus amplified, remains an open research question as of 2026.
:::

## Length, overthinking and what RL adds {#sec-length}

**The length bias of the loss.** In [[#eq-grpo]] each output's token terms are averaged over its own length $\lvert o_i\rvert$. For an output with negative advantage, every token is pushed down with weight $\hat A_i/\lvert o_i\rvert$, so a long wrong answer is penalised *less per token* than a short wrong one; for positive advantages, short answers are rewarded more per token. Liu et al. (2025) argued that this biases GRPO towards long incorrect responses, and both Dr. GRPO and DAPO normalise by a constant or by the total number of tokens in the batch instead. DAPO also introduced "clip-higher" (a larger upper clipping range, which lets low-probability tokens gain probability faster and so counters the collapse of the policy's entropy) and penalties for overlong, truncated outputs.

**Overthinking.** Reasoning models often spend far more tokens than a problem needs. Chen et al. (2024) documented models trained in this way producing hundreds of tokens and repeated rounds of verification for questions as simple as $2 + 3$, and proposed efficiency metrics and training to shorten such outputs. Remedies in published recipes include length penalties, rewards that compare a sample's length with the group's, training on the shortest correct samples, and explicit budgets at inference ([[reasoning/test-time-scaling]]).

**Sharpening or new capability?** Yue et al. (2025) compared base models with their RLVR-trained versions by pass@$k$ for $k$ up to the hundreds. RLVR models won clearly at small $k$, but base models caught up and often overtook them at large $k$, and the problems solved by the RL model were largely a subset of those the base model could solve with enough samples. Their interpretation: RLVR mostly improves the *efficiency* of sampling correct paths the base model already has, while narrowing exploration; distillation from a stronger model, by contrast, could add new problems. Other work disputes how general this is: Liu et al. (2025, "ProRL") reported that prolonged RL with KL control and periodic resets of the reference policy expanded pass@$k$ on some tasks, especially where the base model was weak. And Shao et al. (2025) found that, on one family of base models, RLVR with random or even incorrect rewards still raised mathematics scores substantially, while the same did not hold for other model families — evidence that some reported gains reflect eliciting behaviour already latent in particular pretrained models. All of these are recent results on specific models and benchmarks; the listing below reproduces the sharpening effect in a toy where it is guaranteed by construction.

::: quiz
In GRPO with binary rewards and group size $G = 4$, a prompt's group has rewards $(1, 1, 1, 1)$. Which statements are correct? (Select all that apply.)
- [x] All four advantages are zero, so the policy-gradient term for this prompt vanishes.
- [x] The KL penalty term can still produce a gradient for this prompt.
- [ ] The update increases the probability of all four outputs, since they are all correct.
- [ ] The leave-one-out baseline would give each output an advantage of $1$.
::: solution
With identical rewards, $r_i - \bar r = 0$ for every $i$, so only the KL term remains. The leave-one-out baseline for each output is the mean of the other three, $1$, so its advantage is $1 - 1 = 0$ as well. Nothing is learned about this prompt from its rewards; that is the waste quantified in [[#eq-zero-var]].
:::
:::

## A numerical laboratory {#sec-code}

The listing first computes GRPO, mean-centred and leave-one-out advantages for one group ([[#ex-grpo]]). It then trains a toy policy — a softmax over five solution "methods", shared across $40$ questions — with GRPO advantages and plain policy-gradient steps (no clipping, no KL). Method $0$ works on $32$ ordinary questions with probability $0.6$; only method $4$ ever solves the $8$ unusual ones. Pass@$k$ is computed exactly from the policy.

```python
import math, random
rng = random.Random(4)

# 1. GRPO advantages for one group of G = 8 sampled answers with 0/1 rewards
def grpo_adv(r, eps=1e-6):
    m = sum(r) / len(r)
    sd = math.sqrt(sum((x - m)**2 for x in r) / len(r))
    return [(x - m) / (sd + eps) for x in r]
def loo_adv(r):                                   # leave-one-out (RLOO) baseline
    G = len(r)
    return [x - (sum(r) - x) / (G - 1) for x in r]
r = [1, 0, 0, 1, 0, 0, 0, 0]
print("rewards      ", r)
print("GRPO         ", [round(a, 3) for a in grpo_adv(r)])
print("mean baseline", [round(x - sum(r) / len(r), 3) for x in r])
print("leave-one-out", [round(a, 3) for a in loo_adv(r)])
print("all correct  ", [round(a, 3) for a in grpo_adv([1] * 8)])

# 2. A toy policy: a softmax over 5 solution "methods", shared across 40 questions.
# Method 0 works on most questions; method 4 is the only one that solves the 8 "odd" questions.
M, Q = 5, 40
succ = [[0.6, 0.3, 0.2, 0.1, 0.05] if q < 32 else [0.0, 0.0, 0.0, 0.0, 0.5] for q in range(Q)]
theta = [0.0] * M

def probs(th):
    z = [math.exp(t - max(th)) for t in th]; s = sum(z); return [v / s for v in z]
def pass_at_k(th, k):                             # exact, averaged over questions
    p = probs(th)
    return sum(1 - (1 - sum(pm * s for pm, s in zip(p, succ[q])))**k for q in range(Q)) / Q

print("\nstep  pass@1  pass@16  P(method 0)  zero-variance groups")
print(f"{0:4d}  {pass_at_k(theta, 1):6.3f}  {pass_at_k(theta, 16):7.3f}  {probs(theta)[0]:11.3f}")
G, lr = 8, 0.5
for step in range(1, 201):
    grad, zero = [0.0] * M, 0
    p = probs(theta)
    for q in range(Q):
        ms = [rng.choices(range(M), p)[0] for _ in range(G)]
        rs = [1.0 if rng.random() < succ[q][m] else 0.0 for m in ms]
        if min(rs) == max(rs):
            zero += 1; continue                   # no learning signal from this group
        for m, a in zip(ms, grpo_adv(rs)):
            for j in range(M):                    # d log softmax_m / d theta_j
                grad[j] += a * ((j == m) - p[j]) / (G * Q)
    theta = [t + lr * g for t, g in zip(theta, grad)]
    if step % 50 == 0:
        print(f"{step:4d}  {pass_at_k(theta, 1):6.3f}  {pass_at_k(theta, 16):7.3f}  {probs(theta)[0]:11.3f}  {zero:9d} of {Q}")
```

```text
rewards       [1, 0, 0, 1, 0, 0, 0, 0]
GRPO          [1.732, -0.577, -0.577, 1.732, -0.577, -0.577, -0.577, -0.577]
mean baseline [0.75, -0.25, -0.25, 0.75, -0.25, -0.25, -0.25, -0.25]
leave-one-out [0.857, -0.286, -0.286, 0.857, -0.286, -0.286, -0.286, -0.286]
all correct   [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

step  pass@1  pass@16  P(method 0)  zero-variance groups
   0   0.220    0.955        0.200
  50   0.445    0.839        0.889          7 of 40
 100   0.467    0.815        0.960          8 of 40
 150   0.473    0.809        0.977          8 of 40
 200   0.475    0.806        0.984         10 of 40
```

RL doubles pass@$1$, from $0.22$ to $0.475$, by concentrating the policy on method $0$. But pass@$16$ *falls* from $0.955$ to $0.806$: as method $4$ becomes rare, the unusual questions are almost never solved, their groups become all-zero, and the policy receives no signal to keep method $4$ alive. This is the sharpening-versus-exploration trade-off of [[#sec-length]] in miniature — and the reason RLVR recipes care about entropy, clipping ranges and prompt selection.

::: history
Reinforcement learning on programs with test-case rewards and on formal proofs predates large language models; for language models, training on proofs found by the model and accepted by a proof checker was used by Polu and Sutskever (2020, for Metamath) and, as expert iteration, by Polu et al. (2022, for Lean). Zelikman et al. (2022) introduced STaR; Yuan et al. (2023) and Singh et al. (2023) studied rejection-sampling fine-tuning and ReST-EM. Shao et al. (2024) introduced GRPO in DeepSeekMath, and Ahmadian et al. (2024) argued for REINFORCE-style methods such as RLOO over PPO in RLHF. OpenAI announced o1 in September 2024. Lambert et al. (2024) named RLVR in the Tülu 3 report. In January 2025 DeepSeek-AI released DeepSeek-R1 and R1-Zero with an open report and weights, and the Kimi team released the k1.5 report; many open replications followed, along with algorithmic refinements such as DAPO (Yu et al., 2025) and Dr. GRPO (Liu et al., 2025), and analyses of what RLVR changes (Yue et al., 2025).
:::

::: summary
- **RLVR** optimises a policy against rewards computed by programs — answer checkers, unit tests, proof checkers, format rules — which removes learned-reward errors but not the gap between the checked property and the intended one.
- The REINFORCE gradient $\E[r\nabla\log\pi]$ is unbiased with any baseline not depending on the sample; **GRPO** uses the group mean and divides by the group standard deviation, with PPO-style clipping and a KL penalty estimated by $w - \log w - 1$, which is unbiased and non-negative.
- The mean-centred advantage is $\frac{G-1}{G}$ times the unbiased **leave-one-out** (RLOO) advantage; standard-deviation scaling reweights prompts towards very easy and very hard ones.
- Groups with identical rewards give no gradient; this happens with probability $p^G + (1-p)^G$, wasting much of the sampling budget unless prompts are filtered.
- **Expert iteration / STaR** fine-tunes on the model's own successful solutions; this is REINFORCE with $0/1$ rewards and no baseline (or, normalised per prompt, gradient ascent on $\sum\log J_x$).
- **DeepSeek-R1-Zero** (GRPO from a base model with accuracy and format rewards) raised AIME 2024 pass@1 from $15.6\%$ to $71.0\%$, with response length growing during training; **R1** added a cold start, a language-consistency reward, rejection-sampling SFT and a general RL stage; distillation into small models outperformed RL on them.
- Open questions: length bias and **overthinking**, and whether RLVR adds capability or mainly sharpens the base model's distribution (pass@$k$ at large $k$).
:::

## Exercises

::: exercise Four samples {level=1 check="1"}
A group of $G = 4$ outputs has rewards $(1, 1, 0, 0)$. What GRPO advantage, [[#eq-grpo-adv]] with the population standard deviation, does each correct output receive?
::: solution
Mean $0.5$, standard deviation $0.5$; the correct outputs get $(1 - 0.5)/0.5 = 1$ and the incorrect ones $-1$.
:::
:::

::: exercise An easy prompt {level=1 check="0.4305"}
A prompt is solved with probability $0.9$. With $G = 8$, what is the probability that its group carries no policy-gradient signal? Give four decimal places.
::: solution
By [[#eq-zero-var]], $0.9^8 + 0.1^8 = 0.43047 + 10^{-8} = 0.4305$.
:::
:::

::: exercise The KL estimate at one token {level=1 check="0.0231"}
At a sampled token, $\pi_{\text{ref}}/\pi_\theta = 0.8$. Compute $\hat D = w - \log w - 1$ to four decimal places, and compare it with the naive estimate $-\log w$.
::: solution
$0.8 - \ln0.8 - 1 = 0.8 + 0.22314 - 1 = 0.0231$. The naive estimate is $-\ln 0.8 = 0.2231$, ten times larger at this token, and it would be negative at a token with $w > 1$; both have the same expectation, $\mathrm{KL}(\pi_\theta\Vert\pi_{\text{ref}})$, but $\hat D$ is never negative and varies less when the policies are close.
:::
:::

::: exercise Generation compute per step {level=2 check="3.03e17"}
An RLVR step samples $512$ outputs (for example $32$ prompts with $G = 16$) of $8{,}000$ tokens on average from a mixture-of-experts model with $37$ billion parameters active per token. Using $2$ FLOPs per active parameter per token, how many FLOPs does generation cost per step? Give three significant figures.
::: solution
$512\cdot8000 = 4.096\times10^6$ tokens; $2\cdot37\times10^9\cdot4.096\times10^6 = 3.03\times10^{17}$ FLOPs, ignoring attention. The gradient computation on the same tokens costs about three times the forward FLOPs ($6N$ per token for training versus $2N$ for a forward pass), but generation is usually slower in wall-clock time because decoding is memory-bound ([[inference]]); this is why RLVR systems invest heavily in fast inference engines.
:::
:::

::: exercise The collapsed toy policy {level=2 check="0.48"}
In the listing's toy, suppose the policy collapses completely onto method $0$. Compute exactly its pass@$1$ and pass@$16$ averaged over the $40$ questions.
::: solution
Method $0$ solves each of the $32$ ordinary questions with probability $0.6$ and never solves the $8$ unusual ones. pass@$1 = 32\cdot0.6/40 = 0.48$. pass@$16 = 32(1 - 0.4^{16})/40 = 0.8(1 - 4.3\times10^{-7})\approx0.8000$. The listing's values at step $200$, $0.475$ and $0.806$, are approaching these limits; the initial uniform policy had pass@$16 = 0.955$ because it still tried method $4$.
:::
:::

::: exercise Leave-one-out from scratch {level=2}
Prove directly, without [[#prop-baseline]], that for $G = 2$ samples the estimator $\frac12\sum_{i=1}^2(r_i - r_{3-i})\nabla\log\pi_\theta(o_i)$ has expectation $\nabla_\theta J$.
::: solution
By symmetry it suffices to show $\E[(r_1 - r_2)\nabla\log\pi(o_1)] = \nabla J$. Since $o_1$ and $o_2$ are independent, $\E[r_2\nabla\log\pi(o_1)] = \E[r_2]\,\E[\nabla\log\pi(o_1)] = J\cdot0 = 0$, using $\E[\nabla\log\pi] = \sum\nabla\pi = 0$. And $\E[r_1\nabla\log\pi(o_1)] = \nabla J$ by the score-function identity. So each term has expectation $\nabla J$, and the average of the two does too.
:::
:::

::: exercise Hard prompts under filtered fine-tuning {level=2}
Two prompts have success rates $J_A = 0.5$ and $J_B = 0.02$. By [[#thm-filtered]], compare the relative weight that (a) REINFORCE with all successes and (b) per-prompt-normalised filtered fine-tuning give to increasing each prompt's success probability. Which is closer to maximising the number of solved prompts with best-of-many sampling?
::: solution
(a) The expected gradient is proportional to $\nabla J_A + \nabla J_B$: a unit increase in either success rate is worth the same, so the update follows whichever prompt's success rate is easier to move. (b) The objective is $\log J_A + \log J_B$, whose gradient is $\nabla J_A/0.5 + \nabla J_B/0.02$: prompt B's improvements count $25$ times as much. If the system will use many samples with a verifier, what matters is whether each prompt is solved at least occasionally (pass@$k$ for large $k$), and $\log J$ rewards turning a rare success into a less rare one; maximising $\sum J$ instead rewards making easy prompts reliable. This is one way of seeing why sampling-based RL can sharpen the distribution at the cost of rare solutions, as in the listing.
:::
:::

::: exercise Length normalisation {level=3}
Consider [[#eq-grpo]] without clipping or KL, at $\rho = 1$. A group contains one correct output of $100$ tokens and one incorrect output, either of $100$ or of $1{,}000$ tokens, with advantages $+1$ and $-1$. (a) What total weight on log-probability gradients does each output receive in each case? (b) Explain the resulting bias, and how replacing $1/\lvert o_i\rvert$ by $1/L_{\max}$ for a fixed constant $L_{\max}$ changes it.
::: solution
(a) Each token of output $i$ has weight $\hat A_i/(G\lvert o_i\rvert)$, so each output's total weight is $\hat A_i/G$ regardless of length: $+\frac12$ and $-\frac12$ in both cases. But per token, the long incorrect output's tokens get $-\frac{1}{2000}$ against $-\frac1{200}$ for a short one. (b) The gradient of the sequence log-probability is a sum over tokens; distributing a fixed total penalty over ten times as many tokens pushes each down ten times less, so the specific tokens that make long wrong answers long — repetition, padding, rambling — are barely discouraged, while the tokens of short wrong answers are discouraged strongly. Over many updates this favours long wrong answers over short ones. With $1/L_{\max}$ every token gets weight $\hat A_i/(GL_{\max})$, so a long output's total weight is proportional to its length: long incorrect outputs are penalised in proportion to their length and long correct ones rewarded in proportion. This is the change made by Dr. GRPO (with a constant) and DAPO (with the total token count of the batch).
:::
:::

::: exercise Implement expert iteration on the toy {level=3}
Modify the listing's training loop to perform expert iteration instead of GRPO: in each round, sample $G = 8$ outputs for each question, keep the successful ones, and take $20$ gradient steps of maximum likelihood on the kept (question, method) pairs, starting from the current parameters. Run $10$ rounds and report pass@$1$ and pass@$16$. Compare with GRPO and explain the result using [[#thm-filtered]].
::: solution
```python
import math, random
rng = random.Random(5)
M, Q = 5, 40
succ = [[0.6, 0.3, 0.2, 0.1, 0.05] if q < 32 else [0.0, 0.0, 0.0, 0.0, 0.5] for q in range(Q)]
def probs(th):
    z = [math.exp(t - max(th)) for t in th]; s = sum(z); return [v / s for v in z]
def pass_at_k(th, k):
    p = probs(th)
    return sum(1 - (1 - sum(pm * s for pm, s in zip(p, succ[q])))**k for q in range(Q)) / Q

theta = [0.0] * M
for rnd in range(1, 11):
    p = probs(theta)
    kept = []
    for q in range(Q):
        for _ in range(8):
            m = rng.choices(range(M), p)[0]
            if rng.random() < succ[q][m]:
                kept.append(m)
    for _ in range(20):                            # maximum likelihood on the kept methods
        p = probs(theta)
        grad = [sum((j == m) - p[j] for m in kept) / len(kept) for j in range(M)]
        theta = [t + 0.5 * g for t, g in zip(theta, grad)]
    print(f"round {rnd:2d}  pass@1 {pass_at_k(theta, 1):.3f}  pass@16 {pass_at_k(theta, 16):.3f}  kept {len(kept)}")
```

```text
round  1  pass@1 0.306  pass@16 0.932  kept 62
round  2  pass@1 0.409  pass@16 0.875  kept 104
round  3  pass@1 0.446  pass@16 0.841  kept 133
round  4  pass@1 0.461  pass@16 0.823  kept 150
round  5  pass@1 0.465  pass@16 0.818  kept 140
round  6  pass@1 0.468  pass@16 0.814  kept 140
round  7  pass@1 0.470  pass@16 0.811  kept 148
round  8  pass@1 0.472  pass@16 0.809  kept 150
round  9  pass@1 0.472  pass@16 0.809  kept 151
round 10  pass@1 0.473  pass@16 0.808  kept 146
```

Expert iteration behaves like GRPO here: pass@$1$ rises towards $0.48$ and pass@$16$ falls as method $4$ is crowded out. By [[#thm-filtered]], keeping all successes is REINFORCE without a baseline, which follows $\sum_q\nabla J_q$; the $32$ ordinary questions, where method $0$ succeeds most, dominate. (The maximum-likelihood steps move the policy towards the empirical distribution of kept methods, which is the current policy reweighted by each method's success rate.) Normalising per question would give the unusual questions more weight, since their success rate is low, and slows the collapse.
:::
:::
