Give a large language model the text

```text
cheese → fromage
house → maison
book →
```

and it will very probably continue with *livre*. Nobody told it that the task is English-to-French translation, and its weights did not change: the model inferred the task from two examples in its prompt and applied it to a third. This ability is called **in-context learning**, and it changed how language models are used. Before 2020, adapting a model to a new task meant collecting labelled data and fine-tuning. Since GPT-3, a large share of applications simply write a prompt.

This chapter defines in-context learning precisely, shows how it is measured and how it is used for classification, collects the surprising experimental findings about what models actually take from their examples, and presents two theoretical models of why it works at all: in-context learning as implicit Bayesian inference, and as gradient descent carried out inside the forward pass. Both are hypotheses about idealised settings, not established accounts of what a production model does, and the chapter keeps them labelled as such.

## Prompts, demonstrations and the frozen model {#sec-definitions}

A decoder-only language model ([[transformers/architecture-families]]) defines a distribution $p_\theta(x_{t+1}\mid x_{\le t})$ over the next token. Everything it does at inference time is a computation on its context; the parameters $\theta$ are fixed. A prompt is therefore the only input channel we have, and it is worth naming its parts.

::: definition Demonstrations and $k$-shot prompts {#def-kshot}
A **task** maps inputs $x$ to outputs $y$, both written as text. A **demonstration** is a pair $(x_i, y_i)$ rendered by a fixed **template**, for instance `Review: {x}\nSentiment: {y}\n`. A **$k$-shot prompt** for a query input $x$ is the concatenation

$$
P_k(x) = I \oplus \operatorname{tmpl}(x_1, y_1) \oplus \dots \oplus \operatorname{tmpl}(x_k, y_k) \oplus \operatorname{tmpl}(x, \cdot),
$$

of an optional natural-language instruction $I$, $k$ demonstrations and the query with its output slot left open. With $k = 0$ the prompt is **zero-shot**, with $k = 1$ **one-shot**, and with a handful of demonstrations **few-shot**.
:::

::: definition In-context learning {#def-icl}
A model performs **in-context learning** (ICL) of a task when its predictions on queries, $\hat y = \arg\max_y p_\theta(y \mid P_k(x))$ or a sample from that distribution, become more accurate as demonstrations of the task are added to the prompt, with the parameters $\theta$ held fixed.
:::

The definition is behavioural. It says nothing about *how* the model uses the demonstrations, and the rest of the chapter shows that "learning" is a generous word for some of what happens. The contrast with fine-tuning is sharp:

| | fine-tuning | in-context learning |
|---|---|---|
| what changes | the weights $\theta$ | only the context |
| data needed | hundreds to millions of labelled examples | zero to a few dozen |
| cost | a training run, once | longer prompts, on every query |
| persistence | permanent until retrained | forgotten after the call |
| limit | compute and data | the context window |

The term and the systematic study come from Brown et al. (2020), who evaluated GPT-3 — a 175-billion-parameter decoder with a context window of $2048$ tokens — in exactly these three settings on several dozen benchmarks. Their central observation was empirical: the gap between zero-shot and few-shot accuracy widened with model size, so larger models made better use of their demonstrations. On some tasks few-shot GPT-3 approached fine-tuned systems of the time; on others, such as some reading-comprehension and natural-language-inference benchmarks, it stayed far behind.

::: example A demonstration budget {#ex-budget}
A classification prompt for GPT-3 has a $40$-token instruction, demonstrations of about $60$ tokens each, a $50$-token query and needs $10$ tokens for the answer. How many demonstrations fit in the $2048$-token context?
::: solution
The demonstrations may use $2048 - 40 - 50 - 10 = 1948$ tokens, and $1948/60 = 32.5$, so at most $32$ demonstrations fit. This is why Brown et al. used "as many examples as will fit", typically $10$ to $100$ depending on their length. With a context of $128{,}000$ tokens, common in 2026, the same arithmetic allows about $2000$ demonstrations — the regime that Agarwal et al. (2024) call **many-shot** in-context learning, where accuracy on many tasks keeps rising well past the few-shot range.
:::
:::

## In-context classification {#sec-classification}

The cleanest way to use a model as a classifier is not to let it write freely but to **score** each permitted label. Each label $c$ is given a verbaliser string $v(c)$ — say *positive* and *negative* — and the prediction is the label whose verbaliser the model finds most likely after the prompt:

$$
\hat c = \arg\max_c\ p_\theta\big(v(c)\ \big|\ P_k(x)\big),
$$ {#eq-label-score}

where the probability of a multi-token verbaliser is the product of its token probabilities by the chain rule. If every verbaliser is a single token, this is a softmax over the corresponding logits, restricted to the label tokens — the multinomial logistic model of [[ml-fundamentals/logistic-regression]], with a classifier that was never trained for the task.

::: example Scoring two labels {#ex-scoring}
After a sentiment prompt, the logits of the tokens *positive* and *negative* are $2.1$ and $1.3$. What does the model predict, and with what probability among the two labels?
::: solution
Restrict the softmax to the two label tokens: $p(\text{positive}) = e^{2.1}/(e^{2.1} + e^{1.3}) = 1/(1 + e^{-0.8}) = 0.690$, and $p(\text{negative}) = 0.310$. The prediction is *positive*. Other tokens the model might have written (*good*, *The*, a newline) are ignored, which is the point of scoring: the output is guaranteed to be a valid label.
:::
:::

Scoring exposes a weakness. Zhao et al. (2021) found that GPT-3's few-shot predictions are biased in systematic ways: towards the label that appears most often among the demonstrations (**majority-label bias**), towards the label of the last demonstrations (**recency bias**), and towards labels whose verbalisers are common tokens. They proposed **contextual calibration**: feed the prompt with a content-free query such as `N/A`, read off the label distribution $\mathbf{p}_{\text{cf}}$ that the model produces when there is nothing to classify, and divide it out.

::: definition Contextual calibration {#def-calibration}
Let $\mathbf{p}(x)$ be the model's distribution over the labels for query $x$ and $\mathbf{p}_{\text{cf}}$ the distribution for a content-free query with the same demonstrations. The **calibrated** prediction is

$$
q_c(x) = \frac{p_c(x)/p_{\text{cf},c}}{\sum_{c'} p_{c'}(x)/p_{\text{cf},c'}}.
$$

If the model's bias were a fixed multiplicative factor on each label, this would remove it exactly.
:::

::: example Calibration flips a prediction {#ex-calibration}
With a given set of demonstrations, the model assigns $\mathbf{p}(x) = (0.6, 0.4)$ to (*positive*, *negative*) for a query, and $\mathbf{p}_{\text{cf}} = (0.7, 0.3)$ to `N/A`. What is the calibrated prediction?
::: solution
Divide: $(0.6/0.7,\ 0.4/0.3) = (0.857,\ 1.333)$, with sum $2.190$, so $\mathbf{q} = (0.391, 0.609)$. The raw prediction was *positive*, but the model leans $70{:}30$ towards *positive* even when there is nothing to judge; relative to that baseline the query looks negative, and the calibrated prediction is *negative*. Zhao et al. reported gains of up to $30$ accuracy points on some tasks from this one correction, and much lower variance across choices of demonstrations.
:::
:::

The same study found that accuracy could vary from near chance to near the state of the art depending only on *which* demonstrations were chosen and in *what order*. Lu et al. (2022) confirmed the ordering effect: for small sets of demonstrations, some permutations gave good accuracy and others near-random, and the good orders did not transfer between models. With $k$ demonstrations there are $k!$ orders, $24$ for $k = 4$, so this is not a nuisance one can average away by hand.

::: warning "The model learned the task from my examples"
An improvement with more demonstrations does not mean the model has inferred the input–label mapping from them. Much of the gain often comes from the demonstrations showing the *format* and the *label space*, which tells the model which task it already knows to perform. To find out what your model is using, run the controls in [[#sec-what-matters]]: shuffle the labels, remove the inputs, change the format. Treat the size of a few-shot gain as a measurement about one model, one template and one set of demonstrations, not as a property of the task.
:::

## What do models take from the demonstrations? {#sec-what-matters}

If a model really learned the mapping from its demonstrations, wrong labels in the demonstrations should hurt badly. Min et al. (2022) tested exactly this on classification and multiple-choice tasks with a range of models, and found that it largely does not.

- Replacing the gold labels of the demonstrations by **random labels** from the label set reduced accuracy only slightly in most of their settings — typically by a few points, far less than the gap between zero-shot and few-shot.
- Removing the **inputs** (keeping only labels) or replacing them with random sentences from an unrelated corpus hurt more: the demonstrations matter partly because they show the distribution of inputs.
- Replacing the labels by random **English words** outside the label set hurt substantially: the demonstrations tell the model which outputs are allowed.
- Keeping the **format** — the input–label pairing structure — mattered: demonstrations with inputs only or labels only did worse than ones with both, even with wrong pairings.

Their interpretation is that, for these tasks and models, demonstrations mostly serve **task recognition**: they locate a task the model already knows, through the label space, the input distribution and the format. The input–label mapping itself is a weaker signal.

The finding is not universal, and later work refined it. Wei et al. (2023) showed that sufficiently large models *can* follow demonstrations whose labels are systematically flipped (every positive marked negative and vice versa), overriding their prior knowledge of the task, while smaller models largely ignore the flip; they also showed that large models can learn mappings to semantically unrelated labels (*foo*/*bar*). Pan et al. (2023) separated **task recognition**, which appears even in small models, from **task learning** — acquiring a new input–label mapping — which improves with scale and number of demonstrations. The fair summary, as of 2026, is that both happen, in proportions that depend on the model, the task and how familiar it is.

::: quiz
Min et al. (2022) replaced the gold labels of few-shot demonstrations by random labels from the same label set. What did they mainly find for classification and multiple-choice tasks?
- [ ] Accuracy dropped to chance, showing that models learn the mapping from the demonstrations.
- [x] Accuracy dropped only slightly, suggesting that demonstrations mostly convey the label space, input distribution and format.
- [ ] Accuracy rose, because random labels act as regularisation.
- [ ] The result depended only on the number of demonstrations, not on the labels.
::: solution
The drop was small in most of their settings, much smaller than the gain from zero-shot to few-shot. Removing the inputs or the label space hurt more. Later work (Wei et al., 2023) found that the largest models are more sensitive to flipped labels, so the conclusion is about degree, not absolutes.
:::
:::

## A model of in-context learning as Bayesian inference {#sec-bayes}

Why should a network trained only to predict the next token of web text become able to do tasks specified by examples? Xie et al. (2022) proposed an explanation in an idealised setting. Suppose the pretraining text is generated by a mixture of latent **concepts** $\theta$ — a topic, a format, a task, a style — so that each document is produced by first drawing a concept from a prior $p(\theta)$ and then text from $p(\text{text}\mid\theta)$. A model that predicts the next token optimally on such data must compute the **posterior predictive**

$$
p(y \mid \text{prompt}) = \int p(y \mid \text{prompt}, \theta)\, p(\theta \mid \text{prompt})\, d\theta,
$$ {#eq-predictive}

so it must implicitly infer which concept generated the text so far. A few-shot prompt is a short document whose demonstrations all share a concept; each one is evidence for that concept, and as evidence accumulates the posterior concentrates and the predictive behaves as if the model "knew" the task.

::: definition Implicit Bayesian inference model {#def-bayes-icl}
In the **implicit Bayesian inference** model of ICL, a prompt of demonstrations $(x_1, y_1), \dots, (x_k, y_k)$ is treated as data drawn from $p(x, y\mid\theta^*)$ for an unknown concept $\theta^*$ in a set $\Theta$ with prior $p(\theta)$, and the model's prediction for a query is the posterior predictive [[#eq-predictive]] under the posterior

$$
p(\theta\mid D_k) \propto p(\theta)\prod_{i=1}^{k} p(x_i, y_i\mid\theta).
$$
:::

The simplest consequence is that the posterior picks out the right concept quickly. Take a finite set of concepts and demonstrations that really are independent draws from $\theta^*$.

::: proposition Posterior concentration {#prop-concentration}
Let $\Theta$ be finite, $p(\theta^*) > 0$, and let $D_k$ consist of $k$ independent draws from $p(\cdot\mid\theta^*)$. If $\theta\ne\theta^*$ has $\operatorname{KL}\big(p(\cdot\mid\theta^*)\,\Vert\,p(\cdot\mid\theta)\big) = \Delta > 0$, then with probability one

$$
\frac1k\log\frac{p(\theta\mid D_k)}{p(\theta^*\mid D_k)} \longrightarrow -\Delta \qquad (k\to\infty),
$$

so the posterior probability of every wrong concept with $\Delta > 0$ tends to zero exponentially fast in the number of demonstrations.
:::

::: proof
By Bayes' theorem ([[math-for-ml/probability#thm-bayes]]) the normalising constant cancels in the ratio:

$$
\log\frac{p(\theta\mid D_k)}{p(\theta^*\mid D_k)} = \log\frac{p(\theta)}{p(\theta^*)} + \sum_{i=1}^{k}\log\frac{p(x_i, y_i\mid\theta)}{p(x_i, y_i\mid\theta^*)}.
$$

Divide by $k$. The first term is a constant divided by $k$ and tends to $0$. The sum is an average of $k$ independent, identically distributed terms whose expectation under $\theta^*$ is $\E_{\theta^*}\!\big[\log p(\cdot\mid\theta) - \log p(\cdot\mid\theta^*)\big] = -\operatorname{KL}\big(p(\cdot\mid\theta^*)\Vert p(\cdot\mid\theta)\big) = -\Delta$ ([[math-for-ml/information-theory#def-kl]]). By the strong law of large numbers the average converges to $-\Delta$ with probability one. Hence the log-odds of $\theta$ against $\theta^*$ fall like $-k\Delta$, and $p(\theta\mid D_k)\le p(\theta\mid D_k)/p(\theta^*\mid D_k)\to0$.
:::

::: example Three demonstrations {#ex-posterior}
A model weighs two concepts for a prompt — *sentiment* and *topic* classification — with equal prior probability. Each demonstration is three times as likely under *sentiment* as under *topic*. What is the posterior probability of *sentiment* after $k = 0, 1, 2, 3$ demonstrations?
::: solution
The posterior odds are the prior odds $1$ multiplied by $3$ per demonstration: $3^k$. The probability is $3^k/(3^k + 1)$: $0.5$, $0.75$, $0.9$ and $27/28 = 0.964$. A handful of demonstrations is enough to make one concept dominant, which matches the observation that most of the few-shot gain arrives with the first few examples.
:::
:::

::: widget plot
f: 1/(1 + ((1 - p)/p)*r^(-x))
x: 0, 12
y: 0, 1.05
sliders: p=0.5:0.01:0.99:0.01; r=3:1.05:6:0.05
labels: $p(\theta^*\mid D_k)$ after $k$ demonstrations
points: 0,0.5; 1,0.75; 2,0.9; 3,0.9643
caption: Posterior probability of the true concept against the number of demonstrations $k$, for a prior $p$ and a likelihood ratio $r$ per demonstration. The marked points are [[#ex-posterior]] ($p = 0.5$, $r = 3$). A prior that disfavours the true concept (small $p$, as for an unusual task) delays the rise; weakly informative demonstrations ($r$ close to $1$) make it slow. In the Bayesian model both explain why some tasks need many more demonstrations than others.
:::

The model explains several observations at once. Demonstrations help even with random labels, because the inputs and the format are themselves evidence for the concept. Unfamiliar formats hurt, because they make the prompt unlike any pretraining document. And there is a characteristic failure: Xie et al. noted that the concatenation of demonstrations is itself unnatural text — the boundaries between examples are transitions that never occur within one pretraining document — and showed in a synthetic dataset (GINC, generated from a mixture of hidden Markov models) that small Transformers nevertheless learn in context, with accuracy rising in the number and length of demonstrations.

A clean special case is a model that sees coin flips. If the hidden concept is the bias $\pi$ of a coin, with a uniform prior, and the context contains $h$ heads in $n$ flips, the posterior is $\operatorname{Beta}(1 + h, 1 + n - h)$ and the Bayes-optimal probability that the next flip is heads is $(h+1)/(n+2)$, Laplace's rule of succession. Transformers trained on sequences of flips from randomly drawn coins learn to output close to this predictive, which is in-context learning of a one-parameter task in its purest form.

::: widget bayes
mode: beta
a: 1
b: 1
successes: 7
trials: 10
caption: An ideal in-context learner of coin flips. The prior over the coin's bias is uniform, $\operatorname{Beta}(1, 1)$; after a context of $7$ heads in $10$ flips the posterior is $\operatorname{Beta}(8, 4)$, and the predicted probability of heads for the next flip is its mean, $8/12 = 0.667$. Add trials at the same rate: the posterior narrows, just as the posterior over concepts in [[#prop-concentration]] concentrates as demonstrations are added.
:::

What the model does *not* establish is that a real LLM computes such a posterior. It is a statement about what an optimal predictor of idealised data would do; real pretraining data are not a mixture of a small number of tidy concepts, and real models are not optimal. It is best read as an explanation of *why the training objective rewards* in-context learning.

## A model of in-context learning as gradient descent {#sec-gd}

A second line of work asks a mechanistic question: what algorithm could the forward pass of a Transformer run on the demonstrations? Garg et al. (2022) trained Transformers from scratch on prompts of the form $(\mathbf{x}_1, y_1, \dots, \mathbf{x}_k, y_k, \mathbf{x})$, where each prompt uses a fresh random linear function $y = \mathbf{w}^\top\mathbf{x}$, and found that they predict $y$ for the query almost as well as least squares fitted to the demonstrations — so they learn, in context, a regression algorithm. Von Oswald et al. (2023) and Akyürek et al. (2023) asked which algorithm. The simplest answer is that one layer of linear attention can carry out one step of gradient descent exactly.

::: definition Linear self-attention {#def-linear-attention}
**Linear attention** drops the softmax from [[transformers/self-attention#def-attention]]: for queries $\mathbf{q}$, keys $\mathbf{k}_i$ and values $\mathbf{v}_i$, its output is $\sum_i \mathbf{v}_i\,(\mathbf{k}_i^\top\mathbf{q})$, possibly scaled.
:::

::: proposition One attention layer, one gradient step {#prop-gd}
Let the demonstrations be $(\mathbf{x}_i, y_i)$, $i = 1, \dots, k$, with $\mathbf{x}_i\in\R^d$, and consider least squares $L(\mathbf{w}) = \frac12\sum_i (y_i - \mathbf{w}^\top\mathbf{x}_i)^2$. One step of gradient descent from $\mathbf{w}_0 = \mathbf{0}$ with learning rate $\eta$ predicts, for a query $\mathbf{x}$,

$$
\hat y_{\text{GD}} = \mathbf{w}_1^\top\mathbf{x} = \eta\sum_{i=1}^{k} y_i\,\mathbf{x}_i^\top\mathbf{x}.
$$

This equals the output of linear attention with keys $\mathbf{k}_i = \mathbf{x}_i$, values $v_i = \eta y_i$ and query $\mathbf{q} = \mathbf{x}$.
:::

::: proof
The gradient is $\nabla L(\mathbf{w}) = -\sum_i (y_i - \mathbf{w}^\top\mathbf{x}_i)\mathbf{x}_i$, which at $\mathbf{w}_0 = \mathbf{0}$ is $-\sum_i y_i\mathbf{x}_i$. So $\mathbf{w}_1 = \mathbf{w}_0 - \eta\nabla L(\mathbf{w}_0) = \eta\sum_i y_i\mathbf{x}_i$ and $\mathbf{w}_1^\top\mathbf{x} = \eta\sum_i y_i\,\mathbf{x}_i^\top\mathbf{x}$. Linear attention with the stated keys, values and query outputs $\sum_i (\eta y_i)(\mathbf{x}_i^\top\mathbf{x})$, the same sum. If each token holds the pair $\mathbf{z}_i = (\mathbf{x}_i, y_i)$, the keys, values and query are linear functions of the tokens — projections onto the $\mathbf{x}$-coordinates and the $y$-coordinate — so they are produced by suitable matrices $W_K$, $W_V$ and $W_Q$.
:::

With general projection matrices the same layer computes $\eta\,\mathbf{x}^\top W\sum_i y_i\mathbf{x}_i$ for a learned matrix $W$, a **preconditioned** gradient step. Von Oswald et al. showed that Transformers with linear attention trained on regression prompts converge to weights that implement this construction, that deeper stacks behave like several steps of a gradient-based method, and that trained models with softmax attention behave similarly on the same synthetic task. Akyürek et al. (2023) found that, depending on depth and width, trained models match gradient descent, ridge regression or exact least squares.

::: example One step by hand {#ex-gd-step}
Demonstrations $\mathbf{x}_1 = (1, 0)$, $y_1 = 2$; $\mathbf{x}_2 = (0, 1)$, $y_2 = -1$; $\mathbf{x}_3 = (1, 1)$, $y_3 = 1$; learning rate $\eta = 0.5$; query $\mathbf{x} = (2, 1)$. Compute the one-step prediction both ways.
::: solution
Gradient descent: $\sum_i y_i\mathbf{x}_i = (2, 0) + (0, -1) + (1, 1) = (3, 0)$, so $\mathbf{w}_1 = (1.5, 0)$ and $\hat y = 1.5\cdot2 + 0\cdot1 = 3$. Linear attention: the key–query scores are $\mathbf{x}_i^\top\mathbf{x} = 2, 1, 3$, the values $\eta y_i = 1, -0.5, 0.5$, and the output is $1\cdot2 - 0.5\cdot1 + 0.5\cdot3 = 3$. The attention scores measure how similar each demonstration is to the query, and the output is a similarity-weighted vote of their labels.
:::
:::

The equivalence is easy to check numerically on a random task:

```python
import random
random.seed(0)
d, n, eta = 3, 20, 0.05
w_true = [random.gauss(0, 1) for _ in range(d)]
X = [[random.gauss(0, 1) for _ in range(d)] for _ in range(n)]   # n x d context inputs
y = [sum(a*b for a, b in zip(w_true, x)) for x in X]             # n targets
xq = [random.gauss(0, 1) for _ in range(d)]                      # query input
# (a) one gradient step from w = 0 on L(w) = 1/2 sum_i (y_i - w.x_i)^2
grad = [-sum(y[i]*X[i][j] for i in range(n)) for j in range(d)]  # dL/dw at w = 0
w1 = [-eta*g for g in grad]
pred_gd = sum(a*b for a, b in zip(w1, xq))
# (b) linear attention: keys x_i, values y_i, query x_q, no softmax, scale eta
pred_attn = eta*sum(y[i]*sum(a*b for a, b in zip(X[i], xq)) for i in range(n))
print("one GD step :", round(pred_gd, 6))
print("linear attn :", round(pred_attn, 6))
print("true y_q    :", round(sum(a*b for a, b in zip(w_true, xq)), 6))
```

```text
one GD step : 1.781445
linear attn : 1.781445
true y_q    : 1.389016
```

The two predictions agree to every printed digit. Neither equals the true value, because one gradient step from zero is far from the least-squares solution; that is the reason deeper models, which can take more steps, regress better in context.

::: warning What the gradient-descent result does not show
[[#prop-gd]] is a construction: it shows that attention *can* implement a gradient step, and experiments show that small models trained on synthetic regression *do*. It does not show that a pretrained LLM translating French or classifying sentiment runs gradient descent in its forward pass. Shen et al. (2024) compared in-context learning with gradient-based fine-tuning in real models and found the correspondence weak under realistic conditions. Use the result as a model of what attention can compute, not as a description of every in-context behaviour.
:::

Mechanistic interpretability offers a third, more concrete piece of the picture. Olsson et al. (2022) identified **induction heads**, pairs of attention heads that find an earlier occurrence of the current token and copy what followed it (`… A B … A` → `B`). They form abruptly during training, at the same point at which in-context learning — measured as the loss on late tokens of a context falling below the loss on early ones — improves sharply, and the authors argued that they account for much of in-context learning in small models. [[interpretability]] treats such circuits in detail.

## Using in-context learning well {#sec-practice}

The findings above translate into a short list of practices, all of which [[prompting-rag/prompt-design]] develops further.

- **Measure zero-shot first.** Instruction-tuned models ([[post-training/instruction-tuning]]) often do as well zero-shot with a clear instruction as base models did few-shot; demonstrations cost tokens on every call.
- **Choose demonstrations deliberately.** Demonstrations similar to the query help: Liu et al. (2022) retrieved the nearest training examples by embedding similarity ([[prompting-rag/text-embeddings]]) and outperformed random choice. Cover the label space, and avoid a skewed label distribution among the demonstrations.
- **Control for order and format.** Shuffle the demonstrations across runs and report the spread; keep the template consistent between demonstrations and query.
- **Score, do not parse, when the output is a label**, as in [[#eq-label-score]], and consider contextual calibration.
- **Know when to fine-tune.** When a task has thousands of labelled examples, is run millions of times, or needs behaviour the model resists, fine-tuning (including parameter-efficient methods, [[post-training/parameter-efficient-tuning]]) usually beats ICL on cost and accuracy. Mosbach et al. (2023) found that, compared fairly, few-shot fine-tuning and ICL generalise similarly out of domain.

::: example Prompt cost versus fine-tuning {#ex-cost}
A task is run on one million queries. A $16$-shot prompt adds $1500$ tokens to each query; a fine-tuned model needs none. How many extra input tokens does ICL process in total, and how does that compare with fine-tuning on $20{,}000$ examples of $100$ tokens for $3$ epochs?
::: solution
ICL: $10^6\cdot1500 = 1.5\times10^9$ extra input tokens. Fine-tuning processes $20{,}000\cdot100\cdot3 = 6\times10^6$ training tokens, each costing roughly three times an inference token (a forward and a backward pass, [[neural-networks/backpropagation]]), so about $1.8\times10^7$ inference-token equivalents — almost a hundred times less than the demonstrations. The comparison ignores the cost of collecting $20{,}000$ labels and of serving a separate model, which is often what decides it; but at high volume, long prompts are expensive. Prompt caching ([[inference/kv-cache]]) reduces the cost of a shared prefix but does not remove it.
:::
:::

::: history
Radford et al. (2019) observed that GPT-2 could perform some tasks zero-shot when they were phrased as text, such as summarisation triggered by `TL;DR:`. Brown et al. (2020) named and measured in-context learning with GPT-3, distinguishing zero-, one- and few-shot evaluation. Zhao et al. (2021) documented the biases of few-shot prompting and proposed contextual calibration; Lu et al. (2022) showed how strongly the order of demonstrations matters, and Liu et al. (2022) how much their choice does. Min et al. (2022) found that gold labels matter surprisingly little, and Wei et al. (2023) that larger models can follow flipped labels. On the theoretical side, Xie et al. (2022) explained ICL as implicit Bayesian inference; Garg et al. (2022) showed that Transformers learn linear regression in context, and von Oswald et al. (2023) and Akyürek et al. (2023) connected this to gradient descent. Olsson et al. (2022) linked the emergence of in-context learning to induction heads. With long contexts, Agarwal et al. (2024) studied many-shot ICL with hundreds or thousands of demonstrations.
:::

::: summary
- In-context learning is the improvement of a frozen model's predictions as demonstrations are added to its prompt; zero-, one- and few-shot prompts differ in the number of demonstrations.
- For classification, score the label verbalisers rather than parse free text; predictions show majority-label, recency and common-token biases, which contextual calibration partly removes.
- Accuracy depends strongly on which demonstrations are used and in what order; measure the spread.
- For many tasks and models, demonstrations mostly convey the label space, input distribution and format; larger models also learn genuinely new mappings in context.
- Two theoretical models, both idealised: ICL as implicit Bayesian inference over latent concepts, whose posterior concentrates exponentially in the number of demonstrations; and ICL as gradient descent, since one linear attention layer implements one exact gradient step of least squares.
- Prompts cost tokens on every call; at high volume or with plentiful labels, fine-tuning is often better.
:::

## Exercises

::: exercise A longer prompt budget {level=1 check="25"}
A model has a $4096$-token context. The instruction takes $100$ tokens, the query $80$, and $20$ tokens are reserved for the answer. Each demonstration takes $150$ tokens. How many demonstrations fit?
::: solution
$4096 - 100 - 80 - 20 = 3896$ tokens remain, and $3896/150 = 25.97$, so $25$ demonstrations fit.
:::
:::

::: exercise Three label tokens {level=1 check="0.665"}
After a three-way classification prompt, the logits of the label tokens *positive*, *neutral* and *negative* are $1$, $0$ and $-1$. What probability does scoring assign to *positive*, to three decimal places?
::: solution
$e^{1}/(e^{1} + e^{0} + e^{-1}) = 2.718/(2.718 + 1 + 0.368) = 2.718/4.086 = 0.665$.
:::
:::

::: exercise Calibrating a weak preference {level=1 check="0.449"}
The model gives $\mathbf{p}(x) = (0.55, 0.45)$ for (*positive*, *negative*) and $\mathbf{p}_{\text{cf}} = (0.6, 0.4)$ for the content-free input. Compute the calibrated probability of *positive*, to three decimal places, and the calibrated prediction.
::: solution
$(0.55/0.6,\ 0.45/0.4) = (0.9167,\ 1.125)$, with sum $2.0417$; the calibrated probability of *positive* is $0.9167/2.0417 = 0.449$. The prediction becomes *negative*.
:::
:::

::: exercise A disfavoured concept {level=2 check="0.8"}
In the Bayesian model, the correct concept has prior probability $0.2$, and each demonstration is twice as likely under it as under the single alternative. What is its posterior probability after four demonstrations?
::: solution
Prior odds $0.2/0.8 = 0.25$; after four demonstrations the odds are $0.25\cdot2^4 = 4$, so the probability is $4/5 = 0.8$.
:::
:::

::: exercise How many demonstrations? {level=2 check="5"}
With equal priors on two concepts and a likelihood ratio of $3$ per demonstration, what is the smallest number of demonstrations after which the posterior of the correct concept is at least $0.99$?
::: solution
We need $3^k/(3^k + 1)\ge 0.99$, that is $3^k\ge 99$. Since $3^4 = 81 < 99\le 243 = 3^5$, the answer is $k = 5$.
:::
:::

::: exercise Linear attention as regression {level=2 check="0.9"}
Demonstrations $\mathbf{x}_1 = (1, 2)$, $y_1 = 1$ and $\mathbf{x}_2 = (2, 0)$, $y_2 = 3$; query $\mathbf{x} = (1, 1)$; $\eta = 0.1$. Compute the prediction of one gradient step from $\mathbf{w} = \mathbf{0}$ and check it against the linear-attention form of [[#prop-gd]].
::: solution
$\sum_i y_i\mathbf{x}_i = (1, 2) + (6, 0) = (7, 2)$, so $\mathbf{w}_1 = (0.7, 0.2)$ and $\hat y = 0.7 + 0.2 = 0.9$. Attention form: scores $\mathbf{x}_i^\top\mathbf{x} = 3$ and $2$, values $0.1$ and $0.3$, output $0.1\cdot3 + 0.3\cdot2 = 0.9$.
:::
:::

::: exercise Orders of demonstrations {level=1 check="40320"}
Lu et al. (2022) evaluated permutations of a fixed set of demonstrations. How many orders does a set of $8$ distinct demonstrations have? Why does this make exhaustive search over orders impractical even for modest $k$?
::: solution
$8! = 40{,}320$. Each order needs a full evaluation on a validation set, so even $k = 8$ costs tens of thousands of evaluation runs, and $k = 12$ has about $4.8\times10^8$ orders. In practice one samples a few orders and reports the spread, or uses a selection heuristic.
:::
:::

::: exercise Laplace's rule in context {level=2 check="2/3"}
A Transformer is trained on sequences of coin flips, each sequence from a coin whose bias is drawn uniformly from $[0, 1]$. At the end of a context of $10$ flips with $7$ heads, what probability of heads should an optimal model output? Explain why this is in-context learning in the sense of [[#def-icl]].
::: solution
The posterior over the bias is $\operatorname{Beta}(8, 4)$, and the predictive probability of heads is its mean, $8/12 = 2/3$. The weights are fixed; the prediction depends on the context and becomes more accurate, in expectation, as the context provides more flips of the current coin. That is exactly the behavioural definition.
:::
:::

::: exercise Designing a label-sensitivity experiment {level=2}
You want to know whether a model uses the input–label mapping of its demonstrations for a sentiment task, or only the format. Design an experiment with at least four conditions, say what result would support each explanation, and name two confounders you must control.
::: solution
Conditions, each with the same $k$ demonstrations and many random draws of demonstrations and orders: (1) zero-shot; (2) gold labels; (3) random labels from the label set; (4) flipped labels (every positive marked negative and vice versa); optionally (5) inputs replaced by random sentences, gold labels kept, and (6) labels replaced by unrelated words. If (2) ≈ (3) ≫ (1), the gain comes from format, label space and inputs, not the mapping. If (4) falls well below (1) — the model follows the flipped mapping — it is learning the mapping in context. Confounders: the label balance of the demonstrations (majority-label bias can mimic or mask effects, so keep it fixed across conditions) and the variance across demonstration sets and orders (report means and spreads over many draws, with confidence intervals as in [[ml-fundamentals/evaluation-metrics#sec-uncertainty]]). Run the experiment for more than one model size, since the answer changes with scale.
:::
:::

::: exercise Preconditioned gradient step {level=3}
Let each token be $\mathbf{z}_i = (\mathbf{x}_i, y_i)\in\R^{d+1}$ and the query token $\mathbf{z} = (\mathbf{x}, 0)$. Show that linear attention with $W_K = W_Q = \begin{pmatrix} I_d & \mathbf{0}\end{pmatrix}$ (projection onto the first $d$ coordinates) and $W_V = \begin{pmatrix}\mathbf{0}^\top & \eta\end{pmatrix}$ reproduces [[#prop-gd]], and that replacing $W_Q$ by $\begin{pmatrix} A & \mathbf{0}\end{pmatrix}$ for a matrix $A\in\R^{d\times d}$ yields one step of gradient descent with preconditioner $A^\top$. Why would a model trained on regression prompts whose inputs have covariance $\Sigma$ benefit from such an $A$?
::: solution
Here $\mathbf{k}_i = W_K\mathbf{z}_i = \mathbf{x}_i$, $v_i = W_V\mathbf{z}_i = \eta y_i$ and $\mathbf{q} = W_Q\mathbf{z} = \mathbf{x}$, so the output $\sum_i v_i\,\mathbf{k}_i^\top\mathbf{q} = \eta\sum_i y_i\mathbf{x}_i^\top\mathbf{x}$, which is [[#prop-gd]]. With $\mathbf{q} = A\mathbf{x}$ the output is $\eta\sum_i y_i\mathbf{x}_i^\top A\mathbf{x} = (\eta A^\top\sum_i y_i\mathbf{x}_i)^\top\mathbf{x}$; since $-\sum_i y_i\mathbf{x}_i$ is the gradient at $\mathbf{0}$, this is the prediction of $\mathbf{w}_1 = -\eta A^\top\nabla L(\mathbf{0})$, a preconditioned step. When the inputs have covariance $\Sigma$, $\sum_i y_i\mathbf{x}_i\approx k\,\Sigma\mathbf{w}$ for the true $\mathbf{w}$, so an ordinary step is biased towards high-variance directions; choosing $A^\top\approx(k\Sigma)^{-1}$ gives $\mathbf{w}_1\approx\mathbf{w}$, essentially the least-squares answer in one step. A model trained on many such prompts can learn this $A$ into its weights, which is one reason trained Transformers regress better than plain one-step gradient descent.
:::
:::

::: exercise When the concepts are indistinguishable {level=3}
In [[#prop-concentration]], suppose two concepts $\theta^*\ne\theta$ have $\operatorname{KL}\big(p(\cdot\mid\theta^*)\Vert p(\cdot\mid\theta)\big) = 0$. What happens to their posterior ratio as $k$ grows? Relate this to a prompt whose demonstrations are consistent with two different tasks (for instance, "classify sentiment" and "classify whether the review mentions price", when every positive demonstration happens to mention price), and suggest how to fix the prompt.
::: solution
KL divergence zero means the two concepts give the same distribution to demonstrations, so every likelihood ratio is $1$ and the posterior ratio stays at the prior ratio for all $k$: no number of such demonstrations can distinguish them. In the prompt example, every demonstration is equally explained by both tasks, so the model's choice depends on its prior — which task is more common in pretraining text — and queries where the two tasks disagree (a positive review that does not mention price) are a coin toss weighted by that prior. The fix is to add demonstrations that separate the hypotheses (a positive review without price, a negative one that mentions price) or to state the task in an instruction, which acts as strong evidence for one concept.
:::
:::
