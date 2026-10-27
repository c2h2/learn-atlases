To an $n$-gram model, *cat* and *dog* are as different as *cat* and *carburettor*: each word is a separate symbol with its own counts, and nothing learned about one transfers to another. Yet every speaker knows that *cat* and *dog* are similar, and could tell from a sentence like *I fed the ___ and took it to the vet* that the missing word is an animal. That intuition is the starting point of this chapter: words that occur in similar contexts have similar meanings, so a word can be represented by its contexts, and contexts can be compressed into a short vector of real numbers — a **word embedding** — in which similar words lie close together.

The chapter builds embeddings in two ways that turn out to be closely related. **Count-based** methods tabulate co-occurrences, reweight them by **pointwise mutual information** and compress the table by a truncated singular value decomposition. **Prediction-based** methods train vectors to predict contexts: **word2vec** (Mikolov et al., 2013) with skip-gram and negative sampling, which is trained by hand below, and **GloVe** (Pennington et al., 2014). Levy and Goldberg's (2014) theorem shows that skip-gram with negative sampling implicitly factorises a shifted PMI matrix, uniting the two. The chapter ends with the geometry of embedding spaces — similarity, analogies — how embeddings are evaluated, and what they reveal about associations, including social stereotypes, present in their training text. Embeddings are the input layer of every neural language model ([[transformers/self-attention]]), and the contextual embeddings of later courses ([[sequence-models/contextual-embeddings]]) extend the same idea.

## The distributional hypothesis {#sec-distributional}

Zellig Harris (1954) argued that the meaning of linguistic units is reflected in their **distribution** — the contexts in which they occur — so that words with similar distributions have similar meanings. J. R. Firth (1957) put it memorably: "You shall know a word by the company it keeps." The hypothesis is not a definition of meaning; it is an empirical claim that distributional similarity correlates with semantic similarity, and it is what makes meaning learnable from raw text.

::: definition Co-occurrence matrix {#def-cooc}
Fix a vocabulary of **target words** $\mathcal{V}$ and of **context words** $\mathcal{C}$ (often the same set), and a **window** of $L$ tokens on each side. The **co-occurrence count** $\#(w, c)$ is the number of times $c$ occurs within $L$ tokens of an occurrence of $w$ in the corpus. The matrix $M\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{C}\rvert}$ with entries $M_{wc} = \#(w, c)$ is the **co-occurrence matrix**; row $w$ is the **distributional vector** of $w$. We write $\#(w) = \sum_c\#(w, c)$, $\#(c) = \sum_w\#(w, c)$ and $D = \sum_{w, c}\#(w, c)$.
:::

Rows of $M$ can be compared by the cosine of the angle between them.

::: definition Cosine similarity {#def-cosine}
For non-zero vectors $\mathbf{u}, \mathbf{v}\in\R^d$, the **cosine similarity** is

$$
\cos(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u}\cdot\mathbf{v}}{\norm{\mathbf{u}}\,\norm{\mathbf{v}}}\in[-1, 1].
$$

It is $1$ for vectors pointing the same way, $0$ for orthogonal vectors, and does not change when either vector is scaled by a positive number.
:::

Cosine rather than Euclidean distance is used because the length of a count vector mostly reflects how frequent the word is, not what it means.

## Pointwise mutual information {#sec-pmi}

Raw counts are dominated by frequent words: every noun co-occurs with *the*. What matters is whether $w$ and $c$ occur together **more often than chance**.

::: definition PMI and PPMI {#def-pmi}
With the empirical probabilities $P(w, c) = \#(w, c)/D$, $P(w) = \#(w)/D$ and $P(c) = \#(c)/D$, the **pointwise mutual information** of $w$ and $c$ is

$$
\operatorname{PMI}(w, c) = \log\frac{P(w, c)}{P(w)\,P(c)} = \log\frac{\#(w, c)\,D}{\#(w)\,\#(c)},
$$ {#eq-pmi}

and the **positive PMI** is $\operatorname{PPMI}(w, c) = \max\big(\operatorname{PMI}(w, c), 0\big)$, which also replaces the $-\infty$ of unseen pairs by $0$.
:::

PMI is $0$ when $w$ and $c$ co-occur exactly as often as independence would predict, positive when they attract and negative when they repel. Its expectation under $P(w, c)$ is the mutual information of [[math-for-ml/information-theory]]. Negative values are dropped in PPMI because they are unreliable: to establish that two words co-occur *less* than chance one needs enormous counts. Church and Hanks (1990) introduced PMI to lexicography as the "association ratio".

::: example PMI by hand {#ex-pmi}
In a small corpus the co-occurrence counts with three context words are

| | *pet* | *fur* | *drive* |
|---|---|---|---|
| *cat* | $8$ | $6$ | $0$ |
| *dog* | $10$ | $4$ | $1$ |
| *car* | $0$ | $0$ | $11$ |

Compute $\operatorname{PMI}(\textit{cat}, \textit{pet})$ and $\operatorname{PMI}(\textit{car}, \textit{drive})$ in bits, the PPMI vectors, and the cosine similarity of *cat* and *dog* before and after the PPMI transformation.
::: solution
$D = 40$, $\#(\textit{cat}) = 14$, $\#(\textit{dog}) = 15$, $\#(\textit{car}) = 11$, $\#(\textit{pet}) = 18$, $\#(\textit{fur}) = 10$, $\#(\textit{drive}) = 12$. Then

$$
\operatorname{PMI}(\textit{cat}, \textit{pet}) = \log_2\frac{8\cdot40}{14\cdot18} = \log_21.270 = 0.345,\qquad \operatorname{PMI}(\textit{car}, \textit{drive}) = \log_2\frac{11\cdot40}{11\cdot12} = 1.737.
$$

Computing all nine entries and clipping at $0$ gives PPMI vectors *cat* $(0.345, 0.778, 0)$, *dog* $(0.567, 0.093, 0)$ and *car* $(0, 0, 1.737)$ ($\operatorname{PMI}(\textit{dog}, \textit{drive}) = \log_2\frac{1\cdot40}{15\cdot12} = -2.17$ is clipped). The raw count vectors of *cat* and *dog* have cosine $0.961$; the PPMI vectors have cosine $0.548$, because PPMI emphasises that *cat* is associated with *fur* more than *dog* is. Both give *cat* and *car* cosine $0$.
:::
:::

PMI has a well-known bias: it is largest for rare pairs. If $w$ occurs only once, and next to $c$, then $\operatorname{PMI}(w, c) = \log(D/\#(c))$, the largest value possible for that context (exercise 10). A standard correction, from Levy, Goldberg and Dagan (2015), raises context counts to the power $\alpha = 0.75$ before normalising, $P_\alpha(c) = \#(c)^{\alpha}/\sum_{c'}\#(c')^{\alpha}$, which increases the probability of rare contexts and so decreases their PMI. Here are PPMI vectors with this smoothing for the $2{,}201$ words of *Moby-Dick* (Project Gutenberg eBook #2701) that occur at least $10$ times, with a window of $\pm2$, and each word's nearest neighbours by cosine:

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*", text.lower())
freq = collections.Counter(tokens)
keep = {w for w, c in freq.items() if c >= 10}          # words and contexts seen at least 10 times
window = 2

pair = collections.Counter()                             # #(w, c) within +-2 tokens
for i, w in enumerate(tokens):
    if w not in keep:
        continue
    for j in range(max(0, i - window), min(len(tokens), i + window + 1)):
        if j != i and tokens[j] in keep:
            pair[w, tokens[j]] += 1
nw, nc = collections.Counter(), collections.Counter()
for (w, c), n in pair.items():
    nw[w] += n; nc[c] += n
total = sum(pair.values())
alpha = 0.75                                             # context-distribution smoothing
zc = sum(v ** alpha for v in nc.values())

vec = collections.defaultdict(dict)                      # sparse PPMI vectors
for (w, c), n in pair.items():
    pmi = math.log((n / total) / ((nw[w] / total) * (nc[c] ** alpha / zc)))
    if pmi > 0:
        vec[w][c] = pmi
norm = {w: math.sqrt(sum(x * x for x in v.values())) for w, v in vec.items()}
print(len(keep), "words;", len(pair), "co-occurring pairs")

def cos(a, b):
    va, vb = vec[a], vec[b]
    if len(va) > len(vb): va, vb = vb, va
    return sum(x * vb.get(c, 0.0) for c, x in va.items()) / (norm[a] * norm[b])

for w in ["whale", "ship", "sea", "captain", "harpoon", "three", "thought"]:
    sims = sorted(((cos(w, u), u) for u in vec if u != w), reverse=True)[:5]
    print(f"{w:<8} ->", ", ".join(f"{u} {s:.2f}" for s, u in sims))
```

```text
2201 words; 194809 co-occurring pairs
whale    -> sperm 0.27, whales 0.24, fishery 0.23, porpoise 0.21, whale’s 0.21
ship     -> ships 0.22, her 0.21, pequod 0.20, nantucket 0.20, vessel 0.18
sea      -> prairie 0.19, west 0.19, on 0.18, rolling 0.18, were 0.17
captain  -> peleg 0.28, ahab 0.26, he 0.24, starbuck 0.21, bildad 0.21
harpoon  -> boat 0.18, corpse 0.17, ahab 0.16, peculiarities 0.16, arm 0.16
three    -> two 0.28, four 0.26, five 0.24, sixty 0.24, were 0.22
thought  -> i 0.25, that 0.22, seen 0.21, knew 0.20, doubt 0.19
```

From a quarter of a million words, with no supervision, the neighbours are recognisably related: numbers cluster with numbers, captains (*Peleg*, *Bildad*, *Ahab*, *Starbuck*) with *captain*, the *whale* with *sperm*, *whales*, *porpoise* and the *fishery*. Some neighbours are syntactic rather than semantic (*were*, *on*), and some are accidents of one book (the *sea* is a *prairie* in one of Melville's metaphors). Larger corpora make the neighbourhoods much cleaner.

## Dense vectors by truncated SVD {#sec-svd}

PPMI vectors are sparse and as long as the context vocabulary — tens or hundreds of thousands of dimensions. Compressing them into a few hundred dimensions both saves space and *improves* similarity estimates, because words that share no context exactly but share related contexts are pulled together. The tool is the singular value decomposition of [[math-for-ml/matrix-decompositions]].

::: definition SVD embeddings {#def-svd-emb}
Let $M = U\Sigma V\T$ be the singular value decomposition of the (PPMI) matrix $M\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{C}\rvert}$, with singular values in decreasing order. The **rank-$d$ SVD embedding** of word $w$ is row $w$ of $W = U_d\Sigma_d^{\,p}$, where $U_d$ holds the first $d$ left singular vectors, $\Sigma_d$ the first $d$ singular values, and $p\in[0, 1]$ is a weighting exponent ($p = 1$ is the classical choice; $p = 0.5$ or $0$ often work better for similarity tasks). Latent semantic analysis (Deerwester et al., 1990) applied this to word–document matrices.
:::

By the Eckart–Young theorem, $U_d\Sigma_dV_d\T$ is the best rank-$d$ approximation of $M$ in Frobenius norm. With $p = 1$, dot products between embeddings reproduce those of the best approximation: $WW\T = U_d\Sigma_d^2U_d\T = M_dM_d\T$, where $M_d = U_d\Sigma_dV_d\T$ (exercise 9). The SVD therefore keeps the dominant patterns of co-occurrence and discards the rest, which is mostly noise from sparse counts.

## word2vec: skip-gram with negative sampling {#sec-word2vec}

Mikolov, Chen, Corrado and Dean (2013) took a different route: train vectors to *predict* contexts. In the **skip-gram** model each word $w$ has a **target vector** $\mathbf{w}\in\R^d$ and a **context vector** $\mathbf{c}\in\R^d$, and the probability of seeing context $c$ near target $w$ is a softmax over the vocabulary, $p(c\mid w) = \exp(\mathbf{w}\cdot\mathbf{c})/\sum_{c'}\exp(\mathbf{w}\cdot\mathbf{c}')$. (The **CBOW** variant predicts the target from the average of its context vectors.) The softmax costs $O(\lvert\mathcal{V}\rvert)$ per prediction, so the second paper (Mikolov, Sutskever, Chen, Corrado and Dean, 2013) replaced it by a cheaper binary task.

::: definition Skip-gram with negative sampling (SGNS) {#def-sgns}
For each observed pair $(w, c)$ — a target and a word within its window — draw $k$ **negative** contexts $c_1, \dots, c_k$ independently from a noise distribution $P_n$, usually the unigram distribution raised to the power $3/4$ and renormalised. Train the vectors to tell real pairs from noise by maximising

$$
\ell(w, c) = \log\sigma(\mathbf{w}\cdot\mathbf{c}) + \sum_{i=1}^{k}\log\sigma(-\mathbf{w}\cdot\mathbf{c}_i),\qquad\sigma(x) = \frac{1}{1 + e^{-x}},
$$ {#eq-sgns}

summed over all observed pairs, by stochastic gradient ascent. After training, the target vectors (sometimes summed with the context vectors) are the embeddings.
:::

The model is a logistic regression ([[ml-fundamentals/logistic-regression]]) whose features are learned: $\sigma(\mathbf{w}\cdot\mathbf{c})$ is the predicted probability that $(w, c)$ is a real pair. The gradients are simple. Writing $g = 1 - \sigma(\mathbf{w}\cdot\mathbf{c})$ for the positive pair and $g_i = -\sigma(\mathbf{w}\cdot\mathbf{c}_i)$ for the negatives,

$$
\frac{\partial\ell}{\partial\mathbf{w}} = g\,\mathbf{c} + \sum_ig_i\,\mathbf{c}_i,\qquad\frac{\partial\ell}{\partial\mathbf{c}} = g\,\mathbf{w},\qquad\frac{\partial\ell}{\partial\mathbf{c}_i} = g_i\,\mathbf{w},
$$

so each update touches only $k + 2$ vectors (exercise 5). The original implementation also **subsamples** frequent words, discarding each occurrence of $w$ with probability $1 - \sqrt{t/f(w)}$ for a threshold $t\approx10^{-5}$ and relative frequency $f(w)$, which speeds training and improves rare words.

::: example Subsampling and the noise distribution {#ex-subsample}
(a) With threshold $t = 10^{-5}$, what fraction of the occurrences of a word with relative frequency $f = 0.05$ (about that of *the* in English) does subsampling discard? Of a word with $f = 10^{-4}$? (b) A two-word vocabulary has unigram probabilities $0.9$ and $0.1$. What probabilities does the noise distribution $P_n\propto P^{3/4}$ give them?
::: solution
(a) $1 - \sqrt{10^{-5}/0.05} = 1 - 0.0141 = 0.986$: almost $99\%$ of the occurrences of *the* are dropped, which removes most uninformative pairs. For $f = 10^{-4}$: $1 - \sqrt{0.1} = 0.684$. Words with $f\le t$ are never discarded. (b) $0.9^{0.75} = 0.924$ and $0.1^{0.75} = 0.178$; normalising, $P_n = (0.839, 0.161)$. The power $3/4$ moves noise mass towards rare words, so they are sampled as negatives more often than their frequency alone would dictate.
:::
:::

The listing trains SGNS in plain Python on a *synthetic* corpus, generated by the code itself, in which eight person words (*king*, *queen*, *prince*, *princess*, *man*, *woman*, *boy*, *girl*) each appear among words determined by three hidden attributes — gender, status and age — plus filler. The point is to see the method recover structure that we know is there. Training takes about half a minute.

```python
import math, random, collections

rng = random.Random(0)
# ---- a synthetic corpus: who someone is determines the words around them ----
people = {  # word: (gender, status, age)
    "king": ("m", "royal", "adult"), "queen": ("f", "royal", "adult"),
    "prince": ("m", "royal", "young"), "princess": ("f", "royal", "young"),
    "man": ("m", "common", "adult"), "woman": ("f", "common", "adult"),
    "boy": ("m", "common", "young"), "girl": ("f", "common", "young"),
}
words_for = {
    "m": ["he", "his", "him"], "f": ["she", "her", "hers"],
    "royal": ["crown", "throne", "palace", "court"], "common": ["house", "street", "market", "farm"],
    "adult": ["works", "rules", "married"], "young": ["plays", "learns", "school"],
}
filler = ["the", "a", "and", "in", "with", "to"]
corpus = []
for _ in range(3000):
    w = rng.choice(list(people))
    ctx = [rng.choice(words_for[f]) for f in people[w]] + [rng.choice(filler) for _ in range(2)]
    rng.shuffle(ctx)
    sent = ctx[:2] + [w] + ctx[2:]            # the person word sits in the middle of its context
    corpus.append(sent)
tokens = [t for s in corpus for t in s]
vocab = sorted(set(tokens))
idx = {w: i for i, w in enumerate(vocab)}
counts = collections.Counter(tokens)
print(len(tokens), "tokens,", len(vocab), "types")

# ---- skip-gram with negative sampling ----
d, k, window, lr, epochs = 16, 5, 2, 0.025, 10
W = [[(rng.random() - 0.5) / d for _ in range(d)] for _ in vocab]   # target vectors
C = [[0.0] * d for _ in vocab]                                       # context vectors
noise = [counts[w] ** 0.75 for w in vocab]                          # unigram^0.75 noise distribution

def sigmoid(x):
    return 1 / (1 + math.exp(-x)) if x > -30 else 0.0

for epoch in range(epochs):
    for s in corpus:
        for i, w in enumerate(s):
            for j in range(max(0, i - window), min(len(s), i + window + 1)):
                if j == i:
                    continue
                wi = idx[w]
                pairs = [(idx[s[j]], 1.0)] + [(n, 0.0) for n in rng.choices(range(len(vocab)), noise, k=k)]
                grad_w = [0.0] * d
                for c, label in pairs:
                    g = lr * (label - sigmoid(sum(a * b for a, b in zip(W[wi], C[c]))))
                    for t in range(d):
                        grad_w[t] += g * C[c][t]
                        C[c][t] += g * W[wi][t]
                for t in range(d):
                    W[wi][t] += grad_w[t]

def cos(u, v):
    return sum(a * b for a, b in zip(u, v)) / math.sqrt(sum(a * a for a in u) * sum(b * b for b in v))

def nearest(vec, exclude=(), n=3):
    sims = [(cos(vec, W[idx[w]]), w) for w in vocab if w not in exclude]
    return [(w, round(s, 3)) for s, w in sorted(sims, reverse=True)[:n]]

for w in ["king", "girl", "crown", "she"]:
    print(w, "->", nearest(W[idx[w]], exclude={w}))
for a, b, c in [("king", "man", "woman"), ("prince", "boy", "girl"), ("queen", "woman", "man"), ("man", "king", "princess")]:
    v = [x - y + z for x, y, z in zip(W[idx[a]], W[idx[b]], W[idx[c]])]
    print(f"{a} - {b} + {c} ->", nearest(v, exclude={a, b, c}, n=2))

# ---- Levy & Goldberg: at the optimum, w . c = log( #(w,c) / (k #(w) P_noise(c)) ) ----
pair = collections.Counter()
for s in corpus:
    for i, w in enumerate(s):
        for j in range(max(0, i - window), min(len(s), i + window + 1)):
            if j != i:
                pair[w, s[j]] += 1
tw = collections.Counter()
for (w, c), n in pair.items():
    tw[w] += n
Z = sum(noise)
xs, ys = [], []
for (w, c), n in pair.items():
    if n >= 20:
        xs.append(math.log(n / (k * tw[w] * noise[idx[c]] / Z)))
        ys.append(sum(a * b for a, b in zip(W[idx[w]], C[idx[c]])))
mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
r = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / math.sqrt(
    sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys))
print(f"{len(xs)} pairs seen >= 20 times: correlation {r:.3f}, mean shifted PMI {mx:.2f}, mean dot {my:.2f}")
```

```text
18000 tokens, 34 types
king -> [('queen', 0.579), ('man', 0.568), ('prince', 0.545)]
girl -> [('woman', 0.597), ('princess', 0.588), ('boy', 0.542)]
crown -> [('palace', 0.962), ('court', 0.957), ('throne', 0.955)]
she -> [('hers', 0.98), ('her', 0.977), ('he', 0.223)]
king - man + woman -> [('queen', 0.979), ('princess', 0.587)]
prince - boy + girl -> [('princess', 0.945), ('queen', 0.597)]
queen - woman + man -> [('king', 0.98), ('prince', 0.551)]
man - king + princess -> [('girl', 0.982), ('woman', 0.619)]
794 pairs seen >= 20 times: correlation 0.777, mean shifted PMI -1.36, mean dot -1.40
```

The model was never told about gender, status or age, but its vectors encode them. *crown* is closest to the other royal context words, *she* to the other feminine pronouns. The person words are all fairly similar to one another (they share filler contexts and two of three attributes with several others), and each is closest to words that differ from it in one attribute. Vector arithmetic recovers the hidden structure: *king* $-$ *man* $+$ *woman* is nearest to *queen*, and *man* $-$ *king* $+$ *princess* — remove "royal adult male", add "royal young female" — lands on *girl*. The final line tests a theorem, to which we now turn.

## SGNS factorises a shifted PMI matrix {#sec-levy-goldberg}

::: theorem SGNS and PMI (Levy and Goldberg, 2014) {#thm-sgns-pmi}
Consider the expected SGNS objective over a corpus, $\sum_{(w, c)}\#(w, c)\,\log\sigma(\mathbf{w}\cdot\mathbf{c}) + k\sum_w\#(w)\,\E_{c_N\sim P_n}\big[\log\sigma(-\mathbf{w}\cdot\mathbf{c}_N)\big]$, and suppose the dimension is large enough that each dot product $x_{wc} = \mathbf{w}\cdot\mathbf{c}$ can be chosen independently. Then the objective is maximised by

$$
x_{wc} = \log\frac{\#(w, c)}{k\,\#(w)\,P_n(c)}\quad\text{for every pair with }\#(w, c) > 0.
$$ {#eq-shifted-pmi}

With $P_n$ the unigram context distribution $\#(c)/D$, this is $x_{wc} = \operatorname{PMI}(w, c) - \log k$: the target and context matrices $W$ and $C$ factorise the PMI matrix shifted by $\log k$, $WC\T = M^{\text{PMI}} - \log k$.
:::

::: proof
Expanding the expectation, the terms of the objective involving one pair $(w, c)$ are

$$
\ell_{wc}(x) = \#(w, c)\log\sigma(x) + k\,\#(w)\,P_n(c)\log\sigma(-x),\qquad x = x_{wc},
$$

since $c$ is drawn as a negative for target $w$ with probability $P_n(c)$ in each of $k$ draws for each of the $\#(w)$ pairs with target $w$. Write $A = \#(w, c) > 0$ and $B = k\,\#(w)\,P_n(c) > 0$. Using $\frac{d}{dx}\log\sigma(x) = 1 - \sigma(x) = \sigma(-x)$ and $\frac{d}{dx}\log\sigma(-x) = -\sigma(x)$,

$$
\ell_{wc}'(x) = A\,\sigma(-x) - B\,\sigma(x) = \frac{A - Be^{x}}{1 + e^{x}},
$$

which is positive for $e^{x} < A/B$ and negative for $e^{x} > A/B$. So $\ell_{wc}$ is maximised exactly at $x = \log(A/B)$, which is [[#eq-shifted-pmi]]. Under the assumption, each $x_{wc}$ can be set to its own optimum, so this maximises the whole objective. With $P_n(c) = \#(c)/D$, $\log\frac{A}{B} = \log\frac{\#(w, c)\,D}{\#(w)\,\#(c)} - \log k = \operatorname{PMI}(w, c) - \log k$.
:::

The assumption is never exactly met — $d$ is a few hundred while the PMI matrix has rank in the tens of thousands, and pairs with $\#(w, c) = 0$ would want $x_{wc} = -\infty$ — so SGNS is better described as a *weighted, low-rank* factorisation of shifted PMI, with weights that emphasise frequent pairs. The listing's last line checks the theorem on the synthetic corpus: for the $794$ pairs seen at least $20$ times, the learned dot products correlate at $0.777$ with the right-hand side of [[#eq-shifted-pmi]] (computed with the same smoothed noise distribution), and their means agree ($-1.40$ against $-1.36$). With $d = 16$ and a vocabulary of $34$, the low-rank constraint and the stochastic training account for the rest.

::: widget plot
f: A*log(1/(1+exp(-x))) + B*log(1/(1+exp(x)))
x: -4, 6
sliders: A=30:1:100:1; B=10:1:100:1
labels: $\ell_{wc}(x) = A\log\sigma(x) + B\log\sigma(-x)$
caption: The SGNS objective for a single pair as a function of the dot product $x = \mathbf{w}\cdot\mathbf{c}$, with $A = \#(w, c)$ real co-occurrences and $B = k\,\#(w)P_n(c)$ expected negative draws. Its maximum is at $x = \log(A/B)$ — the shifted PMI of [[#thm-sgns-pmi]]: move the sliders and the peak moves to $\log A - \log B$. Pairs that co-occur more often than the noise predicts ($A > B$) want a positive dot product.
:::

::: example The optimal dot product {#ex-sgns-opt}
A target word occurs in $\#(w) = 200$ pairs, of which $\#(w, c) = 30$ have context $c$; the noise distribution gives $c$ probability $P_n(c) = 0.01$, and $k = 5$. What dot product does SGNS aim for? What if $c$ co-occurred with $w$ only twice?
::: solution
$B = k\,\#(w)\,P_n(c) = 5\cdot200\cdot0.01 = 10$ expected negative draws of $c$ for $w$. With $A = 30$: $x = \ln(30/10) = \ln3 = 1.10$. With $A = 2$: $x = \ln0.2 = -1.61$; although $w$ and $c$ were seen together, they co-occurred less often than the noise predicts, and the model pushes their vectors apart.
:::
:::

**GloVe** (Pennington, Socher and Manning, 2014) makes the connection to factorisation explicit. Its starting point is that ratios of co-occurrence probabilities carry meaning — $P(\textit{solid}\mid\textit{ice})/P(\textit{solid}\mid\textit{steam})$ is large, $P(\textit{gas}\mid\textit{ice})/P(\textit{gas}\mid\textit{steam})$ small, $P(\textit{water}\mid\cdot)$ ratios near $1$ — and that differences of vectors should represent such ratios, which leads to fitting dot products to log counts. With $X_{ij}$ the co-occurrence count, GloVe minimises the weighted least-squares objective

$$
J = \sum_{i, j:\,X_{ij} > 0}f(X_{ij})\big(\mathbf{w}_i\cdot\tilde{\mathbf{w}}_j + b_i + \tilde b_j - \log X_{ij}\big)^2,\qquad f(x) = \min\big(1, (x/x_{\max})^{\alpha}\big),
$$

with $x_{\max} = 100$ and $\alpha = 3/4$ in the paper. The biases absorb $\log\#(w)$ and $\log\#(c)$, so the dot products model what remains — essentially PMI — and the weighting $f$ downweights rare, noisy pairs and caps the influence of very frequent ones. Only non-zero entries are visited, so training cost scales with the number of distinct co-occurring pairs rather than with corpus length. **fastText** (Bojanowski et al., 2017) extends skip-gram by representing each word as the sum of vectors of its character $n$-grams, so that rare and unseen words such as *whaleboats* get vectors from their pieces — an idea close to the subword tokenisers of [[text-and-language/tokenisation]].

## The geometry of embedding spaces {#sec-geometry}

Mikolov, Yih and Zweig (2013) observed that relations between words correspond to roughly constant vector offsets: $\mathbf{v}_{\textit{king}} - \mathbf{v}_{\textit{man}} + \mathbf{v}_{\textit{woman}}$ is close to $\mathbf{v}_{\textit{queen}}$, and $\mathbf{v}_{\textit{Paris}} - \mathbf{v}_{\textit{France}} + \mathbf{v}_{\textit{Italy}}$ to $\mathbf{v}_{\textit{Rome}}$.

::: definition Analogy by vector offset (3CosAdd) {#def-analogy}
Given an analogy question "$a$ is to $a^*$ as $b$ is to ?", the **3CosAdd** answer is

$$
b^* = \arg\max_{x\in\mathcal{V}\setminus\{a, a^*, b\}}\cos\big(\mathbf{v}_x,\ \mathbf{v}_{a^*} - \mathbf{v}_a + \mathbf{v}_b\big).
$$

With unit-length vectors this equals $\arg\max_x\big(\cos(\mathbf{v}_x, \mathbf{v}_{a^*}) - \cos(\mathbf{v}_x, \mathbf{v}_a) + \cos(\mathbf{v}_x, \mathbf{v}_b)\big)$ (exercise 8): the answer should be similar to $a^*$ and $b$ and dissimilar to $a$.
:::

Why should offsets be constant? If PMI with every context word changes by roughly the same amount between *man* and *woman* as between *king* and *queen* — contexts like *she*, *her* and *pregnant* gain, *he* and *his* lose, the rest unchanged — then the rows of the PMI matrix satisfy $M_{\textit{queen}} - M_{\textit{king}}\approx M_{\textit{woman}} - M_{\textit{man}}$, and any linear factorisation preserves the relation. The synthetic corpus of the listing was built to make this exactly true, which is why the analogies worked so cleanly there; in real corpora it holds only approximately and only for some relations.

::: widget projection
u: 3, 0
v: 1.5, 2
mode: projection
caption: Removing a direction. Let $\mathbf{u}$ be a direction in embedding space (for instance an estimated gender direction, as in Bolukbasi et al.) and $\mathbf{v}$ a word vector. The projection of $\mathbf{v}$ onto $\mathbf{u}$ is the component of the word along that direction; the orthogonal part is what remains after "neutralising" the word. Drag both vectors: the cosine of $\mathbf{v}$ with $\mathbf{u}$ is the length of the projection divided by $\lVert\mathbf{v}\rVert$.
:::

::: warning Analogies are weaker than they look
The famous analogy results rely on excluding the three question words from the answers. Without the exclusion, the nearest vector to $\mathbf{v}_{\textit{king}} - \mathbf{v}_{\textit{man}} + \mathbf{v}_{\textit{woman}}$ is very often *king* itself, because the offset is small compared with the vector; Linzen (2016) and Nissim, van Noord and van der Goot (2020) showed that many reported analogies, including some cited as evidence of bias, depend on this choice and on which candidates are allowed. Analogy accuracy also varies greatly between relation types: morphological and geographic relations (plurals, capitals) work much better than lexical-semantic ones. Treat a single striking analogy as an anecdote, not a measurement.
:::

## Evaluating embeddings {#sec-evaluation}

Embeddings are evaluated **intrinsically**, on tasks that probe the vectors directly, and **extrinsically**, by the performance of a downstream system that uses them ([[text-and-language/text-classification]]).

- **Word similarity.** Datasets such as WordSim-353 (Finkelstein et al., 2002) and SimLex-999 (Hill, Reichart and Korhonen, 2015) give human ratings of word pairs; the score is the Spearman rank correlation between ratings and cosine similarities. SimLex-999 distinguishes similarity (*car*, *automobile*) from mere relatedness (*car*, *road*), which co-occurrence-based vectors conflate.
- **Analogies.** The Google analogy set of Mikolov et al. (2013) has $19{,}544$ questions in semantic and syntactic categories, scored by 3CosAdd accuracy.
- **Downstream tasks.** Tagging, parsing, classification and so on, with the embeddings as input features.

Intrinsic and extrinsic scores often disagree, and Levy, Goldberg and Dagan (2015) found that hyperparameters — window size, context-distribution smoothing, subsampling, the weighting exponent of SVD — matter as much as the choice between SVD, SGNS and GloVe: with matched settings, the methods perform comparably. Static embeddings give one vector per word type, so *bank* (river) and *bank* (money) share a vector; contextual embeddings from language models ([[sequence-models/contextual-embeddings]]) give one per occurrence, and have largely replaced static embeddings as features (as of 2026), though static vectors remain useful where computation is scarce and for studying corpora.

::: quiz
Under the assumptions of [[#thm-sgns-pmi]] with unigram noise and $k = 1$, which pairs get a negative dot product $\mathbf{w}\cdot\mathbf{c}$?
- [ ] Every pair with $\#(w, c) > 0$
- [x] Pairs that co-occur less often than independence predicts
- [ ] Pairs involving a frequent word such as *the*
- [ ] None: dot products of trained vectors are always positive
::: solution
With $k = 1$ the optimum is $\mathbf{w}\cdot\mathbf{c} = \operatorname{PMI}(w, c)$, negative exactly when $P(w, c) < P(w)P(c)$. Frequency alone does not decide: PMI corrects for it. (With $k > 1$ the threshold shifts: dot products are negative whenever $\operatorname{PMI} < \log k$.)
:::
:::

## Embeddings and social bias {#sec-bias}

Because embeddings encode co-occurrence statistics, they encode whatever associations the training text contains, including associations between social groups and occupations or attributes. Two studies made this measurable.

Bolukbasi, Chang, Zou, Saligrama and Kalai (2016), in a paper titled *Man is to Computer Programmer as Woman is to Homemaker?*, studied word2vec vectors trained on Google News. They estimated a **gender direction** as the principal component of differences between definitional pairs (*she* − *he*, *woman* − *man*, …), found that projections of occupation words on it correlated with stereotypes rated by crowd workers, and that analogies generated from the offset produced stereotyped pairs. They proposed **hard debiasing**: remove the component along the gender direction from words that should be gender-neutral (*neutralise* — the orthogonal part in the figure above) and make definitional pairs equidistant from them (*equalise*). Gonen and Goldberg (2019) later showed that after this procedure the bias remains largely recoverable — gender-stereotyped words still cluster together and can be classified from the debiased vectors — so the projection hides one measurement of the association rather than removing it.

Caliskan, Bryson and Narayanan (2017) adapted the Implicit Association Test from psychology into the **Word Embedding Association Test**.

::: definition WEAT {#def-weat}
Let $X$, $Y$ be two equal-sized sets of **target** words and $A$, $B$ two sets of **attribute** words. For a word $w$, let $s(w, A, B) = \operatorname{mean}_{a\in A}\cos(\mathbf{w}, \mathbf{a}) - \operatorname{mean}_{b\in B}\cos(\mathbf{w}, \mathbf{b})$ be its differential association with the attributes. The **effect size** is

$$
d = \frac{\operatorname{mean}_{x\in X}s(x, A, B) - \operatorname{mean}_{y\in Y}s(y, A, B)}{\operatorname{std}_{w\in X\cup Y}s(w, A, B)},
$$

and significance is assessed by a permutation test over re-partitions of $X\cup Y$ into two sets of equal size.
:::

On GloVe vectors trained on a web crawl, Caliskan et al. reproduced the direction of every classic IAT result they tested — flowers versus insects with pleasant versus unpleasant words, European-American versus African-American names, male versus female names with career versus family words, among others — with large effect sizes, and found that the gender association of occupation words correlated with the share of women in those occupations in US labour statistics. Their conclusion was descriptive: text statistics carry human-like associations, from the innocuous to the prejudiced, and models trained on text acquire them.

::: example A WEAT effect size by hand {#ex-weat}
In a two-dimensional toy space, let the attribute sets be $A = \{(1, 0)\}$ and $B = \{(0, 1)\}$, and the targets $X = \{(3, 1), (2, 1)\}$ and $Y = \{(1, 2), (1, 3)\}$. Compute the effect size, using the sample standard deviation.
::: solution
For $(3, 1)$: $\cos$ with $(1, 0)$ is $3/\sqrt{10} = 0.949$ and with $(0, 1)$ is $1/\sqrt{10} = 0.316$, so $s = 0.632$. For $(2, 1)$: $s = (2 - 1)/\sqrt5 = 0.447$. By symmetry $s = -0.447$ for $(1, 2)$ and $-0.632$ for $(1, 3)$. The difference of means is $0.540 - (-0.540) = 1.080$. The four values $\pm0.447, \pm0.632$ have mean $0$ and sample standard deviation $\sqrt{(2\cdot0.2 + 2\cdot0.4)/3} = \sqrt{0.4} = 0.632$, so $d = 1.080/0.632 = 1.707$ — a "large" effect by the usual conventions, as the targets were placed to lean towards different attributes.
:::
:::

These measurements are descriptive tools with known limitations. Results depend on the choice of word lists, which may themselves be ambiguous or culturally specific; cosine-based tests can be sensitive to word frequency; and an association in an embedding space need not translate into the same behaviour in a downstream system. Whether and how to mitigate such associations depends on the application and is debated; [[llm-society/bias-fairness]] discusses the questions for large language models.

::: history
Harris's *Distributional Structure* (1954) and Firth's *A Synopsis of Linguistic Theory 1930–1955* (1957) stated the distributional hypothesis. Osgood's semantic differential (1957) and Salton's vector space model for information retrieval (1970s) represented meaning by vectors; latent semantic analysis (Deerwester, Dumais, Furnas, Landauer and Harshman, 1990) applied the SVD to word–document matrices, and Church and Hanks (1990) introduced PMI for word association. Bengio et al. (2003) learned word vectors as part of a neural language model, and Collobert and Weston (2008) trained them for multiple NLP tasks. Mikolov and colleagues released word2vec in 2013, with CBOW, skip-gram, negative sampling and the analogy evaluation; Pennington, Socher and Manning published GloVe in 2014, and Levy and Goldberg proved the PMI connection the same year. Bojanowski, Grave, Joulin and Mikolov's fastText (2017) added subword information. Bolukbasi et al. (2016) and Caliskan et al. (2017) began the quantitative study of social bias in embeddings.
:::

::: summary
- The distributional hypothesis (Harris 1954, Firth 1957): words in similar contexts have similar meanings. A word is represented by its row of a co-occurrence matrix and compared by cosine similarity.
- PMI $= \log\frac{P(w, c)}{P(w)P(c)}$ measures association beyond chance; PPMI clips negatives; context-distribution smoothing ($\alpha = 0.75$) reduces the bias towards rare contexts. Truncated SVD compresses PPMI into dense vectors.
- word2vec's SGNS trains target and context vectors to tell observed pairs from $k$ noise pairs; each update touches $k + 2$ vectors.
- Levy and Goldberg: with enough dimensions, SGNS's optimum is $\mathbf{w}\cdot\mathbf{c} = \log\frac{\#(w, c)}{k\#(w)P_n(c)}$, i.e. PMI $-\log k$ for unigram noise — prediction-based and count-based embeddings are closely related. GloVe fits dot products plus biases to log counts.
- Vector offsets capture some relations (3CosAdd analogies), but results depend on excluding the question words and vary by relation type. Evaluate by similarity correlations, analogies and downstream tasks; hyperparameters matter as much as the method.
- Embeddings encode associations in their training text, including stereotypes: Bolukbasi et al. (2016) measured a gender direction and proposed projection-based debiasing (which Gonen and Goldberg found to be superficial), and Caliskan et al. (2017) reproduced IAT results with WEAT.
:::

## Exercises

::: exercise A cosine similarity {level=1 check="11/sqrt(130)"}
Compute the cosine similarity of the co-occurrence vectors $(2, 1)$ and $(5, 1)$. Does it change if the second vector is replaced by $(10, 2)$?
::: solution
$(2, 1)\cdot(5, 1) = 11$, norms $\sqrt5$ and $\sqrt{26}$, cosine $11/\sqrt{130} = 0.965$. Doubling a vector does not change its direction, so the cosine is the same for $(10, 2)$ — a word twice as frequent with the same distribution of contexts is equally similar.
:::
:::

::: exercise A PMI value {level=1 check="log2(400/270)"}
In [[#ex-pmi]], compute $\operatorname{PMI}(\textit{dog}, \textit{pet})$ in bits.
::: solution
$\operatorname{PMI} = \log_2\frac{10\cdot40}{15\cdot18} = \log_2\frac{400}{270} = \log_21.481 = 0.567$, matching the PPMI vector of *dog*.
:::
:::

::: exercise An optimal dot product {level=1 check="ln(3)"}
Using [[#thm-sgns-pmi]], find the optimal $\mathbf{w}\cdot\mathbf{c}$ when $\#(w, c) = 30$, $\#(w) = 200$, $P_n(c) = 0.01$ and $k = 5$, in nats.
::: solution
$\ln\frac{30}{5\cdot200\cdot0.01} = \ln3 = 1.099$, as in [[#ex-sgns-opt]].
:::
:::

::: exercise Parameters of a large embedding table {level=2 check="3e6*300"}
The word2vec vectors released with Mikolov et al. (2013), trained on Google News, cover $3$ million words and phrases with $d = 300$. How many numbers does the target matrix hold, and how many bytes in 32-bit floats? Training also needs the context matrix: how much memory do both take?
::: solution
$3\times10^{6}\times300 = 9\times10^{8}$ numbers, $3.6\times10^{9}$ bytes ($3.6$ GB) in float32. With the context matrix, $7.2$ GB. The context matrix is usually discarded after training.
:::
:::

::: exercise Gradients of SGNS {level=2}
Derive the gradients of [[#eq-sgns]] with respect to $\mathbf{w}$, $\mathbf{c}$ and each $\mathbf{c}_i$, and check them against the update lines of the listing.
::: solution
With $\frac{d}{dx}\log\sigma(x) = 1 - \sigma(x)$ and $\frac{d}{dx}\log\sigma(-x) = -\sigma(x)$ and the chain rule through $x = \mathbf{w}\cdot\mathbf{c}$ (whose gradient in $\mathbf{w}$ is $\mathbf{c}$ and in $\mathbf{c}$ is $\mathbf{w}$): $\partial\ell/\partial\mathbf{c} = (1 - \sigma(\mathbf{w}\cdot\mathbf{c}))\mathbf{w}$, $\partial\ell/\partial\mathbf{c}_i = -\sigma(\mathbf{w}\cdot\mathbf{c}_i)\mathbf{w}$, and $\partial\ell/\partial\mathbf{w} = (1 - \sigma(\mathbf{w}\cdot\mathbf{c}))\mathbf{c} - \sum_i\sigma(\mathbf{w}\cdot\mathbf{c}_i)\mathbf{c}_i$. In the listing, `label - sigmoid(...)` is $1 - \sigma$ for the positive pair and $0 - \sigma$ for a negative; `g` is that times the learning rate; each context vector is moved by `g * W[wi]` and the target's update accumulates `g * C[c]` (using the context vector before its own update), then is applied once.
:::
:::

::: exercise Neutralising a vector {level=2 check="sqrt(5)"}
Let the unit vector $\mathbf{g} = (1, 0, 0)$ be a bias direction and $\mathbf{v} = (2, 1, 2)$ a word vector. Compute the neutralised vector $\mathbf{v} - (\mathbf{v}\cdot\mathbf{g})\mathbf{g}$ and its length, and the cosine of $\mathbf{v}$ with $\mathbf{g}$ before and after.
::: solution
$\mathbf{v}\cdot\mathbf{g} = 2$, so the neutralised vector is $(0, 1, 2)$, of length $\sqrt5 = 2.236$. Before, $\cos(\mathbf{v}, \mathbf{g}) = 2/3$; after, $0$. The vector is shorter than before, so implementations usually renormalise it to unit length afterwards.
:::
:::

::: exercise A WEAT statistic {level=2 check="(3/sqrt(10)-1/sqrt(10)+2/sqrt(5)-1/sqrt(5))*2"}
Caliskan et al.'s test statistic is $S = \sum_{x\in X}s(x, A, B) - \sum_{y\in Y}s(y, A, B)$. Compute it for [[#ex-weat]], and explain why a permutation test is used to judge significance rather than a normal approximation.
::: solution
$S = (0.632 + 0.447) - (-0.447 - 0.632) = 2.159$. Equivalently $2\big(\tfrac{2}{\sqrt{10}} + \tfrac{1}{\sqrt5}\big)$. The word sets are small (often $8$–$25$ words) and the values $s(w, A, B)$ are not independent draws from a known distribution, so the null distribution is obtained by recomputing $S$ for every (or many random) equal-sized re-partitions of $X\cup Y$; the $p$-value is the fraction at least as large as the observed $S$. With only $4$ words here, there are $\binom42 = 6$ partitions and the smallest possible one-sided $p$-value is $1/6$ — no small test can be significant.
:::
:::

::: exercise 3CosAdd with unit vectors {level=3}
Show that for unit vectors, maximising $\cos(\mathbf{v}_x, \mathbf{v}_{a^*} - \mathbf{v}_a + \mathbf{v}_b)$ over $x$ is the same as maximising $\cos(\mathbf{v}_x, \mathbf{v}_{a^*}) - \cos(\mathbf{v}_x, \mathbf{v}_a) + \cos(\mathbf{v}_x, \mathbf{v}_b)$. What does this suggest about how one large similarity can dominate the answer, and what alternative did Levy and Goldberg propose?
::: solution
With $\norm{\mathbf{v}_x} = 1$, $\cos(\mathbf{v}_x, \mathbf{t}) = \mathbf{v}_x\cdot\mathbf{t}/\norm{\mathbf{t}}$ for the fixed target $\mathbf{t} = \mathbf{v}_{a^*} - \mathbf{v}_a + \mathbf{v}_b$; the factor $1/\norm{\mathbf{t}}$ does not depend on $x$, and $\mathbf{v}_x\cdot\mathbf{t} = \cos(\mathbf{v}_x, \mathbf{v}_{a^*}) - \cos(\mathbf{v}_x, \mathbf{v}_a) + \cos(\mathbf{v}_x, \mathbf{v}_b)$ since all are unit vectors. The answer is therefore an additive combination of three similarities, and a candidate very similar to $b$ (or $a^*$) can win even if it is unrelated to the relation — which is why $b$ itself must be excluded. Levy and Goldberg (2014, "Linguistic regularities in sparse and explicit word representations") proposed **3CosMul**, $\arg\max_x\frac{\cos(\mathbf{v}_x, \mathbf{v}_{a^*})\cos(\mathbf{v}_x, \mathbf{v}_b)}{\cos(\mathbf{v}_x, \mathbf{v}_a) + \varepsilon}$ (with cosines shifted to $[0, 1]$), which balances the terms multiplicatively and improved accuracy.
:::
:::

::: exercise SVD embeddings preserve dot products {level=3}
Let $M = U\Sigma V\T$ and $W = U_d\Sigma_d$. Show that $WW\T = M_dM_d\T$ where $M_d = U_d\Sigma_dV_d\T$, so that dot products of SVD embeddings equal dot products of rows of the best rank-$d$ approximation of $M$. What changes with $W = U_d\Sigma_d^{1/2}$?
::: solution
$M_dM_d\T = U_d\Sigma_dV_d\T V_d\Sigma_dU_d\T = U_d\Sigma_d^2U_d\T$ because $V_d\T V_d = I_d$ (orthonormal columns), and $WW\T = U_d\Sigma_d\Sigma_dU_d\T$ is the same. So the embedding of $w$ has the same dot products with every other embedding as row $w$ of $M_d$ — in $d$ instead of $\lvert\mathcal{C}\rvert$ coordinates. With $W = U_d\Sigma_d^{1/2}$, $WW\T = U_d\Sigma_dU_d\T$, which shrinks the dominance of the top singular directions; symmetrically one may set $C = V_d\Sigma_d^{1/2}$ so that $WC\T = M_d$ exactly, the form in which [[#thm-sgns-pmi]] reads SGNS.
:::
:::

::: exercise The rare-word bias of PMI {level=3 check="log2(40/12)"}
Show that $\operatorname{PMI}(w, c)\le\min\big(-\log P(w), -\log P(c)\big)$, with equality in the second bound when $w$ occurs only together with $c$. Check that $\operatorname{PMI}(\textit{car}, \textit{drive})$ in [[#ex-pmi]] attains its bound, in bits.
::: solution
$P(w, c)\le P(w)$ and $P(w, c)\le P(c)$, so $\frac{P(w, c)}{P(w)P(c)}\le\frac1{P(c)}$ and $\le\frac1{P(w)}$; take logarithms. If every co-occurrence of $w$ is with $c$, then $P(w, c) = P(w)$ and $\operatorname{PMI} = -\log P(c)$. For *car*, all $11$ co-occurrences are with *drive*, so $\operatorname{PMI} = -\log_2(12/40) = \log_2(40/12) = 1.737$ bits, the bound. A word seen once, next to a moderately rare context, gets a PMI as large as a word seen a thousand times always with that context — the reason for context-distribution smoothing and for requiring minimum counts.
:::
:::
