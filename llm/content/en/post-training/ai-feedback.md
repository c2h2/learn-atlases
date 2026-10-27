Every method so far has needed people: to write demonstrations ([[post-training/instruction-tuning]]), to compare responses for a reward model ([[post-training/reward-models]]), or to supply the preference pairs of DPO ([[post-training/preference-optimisation]]). Human feedback is slow and expensive, varies between labellers, is unpleasant to collect for harmful content, and becomes unreliable when the responses are too long or too technical to check. Since language models can themselves read, compare and criticise text, an obvious idea is to let a model provide some of the feedback. **AI feedback** does this: a model, guided by instructions or written principles, labels the data that trains another model — or itself.

This chapter describes the two founding methods carefully, from their papers. **Constitutional AI** (Bai et al., 2022b) trained a harmless assistant from a short list of natural-language principles, with AI-generated critiques, revisions and preference labels replacing human labels of harm. **RLAIF** (Lee et al., 2023) compared AI and human preference labels directly for RL. It then treats the model as a **judge**: the documented biases of language-model judges, a proof that swapping the order of responses removes position bias in a simple model, and what label noise does to a reward model. It ends with self-improvement loops and the limits of having models oversee models.

## Feedback from a model {#sec-definitions}

::: definition AI feedback {#def-ai-feedback}
**AI feedback** is any training signal for a model $\pi_\theta$ that is produced by a language model $J$ — the **feedback model** or **judge** — rather than by people. Common forms are: **preference labels**, $J$'s choice of the better of two responses (or its probability for each); **scores** on a scale; **critiques**, free-text descriptions of a response's flaws; and **revisions**, improved responses written by $J$. The judge is steered by a prompt that states the criteria, often a set of written **principles**, and may be the same model as the policy, an earlier version of it, or a different model.
:::

::: definition Reinforcement learning from AI feedback (RLAIF) {#def-rlaif}
**RLAIF** is the RLHF pipeline of [[post-training/rlhf#alg-pipeline]] with the human comparisons in stage 2 replaced, wholly or in part, by AI preference labels; the reward model is trained on these labels and the policy is optimised against it. In **direct RLAIF**, the reward model is dropped and the judge scores each sampled response during RL.
:::

AI feedback does not remove people from the process; it moves them. Instead of labelling thousands of examples, people write the principles and prompts, choose the judge, and check samples of its labels. Whether this is a gain depends on whether the judge applies the principles more consistently and cheaply than labellers would, and on whether its errors are ones the policy can exploit.

## Constitutional AI {#sec-cai}

Bai et al. (2022b) at Anthropic set out to train an assistant that is harmless without being evasive — that engages with a sensitive request by explaining its objection rather than refusing flatly — without human labels of harmfulness. The only human oversight of harmlessness was a **constitution**: a list of short principles, written in natural language, such as instructions to choose the response that is less harmful, less unethical or less likely to assist with illegal activity. Human labels were still used for *helpfulness*. The method has two stages.

::: algorithm Constitutional AI, supervised stage (SL-CAI) {#alg-cai-sl}
Start from a **helpful-only** model, trained with RLHF on helpfulness data alone, which tends to comply with harmful requests.
1. Prompt it with a **red-teaming** prompt designed to elicit harmful behaviour, and sample a response.
2. Append a **critique request** built from a principle drawn at random from the constitution, asking the model to identify ways in which its response is harmful, unethical or otherwise objectionable; sample the critique.
3. Append a **revision request** asking the model to rewrite its response to remove the problems identified; sample the revision.
4. Optionally repeat steps 2–3 with further randomly drawn principles.
5. Fine-tune a pretrained model with SFT on the final revisions (together with ordinary helpful responses to non-harmful prompts, to preserve helpfulness).
:::

Few-shot examples of critiques and revisions were placed in the context to show the format. Bai et al. found that the revisions became progressively less harmful with more rounds, and that critiquing before revising helped smaller models more than revising directly. The supervised stage shifts the distribution of responses into a reasonable region; the second stage refines it with RL.

::: algorithm Constitutional AI, RL stage (RL-CAI) {#alg-cai-rl}
1. For red-teaming prompts, sample **pairs** of responses from the SL-CAI model.
2. Present each pair to a **feedback model** as a multiple-choice question — which response better satisfies a principle drawn at random from the constitution — and record the normalised probabilities it assigns to the two options. These soft labels are the AI harmlessness preferences.
3. Train a **preference model** (a reward model) on a mixture of these AI harmlessness comparisons and *human* helpfulness comparisons.
4. Optimise the SL-CAI model with RL against the preference model, as in RLHF.
:::

The paper also tested **chain-of-thought** prompting for the feedback model: asking it to reason step by step before choosing. This improved agreement with human judgements of harmlessness for the larger models, but made the probabilities very confident; the authors clamped chain-of-thought labels to the range $40$–$60\%$, so that a single confident judgement could not dominate training and the policy would not be pushed to extremes.

Bai et al. reported that the RL-CAI models were judged by crowdworkers to be more harmless than models trained with RLHF on human harmlessness labels, at similar helpfulness, and much less evasive: they tended to engage and explain rather than refuse. They also noted that RL-CAI models trained too hard could become "preachy" or boilerplate in their objections, an over-optimisation of the AI feedback. The authors presented the method as a step towards **scalable oversight** — using AI to help supervise AI ([[safety-alignment/scalable-oversight]]) — and stressed that the constitution makes the training objective's values explicit and editable, while leaving open who should choose them.

::: example Soft labels from option probabilities {#ex-soft-labels}
A feedback model is asked which of responses (A) and (B) is less harmful, and its log-probabilities for the answer tokens "A" and "B" are $-0.3$ and $-1.5$. What soft label does the CAI procedure produce for the pair? If the feedback model had reasoned with chain of thought first and given $0.97$ for (A), what label would the clamping give?
::: solution
Normalise over the two options: $P(\text{A}) = e^{-0.3}/(e^{-0.3} + e^{-1.5}) = \sigma(1.2) = 0.769$. The preference model is trained on cross-entropy with target $0.769$ for "A is better", which by [[post-training/reward-models#prop-rm-props]] is minimised at a reward gap of $\operatorname{logit}0.769 = 1.2$. With chain of thought and clamping to $[0.4, 0.6]$, the label becomes $0.6$, which corresponds to a gap of only $\operatorname{logit}0.6 = 0.405$.
:::
:::

## RLAIF versus RLHF {#sec-rlaif}

Constitutional AI mixed AI harmlessness labels with human helpfulness labels. Lee et al. (2023) asked a more direct question: if AI labels replace human labels entirely, does RL from them perform as well? They used an off-the-shelf large language model (PaLM 2) as the labeller on three tasks — summarisation of Reddit posts, helpful dialogue and harmless dialogue — and compared policies trained with RLAIF and with RLHF on the same prompts.

Their reported findings were these. On summarisation, human evaluators preferred RLAIF outputs to the SFT baseline about $71\%$ of the time and RLHF outputs about $73\%$ of the time, a difference the authors did not find statistically significant, and in head-to-head comparisons RLAIF and RLHF were preferred about equally often. On harmless dialogue, the fraction of responses rated harmless was highest for RLAIF ($88\%$), then RLHF ($76\%$), then SFT ($64\%$). RLAIF worked even when the AI labeller was the same size as the policy, a form of self-improvement. **Direct RLAIF**, in which the language model scored responses from 1 to 10 during RL instead of training a reward model, did better than the standard two-step version in their experiments, at the cost of a judge call per sample. On labelling technique, detailed instructions and chain-of-thought reasoning improved agreement with human labels, few-shot examples did not consistently help, and position bias was reduced by querying both orders and averaging — the subject of the next section. They estimated AI labelling to be more than ten times cheaper than human labelling.

These are results for particular tasks, models and evaluations; they show that AI preferences can substitute for human ones where the judge is competent at the task and the criteria are clear, not that they always can.

## Models as judges {#sec-judges}

AI feedback and model-based evaluation ([[evaluation/model-judges]]) rely on the same capability: a model reading candidate responses and judging them. Zheng et al. (2023) studied this systematically with MT-Bench and Chatbot Arena, finding that a strong judge model (GPT-4 at the time) agreed with human preferences over $80\%$ of the time, about the level at which humans agreed with each other. They also documented biases that later work confirmed and extended:

- **Position bias.** Judges favour the response in a particular position, usually the first; Wang et al. (2023) showed that simply swapping the order could change which of two systems a judge ranked higher.
- **Verbosity bias.** Judges favour longer responses, even when the extra length adds nothing; Dubois et al. (2024) built a length-controlled version of the AlpacaEval benchmark that regresses out the length difference.
- **Self-preference.** Judges rate their own outputs, or those of their own model family, more highly; Panickssery et al. (2024) found that this correlated with the model's ability to recognise its own outputs.
- **Limited competence.** A judge cannot reliably grade a mathematical or coding answer it could not produce itself; reference answers or execution help.
- **Sensitivity to style and authority.** Confident tone, formatting, and claims of correctness inside the response can sway judges.

Some biases can be removed by design, others not. Position bias has a clean fix.

::: proposition Swapping the order removes a constant position bias {#prop-swap}
Suppose a judge comparing $\mathbf{y}_1$ and $\mathbf{y}_2$ prefers the response shown first with probability $\sigma(\Delta + b)$ when $\mathbf{y}_1$ is first, and the response shown first with probability $\sigma(-\Delta + b)$ when $\mathbf{y}_2$ is first, where $\Delta$ is the judge's underlying quality difference and $b$ a position bias. Let $p_{12}$ and $p_{21}$ be the probabilities that it picks $\mathbf{y}_1$ in the two orders. Then

$$
\tfrac12\big(\operatorname{logit}p_{12} + \operatorname{logit}p_{21}\big) = \Delta,\qquad \tfrac12\big(\operatorname{logit}p_{12} - \operatorname{logit}p_{21}\big) = b,
$$

so averaging the log-odds of the two orders recovers $\Delta$ exactly and their difference measures the bias. Averaging the probabilities instead gives $\frac12(\sigma(\Delta + b) + \sigma(\Delta - b))$, which has the same sign relative to $\frac12$ as $\Delta$ but is shrunk towards $\frac12$.
:::

::: proof
$p_{12} = \sigma(\Delta + b)$, and $p_{21} = 1 - \sigma(-\Delta + b) = \sigma(\Delta - b)$ because $1 - \sigma(z) = \sigma(-z)$. The logit inverts $\sigma$, so $\operatorname{logit}p_{12} = \Delta + b$ and $\operatorname{logit}p_{21} = \Delta - b$; their half-sum and half-difference are $\Delta$ and $b$. For the probability average, $g(\Delta) = \frac12(\sigma(\Delta + b) + \sigma(\Delta - b))$ is increasing with $g(0) = \frac12(\sigma(b) + \sigma(-b)) = \frac12$, so $g(\Delta) > \frac12$ exactly when $\Delta > 0$; and $\lvert g(\Delta) - \frac12\rvert < \lvert\sigma(\Delta) - \frac12\rvert$ for $b\ne0$ because $\sigma$ is concave on $[0, \infty)$, so averaging values at $\Delta\pm b$ lowers it.
:::

::: widget plot
f: 1/(1 + exp(-(x + b))); 1/(1 + exp(-(x - b))); 0.5*(1/(1 + exp(-(x + b))) + 1/(1 + exp(-(x - b)))); 1/(1 + exp(-x))
x: -5, 5
y: 0, 1
sliders: b=0.8:0:3:0.1
labels: $\mathbf{y}_1$ shown first; $\mathbf{y}_1$ shown second; average of the two probabilities; unbiased $\sigma(\Delta)$
hlines: 0.5
caption: A position-biased judge under the model of [[#prop-swap]]: the probability of picking $\mathbf{y}_1$ as a function of the quality difference $\Delta$, when it is shown first (shifted left by $b$) or second (shifted right). At $\Delta = 0$ the verdict depends only on the order. The average of the two probabilities crosses $\frac12$ at the right place but is flatter than the unbiased curve; averaging the log-odds instead recovers the unbiased curve exactly.
:::

The proposition rests on a model in which the bias is a constant shift of the log-odds. Verbosity bias is different in kind: it depends on the responses themselves, so it is present in both orders and survives the swap. It must be addressed by controlling for length, instructing the judge, or making it a feature of the reward that is explicitly penalised.

### A simulated judge {#sec-code}

The listing simulates $20{,}000$ comparisons between responses with independent random qualities and lengths. The judge has a position bias $b = 0.8$ and a verbosity weight $v = 0.5$; a simulated human labels by quality alone, with the same noise level. It measures how often each labelling scheme picks the truly better response.

```python
import math, random

def sig(z):
    return 1 / (1 + math.exp(-z))

def logit(p):
    return math.log(p / (1 - p))

def judge(q_first, q_second, len_first, len_second, b=0.8, v=0.5, k=2.0):
    """Probability that a simulated judge prefers the response shown FIRST.
    b: position bias towards the first slot; v: weight on length; k: sharpness."""
    return sig(k * ((q_first - q_second) + v * (len_first - len_second)) + b)

rng = random.Random(0)
N = 20000
stats = {"one order, sampled": 0, "one order, thresholded": 0, "average of both orders": 0, "human label": 0}
flips = 0
for _ in range(N):
    qa, qb = rng.gauss(0, 1), rng.gauss(0, 1)        # true qualities
    la, lb = rng.gauss(0, 1), rng.gauss(0, 1)        # standardised lengths, independent of quality
    better_a = qa > qb
    p_ab = judge(qa, qb, la, lb)                     # A shown first: P(judge picks A)
    p_ba = 1 - judge(qb, qa, lb, la)                 # B shown first: P(judge picks A)
    pick1 = rng.random() < p_ab                      # one sampled verdict, A always first
    pick2 = 0.5 * (logit(p_ab) + logit(p_ba)) > 0    # debiased: average the log-odds
    human = rng.random() < sig(2 * (qa - qb))        # a noisy human label
    stats["one order, sampled"] += pick1 == better_a
    stats["one order, thresholded"] += (p_ab > 0.5) == better_a
    stats["average of both orders"] += pick2 == better_a
    stats["human label"] += human == better_a
    flips += (p_ab > 0.5) != (p_ba > 0.5)            # verdict changes when the order is swapped
for name, c in stats.items():
    print(f"agreement with the truly better response, {name:22s} {c / N:.3f}")
print(f"verdicts that flip when the order is swapped: {flips / N:.3f}")

# length bias survives swapping: pairs of equal quality, A longer by one standard deviation
p_ab = judge(0, 0, 1, 0); p_ba = 1 - judge(0, 0, 0, 1)
print(f"equal quality, A longer: debiased P(A) = {sig(0.5 * (logit(p_ab) + logit(p_ba))):.3f}")
```

```text
agreement with the truly better response, one order, sampled     0.775
agreement with the truly better response, one order, thresholded 0.832
agreement with the truly better response, average of both orders 0.852
agreement with the truly better response, human label            0.826
verdicts that flip when the order is swapped: 0.201
equal quality, A longer: debiased P(A) = 0.731
```

A fifth of the judge's verdicts change when the order is swapped. Querying both orders and averaging the log-odds removes the position bias and gives the best agreement here — better than a single sampled human label, because the judge's probabilities are used instead of one noisy draw. The verbosity bias, however, remains: for two responses of equal quality, the longer one is preferred $73\%$ of the time even after debiasing. A reward model trained on these labels would learn to reward length, and a policy optimised against it would learn to write more ([[post-training/reward-models#sec-overoptimisation]]).

::: example Debiasing a pair {#ex-debias}
A judge picks response A with probability $0.8$ when A is shown first, and with probability $0.4$ when A is shown second. Estimate the position bias and the debiased preference for A under the model of [[#prop-swap]].
::: solution
$\operatorname{logit}0.8 = \ln4 = 1.386$, $\operatorname{logit}0.4 = \ln(2/3) = -0.405$. Debiased log-odds $\frac12(1.386 - 0.405) = 0.490$, so $P(\text{A}\succ\text{B}) = \sigma(0.490) = 0.620$. Position bias $b = \frac12(1.386 + 0.405) = 0.896$ in favour of the first slot. Averaging the probabilities would give $0.6$, slightly flatter, as the proposition predicts.
:::
:::

### Label noise and the reward model {#sec-noise}

Even an unbiased judge makes errors. If they are independent of the content, they are less harmful than they look.

::: proposition Symmetric label noise compresses but preserves the ranking {#prop-noise}
Suppose true preferences follow Bradley–Terry with gap $\Delta$, and each label is independently flipped with probability $\varepsilon < \frac12$. The observed preference probability is

$$
p_{\text{obs}} = \varepsilon + (1 - 2\varepsilon)\,\sigma(\Delta),
$$

and a reward model trained to convergence on such labels learns the gap $\Delta' = \operatorname{logit}p_{\text{obs}}$, which has the same sign as $\Delta$, is a strictly increasing function of $\Delta$, and satisfies $\lvert\Delta'\rvert < \lvert\Delta\rvert$ for $\Delta\ne0$, with $\lvert\Delta'\rvert < \operatorname{logit}(1 - \varepsilon)$ for every $\Delta$.
:::

::: proof
The label says "$\mathbf{y}_1$ wins" if the true outcome was a win and was not flipped, or a loss and was flipped: $p_{\text{obs}} = (1-\varepsilon)\sigma(\Delta) + \varepsilon(1 - \sigma(\Delta)) = \varepsilon + (1 - 2\varepsilon)\sigma(\Delta)$. By [[post-training/reward-models#prop-rm-props]] the converged gap is $\operatorname{logit}p_{\text{obs}}$. Since $1 - 2\varepsilon > 0$, $p_{\text{obs}}$ is a strictly increasing affine function of $\sigma(\Delta)$ mapping $\frac12$ to $\frac12$, so the sign and order are preserved; it lies strictly between $\sigma(\Delta)$ and $\frac12$ for $\Delta\ne0$, and inside $(\varepsilon, 1 - \varepsilon)$, which gives both bounds.
:::

Uniform noise therefore only rescales the reward non-linearly and caps its range, which a KL-regularised optimiser can partly absorb by its choice of $\beta$. Noise that depends on the content — a judge that is wrong more often about long responses, about one language, or about responses resembling its own — does change the ranking, and is the kind that matters.

::: widget plot
f: n + (1 - 2*n)/(1 + exp(-x)); 1/(1 + exp(-x))
x: -6, 6
y: 0, 1
sliders: n=0.2:0:0.45:0.01
labels: observed preference with flip rate $\varepsilon$; noise-free $\sigma(\Delta)$
caption: The observed preference probability when each label is flipped with probability $\varepsilon$ (slider $n$), against the true reward gap $\Delta$ ([[#prop-noise]]). The curve keeps its shape and centre but is squeezed into $(\varepsilon, 1 - \varepsilon)$: a reward model trained on such labels ranks responses in the same order, with smaller and capped margins.
:::

::: example A compressed margin {#ex-noise}
Two responses have a true reward gap of $2$. A judge flips $20\%$ of labels at random. What gap will a reward model trained on many such labels learn?
::: solution
$\sigma(2) = 0.8808$; $p_{\text{obs}} = 0.2 + 0.6\cdot0.8808 = 0.7285$; $\Delta' = \ln(0.7285/0.2715) = 0.987$. The learned gap is less than half the true one, and no gap can exceed $\operatorname{logit}0.8 = 1.386$ however different the responses are.
:::
:::

::: quiz
A team uses a strong model to label preference pairs for a reward model, querying each pair in both orders and averaging the log-odds. Which problems remain?
- [ ] Constant position bias
- [x] Preference for longer responses
- [x] Preference for responses written in the judge's own style
- [x] Errors on problems the judge cannot solve itself
::: solution
Swapping and averaging removes a bias that depends only on the slot ([[#prop-swap]]). Biases that depend on the content of the responses — length, style, self-similarity — appear in both orders and survive, as do competence limits. They need other remedies: length control, references, execution, multiple judges, and human audits of samples.
:::
:::

## Self-improvement and synthetic preferences {#sec-self}

Once a model can judge, the policy and the judge need not be different models, and the loop can be repeated.

- **AI-labelled preference datasets.** UltraFeedback (Cui et al., 2023) collected responses to about $64{,}000$ prompts from a range of models and had a strong model rate them on helpfulness, honesty, truthfulness and instruction following. Zephyr (Tunstall et al., 2023) used it to train a $7$-billion-parameter model with DPO ("distilled DPO"), one of the first demonstrations that DPO on AI-labelled preferences could produce a capable chat model cheaply.
- **Self-rewarding language models.** Yuan et al. (2024) had a model generate responses, score them itself with a judging prompt, build preference pairs from its own scores and train itself with DPO, for several iterations; they reported that both its responses and its judging improved over three iterations on their benchmarks. The risk is that the model's biases as a judge reinforce its biases as a policy, with no external check.
- **Critique models.** Instead of a verdict, a model can produce a critique for a human to verify. McAleese et al. (2024) trained a model to critique code and reported that human reviewers assisted by it found more bugs than reviewers alone — AI feedback used to strengthen human oversight rather than replace it.
- **Specifications.** Later work had models reason explicitly over written specifications during training, with a judge model checking compliance with the specification as the reward (for example deliberative alignment, Guan et al., 2024), and trained input and output classifiers on synthetic data generated from a constitution to defend against jailbreaks (Sharma et al., 2025; see [[safety-alignment/robustness-jailbreaks]]).

::: warning AI feedback is still a proxy — and it is correlated with the policy
It is tempting to think that a judge "as good as a human" makes reward hacking go away. It does not: a policy optimised against an AI judge will find the judge's blind spots exactly as it finds a reward model's ([[post-training/reward-models#sec-overoptimisation]]), and the blind spots of a judge from the same model family as the policy are likely to be shared, so neither notices them. Agreement with humans on a static test set says little about agreement on the outputs of a policy trained to maximise the judge's score. Keep some independent human evaluation, use judges from different families, and look for systematic drifts such as growing length or flattery.
:::

### Whose principles? {#sec-values}

A constitution makes the values in a training signal explicit, which is an advantage over the implicit values of thousands of individual labelling decisions: it can be published, debated and revised. It does not settle which values should be written down. The choice of principles, their wording, the examples in the prompts and the judge model all shape the result, and different developers and communities will make different choices. Experiments with drafting a constitution from public input (Huang et al., 2024, "collective constitutional AI") are one response; documentation of what principles were used and how is another. These questions connect to fairness and to the governance of AI systems ([[llm-society]]) and to the alignment problem itself ([[safety-alignment/alignment-problem]]).

::: example The compute of AI labelling {#ex-label-cost}
A team labels $100{,}000$ preference pairs with a $70$-billion-parameter judge, querying both orders. Each query has $1{,}500$ input tokens (instructions, prompt and two responses) and $300$ output tokens (a short chain of thought and a verdict). Estimate the compute with $2N$ FLOPs per token, and compare it with one epoch of reward-model training on the same pairs with a $7$-billion-parameter model ($6N$ FLOPs per token, $1{,}200$ tokens per pair, counting both responses).
::: solution
Judge: $10^5\cdot2\cdot1800\cdot2\cdot7\times10^{10} = 5.04\times10^{19}$ FLOPs. Reward model: $10^5\cdot1200\cdot6\cdot7\times10^9 = 5.04\times10^{18}$ FLOPs. Labelling costs ten times the training — small next to pretraining, and with no human time, which is the scarce resource. Doubling the queries to remove position bias doubles the cost; dropping the chain of thought would cut it by about a sixth.
:::
:::

::: history
Using models to evaluate text has precedents in automatic metrics such as BLEU (Papineni et al., 2002) and in learned metrics such as BERTScore (Zhang et al., 2020). The proposal to use AI systems to help humans supervise AI systems on tasks too hard to evaluate directly — **scalable oversight** — was developed in work on debate (Irving, Christiano and Amodei, 2018), iterated amplification (Christiano et al., 2018) and recursive reward modelling (Leike et al., 2018). Askell et al. (2021) framed the goal of a helpful, honest and harmless assistant. Constitutional AI (Bai et al., 2022b) replaced human harmlessness labels with AI feedback guided by principles, and RLAIF (Lee et al., 2023; published at ICML 2024) compared AI and human preference labels head to head. In 2023, Zheng et al. characterised language-model judges and their biases, UltraFeedback (Cui et al.) and Zephyr (Tunstall et al.) made AI-labelled preferences a standard ingredient of open post-training, and in 2024 self-rewarding models (Yuan et al.), critique models (McAleese et al.) and collective constitutions (Huang et al.) extended the idea in different directions.
:::

::: summary
- **AI feedback** uses a model as judge, labeller, critic or reviser; **RLAIF** replaces human comparisons in RLHF by AI preferences, and **direct RLAIF** queries the judge during RL.
- **Constitutional AI** has a supervised stage — critique and revise harmful responses according to randomly drawn written principles, then fine-tune on the revisions — and an RL stage with AI harmlessness preferences, as soft labels, mixed with human helpfulness labels. It produced assistants reported to be more harmless and less evasive than RLHF on human harm labels.
- Lee et al. (2023) found RLAIF comparable to RLHF for summarisation and better for harmlessness in their experiments, at reported labelling costs over ten times lower.
- Model judges show **position**, **verbosity** and **self-preference** biases and competence limits. Averaging the log-odds of both orders removes a constant position bias exactly ([[#prop-swap]]); content-dependent biases survive.
- Symmetric label noise compresses and caps reward margins but preserves the ranking ([[#prop-noise]]); content-dependent noise does not.
- AI feedback is still a proxy, often correlated with the policy's own blind spots; and a constitution makes values explicit without deciding whose values they are.
:::

## Exercises

::: exercise A soft label {level=1 check="0.8176"}
A feedback model's log-probabilities for the options "A" and "B" are $-0.2$ and $-1.7$. What soft label for "A is better" does normalising over the two options give? Give four decimal places.
::: solution
$\sigma(-0.2 + 1.7) = \sigma(1.5) = 0.8176$.
:::
:::

::: exercise Clamping {level=1 check="0.4055"}
After clamping to $[0.4, 0.6]$, what is the largest reward gap that a reward model trained to convergence on a single clamped label can learn? Give four decimal places.
::: solution
The extreme label is $0.6$, and the cross-entropy is minimised at $\operatorname{logit}0.6 = \ln1.5 = 0.4055$ ([[post-training/reward-models#prop-rm-props]]). Clamping bounds the influence of any one confident judgement.
:::
:::

::: exercise Estimating a position bias {level=1 check="0.752"}
A judge picks A with probability $0.75$ when A is first and $0.6$ when A is second. Under the model of [[#prop-swap]], estimate the debiased log-odds $\Delta$ of preferring A, to three decimal places, and the position bias $b$.
::: solution
$\operatorname{logit}0.75 = \ln3 = 1.0986$ and $\operatorname{logit}0.6 = \ln1.5 = 0.4055$. Then $\Delta = \frac12(1.0986 + 0.4055) = 0.752$, a debiased preference of $\sigma(0.752) = 0.680$ for A, and $b = \frac12(1.0986 - 0.4055) = 0.347$ in favour of the first slot.
:::
:::

::: exercise Noisy labels {level=2 check="0.6"}
Under [[#prop-noise]], what observed preference probability does a pair with true gap $\Delta = 0$ have for any $\varepsilon$? For a pair with an enormous true gap, what value does $p_{\text{obs}}$ approach if $\varepsilon = 0.4$? (Give this limit as the answer.)
::: solution
At $\Delta = 0$, $p_{\text{obs}} = \varepsilon + (1-2\varepsilon)/2 = \frac12$. As $\Delta\to\infty$, $\sigma(\Delta)\to1$ and $p_{\text{obs}}\to\varepsilon + 1 - 2\varepsilon = 1 - \varepsilon = 0.6$. Even infinitely different responses are distinguished only $60\%$ of the time, so a reward model learns a gap of at most $\operatorname{logit}0.6 = 0.405$.
:::
:::

::: exercise RLAIF numbers {level=2}
Lee et al. (2023) report that on summarisation human evaluators preferred RLAIF to SFT $71\%$ of the time and RLHF to SFT $73\%$ of the time. Suppose each figure is based on $1{,}000$ independent comparisons. Using a normal approximation, is a difference of two percentage points between the two win rates distinguishable from sampling noise? What else would you want to know before concluding that RLAIF is as good as RLHF?
::: solution
Each rate has standard error about $\sqrt{0.72\cdot0.28/1000} = 0.0142$; the difference of two independent rates has standard error $\sqrt2\cdot0.0142 = 0.020$, so a difference of $0.02$ is one standard error — not distinguishable at conventional levels (the paper likewise reported no significant difference). Before concluding equivalence one would want: a confidence interval on the head-to-head comparison (equivalence must be shown, not inferred from non-significance); whether the evaluators share the judge's biases (length, style); performance on other tasks and on harder prompts where the judge is less competent; and how robust the result is to stronger optimisation against the AI-trained reward model.
:::
:::

::: exercise Probability averaging versus log-odds averaging {level=2 check="0.5749"}
With $\Delta = 0.5$ and position bias $b = 1.5$, compute the average of the probabilities $\frac12(\sigma(\Delta + b) + \sigma(\Delta - b))$ to four decimal places, and compare it with the unbiased $\sigma(\Delta)$ and with the result of averaging the log-odds.
::: solution
$\sigma(2) = 0.8808$ and $\sigma(-1) = 0.2689$, so the probability average is $0.5749$. The unbiased value is $\sigma(0.5) = 0.6225$. The log-odds average is $\frac12\big((\Delta + b) + (\Delta - b)\big) = 0.5$, which maps back to exactly $\sigma(0.5) = 0.6225$. The probability average points the right way but is shrunk towards $\frac12$, more so the larger the bias ([[#prop-swap]]).
:::
:::

::: exercise A critique loop {level=2}
Write the prompts, in outline, for one critique–revision round of [[#alg-cai-sl]] for a red-teaming request that asks how to access a neighbour's Wi-Fi without permission. Describe what a good revision would look like, and why the method trains on the *revision* rather than on the critique.
::: solution
The context holds the user's request and the helpful-only model's response (which may comply). Critique request: a principle drawn from the constitution, phrased as an instruction to identify specific ways the last response is harmful, unethical or illegal. Revision request: an instruction to rewrite the response to remove the harmful content while remaining as helpful as possible. A good revision declines to give instructions for unauthorised access, briefly explains why (it is unauthorised access to someone else's network, illegal in many jurisdictions and a privacy violation), and offers legitimate help — asking the neighbour, using public networks, contacting an internet provider, or securing one's own network. The method trains on revisions because the goal is a policy that produces good *responses*; the critique is scaffolding that improves the revision, and at deployment the model should answer directly rather than critiquing itself.
:::
:::

::: exercise Self-preference in a self-rewarding loop {level=3}
A model judges pairs of its own responses. Model its judgements as Bradley–Terry with log-odds $\Delta + s(\ell_1 - \ell_2)$, where $\Delta$ is the true quality gap, $\ell_i\in\{0, 1\}$ indicates whether response $i$ has a stylistic feature the model likes, and $s > 0$ is the strength of that preference. (a) If the model is trained with DPO on its own labels for one round, argue that the frequency of the feature rises. (b) Explain why a second round, with the trained model as judge, might increase $s$ further. (c) Propose two checks that would detect this drift.
::: solution
(a) DPO on labels with this bias converges towards the optimal policy for the judge's reward $r = q + s\ell$ ([[post-training/preference-optimisation#thm-optimal-policy]]), which multiplies the probability of responses with the feature by $e^{s/\beta}$ relative to those without, other things equal; the feature's frequency rises. (b) In the next round the judge is the trained model. If its preference for the feature is linked to how often it produces and sees it — for example through recognising its own style, as Panickssery et al. found for self-preference — then a policy that uses the feature more may also become a judge that favours it more, so $s$ grows and the loop amplifies a quality-irrelevant trait. Nothing in the loop measures $\Delta$ independently. (c) Track the frequency of the feature (and of length) across rounds; and measure agreement between the model's judgements and an independent judge or human labels on a fixed held-out set, with the feature balanced, to estimate $s$ directly each round.
:::
:::

::: exercise Implementing debiased labelling {level=3}
Extend the listing of [[#sec-code]] to label pairs for a Bradley–Terry reward model: for each pair, produce the soft label $\sigma\big(\frac12(\operatorname{logit}p_{12} + \operatorname{logit}p_{21})\big)$. Fit a linear reward $r = w_qq + w_\ell\ell$ on the features (quality, length) by gradient descent on the soft-label cross-entropy, and predict the fitted ratio $w_\ell/w_q$ before running it.
::: solution
By [[#prop-swap]] the debiased log-odds equal $k\big((q_1 - q_2) + v(\ell_1 - \ell_2)\big)$ exactly, and soft-label cross-entropy is a proper scoring rule, so the fitted weights should converge to $w_q = k = 2$ and $w_\ell = kv = 1$, ratio $v = 0.5$: the reward model inherits the judge's verbosity preference exactly, while the position bias disappears.

```python
import math, random
sig = lambda z: 1 / (1 + math.exp(-z))
logit = lambda p: math.log(p / (1 - p))
judge = lambda q1, q2, l1, l2: sig(2.0 * ((q1 - q2) + 0.5 * (l1 - l2)) + 0.8)
rng = random.Random(0)
data = []
for _ in range(5000):
    q1, q2, l1, l2 = (rng.gauss(0, 1) for _ in range(4))
    p12, p21 = judge(q1, q2, l1, l2), 1 - judge(q2, q1, l2, l1)
    data.append((q1 - q2, l1 - l2, sig(0.5 * (logit(p12) + logit(p21)))))
wq = wl = 0.0
for _ in range(500):
    gq = gl = 0.0
    for dq, dl, y in data:
        err = sig(wq * dq + wl * dl) - y          # gradient of soft-label cross-entropy
        gq += err * dq; gl += err * dl
    wq -= 1.0 * gq / len(data); wl -= 1.0 * gl / len(data)
print(round(wq, 3), round(wl, 3), round(wl / wq, 3))
```

```text
2.0 1.0 0.5
```

The fit recovers $w_q = 2$, $w_\ell = 1$: the debiasing removed the slot preference but not the length preference, which the reward model now encodes as half the weight of quality.
:::
:::
