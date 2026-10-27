A large model is expensive to serve; a small one is cheap but weaker. **Knowledge distillation** trains the small model — the **student** — to imitate the large one — the **teacher** — and often gets a student far better than the same small model trained on the original data alone. The reason is that a teacher's output carries much more information than a label: not just "the answer is *Paris*" but how plausible every alternative was. For language models the idea has grown into a whole practice. Students are trained on teachers' full next-token distributions, on sequences the teachers generate, or on large synthetic datasets of instructions, explanations and reasoning traces written by teachers — the cheapest route to a capable small model. The same practice raises a question with no counterpart in classical distillation: what happens when models are trained, generation after generation, on text that models wrote?

This chapter starts with the soft targets of Hinton, Vinyals and Dean (2015) and derives why their loss is scaled by $T^2$ and how it reduces to matching logits at high temperature. It then turns to sequence models: word-level and **sequence-level distillation** (Kim and Rush, 2016), the choice between forward and reverse KL, and on-policy distillation. It surveys **synthetic data** for post-training — instruction generation, explanation traces, rejection sampling of reasoning — with the evidence on what imitation does and does not transfer. Finally it treats **model collapse**: proofs that recursive refitting loses diversity in two simple models, a simulation, and the published findings, with their caveats.

## Soft targets {#sec-soft}

A classifier trained with one-hot labels learns to put all its probability on the right class. But a well-trained network's probabilities on the *wrong* classes are informative: an image of a 2 that the network thinks is slightly like a 3 and nothing like a 7 tells the student something about the structure of the task. Hinton et al. called this information **dark knowledge**. It is mostly invisible at temperature $1$, where wrong classes get tiny probabilities; raising the temperature of the softmax brings it out.

::: definition Softmax with temperature and the distillation loss {#def-kd}
For logits $\mathbf{z}\in\R^N$ and a **temperature** $T > 0$, $p_i^{(T)} = \exp(z_i/T)/\sum_j\exp(z_j/T)$. Let $\mathbf{v}$ be the teacher's logits and $\mathbf{z}$ the student's for the same input, with soft targets $\mathbf{q} = \operatorname{softmax}(\mathbf{v}/T)$ and student distribution $\mathbf{p} = \operatorname{softmax}(\mathbf{z}/T)$. The **knowledge-distillation loss** of Hinton et al. (2015) is

$$
\mathcal{L}_{\text{KD}} = (1 - \alpha)\,\mathrm{CE}\big(\mathbf{y}, \mathbf{p}^{(1)}\big) + \alpha\,T^2\,D_{\mathrm{KL}}\big(\mathbf{q}\,\Vert\,\mathbf{p}\big),
$$ {#eq-kd}

a mixture, with weight $\alpha\in[0, 1]$, of the ordinary cross-entropy with the true label $\mathbf{y}$ at temperature $1$ and the divergence from the teacher's soft targets at temperature $T$. At test time the student uses $T = 1$.
:::

The divergence and the cross-entropy $-\sum_iq_i\log p_i$ differ by the teacher's entropy, which does not depend on the student, so they have the same gradient. Raising $T$ flattens both distributions, so the relative sizes of small probabilities — which wrong answers are nearly right — carry weight in the loss.

::: example Soft targets at two temperatures {#ex-soft}
A teacher's logits for three classes are $(5, 2, 1)$. Compute its soft targets at $T = 1$ and $T = 4$.
::: solution
At $T = 1$: $e^5 : e^2 : e^1 = 148.4 : 7.39 : 2.72$, giving $(0.936, 0.047, 0.017)$. At $T = 4$: $e^{1.25} : e^{0.5} : e^{0.25} = 3.49 : 1.65 : 1.28$, giving $(0.543, 0.257, 0.200)$. At $T = 1$ the second and third classes look equally negligible; at $T = 4$ it is visible that the teacher rates the second class noticeably above the third — the information the student is meant to pick up.
:::
:::

::: widget plot
f: exp(5/x)/(exp(5/x) + exp(2/x) + exp(1/x)); exp(2/x)/(exp(5/x) + exp(2/x) + exp(1/x)); exp(1/x)/(exp(5/x) + exp(2/x) + exp(1/x))
x: 0.3, 20
y: 0, 1
labels: class with logit $5$; class with logit $2$; class with logit $1$
vlines: 1; 4
caption: The teacher's soft targets $\operatorname{softmax}(\mathbf{v}/T)$ for logits $(5, 2, 1)$ as the temperature $T$ grows. At $T = 1$ (left line) almost all mass is on the top class; at $T = 4$ (right line) the ranking of the other two is clearly visible; as $T\to\infty$ every class tends to $1/3$ and the targets carry less and less information. Hinton et al. used temperatures from about $2$ to $20$ depending on the task.
:::

### Why the loss is scaled by $T^2$ {#sec-t2}

::: proposition The distillation gradient and its high-temperature limit {#prop-kd-grad}
With $\mathbf{q}$ and $\mathbf{p}$ as in [[#def-kd]],

$$
\frac{\partial}{\partial z_i}\Big(-\sum_jq_j\log p_j\Big) = \frac1T\,(p_i - q_i).
$$ {#eq-kd-grad}

If the logits of both teacher and student have mean zero over the $N$ classes, then as $T\to\infty$,

$$
\frac1T(p_i - q_i) = \frac{1}{NT^2}(z_i - v_i) + O(T^{-3}).
$$ {#eq-kd-limit}

So the gradient of the soft-target term shrinks like $1/T^2$; multiplying it by $T^2$, as in [[#eq-kd]], keeps its size roughly independent of $T$, and in the high-temperature limit distillation becomes regression of the student's logits onto the teacher's with squared error $\frac{1}{2N}\sum_i(z_i - v_i)^2$.
:::

::: proof
The gradient of a softmax cross-entropy with respect to its own logits is the predicted distribution minus the target ([[math-for-ml/gradients#prop-softmax-ce]]). Here the logits are $\mathbf{z}/T$, so the chain rule contributes a factor $1/T$: [[#eq-kd-grad]]. For the limit, expand $e^{z_i/T} = 1 + z_i/T + O(T^{-2})$; with $\sum_jz_j = 0$ the denominator is $N + O(T^{-2})$, so $p_i = \frac1N(1 + z_i/T) + O(T^{-2})$, and likewise $q_i = \frac1N(1 + v_i/T) + O(T^{-2})$. Subtracting and dividing by $T$ gives [[#eq-kd-limit]]. The right-hand side is $\frac{1}{T^2}$ times the gradient of $\frac{1}{2N}\sum_i(z_i - v_i)^2$.
:::

This connects distillation to its predecessors: Buciluă, Caruana and Niculescu-Mizil (2006) compressed ensembles by training a single model on the ensemble's outputs, and Ba and Caruana (2014) trained shallow students by regressing onto teachers' logits. Hinton et al.'s temperature interpolates: at high $T$ it matches logits, at intermediate $T$ it ignores very negative logits, which may be noisy because the teacher was never trained to get them right.

The first part of the listing in [[#sec-code]] checks the proposition numerically: the gradient norm falls by a factor of about $2{,}700$ from $T = 1$ to $T = 50$, while $T^2$ times it stays between $0.54$ and $0.68$ and approaches the logit-matching value.

::: example Results in the original paper {#ex-mnist}
Hinton et al. trained a large network on MNIST digits (67 test errors) and a small one with two hidden layers of $800$ units (146 test errors when trained on the labels). Trained on the large network's soft targets at $T = 20$, the small network made $74$ errors. What fraction of the gap between the small and large networks did distillation close?
::: solution
The gap is $146 - 67 = 79$ errors; distillation removed $146 - 74 = 72$ of them, about $91\%$. The paper also reported that when all examples of the digit 3 were removed from the transfer set, the distilled student still classified most test 3s correctly once a bias was adjusted — it had learned about 3s purely from the teacher's soft probabilities on other digits.
:::
:::

## Distilling sequence models {#sec-sequence}

A language model makes a prediction at every position, so distillation can match the teacher token by token or sequence by sequence.

::: definition Word-level and sequence-level distillation (Kim and Rush, 2016) {#def-seqkd}
Let $p_T$ and $p_S$ be teacher and student autoregressive models. **Word-level** (token-level) distillation minimises, on training sequences $(\mathbf{x}, \mathbf{y})$, the sum over positions of the cross-entropy between the teacher's and student's next-token distributions given the true prefix:

$$
\mathcal{L}_{\text{word}} = -\sum_t\sum_{w\in\mathcal{V}}p_T(w\mid\mathbf{x}, y_{<t})\log p_S(w\mid\mathbf{x}, y_{<t}).
$$

**Sequence-level** distillation approximates the teacher's distribution over whole sequences by its mode: it replaces each target $\mathbf{y}$ by the teacher's output $\hat{\mathbf{y}}$ (from beam search or sampling) and trains the student with the ordinary SFT loss on $(\mathbf{x}, \hat{\mathbf{y}})$.
:::

Word-level distillation needs the teacher's full distribution at every position — $|\mathcal{V}|$ numbers per token, usually truncated to the top few dozen — and the teacher must be run during training or its outputs stored. Sequence-level distillation needs only generated text, and works even when the teacher can be accessed only through its outputs. Kim and Rush (2016) found for neural machine translation that sequence-level distillation was particularly effective: the student no longer needed beam search to perform well (greedy decoding of the student came close to beam search), their best student ran about ten times faster than the teacher with little loss in quality, and with weight pruning it had $13$ times fewer parameters at a cost of $0.4$ BLEU. A teacher's outputs are simpler and more consistent than human references — they are the teacher's mode — and so easier for a small model to fit.

In this light, most instruction tuning on model-generated data is sequence-level distillation: Alpaca and its many successors ([[post-training/instruction-tuning#sec-self-instruct]]) fine-tune a student on a teacher's responses to prompts. Distillation of the full next-token distribution is used in pretraining small models: the Gemma 2 report (Gemma Team, 2024) describes training its smaller models to match a larger teacher's next-token distributions instead of one-hot next tokens, on more tokens than would be compute-optimal for the student. The DeepSeek-R1 report (DeepSeek-AI, 2025) distilled reasoning into smaller open models from other families by SFT on about $800{,}000$ samples generated with R1, and reported that for a $32$-billion-parameter base model this worked better than applying large-scale RL to the small model directly. Distilled students also make good draft models for speculative decoding ([[inference/speculative-decoding]]), and distillation is compared with pruning and other ways of shrinking a model in [[inference/model-compression]].

### Forward or reverse KL {#sec-kl-direction}

Word-level distillation minimises the **forward** KL $D_{\mathrm{KL}}(p_T\Vert p_S)$ at each position, like SFT ([[post-training/instruction-tuning#prop-imitation]]). A student too small to represent the teacher's full distribution is then pushed to **cover** all of the teacher's modes, putting probability between them where the teacher puts none — which in generation means producing text that no mode of the teacher would. The **reverse** KL $D_{\mathrm{KL}}(p_S\Vert p_T)$, the divergence of the RL objective ([[post-training/rl-for-language-models#sec-kl]]), penalises the student for putting mass where the teacher has little, and so prefers to **seek** one mode and fit it well.

::: example Forward and reverse KL choose different students {#ex-kl-direction}
A teacher's distribution over three continuations is $p_T = (0.49, 0.49, 0.02)$. A student can only be one of two distributions: peaked, $(0.9, 0.05, 0.05)$, or flat, $(\frac13, \frac13, \frac13)$. Which does each divergence prefer?
::: solution
Forward: $D_{\mathrm{KL}}(p_T\Vert\text{peaked}) = 0.49\ln\frac{0.49}{0.9} + 0.49\ln\frac{0.49}{0.05} + 0.02\ln\frac{0.02}{0.05} = 0.802$; $D_{\mathrm{KL}}(p_T\Vert\text{flat}) = 0.321$. Forward KL prefers the flat student, which covers both modes but also gives the teacher's near-impossible third continuation a third of its probability. Reverse: $D_{\mathrm{KL}}(\text{peaked}\Vert p_T) = 0.479$; $D_{\mathrm{KL}}(\text{flat}\Vert p_T) = 0.681$. Reverse KL prefers the peaked student, which commits to one of the teacher's modes and rarely produces the bad continuation.
:::
:::

Gu et al. (2024, MiniLLM) distilled language models with the reverse KL, optimised by policy gradient on the student's own samples, and reported more precise generations than with forward KL. Agarwal et al. (2024) proposed **on-policy distillation** (generalised knowledge distillation, GKD): the student generates sequences, the teacher scores every position of them, and the student minimises a divergence — forward, reverse or a mixture — on its *own* prefixes. This removes the train–test mismatch of teacher forcing ([[pretraining/pretraining-objectives#sec-teacher-forcing]]): the student learns what the teacher would do in the situations the student actually gets itself into. On-policy distillation sits between SFT and RL: the teacher's per-token log-probabilities act as a dense reward.

## Synthetic data for post-training {#sec-synthetic}

Generating training data with models is now routine at every stage of post-training. The main patterns, each with published examples:

- **Instructions and responses.** Self-Instruct and Alpaca generated instructions and answers ([[post-training/instruction-tuning#alg-self-instruct]]); Evol-Instruct (Xu et al., 2023, WizardLM) asked a model to rewrite instructions to be progressively more complex; UltraChat (Ding et al., 2023) generated multi-turn dialogues between two model instances.
- **Explanations.** Orca (Mukherjee et al., 2023) trained a smaller model on a strong model's step-by-step explanations elicited with system prompts, rather than on bare answers, and reported better results than imitation of answers alone.
- **Filtered reasoning.** STaR (Zelikman et al., 2022) had a model generate rationales for questions, kept those that reached the correct answer, fine-tuned on them, and repeated; rejection-sampling fine-tuning with a verifier ([[post-training/rlhf#sec-alternatives]]) is the same idea.
- **Preferences and feedback.** AI-labelled preference data such as UltraFeedback ([[post-training/ai-feedback#sec-self]]).
- **Pretraining-scale rewriting**, covered in [[pretraining/data-mixtures#sec-synthetic]].

The quality control is usually the most important part: deduplication, filtering by a judge model or a verifier, decontamination against evaluation sets ([[evaluation/contamination]]), and checks of diversity.

::: warning Imitation copies style more readily than capability
Gudibande et al. (2023) fine-tuned open models on outputs of a strong proprietary chat model and found that crowd raters rated the imitations highly — they sounded like the teacher — while targeted evaluations showed that they closed little of the gap in factual accuracy and problem solving. A student can learn the teacher's tone, formatting and confidence from a modest dataset; the knowledge and reasoning that produced the answers need far more data, a much more capable student, or both. Evaluate distilled models on capabilities, not on how much they sound like the teacher.
:::

Two further cautions are not technical. The terms of service of some model providers restrict using their outputs to train competing models; and synthetic data inherit the teacher's errors, biases and blind spots, which a student trained on many teachers' outputs may accumulate. Questions of provenance and permitted use are discussed in [[llm-society/copyright-provenance]].

::: example The cost of sequence-level distillation {#ex-cost}
A team generates $10^6$ responses of $500$ tokens each with a $70$-billion-parameter teacher and fine-tunes an $8$-billion-parameter student on them for $2$ epochs. Using $2N$ FLOPs per generated token and $6N$ per training token, compare the two costs. How would the generation cost change if the team kept only $1$ of every $4$ samples after filtering by a verifier?
::: solution
Generation: $10^6\cdot500\cdot2\cdot7\times10^{10} = 7\times10^{19}$ FLOPs. Training: $10^6\cdot500\cdot2\cdot6\cdot8\times10^9 = 4.8\times10^{19}$ FLOPs. Generation costs more than training, and generation is also slower per FLOP, being memory-bound ([[inference/latency-cost]]). Keeping $1$ in $4$ samples means generating $4\times10^6$ responses for the same training set: $2.8\times10^{20}$ FLOPs, six times the training cost. Filtering for quality is usually worth it, but synthetic data are not free.
:::
:::

## Model collapse {#sec-collapse}

What happens if the outputs of a model become the training data of the next, and so on? Each generation fits a finite sample from the previous model. Rare events may not appear in a finite sample; a model that never sees them gives them no probability; its samples then never contain them. Two simple models make this exact.

::: proposition Recursive fitting of a Gaussian loses variance {#prop-gaussian-collapse}
Let $\sigma_0^2 > 0$, and at each generation $n$ draw $M\ge2$ independent samples from $\Normal(\mu_n, \sigma_n^2)$ and set $\mu_{n+1}$, $\sigma_{n+1}^2$ to their maximum-likelihood estimates (the sample mean and the variance with divisor $M$). Then

$$
\E\big[\sigma_n^2\big] = \Big(1 - \frac1M\Big)^n\sigma_0^2\ \to\ 0.
$$
:::

::: proof
For a Gaussian sample the maximum-likelihood variance satisfies $M\sigma_{n+1}^2/\sigma_n^2\sim\chi^2_{M-1}$ given $\sigma_n$, so $\E[\sigma_{n+1}^2\mid\sigma_n^2] = \frac{M-1}{M}\sigma_n^2$ ([[math-for-ml/estimation#prop-gaussian-mle]]). Taking expectations and iterating gives the formula.
:::

The bias $\frac{M-1}{M}$ is the familiar bias of the maximum-likelihood variance, compounded over generations. Using the unbiased estimator removes the decay of the expectation but not the collapse: $\log\sigma_n^2$ is then a random walk with negative drift (by Jensen's inequality, $\E[\log s^2] < \log\E[s^2]$), so the variance still tends to zero with probability one — the analysis given by Shumailov et al. (2024) for this model.

For a categorical distribution — a vocabulary, or a set of facts, styles or answers — the corresponding statement is about diversity.

::: proposition Recursive fitting of a categorical distribution {#prop-cat-collapse}
Let $\mathbf{p}_n$ be a distribution on $K$ categories, and let $\mathbf{p}_{n+1}$ be the empirical distribution of $M$ independent samples from $\mathbf{p}_n$. Then:
1. $\E[\mathbf{p}_{n+1}\mid\mathbf{p}_n] = \mathbf{p}_n$: each probability is a martingale.
2. A category with $p_{n,k} = 0$ has $p_{m,k} = 0$ for all $m > n$; given $\mathbf{p}_n$, the expected number of categories lost at the next generation is $\sum_{k:p_{n,k}>0}(1 - p_{n,k})^M$.
3. The **Gini diversity** $D(\mathbf{p}) = 1 - \sum_kp_k^2$ (the probability that two independent draws differ) decays geometrically in expectation: $\E[D(\mathbf{p}_{n+1})\mid\mathbf{p}_n] = \big(1 - \frac1M\big)D(\mathbf{p}_n)$, so $\E[D(\mathbf{p}_n)] = (1 - \frac1M)^nD(\mathbf{p}_0)\to0$.
:::

::: proof
The count of category $k$ is binomial, $M p_{n+1,k}\sim\Bin(M, p_{n,k})$. (1) Its mean is $Mp_{n,k}$. (2) A category with probability $0$ is never sampled; a category is absent from the sample with probability $(1 - p_{n,k})^M$, and summing gives the expected number lost. (3) $\E[p_{n+1,k}^2] = \Var(p_{n+1,k}) + p_{n,k}^2 = \frac{p_{n,k}(1 - p_{n,k})}{M} + p_{n,k}^2$. Summing over $k$, $\E[\sum_kp_{n+1,k}^2] = \sum_kp_{n,k}^2 + \frac{1}{M}\big(1 - \sum_kp_{n,k}^2\big)$, so $\E[1 - \sum_kp_{n+1,k}^2] = (1 - \frac1M)(1 - \sum_kp_{n,k}^2)$.
:::

Part 1 is the subtle point: in expectation no category gains or loses probability, so there is no systematic drift towards the head of the distribution. Yet categories die out one by one, at random, and never return, and the distribution becomes more concentrated: this is **genetic drift** in the Wright–Fisher model of population genetics, with categories as alleles. Eventually a single category takes all the mass.

::: widget plot
f: (1 - 1/m)^x
x: 0, 200
y: 0, 1
sliders: m=50:2:500:1
labels: expected diversity remaining $(1 - 1/M)^n$
caption: The expected fraction of the original variance (Gaussian) or Gini diversity (categorical) left after $n$ generations of refitting to $M$ samples of the previous model ([[#prop-gaussian-collapse]], [[#prop-cat-collapse]]), with $M$ on the slider $m$. Diversity halves after about $0.69M$ generations: larger samples slow the collapse but do not stop it, as long as each generation sees only the previous model's output.
:::

### A simulation, with replacement and with accumulation {#sec-code}

The listing first checks [[#prop-kd-grad]] and then simulates recursive training of a categorical "language model" over $K = 1{,}000$ categories with Zipf frequencies $p_k\propto1/k$. Generation $0$ is fitted to $2{,}000$ real samples. Each later generation draws $2{,}000$ samples from the current model and refits — either to those samples alone (**replace**) or to all data so far, real and synthetic (**accumulate**), the two regimes compared by Gerstgrasser et al. (2024).

```python
import math, random

def softmax(z, T=1.0):
    m = max(z); e = [math.exp((v - m) / T) for v in z]; s = sum(e)
    return [x / s for x in e]

# 1. Soft targets and the T^2 scaling of the distillation gradient
v = [3.0, 0.5, -0.5, -1.0, -2.0]                  # teacher logits (mean zero)
z = [1.0, 1.0, -1.0, -0.5, -0.5]                  # student logits (mean zero)
N = len(v)
print(" T   soft targets q(T)                     |grad|      T^2*|grad|  T^2*|approx|")
for T in (1, 2, 5, 10, 20, 50):
    q, p = softmax(v, T), softmax(z, T)
    g = [(pi - qi) / T for pi, qi in zip(p, q)]               # d CE(q, p) / d z_i
    a = [(zi - vi) / (N * T * T) for zi, vi in zip(z, v)]     # high-temperature approximation
    norm = math.sqrt(sum(x * x for x in g)); anorm = math.sqrt(sum(x * x for x in a))
    print(f"{T:2d}   {' '.join(f'{x:.3f}' for x in q):34s}  {norm:.6f}   {T * T * norm:.4f}      {T * T * anorm:.4f}")

# 2. Model collapse of a categorical distribution: refit to its own samples each generation
K, M, gens = 1000, 2000, 20
zipf = [1 / k for k in range(1, K + 1)]; Z = sum(zipf); p0 = [w / Z for w in zipf]
tail0 = sum(p0[100:]); H0 = -sum(x * math.log(x) for x in p0)
def refit(counts):
    n = sum(counts); return [c / n for c in counts]
for mode in ("replace", "accumulate"):
    rng = random.Random(0)
    model, pool = p0[:], [0] * K
    for _ in range(M):                                        # generation 0: real data
        pool[rng.choices(range(K), weights=p0)[0]] += 1
    model = refit(pool)
    report = []
    for g in range(1, gens + 1):
        sample = [0] * K
        for k in rng.choices(range(K), weights=model, k=M):
            sample[k] += 1
        if mode == "replace":
            pool = sample                                     # train only on the newest synthetic data
        else:
            pool = [a + b for a, b in zip(pool, sample)]      # keep all real and synthetic data
        model = refit(pool)
        if g in (1, 5, 10, 20):
            alive = sum(1 for x in model if x > 0)
            tail = sum(model[100:])
            H = -sum(x * math.log(x) for x in model if x > 0)
            report.append(f"gen {g:2d}: {alive:3d} categories, tail mass {tail:.3f}, entropy {H:.3f} nats")
    print(f"{mode:10s} (true: {K} categories, tail mass {tail0:.3f}, entropy {H0:.3f})")
    print("   " + "\n   ".join(report))
```

```text
 T   soft targets q(T)                     |grad|      T^2*|grad|  T^2*|approx|
 1   0.879 0.072 0.027 0.016 0.006       0.594469   0.5945      0.5292
 2   0.596 0.171 0.104 0.081 0.049       0.170583   0.6823      0.5292
 5   0.342 0.208 0.170 0.154 0.126       0.024369   0.6092      0.5292
10   0.266 0.207 0.187 0.178 0.161       0.005689   0.5689      0.5292
20   0.232 0.204 0.194 0.190 0.180       0.001372   0.5486      0.5292
50   0.212 0.202 0.198 0.196 0.192       0.000215   0.5368      0.5292
replace    (true: 1000 categories, tail mass 0.307, entropy 5.191)
   gen  1: 397 categories, tail mass 0.318, entropy 4.889 nats
   gen  5: 231 categories, tail mass 0.291, entropy 4.540 nats
   gen 10: 159 categories, tail mass 0.291, entropy 4.277 nats
   gen 20:  95 categories, tail mass 0.255, entropy 3.814 nats
accumulate (true: 1000 categories, tail mass 0.307, entropy 5.191)
   gen  1: 512 categories, tail mass 0.314, entropy 4.974 nats
   gen  5: 512 categories, tail mass 0.309, entropy 4.935 nats
   gen 10: 512 categories, tail mass 0.309, entropy 4.923 nats
   gen 20: 512 categories, tail mass 0.308, entropy 4.916 nats
```

Even generation $0$ has lost nearly half of the $1{,}000$ categories: $2{,}000$ samples from a Zipf distribution miss about $500$ of the rare ones — the finite-sample loss of the tail. With replacement the loss compounds: after $20$ generations only $95$ categories remain and the entropy has fallen from $5.19$ to $3.81$ nats, while the total mass of the tail (categories beyond the hundredth) fluctuates without a clear trend, as part 1 of [[#prop-cat-collapse]] predicts — the tail does not shrink in expectation, it is replaced by fewer, larger survivors. With accumulation the real data stay in the pool, every category seen once is kept forever, and the model stabilises close to the generation-$0$ fit.

### What the published studies found {#sec-collapse-findings}

Shumailov et al. (Nature, 2024) analysed these mechanisms and demonstrated collapse experimentally in Gaussian mixtures, variational autoencoders and language models: an OPT-125m model fine-tuned recursively on text generated by the previous generation's model showed rising perplexity on the original data and growing probability of its own typical, low-perplexity outputs, losing the tails first. They distinguished early collapse, in which the tails vanish, from late collapse, in which the distribution converges to something with little variance, and reported that keeping a fraction ($10\%$ in one experiment) of the original data in each generation made the degradation much smaller. Related work found similar effects for image generators (Alemohammad et al., 2024, "self-consuming" models).

The caveats matter as much as the findings. The experiments replace data with synthetic data at every generation; Gerstgrasser et al. (2024) showed, theoretically for linear models and empirically for several model types, that when synthetic data **accumulate** alongside the real data instead of replacing them, the error stays bounded. Practical pipelines rarely train on unfiltered samples of a single previous model: they filter with verifiers and judges, mix sources, and keep human-written data, and filtering by correctness can *add* information that sampling alone cannot ([[post-training/rlhf#sec-alternatives]]). And the recursion in the simple models is pure sampling noise with no fresh signal. What the results establish is that **unfiltered self-training with replacement loses diversity**; how much synthetic text on the web degrades future models trained on web crawls, in proportions and with filtering that actually occur, is an open empirical question as of 2026.

::: quiz
In the simulation, why does the "accumulate" run stop losing categories after generation $0$?
- [ ] Because synthetic samples are more diverse than real ones
- [x] Because every category that appears in the real data keeps a non-zero count in the pool forever
- [ ] Because accumulation removes the sampling noise from each generation's fit
- [ ] Because the Gini diversity of a pooled sample always increases
::: solution
The pool retains the real samples, so a category seen in the real data always has a positive count, and the fitted model gives it positive probability ([[#prop-cat-collapse]], part 2, applies only to categories with zero count). Sampling noise is still present each generation, but its weight in the pool shrinks as the pool grows. Categories missed by the original $2{,}000$ real samples are never recovered — real data cannot be replaced by more synthetic data.
:::
:::

::: history
Buciluă, Caruana and Niculescu-Mizil (2006) introduced model compression by training a small model on a large ensemble's predictions on unlabelled data; Ba and Caruana (2014) matched logits; Hinton, Vinyals and Dean (NIPS workshop 2014, arXiv 2015) introduced soft targets with temperature and the term "distillation". FitNets (Romero et al., 2015) matched intermediate representations. Kim and Rush (EMNLP 2016) defined sequence-level distillation for translation; DistilBERT (Sanh et al., 2019), TinyBERT (Jiao et al., 2020) and MiniLM (Wang et al., 2020) distilled pretrained Transformers. Synthetic instruction data spread from 2022–2023 with STaR, Self-Instruct, Alpaca, Evol-Instruct and Orca, and Gudibande et al. (2023) cautioned about imitation. MiniLLM (Gu et al., 2024) and GKD (Agarwal et al., 2024) brought reverse-KL and on-policy distillation to language models, and Gemma 2 (2024) and DeepSeek-R1 (2025) described large-scale distillation in pretraining and reasoning. Model collapse was analysed by Shumailov et al. (arXiv 2023, Nature 2024) and Alemohammad et al. (2024), and the role of accumulation by Gerstgrasser et al. (2024); the underlying drift is that of the Wright–Fisher model of population genetics (Fisher, 1930; Wright, 1931).
:::

::: summary
- **Knowledge distillation** trains a student on a teacher's soft targets $\operatorname{softmax}(\mathbf{v}/T)$, revealing the relative plausibility of wrong answers; the loss mixes label cross-entropy with $T^2$ times the KL to the soft targets.
- The soft-target gradient is $(p_i - q_i)/T$, which shrinks like $1/T^2$; the $T^2$ factor keeps its scale, and at high temperature with zero-mean logits distillation becomes **logit matching** ([[#prop-kd-grad]]).
- For language models, **word-level** distillation matches next-token distributions (forward KL, mode covering) and **sequence-level** distillation trains on teacher outputs — the basis of most synthetic instruction tuning. **Reverse-KL** and **on-policy** distillation (MiniLLM, GKD) make the student seek modes and learn on its own prefixes.
- **Synthetic data** — instructions, explanations, filtered reasoning, AI preferences — are routine in post-training; imitation transfers style more readily than capability, and quality control is the main work.
- Recursive refitting loses diversity: Gaussian variance decays like $(1 - 1/M)^n$ in expectation and categorical Gini diversity likewise, with categories dying out irreversibly although each probability is a martingale. **Model collapse** (Shumailov et al., 2024) is strong when synthetic data **replace** real data and largely avoided when they **accumulate** alongside it (Gerstgrasser et al., 2024).
:::

## Exercises

::: exercise Soft targets {level=1 check="0.2689"}
A teacher's logits for two classes are $(2, 0)$. What probability does its softmax at $T = 2$ give the second class? Give four decimal places.
::: solution
$\operatorname{softmax}((1, 0)) = (e/(1 + e), 1/(1 + e))$, so the second class gets $1/(1 + e) = \sigma(-1) = 0.2689$, against $\sigma(-2) = 0.1192$ at $T = 1$.
:::
:::

::: exercise The size of the soft gradient {level=1 check="0.04"}
Ignoring the $O(T^{-3})$ correction of [[#eq-kd-limit]], by what factor is the soft-target gradient at $T = 5$ smaller than at $T = 1$? Give the factor as a decimal.
::: solution
The gradient scales like $1/T^2$, so the factor is $1/25 = 0.04$. Multiplying the soft term by $T^2 = 25$ restores its scale relative to the hard-label term.
:::
:::

::: exercise Variance after recursive fitting {level=1 check="0.9044"}
A Gaussian is refitted by maximum likelihood to $M = 100$ samples of the previous fit for $n = 10$ generations. What fraction of the original variance remains in expectation, to four decimal places?
::: solution
By [[#prop-gaussian-collapse]], $(1 - 1/100)^{10} = 0.99^{10} = 0.9044$.
:::
:::

::: exercise Categories lost in one generation {level=2 check="0.3677"}
A distribution has $1{,}000$ equally likely categories. A model is fitted to $M = 1{,}000$ samples from it. What fraction of the categories does the model lose in expectation, to four decimal places? What fraction would it lose with $M = 5{,}000$?
::: solution
By [[#prop-cat-collapse]], each category is missed with probability $(1 - 1/1000)^{1000} = 0.3677$, close to $1/e = 0.3679$, so the model loses about $37\%$ of the categories in a single generation. With $M = 5{,}000$: $(0.999)^{5000} = 0.0067$, under $1\%$.
:::
:::

::: exercise Logit matching {level=2 check="-0.2"}
Teacher logits $(1, 0, -1)$ and student logits $(0.4, -0.2, -0.2)$ both have mean zero. Using [[#eq-kd-limit]], compute $T^2$ times the soft-target gradient with respect to the first student logit in the limit $T\to\infty$. Which way does a gradient-descent step move that logit?
::: solution
$T^2\cdot\frac{1}{NT^2}(z_1 - v_1) = \frac13(0.4 - 1) = -0.2$. The gradient is negative, so gradient descent increases $z_1$, towards the teacher's value $1$. The other two components are $\frac13(-0.2 - 0) = -0.067$ and $\frac13(-0.2 + 1) = 0.267$; they sum to zero, as the gradients of mean-zero logits must.
:::
:::

::: exercise Forward or reverse? {level=2}
For a teacher $p_T = (0.6, 0.4)$ over two continuations and the student family $\{(q, 1-q)\}$, show that both the forward and the reverse KL are minimised at $q = 0.6$. Why does the difference between the two divergences only matter when the student family cannot represent the teacher?
::: solution
Both divergences are non-negative and zero exactly when the two distributions are equal ([[math-for-ml/information-theory#thm-gibbs]]), and $q = 0.6$ makes them equal, so it minimises both. The divergences differ in how they weigh *errors*: forward KL heavily penalises $q_i\to0$ where $p_{T,i} > 0$, reverse KL penalises $q_i > 0$ where $p_{T,i}\to0$. When the student can match the teacher exactly, there is no error to weigh, and both choose the teacher; when it cannot, as in [[#ex-kl-direction]], they choose different compromises.
:::
:::

::: exercise Distillation data budget {level=2 check="19"}
A $7$-billion-parameter student is trained with word-level distillation from a teacher's top-$k$ next-token probabilities, stored as ($k$ token ids, $k$ probabilities) per position with $4$-byte ids and $2$-byte probabilities. For $k = 32$ and a dataset of $10^8$ tokens, how many GB of teacher outputs must be stored? Give the nearest whole number of gigabytes.
::: solution
Per position: $32\cdot(4 + 2) = 192$ bytes. For $10^8$ positions: $1.92\times10^{10}$ bytes, about $19$ GB. Storing the full distribution over a $128{,}000$-token vocabulary at $2$ bytes per probability would need $10^8\cdot2.56\times10^5 = 2.56\times10^{13}$ bytes, $25.6$ TB — which is why top-$k$ truncation, or running the teacher alongside the student, is used.
:::
:::

::: exercise The Gini diversity recursion {level=3}
Verify part 3 of [[#prop-cat-collapse]] numerically for the uniform distribution on $K = 10$ categories with $M = 20$: compute $D(\mathbf{p}_0)$, the predicted $\E[D(\mathbf{p}_5)]$, and estimate it by simulating $10{,}000$ chains of five generations in plain Python. Then explain why $(1 - 1/M)^n$ also appears in [[#prop-gaussian-collapse]].
::: solution
$D(\mathbf{p}_0) = 1 - 10\cdot0.01 = 0.9$, and the prediction is $0.9\cdot0.95^5 = 0.6964$.

```python
import random
rng = random.Random(0)
K, M, n, chains = 10, 20, 5, 10000
total = 0.0
for _ in range(chains):
    p = [1 / K] * K
    for _ in range(n):
        counts = [0] * K
        for k in rng.choices(range(K), weights=p, k=M):
            counts[k] += 1
        p = [c / M for c in counts]
    total += 1 - sum(x * x for x in p)
print(round(total / chains, 4), round(0.9 * (1 - 1 / M) ** n, 4))
```

```text
0.6943 0.6964
```

The simulated mean, $0.6943$, agrees with the prediction within Monte Carlo error. The same factor appears for the Gaussian because both quantities are "the probability-weighted spread" of a distribution estimated by plug-in from $M$ samples: the plug-in variance of a sample, and the plug-in probability that two draws differ, both underestimate the population value by exactly the factor $(M-1)/M$, since a draw compared with itself contributes no spread. Iterating the plug-in estimator compounds the bias.
:::
:::

::: exercise On-policy distillation as RL {level=3}
In on-policy distillation with the reverse KL, the student $p_S$ samples $\mathbf{y}$ and minimises $\E_{\mathbf{y}\sim p_S}\big[\log p_S(\mathbf{y}\mid\mathbf{x}) - \log p_T(\mathbf{y}\mid\mathbf{x})\big]$. Show that this is the KL-regularised RL objective of [[post-training/rl-for-language-models#def-kl-objective]] with a particular reward and $\beta$, and use [[post-training/preference-optimisation#thm-optimal-policy]] to identify its optimum. What changes if a task reward $R$ is added with weight $1$?
::: solution
Minimising $\E_{p_S}[\log p_S - \log p_T]$ is maximising $\E_{p_S}[\log p_T(\mathbf{y}\mid\mathbf{x})] - \E_{p_S}[\log p_S(\mathbf{y}\mid\mathbf{x})]$, which is the entropy-regularised objective with reward $r = \log p_T$; equivalently, it is $-D_{\mathrm{KL}}(p_S\Vert p_T)$, the KL-regularised objective with reward $0$, reference $\pi_{\text{ref}} = p_T$ and $\beta = 1$. By the theorem the optimum is $\pi^\star\propto p_Te^{0} = p_T$: the student should become the teacher, as expected, and the per-token log-ratios $\log p_T - \log p_S$ act as dense rewards ([[post-training/rl-for-language-models#prop-kl-tokens]]). With a task reward the objective is $\E_{p_S}[R] - D_{\mathrm{KL}}(p_S\Vert p_T)$, whose optimum is $\pi^\star\propto p_Te^{R}$: the teacher, tilted towards high-reward outputs — RLHF with the teacher as reference policy.
:::
:::
