The tf–idf weights of [[information-retrieval/vector-space]] work, but they were found by trial and error: why the logarithm of $N/\mathrm{df}$, why the logarithm of tf, how should length enter? A retrieval system is uncertain about relevance — it sees words, not the user's need — and the natural language for uncertainty is probability. If we could estimate, for every document, the probability that the user will judge it relevant, the right ranking would be obvious: most probable first. This chapter follows that idea from a principle to the formulas used in practice.

We start with the **probability ranking principle** and prove in what sense it is optimal. Making it computable with binary term occurrences gives the **binary independence model**, whose term weight, the **Robertson–Spärck Jones weight**, explains idf. Adding term frequencies through the **2-Poisson** model of eliteness and approximating its shape gives **BM25**, with its two parameters $k_1$ (tf saturation) and $b$ (length normalisation) — still, decades later, the standard first-stage ranking function. Finally, the **language-modelling** approach scores a document by how likely its language model is to generate the query; with **Dirichlet smoothing**, whose Bayesian derivation we give, it produces idf-like weighting and length normalisation without being told to. All the scores are sums of per-term contributions, so the WAND and MaxScore algorithms of [[information-retrieval/vector-space]] apply unchanged. Probability is used at the level of [Maths Atlas: conditional probability](/learn/maths/lesson.php?c=probability&l=conditional-probability).

## The probability ranking principle

Let $R \in \set{0, 1}$ be the random variable "the document is relevant to the query" for a fixed user and information need. A retrieval system can at best estimate $\Prob(R = 1 \mid d, q)$ for each document $d$ from what it observes about $d$ and $q$.

::: definition Probability ranking principle {#def-prp}
The **probability ranking principle** (PRP) states that a system should rank documents in decreasing order of their probability of relevance $\Prob(R = 1 \mid d, q)$, estimated as accurately as possible from the available data.
:::

::: theorem Optimality of the PRP {#thm-prp}
Suppose each document $d$ is relevant with probability $p_d = \Prob(R = 1 \mid d, q)$, the relevance of one document does not affect the value of another to the user, and the user examines the top $k$ documents of the ranking for some $k$. Then for every $k$, ranking by decreasing $p_d$ maximises the expected number of relevant documents among the top $k$ — and hence the expected precision at $k$ — over all rankings. Moreover, if retrieving a document costs $c_1$ when it is non-relevant and failing to retrieve it costs $c_0$ when it is relevant, the expected cost of retrieving a set $S$ is minimised by retrieving exactly the documents with $p_d > c_1/(c_0 + c_1)$, which form a top segment of the PRP ranking.
:::

::: proof
For a ranking $\pi$, let $X_i$ be the indicator that the document at rank $i$ is relevant. By linearity of expectation, the expected number of relevant documents in the top $k$ is $\E[\sum_{i \le k} X_i] = \sum_{i \le k} p_{\pi(i)}$. This is the sum of $k$ of the numbers $p_d$, and a sum of $k$ of them is largest when they are the $k$ largest; ranking in decreasing order achieves that for every $k$ at once. Dividing by $k$ gives the expected precision at $k$.

For the cost: retrieving $d$ contributes expected cost $c_1(1 - p_d)$, not retrieving it contributes $c_0 p_d$, and the costs of different documents add. So each document should be retrieved exactly when $c_1(1 - p_d) < c_0 p_d$, that is, $p_d > c_1/(c_0 + c_1)$. The set of such documents consists of those with the largest $p_d$, a prefix of the PRP ranking.
:::

The proof is short, and its assumptions are worth reading carefully. It assumes the probabilities are *known*, while real systems only estimate them, and an estimate that preserves order is enough — we need never compute probabilities, only a **rank-equivalent** score, a function that orders documents the same way. It assumes that documents are judged **independently**: the second copy of a relevant document is as valuable as the first. For a user who wants *diverse* results — several interpretations of the ambiguous query `jaguar`, or several viewpoints in a news search — the assumption fails, and ranking strictly by probability returns ten near-identical results. Diversification methods, and the near-duplicate detection of [[information-retrieval/web-search]], address this. And it optimises expected precision at fixed $k$, which is one measure among the many of [[information-retrieval/evaluation]].

## The binary independence model

To estimate $\Prob(R = 1 \mid d, q)$ we need a model of documents. The simplest represents a document by the binary vector $\vec x = (x_1, \dots, x_V)$ with $x_t = 1$ if term $t$ occurs in it.

::: definition Binary independence model {#def-bim}
The **binary independence model** (BIM) makes three assumptions: (1) documents are binary vectors $\vec x$ of term occurrences; (2) **conditional independence**: given relevance, terms occur independently, so $\Prob(\vec x \mid R = r, q) = \prod_t \Prob(x_t \mid R = r, q)$ for $r = 0, 1$; (3) terms not in the query occur equally often in relevant and non-relevant documents. Write
$$
p_t = \Prob(x_t = 1 \mid R = 1, q), \qquad u_t = \Prob(x_t = 1 \mid R = 0, q)
$$
for the probabilities that term $t$ occurs in a relevant and in a non-relevant document.
:::

::: theorem Retrieval status value of the BIM {#thm-bim}
Under the BIM, ranking by $\Prob(R = 1 \mid \vec x, q)$ is equivalent to ranking by the **retrieval status value**
$$
\mathrm{RSV}(d) = \sum_{t \in q,\ x_t = 1} c_t, \qquad c_t = \log \frac{p_t\,(1 - u_t)}{u_t\,(1 - p_t)}.
$$ {#eq-rsv}
:::

::: proof
A probability and its odds $O = P/(1 - P)$ are in increasing correspondence, so we may rank by odds, and by Bayes' theorem
$$
O(R \mid \vec x, q) = \frac{\Prob(R = 1 \mid \vec x, q)}{\Prob(R = 0 \mid \vec x, q)} = \frac{\Prob(R = 1 \mid q)}{\Prob(R = 0 \mid q)} \cdot \frac{\Prob(\vec x \mid R = 1, q)}{\Prob(\vec x \mid R = 0, q)}.
$$
The first factor does not depend on the document, so it can be dropped. By conditional independence the second factor is a product over all terms of $\Prob(x_t \mid R=1, q)/\Prob(x_t \mid R=0, q)$, and by assumption (3) every factor for a term not in the query equals $1$. For a query term the factor is $p_t/u_t$ if $x_t = 1$ and $(1 - p_t)/(1 - u_t)$ if $x_t = 0$. Hence
$$
O(R \mid \vec x, q) \propto \prod_{t \in q,\ x_t = 1} \frac{p_t}{u_t} \prod_{t \in q,\ x_t = 0} \frac{1 - p_t}{1 - u_t} = \prod_{t \in q,\ x_t = 1} \frac{p_t (1 - u_t)}{u_t (1 - p_t)} \cdot \prod_{t \in q} \frac{1 - p_t}{1 - u_t},
$$
where we multiplied and divided by $(1 - p_t)/(1 - u_t)$ for each query term present. The last product is over all query terms and is the same for every document. Taking logarithms, which preserves order, leaves [[#eq-rsv]].
:::

The weight $c_t$ is a **log odds ratio**: the log of the odds of $t$ appearing in a relevant document divided by the odds of it appearing in a non-relevant one. A term that is as likely in either class gets weight $0$; a term that signals relevance gets a positive weight.

### Estimating the weights

If the user has judged some documents — say $R$ documents are known to be relevant, of which $r_t$ contain term $t$, out of $N$ documents of which $n_t = \mathrm{df}_t$ contain $t$ — then natural estimates are $p_t \approx r_t/R$ and $u_t \approx (n_t - r_t)/(N - R)$. Adding $\tfrac12$ to each count to avoid zeros and infinite weights gives the **Robertson–Spärck Jones weight**
$$
w^{\mathrm{RSJ}}_t = \log \frac{(r_t + 0.5)\,/\,(R - r_t + 0.5)}{(n_t - r_t + 0.5)\,/\,(N - n_t - R + r_t + 0.5)}.
$$ {#eq-rsj}

With **no relevance information** ($R = r_t = 0$) the weight becomes
$$
w^{\mathrm{RSJ}}_t = \log \frac{N - n_t + 0.5}{n_t + 0.5},
$$ {#eq-rsj-idf}
which for $n_t \ll N$ is approximately $\log(N/n_t)$ — inverse document frequency. The BIM therefore *explains* idf: it is the log odds ratio when we assume that a query term is equally likely to be present or absent in relevant documents ($p_t = 0.5$, cancelling) and estimate its probability in non-relevant documents by its frequency in the whole collection, which is mostly non-relevant. This derivation, due to Croft and Harper (1979) and Robertson, gave Spärck Jones's empirical idf a theoretical basis.

::: example A term weight with and without feedback {#ex-rsj}
A collection has $N = 1\,000$ documents; a term occurs in $n_t = 100$. The user has judged $R = 20$ documents relevant, and $15$ of them contain the term. Compute the RSJ weight with and without this information (natural logarithms).
::: solution
With feedback, [[#eq-rsj]] gives
$$
w = \ln \frac{15.5 / 5.5}{85.5 / (1000 - 100 - 20 + 15 + 0.5)} = \ln \frac{2.818}{85.5/895.5} = \ln(2.818 \times 10.474) = \ln 29.52 = 3.385.
$$
Without feedback, [[#eq-rsj-idf]] gives $\ln(900.5/100.5) = \ln 8.96 = 2.193$. The term occurs in $75\%$ of the relevant documents but only $10\%$ of the collection, so the evidence from feedback raises its weight by over a half. The same formula used with the top documents of an initial search in place of judged ones is the probabilistic form of pseudo-relevance feedback.
:::
:::

::: warning Negative idf for very common terms
Formula [[#eq-rsj-idf]] is **negative** when $n_t > N/2$: a term present in most documents counts as evidence *against* relevance. In *Alice*'s $800$ paragraphs, `the` occurs in $643$ and gets $\ln(157.5/643.5) = -1.407$, so a paragraph that contains `the` scores lower than an otherwise identical one that does not. This is the model working as designed — under its assumptions, presence of such a term is more typical of non-relevant documents — but it surprises users and can break algorithms that assume non-negative contributions, such as WAND ([[information-retrieval/vector-space#thm-wand]]). Many implementations therefore floor the weight at a small positive value, or use $\log\bigl(1 + (N - n_t + 0.5)/(n_t + 0.5)\bigr)$, as Lucene does; for `the` in *Alice* this gives $0.219$.
:::

## From binary occurrence to term frequency: BM25

The BIM ignores how many times a term occurs. Stephen Harter (1975) proposed that a term's occurrences are governed by whether the document is **elite** for the term — genuinely about the concept the term denotes — and that, given eliteness, the term frequency is Poisson distributed with a higher mean in elite documents than in non-elite ones.

::: definition The 2-Poisson model {#def-2poisson}
For a fixed term, each document is **elite** ($E$) or not ($\bar E$). Given eliteness, $\mathrm{tf} \sim \mathrm{Poisson}(\lambda_1)$; given non-eliteness, $\mathrm{tf} \sim \mathrm{Poisson}(\lambda_0)$, with $\lambda_1 > \lambda_0$. Relevance affects term frequency only through eliteness, with $\pi_1 = \Prob(E \mid R = 1)$ and $\pi_0 = \Prob(E \mid R = 0)$, $\pi_1 > \pi_0$. The **term-frequency weight** is the log odds ratio of observing $\mathrm{tf}$ against observing $0$:
$$
w(\mathrm{tf}) = \log \frac{\Prob(\mathrm{tf} \mid R = 1)\,\Prob(0 \mid R = 0)}{\Prob(\mathrm{tf} \mid R = 0)\,\Prob(0 \mid R = 1)}.
$$
:::

The weight is the extension of $c_t$ from "present versus absent" to "present $\mathrm{tf}$ times versus absent"; by the argument of [[#thm-bim]], with term frequencies in place of binary features, the score of a document is the sum of $w(\mathrm{tf}_{t,d})$ over the query terms.

::: proposition Shape of the 2-Poisson weight {#prop-saturation}
Under the 2-Poisson model, $w(0) = 0$, $w(\mathrm{tf})$ is strictly increasing in $\mathrm{tf}$, and it is bounded:
$$
\lim_{\mathrm{tf} \to \infty} w(\mathrm{tf}) = \log \frac{\pi_1}{\pi_0} + \log \frac{\Prob(0 \mid R = 0)}{\Prob(0 \mid R = 1)}.
$$
:::

::: proof
Write $P_\lambda(n) = e^{-\lambda}\lambda^n/n!$. By the model, $\Prob(n \mid R = r) = \pi_r P_{\lambda_1}(n) + (1 - \pi_r) P_{\lambda_0}(n)$. Divide numerator and denominator of $\Prob(n \mid R=1)/\Prob(n \mid R=0)$ by $P_{\lambda_0}(n)$ and put $x = P_{\lambda_1}(n)/P_{\lambda_0}(n) = e^{-(\lambda_1 - \lambda_0)}(\lambda_1/\lambda_0)^n$:
$$
\frac{\Prob(n \mid R = 1)}{\Prob(n \mid R = 0)} = \frac{\pi_1 x + (1 - \pi_1)}{\pi_0 x + (1 - \pi_0)} =: g(x).
$$
Since $\lambda_1 > \lambda_0$, $x$ is strictly increasing in $n$ and tends to infinity. The function $g$ is a ratio of linear functions with derivative $g'(x) = \frac{\pi_1(1 - \pi_0) - \pi_0(1 - \pi_1)}{(\pi_0 x + 1 - \pi_0)^2} = \frac{\pi_1 - \pi_0}{(\pi_0 x + 1 - \pi_0)^2} > 0$, so $g$ is strictly increasing, and $g(x) \to \pi_1/\pi_0$ as $x \to \infty$. Now $w(n) = \log g(x(n)) - \log g(x(0))$, the second term being the constant $\log[\Prob(0 \mid R=1)/\Prob(0 \mid R=0)]$. So $w(0) = 0$, $w$ is strictly increasing, and its limit is $\log(\pi_1/\pi_0) - \log g(x(0))$, which is the stated value.
:::

So a term's contribution should rise with tf but **saturate**: the first occurrences provide most of the evidence that a document is elite for the term, and further occurrences add less and less. The asymptote resembles the BIM weight of eliteness itself. Raw tf (unbounded) and $1 + \log\mathrm{tf}$ (unbounded, though slowly growing) both get this wrong.

::: widget plot
f: ln((p*exp(-a)*a^x + (1-p)*exp(-c)*c^x)/(r*exp(-a)*a^x + (1-r)*exp(-c)*c^x)) - ln((p*exp(-a) + (1-p)*exp(-c))/(r*exp(-a) + (1-r)*exp(-c))); 2.2*x/(1.2 + x)
sliders: a=2:0.5:10; c=0.1:0.1:1.5; p=0.3:0.05:0.95; r=0.02:0.02:0.4
x: 0, 15
y: 0, 5
labels: w(\mathrm{tf})\ \text{(2-Poisson)}; \frac{(k_1+1)\,\mathrm{tf}}{k_1+\mathrm{tf}},\ k_1 = 1.2
caption: The 2-Poisson term weight of [[#prop-saturation]] (with $a = \lambda_1$, $c = \lambda_0$, $p = \pi_1$, $r = \pi_0$; the factorials cancel, so the curve is drawn for continuous tf) beside BM25's simple saturating function. Change the parameters: the exact weight always starts at $0$, rises and levels off, but its shape and ceiling vary. BM25 keeps only the shape, with one parameter $k_1$, and takes the ceiling from the idf weight.
:::

::: example The 2-Poisson weight in numbers {#ex-2poisson}
Take $\lambda_1 = 4$ (an elite document uses the term about four times), $\lambda_0 = 0.5$, $\pi_1 = 0.6$ and $\pi_0 = 0.1$. Compute $w(\mathrm{tf})$ for small tf and its limit.
::: solution
First $\Prob(0 \mid R = 1) = 0.6e^{-4} + 0.4e^{-0.5} = 0.2536$ and $\Prob(0 \mid R = 0) = 0.1e^{-4} + 0.9e^{-0.5} = 0.5477$. Evaluating the definition (natural logarithms) for $\mathrm{tf} = 0, 1, \dots, 8$ gives
$$
0,\ 0.242,\ 1.125,\ 2.145,\ 2.497,\ 2.553,\ 2.561,\ 2.562,\ 2.562,
$$
and the limit of [[#prop-saturation]] is $\ln(0.6/0.1) + \ln(0.5477/0.2536) = 1.792 + 0.770 = 2.562$. The curve is S-shaped here: one occurrence is weak evidence, because non-elite documents (Poisson mean $0.5$) also produce single occurrences; the second and third occurrences carry most of the evidence; after about five the document is almost certainly elite and further occurrences add nothing. BM25's $\mathrm{tf}/(k_1 + \mathrm{tf})$ is concave from the start and misses the initial S, a simplification that has proved harmless in practice.
:::
:::

The exact 2-Poisson weight needs four unknown parameters per term, which cannot be estimated reliably without relevance judgements. Stephen Robertson and Steve Walker (1994) replaced it by a function with the same qualitative behaviour — zero at zero, increasing, saturating — and a single global parameter:
$$
\frac{\mathrm{tf}}{k_1 + \mathrm{tf}}, \qquad\text{scaled to}\qquad \frac{(k_1 + 1)\,\mathrm{tf}}{k_1 + \mathrm{tf}},
$$
which is $1$ at $\mathrm{tf} = 1$ and tends to $k_1 + 1$. Small $k_1$ saturates quickly (with $k_1 = 0$, only presence counts, as in the BIM); large $k_1$ approaches raw tf.

### Document length

A long document has more occurrences of every term, either because it covers more topics (the **scope** hypothesis: it is likelier to be relevant) or because it is wordier (the **verbosity** hypothesis: its counts are inflated and should be scaled down). BM25 adopts a mixture: it normalises tf by document length partially, with a parameter $b \in [0, 1]$.

::: definition BM25 {#def-bm25}
For a query $q$ and document $d$ of length $\mathrm{dl}_d$ tokens, with average document length $\mathrm{avgdl}$, the **BM25** score is
$$
\mathrm{BM25}(q, d) = \sum_{t \in q} w_t \cdot \frac{(k_1 + 1)\, \mathrm{tf}_{t,d}}{K_d + \mathrm{tf}_{t,d}}, \qquad K_d = k_1 \Bigl( (1 - b) + b \,\frac{\mathrm{dl}_d}{\mathrm{avgdl}} \Bigr),
$$ {#eq-bm25}
where $w_t$ is the RSJ weight [[#eq-rsj-idf]] (or [[#eq-rsj]] when relevance information is available). Typical parameter values are $k_1 \in [1.2, 2]$ and $b = 0.75$. A query term repeated in the query can be weighted by a third saturating factor $(k_3 + 1)\mathrm{qtf}/(k_3 + \mathrm{qtf})$.
:::

With $b = 0$ there is no length normalisation; with $b = 1$, tf is effectively divided by the relative length $\mathrm{dl}_d/\mathrm{avgdl}$ before saturation. For a document of average length $K_d = k_1$, whatever $b$ is. (The name is simply "Best Match 25", the 25th of a series of weighting functions tried in the Okapi system at City University London.)

::: widget plot
f: (k+1)*x/(k*((1-b) + b*L) + x)
sliders: k=0:0.1:3; b=0:0.05:1; L=0.25:0.25:4
x: 0, 20
y: 0, 4
labels: \frac{(k_1+1)\,\mathrm{tf}}{K + \mathrm{tf}},\ K = k_1\bigl((1-b) + b L\bigr)
caption: The BM25 term-frequency factor as a function of tf, with $k = k_1$, length-normalisation weight $b$ and relative document length $L = \mathrm{dl}/\mathrm{avgdl}$. Set $L = 1$ and vary $k_1$ to see the saturation speed change; then fix $k_1 = 1.2$, $b = 0.75$ and move $L$ from $0.25$ to $4$: in a document four times the average length, a term needs far more occurrences to earn the same weight. With $b = 0$, $L$ has no effect.
:::

::: example BM25 by hand {#ex-bm25}
In *Alice*'s $800$ paragraphs the average length is $\mathrm{avgdl} = 33.3$ tokens. The RSJ weights (natural logarithms, [[#eq-rsj-idf]]) are $2.617$ for `mock`, $2.657$ for `turtle` and $4.321$ for `soup`. Paragraph $516$ has $12$ tokens and contains each of the three terms once; paragraph $593$ has $40$ tokens and contains `mock` and `turtle` once each but not `soup`. Compute their BM25 scores for the query `mock turtle soup` with $k_1 = 1.2$, $b = 0.75$.
::: solution
*Paragraph 516.* $K = 1.2\,(0.25 + 0.75 \times 12/33.3) = 1.2 \times 0.520 = 0.624$. Each term has $\mathrm{tf} = 1$, so its factor is $2.2 \times 1/(0.624 + 1) = 1.354$. The score is $1.354 \times (2.617 + 2.657 + 4.321) = 1.354 \times 9.595 = 12.997$.

*Paragraph 593.* $K = 1.2\,(0.25 + 0.75 \times 40/33.3) = 1.381$, factor $2.2/2.381 = 0.924$, and the score is $0.924 \times (2.617 + 2.657) = 4.874$.

The short paragraph wins on two counts: it contains the rare term `soup`, and its shortness raises the factor for each matched term from $0.924$ to $1.354$. The program below prints `12.9969` and `4.8736`.
:::
:::

Here is BM25 over *Alice*, together with the query-likelihood model developed below, so that the three rankings can be compared:

```python
import re, math, heapq
from collections import Counter

docs = [Counter(tokenize(p)) for p in paras]          # the 800 paragraphs, as before
N = len(docs)
dl = [sum(c.values()) for c in docs]                  # document lengths in tokens
avgdl = sum(dl) / N
df = Counter(t for c in docs for t in c)

def bm25_idf(t):                                      # RSJ weight with no relevance information
    return math.log((N - df[t] + 0.5) / (df[t] + 0.5))

def bm25(q, d, k1=1.2, b=0.75):
    K = k1 * ((1 - b) + b * dl[d] / avgdl)
    return sum(bm25_idf(t) * docs[d][t] * (k1 + 1) / (K + docs[d][t])
               for t in set(tokenize(q)) if docs[d][t] > 0)

def top(score, q, k=5, **kw):
    return heapq.nlargest(k, ((score(q, d, **kw), d) for d in range(N)))
```
```text
BM25 k1=1.2 b=0.75
   10.637 doc 516 len  12: `It's the thing Mock Turtle Soup is made
    8.370 doc 593 len  40: So they began solemnly dancing round and round
    8.213 doc 646 len  38: `Oh, a song, please, if the Mock Turtle
    7.539 doc 585 len  13: `Turn a somersault in the sea!' cried the
    7.284 doc 637 len  19: `But about his toes?' the Mock Turtle persisted.
BM25 k1=1.2 b=0
    9.106 doc 593 len  40: So they began solemnly dancing round and round
    8.657 doc 646 len  38: `Oh, a song, please, if the Mock Turtle
    7.660 doc 516 len  12: `It's the thing Mock Turtle Soup is made
    7.548 doc 604 len  51: `You're wrong about the crumbs,' said the Mock
    6.459 doc 480 len  94: `When I'M a Duchess,' she said to herself,
```

for the query `the mock turtle sang about soup`. Compared with cosine tf–idf, whose top five contained four one-line paragraphs, BM25 brings up paragraph $593$ ("…while the Mock Turtle sang this, very slowly and sadly") — the rare word `sang` has weight $5.77$ — and paragraph $646$, which asks the Mock Turtle for the song "Turtle Soup". Setting $b = 0$ removes length normalisation, and longer paragraphs such as $604$ ($51$ tokens) and $480$ ($94$) move up. The negative weight of `the` lowers every score by a small amount that depends on the paragraph's length.

BM25's parameters should be tuned on queries with relevance judgements from the same kind of collection; the default values are a reasonable starting point, not optima. Its extension **BM25F** (Robertson, Zaragoza and Taylor, 2004) handles documents with fields (title, body, anchor text) by computing a weighted sum of each term's frequencies across fields, each field with its own length normalisation, *before* saturation — summing per-field BM25 scores instead would let a term saturate separately in every field and over-reward matches in many fields.

::: quiz
In BM25 with $k_1 = 1.2$ and $b = 0.75$, a query term occurs twice in a document that is exactly as long as the average. What is its tf factor $(k_1+1)\mathrm{tf}/(K + \mathrm{tf})$?
- [ ] $2$
- [x] $4.4/3.2 = 1.375$
- [ ] $2.2$
- [ ] It depends on $b$.
::: solution
For a document of average length $K = k_1((1 - b) + b) = k_1 = 1.2$, whatever $b$ is. Then the factor is $2.2 \times 2/(1.2 + 2) = 4.4/3.2 = 1.375$. One occurrence gives $1$, two give $1.375$, and infinitely many would give $2.2$: the second occurrence adds $37.5\%$ of the first one's weight.
:::
:::

## Language models for retrieval

Jay Ponte and Bruce Croft (1998) proposed a different probabilistic view. Instead of modelling relevance directly, imagine that each document $d$ was generated by a **language model** $\theta_d$, a probability distribution over terms, and rank documents by the probability that the query was generated by the same model, $\Prob(q \mid \theta_d)$ — the **query-likelihood** model. A paragraph about the Mock Turtle has a language model in which `mock`, `turtle` and `soup` are likely, and so is likely to have generated a query containing them. (Language models in general, from $n$-grams to transformers, are the subject of the [LLM Atlas](/learn/llm/lesson.php?c=text-and-language&l=ngram-models); here we need only unigram models.)

::: definition Query likelihood with a unigram model {#def-ql}
A **unigram language model** $\theta$ assigns a probability $\theta_t$ to each term, with $\sum_t \theta_t = 1$, and generates a query $q = t_1 t_2 \dots t_{\abs q}$ by drawing its terms independently: $\Prob(q \mid \theta) = \prod_{i} \theta_{t_i}$. The **query-likelihood score** of a document is $\log \Prob(q \mid \theta_d) = \sum_{i} \log \theta_{d, t_i}$, where $\theta_d$ is estimated from $d$.
:::

The **maximum-likelihood estimate** is $\theta_{d,t} = \mathrm{tf}_{t,d}/\mathrm{dl}_d$, the fraction of the document's tokens that are $t$. It has a fatal flaw: a document missing *any* query term gets probability $0$, which turns query likelihood into a strict Boolean AND. A document's text is a small sample of the language of its topic; that `soup` does not occur in a paragraph about the Mock Turtle does not mean its author could never have used the word. The estimate must be **smoothed** — some probability moved from seen to unseen terms — using the **collection model** $\Prob(t \mid C) = \mathrm{cf}_t / \abs{C}$, where $\mathrm{cf}_t$ is the total number of occurrences of $t$ in the collection and $\abs C$ the total number of tokens.

- **Jelinek–Mercer** smoothing interpolates with a fixed weight $\lambda \in (0, 1)$: $\theta_{d,t} = (1 - \lambda)\, \mathrm{tf}_{t,d}/\mathrm{dl}_d + \lambda\, \Prob(t \mid C)$.
- **Dirichlet** smoothing adds $\mu$ "pseudo-tokens" distributed like the collection: $\theta_{d,t} = \dfrac{\mathrm{tf}_{t,d} + \mu\, \Prob(t \mid C)}{\mathrm{dl}_d + \mu}$.

Dirichlet smoothing has a natural Bayesian justification.

::: theorem Dirichlet smoothing is a posterior mean {#thm-dirichlet}
Let the document's model $\theta_d$ have the Dirichlet prior with parameters $\alpha_t = \mu\,\Prob(t \mid C)$, and let the document be $\mathrm{dl}_d$ independent draws from $\theta_d$ with counts $\mathrm{tf}_{t,d}$. Then the posterior distribution of $\theta_d$ is Dirichlet with parameters $\alpha_t + \mathrm{tf}_{t,d}$, and its mean is
$$
\E[\theta_{d,t} \mid d] = \frac{\mathrm{tf}_{t,d} + \mu\, \Prob(t \mid C)}{\mathrm{dl}_d + \mu}.
$$
:::

::: proof
The Dirichlet density with parameters $\alpha$ is proportional to $\prod_t \theta_t^{\alpha_t - 1}$ on the probability simplex, and the likelihood of the document's counts is proportional to $\prod_t \theta_t^{\mathrm{tf}_t}$ (the multinomial coefficient does not depend on $\theta$). By Bayes' theorem the posterior is proportional to their product, $\prod_t \theta_t^{\alpha_t + \mathrm{tf}_t - 1}$, which is the unnormalised Dirichlet density with parameters $\alpha_t + \mathrm{tf}_t$. The mean of a Dirichlet distribution with parameters $\beta_t$ is $\beta_t / \sum_s \beta_s$. Here $\sum_s (\alpha_s + \mathrm{tf}_s) = \mu \sum_s \Prob(s \mid C) + \mathrm{dl}_d = \mu + \mathrm{dl}_d$, which gives the formula.
:::

The prior acts as if we had seen $\mu$ tokens of the collection's language before reading the document. A short document is dominated by the prior; a long document by its own counts — exactly the right behaviour, since a long document is a larger, more reliable sample. Unlike Jelinek–Mercer, the amount of smoothing therefore depends on document length. Chengxiang Zhai and John Lafferty's study of smoothing methods (2001) found Dirichlet smoothing particularly effective for short (title) queries, with good values of $\mu$ often around $2\,000$ on news collections; the best $\mu$ grows with typical document length, and for *Alice*'s short paragraphs we use $\mu = 100$.

### Where are tf, idf and length?

Query likelihood looks nothing like tf–idf, yet it behaves like it.

::: proposition A rank-equivalent form {#prop-ql-rank}
With Dirichlet smoothing, ranking by $\log\Prob(q \mid \theta_d)$ is equivalent to ranking by
$$
\sum_{t \in q,\ \mathrm{tf}_{t,d} > 0} \log\Bigl(1 + \frac{\mathrm{tf}_{t,d}}{\mu\, \Prob(t \mid C)}\Bigr) \;+\; \abs{q} \log \frac{\mu}{\mathrm{dl}_d + \mu},
$$
where the sum counts a query term once for each of its occurrences in the query.
:::

::: proof
Write $p_t = \Prob(t \mid C)$. Factor each smoothed probability as
$$
\frac{\mathrm{tf}_{t,d} + \mu p_t}{\mathrm{dl}_d + \mu} = \frac{\mu p_t}{\mathrm{dl}_d + \mu}\Bigl(1 + \frac{\mathrm{tf}_{t,d}}{\mu p_t}\Bigr).
$$
Taking logarithms and summing over the query's terms,
$$
\log \Prob(q \mid \theta_d) = \sum_{t \in q} \log\Bigl(1 + \frac{\mathrm{tf}_{t,d}}{\mu p_t}\Bigr) + \sum_{t \in q}\log p_t + \abs{q}\log\frac{\mu}{\mathrm{dl}_d + \mu}.
$$
The middle sum is the same for every document and can be dropped. In the first sum, terms with $\mathrm{tf}_{t,d} = 0$ contribute $\log 1 = 0$.
:::

The first sum is a tf–idf-like weight: it grows with $\mathrm{tf}_{t,d}$ (logarithmically, a form of saturation) and is large when $p_t$ is small, i.e. when the term is rare in the collection — the role of idf, which nobody put in by hand. The second term is a **length penalty**: it is the same for documents of equal length and lower for longer documents, because a long document spreads its probability over more terms. And the score is a sum of per-term contributions over the matching terms, plus a per-document constant, so inverted-index processing and (with care for the length term) dynamic pruning apply.

::: example Smoothing by hand {#ex-dirichlet}
In *Alice*'s paragraphs, $\abs{C} = 26\,643$ tokens, `mock` occurs $56$ times and `soup` $18$ times in all. With $\mu = 100$, compute the Dirichlet-smoothed probabilities of `mock` and `soup` and the query log-likelihood of `mock soup` for paragraph $516$ ($12$ tokens, each term once) and paragraph $593$ ($40$ tokens, `mock` once, no `soup`).
::: solution
Collection probabilities: $\Prob(\texttt{mock} \mid C) = 56/26\,643 = 0.002102$ and $\Prob(\texttt{soup} \mid C) = 18/26\,643 = 0.000676$, so $\mu\Prob(\cdot \mid C)$ is $0.2102$ and $0.0676$.

Paragraph $516$: $\theta_{\texttt{mock}} = (1 + 0.2102)/112 = 0.010805$ and $\theta_{\texttt{soup}} = (1 + 0.0676)/112 = 0.009532$; the log-likelihood (natural logarithms) is $-4.528 - 4.653 = -9.181$.

Paragraph $593$: $\theta_{\texttt{mock}} = 1.2102/140 = 0.008644$ and $\theta_{\texttt{soup}} = 0.0676/140 = 0.000483$ — small but not zero; the log-likelihood is $-4.751 - 7.636 = -12.387$.

So $516$ ranks above $593$ by $3.206$. The rank-equivalent form of [[#prop-ql-rank]] gives $\ln(1 + 1/0.2102) + \ln(1 + 1/0.0676) + 2\ln(100/112) = 4.284$ for $516$ and $\ln(1 + 1/0.2102) + 2\ln(100/140) = 1.078$ for $593$ — the same difference, $3.206$. Missing `soup` costs paragraph $593$ the large contribution $\ln(1 + 1/0.0676) = 2.76$ that a rare term earns.
:::
:::

On the running query the Dirichlet model ($\mu = 100$) ranks paragraphs $593$, $516$, $646$, $604$ and $585$ at the top, much like BM25:

```text
Dirichlet mu=100
  -30.896 doc 593 len  40: So they began solemnly dancing round and round
  -31.696 doc 516 len  12: `It's the thing Mock Turtle Soup is made
  -32.348 doc 646 len  38: `Oh, a song, please, if the Mock Turtle
  -32.670 doc 604 len  51: `You're wrong about the crumbs,' said the Mock
  -33.166 doc 585 len  13: `Turn a somersault in the sea!' cried the
```

The language-modelling framework extends naturally. Relevance feedback becomes the estimation of a better *query* model, as in the **relevance models** of Lavrenko and Croft (2001) and their variant RM3, a strong pseudo-relevance feedback baseline. Ranking by the Kullback–Leibler divergence between a query model and a document model generalises query likelihood. And translation models allow a document to generate query terms it does not contain, a step towards the semantic matching of [[information-retrieval/dense-retrieval]].

::: history
M. E. Maron and J. L. Kuhns proposed ranking by probability of relevance in "On relevance, probabilistic indexing and information retrieval" (*Journal of the ACM*, 1960). Stephen Robertson and Karen Spärck Jones derived the relevance weights of the binary independence model in "Relevance weighting of search terms" (*Journal of the American Society for Information Science*, 1976), and Robertson stated and analysed the probability ranking principle in 1977. Stephen Harter's 2-Poisson model of term occurrence appeared in 1975. Robertson and Steve Walker's "Some simple effective approximations to the 2-Poisson model for probabilistic weighted retrieval" (SIGIR 1994) introduced the saturation and length-normalisation approximations, and BM25 was used by the Okapi team at City University London in TREC-3 the same year. Jay Ponte and Bruce Croft introduced the language-modelling approach at SIGIR 1998, and Chengxiang Zhai and John Lafferty's study of smoothing (SIGIR 2001; journal version 2004) established Dirichlet smoothing. Robertson and Hugo Zaragoza's monograph "The probabilistic relevance framework: BM25 and beyond" (2009) is the definitive account of the theory.
:::

## Where this leads

BM25 and Dirichlet-smoothed query likelihood are the standard baselines against which every new ranking method is compared, and in practice the first stage of most multi-stage rankers: they are fast over an inverted index with WAND or MaxScore ([[information-retrieval/vector-space]]), need no training data and are robust across collections. Whether one ranking is better than another is decided by the evaluation methods of [[information-retrieval/evaluation]]. BM25 scores of different fields, query-likelihood scores, proximity features and link-based quality scores such as PageRank ([[information-retrieval/web-search]]) become the input features of the learned rankers in [[information-retrieval/learning-to-rank]], and neural models that learn term weights — learned sparse retrieval — keep BM25's inverted-index form while replacing its weights ([[information-retrieval/dense-retrieval]]).

::: summary
- The **probability ranking principle** ([[#def-prp]]) ranks by $\Prob(R = 1 \mid d, q)$; it maximises expected precision at every cut-off when relevance judgements are independent ([[#thm-prp]]), but it ignores redundancy and diversity.
- The **binary independence model** ([[#def-bim]]) yields a sum of log odds ratios over matching query terms ([[#thm-bim]]); with no relevance information the Robertson–Spärck Jones weight reduces to an idf, $\log\frac{N - n_t + 0.5}{n_t + 0.5}$ ([[#eq-rsj-idf]]), negative for terms in more than half the documents.
- The **2-Poisson** eliteness model ([[#def-2poisson]]) implies a term-frequency weight that is increasing and **saturating** ([[#prop-saturation]]).
- **BM25** ([[#def-bm25]]) approximates that shape with $(k_1 + 1)\mathrm{tf}/(K + \mathrm{tf})$ and normalises length partially with $b$; typical values are $k_1 \approx 1.2$–$2$, $b \approx 0.75$, to be tuned.
- **Query likelihood** ([[#def-ql]]) ranks by $\Prob(q \mid \theta_d)$; smoothing is essential, and **Dirichlet** smoothing is the posterior mean under a Dirichlet prior centred on the collection model ([[#thm-dirichlet]]).
- The smoothed score is rank-equivalent to an idf-like sum plus a length penalty ([[#prop-ql-rank]]): tf, idf and length normalisation emerge from the model.
- All these scores are sums of per-term contributions, so inverted-index query processing and safe pruning apply.
:::

## Exercises

::: exercise An RSJ weight {level=1 check="ln(9.5/1.5)"}
A collection has $N = 10$ documents and a term occurs in $1$ of them. With no relevance information, what is its RSJ weight [[#eq-rsj-idf]] (natural logarithm)? (Enter the weight.)
::: solution
$\ln\frac{10 - 1 + 0.5}{1 + 0.5} = \ln\frac{9.5}{1.5} = \ln 6.33 \approx 1.846$, close to $\ln(N/n_t) = \ln 10 = 2.303$ but smaller because of the $0.5$ corrections, which matter most for small counts.
:::
:::

::: exercise A BM25 factor {level=1 check="2.2*3/(1.2*(0.25 + 0.75*2) + 3)"}
With $k_1 = 1.2$ and $b = 0.75$, compute the BM25 tf factor $(k_1+1)\mathrm{tf}/(K + \mathrm{tf})$ for $\mathrm{tf} = 3$ in a document twice the average length. (Enter the factor.)
::: solution
$K = 1.2 \times (0.25 + 0.75 \times 2) = 1.2 \times 1.75 = 2.1$, so the factor is $2.2 \times 3 / (2.1 + 3) = 6.6/5.1 \approx 1.294$. In a document of average length ($K = 1.2$) it would be $6.6/4.2 = 1.571$.
:::
:::

::: exercise Expected precision {level=1 check="2.1"}
Five documents have probabilities of relevance $0.9, 0.2, 0.7, 0.5, 0.4$. What is the expected number of relevant documents in the top $3$ of the PRP ranking? (Enter the expectation.)
::: solution
The PRP ranking is $0.9, 0.7, 0.5, 0.4, 0.2$, and by linearity of expectation the top three contain $0.9 + 0.7 + 0.5 = 2.1$ relevant documents on average, an expected precision at $3$ of $0.7$. Any other choice of three documents gives a smaller sum ([[#thm-prp]]).
:::
:::

::: exercise BIM without the third assumption {level=2}
In the proof of [[#thm-bim]], where was the assumption that non-query terms have $p_t = u_t$ used? What would the retrieval status value look like without it, and why can it not be computed in practice?
::: solution
It was used to drop the factors for terms not in the query, each of which equals $1$ when $p_t = u_t$. Without it, the RSV becomes $\sum_{t:\, x_t = 1} c_t$ over **all** terms of the document (plus a constant), with $c_t$ the log odds ratio of each term. Every word of a document would contribute, positively or negatively, according to how typical it is of relevant documents. But the system knows nothing about relevant documents for a new query beyond the query itself, so the $p_t$ of non-query terms cannot be estimated without relevance feedback — and with feedback, this is precisely how query expansion arises: terms with large estimated $c_t$ are added to the query.
:::
:::

::: exercise The limits of BM25's parameters {level=2}
Show that BM25 with $k_1 \to 0$ is rank-equivalent to the BIM with RSJ weights, and that with $b = 1$ and $k_1 \to \infty$ the term-frequency factor, divided by $k_1 + 1$ and multiplied by $k_1$, tends to $\mathrm{tf}_{t,d} \cdot \mathrm{avgdl}/\mathrm{dl}_d$.
::: solution
As $k_1 \to 0$, $K_d \to 0$ and $(k_1 + 1)\mathrm{tf}/(K_d + \mathrm{tf}) \to \mathrm{tf}/\mathrm{tf} = 1$ for $\mathrm{tf} > 0$ (and $0$ for $\mathrm{tf} = 0$). So the score becomes $\sum_{t \in q,\, \mathrm{tf} > 0} w_t$, the BIM's [[#eq-rsv]] with RSJ weights. With $b = 1$, $K_d = k_1 \mathrm{dl}_d/\mathrm{avgdl}$; then
$$
\frac{k_1}{k_1 + 1}\cdot\frac{(k_1 + 1)\mathrm{tf}}{k_1 \mathrm{dl}_d/\mathrm{avgdl} + \mathrm{tf}} = \frac{\mathrm{tf}}{\mathrm{dl}_d/\mathrm{avgdl} + \mathrm{tf}/k_1} \to \frac{\mathrm{tf}\cdot\mathrm{avgdl}}{\mathrm{dl}_d}.
$$
So large $k_1$ with full normalisation approaches raw tf divided by relative length — no saturation at all. BM25 interpolates between binary presence and length-normalised raw tf.
:::
:::

::: exercise Jelinek–Mercer has no length penalty of this kind {level=2}
Derive the analogue of [[#prop-ql-rank]] for Jelinek–Mercer smoothing, $\theta_{d,t} = (1-\lambda)\mathrm{tf}_{t,d}/\mathrm{dl}_d + \lambda p_t$. Compare the way document length enters with the Dirichlet case.
::: solution
Factor $\theta_{d,t} = \lambda p_t\bigl(1 + \frac{(1-\lambda)\,\mathrm{tf}_{t,d}}{\lambda\, p_t\, \mathrm{dl}_d}\bigr)$. Summing logarithms over the query terms and dropping $\sum_t \log(\lambda p_t)$, which does not depend on the document, the rank-equivalent score is
$$
\sum_{t \in q,\ \mathrm{tf}_{t,d} > 0} \log\Bigl(1 + \frac{1 - \lambda}{\lambda}\cdot\frac{\mathrm{tf}_{t,d}/\mathrm{dl}_d}{p_t}\Bigr).
$$
There is no separate per-document length term: length enters only through the relative frequency $\mathrm{tf}/\mathrm{dl}$ inside each matching term's weight, so a document that matches no query term scores $0$ regardless of length, and the smoothing weight is the same for short and long documents. In the Dirichlet case the term $\abs q\log(\mu/(\mathrm{dl}_d + \mu))$ penalises long documents directly, and the per-term weight $\mathrm{tf}/(\mu p_t)$ uses the raw count, so long documents earn more from repeated terms. The two models therefore normalise length differently, which is one reason Dirichlet smoothing behaves better on collections with varied lengths.
:::
:::

::: exercise RSJ with complete information {level=3}
Suppose relevance is fully known: $R$ of the $N$ documents are relevant. Show that a term that occurs in every relevant document and in no non-relevant document gets the largest possible RSJ weight among terms with the same $R$ and $N$, and compute it for $R = 10$, $N = 1000$, $n_t = 10$. Why is the $0.5$ correction essential here?
::: solution
The weight [[#eq-rsj]] is increasing in $r_t$ and decreasing in $n_t - r_t$ (more relevant occurrences raise the numerator odds; more non-relevant occurrences raise the denominator odds). For fixed $R$ the maximum over $r_t \le R$ is at $r_t = R$, and the minimum of $n_t - r_t \ge 0$ is $0$. With $r_t = n_t = R = 10$:
$$
w = \ln\frac{10.5/0.5}{0.5/(1000 - 10 - 10 + 10 + 0.5)} = \ln\frac{21}{0.5/990.5} = \ln(21 \times 1981) = \ln 41\,601 \approx 10.64.
$$
Without the $0.5$ terms the numerator odds $r_t/(R - r_t) = 10/0$ and the denominator odds $0/990$ give $\infty/0$: an infinite weight, which would rank every document containing the term above every document that lacks it, regardless of all other evidence. The correction, which can be justified as a Bayesian estimate with a prior (like Laplace's rule of succession), keeps the weight finite.
:::
:::

::: exercise Implement BM25 with relevance feedback {level=3}
Extend the `bm25` function so that, given a set `rel` of docIDs judged relevant, it uses the weight [[#eq-rsj]] instead of [[#eq-rsj-idf]]. Run the query `turtle` with `rel = {516, 593, 646}` and compare the weight of `turtle` with and without feedback. What happens to the weight of a term that occurs in *all* the judged documents?
::: solution
```python
def rsj(t, rel):
    R = len(rel)
    r = sum(1 for d in rel if docs[d][t] > 0)       # judged relevant documents containing t
    n = df[t]
    return math.log(((r + 0.5) / (R - r + 0.5)) / ((n - r + 0.5) / (N - n - R + r + 0.5)))

def bm25_fb(q, d, rel, k1=1.2, b=0.75):
    K = k1 * ((1 - b) + b * dl[d] / avgdl)
    return sum(rsj(t, rel) * docs[d][t] * (k1 + 1) / (K + docs[d][t])
               for t in set(tokenize(q)) if docs[d][t] > 0)

print(round(bm25_idf("turtle"), 3), round(rsj("turtle", {516, 593, 646}), 3))
```
```text
2.657 4.662
```
All three judged paragraphs contain `turtle`, so $r = R = 3$ and the weight rises from $\ln(748.5/52.5) = 2.657$ to $\ln\frac{3.5/0.5}{49.5/748.5} = \ln(7 \times 15.12) = 4.662$. A term occurring in every judged document has numerator odds $(R + 0.5)/0.5 = 2R + 1$, which grows with the number of judgements; it is the strongest evidence the model can see, which is why feedback terms are added to queries in decreasing order of such weights. With only three judgements the estimate is noisy, and practical systems combine it with the no-feedback weight.
:::
:::

::: exercise Ranking ties and the PRP {level=2}
Two documents are exact duplicates and both have probability of relevance $0.8$; a third, different document has probability $0.7$. Rank them by the PRP. Then suppose the user is satisfied by any one relevant document and stops reading. Which top-$2$ list maximises the probability that the user finds at least one relevant document, assuming the duplicates are either both relevant or both not, and the third is independent of them?
::: solution
The PRP ranks the two duplicates first ($0.8, 0.8$), then the third ($0.7$). For the user who needs one relevant document, the top two duplicates succeed with probability $0.8$ (they are relevant together or not at all). Listing one duplicate and the third document succeeds unless both fail: $1 - 0.2 \times 0.3 = 0.94$. So the PRP's list is worse for this user. The PRP's optimality ([[#thm-prp]]) assumed that the value of a document does not depend on the others shown, which duplicates violate; diversification and duplicate removal are needed in addition to ranking by probability.
:::
:::
