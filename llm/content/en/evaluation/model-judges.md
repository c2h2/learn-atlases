Human evaluation is the reference for open-ended outputs, but it is slow and costly: a few thousand careful comparisons can take weeks. Since strong language models can read two answers and say which is better, an obvious shortcut is to let a model do the judging. **LLM-as-a-judge** has become the default way to evaluate open-ended generation during development: it scores chat models on instruction-following benchmarks, grades free-form answers against references, and supplies the AI feedback used in training ([[post-training/ai-feedback]]). A judge is a measuring instrument, and like any instrument it must be **calibrated** against a reference and checked for **systematic error**.

This chapter treats model judges as measurement. It describes the main protocols — pointwise scores, pairwise comparisons, reference-guided and rubric-based judging — and the benchmarks built on them, beginning with **MT-Bench** (Zheng et al., 2023). It defines and measures the judge's best-known biases (towards a **position**, towards **longer answers**, and towards **its own outputs**) in a simulation, shows how to quantify a judge's agreement with human labels and how to **correct** a judge-measured win rate for known error, and analyses **judge ensembles**, which help against independent errors but not against shared biases. The post-training course derived why swapping the order of the two responses removes a constant position bias; here the emphasis is on measuring biases and validating judges for an evaluation.

## Judging protocols {#sec-protocols}

::: definition Judge protocols {#def-judge}
A **model judge** is a language model $J$ prompted to evaluate one or more responses to a prompt $x$. Common protocols:

- **pointwise** (single-answer) grading: $J$ assigns a response $y$ a score on a fixed scale, such as $1$ to $10$, usually after an explanation;
- **pairwise** comparison: $J$ sees $y_1$ and $y_2$ and outputs a preference ($y_1$, $y_2$, or a tie); a model's **win rate** is the fraction of comparisons it wins against a fixed **baseline** model or against other models;
- **reference-guided** grading: $J$ is also given a reference answer and judges correctness against it, which turns hard verification into easier comparison;
- **rubric-** or **checklist-based** grading: $J$ scores the response against explicit criteria, possibly specific to each prompt, and the scores are combined.

The judge's prompt (instructions, criteria, output format), whether it reasons before its verdict, its decoding settings, and how the verdict is parsed are all part of the protocol ([[evaluation/evaluation-principles#def-evaluation]]).
:::

For pointwise grading, a judge's distribution over score tokens carries more information than its single sampled score. **G-Eval** (Liu et al., 2023) used the expectation $\sum_ss\,p_J(s\mid x, y)$ over score tokens $s\in\{1, \dots, 10\}$, which gives finer-grained, less tied scores than the arg max.

### MT-Bench and its successors {#sec-mtbench}

**MT-Bench** (Zheng et al., 2023) consists of $80$ two-turn questions in eight categories — writing, role-play, extraction, reasoning, mathematics, coding, and knowledge in STEM and in the humanities and social sciences — designed so that the second turn tests whether a model can follow up on its own first answer. The same paper collected expert votes on MT-Bench responses and crowd votes from Chatbot Arena ([[evaluation/human-evaluation#sec-arena]]), and compared the judgements of GPT-4 as a judge with them. Its main reported finding was that, excluding ties, GPT-4's pairwise verdicts agreed with expert human verdicts about $85\%$ of the time, higher than the $81\%$ at which the experts agreed with each other; with ties included, both figures were lower (around $66\%$ and $63\%$). The judge was, by this measure, as consistent with humans as humans were with each other.

The paper also identified the biases that the rest of this chapter measures, and proposed mitigations: swapping positions and calling a tie when the verdicts disagree; **reference-guided** grading for mathematics and reasoning, which on a small set of mathematics questions reduced the judge's failure rate from $14$ of $20$ to $3$ of $20$ (it otherwise tended to be misled by a confident wrong answer); and judging multi-turn conversations as a whole.

Several benchmarks of the same design followed. **AlpacaEval** (Li et al., 2023) reports a model's win rate against a reference model on about $800$ instructions, judged by a strong model; **Arena-Hard** (Li et al., 2024) selected $500$ difficult, diverse prompts from Chatbot Arena and judges pairwise against a baseline, aiming to reproduce Arena rankings cheaply; **WildBench** (Lin et al., 2024) uses real user tasks with per-task checklists. Open judge models trained specifically for evaluation, such as **Prometheus** (Kim et al., 2023), score against user-provided rubrics and make the judge itself reproducible. These benchmarks are valued for their correlation with human rankings, which their authors report at the level of whole systems; that correlation, not item-level accuracy, is what they claim.

## Biases of model judges {#sec-biases}

A judge's error has two parts: **noise**, which differs from item to item and averages out over many items, and **bias**, which pushes systematically in one direction and does not. Biases are what make a judge-based comparison wrong rather than merely imprecise.

::: definition Judge bias measures {#def-bias-measures}
For a pairwise judge evaluated on pairs presented in both orders:

- **position consistency** is the fraction of pairs on which the judge's verdict is the same in both orders; the **first-slot rate** is the fraction of all verdicts won by the response shown first (it is $\frac12$ for a judge without position bias, on pairs balanced by order);
- **verbosity bias** is measured with **controlled pairs**: a response against a lengthened copy with no added content (repetition, padding, restated points), shown in both orders; the rate at which the longer copy is preferred should be $\frac12$ or below;
- **self-preference** is the excess of the judge's preference for responses generated by itself (or its model family) over the preference that human raters express for the same responses.
:::

The first two use **counterfactual** inputs — the same content in another position, or the same content made longer — so that any change in verdict is attributable to the manipulated feature. Self-preference needs a human reference, because a judge may rightly prefer its own outputs if they are better. Zheng et al. (2023) found GPT-4 consistent under swapping on about two thirds of pairs, with weaker judges far less consistent, and found that a "repetitive list" attack — restating the points of an answer to make it longer — fooled weaker judges most of the time and GPT-4 rarely. Wang et al. (2023) showed that position bias alone could change which of two systems a judge ranked higher. Panickssery et al. (2024) found that judges preferred their own outputs and that the strength of the preference correlated with their ability to recognise their own text. Other documented effects include sensitivity to confident or authoritative tone, to formatting, and to claims inside a response about its own correctness.

### Position bias and the swap-and-tie protocol {#sec-swap}

The simplest model of position bias adds a constant $b$ to the judge's log-odds of choosing the first response. The post-training course shows that averaging the log-odds of the two orders recovers the unbiased preference exactly ([[post-training/ai-feedback]]). When only the judge's verdicts are available, not its probabilities, MT-Bench's **swap-and-tie** rule is used instead: query both orders, accept a verdict only if they agree, and otherwise record a tie.

::: proposition Inconsistency under position bias {#prop-inconsistency}
Let a judge pick the first-shown response with probability $\sigma(\Delta + b)$ when $y_1$ is first and $\sigma(-\Delta + b)$ when $y_2$ is first, independently in the two orders, where $\Delta$ is the judge's quality difference and $b$ its position bias. Then the probability that its two verdicts disagree is

$$
P_{\text{incons}}(\Delta, b) = \sigma(\Delta + b)\,\sigma(-\Delta + b) + \sigma(-\Delta - b)\,\sigma(\Delta - b).
$$

At $\Delta = 0$ it equals $\sigma(b)^2 + \sigma(-b)^2$, which is $\frac12$ for $b = 0$ and increases to $1$ as $\lvert b\rvert\to\infty$. Under swap-and-tie, a pair with no bias and $\Delta\ne0$ is tied with probability $2\sigma(\Delta)\sigma(-\Delta) < \frac12$.
:::

::: proof
The verdicts disagree when the judge picks the first slot both times — probability $\sigma(\Delta + b)\cdot\sigma(-\Delta + b)$ — or the second slot both times — $(1 - \sigma(\Delta + b))(1 - \sigma(-\Delta + b)) = \sigma(-\Delta - b)\sigma(\Delta - b)$. At $\Delta = 0$ these are $\sigma(b)^2$ and $\sigma(-b)^2$. With $s = \sigma(b)$, the sum $s^2 + (1 - s)^2$ is minimised at $s = \frac12$ and increases to $1$ as $s\to0$ or $1$. With $b = 0$ the formula becomes $2\sigma(\Delta)\sigma(-\Delta) = 2\sigma(\Delta)(1 - \sigma(\Delta)) < \frac12$ for $\Delta\ne0$.
:::

Two things follow. Inconsistency mixes position bias with the judge's ordinary randomness, so a low consistency rate does not by itself measure bias; the first-slot rate does. And swap-and-tie converts the cases the judge cannot decide robustly into ties, which improves the precision of the remaining verdicts at the cost of discarding information — and ties must then be handled in the win rate (commonly as half a win).

::: example Reading a consistency audit {#ex-consistency}
A judge is run on $1{,}000$ pairs in both orders. It gives the same verdict in both orders on $700$ pairs. Of its $2{,}000$ verdicts, $1{,}240$ go to the response shown first. What do the two numbers say, and what would swap-and-tie produce?
::: solution
The first-slot rate is $1240/2000 = 0.62$, well above $\frac12$: a clear position bias. Under the model of [[#prop-inconsistency]] at $\Delta = 0$, $\sigma(b) = 0.62$ corresponds to $b = \operatorname{logit}0.62 = 0.49$ on the log-odds scale (an approximation, since real pairs have $\Delta\ne0$). The consistency rate of $70\%$ means swap-and-tie would produce $300$ ties out of $1{,}000$; the $700$ consistent verdicts are the judge's confident ones. In a win-rate calculation each tie counts as half a win for each side, which pulls the win rate towards $\frac12$ — appropriate if those pairs really are close, misleading if the judge was simply unreliable on them.
:::
:::

### Measuring biases in a simulation {#sec-sim}

The listing simulates a judge with all three of the effects that can be measured without human labels — position bias $b = 0.7$, a length preference $v = 0.4$ (in units of quality per standard deviation of length), and a per-pair **misreading** $\varepsilon$ that models the judge's own errors of perception — on $5{,}000$ random pairs of responses with independent qualities and lengths. Human labels come from a noisy rater who looks only at quality, and a second simulated human gives the human-human agreement. It then runs a verbosity probe and compares a single debiased judge with panels of three.

```python
import math, random

rng = random.Random(6)
sig = lambda z: 1 / (1 + math.exp(-z))

def p_first(q1, q2, l1, l2, err, b=0.7, v=0.4, k=2.0):
    """P(judge picks the response shown FIRST): quality difference, a length preference v,
    the judge's misreading err of this pair, and a position bias b towards the first slot."""
    return sig(k * ((q1 - q2) + v * (l1 - l2) + err) + b)

def pair():
    q1, q2, l1, l2 = (rng.gauss(0, 1) for _ in range(4))     # qualities, standardised lengths
    return q1, q2, l1, l2

def human(q1, q2):                                           # a noisy human: True = prefers 1
    return rng.random() < sig(2 * (q1 - q2))

N = 5000
stats = dict(one=0, first=0, consistent=0, agree_nt=0, hh=0)
for _ in range(N):
    q1, q2, l1, l2 = pair()
    h = human(q1, q2)
    err = rng.gauss(0, 0.5)
    v12 = rng.random() < p_first(q1, q2, l1, l2, err)        # 1 shown first; True = picks 1
    v21 = rng.random() >= p_first(q2, q1, l2, l1, -err)      # 2 shown first; True = picks 1
    stats["one"] += v12 == h
    stats["first"] += v12 + (not v21)                        # wins of whichever was first
    stats["hh"] += human(q1, q2) == h                        # a second human vs the first
    if v12 == v21:
        stats["consistent"] += 1
        stats["agree_nt"] += v12 == h
print(f"human-human agreement:                       {stats['hh'] / N:.3f}")
print(f"judge-human agreement, one order:            {stats['one'] / N:.3f}")
print(f"share of verdicts won by the first slot:     {stats['first'] / (2 * N):.3f}")
print(f"position consistency (same verdict swapped): {stats['consistent'] / N:.3f}")
print(f"agreement on consistent pairs (swap-and-tie): {stats['agree_nt'] / stats['consistent']:.3f}")

# verbosity probe: the same answer against a copy padded to be one s.d. longer
padded = sum((rng.random() < p_first(0, 0, 1, 0, 0)) + (rng.random() >= p_first(0, 0, 0, 1, 0))
             for _ in range(N)) / (2 * N)
print(f"padded copy preferred, averaged over orders: {padded:.3f}")

# a deterministic (greedy) judge after debiasing: picks 1 if the order-averaged log-odds > 0;
# panels of three such judges, whose misreadings are independent or shared
def verdict(q1, q2, l1, l2, err):
    return (q1 - q2) + 0.4 * (l1 - l2) + err > 0             # position bias cancels exactly
for label, judges, shared in [("single judge", 1, False), ("panel of 3, independent", 3, False),
                              ("panel of 3, shared", 3, True)]:
    agree_h = agree_t = 0
    for _ in range(N):
        q1, q2, l1, l2 = pair()
        e0 = rng.gauss(0, 0.5)
        votes = [verdict(q1, q2, l1, l2, e0 if shared else rng.gauss(0, 0.5)) for _ in range(judges)]
        pick1 = 2 * sum(votes) > judges
        agree_h += pick1 == human(q1, q2)
        agree_t += pick1 == (q1 > q2)
    print(f"{label:24s}: agrees with humans {agree_h / N:.3f}, with true quality {agree_t / N:.3f}")
```

```text
human-human agreement:                       0.760
judge-human agreement, one order:            0.717
share of verdicts won by the first slot:     0.582
position consistency (same verdict swapped): 0.740
agreement on consistent pairs (swap-and-tie): 0.800
padded copy preferred, averaged over orders: 0.678
single judge            : agrees with humans 0.775, with true quality 0.842
panel of 3, independent : agrees with humans 0.783, with true quality 0.865
panel of 3, shared      : agrees with humans 0.770, with true quality 0.838
```

Read the numbers as an audit would. The first slot wins $58\%$ of verdicts: position bias is present and measurable without any human labels. A quarter of pairs change verdict when swapped, and on the remaining three quarters the judge agrees with humans $80\%$ of the time, above the human-human rate of $76\%$ — but on an easier subset, so the comparison flatters the judge. The padding probe exposes the length preference: an answer padded with nothing new wins $68\%$ of the time. Once the position bias is removed, the judge agrees with humans more often than a second human does ($0.775$ against $0.760$), because the human labels are noisy; but it is still wrong about true quality on $16\%$ of pairs, and part of that error is the length preference, which no amount of swapping removes. A panel of three judges with *independent* misreadings does better ($0.865$); a panel whose members share their misreadings — the same model three times, or models trained on the same data — gains nothing, and all three panels share the length bias.

::: widget plot
f: 1/(1 + exp(-(x + b)))*1/(1 + exp(-(-x + b))) + 1/(1 + exp(-(-x - b)))*1/(1 + exp(-(x - b))); 2/(1 + exp(-x))*1/(1 + exp(x))
x: -5, 5
y: 0, 1
sliders: b=0.7:0:3:0.1
labels: $P_{\text{incons}}$ with position bias $b$; without bias
caption: The probability that a judge's verdicts disagree between the two orders ([[#prop-inconsistency]]) against its quality difference $\Delta$. Without bias (lower curve), inconsistency comes only from randomness and is at most $\frac12$, at $\Delta = 0$. With bias $b$, close pairs become inconsistent most of the time; only clearly different pairs survive the swap.
:::

## Calibrating a judge against humans {#sec-calibration}

Before a judge is used to evaluate, it should be validated on a sample with human labels drawn from the same distribution of prompts and responses, in the same protocol. Three levels of agreement matter.

- **Item-level agreement**: the fraction of items on which the judge's verdict matches the human (or majority-human) verdict, reported with Cohen's κ to correct for chance ([[evaluation/human-evaluation#def-kappa]]), and broken down by category, since agreement varies greatly by task. Bavaresco et al. (2024) compared several judges with human annotations across $20$ NLP evaluation datasets and found agreement ranging from high to near chance depending on the dataset and property judged.
- **Bias audits**: the counterfactual probes of [[#def-bias-measures]].
- **System-level agreement**: whether the judge ranks *systems* as humans do — the correlation (Spearman or Kendall) between judge-based and human-based scores of a set of models. This is what judge benchmarks usually report, and it can be high even when item-level agreement is modest, because independent item-level errors average out.

The last point can be made exact, and it also gives a correction.

::: proposition Correcting a judge's win rate {#prop-correction}
Suppose that on each comparison between model A and a baseline, the judge reports the human verdict with probability $a > \frac12$ and the opposite verdict with probability $1 - a$, independently of which model the humans preferred (**symmetric** error). If humans prefer A with probability $w$, the judge's expected win rate for A is

$$
m = a\,w + (1 - a)(1 - w) = (1 - a) + (2a - 1)\,w,
$$ {#eq-judge-winrate}

so $m > \frac12$ if and only if $w > \frac12$, and $w$ can be recovered as

$$
\hat w = \frac{\hat m - (1 - a)}{2a - 1},
$$ {#eq-correction}

with standard error $\operatorname{SE}(\hat m)/(2a - 1)$ when $a$ is known. If the error is not symmetric — the judge errs more often when A is the better model, for instance because A writes shorter answers — then $m$ can exceed $\frac12$ when $w < \frac12$.
:::

::: proof
By total probability over the human verdict, the judge says "A" when humans prefer A and it reports correctly ($w\,a$), or humans prefer the baseline and it errs ($(1 - w)(1 - a)$). The expression is linear in $w$ with slope $2a - 1 > 0$ and equals $\frac12$ at $w = \frac12$, which gives the sign equivalence; solving for $w$ gives [[#eq-correction]], and a linear map with slope $1/(2a - 1)$ multiplies the standard error by that factor. With asymmetric error rates $1 - a_1$ (when humans prefer A) and $1 - a_0$ (when they prefer the baseline), $m = a_1w + (1 - a_0)(1 - w)$; for example with $a_1 = 0.6$, $a_0 = 0.9$ and $w = 0.45$, $m = 0.27 + 0.055 = 0.325$, and with $a_1 = 0.9$, $a_0 = 0.6$, $m = 0.405 + 0.22 = 0.625 > \frac12$.
:::

Symmetric error compresses differences towards $\frac12$ but preserves their direction, which is why judges can rank systems well despite modest item-level accuracy. Asymmetric error — the kind produced by biases correlated with the systems being compared — can reverse rankings, which is why bias audits matter more than headline agreement. The correction of [[#eq-correction]] is a standard technique for measurements with a known error rate (in epidemiology it corrects prevalence for test sensitivity and specificity); it requires the agreement to have been measured on data like the evaluation's, and it inflates the uncertainty by $1/(2a - 1)$ — a factor of $2$ when $a = 0.75$.

::: example A corrected win rate {#ex-correction}
A judge validated against human labels on $400$ pairs agrees with them on $80\%$, with no evidence that its errors depend on which model is better. On a new evaluation it reports that model A beats the baseline on $62\%$ of $1{,}000$ prompts. Estimate the human win rate and its standard error.
::: solution
By [[#eq-correction]], $\hat w = (0.62 - 0.20)/(2\cdot0.8 - 1) = 0.42/0.6 = 0.70$. The standard error of $\hat m$ is $\sqrt{0.62\cdot0.38/1000} = 0.0153$, so that of $\hat w$ is $0.0153/0.6 = 0.026$ — before accounting for the uncertainty in $a$ itself, which was estimated from only $400$ pairs ($\pm0.02$) and moves $\hat w$ by about $\pm0.03$. The judge's raw $62\%$ understated a substantial preference.
:::
:::

::: example A judge loses statistical power {#ex-power}
Humans prefer model A to the baseline on $55\%$ of prompts. A judge with symmetric agreement $a = 0.7$ evaluates $500$ prompts. What win rate does it report on average, and how many standard errors from $\frac12$ is that, compared with a human evaluation of the same $500$ prompts?
::: solution
By [[#eq-judge-winrate]], $m = 0.3 + 0.4\cdot0.55 = 0.52$. With $500$ prompts the standard error near $\frac12$ is $\sqrt{0.25/500} = 0.0224$, so the judge's margin of $0.02$ is $0.89$ standard errors — not distinguishable from a tie — while the humans' margin of $0.05$ would be $2.24$ standard errors. The judge compresses the effect by the factor $2a - 1 = 0.4$ and so needs about $1/0.4^2 = 6.25$ times as many prompts for the same power. Cheap judgements are not free: they are paid for in sample size.
:::
:::

::: widget plot
f: (1 - a) + (2*a - 1)*x; x
x: 0, 1
y: 0, 1
sliders: a=0.8:0.5:1:0.01
hlines: 0.5
labels: judge-measured win rate $m$; human win rate $w$
caption: The judge-measured win rate against the human win rate under symmetric error ([[#prop-correction]]), for agreement $a$. All lines pass through $(\frac12, \frac12)$, so the direction of a preference is preserved, but the slope $2a - 1$ flattens every difference: at $a = 0.75$ a real $10$-point margin appears as $5$ points.
:::

### Length control {#sec-length-control}

Verbosity bias is asymmetric error of exactly the dangerous kind: it favours whichever system writes longer answers. **Length-controlled AlpacaEval** (Dubois et al., 2024) addresses it by regression. It fits a logistic model predicting the judge's preference from a model-specific term, a term in the length difference between the two responses, and an instruction-difficulty term, and then reports the win rate predicted with the length difference set to zero — the answer to "what would the judge prefer if the two responses were equally long?". The authors reported that this made the benchmark much harder to game by asking a model for longer answers and raised its correlation with Chatbot Arena rankings. The same idea underlies Arena's style control ([[evaluation/human-evaluation#sec-arena]]): when a nuisance feature can be measured, it can be modelled and removed.

::: quiz
A team validates a judge on $500$ human-labelled pairs: $78\%$ agreement, first-slot rate $0.51$, padded copies preferred $72\%$ of the time. It then compares a concise model with a verbose one. Which conclusions are sound?
- [x] Position bias is not a concern for this judge
- [x] The comparison is likely to favour the verbose model beyond what humans would
- [ ] With $78\%$ agreement, the judge's win rate can be corrected by [[#eq-correction]] without further checks
- [x] Length control or length-matched comparisons are needed for this pair of models
::: solution
A first-slot rate of $0.51$ indicates little position bias. The padding probe shows a strong length preference, which is asymmetric error against the concise model, so the symmetric correction of [[#prop-correction]] does not apply: the judge's error rate will depend on which model wrote the longer answer. Regressing out length, or comparing on prompts where the two responses have similar lengths, is needed before the result can be trusted.
:::
:::

## Reference-guided judging and ensembles {#sec-improving}

Two further design choices improve judges in different ways.

**References** address competence. A judge that cannot solve a problem itself cannot reliably tell a correct solution from a confident wrong one, and is easily swayed by a response's claims about itself. Supplying a reference answer turns the task into comparison, which is easier; for tasks with verifiable answers — mathematics, code, extraction — a programmatic check is better still, and judges are best reserved for the parts that cannot be checked mechanically. Per-item **rubrics** and checklists play the same role for open-ended tasks: they move the judgement from "is this good?" to "does this do X, Y and Z?", which is more reproducible and auditable.

**Ensembles** address noise. Verga et al. (2024) found that a **panel** of several smaller judge models from different families agreed better with human judgements than a single large judge on their tasks, at lower cost, and showed less of the bias towards any one model family. The reason is the classical one.

::: proposition Majority voting of judges {#prop-condorcet}
Let $k = 2m + 1$ judges each give the correct verdict on a binary comparison with probability $a > \frac12$.

1. If their errors are independent, the majority is correct with probability $A_k = \sum_{j > m}\binom{k}{j}a^j(1 - a)^{k-j}$, which for $k = 3$ is $a + a(1 - a)(2a - 1) > a$, and $A_k\to1$ as $k\to\infty$.
2. If the judges' verdicts are identical (perfectly correlated errors), the majority is correct with probability $a$ for every $k$.
:::

::: proof
(1) The number of correct judges is $\Bin(k, a)$ and the majority is correct when it exceeds $m$. For $k = 3$: $a^3 + 3a^2(1 - a) = a^2(3 - 2a)$, and $a^2(3 - 2a) - a = a(3a - 2a^2 - 1) = a(2a - 1)(1 - a)$, which is positive for $\frac12 < a < 1$. As $k\to\infty$, the fraction of correct judges converges to $a > \frac12$ by the law of large numbers, so the probability that it exceeds $\frac12$ tends to $1$ (the **Condorcet jury theorem**). (2) If all verdicts are equal, the majority verdict is any single judge's verdict.
:::

Real judges are in between: their errors are positively correlated because they share training data, styles of reasoning and biases. A panel therefore reduces the independent part of the error and leaves the shared part, as the simulation showed: the length preference that all three judges had survived voting. Diversity of judges — different families, different prompts — is what makes a panel worth its cost.

::: example A panel of three {#ex-panel}
Each of three judges is correct on $75\%$ of comparisons. What is the majority's accuracy if their errors are independent? If, instead, on a fixed $20\%$ of items all three are wrong together, and on the other items each is independently correct with probability chosen to keep its overall accuracy at $75\%$?
::: solution
Independent: $0.75^2(3 - 1.5) = 0.5625\cdot1.5 = 0.844$. Shared errors: on the $80\%$ of items without a shared error, each judge must be correct with probability $c$ where $0.8c = 0.75$, so $c = 0.9375$; the majority is then correct with probability $c^2(3 - 2c) = 0.8789\cdot1.125 = 0.989$ on those items, and wrong on the shared $20\%$. Overall $0.8\cdot0.989 = 0.791$. The correlated part caps the gain: the panel can never exceed $80\%$, however many judges are added.
:::
:::

::: warning A judge is a target, too
Once a judge-based benchmark becomes a target, models — and the people training them — learn what the judge likes. Longer answers, more formatting, confident tone and flattering restatements of the question can all raise a judge's verdicts without making answers better. Zheng et al. (2024, "Cheating automatic LLM benchmarks") showed that a "null model" producing the same fixed, content-free output for every instruction, crafted to exploit the judges, could obtain high win rates on several popular judge-based benchmarks. The lesson is not that judges are useless, but that their verdicts are proxies subject to Goodhart's law ([[evaluation/evaluation-principles#sec-goodhart]]): validate them on the distribution in use, audit them with counterfactual probes, keep human checks on samples, and never train against the same judge used to evaluate.
:::

::: history
Automatic evaluation of generated text began with overlap metrics against references — BLEU for translation (Papineni et al., 2002) and ROUGE for summarisation (Lin, 2004) — and moved to learned metrics built on pretrained models, such as BERTScore (Zhang et al., 2020) and BLEURT (Sellam et al., 2020). With instruction-following models, references became inadequate: there are many good answers to an open request. Using a strong chat model as the judge was explored in early 2023 (for example in the Vicuna evaluation and in G-Eval, Liu et al., 2023) and examined systematically by Zheng et al. (2023), whose MT-Bench and analysis of position, verbosity and self-enhancement biases set the agenda. Wang et al. (2023) showed how position bias could overturn rankings; AlpacaEval (2023) and its length-controlled version (Dubois et al., 2024), Arena-Hard (Li et al., 2024) and WildBench (Lin et al., 2024) made judge benchmarks standard; Prometheus (Kim et al., 2023) trained open judges; Panickssery et al. (2024) studied self-preference; and Verga et al. (2024) argued for panels of judges.
:::

::: summary
- A model judge grades responses pointwise, pairwise, against a reference or against a rubric ([[#def-judge]]); its prompt, reasoning, decoding and parsing are part of the protocol.
- **MT-Bench** (Zheng et al., 2023) found a strong judge agreeing with experts about as often as experts agreed with each other (around $85\%$ against $81\%$ without ties), and documented position, verbosity and self-enhancement biases.
- Measure biases with counterfactual probes: the **first-slot rate** for position, padded copies for verbosity, and human-referenced comparisons for self-preference ([[#def-bias-measures]]). Swap inconsistency mixes bias with randomness ([[#prop-inconsistency]]).
- Validate judges against human labels at the item level (agreement and κ, by category) and the system level. Symmetric errors compress win rates towards $\frac12$ but preserve direction and can be corrected by $\hat w = (\hat m - (1 - a))/(2a - 1)$ ([[#prop-correction]]); asymmetric errors such as length bias can reverse rankings and need modelling (length control).
- References and rubrics address judges' competence limits; **panels** of diverse judges reduce independent errors (Condorcet, [[#prop-condorcet]]) but not shared biases.
- Judge-based benchmarks are optimisation targets and can be gamed; audit them and keep human checks.
:::

## Exercises

::: exercise Majority of three {level=1 check="0.784"}
Three independent judges are each correct with probability $0.7$. What is the probability that their majority verdict is correct (three decimal places)?
::: solution
$0.7^3 + 3\cdot0.7^2\cdot0.3 = 0.343 + 0.441 = 0.784$.
:::
:::

::: exercise Correcting a win rate {level=1 check="0.66"}
A judge with symmetric agreement $a = 0.75$ reports a win rate of $58\%$. Estimate the human win rate using [[#eq-correction]].
::: solution
$\hat w = (0.58 - 0.25)/(1.5 - 1) = 0.33/0.5 = 0.66$.
:::
:::

::: exercise Inconsistency of a biased judge {level=1 check="0.607"}
Under [[#prop-inconsistency]], what is the probability that a judge with position bias $b = 1$ gives inconsistent verdicts on a pair of equal quality ($\Delta = 0$)? Give three decimal places.
::: solution
$\sigma(1) = 0.7311$ and $\sigma(-1) = 0.2689$, so $P_{\text{incons}} = 0.7311^2 + 0.2689^2 = 0.5345 + 0.0723 = 0.607$.
:::
:::

::: exercise The cost of correction {level=2 check="0.04"}
A judge-measured win rate has standard error $0.02$ and the judge's symmetric agreement is $a = 0.75$, known exactly. What is the standard error of the corrected win rate?
::: solution
By [[#prop-correction]], $0.02/(2\cdot0.75 - 1) = 0.02/0.5 = 0.04$. Correction removes bias at the cost of doubling the uncertainty; a judge with $a = 0.6$ would multiply it by five.
:::
:::

::: exercise Judge–human agreement and κ {level=2 check="0.6"}
On $200$ validation pairs, humans prefer response 1 on $100$. The judge picks response 1 on $100$ pairs, agreeing with humans on $160$ of the $200$. Compute Cohen's κ between judge and humans.
::: solution
$p_o = 0.8$. Both marginals are $\frac12$, so $p_e = 0.5\cdot0.5 + 0.5\cdot0.5 = 0.5$, and $\kappa = (0.8 - 0.5)/0.5 = 0.6$ ([[evaluation/human-evaluation#def-kappa]]).
:::
:::

::: exercise Designing a bias audit {level=2}
You plan to use a model judge to compare two summarisation systems, one of which was fine-tuned from the same base model as the judge. Design an audit, with a few hundred items, that would detect position bias, length bias and self-preference before the comparison is run.
::: solution
**Position**: run every pair in both orders and report the first-slot rate with a binomial interval; a rate significantly above $\frac12$ calls for order-averaging or swap-and-tie. **Length**: build controlled pairs — each summary against a version padded with restatements but no new content, and against a version trimmed of redundant sentences — and report how often the longer version wins; also regress the judge's verdicts on the length difference in the real pairs. **Self-preference**: collect human preferences (ideally expert, blind) on a random subset of real pairs and compare the judge's win rate for the related system with the humans'; an excess beyond the uncertainty is self-preference (or another bias correlated with that system), and a second judge from a different family provides a check. Report the audit alongside the result, and if biases are found, control for them (order-averaging, length control) or switch to a panel of unrelated judges.
:::
:::

::: exercise Asymmetric error reverses a ranking {level=2 check="0.55"}
Humans prefer model A to the baseline on $45\%$ of prompts. Because A writes longer answers, a judge is generous to it: the judge reports "A" on $98\%$ of the pairs where humans prefer A and on $20\%$ of the pairs where humans prefer the baseline. Compute the judge's win rate for A to two decimal places, and say what the comparison concludes.
::: solution
By total probability, $m = 0.98\cdot0.45 + 0.20\cdot0.55 = 0.441 + 0.110 = 0.551$, which rounds to $0.55$. The judge declares A the winner although humans prefer the baseline: the asymmetric case of [[#prop-correction]]. The symmetric correction would make matters worse — it assumes one agreement rate for both kinds of pair — so the remedy is to remove the cause (length control, length-matched pairs) or to estimate the two error rates separately on validation data.
:::
:::

::: exercise Probability-weighted scores {level=3}
A judge asked to rate a response from $1$ to $5$ puts probabilities $0.05, 0.10, 0.30, 0.40, 0.15$ on the five score tokens. (a) Compute the arg-max score and the G-Eval expected score. (b) Two responses have expected scores $3.50$ and $3.45$ and the same arg-max score; which protocol can distinguish them? (c) Explain why expected scores are not always better, with reference to calibration.
::: solution
(a) Arg max: $4$. Expected: $0.05 + 0.20 + 0.90 + 1.60 + 0.75 = 3.50$. (b) Only the expected scores distinguish them; arg-max grading produces many ties on a short scale, which wastes information and makes small differences invisible. (c) The expected score treats the judge's probabilities as meaningful degrees of belief and the scale as interval-valued (the step from $2$ to $3$ equal to that from $4$ to $5$). If the judge is poorly calibrated — for example very confident on some items for reasons unrelated to quality, or systematically hedging — the expectation inherits that miscalibration, and small differences such as $3.50$ against $3.45$ may reflect the judge's style of uncertainty rather than quality. They should be validated against human ratings like any other score, for instance by checking the correlation of expected scores with human ratings against that of arg-max scores.
:::
:::

::: exercise Condorcet with shared errors {level=3 check="0.8"}
Extend [[#ex-panel]]: on a fixed fraction $\rho$ of items all $k$ judges are wrong together; on the rest, each is independently correct with probability $c$. Show that as $k\to\infty$ the majority's accuracy tends to $1 - \rho$ whenever $c > \frac12$, and compute this limit for $\rho = 0.2$. What does this imply for scaling up a panel of similar judges?
::: solution
On the shared-error items the majority is always wrong. On the others, the number of correct judges is $\Bin(k, c)$, and with $c > \frac12$ the probability that a majority is correct tends to $1$ by [[#prop-condorcet]]. The overall accuracy is $(1 - \rho)A_k(c) + \rho\cdot0\to1 - \rho = 0.8$. Adding more judges of the same kind can only drive the independent errors to zero; the shared fraction $\rho$ is a hard ceiling. To raise the ceiling, the judges' errors must be made less correlated (different model families, prompts, or access to references and tools), which is the argument for diverse panels.
:::
:::
