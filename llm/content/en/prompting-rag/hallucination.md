Ask a language model for the biography of a moderately obscure scientist and it may give a fluent account with a birthplace, a university and two books — some of them real, some invented, all stated with the same confidence. Ask it to summarise a contract and it may add a clause that is not there. The field calls such output **hallucination**: content that is fluent and plausible but not supported by the world or by the source the model was given. It is the main obstacle to relying on language models for facts, and the main reason retrieval-augmented generation exists.

This chapter makes the notion precise with a taxonomy, explains why next-token prediction produces hallucinations — including a clean argument that a calibrated model must hallucinate on facts it has seen only once, and an argument that common evaluations reward guessing — and then turns to the remedies: grounding in sources, detection by consistency, calibration of confidence, and abstention. Throughout, numbers from studies are given with their source and date; they describe particular models on particular benchmarks and will change.

## What counts as a hallucination {#sec-taxonomy}

The word is used loosely; surveys have given it structure. Ji et al. (2023), surveying natural-language generation broadly, distinguished hallucinations by their relation to a **source** (the document to summarise, the passage to answer from).

::: definition Intrinsic and extrinsic hallucination {#def-intrinsic}
Given a source text, a generated statement is an **intrinsic hallucination** if it contradicts the source, and an **extrinsic hallucination** if it can be neither supported nor contradicted by the source. Output that is entailed by the source is **faithful** to it.
:::

An extrinsic statement may happen to be true — the model added a correct fact from memory — but it is not *grounded*: a reader cannot verify it from the source. For open-ended generation without a source, Huang et al. (2023) proposed a complementary split.

::: definition Factuality and faithfulness hallucination {#def-factuality}
A **factuality hallucination** is a statement inconsistent with verifiable real-world facts, or a fabricated entity, quotation or reference. A **faithfulness hallucination** is output inconsistent with the user's instructions, the provided context, or the model's own earlier output (logical inconsistency).
:::

| example | category |
|---|---|
| A summary says a meeting was on Tuesday; the minutes say Thursday. | intrinsic, faithfulness |
| A summary adds that the meeting was "productive"; the minutes say nothing about it. | extrinsic |
| A model cites a paper with a plausible title and authors that does not exist. | factuality (fabrication) |
| Asked for a reply in French, the model replies in English. | faithfulness (instruction) |
| A model computes $17\times24 = 418$ and then uses $408$ in the next line. | faithfulness (self-inconsistency) |

The distinction matters in practice because the remedies differ. Faithfulness to a given source can be checked automatically against that source; factuality requires knowledge of the world, which is exactly what is in doubt.

## Why models hallucinate {#sec-causes}

Several causes compound, at every stage of a model's life.

**The objective.** Pretraining maximises the likelihood of the next token ([[pretraining/pretraining-objectives]]). Text that *sounds like* a biography is rewarded whether or not its facts are right, because the training corpus contains millions of biographies and the model is rewarded for producing their typical form. Nothing in the loss separates "a plausible birthplace" from "the birthplace".

**The data.** Training corpora contain errors, contradictions and outdated statements, and they cover facts very unevenly. Kandpal et al. (2023) found that models' accuracy on factual questions rises steeply with the number of pretraining documents relevant to the question; facts in the long tail are learned poorly or not at all.

**Fine-tuning.** Post-training teaches a model to answer helpfully, and helpful-looking answers are more often confident than hedged. Gekhman et al. (2024) found that fine-tuning on examples containing knowledge the model did not already have was learned slowly and, once learned, increased the tendency to hallucinate — consistent with fine-tuning teaching the *form* "answer confidently" rather than new facts.

**Decoding.** Sampling at positive temperature can pick a low-probability continuation ([[inference/decoding-sampling]]), and once a wrong token is emitted the model conditions on it: Zhang et al. (2023) documented **snowballing**, in which a model commits to a wrong answer in its first tokens and then produces justifications for it, although asked separately it can often recognise the justifications as false.

The first two causes can be made quantitative.

### A calibrated model must hallucinate on rare facts

Consider "arbitrary" facts that have no pattern a model could generalise from — a person's birthday, say. Kalai and Vempala (2024) showed that a language model that is *calibrated* in a natural statistical sense must hallucinate on such facts at a rate close to the fraction of them that appear exactly once in its training data. The intuition is the **Good–Turing** estimate of unseen mass.

::: definition Good–Turing estimate of the missing mass {#def-good-turing}
In a sample of $n$ observations from a distribution over a large set of items, let $n_1$ be the number of items observed exactly once. The **Good–Turing estimate** of the total probability of all items *not* observed is $n_1/n$.
:::

The estimate says: the frequency of things seen once is a good guide to the frequency of things not yet seen. A model that has learned the distribution of birthday statements well must therefore put probability about $n_1/n$ on birthday facts it has *never* seen — and since it has never seen them, it cannot know which are true. Some of that mass will be generated as confident falsehoods, unless the model is trained to divert it to abstentions. Kalai and Vempala proved a lower bound of this form under their assumptions; the result concerns arbitrary facts, not systematic knowledge such as arithmetic, where generalisation is possible.

::: example Singletons in the training data {#ex-good-turing}
In a training corpus, $1500$ statements give people's birth dates; $200$ of the people are mentioned exactly once. What fraction of birth-date statements does Good–Turing predict concerns people the model has never seen, and what does that imply?
::: solution
$n_1/n = 200/1500 = 0.133$. A model that matches the distribution of such statements will produce birth dates for unseen people in roughly $13\%$ of the cases where it states one, and it has no information about those dates, so nearly all of them will be wrong. Retrieval (giving it the facts) or abstention (training it to decline) are the only ways around this; more of the same kind of data only reduces $n_1/n$ slowly.
:::
:::

### Evaluations reward guessing

A second argument concerns incentives. Kalai et al. (2025) observed that most benchmarks grade answers as right or wrong, giving no credit for "I don't know". Under such grading, guessing is always optimal.

::: proposition When to answer {#prop-answer}
A model answers a question it believes it can answer correctly with probability $p$. Grading gives $+1$ for a correct answer, $-\lambda$ (with $\lambda\ge0$) for a wrong one and $0$ for an abstention. Answering has higher expected score than abstaining if and only if

$$
p > \frac{\lambda}{1 + \lambda}.
$$

With binary grading ($\lambda = 0$) answering is optimal whenever $p > 0$. Conversely, to make answering worthwhile only above a confidence threshold $t$, set $\lambda = t/(1 - t)$.
:::

::: proof
The expected score of answering is $p\cdot1 + (1 - p)(-\lambda) = p - \lambda(1 - p)$, and that of abstaining is $0$. Answering is better iff $p - \lambda + \lambda p > 0$, i.e. $p(1 + \lambda) > \lambda$, i.e. $p > \lambda/(1 + \lambda)$. Setting $\lambda/(1 + \lambda) = t$ and solving gives $\lambda = t/(1 - t)$.
:::

::: widget plot
f: x - l*(1 - x); 0
x: 0, 1
y: -3, 1.05
sliders: l=3:0:9:0.1
labels: expected score of answering; abstaining
points: 0.75,0
caption: Expected score of answering against the model's probability $p$ of being right, when a wrong answer costs $\lambda$ (slider) and abstaining scores $0$. The lines cross at $p = \lambda/(1 + \lambda)$: for $\lambda = 3$ at $0.75$, marked. With $\lambda = 0$ — the usual right-or-wrong benchmark — the answering line is above zero for every $p > 0$, so a model optimised for such benchmarks learns never to abstain.
:::

::: example A penalty for wrong answers {#ex-penalty}
A grader gives $+1$ for a correct answer, $-3$ for a wrong one and $0$ for "I don't know". A model is $60\%$ sure of an answer. Should it answer? What threshold does this grading impose?
::: solution
Expected score of answering: $0.6 - 3\cdot0.4 = -0.6 < 0$, so it should abstain. The threshold is $\lambda/(1 + \lambda) = 3/4$: answer only when more than $75\%$ confident. Kalai et al. proposed stating such thresholds in benchmark instructions, so that models are rewarded for well-calibrated abstention rather than for confident guessing.
:::
:::

## Measuring hallucination {#sec-measuring}

Measurement turns the taxonomy into numbers, and every number depends on the benchmark, the model and the date. A few representative findings:

- **TruthfulQA** (Lin et al., 2022) asks questions that some humans answer falsely because of misconceptions. In the original study the best model tested was truthful on $58\%$ of questions, against $94\%$ for humans, and larger models of the same family were often *less* truthful, having learned the misconceptions better. Later models score much higher, and the benchmark is now widely suspected to be partly in training data ([[evaluation/contamination]]).
- **FActScore** (Min et al., 2023) breaks a long generation into atomic facts and checks each against a knowledge source. For biographies of people of varying fame, ChatGPT (as of early 2023) had $58\%$ of its atomic facts supported, with accuracy falling sharply for rarer people — the long tail of [[#sec-causes]].
- **Citation audits**: as cited in [[prompting-rag/retrieval-augmented-generation#sec-prompt]], a 2023 study of generative search engines found that only about half of their sentences were fully supported by the citations given.

Rates for current models are lower on such benchmarks, but they are not zero, and they rise on rare topics, long outputs and questions without a clear answer.

## Grounding {#sec-grounding}

The most effective general remedy is to give the model the facts and require it to use them: **grounding**. Retrieval-augmented generation ([[prompting-rag/retrieval-augmented-generation]]) supplies sources; the prompt asks for an answer supported by them, with citations, and for an explicit statement when the sources are silent. Grounding converts a factuality problem, which needs world knowledge to check, into a faithfulness problem, which can be checked against the sources.

::: definition Attribution {#def-attribution}
A statement is **attributable** to a source if a generic reader, given the source, would agree that the source supports the statement — the "attributable to identified sources" criterion of Rashkin et al. (2023). An answer's **citation recall** is the fraction of its statements supported by their cited sources, and its **citation precision** the fraction of citations that support the statement they are attached to.
:::

Grounding reduces hallucination substantially but does not eliminate it: models still add extrinsic details, misread sources, merge facts from two sources into one false statement, or prefer their memory to a contradicting source. Several further techniques act at generation time. **Chain-of-verification** (Dhuliawala et al., 2023) has the model draft an answer, plan verification questions about its claims, answer them independently and revise. **Post-hoc attribution** checks each sentence with a natural-language-inference model and removes or flags unsupported ones. **Decoding interventions** such as contrasting the predictions of later and earlier layers (DoLa; Chuang et al., 2024) reported improved factuality on some benchmarks. **Training for factuality** — for example preference optimisation with automatically judged factuality as the reward (Tian et al., 2024), or training models to say "I don't know" on questions outside their knowledge (Zhang et al., 2024) — targets the cause rather than the symptom.

::: warning A citation is not evidence that a claim is supported
A sentence followed by `[2]` *looks* verified, and readers tend to trust it. But the model generates citation markers the same way it generates words, and it can attach a real source to a claim that source does not make — the third claim checked in the RAG chapter's listing is such a case. Treat citations as pointers to check, verify them automatically where you can, and show users the cited passage, not just the number.
:::

## Detecting hallucinations without a source {#sec-detection}

When there is no source to check against, a model's own behaviour can betray uncertainty. If a model knows a fact, repeated samples tend to agree; if it is guessing, they scatter. SelfCheckGPT (Manakul et al., 2023) scores each sentence of a response by how consistent it is with further sampled responses. Comparing samples word for word is misleading, though: *Paris*, *It is Paris.* and *the city of Paris* are different strings with one meaning. **Semantic entropy** (Kuhn et al., 2023; Farquhar et al., 2024) measures uncertainty over meanings instead.

::: definition Semantic entropy {#def-semantic-entropy}
Sample $n$ answers to a question, partition them into **clusters** of answers with the same meaning (in practice, answers that a natural-language-inference model judges to entail each other in both directions), and let $\hat p_c$ be the fraction of answers in cluster $c$. The **semantic entropy** is

$$
\mathrm{SE} = -\sum_c\hat p_c\ln\hat p_c.
$$

High semantic entropy indicates that the model is uncertain about the *content* of the answer, a signal of likely confabulation.
:::

::: example Semantic versus naive entropy {#ex-semantic}
Ten sampled answers to *What is the capital of France?* (from a confused model) are: *Paris*, *It is Paris.*, *paris*, *The city of Paris*, *Paris.*, *Paris*, *Lyon*, *It is Lyon.*, *Lyon*, *Marseille*. Compute the semantic entropy, and compare with the entropy over distinct strings.
::: solution
The meaning clusters are Paris ($6$), Lyon ($3$) and Marseille ($1$), so $\mathrm{SE} = -(0.6\ln0.6 + 0.3\ln0.3 + 0.1\ln0.1) = 0.306 + 0.361 + 0.230 = 0.898$ nats. Over strings, normalised only by exact identity, there are eight distinct strings (*Paris* and *Lyon* each appear twice), with entropy $2.025$ nats. The naive measure counts variation in wording as uncertainty; a model that always answered *Paris* in ten different phrasings would have naive entropy $2.3$ nats but semantic entropy $0$.
:::
:::

Farquhar et al. (2024) reported that semantic entropy detected confabulations better than naive entropy and several other baselines across question-answering datasets and models. It costs several samples per question and a clustering step, and it does not detect errors the model makes consistently — a confidently held misconception has low entropy.

A detector is a classifier, and its usefulness depends on the base rate of what it detects ([[ml-fundamentals/evaluation-metrics#sec-base-rates]]).

::: example A detector and its base rate {#ex-base-rate}
A hallucination detector flags $90\%$ of hallucinated answers and wrongly flags $10\%$ of correct ones. In a deployment, $5\%$ of answers are hallucinated. What fraction of flagged answers are actually hallucinated?
::: solution
Of $1000$ answers, $50$ are hallucinated and $45$ of those are flagged; of the $950$ correct ones, $95$ are flagged. So $45/(45 + 95) = 0.321$: two thirds of the flags are false alarms. Whether that is acceptable depends on what a flag triggers — a cheap second check is fine, discarding answers is not.
:::
:::

::: widget bayes
mode: test
prevalence: 0.05
sensitivity: 0.9
specificity: 0.9
caption: The detector of [[#ex-base-rate]] in natural frequencies: hallucinations are the "condition", flags are positive tests. With a $5\%$ hallucination rate only about a third of flagged answers are hallucinated. Raise the prevalence (a harder domain, an older model) and the flags become more trustworthy; raise the specificity and false alarms fall fastest.
:::

## Calibration and abstention {#sec-calibration}

The cleanest defence against a wrong answer is not to give one. Abstention needs a confidence signal, and the signal is only useful if it is **calibrated**: among answers given with confidence $0.8$, about $80\%$ should be right ([[ml-fundamentals/evaluation-metrics#def-calibration]]).

::: definition Expected calibration error {#def-ece}
Partition predictions into bins $B_1, \dots, B_M$ by stated confidence. With $\operatorname{conf}(B_m)$ the mean confidence and $\operatorname{acc}(B_m)$ the accuracy in bin $m$, and $n$ predictions in all, the **expected calibration error** is

$$
\mathrm{ECE} = \sum_{m=1}^{M}\frac{\lvert B_m\rvert}{n}\,\big\lvert\operatorname{acc}(B_m) - \operatorname{conf}(B_m)\big\rvert.
$$
:::

Confidence for an LLM's answer can be obtained in several ways: the probability of the answer tokens (well defined for multiple choice), a probability the model states in words, the model's estimate that its own answer is true, or agreement across samples. Kadavath et al. (2022) found that large pretrained models were well calibrated on multiple-choice questions in a suitable format, and could be trained to predict whether they knew an answer; the developers of GPT-4 reported that their pretrained model was well calibrated on a multiple-choice benchmark and that post-training reduced its calibration (OpenAI, 2023). Probabilities stated in words are often overconfident, and calibration should be measured, not assumed.

The listing simulates an overconfident model, computes its ECE, and computes the semantic entropy of [[#ex-semantic]] with a crude string-normalising clustering in place of an entailment model.

```python
import math, random
from collections import Counter
rng = random.Random(7)

# Simulated QA results: stated confidence c, and correctness drawn with prob c**1.6
# (an overconfident model: true accuracy below stated confidence)
data = []
for _ in range(2000):
    c = rng.uniform(0.3, 1.0)
    data.append((c, rng.random() < c**1.6))

def ece(data, bins=5):
    total = 0.0
    for b in range(bins):
        lo, hi = 0.3 + 0.7*b/bins, 0.3 + 0.7*(b+1)/bins
        sel = [(c, y) for c, y in data if lo <= c < hi or (b == bins-1 and c == hi)]
        if not sel: continue
        conf = sum(c for c, _ in sel)/len(sel); acc = sum(y for _, y in sel)/len(sel)
        print(f"  bin [{lo:.2f},{hi:.2f}) n={len(sel):4d} confidence {conf:.3f} accuracy {acc:.3f}")
        total += len(sel)/len(data) * abs(conf - acc)
    return total
print(f"ECE = {ece(data):.3f}")

def semantic_entropy(answers, canon):
    clusters = Counter(canon(a) for a in answers)      # group answers by meaning
    n = len(answers)
    return -sum(k/n * math.log(k/n) for k in clusters.values()), clusters

canon = lambda a: a.lower().replace("it is ", "").replace("the city of ", "").strip(" .")
samples = ["Paris", "It is Paris.", "paris", "The city of Paris", "Paris.", "Paris",
           "Lyon", "It is Lyon.", "Lyon", "Marseille"]
h, cl = semantic_entropy(samples, canon)
print("clusters", dict(cl), f"semantic entropy {h:.3f} nats")
print(f"naive entropy over distinct strings {semantic_entropy(samples, lambda a: a)[0]:.3f} nats")
```

```text
  bin [0.30,0.44) n= 426 confidence 0.369 accuracy 0.204
  bin [0.44,0.58) n= 411 confidence 0.511 accuracy 0.384
  bin [0.58,0.72) n= 381 confidence 0.650 accuracy 0.478
  bin [0.72,0.86) n= 389 confidence 0.789 accuracy 0.663
  bin [0.86,1.00) n= 393 confidence 0.926 accuracy 0.878
ECE = 0.128
clusters {'paris': 6, 'lyon': 3, 'marseille': 1} semantic entropy 0.898 nats
naive entropy over distinct strings 2.025 nats
```

Every bin's accuracy is below its confidence, by $5$ to $17$ points, and the ECE is $0.128$. A threshold chosen on stated confidence — "answer if at least $0.75$ sure" — would answer questions it gets right only about two thirds of the time. Recalibrating on held-out data (fitting a map from stated confidence to observed accuracy, such as temperature scaling) fixes the numbers without changing the ranking.

Given a calibrated score, **selective prediction** answers only above a threshold. Its trade-off is described by **coverage** (the fraction of questions answered) and **risk** (the error rate on those answered): raising the threshold lowers both. The right operating point depends on the cost of a wrong answer relative to an abstention — exactly the $\lambda$ of [[#prop-answer]].

::: quiz
A model is scored only on accuracy (right or wrong). During development it learns to answer every question, even when unsure, instead of saying "I don't know". By [[#prop-answer]], what change to the scoring would most directly reward appropriate abstention?
- [ ] Reward longer answers.
- [x] Give $0$ for abstaining and a negative score for wrong answers, so that guessing below a confidence threshold lowers the expected score.
- [ ] Count abstentions as correct.
- [ ] Lower the sampling temperature during evaluation.
::: solution
With $\lambda = 0$ every guess with $p > 0$ has positive expected score, so guessing always wins. A penalty $\lambda$ for wrong answers makes abstaining optimal below $p = \lambda/(1 + \lambda)$. Counting abstentions as correct would instead reward abstaining always.
:::
:::

::: history
"Hallucination" was used in computer vision for generating detail in image super-resolution (Baker and Kanade, 2000) and entered natural-language generation with neural machine translation and summarisation, where models produced fluent output unsupported by the input (Lee et al., 2018, on translation; Maynez et al., 2020, who found hallucinations in a large fraction of neural summaries and distinguished intrinsic from extrinsic). Ji et al. (2023) surveyed the problem across generation tasks, and Huang et al. (2023) for large language models. TruthfulQA (Lin et al., 2022) and FActScore (Min et al., 2023) became standard measurements; Kadavath et al. (2022) studied what models know about what they know; Manakul et al. (2023) proposed self-consistency checks and Kuhn et al. (2023) and Farquhar et al. (2024) semantic entropy. On the theory side, Kalai and Vempala (2024) showed that calibrated models must hallucinate on rare arbitrary facts, and Kalai et al. (2025) argued that binary grading of benchmarks rewards guessing over abstention.
:::

::: summary
- Hallucinations are fluent outputs unsupported by a source (intrinsic: contradicting it; extrinsic: unverifiable from it) or by the world (factuality), or inconsistent with instructions or the model's own output (faithfulness).
- Causes compound: a likelihood objective that rewards plausible form, uneven and noisy data with a long tail of rare facts, fine-tuning that rewards confident answers, and decoding that commits to early errors.
- A calibrated model must hallucinate on arbitrary facts at about the rate of facts seen once in training (Good–Turing); binary-graded evaluations make guessing optimal, while a penalty $\lambda$ for wrong answers makes abstention optimal below confidence $\lambda/(1 + \lambda)$.
- Grounding in retrieved sources turns factuality into faithfulness, which can be checked; citations help but must be verified.
- Without a source, disagreement among samples — measured over meanings by semantic entropy — signals confabulation; detectors must be judged against base rates.
- Abstention needs calibrated confidence; measure calibration (ECE), recalibrate, and choose the risk–coverage operating point by the cost of errors.
:::

## Exercises

::: exercise The symmetric penalty {level=1 check="0.5"}
A wrong answer costs as much as a right answer gains ($\lambda = 1$). Above what confidence should a model answer?
::: solution
$\lambda/(1 + \lambda) = 1/2$: answer when more than $50\%$ sure.
:::
:::

::: exercise An expected score {level=1 check="-0.2"}
With $\lambda = 3$, what is the expected score of answering at confidence $0.7$?
::: solution
$0.7 - 3\cdot0.3 = -0.2$; abstaining ($0$) is better, since $0.7 < 0.75$.
:::
:::

::: exercise Good–Turing {level=1 check="0.15"}
A corpus contains $2000$ statements of the founding years of small companies, and $300$ companies are mentioned exactly once. What is the Good–Turing estimate of the fraction of such statements about unseen companies?
::: solution
$n_1/n = 300/2000 = 0.15$.
:::
:::

::: exercise Calibration error by hand {level=1 check="0.115"}
A model's $100$ answers fall into three confidence bins: $50$ with mean confidence $0.9$ and accuracy $0.7$; $30$ with confidence $0.7$ and accuracy $0.65$; $20$ with confidence $0.5$ and accuracy $0.5$. Compute the ECE.
::: solution
$0.5\cdot0.2 + 0.3\cdot0.05 + 0.2\cdot0 = 0.1 + 0.015 = 0.115$.
:::
:::

::: exercise Semantic entropy of a split vote {level=1 check="0.673"}
Five sampled answers form two meaning clusters of sizes $3$ and $2$. Compute the semantic entropy in nats.
::: solution
$-(0.6\ln0.6 + 0.4\ln0.4) = 0.306 + 0.367 = 0.673$.
:::
:::

::: exercise Precision of a detector {level=2 check="0.64"}
A hallucination detector flags $80\%$ of hallucinated answers and $5\%$ of correct ones; $10\%$ of answers are hallucinated. What fraction of flagged answers are hallucinated?
::: solution
Per $1000$ answers: $100$ hallucinated, $80$ flagged; $900$ correct, $45$ flagged. Precision $80/125 = 0.64$.
:::
:::

::: exercise Classifying hallucinations {level=2}
Classify each output using [[#def-intrinsic]] and [[#def-factuality]]: (a) a summary of a paper says it used $1000$ participants, the paper says $100$; (b) a summary adds that the authors work at a named university, which the paper does not mention but which is true; (c) an assistant asked for three bullet points writes five; (d) a model states that a historical treaty was signed in a year in which it was not, with no source given.
::: solution
(a) Intrinsic hallucination (contradicts the source), a faithfulness error. (b) Extrinsic hallucination: not supported by the source, though true; it is a factual statement but not grounded, and a faithful summary should omit it. (c) Faithfulness hallucination (inconsistent with the instruction), with no factual content at issue. (d) Factuality hallucination: inconsistent with real-world facts, with no source to be faithful to.
:::
:::

::: exercise Honest confidence pays under the log score {level=2}
A model reports a confidence $r$ that its answer is right and is scored $\ln r$ if right and $\ln(1 - r)$ if wrong. Show that if its true probability of being right is $p$, its expected score is maximised by reporting $r = p$. Why does this matter for training models to state their confidence?
::: solution
The expected score is $f(r) = p\ln r + (1 - p)\ln(1 - r)$. Its derivative $p/r - (1 - p)/(1 - r)$ vanishes at $r = p$, and $f''(r) = -p/r^2 - (1 - p)/(1 - r)^2 < 0$, so $r = p$ is the maximum. The log score is a proper scoring rule ([[ml-fundamentals/evaluation-metrics#def-proper]]): it rewards reporting one's true belief. A model rewarded by such a rule for its stated confidence has no incentive to exaggerate; one rewarded only for correct answers, or by human raters who prefer confident text, does.
:::
:::

::: exercise A risk–coverage curve {level=3}
For the simulated model of the listing, sort the $2000$ answers by confidence and report the risk (error rate among answered questions) at coverages $0.25$, $0.5$, $0.75$ and $1$, and the area under the risk–coverage curve. What does the curve show that the ECE does not?
::: solution
```python
import random
rng = random.Random(7)
data = []
for _ in range(2000):
    c = rng.uniform(0.3, 1.0)
    data.append((c, rng.random() < c**1.6))        # same simulated model as before

data.sort(key=lambda t: -t[0])                     # most confident first
n = len(data); errors = 0; aurc = 0.0
for i, (c, y) in enumerate(data, 1):
    errors += not y
    aurc += errors / i / n                         # average risk over all coverages
    if i in (n//4, n//2, 3*n//4, n):
        print(f"coverage {i/n:.2f}  threshold {c:.3f}  risk (error rate) {errors/i:.3f}")
print(f"area under the risk-coverage curve {aurc:.3f}")
```

```text
coverage 0.25  threshold 0.819  risk (error rate) 0.148
coverage 0.50  threshold 0.643  risk (error rate) 0.280
coverage 0.75  threshold 0.464  risk (error rate) 0.386
coverage 1.00  threshold 0.300  risk (error rate) 0.485
area under the risk-coverage curve 0.266
```

Answering only the most confident quarter cuts the error rate from $48.5\%$ to $14.8\%$. The curve measures how well confidence *ranks* answers — what selective prediction needs — while the ECE measures whether the confidence *values* are right. This model is overconfident (ECE $0.128$) but its confidence still ranks well; recalibration would fix the values, change the thresholds printed, and leave the risk at each coverage unchanged.
:::
:::

::: exercise Designing an abstaining assistant {level=3}
Design an evaluation and decision procedure for a medical-information assistant that should answer from a vetted document collection and otherwise abstain. Specify what is measured, how the abstention threshold is set, and how you would check that the assistant does not simply abstain on everything.
::: solution
Build a labelled set of questions of three kinds: answerable from the collection, unanswerable from it (but plausible), and out of scope. For each response record whether it answered or abstained, whether an answer was correct and faithful to its cited passages (checked by experts or a validated judge), and its confidence score (for instance semantic entropy combined with a retrieval-support score). Choose the cost of a wrong answer relative to an abstention with domain experts — say $\lambda = 9$, giving a threshold of $0.9$ by [[#prop-answer]] — and set the threshold on a validation split so that the measured risk at that threshold meets the target; confirm on a held-out split. Report risk and coverage separately for answerable questions (coverage there must stay high, which guards against abstaining on everything) and the abstention rate on unanswerable ones (which should be near $1$). Monitor both after deployment, since the question distribution and the collection change.
:::
:::
