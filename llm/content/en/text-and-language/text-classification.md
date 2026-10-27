Is this e-mail spam? Is this review positive or negative? Is this news story about sport, business or politics? Does this customer want to cancel an order or change one? Who wrote this paragraph? Each question asks for one label from a fixed set, given a piece of text, and together such **text classification** tasks are the most widely deployed application of natural-language processing. They are also the simplest setting in which to see how text is turned into features, how a model of language becomes a decision, and how to tell whether a classifier really works.

This chapter builds the two classical classifiers on **bag-of-words** features — **naive Bayes**, a generative model, and **logistic (softmax) regression**, a discriminative one — shows that both are linear in word counts, trains them on paragraphs from three public-domain novels, and evaluates them with precision, recall, $F_1$, confidence intervals and a paired significance test. It then explains how embeddings ([[text-and-language/word-embeddings]]) and neural networks extend the same recipe, up to fine-tuned Transformers and prompted language models, and closes with the ways text classifiers fail: negation, domain shift and shortcut features.

## The task {#sec-task}

::: definition Text classification {#def-textclf}
A **text classification** task has a set of documents (strings) $\mathcal{X}$ and a finite set of **classes** $\mathcal{Y} = \{1, \dots, K\}$. A **classifier** is a function $h\colon\mathcal{X}\to\mathcal{Y}$, usually obtained from a model of the conditional distribution $p(y\mid x)$ by $h(x) = \arg\max_yp(y\mid x)$. It is learned from labelled examples $(x_1, y_1), \dots, (x_n, y_n)$ and judged on held-out examples. With $K = 2$ the task is **binary**; in **multi-label** classification a document may have several labels, and one binary classifier per label is the usual approach.
:::

Common tasks are **sentiment analysis** (positive, negative, sometimes neutral or a star rating), **topic classification** (news categories, subject codes for papers), **intent detection** in dialogue systems (*book a flight*, *cancel*, *ask for help*), **spam and abuse filtering**, **language identification** and **authorship attribution**. Standard benchmarks include IMDb movie reviews (Maas et al., 2011; $50{,}000$ reviews labelled positive or negative), the Stanford Sentiment Treebank (Socher et al., 2013) and AG News (Zhang, Zhao and LeCun, 2015; four news categories). The general methodology — features, models, losses, validation — is that of [[ml-fundamentals/learning-problem]]; what is specific to text is how documents become vectors.

## Bag-of-words features {#sec-bow}

::: definition Bag of words and tf–idf {#def-bow}
Fix a vocabulary $\mathcal{V} = \{w_1, \dots, w_V\}$. The **bag-of-words** representation of a document $x$ is the vector $\mathbf{x}\in\R^V$ with $x_j = $ the number of occurrences of $w_j$ in $x$ (or its indicator $\mathbf{1}[w_j\in x]$ for **binary** features). Word order is discarded. The **tf–idf** weighting multiplies each count by the **inverse document frequency** $\operatorname{idf}(w) = \log\frac{n}{\operatorname{df}(w)}$, where $n$ is the number of training documents and $\operatorname{df}(w)$ the number that contain $w$, so that words occurring in every document get weight $0$.
:::

::: example tf–idf by hand {#ex-tfidf}
A collection has three documents: $d_1$ = *the whale the sea*, $d_2$ = *the ship*, $d_3$ = *the whale*. Compute the idf of each word (natural logarithm) and the tf–idf vector of $d_1$ over the vocabulary (*the*, *whale*, *sea*, *ship*).
::: solution
*the* is in all three documents: $\operatorname{idf} = \ln(3/3) = 0$. *whale* is in two: $\ln(3/2) = 0.405$. *sea* and *ship* are in one each: $\ln3 = 1.099$. The counts of $d_1$ are $(2, 1, 1, 0)$, so its tf–idf vector is $(0, 0.405, 1.099, 0)$. The most frequent word of the document has disappeared, and the rarest word in the collection carries the most weight.
:::
:::

Bag-of-words vectors are very high-dimensional and very sparse: a vocabulary of $50{,}000$ words, a document of $200$. The representation throws away order — *dog bites man* and *man bites dog* are identical — yet for many classification tasks the words present are most of the evidence, and order can be partly recovered by adding **bigram** features (*not good* as a single feature). The representation is the one-hot feature map of [[ml-fundamentals/representations]], summed over a document.

## Naive Bayes {#sec-nb}

A generative classifier models how documents of each class are produced and inverts the model with Bayes' theorem. Naive Bayes uses the simplest language model there is, the unigram model of [[text-and-language/ngram-models]], one per class.

::: definition Multinomial naive Bayes {#def-nb}
The **multinomial naive Bayes** model assumes that a document of class $y$ is a sequence of tokens drawn independently from a class-specific unigram distribution $\theta_y$ over $\mathcal{V}$:

$$
p(y\mid x)\ \propto\ \pi_y\prod_{t=1}^{T}\theta_{y, x_t} = \pi_y\prod_{j=1}^{V}\theta_{y, j}^{\,x_j},
$$

where $\pi_y$ is the class prior and $x_j$ the count of word $j$. The parameters are estimated by counting, with add-one smoothing: $\hat\pi_y = n_y/n$ and $\hat\theta_{y, j} = \big(c_y(w_j) + 1\big)/\big(\sum_ic_y(w_i) + V\big)$, where $c_y(w)$ is the number of occurrences of $w$ in training documents of class $y$. Words outside $\mathcal{V}$ are ignored.
:::

The "naive" assumption — that words are independent given the class — is plainly false (*San* and *Francisco* are not independent given any topic), and it makes the model's probabilities badly calibrated: evidence from correlated words is counted many times, so the posterior is pushed towards $0$ or $1$. But classification needs only the arg max, and the decision rule turns out to be a linear one.

::: proposition Naive Bayes is a linear classifier {#prop-nb-linear}
For two classes, the naive Bayes log-odds is an affine function of the bag-of-words vector:

$$
\log\frac{p(y = 1\mid x)}{p(y = 0\mid x)} = \underbrace{\log\frac{\pi_1}{\pi_0}}_{b} + \sum_{j=1}^{V}x_j\underbrace{\log\frac{\theta_{1, j}}{\theta_{0, j}}}_{w_j} = b + \mathbf{w}\cdot\mathbf{x},
$$

so the classifier predicts class $1$ exactly when $\mathbf{w}\cdot\mathbf{x} + b > 0$. With $K$ classes, $\arg\max_y\big(\log\pi_y + \mathbf{x}\cdot\log\boldsymbol\theta_y\big)$ is a linear multi-class classifier.
:::

::: proof
Take the logarithm of the model for each class: $\log p(y\mid x) = \log\pi_y + \sum_jx_j\log\theta_{y, j} - \log Z(x)$, where $Z(x)$ is the normalising constant, which is the same for every class. Subtracting the expressions for $y = 1$ and $y = 0$ cancels $\log Z(x)$ and gives the formula. The $K$-class case is the same without the subtraction.
:::

Each word contributes a fixed weight per occurrence, the log ratio of its probabilities under the two classes. A word equally common in both classes has weight near $0$; a word that occurs mostly in one class has a large weight of the corresponding sign.

::: example Naive Bayes by hand {#ex-nb}
Train naive Bayes on four tiny reviews — positive: *great food*, *great fun*; negative: *bad food*, *not great* — and classify *not great* and *great food*.
::: solution
The vocabulary is $\{\textit{great}, \textit{food}, \textit{fun}, \textit{bad}, \textit{not}\}$, $V = 5$, and the priors are $\tfrac12$ each. Each class has $4$ tokens: positive *great* $2$, *food* $1$, *fun* $1$; negative *bad* $1$, *food* $1$, *not* $1$, *great* $1$. With add-one smoothing the denominators are $4 + 5 = 9$.

*not great*: positive $\tfrac12\cdot\tfrac{0+1}{9}\cdot\tfrac{2+1}{9} = \tfrac{1}{54}$; negative $\tfrac12\cdot\tfrac{1+1}{9}\cdot\tfrac{1+1}{9} = \tfrac{2}{81}$. Normalising, $p(\text{neg}\mid\textit{not great}) = \frac{2/81}{1/54 + 2/81} = \frac47 = 0.571$: negative, but only just — *great* still argues for positive.

*great food*: positive $\tfrac12\cdot\tfrac39\cdot\tfrac29 = \tfrac{1}{27}$; negative $\tfrac12\cdot\tfrac29\cdot\tfrac29 = \tfrac{2}{81}$; $p(\text{pos}) = \frac{1/27}{1/27 + 2/81} = 0.6$. In the linear form, $w_{\textit{great}} = \log\frac{3/9}{2/9} = \log1.5$, $w_{\textit{food}} = \log1 = 0$ and $w_{\textit{not}} = \log\frac{1/9}{2/9} = -\log2$; the negation counts only as a word with a negative weight.
:::
:::

## Logistic and softmax regression {#sec-logreg}

A discriminative classifier models $p(y\mid x)$ directly. On bag-of-words features, **logistic regression** ([[ml-fundamentals/logistic-regression]]) sets $p(y = 1\mid x) = \sigma(\mathbf{w}\cdot\mathbf{x} + b)$, and **softmax regression** sets $p(y\mid x) = \operatorname{softmax}(W\mathbf{x} + \mathbf{b})_y$ for $K$ classes. The parameters are fitted by minimising the cross-entropy loss plus an $L_2$ penalty,

$$
\mathcal{L}(W, \mathbf{b}) = -\frac1n\sum_{i=1}^{n}\log p(y_i\mid x_i) + \frac{\lambda}{2}\norm{W}_F^2,\qquad\frac{\partial\mathcal{L}}{\partial\mathbf{w}_k} = \frac1n\sum_{i=1}^{n}\big(p(k\mid x_i) - \mathbf{1}[y_i = k]\big)\mathbf{x}_i + \lambda\mathbf{w}_k,
$$

the gradient being the familiar "prediction minus target, times input" ([[ml-fundamentals/logistic-regression]]). The loss is convex, so gradient descent finds the global minimum; for sparse $\mathbf{x}_i$ each example touches only the weights of the words it contains.

The decision rules of naive Bayes and logistic regression have exactly the same form, $\arg\max_y(\mathbf{w}_y\cdot\mathbf{x} + b_y)$. They differ in how the weights are chosen: naive Bayes sets each weight from that word's counts alone, as if words were independent, while logistic regression fits all weights jointly to maximise the conditional likelihood, so that correlated words share the credit. Ng and Jordan (2002) compared such generative–discriminative pairs and found, theoretically and empirically, that the discriminative model has lower asymptotic error, while the generative model approaches its (higher) asymptotic error with fewer training examples — so naive Bayes often wins on small training sets and logistic regression on large ones. Wang and Manning (2012) combined the two by using naive Bayes log-count ratios as features for a discriminative classifier, a strong baseline for sentiment.

::: widget plot
f: 1/(1+exp(-(a*x+c)))
x: -6, 6
y: 0, 1
sliders: a=1:0.1:5:0.1; c=0:-4:4:0.1
labels: $p(y = 1\mid x) = \sigma(a\,s + c)$
caption: A linear text classifier turns the score $s = \mathbf{w}\cdot\mathbf{x}$ (horizontal axis) into a probability by the logistic function. The weight scale $a$ sets how confident the model is per unit of evidence, and the bias $c$ shifts the decision boundary $p = 0.5$. Naive Bayes, which counts correlated words as independent evidence, behaves like a model with too large an $a$: its decisions may be good while its probabilities are overconfident.
:::

## Who wrote this paragraph? {#sec-experiment}

As a real experiment, here is authorship attribution among three public-domain novels from Project Gutenberg: *Moby-Dick* by Herman Melville (eBook #2701), *Pride and Prejudice* by Jane Austen (#1342, an illustrated edition whose captions are filtered out) and *Frankenstein* by Mary Shelley (#84). Each document is a paragraph of at least $20$ words; $400$ are sampled per author, $900$ are used for training and $300$ for testing. Naive Bayes uses counts, softmax regression binary features; the last lines run a paired significance test on the two classifiers' errors.

```python
import re, math, random, collections

def paragraphs(path):
    raw = open(path, encoding="utf-8").read()
    text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
    out = []
    for p in re.split(r"\n\s*\n", text):
        if "[Illustration" in p or "]" in p:          # drop illustration captions (Pride and Prejudice)
            continue
        words = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*", p.lower())
        if len(words) >= 20:
            out.append(words)
    return out

books = {"Melville": "pg2701.txt", "Austen": "pg1342.txt", "Shelley": "pg84.txt"}
rng = random.Random(0)
docs = []
for label, path in books.items():
    ps = paragraphs(path)
    print(f"{label:<8} {len(ps)} paragraphs of >= 20 words")
    docs += [(p, label) for p in rng.sample(ps, 400)]  # 400 per author
rng.shuffle(docs)
train, test = docs[:900], docs[900:]
labels = sorted(books)

# ---- multinomial naive Bayes, add-one smoothing ----
vocab = {w for p, _ in train for w in p}
count = {y: collections.Counter() for y in labels}
for p, y in train:
    count[y].update(p)
total = {y: sum(count[y].values()) for y in labels}
prior = collections.Counter(y for _, y in train)
def nb_predict(p):
    def logpost(y):
        s = math.log(prior[y] / len(train))
        for w in p:
            if w in vocab:
                s += math.log((count[y][w] + 1) / (total[y] + len(vocab)))
        return s
    return max(labels, key=logpost)

# ---- softmax regression on binary bag-of-words features, L2, full-batch gradient descent ----
feats = lambda p: set(w for w in p if w in vocab)
F = [feats(p) for p, _ in train]
W = {y: collections.defaultdict(float) for y in labels}
b = {y: 0.0 for y in labels}
lr, lam = 1.0, 1e-4
def probs(f):
    z = {y: b[y] + sum(W[y][w] for w in f) for y in labels}
    m = max(z.values())
    e = {y: math.exp(z[y] - m) for y in labels}
    s = sum(e.values())
    return {y: e[y] / s for y in labels}
for epoch in range(100):
    grad = {y: collections.defaultdict(float) for y in labels}
    gb = {y: 0.0 for y in labels}
    for f, (_, t) in zip(F, train):
        p = probs(f)
        for y in labels:
            g = (p[y] - (y == t)) / len(train)        # d loss / d score_y
            gb[y] += g
            for w in f:
                grad[y][w] += g
    for y in labels:
        for w in set(W[y]) | set(grad[y]):
            W[y][w] -= lr * (grad[y][w] + lam * W[y][w])
        b[y] -= lr * gb[y]
lr_predict = lambda p: max(labels, key=lambda y: probs(feats(p))[y])

def report(name, predict):
    pairs = [(predict(p), y) for p, y in test]
    acc = sum(a == y for a, y in pairs) / len(pairs)
    f1s = []
    for c in labels:
        tp = sum(a == c and y == c for a, y in pairs)
        fp = sum(a == c and y != c for a, y in pairs)
        fn = sum(a != c and y == c for a, y in pairs)
        prec, rec = tp / (tp + fp), tp / (tp + fn)
        f1s.append(2 * prec * rec / (prec + rec))
    print(f"{name:<20} accuracy {acc:.3f}  macro-F1 {sum(f1s) / len(f1s):.3f}  "
          + "  ".join(f"{c} F1 {f:.3f}" for c, f in zip(labels, f1s)))
report("naive Bayes", nb_predict)
report("softmax regression", lr_predict)
for y in labels:
    top = sorted(W[y].items(), key=lambda kv: -kv[1])[:6]
    print(f"top features for {y}:", ", ".join(w for w, _ in top))

# ---- McNemar's exact test on the discordant test paragraphs ----
nb_ok = [nb_predict(p) == y for p, y in test]
lr_ok = [lr_predict(p) == y for p, y in test]
n10 = sum(a and not c for a, c in zip(nb_ok, lr_ok))   # NB right, LR wrong
n01 = sum(c and not a for a, c in zip(nb_ok, lr_ok))   # LR right, NB wrong
n = n10 + n01
p = min(1.0, 2 * sum(math.comb(n, i) for i in range(min(n10, n01) + 1)) / 2 ** n)
print(f"discordant: NB-only correct {n10}, LR-only correct {n01}; exact two-sided p = {p:.4f}")
```

```text
Melville 1974 paragraphs of >= 20 words
Austen   1562 paragraphs of >= 20 words
Shelley  689 paragraphs of >= 20 words
naive Bayes          accuracy 0.957  macro-F1 0.956  Austen F1 0.964  Melville F1 0.974  Shelley F1 0.930
softmax regression   accuracy 0.913  macro-F1 0.912  Austen F1 0.929  Melville F1 0.915  Shelley F1 0.892
top features for Austen: she, mr, her, elizabeth, be, miss
top features for Melville: whale, now, ship, though, all, ahab
top features for Shelley: my, me, i, which, father, justine
discordant: NB-only correct 15, LR-only correct 2; exact two-sided p = 0.0023
```

Both classifiers identify the author of more than nine paragraphs in ten from vocabulary alone, and here naive Bayes is better (accuracy $0.957$ against $0.913$) — a small training set, as Ng and Jordan's analysis predicts, and a softmax model trained for only $100$ full-batch steps. The top features show what the models use: pronouns and function words (Austen's *she*, *her* and *be*, Shelley's first-person narrator *my*, *me*, *i*), topic words (*whale*, *ship*) and character names (*Elizabeth*, *Ahab*, *Justine*). Function words are classic stylistic evidence; character names are a **shortcut** that would not survive a test on other books by the same authors.

## Evaluating classifiers {#sec-evaluation}

Accuracy is the fraction of correct predictions. It is misleading when classes are imbalanced — a spam filter that never flags anything is $99\%$ accurate if $1\%$ of mail is spam — so per-class measures are used ([[ml-fundamentals/evaluation-metrics]]).

::: definition Precision, recall and $F_1$ {#def-f1}
For a class $c$, let $\mathrm{TP}$ be the number of test documents predicted $c$ that are $c$, $\mathrm{FP}$ the number predicted $c$ that are not, and $\mathrm{FN}$ the number of documents of class $c$ predicted otherwise. Then

$$
\text{precision} = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FP}},\qquad\text{recall} = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FN}},\qquad F_1 = \frac{2\cdot\text{precision}\cdot\text{recall}}{\text{precision} + \text{recall}}.
$$

**Macro-averaged** $F_1$ is the unweighted mean of the per-class $F_1$ scores; **micro-averaged** $F_1$ pools the counts of all classes first (for single-label multi-class classification it equals accuracy).
:::

$F_1$ is the harmonic mean of precision and recall, which is dominated by the smaller of the two: a classifier cannot score well by maximising one at the expense of the other.

::: example Precision, recall and $F_1$ {#ex-f1}
A spam filter flags $50$ messages in a test set, of which $40$ are spam; the test set contains $60$ spam messages in all. Compute precision, recall and $F_1$ for the spam class.
::: solution
$\mathrm{TP} = 40$, $\mathrm{FP} = 10$, $\mathrm{FN} = 60 - 40 = 20$. Precision $40/50 = 0.8$, recall $40/60 = 0.667$, $F_1 = \frac{2\cdot0.8\cdot0.667}{0.8 + 0.667} = 0.727$ — below the arithmetic mean $0.733$, and closer to the smaller value.
:::
:::

::: widget plot
f: 2*P*x/(P+x); (P+x)/2
x: 0, 1
y: 0, 1
sliders: P=0.9:0.05:1:0.01
labels: $F_1$ at precision $P$, against recall; arithmetic mean
caption: $F_1$ as a function of recall (horizontal axis) at a fixed precision $P$ (slider), compared with the arithmetic mean of precision and recall. At $P = 0.9$ and recall $0.1$ the arithmetic mean is $0.5$ but $F_1$ is only $0.18$: the harmonic mean refuses to reward a classifier that finds almost nothing.
:::

A test score is an estimate from a finite sample, and with test sets of a few hundred documents its uncertainty is large. Treating the $n$ test predictions as independent trials, a normal-approximation $95\%$ confidence interval for accuracy $\hat a$ is $\hat a\pm1.96\sqrt{\hat a(1 - \hat a)/n}$: for $\hat a = 0.957$ and $n = 300$, $\pm0.023$. To compare two classifiers *on the same test set* one should not simply check whether the intervals overlap; the errors are paired, and **McNemar's test** looks only at the documents on which the classifiers disagree. Under the null hypothesis that they are equally accurate, each discordant document is equally likely to favour either, so the number favouring one of them is $\operatorname{Binomial}(n_{01} + n_{10}, \tfrac12)$. In the experiment, $15$ paragraphs were classified correctly by naive Bayes only and $2$ by softmax regression only, giving an exact two-sided $p = 0.0023$: the difference is unlikely to be chance — on this test set, for these training choices. Statistics for evaluating models are covered in [[evaluation/evaluation-statistics]].

::: widget plot
f: 1.96*sqrt(p*(1-p)/x)
x: 50, 5000
y: 0, 0.15
sliders: p=0.9:0.5:0.99:0.01
labels: half-width of the 95% interval for accuracy $p$ on $n$ test documents
caption: The half-width $1.96\sqrt{p(1-p)/n}$ of a normal-approximation confidence interval for test accuracy, against the test-set size $n$. With $300$ documents and accuracy $0.9$ it is $\pm0.034$; halving it needs four times as many documents. Differences of a point or two between classifiers on small test sets are often noise.
:::

::: quiz
On a test set that is $95\%$ class A and $5\%$ class B, a classifier predicts A for every document. Which statements are true?
- [x] Its accuracy is $0.95$
- [x] Its recall for class B is $0$
- [ ] Its macro-averaged $F_1$ is $0.95$
- [ ] Its precision for class A is $1$
::: solution
Accuracy is $0.95$. For B there are no true positives, so recall is $0$ (and $F_1$ for B is $0$, taking $0/0$ precision as $0$). For A, precision is $0.95$ (every document is predicted A, $95\%$ correctly) and recall $1$, so $F_1 = 0.974$; the macro average is $(0.974 + 0)/2 = 0.487$, which exposes the useless classifier that accuracy hides.
:::
:::

## Embeddings and neural classifiers {#sec-neural}

Bag-of-words classifiers know nothing about a word not seen in labelled training data: if *superb* never occurred in a training review, it carries no weight, however similar it is to *excellent*. Word embeddings trained on unlabelled text supply that knowledge.

The simplest embedding classifier averages the vectors of a document's words and applies a linear classifier to the average. **fastText** (Joulin, Grave, Bojanowski and Mikolov, 2017) trains exactly this model — embeddings and classifier together, with word bigrams as extra features — and matched much slower neural classifiers on several topic and sentiment benchmarks while training in seconds to minutes on a CPU.

::: proposition An averaging classifier is a constrained bag-of-words classifier {#prop-average}
Let $E\in\R^{V\times d}$ hold word embeddings as rows, and score a document of $T$ tokens with bag-of-words vector $\mathbf{x}$ by $\mathbf{u}\cdot\bar{\mathbf{e}}$, where $\bar{\mathbf{e}} = \frac1T\sum_tE_{x_t}$ is its mean embedding and $\mathbf{u}\in\R^d$. Then the score equals $\frac1T(E\mathbf{u})\cdot\mathbf{x}$: a bag-of-words linear classifier, on length-normalised counts, whose weight vector $E\mathbf{u}$ lies in the $d$-dimensional column space of $E$.
:::

::: proof
$\sum_tE_{x_t} = E\T\mathbf{x}$, since each word $j$ contributes its row $E_j$ once per occurrence, $x_j$ times. So $\mathbf{u}\cdot\bar{\mathbf{e}} = \frac1T\mathbf{u}\cdot E\T\mathbf{x} = \frac1T(E\mathbf{u})\cdot\mathbf{x}$. The vector $E\mathbf{u}$ is a linear combination of the $d$ columns of $E$.
:::

::: example A word never seen with a label {#ex-average}
Two-dimensional embeddings, learned from unlabelled text, are *excellent* $(1, 0.2)$, *superb* $(0.9, 0.3)$, *awful* $(-1, 0.1)$ and *film* $(0, 1)$. A sentiment classifier trained only on documents containing *excellent* and *awful* has learned $\mathbf{u} = (2, 0)$ and bias $0$. What weight does it give *superb*, and what probability of being positive does it give the document *superb film*?
::: solution
By [[#prop-average]] the weight of a word is its embedding dotted with $\mathbf{u}$: *superb* gets $0.9\cdot2 + 0.3\cdot0 = 1.8$, close to *excellent*'s $2$, although no labelled document contained it; *film* gets $0$. The mean embedding of *superb film* is $(0.45, 0.65)$, the score $0.45\cdot2 = 0.9$, and $p(\text{pos}) = \sigma(0.9) = 0.711$. A bag-of-words classifier trained on the same labelled data would give *superb* weight $0$ and the document probability $0.5$.
:::
:::

The proposition explains both the strength and the limitation. The weight of each word is $\mathbf{E}_j\cdot\mathbf{u}$, so words with similar embeddings get similar weights — *superb* inherits a positive weight from *excellent* even if it was never labelled. But the model is still linear in counts and ignores order. **Convolutional** classifiers (Kim, 2014) apply learned filters to windows of consecutive embeddings, which can detect phrases such as *not good*; recurrent networks ([[sequence-models/recurrent-networks]]) read the whole sequence.

Since about 2018 the dominant approach has been **transfer from pretrained language models**: ULMFiT (Howard and Ruder, 2018) fine-tuned a pretrained recurrent language model for classification, and BERT (Devlin et al., 2019) fine-tuned a pretrained Transformer encoder by adding a softmax layer on its representation of a special classification token. Fine-tuned Transformers set the state of the art on the standard benchmarks. Large language models can also classify with no task-specific training at all, given an instruction and perhaps a few labelled examples in the prompt ([[prompting-rag/in-context-learning]]), or produce sentence embeddings for a light-weight classifier ([[prompting-rag/text-embeddings]]). As of 2026, which approach is preferable depends on the amount of labelled data, the cost and latency budget and the need for calibration and auditability; a tf–idf logistic regression remains a fast, transparent baseline that every new system should be compared with.

## How text classifiers fail {#sec-failures}

**Negation and composition.** *Not good* is negative, *not bad* mildly positive, *not only good but excellent* strongly positive. A bag of words sees *not* as one more word, as in [[#ex-nb]]. Pang, Lee and Vaithyanathan (2002), in an early study of machine-learned sentiment classification, marked words following a negation (*not good* → *not NOT_good*); models of sentence structure and contextual representations handle composition far better, but negation remains a standard probe of failure.

**Domain shift.** A classifier trained on reviews of films and tested on reviews of kitchen appliances loses accuracy: *unpredictable* is praise for a plot and a complaint about a toaster. Labels themselves drift — what counts as spam, or as an abusive message, changes over time.

**Shortcuts and annotation artefacts.** A model learns whatever separates the labels in its training data, including features unrelated to the intended task: character names in the experiment above, the presence of a URL in spam data collected in a particular way, or, in crowd-sourced natural-language-inference data, words such as *not* and *nobody* that annotators tended to use when writing contradictions, which let a classifier that reads only the hypothesis guess the label far above chance (Gururangan et al., 2018; Poliak et al., 2018). High test accuracy on data from the same source does not show that the model solves the task.

::: warning A good test score is not a working classifier
A test set drawn from the same collection as the training data measures performance on that collection. Before trusting a text classifier, look at its highest-weighted features or its errors, test it on data from the setting where it will be used, and check performance separately on subgroups that matter (dialects, languages, topics) — a classifier with high average accuracy can fail systematically for a minority of inputs. Labels are also noisy: when annotators disagree on $10\%$ of examples, accuracies above about $90\%$ on that data cannot be interpreted at face value.
:::

::: history
Maron (1961) proposed a probabilistic, naive-Bayes-like method for indexing documents into subject categories. Mosteller and Wallace (1963, 1964) attributed the twelve disputed *Federalist Papers* to James Madison by Bayesian analysis of the rates of function words such as *upon*, *whilst* and *by* — a founding study of authorship attribution and of Bayesian statistics in practice. Salton's SMART system (1960s–70s) introduced vector-space document representations and term weighting, and Spärck Jones (1972) proposed inverse document frequency. Joachims (1998) showed that support vector machines on tf–idf features worked well for text categorisation, Sahami, Dumais, Heckerman and Horvitz (1998) applied naive Bayes to spam filtering, and Pang, Lee and Vaithyanathan (2002) brought machine learning to sentiment analysis. Kim (2014) applied convolutional networks over word embeddings, Joulin et al. (2017) released fastText, and Howard and Ruder (2018) and Devlin et al. (2019) established fine-tuning of pretrained language models as the standard method.
:::

::: summary
- Text classification maps a document to one of $K$ labels: sentiment, topic, intent, spam, language, author.
- Bag-of-words features count words and ignore order; tf–idf downweights words common to all documents; bigram features recover some order.
- Multinomial naive Bayes is a class-conditional unigram language model; its log-odds is linear in word counts, each word weighing $\log(\theta_{1, j}/\theta_{0, j})$. Logistic and softmax regression have the same linear form but fit the weights jointly by minimising cross-entropy.
- On paragraphs of Melville, Austen and Shelley, both reach over $90\%$ accuracy; naive Bayes is better with this small training set ($0.957$ against $0.913$; McNemar $p = 0.0023$), using function words, topic words and character names.
- Use precision, recall, $F_1$ and macro averages for imbalanced classes, report confidence intervals, and compare classifiers on the same test set with paired tests.
- Averaging embeddings gives a bag-of-words classifier whose weights are smooth over similar words; convolutional, recurrent and, above all, fine-tuned pretrained Transformers (and prompted language models) capture composition.
- Negation, domain shift, shortcut features and label noise are the typical failures; test on the data and subgroups that matter.
:::

## Exercises

::: exercise Bag-of-words vectors {level=1 check="2"}
With vocabulary (*the*, *cat*, *sat*, *on*, *mat*), write the bag-of-words vector of *the cat sat on the mat* and its binary version. What is the count feature for *the*?
::: solution
Counts $(2, 1, 1, 1, 1)$, binary $(1, 1, 1, 1, 1)$. The count of *the* is $2$.
:::
:::

::: exercise An idf weight {level=1 check="ln(1000/10)"}
In a collection of $1{,}000$ documents, the word *harpoon* appears in $10$. Compute its idf with the natural logarithm, and that of a word that appears in every document.
::: solution
$\ln(1000/10) = \ln100 = 4.605$. A word in every document has $\operatorname{idf} = \ln1 = 0$ and is ignored by tf–idf.
:::
:::

::: exercise Precision and recall {level=1 check="40/60"}
In [[#ex-f1]], what is the recall of the spam filter? How many spam messages does it miss?
::: solution
Recall $40/60 = 0.667$; it misses $20$ of the $60$ spam messages.
:::
:::

::: exercise A naive Bayes weight {level=2 check="ln(1.5)"}
In [[#ex-nb]], compute the linear weight $w_{\textit{great}} = \ln(\theta_{\text{pos}, \textit{great}}/\theta_{\text{neg}, \textit{great}})$ and use the linear form to recompute $p(\text{pos}\mid\textit{great food})$.
::: solution
$\theta_{\text{pos}, \textit{great}} = 3/9$ and $\theta_{\text{neg}, \textit{great}} = 2/9$, so $w_{\textit{great}} = \ln1.5 = 0.405$. $w_{\textit{food}} = \ln\frac{2/9}{2/9} = 0$ and $b = \ln1 = 0$. The log-odds is $0.405$, so $p = \sigma(0.405) = 1.5/2.5 = 0.6$, as before.
:::
:::

::: exercise A confidence interval {level=2 check="1.96*sqrt(0.913*0.087/300)"}
Softmax regression had accuracy $0.913$ on the $300$ test paragraphs. Compute the half-width of the normal-approximation $95\%$ confidence interval, and explain why the overlap of this interval with naive Bayes's ($0.957\pm0.023$) does not by itself show that the classifiers are equally good.
::: solution
$1.96\sqrt{0.913\cdot0.087/300} = 0.032$, so the interval is $[0.881, 0.945]$; naive Bayes's is $[0.934, 0.980]$, and the two overlap on $[0.934, 0.945]$. Overlapping intervals are not a test of a difference: the two accuracies are measured on the same documents and their errors are strongly correlated (most paragraphs are easy for both). McNemar's test uses only the $17$ discordant paragraphs and finds the difference significant.
:::
:::

::: exercise McNemar by hand {level=2 check="2*(1+15+105)/2^15"}
Two classifiers disagree on $15$ test documents: classifier A is right on $13$ of them and B on $2$. Compute the exact two-sided McNemar $p$-value.
::: solution
Under the null hypothesis the number of discordant documents won by B is $\operatorname{Binomial}(15, \tfrac12)$. $\Prob(\le2) = \big(\binom{15}{0} + \binom{15}{1} + \binom{15}{2}\big)/2^{15} = (1 + 15 + 105)/32{,}768 = 0.00369$; doubling for a two-sided test, $p = 0.0074$.
:::
:::

::: exercise Naive Bayes with binary features is still linear {level=2}
In **Bernoulli naive Bayes** each word $j$ is present in a document of class $y$ independently with probability $\phi_{y, j}$, and absent words also count as evidence. Show that the log-odds is again affine in the binary bag-of-words vector, and identify the weights and the bias.
::: solution
$\log p(x\mid y) = \sum_j\big(x_j\log\phi_{y, j} + (1 - x_j)\log(1 - \phi_{y, j})\big)$. The log-odds is $\log\frac{\pi_1}{\pi_0} + \sum_j\log\frac{1 - \phi_{1, j}}{1 - \phi_{0, j}} + \sum_jx_j\Big(\log\frac{\phi_{1, j}}{\phi_{0, j}} - \log\frac{1 - \phi_{1, j}}{1 - \phi_{0, j}}\Big)$. So the weights are $w_j = \log\frac{\phi_{1, j}(1 - \phi_{0, j})}{\phi_{0, j}(1 - \phi_{1, j})}$ (a log odds ratio) and the bias collects the prior and the "all absent" term. Unlike the multinomial model, absent words contribute through the bias.
:::
:::

::: exercise Calibration of naive Bayes {level=3}
A document consists of the word *excellent* repeated $m$ times, and $\log(\theta_{1, \textit{excellent}}/\theta_{0, \textit{excellent}}) = 1$ with equal priors. Compute $p(y = 1\mid x)$ under naive Bayes for $m = 1, 3, 10$. Then suppose that in reality the copies are perfectly correlated — the document is no more informative than one occurrence. What does this say about naive Bayes probabilities, and how could they be recalibrated?
::: solution
The log-odds is $m$, so $p = \sigma(m)$: $0.731$, $0.953$ and $0.99995$. If the copies carry no more information than one, the correct posterior is $0.731$ throughout; naive Bayes counts correlated evidence repeatedly and becomes overconfident, as real documents (with repeated and correlated words) also make it. Its ranking of documents can still be good. Recalibration fits a monotone map from the naive Bayes score to probabilities on held-out data — for instance Platt scaling, $p = \sigma(a\,s + c)$ with $a$ and $c$ fitted by logistic regression on the score $s$ (the widget in [[#sec-logreg]] with $a < 1$), or isotonic regression.
:::
:::

::: exercise A negation feature {level=3}
Implement the negation-marking preprocessing of Pang et al. (prefix `NOT_` to every word after *not*, *no* or *never* up to the next punctuation mark), apply it to the training data of [[#ex-nb]], retrain naive Bayes by hand, and reclassify *not great*. Then explain one case where the heuristic fails.
::: solution
```python
import re
def mark_negation(text):
    out, neg = [], False
    for tok in re.findall(r"\w+|[.,;:!?]", text.lower()):
        if tok in ".,;:!?":
            neg = False; out.append(tok)
        elif tok in ("not", "no", "never"):
            neg = True; out.append(tok)
        else:
            out.append("NOT_" + tok if neg else tok)
    return out
print(mark_negation("not great"), mark_negation("great food, not bad at all"))
```

```text
['not', 'NOT_great'] ['great', 'food', ',', 'not', 'NOT_bad', 'NOT_at', 'NOT_all']
```

The training reviews become positive *great food*, *great fun*; negative *bad food*, *not NOT_great*. The vocabulary is now $\{\textit{great}, \textit{food}, \textit{fun}, \textit{bad}, \textit{not}, \textit{NOT\_great}\}$, $V = 6$, with $4$ tokens per class and denominators $10$. For *not great* → *not NOT_great*: positive $\tfrac12\cdot\tfrac1{10}\cdot\tfrac1{10} = 0.005$; negative $\tfrac12\cdot\tfrac2{10}\cdot\tfrac2{10} = 0.02$; $p(\text{neg}) = 0.8$, up from $0.571$, because the positive evidence of *great* is gone. The heuristic fails when negation does not scope over the following words — *not only good but excellent* marks *NOT_good*, *NOT_but*, *NOT_excellent* and turns praise into apparent criticism — and it misses negation expressed without these words (*hardly*, *fails to*, *lacks*).
:::
:::

::: exercise tf–idf nearest neighbours {level=3}
Explain why, for comparing documents by cosine similarity, tf–idf vectors usually work better than raw counts, using the *Moby-Dick*, *Pride and Prejudice* and *Frankenstein* paragraphs as an example. What happens to the cosine similarity of two paragraphs that share only the words *the*, *and* and *of*?
::: solution
Raw count vectors are dominated by the most frequent words, which are function words shared by all paragraphs of all three books ([[text-and-language/text-as-data#prop-coverage]]: the top $100$ types cover half of the tokens). Two unrelated paragraphs therefore have a large cosine similarity simply because both contain many *the*, *and* and *of*. Words that occur in almost every document have idf close to $0$, so tf–idf removes this shared mass and leaves the distinctive words (*whale*, *Elizabeth*, *creature*), whose overlap actually indicates related content. Two paragraphs that share only *the*, *and* and *of* have a substantial cosine with counts but a cosine near $0$ with tf–idf. (For authorship, by contrast, the rates of function words are informative, which is why classifiers are trained rather than relying on unweighted similarity.)
:::
:::
