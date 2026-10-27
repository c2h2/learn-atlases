A spam filter, a medical test read from an image, a translation system and a large language model have one thing in common: nobody wrote down the rule they follow. Each was given **examples** — e-mails marked as spam or not, images with diagnoses, sentences with their translations, or simply a great deal of text — and an algorithm chose, from a large family of candidate rules, one that fits the examples well. Machine learning is the study of when and why that works: when a rule chosen because it fits *old* examples also does well on *new* ones.

This chapter sets up the vocabulary that every later chapter uses. It defines the objects precisely — a data distribution, a hypothesis class, a loss and the **risk** — and shows that the obvious algorithm, minimising the error on the training examples, is both natural and dangerous. It then sorts the ways examples can supervise a learner, and shows that the training of a language model, which needs no human labels at all, is an instance of ordinary supervised learning. The probability used here (expectations, conditional distributions, independence) is that of [[math-for-ml/probability]]; the law of large numbers is treated in the Maths Atlas lesson on [limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems).

## Data, hypotheses and losses {#sec-setup}

Begin with a picture. We want to predict a quantity $y$ (the label: *spam* or *not spam*, a house price, the next word) from an input $\mathbf{x}$ (an e-mail, a list of house features, the words so far). Pairs $(\mathbf{x}, y)$ arise in the world with some regularity but also with noise: two e-mails with identical text may be labelled differently by two people, and two identical houses sell for different prices. The right model of this is a *probability distribution* over pairs, which we do not know but from which we can draw samples.

::: definition The supervised learning problem {#def-learning-problem}
Let $\mathcal{X}$ be an **input space** and $\mathcal{Y}$ a **label space**. A **data distribution** $\mathcal{D}$ is a probability distribution on $\mathcal{X}\times\mathcal{Y}$, unknown to the learner. A **training set** is a sample $S = ((\mathbf{x}_1, y_1), \dots, (\mathbf{x}_n, y_n))$ of $n$ pairs drawn independently from $\mathcal{D}$. A **hypothesis** (or predictor, or model) is a function $h\colon\mathcal{X}\to\hat{\mathcal{Y}}$, where $\hat{\mathcal{Y}}$ is the set of possible predictions (often $\mathcal{Y}$ itself, or a set of probability distributions on $\mathcal{Y}$), and a **hypothesis class** $\mathcal{H}$ is the set of hypotheses the learner may choose from. A **loss function** $\ell\colon\hat{\mathcal{Y}}\times\mathcal{Y}\to[0, \infty)$ measures how bad the prediction $\hat y$ is when the truth is $y$. A **learning algorithm** maps each training set $S$ to a hypothesis $h_S\in\mathcal{H}$.
:::

Three standard losses cover most of this course:

- the **squared loss** $\ell(\hat y, y) = (\hat y - y)^2$ for real-valued $y$ (regression);
- the **0–1 loss** $\ell(\hat y, y) = [\hat y\ne y]$, which is $1$ for a mistake and $0$ otherwise (classification), where $[\cdot]$ is $1$ if the condition holds and $0$ otherwise;
- the **log loss** (cross-entropy) $\ell(q, y) = -\log q(y)$, where the prediction $q$ is a probability distribution over the classes and is charged the negative log of the probability it gave to the true class. This is the loss of logistic regression ([[ml-fundamentals/logistic-regression]]) and of every language model.

The hypothesis class is a modelling choice as consequential as the loss. Linear functions $h(\mathbf{x}) = \mathbf{w}^\top\mathbf{x} + b$ form a small, well-understood class; a Transformer with a fixed architecture and all its possible weight settings is a very large one. Each choice of parameters $\theta$ picks one member $h_\theta$ of the class, so "choosing a hypothesis" and "fitting parameters" are the same act.

## Risk and empirical risk {#sec-risk}

What do we want from $h$? Not that it be right on the training examples — we already know their labels — but that it do well on future pairs drawn from the same distribution.

::: definition Risk, empirical risk and ERM {#def-risk}
The **risk** (expected loss, or generalisation error) of a hypothesis $h$ is

$$
R(h) = \E_{(\mathbf{x}, y)\sim\mathcal{D}}\big[\ell(h(\mathbf{x}), y)\big].
$$ {#eq-risk}

The **empirical risk** (training error) of $h$ on the sample $S$ is the average loss on the sample,

$$
\hat R_S(h) = \frac1n\sum_{i=1}^n\ell(h(\mathbf{x}_i), y_i).
$$ {#eq-empirical-risk}

**Empirical risk minimisation** (ERM) is the learning algorithm that returns a hypothesis $\hat h_S\in\arg\min_{h\in\mathcal{H}}\hat R_S(h)$. The **generalisation gap** of $h$ is $R(h) - \hat R_S(h)$.
:::

The risk is the quantity we care about and cannot compute, because $\mathcal{D}$ is unknown. The empirical risk is the quantity we can compute. ERM replaces the first by the second — the same move as estimating a mean by a sample average — and almost every training procedure in this atlas, from least squares to the pretraining of a language model, is ERM over some class, usually with a penalty added (the subject of [[ml-fundamentals/regularisation]]) and usually solved only approximately by gradient descent.

::: example Risk of a threshold rule {#ex-threshold-risk}
Let $x$ be uniform on $[0, 1]$, let the "clean" label be $[x > 0.6]$, and suppose each label is independently flipped with probability $0.1$ (annotator error). Under the 0–1 loss, find the risk of $h_{0.6}(x) = [x > 0.6]$ and of $h_{0.5}(x) = [x > 0.5]$.
::: solution
$h_{0.6}$ predicts the clean label everywhere, so it errs exactly when the label was flipped: $R(h_{0.6}) = 0.1$.

$h_{0.5}$ agrees with $h_{0.6}$ except on $(0.5, 0.6]$, an interval of probability $0.1$, where it predicts $1$ although the clean label is $0$. There it is wrong unless the label was flipped, with probability $0.9$; elsewhere it is wrong with probability $0.1$. Hence $R(h_{0.5}) = 0.1\cdot0.9 + 0.9\cdot0.1 = 0.18$. Moving the threshold by $0.1$ almost doubled the risk.
:::
:::

### The best possible predictor {#sec-bayes}

Even a perfect learner cannot beat the noise in the labels: in [[#ex-threshold-risk]] no rule can have risk below $0.1$, because a flipped label is unpredictable from $x$. The best achievable risk has a name.

::: definition Bayes predictor and Bayes risk {#def-bayes}
A **Bayes predictor** is a function $h^*$ that minimises the risk over *all* measurable functions $\mathcal{X}\to\hat{\mathcal{Y}}$, and its risk $R^* = R(h^*)$ is the **Bayes risk**. For a binary label $y\in\{0, 1\}$ write $\eta(\mathbf{x}) = \Prob(y = 1\mid\mathbf{x})$ for the **regression function** of the label.
:::

::: proposition Bayes predictors for the standard losses {#prop-bayes}
(a) Under the squared loss, the Bayes predictor is the conditional mean $h^*(\mathbf{x}) = \E[y\mid\mathbf{x}]$, and the Bayes risk is $\E\big[\Var(y\mid\mathbf{x})\big]$.

(b) Under the 0–1 loss with $\mathcal{Y} = \{1, \dots, K\}$, the Bayes predictor is the most probable class, $h^*(\mathbf{x}) = \arg\max_k\Prob(y = k\mid\mathbf{x})$, and the Bayes risk is $1 - \E\big[\max_k\Prob(y = k\mid\mathbf{x})\big]$. For two classes it predicts $1$ exactly when $\eta(\mathbf{x}) > 1/2$, and $R^* = \E\big[\min(\eta(\mathbf{x}), 1 - \eta(\mathbf{x}))\big]$.
:::

::: proof
By the tower rule, $R(h) = \E_{\mathbf{x}}\big[\E[\ell(h(\mathbf{x}), y)\mid\mathbf{x}]\big]$, and the inner conditional expectation depends on $h$ only through the single value $c = h(\mathbf{x})$. So it suffices to minimise, separately for each $\mathbf{x}$, the conditional risk $r(c) = \E[\ell(c, y)\mid\mathbf{x}]$ over $c$.

(a) Let $m = \E[y\mid\mathbf{x}]$. Then $r(c) = \E[(y - m + m - c)^2\mid\mathbf{x}] = \Var(y\mid\mathbf{x}) + 2(m - c)\E[y - m\mid\mathbf{x}] + (m - c)^2 = \Var(y\mid\mathbf{x}) + (m - c)^2$, since $\E[y - m\mid\mathbf{x}] = 0$. This is minimised by $c = m$, with value $\Var(y\mid\mathbf{x})$; averaging over $\mathbf{x}$ gives the Bayes risk.

(b) $r(c) = \Prob(y\ne c\mid\mathbf{x}) = 1 - \Prob(y = c\mid\mathbf{x})$, minimised by the class of largest conditional probability. With two classes the largest of $\eta$ and $1 - \eta$ is chosen and the conditional risk is the smaller of them.
:::

The proof is worth remembering for its method: **risk minimisation over all functions decouples into a separate one-number problem at every input.** Exercise 10 applies it to the log loss and finds that the best probabilistic prediction is the true conditional distribution $p(y\mid\mathbf{x})$, with Bayes risk equal to the conditional entropy. That is why a language model trained by cross-entropy is, in the limit of unlimited data and capacity, pushed towards the true next-token distribution ([[math-for-ml/information-theory]]).

::: example The loss decides what you predict {#ex-mean-median}
House prices in a neighbourhood (in units of $100{,}000$) are $1, 2, 3, 10$, each equally likely, and we must predict a single constant $c$. Which $c$ minimises the expected squared loss, and which the expected absolute loss $\lvert c - y\rvert$?
::: solution
Squared loss: by [[#prop-bayes]](a) with no input, the minimiser is the mean $c = 4$, with risk $\frac14(9 + 4 + 1 + 36) = 12.5$.

Absolute loss: $\E\lvert c - y\rvert$ is piecewise linear in $c$ with slope $\frac14(\#\{y < c\} - \#\{y > c\})$, which is negative for $c < 2$, zero on $(2, 3)$ and positive for $c > 3$. Every $c\in[2, 3]$ — a **median** — is optimal, with risk $\frac14(1.5 + 0.5 + 0.5 + 7.5) = 2.5$ at $c = 2.5$. The single expensive house drags the mean to $4$ but barely moves the median: the squared loss predicts averages and is sensitive to outliers; the absolute loss predicts medians and is robust to them (exercise 7).
:::
:::

### What can go wrong with ERM {#sec-erm-fails}

For one *fixed* hypothesis, the empirical risk is an honest estimate of the risk. The trouble starts when the hypothesis is chosen *because* its empirical risk is small.

::: proposition Empirical risk is unbiased for a fixed hypothesis, optimistic for the chosen one {#prop-optimism}
(a) If $h$ does not depend on $S$, then $\E_S[\hat R_S(h)] = R(h)$, and $\Var_S(\hat R_S(h)) = \Var(\ell(h(\mathbf{x}), y))/n$.

(b) If $\hat h_S$ is chosen by ERM over $\mathcal{H}$, then

$$
\E_S\big[\hat R_S(\hat h_S)\big]\ \le\ \inf_{h\in\mathcal{H}}R(h)\ \le\ \E_S\big[R(\hat h_S)\big].
$$
:::

::: proof
(a) The terms $\ell(h(\mathbf{x}_i), y_i)$ are independent and identically distributed with mean $R(h)$ and variance $v = \Var(\ell(h(\mathbf{x}), y))$, because $h$ is fixed and the pairs are independent draws from $\mathcal{D}$. The mean of their average is $R(h)$, and its variance is $nv/n^2 = v/n$.

(b) For every fixed $h\in\mathcal{H}$, $\hat R_S(\hat h_S)\le\hat R_S(h)$ by definition of ERM. Taking expectations and using (a), $\E_S[\hat R_S(\hat h_S)]\le R(h)$; this holds for every $h$, hence for the infimum. The right inequality holds because $\hat h_S\in\mathcal{H}$, so $R(\hat h_S)\ge\inf_{h\in\mathcal{H}}R(h)$ for every sample.
:::

Part (b) says that on average the training error of the ERM hypothesis *underestimates* its own risk: the minimum of many noisy estimates is biased downwards, because the algorithm seeks out the hypotheses whose errors happened to be favourable on this sample. The larger and more flexible the class, the more room there is to find such accidents. The extreme case is a class rich enough to fit any labels at all.

The code below draws $50$ training points from the distribution of [[#ex-threshold-risk]], runs ERM over $101$ threshold rules, and compares the result with a **memoriser**: a lookup table that returns the training label for a training input and $0$ for anything else. A large held-out sample estimates the risks. The listing uses only the Python standard library.

```python
import random

rng = random.Random(0)

def sample(n):
    """x ~ Uniform(0, 1); y = [x > 0.6], flipped with probability 0.1."""
    data = []
    for _ in range(n):
        x = rng.random()
        y = int(x > 0.6)
        if rng.random() < 0.1:
            y = 1 - y
        data.append((x, y))
    return data

def error(h, data):                      # empirical risk under the 0-1 loss
    return sum(h(x) != y for x, y in data) / len(data)

train, test = sample(50), sample(100_000)

# Hypothesis class: thresholds h_t(x) = [x > t], t on a grid of 101 values
grid = [i / 100 for i in range(101)]
t_hat = min(grid, key=lambda t: error(lambda x: int(x > t), train))
h_erm = lambda x: int(x > t_hat)

# A memoriser: look the point up in the training set, otherwise answer 0
table = dict(train)
h_mem = lambda x: table.get(x, 0)

print("ERM threshold", t_hat)
for name, h in [("threshold", h_erm), ("memoriser", h_mem)]:
    print(f"{name:10s} train {error(h, train):.3f}  test {error(h, test):.3f}")
```

```text
ERM threshold 0.6
threshold  train 0.060  test 0.101
memoriser  train 0.000  test 0.421
```

The threshold rule found by ERM is (by luck of the grid) the Bayes predictor; its training error $0.06$ is below its risk $0.1$, as [[#prop-optimism]](b) leads us to expect. The memoriser has *zero* training error and test error $0.42$, which is simply the rate of label $1$ in new data: it has learned nothing that transfers. Both fit the training set; only one generalises. The difference lies in the class: $101$ thresholds cannot fit noise, a lookup table can fit anything.

::: warning Low training error is not evidence of learning
A training error of zero is compatible with a useless model, as the memoriser shows, and a falling training loss is compatible with a rising test loss. The only direct evidence about the risk is the error on data that played no part in choosing the model — not in fitting the parameters, not in choosing the architecture, not in deciding when to stop. Every reported number should say which data it was measured on; [[ml-fundamentals/generalisation]] makes the split into training, validation and test sets precise.
:::

### Estimation and approximation {#sec-decomposition}

The risk of a learned hypothesis exceeds the Bayes risk for two different reasons, and it helps to keep them apart. Let $R_{\mathcal{H}} = \inf_{h\in\mathcal{H}}R(h)$ be the best risk achievable within the class. Then, trivially,

$$
R(\hat h_S) - R^* = \underbrace{\big(R(\hat h_S) - R_{\mathcal{H}}\big)}_{\text{estimation error}} + \underbrace{\big(R_{\mathcal{H}} - R^*\big)}_{\text{approximation error}}.
$$ {#eq-decomposition}

The **approximation error** is the price of the class: if the truth is curved and the class is linear, no amount of data removes it. The **estimation error** is the price of having only $n$ examples: the learner cannot tell exactly which member of the class is best. Enlarging the class lowers the first and, typically, raises the second; more data lowers the second. This is the first form of a trade-off that recurs throughout the course, and [[ml-fundamentals/generalisation]] gives the classical bounds on the estimation error in terms of $n$ and the size of $\mathcal{H}$.

::: remark No free lunch
One might hope for a universal learner, good on every distribution. There is none: for any learning algorithm for binary classification and any sample size $n$ smaller than half the size of a finite input space, there is a distribution on which some function has risk $0$, yet with probability at least $1/7$ over the sample the algorithm returns a hypothesis of 0–1 risk at least $1/8$ (the no-free-lunch theorem in the form of Shalev-Shwartz and Ben-David, 2014, Theorem 5.1; see also Wolpert, 1996). Learning from finite data is possible only because we restrict the class or prefer some hypotheses to others — an **inductive bias** such as "the boundary is a threshold", "the function is smooth" or "small weights are more likely". Choosing that bias well is the real work of machine learning.
:::

::: widget lln
experiment: bernoulli
p: 0.18
trials: 1000
runs: 5
caption: Each run evaluates the rule $h_{0.5}$ of [[#ex-threshold-risk]] on $1000$ fresh examples; a trial is $1$ when the rule errs, which happens with probability $R(h_{0.5}) = 0.18$. The running average is the empirical risk on the first $n$ examples. For a *fixed* rule it converges to the risk, and its spread shrinks like $1/\sqrt n$ ([[#prop-optimism]](a)). After $50$ examples the estimates still differ by several percentage points.
:::

## Kinds of learning {#sec-kinds}

So far every example came with its label. Learning problems differ mainly in what the data provide.

::: definition Supervised, unsupervised, self-supervised and reinforcement learning {#def-kinds}
- In **supervised learning** the data are pairs $(\mathbf{x}_i, y_i)$ and the goal is to predict $y$ from $\mathbf{x}$: **regression** when $y$ is real-valued, **classification** when it takes finitely many values.
- In **unsupervised learning** the data are inputs $\mathbf{x}_i$ alone, and the goal is to describe their distribution: estimate a density, find clusters, or find a low-dimensional representation (as principal component analysis does, [[math-for-ml/matrix-decompositions]]).
- In **self-supervised learning** the data are unlabelled, but a supervised problem is manufactured from them by hiding part of each example and predicting it from the rest: the next token from the previous ones, a masked word from its context, a patch of an image from the surrounding patches.
- In **reinforcement learning** an agent acts, and the data are rewards for its actions; the learner influences which data it sees.
:::

Self-supervised learning is the key to language models, and the point to take from the definition is that it is *supervised learning in disguise*. Given a document of tokens $x_1, \dots, x_T$, form the pairs

$$
\big((x_1), x_2\big),\ \big((x_1, x_2), x_3\big),\ \dots,\ \big((x_1, \dots, x_{T-1}), x_T\big),
$$

whose inputs are prefixes and whose labels are next tokens. The label space is the vocabulary $\mathcal{V}$, the hypothesis outputs a distribution $p_\theta(\cdot\mid x_{<t})$ over it, the loss is the log loss, and the empirical risk is the average next-token cross-entropy of [[math-for-ml/estimation#eq-nll]]. The "labels" cost nothing — the text supplies them — which is why such models can be trained on trillions of tokens. The pairs from one document are not independent of one another, so the i.i.d. assumption of [[#def-learning-problem]] holds only approximately (documents, not tokens, are the natural independent units), but the framework of risk and empirical risk carries over.

::: example Training pairs from a sentence {#ex-pairs}
The sentence *the cat sat on the mat* is tokenised into the six tokens *the, cat, sat, on, the, mat* and used to train a language model with a context window of at most $3$ tokens. List the training pairs, and count them for a corpus of $1{,}000$ such sentences.
::: solution
Each position after the first is a target, with up to three preceding tokens as context:

| context | target |
|---|---|
| *the* | *cat* |
| *the cat* | *sat* |
| *the cat sat* | *on* |
| *cat sat on* | *the* |
| *sat on the* | *mat* |

That is $T - 1 = 5$ pairs from $T = 6$ tokens, and $5{,}000$ from $1{,}000$ sentences. The pair *(cat sat on, the)* and the pair *(the, cat)* share tokens, so they are not independent draws; and the two occurrences of *the* as a target ask the model to predict the same token from different contexts, which is exactly how it learns that context matters.
:::
:::

Two variations are common. In **semi-supervised learning** a few labelled examples are combined with many unlabelled ones; in practice this today usually means self-supervised pretraining followed by supervised **fine-tuning** on the labelled set, the pattern behind [[text-and-language/text-classification]] and [[post-training/instruction-tuning]]. And the last stage of training a chat model, reinforcement learning from human feedback ([[post-training/rlhf]]), is reinforcement learning: the model generates its own outputs, which are scored by a reward model.

::: quiz
A model is pretrained on web text to predict masked words from their context, with no human annotation. Which kind of learning is this, and what is its loss on one masked position?
- [ ] Unsupervised learning; the squared distance between embeddings
- [x] Self-supervised learning; the log loss of the predicted distribution at the true word
- [ ] Reinforcement learning; the negative reward of the prediction
- [ ] Supervised learning with human labels; the 0–1 loss
::: solution
The labels — the hidden words — come from the data itself, which is the defining feature of self-supervised learning ([[#def-kinds]]). The model outputs a distribution over the vocabulary and is charged $-\log q(\text{true word})$, the log loss. Formally it is a supervised problem, but the supervision is manufactured from unlabelled text rather than supplied by annotators.
:::
:::

## Surrogate losses {#sec-surrogates}

The 0–1 loss is what a classifier is usually judged by, but it is a poor training objective: as a function of the model's parameters it is piecewise constant, so its gradient is zero almost everywhere and gradient descent cannot use it, and minimising it exactly over linear classifiers is computationally hard in general. Practice therefore minimises a **surrogate loss**, a smooth or convex function that upper-bounds or approximates the 0–1 loss, and judges the result by the 0–1 loss afterwards.

For binary labels it is convenient to write $y\in\{-1, +1\}$ and let the model output a real **score** $f(\mathbf{x})$, predicting the sign. The product $m = yf(\mathbf{x})$, the **margin**, is positive for a correct prediction and negative for a mistake, and the common losses are functions of $m$ alone:

| loss | as a function of the margin $m$ | used by |
|---|---|---|
| 0–1 | $[m\le0]$ | evaluation |
| logistic | $\log_2(1 + e^{-m})$ | logistic regression, neural classifiers |
| hinge | $\max(0, 1 - m)$ | support vector machines |
| squared | $(1 - m)^2$ | least-squares classification |
| exponential | $e^{-m}$ | AdaBoost |

(The logistic loss is written in base $2$ so that it equals $1$ at $m = 0$ and lies above the 0–1 loss; in natural logarithms it is the log loss of [[ml-fundamentals/logistic-regression]].)

::: widget plot
f: heaviside(-x); ln(1 + exp(-x))/ln(2); max(0, 1 - x); exp(-x)
x: -2, 3
y: 0, 4
labels: 0–1 loss; logistic (base 2); hinge; exponential
caption: Surrogate losses as functions of the margin $m = yf(\mathbf{x})$. Each is convex, upper-bounds the 0–1 loss, and decreases as the margin grows, so minimising it pushes scores to the correct side of zero with room to spare. They differ in how hard they punish confident mistakes (large negative $m$): the exponential loss explodes, the hinge and logistic losses grow linearly, which makes them more tolerant of mislabelled examples.
:::

Surrogates are not merely a convenience. Under mild conditions, minimising the risk of a convex surrogate that is differentiable at $0$ with negative derivative there also drives the 0–1 risk to the Bayes risk — such surrogates are called **classification-calibrated** (Bartlett, Jordan and McAuliffe, 2006). And the log loss gives more than a label: it gives a probability, which matters whenever decisions depend on confidence ([[ml-fundamentals/evaluation-metrics]]).

::: example Losses of three predictions {#ex-surrogate}
A classifier gives scores $f = 2, 0.5, -1$ to three examples whose labels are $+1, -1, +1$. Compute the 0–1, hinge and natural-log logistic losses, and their averages.
::: solution
The margins are $m = 2, -0.5, -1$. The 0–1 losses are $0, 1, 1$ (average $2/3$). The hinge losses $\max(0, 1 - m)$ are $0, 1.5, 2$ (average $1.167$). The logistic losses $\ln(1 + e^{-m})$ are $\ln(1 + e^{-2}) = 0.127$, $\ln(1 + e^{0.5}) = 0.974$ and $\ln(1 + e) = 1.313$, average $0.805$. The first example is correct and confident, so the hinge loss is zero; the logistic loss is small but positive, and keeps rewarding even larger margins.
:::
:::

::: history
The statistical framing of prediction from examples predates computers: Fisher's linear discriminant (1936) separated three species of iris from four measurements, and Rosenblatt's perceptron (1958) learned a linear classifier from examples by a simple error-correcting rule, with a convergence theorem proved by Novikoff (1962). Vladimir Vapnik and Alexey Chervonenkis developed the theory of empirical risk minimisation from the late 1960s, culminating in Vapnik's *The Nature of Statistical Learning Theory* (1995) and *Statistical Learning Theory* (1998), which made the distinction between empirical and expected risk central. Leslie Valiant's "A theory of the learnable" (1984) introduced probably approximately correct (PAC) learning, which asks for a hypothesis of small risk with high probability from a feasible number of examples. Self-supervised prediction of words from context underlies the neural language model of Bengio et al. (2003) and word2vec (Mikolov et al., 2013), and became the dominant way to pretrain large models after BERT (Devlin et al., 2018) and GPT (Radford et al., 2018).
:::

::: summary
- A learning problem consists of an unknown distribution $\mathcal{D}$ over pairs, an i.i.d. training sample, a hypothesis class $\mathcal{H}$ and a loss $\ell$; the goal is small **risk** $R(h) = \E\,\ell(h(\mathbf{x}), y)$.
- **Empirical risk minimisation** minimises the training error instead. For a fixed hypothesis the training error is an unbiased estimate of the risk; for the hypothesis chosen by ERM it is biased downwards.
- The **Bayes predictor** minimises the risk over all functions: the conditional mean for squared loss, the most probable class for 0–1 loss, the true conditional distribution for log loss. Its risk, the Bayes risk, is the noise floor.
- Excess risk splits into **approximation error** (the class is too small) and **estimation error** (the data are too few); a class that can fit anything, like a lookup table, has no approximation error and useless estimates.
- Self-supervised learning manufactures labels from unlabelled data; next-token prediction is supervised learning with the log loss, and its empirical risk is the language-model training loss.
- The 0–1 loss is optimised through convex **surrogates** — logistic, hinge, exponential — that are functions of the margin.
:::

## Exercises

::: exercise An empirical risk {level=1 check="1/4"}
A classifier makes predictions $1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1$ on twelve examples whose labels are $1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1$. What is its empirical risk under the 0–1 loss?
::: solution
The predictions differ from the labels at positions $3$, $6$ and $10$: three mistakes out of twelve, so $\hat R_S = 3/12 = 1/4$.
:::
:::

::: exercise The best constant {level=1 check="5"}
Three training labels are $2, 4, 9$. Which constant prediction $c$ minimises the empirical squared loss, and what is the minimum average loss? Give $c$.
::: solution
$\frac13\sum_i(c - y_i)^2$ has derivative $\frac23\sum_i(c - y_i)$, which vanishes at the mean $c = 5$ — [[#prop-bayes]](a) applied to the empirical distribution. The minimum average loss is $\frac13(9 + 1 + 16) = 26/3\approx8.67$.
:::
:::

::: exercise Counting next-token predictions {level=1 check="1280"}
A language model is trained on $10$ sequences of $129$ tokens each, predicting every token from all the tokens before it within its sequence. How many next-token predictions (terms of the empirical risk) does one pass over the data contain?
::: solution
A sequence of $T$ tokens gives $T - 1$ predictions, as in [[#ex-pairs]]: $128$ per sequence, $1280$ in all. (This is why training sequences are often stored with one extra token: $T + 1$ tokens give exactly $T$ input–target pairs.)
:::
:::

::: exercise A Bayes risk {level=2 check="0.34"}
An input takes two values: $x = a$ with probability $0.3$ and $x = b$ with probability $0.7$. Given $x = a$ the label is $1$ with probability $0.8$; given $x = b$ it is $1$ with probability $0.4$. Find the Bayes classifier and its risk under the 0–1 loss.
::: solution
By [[#prop-bayes]](b), predict $1$ at $a$ (since $\eta(a) = 0.8 > 1/2$) and $0$ at $b$ (since $\eta(b) = 0.4 < 1/2$). The conditional error is $\min(\eta, 1 - \eta)$: $0.2$ at $a$ and $0.4$ at $b$. So $R^* = 0.3\cdot0.2 + 0.7\cdot0.4 = 0.06 + 0.28 = 0.34$. No classifier, however trained, does better on this distribution.
:::
:::

::: exercise A Bayes risk for squared loss {level=2 check="0.216"}
For the distribution of the previous exercise, treat the label $y\in\{0, 1\}$ as a number and use the squared loss with real-valued predictions. Find the Bayes predictor and the Bayes risk.
::: solution
By [[#prop-bayes]](a) the Bayes predictor is $\E[y\mid x] = \eta(x)$: $0.8$ at $a$ and $0.4$ at $b$. Its risk is $\E[\Var(y\mid x)]$, and a Bernoulli$(\eta)$ variable has variance $\eta(1 - \eta)$, so $R^* = 0.3\cdot0.8\cdot0.2 + 0.7\cdot0.4\cdot0.6 = 0.048 + 0.168 = 0.216$. Under squared loss the best prediction is a probability, not a class.
:::
:::

::: exercise How precise is a test error? {level=2 check="0.02"}
A fixed classifier has risk $0.2$. It is evaluated on $n = 400$ fresh examples. What is the standard deviation of its empirical 0–1 risk?
::: solution
The losses are independent Bernoulli$(0.2)$ variables with variance $0.2\cdot0.8 = 0.16$. By [[#prop-optimism]](a) the empirical risk has variance $0.16/400 = 0.0004$ and standard deviation $0.02$, two percentage points. [[ml-fundamentals/evaluation-metrics]] turns this into confidence intervals.
:::
:::

::: exercise The median minimises absolute loss {level=2}
Let $y$ be a random variable with a continuous distribution function $F$ and finite mean. Show that $g(c) = \E\lvert y - c\rvert$ is minimised by any median $c$, that is, any $c$ with $F(c) = 1/2$. Deduce the Bayes predictor for the absolute loss.
::: solution
Write $g(c) = \E[(c - y)[y < c]] + \E[(y - c)[y > c]]$. Increasing $c$ by a small $\delta > 0$ increases the first term by about $\delta\,\Prob(y < c)$ and decreases the second by about $\delta\,\Prob(y > c)$; precisely, $g$ is convex with derivative $g'(c) = F(c) - (1 - F(c)) = 2F(c) - 1$. This is negative below a median, zero at a median and positive above, so the medians are the minimisers. Applying this conditionally on $\mathbf{x}$, as in the proof of [[#prop-bayes]], the Bayes predictor for the absolute loss is the conditional median of $y$ given $\mathbf{x}$. [[#ex-mean-median]] is the discrete analogue.
:::
:::

::: exercise The optimism of ERM {level=2 check="1/4"}
Labels are fair coin flips independent of the inputs, and $\mathcal{H}$ contains just two hypotheses: "always predict $0$" and "always predict $1$". Both have risk $1/2$. With $n = 2$ training examples, ERM picks the hypothesis with fewer training mistakes (either one in a tie). What is the expected training error of the hypothesis it picks?
::: solution
Let $k$ be the number of ones among the two labels, $k\sim\Bin(2, 1/2)$. The two hypotheses have training errors $k/2$ and $(2 - k)/2$, and ERM achieves $\min(k, 2 - k)/2$: $0$ when $k = 0$ or $2$ (probability $1/2$) and $1/2$ when $k = 1$ (probability $1/2$). The expectation is $1/4$, half the true risk of either hypothesis — the downward bias of [[#prop-optimism]](b), here with only two hypotheses to choose from.
:::
:::

::: exercise Excess risk of a classifier {level=3}
For binary labels, let $\eta(\mathbf{x}) = \Prob(y = 1\mid\mathbf{x})$ and let $h^*$ be the Bayes classifier. Show that for every classifier $h$,

$$
R(h) - R^* = \E\big[\lvert2\eta(\mathbf{x}) - 1\rvert\,[h(\mathbf{x})\ne h^*(\mathbf{x})]\big].
$$

Interpret: where do disagreements with the Bayes classifier cost little?
::: solution
At a fixed $\mathbf{x}$, predicting $1$ has conditional error $1 - \eta$ and predicting $0$ has conditional error $\eta$. If $h(\mathbf{x}) = h^*(\mathbf{x})$ the two classifiers have the same conditional error. If they differ, $h^*$ has error $\min(\eta, 1 - \eta)$ and $h$ has $\max(\eta, 1 - \eta)$, and the difference is $\lvert\eta - (1 - \eta)\rvert = \lvert2\eta - 1\rvert$. Taking the expectation over $\mathbf{x}$ gives the formula. Disagreeing with the Bayes classifier is cheap where $\eta\approx1/2$ — where the label is nearly a coin flip anyway — and costly where the label is nearly certain. In [[#ex-threshold-risk]], $h_{0.5}$ disagrees with $h_{0.6}$ on a set of probability $0.1$ where $\lvert2\eta - 1\rvert = 0.8$, so the excess risk is $0.08$, matching $0.18 - 0.1$.
:::
:::

::: exercise The Bayes predictor for log loss {level=3}
Let $y$ take values in $\{1, \dots, K\}$ and let a prediction be a probability vector $\mathbf{q}$, charged $\ell(\mathbf{q}, y) = -\log q_y$. Show that the conditional risk $\E[-\log q_y\mid\mathbf{x}]$ is minimised by $q_k = \Prob(y = k\mid\mathbf{x})$, and that the Bayes risk is the conditional entropy $H(Y\mid X)$. What does this say about a language model trained to minimise cross-entropy?
::: solution
Write $p_k = \Prob(y = k\mid\mathbf{x})$. The conditional risk is $-\sum_kp_k\log q_k = H(\mathbf{p}) + D_{\text{KL}}(\mathbf{p}\,\Vert\,\mathbf{q})$, by adding and subtracting $\sum_kp_k\log p_k$. By Gibbs' inequality ([[math-for-ml/information-theory#thm-gibbs]]) the KL divergence is non-negative and zero only when $\mathbf{q} = \mathbf{p}$, so the minimum is at $\mathbf{q} = \mathbf{p}$, with value $H(\mathbf{p})$, the entropy of $y$ given this $\mathbf{x}$. Averaging over $\mathbf{x}$ gives $H(Y\mid X)$. For a language model: the risk-minimising next-token predictor is the true next-token distribution, and even it has positive loss, the entropy of text given its prefix. A model's cross-entropy can approach that floor but never go below it, which is why loss curves of language models flatten rather than reach zero.
:::
:::
