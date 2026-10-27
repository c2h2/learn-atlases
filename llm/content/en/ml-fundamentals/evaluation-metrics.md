"The model is $94\%$ accurate" can be excellent news, meaningless, or a disaster in disguise. It is meaningless if $94\%$ of the examples belong to one class, so that a model that always says "no" scores the same; a disaster if the $6\%$ it gets wrong are the cases that matter; and it may not even be $94\%$, if the test set was small or was used to choose the model. Evaluation is where the statistical care of [[ml-fundamentals/generalisation]] becomes concrete: choosing **metrics** that measure what matters, checking that predicted probabilities can be trusted (**calibration**), attaching **uncertainty** to every number, and **comparing** models in a way that would survive a fresh sample.

This chapter develops the standard toolkit for classifiers — the confusion matrix, precision and recall, ROC curves and the area under them, proper scoring rules and calibration, confidence intervals and paired tests — and closes with metrics for regression and language models. The statistics it uses (standard errors, confidence intervals, the paired comparison) were introduced in [[math-for-ml/estimation#sec-evaluation]]; here they are applied systematically. The Maths Atlas lessons on [confidence intervals](/learn/maths/lesson.php?c=statistics&l=confidence-intervals) and [hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing) give the background, and the evaluation of large language models specifically is the subject of [[evaluation]].

## The confusion matrix {#sec-confusion}

For a binary classifier, call one class **positive** (spam, disease, toxic, correct answer) and the other **negative**. Every prediction falls into one of four cells.

::: definition Confusion matrix and derived rates {#def-confusion}
On a labelled test set, let TP, FP, FN and TN count the **true positives** (predicted positive, actually positive), **false positives**, **false negatives** and **true negatives**; their total is $n$. Then:

- **accuracy** $= (\mathrm{TP} + \mathrm{TN})/n$, and error rate $= 1 -$ accuracy;
- **precision** (positive predictive value) $= \mathrm{TP}/(\mathrm{TP} + \mathrm{FP})$, the fraction of predicted positives that are real;
- **recall** (sensitivity, true-positive rate, TPR) $= \mathrm{TP}/(\mathrm{TP} + \mathrm{FN})$, the fraction of real positives that are found;
- **specificity** (true-negative rate) $= \mathrm{TN}/(\mathrm{TN} + \mathrm{FP})$, and the **false-positive rate** $\mathrm{FPR} = 1 -$ specificity;
- the **F1 score** $= 2\cdot\text{precision}\cdot\text{recall}/(\text{precision} + \text{recall})$, their harmonic mean.
:::

Precision and recall answer different questions — "when the model raises an alarm, how often is it right?" and "of the things that should raise an alarm, how many does it catch?" — and they pull against each other: a classifier that flags everything has recall $1$ and precision equal to the base rate; one that flags only its single most confident case may have precision $1$ and recall near $0$. The harmonic mean in F1 is small whenever either is small, so F1 rewards balance; it ignores the true negatives entirely, which suits problems such as search or information extraction where negatives are abundant and uninteresting.

::: example Reading a confusion matrix {#ex-confusion}
A classifier is tested on $2000$ examples with the counts $\mathrm{TP} = 205$, $\mathrm{FP} = 101$, $\mathrm{FN} = 287$, $\mathrm{TN} = 1407$ (these come from the listing in [[#sec-code]]). Compute accuracy, precision, recall, specificity and F1, and the accuracy of a classifier that always predicts negative.
::: solution
There are $205 + 287 = 492$ positives ($24.6\%$). Accuracy is $(205 + 1407)/2000 = 0.806$; precision $205/306 = 0.670$; recall $205/492 = 0.417$; specificity $1407/1508 = 0.933$; F1 $= 2\cdot0.670\cdot0.417/(0.670 + 0.417) = 0.514$. Always predicting negative scores accuracy $1508/2000 = 0.754$, only $5$ points worse, with recall $0$. The model finds fewer than half the positives: whether that is acceptable depends entirely on what a missed positive costs.
:::
:::

### Base rates {#sec-base-rates}

Recall and specificity describe the classifier's behaviour *within* each class, so they do not depend on how common the classes are. Precision does, strongly.

::: proposition Precision depends on prevalence {#prop-precision}
Let $\pi$ be the fraction of positives (the **prevalence** or base rate). A classifier with true-positive rate $\mathrm{TPR}$ and false-positive rate $\mathrm{FPR}$ has, in expectation,

$$
\text{precision} = \frac{\mathrm{TPR}\cdot\pi}{\mathrm{TPR}\cdot\pi + \mathrm{FPR}\cdot(1 - \pi)},\qquad\text{accuracy} = \mathrm{TPR}\cdot\pi + (1 - \mathrm{FPR})(1 - \pi).
$$
:::

::: proof
Precision is $\Prob(y = 1\mid\hat y = 1)$. By Bayes' rule ([[math-for-ml/probability#thm-bayes]]), it is $\Prob(\hat y = 1\mid y = 1)\Prob(y = 1)/\Prob(\hat y = 1)$, with $\Prob(\hat y = 1) = \mathrm{TPR}\cdot\pi + \mathrm{FPR}\cdot(1 - \pi)$ by the law of total probability. Accuracy is $\Prob(\hat y = y) = \Prob(\hat y = 1\mid y = 1)\pi + \Prob(\hat y = 0\mid y = 0)(1 - \pi)$.
:::

::: example A good test for a rare condition {#ex-rare}
A screening classifier has sensitivity $0.95$ and specificity $0.95$, and the condition affects $1\%$ of the population screened. What fraction of positive results are real?
::: solution
By [[#prop-precision]], precision $= 0.95\cdot0.01/(0.95\cdot0.01 + 0.05\cdot0.99) = 0.0095/0.059 = 0.161$. Five out of six positive results are false alarms, although the classifier is "95% accurate" on both classes. In natural frequencies: of $10{,}000$ people, $100$ have the condition and $95$ of them test positive; of the $9900$ who do not, $495$ test positive. The same classifier at a prevalence of $50\%$ would have precision $0.95$.
:::
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.95
specificity: 0.95
caption: The screening example [[#ex-rare]] as natural frequencies. Raise the prevalence and precision climbs quickly, with sensitivity and specificity unchanged; raise the specificity from $0.95$ to $0.99$ and precision roughly triples. When positives are rare, false positives from the large negative class dominate — which is why a classifier's precision measured on a balanced test set says little about its precision in deployment.
:::

## Thresholds and the ROC curve {#sec-roc}

Most classifiers output a **score** — a probability or a logit — and become classifiers only when a **threshold** $t$ is chosen: predict positive when the score exceeds $t$. Every threshold gives a different confusion matrix. The right threshold depends on the costs of the two kinds of error.

::: proposition The cost-minimising threshold {#prop-threshold}
Suppose the score $p(\mathbf{x})$ is the true probability $\Prob(y = 1\mid\mathbf{x})$, a false positive costs $c_{\text{FP}} > 0$, a false negative costs $c_{\text{FN}} > 0$, and correct predictions cost nothing. Then the rule minimising the expected cost predicts positive exactly when

$$
p(\mathbf{x}) > \frac{c_{\text{FP}}}{c_{\text{FP}} + c_{\text{FN}}}.
$$
:::

::: proof
As in [[ml-fundamentals/learning-problem#prop-bayes]], minimise the conditional expected cost separately at each $\mathbf{x}$. Predicting positive costs $c_{\text{FP}}$ with probability $1 - p$, so its expected cost is $(1 - p)c_{\text{FP}}$; predicting negative has expected cost $pc_{\text{FN}}$. Positive is cheaper when $(1 - p)c_{\text{FP}} < pc_{\text{FN}}$, that is $p(c_{\text{FP}} + c_{\text{FN}}) > c_{\text{FP}}$.
:::

Equal costs give the familiar threshold $1/2$; if a missed positive is nine times as costly as a false alarm, the threshold drops to $0.1$. The proposition assumes that the scores are calibrated probabilities ([[#sec-calibration]]); for uncalibrated scores, the threshold has to be tuned on validation data instead. When costs are not known, or differ between users, it is better to describe the classifier at *all* thresholds at once.

::: definition ROC curve and AUC {#def-roc}
The **receiver operating characteristic** (ROC) curve of a scoring classifier plots the true-positive rate against the false-positive rate as the threshold $t$ decreases from $+\infty$ (nothing flagged: the point $(0, 0)$) to $-\infty$ (everything flagged: $(1, 1)$). The **area under the curve** (AUC, or AUROC) summarises it in one number between $0$ and $1$. A random scorer has AUC $1/2$ (the diagonal), a perfect one AUC $1$.
:::

The AUC has a simple probabilistic meaning, which also gives the best way to compute it.

::: theorem The AUC is a ranking probability {#thm-auc}
Let $S^+$ be the score of a randomly chosen positive example and $S^-$ that of a randomly chosen negative, independent. Then

$$
\operatorname{AUC} = \Prob(S^+ > S^-) + \tfrac12\Prob(S^+ = S^-).
$$

On a test set with $n_+$ positives and $n_-$ negatives, the empirical AUC is the fraction of the $n_+n_-$ positive–negative pairs that the scores order correctly (ties counting $\frac12$), the Mann–Whitney $U$ statistic divided by $n_+n_-$.
:::

::: proof
We give the argument for a finite test set without ties. Sort the examples by decreasing score and lower the threshold past them one at a time. Passing a positive raises the TPR by $1/n_+$ (a vertical step), passing a negative raises the FPR by $1/n_-$ (a horizontal step). The area under this staircase is the sum, over the horizontal steps, of their width $1/n_-$ times their height, the TPR at that moment. When the threshold passes a negative example, the TPR equals the fraction of positives scored above that negative. So the area is $\frac1{n_-}\sum_{\text{negatives }j}\frac{\#\{\text{positives above }j\}}{n_+}$, the fraction of correctly ordered pairs. A tie between a positive and a negative turns one step into a diagonal segment, contributing half a pair. Applying this to the population instead of a sample gives the probability statement.
:::

So the AUC measures how well the scores **rank** positives above negatives, independent of any threshold and of the class proportions, and unchanged by any increasing transformation of the scores. Those are its strengths and its limits: a model can have an excellent AUC and badly calibrated probabilities, and AUC averages over thresholds that may be irrelevant in practice. With rare positives, the **precision–recall curve** (precision against recall over thresholds) is often more informative, because it shows directly how many false alarms each found positive costs.

::: example An AUC by hand {#ex-auc}
Three positives have scores $0.8, 0.7, 0.3$, and three negatives $0.5, 0.2, 0.1$. Compute the AUC, and the TPR and FPR at threshold $0.4$.
::: solution
Of the $9$ positive–negative pairs, the positive $0.8$ beats all three negatives, $0.7$ beats all three, and $0.3$ beats $0.2$ and $0.1$ but not $0.5$: $8$ correct pairs, so $\operatorname{AUC} = 8/9 = 0.889$. At threshold $0.4$ the flagged examples are $0.8$, $0.7$ (positives) and $0.5$ (negative), so $\mathrm{TPR} = 2/3$ and $\mathrm{FPR} = 1/3$.
:::
:::

## Calibration and proper scoring rules {#sec-calibration}

A classifier that outputs probabilities makes a stronger claim than one that outputs labels, and the claim can be checked.

::: definition Calibration {#def-calibration}
A probabilistic classifier with output $p(\mathbf{x})$ is **calibrated** if $\Prob\big(y = 1\mid p(\mathbf{x}) = q\big) = q$ for every $q$: among all inputs to which it assigns probability $q$, a fraction $q$ are positive. A **reliability diagram** plots, for bins of predicted probability, the observed frequency of positives against the mean prediction; a calibrated model lies on the diagonal. The **expected calibration error** with bins $B_1, \dots, B_M$ is

$$
\operatorname{ECE} = \sum_{m=1}^M\frac{\lvert B_m\rvert}{n}\,\Big\lvert\overline{p}(B_m) - \overline{y}(B_m)\Big\rvert,
$$

the bin-weighted average gap between mean confidence and observed frequency.
:::

Calibration and discrimination are different properties. Predicting the base rate $\pi$ for everyone is perfectly calibrated and useless for ranking (AUC $1/2$); multiplying every logit of a good model by $3$ leaves its ranking and AUC unchanged and ruins its calibration. Guo, Pleiss, Sun and Weinberger (2017) found that modern deep classifiers are often overconfident, and that a single scalar fix, **temperature scaling** — dividing all logits by a constant $T$ fitted on validation data by maximum likelihood — largely repairs them without changing any prediction's rank. For large language models, calibration of the next-token probabilities and of expressed confidence is an active evaluation topic ([[evaluation/evaluation-principles]]).

How should probabilistic predictions be scored? A good scoring rule should reward honesty: a forecaster who believes the probability is $q$ should do best, in expectation, by reporting $q$.

::: definition Proper scoring rules {#def-proper}
A **scoring rule** $\ell(p, y)$ assigns a loss to the reported probability $p$ of the event $y = 1$ when the outcome is $y\in\{0, 1\}$. It is **proper** if, for every $q\in[0, 1]$, the expected loss $\E_{y\sim\text{Bernoulli}(q)}\ell(p, y)$ is minimised at $p = q$, and **strictly proper** if $p = q$ is the unique minimiser. The two standard rules are the **log loss** $-y\log p - (1 - y)\log(1 - p)$ and the **Brier score** $(p - y)^2$.
:::

::: proposition The log loss and Brier score are strictly proper {#prop-proper}
For both rules, the expected loss under $y\sim\text{Bernoulli}(q)$ is uniquely minimised at $p = q$. Accuracy, viewed as the score $[\,[p > 1/2]\ne y\,]$, is proper but not strictly proper.
:::

::: proof
Brier: $\E(p - y)^2 = q(p - 1)^2 + (1 - q)p^2 = p^2 - 2qp + q = (p - q)^2 + q(1 - q)$, uniquely minimised at $p = q$. Log loss: $-q\log p - (1 - q)\log(1 - p)$ is the cross-entropy of Bernoulli$(p)$ relative to Bernoulli$(q)$, which equals the entropy of Bernoulli$(q)$ plus $D_{\text{KL}}(q\,\Vert\,p)$, uniquely minimised at $p = q$ by Gibbs' inequality ([[math-for-ml/information-theory#thm-gibbs]]). For the 0–1 score, the expected loss is $1 - q$ for any $p > 1/2$ and $q$ for any $p\le1/2$; reporting $p = q$ achieves the minimum $\min(q, 1 - q)$, but so does every other $p$ on the same side of $1/2$, so the minimiser is not unique.
:::

Strict propriety is why cross-entropy is the training loss of probabilistic classifiers: it is minimised by the true conditional probabilities ([[ml-fundamentals/learning-problem]], exercise 10). The Brier decomposition in the proof, $(p - q)^2 + q(1 - q)$, also shows how such scores combine calibration (the first term, zero for honest forecasts) with the intrinsic uncertainty of the event (the second term, which no forecaster can remove). The log loss punishes confident mistakes without limit; the Brier score is bounded by $1$ and more forgiving.

::: example Scoring two forecasters {#ex-brier}
Two weather models forecast rain on four days that turn out rain, dry, rain, dry. Model A says $0.9, 0.1, 0.6, 0.4$ and model B says $0.99, 0.01, 0.99, 0.99$. Compare accuracy, Brier score and log loss.
::: solution
With threshold $1/2$, A's predictions are rain, dry, rain, dry — all correct, accuracy $1$; B's are rain, dry, rain, rain — accuracy $3/4$.

Brier: A has $(0.01 + 0.01 + 0.16 + 0.16)/4 = 0.085$; B has $(0.0001 + 0.0001 + 0.0001 + 0.9801)/4 = 0.2451$.

Log loss: A has $-(\ln0.9 + \ln0.9 + \ln0.6 + \ln0.6)/4 = (0.105 + 0.105 + 0.511 + 0.511)/4 = 0.308$; B has $(3\cdot0.0101 + 4.605)/4 = 1.159$. B's single confident mistake costs $-\ln0.01 = 4.6$ nats, more than all of A's losses together. Both proper rules prefer A by a wide margin.
:::
:::

## Uncertainty in a measured metric {#sec-uncertainty}

A metric computed on a test set is an estimate. For accuracy on $n$ independent test examples, the number of correct answers is binomial, the standard error is $\sqrt{p(1 - p)/n}$, and the normal-approximation ("Wald") interval is $\hat p\pm1.96\sqrt{\hat p(1 - \hat p)/n}$ ([[math-for-ml/estimation#def-ci]]). That interval misbehaves for small $n$ or $\hat p$ near $0$ or $1$ — with $0$ errors in $50$ trials it is the single point $\{0\}$. A better closed form inverts the test rather than plugging in $\hat p$.

::: definition Wilson score interval {#def-wilson}
For $k$ successes in $n$ trials with $\hat p = k/n$ and normal quantile $z$ ($1.96$ for $95\%$), the **Wilson interval** is the set of $p$ satisfying $\lvert\hat p - p\rvert\le z\sqrt{p(1 - p)/n}$:

$$
\frac{\hat p + \frac{z^2}{2n}}{1 + \frac{z^2}{n}}\ \pm\ \frac{z}{1 + \frac{z^2}{n}}\sqrt{\frac{\hat p(1 - \hat p)}{n} + \frac{z^2}{4n^2}}.
$$
:::

For any metric without a convenient formula — F1, AUC, ECE, a difference of two models' scores — the **bootstrap** (Efron, 1979) gives intervals by simulation: draw $n$ test examples *with replacement* from the test set, recompute the metric, repeat $B$ times (say $1000$), and take the $2.5\%$ and $97.5\%$ quantiles of the $B$ values. It treats the test set as a stand-in for the population, and it assumes, like everything here, that test examples are independent; when they come in groups (several questions about one document, several turns of one conversation), resample whole groups.

::: widget confidence
dist: bernoulli
n: 200
level: 0.95
intervals: 60
method: z
caption: Sixty simulated test sets of $200$ examples each, each giving a $95\%$ Wald interval for a classifier's accuracy. About $57$ of the $60$ intervals cover the true accuracy. With $n = 200$ each interval is about $\pm7$ percentage points wide for accuracies near $0.5$: two models whose accuracies differ by $3$ points cannot be told apart on such a test set by comparing their intervals.
:::

### Comparing two models {#sec-comparing}

When two classifiers are evaluated on the same test examples their errors are correlated — hard examples are hard for both — and comparing their separate intervals wastes that information. The paired analysis of [[math-for-ml/estimation#ex-compare]] looks only at the examples on which they disagree.

::: proposition McNemar's test {#prop-mcnemar}
Let $b$ be the number of test examples that model A gets right and model B wrong, and $c$ the number that B gets right and A wrong. If the two models have the same accuracy and test examples are independent, then conditional on $b + c$, $b\sim\Bin(b + c, 1/2)$, and for large $b + c$ the statistic

$$
\chi^2 = \frac{(b - c)^2}{b + c}
$$

has approximately a chi-squared distribution with one degree of freedom. The difference is significant at the $5\%$ level when $\chi^2 > 3.84$.
:::

::: proof
Examples on which the models agree carry no information about which is better and are set aside. Under the null hypothesis that the models have the same accuracy, each discordant example is equally likely to favour A or B, independently, so $b$ given $b + c = m$ is $\Bin(m, 1/2)$, with mean $m/2$ and variance $m/4$. By the central limit theorem $(b - m/2)/\sqrt{m/4} = (b - c)/\sqrt{b + c}$ is approximately standard normal, and its square is approximately $\chi^2_1$, whose $95\%$ quantile is $1.96^2 = 3.84$.
:::

::: example A paired comparison {#ex-mcnemar}
Model A scores $72\%$ and model B $70\%$ on the same $1000$ questions. A alone is right on $60$ questions, B alone on $40$. Is A significantly better?
::: solution
$\chi^2 = (60 - 40)^2/100 = 4.0 > 3.84$, so the difference is (barely) significant at the $5\%$ level, with $p\approx0.046$. Treating the two accuracies as independent would give $z\approx0.99$ and no significance ([[math-for-ml/estimation#ex-compare]]): the paired test is far more sensitive, because $900$ shared outcomes say nothing about the difference. But a $p$-value of $0.046$ from one of many comparisons is weak evidence (see the warning below).
:::
:::

::: warning One test set, many decisions
Every time a test set informs a decision — which model, which prompt, which checkpoint, which threshold — its numbers become a little optimistic, and with enough decisions they become meaningless. Twenty comparisons at the $5\%$ level produce about one false "significant" result even when nothing differs. Report how many configurations were tried; correct for multiple comparisons (dividing the significance level by the number of tests, the Bonferroni correction, is crude but safe); fix the evaluation protocol before looking at results; and keep a final test set that is used once. A single summary number also invites optimisation of the number rather than the goal (**Goodhart's law**): report several complementary metrics and look at errors by hand.
:::

## Beyond binary classification {#sec-other-metrics}

**Many classes.** Accuracy extends directly; **top-$k$ accuracy** counts a prediction correct if the true class is among the $k$ most probable. Precision, recall and F1 are computed per class (that class against the rest) and averaged: the **macro** average weights every class equally, so rare classes count as much as common ones; the **micro** average pools the counts of all classes first, so it is dominated by common classes (and for single-label problems equals accuracy). Log loss is the cross-entropy of [[ml-fundamentals/logistic-regression#def-softmax-regression]].

**Regression.** The mean squared error and its square root (RMSE, in the units of $y$), the mean absolute error (less sensitive to outliers; its minimiser is the median, [[ml-fundamentals/learning-problem]], exercise 7), and $R^2$ ([[ml-fundamentals/linear-regression#def-r2]]), which compares with predicting the mean and can be negative on test data.

**Language models.** The intrinsic metric is the per-token cross-entropy on held-out text, usually reported as **perplexity**, its exponential ([[math-for-ml/information-theory#def-perplexity]], [[text-and-language/perplexity]]); it is the log loss of next-token prediction and comparable only between models with the same tokeniser (or normalised per byte). The extrinsic metrics are the accuracies, pass rates and human judgements of benchmarks, which bring all the problems of this chapter at large scale — small test sets, many comparisons, contamination and correlated items ([[evaluation/evaluation-statistics]]).

::: quiz
A fraud detector has AUC $0.95$ on a test set where $0.1\%$ of transactions are fraudulent. Which conclusion is justified?
- [ ] At a threshold of $0.5$, about $95\%$ of flagged transactions are fraudulent
- [ ] The detector's predicted probabilities are well calibrated
- [x] A randomly chosen fraudulent transaction is scored above a randomly chosen legitimate one about $95\%$ of the time
- [ ] The detector's accuracy is about $95\%$
::: solution
By [[#thm-auc]] the AUC is the probability of ranking a random positive above a random negative. It says nothing about calibration or about any particular threshold; and with $0.1\%$ prevalence, even a small false-positive rate makes most flags false alarms ([[#prop-precision]]). Accuracy is not determined by AUC: always predicting "legitimate" has accuracy $99.9\%$.
:::
:::

## A complete evaluation {#sec-code}

The listing simulates a classifier whose scores are informative but overconfident: each example has a true log-odds $z\sim\Normal(-1.5, 1.5^2)$ and label drawn with probability $\sigma(z)$, but the model reports $\sigma(2.5z)$, as if its logits had been multiplied by $2.5$. It computes the metrics of this chapter on $2000$ test examples, fits a temperature on a separate validation set of $2000$, and gives a bootstrap interval for the accuracy. Only the standard library is used.

```python
import math, random

rng = random.Random(7)
sig = lambda z: 1 / (1 + math.exp(-z))

def sample(n):
    """True log-odds z ~ N(-1.5, 1.5^2); label ~ Bernoulli(sigma(z)); the model reports sigma(2.5 z)."""
    out = []
    for _ in range(n):
        z = rng.gauss(-1.5, 1.5)
        y = int(rng.random() < sig(z))
        out.append((sig(2.5 * z), y))                 # an overconfident model
    return out

def confusion(D, t=0.5):
    tp = sum(p > t and y == 1 for p, y in D); fp = sum(p > t and y == 0 for p, y in D)
    fn = sum(p <= t and y == 1 for p, y in D); tn = sum(p <= t and y == 0 for p, y in D)
    return tp, fp, fn, tn

def auc(D):
    """P(score of a random positive > score of a random negative), ties counting 1/2."""
    pos = sorted(p for p, y in D if y == 1); neg = sorted(p for p, y in D if y == 0)
    wins, j = 0.0, 0
    for s in pos:                                     # count negatives below s (scores are continuous)
        while j < len(neg) and neg[j] < s:
            j += 1
        wins += j
    return wins / (len(pos) * len(neg))

def ece(D, bins=10):
    """Expected calibration error: bin-weighted |mean confidence - observed frequency|."""
    total = 0.0
    for b in range(bins):
        B = [(p, y) for p, y in D if b / bins <= p < (b + 1) / bins or (b == bins - 1 and p == 1)]
        if B:
            total += len(B) / len(D) * abs(sum(p for p, _ in B) / len(B) - sum(y for _, y in B) / len(B))
    return total

brier = lambda D: sum((p - y) ** 2 for p, y in D) / len(D)
logloss = lambda D: -sum(math.log(p if y else 1 - p) for p, y in D) / len(D)

def report(name, D):
    tp, fp, fn, tn = confusion(D)
    prec, rec = tp / (tp + fp), tp / (tp + fn)
    print(f"{name}: acc {(tp + tn) / len(D):.3f}  precision {prec:.3f}  recall {rec:.3f}  "
          f"F1 {2 * prec * rec / (prec + rec):.3f}  AUC {auc(D):.3f}")
    print(f"{' ' * len(name)}  log loss {logloss(D):.3f}  Brier {brier(D):.3f}  ECE {ece(D):.3f}")

val, test = sample(2000), sample(2000)
print("prevalence", sum(y for _, y in test) / len(test), " confusion (tp, fp, fn, tn)", confusion(test))
report("raw   ", test)

# Temperature scaling: divide the logit by T, choosing T on the validation set
logit = lambda p: math.log(p / (1 - p))
rescale = lambda D, T: [(sig(logit(p) / T), y) for p, y in D]
T = min((k / 10 for k in range(5, 51)), key=lambda T: logloss(rescale(val, T)))
print("temperature T =", T)
report("scaled", rescale(test, T))

# Bootstrap 95% interval for the test accuracy
accs = []
for _ in range(1000):
    B = [test[rng.randrange(len(test))] for _ in range(len(test))]
    tp, fp, fn, tn = confusion(B)
    accs.append((tp + tn) / len(B))
accs.sort()
print("bootstrap 95% interval for accuracy:", round(accs[24], 3), "to", round(accs[974], 3))
```

```text
prevalence 0.246  confusion (tp, fp, fn, tn) (205, 101, 287, 1407)
raw   : acc 0.806  precision 0.670  recall 0.417  F1 0.514  AUC 0.819
        log loss 0.562  Brier 0.149  ECE 0.105
temperature T = 2.5
scaled: acc 0.806  precision 0.670  recall 0.417  F1 0.514  AUC 0.819
        log loss 0.425  Brier 0.136  ECE 0.018
bootstrap 95% interval for accuracy: 0.789 to 0.824
```

Temperature scaling recovers the distortion exactly ($T = 2.5$) and changes no label and no ranking — accuracy, precision, recall, F1 and AUC are identical before and after — while the calibration error drops from $0.105$ to $0.018$ and both proper scores improve. Only the probability metrics could see the problem. The bootstrap interval, $[0.789, 0.824]$, agrees with the formula $0.806\pm1.96\sqrt{0.806\cdot0.194/2000} = 0.806\pm0.017$. The threshold $1/2$ was arbitrary: with calibrated probabilities, [[#prop-threshold]] gives the threshold for any costs.

::: history
The ROC curve comes from radar signal detection in the Second World War and its analysis by Peterson, Birdsall and Fox (1954), and entered psychology through Green and Swets's *Signal Detection Theory and Psychophysics* (1966); Hanley and McNeil (1982) popularised the AUC in medicine and its identity with the Mann–Whitney statistic (Mann and Whitney, 1947; Wilcoxon, 1945). Precision and recall come from information retrieval (Kent et al., 1955; Cleverdon's Cranfield experiments in the 1960s), and van Rijsbergen's *Information Retrieval* (1979) defined the F-measure. Glenn Brier proposed his score for weather forecasts in 1950, I. J. Good the logarithmic score in 1952, and Allan Murphy's decomposition (1973) and DeGroot and Fienberg's analysis (1983) made calibration a standard part of forecast verification. Edwin Wilson's interval dates from 1927, Quinn McNemar's test from 1947, and Bradley Efron's bootstrap from 1979. Platt (1999) introduced logistic recalibration of classifier scores, of which temperature scaling (Guo et al., 2017) is a one-parameter special case.
:::

::: summary
- The confusion matrix gives accuracy, precision (how often an alarm is right), recall (how many positives are caught), specificity and F1; choose the metrics that match the costs of the errors.
- Precision depends on prevalence, recall and specificity do not: for rare positives even a good classifier's alarms are mostly false, and accuracy is dominated by the majority class.
- With calibrated probabilities the cost-minimising threshold is $c_{\text{FP}}/(c_{\text{FP}} + c_{\text{FN}})$. The ROC curve shows all thresholds; its area is the probability of ranking a positive above a negative.
- Calibration (do predicted probabilities match frequencies?) is separate from discrimination (do scores rank well?). Log loss and the Brier score are strictly proper and measure both; temperature scaling fixes overconfidence without changing ranks.
- Every metric needs an interval (Wilson for proportions, the bootstrap for anything); compare models on the same examples with a paired test such as McNemar's, and account for the number of comparisons made.
:::

## Exercises

::: exercise Precision, recall and F1 {level=1 check="8/11"}
A classifier has $\mathrm{TP} = 40$, $\mathrm{FP} = 10$, $\mathrm{FN} = 20$ and $\mathrm{TN} = 930$. Compute precision, recall and F1. What is F1?
::: solution
Precision $= 40/50 = 0.8$, recall $= 40/60 = 2/3$, and $\mathrm{F1} = 2\cdot0.8\cdot\frac23/(0.8 + \frac23) = (16/15)/(22/15) = 8/11\approx0.727$. Accuracy is $970/1000 = 0.97$, a much rosier number.
:::
:::

::: exercise The majority classifier {level=1 check="0.97"}
In a data set, $3\%$ of transactions are fraudulent. What accuracy does the classifier that always predicts "not fraud" achieve, and what are its recall and precision?
::: solution
Accuracy $0.97$; recall $0$, since no fraud is ever flagged; precision is undefined ($0/0$), since nothing is flagged. Any model must be compared against this baseline, not against $50\%$.
:::
:::

::: exercise Precision at a low base rate {level=1 check="0.9*0.02/(0.9*0.02+0.05*0.98)"}
A content filter has recall $0.9$ and false-positive rate $0.05$, and $2\%$ of the items it sees are harmful. What fraction of flagged items are actually harmful?
::: solution
By [[#prop-precision]], $0.9\cdot0.02/(0.9\cdot0.02 + 0.05\cdot0.98) = 0.018/0.067 = 0.269$. About three in four flags are false alarms.
:::
:::

::: exercise A threshold from costs {level=2 check="1/5"}
A missed positive costs four times as much as a false alarm. With calibrated probabilities, above which predicted probability should a case be flagged?
::: solution
By [[#prop-threshold]], $c_{\text{FP}}/(c_{\text{FP}} + c_{\text{FN}}) = 1/(1 + 4) = 1/5$.
:::
:::

::: exercise An AUC from scores {level=2 check="7/9"}
Positives have scores $0.9, 0.6, 0.4$ and negatives $0.7, 0.3, 0.2$. Compute the AUC.
::: solution
Counting correctly ordered pairs ([[#thm-auc]]): $0.9$ beats all three negatives ($3$), $0.6$ beats $0.3$ and $0.2$ ($2$), $0.4$ beats $0.3$ and $0.2$ ($2$). That is $7$ of $9$ pairs, $\operatorname{AUC} = 7/9\approx0.778$.
:::
:::

::: exercise A Brier score {level=2 check="0.49/3"}
Predicted probabilities $0.8, 0.3, 0.6$ are given for three events, of which only the first happened. What is the Brier score?
::: solution
$\big((0.8 - 1)^2 + (0.3 - 0)^2 + (0.6 - 0)^2\big)/3 = (0.04 + 0.09 + 0.36)/3 = 0.49/3\approx0.163$.
:::
:::

::: exercise No errors observed {level=2 check="1-0.05^(1/300)"}
A system makes no errors on $300$ independent test cases. Find the largest error rate $p$ for which observing zero errors still has probability at least $0.05$ — a one-sided $95\%$ upper bound — and compare it with the "rule of three" $3/n$.
::: solution
Zero errors has probability $(1 - p)^{300}$. Setting $(1 - p)^{300} = 0.05$ gives $p = 1 - 0.05^{1/300} = 0.00994$. Since $\log(1 - p)\approx-p$ for small $p$, $p\approx-\log0.05/n = 2.996/n$, which is the rule of three: $3/300 = 0.01$. Zero observed errors are compatible with an error rate of up to about $1\%$; the Wald interval, which collapses to $\{0\}$, would wrongly suggest certainty.
:::
:::

::: exercise McNemar's statistic {level=2 check="5"}
On a shared test set, model A is right and B wrong on $30$ examples, and B right and A wrong on $15$. Compute McNemar's statistic. Is the difference significant at the $5\%$ level?
::: solution
$\chi^2 = (30 - 15)^2/(30 + 15) = 225/45 = 5 > 3.84$: significant at the $5\%$ level (the $p$-value is about $0.025$), provided this was a single planned comparison.
:::
:::

::: exercise Calibrated but useless, accurate but miscalibrated {level=3}
(a) Show that the constant predictor $p(\mathbf{x}) = \pi$, where $\pi$ is the prevalence, is perfectly calibrated, and find its AUC and its Brier score. (b) A model predicts probability $0.99$ for every input on which it predicts the positive class and $0.01$ for every other input; its accuracy is $0.9$ on both classes, and the prevalence is $1/2$. Compute its ECE with two bins, and its Brier score. Compare.
::: solution
(a) Among inputs given probability $\pi$ — all of them — the fraction of positives is $\pi$, so the predictor is calibrated. All scores tie, so every positive–negative pair counts $\frac12$ and the AUC is $\frac12$. The Brier score is $\E(\pi - y)^2 = \pi(1 - \pi)^2 + (1 - \pi)\pi^2 = \pi(1 - \pi)$.

(b) The inputs scored $0.99$ are positive $90\%$ of the time (since precision equals $0.9$ when accuracy on both classes is $0.9$ and the classes are balanced), so that bin has gap $\lvert0.99 - 0.9\rvert = 0.09$; similarly the $0.01$ bin has gap $\lvert0.01 - 0.1\rvert = 0.09$. The ECE is $0.09$. Its Brier score is $0.9\cdot0.01^2 + 0.1\cdot0.99^2 = 0.098$. The constant predictor with $\pi = \frac12$ has Brier score $0.25$, worse, though its ECE is $0$. Reporting $0.9$ and $0.1$ instead would make the model calibrated, with Brier score $0.9\cdot0.01 + 0.1\cdot0.81 = 0.09$ — better than both, as strict propriety demands.
:::
:::

::: exercise Deriving the Wilson interval {level=3}
Starting from the condition $\lvert\hat p - p\rvert\le z\sqrt{p(1 - p)/n}$, derive the formula of [[#def-wilson]] and show that the interval always lies inside $[0, 1]$. Evaluate it for $k = 0$ successes in $n = 50$ trials with $z = 1.96$.
::: solution
Square: $(\hat p - p)^2\le z^2p(1 - p)/n$, that is $p^2(1 + z^2/n) - p(2\hat p + z^2/n) + \hat p^2\le0$. This quadratic in $p$ has positive leading coefficient, so the solutions form the interval between its roots,

$$
p = \frac{2\hat p + z^2/n\pm\sqrt{(2\hat p + z^2/n)^2 - 4\hat p^2(1 + z^2/n)}}{2(1 + z^2/n)}.
$$

The discriminant simplifies to $4z^2\hat p(1 - \hat p)/n + z^4/n^2$, and dividing through by $2$ gives the stated centre $(\hat p + z^2/2n)/(1 + z^2/n)$ and half-width. For $p < 0$ or $p > 1$ the right-hand side $z^2p(1 - p)/n$ of the squared condition is negative while the left-hand side is not, so no such $p$ satisfies it: the interval lies within $[0, 1]$. For $k = 0$, $n = 50$: $z^2/n = 0.0768$, the centre is $0.0384/1.0768 = 0.0357$ and the half-width $(1.96/1.0768)\sqrt{3.8416/10000} = 0.0357$, so the interval is $[0, 0.0713]$, a sensible upper bound of about $7\%$ where the Wald interval gives $[0, 0]$.
:::
:::
