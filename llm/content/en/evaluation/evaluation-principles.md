Every claim about a language model is a claim about an evaluation. "Model A is better at mathematics than model B", "the new training recipe improved coding", "this model is safe to deploy for customer support" — each rests on some procedure that turned a model into a number, and each is only as good as that procedure. Evaluating general-purpose language models is harder than evaluating the classifiers of [[ml-fundamentals/evaluation-metrics]]. Their outputs are free text, so deciding whether an answer is right is itself a problem. Their behaviour depends on how a question is asked, so the same model can score very differently under two reasonable prompts. Their training data is vast and largely unknown, so a test question may already have been seen. And they are used for open-ended tasks that no fixed test set covers.

This chapter sets out the principles that the rest of the course applies. It defines an evaluation precisely, as a population of tasks, a protocol, a scoring rule and an aggregate, so that one can say exactly what a number estimates. It introduces **construct validity** — whether the number measures what it is claimed to measure — and **reliability**, whether it would come out the same if measured again. It takes apart the **evaluation pipeline** (prompt format, few-shot examples, decoding, answer extraction, scoring) and shows with code how much each stage can move a score. It explains **Goodhart's law** and derives one of its mechanisms, the winner's curse of selecting on a noisy score. And it ends with **intended use**: an evaluation exists to inform a decision, and should be designed backwards from it.

## What an evaluation is {#sec-what}

An evaluation result such as "$71.3\%$ on a mathematics benchmark" compresses many choices into one number. Making those choices explicit is the first step to reading it correctly.

::: definition Evaluation {#def-evaluation}
An **evaluation** of a model $M$ consists of

1. a **task population** $\mathcal{D}$: a distribution over items $x$ (questions, instructions, documents, environments) that the evaluation is meant to represent;
2. a **protocol** $\pi$ that turns a model and an item into an output $y = \pi(M, x)$ — the prompt template, the few-shot examples, the system prompt, the decoding settings, any tools or retries allowed;
3. a **scoring rule** $s(x, y)\in[0, 1]$ (or $\R$) — exact match against a reference, unit tests passing, a human or model judgement;
4. an **aggregate**, usually the mean. The quantity the evaluation targets, the **estimand**, is

$$
\mu(M) = \E_{x\sim\mathcal{D}}\big[s\big(x, \pi(M, x)\big)\big],
$$ {#eq-estimand}

and a benchmark of $n$ items $x_1, \dots, x_n$ drawn from $\mathcal{D}$ gives the **estimate** $\hat\mu(M) = \frac1n\sum_{i=1}^n s(x_i, \pi(M, x_i))$.
:::

Three things follow at once. First, $\mu(M)$ is a property of the model *together with* the protocol and the scoring rule, not of the model alone: change $\pi$ or $s$ and the estimand changes. A score is reproducible only when all of them are reported. Second, $\hat\mu$ is an estimate of $\mu$ with sampling error, because the benchmark is one sample of items — the subject of [[evaluation/evaluation-statistics]]. Third, if the protocol samples (temperature above zero), $s(x, \pi(M, x))$ is itself random, and there is a second layer of noise from the model's own randomness.

The definition also separates two questions that are often confused. *Is $\hat\mu$ a good estimate of $\mu$?* is a statistical question about sample size, independence and noise. *Is $\mu$ the thing we care about?* is a question of validity, and no amount of data answers it.

### Validity and reliability {#sec-validity}

Measurement theory in psychology faced the same problem a century earlier: an intelligence test or a personality questionnaire measures an abstract quality — a **construct** — that cannot be observed directly. Cronbach and Meehl (1955) called the question of whether a test measures its construct **construct validity**, and the vocabulary they and their successors developed transfers directly to language models.

::: definition Construct validity and reliability {#def-validity}
A **construct** is the capability or property an evaluation claims to measure ("mathematical reasoning", "knowledge of medicine", "honesty"). An evaluation has **construct validity** to the extent that differences in its score reflect differences in the construct, and not in something else. Common facets:

- **content validity**: the items cover the construct representatively (all the kinds of mathematics meant, at the intended difficulty), not a convenient corner of it;
- **criterion (predictive) validity**: the score predicts an external outcome that the construct is supposed to cause — performance in real use, expert ratings, success on a later task;
- **convergent and discriminant validity**: the score correlates with other measures of the same construct and *not* with measures of different ones (a reasoning score that tracks answer length more than correctness fails this).

An evaluation is **reliable** to the extent that repeating it — with another sample of items, another run, or an equally reasonable prompt — gives the same result. Reliability is necessary for validity but not sufficient: a scale that always reads $3$ kg too high is perfectly reliable and wrong.
:::

Language-model benchmarks threaten construct validity in characteristic ways. A multiple-choice benchmark of "reasoning" may be solvable by surface cues in the options. A coding benchmark whose tests are weak rewards code that passes the tests rather than code that is correct. A benchmark whose questions were collected from the web may measure **memorisation** of those questions ([[evaluation/contamination]]). A "safety" score based on refusals rewards a model that refuses everything. Raji et al. (2021) argued that benchmarks presented as measures of *general* capability — "the everything in the whole wide world benchmark" — cannot have construct validity for so broad a construct, because no finite collection of tasks is representative of it; a benchmark measures the specific tasks it contains, and claims beyond them need separate evidence.

::: example Reading a claim for construct validity {#ex-validity}
A report says a model "has expert-level medical knowledge" because it scores $90\%$ on a benchmark of multiple-choice questions taken from medical licensing exams. List the gaps between the evidence and the claim.
::: solution
**Content**: licensing exams test recall and textbook reasoning in a lettered format; expert practice involves gathering information over a conversation, handling ambiguity, and knowing when to refer — none of which the items cover. **Format**: choosing among four given options is easier than generating a diagnosis, and option elimination can succeed without full knowledge. **Criterion**: the report gives no evidence that the score predicts anything clinicians would judge, such as the quality of answers to real patient questions. **Contamination**: exam questions and their explanations circulate online, so part of the score may be recall of the items themselves. **Comparison**: "expert-level" implies a human reference; the pass mark of an exam is not the performance of experts, and humans and models sitting the same items under different conditions are not directly comparable. The defensible claim is narrower: "scores $90\%$ on these items under this protocol".
:::
:::

## The evaluation pipeline {#sec-pipeline}

The protocol $\pi$ and the scoring rule $s$ hide a sequence of engineering choices. For a typical question-answering benchmark they are:

::: algorithm An evaluation pipeline {#alg-pipeline}
1. **Select items**: the split (test or validation), any filtering, the number of items $n$.
2. **Format the prompt**: the template that wraps the question ("Question: … Answer:"), how options are presented (letters, parentheses, order), the system prompt and chat template for instruction-tuned models, and $k$ **few-shot** solved examples — which ones and in what order.
3. **Generate**: either score fixed candidates by log-likelihood (for base models, [[pretraining/in-training-evaluation]]) or generate text, with a decoding rule (greedy, or temperature $T$ and nucleus $p$), a maximum length and stop sequences ([[inference/decoding-sampling]]). For reasoning models, the budget of reasoning tokens.
4. **Extract the answer**: parse the output — the first letter, the last number, the content of a marked field such as "The answer is …", or code to be executed.
5. **Score**: compare with the reference after **normalisation** (case, whitespace, punctuation, numeric formats, equivalent mathematical expressions), or run the tests, or ask a judge.
6. **Aggregate**: mean over items, possibly weighted by subject, and repeated over samples when decoding is random (pass@$k$, [[reasoning/self-consistency]]).
:::

Every step can change the number. The most surprising lesson of the early large-model era was by how much.

- **Formatting.** Sclar et al. (2023) varied only meaning-preserving features of few-shot prompts — separators, spacing, capitalisation of field names — and found accuracy differences of up to $76$ percentage points between formats for one open model on one task, with model rankings that changed with the format. Their recommendation was to report the spread of performance over a sample of plausible formats rather than a single number.
- **Few-shot examples.** Lu et al. (2022) showed that the *order* of the same few-shot examples could move small and mid-sized models from near state-of-the-art to near chance on some classification tasks. Zhao et al. (2021) traced part of this to biases towards the label that is most frequent, or most recent, among the examples.
- **Option presentation.** Alzahrani et al. (2024) found that small changes to multiple-choice benchmarks — shuffling the order of the options, or changing the symbols used to label them — changed the ranking of models on leaderboards.
- **Implementation.** In June 2023 the maintainers of a public open-model leaderboard at Hugging Face reported that three widely used implementations of MMLU — the original authors' code, the HELM framework and the EleutherAI evaluation harness — gave noticeably different scores for the same models, because they differed in prompt wording, in whether the model's choice was read from the probability of the letter or of the answer text, and in normalisation. The models' rankings were not the same under the three.

The practical consequence is that a score is meaningful only together with its pipeline. Comparisons between numbers produced by different pipelines — a model's score from its developer's report against another model's score from a third party — are frequently comparisons of pipelines. Shared evaluation harnesses (EleutherAI's lm-evaluation-harness, HELM, and others) exist largely to fix the pipeline so that only the model varies.

### Answer extraction {#sec-extraction}

The step that is most often overlooked is extraction. Instruction-tuned and reasoning models do not answer "$42$"; they answer "Let me work through this… so the total is **42**." The parser that turns this into a prediction is part of the measuring instrument, and its errors are measurement errors.

::: proposition Extraction errors distort scores {#prop-extraction}
Let a model's **intended** answer be correct on a fraction $a$ of items. Suppose the extractor fails to recover a correct intended answer with probability $m$ (a **miss**), and turns an incorrect intended answer into one that matches the reference with probability $f$ (a **false match**), independently of the item. Then the expected measured accuracy is

$$
\E[\hat\mu] = a(1 - m) + (1 - a)f.
$$ {#eq-extraction}

If $m = f = 0$ for every model, measured accuracy is unbiased. If two models have different miss rates, the difference in their measured scores is not the difference in their intended accuracies, and the order of the two models can be reversed.
:::

::: proof
By the law of total probability, conditioning on whether the intended answer is correct: $\Prob(\text{scored correct}) = \Prob(\text{correct intent})\,\Prob(\text{recovered}\mid\text{correct intent}) + \Prob(\text{incorrect intent})\,\Prob(\text{false match}\mid\text{incorrect intent}) = a(1 - m) + (1 - a)f$. For two models with $(a_1, m_1)$ and $(a_2, m_2)$ and $f = 0$, measured scores are $a_1(1 - m_1)$ and $a_2(1 - m_2)$; with $a_1 > a_2$ but $m_1 > 1 - (1 - m_2)a_2/a_1$, the first measures lower.
:::

Misses are not independent of the model: they depend on its output style. A verbose model that restates intermediate numbers loses more under a "first number" rule; a model that adds a caveat after its answer loses under a "last number" rule. Extraction therefore tends to penalise whichever models differ most in style from the ones the extractor was written for.

::: example A ranking reversed by the parser {#ex-reversal}
Model A answers correctly with intent on $70\%$ of items but writes long explanations, so the extractor misses $15\%$ of its correct answers. Model B is correct on $65\%$ and answers tersely, with $2\%$ misses. Both have a false-match rate of $1\%$. What are their measured accuracies?
::: solution
By [[#eq-extraction]]: A: $0.70\cdot0.85 + 0.30\cdot0.01 = 0.595 + 0.003 = 0.598$. B: $0.65\cdot0.98 + 0.35\cdot0.01 = 0.637 + 0.0035 = 0.6405$. The better model measures more than four points lower. Nothing about sample size would reveal this; only reading the outputs whose extraction failed would. A standard check is to report the fraction of outputs from which no answer could be parsed.
:::
:::

::: widget plot
f: x*(1 - m) + (1 - x)*q; x
x: 0, 1
y: 0, 1
sliders: m=0.15:0:0.5:0.01; q=0.01:0:0.2:0.01
labels: measured accuracy; intended accuracy
caption: Measured against intended accuracy under [[#prop-extraction]], with miss rate $m$ and false-match rate $q$. Misses pull the line down most for strong models; false matches lift weak ones. Two models with different miss rates lie on different lines, so their measured difference is not their real difference.
:::

The listing simulates $300$ arithmetic questions answered by a model whose intended answer is right about two thirds of the time, written in six styles that real models use, and scores them with four extractors.

```python
import random, re

rng = random.Random(1)
# 300 arithmetic questions; the simulated model knows the answer 70% of the time
# and writes it in one of several styles that a real model might use
styles = [
    lambda a: f"{a}",
    lambda a: f"The answer is {a}.",
    lambda a: f"**{a}**",
    lambda a: f"First 12 + 30 = 42, so the total is {a}.",
    lambda a: f"{a:,}",                                  # thousands separator
    lambda a: f"Answer: {a} (or about {a + 1} if rounding)",
]
data = []
for i in range(300):
    gold = rng.randint(100, 5000)
    pred = gold if rng.random() < 0.7 else gold + rng.choice([-10, -1, 1, 10])
    data.append((gold, rng.choice(styles)(pred), pred == gold))

def exact(text):                       # whole output must be the number
    return int(text) if text.strip().isdigit() else None
def first_number(text):
    m = re.search(r"-?\d+", text)
    return int(m.group()) if m else None
def last_number(text):
    m = re.findall(r"-?\d[\d,]*", text)
    return int(m[-1].replace(",", "")) if m else None
def answer_is(text):                   # "answer is X" / "Answer: X", else last number
    m = re.search(r"[Aa]nswer(?: is|:)\s*\**(-?[\d,]+)", text)
    return int(m.group(1).replace(",", "")) if m else last_number(text)

truth = sum(c for _, _, c in data) / len(data)
print(f"true accuracy (model's intended answer correct): {truth:.3f}")
for f in (exact, first_number, last_number, answer_is):
    acc = sum(f(out) == gold for gold, out, _ in data) / len(data)
    print(f"{f.__name__:13s} measured accuracy {acc:.3f}")
```

```text
true accuracy (model's intended answer correct): 0.673
exact         measured accuracy 0.130
first_number  measured accuracy 0.447
last_number   measured accuracy 0.593
answer_is     measured accuracy 0.673
```

The same outputs score anywhere from $13\%$ to $67\%$. The strict parser accepts only bare numbers; "first number" is fooled by intermediate working and by the thousands separator; "last number" is fooled by the trailing caveat. Only the extractor written for these styles recovers the true accuracy — and it was written by looking at them, which is legitimate for the extractor but would not be for the model. Real pipelines face the same problem at larger scale: mathematical answers that are equal but written differently ($\frac12$, $0.5$, `\frac{1}{2}`), code wrapped in prose, letters given as "(B)" or "Option B". Common remedies are to instruct a fixed answer format, to use a tolerant parser with symbolic equivalence checking for mathematics, to use a model judge only for the extraction step ([[evaluation/model-judges]]), and always to inspect a sample of failures.

### Base and instruction-tuned models {#sec-formats}

Base models are usually evaluated by **likelihood**: the model is not asked to write an answer but to assign probabilities to given candidates, which removes extraction entirely but introduces normalisation choices ([[pretraining/in-training-evaluation]], [[evaluation/benchmarks]]). Instruction-tuned models are usually evaluated by **generation**, in their chat template, often with chain-of-thought reasoning before the answer. The two protocols measure different things — the probability that a candidate is "the natural continuation", against the ability to produce and commit to an answer — and a model's scores under the two need not agree. Reporting which was used is part of reporting the score.

### Chance and ceilings {#sec-chance}

A raw score needs two reference points: what a model with no relevant ability would get, and what a perfect one could get. On a multiple-choice benchmark the first is not zero.

::: proposition Correcting for guessing {#prop-chance}
On items with $K$ options, suppose a model knows the answer to a fraction $\kappa$ of items and guesses uniformly at random on the rest. Its expected accuracy is

$$
\E[\hat\mu] = \kappa + \frac{1 - \kappa}{K},\qquad\text{so}\qquad \kappa = \frac{\E[\hat\mu] - 1/K}{1 - 1/K}.
$$ {#eq-chance}

The **chance-normalised score** $(\hat\mu - 1/K)/(1 - 1/K)$ estimates $\kappa$; it is $0$ at chance and $1$ for a perfect score.
:::

::: proof
On known items the model is right with probability $1$; on the others with probability $1/K$. By total probability $\E[\hat\mu] = \kappa\cdot1 + (1 - \kappa)/K$. Solving the linear equation for $\kappa$ gives the second form.
:::

The model is idealised — real models have partial knowledge and can eliminate some options — but normalisation matters when benchmarks with different numbers of options are averaged, and when early in training a score of $26\%$ on a four-option benchmark is mistaken for "some ability" rather than chance. Some public leaderboards normalise in this way before averaging. At the other end, the **ceiling** is often below $100\%$ because of errors in the benchmark: items with wrong or ambiguous reference answers cap what any model can score, and audits of popular benchmarks have found such errors in a few per cent of items. Near the ceiling, the remaining differences between models may be about who agrees with the mistakes.

::: widget plot
f: (x - 1/K)/(1 - 1/K); x
x: 0, 1
y: -0.4, 1
sliders: K=4:2:10:1
hlines: 0
labels: chance-normalised score; raw accuracy
caption: The chance-normalised score of [[#prop-chance]] against raw accuracy for $K$ options. With $K = 4$, a raw score of $40\%$ corresponds to knowing only $20\%$ of the answers; a score below $1/K$ is negative, worse than guessing, which usually signals a format problem rather than anti-knowledge.
:::

::: example Comparing across formats {#ex-chance}
Model A scores $55\%$ on a four-option benchmark; model B scores $55\%$ on a ten-option version of the same questions. Which shows more knowledge under the guessing model?
::: solution
A: $\kappa = (0.55 - 0.25)/0.75 = 0.40$. B: $\kappa = (0.55 - 0.10)/0.90 = 0.50$. The same raw score represents more knowledge when guessing is less rewarded; the ten-option format is harder, which is why MMLU-Pro (Wang et al., 2024) expanded MMLU's four options to ten in part to reduce the contribution of guessing.
:::
:::

::: quiz
Which of these can change a model's reported score on a fixed set of benchmark items without any change to the model's weights?
- [x] Reordering the few-shot examples in the prompt
- [x] Switching from scoring the letter's probability to scoring the answer text's probability
- [x] Changing the regular expression that extracts the final number
- [x] Raising the decoding temperature from $0$ to $0.7$
::: solution
All of them. Each is part of the protocol $\pi$ or the scoring rule $s$ of [[#def-evaluation]], and the estimand $\mu(M)$ depends on them. This is why reproducible evaluation reports the full pipeline — template, shots, decoding, extraction and normalisation — and why scores from different pipelines are not comparable.
:::
:::

## Goodhart's law {#sec-goodhart}

Benchmarks are used not only to measure models but to choose between them: which checkpoint to release, which data mixture to keep, which prompt to publish with. Once a number is used to make choices it starts to change.

::: definition Goodhart's law {#def-goodhart}
**Goodhart's law**, after the economist Charles Goodhart (1975), in the commonly quoted phrasing of the anthropologist Marilyn Strathern (1997): *when a measure becomes a target, it ceases to be a good measure.* In evaluation, it is the tendency of a score $\hat\mu$, once optimised, to increase faster than the construct it was meant to track. Manheim and Garrabrant (2018) distinguished mechanisms:

- **regressional**: selecting on a proxy that equals the goal plus noise selects for the noise as well;
- **extremal**: the relationship between proxy and goal that held in the ordinary range fails at the extremes reached by optimisation;
- **causal**: intervening on the proxy does not change the goal, because the proxy was a correlate rather than a cause;
- **adversarial**: an optimiser (a training process, or a person) exploits the gap between proxy and goal.
:::

All four appear in practice. Choosing the best of many checkpoints on the test set is regressional. A model trained hard on short-answer mathematics benchmarks that loses general writing ability is extremal. Training on the benchmark's questions — deliberately or through contamination — raises the score without the capability, which is causal. Reward hacking in reinforcement learning against a benchmark-like reward is adversarial ([[safety-alignment/reward-hacking]]). The regressional case can be quantified exactly.

::: proposition The winner's curse of selection {#prop-winners-curse}
Let $m$ configurations (prompts, checkpoints, seeds) all have the same true score $\mu$, and let their measured scores be $\hat\mu_j = \mu + \sigma Z_j$ with $Z_1, \dots, Z_m$ independent standard normal. The measured score of the configuration chosen as best satisfies

$$
\E\big[\max_j\hat\mu_j\big] = \mu + \sigma e_m,\qquad e_m = \E\big[\max_j Z_j\big],
$$

with $e_1 = 0$, $e_2 = 1/\sqrt\pi\approx0.564$, and $e_m$ strictly increasing in $m$ (approximately $1.163$, $1.539$ and $1.867$ for $m = 5, 10, 20$). A fresh evaluation of the chosen configuration has expectation $\mu$.
:::

::: proof
The first claim is linearity: $\max_j(\mu + \sigma Z_j) = \mu + \sigma\max_jZ_j$. For $m = 2$, $\max(Z_1, Z_2) = \frac12(Z_1 + Z_2) + \frac12\lvert Z_1 - Z_2\rvert$; the first term has mean $0$, and $Z_1 - Z_2\sim\Normal(0, 2)$, whose absolute value has mean $\sqrt2\cdot\sqrt{2/\pi} = 2/\sqrt\pi$, so $e_2 = 1/\sqrt\pi$. Adding a configuration can only raise the maximum, $\max_{j\le m+1}Z_j\ge\max_{j\le m}Z_j$, with strict inequality with positive probability, so $e_{m+1} > e_m$. The other values are numerical integrals of $\int z\,m\,\phi(z)\Phi(z)^{m-1}\,dz$. Finally, a fresh evaluation uses new noise independent of the selection, whose mean is $0$.
:::

::: example Choosing among prompts on the test set {#ex-curse}
A team tries $10$ prompt templates for its model on a $500$-question benchmark and reports the best. Suppose every template has true accuracy $60\%$. How much does the reported score overstate it?
::: solution
The binomial standard error is $\sigma = \sqrt{0.6\cdot0.4/500} = 0.0219$. By [[#prop-winners-curse]] the selected score has expectation $0.60 + 1.539\cdot0.0219 = 0.6337$: about $3.4$ points of pure selection bias. The listing below reproduces it by simulation.
:::
:::

```python
import random

rng = random.Random(2)
n, p_true, trials = 500, 0.60, 2000      # questions, true accuracy of every variant, repetitions

def score(p, n):
    return sum(rng.random() < p for _ in range(n)) / n

for m in (1, 2, 5, 10, 20):
    picked, fresh = 0.0, 0.0
    for _ in range(trials):
        best = max(score(p_true, n) for _ in range(m))   # pick the best of m prompt variants
        picked += best
        fresh += score(p_true, n)                         # re-run the chosen one on new questions
    print(f"m = {m:2d}: selected score {picked / trials:.4f}, on fresh questions {fresh / trials:.4f}")
```

```text
m =  1: selected score 0.5992, on fresh questions 0.6006
m =  2: selected score 0.6128, on fresh questions 0.5998
m =  5: selected score 0.6251, on fresh questions 0.6003
m = 10: selected score 0.6340, on fresh questions 0.6005
m = 20: selected score 0.6410, on fresh questions 0.6003
```

The simulated selected scores match $0.6 + 0.0219\,e_m$ to within simulation error ($0.6124$, $0.6255$, $0.6337$, $0.6409$), and on fresh questions every selection falls back to $0.60$. In reality the configurations differ somewhat in true score, so selection does find better ones *and* overstates them; the remedy is the same in both cases. Choose on a **development** set, report on a **held-out** set used once, and say how many configurations were tried. The same arithmetic applies to the research community as a whole: when many groups tune many methods against one public test set, the best published number is inflated by selection, a concern raised for long-lived benchmarks well before language models (Recht et al., 2019, tested it for image classification by building a new ImageNet test set; accuracies dropped, but the rankings of models were largely preserved and the authors attributed the drop mainly to differences in the new data rather than to adaptive overfitting).

::: warning A higher score is not a better model
It is tempting to read a benchmark gain as a capability gain. The gain may come from the protocol (a better prompt, a more forgiving parser), from selection (the best of many runs), from contamination (the items were seen in training) or from optimisation against the benchmark's quirks — and only sometimes from the construct. Before accepting a gain, ask: was the pipeline the same? How many configurations were tried, and on which data? Could the items have been in the training data? Does the gain appear on a different benchmark of the same construct (convergent validity)? A real improvement usually shows up in several places; an artefact usually shows up in one.
:::

## Intended use {#sec-intended-use}

Evaluation is a means, not an end: it exists to inform a decision. The decision determines what should be measured, at what precision, and how results should be presented.

::: definition Intended use and decision-relevance {#def-intended-use}
The **intended use** of an evaluation is the decision it informs and the population of situations that decision concerns: releasing a checkpoint, choosing a model for a product, comparing research methods, deciding whether safeguards are needed. An evaluation is **decision-relevant** if a change in its result would change the decision. The **benchmark–deployment gap** is the difference between the evaluation's task population $\mathcal{D}$ and the distribution of situations met in the intended use.
:::

Different uses lead to different evaluations:

- **Research comparison** (does method A beat method B?) needs a fixed, shared pipeline, enough items to detect the expected difference ([[evaluation/evaluation-statistics]]), and controls for selection. Construct breadth matters less than comparability.
- **Model selection for an application** needs items drawn from the application — real user requests, the product's documents, its languages — scored by criteria the application cares about, including cost and latency. Public benchmark rankings are weak evidence here, because the deployment distribution differs from theirs.
- **Release and safety decisions** need evaluations of what could go wrong, run with the model's best elicitation, with thresholds set in advance ([[evaluation/capability-evaluations]]).
- **Monitoring** after deployment needs cheap, repeated measurements that detect change.

Documentation practices make intended use explicit. **Model cards** (Mitchell et al., 2019) report a model's intended uses, the factors across which performance was evaluated (groups, languages, conditions), the metrics, and the evaluation data; **datasheets for datasets** (Gebru et al., 2021) document how a dataset was collected and what it is suited for. For an evaluation, the analogous documentation states the construct, the task population, the full pipeline, the sample size and uncertainty, known validity threats, and what decisions the result does and does not support.

### Many numbers, not one {#sec-holistic}

A single headline number invites Goodhart's law and hides trade-offs. The HELM project (Liang et al., 2022) argued for evaluating each model on many scenarios with many metrics — accuracy, calibration, robustness to perturbations, fairness across groups, bias, toxicity and efficiency — under a standardised protocol, and for publishing the full matrix rather than an average, so that a user can weigh the dimensions that matter for their use. Bowman and Dahl (2021) set out what a benchmark for natural-language understanding should satisfy to be worth optimising: validity (good performance should require the skill), reliable annotation, enough statistical power to separate systems, and resistance to rewarding harmful biases. These criteria reappear throughout the course.

::: example An evaluation plan from a decision {#ex-plan}
A company will choose between two models to answer customers' questions about its software, in English and Spanish, from its documentation. Sketch an evaluation designed backwards from the decision.
::: solution
**Construct**: correct, grounded, helpful answers to real customer questions. **Items**: a few hundred questions sampled from past support tickets in both languages, stratified by product area, with reference answers written by support staff; questions not answerable from the documentation included, since the correct response is to say so. **Protocol**: each model in the retrieval setup it would actually use ([[prompting-rag/rag-evaluation]]), with the production system prompt and decoding settings. **Scoring**: correctness and groundedness against the reference by trained staff on a subsample, with a model judge validated against those labels for the rest ([[evaluation/model-judges]]); refusal and escalation rates; latency and cost per answer. **Analysis**: paired comparison on the same questions with confidence intervals, broken down by language and product area, since an aggregate win can hide a loss in Spanish. **Decision rule**, fixed in advance: choose the cheaper model unless the other is better on correctness by a margin the business considers worth the cost. Public leaderboard positions play no role, except to shortlist candidates.
:::
:::

::: history
Concern with what tests measure predates machine learning. Psychometrics developed reliability (Spearman, 1904) and validity theory; Cronbach and Meehl's "Construct validity in psychological tests" (1955) gave the concept its name, and Messick (1995) unified the facets of validity into one framework. In economics, Goodhart (1975) observed that monetary aggregates lost their predictive value once targeted by policy, and Campbell (1979) made the corresponding point about social indicators. Machine learning adopted the **common task framework** — shared data, a held-out test set and a fixed metric — from the speech and translation evaluations run by DARPA and NIST from the late 1980s, and it powered rapid progress, from TREC (from 1992) to ImageNet (2009) and GLUE (2018). As language models became general-purpose, the framework's assumptions came under strain: Raji et al. (2021) questioned the validity of "general" benchmarks, Bowman and Dahl (2021) asked what it would take to fix benchmarking, HELM (Liang et al., 2022) proposed holistic multi-metric evaluation, and work on prompt sensitivity (Zhao et al., 2021; Lu et al., 2022; Sclar et al., 2023) showed that the protocol is as much a part of a score as the model.
:::

::: summary
- An evaluation is a task population, a protocol, a scoring rule and an aggregate ([[#def-evaluation]]); its estimand depends on all four, and a benchmark gives a noisy estimate of it.
- **Construct validity** asks whether a score measures its claimed capability (content, criterion, convergent and discriminant validity); **reliability** asks whether it would repeat. Broad claims need evidence beyond one benchmark.
- The **pipeline** — prompt format, few-shot examples and their order, option presentation, decoding, answer extraction, normalisation — can move scores by many points and reorder models; report it in full and compare only like with like.
- Extraction errors bias scores by $a(1 - m) + (1 - a)f$ ([[#prop-extraction]]), and style-dependent misses can reverse rankings; inspect parse failures.
- On $K$-option items, chance is $1/K$; the normalised score $(\hat\mu - 1/K)/(1 - 1/K)$ estimates the fraction known ([[#prop-chance]]).
- **Goodhart's law**: optimised measures drift from their goals. Selecting the best of $m$ equal configurations overstates it by $\sigma e_m$ ([[#prop-winners-curse]]); select on development data and report on held-out data once.
- Design evaluations backwards from their **intended use**; report many metrics and their uncertainty, not one headline number.
:::

## Exercises

::: exercise Chance-normalising a score {level=1 check="0.4"}
A model scores $52\%$ on a five-option multiple-choice benchmark. Under the guessing model of [[#prop-chance]], what fraction of the answers does it know?
::: solution
$\kappa = (0.52 - 0.2)/(1 - 0.2) = 0.32/0.8 = 0.4$.
:::
:::

::: exercise Measured accuracy under extraction errors {level=1 check="0.724"}
A model's intended answers are correct on $80\%$ of items. The extractor misses $10\%$ of correct answers and creates a false match on $2\%$ of incorrect ones. What is the expected measured accuracy (three decimal places)?
::: solution
By [[#eq-extraction]]: $0.8\cdot0.9 + 0.2\cdot0.02 = 0.72 + 0.004 = 0.724$.
:::
:::

::: exercise Counting few-shot configurations {level=1 check="1860480"}
An evaluation uses $5$ few-shot examples, chosen and ordered from a pool of $20$ solved examples. How many distinct ordered few-shot prompts are possible? Why does this matter for reported scores?
::: solution
Ordered selections of $5$ from $20$: $20\cdot19\cdot18\cdot17\cdot16 = 1{,}860{,}480$. Since order alone can change scores substantially (Lu et al., 2022), a single prompt is one draw from a large space; a reliable evaluation fixes the prompt in advance (for comparability) or averages over several random draws and reports the spread (for robustness). Choosing the best of many on the test set incurs the winner's curse.
:::
:::

::: exercise Undoing a known miss rate {level=2 check="0.6316"}
An audit of $200$ failed parses shows that the extractor misses $5\%$ of correct answers and never produces false matches. The measured accuracy is $60\%$. Estimate the intended accuracy to four decimal places. Why is it better to fix the extractor than to apply this correction?
::: solution
With $f = 0$, [[#eq-extraction]] gives $\hat\mu = a(1 - m)$, so $a = 0.60/0.95 = 0.6316$. The correction assumes the miss rate is the same for every item and is estimated without error; in fact misses cluster in particular output styles and question types, and the estimated rate has its own uncertainty, which the corrected score inherits. Fixing the extractor removes the error item by item, and for a comparison of models it removes the style-dependent bias that a single correction factor cannot.
:::
:::

::: exercise The winner's curse for two prompts {level=2 check="0.5141"}
Two prompts with the same true accuracy $0.5$ are compared on $400$ questions and the better is reported. Using the normal model of [[#prop-winners-curse]] with the binomial standard error, what is the expected reported score (four decimal places)?
::: solution
$\sigma = \sqrt{0.5\cdot0.5/400} = 0.025$ and $e_2 = 1/\sqrt\pi = 0.5642$, so the expected reported score is $0.5 + 0.025\cdot0.5642 = 0.5141$. (The two scores share the same questions in practice, which makes them positively correlated and the bias smaller; the independent model is the worst case.)
:::
:::

::: exercise A validity audit {level=2}
A benchmark claims to measure "long-context understanding": each item hides one sentence (the "needle", such as "The secret number is 4821") in a long document of unrelated text, and asks the model to repeat it. Discuss its content, criterion and discriminant validity for the construct, and propose one change that would improve each.
::: solution
**Content**: the task covers only literal retrieval of a single conspicuous sentence that is unrelated to its surroundings; long-context understanding also involves combining information spread across the document, tracking entities and resolving references, and summarising. Improvement: add items requiring aggregation over several passages and reasoning about the document's own content. **Criterion**: no evidence is given that the score predicts performance on real long-document tasks (contract review, codebase questions); improvement: correlate scores with a set of realistic long-document tasks across models. **Discriminant**: because the needle is lexically distinctive, a model could succeed with shallow pattern matching, and the score may correlate with instruction following more than with understanding; improvement: make the needle semantically related to the surrounding text, or use paraphrased questions that share no words with it. Later long-context benchmarks went in these directions; [[inference/long-context]] discusses the models' side.
:::
:::

::: exercise Ranking reversal threshold {level=2 check="0.0833"}
Model A has intended accuracy $0.72$ and model B $0.66$. B's miss rate is $0$ and neither has false matches. Above what miss rate $m_A$ (four decimal places) does A measure lower than B?
::: solution
A measures lower when $0.72(1 - m_A) < 0.66$, that is $m_A > 1 - 0.66/0.72 = 1 - 0.9167 = 0.0833$. An $8\%$ miss rate on one model is enough to erase a six-point lead.
:::
:::

::: exercise Regression to the mean in selection {level=3 check="1.2"}
Let a benchmark score $U$ and the capability it is meant to track $V$ be standard normal with correlation $\rho$, jointly normal, across a population of candidate models. (a) Show that $\E[V\mid U = u] = \rho u$. (b) A lab selects models whose score is $2$ standard deviations above the mean. With $\rho = 0.6$, what is their expected capability in standard deviations? (c) Interpret this as regressional Goodhart.
::: solution
(a) Write $V = \rho U + \sqrt{1 - \rho^2}\,W$ with $W$ standard normal and independent of $U$; this has unit variance and $\Cov(U, V) = \rho$, and jointly normal variables with the same means and covariances have the same distribution. Then $\E[V\mid U = u] = \rho u + \sqrt{1 - \rho^2}\,\E[W] = \rho u$. (b) $0.6\cdot2 = 1.2$ standard deviations. (c) Selecting on the proxy selects partly on the part of $U$ that is noise with respect to $V$; the selected models are better, but by less than their scores suggest, and the shortfall $(1 - \rho)u$ grows with the strength of selection $u$. The harder one optimises the proxy, the larger the gap, which is the regressional form of Goodhart's law; [[#prop-winners-curse]] is the special case $\rho = 0$ in which all candidates are equal.
:::
:::

::: exercise A better extractor {level=3}
Extend the extractors of [[#sec-extraction]] with one for mathematics answers: it should prefer the content of a LaTeX `\boxed{…}` if present, then an "answer is" or "Answer:" field, then the last number; strip thousands separators; and compare numerically, so that "0.50", "1/2" and "\frac{1}{2}" all match the reference $0.5$. Test it on a handful of strings.
::: solution
```python
import re
from fractions import Fraction

def to_number(s):
    s = s.strip().strip("$").replace(",", "").rstrip(".")
    m = re.fullmatch(r"\\d?frac\{(-?\d+)\}\{(-?\d+)\}", s)     # \frac{a}{b} or \dfrac{a}{b}
    if m:
        return Fraction(int(m.group(1)), int(m.group(2)))
    try:
        return Fraction(s)                                    # "1/2", "0.50", "-3"
    except (ValueError, ZeroDivisionError):
        return None

def extract(text):
    m = re.findall(r"\\boxed\{((?:[^{}]|\{[^{}]*\})*)\}", text)
    if m:
        return to_number(m[-1])
    m = re.search(r"[Aa]nswer(?: is|:)\s*\**\s*([^\s*]+)", text)
    if m and to_number(m.group(1)) is not None:
        return to_number(m.group(1))
    nums = re.findall(r"-?\d[\d,]*(?:\.\d+)?(?:/\d+)?", text)
    return to_number(nums[-1]) if nums else None

tests = ["So the result is \\boxed{\\frac{1}{2}}.", "The answer is 0.50.", "Answer: 1/2",
         "We get 3, then 7, so 1,250", "Thus x = \\boxed{-3}", "no idea"]
for t in tests:
    print(f"{t!r:45s} -> {extract(t)}")
print(extract(tests[0]) == Fraction(1, 2) == extract(tests[1]) == extract(tests[2]))
```

```text
'So the result is \\boxed{\\frac{1}{2}}.'     -> 1/2
'The answer is 0.50.'                         -> 1/2
'Answer: 1/2'                                 -> 1/2
'We get 3, then 7, so 1,250'                  -> 1250
'Thus x = \\boxed{-3}'                        -> -3
'no idea'                                     -> None
True
```

Exact rational comparison avoids floating-point surprises. Real mathematics graders go further, using a computer-algebra system to test the equivalence of expressions such as $\sqrt{8}$ and $2\sqrt2$, and they still need auditing: every rule that accepts more equivalent forms also risks accepting a wrong answer, a false match in the terms of [[#prop-extraction]].
:::
:::
