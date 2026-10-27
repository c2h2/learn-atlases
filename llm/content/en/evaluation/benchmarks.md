A **benchmark** is an evaluation packaged for reuse: a fixed set of items, reference answers or tests, and a scoring rule, published so that anyone can run it and compare results. Benchmarks are how the field keeps score, and much of the history of language models can be told as a sequence of benchmarks that were proposed as hard, adopted widely, and then **saturated** — solved to the point where they no longer separate the best models. Knowing the main benchmarks, what they contain and how they are scored is necessary for reading any technical report; knowing their limits is necessary for believing one.

This chapter surveys the benchmarks that shaped the field, from GLUE (2018) to Humanity's Last Exam (2025), grouped by what they measure: language understanding, knowledge, reasoning and mathematics, code, software engineering, instruction following and multilingual ability. It then treats the **formats** in detail — multiple choice scored by log-likelihood or by generation, with its normalisation choices; short answers with exact match and token F1; code with unit tests and pass@$k$; and open-ended tasks that need judges. It ends with the **life cycle** of a benchmark: a simple model of saturation curves, why benchmarks saturate faster than they used to, and what each new generation of benchmarks did to resist it. Scores quoted below are those reported in the cited papers at the time, as illustrations of difficulty; they are not current standings.

## A short history {#sec-history}

### Language understanding: GLUE and SuperGLUE {#sec-glue}

The **General Language Understanding Evaluation** benchmark (GLUE; Wang et al., 2018) combined nine existing English tasks — single-sentence classification (acceptability, sentiment), sentence-pair similarity and paraphrase, and natural-language inference — into one score with a public leaderboard and a private test set. It was designed for the pretrain-then-fine-tune era ([[sequence-models/contextual-embeddings]]): each model was fine-tuned on each task's training set. GLUE reported a human baseline of $87.1$; within a little over a year, fine-tuned pretrained Transformers exceeded it. The same group released **SuperGLUE** (Wang et al., 2019), eight harder tasks including coreference, causal reasoning and multi-sentence reading comprehension, with a human baseline of $89.8$; it was surpassed in under two years. These two benchmarks established the pattern this chapter keeps returning to: a carefully built benchmark, a human baseline, and a gap that closed faster than its authors expected.

### Knowledge: MMLU and its successors {#sec-mmlu}

As models became usable with prompts alone ([[prompting-rag/in-context-learning]]), evaluation moved from fine-tuned tasks to **few-shot** or **zero-shot** tests of what a model knows. **MMLU** (Massive Multitask Language Understanding; Hendrycks et al., 2021) collected about $16{,}000$ four-option multiple-choice questions in $57$ subjects, from elementary mathematics to professional law and medicine, at levels from high school to professional. At publication the largest GPT-3 model scored about $44\%$ (chance is $25\%$), and the authors estimated expert-level accuracy at about $90\%$. MMLU became the most-cited knowledge benchmark for several years, and its decline illustrates every theme of this course: scores clustered near the top, implementations disagreed ([[evaluation/evaluation-principles#sec-pipeline]]), questions circulated online ([[evaluation/contamination]]), and an audit (Gema et al., 2024) estimated that several per cent of its questions have errors — wrong keys, ambiguous or unanswerable questions — with much higher rates in a few subjects, so that its effective ceiling is below $100\%$. Successors include **MMLU-Pro** (Wang et al., 2024; ten options, more reasoning-heavy questions) and multilingual versions.

### Breadth: BIG-bench and HELM {#sec-breadth}

Two efforts in 2022 aimed at breadth rather than a single score. **BIG-bench** (Srivastava et al., 2022) gathered $204$ tasks contributed by more than $400$ authors, from logical deduction and arithmetic to emoji-based movie guessing, deliberately including tasks believed to be beyond the models of the time; it was used to study how abilities change with scale ([[pretraining/in-training-evaluation]]). **BIG-Bench Hard** (Suzgun et al., 2022) selected $23$ of its tasks on which models had not yet beaten the average human rater, and showed that chain-of-thought prompting ([[reasoning/chain-of-thought]]) lifted many of them above it. **HELM** (Holistic Evaluation of Language Models; Liang et al., 2022) took the other route to breadth: a standardised protocol run by one group over many models, dozens of scenarios and seven metrics — accuracy, calibration, robustness, fairness, bias, toxicity and efficiency — published as a full matrix.

### Mathematics and reasoning {#sec-math}

**GSM8K** (Cobbe et al., 2021) contains about $8{,}500$ grade-school word problems requiring two to eight steps of arithmetic, with a test split of about $1{,}300$; the final answer is an integer, scored by exact match. **MATH** (Hendrycks et al., 2021) contains $12{,}500$ problems from mathematics competitions (AMC, AIME and others) in seven subjects and five difficulty levels, with answers in LaTeX that must be compared up to equivalence; a $500$-problem subset of its test set, **MATH-500**, introduced by Lightman et al. (2023), is often reported instead of the full test set. When both became saturated, reports turned to recent competition problems (such as the American Invitational Mathematics Examination, whose problems are new each year) and to research-level sets. **GPQA** (Rein et al., 2023) addressed a different problem — that questions which non-experts can look up are easy for models trained on the web — with $448$ multiple-choice questions in biology, physics and chemistry written and validated by domain experts. Experts with or pursuing PhDs in the relevant field reached $65\%$ ($74\%$ discounting mistakes they acknowledged afterwards), while skilled non-experts with unrestricted web access and over half an hour per question reached $34\%$: the questions are "Google-proof". Its **Diamond** subset of $198$ questions, on which experts agreed and non-experts failed, is the most reported.

### Code and software engineering {#sec-code-benchmarks}

**HumanEval** (Chen et al., 2021) has $164$ hand-written Python programming problems, each a function signature with a docstring and hidden unit tests; a solution counts if it passes all the tests. Its scoring by **execution** rather than text similarity was a major step, because code that looks right but is wrong scores zero. **MBPP** (Austin et al., 2021) is a similar set of about $1{,}000$ simpler problems. Both test self-contained functions; **SWE-bench** (Jimenez et al., 2023) tests software engineering in real repositories. Each of its $2{,}294$ items is a GitHub issue from one of $12$ popular Python projects, with the repository at the commit before the fix; a model must produce a patch, and the item is resolved if tests that the real fix made pass ("fail-to-pass") now pass, without breaking tests that passed before. In the original paper the best model resolved about $2\%$. Because some items had underspecified issues or tests that rejected valid solutions, a $500$-item subset screened by human annotators, **SWE-bench Verified**, was released in 2024 and became the common reference; tasks like these are typically attempted by an agent with tools ([[agents]]).

### Instructions and languages {#sec-instructions}

**IFEval** (Zhou et al., 2023) measures instruction following with about $500$ prompts containing **verifiable** constraints — "answer in fewer than $100$ words", "include the keyword *x* twice", "use no commas" — checked by code, so that no judge is needed. Multilingual benchmarks include **XNLI** (Conneau et al., 2018; inference in $15$ languages), **MGSM** (Shi et al., 2022; $250$ GSM8K problems translated into ten typologically diverse languages), **FLORES-200** (NLLB Team, 2022; translation among $200$ languages), **Belebele** (Bandarkar et al., 2023; reading comprehension in over $120$ language variants) and **Global-MMLU** (Singh et al., 2024), which translated MMLU into $42$ languages and annotated which questions depend on culturally specific (often Western) knowledge — a reminder that translating a benchmark does not make it culturally neutral.

### Frontier knowledge: Humanity's Last Exam {#sec-hle}

**Humanity's Last Exam** (HLE; Phan et al., 2025), organised by the Center for AI Safety and Scale AI, collected questions from about a thousand subject experts across more than a hundred subjects, many of them mathematics; the published set has $2{,}500$ questions, some multiple-choice and some short exact-answer, about $14\%$ requiring an image. Candidate questions were first tested against several frontier models, and questions that the models answered correctly were rejected before expert review. At release the authors reported low accuracies for all models they tested, and also high **calibration error**: the models' stated confidence was far above their accuracy. The adversarial filtering that makes such a benchmark hard has a statistical side effect worth understanding, which [[#ex-filter-bias]] quantifies: scores of the models used for filtering are pushed down by construction, so early comparisons between those models and others are biased.

::: warning A benchmark name is not a measurement
"MATH", "SWE-bench" or "MMLU" can refer to different item sets (full test set, MATH-500, Verified, Lite), different versions with corrected items, and different protocols (zero-shot or five-shot, with or without chain of thought, with an agent scaffold or without). Reasoning models add a further variable, the budget of thinking tokens or the number of samples. Two numbers attached to the same benchmark name are comparable only if the subset, version and protocol match. When a report does not state them, the number cannot be placed next to any other.
:::

## Formats and scoring {#sec-formats}

A benchmark's format determines what counts as an answer and how it is scored. Four formats cover almost all of them.

::: definition Benchmark formats {#def-formats}
- **Multiple choice**: the item lists $K$ options, exactly one correct. Scored by **log-likelihood** (the model's probabilities for each option are compared, [[pretraining/in-training-evaluation]]) or by **generation** (the model writes its choice, which is extracted).
- **Short answer**: the model writes a short answer — a number, a name, an expression — compared with one or more references by **exact match** after normalisation, by **token F1**, or by equivalence checking.
- **Execution-based**: the answer is a program or a patch, and it is scored by running tests; **pass@$k$** is the probability that at least one of $k$ samples passes.
- **Open-ended**: free-form responses (essays, advice, dialogue) scored by human raters ([[evaluation/human-evaluation]]) or model judges ([[evaluation/model-judges]]), possibly against a rubric or a reference.
:::

### Multiple choice by likelihood {#sec-loglik}

For a context $c$ and candidate answer strings $a_1, \dots, a_K$, likelihood scoring picks $\arg\max_k\ell(a_k)$ for some score $\ell$ computed from token log-probabilities. The pretraining course defines the options of no normalisation, per-token and per-character normalisation, and the lettered versus **cloze** formulations. Two further facts explain why they behave as they do.

::: proposition Length and surface form in likelihood scoring {#prop-length}
Let $a$ have tokens $a_1, \dots, a_L$ and log-likelihood $\log p(a\mid c) = \sum_{t=1}^L\log p(a_t\mid c, a_{<t})$.

1. If every token of $a$ has conditional probability at most $q < 1$, then $\log p(a\mid c)\le L\log q$: unnormalised scores decrease at least linearly in length. The per-token score $\frac1L\log p(a\mid c)$ is the logarithm of the geometric mean token probability, and does not have this penalty.
2. Suppose the model's probabilities factorise as $p(a\mid c) = g(a)\,h(a, c)$, where $g(a)$ captures how common the string $a$ is regardless of the question (its **surface form**) and $h$ how well it answers $c$. Then the **pointwise mutual information** score

$$
\ell_{\text{PMI}}(a) = \log p(a\mid c) - \log p(a\mid c_0),
$$ {#eq-pmi}

with $c_0$ a neutral context such as "Answer:", equals $\log h(a, c) - \log h(a, c_0)$: it does not depend on $g$.
:::

::: proof
(1) Each term of the sum is at most $\log q < 0$, and there are $L$ terms. The per-token score is $\log\big(\prod_tp(a_t\mid\cdot)\big)^{1/L}$, the log of the geometric mean. (2) Substituting the factorisation in both terms, $\log g(a) + \log h(a, c) - \log g(a) - \log h(a, c_0)$; the surface-form term cancels.
:::

The factorisation in (2) is a model, not a fact about language models, but it captures a real effect described by Holtzman et al. (2021) as **surface form competition**: probability mass is split between different strings that express the same answer ("dog", "Dog", "a dog", "puppy"), and common strings get more of it regardless of correctness. The GPT-3 paper (Brown et al., 2020) used exactly the score of [[#eq-pmi]] for several multiple-choice benchmarks, dividing the conditional probability of each completion by its probability after "Answer:". Each normalisation suits some benchmarks and not others; the important practice is to report which was used.

::: example Normalisation changes the answer {#ex-pmi}
For a question whose correct answer is "Canberra", a model gives these log-probabilities in context and after the neutral prompt "Answer:". Which option does raw scoring choose, and which does PMI scoring choose?

| option | $\log p(a\mid c)$ | $\log p(a\mid c_0)$ |
|---|---|---|
| Sydney | $-1.2$ | $-5.0$ |
| Canberra | $-1.5$ | $-7.5$ |
| Melbourne | $-2.5$ | $-5.8$ |
::: solution
Raw: Sydney ($-1.2$) is the highest. PMI: Sydney $-1.2 + 5.0 = 3.8$; Canberra $-1.5 + 7.5 = 6.0$; Melbourne $-2.5 + 5.8 = 3.3$, so Canberra wins. The model rates Sydney highly partly because "Sydney" is a common string in any context; PMI removes that prior and asks how much the *question* raises each option's probability. A different benchmark could equally have the opposite effect, which is why normalisation is part of the protocol.
:::
:::

### Multiple choice by generation {#sec-mc-generation}

Instruction-tuned models are usually asked to write their choice ("Answer with the letter of the correct option"), often after reasoning. This makes the format natural for the model and allows chain of thought, but brings back extraction ([[evaluation/evaluation-principles#prop-extraction]]) and exposes the score to **option-order** and **letter** biases: models can prefer particular letters or positions independently of content (Zheng et al., 2024, measured such "selection bias" and proposed debiasing by permuting options). Averaging over several cyclic permutations of the options, or reporting the spread, controls for it at proportional cost.

### Short answers: exact match and F1 {#sec-em-f1}

For extractive question answering, SQuAD (Rajpurkar et al., 2016) introduced two scores that remain standard after **normalisation**: lower-casing, removing punctuation and the articles *a*, *an*, *the*, and collapsing whitespace.

::: definition Exact match and token F1 {#def-em-f1}
For a prediction $\hat y$ and reference answers $y^{(1)}, \dots, y^{(r)}$, with $\operatorname{norm}$ the normalisation above, **exact match** is $\max_j\mathbf{1}[\operatorname{norm}\hat y = \operatorname{norm}y^{(j)}]$. Treating normalised strings as bags of tokens $P$ (prediction) and $G$ (reference), with $\lvert P\cap G\rvert$ counting shared tokens with multiplicity, **precision** is $\lvert P\cap G\rvert/\lvert P\rvert$, **recall** $\lvert P\cap G\rvert/\lvert G\rvert$, and **token F1** is their harmonic mean, maximised over the references.
:::

```python
import re, string
from collections import Counter

def normalise(s):
    """SQuAD-style: lower case, drop punctuation and the articles a/an/the, collapse spaces."""
    s = s.lower()
    s = "".join(ch for ch in s if ch not in set(string.punctuation))
    s = re.sub(r"\b(a|an|the)\b", " ", s)
    return " ".join(s.split())

def exact_match(pred, golds):
    return max(float(normalise(pred) == normalise(g)) for g in golds)

def f1(pred, golds):
    def one(p, g):
        p, g = normalise(p).split(), normalise(g).split()
        common = sum((Counter(p) & Counter(g)).values())
        if common == 0:
            return 0.0
        prec, rec = common / len(p), common / len(g)
        return 2 * prec * rec / (prec + rec)
    return max(one(pred, g) for g in golds)          # best match over reference answers

golds = ["Denver Broncos", "the Broncos"]
for pred in ["Denver Broncos", "The Broncos!", "the Denver Broncos football team",
             "Broncos", "Carolina Panthers"]:
    print(f"{pred!r:36s} EM = {exact_match(pred, golds):.0f}  F1 = {f1(pred, golds):.3f}")
```

```text
'Denver Broncos'                     EM = 1  F1 = 1.000
'The Broncos!'                       EM = 1  F1 = 1.000
'the Denver Broncos football team'   EM = 0  F1 = 0.667
'Broncos'                            EM = 1  F1 = 1.000
'Carolina Panthers'                  EM = 0  F1 = 0.000
```

The verbose but correct answer gets partial credit from F1 and none from exact match; "Broncos" matches the second reference exactly once its article is removed. Token F1 was designed for short extractive spans; for the long answers of chat models it rewards copying words and penalises correct paraphrases, which is one reason such answers are now judged rather than matched.

### Code: execution and pass@$k$ {#sec-passk}

When a model can sample many programs, the natural question is how likely it is to produce a correct one in $k$ attempts. Chen et al. (2021) estimate this without bias by drawing $n\ge k$ samples per problem, counting the $c$ that pass, and computing

$$
\widehat{\text{pass@}k} = 1 - \binom{n - c}{k}\Big/\binom{n}{k},
$$ {#eq-passk}

the probability that a random subset of $k$ of the $n$ samples contains at least one correct one, averaged over problems. The estimator, its derivation and its relation to majority voting are in [[reasoning/self-consistency]]. Two caveats are specific to benchmarks. First, pass@$k$ for $k > 1$ assumes that someone or something can tell which of the $k$ samples is correct; it measures **coverage**, not what a user receives. Second, the tests are the scoring rule, and weak tests accept wrong programs: EvalPlus (Liu et al., 2023) added many tests to HumanEval and MBPP and found that measured pass rates fell substantially.

::: example How fine-grained is a small benchmark? {#ex-granularity}
HumanEval has $164$ problems and GPQA Diamond $198$. What is one problem worth in percentage points on each, and what is the binomial standard error of a score of $80\%$ on HumanEval and of $50\%$ on GPQA Diamond?
::: solution
One problem: $100/164 = 0.61$ points on HumanEval, $100/198 = 0.51$ on GPQA Diamond. Standard errors: $\sqrt{0.8\cdot0.2/164} = 0.031$, about $3.1$ points; $\sqrt{0.5\cdot0.5/198} = 0.036$, about $3.6$ points. A difference of two or three points between models on either benchmark, from a single run, is well within sampling noise; [[evaluation/evaluation-statistics]] shows how pairing and repeated sampling sharpen the comparison.
:::
:::

::: widget distribution
dist: binomial
params: n=164, p=0.8
a: 126
b: 136
normal: true
caption: The number of HumanEval problems solved by a model that solves each with probability $0.8$, independently: about $131\pm5$. The shaded band from $126$ to $136$ — scores from $76.8\%$ to $82.9\%$ — holds about three quarters of the probability. Change $n$ to see how many problems a benchmark needs before one-point differences become visible.
:::

::: quiz
A paper reports that its model "scores $85$ on MATH". Which pieces of information do you need before comparing this with another model's reported $83$?
- [x] Whether the full test set or the MATH-500 subset was used
- [x] Whether answers were checked for mathematical equivalence or exact string match
- [x] Whether the score is a single greedy sample, an average over samples, or a majority vote
- [ ] The model's parameter count
::: solution
The first three define the estimand ([[evaluation/evaluation-principles#def-evaluation]]): the item set, the scoring rule and the protocol. Any of them can move a score by more than two points. The parameter count is interesting for other reasons but does not affect what the number means. Even with all three matched, a two-point difference on $500$ problems is near the noise level.
:::
:::

## The life cycle of a benchmark {#sec-lifecycle}

Benchmarks age. Kiela et al. (2021) plotted the time from the introduction of well-known benchmarks to the point where models matched their human baselines — MNIST, Switchboard, ImageNet, SQuAD, GLUE and others — and found that it had shortened from many years to around one. Since then the pattern has repeated with MMLU, GSM8K, HumanEval and others: a period near chance, a rapid rise, and a plateau near the ceiling.

::: definition Saturation {#def-saturation}
A benchmark is **saturated** when the best available scores are close to its **ceiling** — the highest score attainable given errors and ambiguity in its items, often estimated by a human expert baseline or an audit — so that remaining differences between strong models are comparable to sampling noise and label errors. A useful descriptive model of the best score over time $t$ is the logistic **saturation curve**

$$
s(t) = s_0 + (s_1 - s_0)\,\sigma\!\left(\frac{t - t_0}{\tau}\right),
$$ {#eq-saturation}

with floor $s_0$ (chance), ceiling $s_1$, midpoint $t_0$ and time scale $\tau$. It is an empirical description, not a law.
:::

::: proposition Width and resolution of a saturation curve {#prop-saturation}
Under [[#eq-saturation]], the time taken to go from a fraction $\alpha$ to a fraction $1 - \alpha$ of the way from floor to ceiling is

$$
\Delta t = 2\tau\ln\frac{1 - \alpha}{\alpha},
$$

which is $2\tau\ln9\approx4.39\,\tau$ from $10\%$ to $90\%$. The rate of progress $s'(t) = (s_1 - s_0)\,\sigma(1 - \sigma)/\tau$ is largest at $t_0$, where it equals $(s_1 - s_0)/(4\tau)$, and falls to zero at both ends: near the floor and near the ceiling, large changes in underlying capability produce small changes in score.
:::

::: proof
The fraction of the way is $\sigma(u)$ with $u = (t - t_0)/\tau$. Solving $\sigma(u) = \alpha$ gives $u = \ln\frac{\alpha}{1 - \alpha}$, and $\sigma(u) = 1 - \alpha$ gives $u = \ln\frac{1 - \alpha}{\alpha}$; the difference is $2\ln\frac{1-\alpha}{\alpha}$ in units of $\tau$. Differentiating, $s'(t) = (s_1 - s_0)\sigma'(u)/\tau$ with $\sigma' = \sigma(1 - \sigma)$, which is maximal ($\frac14$) at $u = 0$ and tends to $0$ as $u\to\pm\infty$.
:::

::: example Projecting a benchmark's lifetime {#ex-lifetime}
On a four-option benchmark with an estimated ceiling of $0.90$, the best reported score rises from $0.35$ to $0.60$ in one year. Assuming [[#eq-saturation]] with floor $0.25$, estimate $\tau$ and the time at which the best score will be $90\%$ of the way to the ceiling.
::: solution
The span is $0.65$. The two scores are $0.10/0.65 = 0.154$ and $0.35/0.65 = 0.538$ of the way, with logits $\ln(0.154/0.846) = -1.705$ and $\ln(0.538/0.462) = 0.154$. The logit of the fraction is $(t - t_0)/\tau$, so it rose by $1.859$ in a year: $\tau = 1/1.859 = 0.538$ years. Measuring $t$ in years from the first observation, $0.154 = (1 - t_0)/\tau$ gives $t_0 = 0.917$. The $90\%$ point has logit $\ln9 = 2.197$, reached at $t = 0.917 + 2.197\cdot0.538 = 2.10$ years, at a score of $0.25 + 0.9\cdot0.65 = 0.835$. Two points determine a logistic with known floor and ceiling exactly, so the projection is only as good as the assumed shape and ceiling; it is a planning estimate, not a forecast.
:::
:::

The second half of the proposition is the reason saturated benchmarks stop being informative before they reach $100\%$: in the flat upper tail, the score barely responds to capability, while the noise from finite items and label errors does not shrink. The same shape at the bottom explains "emergence" on some benchmarks: a capability that grows smoothly can produce a score that sits at chance and then rises abruptly ([[pretraining/in-training-evaluation]]).

::: widget plot
f: 0.25 + (c - 0.25)/(1 + exp(-(x - m)/s)); (c - 0.25)*(1/(1 + exp(-(x - m)/s)))*(1 - 1/(1 + exp(-(x - m)/s)))/s
x: 2018, 2028
y: 0, 1
sliders: m=2022:2019:2026:0.1; s=0.7:0.2:2:0.05; c=0.92:0.6:1:0.01
labels: best score $s(t)$; rate of progress $s'(t)$ per year
hlines: 0.25
caption: The saturation curve of [[#def-saturation]] for a four-option benchmark (floor $0.25$), with midpoint $m$, time scale $s$ (in years) and ceiling $c$. The rate of progress peaks at the midpoint and vanishes near both the floor and the ceiling. With $s = 0.7$ years the climb from $10\%$ to $90\%$ of the way takes about three years.
:::

The listing fits the curve by least squares to a **synthetic** history of best scores — generated from known parameters with noise, standing in for the "best published score" of a real benchmark — and estimates when it reaches $90\%$ of the way to its ceiling.

```python
import math, random

def curve(t, t0, tau, floor=0.25, ceil=0.92):
    """Best score on a 4-option benchmark at time t (years): logistic from chance to ceiling."""
    return floor + (ceil - floor) / (1 + math.exp(-(t - t0) / tau))

rng = random.Random(3)
# synthetic "best published score" every half year, generated from t0 = 2022.0, tau = 0.7
years = [2019 + 0.5 * i for i in range(13)]
best = [min(0.92, curve(t, 2022.0, 0.7) + rng.gauss(0, 0.015)) for t in years]

# least-squares fit of (t0, tau) by grid search, floor and ceiling fixed
fit = min(((sum((curve(t, a, b) - s) ** 2 for t, s in zip(years, best)), a, b)
           for a in [2020 + 0.01 * i for i in range(401)]
           for b in [0.2 + 0.01 * j for j in range(181)]))
sse, t0, tau = fit
print(f"fitted t0 = {t0:.2f}, tau = {tau:.2f} years, rmse = {math.sqrt(sse / len(years)):.4f}")
w = 2 * tau * math.log(9)
print(f"10% -> 90% of the way from chance to ceiling takes {w:.2f} years")
print(f"90% point reached at t = {t0 + tau * math.log(9):.2f}")
for t, s in zip(years, best):
    print(f"{t:7.1f}  observed {s:.3f}  fitted {curve(t, t0, tau):.3f}")
```

```text
fitted t0 = 2021.96, tau = 0.69 years, rmse = 0.0114
10% -> 90% of the way from chance to ceiling takes 3.03 years
90% point reached at t = 2023.48
 2019.0  observed 0.261  fitted 0.259
 2019.5  observed 0.287  fitted 0.268
 2020.0  observed 0.272  fitted 0.287
 2020.5  observed 0.335  fitted 0.322
 2021.0  observed 0.376  fitted 0.383
 2021.5  observed 0.466  fitted 0.477
 2022.0  observed 0.613  fitted 0.595
 2022.5  observed 0.702  fitted 0.710
 2023.0  observed 0.790  fitted 0.798
 2023.5  observed 0.861  fitted 0.855
 2024.0  observed 0.901  fitted 0.887
 2024.5  observed 0.901  fitted 0.904
 2025.0  observed 0.920  fitted 0.912
```

The fit recovers the generating parameters ($t_0 = 2022.0$, $\tau = 0.7$) closely. On real data such fits are fragile: the ceiling is unknown, the "best score" mixes models, protocols and contamination, and the curve can be extrapolated only while its shape holds. They are useful mainly to make the expected useful lifetime of a benchmark explicit when it is designed.

### Why benchmarks saturate, and how new ones resist {#sec-resist}

Saturation has several causes, and each generation of benchmarks responded to one of them.

- **Capability growth.** Models genuinely improved; benchmarks pitched at the frontier of 2020 are easy in 2025. Response: harder items (MATH, GPQA, HLE), items that require long agentic work (SWE-bench), and open-ended scales without a ceiling, such as task length ([[evaluation/capability-evaluations]]).
- **Contamination.** Public test items enter training data. Response: private or held-out test sets, canary strings, dynamic benchmarks with new items over time ([[evaluation/contamination]]).
- **Shortcut solutions.** Items solvable by surface cues (Gururangan et al., 2018, found that hypothesis-only classifiers did well on inference datasets). Response: adversarial collection, in which annotators write items that defeat current models (Adversarial NLI, Nie et al., 2020; Dynabench, Kiela et al., 2021).
- **Optimisation pressure.** The benchmarks everyone reports are the ones everyone tunes for ([[evaluation/evaluation-principles#sec-goodhart]]). Response: evaluate on many benchmarks, rotate them, and weigh results on benchmarks a model was not developed against.
- **Ceiling effects.** Label errors cap the attainable score. Response: expert validation and audits (GPQA's expert agreement, SWE-bench Verified).

Adversarial filtering, the most direct way to make a benchmark hard, has a cost: a benchmark built by discarding items that particular models solve is, by construction, hardest for those models. Its scores are informative about progress relative to the filtering models, but comparisons that include them are biased until newer models are evaluated, as the next example shows.

::: example Filtering bias {#ex-filter-bias}
A benchmark is built by keeping only items that model F answered wrongly on one attempt. Suppose half of the candidate items are "easy" for F (it succeeds with probability $0.9$) and half are "hard" (probability $0.1$), and that a second model G has the same probabilities but independent errors. What are the expected accuracies of F (on a fresh attempt) and of G on the kept items?
::: solution
An easy item is kept with probability $0.1$ and a hard one with probability $0.9$, so the kept set is $0.05/(0.05 + 0.45) = 10\%$ easy and $90\%$ hard. A fresh attempt by F succeeds with probability $0.1\cdot0.9 + 0.9\cdot0.1 = 0.18$, and so does an attempt by G, since G has the same per-item probabilities. Both fall from $0.5$ on the candidate pool to $0.18$, because the filter selected items hard for this *kind* of model. If G's difficulties were instead unrelated to F's (G finds every item easy or hard with the same probability, independently of F), G would still score $0.5$ on the kept items, so it would look far stronger than F although on the candidate pool they are equal. Real filtering combines both effects; its bias is against the filtering models and models similar to them.
:::
:::

::: history
Shared benchmarks for language technology go back to the DARPA and NIST evaluations of speech recognition and machine translation (from the late 1980s) and the Text REtrieval Conference (TREC, from 1992); the Penn Treebank (Marcus et al., 1993) defined a decade of parsing research, and SQuAD (Rajpurkar et al., 2016) the early neural era of reading comprehension. GLUE (Wang et al., 2018) and SuperGLUE (Wang et al., 2019) packaged many tasks into a single leaderboard and were overtaken within two years. The few-shot era brought MMLU (Hendrycks et al., 2021), GSM8K (Cobbe et al., 2021), MATH (Hendrycks et al., 2021) and HumanEval (Chen et al., 2021); 2022 brought breadth with BIG-bench (Srivastava et al.) and HELM (Liang et al.); 2023 brought expert-written questions (GPQA, Rein et al.) and real software engineering (SWE-bench, Jimenez et al.). Humanity's Last Exam (Phan et al., 2025) gathered expert questions filtered against frontier models. Through all of this, papers documenting artefacts — annotation shortcuts (Gururangan et al., 2018), weak tests (Liu et al., 2023), label errors (Gema et al., 2024) — have been as important as the benchmarks themselves.
:::

::: summary
- Benchmarks package items, references and scoring for reuse. Landmarks: GLUE (2018) and SuperGLUE (2019) for understanding; MMLU (2021) for knowledge; BIG-bench and HELM (2022) for breadth; GSM8K and MATH for mathematics; HumanEval (2021) for code; GPQA (2023) for expert science; SWE-bench (2023) for software engineering; IFEval for verifiable instructions; MGSM, Belebele and Global-MMLU for languages; Humanity's Last Exam (2025) for frontier knowledge.
- Formats: multiple choice by **log-likelihood** (raw, per-token, per-character or **PMI** normalisation, [[#prop-length]]) or by **generation** (with extraction and option-order bias); short answers by **exact match** and **token F1** after normalisation ([[#def-em-f1]]); code by **execution** and pass@$k$ ([[#eq-passk]]); open-ended tasks by judges.
- A benchmark name does not fix the item subset, version or protocol; compare only matched numbers.
- Small benchmarks are coarse: one HumanEval problem is $0.61$ points and its standard error near $80\%$ is about $3$ points.
- Benchmarks **saturate** along roughly logistic curves ([[#eq-saturation]]); progress is fastest in the middle and invisible near the ceiling ([[#prop-saturation]]), and the time to saturation has fallen to a year or two.
- New benchmarks resist saturation with harder, expert-validated, execution-based, held-out or dynamic items; adversarial filtering biases scores against the filtering models ([[#ex-filter-bias]]).
:::

## Exercises

::: exercise One problem's worth {level=1 check="0.610"}
How many percentage points is one problem worth on HumanEval ($164$ problems)? Give three decimal places.
::: solution
$100/164 = 0.610$ percentage points.
:::
:::

::: exercise Token F1 {level=1 check="0.667"}
The reference answer is "George Washington" and the prediction is "The first president, George Washington". Compute exact match and token F1 under [[#def-em-f1]], to three decimal places.
::: solution
Normalised prediction: "first president george washington" ($4$ tokens); reference "george washington" ($2$ tokens). Exact match $0$. Shared tokens $2$: precision $2/4 = 0.5$, recall $2/2 = 1$, F1 $= 2\cdot0.5\cdot1/1.5 = 0.667$.
:::
:::

::: exercise Standard error on GPQA Diamond {level=1 check="3.55"}
What is the binomial standard error, in percentage points to two decimal places, of a score of $50\%$ on GPQA Diamond ($198$ questions)?
::: solution
$100\sqrt{0.25/198} = 100\cdot0.03553 = 3.55$ points.
:::
:::

::: exercise pass@5 {level=2 check="0.9167"}
For one problem, $n = 10$ samples are drawn and $c = 3$ pass the tests. Compute the estimate of pass@$5$ from [[#eq-passk]] to four decimal places, and compare it with the naive $1 - (1 - 0.3)^5$.
::: solution
$\binom{7}{5} = 21$ and $\binom{10}{5} = 252$, so $\widehat{\text{pass@}5} = 1 - 21/252 = 0.9167$. The naive plug-in $1 - 0.7^5 = 0.8319$ treats the samples as drawn with replacement from a distribution with success rate exactly $0.3$; the unbiased estimator instead counts the subsets of the actual samples.
:::
:::

::: exercise Ten to ninety {level=2 check="2.197"}
A benchmark's best scores follow [[#eq-saturation]] with time scale $\tau = 0.5$ years. How many years does it take to go from $10\%$ to $90\%$ of the way from chance to ceiling (three decimal places)? And from $25\%$ to $75\%$?
::: solution
By [[#prop-saturation]], $2\cdot0.5\cdot\ln9 = \ln9 = 2.197$ years. From $25\%$ to $75\%$: $2\cdot0.5\cdot\ln3 = 1.099$ years — half the time, since $\ln3 = \frac12\ln9$.
:::
:::

::: exercise PMI by hand {level=2}
A model gives the options "yes", "no" and "it depends" the conditional log-probabilities $-0.7$, $-1.0$ and $-3.0$ for a question, and $-1.5$, $-2.5$ and $-6.5$ after the neutral prompt "Answer:". Which option is chosen by raw scoring, per-token scoring (the options have $1$, $1$ and $2$ tokens) and PMI scoring? What does the PMI choice say about the question's effect?
::: solution
Raw: "yes" ($-0.7$). Per token: $-0.7$, $-1.0$, $-1.5$, so "yes". PMI ([[#eq-pmi]]): $0.8$, $1.5$, $3.5$, so "it depends". The question raised the probability of "it depends" by a factor $e^{3.5}\approx33$, more than any other option, although the phrase is still unlikely in absolute terms because long hedged answers are rare. Which rule is right depends on the benchmark: PMI helps when correct answers are unusual strings, but it can over-reward rare options.
:::
:::

::: exercise The guessing floor in a saturation curve {level=2 check="0.865"}
A ten-option benchmark has an estimated ceiling of $0.95$. Under [[#eq-saturation]] with floor $1/10$, what score marks $90\%$ of the way from floor to ceiling (three decimal places)? Why is this a better definition of "nearly saturated" than a fixed score such as $90\%$?
::: solution
The span from floor to ceiling is $0.95 - 0.1 = 0.85$, and $90\%$ of it is $0.765$, so the point is $0.1 + 0.765 = 0.865$. A fixed threshold ignores both ends: on a four-option benchmark a score of $0.90$ is a different fraction of the attainable range than on a ten-option one, and if label errors cap the ceiling at $0.95$, then $0.90$ is already $\frac{0.90 - 0.1}{0.85} = 94\%$ of the way. Measuring progress as a fraction of the floor-to-ceiling span makes benchmarks with different formats and error rates comparable.
:::
:::

::: exercise Filtering against two models {level=3 check="0.11"}
In the setting of [[#ex-filter-bias]], items are now kept only if *both* F and G fail on one attempt each, where F and G have the same per-item probabilities ($0.9$ on easy items, $0.1$ on hard ones) and independent attempts. A third model H finds every item easy or hard independently of F and G, with probability $\frac12$ each and success probabilities $0.9$ and $0.1$. Compute the expected accuracy of a fresh attempt by F on the kept items, to two decimal places, and that of H. Then explain how this generalises.
::: solution
An easy item is kept with probability $0.1^2 = 0.01$, a hard one with $0.9^2 = 0.81$; the kept set is $0.005/(0.005 + 0.405) = 1.22\%$ easy. F's fresh accuracy is $0.0122\cdot0.9 + 0.9878\cdot0.1 = 0.1098\approx0.11$. H's accuracy is unaffected by the selection: $0.5\cdot0.9 + 0.5\cdot0.1 = 0.5$. Filtering against more attempts or more similar models concentrates the kept set more strongly on items that are hard for that family. In general, a filtered benchmark measures difficulty *relative to the filter*; scores of filter models (and models correlated with them) are biased downwards, and comparisons with unrelated models are biased in their favour, until the set is re-normed on models not used in filtering.
:::
:::

::: exercise Implementing likelihood scoring {level=3}
Write a function that scores multiple-choice options from per-token log-probabilities under four rules — raw, per-token, per-character (UTF-8 bytes) and PMI — and returns each rule's choice. Test it on the options of [[#ex-pmi]], treating each option as one token. Then explain why the per-byte rule is the only one of the first three whose scores do not depend on the tokeniser, given a model whose string probabilities do not.
::: solution
```python
def choose(options):
    """options: {text: (cond_logprobs, uncond_logprobs)}, lists of per-token log-probs."""
    rules = {
        "raw":       lambda a, c, u: sum(c),
        "per token": lambda a, c, u: sum(c) / len(c),
        "per byte":  lambda a, c, u: sum(c) / len(a.encode("utf-8")),
        "PMI":       lambda a, c, u: sum(c) - sum(u),
    }
    return {name: max(options, key=lambda a: r(a, *options[a])) for name, r in rules.items()}

opts = {"Sydney": ([-1.2], [-5.0]), "Canberra": ([-1.5], [-7.5]), "Melbourne": ([-2.5], [-5.8])}
print(choose(opts))
```

```text
{'raw': 'Sydney', 'per token': 'Sydney', 'per byte': 'Canberra', 'PMI': 'Canberra'}
```

Per byte, Sydney scores $-1.2/6 = -0.200$, Canberra $-1.5/8 = -0.1875$ and Melbourne $-2.5/9 = -0.278$, so the longer correct name wins once length is accounted for; per token it does not, because each option is a single token here. On tokeniser independence: the sum of token log-probabilities is $\log p(a\mid c)$, the log-probability of the *string*, whatever the tokenisation (for a model that assigns probability to strings consistently). Raw scores depend only on the string, but penalise length; dividing by the number of tokens makes the score depend on how the tokeniser splits the string, so two models with different tokenisers are normalised differently; dividing by the number of bytes uses a property of the string alone, giving a log-likelihood per byte (the negative of bits per byte times $\ln2$, [[text-and-language/perplexity]]) that is comparable across tokenisers.
:::
:::
