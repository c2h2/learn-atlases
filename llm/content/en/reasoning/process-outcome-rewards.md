The previous chapter selected among sampled solutions with a verifier. To build a verifier — or to train a model with reinforcement learning — we must decide *what* to reward. The simplest choice is the outcome: a solution is good if its final answer is right. But a mathematics teacher grades the working, not only the answer, for two reasons that apply equally to language models. A right answer can come from wrong reasoning, and rewarding it teaches the wrong lesson. And a long solution that fails at step seven of twenty contains six good steps and one identifiable mistake; an outcome label says only "wrong".

This chapter compares **outcome** and **process** supervision. It defines outcome and process reward models, proves what each learns when trained with the standard loss, and presents the two main empirical comparisons: Uesato et al. (2022) on grade-school mathematics and Lightman et al. (2023), whose PRM800K dataset of human step labels became the reference point for the field. It then covers automatic process labels estimated by Monte Carlo rollouts, as in Math-Shepherd, and shows exactly what such labels measure — the probability of eventually succeeding, which is not the same as the correctness of a step. It ends with reward hacking and over-optimisation, including an exact formula for how far best-of-$n$ selection moves from the base model, and with the reasons the DeepSeek-R1 report gave for not using learned rewards at all. Reward models in general, and the Bradley–Terry model for preferences, are covered in [[post-training/reward-models]].

## Two kinds of label {#sec-labels}

Write a solution as a sequence of steps $y = (s_1,\dots,s_T)$ — typically lines or paragraphs separated by newlines — ending in a final answer $a(y)$. For problems with a known reference answer $a^*$, the **outcome** is $o(y) = \mathbf 1[a(y) = a^*]$, which can be checked automatically. A **process** label gives each step a verdict $c_t\in\{0, 1\}$ (sometimes with a third, neutral value): is step $t$ correct and does it make progress, given the steps before it?

::: definition Outcome and process reward models {#def-orm-prm}
An **outcome reward model** (ORM) $r_\phi(x, y)\in[0,1]$ is trained to predict the outcome $o(y)$ of a complete solution $y$ to problem $x$. A **process reward model** (PRM) $r_\phi(x, s_{\le t})\in[0,1]$ is trained to predict the label $c_t$ of step $t$ given the problem and the steps up to $t$. A PRM's step scores are **aggregated** into a solution score, most often by the product $\prod_t r_\phi(x, s_{\le t})$ or the minimum $\min_t r_\phi(x, s_{\le t})$, sometimes by the last step's score.
:::

Both are usually a language model with a small head that outputs a probability, trained with binary cross-entropy. Cobbe et al. (2021) trained their GSM8K verifier — an ORM — to predict the outcome at *every token* of the solution, not only at the end, and found this works better than a single prediction at the end. The next proposition says what such a model learns.

::: proposition An outcome model trained on prefixes learns a value function {#prop-orm-value}
Let solutions be sampled from a policy $\pi$ and let an ORM be trained to predict the outcome $o(y)$ from each prefix $y_{\le t}$ with the cross-entropy loss

$$
\mathcal L(\phi) = -\E_{x,\;y\sim\pi(\cdot\mid x)}\sum_t\Big[o(y)\log r_\phi(x, y_{\le t}) + \big(1 - o(y)\big)\log\big(1 - r_\phi(x, y_{\le t})\big)\Big].
$$

If the model class can represent any function of $(x, y_{\le t})$, the minimiser is $r^*(x, y_{\le t}) = \Prob_\pi\big(o(y) = 1\mid x, y_{\le t}\big)$, the probability that the policy, continuing from this prefix, reaches the correct answer.
:::

::: proof
The loss is a sum over prefixes; group the terms by the value $h = (x, y_{\le t})$ of the input. For a fixed $h$, the expected contribution is $-\big[\bar o\log r + (1-\bar o)\log(1-r)\big]$ times the probability of $h$, where $r = r_\phi(h)$ and $\bar o = \Prob_\pi(o = 1\mid h)$ is the expected outcome over continuations of $h$. As a function of $r\in(0,1)$ its derivative is $-\bar o/r + (1-\bar o)/(1-r)$, which vanishes only at $r = \bar o$, and the function is convex, so $r = \bar o$ minimises it. Since each $h$ can be set independently, $r^*(h) = \bar o(h)$.
:::

In reinforcement-learning terms ([[post-training/rl-for-language-models]]), $r^*$ is the **value** $V^\pi$ of the partial solution under policy $\pi$ with reward $o$ at the end. That is useful for search ([[reasoning/search]]), but note what it is *not*: a judgement of whether the steps so far are correct. A correct prefix of a hard problem has a low value if $\pi$ usually fails to finish it, and an incorrect prefix has a positive value if $\pi$ sometimes reaches the right answer anyway. Process labels ask the other question.

::: example Right answer, wrong reasoning {#ex-false-positive}
A generator solves problems in $8$ steps. A solution is fully correct with probability $0.5$; when some step is wrong, the final answer is still right with probability $0.15$ (errors that cancel, a lucky guess, a copied number). What fraction of solutions with a correct final answer contain a wrong step? If best-of-$n$ uses a perfect ORM, which picks uniformly among the solutions with correct answers, how often does it return such a solution?
::: solution
$\Prob(\text{right answer}) = 0.5 + 0.5\cdot0.15 = 0.575$, and $\Prob(\text{wrong step}\mid\text{right answer}) = 0.075/0.575 = 0.130$. A perfect ORM cannot tell these apart, so whenever it returns a solution with the right answer, $13\%$ of the time that solution's reasoning is flawed. A perfect PRM rejects them. On a benchmark that checks only answers, the two verifiers score the same; for a user reading the working, or a training procedure that imitates the selected solution, they do not.
:::
:::

## The empirical comparisons {#sec-evidence}

### Uesato et al. (2022) {#sec-uesato}

Uesato et al. at DeepMind compared outcome-based and process-based approaches on GSM8K — for supervised fine-tuning, for reward models used in reranking and for reinforcement learning. Process labels came from human annotators who marked the first incorrect step of sampled solutions. They measured two things: **final-answer error** and **trace error**, the fraction of solutions with a correct final answer that nonetheless contain a reasoning error.

Their main findings were that outcome-based and process-based supervision gave *similar* final-answer error rates, but low trace error required process-based feedback, or a reward model that emulated it. Their best system reduced final-answer error from the previous best of $16.8\%$ to $12.7\%$ and trace error from $14.0\%$ to $3.4\%$. A further, subtler finding: reward models trained only on outcome labels agreed more with the human *process* labels than with the outcome labels they were trained on — consistent with [[#prop-orm-value]], since a good value function drops sharply at the first fatal mistake.

### Lightman et al. (2023): Let's verify step by step {#sec-lightman}

Lightman et al. at OpenAI scaled the comparison to the harder MATH dataset of competition problems. A GPT-4-based generator, fine-tuned to write solutions one step per line, produced solutions that human labellers rated step by step as *positive*, *negative* or *neutral*.

::: definition PRM800K {#def-prm800k}
**PRM800K** is the dataset of about $800{,}000$ step-level human labels on about $75{,}000$ model-generated solutions to $12{,}000$ MATH problems released by Lightman et al. (2023). Solutions were chosen for labelling by **active learning**: preferring *convincing wrong-answer solutions*, which the current PRM rated highly but which reached a wrong final answer.
:::

Their PRM scored a solution by the probability that *every* step is correct, computed as the product of the per-step probabilities. The ORM was trained on the final-answer correctness of uniformly sampled solutions. Evaluated by best-of-$N$ on a $500$-problem held-out subset of the MATH test set (since often called MATH-500), with up to $N = 1860$ samples per problem, the PRM selected a correct solution for $78.2\%$ of problems, the ORM for $72.4\%$ and majority voting for $69.6\%$. The gap between PRM and ORM *grew* with $N$: the more candidates there are, the more it matters to reject convincing wrong ones. The PRM's advantage persisted on a small out-of-distribution set of recent STEM exam problems. Active learning improved the data efficiency of process labels by about a factor of $2.6$.

The authors also ran controlled small-scale experiments in which a large PRM played the role of the human labeller, to compare supervision methods at equal labelling cost. Process supervision remained better than outcome supervision there too. They argued that process supervision also has an **alignment** benefit: it rewards a human-endorsed chain of thought directly, rather than any route to the answer.

::: proposition Product and minimum aggregation {#prop-aggregate}
Let a PRM's step scores be $r_1,\dots,r_T\in[0,1]$. (a) If $r_t$ is the conditional probability that step $t$ is correct given that steps $1,\dots,t-1$ are, then $\prod_t r_t$ is the probability that every step is correct. (b) $\prod_t r_t\le\min_t r_t$, with equality only if all other scores are $1$. (c) If every step has score $r < 1$, the product is $r^T$, which decreases with the number of steps $T$, while the minimum is $r$ for every $T$.
:::

::: proof
(a) By the chain rule of probability, $\Prob(c_1 = \dots = c_T = 1) = \prod_t\Prob(c_t = 1\mid c_1 = \dots = c_{t-1} = 1) = \prod_t r_t$. (b) Each factor is at most $1$, so the product is at most any one factor, in particular the smallest; it equals the smallest only if the others are all $1$. (c) is immediate.
:::

::: example Two aggregations disagree {#ex-aggregate}
Solution A has $4$ steps, each scored $0.95$ by a PRM. Solution B solves the same problem more carefully in $12$ steps, each scored $0.98$. Which does product aggregation prefer, and which does minimum aggregation prefer?
::: solution
Product: A scores $0.95^4 = 0.8145$, B scores $0.98^{12} = 0.7847$, so the product prefers the terser A although each of its steps is less certain. Minimum: A scores $0.95$ and B $0.98$, so the minimum prefers B. If the scores are calibrated conditional probabilities, (a) of [[#prop-aggregate]] says the product is the right quantity — B really is slightly more likely to contain an error somewhere, because it has three times as many places to make one. If instead the PRM's scores are poorly calibrated and every step gets a small "tax", the product systematically favours short solutions.
:::
:::

Part (c) is a practical issue. Product aggregation penalises long solutions even when every step is fine, so a policy optimised against it learns to write fewer, longer steps; minimum aggregation does not, but it ignores everything except the weakest step. Neither is the right answer in all settings, and published systems use both.

## Automatic process labels {#sec-auto}

Human step labels are expensive: PRM800K required expert labellers to read hundreds of thousands of steps of competition mathematics. A cheaper idea exploits [[#prop-orm-value]]: estimate the value of each prefix by *rolling out* completions from it and checking their answers.

::: algorithm Monte Carlo step labels (Math-Shepherd) {#alg-mc-labels}
**Input:** problem $x$ with reference answer $a^*$, solution steps $s_1,\dots,s_T$, a completer policy $\pi$, number of rollouts $N$.
1. For $t = 1,\dots,T$: sample $N$ completions $y^{(1)},\dots,y^{(N)}\sim\pi(\cdot\mid x, s_{\le t})$ and let $k_t$ be the number whose final answer equals $a^*$.
2. **Soft label:** $\hat v_t = k_t/N$. **Hard label:** $\hat c_t = \mathbf 1[k_t > 0]$.
3. Train a PRM on $(x, s_{\le t}, \hat c_t)$ or $(x, s_{\le t}, \hat v_t)$ with cross-entropy.
:::

Wang et al. (2024) introduced this procedure as **Math-Shepherd**. They trained PRMs on the automatic labels, used them for best-of-$n$ selection and as a step-level reward for reinforcement learning with PPO, and reported gains on GSM8K and MATH with open models of around $7$ billion parameters — for a Mistral-7B model, from $77.9\%$ to $84.1\%$ on GSM8K and from $28.6\%$ to $33.0\%$ on MATH through step-by-step PPO, and further with PRM-based selection. Later work made labelling cheaper: OmegaPRM (Luo et al., 2024) searches for the first error by binary search over the prefix position, since the estimated value tends to drop at the first mistake.

::: proposition What Monte Carlo labels estimate {#prop-mc}
In [[#alg-mc-labels]], let $v_t = \Prob_\pi(a(y) = a^*\mid x, s_{\le t})$ be the value of prefix $t$ under the completer. Then the soft label is unbiased for the value, $\E\hat v_t = v_t$ with $\Var\hat v_t = v_t(1-v_t)/N$, and the hard label is $1$ with probability $1 - (1 - v_t)^N$.
:::

::: proof
The $N$ completions are independent, each reaching $a^*$ with probability $v_t$, so $k_t\sim\Bin(N, v_t)$. Hence $\E[k_t/N] = v_t$ and $\Var(k_t/N) = v_t(1-v_t)/N$, and $\Prob(k_t > 0) = 1 - \Prob(k_t = 0) = 1 - (1-v_t)^N$.
:::

The labels therefore inherit two biases from the completer. A **correct** step of a hard problem may be labelled bad because the completer rarely finishes the problem ($v_t$ small), and an **incorrect** step may be labelled good because the completer sometimes recovers or reaches the right answer by luck ($v_t > 0$). With hard labels and many rollouts the second effect gets *worse*: $1 - (1-v_t)^N\to1$ for any $v_t > 0$.

::: example Hard labels and lucky answers {#ex-hard-label}
After a wrong step, the completer still reaches the reference answer with probability $0.15$ (by luck or by silently correcting the error). With $N = 8$ rollouts, how often does the hard label mark the wrong step as good? With $N = 32$?
::: solution
By [[#prop-mc]], $1 - 0.85^8 = 1 - 0.2725 = 0.728$; with $N = 32$, $1 - 0.85^{32} = 0.9944$. Hard labels with many rollouts measure "can this prefix still be completed correctly", which is close to "any step" when answers can be guessed — for example multiple-choice problems or answers that are small integers. Soft labels degrade gracefully: $\hat v_t$ averages $0.15$, below the values of correct prefixes, so a threshold or a ranking can still separate them. Zhang et al. (2025), from the Qwen team, reported that PRMs trained on Monte Carlo labels identified erroneous steps less reliably than those trained on labels from a strong model acting as a judge or from humans, and that best-of-$n$ evaluation alone can hide this because it rewards final-answer accuracy.
:::
:::

How well PRMs actually locate errors is measured directly by benchmarks such as ProcessBench (Zheng et al., 2024), which asks for the index of the earliest erroneous step in competition-mathematics solutions. Its authors reported that existing open PRMs often did worse at this than general-purpose models prompted to critique a solution step by step — a reminder that "PRM" names a training target, not a guarantee.

::: warning A process reward is not a correctness oracle
A PRM is a learned model with its own errors and blind spots, trained either on human labels for one generator's solutions or on Monte Carlo values that conflate "correct" with "completable". Two consequences: its scores drift when the policy that writes the steps changes (the training distribution was another policy's steps), and a policy optimised against it will find steps it misjudges. Treat PRM scores as evidence to be validated on held-out, human-checked solutions, and track trace error as well as final-answer accuracy.
:::

## Using rewards: selection, search and training {#sec-uses}

A reward model can be used in three ways, in increasing order of the pressure put on it.

1. **Selection.** Best-of-$n$ or verifier-weighted voting ([[reasoning/self-consistency#def-bon]]). The policy is fixed; the reward only chooses among its samples.
2. **Search.** A PRM scores partial solutions, so a search procedure can expand promising prefixes and abandon bad ones before finishing them ([[reasoning/search]]). Only a PRM, or a value model in the sense of [[#prop-orm-value]], can do this; an ORM of complete solutions cannot.
3. **Training.** The reward drives reinforcement learning. An outcome reward is **sparse**: one number at the end of a long sequence, from which the learner must work out which tokens mattered. A process reward is **dense**: a signal at every step, which in principle eases credit assignment ([[reasoning/verifiable-rewards]] develops the outcome-reward case).

The more the policy is optimised against a learned reward, the more it exploits the reward's errors. Selection with small $n$ is mild; reinforcement learning over thousands of steps is not.

::: definition Reward hacking {#def-hacking}
**Reward hacking** is the increase of a proxy reward $r_\phi$ through behaviour that does not increase, or decreases, the intended objective $r^\star$ — for example solutions that a PRM scores highly because they are phrased confidently, repeat a correct step many times, or split reasoning into many trivially correct steps.
:::

How much does a selection procedure change the distribution of outputs? For best-of-$n$ there is an exact answer, which Gao et al. (2023) used to compare best-of-$n$ with reinforcement learning on a common scale.

::: theorem Divergence of best-of-n {#thm-bon-kl}
Let $\pi$ be a base policy and $r$ a reward whose distribution under $\pi$ is continuous (no ties). Let $\pi_n$ be the distribution of the best of $n$ independent samples from $\pi$ by $r$. Then

$$
\mathrm{KL}(\pi_n\,\Vert\,\pi) = \ln n - \frac{n-1}{n}.
$$ {#eq-bon-kl}
:::

::: proof
Let $F$ be the cumulative distribution function of $r(y)$ under $y\sim\pi$, and $U = F(r(y))$ the quantile of a sample's reward. Under $\pi$, $U$ is uniform on $[0,1]$ because $F$ is continuous. Under $\pi_n$, $U$ is the maximum of $n$ independent uniforms, with density $g(u) = n u^{n-1}$. Given $U = u$, the conditional distribution of $y$ is the same under both policies: best-of-$n$ selects by reward only, so among outputs with a given reward it picks as $\pi$ would. By the chain rule for relative entropy the divergence of the joint laws of $(U, y)$ is the divergence of the laws of $U$ plus the expected divergence of the conditionals, which is $0$, so

$$
\mathrm{KL}(\pi_n\Vert\pi) = \int_0^1 n u^{n-1}\ln\big(n u^{n-1}\big)\,du = \ln n + n(n-1)\int_0^1 u^{n-1}\ln u\,du.
$$

Integration by parts gives $\int_0^1u^{n-1}\ln u\,du = \big[\tfrac{u^n}{n}\ln u\big]_0^1 - \int_0^1\tfrac{u^{n-1}}{n}du = -\tfrac1{n^2}$, so $\mathrm{KL} = \ln n - (n-1)/n$.
:::

::: example Best-of-n on a KL budget {#ex-kl-budget}
A reinforcement-learning run is allowed to move $3$ nats from its initial policy. Which best-of-$n$ moves about the same distance?
::: solution
Solve $\ln n - (n-1)/n = 3$. Since $(n-1)/n\approx1$, $n\approx e^4\approx55$; checking, $n = 53$ gives $2.989$, $n = 54$ gives $3.008$. So best-of-$54$ sits at the same divergence. Gao et al. used this correspondence to plot best-of-$n$ and reinforcement learning on one axis, finding that the two methods follow differently shaped curves of gold reward against divergence. Best-of-$n$ costs $n$ samples per query at inference; reinforcement learning is a one-off training cost.
:::
:::

For discrete outputs with ties the formula is an upper bound (Beirami et al., 2024). It grows only logarithmically: best-of-$16$ is $1.83$ nats from the base policy, best-of-$256$ is $4.55$. Gao et al. trained a "gold" reward model to stand in for human judgement and smaller "proxy" reward models on its labels, then optimised against the proxies by best-of-$n$ and by reinforcement learning. The gold reward first rose and then fell as the divergence from the initial policy grew, with a peak that moved further out for larger proxy reward models. They fitted the gold reward as $d(\alpha - \beta d)$ for best-of-$n$, with $d = \sqrt{\mathrm{KL}}$ — an empirical fit, not a law, but a vivid summary of over-optimisation.

::: widget plot
f: sqrt(log(x) - (x - 1)/x)*(1 - 0.35*sqrt(log(x) - (x - 1)/x)); sqrt(log(x) - (x - 1)/x)*(1 - b*sqrt(log(x) - (x - 1)/x))
x: 1, 1000
y: -0.2, 1
sliders: b=0.2:0.05:0.6:0.01
labels: true reward, $d(1-0.35d)$; true reward with over-optimisation coefficient $b$
caption: An illustration of over-optimisation under best-of-$n$, using the functional form fitted by Gao et al. (2023): the true ("gold") reward is $d(\alpha - \beta d)$ with $d = \sqrt{\mathrm{KL}}$ and $\mathrm{KL} = \ln n - (n-1)/n$ from [[#thm-bon-kl]] ($\alpha = 1$ here; the coefficients are made up for display). The horizontal axis is $n$. A proxy reward keeps rising with $n$; the true reward peaks and declines. A smaller $b$ — in Gao et al.'s experiments, a larger reward model — moves the peak to larger $n$.
:::

### Why DeepSeek-R1 did not use a PRM {#sec-r1-prm}

The DeepSeek-R1 report (DeepSeek-AI, 2025) trained its reasoning models with rule-based rewards only — answer checking and format checks — and explained why in a section on unsuccessful attempts. Process reward models, it said, face three obstacles: it is hard to define a fine-grained "step" in general reasoning; it is hard to determine whether an intermediate step is correct, since automatic labelling is unreliable and human labelling does not scale; and once a model-based PRM is introduced, reward hacking follows, while retraining the reward model adds cost and complexity. The report concluded that PRMs remained useful for reranking and guided search but that their advantages were limited compared with the additional computation in its large-scale reinforcement-learning setting. This is a report of one team's experience with one recipe, not a general result, and PRMs remain an active research area as of 2026; but it explains why the next chapter centres on *verifiable outcome* rewards.

::: quiz
An ORM is trained, with cross-entropy at every prefix, on solutions from policy $\pi$ labelled by final-answer correctness. Which statements are correct? (Select all that apply.)
- [x] Its ideal prediction at a prefix is the probability that $\pi$ completes that prefix correctly.
- [ ] Its ideal prediction at a prefix is the probability that the prefix contains no error.
- [x] If the policy is later changed by training, the ORM's predictions may no longer be the new policy's values.
- [ ] Best-of-$n$ with this ORM is guaranteed to improve as $n$ grows.
::: solution
By [[#prop-orm-value]] the minimiser is the value under the policy that generated the training data, not the correctness of the prefix; it therefore depends on that policy. Best-of-$n$ with any imperfect scorer can decline at large $n$ ([[reasoning/self-consistency#sec-verifier]]).
:::
:::

## A numerical laboratory {#sec-code}

The listing simulates a generator whose solutions have $8$ steps, with problem-dependent step accuracy between $0.80$ and $0.98$; once a step is wrong the rest are wrong too, but the final answer is still right with probability $0.15$. It compares best-of-$16$ selection by an ORM (which sees the final answer through Gaussian noise) and by a PRM (which sees every step through the *same* noise and takes the minimum), then computes Monte Carlo step labels and the KL divergence of best-of-$n$.

```python
import math, random
rng = random.Random(2)
S, LUCKY = 8, 0.15            # steps per solution; P(right answer | some step wrong)

def solve(q, prefix=()):
    """Continue a solution from a prefix of step-correctness flags; return (steps, answer_ok)."""
    steps = list(prefix)
    while len(steps) < S:
        steps.append(all(steps) and rng.random() < q)   # after an error, later steps are wrong too
    ok = all(steps) or rng.random() < LUCKY
    return steps, ok

def orm(steps, ok):           # outcome verifier: the final answer seen through noise
    return ok + rng.gauss(0, 0.6)
def prm(steps, ok):           # process verifier: each step seen through the same noise; min
    return min(s + rng.gauss(0, 0.6) for s in steps)

# 1. Best-of-16 selection: final-answer accuracy and trace errors among correct answers
for name, score in [("ORM", orm), ("PRM", prm)]:
    acc = trace_err = 0
    problems = 3000
    for _ in range(problems):
        q = rng.uniform(0.80, 0.98)
        cands = [solve(q) for _ in range(16)]
        steps, ok = max(cands, key=lambda c: score(*c))
        acc += ok
        trace_err += ok and not all(steps)
    print(f"{name}: answer accuracy {acc / problems:.3f}, "
          f"right answer with a wrong step {trace_err / max(acc, 1):.3f} of correct answers")

# 2. Monte Carlo step labels (Math-Shepherd style) with N completions from each prefix
q, N = 0.9, 8
print("\nprefix              true value   soft label   hard label")
for prefix in [(True,), (True,) * 4, (True, False), (True,) * 4 + (False,)]:
    v = q**(S - len(prefix)) + (1 - q**(S - len(prefix))) * LUCKY if all(prefix) else LUCKY
    wins = sum(solve(q, prefix)[1] for _ in range(N))
    tag = "".join("+" if s else "-" for s in prefix)
    print(f"{tag:18s}  {v:10.3f}   {wins / N:10.3f}   {int(wins > 0):10d}")
hard_fp = 1 - (1 - LUCKY)**N
print(f"P(hard label says 'good' after a wrong step) = 1 - (1 - {LUCKY})^{N} = {hard_fp:.3f}")

# 3. KL divergence of best-of-n from the base policy
for n in [2, 4, 16, 64, 256]:
    print(f"best-of-{n:<3d}  KL = ln n - (n-1)/n = {math.log(n) - (n - 1) / n:.3f} nats")
```

```text
ORM: answer accuracy 0.953, right answer with a wrong step 0.190 of correct answers
PRM: answer accuracy 0.928, right answer with a wrong step 0.015 of correct answers

prefix              true value   soft label   hard label
+                        0.557        0.750            1
++++                     0.708        0.875            1
+-                       0.150        0.125            1
++++-                    0.150        0.125            1
P(hard label says 'good' after a wrong step) = 1 - (1 - 0.15)^8 = 0.728
best-of-2    KL = ln n - (n-1)/n = 0.193 nats
best-of-4    KL = ln n - (n-1)/n = 0.636 nats
best-of-16   KL = ln n - (n-1)/n = 1.835 nats
best-of-64   KL = ln n - (n-1)/n = 3.175 nats
best-of-256  KL = ln n - (n-1)/n = 4.549 nats
```

With equally noisy views, the two verifiers reach similar final-answer accuracy (the ORM slightly higher here: it looks at one noisy number, the PRM's minimum over eight noisy numbers is noisier), but the ORM's selected correct answers contain a wrong step $19\%$ of the time against $1.5\%$ for the PRM — the pattern Uesato et al. reported. The Monte Carlo labels show both biases of [[#prop-mc]]: the soft labels are noisy estimates of the values ($8$ rollouts give a standard error of about $0.17$), the correct one-step prefix has a value of only $0.56$, and every hard label is $1$ — including those after wrong steps.

::: history
Training verifiers to rank solutions goes back to Cobbe et al. (2021), whose GSM8K verifier was an outcome model trained at every token. Uesato et al. (2022) compared process- and outcome-based feedback on GSM8K and introduced trace error as a metric. Lightman et al. posted *Let's verify step by step* in May 2023 (ICLR 2024) with PRM800K. Gao, Schulman and Hilton (2023) measured reward-model over-optimisation with a synthetic gold reward. Wang et al. (Math-Shepherd, 2023; ACL 2024) produced process labels automatically by Monte Carlo rollouts, and Luo et al. (2024) accelerated them with binary search (OmegaPRM). The DeepSeek-R1 report (January 2025) explained its decision against learned process rewards, and ProcessBench (Zheng et al., 2024) and the Qwen team's study of PRM training (Zhang et al., 2025) examined how well PRMs find errors.
:::

::: summary
- An **ORM** predicts final-answer correctness; trained with cross-entropy on every prefix of a policy's solutions, it learns the **value** $\Prob_\pi(\text{correct}\mid\text{prefix})$ of that policy, not the correctness of the prefix.
- A **PRM** predicts the correctness of each step; step scores are aggregated by product (probability that all steps are correct, which penalises length) or minimum.
- Uesato et al. (2022) found similar final-answer error for outcome and process supervision but much lower **trace error** with process feedback; Lightman et al. (2023) found PRM-based best-of-$1860$ selection at $78.2\%$ on MATH-500 against $72.4\%$ for an ORM and $69.6\%$ for majority voting, using the **PRM800K** human labels.
- **Monte Carlo labels** (Math-Shepherd) estimate prefix values by rollouts: the soft label is unbiased for the value, the hard label is $1$ with probability $1 - (1-v)^N$ and marks wrong steps as good when lucky completions exist.
- Optimising against a learned reward invites **reward hacking**; best-of-$n$ moves $\ln n - (n-1)/n$ nats from the base policy, and the true reward rises then falls as divergence grows. DeepSeek-R1 avoided learned rewards in large-scale RL for these reasons.
:::

## Exercises

::: exercise Product aggregation {level=1 check="0.684"}
A PRM gives the three steps of a solution scores $0.9$, $0.95$ and $0.8$. What is the product-aggregated score? What is the minimum?
::: solution
Product: $0.9\cdot0.95\cdot0.8 = 0.684$. Minimum: $0.8$.
:::
:::

::: exercise Hard labels with a low value {level=1 check="0.8322"}
A prefix has value $v = 0.2$ under the completer. With $N = 8$ rollouts, what is the probability that its hard Monte Carlo label is $1$? Give four decimal places.
::: solution
$1 - 0.8^8 = 1 - 0.16777 = 0.8322$.
:::
:::

::: exercise Steps per solution {level=1 check="10.67"}
PRM800K contains about $800{,}000$ step labels on about $75{,}000$ solutions. How many labelled steps per solution is that on average? Give two decimal places.
::: solution
$800{,}000/75{,}000 = 10.67$.
:::
:::

::: exercise The cost of Monte Carlo labels {level=2 check="24000"}
Labelling a $10$-step solution with [[#alg-mc-labels]] uses $N = 8$ rollouts from every prefix, and a rollout generates $300$ tokens on average. How many tokens are generated to label one solution? Comment on the cost of labelling $100{,}000$ solutions.
::: solution
$10\cdot8\cdot300 = 24{,}000$ tokens. For $100{,}000$ solutions that is $2.4\times10^9$ generated tokens — far cheaper than human labelling, but a substantial inference job; binary search for the first error (OmegaPRM) reduces the number of prefixes rolled out from $T$ to about $\log_2T$.
:::
:::

::: exercise Best-of-n divergence {level=2 check="1.835"}
Compute the KL divergence of best-of-$16$ from the base policy, by [[#thm-bon-kl]], to three decimal places. How large must $n$ be for the divergence to exceed $5$ nats?
::: solution
$\ln16 - 15/16 = 2.7726 - 0.9375 = 1.835$. For $5$ nats we need $\ln n - (n-1)/n > 5$, so $\ln n > 5 + (n-1)/n\approx 6$, giving $n\approx e^6\approx403$; checking, $n = 403$ gives $5.9989 - 0.9975 = 5.0014$ while $n = 402$ gives $4.999$, so $n = 403$. Divergence grows so slowly with $n$ that best-of-$n$ is a gentle form of optimisation compared with reinforcement learning, which can move much further from its starting point.
:::
:::

::: exercise Which aggregation? {level=2}
A policy is trained with reinforcement learning against a PRM. Describe how it might exploit (a) product aggregation and (b) minimum aggregation, and propose a check that would detect each exploit.
::: solution
(a) The product decreases with the number of steps whenever scores are below $1$ ([[#prop-aggregate]]), so the policy can raise its reward by writing fewer, longer steps — merging several operations into one line or skipping explanations — even if this makes errors harder to see. Detect it by tracking the number of steps per solution and the average step length during training, and by human checks of trace error. (b) The minimum ignores everything except the weakest step, so the policy can pad solutions with many easy, confidently correct steps without cost, or split one risky operation so that the PRM sees only innocuous fragments. Detect it by tracking solution length and repetition, and by testing the PRM's ability to locate injected errors in policy-generated solutions as training proceeds. In both cases, keep a held-out set graded by humans or exact checks and watch for proxy reward rising while true accuracy stalls.
:::
:::

::: exercise A prefix that cannot be finished {level=2}
For a hard problem, a correct first step has value $v_1 = 0.05$ under the completer, while for the same problem a wrong first step that happens to produce an easy (but wrong) sub-problem leads to the reference answer with probability $0.10$, because the reference answer is a small integer that is often guessed. Which prefix gets the higher soft label in expectation? What does this imply for a PRM trained on such labels and used in search?
::: solution
By [[#prop-mc]] the soft labels average $0.05$ and $0.10$: the wrong step scores higher. A PRM trained on such labels learns to prefer it, and a search guided by that PRM ([[reasoning/search]]) would expand the wrong branch first. Monte Carlo labels measure completability by a particular policy, which on hard problems can be dominated by guessing; remedies include problems whose answers are hard to guess, soft labels combined with human or model-judge labels, and estimating the *change* in value caused by a step rather than its absolute level.
:::
:::

::: exercise The ORM as a value function {level=3}
(a) Extend [[#prop-orm-value]]: if the ORM is trained with squared error $(r_\phi - o)^2$ instead of cross-entropy, what is the minimiser? (b) Show that the true value satisfies $V(s_{\le t}) = \E_\pi\big[V(s_{\le t+1})\mid s_{\le t}\big]$, and explain how this "consistency" condition could be used to check a trained PRM or value model without any labels.
::: solution
(a) For fixed input $h$ the expected loss is $\E[(r - o)^2\mid h] = (r - \bar o)^2 + \Var(o\mid h)$, minimised at $r = \bar o(h)$: the same conditional expectation. Any proper scoring rule has the conditional probability as minimiser.

(b) By the tower property, $V(s_{\le t}) = \Prob(o = 1\mid s_{\le t}) = \E\big[\Prob(o = 1\mid s_{\le t+1})\mid s_{\le t}\big] = \E[V(s_{\le t+1})\mid s_{\le t}]$, the expectation being over the next step drawn from $\pi$. To check a trained model, sample many next steps from each prefix, score them, and compare the average of the scores with the score of the prefix: a large discrepancy shows that the model is not a consistent value function for $\pi$. This is the same Bellman-type condition that temporal-difference learning enforces.
:::
:::

::: exercise Binary search for the first error {level=3}
Assume that the value $v_t$ of the prefixes of a solution is high (above $0.5$) before its first error and low after it, and that one Monte Carlo estimate with enough rollouts tells which side of $0.5$ a prefix is on. Write a plain-Python function that finds the first error with $O(\log T)$ estimates, and test it with a simulated completer.
::: solution
```python
import random
rng = random.Random(3)

def estimate(prefix_ok, N=32):
    """Monte Carlo value of a prefix: 0.8 if no error yet, 0.1 after an error."""
    v = 0.8 if prefix_ok else 0.1
    return sum(rng.random() < v for _ in range(N)) / N

def first_error(steps_ok):
    lo, hi = 0, len(steps_ok)                 # invariant: prefix of length lo is fine, of length hi is bad
    if estimate(all(steps_ok)) > 0.5:
        return None, 1                        # no error found
    calls = 1
    while hi - lo > 1:
        mid = (lo + hi) // 2
        calls += 1
        if estimate(all(steps_ok[:mid])) > 0.5:
            lo = mid
        else:
            hi = mid
    return hi, calls                          # 1-based index of the first wrong step

steps = [True] * 13 + [False] * 7             # first error at step 14 of 20
print(first_error(steps))
```

```text
(14, 6)
```

Six estimates (one for the full solution, five bisections of $20$ positions) instead of $20$. The monotonicity assumption is what OmegaPRM relies on; it fails when the completer often recovers from errors, which is the bias discussed after [[#prop-mc]].
:::
:::
