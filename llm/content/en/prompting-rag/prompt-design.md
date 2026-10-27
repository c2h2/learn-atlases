A prompt is a program written in natural language for an interpreter whose behaviour nobody fully specifies. Like a program, it has parts with distinct jobs — an instruction, context, examples, the input, a description of the output — and like a program it can be tested, measured and improved. Unlike a program, small changes that look irrelevant to a human reader (a colon instead of a newline, the order of two paragraphs) can change its output substantially, and a change that helps one model can hurt another.

This chapter treats prompt design as engineering. It names the components of a prompt and the conversation format in which instruction-tuned models receive them, collects the techniques with solid evidence behind them — clear instructions, chosen examples, chain-of-thought and self-consistency — and the position effects that decide where information should go. It then shows how to compare prompts with the statistical care of any other experiment, and closes with prompt injection: why text supplied by others can act as instructions, and how systems are defended against it.

## The anatomy of a prompt {#sec-anatomy}

::: definition Prompt components {#def-components}
A **prompt** is the full token sequence a model conditions on before it generates. Its components are, in any order and each optional:

- an **instruction**: what to do, for whom, with which constraints;
- **context**: material the model needs but does not know — documents, data, the state of a conversation;
- **demonstrations**: input–output examples ([[prompting-rag/in-context-learning#def-kshot]]);
- the **input**: the particular case to handle;
- an **output specification**: the format, length, language or schema of the answer ([[prompting-rag/structured-output]]).

A **prompt template** is a prompt with slots, such as `{document}` and `{question}`, filled programmatically for each call.
:::

Instruction-tuned models ([[post-training/instruction-tuning]]) are trained on **conversations** rather than plain text. A conversation is a list of messages, each with a **role** — commonly *system* (standing instructions from the application developer), *user* (the person's turns) and *assistant* (the model's turns), with further roles for tool results in agent systems ([[agents/function-calling]]). Before the model sees it, the list is rendered by a **chat template** into one token sequence with special tokens marking where each message starts and ends, for instance

```text
<|start|>system
You are a careful assistant for a library catalogue.<|end|>
<|start|>user
Find books on medieval bridges.<|end|>
<|start|>assistant
```

where `<|start|>` and `<|end|>` stand for model-specific special tokens. The model generates the assistant's message and emits the end token when it is done. Two consequences matter for design. First, roles are a *convention learned in training*, not an enforcement mechanism: the system message has the influence that post-training gave it, and nothing more. Second, a template mismatch — rendering messages with a format the model was not trained on — silently degrades output, so always use the template that ships with the model.

::: example Where the tokens go {#ex-tokens}
A support application sends a $600$-token system message, $4$ demonstrations of $150$ tokens, a retrieved document of $1200$ tokens and a $50$-token user question, and allows $400$ output tokens. What fraction of the input is the user's question? If the application handles $200{,}000$ requests a day, how many input tokens a day are the fixed system message and demonstrations?
::: solution
Input: $600 + 600 + 1200 + 50 = 2450$ tokens, of which the question is $50/2450 = 2.0\%$. The fixed part is $1200$ tokens per request, $1200\cdot200{,}000 = 2.4\times10^8$ tokens a day. Fixed prefixes are where prompt caching pays off ([[inference/kv-cache]]): if the model's keys and values for the shared prefix are reused, its cost is paid far less often. The arithmetic also shows why shortening a long system message is worth testing.
:::
:::

## Instructions {#sec-instructions}

Most failures of a prompt are failures of specification: the model did something reasonable that was not what the writer wanted. The remedies are the ones that work for human colleagues.

- **Say what to do, not only what to avoid.** "Answer in at most three sentences" is easier to follow than "don't be verbose".
- **Give the purpose and the audience.** "Summarise for a reader who will decide whether to read the full report" constrains the content better than "summarise".
- **Separate instructions from data with clear delimiters** — headings, tags such as `<document> … </document>`, or fenced blocks — and refer to the data by its label.
- **State the output format explicitly**, with an example if the format is unusual, and say what to do in edge cases ("if the document does not contain the answer, reply `NOT FOUND`").
- **Put each requirement once, in one place.** Contradictory instructions scattered through a long prompt are resolved unpredictably.

::: example Rewriting a vague instruction {#ex-rewrite}
An application asks: *Look at this review and tell me about it.* Rewrite it so that the output can be checked automatically.
::: solution
A testable version:

```text
Classify the customer review between <review> tags.
Reply with exactly one word: positive, negative or mixed.
"mixed" means the review contains both clear praise and clear complaints.
<review>{review}</review>
```

It names the task, the label set and the meaning of the least obvious label, delimits the data, and fixes a format that a test can compare with a reference label. The original could legitimately be answered by a summary, a sentiment, or a critique of the review's writing.
:::
:::

Demonstrations remain useful after instruction tuning, mostly for format and for tasks that are hard to describe but easy to show. The evidence of [[prompting-rag/in-context-learning#sec-what-matters]] applies: their format and label coverage matter at least as much as their labels, and choosing demonstrations similar to the input helps.

## Chain-of-thought {#sec-cot}

Some questions need intermediate steps. A Transformer computes each token with a fixed number of layers; asked to produce an answer immediately, it has only that fixed depth of computation for a multi-step problem. Asked to write the steps first, each step becomes part of the context for the next, and the model can spend as many forward passes as the reasoning needs.

::: definition Chain-of-thought prompting {#def-cot}
**Chain-of-thought (CoT) prompting** elicits a sequence of intermediate reasoning steps before the final answer, either with demonstrations whose outputs contain worked reasoning (**few-shot CoT**) or with an instruction that asks for reasoning (**zero-shot CoT**). The final answer is extracted from the end of the generated text.
:::

Wei et al. (2022) introduced few-shot CoT. On the GSM8K benchmark of grade-school mathematics word problems, the 540-billion-parameter PaLM model solved $17.9\%$ of problems with standard few-shot prompting and $56.9\%$ with chain-of-thought demonstrations; the gains were large only for the largest models they tested, and small models sometimes did worse. Kojima et al. (2022) found that simply appending *Let's think step by step* raised one instruction-following model's zero-shot accuracy on GSM8K from $10.4\%$ to $40.7\%$. Theoretical work supports the computational view: Feng et al. (2023) and Merrill and Sabharwal (2024) proved that, under their formal assumptions, Transformers generating intermediate steps can solve classes of problems that a fixed-depth Transformer answering directly cannot.

Two caveats belong next to these numbers. The written reasoning is not guaranteed to be the reason for the answer: Turpin et al. (2023) biased few-shot prompts so that the correct option was always *(A)*, and models' explanations rationalised the biased answers without ever mentioning the bias. And by 2026 many models are trained to reason at length before answering, so explicit CoT prompts often add little to them. [[reasoning/chain-of-thought]] covers reasoning models and [[reasoning/faithfulness-limits]] the faithfulness question.

::: example The price of thinking {#ex-cot-cost}
A model answers a question in $20$ tokens directly, or in $350$ tokens with chain-of-thought. Output tokens are generated one at a time, at $50$ tokens per second for this deployment. How do the latency and output-token cost change?
::: solution
Latency of generation rises from $20/50 = 0.4$ s to $350/50 = 7$ s, and the output-token count by a factor of $17.5$. Whether this is worth it depends on the task: for arithmetic word problems, the accuracy difference above is large; for retrieving a fact, CoT usually adds cost without benefit. Measure both on your task.
:::
:::

## Self-consistency {#sec-self-consistency}

Chain-of-thought produces one reasoning path. Sampling several paths at a positive temperature ([[inference/decoding-sampling]]) and taking the most common final answer works better, an idea Wang et al. (2023) called **self-consistency**: different correct paths tend to arrive at the same answer, while errors scatter.

::: definition Self-consistency {#def-self-consistency}
Sample $n$ outputs independently from the model for the same prompt, extract the final answer $a_j$ from each, and return the **plurality** answer $\hat a = \arg\max_a\ \lvert\{j : a_j = a\}\rvert$, breaking ties at random.
:::

When does voting help? Only if the correct answer is the *most probable* single answer, which is weaker than requiring it to have probability above one half.

::: proposition Plurality voting converges to the mode {#prop-plurality}
Let the extracted answer of one sample have distribution $\pi$ over a finite set of answers, with a unique mode $a^* = \arg\max_a\pi(a)$, and let the $n$ samples be independent. Then the probability that self-consistency returns $a^*$ tends to $1$ as $n\to\infty$. If $\pi(a^*)$ is not the largest probability, it tends to $0$.
:::

::: proof
Let $\hat\pi_n(a)$ be the fraction of samples with answer $a$. By the law of large numbers $\hat\pi_n(a)\to\pi(a)$ with probability one for each of the finitely many answers. Let $\delta = \pi(a^*) - \max_{a\ne a^*}\pi(a) > 0$. Once every $\hat\pi_n(a)$ is within $\delta/2$ of $\pi(a)$, which happens for all large $n$ with probability one, $\hat\pi_n(a^*) > \pi(a^*) - \delta/2\ge\pi(a) + \delta/2 > \hat\pi_n(a)$ for every $a\ne a^*$, so the vote returns $a^*$. If instead some $a\ne a^*$ has $\pi(a) > \pi(a^*)$, the same argument shows that eventually $\hat\pi_n(a) > \hat\pi_n(a^*)$, so the vote returns $a^*$ with probability tending to $0$.
:::

With two possible outcomes, right or wrong, the rate is explicit. If each sample is correct with probability $p > 1/2$, the number of correct samples $X$ is binomial, and Hoeffding's inequality bounds the probability that at most half are correct:

$$
\Prob\big(X\le n/2\big)\le\exp\!\big(-2n(p - \tfrac12)^2\big).
$$ {#eq-hoeffding}

::: example Five samples {#ex-vote}
Each sampled reasoning path reaches the correct answer with probability $0.6$, independently, and every wrong path gives some wrong answer. What is the probability that a majority of $5$ samples is correct? What does [[#eq-hoeffding]] guarantee?
::: solution
The majority is correct when at least $3$ samples are:

$$
\textstyle\sum_{k=3}^{5}\binom5k0.6^k0.4^{5-k} = 0.3456 + 0.2592 + 0.07776 = 0.68256.
$$

So voting raises accuracy from $0.6$ to $0.683$. The Hoeffding bound gives an error probability of at most $e^{-2\cdot5\cdot0.01} = 0.905$, which is true but useless at $n = 5$; it becomes informative only for large $n$ (at $n = 101$, at most $e^{-2.02} = 0.13$). In practice wrong answers often disagree with each other, so the plurality is correct even more often than the majority computation suggests.
:::
:::

::: widget distribution
dist: binomial
params: n=5, p=0.6
a: 3
b: 5
caption: The number of correct samples among $n$ independent reasoning paths, each correct with probability $p$. The shaded bars, $3$ to $5$ correct out of $5$, are the cases in which majority voting is right: probability $0.683$ at $p = 0.6$, as in [[#ex-vote]]. Increase $n$ (keeping the shaded range above $n/2$) and the probability grows towards $1$; set $p$ below $0.5$ and voting makes things worse.
:::

::: example A close competitor {#ex-competitor}
A model's sampled answers are correct with probability $0.4$; one specific wrong answer has probability $0.35$ and other wrong answers $0.25$ in total. A second model's answers are correct with probability $0.4$ and three different wrong answers have probability $0.2$ each. Exact enumeration gives the probability that plurality voting is correct:

| samples $n$ | $1$ | $3$ | $5$ | $11$ | $25$ | $51$ |
|---|---|---|---|---|---|---|
| close competitor $(0.4, 0.35, 0.25)$ | $0.400$ | $0.422$ | $0.443$ | $0.493$ | $0.563$ | $0.636$ |
| spread errors $(0.4, 0.2, 0.2, 0.2)$ | $0.400$ | $0.448$ | $0.509$ | $0.635$ | $0.799$ | $0.928$ |

Explain the difference.
::: solution
Both models have the correct answer as the unique mode, so by [[#prop-plurality]] both converge to $1$. The rate depends on the margin $\delta$ between the mode and the runner-up: $0.05$ for the first model, $0.2$ for the second. With a close competitor, many samples are needed before the vote reliably separates the two leading answers; when errors are scattered, a few samples suffice. Wang et al. report gains that saturate after a few dozen samples on their benchmarks — consistent with real error distributions lying between these cases, and with samples from one model being positively correlated, which [[#prop-plurality]]'s independence assumption ignores.
:::
:::

Wang et al. found self-consistency improved chain-of-thought accuracy on GSM8K by $17.9$ percentage points over greedy decoding of a single path, in their main setting. It costs $n$ times the generation, it needs answers that can be compared for equality (a number, an option letter), and for free-form answers it needs a way to decide that two answers mean the same thing — a problem that reappears in [[prompting-rag/hallucination]].

::: quiz
Self-consistency samples $n$ reasoning paths and takes the plurality answer. In which case does increasing $n$ eventually make the answer *worse* than a single sample?
- [ ] The correct answer has probability $0.4$ and the wrong answers are spread thinly.
- [x] The correct answer has probability $0.4$ and one particular wrong answer has probability $0.45$.
- [ ] The correct answer has probability $0.6$.
- [ ] The samples are generated at a high temperature.
::: solution
By [[#prop-plurality]] the vote converges to the most probable answer. If a single wrong answer is more probable than the correct one, the vote converges to it, and its accuracy falls from $0.4$ towards $0$. A thinly spread set of wrong answers does no harm, because the correct answer is still the mode.
:::
:::

## Where information goes: position effects {#sec-position}

Long prompts raise a question that short ones do not: does the model use all of its context equally? Liu et al. (2024) tested this with multi-document question answering: a question, $10$ to $30$ retrieved passages of which exactly one contained the answer, and the position of that passage varied. Accuracy was highest when the relevant passage came first or last and lowest when it was in the middle — a **U-shaped** curve that they called **lost in the middle**. In some settings a model given $20$ passages with the answer in the middle did worse than the same model answering with no passages at all. The effect appeared in every model they tested in 2023, including ones designed for long contexts, and in a synthetic task of retrieving a value by its key from a list of key–value pairs.

Models have improved on simple long-context retrieval since, and synthetic "needle in a haystack" tests are now routinely passed; but tasks that require using, combining or reasoning over information spread across a long context still degrade with length and position in evaluations as of 2026 ([[inference/long-context]]). The practical rules are:

- put the instruction at the beginning, and for long contexts repeat the key requirement just before the input;
- place the most relevant documents at the beginning or end of a block of context, not in the middle ([[prompting-rag/retrieval-augmented-generation]] applies this to reranked passages);
- prefer shorter, more relevant context to longer context with the answer somewhere in it.

::: warning More context is not free
It is tempting to paste everything that might be relevant into a long context window and let the model sort it out. Irrelevant material is not neutral: it costs tokens and latency, it can distract the model (Shi et al., 2023, showed that adding irrelevant sentences to arithmetic problems markedly lowered accuracy), and relevant passages placed in the middle are used less. Retrieval and selection are part of prompt design.
:::

## Prompt engineering as an experimental discipline {#sec-testing}

Sclar et al. (2024) varied only the *formatting* of few-shot prompts — separators, casing, spacing between fields, choices that do not change the meaning — and found accuracy differences of up to $76$ points for one open model on one task, with the best format differing between models. The lesson is that a prompt's quality is an empirical quantity: you cannot read it off the prompt, and it must be measured on data.

::: algorithm Iterating on a prompt {#alg-prompt-loop}
1. **Define the task and the metric** — exact match against a label, a schema check, a rubric score — before writing the prompt.
2. **Build an evaluation set** of representative inputs with reference outputs, including the hard and the rare cases; keep a held-out part you do not look at while iterating.
3. **Write a baseline prompt** and evaluate it; read the failures, not only the score.
4. **Change one thing** — an instruction, a demonstration, the order, the format — and re-evaluate on the same items.
5. **Compare with a paired test** and keep the change only if the improvement is larger than the noise.
6. Repeat; at the end, confirm on the held-out set, and re-run the evaluation whenever the model changes.
:::

Because both prompts are evaluated on the *same* items, the comparison is paired, and the right test looks only at the items on which they disagree: McNemar's test ([[ml-fundamentals/evaluation-metrics#prop-mcnemar]]).

::: example Is the new prompt better? {#ex-mcnemar}
On $200$ test items, prompt A is correct on $142$ ($71\%$) and prompt B on $152$ ($76\%$). B is right on $35$ items where A is wrong, and A on $25$ where B is wrong. Is B significantly better at the $5\%$ level?
::: solution
The discordant counts are $b = 25$ and $c = 35$ (and $152 - 142 = 35 - 25$, as it must be). McNemar's statistic is $(b - c)^2/(b + c) = 100/60 = 1.67 < 3.84$, so the difference is not significant: a five-point gain on $200$ items is within the noise when $60$ items changed their outcome. To detect a difference of this size reliably you would need more items, or a prompt change that alters fewer outcomes in the wrong direction.
:::
:::

Generation with sampling adds a second source of noise — the same prompt on the same item can give different outputs — so evaluate at the temperature you deploy, or with several samples per item. Automatic methods search the space of prompts against such a metric: Zhou et al. (2023) had a model propose and score candidate instructions, Yang et al. (2024) used a model as an optimiser over prompts given their past scores, and frameworks such as DSPy (Khattab et al., 2024) compile pipelines of model calls by tuning their instructions and demonstrations against a metric. All of them overfit to the evaluation set like any other optimiser, which is why step 6 of [[#alg-prompt-loop]] holds data back.

## Prompt injection {#sec-injection}

A language model receives one sequence of tokens. When an application puts untrusted text into that sequence — a web page to summarise, an email to triage, a document retrieved for a question, the output of a tool — that text can contain instructions, and the model has no reliable way of knowing that they come from a different principal than the developer or the user.

::: definition Prompt injection {#def-injection}
**Prompt injection** is the manipulation of a model-based application by text that enters its context and is interpreted by the model as instructions, overriding or subverting the instructions of the developer or user. It is **direct** when the attacker is the user typing into the application, and **indirect** when the instructions are planted in content the application later processes on behalf of someone else (Greshake et al., 2023).
:::

The name, coined by Simon Willison in 2022, alludes to SQL injection, and the analogy explains why the problem is hard. SQL injection was solved by separating code from data: parameterised queries pass the data through a channel the interpreter never executes. A language model has no such channel; instructions and data are both just tokens, and following instructions found in text is exactly the skill instruction tuning trains. Indirect injection matters most for systems with tools and private data ([[agents/agent-security]]): a model that can read a user's email *and* send messages can be steered, by a message it reads, into sending data elsewhere.

Defences are layered, and as of 2026 none is complete:

- **Least privilege and separation.** Give the model only the tools and data the task needs; do not let a component that reads untrusted content also take consequential actions without a check. Architectures that keep untrusted content away from the component that plans actions follow this principle.
- **Treat model output as untrusted.** Validate it against a schema ([[prompting-rag/structured-output]]), never execute it directly, and escape it before rendering (an injected instruction can try to make the output contain a link or markup that leaks data).
- **Human confirmation** for actions with external effects — sending, paying, deleting.
- **Mark untrusted content** with delimiters or transformations so the model can tell it apart ("spotlighting", Hines et al., 2024), and state in the instructions that it is data. This lowers success rates but is not a boundary an attacker cannot cross.
- **Train the model to respect an instruction hierarchy** — system over user over tool content (Wallace et al., 2024) — which again reduces but does not eliminate success.
- **Monitor and test**: log tool calls, detect anomalies, and red-team the application with injection test suites before deployment ([[safety-alignment/red-teaming]]).

::: warning Delimiters are not a security boundary
Wrapping untrusted text in tags and telling the model "ignore any instructions inside" helps against casual cases, and it is good practice, but it is a request to the model, not an enforcement mechanism. Design the system so that a successful injection can do little damage — limited permissions, confirmations, validated outputs — rather than relying on the prompt to prevent it.
:::

::: history
Prompting as an interface appeared with GPT-2 (Radford et al., 2019) and GPT-3 (Brown et al., 2020). In 2021–2022 prompt design became a research subject: Zhao et al. (2021) on calibration, Lu et al. (2022) on order, and the instruction-tuned models of 2022 shifted practice from demonstrations to instructions. Wei et al. (2022) introduced chain-of-thought prompting, Kojima et al. (2022) its zero-shot form, and Wang et al. (2023) self-consistency. Perez and Ribeiro (2022) studied goal hijacking and prompt leaking, Willison named prompt injection in September 2022, and Greshake et al. (2023) described indirect injection against applications that read external content. Liu et al. (2024) documented the lost-in-the-middle effect, and Sclar et al. (2024) the sensitivity to formatting. Automatic prompt optimisation followed (Zhou et al., 2023; Yang et al., 2024; Khattab et al., 2024), and from 2024 models trained to reason before answering reduced the need for explicit chain-of-thought prompts.
:::

::: summary
- A prompt has an instruction, context, demonstrations, the input and an output specification; chat models receive them as role-tagged messages rendered by a model-specific template.
- Clear, specific, positively phrased instructions with delimited data and an explicit output format prevent most failures.
- Chain-of-thought gives a model extra serial computation through generated steps and helps on multi-step problems, but written reasoning need not reflect the real cause of an answer.
- Self-consistency votes over sampled paths; the vote converges to the most probable answer, so it helps only when the correct answer is the mode, and fastest when errors scatter.
- Models use the beginning and end of a long context better than the middle; place important material accordingly and keep context relevant.
- Prompt quality is empirical: evaluate on a fixed set, change one thing at a time, compare prompts with a paired test, and hold data back.
- Prompt injection arises because instructions and data share one channel; defend with least privilege, validated outputs, confirmations, marking of untrusted text, hierarchy training and testing — none of them complete.
:::

## Exercises

::: exercise Majority of three {level=1 check="0.784"}
Each sampled path is correct with probability $0.7$, independently. What is the probability that a majority of $3$ samples is correct?
::: solution
$\binom32 0.7^2\cdot0.3 + 0.7^3 = 0.441 + 0.343 = 0.784$.
:::
:::

::: exercise A Hoeffding bound {level=1 check="0.018"}
With $p = 0.7$ and $n = 50$ samples, what upper bound does [[#eq-hoeffding]] give on the probability that the majority is wrong? Round to three decimal places.
::: solution
$\exp(-2\cdot50\cdot0.2^2) = e^{-4} = 0.0183$, so about $0.018$.
:::
:::

::: exercise A significant change? {level=1 check="5.76"}
Two prompts are evaluated on the same items; prompt B is right on $24$ items where A is wrong, and A on $10$ where B is wrong. Compute McNemar's statistic to two decimal places and decide at the $5\%$ level.
::: solution
$(10 - 24)^2/(10 + 24) = 196/34 = 5.76 > 3.84$: B is significantly better at the $5\%$ level.
:::
:::

::: exercise The cost of voting {level=2 check="3.2e9"}
A service answers one million questions with self-consistency over $8$ chain-of-thought samples of $400$ output tokens each. How many output tokens does it generate? Suggest one way to reduce the number without giving up voting entirely.
::: solution
$10^6\cdot8\cdot400 = 3.2\times10^9$ output tokens. Adaptive sampling reduces it: draw samples one or two at a time and stop as soon as one answer has a clear lead (for instance, the first three samples agree), so easy questions use few samples and only contested ones use all eight.
:::
:::

::: exercise A close vote {level=2 check="0.422"}
Sampled answers are correct with probability $0.4$, a particular wrong answer has probability $0.35$, and a second wrong answer $0.25$. With $n = 3$ samples and ties broken uniformly at random, compute the probability that the plurality answer is correct.
::: hint
The correct answer wins outright with $2$ or $3$ votes; with one vote each for all three answers it wins the tie-break with probability $1/3$.
:::
::: solution
Three correct: $0.4^3 = 0.064$. Exactly two correct: $3\cdot0.4^2\cdot0.6 = 0.288$. A three-way tie (one vote each) has probability $3!\cdot0.4\cdot0.35\cdot0.25 = 0.21$, and the correct answer wins it with probability $1/3$, contributing $0.07$. Any other outcome — two or three votes for a wrong answer — loses. Total: $0.064 + 0.288 + 0.07 = 0.422$, barely above the $0.4$ of one sample, as in the table of [[#ex-competitor]].
:::
:::

::: exercise Counting formats {level=1 check="24"}
A prompt template has three formatting choices that do not change its meaning: the separator between field name and value (`:`, ` - ` or a newline), the casing of field names (as written, upper case, lower case or title case) and whether demonstrations are separated by one or two blank lines. How many formats are there, and how would you choose among them?
::: solution
$3\cdot4\cdot2 = 24$. Evaluate a sample of them (or all, if cheap) on the evaluation set and report the spread; choose a format that does well, and confirm on held-out data, since picking the best of $24$ on the same data overstates its accuracy. Sclar et al. (2024) recommend reporting performance over a range of formats rather than a single one.
:::
:::

::: exercise Proving the binary bound {level=2}
Derive [[#eq-hoeffding]] from Hoeffding's inequality for bounded variables, $\Prob\big(\bar X - \E\bar X\le -t\big)\le e^{-2nt^2}$ for the mean $\bar X$ of $n$ independent variables in $[0, 1]$. Then find the smallest $n$ for which the bound guarantees a majority error of at most $1\%$ when $p = 0.6$.
::: solution
Let $X_j\in\{0, 1\}$ indicate that sample $j$ is correct, so $\E\bar X = p$. The majority is wrong only if $\bar X\le\frac12$, that is $\bar X - p\le -(p - \frac12)$; with $t = p - \frac12 > 0$ the inequality gives $\Prob(\bar X\le\frac12)\le e^{-2n(p - 1/2)^2}$. For an error of at most $0.01$ we need $e^{-2n\cdot0.01}\le0.01$, $n\ge\ln(100)/0.02 = 230.3$, so $n = 231$ by the bound. The exact binomial probability reaches $1\%$ at a much smaller $n$ (at $n = 133$ for odd $n$), illustrating that the bound is conservative.
:::
:::

::: exercise A paired evaluation harness {level=3}
Write a plain-Python script that, given per-item correctness ($0$/$1$) of two prompts on the same items, reports both accuracies, the discordant counts, McNemar's statistic and a $95\%$ paired bootstrap interval for the difference in accuracy. Test it on $300$ simulated items whose difficulty is shared by both prompts. Why must the bootstrap resample *items* rather than the two prompts' results independently?
::: solution
```python
import random
random.seed(1)
n = 300
# simulated per-item results: item difficulty shared by both prompts (paired data)
diff = [random.random() for _ in range(n)]
a = [int(random.random() < 1.1 - d) for d in diff]        # prompt A correct?  (0/1)
b = [int(random.random() < 1.15 - d) for d in diff]       # prompt B correct?
acc_a, acc_b = sum(a)/n, sum(b)/n
b_only = sum(1 for x, y in zip(a, b) if x == 1 and y == 0)  # A right, B wrong
c_only = sum(1 for x, y in zip(a, b) if x == 0 and y == 1)  # B right, A wrong
chi2 = (b_only - c_only)**2 / (b_only + c_only)
# paired bootstrap of the accuracy difference B - A
diffs = []
for _ in range(2000):
    idx = [random.randrange(n) for _ in range(n)]
    diffs.append(sum(b[i] - a[i] for i in idx) / n)
diffs.sort()
print(f"accuracy A {acc_a:.3f}  B {acc_b:.3f}  difference {acc_b-acc_a:+.3f}")
print(f"discordant: A-only {b_only}, B-only {c_only}, McNemar chi2 = {chi2:.2f}")
print(f"95% bootstrap interval for B - A: [{diffs[49]:+.3f}, {diffs[1949]:+.3f}]")
```

```text
accuracy A 0.587  B 0.617  difference +0.030
discordant: A-only 41, B-only 50, McNemar chi2 = 0.89
95% bootstrap interval for B - A: [-0.037, +0.090]
```

The test and the interval agree: a $3$-point difference is not significant here ($0.89 < 3.84$, and the interval contains $0$). Resampling items keeps each item's pair of results together. Items vary in difficulty, so the two prompts' results are strongly correlated; resampling them independently would treat that shared variation as noise and produce an interval that is far too wide, hiding real differences.
:::
:::

::: exercise Designing against indirect injection {level=3}
An assistant reads a user's incoming email, summarises it, and can create calendar events and send replies. Describe, at the level of system design, how an instruction planted in an incoming email could cause harm, and propose a set of defences in depth. Which of them still work if the model reliably obeys the planted instruction?
::: solution
The planted text arrives in the context as data but may be followed as an instruction, so the model could be steered into an action the user did not ask for — sending a reply containing information from other emails, or creating misleading events. Defences: (1) separate the reading component from the acting component — the summariser has no tools, and actions are proposed by a component that sees only the user's request and a structured, validated summary; (2) least privilege — the assistant may draft replies but not send them, and may only email addresses already in the thread; (3) require explicit user confirmation, showing the full content and recipient, for every send or event; (4) validate outputs against a schema and strip links and markup from summaries; (5) mark email content as untrusted in the prompt and use a model trained to follow an instruction hierarchy; (6) log and rate-limit actions, and test with an injection suite before release. If the model obeys the planted instruction completely, (5) fails, but (1)–(4) and (6) still limit the damage, because they do not depend on the model's judgement. That is why the design, not the prompt, carries the security.
:::
:::

::: exercise Where to put the passage {level=2}
In a lost-in-the-middle experiment with $20$ passages, a model's accuracy is $75\%$ when the relevant passage is first, $72\%$ when it is last and $55\%$ when it is tenth; with no passages it is $58\%$. A retriever ranks the relevant passage first about half the time, and otherwise somewhere in the top $20$. Propose an ordering of the $20$ passages for the prompt, and explain why passing only the top $5$ might do better than all $20$.
::: solution
Put the highest-ranked passages at the two ends — rank $1$ first, rank $2$ last, rank $3$ second, rank $4$ second to last, and so on — so that the passages most likely to be relevant occupy the positions the model uses best, and the least likely ones the middle. Passing only the top $5$ shortens the context, so even the middle positions are close to an end, and it removes distractors; in this model a relevant passage in the middle of $20$ is worse than no passage at all ($55\%$ against $58\%$). The cost is missing the relevant passage when it is ranked below $5$; the trade-off depends on the retriever's recall at $5$ against $20$, which should be measured ([[prompting-rag/rag-evaluation]]).
:::
:::
