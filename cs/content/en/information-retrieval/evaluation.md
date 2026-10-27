Two rankers have been built for the same collection: one uses the tf–idf cosine of [[information-retrieval/vector-space]], the other BM25 from [[information-retrieval/probabilistic-retrieval]]. On the query `the mock turtle sang about soup` their top fives differ. Which is better? Looking at a handful of queries and deciding which output "looks right" is how most search engines were evaluated before 1960, and it is worthless: the person looking has opinions, a handful of queries proves nothing, and nobody else can repeat the experiment. Search quality must be **measured**, on many queries, with relevance decided by people who do not know which system produced which result, using measures whose meaning is precise — and the differences found must be shown not to be accidents of the particular queries chosen.

This chapter develops that methodology. We define a **test collection** and the **pooling** method that makes large ones affordable; the set measures **precision**, **recall** and $F$; the ranked measures **precision at $k$**, **average precision** (with its interpretation as the area under the precision–recall curve) and **reciprocal rank**; and, for graded relevance, **discounted cumulative gain** and **nDCG**. Every measure is computed exactly on a worked example. We then ask when a difference in mean scores is real, comparing the paired $t$-test, the sign test and an exact randomisation test, and list the ways in which evaluations mislead. The chapter ends with evaluation by users: online experiments, interleaving and user studies. Statistical testing is developed in [Maths Atlas: hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing); here we use it.

## Test collections

::: definition Test collection {#def-test-collection}
A **test collection** consists of a document collection $D$, a set of **topics** (statements of information needs, each with a query) and **relevance judgements** (**qrels**): for each topic, a set of documents judged by human **assessors**, each labelled relevant or not relevant (**binary relevance**) or with a grade such as $0$ = not relevant, $1$ = partly, $2$ = relevant, $3$ = highly relevant (**graded relevance**). A **run** is the ranked list a system returns for each topic.
:::

This is the **Cranfield paradigm**, named after the experiments Cyril Cleverdon ran at the College of Aeronautics, Cranfield, in the 1960s: fix the documents, the needs and the judgements, and compare systems on them as in a laboratory. It abstracts away the user — the topic is fixed, the judgement of each document is independent of the others — which is both its weakness and the reason experiments are repeatable and cheap to rerun. A new ranking idea can be evaluated in minutes on a collection that took years to build.

Relevance is a judgement about the topic as written, not about the query words: a TREC topic has a title (the query), a one-sentence description and a narrative that spells out what counts as relevant. Even so, assessors disagree. Agreement is measured by **Cohen's kappa**, $\kappa = (P_o - P_e)/(1 - P_e)$, where $P_o$ is the observed fraction of documents on which two assessors agree and $P_e$ the agreement expected by chance from their individual rates. Typical values for relevance are between $0.4$ and $0.7$ — "moderate" to "substantial" agreement. Ellen Voorhees (1998) found that although different assessors' judgements changed the absolute scores of systems considerably, the *ranking* of systems by their mean scores was largely stable, which is what comparative evaluation needs.

### Pooling

Judging every document for every topic is impossible: a collection of a million documents with $50$ topics would need $50$ million judgements. **Pooling** judges only documents that some system retrieved.

::: definition Depth-$k$ pooling {#def-pooling}
Given runs from several participating systems for a topic, the **pool** of depth $k$ is the union of the top $k$ documents of every run. Assessors judge every document in the pool; documents outside the pool are treated as **not relevant**.
:::

The Text REtrieval Conference (TREC), run by the US National Institute of Standards and Technology since 1992, built its test collections this way, typically with pools of depth $100$ from dozens of systems of very different design. Pooling makes an assumption that is never quite true — that the pool contains (nearly) all relevant documents — and the danger is a **pool bias** against new systems: a system that finds relevant documents no participating system found is penalised for them, because they count as non-relevant. Justin Zobel (1998) estimated that pools of depth $100$ missed a substantial fraction of relevant documents but showed that comparisons between systems were nonetheless fairly reliable; a common check is to rerun the evaluation as if each participating system had not contributed to the pool and see whether its score changes. Measures that use only judged documents, such as **bpref** (Buckley and Voorhees, 2004), are less sensitive to incomplete judgements.

## Set-based measures

For a single topic, let $\mathit{Ret}$ be the set of documents a system returns and $\mathit{Rel}$ the set of relevant documents.

::: definition Precision, recall and F {#def-pr}
$$
\text{precision } P = \frac{\abs{\mathit{Ret} \cap \mathit{Rel}}}{\abs{\mathit{Ret}}}, \qquad \text{recall } R = \frac{\abs{\mathit{Ret} \cap \mathit{Rel}}}{\abs{\mathit{Rel}}}, \qquad F_\beta = \frac{(1 + \beta^2)\,P R}{\beta^2 P + R}.
$$
**Precision** is the fraction of retrieved documents that are relevant; **recall** the fraction of relevant documents that are retrieved. $F_1 = 2PR/(P + R)$ is their **harmonic mean**; $\beta > 1$ weights recall more heavily.
:::

Precision and recall pull against each other: returning the whole collection gives recall $1$ and tiny precision; returning one certainly relevant document gives precision $1$ and tiny recall. **Accuracy** — the fraction of all documents correctly classified as relevant or not — is useless here, because almost all documents are non-relevant to any topic: a system that returns nothing is $99.99\%$ accurate.

::: proposition The harmonic mean punishes imbalance {#prop-f1}
For $P, R \in (0, 1]$, $\min(P, R) \le F_1 \le 2\min(P, R)$, and $F_1 \le \sqrt{PR} \le (P + R)/2$.
:::

::: proof
Suppose $P \le R$. Then $F_1 = \dfrac{2PR}{P + R} = \dfrac{2P}{P/R + 1}$. Since $0 < P/R \le 1$, the denominator lies in $(1, 2]$, so $P \le F_1 < 2P$. For the second chain, $\sqrt{PR} \le (P + R)/2$ is the inequality of arithmetic and geometric means, and $F_1 = PR/\frac{P+R}{2} \le PR/\sqrt{PR} = \sqrt{PR}$ follows from it.
:::

So a system with $P = 1$ and $R = 0.01$ has $F_1 \approx 0.02$, not the $0.5$ an arithmetic mean would suggest; to score well on $F_1$, both must be good.

## Measures for ranked lists

A ranked list has a precision and a recall at every cut-off $k$. Write $\mathrm{rel}_i \in \set{0, 1}$ for the relevance of the document at rank $i$, and $R = \abs{\mathit{Rel}}$.

::: definition Precision at $k$, R-precision and reciprocal rank {#def-ranked}
- **Precision at $k$**: $P@k = \frac1k \sum_{i=1}^{k} \mathrm{rel}_i$. **Recall at $k$**: $\frac1R \sum_{i=1}^{k}\mathrm{rel}_i$.
- **R-precision**: $P@R$, the precision at the cut-off equal to the number of relevant documents (where precision and recall are equal).
- **Reciprocal rank**: $1/i^*$ where $i^*$ is the rank of the first relevant document ($0$ if none is retrieved). Averaged over topics it is the **mean reciprocal rank** (MRR), suited to tasks with one right answer.
:::

$P@10$ is easy to interpret — the fraction of the first page that is relevant — but it ignores order within the top $10$ and everything below it, and it cannot reach $1$ for a topic with fewer than $10$ relevant documents.

::: definition Average precision and MAP {#def-ap}
The **average precision** of a ranked list for a topic with $R$ relevant documents is
$$
\mathrm{AP} = \frac{1}{R} \sum_{i:\ \mathrm{rel}_i = 1} P@i,
$$ {#eq-ap}
the mean, over **all** relevant documents, of the precision at the rank of each, where relevant documents that are not retrieved contribute precision $0$. The **mean average precision** (MAP) of a run is the mean of AP over the topics.
:::

::: example Measures of one ranking {#ex-measures}
A system returns $d_3, d_7, d_1, d_9, d_4, d_2, d_8, d_5, d_6, d_{10}$ for a topic whose relevant documents are $\set{d_1, d_2, d_3, d_5, d_{11}}$. Compute $P@1$, $P@3$, $P@5$, $P@10$, R-precision, reciprocal rank and AP exactly.
::: solution
The relevant documents are at ranks $1$ ($d_3$), $3$ ($d_1$), $6$ ($d_2$) and $8$ ($d_5$); $d_{11}$ was not retrieved, and $R = 5$.

- $P@1 = 1$, $P@3 = 2/3$, $P@5 = 2/5$, $P@10 = 4/10 = 2/5$.
- R-precision $= P@5 = 2/5$. Reciprocal rank $= 1$.
- $\mathrm{AP} = \frac15\bigl(\frac11 + \frac23 + \frac36 + \frac48 + 0\bigr) = \frac15 \cdot \frac{8}{3} = \frac{8}{15} \approx 0.5333$, the final $0$ being for $d_{11}$.

A Python function that accumulates precision at each relevant rank with exact fractions prints:

```python
from fractions import Fraction as F

def average_precision(run, rel):            # rel: set of relevant docIDs (all of them, R = |rel|)
    hits, total = 0, F(0)
    for i, d in enumerate(run, 1):
        if d in rel:
            hits += 1; total += F(hits, i)  # precision at the rank of each relevant document
    return total / len(rel)
```
```text
P@1 = 1
P@3 = 2/3
P@5 = 2/5
P@10 = 2/5
AP = 8/15 = 0.5333
```
:::
:::

### Precision–recall curves

Plotting precision against recall at each relevant document gives a picture of the whole ranking. For [[#ex-measures]] the points are $(0.2, 1)$, $(0.4, 0.667)$, $(0.6, 0.5)$ and $(0.8, 0.5)$, and recall $1$ is never reached. Because precision can rise again after a run of non-relevant documents, curves are usually **interpolated**: the interpolated precision at recall level $r$ is the highest precision at any recall $\ge r$. The classic summary is precision at the **eleven** standard recall levels $0, 0.1, \dots, 1$; for the example it is $1, 1, 1, 0.667, 0.667, 0.5, 0.5, 0.5, 0.5, 0, 0$.

::: proposition AP is the area under the precision–recall curve {#prop-ap-area}
Let $p(r)$ be the uninterpolated precision–recall step function of a ranking: $p(r) = P@i$ where $i$ is the rank at which recall first reaches at least $r$, and $p(r) = 0$ for recall levels never reached. Then
$$
\mathrm{AP} = \int_0^1 p(r)\, dr.
$$
:::

::: proof
Recall increases only at ranks of relevant documents, and each such rank raises it by exactly $1/R$. So $[0, 1]$ splits into $R$ intervals $((j-1)/R, j/R]$, $j = 1, \dots, R$. On the $j$-th interval recall first reaches the level at the rank $i_j$ of the $j$-th relevant document, so $p(r) = P@i_j$ there (or $0$ if fewer than $j$ relevant documents are retrieved). Hence
$$
\int_0^1 p(r)\,dr = \sum_{j=1}^{R} \frac1R\, P@i_j,
$$
which is [[#eq-ap]], with non-retrieved relevant documents contributing $0$.
:::

AP therefore rewards both precision and recall, and rewards placing relevant documents early: moving a relevant document up one rank, past a non-relevant one, raises the precision at its own rank and lowers nothing ([[#ex-ap-swap]] is the formal version). It is the measure most used in research on ad hoc retrieval with binary judgements. Its weakness is interpretability: an AP of $0.53$ corresponds to no simple user experience.

::: quiz
Two rankings of the same topic, with $R = 2$ relevant documents. Ranking X has them at ranks $1$ and $10$; ranking Y has them at ranks $2$ and $3$. Which has the higher AP?
- [x] X
- [ ] Y, because both its relevant documents are near the top
- [ ] They are equal
- [ ] It depends on how many documents are retrieved
::: solution
$\mathrm{AP}(X) = \frac12(1/1 + 2/10) = 0.6$ and $\mathrm{AP}(Y) = \frac12(1/2 + 2/3) = 7/12 \approx 0.583$, so X is (slightly) higher. The first relevant document at rank $1$ earns a full point, which outweighs the poor second. (Reciprocal rank also prefers X: $1$ against $1/2$. $P@3$ prefers Y: $2/3$ against $1/3$.) Different measures encode different users; none is "the" quality.
:::
:::

That quiz is a warning in miniature: the answer flips with the measure, so the measure must be chosen *before* the experiment, to match the task.

## Graded relevance: DCG and nDCG

Binary relevance treats a perfect answer and a marginally useful one alike, and AP treats rank $1$ and rank $2$ almost alike. Web search users read from the top and rarely go beyond the first page, and judgements are naturally graded. Kalervo Järvelin and Jaana Kekäläinen (2002) proposed accumulating the gain of each result, discounted by its rank.

::: definition DCG and nDCG {#def-ndcg}
Let $g_i \ge 0$ be the relevance grade of the document at rank $i$. The **discounted cumulative gain** at cut-off $k$ is
$$
\mathrm{DCG}@k = \sum_{i=1}^{k} \frac{2^{g_i} - 1}{\log_2(i + 1)},
$$ {#eq-dcg}
and the **normalised** DCG is $\mathrm{nDCG}@k = \mathrm{DCG}@k / \mathrm{IDCG}@k$, where the **ideal** $\mathrm{IDCG}@k$ is the DCG@$k$ of the judged documents sorted by decreasing grade.
:::

The numerator $2^g - 1$ makes highly relevant documents worth much more than partly relevant ones ($0, 1, 3, 7$ for grades $0$ to $3$); the original paper used the grade $g$ itself, and both versions are in use, so a paper must say which. The discount $1/\log_2(i+1)$ is $1$ at rank $1$, $0.63$ at rank $2$, $0.5$ at rank $3$ and $0.29$ at rank $10$: it models a user who is less and less likely to look further down.

::: widget plot
f: 1/log2(x + 1); 1/x; 0.8^(x - 1)
x: 1, 20
y: 0, 1
labels: 1/\log_2(i+1)\ \text{(DCG)}; 1/i\ \text{(reciprocal rank)}; 0.8^{\,i-1}\ \text{(patient user, RBP)}
caption: Rank discounts implied by three measures. DCG's logarithmic discount decays slowly, so rank $20$ still counts a fifth as much as rank $1$; reciprocal rank's $1/i$ falls fast; the geometric discount of rank-biased precision corresponds to a user who moves to the next result with probability $0.8$. Choosing a discount is choosing a model of how far users read.
:::

::: proposition Properties of nDCG {#prop-ndcg}
For non-negative grades and $\mathrm{IDCG}@k > 0$, $0 \le \mathrm{nDCG}@k \le 1$, and $\mathrm{nDCG}@k = 1$ exactly when the top $k$ results have the $k$ largest grades among the judged documents, in decreasing order (up to ties).
:::

::: proof
The discounts $c_i = 1/\log_2(i + 1)$ are strictly decreasing in $i$. The top $k$ of any ranking have gains $2^{g_i} - 1$ that are at most the $k$ largest gains available, and by the **rearrangement inequality** a sum $\sum_i a_i c_i$ with decreasing weights $c_i$ is maximised, over all orderings of a given multiset $\set{a_i}$, by putting the $a_i$ in decreasing order. So $\mathrm{DCG}@k$ is at most the sum obtained by placing the $k$ largest available gains in decreasing order, which is $\mathrm{IDCG}@k$; and it is non-negative. Equality requires both choosing the $k$ largest gains and ordering them decreasingly, since the inequality is strict whenever a larger gain sits below a smaller one.
:::

::: example nDCG by hand {#ex-ndcg}
Grade the documents of [[#ex-measures]] as $d_3 = 3$, $d_2 = 3$, $d_1 = 2$, $d_{11} = 2$, $d_5 = 1$, $d_7 = 1$ and all others $0$. Compute DCG@5, IDCG@5 and nDCG@5 for the same ranking $d_3, d_7, d_1, d_9, d_4, \dots$.
::: solution
The grades at ranks $1$ to $5$ are $3, 1, 2, 0, 0$, with gains $7, 1, 3, 0, 0$. With discounts $1, 0.6309, 0.5, 0.4307, 0.3869$:
$$
\mathrm{DCG}@5 = 7 + 0.6309 + 1.5 = 9.1309.
$$
The ideal ranking takes the largest grades, $3, 3, 2, 2, 1$, with gains $7, 7, 3, 3, 1$:
$$
\mathrm{IDCG}@5 = 7 + 7 \times 0.6309 + 3 \times 0.5 + 3 \times 0.4307 + 1 \times 0.3869 = 14.5954,
$$
so $\mathrm{nDCG}@5 = 9.1309/14.5954 = 0.6256$. Note that $d_7$, judged relevant at grade $1$ but not in the binary set of [[#ex-measures]], now earns a little. A short program gives `nDCG@5 = 0.6256` and `nDCG@10 = 0.7986`.
:::
:::

Other measures with explicit user models include **rank-biased precision** (Moffat and Zobel, 2008), whose user continues to the next result with fixed probability $p$, and **expected reciprocal rank** (ERR; Chapelle, Metzler, Zhang and Grinspan, 2009), a cascade model in which the user stops at the first sufficiently relevant result, so a highly relevant document at rank $1$ makes everything below it nearly irrelevant to the score. The cascade idea returns in the click models of [[information-retrieval/learning-to-rank]].

## Is the difference real?

Suppose system A has MAP $0.366$ and system B $0.409$ on $10$ topics. Is B better, or did these $10$ topics happen to suit it? Scores vary enormously from topic to topic — some topics are easy for every system, some hard for all — so the variation *between* systems on the same topic is what matters, and the right tests are **paired**: they look at the per-topic differences. Here are hypothetical per-topic APs for illustration:

| topic | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 0.32 | 0.45 | 0.12 | 0.60 | 0.27 | 0.51 | 0.08 | 0.39 | 0.70 | 0.22 |
| B | 0.35 | 0.52 | 0.10 | 0.66 | 0.33 | 0.50 | 0.15 | 0.44 | 0.74 | 0.30 |
| B − A | 0.03 | 0.07 | −0.02 | 0.06 | 0.06 | −0.01 | 0.07 | 0.05 | 0.04 | 0.08 |

The **null hypothesis** $H_0$ is that the two systems are equally effective, so that the observed differences arise by chance. A test computes the **p-value**: the probability, if $H_0$ were true, of a result at least as extreme as the one observed.

- The **paired $t$-test** assumes the differences are a sample from a normal distribution and tests whether their mean is zero, with $t = \bar\delta / (s/\sqrt{n})$, where $\bar\delta$ is the mean difference, $s$ its sample standard deviation and $n$ the number of topics, compared with Student's $t$ distribution with $n - 1$ degrees of freedom.
- The **sign test** uses only the signs: under $H_0$ each non-zero difference is positive with probability $\tfrac12$, so the number of positive differences is $\mathrm{Binomial}(n, \tfrac12)$.
- The **randomisation** (permutation) test uses the observation that under $H_0$ the labels "A" and "B" are exchangeable within each topic: flipping the sign of any subset of differences gives an equally likely outcome. The p-value is the fraction of the $2^n$ sign assignments whose total is at least as extreme as the observed one.

::: algorithm Exact paired randomisation test {#alg-randomisation}
Input: per-topic differences $\delta_1, \dots, \delta_n$.
1. Compute the observed statistic $T_{\mathrm{obs}} = \abs{\sum_i \delta_i}$.
2. For each of the $2^n$ vectors of signs $(s_1, \dots, s_n) \in \set{+1, -1}^n$, compute $T_s = \abs{\sum_i s_i\delta_i}$.
3. Return the two-sided p-value $\abs{\set{s : T_s \ge T_{\mathrm{obs}}}} / 2^n$.
For large $n$, sample sign vectors at random instead of enumerating them all; the estimate's standard error is $\sqrt{p(1-p)/m}$ for $m$ samples.
:::

```python
import math, itertools
d = [0.03, 0.07, -0.02, 0.06, 0.06, -0.01, 0.07, 0.05, 0.04, 0.08]   # B - A per topic
n = len(d); mean = sum(d) / n
sd = math.sqrt(sum((x - mean) ** 2 for x in d) / (n - 1))
print(f"mean diff {mean:.3f}  sd {sd:.4f}  t = {mean / (sd / math.sqrt(n)):.3f}  df = {n - 1}")

pos, neg = sum(x > 0 for x in d), sum(x < 0 for x in d)
tail = sum(math.comb(pos + neg, j) for j in range(max(pos, neg), pos + neg + 1)) / 2 ** (pos + neg)
print(f"sign test: {pos} +, {neg} -, two-sided p = {min(1, 2 * tail):.4f}")

obs, count = abs(sum(d)), 0
for signs in itertools.product((1, -1), repeat=n):          # all 2^n sign flips
    if abs(sum(s * x for s, x in zip(signs, d))) >= obs - 1e-12:
        count += 1
print(f"randomisation test: {count} of {2 ** n} sign flips as extreme, p = {count / 2 ** n:.4f}")
```
```text
mean diff 0.043  sd 0.0340  t = 3.998  df = 9
sign test: 8 +, 2 -, two-sided p = 0.1094
randomisation test: 10 of 1024 sign flips as extreme, p = 0.0098
```

The two-sided $p$-value of the $t$-test, computed by integrating Student's $t$ density numerically (no statistics library needed), is $0.0031$.

::: example Reading the three tests {#ex-tests}
Interpret the three p-values above at the conventional level $\alpha = 0.05$, and explain why the sign test disagrees.
::: solution
The $t$-test ($p = 0.0031$) and the randomisation test ($p = 0.0098$) reject $H_0$: if the systems were equally good, differences as consistently positive and as large as these would arise rarely. The sign test ($p = 0.109$) does not reject. It discards the magnitudes: eight wins and two losses out of ten happen with probability $2\,(\binom{10}{8} + \binom{10}{9} + \binom{10}{10})/2^{10} = 2 \times 56/1024 = 0.109$ under $H_0$, and it does not notice that B's wins (up to $0.08$) are larger than its losses (at most $0.02$). With few topics, the sign test has low **power** — a low probability of detecting a real difference. Mark Smucker, James Allan and Ben Carterette (2007) compared tests on TREC data and found the $t$-test, the randomisation test and the bootstrap in close agreement, with the sign test and the Wilcoxon signed-rank test behaving differently; they recommended the randomisation test, which makes the fewest assumptions.
:::
:::

::: widget distribution
dist: binomial
params: n=10, p=0.5
a: 8
b: 10
caption: The null distribution of the sign test with $10$ topics: the number of topics on which B beats A if the systems are equally good. The shaded upper tail, $P(X \ge 8) = 56/1024 \approx 0.055$, doubled for a two-sided test, is the p-value $0.109$. Try $n = 50$ with $a = 32$: the same $64\%$ win rate is now significant, because more topics mean more evidence.
:::

::: warning "Significant" does not mean "important", and "not significant" does not mean "no difference"
A p-value is the probability of data at least this extreme **if the systems were equal** — not the probability that they are equal, and not a measure of how large the difference is. With thousands of queries, a difference of $0.001$ in MAP can be highly significant and of no use to anyone; with ten topics a large real improvement can fail to reach significance. Report the **effect size** (the mean difference, with a confidence interval) alongside the test. Beware **multiple comparisons**: test twenty variants against a baseline at $\alpha = 0.05$ and, even if none is better, about one will look significant by chance; correct for it (Bonferroni, Holm, or Tukey's HSD) or confirm on fresh topics. Do not tune parameters on the topics you report results on. And remember what the test generalises over: a significant result on TREC news topics says something about *similar topics on that collection*, not about all queries everywhere, and nothing at all about the documents that pooling never judged.
:::

Voorhees and Buckley (2002) estimated empirically how large a difference in MAP must be, for a given number of topics, before the ranking of two systems is likely to hold on a different topic set; with $50$ topics, differences of a few percent of MAP swapped often. This is why TREC tracks use $50$ or more topics, and why modern test collections with many shallowly judged queries are increasingly common.

## Evaluating with users

Test collections measure one idealised user. Two other kinds of evidence complement them.

**User studies** observe real people performing search tasks in a laboratory — time to complete the task, success, satisfaction, the queries they reformulate. They capture what Cranfield cannot (interfaces, snippets, the learning a user does during a session), but they are expensive, small and hard to repeat; better offline metrics do not always translate into measurably better task outcomes for users, which is a reason to run such studies.

**Online evaluation** uses the behaviour of a live system's users. In an **A/B test**, a random fraction of users is served the new ranker and the rest the old one, and metrics such as click-through rate, time to first click, abandonment and sessions per user are compared — with the statistical caveats above, plus the danger that metrics like clicks reward clickbait. An **interleaving** experiment shows each user a single list that merges the two rankers' results and credits each click to the ranker that contributed the clicked result. In **team-draft interleaving** (Radlinski, Kurup and Joachims, 2008) the two rankers take turns, in an order decided by a coin flip each round, to add their highest-ranked document not already in the list; the ranker whose "team" gets more clicks over many queries wins. Because both rankers are compared on the same query by the same user, interleaving needs far fewer queries than an A/B test to detect a difference. Clicks are biased by position — users click near the top whatever is there — and correcting for that bias is a theme of [[information-retrieval/learning-to-rank]].

::: example Agreement between assessors {#ex-kappa}
Two assessors judge the same $100$ documents for a topic. Both say relevant for $30$ and both say not relevant for $50$; A alone says relevant for $12$ and B alone for $8$. Compute Cohen's kappa.
::: solution
Observed agreement $P_o = (30 + 50)/100 = 0.8$. A says relevant for $42$ documents ($P_A = 0.42$) and B for $38$ ($P_B = 0.38$), so chance agreement is $P_e = 0.42 \times 0.38 + 0.58 \times 0.62 = 0.1596 + 0.3596 = 0.5192$. Then
$$
\kappa = \frac{0.8 - 0.5192}{1 - 0.5192} = \frac{0.2808}{0.4808} = \frac{351}{601} \approx 0.584,
$$
"moderate" agreement. The raw $80\%$ agreement looks better than it is, because two assessors who both called most documents non-relevant would agree often by chance.
:::
:::

::: history
The measures now called recall and precision were introduced in the 1950s, notably by Allen Kent and colleagues in 1955. Cyril Cleverdon's Cranfield experiments, from the late 1950s to the mid-1960s, established the methodology of test collections, and Gerard Salton's SMART experiments of the 1960s used it to compare automatic indexing methods. Keith van Rijsbergen's *Information Retrieval* (2nd edition, 1979) defined the effectiveness measure from which $F$ derives. TREC began at NIST in 1992 under Donna Harman, later led by Ellen Voorhees, and introduced pooling at scale; Zobel's analysis of pooling (1998) and Voorhees's of assessor disagreement (1998) underpin its reliability. Kalervo Järvelin and Jaana Kekäläinen introduced cumulated gain in 2000 and nDCG in "Cumulated gain-based evaluation of IR techniques" (*ACM Transactions on Information Systems*, 2002). Smucker, Allan and Carterette's comparison of significance tests appeared at CIKM 2007, and Mark Sanderson's survey "Test collection based evaluation of information retrieval systems" (2010) reviews the field.
:::

## Where this leads

Every later chapter is judged by these measures. [[information-retrieval/learning-to-rank]] optimises them directly — nDCG is not differentiable, and LambdaRank's trick for optimising it anyway depends on the swap analysis of this chapter — and learns from clicks, which requires the position-bias models sketched above. Web search ([[information-retrieval/web-search]]) adds evaluation of freshness, spam and duplicate removal. Dense retrieval ([[information-retrieval/dense-retrieval]]) is usually reported with nDCG@10 and recall@$k$ on benchmark suites, and retrieval-augmented generation adds the question of whether the retrieved passages actually support the generated answer, discussed in the [LLM Atlas](/learn/llm/lesson.php?c=prompting-rag&l=rag-evaluation). The broader problems of evaluating machine-learning systems — benchmarks, contamination, judges — are treated in the [LLM Atlas: evaluation principles](/learn/llm/lesson.php?c=evaluation&l=evaluation-principles).

::: summary
- Offline evaluation uses a **test collection** — documents, topics, relevance judgements ([[#def-test-collection]]) — built affordably by **pooling** the top results of many systems ([[#def-pooling]]), at the cost of a bias against systems that find unpooled documents.
- **Precision**, **recall** and $F_1$ ([[#def-pr]]) evaluate sets; the harmonic mean punishes imbalance ([[#prop-f1]]); accuracy is meaningless when almost everything is non-relevant.
- Rankings are evaluated by $P@k$, R-precision, reciprocal rank ([[#def-ranked]]) and **average precision** ([[#def-ap]]), which is the area under the precision–recall curve ([[#prop-ap-area]]); MAP averages it over topics.
- With graded judgements, **nDCG** ([[#def-ndcg]]) sums gains $2^g - 1$ discounted by $\log_2(i+1)$ and normalises by the ideal ordering, so it lies in $[0, 1]$ ([[#prop-ndcg]]).
- Differences must be tested with **paired** tests over topics: the $t$-test, the sign test (low power) or the exact **randomisation test** ([[#alg-randomisation]]); report effect sizes, correct for multiple comparisons, and do not tune on test topics.
- Assessors agree only moderately (Cohen's $\kappa$), but system rankings are fairly stable; online A/B tests and **interleaving** measure real users, with position bias to correct for.
:::

## Exercises

::: exercise Precision and recall {level=1 check="2/3"}
A system returns $12$ documents, of which $8$ are relevant; there are $20$ relevant documents in the collection. Compute precision, recall and $F_1$. (Enter $P$.)
::: solution
$P = 8/12 = 2/3$, $R = 8/20 = 2/5$, and $F_1 = 2PR/(P + R) = 2 \cdot \frac{2}{3}\cdot\frac{2}{5}\big/\bigl(\frac23 + \frac25\bigr) = \frac{8}{15}\big/\frac{16}{15} = \frac12$. By [[#prop-f1]], $F_1 = 0.5$ lies between $\min(P, R) = 0.4$ and $2\min(P, R) = 0.8$.
:::
:::

::: exercise Average precision {level=1 check="(1/2 + 2/4 + 3/5)/4"}
A ranking has relevant documents at ranks $2$, $4$ and $5$; the topic has $4$ relevant documents in all. Compute AP. (Enter the exact value.)
::: solution
$\mathrm{AP} = \frac14\bigl(\frac12 + \frac24 + \frac35 + 0\bigr) = \frac14 \cdot \frac{16}{10} = 0.4$. The fourth relevant document is not retrieved and contributes $0$.
:::
:::

::: exercise DCG of a short list {level=1 check="3 + 1/log2(3)"}
With grades $2, 1, 0, 2$ at ranks $1$ to $4$ and gain $2^g - 1$, compute DCG@3. (Enter the exact value.)
::: solution
The gains at ranks $1$ to $3$ are $3, 1, 0$ and the discounts $1, 1/\log_2 3, 1/2$, so $\mathrm{DCG}@3 = 3 + 1/\log_2 3 + 0 \approx 3.6309$. The grade-$2$ document at rank $4$ lies beyond the cut-off and does not count; DCG@4 would add $3/\log_2 5 \approx 1.292$.
:::
:::

::: exercise Interpolated precision {level=2}
For the ranking of [[#ex-measures]], verify the eleven-point interpolated precision values $1, 1, 1, 0.667, 0.667, 0.5, 0.5, 0.5, 0.5, 0, 0$ given in the text, and compute their mean. Why is it not equal to AP?
::: solution
The (recall, precision) points at relevant documents are $(0.2, 1)$, $(0.4, 2/3)$, $(0.6, 1/2)$, $(0.8, 1/2)$; other ranks have lower precision at the same recall, and recall $1$ is never reached. Interpolated precision at level $r$ is the maximum precision at recall $\ge r$: for $r = 0, 0.1, 0.2$ it is $1$; for $0.3, 0.4$ it is $2/3$; for $0.5$ to $0.8$ it is $1/2$; for $0.9, 1$ there is no point with recall $\ge r$, so $0$. The mean is $(3 + 4/3 + 2 + 0)/11 = (19/3)/11 = 19/33 \approx 0.576$. AP is $8/15 = 0.533$: the eleven-point average samples an *interpolated*, upper envelope of the curve at fixed recall levels, while AP integrates the uninterpolated step function exactly ([[#prop-ap-area]]).
:::
:::

::: exercise Swapping improves AP {#ex-ap-swap level=2}
Prove that if a ranking has a non-relevant document at rank $i$ and a relevant one at rank $i + 1$, swapping them strictly increases AP.
::: solution
Let the relevant document at rank $i + 1$ be the $j$-th relevant document in the list. Before the swap it contributes $P@(i+1) = j/(i+1)$ to the sum in [[#eq-ap]]; after the swap it is at rank $i$ and still the $j$-th relevant document (the document it passed is non-relevant), so it contributes $j/i > j/(i+1)$. Every other relevant document keeps its rank and the number of relevant documents above it, so its contribution is unchanged. Hence AP increases by $\frac{1}{R}\bigl(\frac{j}{i} - \frac{j}{i+1}\bigr) = \frac{j}{R\,i(i+1)} > 0$. By repeated swaps, the unique maximum $\mathrm{AP} = 1$ is reached when all retrieved relevant documents are ranked first and all relevant documents are retrieved.
:::
:::

::: exercise Sign test {level=2 check="22/1024"}
Over $10$ topics, system B beats A on $9$ and loses on $1$. What is the two-sided sign-test p-value? (Enter the exact value.)
::: solution
Under $H_0$ the number of wins is $\mathrm{Binomial}(10, 1/2)$. $\Prob(X \ge 9) = (\binom{10}{9} + \binom{10}{10})/2^{10} = 11/1024$; doubling for the two-sided test gives $22/1024 \approx 0.0215$, significant at $\alpha = 0.05$.
:::
:::

::: exercise nDCG depends on the judgements and the cut-off {level=3}
(a) Show by example that adding a relevant document to the judgements, without changing the ranking, can *decrease* a system's nDCG@$k$. (b) The judged documents of a topic are two of grade $2$ and ten of grade $1$. System X returns one grade-$2$ document at rank $1$ and nothing else relevant in its top $10$; system Y returns grade-$1$ documents at ranks $1$ to $10$. Compare their nDCG@5 and nDCG@10. What do these examples say about comparing nDCG values?
::: solution
(a) Rank $d_1, d_2$ with $d_1$ graded $1$ and nothing else judged relevant: nDCG@2 $= 1$, since the ideal list is just $d_1$. Now an assessor judges an unretrieved document with grade $3$. The ranking's DCG@2 is unchanged ($1$), but IDCG@2 becomes $7 + 1/\log_2 3 = 7.63$, so nDCG@2 drops to $0.13$. The system did nothing differently; the normaliser changed.

(b) With gain $2^g - 1$, X has DCG $3$ at both cut-offs (one gain of $3$ at rank $1$). Y has DCG@5 $= 1 + 0.631 + 0.5 + 0.431 + 0.387 = 2.949$ and DCG@10 $= 4.544$. The ideal ranking is $2, 2, 1, 1, \dots$, with IDCG@5 $= 3 + 1.893 + 0.5 + 0.431 + 0.387 = 6.210$ and IDCG@10 $= 7.805$. So
$$
\mathrm{nDCG}@5:\ X = 0.483,\ Y = 0.475; \qquad \mathrm{nDCG}@10:\ X = 0.384,\ Y = 0.582.
$$
X wins at $5$ and Y at $10$. The measure models a user, and the cut-off says how far the user reads: a user who reads five results is served slightly better by X's one excellent answer, one who reads ten by Y's many adequate ones. Compare systems only on the same topics with the same judgements and the same $k$, and never compare nDCG values across test collections.
:::
:::

::: exercise A randomisation test by hand {level=3}
Three topics give differences $\delta = (0.10, 0.05, -0.02)$. List all $8$ sign assignments, compute $\abs{\sum_i s_i\delta_i}$ for each, and find the exact two-sided p-value of [[#alg-randomisation]]. Why can a randomisation test with $n$ topics never give a p-value below $2/2^n$?
::: solution
The observed statistic is $\abs{0.10 + 0.05 - 0.02} = 0.13$. The eight sums $\pm 0.10 \pm 0.05 \pm 0.02$ (with the third sign applied to $-0.02$) are: $0.13$, $0.17$, $0.03$, $0.07$, $-0.07$, $-0.03$, $-0.17$, $-0.13$. Their absolute values are $0.13, 0.17, 0.03, 0.07, 0.07, 0.03, 0.17, 0.13$; four of them are $\ge 0.13$. So $p = 4/8 = 0.5$: three topics cannot provide evidence. In general the observed sign assignment and its negation always give the same $\abs{\cdot}$, so at least $2$ of the $2^n$ assignments are as extreme as the observation, and $p \ge 2/2^n$. With $n = 5$ topics the smallest possible two-sided p-value is $1/16 = 0.0625 > 0.05$ — no result on five topics can be significant at the $5\%$ level.
:::
:::

::: exercise Implement team-draft interleaving {level=2}
Write a function that interleaves two rankings by team-draft interleaving and records which ranker contributed each result, and a function that credits clicks. Run it with a fixed random seed on rankings `A = [1, 2, 3, 4]` and `B = [2, 5, 1, 6]`.
::: solution
```python
import random

def team_draft(A, B, length, rng):
    out, team = [], {}
    count = {"A": 0, "B": 0}
    while len(out) < length:
        # the team with fewer picks goes next; ties are broken by a coin flip
        first = "A" if count["A"] < count["B"] or (count["A"] == count["B"] and rng.random() < 0.5) else "B"
        src = A if first == "A" else B
        doc = next((d for d in src if d not in team), None)
        if doc is None:
            break
        out.append(doc); team[doc] = first; count[first] += 1
    return out, team

def credit(team, clicks):
    wins = {"A": 0, "B": 0}
    for d in clicks:
        wins[team[d]] += 1
    return wins

out, team = team_draft([1, 2, 3, 4], [2, 5, 1, 6], 4, random.Random(1))
print(out, team, credit(team, [5]))
```
```text
[1, 2, 5, 3] {1: 'A', 2: 'B', 5: 'B', 3: 'A'} {'A': 0, 'B': 1}
```
A picked first and took its top document $1$; B's top document $2$ was still free, so B took it; in the second round B again went first and, since $2$ was taken, added $5$, and A added $3$. A click on document $5$ is credited to B, which wins this query. Over many queries the fraction of wins estimates which ranker users prefer; because each team picks its own best remaining document, a document both rankers place at the top is credited to whichever picked it first, and the coin flips make that unbiased.
:::
:::
