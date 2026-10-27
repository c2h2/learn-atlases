A web search engine does not rank by BM25 alone. For each candidate document it can compute BM25 for the title, the body, the URL and the anchor text separately; a query-likelihood score; whether the query words occur close together; the document's PageRank and its depth in its site; its age and how recently it changed; its language and reading level; a spam score; how often users clicked it for similar queries and how long they stayed. A hundred or more such **features** are normal. How should they be combined? Weighting a hundred numbers by hand, checking each change on test queries, is hopeless — and that is exactly the kind of problem machine learning solves. **Learning to rank** fits a scoring function to training data so as to rank well by the measures of [[information-retrieval/evaluation]].

This chapter treats the ranking-specific parts of the problem; the general machinery of supervised learning — loss functions, gradient descent, generalisation and overfitting, neural networks and boosted trees — is the subject of the LLM Atlas, in [ML fundamentals](/learn/llm/lesson.php?c=ml-fundamentals&l=learning-problem) and [neural networks](/learn/llm/lesson.php?c=neural-networks&l=backpropagation), and is used here without derivation. We set up the problem and its three families of methods: **pointwise** (predict each document's grade), **pairwise** (predict which of two documents is better, as in RankNet and RankSVM) and **listwise** (optimise a measure of the whole list, as in LambdaRank and LambdaMART, the method behind many production rankers). We derive the RankNet gradient, explain why nDCG cannot be optimised by gradient descent directly and how LambdaRank gets round this, and run all three on a synthetic data set. The last part is about learning from **clicks**, which are plentiful but biased: users click near the top whatever is there. We model **position bias**, prove that **inverse propensity weighting** removes it, and simulate the correction.

## The learning-to-rank problem

::: definition Learning to rank {#def-ltr}
The training data consist of queries $q_1, \dots, q_m$; for each query $q$, candidate documents $d_1, \dots, d_{n_q}$ with **feature vectors** $\vec x_{q,i} = \phi(q, d_i) \in \R^p$ and relevance labels $y_{q,i}$ (grades, or preferences derived from clicks). A **ranking function** $f\colon \R^p \to \R$ assigns each candidate a score $s_i = f(\vec x_{q,i})$, and documents are ranked by decreasing score. The goal is to choose $f$ from a model class — linear functions, boosted regression trees, neural networks — so that the rankings it produces on *new* queries score highly on a measure such as nDCG@$k$.
:::

Three properties distinguish this from ordinary regression or classification. Only the **order** of scores within a query matters, not their values. Scores are compared only **within** a query: a document's label means "relevant to this query", and a grade of $2$ for an easy query need not mean the same as a grade of $2$ for a hard one. And the measures that matter weight the **top** of the ranking heavily, so errors at rank $50$ are almost free while errors at rank $1$ are expensive.

Features are typically of three kinds. **Query–document** features: BM25 and language-model scores per field ([[information-retrieval/probabilistic-retrieval]]), counts of matched terms, proximity of matches, cosine similarity of embeddings ([[information-retrieval/dense-retrieval]]). **Document** features, independent of the query: PageRank ([[information-retrieval/web-search]]), URL length, spam and quality scores, freshness. **Query** features: length, type (navigational or informational), frequency. Query features cannot by themselves change the order within a query, but they interact with the others — freshness matters for news queries, PageRank for navigational ones. Features are usually normalised per query (for example scaled to $[0, 1]$ within each query's candidates) so that a learned weight means the same across queries.

Learned rankers are usually the **last** stage of a cascade. A cheap first stage (BM25 with dynamic pruning, [[information-retrieval/vector-space]]) retrieves a few hundred or thousand candidates; the learned model, which may cost microseconds or milliseconds per document, re-ranks only those.

### A synthetic data set

To compare methods we generate data whose truth we know. Each of $40$ training queries and $20$ test queries has $20$ candidates with three standardised features: a "BM25" feature, a "PageRank" feature and a feature of pure noise. A hidden usefulness $z = 1.0 \cdot \mathrm{bm25} + 0.6 \cdot \mathrm{pr} + \varepsilon$, with Gaussian noise $\varepsilon$ of standard deviation $0.7$, determines grades: within each query, candidates above the $95$th percentile of $z$ get grade $3$, above the $80$th grade $2$, above the median grade $1$ and the rest $0$.

```python
import math, random

rng = random.Random(42)
def make_query(n=20):                          # synthetic query: features and graded labels
    docs = []
    for _ in range(n):
        bm25, pr, junk = rng.gauss(0, 1), rng.gauss(0, 1), rng.gauss(0, 1)
        z = 1.0 * bm25 + 0.6 * pr + rng.gauss(0, 0.7)            # hidden "true" usefulness
        docs.append(([bm25, pr, junk], z))
    zs = sorted(z for _, z in docs)
    cut = [zs[int(n * q)] for q in (0.5, 0.8, 0.95)]             # grades 0..3 by quantile
    return [(x, sum(z >= c for c in cut)) for x, z in docs]
train = [make_query() for _ in range(40)]
test = [make_query() for _ in range(20)]
```

All models below are linear, $f(\vec x) = \vec w \cdot \vec x$, and are evaluated by mean nDCG@5 on the test queries (gain $2^g - 1$, discount $\log_2(i + 1)$, as in [[information-retrieval/evaluation#def-ndcg]]).

## Pointwise methods

The simplest approach ignores the ranking structure: treat each (query, document) pair as an independent example and fit $f$ to predict its grade, by least-squares regression, by ordinal regression, or by classification into grades. Any regression method can be used, and the model's scores rank the documents.

::: example Why pointwise regression misleads {#ex-pointwise}
Query $q_1$ (easy) has candidates with BM25 features $8$ and $6$ and grades $3$ and $2$. Query $q_2$ (hard) has candidates with BM25 features $2$ and $1$ and grades $3$ and $0$. Fit a one-feature least-squares line through the origin, $\hat y = wx$, and discuss.
::: solution
Least squares through the origin gives $w = \sum xy/\sum x^2 = (24 + 12 + 6 + 0)/(64 + 36 + 4 + 1) = 42/105 = 0.4$. The predictions are $3.2, 2.4$ for $q_1$ and $0.8, 0.4$ for $q_2$. Both queries are ranked correctly, so the ranking is perfect — yet the squared error is dominated by $q_2$'s best document, predicted $0.8$ for a true grade of $3$. The model spends its effort on matching absolute grades across queries, which ranking does not need: rankings within each query are unchanged by adding any per-query constant to the scores, while the regression loss is not. In a richer model this misdirected effort costs accuracy where it matters. Pointwise methods also weight every document equally, while the measures weight the top few.
:::
:::

On the synthetic data, regression of the grades on the features by stochastic gradient descent gives

```text
  pointwise regression   w = [ 0.492,  0.355,  0.111]  nDCG@5 = 0.7790
```

an improvement on the best single feature (BM25 alone: $0.7436$), but it gives the noise feature a weight of $0.11$ and falls well short of the true weights, which achieve $0.8384$.

## Pairwise methods

Ranking is about order, so learn order directly: for each query, every pair of documents with different grades gives a training example "$d_i$ should be ranked above $d_j$", written $i \succ j$.

::: definition RankNet loss {#def-ranknet}
For a pair $i \succ j$ with scores $s_i, s_j$, **RankNet** (Burges and colleagues, 2005) models the probability that $i$ should be ranked above $j$ as $P_{ij} = \sigma(s_i - s_j)$ with the logistic function $\sigma(z) = 1/(1 + e^{-z})$, and minimises the cross-entropy loss
$$
C_{ij} = -\log P_{ij} = \log\bigl(1 + e^{-(s_i - s_j)}\bigr)
$$ {#eq-ranknet}
summed over all such pairs of all training queries.
:::

The loss is small when $s_i \gg s_j$ and grows linearly in $s_j - s_i$ when the pair is badly misordered. It is a **surrogate** for the number of misordered pairs, which is what we would like to minimise but which is not differentiable.

::: proposition The logistic loss bounds the pairwise error {#prop-pair-bound}
For every pair, $\mathbf 1[s_i \le s_j] \le C_{ij}/\ln 2$. Consequently the number of misordered pairs (counting ties as errors) is at most $\frac{1}{\ln 2}\sum_{i \succ j} C_{ij}$.
:::

::: proof
Let $z = s_i - s_j$. If $z \le 0$ then $e^{-z} \ge 1$, so $C_{ij} = \ln(1 + e^{-z}) \ge \ln 2$ and $C_{ij}/\ln 2 \ge 1$. If $z > 0$ the indicator is $0$ and $C_{ij} > 0$. Summing over pairs gives the second statement.
:::

The fraction of correctly ordered pairs is the **area under the ROC curve** for a binary-labelled query and is closely related to Kendall's $\tau$ between the predicted and the ideal ranking; pairwise methods therefore optimise a rank correlation. Training needs the gradient.

::: proposition The RankNet gradient {#prop-ranknet-grad}
With $\rho_{ij} = \sigma(s_j - s_i) = 1/(1 + e^{s_i - s_j})$,
$$
\frac{\partial C_{ij}}{\partial s_i} = -\rho_{ij}, \qquad \frac{\partial C_{ij}}{\partial s_j} = \rho_{ij},
$$
and for a model with parameters $\vec w$, $\nabla_{\vec w} C_{ij} = -\rho_{ij}\bigl(\nabla_{\vec w} s_i - \nabla_{\vec w} s_j\bigr)$; for a linear model, $\nabla_{\vec w} C_{ij} = -\rho_{ij}(\vec x_i - \vec x_j)$.
:::

::: proof
Let $z = s_i - s_j$. Then $\frac{d}{dz}\ln(1 + e^{-z}) = \frac{-e^{-z}}{1 + e^{-z}} = -\frac{1}{e^{z} + 1} = -\sigma(-z)$, and $\partial z/\partial s_i = 1$, $\partial z/\partial s_j = -1$. The chain rule gives the parameter gradient, and for $s = \vec w\cdot\vec x$, $\nabla_{\vec w} s = \vec x$.
:::

So each pair pushes the better document's score up and the worse one's down with strength $\rho_{ij}$, which is close to $1$ for a misordered pair and close to $0$ for a pair already well separated. Summing these pushes per document — document $i$ receives $\lambda_i = \sum_{j: i \succ j}\rho_{ij} - \sum_{j: j \succ i}\rho_{ji}$ — gives the "force" on each score; Burges observed that this factorisation means the model's gradient needs one backward pass per document rather than one per pair, a large saving for neural rankers.

::: example One RankNet step {#ex-ranknet-step}
A linear model $\vec w = (1, 0)$ scores two documents with features $\vec x_i = (0.5, 1)$ and $\vec x_j = (1, 0)$, where $i \succ j$. Compute the loss, its gradient and the effect of a gradient step with learning rate $0.5$.
::: solution
$s_i = 0.5$ and $s_j = 1$: the pair is misordered. $C_{ij} = \ln(1 + e^{-(0.5 - 1)}) = \ln(1 + e^{0.5}) = 0.974$, and $\rho_{ij} = 1/(1 + e^{-0.5}) = 0.622$. The gradient is $-\rho_{ij}(\vec x_i - \vec x_j) = -0.622\,(-0.5, 1) = (0.311, -0.622)$, so a step $\vec w \gets \vec w - 0.5\nabla C$ gives $\vec w = (0.844, 0.311)$. Now $s_i = 0.422 + 0.311 = 0.733$ and $s_j = 0.844$: still misordered but closer (the difference went from $-0.5$ to $-0.111$), and the loss fell to $\ln(1 + e^{0.111}) = 0.750$. The step increased the weight of the second feature, which favours $i$.
:::
:::

The gradient-descent figure shows the RankNet loss of a linear ranker with two weights on three training pairs (with a small penalty $0.05\norm{\vec w}^2$ to make the minimum finite).

::: widget gradientdescent
f: ln(1 + exp(-(x + 0.5*y))) + ln(1 + exp(-(0.5*x - y))) + ln(1 + exp(-(-0.3*x + y))) + 0.05*(x^2 + y^2)
start: -2.5, -2
rate: 0.8
steps: 40
x: -3, 4
y: -3, 3
caption: RankNet training of a linear ranker $s = w_1 x_1 + w_2 x_2$ on three pairs whose feature differences $\vec x_i - \vec x_j$ are $(1, 0.5)$, $(0.5, -1)$ and $(-0.3, 1)$; the horizontal axis is $w_1$ and the vertical $w_2$. The loss is convex, so gradient descent from any start reaches the same minimum. The second and third pairs pull $w_2$ in opposite directions — no linear ranker orders all three pairs correctly with a large margin — and the optimum balances them. Try a larger learning rate to see oscillation.
:::

**RankSVM** (Joachims, 2002) is the same idea with the hinge loss $\max(0, 1 - (s_i - s_j))$ and a quadratic regulariser, solved as a support vector machine on the difference vectors $\vec x_i - \vec x_j$. Joachims trained it on preferences extracted from click logs, which we discuss below.

Linear RankNet on the synthetic data:

```text
  RankNet (linear)       w = [ 2.020,  1.458,  0.026]  nDCG@5 = 0.8323
```

The weights' scale is arbitrary for ranking (only direction matters), and their ratio $1.458/2.020 = 0.72$ is close to the true $0.6$; the noise feature is all but ignored. The test nDCG@5 of $0.8323$ is close to the $0.8384$ of the true weights.

## Listwise methods

Pairwise losses treat every misordered pair alike, but nDCG does not: swapping the documents at ranks $1$ and $2$ changes nDCG far more than swapping those at ranks $41$ and $42$, and a pair of grades $3$ and $0$ matters more than a pair of grades $1$ and $0$. Why not optimise nDCG itself?

::: proposition Ranking measures have zero gradient almost everywhere {#prop-flat}
Let $M(s_1, \dots, s_n)$ be any measure that depends on the scores only through the ranking they induce (nDCG, AP, $P@k$, reciprocal rank). Then $M$ is constant on each open region of $\R^n$ in which no two scores are equal. Hence its gradient with respect to the scores is zero wherever it exists, and it is discontinuous where two scores tie.
:::

::: proof
Within a connected region where all $s_i$ are distinct, no score can cross another without passing through equality, so the order of the documents — and with it $M$ — is the same throughout. A function constant on an open set has zero derivative there. The set where some $s_i = s_j$ is a finite union of hyperplanes, which has measure zero; crossing one swaps two documents and changes $M$ by a jump whenever the swapped documents have different grades.
:::

Gradient descent on nDCG directly is therefore impossible. Listwise methods either optimise a smooth surrogate of the whole list — **ListNet** (Cao and colleagues, 2007) turns scores into a probability distribution over which document is ranked first, $\mathrm{softmax}(s)_i = e^{s_i}/\sum_j e^{s_j}$, and minimises its cross-entropy with the same distribution computed from the grades — or, like LambdaRank, modify the gradient.

::: algorithm LambdaRank {#alg-lambdarank}
For each training query, rank its documents by the current scores. For each pair $i \succ j$ (by grade), compute the RankNet weight $\rho_{ij}$ of [[#prop-ranknet-grad]] and the change $\abs{\Delta\mathrm{nDCG}_{ij}}$ that swapping the positions of $i$ and $j$ in the current ranking would make. Use
$$
\lambda_{ij} = \rho_{ij}\,\abs{\Delta \mathrm{nDCG}_{ij}}
$$
in place of $\rho_{ij}$ in the gradient step: increase $s_i$ and decrease $s_j$ with strength $\lambda_{ij}$.
:::

The $\lambda$'s are not the gradient of any obvious loss — they were *defined* as the forces one would like to apply — but Burges, Ragno and Le (2006) showed empirically that training with them improves nDCG, and later work (the LambdaLoss framework of 2018) interpreted them as gradients of a bound on a metric-weighted loss. **LambdaMART** (Burges, 2010) uses the same $\lambda$'s as the pseudo-residuals of gradient-boosted regression trees (MART); it won the Yahoo! Learning to Rank Challenge of 2010 and gradient-boosted trees with lambda gradients remained a standard for feature-based ranking afterwards.

::: example Lambda weights {#ex-lambda}
The current ranking of a query's four documents has grades $3, 0, 2, 1$ at ranks $1$ to $4$. With gain $2^g - 1$, compute $\abs{\Delta\mathrm{nDCG}}$ for swapping ranks $2$ and $3$ and for swapping ranks $1$ and $4$.
::: solution
Swapping two documents at ranks $a$ and $b$ with grades $g_a, g_b$ changes DCG by $(2^{g_a} - 2^{g_b})\bigl(\frac{1}{\log_2(a+1)} - \frac{1}{\log_2(b+1)}\bigr)$, since only their two terms change. The ideal DCG@4 for grades $3, 2, 1, 0$ is $7 + 3/\log_2 3 + 1/2 + 0 = 9.3928$.
- Ranks $2$ and $3$ (grades $0$ and $2$): $\abs{(1 - 4)(0.6309 - 0.5)} = 0.3928$, so $\abs{\Delta\mathrm{nDCG}} = 0.3928/9.3928 = 0.0418$.
- Ranks $1$ and $4$ (grades $3$ and $1$): $\abs{(8 - 2)(1 - 0.4307)} = 3.4159$, so $\abs{\Delta\mathrm{nDCG}} = 0.3637$.

The second pair is correctly ordered already, so its RankNet weight $\rho$ is small; the first is misordered. But when a correctly ordered pair is close in score, LambdaRank still pushes hard to keep the grade-$3$ document at the top, because losing it would cost nine times as much nDCG.
:::
:::

On the synthetic data:

```text
  true weights           w = [ 1.000,  0.600,  0.000]  nDCG@5 = 0.8384
  BM25 feature only      w = [ 1.000,  0.000,  0.000]  nDCG@5 = 0.7436
  PageRank feature only  w = [ 0.000,  1.000,  0.000]  nDCG@5 = 0.4608
  pointwise regression   w = [ 0.492,  0.355,  0.111]  nDCG@5 = 0.7790
  RankNet (linear)       w = [ 2.020,  1.458,  0.026]  nDCG@5 = 0.8323
  LambdaRank (linear)    w = [ 1.704,  1.265, -0.064]  nDCG@5 = 0.8244
```

Here LambdaRank is no better than RankNet. That is not a contradiction: the data were generated by a linear function and both pairwise methods recover almost the right direction, so there is nothing left for a top-weighted loss to gain, and the difference of $0.008$ over $20$ test queries is well within noise (a paired test as in [[information-retrieval/evaluation]] would be needed before claiming anything). Listwise weighting pays off when the model cannot fit everything — a misspecified or limited model, such as small trees, must choose where to make its errors, and $\lambda$'s steer them away from the top.

::: warning A better training loss is not a better ranker
Every number above is an **observation** on one synthetic data set, not a theorem about the methods. Published comparisons of pointwise, pairwise and listwise methods depend heavily on the data set, the features, the model class and the tuning effort, and many reported gains shrink under careful re-evaluation. Two specific traps: tuning hyperparameters on the test queries, and comparing a carefully tuned new method with a poorly tuned baseline. The safeguards are those of [[information-retrieval/evaluation]] — separate training, validation and test queries; strong baselines; significance tests over queries; and, finally, online experiments with users.
:::

## Learning from clicks

Relevance judgements are expensive: TREC-style collections have tens of thousands of judgements, a commercial engine wants millions per week across all languages and markets. Clicks are free and plentiful. But a click is not a judgement. Users click what they **see** and what **looks** relevant in the snippet, and they see the top results far more often than the rest. A document at rank $1$ attracts many clicks partly because it is at rank $1$.

::: definition Position-based click model {#def-pbm}
In the **position-based model**, a user shown document $d$ at rank $k$ **examines** it with probability $\theta_k$, depending only on the rank, and, if examined, clicks with probability $r_d$, depending only on the document (its attractiveness or relevance). Examination and the click decision are independent, so
$$
\Prob(\text{click} \mid d \text{ at rank } k) = \theta_k\, r_d.
$$
The **examination hypothesis** is the assumption that a document is clicked only if examined. The probabilities $\theta_k$ are the **propensities**.
:::

An alternative, the **cascade model** (Craswell, Zoeter, Taylor and Ramsey, 2008), assumes the user reads from the top, clicks the first attractive result and stops: the probability of a click at rank $k$ is $r_{d_k}\prod_{i<k}(1 - r_{d_i})$. It explains why a good result at rank $1$ reduces clicks on everything below it; refinements combine examination and cascade behaviour into dynamic Bayesian network click models.

::: example Clicks under the cascade model {#ex-cascade}
Three results have attractiveness $r_1 = 0.3$, $r_2 = 0.5$ and $r_3 = 0.2$. Under the cascade model, what is the probability of a click at each rank and of no click?
::: solution
Rank $1$: $0.3$. Rank $2$: $(1 - 0.3)(0.5) = 0.35$. Rank $3$: $(0.7)(0.5)(0.2) = 0.07$. No click: $0.7 \times 0.5 \times 0.8 = 0.28$. The four probabilities sum to $1$. The second result receives more clicks than the first even though the first is shown higher, because it is more attractive; and the third, which a user reaches only after rejecting two results, receives few clicks whatever its quality.
:::
:::

The naive estimate of a document's relevance, its **click-through rate** (CTR) — clicks divided by impressions — is biased under these models: under the position-based model its expectation is $\theta_k r_d$, not $r_d$. Training a ranker on CTRs collected from the current ranker reinforces the current ranking, whatever its quality.

::: theorem Inverse propensity weighting is unbiased {#thm-ips}
Under the position-based model, suppose document $d$ is shown at rank $k$ in each of $n$ impressions, with known propensity $\theta_k > 0$. Let $c_1, \dots, c_n \in \set{0, 1}$ record the clicks. Then the **inverse-propensity-weighted** estimate
$$
\hat r_d = \frac{1}{n}\sum_{t=1}^{n} \frac{c_t}{\theta_k}
$$
satisfies $\E[\hat r_d] = r_d$. More generally, if impression $t$ shows $d$ at rank $k_t$ with $\theta_{k_t} > 0$, the estimate $\frac1n\sum_t c_t/\theta_{k_t}$ is unbiased for $r_d$.
:::

::: proof
By the model, $\E[c_t] = \Prob(c_t = 1) = \theta_{k_t} r_d$. By linearity of expectation,
$$
\E[\hat r_d] = \frac{1}{n}\sum_{t=1}^n \frac{\E[c_t]}{\theta_{k_t}} = \frac1n\sum_{t=1}^n \frac{\theta_{k_t} r_d}{\theta_{k_t}} = r_d.
$$
:::

Thorsten Joachims, Adith Swaminathan and Tobias Schnabel (2017) used this to define **unbiased learning to rank**: weight each clicked document's contribution to a ranking loss by $1/\theta_k$, so that in expectation the loss equals the loss on true relevance. The weights can be large when $\theta_k$ is small — the estimator is unbiased but has high variance, which is controlled in practice by clipping the weights. And the propensities must be estimated, for example by **randomisation**: occasionally swapping the result at rank $1$ with the one at rank $k$ for a small fraction of users shows how clicks on the same documents change with position.

A simulation with $\theta_k = 1/k$: document $d_1$ (true $r = 0.2$) is always shown at rank $1$ and $d_2$ (true $r = 0.6$) at rank $4$, for $100\,000$ impressions.

```python
import random
rng = random.Random(7)
theta = [1 / (k + 1) for k in range(10)]         # examination probability at rank k+1 (position bias)
rel = {"d1": 0.2, "d2": 0.6}                     # true click-if-examined probabilities
n, clicks, ips = 100000, {"d1": 0, "d2": 0}, {"d1": 0.0, "d2": 0.0}
for _ in range(n):
    for d, rank in (("d1", 1), ("d2", 4)):
        if rng.random() < theta[rank - 1] and rng.random() < rel[d]:   # examined, then clicked
            clicks[d] += 1
            ips[d] += 1 / theta[rank - 1]                              # inverse propensity weight
for d in ("d1", "d2"):
    print(f"{d}: CTR {clicks[d] / n:.4f}   IPS estimate {ips[d] / n:.4f}   true relevance {rel[d]}")
```
```text
d1: CTR 0.1993   IPS estimate 0.1993   true relevance 0.2
d2: CTR 0.1515   IPS estimate 0.6061   true relevance 0.6
```

By click-through rate the current ranking looks right — $d_1$ gets more clicks — although $d_2$ is three times as relevant. The IPS estimates recover both relevances to within sampling error.

::: widget plot
f: 1/x^eta; 0.6/x^eta
sliders: eta=0:0.1:2
x: 1, 10
y: 0, 1
labels: \theta_k = 1/k^{\eta}\ \text{(propensity)}; \text{expected CTR of a document with } r = 0.6
caption: A family of position-bias curves $\theta_k = k^{-\eta}$, often fitted to click data, and the click-through rate it implies for a document with relevance $0.6$ at each rank. At $\eta = 0$ there is no bias and CTR equals relevance; at $\eta = 1$ (the simulation) a rank-$4$ document is examined a quarter as often. The inverse-propensity weight $1/\theta_k = k^\eta$ grows quickly with rank, which is why IPS estimates for low-ranked documents are noisy.
:::

::: quiz
Under the position-based model with $\theta_1 = 1$ and $\theta_3 = 0.4$, document X at rank $1$ has CTR $0.30$ and document Y at rank $3$ has CTR $0.16$. Which is more relevant?
- [ ] X, because it has the higher CTR
- [x] Y: its estimated relevance is $0.16/0.4 = 0.40$, against $0.30$ for X
- [ ] They are equally relevant
- [ ] It cannot be decided without relevance judgements
::: solution
Dividing by the propensities, $\hat r_X = 0.30/1 = 0.30$ and $\hat r_Y = 0.16/0.4 = 0.40$ ([[#thm-ips]]). Y is clicked less only because it is seen less. The conclusion depends on the model being right and the propensities being accurately estimated; if users also skip results whose snippets look poor, the "relevance" being estimated is snippet attractiveness, not document relevance.
:::
:::

## In practice

Learning to rank became central to web search in the late 2000s. Public benchmark data sets — Microsoft's LETOR (2007) and MSLR-WEB10K/30K, and the Yahoo! Learning to Rank Challenge data (2010) — provided feature vectors and graded judgements for tens of thousands of queries, and gradient-boosted trees with lambda gradients were long the strongest methods on them. Since about 2019, **neural re-rankers** built on pre-trained language models — a transformer that reads the query and the document together and outputs a relevance score, a **cross-encoder** — have given large improvements in effectiveness on many benchmarks, at a high cost per document, so they are used on the top few dozen to hundred candidates; they are introduced in [[information-retrieval/dense-retrieval]], and the models themselves in the [LLM Atlas](/learn/llm/lesson.php?c=transformers&l=architecture-families). Feature-based learned rankers remain important where features such as freshness, popularity or personalisation are essential and where latency budgets are tight. Every one of these systems is evaluated as in [[information-retrieval/evaluation]]: offline nDCG on held-out queries, then online interleaving or A/B tests.

Learning from user behaviour also raises questions beyond accuracy. A ranker trained on clicks learns what users click, which is not always what is accurate, safe or fair — sensational results attract clicks — and a feedback loop can entrench existing rankings and the providers who benefit from them. Engines therefore combine behavioural signals with editorial judgements and quality guidelines, and measure exposure and fairness alongside relevance.

::: history
Norbert Fuhr proposed learning retrieval functions from relevance feedback with polynomial regression in 1989, and William Cooper, Fredric Gey and Daniel Dabney used logistic regression in 1992. Thorsten Joachims's "Optimizing search engines using clickthrough data" (KDD 2002) introduced RankSVM trained on click preferences, and Joachims, Laura Granka and colleagues' eye-tracking studies (2005) measured how strongly position biases clicks. Chris Burges and colleagues at Microsoft introduced RankNet in "Learning to rank using gradient descent" (ICML 2005), LambdaRank in 2006 and LambdaMART, described in Burges's 2010 overview "From RankNet to LambdaRank to LambdaMART"; Zhe Cao and colleagues introduced ListNet in 2007. Nick Craswell, Onno Zoeter, Michael Taylor and Bill Ramsey proposed the cascade model at WSDM 2008. Joachims, Adith Swaminathan and Tobias Schnabel's "Unbiased learning-to-rank with biased feedback" (WSDM 2017) applied inverse propensity weighting to ranking, and Rodrigo Nogueira and Kyunghyun Cho's BERT re-ranker (2019) began the era of neural re-ranking. Tie-Yan Liu's survey *Learning to Rank for Information Retrieval* (2009) organised the field into pointwise, pairwise and listwise approaches.
:::

## Where this leads

Learned rankers consume the features of every earlier chapter — BM25 and language-model scores, proximity from positional indexes, PageRank and anchor text — and are judged by the measures and tests of [[information-retrieval/evaluation]]. The next chapter, [[information-retrieval/dense-retrieval]], moves learning from the last stage to the first: instead of combining hand-designed features, it learns representations of queries and documents as dense vectors, retrieves by nearest-neighbour search, and uses cross-encoders as re-rankers. The machine-learning foundations — logistic regression, gradient descent, boosting, neural networks — are developed in the [LLM Atlas](/learn/llm/lesson.php?c=ml-fundamentals&l=logistic-regression).

::: summary
- **Learning to rank** ([[#def-ltr]]) fits a scoring function on features of query–document pairs so that rankings of new queries score well on measures such as nDCG; only order within a query matters, and the top matters most.
- **Pointwise** methods regress grades directly; simple, but they waste effort on cross-query scale and treat all ranks alike.
- **Pairwise** methods learn from preferences: RankNet's logistic loss ([[#def-ranknet]]) upper-bounds the number of misordered pairs ([[#prop-pair-bound]]), with gradient $-\rho_{ij}(\vec x_i - \vec x_j)$ for linear models ([[#prop-ranknet-grad]]); RankSVM uses the hinge loss.
- Ranking measures are piecewise constant in the scores, so their gradient is zero almost everywhere ([[#prop-flat]]); **LambdaRank** ([[#alg-lambdarank]]) scales each pair's push by $\abs{\Delta\mathrm{nDCG}}$, and **LambdaMART** applies this to boosted trees.
- Clicks are biased by **position**; the position-based model ([[#def-pbm]]) and the cascade model describe it, and **inverse propensity weighting** gives unbiased relevance estimates ([[#thm-ips]]), at the cost of variance and the need to estimate propensities.
- All comparisons are empirical: on a linear synthetic problem, pairwise and listwise linear rankers reached nDCG@5 of about $0.83$ against $0.78$ for pointwise regression and $0.74$ for BM25 alone — observations, not laws.
:::

## Exercises

::: exercise A RankNet probability {level=1 check="1/(1 + exp(-1))"}
A pair has scores $s_i = 2.5$ and $s_j = 1.5$. What probability does RankNet assign to $i \succ j$? (Enter $P_{ij}$.)
::: solution
$P_{ij} = \sigma(s_i - s_j) = \sigma(1) = 1/(1 + e^{-1}) \approx 0.731$. The loss is $-\ln 0.731 = 0.313$.
:::
:::

::: exercise Counting pairs {level=1 check="35"}
A query has $10$ candidates with grades: one of grade $3$, two of grade $2$, three of grade $1$ and four of grade $0$. How many ordered pairs $i \succ j$ (with $i$ of strictly higher grade) does it contribute to pairwise training? (Enter the number of pairs.)
::: solution
Every pair of documents from different grade groups gives one preference. With group sizes $1, 2, 3, 4$: $1\cdot2 + 1\cdot3 + 1\cdot4 + 2\cdot3 + 2\cdot4 + 3\cdot4 = 2 + 3 + 4 + 6 + 8 + 12 = 35$. Equivalently, all $\binom{10}{2} = 45$ pairs minus the $\binom22 + \binom32 + \binom42 = 1 + 3 + 6 = 10$ pairs within a group. The number of pairs grows quadratically with the number of candidates, which is why pairwise training usually samples pairs or aggregates them per document.
:::
:::

::: exercise IPS by hand {level=1 check="0.5"}
A document shown at rank $5$, where the propensity is $\theta_5 = 0.2$, receives $50$ clicks in $500$ impressions. What is its IPS relevance estimate? (Enter $\hat r$.)
::: solution
$\hat r = \frac{1}{500}\sum_t c_t/\theta_5 = \frac{50}{500 \times 0.2} = 0.5$, against a CTR of $0.1$.
:::
:::

::: exercise RankSVM's loss {level=2}
Show that the hinge loss $\max(0, 1 - z)$, with $z = s_i - s_j$, also upper-bounds the pairwise error $\mathbf 1[z \le 0]$, and compare its gradient with RankNet's for a pair that is correctly ordered with margin $z = 3$.
::: solution
If $z \le 0$ then $1 - z \ge 1$, so the hinge loss is at least $1$, the value of the indicator; if $z > 0$ the indicator is $0 \le$ the loss. For $z = 3$, the hinge loss is $0$ and its gradient is $0$: a pair separated by more than the margin $1$ exerts no force at all. RankNet's gradient magnitude is $\rho = 1/(1 + e^{3}) = 0.047$: small but non-zero, so every pair keeps pushing slightly. Hinge losses yield sparse solutions (only pairs within the margin matter, the support vectors), logistic losses yield probabilities.
:::
:::

::: exercise Swap change in DCG {level=2}
Prove that swapping the documents at ranks $a < b$, with grades $g_a, g_b$, changes DCG by exactly $(2^{g_b} - 2^{g_a})\bigl(\frac{1}{\log_2(a+1)} - \frac{1}{\log_2(b+1)}\bigr)$, and deduce that the swap increases DCG if and only if $g_b > g_a$.
::: solution
DCG is a sum over ranks of gain times discount, and the swap changes only the terms at ranks $a$ and $b$. Before: $(2^{g_a} - 1)D_a + (2^{g_b} - 1)D_b$ with $D_i = 1/\log_2(i+1)$. After: $(2^{g_b} - 1)D_a + (2^{g_a} - 1)D_b$. The difference after minus before is $(2^{g_b} - 2^{g_a})D_a - (2^{g_b} - 2^{g_a})D_b = (2^{g_b} - 2^{g_a})(D_a - D_b)$. Since $a < b$, $D_a > D_b$, so the change is positive exactly when $2^{g_b} > 2^{g_a}$, i.e. $g_b > g_a$: moving a better document up always helps. This is the quantity used by LambdaRank ([[#ex-lambda]]), and it is computed in $O(1)$ per pair.
:::
:::

::: exercise Propensities from a swap experiment {level=2 check="0.4"}
Under the position-based model, an engine swaps the results at ranks $1$ and $3$ for a random $1\%$ of users. Document X, normally at rank $1$, has CTR $0.30$ there and $0.12$ when swapped to rank $3$. Document Y, normally at rank $3$, has CTR $0.10$ there and $0.25$ when swapped to rank $1$. Estimate $\theta_3/\theta_1$ from each document (enter the estimate), and explain why the swap makes the estimate independent of relevance.
::: solution
For X: $\theta_3 r_X / (\theta_1 r_X) = 0.12/0.30 = 0.4$. For Y: $\theta_3 r_Y/(\theta_1 r_Y) = 0.10/0.25 = 0.4$. Each ratio compares the *same* document at two ranks, so its relevance cancels, leaving the ratio of propensities. Randomising which users see the swap makes the two groups of users comparable, so the difference in CTR is caused by position alone. Normalising $\theta_1 = 1$ gives $\theta_3 = 0.4$. Joachims and colleagues proposed such swap interventions for estimating propensities; their cost is that the users in the swapped group see a slightly worse ranking.
:::
:::

::: exercise ListNet's gradient {level=3}
In ListNet's top-one model the predicted distribution is $p_i = e^{s_i}/\sum_j e^{s_j}$ and the target is $t_i = e^{y_i}/\sum_j e^{y_j}$ computed from the grades $y_i$. Show that the cross-entropy $L = -\sum_i t_i \ln p_i$ has gradient $\partial L/\partial s_i = p_i - t_i$, and interpret it.
::: solution
$\ln p_i = s_i - \ln\sum_j e^{s_j}$, so $\partial \ln p_i/\partial s_k = \mathbf 1[i = k] - p_k$. Then
$$
\frac{\partial L}{\partial s_k} = -\sum_i t_i\bigl(\mathbf 1[i = k] - p_k\bigr) = -t_k + p_k\sum_i t_i = p_k - t_k,
$$
using $\sum_i t_i = 1$. A document whose predicted probability of being ranked first exceeds its target share has its score pushed down, and vice versa; the gradient is zero exactly when the two distributions agree. Because the softmax concentrates mass on the highest scores, the loss is dominated by the top of the ranking — a smooth way of emphasising the top that does not require sorting. (The same gradient is that of multinomial logistic regression, in the [LLM Atlas](/learn/llm/lesson.php?c=ml-fundamentals&l=logistic-regression).)
:::
:::

::: exercise IPS variance {level=3}
Under the position-based model, show that the IPS estimate of [[#thm-ips]] with fixed rank $k$ has variance $\frac{r_d(1 - \theta_k r_d)}{n\,\theta_k}$. For $r_d = 0.6$ and $n = 100\,000$, compare the standard deviations at $\theta = 1$ and $\theta = 0.25$, and check against the simulation. What does clipping the weights at $1/\theta_{\max}$ do?
::: solution
Each $c_t$ is Bernoulli with mean $\theta_k r_d$, so $\Var[c_t/\theta_k] = \theta_k r_d(1 - \theta_k r_d)/\theta_k^2 = r_d(1 - \theta_k r_d)/\theta_k$, and averaging $n$ independent terms divides by $n$. For $\theta = 1$: $\sqrt{0.6 \times 0.4/10^5} = 0.0015$. For $\theta = 0.25$: $\sqrt{0.6 \times 0.85/(0.25 \times 10^5)} = \sqrt{2.04 \times 10^{-5}} = 0.0045$, three times larger. The simulated estimate $0.6061$ for $d_2$ is $1.4$ standard deviations from $0.6$, consistent. Clipping replaces $1/\theta_k$ by $\min(1/\theta_k, M)$; it lowers the variance but makes the estimate biased downwards for documents at ranks with $\theta_k < 1/M$ — a bias–variance trade-off chosen by validation.
:::
:::
