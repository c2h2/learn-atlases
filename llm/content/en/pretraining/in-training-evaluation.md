A pretraining run lasts weeks and costs the budget of a small company, and its outcome cannot be judged only at the end. Teams evaluate continuously: the validation loss tells them whether the model is still learning, downstream probes tell them whether it is learning the right things, and comparisons of intermediate checkpoints decide whether to change the data mixture, lower the learning rate or stop. The same measurements, taken across models of different sizes, are the raw material of scaling laws ([[scaling/scaling-laws]]) and of the debate about whether abilities **emerge** suddenly with scale.

This chapter explains what to measure during pretraining and how far to trust it. It covers validation loss and perplexity, including the standard error of a validation estimate; downstream evaluation of a base model by likelihood scoring, its formats and its noise; the relation between a smoothly falling loss and abilities that seem to appear abruptly; and the emergent-abilities debate between Wei et al. (2022) and Schaeffer et al. (2023), presented with the evidence on each side. Evaluation of finished models — benchmarks, human and model judges, statistics — is the subject of the [[evaluation]] course.

## Validation loss {#sec-validation}

The most informative single number during pretraining is the loss on held-out text.

::: definition Validation loss {#def-validation}
A **validation set** is a fixed collection of documents excluded from training (and deduplicated against it, [[pretraining/training-data#sec-dedup]]), usually split by domain. The **validation loss** of a checkpoint is the average next-token cross-entropy over its tokens, $\hat{\mathcal L} = -\frac1n\sum_{i=1}^n\log p_\theta(x_i\mid x_{<i})$; its **perplexity** is $e^{\hat{\mathcal L}}$ and its **bits per byte** $\hat{\mathcal L}/\ln2$ times tokens per byte ([[pretraining/pretraining-objectives#prop-compression]]).
:::

Validation loss improves on the training loss as a diagnostic in three ways. It is measured on the same data at every checkpoint, so its changes are not confounded by the varying difficulty of training batches. It reveals overfitting to repeated data ([[pretraining/data-mixtures#sec-epochs]]). And when it is split by domain — web text, code, mathematics, each language, held-out books — it shows which parts of the mixture are improving. Multi-domain perplexity suites such as Paloma (Magnusson et al., 2023) were built for this purpose. Two cautions apply: losses are comparable only between models with the same tokeniser (otherwise use bits per byte), and a validation set that leaks into training — through duplicates, or through a later crawl that contains it — silently turns into a training-loss measurement.

::: proposition Standard error of a validation loss {#prop-se}
Let a validation set consist of $m$ independent documents, document $j$ having $n_j$ tokens and summed loss $S_j$, and let $\hat{\mathcal L} = \sum_jS_j/\sum_jn_j$. For large $m$, the standard error of $\hat{\mathcal L}$ is approximately

$$
\operatorname{se}(\hat{\mathcal L})\approx\frac{1}{\bar n\sqrt m}\sqrt{\frac{1}{m-1}\sum_{j=1}^m\big(S_j - \hat{\mathcal L}n_j\big)^2},\qquad\bar n = \frac1m\sum_jn_j.
$$

If, in addition, the $n = \sum_jn_j$ token losses were independent with standard deviation $\sigma$, this would reduce to $\sigma/\sqrt n$; token losses within a document are positively correlated, so the document-level formula is the honest one and is usually larger.
:::

::: proof
$\hat{\mathcal L}$ is a ratio estimator $\bar S/\bar n$ of two sample means over documents. By the delta method, $\bar S/\bar n - \mathcal L\approx\frac{1}{\bar n}\big(\bar S - \mathcal L\bar n\big) = \frac{1}{\bar n}\cdot\frac1m\sum_j(S_j - \mathcal Ln_j)$, an average of $m$ independent terms with mean zero; its standard deviation is $\frac{1}{\bar n\sqrt m}$ times the standard deviation of $S_j - \mathcal Ln_j$, which is estimated by the sample formula with $\hat{\mathcal L}$ in place of $\mathcal L$. If all token losses are independent with variance $\sigma^2$, then $\Var(S_j - \mathcal Ln_j) = n_j\sigma^2$, and with equal lengths $n_j = \bar n$ the expression becomes $\sigma\sqrt{\bar n}/(\bar n\sqrt m) = \sigma/\sqrt{\bar nm} = \sigma/\sqrt n$. Positive correlation within documents makes $\Var(S_j)$ larger than $n_j\sigma^2$.
:::

::: example How large a validation set? {#ex-validation-size}
Per-token losses have standard deviation $\sigma\approx2.5$ nats. Suppose the document-level variance is that of independent tokens inflated by a factor $4$ because of within-document correlation. How many tokens are needed for a standard error of $0.001$ nats, enough to see differences of $0.003$ between checkpoints?
::: solution
With independent tokens, $\sigma/\sqrt n = 0.001$ needs $n = (2.5/0.001)^2 = 6.25$ million tokens. Inflating the variance by $4$ doubles the standard error for the same $n$, so $n = 4\cdot6.25 = 25$ million tokens. Evaluating $25$ million tokens costs $2N\cdot2.5\times10^7$ FLOPs, for a $7$-billion-parameter model $3.5\times10^{17}$ FLOPs — about a second on the cluster of [[pretraining/training-loop#ex-mfu]], negligible if done every few thousand steps.
:::
:::

**What the loss curve does and does not tell you.** The validation loss of a well-configured run falls roughly like a power law in the number of tokens, with bumps where the learning rate or data change. Its shape depends strongly on the schedule: under a cosine schedule the loss keeps improving as the learning rate decays, while under warm-up–stable–decay the loss plateaus during the stable phase and drops sharply during the final decay ([[pretraining/training-loop#sec-schedules]]). An intermediate checkpoint of a WSD run therefore **understates** what the same run would achieve if decayed at that point, which is why teams evaluate short decayed branches rather than raw stable-phase checkpoints when they need a prediction. Teams that fit scaling laws to curves within a run must account for this.

## Downstream probes for base models {#sec-probes}

A pretrained base model has not been taught to follow instructions, so it is evaluated by scoring, not by asking. The standard technique compares the probabilities the model assigns to candidate answers.

::: definition Likelihood-based multiple-choice scoring {#def-mc-scoring}
Given a context $c$ (often with a few solved examples, **few-shot**) and candidate continuations $a_1, \dots, a_K$, the model's choice is

$$
\hat k = \arg\max_k\ \frac{1}{\lambda(a_k)}\sum_{t=1}^{\lvert a_k\rvert}\log p_\theta\big(a_{k,t}\mid c, a_{k,<t}\big),
$$

where $\lambda(a_k)$ is a **length normalisation**: $1$ (raw log-likelihood), the number of tokens, or the number of characters or bytes of $a_k$. In the **cloze formulation** the candidates are the answer texts themselves; in the **multiple-choice formulation** the context lists the options labelled A, B, C, D and the candidates are the single tokens "A", "B", "C", "D".
:::

The two formulations behave very differently during training. Cloze scoring works from early checkpoints, because it only requires the model to find the right answer more probable as a continuation. The lettered format requires the model to understand the convention of labelled options and to map its knowledge onto a letter, and small or early models often score at chance on it even when the cloze version shows they know the answer. Evaluation standards for base models, such as OLMES (Gu et al., 2024), therefore prescribe which formulation to use and when; FineWeb's ablations (Penedo et al., 2024) chose benchmarks and formulations that give "early signal" — clear, low-noise differences between small models trained on different data.

::: example Choosing an answer by likelihood {#ex-mc}
For the context *The capital of Australia is*, a model gives the candidates these summed log-probabilities: *Sydney* ($2$ tokens, $6$ characters) $-4.1$; *Canberra* ($3$ tokens, $8$ characters) $-4.8$; *Melbourne* ($2$ tokens, $9$ characters) $-6.0$. Which answer is chosen with no normalisation, per-token normalisation and per-character normalisation?
::: solution
Raw: Sydney ($-4.1$) beats Canberra ($-4.8$). Per token: Sydney $-2.05$, Canberra $-1.60$, Melbourne $-3.00$: Canberra wins. Per character: Sydney $-0.683$, Canberra $-0.600$, Melbourne $-0.667$: Canberra wins. Longer answers accumulate more negative log-probability simply because they have more tokens; normalisation corrects for this, but the choice of normalisation can change the result, and benchmark scores are comparable only under the same convention.
:::
:::

### How noisy is a benchmark? {#sec-noise}

A benchmark of $n$ questions measures accuracy with sampling error. If the model's "true" accuracy on questions like these is $p$, the observed score is a binomial proportion with standard error $\sqrt{p(1-p)/n}$.

::: widget distribution
dist: binomial
params: n=500, p=0.6
a: 280
b: 320
normal: true
caption: The number of correct answers on a $500$-question benchmark by a model whose true accuracy is $60\%$: the standard deviation is $\sqrt{500\cdot0.6\cdot0.4} = 11$ questions, $2.2$ percentage points. Two checkpoints that differ by two points on such a benchmark may not differ at all. Change $n$ to see how many questions are needed to resolve a one-point difference.
:::

::: example Comparing two checkpoints {#ex-paired}
Checkpoints A and B score $59.6\%$ and $60.9\%$ on the same $1000$ questions. What is the standard error of the difference if the two scores were independent, and why is the paired standard error much smaller?
::: solution
Unpaired, each score has standard error $\sqrt{0.62\cdot0.38/1000}\approx0.0153$, and the difference $\sqrt2\cdot0.0153 = 0.022$: a $1.3$-point gain is well within noise. But the two checkpoints answer the *same* questions and agree on most of them, so the variability that comes from which questions were sampled cancels. The paired standard error is computed from the per-question differences $d_i\in\{-1, 0, 1\}$ as $\operatorname{sd}(d)/\sqrt n$; in the simulation of [[#sec-code]], where the checkpoints agree on about $85\%$ of questions, it is $0.008$, so the gain is $1.6$ standard errors — suggestive, not conclusive. (McNemar's test, [[ml-fundamentals/evaluation-metrics#prop-mcnemar]], formalises this comparison.)
:::
:::

There is a second source of noise. Successive checkpoints of the same run differ in their scores by more than their losses would suggest, because small changes in the weights flip borderline answers; Madaan et al. (2024) measured this seed-to-seed and checkpoint-to-checkpoint variance on common benchmarks and found it comparable to many reported improvements. Averaging over several nearby checkpoints, using continuous metrics such as the probability of the correct answer, and preferring benchmarks with many questions all reduce it.

## Smooth loss, sudden abilities {#sec-emergence}

As compute grows, validation loss falls smoothly and predictably. Yet on some tasks, the accuracy of models of increasing size stays near chance and then rises sharply. Both observations are robust; their interpretation is debated.

::: definition Emergent ability (Wei et al., 2022) {#def-emergent}
Wei et al. call an ability **emergent** if it is not present in smaller models but is present in larger models — that is, if performance on a task is near chance for models below some scale and well above chance beyond it, so that it cannot be predicted by extrapolating the performance of smaller models.
:::

Wei et al. (2022) collected many few-shot tasks with this pattern from the BIG-Bench and other benchmarks — multi-digit arithmetic, transliteration into the International Phonetic Alphabet, unscrambling words, some multitask knowledge and reasoning benchmarks — across several model families, with the transition typically between $10^{22}$ and $10^{24}$ training FLOPs. They also noted that some prompting techniques, such as chain-of-thought prompting, help only beyond a certain scale. They argued that emergence means further scaling may unlock abilities that cannot be anticipated, with consequences for both opportunity and risk.

Schaeffer, Miranda and Koyejo (2023) argued that much of this apparent emergence is a consequence of the **metric**. If a task is scored by exact match — every token of the answer must be right — then a smooth improvement in per-token accuracy becomes a sharp curve.

::: proposition Exact match sharpens a smooth improvement {#prop-exact-match}
Suppose a model produces each of the $L$ tokens of an answer correctly with probability $p$, independently. Then its exact-match accuracy is $p^L$, while its expected number of correct tokens is $Lp$. As a function of $\log p$ (or of any quantity on which $p$ depends smoothly), $p^L$ is the exponential of $L$ times it, and for large $L$ it is close to $0$ until $p$ is close to $1$: its derivative with respect to $p$, $Lp^{L-1}$, is at most $L$ times larger than that of the linear metric at $p = 1$ and exponentially small for $p$ bounded away from $1$.
:::

::: proof
Exact match requires all $L$ independent tokens to be correct, which has probability $p^L$; the expected count of correct tokens is $Lp$ by linearity. $\log(p^L) = L\log p$. The derivative of $p^L$ is $Lp^{L-1}$, which equals $L$ at $p = 1$ and is at most $L(1-\delta)^{L-1}\le Le^{-\delta(L-1)}$ for $p\le1-\delta$.
:::

::: widget plot
f: (1/(1 + exp(-(x - 21))))^L; 1/(1 + exp(-(x - 21)))
x: 17, 27
y: 0, 1
sliders: L=8:1:30:1
labels: exact match on an $L$-token answer, $p^L$; per-token accuracy $p$
caption: A per-token accuracy $p$ that rises smoothly with $\log_{10}$ of training compute (here a logistic curve centred at $10^{21}$ FLOPs) and the exact-match accuracy $p^L$ it implies for answers of $L$ tokens. With $L = 1$ the two coincide; as $L$ grows, exact match stays near zero for longer and then rises steeply, looking "emergent" although nothing discontinuous happens to the model. This is the core of the argument of Schaeffer et al. (2023).
:::

Schaeffer et al. supported the argument in three ways. Re-scoring arithmetic tasks of one model family with a continuous metric (token edit distance) turned sharp curves into smooth ones. A meta-analysis of BIG-Bench found that the tasks reported as emergent were concentrated in a few discontinuous metrics, chiefly exact string match and multiple-choice grade. And they induced apparent emergence in vision models by choosing discontinuous metrics. They also pointed to **resolution**: with few test examples, small accuracies are indistinguishable from zero.

The response to this argument has been mixed, and both sides have a case.

- **For the metric explanation.** It shows that a sharp curve in one metric does not imply a sharp change in the model; when a smooth underlying quantity can be found, behaviour becomes more predictable, which is good news for forecasting capabilities.
- **Against it as the whole story.** Some abilities still change abruptly under continuous metrics, or the appropriate continuous metric is not obvious (Du et al., 2024, found that several abilities appear once the pretraining loss falls below a threshold, even when measured continuously, while others improve smoothly from the start). And for users the discontinuous metric is often the relevant one: a program that is almost correct does not run, and an arithmetic answer with one wrong digit is wrong. Ganguli et al. (2022) described the combination as "predictability and surprise": aggregate loss is predictable, specific capabilities often are not.

A fair summary as of 2026: the claim that abilities appear **discontinuously in the model** is weaker than it first seemed, because many sharp curves are explained by metrics and resolution; the claim that **specific task performance is hard to forecast** from small models remains substantially true, and is the practical concern for both planning and safety evaluation ([[evaluation/capability-evaluations]]).

::: warning Do not read an S-curve as a phase transition without checking the metric
When a benchmark score jumps between two checkpoints or two model sizes, first ask how it is scored. Plot a continuous companion metric — the log-probability of the correct answer, the per-token accuracy, the edit distance — with confidence intervals. If the continuous metric was improving steadily all along, the jump is a property of the metric; if it too jumps, something did change in the model. Either way, two adjacent points on a noisy benchmark are not evidence of emergence.
:::

**Emergence within a training run.** Some changes during training are genuinely abrupt. Olsson et al. (2022) found that **induction heads** — attention circuits that copy a token that followed an earlier occurrence of the current token — form within a narrow window early in training, coinciding with a visible bump in the loss curve and a jump in in-context learning ability ([[interpretability]] studies such circuits). Open suites of checkpoints, such as Pythia (Biderman et al., 2023: $16$ models from $70$ million to $12$ billion parameters, all trained on the same data in the same order, with $154$ checkpoints each) and the OLMo releases, have made these dynamics studyable outside the labs that train the models.

::: example Exact match versus partial credit {#ex-exact}
A model's per-token accuracy on $8$-token answers is $0.73$ at one checkpoint and $0.88$ at a later one. Compute the exact-match accuracy and the expected number of correct tokens at both, assuming independence.
::: solution
Exact match: $0.73^8 = 0.081$ and $0.88^8 = 0.360$, more than a fourfold increase. Expected correct tokens: $8\cdot0.73 = 5.84$ and $8\cdot0.88 = 7.04$, a $21\%$ increase. The same change in the model looks like a breakthrough under one metric and like steady progress under the other — the situation of [[#prop-exact-match]].
:::
:::

## An evaluation protocol {#sec-protocol}

::: algorithm Evaluation during a pretraining run {#alg-protocol}
1. **Before training**: fix validation sets per domain, deduplicated against the training data; fix a small, cheap suite of probes with known formulations (cloze for early signal, lettered multiple choice later) and normalisations; decontaminate the training data against them ([[pretraining/training-data#sec-contamination]]).
2. **Every few hundred to few thousand steps**: compute per-domain validation losses and the probe suite; log them with the step, tokens seen and learning rate.
3. **Report uncertainty**: standard errors for losses ([[#prop-se]]) and benchmark scores, paired comparisons between checkpoints, and averages over nearby checkpoints.
4. **Account for the schedule**: compare checkpoints at equal points of the schedule, or evaluate short decayed branches when the run uses WSD.
5. **At decision points** (mixture changes, annealing, the end of training), run a broader, more expensive suite, including held-out tasks that were not used for any decision, to check for overfitting to the probes.
:::

The last step matters because probes used to make decisions become optimisation targets: if the annealing mixture is chosen to maximise a mathematics benchmark, that benchmark no longer measures mathematical ability without bias. Keeping some evaluations untouched until the end is the pretraining equivalent of a test set ([[ml-fundamentals/generalisation#sec-splits]]).

## Noise and sharpness in code {#sec-code}

The listing reproduces the exact-match effect of [[#prop-exact-match]], checks the binomial standard error of a $1000$-question benchmark by simulation, and computes a paired comparison of two checkpoints that agree on most questions.

```python
import math, random

# 1. a smooth per-token ability turns into a sharp exact-match curve
def per_token(logC):                 # per-token accuracy rising smoothly with log10 compute
    return 1 / (1 + math.exp(-(logC - 21)))
L = 8                                # the answer has 8 tokens; exact match needs all of them
print("log10 C  per-token  exact match  expected tokens correct")
for logC in range(18, 26):
    p = per_token(logC)
    print(f"  {logC}     {p:.3f}      {p ** L:.4f}          {p * L:.2f}")

# 2. how noisy is a benchmark? 1000 questions, true accuracy 0.62
rng = random.Random(0)
n, acc = 1000, 0.62
scores = [sum(rng.random() < acc for _ in range(n)) / n for _ in range(2000)]
mean = sum(scores) / len(scores)
sd = math.sqrt(sum((s - mean) ** 2 for s in scores) / (len(scores) - 1))
print(f"simulated sd of the score {sd:.4f}, binomial formula {math.sqrt(acc * (1 - acc) / n):.4f}")

# 3. paired comparison of two checkpoints on the same questions
a = [rng.random() < 0.62 for _ in range(n)]                        # checkpoint A right/wrong
b = [x if rng.random() < 0.85 else (rng.random() < 0.64) for x in a]  # B: mostly agrees with A
diff = [int(y) - int(x) for x, y in zip(a, b)]
d = sum(diff) / n
sd_d = math.sqrt(sum((v - d) ** 2 for v in diff) / (n - 1) / n)
print(f"A {sum(a) / n:.3f}  B {sum(b) / n:.3f}  difference {d:+.3f} +/- {sd_d:.3f} (paired)"
      f"  vs +/- {math.sqrt(2 * 0.62 * 0.38 / n):.3f} (unpaired)")
```

```text
log10 C  per-token  exact match  expected tokens correct
  18     0.047      0.0000          0.38
  19     0.119      0.0000          0.95
  20     0.269      0.0000          2.15
  21     0.500      0.0039          4.00
  22     0.731      0.0816          5.85
  23     0.881      0.3622          7.05
  24     0.953      0.6779          7.62
  25     0.982      0.8648          7.86
simulated sd of the score 0.0151, binomial formula 0.0153
A 0.596  B 0.609  difference +0.013 +/- 0.008 (paired)  vs +/- 0.022 (unpaired)
```

Between $10^{20}$ and $10^{21}$ FLOPs the per-token accuracy almost doubles while exact match stays below $0.4\%$ — on a benchmark of a few hundred questions, indistinguishable from zero. Over the next three orders of magnitude exact match climbs to $68\%$. The simulated spread of benchmark scores agrees with the binomial formula, and pairing reduces the standard error of a checkpoint comparison almost threefold.

::: quiz
A base model is evaluated every $5000$ steps on a $400$-question multiple-choice benchmark in the lettered format. Its accuracy stays at $25\%$ (chance with four options) for the first half of training and then rises to $45\%$. Which conclusions are justified? (Select all that apply.)
- [ ] The model acquired the underlying knowledge abruptly halfway through training.
- [x] The cloze formulation, or the probability of the correct answer, might show earlier and smoother progress.
- [x] Differences of $2$ points between adjacent checkpoints are within noise.
- [ ] Validation loss must have dropped abruptly at the same time.
::: solution
The lettered format often stays at chance until a model has learned the answer-letter convention, so the knowledge may have been present earlier; a continuous or cloze metric would test this. With $400$ questions the standard error at $35\%$ is $\sqrt{0.35\cdot0.65/400} = 2.4$ points, so two-point steps are noise. Nothing requires the validation loss to change abruptly: smooth loss and sharp task metrics coexist ([[#prop-exact-match]]).
:::
:::

::: history
Perplexity on held-out text has been the standard measure of language models since the work of Jelinek and colleagues at IBM in the 1970s and 1980s. With pretrained Transformers, downstream probes moved into training: GPT-2 (2019) and GPT-3 (2020) reported zero- and few-shot benchmark results by likelihood scoring, and the EleutherAI language-model evaluation harness (from 2020) made such scoring a shared tool. Kaplan et al. (2020) fitted scaling laws to validation losses, and Hoffmann et al. (2022) used intermediate losses of many runs to estimate compute-optimal sizes. BIG-Bench (Srivastava et al., 2022) collected over two hundred tasks; Ganguli et al. (2022) described "predictability and surprise", Wei et al. (2022) catalogued emergent abilities, and Schaeffer, Miranda and Koyejo (2023) argued they were largely created by metrics. Olsson et al. (2022) related the formation of induction heads to a phase change during training; Pythia (Biderman et al., 2023) and OLMo (Groeneveld et al., 2024) released checkpoints for studying training dynamics, and OLMES (Gu et al., 2024) and Madaan et al. (2024) addressed the formats and variance of base-model evaluation.
:::

::: summary
- **Validation loss** per domain, on held-out deduplicated data, is the main signal during pretraining; compare across tokenisers in bits per byte, and estimate its standard error at the document level.
- WSD schedules make stable-phase checkpoints look worse than they are; evaluate decayed branches when a prediction is needed.
- Base models are probed by **likelihood scoring** of candidate answers; results depend on the formulation (cloze or lettered) and on length normalisation.
- Benchmark scores have binomial noise $\sqrt{p(1-p)/n}$ plus checkpoint-to-checkpoint variance; compare checkpoints with paired tests and average nearby checkpoints.
- **Emergent abilities** (Wei et al., 2022) are tasks on which performance jumps from chance with scale; Schaeffer et al. (2023) showed that discontinuous metrics such as exact match ($p^L$) and limited resolution create many such jumps. Smooth underlying quantities make progress more predictable, but specific task performance remains hard to forecast, and some changes — such as the formation of induction heads — are genuinely abrupt.
- Keep some evaluations out of all training decisions, so that they still measure what they were meant to.
:::

## Exercises

::: exercise Perplexity from loss {level=1 check="7.389"}
A checkpoint's validation loss is $2.0$ nats per token. What is its perplexity, to three decimal places?
::: solution
$e^{2.0} = 7.389$.
:::
:::

::: exercise Benchmark standard error {level=1 check="0.0153"}
What is the standard error of the accuracy on a $1000$-question benchmark for a model with true accuracy $0.62$? Give four decimal places.
::: solution
$\sqrt{0.62\cdot0.38/1000} = \sqrt{0.0002356} = 0.0153$.
:::
:::

::: exercise Exact match {level=1 check="0.0816"}
Per-token accuracy is $0.7311$ and answers have $8$ tokens. What is the exact-match accuracy, assuming independence? Give four decimal places.
::: solution
$0.7311^8 = 0.0816$, as in the listing's row for $10^{22}$ FLOPs (where the per-token accuracy is $1/(1 + e^{-1}) = 0.7311$).
:::
:::

::: exercise Questions needed {level=2 check="2500"}
How many questions must a benchmark have for the standard error of an accuracy near $0.5$ to be at most one percentage point? Give the smallest integer $n$ with $\sqrt{p(1-p)/n}\le0.01$ at $p = 0.5$. How many are needed to resolve a difference of one point between two **independent** models at two standard errors?
::: solution
$\sqrt{0.25/n}\le0.01$ requires $n\ge0.25/0.0001 = 2500$. For a difference between independent models the standard error is $\sqrt{2\cdot0.25/n}$, and two standard errors at most $0.01$ requires $\sqrt{0.5/n}\le0.005$, $n\ge20{,}000$ — more questions than most benchmarks have, which is why paired comparisons and continuous metrics matter.
:::
:::

::: exercise Length normalisation {level=2}
In [[#ex-mc]], suppose a fourth candidate *Canberra, the capital* ($6$ tokens, $21$ characters) has summed log-probability $-7.0$. Which answer does each normalisation choose now? What does this suggest about long candidates?
::: solution
Raw: Sydney ($-4.1$) still wins. Per token: the new candidate scores $-7.0/6 = -1.167$, better than Canberra's $-1.60$, so it wins. Per character: $-7.0/21 = -0.333$, again the best. Per-token and per-character normalisation can favour long candidates whose later tokens are highly predictable once the first ones are given (here *the capital* is easy after *Canberra,*). Benchmarks therefore keep candidates comparable in form, and some scorers normalise by the probability of the candidate given a neutral context instead.
:::
:::

::: exercise A validation standard error {level=2 check="0.002"}
A validation set has $m = 2500$ documents of $\bar n = 1000$ tokens each, and the sample standard deviation of $S_j - \hat{\mathcal L}n_j$ is $100$ nats. What is the standard error of the validation loss by [[#prop-se]]?
::: solution
$\frac{1}{\bar n\sqrt m}\cdot100 = \frac{100}{1000\cdot50} = 0.002$ nats. For comparison, independent tokens with $\sigma = 2.5$ would give $2.5/\sqrt{2.5\times10^6} = 0.0016$; the within-document correlation raises the standard error by $25\%$.
:::
:::

::: exercise Smooth or sudden? {level=2}
A team reports that accuracy on a $3$-digit multiplication task jumps from $2\%$ to $40\%$ between models of $10^{22}$ and $10^{23}$ training FLOPs. List three additional measurements that would help decide whether the jump reflects a sudden change in the model or a property of the metric.
::: solution
(1) A continuous metric on the same outputs: per-digit accuracy or edit distance between the produced and correct answer, and the log-probability the model assigns to the correct answer under teacher forcing. (2) More model sizes (or intermediate checkpoints) between $10^{22}$ and $10^{23}$ FLOPs, with confidence intervals from enough test items to resolve accuracies near $0$. (3) The same analysis on related tasks — $1$- and $2$-digit multiplication, where shorter answers should make the curve less sharp if the exact-match explanation holds ($p^L$ with smaller $L$). If the continuous metrics improve steadily and shorter variants show smoother curves, the jump is mostly a metric effect.
:::
:::

::: exercise The sharpest point of an exact-match curve {level=3}
Let the per-token accuracy be $p(x) = 1/(1 + e^{-(x - x_0)})$, a logistic function of $x = \log_{10}C$, and let exact match be $E(x) = p(x)^L$. Show that $E$ rises fastest where $p = L/(L + 1)$, and compute the location for $L = 8$ relative to $x_0$. What is the maximum slope $E'(x)$, and how does it compare with the maximum slope $1/4$ of $p$ itself?
::: solution
$p' = p(1-p)$, so $E' = Lp^{L-1}p' = Lp^L(1-p)$. Maximising $g(p) = p^L(1-p)$ over $p$: $g' = p^{L-1}(L - (L+1)p) = 0$ gives $p = L/(L+1)$. Since $p$ is increasing in $x$, this is where $E$ rises fastest. For $L = 8$, $p = 8/9$, so $x - x_0 = \ln(p/(1-p)) = \ln8 = 2.08$: the steepest point lies about two units of $\log_{10}C$ to the right of the per-token midpoint. The maximum slope is $L(8/9)^8(1/9) = 8\cdot0.3897/9 = 0.346$, larger than $1/4$; as $L$ grows it approaches $1/e\approx0.37$, while the curve is shifted further right, by $\ln L$. So exact match is delayed by $\ln L$ and somewhat steeper — "emergence" appears late mostly because of the delay.
:::
:::

::: exercise Paired standard error {level=3}
Show that for two checkpoints scored on the same $n$ questions, with per-question correctness $A_i, B_i\in\{0, 1\}$, the variance of the difference of their accuracies is $\frac1n\big(\Var(A) + \Var(B) - 2\Cov(A, B)\big)$, and explain with this formula why the paired standard error in [[#sec-code]] is $0.008$ rather than $0.022$.
::: solution
The difference of accuracies is $\frac1n\sum_i(B_i - A_i)$, an average of $n$ independent copies of $B - A$, so its variance is $\Var(B - A)/n = (\Var(A) + \Var(B) - 2\Cov(A, B))/n$. Unpaired reasoning drops the covariance term and gives $\approx2\cdot0.62\cdot0.38/n$, a standard error of $0.022$. In the simulation, $B$ copies $A$ on $85\%$ of questions, so $A$ and $B$ are strongly positively correlated; the covariance cancels most of the variance and leaves $\Var(B - A)$ equal to roughly the fraction of disagreeing questions (about $0.06$ to $0.07$), giving $\sqrt{0.065/1000} = 0.008$.
:::
:::
